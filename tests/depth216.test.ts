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
  dailyExamples216, dailySupplement216, metalExamples216, metalSupplement216, mixExamples216, mixSupplement216,
  saltExamples216, saltSupplement216, saponExamples216, saponSupplement216,
} from "../src/learning/depth216";

const added = [
  ["asit-baz-tuz-ozellikleri", saltSupplement216, saltExamples216],
  ["asit-baz-tepkimeleri", mixSupplement216, mixExamples216],
  ["asit-baz-metaller", metalSupplement216, metalExamples216],
  ["hayatimizda-asit-baz", dailySupplement216, dailyExamples216],
  ["sabun-deterjan-temizlik", saponSupplement216, saponExamples216],
] as const;

/* Bağımsız denetim için yazım yardımcıları: modülün biçimlendiricisini kullanmaz. */
const tr = (x: number, min = 2) => {
  const r = Math.round(x * 10000) / 10000;
  let s = r.toString();
  if (!s.includes(".") && min > 0) s += ".";
  const [w, f = ""] = s.split(".");
  const frac = f.padEnd(min, "0");
  return frac ? `${w},${frac}` : w;
};
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const sub = (n: number) => (n === 1 ? "" : String(n).split("").map((c) => SUB[Number(c)]).join(""));
/** Formül çözümleyici: alt simgeli yazımdan atom sayıları (parantez destekli). */
const parse = (formula: string): Record<string, number> => {
  const plain = formula.replace(/[₀-₉]/g, (c) => String(SUB.indexOf(c)));
  const stack: Record<string, number>[] = [{}];
  const re = /([A-Z][a-z]?)(\d*)|(\()|\)(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(plain))) {
    if (m[1]) { const top = stack.at(-1)!; top[m[1]] = (top[m[1]] ?? 0) + Number(m[2] || 1); }
    else if (m[3]) stack.push({});
    else { const inner = stack.pop()!; const k = Number(m[4] || 1); const top = stack.at(-1)!; for (const [el, n] of Object.entries(inner)) top[el] = (top[el] ?? 0) + n * k; }
  }
  return stack[0];
};
const MASS: Record<string, number> = { H: 1, C: 12, O: 16, Na: 23, Mg: 24, Al: 27, Ca: 40 };
const molar = (formula: string) => Object.entries(parse(formula)).reduce((s, [el, n]) => s + MASS[el] * n, 0);
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

