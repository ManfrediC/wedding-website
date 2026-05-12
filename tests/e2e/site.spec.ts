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

  await expect(page.getByRole('heading', { name: 'Gabriela & Manfredi' })).toBeVisible();
  await expect(page.getByText('11 June 2027')).toBeVisible();
  await expect(page.getByText('Enter the password from your invitation.')).toBeVisible();
  await expect(page.getByLabel('Wedding password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enter' })).toBeVisible();
  await expect(page.getByText('The password was not recognised')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toHaveCount(0);
  await expect(page.getByText('Private wedding website')).toHaveCount(0);
  await expect(page.getByText('HOME')).toHaveCount(0);
  await expect(page.getByText('SCHEDULE')).toHaveCount(0);
  await expect(page.getByText('TRAVEL')).toHaveCount(0);
  await expect(page.getByText('Kirche St. Peter')).toHaveCount(0);
  await expect(page.getByText('Hotel Sonne')).toHaveCount(0);
  await expect(page.locator('input[name="next"]')).toHaveValue('/en/travel/');
});

test('home hero keeps the Zurich image positioned below the spire', async ({ page }) => {
  await page.goto('/en/');

  const backgroundPosition = await page.locator('.home-hero').evaluate((element) => {
    return window.getComputedStyle(element).backgroundPosition;
  });

  if (page.viewportSize()?.width && page.viewportSize()!.width <= 700) {
    expect(backgroundPosition).toContain('58% 22%');
    return;
  }

  expect(backgroundPosition).toContain('50% 22%');
});

test('Schedule uses the selected Hotel Sonne reception image', async ({ page }) => {
  await page.goto('/en/schedule/');

  await expect(page.locator('.timeline-content h2').first()).toHaveText('Civil Ceremony at Stadthaus Zürich');
  const civilTimelineEntry = page.locator('.timeline-content').filter({ hasText: 'Civil Ceremony at Stadthaus Zürich' });
  await expect(civilTimelineEntry.getByText('only immediate family will be able to attend')).toBeVisible();
  await expect(page.locator('.timeline-date').filter({ hasText: 'Friday, 11 June 2027' })).toHaveCount(5);
  await expect(page.locator('.timeline-time').filter({ hasText: 'TBD' })).toHaveCount(6);
  await expect(page.getByRole('heading', { name: 'Reception and party' })).toBeVisible();
  await expect(page.getByText('Date: Friday, 11 June 2027')).toHaveCount(3);
  await expect(page.getByText('Time: TBD')).toHaveCount(5);
  await expect(page.locator('img[src="/images/places/hotel-sonne-lake-view.jpg"]')).toHaveAttribute(
    'alt',
    'Hotel Sonne Küsnacht seen from Lake Zurich',
  );
});

