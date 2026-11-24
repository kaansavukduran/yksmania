import { expect, it } from "vitest";
import { atomizerState, atomizerThresholdKPa } from "../src/learning/mebiAtomizer";
import { intakeThresholdKPa, liquidIntakeState } from "../src/learning/mebiDoorSuction";

it("15 cm’lik sprey tüpünü 30 cm’lik önceki musluktan ayırır", () => {
  expect(atomizerThresholdKPa).toBe(1.5);
  expect(atomizerState(1)).toEqual({ riseM: 0.1, reachedInlet: false, canEnter: false });
  expect(atomizerState(1.5)).toEqual({ riseM: 0.15, reachedInlet: true, canEnter: false });
  expect(atomizerState(2)).toEqual({ riseM: 0.2, reachedInlet: true, canEnter: true });
  expect(intakeThresholdKPa).toBe(3);
  expect(liquidIntakeState(2, true)).toEqual({ riseM: 0.2, reachedInlet: false, canEnter: false });
});
