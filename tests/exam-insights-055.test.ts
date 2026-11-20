import { describe, expect, it } from "vitest";
import {
  COMPASS_TARGETS,
  compassTarget,
  examPace,
  lostNetTable,
  netCompass,
  nextFlagged,
  paceCheckpointDue,
} from "../src/domain/examInsights";
import { cueNotes } from "../src/domain/soundEngine";
import { playExamFinishCue } from "../src/domain/examFinishCue";

const item = (id: string, subjectId: string, subjectName: string) => ({ id, subjectId, subjectName, answer: 0 }) as never;

describe("055 hedef net seçimi", () => {
  it("offers +3, +5 and +10 with +5 as default and falls back to +5", () => {
    expect([...COMPASS_TARGETS]).toEqual([3, 5, 10]);
    expect(compassTarget(3)).toBe(3);
    expect(compassTarget(10)).toBe(10);
    expect(compassTarget(7)).toBe(5);
    expect(compassTarget(undefined)).toBe(5);
    expect(compassTarget("10")).toBe(5);
  });
  it("uses the chosen target with the same 1,25 / 1 rule", () => {
    const items = [
      ...Array.from({ length: 4 }, (_, i) => item(`m${i}`, "m", "TYT Matematik")),
      ...Array.from({ length: 10 }, (_, i) => item(`t${i}`, "t", "TYT Türkçe")),
    ];
    // Matematik: 4 yanlış (5 net), Türkçe: 10 boş (10 net).
    const answers = [1, 1, 1, 1, ...Array(10).fill(null)];
    const three = netCompass({ items, answers } as never, 3);
    expect(three.target).toBe(3);
    expect(three.questions).toBe(3); // 3 × 1,25 = 3,75
    expect(three.gain).toBeCloseTo(3.75);
    const ten = netCompass({ items, answers } as never, 10);
    expect(ten.reached).toBe(true);
    expect(ten.questions).toBe(9); // 4 yanlış = 5 net + 5 boş = 5 net
    expect(ten.steps).toEqual([
      { subject: "TYT Matematik", wrongToFix: 4, blankToFix: 0, gain: 5 },
      { subject: "TYT Türkçe", wrongToFix: 0, blankToFix: 5, gain: 5 },
    ]);
  });
});

describe("055 kayıp net otopsisi", () => {
  it("lists lost net per subject, biggest loss first, with a total row", () => {
    const items = [
      item("a1", "a", "TYT Türkçe"),
      item("a2", "a", "TYT Türkçe"),
      item("b1", "b", "TYT Matematik"),
      item("b2", "b", "TYT Matematik"),
      item("b3", "b", "TYT Matematik"),
      item("c1", "c", "TYT Fizik"),
      item("d1", "d", "TYT Kimya"),
    ];
    // Türkçe: 1 yanlış + 1 boş = 2,25; Matematik: 2 yanlış + 1 doğru = 2,5;
    // Fizik: 1 boş = 1; Kimya: doğru, tabloda yer almaz.
    const answers = [2, null, 1, 3, 0, null, 0];
    const { rows, total } = lostNetTable({ items, answers } as never);
    expect(rows.map((r) => r.subject)).toEqual(["TYT Matematik", "TYT Türkçe", "TYT Fizik"]);
    expect(rows.map((r) => r.lost)).toEqual([2.5, 2.25, 1]);
    expect(rows[1]).toEqual({ subject: "TYT Türkçe", wrong: 1, blank: 1, lost: 2.25 });
    expect(total).toEqual({ wrong: 3, blank: 2, lost: 5.75 });
  });
  it("breaks ties by subject name and is empty for a perfect paper", () => {
    const items = [item("x", "x", "TYT Tarih"), item("y", "y", "TYT Coğrafya")];
    const tie = lostNetTable({ items, answers: [null, null] } as never);
    expect(tie.rows.map((r) => r.subject)).toEqual(["TYT Coğrafya", "TYT Tarih"]);
    const perfect = lostNetTable({ items, answers: [0, 0] } as never);
    expect(perfect.rows).toEqual([]);
    expect(perfect.total).toEqual({ wrong: 0, blank: 0, lost: 0 });
  });
});

describe("055 işaretli sorular arasında dolaşma", () => {
  it("goes to the next flagged question in order and wraps around", () => {
    const flagged = [9, 2, 5];
    expect(nextFlagged(flagged, 0, 12)).toBe(2);
    expect(nextFlagged(flagged, 2, 12)).toBe(5);
    expect(nextFlagged(flagged, 6, 12)).toBe(9);
    expect(nextFlagged(flagged, 9, 12)).toBe(2);
    expect(nextFlagged(flagged, 11, 12)).toBe(2);
  });
  it("returns null with no flags or when the only flag is already open", () => {
    expect(nextFlagged([], 3, 12)).toBeNull();
    expect(nextFlagged([4], 4, 12)).toBeNull();
    expect(nextFlagged([4], 1, 12)).toBe(4);
    expect(nextFlagged([20], 1, 12)).toBeNull();
  });
});

describe("055 hız göstergesi", () => {
  const start = 1_000_000;
  const exam = { total: 40, startedAt: start, deadline: start + 40 * 60_000 };
  it("is silent during the first minute", () => {
    expect(examPace({ ...exam, answered: 1 }, start + 30_000)).toBeNull();
  });
  it("projects answered questions at the deadline and the gap to the target pace", () => {
    // 10 dakikada 5 soru: hedef 10 soru, bu hızla 20 soru.
    expect(examPace({ ...exam, answered: 5 }, start + 10 * 60_000)).toEqual({
      elapsedMs: 600_000,
      projected: 20,
      expected: 10,
      delta: -5,
    });
    // 10 dakikada 14 soru: 4 soru ileride; tahmin toplamla sınırlı (56 > 40 → 40).
    const fast = examPace({ ...exam, answered: 14 }, start + 10 * 60_000)!;
    expect(fast.delta).toBe(4);
    expect(fast.projected).toBe(40);
  });
  it("shows the 30-minute checkpoint only for exams longer than 30 minutes", () => {
    expect(paceCheckpointDue(exam, start + 29 * 60_000)).toBe(false);
    expect(paceCheckpointDue(exam, start + 30 * 60_000)).toBe(true);
    expect(paceCheckpointDue(exam, exam.deadline)).toBe(false);
    const short = { startedAt: start, deadline: start + 30 * 60_000 };
    expect(paceCheckpointDue(short, start + 30 * 60_000)).toBe(false);
  });
});

describe("055 deneme bitişi sesi", () => {
  it("defines a synthesised victory chord", () => {
    const notes = cueNotes({ kind: "examFinish" });
    expect(notes.length).toBeGreaterThanOrEqual(4);
    expect(notes.every((n) => n.midi > 0 && n.length > 0)).toBe(true);
  });
  it("stays silent when sound is off and plays once per exam", () => {
    expect(playExamFinishCue("exam-off", { sound: false, soundVolume: 60 })).toBe(false);
    expect(playExamFinishCue("exam-on", { sound: true, soundVolume: 60 })).toBe(true);
    expect(playExamFinishCue("exam-on", { sound: true, soundVolume: 60 })).toBe(false);
  });
});
