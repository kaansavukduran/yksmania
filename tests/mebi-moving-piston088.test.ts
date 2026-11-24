import { describe, expect, it } from "vitest";
import { movingPistonSection, movingPistonState, pistonChanges } from "../src/learning/mebiMovingPiston";

describe("hareketli pistonun son dengesi", () => {
  it("başlangıçtaki gaz basıncı atmosfer ve yük katkısını toplar", () => {
    for (const change of pistonChanges) {
      expect(movingPistonState(change, 1)).toEqual({ atmosphere: 1, load: 0.2, pressure: 1.2, volume: 1 });
    }
  });

  it("ısıtma ve gaz ekleme aynı yükte basıncı korur", () => {
    for (const change of [pistonChanges[0], pistonChanges[1]]) {
      const final = movingPistonState(change, 1.5);
      expect(final.pressure).toBe(1.2);
      expect(final.volume).toBeCloseTo(1.5);
    }
  });

  it("aynı sıcaklıkta yük veya dış basınç artarsa son hacim küçülür", () => {
    const heavier = movingPistonState(pistonChanges[2], 2);
    const strongerAtmosphere = movingPistonState(pistonChanges[3], 2);
    expect(heavier.pressure).toBe(1.4);
    expect(strongerAtmosphere.pressure).toBe(2.2);
    expect(heavier.volume).toBeCloseTo(6 / 7);
    expect(strongerAtmosphere.volume).toBeCloseTo(6 / 11);
    expect(movingPistonSection.table?.rows.map((row) => row[2])).toEqual(["Büyür", "Büyür", "Küçülür", "Küçülür"]);
  });
});
