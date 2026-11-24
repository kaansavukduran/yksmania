import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { pulseMarkerM, pulseSupportM, springPulseAt } from "../src/learning/mebiSpringPulse";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";
import { springPulseQuestion } from "../src/learning/springPulseQuestion107";

test.each([[0, 2, 5], [0.5, 3, 6], [1, 4, 7], [1.5, 5, 8]])("keeps width constant and the fixed support undisturbed at %s seconds", (time, left, right) => {
  const state = springPulseAt(time);
  expect([state.leftM, state.rightM]).toEqual([left, right]);
  expect(state.displacement(left)).toBe(0);
  expect(state.displacement((left + right) / 2)).toBeCloseTo(1.25, 9);
  expect(state.displacement(right)).toBe(0);
  expect(state.displacement(pulseSupportM)).toBe(0);
});

test("a single marked location moves up and returns to its equilibrium", () => {
  expect(springPulseAt(0).displacement(pulseMarkerM)).toBeCloseTo(0.3125, 9);
  expect(springPulseAt(0.5).displacement(pulseMarkerM)).toBeCloseTo(1.25, 9);
  expect(springPulseAt(1.5).displacement(pulseMarkerM)).toBe(0);
});

test("the new question keeps previous IDs and requires matching stem and help revisions", () => {
  const { questions } = lessons.find(({ id }) => id === "yay-dalgalari")!;
  expect(questions.map(({ id }) => id)).toEqual([
    ...Array.from({ length: 10 }, (_, index) => `yay-dalgalari-q${index + 1}`),
    springPulseQuestion.id,
    "yay-dalgalari-esit-kutle-yogunluk-cizimi",
  ]);
  const q = questions[10];
  const view = practiceQuestionView({ id: q.id, prompt: q.prompt.tr, options: q.options.map(({ tr }) => tr), answer: q.answer, hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance });
  const presentation = sourceQuestionPresentation(view);
  expect(view.options[view.answer]).toBe("1,5 s");
  expect(presentation?.figure?.alt).toContain("x = 2 metrede");
  expect(presentation?.hintFigure).toMatchObject({ title: "Genişliği iki yatay sınırdan oku" });
  expect(presentation?.stepFigures).toHaveLength(2);
  expect(sourceQuestionPresentation({ ...view, answer: 1 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...view, hint: "Eski ipucu" })?.hintFigure).toBeUndefined();
  expect(savedSourceVisuals(view, presentation, {}).stem).toBeUndefined();
  expect(savedSourceVisuals(view, presentation, sourceVisualRevisions(view, presentation)).steps).toHaveLength(2);
});
