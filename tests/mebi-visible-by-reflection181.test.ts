import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { approximateReflectionCases, litObjectTitle, unlitObjectTitle, visibleByReflectionExample, visibleByReflectionTitle } from "../src/learning/mebiVisibleByReflection";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("an illuminated surface connects the two rays at the same point, while switching off the lamp removes both", () => {
  const model = sectionFigures["duzlem-ayna"][visibleByReflectionTitle];
  const light = model.draw(0, 0);
  const dark = model.draw(0, 1);
  const off = model.draw(0, 2);
  for (const frame of [light, dark]) {
    const [incident, reflected] = frame.els.filter(el => el.k === "vec");
    expect(incident.b).toEqual(reflected.a);
    expect(Math.hypot(...incident.b)).toBeCloseTo(0.9, 12);
    expect(reflected.b[0]).toBeGreaterThan(reflected.a[0]);
  }
  expect(approximateReflectionCases.map(item => item.reflectedFraction)).toEqual([0.8, 0.08, 0]);
  expect(off.els.filter(el => el.k === "vec")).toHaveLength(0);
  expect(studyCheatSheet("detail-133")?.examples.find(example => example.title === visibleByReflectionExample.title)?.stepFigures)
    .toEqual([litObjectTitle, unlitObjectTitle]);
});
