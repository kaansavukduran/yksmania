import { ball, circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge058) · Elektrik alan, elektriksel potansiyel, düzgün alan
 * ve sığaçlar. k = 9×10⁹ N·m²/C², ε₀ = 8,85×10⁻¹² F/m. Alan ve kuvvet okları
 * her figürde ortak ölçekle hesaplanan değerden çizilir; noktasal kaynak
 * şemalarında uzunluklar ölçeklidir, yük topları ölçekli değildir.
 */

const k = 9e9;
const charge = (p: V, q: number, label?: string, dy = 0.3): El[] => {
  const els: El[] = [ball(p, 0.22, q > 0 ? "warn" : "b", q > 0 ? "+" : "−")];
  if (label) els.push(txt(v(p[0], p[1] + dy), label, dy < 0 ? "s" : "n", { tone: q > 0 ? "warn" : "b", small: true, bold: true }));
  return els;
};

/* ===================== Elektrik alan ===================== */

const inverseSquare: FigureDef = {
  caption:
    "+1 μC noktasal kaynak; gözlem noktası P sağda. Uzaklığı değiştir: E = kQ/r² = 9000/r² N/C. r iki katına çıkınca alan dörtte bire, üç katına çıkınca dokuzda bire iner. Ok uzunlukları ortak ölçeklidir; yön pozitif kaynaktan dışarıdır.",
  alt: "Solda pozitif kaynak yükü, sağa uzanan uzaklık ekseni, 1, 2 ve 3 metre işaretleri; seçilen P noktasında sağa alan oku ve değeri.",
  param: { label: "Uzaklık r", min: 1, max: 3, step: 0.5, init: 2, unit: " m" },
  draw: (r) => {
    const K = 1.5, Q = 1e-6, E = (k * Q) / (r * r), S = 1.4 / 9000;
    const els: El[] = [seg(v(0, 0), v(3.4 * K + 1.6, 0), { tone: "muted", thin: true }), ...charge(v(0, 0), 1, "+1 μC")];
    for (const x of [1, 2, 3]) els.push(...xtick(x * K, 0, `${x} m`));
    const P = v(r * K, 0);
    els.push(pt(P, "P", "n", "ink"), vec(v(P[0], 0.35), v(P[0] + E * S, 0.35), { tone: "c", bold: true }), txt(v(P[0] + E * S + 0.1, 0.35), `E = ${nf(E, 0)} N/C`, "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-0.6, 1.0, 3.4 * K + 1.9, -0.7));
    return { els, readout: [`E = 9×10⁹ · 10⁻⁶ / ${nf(r, 1)}² = ${nf(E, 0)} N/C; r = 1 m’ye göre oran 1/${nf(r * r, 2)}.`, "Alan noktaya aittir: P’ye konacak test yükü değişse de E değişmez, yalnız F = qE değişir."] };
  },
};

const twoD: FigureDef = {
  caption:
    "Orijindeki gözlem noktası için (−1; 0) m’de +2 μC sağa 18.000 N/C, (0; −1) m’de +1 μC yukarı 9.000 N/C verir. Bileşenler ayrı toplanır: (18.000; 9.000) N/C, büyüklük 9000√5 ≈ 20.125 N/C; skaler toplam 27.000 değildir.",
  alt: "Koordinat düzleminde solda +2 μC, altta +1 μC kaynak; orijinde sağa ve yukarı alan okları, kesikli tamamlamayla bileşke alan oku.",
  draw: () => {
    const K = 2.2, S = 1 / 9000;
    const O = v(0, 0), E1 = v(18000 * S, 0), E2 = v(0, 9000 * S), N = v(E1[0], E2[1]);
    const els: El[] = [seg(v(-K - 0.5, 0), v(2.6, 0), { tone: "muted", thin: true }), seg(v(0, -K - 0.5), v(0, 1.6), { tone: "muted", thin: true })];
    els.push(...charge(v(-K, 0), 1, "+2 μC"), ...charge(v(0, -K), 1), txt(v(-K, -0.3), "(−1; 0) m", "s", { tone: "muted", small: true }), txt(v(0.3, -K), "+1 μC, (0; −1) m", "e", { tone: "muted", small: true }));
    els.push(vec(O, E1, { tone: "b", bold: true }), vec(O, E2, { tone: "c", bold: true }), seg(E1, N, { tone: "muted", dash: true, thin: true }), seg(E2, N, { tone: "muted", dash: true, thin: true }), vec(O, N, { tone: "a", bold: true }));
    els.push(txt(v(E1[0] / 2, -0.15), "18.000", "s", { tone: "b", small: true, bold: true }), txt(v(-0.15, E2[1]), "9.000", "w", { tone: "c", small: true, bold: true }), txt(v(N[0] + 0.1, N[1] + 0.1), "E ≈ 20.125 N/C", "ne", { tone: "a", small: true, bold: true }));
    els.push(...pad(-K - 0.9, 1.9, 3.6, -K - 0.6));
    return { els, readout: ["E₁ = 9×10⁹·2×10⁻⁶/1² = 18.000 N/C (sağa); E₂ = 9×10⁹·10⁻⁶/1² = 9.000 N/C (yukarı).", `|E| = √(18.000² + 9.000²) = ${nf(9000 * Math.sqrt(5), 0)} N/C; yön +x’ten ${nf((Math.atan2(1, 2) * 180) / Math.PI, 1)}° yukarı.`] };
  },
};

function lineField(q1: number, q2: number, x2: number, xp: number, K: number, S: number): { els: El[]; e1: number; e2: number } {
  // q1 at x = 0, q2 at x = x2 (μC); signed x-components at xp.
  const comp = (q: number, x0: number) => {
    const dx = xp - x0;
    return (k * q * 1e-6 * Math.sign(dx)) / (dx * dx);
  };
  const e1 = comp(q1, 0), e2 = comp(q2, x2), net = e1 + e2;
  const P = v(xp * K, 0);
  const els: El[] = [vec(v(P[0], 0.4), v(P[0] + e1 * S, 0.4), { tone: "warn", bold: true }), vec(v(P[0], -0.4), v(P[0] + e2 * S, -0.4), { tone: "b", bold: true })];
  els.push(txt(v(P[0] + e1 * S + (e1 > 0 ? 0.1 : -0.1), 0.4), `E₁ = ${nf(Math.abs(e1), 0)}`, e1 > 0 ? "e" : "w", { tone: "warn", small: true }), txt(v(P[0] + e2 * S + (e2 > 0 ? 0.1 : -0.1), -0.4), `E₂ = ${nf(Math.abs(e2), 0)}`, e2 > 0 ? "e" : "w", { tone: "b", small: true }));
  if (Math.abs(net * S) > 0.03) els.push(vec(v(P[0], -1.0), v(P[0] + net * S, -1.0), { tone: "a", bold: true }));
  els.push(txt(v(P[0], -1.25), Math.abs(net) < 1 ? "E_net = 0" : `E_net = ${nf(Math.abs(net), 0)} N/C`, "s", { tone: "a", small: true, bold: true }));
  els.push(pt(P, undefined, "n", "ink"));
  return { els, e1, e2 };
}

const zeroSame: FigureDef = {
  caption:
    "+4 μC x = 0’da, +1 μC x = 3 m’de. P’yi kaynakların arasında kaydır: iki alan zıt yönlüdür. 4/x² = 1/(3 − x)² ⇒ x = 2 m: P küçük kaynağa 1 m, büyük kaynağa 2 m uzaktadır. Kaynakların dışında aynı işaretli alanlar aynı yöndedir; orada sıfır aranmaz.",
  alt: "Yatay eksende solda +4 μC, sağda +1 μC kaynak; aradaki P noktasında sağa ve sola iki alan oku, altında net alan oku ya da sıfır yazısı.",
  param: { label: "P’nin konumu x", min: 1, max: 2.5, step: 0.25, init: 2, unit: " m" },
  draw: (x) => {
    const K = 1.5, S = 1.8 / 36000;
    const els: El[] = [seg(v(-0.5, 0), v(3 * K + 0.5, 0), { tone: "muted", thin: true }), ...charge(v(0, 0), 1, "+4 μC", 0.75), ...charge(v(3 * K, 0), 1, "+1 μC", 0.75)];
    for (const t of [0, 1, 2, 3]) els.push(...xtick(t * K, -1.6, `${t} m`));
    const f = lineField(4, 1, 3, x, K, S);
    els.push(...f.els, ...pad(-1.2, 1.4, 3 * K + 1.4, -2.2));
    return { els, readout: [`x = ${nf(x)} m: E₁ = 36.000/${nf(x)}² = ${nf(Math.abs(f.e1), 0)}, E₂ = 9.000/${nf(3 - x)}² = ${nf(Math.abs(f.e2), 0)} N/C.`, "Eşitlik yalnız x = 2 m’de: 2/x = 1/(3 − x). Bölge yönü ve büyüklük birlikte denetlenir."] };
  },
};

const zeroOpposite: FigureDef = {
  caption:
    "+4 μC x = 0’da, −1 μC x = 3 m’de. Aralarında iki alan da sağa yönlüdür: sıfır olamaz. Sağ dış bölgede pozitifin alanı sağa, negatifin alanı sola: 4/x² = 1/(x − 3)² ⇒ x = 6 m. P’yi dış bölgede kaydırıp iki okun eşitlendiği yeri gör.",
  alt: "Yatay eksende solda +4 μC, x = 3 m’de −1 μC; sağ dış bölgedeki P noktasında sağa ve sola iki alan oku, altında net alan.",
  param: { label: "P’nin konumu x", min: 4, max: 9, step: 0.5, init: 6, unit: " m" },
  draw: (x) => {
    const K = 0.6, S = 2.2 / 9000;
    const els: El[] = [seg(v(-0.5, 0), v(9.6 * K, 0), { tone: "muted", thin: true }), ...charge(v(0, 0), 1, "+4 μC", 0.75), ...charge(v(3 * K, 0), -1, "−1 μC", 0.75)];
    for (const t of [0, 3, 6, 9]) els.push(...xtick(t * K, -1.6, `${t} m`));
    const f = lineField(4, -1, 3, x, K, S);
    els.push(...f.els, ...pad(-2.4, 1.4, 9.6 * K + 1.8, -2.2));
    return { els, readout: [`x = ${nf(x, 1)} m: E₁ = 36.000/${nf(x, 1)}² = ${nf(Math.abs(f.e1), 0)} (sağa), E₂ = 9.000/${nf(x - 3, 1)}² = ${nf(Math.abs(f.e2), 0)} N/C (sola).`, "2(x − 3) = x ⇒ x = 6 m. Sol dış bölgede eşitliğin geçerli kökü yoktur; karenin her kökü fiziksel nokta değildir."] };
  },
};

const negCharge: FigureDef = {
  caption:
    "Düşey alan Ey = −5000 N/C (aşağı), tanecik 0,001 kg, g = 10 m/s², yukarı +. −2 μC için qEy = +0,010 N yukarı, ağırlık 0,010 N aşağı: net 0. Yükü +2 μC yapınca elektrik kuvveti aşağı döner, net 0,020 N aşağı; alan haritası değişmez.",
  alt: "Aşağı yönlü paralel alan okları arasında bir tanecik; tanecikte elektrik kuvveti ve ağırlık okları, yanda net kuvvet oku ya da sıfır yazısı.",
  steps: ["q = −2 μC", "q = +2 μC"],
  draw: (_v, step) => {
    const q = step === 0 ? -2e-6 : 2e-6, Ey = -5000, m = 0.001, S = 100;
    const fe = q * Ey, w = -m * 10, net = fe + w;
    const els: El[] = [];
    for (const x of [-3.4, -2.6, -1.8]) els.push(vec(v(x, 1.6), v(x, -1.4), { tone: "muted", thin: true }));
    els.push(fe > 0 ? txt(v(-2.6, -1.55), "E = 5000 N/C aşağı", "s", { tone: "muted", small: true }) : txt(v(-2.6, 1.75), "E = 5000 N/C aşağı", "n", { tone: "muted", small: true }));
    els.push(...charge(v(0, 0), q));
    els.push(vec(v(-0.12, fe > 0 ? 0.25 : -0.25), v(-0.12, (fe > 0 ? 0.25 : -0.25) + fe * S), { tone: "c", bold: true }), vec(v(0.12, -0.25), v(0.12, -0.25 + w * S), { tone: "warn", bold: true }));
    els.push(txt(v(0.0, (fe > 0 ? 0.25 : -0.25) + fe * S + (fe > 0 ? 0.12 : -0.12)), `qE = ${nf(fe, 3)} N`, fe > 0 ? "n" : "s", { tone: "c", small: true, bold: true }), txt(v(0.25, -0.25 + w * S), "mg = 0,010 N", "e", { tone: "warn", small: true, bold: true }));
    if (Math.abs(net) > 1e-6) els.push(vec(v(3.4, 0), v(3.4, net * S), { tone: "a", bold: true }));
    els.push(txt(v(3.55, Math.abs(net) < 1e-9 ? 0 : (net * S) / 2), Math.abs(net) < 1e-9 ? "net 0" : `net ${nf(Math.abs(net), 3)} N aşağı`, "e", { tone: "a", small: true, bold: true }));
    els.push(...pad(-4.0, 2.4, 6.6, -2.6));
    return { els, readout: step === 0 ? ["qEy = (−2×10⁻⁶)(−5000) = +0,010 N; ay = 0,010/0,001 − 10 = 0.", "Net kuvvet sıfır: durgun bırakıldıysa durur, hızı varsa sabit hızla gider."] : ["qEy = (+2×10⁻⁶)(−5000) = −0,010 N; net −0,020 N ⇒ ay = −20 m/s².", "Yük işareti ile alan yönü iki ayrı bilgidir; çift eksi hatası bundan doğar."] };
  },
};

/* ===================== Elektriksel potansiyel ===================== */

const pointPotential: FigureDef = {
  caption:
    "−2 μC kaynak, sonsuzda V = 0. Uzaklığı değiştir: V = kQ/r = −18.000/r volt. 0,50 m’de −36.000 V; oraya +3 μC konursa U = qV = −0,108 J. Volt kaynağa ve noktaya, joule ayrıca test yüküne aittir.",
  alt: "Yatay eksende uzaklık, düşey eksende negatif potansiyel; sıfıra doğru yükselen V–r eğrisi ve seçili uzaklıktaki nokta.",
  param: { label: "Uzaklık r", min: 0.25, max: 2, step: 0.25, init: 0.5, unit: " m" },
  draw: (r) => {
    const KX = 2.2, KY = 0.04, X = (s: number) => s * KX, Y = (kv: number) => kv * KY;
    const V = (s: number) => (k * -2e-6) / s;
    const els: El[] = [...axes(v(0, 0), 2.1 * KX + 0.3, 0.6, "r (m)", "V (kV)", 75 * KY)];
    els.push(poly(curve((s) => V(s) / 1000, 0.25, 2, 60, X, Y), { open: true, tone: "b", smooth: true }));
    for (const s of [0.5, 1, 2]) els.push(...xtick(X(s), 0, nf(s)));
    els.push(...ytick(0, Y(-36), "−36"), ...ytick(0, Y(-72), "−72"));
    const p = v(X(r), Y(V(r) / 1000));
    els.push(seg(v(X(r), 0), p, { tone: "muted", dash: true, thin: true }), ball(p, 0.08, "b"), txt(v(p[0] + 0.12, p[1] - 0.05), `${nf(V(r), 0)} V`, "se", { tone: "b", small: true, bold: true }));
    els.push(...pad(-1.0, 1.0, 2.1 * KX + 1.2, -75 * KY - 0.3));
    return { els, readout: [`V = 9×10⁹·(−2×10⁻⁶)/${nf(r)} = ${nf(V(r), 0)} V.`, `+3 μC için U = qV = ${nf(3e-6 * V(r), 3)} J; test yükü verilmeden U bulunamaz.`] };
  },
};

const zeroVzeroE: FigureDef = {
  caption:
    "1 μC büyüklüğünde iki yük, aralarında 2 m; orta noktaya bak. Eşit pozitiflerde alanlar eşit ve zıt (E = 0) ama potansiyel iki pozitif katkının toplamı (18.000 V). Eşit zıt yüklerde potansiyeller birbirini götürür (V = 0) ama alanlar aynı yönde toplanır (18.000 N/C).",
  alt: "Yatay eksende iki yük ve ortada M noktası; M’de iki alan oku, adıma göre birbirini götüren ya da aynı yönde toplanan oklar ve V ile E değerleri.",
  steps: ["Eşit pozitif yükler", "Eşit zıt yükler"],
  draw: (_v, step) => {
    const K = 1.8, S = 1.2 / 9000, q2 = step === 0 ? 1 : -1;
    const els: El[] = [seg(v(-K - 0.5, 0), v(K + 0.5, 0), { tone: "muted", thin: true }), ...charge(v(-K, 0), 1, "+1 μC", -0.4), ...charge(v(K, 0), q2, q2 > 0 ? "+1 μC" : "−1 μC", -0.4)];
    const e1 = 9000, e2 = step === 0 ? -9000 : 9000;
    els.push(vec(v(0, 0.35), v(e1 * S, 0.35), { tone: "warn", bold: true }), vec(v(0, -0.35), v(e2 * S, -0.35), { tone: q2 > 0 ? "warn" : "b", bold: true }));
    els.push(txt(v(e1 * S + 0.1, 0.35), "E₁", "e", { tone: "warn", small: true }), txt(v(e2 * S + (e2 > 0 ? 0.1 : -0.1), -0.35), "E₂", e2 > 0 ? "e" : "w", { tone: q2 > 0 ? "warn" : "b", small: true }));
    els.push(pt(v(0, 0), "M", "s", "ink"));
    els.push(txt(v(0, 1.0), step === 0 ? "E = 0, V = 18.000 V" : "V = 0, E = 18.000 N/C", "n", { tone: "a", small: true, bold: true }));
    els.push(seg(v(-K, -1.25), v(K, -1.25), { tone: "muted", thin: true }), txt(v(0, -1.4), "2 m", "s", { tone: "muted", small: true }));
    els.push(...pad(-K - 0.9, 1.5, K + 0.9, -1.9));
    return { els, readout: step === 0 ? ["V = 9000 + 9000 = 18.000 V; E = 9000 − 9000 = 0.", "Buraya konan test yüküne kuvvet yok, ama U = qV sıfır değil."] : ["V = 9000 + (−9000) = 0; E = 9000 + 9000 = 18.000 N/C (pozitiften negatife).", "U = 0 seçilmiş referansa göre doğru; kuvvet qE yine de sıfır değil."] };
  },
};

const signs: FigureDef = {
  caption:
    "Potansiyel merdiveni: VA = 100 V, VB = 20 V, ΔV = VB − VA = −80 V. Yük A’dan B’ye yavaşça taşınıyor. ΔU = qΔV, elektrik işi We = −qΔV. −2 μC için ΔU = +160 μJ (dış iş gerekir); +2 μC için ΔU = −160 μJ. Potansiyel haritası yükten bağımsızdır.",
  alt: "Düşey potansiyel ekseninde 100 V’ta A, 20 V’ta B noktası ve aşağı inen yol oku; yanda yükün potansiyel enerji değişimini gösteren yukarı ya da aşağı çubuk.",
  steps: ["q = −2 μC", "q = +2 μC"],
  draw: (_v, step) => {
    const q = step === 0 ? -2 : 2, KY = 0.03, dU = q * -80;
    const els: El[] = [vec(v(0, -0.2), v(0, 120 * KY), { tone: "ink", thin: true }), txt(v(0, 120 * KY), "V (volt)", "n", { tone: "ink", small: true })];
    for (const V of [0, 50, 100]) els.push(...ytick(0, V * KY, String(V)));
    els.push(ball(v(0.8, 100 * KY), 0.1, "c"), txt(v(1.0, 100 * KY), "A: 100 V", "e", { tone: "c", small: true, bold: true }), ball(v(0.8, 20 * KY), 0.1, "c"), txt(v(1.0, 20 * KY), "B: 20 V", "e", { tone: "c", small: true, bold: true }));
    els.push(vec(v(0.8, 100 * KY - 0.15), v(0.8, 20 * KY + 0.15), { tone: "muted", dash: true }));
    const bx = 3.6, KB = 0.012, base = 60 * KY;
    els.push(seg(v(bx - 0.4, base), v(bx + 0.4, base), { tone: "ink", thin: true }), box(bx - 0.25, base, bx + 0.25, base + dU * KB, dU > 0 ? "warn" : "a"));
    els.push(txt(v(bx, base + dU * KB + (dU > 0 ? 0.1 : -0.1)), `ΔU = ${dU > 0 ? "+" : "−"}${Math.abs(dU)} μJ`, dU > 0 ? "n" : "s", { tone: dU > 0 ? "warn" : "a", small: true, bold: true }));
    els.push(...pad(-1.0, 120 * KY + 0.5, 5.4, -0.9));
    return { els, readout: [`ΔU = (${nf(q)} μC)(−80 V) = ${dU > 0 ? "+" : ""}${nf(dU)} μJ; We = ${nf(-dU)} μJ; ΔK = 0 ise dış iş ${nf(dU)} μJ.`, q < 0 ? "Negatif yük düşük potansiyele giderken U artar: elektrik kuvvetine karşı dışarıdan iş gerekir." : "Pozitif yük düşük potansiyele giderken U azalır: elektrik kuvveti pozitif iş yapar."] };
  },
};

const equipotential: FigureDef = {
  caption:
    "+1 μC kaynağın çevresindeki çemberler eş potansiyel çizgileridir: 1 m’de 9000 V, 2 m’de 4500 V, 3 m’de 3000 V. B noktasını 2 m çemberi üzerinde döndür: VA = VB olduğundan A’dan B’ye yay boyunca elektrik işi 0’dır; radyal alan yolun teğetine her yerde diktir.",
  alt: "Ortada pozitif kaynak, çevresinde üç eş merkezli kesikli çember ve dışa doğru radyal alan okları; orta çemberde sabit A noktası, seçili B noktası ve aralarındaki vurgulu yay.",
  param: { label: "B’nin açısı", min: 30, max: 330, step: 30, init: 120, unit: "°", plain: true },
  draw: (phi) => {
    const K = 1.0;
    const els: El[] = [];
    for (const r of [1, 2, 3]) els.push(circle(v(0, 0), r * K, { tone: "muted", dash: true, thin: true }));
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 + Math.PI / 8;
      els.push(vec(v(0.4 * Math.cos(a), 0.4 * Math.sin(a)), v(3.3 * Math.cos(a), 3.3 * Math.sin(a)), { tone: "c", thin: true }));
    }
    els.push(...charge(v(0, 0), 1));
    const arc: V[] = [];
    for (let i = 0; i <= 40; i++) {
      const a = ((phi * i) / 40) * (Math.PI / 180);
      arc.push(v(2 * K * Math.cos(a), 2 * K * Math.sin(a)));
    }
    els.push(poly(arc, { open: true, tone: "a", bold: true }));
    const B = v(2 * K * Math.cos((phi * Math.PI) / 180), 2 * K * Math.sin((phi * Math.PI) / 180));
    els.push(pt(v(2 * K, 0), "A", "se", "a"), pt(B, "B", Math.cos((phi * Math.PI) / 180) >= 0 ? "ne" : "nw", "a"));
    els.push(txt(v(1 * K * 0.71, -1 * K * 0.71), "9000 V", "c", { tone: "muted", small: true }), txt(v(3 * K + 0.1, -0.5), "3000 V", "e", { tone: "muted", small: true }), txt(v(-2 * K - 0.1, -0.35), "4500 V", "w", { tone: "muted", small: true }));
    els.push(...pad(-3.8, 3.5, 4.8, -3.5));
    return { els, readout: [`A ve B 2 m çemberinde: VA = VB = 4500 V, ΔV = 0 ⇒ W = −qΔV = 0 (yay açısı ${phi}°).`, "Bu dönen nokta bir konum seçicisidir; serbest yükün yörüngesi eş potansiyel çizgisi değildir."] };
  },
};

/* ===================== Düzgün alan, paralel levhalar ===================== */

function plates(x0: number, x1: number, yTop: number, yBot: number, topTone: Tone, botTone: Tone): El[] {
  return [box(x0, yTop, x1, yTop + 0.14, topTone), box(x0, yBot - 0.14, x1, yBot, botTone)];
}
function fieldArrows(x0: number, x1: number, yFrom: number, yTo: number, n: number): El[] {
  const els: El[] = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + ((x1 - x0) * (i + 0.5)) / n;
    els.push(vec(v(x, yFrom), v(x, yTo), { tone: "c", thin: true }));
  }
  return els;
}

