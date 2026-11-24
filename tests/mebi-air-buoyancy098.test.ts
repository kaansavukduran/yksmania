import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { airBuoyancyQuestion } from "../src/learning/airBuoyancyQuestion098";
import { balloonForce } from "../src/learning/mebiAirBuoyancy";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";

it("aynı hacimde ilk yükseliş, denge ve düşüşü hesaplar", () => {
  expect(balloonForce(8)).toEqual({ density: 0.8, buoyancy: 0.12, weight: 0.08, net: 0.04 });
  expect(balloonForce(12)).toEqual({ density: 1.2, buoyancy: 0.12, weight: 0.12, net: 0 });
  expect(balloonForce(20)).toEqual({ density: 2, buoyancy: 0.12, weight: 0.2, net: -0.08 });
});

it("on eski soru kimliğinin sonuna kaynak rolleri olan bir özgün soru ekler", () => {
  const lesson = lessons.find(({ id }) => id === "sivilarin-kaldirma-kuvveti")!;
  expect(lesson.questions.map(({ id }) => id)).toEqual([
    ...Array.from({ length: 10 }, (_, i) => `sivilarin-kaldirma-kuvveti-q${i + 1}`),
    airBuoyancyQuestion.id,
  ]);
  const q = lesson.questions[10];
  const view = practiceQuestionView({ id: q.id, prompt: q.prompt.tr, options: q.options.map(({ tr }) => tr), answer: q.answer, hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance });
  const figure = sourceQuestionPresentation(view);
  expect(figure?.figure?.alt).toContain("K’nın oku aşağı, L’nin oku yukarı");
  expect(figure?.hintFigure).toMatchObject({ kind: "math", expression: { text: "Fₙₑₜ = Fₖ − G" } });
  expect(figure?.stepFigures?.[2]).toMatchObject({ kind: "table", rows: [["K", "Daha büyük"], ["L", "Daha küçük"]] });
  expect(sourceQuestionPresentation({ ...view, answer: 1 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...view, hint: "Eski ipucu" })?.hintFigure).toBeUndefined();
  expect(savedSourceVisuals(view, figure, {}).stem).toBeUndefined();
  expect(savedSourceVisuals(view, figure, sourceVisualRevisions(view, figure)).steps).toHaveLength(3);
});
