---
name: blogindlaeg
description: Skriver, opdaterer, tjekker og udgiver blogindlæg til heyotto.dk/blog efter Hey Ottos faste retningslinjer, så indlæggene er lette at læse og kan citeres af AI. Bruges til guides til at komme i gang med AI og til anmeldelser og sammenligninger af AI-værktøjer. Brug skillet, når Kasper vil skrive, opdatere, gennemgå eller udgive et blogindlæg eller en artikel, også ved korte beskeder som "skriv et indlæg om X", "lav en anmeldelse af Y", "opdater priserne i indlægget om Z" eller "er det her indlæg godt nok?".
---

# Blogindlæg til heyotto.dk

Læs først:

1. [retningslinjer.md](retningslinjer.md): hvordan et indlæg bygges op, skrives og vedligeholdes
2. Reglerne for sprog og tone i CLAUDE.md
3. [docs/blog.md](../../../docs/blog.md): hvad indlægsfilen kan indeholde, og hvordan bloggen bygges

Skabelonerne ligger i [skabelon-guide.md](skabelon-guide.md) og [skabelon-anmeldelse.md](skabelon-anmeldelse.md).

## Den vigtigste regel

Opfind aldrig erfaringer, tests, resultater, tal, kunder eller citater. Det, kun Kasper kan vide, skal komme fra Kasper. Mangler det, skrives en pladsholder i firkantede parenteser, og indlægget bliver ved med at være et udkast.

## Sådan kommer et indlæg online

Et indlæg er én fil: `site/_blog/<adresse>.txt`. Filen er skrevet i Markdown, men hedder `.txt`, fordi Studio ikke må udgive `.md`. Filnavnet bliver adressen, så `site/_blog/claude-anmeldelse.txt` bliver til heyotto.dk/blog/claude-anmeldelse.

Når filen bliver pushet til main, bygger GitHub selv bloggen (`.github/workflows/byg-blog.yml`) og committer den færdige HTML i `site/blog/`. Derefter udgiver Netlify. Det tager et par minutter.

- **Ret aldrig i `site/blog/`.** De filer laves forfra ved hver build, så alt, der er rettet i hånden, forsvinder.
- **Billeder** lægges i `site/assets/blog/<adresse>/` som `.webp` og udgives sammen med indlægget.
- **En ny forfatter** tilføjes i `site/_blog/forfattere.json`.
- **Fejler bygget**, fx fordi "Kort fortalt" mangler, kommer indlægget ikke online. GitHub sender så en mail til Kasper, og fejlen står under Actions på GitHub.

## Nyt indlæg

1. **Afklar.** Spørg om det, der mangler, i én samlet besked:
   - Typen: guide eller anmeldelse.
   - Spørgsmålet, indlægget skal svare på.
   - Kaspers egne erfaringer, noter, resultater og skærmbilleder. De er påkrævet i en anmeldelse. Har Kasper ikke selv brugt værktøjet, skal indlægget være en guide.
   - Om Hey Otto bruger værktøjet, eller om Kasper får noget for at nævne det.
2. **Tjek, om emnet findes.** Se i `site/_blog/`, om et indlæg allerede svarer på spørgsmålet eller går efter samme søgeord. Gør det, så foreslå at opdatere det i stedet.
3. **Undersøg.** Find priser, udgaver, sprog og hvor data ligger på producentens egne sider. Notér link og dato for hver oplysning. Brug primærkilder til eksterne tal.
4. **Disposition.** Vis Kasper titlen, punkterne i "Kort fortalt", alle `##`-overskrifter og de tabeller, indlægget skal have. Vent på et ja, før der skrives.
5. **Skriv.** Brug den rigtige skabelon, og skriv indlægget efter retningslinjerne i `site/_blog/<adresse>.txt`.
6. **Tjek selv det, byggescriptet tjekker,** for i Studio kan scriptet ikke køres før udgivelsen:
   - Hovedet har `titel`, `beskrivelse` og `dato` (ÅÅÅÅ-MM-DD), og `type` er `guide` eller `anmeldelse`.
   - Teksten starter med `:::kort`, og alle bokse (`:::kort`, `:::metode`, `:::tip`) slutter med en linje med `:::`.
   - En anmeldelse har en `:::metode`-boks.
   - Ingen `#`-overskrift i teksten, kun `##` og nedefter.
   - Alle billeder har alt-tekst, og stierne findes i `site/assets/`.
   - Filnavnet har kun små bogstaver a-z, tal og bindestreger.
7. **Gennemgå.** Kør `/copy-review` på teksten, og gå tjeklisten i retningslinjerne igennem. Skriv til Kasper, hvilke punkter der ikke er opfyldt, og hvilke pladsholdere der står tilbage.
8. **Udgiv, når Kasper siger god for det,** og kun hvis der ikke er pladsholdere tilbage:
   - **I Studio:** udgiv `site/_blog/<adresse>.txt` og eventuelle billeder med site_publish.
   - **I landingpage-repoet:** kør gerne `node scripts/byg-blog.mjs --udkast` og `npx serve site` for at se indlægget først. Commit derefter `.txt`-filen og billederne, og push til main, når Kasper beder om det. Du behøver ikke selv committe det byggede, for GitHub bygger igen.
9. **Tjek resultatet.** Efter et par minutter skal indlægget kunne ses på heyotto.dk/blog/<adresse>. Gør det ikke det, så se under Actions på GitHub, om bygget fejlede.

`udkast: true` holder et indlæg væk fra siden, også selvom filen er udgivet. Det kan bruges til at gemme et halvfærdigt indlæg.

## Opdatere et indlæg

1. Tjek alle priser, udgaver og funktioner igen på producentens sider.
2. Ret teksten og tabellerne, og opdater datoen i tabeltitlerne.
3. Sæt `opdateret` til dagens dato, men kun hvis noget væsentligt er ændret.
4. Ret aldrig filnavnet. Det er adressen.
5. Tjek og udgiv som ved et nyt indlæg.

## Gennemgå et indlæg

Gå tjeklisten i retningslinjerne igennem, og svar med en tabel med punkt, status og hvad der skal rettes. Ret ikke noget, før Kasper har set listen.

## Slette eller lægge sammen

Det kan Studio ikke gøre alene, for det kræver en ændring i `netlify.toml`. I landingpage-repoet: slet `.txt`-filen, og tilføj en 301-viderestilling i `netlify.toml` fra `/blog/<gammel-adresse>` til det indlæg, der bedst afløser det. Push, så bygger GitHub bloggen uden indlægget.
