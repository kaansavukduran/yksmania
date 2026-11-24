import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";
import { waveDirectionsFigures, waveDirectionsQuestion } from "../src/learning/waveDirectionsQuestion118";

test("the drawn movement vectors are perpendicular in A and parallel in B", () => {
  const segments = waveDirectionsFigures.figure.segments;
  const movement = ({ from: [x1, y1], to: [x2, y2] }: { from: readonly [number, number]; to: readonly [number, number] }) => [x2 - x1, y2 - y1];
  const aTravel = movement(segments[0]);
  const bTravel = movement(segments[3]);
  const aVibration = movement(segments[6]);
  const bVibration = movement(segments[12]);
  expect(aTravel[0]).toBeGreaterThan(0);
  expect(bTravel[0]).toBeGreaterThan(0);
  expect(aTravel[0] * aVibration[0] + aTravel[1] * aVibration[1]).toBe(0);
  expect(bTravel[0] * bVibration[1] - bTravel[1] * bVibration[0]).toBe(0);
  expect(waveDirectionsQuestion.options[waveDirectionsQuestion.answer].tr).toBe("Enine, boyuna");
});

test("has its own given, hint and step figures while old questions keep their IDs", () => {
  const { questions } = lessons.find(({ id }) => id === "dalgalara-giris")!;
  expect(questions.map(({ id }) => id)).toEqual([
    ...Array.from({ length: 10 }, (_, index) => `dalgalara-giris-q${index + 1}`),
    waveDirectionsQuestion.id,
  ]);
  const q = questions[10];
  const view = practiceQuestionView({ id: q.id, prompt: q.prompt.tr, options: q.options.map(({ tr }) => tr), answer: q.answer, hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance });
  const presentation = sourceQuestionPresentation(view);
  expect(requiredSourceVisuals.get(q.id)).toEqual({ stem: true, hint: true, stepIndexes: [0, 1] });
  expect(view.options[view.answer]).toBe("Enine, boyuna");
  expect(presentation?.figure?.alt).toContain("yukarı-aşağı çift uçlu");
  expect(presentation?.figure?.alt).not.toMatch(/enine|boyuna/i);
  expect(presentation?.hintFigure).toMatchObject({ title: "İki doğrultuyu karşılaştır" });
  expect(presentation?.stepFigures).toHaveLength(2);
  expect(sourceQuestionPresentation({ ...view, answer: 1 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...view, hint: "Tarihsel ipucu" })?.hintFigure).toBeUndefined();
  expect(savedSourceVisuals(view, presentation, {}).stem).toBeUndefined();
  expect(savedSourceVisuals(view, presentation, sourceVisualRevisions(view, presentation)).steps).toHaveLength(2);
});
