import { describe, it, expect } from "vitest";
import {
  carbonNetwork022B,
  formula022B,
  combustionFormula022B,
  hybrid022B,
  geometry022B,
  alkane022B,
  rotate022B,
  forge022ChemistryBLessons,
  forge022ChemistryBGuides,
  forge022ChemistryBTopics,
  type Molecule022B,
} from "../src/learning/forge022ChemistryB";
function cycles(edges: [number, number][], count: number, length: number) {
  const adjacent = Array.from({ length: count }, () => [] as number[]);
  for (const [a, b] of edges) {
    adjacent[a].push(b);
    adjacent[b].push(a);
  }
  let directed = 0;
  for (let first = 0; first < count; first++) {
    const walk = (path: number[]) => {
      const last = path.at(-1)!;
      if (path.length === length) {
        if (adjacent[last].includes(first)) directed++;
        return;
      }
      for (const n of adjacent[last])
        if (n > first && !path.includes(n)) walk([...path, n]);
    };
    walk([first]);
  }
  return directed / 2;
}
describe("ChemistryB022: broad self-contained original teaching", () => {
  it("keeps all five detailed headings and option-specific help aligned", () => {
    expect(Object.values(forge022ChemistryBTopics)).toEqual([
      "detail-445",
      "detail-446",
      "detail-447",
      "detail-448",
      "detail-449",
    ]);
    expect(forge022ChemistryBLessons.map((x) => x.questions.length)).toEqual([
      12, 16, 12, 12, 18,
    ]);
    expect(
      forge022ChemistryBGuides.reduce((s, x) => s + x.sections.length, 0),
    ).toBe(106);
    for (const g of forge022ChemistryBGuides) {
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 90),
        ),
      ).toBe(true);
      expect(g.examples.length).toBeGreaterThanOrEqual(6);
      expect(
        g.examples.every(
          (e) =>
            e.steps.length === 3 &&
            e.prompt &&
            e.answer &&
            e.pitfall &&
            e.check,
        ),
      ).toBe(true);
      expect(g.recall).toHaveLength(4);
    }
    for (const l of forge022ChemistryBLessons)
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.guidance?.optionReasons).toHaveLength(5);
        expect(q.guidance?.steps.length).toBeGreaterThanOrEqual(3);
        expect(q.guidance?.optionReasons[q.answer]).toBeTruthy();
        expect(
          q.explanation.tr.startsWith(q.guidance!.optionReasons[q.answer]),
        ).toBe(true);
        expect(q.prompt.tr.trim()).not.toBe("");
      }
  });
});
describe("Actual carbon topology", () => {
  it("builds the entire C60 graph, including its real pentagon/hexagon cycles", () => {
    const m = carbonNetwork022B("fullerene", 37, 23, 0);
    expect(m.points).toHaveLength(60);
    expect(m.edges).toHaveLength(90);
    expect(new Set(m.degree)).toEqual(new Set([3]));
    expect(cycles(m.edges, 60, 5)).toBe(12);
    expect(cycles(m.edges, 60, 6)).toBe(20);
    const lengths = m.edges.map(([a, b]) =>
      Math.hypot(
        m.points[a].x - m.points[b].x,
        m.points[a].y - m.points[b].y,
        m.points[a].z - m.points[b].z,
      ),
    );
    for (const l of lengths) expect(l).toBeCloseTo(lengths[0], 12);
  });
  it("does not turn fragment edges or graphite interlayer associations into extra covalent bonds", () => {
    const diamond = carbonNetwork022B("diamond", 0, 0, 0);
    expect(diamond.neighbors).toHaveLength(4);
    expect(diamond.interior).toEqual([0]);
    const g = carbonNetwork022B("graphene", 0, 0, 0),
      layers = carbonNetwork022B("graphite", 0, 0, 0);
    expect(
      g.points.length - g.edges.length + cycles(g.edges, g.points.length, 6),
    ).toBe(1);
    expect(cycles(g.edges, g.points.length, 6)).toBe(9);
    expect(layers.edges).toHaveLength(2 * g.edges.length);
    expect(
      layers.edges.every(
        ([a, b]) => a < g.points.length === b < g.points.length,
      ),
    ).toBe(true);
    expect(layers.interior.length).toBe(2 * g.interior.length);
  });
  it("preserves distances under camera rotations and guards undefined inputs", () => {
    const p = { x: 2, y: -3, z: 4 };
    for (const yaw of [-180, -35, 0, 90, 180])
      for (const pitch of [-70, 0, 23, 70]) {
        const a = rotate022B(p, yaw, pitch);
        expect(Math.hypot(a.x, a.y, a.z)).toBeCloseTo(Math.sqrt(29), 12);
      }
    expect(() => carbonNetwork022B("fullerene", 0, 0, 60)).toThrow(RangeError);
    expect(() => rotate022B(p, 181, 0)).toThrow(RangeError);
    expect(rotate022B({ x: 1e-200, y: 1e200, z: 0 }, 0, 0)).toEqual({
      x: 1e-200,
      y: 1e200,
      z: 0,
    });
    expect(rotate022B({ x: Number.MIN_VALUE, y: 1e308, z: 0 }, 0, 0)).toEqual({
      x: Number.MIN_VALUE,
      y: 1e308,
      z: 0,
    });
    expect(() =>
      rotate022B({ x: Number.MIN_VALUE, y: 0, z: 1e308 }, 45, 0),
    ).toThrow(RangeError);
    expect(
      rotate022B({ x: Number.MIN_VALUE, y: 0, z: Number.MIN_VALUE }, 45, 0).x,
    ).toBe(Number.MIN_VALUE);
    expect(() => rotate022B({ x: 1.7e308, y: 0, z: 1.7e308 }, 45, 0)).toThrow(
      RangeError,
    );
    expect(() => carbonNetwork022B("bogus" as "diamond", 0, 0, 0)).toThrow(
      RangeError,
    );
  });
});
describe("Mass → atom moles → empirical ratio → molecular multiplier", () => {
  it("finds fractional ratios and separates empirical from molecular information", () => {
    const a = formula022B({ C: 18, H: 4, O: 16 }, 0);
    expect(a.empirical).toEqual([3, 8, 2]);
    expect(a.molecular).toBeNull();
    const b = formula022B({ C: 3.6, H: 0.6, O: 4.8 }, 90);
    expect(b.empirical).toEqual([1, 2, 1]);
    expect(b.multiplier).toBe(3);
    expect(b.molecularLabel).toBe("C3H6O3");
    const bad = formula022B({ C: 12, H: 2, O: 16 }, 45);
    expect(bad.status).toBe("mass-mismatch");
    expect(bad.multiplier).toBeNull();
  });
  it("recovers only the sample oxygen and rejects impossible product mass", () => {
    const a = combustionFormula022B(4.6, 8.8, 5.4, 46);
    expect(a.consistent).toBe(true);
    expect(a.C).toBeCloseTo(2.4, 12);
    expect(a.H).toBeCloseTo(0.6, 12);
    expect(a.oxygen).toBeCloseTo(1.6, 12);
    expect(a.formula?.molecularLabel).toBe("C2H6O");
    const b = combustionFormula022B(5.6, 17.6, 7.2, 56);
    expect(b.oxygen).toBe(0);
    expect(b.formula?.molecularLabel).toBe("C4H8");
    expect(combustionFormula022B(1, 44, 18, 0).consistent).toBe(false);
    expect(() => combustionFormula022B(1, Number.MIN_VALUE, 0, 16)).toThrow(
      RangeError,
    );
    expect(() => combustionFormula022B(1, 0, Number.MIN_VALUE, 16)).toThrow(
      RangeError,
    );
  });
  it("does not certify a valence-impossible closed-shell CHO candidate or identify its structure", () => {
    const x = formula022B({ C: 24, H: 8, O: 32 }, 64);
    expect(x.molecularLabel).toBe("C2H8O2");
    expect(x.unsaturation).toBe(-1);
    expect(x.ordinaryValenceCompatible).toBe(false);
    expect(x.status).toBe("valence-mismatch");
    const y = formula022B({ C: 24, H: 6, O: 16 }, 46);
    expect(y.molecularLabel).toBe("C2H6O");
    expect(y.ordinaryValenceCompatible).toBe(true);
  });
  it("scales mole ratios without premature underflow and rejects outside its numerical scope", () => {
    const tiny = formula022B({ C: 12e-300, H: 4e-300, O: 32e-300 }, 48);
    expect(tiny.empirical).toEqual([1, 4, 2]);
    expect(tiny.molecularLabel).toBe("CH4O2");
    expect(tiny.moles.every(Number.isFinite)).toBe(true);
    for (const masses of [
      { C: 0, H: 0, O: 0 },
      { C: -1, H: 1, O: 1 },
      { C: NaN, H: 1, O: 1 },
      { C: 1e-320, H: 1, O: 1 },
    ])
      expect(() => formula022B(masses, 0)).toThrow(RangeError);
    expect(() => combustionFormula022B(6, 8.8, 3.6, 0.5)).toThrow(RangeError);
  });
});
describe("Local valence-bond domains are not a molecule-wide label", () => {
  it("distinguishes every selected C/N/O environment and all sigma/pi bonds", () => {
    const refs: [
      Molecule022B,
      number,
      string,
      number,
      number,
      number,
      number,
    ][] = [
      ["methane", 0, "sp³", 4, 0, 4, 0],
      ["ethene", 0, "sp²", 3, 0, 5, 1],
      ["ethyne", 0, "sp", 2, 0, 3, 2],
      ["allene", 0, "sp²", 3, 0, 6, 2],
      ["allene", 1, "sp", 2, 0, 6, 2],
      ["hcn", 1, "sp", 1, 1, 2, 2],
      ["formaldehyde", 1, "sp²", 1, 2, 3, 1],
      ["methanol", 1, "sp³", 2, 2, 5, 0],
    ];
    for (const [k, f, h, s, l, total, pi] of refs) {
      const m = hybrid022B(k, f, 25, 20);
      expect([m.hybrid, m.sigma, m.lonePairs, m.sigmaTotal, m.piTotal]).toEqual(
        [h, s, l, total, pi],
      );
      expect(m.hybridCount + m.pureP).toBe(4);
      expect(m.sFraction).toBe(1 / m.domains);
    }
  });
  it("actually places allene's terminal hydrogen planes perpendicular, not merely labels them", () => {
    const a = hybrid022B("allene", 1, 0, 0),
      h = a.atoms.filter((p) => p.element === "H"),
      left = h.filter((p) => p.x < 0),
      right = h.filter((p) => p.x > 0);
    expect(left).toHaveLength(2);
    expect(right).toHaveLength(2);
    expect(left.every((p) => p.z === 0)).toBe(true);
    expect(right.every((p) => p.y === 0)).toBe(true);
    expect(Math.abs(left[0].y)).toBeCloseTo(Math.sqrt(3) / 2, 12);
    expect(Math.abs(right[0].z)).toBeCloseTo(Math.sqrt(3) / 2, 12);
    expect(() => hybrid022B("hcn", 2, 0, 0)).toThrow(RangeError);
  });
});
describe("Three-dimensional VSEPR and relative contribution cancellation", () => {
  it("distinguishes molecular shape from electron-domain geometry and conserves real angles", () => {
    const a = geometry022B("nh3", 30, 20),
      b = geometry022B("h2o", 0, 0),
      c = geometry022B("ch4", 70, -20);
    expect([a.domains, a.lonePairs, a.shape]).toEqual([4, 1, "Üçgen piramit"]);
    expect(a.angles[0]).toBeCloseTo(107, 11);
    expect([b.domains, b.lonePairs, b.shape]).toEqual([4, 2, "Açısal"]);
    expect(b.angles[0]).toBeCloseTo(104.5, 11);
    for (const n of c.angles)
      expect(n).toBeCloseTo((Math.acos(-1 / 3) * 180) / Math.PI, 11);
    for (let i = 0; i < c.projected.length; i++)
      for (let j = i + 1; j < c.projected.length; j++) {
        const p = c.projected[i],
          q = c.projected[j];
        expect(p.x * q.x + p.y * q.y + p.z * q.z).toBeCloseTo(-1 / 3, 12);
      }
  });
  it("keeps polar bonds compatible with apolar CO2/BF3 and detects substituted methane", () => {
    for (const k of ["ch4", "bf3", "co2"] as const) {
      const m = geometry022B(k, 0, 0);
      expect(m.polar).toBe(false);
      expect(
        Math.hypot(m.resultant.x, m.resultant.y, m.resultant.z),
      ).toBeLessThan(1e-12);
    }
    for (const k of ["nh3", "h2o", "ch3cl"] as const)
      expect(geometry022B(k, 30, 20).polar).toBe(true);
    const cl = geometry022B("ch3cl", 0, 0);
    expect(cl.shape).toBe("Düzgün dört yüzlü");
    expect(
      Math.hypot(cl.resultant.x, cl.resultant.y, cl.resultant.z),
    ).toBeCloseTo(3, 12);
  });
});
describe("Alkane graph is an acyclic valence tree, not a formula decoration", () => {
  it("conserves hydrogens, sigma bonds and complete-combustion atoms for n1–10", () => {
    for (let n = 1; n <= 10; n++) {
      const m = alkane022B(
        n,
        Array.from({ length: n - 1 }, (_, i) => [i, i + 1]),
        0,
      );
      expect(m.hydrogenCount).toBe(2 * n + 2);
      expect(m.molarMass).toBe(14 * n + 2);
      expect(m.sigmaTotal).toBe(3 * n + 1);
      expect(m.monochloroProducts).toBe(Math.ceil(n / 2));
      expect(2 * m.oxygen).toBe(2 * m.carbonDioxide + m.water);
    }
    expect(alkane022B(1, [], 0).primary).toBe(0);
  });
  it("gives different real C5 isomer equivalence groups without counting stereoisomers", () => {
    const straight = alkane022B(
        5,
        [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
        ],
        0,
      ),
      iso = alkane022B(
        5,
        [
          [0, 1],
          [1, 2],
          [2, 3],
          [1, 4],
        ],
        1,
      ),
      neo = alkane022B(
        5,
        [
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
        ],
        1,
      );
    expect([
      straight.monochloroProducts,
      iso.monochloroProducts,
      neo.monochloroProducts,
    ]).toEqual([3, 4, 1]);
    expect([
      straight.longest.length,
      iso.longest.length,
      neo.longest.length,
    ]).toEqual([5, 4, 3]);
    expect(iso.hydrogens).toEqual([3, 1, 2, 3, 3]);
    expect(neo.equivalent).toEqual([1, 2, 3, 4]);
    expect([neo.quaternary, neo.primary]).toEqual([1, 4]);
  });
  it("rejects rings, disconnected fragments, duplicate bonds and pentavalent carbon", () => {
    expect(() =>
      alkane022B(
        4,
        [
          [0, 1],
          [1, 2],
          [2, 0],
        ],
        0,
      ),
    ).toThrow(RangeError);
    expect(() =>
      alkane022B(
        3,
        [
          [0, 1],
          [1, 0],
        ],
        0,
      ),
    ).toThrow(RangeError);
    expect(() =>
      alkane022B(
        6,
        [
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
          [0, 5],
        ],
        0,
      ),
    ).toThrow(RangeError);
    expect(() => alkane022B(2, [[0, 2]], 0)).toThrow(RangeError);
  });
});
