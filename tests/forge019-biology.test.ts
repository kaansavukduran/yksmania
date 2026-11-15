import { describe, it, expect } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  airway019,
  ventilation019,
  gases019,
  oxygenCurve019,
  urinary019,
  nephron019,
  renalBalance019,
  male019,
  forge019BiologyLessons,
  forge019BiologyGuides,
  forge019BiologyTopics,
} from "../src/learning/forge019Biology";
describe("Solunum ve üriner yolda bölme, taşıma ve miktar", () => {
  it("iletim duvarını gaz yüzeyinden ayırır; işaret alan ve kalınlıkla değişir", () => {
    expect(airway019("trachea", 2, 1, 3)).toMatchObject({
      cartilage: true,
      cilia: true,
      smoothMuscle: true,
      flux: null,
      surfactant: false,
    });
    expect(airway019("bronchiole", 2, 1, 3)).toMatchObject({
      cartilage: false,
      cilia: true,
      smoothMuscle: true,
      flux: null,
    });
    expect(airway019("alveolus", 2, 1, 3)).toMatchObject({
      cartilage: false,
      cilia: false,
      gasSurface: true,
      surfactant: true,
      flux: 6,
    });
    expect(airway019("alveolus", 4, 2, 3).flux).toBe(6);
    expect(airway019("alveolus", 2, 2, -3)).toMatchObject({
      flux: -3,
      direction: "Kandan alveole",
    });
    expect(airway019("alveolus", 8, 1, 0)).toMatchObject({
      flux: 0,
      direction: "Net fark yok",
    });
  });
  it("yüksek son hacmi sıfır net akıştan ayırır; yüzeysel hızlı örnekte aynı toplam farklı etkin hacim verir", () => {
    const a = ventilation019("inhale", 500, 150, 12, 2),
      b = ventilation019("exhale", 500, 150, 12, 2),
      end = ventilation019("endIn", 500, 150, 12, 2),
      fast = ventilation019("endOut", 250, 150, 24, 1);
    expect(a).toMatchObject({
      flow: 0.5,
      minute: 6,
      alveolarMinute: 4.2,
      diaphragmLow: true,
    });
    expect(b.flow).toBe(-0.5);
    expect(end.flow).toBe(0);
    expect(end.excursion).toBe(500);
    expect(fast).toMatchObject({
      flow: 0,
      minute: 6,
      alveolarMinute: 2.4,
      diaphragmLow: false,
    });
    expect(ventilation019("inhale", 200, 200, 6, 4).alveolarMinute).toBe(0);
  });
  it("dört yerli Hb kapasitesini ve ortalama doluluğu ayrı tutar; CO₂ payları toplamı korur", () => {
    expect(gases019("tissue", 10, 75, 200)).toMatchObject({
      capacity: 40,
      bound: 30,
      carbamino: 46,
      bicarbonate: 140,
      bicarbonateOut: true,
      chlorideIn: true,
      oxygenToBlood: false,
    });
    expect(gases019("tissue", 10, 75, 200).dissolved).toBeCloseTo(14);
    expect(gases019("lung", 10, 75, 200)).toMatchObject({
      bicarbonateOut: false,
      chlorideIn: false,
      oxygenToBlood: true,
    });
    for (const amount of [0, 10, 120, 200]) {
      const m = gases019("tissue", 7, 55, amount);
      expect(m.dissolved + m.carbamino + m.bicarbonate).toBeCloseTo(amount);
      expect(m.bound).toBeCloseTo(15.4);
    }
  });
  it("açık oyuncak eğride yarı doluluk ve aynı basınçtaki ilgi sırasını korur", () => {
    expect(oxygenCurve019(28, "normal").saturation).toBe(50);
    for (const p of [0, 10, 40, 100]) {
      const low = oxygenCurve019(p, "low"),
        normal = oxygenCurve019(p, "normal"),
        high = oxygenCurve019(p, "high");
      expect(low.saturation).toBeLessThanOrEqual(normal.saturation);
      expect(normal.saturation).toBeLessThanOrEqual(high.saturation);
    }
    expect(oxygenCurve019(0, "high").saturation).toBe(0);
  });
  it("üreter teslimini üretimden ayırır; çıkışı mevcut depoyla sınırlar", () => {
    expect(urinary019("none", 1, 1, 10, 50, 0)).toMatchObject({
      final: 70,
      upstream: 0,
    });
    expect(urinary019("left", 1, 1, 10, 50, 0)).toMatchObject({
      final: 60,
      upstream: 10,
      leftProduced: 10,
      leftDelivered: 0,
      rightDelivered: 10,
    });
    expect(urinary019("urethra", 1, 1, 10, 50, 5)).toMatchObject({
      final: 70,
      actualOut: 0,
      upstream: 0,
    });
    expect(urinary019("none", 0.1, 0.2, 1, 0, 0).upstream).toBe(0);
    expect(urinary019("none", 1, 1, 3, 5, 10)).toMatchObject({
      actualOut: 11,
      final: 0,
    });
    for (const block of ["none", "left", "right", "urethra"] as const)
      for (const l of [0, 1, 3])
        for (const r of [0, 1, 3]) {
          const m = urinary019(block, l, r, 7, 12, 4);
          expect(m.final + m.actualOut + m.upstream).toBeCloseTo(
            12 + m.leftProduced + m.rightProduced,
          );
          expect(m.final).toBeGreaterThanOrEqual(0);
        }
  });
  it("Tm aşılınca geri emilimi durdurmaz; su geçirgenliğini bölge ve ADH ile ayırır", () => {
    expect(nephron019("collecting", false, 2, 100, 300)).toMatchObject({
      filtered: 200,
      reabsorbed: 200,
      excreted: 0,
      waterPermeable: false,
      adhResponsive: true,
    });
    expect(nephron019("collecting", true, 4, 100, 300)).toMatchObject({
      filtered: 400,
      reabsorbed: 300,
      excreted: 100,
      waterPermeable: true,
    });
    for (const part of ["proximal", "descending"] as const)
      for (const adh of [false, true])
        expect(nephron019(part, adh, 0, 100, 300).waterPermeable).toBe(true);
    for (const part of ["ascending", "earlyDistal"] as const)
      for (const adh of [false, true])
        expect(nephron019(part, adh, 5, 150, 0)).toMatchObject({
          waterPermeable: false,
          excreted: 750,
        });
    expect(renalBalance019(100, 20, 90).excreted).toBe(30);
    expect(renalBalance019(0, 0, 0).excreted).toBe(0);
  });
  it("mayoz ile farklılaşmayı ayırır, bütün evrelerde toplam C korunur", () => {
    for (const p of [1, 2, 3, 4])
      for (const stage of [
        "primary",
        "secondary",
        "spermatid",
        "sperm",
      ] as const) {
        const m = male019(stage, p, true, "lh");
        expect(m.totalDna).toBe(p * 4);
        expect(m.chromosomes).toBe(stage === "primary" ? 46 : 23);
        expect(m.transportShown).toBe(stage === "sperm");
      }
    expect(male019("secondary", 3, true, "fsh")).toMatchObject({
      cells: 6,
      dna: 2,
    });
    expect(male019("spermatid", 3, true, "inhibin")).toMatchObject({
      cells: 12,
      dna: 1,
      transportShown: false,
    });
    expect(male019("sperm", 3, false, "testosterone")).toMatchObject({
      cells: 12,
      dna: 1,
      transportShown: false,
      endocrineRoute: true,
    });
  });
  it("kimlik, sonlu miktar, payda ve sayım sınırlarını reddeder", () => {
    expect(() => airway019("x" as never, 2, 1, 3)).toThrow();
    expect(() => airway019("alveolus", 2, 0, 3)).toThrow();
    expect(() => ventilation019("inhale", 200, 250, 12, 1)).toThrow();
    expect(() => ventilation019("inhale", 500, 150, 12, 0)).toThrow();
    expect(() => gases019("tissue", 1.5, 75, 200)).toThrow();
    expect(() => gases019("lung", 1, 101, 200)).toThrow();
    expect(() => oxygenCurve019(NaN, "normal")).toThrow();
    expect(() => urinary019("left", -1, 1, 10, 50, 1)).toThrow();
    expect(() => nephron019("proximal", true, 2, Infinity, 300)).toThrow();
    expect(() => renalBalance019(1, 0, 2)).toThrow();
    expect(() => male019("primary", 1.5, true, "lh")).toThrow();
    expect(() => male019("sperm", 3, false, "x" as never)).toThrow();
  });
});
describe("Altı yeni yerleşik AYT öğretimi", () => {
  it("detay316–321 kapsamını tam kartlar ve adımlı olumlu öğretimle bağlar", () => {
    expect(Object.values(forge019BiologyTopics)).toEqual(
      Array.from({ length: 6 }, (_, i) => `detail-${316 + i}`),
    );
    expect(forge019BiologyLessons).toHaveLength(6);
    for (const g of forge019BiologyGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 && s.paragraphs.every((p) => p.trim()),
        ),
      ).toBe(true);
      expect(g.examples).toHaveLength(4);
      expect(
        g.examples.every(
          (e) =>
            e.steps.length === 3 &&
            e.steps.every((s) => s.explanation.trim()) &&
            e.pitfall,
        ),
      ).toBe(true);
      expect(g.recall).toHaveLength(4);
    }
    const ids = new Set();
    for (const l of forge019BiologyLessons) {
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer]).toBeDefined();
        expect(questionContentIssues(q), q.id).toEqual([]);
      }
    }
    expect(ids.size).toBe(60);
  });
  it("önemli sayı anahtarlarını ve kaynak yanlışını düzeltme sınırlarını korur", () => {
    const answer = (id: string, k: number) => {
      const q = forge019BiologyLessons.find((l) => l.id === id)!.questions[
        k - 1
      ];
      return q.options[q.answer].tr;
    };
    expect(answer("solunum-organlar", 6)).toBe("6");
    expect(answer("soluk-alisverisi", 3)).toBe("4,2");
    expect(answer("solunum-gaz-tasinmasi", 1)).toBe("30");
    expect(answer("uriner-organlar", 4)).toBe("60 mL");
    expect(answer("nefron-isleyisi", 6)).toBe("178 L/gün ve %98,9");
    expect(answer("erkek-ureme-organlari", 2)).toBe("12");
    const text = forge019BiologyGuides
      .map((g) => g.sections.flatMap((s) => s.paragraphs).join(" "))
      .join(" ");
    expect(text).toContain("geri emilim durmaz");
    expect(text).toContain("seminifer tüpçüklerde gerçekleşir");
    expect(text).toContain("plazmada");
  });
});
