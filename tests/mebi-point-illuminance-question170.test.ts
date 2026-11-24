import { expect, test } from "vitest";
import { lessonById } from "../src/domain/content";
import { pointSourceIlluminance } from "../src/learning/mebiPointSourcePlane";
import { pointIlluminanceQuestion, pointIlluminanceQuestionFigures } from "../src/learning/pointIlluminanceQuestion170";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";

test("the ray geometry, both illuminances and exact ratio agree", () => {
  const q = pointIlluminanceQuestion;
  expect(lessonById("isik-bilgisi")?.questions.find(item => item.id === q.id)).toEqual(q);
  const [wall, straight, sloped] = pointIlluminanceQuestionFigures.figure.segments;
  expect(wall.to[0]).toBe(wall.from[0]);
  expect(straight.from[1]).toBe(straight.to[1]);
  const pixelsPerMetre = (straight.to[0] - straight.from[0]) / 4;
  expect((sloped.to[1] - sloped.from[1]) / pixelsPerMetre).toBe(3);
  expect(Math.hypot(sloped.to[0] - sloped.from[0], sloped.to[1] - sloped.from[1]) / pixelsPerMetre).toBe(5);
  const a = pointSourceIlluminance({ intensityCd: 80, normalM: 4, offsetM: 3 });
  const b = pointSourceIlluminance({ intensityCd: 80, normalM: 4, offsetM: 0 });
  expect(a.illuminanceLux).toBeCloseTo(2.56, 12);
  expect(b.illuminanceLux).toBeCloseTo(5, 12);
  expect(a.illuminanceLux / b.illuminanceLux).toBeCloseTo(64 / 125, 12);
  expect(q.options[q.answer].tr).toBe("64/125");
});

test("visuals follow their exact stem and help versions", () => {
  const q = pointIlluminanceQuestion;
  const bound = {
    id: q.id, prompt: q.prompt.tr, options: q.options.map(option => option.tr), answer: q.answer,
    hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance,
  };
  const found = sourceQuestionPresentation(bound);
  expect(found).toMatchObject(pointIlluminanceQuestionFigures);
  expect(requiredSourceVisuals.get(q.id)).toEqual({ stem: true, hint: true, stepIndexes: [0, 1] });
  const givenOrHint = [found?.figure, found?.hintFigure].map(figure => JSON.stringify(figure)).join(" ");
  expect(givenOrHint).not.toMatch(/64\/125|2,56|5 lx/);
  expect(sourceQuestionPresentation({ ...bound, answer: 1 })).toBeUndefined();
  const old = sourceQuestionPresentation({ ...bound, explanation: bound.explanation + " " });
  expect(old?.figure).toEqual(found?.figure);
  expect(old?.hintFigure).toBeUndefined();
  expect(old?.stepFigures).toBeUndefined();
});
