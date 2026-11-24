import { publishedQuestion } from "./helpers/publishedQuestion";
import { beforeSource031Teaching } from "./helpers/before-source031-math";
import { expect, it } from "vitest";
import oldQuestions from "./fixtures/0.11.0-questions.json";
import { lessons } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { examCatalogue, selectExamVariant } from "../src/domain/exams";
import { questionContentIssues } from "../src/domain/questionContent";
import type { LessonGuide } from "../src/learning/guides/types";

it("preserves all 800 published question records while adding new unit and foundation practice questions", () => {
  const current = lessons.flatMap((l) => l.questions),
    byId = new Map(current.map((q) => [q.id, q]));
  expect(oldQuestions).toHaveLength(800);
  expect(current.length).toBeGreaterThanOrEqual(1130);
  expect(byId.size).toBe(current.length);
  for (const q of oldQuestions) expect(byId.get(q.id), q.id).toEqual(publishedQuestion(q));
  for (const q of current) expect(questionContentIssues(q), q.id).toEqual([]);
});

it("makes workbook headings 109 through 138 reachable as independent theory, visual, summary and practice content", () => {
  // A bounded 40-question preview cannot contain every lesson in a growing pool.
  // Verify the real seeded attempts, retaining the branch length and uniqueness checks.
  const branchLessons = new Map(
    examCatalogue()
      .filter((exam) => exam.kind === "branch")
      .map((exam) => {
        const variants = Array.from({ length: 8 }, (_, i) =>
          selectExamVariant(exam, `coverage-${i}`),
        );
        for (const variant of variants) {
          expect(variant.length).toBeLessThanOrEqual(40);
          expect(
            new Set(variant.map((question) => question.id)).size,
          ).toBe(variant.length);
        }
        return [
          exam.id,
          new Set(variants.flat().map((question) => question.lessonId)),
        ];
      }),
  );
  const next = studyTopics.slice(108, 138),
    ids = new Set<string>();
  expect(next).toHaveLength(30);
  for (const topic of next) {
    const theory = topicLessons(topic.id).filter(
      (l) => !l.tags.includes("soru-seti"),
    );
    expect(theory, topic.title).toHaveLength(1);
    const lesson = theory[0];
    ids.add(lesson.id);
    expect(lesson.subjectId).toBe(topic.subjectId);
    const expandedPractice = [
      "faiz-problemleri", "karisim-problemleri", "isci-problemleri", "havuz-problemleri", "hiz-problemleri",
    ].includes(lesson.id);
    const questionCount = lesson.id === "su-dalgalari" ? 11 : expandedPractice ? 16 : 10;
    expect(lesson.questions, topic.title).toHaveLength(questionCount);
    for (const q of lesson.questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.explanation.tr.trim(), q.id).not.toBe("");
      expect(q.explanation.tr.trim(), q.id).not.toBe(
        q.options[q.answer].tr.trim(),
      );
    }
    const currentGuide = lessonGuides.get(lesson.id)!;
    const guide = beforeSource031Teaching("guides", lesson.id, currentGuide) as LessonGuide;
    expect(guide, topic.title).toBeDefined();
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(guide.examples.every((e) => e.steps.length >= 3)).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    const sheet = builtInCheatSheets.get(topic.id)!;
    expect(sheet.lessonId).toBe(lesson.id);
    expect(sheet.sections.length).toBeGreaterThanOrEqual(8);
    expect(sheet.examples.length).toBeGreaterThanOrEqual(4);
    const earlierSheet = beforeSource031Teaching("sheets", topic.id, sheet) as typeof sheet;
    const sheetText = earlierSheet.sections.flatMap((s) => s.text).join("\n");
    for (const section of guide.sections)
      for (const paragraph of section.paragraphs)
        expect(sheetText, `${topic.title}: full source coverage`).toContain(
          paragraph,
        );
    expect(
      branchLessons.get(`branch-${lesson.subjectId}`)!.has(lesson.id),
      lesson.id,
    ).toBe(true);
  }
  expect(ids.size).toBe(30);
  for (const topic of studyTopics.slice(0, 138))
    expect(topicLessons(topic.id).length, topic.title).toBeGreaterThan(0);
});
