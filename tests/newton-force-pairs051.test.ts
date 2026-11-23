import { expect, it } from "vitest";
import { boxForces } from "../src/learning/newtonForcePairs";

it.each([0, 6, 12])("keeps the force pair and vertical balance at %i N of upward pull", (pull) => {
  const force = boxForces(pull);
  const normal = 20 - pull;
  expect(force.verticalBalance).toBe(0);
  expect(force.contacts).toEqual([
    { from: "Masa", to: "Kutu", newtons: normal },
    { from: "Kutu", to: "Masa", newtons: -normal },
  ]);
  expect(force.gravity).toEqual([
    { from: "Dünya", to: "Kutu", newtons: -20 },
    { from: "Kutu", to: "Dünya", newtons: 20 },
  ]);
});
