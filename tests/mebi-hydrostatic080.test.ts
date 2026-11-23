import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { equalDepthQuestionId } from "../src/learning/hydrostaticQuestion080";
import { fillingGraphExample, fillingGraphTitle, fillingShapes, fillingState, waterPressureKPa } from "../src/learning/mebiHydrostaticFilling";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

it("conserves volume and gives the three source graph shapes", () => {
  for (const [shapeIndex, shape] of fillingShapes.entries()) {
    for (const sec of [0, 1, 2, 3]) {
      const { volume, depth, area, riseRate, pressure } = fillingState(sec, shapeIndex);
      expect(volume).toBe(2 * sec);
      expect(4 * depth + shape.change * depth ** 2 / 2).toBeCloseTo(volume, 12);
      expect(area * riseRate).toBeCloseTo(2, 12);
      expect(pressure).toBeCloseTo(10 * depth, 12);
    }
  }
  expect(fillingState(3, 0)).toMatchObject({ depth: 1.5, pressure: 15, pressureRate: 5 });
  expect(fillingState(3, 1).pressureRate).toBeLessThan(fillingState(1, 1).pressureRate);
  expect(fillingState(3, 2).pressureRate).toBeGreaterThan(fillingState(1, 2).pressureRate);
  expect(waterPressureKPa(0.4)).toBe(4);
  expect(studyCheatSheet("detail-125")?.examples.find(({ title }) => title === fillingGraphExample.title)?.stepFigures?.[2]).toBe(fillingGraphTitle);
});

it("ties the shape to the existing question and keeps help revision-aware", () => {
  const [question] = examItemsByIds([equalDepthQuestionId]);
  expect(question.options[question.answer]).toBe("1");
  const presentation = sourceQuestionPresentation(question)!;
  expect(presentation.figure?.alt).toContain("0,4 metre");
  expect(presentation.hintFigure?.alt).not.toContain("birdir");
  expect(presentation.stepFigures?.at(-1)?.alt).toContain("birdir");
  expect(sourceQuestionPresentation({ ...question, hint: "Farklı ipucu" })?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, prompt: question.prompt.replace("0,4 m", "0,5 m") })).toBeUndefined();
});
