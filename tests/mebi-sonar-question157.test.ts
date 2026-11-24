import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { forge012PhysicsLessons } from "../src/learning/forge012Physics";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sonarDistanceQuestion, sonarDistanceQuestionFigures } from "../src/learning/sonarQuestion157";
import { soundLevelQuestion } from "../src/learning/soundLevelQuestion148";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";
import { missingRequiredSourceVisuals } from "../src/learning/sourceVisualRevisions";

test("the new sonar card keeps all previous questions and needs its declared visual roles", () => {
  const source = forge012PhysicsLessons.find(({ id }) => id === "ses-deprem-dalgalari")!;
  const lesson = lessons.find(({ id }) => id === source.id)!;
  expect(lesson.questions).toEqual([...source.questions, soundLevelQuestion, sonarDistanceQuestion]);
  const { id, prompt, options, answer, hint, explanation, guidance } = lesson.questions.at(-1)!;
  const question = practiceQuestionView({
    id, prompt: prompt.tr, options: options.map(({ tr }) => tr), answer,
    hint: hint.tr, explanation: explanation.tr, guidance,
  });
  const presentation = sourceQuestionPresentation(question);
  expect(presentation?.figure).toEqual(sonarDistanceQuestionFigures.figure);
  expect(missingRequiredSourceVisuals(requiredSourceVisuals.get(id), presentation)).toEqual([]);
  const { figure, hintFigure, stepFigures } = sonarDistanceQuestionFigures;
  const numeric = figure.labels.filter(({ text }) => /^\d/.test(text));
  const time = Number(numeric.find(({ text }) => text.endsWith("ms"))!.text.split(" ")[0]) / 1000;
  const speed = Number(numeric.find(({ text }) => text.endsWith("m/s"))!.text.split(" ")[0].replace(".", ""));
  expect(question.options[answer]).toBe(String(speed * time / 2));
  expect(figure.alt).not.toMatch(/\b90\b/);
  expect(hintFigure.alt).not.toMatch(/\b90\b/);
  expect(stepFigures[1]).toMatchObject({ rows: [["Gidiş ve dönüş", "180 m"], ["Başlıktan sürüye", "90 m"]] });
  expect(sourceQuestionPresentation({ ...question, options: [...question.options].reverse() })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, hint: "Farklı yardım." })?.stepFigures).toBeUndefined();
});
