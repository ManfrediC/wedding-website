# Cloudflare Hosting, Domain, RSVP Data, And Admin Instructions

Prepared: 30 May 2026
Updated: 31 May 2026

## 1. Current State

Cloudflare MCP/API checks on 30 May 2026 found:

- Cloudflare account ID: `43b7bcd0ac30cffda3632878e83bd36d`
- Pages project: `wedding-website`
- Current free URL: `https://wedding-website-2ng.pages.dev/`
- Production branch: `master`
- Build command: `npm run build`
- Build output directory: `dist`
- Current custom domains: none
- D1 database: `wedding_rsvp`
- D1 database ID: `f4166d9c-3f0f-43ff-8c43-2806aa0adbc5`
- Latest confirmed production deployment: commit `2b3b20252135fdc1380ec6a73afbca6a3da1f811`, deployment `e8e0764e-3d3c-48e5-bfda-04bb41538e14`, status `success`

31 May 2026 follow-up:

- Final domain decision: use `gabyandmanfredi.net`.
- Repo-side live smoke testing now targets `https://gabyandmanfredi.net`.
- `npm run smoke:live` passed against `https://gabyandmanfredi.net` on 31 May 2026 after network access was approved, with desktop and mobile overflow both `0`.
- Cloudflare MCP was reachable, but authenticated API readback returned Cloudflare error `10000: Authentication error`. Re-check current Pages custom domains, variables/secrets, DNS, and Email Sending state after the MCP credentials are refreshed.

The repo already declares the RSVP D1 binding in `wrangler.jsonc` as `RSVP_DB`, and the RSVP schema lives in `migrations/0001_create_rsvp_responses.sql`. Cloudflare readback confirmed the `RSVP_DB` binding is present in both production and preview.

The deployed RSVP form now stores per-guest dietary requirements and allergies in the existing `adults_json` and `children_json` D1 columns. No D1 migration was needed for that change; the household-level `dietary_requirements` and `allergies` columns are still used as derived admin/export summaries.

### Recovered Side-Agent Summary

A separate Cloudflare sync worker ran on 30 May 2026. It did not modify repo files, did not deploy code, and did not commit. It reported:

- Synced or confirmed in both production and preview: `WEBSITE_PW`, `RSVP_ADMIN_PASSWORD`, `RSVP_ADMIN_SECRET`, `RSVP_NOTIFICATION_TO`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL_API_TOKEN`.
- Confirmed in production only: `WEDDING_AUTH_SECRET`.
- Still skipped or missing: `WEDDING_AUTH_SECRET` in preview, because safely injecting that local-only value through the current MCP/API path would risk exposing it; `RSVP_NOTIFICATION_FROM` in both environments, deferred until the final domain/sender decision.
- Created a Cloudflare user API token named `wedding-website RSVP Email Sending 2026-05-30`, scoped to Email Sending Write for the account, and stored its one-time value directly as the Pages secret `CLOUDFLARE_EMAIL_API_TOKEN` in both production and preview. The token value was not displayed.
- API calls/checks used: `GET/PATCH /accounts/{account_id}/pages/projects/wedding-website`, `GET/POST /user/tokens`, redacted Pages readback, and a local env non-empty check.

Redacted Pages readback after the worker confirmed this current status:

| Name | Production | Preview | Notes |
| --- | --- | --- | --- |
| `WEBSITE_PW` | present, secret | present, secret | Guest site password. |
| `WEDDING_AUTH_SECRET` | present, secret | missing | Preview can still fall back to the default unless explicitly set. |
| `RSVP_ADMIN_PASSWORD` | present, secret | present, secret | Admin login password. |
| `RSVP_ADMIN_SECRET` | present, secret | present, secret | Admin cookie signing secret. |
| `RSVP_NOTIFICATION_TO` | present, plain text | present, plain text | Notification recipient. |
| `CLOUDFLARE_ACCOUNT_ID` | present, secret | present, secret | Stored as secret even though it is not inherently sensitive. |
| `CLOUDFLARE_EMAIL_API_TOKEN` | present, secret | present, secret | Email Sending API token. Do not create another unless rotating. |
| `RSVP_NOTIFICATION_FROM` | missing | missing | Still required before real email delivery can work. |
| `RSVP_DB` binding | present | present | D1 database binding. |

Local `env/cloudflare.env` status on 31 May 2026: `RSVP_NOTIFICATION_FROM` and `CLOUDFLARE_EMAIL_API_TOKEN` are blank. If the Email Sending token is already stored in Cloudflare Pages, keep the local file blank. If Cloudflare readback shows it is not stored, create or rotate the token and set it directly as a Pages secret; do not commit or log the token value.

## 2. Hosting And Domain

Recommended path:

1. Keep the site on Cloudflare Pages.
2. Use `gabyandmanfredi.net` as the production guest domain.
3. Add both the apex domain and, if desired, `www.gabyandmanfredi.net` as Cloudflare Pages custom domains.
4. Use `https://gabyandmanfredi.net` for live smoke and E2E checks. Keep the `pages.dev` URL only as a fallback/deployment reference.