const fieldGap: FigureDef = {
  caption:
    "Levhalar arası gerilim 100 V; aralığı değiştir: |E| = V/d. 5 cm’de 100/0,05 = 2000 V/m. Aralık iki katına çıkınca alan yarıya iner. Oklar paralel ve eşit aralıklıdır: kenarlardan uzak orta bölgede alan düzgündür. Santimetreyi metreye çevirmeyi unutma.",
  alt: "Üstte pozitif, altta negatif yatay levha; aralarında aşağı yönlü eşit aralıklı paralel alan okları; sağda aralık ölçüsü, solda potansiyel değerleri.",
  param: { label: "Aralık d", min: 2, max: 10, step: 1, init: 5, unit: " cm", plain: true },
  draw: (dcm) => {
    const K = 0.4, H = dcm * K, E = 100 / (dcm / 100);
    const els: El[] = [...plates(0, 5, H, 0, "warn", "b"), ...fieldArrows(0.2, 4.8, H - 0.08, 0.08, 6)];
    els.push(txt(v(-0.15, H + 0.07), "+100 V", "w", { tone: "warn", small: true, bold: true }), txt(v(-0.15, -0.07), "0 V", "w", { tone: "b", small: true, bold: true }));
    els.push(seg(v(5.4, 0), v(5.4, H), { tone: "muted", thin: true }), txt(v(5.55, H / 2), `d = ${dcm} cm`, "e", { tone: "muted", small: true }));
    els.push(txt(v(2.5, H + 0.3), `E = ${nf(E, 0)} V/m`, "n", { tone: "c", small: true, bold: true }));
    els.push(...pad(-1.8, 10 * K + 0.8, 7.2, -0.5));
    return { els, readout: [`E = 100 V / ${nf(dcm / 100)} m = ${nf(E, 0)} V/m (= N/C).`, "V ve d birlikte değişirse oran kur: E₂/E₁ = (V₂/V₁)(d₁/d₂)."] };
  },
};

