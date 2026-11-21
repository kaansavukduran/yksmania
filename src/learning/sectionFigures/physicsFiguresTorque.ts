import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Fizik · Tork ve denge. Uzunluklar ölçekli, kuvvet ok boyları şematiktir.
 * 2026 AYT Fen 4 verileri resmî kitapçıktan özetlenmiştir; çözüm özgündür.
 */

const f2 = (x: number, d = 2) => String(Math.round(x * 10 ** d) / 10 ** d).replace(".", ",").replace("-", "−");
const rect = (x0: number, x1: number, y: number, h: number, tone: Tone): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], { fill: tone, tone, thin: true });
const pivot = (p: V): El[] => [poly([v(p[0] - 0.25, p[1] - 0.4), v(p[0] + 0.25, p[1] - 0.4), p], { fill: "muted", tone: "muted" }), ball(p, 0.09, "ink")];

// 1 · Moment kolu.
const arm: FigureDef = {
  caption:
    "Eksenden 0,6 m uzakta 10 N kuvvet. Kuvvetin çubukla yaptığı açıyı değiştir: kuvvetin etki doğrusunu uzat, eksenden bu doğruya dik uzaklığı ölç. d⊥ = r·sinθ, τ = F·d⊥. Kuvvet çubuk boyuncaysa tork sıfırdır.",
  alt: "Solda eksen, sağa uzanan çubuk, uçta açılı kuvvet oku. Kuvvetin kesikli etki doğrusu ve eksenden ona inen dik kol işaretli.",
  param: { label: "Açı θ", min: 0, max: 180, step: 15, init: 30, unit: "°", plain: true },
  draw: (th) => {
    const K = 5, r = 0.6, F = 10, t = (th * Math.PI) / 180;
    const O = v(0, 0), P = v(r * K, 0);
    const dir = v(Math.cos(t), Math.sin(t));
    const els: El[] = [seg(O, P, { bold: true }), ...pivot(O)];
    els.push(seg(v(P[0] - dir[0] * 4, P[1] - dir[1] * 4), v(P[0] + dir[0] * 2, P[1] + dir[1] * 2), { dash: true, thin: true, tone: "muted" }));
    els.push(vec(P, v(P[0] + dir[0] * 1.4, P[1] + dir[1] * 1.4), { tone: "a", bold: true }), txt(v(P[0] + dir[0] * 0.7 + (th <= 90 ? -dir[1] : dir[1]) * 0.5, P[1] + dir[1] * 0.7 + (th <= 90 ? dir[0] : -dir[0]) * 0.5), "F = 10 N", "c", { small: true, tone: "a" }));
    const dperp = r * Math.sin(t);
    if (Math.abs(Math.sin(t)) > 0.01) {
      const s = -(O[0] - P[0]) * dir[0] - (O[1] - P[1]) * dir[1];
      const foot = v(P[0] - dir[0] * s, P[1] - dir[1] * s);
      els.push(seg(O, foot, { tone: "warn", bold: true }), circle(foot, 0.06, { tone: "warn", fill: "warn" }));
      els.push(txt(v(foot[0] / 2 - 0.2, foot[1] / 2), `d⊥ = ${f2(Math.abs(dperp))} m`, "w", { small: true, tone: "warn" }));
    }
    const rBelow = th >= 60;
    els.push(txt(v(P[0] / 2 + (th >= 60 && th <= 120 ? 0.9 : 0), rBelow ? -0.35 : 0.35), "r = 0,6 m", "c", { small: true }));
    els.push(txt(v(-4.2, 2.4), " ", "c"), txt(v(5.2, -2.0), " ", "c"));
    return {
      els,
      readout: [`θ = ${th}°: d⊥ = 0,6·sin${th}° = ${f2(Math.abs(dperp))} m; τ = 10·${f2(Math.abs(dperp))} = ${f2(Math.abs(F * dperp))} N·m.`, "Uygulama noktasına uzaklık (0,6 m) her zaman moment kolu değildir; birim N·m, joule denmez."],
    };
  },
};

// 2 · İki destekli çubuk.
const beam: FigureDef = {
  caption:
    "4 m türdeş çubuk (40 N, ağırlık ortada), uçlarda A ve B destekleri; 60 N yükün konumunu değiştir. A’ya göre tork: 4·R_B = 40·2 + 60·x; düşey denge: R_A + R_B = 100 N. Bilinmeyen desteği eksen seçmek onu yok etmez, bir denkleme erteler.",
  alt: "Yatay çubuk, iki uçta üçgen destek; ortada 40 N ağırlık oku, seçilen konumda 60 N yük oku, desteklerde yukarı tepki okları.",
  param: { label: "Yük konumu x (A’dan)", min: 0, max: 4, step: 0.5, init: 3, unit: " m" },
  draw: (x) => {
    const K = 1.6, RB = (40 * 2 + 60 * x) / 4, RA = 100 - RB, S = 0.018;
    const els: El[] = [rect(0, 4 * K, 0, 0.08, "muted"), ...pivot(v(0, -0.08)), ...pivot(v(4 * K, -0.08))];
    els.push(vec(v(2 * K, 0), v(2 * K, -40 * S), { tone: "c" }), txt(v(2 * K - 0.12, -0.4), "40 N", "w", { small: true, tone: "c" }));
    els.push(vec(v(x * K, 0.1), v(x * K, 0.1 - 60 * S), { tone: "warn", bold: true }), txt(v(x * K, -60 * S - 0.2), "60 N", "c", { small: true, tone: "warn" }));
    els.push(vec(v(0, 0.1), v(0, 0.1 + RA * S), { tone: "a" }), txt(v(-0.15, 0.35), `R_A = ${f2(RA, 1)}`, "w", { small: true, bold: true, tone: "a" }));
    els.push(vec(v(4 * K, 0.1), v(4 * K, 0.1 + RB * S), { tone: "b" }), txt(v(4 * K + 0.15, 0.35), `R_B = ${f2(RB, 1)}`, "e", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(-0.35, -0.3), "A", "w", { small: true }), txt(v(4 * K + 0.35, -0.3), "B", "e", { small: true }));
    els.push(txt(v(-2.2, 1.6), " ", "c"), txt(v(4 * K + 2.2, -1.6), " ", "c"));
    return {
      els,
      readout: [`x = ${f2(x, 1)} m: R_B = (80 + 60·${f2(x, 1)})/4 = ${f2(RB, 1)} N, R_A = 100 − ${f2(RB, 1)} = ${f2(RA, 1)} N.`, "Kontrol: B’ye göre 4·R_A = 40·2 + 60·(4 − x). Çubuğun kendi ağırlığını unutmak yanlış tepki verir."],
    };
  },
};

