import { expect, test } from "vitest";
import { interfaceDepth, joinCm, tankLengthCm, waterDepthAt, waterDepthTimes } from "../src/learning/mebiWaterDepth";

test("crests and troughs of the side profile match the stripes on both sides of the boundary", () => {
  for (let t = waterDepthTimes.min; t <= waterDepthTimes.max; t += waterDepthTimes.step) {
    for (const state of [
      interfaceDepth(t, "sığdan derine"),
      interfaceDepth(t, "derinden sığa"),
      waterDepthAt(t, "shallow", "shallow"),
      waterDepthAt(t, "deep", "deep"),
    ]) {
      const { crests, troughs, height, firstWavelength, secondWavelength } = state;
      expect(height(joinCm - 1e-8)).toBeCloseTo(height(joinCm + 1e-8), 6);
      for (const x of crests) expect(height(x)).toBeCloseTo(1, 12);
      for (const x of troughs) expect(height(x)).toBeCloseTo(-1, 12);
      expect([...crests, ...troughs].every(x => x >= 0 && x <= tankLengthCm)).toBe(true);
      for (const [points, expected] of [[crests.filter(x => x <= joinCm), firstWavelength], [crests.filter(x => x >= joinCm), secondWavelength]] as const) {
        expect(points.length).toBeGreaterThan(2);
        for (const [i,x] of points.slice(1).entries()) expect(x - points[i]).toBeCloseTo(expected, 10);
      }
      expect(state.period).toBe(0.25);
    }
  }
});
