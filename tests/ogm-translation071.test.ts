import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { lessonById } from "../src/domain/content";
import { lessonTopic } from "../src/domain/studyPlan";
import { questionContentIssues } from "../src/domain/questionContent";
import { txt } from "../src/domain/model";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";
import { ogmTranslationPractice } from "../src/learning/ogmTranslationPractice071";

it("retains the original practice queue and binds every OGM adaptation to its own figures", () => {
  expect(lessonById("donusum-oteleme-donme")?.questions).toHaveLength(10);
  expect(lessonTopic[ogmTranslationPractice.id]).toBe("detail-405");
  const questions = examItemsByIds(ogmTranslationPractice.questions.map(({ id }) => id));
  expect(questions.map((question) => question.options[question.answer])).toEqual([
    "(4; 1)",
    "(−1; 1), (−2; −3), (2; −1)",
    "(−5; −6), (−1; −4), (−1; −1), (−4; −1)",
    "(5; 2), (3; −2), (7; 0)",
    "(1; 1), (−2; 1), (−3; −2), (−1; −1), (2; −2)",
  ]);
  const pages = [12, 13, 17, 20, 22];
  for (const [index, question] of questions.entries()) {
    const presentation = sourceQuestionPresentation(question);
    expect(presentation?.source).toMatchObject({
      shortLabel: "OGM Materyal · uyarlanmış örnek",
      pageLabel: `Fiziksel ${pages[index]}. sayfa`,
    });
    expect(presentation?.stepFigures).toHaveLength(3);
    const revisions = sourceVisualRevisions(question, presentation);
    expect(revisions.solutionFigureRevision).toMatch(/^[0-9a-f]{14}$/);
    expect(savedSourceVisuals(question, presentation, revisions).steps).toHaveLength(3);
    expect(sourceQuestionPresentation({ ...question, answer: (question.answer + 1) % question.options.length })).toBeUndefined();
    const staleHelp = { ...question, explanation: "Bu açıklama eski bir sürüme ait." };
    const partial = sourceQuestionPresentation(staleHelp);
    expect(partial?.figure).toBe(presentation?.figure);
    expect(savedSourceVisuals(staleHelp, partial, revisions)).toMatchObject({ solutionUnavailable: true, steps: undefined });
  }
  const [inverse, triangle] = questions.map(sourceQuestionPresentation);
  expect(inverse?.figure).toMatchObject({ kind: "geometry", points: [{ at: [185, 140] }] });
  expect(inverse?.figure?.alt).not.toContain("(4; 1)");
  expect(triangle?.figure?.alt).not.toContain("A′");
  const drawing = triangle?.stepFigures?.[2];
  if (drawing?.kind !== "geometry") throw new Error("Expected the translated triangle.");
  expect(drawing.points?.slice(3)).toMatchObject([
    { at: [210, 215] }, { at: [185, 315] }, { at: [285, 265] },
  ]);
});

it("accepts the exact registered stem figure and catches a revision that cannot render it", () => {
  const question = ogmTranslationPractice.questions[2];
  expect(questionContentIssues(question)).toEqual([]);
  expect(questionContentIssues({ ...question, prompt: txt(`${question.prompt.tr} Değişen koşul.`) })).toEqual([
    "Atıf yapılan şekil/grafik/tablo için soru ortamı tanımlı değil",
  ]);
});
