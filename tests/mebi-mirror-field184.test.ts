import { describe, expect, test } from "vitest";
import { mirrorFieldAt, mirrorFieldExample, mirrorFieldMethods, mirrorFieldTitle } from "../src/learning/mebiMirrorField";
import { mirrorFieldFigures } from "../src/learning/sectionFigures/mebiMirrorFieldFigures";
import { angleAt } from "../src/learning/sectionFigures/figureKit";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";

describe("physical page 179 plane mirror light paths", () => {
  test.each([-1.5, -1, 0, 1, 1.5])("the three constructions agree when E is at %s", (eyeX) => {
    const { eye, virtualEye, edges } = mirrorFieldAt(eyeX);
    expect(virtualEye).toEqual([eye[0], -eye[1]]);
    for (const edge of edges) {
      const [mx, my] = edge.end;
      const [bx, by] = edge.boundary;
      // The virtual-eye line and the outgoing line have the same slope.
      const cross = (mx - virtualEye[0]) * (by - my) - (my - virtualEye[1]) * (bx - mx);
      expect(cross).toBeCloseTo(0, 10);
      expect(angleAt(edge.end, eye, edge.normalAtEyeHeight)).toBeCloseTo(
        angleAt(edge.end, edge.boundary, edge.normalAtEyeHeight), 10,
      );
      expect(eye[0] + bx).toBeCloseTo(2 * mx, 10);
    }
    const fields = mirrorFieldMethods.map((_, method) =>
      mirrorFieldFigures[mirrorFieldTitle].draw(eyeX, method).els.find((item) => item.k === "poly"),
    );
    expect(fields[0]).toEqual(fields[1]);
    expect(fields[0]).toEqual(fields[2]);
    expect(edges[1].boundary[0] - edges[0].boundary[0]).toBe(8);
  });

  test("study sheet retains distinct drawings and the computed answer", () => {
    const sheet = studyCheatSheet("duzlem-ayna");
    expect(sheet?.examples.some((example) => example.title === mirrorFieldExample.title)).toBe(true);
    expect(mirrorFieldExample.steps.map((step) => step.figureTitle)).toEqual([...mirrorFieldMethods]);
    expect(mirrorFieldExample.answer).toContain("−3 ile 5");
  });
});