describe("depth 0.216.0 TYT Kimya asit-baz", () => {
  it("appends one table section and two examples without touching the accepted guide", () => {
    for (const [id, supplement, examples] of added) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === supplement.title)).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title))).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === supplement.table)).toHaveLength(1);
      const section = shown.sections.at(-1)!;
      expect(section.title).toBe(supplement.title);
      expect(section.figureTitle).toBe(supplement.title);
      expect(section.table?.layout).toBe("table");
      expect(section.table!.rows.length).toBeLessThanOrEqual(8);
      expect(section.table!.headers.length).toBeLessThanOrEqual(5);
      section.table!.rows.forEach((row) => expect(row).toHaveLength(section.table!.headers.length));
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length).toBeGreaterThan(5);
        expect(`${example.title} ${example.prompt}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
      }
      expect(JSON.stringify({ supplement, examples })).not.toMatch(/NaN|undefined|Infinity/);
      expect(theorySupplements[id]!.at(-1)).toBe(supplement);
      expect(theorySupplements[id]).toHaveLength(1);
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

  it("registers one drawable figure per new section", () => {
    for (const [id, supplement] of added) {
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const def = sectionFigures[id][supplement.figureTitle];
      expect(def, id).toBeDefined();
      const calls: [number, number][] = def.param
        ? Array.from({ length: Math.round((def.param.max - def.param.min) / def.param.step) + 1 }, (_, i) => [def.param!.min + i * def.param!.step, 0])
        : (def.steps ?? [""]).map((_, i) => [0, i]);
      for (const [value, step] of calls) {
        const frame = def.draw(value, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout?.length).toBeGreaterThan(0);
      }
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: supplement.figureTitle }));
      expect(html).toContain('role="img"');
    }
  });

  it("rebuilds every salt row from the ion charges", () => {
    const ions: Record<string, [number, string, boolean]> = {
      Na: [1, "sodyum", false], K: [1, "potasyum", false], Mg: [2, "magnezyum", false], Ca: [2, "kalsiyum", false],
      Al: [3, "alüminyum", false], "NH₄": [1, "amonyum", true], Cl: [-1, "klorür", false], "NO₃": [-1, "nitrat", true],
      "SO₄": [-2, "sülfat", true], "CO₃": [-2, "karbonat", true],
    };
    const pairs = [["Na", "Cl"], ["Ca", "Cl"], ["K", "SO₄"], ["Mg", "SO₄"], ["Ca", "NO₃"], ["Al", "SO₄"], ["NH₄", "Cl"], ["Na", "CO₃"]];
    const rows = saltSupplement216.table.rows;
    expect(rows).toHaveLength(pairs.length);
    pairs.forEach(([c, a], i) => {
      const [zc, nc, pc] = ions[c];
      const [za, na, pa] = ions[a];
      // En küçük katyon sayısı: toplam yük sıfır olana kadar dene.
      let x = 1; let y = 1;
      search: for (x = 1; x <= 3; x += 1) for (y = 1; y <= 3; y += 1) if (x * zc + y * za === 0) break search;
      expect(x * zc + y * za).toBe(0);
      expect(gcd(x, y)).toBe(1);
      const part = (s: string, n: number, poly: boolean) => (poly && n > 1 ? `(${s})${sub(n)}` : `${s}${sub(n)}`);
      expect(rows[i][2]).toBe(part(c, x, pc) + part(a, y, pa));
      expect(rows[i][3]).toBe(`${nc} ${na}`);
      expect(rows[i][4]).toContain(`= ${tr((x + y) * 0.1)} mol iyon`);
      expect(rows[i][4]).toContain(`${tr(x * 0.1)} mol ${c}`);
    });
    expect(rows.map((r) => r[2])).toEqual(["NaCl", "CaCl₂", "K₂SO₄", "MgSO₄", "Ca(NO₃)₂", "Al₂(SO₄)₃", "NH₄Cl", "Na₂CO₃"]);
    // Formül çözümleyicisiyle bağımsız atom sayımı.
    expect(parse("Al₂(SO₄)₃")).toEqual({ Al: 2, S: 3, O: 12 });
    expect(parse("Ca(NO₃)₂")).toEqual({ Ca: 1, N: 2, O: 6 });
  });

  it("recomputes every mixture row with M·V", () => {
    const data = [
      [1, 0.1, 100, 1, 0.1, 100], [2, 0.1, 100, 1, 0.1, 100], [2, 0.2, 50, 1, 0.2, 100],
      [1, 0.02, 100, 2, 0.01, 100], [1, 0.2, 150, 1, 0.4, 100], [1, 0.1, 200, 2, 0.02, 200],
    ];
    const rows = mixSupplement216.table.rows;
    expect(rows).toHaveLength(data.length);
    const kinds: string[] = [];
    data.forEach(([a, ca, va, b, cb, vb], i) => {
      const h = Math.round(a * ca * va * 1000) / 1e6; // mol
      const oh = Math.round(b * cb * vb * 1000) / 1e6;
      expect(rows[i][2]).toContain(`= ${tr(h, 3)} mol`);
      expect(rows[i][3]).toContain(`= ${tr(oh, 3)} mol`);
      const excess = Math.abs(h - oh);
      if (excess < 1e-12) { kinds.push("eş"); expect(rows[i][4]).toMatch(/^Artan yok: eşdeğerlik/); }
      else {
        const conc = excess / ((va + vb) / 1000);
        kinds.push(h > oh ? "asidik" : "bazik");
        expect(rows[i][4]).toBe(`${tr(excess, 3)} mol ${h > oh ? "H⁺" : "OH⁻"} artar; ${tr(excess, 3)}/${tr((va + vb) / 1000, 3)} = ${tr(conc)} mol/L; ${h > oh ? "asidik" : "bazik"}`);
      }
    });
    expect(kinds).toEqual(["eş", "asidik", "eş", "eş", "bazik", "asidik"]);
    expect(rows.filter((r) => r[4].startsWith("Artan yok")).map((r) => r[4].match(/eşdeğerlik, (\S+) oluşur/)![1])).toEqual(["NaCl", "Na₂SO₄", "Ca(NO₃)₂"]);
  });

  it("recomputes the metal table from charges and textbook activity", () => {
    const facts: [string, number, boolean, boolean][] = [
      ["Mg", 2, true, false], ["Fe", 2, true, false], ["Zn", 2, true, true], ["Al", 3, true, true],
      ["Cu", 0, false, false], ["Ag", 0, false, false], ["Au", 0, false, false],
    ];
    const rows = metalSupplement216.table.rows;
    facts.forEach(([sym, z, acid, base], i) => {
      expect(rows[i][0].startsWith(sym)).toBe(true);
      if (!acid) { expect(rows[i][1]).toBe("H₂ çıkmaz"); expect(rows[i][4]).toBe("0"); }
      else {
        // Denklem atom ve yük denkliği: metal k, HCl k·z, tuz MClz, H₂ k·z/2.
        const k = z % 2 ? 2 : 1;
        expect(rows[i][1]).toBe(`${k > 1 ? k : ""}${sym} + ${k * z}HCl → ${k > 1 ? k : ""}${sym}Cl${sub(z)} + ${k * z / 2 > 1 ? k * z / 2 : ""}H₂`);
        expect(rows[i][4]).toContain(`asitte ${String(z / 2).replace(".", ",")} mol`);
      }
      if (base) {
        const k = z % 2 ? 2 : 1;
        const oh = k * (4 - z); const w = k * z; const h2 = k * z / 2;
        // O ve H sayımı.
        expect(oh + w).toBe(4 * k);
        expect(oh + 2 * w).toBe(4 * k + 2 * h2);
        expect(rows[i][2]).toContain(`${oh}OH⁻ + ${w}H₂O`);
        expect(rows[i][4]).toContain(`bazda ${String(z / 2).replace(".", ",")} mol`);
      } else expect(rows[i][2]).toBe("H₂ çıkmaz");
    });
    expect(rows[3][2]).toBe("2Al + 2OH⁻ + 6H₂O → 2[Al(OH)₄]⁻ + 3H₂");
    expect(rows[2][2]).toBe("Zn + 2OH⁻ + 2H₂O → [Zn(OH)₄]²⁻ + H₂");
    expect(rows.map((r) => r[3])).toEqual(["aktif metal", "aktif metal", "amfoter metal", "amfoter metal", "yarı soy metal", "yarı soy metal", "soy metal"]);
  });

  it("recomputes the everyday equivalents", () => {
    // Ders kitabı: asetik asit 1, sitrik asit 3 asidik H; HCO₃⁻ 1, CO₃²⁻ 2 H⁺ tüketir.
    const facts: [string, number, "asit" | "baz"][] = [
      ["CH₃COOH", 1, "asit"], ["C₆H₈O₇", 3, "asit"], ["HCl", 1, "asit"],
      ["NaHCO₃", 1, "baz"], ["Na₂CO₃", 2, "baz"], ["NaOH", 1, "baz"], ["Ca(OH)₂", 2, "baz"],
    ];
    const rows = dailySupplement216.table.rows;
    facts.forEach(([formula, eq, role], i) => {
      expect(rows[i][1].endsWith(formula)).toBe(true);
      const hAtoms = parse(formula).H ?? 0;
      if (role === "asit") {
        expect(eq).toBeLessThanOrEqual(hAtoms);
        expect(rows[i][4]).toBe(`${tr(0.1 * eq)} mol H⁺ → ${tr(0.1 * eq / 2)} mol CaCO₃ çözer`);
        if (eq < hAtoms) expect(rows[i][3]).toContain(`(${hAtoms} H atomundan)`);
      } else {
        expect(rows[i][4].startsWith(`${tr(0.1 * eq)} mol HCl`)).toBe(true);
        expect(rows[i][4].includes("CO₂")).toBe(Boolean(parse(formula).C));
      }
    });
    expect(molar("CaCO₃")).toBe(100);
  });

  it("recomputes every saponification row", () => {
    const data: [number, number, string][] = [[0.1, 0.3, "NaOH"], [0.1, 0.24, "NaOH"], [0.1, 0.45, "NaOH"], [0.05, 0.15, "KOH"], [0.2, 0.54, "KOH"]];
    const rows = saponSupplement216.table.rows;
    data.forEach(([fat, base, b], i) => {
      const extent = Math.min(fat, base / 3);
      expect(rows[i][2]).toBe(`${tr(3 * extent)} mol ${b === "NaOH" ? "RCOONa" : "RCOOK"}`);
      expect(rows[i][3]).toBe(`${tr(extent)} mol`);
      const fatLeft = fat - extent; const baseLeft = base - 3 * extent;
      expect(rows[i][4]).toBe(fatLeft > 1e-9 ? `${tr(fatLeft)} mol yağ` : baseLeft > 1e-9 ? `${tr(baseLeft)} mol ${b}` : "yok");
    });
  });

  it("checks every new example answer", () => {
    // Tuz: Fe³⁺ + SO₄²⁻.
    expect(saltExamples216[0].answer).toBe("Fe₂(SO₄)₃ (demir(III) sülfat); 0,10 mol Fe³⁺, 0,15 mol SO₄²⁻, toplam 0,25 mol iyon.");
    expect(2 * 3 + 3 * -2).toBe(0);
    // NaOH pH: 0,40 g / 40 = 0,01 mol; /10 L = 1e-3; Kw/[OH⁻] = 1e-11.
    const oh = 0.4 / molar("NaOH") / 10;
    expect(-Math.log10(1e-14 / oh)).toBeCloseTo(11, 10);
    expect(saltExamples216[1].answer).toBe("[OH⁻] = 10⁻³ mol/L, [H₃O⁺] = 10⁻¹¹ mol/L, pH = 11; bazik.");
    // Tepkimeler: 0,15·0,200 = 0,030 mol H₂SO₄ → 0,060 mol NaOH → 0,060/0,30 L.
    expect(Math.round((2 * 0.15 * 0.2) / 0.3 * 1000)).toBe(200);
    expect(mixExamples216[0].answer).toBe("200 mL NaOH; 0,030 mol Na₂SO₄ oluşur.");
    const hTotal = 0.2 * 0.1 + 2 * 0.1 * 0.1;
    expect(Math.round(hTotal / 0.5 * 1000)).toBe(80);
    expect(tr(0.5 * 0.1 - hTotal, 3)).toBe("0,010");
    expect(mixExamples216[1].answer).toBe("80 mL NaOH; 100 mL eklenince 0,010 mol OH⁻ artar ve ortam bazik olur.");
    // Metaller: bazda yalnız Al (1,5 H₂/mol).
    const al = 0.15 / 1.5; const mg = 0.35 - al * 1.5;
    expect([tr(mg * 24, 1), tr(al * 27, 1)]).toEqual(["4,8", "2,7"]);
    expect(metalExamples216[0].answer).toBe("4,8 g Mg ve 2,7 g Al; örnek 7,5 g.");
    const acidH2 = 0.1 * (1 + 1 + 1.5 + 0); const baseH2 = 0.1 * (0 + 1 + 1.5 + 0);
    expect([tr(acidH2 * 22.4), tr(baseH2 * 22.4, 1)]).toEqual(["7,84", "5,6"]);
    expect(metalExamples216[1].answer).toBe("A: 7,84 L H₂; B: 5,6 L H₂.");
    // Günlük: sirke 0,30 mol asit, 0,20 mol CaCO₃, 2 : 1.
    const dissolved = Math.min(0.3 / 2, 0.2);
    expect([tr(dissolved), tr(0.2 - dissolved), tr(dissolved * 22.4)]).toEqual(["0,15", "0,05", "3,36"]);
    expect(dailyExamples216[0].answer).toBe("0,15 mol CaCO₃ çözünür, 0,05 mol kalır; 3,36 L CO₂ çıkar.");
    expect([0.06 * 3 / 2 * molar("CaCO₃"), 0.06 * 1 / 2 * molar("CaCO₃")].map((x) => Math.round(x * 100) / 100)).toEqual([9, 3]);
    expect(dailyExamples216[1].answer).toBe("Sitrik asitli kapta 9 g, asetik asitli kapta 3 g CaCO₃ çözünür.");
    // Sabun: 0,02 mol yağ → 0,06 mol sabun; 0,025 mol Ca²⁺ 0,05 mol bağlar.
    expect([tr(0.025, 3), tr(0.06 - 2 * 0.025)]).toEqual(["0,025", "0,01"]);
    expect(saponExamples216[0].answer).toBe("0,025 mol çökelek; 0,01 mol sabun anyonu serbest kalır.");
    // Tristearin: formülden mol kütleleri, kütle korunumu.
    const [fat, naoh, soap, gly] = ["C₅₇H₁₁₀O₆", "NaOH", "C₁₈H₃₅O₂Na", "C₃H₈O₃"].map(molar);
    expect([fat, naoh, soap, gly]).toEqual([890, 40, 306, 92]);
    expect(fat + 3 * naoh).toBe(gly + 3 * soap);
    const n = 89 / fat;
    expect([3 * n * naoh, 3 * n * soap, n * gly].map((x) => tr(x, 0))).toEqual(["12", "91,8", "9,2"]);
    expect(saponExamples216[1].answer).toBe("12 g NaOH gerekir; 91,8 g sodyum stearat ve 9,2 g gliserol oluşur.");
  });
});