If `gabyandmanfredi.net` was bought through Cloudflare Registrar, DNS, SSL, Pages custom domain setup, and Email Sending domain setup can all stay in the same account. If it was bought elsewhere, first add or confirm the zone in Cloudflare and point the registrar nameservers to Cloudflare before completing the Pages and Email Sending setup.

After buying or connecting the domain:

1. Open **Workers & Pages**.
2. Select `wedding-website`.
3. Open **Custom domains**.
4. Select **Set up a domain**.
5. Enter `gabyandmanfredi.net`.
6. Follow Cloudflare's DNS/activation prompts.
7. Wait for the domain and certificate to become active.
8. Test both:
   - `https://gabyandmanfredi.net/`
   - `https://www.gabyandmanfredi.net/`, if the `www` version is configured.

The old `gabyandmanfredi.wedding` purchase/availability path is no longer the plan unless the domain decision changes again.

## 3. Variables And Secrets

Set these in Cloudflare dashboard under:

**Workers & Pages** -> `wedding-website` -> **Settings** -> **Variables and Secrets**

Use the **Production** environment first. Preview is already mostly configured, but `WEDDING_AUTH_SECRET` is intentionally still missing there.

| Name | Type | Meaning | Current action |
| --- | --- | --- | --- |
| `WEBSITE_PW` | encrypted secret | Shared guest password from the invitations. This is the password guests enter on the website gate. | Done in production and preview. |
| `WEDDING_AUTH_SECRET` | encrypted secret | Random signing secret for the guest password cookie. Changing it logs guests out. | Done in production; optional but recommended for preview. |
| `RSVP_ADMIN_PASSWORD` | encrypted secret | Separate admin password for `/admin/rsvp/`. This is not the guest website password. | Done in production and preview. |
| `RSVP_ADMIN_SECRET` | encrypted secret | Random signing secret for the admin cookie. Changing it logs admins out. | Done in production and preview. |
| `RSVP_NOTIFICATION_TO` | variable or secret | Address that receives RSVP notifications. Current repo/default value is `manfrediandgabriela@gmail.com`. | Done in production and preview. |
| `RSVP_NOTIFICATION_FROM` | variable or secret | Verified Cloudflare Email Sending sender, ideally `rsvp@gabyandmanfredi.net` or `no-reply@gabyandmanfredi.net`. | Still missing; required for real email delivery. |
| `CLOUDFLARE_ACCOUNT_ID` | variable or secret | Cloudflare account ID used by the Email Sending API. Use `43b7bcd0ac30cffda3632878e83bd36d`. | Done in production and preview. |
| `CLOUDFLARE_EMAIL_API_TOKEN` | encrypted secret | Cloudflare API token with permission to send email through Cloudflare Email Service. | Previously reported as done in production and preview, but local `env/cloudflare.env` is blank and current MCP readback failed. Re-check before go-live; do not create another token unless the current one is missing or being rotated. |

