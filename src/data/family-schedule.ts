import type { Lang } from './locales';
import type { ScheduleEntry } from './schedule';

type FamilyPageCopy = {
  kicker: string;
  title: string;
  intro: string;
  lastUpdated: string;
  statusNote: string;
  statusNoteLabel: string;
};

const confirmed = {
  en: 'Confirmed',
  it: 'Confermato',
  de: 'Bestätigt',
};

const provisional = {
  en: 'Provisional',
  it: 'Provvisorio',
  de: 'Vorläufig',
};

const toBeConfirmed = {
  en: 'To be confirmed',
  it: 'Da confermare',
  de: 'Noch zu bestätigen',
};

const wednesday = {
  en: 'Wednesday, 9 June 2027',
  it: 'Mercoledì 9 giugno 2027',
  de: 'Mittwoch, 9. Juni 2027',
};

const thursday = {
  en: 'Thursday, 10 June 2027',
  it: 'Giovedì 10 giugno 2027',
  de: 'Donnerstag, 10. Juni 2027',
};

const friday = {
  en: 'Friday, 11 June 2027',
  it: 'Venerdì 11 giugno 2027',
  de: 'Freitag, 11. Juni 2027',
};

const saturday = {
  en: 'Saturday, 12 June 2027',
  it: 'Sabato 12 giugno 2027',
  de: 'Samstag, 12. Juni 2027',
};

export const familyPageCopy: Record<Lang, FamilyPageCopy> = {
  en: {
    kicker: 'For the family',
    title: 'Family schedule',
    intro: 'This private page is our working itinerary for the family before and during the wedding celebrations.',
    lastUpdated: 'Last updated 30 August 2026.',
    statusNote: 'Confirmed items are fixed. Provisional items and those marked “To be confirmed” may change as plans are finalised.',
    statusNoteLabel: 'Schedule status',
  },
  it: {
    kicker: 'Per la famiglia',
    title: 'Programma per la famiglia',
    intro: 'Questa pagina privata contiene il programma di lavoro per la famiglia prima e durante i festeggiamenti.',
    lastUpdated: 'Ultimo aggiornamento: 30 agosto 2026.',
    statusNote: 'Gli appuntamenti confermati sono definitivi. Quelli provvisori o indicati come “Da confermare” potranno cambiare mentre completiamo l’organizzazione.',
    statusNoteLabel: 'Stato del programma',
  },
  de: {
    kicker: 'Für die Familie',
    title: 'Familienablauf',
    intro: 'Diese private Seite enthält unseren aktuellen Ablauf für die Familie vor und während der Hochzeitsfeier.',
    lastUpdated: 'Zuletzt aktualisiert am 30. August 2026.',
    statusNote: 'Bestätigte Termine stehen fest. Vorläufige und als „Noch zu bestätigen“ markierte Angaben können sich während der weiteren Planung ändern.',
    statusNoteLabel: 'Stand der Planung',
  },
};

