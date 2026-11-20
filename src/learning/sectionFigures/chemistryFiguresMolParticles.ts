import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Mol ve tanecik. Çubuklar sıfır tabanlı, mol ölçeklidir.
 * Nₐ = 6,02 × 10²³ mol⁻¹ (TYT yaklaşık değeri). ÖSYM bağı: 2024 TYT Fen 12
 * (yapılmış sınav, resmî cevap D); çözüm özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number) => (Math.round(x * 100) / 100).toFixed(2).replace(".", ",");

// 1 · Neyi sayıyorsun?
const TARGETS = [
  { label: "Molekül", co2: 1, co: 1, detail: ["Molekül molü: CO₂ 0,20; CO 0,30 → CO önde.", "Ortak Nₐ çarpanı sıralamayı değiştirmez."] },
  { label: "O atomu", co2: 2, co: 1, detail: ["O atomu: CO₂ 0,20 × 2 = 0,40; CO 0,30 × 1 = 0,30 → CO₂ önde.", "Daha çok molekül, daha çok O atomu demek değildir."] },
  { label: "Toplam atom", co2: 3, co: 2, detail: ["Toplam atom: CO₂ 0,20 × 3 = 0,60; CO 0,30 × 2 = 0,60 → eşit.", "Hedef değişince sıralama değişebilir."] },
];
const target: FigureDef = {
  caption:
    "0,20 mol CO₂ ile 0,30 mol CO. Bir hedef taneciğe tıkla: her örnekte mol × (bir moleküldeki hedef adedi) hesaplanır ve çubuklar karşılaştırılır. Mol saymadan önce neyi saydığını söyle: molekül, O atomu ya da toplam atom.",
  alt: "İki yatay çubuk: CO₂ ve CO için seçilen hedef taneciğin mol miktarı.",
  picks: TARGETS.map((t) => ({ label: t.label, title: t.label, detail: t.detail })),
  draw: (_v, _s, pick = -1) => {
    const t = TARGETS[pick >= 0 ? pick : 1], k = 7;
    const a = 0.2 * t.co2, b = 0.3 * t.co;
    const els: El[] = [
      txt(v(-0.2, 0.5), "CO₂", "w", { small: true, bold: true }), rect(0, a * k, 0.25, 0.75, a >= b ? "a" : "b"), txt(v(a * k + 0.15, 0.5), `0,20 × ${t.co2} = ${f(a)} mol`, "e", { small: true }),
      txt(v(-0.2, -0.4), "CO", "w", { small: true, bold: true }), rect(0, b * k, -0.65, -0.15, b >= a ? "a" : "b"), txt(v(b * k + 0.15, -0.4), `0,30 × ${t.co} = ${f(b)} mol`, "e", { small: true }),
    ];
    TARGETS.forEach((tt, i) => els.push(txt(v(i * 2.2, -1.3), tt.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.0, 1.1), " ", "c"), txt(v(7.4, -1.6), " ", "c"));
    return { els, readout: [t.detail[0], "Adet istenirse en son Nₐ ile çarp: 0,40 mol O = 0,40 × 6,02 × 10²³ atom."] };
  },
};

