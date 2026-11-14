import { expect, it } from "vitest";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import {
  beginExam,
  changeExam,
  examCatalogue,
  examReference,
  examScore,
  finishExam,
  scaledExamSeconds,
} from "../src/domain/exams";
import { resetLearningProgress } from "../src/domain/resetProgress";
it("uses the normal time per question and labels incomplete exam distributions as short practice", () => {
  expect(scaledExamSeconds("TYT", 120)).toBe(9900);
  expect(scaledExamSeconds("AYT", 80)).toBe(10800);
  expect(scaledExamSeconds("TYT", 5)).toBe(413);
  expect(scaledExamSeconds("AYT", 5)).toBe(675);
  expect(() => scaledExamSeconds("TYT", 0)).toThrow();
  const specs = examCatalogue();
  expect(specs.some((s) => s.id === "mixed-tyt")).toBe(true);
  expect(specs.some((s) => s.id === "mixed-ayt")).toBe(true);
  expect(specs.some((s) => s.kind === "branch")).toBe(true);
  for (const spec of specs) {
    expect(new Set(spec.items.map((q) => q.id)).size).toBe(spec.items.length);
    expect(spec.durationSeconds).toBe(
      scaledExamSeconds(spec.exam, spec.items.length),
    );
    if (
      spec.kind === "mixed" &&
      spec.items.length < examReference[spec.exam].questions
    )
      expect(spec.fullLength).toBe(false);
    for (const q of spec.items) {
      expect(q.options[q.answer]).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(8);
      if (q.lessonId === "paragraf")
        expect(q.passage).toContain("Bir kitabı bitirmek");
    }
  }
});
it("retains answer snapshots, flags and deadlines while enforcing the exact expiry boundary", () => {
  const spec = examCatalogue().find((s) => s.id === "branch-tyt-turkce")!,
    start = 1000;
  let state = beginExam(initialState(), spec, start),
    draft = state.examDraft!;
  expect(() => beginExam(state, spec, start)).toThrow("EXAM_IN_PROGRESS");
  state = changeExam(
    state,
    draft.id,
    { type: "answer", index: 0, value: draft.items[0].answer },
    draft.deadline - 1,
  );
  state = changeExam(
    state,
    draft.id,
    { type: "flag", index: 1 },
    draft.deadline - 1,
  );
  expect(validateState(state)).toEqual(state);
  expect(() =>
    changeExam(
      state,
      draft.id,
      { type: "answer", index: 1, value: 0 },
      draft.deadline,
    ),
  ).toThrow("EXAM_EXPIRED");
  expect(() =>
    changeExam(state, draft.id, { type: "index", index: 999 }, start + 1),
  ).toThrow();
  state = finishExam(state, draft.id, draft.deadline + 86400000);
  expect(state.examSessions[0].finishedAt).toBe(draft.deadline);
  expect(state.examDraft).toBeNull();
  expect(state.examSessions).toHaveLength(1);
  expect(state.examSessions[0].timedOut).toBe(true);
  expect(state.examSessions[0].flagged).toEqual([1]);
  expect(finishExam(state, draft.id, draft.deadline + 1000)).toBe(state);
  expect(state.sessions).toEqual([]);
  expect(state.reviews).toEqual([]);
  expect(state.topicProgress).toEqual({});
  expect(validateState(state)).toEqual(state);
});
it("counts blank separately from wrong and computes real quarter-penalty net per subject", () => {
  const spec = examCatalogue().find((s) => s.id === "mixed-ayt")!;
  const state = beginExam(initialState(), spec, 1000),
    draft = state.examDraft!;
  draft.answers[0] = draft.items[0].answer;
  draft.answers[1] =
    (draft.items[1].answer + 1) % draft.items[1].options.length;
  const score = examScore(draft);
  expect(score.correct).toBe(1);
  expect(score.wrong).toBe(1);
  expect(score.blank).toBe(draft.items.length - 2);
  expect(score.net).toBe(0.75);
  expect(score.subjects.reduce((n, s) => n + s.net, 0)).toBe(0.75);
  draft.answers[0] = null;
  expect(examScore(draft).net).toBe(-0.25);
});
it("reads old backups without losing learning state, rejects broken snapshots, and clears only exam progress on reset", () => {
  const current = initialState();
  current.notes.personal = "Notum";
  current.settings.examDate = "2027-07-01";
  const { examDraft, examSessions, ...old } = current;
  expect(validateState(old)).toEqual(current);
  const spec = examCatalogue()[0],
    state = beginExam(current, spec, 1000);
  const bad = structuredClone(state);
  bad.examDraft!.answers.pop();
  expect(() => validateState(bad)).toThrow();
  const broken = structuredClone(state);
  broken.examDraft!.items[0].answer = 99;
  expect(() => validateState(broken)).toThrow();
  const done = finishExam(state, state.examDraft!.id, 2000),
    reset = resetLearningProgress(done);
  expect(() =>
    validateState({
      ...done,
      examSessions: [...done.examSessions, ...done.examSessions],
    }),
  ).toThrow();
  expect(() =>
    validateState({ ...done, examDraft: state.examDraft }),
  ).toThrow();
  expect(reset.examDraft).toBeNull();
  expect(reset.examSessions).toEqual([]);
  expect(reset.notes).toEqual(current.notes);
  expect(reset.settings).toEqual(current.settings);
});
