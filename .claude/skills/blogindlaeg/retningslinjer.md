# Retningslinjer for blogindlæg på heyotto.dk

Disse regler gælder alle indlæg. Reglerne for sprog og tone i CLAUDE.md gælder også, og hvis de to steder er uenige, gælder CLAUDE.md.

## Målet

Bloggen skal citeres af AI-assistenter som ChatGPT, Claude, Perplexity og Googles AI-oversigter, og den skal findes på Google af folk, der ikke kender Hey Otto i forvejen.

AI citerer ikke en side, fordi den er lang. Den citerer kilder, der er lette at kontrollere, svære at erstatte og tydelige om, hvem der står bag. Derfor gælder det, at **færre og bedre indlæg slår mange tynde**. Hvert indlæg skal være det bedste svar på ét bestemt spørgsmål, og helst et svar, som kun Kasper kan give, fordi det bygger på hans egne tests og erfaringer.

## Læseren

Læseren står uden for. Vedkommende kender hverken Hey Otto eller Kasper, arbejder i en mindre eller mellemstor virksomhed uden egne AI-folk og vil gerne i gang, men ved ikke hvor.

Det betyder:

- Forklar et begreb, første gang det bruges, med én sætning.
- Forudsæt ikke, at læseren har læst andre indlæg eller forsiden.
- Skriv bredt. Eksemplerne må gerne komme fra forskellige brancher, men indlægget må ikke skrives til én bestemt branche.

## Typer af indlæg

| Type | Formål | Titel, eksempel | Skal indeholde |
|---|---|---|---|
| Guide (`type: guide`) | Hjælpe læseren i gang med en konkret opgave | "Sådan kommer I i gang med AI til nyhedsbreve" | Trin i rækkefølge, en tabel med trin, tid og pris, typiske fejl og hvad I gør bagefter |
| Anmeldelse (`type: anmeldelse`) | Vurdere ét værktøj ud fra Kaspers egen brug | "Claude til marketingtekster: anmeldelse efter tre måneders brug" | Faktatabel, metodeboks, fordele og ulemper i en tabel, alternativer og en klar vurdering |
| Sammenligning (`type: anmeldelse`) | Vælge mellem flere værktøjer til samme opgave | "ChatGPT, Claude eller Gemini til marketingtekster" | Samme opgave givet til alle værktøjer, en sammenligningstabel, metodeboks og en anbefaling pr. behov |

## Indlæggets faste opbygning

Rækkefølgen er fast. Det, der er markeret "automatisk", laver byggescriptet selv.

| # | Del | Hvordan | Hvorfor |
|---|---|---|---|
| 1 | Type og titel | `type` og `titel` i hovedet | Titlen svarer til det spørgsmål, læseren stiller |
| 2 | Forfatter og datoer | Automatisk fra `forfatter`, `dato` og `opdateret` | Viser, hvem der står bag, og at indholdet er nyt |
| 3 | Kort fortalt | `:::kort` øverst i teksten, påkrævet | Det vigtigste først, så både læser og AI har svaret med det samme |
| 4 | Indhold | Automatisk fra alle `##`-overskrifter | Læseren kan springe direkte til det, de skal bruge |
| 5 | Brødtekst | `##`-afsnit med tabeller, lister og bokse | Selve svaret, delt op i dele, der kan læses hver for sig |
| 6 | Kilder | `## Kilder` sidst, når der er eksterne påstande | Gør påstandene til at kontrollere |
| 7 | Forfatterboks | Automatisk | Navngiven ekspert med baggrund |
| 8 | Bookingboks | Automatisk, den samme i alle indlæg | Sidens mål er stadig et afklaringsmøde |

### Kort fortalt

- 3 til 5 punkter, i alt 40 til 80 ord.
- Første punkt er det direkte svar på titlens spørgsmål.
- Hvert punkt skal kunne stå alene og give mening, hvis en AI kun citerer det ene punkt.
- Tal skal have enhed og dato, fx "fra 20 dollar pr. bruger om måneden (november 2026)".
- I en anmeldelse er sidste punkt vurderingen: hvem værktøjet passer til, og hvem det ikke passer til.

## Sådan skrives et indlæg, AI kan citere

