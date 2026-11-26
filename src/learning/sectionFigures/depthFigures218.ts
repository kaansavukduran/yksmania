import { circle, poly, regular, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad } from "./physicsFigures058Kit";
import {
  BREEDERS218, CYCLE_STEPS218, DIPLOID218, INVERTEBRATES218, LYTIC_PHAGE218, TEMPERATE_PHAGE218, VERTEBRATES218, VIRUSES218,
  chambers218, circulationCell218, cycleSection218, gameteN218, heartCell218, heartPasses218, invertebrateSection218,
  reproSection218, symmetryCell218, vertebrateSection218, virusSection218, zygote218,
  type InvertebrateGroup218,
} from "../depth218";

/*
 * 0.218.0 TYT Biyoloji tablo bölümlerinin çizimleri. Kutulardaki adlar,
 * sayılar ve okumalar tabloyu üreten aynı verilerden gelir. Çizimler
 * şematiktir: kalp kutuları, virionlar ve hücreler ölçekli değildir;
 * çizilen faj ya da hücre adedi gerçek bir üretim sayısı değildir.
 */

const rect = (x0: number, y0: number, x1: number, y1: number, style: { tone: Tone; fill?: Tone; thin?: boolean; dash?: boolean; bold?: boolean }): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], style);
const lowerFirst = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);

/* ---------- 1 · Omurgalı kalbi ve dolaşım turu ---------- */

const CW = 1.7;
const CH = 1.2;
const heartBoxes = (c: { atria: number; ventricles: number; partialSeptum?: boolean }, x0: number, y0: number): El[] => {
  const els: El[] = [];
  const width = 2 * CW;
  const row = (n: number, y: number, label: string, tone: Tone) => {
    const w = width / n;
    for (let i = 0; i < n; i++) {
      els.push(rect(x0 + i * w, y, x0 + (i + 1) * w, y + CH, { tone, fill: tone, thin: true }));
      els.push(txt(v(x0 + (i + 0.5) * w, y + CH / 2), label, "c", { small: true, bold: true, tone: "ink" }));
    }
  };
  row(c.atria, y0, "Ku", "b");
  row(c.ventricles, y0 - CH - 0.15, "Ka", "a");
  if (c.partialSeptum) els.push(seg(v(x0 + CW, y0 - 0.15 - CH), v(x0 + CW, y0 - 0.15 - CH * 0.5), { tone: "warn", bold: true }));
  return els;
};
const node = (c: V, label: string, on: boolean): El[] => [
  rect(c[0] - 1.05, c[1] - 0.4, c[0] + 1.05, c[1] + 0.4, on ? { tone: "a", fill: "a", thin: true } : { tone: "muted", thin: true }),
  txt(c, label, "c", { small: true, bold: on }),
];
const vertebrateFigure: FigureDef = {
  caption: "Adımla bir omurgalı grubu seç. Solda tipik kalbin kulakçık (Ku) ve karıncık (Ka) kutuları, sağda kanın bir tam turu var; kalp kutusunun kaç kez geçildiğini say. Karıncığın tabanından yükselen kısa turuncu çizgi kısmi bölmedir.",
  alt: `Solda üstte kulakçık, altta karıncık kutuları; sağda dolaşım halkası. Gruplar: ${VERTEBRATES218.map((c) => `${c.name} ${chambers218(c)} odacık, ${c.circulation} dolaşım`).join("; ")}.`,
  steps: VERTEBRATES218.map(({ name }) => name),
  draw: (_value, step) => {
    const c = VERTEBRATES218[step];
    const els: El[] = [txt(v(CW, 1.75), `${chambers218(c)} odacık`, "c", { small: true, bold: true, tone: "a" }), ...heartBoxes(c, 0, 0.2)];
    if (c.heartException) {
      els.push(txt(v(CW, -2.75), `${c.heartException.example}: ${chambers218(c.heartException)}`, "c", { small: true, tone: "warn" }));
    }
    // Dolaşım halkası: tek dolaşımda 3, çift dolaşımda 4 durak.
    const cx = 7.3;
    const stops: { p: V; label: string; heart: boolean }[] = c.circulation === "tek"
      ? [{ p: v(cx, 1.5), label: "Kalp", heart: true }, { p: v(cx + 1.6, -0.9), label: c.gasStop, heart: false }, { p: v(cx - 1.6, -0.9), label: "Vücut", heart: false }]
      : [{ p: v(cx, 1.5), label: "Kalp", heart: true }, { p: v(cx + 1.7, 0), label: c.gasStop, heart: false }, { p: v(cx, -1.5), label: "Kalp", heart: true }, { p: v(cx - 1.7, 0), label: "Vücut", heart: false }];
    stops.forEach((s, i) => {
      const next = stops[(i + 1) % stops.length].p;
      const a: V = [s.p[0] + (next[0] - s.p[0]) * 0.32, s.p[1] + (next[1] - s.p[1]) * 0.32];
      const b: V = [s.p[0] + (next[0] - s.p[0]) * 0.68, s.p[1] + (next[1] - s.p[1]) * 0.68];
      els.push(vec(a, b, { tone: "muted" }));
    });
    stops.forEach((s) => els.push(...node(s.p, s.label, s.heart)));
    els.push(...pad(-0.4, 2.2, cx + 2.9, -3.1));
    return {
      els,
      readout: [
        `${c.name}: ${heartCell218(c)}.`,
        `Bir tam turda kan kalpten ${heartPasses218(c)} kez geçer. Solunum: ${lowerFirst(c.respiration)}.`,
        `${c.thermo.charAt(0).toLocaleUpperCase("tr-TR") + c.thermo.slice(1)}; ${c.fertilisation} döllenme${c.fertNote ? ` (${c.fertNote})` : ""}.`,
      ],
    };
  },
};

