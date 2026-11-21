import { fmt, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { arrow, box, pad, rect } from "./biologyFigures059Kit";

/*
 * AYT Biyoloji · Tiroit, paratiroit, hipotalamus ve endokrin pankreas
 * (Forge059). Sayılar bölüm metinlerindedir: süzülen 10 birimden 8 ya da 9
 * birim geri emilim → 2 ya da 1 birim çıkış (kalsiyum ve ADH bölmesi); kan
 * havuzu 10 + 3 + 2 − 4 = 11 birim; karaciğer deposu 3, istenen 5 → en çok 3;
 * 90 mg/dL = 900 mg/L = 0,9 g/L, 0,9 / 180 = 0,005 mol/L = 5 mmol/L.
 * Hormon düzeyi şemaları yalnız yön gösterir, ölçekli değildir; tanı ya da
 * doz aracı değildir.
 */

/* ---------------- Ortak parçalar ---------------- */

/** Varsayımsal 10 birimlik bölme: geri emilen ve dışarı çıkan birimler. */
const tenUnits = (re: number, what: string): El[] => {
  const els: El[] = [];
  for (let i = 0; i < 10; i++) {
    const back = i < re;
    els.push(rect(i * 0.62, 0, i * 0.62 + 0.5, 0.5, { tone: back ? "c" : "warn", fill: back ? "c" : "warn", thin: true }));
  }
  els.push(
    txt(v(-0.2, 0.25), `süzülen 10 ${what}`, "w", { small: true, bold: true }),
    seg(v(0, -0.25), v(re * 0.62 - 0.12, -0.25), { tone: "c" }),
    txt(v((re * 0.62) / 2, -0.4), `geri emilen ${re}`, "s", { small: true, bold: true, tone: "c" }),
    txt(v(6.3, 0.25), `çıkan ${10 - re}`, "e", { small: true, bold: true, tone: "warn" }),
  );
  return els;
};

/** Düzey göstergesi: −1 düşük, 0 olağan, 1 yüksek; kısa/orta/uzun çubuk. */
const level = (x: number, y: number, name: string, lv: number, tone: Tone): El[] => {
  const L = [0.6, 1.6, 2.6][lv + 1];
  return [
    txt(v(x - 0.2, y), name, "w", { small: true, bold: true }),
    rect(x, y - 0.22, x + 2.6, y + 0.22, { tone: "muted", thin: true }),
    rect(x, y - 0.22, x + L, y + 0.22, { tone, fill: tone, thin: true }),
    txt(v(x + 2.8, y), ["düşük", "olağan", "yüksek"][lv + 1], "e", { small: true, tone }),
  ];
};

/* ---------------- Tiroit ---------------- */

const twoRoutes: FigureDef = {
  caption:
    "Aynı bez, iki ayrı yol (özgün şema, ölçekli değil): folikül hücreleri iyot içeren T3/T4'ü yapar ve metabolizmayla ilişkilidir; parafoliküler C hücreleri kalsitonini yapar ve kan kalsiyumuyla ilişkilidir. TSH ve iyot verisi ilk yola, kalsiyum verisi ikinci yola aittir.",
  alt: "İki sütun. Solda folikül hücresi, altında T3 ve T4, altında metabolizma ve gelişim. Sağda C hücresi, altında kalsitonin, altında kan kalsiyumu. Sütunların arasında kesik ayırıcı çizgi.",
  draw: () => {
    const els: El[] = [
      txt(v(2.5, 2.2), "tiroit bezi", "c", { bold: true }),
      ...box(0, 1.2, 3.8, 0.7, "Folikül hücresi", { tone: "b", fill: "b" }),
      ...box(0, 0, 3.8, 0.7, "T3 / T4 (iyotlu)"),
      ...box(0, -1.2, 3.8, 0.7, "Metabolizma, gelişim"),
      ...box(5, 1.2, 3.8, 0.7, "C hücresi", { tone: "c", fill: "c" }),
      ...box(5, 0, 3.8, 0.7, "Kalsitonin"),
      ...box(5, -1.2, 3.8, 0.7, "Kan kalsiyumu"),
      arrow(v(0, 0.83), v(0, 0.37)),
      arrow(v(0, -0.37), v(0, -0.83)),
      arrow(v(5, 0.83), v(5, 0.37)),
      arrow(v(5, -0.37), v(5, -0.83)),
      seg(v(2.5, 1.7), v(2.5, -1.6), { thin: true, dash: true, tone: "muted" }),
      txt(v(0, -1.85), "TSH ve iyot verisi", "s", { small: true, tone: "b" }),
      txt(v(5, -1.85), "kalsiyum verisi", "s", { small: true, tone: "c" }),
      ...pad(v(-2.2, 2.6), v(7.2, -2.5)),
    ];
    return { els, readout: ["Folikül → T3/T4 → metabolizma; C hücresi → kalsitonin → kalsiyum.", "Aynı organ adı, aynı hücre ve aynı uyaran demek değildir."] };
  },
};

const axisEls = (minus: boolean): El[] => [
  ...box(0, 3, 3.0, 0.7, "Hipotalamus"),
  ...box(0, 1.5, 3.0, 0.7, "Ön hipofiz"),
  ...box(0, 0, 3.0, 0.7, "Tiroit (folikül)"),
  ...box(0, -1.5, 3.0, 0.7, "Hedef dokular"),
  arrow(v(0, 2.63), v(0, 1.87), "c", { bold: true }),
  arrow(v(0, 1.13), v(0, 0.37), "c", { bold: true }),
  arrow(v(0, -0.37), v(0, -1.13), "c", { bold: true }),
  txt(v(-0.2, 2.25), "TRH (+)", "w", { small: true, bold: true, tone: "c" }),
  txt(v(-0.2, 0.75), "TSH (+)", "w", { small: true, bold: true, tone: "c" }),
  txt(v(-0.2, -0.75), "T3/T4", "w", { small: true, bold: true, tone: "c" }),
  ...(minus
    ? [
        seg(v(1.5, -0.2), v(2.6, -0.2), { tone: "warn", dash: true }),
        seg(v(2.6, -0.2), v(2.6, 3.0), { tone: "warn", dash: true }),
        arrow(v(2.6, 3.0), v(1.6, 3.0), "warn", { dash: true }),
        arrow(v(2.6, 1.5), v(1.6, 1.5), "warn", { dash: true }),
        txt(v(2.8, 2.25), "(−) geri bildirim", "e", { small: true, bold: true, tone: "warn" }),
      ]
    : []),
];
const hpt: FigureDef = {
  caption:
    "HPT ekseni (özgün şema, ölçekli değil): ileri yönde TRH ön hipofizi, TSH tiroidi uyarır (artı oklar). T3/T4 hipotalamus ve ön hipofize dönerek kendi uyarısını baskılar (eksi, kesik oklar): negatif geri bildirim. Bir okun artı olması bütün döngünün pozitif olduğu anlamına gelmez.",
  alt: "Yukarıdan aşağı hipotalamus, ön hipofiz, tiroit ve hedef dokular kutuları; aralarında TRH, TSH ve T3/T4 artı okları. İkinci adımda tiroitten çıkan kesik eksi oklar sağdan yukarı çıkıp hipotalamus ve ön hipofize dönüyor.",
  steps: ["İleri oklar", "Geri bildirim eklendi"],
  draw: (_v, step) => ({
    els: [...axisEls(step === 1), ...pad(v(-3.4, 3.6), v(5.6, -2.1))],
    readout: [step ? "T3/T4 üst merkezleri baskılar: başlangıç değişimini sınırlayan negatif geri bildirim." : "TRH → TSH → T3/T4: ileri yönde uyarı zinciri.", "Önce verilen nedeni ve sağlam kabul edilen basamakları işaretle."],
  }),
};

type Scn = { name: string; tsh: number; t4: number; note: string };
const scenarioFig = (scn: Scn, caption: string, alt: string): FigureDef => ({
  caption,
  alt,
  steps: ["Sağlam eksen", scn.name],
  draw: (_v, step) => {
    const s = step === 0 ? { tsh: 0, t4: 0 } : scn;
    const els: El[] = [
      ...level(0, 1.0, "TSH", s.tsh, s.tsh > 0 ? "warn" : s.tsh < 0 ? "b" : "c"),
      ...level(0, 0, "T4", s.t4, s.t4 > 0 ? "warn" : s.t4 < 0 ? "b" : "c"),
      txt(v(1.3, -0.8), step ? scn.note : "geri bildirim dengede", "s", { small: true, tone: step ? "a" : "muted", bold: !!step }),
      ...pad(v(-1.2, 1.6), v(4.4, -1.4)),
    ];
    return { els, readout: [step ? `${scn.name}: TSH ${["düşük", "olağan", "yüksek"][scn.tsh + 1]}, T4 ${["düşük", "olağan", "yüksek"][scn.t4 + 1]}.` : "Sağlam eksende TSH ve T4 birbirini dengeler.", "Yön şemasıdır; tek ölçümden tanı konmaz, gerçek değer gösterilmez."] };
  },
});
const lowOutput = scenarioFig(
  { name: "İyot kısıtı", tsh: 1, t4: -1, note: "baskı azaldı, üretim kısıtlı" },
  "Varsayımsal örnek: iyot yetersiz, diğer basamaklar sağlam. T4 azalınca üst merkezlere baskı azalır ve TSH artar; ama iyot kısıtı sürdüğü için T4 hemen düzelmez. Yüksek uyarı ile düşük çıktı birlikte bulunabilir. Çubuklar yalnız yönü gösterir, ölçekli değildir.",
  "İki düzey çubuğu: TSH ve T4. Sağlam eksende ikisi de olağan. İyot kısıtı adımında TSH çubuğu uzun (yüksek), T4 çubuğu kısa (düşük).",
);
const highOutput = scenarioFig(
  { name: "Otonom üretim", tsh: -1, t4: 1, note: "geri bildirim TSH'yi baskıladı" },
  "Düşünce deneyi: tiroit üst merkezlerden görece bağımsız fazla hormon üretiyor. Geri bildirim sağlamsa yüksek T4, TRH/TSH uyarısını baskılar: yüksek T4 ile düşük TSH birlikte. Ürünün artması onu uyaran basamakların da arttığı anlamına gelmez. Çubuklar yalnız yönü gösterir.",
  "İki düzey çubuğu: TSH ve T4. Sağlam eksende ikisi de olağan. Otonom üretim adımında T4 çubuğu uzun (yüksek), TSH çubuğu kısa (düşük).",
);

const calcitonin: FigureDef = {
  caption:
    "Kalsitonin şeması (özgün, ölçekli değil): yüksek kan kalsiyumuna karşı kemikte tutulma desteklenir ve çıkış sınırlanır; böbrekte kalsiyum ve fosfat geri emilimi azalır, idrarla atım artar; bağırsak emilimine katkısı hafiftir. Her organ ve madde için ayrı ok çizilir.",
  alt: "Ortada kalsitonin kutusu, üç dala ayrılıyor: kemik (tutulma artar, çıkış azalır), böbrek (kalsiyum ve fosfat geri emilimi azalır), bağırsak (emilime hafif azaltıcı katkı).",
  draw: () => {
    const els: El[] = [
      ...box(0, 2, 4.8, 0.7, "Kalsitonin (C hücresi)", { tone: "c", fill: "c", bold: true }),
      ...box(-3.6, 0, 2.8, 0.7, "Kemik"),
      ...box(0, 0, 2.8, 0.7, "Böbrek"),
      ...box(3.6, 0, 2.8, 0.7, "Bağırsak", { dash: true }),
      arrow(v(-0.8, 1.63), v(-3.0, 0.37), "c"),
      arrow(v(0, 1.63), v(0, 0.37), "c"),
      arrow(v(0.8, 1.63), v(3.0, 0.37), "muted", { dash: true }),
      txt(v(-3.6, -0.6), "tutulma ↑", "s", { small: true, bold: true, tone: "c" }),
      txt(v(-3.6, -1.15), "çıkış ↓", "s", { small: true, bold: true, tone: "c" }),
      txt(v(0, -0.6), "Ca geri emilim ↓", "s", { small: true, bold: true, tone: "c" }),
      txt(v(0, -1.15), "fosfat geri emilim ↓", "s", { small: true, bold: true, tone: "c" }),
      txt(v(3.6, -0.6), "emilim: hafif ↓", "s", { small: true, tone: "muted" }),
      ...pad(v(-5.2, 2.6), v(5.2, -1.9)),
    ];
    return { els, readout: ["Hedef: yüksek kan kalsiyumunu azaltmak.", "PTH böbrekte kalsiyumu korurken fosfat atımını artırabilir; iki hormonu tek artı-eksi çiftine indirme."] };
  },
};

/* ---------------- Paratiroit ---------------- */

const LOOP = ["Kan Ca ↓", "Paratiroit algılar", "PTH ↑", "Kemik, böbrek, D", "Kan Ca ↑", "PTH azalır"];
const pthLoop: FigureDef = {
  caption:
    "PTH döngüsü (özgün şema, ölçekli değil): kalsiyum düşünce paratiroit hücreleri bunu doğrudan algılar ve PTH artar; kemik, böbrek ve aktif D basamakları kana kalsiyum kazandırır; kalsiyum yükseldikçe PTH uyarısı azalır. Aradaki hipofiz basamağı yoktur.",
  alt: "Altı kutulu kapalı döngü (iki sütun): kan kalsiyumu azalır, paratiroit algılar, PTH artar, kemik-böbrek-aktif D etkileri, kan kalsiyumu artar, PTH azalır ve döngü başa döner.",
  steps: LOOP.map((_, i) => `${i + 1}. basamak`),
  draw: (_v, step) => {
    const P: [number, number][] = [[0, 2.4], [6.2, 2.4], [6.2, 1.2], [6.2, 0], [0, 0], [0, 1.2]];
    const els: El[] = [];
    LOOP.forEach((l, i) => {
      const on = i <= step;
      els.push(...box(P[i][0], P[i][1], 4.6, 0.7, l, { tone: i === step ? "a" : on ? "c" : "muted", text: on ? "ink" : "muted", bold: i === step }));
    });
    const t = (i: number): Tone => (i < step ? "c" : "muted");
    els.push(arrow(v(2.3, 2.4), v(3.9, 2.4), t(0)), arrow(v(6.2, 2.05), v(6.2, 1.55), t(1)), arrow(v(6.2, 0.85), v(6.2, 0.35), t(2)), arrow(v(3.9, 0), v(2.3, 0), t(3)), arrow(v(0, 0.35), v(0, 0.85), t(4)), arrow(v(0, 1.55), v(0, 2.05), t(5)));
    if (step === 5) els.push(txt(v(-2.5, 1.8), "(−)", "w", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-3.2, 3.0), v(8.7, -0.6)));
    return { els, readout: [`${step + 1}. ${LOOP[step]}`, "Negatif geri bildirim başlangıç sapmasını sınırlar; aynı PTH düzeyi her durumda aynı son miktarı garanti etmez."] };
  },
};

