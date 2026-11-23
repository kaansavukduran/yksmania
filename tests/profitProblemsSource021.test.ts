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

const id = "kar-zarar-problemleri";
const topic = "detail-214";
const officialId = "2024-TYT-MAT-8";
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

it("extends the native guide and sheet with preserved prior activities and question help", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.examples).toHaveLength(7);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 1.1");
  expect(sheet.sections).toHaveLength(15);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([3, 3, 3]);
  expect(sheet.sections[8].text[0]).toContain("asgari satış M(1+r)");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "67498cf244b1f63fc363b80ac37917808ea3f790815dd2a10e258581c61f39df",
  );
  expect(digest(guide.examples.slice(0, 5))).toBe(
    "0f4315e0f5ed36d9ebd0d856ec520575b534006520911fd7e9ee1a5914a04f4d",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "cc351244a3fbcf8a758edb789a84de6432c7cdf2847a0ae305b0ec484c377b72",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "7578ff882fc88393e850ee3060a39a2e4e33c1d0ee0a1530ebcff6d3281c10af",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("510c2f345a463bd471fb6e7b07cd935d726925b632dba30223a7d799f05c3a8f");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }
  expect(guide.examples[5].prompt).toContain("Kâr=… TL");
  expect(guide.examples.slice(5).map(({ answer }) => answer)).toEqual([
    "Kâr 360 TL. Payda 720 TL, kâr %50.",
    "Toplamda %5 kâr.",
  ]);
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1hagkt-/,
  );
});

it("retains the old practice size and the legacy worked and recall checkpoints", () => {
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
  expect(
    draftQuestionCount({ ...saved, lessonId: "yuzde-problemleri" }, 16),
  ).toBe(10);
  for (const savedCount of [0, 8]) {
    expect(resolveGuideStep(id, 7, savedCount, 15)).toBe(7);
    expect(resolveGuideStep(id, 8, savedCount, 15)).toBe(15);
    expect(resolveGuideStep(id, 9, savedCount, 15)).toBe(16);
  }
  expect(resolveGuideStep(id, 8, 15, 15)).toBe(8);
});

it("grades the original cards and keeps the answer explanations gated by native guidance", () => {
  const questions = lessonById(id)!.questions;
  expect(questions).toHaveLength(16);
  const additions = questions.slice(10);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["kar-zarar-problemleri-021-korunan-kar-indirim", "%20"],
    ["kar-zarar-problemleri-021-gider-adet-ayri", "12, 13 ve 16"],
    ["kar-zarar-problemleri-021-fireli-gelir", "%25"],
    ["kar-zarar-problemleri-021-grupta-eksik-fiyat", "42 TL"],
    ["kar-zarar-problemleri-021-esit-satis-farkli-oran", "Başabaş."],
    ["kar-zarar-problemleri-021-iki-satis-siniri", "x>72"],
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

it("shares the existing exact official reference across both topics", () => {
  const [ref] = pastExamReferencesForTopic(topic).filter(
    ({ id }) => id === officialId,
  );
  expect(ref).toMatchObject({
    question: 8,
    page: 26,
    answerPage: 43,
    answer: "A",
    topicIds: ["topic-tyt-mat-basit-esitsizlikler-kaynak-037"],
  });
  expect(pastExamReferences.filter(({ id }) => id === officialId)).toEqual([
    ref,
  ]);
  expect(
    pastExamReferencesForTopic(ref.topicIds[0]).find(
      ({ id }) => id === officialId,
    ),
  ).toBe(ref);
  expect(
    officialBooklets.filter(({ id }) => id === ref.bookletId),
  ).toHaveLength(1);
  expect(examTeachingCases[officialId].answer).toContain("10.000<b<20.000 TL");
  expect(ref.solution.at(-1)).toContain("|b−20.000|<10.000");
});
