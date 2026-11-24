import { expect, test } from "vitest";
import { tankLengthCm } from "../src/learning/mebiWaterDepth";
import { waterSlopeAt, waterSlopePhase } from "../src/learning/mebiWaterSlope";

test("gradual depth changes local speed and wavelength while crest travel time remains periodic", () => {
  const state = waterSlopeAt(4, waterSlopePhase[0]);
  expect(state.depthRatioAt(tankLengthCm)).toBeCloseTo(4, 10);
  expect(state.depthRatioAt(tankLengthCm / 2)).toBeCloseTo(2.5, 10);
  expect(state.speedAt(tankLengthCm / 2)).toBeCloseTo(6 * Math.sqrt(2.5), 10);
  expect(state.speedAt(tankLengthCm)).toBeCloseTo(12, 10);
  expect(state.entryLocalWavelength).toBe(1.5);
  expect(state.exitLocalWavelength).toBeCloseTo(3, 10);
  const gap = (n: number) => state.crests[n + 1] - state.crests[n];
  expect(gap(state.crests.length - 2)).toBeGreaterThan(gap(0));
  for (let i = 0; i < state.crests.length - 1; i++) {
    expect(state.travelAt(state.crests[i + 1]) - state.travelAt(state.crests[i])).toBeCloseTo(state.periodS, 10);
    expect(state.heightAt(state.crests[i])).toBeCloseTo(1, 10);
  }
  for (const trough of state.troughs) expect(state.heightAt(trough)).toBeCloseTo(-1, 10);
});

test("flat bottom keeps crest gaps fixed and a half period exchanges the same locations", () => {
  const first = waterSlopeAt(1, waterSlopePhase[0]);
  const other = waterSlopeAt(1, waterSlopePhase[1]);
  expect(first.exitLocalWavelength).toBe(first.entryLocalWavelength);
  for (let i = 1; i < first.crests.length; i++) expect(first.crests[i] - first.crests[i - 1]).toBeCloseTo(1.5, 10);
  expect(other.troughs).toEqual(first.crests);
});
