# Environment

Use this directory for environment setup examples only. Do not commit real secrets.

For Cloudflare Pages, configure these variables in the project dashboard:

- `WEBSITE_PW`: shared guest password from the invitations.
- `WEDDING_AUTH_SECRET`: random secret used to derive the auth cookie value.

For local sharing, set `WEBSITE_PW=...` in `env/website_pw.env`. This file is untracked and must not be committed.

For local Cloudflare Pages testing with Wrangler, copy `env/dev.vars.example` to a local untracked `.dev.vars` file at the repo root.
