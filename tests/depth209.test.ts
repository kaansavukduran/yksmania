import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { depthFigures209 } from "../src/learning/sectionFigures/depthFigures209";
import {
  CLASS_OF209, EV_TO_KJ_MOL209, IE1_KJ_MOL209, PAULING_EN209, SYMBOLS209,
  chain209, classExamples209, classRows209, classSupplement209, classTotals209, compareRadius209,
  deltaEN209, electrons209, enExamples209, enSupplement209, ieDips209, ieExamples209, ieMoleEnergies209, ieMoles209,
  ieSupplement209, isoSeries209, nBonds209, negativeEnd209, place209, places209, polarBonds209, quadGroupPairs209,
  quadPeriodPairs209, radiusExamples209, radiusRows209, radiusRuleSupplement209, row3ClassChanges209, shellExamples209,
  shellPlaceSupplement209, shells209, speciesText209, yOffset209, type Species209, type Symbol209,
} from "../src/learning/depth209";

const lessons209 = {
  "katman-elektron-dizilimi": [shellPlaceSupplement209, shellExamples209],
  "elementlerin-siniflandirilmasi": [classSupplement209, classExamples209],
  "atom-capi-karsilastirma": [radiusRuleSupplement209, radiusExamples209],
  "iyonlasma-enerjisi": [ieSupplement209, ieExamples209],
  "elektron-ilgisi-elektronegatiflik": [enSupplement209, enExamples209],
} as const;

/* Bağımsız denetim için elle yazılmış beklenen değerler. */
const EXPECTED_SHELLS: Record<number, string> = {
  1: "1", 2: "2", 3: "2,1", 6: "2,4", 10: "2,8", 11: "2,8,1", 13: "2,8,3", 17: "2,8,7", 18: "2,8,8", 19: "2,8,8,1", 20: "2,8,8,2",
};
// NIST ASD birinci iyonlaşma enerjileri (eV), kJ/mol tablosunu yeniden üretmek için.
const NIST_EV: Record<Symbol209, number> = {
  H: 13.598, He: 24.587, Li: 5.392, Be: 9.323, B: 8.298, C: 11.26, N: 14.534, O: 13.618, F: 17.423, Ne: 21.565,
  Na: 5.139, Mg: 7.646, Al: 5.986, Si: 8.152, P: 10.487, S: 10.36, Cl: 12.968, Ar: 15.76, K: 4.341, Ca: 6.113,
};

