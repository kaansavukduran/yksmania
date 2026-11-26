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
  concExamples224, concSupplement224, envExamples224, envSupplement224, mixExamples224, mixSupplement224,
  sepExamples224, sepSupplement224, waterExamples224, waterSupplement224,
} from "../src/learning/depth224";

const added = [
  ["karisim-sinif-cozunme", mixSupplement224, mixExamples224, 8, 4],
  ["cozelti-derisimi", concSupplement224, concExamples224, 8, 4],
  ["koligatif-ayirma", sepSupplement224, sepExamples224, 15, 4],
  ["su-hayat-cevre", waterSupplement224, waterExamples224, 9, 4],
  ["doga-ve-kimya", envSupplement224, envExamples224, 9, 4],
] as const;

/* Bağımsız yazım: kesin ondalık, Türkçe virgül (modülün biçimlendiricisini kullanmaz). */
const tr = (x: number, digits = 6) => {
  const s = (Math.round(x * 10 ** digits) / 10 ** digits).toString();
  return s.replace("-", "−").replace(".", ",");
};
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const parse = (formula: string): Record<string, number> => {
  const plain = formula.replace(/[₀-₉]/g, (c) => String(SUB.indexOf(c)));
  const out: Record<string, number> = {};
  for (const m of plain.matchAll(/([A-Z][a-z]?)(\d*)/g)) out[m[1]] = (out[m[1]] ?? 0) + Number(m[2] || 1);
  return out;
};
const MASS: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, S: 32, Cl: 35.5, Ca: 40 };
const molar = (formula: string) => Object.entries(parse(formula)).reduce((s, [el, n]) => s + MASS[el] * n, 0);
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;
/** "2SO₂ + O₂" → atom sayımı. */
const sideCount = (side: string) => {
  const out: Record<string, number> = {};
  for (const term of side.split(" + ")) {
    const m = term.match(/^(\d*)(.+)$/)!;
    const k = Number(m[1] || 1);
    for (const [el, n] of Object.entries(parse(m[2]))) out[el] = (out[el] ?? 0) + k * n;
  }
  return out;
};

