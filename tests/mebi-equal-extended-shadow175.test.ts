import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import {
  equalExtendedShadowAt, equalExtendedShadowExample, equalExtendedShadowTitle, equalShadowFarTitle, equalShadowNearTitle,
} from "../src/learning/mebiEqualExtendedShadow";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("the equal-radius case has a cylindrical full shadow and a growing penumbra", () => {
  let previous = 0;
  for (const screen of [8, 9, 10, 11, 12]) {
    const state = equalExtendedShadowAt(screen);
    expect(state.umbraDiameterCm).toBe(3);
    expect(state.penumbraAreaCm2).toBeGreaterThan(previous);
    previous = state.penumbraAreaCm2;
    const radius = Math.hypot(state.sourceTouchX, state.sourceTouchY);
    const slope = (state.outerRadiusCm - state.sourceTouchY) / (screen - state.sourceTouchX);
    expect(radius).toBeCloseTo(1.5, 12);
    expect(state.sourceTouchX + state.sourceTouchY * slope).toBeCloseTo(0, 12);
  }
});

test("the two fixed figures match the interactive geometry and worked example", () => {
  const fig = sectionFigures["golge-yari-golge"];
  expect(fig[equalExtendedShadowTitle].draw(8, 0)).toEqual(fig[equalShadowNearTitle].draw(0, 0));
  expect(fig[equalExtendedShadowTitle].draw(12, 0)).toEqual(fig[equalShadowFarTitle].draw(0, 0));
  expect(studyCheatSheet("detail-132")?.examples.find(example => example.title === equalExtendedShadowExample.title)?.stepFigures)
    .toEqual([equalShadowNearTitle, equalShadowFarTitle]);
});
