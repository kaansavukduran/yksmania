import { describe, expect, it } from "vitest";
import {
  circuitState,
  dipoleDirection,
  expansionState,
  forge093PhysicsGuides,
  forge093PhysicsLessons,
  forge093PhysicsTopics,
  iceWaterMix,
  inductionState,
  phaseHeating,
  wireField,
} from "../src/learning/forge093Physics";

const expectedAnswers: Record<string, string[]> = {
  genlesme: [
    "2",
    "Artar",
    "0,004",
    "100/102",
    "19,5",
    "Hacim azalır, yoğunluk artar",
    "Şerit B tarafına eğilir, A dış yayda kalır",
    "−1,5",
    "1,2",
    "11",
  ],
  "hal-degisimi": [
    "Kırağılaşma, enerji verir",
    "6000",
    "7940",
    "12,5 g buz kalır, sıcaklık 0 °C olur",
    "16",
    "Kaynama sıcaklığı düşer",
    "2",
    "Yarısına iner",
    "Ayrılan tanecikler enerji taşıyabilir; kalan sıvının ortalama enerjisi azalabilir",
    "22500 J",
  ],
  "durgun-elektrik": [
    "−5e",
    "+4e,−4e",
    "+3 μC",
    "Elektronlar çubuğa yakın bölgeye kayabilir, toplam küre yükü 0 kalır",
    "Negatif",
    "Cismin net yük işaretini",
    "1/4",
    "0,2 N çekme",
    "Sola",
    "Elektronlar küreden Dünya’ya gider",
  ],
  "elektrik-akimi": [
    "3",
    "−uçtan+uca",
    "3 A",
    "5",
    "1/4",
    "2 A ve 6 V",
    "6",
    "Ampermetre seri, voltmetre paralel",
    "6",
    "4 saat, yük",
  ],
  "miknatislar-ve-manyetik-alan": [
    "İtme",
    "Her biri N ve S",
    "Cismin kalıcı mıknatıs olması",
    "N→S ve S→N",
    "Sağa",
    "Yukarı",
    "40",
    "4",
    "Aynı kalır",
    "Nitelik olarak S gibi davranır; coğrafi ve manyetik eksenler tam aynı olmak zorunda değildir",
  ],
};

describe("five source-based physics units", () => {
  it("maps only the intended five consecutive physics headings", () => {
    expect(forge093PhysicsTopics).toEqual({
      genlesme: "detail-120",
      "hal-degisimi": "detail-121",
      "durgun-elektrik": "detail-122",
      "elektrik-akimi": "detail-123",
      "miknatislar-ve-manyetik-alan": "detail-124",
    });
    expect(forge093PhysicsLessons.map((l) => l.subjectId)).toEqual(
      Array(5).fill("tyt-fizik"),
    );
  });
  for (const lesson of forge093PhysicsLessons) {
    it(`${lesson.id}: substantial teaching and ten independent, uniquely keyed questions`, () => {
      const guide = forge093PhysicsGuides.find((g) => g.id === lesson.id)!;
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      expect(
        guide.sections.every(
          (s) =>
            s.paragraphs.length >= 2 &&
            s.paragraphs.every((p) => p.length > 180),
        ),
      ).toBe(true);
      expect(guide.examples.length).toBeGreaterThanOrEqual(4);
      expect(
        guide.examples.every(
          (e) =>
            e.steps.length >= 3 && e.check.length > 30 && e.pitfall.length > 30,
        ),
      ).toBe(true);
      expect(guide.recall.length).toBeGreaterThanOrEqual(4);
      expect(lesson.questions).toHaveLength(10);
      expect(lesson.questions.map((q) => q.options[q.answer].tr)).toEqual(
        expectedAnswers[lesson.id],
      );
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.prompt.tr.length).toBeGreaterThan(65);
        expect(q.hint.tr.length).toBeGreaterThan(25);
        expect(q.explanation.tr.length).toBeGreaterThan(140);
      }
    });
  }
  it("uses fifty new stable question ids and preserves a fully stated pressure condition in ice-water questions", () => {
    const questions = forge093PhysicsLessons.flatMap((l) => l.questions);
    expect(new Set(questions.map((q) => q.id)).size).toBe(50);
    const phase = forge093PhysicsLessons.find((l) => l.id === "hal-degisimi")!;
    expect(phase.questions[3].prompt.tr).toMatch(/Normal basınçta/);
    expect(phase.questions[4].prompt.tr).toMatch(/Normal basınçta/);
    const electro = forge093PhysicsLessons.find(
      (l) => l.id === "durgun-elektrik",
    )!;
    expect(
      electro.questions[5].options.some(
        (o) => o.tr === "Elektroskobun başlangıçta nötr olduğunu",
      ),
    ).toBe(true);
  });
});

