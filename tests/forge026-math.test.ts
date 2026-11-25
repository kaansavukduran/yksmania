import { createHash } from "node:crypto";
import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeTytTheoryRevisions } from "./helpers/before-tyt-theory-revisions";
import { describe, expect, it, vi } from "vitest";
import {
  placeChange026,
  carry026,
  numbering026,
  division026,
  remainderWeights026,
  digitFilter026,
  common026,
  meetings026,
  commonPairs026,
  mathDefaults026,
  normalizeMath026,
  forge026MathGuides,
  forge026MathLessons,
  forge026MathTopics,
} from "../src/learning/forge026Math";
import { mathematicsNarratives } from "../src/learning/narratives/mathematics";
import { divisionNarratives } from "../src/learning/narratives/mathDivision";
import { narrativeLesson } from "../src/learning/narratives/types";
import { foundation013QuestionsByLesson } from "../src/learning/forge013FoundationQuestions";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
type Saved = Record<string, string | number | boolean>;
const fixture = vi.hoisted(() => ({
  explorations: {} as Record<string, Saved>,
  writes: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixture.explorations },
    update: async (
      fn: (s: { explorations: Record<string, Saved> }) => {
        explorations: Record<string, Saved>;
      },
    ) => {
      fixture.explorations = fn({
        explorations: fixture.explorations,
      }).explorations;
      fixture.writes++;
    },
  }),
}));
import Lab from "../src/learning/Forge026MathLab";
const compact = (s: string) => s.replace(/\s/g, "");
const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.entries(x)
            .sort(([a], [b]) => a.localeCompare(b, "en"))
            .map(([k, v]) => [k, stable(v)]),
        )
      : x;
