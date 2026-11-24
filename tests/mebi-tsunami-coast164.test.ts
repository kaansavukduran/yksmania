import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { coastEvacuationTitle, coastRetreatTitle, tsunamiCoastExample, tsunamiCoastTitle } from "../src/learning/mebiTsunamiCoast";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("the natural warning and the evacuation direction use different roles on the same coastline", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.sections.some(({ title, figureTitle }) => title === tsunamiCoastTitle && title === figureTitle)).toBe(true);
  expect(guide?.examples).toContainEqual(tsunamiCoastExample);
  const figures = sectionFigures["ses-deprem-dalgalari"];
  const retreat = figures[tsunamiCoastTitle].draw(0, 0);
  const evacuate = figures[tsunamiCoastTitle].draw(0, 1);
  expect(retreat).toEqual(figures[coastRetreatTitle].draw(0, 0));
  expect(evacuate).toEqual(figures[coastEvacuationTitle].draw(0, 0));
  expect(retreat.els.slice(0, 5)).toEqual(evacuate.els.slice(0, 5));
  expect(retreat.els).toContainEqual(expect.objectContaining({ a: [3.23, 1.65], b: [2.14, 1.65] }));
  expect(evacuate.els).toContainEqual(expect.objectContaining({ a: [4.85, 2.8], b: [8.9, 5.02] }));
  expect(tsunamiCoastExample.steps.map(step => step.figureTitle)).toEqual([coastRetreatTitle, coastEvacuationTitle]);
});
