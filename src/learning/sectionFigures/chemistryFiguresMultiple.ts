import { ball, fmt, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Katlı oranlar kanunu. Mass bars for FeO and Fe₂O₃ with iron equalised,
 * formula units of XY₂ and X₂Y₃ counted as balls while one element is
 * equalised, a scale slider that shrinks the second sample until the
 * reference masses match, and C₂H₄ / C₃H₆ grouped per carbon (same CH₂).
 * Masses use Fe = 56, O = 16 as in the guide; drawings are schematic.
 */

const bar = (x: number, y: number, w: number, h: number, tone: Tone): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { tone, fill: tone });

/* ---------- 1. FeO ve Fe₂O₃: demir sabit ---------- */
const iron: FigureDef = {
  caption:
    "İleri ile FeO ve Fe₂O₃ örneklerini karşılaştır. Toplam kütleler (36 g ve 40 g) oranı vermez. Demir kütlesi iki örnekte 28 g'a eşitlenince yalnız oksijen payları karşılaştırılır: 8 g : 12 g = 2 : 3, küçük tam sayılı bir oran.",
  alt: "İki yatay yığın çubuk: FeO için 28 g demir ve 8 g oksijen, Fe₂O₃ için 28 g demir ve 12 g oksijen; altta 0–40 g ölçek; oksijen parçaları vurgulanınca 2:3 oranı yazar.",
  steps: ["Toplamlar", "Demiri eşitle", "Oksijenleri böl"],
  draw: (_v, step) => {
    const k = 0.2;
    const els: El[] = [];
    const rows: [string, number, number, number][] = [
      ["FeO", 1.6, 28, 8],
      ["Fe₂O₃", 0, 28, 12],
    ];
    for (const [name, y, fe, o] of rows) {
      els.push(bar(0, y, fe * k, 0.8, step === 1 ? "b" : "muted"), bar(fe * k, y, o * k, 0.8, step === 2 ? "warn" : "muted"));
      els.push(txt(v(-0.2, y + 0.4), name, "w", { tone: "ink", small: true, bold: true }));
      els.push(txt(v((fe + o) * k + 0.15, y + 0.4), step === 0 ? `${fe + o} g` : step === 1 ? `Fe ${fe} g` : `O ${o} g`, "e", { tone: step === 2 ? "warn" : step === 1 ? "b" : "ink", small: true, bold: true }));
    }
    els.push(seg(v(0, -0.4), v(8, -0.4), { tone: "muted", thin: true }));
    for (let g = 0; g <= 40; g += 8) els.push(seg(v(g * k, -0.4), v(g * k, -0.55), { tone: "muted", thin: true }), txt(v(g * k, -0.55), String(g), "s", { tone: "muted", small: true }));
    els.push(txt(v(8.3, -0.4), "g", "e", { tone: "muted", small: true }));
    if (step >= 1) els.push(seg(v(28 * k, -0.2), v(28 * k, 2.6), { tone: "b", dash: true, thin: true }));
    els.push(txt(v(-2.2, 3.0), " ", "c"), txt(v(10.4, -1.4), " ", "c"));
    const text: [string, string][] = [
      ["FeO örneği 36 g, Fe₂O₃ örneği 40 g.", "Toplam kütleler aranan oranı vermez: 36 : 40 bir katlı oran değildir."],
      ["Her iki örnekte demir 28 g (yarım mol Fe) olacak biçimde seçildi.", "Sabit tutulan element açıkça yazılmalı: burada demir."],
      ["Eşit demir için oksijen: 8 g : 12 g = 2 : 3.", "Formülden kontrol: 2 FeO ile Fe₂O₃'te Fe 2'şer, O 2 ve 3."],
    ];
    return { els, readout: text[step] };
  },
};

