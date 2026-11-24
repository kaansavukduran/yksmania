import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { roomAcousticsTitle, roomDelayMs, roomDirectM, roomReflectedEnergy, roomReflectedM } from "../src/learning/mebiRoomAcoustics";
import { roomAcousticsFigures } from "../src/learning/sectionFigures/mebiRoomAcousticsFigures";
import { selimiyePhoto as photo } from "../src/learning/sectionFigures/mebiSelimiyePhoto";

test("the source photo shows the verified interior with the original attribution", () => {
  const bytes = readFileSync(new URL("../src/assets/selimiye-interior-rofi44wik-cc-by-sa.jpg", import.meta.url));
  expect(createHash("sha256").update(bytes).digest("hex")).toBe(photo.figure.assetSHA256);
  expect([photo.figure.width, photo.figure.height]).toEqual([960, 835]);
  expect(photo.licence).toBe("https://creativecommons.org/licenses/by-sa/3.0/");
});

test("path lengths stay fixed while each energy bar is drawn to scale", () => {
  const draw = roomAcousticsFigures[roomAcousticsTitle].draw;
  const measure = (amount: number) => draw(amount, 0, -1).els.filter(el => el.k === "vec")
    .map(({ a, b }) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const lengths = measure(0);
  expect(lengths).toHaveLength(3);
  [8, 5, 5].forEach((expected, index) => expect(lengths[index]).toBeCloseTo(expected, 12));
  expect(measure(90)).toEqual(measure(0));
  expect(roomReflectedM - roomDirectM).toBe(2);
  expect(roomDelayMs).toBeCloseTo(5.88235, 5);
  for (const amount of [20, 60, 90]) {
    const bars = draw(amount, 1, -1).els.filter(el => el.k === "poly")
      .map(({ ps }) => ps[1][0] - ps[0][0]);
    expect(bars[1] / bars[0]).toBeCloseTo(amount / 100, 12);
    expect(bars[3] / bars[2]).toBeCloseTo(roomReflectedEnergy(amount) / 100, 12);
  }
});
