import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { theorySupplements } from "../src/learning/theorySupplements";
import {
  arithmeticExamples208, arithmeticRows208, arithmeticSupplement208, chainExamples208, chainMinTotal208, chainRows208,
  chainSupplement208, placeValueExamples208, placeValueRows208, placeValueSupplement208, repeatingExamples208,
  repeatingRows208, repeatingSupplement208, wordExamples208, wordRows208, wordSupplement208, q208,
} from "../src/learning/depth208";

const added = [
  ["temel-kavramlar", placeValueSupplement208, placeValueExamples208],
  ["ardisik-sayilar", arithmeticSupplement208, arithmeticExamples208],
  ["sayi-problemleri", wordSupplement208, wordExamples208],
  ["kesir-problemleri", chainSupplement208, chainExamples208],
  ["rasyonel-sayilar", repeatingSupplement208, repeatingExamples208],
] as const;

/* Bağımsız kesin aritmetik: BigInt kesirler. */
type F = [bigint, bigint];
const bgcd = (a: bigint, b: bigint): bigint => (b === 0n ? (a < 0n ? -a : a) : bgcd(b, a % b));
const fr = (n: bigint | number, d: bigint | number = 1n): F => {
  let [p, q] = [BigInt(n), BigInt(d)];
  if (q < 0n) { p = -p; q = -q; }
  const g = bgcd(p, q) || 1n;
  return [p / g, q / g];
};
const fadd = (x: F, y: F) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const fsub = (x: F, y: F) => fr(x[0] * y[1] - y[0] * x[1], x[1] * y[1]);
const fmul = (x: F, y: F) => fr(x[0] * y[0], x[1] * y[1]);
const fdiv = (x: F, y: F) => fr(x[0] * y[1], x[1] * y[0]);
const ftext = ([p, q]: F) => (q === 1n ? String(p) : `${p}/${q}`).replace("-", "−");

