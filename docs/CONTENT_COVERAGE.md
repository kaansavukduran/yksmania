# Content coverage, 0.2.2 alpha

These are different measurements. None measures a learner's mastery.

| Layer | Verified content |
| --- | --- |
| Main topic reference | 341 source rows: TYT 201, numerical AYT 140; stable topic IDs retained |
| Detailed cheat-sheet outline | 479 headings; finer granularity and overlap with the main outline |
| Interactive teaching | 9 lessons with authored SVG/vector interactions |
| Interactive question bank | 45 original Turkish exercises; no official-item claim |
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
