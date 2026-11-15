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
  selectExamVariant,
} from "../src/domain/exams";
import { lessons } from "../src/domain/content";
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

it("selects a reproducible fresh paper from the whole branch bank without changing catalogue previews", () => {
  const spec = examCatalogue().find((s) => s.id === "branch-tyt-matematik")!;
  const original = structuredClone(spec);
  const first = selectExamVariant(spec, "attempt-A"),
    same = selectExamVariant(spec, "attempt-A"),
    next = selectExamVariant(spec, "attempt-B");
  expect(first).toEqual(same);
  expect(first.map((item) => item.id)).not.toEqual(next.map((item) => item.id));
  expect(first).toHaveLength(spec.items.length);
  expect(new Set(first.map((item) => item.id)).size).toBe(first.length);
  const previewIds = new Set(spec.items.map((item) => item.id));
  expect(first.some((item) => !previewIds.has(item.id))).toBe(true);
  expect(spec).toEqual(original);
  expect(examCatalogue().find((s) => s.id === spec.id)).toEqual(original);
});

it("preserves each available subject quota, total duration and incomplete-format metadata in seeded variants", () => {
  const groupedCounts = (items: { subjectId: string }[]) => {
    const counts = new Map<string, number>();
    for (const item of items) {
      const key = item.subjectId.replace(/-geometri$/, "-matematik");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  };
  for (const spec of examCatalogue()) {
    const metadata = structuredClone(spec);
    for (const seed of ["quota-A", "quota-B", "quota-C"]) {
      const chosen = selectExamVariant(spec, seed);
      expect(chosen).toHaveLength(spec.items.length);
      expect(groupedCounts(chosen)).toEqual(groupedCounts(spec.items));
      expect(new Set(chosen.map((item) => item.id)).size).toBe(chosen.length);
      expect(scaledExamSeconds(spec.exam, chosen.length)).toBe(
        spec.durationSeconds,
      );
    }
    expect(spec).toEqual(metadata);
  }
});

it("copies whole original question payloads with unchanged option order and answer indices", () => {
  const bank = new Map(
    lessons.flatMap((lesson) =>
      lesson.questions.map((q) => [q.id, { lesson, q }] as const),
    ),
  );
  for (const spec of examCatalogue()) {
    const chosen = selectExamVariant(spec, "payload-check");
    for (const item of chosen) {
      const original = bank.get(item.id)!;
      expect(item.lessonId).toBe(original.lesson.id);
      expect(item.subjectId).toBe(original.lesson.subjectId);
      expect(item.prompt).toBe(original.q.prompt.tr);
      expect(item.options).toEqual(original.q.options.map((o) => o.tr));
      expect(item.answer).toBe(original.q.answer);
      expect(item.passage).toBe(original.q.passage?.tr);
      expect(item.explanation).toBe(original.q.explanation.tr);
    }
    if (spec.id === "branch-tyt-turkce")
      expect(
        chosen.some((item) => item.passage?.includes("Bir kitabı bitirmek")),
      ).toBe(true);
  }
});

it("changes an identical last order inside one subject block while keeping its question set and quotas", () => {
  for (const id of ["mixed-tyt", "branch-ayt-kimya"]) {
    const spec = examCatalogue().find((s) => s.id === id)!;
    const first = selectExamVariant(spec, "same-seed"),
      ids = first.map((item) => item.id),
      next = selectExamVariant(spec, "same-seed", ids);
    expect(next.map((item) => item.id)).not.toEqual(ids);
    expect(next.map((item) => item.id).sort()).toEqual([...ids].sort());
    expect(next.map((item) => item.subjectId)).toEqual(
      first.map((item) => item.subjectId),
    );
  }
});

it("keeps custom papers as supplied and makes independent copies instead of mutating caller snapshots", () => {
  const known = examCatalogue()[0];
  const custom = {
    ...known,
    id: "custom-practice",
    items: known.items.slice(0, 3),
    durationSeconds: scaledExamSeconds(known.exam, 3),
  };
  const expected = structuredClone(custom.items);
  expect(selectExamVariant(custom, "custom-A")).toEqual(expected);
  expect(selectExamVariant(custom, "custom-B")).toEqual(expected);
  // A caller can deliberately customize even a known ID's question payload.
  const amended = structuredClone(known);
  amended.items[0].prompt = "Özel çalışma kökü";
  expect(selectExamVariant(amended, "amended")).toEqual(amended.items);
  const started = beginExam(initialState(), custom, 1000);
  started.examDraft!.items[0].options[0] = "Bağımsız kopya";
  expect(custom.items).toEqual(expected);
});

it("starts a different second attempt without changing the first saved paper or reshuffling a resumed draft", () => {
  const spec = examCatalogue().find((s) => s.id === "branch-tyt-turkce")!;
  const started = beginExam(initialState(), spec, 1000),
    draft = structuredClone(started.examDraft!);
  const answered = changeExam(
    started,
    draft.id,
    { type: "answer", index: 0, value: draft.items[0].answer },
    1001,
  );
  const resumed = validateState(JSON.parse(JSON.stringify(answered)));
  expect(resumed.examDraft).toEqual(answered.examDraft);
  expect(resumed.examDraft!.items).toEqual(draft.items);
  const ended = finishExam(resumed, draft.id, 2000),
    oldSession = structuredClone(ended.examSessions[0]),
    second = beginExam(ended, spec, 3000);
  expect(second.examDraft!.items.map((item) => item.id)).not.toEqual(
    draft.items.map((item) => item.id),
  );
  expect(second.examSessions[0]).toEqual(oldSession);
  expect(second.examDraft!.answers.every((answer) => answer === null)).toBe(
    true,
  );
  expect(second.examDraft!.deadline).toBe(3000 + spec.durationSeconds * 1000);
  expect(validateState(JSON.parse(JSON.stringify(second)))).toEqual(second);
  expect(second.sessions).toEqual([]);
  expect(second.reviews).toEqual([]);
  expect(second.topicProgress).toEqual({});
});
