import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: sulu çözelti dengeleri. pH ölçeği ve on kat kuralı,
 * pH + pOH = pKw, sıcaklıkla nötr pH (25 ve 80 °C), çok seyreltik kuvvetli
 * asitte su katkısı, zayıf asitte denge tablosu, seyreltmeyle iyonlaşma yüzdesi,
 * Henderson–Hasselbalch, sınırlayıcı eşdeğer ve kuvvetli/zayıf asit titrasyon
 * eğrileri. pH değerleri yük denkliğinin pozitif kökünden hesaplanır
 * (Kw = 1,0×10⁻¹⁴, 25 °C; Ka = 1,8×10⁻⁵ asetik asit için tablo değeri).
 */

const KW = 1e-14;
const KA = 1.8e-5;

/** Bilimsel gösterim: 3×10⁻⁶ biçiminde (Türkçe ondalık). */
const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export function sci(x: number, d = 2) {
  if (x === 0) return "0";
  let e = Math.floor(Math.log10(x));
  let m = x / 10 ** e;
  if (Number(m.toFixed(d)) >= 10) {
    m /= 10;
    e += 1;
  }
  const exp = String(e).split("").map((c) => SUP[c] ?? c).join("");
  return Math.abs(m - 1) < 1e-9 ? `10${exp}` : `${nf(m, d)}×10${exp}`;
}

/**
 * Yük denkliği: [H⁺] + [Na⁺] = [A⁻] + [OH⁻], [A⁻] = Ca·Ka/(Ka + [H⁺]).
 * ka = Infinity kuvvetli asit demektir. log[H⁺] üzerinde ikiye bölme.
 */
export function solvePH(Ca: number, Na: number, ka: number) {
  let lo = -15;
  let hi = 1;
  for (let i = 0; i < 100; i++) {
    const m = (lo + hi) / 2;
    const h = 10 ** m;
    const a = Number.isFinite(ka) ? (Ca * ka) / (ka + h) : Ca;
    const f = h + Na - a - KW / h;
    if (f > 0) hi = m;
    else lo = m;
  }
  return -(lo + hi) / 2;
}

/* ---------- ayt-sulu-asit-baz-denge ---------- */

const phScale: FigureDef = {
  caption:
    "Sürgüyle pH'ı değiştir (25 °C). pH = −log[H₃O⁺]: bir pH birimi, H₃O⁺ derişiminde on kat fark demektir. pH 4'ten 5'e çıkınca [H₃O⁺] 10⁻⁴'ten 10⁻⁵ M'ye iner. Katsayı da hesaba girer: 3×10⁻⁶ M için pH = 6 − log 3 ≈ 5,523.",
  alt: "0'dan 14'e yatay pH şeridi: sol kısım asidik, orta nötr, sağ kısım bazik. Sürgüyle kayan işaret ve altında, her biri bir öncekinin onda biri olan basamaklı H₃O⁺ çubukları.",
  param: { label: "pH", min: 0, max: 14, step: 0.5, init: 4, unit: "" },
  draw: (pH) => {
    const X = (p: number) => p * 0.6;
    const els: El[] = [];
    els.push(box(X(0), 2.6, X(7), 3.1, "a"), box(X(7), 2.6, X(14), 3.1, "b"));
    for (let p = 0; p <= 14; p += 2) els.push(seg(v(X(p), 2.5), v(X(p), 2.6), { tone: "ink", thin: true }), txt(v(X(p), 3.1), String(p), "n", { tone: "muted", small: true }));
    els.push(txt(v(X(3.5), 2.85), "asidik", "c", { tone: "ink", small: true, bold: true }), txt(v(X(10.5), 2.85), "bazik", "c", { tone: "ink", small: true, bold: true }));
    els.push(poly([v(X(pH), 2.55), v(X(pH) - 0.18, 2.15), v(X(pH) + 0.18, 2.15)], { tone: "warn", fill: "warn" }));
    // Basamaklar: [H₃O⁺] her pH biriminde on kat; çubuk boyu log ölçekte.
    for (let p = 0; p <= 14; p++) {
      const h = (14 - p) * 0.12 + 0.05;
      const on = Math.abs(p - pH) < 0.26;
      els.push(box(X(p) - 0.2, 0, X(p) + 0.2, h, on ? "warn" : "muted", on));
    }
    els.push(txt(v(X(14) + 0.3, 0.3), "log[H₃O⁺]", "e", { tone: "muted", small: true }));
    els.push(...pad(-0.5, 3.8, X(14) + 2.4, -0.3));
    const h = 10 ** -pH;
    return {
      els,
      readout: [`pH ${nf(pH, 1)}: [H₃O⁺] = ${sci(h)} M · [OH⁻] = ${sci(KW / h)} M`, `pH ${nf(pH, 1)} ile pH ${nf(pH + 1, 1)} arasında [H₃O⁺] oranı 10 : 1.`],
    };
  },
};

