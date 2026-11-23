import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { draftSchema, type Question } from "../src/domain/model";
import {
  officialBooklets,
  pastExamReferences,
  pastExamReferencesForTopic,
} from "../src/domain/pastExams";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { lessonTopic } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonGuides } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import { examTeachingCases } from "../src/learning/pastExamCases";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";

const id = "hiz-problemleri";
const topic = "detail-219";
const officialIds = ["2026-TYT-MAT-22", "2026-TYT-MAT-24"];
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const view = (q: Question) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map(({ tr }) => tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
  guidance: q.guidance,
});

it("adds a distinct quick sheet after the original guide and preserves question help", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.examples).toHaveLength(6);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 1.2");
  expect(sheet.sections).toHaveLength(15);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([4, 4]);
  expect(sheet.sections[8].text[0]).toContain("uç beklemesini çıkar");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "9e97f2409b82ff6ff05e3628a3332083921105b99e15631def0461c22f648026",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "60d7aad1da75c7f030615daf2ff98b12dadf970b21987b1a2c35658a03335c6d",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "1e6b0b407f693761c05f52ff11be23568540025543a242dc3cf64959de9d8fd8",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "7561ad1f7a8f2cc0a5a1470c2f7cc33b75f7a68d933a99c44a4067b94e2123c8",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("a5d115e2e35838bce69bc62394f3d5aeb6ce7bb53fa4481e499e8017621e5b49");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }

  expect(guide.examples.slice(4).map(({ answer }) => answer)).toEqual([
    "Toplam yol 39 m, yer değiştirme −9 m.",
    "İki koşulu aynı anda sağlayan sürat yoktur.",
  ]);
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1Gh-Ati/,
  );
});

it("retains the previous practice length and worked and recall positions", () => {
  const saved = draftSchema.parse({
    lessonId: id,
    phase: "practice",
    index: 9,
    responses: [],
    selected: 4,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Eski çalışma notu",
    startedAt: 1,
  });
  expect(draftQuestionCount(saved, 16)).toBe(10);
  expect(draftQuestionCount({ ...saved, questionCount: 10 }, 16)).toBe(10);
  expect(draftQuestionCount({ ...saved, questionCount: 16 }, 16)).toBe(16);
  for (const savedCount of [0, 8]) {
    expect(resolveGuideStep(id, 7, savedCount, 15)).toBe(7);
    expect(resolveGuideStep(id, 8, savedCount, 15)).toBe(15);
    expect(resolveGuideStep(id, 9, savedCount, 15)).toBe(16);
  }
  expect(resolveGuideStep(id, 8, 15, 15)).toBe(8);
});

it("grades the six standalone cards and builds complete staged guidance", () => {
  const questions = lessonById(id)!.questions;
  expect(questions).toHaveLength(16);
  const additions = questions.slice(10);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["hiz-problemleri-026-ara-durak-iki-farkli-bekleme", "44 dk"],
    ["hiz-problemleri-026-hareket-ve-yolculuk-ortalamasi", "30 ve 40"],
    ["hiz-problemleri-026-iki-trenin-tam-gecisi", "6 ve 36"],
    [
      "hiz-problemleri-026-akinti-esiginde-kiyiya-gore",
      "11 km/sa ve kıyıya göre yerinde kalır.",
    ],
    ["hiz-problemleri-026-yonlu-yay-ucuncu-karsilasma", "82"],
    ["hiz-problemleri-026-iki-gun-acik-surat-araligi", "16<v<18"],
  ]);
  expect(new Set(additions.map(({ answer }) => answer)).size).toBe(5);
  for (const q of additions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(resolvedGuidance(view(q)), q.id).toEqual(q.guidance);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
  }
});

it("reuses the exact 2026 TYT booklet with two unique question records and original teaching cases", () => {
  const refs = pastExamReferencesForTopic(topic);
  expect(refs.map(({ id }) => id)).toEqual(officialIds);
  expect(
    refs.map(({ bookletId, question, page, answerPage, answer }) => [
      bookletId,
      question,
      page,
      answerPage,
      answer,
    ]),
  ).toEqual([
    ["2026-tyt", 22, 31, 45, "A"],
    ["2026-tyt", 24, 31, 45, "C"],
  ]);
  for (const ref of refs) {
    expect(ref.answerSource).toBeUndefined();
    expect(
      pastExamReferences.filter(
        (other) =>
          other.bookletId === ref.bookletId &&
          other.test === ref.test &&
          other.question === ref.question,
      ),
    ).toEqual([ref]);
  }
  const matches = officialBooklets.filter(({ id }) => id === "2026-tyt");
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({
    id: "2026-tyt",
    exam: "TYT",
    year: 2026,
    pages: 45,
    url: "https://dokuman.osym.gov.tr/pdfdokuman/2026/yks/tsk/yks_tyt_2026_kitapcik_d350.pdf",
    sha256: "5216b6fa034f6a50258670527f78f636b1d783b0b8530aee23bf7f7384594347",
  });
  expect(refs[0].solution.at(-1)).toContain("16.50");
  expect(refs[1].solution.at(-1)).toContain("14 km/sa");
  expect(examTeachingCases[officialIds[0]].answer).toBe(
    "İkinci geçiş 07.56’da, istasyonlar arası tek yön hareket 42 dk.",
  );
  expect(examTeachingCases[officialIds[1]].answer).toBe("20 dosya/saat.");
  expect(
    pastExamReferences.find(({ id }) => id === "2013-YGS-MAT-37"),
  ).toMatchObject({
    question: 37,
    page: 39,
    answerPage: 56,
    answer: "C",
  });
});
