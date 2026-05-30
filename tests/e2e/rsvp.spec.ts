import { expect, test, type Page } from '@playwright/test';

declare const process: {
  env: {
    RSVP_E2E_SITE_PASSWORD?: string;
    RSVP_E2E_ADMIN_PASSWORD?: string;
  };
};

const sitePassword = process.env.RSVP_E2E_SITE_PASSWORD ?? 'rsvp-e2e-site-password';
const adminPassword = process.env.RSVP_E2E_ADMIN_PASSWORD ?? 'rsvp-e2e-admin-password';

type PreviewNotifications = {
  messages: Array<{
    to: string;
    text: string;
  }>;
};

test.skip(!process.env.RSVP_E2E_SITE_PASSWORD, 'Run RSVP API tests with npm run test:rsvp:e2e.');

async function signIntoSite(page: Page, next = '/en/rsvp/') {
  await page.goto(`/welcome/?next=${next}`);
  await page.locator('input[name="password"]').fill(sitePassword);
  await page.locator('form[data-welcome-form] button[type="submit"]').click();
  await expect(page).toHaveURL(new RegExp(`${next.replace(/\//g, '\\/')}$`));
}

async function submitAttendingRsvp(page: Page, email: string) {
  await signIntoSite(page, '/en/rsvp/');
  await page.getByLabel('Your name').fill('Lucia Guest');
  await page.getByLabel('Email').fill(email);
  await page.locator('input[name="adult_name"]').first().fill('Lucia Guest');
  await page.getByRole('button', { name: 'Add adult' }).click();
  await page.locator('input[name="adult_name"]').nth(1).fill('Marco Guest');
  await page.locator('input[name="child_name"]').first().fill('Sofia Guest');
  await page.locator('input[name="child_age"]').first().fill('8');
  await expect(page.getByLabel('Please specify')).toBeHidden();
  await page.getByLabel('Dietary requirements').selectOption('other');
  await expect(page.getByLabel('Please specify')).toBeVisible();
  await page.getByLabel('Please specify').fill('Kosher meal');
  await page.getByLabel('Allergies').fill('=Peanuts');
  await page.getByLabel('Accessibility or mobility considerations').fill('Step-free route preferred');
  await page.locator('textarea[name="notes"]').fill('We may leave before the very end.');
  await page.getByRole('button', { name: 'Send RSVP' }).click();
  await expect(page.getByText('Thank you. Your RSVP has been received.')).toBeVisible();
}

async function loginToAdmin(page: Page) {
  await page.goto('/admin/rsvp/');
  await page.getByLabel('Admin password').fill(adminPassword);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'Current RSVPs' })).toBeVisible();
}

