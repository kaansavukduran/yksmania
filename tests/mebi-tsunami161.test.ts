import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { tsunamiAt, tsunamiDepthTitle, tsunamiExample, tsunamiFormationTitle } from "../src/learning/mebiTsunamiFormation";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("the example uses the same physical scale for both depths and keeps the same period", () => {
  const deep = tsunamiAt(4000);
  const shallow = tsunamiAt(100);
  expect(deep.speedMS).toBeCloseTo(197.99, 2);
  expect(shallow.speedMS).toBeCloseTo(31.305, 2);
  expect(deep.wavelengthKm).toBeCloseTo(118.794, 2);
  expect(shallow.wavelengthKm).toBeCloseTo(18.783, 2);
  expect(deep.speedMS / shallow.speedMS).toBeCloseTo(Math.sqrt(40), 9);
  expect(deep.wavelengthKm / shallow.wavelengthKm).toBeCloseTo(Math.sqrt(40), 9);
});

test("links where the water rises, where it travels and how the wavelengths compare", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.sections.some(({ title, figureTitle }) => title === tsunamiFormationTitle && figureTitle === title)).toBe(true);
  expect(guide?.examples).toContainEqual(tsunamiExample);
  const figures = sectionFigures["ses-deprem-dalgalari"];
  expect(figures[tsunamiFormationTitle].draw(0, 0).readout).toEqual(["Taban ve su yüzeyi başlangıçta yerinde."]);
  expect(figures[tsunamiFormationTitle].draw(0, 1).readout).toEqual(["Tabanın bir bölümü yükseldi. Üstündeki su da yükseliyor."]);
  expect(figures[tsunamiFormationTitle].draw(0, 2).readout).toEqual(["Yüzey dalgaları kaynaktan uzaklaşıyor."]);
  expect(figures[tsunamiDepthTitle].draw(4000, 0).readout).toEqual([
    "Seçilen derinlik 4.000 m. Sürat 198 m/s, dalga boyu 118,8 km.",
    "Referans derinlik 100 m. Sürat 31,3 m/s, dalga boyu 18,8 km.",
  ]);
});
