import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, curve, pad, rect, vmark } from "./biologyFigures059Kit";
import { chain, table } from "./biologyFigures059TytKit";

/*
 * TYT Biyoloji · Hücre zarında madde alışverişi, enzimler ve virüsler
 * (Forge059). Sayılar bölüm metinlerindedir: su modelinde içe sürücü etki
 * = iç çözünen − dış çözünen − iç basınç farkı (iç 3, dış 1; basınç 2'de
 * denge); rekabetçi model v = 2ES / [2(1 + I) + S], üst sınır 2E. Difüzyon
 * bölmelerindeki tanecik sayıları oyuncak modeldir (toplam korunur, bir adım
 * gerçek saniye değildir). Enerji yolu, pH ve doyma eğrileri nitel
 * biçimlerdir, ölçekli değildir.
 */

/* ---------------- Hücre zarı ---------------- */

/** Tanecikleri bir kutuya düzenli ama hafif kaydırılmış biçimde serpiştirir. */
function dots(n: number, x0: number, y0: number, x1: number, y1: number, tone: Tone, r = 0.13): El[] {
  const cols = 3;
  const els: El[] = [];
  for (let i = 0; i < n; i++) {
    const cx = x0 + ((i % cols) + 0.5 + (Math.floor(i / cols) % 2 ? 0.25 : -0.1)) * ((x1 - x0) / cols);
    const cy = y1 - (Math.floor(i / cols) + 0.6) * 0.55;
    if (cy > y0) els.push(circle(v(cx, cy), r, { tone, fill: tone }));
  }
  return els;
}

const STEPS_D: [number, number][] = [[8, 2], [6, 4], [5, 5]];
const diffusion: FigureDef = {
  caption:
    "Oyuncak model: eşit hacimli iki bölmede 10 tanecik. Tanecikler iki yönde de geçer; net akış çok derişikten az derişiğe olur ve toplam korunur (8 | 2 → 6 | 4 → 5 | 5). Eşit derişimde hareket durmaz, iki yöndeki geçişler eşitlenir; net geçiş sıfırdır. Bir adım gerçek saniye değildir.",
  alt: "Ortasında geçirgen zar çizgisi olan bir kap; sol bölmede çok, sağ bölmede az tanecik. Adımlarda sol bölmedeki sayı azalıp sağdaki artıyor; zarın üstünde iki yönlü ince oklar ve net akış oku, son adımda net ok yok.",
  steps: ["Başlangıç", "Ara", "Denge"],
  draw: (_v, step) => {
    const [l, r] = STEPS_D[step];
    const els: El[] = [rect(0, 0, 9, 3.4, { tone: "ink", thin: true }), seg(v(4.5, 0), v(4.5, 3.4), { tone: "b", dash: true })];
    els.push(...dots(l, 0.4, 0.1, 4.1, 3.3, "c"), ...dots(r, 4.9, 0.1, 8.6, 3.3, "c"));
    els.push(txt(v(2.25, -0.15), `sol ${l}`, "s", { small: true, bold: true }), txt(v(6.75, -0.15), `sağ ${r}`, "s", { small: true, bold: true }));
    els.push(vec(v(3.9, 4.0), v(5.1, 4.0), { thin: true, tone: "muted" }), vec(v(5.1, 4.45), v(3.9, 4.45), { thin: true, tone: "muted" }));
    if (l > r) els.push(vec(v(3.4, 5.1), v(5.6, 5.1), { bold: true, tone: "a" }), txt(v(5.8, 5.1), "net akış", "e", { small: true, bold: true, tone: "a" }));
    else els.push(txt(v(5.8, 4.25), "net geçiş 0", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(3.7, 4.25), "iki yönde geçiş", "w", { small: true, tone: "muted" }));
    els.push(...pad(v(-0.2, 5.6), v(10.8, -0.9)));
    return { els, readout: [`Sol ${l}, sağ ${r}; toplam ${l + r} korunur.`, l > r ? "İki yöndeki geçişlerin farkı net akışı verir." : "Eşit derişimde moleküller durmaz; net geçiş sıfırdır."] };
  },
};

