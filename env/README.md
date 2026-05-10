# Environment

Use this directory for environment setup examples only. Do not commit real secrets.

For Cloudflare Pages, configure these variables in the project dashboard:

- `WEDDING_SITE_PASSWORD`: shared guest password from the invitations.
- `WEDDING_AUTH_SECRET`: random secret used to derive the auth cookie value.

For local Cloudflare Pages testing with Wrangler, copy `env/dev.vars.example` to a local untracked `.dev.vars` file at the repo root.