const linearV: FigureDef = {
  caption:
    "Alt levha 100 V, üst levha 0 V, aralık 5 cm: E = 2000 V/m yukarı. Kesikli çizgiler 25 V aralıklı eş potansiyel yüzeylerdir ve levhalara paraleldir. Noktayı yükselt: alan yönünde s kadar ilerleyince ΔV = −E·s. Potansiyel değişirken E sabit kalır.",
  alt: "Altta yüksek potansiyelli, üstte sıfır potansiyelli levha; aralarında yukarı alan okları ve 75, 50, 25 V kesikli eş potansiyel çizgileri; seçili yükseklikte işaretli nokta.",
  param: { label: "Alt levhadan yükseklik s", min: 0, max: 5, step: 0.5, init: 2, unit: " cm" },
  draw: (s) => {
    const K = 0.6, H = 5 * K, V = 100 - 2000 * (s / 100);
    const els: El[] = [...plates(0, 5, H, 0, "b", "warn"), ...fieldArrows(0.8, 4.7, 0.08, H - 0.08, 4)];
    for (const [Vl, y] of [[75, 1.25], [50, 2.5], [25, 3.75]] as [number, number][]) {
      els.push(seg(v(0, y * K), v(5, y * K), { tone: "muted", dash: true, thin: true }), txt(v(5.15, y * K), `${Vl} V`, "e", { tone: "muted", small: true }));
    }
    els.push(txt(v(5.15, H + 0.07), "0 V", "e", { tone: "b", small: true, bold: true }), txt(v(5.15, -0.07), "100 V", "e", { tone: "warn", small: true, bold: true }));
    els.push(ball(v(0.35, s * K), 0.1, "a"), txt(v(-0.2, s * K), `V = ${nf(V, 1)} V`, "w", { tone: "a", small: true, bold: true }));
    els.push(...pad(-2.4, H + 0.5, 6.6, -0.5));
    return { els, readout: [`V(s) = 100 − 2000·${nf(s / 100)} = ${nf(V, 1)} V.`, "Levhaya paralel yer değiştirmede ΔV = 0; alan yüksek potansiyelden düşüğe yönelir."] };
  },
};

