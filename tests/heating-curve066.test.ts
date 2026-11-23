import { describe, expect, it } from "vitest";
import { heatingPoints } from "../src/learning/heatingCurve066";
import { heatingCurveFigure } from "../src/learning/sectionFigures/heatingCurveFigure066";

describe("ısıtma eğrisi", () => {
  it("eğimli ve yatay aşamaları doğru birikimli ısıya yerleştirir", () => {
    const points = heatingPoints();
    expect(points.map((point) => point.temperature)).toEqual([-20, 0, 0, 100, 100, 120]);
    expect(points.map((point) => Number(point.totalKj.toFixed(2)))).toEqual([0, 4.2, 37.6, 79.6, 305.6, 309.6]);
    expect(heatingCurveFigure.draw(100, 1).readout?.[2]).toBe("Yalnız bu aralığın ısısı 33,4 kJ.");
  });

  it("kütle %50 arttığında tüm ısı aralıklarını %50 büyütür ve faz sıcaklıklarını korur", () => {
    const regular = heatingPoints(0.1);
    const heavier = heatingPoints(0.15);
    for (const [i, point] of heavier.entries()) {
      expect(point.temperature).toBe(regular[i].temperature);
      expect(point.totalKj).toBeCloseTo(1.5 * regular[i].totalKj, 8);
    }
  });
});