| Regel | I praksis |
|---|---|
| Svaret først | Første afsnit under hver `##` svarer direkte på overskriften i 2 til 3 sætninger. Forklaring og eksempler kommer bagefter. |
| Overskrifter som spørgsmål | Brug de spørgsmål, folk faktisk stiller, fx "Hvad koster Claude for en lille virksomhed?" frem for "Priser". |
| Hvert afsnit står alene | Skriv ikke "som nævnt ovenfor". Gentag hellere navnet på værktøjet eller begrebet. |
| Klare definitioner | Skriv "En AI-agent er et program, der ..." i stedet for at omskrive. |
| Tal med kilde og dato | Alle priser, grænser og tal har dato og et link til kilden. |
| Egne erfaringer markeres | "Da jeg testede ..." og "I mine tests ..." gør teksten til en primærkilde. Det er det, ingen andre kan kopiere. |
| Samme navne hele vejen | Skriv værktøjernes navne præcis som producenten, og skift ikke mellem flere navne for det samme. |
| Korte afsnit | Højst 3 til 4 sætninger pr. afsnit. Lange forklaringer bliver til lister eller tabeller. |

## Tabeller

Brug tabeller så meget som muligt. Når to eller flere ting sammenlignes på de samme egenskaber, skal det stå i en tabel og ikke i løbende tekst.

- Mindst én tabel i hvert indlæg. Byggescriptet advarer, hvis der ikke er nogen.
- Skriv `Tabel: titel` på linjen lige over tabellen, så den får en titel, som skærmlæsere og AI kan læse.
- Første kolonne er det, der sammenlignes, fx værktøjet eller trinnet.
- Højst 5 kolonner, så tabellen kan læses på en telefon.
- Ingen tomme celler. Skriv "Ikke oplyst" eller "Nej".
- Tal skal have enhed, og priser skal have valuta og dato.

### Faste tabeller

| Indlæg | Tabel | Rækker |
|---|---|---|
| Anmeldelse | Fakta om værktøjet | Hvad det er, pris (med dato), gratis udgave, dansk sprog, hvor data ligger (EU eller USA), bedst til, ikke til |
| Anmeldelse | Fordele og ulemper | Ét punkt pr. række med en kort begrundelse |
| Anmeldelse | Alternativer | Værktøj, bedst til, pris |
| Sammenligning | Sammenligning | Én række pr. værktøj, samme egenskaber i kolonnerne |
| Guide | Trinene | Trin, hvad I gør, tid, pris |

## Bokse

| Boks | Skrives | Bruges til |
|---|---|---|
| Kort fortalt | `:::kort` ... `:::` | Påkrævet, øverst i teksten |
| Sådan har jeg testet | `:::metode` ... `:::` | Påkrævet i anmeldelser og sammenligninger: hvad er testet, hvor længe, på hvilke opgaver og med hvilken udgave |
| Godt at vide | `:::tip` ... `:::` | En vigtig detalje, fx om GDPR eller en faldgrube. Højst 2 pr. indlæg. |

## Længde

Der er ingen fast længde. Et indlæg skal være så langt, at det svarer helt på spørgsmålet, og ikke længere. Fyld for at nå et ordtal skader mere, end det gavner.

| Type | Typisk længde | Del op, hvis det bliver over |
|---|---|---|
| Guide | 1.200 til 2.500 ord | 3.000 ord |
| Anmeldelse | 1.000 til 2.000 ord | 2.500 ord |
| Sammenligning | 1.500 til 3.000 ord | 3.500 ord |

## Sandhed og kilder

Dette er den vigtigste regel. Et indlæg, der bliver taget i en fejl, skader både bloggen og Hey Otto.

- **Erfaringerne skal være Kaspers egne.** Claude må aldrig opfinde tests, resultater, tidsforbrug, kunder, cases eller citater. Mangler der en erfaring, står der en pladsholder i firkantede parenteser, fx [KASPERS ERFARING MED OPSÆTNINGEN], og indlægget kan ikke udgives, før den er udfyldt.
- **En anmeldelse kræver, at Kasper har brugt værktøjet.** Har han ikke det, bliver indlægget en guide i stedet.
- **Priser og funktioner tjekkes på producentens egen side**, samme dag som indlægget skrives eller opdateres. De står med dato og link.
- **Eksterne tal kommer fra primærkilden**, altså den, der har lavet undersøgelsen, og ikke fra en blog, der gengiver den.
- **Vær åben om forbindelser.** Bruger Hey Otto selv værktøjet (fx Claude, n8n eller Google Cloud), eller får Kasper noget for at nævne det, står det i metodeboksen.
- **Vurderinger markeres som vurderinger**, fx "Min vurdering er ...".

