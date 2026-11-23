import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { bottomForceQuestionId } from "../src/learning/bottomForceQuestion082";
import { baseAndWeight, baseForceTitle, surfaceForce, surfaceForceExample, surfaceForceTitle } from "../src/learning/mebiHydrostaticForces";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

it("finds mean pressure at each planar centroid before multiplying the real area", () => {
  expect([0, 1, 2].map((index) => surfaceForce(0.5, index))).toEqual([
    { depth: 0.5, area: 0.04, force: 200 },
    { depth: 1, area: 0.02, force: 200 },
    { depth: 0.5, area: 0.06, force: 300 },
  ]);
  for (const h of [0.25, 0.75]) {
    expect(surfaceForce(h, 0).force).toBe(surfaceForce(h, 1).force);
    expect(surfaceForce(h, 2).force / surfaceForce(h, 0).force).toBe(1.5);
  }
});

it("uses the same water volume in all vessels and conserves weight", () => {
  const [straight, wide, narrow] = [0, 1, 2].map(baseAndWeight);
  expect(straight).toMatchObject({ volume: 6, weight: 60000, baseForce: 60000 });
  expect(wide.weight).toBe(straight.weight);
  expect(narrow.weight).toBe(straight.weight);
  expect(wide.baseForce).toBeLessThan(wide.weight);
  expect(narrow.baseForce).toBeGreaterThan(narrow.weight);
  const sheet = studyCheatSheet("detail-125");
  expect(sheet?.sections.find(({ title }) => title === baseForceTitle)?.figureTitle).toBe(baseForceTitle);
  expect(sheet?.examples.find(({ title }) => title === surfaceForceExample.title)?.stepFigures?.[0]).toBe(surfaceForceTitle);
});

it("supports the original pressure question without supplying a solved force in the stem or hint", () => {
  const [question] = examItemsByIds([bottomForceQuestionId]);
  expect(question.options[question.answer]).toBe("60");
  const presentation = sourceQuestionPresentation(question)!;
  expect(presentation.figure?.alt).toContain("3000 paskal");
  expect(presentation.hintFigure?.alt).not.toContain("60 newton");
  expect(presentation.stepFigures?.at(-1)?.alt).toContain("60 newton");
  expect(sourceQuestionPresentation({ ...question, hint: "Farklı ipucu" })?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, prompt: question.prompt.replace("3000 Pa", "2000 Pa") })).toBeUndefined();
});
