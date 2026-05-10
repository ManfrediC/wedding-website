# AGENTS.md

Project instructions for `wedding-website`. These add to the global rules in `C:\Users\Manfredi\.codex\AGENTS.md`.

## Project Goal

Build a private, custom, multilingual wedding website for Gabriela Dago and Manfredi Carta's wedding on Friday, 11 June 2027 in Zurich and Küsnacht.

## Working Rules

- Treat `doc/plans/wedding_website_build_spec.md` as the product specification.
- Preserve the site tone: warm, elegant, formal, practical, and guest-friendly.
- Use British English in docs, comments, commit messages, and internal prose. Guest-facing copy may use natural wording for each language.
- Do not add secrets, real passwords, private guest details, RSVP data, or unpublished personal contact details to tracked files.
- Keep factual wedding details provisional when they are not confirmed. Prefer `TBD` or "details to be confirmed" over guessing.
- English is the source language. Italian and German copy in this repo is draft until reviewed by fluent speakers.

## Technical Direction

- Use Astro + TypeScript for static multilingual pages.
- Use Cloudflare Pages Functions middleware for deployed password protection.
- Keep RSVP as an external Tally/Google Sheets integration until there is an explicit decision to build a custom backend.
- Keep content that changes often in `src/data`.
- Keep environment examples in `env`; actual local or production secrets must stay untracked.

## E2E Feedback Loop

- Run the local site after significant UI changes.
- Inspect the page visually on desktop and mobile-sized viewports where practical.
- Adapt the implementation based on what is actually rendered, not only on code review.
- Record confirmed state and next steps in `CONTINUITY.md` after meaningful checkpoints.

## Verification

- Run `npm run check` and `npm run build` before calling a coding checkpoint complete.
- If browser/E2E inspection is not possible, state the limitation explicitly.
- Commit only after a tested, coherent checkpoint.
