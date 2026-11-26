import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  ISOTOPES219, countExamples219, countRows219, countSupplement219, fx219, isoExamples219, isoRows219, isoSupplement219,
  massExamples219, massRows219, massSupplement219, mgoExamples219, mgoRows219, mgoSupplement219, q219, realExamples219,
  realRows219, realSupplement219, sci219,
} from "../src/learning/depth219";

const lessons219 = {
  "mol-kutle-iliskisi": [massSupplement219, massExamples219],
  "mol-tanecik-iliskisi": [countSupplement219, countExamples219],
  "atom-kutlesi-hesaplari": [isoSupplement219, isoExamples219],
  "gercek-kutle-akb-nk": [realSupplement219, realExamples219],
  "kutle-korunumu-sabit-oran": [mgoSupplement219, mgoExamples219],
} as const;
const sheetText = (sheet: NonNullable<ReturnType<typeof studyCheatSheet>>) => JSON.stringify(sheet);

/* Bağımsız yeniden hesap: tam sayılarla (onda bir / binde bir ölçekli) ya da kayan noktayla. */
const AR: Record<string, number> = { H: 1, He: 4, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, Cl: 35.5, Ca: 40, Fe: 56 };
const comma = (x: number, digits: number, keep = false) => {
  const s = (Math.round(x * 10 ** digits + 1e-9) / 10 ** digits).toFixed(digits);
  return (keep ? s : s.replace(/\.?0+$/, "")).replace(".", ",");
};
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (k: number) => (k < 0 ? "⁻" : "") + [...String(Math.abs(k))].map((c) => SUP[Number(c)]).join("");
const sci = (x: number, digits: number, keep = true) => {
  let e = Math.floor(Math.log10(x));
  let m = x / 10 ** e;
  if (Number(m.toFixed(digits)) >= 10) { m /= 10; e += 1; }
  return `${comma(m, digits, keep)} × 10${sup(e)}`;
};

