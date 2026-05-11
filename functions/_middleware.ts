type Env = {
  WEBSITE_PW?: string;
  WEDDING_SITE_PASSWORD?: string;
  WEDDING_AUTH_SECRET?: string;
};

const COOKIE_NAME = 'gm_wedding_auth';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const WELCOME_PATH = '/welcome/';

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const password = context.env.WEBSITE_PW ?? context.env.WEDDING_SITE_PASSWORD;

  if (!password || isPublicAsset(url.pathname)) {
    return context.next();
  }

  if (isLegacyLoginPath(url.pathname)) {
    const welcomeUrl = new URL(WELCOME_PATH, url.origin);
    const next = normaliseNext(url.searchParams.get('next'));
    welcomeUrl.searchParams.set('next', next);
    return Response.redirect(welcomeUrl.toString(), 302);
  }

  if (isWelcomePath(url.pathname)) {
    if (context.request.method === 'POST') {
      return handleLogin(context, password);
    }

    const expectedCookie = await buildCookieValue(password, context.env.WEDDING_AUTH_SECRET);
    const actualCookie = readCookie(context.request.headers.get('Cookie') ?? '', COOKIE_NAME);

    if (actualCookie === expectedCookie) {
      const next = normaliseNext(url.searchParams.get('next'));
      return Response.redirect(new URL(next, url.origin).toString(), 302);
    }

    return context.next();
  }

  const expectedCookie = await buildCookieValue(password, context.env.WEDDING_AUTH_SECRET);
  const actualCookie = readCookie(context.request.headers.get('Cookie') ?? '', COOKIE_NAME);

  if (actualCookie === expectedCookie) {
    return context.next();
  }

  return Response.redirect(buildWelcomeUrl(url).toString(), 302);
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

function isPublicAsset(pathname: string) {
  return (
    pathname === '/robots.txt' ||
    pathname === '/favicon.svg' ||
    pathname === '/images/minted/minted-hero.jpg' ||
    pathname.startsWith('/_astro/')
  );
}

function isWelcomePath(pathname: string) {
  return pathname === WELCOME_PATH || pathname === '/welcome';
}

function isLegacyLoginPath(pathname: string) {
  return pathname === '/login/' || pathname === '/login';
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
  if (isWelcomePath(pathname) || isLegacyLoginPath(pathname)) {
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
