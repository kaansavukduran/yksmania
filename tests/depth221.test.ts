import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  alCl221, alS221, ammoniaAttemptInventory221, ammoniaOx221, balance221, balanceExamples221, balanceRows221, balanceSupplement221,
  iceExamples221, iceReverse221, iceRows221, iceSupplement221, iceVolume221, limitExamples221, limitReverse221, limitRows221,
  limitSupplement221, methaneLimit221, mgAcidResult221, mgPair221, molarMass221, oxidationStates221, pentane221, propaneEq221,
  propaneWater221, qVal, stoichExamples221, stoichRows221, stoichSupplement221, typeExamples221, typeRows221, typeSupplement221,
} from "../src/learning/depth221";

const lessons221 = {
  "tepkimeler-denklemler": [balanceSupplement221, balanceExamples221],
  "tepkime-turleri": [typeSupplement221, typeExamples221],
  "denklemli-miktar-gecisi": [stoichSupplement221, stoichExamples221],
  "sinirlayici-artan-madde": [limitSupplement221, limitExamples221],
  "sinirlayici-bilesen": [iceSupplement221, iceExamples221],
} as const;
const sheetText = (sheet: NonNullable<ReturnType<typeof studyCheatSheet>>) => JSON.stringify(sheet);

/* Bağımsız denetim araçları: kayan noktalı sayılar yerine tamsayı ölçek. */
const EPS = 1e-9;
const near = (a: number, b: number) => Math.abs(a - b) < EPS;
// Bağımsız atom sayıcı (depth221 ayrıştırıcısını kullanmaz).
function atoms(f: string): Record<string, number> {
  const stack: Record<string, number>[] = [{}];
  const re = /([A-Z][a-z]?|\(|\))(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(f))) {
    const k = m[2] ? Number(m[2]) : 1;
    if (m[1] === "(") stack.push({});
    else if (m[1] === ")") {
      const inner = stack.pop()!;
      for (const [e, c] of Object.entries(inner)) stack.at(-1)![e] = (stack.at(-1)![e] ?? 0) + c * k;
    } else stack.at(-1)![m[1]] = (stack.at(-1)![m[1]] ?? 0) + k;
  }
  return stack[0];
}
const M: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Mg: 24, Al: 27, S: 32, Cl: 35.5 };
const mm = (f: string) => Object.entries(atoms(f)).reduce((s, [e, k]) => s + M[e] * k, 0);
/** Kaba kuvvet: 1..limit arasındaki en küçük denk tam sayı katsayıları. */
function bruteBalance(left: string[], right: string[], limit = 15): number[] {
  const all = [...left, ...right];
  const els = [...new Set(all.flatMap((f) => Object.keys(atoms(f))))];
  const n = all.length;
  // Toplamı en küçük olanı bulmak için toplam sınırını artırarak ara.
  for (let total = n; total <= n * limit; total++) {
    const found: number[][] = [];
    const go = (i: number, rest: number, acc: number[]) => {
      if (i === n - 1) {
        if (rest >= 1 && rest <= limit) {
          const c = [...acc, rest];
          if (els.every((e) => left.reduce((s, f, j) => s + c[j] * (atoms(f)[e] ?? 0), 0) === right.reduce((s, f, j) => s + c[left.length + j] * (atoms(f)[e] ?? 0), 0))) found.push(c);
        }
        return;
      }
      for (let x = 1; x <= Math.min(limit, rest - (n - 1 - i)); x++) go(i + 1, rest - x, [...acc, x]);
    };
    go(0, total, []);
    if (found.length) return found[0];
  }
  return [];
}

