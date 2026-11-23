import { describe, expect, it } from "vitest";
import { beforeScientificGuide } from "./helpers/before-scientific-revision";
import { beforeSource031Questions } from "./helpers/before-source031-math";
import {
  ageShift,
  breakEvenModel,
  combinedPercent,
  forge011MathGuides,
  forge011MathLessons,
  forge011MathTopics,
  fractionSpending,
  priceLifecycle,
  seatingBalance,
  successivePercent,
} from "../src/learning/forge011Math";

it("joins the next five problem headings through native lesson-to-topic mappings", () => {
  expect(forge011MathTopics).toEqual({
    "sayi-problemleri": "detail-210",
    "kesir-problemleri": "detail-211",
    "yas-problemleri": "detail-212",
    "yuzde-problemleri": "detail-213",
    "kar-zarar-problemleri": "detail-214",
  });
  expect(forge011MathLessons).toHaveLength(5);
  expect(forge011MathGuides).toHaveLength(5);
  for (const lesson of forge011MathLessons) {
    const currentGuide = forge011MathGuides.find((g) => g.id === lesson.id)!;
    const guide = beforeScientificGuide(currentGuide);
    const originalQuestions = beforeSource031Questions(lesson.questions);
    expect(guide).toBeDefined();
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length >= 2 && s.paragraphs.every((p) => p.length > 150),
      ),
    ).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(
      guide.examples.every(
        (e) =>
          e.steps.length >= 3 && e.strategy && e.answer && e.check && e.pitfall,
      ),
    ).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    expect(lesson.body.length).toBe(currentGuide.sections.length);
    expect(lesson.tags).toContain(forge011MathTopics[lesson.id]);
    expect(originalQuestions).toHaveLength(10);
    for (const question of originalQuestions) {
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((o) => o.tr)).size).toBe(5);
      expect(question.explanation.tr.length).toBeGreaterThan(100);
      expect(question.hint.tr.length).toBeGreaterThan(15);
      expect(question.prompt.tr).not.toMatch(
        /yukarıdaki|aşağıdaki|önceki sorudaki|seçtiğin modele göre/i,
      );
    }
    expect(originalQuestions.map((q) => q.answer)).toEqual([
      0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
    ]);
  }
  const ids = forge011MathLessons.flatMap((l) => l.questions.map((q) => q.id));
  expect(ids).toHaveLength(77);
  expect(new Set(ids).size).toBe(77);
});

it("independently checks the fifty declared answer choices, including context and boundary items", () => {
  const expected: Record<string, string[]> = {
    "sayi-problemleri": [
      "13",
      "20",
      "33",
      "30",
      "10",
      "8",
      "32",
      "8",
      "7",
      "Bilgiler birbiriyle çelişir.",
    ],
    "kesir-problemleri": [
      "140",
      "72",
      "500",
      "2400",
      "120",
      "360",
      "90",
      "13",
      "İstenen toplam harcama başlangıç parasını aşar.",
      "3/4",
    ],
    "yas-problemleri": [
      "17",
      "12",
      "69",
      "72",
      "x+3",
      "12",
      "6",
      "21",
      "Hayır; küçük kişi o tarihte henüz doğmamıştır.",
      "5",
    ],
    "yuzde-problemleri": [
      "42",
      "300",
      "%25",
      "%4 azalır.",
      "240",
      "15",
      "%50",
      "%44",
      "%60",
      "%20 artmıştır.",
    ],
    "kar-zarar-problemleri": [
      "%25",
      "350",
      "%20",
      "%20",
      "%4 zarar.",
      "Başabaş.",
      "%20",
      "41",
      "%40",
      "%25",
    ],
  };
  for (const lesson of forge011MathLessons)
    expect(
      beforeSource031Questions(lesson.questions).map((q) => q.options[q.answer].tr),
      lesson.id,
    ).toEqual(expected[lesson.id]);
});

