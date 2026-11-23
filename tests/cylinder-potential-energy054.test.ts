import { expect, it } from "vitest";
import { cylinderPotentialAt } from "../src/learning/cylinderPotentialEnergy";

it("uses the cylinder's centre of mass and keeps the same energy change when the zero shifts", () => {
  expect(cylinderPotentialAt(2, 0, 0)).toEqual({ centerAboveGround: 1, referenceHeight: 1, potential: 40 });
  expect(cylinderPotentialAt(2, 1, 0)).toEqual({ centerAboveGround: 2, referenceHeight: 2, potential: 80 });
  expect(cylinderPotentialAt(2, 0, 1)).toEqual({ centerAboveGround: 1, referenceHeight: 0, potential: 0 });
  expect(cylinderPotentialAt(0.5, 0, 1).potential).toBe(-30);
  expect(cylinderPotentialAt(0.5, 1, 1).potential - cylinderPotentialAt(0.5, 0, 1).potential).toBe(40);
});
