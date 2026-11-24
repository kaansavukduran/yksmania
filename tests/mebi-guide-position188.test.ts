import { describe, expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import before from "./fixtures/guide-positions-0.144.0.json";

// Section and example names were exported by studyGuide from a81664159ea2802c12abf481a21ff20ec9cc5ff2.
describe("keep reading positions when adding MEBİ figures", () => {
  test.each(Object.entries(before))("preserves every previously stored position for %s", (id, old) => {
    const current = studyGuide(id)!;
    const oldCount = old.sections.length;
    const newCount = current.sections.length;
    expect(newCount).toBeGreaterThan(oldCount);
    expect(current.sections.slice(0, oldCount).map(({ title }) => title)).toEqual(old.sections);
    expect(current.examples.slice(0, old.examples.length).map(({ title }) => title)).toEqual(old.examples);

    for (const storedCount of [0, oldCount]) {
      for (const [step, title] of old.sections.entries()) {
        const mapped = resolveGuideStep(id, step, storedCount, newCount);
        expect(current.sections[mapped].title).toBe(title);
      }
      expect(resolveGuideStep(id, oldCount, storedCount, newCount)).toBe(newCount);
      expect(resolveGuideStep(id, oldCount + 1, storedCount, newCount)).toBe(newCount + 1);
    }
  });
});
