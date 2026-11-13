import { describe, expect, it } from "vitest";
import { initialState, type Session } from "../src/domain/model";
import {
  addDays,
  createReviews,
  finishSession,
  reviewPlan,
  undoSession,
  xp,
} from "../src/domain/scheduler";
const session: Session = {
  id: "s1",
  lessonId: "rasyonel-sayilar",
  date: "2026-11-13",
  finishedAt: "2026-11-13T12:00:00Z",
  kind: "learn",
  minutes: 1,
  note: "",
  responses: [],
};
describe("day-ordinal review policy and real availability", () => {
  it("uses day 1 as the learning day, including month/year boundaries", () => {
    expect(createReviews(session).map((r) => r.targetDate)).toEqual([
      "2026-11-15",
      "2026-11-19",
      "2026-12-03",
    ]);
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });
  it("preserves original dates while moving closed days", () => {
    const s = finishSession(initialState(), session);
    s.settings.blockedDates = ["2026-11-15"];
    s.settings.blockedWeekdays = [1];
    const plan = reviewPlan(s, "2026-11-13");
    expect(plan[0].scheduled).toBe("2026-11-17");
    expect(plan[0].review.targetDate).toBe("2026-11-15");
  });
  it("does not invent capacity when every weekday is blocked", () => {
    const s = finishSession(initialState(), session);
    s.settings.blockedWeekdays = [0, 1, 2, 3, 4, 5, 6];
    expect(reviewPlan(s).every((r) => r.scheduled === null)).toBe(true);
  });
  it("spreads overdue reviews within capacity", () => {
    const s = finishSession(initialState(), session);
    s.settings.dailyMinutes = 10;
    expect(reviewPlan(s, "2027-01-01").map((r) => r.scheduled)).toEqual([
      "2027-01-01",
      "2027-01-02",
      "2027-01-03",
    ]);
  });
  it("deduplicates session retries and lesson rewards", () => {
    const s = finishSession(initialState(), session);
    const again = finishSession(s, session);
    expect(again.sessions).toHaveLength(1);
    expect(again.reviews).toHaveLength(3);
    const repeat = finishSession(s, { ...session, id: "s2" });
    expect(repeat.reviews).toHaveLength(3);
    expect(xp(repeat)).toBe(25);
  });
  it("undoes a review completion and its reward", () => {
    const s = finishSession(initialState(), session);
    const reviewed = finishSession(s, {
      ...session,
      id: "s2",
      kind: "review",
      reviewId: s.reviews[0].id,
    });
    expect(xp(reviewed)).toBe(35);
    const undone = undoSession(reviewed, "s2");
    expect(undone.reviews[0].completedSessionId).toBeUndefined();
    expect(xp(undone)).toBe(25);
  });
  it("undoing learning removes schedules while preserving later actual review history", () => {
    const s = finishSession(initialState(), session);
    const reviewed = finishSession(s, {
      ...session,
      id: "s2",
      kind: "review",
      reviewId: s.reviews[0].id,
    });
    const undone = undoSession(reviewed, "s1");
    expect(undone.sessions.map((s) => s.id)).toEqual(["s2"]);
    expect(undone.reviews).toHaveLength(0);
    expect(xp(undone)).toBe(0);
  });
});