describe("two arrangements of the same pupils", () => {
  it("changes the totals and derives the correct balancing seat count", () => {
    expect(seatingBalance(8, 2, 2)).toEqual({
      first: 18,
      second: 18,
      difference: 0,
      requiredSeats: 8,
    });
    expect(seatingBalance(9, 2, 2)).toEqual({
      first: 20,
      second: 21,
      difference: 1,
      requiredSeats: 8,
    });
    for (let standing = 0; standing <= 6; standing++)
      for (let empty = 0; empty <= 6; empty++) {
        const seats = standing + 3 * empty;
        const model = seatingBalance(seats, standing, empty);
        expect(model.first).toBe(model.second);
        expect(model.first).toBe(2 * seats + standing);
      }
    expect(() => seatingBalance(4, 2, 5)).toThrow(RangeError);
    expect(() => seatingBalance(4.5, 2, 1)).toThrow(RangeError);
  });
  it("recomputes the independent number examples and numerical items", () => {
    expect(3 * (11 + 5)).toBe(5 * 11 - 7);
    expect(2 * 13 + 4).toBe(3 * (13 - 3));
    expect(80 * 11 + 140 * 9).toBe(2140);
    expect(75 + 18 * 6).toBeLessThanOrEqual(200);
    expect(75 + 18 * 7).toBeGreaterThan(200);
    expect(4 * 13 + 9).toBe(61);
    expect(3 * (20 - 6)).toBe(42);
    expect(29 + 31 + 33).toBe(93);
    expect(2 * 14 + 2).toBe(3 * (14 - 4));
    expect(10 * 4 + 6 * 2).toBe(52);
    expect(8 * 60 + 7 * 100).toBe(1180);
    expect(14 + 6 * 3).toBe(8 + 8 * 3);
    expect(14 + 6 * 3).toBe(32);
    expect(17 * 8).toBeLessThanOrEqual(150);
    expect(17 * 9).toBeGreaterThan(150);
    expect(3 * 6).toBeLessThanOrEqual(20);
    expect(3 * 7).toBeGreaterThan(20);
    expect(18 * 2).not.toBe(37);
  });
});

describe("fraction references and conservation", () => {
  it("distinguishes the initial whole from an intermediate remainder", () => {
    const remaining = fractionSpending(120, 1 / 4, 2 / 3, "remaining");
    expect(remaining).toMatchObject({
      firstSpent: 30,
      afterFirst: 90,
      secondSpent: 60,
      remainder: 30,
      valid: true,
    });
    const initial = fractionSpending(120, 1 / 4, 2 / 3, "initial");
    expect(initial).toMatchObject({
      firstSpent: 30,
      afterFirst: 90,
      secondSpent: 80,
      remainder: 10,
      valid: true,
    });
    for (const total of [0, 60, 120, 137, 240])
      for (const a of [0, 1 / 4, 1 / 2, 1])
        for (const b of [0, 1 / 3, 2 / 3, 1]) {
          const model = fractionSpending(total, a, b, "remaining");
          expect(
            model.firstSpent + model.secondSpent + model.remainder,
          ).toBeCloseTo(total, 10);
          expect(model.remainder).toBeGreaterThanOrEqual(-1e-9);
          expect(model.finalFraction).toBeCloseTo((1 - a) * (1 - b), 12);
        }
    expect(fractionSpending(120, 3 / 4, 2 / 3, "initial").valid).toBe(false);
    expect(fractionSpending(120, 1, 1, "remaining").remainder).toBe(0);
    expect(() => fractionSpending(-1, 0.25, 0.5, "remaining")).toThrow(
      RangeError,
    );
    expect(() => fractionSpending(1, 1.2, 0.5, "remaining")).toThrow(
      RangeError,
    );
  });
  it("checks all fraction item numerics and worked examples using independent expressions", () => {
    expect((180 * 5) / 12).toBe(75);
    expect(300 * (1 - 1 / 3) * (1 - 2 / 5)).toBeCloseTo(120);
    expect(6000 * (1 - 1 / 4 - 2 / 5)).toBeCloseTo(2100);
    expect(96 / 2 - (3 * 96) / 4 / 2).toBe(12);
    expect((240 * 7) / 12).toBe(140);
    expect((72 * 5) / 9).toBe(40);
    expect(500 * (4 / 5) * (5 / 8)).toBe(250);
    expect(2400 * (1 - 1 / 3 - 1 / 4)).toBeCloseTo(1000);
    expect(120 * (3 / 4 - 2 / 5)).toBeCloseTo(42);
    expect(360 * (4 / 3) * (3 / 4)).toBe(360);
    expect(90 / 10).toBe(9);
    expect((150 * 2) / 5 / 15 + (150 * 3) / 5 / 10).toBe(13);
    expect(3 / 4 + 2 / 3).toBeGreaterThan(1);
    expect(1 - (3 / 4) * (1 / 3)).toBe(3 / 4);
  });
});

