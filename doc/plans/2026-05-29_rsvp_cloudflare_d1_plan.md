# Cloudflare D1 RSVP Implementation Plan

Prepared: 29 May 2026

## 1. Decisions Captured

- Use Cloudflare D1 as the RSVP system of record.
- Build an admin/viewing system for responses; the Cloudflare D1 dashboard is useful for emergency SQL access, but it is not enough as the day-to-day RSVP management surface.
- Do not use invitation codes.
- Do not support guest-side editing links. If the same email submits again, the new response supersedes the previous current response.
- Collect general attendance only. Guests who cannot attend the whole day can explain this in notes.
- Collect adult names, child names, and child ages. Child meal needs can be included in notes.
- Omit travel origin and accommodation status.
- Send a submission notification to `manfrediandgabriela@gmail.com`.
- Keep RSVP data until manually deleted.
- Build the guest RSVP form as multilingual site UI, visually aligned with the existing website.

## 2. Product Survival Brief

Primary workflow:

- An invited guest unlocks the password-protected website, opens the RSVP page in English, Italian, or German, completes the form, and receives a clear success message.
- The couple can open a protected admin page, view current RSVP responses, see totals, export CSV, and delete records when they choose.

Core data object and owner:

- Core object: one current RSVP response keyed by normalised email address.
- Owner: Gabriela and Manfredi.
- Data subject: the guest or household submitting the response.
- Supersession rule: a later submission with the same normalised email replaces the current row rather than creating another active RSVP.

Roles and permissions affected:

- Guest: can submit a response after passing the existing site password.
- Admin/couple: can view, export, and delete RSVP responses after a stronger admin gate.
- Cloudflare dashboard operator: can manage the D1 database and bindings.

Lifecycle states:

- `draft` in browser only, before submission.
- `submitted` stored in D1.
- `superseded` represented by `revision_count`/`updated_at` on the current row, not by keeping old PII forever.
- `deleted` after admin deletion.

Admin/support need:

- View all current responses.
- Filter by attending/not attending.
- Search by name or email.
- See totals for attending adults and children.
- Export current data as CSV.
- Delete one response, and optionally delete all responses after explicit confirmation.

Observability need:

- Log failed validation, failed D1 writes, and failed notification sends without logging full RSVP notes or sensitive free text.
- Show clear guest-facing errors for validation or temporary submission failure.
- Admin dashboard should show submitted/updated timestamps and notification status.

Non-goals:

- No Formspree as the primary data processor.
- No Google Sheets as the source of truth.
- No invitation-code guest list.
- No event-by-event attendance matrix.
- No custom email confirmation to guests in the first implementation unless explicitly added later.
- No automatic deletion schedule.
- No public RSVP data in static build output.

## 3. Architecture

### Recommended Shape

- Static Astro pages remain the presentation layer.
- Cloudflare Pages Functions handle runtime RSVP and admin API routes.
- Cloudflare D1 stores current RSVP responses.
- Cloudflare Email Sending sends the admin notification and guest confirmation email.
- Existing site-wide password middleware continues to protect guest pages.
- Admin routes get a separate, stronger admin authentication layer or Cloudflare Access.

### Why D1

Cloudflare D1 is a managed serverless SQLite database that can be queried from Workers and Pages Functions. Cloudflare Pages Functions support D1 bindings through the dashboard or a Wrangler configuration file. D1 Time Travel provides point-in-time recovery within the last 30 days, but long-term safety still benefits from CSV or SQL exports before major changes.

### Cloudflare MCP Check

Cloudflare MCP/API checks on 29 May 2026 found:

- Existing Pages project: `wedding-website`
- Current Pages domain: `wedding-website-2ng.pages.dev`
- D1 database created for RSVP: `wedding_rsvp`
- Available D1 API surface includes database create/list/query/export/import and time-travel restore endpoints.
- Email Sending API surface includes `POST /accounts/{account_id}/email/sending/send`.

The `wedding_rsvp` D1 database was created through the Cloudflare MCP/API and the initial migration was applied remotely.

## 4. Implementation Decisions

