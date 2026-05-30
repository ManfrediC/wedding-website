# PLAN

## Goal

Implement the Cloudflare D1 RSVP system from `doc/plans/2026-05-29_rsvp_cloudflare_d1_plan.md` and verify it with E2E coverage.

Status: implemented and verified locally. Production email delivery still requires real Cloudflare Pages secrets and a verified Cloudflare Email Sending sender.

## Acceptance Evidence

- D1 schema and Cloudflare bindings are present and documented.
- Guest RSVP page works in English, Italian, and German.
- `POST /api/rsvp` validates input, stores the current response, supersedes by normalised email, and records notification status.
- Admin dashboard is separately protected, lists current responses, shows totals, exports CSV, and deletes responses.
- E2E tests cover guest submission, same-email supersession, admin auth, CSV export, deletion, and mobile/desktop rendering.
- `npm run check`, `npm run build`, relevant E2E tests, and browser inspection pass or any limitation is explicit.

## Constraints And Boundaries

- Work only in `C:\Projects\wedding-website` and Cloudflare resources needed for this private site.
- Do not commit real passwords, private guest data, RSVP exports, or email secrets.
- Use Cloudflare D1 as the system of record.
- Use the existing website visual language.
- Keep guest copy warm, elegant, formal, practical, and multilingual.
- No invitation codes, no guest-side editing links, no travel/accommodation fields, and no event-by-event attendance matrix.
- Do not send paid or real external email during local tests.

## Current Plan

1. Add D1 schema, Wrangler binding configuration, and Cloudflare Pages Function helpers.
2. Implement guest RSVP API and local protected-preview API simulation.
3. Build the multilingual RSVP form and admin dashboard UI.
4. Add focused E2E tests for the complete RSVP/admin flow.
5. Run checks, inspect visually, update continuity, and complete a final defect-focused review.

## Open Risks / Unknowns

- Real notification email requires Cloudflare Email Sending/Routing setup and a verified sender domain before production use.
- Local E2E will use a mock Send Email binding; production delivery must be smoke-tested after the real binding is configured.
