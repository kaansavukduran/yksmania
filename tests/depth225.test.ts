import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  bottle225, chainPair225, countedRows225, crucible225, historyExamples225, historyRows225, historyStatements225, historySupplement225,
  latinRoots225, mixedTotals225, monomerCounted225, monomerExamples225, monomerSupplement225, notationExamples225, notationSupplement225,
  parseFormula225, ppChain225, resinCodes225, resinExamples225, resinSupplement225, threePacks225,
} from "../src/learning/depth225";

const lessons225 = {
  "simyadan-kimyaya": [historySupplement225, historyExamples225],
  "sembolik-dil": [notationSupplement225, notationExamples225],
  "polimer-kozmetik-ilac": [monomerSupplement225, monomerExamples225],
  "polimer-gida-ilac-yag": [resinSupplement225, resinExamples225],
} as const;
const sheetText = (sheet: NonNullable<ReturnType<typeof studyCheatSheet>>) => JSON.stringify(sheet);

/* Bağımsız atom sayıcı (depth225 ayrıştırıcısını kullanmaz); başta katsayı alabilir. */
function atoms(notation: string): Record<string, number> {
  const m = /^(\d*)(.*)$/.exec(notation)!;
  const coef = m[1] ? Number(m[1]) : 1;
  const stack: Record<string, number>[] = [{}];
  const re = /([A-Z][a-z]?|\(|\))(\d*)/g;
  let x: RegExpExecArray | null;
  while ((x = re.exec(m[2]))) {
    const k = x[2] ? Number(x[2]) : 1;
    if (x[1] === "(") stack.push({});
    else if (x[1] === ")") {
      const inner = stack.pop()!;
      for (const [e, c] of Object.entries(inner)) stack.at(-1)![e] = (stack.at(-1)![e] ?? 0) + c * k;
    } else stack.at(-1)![x[1]] = (stack.at(-1)![x[1]] ?? 0) + k;
  }
  return Object.fromEntries(Object.entries(stack[0]).map(([e, c]) => [e, c * coef]));
}
const sum = (r: Record<string, number>) => Object.values(r).reduce((a, b) => a + b, 0);
const M: Record<string, number> = { H: 1, C: 12, O: 16, F: 19, Cl: 35.5 };
const mass = (f: string) => Object.entries(atoms(f)).reduce((s, [e, k]) => s + M[e] * k, 0);
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9;

