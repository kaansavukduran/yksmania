import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  calorimetry019,
  colligative019,
  concentration019,
  forge019ChemistryGuideExtensions,
  forge019ChemistryGuides,
  forge019ChemistryLessons,
  forge019ChemistryTopics,
  hess019,
  ice019,
  rate019,
  solubility019,
  temperatureEquilibrium019,
} from "../src/learning/forge019Chemistry";

describe("eight new AYT chemistry narratives plus existing-equilibrium extension", () => {
  it("keeps the existing equilibrium separate and supplies ninety self-contained five-option questions", () => {
    expect(forge019ChemistryLessons).toHaveLength(9);
    expect(forge019ChemistryGuides).toHaveLength(8);
    expect(
      forge019ChemistryLessons.some((l) => l.id === "kimyasal-denge"),
    ).toBe(false);
    expect(forge019ChemistryGuides.some((g) => g.id === "kimyasal-denge")).toBe(
      false,
    );
    const extra = forge019ChemistryLessons.find(
      (l) => l.id === "kimyasal-denge-ileri",
    )!;
    expect(extra.tags).toContain("soru-seti");
    expect(extra.body).toHaveLength(0);
    expect(forge019ChemistryTopics[extra.id]).toBe("detail-426");
    expect(
      new Set(
        forge019ChemistryLessons.flatMap((l) => l.questions.map((q) => q.id)),
      ).size,
    ).toBe(90);
    for (const lesson of forge019ChemistryLessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(questionContentIssues(q)).toEqual([]);
      }
    }
  });
  it("provides full positive teaching and new worked examples without replacing the old guide", () => {
    expect(forge019ChemistryGuideExtensions).toHaveLength(1);
    expect(forge019ChemistryGuideExtensions[0].id).toBe("kimyasal-denge");
    for (const guide of [
      ...forge019ChemistryGuides,
      ...forge019ChemistryGuideExtensions,
    ]) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(
        guide.id === "kimyasal-denge" ? 8 : 10,
      );
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        expect(section.paragraphs.every((p) => p.trim().length >= 100)).toBe(
          true,
        );
      }
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        expect(example.prompt.trim().length).toBeGreaterThan(40);
        expect(example.check.trim()).not.toBe("");
        expect(example.pitfall.trim()).not.toBe("");
      }
    }
  });
  it("distinguishes solvent kg from final solution litres in the supplied dilute model", () => {
    const r = colligative019(0.1, 1, 2, 0.5);
    expect(r.molality).toBeCloseTo(0.1);
    expect(r.molarity).toBeCloseTo(0.2);
    expect(r.boilingRise).toBeCloseTo(0.104);
    expect(r.freezingDrop).toBeCloseTo(0.372);
    expect(r.osmotic).toBeCloseTo(9.8472);
    const expanded = colligative019(0.1, 1, 2, 1);
    expect(expanded.freezingDrop).toBe(r.freezingDrop);
    expect(expanded.osmotic).toBeCloseTo(r.osmotic / 2);
    expect(colligative019(0, 1, 2, 1).osmotic).toBe(0);
  });
  it("conserves water and solute through saturation, crystallisation and phase separation", () => {
    expect(solubility019(150, 60, 80, "increasing")).toMatchObject({
      dissolved: 60,
      solid: 0,
      saturated: true,
      solutionMass: 210,
      totalMass: 210,
    });
    expect(solubility019(150, 60, 20, "increasing")).toMatchObject({
      capacity: 30,
      dissolved: 30,
      solid: 30,
      solutionMass: 180,
      totalMass: 210,
    });
    expect(solubility019(100, 30, 80, "decreasing")).toMatchObject({
      capacity: 20,
      dissolved: 20,
      solid: 10,
    });
    for (const water of [50, 100, 150, 300])
      for (const total of [0, 10, 30, 60, 100])
        for (const t of [20, 40, 60, 80]) {
          const r = solubility019(water, total, t, "increasing");
          expect(r.dissolved + r.solid).toBeCloseTo(total);
          expect(r.solutionMass + r.solid).toBeCloseTo(r.totalMass);
          expect(r.dissolved).toBeLessThanOrEqual(r.capacity);
        }
  });
  it("closes the calorimeter energy ledger with the opposite reaction sign and molar scale", () => {
    expect(calorimetry019(100, 4.18, 5, 20, 0.05)).toMatchObject({
      solutionHeat: 2090,
      cupHeat: 100,
      reactionHeat: -2190,
      molarEnthalpy: -43.8,
      kind: "Ekzotermik",
    });
    const cooling = calorimetry019(100, 4.18, -5, 20, 0.1);
    expect(cooling.reactionHeat).toBeCloseTo(2190);
    expect(cooling.molarEnthalpy).toBeCloseTo(21.9);
    expect(cooling.kind).toBe("Endotermik");
    for (const dt of [-5, -1, 0, 1, 5]) {
      const r = calorimetry019(150, 4, dt, 20, 0.1);
      expect(r.solutionHeat + r.cupHeat + r.reactionHeat).toBeCloseTo(0);
    }
  });
  it("sums balanced Hess steps, reverses their heats, and does not mistake cancellation for the complete target", () => {
    expect(hess019(1, 1)).toMatchObject({
      net: { C: -1, O2: -1, CO: 0, CO2: 1 },
      heat: -393.5,
      target: true,
    });
    expect(hess019(-1, -1)).toMatchObject({ heat: 393.5, target: false });
    expect(hess019(0, 0).target).toBe(false);
    for (let a = -2; a <= 2; a++)
      for (let b = -2; b <= 2; b++) {
        const r = hess019(a, b);
        expect(r.carbonResidual).toBe(0);
        expect(r.oxygenResidual).toBe(0);
        expect(r.heat).toBeCloseTo(-110.5 * a - 283 * b);
      }
  });
  it("uses experimentally given powers and leaves k independent of concentration", () => {
    expect(rate019(0.1, 0.1).rate).toBeCloseTo(0.002);
    expect(rate019(0.2, 0.1).relative).toBeCloseTo(4);
    expect(rate019(0.1, 0.2).relative).toBeCloseTo(2);
    expect(rate019(0.2, 0.2)).toMatchObject({
      orderA: 2,
      orderB: 1,
      totalOrder: 3,
      k: 2,
    });
    expect(rate019(0.2, 0.2).rate).toBeCloseTo(0.016);
    expect(rate019(0.3, 0).rate).toBe(0);
  });
  it("solves physical ICE states in either direction and retains tiny equilibrium species", () => {
    const r = ice019(1, 0, 1, 1);
    expect(r.extent).toBeCloseTo((Math.sqrt(17) - 1) / 8, 12);
    expect(r.dimer).toBeCloseTo(0.6096117967977924, 12);
    expect(r.monomer).toBeCloseTo(0.7807764064044151, 12);
    expect(ice019(1, 0, 2, 1)).toMatchObject({
      dimer: 0.5,
      monomer: 1,
      quotient: 1,
    });
    expect(ice019(1, 1, 1, 1).extent).toBe(0);
    expect(ice019(0, 2, 1, 4).extent).toBeLessThan(0);
    for (const n of [1e-100, 1e-50, 1e-20, 1e-10, 1]) {
      const tiny = ice019(n, 0, 1, 1);
      expect(tiny.dimer).toBeGreaterThan(0);
      expect(tiny.quotient).toBeCloseTo(1, 12);
      expect(tiny.atomMol / tiny.initialAtomMol).toBeCloseTo(1, 12);
    }
    for (const d of [0, 0.5, 1, 2])
      for (const m of [0, 0.5, 2, 4])
        if (d + m) {
          const model = ice019(d, m, 2, 1);
          expect(model.dimer).toBeGreaterThan(0);
          expect(model.monomer).toBeGreaterThan(0);
          expect(model.quotient).toBeCloseTo(model.kc, 10);
          expect(model.atomMol).toBeCloseTo(model.initialAtomMol, 10);
          expect(model.extent).toBeGreaterThanOrEqual(-m / 2 - 1e-12);
          expect(model.extent).toBeLessThanOrEqual(d + 1e-12);
        }
  });
  it("separates an instantaneous concentration jump from subsequent restoration of K", () => {
    const r = concentration019(1, 0, 1);
    expect(r.instant).toEqual([2, 1, 1]);
    expect(r.initialQ).toBe(0.5);
    expect(r.direction).toBe("Ürünlere");
    expect(r.extent).toBeCloseTo(2 - Math.sqrt(3));
    expect(r.final[0]).toBeCloseTo(Math.sqrt(3));
    expect(r.final[1]).toBeCloseTo(Math.sqrt(3) - 1);
    expect(r.final[2]).toBeCloseTo(3 - Math.sqrt(3));
    const squeeze = concentration019(0, 0, 0.5);
    expect(squeeze.instant).toEqual([2, 2, 2]);
    expect(squeeze.final[2]).toBeCloseTo(2.4384471871911697);
    for (const x of [0, 0.5, 1])
      for (const xy of [0, 0.5, 1])
        for (const v of [0.5, 1, 2]) {
          const e = concentration019(x, xy, v);
          expect(e.quotient).toBeCloseTo(1, 12);
          expect(e.xInventory).toBeCloseTo(2 + x + xy);
          expect(e.yInventory).toBeCloseTo(2 + xy);
        }
  });
  it("uses only the supplied temperature table and conserves the three-mole inventory", () => {
    expect(temperatureEquilibrium019(350, "endo")).toMatchObject({
      kc: 4,
      a: 0.6,
      b: 2.4,
      direction: "Ürünlere",
    });
    expect(temperatureEquilibrium019(350, "exo")).toMatchObject({
      kc: 1,
      a: 1.5,
      b: 1.5,
      direction: "Girenlere",
    });
    for (const kind of ["endo", "exo"] as const)
      for (const t of [300, 325, 350]) {
        const r = temperatureEquilibrium019(t, kind);
        expect(r.a + r.b).toBeCloseTo(3);
        expect(r.quotient).toBeCloseTo(r.kc);
      }
  });
  it("rejects invalid physical states and nonrepresentable squared stocks explicitly", () => {
    expect(() => colligative019(0.1, 0, 1, 1)).toThrow(RangeError);
    expect(() => solubility019(100, 30, 100, "increasing")).toThrow(RangeError);
    expect(() => calorimetry019(100, 4, 3, 20, 0)).toThrow(RangeError);
    expect(() => hess019(0.5, 1)).toThrow(RangeError);
    expect(() => rate019(Number.NaN, 0.1)).toThrow(RangeError);
    expect(() => ice019(0, 0, 1, 1)).toThrow(RangeError);
    expect(() => ice019(1e-200, 0, 1, 1)).toThrow(RangeError);
    expect(() => concentration019(1, 0, 0)).toThrow(RangeError);
    expect(() => temperatureEquilibrium019(310, "endo")).toThrow(RangeError);
  });
});
