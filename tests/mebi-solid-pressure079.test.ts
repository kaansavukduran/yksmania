import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { brickPressure, brickPressureExample, brickPressureTitle, brickStacks, prismBaseAreas, prismPressure, uprightPrismTitle } from "../src/learning/mebiSolidPressure";
import { solidPressureQuestionId } from "../src/learning/solidPressureQuestion079";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

it("uses each source stack's whole weight and the bottom brick's contact area", () => {
  expect(brickStacks.map((_, i) => brickPressure(i))).toEqual([
    { weight: 2, area: 1, pressure: 2 },
    { weight: 2, area: 2, pressure: 1 },
    { weight: 3, area: 2, pressure: 1.5 },
  ]);
  const sheet = studyCheatSheet("detail-125")!;
  expect(sheet.sections.find(({ title }) => title === brickPressureTitle)?.table?.rows).toEqual([
    ["I", "2G", "S", "2G/S"], ["II", "2G", "2S", "G/S"], ["III", "3G", "2S", "3G/(2S)"],
  ]);
  expect(sheet.sections.find(({ title }) => title === uprightPrismTitle)?.figureTitle).toBe(uprightPrismTitle);
  expect(sheet.examples.find(({ title }) => title === brickPressureExample.title)?.stepFigures?.[0]).toBe(brickPressureTitle);
});

it("keeps pressure after a vertical cut and reduces it after halving height", () => {
  const original = prismPressure(prismBaseAreas[0]);
  const parts = prismBaseAreas.slice(1).map((area) => prismPressure(area));
  expect(parts.map(({ pressure }) => pressure)).toEqual([4000, 4000]);
  expect(parts[0].force + parts[1].force).toBe(original.force);
  expect(prismPressure(original.area, original.height / 2).pressure).toBe(2000);
});

it("keeps the original question and withholds the result from the stem and hint figures", () => {
  const [question] = examItemsByIds([solidPressureQuestionId]);
  expect(question.options[question.answer]).toBe("2000");
  const presentation = sourceQuestionPresentation(question)!;
  expect(presentation.figure?.alt).toContain("40 newtonla yukarı");
  expect(presentation.hintFigure?.alt).toContain("zemin tepkisi yukarı");
  expect(presentation.figure?.alt).not.toMatch(/60 newton|2000/);
  expect(presentation.hintFigure?.alt).not.toMatch(/60 newton|2000/);
  expect(presentation.stepFigures?.at(-1)?.alt).toContain("2000 paskal");
  expect(sourceQuestionPresentation({ ...question, hint: "Eski ipucu" })?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, prompt: question.prompt.replace("40 N", "30 N") })).toBeUndefined();
});
