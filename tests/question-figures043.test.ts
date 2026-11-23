import { expect, it } from "vitest";
import { lineAnglesPractice042 } from "../src/learning/geometryConditions042Practice";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { lessonById } from "../src/domain/content";
import { resolvedGuidance } from "../src/learning/questionHelp";

const q = lineAnglesPractice042[2];
const question = {
  id: q.id,
  prompt: q.prompt.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
  guidance: q.guidance!,
};

it("keeps the figure on the exact stem, options and key revision", () => {
  const figure = sourceQuestionPresentation(question)?.figure;
  expect(figure?.kind).toBe("geometry");
  if (figure?.kind !== "geometry") throw new Error("Expected a source geometry drawing");
  const [horizontal, sloped] = figure.segments!;
  expect(horizontal.from[1]).toBeCloseTo(horizontal.to[1]);
  const angle = Math.atan2(sloped.to[1] - sloped.from[1], sloped.from[0] - sloped.to[0]);
  expect((angle * 180) / Math.PI).toBeCloseTo(64, 10);
  expect(figure.labels?.map((label) => label.text)).toEqual(["64°"]);
  expect(figure.alt).not.toMatch(/ters|116/);
  for (const change of [
    { prompt: question.prompt.replace("64°", "65°") },
    { options: [...question.options].reverse() },
    { answer: (question.answer + 1) % question.options.length },
    { passage: "Ek verilen" },
  ]) expect(sourceQuestionPresentation({ ...question, ...change })).toBeUndefined();
});

it("keeps measured answers off the hint and binds each drawing to the matching explanation revision", () => {
  const view = sourceQuestionPresentation(question)!;
  expect(view.hintFigure?.alt).not.toMatch(/116|ters/);
  expect(view.stepFigures?.map((figure) => figure.title)).toEqual([
    "Komşu açıyı hesapla", "Sonraki doğrusal çifti bul", "Ters açıyı hesapla",
  ]);
  expect(view.stepFigures?.[0].alt).toContain(`${180 - 64}°`);
  expect(view.stepFigures?.[2].alt).toContain(`ters bölgeler ${180 - (180 - 64)}°`);
  for (const change of [
    { explanation: question.explanation + " " },
    { hint: question.hint + " " },
    { guidance: { ...question.guidance, steps: [...question.guidance.steps].reverse() } },
  ]) {
    const old = sourceQuestionPresentation({ ...question, ...change });
    expect(old?.figure).toEqual(view.figure);
    expect(old?.hintFigure).toBeUndefined();
    expect(old?.stepFigures).toBeUndefined();
  }
});

it("draws opposite force vectors in proportion and leaves the result to the worked steps", () => {
  const n1 = lessonById("newton")!.questions[0];
  const input = {
    id: n1.id,
    prompt: n1.prompt.tr,
    options: n1.options.map((option) => option.tr),
    answer: n1.answer,
    hint: n1.hint.tr,
    explanation: n1.explanation.tr,
  };
  const raw = sourceQuestionPresentation(input)!;
  expect(raw.hintFigure).toBeUndefined();
  const figure = raw.figure;
  if (figure?.kind !== "geometry") throw new Error("Expected force vectors");
  const [, , , , left, , , right] = figure.segments!;
  expect(left.to[0] - left.from[0]).toBe(-32);
  expect(right.to[0] - right.from[0]).toBe(80);
  expect(figure.labels?.map((label) => label.text)).toEqual(["2 kg", "4 N", "10 N"]);
  const view = sourceQuestionPresentation({ ...input, guidance: resolvedGuidance(input) })!;
  expect(view.hintFigure?.alt).not.toMatch(/6 N|3 m/);
  expect(view.stepFigures?.[0].alt).toContain(`+${10 - 4} N`);
  expect(view.stepFigures?.[1].alt).toContain(`saniye karede ${(10 - 4) / 2} metre ve sağa`);
});

it("retains force–acceleration values, units and revision across question and help", () => {
  const q = lessonById("newton")!.questions.find((item) => item.id === "newton-kuvvet-ivme-grafik")!;
  const input = {
    id: q.id,
    prompt: q.prompt.tr,
    options: q.options.map((option) => option.tr),
    answer: q.answer,
    hint: q.hint.tr,
    explanation: q.explanation.tr,
    guidance: q.guidance,
  };
  const view = sourceQuestionPresentation(input)!;
  expect(view.source.pageLabel).toBe("Fiziksel 42. sayfa, basılı 40. sayfa");
  expect(view.hintFigure).toMatchObject({ kind: "table", rows: [["P", "2", "6"], ["Q", "4", "12"]] });
  expect(view.figure?.alt).toContain("düşey eksen net kuvvet (N)");
  expect(view.figure?.alt).not.toContain("kilogram");
  expect(view.hintFigure?.alt).not.toContain("kilogram");
  expect(view.stepFigures?.[0]?.alt).toContain("yatay fark 2 m/s², düşey fark 6 N");
  expect(view.stepFigures?.[1]?.alt).toContain("Sonuç 3 kilogram.");
  expect(input.options[input.answer]).toBe(`${(12 - 6) / (4 - 2)} kg`);
  expect(sourceQuestionPresentation({ ...input, answer: 2 })).toBeUndefined();
  const oldHelp = sourceQuestionPresentation({ ...input, explanation: "Eski açıklama." });
  expect(oldHelp?.figure).toBe(view.figure);
  expect(oldHelp?.hintFigure).toBeUndefined();
  expect(oldHelp?.stepFigures).toBeUndefined();
});
