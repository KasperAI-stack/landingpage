# Landingpage: Kasper Schrøder Asmussen

Denne fil er din brief. Læs den helt, før du laver noget i projektet.

## Hvad projektet er

En enkelt landingpage for Kasper Schrøder Asmussen, der hjælper virksomheder med at få AI til at løse konkrete marketingopgaver. Sidens eneste mål er, at den besøgende booker et gratis afklaringsmøde på 30 minutter via formularen.

## Brand

- Navn: Kasper Schrøder Asmussen
- Tagline: AI og marketing uden raketvidenskab.
- Koncept: En moderne, lys konsulentside med hvid baggrund, sort tekst og farve i gradient-rammer. Ordene er jordnære, og alt, hvad der står, er let at forstå.
- Maskot: En venlig, hvid rumrobot med antenne og mørkt visir (site/assets/robot.svg). Den bruges i hero og på tak-siden. Et rigtigt foto af Kasper bruges i "Om mig" og i chatvinduet i hero.

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
6. Workshops og oplæring
7. Book et møde: formularen
8. Footer: kontakt, CVR og LinkedIn

Teksten til hver sektion ligger i docs/copy.md.

## Design

Farver (defineret som CSS-variabler i site/css/styles.css):

- Baggrund: #FFFFFF
- Lys flade: #F5F5F7
- Tekst: #0B0B0F
- Dæmpet tekst: #5B5E6B
- Linjer: #E6E6EB
- Gradient: blå #3B5BFF, lilla #8B5CF6, pink #EC4899, orange #F97316

Regler:

- Skrift: Geist fra Google Fonts til både overskrifter og brødtekst. Store overskrifter med stram afstand mellem bogstaverne.
- Grid: Siden står i en ramme af tynde lodrette linjer, og sektionerne er adskilt af vandrette linjer med små plus-mærker, hvor linjerne mødes. De fire trin står i kolonner adskilt af gridlinjer, hver med et lille lysende ikon og en titel, hvor trinnets navn er fedt og prisen dæmpet.
- Knapper er sorte og helt runde i enderne. Farve kommer fra gradient-rammerne om billeder, kort og formularen, ikke fra teksten.
- Illustrationer er rene vektorgrafikker (SVG) i samme stil som robotten. Ingen pixel-art og ingen detaljerede AI-genererede billeder.
- Rummet må gerne ses i robotten, men ikke i teksten.
- Mobil først. Kontrast mindst WCAG AA. Synligt fokus på alle knapper og felter.
- Hold animation på et minimum, og slå den fra ved prefers-reduced-motion.

## Teknik

- Ren HTML, CSS og JavaScript. Intet framework og intet build-step.
- Alt, der skal online, ligger i mappen site/, som Netlify publicerer (se netlify.toml).
- Formularen bruger Netlify Forms (data-netlify="true") med et honeypot-felt mod spam. Efter afsendelse sendes brugeren til /tak.html.
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
