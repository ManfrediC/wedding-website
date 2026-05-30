const ADMIN_COOKIE_NAME = 'gm_rsvp_admin';
const ADMIN_MAX_AGE_SECONDS = 60 * 60 * 12;
const RSVP_BODY_LIMIT_BYTES = 20 * 1024;
const RSVP_EXPORT_LIMIT = 500;
const TEXT_LIMITS = {
  name: 120,
  email: 254,
  short: 180,
  long: 1200,
};

export function createD1RsvpStore(db) {
  if (!db) {
    throw new Error('Missing RSVP_DB binding.');
  }

  return {
    async upsertResponse(response) {
      await db
        .prepare(
          `INSERT INTO rsvp_responses (
            id,
            email,
            email_normalized,
            language,
            attending,
            primary_guest_name,
            adult_count,
            adults_json,
            child_count,
            children_json,
            dietary_requirements,
            allergies,
            accessibility_mobility,
            notes,
            notification_status,
            notification_error,
            revision_count,
            created_at,
            updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'not_sent', '', 1, ?, ?)
          ON CONFLICT(email_normalized) DO UPDATE SET
            email = excluded.email,
            language = excluded.language,
            attending = excluded.attending,
            primary_guest_name = excluded.primary_guest_name,
            adult_count = excluded.adult_count,
            adults_json = excluded.adults_json,
            child_count = excluded.child_count,
            children_json = excluded.children_json,
            dietary_requirements = excluded.dietary_requirements,
            allergies = excluded.allergies,
            accessibility_mobility = excluded.accessibility_mobility,
            notes = excluded.notes,
            notification_status = 'not_sent',
            notification_error = '',
            revision_count = rsvp_responses.revision_count + 1,
            updated_at = excluded.updated_at`,
        )
        .bind(
          response.id,
          response.email,
          response.emailNormalized,
          response.language,
          response.attending,
          response.primaryGuestName,
          response.adults.length,
          JSON.stringify(response.adults),
          response.children.length,
          JSON.stringify(response.children),
          response.dietaryRequirements,
          response.allergies,
          response.accessibilityMobility,
          response.notes,
          response.createdAt,
          response.updatedAt,
        )
        .run();

      const row = await db
        .prepare('SELECT * FROM rsvp_responses WHERE email_normalized = ? LIMIT 1')
        .bind(response.emailNormalized)
        .first();

      return mapRsvpRow(row);
    },

    async updateNotification(id, status, error) {
      await db
        .prepare('UPDATE rsvp_responses SET notification_status = ?, notification_error = ?, updated_at = ? WHERE id = ?')
        .bind(status, truncateText(error, 300), new Date().toISOString(), id)
        .run();

      const row = await db
        .prepare('SELECT * FROM rsvp_responses WHERE id = ? LIMIT 1')
        .bind(id)
        .first();

      return row ? mapRsvpRow(row) : undefined;
    },

    async listResponses(options = {}) {
      const { filter = 'all', search = '', limit = RSVP_EXPORT_LIMIT } = options;
      const clauses = [];
      const values = [];

      if (filter === 'attending') {
        clauses.push("attending = 'yes'");
      } else if (filter === 'not_attending') {
        clauses.push("attending = 'no'");
      } else if (filter === 'notification_issue') {
        clauses.push("notification_status IN ('failed', 'not_configured')");
      }

      const cleanedSearch = cleanText(search, TEXT_LIMITS.short);
      if (cleanedSearch) {
        clauses.push('(primary_guest_name LIKE ? OR email LIKE ?)');
        values.push(`%${cleanedSearch}%`, `%${cleanedSearch}%`);
      }

      const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
      const safeLimit = Math.max(1, Math.min(Number(limit) || RSVP_EXPORT_LIMIT, RSVP_EXPORT_LIMIT));
      const result = await db
        .prepare(`SELECT * FROM rsvp_responses ${where} ORDER BY updated_at DESC LIMIT ?`)
        .bind(...values, safeLimit)
        .all();

      return (result.results ?? []).map(mapRsvpRow);
    },

    async deleteResponse(id) {
      const existing = await db
        .prepare('SELECT id FROM rsvp_responses WHERE id = ? LIMIT 1')
        .bind(id)
        .first();

      if (!existing) {
        return false;
      }

      await db.prepare('DELETE FROM rsvp_responses WHERE id = ?').bind(id).run();
      return true;
    },
  };
}

