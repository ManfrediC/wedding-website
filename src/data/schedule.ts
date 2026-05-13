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
    image: '/images/places/stadthaus-zurich.png',
    imageAlt: {
      en: 'Facade of Stadthaus Zürich under a blue sky',
      it: 'Facciata dello Stadthaus Zürich sotto un cielo blu',
      de: 'Fassade des Stadthauses Zürich unter blauem Himmel',
    },
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
      en: 'Please plan to arrive with time to settle in before the ceremony. The exact arrival time will be added once confirmed.',
      it: "Vi consigliamo di arrivare con un po' di anticipo prima della cerimonia. L'orario preciso sarà aggiunto appena confermato.",
      de: 'Bitte plant etwas Zeit ein, um vor der Trauung in Ruhe anzukommen. Die genaue Ankunftszeit folgt, sobald sie bestätigt ist.',
    },
    status: { en: 'To confirm', it: 'Da confermare', de: 'Noch zu bestätigen' },
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
    time: toBeConfirmed,
    title: {
      en: 'Boat transfer towards Küsnacht',
      it: 'Trasferimento in barca verso Küsnacht',
      de: 'Bootstransfer nach Küsnacht',
    },
    location: { en: 'Lake Zurich', it: 'Lago di Zurigo', de: 'Zürichsee' },
    body: {
      en: 'We are planning a host-arranged boat transfer after the ceremony. Boarding point, timing, and rain plan are still to be confirmed.',
      it: 'Stiamo pianificando un trasferimento in barca organizzato dagli sposi dopo la cerimonia. Punto di partenza, orari e piano in caso di pioggia sono ancora da confermare.',
      de: 'Nach der Trauung planen wir einen von uns organisierten Bootstransfer. Abfahrtsort, Zeiten und Regenplan werden noch bestätigt.',
    },
    status: { en: 'Planned', it: 'Previsto', de: 'Geplant' },
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