const kidneyCa: FigureDef = {
  caption:
    "Basit bölme modeli: filtreye gelen 10 kalsiyum biriminden 8'i geri emilirse 2, 9'u geri emilirse 1 birim çıkar. Süzülen, geri emilen ve atılan farklı büyüklüklerdir. Fosfat için ayrı veri ve ayrı hesap gerekir; PTH fosfat atımını artırabilir.",
  alt: "On küçük kare yan yana: geri emilen kalsiyum birimleri renkli, idrarla çıkanlar farklı renkte. Birinci adımda 8 geri emilen ve 2 çıkan, ikinci adımda 9 geri emilen ve 1 çıkan.",
  steps: ["8 geri emilim", "9 geri emilim"],
  draw: (_v, step) => {
    const re = step ? 9 : 8;
    return { els: [...tenUnits(re, "Ca"), ...pad(v(-4.4, 0.9), v(8.4, -1.0))], readout: [`10 − ${re} = ${10 - re} birim idrarla çıkar.`, "Kalsiyumun daha iyi korunması, fosfatın da aynı oranda korunacağını göstermez."] };
  },
};

const activeD: FigureDef = {
  caption:
    "PTH'nin bağırsak oku büyük ölçüde böbrekteki aktif D vitamini basamağından geçer: PTH → böbrekte aktif D → bağırsakta kalsiyum emilimi. Düşünce deneyinde böbrek basamağı engellenirse aynı PTH düzeyinden olağan bağırsak katkısı beklenmez (özgün şema, ölçekli değil).",
  alt: "Yukarıdan aşağı üç kutu: PTH, böbrekte aktif D oluşumu, bağırsakta kalsiyum emilimi; aralarında oklar. İkinci adımda böbrek basamağı çarpı işaretiyle engelli ve sonraki ok soluk.",
  steps: ["Sağlam zincir", "Böbrek basamağı engelli"],
  draw: (_v, step) => {
    const off = step === 1;
    const els: El[] = [
      ...box(0, 2.4, 4.6, 0.7, "PTH", { tone: "c", fill: "c", bold: true }),
      ...box(0, 1.2, 4.6, 0.7, "Böbrek: aktif D", { tone: off ? "warn" : "ink" }),
      ...box(0, 0, 4.6, 0.7, "Bağırsak: Ca emilimi", { tone: off ? "muted" : "ink", text: off ? "muted" : "ink" }),
      arrow(v(0, 2.05), v(0, 1.55), "c", { bold: true }),
      arrow(v(0, 0.85), v(0, 0.35), off ? "muted" : "c", { bold: !off, dash: off }),
    ];
    if (off) els.push(seg(v(-2.3, 1.55), v(-1.7, 0.85), { tone: "warn", bold: true }), seg(v(-2.3, 0.85), v(-1.7, 1.55), { tone: "warn", bold: true }), txt(v(2.5, 1.2), "etkinleştirme yok", "e", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-3.0, 2.9), v(7.6, -0.5)));
    return { els, readout: [off ? "Böbrek basamağı engelliyse bağırsak katkısı otomatik olarak sürmez." : "PTH → böbrekte aktif D → bağırsak emilimi: iki basamaklı yol.", "Gıdayla alınan miktar ve bağırsak işlevi de sonucu etkiler; doz önerisi değildir."] };
  },
};

