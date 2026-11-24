import { expect, test } from "vitest";
import { combinedNoiseLevelDb, noiseBaselineDb, noiseTitle } from "../src/learning/mebiNoise";
import { intensityRatio } from "../src/learning/mebiSoundLevel";
import { noiseFigures } from "../src/learning/sectionFigures/mebiNoiseFigures";

test("intensity adds for equal independent sources and the displayed level is its logarithm", () => {
  const figure = noiseFigures[noiseTitle];
  for (const count of [1, 2, 3, 4]) {
    expect(intensityRatio(noiseBaselineDb, combinedNoiseLevelDb(count))).toBeCloseTo(count, 12);
    expect(figure.draw(count, 0, -1).els.filter(el => el.k === "vec")).toHaveLength(count);
    const blocks = figure.draw(count, 1, -1).els.filter(el => el.k === "poly" && el.fill);
    expect(blocks).toHaveLength(count);
  }
  expect(combinedNoiseLevelDb(2) - noiseBaselineDb).toBeCloseTo(3.0103, 4);
});
