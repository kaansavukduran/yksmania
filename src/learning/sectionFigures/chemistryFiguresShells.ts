import { ball, circle, poly, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Katman elektron dizilimi (ilk 20 element). Katman çemberleri
 * enerji düzeyini şematik gösterir; elektronların gerçek yolu ya da ölçekli
 * konumu değildir. ÖSYM bağları: 2017 TYT örnek Fen 10 (örnek kitapçık),
 * 2022 TYT Fen 9 (yapılmış sınav, cevap C). Çözümler özgündür.
 */

export const SYM = ["", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"];

/** İlk 20 element için temel hâl katman dağılımı (2, 8, 8, 2 örüntüsü). */
export function shellsOf(e: number): number[] {
  const caps = [2, 8, 8, 2];
  const out: number[] = [];
  let left = e;
  for (const c of caps) {
    if (left <= 0) break;
    const n = Math.min(c, left);
    out.push(n);
    left -= n;
  }
  return out;
}

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

/** Şematik katman diyagramı: çekirdek ve katman başına eşit aralıklı noktalar. */
export function bohr(cx: number, cy: number, z: number, shells: number[], hot = -1): El[] {
  const els: El[] = [ball(v(cx, cy), 0.32, "warn"), txt(v(cx, cy), `${z}+`, "c", { small: true, bold: true })];
  shells.forEach((n, k) => {
    const r = 0.65 + k * 0.5;
    els.push(circle(v(cx, cy), r, { thin: true, tone: k === hot ? "a" : "muted" }));
    for (let i = 0; i < n; i++) {
      const t = Math.PI / 2 + (2 * Math.PI * i) / n;
      els.push(ball(v(cx + r * Math.cos(t), cy + r * Math.sin(t)), 0.08, k === hot ? "a" : "b"));
    }
  });
  return els;
}

const sup = (q: number) => (q === 0 ? "" : `${Math.abs(q) > 1 ? "⁰¹²³⁴"[Math.abs(q)] : ""}${q > 0 ? "⁺" : "⁻"}`);
const signed = (q: number) => (q > 0 ? `+${q}` : q < 0 ? `−${-q}` : "0");

// 1 · e = Z − q.
const PARTS = [
  { z: 11, q: 0 }, { z: 11, q: 1 }, { z: 17, q: -1 }, { z: 20, q: 2 }, { z: 16, q: -2 }, { z: 15, q: -3 },
];
const count: FigureDef = {
  caption:
    "Önce taneciğin toplam elektron sayısını bul: nötrde e = Z, iyonda e = Z − q (q işaretli yük). Bir taneciğe tıkla: proton sayısı çekirdekte sabit kalır, yalnız elektron sayısı ve dağılım değişir.",
  alt: "Solda şematik katman diyagramı: çekirdekte proton sayısı, çemberlerde elektron noktaları. Altında altı tanecik etiketi.",
  picks: PARTS.map((p) => {
    const e = p.z - p.q;
    return {
      label: `${SYM[p.z]}${sup(p.q)}`,
      title: `${SYM[p.z]}${sup(p.q)}: ${e} elektron`,
      detail: [
        `Z = ${p.z}, q = ${signed(p.q)} ⇒ e = ${p.z} − (${signed(p.q)}) = ${e}.`,
        `Dağılım ${shellsOf(e).join(",")}; toplam ${shellsOf(e).join("+")} = ${e}.`,
        p.q > 0 ? "Pozitif iyon elektron vermiştir: e < Z." : p.q < 0 ? "Negatif iyon elektron almıştır: e > Z." : "Nötr atomda p⁺ = e⁻.",
      ],
    };
  }),
  draw: (_v, _s, pick = -1) => {
    const p = PARTS[pick >= 0 ? pick : 0], e = p.z - p.q, sh = shellsOf(e);
    const els: El[] = [...bohr(0, 0, p.z, sh)];
    els.push(txt(v(2.6, 1.0), `${SYM[p.z]}${sup(p.q)}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(2.6, 0.3), `e = ${p.z} − (${signed(p.q)}) = ${e}`, "e", { small: true }));
    els.push(txt(v(2.6, -0.3), `dağılım: ${sh.join(", ")}`, "e", { small: true, tone: "b" }));
    PARTS.forEach((pp, i) => els.push(txt(v(-2.2 + i * 1.15, -2.7), `${SYM[pp.z]}${sup(pp.q)}`, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.6, 2.4), " ", "c"), txt(v(5.6, -3.0), " ", "c"));
    return { els, readout: [`${SYM[p.z]}${sup(p.q)}: p⁺ = ${p.z}, e⁻ = ${e}; dağılım ${sh.join(",")}.`, "İyonlaşmada çekirdek değişmez: Z ve proton sayısı sabit, yalnız elektron sayısı değişir."] };
  },
};

// 2 · Kapasite ≠ dolma sırası.
const capacity: FigureDef = {
  caption:
    "Kesikli çerçeve katmanın kuramsal kapasitesi (2n²: 2, 8, 18, 32), dolu sütun gerçek yerleşme. Atom numarasını değiştir: Z = 19’da M katmanı 18’e değil 8’e ulaşmışken N katmanına elektron gelir. 2n² kör doldurma kuralı değildir.",
  alt: "Dört sütun K, L, M, N; her sütunda kesikli kapasite çerçevesi ve içinde dolu elektron çubuğu.",
  param: { label: "Atom numarası Z", min: 1, max: 20, step: 1, init: 19, unit: "", plain: true },
  draw: (z) => {
    const sh = shellsOf(z), U = 0.11, caps = [2, 8, 18, 32], names = ["K", "L", "M", "N"];
    const els: El[] = [];
    caps.forEach((c, k) => {
      const x = k * 1.5, n = sh[k] ?? 0;
      els.push(rect(x, x + 1, 0, c * U, "muted", false));
      if (n) els.push(rect(x, x + 1, 0, n * U, k === 2 && z > 18 ? "a" : "b"));
      els.push(txt(v(x + 0.5, -0.3), `${names[k]} (n=${k + 1})`, "c", { small: true, bold: true }));
      els.push(txt(v(x + 0.5, c * U + 0.25), `en çok ${c}`, "c", { small: true, tone: "muted" }));
      els.push(txt(v(x + 0.5, -0.75), `dolu: ${n}`, "c", { small: true, bold: n > 0, tone: n ? "b" : "muted" }));
    });
    els.push(txt(v(-0.4, 4.0), " ", "c"), txt(v(6.2, -1.1), " ", "c"));
    return {
      els,
      readout: [
        `Z = ${z} (${SYM[z]}): ${sh.join(", ")}; toplam ${z}.`,
        z >= 19 ? "M katmanı 8’de kalırken N’de elektron var: kapasite yerleşme sırası değildir." : "İlk 20 element için güvenli örüntü 2, 8, 8, 2; daha ötesi orbital enerji sırası ister.",
      ],
    };
  },
};

// 3 · Adım adım dağıt ve denetle (Al).
const ALS = ["e = Z = 13", "K: 2, kalan 11", "L: 8, kalan 3", "M: 3, kalan 0", "Toplam denetimi"];
const distribute: FigureDef = {
  caption:
    "Z = 13 olan nötr Al atomunda elektronları içten dışa dağıt. Adımları ilerlet: her katmandan sonra kalan elektronu yaz; sonda katmanları toplayıp elektron sayısıyla karşılaştır. Üç katman → 3. periyot, üç değerlik elektronu → grup 13 (3A).",
  alt: "Al için şematik katman diyagramı adım adım doluyor; sağda kalan elektron sayacı.",
  steps: ALS,
  draw: (_v, step) => {
    const full = [2, 8, 3], sh = full.slice(0, Math.max(0, Math.min(step, 3)));
    const els: El[] = [...bohr(0, 0, 13, sh.length ? sh : [], step >= 1 && step <= 3 ? step - 1 : -1)];
    const left = 13 - sh.reduce((a, b) => a + b, 0);
    els.push(txt(v(2.4, 1.0), ALS[step], "e", { bold: true, tone: "a" }));
    els.push(txt(v(2.4, 0.3), `kalan elektron: ${left}`, "e", { small: true }));
    if (step === 4) els.push(txt(v(2.4, -0.4), "2 + 8 + 3 = 13 ✓", "e", { small: true, bold: true, tone: "b" }), txt(v(2.4, -1.0), "3 katman · 3 değerlik e⁻", "e", { small: true }));
    els.push(txt(v(-2.4, 2.4), " ", "c"), txt(v(5.4, -2.4), " ", "c"));
    return { els, readout: [step === 4 ? "Al: 2,8,3; toplam 13 = Z. 3. periyot, grup 13 (3A)." : `${ALS[step]}.`, "Toplam denetimi yanlış element ya da ters yük işaretini hemen yakalar."] };
  },
};

// 4 · Periyot ve grup: nötr temel hâlden.
const READS = [
  { a: "2,8,7 · nötr temel", b: "Cl · 3. periyot, grup 17 (7A)", tone: "b" as Tone, detail: ["Toplam 17 = Z, element Cl.", "Ana grupta son katman 7 → grup 17.", "Kısa yol yalnız nötr temel hâl ve ana grup için geçerli."] },
  { a: "2,8,8 · Ca²⁺ iyonu", b: "Z = 18 + 2 = 20 → Ca · 4. periyot, grup 2", tone: "warn" as Tone, detail: ["e = 18, q = +2 ⇒ Z = e + q = 20 (Ca).", "Nötr Ca: 2,8,8,2 → 4. periyot, 2A.", "Ca²⁺’yı 3. periyoda taşımak klasik tuzaktır (2022 TYT Fen 9 bağlamı)."] },
  { a: "2,7,2 · nötr, uyarılmış", b: "toplam 11 → Na · temel 2,8,1 → grup 1", tone: "warn" as Tone, detail: ["Uyarılma elektron sayısını değiştirmez; enerji alıp yer değiştirmedir.", "Konum nötr temel dağılımdan okunur: 3. periyot, 1A.", "Son katmandaki 2’yi grup 2 saymak yanlıştır."] },
  { a: "2 · helyum", b: "1. periyot, grup 18 (soy gaz)", tone: "warn" as Tone, detail: ["He: 1. periyot, 18. grup.", "Dolu ilk katman 2 elektrondur; 8 kuralının istisnası.", "“Son katman 2 → grup 2” He için geçersiz."] },
];
const position: FigureDef = {
  caption:
    "Periyot = dolu katman sayısı, ana grup = son katmandaki elektron sayısı; ama yalnız nötr atomun temel hâlinde. Bir dağılıma tıkla: iyon, uyarılmış hâl ve helyumda kısa yolun nerede bozulduğu açılır.",
  alt: "Dört satır: 2,8,7; Ca²⁺ için 2,8,8; uyarılmış 2,7,2; helyum 2. Her satırın solunda renk çubuğu ve doğru okuma.",
  picks: READS.map((r) => ({ label: r.a, title: r.a, detail: r.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    READS.forEach((r, i) => {
      const y = -i * 1.4, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
      els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.58), r.b, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -5.2), " ", "c"));
    return { els, readout: [pick >= 0 ? READS[pick].detail[0] : "Bir dağılıma tıkla ya da aşağıdan seç.", "Önce Z’yi bul, nötr temel dağılımı kur; konumu ondan oku."] };
  },
};

// 5 · Temel, uyarılmış, geçersiz (nötr Na).
const CANDS = [
  { a: "A: 2,8,1", b: "11 ✓ kapasite ✓ → temel hâl", tone: "b" as Tone, detail: ["Nötr Na’nın en düşük enerjili yerleşimi.", "3. periyot, 1A."] },
  { a: "B: 2,7,2", b: "11 ✓ kapasite ✓ → uyarılmış olabilir", tone: "c" as Tone, detail: ["Bir L elektronu üst düzeye geçmiştir.", "Element ve grup değişmez: hâlâ Na, 1A.", "Yük +1 verilseydi Z = 11 + 1 = 12 olurdu: uyarılmış Mg⁺ adayı."] },
  { a: "C: 3,7,1", b: "11 ✓ ama K’de 3 → geçersiz", tone: "warn" as Tone, detail: ["Toplamın doğru olması yetmez.", "K katmanının kapasitesi 2’dir."] },
  { a: "D: 2,8", b: "10 ✗ → nötr Na değil (Na⁺ olur)", tone: "warn" as Tone, detail: ["Uyarılma elektron kaybı değildir; iyonlaşmada elektron sistemden ayrılır.", "Na⁺ verilseydi uygun olurdu."] },
];
const excited: FigureDef = {
  caption:
    "Nötr Na (Z = 11) için dört aday dağılım. Bir adaya tıkla: önce toplamı (11), sonra katman kapasitesini (K ≤ 2, L ≤ 8), en son enerjiyi (temel mi uyarılmış mı) denetle. “Kesinlikle” diyen ifade için tek karşı örnek yeter.",
  alt: "Dört satır: A 2,8,1 temel; B 2,7,2 uyarılmış; C 3,7,1 geçersiz; D 2,8 nötr Na değil.",
  picks: CANDS.map((c) => ({ label: c.a, title: `${c.a} · ${c.b.split(" → ")[1] ?? c.b}`, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    CANDS.forEach((c, i) => {
      const y = -i * 1.4, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, c.tone));
      els.push(txt(v(0, y), c.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.58), c.b, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -5.2), " ", "c"));
    return { els, readout: [pick >= 0 ? CANDS[pick].detail[0] : "Bir adaya tıkla ya da aşağıdan seç.", "Sıra: toplam → kapasite → enerji. Uyarılma ile iyonlaşma aynı olay değildir."] };
  },
};

export const chemistryFiguresShells: Record<string, Record<string, FigureDef>> = {
  "katman-elektron-dizilimi": {
    "Önce taneciğin elektron sayısını bul": count,
    "2n² kapasiteyi verir; her katman dolmadan sonrakine geçilmez kuralı değildir": capacity,
    "Dağılımı yaz, sonra toplamı geri denetle": distribute,
    "Periyot ve grup nötr atomun temel hâlinden okunur": position,
    "Uyarılmış hâl ve kesinlik sözcükleri": excited,
  },
};
