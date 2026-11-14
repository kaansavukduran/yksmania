import { expect, it } from "vitest";
import { narrativeScienceQuestions } from "../src/learning/narrativeScienceQuestions";
import { narrativeById } from "../src/learning/narratives";
import { questionContentIssues } from "../src/domain/questionContent";
import { lessons } from "../src/domain/content";
it("adds only complete self-contained original sets to source-reviewed science lessons", () => {
  const ids = new Set(
    lessons
      .flatMap((lesson) => lesson.questions)
      .map((question) => question.id),
  );
  expect(Object.keys(narrativeScienceQuestions)).toHaveLength(12);
  for (const [lessonId, questions] of Object.entries(
    narrativeScienceQuestions,
  )) {
    expect(narrativeById.has(lessonId), lessonId).toBe(true);
    expect(questions).toHaveLength(5);
    for (const question of questions) {
      // Root may already have wired these exact objects into the catalogue. Never
      // collide with any DIFFERENT original legacy question or another new item.
      const collisions = lessons
        .flatMap((lesson) => lesson.questions)
        .filter((q) => q.id === question.id && q !== question);
      expect(collisions, question.id).toEqual([]);
      expect(questions.filter((q) => q.id === question.id)).toHaveLength(1);
      expect(questionContentIssues(question), question.id).toEqual([]);
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((option) => option.tr)).size).toBe(5);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(5);
      expect(question.prompt.tr.trim()).not.toMatch(
        /^(soru|örnek|TODO)[.!?…]*$/i,
      );
      expect(question.explanation.tr.trim()).not.toBe(
        question.options[question.answer].tr.trim(),
      );
      expect(question.hint.tr.trim()).not.toBe("");
      expect(question.skill).toMatch(/^ns-/);
      ids.add(question.id);
    }
  }
  expect(
    new Set(
      Object.values(narrativeScienceQuestions)
        .flat()
        .map((q) => q.id),
    ).size,
  ).toBe(60);
});
it("checks signed-particle, density, motion and energy answers with independent arithmetic", () => {
  const find = (id: string) =>
    Object.values(narrativeScienceQuestions)
      .flat()
      .find((q) => q.id === id)!;
  const answer = (id: string) => {
    const q = find(id);
    return q.options[q.answer].tr;
  };
  expect(answer("ns-atom-1")).toBe([20, 40 - 20, 20 - 2].join(", "));
  expect(answer("ns-atom-2")).toBe(String(27 + 13 - 3));
  expect(answer("ns-isotope-5")).toBe(
    (20 * 0.6 + 22 * 0.4).toFixed(1).replace(".", ","),
  );
  expect(answer("ns-density-2")).toBe(
    ((20 + 20) / (20 / 1 + 20 / 4)).toFixed(1).replace(".", ","),
  );
  expect(answer("ns-motion-1")).toBe(
    `${(15 + 6) / 3} m/s ve +${(15 - 6) / 3} m/s`,
  );
  const velocity = -3 + -2 * 2;
  expect(answer("ns-motion-2")).toBe(
    `${velocity < 0 ? "−" : ""}${Math.abs(velocity)} m/s ve ${Math.abs(velocity)} m/s`,
  );
  expect(answer("ns-energy-3")).toBe(String(3 * 10 * (12 - 4)));
  expect(answer("ns-energy-4")).toBe(`${200 - 60 - 40} J`);
  expect(answer("ns-energy-5")).toBe(`${1800 / 60} W`);
  expect(answer("ns-water-2")).toBe(String(10 ** (6 - 4)));
});
it("publishes each reviewed science question set on its actual lesson, with no orphaned bank entries", () => {
  for (const [lessonId, questions] of Object.entries(
    narrativeScienceQuestions,
  )) {
    const lesson = lessons.find((candidate) => candidate.id === lessonId);
    expect(lesson, lessonId).toBeDefined();
    expect(lesson!.questions.map((question) => question.id)).toEqual(
      questions.map((question) => question.id),
    );
  }
});
