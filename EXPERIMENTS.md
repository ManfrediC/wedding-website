# EXPERIMENTS

## E1: Cloudflare D1 Resource

Status: completed

Hypothesis: A real D1 database should exist before committing the Pages binding configuration.

Mechanism: Used the Cloudflare MCP/API server to list existing D1 databases and create `wedding_rsvp` when absent.

Decision rule: Keep the resource if Cloudflare returns a successful database record and no existing database was overwritten.

Result: Created `wedding_rsvp` with database ID `f4166d9c-3f0f-43ff-8c43-2806aa0adbc5`.

Follow-up: Applied `migrations/0001_create_rsvp_responses.sql` remotely. Cloudflare MCP/API read-back confirmed `rsvp_responses`, `idx_rsvp_responses_attending`, and `idx_rsvp_responses_updated_at`.