1. Email sender for notifications and confirmations.
   - Use Cloudflare Email Sending through the Cloudflare API.
   - Store the API token only as a Cloudflare Pages secret.
   - Send one admin notification to `manfrediandgabriela@gmail.com` and one guest confirmation email with the submitted summary.
   - Local and E2E tests use a mock notification sender.

2. Admin protection method.
   - Implement a custom admin password in Pages Functions using `RSVP_ADMIN_PASSWORD` and an HttpOnly admin cookie.
   - Cloudflare Access can still be layered over `/admin/*` later as an additional perimeter control.

3. Guest confirmation email.
   - Included.
   - The confirmation email summarises attendance, adults, children, dietary requirements, allergies, accessibility or mobility considerations, and notes.

## 5. Data Model

Create one D1 database, proposed name:

```txt
wedding_rsvp
```

Create one current-response table:

```sql
CREATE TABLE rsvp_responses (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL CHECK (language IN ('en', 'it', 'de')),
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
  primary_guest_name TEXT NOT NULL,
  adult_count INTEGER NOT NULL DEFAULT 0 CHECK (adult_count >= 0),
  adults_json TEXT NOT NULL DEFAULT '[]',
  child_count INTEGER NOT NULL DEFAULT 0 CHECK (child_count >= 0),
  children_json TEXT NOT NULL DEFAULT '[]',
  dietary_requirements TEXT NOT NULL DEFAULT '',
  allergies TEXT NOT NULL DEFAULT '',
  accessibility_mobility TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  notification_status TEXT NOT NULL DEFAULT 'not_sent',
  notification_error TEXT NOT NULL DEFAULT '',
  revision_count INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_rsvp_responses_attending ON rsvp_responses(attending);
CREATE INDEX idx_rsvp_responses_updated_at ON rsvp_responses(updated_at);
```

Notes:

- `email_normalized` is the deduplication key.
- Second submissions update the same row, increment `revision_count`, and replace the current RSVP details.
- Old free-text PII is not retained by default. D1 Time Travel can still recover recent mistakes within its recovery window.
- `adults_json` stores adult names as an array of strings.
- `children_json` stores child objects such as `{ "name": "Name", "age": 8 }`.
- Counts are kept as normal columns so the admin dashboard can summarise quickly.

Optional audit table, only if needed after first testing:

```sql
CREATE TABLE rsvp_events (
  id TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('created', 'updated', 'deleted')),
  occurred_at TEXT NOT NULL
);
```

This audit table should avoid storing old notes, dietary details, allergies, or child names.

## 6. Guest RSVP Form

Route:

```txt
/:lang/rsvp/
```

Fields:

- Primary guest name.
- Email.
- Attendance: yes / no.
- Adults attending:
  - count;
  - names.
- Children attending:
  - count;
  - names and ages.
- Dietary requirements.
- Allergies.
- Accessibility or mobility considerations.
- Notes.

Behaviour:

- Form copy and validation messages come from `src/data`.
- The UI should use the same typography, spacing, colour palette, buttons, and notice-band style as the current site.
- Use progressive enhancement: a standard form POST should work; JavaScript may enhance inline validation and success states.
- On successful submission, show a warm confirmation message in the selected language.
- Make it clear that a later submission with the same email replaces the earlier response.

Suggested English privacy note:

> We will use your RSVP information only to plan the wedding, including attendance, seating, dietary requirements, accessibility arrangements, and guest support. If you submit again with the same email address, your latest response will replace the previous one.

## 7. API Routes

Guest route:

```txt
POST /api/rsvp
```

Responsibilities:

- Accept form data or JSON.
- Validate every field at the server boundary.
- Normalise and validate email.
- Enforce maximum lengths for all text fields.
- Enforce reasonable maximum counts for adults and children.
- Upsert the current D1 row by `email_normalized`.
- Send or queue the notification email after the D1 write succeeds.
- Return safe, localised success/error responses.

Admin routes:

```txt
POST /api/admin/login
POST /api/admin/logout
GET  /api/admin/rsvp
GET  /api/admin/rsvp.csv
DELETE /api/admin/rsvp/:id
```

