import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { depthFigures220 } from "../src/learning/sectionFigures/depthFigures220";
import { PAULING_EN209 } from "../src/learning/depth209";
import {
  LEWIS220, bondRows220, bondTypeExamples220, bondTypeSupplement220, covalentNameExamples220, covalentNameSupplement220, covalentSet220,
  hbondCountExamples220, hbondCountSupplement220, hbondRows220, interactions220, ionCharge220, nameGridExamples220, nameGridSupplement220,
  saltGrid220, weakExamples220, weakRows220, weakSupplement220,
} from "../src/learning/depth220";

const lessons220 = {
  "iyonik-bag-ve-guclu-etkilesimler": [bondTypeSupplement220, bondTypeExamples220],
  "iyonik-bilesik-adlandirma": [nameGridSupplement220, nameGridExamples220],
  "kovalent-adlandirma-metalik-bag": [covalentNameSupplement220, covalentNameExamples220],
  "zayif-etkilesimler": [weakSupplement220, weakExamples220],
  "hidrojen-bagi": [hbondCountSupplement220, hbondCountExamples220],
} as const;

/* Bağımsız denetim için elle yazılmış değerler. */
const Z: Record<string, number> = { H: 1, C: 6, N: 7, O: 8, F: 9, Na: 11, Mg: 12, Al: 13, P: 15, S: 16, Cl: 17, K: 19, Ca: 20 };
const VALENCE: Record<string, number> = { H: 1, C: 4, N: 5, O: 6, F: 7, Si: 4, P: 5, S: 6, Cl: 7 };
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const subs = (s: string) => s.replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080));
/** Formül metninden atom sayıları (parantez desteğiyle). */
const countAtoms = (formula: string) => {
  const f = subs(formula);
  const out: Record<string, number> = {};
  const re = /\(([^)]+)\)(\d*)|([A-Z][a-z]?)(\d*)/g;
  for (const m of f.matchAll(re)) {
    if (m[1]) {
      const k = Number(m[2] || 1);
      for (const [el, n] of Object.entries(countAtoms(m[1]))) out[el] = (out[el] ?? 0) + n * k;
    } else out[m[3]] = (out[m[3]] ?? 0) + Number(m[4] || 1);
  }
  return out;
};

