import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { forge026PhysicsLessons } from "../src/learning/forge026Physics";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { springWorkFigures, springWorkQuestionId } from "../src/learning/springWork057";

it("opens the signed spring calculation only for the matching current help revision", () => {
  const raw = forge026PhysicsLessons.flatMap((lesson) => lesson.questions).find((question) => question.id === springWorkQuestionId)!;
  const legacy = {
    id: raw.id, prompt: raw.prompt.tr, options: raw.options.map((option) => option.tr), answer: raw.answer,
    hint: raw.hint.tr, explanation: raw.explanation.tr, guidance: raw.guidance,
  };
  const current = practiceQuestionView(legacy);
  expect(current.hint).not.toMatch(/20 N|2 J/);
  const currentPaper = examItemsByIds([springWorkQuestionId])[0];
  expect(currentPaper.hint).toBe(current.hint);
  const source = sourceQuestionPresentation(currentPaper);
  expect(source?.figure).toBe(springWorkFigures.figure);
  expect(source?.hintFigure).toBe(springWorkFigures.hintFigure);
  expect(source?.stepFigures).toBe(springWorkFigures.stepFigures);
  expect(sourceQuestionPresentation(legacy)?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...currentPaper, options: [...legacy.options].reverse() })).toBeUndefined();
  expect(springWorkFigures.stepFigures[2]).toMatchObject({
    rows: [["−0,20 m", "+20 N", "2 J"], ["+0,20 m", "−20 N", "2 J"]],
  });
  const personal = { ...legacy, hint: "Kendi ipucum" };
  expect(practiceQuestionView(personal)).toBe(personal);
  expect(sourceQuestionPresentation(personal)?.hintFigure).toBeUndefined();
});
