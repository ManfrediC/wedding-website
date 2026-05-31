import { expect, test, type Locator, type Page } from '@playwright/test';

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
  await expect(page.getByLabel('Yes, I/we will attend')).not.toBeChecked();
  await expect(page.getByLabel('No, sadly I/we cannot attend')).not.toBeChecked();
  await page.getByLabel('Yes, I/we will attend').check();
  await page.getByLabel('Your name').fill('Lucia Guest');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Country code').selectOption('+41');
  await page.getByLabel('Phone number').fill('44 555 0123');
  await page.getByLabel('Address').fill('Example Street 12, 8001 Zurich, Switzerland');
  await page.locator('input[name="adult_name"]').first().fill('Lucia Guest');
  const adultDietary = page.locator('select[name="adult_dietary_requirements"]');
  const adultDietaryOther = page.locator('input[name="adult_dietary_requirements_other"]');
  const adultAllergies = page.locator('input[name="adult_allergies"]');
  await expect(adultDietaryOther.first()).toBeHidden();
  await adultDietary.first().selectOption('other');
  await expect(adultDietaryOther.first()).toBeVisible();
  await adultDietaryOther.first().fill('Kosher meal');
  await adultAllergies.first().fill('=Peanuts');
  await page.getByRole('button', { name: 'Add adult' }).click();
  await page.locator('input[name="adult_name"]').nth(1).fill('Marco Guest');
  await adultDietary.nth(1).selectOption('Vegetarian');
  await page.locator('input[name="child_name"]').first().fill('Sofia Guest');
  await page.locator('input[name="child_age"]').first().fill('8');
  await page.locator('select[name="child_dietary_requirements"]').first().selectOption('Vegan');
  await page.locator('input[name="child_allergies"]').first().fill('Strawberries');
  await page.getByLabel('Accessibility or mobility considerations').fill('Step-free route preferred');
  await page.locator('textarea[name="notes"]').fill('=We may leave before the very end.');
  await page.getByRole('button', { name: 'Send RSVP' }).click();
  await expect(page.getByText('Thank you. Your RSVP has been received.')).toBeVisible();
}

async function loginToAdmin(page: Page) {
  await page.goto('/admin/rsvp/');
  await page.getByLabel('Admin password').fill(adminPassword);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'Current RSVPs' })).toBeVisible();
}

async function expectAlignedTop(left: Locator, right: Locator) {
  const leftBox = await left.boundingBox();
  const rightBox = await right.boundingBox();
  expect(leftBox).not.toBeNull();
  expect(rightBox).not.toBeNull();
  expect(Math.abs(leftBox!.y - rightBox!.y)).toBeLessThanOrEqual(2);
}

