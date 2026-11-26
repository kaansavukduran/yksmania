import { describe, expect, it } from "vitest";
import { initialState, type Session } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { lessonById } from "../src/domain/content";
import { completionDate, lessonTopic, topicResults } from "../src/domain/studyPlan";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { finishSession } from "../src/domain/scheduler";

const attempt = (id: string, answered: number, questionCount?: number): Session => {
  const lesson = lessonById(id)!;
  return {
    id: `s:${id}:${answered}`, lessonId: id, date: "2026-11-26", finishedAt: "2026-11-26T10:00:00Z",
    responses: lesson.questions.slice(0, answered).map((q) => ({ questionId: q.id, selected: q.answer, correct: true, assisted: false, confidence: "medium" as const })),
    ...(questionCount ? { questionCount } : {}),
    kind: "learn", includesTheory: false, minutes: 5, note: "",
  };
};

describe("a finished set counts at the size it was opened", () => {
  it("counts a legacy draft finished at its stored size", () => {
    const id = "kumeler";
    const lesson = lessonById(id)!;
    const size = draftQuestionCount({ lessonId: id, index: 3, responses: [] } as never, lesson.questions.length);
    expect(size).toBeLessThan(lesson.questions.length);
    const state = finishSession(initialState(), attempt(id, size, size));
    expect(() => validateState(state)).not.toThrow();
    expect(topicResults(state).get(lessonTopic[id])?.responses).toHaveLength(size);
    expect(completionDate(state, lessonTopic[id], "questions")).toBe("2026-11-26");
  });

  it("keeps the old rule for sessions saved without a set size", () => {
    const id = "kumeler";
    const lesson = lessonById(id)!;
    const partial = finishSession(initialState(), attempt(id, 10));
    expect(topicResults(partial).get(lessonTopic[id])).toBeUndefined();
    const full = finishSession(initialState(), attempt(id, lesson.questions.length));
    expect(topicResults(full).get(lessonTopic[id])?.responses).toHaveLength(lesson.questions.length);
  });
});
