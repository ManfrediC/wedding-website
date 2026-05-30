type Env = {
  WEBSITE_PW?: string;
  WEDDING_SITE_PASSWORD?: string;
  WEDDING_AUTH_SECRET?: string;
};

const COOKIE_NAME = 'gm_wedding_auth';
const ADMIN_COOKIE_NAME = 'gm_rsvp_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const ROBOTS_HEADER_VALUE = 'noindex, nofollow';
const WELCOME_PATH = '/welcome/';

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const password = context.env.WEBSITE_PW ?? context.env.WEDDING_SITE_PASSWORD;

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
    pathname === '/images/minted/minted-hero.jpg' ||
    pathname.startsWith('/images/landing/') ||
    pathname.startsWith('/_astro/')
  );
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
