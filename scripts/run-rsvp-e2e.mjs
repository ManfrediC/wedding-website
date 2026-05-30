import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ?? '4332';
const baseUrl = `http://${host}:${port}`;
const isWindows = process.platform === 'win32';
const playwrightArgs =
  process.argv.length > 2
    ? process.argv.slice(2)
    : ['tests/e2e/rsvp.spec.ts', '--project=chrome-desktop', '--reporter=list', '--output=tmp/rsvp-test-results'];
const testEnv = {
  ...process.env,
  HOST: host,
  PORT: port,
  WEBSITE_PW: 'rsvp-e2e-site-password',
  WEDDING_AUTH_SECRET: 'rsvp-e2e-site-secret',
  RSVP_ADMIN_PASSWORD: 'rsvp-e2e-admin-password',
  RSVP_ADMIN_SECRET: 'rsvp-e2e-admin-secret',
  RSVP_E2E_SITE_PASSWORD: 'rsvp-e2e-site-password',
  RSVP_E2E_ADMIN_PASSWORD: 'rsvp-e2e-admin-password',
  RSVP_NOTIFICATION_MODE: 'mock',
  RSVP_NOTIFICATION_FROM: 'rsvp@example.test',
  RSVP_PREVIEW_RESET: '1',
};

let previewProcess;
let shuttingDown = false;

function commandName(name) {
  return isWindows ? `${name}.cmd` : name;
}

async function runNpmScript(name) {
  if (process.env.npm_execpath) {
    await runRequired(process.execPath, [process.env.npm_execpath, 'run', name]);
    return;
  }

  await runRequired(commandName('npm'), ['run', name]);
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const shell = isWindows && command.endsWith('.cmd');
    const child = spawn(command, args, {
      cwd: repoRoot,
      env: testEnv,
      shell,
      stdio: 'inherit',
      ...options,
    });

    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (signal) {
        resolve(128);
        return;
      }

      resolve(code ?? 0);
    });
  });
}

async function runRequired(command, args) {
  const code = await run(command, args);

  if (code !== 0) {
    throw new Error(`${command} ${args.join(' ')} exited with code ${code}`);
  }
}

async function waitForServer(url, timeoutMs = 60_000) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    if (previewProcess?.exitCode !== null) {
      throw new Error(`Protected preview exited before ${url} became available.`);
    }

    try {
      const response = await fetch(url, { cache: 'no-store' });

      if (response.ok) {
        return;
      }

      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? 'unknown error'}`);
}

function stopPreview() {
  if (!previewProcess || previewProcess.exitCode !== null || !previewProcess.pid) {
    return;
  }

  if (isWindows) {
    spawnSync('taskkill', ['/pid', String(previewProcess.pid), '/T', '/F'], {
      stdio: 'ignore',
    });
    return;
  }

  try {
    process.kill(-previewProcess.pid, 'SIGTERM');
  } catch {
    previewProcess.kill('SIGTERM');
  }
}

async function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  stopPreview();
  process.exit(signal === 'SIGINT' ? 130 : 143);
}

process.once('SIGINT', () => {
  void shutdown('SIGINT');
});
process.once('SIGTERM', () => {
  void shutdown('SIGTERM');
});

try {
  await runNpmScript('build');

  previewProcess = spawn(process.execPath, ['scripts/serve-protected-preview.mjs', '--port', port, '--host', host], {
    cwd: repoRoot,
    detached: !isWindows,
    env: testEnv,
    stdio: 'inherit',
  });

  await waitForServer(`${baseUrl}/welcome/`);

  const testCode = await run(process.execPath, [
    join(repoRoot, 'node_modules', 'playwright', 'cli.js'),
    'test',
    ...playwrightArgs,
  ]);

  process.exitCode = testCode;
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  stopPreview();
  process.exit(process.exitCode ?? 0);
}
