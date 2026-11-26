import {
  dailyItems216, dailyRow216, dailySection216, ionText216, metalRows216, metalSection216, mixSection216,
  mixtureResult216, mixtureRows216, mol216, saltRows216, saltSampleMmol216, saltSection216, saponify216, saponSection216,
  solutionText216, dailySampleMmol216,
} from "../depth216";
import { ball, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, pad, rect } from "./mathFigures062TytKit";

/*
 * 0.216.0 TYT Kimya asit-baz derinleştirme çizimleri. Her kutu, çubuk,
 * etiket ve okuma satırı depth216 modülündeki aynı veri fonksiyonlarından
 * gelir; adım değiştirmek öğrenme kaydı oluşturmaz.
 */

const fail = (claim: string): never => { throw new Error(`depthFigures216: ${claim}`); };

/* ---------- 1 · Yük şeridi: katyon ve anyon yükleri eşit uzunlukta ---------- */

const salts = (): FigureDef => {
  const rows = saltRows216();
  const u = 1.4;
  const lw = 2;
  return {
    caption: `Her katyon kutusunun genişliği yükü kadar, her anyon kutusununki yükünün büyüklüğü kadardır. İki şerit aynı uzunluğa gelince toplam yük sıfırdır; kutu sayıları formüldeki alt simgeleri verir. Adımlar tablodaki ${rows.length} tuzu sırayla gösterir.`,
    alt: `Üstte katyon, altta anyon kutuları. Örneğin ${rows.at(-3)!.formula} için ${rows.at(-3)!.nCat} kutu ${ionText216(rows.at(-3)!.cation)} ve ${rows.at(-3)!.nAn} kutu ${ionText216(rows.at(-3)!.anion)}, iki şerit de ${rows.at(-3)!.nCat * rows.at(-3)!.cation.z} birim.`,
    steps: rows.map((r) => r.formula),
    draw: (_, step) => {
      const r = rows[step] ?? fail("tuz adımı yok");
      const h = 0.8;
      const els: El[] = [];
      const total = r.nCat * r.cation.z;
      if (total !== -r.nAn * r.anion.z) fail("şeritler eşit olmalı");
      els.push(...cell(0, 0, lw, h, "katyon", "a", { fill: true }));
      els.push(...cell(0, -1.2, lw, h, "anyon", "c", { fill: true }));
      for (let i = 0; i < r.nCat; i += 1) els.push(...cell(lw + 0.2 + i * r.cation.z * u, 0, r.cation.z * u, h, ionText216(r.cation), "a", { fill: false }));
      for (let i = 0; i < r.nAn; i += 1) els.push(...cell(lw + 0.2 + i * -r.anion.z * u, -1.2, -r.anion.z * u, h, ionText216(r.anion), "c", { fill: false }));
      const end = lw + 0.2 + total * u;
      els.push(seg(v(end, h + 0.25), v(end, -1.45), { tone: "warn", dash: true }));
      els.push(txt(v(end + 0.15, h / 2), `+${total}`, "e", { tone: "a", bold: true }));
      els.push(txt(v(end + 0.15, -1.2 + h / 2), `−${total}`, "e", { tone: "c", bold: true }));
      els.push(txt(v(lw + 0.2, -2.05), `${r.formula} · ${r.name}`, "e", { tone: "ink", bold: true }));
      els.push(...pad(-0.2, h + 0.4, lw + 0.2 + Math.max(total * u, 4.6) + 1.2, -2.5));
      return {
        els,
        readout: [
          `${r.formula}: ${r.balance}.`,
          `${mol216(saltSampleMmol216)} mol tuz → ${mol216(r.catMmol)} mol ${ionText216(r.cation)} + ${mol216(r.anMmol)} mol ${ionText216(r.anion)} = ${mol216(r.totalMmol)} mol iyon.`,
        ],
      };
    },
  };
};

/* ---------- 2 · H⁺ ve OH⁻ çubukları: tepkimeye giren ve artan ---------- */

