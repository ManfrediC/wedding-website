# WSL2 Repository Migration Plan

This plan moves the active `wedding-website` development environment from native Windows at `C:\Projects\wedding-website` to WSL2, while keeping `C:\Projects` visually tidy by placing a Windows shortcut there that points to the canonical WSL repo.

The goal is to reduce recurring Windows/Astro/Playwright/Git friction: `EPERM` writes to generated files, PowerShell quoting issues, file-locking around `.git`, CRLF churn, and missing or mismatched browser binaries.

## Decision

- Canonical repo after migration: WSL2 Linux filesystem, for example `~/Projects/wedding-website`.
- Windows visual entry point: a shortcut in `C:\Projects`, named clearly as `wedding-website [WSL]`.
- Native Windows copy after migration: archived, not used for active development.
- Do not keep two active working copies with the same project name.
- Do not place the canonical WSL repo under `/mnt/c/Projects`; that keeps the slowest and most fragile part of the current setup.
- User authorisation: local secrets may be migrated as named files, without printing their contents, and missing WSL dependencies may be installed as part of the migration.

## Current WSL Audit

Audit run on 2026-05-12 from the current Windows checkout.

### Findings

- `wsl --list --verbose` reports that Windows Subsystem for Linux has no installed distributions.
- Because no distro exists yet, in-WSL tools such as `git`, `node`, `npm`, `npx`, `curl`, `ripgrep`, `gh`, Chrome/Chromium, Python, and Playwright browser dependencies cannot yet be audited or installed inside Linux.
- `wsl --list --online` succeeded with network access and showed installable distributions including `Ubuntu`, `Ubuntu-26.04`, `Ubuntu-24.04`, `Ubuntu-22.04`, Debian, Fedora, openSUSE, and others.

### Recommendation

Use `Ubuntu-24.04` for the first migration unless there is a specific reason to use a newer distro. It is recent, stable, and likely to be well supported by Node, Playwright, and common Linux package instructions. `Ubuntu-26.04` is available, but using the newest distro increases the chance of minor dependency wrinkles.

### Missing Dependencies Identified So Far

At this stage, the only confirmed missing dependency is:

- A WSL Linux distribution, recommended: `Ubuntu-24.04`.

The next dependency audit must run after the distro is installed and initialised.

## Premortem

Premortem frame: it is 6 months from now and the WSL2 migration has failed. We are working backwards to identify why.

### Failure Modes

1. **Two repositories drifted**
   - Failure story: edits continued in both `C:\Projects\wedding-website` and `~/Projects/wedding-website`. A change was tested in one copy but pushed from the other, causing confusing deployments and lost time.
   - Underlying assumption: a shortcut would be enough to prevent accidental use of the old Windows copy.
   - Early warning signs: both repos have new commits; `git status` differs between Windows and WSL; Codex or an editor opens the old path by default.
   - Mitigation: after WSL verification, rename or move the Windows repo to `C:\Projects\_archived\wedding-website-windows-old`, and leave only the WSL shortcut in `C:\Projects`.

2. **Secrets were copied carelessly**
   - Failure story: untracked environment files were copied wholesale, reviewed too quickly, or accidentally staged later.
   - Underlying assumption: current `.gitignore` coverage would be remembered and respected.
   - Early warning signs: `git status --short --ignored` shows unexpected env files; secrets appear in shell history, logs, or chat output.
   - Mitigation: copy only named untracked files needed by the site, verify `.gitignore`, run `git status --short`, and never print secret values.

3. **Tooling was only partly migrated**
   - Failure story: Git worked in WSL, but Playwright, Node, or Cloudflare/GitHub credentials were missing, so the workflow kept falling back to native Windows.
   - Underlying assumption: cloning the repo was the main work.
   - Early warning signs: commands succeed on Windows but fail in WSL; live checks require Windows-only scripts; push prompts repeatedly for credentials.
   - Mitigation: complete one full WSL verification cycle before declaring the migration done: install dependencies, run checks/tests, push a harmless documentation commit or confirm push capability, and verify the live URL.

