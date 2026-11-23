import { exactTemperatureTitle } from "../exactTemperature064";
import { exactTemperatureFigure } from "./exactTemperatureFigure064";
import { thermalTransferTitle } from "../thermalTransfer063";
import { thermalTransferFigure } from "./thermalTransferFigure063";
import {
  add,
  circle,
  fmt,
  poly,
  pt,
  seg,
  span,
  txt,
  v,
  vec,
  type El,
  type FigureDef,
  type Tone,
  type V,
} from "./figureKit";

/*
 * TYT Fizik heat figures: ısı ve sıcaklık, genleşme, hal değişimi.
 * Numbers come from Q = mcΔT, Q = mL, ΔL = αL₀ΔT with the textbook values
 * c(su) = 4,2 J/(g·°C), c(buz) = 2,1, c(buhar) = 2,0, Lf = 334 J/g, Lv = 2260 J/g.
 * Expansion drawings are exaggerated and say so in their captions.
 */

function axes(o: V, w: number, h: number, xLabel: string, yLabel: string): El[] {
  return [
    vec(o, add(o, v(0, h + 0.4)), { tone: "muted", thin: true }),
    vec(o, add(o, v(w + 0.4, 0)), { tone: "muted", thin: true }),
    txt(add(o, v(w + 0.4, 0)), xLabel, "se", { small: true, tone: "muted" }),
    txt(add(o, v(0, h + 0.4)), yLabel, "w", { small: true, tone: "muted" }),
  ];
}
const curve = (pts: V[], tone: Tone = "b"): El => poly(pts, { open: true, tone, bold: true });
const rect = (x: number, y: number, w: number, h: number, fill: Tone, tone: Tone = "ink"): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill, tone, thin: true });
/** Open beaker with liquid up to level h (inner width w). */
function beaker(x: number, w: number, H: number, h: number, fill: Tone = "b"): El[] {
  return [rect(x, 0, w, h, fill, "b"), poly([v(x, H), v(x, 0), v(x + w, 0), v(x + w, H)], { open: true, tone: "ink" })];
}
function stack(x: number, parts: [number, string, Tone][], scale: number, title: string, w = 1.2): El[] {
  const els: El[] = [];
  let y = 0;
  for (const [val, name, tone] of parts) {
    if (val <= 0) continue;
    els.push(rect(x, y, w, val * scale, tone, tone), txt(v(x + w + 0.15, y + (val * scale) / 2), `${name}: ${fmt(val)} J`, "e", { small: true, tone }));
    y += val * scale;
  }
  els.push(txt(v(x + w / 2, -0.1), title, "s", { small: true, bold: true }));
  return els;
}

const C_SU = 4.2;
const LF = 334;

