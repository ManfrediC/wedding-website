import type { Lang } from './locales';

export const faqs: Record<Lang, { question: string; answer: string; links?: { label: string; href: string }[] }[]> = {
  en: [
    {
      question: 'What is the dress code?',
      answer:
        'Formal attire. Please dress for a wedding ceremony in Zurich and an evening celebration by Lake Zurich. Because part of the day may involve walking and a boat transfer, we recommend comfortable formal shoes and a light layer for the evening.',
    },
    {
      question: 'Are children invited?',
      answer:
        'Yes, children are welcome. Please include them in your RSVP so we can plan seating, food, and any practical arrangements.',
    },
    {
      question: 'Can I bring a plus one?',
      answer:
        'Partners and plus ones are welcome. Please include their name in your RSVP so we can plan accurately. This may be adjusted later if invitations define guests per household.',
    },
    {
      question: 'Is the boat transfer included?',
      answer:
        'We are planning a host-arranged boat transfer from Zurich towards Küsnacht after the ceremony. We expect to provide the necessary details for guests, and we will update this page once timing and exact arrangements are confirmed.',
    },
    {
      question: 'Do I need a car?',
      answer:
        'No. Please use public transport for travelling around Zurich; driving by car is not recommended for ordinary wedding logistics.',
    },
    {
      question: 'How do I buy a train ticket?',
      answer:
        'The easiest option is the SBB Mobile app: download it before travelling, enter your journey, choose the connection, add passengers, and buy the ticket before boarding. For the reception area, search for "Küsnacht ZH" rather than just "Küsnacht". For journeys within Zurich, the ZVV app and station ticket machines also work; ZVV tickets are zone-based and cover trains, trams, buses and boats in the selected zones. Keep the ticket and a matching ID or payment card available for inspection.',
      links: [
        { label: 'SBB: buy tickets online', href: 'https://www.sbb.ch/en/tickets-offers/buy.html' },
        { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
        { label: 'ZVV tickets', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
        {
          label: 'ZVV app ticket purchase FAQ',
          href: 'https://www.zvv.ch/en/service/apps/zvv-app/ticket-purchase-faq.html',
        },
      ],
    },
    {
      question: 'What should UK guests check before travelling?',
      answer:
        'UK nationals should check the official Switzerland entry requirements before booking and again before travelling. Current UK guidance says passports must have a date of issue less than 10 years before arrival and an expiry date at least 3 months after the day you plan to leave the Schengen area.',
      links: [
        {
          label: 'GOV.UK Switzerland entry requirements',
          href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements',
        },
      ],
    },
  ],
  it: [
    {
      question: 'Qual è il dress code?',
      answer:
        'Abbigliamento formale. Vi consigliamo di vestirvi per una cerimonia a Zurigo e una serata sul Lago di Zurigo. Poiché parte della giornata potrebbe includere una passeggiata e un trasferimento in barca, suggeriamo scarpe eleganti ma comode e uno strato leggero per la sera.',
    },
    {
      question: 'I bambini sono invitati?',
      answer:
        'Sì, i bambini sono i benvenuti. Vi chiediamo di indicarli nella RSVP così possiamo organizzare posti, menu e dettagli pratici.',
    },
    {
      question: 'Posso portare un accompagnatore?',
      answer:
        'Partner e accompagnatori sono i benvenuti. Inserite il loro nome nella RSVP così possiamo pianificare con precisione. Questa indicazione potrà essere aggiornata se gli inviti definiranno gli ospiti per nucleo familiare.',
    },
    {
      question: 'Il trasferimento in barca è incluso?',
      answer:
        'Stiamo pianificando un trasferimento in barca organizzato dagli sposi da Zurigo verso Küsnacht dopo la cerimonia. Aggiorneremo questa pagina con orari e dettagli precisi appena confermati.',
    },
    {
      question: "Serve un'auto?",
      answer:
        'No. Vi consigliamo di usare i mezzi pubblici per muovervi a Zurigo; spostarsi in auto non è consigliato per la normale logistica del matrimonio.',
    },
    {
      question: 'Come compro un biglietto del treno?',
      answer:
        'L’opzione più semplice è l’app SBB Mobile: scaricatela prima del viaggio, inserite il tragitto, scegliete il collegamento, aggiungete i passeggeri e comprate il biglietto prima di salire. Per la zona del ricevimento, cercate "Küsnacht ZH" e non solo "Küsnacht". Per gli spostamenti a Zurigo potete usare anche l’app ZVV o le biglietterie automatiche in stazione; i biglietti ZVV sono a zone e valgono su treni, tram, autobus e battelli nelle zone scelte. Tenete il biglietto e un documento o la carta di pagamento a portata di mano per eventuali controlli.',
      links: [
        { label: 'SBB: acquistare biglietti online', href: 'https://www.sbb.ch/en/tickets-offers/buy.html' },
        { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
        { label: 'Biglietti ZVV', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
        {
          label: "FAQ ZVV sull'acquisto nell'app",
          href: 'https://www.zvv.ch/en/service/apps/zvv-app/ticket-purchase-faq.html',
        },
      ],
    },
    {
      question: 'Cosa devono controllare gli ospiti britannici prima del viaggio?',
      answer:
        'I cittadini britannici dovrebbero controllare i requisiti ufficiali di ingresso in Svizzera prima di prenotare e di nuovo prima di partire. Secondo le indicazioni attuali del governo britannico, il passaporto deve essere stato emesso meno di 10 anni prima dell’arrivo e scadere almeno 3 mesi dopo il giorno previsto di uscita dall’area Schengen.',
      links: [
        {
          label: 'GOV.UK: requisiti di ingresso in Svizzera',
          href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements',
        },
      ],
    },
  ],
  de: [
    {
      question: 'Was ist der Dresscode?',
      answer:
        'Formelle Kleidung. Bitte kleidet euch passend für eine Trauung in Zürich und eine Abendfeier am Zürichsee. Da der Tag eventuell etwas Fussweg und einen Bootstransfer beinhaltet, empfehlen wir bequeme formelle Schuhe und eine leichte Schicht für den Abend.',
    },
    {
      question: 'Sind Kinder eingeladen?',
      answer:
        'Ja, Kinder sind willkommen. Bitte gebt sie in der RSVP an, damit wir Sitzplätze, Essen und praktische Details planen können.',
    },
    {
      question: 'Kann ich eine Begleitung mitbringen?',
      answer:
        'Partnerinnen, Partner und Plus-ones sind willkommen. Bitte gebt den Namen in der RSVP an, damit wir genau planen können. Diese Formulierung kann später angepasst werden, falls die Einladungen Gäste pro Haushalt festlegen.',
    },
    {
      question: 'Ist der Bootstransfer inbegriffen?',
      answer:
        'Wir planen nach der Trauung einen von uns organisierten Bootstransfer von Zürich Richtung Küsnacht. Die genauen Zeiten und Details ergänzen wir, sobald alles bestätigt ist.',
    },
    {
      question: 'Brauche ich ein Auto?',
      answer:
        'Nein. Bitte nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist für die normale Hochzeitslogistik nicht empfohlen.',
    },
    {
      question: 'Wie kaufe ich ein Zugticket?',
      answer:
        'Am einfachsten ist die App SBB Mobile: ladet sie vor der Reise herunter, gebt die Verbindung ein, wählt die passende Fahrt, fügt Reisende hinzu und kauft das Ticket vor dem Einsteigen. Für den Empfangsbereich sucht nach "Küsnacht ZH" und nicht nur nach "Küsnacht". Für Fahrten innerhalb von Zürich funktionieren auch die ZVV-App und die Automaten am Bahnhof; ZVV-Tickets gelten zonenbasiert für Züge, Trams, Busse und Schiffe in den gewählten Zonen. Haltet Ticket und einen passenden Ausweis oder die Zahlungskarte für Kontrollen bereit.',
      links: [
        { label: 'SBB: Tickets online kaufen', href: 'https://www.sbb.ch/en/tickets-offers/buy.html' },
        { label: 'SBB Mobile', href: 'https://www.sbb.ch/en/timetable/mobile-apps/sbb-mobile.html' },
        { label: 'ZVV-Tickets', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
        {
          label: 'ZVV-FAQ zum Ticketkauf in der App',
          href: 'https://www.zvv.ch/en/service/apps/zvv-app/ticket-purchase-faq.html',
        },
      ],
    },
    {
      question: 'Was sollten Gäste aus dem Vereinigten Königreich vor der Reise prüfen?',
      answer:
        'Britische Staatsangehörige sollten die offiziellen Einreisebestimmungen für die Schweiz vor der Buchung und nochmals vor der Reise prüfen. Die aktuelle britische Reiseinformation sagt, dass der Pass weniger als 10 Jahre vor der Einreise ausgestellt worden sein muss und mindestens 3 Monate nach dem geplanten Verlassen des Schengen-Raums gültig sein muss.',
      links: [
        {
          label: 'GOV.UK: Einreisebestimmungen Schweiz',
          href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements',
        },
      ],
    },
  ],
};
