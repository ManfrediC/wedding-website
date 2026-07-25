# Current Goal

Deploy the verified RSVP menu wording update and the two pending guest-information
copy changes to production without exposing or losing RSVP data.

Status: Complete on 25 July 2026.

## Measurable outcome

- Cloudflare authentication is available to Wrangler.
- The current D1 Time Travel bookmark is recorded privately before the write.
- Only exact per-guest `None` menu values are migrated to `Meat`.
- No targeted `None` menu values remain after migration.
- The tested repository state is committed and pushed to `origin/master`.
- The Cloudflare Pages production deployment succeeds.
- The live protected-site smoke test passes.

## Completion evidence

- D1 migration `0003_replace_none_menu_with_meat.sql` is applied remotely.
- Both existing RSVP records were verified with zero remaining targeted `None`
  values and unchanged IDs, timestamps, and revision counts.
- Commits `23abdc3` and `9a4d224` were pushed to `origin/master`.
- Cloudflare Pages production deployment `6aefff1f` used source commit `9a4d224`.
- The live protected-site smoke test passed with zero desktop and mobile
  horizontal overflow.
- Direct live readback confirmed the requested English, Italian, and German RSVP
  menu/allergy labels, `Meat` storage values, aligned desktop controls, and no
  label overflow at desktop or mobile widths.

## Verification surface

- `wrangler whoami`
- D1 aggregate count queries before and after migration
- `wrangler d1 migrations list`
- `npm run check`
- `npm run build`
- `npm run test:rsvp:e2e`
- `npm run smoke:live`
- Git status and remote branch state

## Constraints and boundaries

- Do not print or commit RSVP records, contact details, credentials, or the Time
  Travel bookmark.
- Preserve RSVP IDs, contact data, allergies, timestamps, and revision counts.
- Do not alter menu values other than exact legacy `None` values.
- Preserve unrelated user-authored copy changes and include them in the requested
  release.
- Do not restore or delete production data unless separately required.

## Iteration and stop conditions

- Stop before the D1 write if authentication, the bookmark, or aggregate target
  counts cannot be verified.
- Stop deployment if required checks fail.
- If a production verification fails, diagnose without destructive recovery; use
  the recorded bookmark only with explicit approval.