const gcd = (a: number, b: number): number => {
  while (b) [a, b] = [b, a % b];
  return a;
};
describe("026 temel matematik: eski anlatı korunumu ve özgün derinlik", () => {
  it("üç eski Lesson ve30sorunun bütün metadata/body/soru içeriğini korur,ilk altı rehber kavramını aynı sıraya bağlar", () => {
    const packs = [...mathematicsNarratives, ...divisionNarratives],
      old = packs.map((p) => ({
        ...narrativeLesson(p),
        questions: foundation013QuestionsByLesson[p.id],
      }));
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(old)))
        .digest("hex"),
    ).toBe("c75e8596cd9a586fb626c07a84aa827c0970dc3242142b22570a35ce8b764d7e");
    for (const [i, p] of packs.entries()) {
      expect(old[i].questions).toHaveLength(10);
      expect(forge026MathGuides[i].id).toBe(p.id);
      expect(
        forge026MathGuides[i].sections.slice(0, 6).map((s) => s.title),
      ).toEqual(p.body.map((s) => s.title));
    }
    expect(forge026MathLessons.map((l) => l.id)).toEqual(
      packs.map((p) => p.id + "-ileri"),
    );
    expect(Object.values(forge026MathTopics)).toEqual([
      "detail-199",
      "detail-200",
      "detail-201",
    ]);
    const oldIds = new Set(old.flatMap((l) => l.questions.map((q) => q.id)));
    expect(
      forge026MathLessons
        .flatMap((l) => l.questions)
        .every((q) => !oldIds.has(q.id)),
    ).toBe(true);
  });
  it("54pozitif bölüm,18farklı worked,18hatırlama ve60tam yardım kartı sunar", () => {
    expect(forge026MathGuides.map((g) => g.sections.length)).toEqual([
      18, 18, 18,
    ]);
    const oldPrompts = Object.values(foundation013QuestionsByLesson)
        .flat()
        .map((q) => q.prompt.tr),
      qs = forge026MathLessons.flatMap((l) => l.questions);
    expect(qs).toHaveLength(60);
    expect(new Set(qs.map((q) => q.id)).size).toBe(60);
    for (const current of forge026MathGuides) {
      const g = beforeTytTheoryRevisions("guides", current.id, current);
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 150)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.strategy.length).toBeGreaterThan(20);
        expect(e.check).toMatch(/[0-9]/);
        expect(e.pitfall.length).toBeGreaterThan(30);
        expect([...oldPrompts, ...qs.map((q) => q.prompt.tr)]).not.toContain(
          e.prompt,
        );
      }
    }
    for (const q of qs) {
      expect(questionContentIssues(q)).toEqual([]);
      expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.guidance!.steps).toHaveLength(3);
      expect(new Set(q.guidance!.steps).size).toBe(3);
      expect(q.guidance!.optionReasons).toHaveLength(5);
      for (const [i, r] of q.guidance!.optionReasons.entries())
        expect(r.startsWith("Doğru."), q.id + "/" + i).toBe(i === q.answer);
    }
    expect(qs.reduce((s, q) => s + q.guidance!.steps.length, 0)).toBe(180);
  });
  it("anlamsal anahtarlarla beş seçeneği ve gerekçeyi birlikte bağlar,dengeli periyotsuz sıra korur", () => {
    const expected = [
      [
        "5;3;15",
        "540",
        "5436",
        "101",
        "4",
        "262",
        "46",
        "15",
        "4",
        "4536",
        "42",
        "96",
        "262",
        "184",
        "6",
        "0,07",
        "5",
        "1000",
        "3330",
        "391",
      ],
      [
        "−6;4",
        "53",
        "12",
        "9;0",
        "8",
        "1",
        "8",
        "4",
        "0",
        "72",
        "11",
        "3",
        "0",
        "2ve5",
        "Böylebirtamsayıyoktur.",
        "4",
        "C;E",
        "4",
        "4",
        "11",
      ],
      [
        "6",
        "280",
        "4",
        "Uygunçiftyoktur.",
        "420",
        "28",
        "12",
        "15",
        "105",
        "133",
        "22",
        "8",
        "13.35",
        "5",
        "Hiçortakçalışmaolmaz.",
        "65",
        "2",
        "244",
        "56",
        "7",
      ],
    ];
    for (const [i, l] of forge026MathLessons.entries()) {
      expect(l.questions.map((q) => compact(q.options[q.answer].tr))).toEqual(
        expected[i],
      );
      expect(
        Array.from(
          { length: 5 },
          (_, a) => l.questions.filter((q) => q.answer === a).length,
        ),
      ).toEqual([4, 4, 4, 4, 4]);
    }
    const answers = forge026MathLessons.flatMap((l) =>
      l.questions.map((q) => q.answer),
    );
    expect(
      Array.from(
        { length: 5 },
        (_, a) => answers.filter((x) => x === a).length,
      ),
    ).toEqual([12, 12, 12, 12, 12]);
    for (let period = 1; period <= 20; period++)
      expect(
        answers.every((x, i) => i < period || x === answers[i - period]),
      ).toBe(false);
    const bound = (l: number, q: number) =>
      Object.fromEntries(
        forge026MathLessons[l].questions[q].options.map((o, i) => [
          compact(o.tr),
          forge026MathLessons[l].questions[q].guidance!.optionReasons[i],
        ]),
      );
    expect(bound(0, 7)["16"]).toContain("17−1=16");
    expect(bound(0, 12)["259"]).toContain("43×3=129");
    expect(bound(1, 10)["6"]).toContain("81−99+11=−7");
    expect(bound(2, 16)["37"]).toContain("k=0");
  });
});
describe("026 saf matematik modelleri", () => {
  it("basamak değişimini konum ağırlığıyla doğrular; ön sıfır,yazım ve değer farkını korur", () => {
    for (const n of [0, 1, 9, 10, 90, 107, 4062, 90000, 99999])
      for (const digit of [0, 3, 9])
        for (let position = 0; position < String(n).length; position++) {
          const weight = 10 ** position,
            oldDigit = Math.floor(n / weight) % 10;
          expect(placeChange026(n, "replace", digit, position).result).toBe(
            n + (digit - oldDigit) * weight,
          );
          expect(placeChange026(n, "append", digit, position).result).toBe(
            n * 10 + digit,
          );
          expect(placeChange026(n, "prepend", digit, position).result).toBe(
            digit * 10 ** String(n).length + n,
          );
          expect(placeChange026(n, "delete", digit, position).result).toBe(
            Math.floor(n / 10),
          );
          const r = placeChange026(n, "reverse", digit, position);
          expect(r.result).toBe(
            [...String(n)].reduce((s, c, i) => s + Number(c) * 10 ** i, 0),
          );
          expect(r.originalTerms.reduce((s, t) => s + t.contribution, 0)).toBe(
            n,
          );
          expect(r.resultTerms.reduce((s, t) => s + t.contribution, 0)).toBe(
            r.result,
          );
        }
    expect(placeChange026(1200, "reverse")).toMatchObject({
      resultWritten: "0021",
      result: 21,
      resultLength: 2,
      leadingZero: true,
    });
    expect(placeChange026(5, "prepend", 0)).toMatchObject({
      resultWritten: "05",
      result: 5,
      difference: 0,
      resultLength: 1,
    });
    expect(placeChange026(0, "append", 5)).toMatchObject({
      resultWritten: "05",
      result: 5,
    });
  });
  it("üç toplananın tam onluk aktarımını ve2eldesini sayısal toplamla kapatır", () => {
    for (let a = 0; a <= 999; a += 37)
      for (let b = 0; b <= 999; b += 71)
        for (const c of [0, 7, 98, 999]) {
          const r = carry026(a, b, c);
          expect(r.rebuilt).toBe(a + b + c);
          expect(r.sum).toBe(r.rebuilt);
          for (const [i, col] of r.columns.entries()) {
            expect(col.carryIn).toBe(i === 0 ? 0 : r.columns[i - 1].carryOut);
            expect(col.raw).toBe(
              col.digits.reduce((s, d) => s + d, col.carryIn),
            );
            expect(col.raw).toBe(10 * col.carryOut + col.digit);
            expect(col.digit).toBeGreaterThanOrEqual(0);
            expect(col.digit).toBeLessThan(10);
          }
        }
    expect(
      carry026(999, 999, 999).columns.map((c) => [c.digit, c.carryOut]),
    ).toEqual([
      [7, 2],
      [9, 2],
      [9, 2],
      [2, 0],
    ]);
    expect(carry026(0, 0, 0).rebuilt).toBe(0);
  });
  it("etiket bloklarını doğrudan bütün yazımların uzunluklarını sayarak denetler", () => {
    for (const first of [1, 8, 9, 10, 95, 99, 100, 995, 999, 1000, 9999])
      for (const delta of [0, 1, 7, 50]) {
        const last = Math.min(9999, first + delta),
          r = numbering026(first, last),
          expected = Array.from(
            { length: last - first + 1 },
            (_, i) => String(first + i).length,
          ).reduce((a, b) => a + b, 0);
        expect(r.totalDigits).toBe(expected);
        expect(r.blocks.reduce((s, b) => s + b.count, 0)).toBe(
          last - first + 1,
        );
        for (const b of r.blocks) {
          expect(String(b.first).length).toBe(b.digits);
          expect(String(b.last).length).toBe(b.digits);
        }
      }
    expect(numbering026(98, 105)).toMatchObject({ count: 8, totalDigits: 22 });
  });
  it("negatif ve pozitif bölünende komşu kat aralığıyla tek kalanı belirler", () => {
    for (let a = -999; a <= 999; a += 31)
      for (let b = 1; b <= 30; b++) {
        const r = division026(a, b);
        expect(b * r.quotient + r.remainder).toBe(a);
        expect(r.remainder).toBeGreaterThanOrEqual(0);
        expect(r.remainder).toBeLessThan(b);
        expect(r.lower).toBeLessThanOrEqual(a);
        expect(r.upper).toBeGreaterThan(a);
        expect(r.divisible).toBe(a % b === 0);
      }
    expect(division026(-38, 7)).toMatchObject({
      quotient: -6,
      remainder: 4,
      lower: -42,
      upper: -35,
    });
    expect(division026(0, 1)).toMatchObject({ quotient: 0, remainder: 0 });
  });
  it("rakam ağırlığı dönüşümünü BigInt kalanı ile;11işaret yönünü ayrıca denetler", () => {
    for (let value = 0; value <= 999999; value += 9973)
      for (let b = 1; b <= 30; b++) {
        const r = remainderWeights026(value, b);
        expect(r.remainder).toBe(Number(BigInt(value) % BigInt(b)));
        expect((value - r.transformed) % b === 0).toBe(true);
        for (const t of r.terms)
          expect(t.reducedWeight).toBe(
            b === 11
              ? t.position % 2
                ? -1
                : 1
              : Number(10n ** BigInt(t.position) % BigInt(b)),
          );
      }
    expect(remainderWeights026(4025, 11)).toMatchObject({
      transformed: -1,
      remainder: 10,
    });
    expect(remainderWeights026(2728, 11)).toMatchObject({
      transformed: 11,
      remainder: 0,
    });
  });
  it("rakam filtresinin bütün adaylarını bağımsız aralık taramasıyla karşılaştırır", () => {
    for (const pattern of ["7?4", "3?6?", "?28", "13?5"])
      for (const distinct of [false, true]) {
        const ds = [3, 4],
          r = digitFilter026(pattern, ds, distinct),
          exp: number[] = [],
          re = new RegExp("^" + pattern.replaceAll("?", "[0-9]") + "$");
        for (let n = 10 ** (pattern.length - 1); n < 10 ** pattern.length; n++)
          if (
            re.test(String(n)) &&
            (!distinct || new Set(String(n)).size === pattern.length) &&
            n % 3 === 0 &&
            n % 4 === 0
          )
            exp.push(n);
        expect(r.solutions).toEqual(exp);
        expect(new Set(r.candidates.map((c) => c.value)).size).toBe(
          r.candidates.length,
        );
        expect(
          r.candidates.every((c) =>
            c.remainders.every((x, i) => x === c.value % ds[i]),
          ),
        ).toBe(true);
      }
    expect(digitFilter026("34??", [5, 11]).solutions).toEqual([3410, 3465]);
    expect(digitFilter026("139?", [25]).solutions).toEqual([]);
    expect(digitFilter026("??", [2, 2]).divisors).toEqual([2]);
  });
  it("ortak birim,kare ve asal üsleri doğrudan bölen-kat listeleriyle kapatır", () => {
    for (let a = 1; a <= 40; a++)
      for (let b = 1; b <= 40; b++) {
        const r = common026(a, b),
          ds = Array.from({ length: Math.min(a, b) }, (_, i) => i + 1).filter(
            (d) => a % d === 0 && b % d === 0,
          );
        expect(r.gcd).toBe(ds.at(-1));
        expect(r.commonDivisors).toEqual(ds);
        expect(r.lcm).toBe((a * b) / ds.at(-1)!);
        expect(r.tiles * r.gcd ** 2).toBe(a * b);
        expect(r.stripPieces * r.gcd).toBe(a + b);
        expect(r.primes.reduce((s, p) => s * p.prime ** p.min, 1)).toBe(r.gcd);
        expect(r.primes.reduce((s, p) => s * p.prime ** p.max, 1)).toBe(r.lcm);
        expect(r.euclid.at(-1)!.remainder).toBe(0);
        expect(r.euclid.at(-1)!.b).toBe(r.gcd);
      }
    expect(common026(1, 1)).toMatchObject({
      gcd: 1,
      lcm: 1,
      tiles: 1,
      primes: [],
    });
    expect(common026(42, 66)).toMatchObject({
      gcd: 6,
      lcm: 462,
      columns: 7,
      rows: 11,
      tiles: 77,
    });
  });
  it("fazlı ortak olayları pencerenin her tam anını bağımsız sınayarak bulur", () => {
    for (const [a, b] of [
      [1, 1],
      [1, 7],
      [4, 10],
      [6, 10],
      [8, 12],
      [7, 10],
      [30, 29],
    ])
      for (const oa of [0, 2, 6])
        for (const ob of [0, 4, 6])
          for (const horizon of [0, 20, 60])
            for (const iz of [false, true])
              for (const ie of [false, true]) {
                const r = meetings026(a, b, oa, ob, horizon, iz, ie),
                  exp = Array.from({ length: horizon + 1 }, (_, t) => t).filter(
                    (t) =>
                      t >= oa &&
                      t >= ob &&
                      (t - oa) % a === 0 &&
                      (t - ob) % b === 0 &&
                      (iz || t !== 0) &&
                      (ie || t !== horizon),
                  );
                expect(r.common).toEqual(exp);
                expect(r.count).toBe(exp.length);
                expect(r.firstInWindow).toBe(exp[0] ?? null);
                expect(r.compatible).toBe((ob - oa) % gcd(a, b) === 0);
              }
    expect(meetings026(6, 10, 0, 4, 20)).toMatchObject({
      compatible: true,
      count: 0,
      firstInWindow: null,
    });
    expect(meetings026(8, 12, 0, 6, 240)).toMatchObject({
      compatible: false,
      count: 0,
    });
  });
  it("EBOB/EKOK çiftlerini gerçek a,b taramasıyla karşılaştırır ve sırasız tek sayar", () => {
    for (const [d, m] of [
      [1, 1],
      [1, 60],
      [4, 240],
      [6, 180],
      [7, 252],
      [8, 90],
      [60, 3600],
    ]) {
      const r = commonPairs026(d, m),
        exp: [number, number][] = [];
      for (let a = 1; a <= m; a++) {
        const b = (d * m) / a;
        if (
          Number.isInteger(b) &&
          a <= b &&
          gcd(a, b) === d &&
          (a * b) / gcd(a, b) === m
        )
          exp.push([a, b]);
      }
      expect(r.pairs.map((p) => [p.a, p.b])).toEqual(exp);
      expect(r.feasible).toBe(exp.length > 0);
      expect(r.minSum).toBe(
        exp.length ? Math.min(...exp.map(([a, b]) => a + b)) : null,
      );
    }
    expect(commonPairs026(4, 240).pairs).toHaveLength(4);
    expect(commonPairs026(7, 252).minSum).toBe(91);
  });
  it("API sınırında tür zorlama,küsurat,negatif alan ve boş indeksleri reddeder;sonuç kayıtlarını paylaşmaz", () => {
    for (const bad of [
      undefined,
      null,
      NaN,
      Infinity,
      -Infinity,
      "1",
      true,
      {},
      [],
      1n,
    ]) {
      expect(() => placeChange026(bad as number, "append")).toThrow(RangeError);
      expect(() => carry026(bad as number, 0)).toThrow(RangeError);
      expect(() => numbering026(bad as number, 100)).toThrow(RangeError);
      expect(() => division026(bad as number, 7)).toThrow(RangeError);
      expect(() => remainderWeights026(bad as number, 11)).toThrow(RangeError);
      expect(() => common026(bad as number, 12)).toThrow(RangeError);
      expect(() => meetings026(bad as number, 7, 0, 0, 20)).toThrow(RangeError);
      expect(() => commonPairs026(bad as number, 60)).toThrow(RangeError);
    }
    for (const fn of [
      () => placeChange026(10, "constructor" as never),
      () => placeChange026(10, "replace", 2, 2),
      () => carry026(1000, 0),
      () => numbering026(20, 10),
      () => division026(10, 0),
      () => division026(10, 1.5),
      () => remainderWeights026(-1, 7),
      () => digitFilter026("?", [3]),
      () => digitFilter026("???", [3]),
      () => digitFilter026("7?4", Array(2)),
      () => digitFilter026("7?4", [3.5]),
      () => common026(0, 10),
      () => meetings026(7, 10, 0, 0, 241),
      () => meetings026(7, 10, 0, 0, 20, "true" as never),
      () => commonPairs026(1.5, 60),
    ])
      expect(fn).toThrow(RangeError);
    const r = common026(12, 18);
    r.commonDivisors[0] = 99;
    r.primes[0].min = 99;
    expect(common026(12, 18).commonDivisors[0]).toBe(1);
    expect(common026(12, 18).primes[0].min).toBe(1);
  });
  it("ham model durumunu kanonik alanlara,bağımlı sınırlara ve120karaktere indirir", () => {
    expect(
      normalizeMath026({
        ...mathDefaults026,
        number: 7,
        position: 4,
        pageFirst: 100,
        pageLast: 99,
        operation: "constructor",
        divisor: "7",
        reason: "a".repeat(200),
        checked: "true",
      }),
    ).toMatchObject({
      number: 7,
      position: 0,
      pageFirst: 100,
      pageLast: 100,
      operation: "replace",
      divisor: 7,
      checked: false,
      reason: "a".repeat(120),
    });
    expect(normalizeMath026(normalizeMath026({ ...mathDefaults026 }))).toEqual(
      mathDefaults026,
    );
    for (const position of [undefined, "1", NaN, true]) {
      const s = normalizeMath026({ number: 0, position });
      expect(s.position).toBe(0);
      expect(() =>
        placeChange026(s.number, s.operation, s.digit, s.position),
      ).not.toThrow();
      expect(normalizeMath026(s)).toEqual(s);
    }
    expect(() => normalizeMath026(null as never)).toThrow(RangeError);
    expect(() => normalizeMath026([] as never)).toThrow(RangeError);
  });
});