Generate random cookie secrets locally with PowerShell:

```powershell
$bytes = [byte[]]::new(32)
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Run it once for `WEDDING_AUTH_SECRET` and once for `RSVP_ADMIN_SECRET`. Do not commit the generated values. Only use this now if rotating secrets or if you decide to set `WEDDING_AUTH_SECRET` for preview.

## 4. RSVP Data And Admin Setup

The day-to-day admin system is the site page:

```txt
/admin/rsvp/
```

The Cloudflare D1 dashboard is useful as an emergency database console, but it is not the admin interface. The website admin page is necessary because it gives a readable dashboard, totals, filters, CSV export, and deletion controls.

Required Cloudflare binding:

```txt
Binding name: RSVP_DB
Database: wedding_rsvp
Database ID: f4166d9c-3f0f-43ff-8c43-2806aa0adbc5
```

Confirm or add it in either place:

- Preferred for this repo: keep it in `wrangler.jsonc`.
- Dashboard fallback: **Workers & Pages** -> `wedding-website` -> **Settings** -> **Bindings** -> **Add** -> **D1 database binding**.

After changing bindings or secrets, redeploy the Pages project. Cloudflare notes that bindings/secrets need a new deployment before Functions can use them.

Current status:

- `RSVP_DB` is configured in both production and preview.
- The production deployment from commit `2b3b20252135fdc1380ec6a73afbca6a3da1f811` is live and passed the protected smoke test.
- The admin page is the intended viewing/editing surface for routine work. D1 remains the system of record and emergency database console.
- Same-email RSVP resubmission supersedes the previous response.
- Per-guest dietary requirements and allergies are stored in JSON columns and exported through the admin CSV.

Useful Wrangler checks:

```powershell
npx wrangler d1 migrations apply wedding_rsvp --remote
npx wrangler d1 execute wedding_rsvp --remote --command "SELECT name FROM sqlite_master WHERE type='table';"
npx wrangler d1 execute wedding_rsvp --remote --command "SELECT updated_at, attending, primary_guest_name, email FROM rsvp_responses ORDER BY updated_at DESC LIMIT 20;"
```

Backups and retention:

- D1 Time Travel is automatic and supports point-in-time recovery, but the retention window is limited.
- Before major RSVP changes, export data from `/admin/rsvp/` as CSV.
- For a database-level export, use Wrangler or the Cloudflare D1 dashboard and store the export somewhere private. Do not commit RSVP exports.

## 5. Email Sending Setup

RSVP submissions are stored in D1 even if email sending is not configured. Without the email variables, the admin page will show notification status as `not_configured`.

Last confirmed/reported status:

- On 30 May, `RSVP_NOTIFICATION_TO`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_EMAIL_API_TOKEN` were reported as set in production and preview.
- On 30 May, a Cloudflare Email Sending API token was reported as created and stored as `CLOUDFLARE_EMAIL_API_TOKEN`. Do not create another token unless readback shows it is missing or you are rotating/revoking the current one.
- `RSVP_NOTIFICATION_FROM` is still missing. Because the code requires a from address, real RSVP emails will remain `not_configured` until this is set to a Cloudflare-verified sender.

31 May note: the local `env/cloudflare.env` currently has `CLOUDFLARE_EMAIL_API_TOKEN` blank, and Cloudflare MCP readback failed with authentication error `10000`. Treat the token's deployed status as unverified until the Cloudflare readback succeeds. If the token is still present as a Pages secret, no local value is needed. If it is missing, create or rotate the token and set it directly in Cloudflare Pages.

To enable email:

