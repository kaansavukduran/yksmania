import { describe, expect, it } from "vitest";
import { channelMeasurements, idealChannelState } from "../src/learning/mebiBernoulliChannel";
import { lessons } from "../src/domain/content";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { resolvedGuidance } from "../src/learning/questionHelp";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { savedSourceVisuals, sourceVisualRevisions } from "../src/learning/sourceVisualRevisions";

describe("su kanalı ve Bernoulli öğretimi", () => {
  it("okunan iki kaynak ölçümünü ideal çözümün sayılarıyla karıştırmaz", () => {
    expect(channelMeasurements.map(({ speed, pressure }) => [speed, pressure])).toEqual([[1.4, 114], [6.1, 94]]);
    expect(idealChannelState(4)).toEqual({ area: 4, speed: 2, pressure: 114, flowLitresPerSecond: 0.8 });
    expect(idealChannelState(2)).toEqual({ area: 2, speed: 4, pressure: 108, flowLitresPerSecond: 0.8 });
    const second = idealChannelState(3);
    expect(second.speed * 3).toBeCloseTo(8);
    expect(second.pressure + second.speed ** 2 / 2).toBeCloseTo(116);
  });

  it("yalnız doğru soru ve yardım sürümünde çizimleri açar", () => {
    const original = localizedQuestionView(lessons.find(({ id }) => id === "basinc")!.questions.find(({ id }) => id === "basinc-q10")!);
    const help = practiceQuestionView({
      id: original.id, prompt: original.prompt.tr, options: original.options.map((term) => term.tr),
      answer: original.answer, explanation: original.explanation.tr, hint: original.hint.tr, guidance: original.guidance,
    });
    const question = { ...help, guidance: resolvedGuidance(help) };
    const visual = sourceQuestionPresentation(question);
    expect(visual?.figure?.alt).toContain("merkezleri aynı seviyede");
    expect(visual?.hintFigure?.alt).toContain("alan çarpı sürat");
    expect(visual?.stepFigures?.[2]).toMatchObject({ kind: "table", rows: [["Sürat", "Artar"], ["Statik basınç", "Azalır"]] });
    expect(sourceQuestionPresentation({ ...question, answer: 0 })).toBeUndefined();
    expect(sourceQuestionPresentation({ ...question, explanation: "Önceki açıklama" })?.stepFigures).toBeUndefined();
    expect(savedSourceVisuals(question, visual, {}).stem).toBeUndefined();
    const revisions = sourceVisualRevisions(question, visual);
    expect(revisions).toEqual({ visibleFigureRevision: "104935975235d7", solutionFigureRevision: "0d7e14311371be" });
    expect(savedSourceVisuals(question, visual, revisions).steps).toHaveLength(3);
  });
});
