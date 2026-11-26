import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { depthFigures222 } from "../src/learning/sectionFigures/depthFigures222";
import {
  ATOMIC_MASS222, mixExamples222, mixSupplement222, molar222, multipleExamples222, multipleSupplement222, purityExamples222,
  puritySupplement222, solidExamples222, solidSupplement222, yieldExamples222, yieldSupplement222,
} from "../src/learning/depth222";

/* Kabul edilmiş rehberlerin bu turdan önceki biçimi (elle yazılmış). */
const RAW = {
  "yuzde-verim": { sections: 8, examples: ["Doğrudan oran", "Sınırlayıcıdan teoriye", "Saflık ve verim", "Tutarsız ölçüm"], first: "Teorik ve gerçek aynı ürünü anlatmalı" },
  "safsizlik-problemleri": { sections: 8, examples: ["Etkin kütleyi ayır", "Gazdan saflığa", "Verimli ters problem", "Gereken numune"], first: "Numune bütün, saf kısım paydır" },
  "tepkimeli-karisim": { sections: 8, examples: ["Seçici metal", "İki hidrokarbon", "Eksik veri", "Olamayan ölçüm"], first: "Bir karışımın her bileşenine ayrı satır" },
  "katli-oranlar": { sections: 9, examples: ["Eşit karbon temelinde", "Eşit oksijen temelinde", "Verilen kütleler farklıysa", "Farklı molekül ama aynı basit bileşim"], first: "Aynı iki element, farklı bileşim" },
  "kati-kutlesi-degisimi": { sections: 8, examples: ["Mg'de katı artışı", "Yarım indirgenme", "İnertli oksit", "Artıştan ilk metale"], first: "Terazinin kapsamı ilk denklemindir" },
} as const;

const added = [
  ["yuzde-verim", yieldSupplement222, yieldExamples222],
  ["safsizlik-problemleri", puritySupplement222, purityExamples222],
  ["tepkimeli-karisim", mixSupplement222, mixExamples222],
  ["katli-oranlar", multipleSupplement222, multipleExamples222],
  ["kati-kutlesi-degisimi", solidSupplement222, solidExamples222],
] as const;

