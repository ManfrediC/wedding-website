# EXPERIMENT_NOTES

- 2026-05-29: Read the active goal, goal-loop guidance, vibecode safeguards, Cloudflare skill, current worktree status, RSVP plan, app structure, middleware, tests, and Cloudflare docs for Pages bindings, D1 prepared statements, Wrangler configuration, and Send Email bindings.
- 2026-05-29: Decided to use Cloudflare Email Sending rather than a third-party provider for RSVP notifications, with a local mock during E2E tests and production delivery requiring Cloudflare email setup.
- 2026-05-29: Created empty Cloudflare D1 database `wedding_rsvp` through the Cloudflare MCP/API server. Database ID: `f4166d9c-3f0f-43ff-8c43-2806aa0adbc5`.
- 2026-05-30: Applied the initial D1 migration remotely, implemented the guest/admin RSVP flow, verified the RSVP flow with local protected-preview E2E tests, and confirmed the D1 schema through Cloudflare MCP/API read-back.
