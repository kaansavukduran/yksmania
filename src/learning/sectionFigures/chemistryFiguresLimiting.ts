import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Sınırlayıcı ve artan madde, molecule by molecule. 2 H₂ + O₂ → 2 H₂O with
 * 6 H₂ and 2 O₂: the slider runs the reaction one "reaction unit" at a time
 * (2 H₂ + 1 O₂ each), so the moment O₂ runs out is visible and 2 H₂ remain.
 * Each drawn molecule stands for 1 mol in the source's model. A plateau graph
 * shows product versus added O₂ for fixed H₂; bars compare "how many reaction
 * units each reactant could feed" (n / coefficient).
 */

const H = (c: V): El => ball(c, 0.17, "ink", "H");
const O = (c: V): El => ball(c, 0.26, "warn", "O");
const h2 = (c: V): El[] => [seg(v(c[0] - 0.2, c[1]), v(c[0] + 0.2, c[1]), { tone: "muted", bold: true }), H(v(c[0] - 0.2, c[1])), H(v(c[0] + 0.2, c[1]))];
const o2 = (c: V): El[] => [seg(v(c[0] - 0.26, c[1]), v(c[0] + 0.26, c[1]), { tone: "muted", bold: true }), O(v(c[0] - 0.26, c[1])), O(v(c[0] + 0.26, c[1]))];
const water = (c: V): El[] => [
  seg(c, v(c[0] - 0.3, c[1] - 0.25), { tone: "muted", bold: true }),
  seg(c, v(c[0] + 0.3, c[1] - 0.25), { tone: "muted", bold: true }),
  H(v(c[0] - 0.3, c[1] - 0.25)),
  H(v(c[0] + 0.3, c[1] - 0.25)),
  O(c),
];

/* ---------- 1. Tanecik düzeyinde ilerleme ---------- */
const particles: FigureDef = {
  caption:
    "Sürgüyle tepkimeyi bir “tepkime birimi” ilerlet: her birimde 2 H₂ ve 1 O₂ birleşip 2 H₂O oluşur. 6 H₂ ve 2 O₂ ile başlanıyor: O₂ iki birimde biter (sınırlayıcı), 2 H₂ artar. Her çizilen molekül 1 mol yerine geçer.",
  alt: "Solda kutuda beyaz-gri H₂ çiftleri ve kırmızı O₂ çiftleri; sağda oluşan su molekülleri. Sürgü ilerledikçe soldaki moleküller azalıyor, sağdaki su molekülleri artıyor; sonunda iki H₂ kalıyor.",
  param: { label: "Tepkime birimi", min: 0, max: 2, step: 1, init: 0 },
  draw: (k) => {
    const els: El[] = [];
    const leftH2 = 6 - 2 * k;
    const leftO2 = 2 - k;
    const made = 2 * k;
    // Reactant box.
    els.push(poly([v(-4.6, -1.8), v(-0.4, -1.8), v(-0.4, 2.2), v(-4.6, 2.2)], { tone: "muted", thin: true }));
    els.push(txt(v(-2.5, 2.4), "girenler", "n", { tone: "muted", small: true }));
    for (let i = 0; i < 6; i++) {
      const c = v(-3.8 + (i % 3) * 1.2, 1.4 - Math.floor(i / 3) * 0.9);
      els.push(...(i < leftH2 ? h2(c) : [circle(c, 0.3, { tone: "muted", dash: true, thin: true })]));
    }
    for (let i = 0; i < 2; i++) {
      const c = v(-3.4 + i * 1.6, -1.0);
      els.push(...(i < leftO2 ? o2(c) : [circle(c, 0.38, { tone: "muted", dash: true, thin: true })]));
    }
    els.push(vec(v(-0.1, 0.2), v(1.0, 0.2), { tone: "ink", bold: true }));
    // Product box.
    els.push(poly([v(1.3, -1.8), v(5.1, -1.8), v(5.1, 2.2), v(1.3, 2.2)], { tone: "muted", thin: true }));
    els.push(txt(v(3.2, 2.4), "ürün", "n", { tone: "muted", small: true }));
    for (let i = 0; i < made; i++) els.push(...water(v(2.0 + (i % 2) * 1.4, 1.3 - Math.floor(i / 2) * 1.3)));
    // Counters.
    const row = (y: number, label: string, val: number, tone: Tone) => els.push(txt(v(-4.6, y), `${label}: ${val} mol`, "e", { tone, small: true, bold: true }));
    row(-2.4, "H₂", leftH2, "ink");
    row(-2.95, "O₂", leftO2, "warn");
    els.push(txt(v(1.3, -2.4), `H₂O: ${made} mol`, "e", { tone: "b", small: true, bold: true }));
    els.push(txt(v(-4.9, 2.9), " ", "c"), txt(v(5.4, -3.2), " ", "c"));
    return {
      els,
      readout: [
        `${k} birim: H₂ ${leftH2} mol · O₂ ${leftO2} mol · H₂O ${made} mol`,
        k === 2 ? "O₂ bitti: tepkime durdu. Sınırlayıcı O₂, artan 2 mol H₂. Kontrol: 6/2 = 3 > 2/1 = 2." : k === 0 ? "Her birimde 2 H₂ + 1 O₂ harcanır. Hangisi önce biter? n / katsayı: H₂ 6/2 = 3, O₂ 2/1 = 2." : "Bir birim daha ilerlemek için 2 H₂ ve 1 O₂ gerekiyor: ikisi de var.",
      ],
    };
  },
};

