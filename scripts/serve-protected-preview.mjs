import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const COOKIE_NAME = 'gm_wedding_auth';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const WELCOME_PATH = '/welcome/';

const repoRoot = process.cwd();
const distDir = resolve(repoRoot, 'dist');
const localEnvPath = join(repoRoot, 'env', 'website_pw.env');
const localEnv = await loadEnvFile(localEnvPath);
const port = Number(readArg('port', process.env.PORT ?? '4321'));
const host = readArg('host', process.env.HOST ?? '127.0.0.1');
const password = process.env.WEBSITE_PW ?? localEnv.WEBSITE_PW;
const authSecret = process.env.WEDDING_AUTH_SECRET ?? localEnv.WEDDING_AUTH_SECRET ?? 'local-protected-preview';

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

    await serveStatic(url.pathname, response);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
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
    Location: next,
    'Set-Cookie': `${COOKIE_NAME}=${buildCookieValue()}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax`,
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
    pathname.startsWith('/_astro/')
  );
}

function isWelcomePath(pathname) {
  return pathname === WELCOME_PATH || pathname === '/welcome';
}

function isLegacyLoginPath(pathname) {
  return pathname === '/login/' || pathname === '/login';
}

function normaliseNext(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/en/';
  }

  const pathname = value.split('?')[0];
  if (isWelcomePath(pathname) || isLegacyLoginPath(pathname)) {
    return '/en/';
  }

  return value;
}

async function serveStatic(pathname, response) {
  const filePath = resolveStaticPath(pathname);
  const fileStat = await stat(filePath).catch(() => undefined);

  if (!fileStat?.isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': contentType(filePath) });
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
  response.writeHead(302, { Location: location });
  response.end();
}
