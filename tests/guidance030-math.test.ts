import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance030Math.json";
import {
  forge011MathGuides,
  forge011MathLessons,
} from "../src/learning/forge011Math";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import {
  clarifiedQuestionView,
  localizedQuestionView,
} from "../src/domain/questionPresentation";
import { effectiveHelpLevel } from "../src/learning/helpProgression";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

// This fixture stages only these reviewed rows in the actual resolver. Global
// runtime registration remains a separate integration gate owned by root.
vi.mock("../src/learning/questionHelpCatalogue.json", async (original) => {
  const old = await original<{ default: { id: string }[] }>();
  const local = (await import("../src/learning/guidance030Math.json")).default;
  return {
    default: [
      ...old.default.filter((r) => !local.some((n) => n.id === r.id)),
      ...local.map((r) => ({ ...r, legacyPanelCount: 1 })),
    ],
  };
});
const topics = ["sayi", "kesir", "yas", "yuzde", "kar-zarar"];
const id = (topic: string, n: number) => `${topic}-problemleri-011-${n}`;
const raw = forge011MathLessons.flatMap((l) => l.questions);
const flat = (q: (typeof raw)[number]): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
});
const questions = raw.map((q) =>
  clarifiedQuestionView(flat(localizedQuestionView(q))),
);
const byId = new Map(questions.map((q) => [q.id, q]));
const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((k) => [k, stable((x as Record<string, unknown>)[k])]),
        )
      : x;
const sha = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(stable(x)))
    .digest("hex");
const baseline =
  "f07af13bcc66607700a12a5bd7b689e16b823596231872d779297214c246e0c6";
