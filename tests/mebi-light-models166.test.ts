import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import {
  brightFringeSpacingMm, brightFringeTitle, darkFringeTitle, lightModelsExample, lightModelsTitle, youngFringesTitle,
} from "../src/learning/mebiLightModels";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("changing wavelength changes the plotted spacing by the calculated amount", () => {
  expect(brightFringeSpacingMm(450)).toBeCloseTo(2.25);
  expect(brightFringeSpacingMm(650)).toBeCloseTo(3.25);
  const figure = sectionFigures["isik-bilgisi"][youngFringesTitle];
  const stripes = (wavelength: number) => figure.draw(wavelength, 0).els
    .filter(rail => rail.k === "seg" && rail.a[0] === 9.56)
    .map(rail => rail.k === "seg" ? rail.a[1] : 0);
  const blue = stripes(450);
  const red = stripes(650);
  expect(blue).toHaveLength(5);
  expect(red).toHaveLength(5);
  expect(blue[2]).toEqual(red[2]);
  expect((red[3] - red[2]) / (blue[3] - blue[2])).toBeCloseTo(650 / 450);
});

test("the dark fringe is an actual zero sum of two nonzero equal signals", () => {
  const guide = studyGuide("isik-bilgisi");
  expect(guide?.sections.find(section => section.title === lightModelsTitle)?.figureTitle).toBe(youngFringesTitle);
  expect(guide?.examples).toContainEqual(lightModelsExample);
  const sheet = studyCheatSheet("detail-131");
  expect(sheet?.examples.find(example => example.title === lightModelsExample.title)?.stepFigures)
    .toEqual([brightFringeTitle, darkFringeTitle]);
  const figures = sectionFigures["isik-bilgisi"];
  const paths = (title: string) => figures[title].draw(0, 0).els.filter(element => element.k === "poly");
  for (const title of [brightFringeTitle, darkFringeTitle]) {
    const [first, second, sum] = paths(title);
    expect(first?.k).toBe("poly");
    expect(second?.k).toBe("poly");
    expect(sum?.k).toBe("poly");
    if (first?.k !== "poly" || second?.k !== "poly" || sum?.k !== "poly") throw Error("Expected all three wave paths");
    for (const [i, point] of first.ps.entries()) {
      const firstDisplacement = point[1] - 4.35;
      const secondDisplacement = second.ps[i][1] - 2.77;
      expect(sum.ps[i][1] - 1.18).toBeCloseTo(firstDisplacement + secondDisplacement, 9);
    }
  }
});
