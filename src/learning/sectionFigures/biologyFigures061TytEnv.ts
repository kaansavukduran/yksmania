import { seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { pad, rect } from "./biologyFigures059Kit";
import { stepsFig } from "./historyFigures059Kit";
import { nf } from "./physicsFigures058Kit";

/*
 * TYT Biyoloji · Doğal kaynaklar ve sürdürülebilirlik; su, asit–baz ve tuz
 * (Forge061). Sayılar bölüm metinlerindendir: başlangıç stoku 100, yıllık
 * yenilenme 20, kullanım 30 temsili birim (ilk yıl 90, beşinci yıl 50;
 * kullanım 20'de stok 100'de kalır); 25 °C ideal sulu ortamda pH 7 nötr,
 * bir pH birimi on kat derişim farkı, [H⁺] = 10⁻⁴ mol/L ise pH 4.
 */

/* ---------------- Doğal kaynaklar ---------------- */

const START = 100;
const RENEW = 20;
export const stockAfter = (years: number, use: number) => Math.max(0, START + years * (RENEW - use));
const budget: FigureDef = {
  caption:
    "Basit kaynak bütçesi: gelecek stok = önceki stok + yenilenme − kullanım. Başlangıç 100, yıllık yenilenme 20 temsili birim; kullanım 30 ise stok her yıl 10 azalır (ilk yıl 90, beşinci yıl 50), kullanım 20'ye düşerse 100'de kalır. Bu bir çalışma modelidir; gerçek doğada yenilenme her stokta sabit değildir.",
  alt: "Yatay eksende 0'dan 5'e yıllar, her yıl için düşey stok çubuğu ve üstünde değeri. 100 düzeyinde kesik başlangıç çizgisi. Sürgü yıllık kullanımı 10 ile 40 arasında değiştirir.",
  param: { label: "Yıllık kullanım (temsili birim)", min: 10, max: 40, step: 5, init: 30, plain: true },
  draw: (uRaw) => {
    const u = Math.round(uRaw);
    const k = 0.028;
    const els: El[] = [seg(v(0, 0), v(11.2, 0), { tone: "muted" }), seg(v(0, START * k), v(11.2, START * k), { tone: "muted", dash: true, thin: true }), txt(v(11.3, START * k), "100", "e", { small: true, tone: "muted" })];
    for (let y = 0; y <= 5; y++) {
      const s = stockAfter(y, u);
      const x = 0.5 + y * 1.8;
      const tone: Tone = s < START ? "warn" : s > START ? "c" : "b";
      if (s > 0) els.push(rect(x, 0, x + 1.0, s * k, { tone, fill: tone, thin: true }));
      els.push(txt(v(x + 0.5, s * k + 0.1), String(s), "n", { small: true, bold: true }), txt(v(x + 0.5, -0.15), `${y}. yıl`, "s", { small: true, tone: "muted" }));
    }
    els.push(...pad(v(-0.2, 150 * k + 0.7), v(12.2, -0.9)));
    const d = RENEW - u;
    return {
      els,
      readout: [`Her yıl: ${RENEW} − ${u} = ${d > 0 ? "+" : ""}${d}; 1. yıl ${stockAfter(1, u)}, 5. yıl ${stockAfter(5, u)}.`, "Aritmetik eşitlik tek başına güvenli kullanım izni değildir: eşik, mevsimsellik ve diğer canlıların gereksinimleri vardır."],
    };
  },
};

const LEVELS: { s: string; d: string; tone: Tone }[] = [
  { s: "ekosistem çeşitliliği", d: "farklı habitat ve ekolojik sistemler", tone: "c" },
  { s: "tür çeşitliliği", d: "bir alandaki farklı türler ve dağılımları", tone: "b" },
  { s: "genetik çeşitlilik", d: "aynı türün bireyleri arasındaki kalıtsal fark", tone: "a" },
];
const diversity: FigureDef = {
  caption:
    "Çeşitliliğin üç düzeyi farklı şeyleri korur: ekosistem çeşitliliği farklı habitatları, tür çeşitliliği bir alandaki farklı türleri, genetik çeşitlilik aynı türün bireyleri arasındaki kalıtsal farkı ele alır. Bir tarladaki çok sayıda özdeş klon yüksek genetik çeşitlilik değildir. İç içe kutular kapsamayı gösterir, ölçekli değil.",
  alt: "Üç iç içe kutu: dışta ekosistem çeşitliliği (farklı habitat ve ekolojik sistemler), ortada tür çeşitliliği (bir alandaki farklı türler), içte genetik çeşitlilik (aynı türün bireyleri arasındaki kalıtsal fark). Seçilen düzey vurgulanır.",
  picks: LEVELS.map((l) => ({ label: l.s, title: l.s, detail: [`${l.s}: ${l.d}.`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    LEVELS.forEach((l, i) => {
      const on = pick === i;
      const y1 = 5.4 - i * 1.0;
      els.push(rect(i * 0.8, i * 0.3, 12 - i * 0.8, y1, { tone: on ? "a" : l.tone, fill: on ? "a" : undefined, thin: !on, bold: on }));
      els.push(txt(v(6, y1 - 0.45), l.s, "c", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(6, 1.6), "aynı türün bireyleri", "c", { small: true, tone: "muted" }));
    els.push(...pad(v(-0.1, 5.6), v(12.1, -0.1)));
    const sel = pick >= 0 ? LEVELS[pick] : undefined;
    return { els, readout: [sel ? `${sel.s}: ${sel.d}.` : "Bir düzeyin adına tıkla ya da aşağıdan seç.", "Tek tür ve aynı yaşta ağaç dikmek doğal ormanın komünitesini otomatik geri getirmez."] };
  },
};

const reduce = stepsFig({
  items: [
    { s: "Önce azalt", what: "Gereksiz tüketimi önlemek atık ortaya çıkmadan kaynak talebini azaltabilir; yemek israfını azaltmak arazi, enerji ve suyu da etkiler." },
    { s: "Ürün ömrünü uzat, onar", what: "Ürün ömrünü uzatmak ve onarım kaynak talebini azaltır." },
    { s: "Yeniden kullan", what: "Yeniden kullanım yeni ürün gereksinimini azaltır." },
    { s: "Geri dönüştür", what: "Uygun maddeler için değerlidir; toplama, ayırma ve işlemde enerji ve madde kayıpları vardır; %100 geri kazanım demek değildir.", tone: "b" },
  ],
  caption:
    "Sıra önemlidir: önce gereksiz tüketimi azalt, ürün ömrünü uzat ve onar, yeniden kullan, ardından uygun maddeleri geri dönüştür. Geri dönüşümde toplama, ayırma ve işlem kayıpları vardır; geri dönüştürülebilir olmak her yerde toplanmak veya yüzde 100 geri kazanılmak demek değildir.",
  alt: "Yukarıdan aşağıya dört kutu: Önce azalt; Ürün ömrünü uzat, onar; Yeniden kullan; Geri dönüştür. Adımlarla sırayla etkinleşir.",
  foot: "Tehlikeli pil ve elektronik atığı sıradan çöpten ayırmak farklı bir hedefi korur.",
  w: 7,
});

/* ---------------- Su, asit–baz, tuz ---------------- */

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number) => String(n).split("").map((c) => SUP[+c]).join("");
const phScale: FigureDef = {
  caption:
    "25 °C ideal sulu ortamda pH 7 nötr, altı asidik, üstü baziktir. pH ≈ −log₁₀[H⁺]: [H⁺] = 10⁻⁴ mol/L ise pH 4. Bir pH birimi on kat derişim farkıdır; iki pH sayısını bölmek derişim oranını vermez. Sürgüyle pH'yi değiştir; okuma satırı pH 7'ye göre katı aynı hesaptan verir.",
  alt: "0'dan 14'e yatay pH ekseni; 7'nin solu asidik, sağı bazik bölge. Seçilen pH'de bir işaret ve üstünde [H⁺] = 10 üssü eksi pH mol/L yazısı. Eksen boyunca her birim aralığın altında '×10'.",
  param: { label: "Karşılaştırılan pH", min: 1, max: 13, step: 1, init: 4, plain: true },
  draw: (pRaw) => {
    const p = Math.round(pRaw);
    const X = (x: number) => 0.4 + x * 0.8;
    const els: El[] = [
      rect(X(0), 0, X(7), 0.5, { tone: "warn", fill: "warn", thin: true }),
      rect(X(7), 0, X(14), 0.5, { tone: "b", fill: "b", thin: true }),
      txt(v(X(3.5), 0.25), "asidik", "c", { small: true, bold: true }),
      txt(v(X(10.5), 0.25), "bazik", "c", { small: true, bold: true }),
    ];
    for (let i = 0; i <= 14; i += 1) {
      els.push(seg(v(X(i), -0.05), v(X(i), -0.2), { tone: "muted", thin: true }));
      if (i % 2 === 0) els.push(txt(v(X(i), -0.25), String(i), "s", { small: true, tone: "muted" }));
    }
    els.push(seg(v(X(7), 0.5), v(X(7), 0.9), { tone: "ink" }), txt(v(X(7), 0.95), "nötr", "n", { small: true }));
    els.push(vec(v(X(p), 2.3), v(X(p), 0.6), { tone: "a", bold: true }), txt(v(X(p), 2.4), `pH ${p}: [H⁺] = 10⁻${sup(p)} mol/L`, "n", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-0.1, 3.2), v(12.1, -0.9)));
    const d = 7 - p;
    const rel = d === 0 ? "pH 7 ile aynı [H⁺]." : d > 0 ? `pH 7'ye göre [H⁺] 10${sup(d)} = ${nf(10 ** d, 0)} kat fazla.` : `pH 7'ye göre [H⁺] 10${sup(-d)} = ${nf(10 ** -d, 0)} kat az.`;
    return { els, readout: [rel, "pH derişimle ilgilidir; toplam H⁺ miktarı için hacim de gerekir (n = c·V)."] };
  },
};

export const biologyFigures061TytEnv: Record<string, Record<string, FigureDef>> = {
  "dogal-kaynaklar-surdurulebilirlik": {
    "Kaynak bütçesini giriş ve çıkışla kur": budget,
    "Çeşitliliğin üç düzeyi farklı şeyleri korur": diversity,
    "Önce azalt, sonra yeniden kullan ve geri dönüştür": reduce,
  },
  "su-asit-baz-tuz": {
    "pH ölçeği eşit miktarlı bir cetvel değildir": phScale,
  },
};
