import { expect, test } from "vitest";
import { circularMaxRadiusCm, circularWaveAt } from "../src/learning/mebiCircularWave";

test("crest and trough marks travel outward with equally spaced circles", () => {
  for (const time of [0, 0.25, 0.5, 0.75, 1, 1.5]) {
    const state = circularWaveAt(time);
    const [first, trough, next] = state.markedRadii;
    expect(state.crests).toContain(first);
    expect(state.crests).toContain(next);
    expect(state.troughs).toContain(trough);
    expect(next - first).toBe(2);
    expect(trough - first).toBe(1);
    expect([...state.crests, ...state.troughs].every((r) => r > 0 && r <= circularMaxRadiusCm)).toBe(true);
    expect(state.radialDirections).toHaveLength(8);
    for (const [dx, dy] of state.radialDirections) {
      expect(dx ** 2 + dy ** 2).toBeCloseTo(1, 12);
      expect(dx * -dy + dy * dx).toBe(0);
    }
  }
  expect(circularWaveAt(1.5).markedRadii[0] - circularWaveAt(0).markedRadii[0]).toBe(3);
});
