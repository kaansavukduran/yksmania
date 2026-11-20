import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Çözelti derişimi. Çubuklar kütle ölçeklidir. Sayısal örnekler
 * özgündür; 2017 YGS Fen 24 verisi resmî kitapçıktan özetlenmiştir (yapılmış
 * sınav, resmî cevap C), çözüm özgündür. ppm hesapları 2026 kazanım
 * açıklamasına göre isteğe bağlı nicel ektir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const pct = (x: number) => `%${(Math.round(x * 100) / 100).toString().replace(".", ",")}`;
/** Tuz (renkli) + su (gri) yığın çubuğu, ölçek k cm/g. */
function stack(y: number, salt: number, water: number, k: number, label: string): El[] {
  return [
    rect(0, salt * k, y - 0.25, y + 0.25, "a"), rect(salt * k, (salt + water) * k, y - 0.25, y + 0.25, "muted"),
    txt(v((salt + water) * k + 0.2, y), label, "e", { small: true }),
  ];
}

// 1 · Payda çözeltidir.
const share: FigureDef = {
  caption:
    "20 g tuz suda tamamen çözünüyor. Su kütlesini değiştir: kütlece yüzde = tuz ÷ (tuz + su) × 100. Paydaya yalnız su yazmak (20 ÷ su) yanlıştır; çözelti, çözücü ile çözünmüş kısmın toplamıdır.",
  alt: "Yatay yığın çubuk: turuncu tuz parçası ve gri su parçası; yanında doğru ve yanlış yüzde.",
  param: { label: "Su kütlesi", min: 80, max: 380, step: 20, init: 180, unit: " g" },
  draw: (w) => {
    const k = 0.014, total = 20 + w;
    const els: El[] = [...stack(0, 20, w, k, `${total} g çözelti`)];
    els.push(txt(v(0, -0.8), `doğru: 20 ÷ ${total} × 100 = ${pct((20 / total) * 100)}`, "e", { small: true, bold: true, tone: "b" }), txt(v(0, -1.35), `yanlış: 20 ÷ ${w} × 100 = ${pct((20 / w) * 100)}`, "e", { small: true, tone: "warn" }));
    els.push(txt(v(0, 0.6), "tuz", "e", { small: true, tone: "a" }));
    els.push(txt(v(-0.3, 1.0), " ", "c"), txt(v(7.4, -1.7), " ", "c"));
    return { els, readout: [`20 g tuz + ${w} g su = ${total} g çözelti; kütlece ${pct((20 / total) * 100)}.`, "Yüzdeyi bulunca “100 g çözeltide kaç g?” cümlesine çevir."] };
  },
};

// 2 · Seyreltme.
const dilute: FigureDef = {
  caption:
    "200 g kütlece %15 tuz çözeltisinde 30 g tuz var. Eklenen suyu değiştir: tuz kütlesi sabit kalır, yalnız toplam büyür. %10’a inmek için 30 ÷ 0,10 = 300 g son çözelti, yani 100 g su gerekir. Eklenen su oranında yüzdeyi aritmetik azaltma.",
  alt: "İki yığın çubuk: üstte başlangıç 30 g tuz + 170 g su, altta aynı 30 g tuz ve artan su.",
  param: { label: "Eklenen su", min: 0, max: 300, step: 25, init: 100, unit: " g" },
  draw: (add) => {
    const k = 0.012, total = 200 + add;
    const els: El[] = [...stack(0.6, 30, 170, k, "200 g · %15"), ...stack(-0.4, 30, 170 + add, k, `${total} g · ${pct((30 / total) * 100)}`)];
    els.push(seg(v(30 * k, 1.0), v(30 * k, -0.8), { dash: true, thin: true, tone: "a" }), txt(v(30 * k + 0.1, 1.1), "30 g tuz sabit", "e", { small: true, tone: "a" }));
    els.push(txt(v(-0.3, 1.5), " ", "c"), txt(v(8.2, -1.0), " ", "c"));
    return { els, readout: [`${add} g su: 30 ÷ ${total} × 100 = ${pct((30 / total) * 100)}.`, "Örnek almak (homojenden pay çıkarmak) yüzdeyi değiştirmez; su eklemek ve buharlaştırmak değiştirir."] };
  },
};