describe("TYT Kimya bağ ve etkileşim derinleştirmesi 0.220", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons220)) {
      const raw = lessonGuides.get(id)!;
      expect(raw, id).toBeDefined();
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
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      const revised = studyGuideWithSourceRevisions(id)!;
      expect(shown.examples.slice(0, -2)).toEqual(revised.examples);
      expect(shown.sections.slice(0, -1)).toEqual(revised.sections);
      expect(revised.examples.map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(added.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(added.summary.length).toBeLessThan(330);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length, `${id} ${key}`).toBeGreaterThan(5);
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.steps.every(({ label, explanation }) => label && explanation)).toBe(true);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav|undefined|\bNaN\b/i);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|\bNaN\b|null|\[object/);
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBe(depthFigures220[id][added.title]);
      for (let step = 0; step < (figure!.steps?.length ?? 1); step++) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the earlier section figures of the five lessons", () => {
    for (const id of Object.keys(lessons220)) expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
  });

  it("recomputes bond types, ΔEN and formulas of the ionic-bond table", () => {
    const metals = new Set(["Na", "Mg", "Al", "K", "Ca"]);
    const charge = (s: string) => {
      const a = VALENCE[s] ?? (Z[s] === 11 || Z[s] === 19 ? 1 : Z[s] === 12 || Z[s] === 20 ? 2 : 3);
      return metals.has(s) ? a : -(8 - a);
    };
    const expectedRows = [
      ["Na–Cl", "metal–ametal", "2,23", "İyonik", "NaCl (Na⁺ ve Cl⁻ örgüsü)"],
      ["Mg–O", "metal–ametal", "2,13", "İyonik", "MgO (Mg²⁺ ve O²⁻ örgüsü)"],
      ["Ca–F", "metal–ametal", "2,98", "İyonik", "CaF₂ (Ca²⁺ ve F⁻ örgüsü)"],
      ["Al–O", "metal–ametal", "1,83", "İyonik", "Al₂O₃ (Al³⁺ ve O²⁻ örgüsü)"],
      ["H–F", "ametal–ametal", "1,78", "Polar kovalent", "HF molekülü"],
      ["H–Cl", "ametal–ametal", "0,96", "Polar kovalent", "HCl molekülü"],
      ["C–H", "ametal–ametal", "0,35", "Polar kovalent", "CH₄ molekülü"],
      ["Cl–Cl", "ametal–ametal", "0,00", "Apolar kovalent", "Cl₂ molekülü"],
    ];
    expect(bondTypeSupplement220.table.rows).toEqual(expectedRows);
    for (const { a, b, d, salt } of bondRows220) {
      const exact = Math.abs(PAULING_EN209[a as keyof typeof PAULING_EN209]! - PAULING_EN209[b as keyof typeof PAULING_EN209]!);
      expect(d).toBeCloseTo(exact, 9);
      if (salt) {
        const [m, x] = metals.has(a) ? [a, b] : [b, a];
        const [qc, qa] = [charge(m), charge(x)];
        const g = gcd(qc, -qa);
        expect(countAtoms(salt.formula)).toEqual({ [m]: -qa / g, [x]: qc / g });
      }
    }
    expect([ionCharge220("Ca"), ionCharge220("N"), ionCharge220("Al"), ionCharge220("S")]).toEqual([2, -3, 3, -2]);
    expect(() => ionCharge220("C")).toThrow();
    expect(bondTypeExamples220[0].answer).toBe("X²⁺ ve Y³⁻; formül X₃Y₂ (Ca₃N₂, kalsiyum nitrür). X²⁺ 18 elektronla argon, Y³⁻ 10 elektronla neon gibidir.");
    expect(3 * 2 + 2 * -3).toBe(0);
    expect(bondTypeExamples220[1].answer).toBe("K–Cl: ΔEN 2,34, iyonik; H–F: ΔEN 1,78, polar kovalent; O–F: ΔEN 0,54, polar kovalent. Kısa yol H–F bağında yanılır.");
  });

  it("recomputes every salt in the naming grid and both naming examples", () => {
    const cations: [string, number, string][] = [["Na", 1, "sodyum"], ["Ca", 2, "kalsiyum"], ["Al", 3, "alüminyum"], ["NH₄", 1, "amonyum"], ["Fe", 2, "demir(II)"], ["Fe", 3, "demir(III)"]];
    const anions: [string, number, string, boolean][] = [["Cl", 1, "klorür", false], ["NO₃", 1, "nitrat", true], ["SO₄", 2, "sülfat", true], ["PO₄", 3, "fosfat", true]];
    cations.forEach(([cf, cq, cn], i) => anions.forEach(([af, aq, an, poly], j) => {
      const g = gcd(cq, aq);
      const [nc, na] = [aq / g, cq / g];
      const catPart = nc === 1 ? cf : cf.length > 2 ? `(${cf})${"₀₁₂₃₄₅₆₇₈₉"[nc]}` : `${cf}${"₀₁₂₃₄₅₆₇₈₉"[nc]}`;
      const anPart = na === 1 ? af : poly ? `(${af})${"₀₁₂₃₄₅₆₇₈₉"[na]}` : `${af}${"₀₁₂₃₄₅₆₇₈₉"[na]}`;
      expect(saltGrid220[i][j].formula, `${cf}-${af}`).toBe(catPart + anPart);
      expect(saltGrid220[i][j].name).toBe(`${cn} ${an}`);
      expect(nameGridSupplement220.table.rows[i][j + 1]).toBe(`${catPart + anPart} · ${cn} ${an}`);
    }));
    expect(nameGridSupplement220.table.rows[5]).toEqual(["Fe³⁺ demir(III)", "FeCl₃ · demir(III) klorür", "Fe(NO₃)₃ · demir(III) nitrat", "Fe₂(SO₄)₃ · demir(III) sülfat", "FePO₄ · demir(III) fosfat"]);
    // Örnek 1: FeSO₄ ve Fe₂(SO₄)₃.
    expect([(1 * 2) / 1, (3 * 2) / 2]).toEqual([2, 3]);
    expect(countAtoms("Fe₂(SO₄)₃")).toEqual({ Fe: 2, S: 3, O: 12 });
    expect(nameGridExamples220[0].answer).toBe("FeSO₄ demir(II) sülfat, Fe₂(SO₄)₃ demir(III) sülfat. O sayıları 4 ve 12.");
    // Örnek 2: (NH₄)₃PO₄ ve Al(NO₃)₃.
    expect(countAtoms("(NH₄)₃PO₄")).toEqual({ N: 3, H: 12, P: 1, O: 4 });
    expect(countAtoms("Al(NO₃)₃")).toEqual({ Al: 1, N: 3, O: 9 });
    expect(nameGridExamples220[1].answer).toBe("(NH₄)₃PO₄ (20 atom) ve Al(NO₃)₃ (13 atom).");
  });

  it("regenerates covalent names from atom counts and keeps the lesson's spellings", () => {
    expect(covalentNameSupplement220.table.rows.map((r) => [r[0], r[3], r[4]])).toEqual([
      ["CO", "karbon monoksit", "2"], ["CO₂", "karbon dioksit", "3"], ["NO", "azot monoksit", "2"], ["N₂O", "diazot monoksit", "3"],
      ["N₂O₃", "diazot trioksit", "5"], ["SO₃", "kükürt trioksit", "4"], ["PCl₅", "fosfor pentaklorür", "6"], ["CCl₄", "karbon tetraklorür", "5"],
    ]);
    for (const m of covalentSet220) expect(countAtoms(covalentNameSupplement220.table.rows[covalentSet220.indexOf(m)][0])).toEqual({ [m.first]: m.n1, [m.second]: m.n2 });
    // Dersin kendi yazımları aynı kuralla üretilir.
    const lessonText = JSON.stringify(lessonGuides.get("kovalent-adlandirma-metalik-bag")).toLocaleLowerCase("tr-TR");
    for (const name of ["karbon monoksit", "karbon dioksit", "fosfor triklorür", "diazot pentaoksit", "diazot tetraoksit", "kükürt hekzaflorür"]) expect(lessonText).toContain(name);
    expect(covalentNameExamples220[0].answer).toBe("NO azot monoksit, N₂O diazot monoksit, NO₂ azot dioksit. İkinci elemente mono NO ve N₂O adlarında yazılır; O sayısını belirttiği için düşmez.");
    expect(covalentNameExamples220[1].answer).toBe("SiF₄: silisyum tetraflorür; Cl₂O: diklor monoksit.");
  });

  it("recomputes Lewis counts, polarity and pair interactions", () => {
    const expected: Record<string, [number, number, number]> = {
      H2O: [8, 2, 2], NH3: [8, 3, 1], CH4: [8, 4, 0], CO2: [16, 4, 4], HCl: [8, 1, 3], N2: [10, 3, 2], O2: [12, 2, 4], HF: [8, 1, 3], H2S: [8, 2, 2],
      CH3OH: [14, 5, 2], CH3OCH3: [20, 8, 2],
    };
    for (const [id, [total, bonds, pairs]] of Object.entries(expected)) {
      const m = LEWIS220[id as keyof typeof LEWIS220];
      expect(m.atoms.reduce((a, s) => a + VALENCE[s], 0), id).toBe(total);
      expect([m.totalValence, m.bondPairs, m.lonePairTotal], id).toEqual([total, bonds, pairs]);
      expect(2 * (bonds + pairs)).toBe(total);
    }
    expect(LEWIS220.N2.orders).toEqual([3]);
    expect(LEWIS220.O2.orders).toEqual([2]);
    expect(LEWIS220.CO2.orders).toEqual([2, 2]);
    expect(LEWIS220.CO2.lonePairs).toEqual([0, 2, 2]);
    expect(weakRows220.map(({ a, b }) => `${a.kind}:${b.kind}`).at(-1)).toBe("ion:molecule");
    expect(weakSupplement220.table.rows.map((r) => [r[0], r[3], r[4]])).toEqual([
      ["N₂···N₂", "apolar", "London"],
      ["O₂···O₂", "apolar", "London"],
      ["CO₂···CO₂", "apolar", "London"],
      ["CH₄···CH₄", "apolar", "London"],
      ["HCl···HCl", "polar", "London, dipol–dipol"],
      ["NH₃···NH₃", "polar", "London, dipol–dipol, hidrojen bağı"],
      ["H₂O···H₂O", "polar", "London, dipol–dipol, hidrojen bağı"],
      ["Na⁺···H₂O", "iyon + polar", "İyon–dipol"],
    ]);
    expect(interactions220({ kind: "molecule", m: LEWIS220.H2O }, { kind: "molecule", m: LEWIS220.O2 })).toEqual(["London", "dipol–indüklenmiş dipol"]);
    expect(weakExamples220[0].answer).toBe("CO₂: 16 değerlik e⁻ = 4 bağ çifti + 4 ortaklanmamış çift, merkezde 0 çift, apolar; H₂O: 8 değerlik e⁻ = 2 bağ çifti + 2 ortaklanmamış çift, merkezde 2 çift, polar.");
    expect(weakExamples220[1].answer).toBe("N₂···N₂: London; HF···HF: London, dipol–dipol, hidrojen bağı; H₂O···CH₄: London, dipol–indüklenmiş dipol; K⁺···H₂O: iyon–dipol.");
  });

  it("counts hydrogen-bond donors and acceptors and checks both examples", () => {
    const fon = new Set(["F", "O", "N"]);
    for (const { m, donors, acceptors, pure } of hbondRows220) {
      const bonds = m.atoms.map((_, a) => m.links.reduce((s, l, i) => s + (l.includes(a) ? m.orders[i] : 0), 0));
      const d = m.links.filter(([p, q]) => (m.atoms[p] === "H" && fon.has(m.atoms[q])) || (m.atoms[q] === "H" && fon.has(m.atoms[p]))).length;
      const acc = m.atoms.reduce((s, el, a) => s + (fon.has(el) ? (VALENCE[el] - bonds[a]) / 2 : 0), 0);
      expect([donors, acceptors, pure], m.formula).toEqual([d, acc, d > 0 && acc > 0]);
    }
    expect(hbondCountSupplement220.table.rows.map((r) => [r[0].split(" ")[0], r[2], r[3], r[4]])).toEqual([
      ["H₂O", "2", "2", "Hidrojen bağı var"], ["NH₃", "3", "1", "Hidrojen bağı var"], ["HF", "1", "3", "Hidrojen bağı var"], ["CH₃OH", "1", "2", "Hidrojen bağı var"],
      ["CH₃OCH₃", "0", "2", "Yok: alıcı var, verici yok"], ["CH₄", "0", "0", "Yok"], ["HCl", "0", "0", "Yok"], ["H₂S", "0", "0", "Yok"],
    ]);
    expect(hbondCountExamples220[0].answer).toBe("NH₃–H₂O: iki yönde de mümkün; CH₃OH–CH₃OCH₃: yalnız CH₃OH verici → CH₃OCH₃ alıcı; CH₄–H₂O: mümkün değil.");
    expect([10 * Math.min(2, 2), 10 * Math.min(1, 3), 10 * Math.min(3, 1)]).toEqual([20, 10, 10]);
    expect(hbondCountExamples220[1].answer).toMatch(/^H₂O 20, HF 10, NH₃ 10 temas\./);
  });

  it("builds figure readouts from the same data as the tables", () => {
    const read = (id: keyof typeof lessons220, step: number) => depthFigures220[id][lessons220[id][0].title].draw(0, step).readout!.join(" ");
    expect(read("iyonik-bag-ve-guclu-etkilesimler", 4)).toContain("H–F: ametal–ametal, ΔEN = 1,78 → polar kovalent");
    expect(read("iyonik-bag-ve-guclu-etkilesimler", 4)).toContain("kaba ipucu bu çiftte yanılır");
    expect(read("iyonik-bilesik-adlandirma", 5)).toContain("Fe₂(SO₄)₃ demir(III) sülfat");
    expect(read("iyonik-bilesik-adlandirma", 3)).toContain("3 · (+1) + 1 · (−3) = 0");
    expect(read("kovalent-adlandirma-metalik-bag", 3)).toContain("diazot monoksit");
    expect(read("zayif-etkilesimler", 2)).toContain("CO₂: 16 değerlik e⁻ = 4 bağ çifti + 4 ortaklanmamış çift");
    expect(read("zayif-etkilesimler", 2)).toContain("Merkez C: 0 çift → apolar");
    expect(read("hidrojen-bagi", 4)).toContain("verici H 0, F/O/N’de çift 2");
  });
});