async function expectRsvpLabelsFit(page: Page) {
  const overflowingLabels = await page.locator('form[data-rsvp-form]').evaluate((form) =>
    Array.from(form.querySelectorAll<HTMLElement>('.rsvp-field > span:not(.sr-only), .rsvp-repeat-heading'))
      .map((element) => {
        const box = element.getBoundingClientRect();
        const parentBox = element.parentElement?.getBoundingClientRect();

        return {
          text: element.textContent?.trim(),
          crossesParentRight: parentBox ? box.right > parentBox.right + 1 : false,
          overflowsOwnBox: element.scrollWidth > element.clientWidth + 1,
        };
      })
      .filter(({ crossesParentRight, overflowsOwnBox }) => crossesParentRight || overflowsOwnBox),
  );

  expect(overflowingLabels).toEqual([]);
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
  await expect(page.getByText('Notification')).toHaveCount(0);
  await page.getByRole('button', { name: 'Details' }).click();
  const initialDetailDialog = page.locator('dialog');
  await expect(initialDetailDialog.getByText('+41 44 555 0123')).toBeVisible();
  await expect(initialDetailDialog.getByText('Example Street 12, 8001 Zurich, Switzerland')).toBeVisible();
  await expect(initialDetailDialog.getByText('Lucia Guest (Dietary: Kosher meal; Allergies: =Peanuts)')).toBeVisible();
  await expect(initialDetailDialog.getByText('Marco Guest (Dietary: Vegetarian)')).toBeVisible();
  await expect(initialDetailDialog.getByText('Sofia Guest (8) (Dietary: Vegan; Allergies: Strawberries)')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

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
  expect(notificationsBefore.messages[1].text).toContain('+41 44 555 0123');
  expect(notificationsBefore.messages[1].text).toContain('Example Street 12, 8001 Zurich, Switzerland');

  const csvBefore = await page.evaluate(async () => {
    const response = await fetch('/api/admin/rsvp.csv');
    return response.text();
  });
  expect(csvBefore).toContain('Lucia Guest');
  expect(csvBefore).toContain('+41 44 555 0123');
  expect(csvBefore).toContain('Example Street 12, 8001 Zurich, Switzerland');
  expect(csvBefore).toContain('Marco Guest');
  expect(csvBefore).toContain('Sofia Guest (8)');
  expect(csvBefore).toContain('Kosher meal');
  expect(csvBefore).toContain('Vegetarian');
  expect(csvBefore).toContain('Vegan');
  expect(csvBefore).toContain('Allergies: =Peanuts');
  expect(csvBefore).toContain("'=We may leave before the very end.");

  await page.goto('/en/rsvp/');
  await page.getByLabel('No, sadly I/we cannot attend').check();
  await page.getByLabel('Your name').fill('Lucia Guest');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Country code').selectOption('+41');
  await page.getByLabel('Phone number').fill('44 555 9876');
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
  await expect(detailDialog.getByText('+41 44 555 9876')).toBeVisible();
  await expect(detailDialog.getByText('We are no longer able to travel.')).toBeVisible();
  await expect(detailDialog.getByText('Revision')).toBeVisible();
  await expect(detailDialog.getByText('2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

  const csvAfter = await page.evaluate(async () => {
    const response = await fetch('/api/admin/rsvp.csv');
    return response.text();
  });
  expect(csvAfter).toContain(',no,');
  expect(csvAfter).toContain('+41 44 555 9876');
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
  await expect(page.getByLabel('Prefisso internazionale')).toBeVisible();
  await expect(page.getByLabel('Numero di telefono')).toBeVisible();
  await expect(page.getByLabel('Indirizzo')).toBeVisible();
  await expect(page.locator('select[name="adult_dietary_requirements"]').first()).toContainText('Altro (specificare)');
  await expect(page.locator('.notice-band')).toHaveCount(0);
  await expect(page.getByText('Origine del viaggio')).toHaveCount(0);
  await expect(page.getByText('alloggio')).toHaveCount(0);

  await page.goto('/de/rsvp/');
  await expect(page.getByText('Rückmeldung').first()).toBeVisible();
  await expect(page.getByLabel('Euer Name')).toBeVisible();
  await expect(page.getByLabel('Ländervorwahl')).toBeVisible();
  await expect(page.getByLabel('Telefonnummer')).toBeVisible();
  await expect(page.getByLabel('Adresse')).toBeVisible();
  await expect(page.locator('select[name="adult_dietary_requirements"]').first()).toContainText('Andere (bitte angeben)');
  await expect(page.locator('.notice-band')).toHaveCount(0);
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

test('RSVP requires an explicit attendance choice and contact phone', async ({ page }) => {
  await signIntoSite(page, '/en/rsvp/');

  const requirements = await page.locator('form[data-rsvp-form]').evaluate((form) => {
    const typedForm = form as HTMLFormElement;
    const yes = typedForm.querySelector<HTMLInputElement>('input[name="attending"][value="yes"]');
    const no = typedForm.querySelector<HTMLInputElement>('input[name="attending"][value="no"]');
    const primaryName = typedForm.querySelector<HTMLInputElement>('input[name="primary_guest_name"]');
    const email = typedForm.querySelector<HTMLInputElement>('input[name="email"]');
    const countryCode = typedForm.querySelector('select[name="phone_country_code"]');
    const phone = typedForm.querySelector<HTMLInputElement>('input[name="phone_number"]');
    const address = typedForm.querySelector<HTMLTextAreaElement>('textarea[name="address"]');

    return {
      yesChecked: yes?.checked ?? false,
      noChecked: no?.checked ?? false,
      primaryNameRequired: primaryName?.required ?? false,
      emailRequired: email?.required ?? false,
      countryCodeRequired: countryCode instanceof HTMLSelectElement ? countryCode.required : true,
      phoneRequired: phone?.required ?? false,
      addressRequired: address?.required ?? true,
      valid: typedForm.checkValidity(),
    };
  });

  expect(requirements).toEqual({
    yesChecked: false,
    noChecked: false,
    primaryNameRequired: true,
    emailRequired: true,
    countryCodeRequired: false,
    phoneRequired: true,
    addressRequired: false,
    valid: false,
  });

  const invalidPhoneResult = await page.evaluate(async () => {
    const formData = new FormData();
    formData.set('language', 'en');
    formData.set('attending', 'no');
    formData.set('primary_guest_name', 'Invalid Phone Guest');
    formData.set('email', 'invalid-phone@example.test');
    formData.set('phone_number', 'not a phone');

    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });
    const body = (await response.json()) as { errors?: { phone_number?: string } };
    return { status: response.status, phoneError: body.errors?.phone_number };
  });

  expect(invalidPhoneResult).toEqual({ status: 400, phoneError: 'invalid' });
});

test('RSVP form boxes stay aligned across languages', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await signIntoSite(page, '/en/rsvp/');

  for (const path of ['/en/rsvp/', '/it/rsvp/', '/de/rsvp/']) {
    await page.goto(path);
    await expectRsvpLabelsFit(page);

    const attendingYes = page.locator('.rsvp-radio').nth(0);
    const attendingNo = page.locator('.rsvp-radio').nth(1);
    await expectAlignedTop(attendingYes, attendingNo);

    const dietary = page.locator('select[name="adult_dietary_requirements"]').first();
    const allergies = page.locator('input[name="adult_allergies"]').first();
    await expectAlignedTop(dietary, allergies);

    await dietary.selectOption('other');
    const otherBox = await page.locator('input[name="adult_dietary_requirements_other"]').first().boundingBox();
    const updatedDietaryBox = await dietary.boundingBox();
    expect(otherBox).not.toBeNull();
    expect(updatedDietaryBox).not.toBeNull();
    await expectAlignedTop(dietary, allergies);
    expect(otherBox!.y).toBeGreaterThan(updatedDietaryBox!.y);
  }
});

test('RSVP page shows the privacy copy only inside the form', async ({ page }) => {
  await signIntoSite(page, '/en/rsvp/');

  await expect(page.locator('.notice-band')).toHaveCount(0);
  await expect(page.getByText('We will use your RSVP information only to plan the wedding')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'What the RSVP asks' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Updates' })).toHaveCount(0);
  await expect(page.getByText('Guest names and email')).toHaveCount(0);
  await expect(page.locator('.rsvp-form').getByText('RSVP opening date: TBD')).toBeVisible();
  await expect(page.locator('.rsvp-form').getByText('RSVP deadline: TBD')).toBeVisible();
  await expect(page.locator('.rsvp-form').getByText('Your latest submission replaces earlier responses')).toBeVisible();
});
