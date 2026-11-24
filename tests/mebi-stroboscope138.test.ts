import { expect, test } from "vitest";
import { strobeSnapshot } from "../src/learning/mebiStroboscope";

test("different disks can show the same sampling interval and can hide one or more periods", () => {
  expect(strobeSnapshot(8, 2)).toMatchObject({ viewsPerSecond: 16, viewingIntervalS: 1 / 16, rawAdvanceCycles: 1, relativePhase: 0 });
  expect(strobeSnapshot(4, 4)).toMatchObject({ viewsPerSecond: 16, viewingIntervalS: 1 / 16, rawAdvanceCycles: 1, relativePhase: 0 });
  expect(strobeSnapshot(8, 1)).toMatchObject({ rawAdvanceCycles: 2, relativePhase: 0 });
  expect(strobeSnapshot(8, 4)).toMatchObject({ rawAdvanceCycles: 0.5, relativePhase: 0.5 });
  for (const slots of [4, 8]) {
    const { shutters } = strobeSnapshot(slots, 2);
    expect(shutters).toHaveLength(slots);
    for (const [dx, dy] of shutters) expect(Math.hypot(dx, dy)).toBeCloseTo(1, 12);
    for (let index = 0; index < slots; index++) {
      const next = (index + 1) % slots;
      expect(shutters[index][0] * shutters[next][0] + shutters[index][1] * shutters[next][1]).toBeCloseTo(Math.cos(2 * Math.PI / slots), 12);
    }
  }
});