const mixes = (): FigureDef => {
  const rows = mixtureRows216();
  const L = 6.5;
  const lw = 2.6;
  const mol3 = (m: number) => mol216(m, 3);
  return {
    caption: "Üst çubuk asidin verdiği H⁺, alt çubuk bazın verdiği OH⁻ molüdür. Kesikli çizgiye kadar olan kısım birbirini tüketir; çizginin ötesinde kalan parça artan iyondur. Her adımda çubuklar o karışımın büyük molüne göre ölçeklenir.",
    alt: `Altı karışım için iki yatay çubuk. Örneğin ilk adımda H⁺ ve OH⁻ ${mol3(rows[0].h)} mol ile eşit; ikinci adımda H⁺ ${mol3(rows[1].h)}, OH⁻ ${mol3(rows[1].oh)} mol.`,
    steps: rows.map((_, i) => `${i + 1}. karışım`),
    draw: (_, step) => {
      const r = rows[step] ?? fail("karışım adımı yok");
      const k = L / Math.max(r.h, r.oh);
      const h = 0.7;
      const els: El[] = [];
      const bar = (y: number, label: string, amount: number, tone: Tone) => {
        els.push(...cell(0, y, lw, h, `${label} ${mol3(amount)}`, tone, { fill: true }));
        els.push(rect(lw + 0.2, y, r.reacted * k, h, "muted"));
        if (amount > r.reacted) els.push(rect(lw + 0.2 + r.reacted * k, y, (amount - r.reacted) * k, h, tone));
      };
      bar(0, "H⁺", r.h, "warn");
      bar(-1.1, "OH⁻", r.oh, "b");
      const x = lw + 0.2 + r.reacted * k;
      els.push(seg(v(x, h + 0.35), v(x, -1.35), { tone: "ink", dash: true }));
      els.push(txt(v(lw + 0.2 + (r.reacted * k) / 2, h + 0.35), `tepkimeye giren ${mol3(r.reacted)}`, "n", { tone: "muted", small: true }));
      if (r.excess) {
        const y = r.kind === "asidik" ? 0 : -1.1;
        els.push(txt(v(x + (r.excess * k) / 2, y + h / 2), `artan ${mol3(r.excess)}`, "c", { tone: "ink", small: true, bold: true }));
      }
      els.push(txt(v(0, -1.95), r.kind === "esdeger" ? `eşdeğerlik · ${r.salt.formula}` : `${r.kind} · ${r.totalMl} mL`, "e", { tone: "ink", bold: true }));
      els.push(...pad(-0.2, h + 1.1, lw + 0.2 + L + 0.3, -2.4));
      return { els, readout: [`${solutionText216(r.acid)} + ${solutionText216(r.base)}.`, `${mixtureResult216(r)}.`] };
    },
  };
};

/* ---------- 3 · Metal atomları, elektronlar ve H₂ molekülleri ---------- */