const phPoh: FigureDef = {
  caption:
    "Sürgüyle pH'ı değiştir (25 °C, pKw = 14). Kw = [H₃O⁺][OH⁻] sabit olduğundan logaritması pH + pOH = 14 verir: çubuğun iki parçası birbirini tamamlar. Asidik çözeltide de OH⁻ sıfır değildir; yalnız küçüktür.",
  alt: "14 birim uzunluğunda yatay çubuk iki parçaya bölünmüş: sol parça pH, sağ parça pOH. Sürgüyle bölme noktası kayıyor.",
  param: { label: "pH", min: 0, max: 14, step: 0.5, init: 4.5, unit: "" },
  draw: (pH) => {
    const S = 0.55;
    const els: El[] = [];
    if (pH > 0) els.push(box(0, 1.0, pH * S, 1.8, "a"));
    if (pH < 14) els.push(box(pH * S, 1.0, 14 * S, 1.8, "b"));
    if (pH >= 1.5) els.push(txt(v((pH * S) / 2, 1.4), `pH ${nf(pH, 1)}`, "c", { tone: "ink", small: true, bold: true }));
    if (pH <= 12.5) els.push(txt(v(((pH + 14) * S) / 2, 1.4), `pOH ${nf(14 - pH, 1)}`, "c", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(0, 0.6), v(14 * S, 0.6), { tone: "ink", thin: true }), seg(v(0, 0.45), v(0, 0.75), { tone: "ink", thin: true }), seg(v(14 * S, 0.45), v(14 * S, 0.75), { tone: "ink", thin: true }));
    els.push(txt(v(7 * S, 0.6), "pKw = 14", "s", { tone: "ink", small: true }));
    els.push(...pad(-0.4, 2.3, 14 * S + 0.4, -0.3));
    const h = 10 ** -pH;
    return {
      els,
      readout: [`pOH = 14 − ${nf(pH, 1)} = ${nf(14 - pH, 1)}`, `[H₃O⁺] = ${sci(h)} M · [OH⁻] = ${sci(KW / h)} M · çarpım ${sci(KW)}`],
    };
  },
};