4. **Windows editor access caused file-watch or permission issues**
   - Failure story: files were edited through `\\wsl$` using a Windows-native editor, causing slow file watching or inconsistent line endings.
   - Underlying assumption: all Windows tools handle WSL paths equally well.
   - Early warning signs: Astro dev server misses changes; line endings churn; editor saves are delayed.
   - Mitigation: use VS Code Remote WSL or run Codex and terminal tools inside WSL. Use the Windows shortcut for discovery, not as the main editing path if the editor behaves poorly.

5. **Hard-coded Windows paths survived**
   - Failure story: scripts or docs still referenced `C:\Projects\wedding-website`, so commands failed inside WSL.
   - Underlying assumption: repo-relative commands already covered everything important.
   - Early warning signs: `rg "C:\\Projects|c:\\Projects|/mnt/c/Projects"` finds active script references; automation only runs from PowerShell.
   - Mitigation: keep operational scripts repo-relative where practical. Leave historical notes alone, but update active scripts/docs that define the workflow.

## Migration Phases

## 1. Pre-Migration Inventory

### Purpose

Establish the current state before moving anything, so there is a clean rollback point.

### Actions

1. Confirm current Windows repo state:

   ```powershell
   cd C:\Projects\wedding-website
   git status --short
   git branch --show-current
   git remote -v
   git log --oneline -5
   ```

2. Identify untracked and ignored local-only files:

   ```powershell
   git status --short --ignored
   ```

3. Record the files that must move manually:

   - `env/website_pw.env`, if present.
   - Any other untracked env/config files needed for local protected preview.
   - Local notes that are intentionally untracked.

4. Confirm the current pushed commit:

   ```powershell
   git rev-parse HEAD
   git status --short
   ```

### Acceptance Criteria

- The current branch and commit are known.
- Any dirty tracked files are either intentionally left behind, committed, or explicitly excluded from migration.
- Required untracked local files are listed by name, without exposing their contents.

## 2. Prepare WSL2

### Purpose

Ensure WSL2 has the baseline development tools before cloning the repo.

### Actions

1. Confirm WSL2 and the chosen distro state from Windows:

   ```powershell
   wsl --list --verbose
   ```

2. If no distro is installed, install Ubuntu 24.04:

   ```powershell
   wsl --install -d Ubuntu-24.04
   ```

   If the command supports it and a non-launch install is preferred:

   ```powershell
   wsl --install -d Ubuntu-24.04 --no-launch
   ```

   Then launch Ubuntu once and create the Linux user when prompted. Record the Linux username because it is needed for the final Windows shortcut path.

3. Confirm WSL version after installation:

   ```powershell
   wsl --list --verbose
   ```

   The distro should show version `2`. If it does not:

   ```powershell
   wsl --set-version Ubuntu-24.04 2
   ```

4. Inside WSL, update packages and install baseline tools if needed:

   ```bash
   sudo apt update
   sudo apt install -y git curl ca-certificates build-essential ripgrep
   ```

5. Run the first in-WSL dependency audit:

   ```bash
   git --version
   curl --version
   rg --version
   python3 --version
   node --version
   npm --version
   npx --version
   ```

6. Install or confirm Node.js in WSL. Prefer the existing team/user standard if one exists. If not, use `nvm` so Node versions are easy to change:

   ```bash
   node --version
   npm --version
   ```

7. Configure Git identity in WSL:

   ```bash
   git config --global user.name "Manfredi Carta"
   git config --global user.email "..."
   git config --global init.defaultBranch master
   ```

8. Configure Git authentication in WSL using the preferred method:

   - SSH key in WSL; or
   - Git credential manager support; or
   - GitHub CLI authentication if already used.

### Acceptance Criteria

- `wsl --list --verbose` shows an installed WSL2 Ubuntu distro.
- `git --version`, `node --version`, and `npm --version` work inside WSL.
- WSL can authenticate to GitHub without relying on the old Windows working copy.

## 3. Create The Canonical WSL Repo

