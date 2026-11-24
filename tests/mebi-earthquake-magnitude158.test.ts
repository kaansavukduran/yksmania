import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import {
  localIntensityTitle, magnitudeDifferenceTitle, magnitudeExample, magnitudeRatios, magnitudeRatioTitle, magnitudeScaleTitle, magnitudeTitle,
} from "../src/learning/mebiEarthquakeMagnitude";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("one event uses one magnitude and has separate local observations", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.source).toContain("Fiziksel 167, basılı 165");
  expect(guide?.sections.find(({ title }) => title === magnitudeTitle)?.figureTitle).toBe(magnitudeTitle);
  expect(guide?.examples).toContainEqual(magnitudeExample);
  expect(magnitudeExample.steps.map(({ figureTitle }) => figureTitle)).toEqual([
    magnitudeDifferenceTitle, magnitudeScaleTitle, localIntensityTitle,
  ]);

  const model = sectionFigures["ses-deprem-dalgalari"][magnitudeTitle];
  expect(model.draw(1, 0).readout).toEqual(model.draw(2, 0).readout);
  expect(model.draw(1, 0).readout).toEqual([
    "İki gözlem aynı M 6 depremini anlatıyor.",
    "A’da eşyalar sallandı. B’de duvarlarda çatlak görüldü. Çizim örnek gözlemleri gösteriyor.",
  ]);
});

test("genlik and approximate energy use different exponents on the same log scale", () => {
  const model = sectionFigures["ses-deprem-dalgalari"][magnitudeRatioTitle];
  expect(magnitudeRatios(0)).toEqual({ amplitude: 1, energy: 1 });
  expect(magnitudeRatios(1)).toEqual({ amplitude: 10, energy: 10 ** 1.5 });
  expect(magnitudeRatios(2)).toEqual({ amplitude: 100, energy: 1000 });
  const both = model.draw(2, 1).els.filter((element) => element.k === "circle");
  expect(both).toHaveLength(2);
  expect(model.draw(2, 1).readout).toEqual([
    "Büyüklük farkı 2. Genlik oranı 100 kat.",
    "Yaklaşık enerji oranı 1.000 kat. Ölçekte bir aralık, on kat.",
  ]);
});
