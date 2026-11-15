import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { foundationQuestionSets } from "../src/learning/forge012FoundationQuestions";
import { sourceNarratives } from "../src/learning/narratives";
import { topicLessons } from "../src/domain/studyPlan";
import { questionContentIssues } from "../src/domain/questionContent";

it("makes three existing nutrient topics independently practicable without replacing their teaching", () => {
  expect(foundationQuestionSets.map((pack) => pack.topicId)).toEqual([
    "detail-5",
    "detail-6",
    "detail-9",
  ]);
  for (const pack of foundationQuestionSets) {
    const lesson = lessonById(pack.lessonId)!;
    expect(topicLessons(pack.topicId)).toContain(lesson);
    expect(lesson.body).toEqual(
      sourceNarratives.find((old) => old.id === pack.lessonId)!.body,
    );
    expect(lesson.questions).toHaveLength(10);
    for (const q of lesson.questions) {
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.explanation.tr).not.toBe(q.options[q.answer].tr);
      expect(q.id).toMatch(/^f012-foundation-/);
    }
  }
});
it("retains the independently checked hydrolysis and vitamin distinctions", () => {
  const first = (id: string) => lessonById(id)!.questions[0];
  const correct = (id: string) => {
    const q = first(id);
    return q.options[q.answer].tr;
  };
  expect(correct("karbohidratlar")).toBe("5 glikoz ve 1 galaktoz");
  expect(correct("lipitler")).toBe("4 gliserol, 12 yağ asidi ve 12 su");
  expect(correct("vitaminler")).toBe("A, D, E, K");
});
