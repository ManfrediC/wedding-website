# Website Refinement Edit Plan

This document turns the current refinement notes into individual, reviewable website edits. Each item should be implemented as a small content or visual change, then checked with the usual local build and mobile review where relevant.

## 1. Replace Swiss Francs Image

- Target page: Switzerland Guide.
- Target section: Money and budgeting.
- Edit: Replace the current stock-style Swiss francs photo with a more tasteful image or visual treatment.
- Direction: Prefer a refined, practical image that still communicates Swiss money or budgeting without feeling generic. Options include a discreet cafe bill, a Zurich shopfront, a payment terminal, or a subtle still life with coins/card.
- Source notes: Use an openly licensed image or an approved original asset. Record the source in the asset credits.
- Verification: Check desktop and mobile layout after replacing the image, especially card crop and alt text.

## 2. Use `Küsnacht ZH` Consistently

- Target pages: Travel, Stay, Schedule, Switzerland Guide, FAQ, and any map or transport copy.
- Edit: Replace ambiguous references to `Küsnacht` with `Küsnacht ZH` where guests are being asked to search, book, navigate, or identify the destination.
- Rationale: Avoid confusion with other places named Küsnacht, including locations outside Zurich.
- Copy note: It is fine to keep natural prose as `Küsnacht` after the destination has already been clearly introduced as `Küsnacht ZH`.
- Also use `Küsnacht` in titles and prominent text.
- Verification: Search the repo for `Küsnacht` and review remaining uses for context rather than replacing blindly.

## 3. Add SBB Booking Reminder

- Target pages: Travel and FAQ.
- Edit: Add a practical reminder that guests should type `Küsnacht ZH` when searching in SBB Mobile or the SBB website.
- Suggested wording: `When searching in SBB Mobile, enter "Küsnacht ZH" to avoid selecting the wrong Küsnacht.`
- Related link: Keep or add the official SBB link where train-ticket guidance appears.
- Verification: Check English first; then update Italian and German draft copy if the same section is localised.

## 4. Encourage SBB Mobile Download

- Target pages: Travel, Switzerland Guide, and FAQ.
- Edit: Make the SBB Mobile recommendation more explicit for guests travelling around Zurich and Switzerland.
- Content points:
  - Download SBB Mobile before travelling.
  - Use it for route planning and ticket purchase.
  - Buy tickets before boarding.
  - Keep tickets and ID available for checks.
- Source notes: Link to the official SBB Mobile Google Play and Apple Store app download link.
- Verification: Confirm links are current before publishing.

## 5. Add Airport To `Küsnacht ZH` Train Directions

- Target pages: Travel and Switzerland Guide.
- Edit: Add concrete directions from Zurich Airport to Küsnacht ZH.
- Draft factual content to verify before publishing:
  - Take the S16 direct from Zurich Airport to Küsnacht ZH.
  - Typical departure pattern: around `01` and `31` minutes past the hour.
  - Typical platform: platform 3.
  - Typical journey time: about 26 minutes.
- Important caveat: Timetables and platforms can change. The site should tell guests to confirm the exact day-of connection in SBB Mobile.
- Verification: Check the current SBB timetable before implementing these details. Avoid presenting platform or minute patterns as permanent.

## 6. Add London Luton As A UK Flight Option

- Target page: Travel.
- Target section: From London / United Kingdom.
- Edit: Mention that London Luton may also have flights to Zurich.
- Copy note: Keep wording flexible because airline schedules change.
- Suggested wording: `London Luton may be a convenient airport for Zurich flights`
- Verification: Check current airline/airport availability before publishing any specific airline claim.

## 7. Add Basel Airport As A Possible But Less Convenient Option

- Target page: Travel.
- Target section: From London / United Kingdom, or a general alternative-airports note.
- Edit: Add Basel as a possible airport, with clear caveats.
- Content points:
  - Basel can be possible if fares are much better.
  - Guests would need to travel from Basel airport to Basel SBB station by bus.
  - From Basel SBB, take a train to Zurich, then continue to Küsnacht ZH.
  - This is likely to add about 2 or more hours in total.
  - It may add roughly CHF 20-40 in extra transport cost.
- Copy note: Present Basel as an alternative to compare, not as the recommended route.
- Verification: Check current public transport routes and approximate fares before implementing.

## 8. Add UK Passport Validity Reminder

- Target pages: Travel and FAQ.
- Edit: Add a reminder for UK nationals to check passport validity before travel.
- Draft factual content to verify before publishing:
  - UK nationals travelling to Switzerland may need a passport issued within the last 10 years and valid for at least 3 months after the planned departure from the Schengen area.
- Important correction needed: Do not publish the raw note `valid for over 6 months` without checking official guidance, because Schengen passport rules are more specific than a simple 6-month rule.
- Source notes: Use the official UK government Switzerland entry requirements page and/or official Swiss entry guidance.
- Verification: Re-check close to launch, since entry rules can change.

## Implementation Order

1. Update transport wording and `Küsnacht ZH` naming across English content.
2. Verify and add SBB Mobile, airport train, Luton, Basel, and passport guidance with official sources.
3. Mirror necessary updates into Italian and German draft copy.
4. Replace the Swiss francs image and update image credits.
5. Run `npm run check`, `npm run build`, and relevant E2E/mobile checks.
6. Record the completed checkpoint in `CONTINUITY.md`.
