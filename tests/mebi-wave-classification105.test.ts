import { describe, expect, it } from "vitest";
import { waveClassificationExamples, waveClassificationTitle } from "../src/learning/mebiWaveClassification";
import { physicsFiguresWaves } from "../src/learning/sectionFigures/physicsFiguresWaves";

const figure = physicsFiguresWaves["dalgalara-giris"][waveClassificationTitle];
const branchLabels = ["Mekanik", "Elektromanyetik", "Boyuna", "Enine"];

describe("MEBİ physical page 150 wave classification", () => {
  it.each([
    ["Yatay tel", ["Mekanik", "Enine"]],
    ["Havada ses", ["Mekanik", "Boyuna"]],
    ["Boşlukta ışık", ["Elektromanyetik", "Enine"]],
    ["Su yüzeyi", ["Mekanik"]],
    ["Deprem P dalgası", ["Mekanik", "Boyuna"]],
    ["Deprem S dalgası", ["Mekanik", "Enine"]],
  ])("selects the right branches for %s", (name, correct) => {
    const index = waveClassificationExamples.findIndex((example) => example.name === name);
    expect(index).toBeGreaterThanOrEqual(0);
    const labels = figure.draw(0, 0, index).els.flatMap((item) => item.k === "text" && item.bold && branchLabels.includes(item.s) ? [item.s] : []);
    expect(labels).toEqual(correct);
  });
});
