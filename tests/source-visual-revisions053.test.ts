import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { responseSchema } from "../src/domain/model";
import { sourceQuestionLessons024, sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { forceVelocityQuestion } from "../src/learning/forceVelocityOptions048";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";

function textQuestion(question: (typeof sourceQuestionLessons024)[number]["questions"][number]) {
  return {
    id: question.id,
    prompt: question.prompt.tr,
    options: question.options.map((option) => option.tr),
    answer: question.answer,
    hint: question.hint.tr,
    explanation: question.explanation.tr,
    guidance: question.guidance,
  };
}

it("pins each source photo to its bytes and preserves its revision on another host", () => {
  for (const [index, item] of sourceQuestionLessons024[0].questions.entries()) {
    const question = textQuestion(item);
    const presentation = sourceQuestionPresentation(question)!;
    const figure = presentation.figure;
    expect(figure?.kind).toBe("image");
    if (figure?.kind !== "image") throw new Error("Expected the scanned question illustration");
    const file = new URL(`../src/learning/sourceExerciseAssets024/ogm-uslu-ifadeler-soru-0${index + 1}.png`, import.meta.url);
    const digest = createHash("sha256").update(readFileSync(file)).digest("hex");
    expect(figure.assetSHA256).toBe(digest);
    const recorded = sourceVisualRevisions(question, presentation);
    expect(recorded.visibleFigureRevision).toMatch(/^[0-9a-f]{14}$/);
    expect(recorded.solutionFigureRevision).toMatch(/^[0-9a-f]{14}$/);
    const alternate = { ...presentation, figure: { ...figure, src: "https://example.com/other-path/image.png" } };
    expect(sourceVisualRevisions(question, alternate)).toEqual(recorded);
    expect(savedSourceVisuals(question, alternate, recorded).stem).toBe(alternate.figure);
    const substituted = { ...presentation, figure: { ...figure, assetSHA256: "1".repeat(64) } };
    expect(savedSourceVisuals(question, substituted, recorded)).toMatchObject({ figuresUnavailable: true, stem: undefined });
    const altered = { ...question, explanation: "Geçmiş kayıttakinden farklı açıklama." };
    expect(savedSourceVisuals(altered, sourceQuestionPresentation(altered), recorded)).toMatchObject({
      stem: figure, explanation: undefined, solutionUnavailable: true,
    });
    expect(savedSourceVisuals(question, presentation, {}).figuresUnavailable).toBe(true);
    const response = { questionId: question.id, selected: 0, assisted: false, correct: false, confidence: "low" };
    expect(responseSchema.safeParse({ ...response, ...recorded }).success).toBe(true);
    expect(responseSchema.safeParse({ ...response, visibleFigureRevision: "untied" }).success).toBe(false);
  }
});

it("uses a matching older option-only revision without attaching a new stem", () => {
  const question = textQuestion(forceVelocityQuestion);
  const presentation = sourceQuestionPresentation(question)!;
  const old = { optionFigureRevision: presentation.optionFigureRevision };
  expect(savedSourceVisuals(question, presentation, old)).toMatchObject({
    options: presentation.optionFigures, figuresUnavailable: false, stem: undefined,
  });
  const revised = { ...presentation, figure: presentation.optionFigures?.[0] };
  expect(savedSourceVisuals(question, revised, old)).toMatchObject({
    options: undefined, figuresUnavailable: true, stem: undefined,
  });
});
