import { describe, it, expect } from "vitest";
import {
  polygon032,
  trapezoid032,
  kite032,
  parallelogram032,
  prism032,
  pyramid032,
  quadrilateral032,
} from "../src/learning/geometryExpansion032Model";
const shoelace = (p: { x: number; y: number }[]) =>
  Math.abs(
    p.reduce((s, v, i) => {
      const w = p[(i + 1) % p.length];
      return s + v.x * w.y - w.x * v.y;
    }, 0),
  ) / 2;
describe("032 geometric quantities are independent of illustration projection", () => {
  it("triangulates every supported regular polygon with the correct combinatorics and actual side lengths", () => {
    for (let n = 3; n <= 12; n++) {
      const m = polygon032(n, 7);
      expect(m.fanTriangles).toBe(n - 2);
      expect(m.diagonals).toBe(
        Array.from({ length: n }, (_, i) =>
          Array.from({ length: n }, (_, j) =>
            j > i && j - i > 1 && !(i === 0 && j === n - 1) ? 1 : 0,
          ).reduce<number>((a, b) => a + b, 0),
        ).reduce((a, b) => a + b, 0),
      );
      expect(n * m.exteriorAngle).toBeCloseTo(360);
      expect(m.interiorAngle + m.exteriorAngle).toBeCloseTo(180);
      for (let i = 0; i < n; i++) {
        const a = m.vertices[i],
          b = m.vertices[(i + 1) % n];
        expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeCloseTo(7);
      }
    }
  });
  it("trapezoid shear leaves area and midline unchanged, including a parallelogram", () => {
    for (const offset of [-6, 0, 2, 8]) {
      const m = trapezoid032(10, 6, 5, offset);
      expect(shoelace(m.points)).toBeCloseTo(40);
      expect(m.area).toBe(40);
      expect(m.midline).toBe(8);
    }
    expect(trapezoid032(8, 8, 5, 3).area).toBe(40);
  });
  it("a kite need not have both diagonals bisected", () => {
    const m = kite032(8, 3, 6);
    expect(m.area).toBe(36);
    expect(shoelace(m.points)).toBe(36);
    expect(m.upperSide).toBe(5);
    expect(m.bothBisect).toBe(false);
    expect(kite032(8, 6, 6).bothBisect).toBe(true);
  });
  it("uses height rather than the oblique side for parallelogram area", () => {
    for (const s of [-8, 0, 4, 8]) {
      const m = parallelogram032(10, 6, s);
      expect(m.area).toBe(60);
      expect(shoelace(m.points)).toBe(60);
      expect(m.side).toBeCloseTo(Math.sqrt(36 + s * s));
    }
    expect(parallelogram032(10, 8, 6).rhombus).toBe(true);
    expect(parallelogram032(8, 8, 0).square).toBe(true);
  });
  it("preserves the inclusive quadrilateral hierarchy without turning every trapezoid into a parallelogram", () => {
    for (const kind of ["square", "rhombus", "rectangle", "parallelogram"]) {
      expect(quadrilateral032(kind).trapezoid).toBe(true);
      expect(quadrilateral032(kind).parallelogram).toBe(true);
    }
    expect(quadrilateral032("trapezoid").parallelogram).toBe(false);
    expect(quadrilateral032("kite").trapezoid).toBe(false);
    expect(quadrilateral032("square").kite).toBe(true);
  });
  it("counts all six prism faces and proves the spatial diagonal in two right triangles", () => {
    const m = prism032(3, 4, 12);
    expect(m.baseArea).toBe(12);
    expect(m.surface).toBe(192);
    expect(m.volume).toBe(144);
    expect(m.baseDiagonal).toBe(5);
    expect(m.spaceDiagonal).toBe(13);
  });
  it("distinguishes pyramid face height and lateral edge and scales parallel sections from the apex", () => {
    const m = pyramid032(8, 3, 0.5);
    expect(m.apothem).toBe(5);
    expect(m.edge).toBeCloseTo(Math.sqrt(41));
    expect(m.surface).toBe(144);
    expect(m.volume).toBe(64);
    expect(m.sectionSide).toBe(4);
    expect(m.sectionArea).toBe(16);
    expect(m.smallHeight).toBe(1.5);
    expect(m.smallVolume).toBe(8);
    for (const k of [0.2, 0.3, 0.8]) {
      const n = pyramid032(10, 9, k);
      expect(n.sectionArea / n.baseArea).toBeCloseTo(k * k);
      expect(n.smallVolume / n.volume).toBeCloseTo(k ** 3);
    }
  });
  it("rejects non-finite persisted numbers by restoring meaningful finite defaults", () => {
    expect(polygon032(NaN).n).toBe(5);
    expect(prism032(Infinity, NaN, -1).volume).toBeGreaterThan(0);
    expect(pyramid032(NaN, Infinity, NaN).surface).toBeGreaterThan(0);
  });
});
