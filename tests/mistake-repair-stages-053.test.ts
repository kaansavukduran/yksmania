import { describe, expect, it } from "vitest";
import type { Session } from "../src/domain/model";
import { repairCheckDay, repairProgress, mistakeStatus } from "../src/domain/mistakeStatus";
import { pickTwin, solvedIndependentlyBy, twinForMistake } from "../src/domain/twinQuestion";

type R = { q: string; correct: boolean; assisted?: boolean };
const s = (id: string, date: string, rows: R[], hour = 10): Session => ({
  id,
  lessonId: "l",
  date,
  finishedAt: `${date}T${String(hour).padStart(2, "0")}:00:00Z`,
  responses: rows.map((r) => ({
    questionId: r.q,
    selected: r.correct ? 0 : 1,
    correct: r.correct,
    assisted: !!r.assisted,
    confidence: "medium" as const,
  })),
  kind: "learn",
  minutes: 5,
  note: "",
});
const exam = (day: string, ids: string[], answers: number[], help: number[] = ids.map(() => 0)) => ({
  items: ids.map((id) => ({ id, lessonId: "l", subjectId: "tyt-kimya", subjectName: "Kimya", lessonTitle: "L", prompt: "p", options: ["a", "b"], answer: 0, explanation: "e" })),
  answers,
  helpLevels: help,
  finishedAt: Date.parse(`${day}T12:00:00`),
});

describe("three-stage repair is derived from saved answers", () => {
  const wrong = s("m", "2026-11-01", [{ q: "q", correct: false }]);
  it("starts at stage 1 and the delayed check opens three calendar days later", () => {
    const p = repairProgress([wrong], wrong, "q", [], "t");
    expect(p.stage).toBe(1);
    expect(p.checkDay).toBe("2026-11-04");
    expect(repairCheckDay("2026-12-30")).toBe("2027-01-02");
  });
  it("walks retry → twin → delayed check in order", () => {
    const retry = s("a", "2026-11-02", [{ q: "q", correct: true }]);
    const twin = s("b", "2026-11-02", [{ q: "t", correct: true }], 11);
    const late = s("c", "2026-11-04", [{ q: "t", correct: true }]);
    expect(repairProgress([wrong, retry], wrong, "q", [], "t").stage).toBe(2);
    expect(repairProgress([wrong, retry, twin], wrong, "q", [], "t").stage).toBe(3);
    const done = repairProgress([wrong, retry, twin, late], wrong, "q", [], "t");
    expect(done.stage).toBe(4);
    expect(done.final?.day).toBe("2026-11-04");
    expect(mistakeStatus([wrong, retry, twin, late], wrong, "q", [], "t")).toBe("kalici");
  });
  it("help-assisted answers never pass a stage", () => {
    const retry = s("a", "2026-11-02", [{ q: "q", correct: true }]);
    const helped = s("b", "2026-11-03", [{ q: "t", correct: true, assisted: true }]);
    expect(repairProgress([wrong, retry, helped], wrong, "q", [], "t").stage).toBe(2);
    expect(repairProgress([wrong, retry], wrong, "q", [exam("2026-11-03", ["t"], [0], [1])], "t").stage).toBe(2);
    expect(repairProgress([wrong, retry], wrong, "q", [exam("2026-11-03", ["t"], [0], [0])], "t").stage).toBe(3);
  });
  it("one answer never closes two stages: the delayed check needs a separate later answer", () => {
    const lateRetry = s("a", "2026-11-06", [{ q: "q", correct: true }]);
    const lateTwin = s("b", "2026-11-06", [{ q: "t", correct: true }], 11);
    expect(repairProgress([wrong, lateRetry, lateTwin], wrong, "q", [], "t").stage).toBe(3);
    const again = s("c", "2026-11-07", [{ q: "q", correct: true }]);
    expect(repairProgress([wrong, lateRetry, lateTwin, again], wrong, "q", [], "t").stage).toBe(4);
  });
  it("an answer before day 3 does not count as the delayed check", () => {
    const retry = s("a", "2026-11-02", [{ q: "q", correct: true }]);
    const twin = s("b", "2026-11-02", [{ q: "t", correct: true }], 11);
    const early = s("c", "2026-11-03", [{ q: "q", correct: true }]);
    expect(repairProgress([wrong, retry, twin, early], wrong, "q", [], "t").stage).toBe(3);
  });
  it("without a twin stage 2 is skipped as ikizsiz, never passed", () => {
    const retry = s("a", "2026-11-02", [{ q: "q", correct: true }]);
    const p = repairProgress([wrong, retry], wrong, "q");
    expect(p).toMatchObject({ stage: 3, noTwin: true });
    expect(p.twin).toBeUndefined();
    const late = s("c", "2026-11-05", [{ q: "q", correct: true }]);
    expect(repairProgress([wrong, retry, late], wrong, "q").stage).toBe(4);
  });
  it("answers saved before the mistake never count", () => {
    const before = s("z", "2026-10-30", [{ q: "q", correct: true }, { q: "t", correct: true }]);
    expect(repairProgress([before, wrong], wrong, "q", [], "t").stage).toBe(1);
  });
});

describe("twin choice", () => {
  const qs = [
    { id: "a", skill: "x" },
    { id: "b", skill: "y" },
    { id: "c", skill: "x" },
    { id: "d", skill: "z" },
    { id: "e", skill: "x" },
  ];
  it("prefers the same skill, next in lesson order, wrapping around", () => {
    expect(pickTwin(qs, "c", new Set())).toBe("e");
    expect(pickTwin(qs, "e", new Set())).toBe("a");
    expect(pickTwin(qs, "b", new Set())).toBe("c");
  });
  it("skips questions already solved correctly and falls back to other skills", () => {
    expect(pickTwin(qs, "c", new Set(["e", "a"]))).toBe("d");
    expect(pickTwin(qs, "c", new Set(["a", "b", "d", "e"]))).toBeUndefined();
    expect(pickTwin(qs, "missing", new Set())).toBeUndefined();
  });
  it("is deterministic and does not move once the twin is solved later", () => {
    const mistake = s("m", "2026-11-01", [{ q: "c", correct: false }, { q: "e", correct: true }]);
    const later = s("n", "2026-11-02", [{ q: "a", correct: true }]);
    const first = twinForMistake(qs, [mistake], [], mistake, "c");
    expect(first).toBe("a"); // e was solved in the mistake's own set
    expect(twinForMistake(qs, [mistake, later], [], mistake, "c")).toBe(first);
    expect(twinForMistake(qs, [mistake, later], [], mistake, "c")).toBe(twinForMistake(qs, [mistake, later], [], mistake, "c"));
  });
  it("counts only independent correct answers as already solved", () => {
    const helped = s("h", "2026-10-30", [{ q: "e", correct: true, assisted: true }, { q: "a", correct: false }]);
    const solved = solvedIndependentlyBy([helped], [exam("2026-10-29", ["d", "b"], [0, 0], [0, 2])], "2026-11-01T10:00:00Z");
    expect([...solved].sort()).toEqual(["d"]);
  });
});