const caBalance: FigureDef = {
  caption:
    "Varsayımsal kan havuzu: başlangıç 10 birim kalsiyum, kemikten +3, bağırsaktan +2, çıkış −4 → son 11 birim. Birimler aynı ölçekte kalsiyum miktarıdır; hormon miktarı ya da mg/dL değildir. Derişim miktarın hacme oranıdır; hacim değişirse aynı oranda artmayabilir.",
  alt: "Şelale grafiği: 10 birimlik başlangıç sütunu, üzerine 3 birim kemik ve 2 birim bağırsak eklemesi, ardından 4 birimlik çıkış düşüşü ve 11 birimlik son sütun.",
  draw: () => {
    const K = 0.28;
    const W = 1.2;
    const cols: [string, number, number, Tone][] = [["başlangıç", 0, 10, "b"], ["kemik +3", 10, 13, "c"], ["bağırsak +2", 13, 15, "c"], ["çıkış −4", 15, 11, "warn"], ["son", 0, 11, "a"]];
    const els: El[] = [seg(v(-0.3, 0), v(cols.length * 2.2 - 0.8, 0), { thin: true, tone: "muted" })];
    cols.forEach(([n, a, b, t], i) => {
      const x = i * 2.2;
      els.push(rect(x, Math.min(a, b) * K, x + W, Math.max(a, b) * K, { tone: t, fill: t, thin: true }));
      els.push(txt(v(x + W / 2, i % 2 ? -0.85 : -0.25), n, "s", { small: true, tone: t === "warn" ? "warn" : "ink" }));
      if (i === 0 || i === 4) els.push(txt(v(x + W / 2, b * K + 0.2), String(b), "n", { small: true, bold: true }));
    });
    els.push(...pad(v(-0.6, 4.9), v(10.4, -1.5)));
    return { els, readout: ["10 + 3 + 2 − 4 = 11 birim kalsiyum.", "Sürgü ya da şema değerleri verilen deney sayılarıdır; PTH'nin sabit katsayısı değildir."] };
  },
};

