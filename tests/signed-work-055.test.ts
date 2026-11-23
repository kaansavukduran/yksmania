import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import type { Question } from "../src/domain/model";
import { forge026PhysicsLessons } from "../src/learning/forge026Physics";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { signedWorkFigures, signedWorkQuestionId } from "../src/learning/signedWork055";

const flat = (question: Question) => ({
  id: question.id,
  prompt: question.prompt.tr,
  options: question.options.map((answer) => answer.tr),
  answer: question.answer,
  hint: question.hint.tr,
  explanation: question.explanation.tr,
  guidance: question.guidance,
});

it("uses the same forces as the registered card without revealing their work in the hint", () => {
  const raw = forge026PhysicsLessons.flatMap((lesson) => lesson.questions).find((question) => question.id === signedWorkQuestionId)!;
  const historical = flat(localizedQuestionView(raw));
  expect(historical.hint).toBe(raw.hint.tr);
  const current = practiceQuestionView(historical);
  const presentation = sourceQuestionPresentation(current);
  expect(presentation?.figure).toBe(signedWorkFigures.figure);
  expect(presentation?.hintFigure).toBe(signedWorkFigures.hintFigure);
  expect(presentation?.stepFigures).toBe(signedWorkFigures.stepFigures);
  expect(current.hint).not.toMatch(/50 J|20 J|30 J/);
  expect(JSON.stringify(presentation?.hintFigure)).not.toMatch(/50|20|30/);
  expect(presentation?.stepFigures?.[1].alt).toMatch(/artı 30 joule/);
  expect(current.answer).toBe(raw.answer);
  const [newPaper] = examItemsByIds([signedWorkQuestionId]);
  expect(newPaper.hint).toBe(current.hint);
  expect(sourceQuestionPresentation(newPaper)?.stepFigures).toBe(signedWorkFigures.stepFigures);
  expect(sourceQuestionPresentation(flat(raw))?.hintFigure).toBeUndefined();
  const alternate = practiceQuestionView({ ...historical, hint: "Önce kuvvetleri karşılaştır." });
  expect(alternate.hint).toBe("Önce kuvvetleri karşılaştır.");
  expect(sourceQuestionPresentation(alternate)?.figure).toBe(signedWorkFigures.figure);
  expect(sourceQuestionPresentation(alternate)?.hintFigure).toBeUndefined();
  expect(sourceQuestionPresentation({ ...current, answer: 0 })).toBeUndefined();
  const stale = { ...historical, answer: 0 };
  expect(practiceQuestionView(stale)).toBe(stale);
});
