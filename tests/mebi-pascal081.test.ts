import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { layerUnits, pascalGaugePressures, sharedLevelExample, sharedLevelPressures, sharedLevelTitle } from "../src/learning/mebiPascalLayers";
import { pistonQuestionId } from "../src/learning/pascalQuestion081";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

it("adds the piston pressure equally without erasing the depth difference", () => {
  expect(pascalGaugePressures(0)).toEqual({ increment: 0, gauges: [10, 20] });
  expect(pascalGaugePressures(40)).toEqual({ increment: 2, gauges: [12, 22] });
  expect(pascalGaugePressures(80)).toEqual({ increment: 4, gauges: [14, 24] });
});

it("uses the two-h K layer shown in the drawing and balances the U-tube", () => {
  expect(layerUnits).toEqual({ left: 4, upperRight: 2, connectedRight: 1 });
  expect(sharedLevelPressures(0.1)).toEqual({ left: 3.2, upperRight: 2, connectedRight: 1.2, right: 3.2 });
  for (const h of [0.05, 0.075, 0.125, 0.15]) expect(sharedLevelPressures(h).left).toBeCloseTo(sharedLevelPressures(h).right, 12);
  const sheet = studyCheatSheet("detail-125");
  expect(sheet?.sections.find(({ title }) => title === sharedLevelTitle)?.table?.rows[1]).toEqual(["N", "K: 2h, M: h", "2h · ρK · g + h · ρM · g"]);
  expect(sheet?.examples.find(({ title }) => title === sharedLevelExample.title)?.stepFigures?.[1]).toBe(sharedLevelTitle);
});

it("keeps the original hydraulic question revision and withholds its solved force", () => {
  const [question] = examItemsByIds([pistonQuestionId]);
  expect(question.options[question.answer]).toBe("180");
  const presentation = sourceQuestionPresentation(question)!;
  expect(presentation.figure?.alt).toContain("45 newton");
  expect(presentation.figure?.alt).not.toContain("180");
  expect(presentation.hintFigure?.alt).not.toContain("180");
  expect(presentation.stepFigures?.at(-1)?.alt).toContain("180 newton");
  expect(sourceQuestionPresentation({ ...question, hint: "Daha eski ipucu" })?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, prompt: question.prompt.replace("45 N", "90 N") })).toBeUndefined();
});
