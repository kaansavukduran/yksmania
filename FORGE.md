# Forge checkpoint: YKSMania 0.2.0 alpha

Authoritative project: `kaansavukduran/yksmania`, `main`, working checkout
`/workspace/yksmania`. Prior published 0.1.0 alpha remains preserved below.

## Current work

Konu Anlatımı and Sorular now have separate subject navigation and entry routes.
Workbook source coverage is 341 main rows (201 TYT / 140 numerical AYT) and 479
detailed cheat-sheet headings. These are source outlines, not completed lessons.
Nine lessons have real interactive vector explanations; the original bilingual
question bank contains 45 items. Cell, periodic-table and geometry lessons are new;
the six previous lessons now have visual models. All old lesson/question identities,
sessions, original review dates and drafts remain valid. Legacy /study is supported.

A new left-facing cartoon atlas replaces pixel rendering at runtime. The original
motion atlas remains in art/archive. Bibliographic sources, frame timings and
anchor evidence are in ART_BIBLE and CONTENT_COVERAGE. Live AIONIA v1.7 was read
again on 2026-11-13 through the authorized connector; updated Unslop UI, behavior
and sprite checks were applied. This is a learning app, not a game requiring a
Fragaria game splash or a new gamepad scheme.

Private catalogue and batch PDF/folder imports support source matching, 2 MB
streaming hashes, duplicate merging, cancellation and per-file failures. PDFs can
be opened from the relevant subject. IndexedDB schema v2 preserves existing stores;
AppState stays backward compatible with defaulted explorations/readingPages fields.
PDF page navigation and positions are saved. Exploration never creates learning XP.

## Private content and remaining work

8,584 PDF metadata records (~23.6 GB) were inventoried with pagination. 143 PDFs
(126 cheat sheets, 14 MEBİ-named sources, 3 OGM past-question books; 4,989 pages)
were prepared and integrity-checked in the private task workspace, outside Git.
The whole archive is not imported as individual interactive questions. The next
content stage needs source/page/item records, verified keys and mathematical/visual
checking; do not replace this with fabricated readiness or mastery.

Drive export is BLOCKED: automatic approval review rejected the specific private
catalogue upload because explicit permission for that payload/destination was not
present. No workaround export was attempted. The source catalogue and two ZIPs
remain local, concrete deliverables. Ask for that explicit permission before any
Drive upload; ordinary app development and authorized GitHub/Vercel work continue.

Local check/build: PASS. Unit/storage/content: 20 tests PASS. Browser acceptance:
19 tests PASS in Chromium on Linux. Electron offline visual lesson, reload and
process restart: PASS with zero renderer errors. The catalogue lifecycle cleanup
and readable mobile selector layout passed focused acceptance before pushing.
Remote package/public-origin runs are recorded at the delivery checkpoint. The real-source
local import and offline reading checks are in QA. Native production signing,
clean-install/portable relocation, physical devices, non-Chromium browsers and
real two-package native updates remain open gates. Never call emulation physical
verification. Preserve the accepted +2/+6/+20 ordinal review policy.

## 0.2.0 delivery verification

- Final application source: `123b1b8ced9deac7fb4fa0bebab1bd66d14a7c33`.
- [Published web acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43485490494):
  19/19 browser tests passed against https://yksmania.vercel.app, including offline
  reload, prior records, private-catalogue fixtures and the three new visual flows.
