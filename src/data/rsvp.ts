import type { Lang } from './locales';

type FieldCopy = {
  label: string;
  help?: string;
};

type DietaryRequirementsCopy = FieldCopy & {
  options: {
    none: string;
    vegetarian: string;
    vegan: string;
    other: string;
  };
  otherLabel: string;
};

type RsvpCopy = {
  privacy: string;
  updatesLabel: string;
  updates: string[];
  attendingLegend: string;
  attendingYes: string;
  attendingNo: string;
  primaryGuestName: FieldCopy;
  email: FieldCopy;
  guests: FieldCopy;
  adults: FieldCopy;
  adultName: string;
  addAdult: string;
  children: FieldCopy;
  childName: string;
  childAge: string;
  addChild: string;
  dietaryRequirements: DietaryRequirementsCopy;
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
    privacy:
      'We will use your RSVP information only to plan the wedding, including attendance, seating, dietary requirements, accessibility arrangements, and guest support.',
    updatesLabel: 'RSVP updates',
    updates: [
      'RSVP opening date: TBD',
      'RSVP deadline: TBD',
      'Your latest submission replaces earlier responses from the same email address.',
    ],
    attendingLegend: 'Will you be able to join us?',
    attendingYes: 'Yes, I/we will attend',
    attendingNo: 'No, sadly I/we cannot attend',
    primaryGuestName: { label: 'Your name' },
    email: { label: 'Email' },
    guests: { label: 'Guests attending', help: 'Add each adult and child who will attend, including individual dietary requirements and allergies.' },
    adults: { label: 'Adults attending', help: 'Add one row per adult.' },
    adultName: 'Adult name',
    addAdult: 'Add adult',
    children: { label: 'Children attending', help: 'Add children only if they will attend, including their ages.' },
    childName: 'Child name',
    childAge: 'Age',
    addChild: 'Add child',
    dietaryRequirements: {
      label: 'Dietary requirements',
      help: 'Select a dietary requirement for each guest.',
      options: {
        none: 'None',
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        other: 'Other (specify)',
      },
      otherLabel: 'Please specify',
    },
    allergies: { label: 'Allergies' },
    accessibilityMobility: { label: 'Accessibility or mobility considerations' },
    notes: { label: 'Notes', help: 'If you can only attend part of the day, please mention it here.' },
    submit: 'Send RSVP',
    sending: 'Sending...',
    success: 'Thank you. Your RSVP has been received.',
    error: 'Something went wrong. Please check the form and try again.',
  },
  it: {
    privacy:
      'Useremo le informazioni della RSVP solo per organizzare il matrimonio, inclusi presenza, posti a sedere, esigenze alimentari, accessibilità e supporto agli ospiti.',
    updatesLabel: 'Aggiornamenti RSVP',
    updates: [
      'Apertura RSVP: TBD',
      'Scadenza RSVP: TBD',
      'La risposta più recente sostituisce le precedenti dallo stesso indirizzo email.',
    ],
    attendingLegend: 'Potrete essere con noi?',
    attendingYes: 'Sì, parteciperò/parteciperemo',
    attendingNo: 'No, purtroppo non potrò/potremo partecipare',
    primaryGuestName: { label: 'Il vostro nome' },
    email: { label: 'Email' },
    guests: { label: 'Ospiti presenti', help: 'Aggiungete ogni adulto e bambino che parteciperà, incluse esigenze alimentari e allergie individuali.' },
    adults: { label: 'Adulti presenti', help: 'Aggiungete una riga per ogni adulto.' },
    adultName: 'Nome adulto',
    addAdult: 'Aggiungi adulto',
    children: { label: 'Bambini presenti', help: 'Aggiungete i bambini solo se parteciperanno, indicando anche l’età.' },
    childName: 'Nome bambino',
    childAge: 'Età',
    addChild: 'Aggiungi bambino',
    dietaryRequirements: {
      label: 'Esigenze alimentari',
      help: 'Selezionate un’esigenza alimentare per ogni ospite.',
      options: {
        none: 'Nessuna',
        vegetarian: 'Vegetariano/a',
        vegan: 'Vegano/a',
        other: 'Altro (specificare)',
      },
      otherLabel: 'Specificare',
    },
    allergies: { label: 'Allergie' },
    accessibilityMobility: { label: 'Considerazioni di accessibilità o mobilità' },
    notes: { label: 'Note', help: 'Se potete partecipare solo a una parte della giornata, indicatelo qui.' },
    submit: 'Invia RSVP',
    sending: 'Invio in corso...',
    success: 'Grazie. La vostra RSVP è stata ricevuta.',
    error: 'Qualcosa non ha funzionato. Controllate il modulo e riprovate.',
  },
  de: {
    privacy:
      'Wir verwenden eure RSVP-Angaben nur für die Hochzeitsplanung, einschliesslich Teilnahme, Sitzordnung, Ernährung, Barrierefreiheit und Gästebetreuung.',
    updatesLabel: 'RSVP-Hinweise',
    updates: [
      'Öffnung der RSVP: TBD',
      'RSVP-Frist: TBD',
      'Die neueste Antwort ersetzt frühere Antworten von derselben E-Mail-Adresse.',
    ],
    attendingLegend: 'Könnt ihr dabei sein?',
    attendingYes: 'Ja, ich/wir nehmen teil',
    attendingNo: 'Nein, leider kann ich/können wir nicht teilnehmen',
    primaryGuestName: { label: 'Euer Name' },
    email: { label: 'E-Mail' },
    guests: { label: 'Teilnehmende Gäste', help: 'Fügt jede erwachsene Person und jedes Kind hinzu, mit individuellen Essenswünschen und Allergien.' },
    adults: { label: 'Teilnehmende Erwachsene', help: 'Fügt eine Zeile pro erwachsene Person hinzu.' },
    adultName: 'Name Erwachsene/r',
    addAdult: 'Erwachsene Person hinzufügen',
    children: { label: 'Teilnehmende Kinder', help: 'Fügt Kinder nur hinzu, wenn sie teilnehmen, einschliesslich Alter.' },
    childName: 'Name des Kindes',
    childAge: 'Alter',
    addChild: 'Kind hinzufügen',
    dietaryRequirements: {
      label: 'Ernährungsanforderungen',
      help: 'Wählt einen Essenswunsch pro Gast aus.',
      options: {
        none: 'Keine',
        vegetarian: 'Vegetarisch',
        vegan: 'Vegan',
        other: 'Andere (bitte angeben)',
      },
      otherLabel: 'Bitte angeben',
    },
    allergies: { label: 'Allergien' },
    accessibilityMobility: { label: 'Barrierefreiheit oder Mobilität' },
    notes: { label: 'Notizen', help: 'Wenn ihr nur an einem Teil des Tages teilnehmen könnt, schreibt es bitte hier.' },
    submit: 'RSVP senden',
    sending: 'Wird gesendet...',
    success: 'Vielen Dank. Eure RSVP wurde erhalten.',
    error: 'Etwas hat nicht funktioniert. Bitte prüft das Formular und versucht es erneut.',
  },
};