### Purpose

Create a clean WSL-native checkout in the Linux filesystem.

### Actions

1. Create the WSL projects folder:

   ```bash
   mkdir -p ~/Projects
   cd ~/Projects
   ```

2. Clone the repository:

   ```bash
   git clone https://github.com/ManfrediC/wedding-website.git
   cd wedding-website
   ```

3. Confirm the clone:

   ```bash
   git status --short
   git log --oneline -5
   ```

4. Copy required untracked files from the Windows repo into the WSL repo. This is authorised, but must be done by exact filename only; do not bulk-copy hidden folders, ignored folders, or generated folders:

   ```bash
   mkdir -p env
   cp /mnt/c/Projects/wedding-website/env/website_pw.env env/website_pw.env
   ```

5. Verify migrated secrets remain untracked. Do not print file contents:

   ```bash
   git status --short
   git status --short --ignored
   ```

6. Confirm that the secret file is present without revealing its value:

   ```bash
   test -s env/website_pw.env && echo "website password env file present"
   ```

### Acceptance Criteria

- The WSL repo is clean except for intentionally copied ignored local files.
- The WSL repo path is under `~/Projects/wedding-website`, not `/mnt/c`.
- No generated folders such as `node_modules`, `.astro`, `dist`, `test-results`, or `playwright-report` were copied from Windows.
- Secret contents were never printed to the terminal, logs, commits, or chat.

## 4. Install Dependencies In WSL

### Purpose

Build an independent WSL toolchain rather than reusing Windows-generated dependencies.

### Actions

1. Install npm dependencies:

   ```bash
   npm ci
   ```

2. Install Playwright browsers and Linux dependencies:

   ```bash
   npx playwright install --with-deps
   ```

   This command is authorised as part of the migration if the dependencies are missing.

3. Confirm the main commands start from WSL:

   ```bash
   npm run check
   npm run build
   ```

### Acceptance Criteria

- `npm ci` completes inside WSL.
- `npm run check` completes without Windows `EPERM` errors.
- `npm run build` completes and generates `dist` inside the WSL repo.

## 5. Verify Local Development Workflow

### Purpose

Prove that day-to-day development works before retiring the Windows repo.

### Actions

