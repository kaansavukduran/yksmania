import { expect, test } from "vitest";
import { sourceDistanceCm, virtualWaterAt } from "../src/learning/mebiVirtualWater";

test("the real and virtual centers keep one wavelength and reflected fronts stay on the water side", () => {
  const distances = sourceDistanceCm;
  for (let d = distances.min; d <= distances.max; d += distances.step) {
    const state = virtualWaterAt(d);
    expect(state.real[0]).toBe(-state.virtual[0]);
    for (const [fronts, center] of [[state.incoming, state.real], [state.outgoing, state.virtual]] as const) {
      const radii = fronts.map((front) => Math.hypot(front[20][0] - center[0], front[20][1]));
      expect(radii[1] - radii[0]).toBeCloseTo(state.wavelength, 12);
      expect(radii[2] - radii[1]).toBeCloseTo(state.wavelength, 12);
      expect(fronts.flat().every(([x]) => x <= 1e-10)).toBe(true);
    }
    for (const { hit, reflected } of state.rays) {
      const fromVirtual = [hit[0] - state.virtual[0], hit[1]];
      expect(fromVirtual[0] * reflected[1] - fromVirtual[1] * reflected[0]).toBeCloseTo(0, 12);
    }
  }
});
