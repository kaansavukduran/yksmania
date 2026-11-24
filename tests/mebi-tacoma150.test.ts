import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { tacomaDeckTitle, tacomaTitle } from "../src/learning/mebiTacoma";
import { tacomaFigures } from "../src/learning/sectionFigures/mebiTacomaFigures";
import { tacomaPhotos } from "../src/learning/sectionFigures/mebiTacomaPhotos";

test("the original archival frames are bundled and credited to their verified archive", () => {
  const files = ["tacoma-narrows-barney-elliot-64s.webp", "tacoma-narrows-barney-elliot-122s.webp"];
  for (const [index, { figure, credit, licence }] of tacomaPhotos.entries()) {
    const file = readFileSync(new URL(`../src/assets/${files[index]}`, import.meta.url));
    expect(createHash("sha256").update(file).digest("hex")).toBe(figure.assetSHA256);
    expect([figure.width, figure.height]).toEqual([640, 480]);
    expect(credit).toBe("Barney Elliot, Prelinger Arşivi");
    expect(licence).toBe("https://creativecommons.org/publicdomain/certification/1.0/us/");
  }
});

test("only the rotational cross-section moves its two edges in opposite directions", () => {
  const graph = tacomaFigures[tacomaTitle];
  const heights = (step: number) => graph.draw(0, step, -1).els.filter(el => el.k === "vec")
    .map(({ a, b }) => Math.sign(b[1] - a[1]));
  expect(heights(0)).toEqual([1, 1]);
  expect(heights(1)).toEqual([1, -1]);
  const markers = graph.draw(0, 1, -1).els.filter(el => el.k === "circle");
  const [left, right, axis] = markers.map(({ c }) => c);
  expect(left[1]).toBeGreaterThan(axis[1]);
  expect(right[1]).toBeLessThan(axis[1]);
  expect((left[1] + right[1]) / 2).toBeCloseTo(axis[1], 12);
  expect(tacomaFigures[tacomaDeckTitle].draw(0, 0, -1)).toEqual(graph.draw(0, 1, -1));
});