describe("TYT Kimya depth 0.225", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons225)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
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
      expect(shown.examples.slice(0, raw.examples.length).map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(shown.examples).toHaveLength(raw.examples.length + (theorySupplements[id] ?? []).reduce((n, s) => n + (s.examples?.length ?? 0), 0));
      // Earlier supplements of the lesson stay; the new one is last.
      expect(theorySupplements[id]!.at(-1)).toBe(added);
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
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|yes|polymer|monomer unit)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++)
        expect(JSON.stringify(figure!.draw(0, step))).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
    }
  });

  it("keeps the earlier simya and sembolik-dil supplements in front of the new ones", () => {
    expect(theorySupplements["simyadan-kimyaya"]!.map(({ title }) => title)).toEqual(["Kütleyi hangi sistemde ölçtüğünü belirle", historySupplement225.title]);
    expect(theorySupplements["sembolik-dil"]!.map(({ title }) => title)).toEqual(["Alt indis, parantez ve katsayının görevi", notationSupplement225.title]);
    expect(theorySupplements["polimer-kozmetik-ilac"]).toEqual([monomerSupplement225]);
    expect(theorySupplements["polimer-gida-ilac-yag"]).toEqual([resinSupplement225]);
  });

  it("lists the seven figures exactly as the lesson presents them, without dates", () => {
    expect(historyRows225.map(({ name }) => name)).toEqual([
      "Empedokles", "Aristo", "Demokritos", "Câbir bin Hayyan", "Ebû Bekir er-Râzî", "Robert Boyle", "Antoine Lavoisier",
    ]);
    const lesson = JSON.stringify(lessonGuides.get("simyadan-kimyaya"));
    for (const r of historyRows225) expect(lesson).toContain(r.name.replace("Antoine ", ""));
    expect(historyRows225.map(({ era }) => era)).toEqual([
      "Antik Yunan düşüncesi", "Antik Yunan düşüncesi", "Antik Yunan düşüncesi", "Orta Çağ İslam dünyası", "Orta Çağ İslam dünyası",
      "Modern kimyaya geçiş", "Modern kimyaya geçiş",
    ]);
    expect(historyRows225.map(({ kind }) => kind)).toEqual([
      "Düşünce modeli", "Düşünce modeli", "Düşünce modeli", "Araç ve teknik", "Uygulama ve sınıflandırma", "Element kavramı", "Nicel ölçüm",
    ]);
    // Dates are omitted: the lesson gives none.
    expect(JSON.stringify(historySupplement225)).not.toMatch(/\b1[0-9]{3}\b|yüzyıl|M\.Ö\.|MÖ/);
    expect(historySupplement225.table.rows.map((row) => row[1])).toEqual(historyRows225.map(({ name }) => name));
  });

  it("solves both simya examples from the data", () => {
    expect(historyStatements225.filter((s) => s.correct).map((s) => s.key)).toEqual(["B", "D"]);
    expect(historyExamples225[0].answer).toBe("B ve D uygundur; A ve C uygun değildir.");
    // Mg + O → MgO: 2,4 g Mg binds 2,4 × 16/24 = 1,6 g O.
    expect(crucible225.productDg - crucible225.mgDg).toBe(16);
    expect(near((2.4 * 16) / 24, 1.6)).toBe(true);
    expect(historyExamples225[1].answer).toContain("1,6 g oksijen");
    expect(historyExamples225[1].check).toContain("2,4 g Mg + 1,6 g O = 4,0 g MgO");
  });

  it("recounts every notation row with an independent parser", () => {
    const expected: Record<string, [number, number, number]> = {
      // notation: [kinds, atoms per unit, total atoms]
      NH3: [2, 4, 4], "2HNO3": [3, 5, 10], H2SO4: [3, 7, 7], "3NaHCO3": [4, 6, 18],
      CaCO3: [3, 5, 5], CH3COOH: [3, 8, 8], "2Ca(OH)2": [3, 5, 10], "5NaCl": [2, 2, 10],
    };
    expect(countedRows225.map(({ notation }) => notation)).toEqual(Object.keys(expected));
    for (const c of countedRows225) {
      const all = atoms(c.notation);
      const one = atoms(c.formula);
      expect(c.total).toEqual(all);
      expect(c.perUnit).toEqual(one);
      expect([c.elements.length, c.unitAtoms, c.totalAtoms]).toEqual(expected[c.notation]);
      expect(sum(all)).toBe(c.totalAtoms);
    }
    expect(parseFormula225("CH3COOH")).toEqual({ C: 2, H: 4, O: 2 });
    expect(parseFormula225("Ca(OH)2")).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(parseFormula225("(NH4)2SO4")).toEqual({ N: 2, H: 8, S: 1, O: 4 });
    expect(parseFormula225("Al2(SO4)3")).toEqual({ Al: 2, S: 3, O: 12 });
    const table = notationSupplement225.table.rows;
    expect(table[1]).toEqual(["2 HNO₃", "Kezzap", "H, N, O (3)", "H 1 · N 1 · O 3 = 5", "2 × 5 = 10"]);
    expect(table[5]).toEqual(["CH₃COOH", "Sirke asidi / asetik asit", "C, H, O (3)", "C 2 · H 4 · O 2 = 8", "8 (katsayı 1)"]);
    // Every name comes from the lesson's common-name table.
    const lessonNames = lessonGuides.get("sembolik-dil")!.sections.find((s) => s.title === "Yaygın adları formülle birlikte hatırla")!.table!.rows;
    for (const c of countedRows225) expect(lessonNames.some(([f, n]) => n === c.name && f === c.formula.replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]))).toBe(true);
  });

  it("checks Latin roots and both symbol examples", () => {
    expect(latinRoots225.map(({ symbol, latin }) => `${symbol}:${latin}`)).toEqual([
      "Na:natrium", "K:kalium", "Fe:ferrum", "Cu:cuprum", "Ag:argentum", "Au:aurum", "Hg:hydrargyrum", "Pb:plumbum", "Sn:stannum",
    ]);
    expect(notationExamples225[0].answer).toBe("Hiçbiri doğru değil: sodyum Na, altın Au, kalay Sn, bakır Cu.");
    expect(notationExamples225[0].prompt).toContain("sodyum → S, altın → Al, kalay → K, bakır → B");
    const mix = [atoms("2HNO3"), atoms("3NH3")].reduce<Record<string, number>>((acc, r) => {
      for (const [e, k] of Object.entries(r)) acc[e] = (acc[e] ?? 0) + k;
      return acc;
    }, {});
    expect(mix).toEqual({ H: 11, N: 5, O: 6 });
    expect(mixedTotals225).toEqual({ total: mix, atoms: 22, kinds: 3 });
    expect(notationExamples225[1].answer).toBe("H = 11, N = 5, O = 6; toplam 22 atom, 3 element türü.");
  });

  it("recomputes every monomer row and both polymer examples", () => {
    const expected: Record<string, [string, string, string, number]> = {
      PE: ["etilen", "C2H4", "polietilen", 28], PP: ["propilen", "C3H6", "polipropilen", 42], PVC: ["vinil klorür", "C2H3Cl", "polivinil klorür", 62.5],
      PS: ["stiren", "C8H8", "polistiren", 104], PTFE: ["tetrafloroeten", "C2F4", "politetrafloroeten (günlük dilde teflon)", 100],
    };
    expect(monomerCounted225.map(({ abbr }) => abbr)).toEqual(Object.keys(expected));
    for (const r of monomerCounted225) {
      const [mono, f, poly, m] = expected[r.abbr];
      expect([r.monomer, r.formula, r.polymer]).toEqual([mono, f, poly]);
      expect(atoms(r.monomerStructure.replace(/[–=]/g, "").replace(/[₀-₉]/g, (c) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(c))))).toEqual(atoms(f));
      expect(r.repeatAtoms).toEqual(atoms(f));
      expect(near(mass(f), m)).toBe(true);
      expect(r.massDu).toBe(Math.round(m * 10));
    }
    expect(monomerSupplement225.table.rows[2]).toEqual(["vinil klorür CH₂=CHCl", "PVC: polivinil klorür", "–CH₂–CHCl–", "C₂H₃Cl · 62,5 u", "boru, profil"]);
    expect(chainPair225.xMatch[0].abbr).toBe("PP");
    expect(chainPair225.yMatch[0].abbr).toBe("PS");
    expect([chainPair225.X.massDu, chainPair225.Y.massDu]).toEqual([4200, 10400]);
    expect(monomerExamples225[0].answer).toBe("X = PP (polipropilen), Y = PS (polistiren); C₆H₅ halkası Y’nin monomeri stirendedir.");
    expect(21000 / mass("C3H6")).toBe(500);
    expect([ppChain225.n, ppChain225.C, ppChain225.H]).toEqual([500, 1500, 3000]);
    expect(1500 * 12 + 3000).toBe(21000);
    expect(monomerExamples225[1].answer).toBe("500 tekrar birimi; 1500 C ve 3000 H atomu.");
  });

  it("maps the standard resin codes 1–6 and solves both packaging examples", () => {
    expect(resinCodes225.map(({ code, abbr, repeatFormula }) => `${code}:${abbr}:${repeatFormula}`)).toEqual([
      "1:PET:C10H8O4", "2:HDPE:C2H4", "3:PVC:C2H3Cl", "4:LDPE:C2H4", "5:PP:C3H6", "6:PS:C8H8",
    ]);
    // Addition-polymer codes agree with the monomer table.
    for (const r of resinCodes225.filter((x) => x.addition)) {
      const m = monomerCounted225.find((x) => x.monomer === r.monomerNote)!;
      expect(m.repeatAtoms).toEqual(atoms(r.repeatFormula));
    }
    expect(near(mass("C10H8O4"), 192)).toBe(true);
    expect(resinSupplement225.table.rows[0]).toEqual(["1", "PET: polietilen tereftalat", "C₁₀H₈O₄ (C, H, O)", "etilen glikol ve tereftalik asit (yoğunlaşma)", "içecek şişesi"]);
    expect([bottle225.body.abbr, bottle225.cap.abbr]).toEqual(["PET", "PP"]);
    expect(resinExamples225[0].answer).toBe("Gövde PET, kapak PP. Kodlar yağın bileşimini ve geri dönüştürülmüş olduğunu söylemez.");
    expect(threePacks225.ch.map(({ code }) => code)).toEqual([2, 6]);
    expect(threePacks225.cl.map(({ code }) => code)).toEqual([3]);
    expect(near((100 * 35.5) / mass("C2H3Cl"), 56.8)).toBe(true);
    expect(resinExamples225[1].answer).toBe("Yalnız C ve H: kod 2 (HDPE) ve 6 (PS). Klor kod 3 (PVC) tekrarındadır; kütlece %56,8.");
  });
});
