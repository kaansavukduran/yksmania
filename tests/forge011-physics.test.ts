import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buoyancyState,
  forge011PhysicsGuides,
  forge011PhysicsLessons,
  forge011PhysicsTopics,
  hydraulicState,
  pressureState,
  pulseProfile,
  stringState,
  waveState,
} from "../src/learning/forge011Physics";

const independentlyCalculatedAnswers: Record<string, string[]> = {
  basinc: [
    "2000",
    "2000",
    "4000",
    "1",
    "180",
    "120",
    "102000",
    "İki katına çıkar",
    "60",
    "Hız artar, statik basınç azalır",
  ],
  "sivilarin-kaldirma-kuvveti": [
    "24",
    "0,8",
    "Kaldırma aynı, tuzlu suda batık hacim daha küçük",
    "12",
    "7 N aşağı",
    "Aynı kalır",
    "5",
    "20",
    "Batık hacimleri",
    "1,75 L azalır",
  ],
  "dalgalara-giris": [
    "3",
    "2,5",
    "0,8",
    "5",
    "3",
    "Sürat aynı, dalga boyu yarı olur",
    "4",
    "Radyo dalgası",
    "Mekanik ve enine",
    "T=0,5 s ve f=2 Hz",
  ],
  "yay-dalgalari": [
    "10",
    "3",
    "1,2",
    "Sola giden −6 cm çukur",
    "Tepe olarak sola döner; sürat büyüklüğü aynı kalır",
    "Yansıyan ters; iletilenin sürati ilk ortamın yarısı",
    "Yansıyan tepe; iletilen daha hızlı",
    "−3",
    "Anlık uzanım sıfır olabilir; atmalar sonra ilerlemeyi sürdürür",
    "1,5",
  ],
};
describe("four reviewed pressure, buoyancy and wave units", () => {
  it("connects each new unit only to its actual workbook topic", () => {
    expect(forge011PhysicsTopics).toEqual({
      basinc: "detail-125",
      "sivilarin-kaldirma-kuvveti": "detail-126",
      "dalgalara-giris": "detail-127",
      "yay-dalgalari": "detail-128",
    });
    expect(new Set(forge011PhysicsLessons.map((l) => l.id)).size).toBe(4);
  });
  it("keeps all40 question cards standalone with five distinct choices and independently recalculated answers", () => {
    for (const lesson of forge011PhysicsLessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const [i, q] of lesson.questions.entries()) {
        expect(q.options[q.answer].tr, q.id).toBe(
          independentlyCalculatedAnswers[lesson.id][i],
        );
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.explanation.tr.length).toBeGreaterThan(100);
        expect(q.hint.tr.length, q.id + ": " + q.hint.tr).toBeGreaterThan(10);
      }
      for (let answer = 0; answer < 5; answer++)
        expect(
          lesson.questions.filter((q) => q.answer === answer),
        ).toHaveLength(2);
    }
  });
  it("provides40 multi-paragraph sections,16 fully worked examples and20 recalls", () => {
    expect(forge011PhysicsGuides.flatMap((g) => g.sections)).toHaveLength(40);
    expect(forge011PhysicsGuides.flatMap((g) => g.examples)).toHaveLength(16);
    expect(forge011PhysicsGuides.flatMap((g) => g.recall)).toHaveLength(20);
    for (const guide of forge011PhysicsGuides) {
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        expect(section.paragraphs.every((p) => p.length > 150)).toBe(true);
      }
      for (const example of guide.examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.strategy.length).toBeGreaterThan(20);
        expect(
          example.check.length,
          example.title + ": " + example.check,
        ).toBeGreaterThan(20);
        expect(example.pitfall.length).toBeGreaterThan(20);
      }
    }
  });
  it("converts cm² and cm before solving force, hydrostatic and signed gas pressure", () => {
    const p = pressureState(60, 20, 40, 1000, 100, false);
    expect(p.areaM2).toBe(0.002);
    expect(p.solidPa).toBe(30000);
    expect(p.headPa).toBe(4000);
    expect(p.totalPa).toBe(104000);
    expect(p.gasPa).toBe(104000);
    expect(pressureState(60, 20, 40, 1000, 100, true).gasPa).toBe(96000);
    expect(pressureState(0, 20, 0, 1000, 100, true).solidPa).toBe(0);
    expect(pressureState(0, 20, 0, 1000, 100, true).headPa).toBe(0);
    expect(pressureState(0, 20, 2000, 1000, 100, true).gasPossible).toBe(false);
  });
  it("uses pressure ratios and volume conservation with equal ideal input/output work", () => {
    const h = hydraulicState(60, 4, 20, 10);
    expect(h.forceN).toBe(300);
    expect(h.travelCm).toBe(2);
    expect(h.inputJ).toBe(6);
    expect(h.outputJ).toBe(6);
    for (const a1 of [2, 4, 10])
      for (const a2 of [10, 20, 50]) {
        const x = hydraulicState(123, a1, a2, 17);
        expect(x.inputJ).toBeCloseTo(x.outputJ, 12);
        expect(a1 * 17).toBeCloseTo(a2 * x.travelCm, 12);
      }
  });
  it("keeps freely floating weight and lift constant while dense liquid reduces displacement", () => {
    const a = buoyancyState(0.6, 1, 1000, false),
      b = buoyancyState(0.6, 1, 1200, false);
    expect(a.forceN).toBeCloseTo(6);
    expect(b.forceN).toBeCloseTo(6);
    expect(a.displacedL).toBeCloseTo(0.6);
    expect(b.displacedL).toBeCloseTo(0.5);
    expect(a.condition).toBe("Serbest yüzme");
    expect(a.fraction).toBeLessThan(1);
  });
  it("separates externally held volume, downward tension, upward tension and bottom support", () => {
    const light = buoyancyState(0.4, 1, 1000, true);
    expect(light.forceN).toBe(10);
    expect(light.weightN).toBe(4);
    expect(light.holdN).toBe(6);
    expect(light.holdDirection).toBe("aşağı");
    const heavy = buoyancyState(3, 1, 1000, true);
    expect(heavy.holdN).toBe(20);
    expect(heavy.holdDirection).toBe("yukarı");
    const bottom = buoyancyState(3, 1, 1000, false);
    expect(bottom.forceN).toBe(10);
    expect(bottom.supportN).toBe(20);
    expect(bottom.fraction).toBe(1);
    const neutral = buoyancyState(1, 1, 1000, false);
    expect(neutral.condition).toBe("Askıda denge");
    expect(neutral.balance).toBe(0);
  });
  it("never draws more displaced volume than total volume in its full UI parameter domain", () => {
    for (const mass of [0.1, 0.6, 1, 3])
      for (const volume of [0.2, 1, 3])
        for (const density of [500, 1000, 1500])
          for (const held of [false, true]) {
            const state = buoyancyState(mass, volume, density, held);
            expect(state.fraction).toBeGreaterThan(0);
            expect(state.fraction).toBeLessThanOrEqual(1);
            expect(state.displacedL).toBeLessThanOrEqual(volume);
            if (!held)
              expect(state.forceN + state.supportN).toBeCloseTo(
                state.weightN,
                9,
              );
          }
  });
  it("varies wavelength inversely with source frequency and preserves speed and period identities", () => {
    const a = waveState(8, 2, 3, 0),
      b = waveState(8, 4, 3, 0),
      c = waveState(12, 2, 3, 0);
    expect(a.wavelength).toBe(4);
    expect(a.period).toBe(0.5);
    expect(b.wavelength).toBe(2);
    expect(c.wavelength).toBe(6);
    expect(waveState(8, 2, 4, 0).wavelength).toBe(4);
    for (const v of [2, 8, 12])
      for (const f of [1, 2, 4]) {
        const z = waveState(v, f, 3, 0);
        expect(z.wavelength * f).toBeCloseTo(v);
        expect(z.period * f).toBeCloseTo(1);
      }
  });
  it("advances the wave by λ/4 and returns the same phase after a full period", () => {
    expect(waveState(8, 2, 3, 1).shift).toBe(1);
    expect(waveState(12, 2, 3, 1).shift).toBe(1.5);
    expect(waveState(8, 2, 3, 1).beadCm).toBeCloseTo(3);
    expect(waveState(8, 2, 3, 2).beadCm).toBeCloseTo(0);
    expect(waveState(8, 2, 3, 3).beadCm).toBeCloseTo(-3);
    expect(waveState(8, 2, 3, 4).phase).toBe(waveState(8, 2, 3, 0).phase);
  });
  it("reflects fixed ends with inversion and free ends upright, with no transmission", () => {
    const fixed = stringState(16, 0.25, "fixed"),
      free = stringState(16, 0.25, "free");
    expect(fixed.speed1).toBe(8);
    expect(fixed.reflection).toBe(-1);
    expect(free.reflection).toBe(1);
    expect(fixed.transmission).toBe(0);
    expect(free.transmission).toBe(0);
    expect(fixed.reflectedEnergy).toBe(1);
  });
  it("splits a light/heavy boundary using equal-tension coefficients and conserves energy", () => {
    const heavy = stringState(16, 0.25, "heavy"),
      light = stringState(16, 0.25, "light");
    expect(heavy.speed2).toBe(4);
    expect(heavy.reflection).toBeCloseTo(-1 / 3);
    expect(heavy.transmission).toBeCloseTo(2 / 3);
    expect(light.speed2).toBe(16);
    expect(light.reflection).toBeCloseTo(1 / 3);
    expect(light.transmission).toBeCloseTo(4 / 3);
    for (const b of ["fixed", "free", "heavy", "light"] as const) {
      const x = stringState(36, 0.1, b);
      expect(x.reflectedEnergy + x.transmittedEnergy).toBeCloseTo(1, 12);
    }
  });
  it("uses a finite smooth pulse with zero endpoints and signed superposition", () => {
    expect(pulseProfile(5, 5, 4, 3)).toBe(3);
    expect(pulseProfile(3, 5, 4, 3)).toBe(0);
    expect(pulseProfile(7, 5, 4, 3)).toBe(0);
    expect(pulseProfile(1, 5, 4, 3)).toBe(0);
    expect(pulseProfile(5, 5, 4, 5) + pulseProfile(5, 5, 4, -8)).toBe(-3);
  });
  it("rejects nonphysical division inputs rather than producing NaN or infinity", () => {
    expect(() => pressureState(1, 0, 1, 1000, 100, false)).toThrow(RangeError);
    expect(() => pressureState(1, 2, -1, 1000, 100, false)).toThrow(RangeError);
    expect(() => hydraulicState(1, 0, 4, 5)).toThrow(RangeError);
    expect(() => buoyancyState(1, 0, 1000, false)).toThrow(RangeError);
    expect(() => waveState(1, 0, 2, 0)).toThrow(RangeError);
    expect(() => waveState(1, 2, 2, NaN)).toThrow(RangeError);
    expect(() => stringState(16, 0, "fixed")).toThrow(RangeError);
    expect(() => pulseProfile(0, 1, 0, 1)).toThrow(RangeError);
  });
});
