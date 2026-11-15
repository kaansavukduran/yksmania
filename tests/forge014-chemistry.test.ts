import { describe, expect, it } from "vitest";
import {
  avogadroApprox,
  carbonateBalance,
  forge014ChemistryGuides,
  forge014ChemistryLessons,
  forge014ChemistryTopics,
  formulaCount,
  formulaSamples,
  ironSulfur,
  massAmount,
  multipleRatio,
  waterBudget,
} from "../src/learning/forge014Chemistry";
describe("six source-based chemistry units, 167–170, 172–173", () => {
  it("adds six distinct headings without replacing the existing mol introduction", () => {
    expect(Object.values(forge014ChemistryTopics)).toEqual([
      "detail-167",
      "detail-168",
      "detail-169",
      "detail-170",
      "detail-172",
      "detail-173",
    ]);
    expect(forge014ChemistryTopics).not.toHaveProperty("mol");
    expect(new Set(forge014ChemistryLessons.map((l) => l.id)).size).toBe(6);
    for (const [i, l] of forge014ChemistryLessons.entries()) {
      const g = forge014ChemistryGuides[i];
      expect(g.id).toBe(l.id);
      expect(g.sections.length).toBeGreaterThanOrEqual(9);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(l.questions).toHaveLength(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.join(" ").length).toBeGreaterThan(400);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.trim()).not.toBe("");
        expect(e.pitfall.trim()).not.toBe("");
      }
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.trim()).not.toBe("");
        expect(q.explanation.tr.length).toBeGreaterThan(35);
        expect(q.prompt.tr).toContain("?");
      }
    }
  });
  it("uses the same job and unchanged leak on both sides of a budget comparison", () => {
    expect(waterBudget(8, 4, 1, 10)).toEqual({
      oldUse: 60,
      old: 70,
      used: 32,
      loss: 10,
      total: 42,
      saving: 28,
      percent: 40,
    });
    expect(waterBudget(6, 5, 3, 0).saving).toBe(90);
    expect(waterBudget(16, 10, 1, 0).saving).toBe(-100);
    expect(waterBudget(12, 5, 1, 100).saving).toBe(0);
  });
  it("separates an open measured subsystem from the conserved system including escaped gas", () => {
    expect(carbonateBalance(50, true)).toMatchObject({
      unreacted: 50,
      solid: 28,
      gas: 22,
      measured: 78,
      closedTotal: 100,
    });
    expect(carbonateBalance(50, false).measured).toBe(100);
    for (let p = 0; p <= 100; p += 5) {
      const c = carbonateBalance(p, true);
      expect(c.measured + c.gas).toBeCloseTo(100);
      expect(c.unreacted + c.solid + c.gas).toBeCloseTo(100);
      expect(c.calcium + c.carbon + c.oxygen).toBe(100);
    }
    expect(carbonateBalance(100, true).measured).toBe(56);
  });
  it("finds actual product capacity, both excess directions, exact mixture and intermediate conservation", () => {
    expect(ironSulfur(0, 0)).toMatchObject({
      limiter: "none",
      product: 0,
      leftFe: 0,
      leftS: 0,
    });
    expect(ironSulfur(14, 12)).toMatchObject({
      limiter: "iron",
      product: 22,
      leftFe: 0,
      leftS: 4,
    });
    expect(ironSulfur(17.5, 8)).toMatchObject({
      limiter: "sulfur",
      product: 22,
      leftFe: 3.5,
      leftS: 0,
    });
    expect(ironSulfur(21, 12)).toMatchObject({
      limiter: "both",
      product: 33,
      leftFe: 0,
      leftS: 0,
    });
    expect(ironSulfur(14, 12, 50)).toMatchObject({
      product: 11,
      leftFe: 7,
      leftS: 8,
    });
    for (const a of [0, 0.5, 7, 14, 17.5, 35])
      for (const b of [0, 1, 4, 8, 12, 20])
        for (const p of [0, 30, 100]) {
          const r = ironSulfur(a, b, p);
          expect(r.product + r.leftFe + r.leftS).toBeCloseTo(a + b);
          expect(r.consumedFe / 7).toBeCloseTo(r.consumedS / 4);
          expect(r.leftFe).toBeGreaterThanOrEqual(0);
          expect(r.leftS).toBeGreaterThanOrEqual(0);
        }
  });
  it("normalizes the specified element before taking the ordered mass ratio", () => {
    expect(multipleRatio("co", "x", 12)).toMatchObject({
      first: 16,
      second: 32,
      ratio: 0.5,
      fixed: "C",
      other: "O",
      valid: true,
    });
    expect(multipleRatio("co", "y", 32)).toMatchObject({
      first: 24,
      second: 12,
      ratio: 2,
      fixed: "O",
      other: "C",
    });
    expect(multipleRatio("co", "x", 6)).toMatchObject({
      first: 8,
      second: 16,
      ratio: 0.5,
    });
    expect(multipleRatio("no", "x", 14)).toMatchObject({
      first: 16,
      second: 32,
      ratio: 0.5,
    });
    expect(multipleRatio("n2o4", "x", 14)).toMatchObject({
      ratio: 1,
      valid: false,
    });
  });
  it("distinguishes formula units, atoms and fully dissociated polyatomic ions with neutral charge balance", () => {
    const c = formulaCount("calcium", 0.25);
    expect(c.atomMoles).toBe(1.25);
    expect(c.ionMoles).toBe(0.75);
    expect(c.atoms.map((a) => a.moles)).toEqual([0.25, 0.5, 0.5]);
    expect(c.ions.map((a) => a.moles)).toEqual([0.25, 0.5]);
    expect(c.netCharge).toBe(0);
    const a = formulaCount("aluminium", 0.1);
    expect(a.atomMoles).toBeCloseTo(1.7);
    expect(a.atoms.find((x) => x.symbol === "O")?.moles).toBeCloseTo(1.2);
    expect(a.ionMoles).toBeCloseTo(0.5);
    expect(a.netCharge).toBe(0);
    expect(formulaCount("water", 1).ionMoles).toBe(0);
    expect(formulaCount("carbon", 0.5).atomMoles).toBe(1.5);
  });
  it("uses grams per mole without capping large amounts or replacing small one-entity masses with zero", () => {
    expect(massAmount("calcium", 37)).toMatchObject({
      mass: 37,
      moles: 0.5,
      atomMoles: 2.5,
    });
    expect(massAmount("carbon", 11)).toMatchObject({
      moles: 0.25,
      atomMoles: 0.75,
    });
    expect(massAmount("water", 144)).toMatchObject({ moles: 8, atomMoles: 24 });
    expect(massAmount("aluminium", 342).moles).toBe(1);
    for (const f of formulaSamples) {
      const m = massAmount(f.id, f.mass);
      expect(m.moles).toBe(1);
      expect(m.number).toBe(avogadroApprox);
      expect(m.oneMass * avogadroApprox).toBeCloseTo(f.mass);
      expect(m.oneMass).toBeGreaterThan(0);
      expect(m.oneMass).toBeLessThan(1e-20);
    }
  });
  it("keeps all six computations finite for corrupted persisted controls", () => {
    expect(Number.isFinite(waterBudget(NaN, Infinity, -20, NaN).percent)).toBe(
      true,
    );
    expect(carbonateBalance(NaN, true).measured).toBe(100);
    expect(ironSulfur(NaN, Infinity).product).toBe(0);
    expect(multipleRatio("unknown", "x", NaN).ratio).toBe(0.5);
    expect(formulaCount("unknown", NaN).atomMoles).toBe(0);
    expect(massAmount("unknown", Infinity).moles).toBe(0);
  });
  it("checks all sixty keyed claims against independently recomputed target answers", () => {
    const keys = [
      [
        "36 L",
        "%25",
        "60 L",
        "Bu gözlemler tek başına içilebilirliği kanıtlamaz.",
        "Sertlik azalabilir; tüm güvenlik ölçütleri bu işlemle kanıtlanmaz.",
        "20 L",
        "A: 8 L/kg; B: 9 L/kg; A daha azdır.",
        "Toplama ve depolama etkilerini de kapsayan gerekli kalite analizlerini istemek",
        "1/4",
        "Bu uygunluk tek başına içme amacı için uygunluk anlamına gelmez.",
      ],
      [
        "15 g",
        "44 g",
        "4 g",
        "1/8",
        "1/2 ve 3/8",
        "15 g",
        "12 g",
        "6 g",
        "Farklı derişimlerde hazırlanabilen tuzlu su karışımına",
        "2/3",
      ],
      [
        "22 g",
        "4 g S",
        "22 g",
        "21 g Fe ve 12 g S",
        "O₂",
        "4 g",
        "5 g",
        "7 g Fe ve 8 g S",
        "Fe bulunmadığı için ek FeS oluşmaz.",
        "Tüketilen X ile tüketilen Y kütlelerinin toplamına",
      ],
      [
        "1/2",
        "2",
        "1/2",
        "NO ve NO₂",
        "Aynı basit N/O oranına sahiptirler.",
        "1/4",
        "2 olarak kalır.",
        "CO örneğinin iki formül miktarı alındığını",
        "XY₂",
        "İki bileşiğin element çiftleri aynı değildir.",
      ],
      [
        "0,5 Nₐ",
        "1 mol",
        "1,25 mol",
        "12",
        "0,60 mol",
        "0,40 Nₐ",
        "Toplam 3 mol iyon vardır; net yük sıfırdır.",
        "Ca(OH)₂ formül birimi",
        "0,20 mol",
        "Çözünmüş şeker molekülü sayısı 0,3 Nₐ’dır.",
      ],
      [
        "44 g/mol",
        "74 g/mol",
        "0,25 mol",
        "37 g",
        "16",
        "1 mol",
        "342",
        "2 mol",
        "M/Nₐ",
        "Verilenler tek başına kesin hacmi belirlemez.",
      ],
    ];
    for (const [i, l] of forge014ChemistryLessons.entries())
      expect(l.questions.map((q) => q.options[q.answer].tr)).toEqual(keys[i]);
  });
});