export async function handleRsvpPost({ request, env, store }) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false, error: 'forbidden' }, 403);
  }

  if (Number(request.headers.get('content-length') ?? 0) > RSVP_BODY_LIMIT_BYTES) {
    return jsonResponse({ ok: false, errors: { form: 'too_large' } }, 413);
  }

  const raw = await readPayload(request);
  const validation = validateRsvpInput(raw);

  if (!validation.ok) {
    return jsonResponse({ ok: false, errors: validation.errors }, 400);
  }

  let row;
  try {
    row = await store.upsertResponse(validation.data);
  } catch (error) {
    console.error('rsvp_store_write_failed', normaliseError(error));
    return jsonResponse({ ok: false, error: 'store_failed' }, 500);
  }

  const notification = await sendRsvpNotification(env, row);
  const updatedRow = await store.updateNotification(row.id, notification.status, notification.error ?? '');

  if (notification.status !== 'sent') {
    console.warn('rsvp_notification_not_sent', {
      status: notification.status,
      responseId: row.id,
      error: notification.error,
    });
  }

  return jsonResponse({
    ok: true,
    response: {
      id: row.id,
      revisionCount: updatedRow?.revisionCount ?? row.revisionCount,
      notificationStatus: updatedRow?.notificationStatus ?? notification.status,
    },
  });
}

export async function handleAdminLogin({ request, env }) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false, error: 'forbidden' }, 403);
  }

  const password = env.RSVP_ADMIN_PASSWORD;
  if (!password) {
    return jsonResponse({ ok: false, error: 'admin_not_configured' }, 503);
  }

  const payload = await readPayload(request);
  const submittedPassword = String(payload.password ?? '');

  if (submittedPassword !== password) {
    return jsonResponse({ ok: false, error: 'invalid_password' }, 401);
  }

  const response = jsonResponse({ ok: true });
  response.headers.set('Set-Cookie', await buildAdminCookie(request, env, password));
  return response;
}

export async function handleAdminLogout({ request, env }) {
  const response = jsonResponse({ ok: true });
  response.headers.set('Set-Cookie', buildExpiredAdminCookie(request, env));
  return response;
}

export async function handleAdminList({ request, env, store }) {
  if (!(await isAdminAuthenticated(request, env))) {
    return jsonResponse({ ok: false, error: 'admin_auth_required' }, 401);
  }

  const url = new URL(request.url);
  const responses = await store.listResponses({
    filter: url.searchParams.get('filter') ?? 'all',
    search: url.searchParams.get('search') ?? '',
    limit: RSVP_EXPORT_LIMIT,
  });

  return jsonResponse({
    ok: true,
    responses,
    summary: summariseResponses(responses),
  });
}

export async function handleAdminCsv({ request, env, store }) {
  if (!(await isAdminAuthenticated(request, env))) {
    return new Response('Admin authentication required.', { status: 401, headers: noStoreHeaders('text/plain; charset=utf-8') });
  }

  const url = new URL(request.url);
  const responses = await store.listResponses({
    filter: url.searchParams.get('filter') ?? 'all',
    search: url.searchParams.get('search') ?? '',
    limit: RSVP_EXPORT_LIMIT,
  });

  return new Response(toCsv(responses), {
    status: 200,
    headers: {
      ...noStoreHeaders('text/csv; charset=utf-8'),
      'Content-Disposition': 'attachment; filename="wedding-rsvp-responses.csv"',
    },
  });
}

export async function handleAdminDelete({ request, env, store, id }) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false, error: 'forbidden' }, 403);
  }

  if (!(await isAdminAuthenticated(request, env))) {
    return jsonResponse({ ok: false, error: 'admin_auth_required' }, 401);
  }

  if (!id || !/^[A-Za-z0-9_-]{8,80}$/.test(id)) {
    return jsonResponse({ ok: false, error: 'invalid_id' }, 400);
  }

  const deleted = await store.deleteResponse(id);
  return jsonResponse({ ok: true, deleted });
}

