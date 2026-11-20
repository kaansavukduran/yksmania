import { describe, expect, it } from "vitest";
import { initialState } from "../src/domain/model";
import { lessonById, lessons } from "../src/domain/content";
import { questionStars } from "../src/domain/exams";
import { hidesSubject, openMistakeIds, smartSessionSpec } from "../src/domain/smartSession";

const session = (lessonId: string, date: string, responses: { questionId: string; selected: number; correct: boolean; assisted: boolean; confidence: "medium" }[]) => ({
  id: `session:${date}:${lessonId}`,
  lessonId,
  date,
  finishedAt: `${date}T10:00:00.000Z`,
  responses,
  kind: "learn" as const,
  minutes: 8,
  note: "",
});

describe("051 akıllı oturum", () => {
  it("sizes sessions by time, hides the subject label and is stable for the same day", () => {
    const s = initialState();
    for (const m of [15, 30, 60] as const) {
      const spec = smartSessionSpec(s, m, "2026-11-20")!;
      expect(spec.items).toHaveLength({ 15: 8, 30: 16, 60: 32 }[m]);
      expect(spec.durationSeconds).toBe(m * 60);
      expect(hidesSubject(spec.title)).toBe(true);
      expect(new Set(spec.items.map((i) => i.subjectId)).size).toBeGreaterThan(1);
    }
    expect(smartSessionSpec(s, 15, "2026-11-20")).toEqual(smartSessionSpec(s, 15, "2026-11-20"));
  });
  it("puts open mistakes first and skips questions already solved without help", () => {
    const lesson = lessons.find((l) => l.questions.length >= 6 && l.subjectId === "tyt-kimya")!;
    const [a, b, c] = lesson.questions;
    const s = initialState();
    s.sessions.push(
      session(lesson.id, "2026-11-10", [
        { questionId: a.id, selected: (a.answer + 1) % 5, correct: false, assisted: false, confidence: "medium" },
        { questionId: b.id, selected: b.answer, correct: true, assisted: false, confidence: "medium" },
        { questionId: c.id, selected: (c.answer + 1) % 5, correct: false, assisted: false, confidence: "medium" },
      ]) as never,
    );
    expect(openMistakeIds(s).sort()).toEqual([a.id, c.id].sort());
    const spec = smartSessionSpec(s, 15, "2026-11-20")!;
    expect(spec.items.slice(0, 2).map((i) => i.id).sort()).toEqual([a.id, c.id].sort());
    expect(spec.items.map((i) => i.id)).not.toContain(b.id);
  });
  it("offers a 5-minute recovery round of easy questions without mistakes", () => {
    const spec = smartSessionSpec(initialState(), 5, "2026-11-20")!;
    expect(spec.items).toHaveLength(3);
    expect(spec.title).toBe("5 dk kurtarma · 3 kolay soru");
    expect(hidesSubject(spec.title)).toBe(false);
    for (const i of spec.items) expect(questionStars(i.id)!).toBeLessThanOrEqual(3);
    expect(spec.items.every((i) => lessonById(lessons.find((l) => l.questions.some((q) => q.id === i.id))!.id))).toBe(true);
  });
});
