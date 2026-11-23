import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { studyGuide } from "../src/learning/guides";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { wireComparison, wireComparisons, wireDiameterSolutionTitle, wireMaterialsAt20, wireResistanceExample } from "../src/learning/wireResistance076";
import { wireDiameterQuestionId } from "../src/learning/wireResistance076Question";

it("works from the published 20 °C values and scales circular area by diameter squared", () => {
  expect(wireMaterialsAt20.map(({ coefficient }) => coefficient)).toEqual([1.59, 1.7, 2.82]);
  for (const [material, { coefficient }] of wireMaterialsAt20.entries()) {
    const models = wireComparisons.map((_, shape) => wireComparison(material, shape));
    const start = models[0];
    expect(models.map(({ ratioToStart }) => ratioToStart)).toEqual([1, 2, 0.5, 0.25]);
    expect(models[3].diameterInMillimeters / start.diameterInMillimeters).toBeCloseTo(2, 12);
    expect(models[2].diameterInMillimeters / start.diameterInMillimeters).toBeCloseTo(Math.sqrt(2), 12);
    for (const model of models) {
      expect(model.resistance * model.area * 1e-6 / model.length).toBeCloseTo(coefficient * 1e-8, 15);
    }
  }
});

it("keeps the complete solution drawing in both the lesson and the independent sheet", () => {
  const title = wireResistanceExample.title;
  expect(studyGuide("elektrik-akimi")!.examples.filter((example) => example.title === title)).toEqual([wireResistanceExample]);
  expect(studyCheatSheet("detail-123")!.examples.filter((example) => example.title === title)
    .map(({ stepFigures }) => stepFigures)).toEqual([[undefined, undefined, wireDiameterSolutionTitle]]);
});

it("keeps a question's given dimensions separate from guidance, and blocks stale revisions", () => {
  const [question] = examItemsByIds([wireDiameterQuestionId]);
  expect(question.options[question.answer]).toBe("1/4");
  const result = sourceQuestionPresentation(question);
  expect(result?.figure?.title).toBe("Eşit boylu X ve Y telleri");
  expect(result?.figure?.alt).not.toMatch(/dört|1\/4/);
  expect(result?.hintFigure?.alt).toContain("çapın karesinin");
  expect(result?.stepFigures?.map(({ title }) => title)).toEqual([
    "İki dairesel alanı oranla", "Ortak çarpanları sadeleştir", "Direnç oranını bul",
  ]);
  const oldHelp = sourceQuestionPresentation({ ...question, hint: "Eski sürümün ipucu" });
  expect(oldHelp?.figure).toBe(result?.figure);
  expect(oldHelp?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, answer: (question.answer + 1) % question.options.length })).toBeUndefined();
});
