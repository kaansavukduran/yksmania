import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { angleAt, dist, SectionFigureView, type El, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import {
  depthFigures200,
  multisetTypes,
  parallelArms203,
  sectorArms203,
  specialTriangles203,
} from "../src/learning/sectionFigures/depthFigures200";
import { studyGuide } from "../src/learning/guides";
import {
  binomialSection200,
  combinationRows200,
  combinationSection200,
  diceSumRows200,
  multisetCases200,
  multisetCount200,
  pascalRows200,
  permutationRows200,
  permutationSection200,
  probabilitySection200,
  repeatedSection200,
} from "../src/learning/countingDepth200";
import { factorialSection202, factorialZeroRows202, paritySection202, parityRows202, primeDecades202, primeSection202, primesUpTo202 } from "../src/learning/numberDepth202";
import {
  parallelAlpha203,
  parallelAngleRows203,
  parallelSection203,
  radicalValue203,
  sectorRadius203,
  sectorRows203,
  sectorSection203,
  specialAngleRows203,
  specialAngleSection203,
} from "../src/learning/geometryDepth203";

const SECTIONS: [string, string][] = [
  ["tyt-mat-permutasyon-kaynak-032", permutationSection200.title],
  ["tyt-mat-tekrarli-permutasyon-kaynak-033", repeatedSection200.title],
  ["tyt-mat-kombinasyon-kaynak-034", combinationSection200.title],
  ["tyt-mat-binom-kaynak-035", binomialSection200.title],
  ["tyt-mat-olasilik-kaynak-036", probabilitySection200.title],
  ["tek-cift-isaret", paritySection202.title],
  ["asal-sayilar", primeSection202.title],
  ["faktoriyel", factorialSection202.title],
  ["tyt-geo-temel-acilar-031", parallelSection203.title],
  ["tyt-geo-trigonometrik-oranlar-040", specialAngleSection203.title],
  ["tyt-geo-daire-040", sectorSection203.title],
];

const fig = (guide: string, title: string): FigureDef => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const values = (def: FigureDef) =>
  def.param ? Array.from({ length: Math.round((def.param.max - def.param.min) / def.param.step) + 1 }, (_, i) => def.param!.min + i * def.param!.step) : [0];
const frames = (def: FigureDef) => (def.steps ? def.steps.map((_, i) => i) : [0]).flatMap((s) => values(def).map((x) => def.draw(x, s, -1)));
const texts = (els: El[]) => els.flatMap((el) => (el.k === "text" ? [el.s] : []));
const readout = (def: FigureDef, value: number, step = 0) => (def.draw(value, step, -1).readout ?? []).join(" | ");
const filled = (els: El[], tone: string) => els.filter((el) => el.k === "poly" && el.fill === tone).length;

describe("derinleştirme tablosu bölüm figürleri (0.200–0.203)", () => {
  it("11 bölümün her biri ders sayfasında kendi başlığıyla bir figüre çözülür", () => {
    expect(Object.values(depthFigures200).reduce((n, defs) => n + Object.keys(defs).length, 0)).toBe(11);
    for (const [guide, title] of SECTIONS) {
      expect(sectionFigureGuideIds.has(guide), guide).toBe(true);
      const section = studyGuide(guide)?.sections.find((s) => s.title === title);
      expect(section, `${guide} / ${title}`).toBeDefined();
      expect(section!.figureTitle ?? section!.title).toBe(title);
      expect(fig(guide, title)).toBe(depthFigures200[guide][title]);
    }
  });

  it("eski bölüm figürleri yerinde kalır", () => {
    expect(Object.keys(sectionFigures["tyt-geo-daire-040"])).toContain("Daire parçası: dilimden üçgeni çıkar");
    expect(Object.keys(sectionFigures["tek-cift-isaret"])).toContain("İki bağımsız soru: işaret ve tek–çift");
    expect(Object.keys(sectionFigures["tyt-mat-olasilik-kaynak-036"])).toContain("Örnek uzay hangi sonuçların sayıldığını belirler");
  });

  it("her adım ve sürgü değeri NaN içermeden çizilir; erişilebilir ad, Türkçe metin", () => {
    for (const [guide, title] of SECTIONS) {
      const def = fig(guide, title);
      expect(Boolean(def.param || def.steps), title).toBe(true);
      for (const f of frames(def)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f), title).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
      expect(def.caption.length, title).toBeGreaterThan(60);
      expect(def.alt.length, title).toBeGreaterThan(40);
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title }));
      expect(html).toContain('role="img"');
      expect(html).toContain("<figcaption>");
      const text = JSON.stringify([def.caption, def.alt, def.steps, frames(def).map((f) => f.readout)]);
      expect(text, title).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      expect(text, title).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor)(?!\p{L})/iu);
      expect(text, title).not.toMatch(/\b(the|and|step|angle)\b/i);
    }
  });

  it("permütasyon ve kombinasyon figürleri tablo satırlarını gösterir", () => {
    const perm = fig(SECTIONS[0][0], SECTIONS[0][1]);
    for (const row of permutationRows200()) {
      const els = perm.draw(row.r, 0, -1).els;
      const slots = texts(els).filter((s) => /^\d+$/.test(s)).slice(0, row.r).map(Number);
      expect(slots.reduce((a, b) => a * b, 1)).toBe(row.ordered);
      expect(readout(perm, row.r)).toContain(`= ${row.chosen} ekip`);
      expect(readout(perm, row.r)).toContain(`${row.r}! = ${row.inner}`);
    }
    const comb = fig(SECTIONS[2][0], SECTIONS[2][1]);
    for (const row of combinationRows200()) {
      const r = readout(comb, row.r);
      expect(r).toContain(`= ${row.chosen} = C(7,${7 - row.r}) = ${row.outside}`);
      expect(r).toContain(`= ${row.atLeast}.`);
      expect(texts(comb.draw(row.r, 0, -1).els)).toEqual(expect.arrayContaining(combinationRows200().map(({ chosen }) => String(chosen))));
    }
  });

  it("tekrarlı permütasyon kart türleri tablo adetleriyle aynıdır", () => {
    const def = fig(SECTIONS[1][0], SECTIONS[1][1]);
    multisetCases200.forEach(({ label, counts }, step) => {
      expect(multisetTypes(label).map(({ count }) => count)).toEqual([...counts]);
      expect(readout(def, 0, step)).toContain(`= ${multisetCount200(counts).toLocaleString("tr-TR")}.`);
    });
  });

  it("Pascal ve zar figürleri tablo değerleriyle aynıdır", () => {
    const binom = fig(SECTIONS[3][0], SECTIONS[3][1]);
    for (const { n, row, sum, alternating } of pascalRows200()) {
      const r = readout(binom, n);
      expect(r).toContain(`${row.join(" + ")} = ${sum}`);
      expect(r).toContain(`= ${String(alternating).replace("-", "−")}.`);
    }
    const dice = fig(SECTIONS[4][0], SECTIONS[4][1]);
    for (const { sum, ways, probability, atMost } of diceSumRows200()) {
      const els = dice.draw(sum, 0, -1).els;
      expect(filled(els, "a"), `toplam ${sum}`).toBe(ways);
      expect(readout(dice, sum)).toContain(`P = ${ways}/36 = ${probability}`);
      expect(readout(dice, sum)).toContain(`P = ${atMost}.`);
    }
  });

  it("parite, elek ve faktöriyel figürleri tablo değerlerini taşır", () => {
    const parity = fig(SECTIONS[5][0], SECTIONS[5][1]);
    const rows = parityRows202();
    expect(readout(parity, 0, 2)).toContain(rows.map(({ square }) => square).join(", "));
    expect(texts(parity.draw(0, 3, -1).els)).toEqual(expect.arrayContaining(rows.map(({ consecutive }) => String(consecutive).replace("-", "−"))));
    const sieve = fig(SECTIONS[6][0], SECTIONS[6][1]);
    const final = sieve.steps!.length - 1;
    const decades = primeDecades202();
    expect(filled(sieve.draw(0, final, -1).els, "a")).toBe(primesUpTo202(50).length);
    expect(readout(sieve, 0, final)).toContain(decades.map(({ primes }) => primes.length).join(", "));
    expect(sieve.steps!.slice(0, -1)).toEqual(primesUpTo202(decades[4].trialLimit).map((p) => expect.stringContaining(`${p}’`)));
    const zeros = fig(SECTIONS[7][0], SECTIONS[7][1]);
    factorialZeroRows202().forEach((row, step) => {
      const tokens = zeros.draw(0, step, -1).els.filter((el) => el.k === "poly" && el.fill === "a" && dist(el.ps[0], el.ps[2]) < 0.2).length;
      expect(tokens, `${row.n}!`).toBe(row.zeros);
      expect(readout(zeros, 0, step)).toContain(`= ${row.zeros} sondaki sıfır`);
      expect(readout(zeros, 0, step)).toContain(`${row.twos} tane 2`);
    });
  });

  it("paralel doğrulardaki sekiz açı gerçek yönlerden ölçülür ve tablo ölçüsüne eşittir", () => {
    const rows = parallelAngleRows203();
    for (const row of rows) {
      const [o, p, q] = parallelArms203(row);
      expect(angleAt(o, p, q), `açı ${row.label}`).toBeCloseTo(row.measure, 9);
    }
    const def = fig(SECTIONS[8][0], SECTIONS[8][1]);
    const last = def.draw(0, 2, -1);
    expect(last.els.filter((el) => el.k === "angle").map((el) => (el.k === "angle" ? el.label : ""))).toEqual(rows.map(({ label }) => String(label)));
    expect(last.readout?.[0]).toBe(`α = ${parallelAlpha203}°: 1, 4, 5, 8.`);
    expect(last.readout?.[1]).toBe(`180° − α = ${180 - parallelAlpha203}°: 2, 3, 6, 7.`);
  });

  it("özel açı üçgenleri tablo kenarlarıyla kurulur", () => {
    const { H, Q, R, P, A, B, C } = specialTriangles203();
    const rows = specialAngleRows203();
    const [r30, r45, r60] = rows;
    expect(dist(Q, R)).toBeCloseTo(radicalValue203(r30.hypotenuse), 9);
    expect(dist(P, R)).toBeCloseTo(dist(P, Q), 9);
    expect(angleAt(R, H, Q)).toBeCloseTo(r30.angle, 9);
    expect(angleAt(Q, R, H)).toBeCloseTo(r60.angle, 9);
    expect(angleAt(B, C, A)).toBeCloseTo(r45.angle, 9);
    expect(dist(B, C)).toBeCloseTo(radicalValue203(r45.hypotenuse), 9);
    const def = fig(SECTIONS[9][0], SECTIONS[9][1]);
    rows.forEach((row, step) => {
      const r = readout(def, 0, step);
      expect(r).toContain(`sin ${row.angle}°`);
      for (const value of [row.sin, row.cos, row.tan]) expect(Math.abs(radicalValue203(value))).toBeGreaterThan(0);
    });
    expect(readout(def, 0, 0)).toContain("= 1/2.");
  });

  it("daire dilimi kolları tablo açısını açar, yay ve alan tablodan gelir", () => {
    const def = fig(SECTIONS[10][0], SECTIONS[10][1]);
    sectorRows203().forEach((row, step) => {
      const [A, B] = sectorArms203(row.angle);
      const measured = angleAt(v0, A, B);
      expect(row.angle > 180 ? 360 - measured : measured).toBeCloseTo(row.angle, 9);
      const r = readout(def, 0, step);
      expect(r).toContain(`= ${row.fraction}.`);
      expect(r).toContain(`Çevre = ${row.straight} +`);
      expect(row.straight).toBe(2 * sectorRadius203);
    });
    expect(readout(def, 0, 2)).toContain("= 3π cm.");
    expect(readout(def, 0, 2)).toContain("= 9π cm².");
  });
});
const v0 = [0, 0] as const;
