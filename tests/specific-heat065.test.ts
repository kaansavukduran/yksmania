import { describe, expect, it } from "vitest";
import { heatMaterialRows, heatMaterials, heatPerGramCal, temperatureRise } from "../src/learning/specificHeat065";
import { specificHeatFigure } from "../src/learning/sectionFigures/specificHeatFigure065";

describe("öz ısı birimleri ve sıcaklık artışı", () => {
  it("malzemeleri aynı kaynak dizisinden, demiri düzeltilmiş kalori karşılığıyla verir", () => {
    expect(heatMaterials.map(({ specific }) => specific)).toEqual([900, 387, 129, 448, 234, 4186, 140]);
    expect(heatPerGramCal(448)).toBeCloseTo(0.1070746, 6);
    expect(heatMaterialRows).toContainEqual(["Demir", "448", "0,107"]);
    expect(specificHeatFigure.draw(0, 1).readout?.[0]).toContain("Demir yaklaşık 0,107");
  });

  it("aynı kütle ve enerjiyle sıcaklık değişiminin öz ısıya ters orantısını korur", () => {
    expect(temperatureRise(4186, 1, 4186)).toBe(1);
    expect(temperatureRise(4186, 1, 448)).toBeCloseTo(9.34375, 6);
    expect(temperatureRise(8372, 1, 448)).toBeCloseTo(18.6875, 6);
    expect(temperatureRise(4186, 2, 4186)).toBe(0.5);
  });
});