/* ---------------- Hipotalamus ---------------- */

const pituitary = (mode: 0 | 1, cut: boolean): FigureDef["draw"] => () => {
  const front = mode === 0;
  const els: El[] = [
    ...box(1.5, 3, 5.0, 0.9, "Hipotalamus", { bold: true }),
    ...box(0, 0, 2.4, 1.2, "Ön hipofiz", { tone: front ? "a" : "muted", text: front ? "ink" : "muted" }),
    ...box(3, 0, 2.4, 1.2, "Arka hipofiz", { tone: front ? "muted" : "a", text: front ? "muted" : "ink" }),
  ];
  const tp: Tone = front ? (cut ? "warn" : "a") : "muted";
  const ta: Tone = front ? "muted" : cut ? "warn" : "a";
  els.push(
    seg(v(0, 2.55), v(0, 0.6), { tone: tp, bold: front, dash: front && cut }),
    txt(v(-0.2, 1.6), "portal kan", "w", { small: true, bold: front, tone: tp }),
    seg(v(3, 2.55), v(3, 0.6), { tone: ta, bold: !front }),
    txt(v(3.2, 1.6), "akson", "e", { small: true, bold: !front, tone: ta }),
    arrow(v(0, -0.6), v(0, -1.5), front ? "c" : "muted"),
    arrow(v(3, -0.6), v(3, -1.5), front ? "muted" : cut ? "warn" : "c", { dash: !front && cut }),
    txt(v(0, -1.65), "TSH vb. → kan", "s", { small: true, tone: front ? "c" : "muted" }),
    txt(v(3, -1.65), cut && !front ? "salım engelli" : "ADH, oksitosin → kan", "s", { small: true, tone: front ? "muted" : cut ? "warn" : "c" }),
  );
  if (front && cut) els.push(seg(v(-0.35, 1.25), v(0.35, 0.85), { tone: "warn", bold: true }), seg(v(-0.35, 0.85), v(0.35, 1.25), { tone: "warn", bold: true }));
  els.push(...pad(v(-2.3, 3.7), v(5.9, -2.3)));
  const read = front
    ? [cut ? "Portal yol kesilince düzenleyici haber ön loba olağan ulaşmaz; engelleyici sinyalin kaybı da önemlidir." : "RH ve IH düzenleyicileri portal damarlarla ön hipofize ulaşır; TRH → TSH.", "Hipotalamik haberci ile ön hipofizin hormonu aynı molekül değildir."]
    : [cut ? "Salım engellense de sentez sürebilir: üretim ile kana çıkış ayrı basamaklardır." : "ADH ve oksitosin hipotalamusta sentezlenir, aksonla taşınıp arka hipofizde depolanır ve salınır.", "Arka hipofiz bu iki hormonu kendi hücrelerinde sentezlemez."];
  return { els, readout: read };
};
const portal: FigureDef = {
  caption:
    "Ön hipofize giden yol kandır (özgün şema, ölçekli değil): hipotalamusun salgılatıcı (RH) ve engelleyici (IH) düzenleyicileri portal damarlarla ön lobdaki hedef hücrelere gider. İkinci adımda portal yol kesilir: ön loba haber olağan ulaşmaz, arka lob yolu bundan ayrıdır.",
  alt: "Üstte hipotalamus, altta solda ön hipofiz, sağda arka hipofiz. Ön hipofize portal kan çizgisi, arka hipofize akson çizgisi iniyor. Ön lob vurgulu; ikinci adımda portal çizgi kesik ve çarpı işaretli.",
  steps: ["Portal yol", "Portal yol kesik"],
  draw: (x, step) => pituitary(0, step === 1)(x, step),
};
const axonal: FigureDef = {
  caption:
    "Arka hipofize giden yol sinirseldir (özgün şema, ölçekli değil): ADH ve oksitosin hipotalamik nöronlarda sentezlenir, akson boyunca arka hipofizdeki sinir uçlarına taşınır, orada depolanıp kana salınır. İkinci adımda salım engellenir: sentez sürebilir, kana çıkış durur.",
  alt: "Üstte hipotalamus, altta solda ön hipofiz, sağda arka hipofiz. Arka hipofize inen akson çizgisi vurgulu; ikinci adımda arka hipofizden kana çıkış oku kesik ve salım engelli yazıyor.",
  steps: ["Akson yolu", "Salım engelli"],
  draw: (x, step) => pituitary(1, step === 1)(x, step),
};

