import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import {
  overlappingShadowTitle, separatedShadowTitle, stackedPointShadowsAt, stackedShadowExample, stackedShadowTitle,
} from "../src/learning/mebiStackedPointShadows";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("each cut uses exact tangent rays and keeps single-source darkness after the overlap is gone", () => {
  const first = stackedPointShadowsAt(0.5);
  const last = stackedPointShadowsAt(1.5);
  expect(first.fullLength).toBeCloseTo(2.2574039314384278);
  expect(last.fullLength).toBe(0);
  expect(last.partialLength).toBeCloseTo(8.17292494312262);
  for (const state of [first, last]) {
    for (const source of state.sources) {
      const direction = [state.screenCm, source.centreY - source.sourceY, source.horizontalRadius];
      const blockedCentreDot = direction[0] * state.objectCm - direction[1] * source.sourceY;
      const distanceToCentre = Math.hypot(state.objectCm, source.sourceY);
      const discriminant = blockedCentreDot ** 2 - (distanceToCentre ** 2 - state.radiusCm ** 2) * Math.hypot(...direction) ** 2;
      expect(discriminant).toBeCloseTo(0, 9);
      for (const { touchX, touchY, screenY } of source.rays) {
        const radiusX = touchX - state.objectCm;
        expect(Math.hypot(radiusX, touchY)).toBeCloseTo(state.radiusCm, 12);
        expect(touchX * radiusX + (touchY - source.sourceY) * touchY).toBeCloseTo(0, 12);
        expect((screenY - source.sourceY) / state.screenCm).toBeCloseTo((touchY - source.sourceY) / touchX, 12);
      }
    }
  }
});

test("the two solved scenes match the endpoints of the teaching model", () => {
  const figures = sectionFigures["golge-yari-golge"];
  expect(figures[stackedShadowTitle].draw(0.5, 0)).toEqual(figures[overlappingShadowTitle].draw(0, 0));
  expect(figures[stackedShadowTitle].draw(1.5, 0)).toEqual(figures[separatedShadowTitle].draw(0, 0));
  expect(studyCheatSheet("detail-132")?.examples.find(example => example.title === stackedShadowExample.title)?.stepFigures)
    .toEqual([overlappingShadowTitle, separatedShadowTitle]);
});