describe("same-time age invariants and birth boundaries", () => {
  it("preserves the difference without incorrectly preserving ratios or negative ages", () => {
    for (const t of [-18, -12, 0, 6, 30]) {
      const model = ageShift(30, 18, t);
      expect(model.valid).toBe(true);
      expect(model.first - model.second).toBe(12);
    }
    expect(ageShift(30, 18, -12)).toEqual({
      first: 18,
      second: 6,
      difference: 12,
      valid: true,
      ratio: 3,
    });
    expect(ageShift(30, 18, -18).ratio).toBeNull();
    expect(ageShift(30, 18, -19).valid).toBe(false);
    expect(ageShift(30, 18, 6).ratio).not.toBe(ageShift(30, 18, 0).ratio);
    expect(ageShift(0, 0, 0)).toMatchObject({ valid: true, ratio: null });
    expect(() => ageShift(-2, 4, 0)).toThrow(RangeError);
  });
  it("checks the worked and quiz age relations in their own time columns", () => {
    expect((84 - 4 * 3) / 4).toBe(18);
    expect((12 + 6) / (30 + 6)).toBe(0.5);
    expect(32 - 10 + (22 - 10)).toBe(34);
    expect((31 + 3 * 4) / 3).toBeLessThan(15);
    expect((31 + 3 * 5) / 3).toBeGreaterThanOrEqual(15);
    expect(24 - 7).toBe(17);
    expect(29 + 8 - (17 + 8)).toBe(12);
    expect(54 + 3 * 5).toBe(69);
    expect(4 * (16 + 2)).toBe(72);
    expect((12 + 4) / (20 + 4)).toBe(2 / 3);
    expect(18 - (30 - 18)).toBe(6);
    expect(21 - 4 + (15 - 4)).toBe(28);
    expect(21 - 15).toBe(6);
    expect(8 - 10).toBeLessThan(0);
  });
});

describe("percent bases and weighted groups", () => {
  it("uses consecutive multipliers, including zero and opposite signed changes", () => {
    expect(successivePercent(200, 20, -20)).toMatchObject({
      middle: 240,
      final: 192,
      net: -4,
    });
    expect(successivePercent(200, 20, -10)).toMatchObject({
      middle: 240,
      final: 216,
      net: 8,
    });
    expect(successivePercent(200, 30, -30).net).toBeCloseTo(-9);
    expect(successivePercent(100, -100, 100)).toEqual({
      middle: 0,
      final: 0,
      net: -100,
    });
    expect(successivePercent(100, 0, 0)).toEqual({
      middle: 100,
      final: 100,
      net: 0,
    });
    expect(() => successivePercent(0, 20, -20)).toThrow(RangeError);
    expect(() => successivePercent(100, -101, 20)).toThrow(RangeError);
    expect(combinedPercent(20, 25, 60, 75)).toBe(62.5);
    expect(combinedPercent(10, 20, 30, 60)).toBe(50);
    expect(combinedPercent(0, 20, 30, 60)).toBe(60);
    expect(() => combinedPercent(0, 20, 0, 60)).toThrow(RangeError);
  });
  it("checks direct, inverse, percentage-point, area and unit-price questions", () => {
    expect(350 * 0.12).toBe(42);
    expect(350 * 0.35).toBeCloseTo(122.5);
    expect(280 * 0.15).toBe(42);
    expect(300 * 0.24).toBe(72);
    expect((100 * (100 - 80)) / 80).toBe(25);
    expect(240 * 0.75).toBe(180);
    expect(35 - 20).toBe(15);
    expect(100 * (1.2 ** 2 - 1)).toBeCloseTo(44);
    expect(0.8 * 0.75 * 100).toBeCloseTo(60);
    expect(100 * (192 / 400 / (200 / 500) - 1)).toBeCloseTo(20);
  });
});

