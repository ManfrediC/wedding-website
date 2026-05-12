import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import net from 'node:net';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const DEFAULT_LIVE_URL = 'https://wedding-website-2ng.pages.dev';
const DEFAULT_CHANNELS = ['chrome', 'msedge'];

const args = parseArgs(process.argv.slice(2));
const startPreview = Boolean(args['start-preview']);
const saveScreenshots = !args['no-screenshots'];
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const envValues = await loadEnvFile(join(process.cwd(), 'env', 'website_pw.env'));
const password = process.env.WEBSITE_PW ?? envValues.WEBSITE_PW;

if (!password) {
  throw new Error('Set WEBSITE_PW in env/website_pw.env or the process environment before running the smoke check.');
}

let previewProcess;
let baseUrl = trimTrailingSlash(args.base ?? process.env.SMOKE_BASE_URL ?? DEFAULT_LIVE_URL);

try {
  if (startPreview) {
    const port = await findAvailablePort(Number(args.port ?? process.env.PORT ?? 4350));
    baseUrl = `http://127.0.0.1:${port}`;
    previewProcess = await startProtectedPreview(port);
  }

  const result = await runSmokeCheck({
    baseUrl,
    password,
    saveScreenshots,
    screenshotPrefix: startPreview ? `local-protected-smoke-${runId}` : `live-protected-smoke-${runId}`,
    channelPreference: args['browser-channel'],
  });

  console.log(JSON.stringify(result, null, 2));
} finally {
  if (previewProcess) {
    previewProcess.kill();
  }
}

async function runSmokeCheck({ baseUrl, password, saveScreenshots, screenshotPrefix, channelPreference }) {
  const { browser, channel } = await launchBrowser(channelPreference);
  const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await waitForVisibleText(page, 'Gabriela & Manfredi', 'password gate heading');
  await waitForVisibleText(page, 'Please enter the password from your invitation.', 'password prompt');
  await assertAbsent(page, 'Private wedding website', 'password gate private wording');
  await assertAbsent(page, 'Kirche St. Peter', 'password gate venue leak');
  await assertAbsent(page, 'Hotel Sonne', 'password gate venue leak');

  await page.getByRole('link', { name: 'Italiano' }).click();
  await waitForVisibleText(page, 'Inserite la password indicata nel vostro invito.', 'Italian password prompt');
  await assertInputValue(page, 'input[name="next"]', '/it/', 'Italian post-login destination');

  await page.getByRole('link', { name: 'Deutsch' }).click();
  await waitForVisibleText(page, 'Bitte gebt das Passwort aus eurer Einladung ein.', 'German password prompt');
  await assertInputValue(page, 'input[name="next"]', '/de/', 'German post-login destination');

  await page.locator('#password').fill(password);
  await Promise.all([
    page.waitForURL('**/de/**', { timeout: 20_000 }),
    page.getByRole('button', { name: 'Öffnen' }).click(),
  ]);
  await waitForVisibleText(page, 'Gabriela & Manfredi', 'authenticated home');

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await waitForVisibleText(page, 'Please enter the password from your invitation.', 'authenticated root landing');
  await assertAbsent(page, 'Kirche St. Peter', 'authenticated root venue leak');
  await assertAbsent(page, 'Hotel Sonne', 'authenticated root venue leak');

  await page.goto(`${baseUrl}/it/schedule/`, { waitUntil: 'networkidle' });
  await waitForVisibleText(page, 'Il giorno del matrimonio', 'Italian schedule heading');
  await waitForVisibleText(page, 'Lago di Zurigo', 'Italian schedule lake location');
  await waitForVisibleText(page, 'Da K\u00fcsnacht a Zurigo', 'Italian schedule return location');
  await assertAbsent(page, 'Lake Zurich', 'Italian schedule English fallback');
  await assertAbsent(page, 'K\u00fcsnacht to Zurich', 'Italian schedule English fallback');
  const desktopOverflow = await assertNoHorizontalOverflow(page, 'Italian schedule desktop');

  await page.goto(`${baseUrl}/de/schedule/`, { waitUntil: 'networkidle' });
  await waitForVisibleText(page, 'Unser Hochzeitstag', 'German schedule heading');
  await waitForVisibleText(page, 'Z\u00fcrichsee', 'German schedule lake location');
  await waitForVisibleText(page, 'K\u00fcsnacht nach Z\u00fcrich', 'German schedule return location');
  await assertAbsent(page, 'Lake Zurich', 'German schedule English fallback');
  await assertAbsent(page, 'K\u00fcsnacht to Zurich', 'German schedule English fallback');

  await page.goto(`${baseUrl}/it/stay/`, { waitUntil: 'networkidle' });
  await waitForVisibleText(page, 'l\u2019S2 \u00e8 di solito il miglior treno diretto per Richterswil', 'Italian Stay S2 copy');

  await page.goto(`${baseUrl}/de/stay/`, { waitUntil: 'networkidle' });
  await waitForVisibleText(page, 'die S2 meist der beste direkte Zug nach Richterswil', 'German Stay S2 copy');

  await page.goto(`${baseUrl}/it/faq/`, { waitUntil: 'networkidle' });
  await page.getByText('Cosa bisogna sapere sulla dogana svizzera?', { exact: true }).click();
  await waitForVisibleText(page, 'I controlli sono meno probabili in aeroporto', 'Italian customs FAQ');

  await page.goto(`${baseUrl}/de/faq/`, { waitUntil: 'networkidle' });
  await page.getByText('Was sollte ich zum Schweizer Zoll wissen?', { exact: true }).click();
  await waitForVisibleText(page, 'Kontrollen sind am Flughafen weniger wahrscheinlich', 'German customs FAQ');

  const screenshots = [];
  if (saveScreenshots) {
    await mkdir('tmp', { recursive: true });
    const desktopPath = `tmp/${screenshotPrefix}-desktop.png`;
    await page.screenshot({ path: desktopPath, fullPage: true });
    screenshots.push(desktopPath);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/de/schedule/`, { waitUntil: 'networkidle' });
  const mobileOverflow = await assertNoHorizontalOverflow(page, 'German schedule mobile');

  if (saveScreenshots) {
    const mobilePath = `tmp/${screenshotPrefix}-mobile.png`;
    await page.screenshot({ path: mobilePath, fullPage: true });
    screenshots.push(mobilePath);
  }

  await browser.close();

  return {
    ok: true,
    baseUrl,
    browserChannel: channel,
    desktopOverflow,
    mobileOverflow,
    screenshots,
  };
}

async function launchBrowser(channelPreference) {
  const channels = channelPreference ? [channelPreference] : DEFAULT_CHANNELS;
  const errors = [];

  for (const channel of channels) {
    try {
      return {
        browser: await chromium.launch({ headless: true, channel }),
        channel,
      };
    } catch (error) {
      errors.push(`${channel}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`Could not launch a supported browser channel.\n${errors.join('\n')}`);
}

