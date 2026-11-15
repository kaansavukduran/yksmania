import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge018ChemistryGuides,
  forge018ChemistryLessons,
  forge018ChemistryTopics,
  kinetic018,
  wetGas018,
  realGas018,
  phase018,
  phaseStates018,
  solvation018,
  molarity018,
  ionMixture018,
} from "../src/learning/forge018Chemistry";

describe("six source-based AYT chemistry units 415–420", () => {
  it("provides deep original teaching and self-contained independent five-choice practice", () => {
    expect(Object.values(forge018ChemistryTopics)).toEqual([
      "detail-415",
      "detail-416",
      "detail-417",
      "detail-418",
      "detail-419",
      "detail-420",
    ]);
    expect(forge018ChemistryLessons).toHaveLength(6);
    const ids = forge018ChemistryLessons.flatMap((l) =>
      l.questions.map((q) => q.id),
    );
    expect(new Set(ids).size).toBe(60);
    for (const l of forge018ChemistryLessons) {
      const g = forge018ChemistryGuides.find((g) => g.id === l.id)!;
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
  it("keeps mean translation energy separate from mass-dependent rms and ideal density", () => {
    const a = kinetic018(300, 2, 1),
      b = kinetic018(300, 32, 1);
    expect(a.rms / b.rms).toBeCloseTo(4, 12);
    expect(a.translationPerMol).toBeCloseTo(3741.3, 9);
    expect(a.translationPerMol).toBe(b.translationPerMol);
    expect(kinetic018(400, 32, 2).density).toBeCloseTo(1.951219512195122, 12);
    expect(kinetic018(600, 8, 1).density).toBeCloseTo(0.16260162601626016, 12);
    expect(kinetic018(600, 8, 2).rms).toBe(kinetic018(600, 8, 1).rms);
  });
  it("subtracts water contribution before changing dry-gas pressure", () => {
    const initial = wetGas018(2, 0.1, 0.01),
      compressed = wetGas018(1, 0.1, 0.01);
    expect(initial.totalPressure).toBeCloseTo(1.265, 12);
    expect(compressed.totalPressure).toBeCloseTo(2.495, 12);
    expect(compressed.totalPressure).not.toBeCloseTo(
      2 * initial.totalPressure,
      8,
    );
    expect(compressed.waterPressure).toBe(0.035);
    expect(compressed.dryPressure).toBeCloseTo(2 * initial.dryPressure, 12);
    expect(compressed.liquid).toBeGreaterThan(initial.liquid);
  });
  it("distinguishes liquid equilibrium, exact saturated zero-liquid boundary and insufficient stock", () => {
    const required = (0.035 * 2) / (0.082 * 300),
      at = wetGas018(2, 0.1, required),
      below = wetGas018(2, 0.1, required * (1 - 1e-8)),
      above = wetGas018(2, 0.1, required * (1 + 1e-8));
    expect(at.regime).toBe("saturated");
    expect(at.liquid).toBe(0);
    expect(at.waterPressure).toBe(0.035);
    expect(below.regime).toBe("unsaturated");
    expect(below.waterPressure).toBeLessThan(0.035);
    expect(above.regime).toBe("liquid");
    expect(above.liquid).toBeGreaterThan(0);
    const scarce = wetGas018(2, 0.1, 0.001);
    expect(scarce.waterPressure).toBeCloseTo(0.0123, 12);
    expect(scarce.totalPressure).toBeCloseTo(1.2423, 12);
    expect(scarce.liquid).toBe(0);
    expect(wetGas018(2, 0, 0).totalPressure).toBe(0);
  });
  it("conserves finite water inventory across the accessible range", () => {
    for (const volume of [1, 1.5, 2, 3, 4])
      for (let water = 0; water <= 20; water++) {
        const m = wetGas018(volume, 0.1, water / 1000);
        expect(m.vapour + m.liquid).toBeCloseTo(water / 1000, 14);
        expect(m.waterPressure).toBeLessThanOrEqual(0.035);
        expect(m.waterPressure).toBeCloseTo(
          (m.vapour * 0.082 * 300) / volume,
          12,
        );
      }
  });
  it("computes both signs of Z deviation without a universal real-pressure inequality", () => {
    expect(realGas018(1).z).toBeCloseTo(0.8130081300813008, 12);
    expect(realGas018(1.5).z).toBeCloseTo(1.2195121951219512, 12);
    expect(realGas018(1).difference).toBeLessThan(0);
    expect(realGas018(1.5).difference).toBeGreaterThan(0);
    expect(realGas018(1.23).z).toBeCloseTo(1, 12);
  });
  it("uses only stated CO2 phase points, keeping two critical conditions and coexistence distinct", () => {
    expect(phaseStates018).toHaveLength(6);
    expect(phase018("super")).toMatchObject({
      temperature: 40,
      pressure: 80,
      phase: "Kritiküstü akışkan",
    });
    expect(phase018("hot").phase).toBe("Gaz");
    expect(phase018("liquid").phase).toBe("Sıvı");
    expect(phase018("coexist").phase).toBe("Katı ve buhar dengesi");
    expect(phase018("super").temperature).toBeGreaterThan(
      phase018("super").criticalTemperature,
    );
    expect(phase018("hot").pressure).toBeLessThan(
      phase018("hot").criticalPressure,
    );
  });
  it("adds energy contributions but does not return invented solubility", () => {
    expect(solvation018(12, 28, -46, "na")).toMatchObject({
      enthalpy: -6,
      levels: [0, 12, 40, -6],
      facing: "Oδ⁻",
      process: "Ekzotermik",
    });
    expect(solvation018(20, 30, -40, "cl")).toMatchObject({
      enthalpy: 10,
      facing: "Hδ⁺",
      process: "Endotermik",
    });
    expect(solvation018(20, 20, -40, "na").enthalpy).toBe(0);
    expect(solvation018(12, 28, -46, "na")).not.toHaveProperty("solubility");
  });
  it("preserves sampled solute moles and uses final measured solution volume", () => {
    expect(molarity018(0.4, 250, 500)).toMatchObject({
      moles: 0.1,
      molarity: 0.2,
      dilutionFactor: 2,
    });
    expect(molarity018(0.4, 250, 500).mass).toBeCloseTo(5.85, 12);
    expect(molarity018(0.6, 150, 450).molarity).toBeCloseTo(0.2, 12);
    expect(molarity018(0, 250, 500).molarity).toBe(0);
    expect(molarity018(0.4, 250, 250).molarity).toBeCloseTo(0.4, 12);
  });
  it("counts two chloride sources and independent charge balance", () => {
    const m = ionMixture018(0.1, 200, 0.2, 300);
    expect(m.volume).toBe(0.5);
    expect(m.calcium).toBeCloseTo(0.04, 12);
    expect(m.sodium).toBeCloseTo(0.12, 12);
    expect(m.chloride).toBeCloseTo(0.2, 12);
    expect(m.totalIonM).toBeCloseTo(0.36, 12);
    expect(m.positiveCharge).toBeCloseTo(m.negativeCharge, 12);
    for (const ca of [0, 0.1, 0.25, 0.5])
      for (const na of [0, 0.1, 0.25, 0.5])
        for (const va of [100, 200, 400])
          for (const vb of [100, 300, 400]) {
            const x = ionMixture018(ca, va, na, vb);
            expect(x.chlorideMol).toBeCloseTo(
              2 * x.calciumMol + x.sodiumMol,
              14,
            );
            expect(x.positiveCharge).toBeCloseTo(x.negativeCharge, 14);
          }
    expect(ionMixture018(0, 200, 0, 300).totalIonM).toBe(0);
    expect(ionMixture018(0, 200, 0.2, 300).sodium).toBe(
      ionMixture018(0, 200, 0.2, 300).chloride,
    );
  });
  it("rejects values outside the visible scientific model assumptions", () => {
    for (const bad of [
      () => kinetic018(0, 32, 1),
      () => kinetic018(300, 0, 1),
      () => wetGas018(0, 0.1, 0.01),
      () => wetGas018(2, 0.1, -1),
      () => realGas018(Number.NaN),
      () => phase018("unknown"),
      () => solvation018(12, 28, 46, "na"),
      () => molarity018(0.4, 250, 100),
      () => ionMixture018(-0.1, 100, 0.2, 200),
    ])
      expect(bad).toThrow(RangeError);
  });
});
