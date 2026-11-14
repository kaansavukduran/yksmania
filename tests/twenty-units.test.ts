import { expect, it } from "vitest";
import previousQuestions from "./fixtures/0.9.2-questions.json";
import { lessons } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { examCatalogue } from "../src/domain/exams";

it("preserves all 300 published questions including their passages, choices, hints and answer explanations", () => {
  expect(previousQuestions).toHaveLength(300);
  const byId = new Map(
    lessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
  );
  for (const previous of previousQuestions)
    expect(byId.get(previous.id), previous.id).toEqual(previous);
  expect(byId.size).toBe(lessons.flatMap((l) => l.questions).length);
});

it("teaches all twenty next workbook headings through distinct lessons, full guides, native sheets and branch practice", () => {
  const next = studyTopics.slice(58, 78);
  expect(next).toHaveLength(20);
  const ids = new Set<string>();
  for (const topic of next) {
    const theory = topicLessons(topic.id).filter(
      (l) => !l.tags.includes("soru-seti"),
    );
    expect(theory, topic.title).toHaveLength(1);
    const lesson = theory[0];
    ids.add(lesson.id);
    expect(lesson.subjectId).toBe(topic.subjectId);
    expect(lesson.questions, topic.title).toHaveLength(10);
    for (const q of lesson.questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.explanation.tr.length, q.id).toBeGreaterThan(70);
    }
    const guide = lessonGuides.get(lesson.id)!;
    expect(guide, topic.title).toBeDefined();
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(guide.examples.every((e) => e.steps.length >= 3)).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    expect(guide.source.length).toBeGreaterThan(40);
    const sheet = builtInCheatSheets.get(topic.id)!;
    expect(sheet.lessonId).toBe(lesson.id);
    expect(sheet.sections.length).toBeGreaterThanOrEqual(8);
    const branch = examCatalogue().find(
      (e) => e.id === `branch-${lesson.subjectId}`,
    )!;
    expect(
      branch.items.some((q) => q.lessonId === lesson.id),
      lesson.id,
    ).toBe(true);
  }
  expect(ids.size).toBe(20);
  for (const topic of studyTopics.slice(0, 78))
    expect(topicLessons(topic.id).length, topic.title).toBeGreaterThan(0);
});

it("keeps the earlier reviewed electrical-current example when the new full lesson supplements its sheet", () => {
  const sheet = builtInCheatSheets.get("detail-123")!;
  expect(sheet.examples[0].answer).toContain("2 A, 4 A, 6 A ve 2 Ω");
  expect(sheet.examples.length).toBeGreaterThanOrEqual(3);
  expect(sheet.sections.length).toBeGreaterThan(8);
});
