import { expect, test } from '@playwright/test';

const registryUrl = 'https://www.zola.com/registry/gabrielaandmanfredi';
const locales = [
  { lang: 'en', label: 'Gift registry', newTab: 'opens in a new tab', question: 'Do you have a gift registry?', optional: 'please do not feel any obligation' },
  { lang: 'it', label: 'Lista nozze', newTab: 'si apre in una nuova scheda', question: 'Avete una lista nozze?', optional: 'non sentitevi obbligati' },
  { lang: 'de', label: 'Geschenke', newTab: 'öffnet in einem neuen Tab', question: 'Habt ihr eine Wunschliste?', optional: 'fühlt euch bitte nicht verpflichtet' },
];

for (const { lang, label, newTab, question, optional } of locales) {
  test(`registry link works in the ${lang} navigation and FAQ`, async ({ page, context }, testInfo) => {
    await page.goto(`/${lang}/faq/`);
    const desktopNav = page.getByRole('navigation', { name: 'Primary navigation' });
    const useMobileMenu = !(await desktopNav.isVisible());
    if (useMobileMenu) {
      await page.locator('.mobile-menu > summary').click();
    }
    const nav = useMobileMenu ? page.getByRole('navigation', { name: 'Mobile navigation' }) : desktopNav;
    const registry = nav.getByRole('link', { name: `${label} (${newTab})`, exact: true });
    await expect(registry).toBeVisible();
    await expect(registry).toHaveAttribute('href', registryUrl);
    await expect(registry).toHaveAttribute('target', '_blank');
    await expect(registry).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(registry).not.toHaveAttribute('aria-current');
    await expect(nav.getByRole('link', { name: 'RSVP', exact: true })).toHaveAttribute('href', `/${lang}/rsvp/`);
    expect((await nav.getByRole('link').allTextContents()).slice(-2).map((text) => text.trim())).toEqual(['RSVP', label]);

    // Keep the new-tab check local rather than relying on Zola or making a real request.
    await context.route(registryUrl, (route) => route.fulfill({ body: '<title>Registry destination</title>' }));
    const popupPromise = page.waitForEvent('popup');
    await registry.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(registryUrl);
    await popup.close();
    await expect(page).toHaveURL(new RegExp(`/${lang}/faq/$`));
    if (useMobileMenu) {
      await page.locator('.mobile-menu > summary').click();
    }
    const faq = page.locator('.faq-list details').filter({ has: page.getByText(question, { exact: true }) });
    await faq.locator('summary').click();
    await expect(faq).toContainText(optional);
    const contentLink = faq.getByRole('link', { name: /Zola/ });
    await expect(contentLink).toBeVisible();
    await expect(contentLink).toHaveAttribute('href', registryUrl);
    expect((await page.request.get(`/${lang}/gifts/`)).status()).toBe(404);
    await testInfo.attach('registry-navigation', { body: await page.screenshot(), contentType: 'image/png' });
  });

  test(`registry navigation fits at desktop and mobile widths in ${lang}`, async ({ page }, testInfo) => {
    for (const width of [390, 1060, 1200, 1280, 1320, 1321, 1365, 1440, 1441]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${lang}/faq/`);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.locator('.site-header').evaluate((header) => {
        const nav = header.querySelector<HTMLElement>('.desktop-nav')!;
        const isDesktop = getComputedStyle(nav).display !== 'none';
        const links = Array.from(nav.querySelectorAll('a')).map((link) => {
          const rect = link.getBoundingClientRect();
          const range = document.createRange();
          range.selectNodeContents(link);
          return { left: rect.left, right: rect.right, lines: range.getClientRects().length };
        });
        const actions = header.querySelector('.header-actions')!.getBoundingClientRect();
        const monogram = header.querySelector('.monogram')!.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          isDesktop,
          fits: !isDesktop || (links.every((link) => link.lines === 1) && links[0].left >= monogram.right && links.at(-1)!.right <= actions.left),
        };
      });
      expect(layout.overflow, `${lang} at ${width}px`).toBeLessThanOrEqual(1);
      expect(layout.fits, `${lang} at ${width}px`).toBe(true);
      if (width === 390 || width === 1365) {
        await testInfo.attach(`registry-${lang}-${width}`, { body: await page.screenshot(), contentType: 'image/png' });
      }
    }
  });
}
