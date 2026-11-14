# YKSMania

Build an offline-first YKS learning application for Windows, Linux, Android and web.
Product language is Turkish only, per the user's explicit project decision.
Do not add English UI or translation work. Read earlier English preferences and
backups by normalizing their locale to Turkish while preserving all other data.
User-written text and imported source documents retain their original contents.
Preserve learning events, original review dates, availability, settings and drafts.
Default review policy: learning day is day 1; reviews on days 3, 7, 21 (+2,+6,+20).
Never infer mastery from file imports, elapsed time or manually checked tasks.
Keep private Drive documents, personal identifiers and unlicensed books out of Git.
Original exercises must be labeled as original, never as official examination items.
Use the approved AIONIA references and inspect actual animation frames.
Follow docs/AIONIA_STANDARD.md, docs/ART_BIBLE.md and docs/QA.md.
Run npm run check, npm test, npm run build and npm run test:e2e before delivery.
Keep Forge handoff current. Distinguish web, native package and physical-device checks.

Current product decisions: default editable exam date 2027-06-18, fixed theory
planning deadline 2027-02-28. The 479 detailed headings follow the verified workbook
first-study order; personal workbook progress is not application progress. Keep
manual theory/question records independent and do not award XP for checkmarks.
The user's latest Aion art direction is reference-faithful pixel art with richer
sprite reactions; it supersedes the historical cartoon-only request for this app.
Learners never import PDF, source catalogues or study materials. Teaching, summaries
and questions must be built in; preserve existing private files invisibly in storage.
Keep personal-progress backup/restore separate from educational content.

Questions must be answerable from their own card: include the referenced passage,
define named points and state needed model/data assumptions. Never depend on a
previous theory page or the current state of its interactive explorer. Preserve
YKS-015: all five paragraph items show the full shared passage above the stem;
theory and sentence exploration use that same text. Run the question-content
validation and direct Questions/offline/mobile regressions when adding content.

Today keeps completed daily work visible and shows the latest complete saved
question attempt with its actual correct/wrong counts. Never sum retries or infer
manual theory completion from question answers. Preserve the YKS-013 regression.

Latest navigation decision (user correction): Cheatsheets are a separate sidebar
section between Theory and Questions. Remove inline cheatsheets from theory.
Exams follows Questions and offers built-in TYT, numerical AYT and subject practices,
with accurate question counts and proportional official-format times. Never label
an incomplete bank as a full official-distribution mock. No source upload routes,
source-dependent study buttons or booklet upload controls. Unprepared headings
are explicitly unavailable; users are not tasked with supplying missing content.
Preserve existing settings/notes/PDF bytes/learning records across this UI migration.

Study hourglass state is local and shared across theory, PDF and question routes.
Use an absolute deadline while running; never persist every display tick or award
learning evidence for time. Reset progress only through explicit UI confirmation
and one durable state commit; preserve settings, notes, documents and PDF pages.
