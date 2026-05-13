import { defineConfig, devices } from '@playwright/test';

declare const process: {
  env: {
    PORT?: string;
  };
};

const port = process.env.PORT ?? '4322';
const host = '127.0.0.1';
const desktopViewport = { width: 1365, height: 900 };
const narrowViewport = { width: 390, height: 844 };
const firefoxLaunchOptions = {
  // This Windows workstation blocks Firefox test content processes unless the sandbox is disabled.
  env: { MOZ_DISABLE_CONTENT_SANDBOX: '1' },
};

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://${host}:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome-desktop',
      use: { browserName: 'chromium', channel: 'chrome', viewport: desktopViewport },
    },
    {
      name: 'chrome-mobile',
      use: { ...devices['Pixel 7'], browserName: 'chromium', channel: 'chrome' },
    },
    {
      name: 'edge-desktop',
      use: { browserName: 'chromium', channel: 'msedge', viewport: desktopViewport },
    },
    {
      name: 'edge-mobile',
      use: { ...devices['Pixel 7'], browserName: 'chromium', channel: 'msedge' },
    },
    {
      name: 'firefox-desktop',
      use: {
        browserName: 'firefox',
        viewport: desktopViewport,
        launchOptions: firefoxLaunchOptions,
      },
    },
    {
      name: 'firefox-narrow',
      use: {
        browserName: 'firefox',
        viewport: narrowViewport,
        deviceScaleFactor: 1,
        launchOptions: firefoxLaunchOptions,
      },
    },
    {
      name: 'webkit-desktop',
      use: { browserName: 'webkit', viewport: desktopViewport },
    },
    {
      name: 'webkit-mobile',
      use: { ...devices['iPhone 13'], browserName: 'webkit' },
    },
  ],
});
