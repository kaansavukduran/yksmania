import { expect, test } from "vitest";
import { animalPitchAt, pitchWindowMs } from "../src/learning/mebiPitchSamples";

test("the measured time window and cycle counts determine frequency independently of amplitude", () => {
  const unequal = animalPitchAt(false);
  const equal = animalPitchAt(true);
  expect(unequal.map(({ cycles, frequencyHz }) => ({ cycles, frequencyHz }))).toEqual([
    { cycles: 1, frequencyHz: 100 }, { cycles: 3, frequencyHz: 300 },
  ]);
  expect(equal.map(({ frequencyHz }) => frequencyHz)).toEqual(unequal.map(({ frequencyHz }) => frequencyHz));
  expect(equal[0].amplitude).toBe(equal[1].amplitude);
  expect(unequal[0].amplitude).toBeGreaterThan(unequal[1].amplitude);
  for (const signal of equal) {
    expect(signal.valueAt(pitchWindowMs / signal.cycles / 4)).toBeCloseTo(signal.amplitude, 10);
    expect(signal.valueAt(pitchWindowMs)).toBeCloseTo(0, 10);
  }
});
