import { describe, expect, it } from "vitest";
import { guidance053Rows } from "../src/learning/guidance053";
import { lessons } from "../src/domain/content";
import { clarifiedQuestionView, localizedQuestionView } from "../src/domain/questionPresentation";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { identityHash, questionGuidanceSchema, questionIdentity } from "../src/domain/questionHelpModel";

/*
 * Forge053+ step-by-step guides. Every row must attach to a card that exists
 * today with exactly the content it was written for, give one reason per
 * option, and mark only the keyed option as correct.
 */
const text = (v: unknown) => (typeof v === "string" ? v : ((v as { tr?: string } | undefined)?.tr ?? ""));
const cards = new Map(
  lessons.flatMap((lesson) =>
    lesson.questions.map((raw) => {
      const q = localizedQuestionView(raw) as never as Record<string, unknown> & { options: unknown[]; id: string; answer: number };
      const card = { id: q.id, prompt: text(q.prompt), passage: q.passage ? text(q.passage) : undefined, options: q.options.map(text), answer: q.answer, explanation: text(q.explanation), hint: text(q.hint) || undefined };
      return [card.id, card] as const;
    }),
  ),
);

describe("053 adım adım çözüm kataloğu", () => {
  it("has unique rows that all attach to their current card", () => {
    expect(new Set(guidance053Rows.map((r) => r.id)).size).toBe(guidance053Rows.length);
    for (const row of guidance053Rows) {
      const card = cards.get(row.id);
      expect(card, row.id).toBeDefined();
      expect(row.h, row.id).toBe(identityHash(questionIdentity(clarifiedQuestionView(card!))));
      expect(resolvedGuidance(card!), row.id).toEqual(row.guidance);
      expect(helpPanels(card!).length, row.id).toBeGreaterThanOrEqual(4);
    }
  });
  it("gives one specific reason per option and marks only the key as correct", () => {
    for (const row of guidance053Rows) {
      const card = cards.get(row.id)!;
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g.optionReasons, row.id).toHaveLength(card.options.length);
      g.optionReasons.forEach((reason, i) => expect(/^Doğru[:.]/.test(reason), `${row.id} şık ${i + 1}`).toBe(i === card.answer));
      expect(new Set(g.optionReasons).size, row.id).toBe(g.optionReasons.length);
    }
  });
  it("keeps the writing rules: no em dash, no ASCII ellipsis, no space before punctuation", () => {
    for (const row of guidance053Rows) {
      const all = [...row.guidance.knowledge, row.guidance.strategy, ...row.guidance.steps, ...row.guidance.optionReasons, row.guidance.commonError, row.guidance.check].join("\n");
      expect(/—|\.\.\.|\s[,;!?](\s|$)/.test(all), row.id).toBe(false);
    }
  });
  it("a changed card no longer borrows its guide", () => {
    const row = guidance053Rows[0];
    if (!row) return;
    const card = cards.get(row.id)!;
    expect(resolvedGuidance({ ...card, explanation: card.explanation + " (değişti)" })).toBeUndefined();
  });
});
