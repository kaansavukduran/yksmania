import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { parallelLitSphereAt, parallelLitSphereExample, parallelLitSphereTitle, raisedLitSphereTitle, sideLitSphereTitle } from "../src/learning/mebiParallelLitSphere";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("viewing angle changes the projected bright area while the illumination remains fixed", () => {
  expect(parallelLitSphereAt(0).illuminatedFraction).toBe(0.5);
  expect(parallelLitSphereAt(30).illuminatedFraction).toBeCloseTo(0.75, 12);
  expect(parallelLitSphereAt(-30).illuminatedFraction).toBeCloseTo(0.25, 12);
  const r = 1.8;
  const figure = sectionFigures["golge-yari-golge"][parallelLitSphereTitle];
  for (const angle of [-60, -30, 0, 30, 60]) {
    const frame = figure.draw(angle, 0);
    const shapes = frame.els.filter(el => el.k === "poly");
    const visible = shapes[1].ps;
    const area = visible.reduce((sum, [x, y], i) => {
      const [zx, zy] = visible[(i + 1) % visible.length];
      return sum + x * zy - zx * y;
    }, 0) / 2;
    expect(Math.abs(area) / (Math.PI * r ** 2)).toBeCloseTo(parallelLitSphereAt(angle).illuminatedFraction, 2);
    expect(shapes[0]).toEqual(figure.draw(0, 0).els.find(el => el.k === "poly"));
  }
});

test("the worked example uses a different disk in each offline study-sheet step", () => {
  expect(studyCheatSheet("detail-132")?.examples.find(example => example.title === parallelLitSphereExample.title)?.stepFigures)
    .toEqual([sideLitSphereTitle, raisedLitSphereTitle]);
});
