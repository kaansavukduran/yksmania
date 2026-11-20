import { describe, expect, it } from "vitest";
import { lessons, subjects } from "../src/domain/content";
import curriculum from "../src/data/curriculum.json";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { resolvedGuidance } from "../src/learning/questionHelp";

/*
 * Content gate (Faz 0): every card is answerable on its own, explains its key,
 * and the number of cards without per-option distractor reasons may only fall.
 */
const text = (v: unknown) => (typeof v === "string" ? v : ((v as { tr?: string } | undefined)?.tr ?? ""));
const cards = lessons.flatMap((lesson) =>
  lesson.questions.map((raw) => {
    const q = localizedQuestionView(raw) as never as {
      id: string; prompt: unknown; passage?: unknown; options: unknown[]; answer: number; explanation: unknown; hint?: unknown; guidance?: unknown;
    };
    return {
      lesson,
      raw,
      id: q.id,
      prompt: text(q.prompt),
      passage: q.passage ? text(q.passage) : undefined,
      options: q.options.map(text),
      answer: q.answer,
      explanation: text(q.explanation),
      hint: text(q.hint) || undefined,
      guidance: q.guidance,
    };
  }),
);

// Wording that only makes sense next to another card or a missing text.
const DEPENDENT = /\b(önceki soru(da|ya|nun)?|bir önceki soru|yukarıdaki (parça|metin|tablo|grafik|şekil|paragraf)|aşağıdaki (parça|metin|paragraf)(?:da|ya)? göre)/i;
// Ratchet: legacy cards still waiting for per-option reasons. Lower it as
// cards are upgraded; it must never rise.
const MAX_WITHOUT_REASONS = 2640;

describe("053 içerik denetimi", () => {
  it("every card has a valid key, distinct options and an explanation", () => {
    const bad = cards.filter(
      (c) =>
        c.options.length < 2 ||
        !Number.isInteger(c.answer) ||
        c.answer < 0 ||
        c.answer >= c.options.length ||
        !c.explanation.trim() ||
        new Set(c.options.map((o) => o.trim())).size !== c.options.length,
    );
    expect(bad.map((c) => c.id)).toEqual([]);
  });
  it("no card depends on another card or on a text it does not carry", () => {
    const bad = cards.filter((c) => DEPENDENT.test(c.prompt) && !c.passage && !(c.raw as { figure?: unknown }).figure);
    expect(bad.map((c) => `${c.id}: ${c.prompt.slice(0, 80)}`)).toEqual([]);
  });
  it("cards without distractor reasons never increase", () => {
    const missing = cards.filter((c) => !resolvedGuidance(c as never)).length;
    expect(missing).toBeLessThanOrEqual(MAX_WITHOUT_REASONS);
  });
  it("the curriculum has no orphan subject and no duplicate heading id", () => {
    const rows = curriculum as { id: string; subjectId: string }[];
    expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
    const known = new Set(subjects.map((s) => s.id));
    expect(rows.filter((r) => !known.has(r.subjectId)).map((r) => r.id)).toEqual([]);
    for (const s of subjects) if (rows.some((r) => r.subjectId === s.id)) expect(lessons.some((l) => l.subjectId === s.id), s.id).toBe(true);
  });
});
