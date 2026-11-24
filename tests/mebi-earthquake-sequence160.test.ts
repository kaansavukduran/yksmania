import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { afterMainTitle, earthquakeSequenceTitle, visibleEarthquakes } from "../src/learning/mebiEarthquakeSequence";
import { seismicFrontRadiusKm, seismicWavefrontTitle } from "../src/learning/mebiSeismicWavefront";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("the first event is a foreshock only after the larger event has been observed", () => {
  expect(visibleEarthquakes(0)).toEqual([{ hour: 0, magnitude: 4.3, label: "İlk kayıt" }]);
  expect(visibleEarthquakes(1)).toEqual([
    { hour: 0, magnitude: 4.3, label: "Öncü" },
    { hour: 2, magnitude: 5.8, label: "Ana deprem" },
  ]);
  expect(visibleEarthquakes(2).at(-1)).toEqual({ hour: 8, magnitude: 4.4, label: "Artçı" });
  const pack = sectionFigures["ses-deprem-dalgalari"];
  expect(pack[earthquakeSequenceTitle].draw(0, 0).readout).toEqual(["İlk kayıt. Saat 0, M 4,3."]);
  expect(pack[afterMainTitle].draw(0, 0).readout).toContain("Artçı. Saat 8, M 4,4.");
});

test("the current wavefront stays under the surface and uses the focus speed", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.sections.find(({ title }) => title === seismicWavefrontTitle)?.figureTitle).toBe(seismicWavefrontTitle);
  const wavefront = sectionFigures["ses-deprem-dalgalari"][seismicWavefrontTitle];
  expect(seismicFrontRadiusKm(0.75)).toBe(4.5);
  expect(wavefront.draw(0.75, 0).readout).toContain("Cephe dış merkeze henüz erişmedi.");
  expect(wavefront.draw(1, 0).readout).toContain("Cephe dış merkeze erişti.");
  const front = wavefront.draw(1.5, 0).els.filter((element) => element.k === "poly").at(-1);
  expect(front?.k).toBe("poly");
  if (front?.k === "poly") {
    expect(front.ps.every(([, y]) => y <= 0)).toBe(true);
    for (const [x, y] of front.ps) expect(Math.hypot(x,y + 6)).toBeCloseTo(9, 7);
  }
});
