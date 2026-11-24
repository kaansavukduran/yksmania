import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { visibleMirrorExample, visibleMirrorPhotoTitle, visibleMirrorRayTitle, visibleMirrorSection } from "../src/learning/mebiVisibleMirror";
import { visibleMirrorPhoto } from "../src/learning/sectionFigures/mebiVisibleMirrorPhoto";
import { physicsFiguresOptics } from "../src/learning/sectionFigures/physicsFiguresOptics";

test("the teaching photo is the selected licensed JPEG unchanged", () => {
  const bytes = readFileSync(new URL("../src/assets/visible-mirror-sunset-cc0.jpg", import.meta.url));
  expect(bytes.length).toBe(112185);
  expect(createHash("sha256").update(bytes).digest("hex")).toBe(visibleMirrorPhoto.assetSHA256);
  expect(bytes.includes(Buffer.from("Exif\0\0"))).toBe(false);
  expect(visibleMirrorSection.figureTitle).toBe(visibleMirrorPhotoTitle);
});

test("the lesson example uses the existing normal-angle model and its matching calculation", () => {
  const model = physicsFiguresOptics["duzlem-ayna"][visibleMirrorRayTitle];
  expect(visibleMirrorExample.steps[0].figureTitle).toBe(visibleMirrorRayTitle);
  expect(model.draw(35, 0).readout).toEqual(["i = r = 35° · yüzeyle açı 55°"]);
  expect(model.draw(60, 0).readout).toEqual(["i = r = 60° · yüzeyle açı 30°"]);
});
