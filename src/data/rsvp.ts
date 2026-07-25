import type { Lang } from './locales';

type FieldCopy = {
  label: string;
  help?: string;
};

type DietaryRequirementsCopy = FieldCopy & {
  options: {
    meat: string;
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
  phoneCountryCode: FieldCopy;
  phoneNumber: FieldCopy;
  address: FieldCopy;
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
      'We will use your RSVP information only for wedding planning and to contact you if needed.',
    updatesLabel: 'RSVP updates',
    updates: [
      'Your latest submission replaces earlier responses from the same email address.',
    ],
    attendingLegend: 'Will you be able to join us?',
    attendingYes: 'Yes, I/we will attend',
    attendingNo: 'No, sadly I/we cannot attend',
    primaryGuestName: { label: 'Your name' },
    email: { label: 'Email' },
    phoneCountryCode: { label: 'Country code' },
    phoneNumber: { label: 'Phone number', help: 'Choose a country code or include it in the number.' },
    address: { label: 'Address', help: 'Optional.' },
    guests: { label: 'Guests attending', help: 'Please add each guest named on your invitation, including their desired menu, allergies and dietary requirements.' },
    adults: { label: 'Adults attending', help: 'Please add only the adults named on your invitation.' },
    adultName: 'Adult name',
    addAdult: 'Add adult',
    children: { label: 'Children attending', help: 'Our celebration is adults-focused, with the exception of children in our immediate families. Please add children only if they were named on your invitation.' },
    childName: 'Child name',
    childAge: 'Age',
    addChild: 'Add child',
    dietaryRequirements: {
      label: 'Desired menu',
      help: 'Select a menu for each guest.',
      options: {
        meat: 'Meat',
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        other: 'Other (specify)',
      },
      otherLabel: 'Please specify',
    },
    allergies: { label: 'Allergies and dietary requirements' },
    accessibilityMobility: { label: 'Accessibility or mobility considerations' },
    notes: { label: 'Notes' },
    submit: 'Send RSVP',
    sending: 'Sending...',
    success: 'Thank you. Your RSVP has been received.',
    error: 'Something went wrong. Please check the form and try again.',
  },
  it: {
    privacy:
      'Useremo le informazioni della RSVP solo per organizzare il matrimonio e per contattarvi se necessario.',
    updatesLabel: 'Aggiornamenti RSVP',
    updates: [
      'La risposta più recente sostituisce le precedenti dallo stesso indirizzo email.',
    ],
    attendingLegend: 'Potrete essere con noi?',
    attendingYes: 'Sì, parteciperò/parteciperemo',
    attendingNo: 'No, purtroppo non potrò/potremo partecipare',
    primaryGuestName: { label: 'Il vostro nome' },
    email: { label: 'Email' },
    phoneCountryCode: { label: 'Prefisso internazionale' },
    phoneNumber: { label: 'Numero di telefono', help: 'Scegliete un prefisso o includetelo nel numero.' },
    address: { label: 'Indirizzo', help: 'Facoltativo.' },
    guests: { label: 'Ospiti presenti', help: 'Aggiungete ogni ospite indicato nel vostro invito, inclusi la scelta del menu, le allergie e le esigenze alimentari individuali.' },
    adults: { label: 'Adulti presenti', help: 'Aggiungete solo gli adulti indicati nel vostro invito.' },
    adultName: 'Nome adulto',
    addAdult: 'Aggiungi adulto',
    children: { label: 'Bambini presenti', help: 'La nostra festa è pensata per gli adulti, con l’eccezione dei bambini delle nostre famiglie più strette. Aggiungete i bambini solo se erano indicati nel vostro invito.' },
    childName: 'Nome bambino',
    childAge: 'Età',
    addChild: 'Aggiungi bambino',
    dietaryRequirements: {
      label: 'Scelta del menu',
      help: 'Selezionate il menu desiderato per ogni ospite.',
      options: {
        meat: 'Carne',
        vegetarian: 'Vegetariano/a',
        vegan: 'Vegano/a',
        other: 'Altro (specificare)',
      },
      otherLabel: 'Specificare',
    },
    allergies: { label: 'Allergie ed esigenze alimentari' },
    accessibilityMobility: { label: 'Considerazioni di accessibilità o mobilità' },
    notes: { label: 'Note' },
    submit: 'Invia RSVP',
    sending: 'Invio in corso...',
    success: 'Grazie. La vostra RSVP è stata ricevuta.',
    error: 'Qualcosa non ha funzionato. Controllate il modulo e riprovate.',
  },
  de: {
    privacy:
      'Wir verwenden eure RSVP-Angaben nur für die Hochzeitsplanung und um euch bei Bedarf zu kontaktieren.',
    updatesLabel: 'RSVP-Hinweise',
    updates: [
      'Die neueste Antwort ersetzt frühere Antworten von derselben E-Mail-Adresse.',
    ],
    attendingLegend: 'Könnt ihr dabei sein?',
    attendingYes: 'Ja, ich/wir nehmen teil',
    attendingNo: 'Nein, leider kann ich/können wir nicht teilnehmen',
    primaryGuestName: { label: 'Euer Name' },
    email: { label: 'E-Mail' },
    phoneCountryCode: { label: 'Ländervorwahl' },
    phoneNumber: { label: 'Telefonnummer', help: 'Wählt eine Vorwahl aus oder gebt sie direkt in der Nummer an.' },
    address: { label: 'Adresse', help: 'Optional.' },
    guests: { label: 'Teilnehmende Gäste', help: 'Bitte fügt jede in eurer Einladung genannte Person mit individuellem Essenswunsch sowie Allergien und Ernährungsanforderungen hinzu.' },
    adults: { label: 'Teilnehmende Erwachsene', help: 'Bitte fügt nur die in eurer Einladung genannten Erwachsenen hinzu.' },
    adultName: 'Name Erwachsene/r',
    addAdult: 'Erwachsene Person hinzufügen',
    children: { label: 'Teilnehmende Kinder', help: 'Unsere Feier ist auf Erwachsene ausgerichtet, mit Ausnahme der Kinder aus unseren engsten Familien. Bitte fügt Kinder nur hinzu, wenn sie in eurer Einladung genannt wurden.' },
    childName: 'Name des Kindes',
    childAge: 'Alter',
    addChild: 'Kind hinzufügen',
    dietaryRequirements: {
      label: 'Essenswunsch',
      help: 'Wählt einen Essenswunsch pro Gast aus.',
      options: {
        meat: 'Fleisch',
        vegetarian: 'Vegetarisch',
        vegan: 'Vegan',
        other: 'Andere (bitte angeben)',
      },
      otherLabel: 'Bitte angeben',
    },
    allergies: { label: 'Allergien und Ernährungsanforderungen' },
    accessibilityMobility: { label: 'Barrierefreiheit oder Mobilität' },
    notes: { label: 'Notizen' },
    submit: 'RSVP senden',
    sending: 'Wird gesendet...',
    success: 'Vielen Dank. Eure RSVP wurde erhalten.',
    error: 'Etwas hat nicht funktioniert. Bitte prüft das Formular und versucht es erneut.',
  },
};
