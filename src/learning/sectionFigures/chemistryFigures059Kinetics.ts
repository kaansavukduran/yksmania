import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: hız ve enerji. Derişim–zaman eğrisinde sekant ile teğet,
 * ileri/geri aktifleşme engeli (60 ve 90 kJ/mol → ΔH = −30 kJ/mol), deney
 * tablosundan hız yasası üsleri, sıcaklıkla enerji dağılımı ve engel üstü pay,
 * katalizörlü alternatif yol, ekzotermik/endotermik düzeyler, q = mcΔT,
 * kalorimetre bilançosu, bağ enerjisi yolu ve Hess döngüsü. Engel ve düzeyler
 * aynı ölçek fonksiyonundan çizilir; şematik olanlar figcaption'da belirtilir.
 */

/** Potansiyel enerji yolu: giren düzeyi, tepe, ürün düzeyi (kosinüs geçişli). */
export function hump(x0: number, x1: number, yr: number, yt: number, yp: number, n = 60): V[] {
  const ps: V[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    let y = yr;
    if (u > 0.2 && u <= 0.5) y = yr + ((yt - yr) * (1 - Math.cos((Math.PI * (u - 0.2)) / 0.3))) / 2;
    else if (u > 0.5 && u <= 0.8) y = yt + ((yp - yt) * (1 - Math.cos((Math.PI * (u - 0.5)) / 0.3))) / 2;
    else if (u > 0.8) y = yp;
    ps.push(v(x0 + (x1 - x0) * u, y));
  }
  return ps;
}

/* ---------- ayt-tepkime-hizi ---------- */

const secant: FigureDef = {
  caption:
    "Sürgüyle teğetin çizildiği anı değiştir. Örnek eğri [A] = 0,80 · e^(−0,05t) M (öğretim modeli). Kesikli sekant 10 s ile 40 s arasındaki ortalama değişimi, kırmızı teğet seçilen andaki anlık değişimi verir. Eğim negatiftir; harcanma hızı bu eğimin ters işaretlisidir. Hız azaldıkça teğet yatıklaşır.",
  alt: "Derişim–zaman grafiği: 0,80 M'den başlayıp azalan eğri. 10 ve 40 saniyedeki noktaları birleştiren kesikli sekant ve sürgüyle kayan noktada eğriye değen teğet doğru.",
  param: { label: "Teğet anı t", min: 0, max: 60, step: 5, init: 10, unit: " s" },
  draw: (t) => {
    const A = (s: number) => 0.8 * Math.exp(-0.05 * s);
    const X = (s: number) => s * 0.12;
    const Y = (c: number) => c * 4.5;
    const els: El[] = [...axes(v(0, 0), X(66), Y(0.88), "t (s)", "[A] (M)")];
    els.push(poly(curve(A, 0, 60, 60, X, Y), { tone: "c", open: true, bold: true, smooth: true }));
    for (const s of [20, 40, 60]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, Y(0.8), "0,80"), ...ytick(0, Y(0.4), "0,40"));
    els.push(seg(v(X(10), Y(A(10))), v(X(40), Y(A(40))), { tone: "b", dash: true, bold: true }), ball(v(X(10), Y(A(10))), 0.08, "b"), ball(v(X(40), Y(A(40))), 0.08, "b"));
    const slope = -0.05 * A(t);
    const t0 = Math.max(0, t - 12);
    const t1 = Math.min(66, t + 12);
    const yAt = (s: number) => A(t) + slope * (s - t);
    els.push(seg(v(X(t0), Y(Math.max(0, yAt(t0)))), v(X(t1), Y(Math.max(0, yAt(t1)))), { tone: "warn", bold: true }), ball(v(X(t), Y(A(t))), 0.1, "warn"));
    els.push(txt(v(X(40), Y(A(40))), "sekant", "ne", { tone: "b", small: true, bold: true }));
    els.push(...pad(-1.0, 4.6, X(66) + 0.9, -0.7));
    const avg = (A(40) - A(10)) / 30;
    return {
      els,
      readout: [
        `Ortalama (10–40 s): Δ[A]/Δt = (${nf(A(40), 3)} − ${nf(A(10), 3)}) ÷ 30 = ${nf(avg * 1000, 2)}×10⁻³ M/s`,
        `Anlık (${t} s): teğet eğimi = ${nf(slope * 1000, 2)}×10⁻³ M/s → harcanma hızı ${nf(-slope * 1000, 2)}×10⁻³ M/s`,
      ],
    };
  },
};

