import { describe, expect, it } from "vitest";
import { initialState } from "../src/domain/model";
import { beginExam, changeExam, examCatalogue, finishExam } from "../src/domain/exams";
import { evaluateTrophies } from "../src/domain/achievements";

function finishedExam(mode: "learning" | "simulation", helpOnFirst: boolean) {
  const spec = examCatalogue().find((s) => s.kind === "branch" && s.items.length >= 20)!;
  let state = beginExam(initialState(), spec, 1_000_000, mode);
  const draft = state.examDraft!;
  if (helpOnFirst) state = changeExam(state, draft.id, { type: "help", index: 0, level: 1 }, 1_000_050);
  draft.items.forEach((q, i) => {
    state = changeExam(state, draft.id, { type: "answer", index: i, value: q.answer }, 1_000_100 + i);
  });
  return finishExam(state, draft.id, 1_600_000);
}
const value = (state: ReturnType<typeof finishedExam>, id: string) =>
  evaluateTrophies(state, () => undefined).find((t) => t.id === id)!.value;

describe("exam trophies count exams finished without help", () => {
  it("counts a learning-mode exam (the app default) when no help panel was opened", () => {
    const state = finishedExam("learning", false);
    expect(value(state, "deneme-savascisi")).toBe(1);
    expect(value(state, "gizli:tam-isabet")).toBe(1);
    expect(value(state, "net-avcisi")).toBeGreaterThan(0);
  });
  it("does not count an exam in which help was opened", () => {
    const state = finishedExam("learning", true);
    expect(state.examSessions[0].helpLevels?.[0]).toBeGreaterThan(0);
    expect(value(state, "deneme-savascisi")).toBe(0);
    expect(value(state, "gizli:tam-isabet")).toBe(0);
  });
  it("keeps simulation exams with help switched on out of the count", () => {
    let state = beginExam(initialState(), examCatalogue().find((s) => s.kind === "branch" && s.items.length >= 20)!, 1_000_000, "simulation");
    const draft = state.examDraft!;
    state = changeExam(state, draft.id, { type: "help-enabled", index: 0, value: true }, 1_000_010);
    draft.items.forEach((q, i) => { state = changeExam(state, draft.id, { type: "answer", index: i, value: q.answer }, 1_000_100 + i); });
    state = finishExam(state, draft.id, 1_600_000);
    expect(value(state, "deneme-savascisi")).toBe(0);
    expect(value(finishedExam("simulation", false), "deneme-savascisi")).toBe(1);
  });
});
