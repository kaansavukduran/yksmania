import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import {
  earthquakePreparationExample, earthquakePreparationTitle, emergencyBagTitle, meetingPlanTitle, securedRoomTitle,
} from "../src/learning/mebiEarthquakePreparation";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("home preparation connects the source checklist, room, meeting plan and bag", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  const section = guide?.sections.find(x => x.title === earthquakePreparationTitle);
  expect(section?.figureTitle).toBe(earthquakePreparationTitle);
  expect(section?.table?.rows.map(([role]) => role)).toEqual(["Yapı", "Oda", "Ev planı", "Tesisat", "Çanta", "İlk yardım"]);
  expect(guide?.examples).toContainEqual(earthquakePreparationExample);
  const figures = sectionFigures["ses-deprem-dalgalari"];
  expect(earthquakePreparationExample.steps.map(step => step.figureTitle)).toEqual([securedRoomTitle, meetingPlanTitle, emergencyBagTitle]);
  for (const [step, title] of [securedRoomTitle, meetingPlanTitle, emergencyBagTitle].entries()) {
    expect(figures[earthquakePreparationTitle].draw(0, step)).toEqual(figures[title].draw(0, 0));
  }
  expect(figures[meetingPlanTitle].draw(0, 0).els).toContainEqual(
    expect.objectContaining({ k: "vec", a: [3.77, 2.05], b: [9.52, 2.05] }),
  );
});