const saturation: FigureDef = {
  caption:
    "Nitel karşılaştırma (ölçekli değil): basit difüzyonda net geçiş hızı derişim farkıyla artmaya devam eder; kolaylaştırılmış difüzyonda taşıyıcı sayısı sınırlı olduğundan hız bir üst değere yaklaşır. İkisi de pasiftir; yön gradyan boyuncadır, ATP şart değildir.",
  alt: "Yatayda derişim farkı, düşeyde geçiş hızı. Düz artan bir çizgi basit difüzyonu, önce hızla artıp yatay kesik çizgiye yaklaşan eğri kolaylaştırılmış difüzyonu gösteriyor.",
  draw: () => {
    const els: El[] = [
      ...axes(8, 5, "derişim farkı", "geçiş hızı"),
      curve((x) => 0.5 * x, 0, 8, 2, { tone: "b", bold: true }),
      curve((x) => (3.6 * x) / (1.4 + x), 0, 8, 50, { tone: "a", bold: true }),
      seg(v(0, 3.6), v(8, 3.6), { thin: true, dash: true, tone: "muted" }),
      txt(v(0.2, 3.75), "taşıyıcı sınırı", "ne", { small: true, tone: "muted" }),
      txt(v(8.15, 4.0), "basit difüzyon", "e", { small: true, bold: true, tone: "b" }),
      txt(v(4.5, 2.5), "kolaylaştırılmış", "s", { small: true, bold: true, tone: "a" }),
      ...pad(v(-0.6, 5.4), v(11.6, -0.8)),
    ];
    return { els, readout: ["Protein kullanılması aktif taşıma demek değildir.", "Derişimi artırmak her koşulda aynı oranda hız artışı vermez."] };
  },
};

function membrane(y0: number, y1: number, x0: number, x1: number): El[] {
  return [rect(x0, y0, x1, y1, { tone: "warn", fill: "warn", thin: true }), seg(v(x0, (y0 + y1) / 2), v(x1, (y0 + y1) / 2), { thin: true, dash: true, tone: "warn" })];
}
const routes: FigureDef = {
  caption:
    "Üç yol yan yana (şematik, ölçekli değil). O₂ gibi küçük apolar molekül lipit tabakadan geçer (basit difüzyon). Glikoz uygun taşıyıcı ya da kanal proteinle gradyan yönünde geçer (kolaylaştırılmış difüzyon). Na⁺/K⁺ pompası ATP kullanarak Na⁺'u gradyanına karşı dışarı taşır (aktif taşıma; K⁺'un içeri taşınması ve 3:2 sayımı çizilmedi).",
  alt: "Yatay bir zar bandı; üstü hücre dışı, altı hücre içi. Solda O₂ taneciklerinin çok olduğu dıştan içe zarın içinden geçen ok; ortada zarı boydan boya kesen bir protein kanalından içe inen glikoz oku; sağda bir pompa proteini, ATP girişi ve içteki az Na⁺'tan dıştaki çok Na⁺'a çıkan ok.",
  draw: () => {
    const els: El[] = [...membrane(2.2, 3.0, 0, 11.4)];
    els.push(txt(v(-0.1, 4.6), "dış", "e", { small: true, tone: "muted" }), txt(v(-0.1, 0.6), "iç", "e", { small: true, tone: "muted" }));
    const cols: [number, string, Tone, boolean][] = [[1.9, "O₂", "b", true], [5.7, "glikoz", "c", true], [9.5, "Na⁺", "a", false]];
    for (const [x, , tone, down] of cols) {
      // dış: 6 tanecik, iç: 2 tanecik (gradyan dıştan içe)
      els.push(...dots(6, x - 1.1, 3.2, x + 1.1, 4.95, tone, 0.12), ...dots(2, x - 1.1, 0.3, x + 1.1, 2.0, tone, 0.12));
      if (down) els.push(vec(v(x + 0.15, 4.0), v(x + 0.15, 1.2), { bold: true, tone }));
    }
    els.push(rect(5.3, 1.9, 6.1, 3.3, { tone: "c", fill: "c" }), seg(v(5.7, 1.9), v(5.7, 3.3), { thin: true, tone: "c" }));
    els.push(rect(9.0, 1.9, 10.0, 3.3, { tone: "a", fill: "a" }), vec(v(9.5, 0.9), v(9.5, 4.2), { bold: true, tone: "a" }));
    els.push(txt(v(10.2, 1.2), "ATP", "e", { small: true, bold: true }), vec(v(10.9, 1.2), v(10.1, 1.95), { thin: true }));
    els.push(txt(v(1.9, -0.3), "basit difüzyon", "s", { small: true, bold: true, tone: "b" }), txt(v(5.7, -0.3), "kolaylaştırılmış", "s", { small: true, bold: true, tone: "c" }), txt(v(9.5, -0.3), "aktif taşıma", "s", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(1.9, 5.3), "O₂", "n", { small: true, bold: true }), txt(v(5.7, 5.3), "glikoz", "n", { small: true, bold: true }), txt(v(9.5, 5.3), "Na⁺", "n", { small: true, bold: true }));
    els.push(...pad(v(-0.2, 6.0), v(11.6, -1.0)));
    return { els, readout: ["Tanecik sayıları yalnız derişim yönünü gösterir: dışta çok, içte az.", "Pompa yoksa ATP'yi açmak yetmez; ATP yoksa pompa bu yolu çalıştıramaz."] };
  },
};

