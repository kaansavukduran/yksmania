import { describe, expect, it } from "vitest";
import {
  heatTemperatureGuide,
  heatTemperatureLesson,
  thermalContact,
  waterHeating,
} from "../src/learning/heatTemperature";

describe("ısı ve sıcaklık: energy-accounting invariants", () => {
  it("conserves transferred energy and makes both unequal samples converge to 44 °C", () => {
    const start = thermalContact(840, 1260, 80, 20, 0);
    expect(start.temperatureA).toBe(80);
    expect(start.temperatureB).toBe(20);
    for (const progress of [0, 0.1, 0.25, 0.5, 0.9, 1]) {
      const s = thermalContact(840, 1260, 80, 20, progress);
      // The hotter sample gives exactly the energy that the other receives.
      expect(s.energyA + s.energyB).toBe(0);
      expect(
        840 * (s.temperatureA - 80) + 1260 * (s.temperatureB - 20),
      ).toBeCloseTo(0, 8);
      expect(s.temperatureA).toBeGreaterThanOrEqual(s.temperatureB);
      expect(s.temperatureA).toBeLessThanOrEqual(80);
      expect(s.temperatureB).toBeGreaterThanOrEqual(20);
    }
    const end = thermalContact(840, 1260, 80, 20, 1);
    expect(end.temperatureA).toBeCloseTo(44);
    expect(end.temperatureB).toBeCloseTo(44);
    expect(end.energyA).toBe(-30240);
    expect(end.energyB).toBe(30240);
  });
  it("reverses heat direction when temperatures reverse and ignores labels", () => {
    const a = thermalContact(360, 840, 10, 70, 0.6);
    const swapped = thermalContact(840, 360, 70, 10, 0.6);
    expect(a.energyA).toBeGreaterThan(0);
    expect(a.energyB).toBeLessThan(0);
    expect(a.temperatureA).toBeCloseTo(swapped.temperatureB);
    expect(a.temperatureB).toBeCloseTo(swapped.temperatureA);
    expect(a.equilibrium).toBeCloseTo(swapped.equilibrium);
    expect(a.energyA).toBeCloseTo(swapped.energyB);
  });
  it("weights by heat capacity, not mass or an unqualified arithmetic average", () => {
    const metalWater = thermalContact(0.4 * 900, 0.2 * 4200, 70, 10, 1);
    expect(metalWater.equilibrium).toBe(28);
    expect(Math.abs(metalWater.equilibrium - 10)).toBeLessThan(
      Math.abs(metalWater.equilibrium - 70),
    );
    const doubled = thermalContact(0.8 * 900, 0.4 * 4200, 70, 10, 1);
    expect(doubled.equilibrium).toBe(metalWater.equilibrium);
    expect(doubled.energyA).toBe(2 * metalWater.energyA);
  });
  it("does not invent heat flow for equal temperatures even with unequal capacities", () => {
    for (const progress of [0, 0.5, 1]) {
      const m = thermalContact(90, 4200, 32, 32, progress);
      expect(m.temperatureA).toBe(32);
      expect(m.temperatureB).toBe(32);
      expect(m.energyA).toBe(0);
      expect(Math.abs(m.energyB)).toBe(0);
    }
  });
  it("rejects invalid capacities and bounds the represented energy path", () => {
    expect(() => thermalContact(0, 10, 20, 40, 0.5)).toThrow(RangeError);
    expect(() => thermalContact(10, -1, 20, 40, 0.5)).toThrow(RangeError);
    expect(() => thermalContact(10, Infinity, 20, 40, 0.5)).toThrow(RangeError);
    expect(() => thermalContact(10, 20, NaN, 40, 0.5)).toThrow(RangeError);
    expect(thermalContact(100, 100, 80, 20, -1).temperatureA).toBe(80);
    expect(thermalContact(100, 100, 80, 20, 3).temperatureA).toBe(50);
  });
});