test('RSVP submission is stored, superseded by email, exported, and deleted through admin', async ({ page }) => {
  const email = 'lucia.rsvp@example.test';
  await submitAttendingRsvp(page, email);

  await loginToAdmin(page);
  const responseRow = page.getByRole('row').filter({ hasText: email });
  await expect(responseRow.getByRole('cell').first()).toContainText('Lucia Guest');
  await expect(responseRow.getByText(email)).toBeVisible();
  await expect(responseRow.getByText('Marco Guest')).toBeVisible();
  await expect(responseRow.getByText('Sofia Guest (8)')).toBeVisible();
  await expect(page.getByText('sent')).toBeVisible();

  const notificationsBefore = await page.evaluate(async (): Promise<PreviewNotifications> => {
    const response = await fetch('/api/_preview/notifications');
    return response.json();
  });
  expect(notificationsBefore.messages).toHaveLength(2);
  expect(notificationsBefore.messages.map((message) => message.to)).toEqual([
    'manfrediandgabriela@gmail.com',
    email,
  ]);
  expect(notificationsBefore.messages[1].text).toContain('Kosher meal');

  const csvBefore = await page.evaluate(async () => {
    const response = await fetch('/api/admin/rsvp.csv');
    return response.text();
  });
  expect(csvBefore).toContain('Lucia Guest');
  expect(csvBefore).toContain('Marco Guest');
  expect(csvBefore).toContain('Sofia Guest (8)');
  expect(csvBefore).toContain('Kosher meal');
  expect(csvBefore).toContain("'=Peanuts");

  await page.goto('/en/rsvp/');
  await page.getByLabel('No, sadly I/we cannot attend').check();
  await page.getByLabel('Your name').fill('Lucia Guest');
  await page.getByLabel('Email').fill(email);
  await page.locator('textarea[name="notes"]').fill('We are no longer able to travel.');
  await page.getByRole('button', { name: 'Send RSVP' }).click();
  await expect(page.getByText('Thank you. Your RSVP has been received.')).toBeVisible();

  const notificationsAfter = await page.evaluate(async (): Promise<PreviewNotifications> => {
    const response = await fetch('/api/_preview/notifications');
    return response.json();
  });
  expect(notificationsAfter.messages).toHaveLength(4);

  await page.goto('/admin/rsvp/');
  const supersededRow = page.getByRole('row').filter({ hasText: email });
  await expect(supersededRow.getByRole('cell', { name: 'Not attending' })).toBeVisible();
  await expect(page.getByText('Marco Guest')).toHaveCount(0);
  await page.getByRole('button', { name: 'Details' }).click();
  const detailDialog = page.locator('dialog');
  await expect(detailDialog.getByText('We are no longer able to travel.')).toBeVisible();
  await expect(detailDialog.getByText('Revision')).toBeVisible();
  await expect(detailDialog.getByText('2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

  const csvAfter = await page.evaluate(async () => {
    const response = await fetch('/api/admin/rsvp.csv');
    return response.text();
  });
  expect(csvAfter).toContain(',no,');
  expect(csvAfter).not.toContain('Marco Guest');

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('No RSVP responses yet.')).toBeVisible();
});

test('admin API is denied until the separate admin password is entered', async ({ page }) => {
  await signIntoSite(page, '/admin/rsvp/');
  const status = await page.evaluate(async () => {
    const response = await fetch('/api/admin/rsvp');
    return response.status;
  });

  expect(status).toBe(401);
  await expect(page.getByLabel('Admin password')).toBeVisible();
});

test('site logout clears the separate admin session', async ({ page }) => {
  await signIntoSite(page, '/admin/rsvp/');
  await page.getByLabel('Admin password').fill(adminPassword);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'Current RSVPs' })).toBeVisible();

  await Promise.all([
    page.waitForURL('**/welcome/?next=%2Fadmin%2Frsvp%2F'),
    page.getByRole('button', { name: 'Log out' }).click(),
  ]);

  await signIntoSite(page, '/admin/rsvp/');
  await expect(page.getByLabel('Admin password')).toBeVisible();
  const status = await page.evaluate(async () => {
    const response = await fetch('/api/admin/rsvp');
    return response.status;
  });
  expect(status).toBe(401);
});

test('RSVP form is multilingual and matches the current field scope', async ({ page }) => {
  await signIntoSite(page, '/it/rsvp/');
  await expect(page.getByText('Conferma di presenza').first()).toBeVisible();
  await expect(page.getByLabel('Il vostro nome')).toBeVisible();
  await expect(page.getByLabel('Esigenze alimentari')).toContainText('Altro (specificare)');
  await expect(page.getByText('Origine del viaggio')).toHaveCount(0);
  await expect(page.getByText('alloggio')).toHaveCount(0);

  await page.goto('/de/rsvp/');
  await expect(page.getByText('Rückmeldung').first()).toBeVisible();
  await expect(page.getByLabel('Euer Name')).toBeVisible();
  await expect(page.getByLabel('Ernährungsanforderungen')).toContainText('Andere (bitte angeben)');
  await expect(page.getByText('Anreiseort')).toHaveCount(0);
  await expect(page.getByText('Unterkunftsstatus')).toHaveCount(0);
});

test('RSVP page has no horizontal overflow on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signIntoSite(page, '/en/rsvp/');

  const overflow = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.viewport + 1);
});

test('RSVP page shows the privacy copy only inside the form', async ({ page }) => {
  await signIntoSite(page, '/en/rsvp/');

  await expect(page.locator('.notice-band')).toHaveCount(0);
  await expect(page.getByText('We will use your RSVP information only to plan the wedding')).toHaveCount(1);
});
