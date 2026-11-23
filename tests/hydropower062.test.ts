import { describe, expect, it } from "vitest";
import { hydropowerAt } from "../src/learning/hydropower062";
import { hydropowerFigure } from "../src/learning/sectionFigures/hydropowerFigure062";

describe("hidroelektrik yükseklik farkı", () => {
  it("eş debide her örnek için güç girişini elektrik ve diğer aktarıma ayırır", () => {
    for (const [head, input, electricity, other] of [
      [5, 100_000, 75_000, 25_000],
      [10, 200_000, 150_000, 50_000],
      [15, 300_000, 225_000, 75_000],
      [20, 400_000, 300_000, 100_000],
    ]) {
      expect(hydropowerAt(head)).toEqual({
        massPerSecond: 2_000,
        inputWatts: input,
        electricalWatts: electricity,
        otherWatts: other,
      });
      expect(electricity + other).toBe(input);
    }
  });

  it("çizilen yükseklik ile elektrik çıktısını aynı seçili değerden üretir", () => {
    expect(hydropowerFigure.draw(5, 0)?.readout?.[0]).toContain("5 m alçalıyor. Su gücü 100 kW.");
    expect(hydropowerFigure.draw(20, 2)?.readout?.[0]).toContain("Elektrik çıkışı 300 kW.");
    expect(hydropowerFigure.draw(20, 2)?.readout?.[0]).toContain("100 kW");
  });
});
