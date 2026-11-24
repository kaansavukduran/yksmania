import { type El, type FigureDef } from "./figureKit";
import { A, C, L, PL, R, T, mk } from "./biologyFigures060Kit";
import { bars, graph, tr } from "./biologyFigures061Kit";

/*
 * AYT Fizik · Elektriksel potansiyel enerji ve bir boyutta sabit ivmeli hareket
 * (Forge061). Grafikler bölümdeki bağıntılardan aynı ölçek fonksiyonuyla
 * çizilir. Sayılar bölüm metninden gelir: k = 9×10⁹ N·m²/C², +2 μC ve ±3 μC,
 * 0,30 m → 0,60 m; v0 = 12 m/s, a = −3 m/s², 6 s (24 m ileri, 6 m geri);
 * v0 = −4 m/s, a = −2 m/s², Δx = −12 m; 20 m/s, 1 s tepki, −5 m/s² fren.
 */

const k = 9e9;
const q1q2 = 2e-6 * 3e-6;
/** Türkçe işaretli sayı: gerçek eksi, ondalık virgül. */
const sn = (x: number, d = 2) => (x < 0 ? "−" : "") + tr(Math.abs(x), d);

/* ---------------- Elektriksel potansiyel enerji ---------------- */

const energyCurve = mk({
  caption:
    "Sıfırı sonsuzda seç (bölümdeki örnek: +2 μC ile ±3 μC, U = k q1q2 / r): aynı işaretli yükler 0,30 m'de 0,18 J, biri negatif olunca −0,18 J. Eksi işaret enerji yokluğu değil, sonsuz referansına göre daha düşük enerjidir. Eğri aynı bağıntıdan çizilir.",
  alt: "Yatay eksen uzaklık r (metre), düşey eksen U (joule), ortada sıfır çizgisi. Aynı işarette eğri yukarıda, zıt işarette aşağıda; seçili uzaklıkta nokta ve değer. Sürgü uzaklığı 0,15 ile 0,90 m arasında değiştirir.",
  h: 320,
  steps: ["Aynı işaret", "Zıt işaret"],
  param: { label: "r", min: 0.15, max: 0.9, step: 0.05, init: 0.3, unit: "m" },
  draw: (r, step) => {
    const s = step === 0 ? 1 : -1;
    const U = (x: number) => (s * k * q1q2) / x;
    const g = graph({ x0: 60, yb: 290, w: 420, h: 260, xmin: 0, xmax: 1.2, ymin: -0.4, ymax: 0.4, xl: "r (m)", yl: "U" });
    const els: El[] = [...g.els, PL(g.plot(U, 0.135, 1, 60), { open: true, bold: true, tone: s > 0 ? "a" : "b" })];
    for (const x of [0.3, 0.6, 0.9]) els.push(L(g.X(x), g.Y(0) - 5, g.X(x), g.Y(0) + 5, { tone: "muted" }), T(g.X(x), g.Y(0) + (s > 0 ? 24 : -22), tr(x, 1), "c", { tone: "muted" }));
    const u = U(r);
    const right = r < 0.6;
    els.push(C(g.X(r), g.Y(u), 6, { tone: "warn", fill: "warn" }), T(g.X(r) + (right ? 14 : -14), g.Y(u) + (s > 0 ? -16 : 16), `${sn(u)} J`, right ? "e" : "w", { tone: "warn", bold: true }));
    return { els, readout: [`U = (9×10⁹)(${s > 0 ? "" : "−"}6×10⁻¹²) / ${tr(r)} = ${sn(u, 3)} J.`, "Mikro yüklerin çarpımı 10⁻¹² verir; dönüşüm formüle girmeden yapılır."] };
  },
});

