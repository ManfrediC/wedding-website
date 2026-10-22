import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../../functions/_middleware.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { onRequest } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const env = { WEBSITE_PW: 'test-only-password', WEDDING_AUTH_SECRET: 'test-only-secret' };
const origin = 'https://wedding.example.test';
const login = await onRequest({
  env,
  request: new Request(`${origin}/welcome/`, {
    method: 'POST',
    body: new URLSearchParams({ password: env.WEBSITE_PW, next: '/en/faq/' }),
  }),
});
const cookie = login.headers.get('set-cookie').split(';')[0];

for (const lang of ['en', 'it', 'de']) {
  test(`retired ${lang} Gifts routes bypass cached assets after authentication`, async () => {
    for (const path of [`/${lang}/gifts`, `/${lang}/gifts/`, `/${lang}/gifts/index.html`, `/${lang}/%67ifts/`]) {
      const response = await onRequest({
        env,
        request: new Request(`${origin}${path}`, { headers: { Cookie: cookie } }),
        next: () => { throw new Error('Retired pages must not read cached assets.'); },
      });
      assert.equal(response.status, 404);
      assert.equal(await response.text(), 'Page not found.');
      assert.equal(response.headers.get('cache-control'), 'private, no-store');
      assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
    }
  });
}

test('retired Gifts URLs retain the password gate', async () => {
  const response = await onRequest({ env, request: new Request(`${origin}/en/gifts/`) });
  assert.equal(response.status, 302);
  assert.equal(new URL(response.headers.get('location')).pathname, '/welcome/');
});

test('the authenticated FAQ still reaches the page assets', async () => {
  const response = await onRequest({
    env,
    request: new Request(`${origin}/en/faq/`, { headers: { Cookie: cookie } }),
    next: () => new Response('FAQ content'),
  });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'FAQ content');
});
