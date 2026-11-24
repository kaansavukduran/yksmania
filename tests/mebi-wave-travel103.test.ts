import { describe, expect, it } from "vitest";
import { waveTravelAt, waveTravelFrequencyHz, waveTravelPeriodS, waveTravelSpeedMps, waveTravelTitle, waveTravelWavelengthM } from "../src/learning/mebiWaveTravel";
import { physicsFiguresWaves } from "../src/learning/sectionFigures/physicsFiguresWaves";

describe("MEBİ physical page 150 propagation diagram", () => {
  it.each([
    [0, 0, 0], [0.25, 0.125, 0.5], [0.5, 0.25, 1], [0.75, 0.375, 1.5], [1, 0.5, 2],
  ])("moves the front consistently for %s periods", (periods, seconds, distance) => {
    expect(waveTravelAt(periods)).toEqual({ elapsedS: seconds, distanceM: distance });
    const frame = physicsFiguresWaves["dalgalara-giris"][waveTravelTitle].draw(periods, 0);
    const dimensions = frame.els.filter((item) => item.k === "dim");
    if (periods === 0) {
      expect(dimensions).toEqual([]);
    } else {
      expect(dimensions).toHaveLength(1);
      expect(dimensions[0]).toMatchObject({ a: [0, -0.96], b: [distance, -0.96], label: periods === 1 ? "λ" : "x" });
    }
  });

  it("keeps the full-period distance, frequency and speed consistent", () => {
    expect(waveTravelAt(1).distanceM).toBe(waveTravelWavelengthM);
    expect(waveTravelPeriodS * waveTravelFrequencyHz).toBe(1);
    expect(waveTravelWavelengthM * waveTravelFrequencyHz).toBe(waveTravelSpeedMps);
  });
});
