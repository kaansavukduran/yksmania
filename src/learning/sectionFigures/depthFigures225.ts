import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { rect } from "./mathFigures060TytKit";
import { pad } from "./physicsFigures058Kit";
import {
  countedRows225, eraGroups225, eraShort225, formulaText225, historyRows225, historySection225, monomerCounted225,
  monomerSection225, notationSection225, notationText225, resinCodes225, resinElements225, resinSection225,
} from "../depth225";

/*
 * 0.225 TYT Kimya tablo bölümlerinin çizimleri. Kutular, çubuk uzunlukları
 * ve okumalar tabloyu üreten aynı depth225 verilerinden gelir. Çizimler
 * şematiktir; adım değiştirmek öğrenme kaydı üretmez.
 */

const check225 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures225: ${claim}`);
};
const tr = (n: number) => String(n).replace(".", ",");

/* ---------- Simya: üç dönem sütunu, yedi kişi ---------- */

const COLW = 3.3;
const GAP = 0.35;
const BOXH = 0.72;
const ROWGAP = 0.28;
check225(eraShort225.length === eraGroups225.length, "her dönem grubunun kısa adı olmalı");
const maxInEra = Math.max(...eraGroups225.map((e) => historyRows225.filter((r) => r.era === e).length));
const historyFigure: FigureDef = {
  caption: "Üç sütun üç dönem grubudur ve soldan sağa zaman sırasıyla dizilir; sütun içindeki sıra dersteki anılış sırasıdır. Dolu kutu seçili kişidir; alttaki kutu katkının türünü yazar.",
  alt: `Yedi adımlı dönem şeması. ${eraGroups225.map((e) => `${e}: ${historyRows225.filter((r) => r.era === e).map((r) => r.name).join(", ")}`).join("; ")}.`,
  steps: historyRows225.map((r) => r.short),
  draw: (_value, step) => {
    const cur = historyRows225[step];
    const els: El[] = [];
    eraGroups225.forEach((era, c) => {
      const x = c * (COLW + GAP);
      const on = era === cur.era;
      els.push(txt(v(x + COLW / 2, 0.55), eraShort225[c], "c", { small: true, bold: true, tone: on ? "a" : "muted" }));
      historyRows225.filter((r) => r.era === era).forEach((r, i) => {
        const y = -i * (BOXH + ROWGAP) - BOXH;
        const sel = r === cur;
        els.push(
          poly([v(x, y), v(x + COLW, y), v(x + COLW, y + BOXH), v(x, y + BOXH)], sel ? { tone: "a", fill: "a", bold: true } : { tone: "muted", thin: true }),
          txt(v(x + COLW / 2, y + BOXH / 2), r.short, "c", { small: true, bold: sel, tone: "ink" }),
        );
      });
    });
    const right = 3 * COLW + 2 * GAP;
    const axisY = -maxInEra * (BOXH + ROWGAP) - 0.15;
    els.push(vec(v(0, axisY), v(right, axisY), { tone: "muted" }), txt(v(right, axisY - 0.35), "zaman", "e", { small: true, tone: "muted" }));
    const kindY = axisY - 1.6;
    els.push(rect(0, kindY, right, 0.8, "c"), txt(v(right / 2, kindY + 0.4), `Katkının türü: ${cur.kind}`, "c", { small: true, bold: true, tone: "ink" }));
    return {
      els: [...els, ...pad(-0.2, 0.95, right + 0.2, kindY - 0.2)],
      readout: [`${cur.name} · ${cur.era}`, `Katkı: ${cur.contribution}.`, `Dikkat: ${cur.caution}`],
    };
  },
};

/* ---------- Sembolik dil: bir birim ve toplam çubukları ---------- */

const BAR_MAX = 8;
const NAME_X = -0.3;
const maxTotal = Math.max(...countedRows225.flatMap((c) => Object.values(c.total)));
const notationFigure: FigureDef = {
  caption: "Her adım tablodaki bir gösterimdir. Her elementin üst çerçeveli çubuğu bir birimdeki, alt dolu çubuğu katsayıyla bütün gösterimdeki atom sayısıdır. Satır sayısı element türü sayısıdır ve katsayıyla değişmez.",
  alt: `Sekiz adımlı çubuk grafiği. ${countedRows225.map((c) => `${notationText225(c.notation)}: ${c.elements.map((el) => `${el} ${c.perUnit[el]}/${c.total[el]}`).join(", ")}`).join("; ")}.`,
  steps: countedRows225.map((c) => notationText225(c.notation)),
  draw: (_value, step) => {
    const c = countedRows225[step];
    const els: El[] = [];
    c.elements.forEach((el, i) => {
      const y = -i * 1.45;
      const a = (BAR_MAX * c.perUnit[el]) / maxTotal;
      const b = (BAR_MAX * c.total[el]) / maxTotal;
      els.push(
        txt(v(NAME_X, y - 0.14), el, "w", { bold: true, tone: "ink" }),
        poly([v(0, y), v(a, y), v(a, y + 0.32), v(0, y + 0.32)], { tone: "b", thin: true }),
        txt(v(a + 0.12, y + 0.16), String(c.perUnit[el]), "e", { small: true, tone: "ink" }),
        rect(0, y - 0.6, b, 0.32, "a"),
        txt(v(b + 0.12, y - 0.44), String(c.total[el]), "e", { small: true, bold: true, tone: "ink" }),
      );
    });
    const bottom = -(c.elements.length - 1) * 1.45 - 0.75;
    return {
      els: [...els, ...pad(-0.9, 0.45, BAR_MAX + 0.8, bottom)],
      legend: [
        { code: "▭", label: "bir birim", tone: "b" },
        { code: "■", label: `toplam (×${c.coefficient})`, tone: "a" },
      ],
      readout: [
        `${notationText225(c.notation)} · ${c.name}`,
        `Element türü: ${c.elements.join(", ")} → ${c.elements.length}.`,
        `Bir birim ${c.unitAtoms} atom; gösterimde ${c.coefficient} × ${c.unitAtoms} = ${c.totalAtoms} atom.`,
      ],
    };
  },
};

/* ---------- Polimer: monomer ve tekrar birimi ayna çubukları ---------- */

const HALF = 0.7;
const MBAR = 3.6;
const maxAtom = Math.max(...monomerCounted225.flatMap((r) => Object.values(r.monomerAtoms)));
const monomerFigure: FigureDef = {
  caption: "Her adım tablodaki bir monomerdir. Üstte monomer ve tekrar birimi yazılıdır. Ortadaki sütun elementleri, soldaki çubuk monomerdeki, sağdaki çubuk tekrar birimindeki atom sayısını gösterir; katılmada iki çubuk hep eşittir.",
  alt: `Beş adımlı ayna çubuk grafiği. ${monomerCounted225.map((r) => `${r.monomer} ${r.monomerStructure} → ${r.abbr} ${r.repeat}: ${Object.entries(r.repeatAtoms).map(([el, k]) => `${el} ${k}`).join(", ")}`).join("; ")}.`,
  steps: monomerCounted225.map((r) => r.abbr),
  draw: (_value, step) => {
    const r = monomerCounted225[step];
    const L = -HALF - MBAR / 2 - 0.15;
    const R = HALF + MBAR / 2 + 0.15;
    const els: El[] = [
      txt(v(L, 1.9), r.monomer, "c", { small: true, bold: true, tone: "a" }),
      txt(v(L, 1.3), r.monomerStructure, "c", { tone: "ink" }),
      txt(v(R, 1.9), r.abbr, "c", { small: true, bold: true, tone: "b" }),
      txt(v(R, 1.3), r.repeat, "c", { tone: "ink" }),
      vec(v(-0.4, 1.6), v(0.4, 1.6), { tone: "ink" }),
    ];
    Object.keys(r.monomerAtoms).forEach((el, i) => {
      const y = -i * 0.95;
      const a = (MBAR * r.monomerAtoms[el]) / maxAtom;
      const b = (MBAR * r.repeatAtoms[el]) / maxAtom;
      els.push(
        rect(-HALF - a, y - 0.26, a, 0.52, "a"),
        rect(HALF, y - 0.26, b, 0.52, "b"),
        txt(v(0, y), el, "c", { small: true, bold: true, tone: "ink" }),
        txt(v(-HALF - a - 0.12, y), String(r.monomerAtoms[el]), "w", { small: true, tone: "ink" }),
        txt(v(HALF + b + 0.12, y), String(r.repeatAtoms[el]), "e", { small: true, tone: "ink" }),
      );
    });
    const bottom = -(Object.keys(r.monomerAtoms).length - 1) * 0.95 - 0.55;
    return {
      els: [...els, ...pad(-HALF - MBAR - 0.9, 2.3, HALF + MBAR + 0.9, bottom)],
      readout: [
        `${r.monomer} ${r.monomerStructure} → ${r.abbr}: ${r.polymer}`,
        `Tekrar birimi ${r.repeat} = ${formulaText225(r.formula)}, ${tr(r.massDu / 10)} u.`,
        `Örnek kullanım: ${r.use}.`,
      ],
    };
  },
};

/* ---------- Ambalaj kodu: üçgen, kod şeridi ve element kutuları ---------- */

const TRI = 1.3;
const resinTone = (el: string): Tone => (el === "C" || el === "H" ? "b" : "warn");
const resinFigure: FigureDef = {
  caption: "Her adım bir koddur. Üçgenin içindeki sayı kodu, altındaki kısaltma malzemeyi verir. Sağdaki kutular tekrar birimindeki elementlerdir; C ve H dışındaki element turuncu çerçevelidir. Alttaki şerit altı kodun hangisinin seçili olduğunu gösterir.",
  alt: `Altı adımlı kod şeması. ${resinCodes225.map((r) => `${r.code}: ${r.abbr}, ${formulaText225(r.repeatFormula)}`).join("; ")}.`,
  steps: resinCodes225.map((r) => `${r.code} ${r.abbr}`),
  draw: (_value, step) => {
    const r = resinCodes225[step];
    const A = v(0, TRI * 1.6);
    const B = v(-TRI, 0);
    const C = v(TRI, 0);
    const els: El[] = [
      vec(A, C, { tone: "a", bold: true }),
      vec(C, B, { tone: "a", bold: true }),
      vec(B, A, { tone: "a", bold: true }),
      txt(v(0, TRI * 0.6), String(r.code), "c", { bold: true, tone: "ink" }),
      txt(v(0, -0.45), r.abbr, "c", { bold: true, tone: "ink" }),
      txt(v(2.2, 1.85), formulaText225(r.repeatFormula), "e", { bold: true, tone: "ink" }),
    ];
    resinElements225(r).forEach((el, i) => {
      const x = 2.2 + i * 1.05;
      els.push(poly([v(x, 0.55), v(x + 0.85, 0.55), v(x + 0.85, 1.3), v(x, 1.3)], { tone: resinTone(el), thin: el === "C" || el === "H", bold: el !== "C" && el !== "H" }), txt(v(x + 0.425, 0.92), el, "c", { small: true, bold: true, tone: "ink" }));
    });
    resinCodes225.forEach((x, i) => {
      const sx = -TRI + i * 0.95;
      const sel = x === r;
      els.push(poly([v(sx, -1.55), v(sx + 0.8, -1.55), v(sx + 0.8, -0.95), v(sx, -0.95)], sel ? { tone: "a", fill: "a", bold: true } : { tone: "muted", thin: true }), txt(v(sx + 0.4, -1.25), String(x.code), "c", { small: true, bold: sel, tone: "ink" }));
    });
    return {
      els: [...els, ...pad(-TRI - 0.3, TRI * 1.6 + 0.3, 2.2 + 3 * 1.05 + 0.3, -1.8)],
      readout: [
        `Kod ${r.code}: ${r.abbr}, ${r.name}.`,
        `Tekrar birimi ${formulaText225(r.repeatFormula)} (${resinElements225(r).join(", ")}); kaynak: ${r.monomerNote}.`,
        `Örnek ambalaj: ${r.example}. Kod içeriği ve geri dönüştürüldüğünü göstermez.`,
      ],
    };
  },
};
check225(Math.max(...resinCodes225.map((r) => resinElements225(r).length)) <= 3, "element kutuları üçü aşmamalı");

export const depthFigures225: Record<string, Record<string, FigureDef>> = {
  "simyadan-kimyaya": { [historySection225.title]: historyFigure },
  "sembolik-dil": { [notationSection225.title]: notationFigure },
  "polimer-kozmetik-ilac": { [monomerSection225.title]: monomerFigure },
  "polimer-gida-ilac-yag": { [resinSection225.title]: resinFigure },
};
