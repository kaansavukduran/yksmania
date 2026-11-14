import legacyAnswers from "./fixtures/legacy-question-answers.json";
import { electronShells } from "../src/learning/ElectronShellExplorer";
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
  it("gives each visual lesson a self-contained Turkish question bank and preserves all115 legacy identities/answers with valid answers", () => {
    const questionLessons = lessons.filter(
      (lesson) => lesson.questions.length > 0,
    );
    expect(questionLessons.length).toBeGreaterThan(23);
    const ids = new Set<string>();
    for (const l of questionLessons) {
      expect(l.questions.length).toBeGreaterThanOrEqual(5);
      expect(l.body.length).toBeGreaterThan(0);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(q.explanation.tr.length).toBeGreaterThan(8);
        expect(Object.keys(q.explanation)).toEqual(["tr"]);
      }
    }
    const all = questionLessons.flatMap((l) => l.questions);
    for (const [id, answer] of Object.entries(legacyAnswers))
      expect(all.find((q) => q.id === id)?.answer).toBe(answer);
    expect(Object.keys(legacyAnswers)).toHaveLength(115);
    expect(ids.size).toBeGreaterThan(115);
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

it("conserves all first-20 electron counts and distinguishes calcium ion from its neutral period", () => {
  expect(electronShells(0)).toEqual([]);
  for (const e of elements.slice(0, 20))
    expect(electronShells(e.z)).toEqual(e.shells);
  expect(electronShells(20 - 2)).toEqual([2, 8, 8]);
  expect(electronShells(8 - -2)).toEqual([2, 8]);
  for (const n of [-1, 21, 1.5, NaN, Infinity])
    expect(() => electronShells(n)).toThrow();
});
