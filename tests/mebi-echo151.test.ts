import { expect, test } from "vitest";
import { echoDistanceM, echoTitle, echoTravelSeconds } from "../src/learning/mebiEcho";
import { echoFigures } from "../src/learning/sectionFigures/mebiEchoFigures";
import { physicsFiguresSound } from "../src/learning/sectionFigures/physicsFiguresSound";

test("the measured time contains two equal legs and the wall stays on the same scale", () => {
  expect([100, 200, 400].map(echoDistanceM)).toEqual([17, 34, 68]);
  const figure = echoFigures[echoTitle];
  const wall = (time: number) => {
    const shape = figure.draw(time, 1, -1).els.find(el => el.k === "poly");
    if (shape?.k !== "poly") throw Error("Wall is missing");
    return shape.ps[0][0];
  };
  expect(wall(400) - wall(200)).toBeCloseTo(2 * (wall(200) - wall(100)), 12);
  const legs = figure.draw(200, 1, -1).els.filter(el => el.k === "vec").map(({ a, b }) => b[0] - a[0]);
  expect(legs).toHaveLength(2);
  expect(legs[0]).toBeGreaterThan(0);
  expect(legs[0]).toBeCloseTo(-legs[1], 12);
});

test("the existing moving pulse arrives at the wall and returns at the actual boundaries", () => {
  const figure = physicsFiguresSound["ses-deprem-dalgalari"]["Yankıda mesafeyi iki kez say"];
  const read = (time: number) => figure.draw(time, 0, -1).readout;
  expect(read(0.29)).toContain("Ses henüz duvara ulaşmadı.");
  expect(read(0.30)).toContain("Ses duvara ulaştı.");
  expect(read(0.59)).toContain("Ses duvardan yansıdı, geri dönüyor.");
  expect(read(echoTravelSeconds)).toContain("Yankı duyuldu. Toplam 204 m, duvara uzaklık 102 m.");
});
