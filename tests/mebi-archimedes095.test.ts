import { describe, expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { archimedesQuestionId } from "../src/learning/archimedesQuestion095";
import { submergedBlockPressure } from "../src/learning/mebiArchimedesPressure";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { resolvedGuidance } from "../src/learning/questionHelp";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";

describe("tam batık bloğun kaldırma kuvveti", () => {
  it("iki düşey kuvvet birlikte artarken fark değişmez", () => {
    expect(submergedBlockPressure(10)).toEqual({ bottomCm: 25, topPressure: 800, bottomPressure: 2000, topForce: 16, bottomForce: 40, sideForce: 21, buoyancy: 24 });
    expect(submergedBlockPressure(50)).toEqual({ bottomCm: 65, topPressure: 4000, bottomPressure: 5200, topForce: 80, bottomForce: 104, sideForce: 69, buoyancy: 24 });
    for (const top of [20, 30, 40]) expect(submergedBlockPressure(top).buoyancy).toBe(800 * 10 * 0.003);
  });

  it("eski yanıta sonradan çizim eklemez ve değişen yardımın adımlarını açmaz", () => {
    const lesson = lessons.find(({ id }) => id === "sivilarin-kaldirma-kuvveti")!;
    const original = localizedQuestionView(lesson.questions.find(({ id }) => id === archimedesQuestionId)!);
    const help = practiceQuestionView({
      id: original.id, prompt: original.prompt.tr, options: original.options.map((term) => term.tr),
      answer: original.answer, explanation: original.explanation.tr, hint: original.hint.tr, guidance: original.guidance,
    });
    const question = { ...help, guidance: resolvedGuidance(help) };
    const visual = sourceQuestionPresentation(question);
    expect(visual?.figure?.alt).toContain("3 litrelik");
    expect(visual?.hintFigure?.alt).toContain("batan hacimdir");
    expect(visual?.stepFigures).toHaveLength(3);
    expect(visual?.stepFigures?.[2]).toMatchObject({ kind: "math", expression: { text: "2,4 kg × 10 m/s² = 24 N" } });
    expect(sourceQuestionPresentation({ ...question, answer: 0 })).toBeUndefined();
    expect(sourceQuestionPresentation({ ...question, hint: "Eski ipucu" })?.stepFigures).toBeUndefined();
    expect(savedSourceVisuals(question, visual, {}).stem).toBeUndefined();
    const revisions = sourceVisualRevisions(question, visual);
    expect(savedSourceVisuals(question, visual, revisions).steps).toHaveLength(3);
  });
});