const weightField: FigureDef = {
  caption:
    "Örnek tanecik: m = 6 g (mg = 0,06 N), q = +3 μC; alan yukarı. Alanı değiştir: qE = 3×10⁻⁶·E. E = 20.000 N/C’de elektrik kuvveti 0,06 N olur ve ağırlığı dengeler: net 0. Elektrik kuvveti büyükse ivme yukarı, küçükse aşağıdır.",
  alt: "Altta pozitif, üstte negatif levha ve yukarı alan okları; aradaki tanecikte yukarı elektrik kuvveti ve aşağı ağırlık okları; yanda net kuvvet oku.",
  param: { label: "Alan E", min: 0, max: 40000, step: 5000, init: 20000, unit: " N/C", plain: true },
  draw: (E) => {
    const q = 3e-6, m = 0.006, S = 15, fe = q * E, w = m * 10, net = fe - w, a = net / m;
    const els: El[] = [...plates(-1.4, 3.6, 2.6, -1.6, "b", "warn")];
    for (const x of [-1.1, 2.7, 3.3]) els.push(vec(v(x, -1.5), v(x, 2.5), { tone: "c", thin: true }));
    els.push(...charge(v(0, 0.5), 1));
    if (fe > 1e-9) els.push(vec(v(-0.1, 0.75), v(-0.1, 0.75 + fe * S), { tone: "a", bold: true }), txt(v(0.05, 0.75 + fe * S + 0.12), `qE = ${nf(fe, 3)} N`, "ne", { tone: "a", small: true, bold: true }));
    els.push(vec(v(0.1, 0.25), v(0.1, 0.25 - w * S), { tone: "warn", bold: true }), txt(v(0.25, 0.25 - w * S), "mg = 0,06 N", "e", { tone: "warn", small: true, bold: true }));
    if (Math.abs(net) > 1e-9) els.push(vec(v(4.2, 0.5), v(4.2, 0.5 + net * S), { tone: "ink", bold: true }));
    els.push(txt(v(4.35, 0.5), Math.abs(net) < 1e-9 ? "net 0" : `a = ${nf(a, 1)} m/s²`, "e", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-1.8, 3.0, 6.6, -2.0));
    return { els, readout: [`qE = ${nf(fe, 3)} N, mg = 0,06 N ⇒ ay = qE/m − g = ${nf(a, 2)} m/s².`, "Denge kuvvetlerin yok olduğu anlamına gelmez; durgun bırakılırsa durur, hızı varsa sabit hızla gider."] };
  },
};

