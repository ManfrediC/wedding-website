import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve, sep } from 'node:path';
import {
  handleAdminCsv,
  handleAdminDelete,
  handleAdminList,
  handleAdminLogin,
  handleAdminLogout,
  handleRsvpPost,
  summariseResponses,
} from '../functions/_lib/rsvp.js';

const COOKIE_NAME = 'gm_wedding_auth';
const ADMIN_COOKIE_NAME = 'gm_rsvp_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const ROBOTS_HEADER_VALUE = 'noindex, nofollow';
const WELCOME_PATH = '/welcome/';

const repoRoot = process.cwd();
const distDir = resolve(repoRoot, 'dist');
const localEnvPath = join(repoRoot, 'env', 'website_pw.env');
const localEnv = await loadEnvFile(localEnvPath);
const port = Number(readArg('port', process.env.PORT ?? '4321'));
const host = readArg('host', process.env.HOST ?? '127.0.0.1');
const password = process.env.WEBSITE_PW ?? localEnv.WEBSITE_PW;
const authSecret = process.env.WEDDING_AUTH_SECRET ?? localEnv.WEDDING_AUTH_SECRET ?? 'local-protected-preview';
const rsvpStore = await createPreviewRsvpStore(join(repoRoot, 'tmp', 'rsvp-preview-store.json'));
const notificationMock = createNotificationMock();

if (!password) {
  throw new Error('Set WEBSITE_PW=... in env/website_pw.env before starting the protected preview.');
}

if (!existsSync(distDir)) {
  throw new Error('The dist directory does not exist. Run npm run build first.');
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? `${host}:${port}`}`);

    if (isPublicAsset(url.pathname)) {
      await serveStatic(url.pathname, response);
      return;
    }

    if (isLogoutPath(url.pathname)) {
      await handleLogout(request, response, url);
      return;
    }

    if (isLegacyLoginPath(url.pathname)) {
      const welcomeUrl = new URL(WELCOME_PATH, url.origin);
      welcomeUrl.searchParams.set('next', normaliseNext(url.searchParams.get('next')));
      redirect(response, welcomeUrl.pathname + welcomeUrl.search);
      return;
    }

    if (isWelcomePath(url.pathname)) {
      if (request.method === 'POST') {
        await handleLogin(request, response, url);
        return;
      }

      if (isAuthenticated(request)) {
        redirect(response, normaliseNext(url.searchParams.get('next')));
        return;
      }

      await serveStatic(WELCOME_PATH, response);
      return;
    }

    if (!isAuthenticated(request)) {
      const welcomeUrl = new URL(WELCOME_PATH, url.origin);
      welcomeUrl.searchParams.set('next', normaliseNext(`${url.pathname}${url.search}`));
      redirect(response, welcomeUrl.pathname + welcomeUrl.search);
      return;
    }

    if (url.pathname.startsWith('/api/')) {
      await handleApiRequest(request, response, url);
      return;
    }

    await serveStatic(url.pathname, response);
  } catch (error) {
    response.writeHead(500, withRobotsHeader({ 'Content-Type': 'text/plain; charset=utf-8' }));
    response.end(error instanceof Error ? error.message : 'Unexpected preview server error.');
  }
});

server.listen(port, host, () => {
  console.log(`Protected wedding preview is running at http://${host}:${port}/welcome/`);
});

function readArg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

async function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const text = await readFile(filePath, 'utf8');
  const values = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) {
      continue;
    }

    values[match[1]] = stripQuotes(match[2].trim());
  }

  return values;
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

async function handleLogin(request, response, url) {
  const form = new URLSearchParams(await readBody(request));
  const submittedPassword = String(form.get('password') ?? '');
  const next = normaliseNext(String(form.get('next') ?? url.searchParams.get('next') ?? ''));

  if (submittedPassword !== password) {
    const retryUrl = new URL(WELCOME_PATH, url.origin);
    retryUrl.searchParams.set('error', '1');
    retryUrl.searchParams.set('next', next);
    redirect(response, retryUrl.pathname + retryUrl.search);
    return;
  }

  response.writeHead(302, {
    'X-Robots-Tag': ROBOTS_HEADER_VALUE,
    Location: next,
    'Set-Cookie': `${COOKIE_NAME}=${buildCookieValue()}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax`,
  });
  response.end();
}