/* ---------- 2 · Omurgasız süzgeci ---------- */

const invFilters: { label: string; hit: (g: InvertebrateGroup218) => boolean | "kısmen" }[] = [
  { label: "Ergin ışınsal", hit: (g) => g.symmetry === "ışınsal" },
  { label: "İki yanlı", hit: (g) => g.symmetry === "iki yanlı" },
  { label: "Dolaşım yok", hit: (g) => g.circulation === "yok" },
  { label: "Açık dolaşım", hit: (g) => g.circulation === "açık" },
  { label: "Kapalı dolaşım", hit: (g) => (g.circulation === "kapalı" ? true : /kapalı/.test(g.circulationNote ?? "") ? "kısmen" : false) },
  { label: "Yüzeyle solunum", hit: (g) => g.surfaceBreathing },
];
const BW = 4.3;
const BH = 1.15;
const symmetryGlyph = (g: InvertebrateGroup218, c: V): El[] => {
  const r = 0.32;
  if (g.symmetry === "ışınsal") {
    const spokes = g.name === "Derisidikenliler" ? 5 : 6;
    return [circle(c, r, { tone: "ink", thin: true }), ...regular(spokes, r, 90, c).map((p) => seg(c, p, { tone: "ink", thin: true }))];
  }
  if (g.symmetry === "iki yanlı") {
    return [poly([v(c[0], c[1] + r), v(c[0] + r * 0.6, c[1]), v(c[0], c[1] - r), v(c[0] - r * 0.6, c[1])], { tone: "ink", thin: true }), seg(v(c[0], c[1] + r + 0.08), v(c[0], c[1] - r - 0.08), { tone: "ink", dash: true, thin: true })];
  }
  return [poly([v(c[0] - r, c[1] + 0.05), v(c[0] - 0.05, c[1] + r), v(c[0] + r, c[1] + 0.12), v(c[0] + 0.15, c[1] - r), v(c[0] - 0.25, c[1] - 0.2)], { tone: "ink", thin: true, smooth: true })];
};
const invertebrateFigure: FigureDef = {
  caption: "Sekiz kutu tablodaki sekiz omurgasız grubudur; sol uçtaki simge ergin simetriyi gösterir (eşkenar dörtgen ve kesik eksen: iki yanlı, ışınlı daire: ışınsal, düzensiz biçim: asimetrik). Adımla bir koşul seç: koşulu sağlayan kutular dolar, yalnız bir alt grupta sağlayan kutu turuncudur.",
  alt: `İki sütun, dört satır kutu: ${INVERTEBRATES218.map((g) => `${g.name} (${g.symmetry}, dolaşım ${g.circulation})`).join("; ")}. Seçilen koşulu sağlayan kutular dolgulu.`,
  steps: invFilters.map(({ label }) => label),
  draw: (_value, step) => {
    const f = invFilters[step];
    const els: El[] = [];
    INVERTEBRATES218.forEach((g, i) => {
      const x = (i % 2) * (BW + 0.4);
      const y = -Math.floor(i / 2) * (BH + 0.35);
      const hit = f.hit(g);
      const tone: Tone = hit === "kısmen" ? "warn" : hit ? "a" : "muted";
      els.push(rect(x, y, x + BW, y + BH, hit ? { tone, fill: tone, thin: true } : { tone, thin: true }));
      els.push(...symmetryGlyph(g, v(x + 0.55, y + BH / 2)));
      els.push(txt(v(x + 1.05, y + BH / 2), g.short, "e", { small: true, bold: !!hit }));
    });
    els.push(...pad(-0.2, BH + 0.2, 2 * BW + 0.6, -3 * (BH + 0.35) - 0.2));
    const full = INVERTEBRATES218.filter((g) => f.hit(g) === true);
    const part = INVERTEBRATES218.filter((g) => f.hit(g) === "kısmen");
    return {
      els,
      readout: [
        `${f.label}: ${full.map(({ name }) => name).join(", ")}${part.length ? `; kısmen ${part.map((g) => `${g.name} (${g.circulationNote})`).join(", ")}` : ""}.`,
        `Simetri: ${full.map((g) => `${g.short} ${lowerFirst(symmetryCell218(g))}`).join(" · ")}.`,
        `Dolaşım: ${full.map((g) => `${g.short} ${lowerFirst(circulationCell218(g))}`).join(" · ")}.`,
      ],
    };
  },
};

