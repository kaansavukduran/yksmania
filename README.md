# YKSMania

An offline-first YKS learning application by Fragaria Interactive. **0.3.1 alpha: visual learning and private resource import; not the complete curriculum.**

[Open the web app](https://yksmania.vercel.app) · [Download alpha packages](https://github.com/kaansavukduran/yksmania/releases/tag/v0.3.1-alpha.1)

The web origin serves 0.3.1 with separate cheatsheet navigation. Native packages
include the same new section. See FORGE.md for delivery and verification evidence.

## What works

- TYT's 10 subjects and numerical AYT's 5 subjects: all 341 main topic rows and
  479 detailed cheat-sheet headings from the source workbooks (different granularity,
  not 820 distinct official exam topics).
- Thirteen Turkish lessons, thirteen interactive vector explanations, 65 original exercises, hints, confidence and explanations.
- Clickable animal/plant cells, a 118-element periodic table, area-preserving geometry,
  fractions, algebraic areas, force balance, moles, ATP and paragraph structure.
- Four new AYT explorations: secant/tangent and a non-differentiable corner, signed
  electric field/force, dynamic equilibrium/catalyst, and semiconservative DNA copying.
  Source sections and model limits are recorded in [SOURCE_REVIEW](docs/SOURCE_REVIEW.md).
- A separate **Kopya Kağıtları** section between theory and questions, with TYT/AYT,
  subject/topic navigation and offline access to imported cheatsheet PDFs.
- Full-width topic explanations with notes below the content; question notes remain
  below the question panel. Saved notes and unfinished sessions are retained.
- Separate independent, assisted and incorrect responses; real session history and undo.
- Day 1/3/7/21 reviews: learning is day 1, original targets are +2/+6/+20 days.
- Recurring unavailable weekdays, blocked dates, daily capacity and visible rescheduling.
- Device-local IndexedDB for settings, drafts, history, notes and imported PDFs.
- Offline PDF reader with direct page navigation, retained reading positions and bundled worker/font/image resources.
- Private source catalogue import, multi-PDF/folder import, streaming hashes, duplicate
  merging, cancellation and per-file failure reporting. PDF limit: 256 MB each.
- Turkish only, dark/light/system/high contrast, independent interface/text scaling,
  bundled Lexend, reduced motion and optional gamification/sound.
- New left-facing cartoon Aion sprite atlas, real event-driven response, persistent discovery milestones.
- Validated progress backup/restore. PDFs are separate and must be backed up separately.
- PWA, Electron Windows/Linux packaging, Capacitor Android project and GitHub build workflow.

## Start locally

Install Node.js 24 and Git, then:

```sh
git clone https://github.com/kaansavukduran/yksmania.git
cd yksmania
npm ci
npm run build
npm run preview
```

Open the local URL printed in the terminal. Choose **Konu Anlatımı → TYT → Biyoloji → Hücre organelleri** for an interactive explanation.
Choose **Sorular** for separate practice, or **Çalışmaya başla → Sorulara geç**.
For web offline use, first allow the service worker to finish downloading the app.
An offline lesson and reload are covered by the browser suite.

## Windows

The package workflow creates both an installer and a portable x64 executable with
Electron/Chromium included. No online WebView2 installation is required.
Portable data lives in `YKSManiaData` next to the executable: keep both together.
Installed data uses the operating system's application-data directory.
Alpha executables are not Authenticode signed. Package generation does not establish
clean-install or physical Windows verification; see [QA](docs/QA.md).

## Android

The workflow builds a **debug-signed alpha APK** with manifest minimum API 24.
It requires a current Android System WebView. The manifest minimum is an installation
threshold, not proof of compatibility with every Android 7 device; physical-device
compatibility is still unverified.
This is for testing. Debug signing is not a production signing identity; builds from
different runners may not update over one another. Export progress before replacing
an alpha installation. Stable production signing and update migration are open work.

For local builds with Java 21 and Android SDK 36 installed:

```sh
npm run android:sync
cd android
./gradlew assembleDebug
```

On Windows, use `gradlew.bat assembleDebug`. The APK appears under
`android/app/build/outputs/apk/debug/`.

## Linux

```sh
npm run build
npx electron-builder --linux AppImage deb --publish never
```

Outputs go to `release/`. AppImage execution requires a supported Linux runtime;
build success alone does not verify every distribution.

## Content and privacy

The private Aurelia YKS catalogue and representative MEBİ/OGM/Aurelia learning
materials were inspected during planning. The public application contains original
instruction and exercises, not copies of the private archive or official exam items.
The topic map is a reference outline, not a verified official year-specific syllabus.
Use **Kütüphane → PDF ekle** to import materials you are allowed to use. Nothing is
uploaded. There is no account, analytics, cloud AI or automatic Drive synchronization.
Browser storage can be cleared or evicted: use **Ayarlar → Veri ve yedekler** regularly.

## Verification

```sh
npm run check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

If using a system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its path.
Read [content coverage](docs/CONTENT_COVERAGE.md), [FORGE.md](FORGE.md), [QA](docs/QA.md), [roadmap](docs/ROADMAP.md) and
[art bible](docs/ART_BIBLE.md) before continuing development.

## Distribution and updates

Vercel builds the root Vite project and serves `dist`. PWA updates prompt the user
and keep IndexedDB records. Native packages link to GitHub releases; there is no
silent native updater. All native update paths and data migrations require real
two-version verification before being called stable.

Application code and character art are currently all-rights-reserved. Lexend is
SIL OFL 1.1; PDF.js is Apache 2.0. Their licenses are bundled under `public/licenses`.
