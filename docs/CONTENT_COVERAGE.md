# Content coverage, 0.10.0 alpha candidate

Current decision: all prepared educational content is built in. No learner PDF,
source catalogue or booklet import. Separate Theory/Cheatsheets/Questions/Exams.
86 theory lessons,58 detailed guides,88 native sheets,500 original questions;
first78/479 ordered headings ready. One additional question-only factorization
pack does not count as extra theory.120/80full-distribution mocks and entire
MEB/OGM/private archive conversion are not complete. Current practice is105TYT,
25numericalAYT and11branches, scaled165/120 or180/80minutes perquestion.
All300 previously published questions are preserved in full;200 original items added.
Eight verified official references have eight original native teaching variants;
no new official question body or twenty-year completeness claim is made.
Prior imported files remain in storage but source UI is removed. Personal progress
backup is optional and never needed to supply a lesson. Historical sections below
are superseded where they describe source imports or inline sheets. Current
source-page boundaries are in SOURCE_REVIEW.md; test/release evidence inFORGE.md.

These are different measurements. None measures a learner's mastery.

| Layer | Verified content |
| --- | --- |
| Main topic reference | 341 source rows: TYT 201, numerical AYT 140; stable topic IDs retained |
| Detailed cheat-sheet outline | 479 headings; finer granularity and overlap with the main outline |
| Interactive teaching | 86 lessons with authored interactions; 58 detailed guides; first 78 ordered headings have theory |
| Native revision sheets | 88 built-in sheets; previous current-electricity sheet supplemented rather than overwritten |
| Interactive question bank | 500 original Turkish exercises; all 300 previous full question records preserved; no official-item claim |
| Timed practice | 2 mixed sets and 11 branches; TYT 105 / numerical AYT 25 questions; proportionate times, incomplete official distribution |
| Private archive inventory | 8,584 PDF file records in 246 folders; about 23.6 GB, before content-hash deduplication |
| Locally prepared private packs | 143 PDFs / 4,989 pages: 126 cheat sheets, 14 MEBİ-named PDFs and 3 OGM past-question books |

The archive scan followed provider pagination for folders above 100 results. A
metadata entry is not proof that its pages, individual items, answers, rights,
syllabus alignment or topic boundaries have been checked. The 341/479 outlines
were extracted from the relevant workbooks, not invented from memory. Personal
learning dates, schedules, notes, source Drive IDs and private links are excluded
from the public topic data. Workbook progress is not imported as learner progress.

## What the app actually does

**Konu Anlatımı** and **Sorular** have independent subject navigation. Theory may
link to practice, but it does not embed the question session. Existing sessions,
question IDs, due dates and drafts remain valid. The old `/study` route remains a
compatibility entry point.

Cell exploration covers a typical animal/green plant model, structures and a
secretory-protein pathway. It distinguishes a bilayer from two separate membranes,
wall from membrane, and protein synthesis from Golgi processing. Exceptions to
simple cell-type generalisations are stated.

The periodic table contains all 118 identities. Basic atomic facts come from the
[PubChem Periodic Table API](https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON),
retrieved 2026-11-13; group/period layout and Turkish labels are authored. The shell
model is explicitly for the first 20 neutral atoms, not a literal orbit picture.
Ion charge changes the electron counter, not atomic identity or table position.
F-block rows retain periods 6/7; they are not extra periods 8/9.

Geometry translates actual polygon pieces without rescaling. It relates a
parallelogram and rectangle of area b×h, and congruent triangles of area b×h/2.
The perpendicular height is distinguished from a slanted side. Other existing
lessons now contain fraction, algebraic-area, force, molecule, ATP or argument
structure explorations. Clicks and animation playback earn no learning credit.
Exploration choices and reading positions are stored separately from responses.

## New AYT coverage in 0.3.0

