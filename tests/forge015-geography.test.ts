import { describe, expect, it } from "vitest";
import {
  forge015GeographyLessons,
  forge015GeographyGuides,
  forge015GeographyTopics,
  climate015Profiles,
  climate015State,
  turkey015State,
  tectonic015State,
  internal015State,
} from "../src/learning/forge015Geography";

describe("Forge 015 coğrafya öğretimi ve koşullu modeller", () => {
  it("dört doğru başlıkta derin anlatım, adımlı örnek ve bağımsız özgün soru sunar", () => {
    expect(Object.values(forge015GeographyTopics)).toEqual([
      "detail-44",
      "detail-45",
      "detail-46",
      "detail-47",
    ]);
    expect(forge015GeographyLessons).toHaveLength(4);
    for (const lesson of forge015GeographyLessons) {
      const guide = forge015GeographyGuides.find((g) => g.id === lesson.id)!;
      expect(lesson.subjectId).toBe("tyt-cografya");
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      for (const s of guide.sections)
        expect(s.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(guide.examples).toHaveLength(4);
      for (const e of guide.examples) {
        expect(e.steps.length).toBeGreaterThanOrEqual(3);
        expect(e.prompt.length).toBeGreaterThan(30);
        expect(e.check).toBeTruthy();
        expect(e.pitfall).toBeTruthy();
      }
      expect(guide.recall).toHaveLength(4);
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr.length).toBeGreaterThan(35);
        expect(q.hint?.tr).toBeTruthy();
        expect(q.explanation.tr.length).toBeGreaterThan(70);
      }
    }
    const ids = forge015GeographyLessons.flatMap((l) =>
      l.questions.map((q) => q.id),
    );
    expect(new Set(ids).size).toBe(40);
  });
  it("klimografın iki niceliğini, yıllık farkını ve negatif minimumu bağımsız okur", () => {
    const r = climate015State("mediterranean", "north", 6);
    expect(r.monthTemperature).toBe(28);
    expect(r.monthRain).toBe(5);
    expect(r.annualRain).toBe(720);
    expect(r.range).toBe(20);
    expect(r.summerRain).toBe(25);
    expect(r.winterRain).toBe(330);
    expect(climate015State("continental", "north", 0).range).toBe(48);
    expect(climate015State("equatorial", "north", 0).annualRain).toBe(2230);
    expect(climate015State("desert", "north", 6).annualRain).toBe(26);
  });
  it("altı aylık takvim dönüşümünde toplam ve mevsim kanıtı korunur, aylık konum değişir", () => {
    for (const p of climate015Profiles) {
      expect(p.temperatures).toHaveLength(12);
      expect(p.rain).toHaveLength(12);
      expect(p.rain.every((v) => v >= 0 && v <= 500)).toBe(true);
      expect(p.temperatures.every((v) => v >= -40 && v <= 40)).toBe(true);
      for (let month = 0; month < 12; month++) {
        const a = climate015State(p.id, "north", month),
          b = climate015State(p.id, "south", month);
        expect(b.monthTemperature).toBe(p.temperatures[(month + 6) % 12]);
        expect(b.monthRain).toBe(p.rain[(month + 6) % 12]);
        expect(b.annualRain).toBe(a.annualRain);
        expect(b.range).toBe(a.range);
        expect(b.summerRain).toBe(a.summerRain);
        expect(b.winterRain).toBe(a.winterRain);
      }
    }
    expect(climate015State("savanna", "south", 0).monthRain).toBe(250);
  });
  it("Türkiye temsili dizisini ideal düşey sıcaklık deneyinden bağımsız tutar", () => {
    const a = turkey015State("central", 0, "south", "parallel"),
      b = turkey015State("central", 1800, "north", "corridor");
    expect(a.modelTemperature).toBe(20);
    expect(b.modelTemperature).toBe(11);
    expect(b.cooling).toBe(9);
    expect(a.station).toEqual(b.station);
    expect(a.annualRain).toBe(368);
    expect(b.annualRain).toBe(368);
    expect(b.range).toBe(25);
    expect(a.access).toContain("paralel");
    expect(b.access).toContain("koridor");
    expect(b.sunlight).toContain("Kuzey");
    expect(
      turkey015State("black-sea", 3000, "south", "parallel").modelTemperature,
    ).toBe(5);
  });
  it("sırt yaşında tek tarafın hızını kullanır, eş uzaklık eş yaştadır", () => {
    expect(tectonic015State("divergent", 120, 2, 1).ageMa).toBe(6);
    expect(tectonic015State("divergent", 90, 3, 1).ageMa).toBe(3);
    expect(tectonic015State("divergent", 200, 4, 1).ageMa).toBe(5);
    expect(tectonic015State("divergent", 0, 10, 1).ageMa).toBe(0);
    expect(tectonic015State("divergent", 400, 1, 1).ageMa).toBe(40);
    for (let rate = 1; rate <= 10; rate++)
      for (let d = 0; d <= 400; d += 20) {
        const r = tectonic015State("divergent", d, rate, 1);
        expect(r.ageMa * rate * 10).toBeCloseTo(d);
        expect(r.totalRate).toBe(2 * rate);
      }
  });
  it("dalma-batma, kıtasal çarpışma ve yanal sınırı farklı kanıtlarla açıklar", () => {
    expect(
      tectonic015State("subduction", 120, 2, 2).boundary.evidence,
    ).toContain("dalıyor");
    expect(tectonic015State("collision", 120, 2, 1).boundary.limit).toContain(
      "gerektirmez",
    );
    expect(
      tectonic015State("transform", 120, 2, 0).boundary.evidence,
    ).toContain("yeni kabuk üretimi zorunlu değil");
    expect(tectonic015State("divergent", 120, 2, 2).layer.detail).toContain(
      "Büyük ölçüde katı",
    );
    expect(tectonic015State("divergent", 120, 2, 1).layer.detail).toContain(
      "üst manto",
    );
  });
  it("izostatik yükün yönünü ve denge varsayımını korur", () => {
    const a = internal015State("isostasy", 35, 1100, 15, false, false, false),
      b = internal015State("isostasy", 35, 0, 15, false, false, false);
    expect(a.deflection).toBeCloseTo(300);
    expect(a.relativeSea).toBeCloseTo(300);
    expect(b.deflection).toBe(0);
    for (let h = 0; h <= 2000; h += 100)
      expect(
        internal015State("isostasy", 0, h, 5, false, false, false).deflection *
          3.3,
      ).toBeCloseTo(h * 0.9);
  });
  it("deniz depreminden zorunlu tsunami çıkarmaz; iç ve dış volkanizmayı ayırır", () => {
    for (const underwater of [false, true])
      for (const vertical of [false, true]) {
        const r = internal015State(
          "earthquake",
          35,
          1100,
          25,
          false,
          underwater,
          vertical,
        );
        expect(r.depth).toBe(25);
        expect(r.tsunamiCondition).toBe(underwater && vertical);
        if (underwater && vertical)
          expect(r.quakeConclusion).toContain("zorunlu değildir");
        else expect(r.quakeConclusion).toContain("zorunlu sonucu çıkarılamaz");
      }
    expect(
      internal015State("volcano", 35, 1100, 15, true, false, false)
        .volcanoConclusion,
    ).toContain("dayk");
    expect(
      internal015State("volcano", 35, 1100, 15, false, false, false)
        .volcanoConclusion,
    ).toContain("lav, kül ve gaz");
  });
  it("tanımsız veri ve fiziksel model sınırı ihlallerini sessiz başarıya çevirmez", () => {
    for (const args of [
      ["missing", "north", 0],
      ["mediterranean", "bad", 0],
      ["mediterranean", "north", 12],
      ["mediterranean", "north", 0.5],
    ] as const)
      expect(() => climate015State(args[0], args[1], args[2])).toThrow(
        RangeError,
      );
    expect(() => turkey015State("central", -1, "south", "parallel")).toThrow(
      RangeError,
    );
    expect(() => turkey015State("bad", 100, "south", "parallel")).toThrow(
      RangeError,
    );
    expect(() => turkey015State("central", 100, "east", "parallel")).toThrow(
      RangeError,
    );
    expect(() => tectonic015State("divergent", 120, 0, 1)).toThrow(RangeError);
    expect(() => tectonic015State("bad", 120, 2, 1)).toThrow(RangeError);
    expect(() => tectonic015State("divergent", NaN, 2, 1)).toThrow(RangeError);
    expect(() => tectonic015State("divergent", 120, 2, 5)).toThrow(RangeError);
    expect(() =>
      internal015State("bad", 30, 1100, 15, false, false, false),
    ).toThrow(RangeError);
    expect(() =>
      internal015State("fold", 61, 1100, 15, false, false, false),
    ).toThrow(RangeError);
    expect(() =>
      internal015State("isostasy", 30, 2001, 15, false, false, false),
    ).toThrow(RangeError);
    expect(() =>
      internal015State("earthquake", 30, 100, 36, false, true, true),
    ).toThrow(RangeError);
  });
});
