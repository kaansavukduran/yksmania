import {
  add,
  fmt,
  pol,
  poly,
  pt,
  seg,
  txt,
  v,
  vec,
  span,
  mul,
  ang,
  type El,
  type FigureDef,
  type V,
  type Tone,
} from "./figureKit";
import { lampEfficiencyTitle } from "../lampEfficiency061";
import { lampEfficiencyFigure } from "./lampEfficiencyFigure061";
import { railEnergyTitle } from "../railEnergy060";
import { railEnergyFigure } from "./railEnergyFigure060";
import { bounceEnergyTitle } from "../bounceEnergy059";
import { bounceEnergyFigure } from "./bounceEnergyFigure059";
import { bicycleEnergyTitle } from "../bicycleEnergy058";
import { bicycleEnergyFigure } from "./bicycleEnergyFigure058";
import { cylinderPotentialTitle } from "../cylinderPotentialEnergy";
import { cylinderPotentialFigure } from "./cylinderPotentialEnergy054";
import { averageWorkPowerComparisonTitle, averageWorkPowerTitle } from "../averageWorkPower";
import { averageWorkPowerComparison, averageWorkPowerFigure } from "./averageWorkPower056";

/*
 * TYT Fizik "Enerji ve hareket" section figures. Every number on a drawing
 * comes from the same formula that the readout prints (W = F·Δr·cosθ,
 * K = ½mv², U = mgh, U = ½kx², P = F·v, η = çıktı/giriş).
 */

type T = Tone;

function axes(o: V, w: number, hUp: number, hDown: number, xLabel: string, yLabel: string, hLeft = 0): El[] {
  return [
    vec(add(o, v(0, -hDown)), add(o, v(0, hUp + 0.4)), { tone: "muted", thin: true }),
    vec(add(o, v(-hLeft, 0)), add(o, v(w + 0.4, 0)), { tone: "muted", thin: true }),
    txt(add(o, v(w + 0.4, 0)), xLabel, "se", { small: true, tone: "muted" }),
    txt(add(o, v(0, hUp + 0.4)), yLabel, "nw", { small: true, tone: "muted" }),
  ];
}
const curve = (pts: V[], tone: T = "b"): El => poly(pts, { open: true, tone: tone, bold: true });
const box = (x: number, y: number, w: number, h: number, tone: T = "muted"): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: tone, tone: tone === "muted" ? "ink" : tone, thin: true });
const block = (x: number, y: number, w: number, h: number, label?: string): El[] => [
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: "muted", tone: "ink" }),
  ...(label ? [txt(v(x + w / 2, y + h / 2), label, "c", { small: true, bold: true })] : []),
];
const ground = (x0: number, x1: number, y = 0): El[] => [
  seg(v(x0, y), v(x1, y), { tone: "ink" }),
  ...Array.from({ length: Math.floor((x1 - x0) / 0.6) }, (_, i) => seg(v(x0 + 0.3 + i * 0.6, y), v(x0 + i * 0.6, y - 0.3), { thin: true, tone: "muted" })),
];

/** Vertical energy bar with its label below and value above. */
function bar(x: number, value: number, scale: number, label: string, tone: T, w = 0.9): El[] {
  const h = value * scale;
  return [
    ...(Math.abs(h) > 1e-6 ? [box(x, Math.min(0, h), w, Math.abs(h), tone)] : [seg(v(x, 0), v(x + w, 0), { tone: tone, bold: true })]),
    txt(v(x + w / 2, Math.max(0, h)), `${fmt(value)} J`, "n", { small: true, bold: true, tone: tone }),
    txt(v(x + w / 2, Math.min(0, h) - 0.1), label, "s", { small: true, tone: "muted" }),
  ];
}
/** Stacked bar: segments bottom to top. */
function stack(x: number, parts: [number, string, T][], scale: number, title: string, w = 1.2): El[] {
  const els: El[] = [];
  let y = 0;
  for (const [val, name, tone] of parts) {
    if (val <= 0) continue;
    els.push(box(x, y, w, val * scale, tone), txt(v(x + w + 0.15, y + (val * scale) / 2), `${name} ${fmt(val)} J`, "e", { small: true, tone: tone }));
    y += val * scale;
  }
  els.push(txt(v(x + w / 2, -0.1), title, "s", { small: true, bold: true }));
  return els;
}

