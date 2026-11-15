import { describe, expect, it } from "vitest";
import {
  forge014GeographyLessons,
  forge014GeographyGuides,
  forge014GeographyTopics,
  geography014FocusState,
  geography014Period,
  localSolarTime,
  atmosphere014State,
  reducedTemperature,
  pressure014Gradient,
  foehn014Descent,
  humidity014Balance,
  civilArrival014,
  geography014Contribution,
} from "../src/learning/forge014Geography";
import { questionContentIssues } from "../src/domain/questionContent";

describe("Forge014 geography: scientific model boundaries", () => {
  it("selects a branch from the actual research variable, not from a shared place name", () => {
    expect(geography014FocusState(0).primary).toBe("Hidrografya");
    expect(geography014FocusState(1).primary).toBe("Nüfus coğrafyası");
    expect(geography014FocusState(2).primary).toBe("Ekonomik coğrafya");
    expect(geography014FocusState(3).primary).toBe("Jeomorfoloji");
    expect(() => geography014FocusState(4)).toThrow();
    expect(() => geography014FocusState(0.5)).toThrow();
    expect(geography014Period(1).names).toContain("İdrisi");
    expect(geography014Period(2).names).toContain("Pirî Reis");
    expect(geography014Period(3).names).toContain("Humboldt");
    expect(() => geography014Period(-1)).toThrow();
  });
  it("carries minutes into the correct relative day and keeps east/west signs", () => {
    expect(localSolarTime(30, 45, 720)).toMatchObject({
      difference: 15,
      minuteDifference: 60,
      clock: "13.00",
      dayOffset: 0,
    });
    expect(localSolarTime(30, -30, 20)).toMatchObject({
      difference: -60,
      minuteDifference: -240,
      clock: "20.20",
      dayOffset: -1,
    });
    expect(localSolarTime(-10, 10, 1420)).toMatchObject({
      clock: "01.00",
      dayOffset: 1,
    });
    expect(localSolarTime(20, 40, 600)).toMatchObject({ clock: "11.20" });
    for (const a of [-150, -30, 0, 45, 150])
      for (const b of [-150, -30, 0, 45, 150]) {
        const m = localSolarTime(a, b, 721);
        expect(m.minuteDifference).toBe(4 * (b - a));
        expect(m.minuteOfDay + m.dayOffset * 1440).toBe(721 + 4 * (b - a));
        expect(m.minuteOfDay).toBeGreaterThanOrEqual(0);
        expect(m.minuteOfDay).toBeLessThan(1440);
      }
  });
  it("treats the two 180-degree spellings as one meridian and flags civil-date context", () => {
    expect(localSolarTime(180, -180, 720)).toMatchObject({
      difference: 0,
      clock: "12.00",
      dayOffset: 0,
      dateContextRequired: true,
    });
    expect(localSolarTime(-180, 180, 720)).toMatchObject({
      difference: 0,
      clock: "12.00",
    });
    expect(localSolarTime(170, -170, 720).dateContextRequired).toBe(true);
    expect(() => localSolarTime(181, 0, 0)).toThrow();
    expect(() => localSolarTime(0, 0, 1440)).toThrow();
    expect(() => localSolarTime(0, 0.5, 0)).toThrow();
    expect(() => localSolarTime(NaN, 0, 0)).toThrow();
  });
  it("uses declared approximate layer boundaries while conserving the humid-mixture denominator", () => {
    expect(atmosphere014State(0, 0).layer.label).toBe("Troposfer");
    expect(atmosphere014State(30, 2)).toMatchObject({
      nitrogen: 76.44,
      oxygen: 20.58,
      other: 0.98,
      water: 2,
    });
    expect(atmosphere014State(30, 2).layer.label).toBe("Stratosfer");
    expect(atmosphere014State(80, 0).layer.label).toBe("Mezosfer");
    expect(atmosphere014State(110, 0).layer.label).toBe("Termosfer");
    expect(atmosphere014State(650, 0).layer.label).toBe("Ekzosfer");
    for (const h of [0, 12, 13, 49, 50, 84, 85, 599, 600, 700])
      for (const w of [0, 1, 2, 3, 4]) {
        const m = atmosphere014State(h, w);
        expect(m.nitrogen + m.oxygen + m.other + m.water).toBeCloseTo(100, 10);
        expect(Number.isFinite(m.temperature)).toBe(true);
      }
    expect(atmosphere014State(45, 0).temperature).toBeGreaterThan(
      atmosphere014State(20, 0).temperature,
    );
    expect(atmosphere014State(80, 0).temperature).toBeLessThan(
      atmosphere014State(55, 0).temperature,
    );
    expect(() => atmosphere014State(701, 0)).toThrow();
    expect(() => atmosphere014State(20, 5)).toThrow();
  });
  it("separates an observed temperature from an explicitly assumed altitude correction", () => {
    expect(reducedTemperature(12, 1200, true)).toEqual({
      measured: 12,
      height: 1200,
      correction: 6,
      reduced: 18,
    });
    expect(reducedTemperature(15, 1000, true).reduced).toBe(20);
    expect(reducedTemperature(12, 0, true).reduced).toBe(12);
    expect(reducedTemperature(12, 1200, false).reduced).toBeNull();
    expect(() => reducedTemperature(12, -100, true)).toThrow();
    expect(() => reducedTemperature(Infinity, 1000, true)).toThrow();
  });
  it("calculates pressure per distance without inventing a speed or an absolute high threshold", () => {
    expect(pressure014Gradient(1020, 1000, 100)).toMatchObject({
      difference: 20,
      magnitude: 0.2,
      direction: "A’dan B’ye basınç kuvveti",
    });
    expect(pressure014Gradient(1020, 1000, 200).magnitude).toBe(0.1);
    expect(pressure014Gradient(1000, 1020, 100)).toMatchObject({
      difference: -20,
      magnitude: 0.2,
      direction: "B’den A’ya basınç kuvveti",
    });
    expect(pressure014Gradient(1000, 990, 100).direction).toBe(
      "A’dan B’ye basınç kuvveti",
    );
    expect(pressure014Gradient(1000, 1000, 100).magnitude).toBe(0);
    expect(pressure014Gradient(1000, 1000, 100).direction).toContain(
      "farkı yok",
    );
    expect(pressure014Gradient(1020, 1000, 100)).not.toHaveProperty("speed");
    expect(() => pressure014Gradient(1020, 1000, 0)).toThrow();
    expect(() => pressure014Gradient(NaN, 1000, 100)).toThrow();
    expect(foehn014Descent(5, 1000)).toEqual({
      rise: 10,
      finalTemperature: 15,
    });
    expect(foehn014Descent(-5, 0)).toEqual({ rise: 0, finalTemperature: -5 });
  });
  it("conserves total water through saturation, condensation and evaporation under its closed-volume equilibrium assumption", () => {
    expect(humidity014Balance(10, 20)).toEqual({
      total: 10,
      saturation: 20,
      vapor: 10,
      condensed: 0,
      relative: 50,
      saturated: false,
    });
    expect(humidity014Balance(10, 10)).toMatchObject({
      vapor: 10,
      condensed: 0,
      relative: 100,
      saturated: true,
    });
    expect(humidity014Balance(10, 8)).toMatchObject({
      vapor: 8,
      condensed: 2,
      relative: 100,
      saturated: true,
    });
    expect(humidity014Balance(0, 20)).toMatchObject({
      vapor: 0,
      condensed: 0,
      relative: 0,
      saturated: false,
    });
    for (let total = 0; total <= 40; total++)
      for (let saturation = 1; saturation <= 40; saturation++) {
        const m = humidity014Balance(total, saturation);
        expect(m.vapor + m.condensed).toBe(total);
        expect(m.vapor).toBeLessThanOrEqual(saturation);
        expect(m.relative).toBeGreaterThanOrEqual(0);
        expect(m.relative).toBeLessThanOrEqual(100);
        expect(m.condensed).toBeGreaterThanOrEqual(0);
      }
    expect(() => humidity014Balance(10, 0)).toThrow();
    expect(() => humidity014Balance(-1, 8)).toThrow();
    expect(() => humidity014Balance(10, NaN)).toThrow();
  });
});
it("provides seven source-specific deep guides and seventy independently answerable original questions", () => {
  expect(forge014GeographyLessons).toHaveLength(7);
  expect(Object.values(forge014GeographyTopics).sort()).toEqual(
    [37, 38, 39, 40, 41, 42, 43].map((x) => `detail-${x}`),
  );
  const ids = new Set<string>();
  for (const lesson of forge014GeographyLessons) {
    const guide = forge014GeographyGuides.find((g) => g.id === lesson.id)!;
    expect(lesson.subjectId).toBe("tyt-cografya");
    expect(guide.sections).toHaveLength(8);
    for (const section of guide.sections) {
      expect(section.paragraphs).toHaveLength(2);
      expect(section.paragraphs.every((p) => p.length > 100)).toBe(true);
    }
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    for (const example of guide.examples) {
      expect(example.steps.length).toBeGreaterThanOrEqual(3);
      expect(example.answer.trim()).not.toBe("");
      expect(example.check.length).toBeGreaterThan(10);
      expect(example.pitfall.length).toBeGreaterThan(10);
    }
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    expect(lesson.questions).toHaveLength(10);
    expect(lesson.source.tr).toContain("OGM");
    expect(lesson.source.tr).toContain("PDF");
    for (const q of lesson.questions) {
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(5);
      expect(q.explanation.tr).not.toBe(q.options[q.answer].tr);
    }
  }
  expect(ids.size).toBe(70);
});

