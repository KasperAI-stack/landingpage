# Konverteringssporing i Google Tag Manager

Siden sender to signaler (events) til Google Tag Manager:

| Event | Hvornår | Hvor i koden |
|---|---|---|
| `henvendelse_sendt` | Når tak-siden vises, altså efter en sendt formular | `site/tak.html` |
| `booking_klik` | Når man klikker "Åbn min kalender" | `site/js/main.js` |

Signalerne afhænger ikke af sidernes adresser, så målingen virker, selv om en URL ændrer sig.

## Google Ads

- Konverterings-ID: `18496147052`
- Konverteringslabel: `dcYRCOTilJQdEOyc0_NE`

### 1. Conversion Linker (én gang)
1. I GTM: **Tags**, **Ny**, **Tag-konfiguration**, **Conversion Linker**.
2. Trigger: **All Pages**.
3. Gem som "Conversion Linker".

### 2. Trigger for henvendelser
1. **Triggers**, **Ny**, **Triggerkonfiguration**, **Tilpasset hændelse** (Custom Event).
2. Hændelsesnavn: `henvendelse_sendt`
3. Gem som "Event – henvendelse_sendt".

### 3. Google Ads-konvertering for henvendelser
1. **Tags**, **Ny**, **Google Ads-konverteringssporing**.
2. Konverterings-ID: `18496147052`
3. Konverteringslabel: `dcYRCOTilJQdEOyc0_NE`
4. Trigger: "Event – henvendelse_sendt".
5. Gem som "Google Ads – henvendelse".

### 4. Booking-klik (valgfrit)
Lav en trigger på samme måde med hændelsesnavnet `booking_klik`. Skal booking tælle som en konvertering i Google Ads, så opret en ekstra konverteringshandling i Google Ads, fx "Booking-klik", og brug dens label i et nyt tag. Den label, der står ovenfor, bruges til henvendelser.

### 5. Test og udgiv
1. Klik **Preview** og åbn heyotto.dk.
2. Klik "Book en tid" og derefter "Åbn min kalender". `booking_klik` skal dukke op i Preview.
3. Send en testhenvendelse. På tak-siden skal `henvendelse_sendt` dukke op, og tagget "Google Ads – henvendelse" skal stå under **Tags Fired**.
4. Klik **Indsend** og **Udgiv**.

## Samtykke

Siden sætter Consent Mode til "denied" som standard, og Cookiebot slår samtykke til, når den besøgende siger ja. Google Ads-tagget respekterer det af sig selv. Uden samtykke sender det kun cookiefrie signaler, som Google bruger til at estimere konverteringer.

## Meta (senere)
Når der er et Meta-pixel-ID, laves et tag til pixlen på All Pages og et `Lead`-event på triggeren "Event – henvendelse_sendt". Pixlen skal kræve samtykke til marketing.
