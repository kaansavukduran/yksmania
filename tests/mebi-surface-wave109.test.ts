import { expect, test } from "vitest";
import { surfaceAmplitudeM, surfaceCrestX, surfaceMarkerM, surfaceWavelengthM, surfaceWavePosition } from "../src/learning/mebiSurfaceWave";

test.each([[0, 3, 0.4, 3], [0.25, 3.4, 0, 4.5], [0.5, 3, -0.4, 6], [0.75, 2.6, 0, 7.5], [1, 3, 0.4, 9]])("keeps the floating marker on its orbit at %s T", (time, x, y, crest) => {
  const position = surfaceWavePosition(surfaceMarkerM, time);
  expect(position.x).toBeCloseTo(x, 10);
  expect(position.y).toBeCloseTo(y, 10);
  expect(surfaceCrestX(time)).toBeCloseTo(crest, 10);
  expect(surfaceWavePosition(crest, time).y).toBeCloseTo(surfaceAmplitudeM, 10);
  expect(Math.hypot(position.x - surfaceMarkerM, position.y)).toBeCloseTo(surfaceAmplitudeM, 9);
});

test("crest advances one wavelength and the initially cresting surface point first moves forward", () => {
  expect(surfaceCrestX(1) - surfaceCrestX(0)).toBe(surfaceWavelengthM);
  expect(surfaceWavePosition(surfaceMarkerM, 0.125).x).toBeGreaterThan(surfaceMarkerM);
  expect(surfaceWavePosition(surfaceMarkerM, 0.875).x).toBeLessThan(surfaceMarkerM);
});
