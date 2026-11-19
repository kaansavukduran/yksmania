import { ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

/*
 * Geographic location. (1) Local solar time from longitude: east is +, west is
 * −; 1° = 4 minutes. (2) Civil time across offsets for the 2017 YGS Sosyal 17
 * flight: convert departure to UTC, add the duration, add the arrival offset;
 * no second date-line correction. (3) The length of 1° of longitude shrinks
 * with latitude (≈ 111 · cos φ km); 1° of latitude stays ≈ 111 km.
 */

const hm = (min: number) => {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;
};
const lonName = (d: number) => (d === 0 ? "0°" : `${fmt(Math.abs(d), 1)}° ${d > 0 ? "D" : "B"}`);

const solarTime: FigureDef = {
  caption:
    "A noktası 28° D'de ve yerel güneş saati 12.00. B'yi boylam boyunca kaydır: doğuya her 1° için saat 4 dakika ileri, batıya 4 dakika geri. Doğuyu artı, batıyı eksi yaz; fark = hedef − kaynak. Örnek: 10° B ile 5° D arasında fark +5 − (−10) = 15° = 1 saat.",
  alt: "Yatay boylam şeridi 30° B'den 60° D'ye; Greenwich 0° işaretli; A 28° D'de sabit, B sürgüyle kayıyor; aralarındaki açı farkı ve iki yerel saat.",
  param: { label: "B boylamı (D +, B −)", min: -30, max: 60, step: 0.5, init: 35 },
  draw: (b) => {
    const a = 28;
    const X = (d: number) => d / 10;
    const els: El[] = [];
    els.push(seg(v(X(-30), 0), v(X(60), 0), { tone: "muted" }));
    for (let d = -30; d <= 60; d += 15) els.push(seg(v(X(d), -0.1), v(X(d), 0.1), { tone: "muted" }), txt(v(X(d), -0.1), d === 0 ? "0°" : lonName(d), "s", { small: true, tone: "muted" }));
    els.push(seg(v(0, -0.1), v(0, 1.6), { tone: "ink", dash: true }), txt(v(0, 1.6), "Greenwich", "n", { small: true }));
    els.push(poly([v(X(Math.min(a, b)), 0.5), v(X(Math.max(a, b)), 0.5)], { tone: "a", open: true, bold: true }));
    els.push(ball(v(X(a), 0), 0.12, "c"), seg(v(X(a), 0.15), v(X(a), 1.6), { tone: "c", thin: true }), txt(v(X(a), 1.6), `A ${hm(720)}`, "n", { small: true, bold: true, tone: "c" }));
    const t = 720 + 4 * (b - a);
    els.push(ball(v(X(b), 0), 0.12, "warn"), txt(v(X(b), 1.0), `B ${hm(t)}`, "n", { small: true, bold: true, tone: "warn" }));
    els.push(seg(v(X(b), 0.15), v(X(b), 1.0), { tone: "warn", thin: true }));
    els.push(txt(v(X(-30) - 0.3, 2.8), " ", "c"), txt(v(X(60) + 0.4, -0.9), " ", "c"));
    const diff = b - a;
    return { els, readout: [`Fark = ${lonName(b)} − 28° D = ${fmt(diff, 1)}° → ${fmt(Math.abs(diff) * 4, 0)} dakika ${diff >= 0 ? "ileri" : "geri"}`, `B'nin yerel güneş saati ${hm(t)} (resmî saat dilimi ayrı bir kavramdır)`] };
  },
};

type Row = { off: number; label: string };
const ROWS: Row[] = [
  { off: 8, label: "Kalkış (UTC+8)" },
  { off: 0, label: "UTC" },
  { off: -8, label: "Varış (UTC−8)" },
];
const STEPS = ["Kalkış yerel: 1 Ocak 02.30", "UTC'ye çevir: 8 saat geri", "11 saat uçuş ekle", "Varış ofsetini uygula"];
const flight: FigureDef = {
  caption:
    "2017 YGS Sosyal Bilimler 17 mantığı: UTC+8'de 1 Ocak 2017 02.30 kalkış, 11 saat uçuş, UTC−8'de varış. Kalkışı UTC'ye çevir (31 Aralık 18.30), süreyi ekle (1 Ocak 05.30 UTC), varış ofsetini ekle: 31 Aralık 21.30. Turuncu çentikler her şeridin yerel gece yarısıdır. Varış takvimde önce görünür ama uçuş süresi pozitiftir; tarih çizgisi için ikinci düzeltme yapılmaz.",
  alt: "Üç yatay zaman şeridi: kalkış bölgesi, UTC ve varış bölgesi; aynı anlar dikey çizgilerle bağlanıyor; uçuş UTC şeridinde 11 saatlik bir çubuk.",
  steps: STEPS,
  draw: (_v, step) => {
    const els: El[] = [];
    // Minutes from 31 Aralık 12.00 UTC; 1 unit = 2 hours.
    const X = (utcMin: number) => (utcMin - 720) / 120;
    const dep = 18 * 60 + 30; // 31 Aralık 18.30 UTC
    const arr = dep + 11 * 60; // 1 Ocak 05.30 UTC
    const day = (local: number) => (local >= 1440 ? "1 Ocak" : "31 Aralık");
    ROWS.forEach((r, i) => {
      const y = 3.2 - i * 1.6;
      els.push(seg(v(X(720), y), v(X(2160), y), { tone: "muted" }));
      els.push(txt(v(X(720) - 0.2, y), r.label, "w", { small: true, bold: true, tone: i === 1 ? "c" : "ink" }));
      const mid = 1440 - r.off * 60; // local midnight in UTC minutes
      if (mid > 720 && mid < 2160) els.push(seg(v(X(mid), y - 0.2), v(X(mid), y + 0.2), { tone: "warn" }));
    });
    const showDep = step >= 0;
    const at = (utc: number, i: number) => {
      const r = ROWS[i];
      const local = utc + r.off * 60;
      const y = 3.2 - i * 1.6;
      els.push(ball(v(X(utc), y), 0.1, "a"), txt(v(X(utc), y - 0.15), `${day(local)} ${hm(local)}`, "s", { small: true, tone: "a" }));
    };
    if (showDep) at(dep, 0);
    if (step >= 1) { els.push(seg(v(X(dep), 3.2), v(X(dep), 1.6), { tone: "a", dash: true, thin: true })); at(dep, 1); }
    if (step >= 2) { els.push(poly([v(X(dep), 1.45), v(X(arr), 1.45), v(X(arr), 1.75), v(X(dep), 1.75)], { tone: "b", fill: "b", thin: true })); at(arr, 1); }
    if (step >= 3) { els.push(seg(v(X(arr), 1.6), v(X(arr), 0), { tone: "a", dash: true, thin: true })); at(arr, 2); }
    els.push(txt(v(X(720) - 3.4, 3.8), " ", "c"), txt(v(X(2160) + 0.3, -0.8), " ", "c"));
    const lines = ["Kalkış: 1 Ocak 02.30 (UTC+8)", "UTC: 02.30 − 8 = 31 Aralık 18.30", "UTC: 18.30 + 11 saat = 1 Ocak 05.30", "Varış: 05.30 − 8 = 31 Aralık 21.30 (UTC−8)"];
    return { els, readout: [lines[step], "Denetim: varışı UTC'ye geri çevir; kalkışla farkı 11 saat olmalı."] };
  },
};

const degreeLength: FigureDef = {
  caption:
    "Aynı meridyende 1° enlem ≈ 111 km. 1° boylam ise enlem büyüdükçe kısalır: ≈ 111 · cos φ km (Ekvator'da 111, 60°'de 55,5, kutupta 0). Saat farkı ise her enlemde 1° için 4 dakikadır: zaman farkı açısal, uzaklık enleme bağlıdır.",
  alt: "Yarım küre kesiti: merkezden enlem açısı φ sürgüyle değişiyor; o enlemdeki paralelin yarıçapı ekvatorunkiyle karşılaştırılıyor ve 1° boylamın km değeri yazılıyor.",
  param: { label: "Enlem φ (°K)", min: 15, max: 80, step: 5, init: 60 },
  draw: (phi) => {
    const R = 3;
    const t = (phi * Math.PI) / 180;
    const els: El[] = [];
    els.push(circle(v(0, 0), R, { tone: "muted" }), seg(v(-R, 0), v(R, 0), { tone: "muted", dash: true }), txt(v(-R, 0), "Ekvator", "w", { small: true, tone: "muted" }));
    const P = v(R * Math.cos(t), R * Math.sin(t));
    els.push(seg(v(0, 0), P, { tone: "ink" }), seg(v(-P[0], P[1]), P, { tone: "c", bold: true }));
    els.push(vec(v(0, P[1]), P, { tone: "c" }), txt(v(P[0] / 2, P[1] - 0.05), `r = R·cos ${phi}°`, "s", { small: true, tone: "c" }));
    els.push(vec(v(0, 0), v(R, 0), { tone: "b" }), txt(v(R / 2, -0.05), "R", "s", { small: true, tone: "b" }));
    els.push(ball(P, 0.1, "warn"), txt(v(-0.3, 0.35), `φ = ${phi}°`, "w", { small: true, tone: "warn" }));
    els.push(txt(v(-R - 2.2, R + 0.4), " ", "c"), txt(v(R + 0.8, -R - 0.3), " ", "c"));
    const km = 111 * Math.cos(t);
    return { els, readout: [`1° boylam ≈ 111 · cos ${phi}° ≈ ${fmt(km, 1)} km · 1° enlem ≈ 111 km`, `Saat farkı yine 1° = 4 dakika; ${phi}° K'de 10° boylam ≈ ${fmt(km * 10, 0)} km`] };
  },
};

export const geographyFiguresLocation: Record<string, Record<string, FigureDef>> = {
  "cografi-konum": {
    "Boylam ve yerel Güneş saati": solarTime,
    "Ortak saat ve tarih bilgisini koru": flight,
    "Bir derecenin iki farklı mesafesi": degreeLength,
  },
};