export function validateRsvpInput(raw) {
  const errors = {};

  if (cleanText(raw.website ?? raw.company ?? '', 80)) {
    return { ok: false, errors: { form: 'invalid_submission' } };
  }

  const language = cleanText(raw.language, 2);
  const attending = cleanText(raw.attending, 3);
  const primaryGuestName = cleanText(raw.primary_guest_name ?? raw.primaryGuestName, TEXT_LIMITS.name);
  const email = cleanEmail(raw.email);
  const emailNormalized = email.toLowerCase();
  const adultNames = uniqueCleanList(valuesFor(raw.adult_name ?? raw.adultNames), TEXT_LIMITS.name);
  const children = cleanChildren(valuesFor(raw.child_name ?? raw.childNames), valuesFor(raw.child_age ?? raw.childAges), errors);
  const dietaryRequirements = cleanText(raw.dietary_requirements ?? raw.dietaryRequirements, TEXT_LIMITS.long);
  const allergies = cleanText(raw.allergies, TEXT_LIMITS.long);
  const accessibilityMobility = cleanText(raw.accessibility_mobility ?? raw.accessibilityMobility, TEXT_LIMITS.long);
  const notes = cleanText(raw.notes, TEXT_LIMITS.long);

  if (!['en', 'it', 'de'].includes(language)) {
    errors.language = 'required';
  }

  if (!['yes', 'no'].includes(attending)) {
    errors.attending = 'required';
  }

  if (!primaryGuestName) {
    errors.primary_guest_name = 'required';
  }

  if (!email || !isLikelyEmail(email)) {
    errors.email = 'invalid';
  }

  if (adultNames.length > 20) {
    errors.adult_name = 'too_many';
  }

  if (children.length > 20) {
    errors.child_name = 'too_many';
  }

  if (attending === 'yes' && adultNames.length === 0) {
    errors.adult_name = 'required';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const now = new Date().toISOString();

  return {
    ok: true,
    data: {
      id: createId(),
      email,
      emailNormalized,
      language,
      attending,
      primaryGuestName,
      adults: attending === 'yes' ? adultNames : [],
      children: attending === 'yes' ? children : [],
      dietaryRequirements,
      allergies,
      accessibilityMobility,
      notes,
      createdAt: now,
      updatedAt: now,
    },
  };
}

export function summariseResponses(responses) {
  return responses.reduce(
    (summary, response) => {
      summary.responses += 1;

      if (response.attending === 'yes') {
        summary.attendingHouseholds += 1;
        summary.adults += response.adults.length;
        summary.children += response.children.length;
      } else {
        summary.notAttendingHouseholds += 1;
      }

      if (['failed', 'not_configured'].includes(response.notificationStatus)) {
        summary.notificationIssues += 1;
      }

      return summary;
    },
    {
      responses: 0,
      attendingHouseholds: 0,
      notAttendingHouseholds: 0,
      adults: 0,
      children: 0,
      notificationIssues: 0,
    },
  );
}

export function toCsv(responses) {
  const header = [
    'primary_guest_name',
    'email',
    'language',
    'attending',
    'adult_count',
    'adult_names',
    'child_count',
    'children',
    'dietary_requirements',
    'allergies',
    'accessibility_mobility',
    'notes',
    'notification_status',
    'revision_count',
    'created_at',
    'updated_at',
  ];
  const rows = responses.map((response) => [
    response.primaryGuestName,
    response.email,
    response.language,
    response.attending,
    String(response.adults.length),
    response.adults.join('; '),
    String(response.children.length),
    response.children.map((child) => `${child.name} (${child.age})`).join('; '),
    response.dietaryRequirements,
    response.allergies,
    response.accessibilityMobility,
    response.notes,
    response.notificationStatus,
    String(response.revisionCount),
    response.createdAt,
    response.updatedAt,
  ]);

  return [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n');
}

export function mapRsvpRow(row) {
  return {
    id: String(row.id),
    email: String(row.email),
    emailNormalized: String(row.email_normalized),
    language: String(row.language),
    attending: String(row.attending),
    primaryGuestName: String(row.primary_guest_name),
    adults: parseJsonArray(row.adults_json),
    children: parseJsonArray(row.children_json),
    dietaryRequirements: String(row.dietary_requirements ?? ''),
    allergies: String(row.allergies ?? ''),
    accessibilityMobility: String(row.accessibility_mobility ?? ''),
    notes: String(row.notes ?? ''),
    notificationStatus: String(row.notification_status ?? 'not_sent'),
    notificationError: String(row.notification_error ?? ''),
    revisionCount: Number(row.revision_count ?? 1),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: noStoreHeaders('application/json; charset=utf-8'),
  });
}

export function noStoreHeaders(contentType) {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  };
}

async function readPayload(request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return await request.json();
  }

  const form = await request.formData();
  const payload = {};

  for (const key of form.keys()) {
    const values = form.getAll(key).map((value) => (typeof value === 'string' ? value : value.name));
    payload[key] = values.length === 1 ? values[0] : values;
  }

  return payload;
}

