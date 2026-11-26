import { describe, expect, it } from "vitest";
import { initialState, type Session } from "../src/domain/model";
import { finishSession, reviewPlan, undoSession } from "../src/domain/scheduler";
import { validateState } from "../src/domain/storage";

const base: Session = {
  id: "s1", lessonId: "rasyonel-sayilar", date: "2026-11-13", finishedAt: "2026-11-13T12:00:00Z",
  kind: "learn", minutes: 1, note: "", responses: [],
};

describe("undoing the first learn session", () => {
  it("re-anchors 3/7/21 reviews on the earliest remaining learn session", () => {
    let state = finishSession(initialState(), base);
    state = finishSession(state, { ...base, id: "s2", date: "2026-11-14", finishedAt: "2026-11-14T12:00:00Z" });
    state = undoSession(state, "s1");
    expect(() => validateState(state)).not.toThrow();
    expect(state.reviews.map((r) => [r.originSessionId, r.anchorDate, r.targetDate])).toEqual([
      ["s2", "2026-11-14", "2026-11-16"],
      ["s2", "2026-11-14", "2026-11-20"],
      ["s2", "2026-11-14", "2026-12-04"],
    ]);
    expect(reviewPlan(state, "2026-11-15")).toHaveLength(3);
  });

  it("removes the schedule when no learn session remains", () => {
    const state = undoSession(finishSession(initialState(), base), "s1");
    expect(state.reviews).toEqual([]);
  });

  it("keeps existing reviews untouched when a later session is undone", () => {
    let state = finishSession(initialState(), base);
    state = finishSession(state, { ...base, id: "s2", date: "2026-11-14" });
    const before = state.reviews;
    expect(undoSession(state, "s2").reviews).toEqual(before);
  });
});