type Cond = { name: string; animalR: number; inner: number; water: -1 | 0 | 1; note: [string, string] };
const CONDS: Cond[] = [
  { name: "Hipertonik dış ortam", animalR: 0.85, inner: 0.62, water: -1, note: ["büzülme", "plazmoliz"] },
  { name: "İzotonik dış ortam", animalR: 1.1, inner: 0.86, water: 0, note: ["net değişim ≈ 0", "net değişim ≈ 0"] },
  { name: "Hipotonik dış ortam", animalR: 1.38, inner: 1.0, water: 1, note: ["şişme, lizis olabilir", "turgor, patlamaz"] },
];
const tonicity: FigureDef = {
  caption:
    "Aynı su yönü, iki farklı hücre sonucu (şematik). Hipertonik ortamda hayvan hücresi büzülür, bitki hücresinde protoplast çeperden uzaklaşır (plazmoliz); çeper küçülmez. Hipotonik ortamda hayvan hücresi şişer ve parçalanabilir (lizis, alyuvarda hemoliz); sağlam çeper karşı basınç kurar, bitki hücresi turgor kazanır.",
  alt: "Solda bir hayvan hücresi dairesi, sağda sabit dikdörtgen çeperli bir bitki hücresi ve içinde zar. Adımlara göre daire küçülüyor ya da büyüyor; bitki hücresinde iç zar çeperden ayrılıyor ya da çepere yaslanıyor. Su okları dışarı ya da içeri.",
  steps: CONDS.map((c) => c.name),
  draw: (_v, step) => {
    const c = CONDS[step];
    const els: El[] = [];
    const A = v(2.4, 2.2);
    els.push(circle(A, c.animalR, { tone: "warn", fill: "warn", bold: step === 2, dash: step === 2 }));
    const P = v(8.2, 2.2);
    els.push(rect(P[0] - 1.45, P[1] - 1.45, P[0] + 1.45, P[1] + 1.45, { tone: "c", bold: true }));
    const k = 1.32 * c.inner;
    els.push(rect(P[0] - k, P[1] - k, P[0] + k, P[1] + k, { tone: "c", fill: "c", thin: true }));
    const arrow = (o: V, out: boolean, r: number): El[] =>
      [0, 180].map((a) => {
        const d = v(Math.cos((a * Math.PI) / 180), Math.sin((a * Math.PI) / 180));
        const p = v(o[0] + d[0] * (r + 0.25), o[1]);
        const q = v(o[0] + d[0] * (r + 0.95), o[1]);
        return vec(out ? p : q, out ? q : p, { tone: "b", bold: true });
      });
    if (c.water) els.push(...arrow(A, c.water < 0, Math.max(c.animalR, 1.1)), ...arrow(P, c.water < 0, 1.45));
    els.push(txt(v(A[0], -0.1), "hayvan hücresi", "s", { small: true, bold: true }), txt(v(P[0], -0.1), "bitki hücresi", "s", { small: true, bold: true }));
    els.push(txt(v(A[0], 4.3), c.note[0], "n", { small: true, bold: true, tone: "a" }), txt(v(P[0], 4.3), c.note[1], "n", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-0.3, 5.1), v(10.8, -0.9)));
    return { els, readout: [`${c.name}: su ${c.water < 0 ? "hücreden çıkar" : c.water > 0 ? "hücreye girer" : "iki yönde eşit geçer"}.`, "Dış ortam hücreye göre adlandırılır; çeper çizimi sabit kalır, iç zar yer değiştirir."] };
  },
};

