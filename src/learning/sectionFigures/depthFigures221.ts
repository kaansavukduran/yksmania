import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { rect } from "./mathFigures060TytKit";
import { pad } from "./physicsFigures058Kit";
import {
  balanceRows221, balanceSection221, changeText221, equationText221, formulaText221, iceRows221, iceSection221, limitRows221,
  limitSection221, molarVolume221, parseFormula221, propaneEq221, qFrac221, qMul, qText221, qVal, skeletonText221, stoichRows221,
  stoichSection221, typeFlags221, typeLabels221, typeNames221, typeRows221, typeSection221, type Q221,
} from "../depth221";

/*
 * 0.221 TYT Kimya tablo bölümlerinin çizimleri. Çubuk uzunlukları, kutu
 * değerleri ve okumalar tabloyu üreten aynı depth221 verilerinden gelir.
 * Çizimler şematiktir; adım değiştirmek öğrenme kaydı üretmez.
 */

const t = qText221;
const check221 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures221: ${claim}`);
};

/* ---------- Denkleştirme: element başına ayna çubukları ---------- */

const HALF = 0.75;
const BAR_MAX = 4.4;
const maxAtoms = Math.max(...balanceRows221.flatMap((b) => b.inventory.map(({ left }) => left)));
const balanceFigure: FigureDef = {
  caption: "Her adım tablodaki bir denklemdir. Ortadaki sütun elementleri, soldaki çubuk girenlerdeki, sağdaki çubuk ürünlerdeki atom sayısını gösterir. Denk denklemde her satırın iki çubuğu aynı uzunluktadır.",
  alt: `Yedi adımlı ayna çubuk grafiği. ${balanceRows221.map((b) => `${equationText221(b)}: ${b.inventory.map(({ el, left, right }) => `${el} ${left}/${right}`).join(", ")}`).join("; ")}.`,
  steps: balanceRows221.map((b) => b.reactants.map(formulaText221).join(" + ")),
  draw: (_value, step) => {
    const b = balanceRows221[step];
    const els: El[] = [
      txt(v(-HALF - BAR_MAX / 2, 0.75), "giren", "c", { small: true, bold: true, tone: "a" }),
      txt(v(HALF + BAR_MAX / 2, 0.75), "ürün", "c", { small: true, bold: true, tone: "b" }),
    ];
    b.inventory.forEach(({ el, left, right }, i) => {
      const y = -i * 1.0;
      const L = (BAR_MAX * left) / maxAtoms;
      const R = (BAR_MAX * right) / maxAtoms;
      els.push(
        rect(-HALF - L, y - 0.27, L, 0.54, "a"),
        rect(HALF, y - 0.27, R, 0.54, "b"),
        txt(v(0, y), el, "c", { small: true, bold: true, tone: "ink" }),
        txt(v(-HALF - L - 0.12, y), String(left), "w", { small: true, tone: "ink" }),
        txt(v(HALF + R + 0.12, y), String(right), "e", { small: true, tone: "ink" }),
      );
    });
    const bottom = -(b.inventory.length - 1) * 1.0 - 0.6;
    const parts = (list: typeof b.reactants, off: number) =>
      list.map((s, j) => `${b.coeffs[off + j]} ${formulaText221(s)}`).join(" + ");
    return {
      els: [...els, ...pad(-HALF - BAR_MAX - 1.1, 1.15, HALF + BAR_MAX + 1.1, bottom)],
      readout: [
        `İskelet: ${skeletonText221(b)}`,
        `Denk: ${equationText221(b)}`,
        `Birinci formül 1: ${b.unitFirst.map(qFrac221).join(", ")}${b.multiplier > 1 ? ` → ×${b.multiplier}` : " (kesir yok)"}.`,
        `Giren: ${parts(b.reactants, 0)} · Ürün: ${parts(b.products, b.reactants.length)}.`,
      ],
    };
  },
};

/* ---------- Tepkime türleri: türler ve altı eksen kutusu ---------- */

const SBW = 2.5;
const SBH = 0.72;
const AXW = 2.3;
const AXH = 1.05;
/** Ürün sütununun sol kenarı: okun ucundan sonra. */
const PX = SBW + 2.6;
const typeFigure: FigureDef = {
  caption: "Üstte giren ve ürün türleri ayrı kutulardır; kutu sayısı tür sayısı eksenini verir. Alttaki altı kutu altı etikettir: dolu kutu “evet”, soluk kutu “hayır” demektir ve her kutuda yazıyla da belirtilir.",
  alt: `Sekiz adım. ${typeRows221.map((c) => `${equationText221(c.eq)}: ${typeNames221(c).join(", ")}`).join("; ")}.`,
  steps: typeRows221.map((c) => c.eq.reactants.map(formulaText221).join(" + ")),
  draw: (_value, step) => {
    const c = typeRows221[step];
    const els: El[] = [];
    const k = c.eq.coeffs;
    const column = (list: typeof c.eq.reactants, x: number, off: number, tone: Tone) =>
      list.forEach((s, j) => {
        const y = 3.4 - j * (SBH + 0.25);
        els.push(rect(x, y, SBW, SBH, tone), txt(v(x + SBW / 2, y + SBH / 2), `${k[off + j] === 1 ? "" : `${k[off + j]} `}${formulaText221(s)}`, "c", { small: true, bold: true, tone: "ink" }));
      });
    column(c.eq.reactants, 0, 0, "a");
    column(c.eq.products, PX, c.eq.reactants.length, "b");
    const midY = 3.4 + SBH / 2 - (Math.max(c.eq.reactants.length, c.eq.products.length) - 1) * (SBH + 0.25) / 2;
    els.push(vec(v(SBW + 0.25, midY), v(SBW + 1.85, midY), { tone: "ink" }));
    const flags = typeFlags221(c);
    typeLabels221.forEach((label, i) => {
      const x = (i % 3) * (AXW + 0.15);
      const y = 1.0 - Math.floor(i / 3) * (AXH + 0.2);
      const on = flags[i];
      els.push(
        poly([v(x, y), v(x + AXW, y), v(x + AXW, y + AXH), v(x, y + AXH)], on ? { tone: "c", fill: "c", bold: true } : { tone: "muted", thin: true, dash: true }),
        txt(v(x + AXW / 2, y + AXH * 0.66), label, "c", { small: true, bold: on, tone: on ? "ink" : "muted" }),
        txt(v(x + AXW / 2, y + AXH * 0.26), on ? "evet" : "hayır", "c", { small: true, tone: on ? "ink" : "muted" }),
      );
    });
    const right = Math.max(3 * AXW + 0.3, PX + SBW);
    return {
      els: [...els, ...pad(-0.25, 4.4, right + 0.25, 1.0 - (AXH + 0.2) - 0.25)],
      readout: [
        equationText221(c.eq, true),
        `Tür sayısı ${c.eq.reactants.length} → ${c.eq.products.length}. Etiketler: ${typeNames221(c).join(", ")}.`,
        c.redoks ? `Değişen basamaklar: ${changeText221(c)}.` : "Hiçbir elementin yükseltgenme basamağı değişmez.",
      ],
    };
  },
};

/* ---------- Propan: dört türün mol köprüsü ---------- */

const species3 = [...propaneEq221.reactants, ...propaneEq221.products];
const COLW = 2.6;
const BOXW = 2.0;
const doorUnit = { g: "gram kapısı", L: "NK litresi kapısı", tane: "tanecik kapısı" } as const;
const stoichFigure: FigureDef = {
  caption: "Dört kutu dört türün molüdür; hepsi katsayılarla (ν) aynı ilerlemeye bağlıdır. Giriş kapısı dolu kutulu ve altında “giriş” yazan türdür. Alt satırlar kütleyi ve gazlar için NK hacmini verir; sıvı suya hacim uygulanmaz.",
  alt: `Altı adım, dört sütun: ${species3.map(formulaText221).join(", ")}. ${stoichRows221.map((r) => `${r.input.text}: mol ${r.mol.map(t).join(", ")}`).join("; ")}.`,
  steps: stoichRows221.map((r) => r.input.text),
  draw: (_value, step) => {
    const r = stoichRows221[step];
    const els: El[] = [
      txt(v(-0.35, 2.0), "n (mol)", "w", { small: true, tone: "muted" }),
      txt(v(-0.35, 1.05), "ν", "w", { small: true, tone: "muted" }),
      txt(v(-0.35, 0.45), "m (g)", "w", { small: true, tone: "muted" }),
      txt(v(-0.35, -0.15), "V (L, NK)", "w", { small: true, tone: "muted" }),
    ];
    species3.forEach((s, i) => {
      const x = i * COLW;
      const on = i === r.input.species;
      const gas = s.phase === "g";
      els.push(
        txt(v(x + BOXW / 2, 3.25), formulaText221(s), "c", { small: true, bold: true, tone: on ? "a" : "ink" }),
        poly([v(x, 1.6), v(x + BOXW, 1.6), v(x + BOXW, 2.4), v(x, 2.4)], on ? { tone: "a", fill: "a", bold: true } : { tone: "muted", thin: true }),
        txt(v(x + BOXW / 2, 2.0), t(r.mol[i]), "c", { small: true, bold: true, tone: "ink" }),
        txt(v(x + BOXW / 2, 1.05), String(propaneEq221.coeffs[i]), "c", { small: true, tone: "muted" }),
        txt(v(x + BOXW / 2, 0.45), t(r.mass[i]), "c", { small: true, tone: on && r.input.door === "g" ? "a" : "ink", bold: on && r.input.door === "g" }),
        txt(v(x + BOXW / 2, -0.15), gas ? t(qMul(r.mol[i], molarVolume221)) : "sıvı", "c", { small: true, tone: gas ? (on && r.input.door === "L" ? "a" : "ink") : "muted", bold: on && r.input.door === "L" }),
      );
      if (on) els.push(txt(v(x + BOXW / 2, -1.0), "↑ giriş", "c", { small: true, bold: true, tone: "a" }));
    });
    const given = species3[r.input.species];
    return {
      els: [...els, ...pad(-2.4, 3.6, 3 * COLW + BOXW + 0.3, -1.4)],
      readout: [
        `Giriş: ${r.input.text} → ${t(r.given)} mol ${formulaText221(given)} (${doorUnit[r.input.door]}).`,
        `İlerleme: ${t(r.given)} ÷ ${propaneEq221.coeffs[r.input.species]} = ${t(r.xi)}; her tür için mol = ${t(r.xi)} × ν.`,
        `Kütle denetimi: ${t(r.mass[0])} + ${t(r.mass[1])} = ${t(r.mass[2])} + ${t(r.mass[3])} g.`,
      ],
    };
  },
};

/* ---------- Al₂S₃: harcanan, artan ve ürün kütle çubukları ---------- */

const GSCALE = 0.26;
const LABEL_X = 7.0;
const maxGram = Math.max(...limitRows221.flatMap((r) => [qVal(r.al), qVal(r.s), qVal(r.product)]));
check221(maxGram * GSCALE < LABEL_X - 0.3, "çubuklar etiket sütununa taşmamalı");
const limitFigure: FigureDef = {
  caption: "Her adım tablodaki bir karışımdır. Al ve S çubuklarının dolu kısmı harcanan, kesikli kısmı artan kütledir. Al₂S₃ çubuğu iki dolu kısmın toplamına eşittir; uzunluklar gramla ölçeklidir.",
  alt: `Beş adımlı yatay çubuk grafiği. ${limitRows221.map((r) => `${t(r.al)} g Al ve ${t(r.s)} g S: harcanan ${t(r.alUsed)} ve ${t(r.sUsed)} g, ürün ${t(r.product)} g`).join("; ")}.`,
  steps: limitRows221.map((r) => `${t(r.al)} g Al · ${t(r.s)} g S`),
  draw: (_value, step) => {
    const r = limitRows221[step];
    const els: El[] = [];
    const bar = (y: number, label: string, start: Q221, used: Q221, tone: Tone, note: string) => {
      const u = qVal(used) * GSCALE;
      const total = qVal(start) * GSCALE;
      els.push(txt(v(-0.25, y), label, "w", { small: true, bold: true, tone: "ink" }));
      if (u > 0) els.push(rect(0, y - 0.25, u, 0.5, tone));
      if (total - u > 1e-9) els.push(poly([v(u, y - 0.25), v(total, y - 0.25), v(total, y + 0.25), v(u, y + 0.25)], { tone: "warn", dash: true }));
      els.push(txt(v(LABEL_X, y), note, "e", { small: true, tone: "ink" }));
    };
    const leftNote = (x: Q221) => (x.n === 0 ? "tükendi" : `artan ${t(x)} g`);
    bar(2.0, "Al", r.al, r.alUsed, "a", `${t(r.al)} g; ${leftNote(r.alLeft)}`);
    bar(1.0, "S", r.s, r.sUsed, "b", `${t(r.s)} g; ${leftNote(r.sLeft)}`);
    bar(0, "Al₂S₃", r.product, r.product, "c", `${t(r.product)} g ürün`);
    return {
      els: [...els, ...pad(-2.0, 2.6, LABEL_X + 4.6, -0.6)],
      legend: [
        { code: "■", label: "harcanan", tone: "a" },
        { code: "▭", label: "artan (kesikli)", tone: "warn" },
        { code: "■", label: "ürün", tone: "c" },
      ],
      readout: [
        `n/katsayı: Al ${t(r.alCap)}, S ${t(r.sCap)} → ${r.limiting === "ikisi" ? "ikisi birlikte biter" : `${r.limiting} sınırlayıcı`}.`,
        `Harcanan: ${t(r.alUsed)} g Al + ${t(r.sUsed)} g S = ${t(r.product)} g Al₂S₃.`,
        `Son karışım: ${t(r.product)} g ürün + ${t(qVal(r.alLeft) > 0 ? r.alLeft : r.sLeft)} g artan = ${t(r.al)} + ${t(r.s)} g.`,
      ],
    };
  },
};

/* ---------- SO₃: başlangıç ve son mol çubukları ---------- */

const MSCALE = 1.4;
const ICE_LABEL_X = 6.1;
const maxMol = Math.max(...iceRows221.flatMap((r) => [...r.start, ...r.end].map(qVal)));
check221(maxMol * MSCALE < ICE_LABEL_X - 0.3, "mol çubukları etiket sütununa taşmamalı");
const iceNames = ["SO₂", "O₂", "SO₃"];
const iceTones: Tone[] = ["a", "b", "c"];
const iceFigure: FigureDef = {
  caption: "Her türün üst çubuğu başlangıç (çerçeve), alt çubuğu son moldür (dolu). Sağdaki sütun başlangıç → son değerini yazar. Uzunluklar molle ölçeklidir.",
  alt: `Altı adımlı yatay çubuk grafiği. ${iceRows221.map((r) => `başlangıç ${r.start.map(t).join(", ")}; ξ = ${t(r.xi)}; son ${r.end.map(t).join(", ")}`).join("; ")}.`,
  steps: iceRows221.map((r) => r.start.map(t).join(" · ")),
  draw: (_value, step) => {
    const r = iceRows221[step];
    const els: El[] = [];
    iceNames.forEach((name, i) => {
      const y = 3.2 - i * 1.6;
      const s = qVal(r.start[i]) * MSCALE;
      const e = qVal(r.end[i]) * MSCALE;
      els.push(txt(v(-0.25, y - 0.22), name, "w", { small: true, bold: true, tone: "ink" }));
      if (s > 0) els.push(poly([v(0, y), v(s, y), v(s, y + 0.36), v(0, y + 0.36)], { tone: iceTones[i], thin: true }));
      if (e > 0) els.push(rect(0, y - 0.8, e, 0.36, iceTones[i]));
      els.push(txt(v(ICE_LABEL_X, y - 0.22), `${t(r.start[i])} → ${t(r.end[i])} mol`, "e", { small: true, tone: "ink" }));
    });
    return {
      els: [...els, ...pad(-1.6, 3.85, ICE_LABEL_X + 4.0, -1.0)],
      legend: [
        { code: "▭", label: "başlangıç", tone: "muted" },
        { code: "■", label: "son", tone: "ink" },
      ],
      readout: [
        `n/ν: SO₂ ${t(r.caps[0]!)}, O₂ ${t(r.caps[1]!)} → ξ = ${t(r.xi)} (${r.limiting}).`,
        `Yeni SO₃ = 2ξ = ${t(r.newSO3)} mol; son SO₃ ${t(r.end[2])} mol.`,
        `Toplam gaz: ${t(r.totalStart)} → ${t(r.totalEnd)} mol (ξ kadar azalır).`,
      ],
    };
  },
};

check221(balanceRows221.every((b) => b.inventory.every(({ el }) => Object.keys(parseFormula221(b.reactants.map((s) => s.f).join(""))).includes(el))), "envanter elementleri girenlerde bulunmalı");

export const depthFigures221: Record<string, Record<string, FigureDef>> = {
  "tepkimeler-denklemler": { [balanceSection221.title]: balanceFigure },
  "tepkime-turleri": { [typeSection221.title]: typeFigure },
  "denklemli-miktar-gecisi": { [stoichSection221.title]: stoichFigure },
  "sinirlayici-artan-madde": { [limitSection221.title]: limitFigure },
  "sinirlayici-bilesen": { [iceSection221.title]: iceFigure },
};