const barriers: FigureDef = {
  caption:
    "İleri ile engelleri ayrı oklarla oku. Aynı geçiş durumu için ileri engel tepe eksi giren (60 kJ/mol), geri engel tepe eksi ürün (90 kJ/mol) düzeyidir. Ürünler girenlerden 30 kJ/mol aşağıdadır: ΔH = Ea,ileri − Ea,geri = 60 − 90 = −30 kJ/mol. Düzeyler ölçeklidir.",
  alt: "Potansiyel enerji–tepkime yolu grafiği: soldaki giren düzeyinden tepeye çıkıp daha alçak ürün düzeyine inen eğri. Adımlarda ileri engel oku, geri engel oku ve giren–ürün farkını gösteren ΔH oku.",
  steps: ["Ea, ileri", "Ea, geri", "ΔH"],
  draw: (_v, step) => {
    const S = 0.04;
    const yr = 30 * S + 0.6;
    const yt = yr + 60 * S;
    const yp = yr - 30 * S;
    const els: El[] = [...axes(v(0, 0), 8, 4.6, "tepkime yolu", "Ep")];
    els.push(poly(hump(0.3, 7.5, yr, yt, yp), { tone: "c", open: true, bold: true, smooth: true }));
    els.push(txt(v(0.9, yr), "girenler", "s", { tone: "ink", small: true }), txt(v(6.8, yp), "ürünler", "s", { tone: "ink", small: true }));
    els.push(seg(v(1.6, yt), v(6.4, yt), { tone: "muted", dash: true, thin: true }));
    els.push(seg(v(1.0, yr), v(3.0, yr), { tone: "muted", dash: true, thin: true }), seg(v(4.7, yp), v(7.0, yp), { tone: "muted", dash: true, thin: true }));
    if (step >= 0) els.push(vec(v(2.4, yr), v(2.4, yt), { tone: "a", bold: true }), txt(v(2.3, (yr + yt) / 2), "60", "w", { tone: "a", small: true, bold: true }));
    if (step >= 1) els.push(vec(v(5.4, yp), v(5.4, yt), { tone: "b", bold: true }), txt(v(5.5, (yp + yt) / 2), "90", "e", { tone: "b", small: true, bold: true }));
    if (step >= 2) {
      els.push(seg(v(3.0, yr), v(7.3, yr), { tone: "muted", dash: true, thin: true }));
      els.push(vec(v(7.0, yr), v(7.0, yp), { tone: "warn", bold: true }), txt(v(7.1, (yr + yp) / 2), "−30", "e", { tone: "warn", small: true, bold: true }));
    }
    els.push(...pad(-0.8, 5.1, 8.9, -0.7));
    const rows: [string, string][] = [
      ["İleri engel: tepe − giren düzeyi = 60 kJ/mol.", "Engel, girenden geçiş durumuna çıkış; ΔH değil."],
      ["Geri engel: tepe − ürün düzeyi = 90 kJ/mol. Aynı tepe, farklı başlangıç.", "Ekzotermik tepkimede geri engel ileri engelden büyüktür."],
      ["ΔH = Ea,ileri − Ea,geri = 60 − 90 = −30 kJ/mol: ürünler 30 kJ/mol aşağıda.", "Yüksek tepe büyük ΔH demek değildir; engel ile ilk–son farkı ayrı oklarla gösterilir."],
    ];
    return { els, readout: rows[step] };
  },
};

