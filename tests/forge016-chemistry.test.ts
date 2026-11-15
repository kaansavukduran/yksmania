import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  acidBase016,
  colligative016,
  forge016ChemistryGuides,
  forge016ChemistryLessons,
  forge016ChemistryTopics,
  indicator016,
  neutralization016,
  separation016,
  strongPH016,
} from "../src/learning/forge016Chemistry";
describe("three chemistry units186–188 with independent complete practice", () => {
  it("keeps distinct topic routes and self-contained five-choice cards", () => {
    expect(Object.values(forge016ChemistryTopics)).toEqual([
      "detail-186",
      "detail-187",
      "detail-188",
    ]);
    expect(forge016ChemistryLessons).toHaveLength(3);
    for (const [i, l] of forge016ChemistryLessons.entries()) {
      const g = forge016ChemistryGuides[i];
      expect(g.id).toBe(l.id);
      expect(new Set(g.objectives).size).toBe(g.objectives.length);
      expect(g.sections.length).toBeGreaterThanOrEqual(12);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(l.questions).toHaveLength(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 80)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(20);
        expect(e.pitfall.length).toBeGreaterThan(20);
      }
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.explanation.tr.length).toBeGreaterThan(45);
        expect(questionContentIssues(q)).toEqual([]);
      }
    }
  });
  it("compares effective solute particles in the same solvent mass without confusing signed temperatures", () => {
    const a = colligative016(0.1, 1, 1),
      b = colligative016(0.1, 1, 2),
      c = colligative016(0.1, 2, 2);
    expect(a).toMatchObject({ effective: 0.1, molality: 0.1 });
    expect(a.freezingDrop).toBeCloseTo(0.186, 12);
    expect(a.freezingC).toBeCloseTo(-0.186, 12);
    expect(a.boilingC).toBeCloseTo(100.052, 12);
    expect(b.freezingDrop).toBeCloseTo(0.372, 12);
    expect(b.freezingDrop / a.freezingDrop).toBeCloseTo(2, 12);
    expect(c.freezingDrop).toBeCloseTo(0.186, 12);
    expect(colligative016(0, 1, 3)).toMatchObject({
      effective: 0,
      freezingDrop: 0,
      boilingC: 100,
      solventFraction: 1,
    });
    expect(b.solventFraction).toBeCloseTo(1000 / 18 / (1000 / 18 + 0.2), 12);
  });
  it("preserves all120g and separates recovered water from vapor lost to surroundings", () => {
    expect(separation016(0, true)).toMatchObject({
      iron: 0,
      sand: 0,
      vessel: 120,
      waterCollected: 0,
      total: 120,
    });
    expect(separation016(1, true)).toMatchObject({
      iron: 4,
      sand: 0,
      vessel: 116,
    });
    expect(separation016(2, true)).toMatchObject({
      iron: 4,
      sand: 6,
      vessel: 110,
      dissolvedSalt: 10,
    });
    expect(separation016(3, true)).toMatchObject({
      vessel: 10,
      drySalt: 10,
      waterCollected: 100,
      waterToSurroundings: 0,
      total: 120,
    });
    expect(separation016(3, false)).toMatchObject({
      vessel: 10,
      waterCollected: 0,
      waterToSurroundings: 100,
      total: 120,
    });
    for (const mode of [false, true])
      for (let stage = 0; stage <= 3; stage++)
        expect(separation016(stage, mode).total).toBe(120);
  });
  it("includes water ionization so trace strong acid never becomes a spurious pH8 base", () => {
    const water = strongPH016(0);
    expect(water).toMatchObject({ pH: 7, pOH: 7, classification: "Nötr" });
    expect(water.hydronium).toBe(1e-7);
    const trace = acidBase016("acid", -8);
    expect(trace.pH).toBeCloseTo(6.9782943135429, 10);
    expect(trace.classification).toBe("Asidik");
    expect(trace.hydronium).toBeGreaterThan(1e-7);
    expect(acidBase016("acid", -2).pH).toBeCloseTo(2, 8);
    expect(acidBase016("base", -3).pH).toBeCloseTo(11, 8);
    expect(acidBase016("water", -2).pH).toBe(7);
    for (let e = -8; e <= -1; e++) {
      const acid = acidBase016("acid", e),
        base = acidBase016("base", e);
      expect(acid.pH + base.pH).toBeCloseTo(14, 10);
      expect(acid.hydronium * acid.hydroxide).toBeCloseTo(1e-14, 25);
    }
  });
  it("keeps indicator color ranges distinct from acid/base boundaries", () => {
    expect(indicator016(2).color).toBe("Renksiz");
    expect(indicator016(7.5).color).toBe("Renksiz");
    expect(indicator016(8.2).color).toBe("Geçiş aralığı");
    expect(indicator016(9).color).toBe("Geçiş aralığı");
    expect(indicator016(10).color).toBe("Geçiş aralığı");
    expect(indicator016(11).color).toBe("Pembe");
  });
  it("uses total final volume and reacts only the smaller equivalent amount", () => {
    const a = neutralization016(0.2, 25, 0.1, 25);
    expect(a).toMatchObject({
      acid: 0.005,
      base: 0.0025,
      reacted: 0.0025,
      remainingAcid: 0.0025,
      remainingBase: 0,
      volumeL: 0.05,
      classification: "Asidik",
    });
    expect(a.pH).toBeCloseTo(1.301029995662244, 10);
    const equal = neutralization016(0.2, 25, 0.1, 50);
    expect(equal).toMatchObject({
      remainingAcid: 0,
      remainingBase: 0,
      pH: 7,
      classification: "Nötr",
    });
    const base = neutralization016(0.2, 25, 0.1, 75);
    expect(base.remainingBase).toBeCloseTo(0.0025, 12);
    expect(base.volumeL).toBeCloseTo(0.1, 12);
    expect(base.pH).toBeCloseTo(12.397940008678987, 10);
  });
  it("does not turn floating-point equivalence into a false acidic or basic classification", () => {
    for (const [a, va, b, vb] of [
      [0.03, 25, 0.05, 15],
      [0.07, 30, 0.03, 70],
      [0.06, 25, 0.05, 30],
      [0.2, 15, 0.1, 30],
    ]) {
      const r = neutralization016(a, va, b, vb);
      expect(r.classification).toBe("Nötr");
      expect(r.pH).toBe(7);
      expect(r.remainingAcid).toBe(0);
      expect(r.remainingBase).toBe(0);
    }
    expect(strongPH016(1e-15).classification).toBe("Asidik");
    expect(strongPH016(-1e-15).classification).toBe("Bazik");
  });
  it("conserves acid and base at every allowed volume, including zero formal reagent", () => {
    for (const ca of [0, 0.03, 0.1, 0.2])
      for (const cb of [0, 0.04, 0.1, 0.2])
        for (const va of [10, 25, 50])
          for (const vb of [0, 5, 25, 50, 75, 100]) {
            const r = neutralization016(ca, va, cb, vb);
            expect(r.reacted + r.remainingAcid).toBeCloseTo(r.acid, 12);
            expect(r.reacted + r.remainingBase).toBeCloseTo(r.base, 12);
            expect(r.hydronium * r.hydroxide).toBeCloseTo(1e-14, 25);
            expect(r.pH + r.pOH).toBeCloseTo(14, 10);
            expect(r.volumeL).toBeGreaterThan(0);
          }
    expect(neutralization016(0, 25, 0, 0).pH).toBe(7);
  });
});
