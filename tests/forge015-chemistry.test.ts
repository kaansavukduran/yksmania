import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  ammoniaInventory,
  ammoniaTransfer,
  AVOGADRO015,
  concentration015,
  dissolutionModel,
  ethaneBalance,
  forge015ChemistryGuides,
  forge015ChemistryLessons,
  forge015ChemistryTopics,
  hydrocarbonMixture,
  isotopeMean,
  microMacroGas,
  purityFromGas,
  reactionProcess,
  solidChange,
  yieldAnalysis,
} from "../src/learning/forge015Chemistry";
describe("twelve independent chemistry units 174–185", () => {
  it("keeps twelve distinct new routes, full independent practice and answerable media contexts", () => {
    expect(Object.values(forge015ChemistryTopics)).toEqual(
      Array.from({ length: 12 }, (_, i) => `detail-${174 + i}`),
    );
    expect(forge015ChemistryLessons).toHaveLength(12);
    expect(new Set(forge015ChemistryLessons.map((x) => x.id)).size).toBe(12);
    for (const [i, l] of forge015ChemistryLessons.entries()) {
      const g = forge015ChemistryGuides[i];
      expect(g.id).toBe(l.id);
      expect(g.sections.length).toBeGreaterThanOrEqual(8);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(l.questions).toHaveLength(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.trim().length > 80)).toBe(true);
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
        expect(q.explanation.tr.trim()).not.toBe("");
        expect(questionContentIssues(q)).toEqual([]);
      }
    }
  });
  it("keeps real particle mass separate from bulk mass and varies ideal gas volume only with conditions", () => {
    const x = microMacroGas(1, 32, 0, 1);
    expect(x.mass).toBe(32);
    expect(x.single).toBeCloseTo(32 / AVOGADRO015, 35);
    expect(x.volume).toBeCloseTo(22.4);
    expect(microMacroGas(1, 32, 0, 2).volume).toBeCloseTo(11.2);
    expect(microMacroGas(1, 32, 100, 1).volume).toBeCloseTo(30.6006223687);
    expect(microMacroGas(1, 32, 0, 1, false).volume).toBeNull();
    expect(microMacroGas(0, 32, 0, 1).volume).toBe(0);
  });
  it("distinguishes equality from least integer coefficients and checks every element", () => {
    expect(ethaneBalance(2, 7, 4, 6)).toMatchObject({
      left: [4, 12, 14],
      right: [4, 12, 14],
      balanced: true,
      smallest: true,
      divisor: 1,
    });
    expect(ethaneBalance(4, 14, 8, 12)).toMatchObject({
      balanced: true,
      smallest: false,
      divisor: 2,
    });
    expect(ethaneBalance(2, 6, 4, 6).balanced).toBe(false);
    expect(ethaneBalance(1, 1, 1, 1).left).toEqual([2, 6, 2]);
  });
  it("uses distinct stoichiometry and classification axes for precipitation, neutralization and decomposition", () => {
    expect(reactionProcess("agcl", 2).amounts).toEqual([2, 2, 2]);
    expect(reactionProcess("acid", 4).amounts).toEqual([0, 0, 4]);
    expect(reactionProcess("decomp", 4).amounts).toEqual([0, 8, 12]);
    expect(reactionProcess("mg", 3).amounts).toEqual([2, 1, 6]);
    for (let k = 0; k <= 4; k++) {
      const p = reactionProcess("agcl", k);
      expect(p.amounts[0] + p.amounts[2]).toBe(4);
      expect(p.amounts[1] + p.amounts[2]).toBe(4);
      expect(p.amounts[0] - p.amounts[1]).toBe(0);
      const d = reactionProcess("decomp", k);
      expect(3 * d.amounts[0] + 2 * d.amounts[2]).toBe(24);
    }
  });
  it("transfers consumed quantities through mol, not gram coefficient shortcuts", () => {
    expect(ammoniaTransfer(6, "gram")).toMatchObject({
      hydrogen: 3,
      nitrogen: 1,
      ammonia: 2,
      mass: 34,
    });
    expect(ammoniaTransfer(9, "mol").mass).toBe(102);
    expect(ammoniaTransfer(11.2, "litre").ammonia).toBeCloseTo(1 / 3);
    expect(ammoniaTransfer(6, "gram").volume).toBeCloseTo(44.8);
  });
  it("preserves initial product and all mass at partial progress and in both limiting directions", () => {
    expect(ammoniaInventory(28, 12, 17, 100)).toMatchObject({
      limiter: "nitrogen",
      capacity: 1,
      leftN: 0,
      leftH: 3,
      newProduct: 34,
      finalProduct: 51,
      total: 57,
    });
    expect(ammoniaInventory(56, 6, 0, 100).limiter).toBe("hydrogen");
    expect(ammoniaInventory(28, 6, 0, 100).limiter).toBe("both");
    expect(ammoniaInventory(0, 0, 17, 100)).toMatchObject({
      limiter: "none",
      newProduct: 0,
      finalProduct: 17,
    });
    for (const n of [0, 7, 28, 56, 84])
      for (const h of [0, 1, 6, 12, 18])
        for (const p of [0, 25, 50, 100]) {
          const r = ammoniaInventory(n, h, 17, p);
          expect(r.leftN).toBeGreaterThanOrEqual(-1e-10);
          expect(r.leftH).toBeGreaterThanOrEqual(-1e-10);
          expect(28 * r.leftN + 2 * r.leftH + r.finalProduct).toBeCloseTo(
            r.total,
          );
          expect(2 * r.leftN + 2 * r.extent).toBeCloseTo(2 * r.n);
          expect(2 * r.leftH + 6 * r.extent).toBeCloseTo(2 * r.h);
        }
  });
  it("counts incoming hydrogen in water and separates residual oxide, new metal and inert", () => {
    expect(solidChange("reduction", 80, 100, 50)).toMatchObject({
      remaining: 40,
      product: 32,
      oxygen: 8,
      solid: 72,
      water: 9,
      hydrogen: 1,
      change: -8,
    });
    expect(solidChange("oxidation", 24, 100, 100)).toMatchObject({
      product: 40,
      oxygen: 16,
      solid: 40,
      change: 16,
    });
    expect(solidChange("reduction", 100, 80, 100)).toMatchObject({
      inert: 20,
      product: 64,
      solid: 84,
    });
    for (const kind of ["oxidation", "reduction"])
      for (const p of [10, 50, 100])
        for (const f of [0, 50, 100]) {
          const r = solidChange(kind, 80, p, f);
          expect(r.inert + r.remaining + r.product).toBeCloseTo(r.solid);
          expect(r.mass + (r.reduction ? r.hydrogen : r.oxygen)).toBeCloseTo(
            r.solid + r.water,
          );
        }
  });
  it("flags actual product above theory without clipping and handles zero denominator", () => {
    expect(yieldAnalysis(1, 3, 27.2)).toMatchObject({
      theoretical: 34,
      percent: 80,
      inconsistent: false,
    });
    expect(yieldAnalysis(1, 3, 51)).toMatchObject({
      theoretical: 34,
      percent: 150,
      inconsistent: true,
    });
    expect(yieldAnalysis(0, 3, 0)).toMatchObject({
      percent: null,
      inconsistent: false,
    });
    expect(yieldAnalysis(0, 3, 1)).toMatchObject({
      percent: null,
      inconsistent: true,
    });
  });
  it("undoes product recovery before purity and refuses inconsistent or undefined inferred composition", () => {
    const r = purityFromGas(50, 8.8, 80);
    expect(r.theory).toBeCloseTo(11);
    expect(r.pure).toBeCloseTo(25);
    expect(r.percent).toBeCloseTo(50);
    expect(r.inert).toBeCloseTo(25);
    expect(r.valid).toBe(true);
    expect(purityFromGas(10, 44, 100).valid).toBe(false);
    expect(purityFromGas(50, 0, 0)).toMatchObject({
      undefined: true,
      pure: null,
      percent: null,
    });
    expect(purityFromGas(50, 8.8, 0).valid).toBe(false);
  });
  it("keeps isotope Z fixed and converts mass abundance to atom abundance before averaging", () => {
    expect(isotopeMean(75, "atom")).toMatchObject({
      mean: 36.5,
      heavyAtom: 0.75,
      protons: 17,
      lightNeutrons: 18,
      heavyNeutrons: 20,
    });
    expect(isotopeMean(25, "atom").mean).toBe(35.5);
    expect(isotopeMean(25, "mass").mean).toBeCloseTo(35.47945205479);
    expect(isotopeMean(25, "mass").heavyAtom).toBeCloseTo(
      0.25 / 37 / (0.75 / 35 + 0.25 / 37),
    );
    for (const p of [0, 10, 50, 90, 100])
      for (const basis of ["atom", "mass"]) {
        const r = isotopeMean(p, basis);
        expect(r.mean).toBeGreaterThanOrEqual(35);
        expect(r.mean).toBeLessThanOrEqual(37);
        expect(r.lightAtom + r.heavyAtom).toBeCloseTo(1);
      }
  });
  it("checks independent data, physical solution range and every combustion contribution", () => {
    const r = hydrocarbonMixture(0.5, 0.8, true);
    expect(r.methane).toBeCloseTo(0.2);
    expect(r.ethane).toBeCloseTo(0.3);
    expect(r.mass).toBeCloseTo(12.2);
    expect(r.water).toBeCloseTo(1.3);
    expect(r.oxygen).toBeCloseTo(1.45);
    expect(r.valid).toBe(true);
    expect(hydrocarbonMixture(0.5, 1.2, true).valid).toBe(false);
    expect(hydrocarbonMixture(0.5, 0.8, false)).toMatchObject({
      determined: false,
      valid: false,
      mass: null,
    });
    expect(hydrocarbonMixture(0.5, 0.5, true).valid).toBe(true);
    expect(hydrocarbonMixture(0.5, 1, true).valid).toBe(true);
  });
  it("separates saturation, remaining solid and representative filtration without erasing dissolved ions", () => {
    expect(dissolutionModel("salt", 50, 4, "filter")).toMatchObject({
      dissolved: 36,
      undissolved: 14,
      solution: 136,
      total: 150,
      retained: 14,
      passedSolute: 36,
      ionic: true,
    });
    expect(dissolutionModel("salt", 36, 4, "rest")).toMatchObject({
      dissolved: 36,
      undissolved: 0,
      solution: 136,
    });
    expect(dissolutionModel("sugar", 50, 4, "filter")).toMatchObject({
      dissolved: 50,
      ionic: false,
      retained: 0,
      passedSolute: 50,
    });
    expect(dissolutionModel("sand", 50, 4, "filter")).toMatchObject({
      dissolved: 0,
      retained: 50,
    });
    expect(dissolutionModel("oil", 30, 4, "rest").settled).toBe(true);
    expect(dissolutionModel("colloid", 30, 4, "filter").soluble).toBe(false);
    for (const added of [0, 20, 36, 50, 60])
      for (const stage of [0, 1, 4]) {
        const x = dissolutionModel("salt", added, stage, "filter");
        expect(x.dissolved + x.undissolved).toBeCloseTo(added);
        expect(x.retained + x.passedSolute).toBeCloseTo(added);
      }
  });
  it("uses solution mass for percent, final solution litres for M and solvent kg for molality", () => {
    const r = concentration015(20, 180, 200, 0, 1.2);
    expect(r).toMatchObject({
      mass: 400,
      water: 380,
      percent: 5,
      moles: 0.5,
      ppm: 50000,
    });
    expect(r.molarity).toBeCloseTo(1.5, 10);
    expect(r.volumeMl).toBeCloseTo(333.333333333);
    expect(r.molality).toBeCloseTo(0.5 / 0.38);
    expect(concentration015(20, 180, 0, 0, 1.2).molarity).toBeCloseTo(3, 10);
    expect(concentration015(20, 180, 0, 20, 1.2).percent).toBeCloseTo(
      (100 * 20) / 180,
    );
  });
});