const neutralT: FigureDef = {
  caption:
    "İleri ile 25 °C'den 80 °C'ye geç. Nötr koşul [H₃O⁺] = [OH⁻] eşitliğidir, nötr pH = pKw/2. 80 °C'de Kw = 9,0×10⁻¹⁴ verilirse iki iyon da 3,0×10⁻⁷ M olur ve nötr pH ≈ 6,523'tür. Bu su asidik değildir: iki iyon eşittir.",
  alt: "İki dikey sütun: H₃O⁺ ve OH⁻ derişimleri eşit yükseklikte. Altında pH şeridi ve nötr noktayı gösteren işaret; ikinci adımda sütunlar uzar, işaret 7'nin soluna kayar.",
  steps: ["25 °C: Kw = 1,0×10⁻¹⁴", "80 °C: Kw = 9,0×10⁻¹⁴"],
  draw: (_v, step) => {
    const kw = step === 0 ? 1e-14 : 9e-14;
    const c = Math.sqrt(kw);
    const pHn = -Math.log10(c);
    const els: El[] = [];
    const h = c * 0.8e7;
    els.push(box(1.0, 1.4, 1.8, 1.4 + h, "a"), box(2.4, 1.4, 3.2, 1.4 + h, "b"));
    els.push(txt(v(1.4, 1.4), "H₃O⁺", "s", { tone: "ink", small: true, bold: true }), txt(v(2.8, 1.4), "OH⁻", "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(2.1, 1.4 + h), `${sci(c, 1)} M`, "n", { tone: "ink", small: true }));
    const X = (p: number) => 4.4 + (p - 5) * 1.6;
    els.push(seg(v(X(5), 1.2), v(X(8), 1.2), { tone: "ink" }));
    for (const p of [5, 6, 7, 8]) els.push(seg(v(X(p), 1.1), v(X(p), 1.3), { tone: "ink", thin: true }), txt(v(X(p), 1.1), String(p), "s", { tone: "muted", small: true }));
    els.push(poly([v(X(pHn), 1.35), v(X(pHn) - 0.15, 1.75), v(X(pHn) + 0.15, 1.75)], { tone: "warn", fill: "warn" }), txt(v(X(pHn), 1.8), `nötr pH ${nf(pHn, 3)}`, "n", { tone: "warn", small: true, bold: true }));
    els.push(...pad(0.4, 4.4, 10.0, 0.4));
    const rows: [string, string][] = [
      ["25 °C: [H₃O⁺] = [OH⁻] = √(1,0×10⁻¹⁴) = 1,0×10⁻⁷ M → pH = 7,000.", "pH 7 yalnız 25 °C'deki nötr sınırdır."],
      ["80 °C: [H₃O⁺] = [OH⁻] = √(9,0×10⁻¹⁴) = 3,0×10⁻⁷ M → pH = 7 − log 3 ≈ 6,523.", "pH 7'den küçük ama nötr: iki iyon eşit. pH + pOH = pKw ≈ 13,05."],
    ];
    return { els, readout: rows[step] };
  },
};

const dilute: FigureDef = {
  caption:
    "Sürgüyle kuvvetli asidin derişimini (10⁻ⁿ M) azalt. Kesikli doğru yalnız −log c yazıldığında çıkan değerdir ve 10⁻⁸ M'de pH 8 gibi bazik bir sonuç verir. Kırmızı eğri suyun iyonlarını da tutan [H₃O⁺]² − c[H₃O⁺] − Kw = 0 denkleminin pozitif kökünden gelir; asit seyrelse de pH 7'nin üstüne çıkmaz.",
  alt: "Yatay eksen n (c = 10⁻ⁿ M), dikey eksen pH. Kesikli düz doğru n ile birlikte yükselip 7'yi aşıyor; dolu eğri 7'ye yaklaşıp yatay kalıyor. Yatay kesikli çizgi pH 7.",
  param: { label: "n (c = 10⁻ⁿ M)", min: 4, max: 10, step: 0.5, init: 8, unit: "" },
  draw: (n) => {
    const exact = (k: number) => {
      const c = 10 ** -k;
      const h = (c + Math.sqrt(c * c + 4 * KW)) / 2;
      return -Math.log10(h);
    };
    const X = (k: number) => (k - 4) * 1.15;
    const Y = (p: number) => (p - 3) * 0.55;
    const els: El[] = [...axes(v(0, 0), X(10.6), Y(10.6), "n", "pH")];
    els.push(seg(v(0, Y(7)), v(X(10), Y(7)), { tone: "muted", dash: true, thin: true }), ...ytick(0, Y(7), "7"), ...ytick(0, Y(5), "5"), ...ytick(0, Y(9), "9"));
    els.push(seg(v(X(4), Y(4)), v(X(10), Y(10)), { tone: "b", dash: true, bold: true }));
    els.push(poly(curve(exact, 4, 10, 60, X, Y), { tone: "warn", open: true, bold: true, smooth: true }));
    for (const k of [6, 8, 10]) els.push(...xtick(X(k), 0, String(k)));
    els.push(ball(v(X(n), Y(exact(n))), 0.1, "warn"), ball(v(X(n), Y(n)), 0.08, "b"));
    els.push(txt(v(X(9.6), Y(9.6)), "−log c", "nw", { tone: "b", small: true, bold: true }), txt(v(X(10), Y(exact(10))), "gerçek", "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.6, Y(11.2), X(10.6) + 1.3, -0.7));
    const c = 10 ** -n;
    const h = (c + Math.sqrt(c * c + 4 * KW)) / 2;
    return {
      els,
      readout: [`c = ${sci(c)} M: [H₃O⁺] = ${sci(h, 4)} M → pH ≈ ${nf(-Math.log10(h), 4)} (yalnız −log c: ${nf(n, 1)})`, "Asit katkısı küçülse de su iyonları korunur; 7'ye yuvarlamak tam nötrlüğü kanıtlamaz."],
    };
  },
};

/* ---------- ayt-zayif-asit-baz-tampon ---------- */

const iceTable: FigureDef = {
  caption:
    "İleri ile 0,10 M CH₃COOH için başlangıç, değişim, denge tablosunu doldur (Ka = 1,8×10⁻⁵, su katkısı ihmal). Denge satırı Ka = x²/(C − x) verir; x² + Ka·x − Ka·C = 0 denkleminin pozitif kökü x ≈ 1,33×10⁻³ M. Kök 0 ile C arasında olmalı ve yerine konunca aynı Ka'yı vermelidir.",
  alt: "Üç sütunlu tablo: HA, H₃O⁺, A⁻. Satırlar başlangıç, değişim ve denge; adımlarla doluyor.",
  steps: ["Başlangıç", "Değişim", "Denge ve kök"],
  draw: (_v, step) => {
    const C = 0.1;
    const x = (2 * KA * C) / (KA + Math.sqrt(KA * KA + 4 * KA * C));
    const cols = ["HA", "H₃O⁺", "A⁻"];
    const rows: [string, string[]][] = [
      ["başlangıç", ["0,10", "0", "0"]],
      ["değişim", ["−x", "+x", "+x"]],
      ["denge", ["0,10 − x", "x", "x"]],
    ];
    const els: El[] = [];
    const cw = 1.9;
    const x0 = 2.2;
    for (let i = 0; i <= 4; i++) els.push(seg(v(0, 4 - i), v(x0 + 3 * cw, 4 - i), { tone: i === 1 ? "ink" : "muted", thin: i !== 1 }));
    cols.forEach((c, i) => els.push(txt(v(x0 + cw * (i + 0.5), 3.5), c, "c", { tone: "ink", small: true, bold: true })));
    rows.forEach(([name, cells], r) => {
      const y = 2.5 - r;
      els.push(txt(v(0.1, y), name, "e", { tone: "muted", small: true }));
      if (r <= step) cells.forEach((cell, i) => els.push(txt(v(x0 + cw * (i + 0.5), y), cell, "c", { tone: r === 2 ? "warn" : "ink", small: true, bold: r === 2 })));
    });
    els.push(...pad(-0.2, 4.3, x0 + 3 * cw + 0.2, -0.3));
    const lines: [string, string][] = [
      ["Yalnız HA eklendi: C = 0,10 M; ürünler sıfırdan başlar.", "Birim M (mol/L); hepsi aynı son hacimde."],
      ["İyonlaşma x M: HA x azalır, H₃O⁺ ve A⁻ x artar (katsayılar 1 : 1 : 1).", "Sudan gelen H₃O⁺ burada ihmal ediliyor; bu bir varsayımdır."],
      [`x = 2KaC ÷ [Ka + √(Ka² + 4KaC)] = ${sci(x, 3)} M → pH ≈ ${nf(-Math.log10(x), 2)}`, `Denetim: x² ÷ (C − x) = ${sci((x * x) / (C - x), 2)} = Ka · x/C = %${nf((x / C) * 100, 2)} (küçük x yaklaşımı burada uygun).`],
    ];
    return { els, readout: lines[step] };
  },
};

const ionPct: FigureDef = {
  caption:
    "Sürgüyle asetik asit çözeltisini seyrelt (Ka = 1,8×10⁻⁵). Analitik derişim C azaldıkça iyonlaşma yüzdesi (eğri) artar, serbest [H₃O⁺] ise azalır (pH yükselir). Biri oran, öteki hacim başına miktar olduğu için iki cümle çelişmez. Değerler x² + Ka·x − Ka·C = 0 denkleminin pozitif kökünden.",
  alt: "Yatay eksen seyreltme yönünde log C (−1'den −5'e), dikey eksen iyonlaşma yüzdesi; sağa doğru yükselen eğri ve sürgüyle kayan nokta.",
  param: { label: "C = 10^(−k) M, k", min: 1, max: 5, step: 0.5, init: 1, unit: "" },
  draw: (k) => {
    const xOf = (kk: number) => {
      const C = 10 ** -kk;
      return (2 * KA * C) / (KA + Math.sqrt(KA * KA + 4 * KA * C));
    };
    const pct = (kk: number) => (xOf(kk) / 10 ** -kk) * 100;
    const X = (kk: number) => (kk - 1) * 1.8;
    const Y = (p: number) => p * 0.04;
    const els: El[] = [...axes(v(0, 0), X(5.4), Y(92), "seyreltme: k", "iyonlaşma %")];
    els.push(poly(curve(pct, 1, 5, 80, X, Y), { tone: "c", open: true, bold: true, smooth: true }));
    for (const kk of [1, 2, 3, 4, 5]) els.push(...xtick(X(kk), 0, String(kk)));
    for (const p of [25, 50, 75]) els.push(...ytick(0, Y(p), String(p)));
    els.push(ball(v(X(k), Y(pct(k))), 0.11, "warn"));
    els.push(...pad(-0.8, Y(100), X(5.4) + 1.6, -0.7));
    const C = 10 ** -k;
    const x = xOf(k);
    return {
      els,
      readout: [`C = ${sci(C)} M: x = [H₃O⁺] = ${sci(x, 3)} M · pH ≈ ${nf(-Math.log10(x), 2)} · iyonlaşma %${nf((x / C) * 100, 1)}`, "Çok seyreltikte su katkısı da önem kazanır; √(KaC) kestirimi bu bölgede kullanılmaz."],
    };
  },
};

const hh: FigureDef = {
  caption:
    "Sürgüyle tampondaki [A⁻]/[HA] oranını değiştir (CH₃COOH/CH₃COO⁻, pKa = −log 1,8×10⁻⁵ ≈ 4,74). pH = pKa + log([A⁻]/[HA]): oran 1 iken pH = pKa; oran 10 iken bir birim yüksek, 0,1 iken bir birim düşük. Üstteki çubuk iki türün paylarını gösterir.",
  alt: "Üstte HA ve A⁻ paylarına bölünmüş yatay çubuk; altta yatay eksen log oran (−1'den 1'e), dikey eksen pH olan düz doğru ve sürgüyle kayan nokta.",
  param: { label: "log([A⁻]/[HA])", min: -1, max: 1, step: 0.1, init: 0, unit: "" },
  draw: (L) => {
    const pKa = -Math.log10(KA);
    const r = 10 ** L;
    const fA = r / (1 + r);
    const X = (l: number) => 2.6 + l * 2.4;
    const Y = (p: number) => (p - 3.3) * 1.3;
    const els: El[] = [vec(v(X(-1.15), 0), v(X(1.2), 0), { tone: "ink", thin: true }), vec(v(X(-1.15), 0), v(X(-1.15), Y(6.0)), { tone: "ink", thin: true })];
    els.push(txt(v(X(1.2), 0), "log oran", "se", { tone: "ink", small: true }), txt(v(X(-1.15), Y(6.0)), "pH", "n", { tone: "ink", small: true }));
    els.push(seg(v(X(-1), Y(pKa - 1)), v(X(1), Y(pKa + 1)), { tone: "c", bold: true }));
    for (const l of [-1, 0, 1]) els.push(...xtick(X(l), 0, l === 0 ? "0 (1 : 1)" : l < 0 ? "−1" : "1"));
    els.push(...ytick(X(-1.15), Y(pKa), "4,74"), seg(v(X(-1.15), Y(pKa)), v(X(0), Y(pKa)), { tone: "muted", dash: true, thin: true }));
    els.push(ball(v(X(L), Y(pKa + L)), 0.11, "warn"));
    const bw = 4.8;
    const by = Y(6.7);
    els.push(box(X(-1), by, X(-1) + bw * (1 - fA), by + 0.45, "a"), box(X(-1) + bw * (1 - fA), by, X(-1) + bw, by + 0.45, "b"));
    els.push(txt(v(X(-1), by + 0.22), "HA", "w", { tone: "a", small: true, bold: true }), txt(v(X(-1) + bw, by + 0.22), "A⁻", "e", { tone: "b", small: true, bold: true }));
    els.push(...pad(-0.4, by + 0.9, X(1.2) + 1.2, -0.7));
    return {
      els,
      readout: [`[A⁻]/[HA] = ${nf(r, 2)} → pH = 4,74 + (${nf(L, 1)}) = ${nf(pKa + L, 2)}`, "Mol oranı kullanılabilir çünkü iki tür aynı son hacimdedir."],
    };
  },
};

/* ---------- ayt-notrallesme ---------- */

const limiting: FigureDef = {
  caption:
    "İleri ile iki stoku karşılaştır: 0,0100 mol H⁺ ve 0,0120 mol OH⁻. Küçük stok tüketimin sınırını belirler: 0,0100 mol su oluşur, 0,00200 mol OH⁻ artar. Son OH⁻ derişimi bu fark son çözelti hacmine bölünerek bulunur.",
  alt: "İki yatay çubuk: H⁺ (kısa) ve OH⁻ (uzun). İkinci adımda iki çubuğun ortak kısmı su olarak taranır; üçüncü adımda OH⁻'nin artan ucu vurgulanır.",
  steps: ["İki stok", "Tüketilen: min(n_H, n_OH)", "Artan tür"],
  draw: (_v, step) => {
    const S = 500;
    const els: El[] = [];
    const nH = 0.01;
    const nOH = 0.012;
    els.push(txt(v(-0.1, 2.4), "H⁺", "w", { tone: "a", small: true, bold: true }), txt(v(-0.1, 1.2), "OH⁻", "w", { tone: "b", small: true, bold: true }));
    els.push(box(0, 2.15, nH * S, 2.65, step >= 1 ? "muted" : "a"), box(0, 0.95, nOH * S, 1.45, step >= 1 ? "muted" : "b"));
    if (step === 0) els.push(txt(v(nH * S + 0.1, 2.4), "0,0100 mol", "e", { tone: "a", small: true }), txt(v(nOH * S + 0.1, 1.2), "0,0120 mol", "e", { tone: "b", small: true }));
    if (step >= 1) {
      els.push(seg(v(nH * S, 0.7), v(nH * S, 2.9), { tone: "ink", dash: true }), txt(v(nH * S / 2, 0.95), "su: 0,0100 mol", "s", { tone: "ink", small: true, bold: true }));
    }
    if (step >= 2) els.push(box(nH * S, 0.95, nOH * S, 1.45, "warn"), txt(v(nOH * S + 0.1, 1.2), "artan 0,00200 mol", "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.9, 3.2, 9.2, 0.2));
    const rows: [string, string][] = [
      ["n(H⁺) = 0,0100 mol · n(OH⁻) = 0,0120 mol: iki ayrı stok.", "H⁺ + OH⁻ → H₂O (1 : 1)."],
      ["Tüketilen = min(0,0100; 0,0120) = 0,0100 mol; o kadar su oluşur. H⁺ biter.", "Sınırlayıcı eşdeğer küçük olan stoktur."],
      ["Artan OH⁻ = 0,0120 − 0,0100 = 0,00200 mol. Çözelti bazik.", "Derişim için bu mol, toplam son hacme bölünür (ör. 0,160 L → 0,0125 M)."],
    ];
    return { els, readout: rows[step] };
  },
};

const finalVolume: FigureDef = {
  caption:
    "Sürgüyle 100 mL 0,100 M HCl'ye eklenen 0,200 M NaOH hacmini değiştir. Hacimler toplamsal kabul edilir. 60 mL'de 0,0120 mol OH⁻ eklenmiş olur: artan 0,00200 mol OH⁻, 0,160 L'ye bölünür, [OH⁻] = 0,0125 M, pH ≈ 12,10. Eşdeğerlikte (50 mL) H₃O⁺ ve OH⁻ sıfır olmaz, ikisi de 10⁻⁷ M'dir.",
  alt: "pH–eklenen baz hacmi grafiği: düşük pH'tan başlayan, 50 mL'de dikleşip yüksek pH'a çıkan eğri; 60 mL'de kesikli çizgi ve sürgüyle kayan nokta.",
  param: { label: "Eklenen NaOH", min: 0, max: 100, step: 5, init: 60, unit: " mL" },
  draw: (vb) => {
    const pHat = (mL: number) => {
      const Vt = (100 + mL) / 1000;
      return solvePH(0.01 / Vt, (0.0002 * mL) / Vt, Infinity);
    };
    const X = (mL: number) => mL * 0.075;
    const Y = (p: number) => p * 0.3;
    const els: El[] = [...axes(v(0, 0), X(108), Y(14.6), "V NaOH (mL)", "pH")];
    els.push(poly(curve(pHat, 0, 100, 200, X, Y), { tone: "c", open: true, bold: true }));
    els.push(seg(v(X(50), 0), v(X(50), Y(14)), { tone: "muted", dash: true, thin: true }), seg(v(0, Y(7)), v(X(100), Y(7)), { tone: "muted", dash: true, thin: true }));
    for (const m of [50, 100]) els.push(...xtick(X(m), 0, String(m)));
    for (const p of [1, 7, 13]) els.push(...ytick(0, Y(p), String(p)));
    els.push(ball(v(X(vb), Y(pHat(vb))), 0.11, "warn"));
    els.push(...pad(-0.7, Y(15.4), X(108) + 2.0, -0.7));
    const nb = 0.0002 * vb;
    const Vt = (100 + vb) / 1000;
    const p = pHat(vb);
    return {
      els,
      readout: [
        `${vb} mL: n(OH⁻) = 0,200 · ${nf(vb / 1000, 3)} L = ${nf(nb, 4)} mol · son hacim ${nf(Vt, 3)} L · pH ≈ ${nf(p, 2)}`,
        vb < 50 ? `Artan H⁺ = ${nf(0.01 - nb, 4)} mol ÷ ${nf(Vt, 3)} L = ${nf((0.01 - nb) / Vt, 4)} M` : vb === 50 ? "Eşdeğerlik: [H₃O⁺] = [OH⁻] = 1,0×10⁻⁷ M (Kw korunur)." : `Artan OH⁻ = ${nf(nb - 0.01, 4)} mol ÷ ${nf(Vt, 3)} L = ${nf((nb - 0.01) / Vt, 4)} M`,
      ],
    };
  },
};

const weakVsStrong: FigureDef = {
  caption:
    "Sürgüyle eklenen NaOH hacmini değiştir: 25 mL 0,10 M asit, 0,10 M NaOH ile. Mavi eğri kuvvetli asit (HCl), kırmızı eğri zayıf asit (CH₃COOH, Ka = 1,8×10⁻⁵). Eşdeğerlik ikisinde de 25 mL'dedir; ama zayıf asitte son ortamda CH₃COO⁻ kalır ve hidroliz yapar: eşdeğerlik pH'ı 7'den büyüktür. Yarı eşdeğerlikte (12,5 mL) pH = pKa.",
  alt: "pH–hacim grafiği, iki eğri: kuvvetli asit eğrisi düşük pH'tan başlayıp 25 mL'de 7'den geçerek dik yükseliyor; zayıf asit eğrisi daha yüksek pH'tan başlıyor, yarı yolda yatıklaşıyor ve 25 mL'de 7'nin üstünde sıçrıyor. 25 mL'de kesikli dikey çizgi.",
  param: { label: "Eklenen NaOH", min: 0, max: 50, step: 0.5, init: 12.5, unit: " mL" },
  draw: (vb) => {
    const at = (mL: number, ka: number) => {
      const Vt = (25 + mL) / 1000;
      return solvePH(0.0025 / Vt, (0.0001 * mL) / Vt, ka);
    };
    const X = (mL: number) => mL * 0.15;
    const Y = (p: number) => p * 0.3;
    const els: El[] = [...axes(v(0, 0), X(54), Y(14.6), "V NaOH (mL)", "pH")];
    els.push(poly(curve((m) => at(m, Infinity), 0, 50, 200, X, Y), { tone: "b", open: true, bold: true }));
    els.push(poly(curve((m) => at(m, KA), 0, 50, 200, X, Y), { tone: "warn", open: true, bold: true }));
    els.push(seg(v(X(25), 0), v(X(25), Y(14)), { tone: "muted", dash: true, thin: true }), seg(v(0, Y(7)), v(X(50), Y(7)), { tone: "muted", dash: true, thin: true }));
    for (const m of [12.5, 25, 50]) els.push(...xtick(X(m), 0, nf(m, 1)));
    for (const p of [1, 7, 13]) els.push(...ytick(0, Y(p), String(p)));
    els.push(txt(v(X(15), Y(at(15, Infinity))), "HCl", "se", { tone: "b", small: true, bold: true }), txt(v(X(5), Y(at(5, KA))), "CH₃COOH", "nw", { tone: "warn", small: true, bold: true }));
    const tones: [number, Tone][] = [
      [Infinity, "b"],
      [KA, "warn"],
    ];
    for (const [ka, tone] of tones) els.push(ball(v(X(vb), Y(at(vb, ka))), 0.1, tone));
    els.push(...pad(-0.7, Y(15.4), X(54) + 2.0, -0.7));
    return {
      els,
      readout: [`${nf(vb, 1)} mL: pH(HCl) ≈ ${nf(at(vb, Infinity), 2)} · pH(CH₃COOH) ≈ ${nf(at(vb, KA), 2)}`, "Nötralleşme, eşdeğerlik ve nötr pH üç ayrı bilgidir; zayıf asitte eşdeğerlik pH'ı ≈ 8,7."],
    };
  },
};

export const chemistryFigures059AcidBase: Record<string, Record<string, FigureDef>> = {
  "ayt-sulu-asit-baz-denge": {
    "pH küçük sayıları logaritmayla anlatır": phScale,
    "pH ile pOH aynı dengeyi paylaşır": phPoh,
    "Nötr olmak her sıcaklıkta pH yedi değildir": neutralT,
    "Çok seyreltikte su katkısını koru": dilute,
  },
  "ayt-zayif-asit-baz-tampon": {
    "Başlangıç, değişim ve denge tablosu": iceTable,
    "İyonlaşma yüzdesi ve seyreltme": ionPct,
    "Orandan pH'a: Henderson–Hasselbalch": hh,
  },
  "ayt-notrallesme": {
    "Sınırlayıcı eşdeğer ve artan tür": limiting,
    "Son hacim ve serbest iyon": finalVolume,
    "Zayıf türde eşdeğerlik neden farklıdır?": weakVsStrong,
  },
};
