import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const port = process.env.PORT ?? '4321';
const baseUrl = `http://127.0.0.1:${port}`;
const screenshotDir = join(process.cwd(), 'tmp', 'android');
const paths = ['/en/travel/', '/en/stay/', '/en/switzerland-guide/'];
const chromePackage = 'com.android.chrome';

function adb(...args) {
  return execFileSync('adb', args);
}

function adbText(...args) {
  return adb(...args).toString('utf8').trim();
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

await mkdir(screenshotDir, { recursive: true });

const devices = adbText('devices')
  .split(/\r?\n/)
  .slice(1)
  .filter((line) => /\tdevice$/.test(line));

if (devices.length === 0) {
  throw new Error('No Android device is connected over ADB.');
}

const model = adbText('shell', 'getprop', 'ro.product.model');
console.log(`Using Android device: ${model || devices[0]}`);
console.log(`Forwarding Android traffic to ${baseUrl}`);
adb('reverse', `tcp:${port}`, `tcp:${port}`);

for (const path of paths) {
  const url = `${baseUrl}${path}?android=${Date.now()}`;
  const name = path.replace(/^\/|\/$/g, '').replaceAll('/', '-');
  const screenshotPath = join(screenshotDir, `${name}.png`);

  console.log(`Opening ${url} in Android Chrome`);
  adb('shell', 'am', 'start', '-a', 'android.intent.action.VIEW', '-d', url, chromePackage);
  await delay(3500);

  await writeFile(screenshotPath, adb('exec-out', 'screencap', '-p'));
  console.log(`Captured ${screenshotPath}`);
}

console.log('Android screenshots are ready for visual review.');