// 3 · Kuvvet çifti.
const couple: FigureDef = {
  caption:
    "Eşit büyüklükte (8 N), zıt yönlü iki paralel kuvvet. Etki doğruları arasındaki dik uzaklığı değiştir: net kuvvet hep 0, tork F·d. d = 0 olunca (aynı doğru) tork da 0 olur. Çift torku eksen seçiminden bağımsızdır.",
  alt: "Yatay çubuk üzerinde biri yukarı, biri aşağı iki eşit kuvvet oku; aralarındaki dik uzaklık işaretli.",
  param: { label: "Aralık d", min: 0, max: 0.6, step: 0.1, init: 0.5, unit: " m" },
  draw: (d) => {
    const K = 6, F = 8, x1 = -(d * K) / 2, x2 = (d * K) / 2;
    const els: El[] = [rect(-2.4, 2.4, 0, 0.07, "muted")];
    els.push(vec(v(x1, 0), v(x1, 1.4), { tone: "a", bold: true }), vec(v(x2, 0), v(x2, -1.4), { tone: "warn", bold: true }));
    els.push(txt(v(x1 - 0.15, 1.2), "8 N", "w", { small: true, tone: "a" }), txt(v(x2 + 0.15, -1.2), "8 N", "e", { small: true, tone: "warn" }));
    if (d > 0) els.push(seg(v(x1, -0.35), v(x2, -0.35), { tone: "ink", thin: true }), txt(v(0, -0.65), `d = ${f2(d, 1)} m`, "c", { small: true }));
    els.push(txt(v(-3.0, 1.8), " ", "c"), txt(v(3.0, -1.8), " ", "c"));
    return { els, readout: [`ΣF = 8 − 8 = 0; τ = F·d = 8·${f2(d, 1)} = ${f2(F * d, 1)} N·m.`, "Net kuvvet sıfır olması dönme dengesi demek değildir: ΣF ve Στ ayrı yazılır."] };
  },
};

// 4 · 2026 AYT Fen 4: kapı.
const door: FigureDef = {
  caption:
    "2026 AYT Fen 4 (resmî kitapçıktan özet): menteşeden 1,20 m uzakta 5 N, zıt yönde döndürmeye çalışan F ise daha yakından uygulanıyor; kapı duruyor. F’nin kolunu değiştir: F = 1,20·5 / kol. Soruda kol 0,40 m ⇒ F = 15 N.",
  alt: "Üstten görünüşte menteşe ve kapı kanadı; uçta bir yöne 5 N, daha yakın bir noktada ters yöne F kuvveti.",
  param: { label: "F’nin kolu", min: 0.2, max: 1.2, step: 0.1, init: 0.4, unit: " m" },
  draw: (r2) => {
    const K = 4, F = 6 / r2, S = 0.06;
    const els: El[] = [rect(0, 1.2 * K, 0, 0.1, "muted"), ball(v(0, 0), 0.14, "ink"), txt(v(0, -0.5), "menteşe", "c", { small: true, tone: "muted" })];
    els.push(vec(v(1.2 * K, 0.12), v(1.2 * K, 0.12 + 5 * S * 2), { tone: "a", bold: true }), txt(v(1.2 * K + 0.15, 0.6), "5 N", "e", { small: true, tone: "a" }));
    els.push(vec(v(r2 * K, -0.12), v(r2 * K, -0.12 - Math.min(F, 30) * S), { tone: "warn", bold: true }), txt(v(r2 * K + 0.15, -0.6), `F = ${f2(F, 1)} N`, "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(-1.0, 1.4), " ", "c"), txt(v(1.2 * K + 1.4, -2.2), " ", "c"));
    return { els, readout: [`${f2(r2, 1)}·F = 1,20·5 ⇒ F = ${f2(F, 1)} N.`, "Menteşeyi eksen seçince menteşe tepkisi tork denkleminden çıkar; ama kuvvet dengesinde yine vardır."] };
  },
};

export const physicsFiguresTorque: Record<string, Record<string, FigureDef>> = {
  "tork-denge": {
    "Moment kolu çubuğun boyu değildir": arm,
    "Net kuvvet ve net moment birlikte": beam,
    "Kuvvet çifti sıfır bileşke, sıfır olmayan moment": couple,
    "Destek seçmek bilinmeyeni silmek değil": door,
  },
};
