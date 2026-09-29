# Landingpage: Kasper Schrøder Asmussen

Denne fil er din brief. Læs den helt, før du laver noget i projektet.

## Hvad projektet er

En enkelt landingpage for Kasper Schrøder Asmussen, der hjælper virksomheder med at få AI til at løse konkrete marketingopgaver. Sidens eneste mål er, at den besøgende booker et gratis afklaringsmøde på 30 minutter via formularen.

## Brand

- Navn: Kasper Schrøder Asmussen
- Tagline: AI og marketing uden raketvidenskab.
- Koncept: Det visuelle er rummet med mørk baggrund, stjerner og pixel-art. Ordene er jordnære. Kontrasten er selve brandet: siden ligner raketvidenskab, men alt, hvad der står, er let at forstå.
- Ansigt: Pixel-astronauten med den grønne AI-kasket er Kasper. Et rigtigt foto af Kasper bruges i sektionen "Om mig".

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

1. Hero: tagline, én sætning om tilbuddet, knap til booking og astronauten.
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

- Baggrund: #0B0C1E
- Flade: #14163A
- Tekst: #E8ECF8
- Dæmpet tekst: #A7B0CF
- Cyan (overskrifter, links): #22D3EE
- Gul (primær knap, fremhævning): #FFC400
- Lilla (sekundær accent): #B04BDB

Regler:

- Pixel-skrift (Silkscreen fra Google Fonts) kun til overskrifter, knapper og små labels. Brødtekst i Space Grotesk, så den er let at læse.
- Én illustrationsstil: rene pixel-sprites som astronauten. Ingen blandede, detaljerede AI-genererede illustrationer.
- Pixel-billeder skal have image-rendering: pixelated.
- Mobil først. Kontrast mindst WCAG AA. Synligt fokus på alle knapper og felter.
- Stjernebaggrunden må gerne bevæge sig svagt, men højst én animation pr. skærm, og alt slås fra ved prefers-reduced-motion.

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