describe("cost, sticker price, revenue and break-even", () => {
  it("distinguishes the cost-based rate from margin and handles zero sales", () => {
    expect(priceLifecycle(200, 50, 20)).toMatchObject({
      label: 300,
      sale: 240,
      gain: 40,
      rate: 20,
    });
    expect(priceLifecycle(200, 50, 30)).toMatchObject({
      label: 300,
      sale: 210,
      gain: 10,
      rate: 5,
    });
    expect(priceLifecycle(200, 50, 40)).toMatchObject({
      sale: 180,
      gain: -20,
      rate: -10,
    });
    expect(priceLifecycle(200, 50, 100)).toMatchObject({
      sale: 0,
      gain: -200,
      rate: -100,
      margin: null,
    });
    expect(priceLifecycle(200, 25, 0).margin).toBe(20);
    expect(priceLifecycle(200, 25, 0).rate).toBe(25);
    expect(priceLifecycle(200, 0, 0)).toMatchObject({
      gain: 0,
      rate: 0,
      maxDiscount: 0,
    });
    expect(() => priceLifecycle(0, 50, 20)).toThrow(RangeError);
    expect(() => priceLifecycle(200, 50, 101)).toThrow(RangeError);
  });
  it("rejects break-even as positive profit and states when selling more cannot help", () => {
    expect(breakEvenModel(600, 20, 35, 40)).toEqual({
      revenue: 1400,
      cost: 1400,
      gain: 0,
      exact: 40,
      firstProfit: 41,
    });
    expect(breakEvenModel(600, 20, 35, 41).gain).toBe(15);
    expect(breakEvenModel(500, 18, 38, 26).gain).toBe(20);
    expect(breakEvenModel(0, 20, 35, 0)).toMatchObject({
      gain: 0,
      firstProfit: 1,
    });
    expect(breakEvenModel(600, 20, 20, 100)).toMatchObject({
      gain: -600,
      exact: null,
      firstProfit: null,
    });
    expect(breakEvenModel(0, 20, 10, 100)).toMatchObject({
      gain: -1000,
      exact: null,
      firstProfit: null,
    });
    expect(() => breakEvenModel(600, 20, 35, 1.5)).toThrow(RangeError);
  });
  it("checks the complete profit examples and ten quiz numerics independently", () => {
    expect((100 * (400 - 320)) / 320).toBe(25);
    expect((100 * (500 * 1.4 * 0.75 - 500)) / 500).toBe(5);
    expect(
      (100 * (300 / 1.25 + 300 / 0.75 - 600)) / (300 / 1.25 + 300 / 0.75),
    ).toBe(6.25);
    expect((100 * (72 * 36 - (80 * 25 + 160))) / (80 * 25 + 160)).toBe(20);
    expect((100 * (200 - 160)) / 160).toBe(25);
    expect(350 * 0.8).toBe(280);
    expect(400 * 1.5 * 0.8).toBe(480);
    expect(625 * 0.8).toBe(500);
    expect(
      (100 * (240 / 1.2 + 240 / 0.8 - 480)) / (240 / 1.2 + 240 / 0.8),
    ).toBe(4);
    expect(200 * 1.2 + 200 * 0.8).toBe(400);
    expect((100 * (80 * 45 - 100 * 30)) / (100 * 30)).toBe(20);
    expect((100 * (840 - 600)) / 600).toBe(40);
    expect(
      (100 * (8 * 75 + 2 * 75 - (8 * 50 + 2 * 100))) / (8 * 50 + 2 * 100),
    ).toBe(25);
  });
});