const firstEvent: FigureDef = {
  caption:
    "Örnek: levha boyu 0,8 m, aralık 0,2 m; tanecik ortadan 4 m/s yatay hızla giriyor, net ivme yukarı. İvmeyi değiştir: çıkış süresi 0,8/4 = 0,2 s; üst levhaya temas y = ½at² = 0,1 m koşulundan. a ≥ 5 m/s² ise tanecik levhaya önce çarpar; ilk olay hangisiyse yörünge orada biter.",
  alt: "Yatay iki levha arasında soldan giren taneciğin parabol yörüngesi; yörünge ya sağ uçtan çıkışta ya da üst levhaya temas noktasında bitiyor, olay noktası işaretli.",
  param: { label: "Yukarı ivme a", min: 0, max: 10, step: 1, init: 3, unit: " m/s²", plain: true },
  draw: (a) => {
    const K = 6, L = 0.8, d = 0.2, vx = 4;
    const tExit = L / vx, tHit = a > 0 ? Math.sqrt(d / a) : Infinity, tEnd = Math.min(tExit, tHit);
    const els: El[] = [...plates(0, L * K, (d / 2) * K, (-d / 2) * K, "b", "warn")];
    const path: V[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (tEnd * i) / 40;
      path.push(v(vx * t * K, 0.5 * a * t * t * K));
    }
    els.push(seg(v(-0.6, 0), v(0, 0), { tone: "muted", dash: true, thin: true }), poly(path, { open: true, tone: "a", bold: true }));
    const end = path[path.length - 1], hit = tHit < tExit - 1e-9, corner = Math.abs(tHit - tExit) < 1e-9;
    els.push(ball(end, 0.09, hit ? "warn" : "a"));
    els.push(txt(v(end[0] + 0.12, end[1] + (hit || corner ? 0.25 : 0)), hit ? `temas: x = ${nf(vx * tHit * 100, 1)} cm` : corner ? "köşe olayı" : `çıkış: y = ${nf(0.5 * a * tExit * tExit * 100, 1)} cm`, hit ? "n" : "e", { tone: hit ? "warn" : "a", small: true, bold: true }));
    els.push(txt(v(-0.7, 0), "4 m/s", "w", { tone: "muted", small: true }));
    els.push(...pad(-2.0, (d / 2) * K + 0.7, L * K + 2.8, (-d / 2) * K - 0.5));
    return { els, readout: [hit ? `t_temas = √(0,2/${a}) = ${nf(tHit, 3)} s < 0,2 s: önce üst levhaya çarpar (x = ${nf(vx * tHit, 3)} m).` : corner ? "t_temas = t_çıkış = 0,2 s: köşe olayı." : `0,2 s’de çıkar; o anda y = ½·${a}·0,2² = ${nf(0.5 * a * tExit * tExit, 3)} m < 0,1 m.`, "Yalnız L/vx süresini kullanmak levhanın içinden geçen bir yörünge üretebilir."] };
  },
};

