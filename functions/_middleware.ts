type Env = {
  FAMILY_PW?: string;
  WEBSITE_PW?: string;
  WEDDING_SITE_PASSWORD?: string;
  WEDDING_AUTH_SECRET?: string;
};

const COOKIE_NAME = 'gm_wedding_auth';
const ADMIN_COOKIE_NAME = 'gm_rsvp_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const ROBOTS_HEADER_VALUE = 'noindex, nofollow';
const WELCOME_PATH = '/welcome/';
const FAMILY_PATH = '/family';
const FAMILY_USERNAME = 'family';
const FAMILY_AUTH_CHALLENGE = 'Basic realm="Gabriela & Manfredi family schedule", charset="UTF-8"';

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const password = context.env.WEBSITE_PW ?? context.env.WEDDING_SITE_PASSWORD;
  const canonicalPathname = normalisePathnameForSecurity(url.pathname);
  const familyPathname = getFamilyPathname(canonicalPathname);

  if (familyPathname) {
    const canonicalFamilyPathname = familyPathname === FAMILY_PATH
      ? `${FAMILY_PATH}/`
      : familyPathname;

    if (url.pathname !== canonicalFamilyPathname) {
      const familyUrl = new URL(url);
      familyUrl.pathname = canonicalFamilyPathname;
      return withFamilyPrivacyHeaders(Response.redirect(familyUrl.toString(), 308));
    }

    return handleFamilyRequest(context, context.env.FAMILY_PW);
  }

  if (!password || isPublicAsset(url.pathname)) {
    return withRobotsHeader(await context.next());
  }

  if (isLogoutPath(url.pathname)) {
    return withRobotsHeader(await handleLogout(context));
  }

  if (isLegacyLoginPath(url.pathname)) {
    const welcomeUrl = new URL(WELCOME_PATH, url.origin);
    const next = normaliseNext(url.searchParams.get('next'));
    welcomeUrl.searchParams.set('next', next);
    return withRobotsHeader(Response.redirect(welcomeUrl.toString(), 302));
  }

  if (isWelcomePath(url.pathname)) {
    if (context.request.method === 'POST') {
      return withRobotsHeader(await handleLogin(context, password));
    }

    if (await isAuthenticated(context, password)) {
      const nextUrl = new URL(normaliseNext(url.searchParams.get('next')), url.origin);
      return withRobotsHeader(Response.redirect(nextUrl.toString(), 302));
    }

    return withRobotsHeader(await context.next());
  }

  if (await isAuthenticated(context, password)) {
    return withRobotsHeader(await context.next());
  }

  return withRobotsHeader(Response.redirect(buildWelcomeUrl(url).toString(), 302));
};

async function handleFamilyRequest(
  context: EventContext<Env, string, unknown>,
  password: string | undefined,
) {
  if (!password) {
    return familyErrorResponse(503, 'This private page is temporarily unavailable.');
  }

  if (!(await hasValidFamilyCredentials(context.request, password))) {
    return familyErrorResponse(401, 'Authentication required.');
  }

  return withFamilyPrivacyHeaders(await context.next());
}

function familyErrorResponse(status: 401 | 503, message: string) {
  const headers = new Headers({
    'Content-Type': 'text/plain; charset=utf-8',
  });

  if (status === 401) {
    headers.set('WWW-Authenticate', FAMILY_AUTH_CHALLENGE);
  }

  return withFamilyPrivacyHeaders(new Response(message, { status, headers }));
}

async function hasValidFamilyCredentials(request: Request, expectedPassword: string) {
  const credentials = parseBasicCredentials(request.headers.get('Authorization'));

  if (!credentials || credentials.username !== FAMILY_USERNAME) {
    return false;
  }

  return timingSafeTextEqual(credentials.password, expectedPassword);
}

function parseBasicCredentials(header: string | null) {
  const match = /^Basic\s+([A-Za-z0-9+/]+={0,2})$/i.exec(header?.trim() ?? '');

  if (!match) {
    return undefined;
  }

  try {
    const encodedBytes = atob(match[1]);
    const bytes = Uint8Array.from(encodedBytes, (character) => character.charCodeAt(0));
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const separatorIndex = decoded.indexOf(':');

    if (separatorIndex < 0) {
      return undefined;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return undefined;
  }
}

async function timingSafeTextEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  const [leftDigest, rightDigest] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(left)),
    crypto.subtle.digest('SHA-256', encoder.encode(right)),
  ]);
  const subtle = crypto.subtle as SubtleCrypto & {
    timingSafeEqual(first: ArrayBuffer, second: ArrayBuffer): boolean;
  };

  return subtle.timingSafeEqual(leftDigest, rightDigest);
}

function withFamilyPrivacyHeaders(response: Response) {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'private, no-store');
  headers.set('Pragma', 'no-cache');
  headers.set('X-Robots-Tag', ROBOTS_HEADER_VALUE);
  appendVary(headers, 'Authorization');
  const body = response.status === 204 || response.status === 205 || response.status === 304
    ? null
    : response.body;

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function appendVary(headers: Headers, value: string) {
  const varyValues = (headers.get('Vary') ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!varyValues.some((item) => item.toLowerCase() === value.toLowerCase())) {
    varyValues.push(value);
  }

  headers.set('Vary', varyValues.join(', '));
}

