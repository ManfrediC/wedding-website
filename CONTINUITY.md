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