const adh: FigureDef = {
  caption:
    "ADH su üretmez; son nefron bölümlerinde suyun geri emilimini destekler. Seçili son bölüme gelen 10 su biriminin 8'i geri emilirse 2, 9'u geri emilirse 1 birim dışarı çıkar. Bunlar gerçek günlük litreler değil, verilen bir bölmenin kütle bilançosudur.",
  alt: "On küçük kare: geri emilen su birimleri renkli, idrara çıkanlar farklı renkte. Birinci adımda 8 geri emilen ve 2 çıkan, ikinci adımda ADH etkisi artmış: 9 geri emilen ve 1 çıkan.",
  steps: ["8 geri emilim", "9 geri emilim"],
  draw: (_v, step) => {
    const re = step ? 9 : 8;
    return { els: [...tenUnits(re, "su"), ...pad(v(-4.2, 0.9), v(8.4, -1.0))], readout: [`10 − ${re} = ${10 - re} birim su idrarla çıkar.`, "Suyun kaynağı filtrattır; ADH eksikliği ile böbreğin ADH'ye yanıtsızlığı farklı başlangıç kusurlarıdır."] };
  },
};

const feedbackKinds: FigureDef = {
  caption:
    "İleri ok ile geri bildirim döngüsü farklıdır (özgün şema, ölçekli değil). Negatif: T3/T4 üst merkezleri baskılar, değişim sınırlanır. Pozitif: rahim ağzı gerilmesi → oksitosin → kasılma → daha çok gerilme; döngü doğumla sonlanır. Adlar değer yargısı değil, değişimin yönüdür.",
  alt: "Birinci adımda TRH, TSH, T3/T4 kutuları ve T3/T4'ten başa dönen eksi ok. İkinci adımda gerilme, oksitosin, kasılma kutuları üçgen döngü yapıyor; döngünün dışında doğum ile durma yazıyor.",
  steps: ["Negatif geri bildirim", "Pozitif geri bildirim"],
  draw: (_v, step) => {
    const els: El[] = [];
    const neg = step === 0;
    const names = neg ? ["TRH", "TSH", "T3/T4"] : ["Gerilme", "Oksitosin", "Kasılma"];
    names.forEach((n, i) => els.push(...box(i * 3, 0, 2.2, 0.8, n, { bold: true })));
    els.push(arrow(v(1.1, 0), v(1.9, 0), "c", { bold: true }), arrow(v(4.1, 0), v(4.9, 0), "c", { bold: true }));
    els.push(seg(v(6, -0.4), v(6, -1.3), { tone: neg ? "warn" : "c", dash: neg }), seg(v(6, -1.3), v(0, -1.3), { tone: neg ? "warn" : "c", dash: neg }), arrow(v(0, -1.3), v(0, -0.45), neg ? "warn" : "c", { dash: neg }));
    els.push(txt(v(3, -1.55), neg ? "(−) baskılar: değişim sınırlanır" : "(+) güçlendirir: gerilme artar", "s", { small: true, bold: true, tone: neg ? "warn" : "c" }));
    if (!neg) els.push(txt(v(3, 1.0), "durma koşulu: doğum", "n", { small: true, tone: "a", bold: true }));
    els.push(...pad(v(-1.4, 1.6), v(7.4, -2.3)));
    return { els, readout: [neg ? "Sonuç önceki basamağı baskılar: negatif geri bildirim." : "Sonuç başlangıcı güçlendirir; sonlandırıcı olay döngüyü bitirir.", "Yalnız TRH'den TSH'ye artı oku görmek kapalı bir pozitif döngü göstermez."] };
  },
};