test('English pages include requested travel and contact details', async ({ page }) => {
  await page.goto('/en/travel/');

  await expect(page.getByRole('heading', { name: 'From Chicago' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From New York' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From the UK' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From Sardinia' })).toBeVisible();
  await expect(page.locator('img[src="/images/places/chicago-skyline.jpg"]')).toHaveAttribute(
    'alt',
    'Chicago skyline from Lake Michigan',
  );
  await expect(page.locator('img[src="/images/places/london-skyline.jpg"]')).toHaveAttribute(
    'alt',
    'Tower Bridge over the River Thames in London',
  );
  await expect(page.locator('img[src="/images/places/zurich-airport-station.jpg"]')).toHaveAttribute(
    'alt',
    'Trains at Zürich Flughafen railway station',
  );
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
  await expect(page.getByRole('heading', { name: 'By train to Küsnacht ZH' })).toBeVisible();
  await expect(page.locator('img[src="/images/places/kuesnacht-lake-view.jpg"]')).toHaveAttribute(
    'alt',
    'Küsnacht village seen from Lake Zurich',
  );
  await expect(page.getByText('From Zurich HB: take an S6 or S16')).toBeVisible();
  await expect(page.getByText('From Zurich Airport: the simplest direct train is usually the S16')).toBeVisible();
  await expect(page.getByText('departures around 01 and 31 minutes past the hour')).toBeVisible();
  await expect(page.getByText('From Richterswil: travel by train to Zurich HB')).toBeVisible();
  await expect(page.getByText('Also compare fares with a layover in New York')).toBeVisible();
  await expect(page.getByText('London Luton may also have useful easyJet flights')).toBeVisible();
  await expect(page.getByText('Bus 50 from EuroAirport to Basel SBB')).toBeVisible();
  await expect(page.getByText('passports must be issued less than 10 years before arrival')).toBeVisible();

  await page.goto('/en/stay/');
  await expect(page.getByRole('link', { name: 'Hotel Sonne Küsnacht' })).toHaveAttribute('href', 'https://sonne.ch/en/');
  await expect(page.getByRole('link', { name: 'OXEN Küsnacht' })).toHaveAttribute('href', 'https://www.oxen.ch/');
  await expect(page.getByText('late-night trains run roughly hourly back towards Zürich HB')).toBeVisible();
  await expect(page.getByText('driving by car is not recommended due to lack of parking space and poor convenience')).toBeVisible();
  await expect(page.getByRole('link', { name: 'B & B Caffètino-Vino Richterswil' })).toHaveAttribute(
    'href',
    'https://www.bnb-caffetino-vino.ch/',
  );
  await expect(page.getByRole('heading', { name: 'Richterswil' })).toBeVisible();
  await expect(page.getByText('the S2 is usually the best direct train to Richterswil')).toBeVisible();
  await expect(page.getByText('the S8 is a slower direct alternative')).toBeVisible();
  await expect(page.locator('img[src="/images/places/richterswil-lake.jpg"]')).toHaveAttribute(
    'alt',
    'Richterswil village seen from Lake Zurich',
  );
  await expect(page.getByText('the house has no lift')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Accessibility and mobility' })).toBeVisible();
  await expect(page.locator('img[src="/images/places/st-peter-zurich.jpg"]')).toHaveAttribute(
    'alt',
    'Kirche St. Peter in Zurich',
  );
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
  await expect(page.getByText('search for "Küsnacht ZH"')).toBeVisible();
  await expect(page.getByRole('link', { name: 'SBB: buy tickets online' })).toHaveAttribute(
    'href',
    'https://www.sbb.ch/en/tickets-offers/buy.html',
  );
  await page.locator('summary').filter({ hasText: 'Do I need a car?' }).click();
  await expect(page.getByText('lack of parking space and poor convenience')).toBeVisible();
  await page.locator('summary').filter({ hasText: 'Are there visa requirements for Switzerland?' }).click();
  await expect(page.getByText('EU/EFTA citizens do not need a visa')).toBeVisible();
  await expect(page.getByText('passport must have been issued less than 10 years before arrival')).toBeVisible();
  await expect(page.getByText('US citizens do not need a tourist visa for stays under 90 days')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Swiss SEM entry guidance' })).toHaveAttribute(
    'href',
    'https://www.sem.admin.ch/sem/en/home/overview-einreise.html',
  );
  await page.locator('summary').filter({ hasText: 'What should I know about Swiss customs?' }).click();
  await expect(page.getByText('VAT-free only up to CHF 150 total value per person per day')).toBeVisible();
  await expect(page.getByText('Animal products are permitted only from EU member states')).toBeVisible();
  await expect(page.getByText('Swiss customs and border officers can be very strict at land borders')).toBeVisible();
  await expect(page.getByText('Checks are less likely at the airport')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Swiss customs allowances' })).toHaveAttribute(
    'href',
    'https://www.bazg.admin.ch/en/duty-free-allowances-foodstuffs-alcohol-and-tobacco',
  );

  await page.goto('/it/faq/');
  await page.locator('summary').filter({ hasText: 'Ci sono requisiti di visto per la Svizzera?' }).click();
  await expect(page.getByText('i cittadini UE/AELS non hanno bisogno di visto')).toBeVisible();
  await page.locator('summary').filter({ hasText: 'Cosa bisogna sapere sulla dogana svizzera?' }).click();
  await expect(page.getByText('I controlli sono meno probabili in aeroporto')).toBeVisible();

  await page.goto('/de/faq/');
  await page.locator('summary').filter({ hasText: 'Brauche ich ein Visum für die Schweiz?' }).click();
  await expect(page.getByText('EU-/EFTA-Bürgerinnen und -Bürger kein Visum')).toBeVisible();
  await page.locator('summary').filter({ hasText: 'Was sollte ich zum Schweizer Zoll wissen?' }).click();
  await expect(page.getByText('Kontrollen sind am Flughafen weniger wahrscheinlich')).toBeVisible();
});

test('Italian and German guide copy reflects child fares and SBB Mobile', async ({ page }) => {
  await page.goto('/it/switzerland-guide/');
  await expect(page.getByText('Scaricate SBB Mobile prima del viaggio')).toBeVisible();
  await expect(page.getByText('Swiss Half Fare Card per visitatori')).toBeVisible();
  await expect(page.getByText('costa CHF 150 per un mese')).toBeVisible();
  await expect(page.getByText('I bambini sotto i 6 anni viaggiano gratis')).toBeVisible();

  await page.goto('/de/switzerland-guide/');
  await expect(page.getByRole('heading', { name: 'Hinweise zur Schweiz' })).toBeVisible();
  await expect(page.getByText('Ladet SBB Mobile vor der Reise herunter')).toBeVisible();
  await expect(page.getByText('Swiss Half Fare Card für Besucherinnen und Besucher')).toBeVisible();
  await expect(page.getByText('kostet sie CHF 150 für einen Monat')).toBeVisible();
  await expect(page.getByText('Kinder unter 6 Jahren fahren im Zürcher Verkehrsverbund kostenlos')).toBeVisible();
});

test('Italian and German pages have localised core content', async ({ page }) => {
  await page.goto('/it/schedule/');
  await expect(page.getByRole('heading', { name: 'Il giorno del matrimonio' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cerimonia civile allo Stadthaus Zürich' })).toBeVisible();
  await expect(page.getByText('familiari più stretti')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Ricevimento e festa' })).toBeVisible();
  await expect(page.getByText('La serata si terrà all’Hotel Sonne di Küsnacht')).toBeVisible();

  await page.goto('/it/things-to-do/');
  await expect(page.getByRole('heading', { name: 'Cosa fare' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Prime idee a Zurigo' })).toBeVisible();
  await expect(page.getByText('Zurich Zoo, che può essere una buona idea per i più piccoli')).toBeVisible();

  await page.goto('/it/rsvp/');
  await expect(page.getByRole('heading', { name: 'Cosa chiederà la RSVP' })).toBeVisible();
  await expect(page.getByText('Esigenze alimentari e allergie')).toBeVisible();

  await page.goto('/it/gifts/');
  await expect(page.getByRole('heading', { name: 'Regali' })).toBeVisible();
  await expect(page.getByText('La vostra presenza in Svizzera è già il regalo più grande')).toBeVisible();

  await page.goto('/it/credits/');
  await expect(page.getByRole('heading', { name: 'Crediti immagini' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Immagini di viaggio e trasporti pubblici' })).toBeVisible();

  await page.goto('/de/schedule/');
  await expect(page.getByRole('heading', { name: 'Unser Hochzeitstag' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Zivile Trauung im Stadthaus Zürich' })).toBeVisible();
  await expect(page.getByText('engsten Familienmitglieder')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Empfang und Feier' })).toBeVisible();
  await expect(page.getByText('Die Abendfeier findet im Hotel Sonne in Küsnacht')).toBeVisible();

  await page.goto('/de/things-to-do/');
  await expect(page.getByRole('heading', { name: 'Aktivitäten' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Erste Ideen in Zürich' })).toBeVisible();
  await expect(page.getByText('Der Zoo Zürich kann für kleinere Kinder eine gute Option sein')).toBeVisible();

  await page.goto('/de/rsvp/');
  await expect(page.getByRole('heading', { name: 'Was die RSVP abfragen wird' })).toBeVisible();
  await expect(page.getByText('Ernährungsanforderungen und Allergien')).toBeVisible();

  await page.goto('/de/gifts/');
  await expect(page.getByRole('heading', { name: 'Geschenke' })).toBeVisible();
  await expect(page.getByText('Eure Anwesenheit in der Schweiz ist für uns schon das grösste Geschenk')).toBeVisible();

  await page.goto('/de/credits/');
  await expect(page.getByRole('heading', { name: 'Bildnachweise' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Reise- und ÖV-Bilder' })).toBeVisible();
});

test('Switzerland Guide uses the selected section imagery', async ({ page }) => {
  await page.goto('/en/switzerland-guide/');

  const publicTransportCard = page
    .getByRole('heading', { name: 'Public transport' })
    .locator('xpath=ancestor::article[1]');
  const firstChildClass = await publicTransportCard.evaluate((article) => article.firstElementChild?.className ?? '');
  expect(String(firstChildClass)).toContain('media-grid-top');
  await expect(publicTransportCard.locator('.media-grid-top img')).toHaveCount(4);
  await expect(page.getByText('Swiss Half Fare Card for visitors')).toBeVisible();
  await expect(page.getByText('CHF 150 for one month')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Swiss Half Fare Card' })).toHaveAttribute(
    'href',
    'https://www.myswitzerland.com/en-ch/planning/transport-accommodation/tickets-public-transport/swiss-half-fare-card/',
  );
  await expect(page.locator('img[src="/images/places/sbb-ticket-machine.jpg"]')).toHaveAttribute(
    'alt',
    'ZVV ticket machine at Zurich Airport tram stop',
  );
  await expect(page.locator('img[src="/images/places/zurich-lindenhof-view.jpg"]')).toHaveAttribute(
    'alt',
    'Zurich old town and the Limmat from Lindenhof',
  );
  await expect(page.locator('img[src="/images/places/zurich-rainy-day.jpg"]')).toHaveAttribute(
    'alt',
    'Rainy day by Schwarzenbach in Zurich old town',
  );
  await expect(page.locator('img[src="/images/minted/minted-gallery-01.jpeg"]')).toHaveAttribute(
    'alt',
    'Gabriela, Manfredi, and family in the Swiss countryside',
  );
});

test('Italian and German stay copy is localised and cleanly encoded', async ({ page }) => {
  await page.goto('/it/stay/');
  await expect(page.getByRole('heading', { name: 'Accessibilità e mobilità' })).toBeVisible();
  await expect(page.getByText('il piano terra è accessibile in sedia a rotelle')).toBeVisible();
  await expect(page.getByText('B & B Caffètino-Vino Richterswil ha cinque camere')).toBeVisible();
  await expect(page.getByText('l’S2 è di solito il miglior treno diretto per Richterswil')).toBeVisible();
  await expect(page.getByText('mancanza di parcheggi e la scarsa praticità')).toBeVisible();
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
  await expect(page.getByText('die S2 meist der beste direkte Zug nach Richterswil')).toBeVisible();
  await expect(page.getByText('wegen fehlender Parkplätze und geringer Bequemlichkeit')).toBeVisible();
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

test('Things to Do uses a distinct Local advice Zurich image', async ({ page }) => {
  await page.goto('/en/things-to-do/');

  await expect(page.locator('img[src="/images/places/kunsthaus-zurich.jpg"]')).toHaveAttribute(
    'alt',
    'Pipilotti Rist sculpture and Kunsthaus Zurich Chipperfield building at Heimplatz',
  );
  await expect(page.getByRole('heading', { name: 'Local advice' })).toBeVisible();
  await expect(page.locator('img[src="/images/places/zurich-lindenhof-view.jpg"]')).toHaveAttribute(
    'alt',
    'Zurich old town and the Limmat from Lindenhof',
  );
});