const RATE_ROWS: [number, number, number][] = [
  [0.1, 0.1, 0.002],
  [0.2, 0.1, 0.008],
  [0.1, 0.2, 0.004],
];
const orders: FigureDef = {
  caption:
    "İleri ile tablodaki deneyleri ikişer karşılaştır (bölüm tablosu). Çubuk boyu ölçülen başlangıç hızıdır. B sabitken A iki kat → hız dört kat: a = 2. A sabitken B iki kat → hız iki kat: b = 1. Sonra bir satırdan k bulunur ve öteki satırlarla denetlenir.",
  alt: "Üç dikey çubuk: deney 1, 2 ve 3'ün başlangıç hızları (0,002; 0,008; 0,004 M/s). Altlarında [A] ve [B] değerleri. Adıma göre karşılaştırılan iki çubuk vurgulanıyor.",
  steps: ["Deney 1 ve 2: A'nın üssü", "Deney 1 ve 3: B'nin üssü", "k ve denetim"],
  draw: (_v, step) => {
    const els: El[] = [vec(v(0, 0), v(6.6, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 4.3), { tone: "ink", thin: true })];
    els.push(txt(v(0, 4.3), "r (M/s)", "n", { tone: "ink", small: true }));
    const hi = step === 0 ? [0, 1] : step === 1 ? [0, 2] : [0, 1, 2];
    RATE_ROWS.forEach(([a, b, r], i) => {
      const x = 1.1 + i * 2.0;
      const h = r * 450;
      const on = hi.includes(i);
      els.push(box(x - 0.45, 0, x + 0.45, h, on ? (i === 0 ? "c" : i === 1 ? "a" : "b") : "muted", on));
      els.push(txt(v(x, h), nf(r, 3), "n", { tone: "ink", small: true, bold: on }));
      const c2 = (c: number) => c.toFixed(2).replace(".", ",");
      els.push(txt(v(x, 0), `Deney ${i + 1}`, "s", { tone: on ? "ink" : "muted", small: true, bold: true }));
      els.push(txt(v(x, -0.5), `[A] ${c2(a)}`, "s", { tone: on ? "ink" : "muted", small: true }));
      els.push(txt(v(x, -0.95), `[B] ${c2(b)}`, "s", { tone: on ? "ink" : "muted", small: true }));
    });
    els.push(...pad(-0.6, 4.8, 7.0, -1.8));
    const k = 0.002 / (0.1 * 0.1 * 0.1);
    const rows: [string, string][] = [
      ["[B] sabit, [A] 0,10 → 0,20 (2 kat); r 0,002 → 0,008 (4 kat). 2ᵃ = 4 → a = 2.", "Yalnız bir derişim değişen iki deney seçilir."],
      ["[A] sabit, [B] 0,10 → 0,20 (2 kat); r 0,002 → 0,004 (2 kat). 2ᵇ = 2 → b = 1.", "Hız yasası: r = k[A]²[B]; toplam mertebe 3."],
      [`Deney 1: k = 0,002 ÷ (0,10² · 0,10) = ${nf(k, 1)} M⁻²·s⁻¹.`, `Denetim: deney 2 → ${nf(k, 1)} · 0,20² · 0,10 = ${nf(k * 0.04 * 0.1, 3)}; deney 3 → ${nf(k, 1)} · 0,10² · 0,20 = ${nf(k * 0.01 * 0.2, 3)} M/s.`],
    ];
    return { els, readout: rows[step] };
  },
};

/** Enerji dağılımı f(E) ∝ √E·e^(−E/RT) (normalize), E kJ/mol. */
function fE(E: number, T: number) {
  const RT = (8.314 * T) / 1000;
  return (2 / Math.sqrt(Math.PI)) * Math.pow(RT, -1.5) * Math.sqrt(E) * Math.exp(-E / RT);
}
function above(Ea: number, T: number) {
  let s = 0;
  const dE = 0.05;
  for (let E = Ea; E < Ea + 120; E += dE) s += fE(E + dE / 2, T) * dE;
  return s;
}
const tempDist: FigureDef = {
  caption:
    "Sürgüyle ikinci sıcaklığı (T₂) değiştir; mavi eğri 300 K. Eğriler tanecik enerjilerinin dağılımıdır, alanları eşittir. Sıcaklık artınca dağılım sağa yayılır ve örnek engel Ea = 10 kJ/mol'ün üstündeki pay büyür. Engelin kendisi değişmez; değişen, engeli aşabilecek taneciklerin payıdır (k artar).",
  alt: "Yatay eksen enerji (kJ/mol), dikey eksen tanecik payı. İki eğri: 300 K'de daha dik ve yüksek tepeli, T₂'de daha yayvan. Ea'da dikey kesikli çizgi.",
  param: { label: "T₂", min: 300, max: 600, step: 50, init: 400, unit: " K" },
  draw: (T2) => {
    const Ea = 10;
    const X = (E: number) => E * 0.45;
    const Y = (f: number) => f * 9;
    const els: El[] = [...axes(v(0, 0), X(17), Y(0.43), "E (kJ/mol)", "tanecik payı")];
    const tail = (T: number): V[] => [v(X(Ea), 0), ...curve((E) => fE(E, T), Ea, 16, 30, X, Y), v(X(16), 0)];
    els.push(poly(tail(T2), { tone: "warn", fill: "warn", bare: true }));
    els.push(poly(tail(300), { tone: "b", fill: "b", bare: true }));
    els.push(poly(curve((E) => fE(E, 300), 0, 16, 90, X, Y), { tone: "b", open: true, bold: true, smooth: true }));
    els.push(poly(curve((E) => fE(E, T2), 0, 16, 90, X, Y), { tone: "warn", open: true, bold: true, smooth: true, dash: T2 === 300 }));
    els.push(seg(v(X(Ea), 0), v(X(Ea), 3.4), { tone: "ink", dash: true }), txt(v(X(Ea), 3.4), "Ea", "n", { tone: "ink", small: true, bold: true }));
    for (const E of [5, 10, 15]) els.push(...xtick(X(E), 0, String(E)));
    const p1 = above(Ea, 300);
    const p2 = above(Ea, T2);
    els.push(txt(v(X(2.0), Y(fE(2.0, 300)) + 0.05), "300 K", "nw", { tone: "b", small: true, bold: true }));
    els.push(txt(v(X(6), Y(fE(6, T2)) + 0.05), `${T2} K`, "ne", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.6, 4.6, X(17) + 1.0, -0.7));
    return {
      els,
      readout: [
        `Ea üstündeki pay: 300 K → %${nf(p1 * 100, 2)} · ${T2} K → %${nf(p2 * 100, 2)} (${nf(p2 / p1, 2)} kat)`,
        "Sabit T'de yalnız derişimi değiştirmek k'yı değiştirmez; sıcaklık değişimi k'yı değiştirir.",
      ],
    };
  },
};

