import { describe, expect, it } from "vitest";
import { weightedBalance, xCapacity, yCapacity } from "../src/learning/weightedThermalBalance067";
import { weightedBalanceFigure } from "../src/learning/sectionFigures/weightedThermalBalanceFigure067";

describe("eş olmayan ısı sığaları", () => {
  it("farklı kütle ve öz ısıdan sığaları ve korunmuş enerjiyi hesaplar", () => {
    expect([xCapacity, yCapacity]).toEqual([800, 300]);
    expect(weightedBalance(75)).toEqual({
      midpoint: 47.5, equilibrium: 60, xHeat: -12000, yHeat: 12000,
    });
    for (const t of [45, 55, 65, 75, 85]) {
      const result = weightedBalance(t);
      expect(Math.abs(t - result.equilibrium)).toBeLessThan(Math.abs(20 - result.equilibrium));
      expect(result.xHeat + result.yHeat).toBeCloseTo(0, 9);
    }
  });

  it("sığalar eşitken ortalama ve dengeyi aynı noktaya getirir", () => {
    expect(weightedBalance(75, 400, 400).equilibrium).toBe(47.5);
    expect(weightedBalanceFigure.draw(75, 0).readout?.[0]).toBe("Orta nokta 47,5 °C. Denge 60 °C.");
  });
});
