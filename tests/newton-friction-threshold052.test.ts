import { expect, it } from "vitest";
import { frictionDuringIncrease } from "../src/learning/newtonFrictionThreshold";

it.each([
  [0, false, 0, 0],
  [24, false, 24, 0],
  [25, false, 25, 0],
  [26, true, 20, 1.2],
  [30, true, 20, 2],
  [40, true, 20, 4],
])("applies the correct friction regime at %i N", (force, startsSliding, friction, acceleration) => {
  expect(frictionDuringIncrease(force)).toEqual({ startsSliding, friction, acceleration });
});
