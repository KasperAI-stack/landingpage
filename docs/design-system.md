# Hey Otto design system

> AI og marketing uden raketvidenskab.

Hey Otto er Kasper Schrøder Asmussens konsulentbrand: AI og marketing uden raketvidenskab. Udtrykket er roligt og moderne i sort, grå og hvid, med lilla som en sparsom accent og robotten Otto som venlig maskot. Alt herunder gælder både lyst og mørkt tema.


## Indhold og tone

- Skriv på dansk. Tal til virksomheden som "I" og "jer". Kasper skriver som "jeg".
- Brug en fortællende tone i hele sætninger. Undgå hakkende korte fragmenter efter hinanden.
- Brug ingen tankestreger. Brug komma eller punktum i stedet.
- Rummet må kun ses i det visuelle (robotten). Teksten bruger aldrig ord som take off, galakse, cockpit, deploy eller mission.
- Undgå AI-klingende vendinger som "i en verden hvor", "lås op for", "sømløs", "game changer" og "tag din virksomhed til næste niveau".
- Opfind aldrig tal, kunder, citater eller logoer. Brug pladsholdere i firkantede parenteser, fx [CASE].
- Navnet skrives "Hey Otto" i tekst. Taglinen er "AI og marketing uden raketvidenskab."
- Emojis bruges ikke.

Eksempler fra siden:

> AI og marketing uden raketvidenskab.

> Jeg bygger en gratis prototype på jeres egne data, så I kan se, hvad AI kan gøre for jer, før I beslutter noget som helst.

> I ved godt, at AI kan spare jer tid

## Farver

- Sort, grå og hvid bærer siden. Brug `bg` som baggrund, `soft` til flader og `ink` til tekst. Dæmpet tekst står i `muted`.
- Knapper, valgte faner og vælgere fyldes med `ink`, og teksten på dem er `bg`. Ved hover skifter fyldet til `btn-hover`.
- Lilla er en accent. Brug `p-deep`, `p-violet`, `p-orchid` og `p-rose` kun i rammen om chatvinduet i hero, i produktpanelet, i ikonerne ved de fire trin (`s1` til `s4`) og i figuren i værktøjssektionen.
- Brandgradienten går i 135 grader fra `p-deep` (0 %) over `p-violet` (38 %) og `p-orchid` (72 %) til `p-rose` (100 %). De tre produktfarver er kortere gradienter i 160 grader: `p-deep` til `p-violet`, `p-violet` til `p-orchid` og `p-orchid` til `p-rose`.
- `p-rose` må kun bruges som tekst eller tynd streg i mørkt tema. Den er for lys på hvid.
- Linjer: `line` til kanter og til linjerne mellem rækkerne i tabellen og spørgsmål og svar, `rail` til kanten på formularfelter og stregerne i agentdiagrammet, `plus` til prikkerne i værktøjsfladen og hover-kant på felter.
- Kontrasten holder mindst WCAG AA: `ink` og `muted` står med mindst 6:1 på både `bg` og `soft` i begge temaer.

## Typografi

- Geist (variabel skrift, OFL-licens) bruges til både overskrifter og brødtekst. Den ligger på siden selv i site/assets/fonts/geist-latin.woff2 og hentes ikke fra Google Fonts, så Google ikke får de besøgendes IP-adresse.
- Fredoka (vægt 600, OFL-licens) bruges kun til Ottos navn i chatvinduet, stilen `otto-name`. Den ligger også på siden selv, i site/assets/fonts/fredoka-600-latin.woff2.
- Store overskrifter har stram afstand mellem bogstaverne: `display` har -0.045em og `heading` -0.03em. Overskrifter balanceres med `text-wrap: balance`.
- Overskrifterne skalerer med skærmen. Værdierne i stilene er de største størrelser, og hver stils note nævner den fulde clamp-værdi.
- Trinenes titler bruger `step-title`, hvor trinnets navn er fedt i `ink` og prisen dæmpet i `muted`.

## Layout og grid

