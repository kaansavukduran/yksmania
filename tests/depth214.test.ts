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
  bimetalCool214, bimetalHeat214, complementCase214, divergingCase214, equalExpansionCase214, expansionCoefficients214,
  expansionExamples214, expansionSupplement214, filterExamples214, filterSupplement214, lensCases214, lensExamples214,
  lensSupplement214, magnetCases214, magnetExamples214, magnetSupplement214, posterSeen214, redDeviation214,
  screenCase214, stripCase214, unknownBarCase214, violetDeviation214, flipCase214,
} from "../src/learning/depth214";

const added = [
  ["mercekler", lensSupplement214, lensExamples214],
  ["prizmalar-renkler", filterSupplement214, filterExamples214],
  ["miknatislar-ve-manyetik-alan", magnetSupplement214, magnetExamples214],
  ["genlesme", expansionSupplement214, expansionExamples214],
] as const;

/** Türkçe sayı yazımı (bağımsız): virgül ve gerçek eksi. */
const tr = (x: number, d = 2) => {
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace(".", ",").replace("-", "−");
};
/** Bağımsız kesin kesir: ince mercek bağıntısı tam sayılarla. */
type F = [number, number];
const g = (a: number, b: number): number => (b === 0 ? Math.abs(a) : g(b, a % b));
const fr = (n: number, d: number): F => { const k = g(n, d) * Math.sign(d); return [n / k, d / k]; };

