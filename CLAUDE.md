# Landingpage: Hey Otto

Denne fil er din brief. Læs den helt, før du laver noget i projektet.

## Hvad projektet er

En enkelt landingpage for Hey Otto, som drives af Kasper Schrøder Asmussen, der hjælper virksomheder med at få AI til at løse konkrete marketingopgaver. Sidens eneste mål er, at den besøgende booker et gratis afklaringsmøde på 30 minutter via formularen.

## Brand

- Navn: Hey Otto. Skrives "Hey Otto" i tekst. Personen bag er Kasper Schrøder Asmussen, som skriver siden som "jeg".
- Logo: vektorgrafikken site/assets/logo.svg ("hey" i en tynd serif og "otto" i en fed, rund skrift) med gennemsigtig baggrund. Den er mørk i lyst tema og bliver vendt til lys i mørkt tema. Står ved siden af Ottos hoved (favicon) i toppen og i footeren med "v/ Kasper Schrøder Asmussen".
- Tagline: AI og marketing uden raketvidenskab.
- Koncept: En moderne konsulentside i sort, grå og lilla, med lyst og mørkt tema. Ordene er jordnære, og alt, hvad der står, er let at forstå.
- Maskot: Otto, en venlig, hvid rumrobot med antenne og mørkt visir (site/assets/robot.svg). Den bruges i hero og på tak-siden, og hans hoved (site/assets/favicon.svg) er ikon. Ved formularen står en tegning af Kasper med Otto ved siden af (site/assets/kasper-og-otto.webp), og i "Om mig" står en tegning af Kasper, der peger og blinker (site/assets/kasper-peger.webp). Begge er fritlagt, og Kasper har selv leveret dem. Et rigtigt foto af Kasper bruges i chatvinduet i hero, hvor Kasper spørger Otto: "Hey Otto, byg mig en landingpage med fokus på [indsæt produkt]", og Otto er ved at svare.

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

Siden fortæller om Hey Otto, Kaspers AI-agent-værktøj til marketingteams: Otto tager imod opgaven og fordeler den til et hold af agenter, der kender kundens brand, arbejder på kundens egne konti og lægger alt i en godkendelseskø. Fundamentet bag teksten står i docs/copy-heyotto.md.

1. Hero: taglinen som lille linje, overskriften ("Giv marketingopgaven til Otto, og få den tilbage i jeres egen tone, klar til godkendelse."), én sætning om Hey Otto, knap til booking, robotten og chatvinduet, hvor Otto fordeler en opgave til holdene.
2. Problemet: AI blev endnu en ting at passe
3. Fra spørgsmål til opgaver: Otto og holdene bag ham og de tre trin
4. Sådan ser mandagen ud: to bokse over for hinanden, før med en liste og efter med en godkendelseskø, man kan klikke i
5. I bestemmer: godkendelse, brand og konti
6. Forskellen på en AI-chat og Hey Otto
7. Sådan kommer I i gang: de fire trin med priser
8. Om mig
9. Værktøjer: de værktøjer, Kasper bygger med
10. Spørgsmål og svar (workshops og oplæring nævnes her)
11. Book et møde: formularen eller booking, med tegningen af Kasper og Otto ved siden af
12. Footer: e-mail (kasper@heyotto.dk), telefon (+45 22 46 38 40), LinkedIn og links til privatlivspolitik og vilkår. CVR tilføjes, når Kasper har et.

Teksten er kort: hver tekst siger påstanden, belægget og hvorfor det holder, med få ord. Lange afsnit bliver til lister eller visuelle elementer.

Undersider: site/tak.html (efter formularen), site/privatlivspolitik.html, site/vilkaar.html (vilkår for brug, bruges også som "Terms of Service"-link ved app-registreringer) og site/404.html (når en side ikke findes). Siderne vises uden .html i adressen, fx heyotto.dk/privatlivspolitik. Links, canonical og sitemap bruger adresserne uden .html, og netlify.toml sender de gamle adresser med .html videre. Privatlivspolitikken skal opdateres, hvis der kommer nye værktøjer, cookies eller måder at behandle data på.

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

