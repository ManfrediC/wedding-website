# Cloudflare Hosting, Domain, RSVP Data, And Admin Instructions

Prepared: 30 May 2026

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

## 2. Hosting And Domain

Recommended path:

1. Keep the site on Cloudflare Pages.
2. Use the free `pages.dev` URL until the custom domain is bought and verified.
3. Try to buy `gabyandmanfredi.wedding` through Cloudflare Registrar.
4. If that exact domain is unavailable or expensive at renewal, fall back to a cheaper `.com` or `.ch` option, for example `gabyandmanfredi.com`, `gabrielaandmanfredi.com`, or `gaby-manfredi.com`.

Why Cloudflare Registrar is the simplest option:

- It is Cloudflare-native.
- DNS, SSL, Pages custom domain setup, and Email Sending domain setup all stay in one account.
- Cloudflare Registrar sells supported domains at registry/ICANN cost with no registrar markup, but the actual yearly price depends on the top-level domain.

Before buying:

1. Open Cloudflare dashboard.
2. Go to **Domain Registration** or **Register domains**.
3. Search `gabyandmanfredi.wedding`.
4. Check both first-year price and renewal price.
5. Buy only if the renewal price is acceptable.

After buying the domain:

1. Open **Workers & Pages**.
2. Select `wedding-website`.
3. Open **Custom domains**.
4. Select **Set up a domain**.
5. Enter `gabyandmanfredi.wedding`.
6. Follow Cloudflare's DNS/activation prompts.
7. Wait for the domain and certificate to become active.
8. Test both:
   - `https://gabyandmanfredi.wedding/`
   - `https://www.gabyandmanfredi.wedding/`, if the `www` version is configured.

I attempted to check `gabyandmanfredi.wedding` via the Cloudflare Registrar MCP/API, but the current API token did not have permission for registrar availability checks. Do not assume the domain is available until the live Registrar dashboard confirms it.

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
| `RSVP_NOTIFICATION_FROM` | variable or secret | Verified Cloudflare Email Sending sender, ideally `rsvp@gabyandmanfredi.wedding` or `no-reply@gabyandmanfredi.wedding`. | Still missing; required for real email delivery. |
| `CLOUDFLARE_ACCOUNT_ID` | variable or secret | Cloudflare account ID used by the Email Sending API. Use `43b7bcd0ac30cffda3632878e83bd36d`. | Done in production and preview. |
| `CLOUDFLARE_EMAIL_API_TOKEN` | encrypted secret | Cloudflare API token with permission to send email through Cloudflare Email Service. | Done in production and preview. |

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

Current status:

- `RSVP_NOTIFICATION_TO`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_EMAIL_API_TOKEN` are set in production and preview.
- A Cloudflare Email Sending API token has already been created and stored as `CLOUDFLARE_EMAIL_API_TOKEN`. Do not create another token unless rotating/revoking the current one.
- `RSVP_NOTIFICATION_FROM` is still missing. Because the code requires a from address, real RSVP emails will remain `not_configured` until this is set to a Cloudflare-verified sender.

To enable email:

1. Buy or connect the final domain in Cloudflare DNS.
2. Open Cloudflare **Email Sending**.
3. Onboard the domain.
4. Let Cloudflare add the required SPF, DKIM, DMARC, MX, and bounce-handling DNS records.
5. Create or verify a sender such as `rsvp@gabyandmanfredi.wedding`.
6. Set:
   - `RSVP_NOTIFICATION_FROM=rsvp@gabyandmanfredi.wedding`
7. Redeploy `master`.
8. Submit one test RSVP and confirm both the admin notification and guest confirmation arrive.

`RSVP_NOTIFICATION_FROM` cannot be an arbitrary Gmail address unless Cloudflare Email Sending accepts and verifies it as a sender. Prefer a sender at the wedding domain.

## 6. Go-Live Checklist

Already completed:

- Cloudflare Pages project exists and deploys from `master`.
- D1 database `wedding_rsvp` exists.
- `RSVP_DB` binding is present in production and preview.
- Guest password, RSVP admin password, RSVP admin secret, notification recipient, account ID, and Email Sending API token are configured in production.
- Latest RSVP code is deployed to `https://wedding-website-2ng.pages.dev/`.
- Local and live smoke checks pass.

Remaining before sending the RSVP page to guests:

1. Decide whether to launch on the free URL or buy `gabyandmanfredi.wedding`.
2. If launching email notifications, buy/connect the final domain and verify an Email Sending sender.
3. Set `RSVP_NOTIFICATION_FROM` in production to that verified sender.
4. Redeploy `master` after setting `RSVP_NOTIFICATION_FROM`.
5. Open the live site and enter `WEBSITE_PW`.
6. Submit one test RSVP.
7. Open `/admin/rsvp/` and enter `RSVP_ADMIN_PASSWORD`.
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
- Revoke and recreate `CLOUDFLARE_EMAIL_API_TOKEN` only if there is a reason to rotate it. The current token value was stored directly in Cloudflare and was not displayed.

## 7. Source Notes

- Cloudflare Pages custom domains: `https://developers.cloudflare.com/pages/configuration/custom-domains/`
- Cloudflare Pages Git integration: `https://developers.cloudflare.com/pages/get-started/git-integration/`
- Cloudflare Pages Functions bindings and secrets: `https://developers.cloudflare.com/pages/functions/bindings/`
- Cloudflare Pages Wrangler configuration: `https://developers.cloudflare.com/pages/functions/wrangler-configuration/`
- Cloudflare D1 Wrangler commands: `https://developers.cloudflare.com/d1/wrangler-commands/`
- Cloudflare D1 Time Travel and backups: `https://developers.cloudflare.com/d1/reference/time-travel/`
- Cloudflare Email Sending REST API: `https://developers.cloudflare.com/email-service/api/send-emails/rest-api/`
- Cloudflare Registrar: `https://developers.cloudflare.com/registrar/get-started/register-domain/`
