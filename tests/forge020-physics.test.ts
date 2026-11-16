import { describe, it, expect } from "vitest";
import {
  lorentz020,
  magneticMotion020,
  inductionRod020,
  seriesRlc020,
  transformer020,
  circular020,
  forge020PhysicsLessons,
  forge020PhysicsGuides,
  forge020PhysicsTopics,
} from "../src/learning/forge020Physics";
import Forge020PhysicsLab from "../src/learning/Forge020PhysicsLab";
describe("Fizik020 — alan, güç, faz ve gerçek kuvvet koşulları", () => {
  it("Lorentz çapraz çarpımı hıza iş yapmaz, yük işareti kuvveti döndürür", () => {
    const a = lorentz020(2e-6, { x: 3, y: 4, z: 0 }, { x: 0, y: 0, z: 0.5 });
    expect(a.force).toEqual({ x: 4e-6, y: -3e-6, z: 0 });
    expect(a.magnitude).toBeCloseTo(5e-6, 14);
    expect(a.power).toBeCloseTo(0, 16);
    const b = lorentz020(-2e-6, { x: 3, y: 4, z: 1 }, { x: 0, y: 0, z: 0.5 });
    expect(b.force.x).toBe(-a.force.x);
    expect(b.force.y).toBe(-a.force.y);
    expect(
      lorentz020(1, { x: 0, y: 0, z: 2 }, { x: 0, y: 0, z: 3 }).magnitude,
    ).toBe(0);
  });
  it("analitik gyro gerçek daire ve teğet hızı korur; sıfır alan doğru harekettir", () => {
    const a = magneticMotion020(1e-6, 2, 0.5, 4, 0, Math.PI / 2);
    expect(a.x).toBeCloseTo(4, 12);
    expect(a.y).toBeCloseTo(-4, 12);
    expect(a.velocity.x).toBeCloseTo(0, 12);
    expect(a.velocity.y).toBeCloseTo(-4, 12);
    expect(a.radius).toBe(4);
    expect(a.period).toBeCloseTo(2 * Math.PI, 12);
    const b = magneticMotion020(1e-6, -2, 0.5, 4, 0, Math.PI / 2);
    expect(b.x).toBeCloseTo(a.x, 12);
    expect(b.y).toBeCloseTo(-a.y, 12);
    expect(b.kinetic).toBe(a.kinetic);
    expect(magneticMotion020(1e-6, 2, 0, 3, -4, 2)).toMatchObject({
      x: 6,
      y: -8,
      radius: null,
      period: null,
    });
    expect(magneticMotion020(1e-6, 0, 0.5, 3, -4, 2)).toMatchObject({
      x: 6,
      y: -8,
      radius: null,
    });
    for (const q of [-3, -1, 1, 3])
      for (const t of [0, 0.1, 1, 3]) {
        const m = magneticMotion020(0.000001, q, 0.5, 3, 4, t);
        expect(Math.hypot(m.velocity.x, m.velocity.y)).toBeCloseTo(5, 10);
        expect(m.force.x * m.velocity.x + m.force.y * m.velocity.y).toBeCloseTo(
          0,
          12,
        );
        expect(Math.hypot(m.x - m.centre!.x, m.y - m.centre!.y)).toBeCloseTo(
          m.radius!,
          10,
        );
      }
  });
  it("ray çubuğu yönü, açık uç ve mekanik güç aynı Lenz bilançosunu verir", () => {
    const m = inductionRod020(0.5, 0.4, 0.8, 3, 2, true);
    expect(m.flux).toBeCloseTo(0.16, 12);
    expect(m.emf).toBeCloseTo(-0.6, 12);
    expect(m.current).toBeCloseTo(-0.3, 12);
    expect(m.topMinusBottom).toBeCloseTo(-0.6, 12);
    expect(m.magneticForce).toBeCloseTo(-0.06, 12);
    expect(m.externalPower).toBeCloseTo(0.18, 12);
    expect(m.heatPower).toBeCloseTo(0.18, 12);
    const reverseB = inductionRod020(-0.5, 0.4, 0.8, 3, 2, true);
    expect(reverseB.emf).toBeCloseTo(0.6, 12);
    expect(reverseB.magneticForce).toBeCloseTo(-0.06, 12);
    const backwards = inductionRod020(0.5, 0.4, 0.8, -3, 2, true);
    expect(backwards.magneticForce).toBeCloseTo(0.06, 12);
    expect(backwards.externalPower).toBeCloseTo(0.18, 12);
    const open = inductionRod020(0.5, 0.4, 0.8, 3, 2, false);
    expect(open.emf).toBeCloseTo(-0.6, 12);
    expect(open.current).toBe(0);
    expect(open.heatPower).toBe(0);
    expect(inductionRod020(0.5, 0.4, 1.6, 3, 2, true).emf).toBeCloseTo(
      m.emf,
      12,
    );
  });
  it("seri rezonans ve kapasitif faz anlık/ortalama güçle tutarlıdır", () => {
    const a = seriesRlc020(60, 30, 100, 0.4, 0.00025, 90);
    expect(a.xl).toBe(40);
    expect(a.xc).toBe(40);
    expect(a.impedance).toBe(30);
    expect(a.rmsCurrent).toBe(2);
    expect(a.phase).toBe(0);
    expect(a.vl).toBe(80);
    expect(a.vc).toBe(80);
    expect(a.realPower).toBe(120);
    expect(a.resonantOmega).toBe(100);
    const b = seriesRlc020(60, 30, 100, 0.4, 0.0005, 90);
    expect(b.reactance).toBe(20);
    expect(b.impedance).toBeCloseTo(Math.sqrt(1300), 12);
    expect(b.realPower).toBeCloseTo((3600 / 1300) * 30, 10);
    expect(b.phase).toBeGreaterThan(0);
    const c = seriesRlc020(50, 30, 100, 0, 0.0001, 0);
    expect(c.phase).toBeLessThan(0);
    expect(c.current).toBeGreaterThan(0);
    let average = 0;
    for (let d = 0; d < 360; d++)
      average += seriesRlc020(60, 30, 100, 0.4, 0.0005, d).instantPower / 360;
    expect(average).toBeCloseTo(b.realPower, 10);
    const zero = seriesRlc020(0, 30, 100, 0.4, 0.00025, 90);
    expect(zero.rmsCurrent).toBe(0);
    expect(zero.current).toBe(0);
    expect(zero.realPower).toBe(0);
  });
  it("trafo yükünün gücü girişte karşılanır; DC için AC sayıları uydurulmaz", () => {
    const a = transformer020(120, 400, 100, 30, true);
    expect(a).toMatchObject({
      secondaryVoltage: 30,
      secondaryCurrent: 1,
      primaryCurrent: 0.25,
      inputPower: 30,
      outputPower: 30,
    });
    const b = transformer020(120, 400, 200, 30, true);
    expect(b).toMatchObject({
      secondaryVoltage: 60,
      secondaryCurrent: 2,
      primaryCurrent: 1,
      inputPower: 120,
      outputPower: 120,
    });
    expect(transformer020(120, 400, 100, 30, false)).toMatchObject({
      secondaryVoltage: null,
      primaryCurrent: null,
      outputPower: null,
    });
  });
  it("çemberin gerçek vektörleri diktir; sürtünme yetersizse daire kanıtlanmaz", () => {
    const a = circular020(5, 2, 5, 0.5, 10, 90);
    expect(a.feasible).toBe(true);
    expect(a.required).toBe(10);
    expect(a.maximumFriction).toBe(10);
    expect(a.velocity.x).toBeCloseTo(-5, 12);
    expect(a.velocity.y).toBeCloseTo(0, 12);
    expect(a.accelerationVector.y).toBeCloseTo(-5, 12);
    expect(a.selectedTime).toBeCloseTo(Math.PI / 2, 12);
    const b = circular020(5, 2, 10, 0.5, 10, 90);
    expect(b.feasible).toBe(false);
    expect(b.required).toBe(40);
    expect(b.actualFriction).toBeNull();
    expect(b.period).toBeNull();
    expect(b.selectedTime).toBeNull();
    const cw = circular020(5, 2, 5, 0.5, 10, 90, -1);
    expect(cw.position.y).toBeCloseTo(-5, 12);
    expect(cw.velocity.x).toBeCloseTo(-5, 12);
    expect(cw.accelerationVector.y).toBeCloseTo(5, 12);
    expect(circular020(5, 2, 1e-7, 0, 10, 0).feasible).toBe(false);
    const edge = Math.sqrt(40),
      bits = new Float64Array([edge]),
      word = new BigUint64Array(bits.buffer);
    word[0] += 1n;
    expect(circular020(10, 2, edge, 0.4, 10, 0).feasible).toBe(true);
    expect(circular020(10, 2, bits[0], 0.4, 10, 0).feasible).toBe(false);
    expect(() => magneticMotion020(1, 1e-300, 1e-10, 1, 0, 1)).toThrow(
      RangeError,
    );
    expect(() => magneticMotion020(1, Number.MIN_VALUE, 1, 1, 0, 1)).toThrow(
      RangeError,
    );
    const tiny = magneticMotion020(1, 1e-170, 1, 1, 0, 1);
    expect(tiny.y / -5e-177).toBeCloseTo(1, 12);
    expect(tiny.x).toBe(1);
    expect(circular020(5, 2, 0, 0, 10, 0).period).toBeNull();
  });
  it("tekil ve bozuk girdiler açık reddedilir", () => {
    const bad = [
      () => lorentz020(NaN, { x: 1, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }),
      () => magneticMotion020(0, 1, 1, 1, 0, 1),
      () => magneticMotion020(1e-6, 1, 1, 1, 0, -1),
      () => inductionRod020(1, 0.5, 1, 3, 0, true),
      () => inductionRod020(1, 0.5, 0, 3, 1, true),
      () => seriesRlc020(60, 0, 100, 0.4, 0.00025, 0),
      () => seriesRlc020(60, 30, 0, 0.4, 0.00025, 0),
      () => seriesRlc020(60, 30, 100, 0.4, 0, 0),
      () => transformer020(120, 0, 100, 30, true),
      () => transformer020(120, 400, 100.5, 30, true),
      () => circular020(0, 2, 5, 0.5, 10, 90),
      () => circular020(5, 2, -1, 0.5, 10, 90),
      () => circular020(5, 2, 5, -0.1, 10, 90),
    ];
    for (const f of bad) expect(f).toThrow(RangeError);
  });
  it("beş tam bağımsız paket gerçek detay kimlikleriyle açılır", () => {
    expect(forge020PhysicsLessons).toHaveLength(5);
    expect(Object.values(forge020PhysicsTopics)).toEqual([
      "detail-381",
      "detail-382",
      "detail-383",
      "detail-384",
      "detail-385",
    ]);
    expect(
      forge020PhysicsGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(68);
    for (const g of forge020PhysicsGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const e of g.examples) expect(e.steps).toHaveLength(3);
    }
    for (const l of forge020PhysicsLessons)
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.explanation.tr).not.toBe(q.options[q.answer].tr);
      }
    expect(Forge020PhysicsLab({ lessonId: "unknown" })).toBeNull();
  });
});
