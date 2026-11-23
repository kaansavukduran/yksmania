import { expect, it } from "vitest";
import {
  probabilityId,
  probabilityTopic,
} from "../src/data/supplementalProbabilityTopic036";
import { lessonById } from "../src/domain/content";
import { draftSchema } from "../src/domain/model";
import { pastExamReferences } from "../src/domain/pastExams";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { lessonTopic, studyTopics } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import {
  conditionalDice036,
  twoDraws036,
} from "../src/learning/conditionalDiceSource036Model";
import { courseHistogram037 } from "../src/learning/courseHistogramSource037Model";
import { lessonGuides } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";

it("distinguishes the full, jointly favorable and conditioned sample spaces", () => {
  expect(conditionalDice036("sum-at-least", 9, 6)).toMatchObject({
    fullCount: 36,
    conditionedCount: 10,
    favorableCount: 4,
    unconditionalEventCount: 6,
  });
  expect(conditionalDice036("one-face", 9, 6)).toMatchObject({
    fullCount: 36,
    conditionedCount: 11,
    favorableCount: 1,
    unconditionalEventCount: 1,
  });
  expect(conditionalDice036("sum-at-least", 12, 1)).toMatchObject({
    conditionedCount: 1,
    favorableCount: 0,
    unconditionalEventCount: 6,
  });
  expect(twoDraws036(5, 3, false)).toMatchObject({
    denominator: 56,
    secondDenominator: 7,
    differentNumerator: 30,
  });
  expect(twoDraws036(5, 3, true)).toMatchObject({
    denominator: 64,
    secondDenominator: 8,
    differentNumerator: 30,
  });
  expect(() => twoDraws036(1, 0, false)).toThrow(RangeError);
});

it("gives each raw measurement one left-closed class using the strict MEB width", () => {
  const raw = [2, 3, 3, 5, 6, 7, 8, 8, 10, 11];
  expect(courseHistogram037(raw, 3)).toEqual({
    start: 2,
    width: 4,
    n: 10,
    bins: [
      { low: 2, high: 6, count: 4 },
      { low: 6, high: 10, count: 4 },
      { low: 10, high: 14, count: 2 },
    ],
  });
  expect(
    courseHistogram037([4, 4, 4], 2).bins.map(({ count }) => count),
  ).toEqual([3, 0]);
  expect(
    courseHistogram037([-3, -2, 0, 4], 2).bins.map(({ count }) => count),
  ).toEqual([3, 1]);
  expect(() => courseHistogram037([], 2)).toThrow(RangeError);
});

it("registers checked source questions and preserves legacy Veri Analizi reading and drafts", () => {
  expect(studyTopics.at(-1)?.id).toBe(probabilityTopic.id);
  expect(lessonTopic["veri-analizi"]).toBe("detail-225");
  expect(
    lessonById(probabilityId)?.questions.map((q) => q.options[q.answer].tr),
  ).toEqual([
    "2/5",
    "15/16",
    "1/3",
    "1/2",
    "1/11",
    "4/7",
    "Bağımsız ve ayrık değil.",
    "Gözlenen oran 7/20’dir.",
  ]);
  const stats = lessonById("veri-analizi")!;
  expect(stats.questions.slice(10).map((q) => q.options[q.answer].tr)).toEqual([
    "2 ve 2,5",
    "4 ve 4,3,1",
    "C ve C",
    "En az 10 olan 5/12. En az 8 olan 5/12 ile 9/12 arasında olabilir.",
  ]);
  const old = draftSchema.parse({
    lessonId: "veri-analizi",
    phase: "practice",
    index: 9,
    responses: [],
    selected: 4,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Önceki not",
    startedAt: 1,
  });
  expect(draftQuestionCount(old, 14)).toBe(10);
  expect(draftQuestionCount({ ...old, questionCount: 14 }, 14)).toBe(14);
  expect(resolveGuideStep("veri-analizi", 12, 0, 15)).toBe(15);
  expect(resolveGuideStep("veri-analizi", 13, 12, 15)).toBe(16);
  expect(lessonGuides.get("veri-analizi")?.sections).toHaveLength(15);
  expect(
    builtInCheatSheets
      .get("detail-225")
      ?.sections.find(
        ({ title }) => title === "Ham ölçümleri eş genişlikli sınıflara ayır",
      )?.text[0],
  ).toContain("açıklık/sınıf sayısı");
  expect(
    pastExamReferences.find(({ id }) => id === "2025-TYT-MAT-30"),
  ).toMatchObject({
    page: 32,
    answerPage: 43,
    answer: "B",
    topicIds: [probabilityTopic.id],
  });
  expect(
    pastExamReferences.find(({ id }) => id === "2024-TYT-MAT-16"),
  ).toMatchObject({
    page: 29,
    answerPage: 43,
    answer: "A",
    topicIds: ["detail-225"],
  });
});
