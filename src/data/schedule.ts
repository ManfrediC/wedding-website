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

const toBeConfirmed = {
  en: 'TBD',
  it: 'TBD',
  de: 'TBD',
};

export const weddingSchedule: ScheduleEntry[] = [
  {
    date: toBeConfirmed,
    time: toBeConfirmed,
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
    time: toBeConfirmed,
    title: {
      en: 'Guest arrival',
      it: 'Arrivo degli ospiti',
      de: 'Ankunft der Gäste',
    },
    location: { en: 'Kirche St. Peter, Zurich', it: 'Kirche St. Peter, Zurigo', de: 'Kirche St. Peter, Zürich' },
    body: {
      en: "Please plan to arrive at St Peter's church with plenty of time to settle in before the ceremony. We would like all guests to be seated by 1.40pm.",
      it: 'Arrivate alla Kirche St. Peter con ampio margine per sistemarvi prima della cerimonia. Vorremmo che tutti gli ospiti fossero seduti entro le 13:40.',
      de: 'Bitte kommt mit genügend Zeit in die Kirche St. Peter, damit ihr vor der Trauung in Ruhe Platz nehmen könnt. Wir möchten, dass alle Gäste bis 13.40 Uhr sitzen.',
    },
    status: { en: 'Confirmed', it: 'Confermato', de: 'Bestätigt' },
  },
  {
    date: weddingDate,
    time: toBeConfirmed,
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
    status: { en: 'To confirm', it: 'Da confermare', de: 'Noch zu bestätigen' },
  },
  {
    date: weddingDate,
    time: { en: '4pm', it: '16:00', de: '16.00 Uhr' },
    title: {
      en: 'Boat transfer to Küsnacht',
      it: 'Trasferimento in barca a Küsnacht',
      de: 'Bootstransfer nach Küsnacht',
    },
    location: { en: 'Quai 6, Bürkliplatz, Zürich', it: 'Quai 6, Bürkliplatz, Zurigo', de: 'Quai 6, Bürkliplatz, Zürich' },
    body: {
      en: 'After the ceremony, guests will walk to Quai 6 at Bürkliplatz with family members. Please be there by 3.45pm for boarding; the boat leaves for Küsnacht at 4pm.',
      it: 'Dopo la cerimonia, gli ospiti andranno a piedi al Quai 6 a Bürkliplatz accompagnati dai familiari. Vi chiediamo di essere lì entro le 15:45 per l’imbarco; la barca partirà per Küsnacht alle 16:00.',
      de: 'Nach der Trauung gehen die Gäste gemeinsam mit Familienmitgliedern zum Quai 6 am Bürkliplatz. Bitte seid bis 15.45 Uhr zum Einsteigen dort; das Schiff fährt um 16.00 Uhr nach Küsnacht ab.',
    },
    status: { en: 'Confirmed', it: 'Confermato', de: 'Bestätigt' },
  },
  {
    date: weddingDate,
    time: toBeConfirmed,
    title: {
      en: 'Aperitivo, dinner, and dancing',
      it: 'Aperitivo, cena e festa',
      de: 'Aperitif, Abendessen und Feier',
    },
    location: { en: 'Hotel Sonne, Küsnacht', it: 'Hotel Sonne, Küsnacht', de: 'Hotel Sonne, Küsnacht' },
    body: {
      en: 'The celebration continues by the water at Hotel Sonne in Küsnacht.',
      it: "La celebrazione continuerà sul lago all'Hotel Sonne di Küsnacht.",
      de: 'Die Feier geht direkt am Wasser im Hotel Sonne in Küsnacht weiter.',
    },
    status: { en: 'To confirm', it: 'Da confermare', de: 'Noch zu bestätigen' },
  },
  {
    date: weddingDate,
    time: toBeConfirmed,
    title: {
      en: 'Return travel',
      it: 'Rientro',
      de: 'Rückreise',
    },
    location: { en: 'Küsnacht to Zurich', it: 'Da Küsnacht a Zurigo', de: 'Küsnacht nach Zürich' },
    body: {
      en: 'Late-night transport options will be added once the party timing is final.',
      it: 'Le opzioni per il rientro serale saranno aggiunte quando gli orari della festa saranno definitivi.',
      de: 'Informationen zur Rückfahrt am Abend folgen, sobald die Zeiten der Feier final sind.',
    },
    status: { en: 'To confirm', it: 'Da confermare', de: 'Noch zu bestätigen' },
  },
];
