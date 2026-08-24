import { expect, test, type Page } from '@playwright/test';

const invitationPath = '/petri-turicensis-vi-mmxxvii/';

async function expectInvitationClosed(page: Page) {
  await expect(page.locator('body')).toHaveClass(/\blocked\b/);
  await expect(page.locator('#stage')).toBeVisible();
  await expect(page.locator('#suite')).not.toHaveClass(/\bshown\b/);
}

async function openInvitation(page: Page) {
  await page.locator('#stage').click();
  await expect(page.locator('#continue')).toHaveClass(/\bshow\b/, { timeout: 5_000 });
}

async function expectSettledCard(page: Page) {
  const card = page.locator('#card');
  await expect(card).toHaveClass(/\bis-settled\b/, { timeout: 5_000 });

  const state = await card.evaluate((element) => {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const bounds = element.getBoundingClientRect();

    return {
      scaleX: matrix.a,
      scaleY: matrix.d,
      width: bounds.width,
      height: bounds.height,
      willChange: style.willChange,
    };
  });

  expect(state.scaleX).toBeCloseTo(1, 3);
  expect(state.scaleY).toBeCloseTo(1, 3);
  expect(state.width / state.height).toBeCloseTo(11 / 17, 3);
  expect(state.willChange).toBe('auto');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

async function revealInvitation(page: Page) {
  await openInvitation(page);
  await expectSettledCard(page);
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

  const invitationImage = page.locator('#card img');
  await expect(invitationImage).toHaveAttribute('src', '/petri-turicensis-vi-mmxxvii/assets/invitation-1320.webp');
  await expect(invitationImage).toHaveAttribute('width', '1320');
  await expect(invitationImage).toHaveAttribute('height', '2040');
  await expect(invitationImage).toHaveAttribute('srcset', /invitation-2640\.webp 2640w/);

  await openInvitation(page);
  await expectSettledCard(page);
  expect(await invitationImage.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/invitation-(1320|2640)\.webp$/);
  await testInfo.attach('invitation-opened', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  const originalViewport = page.viewportSize();
  if (!originalViewport) throw new Error('Invitation tests require a fixed viewport.');
  await page.setViewportSize({
    width: Math.max(320, originalViewport.width - 37),
    height: Math.max(600, originalViewport.height - 41),
  });
  await expectSettledCard(page);
  await page.setViewportSize(originalViewport);
  await expectSettledCard(page);

  await page.locator('#continue').click();
  await expect(page.locator('#suite')).toHaveClass(/\bshown\b/);
  const continueLink = page.getByRole('link', { name: 'Continue to the wedding website' });
  await expect(continueLink).toBeVisible();
  await expect(continueLink).toHaveAttribute('href', '/welcome/');
  await testInfo.attach('invitation-revealed', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Open the envelope again' }).click();
  await expectInvitationClosed(page);
  await expect(page.locator('#card')).not.toHaveClass(/\bis-settled\b/);
  expect(await page.locator('#card').evaluate((element) => (element as HTMLElement).style.width)).toBe('');

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
