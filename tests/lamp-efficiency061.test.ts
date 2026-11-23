import { expect, it } from "vitest";
import { lampBudget } from "../src/learning/lampEfficiency061";

it("splits energy at the same boundary, including the ideal equality case", () => {
  expect(lampBudget(0.1)).toEqual({ input: 60, useful: 6, other: 54, efficiency: 0.1 });
  expect(lampBudget(0.25)).toEqual({ input: 24, useful: 6, other: 18, efficiency: 0.25 });
  expect(lampBudget(1)).toEqual({ input: 6, useful: 6, other: 0, efficiency: 1 });
  for (const efficiency of [0.15, 0.25, 0.5]) {
    const { input, useful, other } = lampBudget(efficiency);
    expect(useful + other).toBeCloseTo(input);
    expect(useful / input).toBeCloseTo(efficiency);
  }
});
