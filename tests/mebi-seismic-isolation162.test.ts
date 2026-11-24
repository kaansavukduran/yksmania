import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { isolationExample, isolationTitle, shakingDamageTitle } from "../src/learning/mebiSeismicIsolation";
import { golbasiDamagePhoto, pasadenaBearingPhoto } from "../src/learning/sectionFigures/mebiSeismicObservationsPhotos";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("keeps both original photos with the independently checked source digests", () => {
  for (const [file, photo] of [
    ["golbasi-damage-adem-cc-by-sa.jpg", golbasiDamagePhoto],
    ["pasadena-bearing-keithalanporter-cc-by-sa.jpg", pasadenaBearingPhoto],
  ] as const) {
    const bytes = readFileSync(new URL(`../src/assets/${file}`, import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(photo.figure.assetSHA256);
    expect(photo.url).toContain("oldid=");
    expect(photo.licenceLabel).toBe("CC BY-SA 4.0");
  }
});

test("links the observation and a separate comparison in the active course", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.source).toContain("Fiziksel 168, basılı 166");
  for (const title of [shakingDamageTitle, isolationTitle]) {
    expect(guide?.sections.some(section => section.figureTitle === title)).toBe(true);
  }
  expect(guide?.examples).toContainEqual(isolationExample);
  const comparison = sectionFigures["ses-deprem-dalgalari"][isolationTitle];
  const direct = comparison.draw(0, 0);
  const isolated = comparison.draw(0, 1);
  expect(direct.els.filter(element => element.k === "poly")).toHaveLength(2);
  expect(isolated.els.filter(element => element.k === "poly")).toHaveLength(4);
  expect(direct.readout).toContain("Temel ve üst yapı doğrudan bağlı. Kesitte ayrı bir hareket katmanı yok.");
  expect(isolated.readout).toContain("İzolatör temel ile üst yapı arasında. Bağlantıda göreli yatay hareket olabilir.");
});