describe("depth 0.214.0 TYT Fizik", () => {
  it("appends one table section and two examples without touching the accepted guide", () => {
    for (const [id, supplement, examples] of added) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections).toHaveLength(8);
      expect(raw.examples).toHaveLength(4);
      expect(raw.sections.some(({ title }) => title === supplement.title)).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === supplement.table)).toHaveLength(1);
      const section = shown.sections.at(-1)!;
      expect(section.title).toBe(supplement.title);
      expect(section.figureTitle).toBe(supplement.title);
      expect(section.table?.layout).toBe("table");
      expect(section.table!.rows.length).toBeLessThanOrEqual(8);
      expect(section.table!.headers!.length).toBeLessThanOrEqual(5);
      for (const row of section.table!.rows) expect(row).toHaveLength(section.table!.headers!.length);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length).toBeGreaterThan(5);
        expect(`${example.title} ${example.prompt}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
        expect(JSON.stringify(example)).not.toMatch(/NaN|undefined|Infinity/);
      }
      expect(theorySupplements[id]).toHaveLength(1);
      expect(theorySupplements[id]!.at(-1)).toBe(supplement);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.find(({ title }) => title === supplement.title)!;
      expect(sheetSection.table).toBe(supplement.table);
      expect(sheetSection.figureTitle).toBe(supplement.figureTitle);
      expect(sheetSection.text).toEqual([supplement.summary]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      expect(JSON.stringify(supplement)).not.toMatch(/NaN|undefined|Infinity/);
    }
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
    expect(sectionFigures.mercekler[lensSupplement214.title].steps).toHaveLength(lensCases214.length);
    expect(sectionFigures["miknatislar-ve-manyetik-alan"][magnetSupplement214.title].steps).toHaveLength(magnetCases214.length);
  });

  it("recomputes every lens row with exact fractions", () => {
    const rows = lensSupplement214.table.rows;
    expect(rows).toHaveLength(8);
    lensCases214.forEach(({ f, u }, i) => {
      const row = rows[i];
      expect(row[0]).toContain(f > 0 ? "Yakınsak" : "Iraksak");
      // 1/v = 1/f − 1/u = (u − f)/(f·u)
      if (u === f) {
        expect(row.slice(1, 3)).toEqual(["Yok", "Yok"]);
        expect(row[3]).toBe("Sonlu görüntü yok");
        return;
      }
      const [n, d] = fr(f * u, u - f);
      const vv = n / d;
      const m = -vv / u;
      expect(row[1]).toBe(tr(vv));
      expect(row[2]).toBe(tr(m));
      expect(row[3]).toBe(vv > 0 ? "Çıkış tarafı, gerçek" : "Giriş tarafı, sanal");
      const size = Math.abs(Math.abs(m) - 1) < 1e-12 ? "eş boy" : Math.abs(m) > 1 ? "büyük" : "küçük";
      expect(row[4]).toBe(`${m < 0 ? "Ters" : "Düz"}, ${size}`);
    });
    expect(rows.map((r) => r[1])).toEqual(["15", "20", "30", "Yok", "−10", "−7,5", "−6", "−5"]);
    expect(rows.map((r) => r[2])).toEqual(["−0,5", "−1", "−2", "Yok", "2", "0,25", "0,4", "0,5"]);
  });

  it("recomputes the lens examples from the thin-lens equation", () => {
    // Perde: m = −3, f = 12 ⇒ v = 3u, 1/12 = 4/(3u) ⇒ u = 16, v = 48.
    expect(screenCase214).toMatchObject({ f: 12, m: -3 });
    expect(screenCase214.u).toBeCloseTo(16, 12);
    expect(screenCase214.v).toBeCloseTo(48, 12);
    expect(1 / 16 + 1 / 48).toBeCloseTo(1 / 12, 15);
    expect(lensExamples214[0].answer).toBe("Cisim mercekten 16 cm uzaktadır; cisim ile perde arası 64 cm’dir.");
    // Iraksak: m = 1/4, f = −20 ⇒ v = −u/4, −1/20 = −3/u ⇒ u = 60, v = −15.
    expect(divergingCase214.u).toBeCloseTo(60, 12);
    expect(divergingCase214.v).toBeCloseTo(-15, 12);
    expect(1 / 60 - 1 / 15).toBeCloseTo(-1 / 20, 15);
    expect(lensExamples214[1].answer).toBe("Cisim 60 cm, görüntü 15 cm uzaktadır (v = −15 cm); aralarında 45 cm vardır.");
  });

  it("recomputes the filter table and colour examples channel by channel", () => {
    const rgb: Record<string, number[]> = {
      kırmızı: [1, 0, 0], yeşil: [0, 1, 0], mavi: [0, 0, 1], sarı: [1, 1, 0], camgöbeği: [0, 1, 1], macenta: [1, 0, 1], beyaz: [1, 1, 1],
    };
    const name = (c: number[]) => Object.keys(rgb).find((k) => rgb[k].join() === c.join()) ?? "ışık yok";
    const up = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
    const filters = ["kırmızı", "yeşil", "mavi", "sarı", "camgöbeği", "macenta"];
    const lights = ["beyaz", "sarı", "camgöbeği", "macenta"];
    expect(filterSupplement214.table.headers).toEqual(["Filtre", ...lights.map((l) => `${up(l)} ışık`)]);
    filterSupplement214.table.rows.forEach((row, i) => {
      expect(row[0]).toBe(`${up(filters[i])} filtre`);
      lights.forEach((l, j) => expect(row[j + 1]).toBe(up(name(rgb[filters[i]].map((x, k) => x * rgb[l][k])))));
    });
    // Toplamsal: macenta + yeşil = beyaz; macenta ∩ sarı = kırmızı.
    expect(complementCase214).toEqual({ added: "yeşil", mixed: "beyaz", filtered: "kırmızı" });
    expect(posterSeen214.map(({ seen }) => seen)).toEqual(["siyah (karanlık)", "yeşil", "mavi", "camgöbeği"]);
    // Dispersiyon: rehberin modeli (A = 40°, i = 30°, n = 1,5 / 1,6).
    const dev = (n: number) => {
      const r1 = Math.asin(Math.sin(Math.PI / 6) / n);
      const e = Math.asin(n * Math.sin((40 * Math.PI) / 180 - r1));
      return 30 + (e * 180) / Math.PI - 40;
    };
    expect(redDeviation214).toBeCloseTo(dev(1.5), 10);
    expect(violetDeviation214).toBeCloseTo(dev(1.6), 10);
    expect(violetDeviation214).toBeGreaterThan(redDeviation214);
    expect(filterSupplement214.paragraphs[0]).toContain(`${tr(dev(1.5), 1)}°`);
  });

  it("recomputes compass directions with an independent two-pole field", () => {
    const field = (poles: readonly { x: number; y: number; s: number }[], p: readonly number[]) => poles.reduce(
      ([bx, by], q) => {
        const dx = p[0] - q.x; const dy = p[1] - q.y; const r = Math.hypot(dx, dy);
        return [bx + (q.s * dx) / r ** 3, by + (q.s * dy) / r ** 3];
      }, [0, 0]);
    const word = ([x, y]: number[]) => (Math.hypot(x, y) < 1e-12 ? "Belirli yön yok (B = 0)" : Math.abs(x) > Math.abs(y) ? (x > 0 ? "Sağa" : "Sola") : y > 0 ? "Yukarı" : "Aşağı");
    const rows = magnetSupplement214.table.rows;
    magnetCases214.forEach((c, i) => expect(rows[i][2]).toBe(word(field(c.poles, c.p))));
    expect(rows.map((r) => r[2])).toEqual(["Sola", "Sola", "Sağa", "Sağa", "Sağa", "Sağa", "Belirli yön yok (B = 0)"]);
    // Karşılıklı N–N düzeninde uçlar gerçekten N, N–S düzeninde N ve S.
    const facing = (k: string) => magnetCases214.find(({ key }) => key === k)!.poles.filter(({ x }) => Math.abs(x) === 1).map(({ s }) => s);
    expect(facing("facingNN")).toEqual([1, 1]);
    expect(facing("facingNS")).toEqual([1, -1]);
    expect(unknownBarCase214).toMatchObject({ east: "S", west: "N", above: "sağa" });
    expect(flipCase214).toMatchObject({ before: "yön yok", after: "sağa" });
    expect(magnetExamples214[0].answer).toBe("(a) Doğu ucu S kutbudur. (b) Pusulanın N ucu doğu yönünü gösterir.");
  });

  it("recomputes the expansion table and examples from ΔL = α·L0·ΔT", () => {
    expect(expansionCoefficients214.map(({ alphaE6 }) => alphaE6)).toEqual([23, 17, 12, 9]);
    const rows = expansionSupplement214.table.rows;
    expansionCoefficients214.forEach(({ material, alphaE6 }, i) => {
      const dLmm = (alphaE6 * 1 * 100) / 1000; // α·10⁻⁶ · 1 m · 100 °C, mm’ye çevrilmiş
      expect(rows[i]).toEqual([material, String(alphaE6), tr(dLmm), tr(1 + dLmm / 1000, 4), tr(-dLmm)]);
    });
    expect(rows.map((r) => r[2])).toEqual(["2,3", "1,7", "1,2", "0,9"]);
    expect(expansionSupplement214.paragraphs[0]).toContain("CRC Handbook of Chemistry and Physics");
    expect(bimetalHeat214).toMatchObject({ outer: "Alüminyum", bendsToward: "Demir (çelik)" });
    expect(bimetalCool214).toMatchObject({ outer: "Demir (çelik)", bendsToward: "Alüminyum" });
    // Eşit uzama: 12·2,3 = 23·L ⇒ L = 1,2 m; ΔL = 12e-6·2,3·50 = 1,38 mm.
    expect(equalExpansionCase214.LAl).toBeCloseTo(1.2, 12);
    expect(equalExpansionCase214.dL * 1000).toBeCloseTo(1.38, 12);
    expect(expansionExamples214[0].answer).toBe("Alüminyum çubuk 1,2 m olmalıdır; 50 °C artışta ikisi de 1,38 mm uzar.");
    // Bimetal soğutma: bakır (17) daha çok kısalır ve içte kalır; fark 0,1·5e-6·50 m = 0,025 mm.
    expect(stripCase214.bend).toMatchObject({ inner: "Bakır", bendsToward: "Bakır" });
    expect(stripCase214.gap * 1000).toBeCloseTo(0.025, 12);
    expect(expansionExamples214[1].answer).toBe("(a) Şerit bakır tarafına eğilir. (b) Serbest boylar arasında 0,025 mm fark oluşurdu.");
  });
});
