import { describe, expect, it } from "vitest";
import {
  rolling021,
  particleAngular021,
  angular021,
  gravity021,
  kepler021,
  forge021PhysicsLessons,
  forge021PhysicsGuides,
  forge021PhysicsTopics,
} from "../src/learning/forge021Physics";
import Forge021PhysicsLab from "../src/learning/Forge021PhysicsLab";

describe("Fizik021 — gerçek yuvarlanma, açısal itme ve odak geometrisi", () => {
  it("yuvarlanan tekerde alt hız sıfır, üst 2v, yan √2v; kayma bağımsızdır", () => {
    const top = rolling021(2, 0.4, 2, -5, "disk", 0, 90);
    const bottom = rolling021(2, 0.4, 2, -5, "disk", 0, 270);
    const side = rolling021(2, 0.4, 2, -5, "disk", 0, 0);
    expect(top.ground.x).toBeCloseTo(4, 12);
    expect(top.ground.y).toBeCloseTo(0, 12);
    expect(bottom.speed).toBeCloseTo(0, 12);
    expect(side.ground).toEqual({ x: 2, y: -2 });
    expect(side.speed).toBeCloseTo(2 * Math.SQRT2, 12);
    expect(top.noSlip).toBe(true);
    expect(rolling021(2, 0.5, 4, -6, "disk", 0, 270).contactSpeed).toBe(1);
    expect(rolling021(2, 0.5, 4, -6, "disk", 0, 270).noSlip).toBe(false);
    const turn = rolling021(2, 0.4, 2, -5, "disk", (2 * Math.PI) / 5, 90);
    expect(turn.centre.x).toBeCloseTo(2 * Math.PI * 0.4, 12);
    expect(turn.point.y).toBeCloseTo(0.8, 12);
  });
  it("moment ve toplam enerji eksene ve cisim şekline bağlıdır", () => {
    const disk = rolling021(2, 0.5, 3, -6, "disk", 0, 0);
    expect(disk.inertia).toBe(0.25);
    expect(disk.translationEnergy).toBe(9);
    expect(disk.rotationEnergy).toBe(4.5);
    expect(disk.energy).toBe(13.5);
    expect(rolling021(2, 0.5, 3, -6, "hoop", 0, 0).energy).toBe(18);
    expect(rolling021(2, 0.5, 3, -6, "sphere", 0, 0).energy).toBeCloseTo(12.6);
    const reverse = rolling021(2, 0.5, -3, 6, "disk", 0, 0);
    expect(reverse.energy).toBe(disk.energy);
    expect(reverse.noSlip).toBe(true);
  });
  it("düz giden parçacık r×p taşır; paralel veya durgun durumda L sıfırdır", () => {
    const a = particleAngular021(3, { x: 2, y: 1 }, { x: 1, y: 4 });
    expect(a.momentum).toEqual({ x: 3, y: 12 });
    expect(a.angular).toBe(21);
    expect(a.perpendicularDistance).toBeCloseTo(7 / Math.sqrt(17), 12);
    expect(particleAngular021(2, { x: 4, y: 3 }, { x: 4, y: 3 }).angular).toBe(
      0,
    );
    expect(
      particleAngular021(2, { x: 4, y: 3 }, { x: 0, y: 0 })
        .perpendicularDistance,
    ).toBe(null);
    expect(particleAngular021(2, { x: 0, y: 3 }, { x: 5, y: 0 }).angular).toBe(
      -30,
    );
  });
  it("I küçülürken L korunur ama enerji iç iş ile artabilir; dış itme yönü değiştirir", () => {
    const a = angular021(1, 1, 2, 1, 2, 0, 90);
    expect(a.initialInertia).toBe(9);
    expect(a.finalInertia).toBe(3);
    expect(a.initialL).toBe(18);
    expect(a.finalL).toBe(18);
    expect(a.finalOmega).toBe(6);
    expect(a.initialEnergy).toBe(18);
    expect(a.finalEnergy).toBe(54);
    expect(a.netWork).toBe(36);
    expect(a.points[0].y).toBeCloseTo(1, 12);
    expect(a.velocities[0].x).toBeCloseTo(-6, 12);
    const reversed = angular021(1, 1, 1, 1, 2, -20, 0);
    expect(reversed.finalL).toBe(-14);
    expect(reversed.finalOmega).toBeCloseTo(-14 / 3);
    expect(angular021(1, 1, 1, 1, 0, 0, 0).finalEnergy).toBe(0);
  });
  it("homojen küre merkezi, yüzeyi ve dışı süreklidir; potansiyel alan değildir", () => {
    const centre = gravity021(6e24, 6e6, 0, 2);
    const surface = gravity021(6e24, 6e6, 6e6, 2);
    const inside = gravity021(6e24, 6e6, 3e6, 2);
    const outside = gravity021(6e24, 6e6, 12e6, 2);
    expect(centre.field).toBe(0);
    expect(centre.potential).toBeCloseTo(1.5 * surface.potential);
    expect(centre.circularSpeed).toBe(null);
    expect(inside.field / surface.field).toBeCloseTo(0.5);
    expect(outside.field / surface.field).toBeCloseTo(0.25);
    expect(inside.enclosedMass / surface.enclosedMass).toBeCloseTo(0.125);
    expect(outside.force).toBe(-outside.reaction);
    expect(
      gravity021(6e24, 6e6, 6e6 * (1 - 1e-8), 2).potential / surface.potential,
    ).toBeCloseTo(1, 7);
    expect(
      gravity021(6e24, 6e6, 6e6 * (1 + 1e-8), 2).potential / surface.potential,
    ).toBeCloseTo(1, 7);
    expect(outside.escapeSpeed! / outside.circularSpeed!).toBeCloseTo(
      Math.SQRT2,
    );
  });
  it("aynı konumda test kütlesi yalnız kuvveti değiştirir; yörünge periyodu r³ ile tutarlıdır", () => {
    const a = gravity021(6e24, 6e6, 2e7, 2);
    const b = gravity021(6e24, 6e6, 2e7, 8);
    expect(a.force).toBeCloseTo(-2.001, 12);
    expect(a.field).toBe(b.field);
    expect(b.force / a.force).toBe(4);
    expect((a.period! * a.circularSpeed!) / (2 * Math.PI)).toBeCloseTo(2e7, 6);
  });
  it("küre içindeki temsil edilebilir küçük alan ve kütle erken underflow ile silinmez", () => {
    const tiny = gravity021(1e28, 1e4, 1e-320, 1);
    expect(tiny.field).not.toBe(0);
    expect(tiny.field / -6.669925744e-315).toBeCloseTo(1, 8);
    const enclosed = gravity021(1e28, 1e4, 1e-106, 1);
    expect(enclosed.enclosedMass / 1e-302).toBeCloseTo(1, 12);
  });
  it("gerçek elips odakta merkezlenir; uçlar, zamanlama, enerji ve alan hızı aynı çözümden gelir", () => {
    const p = kepler021(4e7, 0.5, 4e14, 0, 0.1);
    const q = kepler021(4e7, 0.5, 4e14, 0.5, 0.1);
    expect(p.position.x).toBe(2e7);
    expect(p.position.y).toBe(0);
    expect(q.position.x).toBeCloseTo(-6e7, 6);
    expect(p.speed / q.speed).toBeCloseTo(3, 12);
    expect(p.radius).toBe(2e7);
    expect(p.specificEnergy).toBe(-5e6);
    expect(p.sweptArea).toBeCloseTo(p.areaRate * p.windowTime, 0);
    for (const f of [0, 0.1, 0.25, 0.5, 0.8, 1]) {
      const a = kepler021(4e7, 0.85, 4e14, f, 0.2);
      expect(a.E - 0.85 * Math.sin(a.E)).toBeCloseTo(2 * Math.PI * f, 12);
      expect(
        (a.position.x * a.velocity.y - a.position.y * a.velocity.x) /
          a.angularSpecific,
      ).toBeCloseTo(1, 12);
      expect(
        (a.speed ** 2 / 2 - a.mu / a.radius) / a.specificEnergy,
      ).toBeCloseTo(1, 11);
      expect(
        a.position.x * a.acceleration.x + a.position.y * a.acceleration.y,
      ).toBeLessThan(0);
    }
  });
  it("çember sınırı ve üçüncü yasa doğru; eşit zamanın örneklenen sektörleri gerçek alanı yaklaşır", () => {
    const a = kepler021(4e7, 0, 4e14, 0.25, 0.1);
    expect(a.position.x).toBeCloseTo(0, 6);
    expect(a.position.y).toBeCloseTo(4e7, 6);
    expect(a.speed).toBeCloseTo(Math.sqrt(1e7));
    const four = kepler021(16e7, 0.7, 4e14, 0, 0.1);
    expect(four.period / a.period).toBeCloseTo(8);
    const twiceMass = kepler021(4e7, 0.5, 16e14, 0, 0.1);
    expect(twiceMass.period / a.period).toBeCloseTo(0.5);
    const e = kepler021(4e7, 0.6, 4e14, 0.05, 0.1);
    const polygonArea = (points: { x: number; y: number }[]) =>
      Math.abs(
        points
          .slice(1)
          .reduce((n, p, i) => n + points[i].x * p.y - points[i].y * p.x, 0),
      ) / 2;
    expect(polygonArea(e.sectorA) / e.sweptArea).toBeGreaterThan(0.995);
    expect(polygonArea(e.sectorB) / e.sweptArea).toBeGreaterThan(0.995);
    expect(polygonArea(e.sectorA) / e.sweptArea).toBeLessThanOrEqual(1.000001);
  });
  it("çok küçük yasal zaman adımı sabit bisection tabanına yuvarlanmaz", () => {
    const tiny = kepler021(1e12, 0.85, 1e12, 1e-30, 0.1);
    const referenceE = (2 * Math.PI * 1e-30) / 0.15;
    expect(tiny.E / referenceE).toBeCloseTo(1, 13);
    expect(
      tiny.position.y / (1e12 * Math.sqrt(1 - 0.85 ** 2) * referenceE),
    ).toBeCloseTo(1, 13);
    const start = kepler021(1e12, 0.85, 1e12, 0, 0.1);
    const end = kepler021(1e12, 0.85, 1e12, 1, 0.1);
    expect(end.position).toEqual(start.position);
    expect(end.velocity).toEqual(start.velocity);
  });
  it("tanım dışı ve sonlu olmayan girişler açıkça reddedilir", () => {
    for (const f of [
      () => rolling021(1, 0, 2, -2, "disk", 0, 0),
      () => rolling021(1, 1, Infinity, 1, "disk", 0, 0),
      () => particleAngular021(1, { x: NaN, y: 0 }, { x: 0, y: 0 }),
      () => angular021(0, 1, 1, 1, 1, 0, 0),
      () => gravity021(1e24, 1e6, -1, 1),
      () => kepler021(1e7, 1, 1e14, 0, 0.1),
      () => kepler021(1e7, 0.5, 1e14, 0, 0),
    ])
      expect(f).toThrow(RangeError);
  });
  it("dört bağımsız rehber ve bağlamı tam kırk özgün soru bulunur", () => {
    expect(typeof Forge021PhysicsLab).toBe("function");
    expect(forge021PhysicsLessons).toHaveLength(4);
    expect(
      forge021PhysicsGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(52);
    const ids = new Set<string>();
    for (const l of forge021PhysicsLessons) {
      expect(forge021PhysicsTopics[l.id]).toMatch(/^detail-38[6-9]$/);
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.prompt.tr.trim()).not.toBe("");
        expect(q.prompt.tr).not.toMatch(
          /(?:yukarıdaki|aşağıdaki) (?:şekil|metin)|önceki soru/u,
        );
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
      }
      const guide = forge021PhysicsGuides.find((g) => g.id === l.id)!;
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
      expect(guide.examples).toHaveLength(4);
      expect(guide.examples.every((e) => e.steps.length === 3)).toBe(true);
      expect(guide.recall).toHaveLength(4);
    }
  });
});
