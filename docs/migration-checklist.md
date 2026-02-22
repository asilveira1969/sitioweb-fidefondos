# Migration Checklist v1 (PC to PC) - Static Web + Git + Deploy

## Summary
This checklist standardizes migration of static web projects between PCs.

Defaults:
- project_type: `static-web`
- expected_branch: `main`
- expected_remote: `origin`
- environment: Windows + PowerShell

## Operational Interface
Inputs:
- `repo_path`
- `expected_branch` (default `main`)
- `expected_remote` (default `origin`)
- `project_type` (default `static-web`)

Outputs:
- Result per check: `PASS | WARN | FAIL`
- Final summary with blockers
- Exit code convention (if script is used):
  - `0`: essential checks OK
  - `1`: critical failures found

## Severity Table
- Critical: blocks local work or deploy continuity.
- Medium: does not block immediate work, but creates risk or quality issues.
- Low: improvement recommendation.

## Phase A - Pre-Migration (source PC)
- [ ] Confirm remote and main branch (`git remote -v`, `git status --short --branch`).
- [ ] Confirm clean working tree or document intentional pending changes.
- [ ] Export minimal inventory:
  - [ ] Git version
  - [ ] Critical file list
  - [ ] Local conventions (editor/extensions)
- [ ] Confirm credentials/access method:
  - [ ] GitHub auth method
  - [ ] Hosting/deploy access
  - [ ] Domain/DNS access

## Phase B - Destination PC Setup
- [ ] Verify base tools:
  - [ ] `git --version`
  - [ ] main editor installed
  - [ ] primary test browser installed
- [ ] Clone repo into standard workspace path.
- [ ] Confirm remote and tracking branch (`git remote -v`, `git status --short --branch`).

## Phase C - Technical Validation
- [ ] Expected structure exists:
  - [ ] `index.html`
  - [ ] `main.js`
  - [ ] `resources/`
  - [ ] `README.md`
  - [ ] `docs/` (recommended)
- [ ] Git integrity:
  - [ ] `git status --short --branch`
  - [ ] `git log --oneline -5`
- [ ] External dependencies references present (CDN in HTML/JS/docs).
- [ ] Text encoding quick check (detect obvious mojibake in docs).

## Phase D - Minimal Functional Validation
- [ ] Open `index.html` locally.
- [ ] Navigate core pages:
  - [ ] `index.html`
  - [ ] `strategies.html`
  - [ ] `portfolio.html`
  - [ ] `about.html`
- [ ] Validate:
  - [ ] styles load
  - [ ] images load
  - [ ] no blocking console errors
  - [ ] navigation links work

## Phase E - Publish and Continuity
- [ ] Confirm current deploy method (GitHub Pages/manual).
- [ ] Confirm push from destination PC to correct branch.
- [ ] Record evidence and migration date in report.

## Reporting Template
Use this template for each migrated repo:

```md
# Migration Report - <project-name> - <YYYY-MM-DD>

## Scope
- Type: static-web
- Repo path: <path>
- Expected branch: main
- Expected remote: origin

## Results
| Check | Status | Severity | Evidence | Action |
|---|---|---|---|---|
| Remote configured | PASS | Critical | `origin ...` | None |
| Tracking branch | PASS/WARN/FAIL | Critical | `## main...origin/main` | Fix upstream if needed |
| Core files present | PASS/WARN/FAIL | Critical | file list | Restore missing files |
| CDN references | PASS/WARN | Medium | grep result | Update references if missing |
| Encoding quality | PASS/WARN | Medium | mojibake scan | normalize UTF-8 |
| Manual functional test | PASS/WARN/FAIL | Critical | browser validation | fix blockers |
| Deploy continuity | PASS/WARN/FAIL | Critical | push/deploy check | fix auth/config |

## Final Status
- `Apto para trabajo local` or `Pendiente`

## Pending Items
- <if any>
```
