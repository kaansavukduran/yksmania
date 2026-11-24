import { expect, test } from "vitest";
import { magneticResonanceTitle, resonanceFrequency } from "../src/learning/mebiMagneticResonance";
import { magneticResonanceFigures } from "../src/learning/sectionFigures/mebiMagneticResonanceFigures";

test("sample frequency markers align only at the labelled resonance", () => {
  const draw = magneticResonanceFigures[magneticResonanceTitle].draw;
  const positions = (frequency: number) => draw(frequency, 0, -1).els.filter(el => el.k === "circle").map(({ c }) => c[0]);
  const [signal, incoming] = positions(resonanceFrequency);
  expect(signal).toBe(incoming);
  const early = positions(85);
  const late = positions(115);
  expect(early[0]).toBe(late[0]);
  expect(early[1]).toBeLessThan(signal);
  expect(late[1]).toBeGreaterThan(signal);
  expect(draw(85, 0, -1).readout?.[1]).toContain("İşaretler ayrı.");
  expect(draw(resonanceFrequency, 0, -1).readout?.[1]).toContain("İki frekans eşleşiyor.");
  expect(draw(resonanceFrequency, 1, -1).readout?.[0]).toContain("alıcı bobin sinyali ölçer");
});
