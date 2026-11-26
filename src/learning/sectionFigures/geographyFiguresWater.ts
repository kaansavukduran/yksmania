import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Water budget and artesian wells (original teaching models, MEB/OGM Coğrafya
 * 10). Budget: change = inputs − outputs for one declared system and period;
 * water seeping from the lake into the aquifer is an output of the lake but an
 * internal transfer of the whole basin. Artesian: a confined aquifer whose
 * pressure level is 105 m; well A's mouth at 110 m stays 5 m below the mouth,
 * well B's mouth at 100 m can flow. Both are artesian wells.
 */

type Bar = { name: string; val: number; tone: Tone; sign: 1 | -1 };
type Case = { name: string; bars: Bar[]; note: string };
const CASES: Case[] = [
  {
    name: "Göl sistemi",
    bars: [
      { name: "yağış", val: 50, tone: "b", sign: 1 },
      { name: "akarsu girişi", val: 30, tone: "b", sign: 1 },
      { name: "buharlaşma", val: 20, tone: "warn", sign: -1 },
      { name: "dışa akış", val: 25, tone: "warn", sign: -1 },
    ],
    note: "Değişim = 50 + 30 − 20 − 25 = +35 → depolama 100'den 135'e.",
  },
  {
    name: "Göl + sızma",
    bars: [
      { name: "yağış", val: 50, tone: "b", sign: 1 },
      { name: "akarsu girişi", val: 30, tone: "b", sign: 1 },
      { name: "buharlaşma", val: 20, tone: "warn", sign: -1 },
      { name: "dışa akış", val: 25, tone: "warn", sign: -1 },
      { name: "yer altına sızma", val: 5, tone: "warn", sign: -1 },
    ],
    note: "Gölden yer altına 5 birim sızma göl için çıkıştır: +35 − 5 = +30 → 130.",
  },
  {
    name: "Bütün havza",
    bars: [
      { name: "yağış", val: 50, tone: "b", sign: 1 },
      { name: "akarsu girişi", val: 30, tone: "b", sign: 1 },
      { name: "buharlaşma", val: 20, tone: "warn", sign: -1 },
      { name: "dışa akış", val: 25, tone: "warn", sign: -1 },
      { name: "sızma (iç aktarım)", val: 5, tone: "muted", sign: 1 },
    ],
    note: "Sızan su havzada kalıyorsa iç aktarımdır; aynı 5 birimi ikinci kez dış kayıp yazma.",
  },
];
const budget: FigureDef = {
  caption:
    "Su bütçesi: aynı sistem ve aynı süre için depolama değişimi = giriş − çıkış. Önce sistem sınırını söyle: gölden yer altına sızan su gölün hesabında çıkıştır, bütün havzanın hesabında ise iç aktarım (sayılar özgün öğretim modeli).",
  alt: "Yatay çubuklar: mavi girişler (yağış 50, akarsu 30), turuncu çıkışlar (buharlaşma 20, dışa akış 25, sızma 5); adımlarda sistem sınırı değişiyor ve net değişim yazılıyor.",
  steps: CASES.map((c) => c.name),
  draw: (_v, step) => {
    const c = CASES[step];
    const els: El[] = [];
    const K = 0.08;
    c.bars.forEach((b, i) => {
      const y = (c.bars.length - 1 - i) * 0.8;
      const w = b.val * K;
      els.push(poly([v(0, y - 0.25), v(w, y - 0.25), v(w, y + 0.25), v(0, y + 0.25)], { tone: b.tone, fill: b.tone, thin: true }));
      els.push(txt(v(-0.15, y), b.name, "w", { small: true, tone: b.tone === "muted" ? "muted" : "ink" }), txt(v(w + 0.15, y), `${b.sign > 0 ? "+" : "−"}${b.val}`, "e", { small: true, bold: true, tone: b.tone }));
    });
    const net = c.bars.filter((b) => b.tone !== "muted").reduce((a, b) => a + b.sign * b.val, 0);
    els.push(txt(v(6.2, (c.bars.length - 1) * 0.4), `net ${net > 0 ? "+" : ""}${net}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(-3.4, (c.bars.length - 1) * 0.8 + 0.6), " ", "c"), txt(v(8.6, -0.6), " ", "c"));
    return { els, readout: [c.note, "Toplam hacim ile birim zamandaki debiyi karıştırma: Q = V / t (m³/s)."] };
  },
};

type Well = { name: string; x: number; mouth: number; what: string };
const LEVEL = 105;
const WELLS: Well[] = [
  { name: "Kuyu A", x: 2, mouth: 110, what: "Ağız 110 m, basınç düzeyi 105 m: su ağzın 5 m altında durur; kendiliğinden akmaz ama yine artezyen kuyudur." },
  { name: "Kuyu B", x: 6.5, mouth: 100, what: "Ağız 100 m, basınç düzeyi 105 m: basınç ağızdan 5 m yüksek; uygun bağlantıda su kendiliğinden akabilir." },
];
const artesian: FigureDef = {
  caption:
    "Basınçlı (kapalı) akifer iki geçirimsiz katman arasındadır; besleme alanı yüksekte. Suyun yükselebileceği basınç düzeyi 105 m. Bir kuyuya tıkla: ikisi de aynı akiferi açar; yalnız B'nin fışkırması A'yı artezyen olmaktan çıkarmaz. Sıcaklık ve aralıklı püskürme verilmeden gayzer sonucu çıkmaz. Düşey ölçek abartılıdır.",
  alt: "Eğimli kesit: solda yüksek besleme alanı, iki geçirimsiz katman arasında mavi akifer; kesikli çizgi 105 m basınç düzeyi; A kuyusu 110 m yükseklikte, B kuyusu 100 m yükseklikte; B'de su ağızdan taşıyor.",
  picks: WELLS.map((w) => ({ label: w.name, title: w.name, detail: [w.what, "Belirleyici koşul basınçlı akiferdir; her artezyen kuyu fışkırmaz."] })),
  draw: (_v, _s, pick = -1) => {
    const Y = (m: number) => (m - 75) / 4;
    const G = (x: number) => 110 - (x - 2) * (10 / 4.5); // ground: 110 m at A, 100 m at B
    const T = (x: number) => G(-1) - (x + 1) * 3.67; // aquifer top, outcrops at x = −1
    const els: El[] = [];
    const xs = [-1, 9];
    const band = (top: (x: number) => number, h: number, tone: Tone) =>
      els.push(poly([v(xs[0], Y(top(xs[0]))), v(xs[1], Y(top(xs[1]))), v(xs[1], Y(top(xs[1]) - h)), v(xs[0], Y(top(xs[0]) - h))], { tone, fill: tone, thin: true }));
    band((x) => T(x) + 1.5, 1.5, "muted");
    band(T, 4, "b");
    band((x) => T(x) - 4, 1.5, "muted");
    els.push(poly([v(-1, Y(G(-1))), v(9, Y(G(9)))], { tone: "ink", open: true, bold: true }));
    els.push(txt(v(-0.7, Y(G(-1)) + 0.1), "besleme alanı", "ne", { small: true, tone: "b" }), txt(v(8.8, Y(T(8.8) - 2)), "akifer", "w", { small: true, bold: true, tone: "b" }));
    els.push(seg(v(-1, Y(LEVEL)), v(9, Y(LEVEL)), { tone: "a", dash: true }), txt(v(9.1, Y(LEVEL)), "basınç düzeyi 105 m", "e", { small: true, tone: "a" }));
    WELLS.forEach((w, i) => {
      const on = pick === i;
      const bottom = T(w.x) - 2;
      els.push(seg(v(w.x, Y(w.mouth)), v(w.x, Y(bottom)), { tone: on ? "a" : "ink", bold: on }));
      const water = Math.min(LEVEL, w.mouth);
      els.push(seg(v(w.x + 0.1, Y(bottom)), v(w.x + 0.1, Y(water)), { tone: "b", bold: true }));
      const flows = LEVEL > w.mouth;
      if (flows) els.push(vec(v(w.x, Y(w.mouth)), v(w.x, Y(w.mouth) + 1.2), { tone: "b", bold: true }));
      els.push(txt(v(w.x + (flows ? 0.3 : 0), Y(w.mouth) + (flows ? -1.0 : 0.35)), `${w.name} · ağız ${w.mouth} m`, flows ? "e" : "n", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-1.4, Y(124)), " ", "c"), txt(v(12.8, Y(T(9) - 7)), " ", "c"));
    const sel = pick >= 0 ? WELLS[pick] : undefined;
    return { els, readout: [sel ? sel.what : "Bir kuyuya tıkla ya da aşağıdan seç.", "Gözeneklilik boşluk oranı, geçirgenlik suyu iletme kolaylığıdır; aynı şey değildir."] };
  },
};

export const geographyFiguresWater: Record<string, Record<string, FigureDef>> = {
  "dunyada-sular": {
    "Çıkış ile buharlaşmayı bütçede izle": budget,
    "Akifer ve kaynağın çıkış yolu": artesian,
  },
};
