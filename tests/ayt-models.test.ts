import { describe, it, expect } from "vitest";
import {
  slopeSample,
  pointField,
  equilibriumAt,
  complement,
} from "../src/learning/aytModels";
describe("source-reviewed AYT models", () => {
  it("separates a secant, a two-sided derivative and the absolute-value corner", () => {
    expect(slopeSample("square", 2, 0.5).secant).toBe(4.5);
    expect(slopeSample("square", 2, -0.01).secant).toBeCloseTo(3.99);
    expect(slopeSample("square", 2, 0.01).tangent).toBe(4);
    expect(slopeSample("square", -1, 0.1).tangent).toBe(-2);
    expect(slopeSample("absolute", 0, -0.01)).toMatchObject({
      secant: -1,
      tangent: null,
    });
    expect(slopeSample("absolute", 0, 0.01)).toMatchObject({
      secant: 1,
      tangent: null,
    });
    expect(() => slopeSample("square", 1, 0)).toThrow();
  });
  it("uses SI units, inverse-square distance and an independent signed test charge", () => {
    expect(pointField(1, 1, 1)).toEqual({ field: 9000, force: 0.009 });
    expect(pointField(1, 2, 1).field).toBe(2250);
    expect(pointField(1, 1, -1)).toEqual({ field: 9000, force: -0.009 });
    expect(pointField(-1, 1, -1)).toEqual({ field: -9000, force: 0.009 });
    expect(pointField(1, 1, 0)).toEqual({ field: 9000, force: 0 });
    expect(pointField(0, 1, -1).force).toBeCloseTo(0);
    expect(() => pointField(1, 0, 1)).toThrow();
  });
  it("preserves total concentration, approaches the same equilibrium from both sides and keeps its ratio with catalyst", () => {
    for (const b0 of [0, 2, 3])
      for (const cat of [false, true])
        for (const t of [0, 0.5, 1, 4, 8, 100]) {
          const s = equilibriumAt(t, b0, cat);
          expect(s.a + s.b).toBeCloseTo(3, 12);
          expect(s.a).toBeGreaterThanOrEqual(0);
          expect(s.b).toBeGreaterThanOrEqual(0);
          expect(s.kc).toBe(2);
          expect(s.equilibriumA).toBe(1);
          expect(s.equilibriumB).toBe(2);
          if (b0 === 2) expect(s.forward).toBeCloseTo(s.reverse, 12);
        }
    expect(equilibriumAt(0, 0)).toMatchObject({ a: 3, b: 0, reverse: 0 });
    expect(equilibriumAt(0, 3)).toMatchObject({ a: 0, b: 3, forward: 0 });
    expect(equilibriumAt(100, 0).b).toBeCloseTo(2, 10);
    expect(equilibriumAt(100, 3).b).toBeCloseTo(2, 10);
    expect(equilibriumAt(1, 0, true).b).toBeCloseTo(
      equilibriumAt(3, 0, false).b,
      12,
    );
    expect(equilibriumAt(0, 2, true).forward).toBeCloseTo(1.8);
    expect(() => equilibriumAt(0, 4)).toThrow();
  });
  it("keeps complementary DNA base identities reversible without using RNA bases", () => {
    expect(complement("ATGCCA").join("")).toBe("TACGGT");
    expect(complement(complement("ATGCCA").join("")).join("")).toBe("ATGCCA");
    expect(() => complement("AUGC")).toThrow();
  });
});
