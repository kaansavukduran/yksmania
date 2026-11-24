import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { studyGuide } from "../src/learning/guides";
import {
  grazingFluxTitle, parallelFluxAt, parallelFluxExample, parallelFluxTitle, tiltedFluxTitle,
} from "../src/learning/mebiParallelFlux";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("the projected area, visible bracket and measured flux use the same angle", () => {
  expect(parallelFluxAt(0).projectedAreaM2).toEqual(4);
  expect(parallelFluxAt(60).lumens).toBeCloseTo(24);
  expect(parallelFluxAt(90)).toEqual({ projection: 0, projectedAreaM2: 0, lumens: 0 });
  const lesson = studyGuide("isik-bilgisi")!;
  expect(lesson.sections.find(section => section.title === parallelFluxTitle)?.table?.rows).toEqual([
    ["0°", "4 m²", "48 lm"], ["60°", "2 m²", "24 lm"], ["90°", "0 m²", "0 lm"],
  ]);
  const figures = sectionFigures["isik-bilgisi"];
  const angle = figures[parallelFluxTitle];
  for (const [step, title] of [[1, tiltedFluxTitle], [2, grazingFluxTitle]] as const) {
    expect(angle.draw(0, step)).toEqual(figures[title].draw(0, 0));
  }
  const bracket = angle.draw(0, 2).els.find(item => item.k === "seg" && item.a[0] === 9.4);
  expect(bracket).toMatchObject({ a: [9.4, 2.54], b: [9.4, 2.54] });
  expect(studyCheatSheet("detail-131")?.examples.find(example => example.title === parallelFluxExample.title)?.stepFigures)
    .toEqual([tiltedFluxTitle, grazingFluxTitle]);
});