- Designsystemet står i docs/design-system.md (farver, typografi, radier, skygger og logoer). Hvis det og denne fil er uenige, gælder denne fil.
- Skrift: Geist til både overskrifter og brødtekst. Fredoka (vægt 600) kun til Ottos navn i chatvinduet. Begge ligger på siden selv (site/assets/fonts, OFL-licens) og hentes ikke fra Google Fonts. Store overskrifter med stram afstand mellem bogstaverne.
- Layout: Siden står frit uden ramme- og gitterlinjer, også i toppen. Sektionerne adskilles af luft. De fire trin står i kolonner adskilt af luft, hver med et lille lysende ikon og en titel, hvor trinnets navn er fedt og prisen dæmpet.
- Animation: Chatvinduet i hero spiller én gang, når siden åbner, i ren CSS. Ellers bevæger siden sig kun, når den besøgende gør noget (godkendelseskøen, spørgsmål og svar). Alt står færdigt ved prefers-reduced-motion.
- Sort, grå og hvid bærer siden. Knapper, valgte faner og vælgere er i tekstfarven (sort i lyst tema, lys i mørkt tema) og helt runde i enderne. Lilla er en accent, der kun bruges i rammen om chatvinduet i toppen, i produktpanelet, i ikonerne ved de fire trin og i figuren i værktøjssektionen.
- Glasbobler (site/assets/brand/boble-*.svg) svæver ved Otto i hero, på tak-siden og ved tegningen ved formularen. De er rene SVG'er med gennemsigtig baggrund, bygget af scripts/brand-svg.py, og har deres egen version til mørkt tema (CSS-variablerne --boble-1 og --boble-2). De er kun pynt og står aldrig bag tekst. Rillet glas er prøvet og valgt fra, så det skal ikke bruges.
- Temakontakten i toppen viser sol og måne side om side, og det aktive tema er markeret.
- Værktøjssektionen er en prikket flade med en stablet flise i midten (site/assets/stack.svg) og værktøjernes logoer i lyse app-ikoner rundt om. Logoerne ligger i site/assets/tools og kommer fra Iconify Logos og Simple Icons (CC0).
- Illustrationer er rene vektorgrafikker (SVG) i samme stil som robotten. Ingen pixel-art og ingen detaljerede AI-genererede billeder. De eneste undtagelser er de to tegninger af Kasper (ved formularen og i "Om mig"), som Kasper selv har valgt.
- Rummet må gerne ses i robotten, men ikke i teksten.
- Mobil først. Kontrast mindst WCAG AA. Synligt fokus på alle knapper og felter.
- Hold animation på et minimum, og slå den fra ved prefers-reduced-motion.

## Teknik

- Ren HTML, CSS og JavaScript. Intet framework og intet build-step.
- Alt, der skal online, ligger i mappen site/, som Netlify publicerer (se netlify.toml).
- Formularen bruger Netlify Forms (data-netlify="true") med et honeypot-felt mod spam. Efter afsendelse sendes brugeren til /tak.
- Kontaktsektionen har en knap, der skifter mellem "Send en forespørgsel" (formularen) og "Book en tid" (link til Kaspers gratis bookingside i Google Kalender). Bookingsiden linkes og indlejres ikke, så Google ikke sætter cookies på siden.
- Automatisering: Netlify sender hver formular videre til et Google Apps Script (automatisering/henvendelser.gs), som gemmer den i et Google Sheet, mailer Kasper, sender et automatisk svar og sender en daglig påmindelse om ubesvarede henvendelser. Opsætningen står i docs/automatisering.md. Mappen automatisering/ kommer ikke online.
- Google Tag Manager (GTM-N7M37V72) er installeret på forsiden og tak-siden, efter aftale med Kasper. Google Consent Mode står som standard på "denied" for alle cookies til statistik og annoncer, så ingen tags sætter cookies, før der er et cookiebanner, som giver samtykke.
- Siden sender to events til GTM: `henvendelse_sendt` (når tak-siden vises) og `booking_klik` (klik på "Åbn min kalender", markeret med data-track="booking"). Opsætning af Google Ads-konvertering står i docs/sporing.md.
- Cookiebot (indlæst via GTM) er cookiebanneret. Footeren på alle sider har knappen "Cookieindstillinger", som kalder `Cookiebot.renew()` og kun vises, når Cookiebot er indlæst.
- Meta-pixel (ID 1616440676548347) ligger i koden på alle sider med `type="text/plain" data-cookieconsent="marketing"`, så den først kører efter samtykke til marketing. Den sender `PageView`, `Lead` på tak-siden og `BookingKlik`. Meta's noscript-billede bruges ikke, fordi det sender data uden samtykke.
- Ingen andre trackingscripts eller cookies uden samtykke. Spørg Kasper, før der tilføjes flere.
- Billeder komprimeres og får altid en alt-tekst.
- Delingsbilledet (site/assets/deling.png, 1200 × 630) vises, når siden deles på LinkedIn og Facebook. Forsiden har strukturerede data (JSON-LD) med navn og kontakt. CVR tilføjes der, når det findes.
- Skriv "landingpage" i ét ord, også i flertal (landingpages).

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