it("converts civil offsets and real travel time on one minute axis, including opposite dates and quarter-hour offsets", () => {
  expect(civilArrival014(1350, 240, -300, 480)).toMatchObject({
    clock: "21.30",
    dayOffset: 0,
    wallDifference: -60,
    utcStart: 1110,
    utcArrival: 1590,
  });
  expect(civilArrival014(150, 480, -480, 660)).toMatchObject({
    clock: "21.30",
    dayOffset: -1,
  });
  expect(civilArrival014(1420, 120, -240, 420)).toMatchObject({
    clock: "00.40",
    dayOffset: 1,
  });
  expect(civilArrival014(600, 330, 585, 0)).toMatchObject({
    clock: "14.15",
    dayOffset: 0,
    wallDifference: 255,
  });
  expect(civilArrival014(1439, -720, 840, 2880)).toMatchObject({
    clock: "01.59",
    dayOffset: 4,
  });
  expect(civilArrival014(0, 840, -720, 0)).toMatchObject({
    clock: "22.00",
    dayOffset: -2,
  });
  for (const start of [0, 20, 600, 1439])
    for (const a of [-720, -330, 0, 345, 840])
      for (const b of [-720, -330, 0, 345, 840])
        for (const elapsed of [0, 420, 660, 2880]) {
          const m = civilArrival014(start, a, b, elapsed);
          expect(m.minuteOfDay + m.dayOffset * 1440).toBe(
            start - a + elapsed + b,
          );
          expect(m.utcArrival - m.utcStart).toBe(elapsed);
        }
  expect(() => civilArrival014(0, 0, 0, -1)).toThrow();
  expect(() => civilArrival014(0, 841, 0, 0)).toThrow();
  expect(() => civilArrival014(0, 0, 0, NaN)).toThrow();
  expect(() => civilArrival014(0.5, 0, 0, 0)).toThrow();
});
it("uses source-distinct contribution cards without changing the existing period model", () => {
  expect(geography014Contribution(0, 0)).toMatchObject({
    person: "Eratosthenes",
    kind: "measure",
  });
  expect(geography014Contribution(0, 1)).toMatchObject({
    person: "Strabon",
    work: "Geographika",
  });
  expect(geography014Contribution(0, 2).person).toBe("Batlamyus");
  expect(geography014Contribution(1, 0).person).toBe("Biruni");
  expect(geography014Contribution(1, 1).person).toBe("İdrisî");
  expect(geography014Contribution(2, 0).work).toBe("Kitâb-ı Bahriye");
  expect(geography014Contribution(2, 1).work).toBe("Cihannümâ");
  expect(geography014Contribution(2, 2).work).toBe("Seyahatnâme");
  expect(geography014Contribution(3, 0).person).toBe("Humboldt");
  expect(geography014Contribution(3, 1).person).toBe("Ritter");
  expect(() => geography014Contribution(4, 0)).toThrow();
  expect(() => geography014Contribution(0, 3)).toThrow();
  expect(() => geography014Contribution(0, 0.5)).toThrow();
});
