import { describe, expect, it } from "vitest";
import type { Session } from "../src/domain/model";
import type { ExamSession } from "../src/domain/examModel";
import {
  lastSevenDays,
  mistakeKey,
  mistakePatterns,
  UNTAGGED,
  UNTAGGED_LABEL,
  wrongAnswers,
} from "../src/domain/mistakePatterns";

const subjectOf = (lessonId: string) => ({ lm: "tyt-mat", lt: "tyt-tur" })[lessonId];

const session = (
  id: string,
  date: string,
  lessonId: string,
  answers: [string, boolean, boolean?][],
): Session => ({
  id,
  lessonId,
  date,
  finishedAt: `${date}T10:00:00.000Z`,
  responses: answers.map(([questionId, correct, assisted = false]) => ({
    questionId,
    selected: correct ? 0 : 1,
    correct,
    assisted,
    confidence: "medium",
  })),
  kind: "learn",
  minutes: 10,
  note: "",
});

const exam = (date: string, rows: [string, string, number | null][]) =>
  ({
    finishedAt: Date.parse(`${date}T12:00:00`),
    items: rows.map(([id, subjectId]) => ({ id, subjectId, answer: 0 })),
    answers: rows.map(([, , a]) => a),
  }) as unknown as Pick<ExamSession, "items" | "answers" | "finishedAt">;

describe("weekly mistake patterns", () => {
  const today = "2026-11-20";
  const a = session("a", "2026-11-19", "lm", [
    ["q1", false],
    ["q2", false],
    ["q3", true],
    ["q4", true, true],
  ]);
  const b = session("b", "2026-11-18", "lm", [["q5", false]]);
  const c = session("c", "2026-11-17", "lt", [["q6", false]]);
  const old = session("old", "2026-11-13", "lm", [["q7", false]]);
  const tags = {
    [mistakeKey("a", "q1")]: { reason: "islem" },
    [mistakeKey("a", "q2")]: { reason: "islem" },
    [mistakeKey("b", "q5")]: { reason: "bilgi" },
    [mistakeKey("c", "q6")]: { reason: "uydurma" },
  };

  it("keeps only wrong answers from the last seven days, today included", () => {
    const rows = lastSevenDays(wrongAnswers([a, b, c, old], [], tags, subjectOf), today);
    expect(rows.map((r) => r.questionId).sort()).toEqual(["q1", "q2", "q5", "q6"]);
    // Help-assisted correct answers are not wrong answers.
    expect(rows.some((r) => r.questionId === "q4")).toBe(false);
    expect(lastSevenDays(wrongAnswers([old], [], {}, subjectOf), "2026-11-19")).toHaveLength(1);
    expect(lastSevenDays(wrongAnswers([old], [], {}, subjectOf), "2026-11-20")).toHaveLength(0);
  });

  it("ranks subject × reason patterns by net loss (wrong × 1.25)", () => {
    const patterns = mistakePatterns(lastSevenDays(wrongAnswers([a, b, c, old], [], tags, subjectOf), today));
    expect(patterns[0]).toMatchObject({ subjectId: "tyt-mat", reason: "islem", wrong: 2, netLoss: 2.5 });
    expect(patterns[0].questionIds).toEqual(["q1", "q2"]);
    expect(patterns.map((p) => p.netLoss)).toEqual([2.5, 1.25, 1.25]);
    expect(patterns).toHaveLength(3);
  });

  it("puts mistakes without a learner tag (or an unknown tag) in the untagged pattern", () => {
    const patterns = mistakePatterns(wrongAnswers([c], [], tags, subjectOf));
    expect(patterns).toEqual([
      expect.objectContaining({ subjectId: "tyt-tur", reason: UNTAGGED, reasonLabel: UNTAGGED_LABEL, wrong: 1 }),
    ]);
  });

  it("includes wrong exam answers as untagged, ignoring blanks and correct ones", () => {
    const e = exam("2026-11-20", [
      ["x1", "tyt-mat", 1],
      ["x2", "tyt-mat", 2],
      ["x3", "tyt-mat", null],
      ["x4", "tyt-mat", 0],
    ]);
    const patterns = mistakePatterns(lastSevenDays(wrongAnswers([], [e], {}, subjectOf), today));
    expect(patterns).toEqual([
      expect.objectContaining({ subjectId: "tyt-mat", reason: UNTAGGED, wrong: 2, netLoss: 2.5, questionIds: ["x1", "x2"] }),
    ]);
  });

  it("returns no pattern when there is no wrong answer this week", () => {
    expect(mistakePatterns(lastSevenDays(wrongAnswers([old], [], {}, subjectOf), today))).toEqual([]);
    expect(mistakePatterns([])).toEqual([]);
  });

  it("deduplicates repeated questions inside one pattern but counts every wrong answer", () => {
    const again = session("d", "2026-11-20", "lm", [["q1", false]]);
    const patterns = mistakePatterns(wrongAnswers([a, again], [], {}, subjectOf));
    expect(patterns[0]).toMatchObject({ reason: UNTAGGED, wrong: 3, netLoss: 3.75 });
    expect(patterns[0].questionIds).toEqual(["q1", "q2"]);
  });
});