async function handleLogout(request, response, url) {
  const next = request.method === 'POST'
    ? normaliseNext(String(new URLSearchParams(await readBody(request)).get('next') ?? ''))
    : normaliseNext(url.searchParams.get('next'));
  const welcomeUrl = new URL(WELCOME_PATH, url.origin);
  welcomeUrl.searchParams.set('next', next);

  response.writeHead(302, {
    'X-Robots-Tag': ROBOTS_HEADER_VALUE,
    Location: welcomeUrl.pathname + welcomeUrl.search,
    'Set-Cookie': [
      `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
      `${ADMIN_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
    ],
  });
  response.end();
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString('utf8');
}

function isAuthenticated(request) {
  return readCookie(request.headers.cookie ?? '', COOKIE_NAME) === buildCookieValue();
}

function buildCookieValue() {
  return createHash('sha256').update(`${password}:${authSecret}`).digest('hex');
}

function readCookie(header, name) {
  const cookies = header.split(';').map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : undefined;
}

function isPublicAsset(pathname) {
  return (
    pathname === '/robots.txt' ||
    pathname === '/favicon.svg' ||
    pathname === '/images/minted/minted-hero.jpg' ||
    pathname.startsWith('/images/landing/') ||
    pathname.startsWith('/_astro/')
  );
}

function isWelcomePath(pathname) {
  return pathname === '/' || pathname === WELCOME_PATH || pathname === '/welcome';
}

function isLegacyLoginPath(pathname) {
  return pathname === '/login/' || pathname === '/login';
}

function isLogoutPath(pathname) {
  return pathname === '/logout/' || pathname === '/logout';
}

function normaliseNext(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/en/';
  }

  const pathname = value.split('?')[0];
  if (pathname === '/' || isWelcomePath(pathname) || isLegacyLoginPath(pathname)) {
    return '/en/';
  }

  return value;
}

async function handleApiRequest(request, response, url) {
  const webRequest = await toWebRequest(request, url);
  const env = {
    RSVP_ADMIN_PASSWORD: process.env.RSVP_ADMIN_PASSWORD ?? localEnv.RSVP_ADMIN_PASSWORD,
    RSVP_ADMIN_SECRET: process.env.RSVP_ADMIN_SECRET ?? localEnv.RSVP_ADMIN_SECRET,
    WEDDING_AUTH_SECRET: authSecret,
    RSVP_NOTIFICATION_MODE: process.env.RSVP_NOTIFICATION_MODE ?? localEnv.RSVP_NOTIFICATION_MODE,
    RSVP_NOTIFICATION_TO:
      process.env.RSVP_NOTIFICATION_TO ?? localEnv.RSVP_NOTIFICATION_TO ?? 'manfrediandgabriela@gmail.com',
    RSVP_NOTIFICATION_FROM: process.env.RSVP_NOTIFICATION_FROM ?? localEnv.RSVP_NOTIFICATION_FROM,
    RSVP_NOTIFICATION_MOCK: notificationMock,
  };
  let apiResponse;

  if (url.pathname === '/api/rsvp' && request.method === 'POST') {
    apiResponse = await handleRsvpPost({ request: webRequest, env, store: rsvpStore });
  } else if (url.pathname === '/api/admin/login' && request.method === 'POST') {
    apiResponse = await handleAdminLogin({ request: webRequest, env });
  } else if (url.pathname === '/api/admin/logout' && request.method === 'POST') {
    apiResponse = await handleAdminLogout({ request: webRequest, env });
  } else if ((url.pathname === '/api/admin/rsvp' || url.pathname === '/api/admin/rsvp/') && request.method === 'GET') {
    apiResponse = await handleAdminList({ request: webRequest, env, store: rsvpStore });
  } else if (url.pathname === '/api/admin/rsvp.csv' && request.method === 'GET') {
    apiResponse = await handleAdminCsv({ request: webRequest, env, store: rsvpStore });
  } else if (url.pathname === '/api/_preview/notifications' && request.method === 'GET') {
    apiResponse = new Response(JSON.stringify({ ok: true, messages: notificationMock.messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Robots-Tag': ROBOTS_HEADER_VALUE },
    });
  } else {
    const deleteMatch = url.pathname.match(/^\/api\/admin\/rsvp\/([^/]+)$/);
    if (deleteMatch && request.method === 'DELETE') {
      apiResponse = await handleAdminDelete({ request: webRequest, env, store: rsvpStore, id: deleteMatch[1] });
    } else {
      apiResponse = new Response(JSON.stringify({ ok: false, error: 'not_found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Robots-Tag': ROBOTS_HEADER_VALUE },
      });
    }
  }

  await sendWebResponse(apiResponse, response);
}

async function toWebRequest(request, url) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item));
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const body = request.method === 'GET' || request.method === 'HEAD'
    ? undefined
    : await readBody(request);

  return new Request(url.toString(), {
    method: request.method,
    headers,
    body,
  });
}

async function sendWebResponse(apiResponse, response) {
  const headers = {};
  apiResponse.headers.forEach((value, key) => {
    headers[key] = value;
  });

  response.writeHead(apiResponse.status, headers);
  response.end(Buffer.from(await apiResponse.arrayBuffer()));
}