const metals = (): FigureDef => {
  const rows = metalRows216();
  return {
    caption: "Her adımda iki metal atomu iki ayrı ortama konur. Sağdaki her H₂ topu, metalin verdiği iki elektronu gösterir. İki atom 2·z elektron verir ve z tane H₂ oluşur; tepkime vermeyen ortamda top yoktur.",
    alt: `Solda seyreltik HCl, sağda sulu NaOH paneli. Örneğin iki Al atomu her iki panelde ${rows.find((m) => m.symbol === "Al")!.h2Acid * 2} H₂ verir; iki Mg atomu yalnız asitte ${rows.find((m) => m.symbol === "Mg")!.h2Acid * 2} H₂ verir.`,
    steps: rows.map((m) => m.symbol),
    draw: (_, step) => {
      const m = rows[step] ?? fail("metal adımı yok");
      const els: El[] = [];
      const panel = (x0: number, title: string, h2PerAtom: number) => {
        els.push(txt(v(x0 + 2, 1.15), title, "c", { tone: "ink", bold: true, small: true }));
        els.push(rect(x0, -0.9, 4.2, 1.7, "muted", false));
        [0.55, 1.35].forEach((x) => els.push(ball(v(x0 + x, 0), 0.34, h2PerAtom ? "a" : "muted", m.symbol)));
        els.push(vec(v(x0 + 1.85, 0), v(x0 + 2.45, 0), { tone: "ink", thin: true }));
        const n = 2 * h2PerAtom;
        if (!Number.isInteger(n)) fail("H₂ sayısı tam olmalı");
        if (n === 0) els.push(txt(v(x0 + 3.2, 0), "H₂ yok", "c", { tone: "muted", bold: true, small: true }));
        for (let i = 0; i < n; i += 1) els.push(ball(v(x0 + 2.8 + i * 0.55, 0), 0.24, "b", "H₂"));
        els.push(txt(v(x0 + 2, -0.6), n ? `${2 * n} e⁻ → ${n} H₂` : "tepkime yok", "c", { tone: "muted", small: true }));
      };
      panel(0, "Seyreltik HCl", m.h2Acid);
      panel(4.8, "Sulu NaOH", m.h2Base);
      els.push(...pad(-0.2, 1.5, 9.2, -1.1));
      return {
        els,
        readout: [
          `${m.symbol} (${m.cls}). HCl: ${m.acidEq ? m.acidEq.text : "H₂ çıkmaz"}.`,
          `Baz: ${m.baseEq ? m.baseEq.text : "H₂ çıkmaz"}.`,
        ],
      };
    },
  };
};

/* ---------- 4 · Formüldeki H atomları ve verilen ya da tüketilen H⁺ ---------- */

const daily = (): FigureDef => {
  const rows = dailyItems216.map((d) => dailyRow216(d));
  const s = 0.6;
  return {
    caption: "Asitlerde formüldeki her H atomu bir kare olarak çizilir; dolu kareler H⁺ olarak verilebilenlerdir. Baz ve tuzlarda kareler formül başına tüketilen H⁺ sayısıdır, karbonatlarda bir CO₂ çıkar. Alt satır 0,10 mol bileşenin tam tepkimesini verir.",
    alt: `Örneğin CH₃COOH için ${rows[0].hAtoms} karenin ${rows[0].eq} tanesi dolu, C₆H₈O₇ için ${rows[1].hAtoms} karenin ${rows[1].eq} tanesi dolu; Na₂CO₃ için ${rows[4].eq} kare ve bir CO₂.`,
    steps: rows.map((d) => d.daily),
    draw: (_, step) => {
      const d = rows[step] ?? fail("günlük madde adımı yok");
      const els: El[] = [];
      els.push(txt(v(0, 1.0), `${d.daily}: ${d.formula}`, "e", { tone: "ink", bold: true }));
      const acid = d.kind === "asit";
      const n = acid ? d.hAtoms : d.eq;
      for (let i = 0; i < n; i += 1) {
        const filled = !acid || i < d.eq;
        els.push(...cell(i * (s + 0.15), -0.1, s, s, acid ? "H" : "H⁺", acid ? (filled ? "warn" : "muted") : "b", { fill: filled, ink: filled ? "ink" : "muted" }));
      }
      const after = n * (s + 0.15) + 0.2;
      els.push(txt(v(after, 0.2), acid ? `${d.eq} H⁺ verir` : `${d.eq} H⁺ tüketir`, "e", { tone: "ink", small: true, bold: true }));
      if (d.carbonate) els.push(ball(v(after + 2.6, 0.2), 0.32, "c", "CO₂"));
      const bottom = acid
        ? `${mol216(d.eqMmol)} mol H⁺ → ${mol216(d.caco3Mmol)} mol CaCO₃`
        : `${mol216(d.eqMmol)} mol HCl ${d.kind === "baz" ? "nötrler" : "tüketir"}${d.co2Mmol ? `, ${mol216(d.co2Mmol)} mol CO₂` : ""}`;
      els.push(txt(v(0, -0.85), `${mol216(dailySampleMmol216)} mol ile: ${bottom}`, "e", { tone: "ink", small: true }));
      els.push(...pad(-0.2, 1.4, 8 * (s + 0.15) + 2.6, -1.3));
      return {
        els,
        readout: [
          acid ? `${d.component} ${d.formula}: ${d.hAtoms} H atomundan ${d.eq} tanesi H⁺ verir.` : `${d.component} ${d.formula}: formül başına ${d.eq} H⁺ tüketir.`,
          `${mol216(dailySampleMmol216)} mol: ${bottom}.`,
        ],
      };
    },
  };
};