const order = mk({
  caption:
    "İşaret ve uzaklık birlikte (bölümdeki sayı doğrusu): −0,10 J, −0,20 J'den büyüktür. Zıt işaretli yükleri uzaklaştırmak U'yu sıfıra doğru artırır, yaklaştırmak daha negatif yapar. “Mutlak değer azaldı, enerji azaldı” diyerek sırayı ters çevirme.",
  alt: "Yatay sayı doğrusu −0,30 J'den +0,10 J'ye. −0,20 ve −0,10 J işaretli; aralarında sağa doğru uzaklaştırınca U artar oku.",
  h: 200,
  draw: () => {
    const X = (u: number) => 60 + ((u + 0.3) / 0.4) * 420;
    const els: El[] = [A(40, 110, 500, 110, "ink", { thin: true })];
    for (const u of [-0.3, -0.2, -0.1, 0, 0.1]) els.push(L(X(u), 102, X(u), 118, { tone: "muted" }), T(X(u), 140, sn(u), "c", { tone: "muted" }));
    els.push(C(X(-0.2), 110, 8, { tone: "b", fill: "b" }), C(X(-0.1), 110, 8, { tone: "a", fill: "a" }));
    els.push(A(X(-0.2), 70, X(-0.1), 70, "a", { bold: true }), T((X(-0.2) + X(-0.1)) / 2, 44, "uzaklaştır: U artar", "c", { tone: "a", bold: true }));
    els.push(T(X(-0.1), 176, "−0,10 > −0,20", "c", { tone: "warn", bold: true }));
    return { els, readout: ["q1q2 negatifse U negatiftir; uzaklaştırmak U'yu sıfıra doğru artırır.", "Çoklu sistemde toplam U'nun işareti tek hedefteki bütün kuvvetleri belirlemez."] };
  },
});

const POS = [0.3, 0.6];
const delta = mk({
  caption:
    "İki konum arasında son eksi ilk (bölümdeki örnek: aynı işaretli +2 μC ve +3 μC): 0,30 m'den 0,60 m'ye ΔU = 0,09 − 0,18 = −0,09 J. Elektrik kuvvetinin işi We = −ΔU = +0,09 J; yükler uzaklaşırken kuvvet hareket yönündedir. Yol ayrıntısı elektriksel farkı değiştirmez.",
  alt: "Dört yatay çubuk: ilk enerji 0,18 J, son enerji 0,09 J, ΔU eksi 0,09 J (kesik çizgili) ve elektrik kuvvetinin işi artı 0,09 J.",
  h: 220,
  draw: () => {
    const [u1, u2] = POS.map((r) => (k * q1q2) / r);
    const dU = u2 - u1;
    const b = bars(
      [
        { label: "U ilk (0,30 m)", value: u1, text: `${sn(u1)} J`, tone: "a" },
        { label: "U son (0,60 m)", value: u2, text: `${sn(u2)} J`, tone: "a" },
        { label: "ΔU", value: -dU, text: `${sn(dU)} J`, tone: "warn", dash: true },
        { label: "We = −ΔU", value: -dU, text: `+${sn(-dU)} J`, tone: "b" },
      ],
      { max: 0.2 },
    );
    return { els: b.els, readout: [`ΔU = ${sn(u2)} − ${sn(u1)} = ${sn(dU)} J; We = ${sn(-dU)} J.`, "İlk enerji ile değişimi ayrı yaz."] };
  },
});

const pairs = mk({
  caption:
    "Her çifti bir kez say (bölüm metninden): n noktasal yükün toplam enerjisi her çiftin kendi U'sunun toplamıdır; çift sayısı n(n − 1)/2'dir. Üç yükte 3, dört yükte 6 çift vardır. Sıralı i, j toplamında aynı çifti iki kez saymak toplamı iki kat yapar.",
  alt: "Düzgün çokgenin köşelerinde yükler ve her iki yükü birleştiren çizgiler. Sürgü yük sayısını 2 ile 5 arasında değiştirir.",
  h: 300,
  param: { label: "Yük sayısı", min: 2, max: 5, step: 1, init: 3 },
  draw: (n) => {
    const cx = 170;
    const cy = 150;
    const ps = Array.from({ length: n }, (_, i) => [cx + 115 * Math.cos(-Math.PI / 2 + (2 * Math.PI * i) / n), cy + 115 * Math.sin(-Math.PI / 2 + (2 * Math.PI * i) / n)] as [number, number]);
    const els: El[] = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) els.push(L(ps[i][0], ps[i][1], ps[j][0], ps[j][1], { tone: "b" }));
    ps.forEach(([x, y]) => els.push(C(x, y, 12, { tone: "a", fill: "a", bold: true })));
    const m = (n * (n - 1)) / 2;
    els.push(T(330, 120, `${n} yük`, "e", { tone: "a", bold: true }), T(330, 160, `${m} çift`, "e", { tone: "b", bold: true }), T(330, 200, `U = ${Array.from({ length: m }, () => "U").length === 1 ? "U₁₂" : "Σ çiftler"}`, "e", { tone: "muted" }));
    return { els, readout: [`${n}(${n} − 1) / 2 = ${m} çift.`, "Getirilen yükün katkısı yalnız onun diğerleriyle kurduğu yeni çiftlerdir."] };
  },
});

