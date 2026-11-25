import { statisticsSource037Classes, statisticsSource037Measurements } from "../statisticsSource037Revision";
import { pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, nf, numberLine, pad, rect, sector, token } from "./mathFigures060TytKit";

/*
 * TYT Matematik (Forge060) · veri analizi ve grafik problemleri. Veriler
 * rehber bölümlerindeki örneklerdir (1, 4, 4, 7, 8, 9; 5 gözlem ortalama 6;
 * 1, 3, 3, 5 → 13; [0, 5), [5, 15), [15, 30] sınıfları 2, 4, 3; A = 60, B = 65;
 * 20, 30, 50; A = 12 + 3t, B = 18 + t; 2, 5, 9 frekans 3, 2, 1). Sütun ve
 * dilim boyları aynı hesaptan çizilir.
 */

/* ===================== Veri analizi ===================== */

const MED_STEPS = ["1, 4, 4, 7, 8, 9", "Frekans: 1×2, 3×3, 7×1"];
const median: FigureDef = {
  caption:
    "Ortanca sıralı listede bulunur. Altı gözlemde (çift n) 3. ve 4. sıradaki değerlerin ortalaması alınır: 1, 4, 4, 7, 8, 9 için (4 + 7)/2 = 5,5; bu değer listede yoktur. Frekans tablosunda sıralar kümülatif sayılır: 1 iki kez, 3 üç kez, 7 bir kez ise 3. ve 4. sıra 3’tür, ortanca 3.",
  alt: "Sıra numaralı altı kutu; ortadaki iki kutu vurgulu ve altlarında ortanca hesabı.",
  steps: MED_STEPS,
  draw: (_, step) => {
    const data = step === 0 ? [1, 4, 4, 7, 8, 9] : [1, 1, 3, 3, 3, 7];
    const els: El[] = [];
    data.forEach((d, i) => {
      const mid = i === 2 || i === 3;
      els.push(...cell(i * 1.3, 0, 1.1, 0.9, String(d), mid ? "a" : "muted", { fill: mid, small: false }), txt(v(i * 1.3 + 0.55, 1.1), `${i + 1}.`, "n", { tone: "muted", small: true }));
    });
    const m = (data[2] + data[3]) / 2;
    els.push(txt(v(3.2, -0.25), `ortanca = (${data[2]} + ${data[3]})/2 = ${nf(m, 1)}`, "s", { tone: "a", bold: true }));
    els.push(...pad(-0.3, 1.9, 7.9, -1.2));
    return { els, readout: step === 0 ? ["n = 6: n/2 = 3. ve 4. gözlem.", "Ortanca 5,5; listede gözlenmiş olması gerekmez."] : ["1. ve 2. sıra 1’e, 3.–5. sıra 3’e ait.", "3. ve 4. sıra 3 ⇒ ortanca 3."] };
  },
};

