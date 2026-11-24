import { expect, test } from "vitest";
import { springDensityAt, springDensitySection } from "../src/learning/mebiSpringDensity";

test("at 4 N the denser spring runs at half the speed even with the same length", () => {
  const { reference, comparison, tensionN, spanM, observationS } = springDensityAt(400);
  expect([tensionN, spanM, observationS]).toEqual([4, 10, 0.25]);
  expect(reference).toEqual({ linearDensity: 0.01, speedMps: 20, travelledM: 5, widthM: 1.6 });
  expect(comparison).toEqual({ linearDensity: 0.04, speedMps: 10, travelledM: 2.5, widthM: 0.8 });
  expect(comparison.travelledM - comparison.widthM).toBeGreaterThan(0);
  expect(reference.travelledM).toBeLessThan(spanM);
});

test("equal masses give matching measurements and intermediate masses produce intermediate speeds", () => {
  const equal = springDensityAt(100);
  expect(equal.comparison).toEqual(equal.reference);
  expect(springDensityAt(200).comparison.speedMps).toBeCloseTo(10 * Math.sqrt(2), 12);
  expect(springDensitySection.table?.rows).toEqual([
    ["100 g", "0,01 kg/m", "20 m/s", "5 m"],
    ["400 g", "0,04 kg/m", "10 m/s", "2,5 m"],
  ]);
});