/* ---------------- Bir boyutta sabit ivmeli hareket ---------------- */

const v0 = 12;
const a0 = -3;
const vAt = (t: number) => v0 + a0 * t;
const xAt = (t: number) => v0 * t + (a0 * t * t) / 2;
const tStar = -v0 / a0;
const pathAt = (t: number) => (t <= tStar ? Math.abs(xAt(t)) : Math.abs(xAt(tStar)) + Math.abs(xAt(t) - xAt(tStar)));

const vt = mk({
  caption:
    "Yol, negatif alanları da pozitif sayar (bölümdeki örnek: v0 = 12 m/s, a = −3 m/s²): hız 4 s'de sıfır olur ve cisim döner. v–t grafiğinde işaretli alan yer değiştirmeyi, alanların mutlak toplamı yolu verir; 6 s'de 24 m ileri, 6 m geri: yer değiştirme 18 m, yol 30 m.",
  alt: "Hız-zaman grafiği: 12 m/s'den başlayıp 4 s'de sıfırı kesen ve 6 s'de −6 m/s'ye inen doğru. Seçili ana kadar pozitif alan ve negatif alan farklı tonlarla dolu. Sürgü zamanı 0 ile 6 s arasında değiştirir.",
  h: 300,
  param: { label: "t", min: 0, max: 6, step: 0.5, init: 6, unit: "s" },
  draw: (t) => {
    const g = graph({ x0: 70, yb: 260, w: 400, h: 230, xmax: 6, ymin: -8, ymax: 14, xl: "t (s)", yl: "v" });
    const els: El[] = [...g.els];
    const t1 = Math.min(t, tStar);
    if (t1 > 0) els.push(PL([[g.X(0), g.Y(0)], [g.X(0), g.Y(v0)], [g.X(t1), g.Y(vAt(t1))], [g.X(t1), g.Y(0)]], { tone: "a", fill: "a", thin: true }));
    if (t > tStar) els.push(PL([[g.X(tStar), g.Y(0)], [g.X(t), g.Y(vAt(t))], [g.X(t), g.Y(0)]], { tone: "b", fill: "b", thin: true }));
    els.push(L(g.X(0), g.Y(v0), g.X(6), g.Y(vAt(6)), { tone: "ink", bold: true }));
    for (const s of [2, 4]) els.push(L(g.X(s), g.Y(0) - 5, g.X(s), g.Y(0) + 5, { tone: "muted" }), T(g.X(s), g.Y(0) + 22, String(s), "c", { tone: "muted" }));
    els.push(T(g.X(0) - 6, g.Y(12), "12", "w", { tone: "muted" }), T(g.X(0) - 6, g.Y(-6), "−6", "w", { tone: "muted" }));
    if (t1 > 0) els.push(T(g.X(t1 / 2), g.Y(0) + 26 > 250 ? 240 : g.Y(v0 / 3), `+${tr(xAt(t1))} m`, "c", { tone: "a", bold: true }));
    if (t >= 5.5) els.push(T(g.X((tStar + t) / 2) + 26, g.Y(vAt(t)) + 22, `−${tr(xAt(tStar) - xAt(t))} m`, "c", { tone: "b", bold: true }));
    return { els, readout: [`t = ${tr(t)} s: Δx = ${sn(xAt(t), 1)} m, yol = ${tr(pathAt(t))} m, v = ${sn(vAt(t), 1)} m/s.`, "Son hızın büyüklüğü o ana kadar alınan yol değildir."] };
  },
});

