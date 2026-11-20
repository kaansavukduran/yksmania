import { describe, expect, it } from "vitest";
import { initialState, type AppState, type Session } from "../src/domain/model";
import type { ExamSession } from "../src/domain/examModel";
import { diffText, isSunday, weekStart, weekSummary, weeklyReport } from "../src/domain/weeklyReport";

const subjectOf = (lessonId: string) => ({ lm: "tyt-mat", lt: "tyt-tur" })[lessonId];

const session = (
  id: string,
  date: string,
  answers: [boolean, boolean?][],
  lessonId = "lm",
): Session => ({
  id,
  lessonId,
  date,
  finishedAt: `${date}T10:00:00.000Z`,
  responses: answers.map(([correct, assisted = false], i) => ({
    questionId: `${id}-q${i}`,
    selected: correct ? 0 : 1,
    correct,
    assisted,
    confidence: "medium",
  })),
  kind: "learn",
  minutes: 10,
  note: "",
});

const exam = (id: string, date: string, answers: (number | null)[], helpLevels?: number[]) => {
  const finishedAt = Date.parse(`${date}T12:00:00`);
  return {
    id,
    finishedAt,
    items: answers.map((_, i) => ({ id: `${id}-${i}`, subjectId: i % 2 ? "tyt-tur" : "tyt-mat", subjectName: "x", answer: 0 })),
    answers,
    helpLevels,
  } as unknown as ExamSession;
};

const state = (patch: Partial<AppState>): AppState => ({ ...initialState(), ...patch });

describe("week boundaries", () => {
  it("weeks run Monday to Sunday on local calendar days", () => {
    expect(weekStart("2026-11-16")).toBe("2026-11-16");
    expect(weekStart("2026-11-20")).toBe("2026-11-16");
    expect(weekStart("2026-11-22")).toBe("2026-11-16");
    expect(weekStart("2026-11-23")).toBe("2026-11-23");
    expect(isSunday("2026-11-22")).toBe(true);
    expect(isSunday("2026-11-20")).toBe(false);
  });

  it("counts Sunday in its own week and Monday in the next", () => {
    const s = state({ sessions: [session("sun", "2026-11-22", [[true]]), session("mon", "2026-11-23", [[false]])] });
    const week = weekSummary(s, "2026-11-16", subjectOf);
    expect(week.independentCorrect).toBe(1);
    expect(week.wrong).toBe(0);
    expect(weekSummary(s, "2026-11-23", subjectOf).wrong).toBe(1);
  });
});

describe("weekly summary", () => {
  it("counts help-assisted correct answers as assisted, never as independent", () => {
    const s = state({ sessions: [session("a", "2026-11-18", [[true], [true, true], [false], [false, true]])] });
    const week = weekSummary(s, "2026-11-16", subjectOf);
    expect(week).toMatchObject({ independentCorrect: 1, assistedSolved: 1, wrong: 2 });
  });

  it("uses exam help levels and reports completed exams and the best net", () => {
    const s = state({
      examSessions: [
        // correct, correct with help, wrong, blank
        exam("e1", "2026-11-17", [0, 0, 1, null], [0, 2, 0, 0]),
        exam("e2", "2026-11-19", [0, 0, 0, 0]),
        exam("old", "2026-11-12", [1, 1]),
      ],
    });
    const week = weekSummary(s, "2026-11-16", subjectOf);
    expect(week.exams).toBe(2);
    expect(week.independentCorrect).toBe(1 + 4);
    expect(week.assistedSolved).toBe(1);
    expect(week.wrong).toBe(1);
    expect(week.bestExamNet).toBe(4);
  });

  it("counts completed 3/7/21 reviews of both kinds in the week", () => {
    const s = state({
      sessions: [session("learn", "2026-11-10", [[true]]), session("rev", "2026-11-17", [[true]])],
      reviews: [
        { id: "r1", lessonId: "lm", anchorDate: "2026-11-10", targetDate: "2026-11-12", stage: 3, originSessionId: "learn", completedSessionId: "rev" },
        { id: "r2", lessonId: "lm", anchorDate: "2026-11-10", targetDate: "2026-11-16", stage: 7, originSessionId: "learn" },
      ],
      theoryReviewCompletions: [
        { topicId: "t", anchorDate: "2026-11-01", stage: 21, completedDate: "2026-11-21" },
        { topicId: "t", anchorDate: "2026-11-01", stage: 7, completedDate: "2026-11-07" },
      ],
    });
    expect(weekSummary(s, "2026-11-16", subjectOf).reviews).toBe(2);
  });

  it("names the subject that lost the most net", () => {
    const s = state({
      sessions: [session("a", "2026-11-17", [[false]], "lm"), session("b", "2026-11-18", [[false], [false]], "lt")],
    });
    expect(weekSummary(s, "2026-11-16", subjectOf).topLossSubject).toEqual({ subjectId: "tyt-tur", netLoss: 2.5 });
  });
});

describe("weekly report", () => {
  it("is absent without data for this week, even when last week had some", () => {
    expect(weeklyReport(initialState(), "2026-11-20", subjectOf)).toBeNull();
    const s = state({ sessions: [session("a", "2026-11-12", [[true]])] });
    expect(weeklyReport(s, "2026-11-20", subjectOf)).toBeNull();
  });

  it("compares this week with the previous week and marks Sunday", () => {
    const s = state({
      sessions: [
        session("prev", "2026-11-10", [[true], [false]]),
        session("now", "2026-11-18", [[true], [true], [true], [true]]),
      ],
    });
    const report = weeklyReport(s, "2026-11-22", subjectOf)!;
    expect(report.sunday).toBe(true);
    expect(report.current.independentCorrect).toBe(4);
    expect(report.previous.start).toBe("2026-11-09");
    expect(report.previous.independentCorrect).toBe(1);
    expect(diffText(report.current.independentCorrect, report.previous.independentCorrect)).toBe("geçen haftaya göre +3");
    expect(diffText(report.current.wrong, report.previous.wrong)).toBe("geçen haftaya göre -1");
    expect(weeklyReport(s, "2026-11-20", subjectOf)!.sunday).toBe(false);
  });

  it("formats differences in Turkish and does not change the saved state", () => {
    expect(diffText(5, 5)).toBe("geçen haftayla aynı");
    expect(diffText(2.5, 1)).toBe("geçen haftaya göre +1,5");
    const s = state({ sessions: [session("a", "2026-11-18", [[true]])] });
    const before = JSON.stringify(s);
    weeklyReport(s, "2026-11-20", subjectOf);
    expect(JSON.stringify(s)).toBe(before);
  });
});