/* ---------- 2. Kaç birime yeter? ---------- */
const capacity: FigureDef = {
  caption:
    "İleri ile her reaktifin kaç tepkime birimine yettiğini hesapla: miktarını kendi katsayısına böl. Kısa çubuk sınırlayıcıdır; ürün ve tüketim bu küçük sayıyla hesaplanır. Gramca ya da molce küçük olan değil, n / katsayı'sı küçük olan biter.",
  alt: "Yan yana iki yatay çubuk: H₂ için 3 birim, O₂ için 2 birim; kısa olan O₂ çubuğu vurgulu. İkinci adımda 3 mol H₂ ve 2 mol O₂ örneğinde bu kez H₂ çubuğu kısa.",
  steps: ["6 mol H₂, 2 mol O₂", "3 mol H₂, 2 mol O₂"],
  draw: (_v, step) => {
    const nH = step === 0 ? 6 : 3;
    const kH = nH / 2;
    const kO = 2;
    const lim = kH < kO ? "H₂" : "O₂";
    const S = 1.6;
    const els: El[] = [seg(v(0, -1.6), v(0, 1.6), { tone: "ink", thin: true })];
    const bar = (y: number, k: number, label: string, tone: Tone, on: boolean) => {
      els.push(poly([v(0, y - 0.35), v(k * S, y - 0.35), v(k * S, y + 0.35), v(0, y + 0.35)], { tone: on ? tone : "muted", fill: on ? tone : "muted" }));
      els.push(txt(v(-0.2, y), label, "w", { tone, small: true, bold: true }), txt(v(k * S + 0.15, y), `${k.toLocaleString("tr-TR")} birim`, "e", { tone: on ? tone : "muted", small: true, bold: on }));
    };
    bar(0.8, kH, `H₂: ${nH} / 2`, "ink", lim === "H₂");
    bar(-0.8, kO, "O₂: 2 / 1", "warn", lim === "O₂");
    const k = Math.min(kH, kO);
    els.push(seg(v(k * S, -1.5), v(k * S, 1.5), { tone: "c", dash: true }), txt(v(k * S, 1.65), `en çok ${k.toLocaleString("tr-TR")} birim`, "n", { tone: "c", small: true, bold: true }));
    for (let t = 1; t <= 3; t++) els.push(seg(v(t * S, -1.7), v(t * S, -1.5), { tone: "muted" }), txt(v(t * S, -1.85), String(t), "s", { tone: "muted", small: true }));
    els.push(txt(v(-2.6, 2.3), " ", "c"), txt(v(7.4, -2.2), " ", "c"));
    const usedH = 2 * k;
    const usedO = k;
    return {
      els,
      readout: [
        `Sınırlayıcı ${lim} · ${k.toLocaleString("tr-TR")} birim → H₂ tüketimi ${usedH.toLocaleString("tr-TR")}, O₂ tüketimi ${usedO.toLocaleString("tr-TR")}, H₂O ${(2 * k).toLocaleString("tr-TR")} mol.`,
        `Artan: ${lim === "O₂" ? `H₂ ${(nH - usedH).toLocaleString("tr-TR")} mol` : `O₂ ${(2 - usedO).toLocaleString("tr-TR")} mol`}. ${step === 1 ? "O₂ yine 2 mol ama bu kez H₂ sınırlar: molce küçük olana bakmak yetmez." : "Gram verildiyse önce n = m / M ile mole çevir."}`,
      ],
    };
  },
};

