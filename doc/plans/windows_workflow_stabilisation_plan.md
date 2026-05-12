# Windows Workflow Stabilisation Plan

This plan keeps `wedding-website` on native Windows at `C:\Projects\wedding-website` while reducing the recurring Astro, Git, Playwright, and PowerShell friction seen during recent checkpoints.

Do not implement this plan until it has been reviewed and approved.

Implementation note, 2026-05-12: the safe scripting part of this plan was implemented by adding reusable protected-site smoke scripts and documenting the Windows workflow. After separate explicit approval, a repo-local ACL repair granted `HP-MC\CodexSandboxOffline` Modify access to the write-heavy project folders named below. Windows Defender exclusions were not applied.

## Goal

- Keep the canonical repo in `C:\Projects\wedding-website`.
- Reduce `EPERM` failures when Astro writes `.astro/*`, Git writes `.git/index.lock`, and Playwright writes reports/screenshots.
- Avoid fragile inline PowerShell for browser/live checks.
- Keep the workflow tidy, repeatable, and easy to audit.

## 1. Audit The Current Windows State

### Actions

- Record `git status --short`, current branch, latest commit, Node/npm versions, Playwright status, and whether `.astro`, `dist`, `test-results`, and `playwright-report` are writable.
- Confirm whether `env/dev.vars.example` is intentionally modified before changing anything else.

### Acceptance Criteria

- Current repo state is known.
- No unrelated dirty file is accidentally staged or overwritten.

## 2. Fix Windows File Permissions

### Actions

- Confirm the current Windows user owns and can write the repo.
- Repair ACLs for the repo if needed, especially:
  - `.git`
  - `.astro`
  - `dist`
  - `node_modules`
  - `test-results`
  - `playwright-report`
  - `tmp`
- Remove read-only attributes from generated folders if present.

### Acceptance Criteria

- `npm run check`, `npm run build`, `git add`, and `git commit` no longer require elevated execution for ordinary writes.

## 3. Reduce Antivirus/File-Lock Interference

### Actions

- Add Windows Security/Defender exclusions for the repo folder and generated output folders.
- If Controlled Folder Access is enabled, allow trusted developer tools such as Node, npm/npx, Git, and Chrome/Edge test browsers.

### Acceptance Criteria

- Astro can repeatedly regenerate `.astro/content.d.ts` and `.astro/types.d.ts`.
- Playwright can write screenshots, traces, and reports without `EPERM`.

## 4. Make Playwright Predictable

### Actions

- Install or repair Playwright browsers with `npx playwright install`.
- Decide whether project tests should continue using installed Windows Chrome/Edge channels or bundled Playwright browsers.
- Keep this decision reflected in `playwright.config.ts` and any live-check scripts.

### Acceptance Criteria

- Local targeted Playwright tests run without missing-browser errors.
- Live-check scripts use the same browser strategy as the test suite.

## 5. Replace Fragile Inline PowerShell With Scripts

### Actions

- Add small checked-in Node scripts only where they replace repeated long inline commands, for example:
  - protected local preview smoke check;
  - live password-gated deployment smoke check.
- Ensure scripts read `env/website_pw.env` without printing secrets.
- Keep script output concise and machine-checkable.

### Acceptance Criteria

- Live checks can be run as simple commands instead of large PowerShell here-strings.
- Password values never appear in logs, commits, or chat output.

## 6. Normalise Codex Command Approvals

### Actions

- Prefer persistent, narrow approvals for common safe commands:
  - `npm run check`
  - `npm run build`
  - `npx playwright test`
  - `git add`
  - `git commit`
  - `git push`
- Avoid broad approvals such as arbitrary `node`, `python`, or PowerShell execution.

### Acceptance Criteria

- Routine verification and commit steps do not repeatedly pause on the same permission boundary.
- Riskier or unusual commands still require explicit approval.

## 7. Verification Pass

### Actions

- Run:
  - `npm run check`
  - `npm run build`
  - targeted Playwright test
  - protected local preview smoke check
  - live password-gated smoke check after the next push
- Record results in `CONTINUITY.md`.

### Acceptance Criteria

- The Windows-native workflow completes one full edit/test/commit/push/live-check cycle without the previous permission or PowerShell failures.

## Rollback

- Revert any checked-in script/config changes if they make the workflow worse.
- Remove Defender exclusions only if they are shown to be unnecessary or too broad.
- Do not delete generated folders, alter ACLs recursively, or change security settings without explicit approval at implementation time.
