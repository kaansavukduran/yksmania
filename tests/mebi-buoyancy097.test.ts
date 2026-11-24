import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { buoyancyFloatingQuestionId } from "../src/learning/buoyancyFloatingQuestion097";
import { equilibriumState } from "../src/learning/mebiBuoyancyEquilibrium";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { resolvedGuidance } from "../src/learning/questionHelp";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";

it("eşit ilk kaldırma ile farklı net kuvvetleri ve son dengeyi ayırır", () => {
  const initial = [0, 1, 2].map((index) => equilibriumState(index, false));
  expect(initial.map(({ buoyancy }) => buoyancy)).toEqual([20, 20, 20]);
  expect(initial.map(({ upwardsNetForce }) => upwardsNetForce)).toEqual([8, 0, -5]);
  const final = [0, 1, 2].map((index) => equilibriumState(index, true));
  expect(final.map(({ immersedLitres }) => immersedLitres)).toEqual([1.2, 2, 2]);
  expect(final.map(({ upwardsNetForce }) => upwardsNetForce)).toEqual([0, 0, 0]);
  expect(final.map(({ support }) => support)).toEqual([0, 0, 5]);
});

it("yüzen 2 L blok çizimini yalnız eşleşen soru ve yardım sürümlerine bağlar", () => {
  const lesson = lessons.find(({ id }) => id === "sivilarin-kaldirma-kuvveti")!;
  const original = localizedQuestionView(lesson.questions.find(({ id }) => id === buoyancyFloatingQuestionId)!);
  const help = practiceQuestionView({
    id: original.id, prompt: original.prompt.tr, options: original.options.map((term) => term.tr),
    answer: original.answer, explanation: original.explanation.tr, hint: original.hint.tr, guidance: original.guidance,
  });
  const question = { ...help, guidance: resolvedGuidance(help) };
  const visual = sourceQuestionPresentation(question);
  expect(visual?.figure?.alt).toContain("Batık hacim verilmemiş");
  expect(visual?.hintFigure).toMatchObject({ kind: "math", expression: { text: "Fₖ = G" } });
  expect(visual?.stepFigures?.[2]).toMatchObject({ kind: "table", rows: [["Batık hacim", "0,8 L"], ["Batık oran", "0,8 ÷ 2 = 0,4"]] });
  expect(sourceQuestionPresentation({ ...question, options: [...question.options].reverse() })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, hint: "Eski ipucu" })?.hintFigure).toBeUndefined();
  expect(savedSourceVisuals(question, visual, { visibleFigureRevision: "old", solutionFigureRevision: "old" }).steps).toBeUndefined();
  expect(savedSourceVisuals(question, visual, sourceVisualRevisions(question, visual)).steps).toHaveLength(3);
});
