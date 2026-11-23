import { describe, expect, it } from "vitest";
import { rigidGasExperiments, rigidGasSection, rigidGasState } from "../src/learning/mebiRigidGasReadings";
import { rigidGasQuestionFigures } from "../src/learning/rigidGasQuestion087";

describe("rijit kapta tek niceliği değiştirmek", () => {
  it("kaynağın üç basınç çiftini yeniden üretir", () => {
    expect(rigidGasExperiments.map((item) => rigidGasState(item, 1).pressureAtm)).toEqual([1, 2, 1]);
    expect(rigidGasExperiments.map((item) => rigidGasState(item, 2).pressureAtm)).toEqual([2, 1, 2]);
    expect(rigidGasSection.table?.rows.map((row) => row.slice(2))).toEqual([["1 atm", "2 atm"], ["2 atm", "1 atm"], ["1 atm", "2 atm"]]);
  });

  it("aynı anda yalnız seçilen gaz niceliğini değiştirir", () => {
    const factor = 1.5;
    expect(rigidGasState(rigidGasExperiments[0], factor)).toEqual({ amount: 1, temperature: 1.5, volume: 1, pressureAtm: 1.5 });
    expect(rigidGasState(rigidGasExperiments[1], factor)).toEqual({ amount: 1, temperature: 1, volume: 1.5, pressureAtm: 4 / 3 });
    expect(rigidGasState(rigidGasExperiments[2], factor)).toEqual({ amount: 1.5, temperature: 1, volume: 1, pressureAtm: 1.5 });
  });

  it("ısıtma sorusunun sonucu kök ve ipucunda görünmez", () => {
    expect(rigidGasQuestionFigures.figure.alt).toContain("son basınç bilinmiyor");
    expect(rigidGasQuestionFigures.hintFigure.alt).toContain("Kap genişlemiyor");
    expect(JSON.stringify(rigidGasQuestionFigures.figure)).not.toContain("120 kPa");
    expect(JSON.stringify(rigidGasQuestionFigures.hintFigure)).not.toContain("120 kPa");
    expect(rigidGasQuestionFigures.stepFigures[2].alt).toContain("120 kilopaskal");
  });
});
