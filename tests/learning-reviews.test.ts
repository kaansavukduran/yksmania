import { describe, it, expect } from "vitest";
import { initialState } from "../src/domain/model";
import { completionDate, setTopicCompletion } from "../src/domain/studyPlan";
import {
  learningReviewPlan,
  repeatName,
  setTheoryReviewCompletion,
} from "../src/domain/learningReviews";
import { finishSession, xp } from "../src/domain/scheduler";
import { lessonById } from "../src/domain/content";
import { validateState } from "../src/domain/storage";
const day = "2026-11-14";
const first = () =>
  setTopicCompletion(initialState(), "detail-139", "theory", true, day);
describe("topic-first retrieval on days 3, 7 and 21", () => {
  it("anchors at first study as day one, keeps exact targets across month/year/leap boundaries", () => {
    const state = first();
    expect(
      learningReviewPlan(state, day).map((r) => [
        r.stage,
        r.targetDate,
        repeatName(r.stage),
      ]),
    ).toEqual([
      [3, "2026-11-16", "İlk tekrar"],
      [7, "2026-11-20", "İkinci tekrar"],
      [21, "2026-12-04", "Son tekrar"],
    ]);
    const year = setTopicCompletion(
      initialState(),
      "detail-139",
      "theory",
      true,
      "2026-12-30",
    );
    expect(
      learningReviewPlan(year, "2026-12-30").map((r) => r.targetDate),
    ).toEqual(["2027-01-01", "2027-01-05", "2027-01-19"]);
    const leap = setTopicCompletion(
      initialState(),
      "detail-139",
      "theory",
      true,
      "2028-02-28",
    );
    expect(learningReviewPlan(leap, "2028-02-28")[0].targetDate).toBe(
      "2028-03-01",
    );
  });
  it("stores an explicit repeat once without XP, answers or a changed learning anchor, and can undo", () => {
    const before = first();
    before.notes.mine = "Kalıcı not";
    expect(() =>
      setTheoryReviewCompletion(before, "detail-139", 3, true, "2026-11-15"),
    ).toThrow("THEORY_REVIEW_NOT_DUE");
    const done = setTheoryReviewCompletion(
      before,
      "detail-139",
      3,
      true,
      "2026-11-16",
    );
    expect(
      setTheoryReviewCompletion(done, "detail-139", 3, true, "2026-11-17"),
    ).toBe(done);
    expect(done.theoryReviewCompletions).toHaveLength(1);
    expect(learningReviewPlan(done, "2026-11-16")[0]).toMatchObject({
      completedDate: "2026-11-16",
      scheduled: null,
      targetDate: "2026-11-16",
    });
    expect(done.sessions).toEqual([]);
    expect(done.reviews).toEqual([]);
    expect(xp(done)).toBe(0);
    expect(done.notes).toEqual(before.notes);
    expect(completionDate(done, "detail-139", "theory")).toBe(day);
    expect(
      setTheoryReviewCompletion(done, "detail-139", 3, false, "2026-11-16")
        .theoryReviewCompletions,
    ).toEqual([]);
  });
  it("shares eligible-day capacity with question reviews, preserving their original targets", () => {
    const lesson = lessonById("simyadan-kimyaya")!;
    let s = finishSession(first(), {
      id: "q",
      lessonId: lesson.id,
      date: day,
      finishedAt: day + "T12:00:00Z",
      responses: lesson.questions.map((q) => ({
        questionId: q.id,
        selected: q.answer,
        correct: true,
        assisted: false,
        confidence: "high",
      })),
      kind: "learn",
      includesTheory: false,
      minutes: 1,
      note: "",
    });
    s.settings.dailyMinutes = 10;
    s.settings.blockedDates = ["2026-11-16"];
    const plan = learningReviewPlan(s, day);
    expect(plan).toHaveLength(6);
    const pair = plan.filter((r) => r.stage === 3);
    expect(pair.map((r) => r.kind)).toEqual(["theory", "questions"]);
    expect(pair.map((r) => r.scheduled)).toEqual(["2026-11-17", "2026-11-18"]);
    expect(pair.every((r) => r.targetDate === "2026-11-16")).toBe(true);
    expect(s.reviews[0].targetDate).toBe("2026-11-16");
    s.settings.blockedWeekdays = [0, 1, 2, 3, 4, 5, 6];
    expect(learningReviewPlan(s, day).every((r) => r.scheduled === null)).toBe(
      true,
    );
  });
  it("reads old backups, validates repeat records and keeps orphaned historical anchors inactive", () => {
    const legacy: any = first();
    delete legacy.theoryReviewCompletions;
    expect(validateState(legacy).theoryReviewCompletions).toEqual([]);
    const done = setTheoryReviewCompletion(
      first(),
      "detail-139",
      3,
      true,
      "2026-11-16",
    );
    expect(validateState(done)).toEqual(done);
    expect(() =>
      validateState({
        ...done,
        theoryReviewCompletions: [
          ...done.theoryReviewCompletions,
          ...done.theoryReviewCompletions,
        ],
      }),
    ).toThrow("INVALID_THEORY_REVIEW");
    expect(() =>
      validateState({
        ...done,
        theoryReviewCompletions: [
          { ...done.theoryReviewCompletions[0], completedDate: day },
        ],
      }),
    ).toThrow("INVALID_THEORY_REVIEW");
    const undone = setTopicCompletion(
      done,
      "detail-139",
      "theory",
      false,
      "2026-11-16",
    );
    expect(learningReviewPlan(undone, "2026-11-16")).toEqual([]);
    expect(undone.theoryReviewCompletions).toHaveLength(1);
    const relearned = setTopicCompletion(
      undone,
      "detail-139",
      "theory",
      true,
      "2026-11-17",
    );
    expect(
      learningReviewPlan(relearned, "2026-11-17").every(
        (r) => !r.completedDate,
      ),
    ).toBe(true);
    expect(learningReviewPlan(relearned, "2026-11-17")[0].targetDate).toBe(
      "2026-11-19",
    );
  });
});
