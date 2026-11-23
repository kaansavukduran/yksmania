import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { draftSchema, type Question } from "../src/domain/model";
import {
  officialBooklets,
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

const id = "yas-problemleri";
const topic = "detail-212";
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

it("adds the revised guide, distinct sheet and source teaching after unchanged legacy material", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.examples).toHaveLength(6);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 1.1");
  expect(sheet.sections).toHaveLength(15);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([2, 3, 3]);
  expect(sheet.sections[8].text[0]).toContain("Y−D o yıl girilen yaştır");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "195ee492eaf8a5420968a8d828e68fe5d309eb2340033702fc1a01d3098dc7e5",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "a429514d68b8882f0fec1d4fd27e2d90645918db108ec4ba5a9b78fd2dc4c23d",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "5460981b7662965c08be41cd3a08a6536ad7f142874da3198bc546e6c550c966",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "b90aa20aa0f96d2820cda71f023418a8b85ddd63031615b65732696be9ee3829",
  );
  expect(guide.examples.slice(-2).map(({ answer }) => answer)).toEqual([
    "İlk kişinin gerçek bugünkü yaşı 38.",
    "Yaşların toplamı 22.",
  ]);
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1hagkt-/,
  );
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
    expect(helpPanels(view(q)).length, q.id).toBeGreaterThan(2);
  }
});

it("keeps earlier practice and guide checkpoints at the student's intended activity", () => {
  const oldDraft = draftSchema.parse({
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
  expect(draftQuestionCount(oldDraft, 16)).toBe(10);
  expect(draftQuestionCount({ ...oldDraft, questionCount: 16 }, 16)).toBe(16);
  for (const previous of [0, 8]) {
    expect(resolveGuideStep(id, 7, previous, 15)).toBe(7);
    expect(resolveGuideStep(id, 8, previous, 15)).toBe(15);
    expect(resolveGuideStep(id, 9, previous, 15)).toBe(16);
  }
  expect(resolveGuideStep(id, 8, 15, 15)).toBe(8);
});

it("checks each standalone original scored card and both strict order endpoints", () => {
  const questions = lessonById(id)!.questions;
  const additions = questions.slice(10);
  expect(questions).toHaveLength(16);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["yas-problemleri-019-tamamlanan-ve-girilen-yas", "14 ve 15"],
    [
      "yas-problemleri-019-yeni-uye-yetersiz-veri",
      "Katılan z yaşındaysa (88+z)/5’tir. Tek değer bulunamaz.",
    ],
    [
      "yas-problemleri-019-iki-tarih-tek-kisi-kosulu",
      "89 ve çocuk henüz doğmamıştı.",
    ],
    ["yas-problemleri-019-iki-kesin-yas-siniri", "3, 4, 5"],
    ["yas-problemleri-019-iki-dogum-yonu", "77"],
    ["yas-problemleri-019-hizmet-yili-parantez-onar", "x+18=4(x+3), x=2"],
  ]);
  expect(new Set(additions.map(({ answer }) => answer)).size).toBe(5);
  for (const q of additions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
    expect(resolvedGuidance(view(q)), q.id).toEqual(q.guidance);
  }
  expect(
    Array.from({ length: 15 }, (_, i) => i + 1).filter(
      (k) => k + 7 > 2 * k + 1 && 2 * k + 1 > 5,
    ),
  ).toEqual([3, 4, 5]);
});

it("binds real source pages and exact year-model results independently of MEBI teaching", () => {
  const refs = pastExamReferencesForTopic(topic).filter((ref) =>
    ["2023-TYT-MAT-26", "2026-TYT-MAT-21"].includes(ref.id),
  );
  expect(
    refs.map(({ id, page, answerPage, answer }) => [
      id,
      page,
      answerPage,
      answer,
    ]),
  ).toEqual([
    ["2023-TYT-MAT-26", 30, 42, "E"],
    ["2026-TYT-MAT-21", 30, 45, "E"],
  ]);
  for (const ref of refs)
    expect(officialBooklets.filter((b) => b.id === ref.bookletId)).toHaveLength(
      1,
    );
  expect(2022 - (1949 - 11) + 2022 - (1949 + 40)).toBe(117);
  const mother = 50;
  const child = 24;
  expect(mother - 12 + child - 12).toBe(mother);
  expect(mother - 26).toBe(child);
  expect(2025 - child).toBeGreaterThan(1999);
  expect(mother + child).toBe(74);
  expect(examTeachingCases["2023-TYT-MAT-26"].answer).toBe("Yaş toplamı 69.");
  expect(examTeachingCases["2026-TYT-MAT-21"].answer).toBe(
    "2027’de yaş toplamı 73.",
  );
});