const xt = mk({
  caption:
    "Ortalama hız ve ortalama sürat (bölümdeki örnek: +12'den −6 m/s'ye 6 s): x–t eğrisi 4 s'de yatay teğetle 24 m'de döner, 6 s'de 18 m'dedir. Ortalama hız Δx/t = 18/6 = 3 m/s = (12 + (−6))/2; ortalama sürat L/t = 30/6 = 5 m/s.",
  alt: "Konum-zaman grafiği: sıfırdan yükselen, 4 s'de 24 m'de tepe yapan ve 6 s'de 18 m'ye inen parabol. Başlangıçtan 6 s noktasına kesik kiriş; tepe noktası işaretli.",
  h: 300,
  draw: () => {
    const g = graph({ x0: 70, yb: 260, w: 400, h: 220, xmax: 6.5, ymax: 28, xl: "t (s)", yl: "x" });
    const els: El[] = [...g.els, PL(g.plot(xAt, 0, 6, 48), { open: true, bold: true, tone: "a" }), L(g.X(0), g.Y(0), g.X(6), g.Y(xAt(6)), { tone: "warn", dash: true })];
    els.push(L(g.X(3.2), g.Y(24), g.X(4.8), g.Y(24), { tone: "muted" }), C(g.X(4), g.Y(24), 5, { tone: "a", fill: "a" }), C(g.X(6), g.Y(18), 5, { tone: "a", fill: "a" }));
    els.push(T(g.X(4), g.Y(24) - 20, "dönme: t = 4 s, x = 24 m", "c", { tone: "a", bold: true }), T(g.X(6) + 10, g.Y(18) + 20, "18 m", "e", { tone: "a" }));
    els.push(T(g.X(2.4), g.Y(4), "kiriş: 3 m/s", "e", { tone: "warn", bold: true }));
    for (const s of [2, 4, 6]) els.push(L(g.X(s), 255, g.X(s), 265, { tone: "muted" }), T(g.X(s), 284, String(s), "c", { tone: "muted" }));
    return { els, readout: [`Ortalama hız = ${tr(xAt(6))} / 6 = ${tr(xAt(6) / 6)} m/s; ortalama sürat = ${tr(pathAt(6))} / 6 = ${tr(pathAt(6) / 6)} m/s.`, "Yön değiştiren süreçte süratlerin ortalaması ortalama sürati vermez."] };
  },
});

const roots = mk({
  caption:
    "Zamansız bağıntı yön bilgisini kareler (bölümdeki örnek: v0 = −4 m/s, a = −2 m/s², Δx = −12 m): v² = 16 + 48 = 64. v = −8 m/s kökü t = 2 s verir; v = +8 m/s kökü t = −6 s ile geçmişe aittir. Her kökü v = v0 + at'ye koyup aralığı denetle.",
  alt: "Hız-zaman doğrusu v = −4 − 2t, t = −7 ile 3 s arasında. t = 2 s'de v = −8 noktası dolu, t = −6 s'de v = +8 noktası boş ve kesik; t = 0 düşey çizgisi.",
  h: 300,
  draw: () => {
    const v = (t: number) => -4 - 2 * t;
    const g = graph({ x0: 70, yb: 270, w: 400, h: 240, xmin: -7, xmax: 3, ymin: -11, ymax: 11, xl: "t (s)", yl: "v" });
    const els: El[] = [...g.els, L(g.X(-7), g.Y(v(-7)), g.X(3), g.Y(v(3)), { tone: "a", bold: true }), L(g.X(0), 270, g.X(0), 30, { tone: "muted", dash: true })];
    els.push(L(g.X(-6), g.Y(0), g.X(-6), g.Y(8), { tone: "muted", dash: true, thin: true }), L(g.X(2), g.Y(0), g.X(2), g.Y(-8), { tone: "warn", dash: true, thin: true }));
    els.push(C(g.X(2), g.Y(-8), 7, { tone: "warn", fill: "warn" }), C(g.X(-6), g.Y(8), 7, { tone: "muted", dash: true }));
    els.push(T(g.X(2) - 12, g.Y(-8) + 4, "t = 2 s, v = −8", "w", { tone: "warn", bold: true }), T(g.X(-6) + 14, g.Y(8) - 30, "t = −6 s: geçmiş", "e", { tone: "muted" }), T(g.X(0) + 6, 40, "t = 0", "e", { tone: "muted" }));
    return { els, readout: [`v² = (−4)² + 2(−2)(−12) = 16 + 48 = 64 → v = ±8 m/s.`, "−8: t = (−8 + 4)/(−2) = 2 s; +8: t = (8 + 4)/(−2) = −6 s."] };
  },
});