// 3 · Ağırlıklı karışım.
const MIX = [
  { label: "100 g %10 + 300 g %30", a: [10, 90], b: [90, 210], detail: ["Tuzlar 10 + 90 = 100 g; çözelti 400 g; 100 ÷ 400 = %25.", "Basit ortalama %20 yanlış: kütleler eşit değil."] },
  { label: "2017 YGS Fen 24", a: [5, 200], b: [15, 180], detail: ["200 g su + 5 g tuz ve 180 g su + 15 g tuz: tuz 20 g, çözelti 400 g → %5 (C).", "200 ve 180 su kütlesidir; 20 ÷ 380 yanlış payda."] },
];
const mix: FigureDef = {
  caption:
    "Aynı çözünenli iki çözelti karışınca tuz kütleleri ayrı, çözelti kütleleri ayrı toplanır. Bir senaryoya tıkla: iki başlangıç çubuğu ve birleşmiş çubuk çizilir. Yüzdelerin basit ortalaması yalnız eşit kütleli çözeltilerde doğrudur.",
  alt: "Üç yığın çubuk: iki başlangıç çözeltisi ve altta birleşmiş çözelti; tuz turuncu, su gri.",
  picks: MIX.map((m) => ({ label: m.label, title: m.label, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const m = MIX[pick >= 0 ? pick : 0], k = 0.011;
    const S = m.a[0] + m.b[0], W = m.a[1] + m.b[1];
    const els: El[] = [
      ...stack(1.0, m.a[0], m.a[1], k, `${m.a[0] + m.a[1]} g · ${pct((m.a[0] / (m.a[0] + m.a[1])) * 100)}`),
      ...stack(0.2, m.b[0], m.b[1], k, `${m.b[0] + m.b[1]} g · ${pct((m.b[0] / (m.b[0] + m.b[1])) * 100)}`),
      seg(v(0, -0.25), v(7.0, -0.25), { thin: true, tone: "muted" }),
      ...stack(-0.8, S, W, k, `${S + W} g · ${pct((S / (S + W)) * 100)}`),
    ];
    MIX.forEach((mm, i) => els.push(txt(v(i * 3.6, -1.7), mm.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.5), " ", "c"), txt(v(7.4, -2.0), " ", "c"));
    return { els, readout: [m.detail[0], "Karışımın yüzdesi her zaman iki başlangıç yüzdesinin arasında kalır (kayıpsız karışımda)."] };
  },
};

// 4 · Ters hazırlama.
const REV = ["Hedef ve sınırlar", "Uzaklıkları ölç", "Ters orantılı kütleler", "Tuzla kontrol"];
const reverse: FigureDef = {
  caption:
    "500 g kütlece %24 çözelti, %12 ve %32’lik çözeltilerden hazırlanacak. Adımları ilerlet: hedef iki uç arasında olmalı; hedefin uçlara uzaklıkları 12 ve 8’dir; her çözeltiden alınacak kütle karşı uzaklıkla orantılıdır (8 : 12). Sonuç 200 g %12 + 300 g %32; tuz denkliğiyle denetle.",
  alt: "Yüzde ekseni: %12, %24 ve %32 işaretli; uzaklıklar 12 ve 8; altında 200 g ve 300 g çubukları.",
  steps: REV,
  draw: (_v, step) => {
    const X = (p: number) => (p - 10) * 0.28;
    const els: El[] = [vec(v(X(10), 0), v(X(35), 0), { thin: true })];
    for (const [p, t] of [[12, "b"], [24, "a"], [32, "c"]] as const) els.push(ball(v(X(p), 0), 0.12, t), txt(v(X(p), 0.45), `%${p}`, "c", { small: true, bold: true, tone: t }));
    if (step >= 1) els.push(seg(v(X(12), -0.35), v(X(24), -0.35), { tone: "muted" }), txt(v((X(12) + X(24)) / 2, -0.65), "12", "c", { small: true }), seg(v(X(24), -0.35), v(X(32), -0.35), { tone: "muted" }), txt(v((X(24) + X(32)) / 2, -0.65), "8", "c", { small: true }));
    if (step >= 2) {
      const k = 0.008;
      els.push(rect(0, 200 * k, -1.5, -1.1, "b"), txt(v(200 * k + 0.15, -1.3), "%12’den 200 g (8 pay)", "e", { small: true }));
      els.push(rect(0, 300 * k, -2.5, -2.1, "c"), txt(v(300 * k + 0.15, -2.3), "%32’den 300 g (12 pay)", "e", { small: true }));
    }
    if (step >= 3) els.push(txt(v(0, -3.1), "tuz: 0,12·200 + 0,32·300 = 120 g", "e", { small: true, bold: true, tone: "a" }), txt(v(0, -3.65), "120 ÷ 500 = %24 ✓", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 0.9), " ", "c"), txt(v(7.4, -4.0), " ", "c"));
    return { els, readout: [["%24, %12 ile %32 arasında: hazırlanabilir.", "Hedefin uzaklıkları: 24 − 12 = 12, 32 − 24 = 8.", "Kütleler karşı uzaklıklarla orantılı: 8 : 12 = 2 : 3 → 200 g ve 300 g.", "Tuz denkliği: 0,12x + 0,32(500 − x) = 120 → x = 200."][step], "Denklem yolu ile kaldıraç yolu aynı sonucu verir; ikisi birbirinin kontrolüdür."] };
  },
};

// 5 · Buharlaştırma ve çökelme.
const evaporate: FigureDef = {
  caption:
    "300 g kütlece %20 X çözeltisi: 60 g X, 240 g su; sabit sıcaklıkta sınır 30 g X / 100 g su. Buharlaşan suyu değiştir: 40 g su gidene kadar her şey çözünmüş kalır, sonra fazla X dibe çöker. Sıvının yüzdesi doymuş değerde (≈%23,08) sabitlenir; kabın toplamına göre hesaplanan oran sıvı derişimi değildir.",
  alt: "Yığın çubuk: turuncu çözünmüş X, gri su ve koyu ayrı katı; yanında sıvı kütlesi ve yüzdesi.",
  param: { label: "Buharlaşan su", min: 0, max: 150, step: 10, init: 100, unit: " g" },
  draw: (lost) => {
    const water = 240 - lost, cap = 0.3 * water, dis = Math.min(60, cap), solid = 60 - dis, k = 0.018;
    const els: El[] = [rect(0, dis * k, -0.25, 0.25, "a"), rect(dis * k, (dis + water) * k, -0.25, 0.25, "muted")];
    if (solid > 0) els.push(rect(0, solid * k, -0.95, -0.55, "warn"), txt(v(solid * k + 0.15, -0.75), `dipte ${Math.round(solid)} g X`, "e", { small: true, tone: "warn" }));
    els.push(txt(v(0, 0.7), `sıvı: ${Math.round(water)} g su + ${Math.round(dis * 10) / 10} g X = ${Math.round((water + dis) * 10) / 10} g`, "e", { small: true, bold: true }));
    els.push(txt(v(0, -1.5), `sıvı derişimi: ${pct((dis / (water + dis)) * 100)}`, "e", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(-0.3, 1.1), " ", "c"), txt(v(6.6, -1.8), " ", "c"));
    return { els, readout: [solid > 0 ? `Kapasite 0,30 × ${water} = ${cap} g; ${Math.round(solid)} g X çöktü.` : "Henüz doymamış ya da tam sınırda: çökelme yok.", "Çökelme eşiği: su 60 ÷ 0,30 = 200 g’a inince (40 g kayıp)."] };
  },
};

// 6 · ppm ve yoğunluk.
const DENS = [1.0, 1.2, 1.5];
const ppm: FigureDef = {
  caption:
    "2,00 L çözeltide 12 mg iz madde var. Bir yoğunluğa tıkla: kütlece ppm = mg ÷ çözelti kilogramı, hacimce derişim = mg ÷ L. Yoğunluk 1,00 g/mL değilse iki sayı ayrışır. (ppm hesabı TYT kazanımında isteğe bağlı ektir; kavram ve payda okuma esastır.)",
  alt: "İki çubuk: kütlece ppm ve mg/L değerleri; seçilen yoğunluğa göre ppm değişiyor, mg/L sabit.",
  picks: DENS.map((d) => ({ label: `d = ${String(d).replace(".", ",")} g/mL`, title: `d = ${String(d).replace(".", ",")} g/mL`, detail: [`Kütle = 2000 mL × ${String(d).replace(".", ",")} = ${2000 * d} g = ${(2 * d).toString().replace(".", ",")} kg.`, `ppm = 12 ÷ ${(2 * d).toString().replace(".", ",")} = ${(Math.round((12 / (2 * d)) * 100) / 100).toString().replace(".", ",")}; mg/L = 12 ÷ 2 = 6.`] })),
  draw: (_v, _s, pick = -1) => {
    const d = DENS[pick >= 0 ? pick : 1], p = 12 / (2 * d), k = 0.7;
    const els: El[] = [rect(0, p * k, 0.35, 0.85, "a"), txt(v(p * k + 0.15, 0.6), `kütlece: ${(Math.round(p * 100) / 100).toString().replace(".", ",")} ppm`, "e", { small: true, bold: true }), rect(0, 6 * k, -0.45, 0.05, "b"), txt(v(6 * k + 0.15, -0.2), "hacimce: 6 mg/L", "e", { small: true, bold: true })];
    DENS.forEach((dd, i) => els.push(txt(v(i * 2.4, -1.1), `d = ${String(dd).replace(".", ",")} g/mL`, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.2), " ", "c"), txt(v(7.2, -1.4), " ", "c"));
    return { els, readout: [`d = ${String(d).replace(".", ",")}: ${(Math.round(p * 100) / 100).toString().replace(".", ",")} ppm, 6 mg/L.`, "1 mg/kg = 1 ppm; mg/L ile eşit saymak yoğunluk koşulu ister."] };
  },
};

export const chemistryFiguresConcentration: Record<string, Record<string, FigureDef>> = {
  "cozelti-derisimi": {
    "Kütlece yüzde çözeltinin payıdır": share,
    "Seyreltmede hangi miktar sabit": dilute,
    "İki çözeltiyi ağırlıklarıyla birleştir": mix,
    "Ters hazırlama ve güvenilir kontrol": reverse,
    "Buharlaştırmada sınırı denetle": evaporate,
    "ppm birimini tabanıyla yaz": ppm,
  },
};
