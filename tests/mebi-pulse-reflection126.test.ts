import { expect, test } from "vitest";
import {
  reflectingPulseAt,
  reflectionEndM,
  reflectionFrameTimes,
} from "../src/learning/mebiPulseReflection";

test("the fixed endpoint stays at zero while the free endpoint has zero slope", () => {
  const dx = 0.00001;
  for (let sample = 0; sample <= 32; sample++) {
    const time = reflectionFrameTimes[2] * sample / 32;
    const fixed = reflectingPulseAt(time, "fixed");
    const free = reflectingPulseAt(time, "free");
    expect(fixed.endpoint).toBe(0);
    expect((free.height(reflectionEndM + dx) - free.height(reflectionEndM - dx)) / (2 * dx)).toBeCloseTo(0, 8);
  }
});

test("at contact the free end doubles the displacement, then both pulses leave with their original width and speed", () => {
  const freeContact = reflectingPulseAt(reflectionFrameTimes[1], "free");
  expect(freeContact.endpoint).toBe(2.5);
  const fixedAfter = reflectingPulseAt(reflectionFrameTimes[2], "fixed");
  const freeAfter = reflectingPulseAt(reflectionFrameTimes[2], "free");
  expect(fixedAfter.reflectedCenterM).toBe(4.5);
  for (const state of [fixedAfter, freeAfter]) {
    expect([state.amplitudeM, state.widthM, state.speedMps]).toEqual([1.25, 3, 2]);
    expect(state.height(3)).toBe(0);
    expect(state.height(6)).toBe(0);
  }
  expect(fixedAfter.height(4.5)).toBe(-1.25);
  expect(freeAfter.height(4.5)).toBe(1.25);
});
