# Landingpage: Hey Otto

Denne fil er din brief. Læs den helt, før du laver noget i projektet.

## Hvad projektet er

En enkelt landingpage for Hey Otto, som drives af Kasper Schrøder Asmussen, der hjælper virksomheder med at få AI til at løse konkrete marketingopgaver. Sidens eneste mål er, at den besøgende booker et gratis afklaringsmøde på 30 minutter via formularen.

## Brand

- Navn: Hey Otto. Skrives "Hey Otto" i tekst. Personen bag er Kasper Schrøder Asmussen, som skriver siden som "jeg".
- Logo: "hey" i Quicksand (let afrundet, almindelig vægt) og "Otto" i Fredoka (rund og kurvet, halvfed), begge fra Google Fonts. Står ved siden af Ottos hoved i toppen og i footeren med "v/ Kasper Schrøder Asmussen".
- Tagline: AI og marketing uden raketvidenskab.
- Koncept: En moderne konsulentside i sort, grå og lilla, med lyst og mørkt tema. Ordene er jordnære, og alt, hvad der står, er let at forstå.
- Maskot: Otto, en venlig, hvid rumrobot med antenne og mørkt visir (site/assets/robot.svg). Den bruges i hero og på tak-siden, og hans hoved (site/assets/favicon.svg) er ikon. Et rigtigt foto af Kasper bruges i "Om mig" og i chatvinduet i hero, hvor Kasper spørger Otto: "Hey Otto, byg mig en Landing Page med fokus på [indsæt produkt]", og Otto er ved at svare.

## Sprog og tone

Disse regler gælder al tekst på siden, også knapper, fejlbeskeder og alt-tekster.

- Dansk. Skriv til virksomheden som "I" og "jer". Kasper skriver som "jeg".
- Fortællende tone i hele sætninger. Ingen hakkende korte fragmenter efter hinanden.
- Ingen tankestreger. Brug komma eller punktum i stedet.
- Intet rumsprog i teksten, fx take off, hyperspace, galakse, cockpit, commander, deploy eller mission. Rummet må kun være i det visuelle.
- Ingen AI-klingende vendinger, fx "i en verden hvor", "lås op for", "revolutionér", "sømløs", "game changer", "dyk ned i", "tag din virksomhed til næste niveau".
- Ingen opdigtede tal, statistikker, kundecitater eller logoer. Brug pladsholdere i firkantede parenteser, fx [CASE], indtil Kasper leverer de rigtige.
- Siden skrives bredt til mindre og mellemstore virksomheder uden egne AI-folk. Den må ikke skrives til én bestemt branche.

## Tilbuddet

Se docs/tilbud.md. Priser, trin og produkter skal stå præcis som der.

## Sidens opbygning

1. Hero: tagline, én sætning om tilbuddet, knap til booking og robotten.
2. Problemet
3. De tre produkter
4. Sådan foregår det: de fire trin med priser
5. Om mig
6. Værktøjer: de værktøjer, Kasper bygger med
7. Workshops og oplæring
8. Book et møde: formularen eller booking
9. Footer: e-mail (kasper@heyotto.dk), telefon (+45 22 46 38 40) og LinkedIn. CVR tilføjes, når Kasper har et.

Teksten til hver sektion ligger i docs/copy.md.

## Design

Farver (defineret som CSS-variabler i site/css/styles.css). Siden har et lyst og et mørkt tema. Den følger den besøgendes egen indstilling, og en knap i toppen skifter mellem dem. Valget huskes i browseren (localStorage, ingen cookies).

Neutrale:

- Onyx #0F0E13: tekst i lyst tema, baggrund i mørkt tema
- Grafit #1E1C24: flader i mørkt tema
- Skifer #3B3845: linjer i mørkt tema
- Sølvgrå #A7A3B2: dæmpet tekst i mørkt tema
- Tåge #F4F2F8: flader i lyst tema, tekst i mørkt tema
- Lyst tema har hvid baggrund og dæmpet tekst i #5E5A6B

