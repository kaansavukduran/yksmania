import { describe, expect, it } from "vitest";
import {
  flowExperiment,
  forge012ChemistryGuides,
  forge012ChemistryLessons,
  forge012ChemistryTopics,
  gasPressure,
  humidityState,
  ionisation,
  sealedVapour,
  solidSamples,
  treatmentState,
  waterVapourTable,
} from "../src/learning/forge012Chemistry";
import { waterHeating } from "../src/learning/forge011Chemistry";
describe("source units 162–166: chemistry", () => {
  it("keeps five source headings distinct and gives each full teaching and independent original exercises", () => {
    expect(Object.values(forge012ChemistryTopics)).toEqual([
      "detail-162",
      "detail-163",
      "detail-164",
      "detail-165",
      "detail-166",
    ]);
    expect(forge012ChemistryLessons).toHaveLength(5);
    for (const [i, lesson] of forge012ChemistryLessons.entries()) {
      const guide = forge012ChemistryGuides[i];
      expect(guide.id).toBe(lesson.id);
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      expect(lesson.questions).toHaveLength(10);
      expect(
        guide.sections.every(
          (s) =>
            s.paragraphs.length === 2 && s.paragraphs.join(" ").length > 450,
        ),
      ).toBe(true);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.explanation.tr.trim()).not.toBe("");
        expect(q.explanation.tr).toMatch(/[.!?]/);
        expect(q.prompt.tr.trim()).not.toBe("");
        expect(q.prompt.tr).toMatch(/[?]/);
      }
    }
  });
  it("preserves scientifically different structure and carrier descriptions", () => {
    expect(solidSamples.find((s) => s.id === "graphite")?.kind).toBe(
      "Kovalent ağ",
    );
    expect(solidSamples.find((s) => s.id === "graphite")?.conductor).toContain(
      "Elektron",
    );
    expect(solidSamples.find((s) => s.id === "ice")?.kind).toBe(
      "Moleküler kristal",
    );
    expect(solidSamples.find((s) => s.id === "glass")?.regular).toBe(false);
  });
  it("uses controlled given flow data and never lets the receiving volume exceed 20 mL", () => {
    expect(flowExperiment("x", 20, 45)).toMatchObject({
      finish: 90,
      volume: 10,
      fraction: 0.5,
    });
    expect(flowExperiment("x", 40, 45)).toMatchObject({
      finish: 45,
      volume: 20,
      fraction: 1,
    });
    expect(flowExperiment("y", 60, 5)).toMatchObject({
      finish: 10,
      volume: 10,
      fraction: 0.5,
    });
    expect(flowExperiment("x", 60, 120).volume).toBe(20);
    expect(flowExperiment("x", 20, -5).volume).toBe(0);
  });
  it("matches actual water saturation data without assuming Celsius linearity", () => {
    expect(waterVapourTable.map((t) => t.pressure)).toEqual([
      4.6, 9.2, 23.8, 92.5, 233.7, 760,
    ]);
    expect(
      waterVapourTable[3].pressure / waterVapourTable[2].pressure,
    ).toBeCloseTo(3.8865546);
  });
  it("keeps P* independent of mass and gas volume only while liquid remains", () => {
    const a = sealedVapour(2, 1, 1),
      b = sealedVapour(2, 2, 8);
    expect(a.saturated && b.saturated).toBe(true);
    expect(a.pressure).toBeCloseTo(23.8);
    expect(b.pressure).toBeCloseTo(a.pressure);
    expect(b.vapour / a.vapour).toBeCloseTo(8);
    for (let i = 0; i < 6; i++)
      for (const m of [0.001, 0.01, 0.1, 1, 5])
        for (const v of [1, 2, 5, 10]) {
          const r = sealedVapour(i, m, v);
          expect(r.vapour + r.liquid).toBeCloseTo(m, 12);
          expect(r.pressure).toBeLessThanOrEqual(r.saturation + 1e-8);
          expect(r.liquid).toBeGreaterThanOrEqual(0);
        }
  });
  it("separates the exactly saturated all-gas boundary from a two-phase state", () => {
    const reference = sealedVapour(2, 1, 2);
    const boundary = sealedVapour(2, reference.required, 2);
    expect(boundary.liquid).toBe(0);
    expect(boundary.hasLiquid).toBe(false);
    expect(boundary.saturated).toBe(true);
    expect(boundary.pressure).toBeCloseTo(23.8);
    expect(sealedVapour(2, reference.required / 2, 2).saturated).toBe(false);
  });
  it("calculates unsaturated all-vapour pressure rather than forcing P*", () => {
    const r = sealedVapour(2, 0.01, 2);
    expect(r.saturated).toBe(false);
    expect(r.vapour).toBe(0.01);
    expect(r.liquid).toBe(0);
    expect(r.pressure).toBeCloseTo(5.16455, 3);
    expect(sealedVapour(2, 0.01, 4).pressure).toBeCloseTo(r.pressure / 2);
  });
  it("separates initial humidity ratio from a stable water-surface equilibrium", () => {
    expect(humidityState(2, 11.9)).toMatchObject({
      relative: 50,
      pressure: 11.9,
      condenses: false,
    });
    expect(humidityState(2, 5.95).relative).toBe(25);
    const over = humidityState(2, 47.6);
    expect(over.initialRelative).toBe(200);
    expect(over.relative).toBe(100);
    expect(over.condenses).toBe(true);
    expect(over.pressure).toBe(23.8);
    expect(humidityState(3, 11.9).relative).toBeLessThan(50);
  });
  it("uses positive absolute temperature, units and fixed-variable gas ratios", () => {
    expect(gasPressure(0.2, 300, 2)).toBeCloseTo(2.46171);
    expect(gasPressure(0.2, 600, 2)).toBeCloseTo(2 * gasPressure(0.2, 300, 2));
    expect(gasPressure(0.2, 300, 4)).toBeCloseTo(gasPressure(0.2, 300, 2) / 2);
    expect(() => gasPressure(0.2, 0, 2)).toThrow();
    expect(() => gasPressure(0.2, 300, 0)).toThrow();
  });
  it("preserves nuclei and charge when neutral atoms lose exactly one electron", () => {
    for (let n = 0; n <= 12; n++) {
      const r = ionisation(12, n);
      expect(r.ions + r.neutral).toBe(12);
      expect(r.electrons).toBe(r.ions);
      expect(r.charge).toBe(0);
    }
    expect(ionisation(12, 6)).toEqual({
      total: 12,
      ions: 6,
      electrons: 6,
      neutral: 6,
      charge: 0,
    });
  });
  it("keeps energy plateaux and their actual phase fractions consistent", () => {
    expect(waterHeating(167)).toMatchObject({
      temperature: 0,
      solid: 0.5,
      liquid: 0.5,
      gas: 0,
    });
    expect(waterHeating(1880)).toMatchObject({
      temperature: 100,
      solid: 0,
      liquid: 0.5,
      gas: 0.5,
    });
    expect(waterHeating(3208)).toMatchObject({ temperature: 200, gas: 1 });
  });
  it("targets given contaminant categories without inventing complete purification", () => {
    expect(treatmentState(true, false, false, false)).toEqual({
      suspended: 10,
      organic: 40,
      hardness: 2000,
      microbes: 10000,
    });
    expect(treatmentState(false, true, true, true)).toEqual({
      suspended: 100,
      organic: 10,
      hardness: 200,
      microbes: 100,
    });
    expect(treatmentState(true, true, true, true)).toEqual({
      suspended: 10,
      organic: 10,
      hardness: 200,
      microbes: 100,
    });
  });
  it("independently checks all fifty keyed conclusions rather than only the answer positions", () => {
    const expected = [
      [
        "Na⁺ ve Cl⁻ iyonları",
        "H₂O molekülleri korunur; moleküller arası düzen değişir.",
        "Kovalent ağ yapılı bütün katılar yalıtkandır.",
        "Taneciklerinin uzun mesafede kristal düzen göstermesini",
        "3",
        "Viskozite azalırken akıcılık artar.",
        "Elektronlar; iyonlar",
        "Katı hâlin her maddede mutlaka en yoğun hâl olmadığını",
        "Yalnız bu gözlemle viskoziteleri kesin sıralanamaz.",
        "Elmas kovalent ağ, katı CO₂ moleküler kristaldir.",
      ],
      [
        "Sıvı yüzeyinden kaynama sıcaklığının altında da gerçekleşebilir.",
        "Buharlaşma ve yoğuşma hızları eşittir.",
        "P*A=P*B",
        "Diğer koşullar aynıysa artabilir.",
        "68,7",
        "Sıvı+buhar doygun denge koşulu sağlanmamıştır.",
        "Havanın da kısmi basınç katkısı vardır.",
        "Verilenlerle kesin sıralama yapılamaz.",
        "0,5",
        "Azalır.",
      ],
      [
        "50",
        "Azalır.",
        "Kaynama anındaki buhar basınçları eşittir.",
        "%50",
        "15",
        "Azalır.",
        "Kaynama noktasına ulaşma süresi kısalabilir; kaynama noktası aynı kalır.",
        "MgCl₂>NaCl>şeker",
        "100",
        "Yoğuşma",
      ],
      [
        "300",
        "3",
        "3",
        "Ortalama öteleme kinetik enerjileri eşittir.",
        "Sıcaklık sabitken sıvı miktarı artabilir.",
        "Sıvı",
        "0e",
        "Maddenin sıcak bir kayaç eriyiği olması",
        "50",
        "950",
      ],
      [
        "İçilebilirlik ölçütlerinin tamamını sağladığını",
        "Ca²⁺ ve Mg²⁺",
        "20",
        "Tek başına mikrobiyolojik güvenlik kanıtlanamaz.",
        "Konumlarına göre koruyucu ve kirletici roller ayrılabilir.",
        "Asidik birikim ve asit yağmurları",
        "Çözünmüş oksijenin azalması",
        "20",
        "İçeriğine uygun ayrı toplama ve geri kazanıma yönlendirmek",
        "60",
      ],
    ];
    for (const [i, l] of forge012ChemistryLessons.entries())
      expect(l.questions.map((q) => q.options[q.answer].tr)).toEqual(
        expected[i],
      );
  });
});