describe("026 dokuz gerçek etkinlik ve kalıcı keşif sınırı", () => {
  const key = (id: string) => "forge026-math:" + id;
  const render = (id: string, state: Saved) => {
    fixture.explorations = { [key(id)]: state };
    return renderToStaticMarkup(createElement(Lab, { lessonId: id }));
  };
  const ids = ["sayi-basamaklari", "bolme-bolunebilme", "ebob-ekok"];
  const families: [string, Saved, string, Record<string, string>, string][] = [
    [
      ids[0],
      {},
      "up",
      {
        placeMode: "string",
        number: "number",
        operation: "string",
        digit: "number",
        position: "number",
      },
      "dividend",
    ],
    [
      ids[0],
      { placeMode: "carry" },
      "2",
      { addA: "number", addB: "number", addC: "number" },
      "number",
    ],
    [
      ids[0],
      { placeMode: "numbering" },
      "22",
      { pageFirst: "number", pageLast: "number" },
      "number",
    ],
    [
      ids[1],
      {},
      "no",
      { divisionMode: "string", dividend: "number", divisor: "number" },
      "number",
    ],
    [
      ids[1],
      { divisionMode: "weights", divisor: 11 },
      "10",
      { weightNumber: "number", divisor: "number" },
      "dividend",
    ],
    [
      ids[1],
      { divisionMode: "filter" },
      "yes",
      { pattern: "string", divisorSet: "string", distinct: "boolean" },
      "dividend",
    ],
    [
      ids[2],
      {},
      "6",
      { commonMode: "string", commonA: "number", commonB: "number" },
      "number",
    ],
    [
      ids[2],
      { commonMode: "events" },
      "24",
      {
        periodA: "number",
        periodB: "number",
        offsetA: "number",
        offsetB: "number",
        horizon: "number",
        includeZero: "boolean",
        includeEnd: "boolean",
      },
      "commonA",
    ],
    [
      ids[2],
      { commonMode: "pairs" },
      "66",
      { pairGcd: "number", pairLcm: "number" },
      "commonA",
    ],
  ];
  type Props = {
    children?: ReactNode;
    label?: string;
    change?: (value: string) => void;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: (e: { currentTarget: { value: string } }) => void;
  };
  const nodes = (tree: ReactNode): ReactElement<Props>[] => {
    const all: ReactElement<Props>[] = [];
    Children.forEach(tree, (c) => {
      if (isValidElement<Props>(c)) all.push(c, ...nodes(c.props.children));
    });
    return all;
  };
  it("dokuz modda girdi,SVG ve HTML sayıları aynı anlamı taşır", () => {
    let h = render(ids[0], {});
    expect(h).toContain('data-digit="6" data-position="1"');
    expect(h).toContain('data-digit="7" data-position="1"');
    expect(h).toContain("Yeni sayısal değer</dt><dd>4.072");
    h = render(ids[0], { placeMode: "carry" });
    expect(h).toContain('data-carry-out="2" data-raw="24"');
    expect(h).toContain("Doğrudan toplam</dt><dd>814");
    h = render(ids[0], { placeMode: "numbering" });
    expect(h).toContain(
      'data-numbering-digits="2" data-block-first="98" data-block-last="99" data-cost="4"',
    );
    expect(h).toContain("Toplam rakam</dt><dd>22");
    h = render(ids[1], { dividend: -38, divisor: 7 });
    expect(h).toContain('cx="178.57142857142858" cy="80"');
    expect(h).toContain("Tam bölüm</dt><dd>-6");
    expect(h).toContain("Kalan</dt><dd>4");
    h = render(ids[1], {
      divisionMode: "weights",
      weightNumber: 4025,
      divisor: 11,
    });
    expect(h).toContain(
      'data-weight-position="3" data-reduced-weight="-1" data-contribution="-4"',
    );
    expect(h).toContain("Ara katkı toplamı</dt><dd>-1");
    expect(h).toContain("Son kalan</dt><dd>10");
    h = render(ids[1], { divisionMode: "filter" });
    expect(h).toContain('data-candidate="744" data-passes="true"');
    expect(h).toContain("Uygun sayılar</dt><dd>744");
    h = render(ids[2], {});
    expect(h).toContain(
      'width="84" height="132" data-tile-width="42" data-tile-height="66" data-tile-side="6"',
    );
    expect(h.match(/data-grid-column=/g) || []).toHaveLength(6);
    expect(h.match(/data-grid-row=/g) || []).toHaveLength(10);
    expect(h).toContain("Kare adedi</dt><dd>77");
    h = render(ids[2], { commonMode: "events" });
    expect(h).toContain('data-common-time="24" d="M134 40v75"');
    expect(h).toContain('data-common-time="54" d="M264 40v75"');
    expect(h).toContain("Ortak olay adedi</dt><dd>2");
    h = render(ids[2], { commonMode: "pairs" });
    expect(h).toContain('data-pair-a="30" data-pair-b="36" data-pair-sum="66"');
    expect(h).toContain("En küçük toplam</dt><dd>66");
    h = render(ids[2], {
      commonMode: "events",
      horizon: 0,
      offsetA: 0,
      offsetB: 0,
    });
    expect(h).toContain('d="M30 50H30M30 105H30"');
    expect(h).toContain("Tek an: 0 dk");
    expect(h).toContain("Ortak olay adedi</dt><dd>1");
    fixture.explorations = {};
  });
  it("gerçek hook tür filtresinin sakladığı aktif yanlış türde eski kıyası kapatır;ilk yeni gerekçe kaydı kurtarır", () => {
    for (const [id, seed, guess, fields, inactive] of families) {
      for (const [field, type] of Object.entries(fields)) {
        const bad = type === "string" ? 1 : "1";
        render(id, {
          ...seed,
          [field]: bad,
          guess,
          reason: "Eski gerekçe",
          checked: true,
        });
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: id })),
        ).not.toContain('role="status"');
        const before = nodes(Lab({ lessonId: id }));
        expect(before.find((n) => n.type === "button")!.props.disabled).toBe(
          true,
        );
        before.find((n) => n.type === "textarea")!.props.onChange!({
          currentTarget: { value: "x" },
        });
        expect(typeof fixture.explorations[key(id)][field]).toBe(type);
        expect(fixture.explorations[key(id)].checked).toBe(false);
        if (seed.divisionMode === "weights" && field === "divisor") {
          // The real hook restores default divisor7, so old guess10 is no
          // longer an available answer. Repair the type, then choose0 openly.
          nodes(Lab({ lessonId: id })).find(
            (n) => n.props.label === "Sonuç tahminin",
          )!.props.change!("0");
        }
        const after = nodes(Lab({ lessonId: id }));
        expect(after.find((n) => n.type === "button")!.props.disabled).toBe(
          false,
        );
        after.find((n) => n.type === "button")!.props.onClick!();
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: id })),
        ).toContain('role="status"');
      }
      expect(
        render(id, {
          ...seed,
          [inactive]: true,
          guess,
          reason: "x",
          checked: true,
        }),
      ).toContain('role="status"');
    }
    fixture.explorations = {};
  });
  it("boş gerekçeyi ve aynı tür bozuk sınırı reddeder;tek karakteri ve kanonik ilk eylemi kabul eder", () => {
    for (const [id, seed, guess] of families) {
      for (const reason of ["", "   "])
        expect(
          render(id, { ...seed, guess, reason, checked: true }),
        ).not.toContain('role="status"');
      expect(
        render(id, { ...seed, guess, reason: "x", checked: true }),
      ).toContain('role="status"');
      nodes(Lab({ lessonId: id })).find((n) => n.type === "textarea")!.props
        .onChange!({ currentTarget: { value: "a".repeat(200) } });
      expect(fixture.explorations[key(id)].reason).toHaveLength(120);
      expect(fixture.explorations[key(id)].checked).toBe(false);
    }
    for (const [id, seed, guess, field, norm] of [
      [ids[0], { position: 99 }, "up", "position", 3],
      [ids[0], { operation: "constructor" }, "up", "operation", "replace"],
      [
        ids[0],
        { placeMode: "numbering", pageFirst: 100, pageLast: 90 },
        "3",
        "pageLast",
        100,
      ],
      [ids[1], { divisor: 0 }, "no", "divisor", 1],
      [ids[2], { commonMode: "events", periodA: 99 }, "24", "periodA", 30],
    ] as [string, Saved, string, string, string | number][]) {
      expect(
        render(id, { ...seed, guess, reason: "x", checked: true }),
      ).not.toContain('role="status"');
      nodes(Lab({ lessonId: id })).find((n) => n.type === "textarea")!.props
        .onChange!({ currentTarget: { value: "x" } });
      expect(fixture.explorations[key(id)][field]).toBe(norm);
    }
    fixture.explorations = {};
  });
  it("sınır ve sıfır durumlarında sonluSVG/HTML üretir;render tek başına kayıt yazmaz", () => {
    const states: [string, Saved][] = [];
    for (const n of [0, 10, 99, 99999])
      for (const operation of [
        "replace",
        "append",
        "prepend",
        "reverse",
        "delete",
      ])
        for (const digit of [0, 9])
          states.push([
            ids[0],
            { number: n, operation, digit, position: String(n).length - 1 },
          ]);
    for (const a of [0, 168, 999])
      states.push([ids[0], { placeMode: "carry", addA: a, addB: a, addC: a }]);
    for (const [first, last] of [
      [1, 1],
      [9, 10],
      [98, 105],
      [9999, 9999],
      [5000, 4999],
    ])
      states.push([
        ids[0],
        { placeMode: "numbering", pageFirst: first, pageLast: last },
      ]);
    for (const dividend of [-999, 0, 999])
      for (const divisor of [1, 7, 30])
        states.push([ids[1], { dividend, divisor }]);
    for (const weightNumber of [0, 4025, 999999])
      for (const divisor of [1, 8, 11, 30])
        states.push([
          ids[1],
          { divisionMode: "weights", weightNumber, divisor },
        ]);
    for (const pattern of ["7?4", "3?6?", "?28", "13?5"])
      for (const divisorSet of ["3,4", "5,9", "4,11", "8,9"])
        for (const distinct of [false, true])
          states.push([
            ids[1],
            { divisionMode: "filter", pattern, divisorSet, distinct },
          ]);
    for (const [commonA, commonB] of [
      [1, 1],
      [120, 1],
      [1, 120],
      [120, 119],
      [42, 66],
    ])
      states.push([ids[2], { commonA, commonB }]);
    for (const horizon of [0, 20, 60, 240])
      for (const includeZero of [false, true])
        for (const includeEnd of [false, true])
          states.push([
            ids[2],
            {
              commonMode: "events",
              periodA: 1,
              periodB: 1,
              offsetA: 0,
              offsetB: 0,
              horizon,
              includeZero,
              includeEnd,
            },
          ]);
    for (const [pairGcd, pairLcm] of [
      [1, 1],
      [8, 90],
      [60, 3600],
      [12, 12],
      [6, 180],
    ])
      states.push([ids[2], { commonMode: "pairs", pairGcd, pairLcm }]);
    const errors = vi.spyOn(console, "error").mockImplementation(() => {}),
      before = fixture.writes;
    try {
      for (const [id, s] of states) {
        const h = render(id, s);
        expect(h).toContain("<svg");
        expect(h).toContain("data-model-result");
        expect(h).not.toMatch(/NaN|Infinity|>undefined</);
        const ids = [...h.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
        expect(new Set(ids).size).toBe(ids.length);
      }
      expect(errors).not.toHaveBeenCalled();
      expect(fixture.writes).toBe(before);
    } finally {
      errors.mockRestore();
      fixture.explorations = {};
    }
    expect(states.length).toBe(127);
  }, 20000);
});

it("gives every advanced card its own method before the numerical steps", () => {
  const cards = forge026MathLessons.flatMap((lesson) => lesson.questions);
  const normalize = (s: string) =>
    s
      .normalize("NFKC")
      .toLocaleLowerCase("tr-TR")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[.;:!?]+$/, "");
  expect(cards).toHaveLength(60);
  expect(new Set(cards.map((q) => q.guidance!.strategy)).size).toBe(60);
  for (const q of cards) {
    const g = q.guidance!;
    expect(normalize(g.strategy), q.id).not.toBe(normalize(q.hint.tr));
    for (const prior of [...g.knowledge, ...g.steps])
      expect(normalize(g.strategy), q.id).not.toBe(normalize(prior));
  }
});