Lilla accenter:

- Dyb violet #4C1D95
- Violet #7C3AED
- Orkidé #C026D3
- Rosé #F472B6 (kun i mørkt tema, den er for lys på hvid baggrund)

Regler:

- Skrift: Geist fra Google Fonts til både overskrifter og brødtekst. Quicksand og Fredoka bruges kun i logoet og i Ottos navn. Store overskrifter med stram afstand mellem bogstaverne.
- Grid: Siden står i en ramme af tynde lodrette linjer, og sektionerne er adskilt af vandrette linjer med små plus-mærker, hvor linjerne mødes. De fire trin står i kolonner adskilt af gridlinjer, hver med et lille lysende ikon og en titel, hvor trinnets navn er fedt og prisen dæmpet.
- Produkterne vises som tre faner over et farvet panel med et app-vindue. Den valgte fane er udfyldt med lilla gradient, og vinduet skifter illustration efter fanen. Illustrationerne er abstrakte, uden tal eller tekst.
- Sort, grå og hvid bærer siden. Knapper, valgte faner og vælgere er i tekstfarven (sort i lyst tema, lys i mørkt tema) og helt runde i enderne. Lilla er en accent, der kun bruges i rammen om chatvinduet i toppen, i produktpanelet, i ikonerne ved de fire trin og i figuren i værktøjssektionen.
- Temakontakten i toppen viser sol og måne side om side, og det aktive tema er markeret.
- Værktøjssektionen er en prikket flade med en stablet flise i midten (site/assets/stack.svg) og værktøjernes logoer i lyse app-ikoner rundt om. Logoerne ligger i site/assets/tools og kommer fra Iconify Logos og Simple Icons (CC0).
- Illustrationer er rene vektorgrafikker (SVG) i samme stil som robotten. Ingen pixel-art og ingen detaljerede AI-genererede billeder.
- Rummet må gerne ses i robotten, men ikke i teksten.
- Mobil først. Kontrast mindst WCAG AA. Synligt fokus på alle knapper og felter.
- Hold animation på et minimum, og slå den fra ved prefers-reduced-motion.

## Teknik

- Ren HTML, CSS og JavaScript. Intet framework og intet build-step.
- Alt, der skal online, ligger i mappen site/, som Netlify publicerer (se netlify.toml).
- Formularen bruger Netlify Forms (data-netlify="true") med et honeypot-felt mod spam. Efter afsendelse sendes brugeren til /tak.html.
- Kontaktsektionen har en knap, der skifter mellem "Send en forespørgsel" (formularen) og "Book en tid" (link til Kaspers gratis bookingside i Google Kalender). Bookingsiden linkes og indlejres ikke, så Google ikke sætter cookies på siden.
- Automatisering: Netlify sender hver formular videre til et Google Apps Script (automatisering/henvendelser.gs), som gemmer den i et Google Sheet, mailer Kasper, sender et automatisk svar og sender en daglig påmindelse om ubesvarede henvendelser. Opsætningen står i docs/automatisering.md. Mappen automatisering/ kommer ikke online.
- Ingen tracking eller cookies uden samtykke. Hvis der skal måles trafik, brug en cookiefri løsning og spørg Kasper først.
- Billeder komprimeres og får altid en alt-tekst.

## Arbejdsgang

- Kør siden lokalt med `npx serve site` eller `netlify dev`.
- Tjek al ny eller ændret tekst mod reglerne ovenfor. Kommandoen /copy-review gør det.
- Lav små commits med korte danske beskeder.
- Deploy sker automatisk, når der pushes til main på GitHub.

## Det må du ikke uden at spørge Kasper

- Ændre navn, tagline, priser eller tilbud.
- Tilføje nye sektioner, sider eller funktioner.
- Tilføje tredjeparts-scripts, tracking eller cookies.
- Opfinde cases, kunder, resultater eller citater.
