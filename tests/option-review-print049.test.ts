import { expect, it } from "vitest";
import { responseSchema } from "../src/domain/model";
import { forceVelocityQuestion } from "../src/learning/forceVelocityOptions048";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

const q = forceVelocityQuestion;
const current = {
  id: q.id, prompt: q.prompt.tr, options: q.options.map((option) => option.tr),
  answer: q.answer, hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance,
};

it("binds the saved response to its option figures and keeps older responses readable", () => {
  const previous = { questionId: q.id, selected: 0, correct: false, assisted: false, confidence: "high" };
  expect(responseSchema.parse(previous)).toEqual(previous);
  const presentation = sourceQuestionPresentation(current);
  const revision = presentation?.optionFigureRevision;
  expect(revision).toMatch(/^[a-f0-9]{14}$/);
  const response = { ...previous, optionFigureRevision: revision };
  expect(responseSchema.parse(JSON.parse(JSON.stringify(response)))).toEqual(response);
  expect(responseSchema.safeParse({ ...previous, optionFigureRevision: "unbound" }).success).toBe(false);
  expect(sourceQuestionPresentation({ ...current, answer: 0 })?.optionFigureRevision).toBeUndefined();
  expect(sourceQuestionPresentation({ ...current, hint: "Eski ipucu." })?.optionFigureRevision).toBe(revision);
});
