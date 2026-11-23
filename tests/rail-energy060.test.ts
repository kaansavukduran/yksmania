import { expect, it } from "vitest";
import { railEnergyAt } from "../src/learning/railEnergy060";

it("counts only the three documented stops and separates each lost interval", () => {
  const [start, turn, final] = railEnergyAt(1.5);
  expect([start.point, turn.point, final.point]).toEqual(["A", "D", "C"]);
  expect([start.level, turn.level, final.level]).toEqual([3, 1, 0]);
  expect([start.mechanical, turn.mechanical, final.mechanical]).toEqual([90, 30, 0]);
  expect([turn.dissipated, final.dissipated - turn.dissipated]).toEqual([60, 30]);
  for (const height of [0.5, 1.5, 2.5]) {
    const moments = railEnergyAt(height);
    for (const { mechanical, dissipated } of moments) {
      expect(mechanical + dissipated).toBe(moments[0].mechanical);
    }
  }
});