const MEAN_STEPS = ["Gözlem ekle", "Grupları birleştir"];
const meanTotal: FigureDef = {
  caption:
    "Ortalamayı toplama geri döndür. Beş gözlemin ortalaması 6 ise toplam 30’dur; 12 eklenince (30 + 12)/6 = 7. Gruplarda ağırlık kişi sayısıdır: 4 kişi ortalama 50, 8 kişi ortalama 80 ⇒ 840/12 = 70; düz ortalama 65 grupları eşit sayar. Sütun genişliği adet, yüksekliği ortalamadır; alan toplamdır.",
  alt: "Genişliği adet, yüksekliği ortalama olan dikdörtgenler; birleşik ortalamayı gösteren kesintisiz yatay çizgi ve düz ortalamayı gösteren kesikli çizgi.",
  steps: MEAN_STEPS,
  draw: (_, step) => {
    const els: El[] = [seg(v(-0.3, 0), v(9.0, 0), { tone: "ink" })];
    if (step === 0) {
      const k = 0.3;
      els.push(rect(0, 0, 5, 6 * k, "a"), txt(v(2.5, 3 * k), "5 × 6 = 30", "c", { tone: "ink", small: true, bold: true }));
      els.push(rect(5.2, 0, 1, 12 * k, "c"), txt(v(5.7, 12 * k), "12", "n", { tone: "ink", small: true, bold: true }));
      els.push(seg(v(-0.3, 7 * k), v(7.0, 7 * k), { tone: "warn" }), txt(v(7.1, 7 * k), "7", "e", { tone: "warn", bold: true }));
      els.push(txt(v(-0.4, 6 * k), "6", "w", { tone: "muted", small: true }));
      els.push(...pad(-1.0, 4.4, 9.2, -0.5));
      return { els, readout: ["Yeni toplam 42, yeni adet 6 ⇒ 7.", "Eski ortalama ile 12’yi ortalamak (9) beş gözlemi tek gözlem sayar."] };
    }
    const k = 0.045, w = 0.55;
    els.push(rect(0, 0, 4 * w, 50 * k, "a"), txt(v(2 * w, 50 * k), "4 kişi · 50", "n", { tone: "ink", small: true, bold: true }));
    els.push(rect(4 * w + 0.2, 0, 8 * w, 80 * k, "c"), txt(v(8 * w + 0.2, 80 * k), "8 kişi · 80", "n", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(-0.3, 70 * k), v(12 * w + 0.6, 70 * k), { tone: "warn" }), txt(v(12 * w + 0.7, 70 * k), "70", "e", { tone: "warn", bold: true }));
    els.push(seg(v(-0.3, 65 * k), v(12 * w + 0.6, 65 * k), { tone: "muted", dash: true }), txt(v(12 * w + 0.7, 65 * k - 0.2), "65", "e", { tone: "muted", small: true }));
    els.push(...pad(-1.0, 4.4, 9.2, -0.5));
    return { els, readout: ["4·50 + 8·80 = 840; 840/12 = 70.", "(50 + 80)/2 = 65 grupları eşit ağırlıklar."] };
  },
};

