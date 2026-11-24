import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { mirrorEndpointsExample, mirrorEndpointsTitle, mirrorJoinedTitle, mirrorKTitle, mirrorLTitle } from "../src/learning/mebiMirrorEndpoints";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { dist, sub, unit } from "../src/learning/sectionFigures/figureKit";

test("two reflected rays for each endpoint have collinear virtual extensions behind the mirror", () => {
  const model = sectionFigures["duzlem-ayna"][mirrorEndpointsTitle];
  for (const step of [0, 1]) {
    const scene = model.draw(0, step);
    const rays = scene.els.filter(el => el.k === "vec");
    const extensions = scene.els.filter(el => el.k === "seg").filter(el => el.dash);
    expect(rays).toHaveLength(4);
    expect(extensions).toHaveLength(2);
    for (let i = 0; i < 2; i++) {
      const [incident, reflected] = rays.slice(2 * i, 2 * i + 2);
      const extension = extensions[i];
      expect(incident.b).toEqual(reflected.a);
      expect(reflected.a).toEqual(extension.a);
      expect(reflected.b[0]).toBeLessThan(0);
      expect(extension.b[0]).toBeGreaterThan(0);
      expect(incident.a[0]).toBe(-extension.b[0]);
      expect(incident.a[1]).toBe(extension.b[1]);
      const [x, y] = unit(sub(incident.b, incident.a));
      const [rx, ry] = unit(sub(reflected.b, reflected.a));
      expect(rx).toBeCloseTo(-x, 12);
      expect(ry).toBeCloseTo(y, 12);
    }
  }
  const result = model.draw(0, 2).els.filter(el => el.k === "seg").filter(el => el.tone === "a" || el.tone === "b");
  expect(result).toHaveLength(2);
  expect(dist(result[0].a, result[0].b)).toBeCloseTo(dist(result[1].a, result[1].b), 12);
  expect(studyCheatSheet("detail-133")?.examples.find(example => example.title === mirrorEndpointsExample.title)?.stepFigures)
    .toEqual([mirrorKTitle, mirrorLTitle, mirrorJoinedTitle]);
});
