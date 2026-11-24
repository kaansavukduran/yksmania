import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { commonNormalTitle, roughSurfaceExample, roughSurfaceTitle, tiltedNormalsTitle } from "../src/learning/mebiRoughSurfaceReflection";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { dot, sub, unit } from "../src/learning/sectionFigures/figureKit";

test("each surface uses its own perpendicular normal, with equal incidence and reflected angles", () => {
  const fig = sectionFigures["duzlem-ayna"][roughSurfaceTitle];
  expect(fig.draw(0, 0).readout?.[1]).toContain("35° · 35° · 35°");
  expect(fig.draw(20, 0).readout?.[1]).toContain("15° · 45° · 28,3°");
  for (const value of [0, 15, 20]) {
    const shape = fig.draw(value, 0).els;
    for (let i = 0; i < 24; i += 4) {
      const [surface, normal, incident, reflected] = shape.slice(i, i + 4);
      if (surface.k !== "seg" || normal.k !== "seg" || incident.k !== "vec" || reflected.k !== "vec") throw Error("Missing individual light path");
      const n = unit(sub(normal.b, normal.a));
      expect(dot(n, unit(sub(surface.b, surface.a)))).toBeCloseTo(0, 12);
      expect(dot(n, unit(sub(incident.a, incident.b)))).toBeCloseTo(dot(n, unit(sub(reflected.b, reflected.a))), 12);
    }
  }
  expect(studyCheatSheet("detail-133")?.examples.find(example => example.title === roughSurfaceExample.title)?.stepFigures)
    .toEqual([commonNormalTitle, tiltedNormalsTitle]);
});