/* ---------- Bağımsız kesin kesirler ve yazım ---------- */
type F = readonly [number, number];
const g = (a: number, b: number): number => (b === 0 ? Math.abs(a) : g(b, a % b));
const f = (n: number, d = 1): F => { const k = g(n, d) * Math.sign(d); return [n / k, d / k]; };
const add = (a: F, b: F) => f(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const sub = (a: F, b: F) => f(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const mul = (a: F, b: F) => f(a[0] * b[0], a[1] * b[1]);
const div = (a: F, b: F) => f(a[0] * b[1], a[1] * b[0]);
const lt = (a: F, b: F) => a[0] * b[1] < b[0] * a[1];
const eq = (a: F, b: F) => a[0] === b[0] && a[1] === b[1];
/** Ondalık metni kesre çevirir: "30,6" → 153/5. */
const d = (s: string): F => { const [i, fr = ""] = s.replace("−", "-").split(","); return f(Number(i + fr), 10 ** fr.length); };
/** Kesrin Türkçe ondalık yazımı (paydası yalnız 2 ve 5 içermeli). */
const tr = (x: F) => {
  let q = x[1];
  for (const p of [2, 5]) while (q % p === 0) q /= p;
  expect(q, `${x[0]}/${x[1]} sonlu ondalık olmalı`).toBe(1);
  return String(Number((x[0] / x[1]).toFixed(8))).replace(".", ",").replace("-", "−");
};

/* Elle yazılmış mol kütleleri (H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Ca 40, Fe 56, Cu 64, Zn 65). */
const MM: Record<string, number> = {
  "NH₃": 17, "H₂": 2, "O₂": 32, Mg: 24, MgO: 40, "CaCO₃": 100, CaO: 56, "CO₂": 44, "MgCO₃": 84, Fe: 56, Zn: 65, Al: 27, Cu: 64,
  "CH₄": 16, "C₂H₆": 30, "NaHCO₃": 84, "Na₂CO₃": 106, "H₂O": 18, CuO: 80, "Fe₂O₃": 160, "Al₂O₃": 102, S: 32, O: 16, N: 14,
};

describe("TYT Kimya hesaplama derinleştirmesi 0.222.0", () => {
  it("keeps the accepted guides and appends one table section with two examples", () => {
    for (const [id, supplement, examples] of added) {
      const raw = lessonGuides.get(id)!;
      expect(raw, id).toBeDefined();
      expect(raw.sections).toHaveLength(RAW[id].sections);
      expect(raw.sections[0].title).toBe(RAW[id].first);
      expect(raw.examples.map(({ title }) => title)).toEqual(RAW[id].examples);
      expect(raw.sections.some(({ title }) => title === supplement.title)).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title))).toBe(false);
      const shown = studyGuide(id)!;
      expect(shown.sections).toHaveLength(RAW[id].sections + 1);
      expect(shown.sections.slice(0, -1).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(supplement.title);
      expect(last.figureTitle).toBe(supplement.title);
      expect(supplement.figureTitle).toBe(supplement.title);
      expect(last.paragraphs).toEqual(supplement.paragraphs);
      expect(last.table).toBe(supplement.table);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      for (const row of last.table!.rows) expect(row).toHaveLength(last.table!.headers.length);
      expect(shown.examples.slice(0, -2)).toEqual(raw.examples);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(theorySupplements[id]).toEqual([supplement]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const section = sheet.sections.at(-1)!;
      expect(section.title).toBe(supplement.title);
      expect(section.table).toBe(supplement.table);
      expect(section.text).toEqual([supplement.summary]);
      expect(section.figureTitle).toBe(supplement.figureTitle);
      expect(supplement.summary.length).toBeLessThan(330);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length, `${id} ${key}`).toBeGreaterThan(5);
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.steps.every(({ label, explanation }) => label && explanation)).toBe(true);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity/);
      }
      expect(JSON.stringify(supplement)).not.toMatch(/undefined|NaN|null|Infinity/);
    }
  });

  it("registers a drawable figure for every new section and keeps the older ones", () => {
    for (const [id, supplement] of added) {
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const def = sectionFigures[id][supplement.figureTitle];
      expect(def, id).toBe(depthFigures222[id][supplement.title]);
      expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
      for (let step = 0; step < (def.steps?.length ?? 1); step++) {
        const frame = def.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
      expect(JSON.stringify([def.caption, def.alt, def.steps])).not.toMatch(/NaN|undefined/);
      expect(renderToStaticMarkup(createElement(SectionFigureView, { def, title: supplement.figureTitle }))).toContain('role="img"');
    }
    expect(sectionFigures["yuzde-verim"][yieldSupplement222.title].steps).toHaveLength(yieldSupplement222.table.rows.length);
    expect(sectionFigures["kati-kutlesi-degisimi"][solidSupplement222.title].steps).toHaveLength(solidSupplement222.table.rows.length);
  });

  it("uses one rounded atomic-mass constant for every molar mass", () => {
    expect(ATOMIC_MASS222).toEqual({ H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Ca: 40, Fe: 56, Cu: 64, Zn: 65 });
    for (const [formula, m] of Object.entries(MM)) expect(molar222(formula), formula).toBe(m);
  });

  it("recomputes every yield row", () => {
    const runs: [string, string, string, string][] = [["A", "1", "3", "30,6"], ["B", "2", "3", "17"], ["C", "1", "6", "25,5"], ["D", "0,5", "3", "13,6"], ["E", "3", "6", "40,8"], ["F", "1,5", "6", "51"]];
    const rows = yieldSupplement222.table.rows;
    expect(rows).toHaveLength(runs.length);
    runs.forEach(([label, n2, h2, actual], i) => {
      const capN = d(n2);
      const capH = div(d(h2), f(3));
      const xi = lt(capH, capN) ? capH : capN;
      const theory = mul(mul(f(2), xi), f(17));
      const limiter = eq(capN, capH) ? "Tam oranlı" : lt(capN, capH) ? "N₂" : "H₂";
      expect(rows[i]).toEqual([`${label}: ${n2} / ${h2}`, limiter, tr(theory), actual, `%${tr(mul(div(d(actual), theory), f(100)))}`]);
    });
    expect(rows.map((r) => r[4])).toEqual(["%90", "%50", "%75", "%80", "%60", "%100"]);
  });

  it("recomputes the yield examples", () => {
    // 34 g gerçek, %80 ⇒ 42,5 g kuramsal ⇒ 2,5 mol NH₃ ⇒ 3,75 mol H₂ ⇒ 7,5 g.
    const theory = div(f(34), f(4, 5));
    const h2 = mul(mul(div(theory, f(17)), f(3, 2)), f(2));
    expect(tr(theory)).toBe("42,5");
    expect(yieldExamples222[0].answer).toBe(`${tr(h2)} g H₂`);
    expect(tr(h2)).toBe("7,5");
    // 7,2 g Mg (0,3 mol), 3,2 g O₂ (0,1 mol): O₂ sınırlayıcı, 8 g MgO, 6/8 = %75.
    const nMg = div(d("7,2"), f(24));
    const nO2 = div(d("3,2"), f(32));
    expect(lt(nO2, div(nMg, f(2)))).toBe(true);
    const mgo = mul(mul(f(2), nO2), f(40));
    expect(yieldExamples222[1].answer).toBe(`%${tr(mul(div(f(6), mgo), f(100)))} (O₂ sınırlayıcı, kuramsal ${tr(mgo)} g MgO)`);
    expect(yieldExamples222[1].answer).toBe("%75 (O₂ sınırlayıcı, kuramsal 8 g MgO)");
  });

  it("recomputes every purity row", () => {
    const cases: [string, string, number, number, string, string, string][] = [
      ["CaCO₃ → CaO + CO₂", "CaCO₃", 1, 1, "25", "8,8", "CO₂"],
      ["MgCO₃ → MgO + CO₂", "MgCO₃", 1, 1, "24", "8,8", "CO₂"],
      ["Mg + 2 HCl → MgCl₂ + H₂", "Mg", 1, 1, "8", "0,4", "H₂"],
      ["Fe + 2 HCl → FeCl₂ + H₂", "Fe", 1, 1, "16", "0,4", "H₂"],
      ["Zn + 2 HCl → ZnCl₂ + H₂", "Zn", 1, 1, "20", "0,4", "H₂"],
      ["2 Al + 6 HCl → 2 AlCl₃ + 3 H₂", "Al", 2, 3, "6", "0,6", "H₂"],
    ];
    const rows = puritySupplement222.table.rows;
    expect(rows).toHaveLength(cases.length);
    cases.forEach(([eqn, r, a, b, sample, gas, gName], i) => {
      const nGas = div(d(gas), f(MM[gName]));
      const nR = mul(nGas, f(a, b));
      const pure = mul(nR, f(MM[r]));
      expect(lt(pure, d(sample))).toBe(true);
      expect(rows[i]).toEqual([eqn, sample, `${gas} g ${gName} = ${tr(nGas)} mol`, `${tr(nR)} mol ${r} = ${tr(pure)} g`, `%${tr(mul(div(pure, d(sample)), f(100)))}`]);
    });
    expect(rows.map((r) => r[4])).toEqual(["%80", "%70", "%60", "%70", "%65", "%90"]);
  });

  it("recomputes the purity examples", () => {
    // 0,4 mol H₂ ⇒ 26 g Zn ⇒ 26/0,8 = 32,5 g numune, 6,5 g Cu.
    const zn = mul(d("0,4"), f(65));
    const sample = div(zn, f(4, 5));
    expect(purityExamples222[0].answer).toBe(`${tr(sample)} g numune (${tr(zn)} g Zn, ${tr(sub(sample, zn))} g Cu)`);
    // 50 g → 36,8 g: 13,2 g CO₂ = 0,3 mol ⇒ 30 g CaCO₃ ⇒ %60; kalıntı 16,8 g CaO + 20 g inert.
    const n = div(sub(f(50), d("36,8")), f(44));
    const caco3 = mul(n, f(100));
    expect(purityExamples222[1].answer).toBe(`Numune kütlece %${tr(mul(div(caco3, f(50)), f(100)))} CaCO₃ içerir`);
    expect(eq(add(mul(n, f(56)), sub(f(50), caco3)), d("36,8"))).toBe(true);
  });

  it("solves every reacting-mixture row and checks it in both equations", () => {
    // [kütle, gaz molü, M1, M2, gaz/mol 1, gaz/mol 2, ad1, ad2]
    const cases: [string, string, number, number, F, F, string, string][] = [
      ["10", "0,3", 24, 64, f(1), f(0), "Mg", "Cu"],
      ["20", "0,2", 65, 64, f(1), f(0), "Zn", "Cu"],
      ["7,8", "0,4", 24, 27, f(1), f(3, 2), "Mg", "Al"],
      ["11,3", "0,3", 24, 65, f(1), f(1), "Mg", "Zn"],
      ["18,4", "0,2", 100, 84, f(1), f(1), "CaCO₃", "MgCO₃"],
      ["7,6", "0,5", 16, 30, f(1), f(2), "CH₄", "C₂H₆"],
    ];
    const rows = mixSupplement222.table.rows;
    expect(rows).toHaveLength(cases.length);
    cases.forEach(([m, gas, M1, M2, g1, g2, a, b], i) => {
      // Cramer: M1 x + M2 y = m, g1 x + g2 y = gas.
      const det = sub(mul(f(M1), g2), mul(g1, f(M2)));
      const x = div(sub(mul(d(m), g2), mul(d(gas), f(M2))), det);
      const y = div(sub(mul(f(M1), d(gas)), mul(g1, d(m))), det);
      expect(lt(x, f(0)) || lt(y, f(0))).toBe(false);
      expect(eq(add(mul(x, f(M1)), mul(y, f(M2))), d(m))).toBe(true);
      expect(eq(add(mul(x, g1), mul(y, g2)), d(gas))).toBe(true);
      expect(rows[i][1]).toBe(`${m} g; ${gas} mol ${a === "Mg" || a === "Zn" ? "H₂" : "CO₂"}`);
      expect(rows[i][3]).toBe(`${a}: ${tr(x)} mol = ${tr(mul(x, f(M1)))} g`);
      expect(rows[i][4]).toBe(g2[0] === 0 ? `${b}: ${tr(mul(y, f(M2)))} g (gaz vermez)` : `${b}: ${tr(y)} mol = ${tr(mul(y, f(M2)))} g`);
    });
    expect(rows[2][2]).toBe("24x + 27y = 7,8; x + 1,5y = 0,4");
    expect(rows[0][2]).toBe("24x + 64y = 10; x = 0,3");
  });

  it("recomputes the reacting-mixture examples", () => {
    // Mg/Al 5,1 g, 0,25 mol H₂ ⇒ x = y = 0,1; HCl 2x + 3y = 0,5.
    const y = div(sub(d("5,1"), mul(f(24), d("0,25"))), sub(f(27), mul(f(24), f(3, 2))));
    const x = sub(d("0,25"), mul(f(3, 2), y));
    expect(mixExamples222[0].answer).toBe(`${tr(mul(x, f(24)))} g Mg, ${tr(mul(y, f(27)))} g Al; ${tr(add(mul(f(2), x), mul(f(3), y)))} mol HCl`);
    // CaCO₃/MgCO₃ 20 g, 0,22 mol: aralık 0,2–20/84; x = 0,095, y = 0,125.
    expect(lt(f(20, 100), d("0,22")) && lt(d("0,22"), f(20, 84))).toBe(true);
    const xc = div(sub(f(20), mul(f(84), d("0,22"))), f(16));
    const yc = sub(d("0,22"), xc);
    expect(mixExamples222[1].answer).toBe(`Olasıdır: ${tr(mul(xc, f(100)))} g CaCO₃ ve ${tr(mul(yc, f(84)))} g MgCO₃`);
  });

  it("derives the multiple-proportion series from the formulas", () => {
    const series: [string, number, [string, number, number][]][] = [
      ["N", 14, [["N₂O", 2, 1], ["NO", 1, 1], ["N₂O₃", 2, 3], ["NO₂", 1, 2], ["N₂O₅", 2, 5]]],
      ["Fe", 56, [["FeO", 1, 1], ["Fe₃O₄", 3, 4], ["Fe₂O₃", 2, 3]]],
    ];
    const expected: string[][] = [];
    for (const [el, mass, list] of series) {
      const L = list.reduce((m, [, e]) => (m * e) / g(m, e), 1);
      const oxygen = list.map(([, e, o]) => (o * L) / e);
      const k = oxygen.reduce((a, b) => g(a, b), 0);
      list.forEach(([formula, e, o], i) => {
        const r = f(e * mass, o * 16);
        expected.push([formula, `${r[0]} : ${r[1]}`, `${L * mass} g ${el}’ye ${oxygen[i] * 16} g`, String(oxygen[i] / k)]);
      });
    }
    expect(multipleSupplement222.table.rows).toEqual(expected);
    expect(expected.map((r) => r[3]).join(" ")).toBe("1 2 3 4 5 6 8 9");
    // Örnekler: 8 g S/8 g O ve 4 g S/6 g O ⇒ 2/3, SO₂ ve SO₃; NO ve 5/2 kat ⇒ N₂O₅, 7 g N’ye 20 g O.
    const ratio = div(f(8), mul(f(6), div(f(8), f(4))));
    expect(multipleExamples222[0].answer).toBe(`(a) ${ratio[0]}/${ratio[1]} (b) I: SO₂, II: SO₃ (basit formül)`);
    expect(eq(div(div(f(8), f(16)), div(f(8), f(32))), f(2)) && eq(div(div(f(6), f(16)), div(f(4), f(32))), f(3))).toBe(true);
    const oPerN = mul(f(1), f(5, 2));
    expect(oPerN).toEqual([5, 2]);
    expect(multipleExamples222[1].answer).toBe(`N₂O₅ (basit formül); 7 g N’ye ${tr(mul(mul(div(f(7), f(14)), f(16)), f(5, 2)))} g O`);
  });

  it("recomputes every solid-mass row from conservation", () => {
    // [tepkime, giren katı ve katsayısı, ürün katılar, giren gaz, çıkan gaz]
    const cases: [string, [string, number], [string, number][], [string, number][], [string, number][]][] = [
      ["CaCO₃ → CaO + CO₂", ["CaCO₃", 1], [["CaO", 1]], [], [["CO₂", 1]]],
      ["MgCO₃ → MgO + CO₂", ["MgCO₃", 1], [["MgO", 1]], [], [["CO₂", 1]]],
      ["2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂", ["NaHCO₃", 2], [["Na₂CO₃", 1]], [], [["H₂O", 1], ["CO₂", 1]]],
      ["CuO + H₂ → Cu + H₂O", ["CuO", 1], [["Cu", 1]], [["H₂", 1]], [["H₂O", 1]]],
      ["2 Mg + O₂ → 2 MgO", ["Mg", 2], [["MgO", 2]], [["O₂", 1]], []],
      ["2 Cu + O₂ → 2 CuO", ["Cu", 2], [["CuO", 2]], [["O₂", 1]], []],
      ["4 Fe + 3 O₂ → 2 Fe₂O₃", ["Fe", 4], [["Fe₂O₃", 2]], [["O₂", 3]], []],
      ["4 Al + 3 O₂ → 2 Al₂O₃", ["Al", 4], [["Al₂O₃", 2]], [["O₂", 3]], []],
    ];
    const rows = solidSupplement222.table.rows;
    expect(rows).toHaveLength(cases.length);
    cases.forEach(([eqn, [solid, k], products, ins, outs], i) => {
      const per = (c: number) => f(c, k);
      const sum = (xs: [string, number][]) => xs.reduce((s, [ff, c]) => add(s, mul(per(c), f(MM[ff]))), f(0));
      const end = sum(products);
      const change = sub(end, f(MM[solid]));
      expect(eq(change, sub(sum(ins), sum(outs)))).toBe(true);
      expect(rows[i].slice(0, 4)).toEqual([eqn, `${MM[solid]} g ${solid}`, tr(end), (change[0] > 0 ? "+" : "") + tr(change)]);
    });
    expect(rows.map((r) => r[3])).toEqual(["−44", "−44", "−31", "−16", "+16", "+16", "+24", "+24"]);
    expect(rows[3][4]).toBe("2 g H₂ girer; 18 g H₂O çıkar");
    expect(rows[2][4]).toBe("9 g H₂O + 22 g CO₂ çıkar");
  });

  it("recomputes the solid-mass examples", () => {
    // 60 g (30 g CaCO₃) → 53,4 g: 6,6 g CO₂ = 0,15 mol ⇒ 15 g ayrışır ⇒ %50.
    const n = div(sub(f(60), d("53,4")), f(44));
    const reacted = mul(n, f(100));
    expect(solidExamples222[0].answer).toBe(`%${tr(mul(div(reacted, f(30)), f(100)))}; kalıntı ${tr(mul(n, f(56)))} g CaO, ${tr(sub(f(30), reacted))} g CaCO₃ ve 30 g inert`);
    // 8,8 g Mg/Cu → 12 g oksit: 0,2 mol O; x + y = 0,2, 24x + 64y = 8,8 ⇒ y = 0,1, x = 0,1.
    const nO = div(sub(f(12), d("8,8")), f(16));
    const y = div(sub(d("8,8"), mul(f(24), nO)), f(40));
    const x = sub(nO, y);
    expect(solidExamples222[1].answer).toBe(`${tr(mul(x, f(24)))} g Mg ve ${tr(mul(y, f(64)))} g Cu`);
    expect(eq(add(mul(x, f(40)), mul(y, f(80))), f(12))).toBe(true);
  });
});
