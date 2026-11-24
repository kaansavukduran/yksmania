import { expect, test } from "vitest";
import { waterReflectionAt } from "../src/learning/mebiWaterReflection";

test("wavefronts remain perpendicular to their travel directions and keep the crest spacing", () => {
  for (let i = 0; i <= 75; i += 5) {
    const state = waterReflectionAt(i);
    expect(Math.acos(-state.incident[1]) * 180 / Math.PI).toBeCloseTo(i, 10);
    expect(Math.acos(state.reflected[1]) * 180 / Math.PI).toBeCloseTo(i, 10);
    for (const [fronts, ray] of [[state.incomingCrests, state.incident], [state.outgoingCrests, state.reflected]] as const) {
      const length = Math.hypot(fronts[0].center[0] - fronts[1].center[0], fronts[0].center[1] - fronts[1].center[1]);
      expect(length).toBeCloseTo(2, 12);
      for (const front of fronts) {
        expect(front.from[1]).toBeGreaterThanOrEqual(0);
        expect(front.to[1]).toBeGreaterThanOrEqual(0);
        const dx = front.to[0] - front.from[0];
        const dy = front.to[1] - front.from[1];
        expect(dx * ray[0] + dy * ray[1]).toBeCloseTo(0, 12);
      }
    }
  }
  const perpendicular = waterReflectionAt(0);
  expect(perpendicular.incident).toEqual([0, -1]);
  expect(perpendicular.reflected).toEqual([0, 1]);
});
