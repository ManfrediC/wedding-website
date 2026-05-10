# Gabriela & Manfredi Wedding Website

Private multilingual wedding website for Gabriela Dago and Manfredi Carta's wedding in Zurich and Küsnacht on Friday, 11 June 2027.

## Stack

- Astro
- TypeScript
- Static pages hosted on Cloudflare Pages
- Cloudflare Pages Functions middleware for site-wide password protection
- Tally + Google Sheets planned for RSVP collection

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

The local Astro dev server does not enforce the Cloudflare middleware password gate. The password screen and middleware are included for deployed Cloudflare Pages environments.

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
```

## Privacy

Do not commit real passwords, guest lists, RSVP exports, private contact details, or secrets. Use `env/dev.vars.example` as a template only.
