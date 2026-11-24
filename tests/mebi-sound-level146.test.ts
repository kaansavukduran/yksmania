import { expect, test } from "vitest";
import { intensityRatio, soundLevelCases, soundLevelSection } from "../src/learning/mebiSoundLevel";

test("the level chart preserves all steps and applies a logarithmic intensity ratio", () => {
  expect(soundLevelCases.map(([db]) => db)).toEqual(Array.from({ length: 15 }, (_, i) => 10 * i));
  expect(soundLevelSection.table?.rows).toHaveLength(15);
  expect(intensityRatio(50, 70)).toBe(100);
  expect(intensityRatio(70, 50)).toBe(0.01);
  expect(intensityRatio(50, 50)).toBe(1);
  expect(intensityRatio(0, 140)).toBe(1e14);
});
