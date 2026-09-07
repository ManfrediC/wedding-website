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
  await expect.poll(async () => (await readZoomState(page)).width).toBeLessThan(fitState.width);
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
  // Opening the viewer sets its fitted width on the next animation frame.
  await expect.poll(() => zoomImage.evaluate((image) => (image as HTMLElement).style.width)).not.toBe('');
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

// Pause only script-created animations; CSS fades can continue normally.
async function pauseInvitationAnimations(page: Page) {
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      const animation = animate.apply(this, args);
      animation.pause();
      return animation;
    };
  });
}

async function seekPhase(page: Page, fraction: number) {
  await page.evaluate((progress) => {
    for (const animation of document.getAnimations().filter((item) => item.playState === 'paused')) {
      animation.currentTime = Number(animation.effect!.getTiming().duration) * progress;
    }
  }, fraction);
}

async function finishPhase(page: Page, next: string) {
  await page.evaluate(() => {
    document.getAnimations().filter((item) => item.playState === 'paused').forEach((item) => item.finish());
  });
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', next);
}

async function readMotion(page: Page) {
  return page.evaluate(() => {
    const card = document.querySelector<HTMLElement>('#card')!;
    const pocket = document.querySelector<HTMLElement>('.env-body')!;
    const bounds = card.getBoundingClientRect();
    const front = pocket.getBoundingClientRect();
    const flap = document.querySelector('#flap')!.getBoundingClientRect();
    const actions = document.querySelector('#stageActions')!.getBoundingClientRect();
    const y = Math.max(bounds.top, front.top) + 2;
    const hit = document.elementFromPoint(bounds.x + bounds.width / 2, y);
    return {
      top: bounds.top, bottom: bounds.bottom, left: bounds.left, right: bounds.right,
      pocketTop: front.top, pocketBottom: front.bottom, flapTop: flap.top,
      occluded: hit === pocket, width: innerWidth, controlsTop: actions.top,
      matrix: getComputedStyle(card).transform,
    };
  });
}

for (const viewport of [
  { width: 1365, height: 900 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`invitation clears the envelope and viewport at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.endsWith('desktop'), 'Each browser uses explicit viewports here.');
    await page.setViewportSize(viewport);
    await pauseInvitationAnimations(page);
    await page.goto(invitationPath);
    await page.locator('#stage').click();
    await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'flap');
    await expect(page.locator('#continue')).toBeDisabled();
    await page.locator('#stage').dispatchEvent('click');
    await finishPhase(page, 'withdraw');

    for (const fraction of [0, 0.25, 0.5, 0.75, 0.999]) {
      await seekPhase(page, fraction);
      const frame = await readMotion(page);
      expect(frame.top).toBeGreaterThanOrEqual(15);
      expect(frame.bottom).toBeLessThanOrEqual(frame.controlsTop - 15);
      expect(frame.left).toBeGreaterThanOrEqual(15);
      expect(frame.right).toBeLessThanOrEqual(frame.width - 15);
      if (frame.bottom > frame.pocketTop + 3) expect(frame.occluded).toBe(true);
      if (fraction === 0.5) await testInfo.attach('withdrawing', { body: await page.screenshot(), contentType: 'image/png' });
    }
    await finishPhase(page, 'envelope-away');
    const extracted = await readMotion(page);
    expect(extracted.pocketTop - extracted.bottom).toBeGreaterThanOrEqual(7.5);
    await finishPhase(page, 'turn');
    for (const fraction of [0, 0.25, 0.5, 0.75, 0.999]) {
      await seekPhase(page, fraction);
      const frame = await readMotion(page);
      expect(frame.top).toBeGreaterThanOrEqual(15);
      expect(frame.bottom).toBeLessThanOrEqual(frame.controlsTop - 15);
      expect(frame.left).toBeGreaterThanOrEqual(15);
      expect(frame.right).toBeLessThanOrEqual(frame.width - 15);
      expect(frame.flapTop - frame.bottom).toBeGreaterThanOrEqual(7.5);
      if (fraction === 0.5) await testInfo.attach('turning', { body: await page.screenshot(), contentType: 'image/png' });
    }
    await finishPhase(page, 'enlarge');
    for (const fraction of [0, 0.5, 0.999]) {
      await seekPhase(page, fraction);
      const frame = await readMotion(page);
      expect(frame.top).toBeGreaterThanOrEqual(15);
      expect(frame.bottom).toBeLessThanOrEqual(frame.controlsTop - 15);
      expect(frame.left).toBeGreaterThanOrEqual(15);
      expect(frame.right).toBeLessThanOrEqual(frame.width - 15);
    }
    await finishPhase(page, 'settled');
    await expectSettledCard(page);
    await testInfo.attach('settled', { body: await page.screenshot(), contentType: 'image/png' });
  });
}

test('invitation cancels safely on resize and replay during motion', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await pauseInvitationAnimations(page);
  await page.goto(invitationPath);
  await page.locator('#stage').click();
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'flap');
  await finishPhase(page, 'withdraw');
  await seekPhase(page, 0.5);
  await page.setViewportSize({ width: 844, height: 390 });
  await expectSettledCard(page);
  await expect(page.locator('#continue')).toBeEnabled();
  await page.locator('#continue').click();
  await page.locator('#replay').click();
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'closed');
  await page.locator('#stage').click();
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'flap');
  // Exercise cancellation directly: the replay control is normally below the stage.
  await page.locator('#replay').dispatchEvent('click');
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'closed');
  await expect(page.locator('#continue')).toBeDisabled();
  await page.locator('#stage').click();
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'flap');
  expect(errors).toEqual([]);
});

test('invitation waits for image decoding and offers a retry after failure', async ({ page }) => {
  await page.addInitScript(() => {
    const decode = HTMLImageElement.prototype.decode;
    let attempt = 0;
    HTMLImageElement.prototype.decode = function () {
      if (!this.closest('#card')) return decode.call(this);
      attempt++;
      if (attempt === 1) return Promise.reject(new Error('Simulated decode failure'));
      return new Promise<void>((resolve, reject) => {
        window.addEventListener('release-invitation-image', () => decode.call(this).then(resolve, reject), { once: true });
      });
    };
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(invitationPath);
  await page.locator('#stage').click();
  await expect(page.getByRole('status')).toHaveText('Invitation could not load. Tap to try again.');
  await page.locator('#stage').click();
  await expect(page.locator('#stage')).toHaveAttribute('data-phase', 'loading');
  await expect(page.locator('#continue')).toBeDisabled();
  await expect(page.locator('#enlarge')).toBeDisabled();
  await page.evaluate(() => window.dispatchEvent(new Event('release-invitation-image')));
  await expectSettledCard(page);
  await expect(page.locator('#continue')).toBeEnabled();
});