const outlier: FigureDef = {
  caption:
    "1, 3, 3, x verisinde son gözlemi sürgüyle 5’ten 13’e taşı. Toplam Δ kadar artınca ortalama Δ/4 artar (x = 13’te 5); sıralı iki orta 3 ve 3 kaldığı için ortanca 3’te durur; açıklık 4’ten 12’ye çıkar. Bu, ortancanın asla etkilenmeyeceği anlamına gelmez.",
  alt: "0’dan 14’e sayı doğrusu; gözlemler üst üste noktalar; ortalama ve ortanca konumlarında ayrı işaretler; en küçük ile en büyük arasında açıklık çizgisi.",
  param: { label: "son gözlem", min: 5, max: 13, step: 1, init: 13 },
  draw: (x) => {
    const k = 0.6, data = [1, 3, 3, x], mean = (7 + x) / 4, els: El[] = [...numberLine(0, 14, k, 0, [0, 2, 4, 6, 8, 10, 12, 14])];
    const seen: Record<number, number> = {};
    for (const d of data) {
      seen[d] = (seen[d] ?? 0) + 1;
      els.push(token(d * k, 0.4 * seen[d], 0.32, d === x ? "c" : "a"));
    }
    els.push(seg(v(1 * k, -0.9), v(x * k, -0.9), { tone: "muted", thin: true }), txt(v(((1 + x) / 2) * k, -1.0), `açıklık ${x - 1}`, "s", { tone: "muted", small: true }));
    els.push(seg(v(3 * k, 1.1), v(3 * k, 1.5), { tone: "b", bold: true }), txt(v(3 * k, 1.6), "ortanca 3", "n", { tone: "b", small: true, bold: true }));
    els.push(seg(v(mean * k, -0.3), v(mean * k, -0.6), { tone: "warn", bold: true }), txt(v(mean * k + 0.1, -0.45), `ort. ${nf(mean, 2)}`, "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.6, 2.4, 14 * k + 0.6, -1.7));
    return { els, readout: [`Toplam ${7 + x}, ortalama ${nf(mean, 2)}; ortanca 3; açıklık ${x - 1}.`, `5’ten ${x}’e: Δ = ${x - 5}, ortalama ${nf((x - 5) / 4, 2)} arttı.`] };
  },
};

const HIST_STEPS = ["Yükseklik = frekans (yanlış)", "Yükseklik = frekans/genişlik"];
const histogram: FigureDef = {
  caption:
    "Sınıflar [0, 5), [5, 15), [15, 30]; frekanslar 2, 4, 3; genişlikler 5, 10, 15. Yükseklik frekans olursa geniş sınıfların alanı şişer. Frekans yoğunluğu (frekans/genişlik) 0,4; 0,4; 0,2 alınınca alanlar yeniden 2, 4, 3 olur: ilk iki sütun aynı boyda ama ikincisi iki kat geniş ve iki kat frekanslıdır.",
  alt: "0’dan 30’a yatay eksen üzerinde bitişik üç dikdörtgen; birinci adımda boylar frekans, ikinci adımda boylar yoğunluk; her sütunun içinde alanı.",
  steps: HIST_STEPS,
  draw: (_, step) => {
    const kx = 0.28, classes: [number, number, number, Tone][] = [[0, 5, 2, "a"], [5, 15, 4, "c"], [15, 30, 3, "b"]];
    const els: El[] = [vec(v(-0.2, 0), v(31 * kx + 0.3, 0), { tone: "ink", thin: true })];
    const ky = step === 0 ? 0.8 : 8;
    for (const [a, b, f, tone] of classes) {
      const hgt = step === 0 ? f : f / (b - a);
      els.push(rect(a * kx, 0, (b - a) * kx, hgt * ky, tone), txt(v(((a + b) / 2) * kx, hgt * ky), step === 0 ? `boy ${f}` : nf(hgt, 1), "n", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(((a + b) / 2) * kx, hgt * ky * 0.45), `alan ${nf(step === 0 ? f * (b - a) : f, 0)}`, "c", { tone: "ink", small: true }));
    }
    for (const t of [0, 5, 15, 30]) els.push(txt(v(t * kx, -0.15), String(t), "s", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-0.5, 4.4, 31 * kx + 0.6, -0.8));
    return { els, readout: step === 0 ? ["Alanlar 10, 40, 45: geniş sınıf olduğundan büyük görünür.", "Eksen birimi okunmadan en yüksek sütun en sık sınıf sanılır."] : ["2/5 = 0,4; 4/10 = 0,4; 3/15 = 0,2.", "Alanlar 2, 4, 3: frekansla aynı."] };
  },
};

const sourceHistogram: FigureDef = {
  caption: "Eş genişlikli üç aralıkta her gözlemi bir kez say. Sol sınır aralığa dahil, sağ sınır bir sonrakine aittir.",
  alt: "Ölçüm değerleri 2, 6, 10 ve 14 ile sınırlandırılan üç eş aralık. Bitişik sütunların yükseklikleri 4, 4 ve 2 gözlem.",
  steps: ["Bütün gözlemleri say", "6 ve üstünü seç"],
  draw: (_, step) => {
    const x = (value: number) => (value - 2) * 0.55;
    const y = (frequency: number) => frequency * 0.72;
    const els: El[] = [
      vec(v(-0.24, 0), v(x(14.55), 0), { tone: "ink", thin: true }),
      vec(v(-0.24, 0), v(-0.24, y(4.75)), { tone: "ink", thin: true }),
      txt(v(3.3, -0.54), "Ölçüm değeri", "s", { tone: "ink", small: true }),
      txt(v(-0.24, y(4.75)), "Gözlem adedi", "n", { tone: "ink", small: true }),
    ];
    for (const { lower, upper, values } of statisticsSource037Classes) {
      const selected = step === 0 || lower >= 6;
      els.push(rect(x(lower), 0, x(upper) - x(lower), y(values.length), selected ? "a" : "muted", selected));
      els.push(txt(v((x(lower) + x(upper)) / 2, y(values.length) + 0.12), String(values.length), "n", { tone: "ink", small: true, bold: true }));
    }
    for (const value of [2, 6, 10, 14]) els.push(txt(v(x(value), -0.12), String(value), "s", { tone: "ink", small: true }));
    for (const frequency of [0, 1, 2, 3, 4]) els.push(txt(v(-0.29, y(frequency)), String(frequency), "w", { tone: "ink", small: true }));
    els.push(...pad(-0.9, 4.2, 7.15, -1.05));
    const total = statisticsSource037Measurements.length;
    const above = statisticsSource037Classes.filter(({ lower }) => lower >= 6).reduce((sum, { values }) => sum + values.length, 0);
    return { els, readout: step === 0
      ? [`Genişlik 4. Frekanslar ${statisticsSource037Classes.map(({ values }) => values.length).join(", ")}. Toplam ${total} ölçüm.`, "6 yalnız [6,10) sınıfındadır."]
      : [`6 ve üstünde ${above}/${total}, yani %${100 * above / total}. Eşik bir sınıf sınırıdır.`,
        "7 ve üstünün kesin adedi yalnız sütunlardan çıkarılamaz. Bu eşik bir sınıfın içindedir."] };
  },
};

/* ===================== Grafik problemleri ===================== */

const AX_STEPS = ["Eksen 0’dan", "Eksen 50’den (kesik)"];
const truncatedAxis: FigureDef = {
  caption:
    "A = 60 ve B = 65 kişi. Eksen 0’dan başlayınca sütun boyu oranı veri oranıyla aynıdır: 65/60 ≈ 1,083. Eksen 50’den başlarsa sütunlar 10 ve 15 birim görünür; görünür oran 1,5 olur. Sayılar değişmez, yalnız görüntü değişir; kesik eksen açıkça belirtilmelidir.",
  alt: "İki sütun A ve B; birinci adımda düşey eksen 0’dan, ikinci adımda 50’den başlıyor ve eksen üzerinde kesik işareti var.",
  steps: AX_STEPS,
  draw: (_, step) => {
    const base = step === 0 ? 0 : 50, k = step === 0 ? 0.055 : 0.27, els: El[] = [vec(v(0, 0), v(0, 4.2), { tone: "ink", thin: true }), seg(v(0, 0), v(6, 0), { tone: "ink" })];
    for (const [x, val, name, tone] of [[1, 60, "A", "a"], [3.4, 65, "B", "c"]] as [number, number, string, Tone][]) {
      els.push(rect(x, 0, 1.4, (val - base) * k, tone), txt(v(x + 0.7, (val - base) * k), String(val), "n", { tone: "ink", small: true, bold: true }), txt(v(x + 0.7, -0.15), name, "s", { tone: "ink", bold: true }));
    }
    els.push(txt(v(-0.15, 0), String(base), "w", { tone: "muted", small: true }));
    if (step === 1) els.push(seg(v(-0.2, 0.25), v(0.2, 0.35), { tone: "warn" }), seg(v(-0.2, 0.4), v(0.2, 0.5), { tone: "warn" }));
    els.push(...pad(-1.0, 4.6, 6.6, -0.8));
    return { els, readout: step === 0 ? ["Boy oranı 65/60 ≈ 1,083 = veri oranı."] : ["Görünür boylar 10 ve 15: oran 1,5.", "Gerçek oran yine 65/60 ≈ 1,083."] };
  },
};

const PIE_STEPS = ["20, 30, 50", "Birinci gruba 10 kişi"];
const pie: FigureDef = {
  caption:
    "Daire grafiğinde pay = değer/toplam, merkez açısı = 360°·değer/toplam. 20, 30, 50 kişilik ayrık gruplar toplam 100: açılar 72°, 108°, 180°; ikinci grubun payı %30. Birinci gruba 10 kişi eklenince toplam 110 olur: pay 30/110 ≈ %27,3; %30 değil.",
  alt: "Üç dilimli daire; her dilimin yanında kişi sayısı, yüzde ve merkez açısı.",
  steps: PIE_STEPS,
  draw: (_, step) => {
    const vals = step === 0 ? [20, 30, 50] : [30, 30, 50], tot = vals.reduce((a, b) => a + b, 0), tones: Tone[] = ["a", "c", "b"];
    const els: El[] = [], c = v(0, 0), r = 2.2;
    let a0 = 90;
    vals.forEach((val, i) => {
      const da = (360 * val) / tot, a1 = a0 - da, am = ((a0 + a1) / 2) * (Math.PI / 180);
      els.push(sector(c, r, a1, a0, tones[i]));
      const lp = v(Math.cos(am) * (r + 0.3), Math.sin(am) * (r + 0.3));
      els.push(txt(lp, `${val}: %${nf((100 * val) / tot, 1)}, ${nf(da, 1)}°`, Math.cos(am) >= 0 ? "e" : "w", { tone: tones[i], small: true, bold: true }));
      a0 = a1;
    });
    els.push(...pad(-6.2, 2.7, 6.2, -2.7));
    return { els, readout: step === 0 ? ["Toplam 100: 72° + 108° + 180° = 360°.", "İkinci grup: 30/100 = %30, 108°."] : ["Toplam 110: birinci grup 30/110 ≈ %27,3.", "Bir dilim büyüyünce payda da büyür."] };
  },
};

const piecewiseTankChange = (t: number) => {
  const start = 20;
  const peak = 32;
  const end = 26;
  const turn = 2;
  const duration = 5;
  const firstRate = (peak - start) / turn;
  const secondRate = (end - peak) / (duration - turn);
  const level = t <= turn ? start + firstRate * t : peak + secondRate * (t - turn);
  const x = (hour: number) => 1.33 * hour;
  const y = (liters: number) => 0.14 * liters;
  const point = (hour: number, liters: number) => v(x(hour), y(liters));
  const els: El[] = [
    vec(v(0, 0), v(x(5.65), 0), { tone: "ink" }),
    vec(v(0, 0), v(0, y(36)), { tone: "ink" }),
    txt(v(x(5.65), 0), "saat", "se", { small: true }),
    txt(v(0, y(36)), "L", "n", { small: true }),
  ];
  for (const hour of [0, 1, 2, 3, 4, 5]) {
    els.push(txt(point(hour, 0), String(hour), "s", { tone: "ink", small: true }));
  }
  for (const liters of [10, 20, 30]) {
    els.push(seg(point(0, liters), point(5, liters), { tone: "muted", dash: true, thin: true }));
    els.push(txt(point(0, liters), String(liters), "w", { tone: "ink", small: true }));
  }
  els.push(
    seg(point(0, start), point(turn, peak), { tone: "b", bold: true }),
    seg(point(turn, peak), point(duration, end), { tone: "c", bold: true }),
    seg(point(t, 0), point(t, level), { tone: "muted", thin: true, dash: true }),
    pt(point(t, level), undefined, "n", "a"),
  );
  return {
    els,
    readout: [
      `${nf(t, 1)} saat. Depo hacmi ${nf(level, 1)} L.`,
      `0–2 saatte +${firstRate} L/saat. 2–5 saatte −${Math.abs(secondRate)} L/saat.`,
      `Bütün aralık (${end}−${start})/${duration} = ${nf((end - start) / duration, 1)} L/saat. Bu iki farklı eğimi doğrudan ortalamak, süreler eşitken geçerlidir.`,
    ],
  };
};

const crossing: FigureDef = {
  caption:
    "İlk adımda iki tankın aynı litreye ne zaman ulaştığını, ikinci adımda tek tankın iki aralığındaki eğimleri karşılaştır. Sürgüyle zamanı değiştir ve her adımda litre ile litre/saat birimlerini ayır.",
  alt: "İlk adım iki tankın kesişen hacim doğrularını gösterir. İkinci adımda tek tankın 20, 32 ve 26 litre değerlerinden geçen iki doğru parçası vardır.",
  steps: ["İki ayrı tankı karşılaştır", "Bir tankın iki aralığını karşılaştır"],
  param: { label: "t", min: 0, max: 5, step: 0.5, init: 3, unit: " saat" },
  draw: (t, step) => {
    if (step === 1) return piecewiseTankChange(t);
    const kx = 1.3, ky = 0.15, A = (s: number) => 12 + 3 * s, B = (s: number) => 18 + s;
    const els: El[] = [vec(v(0, 0), v(5.6 * kx, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 29 * ky), { tone: "ink", thin: true }), txt(v(5.6 * kx, 0), "t", "se", { tone: "ink", small: true }), txt(v(0, 29 * ky), "L", "n", { tone: "ink", small: true })];
    for (const s of [0, 1, 2, 3, 4, 5]) els.push(txt(v(s * kx, -0.15), String(s), "s", { tone: "muted", small: true, soft: true }));
    for (const y of [12, 18, 27]) els.push(seg(v(-0.07, y * ky), v(0.07, y * ky), { tone: "muted", thin: true }), txt(v(-0.12, y * ky), String(y), "w", { tone: "muted", small: true, soft: true }));
    els.push(seg(v(0, A(0) * ky), v(5 * kx, A(5) * ky), { tone: "a", bold: true }), seg(v(0, B(0) * ky), v(5 * kx, B(5) * ky), { tone: "c", bold: true }));
    els.push(txt(v(5 * kx + 0.1, A(5) * ky), "A", "e", { tone: "a", bold: true }), txt(v(5 * kx + 0.1, B(5) * ky), "B", "e", { tone: "c", bold: true }));
    els.push(pt(v(3 * kx, 21 * ky), undefined, "n", "warn"));
    els.push(seg(v(t * kx, 0), v(t * kx, Math.max(A(t), B(t)) * ky), { tone: "muted", dash: true, thin: true }));
    els.push(...pad(-0.8, 29 * ky + 0.5, 5.6 * kx + 0.9, -0.7));
    const a = A(t), b = B(t);
    return { els, readout: [`t = ${nf(t, 1)}: A = ${nf(a, 1)} L, B = ${nf(b, 1)} L; ${a === b ? "eşit (21 L)" : a > b ? "A yüksek" : "B yüksek"}.`, "Hızlar sabit: A 3 L/saat, B 1 L/saat."] };
  },
};

const FT_STEPS = ["Frekans tablosu", "Sıralı gözlemler"];
const freqStats: FigureDef = {
  caption:
    "Değerler 2, 5, 9; frekanslar 3, 2, 1. Her değer frekansı kadar sayılır: sıralı gözlemler 2, 2, 2, 5, 5, 9. Altı gözlemin 3.’sü 2, 4.’sü 5 ⇒ ortanca (2 + 5)/2 = 3,5. Yalnız üç farklı değeri sıralayıp ortadaki 5’i almak tekrarları atlar. Ortalama 25/6 ≈ 4,17, tepe değer 2.",
  alt: "Önce değer ve frekans tablosu; ikinci adımda altı kutulu sıralı gözlem şeridi, 3. ve 4. kutular vurgulu.",
  steps: FT_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    if (step === 0) {
      const rows: [string, string, string, string][] = [["değer", "2", "5", "9"], ["frekans", "3", "2", "1"]];
      rows.forEach((row, r) => row.forEach((s, i) => els.push(...cell(i === 0 ? 0 : 1.4 + i * 1.2, 1 - r, i === 0 ? 2.6 : 1.2, 1, s, i === 0 ? "muted" : r === 0 ? "a" : "c", { fill: true }))));
    } else {
      [2, 2, 2, 5, 5, 9].forEach((d, i) => {
        const mid = i === 2 || i === 3;
        els.push(...cell(i * 1.2, 0, 1.0, 0.9, String(d), mid ? "a" : "muted", { fill: mid, small: false }), txt(v(i * 1.2 + 0.5, 1.1), `${i + 1}.`, "n", { tone: "muted", small: true }));
      });
    }
    els.push(...pad(-0.3, 2.2, 7.4, -0.3));
    return { els, readout: step === 0 ? ["Gözlem sayısı 3 + 2 + 1 = 6; toplam 2·3 + 5·2 + 9·1 = 25.", "Ortalama 25/6 ≈ 4,17; 25’i 3 satıra bölme."] : ["3. ve 4. gözlem 2 ve 5 ⇒ ortanca 3,5.", "En sık değer (mod) 2."] };
  },
};

export const mathFigures060TytData: Record<string, Record<string, FigureDef>> = {
  "veri-analizi": {
    "Ortancayı yazılış sırası belirlemez": median,
    "Ortalamayı toplama geri döndür": meanTotal,
    "Uç değerin etkisini ölç, ezberleme": outlier,
    "Histogramda genişlik de bilgi taşır": histogram,
    "Ham ölçümleri eş genişlikli sınıflara ayır": sourceHistogram,
  },
  "grafik-problemleri": {
    "Sütunlar kategorileri aynı ölçekle karşılaştırır": truncatedAxis,
    "Dairede payın paydası bütünün toplamıdır": pie,
    "Çizgi grafiğinde değişim ile değişim hızı ayrıdır": crossing,
    "Ortalama, ortanca ve tepe değerini ayrı hesapla": freqStats,
  },
};