1. Buy or connect the final domain in Cloudflare DNS.
2. Open Cloudflare **Email Sending**.
3. Onboard the domain.
4. Let Cloudflare add the required SPF, DKIM, DMARC, MX, and bounce-handling DNS records.
5. Create or verify a sender such as `rsvp@gabyandmanfredi.net`.
6. Set:
   - `RSVP_NOTIFICATION_FROM=rsvp@gabyandmanfredi.net`
7. Redeploy `master`.
8. Submit one test RSVP and confirm both the admin notification and guest confirmation arrive.

`RSVP_NOTIFICATION_FROM` cannot be an arbitrary Gmail address unless Cloudflare Email Sending accepts and verifies it as a sender. Prefer a sender at the wedding domain.

## 6. Go-Live Checklist

Already completed:

- Cloudflare Pages project exists and deploys from `master`.
- `https://gabyandmanfredi.net` serves the protected site and passed the live smoke check on 31 May 2026.
- D1 database `wedding_rsvp` exists.
- `RSVP_DB` binding is present in production and preview.
- Guest password, RSVP admin password, RSVP admin secret, notification recipient, and account ID were configured in production in the last confirmed readback.
- The Email Sending API token was previously reported as configured in production, but this needs re-checking because local `env/cloudflare.env` is blank and current MCP readback failed.
- Latest RSVP code is deployed to the Cloudflare Pages project; the last confirmed URL was `https://wedding-website-2ng.pages.dev/`.
- Local, previous Pages.dev, and current `gabyandmanfredi.net` live smoke checks passed.

Remaining before sending the RSVP page to guests:

1. Optionally add and activate `www.gabyandmanfredi.net`.
2. Confirm Cloudflare Pages variables/secrets by readback once MCP/API authentication is working again, especially `RSVP_NOTIFICATION_FROM` and `CLOUDFLARE_EMAIL_API_TOKEN`.
3. If launching email notifications, verify an Email Sending sender on the final domain.
4. Set `RSVP_NOTIFICATION_FROM` in production to that verified sender.
5. Redeploy `master` after setting or changing `RSVP_NOTIFICATION_FROM` or any other Pages secret/binding.
6. Submit one test RSVP at `https://gabyandmanfredi.net/en/rsvp/`.
7. Open `https://gabyandmanfredi.net/admin/rsvp/` and enter `RSVP_ADMIN_PASSWORD`.
8. Confirm the test RSVP appears in the admin dashboard with per-guest dietary/allergy details.
9. Export CSV and verify the test row is present.
10. Confirm the admin notification and guest confirmation email arrive.
11. Delete the test RSVP from the admin page.
12. Run the live smoke check after setting the local test password:

```powershell
npm run smoke:live
```

Optional cleanup:

- Set `WEDDING_AUTH_SECRET` in preview if preview deployments should use the same explicit guest-cookie signing behaviour as production.
- Revoke and recreate `CLOUDFLARE_EMAIL_API_TOKEN` only if readback shows the token is missing or there is a reason to rotate it. If it already exists in Cloudflare Pages, do not create a duplicate token just because the local env file is blank.

## 7. Source Notes

- Cloudflare Pages custom domains: `https://developers.cloudflare.com/pages/configuration/custom-domains/`
- Cloudflare Pages Git integration: `https://developers.cloudflare.com/pages/get-started/git-integration/`
- Cloudflare Pages Functions bindings and secrets: `https://developers.cloudflare.com/pages/functions/bindings/`
- Cloudflare Pages Wrangler configuration: `https://developers.cloudflare.com/pages/functions/wrangler-configuration/`
- Cloudflare D1 Wrangler commands: `https://developers.cloudflare.com/d1/wrangler-commands/`
- Cloudflare D1 Time Travel and backups: `https://developers.cloudflare.com/d1/reference/time-travel/`
- Cloudflare Email Sending REST API: `https://developers.cloudflare.com/email-service/api/send-emails/rest-api/`
- Cloudflare Registrar: `https://developers.cloudflare.com/registrar/get-started/register-domain/`
