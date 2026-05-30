# Cloudflare Hosting, Domain, RSVP Data, And Admin Instructions

Prepared: 30 May 2026

## 1. Current State

Cloudflare MCP/API check on 30 May 2026 found:

- Cloudflare account ID: `43b7bcd0ac30cffda3632878e83bd36d`
- Pages project: `wedding-website`
- Current free URL: `https://wedding-website-2ng.pages.dev/`
- Production branch: `master`
- Build command: `npm run build`
- Build output directory: `dist`
- Current custom domains: none
- Current production environment variables visible via API: `WEBSITE_PW` only
- D1 database: `wedding_rsvp`
- D1 database ID: `f4166d9c-3f0f-43ff-8c43-2806aa0adbc5`

The repo already declares the RSVP D1 binding in `wrangler.jsonc` as `RSVP_DB`, and the RSVP schema lives in `migrations/0001_create_rsvp_responses.sql`.

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

## 3. Production Variables And Secrets

Set these in Cloudflare dashboard under:

**Workers & Pages** -> `wedding-website` -> **Settings** -> **Variables and Secrets**

Use the **Production** environment first. Add Preview values only if you want preview deployments to have their own working RSVP backend.

| Name | Type | Meaning | Required for |
| --- | --- | --- | --- |
| `WEBSITE_PW` | encrypted secret | Shared guest password from the invitations. This is the password guests enter on the website gate. | Site access |
| `WEDDING_AUTH_SECRET` | encrypted secret | Random signing secret for the guest password cookie. Changing it logs guests out. | Site access |
| `RSVP_ADMIN_PASSWORD` | encrypted secret | Separate admin password for `/admin/rsvp/`. This is not the guest website password. | RSVP admin |
| `RSVP_ADMIN_SECRET` | encrypted secret | Random signing secret for the admin cookie. Changing it logs admins out. | RSVP admin |
| `RSVP_NOTIFICATION_TO` | variable or secret | Address that receives RSVP notifications. Current repo default is `manfrediandgabriela@gmail.com`. | Email notifications |
| `RSVP_NOTIFICATION_FROM` | variable or secret | Verified Cloudflare Email Sending sender, ideally `rsvp@gabyandmanfredi.wedding` or `no-reply@gabyandmanfredi.wedding`. | Email notifications |
| `CLOUDFLARE_ACCOUNT_ID` | variable | Cloudflare account ID used by the Email Sending API. Use `43b7bcd0ac30cffda3632878e83bd36d`. | Email notifications |
| `CLOUDFLARE_EMAIL_API_TOKEN` | encrypted secret | Cloudflare API token with permission to send email through Cloudflare Email Service. | Email notifications |

Generate random cookie secrets locally with PowerShell:

```powershell
$bytes = [byte[]]::new(32)
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Run it once for `WEDDING_AUTH_SECRET` and once for `RSVP_ADMIN_SECRET`. Do not commit the generated values.

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

To enable email:

1. Buy or connect the final domain in Cloudflare DNS.
2. Open Cloudflare **Email Sending**.
3. Onboard the domain.
4. Let Cloudflare add the required SPF, DKIM, DMARC, MX, and bounce-handling DNS records.
5. Create or verify a sender such as `rsvp@gabyandmanfredi.wedding`.
6. Create a Cloudflare API token with permission to send email for this account.
7. Set:
   - `RSVP_NOTIFICATION_FROM=rsvp@gabyandmanfredi.wedding`
   - `CLOUDFLARE_ACCOUNT_ID=43b7bcd0ac30cffda3632878e83bd36d`
   - `CLOUDFLARE_EMAIL_API_TOKEN=<token>`

`RSVP_NOTIFICATION_FROM` cannot be an arbitrary Gmail address unless Cloudflare Email Sending accepts and verifies it as a sender. Prefer a sender at the wedding domain.

## 6. Go-Live Checklist

Before sending the site to guests:

1. Decide whether to launch on the free URL or buy `gabyandmanfredi.wedding`.
2. Set all production secrets and variables in Cloudflare Pages.
3. Confirm the `RSVP_DB` binding points to `wedding_rsvp`.
4. Redeploy `master`.
5. Open the live site and enter `WEBSITE_PW`.
6. Submit one test RSVP.
7. Open `/admin/rsvp/` and enter `RSVP_ADMIN_PASSWORD`.
8. Confirm the test RSVP appears in the admin dashboard.
9. Export CSV and verify the test row is present.
10. Confirm the admin notification and guest confirmation email arrive, if Email Sending is configured.
11. Delete the test RSVP from the admin page.
12. Run the live smoke check after setting the local test password:

```powershell
npm run smoke:live
```

## 7. Source Notes

- Cloudflare Pages custom domains: `https://developers.cloudflare.com/pages/configuration/custom-domains/`
- Cloudflare Pages Git integration: `https://developers.cloudflare.com/pages/get-started/git-integration/`
- Cloudflare Pages Functions bindings and secrets: `https://developers.cloudflare.com/pages/functions/bindings/`
- Cloudflare Pages Wrangler configuration: `https://developers.cloudflare.com/pages/functions/wrangler-configuration/`
- Cloudflare D1 Wrangler commands: `https://developers.cloudflare.com/d1/wrangler-commands/`
- Cloudflare D1 Time Travel and backups: `https://developers.cloudflare.com/d1/reference/time-travel/`
- Cloudflare Email Sending REST API: `https://developers.cloudflare.com/email-service/api/send-emails/rest-api/`
- Cloudflare Registrar: `https://developers.cloudflare.com/registrar/get-started/register-domain/`
