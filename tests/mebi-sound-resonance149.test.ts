import { expect, test } from "vitest";
import { forkDampingHz, forkDriveHz, forkRangeHz, forkRelativeResponse, resonanceSection } from "../src/learning/mebiSoundResonance";

test("the fixed drive has a finite peak and lower response on both sides", () => {
  expect(forkDriveHz).toBe(440);
  expect(forkRelativeResponse(forkDriveHz)).toBe(1);
  expect(forkRelativeResponse(360)).toBeLessThan(forkRelativeResponse(400));
  expect(forkRelativeResponse(520)).toBeLessThan(forkRelativeResponse(480));
  const angular = (hz: number) => 2 * Math.PI * hz;
  const drive = angular(forkDriveHz);
  const damping = angular(forkDampingHz);
  const atResonance = 1 / (2 * damping * drive);
  for (let f = forkRangeHz.min; f <= forkRangeHz.max; f += forkRangeHz.step) {
    const expected = 1 / Math.sqrt((angular(f) ** 2 - drive ** 2) ** 2 + (2 * damping * drive) ** 2);
    const relative = forkRelativeResponse(f);
    expect(relative).toBeGreaterThan(0);
    expect(relative).toBeLessThanOrEqual(1);
    expect(relative).toBeCloseTo(expected / atResonance, 12);
  }
  expect(resonanceSection.table?.rows).toEqual([["440", "400", "0,46"], ["440", "440", "1,00"], ["440", "480", "0,43"]]);
});
