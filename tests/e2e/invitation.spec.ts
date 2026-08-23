import { expect, test, type Page } from '@playwright/test';

const invitationPath = '/petri-turicensis-vi-mmxxvii/';

async function expectInvitationClosed(page: Page) {
  await expect(page.locator('body')).toHaveClass(/\blocked\b/);
  await expect(page.locator('#stage')).toBeVisible();
  await expect(page.locator('#suite')).not.toHaveClass(/\bshown\b/);
}

async function revealInvitation(page: Page) {
  await page.locator('#stage').click();
  await expect(page.locator('#continue')).toHaveClass(/\bshow\b/, { timeout: 5_000 });
  await page.locator('#continue').click();
  await expect(page.locator('#suite')).toHaveClass(/\bshown\b/);
}

test('invitation restarts on every visit and continues to the password gate', async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      browserErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => browserErrors.push(error.message));

  const response = await page.goto(invitationPath, { waitUntil: 'networkidle' });
  expect(response?.ok()).toBe(true);
  await expectInvitationClosed(page);

  const source = await page.content();
  expect(source).not.toContain('Password:');
  expect(source).not.toContain('chrome-extension://');
  expect(source).not.toContain('gm_seen');
  expect(source).not.toContain('localStorage');
  expect(source).not.toContain('https://www.gabyandmanfredi.net');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);

  await revealInvitation(page);
  const continueLink = page.getByRole('link', { name: 'Continue to the wedding website' });
  await expect(continueLink).toBeVisible();
  await expect(continueLink).toHaveAttribute('href', '/welcome/');
  await testInfo.attach('invitation-revealed', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
  await page.reload({ waitUntil: 'networkidle' });
  await expectInvitationClosed(page);

  await page.goto(invitationPath, { waitUntil: 'networkidle' });
  await expectInvitationClosed(page);
  await revealInvitation(page);
  await page.getByRole('link', { name: 'Continue to the wedding website' }).click();
  await expect(page).toHaveURL(/\/welcome\/$/);
  await expect(page.getByLabel('Wedding password')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('invitation remains usable with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(invitationPath);
  await expectInvitationClosed(page);
  await revealInvitation(page);
  await expect(page.getByRole('link', { name: 'Continue to the wedding website' })).toBeVisible();
});