/* ---------- 3. Ürün platosu ---------- */
const plateau: FigureDef = {
  caption:
    "Sürgüyle 6 mol H₂'nin üstüne O₂ ekle. 3 mol O₂'ye kadar her mol O₂ 2 mol su verir (O₂ sınırlayıcı); 3 molden sonra H₂ biter ve ürün 6 molde sabitlenir (plato), fazla O₂ artar. Kırılma noktası tam oranlı karışımdır: iki giren de biter.",
  alt: "Yatay eksende eklenen O₂ molü, dikey eksende oluşan su molü. Doğru 0'dan 3 mol O₂'de 6 mol suya kadar yükseliyor, sonra yatay devam ediyor. Sürgüye göre hareket eden nokta.",
  param: { label: "Eklenen O₂", min: 0, max: 5, step: 0.5, init: 2, unit: "mol" },
  draw: (o) => {
    const X = (x: number) => x * 1.4;
    const Y = (y: number) => y * 0.5;
    const els: El[] = [vec(v(0, 0), v(X(5.4), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(7.4)), { tone: "ink" })];
    for (let t = 1; t <= 5; t++) els.push(seg(v(X(t), -0.08), v(X(t), 0.08), { tone: "ink" }), txt(v(X(t), -0.2), String(t), "s", { tone: "ink", small: true }));
    for (const t of [2, 4, 6]) els.push(seg(v(-0.08, Y(t)), v(0.08, Y(t)), { tone: "ink" }), txt(v(-0.15, Y(t)), String(t), "w", { tone: "ink", small: true }));
    els.push(poly([v(0, 0), v(X(3), Y(6)), v(X(5), Y(6))], { tone: "b", open: true, bold: true }));
    els.push(seg(v(X(3), 0), v(X(3), Y(6)), { tone: "muted", dash: true, thin: true }), txt(v(X(3), Y(6) + 0.2), "tam oran", "n", { tone: "c", small: true, bold: true }));
    const w = Math.min(2 * o, 6);
    els.push(circle(v(X(o), Y(w)), 0.13, { tone: "warn", fill: "warn" }));
    els.push(txt(v(X(5.4) + 0.1, 0), "O₂ (mol)", "e", { tone: "ink", small: true }), txt(v(0, Y(7.6)), "H₂O (mol)", "n", { tone: "ink", small: true }));
    els.push(txt(v(-0.8, 4.4), " ", "c"), txt(v(9, -0.7), " ", "c"));
    const lim = o < 3 ? "O₂" : o > 3 ? "H₂" : "ikisi birlikte biter";
    return {
      els,
      readout: [
        `O₂ = ${o.toLocaleString("tr-TR")} mol → H₂O = ${w.toLocaleString("tr-TR")} mol · sınırlayıcı: ${lim}`,
        o < 3 ? `Artan H₂: ${(6 - 2 * o).toLocaleString("tr-TR")} mol. Daha fazla O₂ eklemek ürünü artırır.` : o > 3 ? `Artan O₂: ${(o - 3).toLocaleString("tr-TR")} mol. Daha fazla O₂ eklemek ürünü artırmaz.` : "Artan yok: 6 mol H₂ ile 3 mol O₂ tam 2 : 1 oranında.",
      ],
    };
  },
};

export const chemistryFiguresLimiting: Record<string, Record<string, FigureDef>> = {
  "sinirlayici-artan-madde": {
    "Tepkime ilerlemesini aşama aşama izle": particles,
    "Mümkün ürün miktarını iki yoldan bul": capacity,
    "Ürün platosunu ve ters soruyu çöz": plateau,
  },
};