const fold = (s: string) =>
  s.normalize("NFKC").toLocaleLowerCase("tr-TR").replace(/\s+/gu, " ").trim();
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
const freeze = <T>(x: T): T => {
  if (x && typeof x === "object") {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
const nextButton = (
  nodes: ReactNode,
): { onClick: () => void; disabled?: boolean } | undefined => {
  let result: { onClick: () => void; disabled?: boolean } | undefined;
  Children.forEach(nodes, (node) => {
    if (
      !isValidElement<{
        children?: ReactNode;
        onClick?: () => void;
        disabled?: boolean;
      }>(node)
    )
      return;
    if (node.type === "button" && node.props.onClick)
      result = { onClick: node.props.onClick, disabled: node.props.disabled };
    else result ??= nextButton(node.props.children);
  });
  return result;
};
const decisions = (topic: string, n: number, truth: boolean[]) => {
  const q = byId.get(id(topic, n))!;
  expect(truth, id(topic, n)).toHaveLength(5);
  expect(
    truth.flatMap((yes, i) => (yes ? [i] : [])),
    id(topic, n),
  ).toEqual([q.answer]);
};
const choose = (topic: string, n: number, value: number | string) => {
  const q = byId.get(id(topic, n))!;
  const text =
    typeof value === "number"
      ? String(value).replaceAll("-", "−").replace(".", ",")
      : value;
  decisions(
    topic,
    n,
    q.options.map((o) =>
      typeof value === "number"
        ? Number(
            o.replaceAll("%", "").replaceAll("−", "-").replace(",", "."),
          ) === value
        : o === text,
    ),
  );
};
const numbers = (topic: string, n: number) =>
  byId
    .get(id(topic, n))!
    .options.map((o) =>
      Number(o.replaceAll("%", "").replaceAll("−", "-").replace(",", ".")),
    );
const integers = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

describe("030 exact original fifty mathematics problem cards", () => {
  it("retains all original metadata, raw question fields and current visible identities", () => {
    expect(raw).toHaveLength(50);
    expect(sha(raw)).toBe(baseline);
    expect(
      createHash("sha256")
        .update(
          readFileSync(
            new URL("../src/learning/forge011Math.ts", import.meta.url),
          ),
        )
        .digest("hex"),
    ).toBe("ad57626c1a656a535b5cfef559bfd8459969ddaa2a351d8e5099f984130064ea");
    expect(forge011MathLessons.map((l) => l.id)).toEqual(
      topics.map((t) => `${t}-problemleri`),
    );
    expect(
      forge011MathGuides.map((g) => [
        g.id,
        g.sections.length,
        g.examples.length,
        g.recall.length,
      ]),
    ).toEqual([
      ["sayi-problemleri", 8, 4, 4],
      ["kesir-problemleri", 8, 4, 4],
      ["yas-problemleri", 8, 4, 4],
      ["yuzde-problemleri", 8, 4, 4],
      ["kar-zarar-problemleri", 8, 5, 4],
    ]);
    expect(sha(forge011MathGuides)).toBe(
      "e8d58f705720c164fe5d153b45c5705880def2140e4c98cb15a69668ed2c529f",
    );
    expect(sha(forge011MathLessons)).toBe(
      "d666bb5839bcc2193ed378b6c50755c30c99688144bfc18a9d72acf0166dfa97",
    );
    expect(rows.map((r) => r.id)).toEqual(
      topics.flatMap((t) => integers(1, 10).map((n) => id(t, n))),
    );
    expect(new Set(rows.map((r) => r.id)).size).toBe(50);
    for (let i = 0; i < raw.length; i++) {
      const q = raw[i],
        f = flat(q),
        row = rows[i];
      expect(localizedQuestionView(q)).toBe(q);
      expect(clarifiedQuestionView(f)).toBe(f);
      expect(q.options).toHaveLength(5);
      expect(row.identity).toBe(questionIdentity(questions[i]));
      expect(q.guidance).toBeUndefined();
      expect(resolvedGuidance(questions[i])).toEqual(row.guidance);
    }
  });
  it("separates positive prerequisites, fifty methods,150 progressing steps and250 ordered reasons", () => {
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(100);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(150);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      250,
    );
    expect(new Set(rows.map((r) => fold(r.guidance.strategy))).size).toBe(50);
    for (const r of rows) {
      const q = byId.get(r.id)!,
        g = questionGuidanceSchema.parse(r.guidance);
      expect(g).toEqual(r.guidance);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(5);
      expect(
        new Set([...g.knowledge, g.strategy, ...g.steps, q.hint!].map(fold))
          .size,
        r.id,
      ).toBe(7);
      expect(new Set(g.optionReasons.map(fold)).size, r.id).toBe(5);
      expect(
        g.optionReasons.flatMap((s, i) => (/^Doğru\./u.test(s) ? [i] : [])),
      ).toEqual([q.answer]);
      expect(g.strategy).not.toMatch(
        /(?:yanıt|cevap|sonuç)\s*[:=]?\s*[ABCDE](?:\b|\s)/iu,
      );
      expect(g.strategy).not.toMatch(/(?:doğru|uygun)\s+(?:şık|seçenek)/iu);
      expect(g.steps).not.toContain(q.explanation);
      expect(g.commonError).not.toBe(g.check);
      for (const s of [
        ...g.knowledge,
        g.strategy,
        ...g.steps,
        ...g.optionReasons,
        g.commonError,
        g.check,
      ]) {
        expect(s.trim().length).toBeGreaterThanOrEqual(20);
        expect(s).not.toMatch(
          /https?:|sediment:|Drive|resmî sorudur|video(?:yu)? izled/iu,
        );
      }
    }
  });
});

describe("independent original-condition mathematics decisions", () => {
  it("enumerates arithmetic translations,odd sequences,seating,weighted counts,capacity and exact boundaries", () => {
    expect(integers(-100, 100).filter((x) => 4 * x + 9 === 61)).toEqual([13]);
    decisions(
      "sayi",
      1,
      numbers("sayi", 1).map((x) => 4 * x + 9 === 61),
    );
    expect(integers(-100, 100).filter((x) => 3 * (x - 6) === 42)).toEqual([20]);
    decisions(
      "sayi",
      2,
      numbers("sayi", 2).map((x) => 3 * (x - 6) === 42),
    );
    const triples = integers(-101, 101)
      .filter((x) => Math.abs(x % 2) === 1)
      .map((x) => [x, x + 2, x + 4])
      .filter((a) => a.reduce((s, x) => s + x, 0) === 93);
    expect(triples).toEqual([[29, 31, 33]]);
    choose("sayi", 3, triples[0][2]);
    const seats = integers(4, 100).filter((s) => 2 * s + 2 === 3 * (s - 4));
    expect(seats).toEqual([14]);
    choose("sayi", 4, 2 * seats[0] + 2);
    decisions(
      "sayi",
      5,
      numbers("sayi", 5).map(
        (c) => 4 * c + 2 * (16 - c) === 52 && c >= 0 && c <= 16,
      ),
    );
    expect(integers(0, 16).filter((c) => 4 * c + 2 * (16 - c) === 52)).toEqual([
      10,
    ]);
    decisions(
      "sayi",
      6,
      numbers("sayi", 6).map(
        (s) => 60 * s + 100 * (15 - s) === 1180 && s >= 0 && s <= 15,
      ),
    );
    const capacities = integers(1, 20).flatMap((a) =>
      integers(1, 80)
        .filter((b) => 14 * a + 6 * b === 8 * a + 8 * b)
        .map((b) => (14 * a + 6 * b) / a),
    );
    expect(capacities).toHaveLength(20);
    expect(new Set(capacities)).toEqual(new Set([32]));
    choose("sayi", 7, capacities[0]);
    const budget = integers(0, 150).filter((n) => 17 * n <= 150);
    choose("sayi", 8, Math.max(...budget));
    expect(17 * 9).toBeGreaterThan(150);
    const least = integers(0, 100).filter((x) => 3 * x > 20);
    choose("sayi", 9, Math.min(...least));
    expect(3 * 6).toBeLessThanOrEqual(20);
    const forced = 18 * 2;
    expect(forced).toBe(36);
    expect(forced).not.toBe(37);
    // A changes the student count; B changes exactly2; C changes18 and gives38;
    // D changes the specified37; E alone reports the incompatible premises.
    decisions("sayi", 10, [false, false, false, false, forced !== 37]);
  });
  it("keeps the wrong28-small-box candidate dimensionally consistent under changed small-box scales", () => {
    const row = rows.find((r) => r.id === "sayi-problemleri-011-7")!;
    // These are lengths/capacity units, not bare counts: a is the room occupied
    // by one small box. A proposed28-small-box capacity is therefore28a.
    expect(row.guidance.optionReasons[3]).toContain("b=(28a−14a)/6=7a/3");
    expect(row.guidance.optionReasons[3]).not.toContain("b=(28−14)/6");
    const cases = [
      { small: 1, large: 7 / 3, first: 28, second: 80 / 3 },
      { small: 3, large: 7, first: 84, second: 80 },
      { small: 6, large: 14, first: 168, second: 160 },
    ];
    for (const c of cases) {
      const proposedCapacity = 28 * c.small;
      const roomForSixLargeBoxes = proposedCapacity - 14 * c.small;
      const oneLargeBox = roomForSixLargeBoxes / 6;
      expect(oneLargeBox).toBeCloseTo(c.large, 12);
      expect(oneLargeBox / c.small).toBeCloseTo(7 / 3, 12);
      const firstArrangement = 14 * c.small + 6 * oneLargeBox;
      const secondArrangement = 8 * c.small + 8 * oneLargeBox;
      expect(firstArrangement).toBeCloseTo(c.first, 12);
      expect(firstArrangement).toBeCloseTo(28 * c.small, 12);
      expect(secondArrangement).toBeCloseTo(c.second, 12);
      expect(secondArrangement).toBeCloseTo((80 * c.small) / 3, 12);
      expect(firstArrangement - secondArrangement).toBeCloseTo(
        (4 * c.small) / 3,
        12,
      );
      expect(firstArrangement).not.toBeCloseTo(secondArrangement, 12);
      // The two actual arrangements instead require one large box to occupy
      // three small-box units; their common capacity is then32a at every scale.
      const actualLargeBox = ((14 - 8) * c.small) / (8 - 6);
      expect(actualLargeBox).toBe(3 * c.small);
      expect(14 * c.small + 6 * actualLargeBox).toBe(32 * c.small);
      expect(8 * c.small + 8 * actualLargeBox).toBe(32 * c.small);
    }
  });
  it("uses exact rational part-whole arithmetic and checks all fraction choices", () => {
    decisions(
      "kesir",
      1,
      numbers("kesir", 1).map((x) => x * 12 === 240 * 7),
    );
    decisions(
      "kesir",
      2,
      numbers("kesir", 2).map((x) => x * 5 === 40 * 9),
    );
    // Remaining fractions4/5 and5/8 have product1/2; compare without decimal division.
    decisions(
      "kesir",
      3,
      numbers("kesir", 3).map((n) => n * 4 * 5 === 250 * 5 * 8),
    );
    decisions(
      "kesir",
      4,
      numbers("kesir", 4).map((n) => n * (12 - 4 - 3) === 1000 * 12),
    );
    decisions(
      "kesir",
      5,
      numbers("kesir", 5).map((n) => n * (3 * 5 - 2 * 4) === 42 * 20),
    );
    choose("kesir", 6, (((360 / 3) * 4) / 4) * 3);
    // Tel left endpoint L/5,right endpoint L:2·newMid=L/5+L.
    decisions(
      "kesir",
      7,
      numbers("kesir", 7).map((L) => L === 9 * 10),
    );
    expect((18 + 90) / 2 - 90 / 2).toBe(9);
    choose("kesir", 8, ((150 / 5) * 2) / 15 + ((150 / 5) * 3) / 10);
    expect(3 * 3 + 2 * 4).toBeGreaterThan(12);
    decisions("kesir", 9, [false, false, false, 9 + 8 > 12, false]);
    const fractions: Record<string, [number, number]> = {
      "1/4": [1, 4],
      "1/2": [1, 2],
      "2/3": [2, 3],
      "11/12": [11, 12],
      "3/4": [3, 4],
    };
    decisions(
      "kesir",
      10,
      byId.get(id("kesir", 10))!.options.map((o) => {
        const [n, d] = fractions[o];
        return n * 4 === d * 3;
      }),
    );
    expect(12 - 3 - 6).toBe(3); //12unitwhole,first3,second6,remaining3.
  });
  it("checks same-date age shifts,fixed group totals,ratio solutions,birth domain and first integer time", () => {
    choose("yas", 1, 24 - 7);
    choose("yas", 2, 29 + 8 - (17 + 8));
    choose("yas", 3, 54 + 3 * 5);
    choose("yas", 4, 4 * (16 + 2));
    const functions = [
      (x: number) => x - 3,
      (x: number) => 3 * x,
      (x: number) => x / 3,
      (x: number) => 3 - x,
      (x: number) => x + 3,
    ];
    const dates = integers(0, 60);
    decisions(
      "yas",
      5,
      functions.map((f) =>
        dates.every((age) => f(age) === 100 - (100 - age - 3)),
      ),
    );
    const siblings = integers(1, 100).filter(
      (k) => 3 * (3 * k + 4) === 2 * (5 * k + 4),
    );
    expect(siblings).toEqual([4]);
    decisions(
      "yas",
      6,
      numbers("yas", 6).map(
        (young) => 3 * (young + 4) * 3 === 2 * (5 * young + 12),
      ),
    );
    choose("yas", 6, 3 * siblings[0]);
    const elapsed = 30 - 18;
    choose("yas", 7, 18 - elapsed);
    expect(elapsed).toBe(12);
    const current = 28 + 2 * 4;
    const older = integers(0, current).filter((a) => a - (current - a) === 6);
    expect(older).toEqual([21]);
    choose("yas", 8, older[0]);
    expect([8 - 10, 14 - 10]).toEqual([-2, 4]);
    decisions("yas", 9, [false, false, false, 8 - 10 < 0, false]);
    const years = integers(0, 40).filter((t) => 31 + 3 * t >= 15 * 3);
    expect(years[0]).toBe(5);
    choose("yas", 10, years[0]);
    expect(31 + 3 * 4).toBeLessThan(45);
  });
  it("keeps percentage bases,points,weights,area and unit prices distinct with exact integer equations", () => {
    decisions(
      "yuzde",
      1,
      numbers("yuzde", 1).map((p) => p * 100 === 280 * 15),
    );
    decisions(
      "yuzde",
      2,
      numbers("yuzde", 2).map((n) => n * 24 === 72 * 100),
    );
    decisions(
      "yuzde",
      3,
      numbers("yuzde", 3).map((p) => 80 * p === (100 - 80) * 100),
    );
    const end = (100 * 120 * 80) / 10000;
    expect(end).toBe(96);
    decisions("yuzde", 4, [
      end === 100,
      end === 104,
      end === 80,
      end === 96,
      end === 60,
    ]);
    decisions(
      "yuzde",
      5,
      numbers("yuzde", 5).map((n) => n * 75 === 180 * 100),
    );
    choose("yuzde", 6, 35 - 20);
    expect(((35 - 20) * 100) / 20).toBe(75);
    const participants = (10 * 20) / 100 + (30 * 60) / 100;
    decisions(
      "yuzde",
      7,
      numbers("yuzde", 7).map((p) => p * (10 + 30) === 100 * participants),
    );
    choose("yuzde", 8, 12 * 12 - 10 * 10);
    decisions(
      "yuzde",
      9,
      numbers("yuzde", 9).map((p) => p * 100 === 80 * 75),
    );
    // Unit price multiplier:(192/400)/(200/500)=6/5 exactly.
    expect(192 * 500 * 5).toBe(200 * 400 * 6);
    const oldNumerator = 200,
      newNumerator = 192,
      oldMass = 500,
      newMass = 400;
    const ratioNumerator = newNumerator * oldMass,
      ratioDenominator = oldNumerator * newMass;
    const changes = [-4, 4, -20, 0, 20];
    decisions(
      "yuzde",
      10,
      changes.map(
        (p) =>
          100 * (ratioNumerator - ratioDenominator) === p * ratioDenominator,
      ),
    );
  });
  it("checks cost versus sales,discount boundaries,equal-sale and equal-cost scenarios,fire,fixed costs and weighted gains", () => {
    decisions(
      "kar-zarar",
      1,
      numbers("kar-zarar", 1).map((p) => 160 * p === (200 - 160) * 100),
    );
    decisions(
      "kar-zarar",
      2,
      numbers("kar-zarar", 2).map((m) => m * 80 === 280 * 100),
    );
    const sale = (400 * 150 * 80) / 10000;
    expect(sale).toBe(480);
    decisions(
      "kar-zarar",
      3,
      numbers("kar-zarar", 3).map((p) => 400 * p === (sale - 400) * 100),
    );
    const discounts = integers(0, 100).filter(
      (d) => 625 * (100 - d) >= 500 * 100,
    );
    choose("kar-zarar", 4, Math.max(...discounts));
    const costGain = (240 * 100) / 120,
      costLoss = (240 * 100) / 80;
    expect([costGain, costLoss]).toEqual([200, 300]);
    const gain = 480 - costGain - costLoss;
    expect(gain).toBe(-20);
    decisions("kar-zarar", 5, [
      gain === 0,
      gain === 20,
      gain === -100,
      gain === -200,
      gain === -20,
    ]);
    const equalCostSale = (200 * 120) / 100 + (200 * 80) / 100;
    expect(equalCostSale).toBe(400);
    decisions("kar-zarar", 6, [
      equalCostSale === 400,
      equalCostSale === 384,
      equalCostSale === 416,
      equalCostSale === 320,
      equalCostSale === 480,
    ]);
    const originalCost = 100 * 30,
      revenue = ((100 * 80) / 100) * 45;
    expect([originalCost, revenue]).toEqual([3000, 3600]);
    decisions(
      "kar-zarar",
      7,
      numbers("kar-zarar", 7).map(
        (p) => originalCost * p === (revenue - originalCost) * 100,
      ),
    );
    const profitable = integers(0, 100).filter((n) => 35 * n > 600 + 20 * n);
    choose("kar-zarar", 8, profitable[0]);
    expect(35 * 40).toBe(600 + 20 * 40);
    const m = (750 * 80) / 100,
      s = (750 * 112) / 100;
    expect([m, s]).toEqual([600, 840]);
    decisions(
      "kar-zarar",
      9,
      numbers("kar-zarar", 9).map((p) => m * p === (s - m) * 100),
    );
    const totalCost = 8 * 50 + 2 * 100,
      totalSale = 8 * ((50 * 150) / 100) + 2 * ((100 * 75) / 100);
    expect([totalCost, totalSale]).toEqual([600, 750]);
    decisions(
      "kar-zarar",
      10,
      numbers("kar-zarar", 10).map(
        (p) => totalCost * p === (totalSale - totalCost) * 100,
      ),
    );
  });
});

describe("actual production resolver,QuestionHelp and saved panel ordinals", () => {
  it("preserves old full solutions,explicit new methods,inline priority and individual historical hints without state writes", () => {
    for (const row of rows) {
      const q = byId.get(row.id)!,
        before = JSON.stringify(q),
        panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(previousHelpPanelCount(q)).toBe(1);
      expect(
        effectiveHelpLevel(
          panels,
          2,
          undefined,
          previousHelpPanelCount(q),
          q.hint,
        ),
      ).toBe(6);
      expect(
        effectiveHelpLevel(panels, 2, 5, previousHelpPanelCount(q), q.hint),
      ).toBe(2);
      expect(effectiveHelpLevel(panels, 1, undefined, 1, q.hint)).toBe(1);
      expect(effectiveHelpLevel(panels, 0, 0, 1, q.hint)).toBe(0);
      expect(effectiveHelpLevel(panels, 1, 0, 1, q.hint)).toBe(6);
      const absent = { ...q, hint: undefined };
      expect(questionIdentity(absent)).toBe(row.identity);
      expect(previousHelpPanelCount(absent)).toBe(1);
      expect(
        effectiveHelpLevel(helpPanels(absent), 1, undefined, 1, absent.hint),
      ).toBe(6);
      const personal = { ...q, hint: "Bu tarihsel kağıdın kişisel ipucu." };
      expect(questionIdentity(personal)).toBe(row.identity);
      expect(resolvedGuidance(personal)).toEqual(row.guidance);
      expect(helpPanels(personal)[0].paragraphs).toContain(personal.hint);
      const inline = {
        ...row.guidance,
        strategy: "Bu tarihsel kağıdın kendi çözüm yolu.",
      };
      const saved = freeze({ ...q, guidance: inline });
      const savedBefore = JSON.stringify(saved);
      expect(resolvedGuidance(saved)).toBe(inline);
      expect(previousHelpPanelCount(saved)).toBeUndefined();
      expect(
        effectiveHelpLevel(
          helpPanels(saved),
          2,
          undefined,
          previousHelpPanelCount(saved),
          saved.hint,
        ),
      ).toBe(2);
      expect(resolvedGuidance({ ...saved, id: q.id + "-old-paper" })).toBe(
        inline,
      );
      expect(
        resolvedGuidance({ ...saved, options: q.options.slice(0, -1) }),
      ).toBeUndefined();
      expect(JSON.stringify(saved)).toBe(savedBefore);
      expect(JSON.stringify(q)).toBe(before);
    }
    expect(sha(raw)).toBe(baseline);
  });
  it("renders1250 real help states,calls300 native next handlers and rejects600 changed identities", () => {
    let renders = 0,
      callbacks = 0,
      renderWrites = 0,
      guards = 0;
    const warnings: string[] = [];
    const previous = console.error;
    const render = (q: HelpQuestion, level: number, reviewed = false) => {
      renders++;
      return renderToStaticMarkup(
        createElement(QuestionHelp, {
          question: q,
          level,
          reviewed,
          onLevel: () => {
            renderWrites++;
          },
        }),
      );
    };
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    try {
      for (const row of rows) {
        const q = freeze(structuredClone(byId.get(row.id)!)),
          g = row.guidance,
          before = JSON.stringify(q);
        for (let level = 0; level <= 6; level++) {
          const html = render(q, level);
          expect(html.includes('aria-label="Çözüm rehberi"')).toBe(level > 0);
          for (const text of [...g.knowledge, q.hint!])
            expect(
              html.includes(escape(text)),
              row.id + " prerequisite " + level,
            ).toBe(level >= 1);
          expect(html.includes(escape(g.strategy))).toBe(level >= 2);
          g.steps.forEach((s, i) =>
            expect(html.includes(escape(s))).toBe(level >= i + 3),
          );
          expect(html.includes('class="help-full-solution"')).toBe(level === 6);
          expect(html.includes("Doğru yanıt:")).toBe(level === 6);
          for (const text of [
            q.explanation,
            ...g.optionReasons,
            g.commonError,
            g.check,
          ])
            expect(html.includes(escape(text)), row.id + " full " + level).toBe(
              level === 6,
            );
          if (level === 6) {
            const reasonPositions = g.optionReasons.map((s) =>
              html.indexOf("<li>" + escape(s) + "</li>"),
            );
            expect(reasonPositions.every((p) => p >= 0)).toBe(true);
            expect(reasonPositions).toEqual(
              [...reasonPositions].sort((a, b) => a - b),
            );
            expect(html).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
          } else {
            const button = nextButton(
              QuestionHelp({
                question: q,
                level,
                onLevel: (next) => {
                  expect(next).toBe(level + 1);
                  callbacks++;
                },
              }),
            );
            expect(button).toBeDefined();
            button!.onClick();
          }
        }
        const changes: Partial<HelpQuestion>[] = [
          { id: q.id + "-changed" },
          { prompt: q.prompt + " Başka sürüm" },
          { passage: "Başka pasaj" },
          { options: [q.options[1], q.options[0], ...q.options.slice(2)] },
          { options: q.options.slice(0, -1) },
          { answer: (q.answer + 1) % 5 },
          { explanation: q.explanation + " Başka açıklama" },
          ...q.options.map((_, i) => ({
            options: q.options.map((o, j) => (i === j ? o + " değişti" : o)),
          })),
        ];
        for (const patch of changes) {
          const changed = freeze({ ...q, ...patch }),
            snapshot = JSON.stringify(changed);
          guards++;
          expect(questionIdentity(changed)).not.toBe(row.identity);
          expect(resolvedGuidance(changed)).toBeUndefined();
          expect(previousHelpPanelCount(changed)).toBeUndefined();
          const html = render(changed, 6);
          expect(html).not.toContain(escape(g.strategy));
          for (const reason of g.optionReasons)
            expect(html).not.toContain(escape(reason));
          expect(JSON.stringify(changed)).toBe(snapshot);
        }
        expect(render(q, 1, true)).not.toContain(
          "bağımsız doğru olarak sayılmaz",
        );
        expect(render({ ...q, hint: "Tarihsel kişisel ipucu." }, 1)).toContain(
          "Tarihsel kişisel ipucu.",
        );
        const inline = {
          ...g,
          strategy: "Tarihsel sürümün kendi yöntemini koru.",
        };
        const withInline = render({ ...q, guidance: inline }, 2);
        expect(withInline).toContain(escape(inline.strategy));
        expect(withInline).not.toContain(escape(g.strategy));
        const unknown = { ...q, id: q.id + "-unknown-paper" };
        expect(render(unknown, 6)).not.toContain(escape(g.strategy));
        expect(render({ ...unknown, guidance: inline }, 2)).toContain(
          escape(inline.strategy),
        );
        expect(render({ ...q, hint: undefined }, 1)).not.toContain(
          escape(q.hint!),
        );
        const button = nextButton(
          QuestionHelp({
            question: q,
            level: 0,
            disabled: true,
            onLevel: () => {},
          }),
        );
        expect(button?.disabled).toBe(true);
        expect(JSON.stringify(q)).toBe(before);
      }
    } finally {
      console.error = previous;
    }
    expect(renders).toBe(1250);
    expect(callbacks).toBe(300);
    expect(guards).toBe(600);
    expect(renderWrites).toBe(0);
    expect(warnings).toEqual([]);
    expect(sha(raw)).toBe(baseline);
  });
});