/* ---------- 3 · Virion katmanları ---------- */

const virionFigure: FigureDef = {
  caption: "Adımla bir virüs seç. Altıgen kapsid her örnekte var; dış halka lipit zarftır ve yalnız zarflı örneklerde çizilir. İçteki tek çizgi RNA, çift çizgi DNA genomudur. Çizim ölçekli değildir.",
  alt: `Solda şematik virion: altıgen kapsid, içinde genom çizgisi, zarflıysa dış halka; fajda baş, kuyruk ve lifler. Sağda ad, genom, zarf ve konak. Örnekler: ${VIRUSES218.map((x) => `${x.name} ${x.genome}, ${x.envelope ? "zarflı" : "zarfsız"}`).join("; ")}.`,
  steps: VIRUSES218.map(({ short }) => short),
  draw: (_value, step) => {
    const x = VIRUSES218[step];
    const c: V = x.phageShape ? v(0, 0.9) : v(0, 0);
    const els: El[] = [poly(regular(6, 1.1, 90, c), { tone: "a", thin: true })];
    const wave = (dy: number) => poly(Array.from({ length: 9 }, (_, i) => v(c[0] - 0.6 + i * 0.15, c[1] + dy + (i % 2 ? 0.18 : -0.18))), { tone: "b", open: true, smooth: true });
    els.push(wave(0.08));
    if (x.genome === "DNA") els.push(wave(-0.18));
    if (x.envelope) {
      els.push(circle(c, 1.55, { tone: "c" }));
      regular(10, 1.55, 90, c).forEach((p) => els.push(seg(p, [c[0] + (p[0] - c[0]) * 1.18, c[1] + (p[1] - c[1]) * 1.18], { tone: "c" })));
    }
    if (x.phageShape) {
      els.push(rect(-0.18, c[1] - 1.1, 0.18, c[1] - 2.4, { tone: "a", thin: true }));
      [-1, 1].forEach((s) => els.push(poly([v(0, c[1] - 2.4), v(s * 0.8, c[1] - 2.7), v(s * 1.1, c[1] - 3.2)], { tone: "a", open: true, thin: true })));
    }
    els.push(
      txt(v(2.3, 1.2), x.short, "e", { bold: true, tone: "a" }),
      txt(v(2.3, 0.5), `Genom: ${x.genome}`, "e", { small: true, tone: "b" }),
      txt(v(2.3, -0.1), `Zarf: ${x.envelope ? "var" : "yok"}`, "e", { small: true, tone: x.envelope ? "c" : "ink" }),
      txt(v(2.3, -0.7), `Konak: ${x.host}`, "e", { small: true }),
      ...pad(-2.0, 2.1, 6.6, -2.6),
    );
    return {
      els,
      readout: [
        `${x.name}: genom ${x.genome}, ${x.envelope ? "lipit zarf var" : "zarf yok"}; kapsid var.`,
        `Konak: ${x.host} · ${x.target}. ${x.disease}.`,
        "Virüs hücre değildir; yeni parçacıkları yalnız uygun konak hücrede üretilir.",
      ],
    };
  },
};

/* ---------- 4 · Litik ve lizogenik iki yol ---------- */

const phage = (c: V, scale = 1, tone: Tone = "a"): El[] => [
  poly(regular(6, 0.32 * scale, 90, c), { tone, thin: true }),
  seg(v(c[0], c[1] - 0.32 * scale), v(c[0], c[1] - 0.75 * scale), { tone }),
];
const bacterium = (x0: number, y0: number, x1: number, y1: number, broken: boolean): El =>
  rect(x0, y0, x1, y1, { tone: "ink", thin: !broken, dash: broken });
