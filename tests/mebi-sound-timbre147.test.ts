import { expect, test } from "vitest";
import { timbreAt, timbreCases, timbreFrequencyHz, timbreSection } from "../src/learning/mebiSoundTimbre";

test("different harmonic mixtures have the same period and the labelled source magnitudes", () => {
  const [violin, piano] = timbreCases;
  expect(timbreFrequencyHz).toBe(300);
  expect(timbreAt(0.137, violin.harmonics)).not.toBeCloseTo(timbreAt(0.137, piano.harmonics), 4);
  for (const sample of timbreCases) {
    expect(sample.harmonics[0]).toBe(1);
    expect(timbreAt(1.137, sample.harmonics)).toBeCloseTo(timbreAt(0.137, sample.harmonics), 12);
  }
  expect(timbreSection.table?.rows).toEqual([["300","1","1"],["600","0,55","0,19"],["900","0,22","0,37"]]);
});