const pressure: FigureDef = {
  caption:
    "Bölümdeki normalize su modeli: içe sürücü etki = iç çözünen − dış çözünen − iç basınç farkı. İç 3, dış 1 sabit; sürgü iç basıncı değiştirir. Basınç 0'da içe eğilim 2, basınç 2'de denge, daha büyük basınçta yön tersine döner. Değerler aynı ölçeğe getirilmiş öğretim birimleridir, Pa veya mol/L değildir.",
  alt: "Üç yatay çubuk: iç çözünen etkisi 3, dış çözünen etkisi 1, iç basınç; altta net etki çubuğu ve yönü. Sürgüyle basınç 0'dan 4'e değişince net çubuk kısalıp sıfırdan geçerek ters yöne uzuyor.",
  param: { label: "İç basınç farkı", min: 0, max: 4, step: 0.5, init: 0 },
  draw: (p) => {
    const net = 3 - 1 - p;
    const K = 1.1;
    const x0 = 5.4;
    const els: El[] = [seg(v(x0, -0.4), v(x0, 4.4), { thin: true, tone: "muted" })];
    const rows: [string, number, Tone][] = [["iç çözünen (içe)", 3, "c"], ["dış çözünen", -1, "b"], ["iç basınç", -p, "warn"], ["net içe etki", net, "a"]];
    rows.forEach(([name, val, tone], i) => {
      const y = 3.6 - i * 1.15;
      els.push(txt(v(0.1, y), name, "e", { small: true, bold: i === 3 }));
      if (val !== 0) els.push(rect(Math.min(x0, x0 + val * K), y - 0.28, Math.max(x0, x0 + val * K), y + 0.28, { tone, fill: tone, thin: i < 3, bold: i === 3 }));
      els.push(txt(v(val >= 0 ? x0 + val * K + 0.15 : x0 + 0.15, y), fmt(val, 1), "e", { small: true, bold: true }));
    });
    els.push(txt(v(x0 - 1.0, 4.5), "dışa ←", "c", { small: true, tone: "muted" }), txt(v(x0 + 1.0, 4.5), "→ içe", "c", { small: true, tone: "muted" }));
    els.push(...pad(v(0, 5.0), v(10.4, -0.6)));
    return { els, readout: [`3 − 1 − ${fmt(p, 1)} = ${fmt(net, 1)}: ${net > 0 ? "su içe eğilimli" : net === 0 ? "denge, net su geçişi yok" : "yön ters, su dışa eğilimli"}.`, "Su her koşulda yalnız çözüneni çok tarafa gider kuralı karşı basıncı yok sayar."] };
  },
};

/* ---------------- Enzimler ---------------- */

const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const energyPath = (h: number) => (x: number) => 2.2 - 1.2 * smooth((x - 1) / 5) + h * Math.exp(-(((x - 3.5) / 0.9) ** 2));
const peakOf = (f: (x: number) => number) => {
  let best = [0, -1];
  for (let x = 0; x <= 7; x += 0.01) if (f(x) > best[1]) best = [x, f(x)];
  return best as [number, number];
};
const energy: FigureDef = {
  caption:
    "Enerji yolu (nitel, ölçekli değil). Başlangıçtan tepeye fark aktivasyon enerjisi, başlangıçtan ürüne fark net enerji değişimidir. Enzimli yolun tepesi daha alçaktır; başlangıç ve ürün düzeyleri iki yolda da aynı kalır. Yatay eksen tepkimenin ilerleyişidir, zaman değil.",
  alt: "Yatayda tepkime ilerleyişi, düşeyde enerji. Soldaki başlangıç düzeyinden yükselen, bir tepe yapıp daha alçak ürün düzeyine inen eğri. İkinci adımda aynı uçlara sahip, tepesi daha alçak enzimli yol eklenir ve iki aktivasyon enerjisi oku karşılaştırılır.",
  steps: ["Enzimsiz yol", "Enzimli yol eklenince"],
  draw: (_v, step) => {
    const f0 = energyPath(3.0);
    const f1 = energyPath(1.4);
    const p0 = peakOf(f0);
    const p1 = peakOf(f1);
    const els: El[] = [...axes(7.4, 5.8, "tepkime ilerleyişi", "enerji"), curve(f0, 0, 7, 70, { tone: "warn", bold: true })];
    els.push(seg(v(0, 2.2), v(7, 2.2), { thin: true, dash: true, tone: "muted" }), seg(v(4.2, 1.0), v(7, 1.0), { thin: true, dash: true, tone: "muted" }));
    els.push(vec(v(0.6, 2.2), v(0.6, p0[1]), { tone: "warn", thin: true }), txt(v(0.75, (2.2 + p0[1]) / 2 + 0.6), "Ea enzimsiz", "e", { small: true, bold: true, tone: "warn" }));
    els.push(vec(v(6.5, 2.2), v(6.5, 1.0), { tone: "b", thin: true }), txt(v(6.65, 1.6), "net değişim", "e", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(0.2, 2.35), "başlangıç", "ne", { small: true, tone: "muted" }), txt(v(7.0, 0.85), "ürün", "se", { small: true, tone: "muted" }));
    if (step) {
      els.push(curve(f1, 0, 7, 70, { tone: "c", bold: true }));
      els.push(vec(v(p1[0], 2.2), v(p1[0], p1[1]), { tone: "c", thin: true }), txt(v(p1[0] + 0.15, 2.6), "Ea enzimli", "e", { small: true, bold: true, tone: "c" }));
    }
    els.push(...pad(v(-0.6, 6.2), v(9.4, -0.8)));
    return { els, readout: [step ? "Enzim tepeyi alçaltır; iki uç düzey ve net değişim aynı kalır." : "Aktivasyon enerjisi ile net enerji değişimi farklı niceliklerdir.", "Enzim enerjiyi yoktan üretmez, denge konumunu tek başına kaydırmaz."] };
  },
};

