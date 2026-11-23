import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { forceVelocityFigureData, forceVelocityQuestion } from "../src/learning/forceVelocityOptions048";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

const current = {
  id: forceVelocityQuestion.id,
  prompt: forceVelocityQuestion.prompt.tr,
  options: forceVelocityQuestion.options.map((option) => option.tr),
  answer: forceVelocityQuestion.answer,
  hint: forceVelocityQuestion.hint.tr,
  explanation: forceVelocityQuestion.explanation.tr,
  guidance: forceVelocityQuestion.guidance,
};

it("derives the only graph with the required zero intercept and 2 m/s² slope", () => {
  const correct = forceVelocityFigureData.readings.flatMap(([first, last], index) =>
    first === 0 && (last - first) / 3 === 4 / 2 ? [index] : [],
  );
  expect(correct).toEqual([forceVelocityQuestion.answer]);
  expect(lessons.find((lesson) => lesson.id === "newton")?.questions.at(-1)?.id).toBe(current.id);
  const presentation = sourceQuestionPresentation(current);
  expect(presentation?.optionFigures?.map((figure) => figure.title)).toEqual(current.options);
  expect(presentation?.optionFigures?.every((figure) => !/doğru|yanlış|yanıt/i.test(figure.alt))).toBe(true);
  expect(presentation?.hintFigure?.title).toBe("Sabit net kuvvet");
  expect(presentation?.stepFigures?.map((figure) => figure.title)).toEqual(["Sabit ivme", "Başlangıçtan son hıza"]);
});

it("does not apply the option figures to a different saved stem, choice order or key", () => {
  expect(sourceQuestionPresentation({ ...current, prompt: current.prompt + " Eski metin." })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...current, options: [...current.options].reverse() })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...current, answer: 0 })).toBeUndefined();
  const editedExplanation = sourceQuestionPresentation({ ...current, explanation: "Eski çözüm." });
  expect(editedExplanation?.optionFigures).toHaveLength(4);
  expect(editedExplanation?.hintFigure).toBeUndefined();
  expect(editedExplanation?.stepFigures).toBeUndefined();
});
