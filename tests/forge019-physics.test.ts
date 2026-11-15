import { describe, it, expect } from "vitest";
import Forge019PhysicsLab from "../src/learning/Forge019PhysicsLab";
import {
  pairEnergy019,
  systemEnergy019,
  potential019,
  plates019,
  capacitor019,
  wireField019,
  loopField019,
  solenoidField019,
  forge019PhysicsLessons,
  forge019PhysicsGuides,
  forge019PhysicsGuideExtensions,
  forge019PhysicsTopics,
} from "../src/learning/forge019Physics";
describe("Fizik019 — iş, kaynak alanı ve sınır koşulları", () => {
  it("çekime karşı dış iş ve elektrik işi aynı enerjiyi iki kez saymaz", () => {
    const m = pairEnergy019(2, -3, 1, 2);
    expect(m.initialU).toBeCloseTo(-0.054, 12);
    expect(m.currentU).toBeCloseTo(-0.027, 12);
    expect(m.deltaU).toBeCloseTo(0.027, 12);
    expect(m.electricWork).toBeCloseTo(-0.027, 12);
    expect(m.externalQuasistaticWork).toBeCloseTo(0.027, 12);
    expect(m.radialForce).toBeCloseTo(-0.0135, 12);
    expect(pairEnergy019(0, 3, 1, 2).deltaU).toBe(0);
    expect(pairEnergy019(2, 3, 2, 2).electricWork).toBe(0);
  });
  it("üç yükün üç ayrı çiftini yalnız birer kez sayar", () => {
    const m = systemEnergy019([
      { x: 0, y: 0, micro: 1 },
      { x: 1, y: 0, micro: 2 },
      { x: 0, y: 1, micro: -3 },
    ]);
    expect(m.pairs).toHaveLength(3);
    expect(m.energy).toBeCloseTo(0.018 - 0.027 - 0.054 / Math.sqrt(2), 12);
  });
  it("V sıfır iken E var olabilir ve testin işareti kaynak alanını değiştirmez", () => {
    const s = [
        { x: -1, y: 0, micro: 1 },
        { x: 1, y: 0, micro: -1 },
      ],
      m = potential019(s, { x: 0, y: 0 }, 2);
    expect(m.potential).toBe(0);
    expect(m.field).toEqual({ x: 18000, y: 0 });
    expect(potential019(s, { x: 0, y: 0 }, -2).field).toEqual(m.field);
    const same = potential019(
      [
        { x: -1, y: 0, micro: 1 },
        { x: 1, y: 0, micro: 1 },
      ],
      { x: 0, y: 0 },
    );
    expect(same.fieldMagnitude).toBe(0);
    expect(same.potential).toBe(18000);
    for (const a of [0, 45, 90, 180, 270]) {
      const r = (a * Math.PI) / 180,
        v = potential019(
          [{ x: 0, y: 0, micro: 1 }],
          { x: 2 * Math.cos(r), y: 2 * Math.sin(r) },
          3,
        );
      expect(v.potential).toBeCloseTo(4500, 10);
      expect(v.fieldMagnitude).toBeCloseTo(2250, 10);
      expect(v.probeEnergy).toBeCloseTo(0.0135, 12);
    }
  });
  const base = {
    gap: 0.5,
    length: 0.4,
    voltage: 500,
    mass: 0.001,
    micro: 5,
    vx: 2,
    vy: 0,
    gravity: 0,
    progress: 1,
  };
  it("levha geçişi ve enerji aynı ilk olayda sonlanır", () => {
    const m = plates019(base);
    expect(m.kind).toBe("Çıkış");
    expect(m.duration).toBe(0.2);
    expect(m.y).toBeCloseTo(0.1, 12);
    expect(m.velocityY).toBeCloseTo(1, 12);
    expect(m.electricWork).toBeCloseTo(0.0005, 12);
    expect(m.deltaK).toBeCloseTo(m.electricWork, 12);
    const high = plates019({ ...base, voltage: 1000 });
    expect(high.y).toBeCloseTo(0.2, 12);
    expect(high.deltaK).toBeCloseTo(0.002, 12);
    const hit = plates019({ ...base, length: 1, voltage: 1000 });
    expect(hit.kind).toBe("Üst levha");
    expect(hit.duration).toBeCloseTo(Math.sqrt(0.05), 12);
    expect(hit.y).toBeCloseTo(0.25, 12);
    expect(hit.x).toBeLessThan(1);
    const reverse = plates019({ ...base, length: 1, voltage: -1000 });
    expect(reverse.kind).toBe("Alt levha");
    expect(reverse.y).toBeCloseTo(-0.25, 12);
  });
  it("kuvvet dengesi, yer çekimi işi ve köşe eşitliği gerçek hareketle tutarlıdır", () => {
    const balanced = plates019({ ...base, micro: 1, gravity: 1 });
    expect(balanced.ay).toBe(0);
    expect(balanced.y).toBe(0);
    expect(balanced.topTime).toBeNull();
    expect(balanced.bottomTime).toBeNull();
    for (const q of [-5, 0, 5])
      for (const vy of [-2, 0, 2])
        for (const g of [0, 5, 10]) {
          const m = plates019({ ...base, micro: q, vy, gravity: g });
          expect(m.y).toBeLessThanOrEqual(0.25 + 1e-12);
          expect(m.y).toBeGreaterThanOrEqual(-0.25 - 1e-12);
          expect(m.deltaK).toBeCloseTo(m.electricWork + m.gravityWork, 10);
          expect(m.time).toBe(m.duration);
        }
    const corner = plates019({
      ...base,
      gap: 0.5,
      length: 1,
      vx: 2,
      voltage: 0,
      vy: 0.5,
    });
    expect(corner.kind).toBe("Üst köşe");
    expect(corner.duration).toBe(0.5);
  });
  it("bağlı sığaç V’yi, ayrılmış sığaç ayrılma anındaki Q’yu korur", () => {
    const initial = capacitor019(0.02, 0.001, 1, {
      kind: "connected",
      voltage: 100,
    });
    expect(initial.capacitance).toBeCloseTo(177e-12, 20);
    expect(initial.charge).toBeCloseTo(17.7e-9, 18);
    expect(initial.energy).toBeCloseTo(0.885e-6, 18);
    const plugged = capacitor019(0.02, 0.001, 3, {
      kind: "connected",
      voltage: 100,
    });
    expect(plugged.charge).toBeCloseTo(3 * initial.charge, 18);
    expect(plugged.energy).toBeCloseTo(3 * initial.energy, 18);
    const isolated = capacitor019(0.02, 0.001, 3, {
      kind: "isolated",
      charge: initial.charge,
    });
    expect(isolated.charge).toBe(initial.charge);
    expect(isolated.voltage).toBeCloseTo(100 / 3, 12);
    expect(isolated.energy).toBeCloseTo(initial.energy / 3, 18);
    expect(isolated.plateCharges[0] + isolated.plateCharges[1]).toBe(0);
  });
  it("iki telin yönlü katkıları alanı toplar veya sıfırlar", () => {
    const s = [
      { x: -0.1, y: 0, current: 5 },
      { x: 0.1, y: 0, current: 5 },
    ];
    expect(wireField019(s, { x: 0, y: 0 }).magnitude).toBe(0);
    const m = wireField019([s[0], { ...s[1], current: -5 }], { x: 0, y: 0 });
    expect(m.field.x).toBe(0);
    expect(m.field.y).toBeCloseTo(20e-6, 14);
    const p = wireField019([{ x: 0, y: 0, current: 5 }], { x: 0.1, y: 0.1 });
    expect(p.field.x).toBeCloseTo(-5e-6, 14);
    expect(p.field.y).toBeCloseTo(5e-6, 14);
  });
  it("yay açısı katkıyı, bobin yoğunluğu kendi geometrisini kullanır", () => {
    const full = loopField019(3, 0.1, 2, 360);
    expect(full.fieldZ).toBeCloseTo(12 * Math.PI * 1e-6, 14);
    expect(loopField019(3, 0.1, 2, 90).fieldZ).toBeCloseTo(full.fieldZ / 4, 14);
    expect(loopField019(-3, 0.1, 2).fieldZ).toBe(-full.fieldZ);
    expect(loopField019(3, 0.1, 2, 0).fieldZ).toBe(0);
    const m = solenoidField019(2, 500, 0.5);
    expect(m.density).toBe(1000);
    expect(m.field).toBeCloseTo(8 * Math.PI * 1e-4, 14);
    expect(solenoidField019(2, 500, 1).field).toBe(m.field / 2);
  });
  it("tekillik ve bozuk girdiler sahte sonuç oluşturmaz", () => {
    const bad = [
      () => pairEnergy019(1, 1, 0, 1),
      () => pairEnergy019(NaN, 1, 1, 1),
      () =>
        systemEnergy019([
          { x: 0, y: 0, micro: 1 },
          { x: 0, y: 0, micro: 2 },
        ]),
      () => potential019([{ x: 0, y: 0, micro: 1 }], { x: 0, y: 0 }),
      () => plates019({ ...base, mass: 0 }),
      () => plates019({ ...base, vx: 0 }),
      () => plates019({ ...base, progress: 1.01 }),
      () => capacitor019(0.02, 0, 1, { kind: "connected", voltage: 100 }),
      () => capacitor019(0.02, 0.001, 1, { kind: "isolated", charge: -1 }),
      () => wireField019([{ x: 0, y: 0, current: 1 }], { x: 0, y: 0 }),
      () => loopField019(1, 0.1, 1.5),
      () => loopField019(1, 0.1, 1, 361),
      () => solenoidField019(1, 0, 0.5),
    ];
    for (const fn of bad) expect(fn).toThrow(RangeError);
  });
  it("beş yeni rehber ve kayıpsız alan derinleşmesi farklı kimlikler taşır", () => {
    expect(Forge019PhysicsLab({ lessonId: "elektrik-alan-ileri" })).toBeNull();
    expect(forge019PhysicsGuides).toHaveLength(5);
    expect(forge019PhysicsLessons).toHaveLength(6);
    expect(forge019PhysicsGuideExtensions[0].id).toBe("elektrik-alan");
    expect(forge019PhysicsGuideExtensions[0].sections).toHaveLength(8);
    expect(forge019PhysicsTopics["elektrik-alan-ileri"]).toBe("detail-375");
    expect(
      forge019PhysicsLessons.find((l) => l.id === "elektrik-alan-ileri")?.tags,
    ).toContain("soru-seti");
    expect(
      forge019PhysicsGuides.some((g) => g.id === "elektrik-alan-ileri"),
    ).toBe(false);
    for (const guide of [
      ...forge019PhysicsGuides,
      ...forge019PhysicsGuideExtensions,
    ]) {
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      for (const e of guide.examples) expect(e.steps).toHaveLength(3);
      for (const s of guide.sections) expect(s.paragraphs).toHaveLength(2);
    }
    for (const lesson of forge019PhysicsLessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.prompt.tr.length).toBeGreaterThan(40);
        expect(q.explanation.tr.trim()).not.toBe(q.options[q.answer].tr.trim());
      }
    }
    expect(forge019PhysicsLessons[2].questions[6].prompt.tr).toContain(
      "yatay çıkış yok",
    );
  });
});
