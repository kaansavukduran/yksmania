import { describe, it, expect } from "vitest";
import { lessons } from "../src/domain/content";
import elements from "../src/data/elements.json";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
describe("learning content and backward-compatible exploration state", () => {
  it("keeps element identities unique and preserves the important first-20 exceptions", () => {
    expect(elements).toHaveLength(118);
    expect(elements.map((e) => e.z)).toEqual(
      Array.from({ length: 118 }, (_, i) => i + 1),
    );
    expect(new Set(elements.map((e) => e.symbol)).size).toBe(118);
    expect(elements[1].group).toBe(18);
    expect(elements[18].shells).toEqual([2, 8, 8, 1]);
    expect(elements[19].shells).toEqual([2, 8, 8, 2]);
    for (const e of elements.slice(0, 20))
      expect(e.shells?.reduce((n, x) => n + x, 0)).toBe(e.z);
  });
  it("gives each visual lesson a real, bilingual five-item question set with valid answers", () => {
    expect(lessons).toHaveLength(9);
    const ids = new Set<string>();
    for (const l of lessons) {
      expect(l.questions).toHaveLength(5);
      expect(l.body.length).toBeGreaterThan(0);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(q.explanation.tr.length).toBeGreaterThan(8);
        expect(q.explanation.en.length).toBeGreaterThan(8);
      }
    }
    expect(ids.size).toBe(45);
  });
  it("opens the prior backup shape and keeps exploration separate from scored evidence", () => {
    const old: any = initialState();
    delete old.explorations;
    delete old.readingPages;
    const s = validateState(old);
    expect(s.explorations).toEqual({});
    expect(s.readingPages).toEqual({});
    s.explorations = {
      geometry: { base: 12, height: 8, step: 3 },
      cell: { plant: true, selected: "chloroplast" },
    };
    const restored = validateState(s);
    expect(restored.sessions).toEqual([]);
    expect(restored.reviews).toEqual([]);
    expect(restored.explorations.geometry.base).toBe(12);
  });
});
