import { describe, expect, it } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import { wavelengthMarkers, wavelengthTitle, wavePeriodExample, waveRopeTitle, waveTiming } from "../src/learning/mebiWaveBasics";
import { physicsFiguresWaves } from "../src/learning/sectionFigures/physicsFiguresWaves";

describe("MEBİ physical page 149 wave diagrams", () => {
  it.each([1.5, 2.5, 2.75, 3])("reads both same-phase distances for λ = %s m", (wavelength) => {
    const { crests, troughs } = wavelengthMarkers(wavelength);
    expect(crests[1] - crests[0]).toBe(wavelength);
    expect(troughs[1] - troughs[0]).toBe(wavelength);
    expect(troughs[0] - crests[0]).toBe(wavelength / 2);
    expect(crests[3] - crests[0]).toBe(wavelength * 3);
    expect(physicsFiguresWaves["dalgalara-giris"][wavelengthTitle].draw(wavelength, 0).els.filter((item) => item.k === "dim" && item.label === "λ")).toHaveLength(2);
  });

  it("keeps the previous section positions and worked or recall pages", () => {
    const id = "dalgalara-giris";
    const oldGuide = lessonGuides.get(id)!;
    const guide = studyGuide(id)!;
    const oldCount = oldGuide.sections.length;
    expect(guide.sections.slice(0, oldCount).map((section) => section.title)).toEqual(oldGuide.sections.map((section) => section.title));
    expect(guide.sections[oldCount]?.figureTitle).toBe(waveRopeTitle);
    expect(resolveGuideStep(id, 3, oldCount, guide.sections.length)).toBe(3);
    expect(resolveGuideStep(id, oldCount, oldCount, guide.sections.length)).toBe(guide.sections.length);
    expect(resolveGuideStep(id, oldCount + 1, oldCount, guide.sections.length)).toBe(guide.sections.length + 1);
    expect(guide.examples[oldGuide.examples.length]).toEqual(wavePeriodExample);
    const sheet = studyCheatSheet("detail-127")!;
    expect(sheet.sections.find((section) => section.title === waveRopeTitle)?.figureTitle).toBe(waveRopeTitle);
    expect(sheet.examples.filter((example) => example.title === wavePeriodExample.title)).toHaveLength(1);
    expect(waveTiming.cycles * waveTiming.periodS).toBe(waveTiming.elapsedS);
    expect(waveTiming.periodS * waveTiming.frequencyHz).toBe(1);
  });
});