const enerji: Record<string, FigureDef> = {
  [averageWorkPowerTitle]: averageWorkPowerFigure,
  [averageWorkPowerComparisonTitle]: averageWorkPowerComparison,
  [cylinderPotentialTitle]: cylinderPotentialFigure,
  [bicycleEnergyTitle]: bicycleEnergyFigure,
  [bounceEnergyTitle]: bounceEnergyFigure,
  [railEnergyTitle]: railEnergyFigure,
  [lampEfficiencyTitle]: lampEfficiencyFigure,
  "Yorulmak ile fiziksel iş aynı değildir": {
    caption:
      "F = 10 N'luk kuvvet bloğu Δr = 4 m yürütürken açıyı değiştir: işi yalnız kuvvetin yer değiştirme yönündeki bileşeni (F·cosθ) yapar. θ = 90°'de iş 0, θ > 90°'de negatiftir.",
    alt: "Zeminde bir blok, bloktan açılı çıkan kuvvet oku, kuvvetin yatay bileşeni kesikli ok ve altta 4 metrelik yer değiştirme oku.",
    param: { label: "θ", min: 0, max: 180, step: 15, init: 30, unit: "°" },
    draw: (th) => {
      const F = 10;
      const d = 4;
      const c = Math.cos((th * Math.PI) / 180);
      const o = v(2.6, 0.6);
      const tip = add(o, pol(2.6, th));
      const fx = add(o, v(2.6 * c, 0));
      const W = F * d * c;
      return {
        els: [
          ...ground(-0.6, 7.4),
          ...block(0.6, 0, 2, 1.2, "m"),
          vec(o, tip, { tone: "a", bold: true }),
          txt(tip, "F = 10 N", "n", { small: true, tone: "a" }),
          ...(Math.abs(c) > 0.02 ? [vec(o, fx, { tone: "b", dash: true })] : []),
          txt(add(fx, v(0, -0.05)), `F·cosθ = ${fmt(F * c)} N`, c >= 0 ? "se" : "sw", { small: true, tone: "b" }),
          ...(th > 0 && th < 180 ? [ang(o, add(o, v(1, 0)), tip, `${th}°`, { tone: "a", r: 30 })] : []),
          vec(v(0.6, -0.9), v(0.6 + d, -0.9), { tone: "c", bold: true }),
          txt(v(0.6 + d / 2, -0.9), "Δr = 4 m", "s", { small: true, tone: "c" }),
        ],
        readout: [`W = F·Δr·cosθ = 10 · 4 · ${fmt(c, 2)} = ${fmt(W)} J`, W > 0.05 ? "Pozitif iş: kuvvet enerji aktarıyor" : W < -0.05 ? "Negatif iş: kuvvet hareketten enerji alıyor" : "İş sıfır: kuvvet yer değiştirmeye dik"],
      };
    },
  },
  "Net iş kinetik enerjiyi değiştirir": {
    caption:
      "Yatay yolda 5 m: çekme +40 J, sürtünme −15 J, ağırlık ve normal kuvvet 0 J iş yapar. İşaretli toplam Wnet = 25 J, kinetik enerjiyi 10 J'den 35 J'ye çıkarır.",
    alt: "Dört kuvvetin işini gösteren işaretli sütunlar ve yanında ilk ile son kinetik enerji sütunları; aradaki fark net işe eşit.",
    draw: () => {
      const s = 0.08;
      return {
        els: [
          seg(v(-0.4, 0), v(13.3, 0), { tone: "muted", thin: true }),
          ...bar(0, 40, s, "çekme", "a"),
          ...bar(1.8, -15, s, "sürtünme", "warn"),
          ...bar(3.6, 0, s, "ağırlık", "muted"),
          ...bar(5.4, 0, s, "normal", "muted"),
          ...bar(7.6, 25, s, "Wnet", "c"),
          ...bar(10.2, 10, s, "K ilk", "b"),
          ...bar(12, 35, s, "K son", "b"),
          txt(v(9.3, 1.2), "=", "c", { bold: true }),
          txt(v(11.65, 4.1), "ΔK = 25 J", "n", { small: true, tone: "c", bold: true }),
        ],
        readout: ["Wnet = 40 − 15 + 0 + 0 = 25 J", "ΔK = 35 − 10 = 25 J"],
      };
    },
  },
  "Potansiyel enerji referans ve sistemle tanımlanır": {
    caption:
      "Uzamış homojen cisimde yükseklik kütle merkezinin yüksekliğidir. 2 m'lik, 3 kg'lık çubuk yatıkken merkezi zeminde (h ≈ 0), dikken 1 m yukarıdadır: ΔU = mgΔh = 3·10·1 = 30 J (g = 10 m/s², kalınlık ihmal).",
    alt: "Solda zeminde yatan çubuk, sağda dik duran çubuk; ikisinde de orta noktası kütle merkezi olarak işaretli ve dik çubukta 1 metrelik yükseklik ölçüsü.",
    draw: () => ({
      els: [
        ...ground(-0.5, 8.5),
        seg(v(0, 0.05), v(2, 0.05), { tone: "b", bold: true }),
        pt(v(1, 0.05), "KM", "n", "a"),
        seg(v(6, 0), v(6, 2), { tone: "b", bold: true }),
        pt(v(6, 1), "KM", "w", "a"),
        ...span(v(6.3, 0), v(6.3, 1), "1 m", 1, "a"),
        ...span(v(7.6, 0), v(7.6, 2), "2 m", 1),
        txt(v(1, -0.5), "yatık: h = 0", "s", { small: true }),
        txt(v(6, -0.5), "dik: h = 1 m", "s", { small: true }),
      ],
      readout: ["ΔU = 3 · 10 · (1 − 0) = 30 J"],
    }),
  },
  "Mekanik enerji ne zaman korunur?": {
    caption:
      "Sürtünmesiz yolda 1 kg'lık top 5 m yükseklikten durgun bırakılıyor (g = 10 m/s²). Topu kaydır: U azaldıkça K aynı miktarda artar, toplam 50 J sabit kalır. Top başladığı yükseklikten yukarı çıkamaz.",
    alt: "Tepe–çukur–tepe biçimli bir yol, üzerinde top ve sağda kinetik, potansiyel ve toplam mekanik enerji sütunları.",
    param: { label: "konum x", min: 0, max: 8, step: 0.25, init: 2, unit: " m" },
    draw: (x) => {
      const h = (s: number) => 3 + 2 * Math.cos((Math.PI * s) / 4);
      const track = Array.from({ length: 41 }, (_, i) => v((8 * i) / 40, h((8 * i) / 40)));
      const U = 10 * h(x);
      const K = 50 - U;
      const sc = 0.1;
      const bx = 10;
      return {
        els: [
          ...ground(-0.5, 8.5),
          curve(track, "ink"),
          pt(v(x, h(x) + 0.2), "", "n", "a"),
          seg(v(x, 0), v(x, h(x)), { dash: true, thin: true, tone: "muted" }),
          txt(v(x, 0.35), `h = ${fmt(h(x))} m`, x < 4 || x > 6.5 ? "w" : "e", { small: true, tone: "muted" }),
          seg(v(bx - 0.3, 0), v(bx + 4.3, 0), { tone: "muted", thin: true }),
          ...bar(bx, K, sc, "K", "b"),
          ...bar(bx + 1.4, U, sc, "U", "a"),
          ...bar(bx + 2.8, 50, sc, "K + U", "c"),
        ],
        readout: [`U = mgh = ${fmt(U)} J, K = 50 − U = ${fmt(K)} J`, `v = √(2K/m) = ${fmt(Math.sqrt(2 * K), 2)} m/s`],
      };
    },
  },
  "Isıl aktarım olunca enerji yok olmaz": {
    caption:
      "Durgun zeminde kayan blok: önce 50 J kinetik enerji. Sürtünme hareketin tersine 30 J negatif iş yapınca blokta 20 J kinetik kalır; blok+zemin sisteminde eksilen 30 J iç enerji artışı olarak görünür. Toplam 50 J aynıdır.",
    alt: "Solda tek renkli 50 joule'lük sütun, sağda 20 joule kinetik ve 30 joule iç enerji parçalarından oluşan aynı boyda yığılmış sütun.",
    draw: () => {
      const s = 0.08;
      return {
        els: [
          seg(v(-0.4, 0), v(8, 0), { tone: "muted", thin: true }),
          ...stack(0, [[50, "K", "b"]], s, "önce"),
          ...stack(4, [[20, "K", "b"], [30, "iç enerji", "warn"]], s, "sonra"),
          vec(v(2.4, 4.6), v(3.7, 4.6), { tone: "muted" }),
          txt(v(3.05, 4.6), "Wsür = −30 J", "n", { small: true, tone: "warn" }),
        ],
        readout: ["50 J = 20 J (K) + 30 J (iç enerji)"],
      };
    },
  },
  "Güç hızla, verim payla ilgilidir": {
    caption:
      "Bir aygıt 10 s'de 1000 J alıyor: ortalama giriş gücü 1000/10 = 100 W. Yararlı payı değiştir; verim yararlı çıktı/toplam giriştir ve 1'i geçmez. Kalan enerji yok olmaz, başka biçime gider.",
    alt: "1000 joule'lük giriş sütunu ve onu yararlı çıktı ile başka biçimlere giden enerji olarak ikiye bölen yığılmış sütun.",
    param: { label: "yararlı çıktı", min: 0, max: 1000, step: 100, init: 600, unit: " J" },
    draw: (u) => {
      const s = 0.005;
      return {
        els: [
          seg(v(-0.4, 0), v(8, 0), { tone: "muted", thin: true }),
          ...stack(0, [[1000, "giriş", "a"]], s, "giriş"),
          ...stack(4, [[u, "yararlı", "c"], [1000 - u, "başka biçim", "muted"]], s, "çıkış"),
        ],
        readout: [`η = ${fmt(u)} / 1000 = ${fmt(u / 1000, 2)} (%${fmt(u / 10)})`, `Yararlı ortalama güç = ${fmt(u / 10)} W`],
      };
    },
  },
  "Sistem sınırını çiz": {
    caption:
      "Aynı yükselen blok iki yoldan hesaplanır. Sol: sistem yalnız blok; ağırlık dış kuvvettir ve işi Wg = −mgh olarak net işe girer. Sağ: sistem blok + Dünya; yerçekimi etkisi ΔU = +mgh olarak sayılır. İkisini birlikte sayma.",
    alt: "İki panel: solda kesikli sınır yalnız bloğu çevreliyor ve ağırlık oku sınırın dışından geliyor; sağda kesikli sınır blok ile zemini birlikte çevreliyor.",
    draw: () => {
      const dashed = (ps: V[]): El => poly(ps, { dash: true, tone: "a" });
      return {
        els: [
          ...ground(-0.5, 3.5),
          ...block(0.8, 1.6, 1.4, 1, "m"),
          dashed([v(0.5, 1.3), v(2.5, 1.3), v(2.5, 2.9), v(0.5, 2.9)]),
          vec(v(1.5, 1.6), v(1.5, 0.5), { tone: "warn", bold: true }),
          txt(v(1.5, 0.5), "mg (dış)", "e", { small: true, tone: "warn" }),
          txt(v(1.5, -0.5), "Wnet'e −mgh", "s", { small: true, bold: true }),
          vec(v(2.8, 1.8), v(2.8, 2.8), { tone: "c" }),
          vec(v(8.75, 1.8), v(8.75, 2.6), { tone: "c" }),
          ...ground(5.5, 9.5),
          ...block(6.8, 1.6, 1.4, 1, "m"),
          dashed([v(5.7, -0.6), v(9.3, -0.6), v(9.3, 2.9), v(5.7, 2.9)]),
          txt(v(7.5, -0.9), "U'ya +mgh", "s", { small: true, bold: true }),
          txt(v(7.5, 0.6), "blok + Dünya", "c", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Kuvvet–konum grafiğinde iş": {
    caption:
      "Kuvvet 0'dan 20 N'a doğrusal artarken iş, grafiğin altındaki üçgenin alanıdır: ½·Fmax·L. Son kuvveti bütün yola uygulanmış saymak (kesikli dikdörtgen) iki kat sonuç verir.",
    alt: "Kuvvet–konum grafiği: sıfırdan 20 newtona yükselen doğru, altındaki boyalı üçgen ve üçgeni de kapsayan kesikli dikdörtgen.",
    param: { label: "L", min: 1, max: 6, step: 0.5, init: 4, unit: " m" },
    draw: (L) => {
      const sy = 0.2;
      return {
        els: [
          ...axes(v(0, 0), 6.5, 4.4, 0, "x (m)", "F (N)"),
          poly([v(0, 0), v(L, 20 * sy), v(L, 0)], { fill: "b", tone: "b", thin: true }),
          poly([v(0, 0), v(0, 20 * sy), v(L, 20 * sy), v(L, 0)], { dash: true, tone: "warn" }),
          curve([v(0, 0), v(L, 20 * sy)]),
          txt(v(0, 20 * sy), "20", "w", { small: true }),
          txt(v(L, 0), fmt(L), "s", { small: true }),
          txt(v((2 * L) / 3, (20 * sy) / 3), `W = ${fmt(10 * L)} J`, "c", { small: true, bold: true }),
        ],
        readout: [`W = ½ · 20 · ${fmt(L)} = ${fmt(10 * L)} J`, `Yanlış: 20 · ${fmt(L)} = ${fmt(20 * L)} J (iki kat)`],
      };
    },
  },
  "Kinetik enerjide yön ve durma": {
    caption:
      "K = ½mv² (m = 2 kg) süratin karesine bağlıdır: +v ile −v aynı kinetik enerjiyi verir ve K hiçbir zaman negatif olmaz. Hızı değiştir; nokta parabol üzerinde kalır.",
    alt: "Yatay eksende hız, dikey eksende kinetik enerji; tepesi aşağıda sıfırda olan parabol, üzerinde seçili hız noktası ve simetrik eşi.",
    param: { label: "v", min: -4, max: 4, step: 0.5, init: 3, unit: " m/s" },
    draw: (vv) => {
      const sy = 0.25;
      const K = vv * vv;
      return {
        els: [
          ...axes(v(0, 0), 4.4, 4.4, 0, "v (m/s)", "K (J)", 4.6),
          curve(Array.from({ length: 33 }, (_, i) => { const x = -4 + i / 4; return v(x, x * x * sy); })),
          pt(v(vv, K * sy), `${fmt(vv)} m/s · ${fmt(K)} J`, vv >= 0 ? "e" : "w", "a"),
          ...(vv !== 0 ? [pt(v(-vv, K * sy), "", "n", "a", true), seg(v(-vv, K * sy), v(vv, K * sy), { dash: true, thin: true, tone: "a" })] : []),
        ],
        readout: [`K = ½ · 2 · (${fmt(vv)})² = ${fmt(K)} J`],
      };
    },
  },
  "Potansiyel enerji sıfırını değiştir": {
    caption:
      "2 kg'lık cisim A (zeminden 1 m) ve B (zeminden 3 m) noktalarında (g = 10 m/s²). Sıfır düzeyini kaydır: U değerleri değişir, referansın altındaki nokta negatif U alır; ama UB − UA = 40 J hep aynıdır.",
    alt: "Dikey bir yükseklik ekseninde A ve B noktaları ve sürgüyle aşağı yukarı hareket eden kesikli sıfır düzeyi çizgisi.",
    param: { label: "sıfır düzeyi", min: -1, max: 4, step: 0.5, init: 0, unit: " m" },
    draw: (r) => {
      const UA = 20 * (1 - r);
      const UB = 20 * (3 - r);
      return {
        els: [
          ...ground(-0.5, 5.5, -1.2),
          vec(v(0, -1.2), v(0, 4.6), { tone: "muted", thin: true }),
          txt(v(0, 4.6), "zeminden h (m)", "w", { small: true, tone: "muted" }),
          ...[0, 1, 2, 3, 4].map((y) => txt(v(-0.1, y - 1), String(y), "w", { small: true, tone: "muted", soft: true })),
          seg(v(-0.2, r - 1), v(5.2, r - 1), { dash: true, tone: "warn" }),
          txt(v(5.2, r - 1), "U = 0", "e", { small: true, tone: "warn" }),
          pt(v(2.5, 0), `A: U = ${fmt(UA)} J`, "e", "b"),
          pt(v(2.5, 2), `B: U = ${fmt(UB)} J`, "e", "a"),
        ],
        readout: [`UB − UA = ${fmt(UB)} − ${UA < 0 ? `(${fmt(UA)})` : fmt(UA)} = ${fmt(UB - UA)} J`],
      };
    },
  },
  "Yayın kuvveti ile enerjisi": {
    caption:
      "k = 50 N/m'lik yayın ucundaki sapmayı değiştir. Kuvvet F = −kx sapmanın tersine yönelir ve x ile doğrusal büyür; enerji U = ½kx² x'in karesiyle büyür ve uzatma ile sıkıştırmada aynıdır.",
    alt: "Duvara bağlı yay ve ucundaki blok; doğal boy kesikli çizgi, yay kuvveti oku ve altta enerji–sapma parabolü üzerinde seçili nokta.",
    param: { label: "x", min: -0.4, max: 0.4, step: 0.05, init: 0.2, unit: " m" },
    draw: (x) => {
      const k = 50;
      const X = 4 + x * 5;
      const coils: V[] = [v(0, 3)];
      for (let i = 1; i < 12; i++) coils.push(v((X * i) / 12, 3 + (i % 2 ? 0.25 : -0.25)));
      coils.push(v(X, 3));
      const F = -k * x;
      const U = 0.5 * k * x * x;
      const o = v(1.5, -2.5);
      return {
        els: [
          seg(v(0, 2.2), v(0, 3.8), { tone: "ink", bold: true }),
          poly(coils, { open: true, tone: "b" }),
          ...block(X, 2.5, 1, 1, "m"),
          seg(v(4, 2.2), v(4, 3.8), { dash: true, thin: true, tone: "muted" }),
          txt(v(4, 2.2), "doğal boy", "s", { small: true, tone: "muted" }),
          ...(Math.abs(F) > 0.01 ? [vec(v(X + 0.5, 4.1), v(X + 0.5 + F / 10, 4.1), { tone: "warn", bold: true }), txt(v(X + 0.5 + F / 10, 4.1), `F = ${fmt(F)} N`, F < 0 ? "w" : "e", { small: true, tone: "warn" })] : []),
          ...axes(o, 2.4, 2.4, 0, "x (m)", "U (J)", 2.4),
          curve(Array.from({ length: 33 }, (_, i) => { const s = -0.4 + i * 0.025; return add(o, v(s * 5, 0.5 * k * s * s * 0.6)); })),
          pt(add(o, v(x * 5, U * 0.6)), `${fmt(U, 2)} J`, "e", "a"),
        ],
        readout: [`F = −50 · ${fmt(x, 2)} = ${fmt(F)} N`, `U = ½ · 50 · ${fmt(x, 2)}² = ${fmt(U, 2)} J`],
      };
    },
  },
  "Net yay işi ve pozitif giriş": {
    caption:
      "k = 50 N/m'lik yay çok yavaş x = −0,2 m'den x = +0,3 m'ye götürülüyor. İlk parça (−0,2 → 0) yayın 1 J'ünü geri verir, ikinci parça (0 → 0,3) 2,25 J depolar. Net dış iş ΔU = 1,25 J; verilen pozitif enerji ise 2,25 J'dür.",
    alt: "Enerji–sapma parabolü üzerinde iki ok: solda aşağı inen geri verilen kısım, sağda yukarı çıkan depolanan kısım.",
    steps: ["Başlangıç: x = −0,2 m", "Doğal boya: 1 J geri verilir", "x = +0,3 m: 2,25 J depolanır"],
    draw: (_, step) => {
      const sx = 10;
      const sy = 1.2;
      const P = (x: number) => v(x * sx, 25 * x * x * sy);
      const els: El[] = [
        ...axes(v(0, 0), 4, 3.2, 0, "x (m)", "U (J)", 4),
        curve(Array.from({ length: 33 }, (_, i) => P(-0.35 + i * (0.7 / 32))), "ink"),
        pt(P(-0.2), "−0,2", "w", "b"),
      ];
      if (step >= 1) els.push(vec(P(-0.2), P(0), { tone: "c", bold: true }), txt(P(-0.1), "−1 J", "nw", { small: true, tone: "c" }));
      if (step >= 2) els.push(vec(P(0), P(0.3), { tone: "a", bold: true }), pt(P(0.3), "+0,3", "e", "a"), txt(P(0.15), "+2,25 J", "se", { small: true, tone: "a" }));
      return { els, readout: step >= 2 ? ["ΔU = 2,25 − 1 = 1,25 J", "Pozitif giriş toplamı = 2,25 J"] : undefined };
    },
  },
  "Eğik yolda kuvvet ve yükseklik": {
    caption:
      "m = 2 kg'lık blok sinüsü q = 0,3 olan rampada s kadar itiliyor: itiş F = 20 N, sabit direnç f = 4 N, g = 10 m/s². Yükseklik Δh = q·s; normal kuvvet yola dik olduğundan iş yapmaz.",
    alt: "Eğik düzlem üçgeni, üzerinde blok; bloğa yol yönünde itiş, ters yönde sürtünme ve aşağı ağırlık okları; yanda yükseklik ölçüsü.",
    param: { label: "s", min: 1, max: 5, step: 0.5, init: 3, unit: " m" },
    draw: (s) => {
      const q = 0.3;
      const ang0 = (Math.asin(q) * 180) / Math.PI;
      const L = 9;
      const top = pol(L, ang0);
      const bp = pol(s * 1.6, ang0);
      const u = pol(1, ang0);
      const n = pol(1, ang0 + 90);
      const c = add(bp, mul(n, 0.45));
      const corner = (a: number, b: number): V => add(bp, add(v(u[0] * a, u[1] * a), v(n[0] * b, n[1] * b)));
      const WF = 20 * s;
      const Wf = -4 * s;
      const Wg = -2 * 10 * q * s;
      return {
        els: [
          poly([v(0, 0), v(top[0], 0), top], { tone: "ink" }),
          poly([corner(-0.45, 0), corner(0.45, 0), corner(0.45, 0.9), corner(-0.45, 0.9)], { fill: "muted", tone: "ink" }),
          vec(c, add(c, v(u[0] * 1.6, u[1] * 1.6)), { tone: "a", bold: true }),
          txt(add(c, v(u[0] * 1.6, u[1] * 1.6)), "F", "n", { small: true, tone: "a" }),
          vec(corner(-0.45, 0.2), add(corner(-0.45, 0.2), v(-u[0] * 0.9, -u[1] * 0.9)), { tone: "warn", bold: true }),
          txt(add(corner(-0.45, 0.2), v(-u[0] * 0.9, -u[1] * 0.9)), "f", "n", { small: true, tone: "warn" }),
          vec(c, add(c, v(0, -1.4)), { tone: "b", bold: true }),
          txt(add(c, v(0, -1.4)), "mg", "w", { small: true, tone: "b" }),
          seg(v(0, 0), bp, { tone: "c", bold: true }),
          seg(v(bp[0], 0), bp, { dash: true, thin: true, tone: "c" }),
          txt(v(bp[0], bp[1] / 2), `Δh = ${fmt(q * s, 2)} m`, "e", { small: true, tone: "c" }),
        ],
        readout: [`WF = ${fmt(WF)} J, Wf = ${fmt(Wf)} J, Wg = ${fmt(Wg)} J, WN = 0`, `Wnet = (20 − 4 − 6) · ${fmt(s)} = ${fmt(WF + Wf + Wg)} J`],
      };
    },
  },
  "Rampada erişim sınırı": {
    caption:
      "K₀ = 30 J ve metre başına net değişim b = −6 J/m ise K(s) = 30 − 6s; blok s = 5 m'de durur. Hedefi kaydır: 5 m'den yakınsa pozitif hızla, tam 5 m'deyse sıfır hızla varılır, ötesine bu kaymayla ulaşılmaz.",
    alt: "Kinetik enerji–yol grafiğinde 30'dan başlayıp 5 metrede sıfıra inen doğru ve dikey kesikli hedef çizgisi.",
    param: { label: "hedef", min: 1, max: 8, step: 0.5, init: 4, unit: " m" },
    draw: (d) => {
      const sy = 0.12;
      const reach = d < 5 ? "ulaşır" : d === 5 ? "tam sınırda, 0 hızla" : "ulaşamaz";
      const Kd = Math.max(0, 30 - 6 * d);
      return {
        els: [
          ...axes(v(0, 0), 8, 3.8, 0, "s (m)", "K (J)"),
          curve([v(0, 30 * sy), v(5, 0)]),
          txt(v(0, 30 * sy), "30", "w", { small: true }),
          pt(v(5, 0), "duruş 5 m", "s", "warn"),
          seg(v(d, 0), v(d, 3.8), { dash: true, tone: d <= 5 ? "c" : "warn" }),
          txt(v(d, 3.8), `hedef ${fmt(d)} m: ${reach}`, d < 2.5 ? "ne" : "n", { small: true, tone: d <= 5 ? "c" : "warn", bold: true }),
          ...(d <= 5 ? [pt(v(d, Kd * sy), `${fmt(Kd)} J`, "e", "c")] : []),
        ],
        readout: [d <= 5 ? `K(${fmt(d)}) = 30 − 6·${fmt(d)} = ${fmt(Kd)} J` : `30 − 6·${fmt(d)} < 0: negatif K çizilmez, hedefe varılmaz`],
      };
    },
  },
  "Sürtünme hangi cisme ne iş yapar?": {
    caption:
      "Üst: durgun zeminde sağa kayan bloğa sürtünme sola etki eder, iş negatiftir. Alt: daha hızlı sağa giden bant üstündeki yavaş blokta sürtünme sağa etki eder ve bloğa pozitif iş yaparak onu hızlandırır.",
    alt: "İki sahne: üstte zeminde kayan blok, hız oku sağa, sürtünme oku sola; altta hareketli bant, bant hızı daha büyük sağa ok, bloğa etkiyen sürtünme oku sağa.",
    draw: () => ({
      els: [
        ...ground(-0.5, 8.5, 3.5),
        ...block(2.5, 3.5, 1.6, 1, "blok"),
        vec(v(4.3, 4.8), v(6, 4.8), { tone: "b", bold: true }),
        txt(v(6, 4.8), "v", "e", { small: true, tone: "b" }),
        vec(v(2.5, 3.7), v(1.2, 3.7), { tone: "warn", bold: true }),
        txt(v(1.2, 3.7), "f", "w", { small: true, tone: "warn" }),
        txt(v(9, 4), "W < 0", "e", { small: true, bold: true, tone: "warn" }),
        poly([v(-0.5, -0.3), v(8.5, -0.3), v(8.5, 0), v(-0.5, 0)], { fill: "muted", tone: "ink" }),
        vec(v(0, -0.7), v(3, -0.7), { tone: "a", bold: true }),
        txt(v(3, -0.7), "bant: 4 m/s", "e", { small: true, tone: "a" }),
        ...block(2.5, 0, 1.6, 1, "blok"),
        vec(v(4.3, 1.3), v(5.3, 1.3), { tone: "b", bold: true }),
        txt(v(5.3, 1.3), "blok: 1 m/s", "e", { small: true, tone: "b" }),
        vec(v(4.1, 0.2), v(5.4, 0.2), { tone: "c", bold: true }),
        txt(v(5.4, 0.2), "f", "e", { small: true, tone: "c" }),
        txt(v(9, 0.5), "W > 0", "e", { small: true, bold: true, tone: "c" }),
      ],
    }),
  },
  "Bilanço tablosunu işaretleriyle oku": {
    caption:
      "Rampada yukarı itilen blok: girişler K_ilk = 20 J ve itiş işi 60 J (toplam 80 J); izlenen çıktılar K_son = 30 J, ΔU = 36 J ve sürtünmeyle iç enerji 14 J (toplam 80 J). İki sütun eşit boydaysa bilanço tutar.",
    alt: "İki yığılmış sütun: solda iki parçalı giriş, sağda üç parçalı çıkış; ikisi de 80 joule yüksekliğinde.",
    draw: () => {
      const s = 0.05;
      return {
        els: [
          seg(v(-0.4, 0), v(9.5, 0), { tone: "muted", thin: true }),
          ...stack(0, [[20, "K ilk", "b"], [60, "itiş işi", "a"]], s, "girişler"),
          ...stack(5, [[30, "K son", "b"], [36, "ΔU", "c"], [14, "iç enerji", "warn"]], s, "çıktılar"),
          seg(v(-0.2, 80 * s), v(6.4, 80 * s), { dash: true, thin: true, tone: "muted" }),
          txt(v(-0.2, 80 * s), "80 J", "w", { small: true }),
        ],
        readout: ["20 + 60 = 30 + 36 + 14 = 80 J"],
      };
    },
  },
  "Verimde yararlı çıktıyı tanımla": {
    caption:
      "Ardışık iki dönüştürücü: birincinin yararlı çıkışı ikincinin tam girişidir. η₁ = 0,8 ve η₂ = 0,5 ise toplam verim 0,8 · 0,5 = 0,4'tür; yüzdeler toplanmaz.",
    alt: "Soldan sağa üç kutu: 100 joule giriş, 80 joule ara çıkış, 40 joule son yararlı çıkış; aralarında verim etiketli oklar ve aşağı giden kayıp okları.",
    draw: () => {
      const node = (x: number, label: string, tone: T): El[] => [box(x, 0, 2, 1.2, tone), txt(v(x + 1, 0.6), label, "c", { small: true, bold: true })];
      return {
        els: [
          ...node(0, "100 J", "a"),
          ...node(4, "80 J", "b"),
          ...node(8, "40 J", "c"),
          vec(v(2, 0.6), v(4, 0.6), { tone: "ink" }),
          txt(v(3, 0.6), "η₁ = 0,8", "n", { small: true }),
          vec(v(6, 0.6), v(8, 0.6), { tone: "ink" }),
          txt(v(7, 0.6), "η₂ = 0,5", "n", { small: true }),
          vec(v(3, 0.4), v(3, -1), { tone: "muted" }),
          txt(v(3, -1), "20 J başka biçim", "s", { small: true, tone: "muted" }),
          vec(v(7, 0.4), v(7, -1), { tone: "muted" }),
          txt(v(7, -1), "40 J başka biçim", "s", { small: true, tone: "muted" }),
        ],
        readout: ["η = 40 / 100 = 0,8 · 0,5 = 0,4"],
      };
    },
  },
  "Güç ve enerji birimleri": {
    caption:
      "Güç–zaman grafiğinde altta kalan alan enerjidir. 2 kW sabit güçle çalışan aygıtın süresini değiştir: E = P·t kWh cinsinden çıkar; 1 kWh = 3,6 × 10⁶ J.",
    alt: "Güç–zaman grafiğinde 2 kilowatt yüksekliğinde yatay doğru ve sürgüyle genişleyen boyalı dikdörtgen.",
    param: { label: "t", min: 0.5, max: 5, step: 0.5, init: 1.5, unit: " h" },
    draw: (t) => {
      const sy = 1.2;
      const E = 2 * t;
      return {
        els: [
          ...axes(v(0, 0), 5.4, 3, 0, "t (h)", "P (kW)"),
          poly([v(0, 0), v(t, 0), v(t, 2 * sy), v(0, 2 * sy)], { fill: "b", tone: "b", thin: true }),
          curve([v(0, 2 * sy), v(5.2, 2 * sy)], "a"),
          txt(v(0, 2 * sy), "2", "w", { small: true }),
          txt(v(t, 0), fmt(t), "s", { small: true }),
          txt(v(t / 2, sy), `${fmt(E)} kWh`, "c", { small: true, bold: true }),
        ],
        readout: [`E = 2 kW · ${fmt(t)} h = ${fmt(E)} kWh = ${fmt(E * 3.6, 1)} × 10⁶ J`],
      };
    },
  },
  "Anlık güçte kuvvet ve hız": {
    caption:
      "Sabit F = 10 N kuvvet altında hız v = 2 + t (m/s) artıyor. Anlık güç P = F·v de zamanla artar; kuvvet sabit olsa bile güç sabit değildir.",
    alt: "Güç–zaman grafiğinde 20 watttan başlayıp yükselen doğru ve sürgüyle seçilen anın noktası.",
    param: { label: "t", min: 0, max: 4, step: 0.5, init: 2, unit: " s" },
    draw: (t) => {
      const sy = 0.06;
      const P = 10 * (2 + t);
      return {
        els: [
          ...axes(v(0, 0), 4.4, 3.8, 0, "t (s)", "P (W)"),
          curve([v(0, 20 * sy), v(4, 60 * sy)]),
          txt(v(0, 20 * sy), "20", "w", { small: true, soft: true }),
          seg(v(t, 0), v(t, P * sy), { dash: true, thin: true, tone: "a" }),
          pt(v(t, P * sy), `${fmt(P)} W`, "nw", "a"),
        ],
        readout: [`v = ${fmt(2 + t)} m/s, P = 10 · ${fmt(2 + t)} = ${fmt(P)} W`],
      };
    },
  },
  "Isı pompası oranı neden farklıdır?": {
    caption:
      "Isı pompası soğuk ortamdan 3 kJ alır, dışarıdan 1 kJ iş verilir, sıcak tarafa 4 kJ aktarılır: Qsıcak = Qsoğuk + W. COP = 4/1 = 4 olur; bu verim değildir, çünkü çevreden alınan 3 kJ de girdidir.",
    alt: "Ortada ısı pompası kutusu; alttan soğuk ortamdan 3 kilojoule giren ok, soldan 1 kilojoule iş oku, üste sıcak ortama çıkan 4 kilojoule oku.",
    draw: () => ({
      els: [
        box(-1, 4.2, 8, 1, "warn"),
        txt(v(3, 4.7), "sıcak ortam", "c", { small: true, bold: true }),
        box(-1, -1.6, 8, 1, "b"),
        txt(v(3, -1.1), "soğuk ortam", "c", { small: true, bold: true }),
        box(1.8, 1.2, 2.4, 1.4, "muted"),
        txt(v(3, 1.9), "ısı pompası", "c", { small: true, bold: true }),
        vec(v(3, -0.6), v(3, 1.2), { tone: "b", bold: true }),
        txt(v(3, 0.3), "Qsoğuk = 3 kJ", "e", { small: true, tone: "b" }),
        vec(v(3, 2.6), v(3, 4.2), { tone: "warn", bold: true }),
        txt(v(3, 3.4), "Qsıcak = 4 kJ", "e", { small: true, tone: "warn" }),
        vec(v(-0.5, 1.9), v(1.8, 1.9), { tone: "a", bold: true }),
        txt(v(-0.5, 1.9), "W = 1 kJ", "w", { small: true, tone: "a" }),
      ],
      readout: ["4 = 3 + 1 (kJ)", "COP = 4 / 1 = 4"],
    }),
  },
};

export const physicsFiguresEnergy: Record<string, Record<string, FigureDef>> = {
  "enerji-ve-hareket": enerji,
};
