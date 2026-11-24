import { expect, test } from "vitest";
import { radioWavefrontPoints, radioWavefrontRadii, radioWavelengthMeters } from "../src/learning/mebiRadioWaves";

test.each([[50, 6, 2], [75, 4, 3], [100, 3, 4], [125, 2.4, 5], [150, 2, 6]])("uses an exact wavelength and matching front intervals at %s MHz", (frequency, meters, fronts) => {
  const radii = radioWavefrontRadii(frequency);
  expect(radioWavelengthMeters(frequency)).toBeCloseTo(meters, 10);
  expect(radii).toHaveLength(fronts);
  expect(radii[0]).toBeCloseTo(meters, 10);
  radii.slice(1).forEach((radius, index) => expect(radius - radii[index]).toBeCloseTo(meters, 10));
  expect(radii.at(-1)).toBeLessThanOrEqual(12);
});

test("wavefront arcs extend to both sides at the same radius", () => {
  const radius = 6;
  const right = radioWavefrontPoints(radius, 1);
  const left = radioWavefrontPoints(radius, -1);
  expect(right[14]).toEqual([6, 0]);
  expect(left[14]).toEqual([-6, 0]);
  expect(right[0][1]).toBeLessThan(-4.5);
  expect(right[28][1]).toBeGreaterThan(4.5);
  expect(right.every(([x, y], index) => x > 0 && left[index][0] === -x && left[index][1] === y)).toBe(true);
  for (const [x, y] of right) expect(Math.hypot(x, y)).toBeCloseTo(radius, 10);
});
