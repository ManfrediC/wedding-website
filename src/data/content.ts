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

type InlineLink = {
  text: string;
  href: string;
};

type SectionItem = string | (string | InlineLink)[];

type SectionImage = {
  src: string;
  alt: string;
};

type Section = {
  title: string;
  body: string;
  items?: SectionItem[];
  links?: Link[];
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imageSize?: 'reduced';
  exchangeRates?: boolean;
  gallery?: SectionImage[];
  variant?: 'wide';
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
        body: 'The main events of the day, with confirmed times added here.',
        href: '/en/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter in Zurich',
      },
      {
        title: 'Travel',
        body: 'How to get to Zurich from the USA, the UK, Sardinia and elsewhere.',
        href: '/en/travel/',
        image: '/images/minted/minted-photo-08.jpeg',
        imageAlt: 'Zurich and Lake Zurich from above',
      },
      {
        title: 'Stay',
        body: 'Hotel Sonne and nearby options.',
        href: '/en/stay/',
        image: '/images/places/hotel-sonne-kuesnacht.jpg',
        imageAlt: 'Hotel Sonne in Küsnacht',
      },
      {
        title: 'Things to Do',
        body: 'Zurich, Lake Zurich, mountain views, day trips and travel in Switzerland.',
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
      "Non vediamo l'ora di festeggiare con voi a Zurigo. La giornata inizierà nel centro storico alla Kirche St. Peter, proseguirà sul Lago di Zurigo fino a Küsnacht e continuerà con una serata sul lago all'Hotel Sonne.",
    primaryCta: 'Vedi il programma',
    secondaryCta: 'Viaggio e alloggio',
    closing: 'Siamo felicissimi di poter condividere con voi questa giornata in Svizzera.',
    cards: [
      {
        title: 'Programma',
        body: 'Gli eventi principali della giornata, con gli orari confermati appena disponibili.',
        href: '/it/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter a Zurigo',
      },
      {
        title: 'Viaggio',
        body: "Come arrivare a Zurigo dagli USA, dal Regno Unito, dalla Sardegna e dall'estero.",
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
        body: 'Die wichtigsten Stationen des Tages, mit bestätigten Zeiten sobald verfügbar.',
        href: '/de/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter in Zürich',
      },
      {
        title: 'Anreise',
        body: 'Anreise nach Zürich aus den USA, dem Vereinigten Königreich, Sardinien und weiteren Orten.',
        href: '/de/travel/',
        image: '/images/minted/minted-photo-08.jpeg',
        imageAlt: 'Zürich und der Zürichsee von oben',
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
        'This page serves as a reference for the ceremony, boat transfer, dinner, dancing, and return travel.',
      sections: [
        {
          title: 'Civil ceremony',
          body: 'The civil ceremony at Stadthaus Zürich will take place privately before the wedding celebration. Because visitor numbers are limited, only immediate family can attend.',
          items: ['Date: Thursday, 10 June 2027', 'Time: 11:30', 'Location: Stadthaus Zürich'],
          image: '/images/places/stadthaus-zurich.png',
          imageAlt: 'Facade of Stadthaus Zürich under a blue sky',
        },
        {
          title: 'Ceremony',
          body: "The ceremony will take place at Kirche St. Peter in Zurich old town. Please arrive with plenty of time to settle in; we would like all guests to be seated by 13:40.",
          items: ['Date: Friday, 11 June 2027', 'Guest arrival: 13:30', 'Ceremony: 14:00', 'Guests seated by: 13:40', 'Ceremony languages: TBD'],
          image: '/images/places/st-peter-zurich.jpg',
          imageAlt: 'Kirche St. Peter in Zurich',
        },
        {
          title: 'Boat transfer',
          body: 'After the ceremony, guests will walk for about 12 minutes to Quai 6 at Bürkliplatz, Zürich, accompanied by family members.',
          items: ['Date: Friday, 11 June 2027', 'Boarding time: 15 minutes before departure', 'Departure: around 16:30 (to be confirmed)', 'Boarding point: Quai 6, Bürkliplatz, Zürich', 'Tickets: arranged for guests', 'Please bring comfortable formal shoes for the walk and boat ride, and an umbrella in case of rain.', 'Rain plan and accessibility details: TBD'],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'A boat on Lake Zurich near Hotel Sonne',
        },
        {
          title: 'Reception and party',
          body: 'The evening celebration will be at Hotel Sonne in Küsnacht, beside Lake Zurich.',
          items: ['Date: Friday, 11 June 2027', 'Aperitivo, dinner, and dancing: 17:00', 'Dinner: TBD', 'Dancing and party: TBD', 'Return travel: Saturday, 12 June 2027 at 00:00'],
          image: '/images/places/hotel-sonne-lake-view.jpg',
          imageAlt: 'Hotel Sonne Küsnacht seen from Lake Zurich',
        },
      ],
    },
    travel: {
      title: 'Travel Advice',
      kicker: 'How to get to Zurich',
      intro:
        'Zurich Airport is the main arrival point. The suggestions below are based on current published routes.',
      notice:
        'Please check official entry requirements for your nationality before booking and again before travelling. Switzerland is part of the Schengen area.',
      sections: [
        {
          title: 'From Chicago',
          body: 'Nonstop flights from Chicago O\'Hare (ORD) to Zurich (ZRH) are currently available.',
          items: ['Check nonstop flights first, especially SWISS and United-operated services.', 'If nonstop prices are high, compare one-stop routes through major European hubs such as Frankfurt, Munich, Amsterdam, Paris, or London.', 'Also compare fares with a layover in New York, as Chicago-Zurich itineraries via New York can sometimes be cheaper than nonstop options.', 'Arrive by Thursday, 10 June 2027 at the latest; Wednesday, 9 June 2027 is better for jet lag and delayed bags.', 'We recommend using public trains from Zurich Airport.'],
          links: [
            { label: 'SWISS Chicago-Zurich', href: 'https://www.swiss.com/lhg/us/en/o-d/cy-cy/chicago-zurich' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20Chicago%20to%20Zurich' },
          ],
          image: '/images/places/chicago-skyline.jpg',
          imageAlt: 'Chicago skyline from Lake Michigan',
        },
        {
          title: 'From New York',
          body: 'Nonstop flights from JFK and Newark (EWR) to Zurich (ZRH) are currently available.',
          items: ['Nonstop flights are the most practical option when the price is reasonable; one-stop options can be useful if travelling from outside New York City.', 'Arrive by Thursday, 10 June 2027 at the latest; Wednesday, 9 June 2027 is better for jet lag and delayed bags.', 'We recommend using public trains from Zurich Airport.'],
          links: [
            { label: 'SWISS New York-Zurich', href: 'https://www.swiss.com/lhg/us/en/o-d/cy-cy/new-york-zurich' },
            { label: 'Delta Zurich flights', href: 'https://www.delta.com/us/en/flight-deals/europe-flights/flights-to-zurich' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20New%20York%20to%20Zurich' },
          ],
          image: '/images/places/new-york-skyline.jpg',
          imageAlt: 'New York City skyline',
        },
        {
          title: 'From the UK',
          body: 'From London, direct flights are usually the simplest option.',
          items: ['Compare London Heathrow, Gatwick, City, Luton, and Stansted depending on where you live.', 'For guests outside London, also compare Manchester, Bristol, and other airports with convenient routes.', 'EasyJet can be budget-friendly, but check baggage rules carefully before comparing prices.', 'Basel can be worth comparing if fares are much better, but it is less convenient: to get to Zurich, take Bus 50 from EuroAirport to Basel SBB, then a train to Zurich HB. Expect roughly two or more hours in total and extra Swiss transport cost.', 'The rail route can be a comfortable and sustainable way to reach Switzerland within a day: travel from London St Pancras to Paris by Eurostar, transfer from Gare du Nord to Gare de Lyon (plan enough time for the transfer), then take TGV Lyria to Zürich HB.'],
          links: [
            { label: 'SWISS London-Zurich', href: 'https://www.swiss.com/lhg/gb/en/o-d/cy-cy/london-zurich' },
            { label: 'easyJet London-Zurich', href: 'https://www.easyjet.com/en/flights-from-london/to-zurich/' },
            { label: 'easyJet Luton-Zurich', href: 'https://www.easyjet.com/en/cheap-flights/london-luton/zurich' },
            { label: 'easyJet baggage', href: 'https://www.easyjet.com/en/help/preparing-to-fly/baggage' },
            { label: 'Eurostar London-Zurich', href: 'https://www.eurostar.com/uk-en/train/london-to-zurich' },
            { label: 'EuroAirport public transport', href: 'https://www.euroairport.com/en/transport' },
            { label: 'UK passport advice', href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20London%20to%20Zurich' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
          ],
          image: '/images/places/london-skyline.jpg',
          imageAlt: 'Tower Bridge over the River Thames in London',
        },
        {
          title: 'From Sardinia',
          body: 'For guests travelling from Sardinia, Cagliari and Olbia are likely to be the most useful airports to compare first.',
          items: ['For flying, check Cagliari (CAG) and Olbia (OLB) to Zurich (ZRH) first.', 'EasyJet can be a budget-friendly option for Olbia-Zurich when available. Check the baggage allowance carefully.', 'If there is no convenient direct flight, compare Cagliari or Olbia via Milan, Rome, or another European hub.', 'For driving, take an overnight ferry from Sardinia to Genoa, then drive from Genoa to Zurich. The ferry leg is usually about 10-13 hours depending on route and operator; the Genoa-Zurich drive is roughly five hours before stops, border delays, and Gotthard or San Bernardino traffic.', 'If driving into Switzerland, buy the Swiss motorway vignette from the official Swiss portal and check Alpine tunnel traffic before leaving Genoa. Note that parking in Zurich can be challenging and pricey.'],
          links: [
            { label: 'Edelweiss Cagliari-Zurich', href: 'https://www.flyedelweiss.com/ch/en/fly/flight-information/timetable.html?destination=CAG' },
            { label: 'Edelweiss Olbia-Zurich', href: 'https://www.flyedelweiss.com/ch/en/fly/flight-information/timetable.html?destination=OLB' },
            { label: 'easyJet Olbia-Zurich', href: 'https://www.easyjet.com/en/cheap-flights/sardinia-olbia/zurich' },
            { label: 'easyJet baggage', href: 'https://www.easyjet.com/en/help/preparing-to-fly/baggage' },
            { label: 'Grandi Navi Veloci', href: 'https://www.gnv.it/en/ferries-destinations/sardinia/genoa-porto-torres' },
            { label: 'Moby', href: 'https://www.moby.it/rotte/traghetti-sardegna/genova-olbia-genova/' },
            { label: 'Tirrenia', href: 'https://www.tirrenia.it/' },
            { label: 'Swiss e-vignette', href: 'https://www.bazg.admin.ch/en/electronic-vignette-via-portal-purchase' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20Sardinia%20to%20Zurich' },
            { label: 'Trenitalia', href: 'https://www.trenitalia.com/en.html' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
          ],
          image: '/images/places/sardinia-ogliastra.jpg',
          imageAlt: 'The coast near Santa Maria Navarrese in Ogliastra, Sardinia',
        },
        {
          title: 'From Zurich Airport',
          body: 'Zurich Airport is well connected by train and S-Bahn to Zurich HB, Küsnacht ZH, Richterswil and the wedding venues. In general, we recommend using public transport, as driving can be expensive and parking tends to be challenging.',
          items: [
            [
              'Download ',
              { text: 'the SBB Mobile app', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
              ' before travelling, then search to Küsnacht ZH rather than just Küsnacht.',
            ],
            'The direct S16 from Zürich Flughafen to Küsnacht ZH is usually the simplest airport route. Departures are currently 01 and 31 minutes past the hour, often from platform 3, with a journey of about 26 minutes; confirm the exact platform and time in SBB Mobile on the day.',
            'SBB trains usually leave for Zurich HB about every 10 minutes, and the journey takes about 15 minutes.',
            'Buy the ticket via the app or from the ticket machine before boarding.',
          ],
          links: [
            { label: 'Zurich Airport public transport', href: 'https://www.flughafen-zuerich.ch/en/passengers/practical/parking-and-transport/train-tram-and-bus' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
            { label: 'ZVV', href: 'https://www.zvv.ch/en' },
          ],
          image: '/images/places/zurich-airport-station.jpg',
          imageAlt: 'Trains at Zürich Flughafen railway station',
        },
        {
          title: 'By train to Küsnacht ZH',
          body: 'Küsnacht ZH is on Zurich’s right-bank S-Bahn line.',
          items: ['From Zürich HB: take an S6 or S16 along the right bank of Lake Zurich and get off at Küsnacht ZH. The journey is usually about 12 minutes. Platform numbers can change, so check SBB Mobile and the station boards before boarding.', 'From Zurich Airport: the simplest direct train is usually the S16 to Herrliberg-Feldmeilen or Meilen, getting off at Küsnacht ZH. Current departure times are 01 and 31 minutes past the hour, with travel taking 26 minutes; platforms and times should be checked in SBB Mobile before boarding.', 'From Richterswil: travel by train to Zürich HB, then change to an S6 or S16 for Küsnacht ZH. Taking a boat or ferry may be possible, but times should be confirmed', 'Buy the full journey in SBB Mobile or the ZVV app before boarding; enter Küsnacht ZH so the app chooses the right destination and required zones.'],
          image: '/images/places/kuesnacht-lake-view.jpg',
          imageAlt: 'Küsnacht village seen from Lake Zurich',
          links: [
            { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
            { label: 'ZVV S-Bahn lines', href: 'https://www.zvv.ch/de/fahrplan-und-informationen/fahrplanverfahren/bahn-und-schiff.html' },
          ],
        },
        {
          title: 'Zurich wedding map',
          body: 'Useful places for the wedding weekend:',
          items: ['Kirche St. Peter is in Zurich old town, close to the lake and central tram connections.', 'Hotel Sonne is in Küsnacht ZH on the right bank of Lake Zurich.', "Richterswil, where Manfredi's parents live, is further south on the lake and is reachable by train.", 'Zurich Airport and Zurich HB are connected by frequent trains; use SBB Mobile or ZVV for the exact journey on the day.'],
          links: [
            { label: 'OpenStreetMap', href: 'https://www.openstreetmap.org/#map=11/47.3370/8.5950' },
          ],
          image: '/images/places/zurich-wedding-map.svg',
          imageAlt: 'OpenStreetMap-based map of Zurich, Küsnacht, Richterswil, Zurich Airport, Kirche St. Peter, and Hotel Sonne',
          imageFit: 'contain',
          imageSize: 'reduced',
          variant: 'wide',
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
        'Küsnacht is closest to the evening party. Central Zurich may suit guests who want more transport and restaurant options.',
      sections: [
        {
          title: 'Closest to the party: Küsnacht',
          body: 'Stay in Küsnacht if you want the shortest trip back after dinner and dancing at Hotel Sonne.',
          items: ['Hotel Sonne Küsnacht: guests booking directly with reception can receive an approximately 10% discount on rooms. Please let the reception know that you are a Dago-Carta wedding guest when booking.', 'OXEN Küsnacht: nearby option with a small number of rooms; some rooms use shared bathrooms.', 'Current late-night trains run roughly hourly back towards Zürich HB; check SBB Mobile for the exact connection on the night.'],
          links: [
            { label: 'Hotel Sonne Küsnacht', href: 'https://sonne.ch/en/' },
            { label: 'OXEN Küsnacht', href: 'https://www.oxen.ch/zimmer' },
          ],
          image: '/images/places/hotel-sonne-kuesnacht.jpg',
          imageAlt: 'Hotel Sonne in Küsnacht',
        },
        {
          title: 'Zurich',
          body: 'Zurich city centre provides sightseeing, restaurants, train connections, and easy airport access.',
          items: ['Look near Zurich HB, the Old Town, Bellevue, or Stadelhofen for the most convenient city-centre stay.', 'Other towns on the S6 or S16 line, or places close to Zürich Stadelhofen or Zürich Tiefenbrunnen, can also be convenient because they keep the trip to Küsnacht straightforward.', 'More economical hotels may be easier to find in Zurich Oerlikon or Altstetten; both are connected to the centre and airport by public transport.', 'Accommodation near a tram, train, or bus stop is recommended.', 'Use public transport for travelling around Zurich; driving by car is not recommended due to lack of parking space and poor convenience.'],
          image: '/images/places/zurich-old-town.jpg',
          imageAlt: 'Zurich old town and the Limmat river',
        },
        {
          title: 'Richterswil',
          body: "Richterswil is farther down Lake Zurich. It may suit guests who want to stay near Manfredi's family or prefer a small B&B.",
          items: ['From Zürich HB, the S2 is usually the best direct train to Richterswil; the S8 is a slower direct alternative. Check SBB Mobile for the exact connection before travelling.', 'B&B Caffètino-Vino Richterswil has five rooms in the picturesque village centre, close to the lake and station.', 'It is a B&B rather than a hotel; the house has no lift, and rooms are on the 2nd and 3rd floors.', 'Take note of the public transport connection for the return journey from Küsnacht after the party.'],
          links: [
            { label: 'B & B Caffètino-Vino Richterswil', href: 'https://www.bnb-caffetino-vino.ch/' },
          ],
          image: '/images/places/richterswil-lake.jpg',
          imageAlt: 'Richterswil village seen from Lake Zurich',
        },
        {
          title: 'Booking guidance',
          body: 'Zurich can be expensive in June. We recommend booking early, checking cancellation terms, and comparing hotels with apartments if you are staying longer.',
          items: ['Hotel Sonne discount: direct booking with reception, mentioning the Dago-Carta wedding.'],
          links: [
            { label: 'Airbnb Zurich, June 2027', href: 'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2' },
          ],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'Lake Zurich shoreline near Küsnacht',
        },
        {
          title: 'Accessibility and mobility',
          body: 'Please tell us in the RSVP or by email if steps, walking distances, or transport arrangements may affect your plans.',
          items: ['Kirche St. Peter: the ground floor is wheelchair-accessible, with a lift from St. Peterhofstatt to the church. Assisted hearing devices can be provided.', 'Boat transfer: assistance by crew and family members can be provided.', 'Hotel Sonne: selected rooms are lift-accessible; contact the hotel before booking if lift access is important.', 'OXEN: the rooms are located on the top floor with shared bathrooms.', 'B & B Caffètino-Vino Richterswil: rooms are located on the 2nd and 3rd floors, no lift is available.'],
          links: [
            { label: 'St. Peter accessibility FAQ', href: 'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/' },
            { label: 'ZVV accessible boats', href: 'https://www.zvv.ch/en/service/travel-without-barriers/limited-mobility/ships.html' },
            { label: 'Hotel Sonne rooms', href: 'https://sonne.ch/en/Rooms-Suites' },
            { label: 'OXEN rooms', href: 'https://www.oxen.ch/zimmer' },
            { label: 'B & B Caffètino-Vino', href: 'https://www.bnb-caffetino-vino.ch/' },
            { label: 'Airbnb accessibility filters', href: 'https://www.airbnb.com/help/article/3740' },
          ],
          image: '/images/places/st-peter-zurich.jpg',
          imageAlt: 'Kirche St. Peter in Zurich',
        },
      ],
    },
    'things-to-do': {
      title: 'Things to Do',
      kicker: 'Zurich & Switzerland',
      intro:
        'Use this page if you have spare time around the wedding or would like to extend your stay. It lists concise Zurich ideas, bad-weather options, and day trips that work from one hotel.',
      sections: [
        {
          title: 'Sightseeing and visiting Zurich',
          body: 'We recommend the following activities in Zurich.',
          items: ['Walk the Old Town, Lindenhof, and the Limmat, including Grossmünster and Fraumünster, where Marc Chagall designed the stained-glass windows.', 'Visit Grossmünster for its place in the Swiss Reformation, or Kunsthaus Zürich for a broad art collection.', 'Visit Giacometti-Halle for the painted entrance hall. Zurich Zoo might be an option if you are travelling with children.', 'Take the train up Uetliberg for city and lake views. It is also possible to walk up from the train station Zürich Triemli. Your hike can be extended to Felsenegg.'],
          links: [
            { label: 'Fraumünster', href: 'https://www.zuerich.com/en/visit/attractions/fraumunster' },
            { label: 'Grossmünster', href: 'https://www.zuerich.com/en/visit/attractions/grossmunster' },
            { label: 'Kunsthaus Zürich', href: 'https://www.kunsthaus.ch/en/' },
            { label: 'Giacometti-Halle', href: 'https://www.zuerich.com/en/visit/attractions/giacometti-halle' },
            { label: 'Uetliberg', href: 'https://www.ueetliberg.ch/en/uetliberg' },
            { label: 'Zurich Zoo', href: 'https://www.zoo.ch/en' },
            { label: 'Official Zurich visitor information', href: 'https://www.zuerich.com/en' },
          ],
          image: '/images/minted/minted-photo-08.jpeg',
          imageAlt: 'Zurich and Lake Zurich from above',
        },
        {
          title: 'Museums and chocolate',
          body: 'Rain plan: Kunsthaus Zürich, Museum Rietberg, or Lindt Home of Chocolate in Kilchberg.',
          items: ['Kunsthaus Zürich has art from the Middle Ages to contemporary work, with Swiss painters, Impressionism, Classical Modernism, Dada, Giacometti, and Munch among the highlights.', 'Museum Rietberg focuses on arts and cultures from Asia, Africa, the Americas, and Oceania.', 'Lindt Home of Chocolate in Kilchberg is interactive and especially fun with children; take the S8 towards Kilchberg and check the exact connection in SBB Mobile.'],
          links: [
            { label: 'Kunsthaus', href: 'https://www.kunsthaus.ch/en/sammlung/' },
            { label: 'Museum Rietberg', href: 'https://www.zuerich.com/en/visit/culture/museum-rietberg' },
            { label: 'Lindt', href: 'https://www.lindt-home-of-chocolate.com/en/' },
          ],
          image: '/images/places/kunsthaus-zurich.jpg',
          imageAlt: 'Pipilotti Rist sculpture and Kunsthaus Zürich Chipperfield building at Heimplatz',
        },
        {
          title: 'Lake and water',
          body: 'Warm days are well suited to time by the water. Use official bathing areas, and treat the Limmat current with respect.',
          items: ['For river swimming, Oberer Letten is a well-known Limmat badi for confident swimmers.', 'For lake swimming, consider official badis such as Tiefenbrunnen, Mythenquai, Utoquai, and Enge.', 'Check opening hours, rules, and water conditions on the official city pages before going.', 'A Lake Zurich boat excursion is a relaxed way to see the city and shoreline.'],
          links: [
            { label: 'Oberer Letten', href: 'https://www.stadt-zuerich.ch/de/stadtleben/sport-und-erholung/sport-und-badeanlagen/sommerbaeder/oberer-letten.html' },
            { label: 'Zurich bathing facilities', href: 'https://www.stadt-zuerich.ch/de/stadtleben/sport-und-erholung/sport-und-badeanlagen.html' },
            { label: 'Lake Zurich boats', href: 'https://www.zsg.ch/en/' },
          ],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'A boat on Lake Zurich near Hotel Sonne',
        },
        {
          title: 'Day trips',
          body: 'These are practical day trips from Zurich if you would like a longer excursion without changing hotels.',
          items: ['Lucerne, ideally with a boat on Lake Lucerne.', 'Rapperswil, reachable by train or a longer lake boat route, for the castle, rose garden, old town, wooden bridge, and children’s zoo.', 'Rheinfall near Schaffhausen, the largest waterfall in Europe by volume.', 'Einsiedeln for its monastery church with a richly decorated baroque interior and nearby walking options.', 'Alpstein for hikes such as Seealpsee, Hoher Kasten, and Säntis, with routes at different difficulty levels.', 'Bern for its old town, or Basel for art museums including Fondation Beyeler and Kunstmuseum Basel.'],
          links: [
            { label: 'Lake Lucerne boats', href: 'https://www.luzern.com/en/the-region/excursions/by-boat' },
            { label: 'Rapperswil', href: 'https://www.zuerich.com/en/visit/attractions/rapperswil' },
            { label: 'Rheinfall', href: 'https://rheinfall.ch/en/' },
            { label: 'Einsiedeln Abbey', href: 'https://www.kloster-einsiedeln.ch/' },
            { label: 'Alpstein hikes', href: 'https://www.appenzell.ch/en/summer/hiking.html' },
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
          image: '/images/places/zurich-lindenhof-view.jpg',
          imageAlt: 'Zurich old town and the Limmat from Lindenhof',
        },
      ],
    },
    'switzerland-guide': {
      title: 'Switzerland Guide',
      kicker: 'Practical notes',
      intro:
        'Basics for visiting Switzerland: transport, money, weather, phones, and planning.',
      sections: [
        {
          title: 'Public transport',
          body: 'Zurich is easy to navigate by tram, train, bus, and boat. Use public transport for travelling around Zurich; driving by car is not recommended due to lack of parking space and poor convenience.',
          items: ['Download SBB Mobile before travelling and use it for Swiss-wide timetable searches, live platform checks, and tickets; use ZVV for Zurich-area zones and local tickets.', 'ZVV tickets are zone-based; Zurich city is zone 110, Küsnacht ZH is zone 140, and Richterswil is zone 153.', 'For central Zurich, a ZVV single or 24h ticket is usually easiest. For Küsnacht ZH or Richterswil, enter the destination in SBB Mobile or the ZVV app and buy the zones it assigns.', 'For day trips beyond Zurich, compare a normal point-to-point ticket, a Supersaver ticket, and a Saver Day Pass. Supersaver tickets can be cheaper when bought in advance, but they are tied to a specific train and are less flexible.', 'Guests planning several longer Swiss journeys, lake trips, or mountain excursions should compare the Swiss Half Fare Card for visitors: in 2026 it costs CHF 150 for one month and gives up to 50% off many train, bus, boat, city-transport, and most mountain-railway journeys. It only makes sense if the expected savings are higher than the upfront cost.', 'Children under 6 travel free in the Zurich network. Children aged 6 to 15 pay the reduced fare; for longer Swiss travel, check SBB child tickets and Junior Travelcard options.', 'For relaxed city exploring, consider renting a bike when weather and traffic confidence make it sensible.'],
          gallery: [
            { src: '/images/places/sbb-train.jpg', alt: 'SBB train travelling through the Swiss countryside' },
            { src: '/images/places/zurich-tram.jpg', alt: 'Zurich tram on Bahnhofstrasse' },
            { src: '/images/places/hotel-sonne-lake-arrival.jpg', alt: 'Lake Zurich boat near Küsnacht' },
            { src: '/images/places/santis-cablecar.jpg', alt: 'Säntis cable car in the Alpstein' },
          ],
          links: [
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
            { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
            { label: 'ZVV', href: 'https://www.zvv.ch/en' },
            { label: 'ZVV tickets', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
            { label: 'ZVV ticket inspection', href: 'https://www.zvv.ch/en/travelcards-and-tickets/sales-and-support/ticket-inspection/inspection.html' },
            { label: 'SBB children', href: 'https://www.sbb.ch/en/travelcards-and-tickets/tickets-for-switzerland/children.html' },
            { label: 'Swiss Half Fare Card', href: 'https://www.myswitzerland.com/en-ch/planning/transport-accommodation/tickets-public-transport/swiss-half-fare-card/' },
            { label: 'Züri rollt bike rental', href: 'https://www.zuerich.com/en/visit/sport/zurich-on-wheels' },
          ],
        },
        {
          title: 'Choosing tickets',
          body: 'There is no single best ticket for every guest. These notes are intended as practical starting points.',
          items: ['To move around Zurich by tram, train, or bus: use a ZVV city ticket, 24h ticket, or the Zürich Card if you also want museums, airport transfer, Uetliberg, and short boat rides.', 'To get to the reception area, search for Küsnacht ZH in SBB Mobile or ZVV and buy a ticket from your starting stop to Küsnacht ZH or Hotel Sonne’s nearest stop; the app will choose the necessary zones.', 'To go to Richterswil: buy a ZVV/SBB ticket to Richterswil, or consider an all-zone/day ticket if you are making several Zurich-network trips that day.', 'For bigger day trips such as Lucerne, Bern, Basel, or mountain areas: check SBB early for Supersaver tickets or Saver Day Passes, but avoid inflexible tickets if your plans depend on a flight arrival or weather.'],
          image: '/images/places/sbb-ticket-machine.jpg',
          imageAlt: 'ZVV ticket machine at Zurich Airport tram stop',
          links: [
            { label: 'Zürich Card', href: 'https://www.zuerich.com/en/zurichcard' },
            { label: 'Zürich Card transport', href: 'https://www.zuerich.com/en/zurichcard/public-transportation' },
            { label: 'ZVV zone maps', href: 'https://www.zvv.ch/en/timetable-and-information/zone-map.html' },
            { label: 'SBB Supersaver', href: 'https://news.sbb.ch/en/019d7b77-c8f8-7a8a-bd93-3942eee934ca/supersaver-tickets' },
          ],
        },
        {
          title: 'Money and budgeting',
          body: 'Switzerland uses Swiss francs and prices can be high. Supermarkets and public transport help keep day-to-day costs lower.',
          items: ['Migros and Coop are the largest supermarket chains and are useful for breakfasts, snacks, picnic supplies, and children’s basics.', 'Taxis are usually expensive. Use them only when luggage, children, or accessibility needs make them genuinely useful.', 'Use public transport for travelling around Zurich; driving by car is not recommended due to lack of parking space and poor convenience.', 'Low-cost options include lake walks, Old Town wandering, viewpoints, parks, supermarket picnics, and choosing accommodation near a tram, train, or bus stop.'],
          image: '/images/places/zurich-lindenhof-view.jpg',
          imageAlt: 'Zurich old town and the Limmat from Lindenhof',
          exchangeRates: true,
        },
        {
          title: 'Weather, packing, and practical tips',
          body: 'June is usually pleasant, but Swiss weather can change quickly. Pack for both sunshine and rain, especially if you are doing lake or mountain activities.',
          items: [
            'Bring sunglasses, layers, a light rain jacket, and comfortable shoes for walking on cobbles or lake paths.',
            'For the wedding day, choose formal shoes you can actually walk in, plus a light layer for the boat or lakefront evening.',
            [
              'Switzerland uses ',
              { text: 'Type J', href: 'https://en.wikipedia.org/wiki/SN_441011' },
              ' sockets. Slim European Type C two-pin plugs usually fit, but larger European Schuko/Type F plugs, UK plugs, and US plugs need an adapter.',
            ],
            'Most modern phone and laptop chargers handle 230V, but check the label on hair tools and other higher-power devices.',
          ],
          links: [
            { label: 'Swiss plug guide', href: 'https://www.worldstandards.eu/electricity/plug-voltage-by-country/switzerland/' },
          ],
          image: '/images/places/zurich-rainy-day.jpg',
          imageAlt: 'Rainy day by Schwarzenbach in Zurich old town',
        },
        {
          title: 'Personal recommendations',
          body: 'Guests can get in touch with Manfredi and family for practical advice, especially around hikes, family-friendly plans, longer trips, or whether a specific itinerary is worth the travel time.',
          image: '/images/minted/minted-gallery-01.jpeg',
          imageAlt: 'Gabriela, Manfredi, and family in the Swiss countryside',
        },
      ],
    },
    faq: {
      title: 'Details & FAQ',
      kicker: 'Helpful answers',
      intro: 'Practical answers for invited guests. We will add confirmed timings and transport details when they are ready.',
      sections: [],
    },
    rsvp: {
      title: 'RSVP',
      kicker: 'Response details',
      intro:
        'Please use the form below to let us know whether you will be able to celebrate with us in Zurich.',
      sections: [],
    },
    gifts: {
      title: 'Gifts',
      kicker: 'With gratitude',
      intro:
        'If you are travelling to Switzerland, please do not feel any obligation to bring or send a gift.',
      sections: [
        {
          title: 'Details to follow',
          body: 'If we decide to share registry or honeymoon-fund details, we will add them here before invitations are sent.',
        },
      ],
    },
    contact: {
      title: 'Contact',
      kicker: 'Questions',
      intro:
        'For questions about the wedding website, travel, accommodation, or RSVP, please contact us at gabyandmanfredi@gmail.com.',
      sections: [
        {
          title: 'Wedding questions',
          body: 'For now, please send wedding questions to gabyandmanfredi@gmail.com.',
          items: ['General questions: gabyandmanfredi@gmail.com', 'RSVP support: gabyandmanfredi@gmail.com', 'Wedding-week urgent contact: TBD'],
          links: [
            { label: 'gabyandmanfredi@gmail.com', href: 'mailto:gabyandmanfredi@gmail.com' },
          ],
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
          title: 'Stadthaus Zürich',
          body: 'Photo by Tiia Monto via Wikimedia Commons, licensed under CC BY-SA 3.0.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Stadthaus_Z%C3%BCrich.jpg' }],
        },
        {
          title: 'Kirche St. Peter',
          body: 'Photo by Photones via Wikimedia Commons, licensed under CC BY-SA 3.0.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Kirche_St._Peter_Z%C3%BCrich.jpg' }],
        },
        {
          title: 'Kunsthaus Zürich',
          body: 'Photo by Adrian Michael via Wikimedia Commons, licensed under CC BY-SA 4.0; cropped for display.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Heimplatz_2.jpeg' }],
        },
        {
          title: 'Travel and public transport images',
          body: 'Travel-origin and public-transport photos are from Wikimedia Commons and Unsplash. Source details are also tracked in doc/assets/image_sources.md.',
          links: [
            { label: 'Chicago', href: 'https://commons.wikimedia.org/wiki/File:Chicago_Skyline_from_Lake_Michigan.jpg' },
            { label: 'New York', href: 'https://commons.wikimedia.org/wiki/File:Manhattan_Skyline_night.jpg' },
            { label: 'London', href: 'https://commons.wikimedia.org/wiki/File:View_of_the_Tower_Bridge_from_the_Thames_from_northwest._London.jpg' },
            { label: 'Ogliastra', href: 'https://commons.wikimedia.org/wiki/File:Coast_and_sea_at_Santa_Maria_Navarrese,_Sardinia,_Italy.jpg' },
            { label: 'Zurich Airport station', href: 'https://commons.wikimedia.org/wiki/File:Bahnhof_Z%C3%BCrich_Flughafen_01.jpg' },
            { label: 'Küsnacht lake view', href: 'https://commons.wikimedia.org/wiki/File:Blick_vom_Z%C3%BCrichsee_auf_K%C3%BCsnacht_(2009).jpg' },
            { label: 'Richterswil', href: 'https://commons.wikimedia.org/wiki/File:Richterswil_-_Z%C3%BCrichsee_2010-08-03_17-49-52.JPG' },
            { label: 'Zurich Lindenhof view', href: 'https://commons.wikimedia.org/wiki/File:Z%C3%BCrich_-_Lindenhof_-_Limmat_-_rechtsseitige_Altstadt.jpg' },
            { label: 'SBB train', href: 'https://commons.wikimedia.org/wiki/File:SBB_RABe_511_(50852815551).jpg' },
            { label: 'Zurich tram', href: 'https://commons.wikimedia.org/wiki/File:Tram_E,_Bahnhofstrasse,_Zurich,_Switzerland.JPG' },
            { label: 'Säntis cable car', href: 'https://commons.wikimedia.org/wiki/File:S%C3%A4ntis_LSB_Blaue_Kabine_von_Talstation.jpg' },
            { label: 'ZVV ticket machine', href: 'https://commons.wikimedia.org/wiki/File:Ticket_machine_at_Zurich_Airport_tram_stop_03.jpg' },
            { label: 'Rainy Zurich', href: 'https://unsplash.com/photos/a-man-walking-down-a-street-holding-an-umbrella-ESr01gk08uA' },
          ],
        },
        {
          title: 'Hotel Sonne Küsnacht',
          body: 'Prototype images include official Hotel Sonne website images for private wedding-site review and one lake-facing Wikimedia Commons image. Permission for official venue images should be confirmed before public launch.',
          links: [
            { label: 'Wedding page', href: 'https://sonne.ch/en/event-venues/wedding/' },
            { label: 'Location page', href: 'https://sonne.ch/en/location-getting-here/' },
            { label: 'Lake-facing Sonne photo', href: 'https://commons.wikimedia.org/wiki/File:K%C3%BCsnacht_-_Z%C3%BCrichsee_2010-08-08_18-54-36_ShiftN.jpg' },
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

applyLocalizedCopy('it', {
  schedule: {
    title: 'Il giorno del matrimonio',
    kicker: 'Programma',
    intro:
      'Questa pagina serve da riferimento per la cerimonia, il trasferimento in barca, la cena, la festa e il rientro.',
    notice: undefined,
    sections: [
      {
        title: 'Cerimonia civile',
        body: 'La cerimonia civile allo Stadthaus Zürich si terrà in forma privata prima della celebrazione. Poiché il numero di visitatori è limitato, potranno partecipare solo i familiari più stretti.',
        items: ['Data: giovedì 10 giugno 2027', 'Ora: 11:30', 'Luogo: Stadthaus Zürich'],
        imageAlt: 'Facciata dello Stadthaus Zürich sotto un cielo blu',
      },
      {
        title: 'Cerimonia',
        body: 'La cerimonia si terrà alla Kirche St. Peter, nel centro storico di Zurigo. Arrivate con ampio margine per sistemarvi; vorremmo che tutti gli ospiti fossero seduti entro le 13:40.',
        items: ['Data: venerdì 11 giugno 2027', 'Arrivo degli ospiti: 13:30', 'Cerimonia: 14:00', 'Ospiti seduti entro: 13:40', 'Lingue della cerimonia: TBD'],
        imageAlt: 'Kirche St. Peter a Zurigo',
      },
      {
        title: 'Trasferimento in barca',
        body: 'Dopo la cerimonia, gli ospiti cammineranno per circa 12 minuti fino al Quai 6 a Bürkliplatz, Zurigo, accompagnati dai familiari.',
        items: ['Data: venerdì 11 giugno 2027', 'Imbarco: 15 minuti prima della partenza', 'Partenza: intorno alle 16:30 (da confermare)', 'Punto d’imbarco: Quai 6, Bürkliplatz, Zurigo', 'Biglietti: organizzati per gli ospiti', 'Portate scarpe eleganti ma comode per la camminata e la barca, e un ombrello in caso di pioggia.', 'Piano in caso di pioggia e dettagli di accessibilità: TBD'],
        imageAlt: 'Una barca sul Lago di Zurigo vicino all’Hotel Sonne',
      },
      {
        title: 'Ricevimento e festa',
        body: 'La serata si terrà all’Hotel Sonne di Küsnacht, sulle rive del Lago di Zurigo.',
        items: ['Data: venerdì 11 giugno 2027', 'Aperitivo, cena e festa: 17:00', 'Cena: TBD', 'Ballo e festa: TBD', 'Rientro: sabato 12 giugno 2027 alle 00:00'],
        imageAlt: 'Hotel Sonne Küsnacht visto dal Lago di Zurigo',
      },
    ],
  },
  travel: {
    title: 'Viaggio',
    kicker: 'Come arrivare a Zurigo',
    intro:
      'L’aeroporto di Zurigo è il principale punto di arrivo. I suggerimenti qui sotto si basano sulle rotte attualmente pubblicate.',
    notice:
      'Controllate i requisiti ufficiali di ingresso per la vostra nazionalità prima di prenotare e di nuovo prima di partire. La Svizzera fa parte dell’area Schengen.',
    sections: [
      {
        title: 'Da Chicago',
        body:
          "Sono attualmente disponibili voli diretti da Chicago O'Hare (ORD) a Zurigo (ZRH).",
        items: ['Controllate prima i voli diretti, in particolare SWISS e i servizi operati da United.', 'Se i voli diretti sono costosi, confrontate itinerari con uno scalo in hub europei come Francoforte, Monaco, Amsterdam, Parigi o Londra.', 'Confrontate anche tariffe con scalo a New York: gli itinerari Chicago-Zurigo via New York possono talvolta costare meno dei voli diretti.', 'Arrivate entro giovedì 10 giugno 2027 al più tardi; mercoledì 9 giugno 2027 è preferibile per jet lag e possibili ritardi dei bagagli.', 'Consigliamo di usare i treni pubblici dall’aeroporto di Zurigo.'],
        imageAlt: 'Skyline di Chicago dal Lago Michigan',
      },
      {
        title: 'Da New York',
        body:
          'Sono attualmente disponibili voli diretti da JFK e Newark (EWR) a Zurigo (ZRH).',
        items: ['I voli diretti sono l’opzione più pratica quando il prezzo è ragionevole; uno scalo può essere utile per chi parte da fuori New York City.', 'Arrivate entro giovedì 10 giugno 2027 al più tardi; mercoledì 9 giugno 2027 è preferibile per jet lag e possibili ritardi dei bagagli.', 'Consigliamo di usare i treni pubblici dall’aeroporto di Zurigo.'],
        imageAlt: 'Skyline di New York City',
      },
      {
        title: 'Dal Regno Unito',
        body:
          'Da Londra, i voli diretti sono di solito la soluzione più semplice.',
        items: ['Confrontate London Heathrow, Gatwick, City, Luton e Stansted in base a dove vivete.', 'Per chi vive fuori Londra, confrontate anche Manchester, Bristol e altri aeroporti con collegamenti comodi.', 'EasyJet può essere conveniente, ma controllate con attenzione le regole sui bagagli prima di confrontare i prezzi.', 'Basilea può valere un confronto se le tariffe sono molto migliori, ma è meno comoda: per arrivare a Zurigo, prendete il bus 50 dall’EuroAirport a Basel SBB, poi un treno per Zurich HB. Calcolate circa due ore o più in totale e un costo extra per i trasporti svizzeri.', 'Il viaggio in treno può essere un modo comodo e sostenibile per arrivare in Svizzera in giornata: Eurostar da London St Pancras a Parigi, trasferimento da Gare du Nord a Gare de Lyon (prevedete abbastanza tempo per il cambio), poi TGV Lyria per Zürich HB.'],
        imageAlt: 'Tower Bridge sul Tamigi a Londra',
      },
      {
        title: 'Dalla Sardegna',
        body:
          'Per chi parte dalla Sardegna, Cagliari e Olbia sono probabilmente gli aeroporti più utili da confrontare per primi.',
        items: ['Per volare, controllate prima Cagliari (CAG) e Olbia (OLB) verso Zurigo (ZRH).', 'EasyJet può essere conveniente per Olbia-Zurigo quando disponibile. Controllate con attenzione il bagaglio incluso.', 'Se non c’è un volo diretto comodo, confrontate Cagliari o Olbia via Milano, Roma o un altro hub europeo.', 'Per arrivare in auto, prendete un traghetto notturno dalla Sardegna a Genova e poi guidate da Genova a Zurigo. Il traghetto dura di solito circa 10-13 ore a seconda della tratta e dell’operatore; Genova-Zurigo richiede circa cinque ore prima di pause, frontiera e traffico al Gottardo o al San Bernardino.', 'Se entrate in Svizzera in auto, acquistate la vignetta autostradale dal portale ufficiale svizzero e controllate il traffico nei tunnel alpini prima di lasciare Genova. Il parcheggio a Zurigo può essere difficile e costoso.'],
        imageAlt: 'La costa vicino a Santa Maria Navarrese in Ogliastra, Sardegna',
      },
      {
        title: 'Dall’aeroporto di Zurigo',
        body:
          'L’aeroporto di Zurigo è ben collegato in treno e S-Bahn a Zurich HB, Küsnacht ZH, Richterswil e ai luoghi del matrimonio. In generale, consigliamo di usare i mezzi pubblici, perché guidare può essere costoso e trovare parcheggio tende a essere difficile.',
        items: [
          [
            'Scaricate ',
            { text: 'l’app SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
            ' prima del viaggio e cercate Küsnacht ZH, non solo Küsnacht.',
          ],
          'Il collegamento diretto S16 da Zürich Flughafen a Küsnacht ZH è di solito il percorso più semplice dall’aeroporto. Le partenze sono attualmente ai minuti 01 e 31, spesso dal binario 3, con un viaggio di circa 26 minuti; controllate sempre orario e binario in SBB Mobile il giorno stesso.',
          'I treni SBB per Zurich HB partono di solito circa ogni 10 minuti e il viaggio dura circa 15 minuti.',
          'Comprate il biglietto tramite l’app o alla biglietteria automatica prima di salire.',
        ],
        imageAlt: "Treni alla stazione ferroviaria dell'aeroporto di Zurigo",
      },
      {
        title: 'In treno per Küsnacht ZH',
        body:
          'Küsnacht ZH si trova sulla linea S-Bahn della riva destra del Lago di Zurigo.',
        items: ['Da Zürich HB: prendete un S6 o S16 lungo la riva destra del Lago di Zurigo e scendete a Küsnacht ZH. Il viaggio dura di solito circa 12 minuti. I binari possono cambiare: controllate SBB Mobile e i tabelloni in stazione prima di salire.', 'Dall’aeroporto di Zurigo: il treno diretto più semplice è di solito l’S16 per Herrliberg-Feldmeilen o Meilen, scendendo a Küsnacht ZH. Gli orari attuali sono ai minuti 01 e 31, con un viaggio di 26 minuti; orari e binari vanno controllati in SBB Mobile prima di salire.', 'Da Richterswil: viaggiate in treno fino a Zürich HB, poi cambiate con S6 o S16 per Küsnacht ZH. Una barca o un traghetto potrebbero essere possibili, ma gli orari vanno confermati.', 'Comprate l’intero percorso in SBB Mobile o nell’app ZVV prima di salire; inserite Küsnacht ZH così l’app sceglie la destinazione giusta e le zone necessarie.'],
        image: '/images/places/kuesnacht-lake-view.jpg',
        imageAlt: 'Küsnacht vista dal Lago di Zurigo',
      },
      {
        title: 'Mappa dei luoghi del matrimonio a Zurigo',
        body:
          'Luoghi utili per il fine settimana del matrimonio:',
        items: ['Kirche St. Peter si trova nel centro storico di Zurigo, vicino al lago e ai collegamenti tram centrali.', 'Hotel Sonne si trova a Küsnacht ZH, sulla sponda destra del Lago di Zurigo.', 'Richterswil, dove vivono i genitori di Manfredi, si trova più a sud lungo il lago ed è raggiungibile in treno.', 'L’aeroporto di Zurigo e Zurich HB sono collegati da treni frequenti; usate SBB Mobile o ZVV per il percorso esatto nel giorno del viaggio.'],
        imageAlt: 'Mappa basata su OpenStreetMap di Zurigo, Küsnacht, Richterswil, aeroporto di Zurigo, Kirche St. Peter e Hotel Sonne',
      },
      {
        title: 'Link ufficiali',
        body: 'Usate le fonti ufficiali per passaporti, visti, ETIAS e trasporti.',
      },
    ],
  },
  stay: {
    title: 'Dove dormire',
    kicker: 'Alloggio',
    intro:
      'Küsnacht è la zona più vicina alla festa serale. Il centro di Zurigo può essere adatto a chi desidera più opzioni di trasporto e ristoranti.',
    sections: [
      {
        title: 'Più vicino alla festa: Küsnacht',
        body:
          'Scegliete Küsnacht se volete il rientro più breve dopo cena e dopo la festa all’Hotel Sonne.',
        items: ['Hotel Sonne Küsnacht: chi prenota direttamente con la reception può ricevere uno sconto di circa il 10% sulle camere. Comunicate alla reception che siete ospiti del matrimonio Dago-Carta al momento della prenotazione.', 'OXEN Küsnacht: opzione vicina con un piccolo numero di camere; alcune camere hanno bagni condivisi.', 'Attualmente i treni notturni verso Zürich HB circolano più o meno ogni ora; controllate il collegamento esatto in SBB Mobile la sera stessa.'],
        links: [
          { label: 'Hotel Sonne Küsnacht', href: 'https://sonne.ch/en/' },
          { label: 'Camere OXEN Küsnacht', href: 'https://www.oxen.ch/zimmer' },
        ],
        imageAlt: 'Hotel Sonne a Küsnacht',
      },
      {
        title: 'Centro di Zurigo',
        body:
          'Il centro di Zurigo è pratico per chi desidera ristoranti, visite, collegamenti ferroviari e facile accesso all’aeroporto.',
        items: ['Cercate vicino a Zurich HB, centro storico, Bellevue o Stadelhofen per la soluzione più comoda in centro.', 'Anche altri paesi lungo le linee S6 o S16, oppure zone vicine a Zürich Stadelhofen o Zürich Tiefenbrunnen, possono essere comodi perché semplificano il tragitto per Küsnacht.', 'Hotel più economici possono essere più facili da trovare a Zurich Altstetten o Oerlikon; entrambe le zone sono collegate al centro e all’aeroporto con i mezzi pubblici.', 'Scegliete un alloggio vicino a una fermata di tram, treno o autobus.', 'Usate i mezzi pubblici per muovervi a Zurigo; spostarsi in auto non è consigliato per la mancanza di parcheggi e la scarsa praticità.'],
        imageAlt: 'Centro storico di Zurigo e fiume Limmat',
      },
      {
        title: 'Richterswil',
        body:
          'Richterswil si trova più a sud lungo il Lago di Zurigo. Può essere adatto a chi desidera stare vicino alla famiglia di Manfredi o preferisce un piccolo B&B.',
        items: ['Da Zürich HB, l’S2 è di solito il miglior treno diretto per Richterswil; l’S8 è un’alternativa diretta più lenta. Controllate il collegamento esatto in SBB Mobile prima di partire.', 'B & B Caffètino-Vino Richterswil ha cinque camere nel centro storico del paese, vicino al lago e alla stazione.', 'È un B&B, non un hotel; la casa non ha ascensore e le camere si trovano al 2° e 3° piano.', 'Controllate il rientro serale da Küsnacht prima di prenotare, soprattutto dopo la festa.'],
        imageAlt: 'Richterswil vista dal Lago di Zurigo',
      },
      {
        title: 'Indicazioni per prenotare',
        body:
          'Zurigo può essere costosa a giugno. Consigliamo di prenotare presto, controllare le condizioni di cancellazione e confrontare hotel e appartamenti se vi fermate più a lungo.',
        items: ['Sconto Hotel Sonne: prenotazione diretta con la reception, indicando il matrimonio Dago-Carta.', 'Codici di prenotazione per altri hotel: TBD', 'Scadenze per eventuali blocchi camere: TBD', 'Fasce di prezzo indicative: TBD'],
        imageAlt: 'Riva del Lago di Zurigo vicino a Küsnacht',
        links: [
          { label: 'Airbnb Zurigo, giugno 2027', href: 'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2' },
        ],
      },
      {
        title: 'Accessibilità e mobilità',
        body:
          'Segnalateci nella RSVP o via email se scale, distanze a piedi, supporto uditivo o trasporti possono influire sui vostri piani. Confermeremo i dettagli specifici con le sedi appena la logistica del matrimonio sarà definitiva.',
        items: ['Kirche St. Peter: secondo la FAQ ufficiale della chiesa, il piano terra è accessibile in sedia a rotelle. È indicato un ascensore da St. Peterhofstatt alla chiesa; galleria e coro non sono accessibili in sedia a rotelle. È inoltre indicato un sistema a induzione magnetica.', 'Trasferimento in barca: ZSG/ZVV indicano che i battelli del Lago di Zurigo possono trasportare sedie a rotelle fino a 80 cm di larghezza in 2a classe, con assistenza dell’equipaggio agli approdi. La barca e il punto d’imbarco del matrimonio devono ancora essere confermati.', 'Hotel Sonne: l’accessibilità varia in base alla categoria di camera. Alcune pagine indicano che non tutte le camere sono raggiungibili in ascensore; altre camere sono indicate come accessibili con ascensore. Contattate l’hotel prima di prenotare se l’ascensore è importante.', 'OXEN: le informazioni pubblicate indicano che le camere si trovano all’ultimo piano e hanno bagni condivisi. Contattate direttamente OXEN prima di prenotare se scale o accesso al bagno possono essere un problema.', 'B & B Caffètino-Vino Richterswil: il B&B indica che la casa storica non ha ascensore e che le camere sono al 2° e 3° piano.', 'Per hotel a Zurigo o appartamenti Airbnb, usate i filtri di accessibilità, ma confermate direttamente con la struttura ingresso senza gradini, accesso al bagno, dimensioni dell’ascensore e distanza dai mezzi pubblici.'],
        links: [
          { label: 'FAQ accessibilità St. Peter', href: 'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/' },
          { label: 'Battelli accessibili ZVV', href: 'https://www.zvv.ch/en/service/travel-without-barriers/limited-mobility/ships.html' },
          { label: 'Camere Hotel Sonne', href: 'https://sonne.ch/en/Rooms-Suites' },
          { label: 'Camere OXEN', href: 'https://www.oxen.ch/zimmer' },
          { label: 'B & B Caffètino-Vino', href: 'https://www.bnb-caffetino-vino.ch/' },
          { label: 'Filtri accessibilità Airbnb', href: 'https://www.airbnb.com/help/article/3740' },
        ],
        imageAlt: 'Kirche St. Peter a Zurigo',
      },
    ],
  },
  'things-to-do': {
    title: 'Cosa fare',
    kicker: 'Zurigo e Svizzera',
    intro:
      'Usate questa pagina se avete tempo libero prima o dopo il matrimonio, o se volete prolungare il soggiorno. Include idee concise per Zurigo, opzioni in caso di pioggia e gite fattibili senza cambiare hotel.',
    sections: [
      {
        title: 'Visitare Zurigo',
        body: 'Se prolungate il soggiorno, queste sono opzioni semplici per vedere Zurigo senza riempire troppo il fine settimana del matrimonio.',
        items: ['Passeggiate nel centro storico, al Lindenhof e lungo la Limmat, includendo Grossmünster e Fraumünster, dove Marc Chagall ha realizzato le famose vetrate.', 'Visitate Grossmünster per il suo legame con la Riforma svizzero-tedesca, oppure Kunsthaus Zürich per un’ampia collezione d’arte.', 'Fate un breve giro in battello sulla Limmat o sul Lago di Zurigo per vedere la città dall’acqua.', 'Visitate la Giacometti-Halle per l’atrio dipinto, oppure Zurich Zoo se viaggiate con bambini.', 'Salite in treno all’Uetliberg per la vista sulla città e sul lago, poi percorrete una parte del Planetenweg se desiderate una passeggiata tranquilla nella natura. Controllate il collegamento aggiornato in SBB Mobile prima di partire.'],
        links: [
          { label: 'Fraumünster', href: 'https://www.zuerich.com/en/visit/attractions/fraumunster' },
          { label: 'Grossmünster', href: 'https://www.zuerich.com/en/visit/attractions/grossmunster' },
          { label: 'Kunsthaus Zürich', href: 'https://www.kunsthaus.ch/en/' },
          { label: 'Giacometti-Halle', href: 'https://www.zuerich.com/en/visit/attractions/giacometti-halle' },
          { label: 'Uetliberg', href: 'https://www.ueetliberg.ch/en/uetliberg' },
          { label: 'Zurich Zoo', href: 'https://www.zoo.ch/en' },
          { label: 'Informazioni ufficiali per visitare Zurigo', href: 'https://www.zuerich.com/en' },
        ],
        imageAlt: 'Zurigo e il Lago di Zurigo dall’alto',
      },
      {
        title: 'Musei e cioccolato',
        body: 'In caso di pioggia: Kunsthaus Zürich, Museum Rietberg o Lindt Home of Chocolate a Kilchberg.',
        items: ['Il Kunsthaus Zürich espone arte dal Medioevo al contemporaneo, con pittori svizzeri, Impressionismo, Modernismo classico, Dada, Giacometti e Munch tra i punti forti.', 'Il Museum Rietberg è dedicato ad arti e culture di Asia, Africa, Americhe e Oceania.', 'Lindt Home of Chocolate a Kilchberg è interattivo e particolarmente adatto anche ai bambini; prendete l’S8 verso Kilchberg e controllate il collegamento esatto in SBB Mobile.'],
        imageAlt: 'Scultura di Pipilotti Rist ed edificio Chipperfield del Kunsthaus Zürich a Heimplatz',
      },
      {
        title: 'Lago e acqua',
        body: 'Le giornate calde si prestano bene al lago e ai bagni pubblici. Usate le aree ufficiali e rispettate la corrente della Limmat.',
        items: ['Per nuotare nel fiume, Oberer Letten è una badi nota sulla Limmat, adatta a nuotatori sicuri.', 'Per il lago, considerate badis ufficiali come Tiefenbrunnen, Mythenquai, Utoquai ed Enge.', 'Controllate orari, regole e condizioni dell’acqua sulle pagine ufficiali della città.', 'Un giro in battello sul Lago di Zurigo è un modo tranquillo per vedere la città e la riva del lago.'],
        imageAlt: 'Una barca sul Lago di Zurigo vicino all’Hotel Sonne',
      },
      {
        title: 'Gite in giornata',
        body: 'Queste gite sono pratiche da Zurigo se volete fare un’escursione più lunga senza cambiare hotel.',
        items: ['Lucerna, idealmente con un giro in battello sul Lago dei Quattro Cantoni.', 'Rapperswil, raggiungibile in treno o con un giro più lungo in battello, per castello, roseto, centro storico, ponte di legno e zoo per bambini.', 'Rheinfall vicino a Sciaffusa, la cascata più grande d’Europa per volume d’acqua.', 'Einsiedeln per la chiesa del monastero con interni barocchi riccamente decorati e possibilità di passeggiate nei dintorni.', 'Alpstein per escursioni come Seealpsee, Hoher Kasten e Säntis, con percorsi di diversa difficoltà.', 'Berna per il centro storico, o Basilea per musei d’arte come Fondation Beyeler e Kunstmuseum Basel.'],
        imageAlt: 'Un lago di montagna in Svizzera',
      },
      {
        title: 'Più lontano',
        body: 'Se la Svizzera fa parte di un viaggio più lungo, queste destinazioni sono più adatte con notti aggiuntive che non incastrate attorno al matrimonio.',
        items: ['Parco Nazionale Svizzero nei Grigioni.', 'Lauterbrunnen e Jungfraujoch per paesaggi alpini classici.', 'Idee per escursioni: Pizol 5-Lakes Hike, punti panoramici sull’Aletsch Glacier, Oberland bernese, Grigioni e Vallese.'],
        imageAlt: 'Gabriela e Manfredi nelle Alpi svizzere',
      },
      {
        title: 'Consigli locali',
        body: 'Gli ospiti possono contattare Manfredi e la famiglia per consigli personali, soprattutto per viaggi più lunghi in Svizzera, programmi con bambini o percorsi adatti a un certo livello di cammino.',
        imageAlt: 'Centro storico di Zurigo e la Limmat dal Lindenhof',
      },
    ],
  },
  'switzerland-guide': {
    title: 'Guida alla Svizzera',
    kicker: 'Note pratiche',
    intro:
      'Informazioni di base per visitare la Svizzera: trasporti, soldi, meteo, telefoni e pianificazione.',
    sections: [
      {
        title: 'Trasporti pubblici',
        body:
          'A Zurigo ci si muove facilmente con tram, treni, autobus e battelli. Usate i mezzi pubblici per muovervi a Zurigo; viaggiare in auto non è consigliato per la mancanza di parcheggi e la scarsa praticità.',
        items: ['Scaricate SBB Mobile prima del viaggio e usatela per orari in tutta la Svizzera, controllo dei binari in tempo reale e biglietti; usate ZVV per le zone e i biglietti dell’area di Zurigo.', 'I biglietti ZVV sono basati sulle zone; la città di Zurigo è la zona 110, Küsnacht ZH la zona 140 e Richterswil la zona 153.', 'Per il centro di Zurigo, di solito è più semplice un biglietto singolo ZVV o un biglietto 24 ore. Per Küsnacht ZH o Richterswil, inserite la destinazione in SBB Mobile o nell’app ZVV e acquistate le zone indicate.', 'Per gite fuori Zurigo, confrontate un biglietto punto-punto, un Supersaver ticket e un Saver Day Pass. I Supersaver possono costare meno se acquistati in anticipo, ma sono legati a un treno specifico e sono meno flessibili.', 'Chi prevede diversi viaggi più lunghi in Svizzera, gite sul lago o escursioni in montagna dovrebbe confrontare la Swiss Half Fare Card per visitatori: nel 2026 costa CHF 150 per un mese e offre fino al 50% di sconto su molti treni, autobus, battelli, trasporti urbani e gran parte degli impianti di montagna. Ha senso solo se il risparmio previsto supera il costo iniziale.', 'I bambini sotto i 6 anni viaggiano gratis nella rete di Zurigo. I bambini dai 6 ai 15 anni pagano la tariffa ridotta; per viaggi più lunghi in Svizzera, controllate i biglietti bambini SBB e la Junior Travelcard.', 'Per esplorare la città con calma, valutate il noleggio di una bici quando meteo e traffico lo rendono sensato.'],
        gallery: [
          { src: '/images/places/sbb-train.jpg', alt: 'Treno SBB nella campagna svizzera' },
          { src: '/images/places/zurich-tram.jpg', alt: 'Tram di Zurigo sulla Bahnhofstrasse' },
          { src: '/images/places/hotel-sonne-lake-arrival.jpg', alt: 'Battello sul Lago di Zurigo vicino a Küsnacht' },
          { src: '/images/places/santis-cablecar.jpg', alt: 'Funivia del Säntis nell’Alpstein' },
        ],
      },
      {
        title: 'Come scegliere i biglietti',
        body: 'Non esiste un biglietto migliore per tutti. Queste note sono un punto di partenza pratico.',
        items: ['Per muoversi a Zurigo in tram, treno o autobus: usate un biglietto ZVV per la città, un biglietto 24 ore o la Zürich Card se volete includere anche musei, trasferimento dall’aeroporto, Uetliberg e brevi tratte in battello.', 'Per arrivare nella zona del ricevimento, cercate Küsnacht ZH in SBB Mobile o ZVV e acquistate un biglietto dal punto di partenza a Küsnacht ZH o alla fermata più vicina all’Hotel Sonne; l’app sceglierà le zone necessarie.', 'Per andare a Richterswil: acquistate un biglietto ZVV/SBB per Richterswil, oppure considerate un giornaliero/all-zone se fate diversi spostamenti nella rete di Zurigo nello stesso giorno.', 'Per gite più lunghe, come Lucerna, Berna, Basilea o zone di montagna: controllate SBB in anticipo per Supersaver tickets o Saver Day Passes, ma evitate biglietti poco flessibili se il piano dipende da arrivi aerei o meteo.'],
        imageAlt: 'Biglietteria automatica ZVV alla fermata del tram dell’aeroporto di Zurigo',
      },
      {
        title: 'Costi e spese pratiche',
        body:
          'La Svizzera usa il franco svizzero e i prezzi possono essere alti. Supermercati e mezzi pubblici aiutano a ridurre le spese quotidiane.',
        items: ['Migros e Coop sono le principali catene di supermercati e sono utili per colazioni, snack, picnic e necessità per bambini.', 'I taxi sono di solito costosi. Usateli solo quando bagagli, bambini o esigenze di accessibilità li rendono davvero utili.', 'Usate i mezzi pubblici per muovervi a Zurigo; viaggiare in auto non è consigliato per la mancanza di parcheggi e la scarsa praticità.', 'Opzioni economiche includono passeggiate sul lago, centro storico, punti panoramici, parchi, picnic con prodotti del supermercato e alloggi vicino a tram, treno o autobus.'],
        image: '/images/places/zurich-lindenhof-view.jpg',
        imageAlt: 'Centro storico di Zurigo e la Limmat dal Lindenhof',
        exchangeRates: true,
      },
      {
        title: 'Meteo, bagagli e consigli pratici',
        body:
          'Giugno è di solito piacevole, ma il meteo svizzero può cambiare rapidamente. Portate abiti adatti sia al sole sia alla pioggia, soprattutto per lago e montagna.',
        items: [
          'Portate occhiali da sole, strati leggeri, una giacca antipioggia e scarpe comode per camminare su ciottoli o lungolago.',
          'Per il giorno del matrimonio, scegliete scarpe formali con cui possiate davvero camminare e uno strato leggero per la barca o la serata sul lago.',
          [
            'La Svizzera usa prese di ',
            { text: 'tipo J', href: 'https://en.wikipedia.org/wiki/SN_441011' },
            '. Le spine europee sottili di tipo C di solito entrano, ma spine Schuko/Tipo F più grandi, UK e USA richiedono un adattatore.',
          ],
          'La maggior parte dei caricabatterie moderni per telefoni e computer supporta 230V, ma controllate l’etichetta di asciugacapelli e altri dispositivi più potenti.',
        ],
        imageAlt: 'Giornata di pioggia da Schwarzenbach nel centro storico di Zurigo',
      },
      {
        title: 'Consigli personali',
        body:
          'Gli ospiti possono contattare Manfredi e la famiglia per consigli pratici, soprattutto su escursioni, programmi con bambini, viaggi più lunghi o itinerari con un livello di cammino specifico.',
        imageAlt: 'Gabriela, Manfredi e famiglia nella campagna svizzera',
      },
    ],
  },
  faq: {
    title: 'Dettagli e FAQ',
    kicker: 'Risposte utili',
    intro: 'Risposte pratiche per gli ospiti invitati. Aggiungeremo orari e trasporti quando saranno confermati.',
  },
  rsvp: {
    title: 'RSVP',
    kicker: 'Conferma di presenza',
    intro:
      'Usate il modulo qui sotto per farci sapere se potrete festeggiare con noi a Zurigo.',
    notice: undefined,
    sections: [],
  },
  gifts: {
    title: 'Regali',
    kicker: 'Con gratitudine',
    intro:
      'Se viaggiate fino in Svizzera per il matrimonio, non sentitevi obbligati a portare o inviare un regalo.',
    sections: [
      {
        title: 'Dettagli più avanti',
        body: 'Se decideremo di condividere una lista nozze o un fondo viaggio, li aggiungeremo qui prima dell’invio degli inviti.',
      },
    ],
  },
  contact: {
    title: 'Contatti',
    kicker: 'Domande',
    intro:
      'Per domande sul sito, sul viaggio, sull’alloggio o sulla RSVP, potete scriverci a gabyandmanfredi@gmail.com.',
    sections: [
      {
        title: 'Domande sul matrimonio',
        body: 'Per ora, scriveteci a gabyandmanfredi@gmail.com per le domande sul matrimonio.',
        items: ['Domande generali: gabyandmanfredi@gmail.com', 'Supporto RSVP: gabyandmanfredi@gmail.com', 'Contatto urgente durante la settimana del matrimonio: TBD'],
      },
    ],
  },
  credits: {
    title: 'Crediti immagini',
    kicker: 'Crediti',
    intro: 'Immagini di luoghi, sedi e Zurigo usate nel prototipo di questo sito privato.',
    sections: [
      {
        title: 'Centro storico di Zurigo',
        body: 'Foto di Tiia Monto tramite Wikimedia Commons, licenza CC BY-SA 3.0.',
      },
      {
        title: 'Stadthaus Zürich',
        body: 'Foto di Tiia Monto tramite Wikimedia Commons, licenza CC BY-SA 3.0.',
      },
      {
        title: 'Kirche St. Peter',
        body: 'Foto di Photones tramite Wikimedia Commons, licenza CC BY-SA 3.0.',
      },
      {
        title: 'Kunsthaus Zürich',
        body: 'Foto di Adrian Michael tramite Wikimedia Commons, licenza CC BY-SA 4.0; ritagliata per la visualizzazione.',
      },
      {
        title: 'Immagini di viaggio e trasporti pubblici',
        body: 'Le foto delle città di partenza e dei trasporti pubblici provengono da Wikimedia Commons e Unsplash. I dettagli delle fonti sono registrati anche in doc/assets/image_sources.md.',
      },
      {
        title: 'Hotel Sonne Küsnacht',
        body: 'Il prototipo include immagini dal sito ufficiale dell’Hotel Sonne per revisione privata del sito del matrimonio e una foto dal lago tramite Wikimedia Commons. Prima della pubblicazione sarà opportuno confermare i permessi per le immagini ufficiali della sede.',
      },
    ],
  },
});

applyLocalizedCopy('de', {
  schedule: {
    title: 'Unser Hochzeitstag',
    kicker: 'Ablauf',
    intro:
      'Diese Seite dient als Überblick für die Trauung, den Bootstransfer, das Abendessen, die Feier und die Rückfahrt.',
    notice: undefined,
    sections: [
      {
        title: 'Zivile Trauung',
        body: 'Die zivile Trauung im Stadthaus Zürich findet vor der Hochzeitsfeier im privaten Rahmen statt. Da die Besucherzahl begrenzt ist, können nur die engsten Familienmitglieder teilnehmen.',
        items: ['Datum: Donnerstag, 10. Juni 2027', 'Zeit: 11.30 Uhr', 'Ort: Stadthaus Zürich'],
        imageAlt: 'Fassade des Stadthauses Zürich unter blauem Himmel',
      },
      {
        title: 'Trauung',
        body: 'Die Trauung findet in der Kirche St. Peter in der Zürcher Altstadt statt. Bitte kommt mit genügend Zeit, damit ihr in Ruhe Platz nehmen könnt; wir möchten, dass alle Gäste bis 13.40 Uhr sitzen.',
        items: ['Datum: Freitag, 11. Juni 2027', 'Ankunft der Gäste: 13.30 Uhr', 'Trauung: 14.00 Uhr', 'Gäste sitzen bis: 13.40 Uhr', 'Sprachen der Trauung: TBD'],
        imageAlt: 'Kirche St. Peter in Zürich',
      },
      {
        title: 'Bootstransfer',
        body: 'Nach der Trauung gehen die Gäste gemeinsam mit Familienmitgliedern etwa 12 Minuten zum Quai 6 am Bürkliplatz, Zürich.',
        items: ['Datum: Freitag, 11. Juni 2027', 'Einsteigen: 15 Minuten vor der Abfahrt', 'Abfahrt: gegen 16.30 Uhr (noch zu bestätigen)', 'Einstiegspunkt: Quai 6, Bürkliplatz, Zürich', 'Tickets: für Gäste organisiert', 'Bitte bringt bequeme formelle Schuhe für den Fussweg und die Bootsfahrt mit, sowie einen Regenschirm bei Regen.', 'Regenplan und Barrierefreiheitsdetails: TBD'],
        imageAlt: 'Ein Boot auf dem Zürichsee nahe beim Hotel Sonne',
      },
      {
        title: 'Empfang und Feier',
        body: 'Die Abendfeier findet im Hotel Sonne in Küsnacht direkt am Zürichsee statt.',
        items: ['Datum: Freitag, 11. Juni 2027', 'Apéro, Abendessen und Feier: 17.00 Uhr', 'Abendessen: TBD', 'Tanz und Feier: TBD', 'Rückfahrt: Samstag, 12. Juni 2027 um 00.00 Uhr'],
        imageAlt: 'Hotel Sonne Küsnacht vom Zürichsee aus gesehen',
      },
    ],
  },
  travel: {
    title: 'Anreise',
    kicker: 'Anreise nach Zürich',
    intro:
      'Der Flughafen Zürich ist der wichtigste Ankunftsort. Die folgenden Vorschläge beruhen auf derzeit veröffentlichten Verbindungen.',
    notice:
      'Bitte prüft die offiziellen Einreisebestimmungen für eure Staatsangehörigkeit vor der Buchung und nochmals vor der Reise. Die Schweiz gehört zum Schengen-Raum.',
    sections: [
      {
        title: 'Aus Chicago',
        body:
          "Direktflüge von Chicago O'Hare (ORD) nach Zürich (ZRH) sind derzeit verfügbar.",
        items: ['Prüft zuerst Direktflüge, insbesondere SWISS und von United durchgeführte Verbindungen.', 'Wenn Direktflüge teuer sind, vergleicht Verbindungen mit einem Umstieg über europäische Drehkreuze wie Frankfurt, München, Amsterdam, Paris oder London.', 'Vergleicht auch Tarife mit Umstieg in New York; Chicago-Zürich-Verbindungen über New York können manchmal günstiger sein als Direktflüge.', 'Kommt spätestens am Donnerstag, 10. Juni 2027 an; Mittwoch, 9. Juni 2027 ist wegen Jetlag und möglicher Gepäckverspätungen besser.', 'Wir empfehlen, ab Flughafen Zürich öffentliche Züge zu nutzen.'],
        imageAlt: 'Skyline von Chicago vom Lake Michigan',
      },
      {
        title: 'Aus New York',
        body:
          'Direktflüge von JFK und Newark (EWR) nach Zürich (ZRH) sind derzeit verfügbar.',
        items: ['Direktflüge sind am praktischsten, wenn der Preis vernünftig ist; Umsteigeverbindungen können hilfreich sein, wenn ihr nicht direkt aus New York City reist.', 'Kommt spätestens am Donnerstag, 10. Juni 2027 an; Mittwoch, 9. Juni 2027 ist wegen Jetlag und möglicher Gepäckverspätungen besser.', 'Wir empfehlen, ab Flughafen Zürich öffentliche Züge zu nutzen.'],
        imageAlt: 'Skyline von New York City',
      },
      {
        title: 'Aus dem Vereinigten Königreich',
        body:
          'Von London sind Direktflüge meistens die einfachste Option.',
        items: ['Vergleicht London Heathrow, Gatwick, City, Luton und Stansted je nach Wohnort.', 'Ausserhalb Londons lohnt sich auch der Vergleich von Manchester, Bristol und anderen Flughäfen mit passenden Verbindungen.', 'EasyJet kann preislich attraktiv sein, aber prüft die Gepäckregeln sorgfältig, bevor ihr Preise vergleicht.', 'Basel kann einen Vergleich wert sein, wenn die Flugpreise deutlich besser sind, ist aber weniger bequem: Um nach Zürich zu kommen, nehmt Bus 50 vom EuroAirport nach Basel SBB und dann einen Zug nach Zürich HB. Rechnet insgesamt mit ungefähr zwei Stunden oder mehr und zusätzlichen Schweizer Transportkosten.', 'Die Bahnroute kann eine bequeme und nachhaltige Möglichkeit sein, die Schweiz innerhalb eines Tages zu erreichen: Eurostar von London St Pancras nach Paris, dann von Gare du Nord nach Gare de Lyon (plant genug Zeit für den Wechsel ein) und mit TGV Lyria nach Zürich HB.'],
        imageAlt: 'Tower Bridge über der Themse in London',
      },
      {
        title: 'Aus Sardinien',
        body:
          'Für Gäste aus Sardinien sind Cagliari und Olbia wahrscheinlich die sinnvollsten Flughäfen für den ersten Vergleich.',
        items: ['Für Flüge prüft zuerst Cagliari (CAG) und Olbia (OLB) nach Zürich (ZRH).', 'EasyJet kann für Olbia-Zürich günstig sein, wenn die Verbindung verfügbar ist. Prüft die Gepäckbestimmungen sorgfältig.', 'Wenn es keinen passenden Direktflug gibt, vergleicht Cagliari oder Olbia via Mailand, Rom oder ein anderes europäisches Drehkreuz.', 'Mit dem Auto: nehmt eine Nachtfähre von Sardinien nach Genua und fahrt dann von Genua nach Zürich. Die Fähre dauert je nach Strecke und Anbieter meist etwa 10-13 Stunden; Genua-Zürich dauert vor Pausen, Grenze und Gotthard- oder San-Bernardino-Verkehr ungefähr fünf Stunden.', 'Wenn ihr mit dem Auto in die Schweiz fahrt, kauft die Autobahnvignette über das offizielle Schweizer Portal und prüft vor der Abfahrt in Genua den Verkehr an den Alpentunnels. Parken in Zürich kann schwierig und teuer sein.'],
        imageAlt: 'Die Kueste bei Santa Maria Navarrese in Ogliastra, Sardinien',
      },
      {
        title: 'Ab Flughafen Zürich',
        body:
          'Der Flughafen Zürich ist mit Zug und S-Bahn gut an Zürich HB, Küsnacht ZH, Richterswil und die Hochzeitsorte angebunden. Grundsätzlich empfehlen wir den öffentlichen Verkehr, da Autofahren teuer sein kann und Parkplätze oft schwierig zu finden sind.',
        items: [
          [
            'Ladet ',
            { text: 'die SBB Mobile App', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
            ' vor der Reise herunter und sucht nach Küsnacht ZH, nicht nur nach Küsnacht.',
          ],
          'Die direkte S16 von Zürich Flughafen nach Küsnacht ZH ist meist die einfachste Verbindung ab Flughafen. Die Abfahrten sind derzeit um Minute 01 und 31, oft ab Gleis 3, mit rund 26 Minuten Fahrzeit; prüft genaue Zeit und Gleis am Reisetag in SBB Mobile.',
          'SBB-Züge nach Zürich HB fahren in der Regel etwa alle 10 Minuten; die Fahrt dauert ungefähr 15 Minuten.',
          'Kauft das Ticket vor dem Einsteigen über die App oder am Ticketautomaten.',
        ],
        imageAlt: 'Züge im Bahnhof Zürich Flughafen',
      },
      {
        title: 'Mit dem Zug nach Küsnacht ZH',
        body:
          'Küsnacht ZH liegt an der S-Bahn-Linie am rechten Zürichseeufer.',
        items: ['Ab Zürich HB: nehmt S6 oder S16 entlang des rechten Zürichseeufers und steigt in Küsnacht ZH aus. Die Fahrt dauert meistens etwa 12 Minuten. Gleise können wechseln; prüft daher SBB Mobile und die Bahnhofsanzeigen vor dem Einsteigen.', 'Ab Flughafen Zürich: die einfachste direkte Verbindung ist meist die S16 nach Herrliberg-Feldmeilen oder Meilen bis Küsnacht ZH. Aktuelle Abfahrtszeiten sind Minute 01 und 31, mit 26 Minuten Fahrzeit; Zeiten und Gleise bitte vor dem Einsteigen in SBB Mobile prüfen.', 'Ab Richterswil: fahrt mit dem Zug zum Zürich HB und steigt dort in S6 oder S16 nach Küsnacht ZH um. Eine Fahrt mit Boot oder Fähre kann möglich sein, die Zeiten sollten aber bestätigt werden.', 'Kauft die ganze Verbindung vor dem Einsteigen in SBB Mobile oder in der ZVV-App; gebt Küsnacht ZH ein, damit die App das richtige Ziel und die nötigen Zonen wählt.'],
        image: '/images/places/kuesnacht-lake-view.jpg',
        imageAlt: 'Küsnacht vom Zürichsee aus gesehen',
      },
      {
        title: 'Hochzeitskarte Zürich',
        body:
          'Nützliche Orte für das Hochzeitswochenende:',
        items: ['Die Kirche St. Peter liegt in der Zürcher Altstadt, nahe beim See und bei zentralen Tramverbindungen.', 'Hotel Sonne liegt in Küsnacht ZH am rechten Zürichseeufer.', 'Richterswil, wo Manfredis Eltern wohnen, liegt weiter südlich am See und ist mit dem Zug erreichbar.', 'Flughafen Zürich und Zürich HB sind mit häufigen Zügen verbunden; nutzt SBB Mobile oder ZVV für die genaue Verbindung am Reisetag.'],
        imageAlt: 'Auf OpenStreetMap basierende Karte von Zürich, Küsnacht, Richterswil, Flughafen Zürich, Kirche St. Peter und Hotel Sonne',
      },
      {
        title: 'Offizielle Links',
        body: 'Nutzt offizielle Quellen für Pass, Visum, ETIAS und Verkehr.',
      },
    ],
  },
  stay: {
    title: 'Unterkunft',
    kicker: 'Übernachten',
    intro:
      'Küsnacht liegt am nächsten zur Abendfeier. Zürich Zentrum kann passen, wenn ihr mehr Verkehrs- und Restaurantoptionen möchtet.',
    sections: [
      {
        title: 'Am nächsten zur Feier: Küsnacht',
        body:
          'Wählt Küsnacht, wenn ihr nach Abendessen und Feier im Hotel Sonne den kürzesten Rückweg möchtet.',
        items: ['Hotel Sonne Küsnacht: Bei direkter Buchung über die Reception können Gäste ungefähr 10% Rabatt auf Zimmer erhalten. Bitte gebt bei der Buchung an, dass ihr Gäste der Dago-Carta-Hochzeit seid.', 'OXEN Küsnacht: nahe Option mit wenigen Zimmern; einige Zimmer haben Gemeinschaftsbäder.', 'Aktuell fahren späte Züge ungefähr stündlich zurück Richtung Zürich HB; prüft die genaue Verbindung am Abend selbst in SBB Mobile.'],
        links: [
          { label: 'Hotel Sonne Küsnacht', href: 'https://sonne.ch/en/' },
          { label: 'Zimmer OXEN Küsnacht', href: 'https://www.oxen.ch/zimmer' },
        ],
        imageAlt: 'Hotel Sonne in Küsnacht',
      },
      {
        title: 'Zürich Zentrum',
        body:
          'Zürich Zentrum ist praktisch für Restaurants, Besichtigungen, Zugverbindungen und einfache Anreise zum Flughafen.',
        items: ['Sucht nahe Zürich HB, Altstadt, Bellevue oder Stadelhofen für die bequemste zentrale Lage.', 'Auch andere Orte entlang der S6 oder S16 sowie Lagen nahe Zürich Stadelhofen oder Zürich Tiefenbrunnen können praktisch sein, weil die Fahrt nach Küsnacht einfach bleibt.', 'Günstigere Hotels finden sich eventuell eher in Zürich Altstetten oder Oerlikon; beide Quartiere sind mit dem Zentrum und dem Flughafen durch öffentlichen Verkehr verbunden.', 'Wählt eine Unterkunft nahe bei Tram, Zug oder Bus.', 'Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist wegen fehlender Parkplätze und geringer Bequemlichkeit nicht empfohlen.'],
        imageAlt: 'Zürcher Altstadt und Limmat',
      },
      {
        title: 'Richterswil',
        body:
          'Richterswil liegt weiter südlich am Zürichsee. Es kann passen, wenn ihr nahe bei Manfredis Familie wohnen oder ein kleineres B&B bevorzugen möchtet.',
        items: ['Ab Zürich HB ist die S2 meist der beste direkte Zug nach Richterswil; die S8 ist eine langsamere direkte Alternative. Prüft die genaue Verbindung vor der Fahrt in SBB Mobile.', 'B & B Caffètino-Vino Richterswil hat fünf Zimmer im historischen Dorfkern, nahe beim See und Bahnhof.', 'Es ist ein B&B und kein Hotel; das Haus hat keinen Lift, und die Zimmer liegen im 2. und 3. Obergeschoss.', 'Prüft vor der Buchung die späte Rückfahrt ab Küsnacht, besonders nach der Feier.'],
        imageAlt: 'Richterswil vom Zürichsee aus gesehen',
      },
      {
        title: 'Buchungshinweise',
        body:
          'Zürich kann im Juni teuer sein. Wir empfehlen früh zu buchen, Stornierungsbedingungen zu prüfen und bei längeren Aufenthalten Hotels mit Apartments zu vergleichen.',
        items: ['Hotel-Sonne-Rabatt: direkte Buchung über die Reception mit Hinweis auf die Dago-Carta-Hochzeit.', 'Buchungscodes für andere Hotels: TBD', 'Fristen für Zimmerkontingente: TBD', 'Ungefähre Preisbereiche: TBD'],
        imageAlt: 'Zürichseeufer nahe Küsnacht',
        links: [
          { label: 'Airbnb Zürich, Juni 2027', href: 'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2' },
        ],
      },
      {
        title: 'Barrierefreiheit und Mobilität',
        body:
          'Bitte teilt uns in der RSVP oder per E-Mail mit, wenn Stufen, Gehstrecken, Hörunterstützung oder Transportfragen eure Planung beeinflussen. Wir klären die Details mit den jeweiligen Orten, sobald die Hochzeitslogistik final ist.',
        items: ['Kirche St. Peter: Laut offizieller FAQ der Kirche ist das Erdgeschoss rollstuhlgängig. Es gibt einen ausgeschilderten Lift von der St. Peterhofstatt zur Kirche; Empore und Chorbereich sind nicht rollstuhlgängig. Eine Hörschlaufe ist ebenfalls aufgeführt.', 'Bootstransfer: ZSG/ZVV geben an, dass Zürichsee-Schiffe Rollstühle bis 80 cm Breite in der 2. Klasse mitnehmen können, mit Unterstützung der Crew an den Anlegestellen. Das genaue Hochzeitsboot und der Einstiegspunkt müssen noch bestätigt werden.', 'Hotel Sonne: Die Barrierefreiheit hängt von der Zimmerkategorie ab. Einige Zimmerseiten sagen, dass nicht alle Zimmer mit dem Lift erreichbar sind; einzelne Zimmer werden als liftzugänglich beschrieben. Kontaktiert das Hotel vor der Buchung, wenn Liftzugang wichtig ist.', 'OXEN: Die veröffentlichten Zimmerinformationen nennen Zimmer im obersten Stock mit Gemeinschaftsbädern. Kontaktiert OXEN direkt vor der Buchung, wenn Treppen oder Badzugang ein Thema sind.', 'B & B Caffètino-Vino Richterswil: Das B&B schreibt, dass das alte Haus keinen Lift hat und die Zimmer im 2. und 3. Stock liegen.', 'Für Hotels in Zürich oder Airbnb-Wohnungen: Nutzt Barrierefreiheitsfilter, bestätigt aber stufenfreien Zugang, Badezimmerzugang, Liftgrösse und Entfernung zum öffentlichen Verkehr direkt mit der Unterkunft.'],
        links: [
          { label: 'Barrierefreiheit St. Peter', href: 'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/' },
          { label: 'Barrierefreie Schiffe ZVV', href: 'https://www.zvv.ch/en/service/travel-without-barriers/limited-mobility/ships.html' },
          { label: 'Zimmer Hotel Sonne', href: 'https://sonne.ch/en/Rooms-Suites' },
          { label: 'Zimmer OXEN', href: 'https://www.oxen.ch/zimmer' },
          { label: 'B & B Caffètino-Vino', href: 'https://www.bnb-caffetino-vino.ch/' },
          { label: 'Airbnb-Barrierefreiheitsfilter', href: 'https://www.airbnb.com/help/article/3740' },
        ],
        imageAlt: 'Kirche St. Peter in Zürich',
      },
    ],
  },
  'things-to-do': {
    title: 'Aktivitäten',
    kicker: 'Zürich und Schweiz',
    intro:
      'Nutzt diese Seite, wenn ihr rund um die Hochzeit freie Zeit habt oder euren Aufenthalt verlängern möchtet. Sie enthält knappe Zürich-Ideen, Optionen bei Regen und Tagesausflüge ohne Hotelwechsel.',
    sections: [
      {
        title: 'Zürich besichtigen',
        body: 'Wenn ihr euren Aufenthalt verlängert, sind dies einfache Möglichkeiten, Zürich kennenzulernen, ohne das Hochzeitswochenende zu überladen.',
        items: ['Spaziert durch die Altstadt, zum Lindenhof und entlang der Limmat, mit Grossmünster und Fraumünster, wo Marc Chagall die berühmten Glasfenster gestaltet hat.', 'Besucht das Grossmünster wegen seiner Bedeutung für die schweizerisch-deutsche Reformation oder das Kunsthaus Zürich für eine breite Kunstsammlung.', 'Macht eine kurze Limmat- oder Zürichsee-Bootsfahrt, um die Stadt vom Wasser aus zu sehen.', 'Besucht die Giacometti-Halle wegen der bemalten Eingangshalle oder den Zoo Zürich, wenn ihr mit Kindern reist.', 'Fahrt mit dem Zug auf den Uetliberg für Stadt- und Seeblick und geht bei Lust ein Stück des Planetenwegs. Prüft die aktuelle Verbindung vorher in SBB Mobile.'],
        links: [
          { label: 'Fraumünster', href: 'https://www.zuerich.com/en/visit/attractions/fraumunster' },
          { label: 'Grossmünster', href: 'https://www.zuerich.com/en/visit/attractions/grossmunster' },
          { label: 'Kunsthaus Zürich', href: 'https://www.kunsthaus.ch/en/' },
          { label: 'Giacometti-Halle', href: 'https://www.zuerich.com/en/visit/attractions/giacometti-halle' },
          { label: 'Uetliberg', href: 'https://www.ueetliberg.ch/en/uetliberg' },
          { label: 'Zoo Zürich', href: 'https://www.zoo.ch/en' },
          { label: 'Offizielle Besucherinformationen Zürich', href: 'https://www.zuerich.com/en' },
        ],
        imageAlt: 'Zürich und der Zürichsee von oben',
      },
      {
        title: 'Museen und Schokolade',
        body: 'Bei Regen: Kunsthaus Zürich, Museum Rietberg oder Lindt Home of Chocolate in Kilchberg.',
        items: ['Das Kunsthaus Zürich zeigt Kunst vom Mittelalter bis zur Gegenwart, mit Schweizer Malerei, Impressionismus, Klassischer Moderne, Dada, Giacometti und Munch als Schwerpunkten.', 'Das Museum Rietberg widmet sich Kunst und Kulturen aus Asien, Afrika, Amerika und Ozeanien.', 'Lindt Home of Chocolate in Kilchberg ist interaktiv und besonders auch mit Kindern geeignet; nehmt die S8 Richtung Kilchberg und prüft die genaue Verbindung in SBB Mobile.'],
        imageAlt: 'Pipilotti-Rist-Skulptur und Chipperfield-Bau des Kunsthaus Zürich am Heimplatz',
      },
      {
        title: 'See und Wasser',
        body: 'Warme Tage eignen sich gut für Zeit am Wasser. Nutzt offizielle Badeanlagen und nehmt die Strömung der Limmat ernst.',
        items: ['Zum Flussschwimmen ist Oberer Letten eine bekannte Limmat-Badi für sichere Schwimmerinnen und Schwimmer.', 'Für den See kommen offizielle Badis wie Tiefenbrunnen, Mythenquai, Utoquai und Enge infrage.', 'Prüft Öffnungszeiten, Regeln und Wasserbedingungen auf den offiziellen Seiten der Stadt.', 'Eine Zürichsee-Bootsfahrt ist eine ruhige Möglichkeit, Stadt und Ufer zu sehen.'],
        imageAlt: 'Ein Boot auf dem Zürichsee nahe beim Hotel Sonne',
      },
      {
        title: 'Tagesausflüge',
        body: 'Diese Ziele sind praktische Tagesausflüge ab Zürich, wenn ihr eine längere Unternehmung machen möchtet, ohne das Hotel zu wechseln.',
        items: ['Luzern, idealerweise mit einer Bootsfahrt auf dem Vierwaldstättersee.', 'Rapperswil, per Zug oder längerer Seefahrt erreichbar, mit Schloss, Rosengarten, Altstadt, Holzbrücke und Kinderzoo.', 'Rheinfall bei Schaffhausen, der wasserreichste Wasserfall Europas.', 'Einsiedeln mit der Klosterkirche und ihrem reich ausgestatteten barocken Innenraum sowie Spaziermöglichkeiten in der Umgebung.', 'Alpstein für Wanderungen wie Seealpsee, Hoher Kasten und Säntis, mit Routen verschiedener Schwierigkeitsgrade.', 'Bern für die Altstadt oder Basel für Kunstmuseen wie Fondation Beyeler und Kunstmuseum Basel.'],
        imageAlt: 'Ein Bergsee in der Schweiz',
      },
      {
        title: 'Weiter entfernt',
        body: 'Wenn die Schweiz Teil einer längeren Reise ist, eignen sich diese Ziele besser mit zusätzlichen Übernachtungen als rund um den Hochzeitstag.',
        items: ['Schweizerischer Nationalpark in Graubünden.', 'Lauterbrunnen und Jungfraujoch für klassische Hochalpenlandschaft.', 'Wanderideen: Pizol 5-Seen-Wanderung, Aussichtspunkte am Aletschgletscher, Berner Oberland, Graubünden und Wallis.'],
        imageAlt: 'Gabriela und Manfredi in den Schweizer Alpen',
      },
      {
        title: 'Lokale Hinweise',
        body: 'Gäste können Manfredi und seine Familie gerne um persönliche Empfehlungen bitten, besonders für längere Schweizreisen, Familienpläne oder Routen mit einem bestimmten Wanderniveau.',
        imageAlt: 'Zürcher Altstadt und Limmat vom Lindenhof',
      },
    ],
  },
  'switzerland-guide': {
    title: 'Hinweise zur Schweiz',
    kicker: 'Praktische Hinweise',
    intro:
      'Grundlegende Hinweise für die Schweiz: Verkehr, Geld, Wetter, Mobiltelefone und Planung.',
    sections: [
      {
        title: 'Öffentlicher Verkehr',
        body:
          'In Zürich bewegt ihr euch gut mit Tram, Zug, Bus und Schiff. Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist wegen fehlender Parkplätze und geringer Bequemlichkeit nicht empfohlen.',
        items: ['Ladet SBB Mobile vor der Reise herunter und nutzt die App für Fahrpläne in der ganzen Schweiz, aktuelle Gleisangaben und Tickets; nutzt ZVV für Zonen und lokale Tickets im Raum Zürich.', 'ZVV-Tickets sind zonenbasiert; Zürich Stadt ist Zone 110, Küsnacht ZH Zone 140 und Richterswil Zone 153.', 'Für Zürich Zentrum ist meistens ein ZVV-Einzelticket oder ein 24h-Ticket am einfachsten. Für Küsnacht ZH oder Richterswil gebt das Ziel in SBB Mobile oder der ZVV-App ein und kauft die angezeigten Zonen.', 'Für Tagesausflüge ausserhalb Zürichs vergleicht ein normales Punkt-zu-Punkt-Ticket, ein Supersaver Ticket und einen Saver Day Pass. Supersaver Tickets können günstiger sein, wenn sie früh gekauft werden, sind aber an einen bestimmten Zug gebunden und weniger flexibel.', 'Wer mehrere längere Reisen in der Schweiz, Seefahrten oder Bergausflüge plant, sollte die Swiss Half Fare Card für Besucherinnen und Besucher vergleichen: 2026 kostet sie CHF 150 für einen Monat und gibt bis zu 50% Rabatt auf viele Zug-, Bus-, Schiff-, Stadtverkehrs- und die meisten Bergbahnfahrten. Sie lohnt sich nur, wenn die erwartete Ersparnis höher ist als der Kaufpreis.', 'Kinder unter 6 Jahren fahren im Zürcher Verkehrsverbund kostenlos. Kinder von 6 bis 15 Jahren zahlen den reduzierten Tarif; für längere Reisen in der Schweiz prüft SBB-Kindertickets und Junior Travelcard-Optionen.', 'Für entspanntes Erkunden der Stadt könnt ihr ein Velo mieten, wenn Wetter und Verkehrssituation für euch passen.'],
        gallery: [
          { src: '/images/places/sbb-train.jpg', alt: 'SBB-Zug in der Schweizer Landschaft' },
          { src: '/images/places/zurich-tram.jpg', alt: 'Zürcher Tram auf der Bahnhofstrasse' },
          { src: '/images/places/hotel-sonne-lake-arrival.jpg', alt: 'Zürichsee-Schiff nahe Küsnacht' },
          { src: '/images/places/santis-cablecar.jpg', alt: 'Säntis-Seilbahn im Alpstein' },
        ],
      },
      {
        title: 'Tickets wählen',
        body: 'Es gibt nicht ein einziges bestes Ticket für alle Gäste. Diese Hinweise sind als praktische Ausgangspunkte gedacht.',
        items: ['Für Wege in Zürich mit Tram, Zug oder Bus: nutzt ein ZVV-Stadtticket, 24h-Ticket oder die Zürich Card, wenn ihr auch Museen, Flughafentransfer, Uetliberg und kurze Schiffsfahrten einschliessen möchtet.', 'Für die Fahrt in den Empfangsbereich sucht in SBB Mobile oder ZVV nach Küsnacht ZH und kauft ein Ticket von eurer Start-Haltestelle nach Küsnacht ZH oder zur nächsten Haltestelle des Hotel Sonne; die App wählt die nötigen Zonen.', 'Für Richterswil: kauft ein ZVV/SBB-Ticket nach Richterswil oder erwägt ein All-Zones/Tagesticket, wenn ihr an diesem Tag mehrere Fahrten im Zürcher Verkehrsverbund macht.', 'Für grössere Tagesausflüge wie Luzern, Bern, Basel oder Bergregionen: prüft früh SBB für Supersaver Tickets oder Saver Day Passes, aber vermeidet unflexible Tickets, wenn eure Pläne von Flugankunft oder Wetter abhängen.'],
        imageAlt: 'ZVV-Billettautomat an der Tramhaltestelle Zürich Flughafen',
      },
      {
        title: 'Geld und Budget',
        body:
          'Die Schweiz verwendet Schweizer Franken und Preise können hoch sein. Supermärkte und öffentlicher Verkehr helfen, Alltagskosten niedriger zu halten.',
        items: ['Migros und Coop sind die grössten Supermarktketten und nützlich für Frühstück, Snacks, Picknick und Kinderbedarf.', 'Taxis sind meist teuer. Nutzt sie nur, wenn Gepäck, Kinder oder Barrierefreiheitsbedarf sie wirklich sinnvoll machen.', 'Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist wegen fehlender Parkplätze und geringer Bequemlichkeit nicht empfohlen.', 'Günstige Optionen sind Spaziergänge am See, Altstadt, Aussichtspunkte, Parks, Picknicks aus dem Supermarkt und Unterkunft nahe Tram, Zug oder Bus.'],
        image: '/images/places/zurich-lindenhof-view.jpg',
        imageAlt: 'Zürcher Altstadt und Limmat vom Lindenhof',
        exchangeRates: true,
      },
      {
        title: 'Wetter, Packen und praktische Tipps',
        body:
          'Juni ist meistens angenehm, aber Schweizer Wetter kann schnell wechseln. Packt für Sonne und Regen, besonders bei See- oder Bergplänen.',
        items: [
          'Bringt Sonnenbrille, Schichten, eine leichte Regenjacke und bequeme Schuhe für Kopfsteinpflaster oder Seewege mit.',
          'Für den Hochzeitstag wählt formelle Schuhe, in denen ihr wirklich gehen könnt, plus eine leichte Schicht für Boot oder Abend am See.',
          [
            'Die Schweiz verwendet ',
            { text: 'Typ-J-Steckdosen', href: 'https://en.wikipedia.org/wiki/SN_441011' },
            '. Schlanke europäische Typ-C-Stecker passen meist, grössere Schuko/Typ-F-Stecker sowie UK- und US-Stecker brauchen einen Adapter.',
          ],
          'Die meisten modernen Handy- und Laptop-Ladegeräte funktionieren mit 230V, aber prüft das Etikett bei Haargeräten und anderen leistungsstärkeren Geräten.',
        ],
        imageAlt: 'Regentag bei Schwarzenbach in der Zürcher Altstadt',
      },
      {
        title: 'Persönliche Empfehlungen',
        body:
          'Gäste können Manfredi und die Familie für praktische Hinweise kontaktieren, besonders zu Wanderungen, familienfreundlichen Plänen, längeren Reisen oder Routen für ein bestimmtes Wanderniveau.',
        imageAlt: 'Gabriela, Manfredi und Familie in der Schweizer Landschaft',
      },
    ],
  },
  faq: {
    title: 'Details und FAQ',
    kicker: 'Hilfreiche Antworten',
    intro: 'Praktische Antworten für eingeladene Gäste. Bestätigte Zeiten und Transportdetails ergänzen wir, sobald sie feststehen.',
  },
  rsvp: {
    title: 'RSVP',
    kicker: 'Rückmeldung',
    intro:
      'Bitte nutzt das Formular unten, um uns mitzuteilen, ob ihr mit uns in Zürich feiern könnt.',
    notice: undefined,
    sections: [],
  },
  gifts: {
    title: 'Geschenke',
    kicker: 'Mit Dankbarkeit',
    intro:
      'Wenn ihr für die Hochzeit in die Schweiz reist, fühlt euch bitte nicht verpflichtet, ein Geschenk mitzubringen oder zu schicken.',
    sections: [
      {
        title: 'Details folgen',
        body: 'Falls wir eine Geschenkeliste oder einen Reisefonds teilen, ergänzen wir die Details hier, bevor die Einladungen verschickt werden.',
      },
    ],
  },
  contact: {
    title: 'Kontakt',
    kicker: 'Fragen',
    intro:
      'Bei Fragen zur Website, Anreise, Unterkunft oder RSVP schreibt uns bitte an gabyandmanfredi@gmail.com.',
    sections: [
      {
        title: 'Fragen zur Hochzeit',
        body: 'Schreibt Hochzeitsfragen vorerst bitte an gabyandmanfredi@gmail.com.',
        items: ['Allgemeine Fragen: gabyandmanfredi@gmail.com', 'RSVP-Unterstützung: gabyandmanfredi@gmail.com', 'Dringender Kontakt in der Hochzeitswoche: TBD'],
      },
    ],
  },
  credits: {
    title: 'Bildnachweise',
    kicker: 'Credits',
    intro: 'Bilder von Orten, Zürich und Veranstaltungsorten, die im Prototyp dieser privaten Hochzeitswebsite verwendet werden.',
    sections: [
      {
        title: 'Zürcher Altstadt',
        body: 'Foto von Tiia Monto via Wikimedia Commons, lizenziert unter CC BY-SA 3.0.',
      },
      {
        title: 'Stadthaus Zürich',
        body: 'Foto von Tiia Monto via Wikimedia Commons, lizenziert unter CC BY-SA 3.0.',
      },
      {
        title: 'Kirche St. Peter',
        body: 'Foto von Photones via Wikimedia Commons, lizenziert unter CC BY-SA 3.0.',
      },
      {
        title: 'Kunsthaus Zürich',
        body: 'Foto von Adrian Michael via Wikimedia Commons, lizenziert unter CC BY-SA 4.0; für die Darstellung zugeschnitten.',
      },
      {
        title: 'Reise- und ÖV-Bilder',
        body: 'Die Bilder zu Herkunftsorten und öffentlichem Verkehr stammen von Wikimedia Commons und Unsplash. Die Quellen sind zusätzlich in doc/assets/image_sources.md dokumentiert.',
      },
      {
        title: 'Hotel Sonne Küsnacht',
        body: 'Der Prototyp enthält offizielle Bilder der Hotel-Sonne-Website für die private Prüfung der Hochzeitswebsite sowie ein Wikimedia-Commons-Bild vom See aus. Die Erlaubnis für offizielle Veranstaltungsortbilder sollte vor einer Veröffentlichung bestätigt werden.',
      },
    ],
  },
});

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
      'switzerland-guide': ['Hinweise zur Schweiz', 'Praktische Hinweise', 'Öffentlicher Verkehr, Währung, Wetter, Telefon und nützliche Tipps.'],
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
      const sections = englishPage.sections.map((section) => ({
        ...section,
        items: section.items ? [...section.items] : undefined,
        links: section.links ? section.links.map((link) => ({ ...link })) : undefined,
        gallery: section.gallery ? section.gallery.map((image) => ({ ...image })) : undefined,
      }));
      return [
        key,
        {
          ...englishPage,
          title,
          kicker,
          intro,
          notice: englishPage.notice ? `${labels.suffix} ${englishPage.notice}` : labels.suffix,
          sections,
        },
      ];
    }),
  ) as Record<PageKey, PageContent>;
}

type LocalizedSectionCopy = Partial<Pick<Section, 'title' | 'body' | 'items' | 'links' | 'image' | 'imageAlt' | 'exchangeRates' | 'gallery'>>;

type LocalizedPageCopy = Partial<Omit<PageContent, 'sections'> & { sections: LocalizedSectionCopy[] }>;

function applyLocalizedCopy(lang: Exclude<Lang, 'en'>, copy: Partial<Record<PageKey, LocalizedPageCopy>>) {
  (Object.entries(copy) as [PageKey, LocalizedPageCopy][]).forEach(([key, pageCopy]) => {
    const page = pages[lang][key];
    pages[lang][key] = {
      ...page,
      ...pageCopy,
      sections: pageCopy.sections
        ? page.sections.map((section, index) => ({
            ...section,
            ...(pageCopy.sections?.[index] ?? {}),
          }))
        : page.sections,
    };
  });
}
