import { expect, test } from "vitest";
import { waterRefractionAt } from "../src/learning/mebiWaterRefraction";

test("the same crest meets a planar boundary without tearing and rotates only at oblique incidence", () => {
  const angle = 30;
  const states = [0, 1, 2].map((stage) => waterRefractionAt(angle, stage));
  const [before, cross, after] = states;
  expect(before.incoming.every(([x]) => x < 0)).toBe(true);
  expect(before.transmitted).toHaveLength(0);
  expect(after.transmitted.every(([x]) => x > 0)).toBe(true);
  expect(after.incoming).toHaveLength(0);
  expect(cross.incoming[1]).toBe(cross.transmitted[0]);
  expect(cross.O).toEqual([0, 0]);
  expect(cross.refractedDegrees).toBeGreaterThan(angle);
  expect(Math.sin(cross.refractedDegrees * Math.PI / 180)).toBeCloseTo(1.5 * Math.sin(angle * Math.PI / 180), 12);
  for (const state of states) {
    for (const [line, direction] of [[state.incoming, state.incidentDirection], [state.transmitted, state.transmittedDirection]] as const) {
      if (!line.length) continue;
      const [[x1, y1], [x2, y2]] = line;
      expect((x2 - x1) * direction[0] + (y2 - y1) * direction[1]).toBeCloseTo(0, 10);
    }
  }
  const headOn = waterRefractionAt(0, 1);
  expect(headOn.K[0]).toBe(0);
  expect(headOn.L[0]).toBe(0);
  expect(headOn.refractedDegrees).toBe(0);
  expect(headOn.transmittedDirection).toEqual(headOn.incidentDirection);
  expect(headOn.shallowWavelength).toBe(2);
  expect(headOn.deepWavelength).toBe(3);
  expect(headOn.frequencyHz).toBe(4);
});
