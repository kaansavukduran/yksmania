import { expect, test } from "vitest";
import { bottlePitchAt } from "../src/learning/mebiBottlePitch";

test("adding water shifts the struck and blown modes in opposite directions", () => {
  expect(bottlePitchAt(0, "Şişeye vur").frequencyRatio).toBe(1);
  expect(bottlePitchAt(0, "Şişeye üfle").frequencyRatio).toBe(1);
  expect(bottlePitchAt(50, "Şişeye vur").frequencyRatio).toBeCloseTo(1 / Math.sqrt(1.5), 12);
  expect(bottlePitchAt(50, "Şişeye üfle").frequencyRatio).toBeCloseTo(Math.sqrt(2), 12);
  expect(bottlePitchAt(70, "Şişeye vur").frequencyRatio).toBeLessThan(bottlePitchAt(30, "Şişeye vur").frequencyRatio);
  expect(bottlePitchAt(70, "Şişeye üfle").frequencyRatio).toBeGreaterThan(bottlePitchAt(30, "Şişeye üfle").frequencyRatio);
  expect(bottlePitchAt(50, "Şişeye üfle").airVolumeRatio).toBe(0.5);
});