// 2 · 2024 TYT Fen 12.
const KLM = [
  { k: "K", text: "22 g N₂O (M = 44)", mol: 0.5, o: 1, calc: "22 ÷ 44 = 0,50 mol × 1 O" },
  { k: "L", text: "NK’da 5,6 L CO", mol: 0.25, o: 1, calc: "5,6 ÷ 22,4 = 0,25 mol × 1 O" },
  { k: "M", text: "3,01 × 10²³ SO₂", mol: 0.5, o: 2, calc: "3,01 ÷ 6,02 = 0,50 mol × 2 O" },
];
const fen12: FigureDef = {
  caption:
    "2024 TYT Fen 12 (resmî kitapçık, cevap D): üç gaz örneğindeki toplam O atomu sayıları karşılaştırılıyor. Bir örneğe tıkla: önce veri türüne göre mol (kütle ÷ M, hacim ÷ 22,4, sayı ÷ Nₐ), sonra molekül başına O sayısıyla çarp. M > K > L; molekül molü K ile M’yi eşit gösterir ama hedef O atomudur.",
  alt: "Üç yatay çubuk: K 0,50, L 0,25, M 1,00 mol O atomu.",
  picks: KLM.map((r) => ({ label: r.k, title: `${r.k}: ${f(r.mol * r.o)} Nₐ O atomu`, detail: [r.calc + ` = ${f(r.mol * r.o)} mol O.`, "Ortak pozitif Nₐ çarpanı kaldırılarak sıralanır: 1,00 > 0,50 > 0,25 → M > K > L (D)."] })),
  draw: (_v, _s, pick = -1) => {
    const k = 4.2, els: El[] = [];
    KLM.forEach((r, i) => {
      const y = -i * 0.9, val = r.mol * r.o, sel = pick === i;
      els.push(txt(v(-0.2, y), r.k, "w", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), rect(0, val * k, y - 0.25, y + 0.25, sel ? "a" : "b"), txt(v(val * k + 0.15, y), `${r.text} → ${f(val)} mol O`, "e", { small: true }));
    });
    els.push(txt(v(-0.8, 0.6), " ", "c"), txt(v(9.6, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? KLM[pick].calc + "." : "Bir örneğe tıkla.", "Veri türü değişse de son adım aynı: mol × molekül başına hedef atom."] };
  },
};

// 3 · Ayrışma koşulu.
const DISS = [
  { label: "Na₂SO₄ (tam ayrışır)", ions: [["Na⁺", 2], ["SO₄²⁻", 1]] as [string, number][], atoms: 7, detail: ["Na₂SO₄ → 2 Na⁺ + SO₄²⁻: formül birimi başına 3 iyon.", "0,15 mol için 0,45 mol iyon; atom sayısı ayrı: 0,15 × 7 = 1,05 mol.", "SO₄²⁻ beş atomlu tek iyondur."] },
  { label: "CaCl₂ (tam ayrışır)", ions: [["Ca²⁺", 1], ["Cl⁻", 2]] as [string, number][], atoms: 3, detail: ["CaCl₂ → Ca²⁺ + 2 Cl⁻: 3 iyon.", "Yükün 2 olması iki iyon demek değildir; yük bilançosu ayrı: (+2) + 2(−1) = 0."] },
  { label: "Glikoz (molekül kalır)", ions: [] as [string, number][], atoms: 24, detail: ["C₆H₁₂O₆ suda molekül olarak dağılır: serbest iyon 0.", "Çözünme ile iyonlaşmayı eşitleme."] },
];
const dissociation: FigureDef = {
  caption:
    "İyon sayısı için ayrışma koşulunu açık kur. Bir çözünene tıkla: tam ayrışan tuzun bir formül biriminden kaç iyon çıktığı çizilir; glikoz molekül olarak kalır. (İdeal model: suyun kendi iyonları ve ikincil tepkimeler sayılmaz.)",
  alt: "Solda bir formül birimi, okla sağda oluşan iyonlar; glikozda ok yerine “iyon yok” notu.",
  picks: DISS.map((d) => ({ label: d.label.split(" (")[0], title: d.label, detail: d.detail })),
  draw: (_v, _s, pick = -1) => {
    const d = DISS[pick >= 0 ? pick : 0];
    const els: El[] = [txt(v(0, 0), d.label.split(" (")[0], "c", { bold: true })];
    if (d.ions.length) {
      els.push(vec(v(1.1, 0), v(2.1, 0), { tone: "a", bold: true }));
      let x = 2.6;
      d.ions.forEach(([s, n]) => {
        for (let i = 0; i < n; i++) {
          els.push(ball(v(x, 0), 0.45, s.includes("⁻") ? "c" : "b"), txt(v(x, 0), s, "c", { small: true, bold: true }));
          x += 1.05;
        }
      });
      els.push(txt(v(2.6, -0.75), `${d.ions.reduce((a, [, n]) => a + n, 0)} iyon / formül birimi`, "e", { small: true, tone: "a" }));
    } else els.push(txt(v(1.5, 0), "→ molekül olarak dağılır, iyon yok", "e", { small: true, tone: "warn" }));
    DISS.forEach((dd, i) => els.push(txt(v(-1.0 + i * 2.0, -1.6), dd.label.split(" (")[0], "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.2, 0.8), " ", "c"), txt(v(5.8, -1.9), " ", "c"));
    return { els, readout: [d.detail[0], "Formül birimi sayısı (katı) ile serbest iyon sayısı (çözelti) ayrı niceliklerdir."] };
  },
};

// 4 · Parantez çarpanı.
const PARTS = [
  { label: "Ca", n: 1, tone: "b" as Tone },
  { label: "N", n: 2, tone: "c" as Tone },
  { label: "O", n: 6, tone: "warn" as Tone },
];
const paren: FigureDef = {
  caption:
    "Ca(NO₃)₂: parantez dışındaki 2, NO₃ grubunun tamamına uygulanır. Bir atoma tıkla: bir formül birimindeki adedi (1 Ca, 2 N, 6 O) ve 0,10 mol için mol miktarı açılır. Toplam atom = 1 + 2 + 6 = 9; toplamda Ca’yı unutma.",
  alt: "Bir formül biriminin atomları: 1 Ca, iki NO₃ grubunda 2 N ve 6 O; yanında sayımlar.",
  picks: [...PARTS.map((p) => ({ label: p.label, title: `${p.label}: ${p.n} / formül birimi`, detail: [`0,10 mol Ca(NO₃)₂ → ${f(0.1 * p.n)} mol ${p.label}.`, p.label === "O" ? "2 × 3 = 6: dıştaki 2 içteki 3’ü çarpar." : "Alt indis yazılmamışsa 1 sayılır."] })), { label: "Toplam", title: "Toplam: 9 atom / formül birimi", detail: ["0,10 × 9 = 0,90 mol atom.", "Kontrol: 0,10 + 0,20 + 0,60 = 0,90."] }],
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [ball(v(0, 0), 0.32, "b"), txt(v(0, 0), "Ca", "c", { small: true, bold: true })];
    [[1.4, 0.7], [1.4, -0.7]].forEach(([x, y]) => {
      els.push(poly([v(x - 0.65, y + 0.5), v(x + 0.75, y + 0.5), v(x + 0.75, y - 0.5), v(x - 0.65, y - 0.5)], { tone: "muted", thin: true }));
      els.push(ball(v(x, y), 0.18, "c"), txt(v(x, y), "N", "c", { small: true }));
      [[-0.4, 0.2], [0.4, 0.2], [0, -0.3]].forEach(([dx, dy]) => els.push(ball(v(x + dx, y + dy), 0.12, "warn")));
    });
    els.push(seg(v(0.3, 0.1), v(0.75, 0.5), { thin: true, tone: "muted" }), seg(v(0.3, -0.1), v(0.75, -0.5), { thin: true, tone: "muted" }));
    const labels = ["Ca", "N", "O", "Toplam"];
    labels.forEach((l, i) => els.push(txt(v(3.0, 0.9 - i * 0.55), l === "Toplam" ? "Toplam: 9" : `${l}: ${PARTS[i].n}`, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 1.4), " ", "c"), txt(v(5.4, -1.4), " ", "c"));
    return { els, readout: [pick >= 0 && pick < 3 ? `${f(0.1 * PARTS[pick].n)} mol ${PARTS[pick].label} (0,10 mol bileşikte).` : "0,10 mol Ca(NO₃)₂: 0,10 Ca + 0,20 N + 0,60 O = 0,90 mol atom.", "(NH₄)₂SO₄’te H = 2 × 4 = 8: dıştaki indisi atlamak en sık hata."] };
  },
};

// 5 · Karışım: toplam ve hedef denklemi.
const mixture: FigureDef = {
  caption:
    "CO ve CO₂ karışımı toplam 1,0 mol. CO₂ miktarını (x) değiştir: CO = 1,0 − x olur ve O atomu molü = 2x + (1,0 − x) = 1,0 + x doğrusunu çizer. Verilen O = 1,6 mol ise x = 0,6 (CO₂) ve CO = 0,4. Yalnız toplam mol verilseydi x tek değer almazdı.",
  alt: "Yatay eksende CO₂ molü 0’dan 1’e, düşey eksende O atomu molü; 1,0’dan 2,0’a çıkan doğru; seçilen noktada değerler.",
  param: { label: "CO₂ (x)", min: 0, max: 1, step: 0.1, init: 0.6, unit: " mol" },
  draw: (x) => {
    const sx = 4.5, sy = 2.0, O = 1 + x;
    const els: El[] = [vec(v(0, 0), v(1.1 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 2.2 * sy), { thin: true }), txt(v(1.1 * sx, -0.35), "x (mol CO₂)", "c", { small: true }), txt(v(-0.15, 2.2 * sy), "mol O", "w", { small: true })];
    for (const t of [1, 1.6, 2]) els.push(txt(v(-0.15, t * sy), f(t).replace(/,00$/, ""), "w", { small: true, tone: "muted" }));
    els.push(seg(v(0, 1 * sy), v(1 * sx, 2 * sy), { tone: "b", bold: true }), seg(v(0, 1.6 * sy), v(1 * sx, 1.6 * sy), { dash: true, thin: true, tone: "warn" }));
    els.push(ball(v(x * sx, O * sy), 0.11, "a"), txt(v(0.3, 4.75), `CO₂ ${f(x)} · CO ${f(1 - x)} · O ${f(O)}`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.8, 5.1), " ", "c"), txt(v(7.0, -0.6), " ", "c"));
    return { els, readout: [`O = 2·${f(x)} + ${f(1 - x)} = ${f(O)} mol.`, Math.abs(O - 1.6) < 1e-9 ? "Verilen 1,6 mol O ile eşleşti: x = 0,6." : "Hedef O = 1,6 mol (kesikli çizgi) için x = 0,6."] };
  },
};

export const chemistryFiguresMolParticles: Record<string, Record<string, FigureDef>> = {
  "mol-tanecik-iliskisi": {
    "Mol saymadan önce neyi saydığını söyle": target,
    "Bir örnekten varlık sayısına köprü": fen12,
    "İyon sayısı için ayrışma koşulunu açık kur": dissociation,
    "Parantez dışındaki alt indis tüm gruba uygulanır": paren,
    "Karışımda toplam ve hedef atom denklemini ayır": mixture,
  },
};