describe("TYT Kimya depth 0.219.0", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons219)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(raw.sections.some(({ table }) => table === added.table)).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table).toBe(added.table);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeGreaterThan(3);
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(0, raw.examples.length).map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples).toHaveLength(raw.examples.length + 2);
      expect(theorySupplements[id]).toEqual([added]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(added.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(sheetText(sheet)).toContain(added.table.rows[0][0]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity/);
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|mass|average)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps?.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = figure!.draw(0, step);
        expect(frame.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
    }
  });

  it("recomputes the molar mass table and both mass examples", () => {
    const M = (parts: readonly (readonly [string, number])[]) => parts.reduce((s, [el, k]) => s + AR[el] * k, 0);
    expect(massRows219.map(({ f }) => f.formula)).toEqual(["H₂O", "CO₂", "NH₃", "CH₄", "NaOH", "CaCO₃", "Al₂O₃", "Fe₂O₃"]);
    expect(massRows219.map(({ f }) => M(f.parts))).toEqual([18, 44, 17, 16, 40, 100, 102, 160]);
    massSupplement219.table.rows.forEach((row, i) => {
      const { f, m } = massRows219[i];
      const n = Number(fx219(m, 4).replace(",", ".")) / M(f.parts);
      expect(row[1]).toMatch(new RegExp(`= ${M(f.parts)} g/mol$`));
      expect(row[3]).toBe(`${comma(n, 4)} mol`);
      expect(row[4]).toBe(`${comma(n, 4)} Nₐ ${f.unit}`);
    });
    expect(massSupplement219.table.rows.map((r) => r[2])).toEqual(["9 g", "11 g", "8,5 g", "8 g", "10 g", "25 g", "51 g", "16 g"]);
    expect(massSupplement219.table.rows.map((r) => r[3])).toEqual(["0,5 mol", "0,25 mol", "0,5 mol", "0,5 mol", "0,25 mol", "0,25 mol", "0,5 mol", "0,1 mol"]);
    // Örnek 1: 22 g CO₂ = 0,5 mol → 0,5 × 17 = 8,5 g NH₃; atomlar 1,5 ve 2 Nₐ.
    expect(massExamples219[0].answer).toBe("8,5 g NH₃. Toplam atom sayıları eşit değildir: CO₂ 1,5 Nₐ, NH₃ 2 Nₐ atom içerir.");
    expect((22 / 44) * 17).toBe(8.5);
    // Örnek 2: 40/0,25 = 160 = 2X + 48 → X = 56.
    expect((40 / 0.25 - 3 * 16) / 2).toBe(56);
    expect(massExamples219[1].answer).toBe("X’in atom kütlesi 56; Fe = 56 ile uyumludur, X demir olabilir.");
  });

  it("recomputes every atom count and both counting examples", () => {
    const perUnit = countRows219.map(({ f }) => f.parts.reduce((s, [, k]) => s + k, 0));
    expect(perUnit).toEqual([3, 2, 3, 4, 5, 9, 3, 6]);
    const n = [0.2, 0.5, 0.5, 0.25, 0.2, 0.1, 0.5, 0.25];
    countSupplement219.table.rows.forEach((row, i) => {
      // Tam sayı ölçeğinde: atom (mol × 100) ve tane (× 10²³ × 10⁴).
      const atoms100 = Math.round(n[i] * 100) * perUnit[i];
      expect(row[2]).toBe(`${comma(n[i], 4)} mol`);
      expect(row[3]).toBe(`${perUnit[i]} × ${comma(n[i], 4)} = ${comma(atoms100 / 100, 4)} mol`);
      expect(row[4]).toBe(sci((atoms100 * 602) / 10000 * 1e23, 4, false));
    });
    expect(countSupplement219.table.rows.map((r) => r[4])).toEqual([
      "3,612 × 10²³", "6,02 × 10²³", "9,03 × 10²³", "6,02 × 10²³", "6,02 × 10²³", "5,418 × 10²³", "9,03 × 10²³", "9,03 × 10²³",
    ]);
    // Örnek 1: 0,3 × 3 = 0,9 mol atom → 0,9/5 = 0,18 mol CH₄; H 0,6 ve 0,72.
    expect(countExamples219[0].answer).toBe("0,18 mol CH₄. H atomları eşit değildir: H₂O’da 0,6 mol, CH₄’te 0,72 mol H atomu vardır.");
    expect((3 * 3) / 5).toBe(1.8);
    // Örnek 2: 24,08/6,02 = 4 mol H → 1 mol CH₄ → 5 mol atom = 30,1 × 10²³.
    expect(2408 / 602).toBe(4);
    expect(countExamples219[1].answer).toBe("1 mol CH₄; 6,02 × 10²³ C atomu; toplam 3,01 × 10²⁴ atom.");
  });

  it("recomputes isotope averages from the NIST data and both isotope examples", () => {
    const expected = { Li: 6.94, B: 10.81, Mg: 24.305, Cl: 35.45, Cu: 63.546, Br: 79.904 };
    expect(isoRows219.map(({ el }) => el)).toEqual(Object.keys(expected));
    isoSupplement219.table.rows.forEach((row, i) => {
      const r = isoRows219[i];
      const isotopes = ISOTOPES219[r.el] as readonly { a: number; mass: string; pct: string }[];
      expect(isotopes.reduce((s, { pct }) => s + Math.round(Number(pct) * 100), 0)).toBe(10000);
      const byA = isotopes.reduce((s, { a, pct }) => s + a * Number(pct), 0) / 100;
      const byMass = isotopes.reduce((s, { mass, pct }) => s + Number(mass) * Number(pct), 0) / 100;
      expect(Math.abs(byMass - expected[r.el])).toBeLessThan(0.01);
      expect(row[2]).toBe(`${comma(byA, 2, true)} u`);
      expect(row[3]).toBe(`${comma(byMass, 2, true)} u`);
      expect(Math.abs(byA - byMass)).toBeLessThan(0.1);
      expect(Math.abs(Number(row[4].replace(",", ".")) - byMass)).toBeLessThanOrEqual(0.5);
    });
    expect(isoSupplement219.table.rows.map((r) => r[3])).toEqual(["6,94 u", "10,81 u", "24,31 u", "35,45 u", "63,55 u", "79,90 u"]);
    expect(isoSupplement219.table.rows.map((r) => r[4])).toEqual(["7", "11", "24", "35,5", "64", "80"]);
    // Örnek 1: (24·79 + 25·10 + 26·11)/100 = 24,32.
    expect((24 * 79 + 25 * 10 + 26 * 11) / 100).toBe(24.32);
    expect(isoExamples219[0].answer).toBe("24,32 u; en bol izotop olan ²⁴Mg kütlesine (24 u) en yakındır.");
    // Örnek 2: (6355 − 6293)/(6493 − 6293) = 0,31.
    expect((6355 - 6293) / (6493 - 6293)).toBe(0.31);
    expect(isoExamples219[1].prompt).toContain("⁶³Cu (62,93 u) ve ⁶⁵Cu (64,93 u)");
    expect(isoExamples219[1].prompt).toContain("63,55 u");
    expect(isoExamples219[1].answer).toBe("⁶⁵Cu %31, ⁶³Cu %69.");
  });

  it("recomputes real particle masses, particles per gram and both real-mass examples", () => {
    const Ms = [1, 4, 12, 16, 18, 32, 44, 56];
    expect(realRows219.map(({ f }) => f.parts.reduce((s, [el, k]) => s + AR[el] * k, 0))).toEqual(Ms);
    realSupplement219.table.rows.forEach((row, i) => {
      const M = Ms[i];
      expect(row[1]).toBe(String(M));
      expect(row[2]).toBe(String(M));
      expect(row[3]).toBe(sci(M / 6.02e23, 2));
      expect(row[4]).toBe(sci(6.02e23 / M, 2));
      // u yolu ile Nₐ yolu binde birden az farklı.
      expect(Math.abs((M / 6.02e23) / (M * 1.6605e-24) - 1)).toBeLessThan(0.001);
    });
    expect(realSupplement219.table.rows.map((r) => r[3])).toEqual([
      "1,66 × 10⁻²⁴", "6,64 × 10⁻²⁴", "1,99 × 10⁻²³", "2,66 × 10⁻²³", "2,99 × 10⁻²³", "5,32 × 10⁻²³", "7,31 × 10⁻²³", "9,30 × 10⁻²³",
    ]);
    expect(realSupplement219.paragraphs[2]).toContain("32 × 1,6605 × 10⁻²⁴ = 5,31 × 10⁻²³ g");
    expect(sci(32 * 1.6605e-24, 2)).toBe("5,31 × 10⁻²³");
    // Örnek 1: 73062 / 16605 = 4,4 → 44 u → CO₂.
    expect(73062 / 16605).toBe(4.4);
    expect(realExamples219[0].prompt).toContain("7,3062 × 10⁻²³ g");
    expect(realExamples219[0].answer).toBe("44 u; gaz CO₂ olabilir.");
    // Örnek 2: 0,036/18 = 0,002 mol → 0,002 × 6,02 = 0,01204 × 10²³.
    expect((36 / 18) * 602).toBe(1204);
    expect(realExamples219[1].answer).toBe("1,204 × 10²¹ H₂O molekülü, 3,612 × 10²¹ atom; bir molekül yaklaşık 2,99 × 10⁻²³ g.");
    expect(sci20(18 / 6.02)).toBe("2,99");
  });

  it("recomputes every MgO row with the 3 : 2 ratio and both conservation examples", () => {
    // Onda bir gram ölçeğinde tam sayılar.
    const starts = [[60, 40], [60, 60], [120, 40], [90, 90], [150, 80], [48, 40]];
    starts.forEach(([mg, o], i) => {
      const usedMg = Math.min(mg, (o * 3) / 2);
      const usedO = (usedMg * 2) / 3;
      expect(Number.isInteger(usedMg) && Number.isInteger(usedO)).toBe(true);
      const left = mg - usedMg > 0 ? `${comma((mg - usedMg) / 10, 1)} g Mg` : o - usedO > 0 ? `${comma((o - usedO) / 10, 1)} g O` : "Artan yok";
      const row = mgoSupplement219.table.rows[i];
      expect(row).toEqual([
        `${comma(mg / 10, 1)} g`, `${comma(o / 10, 1)} g`,
        `${comma(usedMg / 10, 1)} + ${comma(usedO / 10, 1)} = ${comma((usedMg + usedO) / 10, 1)} g`,
        left,
        `${comma((usedMg + usedO) / 10, 1)} + ${comma((mg - usedMg + o - usedO) / 10, 1)} = ${comma((mg + o) / 10, 1)} g`,
      ]);
      expect(num(mgoRows219[i].after)).toBe((mg + o) / 10);
    });
    expect(24 / 16).toBe(3 / 2);
    // Örnek 1: 18 g Mg × 2/3 = 12 g O < 16 → 30 g MgO, 4 g O artar.
    expect(mgoExamples219[0].answer).toBe("30 g MgO oluşur, 4 g oksijen artar; son toplam 34 g.");
    // Örnek 2: 20 − 5 = 15 g MgO → 9 g Mg, 6 g O; başlangıç O = 11 g.
    expect([15 * 3 / 5, 15 * 2 / 5 + 5]).toEqual([9, 11]);
    expect(mgoExamples219[1].answer).toBe("Başlangıçta 9 g Mg ve 11 g oksijen vardı.");
  });

  it("formats exact rationals in Turkish", () => {
    expect(fx219(q219("35.5"))).toBe("35,5");
    expect(fx219(q219("1.075"), 2)).toBe("1,08");
    expect(sci219(q219("6.02"), 23)).toBe("6,02 × 10²³");
    expect(sci219(q219("0.166"), -23, 2)).toBe("1,66 × 10⁻²⁴");
  });
});

const num = (x: { n: bigint; d: bigint }) => Number(x.n) / Number(x.d);
const sci20 = (x: number) => comma(x, 2, true);
