import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { studyGuide } from "../src/learning/guides";
import { beamDistanceTitle, beamIlluminance, parallelBeamTitle, pointBeamTitle } from "../src/learning/mebiBeamDistance";
import { lightAtOffset, normalSpotTitle, obliqueSpotTitle, pointSourcePlaneExample, pointSourcePlaneTitle } from "../src/learning/mebiPointSourcePlane";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("distance and cosine use the same 3–4–5 ray triangle", () => {
  expect(lightAtOffset(0)).toEqual({ distanceM: 3, normalCosine: 1, angleDeg: 0, illuminanceLux: 25 });
  const oblique = lightAtOffset(4);
  expect(oblique.distanceM).toBe(5);
  expect(oblique.normalCosine).toBe(0.6);
  expect(oblique.angleDeg).toBeCloseTo(53.13);
  expect(oblique.illuminanceLux).toBeCloseTo(5.4);
  const lesson = studyGuide("isik-bilgisi")!;
  expect(lesson.sections.find(section => section.title === pointSourcePlaneTitle)?.table?.rows).toHaveLength(3);
  expect(studyCheatSheet("detail-131")?.examples.find(example => example.title === pointSourcePlaneExample.title)?.stepFigures)
    .toEqual([normalSpotTitle, obliqueSpotTitle]);
  const figures = sectionFigures["isik-bilgisi"];
  expect(figures[pointSourcePlaneTitle].draw(4, 0)).toEqual(figures[obliqueSpotTitle].draw(0, 0));
});

test("a fixed-width beam keeps its local illuminance, a point source falls to one quarter", () => {
  expect(beamIlluminance(false, 2)).toBe(20);
  expect(beamIlluminance(false, 4)).toBe(5);
  expect(beamIlluminance(true, 2)).toBe(20);
  expect(beamIlluminance(true, 4)).toBe(20);
  const figures = sectionFigures["isik-bilgisi"];
  expect(figures[beamDistanceTitle].draw(0, 0)).toEqual(figures[pointBeamTitle].draw(0, 0));
  expect(figures[beamDistanceTitle].draw(0, 1)).toEqual(figures[parallelBeamTitle].draw(0, 0));
});