1. Run the focused and full E2E checks as appropriate:

   ```bash
   npm run test:e2e
   ```

   If the full matrix is too slow, first run the Chrome project:

   ```bash
   npx playwright test --project=chrome-desktop --workers=1
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Start or test the protected preview flow using the existing repo scripts:

   ```bash
   node scripts/serve-protected-preview.mjs
   ```

4. Open the local URL from Windows or WSL and confirm:

   - `/welcome/` renders.
   - The password from `env/website_pw.env` works.
   - `/en/`, `/it/`, and `/de/` pages render after authentication.

### Acceptance Criteria

- Local dev server works from WSL.
- Protected preview works from WSL.
- Browser tests run without requiring Windows-specific browser channels.
- Screenshots and reports are written under the WSL repo without permission errors.

## 6. Verify Git And Deployment Workflow

### Purpose

Make sure WSL can safely replace the Windows repo for real project work.

### Actions

1. Create a tiny documentation-only test commit if a harmless change is available, or wait for the next real documentation change.

2. Run:

   ```bash
   git status --short
   git add <changed-file>
   git commit -m "Document WSL2 repository migration"
   git push
   ```

3. Confirm Cloudflare Pages sees the pushed commit and the deployment becomes active.

4. Run a live password-gated smoke test against:

   ```text
   https://wedding-website-2ng.pages.dev
   ```

### Acceptance Criteria

- Git add/commit/push works from WSL.
- Cloudflare deployment works from a WSL-authored commit.
- Live password-gated site remains accessible.

## 7. Create The Windows Shortcut

### Purpose

Keep `C:\Projects` visually tidy while making it clear that the canonical repo lives in WSL.

### Actions

1. Find the WSL distro name:

   ```powershell
   wsl --list --quiet
   ```

2. Confirm the Windows UNC path opens:

   ```text
   \\wsl$\<DistroName>\home\<WslUser>\Projects\wedding-website
   ```

3. Create a Windows shortcut in `C:\Projects` named:

   ```text
   wedding-website [WSL]
   ```

   Suggested PowerShell command, replacing `<DistroName>` and `<WslUser>`:

   ```powershell
   $shortcutPath = 'C:\Projects\wedding-website [WSL].lnk'
   $targetPath = '\\wsl$\<DistroName>\home\<WslUser>\Projects\wedding-website'
   $shell = New-Object -ComObject WScript.Shell
   $shortcut = $shell.CreateShortcut($shortcutPath)
   $shortcut.TargetPath = $targetPath
   $shortcut.Save()
   ```

4. Open the shortcut from Explorer and confirm it lands in the WSL repo.

### Acceptance Criteria

- `C:\Projects` contains a clearly named WSL shortcut.
- The shortcut opens the WSL repo path.
- There is no active Windows repo with a confusingly similar name in the main `C:\Projects` view.

## 8. Archive The Old Windows Repo

### Purpose

Prevent accidental edits in the old native Windows checkout.

### Actions

1. Confirm the WSL repo has passed all verification gates.

2. Create an archive folder:

   ```powershell
   New-Item -ItemType Directory -Force C:\Projects\_archived
   ```

3. Move the old repo:

   ```powershell
   Move-Item C:\Projects\wedding-website C:\Projects\_archived\wedding-website-windows-old
   ```

4. Leave a small marker file outside the Git repo if useful:

   ```text
   This checkout is archived. The canonical repo is in WSL at ~/Projects/wedding-website.
   ```

### Acceptance Criteria

- The old Windows repo is no longer at `C:\Projects\wedding-website`.
- `C:\Projects` shows the WSL shortcut as the obvious project entry.
- Future Codex/editor sessions are opened against the WSL repo path.

## 9. Update Local Workflow Notes

### Purpose

Make future sessions start in the right place.

### Actions

1. Update any local-only notes or project docs that tell Codex or the user where to work.

2. Search for active hard-coded Windows paths:

   ```bash
   rg -n "C:\\\\Projects|c:\\\\Projects|/mnt/c/Projects|wedding-website-windows-old" .
   ```

3. Only change paths in operational docs/scripts. Leave historical notes alone unless they actively mislead.

4. Add a short continuity entry after the migration is complete.

### Acceptance Criteria

- Future workflow instructions point to the WSL canonical repo.
- Active scripts use repo-relative paths or WSL-compatible paths.
- Historical references are not churned unnecessarily.

## Rollback Plan

Rollback is available until the Windows repo is archived or deleted.

1. Stop using the WSL repo.
2. Return to `C:\Projects\wedding-website`.
3. Confirm the Windows repo state:

   ```powershell
   git status --short
   git pull --ff-only
   npm run check
   npm run build
   ```

4. Remove or rename the WSL shortcut to prevent confusion.

If the old Windows repo has already been moved to `_archived`, move it back only after confirming no newer WSL commits need to be pulled first.

## Final Completion Checklist

- [ ] WSL repo exists at `~/Projects/wedding-website`.
- [ ] WSL repo is the only active working copy.
- [ ] Required untracked env files were copied deliberately and remain untracked.
- [ ] `npm ci` completed in WSL.
- [ ] `npx playwright install --with-deps` completed in WSL.
- [ ] `npm run check` passed in WSL.
- [ ] `npm run build` passed in WSL.
- [ ] E2E smoke or full Playwright suite passed in WSL.
- [ ] Git push works from WSL.
- [ ] Cloudflare Pages deployment works from a WSL-authored commit.
- [ ] Live password-gated site was checked after deployment.
- [ ] `C:\Projects\wedding-website [WSL].lnk` opens the WSL repo.
- [ ] Old Windows repo was moved to `C:\Projects\_archived\wedding-website-windows-old`.
- [ ] `CONTINUITY.md` records that WSL is now canonical.
