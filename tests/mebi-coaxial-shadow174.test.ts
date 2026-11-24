import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import {
  beforeSourceMovesTitle, coaxialShadowAt, coaxialShadowExample, coaxialShadowTitle,
  firstSourceMovesTitle, secondSourceMovesTitle,
} from "../src/learning/mebiCoaxialShadow";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("four independent moves change the area of the two concentric regions", () => {
  const [initial, moveK, moveL, moveSphere, moveScreen] = [0, 1, 2, 3, 4].map(coaxialShadowAt);
  for (const model of [initial, moveK, moveL, moveSphere, moveScreen]) {
    for (const ray of model.sources) {
      const tangentNormal = [ray.tangentX - model.centre, ray.tangentY];
      expect((ray.tangentX - ray.source) * tangentNormal[0] + ray.tangentY * tangentNormal[1]).toBeCloseTo(0, 10);
      expect(ray.radius / (model.screen - ray.source)).toBeCloseTo(ray.tangentY / (ray.tangentX - ray.source), 10);
    }
    expect(model.umbraArea + model.penumbraArea).toBeCloseTo(Math.PI * model.outerRadius ** 2, 10);
  }
  expect(moveK.umbraArea).toBeGreaterThan(initial.umbraArea);
  expect(moveK.penumbraArea).toBeLessThan(initial.penumbraArea);
  expect(moveL.umbraArea).toBe(initial.umbraArea);
  expect(moveL.penumbraArea).toBeGreaterThan(initial.penumbraArea);
  expect(moveSphere.umbraArea).toBeLessThan(initial.umbraArea);
  expect(moveSphere.penumbraArea).toBeLessThan(initial.penumbraArea);
  expect(moveScreen.umbraArea).toBeGreaterThan(initial.umbraArea);
  expect(moveScreen.penumbraArea).toBeGreaterThan(initial.penumbraArea);
});

test("the example's three panels are captured from the same model", () => {
  const figures = sectionFigures["golge-yari-golge"];
  const roles = [beforeSourceMovesTitle, firstSourceMovesTitle, secondSourceMovesTitle];
  for (const [step, role] of roles.entries()) {
    expect(figures[coaxialShadowTitle].draw(0, step)).toEqual(figures[role].draw(0, 0));
  }
  expect(studyCheatSheet("detail-132")?.examples.find(example => example.title === coaxialShadowExample.title)?.stepFigures).toEqual(roles);
});