Four MEBİ AYT topic-summary files were used for a close reading of 12 relevant
PDF pages. Four original SVG explorations cover secant/tangent and a corner,
signed electric field/force, dynamic equilibrium/catalyst, and semiconservative
DNA replication. Twenty original exercises bring the total to 13 lessons / 65
questions. Exact source-page mappings, scientific assumptions and answer checks
are in [SOURCE_REVIEW](SOURCE_REVIEW.md). These are curated sections, not a full
review or conversion of the 143 prepared PDFs or the 8,584-record archive.

## Cheatsheet navigation in 0.3.1

The 479 detailed headings now live in a separate Kopya Kağıtları section, between
Konu Anlatımı and Sorular. These headings and cheatsheet-kind PDF references no
longer appear in the other two sections. Explicit catalogue topic IDs take
precedence; without them, a complete title word sequence in a Unicode-normalized
filename can associate an imported PDF. All subject cheatsheet PDFs remain
accessible even when no topic association is available. No source PDFs are added
to the public bundle and a heading does not establish PDF availability.

## Private source use

The app accepts a validated `yksmania-source-catalogue` JSON file. A catalogue
contains references, not PDF bytes. Import PDFs separately with a multi-file or
folder picker. Exact unique filename matches associate sources with subjects;
ambiguous matches use the explicit fallback subject/type. Review the import report.
Hashes are streamed in 2 MB chunks, originals remain Blobs, duplicates are merged,
and each write is confirmed before counting a successful import. Cancellation
retains files already saved. Browser quota may limit large libraries.

Private source files are not deployed to public GitHub/Vercel. Locally prepared
packs are separate deliverables and were not uploaded to Drive: automatic approval
review rejected that export because the specific payload/destination lacked explicit
permission. This does not block the application or local imports. No alternative
external export was attempted.

## Still to do

The complete 8,584-PDF archive is not embedded or cached automatically. Most topic
headings do not yet have an authored interactive lesson. A PDF containing questions
is not an extracted interactive question bank. Item-level ingestion needs source
hash, page and question references; faithful mathematical/visual rendering;
answer-key verification; subject/topic matching; duplicate handling and a clear
verified/unverified state. Complete exam-year syllabus and every historical ÖSYM
session are not verified. No complete-archive or score-improvement claim is made.

## Ordered plans and OGM chemistry in 0.4.0

The current workbook's Üretim Sırası sheet contains exactly 479 unique TYT and
numerical AYT detailed headings matching the app IDs. The Todoist “28 Şubat 2027”
document has 536 study lines, 479 unique first-study headings, in the same order.
Only those existing topic IDs and their order enter the public application; personal
statuses, dates, private identifiers and review repetitions do not. Theory and
question plans use this same granularity, not 341 + 479 separate new topics.

Coverage gap: this detailed source has only one TYT geometry heading and four AYT
geometry headings. The separate 341-row main outline remains available. The 479-row
study plan is faithful to the supplied workbook; it is not independently verified as
complete official YKS coverage. An existing area lesson lacks an exact detailed-topic
match and deliberately does not receive a fabricated progress association.

Five OGM Dersler Cepte chemistry explanations add 25 original exercises: simya,
disciplines, symbolic language, laboratory safety and atom models. Eight narrative
pages across two fascicules were close-read. These are the first five entries in the
verified study sequence. Most of the 479 headings still need an authored lesson and
question set; their routes explicitly say so and allow recording external work.
Source management remains under Settings and supports existing offline imports.

## Source-ordered mathematics in 0.5.0

Workbook topics 6–10 now have original interactive lessons and five exercises each:
Temel Kavramlar, Tek Çift Pozitif Negatif Sayılar, Ardışık Sayılar, Asal Sayılar,
Faktöriyel Kavramı. Two OGM video-note files were read at nine selected PDF pages;
five Aurelia cheat sheets were read at fourteen selected pages. Primes are sourced
to the Aurelia pages; their cited original MEB book was not independently read.
See SOURCE_REVIEW.md for exact pages and model assumptions. This is not a full
archive review. The previous eighteen lessons and ninety exercises remain intact.
The main 341-row outline, detailed 479-row plan and geometry mapping gap are unchanged.
