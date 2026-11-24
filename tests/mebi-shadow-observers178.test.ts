import { expect, test } from "vitest";
import { lessonById } from "../src/domain/content";
import { observerDisks, positions } from "../src/learning/mebiExtendedSourceObservers";
import { shadowObserversQuestion, shadowObserversQuestionFigures } from "../src/learning/shadowObserversQuestion178";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";

test("the source-side diagram and the solved patterns agree with the observer positions", () => {
  const q = shadowObserversQuestion;
  const { figure, stepFigures } = shadowObserversQuestionFigures;
  expect(lessonById("golge-yari-golge")?.questions.find(item => item.id === q.id)).toEqual(q);
  expect(q.options[q.answer].tr).toBe("K kapalı · L kısmen açık · M halka");
  const [k, l, m] = positions.map(item => observerDisks(item.axialCm, item.lateralCm));
  expect(k.blockerAngularRadius).toBeGreaterThan(k.sourceAngularRadius);
  expect(l.separation).toBeLessThan(l.sourceAngularRadius + l.blockerAngularRadius);
  expect(l.separation).toBeGreaterThan(Math.abs(l.sourceAngularRadius - l.blockerAngularRadius));
  expect(m.blockerAngularRadius).toBeLessThan(m.sourceAngularRadius);
  expect(figure.points[0].at[1]).toBe(figure.points[2].at[1]);
  expect(figure.points[1].at[1]).toBeLessThan(figure.points[0].at[1]);
  expect(stepFigures[0].circles?.map(circle => circle.radius)).toEqual([50, 50, 50]);
  expect(stepFigures[1].rows).toEqual([["K", "Eksen üzerinde", "kapalı"], ["L", "Eksenin üstünde", "kısmen açık"], ["M", "Eksen üzerinde", "halka"]]);
});

test("the source roles are required and stale answer or solution revisions cannot borrow the drawings", () => {
  const q = shadowObserversQuestion;
  const bound = {
    id: q.id, prompt: q.prompt.tr, options: q.options.map(option => option.tr), answer: q.answer,
    hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance,
  };
  const current = sourceQuestionPresentation(bound);
  expect(current).toMatchObject(shadowObserversQuestionFigures);
  expect(requiredSourceVisuals.get(q.id)).toEqual({ stem: true, hint: true, stepIndexes: [0, 1] });
  const givenOrHint = JSON.stringify([current?.figure, current?.hintFigure]);
  expect(givenOrHint).not.toMatch(/tamamen kapalı|aydınlık halka|bütün diski taralı/);
  expect(sourceQuestionPresentation({ ...bound, answer: 0 })).toBeUndefined();
  const previous = sourceQuestionPresentation({ ...bound, explanation: bound.explanation + " " });
  expect(previous?.figure).toEqual(current?.figure);
  expect(previous?.hintFigure).toBeUndefined();
  expect(previous?.stepFigures).toBeUndefined();
});
