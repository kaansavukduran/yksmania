import { expect, it } from "vitest";
import previousAnswers from "./fixtures/0.9.1-question-answers.json";
import { lessons } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { examCatalogue, selectExamVariant } from "../src/domain/exams";
import { topicLessons } from "../src/domain/studyPlan";
const links = [
  ["dunya-gucu-osmanli", "detail-236"],
  ["kimyasal-turler-lewis", "detail-152"],
  ["isi-ve-sicaklik", "detail-119"],
  ["nukleik-asitler", "detail-10"],
  ["iyonik-bag-ve-guclu-etkilesimler", "detail-153"],
  ["iyonik-bilesik-adlandirma", "detail-154"],
];
it("retains every previously published0.9.1 question identity and grade key", () => {
  const questions = lessons.flatMap((l) => l.questions);
  expect(Object.keys(previousAnswers)).toHaveLength(240);
  for (const [id, answer] of Object.entries(previousAnswers))
    expect(questions.find((q) => q.id === id)?.answer, id).toBe(answer);
  expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  expect(lessons.filter((l) => l.id === "nukleik-asitler")).toHaveLength(1);
});
it("connects each source heading, detailed guide and original bank to actual branch practice", () => {
  for (const [id, topic] of links) {
    const lesson = topicLessons(topic).find((l) => l.id === id)!;
    expect(lesson, id).toBeDefined();
    expect(lesson.questions.length).toBeGreaterThanOrEqual(10);
    const guide = lessonGuides.get(id)!;
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    const branch = examCatalogue().find(
      (e) => e.id === `branch-${lesson.subjectId}`,
    )!;
    expect(
      Array.from({ length: 20 }, (_, attempt) =>
        selectExamVariant(branch, `retained-source-${attempt}`),
      )
        .flat()
        .some((q) => q.lessonId === id),
      id,
    ).toBe(true);
  }
});
