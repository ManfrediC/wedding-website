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

async function readZoomState(page: Page) {
  return page.locator('#zoomImage').evaluate((image) => {
    const style = window.getComputedStyle(image);
    const bounds = image.getBoundingClientRect();

    return {
      width: bounds.width,
      height: bounds.height,
      transform: style.transform,
      naturalWidth: (image as HTMLImageElement).naturalWidth,
    };
  });
}

async function readZoomCentre(page: Page) {
  return page.locator('#zoomViewport').evaluate((viewport) => ({
    x: ((viewport as HTMLElement).scrollLeft + (viewport as HTMLElement).clientWidth / 2) /
      (viewport as HTMLElement).scrollWidth,
    y: ((viewport as HTMLElement).scrollTop + (viewport as HTMLElement).clientHeight / 2) /
      (viewport as HTMLElement).scrollHeight,
  }));
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
  await expect(page.locator('#zoomImage')).not.toHaveAttribute('src', /.+/);

  await openInvitation(page);
  await expectSettledCard(page);
  await expect(page.locator('#stageActions')).toHaveClass(/\bshow\b/);
  await expect(page.getByRole('button', { name: 'Enlarge', exact: true })).toBeVisible();
  await expect(page.locator('#card')).toHaveAttribute('aria-disabled', 'false');
  await expect(page.locator('#card')).toHaveAttribute('tabindex', '0');
  expect(await invitationImage.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/invitation-(1320|2640)\.webp$/);
  await testInfo.attach('invitation-opened', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  const zoomDialog = page.locator('#zoomDialog');
  const zoomImage = page.locator('#zoomImage');
  const zoomStatus = page.locator('#zoomStatus');
  const zoomViewport = page.locator('#zoomViewport');
  const enlarge = page.getByRole('button', { name: 'Enlarge', exact: true });
  await enlarge.click();
  await expect(zoomDialog).toHaveAttribute('open', '');
  await expect(zoomImage).toHaveAttribute(
    'src',
    '/petri-turicensis-vi-mmxxvii/assets/invitation-2640.webp',
  );
  await expect.poll(async () => (await readZoomState(page)).naturalWidth).toBe(2640);
  await expect(zoomStatus).toHaveText('100%');

  const fitState = await readZoomState(page);
  expect(fitState.transform).toBe('none');
  expect(fitState.width).toBeLessThanOrEqual(1320);
  expect(fitState.width / fitState.height).toBeCloseTo(11 / 17, 3);
  await testInfo.attach('invitation-zoom-fit', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(zoomStatus).toHaveText('150%');
  expect((await readZoomState(page)).width).toBeCloseTo(fitState.width * 1.5, 0);

  await zoomViewport.evaluate((viewport) => {
    const element = viewport as HTMLElement;
    element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
    element.scrollTop = (element.scrollHeight - element.clientHeight) / 3;
  });
  const centreBeforeZoom = await readZoomCentre(page);
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(zoomStatus).toHaveText('200%');
  await expect(page.getByRole('button', { name: 'Zoom in' })).toBeDisabled();
  await page.waitForTimeout(50);
  const centreAfterZoom = await readZoomCentre(page);
  expect(centreAfterZoom.x).toBeCloseTo(centreBeforeZoom.x, 1);
  expect(centreAfterZoom.y).toBeCloseTo(centreBeforeZoom.y, 1);

  await page.keyboard.press('-');
  await expect(zoomStatus).toHaveText('150%');
  await page.keyboard.press('0');
  await expect(zoomStatus).toHaveText('100%');

  const zoomViewportSize = page.viewportSize();
  if (!zoomViewportSize) throw new Error('Invitation tests require a fixed viewport.');
  await page.setViewportSize({
    width: Math.max(320, zoomViewportSize.width - 37),
    height: Math.max(600, zoomViewportSize.height - 41),
  });
  await expect(zoomStatus).toHaveText('100%');
  expect((await readZoomState(page)).width).toBeLessThan(fitState.width);
  await page.setViewportSize(zoomViewportSize);

  await page.getByRole('button', { name: 'Close' }).click();
  await expect(zoomDialog).not.toHaveAttribute('open', '');
  await expect(enlarge).toBeFocused();

  await page.locator('#card').click();
  await expect(zoomDialog).toHaveAttribute('open', '');
  await expect(page.locator('#suite')).not.toHaveClass(/\bshown\b/);
  await page.keyboard.press('Escape');
  await expect(zoomDialog).not.toHaveAttribute('open', '');
  await expect(page.locator('#card')).toBeFocused();

  await page.locator('#card').press('Enter');
  await expect(zoomDialog).toHaveAttribute('open', '');
  await page.keyboard.press('Shift+=');
  await expect(zoomStatus).toHaveText('150%');
  await page.keyboard.press('0');
  await expect(zoomStatus).toHaveText('100%');
  await page.keyboard.press('Escape');
  await expect(zoomDialog).not.toHaveAttribute('open', '');

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
  await expect(page.locator('#zoomImage')).not.toHaveAttribute('src', /.+/);
  await openInvitation(page);
  await expectSettledCard(page);
  await page.getByRole('button', { name: 'Enlarge', exact: true }).click();
  await expect(page.locator('#zoomDialog')).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#continue').click();
  await expect(page.locator('#suite')).toHaveClass(/\bshown\b/);
  await expect(page.getByRole('link', { name: 'Continue to the wedding website' })).toBeVisible();
});