- Production deployment `dpl_HCkQhaFvGVmGZbKqjDibhukwNEYD` is READY for this source.
- [Final package build](https://github.com/kaansavukduran/yksmania/actions/runs/43485370541)
  passed all four jobs: 20 unit/storage/content tests, 19 browser tests, Windows
  and Linux packaged offline lesson/reload/process-restart checks with zero renderer
  errors, and Android APK signature/manifest verification. The superseded c66e42b
  build was cancelled. These automation checks do not replace the physical-device,
  installer/portable-extractor and two-package update gates listed above.
- [Release publication](https://github.com/kaansavukduran/yksmania/actions/runs/43486494460)
  passed and published [v0.2.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.0-alpha.1).
  The tag resolves to the verified application source above. All five binaries
  (Windows Setup/Portable, Linux AppImage/DEB, Android debug APK), SHA256SUMS,
  verified-run.json and Android verification evidence are uploaded. The earlier
  0.1.0 prerelease remains intact. Private catalogue/PDF packs are still local;
  the blocked Drive export was not retried or routed through another destination.

# Historical checkpoint: YKSMania 0.1.0 alpha

Authoritative source: `kaansavukduran/yksmania`, `main`. Repository was empty when
implementation began. The latest verified commit and remote build IDs are recorded
at the end of this file when available.

## Implemented

React/TypeScript/Vite PWA; shared learning and scheduler domain; IndexedDB persistence;
six original bilingual lessons, 30 exercises; full subject reference navigation;
availability and day 1/3/7/21 review planning; retained original due dates; sessions,
assistance evidence and undo; local PDF import/reader/notes; progress backup/restore;
independent accessibility settings; existing Aion atlas; honest discovery progress;
Electron desktop shell; Capacitor Android; Vercel configuration and package CI.

## Architecture decision

Electron replaces the provisional Tauri candidate for this initial desktop build:
fully bundled Chromium avoids an online WebView2 prerequisite for Windows portable
use. The cost is a larger package. No existing implementation was migrated.
SQLite was a candidate, not an established project constraint; the initial native
WebViews and Electron use the same persistent IndexedDB model as web. A later
storage-adapter migration must preserve existing records.

## Preserve

Keep original review targets separate from scheduled execution dates. Don't infer
learning from PDF import, time spent or checked task boxes. Don't copy private
Drive data or signing keys into the public repo. No cloud accounts/AI/telemetry.
Past Aurelia learning/plan owners have not been overwritten or synchronized.

## Next work

Complete the private content catalogue and curated packs, add a full exam/diagnostic
flow and evidence-sensitive adaptive practice. Native production signing, physical
device checks and two-version updates remain explicit release gates. See ROADMAP.

## Distribution checkpoint

- Application implementation: `59894d7c2082725fbe987727d3cba161cd5e05b6`.
- Packaged source: `9f83cc4411bc8e1ee3631b25beccec2b91de7075` (same application
  code; corrected Android verification tooling, durable-save test synchronization
  and manual release workflow).
- [Package CI run](https://github.com/kaansavukduran/yksmania/actions/runs/43467374511):
  type/build, 12 unit/storage tests, 9 browser tests; Windows/Linux packaged
  application smoke flows and Android signature/manifest verification.
- [Published web acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43466580212):
  9/9 browser tests passed against the live production HTTPS origin.
- Web: https://yksmania.vercel.app
- Prerelease: https://github.com/kaansavukduran/yksmania/releases/tag/v0.1.0-alpha.1
- The release workflow accepts only a fully successful main package run, uploads
  its existing binaries without rebuilding, and includes the source SHA and SHA256
  checksums. Release automation is manually dispatched, not triggered by a push.

Observed package automation is not clean-install, physical Android or two-version
update verification. Windows is unsigned; Android uses a debug test key. Keep
portable `YKSManiaData` with the executable, back up progress, and keep separate
PDF copies. Production native signing/update migration remains open work.

Supplementary verification: progress backup restored into a fresh browser profile
and survived reload; light-theme axe found no serious/critical violations and one
moderate repeated-landmark issue tracked in QA. No remote browser trust checks were
bypassed. Published browser acceptance ran in GitHub to avoid the local proxy CA
limitation. Private source files and historical Aurelia learning records were not
imported into the public repository or synchronized.

Publication completed: [release workflow](https://github.com/kaansavukduran/yksmania/actions/runs/43468351719)
passed and published `v0.1.0-alpha.1`. Five binaries and signature/source/checksum
evidence are uploaded. All four jobs in the final package CI run passed.
