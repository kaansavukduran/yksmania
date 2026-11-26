import { poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { bohr } from "./chemistryFiguresShells";
import {
  CLASS_OF209, CLASSES209, SHELL_CAPS209, IE1_KJ_MOL209, IE_SOURCE_SHORT209, MAIN_GROUPS209, MAX_Z209, PAULING_EN209, RULE_TEXT209,
  classRows209, classSection209, compareRadius209, deltaEN209, electrons209, enSection209, enText209, groupA209,
  ieDips209, ieSection209, negativeEnd209, periodMembers209, places209, periods209, place209, radiusRows209,
  radiusRuleSection209, shellPlaceSection209, shellText209, speciesShells209, speciesText209, zOf209, type Class209, type Symbol209,
} from "../depth209";

/*
 * 0.209.0 periyodik sistem tablo bölümlerinin çizimleri. Her etiket ve okuma
 * depth209 verisinden gelir. Katman çemberleri enerji düzeyini şematik
 * gösterir; elektronun gerçek yolu ya da ölçekli atom boyu değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill: boolean): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: !fill });
const col = (group: number) => MAIN_GROUPS209.indexOf(group as (typeof MAIN_GROUPS209)[number]);
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);

/* ---------- 1 · Z’den dağılım, periyot ve grup ---------- */

const shellPlace: FigureDef = {
  caption: `Atom numarasını değiştir: elektronlar ${SHELL_CAPS209.join(", ")} sınırlarıyla içten dışa dolar. Renkli katman değerlik katmanıdır. Alttaki şerit, atomun periyodundaki elementleri grup sütunlarına yerleştirir.`,
  alt: `Solda şematik katman diyagramı: çekirdekte proton sayısı, çemberlerde elektron noktaları, en dış katman renkli. Sağda element, dağılım, periyot ve grup yazılı. Altta seçilen periyodun elementleri ${MAIN_GROUPS209.length} grup sütununda kutucuklar hâlinde, seçilen element vurgulu.`,
  param: { label: "Atom numarası Z", min: 1, max: MAX_Z209, step: 1, init: 13, plain: true },
  draw: (z) => {
    const p = place209(z);
    const els: El[] = [...bohr(0, 0, p.z, p.shells, p.shells.length - 1)];
    els.push(
      txt(v(2.5, 1.2), `${p.symbol} · Z = ${p.z}`, "e", { bold: true, tone: "a" }),
      txt(v(2.5, 0.5), shellText209(p.shells), "e", { small: true, tone: "b" }),
      txt(v(2.5, -0.1), `${p.period}. periyot`, "e", { small: true }),
      txt(v(2.5, -0.7), `${p.group}. grup (${groupA209(p.group)})`, "e", { small: true }),
    );
    const cell = 0.78;
    const x0 = -3.1;
    const y = -3.1;
    periodMembers209(p.period).forEach((m) => {
      const x = x0 + col(m.group) * cell;
      const on = m.z === p.z;
      els.push(rect(x, x + cell * 0.92, y - 0.36, y + 0.36, on ? "a" : "muted", on), txt(v(x + cell * 0.46, y), m.symbol, "c", { small: true, bold: on }));
    });
    MAIN_GROUPS209.forEach((g, i) => els.push(txt(v(x0 + i * cell + cell * 0.46, y - 0.75), String(g), "c", { small: true, tone: "muted", soft: true })));
    // Sabit çerçeve: Z değişince çizim zıplamasın.
    els.push(txt(v(-3.2, 2.4), " ", "c"), txt(v(5.6, -4.0), " ", "c"));
    return {
      els,
      readout: [
        `Z = ${p.z} (${p.name}): ${shellText209(p.shells)}; toplam ${p.shells.join(" + ")} = ${p.z}.`,
        `${p.period} katman → ${p.period}. periyot; en dışta ${p.valence} elektron → ${p.group}. grup (${groupA209(p.group)}).`,
        p.symbol === "He" ? `He’nin ilk katmanı ${SHELL_CAPS209[0]} ile doludur: ${p.group}. grup.` : `Aynı periyotta ${periodMembers209(p.period).length} element var.`,
      ],
    };
  },
};

/* ---------- 2 · Periyot periyot sınıflar ---------- */

const classTone: Record<Class209, Tone> = { metal: "a", "yarı metal": "warn", ametal: "b", "soy gaz": "c" };
const classGrid: FigureDef = {
  caption: `İlk ${MAX_Z209} element, okul periyodik tablosunun ${MAIN_GROUPS209.length} ana grup sütununa yerleşir. Adımla bir sınıfı vurgula: sınıfın sağa doğru nasıl değiştiğine ve H ile B’nin yerine bak.`,
  alt: `${periods209.length} satır ve ${MAIN_GROUPS209.length} sütunluk küçük periyodik tablo: satırlar ${periods209.join(", ")}. periyot, sütunlar ${MAIN_GROUPS209.join(", ")}. gruplar. Seçilen sınıftaki elementlerin kutucukları renkli, diğerleri yalnız çerçeveli.`,
  steps: CLASSES209.map(cap),
  draw: (_value, step) => {
    const chosen = CLASSES209[step];
    const cell = 0.9;
    const els: El[] = [];
    places209.forEach((p) => {
      const x = col(p.group) * cell;
      const y = -(p.period - 1) * cell;
      const on = CLASS_OF209[p.symbol] === chosen;
      els.push(rect(x, x + cell * 0.9, y - cell * 0.45, y + cell * 0.45, on ? classTone[chosen] : "muted", on), txt(v(x + cell * 0.45, y), p.symbol, "c", { small: true, bold: on }));
    });
    MAIN_GROUPS209.forEach((g, i) => els.push(txt(v(i * cell + cell * 0.45, cell * 0.85), String(g), "c", { small: true, tone: "muted" })));
    periods209.forEach((period) => els.push(txt(v(-0.25, -(period - 1) * cell), String(period), "w", { small: true, tone: "muted" })));
    const members = places209.filter(({ symbol }) => CLASS_OF209[symbol] === chosen);
    const groups = [...new Set(members.map(({ group }) => group))].sort((a, b) => a - b);
    return {
      els,
      readout: [
        `${cap(chosen)} (${members.length}): ${members.map(({ symbol }) => symbol).join(", ")}.`,
        `Bulunduğu gruplar: ${groups.join(", ")}. Periyotlara göre: ${classRows209.map(({ period, byClass }) => `${period}. periyot ${byClass[chosen].length}`).join(" · ")}.`,
      ],
    };
  },
};

/* ---------- 3 · Çift karşılaştırma ---------- */

const radiusRows = radiusRows209();
const radiusPairs: FigureDef = {
  caption: "Adımla bir çift seç: iki tanecik aynı ölçekli değil, yalnız katman sayısı ve elektronları gösteren şematik diyagramlardır. Karar, okumadaki kurala göre verilir; renkli ad daha büyük taneciktir.",
  alt: "Yan yana iki şematik katman diyagramı; çekirdekte proton sayısı, çemberlerde elektronlar. Altlarında tanecik adı, proton ve elektron sayıları. Kural karar veriyorsa büyük olanın adı renkli.",
  steps: radiusRows.map(({ a, b }) => `${speciesText209(a)} – ${speciesText209(b)}`),
  draw: (_value, step) => {
    const row = radiusRows[step];
    const els: El[] = [];
    [row.a, row.b].forEach((s, i) => {
      const cx = i === 0 ? -2.6 : 2.6;
      const big = row.bigger === s;
      els.push(
        ...bohr(cx, 0, s.z, speciesShells209(s)),
        txt(v(cx, -2.55), speciesText209(s), "c", { bold: true, tone: big ? "a" : "ink" }),
        txt(v(cx, -3.15), `p⁺ ${s.z} · e⁻ ${electrons209(s)}`, "c", { small: true }),
      );
    });
    els.push(txt(v(-4.9, 2.3), " ", "c"), txt(v(4.9, -3.4), " ", "c"));
    const result = compareRadius209(row.a, row.b);
    return {
      els,
      readout: [
        `${speciesText209(row.a)}: ${shellText209(speciesShells209(row.a))}; ${speciesText209(row.b)}: ${shellText209(speciesShells209(row.b))}.`,
        `${RULE_TEXT209[result.rule]}.`,
        result.bigger ? `Daha büyük: ${speciesText209(result.bigger)}.` : "Bu çiftte kural yok: ölçülmüş veri olmadan sıra kurma.",
      ],
    };
  },
};

/* ---------- 4 · İE₁ çubukları ---------- */

const ie = (s: Symbol209) => IE1_KJ_MOL209[s];
const ieMaxValue = Math.max(...Object.values(IE1_KJ_MOL209));
const noDips: (readonly [Symbol209, Symbol209])[] = [];
const ieSets = [
  ...[2, 3].map((period) => ({ label: `${period}. periyot`, members: periodMembers209(period), dips: ieDips209(period) })),
  ...[1, 18].map((group) => ({ label: `${group}. grup`, members: places209.filter((p) => p.group === group), dips: noDips })),
];
const ieBars: FigureDef = {
  caption: `Ölçülmüş birinci iyonlaşma enerjileri (kJ/mol, ${IE_SOURCE_SHORT209}); bütün adımlarda aynı ölçek. Periyot adımlarında farklı renkli çubuk, soldaki komşusundan düşük olan elementtir; grup adımlarında aşağı inildikçe çubuk kısalır.`,
  alt: "Dikey çubuk grafik: seçilen periyot ya da gruptaki elementlerin İE₁ değerleri, her çubuğun üstünde sayı, altında element sembolü. Periyot adımlarında düşüş yapan iki element turuncu.",
  steps: ieSets.map(({ label }) => label),
  draw: (_value, step) => {
    const set = ieSets[step];
    const H = 3.2;
    const gap = 1.0;
    const w = 0.62;
    const lows = new Set(set.dips.map(([, b]) => b));
    const els: El[] = [seg(v(-0.3, 0), v(8 * gap, 0), { tone: "muted", thin: true })];
    set.members.forEach((m, i) => {
      const x = i * gap;
      const h = (ie(m.symbol) / ieMaxValue) * H;
      const low = lows.has(m.symbol);
      els.push(
        rect(x, x + w, 0, h, low ? "warn" : "b", true),
        txt(v(x + w / 2, h + 0.22), String(ie(m.symbol)), "c", { small: true, bold: low }),
        txt(v(x + w / 2, -0.32), m.symbol, "c", { small: true, bold: true, tone: low ? "warn" : "ink" }),
      );
    });
    els.push(txt(v(-0.3, H + 0.75), "İE₁ (kJ/mol)", "e", { small: true, tone: "muted" }), txt(v(8 * gap + 0.2, -0.9), " ", "c"));
    const values = set.members.map((m) => `${m.symbol} ${ie(m.symbol)}`).join(", ");
    return {
      els,
      readout: [
        `${set.label}: ${values}.`,
        set.dips.length
          ? `Genel yön artış; düşüşler: ${set.dips.map(([a, b]) => `${a} ${ie(a)} > ${b} ${ie(b)}`).join(", ")}.`
          : `Grupta aşağı inildikçe azalır: ${set.members.map((m) => m.symbol).join(" > ")}.`,
      ],
    };
  },
};

/* ---------- 5 · Pauling EN ızgarası ---------- */

const withEN = places209.filter(({ symbol }) => PAULING_EN209[symbol] !== undefined);
const enOf = (s: Symbol209) => PAULING_EN209[s]!;
const enHi = withEN.reduce((a, b) => (enOf(b.symbol) > enOf(a.symbol) ? b : a)).symbol;
const enLo = withEN.reduce((a, b) => (enOf(b.symbol) < enOf(a.symbol) ? b : a)).symbol;
const enSteps = [
  { label: "Periyotta sağa", hot: (s: Symbol209) => [2, 3].includes(place209(zOf209(s)).period) },
  { label: "Grupta aşağı", hot: (s: Symbol209) => [1, 17].includes(place209(zOf209(s)).group) },
  { label: "En yüksek, en düşük", hot: (s: Symbol209) => s === enHi || s === enLo },
  { label: "N–Cl bağı", hot: (s: Symbol209) => s === "N" || s === "Cl" },
];
const enGrid: FigureDef = {
  caption: "Pauling elektronegatiflikleri (birimsiz) kutucuklarda. Adımları değiştir: periyotta sağa artış, grupta aşağı azalış, uç değerler ve oklar çatışınca sayıyla karar.",
  alt: `${periods209.length} satır ve ${MAIN_GROUPS209.length} sütunluk küçük periyodik tablo; her kutucukta element sembolü ve Pauling değeri, 18. grup kutucuklarında değer yerine çizgi. Seçilen adımdaki kutucuklar renkli.`,
  steps: enSteps.map(({ label }) => label),
  draw: (_value, step) => {
    const { hot } = enSteps[step];
    const cw = 1.1;
    const ch = 1.3;
    const els: El[] = [];
    places209.forEach((p) => {
      const x = col(p.group) * cw;
      const y = -(p.period - 1) * ch;
      const value = PAULING_EN209[p.symbol];
      const on = value !== undefined && hot(p.symbol);
      els.push(
        rect(x, x + cw * 0.94, y - ch * 0.46, y + ch * 0.46, on ? "a" : "muted", on),
        txt(v(x + cw * 0.47, y + 0.27), p.symbol, "c", { small: true, bold: true }),
        txt(v(x + cw * 0.47, y - 0.3), value === undefined ? "—" : enText209(value), "c", { small: true, tone: value === undefined ? "muted" : "ink" }),
      );
    });
    els.push(txt(v(-0.1, ch * 0.6), " ", "c"), txt(v(8 * cw, -3 * ch - ch * 0.6), " ", "c"));
    const row = (period: number) => withEN.filter((p) => p.period === period);
    const lines = [
      [2, 3].map((period) => `${period}. periyot: ${row(period).map(({ symbol }) => `${symbol} ${enText209(enOf(symbol))}`).join(" < ")}.`),
      [1, 17].map((g) => `${g}. grup: ${withEN.filter((p) => p.group === g).map(({ symbol }) => `${symbol} ${enText209(enOf(symbol))}`).join(" > ")}.`),
      [`En yüksek ${enHi} ${enText209(enOf(enHi))}, en düşük ${enLo} ${enText209(enOf(enLo))}.`, "18. grubun bu ölçekte değeri yok; çizgi sıfır demek değildir."],
      [`N ${enText209(enOf("N"))} < Cl ${enText209(enOf("Cl"))}: N–Cl bağında negatif uç ${negativeEnd209("N", "Cl")}, ΔEN = ${enText209(deltaEN209("N", "Cl"))}.`, "N yukarıda, Cl sağda: oklar çatışınca sayıya bak."],
    ];
    return { els, readout: lines[step] };
  },
};

export const depthFigures209: Record<string, Record<string, FigureDef>> = {
  "katman-elektron-dizilimi": { [shellPlaceSection209.title]: shellPlace },
  "elementlerin-siniflandirilmasi": { [classSection209.title]: classGrid },
  "atom-capi-karsilastirma": { [radiusRuleSection209.title]: radiusPairs },
  "iyonlasma-enerjisi": { [ieSection209.title]: ieBars },
  "elektron-ilgisi-elektronegatiflik": { [enSection209.title]: enGrid },
};