function createNotificationMock() {
  const messages = [];

  return {
    messages,
    async send(message) {
      messages.push({ ...message, sentAt: new Date().toISOString() });
    },
  };
}

async function createPreviewRsvpStore(filePath) {
  if (process.env.RSVP_PREVIEW_RESET !== '0') {
    await writeJson(filePath, []);
  }

  async function readRows() {
    if (!existsSync(filePath)) {
      return [];
    }

    return JSON.parse(await readFile(filePath, 'utf8'));
  }

  async function writeRows(rows) {
    await writeJson(filePath, rows);
  }

  return {
    async upsertResponse(response) {
      const rows = await readRows();
      const existingIndex = rows.findIndex((row) => row.emailNormalized === response.emailNormalized);
      const existing = existingIndex >= 0 ? rows[existingIndex] : undefined;
      const row = {
        id: existing?.id ?? response.id,
        email: response.email,
        emailNormalized: response.emailNormalized,
        language: response.language,
        attending: response.attending,
        primaryGuestName: response.primaryGuestName,
        phoneNumber: response.phoneNumber,
        address: response.address,
        adults: response.adults,
        children: response.children,
        dietaryRequirements: response.dietaryRequirements,
        allergies: response.allergies,
        accessibilityMobility: response.accessibilityMobility,
        notes: response.notes,
        notificationStatus: 'not_sent',
        notificationError: '',
        revisionCount: existing ? existing.revisionCount + 1 : 1,
        createdAt: existing?.createdAt ?? response.createdAt,
        updatedAt: response.updatedAt,
      };

      if (existingIndex >= 0) {
        rows[existingIndex] = row;
      } else {
        rows.push(row);
      }

      await writeRows(rows);
      return row;
    },

    async updateNotification(id, status, error) {
      const rows = await readRows();
      const row = rows.find((item) => item.id === id);

      if (!row) {
        return undefined;
      }

      row.notificationStatus = status;
      row.notificationError = error;
      row.updatedAt = new Date().toISOString();
      await writeRows(rows);
      return row;
    },

    async listResponses(options = {}) {
      const filter = options.filter ?? 'all';
      const search = String(options.search ?? '').trim().toLowerCase();
      const limit = Math.max(1, Math.min(Number(options.limit) || 500, 500));
      const rows = await readRows();

      return rows
        .filter((row) => {
          if (filter === 'attending' && row.attending !== 'yes') {
            return false;
          }

          if (filter === 'not_attending' && row.attending !== 'no') {
            return false;
          }

          if (filter === 'notification_issue' && !['failed', 'not_configured'].includes(row.notificationStatus)) {
            return false;
          }

          if (!search) {
            return true;
          }

          return `${row.primaryGuestName} ${row.email} ${row.phoneNumber ?? ''} ${row.address ?? ''}`.toLowerCase().includes(search);
        })
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
        .slice(0, limit);
    },

    async deleteResponse(id) {
      const rows = await readRows();
      const nextRows = rows.filter((row) => row.id !== id);
      await writeRows(nextRows);
      return rows.length !== nextRows.length;
    },

    async summary() {
      return summariseResponses(await readRows());
    },
  };
}

async function writeJson(filePath, value) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function serveStatic(pathname, response) {
  const filePath = resolveStaticPath(pathname);
  const fileStat = await stat(filePath).catch(() => undefined);

  if (!fileStat?.isFile()) {
    response.writeHead(404, withRobotsHeader({ 'Content-Type': 'text/plain; charset=utf-8' }));
    response.end('Not found');
    return;
  }

  response.writeHead(200, withRobotsHeader({ 'Content-Type': contentType(filePath) }));
  response.end(await readFile(filePath));
}

function resolveStaticPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.endsWith('/')
    ? `${decodedPath}index.html`
    : extname(decodedPath)
      ? decodedPath
      : `${decodedPath}/index.html`;
  const filePath = resolve(distDir, `.${relativePath}`);

  if (filePath !== distDir && !filePath.startsWith(`${distDir}${sep}`)) {
    throw new Error('Refusing to serve a path outside dist.');
  }

  return filePath;
}

function contentType(filePath) {
  const extension = extname(filePath).toLowerCase();
  return (
    {
      '.css': 'text/css; charset=utf-8',
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml; charset=utf-8',
      '.webp': 'image/webp',
    }[extension] ?? 'application/octet-stream'
  );
}

function redirect(response, location) {
  response.writeHead(302, withRobotsHeader({ Location: location }));
  response.end();
}

function withRobotsHeader(headers) {
  return {
    ...headers,
    'X-Robots-Tag': ROBOTS_HEADER_VALUE,
  };
}