const cycle: FigureDef = {
  caption:
    "Enzim çevrimi (şematik): substrat aktif bölgeye bağlanır, enzim–substrat ilişkisi tepkimeyi kolaylaştırır, ürünler ayrılır ve enzim uygun koşullarda yeni çevrime katılır. Bir çevrimde tüketilmemek hiç bozulmamak demek değildir.",
  alt: "Dört kutulu döngü: enzim ve substrat, enzim–substrat ilişkisi, enzim ve ürünler, yeniden kullanılan enzim; kutular oklarla bir çember oluşturuyor. Adımlarda sıradaki kutu vurgulanıyor.",
  steps: ["Bağlanma", "Kataliz", "Ürün ayrılır", "Yeni çevrim"],
  draw: (_v, step) => {
    const items: [V, string][] = [[v(1.8, 3.6), "enzim + substrat"], [v(7.6, 3.6), "enzim–substrat"], [v(7.6, 0.6), "enzim + ürünler"], [v(1.8, 0.6), "enzim serbest"]];
    const els: El[] = [];
    items.forEach(([c, s], i) => {
      const on = i === step;
      els.push(rect(c[0] - 1.6, c[1] - 0.5, c[0] + 1.6, c[1] + 0.5, { tone: on ? "a" : "c", fill: on ? "a" : "c", thin: !on, bold: on }), txt(c, s, "c", { small: true, bold: true }));
    });
    els.push(vec(v(3.6, 3.6), v(5.8, 3.6), { tone: step >= 1 ? "a" : "muted" }), vec(v(7.6, 2.9), v(7.6, 1.3), { tone: step >= 2 ? "a" : "muted" }), vec(v(5.8, 0.6), v(3.6, 0.6), { tone: step >= 3 ? "a" : "muted" }), vec(v(1.8, 1.3), v(1.8, 2.9), { tone: step >= 3 ? "a" : "muted", dash: true }));
    els.push(...pad(v(-0.1, 4.4), v(9.5, -0.2)));
    const say = ["Substrat aktif bölgeyle etkileşir; biçim ve kimyasal özellik uygunluğu belirler.", "Enzim–substrat ilişkisi daha düşük engelli bir yol sağlar.", "Ürünler ayrılır; enzimin kendisi bu çevrimde ürüne dönüşmez.", "Aynı enzim yeni substratla yeni çevrime katılabilir."];
    return { els, readout: [say[step], "Anahtar–kilit benzetmesi uygunluğu anlatır; moleküllerin tamamen katı olduğunu söylemez."] };
  },
};

const competitive: FigureDef = {
  caption:
    "Bölümdeki özgün model: v = 2ES / [2(1 + I) + S], E = 1. Engelleyici basamağı I arttıkça payda büyür ve aynı S'de hız düşer; S çok büyüdükçe iki eğri de aynı üst sınıra 2E = 2'ye yaklaşır. Sayılar modelin birimleridir, gerçek bir enzimin ölçülmüş sabitleri değildir.",
  alt: "Yatayda substrat S, düşeyde başlangıç hızı v. Kesik yatay çizgi üst sınır 2. Engelleyicisiz eğri (I = 0) ve sürgüyle seçilen I için daha yavaş yükselen ikinci eğri; ikisi de üst sınıra yaklaşıyor.",
  param: { label: "Engelleyici I", min: 0, max: 4, step: 0.5, init: 2 },
  draw: (I) => {
    const E = 1;
    const vel = (S: number, i: number) => (2 * E * S) / (2 * (1 + i) + S);
    const X = 0.18;
    const Y = 2.2;
    const els: El[] = [...axes(9.4, 5.2, "S", "v"), seg(v(0, 2 * E * Y), v(9.2, 2 * E * Y), { thin: true, dash: true, tone: "muted" }), txt(v(-0.1, 2 * E * Y), "2E", "w", { small: true, bold: true })];
    els.push(curve((x) => Y * vel(x / X, 0), 0, 9.2, 80, { tone: "c", bold: true }));
    if (I > 0) els.push(curve((x) => Y * vel(x / X, I), 0, 9.2, 80, { tone: "warn", bold: true }));
    const S0 = 10;
    els.push(vmark(S0 * X, 0, Y * vel(S0, 0) + 0.2, "muted"), txt(v(S0 * X, -0.25), "S = 10", "s", { small: true, tone: "muted" }));
    els.push(txt(v(5.6, Y * vel(5.6 / X, 0) + 0.2), "I = 0", "n", { small: true, bold: true, tone: "c" }));
    if (I > 0) els.push(txt(v(6.6, Y * vel(6.6 / X, I) - 0.2), `I = ${fmt(I, 1)}`, "s", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-0.8, 5.6), v(9.8, -0.8)));
    return { els, readout: [`S = 10: I = 0 için v = 20/12 = ${fmt(vel(10, 0), 2)}; I = ${fmt(I, 1)} için v = 20/${fmt(2 * (1 + I) + 10, 1)} = ${fmt(vel(10, I), 2)}.`, "E sabitken kuramsal üst sınır 2E = 2 değişmez."] };
  },
};