describe("TYT Kimya periyodik sistem derinleştirmesi 0.209.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons209)) {
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
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      const revised = studyGuideWithSourceRevisions(id)!;
      expect(shown.examples.slice(0, -2)).toEqual(revised.examples);
      expect(shown.sections.slice(0, -1)).toEqual(revised.sections);
      expect(revised.examples.map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      // Kopya Kâğıdı: aynı tablo, kısa özet ve figür başlığı.
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
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav|undefined|NaN/i);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|null/);
      // Figür yeni bölüm başlığıyla kayıtlı ve her adımda çizilebiliyor.
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBe(depthFigures209[id][added.title]);
      const values = figure!.param ? Array.from({ length: figure!.param.max - figure!.param.min + 1 }, (_, i) => figure!.param!.min + i) : [0];
      for (const value of values)
        for (let step = 0; step < (figure!.steps?.length ?? 1); step++) {
          const frame = figure!.draw(value, step);
          expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
          expect(frame.readout!.length).toBeGreaterThan(0);
        }
    }
  });

  it("keeps the earlier section figures of the five lessons", () => {
    for (const id of Object.keys(lessons209)) expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
  });

  it("derives shells, period, group and valence from Z alone", () => {
    expect(SYMBOLS209).toHaveLength(20);
    for (const [z, text] of Object.entries(EXPECTED_SHELLS)) expect(shells209(Number(z)).join(","), z).toBe(text);
    for (const p of places209) {
      expect(p.shells.reduce((a, b) => a + b, 0)).toBe(p.z);
      expect(p.period).toBe(p.z <= 2 ? 1 : p.z <= 10 ? 2 : p.z <= 18 ? 3 : 4);
      const expectedGroup = [2, 10, 18].includes(p.z) ? 18 : p.valence <= 2 ? p.valence : p.valence + 10;
      expect(p.group).toBe(expectedGroup);
    }
    expect([1, 3, 11, 19].map((z) => place209(z).group)).toEqual([1, 1, 1, 1]);
    expect([4, 12, 20].map((z) => place209(z).group)).toEqual([2, 2, 2]);
    expect(place209(2)).toMatchObject({ valence: 2, group: 18, period: 1 });
    expect(shellPlaceSupplement209.table.rows[2]).toEqual(["13. grup (3A) · 3 e⁻", "—", "B (5): 2, 3", "Al (13): 2, 8, 3", "—"]);
    expect(shellPlaceSupplement209.table.rows[7]).toEqual(["18. grup (8A) · 8 e⁻ (He: 2 e⁻)", "He (2): 2", "Ne (10): 2, 8", "Ar (18): 2, 8, 8", "—"]);
    expect(shellPlaceSupplement209.table.rows.flat().filter((c) => c !== "—")).toHaveLength(20 + 8);
    expect(() => shells209(21)).toThrow();
    // Örnek 1: 3. periyot 13. grup + 5 proton.
    const x = places209.find((p) => p.period === 3 && p.group === 13)!;
    const y = place209(x.z + yOffset209);
    expect([x.z, y.z, y.shells.join(","), y.period, y.group]).toEqual([13, 18, "2,8,8", 3, 18]);
    expect(shellExamples209[0].answer).toContain("Z = 18, dağılım 2, 8, 8; 3. periyot, 18. grup");
    // Örnek 2: 9, 12, 17, 20 kaba kuvvetle eşleştirilir.
    const zs = [9, 12, 17, 20];
    const same = (key: "group" | "period") => zs.flatMap((a, i) => zs.slice(i + 1).filter((b) => place209(a)[key] === place209(b)[key]).map((b) => `${a}-${b}`));
    expect(same("group")).toEqual(["9-17", "12-20"]);
    expect(same("period")).toEqual(["12-17"]);
    expect(quadGroupPairs209.map(([a, b]) => `${a.z}-${b.z}`)).toEqual(same("group"));
    expect(quadPeriodPairs209.map(([a, b]) => `${a.z}-${b.z}`)).toEqual(same("period"));
  });

  it("classifies the first 20 elements and checks the class examples", () => {
    const expected: Record<string, Symbol209[]> = {
      metal: ["Li", "Be", "Na", "Mg", "Al", "K", "Ca"],
      "yarı metal": ["B", "Si"],
      ametal: ["H", "C", "N", "O", "F", "P", "S", "Cl"],
      "soy gaz": ["He", "Ne", "Ar"],
    };
    for (const [cls, members] of Object.entries(expected)) {
      expect(SYMBOLS209.filter((s) => CLASS_OF209[s] === cls)).toEqual(members);
      expect(classTotals209[cls as keyof typeof classTotals209]).toBe(members.length);
    }
    expect(classSupplement209.table.rows.at(-1)).toEqual(["Toplam", "7", "2", "8", "3"]);
    expect(classSupplement209.table.rows[2]).toEqual(["3. periyot", "Na, Mg, Al (3)", "Si (1)", "P, S, Cl (3)", "Ar (1)"]);
    expect(classRows209.map(({ byClass }) => byClass.metal.length)).toEqual([0, 2, 3, 2]);
    // Örnek 1: dağılımlardan Z ve sınıf.
    const fromShells = ["2,8,2", "2,3", "2,8,7", "2,8,8"].map((d) => d.split(",").map(Number).reduce((a, b) => a + b, 0));
    expect(fromShells.map((z) => CLASS_OF209[SYMBOLS209[z - 1]])).toEqual(["metal", "yarı metal", "ametal", "soy gaz"]);
    expect(classExamples209[0].answer).toBe("X = Mg: metal; Y = B: yarı metal; T = Cl: ametal; Q = Ar: soy gaz.");
    // Örnek 2: 3. periyotta sınıf değişimleri.
    const row3 = places209.filter(({ period }) => period === 3);
    const changes = row3.slice(1).flatMap((p, i) => (CLASS_OF209[p.symbol] !== CLASS_OF209[row3[i].symbol] ? [`${row3[i].group}-${p.group}`] : []));
    expect(changes).toEqual(["13-14", "14-15", "17-18"]);
    expect(row3ClassChanges209.map(({ from, to }) => `${from}-${to}`)).toEqual(changes);
    expect(classExamples209[1].answer).toMatch(/^3 metal \(Na, Mg, Al\), 1 yarı metal \(Si\), 3 ametal \(P, S, Cl\), 1 soy gaz \(Ar\)\./);
    expect(classExamples209[1].answer).toContain("ametalden soy gaza");
  });

  it("applies the radius rules in order and verifies both radius examples", () => {
    const rows = radiusRows209();
    expect(rows.map(({ rule }) => rule)).toEqual(["aynı grup", "aynı periyot", "aynı element", "aynı element", "eş elektronlu", "kural yok"]);
    expect(rows.map(({ bigger }) => (bigger ? speciesText209(bigger) : "—"))).toEqual(["Ca", "P", "S²⁻", "Ca", "Cl⁻", "—"]);
    expect(radiusRuleSupplement209.table.rows[4]).toEqual(["Cl⁻ – K⁺", "17 / 18 · 19 / 18", "3 · 3", "Eş elektronlu: protonu fazla olan küçük", "Cl⁻"]);
    // Kuralların simetrisi: çiftin yönü sonucu değiştirmez.
    for (const { a, b, bigger } of rows) expect(compareRadius209(b, a).bigger).toBe(bigger);
    // Örnek 1: 18 elektronlu seri; protonu az olan büyük.
    expect(isoSeries209.map(electrons209)).toEqual([18, 18, 18, 18]);
    const byProton = [...isoSeries209].sort((x, y) => x.z - y.z).map(speciesText209).join(" > ");
    expect(byProton).toBe("S²⁻ > Cl⁻ > K⁺ > Ca²⁺");
    expect(radiusExamples209[0].answer).toBe(`${byProton}.`);
    // Örnek 2: iki ayrı kuralla zincir; doğrudan kural yok.
    const [mg2, mg, ca] = chain209;
    expect(compareRadius209(mg2, mg)).toEqual({ rule: "aynı element", bigger: mg });
    expect(compareRadius209(mg, ca)).toEqual({ rule: "aynı grup", bigger: ca });
    expect(compareRadius209(mg2, ca).bigger).toBeNull();
    expect(radiusExamples209[1].answer).toBe("Mg²⁺ < Mg < Ca.");
    const s: Species209 = { z: 16, q: -2 };
    expect(electrons209(s)).toBe(18);
  });

  it("matches the IE₁ table with NIST eV values and checks the documented trend exceptions", () => {
    for (const s of SYMBOLS209) expect(IE1_KJ_MOL209[s], s).toBe(Math.round(NIST_EV[s] * EV_TO_KJ_MOL209));
    const ie = (z: number) => IE1_KJ_MOL209[SYMBOLS209[z - 1]];
    // 2. periyot (Z 3–10): yalnız Be→B ve N→O düşer.
    const drops = (from: number, to: number) => {
      const out: string[] = [];
      for (let z = from + 1; z <= to; z++) if (ie(z) < ie(z - 1)) out.push(`${SYMBOLS209[z - 2]}>${SYMBOLS209[z - 1]}`);
      return out;
    };
    expect(drops(3, 10)).toEqual(["Be>B", "N>O"]);
    expect(drops(11, 18)).toEqual(["Mg>Al", "P>S"]);
    expect(ieDips209(2)).toEqual([["Be", "B"], ["N", "O"]]);
    expect(ieDips209(3)).toEqual([["Mg", "Al"], ["P", "S"]]);
    // Gruplarda aşağı azalır.
    for (const g of [1, 2, 13, 14, 15, 16, 17, 18]) {
      const col = places209.filter((p) => p.group === g).map((p) => IE1_KJ_MOL209[p.symbol]);
      expect(col.every((x, i) => i === 0 || x < col[i - 1]), String(g)).toBe(true);
    }
    expect(Math.max(...Object.values(IE1_KJ_MOL209))).toBe(IE1_KJ_MOL209.He);
    expect(Math.min(...Object.values(IE1_KJ_MOL209))).toBe(IE1_KJ_MOL209.K);
    expect(ieSupplement209.table.rows[0]).toEqual(["1. grup (1A)", "H 1312", "Li 520", "Na 496", "K 419"]);
    expect(ieSupplement209.table.rows[1]).toEqual(["2. grup (2A)", "—", "Be 900", "Mg 738", "Ca 590"]);
    expect(ieSupplement209.paragraphs[0]).toMatch(/NIST/);
    expect(ieSupplement209.paragraphs[0]).toMatch(/kJ\/mol/);
    // Örnek 1: B, C, N, O sıralaması.
    const ordered = (["O", "B", "N", "C"] as Symbol209[]).sort((a, b) => IE1_KJ_MOL209[a] - IE1_KJ_MOL209[b]);
    expect(ordered.join(" < ")).toBe("B < C < O < N");
    expect(ieExamples209[0].answer).toBe("B < C < O < N. Genel yönden sapan çift N–O’dur.");
    // Örnek 2: 0,2 mol Ne ve Na.
    expect(ieMoles209 * IE1_KJ_MOL209.Ne).toBeCloseTo(416.2, 9);
    expect(ieMoles209 * IE1_KJ_MOL209.Na).toBeCloseTo(99.2, 9);
    expect(ieMoleEnergies209).toEqual([416.2, 99.2]);
    expect(ieExamples209[1].answer).toBe("Ne için 416,2 kJ, Na için 99,2 kJ; fark 317 kJ.");
  });

  it("checks Pauling trends, bond differences and both EN examples", () => {
    const en = (s: Symbol209) => PAULING_EN209[s]!;
    expect(Object.keys(PAULING_EN209).sort()).toEqual(SYMBOLS209.filter((s) => !["He", "Ne", "Ar"].includes(s)).sort());
    for (const period of [2, 3]) {
      const row = places209.filter((p) => p.period === period && p.group !== 18).map((p) => en(p.symbol));
      expect(row.every((x, i) => i === 0 || x > row[i - 1])).toBe(true);
    }
    for (const g of [1, 2, 13, 14, 15, 16, 17]) {
      const col = places209.filter((p) => p.group === g).map((p) => en(p.symbol));
      expect(col.every((x, i) => i === 0 || x < col[i - 1]), String(g)).toBe(true);
    }
    expect(Math.max(...Object.values(PAULING_EN209) as number[])).toBe(en("F"));
    expect(Math.min(...Object.values(PAULING_EN209) as number[])).toBe(en("K"));
    expect(enSupplement209.table.rows.at(-1)).toEqual(["18. grup (8A)", "He: değer yok", "Ne: değer yok", "Ar: değer yok", "—"]);
    expect(enSupplement209.table.rows[6]).toEqual(["17. grup (7A)", "—", "F 3,98", "Cl 3,16", "—"]);
    expect(enSupplement209.paragraphs[0]).toMatch(/CRC Handbook/);
    expect(enSupplement209.paragraphs[0]).toMatch(/birimi yoktur/);
    // Örnek 1: dört H bağı.
    const diffs = polarBonds209.map(([a, b]) => [`${a}–${b}`, Math.abs(en(a) - en(b))] as const).sort((x, y) => y[1] - x[1]);
    expect(diffs.map(([b]) => b).join(" > ")).toBe("H–F > H–O > H–Cl > H–C");
    expect(diffs.map(([, d]) => d.toFixed(2))).toEqual(["1.78", "1.24", "0.96", "0.35"]);
    expect(polarBonds209.map(([a, b]) => deltaEN209(a, b))).toEqual([0.96, 0.35, 1.78, 1.24]);
    expect(enExamples209[0].answer).toBe("H–F > H–O > H–Cl > H–C. Kısmi negatif uçlar: F, O, Cl, C.");
    // Örnek 2: N–Cl ve N–H.
    expect(nBonds209.map(([a, b]) => negativeEnd209(a, b))).toEqual(["Cl", "N"]);
    expect(Math.abs(en("N") - en("Cl"))).toBeCloseTo(0.12, 9);
    expect(Math.abs(en("N") - en("H"))).toBeCloseTo(0.84, 9);
    expect(enExamples209[1].answer).toBe("N–Cl bağında negatif uç Cl, N–H bağında N. N–H bağı daha kutupludur.");
  });

  it("builds figure readouts from the same data as the tables", () => {
    const read = (id: keyof typeof lessons209, value: number, step: number) =>
      depthFigures209[id][lessons209[id][0].title].draw(value, step).readout!.join(" ");
    for (const p of places209) expect(read("katman-elektron-dizilimi", p.z, 0)).toContain(`${p.period}. periyot; en dışta ${p.valence} elektron → ${p.group}. grup`);
    expect(read("elementlerin-siniflandirilmasi", 0, 0)).toContain("Metal (7): Li, Be, Na, Mg, Al, K, Ca.");
    expect(read("elementlerin-siniflandirilmasi", 0, 1)).toContain("Yarı metal (2): B, Si.");
    radiusRows209().forEach(({ bigger }, step) =>
      expect(read("atom-capi-karsilastirma", 0, step)).toContain(bigger ? `Daha büyük: ${speciesText209(bigger)}.` : "kural yok"));
    expect(read("iyonlasma-enerjisi", 0, 0)).toContain("Be 900 > B 801, N 1402 > O 1314");
    expect(read("iyonlasma-enerjisi", 0, 1)).toContain("Mg 738 > Al 578, P 1012 > S 1000");
    expect(read("iyonlasma-enerjisi", 0, 2)).toContain("H > Li > Na > K");
    expect(read("elektron-ilgisi-elektronegatiflik", 0, 0)).toContain("Li 0,98 < Be 1,57 < B 2,04 < C 2,55 < N 3,04 < O 3,44 < F 3,98");
    expect(read("elektron-ilgisi-elektronegatiflik", 0, 3)).toContain("negatif uç Cl, ΔEN = 0,12");
  });
});