/* ===================== Sığaçlar ===================== */

const halfQV: FigureDef = {
  caption:
    "2 μF sığaç: Q = C·V doğrusu. Gerilimi değiştir: yüklerken gerilim 0’dan V’ye artar, bu yüzden iş Q–V altındaki üçgen alandır: U = ½QV. 10 V’ta Q = 20 μC, U = 100 μJ; kesikli dikdörtgen QV = 200 μJ iki kat fazladır.",
  alt: "Yatay eksende gerilim, düşey eksende yük; orijinden çıkan doğru, seçili gerilime kadar taralı üçgen alan ve onu çevreleyen kesikli dikdörtgen.",
  param: { label: "Gerilim V", min: 1, max: 10, step: 1, init: 10, unit: " V", plain: true },
  draw: (V) => {
    const KX = 0.45, KY = 0.15, X = (s: number) => s * KX, Y = (q: number) => q * KY, Q = 2 * V;
    const els: El[] = [...axes(v(0, 0), 10.6 * KX, 21 * KY, "V (volt)", "Q (μC)")];
    els.push(poly([v(0, 0), v(X(V), 0), v(X(V), Y(Q))], { fill: "a", tone: "a", thin: true }), poly([v(0, 0), v(X(V), 0), v(X(V), Y(Q)), v(0, Y(Q))], { tone: "muted", dash: true, thin: true }));
    els.push(seg(v(0, 0), v(X(10), Y(20)), { tone: "ink", bold: true }));
    els.push(...xtick(X(V), 0, String(V)), ...ytick(0, Y(Q), String(Q)));
    els.push(txt(v(X(V) * 0.66, Y(Q) * 0.28), `U = ${nf(0.5 * Q * V, 0)} μJ`, "c", { tone: "a", small: true, bold: true }));
    els.push(...pad(-0.9, 21 * KY + 0.5, 10.6 * KX + 1.4, -0.5));
    return { els, readout: [`Q = 2 μF · ${V} V = ${Q} μC; U = ½QV = ½CV² = ${nf(0.5 * Q * V, 0)} μJ.`, "U = QV yazmak, bütün yükü en baştan son gerilime karşı taşımak demektir: enerji iki kat çıkar."] };
  },
};

