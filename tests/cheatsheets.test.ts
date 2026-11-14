import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { lessonTopic, studyTopicById } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
it("gives every authored lesson a real native cheat sheet without inventing an exact workbook mapping", () => {
  for (const lesson of lessons.filter(
    (lesson) => !lesson.tags.includes("soru-seti"),
  )) {
    const topicId =
      studyTopicById(lessonTopic[lesson.id])?.id ?? `lesson:${lesson.id}`;
    const sheet = builtInCheatSheets.get(topicId);
    expect(sheet, lesson.id).toBeDefined();
    expect(sheet!.subjectId).toBe(lesson.subjectId);
    expect(sheet!.sections.length, lesson.id).toBeGreaterThan(0);
    expect(
      sheet!.sections.every((section) =>
        section.text.some((text) => text.length > 40),
      ),
    ).toBe(true);
    expect(sheet!.examples.length, lesson.id).toBeGreaterThan(0);
    expect(sheet!.source.length, lesson.id).toBeGreaterThan(30);
  }
  expect(builtInCheatSheets.has("unknown-topic")).toBe(false);
});
it("preserves complete prompts and meaningful quantities in the reviewed physics packs", () => {
  const pressure = builtInCheatSheets.get("detail-125")!,
    buoyancy = builtInCheatSheets.get("detail-126")!,
    current = builtInCheatSheets.get("detail-123")!;
  expect(pressure.examples[0].answer).toContain("3 kPa ve 6 kPa");
  expect(72 / 0.024).toBeCloseTo(3000);
  expect(72 / 0.012).toBeCloseTo(6000);
  expect(buoyancy.examples[0].answer).toContain("0,60 L");
  expect(((0.6 * 10) / (1000 * 10)) * 1000).toBeCloseTo(0.6);
  expect(current.examples[0].answer).toContain("2 A, 4 A, 6 A ve 2 Ω");
  expect(12 / (12 / 6 + 12 / 3)).toBe(2);
  for (const sheet of [pressure, buoyancy, current]) {
    expect(sheet.recall.length).toBeGreaterThanOrEqual(2);
    expect(sheet.cautions.length).toBeGreaterThanOrEqual(3);
  }
});

it("keeps a deep teaching sheet when a later question-only set shares the same topic", () => {
  for (const lesson of lessons.filter((lesson) =>
    lesson.tags.includes("soru-seti"),
  )) {
    const sheet = builtInCheatSheets.get(lessonTopic[lesson.id]);
    expect(sheet?.lessonId).not.toBe(lesson.id);
  }
  const factorization = builtInCheatSheets.get("detail-221")!;
  expect(factorization.lessonId).toBe("carpanlara-ayirma");
  expect(factorization.sections.length).toBeGreaterThanOrEqual(10);
});
