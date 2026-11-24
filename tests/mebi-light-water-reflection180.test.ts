import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { angledReflectionTitle, directReflectionTitle, lightWaterReflectionExample, lightWaterReflectionTitle } from "../src/learning/mebiLightWaterReflection";
import { sectionFigures, sectionPhotoGroups } from "../src/learning/sectionFigures/registry";

test("the optical and water arrows reflect the same direction, perpendicular to each wavefront", () => {
  const fig = sectionFigures["duzlem-ayna"][lightWaterReflectionTitle];
  for (const angle of [0, 35, 60]) {
    const [incoming, outgoing] = [0, 1].map(step => fig.draw(angle, step));
    for (const [index, frame] of [incoming, outgoing].entries()) {
      const arrows = frame.els.filter(el => el.k === "vec");
      expect(arrows).toHaveLength(2);
      const uv = arrows.map(({ a, b }) => [b[0] - a[0], b[1] - a[1]]);
      expect(uv[0][0]).toBeCloseTo(uv[1][0]);
      expect(uv[0][1]).toBeCloseTo(uv[1][1]);
      expect(Math.acos(uv[index][1] * (index ? 1 : -1) / Math.hypot(...uv[index])) * 180 / Math.PI).toBeCloseTo(angle);
      for (const { a, b } of frame.els.filter(el => el.k === "seg").slice(-3)) {
        expect((b[0] - a[0]) * uv[0][0] + (b[1] - a[1]) * uv[0][1]).toBeCloseTo(0, 12);
      }
    }
  }
});

test("the source images and worked example remain in their separate teaching roles", () => {
  const photos = sectionPhotoGroups["duzlem-ayna"][lightWaterReflectionTitle].photos;
  expect(photos.map(({ figure }) => [figure.width, figure.height])).toEqual([[960, 601], [960, 640], [960, 720]]);
  expect(photos.every(({ figure, url }) => /^[a-f0-9]{64}$/.test(figure.assetSHA256 ?? "") && /oldid=\d+/.test(url))).toBe(true);
  expect(studyCheatSheet("detail-133")?.examples.find(example => example.title === lightWaterReflectionExample.title)?.stepFigures)
    .toEqual([directReflectionTitle, angledReflectionTitle]);
});