function capBars(r: Record<"C" | "Q" | "V" | "E" | "U", number>, x0: number): El[] {
  const els: El[] = [seg(v(x0 - 0.2, 0), v(x0 + 6.8, 0), { tone: "ink", thin: true }), seg(v(x0 - 0.2, 0.8), v(x0 + 6.8, 0.8), { tone: "muted", dash: true, thin: true })];
  els.push(txt(v(x0 + 6.9, 0.8), "ilk", "e", { tone: "muted", small: true }));
  (["C", "Q", "V", "E", "U"] as const).forEach((key, i) => {
    const x = x0 + i * 1.5, h = r[key] * 0.8, tone: Tone = r[key] > 1.001 ? "a" : r[key] < 0.999 ? "b" : "muted";
    els.push(box(x, 0, x + 0.5, h, tone), txt(v(x + 0.25, -0.12), key, "s", { tone: "ink", small: true, bold: true }), txt(v(x + 0.25, h + 0.08), `×${nf(r[key], 2)}`, "n", { tone, small: true }));
  });
  return els;
}
function capDrawing(gap: number, battery: boolean, slab: number): El[] {
  const els: El[] = [box(-0.1, 0, 0.05, 2.2, "warn"), box(gap, 0, gap + 0.15, 2.2, "b")];
  if (slab > 1) els.push(box(0.12, 0.1, gap - 0.07, 2.1, "c"), txt(v(gap / 2, 2.4), `εr = ${nf(slab, 1)}`, "n", { tone: "c", small: true }));
  els.push(seg(v(-0.02, 2.2), v(-0.02, 2.9), { tone: "ink", thin: true }), seg(v(gap + 0.07, 2.2), v(gap + 0.07, 2.9), { tone: "ink", thin: true }));
  if (battery) {
    const mx = gap / 2;
    els.push(seg(v(-0.02, 2.9), v(mx - 0.12, 2.9), { tone: "ink", thin: true }), seg(v(mx + 0.12, 2.9), v(gap + 0.07, 2.9), { tone: "ink", thin: true }));
    els.push(seg(v(mx - 0.12, 2.65), v(mx - 0.12, 3.15), { tone: "ink" }), seg(v(mx + 0.12, 2.75), v(mx + 0.12, 3.05), { tone: "ink", bold: true }), txt(v(mx, 3.25), "10 V", "n", { tone: "ink", small: true }));
  } else els.push(txt(v(gap / 2, 3.1), "üreteçten ayrıldı", "n", { tone: "muted", small: true }));
  return els;
}

