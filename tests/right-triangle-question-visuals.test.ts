import { expect, test } from "vitest";
import { geometryFoundation031Lessons } from "../src/learning/geometryFoundation031";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";

const qs = geometryFoundation031Lessons.find(({ id }) => id === "tyt-geo-dik-ucgen-031")!.questions;
const snapshot = (q: typeof qs[number]) => ({
  id: q.id, prompt: q.prompt.tr, options: q.options.map(({ tr }) => tr), answer: q.answer,
  hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance,
});

test("all ten existing questions retain their identity and receive the exact reviewed visual roles", () => {
  expect(qs).toHaveLength(10);
  for (const [index, original] of qs.entries()) {
    const q = snapshot(original);
    const view = sourceQuestionPresentation(q);
    expect(view?.source.pageLabel).toContain(index === 8 ? "130" : "134–135");
    expect(view?.figure?.kind).toBe("geometry");
    expect(view?.hintFigure?.kind).toBe("geometry");
    expect(view?.stepFigures?.map(({ kind }) => kind)).toEqual(["geometry", "math", "geometry"]);
    expect(requiredSourceVisuals.get(q.id)).toMatchObject({ stem: true, hint: true, stepIndexes: [0, 1, 2] });
    expect(sourceQuestionPresentation({ ...q, answer: (q.answer + 1) % 5 })).toBeUndefined();
    expect(sourceQuestionPresentation({ ...q, explanation: q.explanation + " " })?.hintFigure).toBeUndefined();
  }
});

test("7–24 case draws true side proportions, gives a right-angle square, and reveals 25 only in solution", () => {
  const view = sourceQuestionPresentation(snapshot(qs[0]))!;
  const shape = view.figure!;
  expect(shape.kind === "geometry").toBe(true);
  if (shape.kind !== "geometry") throw Error("Triangle is required");
  const [ab, ac] = shape.segments!;
  expect(ab.from).toEqual(ac.from);
  expect(ab.to[0]).toBe(ab.from[0]);
  expect(ac.to[1]).toBe(ac.from[1]);
  expect((ab.from[1] - ab.to[1]) / (ac.to[0] - ac.from[0])).toBeCloseTo(7 / 24, 12);
  expect(shape.segments).toHaveLength(5);
  expect(JSON.stringify([view.figure, view.hintFigure])).not.toMatch(/25 cm/);
  expect(view.stepFigures![2].alt).toBe("BC = 25 cm");
});

test("all five schematics follow the existing shuffled option IDs without indicating the correct angle", () => {
  const q = snapshot(qs[2]);
  const figures = sourceQuestionPresentation(q)!.optionFigures!;
  expect(figures).toHaveLength(5);
  expect(figures[0].kind).toBe("geometry");
  for (const [index, figure] of figures.entries()) {
    expect(figure.alt).toContain(q.options[index].split(", ").join(", ").replace(/, ([^,]+)$/, " ve $1"));
    expect(figure.kind === "geometry" && figure.segments?.length).toBe(3);
  }
});
