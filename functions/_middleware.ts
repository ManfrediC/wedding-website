type Env = {
  WEDDING_SITE_PASSWORD?: string;
  WEDDING_AUTH_SECRET?: string;
};

const COOKIE_NAME = 'gm_wedding_auth';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const password = context.env.WEDDING_SITE_PASSWORD;

  if (!password || isPublicPath(url.pathname)) {
    return context.next();
  }

  if (url.pathname === '/login/' || url.pathname === '/login') {
    if (context.request.method === 'POST') {
      return handleLogin(context, password);
    }

    return context.next();
  }

  const expectedCookie = await buildCookieValue(password, context.env.WEDDING_AUTH_SECRET);
  const actualCookie = readCookie(context.request.headers.get('Cookie') ?? '', COOKIE_NAME);

  if (actualCookie === expectedCookie) {
    return context.next();
  }

  const loginUrl = new URL('/login/', url.origin);
  loginUrl.searchParams.set('next', url.pathname);
  return Response.redirect(loginUrl.toString(), 302);
};

async function handleLogin(context: EventContext<Env, string, unknown>, password: string) {
  const form = await context.request.formData();
  const submittedPassword = String(form.get('password') ?? '');
  const url = new URL(context.request.url);
  const next = normaliseNext(url.searchParams.get('next'));

  if (submittedPassword !== password) {
    const retryUrl = new URL('/login/', url.origin);
    retryUrl.searchParams.set('error', '1');
    retryUrl.searchParams.set('next', next);
    return Response.redirect(retryUrl.toString(), 302);
  }

  const cookieValue = await buildCookieValue(password, context.env.WEDDING_AUTH_SECRET);
  const response = Response.redirect(new URL(next, url.origin).toString(), 302);
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=${cookieValue}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
  );

  return response;
}

function isPublicPath(pathname: string) {
  return (
    pathname === '/robots.txt' ||
    pathname === '/favicon.svg' ||
    pathname.startsWith('/_astro/')
  );
}

function normaliseNext(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/en/';
  }

  if (value === '/login/' || value === '/login') {
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
