import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Kimya · İyonlaşma enerjisi. Değerler kJ/mol; Al ardışık değerleri MEB
 * OGM Kimya 9’dan, 2. periyot ve beşli karşılaştırma değerleri yaklaşık
 * standart değerlerdir (F ve Ar NIST’ten). Ezber değil, örüntü okunur.
 */

const f0 = (x: number) => String(Math.round(x * 10) / 10).replace(".", ",");
const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · Ardışık İE ve büyük sıçrama.
const SETS = [
  { label: "Al", vals: [577.6, 1816.7, 2744.8, 11577.5], jump: 3, detail: ["İE₃ → İE₄ arasında büyük sıçrama: ilk üç elektron değerlik katmanında.", "Ana grupta 3 değerlik elektronu → 3A (MEB Kimya 9 verisi).", "Değerlik sayısı sıçramadan ÖNCE çıkarılan elektron sayısıdır."] },
  { label: "X (2A benzeri)", vals: [738, 1451, 7733, 10542], jump: 2, detail: ["İE₂/İE₁ ≈ 2, İE₃/İE₂ ≈ 5,3: ilk belirgin sıçrama İE₂ → İE₃.", "2 değerlik elektronu; ana grup bağlamında 2A ile uyumlu."] },
  { label: "Y (1A benzeri)", vals: [496, 4562, 6910, 9543], jump: 1, detail: ["4562/496 ≈ 9,2: ilk elektrondan hemen sonra sıçrama.", "1 değerlik elektronu; ana grupta 1A. Z’nin tam değeri bundan çıkmaz."] },
];
const jumps: FigureDef = {
  caption:
    "Ardışık iyonlaşma enerjileri her zaman artar (İE₁ < İE₂ < …). Bir veri setine tıkla: iç katmana geçildiği basamakta büyük sıçrama görünür. Sıçramadan önce çıkarılan elektron sayısı ana grupta değerlik elektron sayısıdır.",
  alt: "Dört dikey çubuk: İE₁’den İE₄’e. Seçilen sette bir çubuktan sonrakine çok büyük artış var ve ok ile işaretli.",
  picks: SETS.map((s) => ({ label: s.label, title: `${s.label}: ${s.jump} değerlik elektronu`, detail: s.detail })),
  draw: (_v, _s, pick = -1) => {
    const S = SETS[pick >= 0 ? pick : 0], K = 3.2 / 12000, W = 1.1;
    const els: El[] = [seg(v(-0.2, 0), v(4 * 1.6 + 0.2, 0), { thin: true })];
    S.vals.forEach((val, i) => {
      const x = i * 1.6, h = val * K, after = i >= S.jump;
      els.push(rect(x, x + W, 0, h, after ? "warn" : "c"));
      els.push(txt(v(x + W / 2, h + 0.25), f0(val), "c", { small: true }), txt(v(x + W / 2, -0.3), `İE${"₁₂₃₄"[i]}`, "c", { small: true, bold: true }));
    });
    const xa = (S.jump - 1) * 1.6 + W, xb = S.jump * 1.6;
    els.push(vec(v(xa + 0.05, S.vals[S.jump - 1] * K + 0.5), v(xb - 0.05, Math.min(S.vals[S.jump] * K, 3.0)), { tone: "a", bold: true }));
    els.push(txt(v((xa + xb) / 2 - 0.3, Math.min(S.vals[S.jump] * K, 3.0) + 0.1), "sıçrama", "w", { small: true, bold: true, tone: "a" }));
    SETS.forEach((s, i) => els.push(txt(v(i * 2.3, -1.0), s.label.split(" ")[0] + " seti", "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.4, 3.9), " ", "c"), txt(v(6.8, -1.3), " ", "c"));
    return { els, readout: [pick >= 0 ? S.detail[0] : "Bir veri setine tıkla (varsayılan: Al).", "Mutlak sayılardan önce komşu oranlara bak: ilk büyük oran sıçramayı gösterir."] };
  },
};

// 2 · 2. periyot İE₁ ve istisnalar.
const P2 = [["Li", 520], ["Be", 900], ["B", 801], ["C", 1086], ["N", 1402], ["O", 1314], ["F", 1681], ["Ne", 2081]] as const;
const EXC = [
  { label: "Be > B (2A > 3A)", i: [1, 2], detail: ["Be: 2s² dolu alt kabuk, kararlı.", "B: kopan elektron daha yüksek enerjili 2p¹ orbitalinde; daha kolay kopar.", "Aynı düzen 3. periyotta: Mg > Al."] },
  { label: "N > O (5A > 6A)", i: [4, 5], detail: ["N: 2p³ yarı dolu, kararlı düzen.", "O: 2p⁴; bir p orbitalinde eşleşen elektronlar arası itme koparmayı kolaylaştırır.", "Aynı düzen 3. periyotta: P > S."] },
];
const period2: FigureDef = {
  caption:
    "2. periyotta birinci iyonlaşma enerjisi soldan sağa genel olarak artar, ama iki yerde düşer. Bir istisnaya tıkla: dolu s ve yarı dolu p düzeninin neden komşusundan yüksek olduğu açılır.",
  alt: "Li’den Ne’ye kırık çizgi grafik: genel artış; Be’den B’ye ve N’den O’ya küçük düşüşler.",
  picks: EXC.map((e) => ({ label: e.label, title: e.label, detail: e.detail })),
  draw: (_v, _s, pick = -1) => {
    const X = (i: number) => i * 0.85, Y = (e: number) => (e - 400) / 600;
    const pts: V[] = P2.map(([, e], i) => v(X(i), Y(e)));
    const hot = pick >= 0 ? EXC[pick].i : [];
    const els: El[] = [seg(v(-0.3, 0), v(X(7) + 0.3, 0), { thin: true, tone: "muted" }), poly(pts, { open: true, tone: "b", bold: true })];
    P2.forEach(([el, e], i) => {
      const on = hot.includes(i);
      els.push(ball(pts[i], on ? 0.13 : 0.09, on ? "a" : "b"));
      els.push(txt(v(X(i), -0.3), el, "c", { small: true, bold: on, tone: on ? "a" : "ink" }));
      if (on) els.push(txt(v(X(i), Y(e) + 0.35), String(e), "c", { small: true, tone: "a" }));
    });
    EXC.forEach((ex, i) => els.push(txt(v(i * 3.4, -1.0), ex.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 3.2), " ", "c"), txt(v(6.8, -1.3), " ", "c"));
    return { els, readout: [pick >= 0 ? EXC[pick].detail.slice(0, 2).join(" ") : "Bir istisnaya tıkla ya da aşağıdan seç.", "Önce genel sağa artış, sonra 2A–3A ve 5A–6A düzeltmesi."] };
  },
};

// 3 · 2017 TYT örnek kitapçığı: beşli veri.
const FIVE = [["Na", 496], ["Ca", 590], ["B", 801], ["Ar", 1521], ["F", 1681]] as const;
const five: FigureDef = {
  caption:
    "2017 TYT örnek kitapçığı Fen 10 (ÖSYM’nin örnek kitapçığı, yapılmış sınav değil): Na, Ca, B, F, Ar arasında “en yüksek İE₁ Ca’dadır” yanlıştır (D). Yaklaşık değerler (kJ/mol) gösteriliyor: en yüksek F, soy gaz Ar değil.",
  alt: "Beş yatay çubuk: Na 496, Ca 590, B 801, Ar 1521, F 1681. F en uzun.",
  draw: () => {
    const K = 0.0034;
    const els: El[] = [];
    FIVE.forEach(([el, e], i) => {
      const y = -i * 0.6;
      els.push(txt(v(-0.15, y), el, "w", { small: true, bold: true }), rect(0, e * K, y - 0.2, y + 0.2, el === "F" ? "a" : el === "Ar" ? "b" : "muted"), txt(v(e * K + 0.15, y), String(e), "e", { small: true }));
    });
    els.push(txt(v(-0.8, 0.5), " ", "c"), txt(v(1681 * K + 1.2, -2.8), " ", "c"));
    return { els, readout: ["Ar > Ca karşı örneği D’yi elemeye yeter; ama listenin en yükseği F’dir (NIST: F 17,42 eV, Ar 15,76 eV).", "“Soy gazsa her elementten yüksek” genellemesi geçersiz; farklı periyotları veriyle karşılaştır."] };
  },
};

// 4 · Periyodik yön.
const TABLE: { s: string; r: number; c: number; peach?: boolean }[] = [
  { s: "H", r: 0, c: 0 }, { s: "He", r: 0, c: 7 },
  ...["Li", "Be", "B", "C", "N", "O", "F", "Ne"].map((s, c) => ({ s, r: 1, c, peach: c === 1 || c === 4 })),
  ...["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"].map((s, c) => ({ s, r: 2, c, peach: c === 1 || c === 4 })),
  { s: "K", r: 3, c: 0 }, { s: "Ca", r: 3, c: 1 },
];
const trend: FigureDef = {
  caption:
    "Periyodik yön bir başlangıç tahminidir: aynı periyotta sağa doğru, aynı grupta yukarı doğru İE₁ genel olarak artar. 2. ve 3. periyotta renkli hücreler (2A ve 5A) dolu s / yarı dolu p kararlılığı nedeniyle sağ komşusundan yüksektir.",
  alt: "Küçük periyodik tablo H’den Ca’ya; sağa ve yukarı oklar İE artışını gösteriyor; 2A ve 5A sütunları renkli.",
  draw: () => {
    const D = 0.72;
    const els: El[] = [];
    for (const t of TABLE) {
      const x = t.c * D, y = -t.r * D;
      els.push(rect(x, x + D - 0.06, y - D + 0.06, y, t.peach ? "warn" : "muted"));
      els.push(txt(v(x + (D - 0.06) / 2, y - (D - 0.06) / 2), t.s, "c", { small: true }));
    }
    els.push(vec(v(0, 0.5), v(8 * D - 0.1, 0.5), { tone: "a", bold: true }), txt(v(4 * D, 0.85), "İE₁ genel olarak artar →", "c", { small: true, tone: "a" }));
    els.push(vec(v(8 * D + 0.35, -4 * D + 0.1), v(8 * D + 0.35, 0), { tone: "a", bold: true }), txt(v(8 * D + 0.55, -2 * D), "grupta yukarı artar", "e", { small: true, tone: "a" }));
    els.push(txt(v(-0.3, 1.2), " ", "c"), txt(v(8 * D + 3.2, -4 * D - 0.2), " ", "c"));
    return { els, readout: ["Aynı grupta aşağı: katman ve perdeleme artar, dış elektron uzaklaşır, İE₁ azalır (Li > Na > K).", "Aynı periyotta sağa: proton sayısı ve etkin çekim artar; istisnalar Be > B, N > O, Mg > Al, P > S."] };
  },
};

export const chemistryFiguresIonization: Record<string, Record<string, FigureDef>> = {
  "iyonlasma-enerjisi": {
    "Büyük sıçramanın öncesini say": jumps,
    "Dolu s ve yarı dolu p istisnaları": period2,
    "Veriyle tahmini karşılaştır": five,
    "Periyodik yön bir başlangıç tahminidir": trend,
  },
};
