import type { Lang } from './locales';

export type ScheduleEntry = {
  date: Record<Lang, string>;
  time: Record<Lang, string>;
  title: Record<Lang, string>;
  location: Record<Lang, string>;
  body: Record<Lang, string>;
  status: Record<Lang, string>;
  image?: string;
  imageAlt?: Record<Lang, string>;
};

const weddingDate = {
  en: 'Friday, 11 June 2027',
  it: 'Venerdì 11 giugno 2027',
  de: 'Freitag, 11. Juni 2027',
};

const civilCeremonyDate = {
  en: 'Thursday, 10 June 2027',
  it: 'Giovedì 10 giugno 2027',
  de: 'Donnerstag, 10. Juni 2027',
};

const followingDay = {
  en: 'Saturday, 12 June 2027',
  it: 'Sabato, 12 giugno 2027',
  de: 'Samstag, 12. Juni 2027',
};

const civilCeremonyTime = {
  en: '11:30',
  it: '11:30',
  de: '11.30 Uhr',
};

const guestArrivalTime = {
  en: '13:30',
  it: '13:30',
  de: '13.30 Uhr',
};

const ceremonyTime = {
  en: '14:00',
  it: '14:00',
  de: '14.00 Uhr',
};

const receptionTime = {
  en: '17:00',
  it: '17:00',
  de: '17.00 Uhr',
};

const returnTime = {
  en: '00:00',
  it: '00:00',
  de: '00.00 Uhr',
};

const toBeConfirmed = {
  en: 'TBD',
  it: 'TBD',
  de: 'TBD',
};

const confirmed = {
  en: 'Confirmed',
  it: 'Confermato',
  de: 'Bestätigt',
};

const toBeConfirmedStatus = {
  en: 'To be confirmed',
  it: 'Da confermare',
  de: 'Noch zu bestätigen',
};

export const weddingSchedule: ScheduleEntry[] = [
  {
    date: civilCeremonyDate,
    time: civilCeremonyTime,
    title: {
      en: 'Civil Ceremony at Stadthaus Zürich',
      it: 'Cerimonia civile allo Stadthaus Zürich',
      de: 'Zivile Trauung im Stadthaus Zürich',
    },
    location: { en: 'Stadthaus Zürich', it: 'Stadthaus Zürich', de: 'Stadthaus Zürich' },
    body: {
      en: 'The legal civil ceremony will be a private step before the wedding celebration. Because of visitor constraints at Stadthaus Zürich, only immediate family will be able to attend.',
      it: 'La cerimonia civile legale sarà un momento privato prima della celebrazione. Per i limiti di accesso allo Stadthaus Zürich potranno partecipare solo i familiari più stretti.',
      de: 'Die zivile Trauung ist ein privater rechtlicher Schritt vor der Hochzeitsfeier. Wegen Besucherbeschränkungen im Stadthaus Zürich können nur die engsten Familienmitglieder teilnehmen.',
    },
    status: { en: 'Private', it: 'Privata', de: 'Privat' },
  },
  {
    date: weddingDate,
    time: guestArrivalTime,
    title: {
      en: 'Guest arrival',
      it: 'Arrivo degli ospiti',
      de: 'Ankunft der Gäste',
    },
    location: { en: 'Kirche St. Peter, Zurich', it: 'Kirche St. Peter, Zurigo', de: 'Kirche St. Peter, Zürich' },
    body: {
      en: "Please plan to arrive at St Peter's church with plenty of time to settle in before the ceremony. We would like all guests to be seated by 13:40.",
      it: 'Arrivate alla Kirche St. Peter con ampio margine per sistemarvi prima della cerimonia. Vorremmo che tutti gli ospiti fossero seduti entro le 13:40.',
      de: 'Bitte kommt mit genügend Zeit in die Kirche St. Peter, damit ihr vor der Trauung in Ruhe Platz nehmen könnt. Wir möchten, dass alle Gäste bis 13.40 Uhr sitzen.',
    },
    status: confirmed,
  },
  {
    date: weddingDate,
    time: ceremonyTime,
    title: {
      en: 'Ceremony',
      it: 'Cerimonia',
      de: 'Trauung',
    },
    location: { en: 'Kirche St. Peter, Zurich', it: 'Kirche St. Peter, Zurigo', de: 'Kirche St. Peter, Zürich' },
    body: {
      en: 'The day begins in Zurich old town at Kirche St. Peter.',
      it: 'La giornata inizierà nel centro storico di Zurigo, alla Kirche St. Peter.',
      de: 'Der Tag beginnt in der Zürcher Altstadt in der Kirche St. Peter.',
    },
    status: confirmed,
  },
  {
    date: weddingDate,
    time: toBeConfirmed,
    title: {
      en: 'Boat transfer to Küsnacht',
      it: 'Trasferimento in barca a Küsnacht',
      de: 'Bootstransfer nach Küsnacht',
    },
    location: { en: 'Quai 6, Bürkliplatz, Zürich', it: 'Quai 6, Bürkliplatz, Zurigo', de: 'Quai 6, Bürkliplatz, Zürich' },
    body: {
      en: 'After the ceremony, guests will walk to Quai 6 at Bürkliplatz with family members. Please board 15 minutes before departure; the boat leaves for Küsnacht around 16:30 (to be confirmed).',
      it: 'Dopo la cerimonia, gli ospiti andranno a piedi al Quai 6 a Bürkliplatz accompagnati dai familiari. Vi chiediamo di salire a bordo 15 minuti prima della partenza; la barca partirà per Küsnacht intorno alle 16:30 (da confermare).',
      de: 'Nach der Trauung gehen die Gäste gemeinsam mit Familienmitgliedern zum Quai 6 am Bürkliplatz. Bitte steigt 15 Minuten vor der Abfahrt ein; das Schiff fährt gegen 16.30 Uhr nach Küsnacht ab (noch zu bestätigen).',
    },
    status: toBeConfirmedStatus,
  },
  {
    date: weddingDate,
    time: receptionTime,
    title: {
      en: 'Aperitivo, dinner, and dancing',
      it: 'Aperitivo, cena e festa',
      de: 'Apéro, Abendessen und Feier',
    },
    location: { en: 'Hotel Sonne, Küsnacht', it: 'Hotel Sonne, Küsnacht', de: 'Hotel Sonne, Küsnacht' },
    body: {
      en: 'The celebration continues by the water at Hotel Sonne in Küsnacht.',
      it: "La celebrazione continuerà sul lago all'Hotel Sonne di Küsnacht.",
      de: 'Die Feier geht direkt am Wasser im Hotel Sonne in Küsnacht weiter.',
    },
    status: confirmed,
  },
  {
    date: followingDay,
    time: returnTime,
    title: {
      en: 'Return travel',
      it: 'Rientro',
      de: 'Rückreise',
    },
    location: { en: 'Küsnacht to Zurich', it: 'Da Küsnacht a Zurigo', de: 'Küsnacht nach Zürich' },
    body: {
      en: 'Return travel is planned after the celebration. Practical details and recommended transport options will be added closer to the date.',
      it: 'Il rientro è previsto dopo la festa. I dettagli pratici e le opzioni di trasporto consigliate saranno aggiunti più avanti.',
      de: 'Die Rückfahrt ist nach der Feier geplant. Praktische Details und empfohlene Transportmöglichkeiten folgen näher am Datum.',
    },
    status: confirmed,
  },
];
