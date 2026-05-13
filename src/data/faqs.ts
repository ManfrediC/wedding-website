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
        'No. Use public transport for travelling around Zurich; driving by car is not recommended due to lack of parking space and poor convenience.',
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
      question: 'Are there visa requirements for Switzerland?',
      answer:
        'For a normal wedding trip, EU/EFTA citizens do not need a visa but should carry a valid national ID card or passport. UK British citizen passport holders can visit Switzerland and the Schengen area visa-free for up to 90 days in any 180-day period; current UK guidance says the passport must have been issued less than 10 years before arrival and expire at least 3 months after the planned departure from the Schengen area. US citizens do not need a tourist visa for stays under 90 days; the US State Department advises a passport valid for at least 6 months from entry, plus proof of funds and a return or onward ticket. ETIAS is expected for visa-exempt non-EU travellers after launch, so UK and US guests should check the official guidance again closer to June 2027.',
      links: [
        { label: 'Swiss SEM entry guidance', href: 'https://www.sem.admin.ch/sem/en/home/overview-einreise.html' },
        {
          label: 'Swiss SEM: EU/EFTA entry',
          href: 'https://www.sem.admin.ch/sem/en/home/themen/einreise/info-einreise/voraussetzungen-nach-staat/ohne-visum.html',
        },
        {
          label: 'GOV.UK Switzerland entry requirements',
          href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements',
        },
        {
          label: 'US State Department: Switzerland',
          href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Switzerland.html',
        },
      ],
    },
    {
      question: 'What should I know about Swiss customs checks?',
      answer:
        'Swiss customs rules are separate from passport control. As a starting point, goods for personal use or gifts are VAT-free only up to CHF 150 total value per person per day, and alcohol, tobacco, meat, butter, cream, oils, and similar sensitive goods have separate quantity allowances. Animal products are permitted only from EU member states, Iceland, Northern Ireland, and Norway; they are prohibited from other countries, so guests arriving from Great Britain or the USA should avoid packing meat, cheese, butter, cream, or similar animal-product food gifts. EU guests still need to stay within the allowances or declare and pay what is due. Swiss customs and border officers can be very strict at land borders, especially if you are driving or arriving by train with shopping, food, alcohol, or gifts. Checks are less likely at the airport, but they can still happen and the same rules apply.',
      links: [
        {
          label: 'Swiss customs allowances',
          href: 'https://www.bazg.admin.ch/en/duty-free-allowances-foodstuffs-alcohol-and-tobacco',
        },
        {
          label: 'Swiss VAT-free limit',
          href: 'https://www.bazg.admin.ch/en/value-added-tax-vat-chf-150-tax-free-limit',
        },
        {
          label: 'Swiss airport customs channels',
          href: 'https://www.bazg.admin.ch/en/air-travel-customs-border-crossing',
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
        'No. Usate i mezzi pubblici per muovervi a Zurigo; spostarsi in auto non è consigliato per la mancanza di parcheggi e la scarsa praticità.',
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
      question: 'Ci sono requisiti di visto per la Svizzera?',
      answer:
        'Per un normale viaggio per il matrimonio, i cittadini UE/AELS non hanno bisogno di visto, ma devono portare una carta d’identità nazionale o un passaporto validi. I cittadini britannici con passaporto British citizen possono visitare la Svizzera e l’area Schengen senza visto fino a 90 giorni in un periodo di 180 giorni; secondo le indicazioni attuali del governo britannico, il passaporto deve essere stato emesso meno di 10 anni prima dell’arrivo e scadere almeno 3 mesi dopo l’uscita prevista dall’area Schengen. I cittadini statunitensi non hanno bisogno di visto turistico per soggiorni inferiori a 90 giorni; il Dipartimento di Stato USA raccomanda un passaporto valido almeno 6 mesi dalla data di ingresso, oltre a prova di mezzi sufficienti e biglietto di ritorno o proseguimento. ETIAS è previsto per i viaggiatori non UE esenti da visto dopo il lancio, quindi ospiti britannici e statunitensi dovrebbero ricontrollare le indicazioni ufficiali vicino a giugno 2027.',
      links: [
        { label: 'SEM svizzero: ingresso', href: 'https://www.sem.admin.ch/sem/en/home/overview-einreise.html' },
        {
          label: 'SEM svizzero: ingresso UE/AELS',
          href: 'https://www.sem.admin.ch/sem/en/home/themen/einreise/info-einreise/voraussetzungen-nach-staat/ohne-visum.html',
        },
        {
          label: 'GOV.UK: requisiti di ingresso in Svizzera',
          href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements',
        },
        {
          label: 'Dipartimento di Stato USA: Svizzera',
          href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Switzerland.html',
        },
      ],
    },
    {
      question: 'Cosa bisogna sapere sui controlli doganali svizzeri?',
      answer:
        'Le regole doganali svizzere sono separate dal controllo passaporti. Come punto di partenza, i beni per uso personale o regalo sono esenti da IVA solo fino a CHF 150 di valore totale per persona al giorno, e alcool, tabacco, carne, burro, panna, oli e altri prodotti sensibili hanno limiti quantitativi separati. I prodotti di origine animale sono ammessi solo dagli Stati membri UE, Islanda, Irlanda del Nord e Norvegia; sono vietati dagli altri paesi, quindi chi arriva dalla Gran Bretagna o dagli Stati Uniti dovrebbe evitare carne, formaggi, burro, panna o regali alimentari simili di origine animale. Anche chi arriva dall’UE deve rispettare le franchigie oppure dichiarare e pagare quanto dovuto. Le guardie doganali e di frontiera svizzere possono essere molto severe ai confini terrestri, soprattutto se si arriva in auto o in treno con acquisti, cibo, alcool o regali. I controlli sono meno probabili in aeroporto, ma possono comunque avvenire e valgono le stesse regole.',
      links: [
        {
          label: 'Franchigie doganali svizzere',
          href: 'https://www.bazg.admin.ch/en/duty-free-allowances-foodstuffs-alcohol-and-tobacco',
        },
        {
          label: 'Limite svizzero esente IVA',
          href: 'https://www.bazg.admin.ch/en/value-added-tax-vat-chf-150-tax-free-limit',
        },
        {
          label: 'Canali doganali negli aeroporti svizzeri',
          href: 'https://www.bazg.admin.ch/en/air-travel-customs-border-crossing',
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
        'Nein. Nutzt den öffentlichen Verkehr für Wege in Zürich; Autofahren ist wegen fehlender Parkplätze und geringer Bequemlichkeit nicht empfohlen.',
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
      question: 'Brauche ich ein Visum für die Schweiz?',
      answer:
        'Für eine normale Hochzeitsreise brauchen EU-/EFTA-Bürgerinnen und -Bürger kein Visum, müssen aber eine gültige nationale Identitätskarte oder einen Pass mitführen. Britische Staatsangehörige mit British-citizen-Pass können die Schweiz und den Schengen-Raum bis zu 90 Tage innerhalb von 180 Tagen visumfrei besuchen; laut aktueller britischer Reiseinformation muss der Pass weniger als 10 Jahre vor der Einreise ausgestellt worden sein und mindestens 3 Monate nach dem geplanten Verlassen des Schengen-Raums gültig sein. US-Staatsangehörige brauchen für touristische Aufenthalte unter 90 Tagen kein Visum; das US-Aussenministerium empfiehlt einen Pass, der ab Einreise mindestens 6 Monate gültig ist, sowie Nachweise über ausreichende Mittel und ein Rück- oder Weiterreiseticket. ETIAS ist nach der Einführung für visumfreie Nicht-EU-Reisende vorgesehen, daher sollten Gäste aus Grossbritannien und den USA die offiziellen Hinweise vor Juni 2027 erneut prüfen.',
      links: [
        { label: 'Schweizer SEM: Einreise', href: 'https://www.sem.admin.ch/sem/en/home/overview-einreise.html' },
        {
          label: 'Schweizer SEM: Einreise EU/EFTA',
          href: 'https://www.sem.admin.ch/sem/en/home/themen/einreise/info-einreise/voraussetzungen-nach-staat/ohne-visum.html',
        },
        {
          label: 'GOV.UK: Einreisebestimmungen Schweiz',
          href: 'https://www.gov.uk/foreign-travel-advice/switzerland/entry-requirements',
        },
        {
          label: 'US-Aussenministerium: Schweiz',
          href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Switzerland.html',
        },
      ],
    },
    {
      question: 'Was sollte ich zu Schweizer Zollkontrollen wissen?',
      answer:
        'Die Schweizer Zollregeln sind vom Passkontrollrecht getrennt. Als Ausgangspunkt gilt: Waren für den persönlichen Gebrauch oder als Geschenk sind nur bis zu einem Gesamtwert von CHF 150 pro Person und Tag mehrwertsteuerfrei; für Alkohol, Tabak, Fleisch, Butter, Rahm, Öle und ähnliche sensible Waren gelten zusätzliche Mengenfreigrenzen. Tierische Produkte sind nur aus EU-Mitgliedstaaten, Island, Nordirland und Norwegen erlaubt; aus anderen Ländern sind sie verboten. Gäste aus Grossbritannien oder den USA sollten daher kein Fleisch, keinen Käse, keine Butter, keinen Rahm und keine ähnlichen Lebensmittelgeschenke tierischen Ursprungs einpacken. Auch Gäste aus der EU müssen innerhalb der Freigrenzen bleiben oder die Waren deklarieren und die Abgaben bezahlen. Schweizer Zoll- und Grenzbeamte können an Landgrenzen sehr streng sein, besonders bei der Einreise mit Auto oder Zug und mit Einkäufen, Lebensmitteln, Alkohol oder Geschenken. Kontrollen sind am Flughafen weniger wahrscheinlich, können aber trotzdem stattfinden; die Regeln gelten gleich.',
      links: [
        {
          label: 'Schweizer Zollfreigrenzen',
          href: 'https://www.bazg.admin.ch/en/duty-free-allowances-foodstuffs-alcohol-and-tobacco',
        },
        {
          label: 'Schweizer Mehrwertsteuerfreigrenze',
          href: 'https://www.bazg.admin.ch/en/value-added-tax-vat-chf-150-tax-free-limit',
        },
        {
          label: 'Schweizer Zollkanäle am Flughafen',
          href: 'https://www.bazg.admin.ch/en/air-travel-customs-border-crossing',
        },
      ],
    },
  ],
};