const braking = mk({
  caption:
    "Tepki ve frenleme iki ayrı süreçtir (bölümdeki model: 1 s tepki, sonra −5 m/s² sabit fren; kuru yol, başka etki yok): tepki yolu v0 · 1 s, fren yolu v0²/(2 · 5). 20 m/s için 20 + 40 = 60 m. Hız iki katına çıkınca fren yolu dört, tepki yolu iki katına çıkar. Gerçek yol güvenliği bu basit modele indirgenmez.",
  alt: "Hız-zaman grafiği: önce 1 saniye yatay çizgi (tepki), sonra sıfıra inen doğru (fren). Altındaki iki alan farklı tonda: dikdörtgen tepki yolu, üçgen fren yolu. Sürgü ilk hızı 10 ile 30 m/s arasında değiştirir.",
  h: 300,
  param: { label: "v0", min: 10, max: 30, step: 5, init: 20, unit: "m/s" },
  draw: (v) => {
    const tb = v / 5;
    const g = graph({ x0: 70, yb: 260, w: 400, h: 210, xmax: 7.5, ymax: 32, xl: "t (s)", yl: "v" });
    const els: El[] = [...g.els];
    els.push(R(g.X(0), g.Y(v), g.X(1), g.Y(0), { tone: "warn", fill: "warn" }));
    els.push(PL([[g.X(1), g.Y(v)], [g.X(1 + tb), g.Y(0)], [g.X(1), g.Y(0)]], { tone: "b", fill: "b", thin: true }));
    els.push(PL([[g.X(0), g.Y(v)], [g.X(1), g.Y(v)], [g.X(1 + tb), g.Y(0)]], { open: true, bold: true, tone: "ink" }));
    els.push(T(g.X(0) - 6, g.Y(v), String(v), "w", { tone: "muted" }), T(g.X(1 + tb), g.Y(0) + 22, `${tr(1 + tb)} s`, "c", { tone: "muted" }));
    els.push(T(g.X(1) + 12, g.Y(v) - 18, `tepki ${v} m`, "e", { tone: "warn", bold: true }), T(g.X(1 + tb / 3) + 4, g.Y(v / 3), `fren ${tr((v * v) / 10)} m`, "e", { tone: "b", bold: true }));
    return { els, readout: [`Tepki ${v} × 1 = ${v} m; fren ${v}² / 10 = ${tr((v * v) / 10)} m; toplam ${tr(v + (v * v) / 10)} m, süre ${tr(1 + tb)} s.`, "Sürücü tehlikeyi gördüğünde araç henüz fren ivmesine sahip değildir."] };
  },
});

export const physicsFigures061Motion: Record<string, Record<string, FigureDef>> = {
  "elektriksel-potansiyel-enerji": {
    "Sıfırı sonsuzda seç, formülü birimle oku": energyCurve,
    "İşaret ve uzaklık birlikte ne anlatır?": order,
    "İki konum arasında son eksi ilk": delta,
    "Üç yükte her çifti bir kez say": pairs,
  },
  "bir-boyutta-sabit-ivmeli-hareket": {
    "Zamansız bağıntı yön bilgisini kareler": roots,
    "Yol, negatif alanları da pozitif sayar": vt,
    "Ortalama hız ve ortalama sürat ayrı nicelikler": xt,
    "Tepki ve frenleme iki ayrı süreçtir": braking,
  },
};