async function handleLogin(context: EventContext<Env, string, unknown>, password: string) {
  const form = await context.request.formData();
  const submittedPassword = String(form.get('password') ?? '');
  const url = new URL(context.request.url);
  const next = normaliseNext(String(form.get('next') ?? url.searchParams.get('next') ?? ''));

  if (submittedPassword !== password) {
    const retryUrl = new URL(WELCOME_PATH, url.origin);
    retryUrl.searchParams.set('error', '1');
    retryUrl.searchParams.set('next', next);
    return Response.redirect(retryUrl.toString(), 302);
  }

  const cookieValue = await buildCookieValue(password, context.env.WEDDING_AUTH_SECRET);
  const response = new Response(null, {
    status: 302,
    headers: {
      Location: new URL(next, url.origin).toString(),
    },
  });
  const secureAttribute = url.protocol === 'https:' ? '; Secure' : '';
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=${cookieValue}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly${secureAttribute}; SameSite=Lax`,
  );

  return response;
}

async function handleLogout(context: EventContext<Env, string, unknown>) {
  const url = new URL(context.request.url);
  const next = context.request.method === 'POST'
    ? normaliseNext(String((await context.request.formData()).get('next') ?? ''))
    : normaliseNext(url.searchParams.get('next'));
  const welcomeUrl = new URL(WELCOME_PATH, url.origin);
  welcomeUrl.searchParams.set('next', next);

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: welcomeUrl.toString(),
    },
  });
  const secureAttribute = url.protocol === 'https:' ? '; Secure' : '';
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly${secureAttribute}; SameSite=Lax`,
  );
  response.headers.append(
    'Set-Cookie',
    `${ADMIN_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly${secureAttribute}; SameSite=Lax`,
  );

  return response;
}

async function isAuthenticated(context: EventContext<Env, string, unknown>, password: string) {
  const expectedCookie = await buildCookieValue(password, context.env.WEDDING_AUTH_SECRET);
  const actualCookie = readCookie(context.request.headers.get('Cookie') ?? '', COOKIE_NAME);
  return actualCookie === expectedCookie;
}

function withRobotsHeader(response: Response) {
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', ROBOTS_HEADER_VALUE);
  const body = response.status === 204 || response.status === 205 || response.status === 304
    ? null
    : response.body;

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isPublicAsset(pathname: string) {
  return (
    pathname === '/robots.txt' ||
    pathname === '/favicon.svg' ||
    pathname === '/petri-turicensis-vi-mmxxvii' ||
    pathname === '/petri-turicensis-vi-mmxxvii/' ||
    pathname === '/petri-turicensis-vi-mmxxvii/assets/invitation-1320.webp' ||
    pathname === '/petri-turicensis-vi-mmxxvii/assets/invitation-2640.webp' ||
    pathname === '/images/minted/minted-hero.jpg' ||
    pathname.startsWith('/images/landing/') ||
    pathname.startsWith('/_astro/')
  );
}

function getFamilyPathname(pathname: string) {
  const lowerPathname = pathname.toLowerCase();

  if (lowerPathname === FAMILY_PATH) {
    return FAMILY_PATH;
  }

  if (lowerPathname.startsWith(`${FAMILY_PATH}/`)) {
    return `${FAMILY_PATH}${pathname.slice(FAMILY_PATH.length)}`;
  }

  return undefined;
}

function normalisePathnameForSecurity(pathname: string) {
  let decodedPathname = pathname;

  try {
    for (let pass = 0; pass < 4; pass += 1) {
      const nextPathname = decodeURIComponent(decodedPathname);

      if (nextPathname === decodedPathname) {
        break;
      }

      decodedPathname = nextPathname;
    }
  } catch {
    return pathname.replace(/\\/g, '/');
  }

  const slashPathname = decodedPathname.replace(/\\/g, '/');
  const hasTrailingSlash = slashPathname.endsWith('/');
  const segments: string[] = [];

  for (const segment of slashPathname.split('/')) {
    if (!segment || segment === '.') {
      continue;
    }

    if (segment === '..') {
      segments.pop();
      continue;
    }

    segments.push(segment);
  }

  const normalisedPathname = `/${segments.join('/')}`;
  return hasTrailingSlash && normalisedPathname !== '/'
    ? `${normalisedPathname}/`
    : normalisedPathname;
}

function isWelcomePath(pathname: string) {
  return pathname === '/' || pathname === WELCOME_PATH || pathname === '/welcome';
}

function isLegacyLoginPath(pathname: string) {
  return pathname === '/login/' || pathname === '/login';
}

function isLogoutPath(pathname: string) {
  return pathname === '/logout/' || pathname === '/logout';
}

function buildWelcomeUrl(url: URL) {
  const welcomeUrl = new URL(WELCOME_PATH, url.origin);
  welcomeUrl.searchParams.set('next', normaliseNext(`${url.pathname}${url.search}`));
  return welcomeUrl;
}

function normaliseNext(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/en/';
  }

  const pathname = value.split('?')[0];
  if (pathname === '/' || isWelcomePath(pathname) || isLegacyLoginPath(pathname)) {
    return '/en/';
  }

  return value;
}

function readCookie(header: string, name: string) {
  const cookies = header.split(';').map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : undefined;
}

async function buildCookieValue(password: string, secret = 'wedding-site') {
  const input = new TextEncoder().encode(`${password}:${secret}`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
