import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { lessonById } from "../src/domain/content";
import { lessonTopic } from "../src/domain/studyPlan";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";
import { ogmTranslationPractice } from "../src/learning/ogmTranslationPractice071";

it("retains the original practice queue and binds the two OGM adaptations to their own figures", () => {
  expect(lessonById("donusum-oteleme-donme")?.questions).toHaveLength(10);
  expect(lessonTopic[ogmTranslationPractice.id]).toBe("detail-405");
  const questions = examItemsByIds(ogmTranslationPractice.questions.map(({ id }) => id));
  expect(questions).toHaveLength(2);
  expect(questions[0].options[questions[0].answer]).toBe("(4; 1)");
  expect(questions[1].options[questions[1].answer]).toBe("(−1; 1), (−2; −3), (2; −1)");
  for (const [index, question] of questions.entries()) {
    const presentation = sourceQuestionPresentation(question);
    expect(presentation?.source).toMatchObject({
      shortLabel: "OGM Materyal · uyarlanmış örnek",
      pageLabel: `Fiziksel ${12 + index}. sayfa`,
    });
    expect(presentation?.stepFigures).toHaveLength(3);
    const revisions = sourceVisualRevisions(question, presentation);
    expect(revisions.solutionFigureRevision).toMatch(/^[0-9a-f]{14}$/);
    expect(savedSourceVisuals(question, presentation, revisions).steps).toHaveLength(3);
    expect(sourceQuestionPresentation({ ...question, answer: 0 })).toBeUndefined();
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