describe("expansion is a signed geometric change, not added matter", () => {
  it("gives mm and hole changes from the same strain; doubles only the intended variable", () => {
    const initial = expansionState(2, 12, 40, 3);
    expect(initial.changeMm).toBeCloseTo(0.96);
    expect(initial.finalM).toBeCloseTo(2.00096);
    expect(initial.projectedGapMm).toBeCloseTo(2.04);
    expect(initial.holeDiameterMm).toBeCloseTo(20.0096);
    expect(initial.finalM / 2).toBeCloseTo(initial.holeDiameterMm / 20);
    expect(expansionState(2, 12, 80, 3).changeMm).toBeCloseTo(1.92);
    expect(expansionState(2, 24, 80, 3).changeMm).toBeCloseTo(3.84);
    expect(expansionState(4, 12, 40, 3).strain).toBe(initial.strain);
  });
  it("supports cooling and signals that a free projected gap would close", () => {
    expect(expansionState(3, 10, -50, 3).changeMm).toBeCloseTo(-1.5);
    expect(expansionState(5, 24, 100, 3).projectedGapMm).toBeLessThan(0);
    expect(() => expansionState(0, 12, 10, 1)).toThrow(RangeError);
    expect(() => expansionState(2, 12, NaN, 1)).toThrow(RangeError);
    expect(() => expansionState(2, 12, 10, -1)).toThrow(RangeError);
  });
});

describe("five phase segments and mixture energy budgets", () => {
  it("is continuous at every boundary, sums phase masses and reaches 120°C only after both latent heats", () => {
    const m = 50,
      model = phaseHeating(m, 0);
    expect(model.maximum).toBe(153750);
    expect(model.edges).toEqual([0, 1050, 17750, 38750, 151750, 153750]);
    for (const edge of model.edges.slice(1, -1)) {
      expect(phaseHeating(m, edge - 1e-5).temperature).toBeCloseTo(
        phaseHeating(m, edge + 1e-5).temperature,
        5,
      );
    }
    for (let i = 0; i <= 100; i++) {
      const s = phaseHeating(m, (i / 100) * model.maximum);
      expect(s.solid + s.liquid + s.gas).toBeCloseTo(1);
      expect(s.solid).toBeGreaterThanOrEqual(0);
      expect(s.liquid).toBeGreaterThanOrEqual(0);
      expect(s.gas).toBeGreaterThanOrEqual(0);
    }
    expect(phaseHeating(m, model.maximum).temperature).toBe(120);
    expect(phaseHeating(m, model.maximum * 0.5).temperature).toBe(100);
    expect(phaseHeating(m, model.maximum * 0.05).temperature).toBe(0);
  });
  it("heats twice the mass with twice the energy to the same phase and temperature", () => {
    for (const q of [500, 8000, 25000, 60000, 152000]) {
      const small = phaseHeating(50, q),
        large = phaseHeating(100, q * 2);
      expect(large.temperature).toBeCloseTo(small.temperature);
      expect(large.solid).toBeCloseTo(small.solid);
      expect(large.liquid).toBeCloseTo(small.liquid);
      expect(large.gas).toBeCloseTo(small.gas);
    }
  });
  it("retains ice when heat is insufficient and accounts for all melted water after sufficient heat", () => {
    const partial = iceWaterMix(100, 10, 20);
    expect(partial.temperature).toBe(0);
    expect(partial.remaining).toBeCloseTo(20 - 4200 / 334);
    expect(partial.liquidG + partial.remaining).toBeCloseTo(120);
    expect(partial.melted * 334).toBeCloseTo(100 * 4.2 * 10);
    const complete = iceWaterMix(100, 20, 20);
    expect(complete.remaining).toBe(0);
    expect(complete.temperature).toBeCloseTo(1720 / 504);
    expect(100 * 4.2 * (20 - complete.temperature)).toBeCloseTo(
      20 * 334 + 20 * 4.2 * complete.temperature,
    );
    const thresholdTemperature = (20 * 334) / (100 * 4.2);
    const boundary = iceWaterMix(100, thresholdTemperature, 20);
    expect(boundary.remaining).toBeCloseTo(0);
    expect(boundary.temperature).toBeCloseTo(0);
  });
  it("rejects unstated phase regimes and bounds heating to the displayed process", () => {
    expect(() => iceWaterMix(100, -10, 20)).toThrow(RangeError);
    expect(() => iceWaterMix(100, 100, 20)).toThrow(RangeError);
    expect(() => phaseHeating(0, 10)).toThrow(RangeError);
    expect(phaseHeating(50, -1000).temperature).toBe(-10);
    expect(() => phaseHeating(50, Infinity)).toThrow(RangeError);
  });
});

