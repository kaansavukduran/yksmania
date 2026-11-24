import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";
import { missingRequiredSourceVisuals } from "../src/learning/sourceVisualRevisions";
import { waterReflectionQuestion, waterReflectionQuestionFigures } from "../src/learning/waterReflectionQuestion136";

test("existing question order survives and the new question has all separately required visual roles", () => {
  const lesson = lessons.find(({ id }) => id === "su-dalgalari")!;
  expect(lesson.questions.map(({ id }) => id)).toEqual([
    ...Array.from({ length: 10 }, (_, i) => `su-dalgalari-q${i + 1}`),
    waterReflectionQuestion.id,
  ]);
  const raw = lesson.questions[10];
  const q = practiceQuestionView({
    id: raw.id, prompt: raw.prompt.tr, options: raw.options.map(({ tr }) => tr),
    answer: raw.answer, hint: raw.hint.tr, explanation: raw.explanation.tr, guidance: raw.guidance,
  });
  const presentation = sourceQuestionPresentation(q)!;
  expect(presentation.figure).toEqual(waterReflectionQuestionFigures.figure);
  expect(missingRequiredSourceVisuals(requiredSourceVisuals.get(q.id), presentation)).toEqual([]);
  expect(waterReflectionQuestionFigures.figure.labels.map(({ text }) => text)).not.toContain("55°");
  const [fromBarrier, fromNormal] = waterReflectionQuestionFigures.stepFigures[0].arcs;
  expect(fromBarrier.degrees).toBe(55);
  expect(fromNormal.start).toBe(fromBarrier.degrees);
  expect(fromNormal.start + fromNormal.degrees).toBe(90);
  expect(q.options[q.answer]).toBe("55° ve 2 cm");
  expect(sourceQuestionPresentation({ ...q, answer: 0 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...q, hint: "Farklı bir ipucu." })?.stepFigures).toBeUndefined();
});