describe("depth 0.208.0 TYT Matematik", () => {
  it("appends one table section and two examples without touching the accepted guide", () => {
    for (const [id, supplement, examples] of added) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === supplement.table)).toHaveLength(1);
      const section = shown.sections.at(-1)!;
      expect(section.title).toBe(supplement.title);
      expect(section.figureTitle).toBe(supplement.title);
      expect(section.table?.layout).toBe("table");
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length).toBeGreaterThan(5);
        expect(`${example.title} ${example.prompt}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
      }
      // Mevcut ekler korunur, yeni ek dizinin sonundadır.
      expect(theorySupplements[id]!.at(-1)).toBe(supplement);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.find(({ title }) => title === supplement.title)!;
      expect(sheetSection.table).toBe(supplement.table);
      expect(sheetSection.figureTitle).toBe(supplement.figureTitle);
      expect(sheetSection.text).toEqual([supplement.summary]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
    }
  });

  it("keeps the earlier supplements of the three lessons that already had one", () => {
    expect(theorySupplements["temel-kavramlar"]![0].title).toBe("Sayı kümelerinde önce değeri hesapla");
    expect(theorySupplements["sayi-problemleri"]![0].title).toBe("Kapasite eşitliği birimlerin oranını buldurur");
    expect(theorySupplements["kesir-problemleri"]![0].title).toBe("Kalanın kesri yeni bir taban kullanır");
    for (const id of ["temel-kavramlar", "sayi-problemleri", "kesir-problemleri"]) expect(theorySupplements[id]).toHaveLength(2);
  });

  it("registers one drawable figure per new section", () => {
    for (const [id, supplement] of added) {
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const def = sectionFigures[id][supplement.figureTitle];
      expect(def, id).toBeDefined();
      for (const step of (def.steps ?? [""]).map((_, i) => i)) {
        const frame = def.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout?.length).toBeGreaterThan(0);
      }
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: supplement.figureTitle }));
      expect(html).toContain('role="img"');
    }
  });

  it("derives the place value rows by writing the digits out", () => {
    const rows = placeValueRows208();
    const words = [["ab"], ["ab", "ba"], ["ab", "ba"], ["abc"], ["abc", "cba"], ["abc", "bca", "cab"]];
    const signs = [[1], [1, 1], [1, -1], [1], [1, -1], [1, 1, 1]];
    for (let a = 1; a <= 9; a += 1) for (let b = 0; b <= 9; b += 1) for (let c = 0; c <= 9; c += 1) {
      const d: Record<string, number> = { a, b, c };
      const got = placeValueRows208({ a, b, c });
      words.forEach((ws, i) => {
        const direct = ws.reduce((s, w, j) => s + signs[i][j] * Number([...w].map((l) => d[l]).join("")), 0);
        expect(got[i].value).toBe(direct);
      });
      expect(got[2].value).toBe(9 * (a - b));
      expect(got[4].value).toBe(99 * (a - c));
      expect(got[5].value).toBe(111 * (a + b + c));
    }
    expect(rows.map(({ simplified }) => simplified)).toEqual(["10a + b", "11(a + b)", "9(a − b)", "100a + 10b + c", "99(a − c)", "111(a + b + c)"]);
    expect(placeValueSupplement208.table.rows.map((r) => r[3])).toEqual([
      "72", "72 + 27 = 99 = 11·9", "72 − 27 = 45 = 9·5", "724", "724 − 427 = 297 = 99·3", "724 + 247 + 472 = 1443 = 111·13",
    ]);
  });

  it("derives the consecutive sums by adding every term", () => {
    for (const row of arithmeticRows208()) {
      const terms: number[] = [];
      for (let x = row.first; x <= row.last; x += row.step) terms.push(x);
      expect(row.n).toBe(terms.length);
      expect(row.sum).toBe(terms.reduce((s, x) => s + x, 0));
      expect(row.mean * terms.length).toBe(row.sum);
    }
    expect(arithmeticRows208().map(({ n, sum }) => [n, sum])).toEqual([[20, 210], [20, 420], [20, 400], [19, 38], [8, 136], [13, 702]]);
  });

  it("evaluates every sentence row by an independent formula", () => {
    const formulas: ((x: F) => F)[] = [
      (x) => fadd(fdiv(x, fr(2)), fr(4)),
      (x) => fdiv(fadd(x, fr(4)), fr(2)),
      (x) => fmul(fr(2), fmul(x, x)),
      (x) => fmul(fmul(fr(2), x), fmul(fr(2), x)),
      (x) => fmul(fsub(x, fr(3)), fsub(x, fr(3))),
      (x) => fsub(fmul(x, x), fr(3)),
      (x) => fdiv(fr(3), x),
      (x) => fdiv(fr(1), fmul(fr(3), x)),
    ];
    const rows = wordRows208();
    rows.forEach((row, i) => {
      expect(wordSupplement208.table.rows[i].slice(2)).toEqual([6, 10].map((x) => ftext(formulas[i](fr(x)))));
      for (let x = -12; x <= 12; x += 1) if (x !== 0) {
        const value = row.run(q208(x));
        expect(ftext(fr(value.n, value.d))).toBe(ftext(formulas[i](fr(x))));
      }
    });
    expect(wordSupplement208.table.rows.map((r) => r[0])).toEqual([
      "Sayının yarısının 4 fazlası", "Sayının 4 fazlasının yarısı", "Sayının karesinin 2 katı", "Sayının 2 katının karesi",
      "Sayının 3 eksiğinin karesi", "Sayının karesinin 3 eksiği", "Sayının tersinin 3 katı", "Sayının 3 katının tersi",
    ]);
  });

  it("follows the four step spending with exact fractions", () => {
    let left = fr(360);
    const fractions = [fr(1, 3), fr(1, 4), fr(2, 5), fr(1, 6)];
    const rows = chainRows208();
    fractions.forEach((r, i) => {
      const used = fmul(left, r);
      left = fsub(left, used);
      expect(fr(rows[i].used)).toEqual(used);
      expect(fr(rows[i].remaining)).toEqual(left);
      expect(ftext(fr(rows[i].usedShare.n, rows[i].usedShare.d))).toBe(ftext(fdiv(used, fr(360))));
    });
    expect(rows.map(({ used }) => used)).toEqual([120, 60, 72, 18]);
    expect(left).toEqual(fr(90));
    const integral = (t: number) => {
      let rest = fr(t);
      return fractions.every((r) => { const u = fmul(rest, r); rest = fsub(rest, u); return u[1] === 1n && rest[1] === 1n; });
    };
    expect(Array.from({ length: 400 }, (_, t) => t + 1).find(integral)).toBe(chainMinTotal208);
    expect(chainMinTotal208).toBe(60);
  });

  it("converts every repeating decimal by long division", () => {
    // Bağımsız denetim: 60 basamaklık uzun bölme, yazımdaki deseni üretmeli.
    for (const row of repeatingRows208()) {
      const [p, q] = fr(row.value.n, row.value.d);
      let digits = "";
      let r = p % q;
      for (let i = 0; i < 60; i += 1) { r *= 10n; digits += String(r / q); r %= q; }
      let expected = row.fixed;
      while (expected.length < 60) expected += row.period;
      const whole = p / q;
      if (/^9+$/.test(row.period)) {
        expect(whole).toBe(BigInt(row.whole + 1));
        expect(digits).toBe("0".repeat(60));
      } else {
        expect(whole).toBe(BigInt(row.whole));
        expect(digits).toBe(expected.slice(0, 60));
      }
    }
    expect(repeatingSupplement208.table.rows.map((r) => r[4])).toEqual(["1/3", "5/11", "11/90", "5/6", "11/9", "47/22", "1"]);
  });

  it("checks every new example answer", () => {
    // Temel kavramlar.
    const two = [];
    for (let a = 1; a <= 9; a += 1) for (let b = 1; b <= 9; b += 1) if (10 * a + b - (10 * b + a) === 54 && a + b === 10) two.push(10 * a + b);
    expect(two).toEqual([82]);
    const three = [];
    for (let n = 100; n <= 999; n += 1) {
      const [a, b, c] = String(n).split("").map(Number);
      if (c !== 0 && new Set([a, b, c]).size === 3 && n - Number(`${c}${b}${a}`) === 396) three.push(n);
    }
    expect(Math.max(...three)).toBe(985);
    // Ardışık sayılar.
    const odd = Array.from({ length: 100 }, (_, i) => 2 * i - 99).filter((start) => Array.from({ length: 12 }, (_, i) => start + 2 * i).reduce((s, x) => s + x, 0) === 216);
    expect(odd).toEqual([7]);
    expect(7 + 2 * 11).toBe(29);
    const sevens = Array.from({ length: 99 }, (_, i) => 101 + i).filter((x) => x % 7 === 0);
    expect([sevens.length, sevens.reduce((s, x) => s + x, 0)]).toEqual([14, 2107]);
    // Sayı problemleri.
    expect(Array.from({ length: 201 }, (_, i) => i - 100).filter((x) => (x - 3) ** 2 === x * x - 33)).toEqual([7]);
    expect(Array.from({ length: 201 }, (_, i) => i - 100).filter((x) => 3 * x + 24 === 2 * (x + 4))).toEqual([-16]);
    expect(fadd(fdiv(fr(-16), fr(2)), fr(4))).toEqual(fdiv(fr(-12), fr(3)));
    // Kesir problemleri.
    const tank = Array.from({ length: 1000 }, (_, i) => i + 1).filter((n) => {
      let rest = fr(n);
      for (const r of [fr(1, 4), fr(1, 3), fr(1, 2)]) rest = fsub(rest, fmul(rest, r));
      const used = fsub(fr(n), rest);
      return fsub(used, rest)[0] === 60n && fsub(used, rest)[1] === 1n;
    });
    expect(tank).toEqual([120]);
    const book = Array.from({ length: 1000 }, (_, i) => i + 1).filter((n) => {
      const day1 = fmul(fr(n), fr(2, 9));
      const day2 = fmul(fsub(fr(n), day1), fr(3, 7));
      const day3 = fmul(fr(n), fr(1, 6));
      const left = fsub(fsub(fsub(fr(n), day1), day2), day3);
      return left[0] === 40n && left[1] === 1n && [day1, day2, day3].every(([, q]) => q === 1n);
    });
    expect(book).toEqual([144]);
    // Rasyonel sayılar.
    expect(fadd(fr(3, 9), fr(45, 99))).toEqual(fr(26, 33));
    expect(fr(26, 33)).toEqual(fr(78, 99));
    expect(fsub(fr(11, 9), fr(75, 90))).toEqual(fr(7, 18));
    let r = 7n % 18n;
    let digits = "";
    for (let i = 0; i < 6; i += 1) { r *= 10n; digits += String(r / 18n); r %= 18n; }
    expect(digits).toBe("388888");
  });
});
