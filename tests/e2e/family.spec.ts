import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
}

test('family itinerary is complete, localised, and absent from site navigation', async ({ page }) => {
  await page.goto('/family/');

  await expect(page.getByRole('heading', { level: 1, name: 'Family schedule' })).toBeVisible();
  await expect(page.getByText('11:30–12:00', { exact: true })).toBeVisible();
  await expect(page.getByText('Around 13:15', { exact: true })).toBeVisible();
  await expect(page.getByText('Venue to be confirmed', { exact: true })).toBeVisible();
  await expect(page.getByText('handover place for the bouquet and boutonnières', { exact: false })).toBeVisible();
  await expect(page.getByText('Provisional', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('To be confirmed', { exact: true }).first()).toBeVisible();
  await expect(page.locator('.logout-form')).toHaveCount(0);
  await expect(page.locator('.desktop-nav a[href^="/family"], .mobile-menu nav a[href^="/family"]')).toHaveCount(0);
  const languageLinks = page.locator('.header-language a');
  await expect(languageLinks).toHaveCount(3);
  await expect(languageLinks.nth(0)).toHaveAttribute('href', '/family/');
  await expect(languageLinks.nth(1)).toHaveAttribute('href', '/family/it/');
  await expect(languageLinks.nth(2)).toHaveAttribute('href', '/family/de/');
  await expectNoHorizontalOverflow(page);

  await page.goto('/family/it/');
  await expect(page.getByRole('heading', { level: 1, name: 'Programma per la famiglia' })).toBeVisible();
  await expect(page.getByText('Pranzo di famiglia dopo la cerimonia civile', { exact: true })).toBeVisible();
  await expect(page.getByText('il luogo di consegna del bouquet e delle boutonnière', { exact: false })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.goto('/family/de/');
  await expect(page.getByRole('heading', { level: 1, name: 'Familienablauf' })).toBeVisible();
  await expect(page.getByText('Familienmittagessen nach der zivilen Trauung', { exact: true })).toBeVisible();
  await expect(page.getByText('der Übergabeort für Brautstrauss und Ansteckblumen', { exact: false })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.goto('/en/');
  await expect(page.locator('.desktop-nav a[href^="/family"], .mobile-menu nav a[href^="/family"]')).toHaveCount(0);
  await expect(page.getByText('Family schedule', { exact: true })).toHaveCount(0);
});