- Siden står frit på baggrunden uden ramme- og gitterlinjer, højst 76rem bred og trukket `rail-inset` ind fra skærmkanten. Toppen har heller ingen linje under sig.
- Sektionerne adskilles kun af luft: 5rem lodret og `gutter` vandret. Tekstspalter holdes inden for `read`.
- De fire trin står i kolonner adskilt af luft: én kolonne på mobil, to fra 40rem og fire fra 64rem. Det samme gælder de tre trin i "Fra spørgsmål til opgaver" og de tre punkter i "I bestemmer".
- Siden er bygget mobil først.

## Former og skygger

- Knapper, piller, temakontakten og skifteren er helt runde i enderne (`radius-pill`).
- Rammer og paneler bruger `radius`, faner `radius-tab`, vinduer `radius-window` og felter `radius-input`.
- Skygger er sjældne. `shadow-hero` giver en lilla glød under chatvinduet, og `shadow-tab` løfter den valgte fane.

## Tilstande

- Fokus er altid synligt: 3px ring i `focus` med 3px afstand på knapper, links og felter.
- Formularfelter har en 1.5px kant i `rail`, `plus` ved hover og `accent` i fokus.
- Knapper løfter sig 1px ved hover.
- Animation holdes på et minimum og slås fra ved `prefers-reduced-motion`.

## Billeder og ikoner

