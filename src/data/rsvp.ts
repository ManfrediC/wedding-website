import type { Lang } from './locales';

type FieldCopy = {
  label: string;
  help?: string;
};

type RsvpCopy = {
  formTitle: string;
  formIntro: string;
  privacy: string;
  replacement: string;
  attendingLegend: string;
  attendingYes: string;
  attendingNo: string;
  primaryGuestName: FieldCopy;
  email: FieldCopy;
  adults: FieldCopy;
  adultName: string;
  addAdult: string;
  children: FieldCopy;
  childName: string;
  childAge: string;
  addChild: string;
  dietaryRequirements: FieldCopy;
  allergies: FieldCopy;
  accessibilityMobility: FieldCopy;
  notes: FieldCopy;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

export const rsvpCopy: Record<Lang, RsvpCopy> = {
  en: {
    formTitle: 'Please respond',
    formIntro: 'Let us know whether you will be able to join us in Zurich.',
    privacy:
      'We will use your RSVP information only to plan the wedding, including attendance, seating, dietary requirements, accessibility arrangements, and guest support.',
    replacement: 'If you submit again with the same email address, your latest response will replace the previous one.',
    attendingLegend: 'Will you be able to join us?',
    attendingYes: 'Yes, I/we will attend',
    attendingNo: 'No, sadly I/we cannot attend',
    primaryGuestName: { label: 'Your name' },
    email: { label: 'Email' },
    adults: { label: 'Adults attending', help: 'Add each adult who will attend.' },
    adultName: 'Adult name',
    addAdult: 'Add adult',
    children: { label: 'Children attending', help: 'Add children only if they will attend.' },
    childName: 'Child name',
    childAge: 'Age',
    addChild: 'Add child',
    dietaryRequirements: { label: 'Dietary requirements', help: 'For children’s meal needs, use the notes box.' },
    allergies: { label: 'Allergies' },
    accessibilityMobility: { label: 'Accessibility or mobility considerations' },
    notes: { label: 'Notes', help: 'If you can only attend part of the day, please mention it here.' },
    submit: 'Send RSVP',
    sending: 'Sending...',
    success: 'Thank you. Your RSVP has been received.',
    error: 'Something went wrong. Please check the form and try again.',
  },
  it: {
    formTitle: 'Conferma di presenza',
    formIntro: 'Fateci sapere se potrete unirvi a noi a Zurigo.',
    privacy:
      'Useremo le informazioni della RSVP solo per organizzare il matrimonio, inclusi presenza, posti a sedere, esigenze alimentari, accessibilità e supporto agli ospiti.',
    replacement: 'Se inviate di nuovo il modulo con lo stesso indirizzo email, la risposta più recente sostituirà quella precedente.',
    attendingLegend: 'Potrete essere con noi?',
    attendingYes: 'Sì, parteciperò/parteciperemo',
    attendingNo: 'No, purtroppo non potrò/potremo partecipare',
    primaryGuestName: { label: 'Il vostro nome' },
    email: { label: 'Email' },
    adults: { label: 'Adulti presenti', help: 'Aggiungete ogni adulto che parteciperà.' },
    adultName: 'Nome adulto',
    addAdult: 'Aggiungi adulto',
    children: { label: 'Bambini presenti', help: 'Aggiungete i bambini solo se parteciperanno.' },
    childName: 'Nome bambino',
    childAge: 'Età',
    addChild: 'Aggiungi bambino',
    dietaryRequirements: { label: 'Esigenze alimentari', help: 'Per esigenze dei bambini, usate le note.' },
    allergies: { label: 'Allergie' },
    accessibilityMobility: { label: 'Considerazioni di accessibilità o mobilità' },
    notes: { label: 'Note', help: 'Se potete partecipare solo a una parte della giornata, indicatelo qui.' },
    submit: 'Invia RSVP',
    sending: 'Invio in corso...',
    success: 'Grazie. La vostra RSVP è stata ricevuta.',
    error: 'Qualcosa non ha funzionato. Controllate il modulo e riprovate.',
  },
  de: {
    formTitle: 'Rückmeldung',
    formIntro: 'Bitte sagt uns, ob ihr in Zürich mit uns feiern könnt.',
    privacy:
      'Wir verwenden eure RSVP-Angaben nur für die Hochzeitsplanung, einschliesslich Teilnahme, Sitzordnung, Ernährung, Barrierefreiheit und Gästebetreuung.',
    replacement: 'Wenn ihr mit derselben E-Mail-Adresse erneut absendet, ersetzt die neue Antwort die vorherige.',
    attendingLegend: 'Könnt ihr dabei sein?',
    attendingYes: 'Ja, ich/wir nehmen teil',
    attendingNo: 'Nein, leider kann ich/können wir nicht teilnehmen',
    primaryGuestName: { label: 'Euer Name' },
    email: { label: 'E-Mail' },
    adults: { label: 'Teilnehmende Erwachsene', help: 'Fügt jede erwachsene Person hinzu, die teilnimmt.' },
    adultName: 'Name Erwachsene/r',
    addAdult: 'Erwachsene Person hinzufügen',
    children: { label: 'Teilnehmende Kinder', help: 'Fügt Kinder nur hinzu, wenn sie teilnehmen.' },
    childName: 'Name des Kindes',
    childAge: 'Alter',
    addChild: 'Kind hinzufügen',
    dietaryRequirements: { label: 'Ernährungsanforderungen', help: 'Essenswünsche für Kinder bitte in den Notizen angeben.' },
    allergies: { label: 'Allergien' },
    accessibilityMobility: { label: 'Barrierefreiheit oder Mobilität' },
    notes: { label: 'Notizen', help: 'Wenn ihr nur an einem Teil des Tages teilnehmen könnt, schreibt es bitte hier.' },
    submit: 'RSVP senden',
    sending: 'Wird gesendet...',
    success: 'Vielen Dank. Eure RSVP wurde erhalten.',
    error: 'Etwas hat nicht funktioniert. Bitte prüft das Formular und versucht es erneut.',
  },
};
