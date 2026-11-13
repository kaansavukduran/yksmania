# Quality evidence

Target 0.2.2 alpha. This file is updated at the verified Forge checkpoint.

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

Nine interactive lessons / forty-five original questions in 0.2.0. No official score, national rank,
year-specific complete syllabus or full-source import claim. Content volume and
mastery are different. XP is discovery feedback, not academic assessment.

## Historical 0.1.0 checkpoint — 2026-11-13

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


## 0.2.0 regression and content evidence

- YKS-004: source-periodic buttons concatenated visible spans without spaces, while
  accessible names had spaces. Axe reported serious label-content-name-mismatch.
  Explicit text spacing now matches the visible/accessibility names; preserve the
  new visual-flow axe regression.
- YKS-005: at 390px, 200% UI, 150% text and English, intrinsic grid sizing and the
  long word “parallelograms” produced page overflow. Grid children now shrink,
  the single-column track is minmax(0,1fr), and long headings/control labels wrap.
  No content was clipped and the selected scale was not reduced.
- Cell route, actual diagram taps, plant/animal differences, saved selection,
  original question completion, ion identity, all 118 element buttons, physical
  polygon translation, conserved area, offline reload and reduced motion are
  covered through normal UI entry points.
- Old database v1 fixture: answer choice, draft note and original PDF retained after
  database v2 upgrade. New exploration/reading-position fields default safely.
- Local real-source check: complete private catalogue accepted; all 143 PDFs imported
  with zero per-file failures. A 92.8 MB MEBİ biology book opened offline, displayed
  page 56 text and reopened at page 56 after reload. Learning session count stayed 0.
  This private test uses disposable local browser storage, not CI uploads.
- All 143 prepared PDFs opened in a PDF parser; 4,989 total pages. This is file
  integrity/page-count evidence, not item-by-item or answer-key verification.
- Nine diagrams opened at 390×844 with zero renderer exceptions or page overflow
  at default scale. Desktop screenshots and representative mobile views inspected.
  High-scale and contrast coverage is separately recorded in the acceptance suite.
- Cartoon Aion: all eight authored frames share measured foot baseline y458. Runtime
  actor-box and reduced-motion regression are separate from this source measurement.

Package, published-origin and complete final test counts are recorded in FORGE.md.
The final 0.2.0 package CI passed on all four jobs; the published production origin
also passed all 19 browser acceptance tests. Both Windows and Linux packaged
executables passed offline lesson/reload/process-restart checks with zero renderer
errors. The Android APK's signature and manifest passed verification.
Physical Android, clean Windows installation/portable extraction and two-package
update preservation remain unverified. No full WCAG certification is claimed.

## 0.2.1 — YKS-006: notes must not narrow teaching content

Source: user report and screenshot, 2026-11-13. At 1440px the theory notes occupied
the right-hand column and reduced the space available for the diagram and text.
The question notes were already below the question panel; that behavior is retained.

Root cause confirmed: the shared `.study-layout` defined two columns above 1200px.
It now has one full-width track at every breakpoint, with the existing notes after
the article in both DOM and visual order. Redundant breakpoint overrides were removed.
No saved-data fields or note handlers changed.

Regression: `YKS-006 notes stay below full-width theory and questions and retain edits`
in `tests/e2e/app.spec.ts`. The same test failed on the old 0.2.0 layout at 1440px
(notes y277.19 while the article ended at y1592.38), then passed after the repair.
It checks theory widths 1440/1280/1024/390/320 and question widths 1440/390/320,
actual note editing, reload, and continuing to question 2 with the note retained.

Local PASS: check, 20 unit/storage/content tests, production build and 20 browser
tests. Chromium 156.0.8078.79 on Linux; Turkish default scale plus the existing
English 200% interface / 150% text regression. Dark/light screenshots inspected at
1440×1000 and 390×1000, zero renderer errors. At 1440px the article uses the entire
1108.81px content row; at 390px it uses the entire 361.22px row. Notes follow the
article and neither view has horizontal page overflow. Native and published-origin
results for this version are recorded in FORGE.md when observed; prior release
evidence above is historical and is not evidence for a new binary.

Additional local PASS: Electron on Linux, explicitly sized to a 1440×1000 content
window, gives the article the entire content row with notes after it. Offline note
editing survives reload and process restart in a disposable task profile. This is
local desktop-shell evidence, separate from remote packaged binaries and physical
device/installer verification.

Remote 0.2.1 PASS: package CI run 43487684984, all four jobs; 20 unit/storage/content
and 20 browser tests, Windows/Linux packaged offline lesson/reload/process restart,
and Android signature/manifest verification. Published-origin run 43487744351 also
passed 20/20 browser tests, including the new layout/note regression. Release source
and publication evidence are recorded in FORGE.md.

## 0.2.2 — YKS-007: Turkish-only product language

Source: explicit user decision, 2026-11-13. Turkish is now the sole product language.
Language switches and selectors, English UI messages, lesson/question translations,
visual-board translations and English element names were removed. The loading and
failure screens, navigation labels, PDF controls and number/date formatting remain
Turkish even on an English-language device. User-authored notes, source PDF contents
and filenames are preserved.

Compatibility: the stored state/backup shape and lesson/question IDs are unchanged.
Valid old `en` preferences normalize to `tr`; the load path persists that normalization.
Unknown locale values still fail validation. The v1 database fixture now starts with
an English preference and verifies persisted Turkish locale, retained answer/draft
note and original PDF after the database upgrade. Backup normalization is separately
covered by storage tests. Original review dates and other settings are untouched.

The one-time content projection check compared all Turkish lesson/cell labels,
question IDs, option order, correct-answer indexes, hints, explanations and source
labels against the prior commit. All were unchanged; no educational rewrite was
mixed into translation removal. Previous English UI acceptance was replaced with
the same Turkish settings/learning actions, preserving narrow-screen 200% UI / 150%
text, Lexend, keyboard access, reduced motion and persistence checks.

At 390px with 200% UI / 150% text and Lexend, the Turkish update-check button caused
428px page overflow. Settings buttons now wrap within their panel without changing
font/scale or clipping. The settings regression checks page geometry and actually
activates the update check, then continues into a lesson and question session.

`YKS-007 English device language still opens Turkish-only UI and retains the user's text`
uses a fresh en-US browser context and exercises settings, practice, user-authored
English text, selected answer and reload. That compatibility test does not reintroduce
English as a supported UI language. Final local, deployed and package results are
recorded at the 0.2.2 Forge checkpoint; earlier version evidence above is historical.

Local and GitHub package CI 43491193602: PASS, 21 unit/storage/content and 21 browser
tests; Windows/Linux packaged offline/reload/process-restart tests and Android
debug APK signature/manifest verification passed. Production web publication is
BLOCKED by Vercel's daily deployment limit (GitHub Vercel status requests a retry
in 24 hours). The public origin remains 0.2.1. A new production-origin suite was
not run against the older site and is not claimed as a 0.2.2 pass. Retry deployment
and production acceptance after the limit clears; do not change plans or hosting
destinations to work around the quota without user direction.