describe("depth 0.224.0 TYT Kimya karışım, derişim, ayırma, su ve çevre", () => {
  it("appends one table section and two examples without touching the accepted guide", () => {
    for (const [id, supplement, examples, rawSections, rawExamples] of added) {
      const raw = lessonGuides.get(id)!;
      expect(raw.sections).toHaveLength(rawSections);
      expect(raw.examples).toHaveLength(rawExamples);
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
      expect(JSON.stringify({ supplement, examples })).not.toMatch(/NaN|undefined|Infinity|\[object/);
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
      expect(calls.length).toBeGreaterThanOrEqual(3);
      for (const [value, step] of calls) {
        const frame = def.draw(value, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout?.length).toBeGreaterThan(0);
      }
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: supplement.figureTitle }));
      expect(html).toContain('role="img"');
    }
  });

  it("classifies every mixture row from phases and particle scale", () => {
    // [örnek, dağılan faz, dağıtıcı faz, ölçek] → sınıf (okul kuralı, bağımsız yazılmış).
    const facts: [string, string, string, "mol" | "kol" | "büyük", string][] = [
      ["Tuzlu su", "katı", "sıvı", "mol", "Çözelti"], ["Hava", "gaz", "gaz", "mol", "Çözelti"], ["Pirinç (alaşım)", "katı", "katı", "mol", "Çözelti"],
      ["Çamurlu su", "katı", "sıvı", "büyük", "Süspansiyon"], ["Çalkalanmış zeytinyağı-su", "sıvı", "sıvı", "büyük", "Emülsiyon"],
      ["Sis", "sıvı", "gaz", "büyük", "Aerosol"], ["Duman", "katı", "gaz", "kol", "Aerosol"], ["Süt", "sıvı", "sıvı", "kol", "Kolloid"],
    ];
    const rows = mixSupplement224.table.rows;
    expect(rows).toHaveLength(facts.length);
    facts.forEach(([ex, dp, mp, scale, kind], i) => {
      expect(rows[i][0]).toBe(ex);
      expect(rows[i][1]).toMatch(new RegExp(`\\(${dp}\\) → .+ \\(${mp}\\)$`));
      const expected = scale === "mol" ? "Çözelti" : mp === "gaz" ? "Aerosol" : scale === "kol" ? "Kolloid" : dp === "katı" ? "Süspansiyon" : "Emülsiyon";
      expect(expected).toBe(kind);
      expect(rows[i][3]).toBe(kind);
      expect(rows[i][4].startsWith(kind === "Çözelti" ? "Homojen" : "Heterojen")).toBe(true);
    });
    expect(mixExamples224[0].answer).toBe("K çözelti, L süspansiyon, M aerosol, N çözelti; 2 tanesi homojen.");
    // Boyut modeli: < 1 nm çözelti, 1–1000 nm kolloid, > 1000 nm büyük.
    const band = (nm: number) => (nm < 1 ? "çözelti" : nm <= 1000 ? "kolloid" : "süspansiyon");
    expect([0.5, 200, 5000].map(band)).toEqual(["çözelti", "kolloid", "süspansiyon"]);
    expect(mixExamples224[1].answer).toBe("X çözelti, Y kolloid, Z süspansiyon; tekdüze görünüp çözelti olmayan Y.");
  });

  it("recomputes every concentration row", () => {
    const rows = concSupplement224.table.rows;
    const results = [
      (25 / (25 + 225)) * 100, (40 / 200) * 100, 6 / 2,
      8 / molar("NaOH") / 0.5, 11.7 / molar("NaCl") / 0.25, 9 / molar("C₆H₁₂O₆") / 0.1,
      (0.6 * 100) / 300, (0.3 * 0.2 + 0.8 * 0.3) / 0.5,
    ];
    expect([molar("NaOH"), molar("NaCl"), molar("C₆H₁₂O₆")]).toEqual([40, 58.5, 180]);
    expect(rows.map((r) => r[1])).toEqual(["Kütlece yüzde", "Hacimce yüzde", "ppm (mg/kg)", "Molarite", "Molarite", "Molarite", "Seyreltme", "Karıştırma"]);
    rows.forEach((r, i) => {
      const unit = i < 2 ? "%" : i === 2 ? "" : "";
      const text = i < 2 ? `${unit}${tr(results[i])}` : i === 2 ? `${tr(results[i])} ppm` : `${tr(results[i])} mol/L`;
      expect(r[3]).toBe(text);
    });
    expect(rows[3][2]).toBe("n = 8/40 = 0,2 mol; 0,2/0,5 L");
    expect(rows[6][2]).toBe("0,6·100 = M₂·300");
    // Düz ortalama yanlış: (0,3 + 0,8)/2 = 0,55 ≠ 0,6.
    expect(close((0.3 + 0.8) / 2, results[7])).toBe(false);
    // Örnekler.
    const v2 = (2 * 50) / 0.5;
    expect([v2, v2 - 50, 2 * 0.05 * molar("NaOH")]).toEqual([200, 150, 4]);
    expect(concExamples224[0].answer).toBe("Son hacim 200 mL; yaklaşık 150 mL su eklenir; çözeltide 4 g NaOH vardır.");
    const x = (500 * (0.6 - 0.36)) / (0.6 - 0.2);
    expect(Math.round(x)).toBe(300);
    expect(close(0.2 * 0.3 + 0.6 * 0.2, 0.36 * 0.5)).toBe(true);
    expect(concExamples224[1].answer).toBe("300 mL 0,2 mol/L ve 200 mL 0,6 mol/L çözelti.");
  });

  it("recomputes the separation table and the colligative particle counts", () => {
    const rows = sepSupplement224.table.rows;
    expect(rows.map((r) => r[0])).toEqual(["Eleme", "Süzme", "Mıknatısla ayırma", "Ayırma hunisi", "Basit damıtma", "Ayrımsal damıtma", "Ayrımsal kristallendirme", "Özütleme"]);
    expect(rows[3][1]).toMatch(/Karışmama ve yoğunluk/);
    expect(rows[4][3]).toMatch(/tuz ilk kapta kalır/);
    // Formül başına tanecik: şeker 1, NaCl 2, CaCl₂ 3 (tam ayrışma).
    const i: Record<string, number> = { "C₁₂H₂₂O₁₁": 1, NaCl: 2, "CaCl₂": 3, "C₆H₁₂O₆": 1 };
    expect(i.NaCl).toBe(parse("NaCl").Na + parse("NaCl").Cl);
    expect(i["CaCl₂"]).toBe(parse("CaCl₂").Ca + parse("CaCl₂").Cl);
    const freeze = ([["C₁₂H₂₂O₁₁", 34.2], ["NaCl", 11.7], ["CaCl₂", 11.1]] as const).map(([f, g]) => -1.86 * (g / molar(f)) * i[f]);
    expect(freeze.map((t) => tr(t))).toEqual(["−0,186", "−0,744", "−0,558"]);
    expect(sepExamples224[0].answer).toBe("NaCl −0,744 °C < CaCl₂ −0,558 °C < şeker (sakkaroz) −0,186 °C; en düşük donma noktası NaCl çözeltisindedir.");
    const molal = ([["CaCl₂", 22.2, 2], ["NaCl", 8.775, 1], ["C₆H₁₂O₆", 54, 1]] as const).map(([f, g, kg]) => (g / molar(f)) * i[f] / kg);
    molal.forEach((m) => expect(close(m, 0.3)).toBe(true));
    expect(tr(100 + 0.52 * 0.3)).toBe("100,156");
    expect(sepExamples224[1].answer).toBe("Üçü de 100,156 °C’de kaynamaya başlar (ΔTb = 0,52·0,3 = 0,156 °C).");
  });

  it("recomputes the water property table and examples from the CRC values", () => {
    // CRC: c = 4,1813 J/(g·K) → 4,18; ΔHerime 6,01 kJ/mol, ΔHbuhar 40,65 kJ/mol, M = 18,015 g/mol.
    expect(Math.round(6010 / 18.015)).toBe(334);
    expect(Math.round(40650 / 18.015)).toBe(2256);
    const rows = waterSupplement224.table.rows;
    expect(rows[0][2]).toBe("1 kg su 1 °C ısınırken 1000·4,18 = 4,18 kJ alır");
    expect(rows[1][2]).toContain("334 kJ");
    expect(rows[2][2]).toBe(`10 g su buharlaşırken 10·2256 = ${tr(22560 / 1000)} kJ alır`);
    expect(rows[3][2]).toContain(`%${tr(0.917 * 100)} kadarı`);
    expect(rows).toHaveLength(6);
    expect(tr(334 + 4.18 * 100 + 2256)).toBe("3008");
    expect(waterSupplement224.summary).toContain("334 + 418 + 2256 = 3008 J");
    expect(waterExamples224[0].answer).toBe(`${50 * 334 + 50 * 4.18 * 20} J (20,88 kJ); erime basamağı (16700 J) ısınmadan (4180 J) daha çok enerji ister.`);
    const mass = 2000 * 0.917;
    expect(tr(mass)).toBe("1834");
    expect(waterExamples224[1].answer).toBe(`1834 cm³ suyun altında, ${tr(2000 - mass)} cm³ (%${tr(((2000 - mass) / 2000) * 100)}) suyun üstünde.`);
  });

  it("rebalances every environmental reaction and the examples", () => {
    const rows = envSupplement224.table.rows;
    let count = 0;
    for (const r of rows) {
      for (const step of r[3].split("; ")) {
        const [l, rr] = step.replace(/ \(.+\)$/, "").split(" → ");
        expect(sideCount(l)).toEqual(sideCount(rr));
        count += 1;
      }
    }
    expect(count).toBe(11);
    rows.filter((r) => r[0].startsWith("Asit yağmuru")).forEach((r) => expect(r[1]).not.toContain("CO₂"));
    // Kükürt: 64 g S → 2 mol → 2 mol H₂SO₄ (98 g/mol); O₂: 2 + 1.
    expect(molar("H₂SO₄")).toBe(98);
    const n = 64 / 32;
    expect(envExamples224[0].answer).toBe(`${n} mol SO₂; en çok ${n * 98} g H₂SO₄; ${n + n / 2} mol O₂ harcanır.`);
    // Ozon: Cl + O₃ → ClO + O₂ ve ClO + O → Cl + O₂ toplamı.
    const net = { Cl: -1 + 1, O3: -1, ClO: 1 - 1, O2: 2, O: -1 };
    expect([net.Cl, net.ClO]).toEqual([0, 0]);
    expect(envExamples224[1].answer).toBe("Net O₃ + O → 2O₂; Cl ve ClO net tepkimede görünmez (Cl katalizör, ClO ara ürün); 1000 döngüde 1000 O₃ parçalanır.");
  });
});
