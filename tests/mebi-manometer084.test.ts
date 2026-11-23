import { describe, expect, it } from "vitest";
import { manometerLayouts, manometerReading, manometerReferenceSection } from "../src/learning/mebiManometerReadings";
import { manometerQuestionFigures } from "../src/learning/manometerQuestion084";

describe("MEBİ fiziksel sayfa 142 manometre modeli", () => {
  it("gösterge farkını ters çevirebilir, kapalı uçta referansı değiştirir", () => {
    expect(manometerLayouts.map((layout) => manometerReading(5, layout).gasPressure))
      .toEqual([75, 65, 5]);
    expect(manometerLayouts.map((layout) => manometerReading(0, layout).gasPressure))
      .toEqual([70, 70, 0]);
  });

  it("5 cm fark çizimde doğru yönde ve bağımsız hacim kontrolüyle görünür", () => {
    for (const [direction, layout] of [[1, manometerLayouts[0]], [-1, manometerLayouts[1]], [1, manometerLayouts[2]]] as const) {
      const { gasLevel, referenceLevel } = manometerReading(5, layout);
      expect(referenceLevel - gasLevel).toBeCloseTo(direction);
      expect(referenceLevel + gasLevel).toBeCloseTo(5.3);
    }
  });

  it("Kopya Kağıdı kaynaktaki 70 ve 75 cmHg değerini taşır", () => {
    expect(manometerReferenceSection.table?.rows).toEqual([
      ["Açık uç, gaz yüzeyi alçak", "70 cmHg", "75 cmHg"],
      ["Açık uç, gaz yüzeyi yüksek", "70 cmHg", "65 cmHg"],
      ["Kapalı uç, yaklaşık vakum", "0 cmHg", "5 cmHg"],
    ]);
  });

  it("özgün su sorusu, basınç farkını ve mutlak basıncı ayrı çözüm çizimlerine koyar", () => {
    expect(manometerQuestionFigures.figure.alt).toContain("0,2 metre alçak");
    expect(manometerQuestionFigures.hintFigure.alt).toContain("aynı seviyede");
    expect(JSON.stringify(manometerQuestionFigures.figure)).not.toContain("102000");
    expect(JSON.stringify(manometerQuestionFigures.hintFigure)).not.toContain("102000");
    expect(manometerQuestionFigures.stepFigures[1].alt).toContain("2000 paskal");
    expect(manometerQuestionFigures.stepFigures[2].alt).toContain("102000 paskal");
  });
});