/* ---------------- Endokrin pankreas ---------------- */

const pancreasOutputs: FigureDef = {
  caption:
    "Pankreas karma bezdir (özgün şema, ölçekli değil): asiner hücrelerin enzimli salgısı kanalla duodenuma gider; Langerhans adacıklarındaki hücrelerin insülin ve glukagonu kana verilir. Aynı organ, iki ayrı çıkış yolu.",
  alt: "Ortada pankreas kutusu. Sol dal: asiner hücre, kanal, duodenum ve enzimler. Sağ dal: adacık, kan, insülin ve glukagon.",
  draw: () => {
    const els: El[] = [
      ...box(2.5, 2.2, 3.2, 0.8, "Pankreas", { bold: true }),
      ...box(0, 0.6, 3.0, 0.7, "Asiner hücreler", { tone: "b", fill: "b" }),
      ...box(5, 0.6, 3.0, 0.7, "Adacıklar", { tone: "c", fill: "c" }),
      ...box(0, -1.0, 3.0, 0.7, "Kanal → duodenum"),
      ...box(5, -1.0, 3.0, 0.7, "Kan"),
      arrow(v(1.6, 1.8), v(0.4, 0.97)),
      arrow(v(3.4, 1.8), v(4.6, 0.97)),
      arrow(v(0, 0.23), v(0, -0.63), "b"),
      arrow(v(5, 0.23), v(5, -0.63), "c"),
      txt(v(0, -1.6), "sindirim enzimleri", "s", { small: true, tone: "b" }),
      txt(v(5, -1.6), "insülin, glukagon", "s", { small: true, tone: "c" }),
      txt(v(0, 1.95), "ekzokrin", "w", { small: true, tone: "b" }),
      txt(v(5, 1.95), "endokrin", "e", { small: true, tone: "c" }),
      ...pad(v(-1.8, 2.8), v(6.8, -2.2)),
    ];
    return { els, readout: ["Enzimler kanalla lümene, hormonlar kana gider.", "Kan glikozunu düzenleyen hormonlar adacık hücrelerinden çıkar."] };
  },
};