describe("TYT Kimya depth 0.221", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons221)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeGreaterThanOrEqual(5);
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.examples).toHaveLength(raw.examples.length + 2);
      expect(theorySupplements[id]).toEqual([added]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
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
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity|\[object/);
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|yes|limiting|reaction)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++)
        expect(JSON.stringify(figure!.draw(0, step))).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
    }
  });

  it("balances every equation to the brute-force minimum and checks each element", () => {
    const cases: [string[], string[]][] = [
      [["CH4", "O2"], ["CO2", "H2O"]], [["C3H8", "O2"], ["CO2", "H2O"]], [["C4H10", "O2"], ["CO2", "H2O"]], [["Al", "O2"], ["Al2O3"]],
      [["Al", "HCl"], ["AlCl3", "H2"]], [["Ca(OH)2", "HCl"], ["CaCl2", "H2O"]], [["Fe2O3", "CO"], ["Fe", "CO2"]],
    ];
    expect(balanceRows221.map((b) => [b.reactants.map((s) => s.f), b.products.map((s) => s.f)])).toEqual(cases);
    balanceRows221.forEach((b, i) => {
      const brute = bruteBalance(...cases[i]);
      expect(b.coeffs, cases[i].join()).toEqual(brute);
      const all = [...cases[i][0], ...cases[i][1]];
      for (const e of new Set(all.flatMap((f) => Object.keys(atoms(f))))) {
        const L = cases[i][0].reduce((s, f, j) => s + brute[j] * (atoms(f)[e] ?? 0), 0);
        const R = cases[i][1].reduce((s, f, j) => s + brute[cases[i][0].length + j] * (atoms(f)[e] ?? 0), 0);
        expect(L).toBe(R);
        expect(b.inventory.find((x) => x.el === e)!.left).toBe(L);
      }
      // Birinci formül 1: katsayı / ilk katsayı; çarpan ilk katsayıdır.
      b.unitFirst.forEach((u, j) => expect(qVal(u)).toBeCloseTo(brute[j] / brute[0], 12));
      expect(b.multiplier).toBe(brute[0]);
    });
    expect(balanceSupplement221.table.rows.map((r) => r[2])).toEqual([
      "CH₄ + 2 O₂ → CO₂ + 2 H₂O", "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O", "2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O", "4 Al + 3 O₂ → 2 Al₂O₃",
      "2 Al + 6 HCl → 2 AlCl₃ + 3 H₂", "Ca(OH)₂ + 2 HCl → CaCl₂ + 2 H₂O", "Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂",
    ]);
    expect(balanceSupplement221.table.rows[2][1]).toBe("1, 13/2, 4, 5 → ×2");
    expect(balanceSupplement221.table.rows[2][3]).toBe("C 8 · H 20 · O 26");
    expect(pentane221.coeffs).toEqual(bruteBalance(["C5H12", "O2"], ["CO2", "H2O"]));
    expect(pentane221.coeffs.reduce((a, b) => a + b)).toBe(20);
    expect(ammoniaOx221.coeffs).toEqual(bruteBalance(["NH3", "O2"], ["NO", "H2O"]));
    expect(ammoniaAttemptInventory221).toEqual([{ el: "N", left: 2, right: 2 }, { el: "H", left: 6, right: 6 }, { el: "O", left: 6, right: 5 }]);
    expect(balanceExamples221.map(({ answer }) => answer)).toEqual([
      "C₅H₁₂ + 8 O₂ → 5 CO₂ + 6 H₂O; katsayılar toplamı 20.",
      "Denk değildir (O solda 6, sağda 5). Doğrusu 4 NH₃ + 5 O₂ → 4 NO + 6 H₂O.",
    ]);
    // Yük korunumu da denetlenir: Ag⁺ + Cl⁻ → AgCl.
    expect(balance221([{ f: "Ag", charge: 1 }, { f: "Cl", charge: -1 }], [{ f: "AgCl" }]).coeffs).toEqual([1, 1, 1]);
    expect(() => balance221([{ f: "H2" }], [{ f: "H2O" }])).toThrow();
  });

  it("classifies the eight reactions axis by axis with computed oxidation states", () => {
    expect(oxidationStates221({ f: "K2SO4" })).toEqual({ K: 1, S: 6, O: -2 });
    expect(oxidationStates221({ f: "CH4" })).toEqual({ C: -4, H: 1 });
    expect(oxidationStates221({ f: "CaCO3" })).toEqual({ Ca: 2, C: 4, O: -2 });
    expect(oxidationStates221({ f: "ZnCl2" })).toEqual({ Zn: 2, Cl: -1 });
    expect(oxidationStates221({ f: "HgO" })).toEqual({ Hg: 2, O: -2 });
    const expected = [
      ["Yanma", "Redoks"], ["Yanma", "Sentez", "Redoks"], ["Ayrışma", "Redoks"], ["Sentez"], ["Asit-baz"], ["Çökelme"], ["Sentez", "Redoks"], ["Redoks"],
    ];
    expect(typeRows221.map((c) => [c.yanma, c.sentez, c.ayrisma, c.asitBaz, c.cokelme, c.redoks].flatMap((f, i) => (f ? [["Yanma", "Sentez", "Ayrışma", "Asit-baz", "Çökelme", "Redoks"][i]] : [])))).toEqual(expected);
    typeRows221.forEach((c) => {
      const L = c.eq.reactants.map((s) => s.f), R = c.eq.products.map((s) => s.f);
      expect(c.eq.coeffs).toEqual(bruteBalance(L, R));
      expect(c.yanma).toBe(L.includes("O2"));
    });
    expect(typeSupplement221.table.rows.map((r) => r[0])).toEqual([
      "CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(s)", "2 H₂(g) + O₂(g) → 2 H₂O(s)", "2 HgO(k) → 2 Hg(s) + O₂(g)", "CaO(k) + CO₂(g) → CaCO₃(k)",
      "H₂SO₄(suda) + 2 KOH(suda) → K₂SO₄(suda) + 2 H₂O(s)", "CaCl₂(suda) + Na₂CO₃(suda) → CaCO₃(k) + 2 NaCl(suda)",
      "2 Na(k) + Cl₂(g) → 2 NaCl(k)", "Zn(k) + 2 HCl(suda) → ZnCl₂(suda) + H₂(g)",
    ]);
    expect(typeSupplement221.table.rows[0][4]).toBe("Redoks: C −4 → +4; O 0 → −2");
    expect(typeSupplement221.table.rows[2][1]).toBe("Hayır, O₂ üründür");
    expect(typeSupplement221.table.rows[7][4]).toBe("Redoks: Zn 0 → +2; H +1 → 0");
    expect(alCl221.eq.coeffs).toEqual([2, 3, 2]);
    expect([alCl221.yanma, alCl221.sentez, alCl221.redoks]).toEqual([false, true, true]);
    expect(mgPair221.map((c) => [c.redoks, c.asitBaz])).toEqual([[true, false], [false, true]]);
    expect(typeExamples221.map(({ answer }) => answer)).toEqual([
      "Yanma değildir; sentezdir; redokstur (Al 0 → +3; Cl 0 → −1).",
      "I redokstur (asit-baz değil); II asit-baz (nötrleşme) tepkimesidir (redoks değil).",
    ]);
  });

  it("recomputes every propane row and both stoichiometry examples", () => {
    expect(propaneEq221.coeffs).toEqual(bruteBalance(["C3H8", "O2"], ["CO2", "H2O"]));
    const nu = [1, 5, 3, 4];
    const Ms = ["C3H8", "O2", "CO2", "H2O"].map(mm);
    expect(Ms).toEqual([44, 32, 44, 18]);
    const given: [number, number][] = [[0, 4.4 / 44], [1, 8 / 32], [2, 13.44 / 22.4], [3, 10.8 / 18], [0, 1.806 / 6.02], [1, 4.48 / 22.4]];
    stoichRows221.forEach((r, i) => {
      const [s, n] = given[i];
      expect(r.input.species).toBe(s);
      const xi = n / nu[s];
      r.mol.forEach((x, j) => expect(qVal(x)).toBeCloseTo(xi * nu[j], 12));
      r.mass.forEach((x, j) => expect(qVal(x)).toBeCloseTo(xi * nu[j] * Ms[j], 10));
      expect(qVal(r.mass[0]) + qVal(r.mass[1])).toBeCloseTo(qVal(r.mass[2]) + qVal(r.mass[3]), 10);
    });
    expect(stoichSupplement221.table.rows).toEqual([
      ["4,4 g C₃H₈", "0,1 mol · 4,4 g", "0,5 mol · 16 g", "0,3 mol · NK’de 6,72 L", "0,4 mol · 7,2 g"],
      ["8 g O₂", "0,05 mol · 2,2 g", "0,25 mol · 8 g", "0,15 mol · NK’de 3,36 L", "0,2 mol · 3,6 g"],
      ["NK’de 13,44 L CO₂", "0,2 mol · 8,8 g", "1 mol · 32 g", "0,6 mol · NK’de 13,44 L", "0,8 mol · 14,4 g"],
      ["10,8 g H₂O", "0,15 mol · 6,6 g", "0,75 mol · 24 g", "0,45 mol · NK’de 10,08 L", "0,6 mol · 10,8 g"],
      ["1,806 × 10²³ C₃H₈ molekülü", "0,3 mol · 13,2 g", "1,5 mol · 48 g", "0,9 mol · NK’de 20,16 L", "1,2 mol · 21,6 g"],
      ["NK’de 4,48 L O₂", "0,04 mol · 1,76 g", "0,2 mol · 6,4 g", "0,12 mol · NK’de 2,688 L", "0,16 mol · 2,88 g"],
    ]);
    // Mg + 2 HCl → MgCl₂ + H₂, 4,8 g Mg.
    const mg = 4.8 / 24;
    expect(qVal(mgAcidResult221.h2L)).toBeCloseTo(mg * 22.4, 12);
    expect(qVal(mgAcidResult221.h2Particles)).toBeCloseTo(mg * 6.02, 12);
    expect(qVal(mgAcidResult221.hclMass)).toBeCloseTo(2 * mg * 36.5, 12);
    expect(qVal(molarMass221("MgCl2"))).toBe(95);
    // 9,6 g O₂ → su ve H atomu.
    const o2 = 9.6 / 32;
    expect(qVal(propaneWater221.h2oMass)).toBeCloseTo((o2 * 4 / 5) * 18, 12);
    expect(qVal(propaneWater221.hAtoms)).toBeCloseTo((o2 * 4 / 5) * 2 * 6.02, 12);
    expect(stoichExamples221.map(({ answer }) => answer)).toEqual([
      "NK’de 4,48 L H₂, 1,204 × 10²³ molekül; 14,6 g HCl harcanır.",
      "4,32 g H₂O; 2,8896 × 10²³ H atomu.",
    ]);
  });

  it("recomputes every Al₂S₃ mixture by mole capacities and both limiting examples", () => {
    expect(alS221.coeffs).toEqual(bruteBalance(["Al", "S"], ["Al2S3"]));
    const starts: [number, number][] = [[5.4, 9.6], [10.8, 9.6], [2.7, 9.6], [12, 12], [10.8, 16]];
    limitRows221.forEach((r, i) => {
      const [al, s] = starts[i];
      const ca = al / 27 / 2, cs = s / 32 / 3, xi = Math.min(ca, cs);
      expect(qVal(r.alCap)).toBeCloseTo(ca, 12);
      expect(qVal(r.sCap)).toBeCloseTo(cs, 12);
      expect(r.limiting).toBe(near(ca, cs) ? "ikisi" : ca < cs ? "Al" : "S");
      expect(qVal(r.product)).toBeCloseTo(xi * 150, 10);
      expect(qVal(r.alLeft)).toBeCloseTo(al - xi * 54, 10);
      expect(qVal(r.sLeft)).toBeCloseTo(s - xi * 96, 10);
    });
    expect(limitSupplement221.table.rows).toEqual([
      ["5,4 g; 9,6 g", "0,1; 0,1", "İkisi birlikte biter", "15 g", "Artan yok"],
      ["10,8 g; 9,6 g", "0,2; 0,1", "S", "15 g", "5,4 g Al"],
      ["2,7 g; 9,6 g", "0,05; 0,1", "Al", "7,5 g", "4,8 g S"],
      ["12 g; 12 g", "2/9; 0,125", "S", "18,75 g", "5,25 g Al"],
      ["10,8 g; 16 g", "0,2; 1/6", "S", "25 g", "1,8 g Al"],
    ]);
    expect(qVal(limitReverse221.alStart)).toBeCloseTo(15 / 150 * 54 + 2.7, 12);
    expect(qVal(limitReverse221.sStart)).toBeCloseTo(15 / 150 * 96, 12);
    const ch4 = 8 / 16, o2 = 40 / 32, xi = Math.min(ch4 / 1, o2 / 2);
    expect(qVal(methaneLimit221.xi)).toBe(xi);
    expect([qVal(methaneLimit221.used[2]), qVal(methaneLimit221.used[3]), qVal(methaneLimit221.o2Left)]).toEqual([xi * 44, 2 * xi * 18, 40 - 2 * xi * 32]);
    expect(limitExamples221.map(({ answer }) => answer)).toEqual([
      "8,1 g Al ve 9,6 g S.",
      "CH₄ sınırlayıcıdır; 22 g CO₂ ve 18 g H₂O oluşur, 8 g O₂ artar.",
    ]);
  });

  it("recomputes every SO₂/O₂ start by n/ν and both limiting-component examples", () => {
    const starts = [[4, 1, 0], [3, 2, 0], [3, 1.5, 0], [2, 2, 1], [0, 2, 1], [1, 0.25, 0]];
    iceRows221.forEach((r, i) => {
      const [a, b, c] = starts[i];
      const xi = Math.min(a / 2, b / 1);
      expect(qVal(r.xi)).toBe(xi);
      expect(r.end.map(qVal)).toEqual([a - 2 * xi, b - xi, c + 2 * xi]);
      expect(qVal(r.totalEnd)).toBe(a + b + c - xi);
      // S ve O atomları korunur.
      expect(a + c).toBe(qVal(r.end[0]) + qVal(r.end[2]));
      expect(2 * a + 2 * b + 3 * c).toBe(2 * qVal(r.end[0]) + 2 * qVal(r.end[1]) + 3 * qVal(r.end[2]));
    });
    expect(iceSupplement221.table.rows.map((r) => r[2])).toEqual([
      "ξ = 1 · O₂", "ξ = 1,5 · SO₂", "ξ = 1,5 · Birlikte biter", "ξ = 1 · SO₂", "ξ = 0 · SO₂ yok", "ξ = 0,25 · O₂",
    ]);
    expect(iceVolume221.end.map(qVal)).toEqual([0, 3, 10]);
    expect(qVal(iceReverse221.so2Start)).toBeCloseTo(2 * (1.3 - 0.5) / 2, 12);
    expect(qVal(iceReverse221.o2Start)).toBeCloseTo(0.2 + (1.3 - 0.5) / 2, 12);
    expect(qVal(iceReverse221.massStart)).toBeCloseTo(0.8 * 64 + 0.6 * 32 + 0.5 * 80, 10);
    expect(qVal(iceReverse221.massEnd)).toBeCloseTo(1.3 * 80 + 0.2 * 32, 10);
    expect(iceExamples221.map(({ answer }) => answer)).toEqual([
      "SO₂ sınırlayıcıdır; son karışım 3 L O₂ ve 10 L SO₃, toplam 13 L.",
      "0,8 mol SO₂ ve 0,6 mol O₂.",
    ]);
  });

  it("builds figure labels and readouts from the table data", () => {
    const frame = (id: string, title: string, step: number) => sectionFigures[id][title].draw(0, step);
    const labels = (f: ReturnType<typeof frame>) => f.els.flatMap((el) => (el.k === "text" ? [el.s] : []));
    balanceRows221.forEach((b, step) => {
      const f = frame("tepkimeler-denklemler", balanceSupplement221.title, step);
      expect(f.readout![1]).toContain(balanceSupplement221.table.rows[step][2]);
      for (const { el, left } of b.inventory) expect(labels(f)).toEqual(expect.arrayContaining([el, String(left)]));
    });
    typeRows221.forEach((c, step) => {
      const f = frame("tepkime-turleri", typeSupplement221.title, step);
      expect(f.readout![0]).toBe(typeSupplement221.table.rows[step][0]);
      expect(labels(f).filter((s) => s === "evet")).toHaveLength([c.yanma, c.sentez, c.ayrisma, c.asitBaz, c.cokelme, c.redoks].filter(Boolean).length);
    });
    stoichRows221.forEach((r, step) => {
      const f = frame("denklemli-miktar-gecisi", stoichSupplement221.title, step);
      const cells = stoichSupplement221.table.rows[step];
      expect(labels(f)).toEqual(expect.arrayContaining([cells[1].split(" mol")[0], cells[2].split(" mol")[0], cells[3].split(" mol")[0], cells[4].split(" mol")[0], "sıvı"]));
      expect(f.readout![0]).toContain(r.input.text);
    });
    limitRows221.forEach((r, step) => {
      const f = frame("sinirlayici-artan-madde", limitSupplement221.title, step);
      expect(labels(f)).toContain(`${limitSupplement221.table.rows[step][3]} ürün`);
      expect(f.readout![1]).toContain(limitSupplement221.table.rows[step][3].replace(" g", ""));
      expect(qVal(r.product)).toBe(qVal(r.alUsed) + qVal(r.sUsed));
    });
    iceRows221.forEach((_, step) => {
      const f = frame("sinirlayici-bilesen", iceSupplement221.title, step);
      expect(f.readout![2]).toContain(iceSupplement221.table.rows[step][4]);
    });
  });
});
