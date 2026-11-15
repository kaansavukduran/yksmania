import { expect, it } from "vitest";
import oldQuestions from "./fixtures/0.10.0-questions.json";
import { lessons } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { examCatalogue } from "../src/domain/exams";
import { questionContentIssues } from "../src/domain/questionContent";

it("preserves all 500 earlier question records and the next 300 authored questions", () => {
  const current = lessons.flatMap((l) => l.questions),
    byId = new Map(current.map((q) => [q.id, q]));
  expect(oldQuestions).toHaveLength(500);
  expect(current.length).toBeGreaterThanOrEqual(800);
  expect(byId.size).toBe(current.length);
  for (const q of oldQuestions) expect(byId.get(q.id), q.id).toEqual(q);
  for (const q of current) expect(questionContentIssues(q), q.id).toEqual([]);
});

it("makes workbook headings 79 through 108 reachable as independent theory, visual, summary and practice content", () => {
  const next = studyTopics.slice(78, 108),
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
    const sheet = builtInCheatSheets.get(topic.id)!;
    expect(sheet.lessonId).toBe(lesson.id);
    expect(sheet.sections.length).toBeGreaterThanOrEqual(8);
    expect(
      examCatalogue()
        .find((e) => e.id === `branch-${lesson.subjectId}`)!
        .items.some((q) => q.lessonId === lesson.id),
    ).toBe(true);
  }
  expect(ids.size).toBe(30);
  for (const topic of studyTopics.slice(0, 108))
    expect(topicLessons(topic.id).length, topic.title).toBeGreaterThan(0);
});

it("supplements the reviewed pressure and buoyancy sheets without losing their earlier worked checks", () => {
  const pressure = builtInCheatSheets.get("detail-125")!;
  expect(pressure.examples[0].answer).toContain("3 kPa ve 6 kPa");
  expect(pressure.examples.length).toBeGreaterThanOrEqual(3);
  const buoyancy = builtInCheatSheets.get("detail-126")!;
  expect(buoyancy.examples[0].answer).toContain("Fk=6 N ve Vb=0,60 L");
  expect(buoyancy.examples.length).toBeGreaterThanOrEqual(3);
});
