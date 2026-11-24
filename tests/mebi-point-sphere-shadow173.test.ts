import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { studyGuide } from "../src/learning/guides";
import {
  farScreenTitle, nearScreenTitle, sourceToCentreCm, sphereRadiusCm,
  sphereShadowAt, sphereShadowExample, sphereShadowTitle,
} from "../src/learning/mebiPointSphereShadow";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("rays are tangent to the sphere and meet the screen at the measured diameter", () => {
  for (const distance of [10, 11, 12, 13, 14]) {
    const { tangentX, tangentY, tangentLength, shadowRadius, diameter } = sphereShadowAt(distance);
    expect(tangentLength).toBe(4);
    expect(Math.hypot(tangentX - sourceToCentreCm, tangentY)).toBeCloseTo(sphereRadiusCm, 12);
    expect(tangentX * (tangentX - sourceToCentreCm) + tangentY ** 2).toBeCloseTo(0, 12);
    expect(tangentY / tangentX).toBeCloseTo(shadowRadius / distance, 12);
    expect(diameter).toBeCloseTo(1.5 * distance, 12);
  }
});

test("the lesson and both study sheet diagrams use the same projection", () => {
  const guide = studyGuide("golge-yari-golge")!;
  const section = guide.sections.find(section => section.title === sphereShadowTitle);
  expect(section?.figureTitle).toBe(sphereShadowTitle);
  expect(guide.examples).toContainEqual(sphereShadowExample);
  const figures = sectionFigures[guide.id];
  expect(figures[sphereShadowTitle].draw(10, 0)).toEqual(figures[nearScreenTitle].draw(0, 0));
  expect(figures[sphereShadowTitle].draw(14, 0)).toEqual(figures[farScreenTitle].draw(0, 0));
  expect(studyCheatSheet("detail-132")?.examples.find(example => example.title === sphereShadowExample.title)?.stepFigures)
    .toEqual([nearScreenTitle, farScreenTitle]);
});
