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
        body: 'Ceremony, boat transfer, dinner, dancing, and details as they are confirmed.',
        href: '/en/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter in Zurich',
      },
      {
        title: 'Travel',
        body: 'How to get to Zurich from the USA, the UK, Sardinia, and elsewhere.',
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
        body: 'Trauung, Bootstransfer, Abendessen, Feier und Details, sobald sie bestätigt sind.',
        href: '/de/schedule/',
        image: '/images/places/st-peter-zurich.jpg',
        imageAlt: 'Kirche St. Peter in Zürich',
      },
      {
        title: 'Anreise',
        body: 'Anreise nach Zürich aus den USA, dem Vereinigten Königreich, Sardinien und weiteren Orten.',
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
          image: '/images/places/hotel-sonne-lake-view.jpg',
          imageAlt: 'Hotel Sonne Küsnacht seen from Lake Zurich',
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
          items: ['Check nonstop flights first, especially SWISS and United-operated services.', 'If nonstop prices are high, compare one-stop routes through major European hubs such as Frankfurt, Munich, Amsterdam, Paris, or London.', 'Also compare fares with a layover in New York, as Chicago-Zurich itineraries via New York can sometimes be cheaper than nonstop options.', 'Arrive by Thursday, 10 June 2027 at the latest; Wednesday, 9 June 2027 is better for jet lag and delayed bags.', 'Use public transport from Zurich Airport unless a wider Swiss or Italian road trip makes a car necessary.'],
          links: [
            { label: 'SWISS Chicago-Zurich', href: 'https://www.swiss.com/lhg/us/en/o-d/cy-cy/chicago-zurich' },
            { label: 'Google Flights', href: 'https://www.google.com/travel/flights?q=Flights%20from%20Chicago%20to%20Zurich' },
            { label: 'Expedia', href: 'https://www.expedia.com/Flights' },
          ],
          image: '/images/places/chicago-skyline.jpg',
          imageAlt: 'Chicago skyline from Lake Michigan',
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
          image: '/images/places/new-york-skyline.jpg',
          imageAlt: 'New York City skyline',
        },
        {
          title: 'From the UK',
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
          image: '/images/places/london-skyline.jpg',
          imageAlt: 'Tower Bridge over the River Thames in London',
        },
        {
          title: 'From Sardinia',
          body: 'For guests travelling from Sardinia, Cagliari and Olbia are likely to be the most useful airports to compare first.',
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
          image: '/images/places/sardinia-ogliastra.jpg',
          imageAlt: 'The coast near Santa Maria Navarrese in Ogliastra, Sardinia',
        },
        {
          title: 'From Zurich Airport',
          body: 'Zurich Airport has a very convenient train and S-Bahn connection to Zurich HB, with onward public transport to Küsnacht and the wedding venues. For ordinary wedding logistics, use the train rather than driving or taking a taxi.',
          items: ['SBB trains usually leave for Zurich HB about every 10 minutes, and the journey takes about 15 minutes.', 'For Küsnacht or Hotel Sonne, use SBB Mobile or ZVV from the airport or from Zurich HB and buy the ticket shown by the app.', 'Taxis and ride-hailing can be useful with children, heavy luggage, or accessibility needs, but they are usually much more expensive than public transport.', 'A rental car is not recommended for Zurich-only wedding logistics.'],
          links: [
            { label: 'Zurich Airport public transport', href: 'https://www.flughafen-zuerich.ch/en/passengers/practical/parking-and-transport/train-tram-and-bus' },
            { label: 'SBB', href: 'https://www.sbb.ch/en' },
            { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
            { label: 'ZVV', href: 'https://www.zvv.ch/en' },
          ],
          image: '/images/places/zurich-airport-station.jpg',
          imageAlt: 'Trains at Zürich Flughafen railway station',
        },
        {
          title: 'By train to Küsnacht',
          body: 'Küsnacht ZH is on Zurich’s right-bank S-Bahn line. Use SBB Mobile or ZVV for the exact train, platform, and ticket zones on the day.',
          items: ['From Zurich HB: take an S6 or S16 towards the right bank of Lake Zurich and get off at Küsnacht ZH. From the station, Hotel Sonne is a short walk downhill towards the lake.', 'From Zurich Airport: the simplest direct train is usually the S16 towards Herrliberg-Feldmeilen or Meilen, getting off at Küsnacht ZH. If the timing is better, take any fast airport train to Zurich HB and change there to S6 or S16.', 'From Richterswil: travel by train to Zurich HB, then change to S6 or S16 towards Küsnacht ZH. This is usually clearer than trying to cross the lake late in the evening.', 'Buy the full journey in SBB Mobile or the ZVV app before boarding; the app will choose the required zones.'],
          links: [
            { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
            { label: 'ZVV S-Bahn lines', href: 'https://www.zvv.ch/de/fahrplan-und-informationen/fahrplanverfahren/bahn-und-schiff.html' },
          ],
        },
        {
          title: 'Zurich wedding map',
          body: 'This OpenStreetMap-based map is intended for orientation rather than exact route planning. It shows Zurich Airport, Zurich HB, the ceremony in the old town, the reception in Küsnacht, and Richterswil.',
          items: ['Kirche St. Peter is in Zurich old town, close to the lake and central tram connections.', 'Hotel Sonne is in Küsnacht on the right bank of Lake Zurich.', "Richterswil, where Manfredi's parents live, is further south on the lake and is reachable by train.", 'Zurich Airport and Zurich HB are connected by frequent trains; use SBB Mobile or ZVV for the exact journey on the day.'],
          links: [
            { label: 'OpenStreetMap: Zurich, Küsnacht, and Richterswil', href: 'https://www.openstreetmap.org/#map=11/47.3370/8.5950' },
          ],
          image: '/images/places/zurich-wedding-map.svg',
          imageAlt: 'OpenStreetMap-based map of Zurich, Küsnacht, Richterswil, Zurich Airport, Kirche St. Peter, and Hotel Sonne',
          imageFit: 'contain',
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
        'Küsnacht is most convenient for the party, while central Zurich is best for sightseeing and transport. Room-block information will be added once confirmed.',
      sections: [
        {
          title: 'Closest to the party: Küsnacht',
          body: 'Staying in Küsnacht keeps you near Hotel Sonne after dinner and dancing. This is likely the easiest choice for guests who value convenience at the end of the evening.',
          items: ['Hotel Sonne Küsnacht: likely priority for a room block.', 'OXEN Küsnacht: nearby option with a small number of rooms.', 'Late-night transport plan: TBD.'],
          links: [
            { label: 'Hotel Sonne Küsnacht', href: 'https://sonne.ch/en/' },
            { label: 'OXEN Küsnacht', href: 'https://www.oxen.ch/' },
          ],
          image: '/images/places/hotel-sonne-kuesnacht.jpg',
          imageAlt: 'Hotel Sonne in Küsnacht',
        },
        {
          title: 'Central Zurich',
          body: 'Zurich city centre is practical for guests who want restaurants, sightseeing, train connections, and easy airport access.',
          items: ['Look near Zurich HB, the Old Town, Bellevue, or Stadelhofen for the most convenient city-centre stay.', 'More economical hotels may be easier to find in Zurich Altstetten or Oerlikon; both are connected to the centre and airport by public transport.', 'Choose accommodation near a tram, train, or bus stop.', 'Use public transport for travelling around Zurich; driving by car is not recommended for ordinary wedding logistics.'],
          image: '/images/places/zurich-old-town.jpg',
          imageAlt: 'Zurich old town and the Limmat river',
        },
        {
          title: 'Richterswil option',
          body: "Richterswil is farther down Lake Zurich, but it can be a quiet lakeside base for guests who would like to stay near Manfredi's family or who prefer a smaller B&B.",
          items: ['B & B Caffètino-Vino Richterswil has five rooms in the historic village centre, close to the lake and station.', 'It is a B&B rather than a hotel; the house has no lift, and rooms are on the 2nd and 3rd floors.', 'Check the late-evening return journey from Küsnacht before booking, especially after the party.'],
          links: [
            { label: 'B & B Caffètino-Vino Richterswil', href: 'https://www.bnb-caffetino-vino.ch/' },
          ],
        },
        {
          title: 'Booking guidance',
          body: 'Zurich can be expensive in June. We recommend booking early, checking cancellation terms, and comparing hotels with apartments if you are staying longer.',
          items: ['Booking codes: TBD', 'Room-block deadlines: TBD', 'Approximate price bands: TBD'],
          links: [
            { label: 'Airbnb Zurich, June 2027', href: 'https://www.airbnb.com/s/Zurich--Switzerland/homes?checkin=2027-06-10&checkout=2027-06-13&adults=2' },
          ],
          image: '/images/places/hotel-sonne-lake-arrival.jpg',
          imageAlt: 'Lake Zurich shoreline near Küsnacht',
        },
        {
          title: 'Accessibility and mobility',
          body: 'Please tell us in the RSVP or by email if steps, walking distances, hearing support, or transport arrangements may affect your plans. We will confirm venue-specific details as the wedding logistics become final.',
          items: ['Kirche St. Peter: the official church FAQ says the ground floor is wheelchair-accessible, with a signposted lift from St. Peterhofstatt to the church; the gallery and choir area are not wheelchair-accessible. A hearing loop is listed.', 'Boat transfer: ZSG/ZVV state that Lake Zurich boats can carry wheelchairs up to 80 cm wide in 2nd class, with crew assistance at landing stages. The exact wedding boat and boarding point still need to be confirmed.', 'Hotel Sonne: room accessibility varies by category. Some room pages say not all rooms are accessible by lift, while selected rooms are described as lift-accessible; contact the hotel before booking if lift access is important.', 'OXEN: published room information places the rooms on the top floor with shared bathrooms; contact OXEN directly before booking if stairs or bathroom access may be an issue.', 'B & B Caffètino-Vino Richterswil: the B&B states that the old house has no lift and rooms are on the 2nd and 3rd floors.', 'For Zurich hotels or Airbnb apartments, use accessibility filters but confirm step-free entry, bathroom access, lift size, and distance to public transport directly with the property.'],
          links: [
            { label: 'St. Peter accessibility FAQ', href: 'https://www.st-peter-zh.ch/-4/besuch~2695/faq~3108/' },
            { label: 'ZVV accessible boats', href: 'https://www.zvv.ch/en/service/travel-without-barriers/limited-mobility/ships.html' },
            { label: 'Hotel Sonne rooms', href: 'https://sonne.ch/en/Rooms-Suites' },
            { label: 'OXEN rooms', href: 'https://www.oxen.ch/zimmer' },
            { label: 'B & B Caffètino-Vino', href: 'https://www.bnb-caffetino-vino.ch/' },
            { label: 'Airbnb accessibility filters', href: 'https://www.airbnb.com/help/article/3740' },
          ],
        },
      ],
    },
    'things-to-do': {
      title: 'Things to Do',
      kicker: 'Zurich & Switzerland',
      intro:
        'For guests with time around the wedding, Zurich offers lake walks, old town wandering, mountain views, museums, and day trips within easy reach.',
      sections: [
        {
          title: 'Zurich first-day options',
          body: 'For a first day after travel, choose simple outdoor plans and keep the schedule flexible.',
          items: ['Walk the Old Town, Lindenhof, and the Limmat.', 'Walk or run along the Limmat and the lake promenade.', 'Take the train up Uetliberg, or hike up if you want a little more effort.', 'Children may also enjoy Zurich Zoo, especially if you would like a structured half-day activity after travelling.'],
          links: [
            { label: 'Uetliberg', href: 'https://www.ueetliberg.ch/en/uetliberg' },
            { label: 'Zurich Zoo', href: 'https://www.zoo.ch/en' },
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
          image: '/images/places/kunsthaus-zurich.jpg',
          imageAlt: 'Kunsthaus Zurich at Heimplatz',
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
          items: ['Lucerne, ideally with a boat on Lake Lucerne.', 'Alpstein for hikes such as Seealpsee, Hoher Kasten, and Säntis, with routes at different difficulty levels.', 'Rhine Falls near Schaffhausen.', 'Bern for its old town, or Basel for art museums including Fondation Beyeler and Kunstmuseum Basel.'],
          links: [
            { label: 'Lake Lucerne boats', href: 'https://www.luzern.com/en/the-region/excursions/by-boat' },
            { label: 'Alpstein hikes', href: 'https://www.appenzell.ch/en/summer/hiking.html' },
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
          image: '/images/minted/minted-photo-08.jpeg',
          imageAlt: 'Zurich and Lake Zurich from above',
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
          body: 'Zurich is easy to navigate by tram, train, bus, and boat. Use public transport for travelling around Zurich; driving by car is not recommended for ordinary wedding logistics.',
          items: ['Use SBB Mobile for Swiss-wide timetable searches and tickets; use ZVV for Zurich-area zones and local tickets.', 'ZVV tickets are zone-based; Zurich city is zone 110, Küsnacht is zone 140, and Richterswil is zone 153.', 'For central Zurich, a ZVV single or 24h ticket is usually easiest. For Küsnacht or Richterswil, enter the destination in SBB Mobile or the ZVV app and buy the zones it assigns.', 'For day trips beyond Zurich, compare a normal point-to-point ticket, a Supersaver ticket, and a Saver Day Pass. Supersaver tickets can be cheaper when bought in advance, but they are tied to a specific train and are less flexible.', 'Children under 6 travel free in the Zurich network. Children aged 6 to 15 pay the reduced fare; for longer Swiss travel, check SBB child tickets and Junior Travelcard options.', 'For relaxed city exploring, consider renting a bike when weather and traffic confidence make it sensible.'],
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
            { label: 'Züri rollt bike rental', href: 'https://www.zuerich.com/en/visit/sport/zurich-on-wheels' },
          ],
        },
        {
          title: 'Choosing tickets',
          body: 'There is no single best ticket for every guest. These notes are intended as practical starting points.',
          items: ['To move around Zurich by tram, train, or bus: use a ZVV city ticket, 24h ticket, or the Zürich Card if you also want museums, airport transfer, Uetliberg, and short boat rides.', 'To get to Küsnacht for the reception area: buy a ZVV/SBB ticket from your starting stop to Küsnacht ZH or Hotel Sonne’s nearest stop; the app will choose the necessary zones.', 'To go to Richterswil: buy a ZVV/SBB ticket to Richterswil, or consider an all-zone/day ticket if you are making several Zurich-network trips that day.', 'For bigger day trips such as Lucerne, Bern, Basel, or mountain areas: check SBB early for Supersaver tickets or Saver Day Passes, but avoid inflexible tickets if your plans depend on a flight arrival or weather.'],
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
          items: ['Migros and Coop are the largest supermarket chains and are useful for breakfasts, snacks, picnic supplies, and children’s basics.', 'Taxis are usually expensive. Use them only when luggage, children, or accessibility needs make them genuinely useful.', 'Use public transport for travelling around Zurich; driving by car is not recommended for ordinary wedding logistics.', 'Low-cost options include lake walks, Old Town wandering, viewpoints, parks, supermarket picnics, and choosing accommodation near a tram, train, or bus stop.'],
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
        'For questions about the wedding website, travel, accommodation, or RSVP, please contact us at gabyandmanfredi@gmail.com.',
      sections: [
        {
          title: 'Wedding questions',
          body: 'We will use one shared email address for practical wedding questions while the site is being prepared.',
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
          title: 'Kirche St. Peter',
          body: 'Photo by Photones via Wikimedia Commons, licensed under CC BY-SA 3.0.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Kirche_St._Peter_Z%C3%BCrich.jpg' }],
        },
        {
          title: 'Kunsthaus Zurich',
          body: 'Photo by Roland zh via Wikimedia Commons, licensed under CC BY-SA 3.0.',
          links: [{ label: 'Source', href: 'https://commons.wikimedia.org/wiki/File:Kunsthaus_Z%C3%BCrich_-_Heimplatz_2011-08-06_18-46-28_ShiftN.jpg' }],
        },
        {
          title: 'Travel and public transport images',
          body: 'Travel-origin and public-transport photos are from Wikimedia Commons. Source details are also tracked in doc/assets/image_sources.md.',
          links: [
            { label: 'Chicago', href: 'https://commons.wikimedia.org/wiki/File:Chicago_Skyline_from_Lake_Michigan.jpg' },
            { label: 'New York', href: 'https://commons.wikimedia.org/wiki/File:Manhattan_Skyline_night.jpg' },
            { label: 'London', href: 'https://commons.wikimedia.org/wiki/File:View_of_the_Tower_Bridge_from_the_Thames_from_northwest._London.jpg' },
            { label: 'Ogliastra', href: 'https://commons.wikimedia.org/wiki/File:Coast_and_sea_at_Santa_Maria_Navarrese,_Sardinia,_Italy.jpg' },
            { label: 'Zurich Airport station', href: 'https://commons.wikimedia.org/wiki/File:Bahnhof_Z%C3%BCrich_Flughafen_01.jpg' },
            { label: 'SBB train', href: 'https://commons.wikimedia.org/wiki/File:SBB_RABe_511_(50852815551).jpg' },
            { label: 'Zurich tram', href: 'https://commons.wikimedia.org/wiki/File:Tram_E,_Bahnhofstrasse,_Zurich,_Switzerland.JPG' },
            { label: 'Säntis cable car', href: 'https://commons.wikimedia.org/wiki/File:S%C3%A4ntis_LSB_Blaue_Kabine_von_Talstation.jpg' },
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
  travel: {
    title: 'Viaggio',
    kicker: 'Come arrivare a Zurigo',
    intro:
      'L’aeroporto di Zurigo è il principale punto di arrivo. Queste indicazioni si basano sulle rotte attualmente pubblicate e andranno ricontrollate quando saranno disponibili gli orari per giugno 2027.',
    notice:
      'Bozza in italiano da rivedere. Ricontrollate i requisiti ufficiali di ingresso prima di prenotare e di nuovo prima di partire. La Svizzera fa parte dell’area Schengen e le regole potrebbero cambiare prima di giugno 2027.',
    sections: [
      {
        title: 'Da Chicago',
        body:
          "Chicago O'Hare (ORD) è l'aeroporto di riferimento. Gli orari attualmente pubblicati includono voli diretti ORD-ZRH, ma giugno 2027 andrà verificato quando le prenotazioni saranno aperte.",
        items: ['Controllate prima i voli diretti, in particolare SWISS e i servizi operati da United.', 'Se i voli diretti sono costosi, confrontate itinerari con uno scalo in hub europei come Francoforte, Monaco, Amsterdam, Parigi o Londra.', 'Confrontate anche tariffe con scalo a New York: gli itinerari Chicago-Zurigo via New York possono talvolta costare meno dei voli diretti.', 'Arrivate entro giovedì 10 giugno 2027 al più tardi; mercoledì 9 giugno 2027 è preferibile per jet lag e possibili ritardi dei bagagli.', 'Dall’aeroporto di Zurigo usate i mezzi pubblici, salvo che un viaggio più ampio in Svizzera o Italia renda davvero necessaria l’auto.'],
        imageAlt: 'Skyline di Chicago dal Lago Michigan',
      },
      {
        title: 'Da New York',
        body:
          'Per New York, confrontate JFK e Newark (EWR). Gli orari attualmente pubblicati includono voli diretti da entrambi gli aeroporti a Zurigo.',
        items: ['Controllate JFK e Newark prima di considerare LaGuardia; LaGuardia è di solito utile solo per coincidenze interne.', 'I voli diretti sono l’opzione più pratica quando il prezzo è ragionevole; uno scalo può essere utile per chi parte da fuori New York City.', 'Arrivate entro giovedì 10 giugno 2027 al più tardi; mercoledì 9 giugno 2027 lascia più margine.', 'Dall’aeroporto di Zurigo usate i mezzi pubblici, salvo che il resto del viaggio richieda davvero un’auto.'],
        imageAlt: 'Skyline di New York City',
      },
      {
        title: 'Da Londra e dal Regno Unito',
        body:
          'Da Londra, i voli diretti sono di solito la soluzione più semplice. EasyJet può essere conveniente, ma controllate con attenzione le regole sui bagagli prima di confrontare i prezzi.',
        items: ['Confrontate Heathrow, Gatwick, City, Luton e Stansted in base a dove vivete; Heathrow, Gatwick e City sono di solito i più rilevanti per Zurigo.', 'Per chi vive fuori Londra, confrontate anche Manchester, Edimburgo, Bristol e altri aeroporti regionali con voli diretti o con uno scalo.', 'Con EasyJet, la tariffa più bassa può includere solo un piccolo bagaglio da mettere sotto il sedile, attualmente 45 x 36 x 20 cm incluse maniglie e ruote; aggiungete bagaglio a mano grande o bagaglio da stiva online se necessario.', 'Il viaggio in treno è Londra St Pancras-Parigi con Eurostar, trasferimento da Gare du Nord a Gare de Lyon, poi TGV Lyria per Zurich HB; prevedete una coincidenza ampia a Parigi.'],
        imageAlt: 'Tower Bridge sul Tamigi a Londra',
      },
      {
        title: 'Dalla Sardegna',
        body:
          'Per chi parte dalla Sardegna, Cagliari e Olbia sono probabilmente gli aeroporti più utili da confrontare per primi.',
        items: ['Per volare, controllate prima Cagliari (CAG) e Olbia (OLB) verso Zurigo (ZRH). Gli orari attuali di Edelweiss mostrano rotte stagionali per Zurigo da entrambi gli aeroporti, ma giugno 2027 non è ancora completamente prenotabile.', 'EasyJet può essere conveniente per Olbia-Zurigo quando disponibile. Controllate con attenzione il bagaglio incluso, perché la tariffa più bassa può includere solo un piccolo bagaglio da mettere sotto il sedile, attualmente 45 x 36 x 20 cm incluse maniglie e ruote.', 'Se non c’è un volo diretto comodo, confrontate Cagliari o Olbia via Milano, Roma o un altro hub europeo. Alghero può funzionare con una coincidenza, ma è meno probabile che sia la soluzione più semplice per Zurigo.', 'Per arrivare in auto, prendete un traghetto notturno dalla Sardegna a Genova e poi guidate da Genova a Zurigo. Il traghetto dura di solito circa 10-13 ore a seconda della tratta e dell’operatore; Genova-Zurigo richiede circa cinque ore prima di pause, frontiera e traffico al Gottardo o al San Bernardino.', 'Se entrate in Svizzera in auto, acquistate la vignetta autostradale dal portale ufficiale svizzero e controllate il traffico nei tunnel alpini prima di lasciare Genova. Il parcheggio a Zurigo e Küsnacht va pianificato in anticipo.'],
        imageAlt: 'La costa vicino a Santa Maria Navarrese in Ogliastra, Sardegna',
      },
      {
        title: 'Dall’aeroporto di Zurigo',
        body:
          'L’aeroporto di Zurigo ha un collegamento ferroviario e S-Bahn molto comodo con Zurich HB, con proseguimento in mezzi pubblici verso Küsnacht e i luoghi del matrimonio. Per gli spostamenti del matrimonio, usate il treno invece di guidare o prendere un taxi.',
        items: ['I treni SBB per Zurich HB partono di solito circa ogni 10 minuti e il viaggio dura circa 15 minuti.', 'Per Küsnacht o Hotel Sonne, usate SBB Mobile o ZVV dall’aeroporto o da Zurich HB e acquistate il biglietto indicato dall’app.', 'Taxi e servizi ride-hailing possono essere utili con bambini, bagagli pesanti o necessità di accessibilità, ma di solito sono molto più costosi dei mezzi pubblici.', 'Un’auto a noleggio non è consigliata per gli spostamenti del matrimonio a Zurigo.'],
        imageAlt: "Treni alla stazione ferroviaria dell'aeroporto di Zurigo",
      },
      {
        title: 'In treno verso Küsnacht',
        body:
          'Küsnacht ZH si trova sulla linea S-Bahn della riva destra del Lago di Zurigo. Usate SBB Mobile o ZVV per treno, binario e zone tariffarie esatte nel giorno del viaggio.',
        items: ['Da Zurich HB: prendete un S6 o S16 verso la riva destra del Lago di Zurigo e scendete a Küsnacht ZH. Dalla stazione, Hotel Sonne è a pochi minuti a piedi in discesa verso il lago.', 'Dall’aeroporto di Zurigo: il treno diretto più semplice è di solito l’S16 verso Herrliberg-Feldmeilen o Meilen, scendendo a Küsnacht ZH. Se gli orari sono migliori, prendete un treno veloce per Zurich HB e cambiate lì con S6 o S16.', 'Da Richterswil: viaggiate in treno fino a Zurich HB, poi cambiate con S6 o S16 verso Küsnacht ZH. Di solito è più chiaro che attraversare il lago la sera tardi.', 'Comprate l’intero percorso in SBB Mobile o nell’app ZVV prima di salire; l’app sceglierà le zone necessarie.'],
      },
      {
        title: 'Mappa dei luoghi del matrimonio a Zurigo',
        body:
          'Questa mappa basata su OpenStreetMap serve per orientarsi, non per pianificare un percorso preciso. Mostra l’aeroporto di Zurigo, Zurich HB, la cerimonia nel centro storico, il ricevimento a Küsnacht e Richterswil.',
        items: ['Kirche St. Peter si trova nel centro storico di Zurigo, vicino al lago e ai collegamenti tram centrali.', 'Hotel Sonne si trova a Küsnacht, sulla sponda destra del Lago di Zurigo.', 'Richterswil, dove vivono i genitori di Manfredi, si trova più a sud lungo il lago ed è raggiungibile in treno.', 'L’aeroporto di Zurigo e Zurich HB sono collegati da treni frequenti; usate SBB Mobile o ZVV per il percorso esatto nel giorno del viaggio.'],
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
      'Küsnacht è più comoda per la festa, mentre il centro di Zurigo è ideale per visitare la città e muoversi con i mezzi pubblici. Informazioni su eventuali camere riservate saranno aggiunte appena confermate.',
    sections: [
      {
        title: 'Più vicino alla festa: Küsnacht',
        body:
          'Dormire a Küsnacht vi tiene vicino all’Hotel Sonne dopo cena e dopo la festa. È probabilmente la scelta più comoda per chi preferisce semplificare il rientro serale.',
        items: ['Hotel Sonne Küsnacht: probabilmente la prima opzione per un eventuale blocco camere.', 'OXEN Küsnacht: opzione vicina con un piccolo numero di camere.', 'Piano per il rientro notturno: TBD.'],
        imageAlt: 'Hotel Sonne a Küsnacht',
      },
      {
        title: 'Centro di Zurigo',
        body:
          'Il centro di Zurigo è pratico per chi desidera ristoranti, visite, collegamenti ferroviari e facile accesso all’aeroporto.',
        items: ['Cercate vicino a Zurich HB, centro storico, Bellevue o Stadelhofen per la soluzione più comoda in centro.', 'Hotel più economici possono essere più facili da trovare a Zurich Altstetten o Oerlikon; entrambe le zone sono collegate al centro e all’aeroporto con i mezzi pubblici.', 'Scegliete un alloggio vicino a una fermata di tram, treno o autobus.', 'Usate i mezzi pubblici per muovervi a Zurigo; spostarsi in auto non è consigliato per la normale logistica del matrimonio.'],
        imageAlt: 'Centro storico di Zurigo e fiume Limmat',
      },
      {
        title: 'Opzione a Richterswil',
        body:
          'Richterswil si trova più a sud lungo il Lago di Zurigo, ma può essere una base tranquilla per chi desidera stare vicino alla famiglia di Manfredi o preferisce un piccolo B&B.',
        items: ['B & B Caffètino-Vino Richterswil ha cinque camere nel centro storico del paese, vicino al lago e alla stazione.', 'È un B&B, non un hotel; la casa non ha ascensore e le camere si trovano al 2° e 3° piano.', 'Controllate il rientro serale da Küsnacht prima di prenotare, soprattutto dopo la festa.'],
      },
      {
        title: 'Indicazioni per prenotare',
        body:
          'Zurigo può essere costosa a giugno. Consigliamo di prenotare presto, controllare le condizioni di cancellazione e confrontare hotel e appartamenti se vi fermate più a lungo.',
        items: ['Codici di prenotazione: TBD', 'Scadenze per eventuali blocchi camere: TBD', 'Fasce di prezzo indicative: TBD'],
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
      },
    ],
  },
  'switzerland-guide': {
    title: 'Guida alla Svizzera',
    kicker: 'Note pratiche',
    intro:
      'Alcune note pratiche per chi visita la Svizzera: mezzi pubblici, valuta, meteo, telefoni e pianificazione semplice.',
    sections: [
      {
        title: 'Trasporti pubblici',
        body:
          'A Zurigo ci si muove facilmente con tram, treni, autobus e battelli. Usate i mezzi pubblici per muovervi a Zurigo; viaggiare in auto non è consigliato per la normale logistica del matrimonio.',
        items: ['Usate SBB Mobile per orari e biglietti in tutta la Svizzera; usate ZVV per le zone e i biglietti dell’area di Zurigo.', 'I biglietti ZVV sono basati sulle zone; la città di Zurigo è la zona 110, Küsnacht la zona 140 e Richterswil la zona 153.', 'Per il centro di Zurigo, di solito è più semplice un biglietto singolo ZVV o un biglietto 24 ore. Per Küsnacht o Richterswil, inserite la destinazione in SBB Mobile o nell’app ZVV e acquistate le zone indicate.', 'Per gite fuori Zurigo, confrontate un biglietto punto-punto, un Supersaver ticket e un Saver Day Pass. I Supersaver possono costare meno se acquistati in anticipo, ma sono legati a un treno specifico e sono meno flessibili.', 'I bambini sotto i 6 anni viaggiano gratis nella rete di Zurigo. I bambini dai 6 ai 15 anni pagano la tariffa ridotta; per viaggi più lunghi in Svizzera, controllate i biglietti bambini SBB e la Junior Travelcard.', 'Per esplorare la città con calma, valutate il noleggio di una bici quando meteo e traffico lo rendono sensato.'],
      },
      {
        title: 'Come scegliere i biglietti',
        body: 'Non esiste un biglietto migliore per tutti. Queste note sono un punto di partenza pratico.',
        items: ['Per muoversi a Zurigo in tram, treno o autobus: usate un biglietto ZVV per la città, un biglietto 24 ore o la Zürich Card se volete includere anche musei, trasferimento dall’aeroporto, Uetliberg e brevi tratte in battello.', 'Per arrivare a Küsnacht nella zona del ricevimento: acquistate un biglietto ZVV/SBB dal punto di partenza a Küsnacht ZH o alla fermata più vicina all’Hotel Sonne; l’app sceglierà le zone necessarie.', 'Per andare a Richterswil: acquistate un biglietto ZVV/SBB per Richterswil, oppure considerate un giornaliero/all-zone se fate diversi spostamenti nella rete di Zurigo nello stesso giorno.', 'Per gite più lunghe, come Lucerna, Berna, Basilea o zone di montagna: controllate SBB in anticipo per Supersaver tickets o Saver Day Passes, ma evitate biglietti poco flessibili se il piano dipende da arrivi aerei o meteo.'],
      },
      {
        title: 'Costi e spese pratiche',
        body:
          'La Svizzera usa il franco svizzero ed è spesso costosa, ma una buona pianificazione aiuta a contenere le spese.',
        items: ['Migros e Coop sono le principali catene di supermercati e sono utili per colazioni, snack, picnic e necessità per bambini.', 'I taxi sono di solito costosi. Usateli solo quando bagagli, bambini o esigenze di accessibilità li rendono davvero utili.', 'Usate i mezzi pubblici per muovervi a Zurigo; viaggiare in auto non è consigliato per la normale logistica del matrimonio.', 'Opzioni economiche includono passeggiate sul lago, centro storico, punti panoramici, parchi, picnic con prodotti del supermercato e alloggi vicino a tram, treno o autobus.'],
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
      },
      {
        title: 'Consigli personali',
        body:
          'Gli ospiti possono contattare Manfredi e la famiglia per consigli pratici, soprattutto su escursioni, programmi con bambini, viaggi più lunghi o itinerari con un livello di cammino specifico.',
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
        body: 'Useremo un unico indirizzo email condiviso per le domande pratiche mentre il sito viene preparato.',
        items: ['Domande generali: gabyandmanfredi@gmail.com', 'Supporto RSVP: gabyandmanfredi@gmail.com', 'Contatto urgente durante la settimana del matrimonio: TBD'],
      },
    ],
  },
});

applyLocalizedCopy('de', {
  travel: {
    title: 'Anreise',
    kicker: 'Anreise nach Zürich',
    intro:
      'Der Flughafen Zürich ist der wichtigste Ankunftsort. Diese Hinweise beruhen auf derzeit veröffentlichten Verbindungen und sollten nochmals geprüft werden, sobald die Fahrpläne und Flugpläne für Juni 2027 verfügbar sind.',
    notice:
      'Deutscher Entwurf zur Prüfung. Bitte prüft die offiziellen Einreisebestimmungen vor der Buchung und nochmals vor der Reise. Die Schweiz gehört zum Schengen-Raum; die Regeln können sich bis Juni 2027 ändern.',
    sections: [
      {
        title: 'Aus Chicago',
        body:
          "Chicago O'Hare (ORD) ist der relevante Flughafen. Aktuell veröffentlichte Flugpläne enthalten Direktflüge ORD-ZRH; Juni 2027 sollte geprüft werden, sobald Buchungen möglich sind.",
        items: ['Prüft zuerst Direktflüge, insbesondere SWISS und von United durchgeführte Verbindungen.', 'Wenn Direktflüge teuer sind, vergleicht Verbindungen mit einem Umstieg über europäische Drehkreuze wie Frankfurt, München, Amsterdam, Paris oder London.', 'Vergleicht auch Tarife mit Umstieg in New York; Chicago-Zürich-Verbindungen über New York können manchmal günstiger sein als Direktflüge.', 'Kommt spätestens am Donnerstag, 10. Juni 2027 an; Mittwoch, 9. Juni 2027 ist wegen Jetlag und möglicher Gepäckverspätungen besser.', 'Nutzt ab Flughafen Zürich den öffentlichen Verkehr, sofern nicht eine längere Schweiz- oder Italienreise ein Auto wirklich nötig macht.'],
        imageAlt: 'Skyline von Chicago vom Lake Michigan',
      },
      {
        title: 'Aus New York',
        body:
          'Für New York lohnt sich der Vergleich von JFK und Newark (EWR). Aktuell veröffentlichte Flugpläne enthalten Direktflüge von beiden Flughäfen nach Zürich.',
        items: ['Prüft JFK und Newark, bevor ihr LaGuardia berücksichtigt; LaGuardia ist meistens nur für Inlandanschlüsse sinnvoll.', 'Direktflüge sind am praktischsten, wenn der Preis vernünftig ist; Umsteigeverbindungen können hilfreich sein, wenn ihr nicht direkt aus New York City reist.', 'Kommt spätestens am Donnerstag, 10. Juni 2027 an; Mittwoch, 9. Juni 2027 gibt mehr Spielraum.', 'Nutzt ab Flughafen Zürich den öffentlichen Verkehr, sofern eure weitere Reise nicht wirklich ein Auto erfordert.'],
        imageAlt: 'Skyline von New York City',
      },
      {
        title: 'Aus London und dem Vereinigten Königreich',
        body:
          'Aus London sind Direktflüge meistens die einfachste Option. EasyJet kann preislich attraktiv sein, aber prüft die Gepäckregeln sorgfältig, bevor ihr Preise vergleicht.',
        items: ['Vergleicht London Heathrow, Gatwick, City, Luton und Stansted je nach Wohnort; Heathrow, Gatwick und City sind für Zürich meist am relevantesten.', 'Ausserhalb Londons lohnt sich auch der Vergleich von Manchester, Edinburgh, Bristol und anderen Regionalflughäfen mit Direkt- oder Umsteigeverbindungen.', 'Bei EasyJet kann der günstigste Tarif nur ein kleines Gepäckstück unter dem Sitz enthalten, derzeit 45 x 36 x 20 cm inklusive Griffe und Rollen; bucht grosses Handgepäck oder Aufgabegepäck online dazu, wenn ihr es braucht.', 'Die Bahnroute führt von London St Pancras mit Eurostar nach Paris, dann von Gare du Nord nach Gare de Lyon und mit TGV Lyria nach Zürich HB; plant in Paris grosszügig Zeit für den Wechsel ein.'],
        imageAlt: 'Tower Bridge über der Themse in London',
      },
      {
        title: 'Aus Sardinien',
        body:
          'Für Gäste aus Sardinien sind Cagliari und Olbia wahrscheinlich die sinnvollsten Flughäfen für den ersten Vergleich.',
        items: ['Für Flüge prüft zuerst Cagliari (CAG) und Olbia (OLB) nach Zürich (ZRH). Aktuelle Edelweiss-Flugpläne zeigen saisonale Zürich-Verbindungen von beiden Flughäfen, aber Juni 2027 ist noch nicht vollständig buchbar.', 'EasyJet kann für Olbia-Zürich günstig sein, wenn die Verbindung verfügbar ist. Prüft die Gepäckbestimmungen sorgfältig, da der günstigste Tarif nur ein kleines Gepäckstück unter dem Sitz enthalten kann, derzeit 45 x 36 x 20 cm inklusive Griffe und Rollen.', 'Wenn es keinen passenden Direktflug gibt, vergleicht Cagliari oder Olbia via Mailand, Rom oder ein anderes europäisches Drehkreuz. Alghero kann mit Umstieg funktionieren, ist aber wahrscheinlich seltener die einfachste Route nach Zürich.', 'Mit dem Auto: nehmt eine Nachtfähre von Sardinien nach Genua und fahrt dann von Genua nach Zürich. Die Fähre dauert je nach Strecke und Anbieter meist etwa 10-13 Stunden; Genua-Zürich dauert vor Pausen, Grenze und Gotthard- oder San-Bernardino-Verkehr ungefähr fünf Stunden.', 'Wenn ihr mit dem Auto in die Schweiz fahrt, kauft die Autobahnvignette über das offizielle Schweizer Portal und prüft vor der Abfahrt in Genua den Verkehr an den Alpentunnels. Parken in Zürich und Küsnacht sollte vorab geplant werden.'],
        imageAlt: 'Die Kueste bei Santa Maria Navarrese in Ogliastra, Sardinien',
      },
      {
        title: 'Ab Flughafen Zürich',
        body:
          'Der Flughafen Zürich hat eine sehr bequeme Zug- und S-Bahn-Verbindung zum Zürich HB, mit weiterem öffentlichem Verkehr nach Küsnacht und zu den Hochzeitsorten. Für die normale Hochzeitslogistik nutzt den Zug statt Auto oder Taxi.',
        items: ['SBB-Züge nach Zürich HB fahren in der Regel etwa alle 10 Minuten; die Fahrt dauert ungefähr 15 Minuten.', 'Für Küsnacht oder Hotel Sonne nutzt SBB Mobile oder ZVV ab Flughafen oder ab Zürich HB und kauft das von der App angezeigte Ticket.', 'Taxis und Ride-Hailing können mit Kindern, schwerem Gepäck oder Barrierefreiheitsbedarf sinnvoll sein, sind aber meist deutlich teurer als der öffentliche Verkehr.', 'Ein Mietwagen ist für Hochzeitslogistik innerhalb Zürichs nicht empfohlen.'],
        imageAlt: 'Züge im Bahnhof Zürich Flughafen',
      },
      {
        title: 'Mit dem Zug nach Küsnacht',
        body:
          'Küsnacht ZH liegt an der S-Bahn-Linie am rechten Zürichseeufer. Nutzt SBB Mobile oder ZVV für den genauen Zug, das Gleis und die nötigen Zonen am Reisetag.',
        items: ['Ab Zürich HB: nehmt S6 oder S16 in Richtung rechtes Zürichseeufer und steigt in Küsnacht ZH aus. Vom Bahnhof ist Hotel Sonne ein kurzer Fussweg bergab Richtung See.', 'Ab Flughafen Zürich: die einfachste direkte Verbindung ist meist die S16 Richtung Herrliberg-Feldmeilen oder Meilen bis Küsnacht ZH. Wenn es zeitlich besser passt, nehmt einen schnellen Zug zum Zürich HB und steigt dort in S6 oder S16 um.', 'Ab Richterswil: fahrt mit dem Zug zum Zürich HB und steigt dort in S6 oder S16 Richtung Küsnacht ZH um. Das ist meist übersichtlicher als eine späte Seequerung.', 'Kauft die ganze Verbindung vor dem Einsteigen in SBB Mobile oder in der ZVV-App; die App wählt die nötigen Zonen.'],
      },
      {
        title: 'Hochzeitskarte Zürich',
        body:
          'Diese auf OpenStreetMap basierende Karte dient der Orientierung, nicht der genauen Routenplanung. Sie zeigt Flughafen Zürich, Zürich HB, die Trauung in der Altstadt, die Feier in Küsnacht und Richterswil.',
        items: ['Die Kirche St. Peter liegt in der Zürcher Altstadt, nahe beim See und bei zentralen Tramverbindungen.', 'Hotel Sonne liegt in Küsnacht am rechten Zürichseeufer.', 'Richterswil, wo Manfredis Eltern wohnen, liegt weiter südlich am See und ist mit dem Zug erreichbar.', 'Flughafen Zürich und Zürich HB sind mit häufigen Zügen verbunden; nutzt SBB Mobile oder ZVV für die genaue Verbindung am Reisetag.'],
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
      'Küsnacht ist am praktischsten für die Feier; Zürich Zentrum ist gut für Besichtigungen und Verkehrsanbindungen. Informationen zu Zimmerkontingenten werden ergänzt, sobald sie bestätigt sind.',
    sections: [
      {
        title: 'Am nächsten zur Feier: Küsnacht',
        body:
          'Eine Unterkunft in Küsnacht hält euch nach Abendessen und Feier nahe beim Hotel Sonne. Das ist wahrscheinlich die einfachste Wahl, wenn der späte Rückweg möglichst unkompliziert sein soll.',
        items: ['Hotel Sonne Küsnacht: voraussichtlich erste Option für ein mögliches Zimmerkontingent.', 'OXEN Küsnacht: nahe Option mit wenigen Zimmern.', 'Plan für späte Rückfahrt: TBD.'],
        imageAlt: 'Hotel Sonne in Küsnacht',
      },
      {
        title: 'Zürich Zentrum',
        body:
          'Zürich Zentrum ist praktisch für Restaurants, Besichtigungen, Zugverbindungen und einfache Anreise zum Flughafen.',
        items: ['Sucht nahe Zürich HB, Altstadt, Bellevue oder Stadelhofen für die bequemste zentrale Lage.', 'Günstigere Hotels finden sich eventuell eher in Zürich Altstetten oder Oerlikon; beide Quartiere sind mit dem Zentrum und dem Flughafen durch öffentlichen Verkehr verbunden.', 'Wählt eine Unterkunft nahe bei Tram, Zug oder Bus.', 'Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist für die normale Hochzeitslogistik nicht empfohlen.'],
        imageAlt: 'Zürcher Altstadt und Limmat',
      },
      {
        title: 'Option in Richterswil',
        body:
          'Richterswil liegt weiter südlich am Zürichsee, kann aber eine ruhige Basis für Gäste sein, die nahe bei Manfredis Familie wohnen oder ein kleineres B&B bevorzugen.',
        items: ['B & B Caffètino-Vino Richterswil hat fünf Zimmer im historischen Dorfkern, nahe beim See und Bahnhof.', 'Es ist ein B&B und kein Hotel; das Haus hat keinen Lift, und die Zimmer liegen im 2. und 3. Obergeschoss.', 'Prüft vor der Buchung die späte Rückfahrt ab Küsnacht, besonders nach der Feier.'],
      },
      {
        title: 'Buchungshinweise',
        body:
          'Zürich kann im Juni teuer sein. Wir empfehlen früh zu buchen, Stornierungsbedingungen zu prüfen und bei längeren Aufenthalten Hotels mit Apartments zu vergleichen.',
        items: ['Buchungscodes: TBD', 'Fristen für Zimmerkontingente: TBD', 'Ungefähre Preisbereiche: TBD'],
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
      },
    ],
  },
  'switzerland-guide': {
    title: 'Schweiz-Guide',
    kicker: 'Praktische Hinweise',
    intro:
      'Einige praktische Hinweise für Gäste in der Schweiz: öffentlicher Verkehr, Währung, Wetter, Mobiltelefone und einfache Planung.',
    sections: [
      {
        title: 'Öffentlicher Verkehr',
        body:
          'In Zürich bewegt ihr euch gut mit Tram, Zug, Bus und Schiff. Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist für die normale Hochzeitslogistik nicht empfohlen.',
        items: ['Nutzt SBB Mobile für Fahrpläne und Tickets in der ganzen Schweiz; nutzt ZVV für Zonen und lokale Tickets im Raum Zürich.', 'ZVV-Tickets sind zonenbasiert; Zürich Stadt ist Zone 110, Küsnacht Zone 140 und Richterswil Zone 153.', 'Für Zürich Zentrum ist meistens ein ZVV-Einzelticket oder ein 24h-Ticket am einfachsten. Für Küsnacht oder Richterswil gebt das Ziel in SBB Mobile oder der ZVV-App ein und kauft die angezeigten Zonen.', 'Für Tagesausflüge ausserhalb Zürichs vergleicht ein normales Punkt-zu-Punkt-Ticket, ein Supersaver Ticket und einen Saver Day Pass. Supersaver Tickets können günstiger sein, wenn sie früh gekauft werden, sind aber an einen bestimmten Zug gebunden und weniger flexibel.', 'Kinder unter 6 Jahren fahren im Zürcher Verkehrsverbund kostenlos. Kinder von 6 bis 15 Jahren zahlen den reduzierten Tarif; für längere Reisen in der Schweiz prüft SBB-Kindertickets und Junior Travelcard-Optionen.', 'Für entspanntes Erkunden der Stadt könnt ihr ein Velo mieten, wenn Wetter und Verkehrssituation für euch passen.'],
      },
      {
        title: 'Tickets wählen',
        body: 'Es gibt nicht ein einziges bestes Ticket für alle Gäste. Diese Hinweise sind als praktische Ausgangspunkte gedacht.',
        items: ['Für Wege in Zürich mit Tram, Zug oder Bus: nutzt ein ZVV-Stadtticket, 24h-Ticket oder die Zürich Card, wenn ihr auch Museen, Flughafentransfer, Uetliberg und kurze Schiffsfahrten einschliessen möchtet.', 'Für Küsnacht beim Empfang: kauft ein ZVV/SBB-Ticket von eurer Start-Haltestelle nach Küsnacht ZH oder zur nächsten Haltestelle des Hotel Sonne; die App wählt die nötigen Zonen.', 'Für Richterswil: kauft ein ZVV/SBB-Ticket nach Richterswil oder erwägt ein All-Zones/Tagesticket, wenn ihr an diesem Tag mehrere Fahrten im Zürcher Verkehrsverbund macht.', 'Für grössere Tagesausflüge wie Luzern, Bern, Basel oder Bergregionen: prüft früh SBB für Supersaver Tickets oder Saver Day Passes, aber vermeidet unflexible Tickets, wenn eure Pläne von Flugankunft oder Wetter abhängen.'],
      },
      {
        title: 'Geld und Budget',
        body:
          'Die Schweiz verwendet Schweizer Franken und ist oft teuer, aber gute Planung hilft, die Kosten überschaubar zu halten.',
        items: ['Migros und Coop sind die grössten Supermarktketten und nützlich für Frühstück, Snacks, Picknick und Kinderbedarf.', 'Taxis sind meist teuer. Nutzt sie nur, wenn Gepäck, Kinder oder Barrierefreiheitsbedarf sie wirklich sinnvoll machen.', 'Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist für die normale Hochzeitslogistik nicht empfohlen.', 'Günstige Optionen sind Spaziergänge am See, Altstadt, Aussichtspunkte, Parks, Picknicks aus dem Supermarkt und Unterkunft nahe Tram, Zug oder Bus.'],
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
      },
      {
        title: 'Persönliche Empfehlungen',
        body:
          'Gäste können Manfredi und die Familie für praktische Hinweise kontaktieren, besonders zu Wanderungen, familienfreundlichen Plänen, längeren Reisen oder Routen für ein bestimmtes Wanderniveau.',
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
        body: 'Wir verwenden eine gemeinsame E-Mail-Adresse für praktische Fragen, während die Website vorbereitet wird.',
        items: ['Allgemeine Fragen: gabyandmanfredi@gmail.com', 'RSVP-Unterstützung: gabyandmanfredi@gmail.com', 'Dringender Kontakt in der Hochzeitswoche: TBD'],
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

type LocalizedSectionCopy = Partial<Pick<Section, 'title' | 'body' | 'items' | 'links' | 'imageAlt' | 'exchangeRates'>>;

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
