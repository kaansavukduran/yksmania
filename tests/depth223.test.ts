import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { depthFigures223 } from "../src/learning/sectionFigures/depthFigures223";
import {
  BOIL_CLAIMS223, BOIL_FACTORS223, CHANGES223, GAS_CASES223, SOLIDS223, SOLID_CLAIMS223, UNKNOWN_SOLIDS223, VAPOUR_CASES223, WATER_VP223,
  addCompressP223, addCompressV223, boilExamples223, boilSupplement223, changeExamples223, changeSupplement223, gasExamples223, gasPair223,
  gasSupplement223, heatedOutcomes223, maxVolume223, parseFormula223, particlePair223, solidExamples223, solidSupplement223, twoStepP223,
  twoStepV223, vapourExamples223, vapourSupplement223,
} from "../src/learning/depth223";

const lessons223 = {
  "gazlar-hal-degisim-plazma": [gasSupplement223, gasExamples223],
  "buharlasma-buhar-basinci": [vapourSupplement223, vapourExamples223],
  "kaynama-bagil-nem": [boilSupplement223, boilExamples223],
  "katilar-viskozite": [solidSupplement223, solidExamples223],
  "fiziksel-kimyasal-degisimler": [changeSupplement223, changeExamples223],
} as const;

// Bağımsız model: dersin değerleri ayrıca yazılır.
const R = 0.082057;
const M = 18;
const P_STAR: Record<number, number> = { 25: 23.8, 50: 92.5, 70: 233.7, 100: 760 };
const close = (a: number, b: number, eps = 1e-9) => expect(Math.abs(a - b)).toBeLessThan(eps);

