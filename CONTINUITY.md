# CONTINUITY.md

This file records where the wedding website build stands so future Codex sessions can continue without rediscovering basics.

## Current Objective

Start Phase 0/1 from the build specification:

- create the standard repo structure;
- scaffold an Astro + TypeScript site;
- add project memory/instruction files;
- build the first password-aware multilingual prototype;
- run a local E2E feedback loop with visual inspection.

## Known Inputs

- Main specification: `doc/plans/wedding_website_build_spec.md`
- Visual references: `doc/visuals`
- Draft source site: `https://gdagomcarta.minted.us`
- GitHub repo: `https://github.com/ManfrediC/wedding-website`

## Product Decisions To Preserve

- Wedding date: Friday, 11 June 2027.
- Ceremony: Kirche St. Peter, Zurich.
- Reception and party: Hotel Sonne, Küsnacht.
- Languages: English, Italian, German.
- Privacy: site-wide password protection.
- RSVP direction: Tally + Google Sheets unless changed later.
- Location is Zurich and Küsnacht. Cambridge content from the draft site does not apply.

## Open Decisions

- Final domain.
- Shared wedding password.
- RSVP opening date and deadline.
- Final hero image.
- Exact ceremony, boat, reception, and late-night transport times.
- Accommodation room blocks and booking codes.
- Gift wording.
- Wedding-week contact.

## Checkpoint Log

- 2026-05-10: Repo contained `doc` only. Began scaffold from the build spec and global `.codex` instructions.
- 2026-05-10: Added local-network preview sharing via `bin/dev/share-local.ps1` and `SHARE_PREVIEW.md`.
- 2026-05-10: Expanded Things to Do content from `doc/plans/activity_ideas.md` with Zurich, lake/water, museum/chocolate, day-trip, and longer-trip cards.
- 2026-05-10: Applied `doc/plans/website_edits.txt` to expand the Switzerland Guide with ticket advice, child fares, Zürich Card, budgeting, car/taxi guidance, weather, and socket notes.
- 2026-05-10: Researched and revised travel guidance for Chicago, New York, London, and Sardinia, including EasyJet baggage caveats and Sardinia ferry-to-Genoa driving options.
- 2026-05-10: Replaced low-resolution Minted preview photos with original upload assets from the draft site's embedded photo data; visible couple/location photos are now mostly 1536-2048px on the long side.
- 2026-05-10: Replaced the Things to Do museums placeholder image with a Kunsthaus Zurich exterior photo from Wikimedia Commons and added the source to credits.
- 2026-05-11: Marked `C:/Projects/wedding-website` as a trusted Git directory with `safe.directory` so local Git tooling recognises the repo.
- 2026-05-11: Added the requested travel, accommodation, contact, and transport updates: `G & M` monogram, contact email, route-specific travel photos, Zurich/Kuesnacht venue map, Hotel Sonne/OXEN/Airbnb links, SBB Mobile guidance, airport train guidance, bike suggestion, and corrected child-fare wording.
- 2026-05-11: Refreshed Italian and German draft copy for the updated travel, accommodation, contact, and Switzerland guide pages. English remains the source language and translations still need fluent review.
- 2026-05-11: Added Playwright desktop/mobile E2E tests and a real Android Chrome screenshot check through ADB. Verified with `npm run check`, `npm run build`, `npm run test:e2e`, and `npm run test:android`; Android screenshots are written to `tmp/android`.
- 2026-05-11: Replaced the Sardinia travel card image with a scenic Ogliastra coast photo from Santa Maria Navarrese and removed the previous Cagliari card image.
- 2026-05-11: Added B & B Caffetino-Vino Richterswil as an accommodation option, with a note that it is a small B&B without a lift and guests should check the late return from Kuesnacht.
- 2026-05-11: Added train advice for reaching Kuesnacht ZH from Zurich HB, Zurich Airport, and Richterswil, with SBB Mobile/ZVV as the source of exact day-of connections.
- 2026-05-11: Added `/welcome/` as the password entry page and updated the Cloudflare middleware plus local protected preview server to use `WEBSITE_PW` from `env/website_pw.env` or deployment environment variables. `bin/dev/share-local.ps1` now shares the protected `/welcome/` preview.
- 2026-05-11: Added a FAQ entry explaining how to buy Swiss train tickets, with official SBB and ZVV links, and kept the answer localised in English, Italian, and German draft copy.
- 2026-05-11: Expanded Playwright E2E coverage to Chrome, Edge, Firefox, and WebKit/Safari-like engines across desktop and mobile/narrow viewports. Latest verification: `npm run check`, `npm run build`, `npm run test:e2e` (64 passed), and `npm run test:android` on the connected Android Chrome device.
- 2026-05-11: Linked the Switzerland Guide socket wording to the Wikipedia page for Swiss Type J/SN 441011 sockets, with E2E coverage for the English inline link.
- 2026-05-11: Added the Switzerland Guide exchange-rate widget under Money and budgeting, using the free open-source `fawazahmed0/exchange-api` data source via jsDelivr with a Cloudflare fallback. The widget shows CHF/USD, CHF/EUR, and CHF/GBP in both directions, and the Chicago travel guidance now suggests comparing New York layovers. Verified with `npm run check`, `npm run build`, `npm run test:e2e` (64 passed), a live Edge browser check against the real exchange-rate endpoint, and `npm run test:android` on the connected Android phone.
- 2026-05-11: Replaced the inaccurate Zurich wedding map schematic with an OpenStreetMap-derived SVG asset, retaining crisp SVG labels for Zurich Airport, Zurich HB, Kirche St. Peter, Hotel Sonne, Küsnacht, Altstetten, Oerlikon, and Richterswil. Updated English, Italian, and German map copy to mention Richterswil.
- 2026-05-11: Added Lake and water guidance for Oberer Letten and major Zurich lake badis, with official Stadt Zurich bathing links and a mobile screenshot check.
- 2026-05-11: Researched venue and accommodation accessibility, added Stay page guidance for mobility needs, and recorded source notes in doc/assets/accessibility_research.md.
- 2026-05-11: Polished Italian and German Stay page accessibility copy and repaired encoding damage in the localized Richterswil accommodation text.
- 2026-05-11: Replaced the Schedule reception card with a different official Hotel Sonne wide Festsaal ballroom photo and recorded the new image source.
- 2026-05-11: Replaced the skewed Chicago and London travel photos with straighter Wikimedia Commons images, using Tower Bridge for the UK card, and changed the Schedule reception card to a lake-facing Hotel Sonne view from Lake Zurich.
- 2026-05-11: Replaced the From Zurich Airport travel card image with a Wikimedia Commons photo of the Zürich Flughafen underground railway platforms.
- 2026-05-11: Renamed the Stay page Richterswil accommodation card from "Richterswil option" to "Richterswil" and added a Richterswil lakeside photo.
- 2026-05-11: Added the existing Kirche St. Peter photo to the Stay page Accessibility and mobility card.