## Titel, adresse og søgning

| Felt | Regel |
|---|---|
| Titel | Højst 60 tegn. Svarer til det spørgsmål, folk søger på, og indeholder hovedsøgeordet. |
| Beskrivelse | 120 til 155 tegn. Selve svaret i kort form, ikke en reklame. |
| Filnavn og adresse | Kort og med søgeordet, fx `claude-anmeldelse.txt`. Ændres aldrig efter udgivelse. |
| Søgeord | Ét hovedsøgeord pr. indlæg. To indlæg må ikke konkurrere om det samme søgeord. |
| Interne links | 2 til 5 links til andre indlæg, når de findes. Linkteksten siger, hvad læseren får. |
| Eksterne links | Til primærkilder og producenternes egne sider. |
| Emner (tags) | 1 til 3 fra den faste liste herunder. |
| Billeder | WebP, højst 1600 px brede og under 150 KB, altid med alt-tekst. Rene vektorgrafikker eller skærmbilleder, ingen detaljerede AI-genererede billeder. |

### Faste emner

Forslag. De skal godkendes af Kasper, før de bruges.

| Emne | Bruges til |
|---|---|
| Kom i gang med AI | De første skridt, valg af værktøj og opsætning |
| AI-værktøjer | Anmeldelser og sammenligninger |
| Automatisering | Arbejdsgange, der kører af sig selv |
| Tekst og indhold | Nyhedsbreve, SoMe, annoncer og tone |
| Data og GDPR | Hvor data ligger, og hvad I må |

## Vedligehold

- **Opdater frem for at skrive nyt.** Findes der allerede et indlæg om emnet, gør det bedre i stedet for at skrive et nyt, der konkurrerer med det.
- **Indlæg med priser og funktioner tjekkes hvert kvartal.** Når noget er ændret væsentligt, sættes `opdateret` til dagens dato. Datoen må ikke ændres, hvis kun et komma er rettet.
- **Tynde indlæg forbedres, lægges sammen eller slettes.** Et slettet indlæg får en 301-viderestilling i netlify.toml til det indlæg, der bedst afløser det.

## Et sundt site

- robots.txt må ikke lukke AI-crawlere ude (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot og Google-Extended). Lige nu er alt åbent.
- Al tekst står i HTML'en, så crawlere kan læse den uden JavaScript. Det sørger byggescriptet for.
- Strukturerede data (BlogPosting med forfatter) laves automatisk, men de gør ikke et svagt indlæg stærkt.
- Emnesiderne har noindex, så der ikke ligger tynde sider i Google.
- Del hvert indlæg på LinkedIn, og få det gerne nævnt andre steder, fx i nyhedsbreve, podcasts eller gæsteindlæg. Brug aldrig købte links.

## Idéer, som kun Hey Otto kan skrive

Det stærkeste er et indlæg, hvor Kasper er den eneste kilde til svaret:

- Den samme marketingopgave givet til flere værktøjer, med resultaterne side om side.
- Hvad en konkret opgave tog i hånden, og hvad den tog med AI, målt på Kaspers egne opgaver.
- Opsætningen af et værktøj trin for trin med Kaspers egne skærmbilleder.

## Tjekliste før udgivelse

- [ ] Titlen svarer på ét konkret spørgsmål og er højst 60 tegn.
- [ ] Beskrivelsen er 120 til 155 tegn.
- [ ] "Kort fortalt" står øverst med 3 til 5 punkter, og det første punkt er svaret.
- [ ] Mindst tre `##`-overskrifter, og hver starter med svaret.
- [ ] Mindst én tabel, og anmeldelser har de faste tabeller.
- [ ] Anmeldelser har en metodeboks og oplyser forbindelser.
- [ ] Alle priser og tal har dato og kilde, og priserne er tjekket i dag.
- [ ] Ingen pladsholdere i firkantede parenteser er tilbage.
- [ ] Alle billeder har alt-tekst og er under 150 KB.
- [ ] `/copy-review` er kørt, og reglerne for sprog og tone er overholdt.
- [ ] Byggescriptet kører uden fejl og advarsler.
- [ ] Kasper har læst og godkendt indlægget.
