import { describe, expect, it } from "vitest";
import type { Session } from "../src/domain/model";
import { compareMistakes, mistakeStatus, type RankedMistake } from "../src/domain/mistakeStatus";

const s = (id: string, date: string, correct: boolean, assisted = false): Session => ({
  id,
  lessonId: "l",
  date,
  finishedAt: `${date}T10:00:00Z`,
  responses: [{ questionId: "q", selected: correct ? 0 : 1, correct, assisted, confidence: "medium" }],
  kind: "learn",
  minutes: 5,
  note: "",
});

describe("mistake status comes only from later independent answers", () => {
  const wrong = s("a", "2026-11-01", false);
  it("stays open without a later independent correct answer", () => {
    expect(mistakeStatus([wrong, s("b", "2026-11-02", true, true)], wrong, "q")).toBe("acik");
    expect(mistakeStatus([s("z", "2026-10-30", true), wrong], wrong, "q")).toBe("acik");
  });
  it("is repaired by a later independent correct answer", () => {
    expect(mistakeStatus([wrong, s("b", "2026-11-02", true)], wrong, "q")).toBe("onarildi");
  });
  it("is permanent when that answer comes three or more days later", () => {
    expect(mistakeStatus([wrong, s("b", "2026-11-02", true), s("c", "2026-11-04", true)], wrong, "q")).toBe("kalici");
  });
});

describe("ordering", () => {
  const m = (x: Partial<RankedMistake>): RankedMistake => ({ status: "acik", confident: false, assistedOnly: false, stars: 5, finishedAt: "2026-11-01", ...x });
  it("puts open confident-wrong first, then low stars, repaired last", () => {
    const list = [
      m({ status: "kalici" }),
      m({ stars: 2 }),
      m({ confident: true, stars: 9 }),
      m({ status: "onarildi" }),
      m({ assistedOnly: true, stars: 1 }),
    ].sort(compareMistakes);
    expect(list.map((x) => [x.status, x.confident, x.assistedOnly, x.stars])).toEqual([
      ["acik", true, false, 9],
      ["acik", false, false, 2],
      ["acik", false, true, 1],
      ["onarildi", false, false, 5],
      ["kalici", false, false, 5],
    ]);
  });
});

describe("exam items count only when answered without help", () => {
  const wrong = s("a", "2026-11-01", false);
  const exam = (day: string, answer: number, help: number) => ({
    items: [{ id: "q", lessonId: "l", subjectId: "tyt-kimya", subjectName: "Kimya", lessonTitle: "L", prompt: "p", options: ["a", "b"], answer: 0, explanation: "e" }],
    answers: [answer],
    helpLevels: [help],
    finishedAt: Date.parse(`${day}T12:00:00`),
  });
  it("a correct sprint answer without help repairs; with help it does not", () => {
    expect(mistakeStatus([wrong], wrong, "q", [exam("2026-11-02", 0, 1)])).toBe("acik");
    expect(mistakeStatus([wrong], wrong, "q", [exam("2026-11-02", 1, 0)])).toBe("acik");
    expect(mistakeStatus([wrong], wrong, "q", [exam("2026-11-02", 0, 0)])).toBe("onarildi");
    expect(mistakeStatus([wrong], wrong, "q", [exam("2026-11-05", 0, 0)])).toBe("kalici");
  });
});
