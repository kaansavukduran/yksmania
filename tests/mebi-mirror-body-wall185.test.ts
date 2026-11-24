import { describe, expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { mirrorBodyTitle, mirrorBodyWallExample, mirrorViewDimensions, mirrorViewIntervals, mirrorWallTitle } from "../src/learning/mebiMirrorBodyWall";
import { angleAt, v } from "../src/learning/sectionFigures/figureKit";

describe("physical page 179 visible body and fixed wall", () => {
  test.each([1, 1.25, 1.5, 2, 2.5])("both boundary rays obey reflection at distance %sm", (distance) => {
    const { eye, wall, lower, upper } = mirrorViewDimensions;
    const ranges = mirrorViewIntervals(distance);
    for (const { plane, range } of [
      { plane: distance, range: ranges.body },
      { plane: wall, range: ranges.wall },
    ]) {
      for (const [index, height] of [lower, upper].entries()) {
        const hit = v(0, height);
        const normal = v(-1, height);
        expect(angleAt(hit, v(-plane, range[index]), normal)).toBeCloseTo(
          angleAt(hit, v(-distance, eye), normal), 10,
        );
      }
    }
    expect(ranges.body[0]).toBeCloseTo(1);
    expect(ranges.body[1]).toBeCloseTo(1.5);
  });

  test("the visible wall widens by half a metre while the visible body stays the same", () => {
    const farther = mirrorViewIntervals(2);
    const closer = mirrorViewIntervals(1);
    expect(farther.wall[0]).toBeCloseTo(0.7);
    expect(farther.wall[1]).toBeCloseTo(1.45);
    expect(closer.wall[0]).toBeCloseTo(0.1);
    expect(closer.wall[1]).toBeCloseTo(1.35);
    expect(closer.wall[1] - closer.wall[0]).toBeCloseTo(1.25);
    expect(farther.wall[1] - farther.wall[0]).toBeCloseTo(0.75);
    expect(farther.body).toEqual(closer.body);
  });

  test("the study sheet links both distinct solution drawings", () => {
    const sheet = studyCheatSheet("detail-133");
    expect(sheet?.examples.some((example) => example.title === mirrorBodyWallExample.title)).toBe(true);
    expect(mirrorBodyWallExample.steps.map(({ figureTitle }) => figureTitle)).toEqual([mirrorBodyTitle, mirrorWallTitle]);
  });
});
