# Environment

Use this directory for environment setup examples only. Do not commit real secrets.

For Cloudflare Pages, configure these variables in the project dashboard:

- `WEBSITE_PW`: shared guest password from the invitations.
- `WEDDING_AUTH_SECRET`: random secret used to derive the auth cookie value.
- `RSVP_ADMIN_PASSWORD`: separate private password for `/admin/rsvp/`.
- `RSVP_ADMIN_SECRET`: random secret used to derive the admin auth cookie value.
- `RSVP_NOTIFICATION_TO`: email address that receives RSVP notifications.
- `RSVP_NOTIFICATION_FROM`: verified sender for Cloudflare Email Sending.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account id used by the Email Sending API.
- `CLOUDFLARE_EMAIL_API_TOKEN`: Cloudflare API token that can send email.

For local sharing, set `WEBSITE_PW=...` in `env/website_pw.env`. For local RSVP testing, the same untracked file may also include `RSVP_ADMIN_PASSWORD`, `RSVP_ADMIN_SECRET`, `RSVP_NOTIFICATION_MODE=mock`, and `RSVP_NOTIFICATION_FROM=rsvp@example.test`.

For local Cloudflare Pages testing with Wrangler, copy `env/dev.vars.example` to a local untracked `.dev.vars` file at the repo root.