async function waitForVisibleText(page, text, label) {
  try {
    await page.getByText(text, { exact: false }).first().waitFor({ state: 'visible', timeout: 10_000 });
  } catch (error) {
    throw new Error(`${label}: expected visible text ${JSON.stringify(text)}. ${error instanceof Error ? error.message : error}`);
  }
}

async function assertAbsent(page, text, label) {
  const count = await page.getByText(text, { exact: false }).count();
  if (count > 0) {
    throw new Error(`${label}: unexpected text ${JSON.stringify(text)} appeared ${count} time(s).`);
  }
}

async function assertInputValue(page, selector, expectedValue, label) {
  const actualValue = await page.locator(selector).inputValue();

  if (actualValue !== expectedValue) {
    throw new Error(`${label}: expected ${JSON.stringify(expectedValue)}, received ${JSON.stringify(actualValue)}.`);
  }
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  const delta = overflow.scrollWidth - overflow.viewport;

  if (delta > 1) {
    throw new Error(`${label}: horizontal overflow ${overflow.scrollWidth} > ${overflow.viewport}.`);
  }

  return Math.max(0, delta);
}

async function startProtectedPreview(port) {
  if (!existsSync(join(process.cwd(), 'dist'))) {
    throw new Error('The dist directory does not exist. Run npm run build first.');
  }

  const child = spawn(process.execPath, ['scripts/serve-protected-preview.mjs', '--port', String(port)], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const output = [];

  child.stdout.on('data', (chunk) => output.push(chunk.toString()));
  child.stderr.on('data', (chunk) => output.push(chunk.toString()));

  await waitForHttpOk(`http://127.0.0.1:${port}/welcome/`, child, output);
  return child;
}

async function waitForHttpOk(url, child, output) {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Protected preview exited early.\n${output.join('')}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // The server may still be starting.
    }

    await sleep(250);
  }

  throw new Error(`Timed out waiting for protected preview at ${url}.\n${output.join('')}`);
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 50; port += 1) {
    if (await canListen(port)) {
      return port;
    }
  }

  throw new Error(`No available local port found from ${startPort} to ${startPort + 49}.`);
}

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
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
    if (match) {
      values[match[1]] = stripQuotes(match[2].trim());
    }
  }

  return values;
}

function parseArgs(argv) {
  const values = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--')) {
      continue;
    }

    const key = arg.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith('--')) {
      values[key] = true;
      continue;
    }

    values[key] = next;
    index += 1;
  }

  return values;
}

function stripQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

function trimTrailingSlash(value) {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