const bell = (m: number, s: number, h: number) => (x: number) => h * Math.exp(-(((x - m) / s) ** 2));
const ph: FigureDef = {
  caption:
    "Nitel pH eğrileri (ölçekli değil): pepsin asidik mide ortamıyla, tripsin daha bazik ince bağırsak ortamıyla ilişkilendirilir. Uygun pH bölgeleri farklıdır; bütün enzimlere tek bir pH optimumu atanamaz. Eğrinin tepesi ölçülen aralıktaki uygun bölgeyi gösterir.",
  alt: "Yatayda pH 0'dan 14'e, düşeyde etkinlik. Solda asidik bölgede tepe yapan pepsin eğrisi, sağda daha bazik bölgede tepe yapan tripsin eğrisi; ortada pH 7 işareti.",
  draw: () => {
    const K = 0.62;
    const els: El[] = [...axes(14 * K + 1.1, 4.6, "pH", "etkinlik")];
    els.push(curve((x) => bell(2 * K, 1.1 * K, 3.6)(x), 0, 14 * K, 60, { tone: "warn", bold: true }), curve((x) => bell(8 * K, 1.3 * K, 3.6)(x), 0, 14 * K, 60, { tone: "b", bold: true }));
    for (const p of [0, 7, 14]) els.push(seg(v(p * K, -0.1), v(p * K, 0.1), { thin: true, tone: "muted" }), txt(v(p * K, -0.25), String(p), "s", { small: true, tone: "muted" }));
    els.push(txt(v(2 * K + 0.5, 3.75), "pepsin (mide)", "e", { small: true, bold: true, tone: "warn" }), txt(v(8 * K + 0.3, 3.8), "tripsin (ince bağırsak)", "n", { small: true, bold: true, tone: "b" }));
    els.push(...pad(v(-0.8, 4.9), v(9.6, -1.0)));
    return { els, readout: ["Bir mide enziminin eğrisini bütün enzimlere taşıma.", "Düşük hızda çalışmak ile hiç ürün oluşturmamak farklı sonuçlardır."] };
  },
};

const pathway: FigureDef = {
  caption:
    "Ardışık basamakları farklı enzimler katalizler: amilaz nişastadan maltoz gibi daha küçük ürünlerin oluşmasına katkı verir, maltaz maltozu hidroliz ederek iki glikoz oluşturur. Bir basamağın ürünü sonrakinin substratıdır; bütün yolu tek enzim yürütmez. Yol dallanmasız kabul edilmiştir.",
  alt: "Soldan sağa üç kutu: nişasta, maltoz, 2 glikoz; aralarındaki okların üstünde amilaz ve maltaz yazılı. Adımlarda kutular sırayla etkinleşiyor.",
  steps: ["Nişasta", "Amilaz basamağı", "Maltaz basamağı"],
  draw: (_v, step) => {
    const els: El[] = [...chain(["nişasta", "maltoz", "2 glikoz"], { y: 1, w: 2.6, gap: 1.8, upto: step + 1, arrowLabels: ["amilaz", "maltaz"] }), ...pad(v(-0.1, 2.3), v(11.5, 0.2))];
    const say = ["Başlangıç substratı nişasta.", "Amilaz basamağı: ürün maltoz, sonraki basamağın substratıdır.", "Maltaz basamağı: maltoz + su → 2 glikoz."];
    return { els, readout: [say[step], "Bir basamak yavaşlarsa önceki ara ürün birikebilir, sonraki ürün azalabilir."] };
  },
};

/* ---------------- Virüsler ---------------- */

