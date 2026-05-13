import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ?? '4322';
const baseUrl = `http://${host}:${port}`;
const playwrightArgs = process.argv.slice(2);
const isWindows = process.platform === 'win32';

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
      env: process.env,
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
      throw new Error(`Astro preview exited before ${url} became available.`);
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

  previewProcess = spawn(
    process.execPath,
    [join(repoRoot, 'node_modules', 'astro', 'bin', 'astro.mjs'), 'preview', '--port', port, '--host', host],
    {
      cwd: repoRoot,
      detached: !isWindows,
      env: process.env,
      stdio: 'inherit',
    },
  );

  await waitForServer(`${baseUrl}/en/`);

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