const isi: Record<string, FigureDef> = {
  [thermalTransferTitle]: thermalTransferFigure,
  [exactTemperatureTitle]: exactTemperatureFigure,
  "Aynı hikâyede üç farklı nicelik": {
    caption:
      "İki su örneği de 60 °C: sıcaklıkları aynıdır. Büyük örnekte (1 kg) tanecik sayısı ve toplam iç enerji küçük örnekten (0,2 kg) fazladır. Sıcaklık eşitliği iç enerji eşitliği değildir; ısı ise yalnız sıcaklık farkıyla aktarılan enerjidir.",
    alt: "Biri küçük biri büyük iki beher; ikisinin de üstünde 60 °C yazıyor, büyük beherin altında daha büyük iç enerji etiketi.",
    draw: () => ({
      els: [
        ...beaker(0, 1.4, 2, 1.2),
        ...beaker(4, 3.2, 3.4, 2.8),
        txt(v(0.7, 2.2), "60 °C", "n", { small: true, bold: true, tone: "a" }),
        txt(v(5.6, 3.6), "60 °C", "n", { small: true, bold: true, tone: "a" }),
        txt(v(0.7, -0.2), "0,2 kg", "s", { small: true }),
        txt(v(5.6, -0.2), "1 kg", "s", { small: true }),
        txt(v(0.7, -0.8), "U küçük", "s", { small: true, tone: "c" }),
        txt(v(5.6, -0.8), "U büyük", "s", { small: true, tone: "c" }),
      ],
    }),
  },
  "Isı nereye akar, denge ne zaman oluşur?": {
    caption:
      "Eşit ısı sığalı 80 °C ve 20 °C örnekler temas ediyor (yalıtılmış). Net enerji sıcaktan soğuğa akar; fark azaldıkça aktarım yavaşlar ve iki eğri 50 °C'de buluşur. Dengede sıcaklıklar eşittir, iç enerjiler eşit olmak zorunda değildir. Eğrinin biçimi nitel çizilmiştir.",
    alt: "Sıcaklık–zaman grafiği: 80'den inen ve 20'den çıkan iki eğri 50 derecede yatay olarak birleşiyor; arada sıcaktan soğuğa ok.",
    draw: () => {
      const sy = 0.06;
      const hot = Array.from({ length: 41 }, (_, i) => { const t = i / 5; return v(t, (50 + 30 * Math.exp(-t / 1.6)) * sy); });
      const cold = Array.from({ length: 41 }, (_, i) => { const t = i / 5; return v(t, (50 - 30 * Math.exp(-t / 1.6)) * sy); });
      return {
        els: [
          ...axes(v(0, 0), 8, 5, "t", "T (°C)"),
          curve(hot, "warn"),
          curve(cold, "b"),
          seg(v(0, 50 * sy), v(8, 50 * sy), { dash: true, thin: true, tone: "muted" }),
          txt(v(0, 80 * sy), "80", "w", { small: true }),
          txt(v(0, 20 * sy), "20", "w", { small: true }),
          txt(v(8, 50 * sy), "denge 50 °C", "e", { small: true, tone: "c" }),
          vec(v(1, 3.9), v(1, 1.9), { tone: "a", bold: true }),
          txt(v(1, 3.4), "Q", "e", { small: true, tone: "a", bold: true }),
        ],
      };
    },
  },
  "Dokunma hissi yerine ölçüm kullan": {
    caption:
      "Aynı odada duran metal ve ahşap blok ikisi de 20 °C ölçülür. Elinden (≈ 33 °C) metale enerji daha hızlı aktığı için metal daha soğuk hissedilir. His, aktarım hızını; termometre, sıcaklığı söyler.",
    alt: "Yan yana metal ve ahşap blok, ikisinde de 20 derece gösteren termometre; elden metale kalın, ahşaba ince enerji oku.",
    draw: () => ({
      els: [
        rect(0, 0, 3, 1.2, "muted"),
        txt(v(1.5, 0.6), "metal", "c", { small: true, bold: true }),
        rect(5, 0, 3, 1.2, "warn", "warn"),
        txt(v(6.5, 0.6), "ahşap", "c", { small: true, bold: true }),
        txt(v(1.5, -0.2), "20 °C", "s", { small: true, tone: "c" }),
        txt(v(6.5, -0.2), "20 °C", "s", { small: true, tone: "c" }),
        txt(v(4, 3.6), "el ≈ 33 °C", "n", { small: true }),
        vec(v(3.6, 3.4), v(1.8, 1.4), { tone: "a", bold: true }),
        vec(v(4.4, 3.4), v(6.2, 1.4), { tone: "a", thin: true }),
        txt(v(2.3, 2.6), "hızlı", "w", { small: true, tone: "a" }),
        txt(v(5.7, 2.6), "yavaş", "e", { small: true, tone: "a" }),
      ],
    }),
  },
  "Ölçeği dönüştür, sıcaklık farkını ayrı tut": {
    caption:
      "Celsius ve kelvin ölçeklerinin aralıkları aynıdır, sıfırları farklıdır: T = t + 273. Sıcaklığı değiştir: iki okuma 273 farkla ilerler ama bir sıcaklık farkı (ΔT) iki ölçekte aynı sayıdır.",
    alt: "Yan yana iki dikey termometre ölçeği, solda Celsius sağda kelvin; aynı yükseklikte işaretli okuma ve eşleşen 0/273 ile 100/373 çizgileri.",
    param: { label: "t", min: -20, max: 100, step: 10, init: 20, unit: " °C" },
    draw: (t) => {
      const y = (c: number) => (c + 20) * 0.04;
      const els: El[] = [
        seg(v(0, y(-20)), v(0, y(100)), { tone: "ink", bold: true }),
        seg(v(4, y(-20)), v(4, y(100)), { tone: "ink", bold: true }),
        txt(v(0, y(100) + 0.55), "°C", "n", { small: true, bold: true }),
        txt(v(4, y(100) + 0.3), "K", "n", { small: true, bold: true }),
      ];
      for (const c of [0, 50, 100]) {
        els.push(seg(v(0, y(c)), v(4, y(c)), { dash: true, thin: true, tone: "muted" }), txt(v(-0.1, y(c)), String(c), "w", { small: true, tone: "muted", soft: true }), txt(v(4.1, y(c)), String(c + 273), "e", { small: true, tone: "muted", soft: true }));
      }
      els.push(pt(v(0, y(t)), `${t} °C`, "nw", "a"), pt(v(4, y(t)), `${t + 273} K`, "ne", "a"), seg(v(0, y(t)), v(4, y(t)), { tone: "a" }));
      return { els, readout: [`T = ${t} + 273 = ${t + 273} K`, "ΔT: 1 °C'lik fark = 1 K'lik fark"] };
    },
  },
  "Öz ısı malzemeyi, ısı sığası bütün örneği anlatır": {
    caption:
      "1 kg ve 2 kg su: öz ısı ikisinde de c = 4200 J/(kg·°C) (madde aynı). Isı sığası C = m·c örneğe bağlıdır: 4200 J/°C ve 8400 J/°C. Aynı 8400 J'ü verince küçük örnek 2 °C, büyük örnek 1 °C ısınır.",
    alt: "İki beher, ikincisinin suyu iki kat; her birinin altında aynı öz ısı, farklı ısı sığası ve 8400 joule ile sıcaklık artışı.",
    draw: () => ({
      els: [
        ...beaker(0, 2, 3, 1.2),
        ...beaker(5, 2, 3, 2.4),
        txt(v(1, -0.2), "1 kg: C = 4200 J/°C", "s", { small: true }),
        txt(v(6, -0.2), "2 kg: C = 8400 J/°C", "s", { small: true }),
        txt(v(1, -0.8), "8400 J → ΔT = 2 °C", "s", { small: true, tone: "a" }),
        txt(v(6, -0.8), "8400 J → ΔT = 1 °C", "s", { small: true, tone: "a" }),
        txt(v(3.5, 3.4), "c ikisinde aynı: 4200 J/(kg·°C)", "n", { small: true, tone: "c", bold: true }),
      ],
    }),
  },
  "Q=mcΔT bir koşullu enerji hesabıdır": {
    caption:
      "0,5 kg su 20 °C'den başlıyor (c = 4200 J/(kg·°C), hâl değişimi yok). Son sıcaklığı değiştir: Q = m·c·(T_son − T_ilk). Isınmada Q pozitif (alınan), soğumada negatif (verilen) çıkar.",
    alt: "Dikey termometre; 20 derecede başlangıç işareti, sürgüyle hareket eden son sıcaklık işareti ve aralarında ok.",
    param: { label: "T son", min: 0, max: 80, step: 5, init: 60, unit: " °C" },
    draw: (T) => {
      const y = (c: number) => c * 0.05;
      const Q = 0.5 * 4200 * (T - 20);
      return {
        els: [
          poly([v(-0.25, 0), v(0.25, 0), v(0.25, y(85)), v(-0.25, y(85))], { tone: "ink" }),
          circle(v(0, -0.35), 0.4, { tone: "ink", fill: "warn" }),
          ...[0, 20, 40, 60, 80].map((c) => txt(v(-0.4, y(c)), String(c), "w", { small: true, tone: "muted", soft: true })),
          pt(v(0.25, y(20)), "ilk 20 °C", T >= 20 ? "se" : "ne", "b"),
          ...(T !== 20 ? [vec(v(-1.5, y(20)), v(-1.5, y(T)), { tone: Q > 0 ? "warn" : "b", bold: true })] : []),
          pt(v(0.25, y(T)), `son ${T} °C`, T >= 20 ? "ne" : "se", "a"),
        ],
        readout: [`Q = 0,5 · 4200 · (${T} − 20) = ${fmt(Q)} J`, Q > 0 ? "Pozitif: su enerji aldı" : Q < 0 ? "Negatif: su enerji verdi" : "ΔT = 0: aktarım yok"],
      };
    },
  },
  "Grafiğin eğimini eksenlerden çıkar": {
    caption:
      "Aynı iki örnek (C_A = 2 kJ/°C, C_B = 4 kJ/°C) iki farklı grafikte. Sol, Q–ΔT: eğim C'dir, dik olan B. Sağ, T–Q: eğim 1/C'dir, dik olan A. “Dik olan büyük” ezberi eksene bakmadan yanlış sonuç verir.",
    alt: "İki grafik: solda Q–ΔT eksenlerinde B'nin daha dik olduğu iki doğru; sağda T–Q eksenlerinde A'nın daha dik olduğu iki doğru.",
    draw: () => {
      const o2 = v(6.5, 0);
      return {
        els: [
          ...axes(v(0, 0), 4, 4, "ΔT", "Q"),
          curve([v(0, 0), v(4, 2)], "a"),
          curve([v(0, 0), v(2, 4)], "b"),
          txt(v(4, 2), "A", "e", { small: true, tone: "a", bold: true }),
          txt(v(2, 4), "B", "e", { small: true, tone: "b", bold: true }),
          txt(v(2, -0.6), "eğim = C", "s", { small: true }),
          ...axes(o2, 4, 4, "Q", "T"),
          curve([o2, add(o2, v(2, 4))], "a"),
          curve([o2, add(o2, v(4, 2))], "b"),
          txt(add(o2, v(2, 4)), "A", "e", { small: true, tone: "a", bold: true }),
          txt(add(o2, v(4, 2)), "B", "e", { small: true, tone: "b", bold: true }),
          txt(add(o2, v(2, -0.6)), "eğim = 1/C", "s", { small: true }),
        ],
      };
    },
  },
  "Denge sıcaklığını enerji korunumu kurar": {
    caption:
      "1 kg 20 °C su ile m kg 80 °C su karıştırılıyor (yalıtılmış, kap ihmal). Sıcak suyun kütlesini değiştir: denge sıcaklığı ısı sığası ağırlıklı ortalamadır ve her zaman 20 ile 80 arasında, büyük C'li örneğe yakın kalır.",
    alt: "20'den 80'e sayı doğrusu; iki uçta örnekler, aralarında sürgüyle kayan denge sıcaklığı işareti.",
    param: { label: "m (sıcak)", min: 0.5, max: 4, step: 0.5, init: 1, unit: " kg" },
    draw: (m) => {
      const Td = (1 * 20 + m * 80) / (1 + m);
      const x = (T: number) => (T - 20) / 6;
      return {
        els: [
          seg(v(0, 0), v(10, 0), { tone: "ink" }),
          ...[20, 30, 40, 50, 60, 70, 80].map((T) => txt(v(x(T), -0.2), String(T), "s", { small: true, tone: "muted", soft: true })),
          pt(v(0, 0), "1 kg", "n", "b"),
          pt(v(10, 0), `${fmt(m)} kg`, "n", "warn"),
          pt(v(x(Td), 0), `Td = ${fmt(Td)} °C`, "n", "c"),
        ],
        readout: [`Td = (1·20 + ${fmt(m)}·80) / (1 + ${fmt(m)}) = ${fmt(Td)} °C`],
      };
    },
  },
  "Sıcaklık sabitse enerji aktarımı durmuş olmak zorunda değil": {
    caption:
      "0 °C'deki 100 g buza sabit hızla enerji veriliyor. Buz tamamen eriyene kadar (Q = mL = 33 400 J) sıcaklık 0 °C'de kalır; enerji iç enerjiye gider. Bu basamakta Q = mcΔT kullanmak Q = 0 gibi yanlış bir sonuç verir.",
    alt: "Sıcaklık–enerji grafiğinde 0 derecede uzun yatay parça ve ardından yükselen doğru; yatay parça mL olarak etiketli.",
    draw: () => {
      const sx = 1 / 8000;
      const sy = 0.08;
      const melt = 33400;
      const heat = 100 * C_SU * 40;
      return {
        els: [
          ...axes(v(0, 0), (melt + heat) * sx, 40 * sy, "Q (J)", "T (°C)"),
          curve([v(0, 0), v(melt * sx, 0), v((melt + heat) * sx, 40 * sy)]),
          ...span(v(0, -0.5), v(melt * sx, -0.5), "Q = mL = 33 400 J", -1, "a"),
          txt(v(melt * sx / 2, 0.15), "T sabit 0 °C, buz eriyor", "n", { small: true, tone: "c" }),
          txt(v((melt + heat / 2) * sx, 20 * sy), "Q = mcΔT", "nw", { small: true }),
        ],
      };
    },
  },
};