/* ---------- 5 · Sabunlaşma: NaOH eklendikçe ürünler ---------- */

const sapon = (): FigureDef => {
  const fat = 100;
  const maxBase = 450;
  const L = 6.4;
  const k = L / maxBase;
  const lw = 2.4;
  return {
    caption: `${mol216(fat)} mol yağa eklenen NaOH kaydırılır; kaydırıcı milimol gösterir (1 mol = 1000 mmol). Sabun çubuğu NaOH ile birlikte büyür, ${mol216(3 * fat)} molde durur; bundan sonra eklenen baz artan NaOH olarak kalır. Gliserol her zaman sabunun üçte biridir.`,
    alt: "Dört yatay çubuk: kalan yağ, kalan NaOH, sabun (RCOONa) ve gliserol. Çubuk uzunlukları seçilen NaOH molüne göre değişir.",
    param: { label: "Eklenen NaOH", min: 0, max: maxBase, step: 30, init: 240, unit: " mmol" },
    draw: (value) => {
      const base = Math.round(value / 30) * 30;
      const r = saponify216({ fatMmol: fat, baseMmol: base, base: "NaOH" });
      const h = 0.6;
      const els: El[] = [];
      const bars: [string, number, Tone][] = [
        ["kalan yağ", r.fatLeft, "warn"],
        ["kalan NaOH", r.baseLeft, "b"],
        ["sabun", r.soap, "a"],
        ["gliserol", r.glycerol, "c"],
      ];
      bars.forEach(([label, amount, tone], i) => {
        const y = -i * 0.9;
        els.push(...cell(0, y, lw, h, label, tone, { fill: true }));
        if (amount > 0) els.push(rect(lw + 0.2, y, amount * k, h, tone));
        els.push(txt(v(lw + 0.3 + amount * k, y + h / 2), `${mol216(amount)} mol`, "e", { tone: "ink", small: true }));
      });
      els.push(seg(v(lw + 0.2 + 3 * fat * k, h + 0.25), v(lw + 0.2 + 3 * fat * k, -3 * 0.9 - 0.2), { tone: "muted", dash: true, thin: true }));
      els.push(txt(v(lw + 0.2 + 3 * fat * k, h + 0.3), `3·${mol216(fat)} = ${mol216(3 * fat)}`, "n", { tone: "muted", small: true }));
      els.push(...pad(-0.2, h + 0.9, lw + L + 1.6, -3 * 0.9 - 0.3));
      const lim = r.limiting === "ikisi birlikte" ? "ikisi birlikte biter" : `sınırlayıcı ${r.limiting}`;
      return {
        els,
        readout: [
          `${mol216(fat)} mol yağ + ${mol216(base)} mol NaOH: ilerleme min(${mol216(fat)}/1; ${mol216(base)}/3) = ${mol216(r.extent)}, ${lim}.`,
          `Sabun ${mol216(r.soap)} mol, gliserol ${mol216(r.glycerol)} mol; artan ${r.fatLeft ? `${mol216(r.fatLeft)} mol yağ` : r.baseLeft ? `${mol216(r.baseLeft)} mol NaOH` : "yok"}.`,
        ],
      };
    },
  };
};

export const depthFigures216: Record<string, Record<string, FigureDef>> = {
  "asit-baz-tuz-ozellikleri": { [saltSection216.figureTitle!]: salts() },
  "asit-baz-tepkimeleri": { [mixSection216.figureTitle!]: mixes() },
  "asit-baz-metaller": { [metalSection216.figureTitle!]: metals() },
  "hayatimizda-asit-baz": { [dailySection216.figureTitle!]: daily() },
  "sabun-deterjan-temizlik": { [saponSection216.figureTitle!]: sapon() },
};