If Cloudflare Access is used, custom login/logout routes may not be needed.

Admin route requirements:

- Deny by default.
- Require separate admin authentication, not only the shared wedding password.
- Bound list results.
- Do not expose stack traces, SQL errors, secrets, or raw provider errors.
- CSV export must escape fields correctly.
- Delete operations require explicit confirmation in the UI.

## 8. Admin UI

Route:

```txt
/admin/rsvp/
```

Design:

- Align with the existing site visual system, but keep the surface practical and dense.
- Use the existing background, typography, button, focus, and content-band language where possible.
- Avoid decorative marketing sections.
- Desktop: summary strip plus sortable/filterable table.
- Mobile: summary strip plus compact response cards.

Views and controls:

- Totals:
  - responses;
  - attending households;
  - not attending households;
  - adults attending;
  - children attending.
- Filters:
  - all;
  - attending;
  - not attending;
  - notification issue.
- Search by guest name or email.
- Response detail drawer/modal for full notes, allergies, dietary requirements, and accessibility text.
- CSV export button.
- Delete response action.

Admin data should be loaded at runtime through authenticated API calls, never baked into Astro static HTML.

## 9. Email Notification

Recipient:

```txt
manfrediandgabriela@gmail.com
```

Recommended notification contents:

- Subject: `New wedding RSVP from {primary_guest_name}`
- Attendance status.
- Adult count and child count.
- Link/reminder to open the admin RSVP page.
- A short reminder to open the RSVP admin page for the full record.

Guest confirmation contents:

- Subject: localised confirmation for Gabriela and Manfredi's wedding RSVP.
- Attendance status.
- Adult and child names.
- Dietary requirements, allergies, accessibility or mobility considerations, and notes.
- Reminder that a later submission with the same email replaces the earlier response.

Failure behaviour:

- RSVP submission succeeds if D1 write succeeds, even if email notification fails.
- Store `notification_status` as `sent` or `failed`.
- Show notification failures in the admin dashboard.

## 10. Security And Data Safeguards

- Keep D1 binding, email API keys, admin password, and auth secrets out of tracked files.
- Add environment examples only, never real values.
- Use prepared D1 statements only.
- Validate all inputs server-side.
- Add payload and field length limits.
- Add a simple anti-spam control before opening RSVP publicly within the password-protected site.
  - Preferred: Cloudflare Turnstile on the RSVP form.
  - Fallback: honeypot field plus rate limit by hashed email/IP where practical.
- Use HttpOnly, Secure, SameSite cookies for admin sessions if custom admin auth is used.
- Keep admin routes under `X-Robots-Tag: noindex, nofollow`.
- Do not log full RSVP payloads.
- Keep delete operations deliberate and visible.

## 11. Files Expected To Change

Likely new files:

- `wrangler.jsonc`
- `migrations/0001_create_rsvp_responses.sql`
- `functions/api/rsvp.ts`
- `functions/api/admin/login.ts`
- `functions/api/admin/logout.ts`
- `functions/api/admin/rsvp/index.ts`
- `functions/api/admin/rsvp/[id].ts`
- `src/components/RSVPForm.astro`
- `src/components/AdminRsvpDashboard.astro`
- `src/pages/admin/rsvp.astro`
- `src/data/rsvp.ts`
- `tests/e2e/rsvp.spec.ts`

Likely edited files:

- `src/pages/[lang]/[page].astro`
- `src/data/content.ts`
- `src/styles/global.css`
- `functions/_middleware.ts`
- `env/README.md`
- `README.md`
- `CONTINUITY.md`
- `package.json` if new scripts are needed for Wrangler/D1 development.

## 12. Implementation Phases

### Phase 1 - Cloudflare D1 foundation

- Create D1 database in Cloudflare.
- Add `wrangler.jsonc` with Pages output, compatibility date, and D1 binding.
- Add D1 migration for `rsvp_responses`.
- Document local and production binding setup.

Acceptance evidence:

- D1 database exists.
- Migration applies locally and remotely.
- Pages project has the D1 binding configured.

