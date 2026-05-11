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
        'The easiest option is the SBB Mobile app: enter your journey, choose the connection, add passengers, and buy the ticket before boarding. For journeys within Zurich, the ZVV app and station ticket machines also work; ZVV tickets are zone-based and cover trains, trams, buses and boats in the selected zones. Keep the ticket and a matching ID or payment card available for inspection.',
      links: [
        { label: 'SBB: buy tickets online', href: 'https://www.sbb.ch/en/tickets-offers/buy.html' },
        { label: 'ZVV tickets', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
        {
          label: 'ZVV app ticket purchase FAQ',
          href: 'https://www.zvv.ch/en/service/apps/zvv-app/ticket-purchase-faq.html',
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
        "L'opzione più semplice è l'app SBB Mobile: inserite il tragitto, scegliete il collegamento, aggiungete i passeggeri e comprate il biglietto prima di salire. Per gli spostamenti a Zurigo potete usare anche l'app ZVV o le biglietterie automatiche in stazione; i biglietti ZVV sono a zone e valgono su treni, tram, autobus e battelli nelle zone scelte. Tenete il biglietto e un documento o la carta di pagamento a portata di mano per eventuali controlli.",
      links: [
        { label: 'SBB: acquistare biglietti online', href: 'https://www.sbb.ch/en/tickets-offers/buy.html' },
        { label: 'Biglietti ZVV', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
        {
          label: "FAQ ZVV sull'acquisto nell'app",
          href: 'https://www.zvv.ch/en/service/apps/zvv-app/ticket-purchase-faq.html',
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
        'Am einfachsten ist die App SBB Mobile: Verbindung eingeben, passende Fahrt auswählen, Reisende hinzufügen und das Ticket vor dem Einsteigen kaufen. Für Fahrten innerhalb von Zürich funktionieren auch die ZVV-App und die Automaten am Bahnhof; ZVV-Tickets gelten zonenbasiert für Züge, Trams, Busse und Schiffe in den gewählten Zonen. Haltet Ticket und einen passenden Ausweis oder die Zahlungskarte für Kontrollen bereit.',
      links: [
        { label: 'SBB: Tickets online kaufen', href: 'https://www.sbb.ch/en/tickets-offers/buy.html' },
        { label: 'ZVV-Tickets', href: 'https://www.zvv.ch/en/travelcards-and-tickets/tickets.html' },
        {
          label: 'ZVV-FAQ zum Ticketkauf in der App',
          href: 'https://www.zvv.ch/en/service/apps/zvv-app/ticket-purchase-faq.html',
        },
      ],
    },
  ],
};
