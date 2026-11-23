import { expect, it } from "vitest";
import { bicycleEnergyPoints, bicycleEnergySection, kineticUnits } from "../src/learning/bicycleEnergy058";

it("keeps the source speeds and compares mechanical energy only at the stated equal heights", () => {
  const [start, uphill, summit, downhill, finish] = bicycleEnergyPoints;
  expect([start.displayHeight, finish.displayHeight]).toEqual([0, 0]);
  expect(summit.displayHeight).toBeGreaterThan(Math.max(uphill.displayHeight, downhill.displayHeight));
  expect([start.speed, uphill.speed, summit.speed, downhill.speed, finish.speed]).toEqual([4, 3, 1, 2, 3]);
  expect(kineticUnits(finish.speed) - kineticUnits(start.speed)).toBe(-7);
  expect(bicycleEnergySection.table?.rows).toEqual([
    ["A", "4v", "16 E₀", "Yer düzeyi"], ["B", "3v", "9 E₀", "Yer düzeyinin üstü"],
    ["C", "v", "1 E₀", "Tepe"], ["D", "2v", "4 E₀", "Yer düzeyinin üstü"],
    ["E", "3v", "9 E₀", "Yer düzeyi"],
  ]);
});
