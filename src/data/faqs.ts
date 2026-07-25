import type { Lang } from './locales';

export const faqs: Record<Lang, { question: string; answer: string; links?: { label: string; href: string }[] }[]> = {
  en: [
    {
      question: 'What is the dress code?',
      answer:
        'Formal attire, e.g. suits for men and long dresses for ladies. Because part of the day will involve walking and a boat transfer, we recommend comfortable formal shoes (or an additional pair for walking) and a light layer for the evening.',
    },
    {
      question: 'Can I bring a plus one?',
      answer:
        'We would love to celebrate with everyone, but due to limited space, we are only able to accommodate those guests who are formally listed on the invitation. If your invitation includes a plus-one, it will be indicated.',
    },
    {
      question: 'Are children invited?',
      answer:
        'We would like to keep our celebration an intimate, adults-focused evening, with the exception of the children in our immediate families. We hope it gives you a chance to relax and enjoy the night with us.',
    },
    {
      question: 'How does the boat transfer work?',
      answer:
        "After the ceremony, guests will walk for about 12 minutes to Quai 6 at Bürkliplatz, Zürich, accompanied by family members. The exact timing will be confirmed closer to the date. We recommend comfortable shoes for the walk and boat ride, sun protection for sunny weather and an umbrella in case of rain.",
    },
    {
      question: 'Do I need a car?',
      answer:
        'Zurich and Switzerland as a whole have a dense and well-functioning public transport network, so a car is not usually required. In Zurich, driving by car is not recommended due to lack of parking space and poor convenience.',
    },
    {
      question: 'How do I buy a train ticket?',
      answer:
        'The easiest option is the SBB Mobile app: download it before travelling, enter your journey, choose the connection, add passengers, and buy the ticket before boarding. For the reception area, search for "Küsnacht ZH" rather than just "Küsnacht", as there are multiple places with this name. For journeys within Zurich, the SBB app and station ticket machines also work; ZVV (Zurich transport network) tickets are zone-based and cover trains, trams, buses and boats in the selected zones. Keep the ticket and a matching ID or payment card available for inspection. Note that Swiss ticket inspections are strict and that fines are given in the absence of a valid ticket.',
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
        'EU/EFTA citizens do not need a visa but should carry a valid national ID card or passport. UK British citizen passport holders can visit Switzerland and the Schengen area visa-free for up to 90 days in any 180-day period; current UK guidance says the passport must have been issued less than 10 years before arrival and expire at least 3 months after the planned departure from the Schengen area. US citizens do not need a tourist visa for stays under 90 days; the US State Department advises a passport valid for at least 6 months from entry and a return or onward ticket. Note that ETIAS (the European Travel Information and Authorisation System) is currently expected to launch in late 2026, so UK and US guests should check official guidance again closer to June 2027.',
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
        'Goods for personal use or gifts are VAT-free only up to CHF 150 total value per person per day, and alcohol, tobacco, meat, dairy, and similar sensitive goods have separate allowances. Animal products are permitted only from EU member states, Iceland, Northern Ireland and Norway; they are prohibited from other countries, so guests arriving from Great Britain or the USA should avoid packing animal products. Swiss customs and border officers can be very strict at land borders, especially if you are driving or arriving by train with shopping, food, alcohol, or gifts. Checks are less likely at the airport, but they can still happen and the same rules apply.',
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
    {
      question: 'What should I do if I have questions about the invitation or the wedding day?',
      answer:
        'Feel free to reach out to us directly, we are happy to help clarify anything!',
    },
  ],
  it: [
    {
      question: 'Qual è il dress code?',
      answer:
        'Abbigliamento formale, ad esempio abiti da uomo e abiti lunghi da donna. Poiché parte della giornata includerà una passeggiata e un trasferimento in barca, consigliamo scarpe eleganti ma comode, o un paio aggiuntivo per camminare, e uno strato leggero per la sera.',
    },
    {
      question: 'I bambini sono invitati?',
      answer:
        'Vorremmo mantenere la celebrazione intima e pensata soprattutto per adulti, con l’eccezione dei bambini delle nostre famiglie più strette. Speriamo che sia per voi un’occasione per rilassarvi e godervi la serata con noi.',
    },
    {
      question: 'Posso portare un accompagnatore?',
      answer:
        'Ci piacerebbe festeggiare con tutti, ma lo spazio è limitato e possiamo accogliere solo gli ospiti indicati formalmente nell’invito. Se il vostro invito include un accompagnatore, sarà indicato.',
    },
    {
      question: 'Come funziona il trasferimento in barca?',
      answer:
        'Dopo la cerimonia, gli ospiti cammineranno per circa 12 minuti fino al Quai 6 a Bürkliplatz, Zurigo, accompagnati dai familiari. L’orario esatto sarà confermato più vicino alla data. Consigliamo scarpe comode per la passeggiata e la barca, protezione solare in caso di bel tempo e un ombrello in caso di pioggia.',
    },
    {
      question: "Serve un'auto?",
      answer:
        'Zurigo, e la Svizzera in generale, hanno una rete di trasporto pubblico fitta e ben funzionante, quindi di solito non serve un’auto. A Zurigo spostarsi in auto non è consigliato per la mancanza di parcheggi e la scarsa praticità.',
    },
    {
      question: 'Come compro un biglietto del treno?',
      answer:
        'L’opzione più semplice è l’app SBB Mobile: scaricatela prima del viaggio, inserite il tragitto, scegliete il collegamento, aggiungete i passeggeri e comprate il biglietto prima di salire. Per la zona del ricevimento, cercate "Küsnacht ZH" e non solo "Küsnacht", perché esistono più località con questo nome. Per gli spostamenti a Zurigo potete usare anche l’app SBB e le biglietterie automatiche in stazione; i biglietti ZVV, cioè della rete dei trasporti di Zurigo, sono a zone e valgono su treni, tram, autobus e battelli nelle zone scelte. Tenete il biglietto e un documento o la carta di pagamento a portata di mano per eventuali controlli. I controlli dei biglietti in Svizzera sono severi e, se non avete un biglietto valido, viene emessa una multa.',
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
        'I cittadini UE/AELS non hanno bisogno di visto, ma devono portare una carta d’identità nazionale o un passaporto validi. I cittadini britannici con passaporto British citizen possono visitare la Svizzera e l’area Schengen senza visto fino a 90 giorni in un periodo di 180 giorni; secondo le indicazioni attuali del governo britannico, il passaporto deve essere stato emesso meno di 10 anni prima dell’arrivo e scadere almeno 3 mesi dopo l’uscita prevista dall’area Schengen. I cittadini statunitensi non hanno bisogno di visto turistico per soggiorni inferiori a 90 giorni; il Dipartimento di Stato USA raccomanda un passaporto valido almeno 6 mesi dalla data di ingresso e un biglietto di ritorno o proseguimento. ETIAS, il sistema europeo di informazione e autorizzazione ai viaggi, è attualmente previsto per la fine del 2026, quindi ospiti britannici e statunitensi dovrebbero ricontrollare le indicazioni ufficiali vicino a giugno 2027.',
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
        'I beni per uso personale o regalo sono esenti da IVA solo fino a CHF 150 di valore totale per persona al giorno, e alcool, tabacco, carne, latticini e altri prodotti sensibili hanno franchigie separate. I prodotti di origine animale sono ammessi solo dagli Stati membri UE, Islanda, Irlanda del Nord e Norvegia; sono vietati dagli altri paesi, quindi chi arriva dalla Gran Bretagna o dagli Stati Uniti dovrebbe evitare di portare prodotti di origine animale. Le guardie doganali e di frontiera svizzere possono essere molto severe ai confini terrestri, soprattutto se si arriva in auto o in treno con acquisti, cibo, alcool o regali. I controlli sono meno probabili in aeroporto, ma possono comunque avvenire e valgono le stesse regole.',
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
    {
      question: 'Cosa devo fare se ho domande sull’invito o sul giorno del matrimonio?',
      answer:
        'Scriveteci pure direttamente: saremo felici di chiarire qualsiasi dubbio.',
    },
  ],
  de: [
    {
      question: 'Was ist der Dresscode?',
      answer:
        'Formelle Kleidung, zum Beispiel Anzüge für Männer und lange Kleider für Frauen. Da ein Teil des Tages einen Fussweg und einen Bootstransfer umfasst, empfehlen wir bequeme formelle Schuhe, oder ein zusätzliches Paar zum Gehen, sowie eine leichte Schicht für den Abend.',
    },
    {
      question: 'Sind Kinder eingeladen?',
      answer:
        'Wir möchten unsere Feier als intime, vor allem auf Erwachsene ausgerichtete Feier halten, mit Ausnahme der Kinder unserer engsten Familien. Wir hoffen, dass ihr dadurch entspannt mit uns feiern und den Abend geniessen könnt.',
    },
    {
      question: 'Kann ich eine Begleitung mitbringen?',
      answer:
        'Wir würden sehr gerne mit allen feiern, können wegen des begrenzten Platzes aber nur die Gäste berücksichtigen, die ausdrücklich auf der Einladung genannt sind. Wenn eure Einladung eine Begleitung einschliesst, wird das dort angegeben.',
    },
    {
      question: 'Wie funktioniert der Bootstransfer?',
      answer:
        'Nach der Trauung gehen die Gäste gemeinsam mit Familienmitgliedern etwa 12 Minuten zum Quai 6 am Bürkliplatz, Zürich. Die genaue Zeit wird näher am Datum bestätigt. Wir empfehlen bequeme Schuhe für den Fussweg und die Bootsfahrt, Sonnenschutz bei sonnigem Wetter sowie einen Regenschirm bei Regen.',
    },
    {
      question: 'Brauche ich ein Auto?',
      answer:
        'Zürich und die Schweiz insgesamt haben ein dichtes und gut funktionierendes öffentliches Verkehrsnetz, daher ist ein Auto normalerweise nicht nötig. In Zürich ist Autofahren wegen fehlender Parkplätze und geringer Bequemlichkeit nicht empfohlen.',
    },
    {
      question: 'Wie kaufe ich ein Zugticket?',
      answer:
        'Am einfachsten ist die App SBB Mobile: ladet sie vor der Reise herunter, gebt die Verbindung ein, wählt die passende Fahrt, fügt Reisende hinzu und kauft das Ticket vor dem Einsteigen. Für den Empfangsbereich sucht nach "Küsnacht ZH" und nicht nur nach "Küsnacht", da es mehrere Orte mit diesem Namen gibt. Für Fahrten innerhalb von Zürich funktionieren auch die SBB-App und die Automaten am Bahnhof; ZVV-Tickets, also Tickets des Zürcher Verkehrsverbunds, gelten zonenbasiert für Züge, Trams, Busse und Schiffe in den gewählten Zonen. Haltet Ticket und einen passenden Ausweis oder die Zahlungskarte für Kontrollen bereit. Schweizer Ticketkontrollen sind streng; ohne gültiges Ticket wird eine Busse ausgestellt.',
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
        'EU-/EFTA-Bürgerinnen und -Bürger brauchen kein Visum, müssen aber eine gültige nationale Identitätskarte oder einen Pass mitführen. Britische Staatsangehörige mit British-citizen-Pass können die Schweiz und den Schengen-Raum bis zu 90 Tage innerhalb von 180 Tagen visumfrei besuchen; laut aktueller britischer Reiseinformation muss der Pass weniger als 10 Jahre vor der Einreise ausgestellt worden sein und mindestens 3 Monate nach dem geplanten Verlassen des Schengen-Raums gültig sein. US-Staatsangehörige brauchen für touristische Aufenthalte unter 90 Tagen kein Visum; das US-Aussenministerium empfiehlt einen Pass, der ab Einreise mindestens 6 Monate gültig ist, sowie ein Rück- oder Weiterreiseticket. ETIAS, das europäische Reiseinformations- und Genehmigungssystem, wird derzeit für Ende 2026 erwartet; Gäste aus Grossbritannien und den USA sollten die offiziellen Hinweise daher vor Juni 2027 erneut prüfen.',
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
        'Waren für den persönlichen Gebrauch oder als Geschenk sind nur bis zu einem Gesamtwert von CHF 150 pro Person und Tag mehrwertsteuerfrei; für Alkohol, Tabak, Fleisch, Milchprodukte und ähnliche sensible Waren gelten zusätzliche Freigrenzen. Tierische Produkte sind nur aus EU-Mitgliedstaaten, Island, Nordirland und Norwegen erlaubt; aus anderen Ländern sind sie verboten. Gäste aus Grossbritannien oder den USA sollten daher keine tierischen Produkte einpacken. Schweizer Zoll- und Grenzbeamte können an Landgrenzen sehr streng sein, besonders bei der Einreise mit Auto oder Zug und mit Einkäufen, Lebensmitteln, Alkohol oder Geschenken. Kontrollen sind am Flughafen weniger wahrscheinlich, können aber trotzdem stattfinden; die Regeln gelten gleich.',
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
    {
      question: 'Was soll ich tun, wenn ich Fragen zur Einladung oder zum Hochzeitstag habe?',
      answer:
        'Meldet euch gerne direkt bei uns; wir helfen sehr gerne, wenn etwas unklar ist.',
    },
  ],
};
