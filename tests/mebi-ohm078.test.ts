import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { meterConnections, ohmMeasurementDifference, ohmMeasurementsTitle, ohmSlopeExample, sourceOhmPoints } from "../src/learning/mebiOhmReadings";
import { ohmGraphQuestionId } from "../src/learning/ohmGraphQuestion078";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

it("reproduces the four published V–I entries and their common slope", () => {
  expect(sourceOhmPoints.map(({ current, voltage }) => [current, voltage])).toEqual([[0.5, 2], [1, 4], [1.5, 6], [2, 8]]);
  for (const end of [1, 2, 3] as const) {
    const pair = ohmMeasurementDifference(end);
    expect(pair.resistance).toBe(4);
    expect(pair.voltageDifference).toBe(4 * pair.currentDifference);
  }
  expect(studyCheatSheet("detail-123")!.examples.filter(({ title }) => title === ohmSlopeExample.title).map(({ stepFigures }) => stepFigures))
    .toEqual([[undefined, undefined, ohmMeasurementsTitle]]);
});

it("models the two correctly placed meters and distinguishes open from shorted readings", () => {
  expect(meterConnections.map(({ inSeries, across, current }) => [inSeries, across, current]))
    .toEqual([["A", "V", 2], [null, "V", 2], ["V", null, 0], ["A", null, 2], [null, "A", null]]);
});

it("keeps the old question at 5 ohms and requires its original visual and help revisions", () => {
  const [question] = examItemsByIds([ohmGraphQuestionId]);
  expect(question.options[question.answer]).toBe("5");
  const presentation = sourceQuestionPresentation(question);
  expect(presentation?.figure?.alt).toContain("2 amper, 10 volt");
  expect(presentation?.figure?.alt).not.toMatch(/5 ohm/);
  expect(presentation?.hintFigure?.title).toBe("Eğim için eksenleri eşleştir");
  expect(presentation?.stepFigures?.at(-1)?.alt).toContain("5 ohm");
  expect(sourceQuestionPresentation({ ...question, hint: "Önceki ipucu" })?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, prompt: question.prompt.replace("10 V", "8 V") })).toBeUndefined();
});
