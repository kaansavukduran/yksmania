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

const id = "oran-oranti";
const topic = "detail-209";
const fingerprint = (data: unknown) =>
  createHash("sha256").update(JSON.stringify(data)).digest("hex");
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

it("extends the source summary and guide while retaining the identity of every earlier card", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.examples).toHaveLength(7);
  expect(guide.recall).toHaveLength(8);
  expect(guide.source).toContain("içerik 1.2");
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([5, 4]);
  expect(fingerprint(guide.sections.slice(0, 9))).toBe(
    "7678518e48bb739ffe25e6e78ef4bd5534769af003cc35715e8f026b876ac0af",
  );
  expect(fingerprint(guide.examples.slice(0, 5))).toBe(
    "c87dd5a07b822a03b95542815511c67d22959bc0f66e17467433bde7b1d98d9e",
  );
  expect(fingerprint(guide.recall.slice(0, 5))).toBe(
    "03a27d41125dd7f38f12ab5f513d7fef2c4b3230f648e8b4936a0fcc90dec8de",
  );
  expect(fingerprint(lesson.questions.slice(0, 10))).toBe(
    "289ae61a6b317a05560f2f35e246322bc20bf084dca0ba0d02b370edc706c3b6",
  );

  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
    expect(helpPanels(view(q)).length, q.id).toBeGreaterThan(2);
  }
});

it("preserves the original question flow and earlier saved guide activity", () => {
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
  expect(draftQuestionCount(oldDraft, 15)).toBe(10);
  expect(draftQuestionCount({ ...oldDraft, questionCount: 15 }, 15)).toBe(15);
  for (const priorSections of [0, 9]) {
    expect(resolveGuideStep(id, 8, priorSections, 15)).toBe(8);
    expect(resolveGuideStep(id, 9, priorSections, 15)).toBe(15);
    expect(resolveGuideStep(id, 10, priorSections, 15)).toBe(16);
  }
  expect(resolveGuideStep(id, 9, 15, 15)).toBe(9);
});

it("keeps all independent original variants and their five ordered explanations", () => {
  const questions = lessonById(id)!.questions;
  const variants = questions.slice(10);
  expect(questions).toHaveLength(15);
  expect(variants.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["oran-oranti-016-karisim-butunu", "12 L ve %30"],
    ["oran-oranti-016-esit-gecisler", "5"],
    ["oran-oranti-016-iki-kat-is", "16"],
    ["oran-oranti-016-fark-ve-oran-onar", "C=35, D=63"],
    [
      "oran-oranti-016-kisi-saat-ve-gun",
      "Üçüncü gün 1 saat 40 dakika çalışınca",
    ],
  ]);
  expect(new Set(variants.map(({ answer }) => answer)).size).toBe(5);
  for (const q of variants) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
    expect(resolvedGuidance(view(q)), q.id).toEqual(q.guidance);
  }
});

it("binds the verified official question and the separate original teaching case", () => {
  const refs = pastExamReferencesForTopic(topic);
  const reference = refs.find((ref) => ref.id === "2026-TYT-MAT-2")!;
  expect(reference).toMatchObject({
    question: 2,
    page: 25,
    answerPage: 45,
    answer: "B",
  });
  expect(refs.some((ref) => ref.id === "2026-TYT-MAT-4")).toBe(false);
  expect(
    officialBooklets.find((booklet) => booklet.id === reference.bookletId),
  ).toMatchObject({
    pages: 45,
    coverage: "seçili sorular doğrulandı",
    sha256: "5216b6fa034f6a50258670527f78f636b1d783b0b8530aee23bf7f7384594347",
  });
  expect(10 ** 8 * 200 ** 2).toBe(4 * 10 ** 12);
  expect(10 ** 8 / 200).toBe(500000);
  expect(examTeachingCases[reference.id].answer).toBe(
    "İlk bölüm 80 izleyiciye ulaştı.",
  );
});