const glucoseLoop: FigureDef = {
  caption:
    "Karşıt hormonlar ve negatif geri bildirim (özgün şema, ölçekli değil). Öğün sonrası: glikoz artışı insülini artırır; kas ve yağda alım, karaciğerde depolama artar, glikoz düşer. Açlık: glikoz düşüşü glukagonu artırır; karaciğer glikojen yıkımı ve glikoz üretimi kana destek verir. Başka hormonlar da dengeye katılır.",
  alt: "Dört kutulu döngü. Öğün adımında kan glikozu artar, insülin, kas-yağ alımı ve karaciğer depolama, kan glikozu azalır. Açlık adımında kan glikozu azalır, glukagon, karaciğer glikojen yıkımı, kan glikozu artar.",
  steps: ["Öğün sonrası", "Açlık"],
  draw: (_v, step) => {
    const meal = step === 0;
    const N = meal ? ["Kan glikozu ↑", "İnsülin ↑", "Kas, yağ alımı; karaciğer depolar", "Kan glikozu ↓"] : ["Kan glikozu ↓", "Glukagon ↑", "Karaciğer: glikojen yıkımı", "Kan glikozu ↑"];
    const t: Tone = meal ? "b" : "c";
    const els: El[] = [
      ...box(0, 1.5, 3.0, 0.75, N[0], { bold: true }),
      ...box(5, 1.5, 3.0, 0.75, N[1], { tone: t, fill: t, bold: true }),
      ...box(5.6, -0.3, 5.2, 0.75, N[2]),
      ...box(0, -0.3, 3.0, 0.75, N[3], { bold: true }),
      arrow(v(1.5, 1.5), v(3.5, 1.5), t, { bold: true }),
      arrow(v(5, 1.12), v(5, 0.08), t, { bold: true }),
      arrow(v(2.95, -0.3), v(1.5, -0.3), t, { bold: true }),
      arrow(v(0, 0.08), v(0, 1.12), "warn", { dash: true }),
      txt(v(-0.2, 0.6), "(−)", "w", { small: true, bold: true, tone: "warn" }),
      ...pad(v(-1.9, 2.1), v(8.5, -0.9)),
    ];
    return { els, readout: [meal ? "Artış insülin yanıtıyla sınırlanır." : "Düşüş glukagonun karaciğer katkısıyla sınırlanır; kas glikojeni kana serbest glikoz vermez.", "Öğün ve açlık iki bağlamdır; hormonlar yalnız açık-kapalı anahtarlar değildir."] };
  },
};

