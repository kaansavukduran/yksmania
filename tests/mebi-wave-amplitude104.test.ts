import { describe, expect, it } from "vitest";
import { waterAmplitudeTitle, waveAmplitudeBounds, waveAmplitudeTitle } from "../src/learning/mebiWaveAmplitude";
import { physicsFiguresWaves } from "../src/learning/sectionFigures/physicsFiguresWaves";

const waveFigures = physicsFiguresWaves["dalgalara-giris"];

describe("MEBİ physical page 150 wave amplitude", () => {
  it.each([1, 2, 3, 4])("measures amplitude %s cm from the equilibrium line", (amplitude) => {
    expect(waveAmplitudeBounds(amplitude)).toEqual({ maximumCm: amplitude, minimumCm: -amplitude, spanCm: 2 * amplitude });
    const elements = waveFigures[waveAmplitudeTitle].draw(amplitude, 0).els;
    const labels = elements.flatMap((element) => element.k === "text" ? [element.s] : []);
    expect(labels).toEqual(expect.arrayContaining(["Uzanım (cm)", "Zaman (s)", "+A", "−A", "T/4", "T/2", "3T/4", "T"]));
  });

  it("draws two equal vertical distances from the still water level", () => {
    const dimensions = waveFigures[waterAmplitudeTitle].draw(0, 0).els.filter((item) => item.k === "dim");
    expect(dimensions).toHaveLength(2);
    expect(dimensions.map((item) => [item.a[0], item.b[0], item.a[1], item.b[1], item.label])).toEqual([[2, 2, -3, 0, "A"], [6, 6, 0, 3, "A"]]);
  });
});
