import type { Lang } from './locales';

export const pageKeys = [
  'schedule',
  'travel',
  'stay',
  'things-to-do',
  'switzerland-guide',
  'faq',
  'rsvp',
  'gifts',
  'contact',
  'credits',
] as const;

export type PageKey = (typeof pageKeys)[number];

type Link = {
  label: string;
  href: string;
};

type Section = {
  title: string;
  body: string;
  items?: string[];
  links?: Link[];
  image?: string;
  imageAlt?: string;
};

export type PageContent = {
  title: string;
  kicker: string;
  intro: string;
  notice?: string;
  sections: Section[];
};

export const homeContent: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    cards: { title: string; body: string; href: string; image: string; imageAlt: string }[];
    closing: string;
  }
> = {
  en: {
    eyebrow: 'Gabriela Dago & Manfredi Carta',
    title: 'Gabriela & Manfredi',
    subtitle: 'Friday, 11 June 2027 · Zurich & Küsnacht, Switzerland',
    intro:
      'We cannot wait to celebrate with you in Zurich. The day will begin in the old town at Kirche St. Peter, followed by a journey on Lake Zurich to Küsnacht and an evening by the water at Hotel Sonne.',
    primaryCta: 'View the schedule',
    secondaryCta: 'Travel and stay',
    closing: 'We are so grateful that you will be joining us in Switzerland.',
    cards: [
      {
        title: 'Schedule',
        body: 'Ceremony, boat transfer, dinner, dancing, and details as they are confirmed.',
        href: '/en/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter in Zurich',
      },
      {
        title: 'Travel',
        body: 'How to get to Zurich from Chicago, New York, London, Sardinia, and elsewhere.',
        href: '/en/travel/',
        image: '/images/minted/minted-photo-08.jpeg',
        imageAlt: 'Zurich and Lake Zurich from above',
      },
      {
        title: 'Stay',
        body: 'Recommended areas, Hotel Sonne, nearby options, and room-block updates.',
        href: '/en/stay/',
        image: '/images/places/hotel-sonne-kuesnacht.jpg',
        imageAlt: 'Hotel Sonne in Küsnacht',
      },
      {
        title: 'Things to Do',
        body: 'Zurich, Lake Zurich, mountain views, day trips, and gentle pre-wedding ideas.',
        href: '/en/things-to-do/',
        image: '/images/minted/minted-gallery-07.jpg',
        imageAlt: 'A mountain lake in Switzerland',
      },
    ],
  },
  it: {
    eyebrow: 'Gabriela Dago & Manfredi Carta',
    title: 'Gabriela & Manfredi',
    subtitle: 'Venerdì 11 giugno 2027 · Zurigo e Küsnacht, Svizzera',
    intro:
      "Non vediamo l'ora di festeggiare con voi a Zurigo. La giornata inizierà nel centro storico alla Kirche St. Peter, proseguirà sul Lago di Zurigo verso Küsnacht e continuerà con una serata sul lago all'Hotel Sonne.",
    primaryCta: 'Vedi il programma',
    secondaryCta: 'Viaggio e alloggio',
    closing: 'Siamo felicissimi di poter condividere con voi questa giornata in Svizzera.',
    cards: [
      {
        title: 'Programma',
        body: 'Cerimonia, trasferimento in barca, cena, festa e dettagli appena confermati.',
        href: '/it/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter a Zurigo',
      },
      {
        title: 'Viaggio',
        body: "Come arrivare a Zurigo da Chicago, New York, Londra, Sardegna e dall'estero.",
        href: '/it/travel/',
        image: '/images/minted/minted-photo-08.jpeg',
        imageAlt: "Zurigo e il Lago di Zurigo dall'alto",
      },
      {
        title: 'Dove dormire',
        body: "Zone consigliate, Hotel Sonne, opzioni vicine e aggiornamenti sui blocchi camere.",
        href: '/it/stay/',
        image: '/images/places/hotel-sonne-kuesnacht.jpg',
        imageAlt: "Hotel Sonne a Küsnacht",
      },
      {
        title: 'Cosa fare',
        body: 'Zurigo, Lago di Zurigo, panorami alpini, gite e idee prima del matrimonio.',
        href: '/it/things-to-do/',
        image: '/images/minted/minted-gallery-07.jpg',
        imageAlt: 'Un lago di montagna in Svizzera',
      },
    ],
  },
  de: {
    eyebrow: 'Gabriela Dago & Manfredi Carta',
    title: 'Gabriela & Manfredi',
    subtitle: 'Freitag, 11. Juni 2027 · Zürich & Küsnacht, Schweiz',
    intro:
      'Wir freuen uns sehr, mit euch in Zürich zu feiern. Der Tag beginnt in der Altstadt in der Kirche St. Peter, führt über den Zürichsee nach Küsnacht und endet mit einem Abend am Wasser im Hotel Sonne.',
    primaryCta: 'Ablauf ansehen',
    secondaryCta: 'Anreise und Unterkunft',
    closing: 'Wir sind sehr dankbar, dass ihr mit uns in der Schweiz feiert.',
    cards: [
      {
        title: 'Ablauf',
        body: 'Trauung, Bootstransfer, Abendessen, Feier und Details, sobald sie bestätigt sind.',
        href: '/de/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter in Zürich',
      },
      {
        title: 'Anreise',
        body: 'Anreise nach Zürich aus Chicago, New York, London, Sardinien und weiteren Orten.',
        href: '/de/travel/',
        image: '/images/minted/minted-photo-08.jpeg',
        imageAlt: 'Zurich und der Zurichsee von oben',
      },
      {
        title: 'Unterkunft',
        body: 'Empfohlene Gegenden, Hotel Sonne, nahe Optionen und Zimmerblock-Updates.',
        href: '/de/stay/',
        image: '/images/places/hotel-sonne-kuesnacht.jpg',
        imageAlt: 'Hotel Sonne in Küsnacht',
      },
      {
        title: 'Aktivitäten',
        body: 'Zürich, Zürichsee, Bergblicke, Tagesausflüge und entspannte Ideen vor der Hochzeit.',
        href: '/de/things-to-do/',
        image: '/images/minted/minted-gallery-07.jpg',
        imageAlt: 'Ein Bergsee in der Schweiz',
      },
    ],
  },
};

