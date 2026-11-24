import { describe, expect, it } from "vitest";
import { boilingEnvironments, meltingCases, pressureMeltingSection, waterBoilingState, waterSaturation } from "../src/learning/mebiPhasePressure";

describe("basınç ve hâl değişimi", () => {
  it("saf suyun referans basınçlarını NIST tablosundaki sayılarla eşler", () => {
    expect(waterSaturation.map(({ temperature, pressure }) => [temperature, pressure])).toEqual([
      [90, 70.1818], [100, 101.418], [110, 143.379], [120, 198.674],
    ]);
    expect(waterBoilingState(90, boilingEnvironments[0])).toEqual({ vaporPressure: 70.1818, externalPressure: 70.1818, boiling: 0 });
    expect(waterBoilingState(90, boilingEnvironments[1]).boiling).toBe(-1);
    expect(waterBoilingState(110, boilingEnvironments[2]).boiling).toBe(-1);
    expect(waterBoilingState(120, boilingEnvironments[2]).boiling).toBe(0);
    expect(waterBoilingState(120, boilingEnvironments[1]).boiling).toBe(1);
  });

  it("erime yönünü tabloyla aynı iki örnekte gösterir", () => {
    expect(meltingCases.map(({ slope }) => slope)).toEqual([-1, 1]);
    expect(pressureMeltingSection.table?.rows).toEqual([["Buz", "Küçülür", "Düşer"], ["Bakır", "Büyür", "Yükselir"]]);
  });
});