describe("temperature–energy graph: piecewise model validity", () => {
  it("uses 2100 J to warm 100 g of ice, then 33400 J to melt it without raising T", () => {
    const cold = waterHeating(100, 0);
    expect(cold.temperature).toBe(-10);
    expect(cold.liquidFraction).toBe(0);
    expect(cold.maximum).toBe(43900);
    expect(waterHeating(100, 1050).temperature).toBe(-5);
    const halfMelt = waterHeating(100, 2100 + 16700);
    expect(halfMelt.temperature).toBe(0);
    expect(halfMelt.liquidFraction).toBe(0.5);
    expect(halfMelt.phase).toBe("Erime basamağı");
    expect(waterHeating(100, 35500).liquidFraction).toBe(1);
    expect(waterHeating(100, 35500).phase).toBe("Su ısınıyor");
    expect(waterHeating(100, 39700).temperature).toBe(10);
    expect(waterHeating(100, 43900).temperature).toBe(20);
  });
  it("keeps T continuous at both phase boundaries and scales energy with mass", () => {
    for (const boundary of [2100, 35500]) {
      expect(waterHeating(100, boundary - 1e-6).temperature).toBeCloseTo(
        waterHeating(100, boundary + 1e-6).temperature,
        6,
      );
    }
    for (const q of [1000, 18800, 39700]) {
      const small = waterHeating(100, q);
      const large = waterHeating(200, 2 * q);
      expect(large.temperature).toBeCloseTo(small.temperature);
      expect(large.liquidFraction).toBeCloseTo(small.liquidFraction);
      expect(large.maximum).toBe(2 * small.maximum);
    }
  });
  it("cannot overshoot the stated −10 °C to20 °C range or accept invalid mass", () => {
    expect(waterHeating(100, -200).temperature).toBe(-10);
    expect(waterHeating(100, 1e9).temperature).toBe(20);
    expect(() => waterHeating(0, 100)).toThrow(RangeError);
    expect(() => waterHeating(-1, 100)).toThrow(RangeError);
    expect(() => waterHeating(100, Infinity)).toThrow(RangeError);
  });
});

describe("source-based native lesson: complete independent exercises", () => {
  it("has substantial teaching with worked reasoning, not a summary substituted for a lesson", () => {
    expect(heatTemperatureGuide.sections.length).toBeGreaterThanOrEqual(8);
    expect(
      heatTemperatureGuide.sections.every((s) => s.paragraphs.length >= 2),
    ).toBe(true);
    expect(heatTemperatureGuide.examples.length).toBeGreaterThanOrEqual(4);
    expect(
      heatTemperatureGuide.examples.every(
        (e) => e.steps.length >= 3 && e.check && e.pitfall,
      ),
    ).toBe(true);
    expect(heatTemperatureGuide.recall.length).toBeGreaterThanOrEqual(4);
    expect(heatTemperatureLesson.tags).toContain("detail-119");
    expect(heatTemperatureLesson.tags).not.toContain("detail-121");
  });
  it("preserves the actual keyed answers after option positioning", () => {
    const q = heatTemperatureLesson.questions;
    expect(q).toHaveLength(10);
    expect(new Set(q.map((item) => item.id)).size).toBe(10);
    for (const item of q) {
      expect(item.options).toHaveLength(5);
      expect(new Set(item.options.map((o) => o.tr)).size).toBe(5);
      expect(item.explanation.tr.length).toBeGreaterThan(180);
    }
    expect(q.map((item) => item.options[item.answer].tr)).toEqual([
      "Isı — iç enerji",
      "Metal elden enerjiyi daha hızlı çekebilir; his, sıcaklığın doğrudan ölçümü değildir.",
      "25 K",
      "3600 J",
      "−8000 J",
      "cY=cX; CY=3CX",
      "35",
      "35",
      "1/2",
      "Sıcaklık artmadan buzun bir kısmı eriyebilir; iç enerji artar.",
    ]);
    expect(new Set(q.map((item) => item.answer)).size).toBe(5);
  });
});
