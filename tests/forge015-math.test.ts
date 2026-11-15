import { describe, expect, it } from "vitest";
import {
  combineMeans,
  describeData,
  expandFrequency,
  forge015MathGuides,
  forge015MathLessons,
  forge015MathTopics,
  histogramData,
  observationPlot,
  parseObservations,
  transformData,
} from "../src/learning/forge015Math";

it("adds a distinct statistics heading with complete built-in teaching and autonomous question cards", () => {
  expect(forge015MathTopics).toEqual({ "veri-analizi": "detail-225" });
  expect(forge015MathLessons).toHaveLength(1);
  const guide = forge015MathGuides[0],
    lesson = forge015MathLessons[0];
  expect(guide.sections.length).toBeGreaterThanOrEqual(8);
  expect(
    guide.sections.every(
      (s) =>
        s.paragraphs.length >= 2 && s.paragraphs.every((p) => p.length > 150),
    ),
  ).toBe(true);
  expect(guide.examples).toHaveLength(6);
  expect(
    guide.examples.every(
      (e) =>
        e.steps.length >= 3 && e.strategy && e.answer && e.check && e.pitfall,
    ),
  ).toBe(true);
  expect(guide.recall.length).toBeGreaterThanOrEqual(4);
  expect(lesson.body).toHaveLength(guide.sections.length);
  expect(lesson.questions).toHaveLength(10);
  for (const q of lesson.questions) {
    expect(q.options).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
    expect(q.prompt.tr).not.toMatch(
      /yukarıdaki|önceki sorudaki|seçtiğin modele göre/i,
    );
    expect(q.hint.tr.length).toBeGreaterThan(15);
    expect(q.explanation.tr.length).toBeGreaterThan(100);
  }
});
it("independently verifies all ten final shuffled choices", () => {
  const expected = [
    "5,5",
    "3",
    "Bu okul tanımında mod yoktur.",
    "70",
    "Ortalama 3’ten 5’e çıkar; ortanca 3 kalır.",
    "2",
    "Ortalama −7; sapma 6.",
    "0,4; 0,4; 0,2",
    "Kesin belirlenemez; sınıf içindeki puanlar bilinmiyor.",
    "A’nın gözlenen puanları daha az yayılmıştır; gelecekteki başarı garanti edilmez.",
  ];
  expect(
    forge015MathLessons[0].questions.map((q) => q.options[q.answer].tr),
  ).toEqual(expected);
  expect(new Set(forge015MathLessons[0].questions.map((q) => q.id)).size).toBe(
    10,
  );
});
describe("raw observations and their definitions", () => {
  it("retains repetitions and separates n−1 and n variance", () => {
    const r = describeData([1, 3, 3, 13]);
    expect(r.n).toBe(4);
    expect(r.sum).toBe(20);
    expect(r.mean).toBe(5);
    expect(r.median).toBe(3);
    expect(r.frequency).toEqual([
      { value: 1, frequency: 1 },
      { value: 3, frequency: 2 },
      { value: 13, frequency: 1 },
    ]);
    expect(r.squareSum).toBe(88);
    expect(r.populationVariance).toBe(22);
    expect(r.sampleVariance).toBeCloseTo(88 / 3);
    expect(r.sampleSD).toBeCloseTo(Math.sqrt(88 / 3));
    expect(r.range).toBe(12);
  });
  it("makes school equal-frequency convention explicit without losing the one-unique-value mode", () => {
    expect(describeData([1, 1, 3, 3]).modes).toEqual([]);
    expect(describeData([1, 1, 3, 3], "maxFrequency").modes).toEqual([1, 3]);
    expect(describeData([1, 1, 3, 3, 8]).modes).toEqual([1, 3]);
    expect(describeData([4, 4, 4]).modes).toEqual([4]);
    expect(describeData([4]).modes).toEqual([]);
    expect(describeData([4], "maxFrequency").modes).toEqual([4]);
  });
  it("does not invent zero-valued means or sample deviations for empty or singleton data", () => {
    const empty = describeData([]),
      one = describeData([-2]);
    expect(empty.sum).toBe(0);
    expect(empty.mean).toBeNull();
    expect(empty.median).toBeNull();
    expect(empty.range).toBeNull();
    expect(empty.populationSD).toBeNull();
    expect(empty.sampleSD).toBeNull();
    expect(one.mean).toBe(-2);
    expect(one.range).toBe(0);
    expect(one.populationSD).toBe(0);
    expect(one.sampleSD).toBeNull();
    expect(describeData([9, 1, 4, 4, 7, 8]).median).toBe(5.5);
  });
  it("recovers a repeated list from actual frequencies", () => {
    const values = expandFrequency([
      { value: 1, frequency: 2 },
      { value: 3, frequency: 3 },
      { value: 7, frequency: 1 },
    ]);
    expect(values).toEqual([1, 1, 3, 3, 3, 7]);
    expect(describeData(values).mean).toBe(3);
    expect(describeData(values).median).toBe(3);
    expect(expandFrequency([{ value: 4, frequency: 0 }])).toEqual([]);
  });
  it("preserves the correct affine mean, median and squared spread under negative and zero scaling", () => {
    const original = describeData([2, 4, 6]);
    for (const a of [-3, 0, 2])
      for (const b of [-5, 0, 7]) {
        const result = describeData(transformData([2, 4, 6], a, b));
        expect(result.mean).toBe(a * original.mean! + b);
        expect(result.median).toBe(a * original.median! + b);
        expect(result.sampleVariance).toBe(a * a * original.sampleVariance!);
        expect(result.sampleSD).toBe(Math.abs(a) * original.sampleSD!);
      }
    expect(describeData(transformData([2, 4, 6], 0, 5)).modes).toEqual([5]);
  });
});
it("combines individuals rather than silently assigning equal weight to unequal groups", () => {
  expect(
    combineMeans([
      { count: 4, mean: 50 },
      { count: 8, mean: 80 },
    ]),
  ).toEqual({ count: 12, sum: 840, weighted: 70, unweighted: 65 });
  expect(
    combineMeans([
      { count: 0, mean: 90 },
      { count: 2, mean: -3 },
    ]).weighted,
  ).toBe(-3);
  expect(combineMeans([{ count: 0, mean: 90 }]).weighted).toBeNull();
});
it("uses actual widths for histogram areas and reports only bounds/estimate for unknown within-bin values", () => {
  const h = histogramData([0, 5, 15, 30], [2, 4, 3]);
  expect(h.bins.map((b) => b.width)).toEqual([5, 10, 15]);
  expect(h.bins.map((b) => b.density)).toEqual([0.4, 0.4, 0.2]);
  expect(h.bins.map((b) => b.density * b.width)).toEqual([2, 4, 3]);
  expect(h.total).toBe(9);
  expect(h.midpointEstimate).toBe(12.5);
  expect(h.meanLower).toBeCloseTo(65 / 9);
  expect(h.meanUpper).toBeCloseTo(160 / 9);
  expect(h.upperAttainable).toBe(false);
  expect(histogramData([0, 5, 15, 30], [0, 0, 3]).upperAttainable).toBe(true);
  expect(histogramData([0, 5], [0]).midpointEstimate).toBeNull();
});
it("parses Turkish decimals without treating a comma as a second observation", () => {
  expect(parseObservations("−1,5; 2;3,25")).toEqual({
    values: [-1.5, 2, 3.25],
    error: null,
  });
  expect(parseObservations("")).toEqual({ values: [], error: null });
  for (const input of [
    "1;;2",
    "1;2;",
    "NaN",
    "1 2",
    "101",
    "-51",
    Array(25).fill("1").join(";"),
  ])
    expect(parseObservations(input).error).toBeTruthy();
});
it("packs near decimal observations vertically while preserving their numeric x coordinates", () => {
  for (const values of [
    [1, 1.01],
    Array(24).fill(3),
    Array.from({ length: 24 }, (_, i) => 1 + i * 0.001),
  ]) {
    const p = observationPlot(values);
    for (const point of p.points) {
      expect(point.x).toBeCloseTo(
        70 + (460 * (point.value - p.lower)) / (p.upper - p.lower),
      );
      expect(point.y).toBeGreaterThan(15);
      expect(point.y).toBeLessThan(p.baseline);
    }
    for (let i = 0; i < p.points.length; i++)
      for (let j = i + 1; j < p.points.length; j++)
        expect(
          Math.hypot(
            p.points[i].x - p.points[j].x,
            p.points[i].y - p.points[j].y,
          ),
        ).toBeGreaterThanOrEqual(14);
  }
  const p = observationPlot([1, 3, 3, 13]);
  expect(p.meanX).toBeCloseTo(70 + (460 * 5) / 14);
  expect(p.medianX).toBeCloseTo(70 + (460 * 3) / 14);
});
it("rejects unsupported numeric/count/plot domains instead of returning fabricated or NaN results", () => {
  for (const bad of [NaN, Infinity, -Infinity]) {
    expect(() => describeData([bad])).toThrow(RangeError);
    expect(() => transformData([1], bad, 0)).toThrow(RangeError);
  }
  expect(() => expandFrequency([{ value: 1, frequency: -1 }])).toThrow(
    RangeError,
  );
  expect(() => expandFrequency([{ value: 1, frequency: 0.5 }])).toThrow(
    RangeError,
  );
  expect(() => combineMeans([{ count: -1, mean: 2 }])).toThrow(RangeError);
  expect(() => histogramData([0, 0], [2])).toThrow(RangeError);
  expect(() => histogramData([0, 10, 20], [2])).toThrow(RangeError);
  expect(() => observationPlot([1e308])).toThrow(RangeError);
  expect(() => observationPlot(Array(25).fill(1))).toThrow(RangeError);
});