const STORE = 5;
const liverStore: FigureDef = {
  caption:
    "Depo sınırlıdır: varsayımsal karaciğer deposundan istenen 5 glikoz eşdeğeri, depodakinden fazla olamaz; aktarılan = en küçük(depo, 5). Bölümün örneğinde depo 3 → en çok 3 birim. Bu modelde glukoneogenez gibi başka yollar eklenmez.",
  alt: "Solda karaciğer deposu sütunu, sağda istenen 5 birim çizgisi ve aktarılan birimler sütunu. Sürgüyle depo değiştikçe aktarılan sütun deponun ya da 5'in küçüğü kadar oluyor.",
  param: { label: "Karaciğer deposu", min: 0, max: 8, step: 1, init: 3, unit: " birim" },
  draw: (d) => {
    const moved = Math.min(d, STORE);
    const K = 0.45;
    const els: El[] = [
      seg(v(-0.4, 0), v(5.4, 0), { thin: true, tone: "muted" }),
      rect(0, 0, 1.4, Math.max(d, 0.001) * K, { tone: "b", fill: "b", thin: true }),
      rect(3.4, 0, 4.8, Math.max(moved, 0.001) * K, { tone: "a", fill: "a", thin: true }),
      seg(v(3.1, STORE * K), v(5.1, STORE * K), { tone: "warn", dash: true }),
      txt(v(5.2, STORE * K), "istenen 5", "e", { small: true, bold: true, tone: "warn" }),
      txt(v(0.7, -0.25), `depo ${d}`, "s", { small: true, bold: true, tone: "b" }),
      txt(v(4.1, -0.25), `aktarılan ${moved}`, "s", { small: true, bold: true, tone: "a" }),
      arrow(v(1.6, 1.0), v(3.2, 1.0), "muted"),
      ...pad(v(-0.6, 8 * K + 0.4), v(7.4, -0.9)),
    ];
    return { els, readout: [`Aktarılan = en küçük(${d}, 5) = ${moved}.`, d < STORE ? `Eksik ${STORE - d} birim bu depodan karşılanamaz.` : "Depo isteği karşılıyor; kalan depo " + (d - STORE) + " birim."] };
  },
};

const UNITS = ["90 mg/dL", "900 mg/L", "0,9 g/L", "0,005 mol/L", "5 mmol/L"];
const OPS = ["× 10 (1 L = 10 dL)", "÷ 1000 (mg → g)", "÷ 180 g/mol", "× 1000 (mol → mmol)"];
const unitChain: FigureDef = {
  caption:
    "Aynı derişim, farklı birim: 90 mg/dL (100 mL'de 90 mg) → 900 mg/L → 0,9 g/L → 0,9 ÷ 180 = 0,005 mol/L → 5 mmol/L. Her adımda birimi yaz. Bu bir tanı hesabı değildir; toplam miktar için ayrıca hacim gerekir.",
  alt: "Yukarıdan aşağı beş kutu: 90 mg/dL, 900 mg/L, 0,9 g/L, 0,005 mol/L, 5 mmol/L; aralarındaki oklarda yapılan işlem yazıyor.",
  draw: () => {
    const els: El[] = [];
    UNITS.forEach((u, i) => {
      els.push(...box(0, -i * 1.2, 3.0, 0.7, u, { bold: true, tone: i === 0 || i === 4 ? "c" : "ink", fill: i === 0 || i === 4 ? "c" : undefined }));
      if (i < 4) {
        els.push(arrow(v(0, -i * 1.2 - 0.37), v(0, -i * 1.2 - 0.83), "muted"));
        els.push(txt(v(0.3, -i * 1.2 - 0.6), OPS[i], "e", { small: true, tone: "muted" }));
      }
    });
    els.push(...pad(v(-1.8, 0.6), v(5.6, -5.4)));
    return { els, readout: [`90 × 10 = 900 mg/L; 0,9 ÷ 180 = ${fmt(0.9 / 180, 3)} mol/L = 5 mmol/L.`, "Yalnız 90 sayısını alıp her birimde aynı kalıyormuş gibi kullanma."] };
  },
};

export const biologyFigures059Endocrine: Record<string, Record<string, FigureDef>> = {
  "endokrin-tiroit": {
    "Boyundaki bezin iki farklı hormon yolu": twoRoutes,
    "Üç merkezli HPT ekseni": hpt,
    "Çıktı düşükken uyarı neden yüksek olabilir?": lowOutput,
    "Çıktı yüksekken uyarı neden azalabilir?": highOutput,
    "Kalsitoninin böbrek ve kemik oklarını birlikte gör": calcitonin,
  },
  "endokrin-paratiroit": {
    "Kanda azalma, PTH’de artış ve geri dönüş": pthLoop,
    "Böbrekte kalsiyum korunur, fosfat atımı artabilir": kidneyCa,
    "Bağırsak oku neden aktif D basamağından geçer?": activeD,
    "Miktar bilançosu ile derişim ölçümünü ayır": caBalance,
  },
  "endokrin-hipotalamus": {
    "Ön hipofize giden yol: portal kan": portal,
    "Arka hipofize giden yol: akson ve sinir ucu": axonal,
    "ADH su yaratmaz, böbrekte suyu korumaya katkı verir": adh,
    "İleri uyarı oku ile geri bildirim döngüsünü ayır": feedbackKinds,
  },
  "endokrin-pankreas": {
    "Aynı organın iki farklı çıkışı": pancreasOutputs,
    "Glukagon: karaciğerden kana destek, sınırlı depo": liverStore,
    "Karşıt hormonlar ve negatif geri bildirim": glucoseLoop,
    "Birim dönüşümünde madde ve hacmi koru": unitChain,
  },
};