const notCell: FigureDef = {
  caption:
    "Hücre ile virionu aynı ölçütlerle karşılaştır: virion genom ve kapsid etrafında örgütlenir, kendi sitoplazması ve ribozomu yoktur, bağımsız enerji üretimi ve protein sentezi yapamaz. Kalıtsal bilgi taşır ve popülasyonu evrimleşebilir.",
  alt: "Üç sütunlu tablo: ölçüt, hücre, virion. Satırlar: zarla sınırlı sitoplazma, ribozom, kalıtsal bilgi, bağımsız protein sentezi, kalıtsal değişim; virion sütununda ribozom ve sitoplazma yok yazılı.",
  draw: () => {
    const body = [
      ["sitoplazma", "var", "yok"],
      ["ribozom", "var", "yok"],
      ["kalıtsal bilgi", "var", "var"],
      ["bağımsız sentez", "var", "yok"],
      ["kalıtsal değişim", "var", "var"],
    ];
    const els: El[] = [...table(["ölçüt", "hücre", "virion"], body, [4.4, 3, 3], { top: 5.4, rowH: 0.9, tone: (r, c) => (c === 0 ? undefined : body[r][c] === "var" ? "c" : "warn") }), ...pad(v(-0.1, 5.6), v(10.5, -0.1))];
    return { els, readout: ["Virionu 'çok küçük tek hücreli' saymak yapısal bir yanlıştır.", "Canlılık sorusunu tek etiketle geçme; kanıtları ayrı sırala."] };
  },
};

const layers: FigureDef = {
  caption:
    "Katmanlar (şematik, ölçekli değil): içte genom (DNA ya da RNA), onu saran protein kapsid; bazı virüslerde dışta konak zarlarından köken alan lipit zarf ve yüzey proteinleri. Zarfsız virüs de genom ve kapsid taşır; dış halka her virüste zorunlu değildir.",
  alt: "İç içe şekiller: ortada kıvrık genom çizgisi, çevresinde çokgen kapsid. İkinci adımda kapsidin dışına çember biçiminde zarf ve üzerinde çıkıntı hâlinde yüzey proteinleri eklenir.",
  steps: ["Zarfsız virion", "Zarflı virion"],
  draw: (_v, step) => {
    const C = v(3.0, 2.6);
    const hex = Array.from({ length: 6 }, (_, i) => v(C[0] + 1.35 * Math.cos(((i * 60 + 30) * Math.PI) / 180), C[1] + 1.35 * Math.sin(((i * 60 + 30) * Math.PI) / 180)));
    const els: El[] = [poly(hex, { tone: "c", fill: "c", bold: true })];
    els.push(curve((x) => C[1] + 0.35 * Math.sin((x - C[0]) * 5), C[0] - 0.8, C[0] + 0.8, 40, { tone: "a", bold: true }));
    if (step) {
      els.push(circle(C, 1.8, { tone: "b", bold: true, dash: true }));
      for (let i = 0; i < 8; i++) {
        const a = (i * 45 * Math.PI) / 180;
        els.push(seg(v(C[0] + 1.8 * Math.cos(a), C[1] + 1.8 * Math.sin(a)), v(C[0] + 2.2 * Math.cos(a), C[1] + 2.2 * Math.sin(a)), { tone: "b", bold: true }));
      }
    }
    const lab = (y: number, s: string, tone: Tone, x1: number) => [seg(v(x1, y), v(6.2, y), { thin: true, tone: "muted" }), txt(v(6.35, y), s, "e", { small: true, bold: true, tone })];
    els.push(...lab(2.6, "genom (DNA ya da RNA)", "a", C[0] + 0.85), ...lab(3.7, "kapsid (protein)", "c", C[0] + 1.0));
    if (step) els.push(...lab(4.75, "zarf ve yüzey proteini", "b", C[0] + 1.7));
    els.push(...pad(v(0.6, 5.2), v(11.6, 0.1)));
    return { els, readout: [step ? "Zarf konak zarlarından köken alır; yüzey proteinleri bağlanmada görev alır." : "Zarfsız virion: genom + kapsid.", "Bazı virionlar polimeraz gibi enzim taşıyabilir; bu bağımsız metabolizma değildir."] };
  },
};

