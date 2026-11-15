import { describe, it, expect } from "vitest";
import {
  impulse018,
  collision018,
  concurrent018,
  torque018,
  centre018,
  pulley018,
  ramp018,
  coulomb018,
  forge018PhysicsLessons,
  forge018PhysicsGuides,
  forge018PhysicsTopics,
} from "../src/learning/forge018Physics";
describe("Fizik018 — koşullu fiziksel modeller", () => {
  it("işaretli iki alan momentum ve kademeli konumla tutarlıdır", () => {
    const a = impulse018(2, 3, 4, 2, -6, 1, 3);
    expect(a.impulse).toBe(2);
    expect(a.momentum).toBe(8);
    expect(a.velocity).toBe(4);
    expect(a.displacement).toBe(15.5);
    const b = impulse018(2, 3, 4, 2, -8, 1, 3);
    expect(b.impulse).toBe(0);
    expect(b.velocity).toBe(3);
    expect(b.displacement).toBe(15);
    expect(impulse018(1, 5, -5, 2, 0, 1, 2).velocity).toBe(-5);
    expect(impulse018(2, 3, 4, 2, -6, 1, 2).displacement).toBe(10);
    expect(impulse018(2, 3, 4, 2, -6, 1, 0).displacement).toBe(0);
  });
  it("çarpışma katsayısı momentumla ve kinetik aktarımla birlikte çalışır", () => {
    const elastic = collision018(1, 2, 6, 0, 1);
    expect(elastic.afterA).toBe(-2);
    expect(elastic.afterB).toBe(4);
    expect(elastic.loss).toBe(0);
    const sticky = collision018(2, 1, 4, -2, 0);
    expect(sticky.afterA).toBe(2);
    expect(sticky.afterB).toBe(2);
    expect(sticky.loss).toBe(12);
    for (const e of [0, 0.25, 0.5, 0.75, 1]) {
      const a = collision018(2, 3, 5, -2, e);
      expect(a.finalMomentum).toBeCloseTo(a.initialMomentum, 10);
      expect(a.initialKinetic - a.finalKinetic).toBeCloseTo(a.loss, 10);
      expect(a.afterB - a.afterA).toBeCloseTo(7 * e, 10);
      expect(a.impulseA + a.impulseB).toBeCloseTo(0, 10);
    }
    expect(collision018(1, 1, 0, 0, 0).approaching).toBe(false);
  });
  it("düğümün gerçek yatay açıları iki kuvvet toplamını sıfırlar", () => {
    const a = concurrent018(100, 30, 60);
    expect(a.left).toBeCloseTo(50);
    expect(a.right).toBeCloseTo(50 * Math.sqrt(3));
    for (const l of [5, 30, 45, 70, 85])
      for (const r of [5, 30, 45, 70, 85]) {
        const v = concurrent018(100, l, r);
        expect(v.sumX).toBeCloseTo(0, 9);
        expect(v.sumY).toBeCloseTo(0, 9);
        expect(v.left).toBeGreaterThan(0);
        expect(v.right).toBeGreaterThan(0);
      }
    expect(concurrent018(100, 30, 30).left).toBeCloseTo(100);
  });
  it("moment gerçek çapraz çarpım ve doğruya dik ayakla doğrulanır", () => {
    const a = torque018({ x: 2, y: 1 }, { x: 3, y: 4 });
    expect(a.moment).toBe(5);
    expect(a.arm).toBe(1);
    expect(a.foot!.x).toBeCloseTo(0.8);
    expect(a.foot!.y).toBeCloseTo(-0.6);
    const b = torque018({ x: 2, y: 1 }, { x: 3, y: -4 });
    expect(b.moment).toBe(-11);
    expect(b.arm).toBeCloseTo(2.2);
    expect(b.foot!.x).toBeCloseTo(1.76);
    expect(b.foot!.y).toBeCloseTo(1.32);
    expect(torque018({ x: 2, y: 0 }, { x: 0, y: 10 }).moment).toBe(
      torque018({ x: 2, y: 3 }, { x: 0, y: 10 }).moment,
    );
    expect(torque018({ x: 3, y: 0 }, { x: -20, y: 0 }).moment).toBe(0);
    expect(torque018({ x: 2, y: 1 }, { x: 0, y: 0 }).arm).toBeNull();
    expect(torque018({ x: 2, y: 1 }, { x: 0, y: 0 }).foot).toBeNull();
    for (const tiny of [1e-320, Number.MIN_VALUE]) {
      const small = torque018({ x: 1, y: 1 }, { x: tiny, y: 0 });
      expect(small.foot).toEqual({ x: 0, y: 1 });
      expect(small.arm).toBe(1);
      expect(small.moment).toBe(-tiny);
    }
  });
  it("hücre çıkarımı kalan kütleyi kullanır ve boş dağılım merkez yaratmaz", () => {
    expect(
      centre018([
        { mass: 2, x: 0, y: 0 },
        { mass: 3, x: 10, y: 0 },
      ]).centre,
    ).toEqual({ x: 6, y: 0 });
    const points = Array.from({ length: 16 }, (_, i) => ({
      mass: i % 4 === 3 ? 0 : 1,
      x: (i % 4) + 0.5,
      y: 3.5 - Math.floor(i / 4),
    }));
    expect(centre018(points)).toMatchObject({
      mass: 12,
      momentX: 18,
      momentY: 24,
      centre: { x: 1.5, y: 2 },
    });
    expect(centre018([]).centre).toBeNull();
    expect(centre018([{ mass: 0, x: 4, y: 3 }]).centre).toBeNull();
    expect(
      centre018([
        { mass: 3, x: 0, y: 3 },
        { mass: 2, x: 1, y: 1 },
        { mass: 1, x: 4, y: 1 },
      ]).centre,
    ).toEqual({ x: 1, y: 2 });
  });
  it("hareketli makara potansiyeli ısıya çevrilmez", () => {
    const a = pulley018(80, 20, 2, 1);
    expect(a.effort).toBe(50);
    expect(a.pull).toBe(2);
    expect(a.inputWork).toBe(100);
    expect(a.usefulWork).toBe(80);
    expect(a.accessoryWork).toBe(20);
    expect(a.loss).toBe(0);
    expect(pulley018(80, 0, 1, 2)).toMatchObject({
      effort: 80,
      pull: 2,
      inputWork: 160,
    });
    expect(pulley018(80, 20, 2, 0).inputWork).toBe(0);
  });
  it("rampada kuvvet, ısı ve potansiyel aynı bilanço verir", () => {
    const a = ramp018(100, 5, 3, 0.25);
    expect(a.normal).toBe(80);
    expect(a.friction).toBe(20);
    expect(a.effort).toBe(80);
    expect(a.heat).toBe(100);
    expect(a.efficiency).toBe(0.75);
    for (const h of [0, 1, 3, 5])
      for (const mu of [0, 0.25, 1]) {
        const v = ramp018(100, 5, h, mu);
        expect(v.inputWork).toBeCloseTo(v.usefulWork + v.heat, 10);
      }
    expect(ramp018(100, 5, 0, 0).efficiency).toBeNull();
    expect(ramp018(100, 5, 0, 0).gain).toBeNull();
    expect(ramp018(100, 5, 5, 0.25).normal).toBe(0);
  });
  it("Coulomb yönleri, ortam ve sıfır hedef alanla karıştırılmaz", () => {
    const a = coulomb018(
      [
        { x: -1, y: 0, microCoulomb: 2 },
        { x: 1, y: 0, microCoulomb: -2 },
      ],
      { x: 0, y: 1, microCoulomb: 1 },
      1,
    );
    expect(a.force.x).toBeCloseTo(0.009 * Math.sqrt(2), 10);
    expect(a.force.y).toBe(0);
    const b = coulomb018(a.sources, { ...a.target, microCoulomb: 0 }, 1);
    expect(b.forceMagnitude).toBe(0);
    expect(b.field).toEqual(a.field);
    const medium = coulomb018(a.sources, a.target, 4);
    expect(medium.force.x).toBeCloseTo(a.force.x / 4, 10);
    const inverse = coulomb018(
      a.sources.map((s) => ({ ...s, microCoulomb: -s.microCoulomb })),
      { ...a.target, microCoulomb: -1 },
      1,
    );
    expect(inverse.force).toEqual(a.force);
    for (const c of a.contributions) {
      expect(c.force.x + c.reaction.x).toBe(0);
      expect(c.force.y + c.reaction.y).toBe(0);
    }
  });
  it("tekil/uygunsuz girdiler ve sonlu olmayan sayılar açık reddedilir", () => {
    const calls = [
      () => impulse018(0, 0, 1, 1, 1, 1, 1),
      () => impulse018(1, 0, 1, 1, 1, 1, 3),
      () => collision018(1, 1, -1, 1, 0.5),
      () => collision018(1, 1, 1, 0, 1.1),
      () => concurrent018(100, 0, 30),
      () => concurrent018(0, 30, 30),
      () => torque018({ x: Infinity, y: 0 }, { x: 1, y: 1 }),
      () => centre018([{ mass: -1, x: 0, y: 0 }]),
      () => pulley018(80, 20, 1, 1),
      () => pulley018(80, 0, 3, 1),
      () => ramp018(100, 3, 4, 0),
      () => ramp018(100, 5, 3, -0.1),
      () =>
        coulomb018(
          [{ x: 0, y: 0, microCoulomb: 1 }],
          { x: 0, y: 0, microCoulomb: 1 },
          1,
        ),
      () => coulomb018([], { x: 0, y: 0, microCoulomb: NaN }, 1),
    ];
    for (const call of calls) expect(call).toThrow(RangeError);
  });
  it("altı özgün paket gerçek konu kimlikleri ve tam bağlamla dışa açılır", () => {
    expect(forge018PhysicsLessons).toHaveLength(6);
    expect(
      forge018PhysicsGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(64);
    expect(Object.values(forge018PhysicsTopics).sort()).toEqual([
      "detail-369",
      "detail-370",
      "detail-371",
      "detail-372",
      "detail-373",
      "detail-374",
    ]);
    for (const l of forge018PhysicsLessons) {
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.prompt.tr.length).toBeGreaterThan(45);
        expect(q.explanation.tr.trim()).not.toBe(q.options[q.answer].tr.trim());
      }
    }
    expect(forge018PhysicsLessons[2].questions[0].prompt.tr).toContain(
      "kuvveti A noktasına uygulanıyor",
    );
  });
});