export const pages: Record<Lang, Record<PageKey, PageContent>> = {
  en: {
    schedule: {
      title: 'Our Wedding Day',
      kicker: 'Schedule',
      intro:
        'The exact timing is still being confirmed. This page will become the day-of reference for ceremony arrival, the boat transfer, dinner, dancing, and return travel.',
      notice:
        'Boat details are provisional: we are planning a host-arranged transfer from Zurich towards Küsnacht, with boarding point and rain plan to follow.',
      sections: [
        {
          title: 'Ceremony',
          body: 'The ceremony will take place at Kirche St. Peter in Zurich old town.',
          items: ['Exact start time: TBD', 'Guest arrival time: TBD', 'Ceremony languages: TBD'],
          image: '/images/places/st-peter-zurich.jpg',
          imageAlt: 'Kirche St. Peter in Zurich',
        },
        {
          title: 'Boat transfer',
          body: 'After the ceremony, we are planning a host-arranged boat transfer from Zurich towards Küsnacht.',
          items: ['Boarding point: TBD', 'Tickets: to be confirmed', 'Rain plan and accessibility details: TBD'],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'A boat on Lake Zurich near Hotel Sonne',
        },
        {
          title: 'Reception and party',
          body: 'The evening celebration will be at Hotel Sonne in Küsnacht, beside Lake Zurich.',
          items: ['Aperitivo: TBD', 'Dinner: TBD', 'Dancing and party: TBD', 'Late-night return transport: TBD'],
          image: '/images/places/hotel-sonne-festsaal.jpg',
          imageAlt: 'The ballroom at Hotel Sonne Küsnacht',
        },
      ],
    },
    travel: {
      title: 'Travel Advice',
      kicker: 'How to get to Zurich',
      intro:
        'Zurich Airport is the main arrival point. The notes below are based on current published routes and should be checked again when June 2027 timetables open.',
      notice:
        'Please recheck official entry requirements before booking and again before travelling. Switzerland is part of the Schengen area and rules may change before June 2027.',
      sections: [
        {
          title: 'From Chicago',
          body: 'Chicago O\'Hare (ORD) is the relevant airport. Current published schedules include nonstop ORD-ZRH flights, but June 2027 should be confirmed once bookings open.',
          items: ['Check nonstop flights first, especially SWISS and United-operated services.', 'If nonstop prices are high, compare one-stop routes through major European hubs such as Frankfurt, Munich, Amsterdam, Paris, or London.', 'Arrive by Thursday, 10 June 2027 at the latest; Wednesday, 9 June 2027 is better for jet lag and delayed bags.', 'Use public transport from Zurich Airport unless a wider Swiss or Italian road trip makes a car necessary.'],
          links: [
            { label: 'SWISS Chicago-Zurich', href: 'https://www.swiss.com/lhg/us/en/o-d/cy-cy/chicago-zurich' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20Chicago%20to%20Zurich' },
            { label: 'Expedia', href: 'https://www.expedia.com/Flights' },
          ],
          image: '/images/places/zurich-old-town.jpg',
          imageAlt: 'Zurich old town and the Limmat river',
        },
        {
          title: 'From New York',
          body: 'For New York, compare JFK and Newark (EWR). Current published schedules include nonstop flights from both airports to Zurich.',
          items: ['Check JFK and Newark before considering LaGuardia; LaGuardia is usually useful only for domestic connections.', 'Nonstop flights are the most practical option when the price is reasonable; one-stop options can be useful if travelling from outside New York City.', 'Arrive by Thursday, 10 June 2027 at the latest; Wednesday, 9 June 2027 gives more breathing room.', 'Use public transport from Zurich Airport unless your wider trip genuinely needs a car.'],
          links: [
            { label: 'SWISS New York-Zurich', href: 'https://www.swiss.com/lhg/us/en/o-d/cy-cy/new-york-zurich' },
            { label: 'Delta Zurich flights', href: 'https://www.delta.com/us/en/flight-deals/europe-flights/flights-to-zurich' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20New%20York%20to%20Zurich' },
            { label: 'Expedia', href: 'https://www.expedia.com/Flights' },
          ],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'A boat on Lake Zurich near Hotel Sonne',
        },
        {
          title: 'From London and the UK',
          body: 'From London, direct flights are usually the simplest option. EasyJet can be budget-friendly, but check baggage rules carefully before comparing prices.',
          items: ['Compare London Heathrow, Gatwick, City, Luton, and Stansted depending on where you live; Heathrow, Gatwick, and City are usually the most relevant for Zurich.', 'For guests outside London, also compare Manchester, Edinburgh, Bristol, and other regional airports with direct or one-stop routes.', 'On EasyJet, the lowest fare may include only one small under-seat cabin bag, currently 45 x 36 x 20 cm including handles and wheels; add any large cabin bag or hold luggage online when booking if you need it.', 'The rail route is London St Pancras to Paris by Eurostar, transfer from Gare du Nord to Gare de Lyon, then TGV Lyria to Zurich HB; allow a generous connection in Paris.'],
          links: [
            { label: 'SWISS London-Zurich', href: 'https://www.swiss.com/lhg/gb/en/o-d/cy-cy/london-zurich' },
            { label: 'easyJet London-Zurich', href: 'https://www.easyjet.com/en/flights-from-london/to-zurich/' },
            { label: 'easyJet baggage', href: 'https://www.easyjet.com/en/help/preparing-to-fly/baggage' },
            { label: 'Eurostar London-Zurich', href: 'https://www.eurostar.com/uk-en/train/london-to-zurich' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20London%20to%20Zurich' },
            { label: 'Expedia UK', href: 'https://www.expedia.co.uk/Flights' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
          ],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'A boat on Lake Zurich near Hotel Sonne',
        },
        {
          title: 'From Sardinia',
          body: 'Most Italian guests are expected to travel from Sardinia, so start with Cagliari and Olbia rather than a generic Italy search.',
          items: ['For flying, check Cagliari (CAG) and Olbia (OLB) to Zurich (ZRH) first. Current Edelweiss schedules show seasonal Zurich routes for both airports, but June 2027 is not yet fully bookable.', 'EasyJet can be a budget-friendly option for Olbia-Zurich when available. Check the baggage allowance carefully, because the lowest fare may include only one small under-seat cabin bag, currently 45 x 36 x 20 cm including handles and wheels.', 'If there is no convenient direct flight, compare Cagliari or Olbia via Milan, Rome, or another European hub. Alghero may also work with a connection, but it is less likely to be the simplest route to Zurich.', 'For driving, take an overnight ferry from Sardinia to Genoa, then drive from Genoa to Zurich. The ferry leg is usually about 10-13 hours depending on route and operator; the Genoa-Zurich drive is roughly five hours before stops, border delays, and Gotthard or San Bernardino traffic.', 'If driving into Switzerland, buy the Swiss motorway vignette from the official Swiss portal and check Alpine tunnel traffic before leaving Genoa. Parking in Zurich and Küsnacht should be planned in advance.'],
          links: [
            { label: 'Edelweiss Cagliari-Zurich', href: 'https://www.flyedelweiss.com/ch/en/fly/flight-information/timetable.html?destination=CAG' },
            { label: 'Edelweiss Olbia-Zurich', href: 'https://www.flyedelweiss.com/ch/en/fly/flight-information/timetable.html?destination=OLB' },
            { label: 'easyJet Olbia-Zurich', href: 'https://www.easyjet.com/en/cheap-flights/sardinia-olbia/zurich' },
            { label: 'easyJet baggage', href: 'https://www.easyjet.com/en/help/preparing-to-fly/baggage' },
            { label: 'GNV Genoa-Porto Torres', href: 'https://www.gnv.it/en/ferries-destinations/sardinia/genoa-porto-torres' },
            { label: 'Moby Genoa-Olbia', href: 'https://www.moby.it/rotte/traghetti-sardegna/genova-olbia-genova/' },
            { label: 'Swiss e-vignette', href: 'https://www.bazg.admin.ch/en/electronic-vignette-via-portal-purchase' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20Sardinia%20to%20Zurich' },
            { label: 'Trenitalia', href: 'https://www.trenitalia.com/en.html' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
          ],
          image: '/images/places/st-peter-zurich.jpg',
          imageAlt: 'Kirche St. Peter in Zurich',
        },
        {
          title: 'From Zurich Airport',
          body: 'Once in Zurich, public transport is usually the simplest way to reach Zurich city centre, Küsnacht, and the wedding venues.',
          items: ['The train or S-Bahn from Zurich Airport to Zurich HB usually takes about 10-15 minutes.', 'For Küsnacht or Hotel Sonne, use SBB or ZVV from the airport or from Zurich HB and buy the ticket shown by the app.', 'Taxis and ride-hailing can be useful with children or heavy luggage, but they are usually much more expensive than public transport.', 'A rental car is not recommended for Zurich-only wedding logistics.'],
          links: [
            { label: 'Zurich Airport to city', href: 'https://www.zuerich.com/en/zurich-airport-to-zurich-city-center' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
            { label: 'ZVV', href: 'https://www.zvv.ch/en' },
          ],
        },
        {
          title: 'Official links',
          body: 'Use official sources for passport, visa, ETIAS, and transport guidance.',
          links: [
            { label: 'Swiss entry documents', href: 'https://www.ch.ch/en/travel-and-emigrate/holidays-in-switzerland/travel-documents-for-entering-switzerland/' },
            { label: 'Swiss ETIAS information', href: 'https://www.sem.admin.ch/sem/en/home/themen/einreise/info-einreise/voraussetzungen-nach-staat/etias.html' },
            { label: 'EU ETIAS information', href: 'https://travel-europe.europa.eu/en/etias' },
            { label: 'UK travel advice', href: 'https://www.gov.uk/foreign-travel-advice/switzerland' },
            { label: 'US travel advice', href: 'https://travel.state.gov/' },
          ],
        },
      ],
    },
    stay: {
      title: 'Where to Stay',
      kicker: 'Accommodation',
      intro:
        'Küsnacht is most convenient for the party, while central Zurich is best for sightseeing and transport. Room-block information will be added once confirmed.',
      sections: [
        {
          title: 'Closest to the party: Küsnacht',
          body: 'Staying in Küsnacht keeps you near Hotel Sonne after dinner and dancing. This is likely the easiest choice for guests who value convenience at the end of the evening.',
          items: ['Hotel Sonne Küsnacht: likely priority for a room block.', 'OXEN Küsnacht: nearby option to confirm.', 'Late-night transport plan: TBD.'],
          image: '/images/places/hotel-sonne-kuesnacht.jpg',
          imageAlt: 'Hotel Sonne in Küsnacht',
        },
        {
          title: 'Central Zurich',
          body: 'Zurich city centre is practical for guests who want restaurants, sightseeing, train connections, and easy airport access.',
          items: ['Look near Zurich HB, the Old Town, Bellevue, or Stadelhofen.', 'Choose accommodation near a tram or train stop.', 'Public transport is usually easier than renting a car.'],
          image: '/images/places/zurich-old-town.jpg',
          imageAlt: 'Zurich old town and the Limmat river',
        },
        {
          title: 'Booking guidance',
          body: 'Zurich can be expensive in June. We recommend booking early, checking cancellation terms, and comparing hotels with apartments if you are staying longer.',
          items: ['Booking codes: TBD', 'Room-block deadlines: TBD', 'Approximate price bands: TBD'],
        },
      ],
    },
    'things-to-do': {
      title: 'Things to Do',
      kicker: 'Zurich & Switzerland',
      intro:
        'If you are making a trip of it, Zurich is a gentle base for lake walks, old town wandering, mountain views, museums, and day trips.',
      sections: [
        {
          title: 'Zurich first-day options',
          body: 'For a first day after travel, choose simple outdoor plans and keep the schedule flexible.',
          items: ['Walk the Old Town, Lindenhof, and the Limmat.', 'Walk or run along the Limmat and the lake promenade.', 'Take the train up Uetliberg, or hike up if you want a little more effort.'],
          links: [
            { label: 'Uetliberg', href: 'https://www.ueetliberg.ch/en/uetliberg' },
            { label: 'Zurich tourism', href: 'https://www.zuerich.com/en' },
          ],
          image: '/images/minted/minted-photo-08.jpeg',
          imageAlt: 'Zurich and Lake Zurich from above',
        },
        {
          title: 'Museums and chocolate',
          body: 'For a culture or rainy-day plan, Zurich has excellent museums and a well-organised chocolate museum for children and adults.',
          items: ['Kunsthaus Zurich has art from the Middle Ages to contemporary work, with Swiss painters, Impressionism, Classical Modernism, Dada, Giacometti, and Munch among the highlights.', 'Museum Rietberg focuses on arts and cultures from Asia, Africa, the Americas, and Oceania.', 'Lindt Home of Chocolate in Kilchberg is interactive and especially fun with children.'],
          links: [
            { label: 'Kunsthaus', href: 'https://www.kunsthaus.ch/en/sammlung/' },
            { label: 'Museum Rietberg', href: 'https://www.zuerich.com/en/visit/culture/museum-rietberg' },
            { label: 'Lindt', href: 'https://www.lindt-home-of-chocolate.com/en/' },
          ],
          image: '/images/places/st-peter-zurich.jpg',
          imageAlt: 'Kirche St. Peter in Zurich',
        },
        {
          title: 'Lake and water',
          body: 'Warm days are well suited to time by the water. Swimming can be enjoyable, but the Limmat current is strong and should be treated with respect.',
          items: ['Swim in Lake Zurich or the Limmat only where it is permitted and sensible.', 'The Limmat is for confident swimmers; avoid it if the current feels strong.', 'A Lake Zurich boat excursion is a relaxed way to see the city and shoreline.'],
          links: [
            { label: 'Lake Zurich boats', href: 'https://www.zsg.ch/en/' },
          ],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'A boat on Lake Zurich near Hotel Sonne',
        },
        {
          title: 'Day trips',
          body: 'These are practical day trips from Zurich if you would like a longer excursion without changing hotels.',
          items: ['Lucerne, ideally with a boat on Lake Lucerne.', 'Alpstein for beautiful hikes at different ability levels.', 'Rhine Falls near Schaffhausen.', 'Bern for its old town, or Basel for art museums including Fondation Beyeler and Kunstmuseum Basel.'],
          links: [
            { label: 'Lake Lucerne boats', href: 'https://www.luzern.com/en/the-region/excursions/by-boat' },
            { label: 'Rhine Falls', href: 'https://schaffhauserland.ch/en/regions/the-rhine-falls.html' },
            { label: 'Fondation Beyeler', href: 'https://www.fondationbeyeler.ch/en/' },
          ],
          image: '/images/minted/minted-gallery-07.jpg',
          imageAlt: 'A mountain lake in Switzerland',
        },
        {
          title: 'Further away',
          body: 'If Switzerland is part of a longer holiday, these are better with extra nights rather than squeezed around the wedding.',
          items: ['Swiss National Park in Graubunden.', 'Lauterbrunnen and Jungfraujoch for classic high-Alpine scenery.', 'Hiking ideas: Pizol 5-Lakes Hike, Aletsch Glacier viewpoints, the Bernese Oberland, Graubunden, and Valais.'],
          links: [
            { label: 'Swiss National Park', href: 'https://www.nationalpark.ch/en/' },
            { label: 'Jungfraujoch', href: 'https://www.jungfrau.ch/en/tourism/' },
            { label: 'Pizol 5-Lakes Hike', href: 'https://pizol.com/en/hiking-trails/5-lakes-hiking/' },
          ],
          image: '/images/minted/minted-gallery-06.jpg',
          imageAlt: 'Gabriela and Manfredi in the Swiss Alps',
        },
        {
          title: 'Local advice',
          body: 'Guests are welcome to get in touch with Manfredi and family for personal recommendations, especially for longer Swiss trips, family plans, or routes suited to a particular hiking level.',
        },
      ],
    },
    'switzerland-guide': {
      title: 'Switzerland Guide',
      kicker: 'Practical notes',
      intro:
        'A few practical notes for guests visiting Switzerland: public transport, currency, weather, mobile phones, and straightforward planning.',
      sections: [
        {
          title: 'Public transport',
          body: 'Trains, trams, buses, and boats are punctual, clean, safe, and usually easier than driving. Ticket checks are strict: buy the right ticket before boarding and keep it ready with ID if required.',
          items: ['Use SBB for national trains and ZVV for Zurich-area tickets. ZVV tickets are zone-based; Zurich city is zone 110, Küsnacht is zone 140, and Richterswil is zone 153.', 'For central Zurich, a ZVV single or 24h ticket is usually easiest. For Küsnacht or Richterswil, enter the destination in the SBB/ZVV app and buy the zones it assigns.', 'For day trips beyond Zurich, compare a normal point-to-point ticket, a Supersaver ticket, and a Saver Day Pass. Supersaver tickets can be cheaper when bought in advance, but they are tied to a specific train and are less flexible.', 'Children up to 5.99 years travel free in the Zurich network. Children aged 6 to 15.99 pay the reduced fare; for longer Swiss travel, check SBB child tickets and Junior Travelcard options.'],
          links: [
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
            { label: 'ZVV', href: 'https://www.zvv.ch/en' },
            { label: 'ZVV tickets', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
            { label: 'ZVV ticket inspection', href: 'https://www.zvv.ch/en/travelcards-and-tickets/sales-and-support/ticket-inspection/inspection.html' },
            { label: 'SBB children', href: 'https://www.sbb.ch/en/travelcards-and-tickets/tickets-for-switzerland/children.html' },
          ],
        },
        {
          title: 'Choosing tickets',
          body: 'There is no single best ticket for every guest. These notes are intended as practical starting points.',
          items: ['To move around Zurich: use a ZVV city ticket, 24h ticket, or the Zürich Card if you also want museums, airport transfer, Uetliberg, and short boat rides.', 'To get to Küsnacht for the reception area: buy a ZVV/SBB ticket from your starting stop to Küsnacht ZH or Hotel Sonne’s nearest stop; the app will choose the necessary zones.', 'To go to Richterswil: buy a ZVV/SBB ticket to Richterswil, or consider an all-zone/day ticket if you are making several Zurich-network trips that day.', 'For bigger day trips such as Lucerne, Bern, Basel, or mountain areas: check SBB early for Supersaver tickets or Saver Day Passes, but avoid inflexible tickets if your plans depend on a flight arrival or weather.'],
          links: [
            { label: 'Zürich Card', href: 'https://www.zuerich.com/en/zurichcard' },
            { label: 'Zürich Card transport', href: 'https://www.zuerich.com/en/zurichcard/public-transportation' },
            { label: 'ZVV zone maps', href: 'https://www.zvv.ch/en/timetable-and-information/zone-map.html' },
            { label: 'SBB Supersaver', href: 'https://news.sbb.ch/en/019d7b77-c8f8-7a8a-bd93-3942eee934ca/supersaver-tickets' },
          ],
        },
        {
          title: 'Money and budgeting',
          body: 'Switzerland uses Swiss francs and is often expensive, but planning ahead can keep costs manageable.',
          items: ['Migros and Coop are the largest supermarket chains and are useful for breakfasts, snacks, picnic supplies, and children’s basics.', 'Taxis are usually very expensive. Uber usually works, but public transport is normally cheaper, cleaner, safer, and easier.', 'We advise against renting a car for Zurich and wedding logistics; parking and city traffic make it difficult.', 'Low-cost options include lake walks, Old Town wandering, viewpoints, parks, supermarket picnics, and choosing accommodation near a tram or train stop.'],
        },
        {
          title: 'Weather, packing, and practical tips',
          body: 'June is usually pleasant, but Swiss weather can change quickly. Pack for both sunshine and rain, especially if you are doing lake or mountain activities.',
          items: ['Bring sunglasses, layers, a light rain jacket, and comfortable shoes for walking on cobbles or lake paths.', 'For the wedding day, choose formal shoes you can actually walk in, plus a light layer for the boat or lakefront evening.', 'Switzerland uses Type J sockets. Slim European Type C two-pin plugs usually fit, but larger European Schuko/Type F plugs, UK plugs, and US plugs need an adapter.', 'Most modern phone and laptop chargers handle 230V, but check the label on hair tools and other higher-power devices.'],
          links: [
            { label: 'Swiss plug guide', href: 'https://www.worldstandards.eu/electricity/plug-voltage-by-country/switzerland/' },
          ],
        },
        {
          title: 'Personal recommendations',
          body: 'Guests can get in touch with Manfredi and family for practical advice, especially around hikes, family-friendly plans, longer trips, or whether a specific itinerary is worth the travel time.',
        },
      ],
    },
    faq: {
      title: 'Details & FAQ',
      kicker: 'Helpful answers',
      intro: 'Answers to the questions guests are most likely to ask. More details will be added as the day becomes final.',
      sections: [],
    },
    rsvp: {
      title: 'RSVP',
      kicker: 'Response details',
      intro:
        'The RSVP form is not open yet. Once ready, this page will embed the Tally form for your language and collect attendance, dietary needs, transport, and accommodation details.',
      notice:
        'We will use RSVP information only to plan the wedding, including attendance, seating, dietary requirements, transport, and accommodation logistics.',
      sections: [
        {
          title: 'What the RSVP will ask',
          body: 'The form will collect only the practical details needed for wedding planning.',
          items: ['Guest names and email', 'Adults and children attending', 'Attendance by event', 'Dietary requirements and allergies', 'Accessibility or mobility considerations', 'Travel origin and accommodation status'],
        },
        {
          title: 'Invitation codes',
          body: 'If invitation codes are used, we will add instructions here before RSVP opens.',
          items: ['RSVP opening date: TBD', 'RSVP deadline: TBD', 'Edit-later policy: TBD'],
        },
      ],
    },
    gifts: {
      title: 'Gifts',
      kicker: 'With gratitude',
      intro:
        'Your presence in Switzerland is already the greatest gift. We are so grateful that you are travelling to celebrate with us.',
      sections: [
        {
          title: 'Details to follow',
          body: 'If we add a registry, honeymoon fund, or any further guidance, we will share it here before invitations are sent.',
        },
      ],
    },
    contact: {
      title: 'Contact',
      kicker: 'Questions',
      intro:
        'For now, please use the travel, stay, and FAQ pages for planning. A shared wedding contact route will be added once the domain and guest support plan are confirmed.',
      sections: [
        {
          title: 'Wedding questions',
          body: 'A shared wedding email address is planned, but should only be created after the domain is chosen.',
          items: ['General questions: TBD', 'RSVP support: TBD', 'Wedding-week urgent contact: TBD'],
        },
      ],
    },
    credits: {
      title: 'Image Credits',
      kicker: 'Credits',
      intro: 'Prototype venue and Zurich imagery used for this private wedding website.',
      sections: [
        {
          title: 'Zurich Old Town',
          body: 'Photo by Tiia Monto via Wikimedia Commons, licensed under CC BY-SA 3.0.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Old_town_Zurich.jpg' }],
        },
        {
          title: 'Kirche St. Peter',
          body: 'Photo by Photones via Wikimedia Commons, licensed under CC BY-SA 3.0.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Kirche_St._Peter_Z%C3%BCrich.jpg' }],
        },
        {
          title: 'Hotel Sonne Küsnacht',
          body: 'Prototype images from the official Hotel Sonne website, included for private wedding-site review. Permission should be confirmed before public launch.',
          links: [
            { label: 'Wedding page', href: 'https://sonne.ch/en/event-venues/wedding/' },
            { label: 'Location page', href: 'https://sonne.ch/en/location-getting-here/' },
          ],
        },
      ],
    },
  },
  it: {} as Record<PageKey, PageContent>,
  de: {} as Record<PageKey, PageContent>,
};

pages.it = mirrorLanguage('it');
pages.de = mirrorLanguage('de');

function mirrorLanguage(lang: Exclude<Lang, 'en'>): Record<PageKey, PageContent> {
  const labels = {
    it: {
      suffix: 'Bozza in italiano da rivedere.',
      schedule: ['Il giorno del matrimonio', 'Programma', 'Gli orari esatti sono ancora da confermare.'],
      travel: ['Viaggio', 'Come arrivare a Zurigo', 'Indicazioni pratiche per arrivare da Sardegna, Londra, New York, Chicago e altre località.'],
      stay: ['Dove dormire', 'Alloggio', 'Küsnacht è più comoda per la festa; il centro di Zurigo è ideale per visitare la città.'],
      'things-to-do': ['Cosa fare', 'Zurigo e Svizzera', 'Idee tranquille per esplorare Zurigo, il lago e le montagne.'],
      'switzerland-guide': ['Guida alla Svizzera', 'Note pratiche', 'Trasporti, valuta, meteo, telefoni e consigli utili.'],
      faq: ['Dettagli e FAQ', 'Risposte utili', 'Domande frequenti. Altri dettagli saranno aggiunti più avanti.'],
      rsvp: ['RSVP', 'Conferma di presenza', 'La RSVP non è ancora aperta. Il modulo sarà aggiunto qui.'],
      gifts: ['Regali', 'Con gratitudine', 'La vostra presenza in Svizzera è già il regalo più bello.'],
      contact: ['Contatti', 'Domande', 'Aggiungeremo un contatto dedicato al matrimonio appena confermato.'],
      credits: ['Crediti immagini', 'Crediti', 'Immagini usate nel prototipo del sito privato del matrimonio.'],
    },
    de: {
      suffix: 'Deutscher Entwurf zur Prüfung.',
      schedule: ['Unser Hochzeitstag', 'Ablauf', 'Die genauen Zeiten werden noch bestätigt.'],
      travel: ['Anreise', 'Anreise nach Zürich', 'Praktische Hinweise zur Anreise aus Sardinien, London, New York, Chicago und weiteren Orten.'],
      stay: ['Unterkunft', 'Übernachten', 'Küsnacht ist am praktischsten für die Feier; Zürich Zentrum eignet sich gut zum Erkunden.'],
      'things-to-do': ['Aktivitäten', 'Zürich und Schweiz', 'Ruhige Ideen für Zürich, den See, Berge und Tagesausflüge.'],
      'switzerland-guide': ['Schweiz-Guide', 'Praktische Hinweise', 'Öffentlicher Verkehr, Währung, Wetter, Telefon und nützliche Tipps.'],
      faq: ['Details und FAQ', 'Hilfreiche Antworten', 'Häufige Fragen. Weitere Details folgen.'],
      rsvp: ['RSVP', 'Rückmeldung', 'Die RSVP ist noch nicht geöffnet. Das Formular wird hier ergänzt.'],
      gifts: ['Geschenke', 'Mit Dankbarkeit', 'Eure Anwesenheit in der Schweiz ist für uns schon das schönste Geschenk.'],
      contact: ['Kontakt', 'Fragen', 'Ein Hochzeitskontakt wird ergänzt, sobald er bestätigt ist.'],
      credits: ['Bildnachweise', 'Credits', 'Bilder, die im Prototyp dieser privaten Hochzeitswebsite verwendet werden.'],
    },
  }[lang];

  return Object.fromEntries(
    pageKeys.map((key) => {
      const [title, kicker, intro] = labels[key];
      const englishPage = pages.en[key];
      return [
        key,
        {
          ...englishPage,
          title,
          kicker,
          intro,
          notice: englishPage.notice ? `${labels.suffix} ${englishPage.notice}` : labels.suffix,
        },
      ];
    }),
  ) as Record<PageKey, PageContent>;
}
