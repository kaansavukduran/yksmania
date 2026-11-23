import { describe, expect, it } from "vitest";
import { atmosphereReadings, atmosphereSection, barometerColumn } from "../src/learning/mebiBarometerReadings";
import { barometerQuestionFigures } from "../src/learning/barometerQuestion086";

describe("barometrede düşey bileşen", () => {
  it("kaynağın iki atmosfer basıncını ve cmHg sütununu eşler", () => {
    expect(atmosphereReadings).toEqual([{ altitude: 0, pressure: 760 }, { altitude: 1500, pressure: 650 }]);
    expect(atmosphereSection.table?.rows).toEqual([
      ["0 m", "760 mmHg", "76 cm"],
      ["1.500 m", "650 mmHg", "65 cm"],
    ]);
    expect(barometerColumn(650, 1, 0)).toEqual({ heightCm: 65, tubeLengthCm: 65 });
  });

  it("düşey yükselişi eğimden bağımsız bırakır ve yoğunlukla ters ölçekler", () => {
    expect(barometerColumn(760, 1, 60).heightCm).toBe(76);
    expect(barometerColumn(760, 1, 60).tubeLengthCm).toBeCloseTo(152);
    expect(barometerColumn(760, 0.5, 60).heightCm).toBe(152);
    expect(barometerColumn(760, 0.5, 60).tubeLengthCm).toBeCloseTo(304);
    expect(barometerColumn(650, 1.5, 60).heightCm).toBeCloseTo(65 / 1.5);
  });

  it("özgün soru ve ipucu iki katını öğrenciye önceden açmaz", () => {
    expect(barometerQuestionFigures.figure.alt).toContain("düşey yüksekliği h");
    expect(barometerQuestionFigures.hintFigure.alt).toContain("Dış basınç ve yerçekimi sabit");
    expect(JSON.stringify(barometerQuestionFigures.figure)).not.toContain("iki katı");
    expect(JSON.stringify(barometerQuestionFigures.hintFigure)).not.toContain("iki katı");
    expect(barometerQuestionFigures.stepFigures[2].alt).toBe("Yeni düşey yükseklik, ilk yüksekliğin iki katı.");
  });
});
