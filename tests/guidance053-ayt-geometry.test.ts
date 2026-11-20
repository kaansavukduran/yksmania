import { describe, expect, it } from "vitest";
import rows from "../src/learning/guidance053AytGeometry.json";
import { lessons } from "../src/domain/content";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";

const text = (v: unknown) => (typeof v === "string" ? v : ((v as { tr?: string } | undefined)?.tr ?? ""));
const cards = lessons
  .filter((l) => l.subjectId === "ayt-geometri")
  .flatMap((l) => l.questions)
  .map((raw) => {
    const q = localizedQuestionView(raw) as never as Record<string, unknown> & { options: unknown[]; id: string; answer: number };
    return { id: q.id, prompt: text(q.prompt), passage: q.passage ? text(q.passage) : undefined, options: q.options.map(text), answer: q.answer, explanation: text(q.explanation), hint: text(q.hint) || undefined };
  });

describe("053 AYT Geometri adım adım çözüm", () => {
  it("every AYT Geometri card now has knowledge, method, steps and a reason per option", () => {
    expect(cards).toHaveLength(40);
    for (const c of cards) {
      const g = resolvedGuidance(c);
      expect(g, c.id).toBeDefined();
      expect(g!.optionReasons).toHaveLength(c.options.length);
      expect(helpPanels(c).length, c.id).toBeGreaterThanOrEqual(5);
    }
  });
  it("rows are schema-valid and the correct option's reason says so", () => {
    for (const row of rows) {
      expect(() => questionGuidanceSchema.parse(row.guidance)).not.toThrow();
      const card = cards.find((c) => c.id === row.id)!;
      expect(row.guidance.optionReasons[card.answer], row.id).toMatch(/^Doğru[.:]/);
      row.guidance.optionReasons.forEach((r, i) => i !== card.answer && expect(r, `${row.id} ${i}`).not.toMatch(/^Doğru[.:]/));
    }
  });
  it("a changed card no longer borrows the guide", () => {
    const changed = { ...cards[0], prompt: cards[0].prompt + " (değişti)" };
    expect(resolvedGuidance(changed)).toBeUndefined();
  });
});