const LYTIC = ["bağlanma", "genom girişi", "sentez", "birleşme", "çıkış"];
const lytic: FigureDef = {
  caption:
    "Seçilmiş litik bakteriyofaj modelinde sıra: bağlanma, genomun hücreye ulaşması, viral genom ve proteinlerin konak ribozomlarıyla sentezi, birleşme ve çıkış. Virüs hücre gibi büyüyüp ikiye bölünmez; yeni parçacıklar bileşenlerin düzenlenmesiyle kurulur. Şematik, gerçek üretim sayısı değildir.",
  alt: "Yukarıdan aşağıya beş kutulu zincir: bağlanma, genom girişi, sentez, birleşme, çıkış. Adımlarda kutular sırayla etkinleşiyor ve altta o basamağın kısa açıklaması değişiyor.",
  steps: LYTIC,
  draw: (_v, step) => {
    const els: El[] = [];
    LYTIC.forEach((s, i) => {
      const y = 4.6 - i * 1.1;
      const on = i <= step;
      els.push(rect(3, y - 0.35, 7, y + 0.35, { tone: on ? (i === step ? "a" : "b") : "muted", fill: on ? (i === step ? "a" : "b") : undefined, thin: i !== step, bold: i === step, dash: !on }));
      els.push(txt(v(5, y), `${i + 1}. ${s}`, "c", { small: true, bold: on, tone: on ? "ink" : "muted" }));
      if (i < LYTIC.length - 1) els.push(vec(v(5, y - 0.4), v(5, y - 0.7), { thin: true, tone: i < step ? "ink" : "muted" }));
    });
    els.push(...pad(v(0, 5.1), v(10, 0)));
    const say = [
      "Yüzey yapısı uygun reseptöre bağlanır; bağlanma tek başına çoğalma değildir.",
      "Genom hücreye ulaşır; kapsid dışarıda kalabilir.",
      "Konak ribozomları viral proteinleri, konak sistemleri viral genomu üretir.",
      "Genom ve kapsid proteinleri yeni virionlar hâlinde düzenlenir.",
      "Litik çıkışta konak hücre parçalanır; zarflı virüslerin bir bölümü tomurcuklanarak çıkabilir.",
    ];
    return { els, readout: [`${step + 1}/5 ${LYTIC[step]}: ${say[step]}`, "Yalnız genom ya da yalnız kapsid çoğalması tam, bulaştırıcı parçacık demek değildir."] };
  },
};

const dependency: FigureDef = {
  caption:
    "Deney düzeni: eşit başlangıç virionu, aynı besin ve sıcaklıkta üç kap. Yalnız canlı uygun hücre kabında yeni parçacık sayısı artar; bu, belirtilen koşullarda hücresel sisteme bağımlılığı destekler. Sonuç başlangıca göre değişimle okunur (nitel şema, ölçekli değil).",
  alt: "Üç kap yan yana: canlı uygun hücre, öldürülmüş hücre, hücresiz besiyeri. Her kabın altında başlangıç ve son sayım çubukları; yalnız birinci kapta son çubuk yükseliyor, diğerlerinde artış yok.",
  draw: () => {
    const kaps: [string, boolean][] = [["canlı uygun hücre", true], ["öldürülmüş hücre", false], ["hücresiz besiyeri", false]];
    const els: El[] = [seg(v(-0.2, 0), v(11.4, 0), { thin: true, tone: "muted" })];
    kaps.forEach(([name, grows], i) => {
      const x = i * 3.9 + 0.6;
      els.push(rect(x, 0, x + 1.0, 1.2, { tone: "muted", fill: "muted", thin: true }), rect(x + 1.3, 0, x + 2.3, grows ? 3.6 : 1.2, { tone: grows ? "a" : "muted", fill: grows ? "a" : "muted", thin: !grows, bold: grows }));
      els.push(txt(v(x + 0.5, 1.35), "ilk", "n", { small: true, tone: "muted" }), txt(v(x + 1.8, (grows ? 3.6 : 1.2) + 0.15), grows ? "artış" : "artış yok", "n", { small: true, bold: true, tone: grows ? "a" : "muted" }));
      els.push(txt(v(x + 1.15, i === 1 ? -0.85 : -0.25), name, "s", { small: true, bold: true }));
    });
    els.push(...pad(v(-0.3, 4.6), v(11.6, -1.6)));
    return { els, readout: ["50'den ve 500'den başlayan kapların son sayılarını doğrudan karşılaştırma; değişimi karşılaştır.", "Reseptör kapatılınca üretimin durması bağlanmanın gerektiğini destekler."] };
  },
};

export const biologyFigures059TytCell: Record<string, Record<string, FigureDef>> = {
  "hucre-zarinda-madde-alisverisleri": {
    "Basit difüzyonda net hareket ile hareketi ayır": diffusion,
    "Kolaylaştırılmış difüzyon: protein var, ATP şart değil": saturation,
    "Aktif taşımada enerjiyi ve gradyanı izle": routes,
    "Aynı su yönü, iki farklı hücre sonucu": tonicity,
    "Basınç farkı ozmotik eğilime karşı koyabilir": pressure,
  },
  enzimler: {
    "Enerji grafiğinde başlangıç, tepe ve ürünü ayrı oku": energy,
    "Özgüllük ve çevrim": cycle,
    "Rekabetçi engellemeyi belirtilen modelle yorumla": competitive,
    "pH grafiğinde optimumu ve ölçüm aralığını ayır": ph,
    "Enzimin ürün değil yol üzerindeki görevini izle": pathway,
  },
  virusler: {
    "Virüs neden bir hücre değildir?": notCell,
    "Genom, kapsid ve zarfı katman katman oku": layers,
    "Çoğalma: parçalar üretilir, virion birleştirilir": lytic,
    "Deneyde canlı hücre bağımlılığını kanıtla": dependency,
  },
};
