import { describe, expect, it } from "vitest";
import {
  configurationB017,
  quantumB017,
  angularB017,
  radiusB017,
  ionEnergyB017,
  affinityB017,
  bondB017,
  oxidationB017,
  gasB017,
  lawB017,
  forge017ChemistryBLessons,
  forge017ChemistryBGuides,
} from "../src/learning/forge017ChemistryB";

describe("AYT Kimya B: source-grounded model boundaries", () => {
  it("removes 4s before 3d and preserves actual cation relaxation regressions", () => {
    expect(configurationB017(26, 3).configuration).toBe(
      "1s2 2s2 2p6 3s2 3p6 3d5",
    );
    expect(
      configurationB017(29, 2).rows.find((r) => r.name === "3d")?.count,
    ).toBe(9);
    expect(
      configurationB017(24, 0).rows.find((r) => r.name === "4s")?.count,
    ).toBe(1);
    for (const [z, d] of [
      [23, 4],
      [27, 8],
      [28, 9],
    ]) {
      const ion = configurationB017(z, 1);
      expect(ion.rows.find((r) => r.name === "4s")?.count).toBe(0);
      expect(ion.rows.find((r) => r.name === "3d")?.count).toBe(d);
      expect(ion.electrons).toBe(z - 1);
    }
  });
  it("keeps electron count and Pauli capacities across the full first-36 domain", () => {
    for (let z = 1; z <= 36; z++)
      for (let q = 0; q <= Math.min(z, 3); q++) {
        const m = configurationB017(z, q);
        expect(m.rows.reduce((n, r) => n + r.count, 0)).toBe(z - q);
        expect(m.shells.reduce((n, v) => n + v, 0)).toBe(z - q);
        expect(
          m.rows.every((r) => r.boxes.every((v) => v >= 0 && v <= 2)),
        ).toBe(true);
      }
    expect(() => configurationB017(37, 0)).toThrow(RangeError);
    expect(() => configurationB017(1, 2)).toThrow(RangeError);
  });
  it("distinguishes forbidden quantum states from valid capacity and hydrogenic node counts", () => {
    expect(quantumB017(2, 2, 0, 0.5).valid).toBe(false);
    expect(quantumB017(3, 1, 2, 0.5).valid).toBe(false);
    expect(quantumB017(3, 1, 0, 0).valid).toBe(false);
    expect(quantumB017(4, 1, -1, -0.5)).toMatchObject({
      valid: true,
      orbitals: 3,
      capacity: 6,
      shellCapacity: 32,
      radialNodes: 2,
      angularNodes: 1,
    });
    expect(() => quantumB017(NaN, 0, 0, 0.5)).toThrow(RangeError);
  });
  it("uses a genuine angular profile and does not assign ±m to p_x/p_y", () => {
    expect(angularB017(1, 0, 0)).toBeCloseTo(1);
    expect(angularB017(1, 0, Math.PI / 2)).toBeCloseTo(0);
    expect(angularB017(1, 1, Math.PI / 2)).toBeCloseTo(1);
    expect(angularB017(2, 0, Math.acos(1 / Math.sqrt(3)))).toBeCloseTo(0);
    expect(angularB017(2, -1, 0.8)).toBeCloseTo(angularB017(2, 1, 0.8));
    expect(() => angularB017(1, 2, 0)).toThrow(RangeError);
  });
  it("applies radius ordering only inside explicit comparable families", () => {
    expect(radiusB017("iso", 4, 0)).toMatchObject({
      comparison: "<",
      a: { electrons: 10 },
      b: { electrons: 10 },
    });
    expect(radiusB017("group", 2, 0).comparison).toBe(">");
    expect(radiusB017("period", 0, 2).comparison).toBe(">");
    expect(radiusB017("iso", 1, 1).comparison).toBe("=");
    expect(() => radiusB017("unknown", 0, 1)).toThrow(RangeError);
  });
  it("separates a single ionization step, cumulative energy, and the core transition", () => {
    expect(ionEnergyB017("al", 3)).toMatchObject({
      energy: 2745,
      total: 5140,
      core: false,
      beforeCharge: 2,
      afterCharge: 3,
    });
    expect(ionEnergyB017("al", 4)).toMatchObject({
      energy: 11577,
      total: 16717,
      core: true,
    });
    expect(ionEnergyB017("mg", 2).core).toBe(false);
    expect(ionEnergyB017("mg", 3).core).toBe(true);
  });
  it("changes the affinity reporting sign without reversing the physical process", () => {
    expect(affinityB017("cl", "release")).toMatchObject({
      released: 349,
      shown: 349,
      deltaH: -349,
    });
    expect(affinityB017("cl", "enthalpy")).toMatchObject({
      released: 349,
      shown: -349,
      deltaH: -349,
    });
    expect(affinityB017("cl", "release").released).toBeGreaterThan(
      affinityB017("f", "release").released,
    );
    expect(bondB017("hf").difference).toBeCloseTo(1.78);
    expect(bondB017("hcl").difference).toBeCloseTo(0.96);
  });
  it("preserves formal charge with peroxide/fluorine exceptions and a mixed-valence mean", () => {
    for (const [kind, value] of [
      ["ammonium", -3],
      ["dichromate", 6],
      ["peroxide", -1],
      ["of2", 2],
      ["o2f2", 1],
      ["permanganate", 7],
      ["manganate", 6],
      ["fe3o4", 8 / 3],
    ] as const) {
      const m = oxidationB017(kind);
      expect(m.value).toBeCloseTo(value);
      expect(m.total).toBeCloseTo(m.charge);
    }
    expect(oxidationB017("fe3o4").fractional).toBe(true);
  });
  it("keeps ideal pressure independent of mass while rms changes with inverse sqrt mass", () => {
    const light = gasB017(1, 600, 12, 4, 3),
      heavy = gasB017(1, 600, 12, 16, 3);
    expect(light.pressure).toBeCloseTo(4.102868304047984);
    expect(heavy.pressure).toBe(light.pressure);
    expect(heavy.rms).toBeCloseTo(967.1489257307994);
    expect(light.rms! / heavy.rms!).toBeCloseTo(2);
    expect(heavy.translationEnergy).toBeCloseTo(7483.016356337916);
    expect(
      gasB017(1, 600, 12, 16, 5).force / gasB017(1, 600, 12, 16, 1).force,
    ).toBeCloseTo(5);
  });
  it("represents an empty gas vessel and rejects undefined/overflow states", () => {
    expect(gasB017(0, 300, 12, 4, 2)).toMatchObject({
      pressure: 0,
      rms: null,
      force: 0,
      translationEnergy: 0,
    });
    expect(() => gasB017(1, 0, 12, 4, 2)).toThrow(RangeError);
    expect(() => gasB017(1, 300, 0, 4, 2)).toThrow(RangeError);
    expect(() => gasB017(Infinity, 300, 12, 4, 2)).toThrow(RangeError);
  });
  it("enforces distinct law constraints and conserves PV/(nT)", () => {
    expect(lawB017("boyle", 600, 12.3, 3)).toMatchObject({
      temperature: 300,
      n: 1,
      volume: 12.3,
      pressure: 2,
    });
    expect(lawB017("charles", 600, 8.2, 3)).toMatchObject({
      temperature: 600,
      n: 1,
      volume: 49.2,
      pressure: 1,
    });
    expect(lawB017("gay", 600, 8.2, 3)).toMatchObject({
      volume: 24.6,
      n: 1,
      pressure: 2,
    });
    expect(lawB017("avogadro", 600, 8.2, 2)).toMatchObject({
      temperature: 300,
      volume: 49.2,
      n: 2,
      pressure: 1,
    });
    const m = lawB017("combined", 450, 16.4, 2);
    expect(m.pressure).toBeCloseTo(4.5);
    expect(m.invariant).toBeCloseTo(0.082);
    expect(() => lawB017("combined", 0, 10, 1)).toThrow(RangeError);
  });
  it("preserves all self-contained original question sets and deep guide structure", () => {
    expect(forge017ChemistryBLessons).toHaveLength(7);
    expect(
      forge017ChemistryBGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(74);
    for (const lesson of forge017ChemistryBLessons) {
      expect(lesson.questions).toHaveLength(10);
      const guide = forge017ChemistryBGuides.find((g) => g.id === lesson.id)!;
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(guide.examples).toHaveLength(4);
      expect(guide.examples.every((e) => e.steps.length === 3)).toBe(true);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((v) => v.tr)).size).toBe(5);
        expect(q.answer >= 0 && q.answer < 5).toBe(true);
        expect(q.hint.tr.length).toBeGreaterThan(15);
        expect(q.explanation.tr.length).toBeGreaterThan(30);
      }
    }
    const q = forge017ChemistryBLessons[1].questions[0];
    expect(q.explanation.tr).toContain("(3,2,−2,+1/2)");
    expect(q.options[q.answer].tr).toBe("(3,2,−2,+1/2)");
  });
});
