import { expect, test } from "vitest";
import { waveTankAt, waveTankWidthCm } from "../src/learning/mebiWaveTank";

test("crest markers, trough markers and the side profile agree on all observed phases", () => {
  for (let time = 0; time <= 2; time += 0.125) {
    const state = waveTankAt(time);
    for (const x of state.crests) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(waveTankWidthCm);
      expect(state.heightAt(x)).toBeCloseTo(1, 12);
    }
    for (const x of state.troughs) expect(state.heightAt(x)).toBeCloseTo(-1, 12);
    expect(state.crests).toContain(state.shiftCm);
    expect(state.crests).toContain(state.shiftCm + 4);
    expect(state.troughs).toContain(state.shiftCm + 2);
  }
  expect(waveTankAt(2).shiftCm - waveTankAt(0).shiftCm).toBe(8);
});