### Phase 2 - Guest RSVP submission

- Replace the empty RSVP content with the multilingual form.
- Add `POST /api/rsvp`.
- Add server-side validation and D1 upsert.
- Add success and error states.
- Add focused tests for valid submission, invalid email, oversized notes, and second submission supersession.

Acceptance evidence:

- English, Italian, and German RSVP pages render the form.
- A valid RSVP stores in D1.
- A second submission with the same email replaces the current response.
- Invalid submissions do not write to D1.

### Phase 3 - Admin dashboard

- Add protected `/admin/rsvp/`.
- Add authenticated admin API list and CSV export.
- Add summary counts, filters, search, detail view, and delete response.
- Keep admin UI visually aligned but operational.

Acceptance evidence:

- Unauthenticated admin access is denied.
- Authenticated admin can view responses and export CSV.
- Delete removes the selected response.
- Current totals match stored data.

### Phase 4 - Email notifications

- Configure Cloudflare Email Sending.
- Store API key as a Cloudflare Pages secret.
- Send admin notification and guest confirmation after successful D1 write.
- Track notification status in D1.

Acceptance evidence:

- Test submission writes to D1 and sends an admin notification to `manfrediandgabriela@gmail.com` plus a guest confirmation email.
- If notification fails, the RSVP still remains stored and the admin dashboard shows the failure.

### Phase 5 - Hardening and release rehearsal

- Add Turnstile or equivalent anti-spam control.
- Run local and protected preview checks.
- Run a live staging RSVP test.
- Export CSV and verify it opens cleanly.
- Document deletion/export process.

Acceptance evidence:

- `npm run check`
- `npm run build`
- RSVP E2E tests.
- Protected smoke test.
- Manual desktop and mobile visual inspection.
- Live Cloudflare test after deployment.

## 13. Verification Plan

Automated checks:

- Astro check/build.
- Unit-level validation tests if a test runner is added.
- Playwright guest RSVP flow:
  - submit attending response;
  - submit not-attending response;
  - same-email supersession;
  - required-field errors;
  - multilingual form labels.
- Playwright admin flow:
  - unauthenticated admin denied;
  - authenticated admin sees submitted response;
  - CSV export contains expected escaped values;
  - delete removes row.

Manual checks:

- Desktop and mobile visual inspection of RSVP page.
- Desktop and mobile visual inspection of admin page.
- D1 dashboard confirms row creation/update.
- Email notification arrives.
- CSV export opens in spreadsheet software.

Skipped until explicit approval:

- Production data deletion tests against real responses.
- Any paid email/API usage beyond a minimal test send.

## 14. Release Gates

Gate A - Product and architecture:

- Passed when this plan is accepted and email/admin-auth decisions are closed.

Gate B - Security:

- Passed when admin route has separate auth, input validation is server-side, secrets are in Cloudflare env/secrets only, and negative auth tests pass.

Gate C - Data and performance:

- Passed when D1 schema and indexes are applied, list/export routes are bounded, and supersession is verified.

Gate D - External integrations:

- Passed when the email provider is chosen, secrets are configured outside the repo, and notification failure does not lose RSVP data.

Gate E - Operations and support:

- Passed when admin view, CSV export, delete flow, D1 backup/export notes, and notification status are available.

Gate F - Frontend and user recovery:

- Passed when guest form has loading, success, validation failure, temporary failure, and mobile states.

Gate G - Verification:

- Passed when configured checks and E2E flows run successfully, with any skipped checks listed explicitly.

## 15. Source Notes

- Cloudflare D1 docs: `https://developers.cloudflare.com/d1/`
- D1 Time Travel and backups: `https://developers.cloudflare.com/d1/reference/time-travel/`
- Cloudflare Pages Functions bindings: `https://developers.cloudflare.com/pages/functions/bindings/`
- Cloudflare Pages Wrangler configuration: `https://developers.cloudflare.com/pages/functions/wrangler-configuration/`
- Cloudflare Formspree tutorial considered but not selected as the main approach because the chosen system of record is Cloudflare D1.
