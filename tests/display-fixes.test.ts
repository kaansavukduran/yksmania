import { describe, expect, it } from "vitest";
import { displayFix } from "../src/learning/displayFixes";
import { typeset } from "../src/domain/typeset";
import { lessons } from "../src/domain/content";
import { localizedQuestionView } from "../src/domain/questionPresentation";

const files = import.meta.glob<{ from: string; to: string }[]>("../src/learning/displayFixes/*.json", { eager: true, import: "default" });
const rows = Object.values(files).flat();
const text = (v: unknown) => (typeof v === "string" ? v : ((v as { tr?: string } | undefined)?.tr ?? ""));

describe("gösterim onarımları", () => {
  it("every repair still matches a current card string, so none is dead", () => {
    const strings = new Set<string>();
    for (const lesson of lessons)
      for (const raw of lesson.questions) {
        const q = localizedQuestionView(raw) as never as Record<string, unknown> & { options: unknown[] };
        for (const v of [q.prompt, q.passage, q.explanation, q.hint, ...q.options]) if (v) strings.add(text(v));
      }
    expect(rows.filter((r) => !strings.has(r.from)).map((r) => r.from.slice(0, 60))).toEqual([]);
  });
  it("a repair never changes digits unless it only removes a leaked note, and never adds an em dash or ASCII ellipsis", () => {
    for (const r of rows) {
      expect(r.to.trim().length, r.from).toBeGreaterThan(0);
      expect(/—|\.\.\./.test(r.to), r.to).toBe(false);
      const digits = (s: string) => s.replace(/\D/g, "");
      // Digits may only disappear (a removed source note), never appear or reorder.
      const a = digits(r.from);
      const b = digits(r.to);
      let i = 0;
      for (const ch of a) if (i < b.length && b[i] === ch) i++;
      expect(i, `${r.from} → ${r.to}`).toBe(b.length);
    }
  });
  it("typeset applies the repair for an exact card string and leaves other text alone", () => {
    expect(displayFix("Bu metin hiçbir kartta yok.")).toBe("Bu metin hiçbir kartta yok.");
    for (const r of rows.slice(0, 50)) expect(typeset(r.from)).toBe(typeset(r.to));
  });
});
