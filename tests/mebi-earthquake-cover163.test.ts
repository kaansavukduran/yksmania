import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { coverTitle, dropTitle, earthquakeCoverExample, earthquakeCoverTitle, holdTitle } from "../src/learning/mebiEarthquakeCover";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("the lesson and practice keep the three protective actions in order", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.sections.some(section => section.figureTitle === earthquakeCoverTitle)).toBe(true);
  expect(guide?.examples).toContainEqual(earthquakeCoverExample);
  expect(earthquakeCoverExample.steps.map(({ label, figureTitle }) => [label, figureTitle])).toEqual([
    ["Çök", dropTitle], ["Kapan", coverTitle], ["Tutun", holdTitle],
  ]);
  const figures = sectionFigures["ses-deprem-dalgalari"];
  const interactive = figures[earthquakeCoverTitle];
  expect(interactive.steps).toEqual(["Çök", "Kapan", "Tutun"]);
  for (const [step, title] of [dropTitle, coverTitle, holdTitle].entries()) {
    expect(interactive.draw(0, step)).toEqual(figures[title].draw(0, 0));
  }
  const holds = interactive.draw(0, 2).els.filter(element => element.k === "circle");
  const table = interactive.draw(0, 2).els.find(element => element.k === "seg" && element.a[0] === 4.52);
  expect(holds).toHaveLength(2);
  expect(table).toMatchObject({ a: [4.52, 4.22], b: [4.52, 0.82] });
  expect(holds.at(-1)).toMatchObject({ c: [4.52, 1.89] });
});
