import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import {
  fullSphereFluxTitle, lampComparisonTitle, lampExamples, photometryUnitsExample, photometryUnitsTitle, squareMetreFluxTitle, uniformSourceAt,
} from "../src/learning/mebiPhotometryUnits";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("one candela delivers a different amount of flux across the sphere and across one square metre", () => {
  expect(uniformSourceAt(1, 1, 1)).toEqual({
    sphereAreaM2: 4 * Math.PI, totalLumens: 4 * Math.PI, illuminanceLux: 1, patchLumens: 1,
  });
  expect(uniformSourceAt(1, 2, 1)).toEqual({
    sphereAreaM2: 16 * Math.PI, totalLumens: 4 * Math.PI, illuminanceLux: 0.25, patchLumens: 0.25,
  });
});

test("the app distinguishes the lamp's electrical power and its given luminous intensity", () => {
  const guide = studyGuide("isik-bilgisi");
  expect(guide?.sections.find(section => section.title === photometryUnitsTitle)?.figureTitle).toBe(lampComparisonTitle);
  expect(guide?.sections.some(section => section.title === "Candela, lümen ve lüksü yerlerine koy")).toBe(true);
  expect(guide?.examples).toContainEqual(photometryUnitsExample);
  const figures = sectionFigures["isik-bilgisi"];
  for (const [index, example] of lampExamples.entries()) {
    const frame = figures[lampComparisonTitle].draw(0, index);
    expect(frame.els.filter(el => el.k === "vec")).toHaveLength(example.rays);
    expect(frame.readout?.[0]).toContain(example.electricalWatts + " W");
    expect(frame.readout?.[0]).toContain(example.measuredCandela + " cd");
  }
  expect(figures[fullSphereFluxTitle].draw(0, 0).readout?.[0]).toContain("4π lm");
  expect(figures[squareMetreFluxTitle].draw(0, 0).readout?.[0]).toContain("1 lm");
});