const chromosome = (c: V, r: number, withProphage: boolean): El[] => {
  const els: El[] = [circle(c, r, { tone: "muted" })];
  if (withProphage) {
    const arc = Array.from({ length: 7 }, (_, i) => {
      const t = ((60 + i * 10) * Math.PI) / 180;
      return v(c[0] + r * Math.cos(t), c[1] + r * Math.sin(t));
    });
    els.push(poly(arc, { tone: "b", open: true, bold: true }));
  }
  return els;
};
const phageDNA = (c: V): El => seg(v(c[0] - 0.3, c[1]), v(c[0] + 0.3, c[1]), { tone: "b", bold: true });
const PANEL = 5.6;
const cycleFigure: FigureDef = {
  caption: `Soldaki şerit litik, sağdaki lizogenik yoldur; adımla basamağı değiştir. Mavi kalın çizgi faj DNA’sıdır, gri halka bakteri DNA’sıdır. Kesik çerçeve parçalanan bakteridir. Çizilen faj sayısı gerçek bir üretim sayısı değildir.`,
  alt: `İki şerit yan yana. Her şeritte bakteri dikdörtgeni, içinde bakteri DNA halkası. Basamaklar: ${CYCLE_STEPS218.map(({ name }) => name).join(", ")}. Lizogenik şeritte faj DNA’sı halkaya katılır, sonra iki bakteri görülür.`,
  steps: CYCLE_STEPS218.map(({ name }) => name),
  draw: (_value, step) => {
    const s = CYCLE_STEPS218[step];
    const els: El[] = [
      txt(v(PANEL / 2 - 0.3, 2.6), "Litik", "c", { small: true, bold: true, tone: "a" }),
      txt(v(PANEL + 0.4 + PANEL / 2, 2.6), "Lizogenik", "c", { small: true, bold: true, tone: "b" }),
      seg(v(PANEL, 2.8), v(PANEL, -2.9), { tone: "muted", thin: true, dash: true }),
    ];
    // Litik şerit
    const L = { x0: 0.3, y0: -1.6, x1: 4.6, y1: 1.2 };
    els.push(bacterium(L.x0, L.y0, L.x1, L.y1, !s.hostAlive.lytic), ...chromosome(v(1.4, -0.3), 0.55, false));
    if (step <= 1) els.push(...phage(v(3.2, L.y1 + 1.05), 1.3));
    if (step === 1) els.push(phageDNA(v(3.2, 0.2)));
    if (step === 2) [v(3.0, 0.5), v(3.7, -0.1), v(2.9, -0.8)].forEach((p) => els.push(phageDNA(p)));
    if (step === 2) [v(2.6, 0.0), v(3.9, 0.6)].forEach((p) => els.push(poly(regular(6, 0.2, 90, p), { tone: "a", thin: true })));
    if (step === 3) [v(2.8, 0.6), v(3.8, 0.6), v(3.3, -0.6)].forEach((p) => els.push(...phage(p, 0.85)));
    if (step === 4) [v(-0.2, 0.8), v(-0.2, -0.9), v(5.0, 0.8), v(5.0, -0.9), v(1.4, -2.2), v(3.4, -2.2)].forEach((p) => els.push(...phage(p, 0.85)));
    // Lizogenik şerit
    const ox = PANEL + 0.4;
    if (step <= 2) {
      els.push(bacterium(ox + 0.3, -1.6, ox + 4.6, 1.2, false), ...chromosome(v(ox + 2.45, -0.2), 0.75, step === 2));
      if (step <= 1) els.push(...phage(v(ox + 3.6, 2.25), 1.3));
      if (step === 1) els.push(phageDNA(v(ox + 3.6, 0.6)));
    } else {
      [-1.75, 0.6].forEach((y) => {
        els.push(bacterium(ox + 0.6, y, ox + 4.3, y + 1.0, false), ...chromosome(v(ox + 2.45, y + 0.5), 0.34, true));
      });
      if (step === 4) els.push(txt(v(ox + 2.45, -2.35), "uygun koşulda → litik", "c", { small: true, tone: "warn" }));
    }
    els.push(...pad(-0.6, 3.0, 2 * PANEL + 0.6, -3.0));
    return {
      els,
      readout: [
        `${s.name}. Litik (${LYTIC_PHAGE218}): ${lowerFirst(s.lytic)}`,
        `Lizogenik (${TEMPERATE_PHAGE218}): ${lowerFirst(s.lysogenic)}`,
        `Ortamda yeni virion: litikte ${s.newVirions.lytic ? "var" : "yok"}, lizogenikte ${s.newVirions.lysogenic ? "var" : "yok"}. Konak bakteri: litikte ${s.hostAlive.lytic ? "yaşıyor" : "parçalandı"}, lizogenikte ${s.hostAlive.lysogenic ? "yaşıyor" : "parçalandı"}.`,
      ],
    };
  },
};

