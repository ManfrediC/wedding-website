# MEMORY.md

Durable project notes for the wedding website.

## Couple And Event

- Couple: Gabriela Dago and Manfredi Carta.
- Date: Friday, 11 June 2027.
- Ceremony: Kirche St. Peter, Zurich.
- Reception and party: Hotel Sonne, Küsnacht.
- Overall setting: Zurich old town, Lake Zurich, Küsnacht waterfront.

## Design Memory

- Reference visuals favour an editorial ivory layout, refined serif headings, restrained navigation, thin dividers, practical cards, and Zurich/lake imagery.
- Avoid a generic SaaS or marketing feel. This should feel like an elegant private wedding site that also works as a travel guide.
- Use visual assets, but final couple/venue photography is not yet selected. Placeholder imagery should be easy to swap.
- Use original Minted upload URLs for couple photos where available; avoid re-downloading the 400px preview assets.

## Content Memory

- English is the source language.
- Italian and German drafts should remain marked as needing fluent review.
- Activity ideas live in `doc/plans/activity_ideas.md`; keep refining them with Manfredi and his brothers.
- Website edit requests may arrive in `doc/plans/website_edits.txt`; apply them as concrete content updates and preserve evidence for travel/ticket claims.
- Italian guest travel should focus on Sardinia, especially Cagliari/Olbia flights and ferry-to-Genoa plus driving options; EasyJet can be budget-friendly but baggage rules need a clear warning.
- Travel photo choices should match the origin/place: Chicago skyline, New York skyline, Westminster for London/UK, and scenic Ogliastra imagery for Sardinian guests. Avoid the disliked previous London, SBB train, Zurich tram, and distorted Saentis cablecar photos.
- Chicago travel guidance should invite guests to compare fares with a New York layover, as Chicago-Zurich itineraries via New York can sometimes be cheaper than nonstop flights.
- Zurich guidance should strongly favour public transport: tram, train, bus, boat, SBB Mobile, and optional bike rental. Ordinary Zurich wedding logistics should discourage driving, taxis, and rental cars.
- Zurich Airport guidance should highlight the convenient train/S-Bahn connection and advise guests to use the train rather than driving or taking a taxi unless luggage, children, or accessibility make that useful.
- The Zurich wedding map should use an OpenStreetMap-derived geography, not a hand-drawn schematic, and should include Richterswil because Manfredi's parents live there.
- Train-ticket guidance should point guests first to SBB Mobile, with ZVV app/ticket machines as Zurich-area alternatives. Tickets must be bought before boarding; ZVV tickets are zone-based and cover trains, trams, buses, and boats in the selected zones.
- The Switzerland Guide exchange-rate widget uses the free open-source `fawazahmed0/exchange-api` source, served through jsDelivr with a Cloudflare fallback, and shows CHF/USD, CHF/EUR, and CHF/GBP in both directions.
- Accommodation guidance should mention Hotel Sonne Kuesnacht, OXEN Kuesnacht, Airbnb searches for Zurich in June 2027, and more economical hotel areas in Zurich Altstetten or Oerlikon.
- Guest-facing contact email is `gabyandmanfredi@gmail.com`.
- Boat transfer wording must stay careful: host-arranged boat transfer, details to be confirmed.
- Cambridge and UK photos from the Minted draft are intentionally excluded because the wedding location is Zurich and Kuesnacht.
- Children and plus ones are currently interpreted as welcome, but invitation policy may later become more specific.
- Do not imply guests need to buy boat tickets unless that is confirmed.

## Development Memory

- Local Git trust has been set with `safe.directory` for `C:/Projects/wedding-website`.
- Standard verification before a checkpoint: `npm run check`, `npm run build`, `npm run test:e2e`, and, when the phone is connected, `npm run test:android`.
- `npm run test:e2e` covers Chrome, Edge, Firefox, and WebKit/Safari-like rendering. Firefox requires `MOZ_DISABLE_CONTENT_SANDBOX=1` in the Playwright launch options on this Windows workstation.
- The Android device seen on 2026-05-11 was `RFCW30AS8RE` in ADB debug mode; Android screenshots are saved under `tmp/android`.

## Privacy Memory

- The deployed site should be password-protected before guests receive the link.
- Use `WEBSITE_PW` for the site password in Cloudflare/local protected preview environments. The local secret source is `env/website_pw.env`, which must remain untracked.
- Use `noindex, nofollow` and restrictive `robots.txt`.
- Never commit the real password, guest list, RSVP submissions, private addresses, or unpublished contact details.