const genlesme: Record<string, FigureDef> = {
  "Isınan taneciği değil, tanecikler arası düzeni büyüt": {
    caption:
      "Soğuk ve sıcak örnekte aynı 16 tanecik: taneciklerin boyutu değişmez, ortalama aralıkları artar. Kütle ve tanecik sayısı aynı kalır; aralıklar abartılı çizilmiştir.",
    alt: "Solda sık dizilmiş dört kere dört nokta, sağda aynı boyutta ama daha seyrek dizilmiş dört kere dört nokta.",
    draw: () => {
      const grid = (x0: number, d: number, tone: Tone): El[] =>
        Array.from({ length: 16 }, (_, i) => circle(v(x0 + (i % 4) * d, Math.floor(i / 4) * d), 0.22, { tone, fill: tone }));
      return {
        els: [
          ...grid(0, 0.7, "b"),
          ...grid(5, 1.0, "warn"),
          txt(v(1.05, -0.6), "soğuk", "s", { small: true, bold: true }),
          txt(v(6.5, -0.6), "sıcak", "s", { small: true, bold: true }),
          ...span(v(5, 3.4), v(6, 3.4), "aralık büyür", 1, "a"),
        ],
      };
    },
  },
  "Boyca değişimde önce ilk uzunluğu seç": {
    caption:
      "Aynı malzemeden (α = 1,2 × 10⁻⁵ 1/°C) 2 m ve 4 m çubuk, aynı ΔT ile ısıtılıyor. ΔL = α·L₀·ΔT: uzun çubuğun uzaması iki kattır ama oranı ΔL/L₀ aynıdır. Uzamalar ölçekli değil, abartılı çizilmiştir.",
    alt: "Üst üste iki çubuk, biri iki birim diğeri dört birim; her birinin ucunda kesikli abartılı uzama parçası.",
    param: { label: "ΔT", min: 10, max: 100, step: 10, init: 50, unit: " °C" },
    draw: (dT) => {
      const a = 1.2e-5;
      const d1 = a * 2 * dT * 1000;
      const d2 = a * 4 * dT * 1000;
      const ex = 0.25;
      return {
        els: [
          rect(0, 2, 4, 0.5, "muted"),
          rect(4, 2, d1 * ex, 0.5, "warn", "warn"),
          rect(0, 0, 8, 0.5, "muted"),
          rect(8, 0, d2 * ex, 0.5, "warn", "warn"),
          txt(v(2, 2.25), "2 m", "c", { small: true, bold: true }),
          txt(v(4, 0.25), "4 m", "c", { small: true, bold: true }),
          txt(v(4 + d1 * ex + 0.2, 2.25), `ΔL = ${fmt(d1, 1)} mm`, "e", { small: true, tone: "warn" }),
          txt(v(8 + d2 * ex + 0.2, 0.25), `ΔL = ${fmt(d2, 1)} mm`, "e", { small: true, tone: "warn" }),
        ],
        readout: [`ΔL₁ = 1,2×10⁻⁵ · 2 · ${dT} = ${fmt(d1, 1)} mm; ΔL₂ = ${fmt(d2, 1)} mm`, "ΔL/L₀ ikisinde aynı"],
      };
    },
  },
  "Delik de şeklin bir uzunluğudur": {
    caption:
      "Ortasında delik olan levha düzgün ısıtılınca (kesikli) hem dış kenar hem delik aynı oranla büyür. Delik daralmaz; deliği aynı metalden bir parçayla dolu düşün. Büyüme abartılıdır.",
    alt: "Ortası dairesel delikli kare levha; kesikli çizgiyle daha büyük kare ve daha büyük delik.",
    draw: () => {
      const k = 1.15;
      const sq = (s: number, dash: boolean, tone: Tone): El => poly([v(-s, -s), v(s, -s), v(s, s), v(-s, s)], { tone, dash, bold: !dash });
      return {
        els: [
          poly([v(-2, -2), v(2, -2), v(2, 2), v(-2, 2)], { fill: "muted", tone: "ink" }),
          circle(v(0, 0), 0.9, { tone: "ink", fill: "c" }),
          sq(2 * k, true, "warn"),
          circle(v(0, 0), 0.9 * k, { tone: "warn", dash: true }),
          txt(v(0, 0), "delik", "c", { small: true, bold: true }),
          txt(v(2.4 * k, 2 * k), "sıcak (kesikli)", "e", { small: true, tone: "warn" }),
          txt(v(2.4, -2), "soğuk", "e", { small: true }),
          sq(2, false, "ink"),
        ],
      };
    },
  },
  "Alan ve hacimde boyut sayısını unutma": {
    caption:
      "L kenarlı kare ısınınca iki kenarı da L·αΔT kadar uzar. Yeni alan iki şerit (her biri L²αΔT) ve köşede çok küçük bir kare ekler; köşe ihmal edilince ΔA ≈ 2αA₀ΔT. Hacimde üç yüz eklenir: ΔV ≈ 3αV₀ΔT. Şeritler abartılıdır.",
    alt: "Kare; sağında ve üstünde ince turuncu şeritler, sağ üst köşede çok küçük kesikli kare.",
    draw: () => {
      const L = 4;
      const d = 0.5;
      return {
        els: [
          rect(0, 0, L, L, "muted"),
          rect(L, 0, d, L, "warn", "warn"),
          rect(0, L, L, d, "warn", "warn"),
          poly([v(L, L), v(L + d, L), v(L + d, L + d), v(L, L + d)], { dash: true, tone: "muted" }),
          txt(v(L / 2, L / 2), "A₀ = L²", "c", { small: true, bold: true }),
          txt(v(L + d + 0.2, L / 2), "L²αΔT", "e", { small: true, tone: "warn" }),
          txt(v(L / 2, L + d + 0.1), "L²αΔT", "n", { small: true, tone: "warn" }),
          txt(v(L + d + 0.2, L + d), "ihmal", "e", { small: true, tone: "muted" }),
        ],
        readout: ["ΔA ≈ 2·αA₀ΔT (β ≈ 2α), ΔV ≈ 3·αV₀ΔT (γ ≈ 3α)"],
      };
    },
  },
  "Sıvının gerçek artışı ile görünen artışı ayır": {
    caption:
      "Ağzına kadar dolu 1000 cm³'lük kap 50 °C ısıtılıyor: sıvı γ = 2 × 10⁻⁴, kap γ = 3 × 10⁻⁵ (1/°C). Sıvı 10 cm³ büyür, kabın iç hacmi 1,5 cm³ büyür; taşan (görünen artış) 8,5 cm³'tür.",
    alt: "Üç sütun: sıvının gerçek artışı 10, kabın artışı 1,5 ve aradaki fark olan görünen artış 8,5 santimetreküp.",
    draw: () => {
      const s = 0.35;
      const col = (x: number, val: number, label: string, tone: Tone): El[] => [rect(x, 0, 1.2, val * s, tone, tone), txt(v(x + 0.6, val * s), `${fmt(val)} cm³`, "n", { small: true, bold: true, tone }), txt(v(x + 0.6, -0.1), label, "s", { small: true })];
      return {
        els: [
          seg(v(-0.3, 0), v(8.3, 0), { tone: "muted", thin: true }),
          ...col(0, 10, "sıvı artışı", "b"),
          ...col(3.2, 1.5, "kap artışı", "muted"),
          ...col(6.4, 8.5, "taşan (görünen)", "a"),
          txt(v(2.4, 1.8), "−", "c", { bold: true }),
          txt(v(5.6, 1.8), "=", "c", { bold: true }),
        ],
        readout: ["ΔV_görünen = (2×10⁻⁴ − 3×10⁻⁵) · 1000 · 50 = 8,5 cm³"],
      };
    },
  },
  "Su 0–4 °C arasında farklı davranır": {
    caption:
      "Sabit kütleli suyun hacmi 0 °C'den 4 °C'ye ısınırken azalır, 4 °C'de en küçüktür (özkütle en büyük), sonra artar. 2 °C'den 3 °C'ye ısınan suyun hacmi küçülür. Eğri nitel çizilmiştir.",
    alt: "Hacim–sıcaklık grafiğinde 0'dan 4 dereceye inen, 4 derecede en düşük noktaya ulaşan ve sonra yükselen eğri.",
    draw: () => {
      const pts = Array.from({ length: 34 }, (_, i) => { const T = i * 0.3; return v(T * 0.7, 1 + 0.12 * (T - 4) ** 2); });
      return {
        els: [
          ...axes(v(0, 0), 7.2, 4.6, "T (°C)", "V"),
          curve(pts),
          pt(v(4 * 0.7, 1), "4 °C: V en küçük", "se", "a"),
          seg(v(4 * 0.7, 0), v(4 * 0.7, 1), { dash: true, thin: true, tone: "a" }),
          txt(v(0, 0), "0", "s", { small: true }),
          txt(v(1.2, 2.6), "ısınınca küçülür", "n", { small: true, tone: "c" }),
        ],
      };
    },
  },
  "Bimetalde büyük katsayı dış yayda kalır": {
    caption:
      "A (büyük α) ve B (küçük α) şeritleri yapıştırılmış. Isıtınca A daha çok uzamak ister, yayın dışında kalır; şerit B tarafına bükülür. Soğutunca yön tersine döner. Büküm abartılıdır.",
    alt: "Adım adım: önce düz iki katlı şerit, sonra A katmanı dışta kalacak biçimde B tarafına bükülmüş şerit.",
    steps: ["Oda sıcaklığı: düz", "Isıtılınca: B tarafına bükülür"],
    draw: (_, step) => {
      const els: El[] = [];
      if (step === 0) {
        els.push(rect(0, 0.4, 8, 0.4, "warn", "warn"), rect(0, 0, 8, 0.4, "b", "b"), txt(v(8.2, 0.85), "A (büyük α)", "e", { small: true, tone: "warn" }), txt(v(8.2, -0.05), "B (küçük α)", "e", { small: true, tone: "b" }));
      } else {
        const R = 8;
        const arc = (r: number, n = 30) => Array.from({ length: n + 1 }, (_, i) => { const t = (i / n) * (8 / R); return v(r * Math.sin(t), R - r * Math.cos(t)); });
        const outer = arc(R + 0.8);
        const mid = arc(R + 0.4);
        const inner = arc(R);
        els.push(
          poly([...outer, ...[...mid].reverse()], { fill: "warn", tone: "warn", thin: true }),
          poly([...mid, ...[...inner].reverse()], { fill: "b", tone: "b", thin: true }),
          txt(outer[30], "A dışta", "e", { small: true, tone: "warn" }),
          txt(inner[30], "B içte", "e", { small: true, tone: "b" }),
        );
      }
      return { els };
    },
  },
  "Boşluk, kısıtlama ve gaz koşullarını kontrol et": {
    caption:
      "10 m'lik ray bir ucundan sabit, öbür ucunda 6 mm boşluk var (α = 1,2 × 10⁻⁵ 1/°C). Sıcaklık artışını değiştir: uzama boşluğu doldurur; 50 °C'nin üstünde ray serbest uzayamaz, gerilme oluşur. Boşluk abartılı çizilmiştir.",
    alt: "Solda duvara sabitlenmiş uzun ray, sağ ucunda dar boşluk ve sağda engel; ray uzadıkça boşluk daralıyor.",
    param: { label: "ΔT", min: 0, max: 70, step: 5, init: 30, unit: " °C" },
    draw: (dT) => {
      const dL = 1.2e-5 * 10 * dT * 1000;
      const gap = 6;
      const free = Math.min(dL, gap);
      const ex = 0.25;
      return {
        els: [
          seg(v(0, -0.6), v(0, 1.2), { tone: "ink", bold: true }),
          seg(v(8 + gap * ex, -0.6), v(8 + gap * ex, 1.2), { tone: "ink", bold: true }),
          rect(0, 0, 8, 0.6, "muted"),
          ...(free > 0 ? [rect(8, 0, free * ex, 0.6, "warn", "warn")] : []),
          txt(v(4, 0.3), "ray 10 m", "c", { small: true, bold: true }),
          txt(v(8 + (gap * ex) / 2, -0.8), `boşluk ${fmt(Math.max(0, gap - dL), 1)} mm`, "s", { small: true, tone: dL >= gap ? "warn" : "c" }),
        ],
        readout: [`ΔL = 1,2×10⁻⁵ · 10 · ${dT} = ${fmt(dL, 1)} mm`, dL > gap ? "Boşluk kapandı: ray serbest uzayamaz, gerilme" : "Ray serbestçe uzuyor"],
      };
    },
  },
};

