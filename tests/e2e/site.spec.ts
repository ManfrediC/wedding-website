import { expect, test, type Page } from '@playwright/test';

const smokePaths = [
  '/en/travel/',
  '/en/stay/',
  '/en/switzerland-guide/',
  '/it/travel/',
  '/de/switzerland-guide/',
];

async function expectNoBrokenImages(page: Page) {
  await page.locator('img').evaluateAll(async (images) => {
    const imageElements = images as HTMLImageElement[];

    imageElements.forEach((image) => {
      image.loading = 'eager';
    });

    await Promise.all(
      imageElements.map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        });
      }),
    );
  });

  const brokenImages = await page.locator('img').evaluateAll((images) =>
    (images as HTMLImageElement[])
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute('src') ?? image.getAttribute('alt') ?? 'unknown image'),
  );

  expect(brokenImages).toEqual([]);
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.viewport + 1);
}

for (const path of smokePaths) {
  test(`renders ${path} without broken media or horizontal overflow`, async ({ page }, testInfo) => {
    await page.goto(path);
    await expect(page.locator('.page-hero h1')).toBeVisible();
    await expectNoBrokenImages(page);
    await expectNoHorizontalOverflow(page);
    await testInfo.attach('screenshot', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
}

test('welcome page renders the password gate', async ({ page }) => {
  await page.goto('/welcome/?next=/en/travel/&error=1');

  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  await expect(page.getByLabel('Wedding password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enter website' })).toBeVisible();
  await expect(page.getByText('The password was not recognised')).toBeVisible();
  await expect(page.locator('input[name="next"]')).toHaveValue('/en/travel/');
});

test('English pages include requested travel and contact details', async ({ page }) => {
  await page.goto('/en/travel/');

  await expect(page.getByRole('heading', { name: 'From Chicago' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From New York' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From the UK' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From Sardinia' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Zurich wedding map' })).toBeVisible();
  await expect(page.getByText("Richterswil, where Manfredi's parents live")).toBeVisible();
  await expect(page.getByRole('link', { name: 'OpenStreetMap: Zurich, Küsnacht, and Richterswil' })).toHaveAttribute(
    'href',
    'https://www.openstreetmap.org/#map=11/47.3370/8.5950',
  );
  await expect(page.locator('img[src="/images/places/zurich-wedding-map.svg"]')).toHaveAttribute(
    'alt',
    'OpenStreetMap-based map of Zurich, Küsnacht, Richterswil, Zurich Airport, Kirche St. Peter, and Hotel Sonne',
  );
  await expect(page.getByText('For ordinary wedding logistics, use the train rather than driving or taking a taxi.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'By train to Küsnacht' })).toBeVisible();
  await expect(page.getByText('From Zurich HB: take an S6 or S16')).toBeVisible();
  await expect(page.getByText('From Zurich Airport: the simplest direct train is usually the S16')).toBeVisible();
  await expect(page.getByText('From Richterswil: travel by train to Zurich HB')).toBeVisible();
  await expect(page.getByText('Also compare fares with a layover in New York')).toBeVisible();

  await page.goto('/en/stay/');
  await expect(page.getByRole('link', { name: 'Hotel Sonne Küsnacht' })).toHaveAttribute('href', 'https://sonne.ch/en/');
  await expect(page.getByRole('link', { name: 'OXEN Küsnacht' })).toHaveAttribute('href', 'https://www.oxen.ch/');
  await expect(page.getByRole('link', { name: 'B & B Caffètino-Vino Richterswil' })).toHaveAttribute(
    'href',
    'https://www.bnb-caffetino-vino.ch/',
  );
  await expect(page.getByText('the house has no lift')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Accessibility and mobility' })).toBeVisible();
  await expect(page.getByText('the ground floor is wheelchair-accessible')).toBeVisible();
  await expect(page.getByRole('link', { name: 'St. Peter accessibility FAQ' })).toHaveAttribute(
    'href',
    'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/',
  );
  await expect(page.getByRole('link', { name: 'ZVV accessible boats' })).toHaveAttribute(
    'href',
    'https://www.zvv.ch/en/service/travel-without-barriers/limited-mobility/ships.html',
  );
  await expect(page.getByRole('link', { name: 'Airbnb Zurich, June 2027' })).toHaveAttribute(
    'href',
    'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2',
  );

  await page.goto('/en/contact/');
  await expect(page.getByRole('link', { name: 'gabyandmanfredi@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:gabyandmanfredi@gmail.com',
  );

  await page.route('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/chf.json', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        date: '2026-05-11',
        chf: { usd: 1.12, eur: 1.03, gbp: 0.88 },
      }),
    }),
  );

  await page.goto('/en/switzerland-guide/');
  await expect(page.getByRole('link', { name: 'Type J' })).toHaveAttribute(
    'href',
    'https://en.wikipedia.org/wiki/SN_441011',
  );
  await expect(page.getByText('1 CHF = 1.1200 USD')).toBeVisible();
  await expect(page.getByText('1 USD = 0.8929 CHF')).toBeVisible();
  await expect(page.getByText('1 CHF = 1.0300 EUR')).toBeVisible();
  await expect(page.getByText('1 EUR = 0.9709 CHF')).toBeVisible();
  await expect(page.getByText('1 CHF = 0.8800 GBP')).toBeVisible();
  await expect(page.getByText('1 GBP = 1.1364 CHF')).toBeVisible();
  await expect(page.getByRole('link', { name: 'exchange-api' })).toHaveAttribute(
    'href',
    'https://github.com/fawazahmed0/exchange-api',
  );

  await page.goto('/en/faq/');
  await page.locator('summary').filter({ hasText: 'How do I buy a train ticket?' }).click();
  await expect(page.getByText('The easiest option is the SBB Mobile app')).toBeVisible();
  await expect(page.getByRole('link', { name: 'SBB: buy tickets online' })).toHaveAttribute(
    'href',
    'https://www.sbb.ch/en/tickets-offers/buy.html',
  );
});

test('Italian and German guide copy reflects child fares and SBB Mobile', async ({ page }) => {
  await page.goto('/it/switzerland-guide/');
  await expect(page.getByText('Usate SBB Mobile per orari e biglietti in tutta la Svizzera')).toBeVisible();
  await expect(page.getByText('I bambini sotto i 6 anni viaggiano gratis')).toBeVisible();

  await page.goto('/de/switzerland-guide/');
  await expect(page.getByText('Nutzt SBB Mobile für Fahrpläne und Tickets in der ganzen Schweiz')).toBeVisible();
  await expect(page.getByText('Kinder unter 6 Jahren fahren im Zürcher Verkehrsverbund kostenlos')).toBeVisible();
});

test('Italian and German stay copy is localised and cleanly encoded', async ({ page }) => {
  await page.goto('/it/stay/');
  await expect(page.getByRole('heading', { name: 'Accessibilità e mobilità' })).toBeVisible();
  await expect(page.getByText('il piano terra è accessibile in sedia a rotelle')).toBeVisible();
  await expect(page.getByText('B & B Caffètino-Vino Richterswil ha cinque camere')).toBeVisible();
  await expect(page.getByRole('link', { name: 'FAQ accessibilità St. Peter' })).toHaveAttribute(
    'href',
    'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/',
  );
  await expect(page.getByRole('link', { name: 'Airbnb Zurigo, giugno 2027' })).toHaveAttribute(
    'href',
    'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2',
  );
  await expect(page.locator('body')).not.toContainText('Ã');
  await expect(page.locator('body')).not.toContainText('Â');

  await page.goto('/de/stay/');
  await expect(page.getByRole('heading', { name: 'Barrierefreiheit und Mobilität' })).toBeVisible();
  await expect(page.getByText('Laut offizieller FAQ der Kirche ist das Erdgeschoss rollstuhlgängig')).toBeVisible();
  await expect(page.getByText('B & B Caffètino-Vino Richterswil hat fünf Zimmer')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Barrierefreiheit St. Peter' })).toHaveAttribute(
    'href',
    'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/',
  );
  await expect(page.getByRole('link', { name: 'Airbnb Zürich, Juni 2027' })).toHaveAttribute(
    'href',
    'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2',
  );
  await expect(page.locator('body')).not.toContainText('Ã');
  await expect(page.locator('body')).not.toContainText('Â');
});
