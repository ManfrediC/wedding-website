# Gabriela & Manfredi Wedding Website

Private multilingual wedding website for Gabriela Dago and Manfredi Carta's wedding in Zurich and Küsnacht on Friday, 11 June 2027.

## Stack

- Astro
- TypeScript
- Static pages hosted on Cloudflare Pages
- Cloudflare Pages Functions middleware for site-wide password protection
- Cloudflare D1 for RSVP storage
- Cloudflare Pages Functions for RSVP submission and admin APIs
- Cloudflare Email Sending for RSVP notification and guest confirmation emails

## Repo Structure

```txt
doc/        Product plans, visual references, and future design notes
env/        Environment variable examples and setup notes
functions/  Cloudflare Pages Functions
public/     Static assets served by Astro
src/        Astro pages, layouts, components, data, and styles
```

## Local Development

```bash
npm install
npm run dev
```

The Astro dev server is intended for development and does not enforce the Cloudflare middleware password gate.

To test or share the password-protected version locally, put the shared password in `env/website_pw.env` as `WEBSITE_PW=...`, then run:

```bash
npm run build
npm run preview:protected
```

For local RSVP testing, also add local-only admin and notification values to `env/website_pw.env`:

```bash
RSVP_ADMIN_PASSWORD=...
RSVP_ADMIN_SECRET=...
RSVP_NOTIFICATION_MODE=mock
RSVP_NOTIFICATION_FROM=rsvp@example.test
```

The protected preview uses a local JSON RSVP store under `tmp/`; production uses the Cloudflare D1 binding.

## Cloudflare RSVP Setup

The RSVP system uses the `wedding_rsvp` D1 database bound as `RSVP_DB`. The schema migrations live in `migrations/`, and the binding is declared in `wrangler.jsonc`.

Configure these Cloudflare Pages variables or secrets before enabling RSVP in production:

- `RSVP_ADMIN_PASSWORD`: private admin password for `/admin/rsvp/`.
- `RSVP_ADMIN_SECRET`: random secret used to sign the admin cookie.
- `RSVP_NOTIFICATION_TO`: notification recipient, currently `manfrediandgabriela@gmail.com`.
- `RSVP_NOTIFICATION_FROM`: verified Cloudflare Email Sending sender.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account id for Email Sending.
- `CLOUDFLARE_EMAIL_API_TOKEN`: token with permission to send email.

## Sharing A Local Preview

For someone on the same Wi-Fi/network:

```powershell
.\bin\dev\share-local.ps1
```

The script builds the site, starts a network-accessible preview, and prints the URL to share. See `SHARE_PREVIEW.md` for the short note to send with it.

## Verification

```bash
npm run check
npm run build
npm run test:e2e
npm run test:rsvp:e2e
npm run smoke:protected
```

`npm run test:e2e` builds the static site, serves it through Astro preview on a dedicated local test port, runs the Playwright matrix, and then stops the preview process.

`npm run test:rsvp:e2e` builds the site, starts the password-protected preview with a mock notification sender, submits RSVP data, checks supersession by email, verifies the admin view and CSV export, and deletes the test row.

After a pushed Cloudflare Pages deployment, run:

```bash
npm run smoke:live
```

Both smoke commands read `env/website_pw.env` without printing the password. `smoke:protected` starts the local protected preview automatically after `npm run build`; `smoke:live` checks the deployed custom domain at `https://gabyandmanfredi.net`.

## Privacy

Do not commit real passwords, guest lists, RSVP exports, private contact details, or secrets. Use `env/dev.vars.example` as a template only.