/* ---------- 5 · Gamet ve zigot sayıları ---------- */

const cell = (c: V, r: number, label: string, tone: Tone, fill: boolean): El[] => [
  circle(c, r, fill ? { tone, fill: tone, thin: true } : { tone, thin: true }),
  txt(c, label, "c", { small: true, bold: true }),
];
const reproFigure: FigureDef = {
  caption: "Adımla bir tür seç. Üstteki iki ata hücresi 2n, ortadaki gametler n, alttaki zigot n + n kromozom taşır. Dış döllenmede buluşma dalgalı su çizgilerinin içinde, iç döllenmede kesik çerçeveli dişi vücudunun içinde çizilir.",
  alt: `Üstte iki büyük hücre (2n), oklarla iki küçük gamet (n), gametlerden bir zigota (2n) ok. Türler: ${BREEDERS218.map((b) => `${b.species} 2n = ${DIPLOID218[b.species]}, ${b.fertilisation} döllenme`).join("; ")}.`,
  steps: BREEDERS218.map(({ species }) => species),
  draw: (_value, step) => {
    const b = BREEDERS218[step];
    const d = DIPLOID218[b.species];
    const n = gameteN218(d);
    const z = zygote218(d);
    const els: El[] = [];
    const parents: V[] = [v(-2.2, 2.4), v(2.2, 2.4)];
    const gametes: V[] = [v(-1.0, 0.3), v(1.0, 0.3)];
    const zyg: V = v(0, -1.9);
    parents.forEach((p, i) => {
      els.push(...cell(p, 0.75, `2n=${d}`, "muted", false));
      els.push(vec(v(p[0] + (gametes[i][0] - p[0]) * 0.45, p[1] - 0.8), v(gametes[i][0] + (p[0] - gametes[i][0]) * 0.1, gametes[i][1] + 0.55), { tone: "muted" }));
      els.push(...cell(gametes[i], 0.5, `n=${n}`, i === 0 ? "b" : "a", true));
      els.push(vec(v(gametes[i][0] * 0.8, gametes[i][1] - 0.5), v(zyg[0] + gametes[i][0] * 0.38, zyg[1] + 0.78), { tone: "ink" }));
    });
    els.push(...cell(zyg, 0.75, `${z}`, "c", true));
    els.push(txt(v(-3.4, 1.35), "mayoz", "w", { small: true, tone: "muted" }), txt(v(-1.3, -1.0), "döllenme", "w", { small: true, tone: "muted" }));
    if (b.medium === "su") {
      [1.2, -3.0].forEach((y) =>
        els.push(poly(Array.from({ length: 13 }, (_, i) => v(-3.0 + i * 0.5, y + (i % 2 ? 0.12 : -0.12))), { tone: "b", open: true, smooth: true, thin: true })));
      els.push(txt(v(3.1, -1.9), "su", "w", { small: true, tone: "b" }));
    } else {
      els.push(rect(-2.4, -3.0, 2.4, 1.0, { tone: "warn", thin: true, dash: true }), txt(v(2.3, -2.7), "dişi vücudu", "e", { small: true, tone: "warn" }));
    }
    els.push(...pad(-4.4, 3.4, 4.4, -3.4));
    return {
      els,
      readout: [
        `${b.species} (${b.group}): vücut hücresi 2n = ${d}; gamet ${d} ÷ 2 = ${n}; zigot ${n} + ${n} = ${z}.`,
        `${b.fertilisation.charAt(0).toLocaleUpperCase("tr-TR") + b.fertilisation.slice(1)} döllenme${b.medium ? ` (${b.medium}da)` : ""}; ${b.development}.`,
      ],
    };
  },
};

export const depthFigures218: Record<string, Record<string, FigureDef>> = {
  omurgalilar: { [vertebrateSection218.title]: vertebrateFigure },
  omurgasizlar: { [invertebrateSection218.title]: invertebrateFigure },
  virusler: { [virusSection218.title]: virionFigure, [cycleSection218.title]: cycleFigure },
  "eseyli-ureme": { [reproSection218.title]: reproFigure },
};
