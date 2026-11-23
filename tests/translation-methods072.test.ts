import { expect, it } from "vitest";
import { builtInCheatSheets, studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { centerQuarterTurn, rotationFromCenterExample, rotationFromCenterTitle, transformationMethodsTitle } from "../src/learning/translationMethods072";

it("rotates both signed quarter turns around the given center with unchanged distance", () => {
  expect([-90, 0, 90].map(centerQuarterTurn)).toEqual([
    { image: [0, -2], distanceSquared: 13 },
    { image: [5, -1], distanceSquared: 13 },
    { image: [4, 4], distanceSquared: 13 },
  ]);
});

it("keeps the same four relationships and center drawing in the lesson and separate sheet", () => {
  const lessonId = "donusum-oteleme-donme";
  const topicId = "detail-405";
  const guide = studyGuide(lessonId)!;
  const sheet = studyCheatSheet(topicId)!;
  const table = guide.sections.find(({ title }) => title === transformationMethodsTitle)?.table;
  expect(table?.headers).toHaveLength(4);
  expect(table?.rows.map((row) => row.length)).toEqual([4, 4, 4, 4]);
  expect(sheet.sections.find(({ title }) => title === transformationMethodsTitle)?.table).toEqual(table);
  const rotationExamples = sheet.examples.filter(({ title }) => title === rotationFromCenterExample.title);
  expect(rotationExamples.map(({ stepFigures }) => stepFigures)).toEqual([[undefined, rotationFromCenterTitle, undefined]]);
  expect(lessonGuides.get(lessonId)?.sections.some(({ title }) => title === transformationMethodsTitle)).toBe(false);
  expect(builtInCheatSheets.get(topicId)?.sections.some(({ title }) => title === transformationMethodsTitle)).toBe(false);
});
