import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";
import { springDensityQuestion, springDensityQuestionFigures } from "../src/learning/springDensityQuestion124";

test("the source drawing uses one scale, same tension and equal masses to determine the exact ratio", () => {
  const { figure, hintFigure, stepFigures } = springDensityQuestionFigures;
  const lengths = figure.segments.filter(({ from, to }) => from[1] === to[1] && from[0] === 65).map(({ from, to }) => to[0] - from[0]);
  expect(lengths).toEqual([168, 42]);
  expect(figure.labels.filter(({ text }) => text === "2 N")).toHaveLength(2);
  expect(figure.labels.filter(({ text }) => text === "120 g")).toHaveLength(2);
  expect(springDensityQuestion.options[springDensityQuestion.answer].tr).toBe(String(Math.sqrt((0.12 / 1.5) / (0.12 / 6))));
  expect(hintFigure.rows.flat()).not.toContain("0,08 kg/m");
  expect(stepFigures[0].rows).toEqual([["A", "0,12 kg", "6 m", "0,02 kg/m"], ["B", "0,12 kg", "1,5 m", "0,08 kg/m"]]);
  expect(stepFigures[1].rows).toEqual([["A", "2 N", "10 m/s"], ["B", "2 N", "5 m/s"]]);
});

test("the twelfth question keeps all previous IDs and requires the correct stem and help revisions", () => {
  const { questions } = lessons.find(({ id }) => id === "yay-dalgalari")!;
  expect(questions.map(({ id }) => id)).toEqual([
    ...Array.from({ length: 10 }, (_, index) => `yay-dalgalari-q${index + 1}`),
    "yay-dalgalari-atma-uretme-suresi",
    springDensityQuestion.id,
    "yay-dalgalari-tepe-cukur-karsilasma-sekli",
  ]);
  const q = questions[11];
  const view = practiceQuestionView({
    id: q.id, prompt: q.prompt.tr, options: q.options.map(({ tr }) => tr),
    answer: q.answer, hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance,
  });
  const presentation = sourceQuestionPresentation(view);
  expect(requiredSourceVisuals.get(q.id)).toEqual({ stem: true, hint: true, stepIndexes: [0, 1] });
  expect(presentation?.figure?.alt).toContain("1,5 metre ve 120 gram");
  expect(presentation?.stepFigures).toHaveLength(2);
  expect(sourceQuestionPresentation({ ...view, answer: 0 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...view, hint: "Eski ipucu" })?.hintFigure).toBeUndefined();
  expect(savedSourceVisuals(view, presentation, {}).stem).toBeUndefined();
  expect(savedSourceVisuals(view, presentation, sourceVisualRevisions(view, presentation)).steps).toHaveLength(2);
});