const hal: Record<string, FigureDef> = {
  "Geçişin adını başlangıç ve sondan kur": {
    caption:
      "Altı geçiş: üst oklar enerji alarak (erime, buharlaşma, süblimleşme), alt oklar enerji vererek (donma, yoğuşma, kırağılaşma) gerçekleşir. Adı, başlangıç ve son hâlden kur.",
    alt: "Katı, sıvı ve gaz kutuları üçgen biçiminde; aralarında her iki yönde etiketli oklar.",
    draw: () => {
      const K = v(0, 0);
      const S = v(4, 3.4);
      const G = v(8, 0);
      const box = (p: V, label: string, tone: Tone): El[] => [rect(p[0] - 0.9, p[1] - 0.4, 1.8, 0.8, tone, tone), txt(p, label, "c", { small: true, bold: true })];
      const arrow = (a: V, b: V, off: number, label: string, tone: Tone, at: "n" | "s" | "e" | "w" | "nw" | "ne" | "sw" | "se"): El[] => {
        const d = [b[0] - a[0], b[1] - a[1]];
        const L = Math.hypot(d[0], d[1]);
        const n: V = [(-d[1] / L) * off, (d[0] / L) * off];
        const p = add(a, add(n, v((d[0] / L) * 1.1, (d[1] / L) * 1.1)));
        const q = add(b, add(n, v((-d[0] / L) * 1.1, (-d[1] / L) * 1.1)));
        return [vec(p, q, { tone, bold: true }), txt(v((p[0] + q[0]) / 2, (p[1] + q[1]) / 2), label, at, { small: true, tone })];
      };
      return {
        els: [
          ...box(K, "katı", "b"),
          ...box(S, "sıvı", "c"),
          ...box(G, "gaz", "warn"),
          ...arrow(K, S, 0.25, "erime", "a", "nw"),
          ...arrow(S, K, 0.25, "donma", "b", "se"),
          ...arrow(S, G, 0.25, "buharlaşma", "a", "ne"),
          ...arrow(G, S, 0.25, "yoğuşma", "b", "sw"),
          ...arrow(K, G, -0.25, "süblimleşme", "a", "s"),
          ...arrow(G, K, -0.25, "kırağılaşma", "b", "n"),
        ],
      };
    },
  },
  "Enerji varken sıcaklık neden sabit kalabilir?": {
    caption:
      "0 °C'deki buz–su karışımına sabit hızla enerji veriliyor. Adım adım: buz azalır, su artar, termometre 0 °C'de kalır. Enerji sıcaklığı değil, taneciklerin düzenini değiştirir (iç enerji artar).",
    alt: "Adım adım beherde buz küpü küçülüyor, su seviyesi yükseliyor; yanda hep 0 derece gösteren okuma.",
    steps: ["100 g buz + 100 g su", "50 g buz + 150 g su", "0 g buz + 200 g su"],
    draw: (_, step) => {
      const ice = [100, 50, 0][step];
      const water = 200 - ice;
      const side = Math.sqrt(ice / 100) * 1.4;
      return {
        els: [
          ...beaker(0, 3, 3.2, water / 100),
          ...(ice > 0 ? [rect(1.5 - side / 2, water / 100 - side * 0.4, side, side, "muted", "ink")] : []),
          txt(v(4, 2.4), "T = 0 °C", "e", { small: true, bold: true, tone: "a" }),
          txt(v(4, 1.6), `buz ${ice} g, su ${water} g`, "e", { small: true }),
          txt(v(4, 0.8), `verilen: ${fmt((100 - ice) * LF)} J`, "e", { small: true, tone: "c" }),
        ],
      };
    },
  },
  "mL ile mcΔT aynı basamağın formülü değildir": {
    caption:
      "100 g için iki ayrı basamak: 0 °C buzu eritmek Q = mL_f = 100 · 334 = 33 400 J; oluşan suyu 0'dan 80 °C'ye ısıtmak Q = mcΔT = 100 · 4,2 · 80 = 33 600 J. Erime basamağında sıcaklık değişmez ama bir ısıtma kadar enerji ister.",
    alt: "İki sütun: erime 33 400 joule ve ısıtma 33 600 joule; neredeyse aynı yükseklikte.",
    draw: () => {
      const s = 1 / 9000;
      return {
        els: [
          seg(v(-0.3, 0), v(7, 0), { tone: "muted", thin: true }),
          rect(0, 0, 1.4, 33400 * s, "a", "a"),
          rect(4, 0, 1.4, 33600 * s, "warn", "warn"),
          txt(v(0.7, 33400 * s), "33 400 J", "n", { small: true, bold: true, tone: "a" }),
          txt(v(4.7, 33600 * s), "33 600 J", "n", { small: true, bold: true, tone: "warn" }),
          txt(v(0.7, -0.1), "erime: mL", "s", { small: true }),
          txt(v(4.7, -0.1), "0→80 °C: mcΔT", "s", { small: true }),
        ],
      };
    },
  },
  "Grafiği beş enerji basamağına ayır": {
    caption:
      "100 g buz −20 °C'den 120 °C buhara: buzu ısıtma 4,2 kJ, erime 33,4 kJ, suyu ısıtma 42 kJ, buharlaşma 226 kJ, buharı ısıtma 4 kJ. Yatay eksen gerçek ölçekte: en uzun basamak buharlaşmadır.",
    alt: "Sıcaklık–enerji grafiği: kısa eğim, 0 derecede yatay, eğim, 100 derecede çok uzun yatay ve kısa eğim.",
    draw: () => {
      const st = [4.2, 33.4, 42, 226, 4];
      const T = [-20, 0, 0, 100, 100, 120];
      const sx = 0.035;
      const sy = 0.03;
      const xs = [0];
      for (const q of st) xs.push(xs[xs.length - 1] + q);
      const pts = xs.map((x, i) => v(x * sx, (T[i] + 20) * sy));
      const names = ["buz ısınır", "erime", "su ısınır", "buharlaşma", "buhar"];
      return {
        els: [
          ...axes(v(0, 0), xs[5] * sx, 140 * sy, "Q (kJ)", "T (°C)"),
          curve(pts),
          ...[0, 100].map((c) => txt(v(0, (c + 20) * sy), String(c), "w", { small: true, tone: "muted", soft: true })),
          txt(v(0, 0), "−20", "w", { small: true, tone: "muted" }),
          ...names.map((n, i) => txt(v(((xs[i] + xs[i + 1]) / 2) * sx, ((T[i] + T[i + 1]) / 2 + 20) * sy), n, i === 3 ? "s" : i === 1 ? "se" : "nw", { small: true, tone: i === 1 || i === 3 ? "a" : "muted" })),
        ],
        readout: ["Toplam ≈ 4,2 + 33,4 + 42 + 226 + 4 = 309,6 kJ"],
      };
    },
  },
  "Buharlaşma yüzeyde, kaynama bütün sıvıda": {
    caption:
      "Sol: buharlaşma her sıcaklıkta yalnız yüzeyden olur; kaçan tanecikler kalan sıvıyı soğutabilir. Sağ: kaynamada buhar basıncı dış basınca eşit olduğu için kabarcıklar sıvının içinde de oluşur.",
    alt: "İki beher: solda yalnız yüzeyden yukarı çıkan küçük oklar; sağda sıvının içinde yükselen kabarcıklar ve altta ısıtıcı.",
    draw: () => ({
      els: [
        ...beaker(0, 3, 3, 2),
        ...[0.5, 1.5, 2.5].map((x) => vec(v(x, 2.1), v(x + 0.2, 2.9), { tone: "a" })),
        txt(v(1.5, -0.3), "buharlaşma: yüzeyde", "s", { small: true, bold: true }),
        ...beaker(5, 3, 3, 2),
        ...[[5.6, 0.5], [6.4, 1.1], [7.3, 0.7], [6, 1.6], [7, 1.5]].map(([x, y]) => circle(v(x, y), 0.18, { tone: "ink" })),
        ...[5.6, 6.5, 7.4].map((x) => vec(v(x, 2.1), v(x, 2.9), { tone: "a" })),
        seg(v(5, -0.3), v(8, -0.3), { tone: "warn", bold: true }),
        txt(v(6.5, -0.4), "kaynama: her yerde", "s", { small: true, bold: true }),
      ],
    }),
  },
  "Önce son hâlin mümkün olup olmadığını sına": {
    caption:
      "200 g 60 °C su ile 0 °C'deki buz karıştırılıyor (yalıtılmış). Su 0 °C'ye inerken en çok 200 · 4,2 · 60 = 50 400 J verebilir. Buz kütlesini değiştir: eritme ihtiyacı m·334 J bundan büyükse buzun bir kısmı kalır ve denge 0 °C olur.",
    alt: "İki sütun: suyun verebileceği en fazla enerji ve buzun tamamını eritmek için gereken enerji; karşılaştırma sonucu altta.",
    param: { label: "m buz", min: 50, max: 300, step: 25, init: 200, unit: " g" },
    draw: (mb) => {
      const give = 200 * C_SU * 60;
      const need = mb * LF;
      const s = 1 / 25000;
      const melted = Math.min(mb, give / LF);
      return {
        els: [
          seg(v(-0.3, 0), v(7, 0), { tone: "muted", thin: true }),
          rect(0, 0, 1.4, give * s, "warn", "warn"),
          rect(4, 0, 1.4, need * s, "b", "b"),
          txt(v(0.7, give * s), `${fmt(give)} J`, "n", { small: true, bold: true, tone: "warn" }),
          txt(v(4.7, need * s), `${fmt(need)} J`, "n", { small: true, bold: true, tone: "b" }),
          txt(v(0.7, -0.1), "su verebilir", "s", { small: true }),
          txt(v(4.7, -0.1), "buzu eritmek", "s", { small: true }),
        ],
        readout:
          need <= give
            ? ["Enerji yeterli: bütün buz erir, artan enerji suyu ısıtır (Td > 0 °C)"]
            : [`Yetersiz: ${fmt(melted)} g erir, ${fmt(mb - melted)} g buz kalır; Td = 0 °C`],
      };
    },
  },
  "Tam erimeden sonra oluşan suyu da ısıt": {
    caption:
      "300 g 80 °C su + 100 g 0 °C buz. Önce sına: su 0 °C'ye kadar 100 800 J verebilir, erime 33 400 J ister, buz tamamen erir. Sonra suyun verdiği enerji erimeye ve eriyen 100 g suyu Td'ye ısıtmaya gider: Td = (300·4,2·80 − 100·334) / (400·4,2) ≈ 40,1 °C.",
    alt: "İki yığılmış sütun eşit yükseklikte: solda sıcak suyun verdiği enerji, sağda erime ve eriyen suyu ısıtma parçaları.",
    draw: () => {
      const Td = (300 * C_SU * 80 - 100 * LF) / (400 * C_SU);
      const give = 300 * C_SU * (80 - Td);
      const heatMelt = 100 * C_SU * Td;
      const s = 1 / 15000;
      return {
        els: [
          seg(v(-0.3, 0), v(8.5, 0), { tone: "muted", thin: true }),
          ...stack(0, [[give, "su verir", "warn"]], s, "verilen"),
          ...stack(7, [[100 * LF, "erime", "a"], [heatMelt, "eriyen suyu ısıt", "b"]], s, "alınan"),
        ],
        readout: [`Td ≈ ${fmt(Td)} °C`, `${fmt(give)} J ≈ ${fmt(100 * LF)} + ${fmt(heatMelt)} J`],
      };
    },
  },
};

export const physicsFiguresThermal: Record<string, Record<string, FigureDef>> = {
  "isi-ve-sicaklik": isi,
  genlesme,
  "hal-degisimi": hal,
};