describe("grounding order and electric charge conservation", () => {
  it("separates initially neutral induction from exchange with Earth and retains opposite charge only in the right order", () => {
    for (const rod of [1, -1]) {
      for (let step = 0; step <= 4; step++) {
        const s = inductionState(step, rod, true);
        expect(s.net + s.earthNet).toBe(0);
        if (step < 2) expect(Math.abs(s.net)).toBe(0);
      }
      expect(inductionState(4, rod, true).net).toBe(-rod * 4);
      expect(inductionState(4, rod, false).net).toBe(0);
      expect(inductionState(3, rod, false).grounded).toBe(true);
      expect(inductionState(3, rod, false).rodPresent).toBe(false);
      expect(inductionState(3, rod, true).grounded).toBe(false);
      expect(inductionState(3, rod, true).rodPresent).toBe(true);
    }
    expect(() => inductionState(2, 0, true)).toThrow(RangeError);
  });
});

describe("real circuit consequences instead of decorative switches", () => {
  it("obeys series voltage balance, parallel current balance and energy conservation", () => {
    for (const parallel of [false, true])
      for (const v of [6, 12, 24])
        for (const a of [1, 3, 6])
          for (const b of [2, 4, 8]) {
            const s = circuitState(v, a, b, parallel, true);
            expect(s.p1 + s.p2).toBeCloseTo(v * s.total);
            if (parallel) {
              expect(s.i1 + s.i2).toBeCloseTo(s.total);
              expect(s.v1).toBeCloseTo(v);
              expect(s.v2).toBeCloseTo(v);
              expect(s.resistance).toBeLessThan(Math.min(a, b));
            } else {
              expect(s.i1).toBe(s.i2);
              expect(s.v1 + s.v2).toBeCloseTo(v);
            }
          }
  });
  it("changes the branch currents and power with topology and stops all current when opened", () => {
    const series = circuitState(12, 6, 3, false, true),
      parallel = circuitState(12, 6, 3, true, true);
    expect(series.total).toBeCloseTo(4 / 3);
    expect(parallel.total).toBe(6);
    expect(parallel.i1).toBe(2);
    expect(parallel.i2).toBe(4);
    expect(circuitState(24, 6, 3, true, true).total).toBe(12);
    const open = circuitState(24, 6, 3, true, false);
    expect([
      open.total,
      open.i1,
      open.i2,
      open.p1,
      open.p2,
      open.v1,
      open.v2,
    ]).toEqual(Array(7).fill(0));
    expect(() => circuitState(12, 0, 3, false, true)).toThrow(RangeError);
  });
});

describe("magnetic geometry and physical units", () => {
  it("applies the right-hand rule at cardinal points and reverses every direction with current", () => {
    const expected = [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
    ];
    for (let i = 0; i < 4; i++) {
      const a = wireField(4, 4, i * 90, true),
        b = wireField(4, 4, i * 90, false);
      expect(a.bx).toBeCloseTo(expected[i][0]);
      expect(a.by).toBeCloseTo(expected[i][1]);
      expect(b.bx).toBeCloseTo(-a.bx);
      expect(b.by).toBeCloseTo(-a.by);
      expect(
        a.bx * Math.cos((i * Math.PI) / 2) + a.by * Math.sin((i * Math.PI) / 2),
      ).toBeCloseTo(0);
      expect(a.microTesla).toBe(b.microTesla);
    }
  });
  it("uses the inverse-distance law for long wire and no direction for zero field", () => {
    expect(wireField(4, 4, 0, true).microTesla).toBe(20);
    expect(wireField(8, 4, 0, true).microTesla).toBe(40);
    expect(wireField(8, 8, 0, true).microTesla).toBe(20);
    expect(wireField(6, 3, 0, true).microTesla).toBe(40);
    expect(wireField(0, 3, 0, true)).toEqual({ microTesla: 0, bx: 0, by: 0 });
    expect(() => wireField(4, 0, 0, true)).toThrow(RangeError);
  });
  it("aligns dipole compass with exterior B rather than towards the bar centre", () => {
    const east = dipoleDirection(0, true),
      north = dipoleDirection(90, true);
    expect(east.bx).toBe(1);
    expect(east.by).toBeCloseTo(0);
    expect(north.bx).toBeCloseTo(-1);
    expect(north.by).toBeCloseTo(0);
    for (const angle of [0, 30, 90, 180, 247, 360]) {
      const a = dipoleDirection(angle, true),
        b = dipoleDirection(angle, false);
      expect(Math.hypot(a.bx, a.by)).toBeCloseTo(1);
      expect(b.bx).toBeCloseTo(-a.bx);
      expect(b.by).toBeCloseTo(-a.by);
    }
  });
});
