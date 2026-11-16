import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge020ChemistryGuides,
  forge020ChemistryLessons,
  forge020ChemistryTopics,
  pressure020,
  water020,
  buffer020,
  hydrolysis020,
  neutralization020,
  titration020,
  solubilityEquilibrium020,
} from "../src/learning/forge020Chemistry";
describe("seven source-based advanced aqueous-equilibrium units", () => {
  it("provides complete teaching and standalone five-choice practice without missing media", () => {
    expect(Object.values(forge020ChemistryTopics)).toEqual(
      Array.from({ length: 7 }, (_, i) => `detail-${430 + i}`),
    );
    expect(forge020ChemistryLessons).toHaveLength(7);
    expect(
      new Set(
        forge020ChemistryLessons.flatMap((l) => l.questions.map((q) => q.id)),
      ).size,
    ).toBe(70);
    for (const l of forge020ChemistryLessons) {
      const g = forge020ChemistryGuides.find((g) => g.id === l.id)!;
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(l.questions).toHaveLength(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length >= 100)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.trim()).not.toBe("");
        expect(e.pitfall.trim()).not.toBe("");
      }
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer]).toBeDefined();
        expect(questionContentIssues(q)).toEqual([]);
      }
    }
  });
  it("separates total pressure from reactive partial pressures for both inert constraints", () => {
    const fixed = pressure020("inertV", 2, 1),
      piston = pressure020("inertP", 2, 1),
      compressed = pressure020("volume", 0, 0.5);
    expect(fixed.partial).toEqual([1, 1, 1]);
    expect(fixed.totalPressure).toBe(5);
    expect(fixed.a).toBe(1);
    expect(piston.instantQ).toBeCloseTo(0.6, 13);
    expect(piston.a).toBeCloseTo(1.1861406616345072, 12);
    expect(piston.volume).toBeCloseTo(42.52635342540296, 11);
    expect(piston.totalPressure).toBeCloseTo(3, 13);
    expect(compressed.instant).toEqual([2, 2, 2]);
    expect(compressed.a).toBeCloseTo(0.7807764064044151, 12);
    expect(compressed.partial[1]).toBeGreaterThan(1);
    expect(compressed.direction).toBe("Girenlere");
    for (const mode of ["volume", "inertV", "inertP"] as const)
      for (const i of [0, 0.5, 2, 3])
        for (const r of [0.5, 1, 2]) {
          const m = pressure020(mode, i, r);
          expect(m.aInventory).toBeCloseTo(2, 13);
          expect(m.bInventory).toBeCloseTo(2, 13);
          expect(m.quotient).toBeCloseTo(1, 12);
        }
  });
  it("keeps neutral hot water neutral and protects the very dilute strong-acid limit", () => {
    const hot = water020("water", 0, 80);
    expect(hot.h).toBeCloseTo(3e-7, 16);
    expect(hot.ph).toBeCloseTo(6.522878745280337, 12);
    expect(hot.className).toBe("Nötr");
    const dilute = water020("acid", 1e-8, 25);
    expect(dilute.h).toBeCloseTo(1.0512492197250393e-7, 18);
    expect(dilute.ph).toBeLessThan(7);
    expect(dilute.h - dilute.oh).toBeCloseTo(1e-8, 18);
    for (const t of [25, 50, 80])
      for (const c of [0, 1e-10, 1e-8, 1e-4, 0.1]) {
        const acid = water020("acid", c, t),
          base = water020("base", c, t);
        expect((acid.h * acid.oh) / acid.kw).toBeCloseTo(1, 13);
        expect(acid.h).toBeCloseTo(base.oh, 13);
        expect(acid.ph + base.ph).toBeCloseTo(2 * acid.neutralPh, 12);
      }
  });
  it("conserves buffer family and charge and stops using the mol-ratio estimate after exhaustion", () => {
    const m = buffer020(0.1, 0.1, -0.02, 1);
    expect(m.afterHAMol).toBeCloseTo(0.12, 14);
    expect(m.afterAnionMol).toBeCloseTo(0.08, 14);
    expect(m.hh).toBeCloseTo(4.823908740944319, 12);
    expect(m.actualHAMol + m.actualAnionMol).toBeCloseTo(0.2, 13);
    expect(Math.abs(m.chargeResidual)).toBeLessThan(1e-13);
    const exhausted = buffer020(0.02, 0.01, 0.03, 1);
    expect(exhausted.bufferPairRemains).toBe(false);
    expect(exhausted.hh).toBeNull();
    expect(exhausted.strongBaseExcess).toBeCloseTo(0.01, 13);
    expect(exhausted.ph).toBeCloseTo(12, 5);
    for (const ha of [0.01, 0.1, 0.2])
      for (const a of [0, 0.1, 0.2])
        for (const dose of [-0.1, 0, 0.1]) {
          const m = buffer020(ha, a, dose, 0.5);
          expect(m.actualHAMol + m.actualAnionMol).toBeCloseTo(ha + a, 12);
          expect(Math.abs(m.chargeResidual)).toBeLessThan(2e-13);
          expect((m.h * m.anion) / m.ha).toBeCloseTo(m.ka, 12);
        }
  });
  it("distinguishes neutral spectator salt from neutral two-family hydrolysis", () => {
    const neutral = hydrolysis020("nacl", 0.1),
      both = hydrolysis020("both", 0.1);
    expect(neutral.ph).toBe(7);
    expect(both.ph).toBe(7);
    expect(neutral.ammonia).toBe(0);
    expect(both.ammonia).toBeGreaterThan(0);
    expect(both.acid).toBeGreaterThan(0);
    expect(hydrolysis020("acetate", 0.1).ph).toBeCloseTo(8.872386649603867, 7);
    expect(hydrolysis020("ammonium", 0.1).ph).toBeCloseTo(5.127613350396133, 7);
    for (const kind of ["nacl", "ammonium", "acetate", "both"] as const)
      for (const c of [0, 0.001, 0.1, 0.2]) {
        const m = hydrolysis020(kind, c);
        expect(Math.abs(m.chargeResidual)).toBeLessThan(1e-13);
        if (kind === "acetate" || kind === "both")
          expect(m.acetate + m.acid).toBeCloseTo(c, 13);
        if (kind === "ammonium" || kind === "both")
          expect(m.ammonium + m.ammonia).toBeCloseTo(c, 13);
        if (c === 0) expect(m.ph).toBe(7);
      }
  });
  it("counts two hydroxides, uses final volume and keeps roundoff-only equivalence neutral", () => {
    const eq = neutralization020(0.1, 100, 0.1, 50);
    expect(eq.ph).toBe(7);
    expect(eq.waterMol).toBeCloseTo(0.01, 14);
    expect(eq.reactionHeatKJ).toBeCloseTo(-0.573, 12);
    const m = neutralization020(0.1, 100, 0.1, 60);
    expect(m.volumeL).toBe(0.16);
    expect(m.baseExcess).toBeCloseTo(0.002, 14);
    expect(m.ph).toBeCloseTo(12.09691001303585, 10);
    expect(Math.abs(m.chargeResidual)).toBeLessThan(1e-13);
    const decimal = neutralization020(0.03, 30, 0.01, 45);
    expect(decimal.className).toBe("Nötr");
    expect(decimal.netMol).toBe(0);
    expect(decimal.ph).toBe(7);
  });
  it("calculates continuous titration stages and a genuinely basic weak-acid equivalence", () => {
    expect(titration020("strong", 100).ph).toBe(7);
    expect(titration020("weak", 50).ph).toBeCloseTo(5.000260394433814, 10);
    expect(titration020("weak", 100).ph).toBeCloseTo(8.849497727227824, 10);
    expect(titration020("weak", 120).ph).toBeCloseTo(11.958607553756067, 10);
    for (const kind of ["strong", "weak"] as const) {
      let previous = -Infinity;
      for (let v = 0; v <= 200; v += 5) {
        const m = titration020(kind, v);
        expect(m.ph).toBeGreaterThan(previous);
        previous = m.ph;
        expect(Math.abs(m.chargeResidual)).toBeLessThan(1e-13);
        if (kind === "weak") expect(m.ha + m.anion).toBeCloseTo(m.total, 12);
      }
    }
  });
  it("uses stoichiometric Ksp, finite stock, exact zero solid and the no-solid saturation boundary", () => {
    const pure = solubilityEquilibrium020("caf2", 500, 0, 1);
    expect(pure.saturation).toBeCloseTo(0.0002154434690031884, 13);
    expect(pure.anion).toBeCloseTo(2 * pure.cation, 14);
    const common = solubilityEquilibrium020("caf2", 500, 1, 1);
    expect(common.dissolvedMol).toBeCloseTo(0.00003494476443608381, 14);
    expect(common.q / common.ksp).toBeCloseTo(1, 12);
    const limited = solubilityEquilibrium020("caf2", 10, 0, 1.5);
    expect(limited.solidMol).toBe(0);
    expect(limited.dissolvedMol).toBe(1e-5);
    expect(limited.saturated).toBe(false);
    const cap = solubilityEquilibrium020("agcl", 500, 0, 1).saturation * 1e6,
      bound = solubilityEquilibrium020("agcl", cap, 0, 1);
    expect(bound.solidMol).toBe(0);
    expect(bound.saturated).toBe(true);
    expect(bound.q / bound.ksp).toBeCloseTo(1, 12);
    for (const kind of ["agcl", "caf2"] as const)
      for (const stock of [0, 10, 100, 500])
        for (const common of [0, 1, 10]) {
          const m = solubilityEquilibrium020(kind, stock, common, 0.5);
          expect(m.dissolvedMol + m.solidMol).toBeCloseTo(m.stockMol, 15);
          expect(Math.abs(m.chargeResidual)).toBeLessThan(1e-14);
          expect(m.q / m.ksp).toBeLessThanOrEqual(1 + 1e-12);
        }
  });
  it("preserves representable acid-family stock below intermediate-product underflow", () => {
    const m = buffer020(1e-320, 1e-320, 0, 1);
    expect(m.ha).toBeGreaterThan(0);
    expect(m.anion).toBeGreaterThan(0);
    expect(Math.abs(m.ha + m.anion - 2e-320)).toBeLessThanOrEqual(
      2 * Number.MIN_VALUE,
    );
    for (const kind of ["acetate", "ammonium", "both"] as const) {
      const salt = hydrolysis020(kind, 1e-320);
      if (kind !== "ammonium") {
        expect(salt.acid).toBeGreaterThan(0);
        expect(salt.acetate).toBeGreaterThan(0);
        expect(Math.abs(salt.acid + salt.acetate - 1e-320)).toBeLessThanOrEqual(
          2 * Number.MIN_VALUE,
        );
      }
      if (kind !== "acetate") {
        expect(salt.ammonium).toBeGreaterThan(0);
        expect(salt.ammonia).toBeGreaterThan(0);
        expect(
          Math.abs(salt.ammonium + salt.ammonia - 1e-320),
        ).toBeLessThanOrEqual(2 * Number.MIN_VALUE);
      }
    }
  });
  it("rejects invalid physical inputs rather than drawing invented results", () => {
    for (const call of [
      () => pressure020("volume", 0, 0),
      () => water020("acid", -1, 25),
      () => water020("water", 0, 0),
      () => buffer020(0, 0, 0, 1),
      () => hydrolysis020("nacl", NaN),
      () => neutralization020(0.1, 0, 0.1, 50),
      () => titration020("weak", 201),
      () => solubilityEquilibrium020("caf2", -1, 0, 1),
    ])
      expect(call).toThrow(RangeError);
  });
});
