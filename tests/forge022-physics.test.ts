import { describe, expect, it } from "vitest";
import {
  harmonic022,
  pendulumPeriod022,
  diffraction022,
  interference022,
  forge022PhysicsLessons,
  forge022PhysicsGuides,
  forge022PhysicsTopics,
} from "../src/learning/forge022Physics";

describe("Physics022: complete independent teaching cards", () => {
  it("has three distinct mappings, full guides and stand-alone original questions", () => {
    expect(Object.values(forge022PhysicsTopics)).toEqual([
      "detail-390",
      "detail-391",
      "detail-392",
    ]);
    expect(forge022PhysicsLessons).toHaveLength(3);
    for (const guide of forge022PhysicsGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(
        guide.sections.every(
          (s) =>
            s.paragraphs.length >= 2 &&
            s.paragraphs.every((p) => p.length > 100),
        ),
      ).toBe(true);
      expect(guide.examples.length).toBeGreaterThanOrEqual(4);
      expect(
        guide.examples.every(
          (e) =>
            e.steps.length === 3 &&
            e.prompt &&
            e.answer &&
            e.check &&
            e.pitfall,
        ),
      ).toBe(true);
      expect(guide.recall).toHaveLength(4);
    }
    for (const lesson of forge022PhysicsLessons)
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr.length).toBeGreaterThan(45);
        expect(q.explanation.tr.length).toBeGreaterThan(35);
      }
  });
});
describe("Hooke oscillator: signed states and conserved energy", () => {
  it("gives exact quarter-cycle states, not all-positive speeds", () => {
    const a = harmonic022(2, 50, 80, "single", 0.2, 0),
      b = harmonic022(2, 50, 80, "single", 0.2, 0.25),
      c = harmonic022(2, 50, 80, "single", 0.2, 0.5),
      d = harmonic022(2, 50, 80, "single", 0.2, 0.75);
    expect(a.position).toBe(0.2);
    expect(a.velocity).toBe(0);
    expect(a.force).toBe(-10);
    expect(b.position).toBe(0);
    expect(b.velocity).toBe(-1);
    expect(b.acceleration).toBe(0);
    expect(c.position).toBe(-0.2);
    expect(c.velocity).toBe(0);
    expect(c.force).toBe(10);
    expect(d.position).toBe(0);
    expect(d.velocity).toBe(1);
  });
  it("agrees with Newton, energy and a separately derived phase matrix", () => {
    for (const mass of [1, 2, 5])
      for (const k of [10, 50, 200])
        for (const A of [0, 0.1, 0.4])
          for (const t of [0, 0.13, 0.25, 0.4, 0.5, 0.75, 1, 2]) {
            const m = harmonic022(mass, k, 100, "single", A, t);
            expect(m.position).toBeCloseTo(A * Math.cos(2 * Math.PI * t), 12);
            expect(m.force).toBeCloseTo(mass * m.acceleration, 11);
            expect(m.kinetic + m.potential).toBeCloseTo((k * A * A) / 2, 10);
            expect(m.speed).toBeCloseTo(
              Math.sqrt(
                Math.max(0, (k / mass) * (A * A - m.position * m.position)),
              ),
              10,
            );
          }
  });
  it("uses the actual series/parallel spring constraints", () => {
    const s = harmonic022(2, 40, 40, "series", 0.2, 0.1),
      p = harmonic022(2, 40, 40, "parallel", 0.2, 0.1);
    expect(s.stiffness).toBe(20);
    expect(p.stiffness).toBe(80);
    expect(s.period / p.period).toBe(2);
    expect(harmonic022(2, 50, 100, "single", 0, 1).oscillating).toBe(false);
    expect(harmonic022(2, 50, 100, "single", 0, 1).energy).toBe(0);
  });
  it("supports the stated small-angle pendulum ratio and rejects a missing restoring field", () => {
    expect(
      pendulumPeriod022(4, 5).period / pendulumPeriod022(1, 10).period,
    ).toBeCloseTo(2 * Math.sqrt(2), 12);
    expect(() => pendulumPeriod022(1, 0)).toThrow(RangeError);
    expect(() => harmonic022(0, 50, 50, "single", 0.2, 0.1)).toThrow(
      RangeError,
    );
    expect(() => harmonic022(2, 50, 50, "wrong" as "single", 0.2, 0.1)).toThrow(
      RangeError,
    );
    expect(() => harmonic022(2, 50, 50, "single", -1, 0.1)).toThrow(RangeError);
    expect(() => harmonic022(2, 50, 50, "single", 0.2, NaN)).toThrow(
      RangeError,
    );
  });
});
describe("Finite aperture: normalized far-field scalar model", () => {
  it("handles the removable zero-angle limit and a real first minimum", () => {
    const axis = diffraction022(2, 4, 0, 3),
      zero = diffraction022(2, 4, 30, 3);
    expect(axis.relativeAmplitude).toBe(1);
    expect(axis.relativeEnergy).toBe(1);
    expect(axis.speed).toBe(6);
    expect(zero.firstMinimum).toBeCloseTo(30, 12);
    expect(zero.relativeAmplitude).toBeLessThan(1e-14);
    expect(diffraction022(6, 3, 50, 3).firstMinimum).toBeNull();
    expect(diffraction022(2, 2, 0, 3).firstMinimum).toBe(90);
  });
  it("preserves scale invariance, symmetry and nonnegative relative energy", () => {
    for (const angle of [-85, -30, 0, 25, 80]) {
      const a = diffraction022(2, 4, angle, 3),
        b = diffraction022(6, 12, angle, 1),
        c = diffraction022(2, 4, -angle, 3);
      expect(a.relativeAmplitude).toBeCloseTo(b.relativeAmplitude, 13);
      expect(a.relativeEnergy).toBeCloseTo(c.relativeEnergy, 13);
      expect(a.relativeEnergy).toBeGreaterThanOrEqual(0);
      expect(a.relativeEnergy).toBeLessThanOrEqual(1);
    }
  });
  it("does not call a broad aperture a zero-diffraction state and rejects invalid inputs", () => {
    expect(diffraction022(1, 20, 1, 3).relativeAmplitude).toBeGreaterThan(0);
    for (const values of [
      [0, 4, 0, 3],
      [2, 0, 0, 3],
      [2, 4, 91, 3],
      [2, 4, 0, Infinity],
    ])
      expect(() =>
        diffraction022(...(values as [number, number, number, number])),
      ).toThrow(RangeError);
  });
});
describe("Two coherent sources: geometry, amplitudes and time", () => {
  it("distinguishes a centre antinode's instant zero from a true node", () => {
    const a = interference022(4, 6, 2, 2, 0, 0, 4, 0);
    expect(a.firstDistance).toBe(5);
    expect(a.secondDistance).toBe(5);
    expect(a.kind).toBe("antinode");
    expect(a.amplitude).toBe(4);
    expect(a.height).toBeCloseTo(0, 12);
    const n = interference022(4, 6, 2, 2, 180, 0, 4, 0.25);
    expect(n.kind).toBe("node");
    expect(n.amplitude).toBe(0);
    expect(n.firstHeight).toBeCloseTo(2, 12);
    expect(n.secondHeight).toBeCloseTo(-2, 12);
  });
  it("needs equal nonzero amplitudes for a complete node", () => {
    const n = interference022(4, 6, 3, 1, 180, 0, 4, 0.25);
    expect(n.kind).toBe("minimum");
    expect(n.amplitude).toBeCloseTo(2, 12);
    expect(interference022(4, 6, 0, 2, 180, 0, 4, 0.25).kind).toBe("single");
    expect(interference022(4, 6, 0, 0, 0, 0, 4, 0.25).kind).toBe("quiet");
  });
  it("uses Euclidean paths and real hyperbolic curves, not straight artificial fringes", () => {
    const a = interference022(4, 10, 2, 2, 0, 2, 4, 0.17);
    expect(a.pathDifference).toBeCloseTo(5 - Math.sqrt(65), 12);
    expect(a.curves.filter((c) => c.kind === "antinode")).toHaveLength(5);
    expect(a.curves.filter((c) => c.kind === "node")).toHaveLength(4);
    for (const curve of a.curves)
      for (const p of curve.points) {
        const delta = Math.hypot(p.x - 5, p.y) - Math.hypot(p.x + 5, p.y);
        expect(delta).toBeCloseTo(curve.pathDifference, 10);
      }
  });
  it("keeps time-varying height inside the fixed amplitude and preserves phase shifts", () => {
    for (const phase of [0, 60, 90, 180, 270, 360])
      for (const time of [0, 0.13, 0.25, 0.5, 1]) {
        const m = interference022(3, 8, 2, 3, phase, 1, 4, time),
          delta =
            (phase * Math.PI) / 180 -
            (2 * Math.PI * (m.secondDistance - m.firstDistance)) / 3;
        expect(m.amplitude * m.amplitude).toBeCloseTo(
          13 + 12 * Math.cos(delta),
          10,
        );
        expect(Math.abs(m.height)).toBeLessThanOrEqual(m.amplitude + 1e-12);
        expect(m.amplitude).toBeGreaterThanOrEqual(1 - 1e-12);
        expect(m.amplitude).toBeLessThanOrEqual(5 + 1e-12);
      }
    expect(
      interference022(10, 2, 2, 2, 0, 0, 4, 0).curves.filter(
        (c) => c.kind === "antinode",
      ),
    ).toHaveLength(1);
  });
  it("does not turn a near-node positive amplitude into an exact node", () => {
    const near = interference022(4, 6, 2, 2, 179.99999, 0, 4, 0.25);
    expect(near.kind).toBe("partial");
    expect(near.amplitude).toBeGreaterThan(0);
    expect(near.amplitude).toBeCloseTo(
      4 * Math.abs(Math.cos((179.99999 * Math.PI) / 360)),
      12,
    );
  });
  it("rejects source cores, nonfinite geometry and outside-domain parameters", () => {
    expect(() => interference022(4, 6, 2, 2, 0, -3, 0, 0)).toThrow(RangeError);
    expect(() => interference022(4, 6, 2, 2, NaN, 0, 4, 0)).toThrow(RangeError);
    expect(() => interference022(4, 6, -1, 2, 0, 0, 4, 0)).toThrow(RangeError);
  });
});
