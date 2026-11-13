# Konverteringssporing

Siden bruger ikke Google Tag Manager. Google tag (GA4 og Google Ads) og CookieScript ligger direkte i koden på alle sider og i templates/blog-side.html. De hentes først ved første scroll, klik, tast eller tryk eller 4 sekunder efter load, så de ikke sinker siden. På tak-siden hentes de med det samme. Hændelser, der sker før, venter i dataLayer og sendes, når gtag er hentet.

| Hændelse | Hvornår | GA4 | Google Ads | Hvor i koden |
|---|---|---|---|---|
| Henvendelse | Når tak-siden vises | `generate_lead` | `AW-18496147052/dcYRCOTilJQdEOyc0_NE` | `site/tak.html` |
| Booking-klik | Klik på "Åbn min kalender" | `booking_klik` | `AW-18496147052/OdDrCNmOn5QdEOyc0_NE` | `site/js/main.js` |

- GA4-måle-id: `G-YRFWXEXL8G`
- Google Ads-konverterings-id: `18496147052`
- CookieScript: `https://cdn.cookie-script.com/s/dde4e3943534fc857bebb2ec9cbcad4d.js`

Nye tags (fx LinkedIn) skal lægges ind i koden samme sted som Google tag, og i templates/blog-side.html, hvorefter bloggen bygges igen.

## Samtykke

Siden sætter Consent Mode til "denied" som standard, før Google tag starter. CookieScript slår samtykke til, når den besøgende siger ja. Det kræver, at Google Consent Mode v2 er slået til i CookieScript-dashboardet. Uden samtykke sender Google kun cookiefrie signaler, som bruges til at estimere konverteringer.

## Meta-pixel

- Pixel-ID: `1616440676548347`
- Pixlen ligger direkte i koden på alle sider. Den er markeret med `type="text/plain" data-cookiescript="accepted" data-cookiecategory="targeting"`, så CookieScript først starter den, når den besøgende har sagt ja til targeting. Det samme gælder `Lead` på tak-siden.
- Den sender `PageView` på alle sider, `Lead` på tak-siden og `BookingKlik` (tilpasset hændelse), når man klikker "Åbn min kalender".
- Meta's `<noscript>`-billede er udeladt, fordi det ville sende data uden samtykke.

## Test
1. Gå til tagassistant.google.com, og forbind `https://heyotto.dk`.
2. Scroll, og sig ja i cookiebanneret. G-YRFWXEXL8G og AW-18496147052 skal vises, og samtykket skal stå som granted.
3. Klik "Åbn min kalender". `booking_klik` og en conversion skal vises.
4. Send en testhenvendelse. På tak-siden skal `generate_lead` og en conversion vises.
5. Meta Pixel Helper skal vise `PageView`, `Lead` og `BookingKlik` efter ja til targeting.

## Cookieindstillinger
Footeren på alle sider har knappen "Cookieindstillinger", som genåbner CookieScript-banneret (`CookieScript.instance.show()`). Linket vises, når CookieScript er hentet (hændelsen `CookieScriptLoaded`).