function valuesFor(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [value];
}

function uniqueCleanList(values, limit) {
  const cleaned = values.map((value) => cleanText(value, limit)).filter(Boolean);
  return [...new Set(cleaned)];
}

function cleanChildren(names, ages, errors) {
  const children = [];
  const max = Math.max(names.length, ages.length);

  for (let index = 0; index < max; index += 1) {
    const name = cleanText(names[index], TEXT_LIMITS.name);
    const rawAge = cleanText(ages[index], 3);

    if (!name && !rawAge) {
      continue;
    }

    const age = Number(rawAge);
    if (!name || !Number.isInteger(age) || age < 0 || age > 17) {
      errors.child_age = 'invalid';
      continue;
    }

    children.push({ name, age });
  }

  return children;
}

function cleanEmail(value) {
  return cleanText(value, TEXT_LIMITS.email).replace(/\s+/g, '');
}

function isLikelyEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanText(value, limit) {
  return truncateText(String(value ?? '').replace(/\s+/g, ' ').trim(), limit);
}

function truncateText(value, limit) {
  return value.length > limit ? value.slice(0, limit) : value;
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `rsvp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

async function sendRsvpNotification(env, response) {
  const messages = [
    buildAdminNotification(env, response),
    buildGuestConfirmation(env, response),
  ];

  for (const message of messages) {
    const result = await sendEmail(env, message);
    if (result.status !== 'sent') {
      return result;
    }
  }

  return { status: 'sent' };
}

function buildAdminNotification(env, response) {
  const to = env.RSVP_NOTIFICATION_TO ?? 'manfrediandgabriela@gmail.com';
  const subject = `New wedding RSVP from ${response.primaryGuestName}`;
  const text = [
    'A new wedding RSVP has been received.',
    '',
    `Guest: ${response.primaryGuestName}`,
    `Email: ${response.email}`,
    `Attendance: ${response.attending === 'yes' ? 'Attending' : 'Not attending'}`,
    `Adults: ${response.adults.length}`,
    `Children: ${response.children.length}`,
    `Revision: ${response.revisionCount}`,
    '',
    'Open the RSVP admin page for dietary, allergy, accessibility, and note details.',
  ].join('\n');

  return {
    to,
    replyTo: response.email,
    subject,
    text,
    label: 'admin notification',
  };
}

function buildGuestConfirmation(env, response) {
  const copy = confirmationCopy[response.language] ?? confirmationCopy.en;
  const attendance = response.attending === 'yes' ? copy.attending : copy.notAttending;
  const adults = response.adults.join(', ') || copy.noneListed;
  const children = response.children.map((child) => `${child.name} (${child.age})`).join(', ') || copy.noneListed;
  const details = [
    `${copy.attendance}: ${attendance}`,
    `${copy.adults}: ${adults}`,
    `${copy.children}: ${children}`,
    `${copy.dietary}: ${response.dietaryRequirements || copy.noneListed}`,
    `${copy.allergies}: ${response.allergies || copy.noneListed}`,
    `${copy.accessibility}: ${response.accessibilityMobility || copy.noneListed}`,
    `${copy.notes}: ${response.notes || copy.noneListed}`,
  ];

  return {
    to: response.email,
    replyTo: env.RSVP_NOTIFICATION_TO ?? 'manfrediandgabriela@gmail.com',
    subject: copy.subject,
    text: [
      copy.greeting(response.primaryGuestName),
      '',
      copy.received,
      '',
      ...details,
      '',
      copy.replacement,
      '',
      copy.signoff,
    ].join('\n'),
    label: 'guest confirmation',
  };
}

const confirmationCopy = {
  en: {
    subject: 'Your RSVP for Gabriela and Manfredi',
    greeting: (name) => `Dear ${name},`,
    received: 'Thank you. We have received your RSVP with the details below.',
    attendance: 'Attendance',
    attending: 'Attending',
    notAttending: 'Not attending',
    adults: 'Adults',
    children: 'Children',
    dietary: 'Dietary requirements',
    allergies: 'Allergies',
    accessibility: 'Accessibility or mobility considerations',
    notes: 'Notes',
    noneListed: 'None listed',
    replacement: 'If you submit the RSVP form again with the same email address, the latest response will replace this one.',
    signoff: 'Warmly,\nGabriela and Manfredi',
  },
  it: {
    subject: 'La vostra RSVP per Gabriela e Manfredi',
    greeting: (name) => `Gentile ${name},`,
    received: 'Grazie. Abbiamo ricevuto la vostra RSVP con i dettagli qui sotto.',
    attendance: 'Partecipazione',
    attending: 'Presente',
    notAttending: 'Non presente',
    adults: 'Adulti',
    children: 'Bambini',
    dietary: 'Esigenze alimentari',
    allergies: 'Allergie',
    accessibility: 'Esigenze di accessibilità o mobilità',
    notes: 'Note',
    noneListed: 'Nessuna indicazione',
    replacement: 'Se inviate di nuovo la RSVP con lo stesso indirizzo email, la risposta più recente sostituirà questa.',
    signoff: 'Con affetto,\nGabriela e Manfredi',
  },
  de: {
    subject: 'Eure RSVP für Gabriela und Manfredi',
    greeting: (name) => `Liebe/r ${name},`,
    received: 'Vielen Dank. Wir haben eure RSVP mit den folgenden Angaben erhalten.',
    attendance: 'Teilnahme',
    attending: 'Teilnahme',
    notAttending: 'Keine Teilnahme',
    adults: 'Erwachsene',
    children: 'Kinder',
    dietary: 'Essenswünsche',
    allergies: 'Allergien',
    accessibility: 'Hinweise zu Barrierefreiheit oder Mobilität',
    notes: 'Anmerkungen',
    noneListed: 'Keine Angaben',
    replacement: 'Wenn ihr die RSVP mit derselben E-Mail-Adresse erneut absendet, ersetzt die neueste Antwort diese Angaben.',
    signoff: 'Herzlich,\nGabriela und Manfredi',
  },
};

async function sendEmail(env, message) {
  const from = env.RSVP_NOTIFICATION_FROM;
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_EMAIL_API_TOKEN;

  if (env.RSVP_NOTIFICATION_MODE === 'mock' && env.RSVP_NOTIFICATION_MOCK?.send) {
    await env.RSVP_NOTIFICATION_MOCK.send({ ...message, from: from ?? 'mock@example.test' });
    return { status: 'sent' };
  }

  if (!accountId || !token || !from) {
    return { status: 'not_configured', error: 'Cloudflare Email Sending is not configured.' };
  }

  try {
    const result = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: message.to,
        from,
        reply_to: message.replyTo,
        subject: message.subject,
        text: message.text,
      }),
    });

    if (!result.ok) {
      return { status: 'failed', error: `Cloudflare Email Sending returned HTTP ${result.status} for ${message.label}.` };
    }

    const body = await result.json();
    return body.success ? { status: 'sent' } : { status: 'failed', error: `Cloudflare Email Sending rejected the ${message.label}.` };
  } catch (error) {
    return { status: 'failed', error: normaliseError(error) };
  }
}

async function isAdminAuthenticated(request, env) {
  const password = env.RSVP_ADMIN_PASSWORD;
  if (!password) {
    return false;
  }

  const expected = await buildAdminCookieValue(env, password);
  return readCookie(request.headers.get('Cookie') ?? '', ADMIN_COOKIE_NAME) === expected;
}

async function buildAdminCookie(request, env, password) {
  const url = new URL(request.url);
  const secureAttribute = url.protocol === 'https:' ? '; Secure' : '';
  return `${ADMIN_COOKIE_NAME}=${await buildAdminCookieValue(env, password)}; Path=/; Max-Age=${ADMIN_MAX_AGE_SECONDS}; HttpOnly${secureAttribute}; SameSite=Lax`;
}

function buildExpiredAdminCookie(request) {
  const url = new URL(request.url);
  const secureAttribute = url.protocol === 'https:' ? '; Secure' : '';
  return `${ADMIN_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly${secureAttribute}; SameSite=Lax`;
}

async function buildAdminCookieValue(env, password) {
  const secret = env.RSVP_ADMIN_SECRET ?? env.WEDDING_AUTH_SECRET ?? 'wedding-rsvp-admin';
  const input = new TextEncoder().encode(`${password}:${secret}`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function readCookie(header, name) {
  const cookies = header.split(';').map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : undefined;
}

function isSameOrigin(request) {
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}

function parseJsonArray(value) {
  try {
    const parsed = JSON.parse(String(value ?? '[]'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function csvCell(value) {
  const rawText = String(value ?? '');
  const text = /^[=+\-@\t\r]/.test(rawText) ? `'${rawText}` : rawText;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function normaliseError(error) {
  return error instanceof Error ? error.message : String(error);
}
