import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { ultrasoundDepthCm, ultrasoundSpeedMS, ultrasoundTitle } from "../src/learning/mebiUltrasound";
import { ultrasoundFigures } from "../src/learning/sectionFigures/mebiUltrasoundFigures";
import { ultrasoundPhoto } from "../src/learning/sectionFigures/mebiUltrasoundPhoto";

test("the licensed clinical photograph is bundled with its observed dimensions", () => {
  const original = readFileSync(new URL("../src/assets/abdominal-ultrasound-goleisureintl-cc-by.jpg", import.meta.url));
  expect(createHash("sha256").update(original).digest("hex")).toBe(ultrasoundPhoto.figure.assetSHA256);
  expect([ultrasoundPhoto.figure.width, ultrasoundPhoto.figure.height]).toEqual([1300, 866]);
  expect(ultrasoundPhoto.credit).toBe("Goleisureintl");
  expect(ultrasoundPhoto.licence).toBe("https://creativecommons.org/licenses/by/4.0/");
});

test("equal speed and twice the delay mean twice the depth, with oppositely directed paired paths", () => {
  expect(ultrasoundSpeedMS).toBe(1540);
  expect(ultrasoundDepthCm(50)).toBeCloseTo(3.85, 12);
  expect(ultrasoundDepthCm(100)).toBeCloseTo(7.7, 12);
  expect(ultrasoundDepthCm(140)).toBeCloseTo(10.78, 12);
  const draw = ultrasoundFigures[ultrasoundTitle].draw;
  const directions = draw(100, 1, -1).els.filter(el => el.k === "vec").map(({ a, b }) => b[1] - a[1]);
  expect(directions).toHaveLength(4);
  expect(directions[0]).toBeLessThan(0);
  expect(directions[0]).toBeCloseTo(-directions[1], 12);
  expect(directions[2]).toBeLessThan(directions[0]);
  expect(directions[2]).toBeCloseTo(-directions[3], 12);
});
