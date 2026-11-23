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

const id = "yuzde-problemleri";
const topic = "detail-213";
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

it("adds a concise sheet and the revised guide after the preserved native material", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.recall).toHaveLength(7);
  expect(guide.examples).toHaveLength(8);
  expect(guide.source).toContain("içerik 1.1");
  expect(sheet.sections).toHaveLength(15);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([3, 3]);
  expect(sheet.sections[8].text[0]).toContain("Kalan = kapasite");
  expect(sheet.sections.at(-1)?.text.join(" ")).toContain("kuruşa o aşamada yuvarla");
  expect(guide.examples.slice(-2).map(({ answer }) => answer)).toEqual(["20.000 TL.", "375 TL."]);
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "21408f493d0ca1e79aff6f622e610da7065f96e6311fa1a11e5603e0b8552b0b",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "1e02cb5f253148738cd4904ff83a0776ca9eed3edc18f9c7a83ec4d24ac07544",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "063938cb71b6b3530df4e01653c4916e2cffae2c9edd748a73899be3e0bfa1b0",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "608c3b3d8e5953f43880e4a942c65ff807ca719a4c053ffb804024d4ead5ed26",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("be662421fde052bbddb5984757c9fe8c9f1f439544f5c3a489b1b34ec37466df");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }
  expect(guide.examples[4].prompt).toContain("50·p/100 + …");
  expect(guide.examples[5].answer).toContain("36 kişi");
  expect(guide.examples[4].steps[0].expression).toBe("50·p/100+10=50·60/100");
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1hagkt-/,
  );
});

it("retains the old open practice size and the prior worked/recall checkpoints", () => {
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
    expect(resolveGuideStep(id, 7, savedCount, 14)).toBe(7);
    expect(resolveGuideStep(id, 8, savedCount, 14)).toBe(14);
    expect(resolveGuideStep(id, 9, savedCount, 14)).toBe(15);
  }
  expect(resolveGuideStep(id, 8, 14, 14)).toBe(8);
});

it("checks independently scored additions and their complete progressive guidance", () => {
  const questions = lessonById(id)!.questions;
  expect(questions).toHaveLength(16);
  const additions = questions.slice(10);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["yuzde-problemleri-020-farkli-kapasite", "%70"],
    ["yuzde-problemleri-020-grup-buyuklugu", "40"],
    ["yuzde-problemleri-020-tutar-olcegi", "396"],
    ["yuzde-problemleri-020-kenar-kosulu", "%26 ve %68"],
    ["yuzde-problemleri-020-yuzde-ve-litre-onar", "120 L ve 114 L"],
    ["yuzde-problemleri-020-ortak-katilan", "%50"],
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

it("connects the verified shelf item to the existing booklet and a separate original exercise", () => {
  const key = "2026-TYT-MAT-19";
  const refs = pastExamReferencesForTopic(topic).filter(
    (ref) => ref.id === key,
  );
  expect(refs).toHaveLength(1);
  expect(refs[0]).toMatchObject({
    question: 19,
    page: 30,
    answerPage: 45,
    answer: "E",
  });
  const booklet = officialBooklets.filter(
    (value) => value.id === refs[0].bookletId,
  );
  expect(booklet).toHaveLength(1);
  expect(booklet[0]).toMatchObject({
    pages: 45,
    sha256: "5216b6fa034f6a50258670527f78f636b1d783b0b8530aee23bf7f7384594347",
  });
  expect(refs[0].solution.at(-1)).toContain("%70");
  expect(examTeachingCases[key].answer).toContain("%80");
});
