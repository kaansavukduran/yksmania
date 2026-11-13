# Quality evidence

Target 0.1.0 alpha. This file is updated at the verified Forge checkpoint.

## Automated acceptance

- Unit tests: ordinal review dates, year/leap boundaries, closed days, all-days
  unavailable, overdue capacity, duplicate saves and XP, undo and retained history.
- Storage tests: settings independence, unfinished draft, invalid backup and date,
  unknown topic/option references, original PDF bytes and untouched learning state.
- Browser tests: normal lesson → hint/error → save → reload → undo; full offline
  reload and completion; blocked dates; TR/EN, Lexend, 200% UI + 150% text on 390px;
  corrupted backup; keyboard scale control; serious/critical axe issues.

## Observed regressions during development

- YKS-001: duplicate unhashed atlas URL in Workbox precache threw before cache
  installation; first render worked while offline reload failed. Removed duplicate
  include list and narrowed immutable-cache matching to genuinely hashed assets.
  The offline reload regression must pass before release.
- YKS-002: select label lookup ambiguity and visible/accessibility-name mismatch.
  Added explicit matching labels and preserved visible brand/language text.
- YKS-003: extreme narrow-screen scale overflow. Fix layout wrapping rather than
  hiding overflow, reducing the user's scale or clipping actions.

## Platform matrix

Browser automation is Chromium on Linux. Mobile viewports emulate layout/input;
they are not physical Android devices. Electron Linux, Windows clean installation,
physical Android, Firefox, Edge, Safari and native update migration are individually
reported in the current Forge checkpoint. No WCAG certification is claimed.

## Content limits

Six original topics / thirty original questions. No official score, national rank,
year-specific complete syllabus or full-source import claim. Content volume and
mastery are different. XP is discovery feedback, not academic assessment.

## Verified checkpoint — 2026-11-13

| Check | Observed result |
| --- | --- |
| TypeScript, production build | PASS locally and GitHub CI |
| Domain/storage suite | 12 tests PASS |
| Browser acceptance | 9 tests PASS locally; also on published HTTPS origin |
| Published origin | https://yksmania.vercel.app — [acceptance run](https://github.com/kaansavukduran/yksmania/actions/runs/43466580212) |
| Packaged Windows application | PASS on Windows GitHub runner: offline 5/5 lesson, reload, process restart, zero observed renderer errors |
| Packaged Linux application | PASS locally and Ubuntu GitHub runner for the same flow |
| Backup portability | PASS: completed lesson exported, restored in an empty browser profile, retained through reload |
| PDF offline | PASS: first open after disconnect, text extraction, note and reload |
| Layout | Inspected desktop dark/light and settled 390px mobile; 200% UI + 150% text interaction in automated test |
| APK | PASS: API 24 minimum / target 36, com.fragaria.yksmania 0.1.0, APK v2 signature verifies; physical installation remains untested |

The published acceptance run checked application code at `59894d7`. Later changes
up to `9f83cc4` update build tooling, release automation and one test synchronization;
they do not change the application bundle. The final package run is recorded in
FORGE.md and in the release's `verified-run.json`.

The first run of the updated calendar test reloaded immediately after optimistic
rendering, before IndexedDB finished. The test now waits for the actual saved status;
five consecutive local runs passed. Critical session completion already waits for
durable storage before showing success. Ordinary settings/drafts show saving/error
state; wait for the saved indicator before closing or exporting.

Local browser checks against the public origin were blocked by the execution
machine's proxy CA trust. HTTPS certificate checks were not disabled. The separate
GitHub runner performed the full published-origin acceptance instead.

Still unverified: physical Android, Windows installer/portable launcher on a clean
machine, package-to-package updates, portable directory relocation, PDF and JSON
sharing on Android, device-specific WebView compatibility, screen readers,
non-Chromium browsers, and every Linux distribution. Packaged executable automation
is distinct from testing the installer or the portable extractor. Debug APK signing
is distinct from a durable production signing identity.

A supplementary light-theme axe check found no serious/critical violations and one
moderate `landmark-unique` issue. Give repeated complementary landmarks distinct
accessible names in the next accessibility pass; the alpha is not fully audited.