/* ---------- 2. XY₂ ve X₂Y₃: hangi elementi eşitlediğini yaz ---------- */
const unitsRow = (x0: number, y: number, n: number, nx: number, ny: number, hx: boolean, hy: boolean): El[] => {
  const els: El[] = [];
  let x = x0;
  for (let u = 0; u < n; u++) {
    for (let i = 0; i < nx; i++) els.push(ball(v(x + i * 0.68, y + 0.38), 0.3, hx ? "b" : "muted", "X"));
    for (let i = 0; i < ny; i++) els.push(ball(v(x + i * 0.55, y - 0.32), 0.24, hy ? "warn" : "muted", "Y"));
    x += Math.max(nx * 0.68, ny * 0.55) + 0.55;
  }
  return els;
};
const formulas: FigureDef = {
  caption:
    "İleri ile XY₂ ve X₂Y₃ birimlerini say. Formülü değiştirmeden birim sayısını ölçekle: X'i 2'de eşitlemek için 2 tane XY₂ al, Y sayıları 4 : 3 olur. Y'yi 6'da eşitlersen 3 XY₂ ile 2 X₂Y₃ alınır ve X sayıları 3 : 4 olur.",
  alt: "Üst satırda XY₂ birimleri, alt satırda X₂Y₃ birimleri; X büyük mavi, Y küçük turuncu toplar. Adımlara göre birim sayısı değişir ve eşitlenen element vurgulanır.",
  steps: ["Birer birim", "X'i eşitle", "Y'yi eşitle"],
  draw: (_v, step) => {
    const nA = step === 0 ? 1 : step === 1 ? 2 : 3;
    const nB = step === 2 ? 2 : 1;
    const els: El[] = [
      ...unitsRow(0, 1.8, nA, 1, 2, step === 1, step === 2 ? false : step === 1),
      ...unitsRow(0, 0, nB, 2, 3, step === 1, step === 1),
    ];
    if (step === 2) {
      els.length = 0;
      els.push(...unitsRow(0, 1.8, nA, 1, 2, true, true), ...unitsRow(0, 0, nB, 2, 3, true, true));
    }
    const cx = (n: number, nx: number) => n * nx;
    const cy = (n: number, ny: number) => n * ny;
    els.push(txt(v(-0.5, 1.8), `${nA} × XY₂`, "w", { tone: "ink", small: true, bold: true }), txt(v(-0.5, 0), `${nB} × X₂Y₃`, "w", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(7.0, 1.8), `X ${cx(nA, 1)} · Y ${cy(nA, 2)}`, "e", { tone: "ink", small: true }), txt(v(7.0, 0), `X ${cx(nB, 2)} · Y ${cy(nB, 3)}`, "e", { tone: "ink", small: true }));
    els.push(txt(v(-3, 2.6), " ", "c"), txt(v(10, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["XY₂: 1 X, 2 Y. X₂Y₃: 2 X, 3 Y. X sayıları farklı; doğrudan Y karşılaştırılamaz.", "Yazılmayan alt indis 1'dir."],
      ["2 XY₂ ile 1 X₂Y₃: X ikisinde de 2. Y oranı (I/II) = 4 : 3.", "Formül değişmedi; yalnız birim sayısı ölçeklendi."],
      ["3 XY₂ ile 2 X₂Y₃: Y ikisinde de 6. X oranı (I/II) = 3 : 4.", "Eşitlenen element değişince sorulan oran da değişir; sırayı (I/II) koru."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Kütle verisi: ikinci örneği ölçekle ---------- */
const scale: FigureDef = {
  caption:
    "Sürgüyle II. örneğin büyüklüğünü değiştir. I: 14 g A + 8 g B; II: 28 g A + 24 g B. Örneği küçültmek bileşimi değiştirmez; A kütlesi 14 g'a indiğinde (ölçek 1/2) B kütleleri doğrudan karşılaştırılır: 8 : 12 = 2 : 3.",
  alt: "İki yığın çubuk: üstte I. örnek sabit (14 g A, 8 g B), altta II. örnek sürgüyle ölçeklenen (A ve B parçaları birlikte küçülür); A uçlarını hizalayan kesik çizgi.",
  param: { label: "II. örneğin ölçeği", min: 0.25, max: 1, step: 0.05, init: 1 },
  draw: (s) => {
    const k = 0.15;
    const a2 = 28 * s;
    const b2 = 24 * s;
    const match = Math.abs(a2 - 14) < 1e-6;
    const els: El[] = [bar(0, 1.4, 14 * k, 0.7, "b"), bar(14 * k, 1.4, 8 * k, 0.7, "warn"), bar(0, 0, a2 * k, 0.7, "b"), bar(a2 * k, 0, b2 * k, 0.7, "warn")];
    els.push(txt(v(-0.2, 1.75), "I", "w", { tone: "ink", small: true, bold: true }), txt(v(-0.2, 0.35), "II", "w", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(22 * k + 0.15, 1.75), "14 g A · 8 g B", "e", { tone: "ink", small: true }), txt(v((a2 + b2) * k + 0.15, 0.35), `${fmt(a2, 1)} g A · ${fmt(b2, 1)} g B`, "e", { tone: match ? "c" : "ink", small: true, bold: match }));
    els.push(seg(v(14 * k, -0.3), v(14 * k, 2.4), { tone: match ? "c" : "muted", dash: true, thin: true }));
    els.push(txt(v(-1.4, 2.8), " ", "c"), txt(v(11.6, -0.8), " ", "c"));
    return {
      els,
      readout: [
        match ? "A eşit (14 g): B oranı I/II = 8 : 12 = 2 : 3" : `II'de A ${fmt(a2, 1)} g; 14 g'a inene kadar küçült.`,
        "Kısa yol: B/A değerlerini böl: (8/14) ÷ (24/28) = 2/3. 8/24 gibi farklı paydalı oran doğrudan kullanılmaz.",
      ],
    };
  },
};

/* ---------- 4. Aynı basit formül ---------- */
const simple: FigureDef = {
  caption:
    "İleri ile C₂H₄ ve C₃H₆ moleküllerini karbon başına grupla. Her C'ye 2 H düşer: ikisinin de basit formülü CH₂'dir. Eşit karbonda hidrojen oranı 1 : 1 çıkar; farklı bir katlı oran aranmaz.",
  alt: "Solda iki karbonlu, sağda üç karbonlu zincir; her karbonun altında iki hidrojen. Son adımda her C ve iki H'si kesik çerçeveyle CH₂ grubu olarak işaretli.",
  steps: ["İki molekül", "Karbon başına grupla"],
  draw: (_v, step) => {
    const els: El[] = [];
    const mol = (x0: number, n: number, name: string) => {
      for (let i = 0; i < n; i++) {
        const x = x0 + i * 1.3;
        if (i > 0) els.push(seg(v(x - 1.0, 0), v(x - 0.3, 0), { tone: "ink" }));
        els.push(ball(v(x, 0), 0.3, "muted", "C"));
        for (const dx of [-0.35, 0.35]) els.push(seg(v(x + dx * 0.4, -0.28), v(x + dx, -0.85), { tone: "ink", thin: true }), ball(v(x + dx, -1.0), 0.17, "b", "H"));
        if (step === 1) els.push(poly([v(x - 0.65, 0.45), v(x + 0.65, 0.45), v(x + 0.65, -1.35), v(x - 0.65, -1.35)], { tone: "c", dash: true, thin: true }));
      }
      els.push(txt(v(x0 + ((n - 1) * 1.3) / 2, 0.6), name, "n", { tone: "ink", small: true, bold: true }));
    };
    mol(0, 2, "C₂H₄");
    mol(4.2, 3, "C₃H₆");
    if (step === 1) els.push(txt(v(0.65, -1.5), "2 × CH₂", "s", { tone: "c", small: true, bold: true }), txt(v(5.5, -1.5), "3 × CH₂", "s", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-1, 1.6), " ", "c"), txt(v(7.8, -2.3), " ", "c"));
    const rows: [string, string][] = [
      ["C₂H₄: 2 C, 4 H. C₃H₆: 3 C, 6 H. Molekül büyüklükleri farklı.", "Not: bu çizim yalnız sayımı gösterir; gerçek bağ düzeni (çift bağ, halka) ayrı konudur."],
      ["Her C başına 2 H: iki maddenin de basit formülü CH₂. Eşit C'de H oranı 1 : 1.", "Katlı oran için bir elementi eşitlediğinde öteki elementin oranı 1 : 1'den farklı küçük tam sayılı bir oran olmalı."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFiguresMultiple: Record<string, Record<string, FigureDef>> = {
  "katli-oranlar": {
    "Referans elementi sabit tut": iron,
    "Eşitleme bir örnek büyütmesidir": formulas,
    "Kütle verilerinden oran bul": scale,
    "Aynı basit oran, farklı molekül büyüklüğü": simple,
  },
};
