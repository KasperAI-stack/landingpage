# Bloggen

Bloggen ligger på heyotto.dk/blog. Hvert indlæg er én fil i `site/_blog/`, skrevet i Markdown, men med endelsen `.txt`. Filerne ligger i `site/` og hedder `.txt`, fordi Studio kun må udgive filer i `site/` og ikke `.md`-filer. Det gør, at Studio kan udgive et indlæg helt alene.

## Sådan kommer et indlæg online

1. En indlægsfil i `site/_blog/` bliver pushet til main, enten af Studio eller fra din computer.
2. Netlify springer det push over, fordi det kun ændrer `site/_blog/` (`ignore` i netlify.toml).
3. GitHub kører `scripts/byg-blog.mjs` (`.github/workflows/byg-blog.yml`) og committer den færdige HTML i `site/blog/` og sitemap.
4. Netlify udgiver den commit. Det giver ét deploy pr. indlæg, og Netlify bygger ikke selv.

Fejler bygget, kommer der intet online, og GitHub sender en mail. Fejlen står under Actions på GitHub. Kildefilerne i `/_blog/` giver 404 online, så de kan ikke ses af andre. Kommer der billeder med i samme push, laver Netlify et ekstra deploy, men det skader ikke noget.

Hvordan et indlæg skal bygges op og skrives, står i skillet `blogindlaeg` (.claude/skills/blogindlaeg/retningslinjer.md). Skriv fx "skriv et indlæg om X" til Claude, så følger det arbejdsgangen. Denne fil handler om teknikken.

## Sådan skriver du et indlæg fra din egen computer

1. Kopiér `skabelon-guide.md` eller `skabelon-anmeldelse.md` fra .claude/skills/blogindlaeg/ til `site/_blog/`, og giv kopien et navn, der bliver adressen, med endelsen `.txt`. Brug kun små bogstaver, tal og bindestreger, og skriv æ, ø og å som ae, oe og aa. Filen `saadan-goer-i.txt` bliver til heyotto.dk/blog/saadan-goer-i.
2. Udfyld hovedet øverst (se nedenfor), og skriv teksten.
3. Kør `node scripts/byg-blog.mjs --udkast` og `npx serve site`, og læs indlægget på localhost/blog.
4. Kør `/copy-review` eller tjek teksten mod reglerne i CLAUDE.md.
5. Sæt `udkast: false`, commit `.txt`-filen og billederne, og push til main. GitHub bygger resten.

Har du kørt scriptet lokalt, må det byggede gerne komme med i commit'en. GitHub bygger alligevel igen, og er der ingen forskel, sker der ikke mere.

## Hovedet

```md
---
titel: "Sådan får I AI til at skrive i jeres egen tone"
beskrivelse: "Én sætning til Google og LinkedIn, højst 155 tegn."
dato: 2026-11-11
opdateret: 2026-12-01
type: guide
forfatter: kasper
tags: [Kom i gang med AI, Tekst og indhold]
billede: /assets/blog/tone/forside.webp
billedtekst: "Hvad der er på billedet, til dem der ikke kan se det"
udkast: true
---
```

- `titel`, `beskrivelse` og `dato` skal udfyldes.
- `opdateret` er valgfri. Den vises under titlen og bruges i sitemap og over for Google, når et indlæg er rettet væsentligt.
- `type` er `guide` (standard) eller `anmeldelse`. En anmeldelse skal have en `:::metode`-boks.
- `forfatter` er en nøgle fra `site/_blog/forfattere.json` (standard `kasper`). Navn, foto, bio og LinkedIn hentes derfra til byline, forfatterboks og strukturerede data.
- `tags` er emnerne. Hvert emne får sin egen side på /blog/tag/navn. Brug få, faste emner og stav dem ens hver gang.
- `billede` er valgfri. Det står øverst i indlægget og bruges, når indlægget deles. Uden billede bruges sidens delingsbillede.
- `udkast: true` holder indlægget væk fra siden, sitemap og RSS.

## Det kan du skrive i teksten

Teksten skal starte med en opsummering. Ellers stopper byggescriptet:

```md
:::kort
- Det direkte svar
- Det næstvigtigste
:::
```

Indholdsfortegnelsen laves af alle `##`-overskrifter, og forfatterboksen og bookingboksen kommer af sig selv.

| Skriv | Bliver til |
|---|---|
| `:::metode` ... `:::` | Boksen "Sådan har jeg testet". Påkrævet i anmeldelser. |
| `:::tip` ... `:::` | Boksen "Godt at vide" |
| `Tabel: titel`, derefter `\| A \| B \|`, `\|---\|---\|` og rækkerne | En tabel med titel. Første kolonne bliver rækkernes overskrift. `:--:` centrerer en kolonne, og `--:` højrestiller den. |
| `## Overskrift` og `### Mindre overskrift` | Overskrifter. Brug ikke `#`, for titlen er sidens eneste store overskrift. |
| `**fed**` og `*kursiv*` | **fed** og *kursiv* |
| `[tekst](/adresse)` | Et link |
| `- punkt` eller `1. punkt` | Lister |
| `> tekst` | En lys boks til en vigtig pointe |
| `![alt-tekst](/assets/blog/navn/billede.webp "Billedtekst")` | Et billede på sin egen linje. Alt-teksten skal med, billedteksten er valgfri. |
| `---` | Tre prikker, der markerer et nyt emne |
| `` `kode` `` og ```` ``` ```` | Kode |

Linjer, der starter med `<`, sendes videre som HTML, hvis du har brug for noget særligt.

## Billeder

- Læg dem i `site/assets/blog/<indlæggets-navn>/`.
- Gem dem som WebP, højst 1600 px brede og helst under 150 KB.
- Scriptet læser selv bredde og højde, så siden ikke hopper, mens billedet hentes. Billeder længere nede hentes først, når den besøgende kommer til dem.
- Delingsbilledet til LinkedIn og Facebook bør være 1200 × 630.

## Hvorfor bloggen ikke gør siden langsommere

- Forsiden er uændret, bortset fra linket i footeren.
- Blogsiderne er statiske HTML-filer og bruger ingen ekstra JavaScript. Deres egen styling ligger i `site/css/blog.css` og hentes kun på blogsiderne.
- Skrift, `styles.css` og logo ligger allerede i browserens cache fra forsiden.

## Det laver scriptet

- `site/blog/index.html`: oversigten med de nyeste indlæg først
- `site/blog/<navn>.html`: hvert indlæg, med canonical, delingsbillede og strukturerede data (BlogPosting)
- `site/blog/tag/<emne>.html`: en side pr. emne. De har `noindex`, fordi de er for tynde til Google.
- `site/blog/feed.xml`: RSS
- Blogdelen af `site/sitemap.xml` mellem markeringerne `blog:start` og `blog:slut`. Resten af sitemap skrives stadig i hånden.

Scriptet sletter og laver `site/blog/` forfra hver gang, så ret aldrig i de filer i hånden. Toppen, footeren og tracking ligger i `templates/blog-side.html` og skal holdes ens med de andre sider. Bookingboksen sidst i hvert indlæg står i scriptet.
