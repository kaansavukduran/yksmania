import { expect, test } from "vitest";
import { concaveWaterAt } from "../src/learning/mebiConcaveWater";

test("parallel fronts pass near the paraxial focus, while a centered source returns exactly", () => {
  const straight = concaveWaterAt(0);
  const intercepts = straight.rays.flatMap(({ reflectedXAtAxis: x }) => x === undefined ? [] : [x]);
  expect(intercepts).toHaveLength(10);
  expect(intercepts.every((x) => x >= 6 && x < 6.2)).toBe(true);
  const focused = concaveWaterAt(1);
  expect(focused.rays.every(({ reflected: [dx, dy] }) => dx < -0.99 && Math.abs(dy) < 0.02)).toBe(true);
  const centered = concaveWaterAt(2);
  for (const { toward, reflected } of centered.rays) {
    expect(reflected[0]).toBeCloseTo(-toward[0], 12);
    expect(reflected[1]).toBeCloseTo(-toward[1], 12);
  }
  expect(centered.fronts).toHaveLength(3);
});
