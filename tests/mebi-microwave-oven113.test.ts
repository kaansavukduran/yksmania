import { expect, test } from "vitest";
import { microwaveOvenEnergyPath, microwaveOvenFrequencyMHz, microwaveOvenWavelengthCm, microwaveOvenWavelengthLabel } from "../src/learning/mebiMicrowaveOven";

test("uses 2.45 GHz and returns the vacuum wavelength in centimeters", () => {
  expect(microwaveOvenFrequencyMHz * 1e6).toBe(2.45e9);
  expect(microwaveOvenWavelengthCm()).toBeCloseTo(12.24489796, 7);
  expect(microwaveOvenWavelengthLabel).toBe("12,2 cm");
});

test("the two path segments make equal angles with the wall normal", () => {
  const { entry, reflection, food } = microwaveOvenEnergyPath;
  expect(entry.y).toBeLessThan(reflection.y);
  expect(food.y).toBeLessThan(reflection.y);
  expect(entry.x).toBeGreaterThan(reflection.x);
  expect(food.x).toBeLessThan(reflection.x);
  const incidence = (entry.x - reflection.x) / (reflection.y - entry.y);
  const reflected = (reflection.x - food.x) / (reflection.y - food.y);
  expect(incidence).toBeCloseTo(reflected, 12);
});