export const familySchedule: ScheduleEntry[] = [
  {
    date: wednesday,
    time: { en: '13:30', it: '13:30', de: '13.30 Uhr' },
    title: {
      en: 'Wedding rehearsal',
      it: 'Prova della cerimonia',
      de: 'Hochzeitsprobe',
    },
    location: {
      en: 'Kirche St. Peter, Zurich',
      it: 'Kirche St. Peter, Zurigo',
      de: 'Kirche St. Peter, Zürich',
    },
    body: {
      en: 'The rehearsal starts at 13:30. The finishing time is still being agreed.',
      it: 'La prova inizierà alle 13:30. L’orario di fine è ancora da concordare.',
      de: 'Die Probe beginnt um 13.30 Uhr. Das Ende wird noch abgestimmt.',
    },
    status: confirmed,
  },
  {
    date: thursday,
    time: { en: '11:30–12:00', it: '11:30–12:00', de: '11.30–12.00 Uhr' },
    title: {
      en: 'Civil ceremony',
      it: 'Cerimonia civile',
      de: 'Zivile Trauung',
    },
    location: {
      en: 'Stadthaus Zürich',
      it: 'Stadthaus Zürich',
      de: 'Stadthaus Zürich',
    },
    body: {
      en: 'The legal civil ceremony will take place with immediate family.',
      it: 'La cerimonia civile legale si svolgerà con i familiari più stretti.',
      de: 'Die standesamtliche Trauung findet im Kreis der engsten Familie statt.',
    },
    status: confirmed,
  },
  {
    date: thursday,
    time: { en: 'Around 13:15', it: 'Verso le 13:15', de: 'Gegen 13.15 Uhr' },
    title: {
      en: 'Family lunch after the civil ceremony',
      it: 'Pranzo di famiglia dopo la cerimonia civile',
      de: 'Familienmittagessen nach der zivilen Trauung',
    },
    location: {
      en: 'Venue to be confirmed',
      it: 'Luogo da confermare',
      de: 'Ort noch zu bestätigen',
    },
    body: {
      en: 'Lunch together is planned after the civil ceremony. The restaurant and final time are still under review.',
      it: 'Dopo la cerimonia civile è previsto un pranzo insieme. Il ristorante e l’orario definitivo sono ancora in valutazione.',
      de: 'Nach der zivilen Trauung ist ein gemeinsames Mittagessen geplant. Restaurant und endgültige Uhrzeit werden noch geprüft.',
    },
    status: provisional,
  },
  {
    date: friday,
    time: { en: 'TBD', it: 'Da confermare', de: 'Noch offen' },
    title: {
      en: 'Family arrival and final preparations',
      it: 'Arrivo della famiglia e ultimi preparativi',
      de: 'Ankunft der Familie und letzte Vorbereitungen',
    },
    location: {
      en: 'Kirche St. Peter, Zurich',
      it: 'Kirche St. Peter, Zurigo',
      de: 'Kirche St. Peter, Zürich',
    },
    body: {
      en: 'Family arrival times, practical roles, and the handover place for the bouquet and boutonnières will be added once agreed.',
      it: 'Gli orari di arrivo, i compiti pratici e il luogo di consegna del bouquet e delle boutonnière saranno aggiunti non appena concordati.',
      de: 'Ankunftszeiten, praktische Aufgaben und der Übergabeort für Brautstrauss und Ansteckblumen werden ergänzt, sobald sie abgestimmt sind.',
    },
    status: toBeConfirmed,
  },
  {
    date: friday,
    time: { en: '13:30', it: '13:30', de: '13.30 Uhr' },
    title: {
      en: 'Guest arrival',
      it: 'Arrivo degli ospiti',
      de: 'Ankunft der Gäste',
    },
    location: {
      en: 'Kirche St. Peter, Zurich',
      it: 'Kirche St. Peter, Zurigo',
      de: 'Kirche St. Peter, Zürich',
    },
    body: {
      en: 'Guests begin arriving at 13:30 and should be seated by 13:40.',
      it: 'Gli ospiti inizieranno ad arrivare alle 13:30 e dovranno essere seduti entro le 13:40.',
      de: 'Die Gäste treffen ab 13.30 Uhr ein und sollen bis 13.40 Uhr ihre Plätze eingenommen haben.',
    },
    status: confirmed,
  },
  {
    date: friday,
    time: { en: '14:00', it: '14:00', de: '14.00 Uhr' },
    title: {
      en: 'Wedding ceremony',
      it: 'Cerimonia nuziale',
      de: 'Kirchliche Trauung',
    },
    location: {
      en: 'Kirche St. Peter, Zurich',
      it: 'Kirche St. Peter, Zurigo',
      de: 'Kirche St. Peter, Zürich',
    },
    body: {
      en: 'The wedding ceremony starts at 14:00.',
      it: 'La cerimonia nuziale inizierà alle 14:00.',
      de: 'Die kirchliche Trauung beginnt um 14.00 Uhr.',
    },
    status: confirmed,
  },
  {
    date: friday,
    time: { en: 'Around 16:30', it: 'Verso le 16:30', de: 'Gegen 16.30 Uhr' },
    title: {
      en: 'Walk and boat transfer to Küsnacht',
      it: 'Passeggiata e trasferimento in barca a Küsnacht',
      de: 'Fussweg und Schiffstransfer nach Küsnacht',
    },
    location: {
      en: 'Quai 6, Bürkliplatz, Zurich',
      it: 'Quai 6, Bürkliplatz, Zurigo',
      de: 'Quai 6, Bürkliplatz, Zürich',
    },
    body: {
      en: 'After the ceremony, the family will help guide guests to Quai 6. Boarding is planned for 15 minutes before departure; the exact times remain to be confirmed.',
      it: 'Dopo la cerimonia, la famiglia accompagnerà gli ospiti al Quai 6. L’imbarco è previsto 15 minuti prima della partenza; gli orari esatti sono ancora da confermare.',
      de: 'Nach der Trauung begleitet die Familie die Gäste zum Quai 6. Das Einsteigen ist 15 Minuten vor der Abfahrt geplant; die genauen Zeiten sind noch zu bestätigen.',
    },
    status: provisional,
  },
  {
    date: friday,
    time: { en: '17:00', it: '17:00', de: '17.00 Uhr' },
    title: {
      en: 'Reception, dinner, and dancing',
      it: 'Ricevimento, cena e festa',
      de: 'Empfang, Abendessen und Feier',
    },
    location: {
      en: 'Hotel Sonne, Küsnacht',
      it: 'Hotel Sonne, Küsnacht',
      de: 'Hotel Sonne, Küsnacht',
    },
    body: {
      en: 'The reception at Hotel Sonne starts at 17:00.',
      it: 'Il ricevimento all’Hotel Sonne inizierà alle 17:00.',
      de: 'Der Empfang im Hotel Sonne beginnt um 17.00 Uhr.',
    },
    status: confirmed,
  },
  {
    date: saturday,
    time: { en: '00:00', it: '00:00', de: '00.00 Uhr' },
    title: {
      en: 'Return transport',
      it: 'Trasporto di rientro',
      de: 'Rückfahrt',
    },
    location: {
      en: 'Küsnacht to Zurich',
      it: 'Da Küsnacht a Zurigo',
      de: 'Küsnacht nach Zürich',
    },
    body: {
      en: 'Return travel is planned after the reception. The transport arrangements are still to be confirmed.',
      it: 'Il rientro è previsto dopo il ricevimento. L’organizzazione del trasporto è ancora da confermare.',
      de: 'Die Rückfahrt ist nach dem Empfang geplant. Die Transportdetails sind noch zu bestätigen.',
    },
    status: toBeConfirmed,
  },
];