- Det fulde logo (Logos/heyotto-logo.png) består af Ottos hoved i det lilla app-ikon og ordmærket "heyotto". Det har hvid baggrund og bruges kun på hvide eller lyse flader.
- App-ikonet (Logos/heyotto-favicon.png) er Ottos hoved på brandgradienten og bruges som fane-ikon, app-ikon og profilbillede.
- På mørke baggrunde bruges ordmærket alene (Logos/logo.svg), som er mørkt (#0F0E13) med gennemsigtig baggrund og vendes til lyst med `filter: invert(1)`.
- Otto (Illustrations/robot.svg) er en venlig, hvid rumrobot med antenne og mørkt visir. Han bruges i hero og på tak-siden.
- Illustrationer er rene vektorgrafikker i samme stil som robotten. Ingen pixel-art og ingen detaljerede AI-genererede billeder.
- Produktillustrationerne er abstrakte app-vinduer uden tal eller tekst.
- Kasper vises med et rigtigt foto (Photos/kasper.jpg).
- Værktøjslogoerne (Tools) kommer fra Iconify Logos og Simple Icons (CC0) og vises i lyse app-ikoner (`tile`).
- Ikoner i grænsefladen er tynde stregikoner i tekstfarven. Emojis bruges ikke.
- Alle billeder har en alt-tekst.

## Noter

- Brandgradienten (`--gradient`) og panelets radiale gradienter er ikke tokens, fordi de er gradienter. De er beskrevet under Farver.
- `--logo-filter` er ikke en farve og står under Billeder og ikoner.
- Faste farver i illustrationerne (#22C55E og #D4D5DD) er ikke taget med.
- Fontene ligger på siden selv i site/assets/fonts med deres OFL-licenser.
- Siden har intet komponentbibliotek (ren HTML og CSS), så der er ingen komponenter.

## Logovariationer

Hey Otto har fire logovariationer. Vælg den efter baggrunden og pladsen, og brug altid filerne fra gruppen Logos.

### Fuldt logo

Fil: Logos/heyotto-logo.png. Ottos hoved i det lilla app-ikon til venstre og ordmærket "heyotto" til højre. Det er førstevalget, når logoet skal stå alene, fx i præsentationer, dokumenter og på sociale medier. Filen har hvid baggrund, så den kun bruges på hvide eller lyse flader (`bg` i lyst tema). På mørke baggrunde bruges ordmærket i lys udgave sammen med app-ikonet.

### Ordmærke, mørkt

Fil: Logos/logo.svg. Ordmærket alene i Onyx (#0F0E13) med gennemsigtig baggrund. Bruges i lyst tema på `bg` og `soft`. På hjemmesiden står det i toppen i 1.8rem højde ved siden af app-ikonet i 28px og i footeren i 1.35rem højde med "v/ Kasper Schrøder Asmussen".

### Ordmærke, lyst

Samme fil som det mørke ordmærke, vendt til lyst med `filter: invert(1)` (variablen `--logo-filter` i mørkt tema). Bruges på `bg` og `soft` i mørkt tema og på andre mørke baggrunde. Eksemplet her er vist i Tåge (#F4F2F8) på Onyx.

### App-ikon

Fil: Logos/heyotto-favicon.png (1024 × 1024 px, gennemsigtig baggrund). Ottos hoved med mørkt visir og lyselilla øjne på en gradient fra `p-deep` over `p-violet` til `p-orchid`. Bruges som fane-ikon, app-ikon og profilbillede, og ved siden af ordmærket i toppen af hjemmesiden. Det virker på både lyse og mørke baggrunde. Hjemmesiden bruger stadig den ældre vektorversion, Logos/favicon.svg.

### Små skærme

- På skærme smallere end 26rem bliver ordmærket i toppen 1.35rem højt og app-ikonet 24px.
- På skærme smallere end 22rem skjules ordmærket, og kun app-ikonet står tilbage.

## Tokens

### Farver

| Token | Lyst tema | Mørkt tema | Brug |
|---|---|---|---|
| `bg` | `#ffffff` | `#0f0e13` | Sidens baggrund. Hvid i lyst tema, Onyx i mørkt tema. |
| `soft` | `#f4f2f8` | `#1e1c24` | Flader: chatvindue, formularramme, workshop-panel, temakontakt og skifter. Tåge i lyst tema, Grafit i mørkt tema. |
| `ink` | `#0f0e13` | `#f4f2f8` | Tekst og overskrifter på bg og soft (19:1 og 17:1). Også fyld på knapper, valgte faner og vælgere, med bg som tekst ovenpå. |
| `muted` | `#5e5a6b` | `#a7a3b2` | Dæmpet brødtekst, lede, trinbeskrivelser og footer på bg og soft (mindst 6:1 i begge temaer). |
| `line` | `#e4e1ec` | `#2b2932` | Kanter på faner, felter og vinduer og linjerne mellem rækker i tabellen og spørgsmål og svar. Kun til adskillelse, aldrig til tekst. |
| `plus` | `#a7a3b2` | `#6b6778` | Prikkerne i værktøjsfladen og hover-kant på felter. |
| `rail` | `#d3cfdd` | `#3b3845` | Standardkanten på formularfelter og stregerne i agentdiagrammet. Skifer i mørkt tema. |
| `focus` | `#7c3aed` | `#f472b6` | Fokusring (3px, 3px afstand) på alle knapper, links og felter. 5,7:1 på hvid, 7,3:1 på Onyx. |
| `hover` | `rgba(15, 14, 19, 0.04)` | `rgba(244, 242, 248, 0.05)` | Svag baggrund på faner ved hover. I koden skrevet som rgb(15 14 19 / .04). |
| `btn-hover` | `#2b2932` | `#d9d6e2` | Knappens baggrund ved hover. Teksten forbliver bg. |
| `tile` | `#ffffff` | `#f4f2f8` | Baggrund på værktøjernes app-ikoner, lyse i begge temaer, så logoerne står i deres egne farver. |
| `accent` | `#7c3aed` | `#f472b6` | Kant på et formularfelt i fokus. Violet i lyst tema, Rosé i mørkt tema. |
| `s1` | `#7c3aed` | `#8b5cf6` | Ikon og glød ved trin 1 (Afklaring). |
| `s2` | `#9333ea` | `#a855f7` | Ikon og glød ved trin 2 (Prototype). |
| `s3` | `#c026d3` | `#d946ef` | Ikon og glød ved trin 3. |
| `s4` | `#db2777` | `#f472b6` | Ikon og glød ved trin 4. |
| `p-deep` | `#4c1d95` | `#4c1d95` | Dyb violet. Start på brandgradienten, bunden i produktpanelet og søjlerne i analyse-illustrationen. |
| `p-violet` | `#7c3aed` | `#7c3aed` | Violet. Hovedfarven i brandgradienten og i produktpanelets lys. |
| `p-orchid` | `#c026d3` | `#c026d3` | Orkidé. Tredje stop i brandgradienten og lys i produktpanelet. |
| `p-rose` | `#f472b6` | `#f472b6` | Rosé. Sidste stop i brandgradienten. Som tekst eller tynd streg kun i mørkt tema, den er for lys på hvid (2,4:1). |

Brandgradient: `linear-gradient(135deg, #4C1D95 0%, #7C3AED 38%, #C026D3 72%, #F472B6 100%)`

### Typografi

- `sans`: "Geist", "Helvetica Neue", Arial, sans-serif
- `otto`: "Fredoka", "Geist", "Helvetica Neue", Arial, sans-serif

| Stil | Størrelse | Linjehøjde | Vægt | Bogstavafstand | Brug |
|---|---|---|---|---|---|
| `display` | 5rem | 1.02 | 600 | -0.045em | h1 i hero. I koden clamp(2.4rem, 8vw, 5rem), så den skalerer fra 2,4rem på mobil. |
| `heading-xl` | 3.75rem | 1.08 | 600 | -0.03em | Overskriften i kontaktsektionen (h2.big). I koden clamp(2.25rem, 6vw, 3.75rem). |
| `heading` | 3rem | 1.08 | 600 | -0.03em | Sektionsoverskrifter (h2). I koden clamp(2rem, 5vw, 3rem). |
| `step-title` | 1.2rem | 1.6 | 500 | -0.02em | Titel på de fire trin: navnet fedt (600) i ink, prisen i muted. |
| `title` | 1.125rem | 1.6 | 600 | -0.01em | h3 og fanetitler. |
| `lede` | 1.25rem | 1.6 | 400 | normal | Underteksten i hero, i muted. I koden clamp(1.1rem, 2.2vw, 1.25rem). |
| `body` | 1.0625rem | 1.6 | 400 | normal | Al brødtekst. |
| `small` | 0.95rem | 1.6 | 400 | normal | Footer, labels og noter. |
| `button` | 1rem | 1.2 | 600 | normal | Knapper. Den lille knap i toppen bruger 0.9rem. |
| `pill` | 0.875rem | 1.6 | 500 | normal | Pillerne over chatvinduet i hero. |
| `caption` | 0.85rem | 1.6 | 500 | normal | Værktøjernes navne under ikonerne. |
| `otto-name` | 1.05rem | 1.6 | 600 | normal | Kun Ottos navn i chatvinduet. Fredoka bruges ikke andre steder. |

### Hjørneradier

| Token | Værdi | Brug |
|---|---|---|
| `radius` | `22px` | Variablen --radius: gradient-rammer, værktøjsflade og workshop-panel. |
| `radius-stage` | `26px` | Produktpanelet med app-vinduet. |
| `radius-tab` | `16px` | Produktfaner, fotoramme og værktøjsikoner på mobil. |
| `radius-window` | `14px` | Chatvinduet, formularen og bookingkortet inden i deres rammer. |
| `radius-input` | `10px` | Formularfelter og trinikoner. |
| `radius-pill` | `999px` | Knapper, piller, temakontakt og skifter: helt runde i enderne. |

### Layout

| Token | Værdi | Brug |
|---|---|---|
| `max` | `72rem` | Variablen --max: største indholdsbredde. |
| `read` | `40rem` | Variablen --read: læsebredde for tekstspalter. |
| `gutter` | `clamp(1.25rem, 4vw, 3rem)` | Variablen --gutter: vandret luft inde i sektionerne. |
| `rail-inset` | `clamp(.75rem, 3vw, 2.5rem)` | Variablen --rail-inset: afstand fra skærmkanten til sidens indhold. |

### Skygger

| Token | Værdi | Brug |
|---|---|---|
| `shadow-hero` | `0 30px 90px rgba(124, 58, 237, 0.35)` | Lilla glød under chatvinduet i hero. |
| `shadow-tab` | `0 14px 34px rgba(15, 14, 19, 0.18)` | Den valgte produktfane. |
| `shadow-tile` | `0 1px 2px rgba(15, 14, 19, 0.06), 0 8px 20px rgba(15, 14, 19, 0.08)` | Værktøjernes app-ikoner. |
| `shadow-app` | `0 30px 70px rgba(20, 10, 60, 0.45)` | App-vinduet i produktpanelet. |
| `shadow-toggle` | `0 1px 3px rgba(15, 14, 19, 0.15)` | Det aktive tema i temakontakten. |

## Filer

### Logos

Logo og ikon for Hey Otto. De to PNG-filer er de nyeste versioner og bruges som standard.

- heyotto-logo.png: det fulde logo med Ottos hoved i det lilla app-ikon til venstre og ordmærket "heyotto" ("hey" i tynd serif, "otto" i fed, rund skrift) i Onyx. 400 × 75 px på hvid baggrund, så det kun bruges på hvid eller lyse flader (`bg` i lyst tema). Brug ordmærket logo.svg på mørke baggrunde.
- heyotto-favicon.png: app-ikonet, Ottos hoved med mørkt visir og lyselilla øjne på en gradient fra `p-deep` over `p-violet` til `p-orchid`, med afrundede hjørner og gennemsigtig baggrund. 1024 × 1024 px. Bruges som fane-ikon, app-ikon og profilbillede.
- logo.svg: ordmærket alene, uden ikon. Én farve, Onyx (#0F0E13), på gennemsigtig baggrund. I mørkt tema vendes det til lyst med `filter: invert(1)`. Højde 1.8rem i toppen og 1.35rem i footeren.
- favicon.svg: den ældre vektorversion af ikonet fra hjemmesiden (28px ved navnet i toppen).

### Illustrations

Vektorillustrationer i samme stil som robotten.

- robot.svg: Otto, en venlig hvid rumrobot med antenne og mørkt visir. Bruges i hero, hvor han kigger op bag chatvinduet, og på tak-siden.
- stack.svg: den stablede flise i midten af værktøjssektionen, med værktøjsikonerne rundt om.

### Photos

- kasper.jpg: rigtigt foto af Kasper Schrøder Asmussen. Bruges kvadratisk med `radius-tab` i "Om mig" og som 44px avatar med 10px hjørner i chatvinduet i hero.

### Tools

Logoer for de værktøjer, Kasper bygger med: Claude, GitHub, Google Cloud, Google Sheets, Lovable, n8n, Netlify og VS Code. Fra Iconify Logos og Simple Icons (CC0). Vises i deres egne farver i lyse app-ikoner (`tile`, `radius-tab`, `shadow-tile`), let drejet og spredt rundt om flisen i værktøjssektionen.

### CSS-variabler

Kopiér dette ind i et stylesheet for at bruge farverne direkte.

```css
:root {
  --bg: #ffffff;
  --soft: #f4f2f8;
  --ink: #0f0e13;
  --muted: #5e5a6b;
  --line: #e4e1ec;
  --plus: #a7a3b2;
  --rail: #d3cfdd;
  --focus: #7c3aed;
  --hover: rgba(15, 14, 19, 0.04);
  --btn-hover: #2b2932;
  --tile: #ffffff;
  --accent: #7c3aed;
  --s1: #7c3aed;
  --s2: #9333ea;
  --s3: #c026d3;
  --s4: #db2777;
  --p-deep: #4c1d95;
  --p-violet: #7c3aed;
  --p-orchid: #c026d3;
  --p-rose: #f472b6;
  --radius: 22px;
  --radius-stage: 26px;
  --radius-tab: 16px;
  --radius-window: 14px;
  --radius-input: 10px;
  --radius-pill: 999px;
  --max: 72rem;
  --read: 40rem;
  --gutter: clamp(1.25rem, 4vw, 3rem);
  --rail-inset: clamp(.75rem, 3vw, 2.5rem);
  --shadow-hero: 0 30px 90px rgba(124, 58, 237, 0.35);
  --shadow-tab: 0 14px 34px rgba(15, 14, 19, 0.18);
  --shadow-tile: 0 1px 2px rgba(15, 14, 19, 0.06), 0 8px 20px rgba(15, 14, 19, 0.08);
  --shadow-app: 0 30px 70px rgba(20, 10, 60, 0.45);
  --shadow-toggle: 0 1px 3px rgba(15, 14, 19, 0.15);
  --font: "Geist", "Helvetica Neue", Arial, sans-serif;
}

:root[data-theme="dark"] {
  --bg: #0f0e13;
  --soft: #1e1c24;
  --ink: #f4f2f8;
  --muted: #a7a3b2;
  --line: #2b2932;
  --plus: #6b6778;
  --rail: #3b3845;
  --focus: #f472b6;
  --hover: rgba(244, 242, 248, 0.05);
  --btn-hover: #d9d6e2;
  --tile: #f4f2f8;
  --accent: #f472b6;
  --s1: #8b5cf6;
  --s2: #a855f7;
  --s3: #d946ef;
  --s4: #f472b6;
}
```
