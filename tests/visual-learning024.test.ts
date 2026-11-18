import { describe, expect, it } from "vitest";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { geometrySummary024Inventory } from "./e2e/visual-geometry024-inventory";

describe("geometry summary browser coverage", () => {
  it("exercises every shipped geometry summary, including its own correct route and model", () => {
    const geometry = [...builtInCheatSheets.values()]
      .filter((sheet) => sheet.subjectId.endsWith("-geometri"))
      .map(({ topicId, lessonId, title, subjectId }) => ({
        topicId,
        lessonId,
        title,
        subjectId,
      }));
    expect(geometry).toHaveLength(19);
    expect(geometrySummary024Inventory).toEqual(geometry);
    expect(new Set(geometry.map((sheet) => sheet.lessonId)).size).toBe(19);
    expect(
      geometry.filter((sheet) => sheet.subjectId === "tyt-geometri"),
    ).toHaveLength(15);
    expect(
      geometry.filter((sheet) => sheet.subjectId === "ayt-geometri"),
    ).toHaveLength(4);
  });
});
