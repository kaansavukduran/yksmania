import { expect, test } from "vitest";
import { xRayDetectorSection, xRaySignal } from "../src/learning/mebiXAndGamma";

test.each([[1, 70, 43], [2, 50, 18], [3, 35, 8]])("the remaining signal at thickness %s is shared with the table", (thickness, soft, bone) => {
  const signal = xRaySignal(thickness);
  expect(signal.soft).toBeGreaterThan(signal.bone);
  expect(Math.round(signal.soft)).toBe(soft);
  expect(Math.round(signal.bone)).toBe(bone);
  expect(xRayDetectorSection.table?.rows).toContainEqual([`${thickness} birim`, `%${soft}`, `%${bone}`]);
});

test("additional thickness reduces both detector signals", () => {
  const thin = xRaySignal(1);
  const thick = xRaySignal(3);
  expect(thick.soft).toBeLessThan(thin.soft);
  expect(thick.bone).toBeLessThan(thin.bone);
});