const catalyst: FigureDef = {
  caption:
    "İleri ile katalizörlü yolu ekle (şematik, ölçekli değil). Katalizör aynı girenden aynı ürüne daha düşük engelli başka bir yol açar: Ea küçülür, ileri ve geri tepkime birlikte hızlanır. Giren ve ürün düzeyleri aynı kaldığından ΔH ve aynı sıcaklıktaki denge sabiti değişmez.",
  alt: "Potansiyel enerji grafiği: aynı giren ve ürün düzeylerini bağlayan iki eğri; katalizörsüz yol yüksek tepeli, katalizörlü yol alçak tepeli. Her iki engel oku ve ortak ΔH oku.",
  steps: ["Katalizörsüz yol", "Katalizörlü yol", "Değişmeyen ΔH"],
  draw: (_v, step) => {
    const yr = 2.0;
    const yp = 1.0;
    const els: El[] = [...axes(v(0, 0), 8, 4.8, "tepkime yolu", "Ep")];
    els.push(poly(hump(0.3, 7.5, yr, 4.2, yp), { tone: "c", open: true, bold: true, smooth: true }));
    els.push(vec(v(2.0, yr), v(2.0, 4.2), { tone: "c", bold: true }), txt(v(1.9, 3.4), "Ea", "w", { tone: "c", small: true, bold: true }));
    els.push(seg(v(1.0, yr), v(3.9, yr), { tone: "muted", dash: true, thin: true }));
    if (step >= 1) {
      els.push(poly(hump(0.3, 7.5, yr, 2.9, yp), { tone: "warn", open: true, bold: true, smooth: true, dash: true }));
      els.push(vec(v(3.2, yr), v(3.2, 2.9), { tone: "warn", bold: true }), txt(v(3.3, 2.45), "Ea(kat)", "e", { tone: "warn", small: true, bold: true }));
      els.push(seg(v(3.2, 4.2), v(4.4, 4.2), { tone: "muted", dash: true, thin: true }));
    }
    if (step >= 2) {
      els.push(seg(v(3.9, yr), v(7.4, yr), { tone: "muted", dash: true, thin: true }));
      els.push(vec(v(7.1, yr), v(7.1, yp), { tone: "b", bold: true }), txt(v(7.2, 1.5), "ΔH", "e", { tone: "b", small: true, bold: true }));
    }
    els.push(txt(v(0.9, yr), "girenler", "s", { tone: "ink", small: true }), txt(v(6.6, yp), "ürünler", "s", { tone: "ink", small: true }));
    els.push(...pad(-0.8, 5.3, 8.9, -0.7));
    const rows: [string, string][] = [
      ["Katalizörsüz yolda engel yüksek: aynı sıcaklıkta engeli aşan pay küçük.", "Katalizör tepkimede harcanmaz; çevrimin sonunda geri kazanılır."],
      ["Katalizörlü yol daha alçak tepeden geçer: ileri ve geri engel aynı miktar küçülür.", "Dengeye daha erken ulaşılır; denge verimi artmaz."],
      ["Giren ve ürün düzeyleri aynı: ΔH değişmez, aynı T'de K değişmez.", "Toz katı yüzeyi artırarak heterojen tepkimeyi hızlandırabilir; bu ayrı bir müdahaledir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- ayt-tepkimelerde-enerji ---------- */

const exoEndo: FigureDef = {
  caption:
    "İleri ile ekzotermik ve endotermik süreci karşılaştır (şematik, ölçekli değil). Ok önce sistem ile çevre arasına çizilir. Sistem çevreye ısı veriyorsa ürünlerin entalpisi düşer, ΔH < 0 (ör. sulu HCl–NaOH nötrleşmesi). Sistem çevreden ısı alıyorsa ΔH > 0 (ör. buharlaşma). Çevrenin aldığı ya da verdiği ısı ters işaretle görünür.",
  alt: "Solda iki entalpi düzeyi ve aralarında ok; sağda sistem kutusu ve çevreye doğru ya da çevreden gelen ısı okları. Birinci adımda düzey aşağı iner ve ısı dışarı çıkar; ikinci adımda düzey yukarı çıkar ve ısı içeri girer.",
  steps: ["Ekzotermik: ΔH < 0", "Endotermik: ΔH > 0"],
  draw: (_v, step) => {
    const exo = step === 0;
    const y0 = exo ? 3.0 : 1.0;
    const y1 = exo ? 1.0 : 3.0;
    const els: El[] = [vec(v(0, 0), v(0, 4.0), { tone: "ink", thin: true }), txt(v(0, 4.0), "H", "n", { tone: "ink", small: true })];
    els.push(seg(v(0.4, y0), v(1.8, y0), { tone: "ink", bold: true }), seg(v(2.6, y1), v(4.0, y1), { tone: "ink", bold: true }));
    els.push(txt(v(1.1, y0), exo ? "HCl + NaOH" : "H₂O(s)", "n", { tone: "ink", small: true }), txt(v(3.3, y1), exo ? "NaCl + H₂O" : "H₂O(g)", "n", { tone: "ink", small: true }));
    els.push(vec(v(2.2, y0), v(2.2, y1), { tone: exo ? "a" : "b", bold: true }), txt(v(2.3, 2.0), exo ? "ΔH < 0" : "ΔH > 0", "e", { tone: exo ? "a" : "b", small: true, bold: true }));
    const bx = 5.6;
    els.push(box(bx, 1.0, bx + 1.8, 3.0, "c"), txt(v(bx + 0.9, 2.0), "sistem", "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(bx + 0.9, 3.0), "çevre", "n", { tone: "muted", small: true }));
    if (exo) els.push(vec(v(bx + 1.9, 2.0), v(bx + 3.0, 2.0), { tone: "a", bold: true }), txt(v(bx + 2.45, 2.0), "ısı", "s", { tone: "a", small: true }));
    else els.push(vec(v(bx + 3.0, 2.0), v(bx + 1.9, 2.0), { tone: "b", bold: true }), txt(v(bx + 2.45, 2.0), "ısı", "s", { tone: "b", small: true }));
    els.push(...pad(-0.5, 4.5, 9.2, 0.4));
    const rows: [string, string][] = [
      ["Sistem ısı veriyor: H(ürün) < H(giren), ΔH negatif. Çevre aynı miktarı alır (kayıp yoksa).", "Kalorimetredeki suyun ısınması, tepkimenin ısı verdiğini gösterir; su çevredir."],
      ["Sistem ısı alıyor: H(ürün) > H(giren), ΔH pozitif. Erime, buharlaşma, süblimleşme ısı alır.", "Tersleri (donma, yoğuşma, kırağılaşma) aynı büyüklükte ısı verir."],
    ];
    return { els, readout: rows[step] };
  },
};

const heatCap: FigureDef = {
  caption:
    "Sürgüyle 100 g suyun sıcaklık değişimini (ΔT = son − ilk) değiştir; c(su) = 4,18 J/(g·K), faz değişimi yok. q = m·c·ΔT: ΔT iki katına çıkınca q da iki katına çıkar. Isınmada q pozitif (su enerji alır), soğumada negatiftir. 1 K'lik fark 1 °C'lik farka eşittir.",
  alt: "Yatay eksen ΔT, dikey eksen q; orijinden geçen doğru ve sürgüyle kayan nokta.",
  param: { label: "ΔT", min: -20, max: 20, step: 1, init: 10, unit: " K" },
  draw: (dT) => {
    const q = 100 * 4.18 * dT;
    const X = (t: number) => 3.6 + t * 0.17;
    const Y = (j: number) => 2.4 + j * 0.00024;
    const els: El[] = [];
    els.push(vec(v(X(-22), Y(0)), v(X(23), Y(0)), { tone: "ink", thin: true }), vec(v(X(0), Y(-9200)), v(X(0), Y(9800)), { tone: "ink", thin: true }));
    els.push(txt(v(X(23), Y(0)), "ΔT (K)", "se", { tone: "ink", small: true }), txt(v(X(0), Y(9800)), "q (J)", "n", { tone: "ink", small: true }));
    els.push(seg(v(X(-20), Y(-8360)), v(X(20), Y(8360)), { tone: "c", bold: true }));
    for (const t of [-20, -10, 10, 20]) els.push(...xtick(X(t), Y(0), String(t).replace("-", "−")));
    els.push(ball(v(X(dT), Y(q)), 0.11, "warn"));
    els.push(...pad(0.4, Y(10600), X(23) + 1.2, Y(-9800)));
    return {
      els,
      readout: [
        `q = 100 g · 4,18 J/(g·K) · ${nf(dT, 0)} K = ${nf(q, 0)} J`,
        dT > 0 ? "Su enerji alıyor (q > 0)." : dT < 0 ? "Su enerji veriyor (q < 0)." : "Sıcaklık değişmedi: q = 0.",
      ],
    };
  },
};

const calorimeter: FigureDef = {
  caption:
    "Sürgüyle ölçülen sıcaklık artışını değiştir. Kalorimetrede 100 g çözelti (c ≈ 4,18 J/(g·K)) ve ısı sığası C_kal = 20 J/K olan kap aynı ΔT kadar ısınır. Kayıp yoksa q_tepkime + q_çözelti + q_kal = 0: tepkimenin verdiği ısı ikisinin toplamıdır. Kabı yok saymak q_tepkime'yi küçük bulur.",
  alt: "Solda kalorimetre kabı, içinde çözelti ve termometre. Sağda iki parçalı çubuk: çözeltinin aldığı ısı ve kabın aldığı ısı; toplamı tepkimenin verdiği ısıya eşit.",
  param: { label: "ΔT", min: 1, max: 10, step: 1, init: 5, unit: " K" },
  draw: (dT) => {
    const qs = 100 * 4.18 * dT;
    const qk = 20 * dT;
    const els: El[] = [];
    els.push(poly([v(0, 3.2), v(0, 0), v(2.6, 0), v(2.6, 3.2)], { tone: "ink", open: true, bold: true }), seg(v(-0.1, 3.2), v(2.7, 3.2), { tone: "ink" }));
    els.push(box(0.08, 0.08, 2.52, 2.2, "b"), txt(v(1.3, 1.1), "100 g çözelti", "c", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(1.9, 0.6), v(1.9, 3.9), { tone: "muted", bold: true }), ball(v(1.9, 0.6), 0.12, "warn"));
    els.push(txt(v(1.9, 3.9), `ΔT = ${dT} K`, "n", { tone: "ink", small: true }));
    const bx = 4.4;
    const S = 0.0008;
    els.push(box(bx, 0, bx + 0.8, qs * S, "b"), box(bx, qs * S, bx + 0.8, (qs + qk) * S, "warn"));
    els.push(txt(v(bx + 0.9, (qs * S) / 2), `çözelti ${nf(qs, 0)} J`, "e", { tone: "b", small: true, bold: true }));
    els.push(txt(v(bx + 0.9, qs * S + (qk * S) / 2 + 0.15), `kap ${nf(qk, 0)} J`, "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(bx - 0.2, 0), v(bx + 1.0, 0), { tone: "ink", thin: true }));
    els.push(...pad(-0.4, 4.4, 8.6, -0.3));
    return {
      els,
      readout: [
        `q_çözelti = 100 · 4,18 · ${dT} = ${nf(qs, 0)} J · q_kal = 20 J/K · ${dT} K = ${nf(qk, 0)} J`,
        `q_tepkime = −(${nf(qs, 0)} + ${nf(qk, 0)}) = −${nf(qs + qk, 0)} J (kap yok sayılsaydı −${nf(qs, 0)} J)`,
      ],
    };
  },
};

/* ---------- ayt-entalpi-bag-hess ---------- */

const bondPath: FigureDef = {
  caption:
    "İleri ile H₂ + Cl₂ → 2HCl için bağ enerjisi yolunu kur. Önce kopan bağların maliyeti eklenir (H–H 436, Cl–Cl 243 kJ/mol), sonra oluşan iki H–Cl bağının verdiği enerji çıkarılır (2 · 431). ΔH ≈ ΣD(kopan) − ΣD(oluşan) = 679 − 862 = −183 kJ. Bu bir hesap yoludur, mekanizma değildir. Ortalama tablo değerleri; düzeyler ölçekli.",
  alt: "Dikey enerji ekseninde üç düzey: altta H₂ + Cl₂, en üstte 2H + 2Cl atomları, en altta 2HCl. Yukarı ok bağ koparmayı, aşağı ok bağ oluşumunu, sağdaki kısa ok net ΔH'yi gösteriyor.",
  steps: ["Bağları kopar", "Yeni bağları oluştur", "Net ΔH"],
  draw: (_v, step) => {
    const S = 0.0042;
    const y0 = 1.2;
    const yAtoms = y0 + 679 * S;
    const yP = yAtoms - 862 * S;
    const els: El[] = [vec(v(0, yP - 0.4), v(0, yAtoms + 0.6), { tone: "ink", thin: true }), txt(v(0, yAtoms + 0.6), "H", "n", { tone: "ink", small: true })];
    els.push(seg(v(0.5, y0), v(2.5, y0), { tone: "ink", bold: true }), txt(v(1.5, y0), "H₂ + Cl₂", "s", { tone: "ink", small: true, bold: true }));
    if (step >= 0) {
      els.push(seg(v(2.0, yAtoms), v(5.6, yAtoms), { tone: "ink", bold: true }), txt(v(3.8, yAtoms), "2H + 2Cl (gaz atomları)", "n", { tone: "ink", small: true }));
      els.push(vec(v(2.2, y0), v(2.2, yAtoms), { tone: "a", bold: true }), txt(v(2.3, (y0 + yAtoms) / 2), "+679", "e", { tone: "a", small: true, bold: true }));
    }
    if (step >= 1) {
      els.push(seg(v(4.8, yP), v(6.8, yP), { tone: "ink", bold: true }), txt(v(5.8, yP), "2HCl", "s", { tone: "ink", small: true, bold: true }));
      els.push(vec(v(5.3, yAtoms), v(5.3, yP), { tone: "b", bold: true }), txt(v(5.4, (yAtoms + yP) / 2 + 0.6), "−862", "e", { tone: "b", small: true, bold: true }));
    }
    if (step >= 2) {
      els.push(seg(v(2.5, y0), v(7.6, y0), { tone: "muted", dash: true, thin: true }));
      els.push(vec(v(7.3, y0), v(7.3, yP), { tone: "warn", bold: true }), txt(v(7.4, (y0 + yP) / 2), "−183", "e", { tone: "warn", small: true, bold: true }));
    }
    els.push(...pad(-0.5, yAtoms + 1.0, 9.6, yP - 0.8));
    const rows: [string, string][] = [
      ["1 mol H–H ve 1 mol Cl–Cl bağı koparılır: +436 + 243 = +679 kJ (enerji alınır).", "Bağ enerjisi gaz molekülündeki bağın gaz atomlarına ayrılmasıyla tanımlıdır."],
      ["2 mol H–Cl bağı oluşur: −2 · 431 = −862 kJ (enerji verilir).", "Katsayıyı unutma: denklemde 2HCl var, iki bağ oluşur."],
      ["ΔH ≈ 679 − 862 = −183 kJ: ekzotermik.", "Ortalama bağ enerjileri yaklaşık sonuç verir; oluşum entalpisi yöntemiyle denetlenebilir."],
    ];
    return { els, readout: rows[step] };
  },
};

const hessCycle: FigureDef = {
  caption:
    "İleri ile karbonun CO₂'ye iki yolunu karşılaştır. Doğrudan yol: C + O₂ → CO₂, ΔH = −393,5 kJ. İki basamaklı yol: C + ½O₂ → CO (−110,5 kJ), sonra CO + ½O₂ → CO₂ (−283,0 kJ). Entalpi hâl fonksiyonudur: −110,5 + (−283,0) = −393,5 kJ. Düzeyler ölçekli.",
  alt: "Entalpi ekseninde üç düzey: üstte C + O₂, ortada CO + ½O₂, altta CO₂. Solda üstten alta tek uzun ok, sağda iki kısa ok ardışık.",
  steps: ["Doğrudan yol", "İki basamaklı yol", "Toplamı karşılaştır"],
  draw: (_v, step) => {
    const S = 0.0095;
    const y0 = 4.4;
    const yCO = y0 - 110.5 * S;
    const yCO2 = y0 - 393.5 * S;
    const els: El[] = [vec(v(0, yCO2 - 0.3), v(0, y0 + 0.6), { tone: "ink", thin: true }), txt(v(0, y0 + 0.6), "H", "n", { tone: "ink", small: true })];
    els.push(seg(v(0.4, y0), v(6.6, y0), { tone: "ink", bold: true }), txt(v(3.5, y0), "C(k) + O₂(g)", "n", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(0.4, yCO2), v(6.6, yCO2), { tone: "ink", bold: true }), txt(v(3.5, yCO2), "CO₂(g)", "s", { tone: "ink", small: true, bold: true }));
    if (step === 0 || step === 2) els.push(vec(v(1.2, y0), v(1.2, yCO2), { tone: "a", bold: true }), txt(v(1.3, (y0 + yCO2) / 2), "−393,5", "e", { tone: "a", small: true, bold: true }));
    if (step >= 1) {
      els.push(seg(v(3.8, yCO), v(6.6, yCO), { tone: "ink", bold: true }), txt(v(6.6, yCO), "CO(g) + ½O₂(g)", "e", { tone: "ink", small: true }));
      els.push(vec(v(5.0, y0), v(5.0, yCO), { tone: "b", bold: true }), txt(v(4.9, (y0 + yCO) / 2), "−110,5", "w", { tone: "b", small: true, bold: true }));
      els.push(vec(v(5.0, yCO), v(5.0, yCO2), { tone: "c", bold: true }), txt(v(4.9, (yCO + yCO2) / 2), "−283,0", "w", { tone: "c", small: true, bold: true }));
    }
    els.push(...pad(-0.5, y0 + 1.0, 9.8, yCO2 - 0.7));
    const rows: [string, string][] = [
      ["C(k) + O₂(g) → CO₂(g)  ΔH = −393,5 kJ", "İlk ve son hâl: aynı sistem sınırı, aynı atomlar."],
      ["1) C + ½O₂ → CO  −110,5 kJ   2) CO + ½O₂ → CO₂  −283,0 kJ", "İlk basamağın sonunda kullanılmamış ½O₂ de sistemdedir."],
      ["Toplam: −110,5 + (−283,0) = −393,5 kJ; ara tür CO iki tarafta sadeleşir.", "Hess: farklı yol, aynı başlangıç ve son → aynı ΔH."],
    ];
    return { els, readout: rows[step] };
  },
};

const reverse: FigureDef = {
  caption:
    "İleri ile tepkimeyi tersine çevir. Başlangıç ve son hâl yer değiştirir; H_son − H_ilk farkı işaret değiştirir, büyüklüğü aynı kalır: C + ½O₂ → CO için −110,5 kJ ise CO → C + ½O₂ için +110,5 kJ. Denklemi çevirmeden yalnız işareti çevirmek yanlıştır. Düzeyler ölçekli.",
  alt: "İki entalpi düzeyi: üstte C + ½O₂, altta CO. Birinci adımda yukarıdan aşağı ok, ikinci adımda aşağıdan yukarı ok.",
  steps: ["Verilen tepkime", "Ters tepkime"],
  draw: (_v, step) => {
    const yTop = 3.0;
    const yBot = yTop - 110.5 * 0.018;
    const els: El[] = [vec(v(0, yBot - 0.5), v(0, yTop + 0.7), { tone: "ink", thin: true }), txt(v(0, yTop + 0.7), "H", "n", { tone: "ink", small: true })];
    els.push(seg(v(0.5, yTop), v(4.0, yTop), { tone: "ink", bold: true }), txt(v(2.25, yTop), "C(k) + ½O₂(g)", "n", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(0.5, yBot), v(4.0, yBot), { tone: "ink", bold: true }), txt(v(2.25, yBot), "CO(g)", "s", { tone: "ink", small: true, bold: true }));
    if (step === 0) els.push(vec(v(4.6, yTop), v(4.6, yBot), { tone: "a", bold: true }), txt(v(4.7, (yTop + yBot) / 2), "ΔH = −110,5 kJ", "e", { tone: "a", small: true, bold: true }));
    else els.push(vec(v(4.6, yBot), v(4.6, yTop), { tone: "b", bold: true }), txt(v(4.7, (yTop + yBot) / 2), "ΔH = +110,5 kJ", "e", { tone: "b", small: true, bold: true }));
    els.push(...pad(-0.5, yTop + 1.1, 8.0, yBot - 0.9));
    const rows: [string, string][] = [
      ["C(k) + ½O₂(g) → CO(g)  ΔH = −110,5 kJ", "Ürün düzeyi girenden aşağıda: ekzotermik."],
      ["CO(g) → C(k) + ½O₂(g)  ΔH = +110,5 kJ", "Fazlar aynen korunur; CO gazını başka faza geçirmek ayrı bir dönüşümdür."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures059Kinetics: Record<string, Record<string, FigureDef>> = {
  "ayt-tepkime-hizi": {
    "Ortalama hız sekant, anlık hız teğettir": secant,
    "İleri ve geri engellerin farkı": barriers,
    "Deney tablosundan üsleri bul": orders,
    "Sıcaklık hangi niceliği değiştirir?": tempDist,
    "Katalizör ve katı yüzeyi": catalyst,
  },
  "ayt-tepkimelerde-enerji": {
    "Ekzotermik ve endotermik hangi tarafa göre?": exoEndo,
    "Isı kapasitesi sıcaklık farkını enerjiye çevirir": heatCap,
    "Kalorimetre kabı da enerji alabilir": calorimeter,
  },
  "ayt-entalpi-bag-hess": {
    "Bağı koparmak alır, oluşturmak verir": bondPath,
    "Hess: farklı yol, aynı başlangıç ve son": hessCycle,
    "Ters çevirirken işareti değiştir": reverse,
  },
};