describe("TYT Kimya maddenin hâlleri derinleştirmesi 0.223.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons223)) {
      const raw = lessonGuides.get(id)!;
      expect(raw, id).toBeDefined();
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
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
      expect(new Set(revised.sections.map(({ title }) => title))).toEqual(new Set(raw.sections.map(({ title }) => title)));
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      // Kopya Kâğıdı: aynı tablo, kısa özet, figür başlığı, örnekler ve uyarılar.
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
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|null|Infinity/);
      // Figür yeni bölüm başlığıyla kayıtlı ve her adımda çizilebiliyor.
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBe(depthFigures223[id][added.title]);
      expect(figure!.steps!.length).toBeGreaterThan(1);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the earlier section figures of the five lessons", () => {
    for (const id of Object.keys(lessons223)) expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
  });

  it("recomputes every gas row from the TYT proportions with T = t + 273", () => {
    const K = (t: number) => t + 273;
    expect(gasSupplement223.table.rows).toEqual([
      ["Rijit kap ısıtılır", "V, n", "P = 2 atm", "t: 27 → 177 °C (T: 300 → 450 K)", "P = 3 atm (P/T sabit)"],
      ["Pistonlu kap ısıtılır", "P, n", "V = 2 L", "t: 27 → 327 °C (T: 300 → 600 K)", "V = 4 L (V/T sabit)"],
      ["Celsius tuzağı", "P, n", "V = 2 L", "t: 27 → 54 °C (T: 300 → 327 K)", "V = 2,18 L (V/T sabit)"],
      ["Sabit sıcaklıkta sıkıştırma", "T, n", "P = 1 atm", "V: 6 → 2 L", "P = 3 atm (P·V sabit)"],
      ["Rijit kaba gaz eklenir", "V, T", "P = 1,5 atm", "n: 0,2 → 0,3 mol", "P = 2,25 atm (P/n sabit)"],
      ["Pistonlu kaba gaz eklenir", "P, T", "V = 10 L", "n: 0,5 → 0,75 mol", "V = 15 L (V/n sabit)"],
    ]);
    // Bağımsız: P₁V₁/(n₁T₁) = P₂V₂/(n₂T₂).
    close(2 * K(177) / K(27), 3); // Gay-Lussac
    close(2 * K(327) / K(27), 4); // Charles
    close(2 * K(54) / K(27), 2.18); // Celsius iki kat, hacim 1,09 kat
    close(1 * 6 / 2, 3); // Boyle
    close(1.5 * 0.3 / 0.2, 2.25);
    close(10 * 0.75 / 0.5, 15); // Avogadro
    expect(GAS_CASES223).toHaveLength(6);
    // Örnekler.
    close(twoStepV223, 4 * K(177) / K(27));
    close(twoStepP223, 1 * K(402) / K(177));
    close((1 * 4) / K(27), (twoStepP223 * twoStepV223) / K(402));
    expect(gasExamples223[0].answer).toBe("Birinci adımdan sonra V = 6 L; ikinci adımdan sonra P = 1,5 atm.");
    close(addCompressV223, 10 * 0.75 / 0.5);
    close(addCompressP223, (1 * 15) / 5);
    expect(gasExamples223[1].answer).toBe("Eklemeden sonra V = 15 L; sıkıştırmadan sonra P = 3 atm.");
  });

  it("recomputes the closed-flask vapour table with the lesson's workshop model", () => {
    const mMax = (t: number, V: number) => ((P_STAR[t] / 760) * V * M) / (R * (t + 273.15));
    const pAll = (t: number, V: number, m: number) => ((m / M) * R * (t + 273.15) / V) * 760;
    for (const [t, p] of WATER_VP223) expect(P_STAR[t]).toBe(p);
    const rows = VAPOUR_CASES223.map(({ celsius, litres, grams }) => {
      const cap = mMax(celsius, litres);
      return grams > cap ? { left: true, p: P_STAR[celsius], cap } : { left: false, p: pAll(celsius, litres, grams), cap };
    });
    expect(rows.map((r) => r.left)).toEqual([false, true, false, false, true, false]);
    expect(rows.map((r) => r.cap.toFixed(4))).toEqual(["0.0230", "0.0230", "0.0691", "0.0826", "0.1966", "0.5879"]);
    expect(rows.map((r) => r.p.toFixed(1))).toEqual(["10.3", "23.8", "17.2", "56.0", "233.7", "323.2"]);
    expect(vapourSupplement223.table.rows.map((r) => r[4])).toEqual([
      "≈ 10,3 mmHg < P*", "23,8 mmHg = P*", "≈ 17,2 mmHg < P*", "≈ 56,0 mmHg < P*", "233,7 mmHg = P*", "≈ 323,2 mmHg < P*",
    ]);
    expect(vapourSupplement223.table.rows[1][3]).toBe(`Sıvı kalır (≈ ${(0.05 - mMax(25, 1)).toFixed(4).replace(".", ",")} g)`);
    // Örnek 1: sınır hacim.
    const vLimit = ((0.05 / M) * R * 298.15) / (23.8 / 760);
    close(maxVolume223, vLimit);
    expect(vLimit.toFixed(2)).toBe("2.17");
    expect(vapourExamples223[0].answer).toMatch(/^Yaklaşık 2,17 L\./);
    // Örnek 2: 1 L, 0,100 g.
    expect(heatedOutcomes223.map((o) => o.liquidLeft)).toEqual([0.1 > mMax(25, 1), 0.1 > mMax(50, 1), 0.1 > mMax(70, 1)]);
    expect(pAll(70, 1, 0.1).toFixed(1)).toBe("118.9");
    expect(vapourExamples223[1].answer).toBe("25 °C ve 50 °C’de sıvı kalır, basınç P* olur (23,8 mmHg ve 92,5 mmHg). 70 °C’de su tükenir, basınç ≈ 118,9 mmHg.");
  });

  it("derives every boiling row from P*(Tk) = Pdış and checks both examples", () => {
    // Bağımsız kural: eşik yönü + (− eğri yönü).
    const word = (s: number) => (s > 0 ? "Yükselir" : s < 0 ? "Düşer" : "Değişmez");
    expect(boilSupplement223.table.rows.map((r) => r[3])).toEqual(BOIL_FACTORS223.map((f) => word(f.threshold - f.curve)));
    expect(boilSupplement223.table.rows.map((r) => r[3])).toEqual(["Düşer", "Yükselir", "Değişmez", "Değişmez", "Yükselir", "Düşer"]);
    const tAt = (p: number) => Number(Object.entries(P_STAR).find(([, q]) => q === p)![0]);
    expect([tAt(760), tAt(233.7), tAt(92.5)]).toEqual([100, 70, 50]);
    expect(boilSupplement223.table.rows[0][4]).toBe("Tk: 100 → 70 °C (MEBİ noktaları)");
    expect(boilSupplement223.table.rows[1][4]).toBe("Tk: 50 → 70 °C (MEBİ noktaları)");
    expect([24000 / 200, 24000 / 300, (2 * 24000) / 200]).toEqual([120, 80, 240]);
    expect(boilSupplement223.table.rows[2][4]).toBe("Q = 24000 J; süre 120 → 80 s");
    expect(boilSupplement223.table.rows[3][4]).toBe("Q = 24000 → 48000 J; süre 120 → 240 s");
    // Örnek 1.
    expect(P_STAR[50] < 233.7 && P_STAR[50] === 92.5).toBe(true);
    expect(boilExamples223[0].answer).toBe("233,7 mmHg’de 50 °C’deki su kaynamaz; bu basınçta 70 °C’de kaynar. Basınç 92,5 mmHg’ye inince 50 °C’de kaynar.");
    // Örnek 2.
    const dirs = BOIL_CLAIMS223.map((c) => c.factor.threshold - c.factor.curve);
    expect(dirs).toEqual([1, 0, 1, -1, 0]);
    expect(boilExamples223[1].answer).toBe("Yükseltenler: I ve III. Düşüren: IV. Değiştirmeyenler: II ve V.");
  });

  it("classifies solids by structure and carriers and checks both examples", () => {
    expect(solidSupplement223.table.rows.map((r) => [r[0], r[3], r[4]])).toEqual([
      ["İyonik", "Katı: yok (iletim çok düşük) / Eriyik: iyonlar", "NaCl"],
      ["Moleküler", "Katı: yok (iletim çok düşük) / Eriyik: yok (iletim çok düşük)", "Buz, kuru buz, iyot"],
      ["Kovalent ağ", "Katı: yok (iletim çok düşük) / Eriyik: bu derste ele alınmadı", "Elmas, kuartz"],
      ["Tabakalı kovalent ağ", "Katı: tabaka boyunca hareketli elektronlar / Eriyik: bu derste ele alınmadı", "Grafit"],
      ["Metalik", "Katı: yayılmış elektronlar / Eriyik: yayılmış elektronlar", "Bakır, demir, gümüş"],
    ]);
    // Bağımsız: katıda iletenler grafit ve metal; metal olmayan iletken var.
    expect(SOLIDS223.filter((s) => s.solidCarriers.length).map((s) => s.example)).toEqual(["Grafit", "Bakır, demir, gümüş"]);
    expect(UNKNOWN_SOLIDS223.map((u) => u.kind)).toEqual(["iyonik", "metalik", "moleküler", "kovalent ağ"]);
    expect(solidExamples223[0].answer).toBe("W iyonik, X metalik, Y moleküler, Z kovalent ağ. Katı hâlde yalnız X iletir; erimiş hâlde iyonlarla iletim W’de başlar.");
    expect(SOLID_CLAIMS223.map((c) => c.holds)).toEqual([false, false, false, true]);
    expect(SOLID_CLAIMS223.map((c) => c.counter?.example ?? "—")).toEqual(["Grafit", "Buz, kuru buz, iyot", "NaCl", "—"]);
    expect(solidExamples223[1].answer).toBe("Yalnız IV doğrudur. Karşı örnekler: I için grafit, II için buz, kuru buz, iyot, III için NaCl.");
  });

  it("counts atoms and charge in every equation and classifies by new species", () => {
    // Bağımsız el sayımı.
    const hand: Record<string, string> = {
      "Buzun erimesi": "2 H, 1 O · yük 0",
      "Kuru buzun süblimleşmesi": "1 C, 2 O · yük 0",
      "Şekerin suda çözünmesi": "12 C, 22 H, 11 O · yük 0",
      "Tuzun suda çözünmesi": "1 Cl, 1 Na · yük 0",
      "Magnezyumun yanması": "2 Mg, 2 O · yük 0",
      "Kireç taşının ısıtılması": "1 C, 1 Ca, 3 O · yük 0",
      "Çinkonun asitte çözünmesi": "2 H, 1 Zn · yük +2",
    };
    expect(changeSupplement223.table.rows.map((r) => [r[0], r[2]])).toEqual(Object.entries(hand));
    expect(changeSupplement223.table.rows.map((r) => r[4])).toEqual(["Fiziksel", "Fiziksel", "Fiziksel", "Fiziksel", "Kimyasal", "Kimyasal", "Kimyasal"]);
    expect(changeSupplement223.table.rows.map((r) => r[3])).toEqual(["Yok", "Yok", "Yok", "Yok", "MgO", "CaO, CO₂", "Zn²⁺, H₂"]);
    expect(CHANGES223).toHaveLength(7);
    expect(parseFormula223("CO₃²⁻")).toEqual({ atoms: { C: 1, O: 3 }, charge: -2 });
    expect(parseFormula223("C₁₂H₂₂O₁₁")).toEqual({ atoms: { C: 12, H: 22, O: 11 }, charge: 0 });
    expect(() => parseFormula223("Ca(OH)₂")).toThrow();
    // Örnek 1: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂, el sayımı 2 Na, 2 H, 2 C, 6 O.
    expect(gasPair223[1].right.map((s) => s.formula)).toEqual(["Na₂CO₃", "H₂O", "CO₂"]);
    expect(changeExamples223[0].answer).toBe("Birinci kap fiziksel, ikinci kap kimyasal değişimdir. İki denklemde de atom ve yük korunur (2. kapta her iki yanda 2 C, 2 H, 2 Na, 6 O · yük 0).");
    // Örnek 2: Cu + 2Ag⁺ (3 → 3), 2H₂O → 2H₂ + O₂ (2 → 3).
    expect(particlePair223.map((c) => [c.left, c.right].map((side) => side.reduce((t, s) => t + s.coef, 0)))).toEqual([[3, 3], [2, 3]]);
    expect(changeExamples223[1].answer).toBe("İkisi de kimyasaldır. A’da tanecik sayısı 3 = 3 korunur ama Cu²⁺ ve Ag oluşur; B’de 2 → 3 olur.");
  });
});