const connected: FigureDef = {
  caption:
    "2 μF sığaç 10 V üretece bağlı kalıyor; levha aralığını değiştir. Üreteç V’yi sabit tutar: C = εA/d aralıkla ters orantılı, Q = CV onunla birlikte değişir, E = V/d de değişir, U = ½CV². Çubuklar her niceliğin ilk değere oranıdır; sığaç şeması ölçekli değil.",
  alt: "Solda üretece bağlı paralel levhalı sığaç, levha aralığı seçilen değerde; sağda C, Q, V, E, U için ilk değere göre oran çubukları ve kesikli ilk değer çizgisi.",
  param: { label: "Aralık / ilk aralık", min: 0.5, max: 3, step: 0.5, init: 2 },
  draw: (f) => {
    const els: El[] = [...capDrawing(0.6 * f, true, 1), ...capBars({ C: 1 / f, Q: 1 / f, V: 1, E: 1 / f, U: 1 / f }, 2.6)];
    els.push(...pad(-0.6, 3.7, 10.2, -0.6));
    return { els, readout: [`d × ${nf(f, 1)}: C = ${nf(2 / f, 2)} μF, Q = ${nf(20 / f, 2)} μC, V = 10 V, U = ${nf(100 / f, 1)} μJ.`, "Bağlı üreteç yük alışverişi yapar; başlangıç Q’sunu sabit tutamazsın."] };
  },
};

const isolated: FigureDef = {
  caption:
    "Aynı sığaç 10 V’ta yüklenip üreteçten ayrılıyor (Q = 20 μC korunur); levhalar arasını dolduran yalıtkanın εr değerini değiştir. C εr katına çıkar, V = Q/C ve E = Q/(εA) εr’ye bölünür, U = Q²/(2C) azalır. εr = 3’te V üçte bire iner. Sığaç şeması ölçekli değil.",
  alt: "Solda üreteçten ayrılmış sığaç ve levhalar arasında dielektrik dolgu; sağda C, Q, V, E, U oran çubukları; Q çubuğu ilk değer çizgisinde sabit.",
  param: { label: "εr", min: 1, max: 4, step: 0.5, init: 3 },
  draw: (er) => {
    const els: El[] = [...capDrawing(1.2, false, er), ...capBars({ C: er, Q: 1, V: 1 / er, E: 1 / er, U: 1 / er }, 2.6)];
    els.push(...pad(-0.6, 3.7, 10.2, -0.6));
    return { els, readout: [`εr = ${nf(er, 1)}: C = ${nf(2 * er, 1)} μF, Q = 20 μC, V = ${nf(10 / er, 2)} V, U = ${nf(100 / er, 1)} μJ.`, "Bağlı deneyde aynı yalıtkan Q’yu εr katına çıkarırdı: korunan nicelik bağlantıya bağlıdır."] };
  },
};

const overlap: FigureDef = {
  caption:
    "Örnek: levha alanı 0,02 m², aralık 1 mm, hava (ε ≈ ε₀). Üst levhayı kaydır: formüldeki A karşılıklı örtüşen tek alandır, 2A değildir. Tam örtüşmede C = ε₀A/d ≈ 177 pF; yarım örtüşmede yarısı.",
  alt: "Üstten bakışla iki dikdörtgen levha; üstteki yatay kaydırılmış, örtüşen bölge taralı; altında sığa değeri.",
  param: { label: "Örtüşme oranı", min: 0.2, max: 1, step: 0.1, init: 0.6 },
  draw: (fr) => {
    const W = 4, H = 1.4, sh = (1 - fr) * W, C = (8.85e-12 * 0.02 * fr) / 1e-3;
    const els: El[] = [box(0, 0, W, H, "b", false), box(sh, 0.0, sh + W, H, "warn", false), box(sh, 0, W, H, "a")];
    els.push(txt(v(-0.12, H / 2), "alt levha", "w", { tone: "b", small: true }), txt(v(sh + W + 0.12, H / 2), "üst levha", "e", { tone: "warn", small: true }));
    els.push(txt(v((sh + W) / 2, -0.2), `C = ${nf(C * 1e12, 0)} pF`, "s", { tone: "a", small: true, bold: true }));
    els.push(...pad(-2.0, H + 0.4, 2 * W + 1.4, -0.8));
    return { els, readout: [`A_etkin = ${nf(0.02 * fr, 3)} m²; C = 8,85×10⁻¹² · ${nf(0.02 * fr, 3)} / 10⁻³ = ${nf(C * 1e12, 1)} pF.`, "Aralık iki katına çıksaydı aynı örtüşmede C yarıya inerdi (aynı Q için daha büyük V)."] };
  },
};

export const physicsFigures058Electric: Record<string, Record<string, FigureDef>> = {
  "elektrik-alan": {
    "Uzaklığın karesi: oran kur, sınırını söyle": inverseSquare,
    "Bir noktadaki tam iki boyutlu bileşen hesabı": twoD,
    "Eşit olmayan aynı işaretli kaynakta sıfır nokta": zeroSame,
    "Eşit olmayan zıt kaynakta dış bölgeyi sınamak": zeroOpposite,
    "Alan-kuvvet ivme zincirini negatif yükle tamamla": negCharge,
  },
  "elektriksel-potansiyel": {
    "Noktasal kaynağın potansiyeli": pointPotential,
    "Enerji ve işin işaretlerini yükle birleştir": signs,
    "Eş potansiyel çizgisini gerçek geometriyle gör": equipotential,
    "Sıfır V ile sıfır E aynı durum değildir": zeroVzeroE,
  },
  "duzgun-alan-paralel-levhalar": {
    "Gerilimle uzaklık alanı birlikte belirler": fieldGap,
    "Potansiyel levhalar arasında nasıl değişir?": linearV,
    "Ağırlığı ekleyince net kuvveti çiz": weightField,
    "İlk fiziksel olay hangisi?": firstEvent,
  },
  "sigaclar-kondansatorler": {
    "Geometri sığayı nasıl belirler?": overlap,
    "Üretece bağlı deneyde V korunur": connected,
    "Üreteçten ayrılınca Q korunabilir": isolated,
    "Enerji neden yarım QV’dir?": halfQV,
  },
};
