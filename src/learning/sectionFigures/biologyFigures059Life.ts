import { circle, fmt, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { arrow, axes, box, curve, pad, rect, vmark } from "./biologyFigures059Kit";

/*
 * AYT Biyoloji · Popülasyon ve komünite ekolojisi, embriyonik gelişim ve
 * gametogenez (Forge059). Sayılar bölüm metinlerindedir: 100 + 20 + 5 − 8 − 7
 * = 110; 100 → 110 ile 1.000 → 1.010 (aynı +10, %10 ve %1); Tip II örneğinde
 * yılda %10 ölüm: 1.000 → 900 → 810; segmentasyon 1, 2, 4, 8, 16; birincil
 * spermatosit 46 kromozom, 92 kromatit, 4C → mayoz I sonrası n, 2C → mayoz II
 * sonrası n, 1C. Büyüme, hayatta kalma, niş ve av–avcı eğrileri nitel
 * biçimlerdir, ölçekli değildir; lojistik eğri boyutsuz N/K ile çizilir.
 */

/* ---------------- Popülasyon ---------------- */

const FLOWS: [string, number, Tone][] = [["doğum +20", 20, "c"], ["içe göç +5", 5, "c"], ["ölüm −8", -8, "warn"], ["dışa göç −7", -7, "warn"]];
const balance: FigureDef = {
  caption:
    "Birey bilançosu: Nson = Nilk + doğum + içe göç − ölüm − dışa göç. Örnek: 100 + 20 + 5 − 8 − 7 = 110; toplam değişim +10, başlangıca göre %10. Akışlar aynı zaman aralığı ve alan için sayılır. Grafik ölçeklidir, düşey eksen 90'dan başlar.",
  alt: "Şelale grafiği: 100 bireylik başlangıç sütunu, doğum +20 ve içe göç +5 yükselen basamaklar, ölüm −8 ve dışa göç −7 inen basamaklar, 110 bireylik son sütun. Düşey eksen 90'dan başlıyor.",
  draw: () => {
    const B = 90;
    const K = 0.09;
    const y = (n: number) => (n - B) * K;
    const els: El[] = [seg(v(-0.3, 0), v(11.9, 0), { thin: true, tone: "muted" }), txt(v(-0.4, 0), "90", "w", { small: true, tone: "muted" })];
    els.push(rect(0, 0, 1.1, y(100), { tone: "b", fill: "b", thin: true }), txt(v(0.55, -0.25), "ilk 100", "s", { small: true, bold: true }));
    let n = 100;
    FLOWS.forEach(([name, d, t], i) => {
      const x = (i + 1) * 2.1;
      els.push(rect(x, y(n), x + 1.1, y(n + d), { tone: t, fill: t, thin: true }));
      els.push(txt(v(x + 0.55, i % 2 ? -0.25 : -0.85), name, "s", { small: true, tone: t }));
      n += d;
    });
    els.push(rect(10.5, 0, 11.6, y(110), { tone: "a", fill: "a", thin: true }), txt(v(11.05, -0.85), "son 110", "s", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-1.2, y(126) + 0.3), v(12.2, -1.4)));
    return { els, readout: ["100 + 20 + 5 − 8 − 7 = 110; değişim +10 = %10.", "Başlangıç sıfırsa yüzde değişim bu paydayla hesaplanamaz."] };
  },
};

const amountRate: FigureDef = {
  caption:
    "Artış miktarı ile artış oranı farklıdır (bölüm örneği, çubuklar ölçekli): 100'den 110'a ve 1.000'den 1.010'a çıkış aynı +10 birey, ama oran %10 ve %1. Oran düşse de pozitifse nüfus artmaya devam eder, yalnız yavaşlar.",
  alt: "İki satır. Her satırda başlangıç çubuğu ve ucuna eklenen 10 bireylik renkli parça. Üst satır 100 + 10 (%10), alt satır 1.000 + 10 (%1); eklenen parçalar aynı uzunlukta, başlangıç çubukları çok farklı.",
  draw: () => {
    const K = 0.008;
    const els: El[] = [];
    [[100, 1.2], [1000, 0]].forEach(([n, yy]) => {
      els.push(rect(0, yy, n * K, yy + 0.6, { tone: "b", fill: "b", thin: true }), rect(n * K, yy, (n + 10) * K + 0.06, yy + 0.6, { tone: "a", fill: "a", thin: true }));
      els.push(txt(v((n + 10) * K + 0.25, yy + 0.3), `${fmt(n, 0)} → ${fmt(n + 10, 0)}: +10 = %${fmt((10 / n) * 100, 0)}`, "e", { small: true, bold: true }));
    });
    els.push(...pad(v(-0.3, 2.2), v(14.6, -0.4)));
    return { els, readout: ["Aynı miktar (+10), farklı oran (%10 ve %1): payda farklı.", "Doğal değişim = doğum − ölüm; toplam değişim buna net göç eklenerek bulunur."] };
  },
};

const survival: FigureDef = {
  caption:
    "Hayatta kalma eğrisi bir doğum grubunu (kohort) izler. Tip I'de ölüm ileri yaşta artar, Tip III'te erken kayıp fazladır, Tip II'de yaş başına ölüm olasılığı yaklaşık sabittir (nitel eğriler, ölçekli değil). İkinci adım: yılda kalanların %10'u ölürse 1.000 → 900 → 810; kayıplar 100 ve 90, eşit değil.",
  alt: "Birinci adımda yaş ekseninde üç eğri: Tip I uzun süre yüksek kalıp sonda düşüyor, Tip II düzgün azalıyor, Tip III başta hızla düşüp sonra yatıklaşıyor. İkinci adımda 1.000, 900 ve 810 bireylik üç sütun ve aralarındaki 100 ile 90 kayıp.",
  steps: ["Üç tip", "Tip II örneği"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(...axes(6.4, 4.4, "yaş", "kalan"));
      els.push(curve((x) => 4 * (1 - (x / 6) ** 6), 0, 6, 40, { tone: "b", bold: true }));
      els.push(curve((x) => 4 * Math.exp(-0.45 * x), 0, 6, 40, { tone: "c", bold: true }));
      els.push(curve((x) => 3.4 * Math.exp(-2.5 * x) + 0.6 * Math.exp(-0.3 * x), 0, 6, 60, { tone: "warn", bold: true }));
      els.push(txt(v(4.4, 3.65), "Tip I", "s", { small: true, bold: true, tone: "b" }), txt(v(2.6, 1.55), "Tip II", "ne", { small: true, bold: true, tone: "c" }), txt(v(0.75, 0.55), "Tip III", "ne", { small: true, bold: true, tone: "warn" }));
      els.push(...pad(v(-0.8, 4.8), v(6.8, -0.8)));
    } else {
      const K = 0.004;
      [1000, 900, 810].forEach((n, i) => {
        const x = i * 2.0;
        els.push(rect(x, 0, x + 1.2, n * K, { tone: "c", fill: "c", thin: true }), txt(v(x + 0.6, n * K + 0.2), fmt(n, 0), "n", { small: true, bold: true }), txt(v(x + 0.6, -0.25), `${i}. yıl`, "s", { small: true, tone: "muted" }));
      });
      els.push(txt(v(1.6, 4.5), "−100", "c", { small: true, bold: true, tone: "warn" }), txt(v(3.6, 4.1), "−90", "c", { small: true, bold: true, tone: "warn" }));
      els.push(...pad(v(-0.5, 5.0), v(5.6, -0.8)));
    }
    return { els, readout: [step ? "Her yıl kalanların %10'u: 1.000 × 0,9 = 900, 900 × 0,9 = 810." : "Eksen türünü oku: logaritmik eksende eşit oransal kayıp düz çizgi verebilir.", "Eğri tek bir doğum grubunu izler; farklı kohortlar karıştırılmaz."] };
  },
};

const logistic: FigureDef = {
  caption:
    "Lojistik model dN/dt = rN(1 − N/K), boyutsuz çizim: yatay eksen N/K, düşey eksen dN/dt ÷ (rK) = x(1 − x). Mutlak artış N = K/2'de en yüksektir (0,25 rK), N = K'da sıfırdır, N > K için negatiftir. Sürgüyle N/K'yı değiştir; değer formülden hesaplanır.",
  alt: "Ters U biçimli eğri: yatay eksende N/K 0'dan 1,2'ye, eğri 0,5'te tepe yapıyor, 1'de sıfırı kesiyor ve sonra negatife iniyor. Sürgüyle eğri üzerinde hareket eden bir nokta.",
  param: { label: "N / K", min: 0, max: 1.2, step: 0.05, init: 0.25 },
  draw: (x) => {
    const X = 6;
    const Y = 12;
    const f = (u: number) => u * (1 - u);
    const els: El[] = [
      seg(v(0, 0), v(1.25 * X, 0), { thin: true, tone: "muted" }),
      seg(v(0, -0.25 * Y), v(0, 0.32 * Y), { thin: true, tone: "muted" }),
      curve((u) => Y * f(u / X), 0, 1.2 * X, 60, { tone: "b", bold: true }),
      vmark(0.5 * X, 0, Y * 0.25, "c"),
      vmark(X, -0.6, 0.6, "muted"),
      txt(v(0.5 * X, -0.25), "K/2", "s", { small: true, bold: true, tone: "c" }),
      txt(v(X + 0.1, -0.7), "K", "s", { small: true, bold: true }),
      txt(v(1.25 * X, 0.25), "N/K", "nw", { small: true, tone: "muted" }),
      txt(v(0.15, 0.32 * Y), "dN/dt", "e", { small: true, tone: "muted" }),
      circle(v(x * X, Y * f(x)), 0.14, { tone: "a", fill: "a" }),
      ...pad(v(-0.6, 0.36 * Y), v(1.3 * X, -1.4)),
    ];
    const r = f(x);
    return { els, readout: [`N/K = ${fmt(x, 2)} → dN/dt = ${fmt(r, 4)} × rK.`, r > 0 ? "Pozitif: popülasyon büyüyor." : r === 0 ? "Sıfır: net anlık değişim yok." : "Negatif: N > K, popülasyon azalıyor."] };
  },
};

const jVsS: FigureDef = {
  caption:
    "Üstel model dN/dt = rN: aynı r ile N büyüdükçe mutlak artış büyür ve J biçimi oluşur. Lojistik model K'ya yaklaştıkça yavaşlar ve S biçimi verir (nitel eğriler, ölçekli değil). Sınırsız kaynak doğada sonsuza kadar sürmez.",
  alt: "Zaman ekseninde iki eğri: giderek dikleşen J biçimli üstel eğri ve önce hızlanıp sonra kesik K çizgisine yaklaşan S biçimli lojistik eğri.",
  draw: () => {
    const K = 3.6;
    const els: El[] = [
      ...axes(7.4, 4.8, "zaman", "N"),
      seg(v(0, K), v(7, K), { thin: true, dash: true, tone: "muted" }),
      txt(v(7.1, K), "K", "e", { small: true, bold: true }),
      curve((t) => Math.min(4.6, 0.25 * Math.exp(0.9 * t)), 0, 3.23, 40, { tone: "warn", bold: true }),
      curve((t) => K / (1 + (K / 0.25 - 1) * Math.exp(-0.9 * t)), 0, 7, 50, { tone: "b", bold: true }),
      txt(v(3.1, 4.6), "üstel (J)", "w", { small: true, bold: true, tone: "warn" }),
      txt(v(5.6, K - 0.3), "lojistik (S)", "s", { small: true, bold: true, tone: "b" }),
      ...pad(v(-0.5, 5.2), v(7.8, -0.8)),
    ];
    return { els, readout: ["Üstelde kişi başına hız sabit, toplam hız N ile büyür.", "r birim ve model belirtilmeden tek başına anlam taşımaz."] };
  },
};

/* ---------------- Komünite ---------------- */

const bell = (m: number, s: number, h: number) => (x: number) => h * Math.exp(-((x - m) ** 2) / (2 * s * s));
const niche: FigureDef = {
  caption:
    "Kaynak kullanım eğrileri (nitel, ölçekli değil): aynı sınırlı kaynağı aynı biçimde kullanan iki tür sabit koşulda uzun süre tam örtüşen nişlerle bir arada kalmakta zorlanır. Kaynak paylaşımı (farklı kat, farklı saat) örtüşmeyi azaltır ve birlikte yaşamaya olanak verebilir.",
  alt: "Kaynak ekseninde iki çan eğrisi. Birinci adımda iki eğri neredeyse tamamen üst üste. İkinci adımda eğriler ayrılmış, yalnız kenarlarda küçük bir örtüşme kalmış.",
  steps: ["Tam örtüşme", "Niş ayrışması"],
  draw: (_v, step) => {
    const m2 = step ? 4.6 : 3.2;
    const els: El[] = [
      ...axes(7.4, 3.0, "kaynak (ör. besin boyu)", "kullanım"),
      curve(bell(2.8, 0.8, 2.2), 0, 7, 60, { tone: "b", bold: true }),
      curve(bell(m2, 0.8, 2.2), 0, 7, 60, { tone: "warn", bold: true, dash: true }),
      txt(v(2.8, 2.45), "A türü", "n", { small: true, bold: true, tone: "b" }),
      txt(v(m2 + 0.9, 1.8), "B türü", "e", { small: true, bold: true, tone: "warn" }),
      ...pad(v(-0.5, 3.4), v(7.8, -0.8)),
    ];
    return { els, readout: [step ? "Kaynak paylaşımı örtüşmeyi azaltır: farklı katlarda ya da saatlerde beslenme." : "Tam örtüşmede koşula göre bir tür ötekini azaltabilir ya da yerel olarak dışlayabilir.", "Rekabet −/− etkidir; her iki türün de mutlaka yok olması demek değildir."] };
  },
};

const predPrey: FigureDef = {
  caption:
    "Av–avcı zaman grafiği (nitel, ölçekli değil): av artınca avcının besini artar, avcının tepe noktası avı gecikmeli izleyebilir; avcı artışı ardından av üzerindeki baskıyı değiştirir. Gerçek çiftlerde hastalık, başka besin, iklim ve göç de etkiler; kusursuz döngü beklenmez.",
  alt: "Zaman ekseninde iki dalgalı eğri: av eğrisi daha yüksek, avcı eğrisi daha alçak ve tepeleri avın tepelerinden biraz sonra geliyor. Kesik çizgiler bir av tepesi ile onu izleyen avcı tepesini işaretliyor.",
  draw: () => {
    const P = 4.2;
    const prey = (t: number) => 2.4 + 1.2 * Math.sin((2 * Math.PI * t) / P);
    const pred = (t: number) => 1.1 + 0.6 * Math.sin((2 * Math.PI * (t - 0.9)) / P);
    const els: El[] = [
      ...axes(9.0, 4.2, "zaman", "birey sayısı"),
      curve(prey, 0, 8.6, 80, { tone: "c", bold: true }),
      curve(pred, 0, 8.6, 80, { tone: "warn", bold: true, dash: true }),
      vmark(P / 4, 0, 3.6, "c"),
      vmark(P / 4 + 0.9, 0, 1.7, "warn"),
      txt(v(P / 4 + 0.45, -0.25), "gecikme", "s", { small: true, tone: "muted" }),
      txt(v(6.9, 3.75), "av", "e", { small: true, bold: true, tone: "c" }),
      txt(v(7.6, 1.85), "avcı", "e", { small: true, bold: true, tone: "warn" }),
      ...pad(v(-0.5, 4.6), v(9.4, -0.9)),
    ];
    return { els, readout: ["Avcı tepesi av tepesini gecikmeli izleyebilir.", "Gözlenen zaman ilişkisi ile nedensel mekanizmayı birlikte değerlendir."] };
  },
};

const SIGNS: [string, string, string][] = [
  ["+ / +", "mutualizm", "ikisi de yararlanır"],
  ["+ / 0", "kommensalizm", "birinde net etki ölçülmedi"],
  ["− / −", "rekabet", "ortak sınırlı kaynak"],
  ["+ / −", "avcılık, parazitlik", "ayırmak için süre ve tüketim biçimi"],
];
const signTable: FigureDef = {
  caption:
    "İlişki işaretleri kontrol koşuluna göre tanımlanır (nitel özet tablo): her türün ilişkisiz kontroldeki üreme ya da yaşamasına göre değişimi +, − ya da 0 yazılır. 0, seçilen ölçütte belirgin net etki gözlenmedi demektir. +/− örüntüsü avcılıkta da parazitlikte de görülür.",
  alt: "Dört satırlı tablo: + / + mutualizm, + / 0 kommensalizm, − / − rekabet, + / − avcılık ve parazitlik; her satırda kısa açıklama.",
  draw: () => {
    const els: El[] = [];
    SIGNS.forEach(([s, n, d], i) => {
      const y = -i * 1.4;
      els.push(txt(v(0, y), s, "c", { bold: true, tone: i >= 2 ? "warn" : "c" }), txt(v(1.2, y + 0.25), n, "e", { small: true, bold: true }), txt(v(1.2, y - 0.3), d, "e", { small: true, tone: "muted" }));
    });
    els.push(...pad(v(-1.0, 0.8), v(8.6, -4.8)));
    return { els, readout: ["Ölçüt: kontrol grubuna göre üreme, yaşama ya da uygun başka gösterge.", "Bir birey sayımı ilişkinin bütün mekanizmasını açığa çıkarmaz."] };
  },
};

const succession: FigureDef = {
  caption:
    "Süksesyonun başlangıcı (özgün şema, ölçekli değil): birincil süksesyon toprak oluşmamış çıplak yüzeyde başlar; liken ve yosun gibi öncüler aşınma ve organik birikime katkı verir. İkincil süksesyonda toprak, tohum bankası ya da canlı kalıntıları korunmuştur. Her alan aynı sırayla zorunlu ormana dönmez.",
  alt: "İki dikey zaman sütunu. Solda birincil: çıplak kaya, liken ve yosun, otsu bitkiler, çalı ve olası sonraki topluluklar. Sağda ikincil: bozulmuş alan ve korunmuş toprak ile tohum bankası, otsu bitkiler, çalı ve olası sonraki topluluklar.",
  steps: ["Birincil", "İkincil"],
  draw: (_v, step) => {
    const cols: [string[], number, boolean, string][] = [
      [["Çıplak kaya", "Liken, yosun", "Otsu bitkiler", "Çalılar…"], 0, step === 0, "birincil"],
      [["Toprak, tohum bankası", "Otsu bitkiler", "Çalılar…"], 4.8, step === 1, "ikincil"],
    ];
    const els: El[] = [];
    cols.forEach(([items, x, on, name], r) => {
      els.push(txt(v(x, 1.0), name, "n", { small: true, bold: true, tone: on ? "a" : "muted" }));
      items.forEach((it, i) => {
        const y = -(i + (r === 1 ? 1 : 0)) * 1.2;
        els.push(...box(x, y, 4.3, 0.7, it, { tone: on ? (i === 0 ? "a" : "c") : "muted", text: on ? "ink" : "muted", bold: on && i === 0 }));
        if (i < items.length - 1) els.push(arrow(v(x, y - 0.37), v(x, y - 0.83), on ? "c" : "muted"));
      });
    });
    els.push(arrow(v(-2.5, 0.4), v(-2.5, -3.8), "muted"), txt(v(-2.7, -1.8), "zaman", "w", { small: true, tone: "muted" }));
    els.push(...pad(v(-3.9, 1.5), v(7.1, -4.2)));
    return { els, readout: [step ? "İkincil: önceki topluluk bozulmuş ama toprak ve tohumlar korunmuş; terk edilmiş tarla örneği." : "Birincil: toprak yokken öncüler yüzeyi hazırlar.", "İklim, toprak, bozucu olay ve yayılabilen türler gelişim yolunu değiştirir."] };
  },
};

/* ---------------- Embriyonik gelişim ---------------- */

const CELLS = [1, 2, 4, 8, 16];
const cleavage: FigureDef = {
  caption:
    "Segmentasyon modeli: eş zamanlı ve kayıpsız varsayımda her tur hücre sayısını iki katına çıkarır: 1, 2, 4, 8, 16. Dış sınırın hacmi yaklaşık korunur, her blastomerin ortalama hacmi küçülür. Gerçekte bölünmeler eş zamanlılığını yitirebilir (özgün şema, ölçekli değil).",
  alt: "Aynı büyüklükte bir dış daire içinde adım adım 1, 2, 4, 8 ve 16 küçük daire; hücreler çoğaldıkça her biri küçülüyor.",
  steps: CELLS.map((n) => `${n} hücre`),
  draw: (_v, step) => {
    const n = CELLS[step];
    const R = 2.0;
    const els: El[] = [circle(v(0, 0), R, { tone: "muted", thin: true })];
    const grid: Record<number, V[]> = {
      1: [v(0, 0)],
      2: [v(-0.95, 0), v(0.95, 0)],
      4: [v(-0.7, 0.7), v(0.7, 0.7), v(-0.7, -0.7), v(0.7, -0.7)],
      8: [...[-1.2, -0.4, 0.4, 1.2].map((x) => v(x, 0.5)), ...[-1.2, -0.4, 0.4, 1.2].map((x) => v(x, -0.5))],
      16: [-1.05, -0.35, 0.35, 1.05].flatMap((x) => [-1.05, -0.35, 0.35, 1.05].map((y) => v(x, y))),
    };
    const r = { 1: 1.85, 2: 0.9, 4: 0.65, 8: 0.38, 16: 0.33 }[n] ?? 0.3;
    for (const c of grid[n]) els.push(circle(c, r, { tone: "c", fill: "c" }));
    els.push(txt(v(2.4, 0), `${n} blastomer`, "e", { small: true, bold: true }), ...pad(v(-2.4, 2.4), v(5.4, -2.4)));
    return { els, readout: [`${step} tur bölünme → 2^${step} = ${n} hücre (model).`, "Mitoz yeni kromozom takımı icat etmez; blastomerler aynı diploit takımı taşır."] };
  },
};

const blastocyst: FigureDef = {
  caption:
    "Moruladan blastosiste (özgün şema, ölçekli değil): sıkı hücre kitlesi (morula) içinde sıvı dolu boşluk gelişir. Dış tabaka trofoblast, iç hücre kitlesi embriyonun kendisini oluşturacak hücrelerin temel kaynağıdır. Boşluk ile iç hücre kitlesi aynı yapı değildir.",
  alt: "Birinci adımda daire içinde sık paketlenmiş hücreler: morula. İkinci adımda tek sıra hücreden oluşan dış halka (trofoblast), bir kenarda toplanmış iç hücre kitlesi ve ortada boş sıvı boşluğu.",
  steps: ["Morula", "Blastosist"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(circle(v(0, 0), 1.75, { tone: "muted", thin: true }));
      for (const x of [-1.05, -0.35, 0.35, 1.05]) for (const y of [-1.05, -0.35, 0.35, 1.05]) if (Math.hypot(x, y) < 1.4) els.push(circle(v(x, y), 0.33, { tone: "c", fill: "c" }));
      els.push(txt(v(1.9, 0), "morula", "e", { small: true, bold: true }));
    } else {
      for (let i = 0; i < 18; i++) {
        const a = (2 * Math.PI * i) / 18;
        els.push(circle(v(1.7 * Math.cos(a), 1.7 * Math.sin(a)), 0.27, { tone: "b", fill: "b" }));
      }
      for (const p of [v(-0.9, 0.6), v(-0.9, -0.1), v(-0.35, 0.95), v(-0.4, 0.3), v(-1.1, -0.75)]) els.push(circle(p, 0.3, { tone: "a", fill: "a" }));
      els.push(txt(v(2.2, 1.2), "trofoblast", "e", { small: true, bold: true, tone: "b" }), txt(v(0.7, -0.3), "boşluk", "c", { small: true, tone: "muted" }), txt(v(-2.2, 1.3), "iç hücre kitlesi", "w", { small: true, bold: true, tone: "a" }));
    }
    els.push(...pad(v(-5.2, 2.3), v(4.8, -2.3)));
    return { els, readout: [step ? "Trofoblast dışta, iç hücre kitlesi içte; aradaki sıvı boşluk ayrı bir yapıdır." : "Morula: sıkı hücre kitlesi görünümündeki erken evre.", "Kök hücre potansiyeli evre ve bağlamla birlikte değerlendirilir."] };
  },
};

const GERM: [string, Tone, string[]][] = [
  ["Ektoderm", "b", ["epidermis", "sinir sistemi"]],
  ["Mezoderm", "warn", ["kas, kemik, bağ doku", "kan ve damarlar", "böbrek, gonad"]],
  ["Endoderm", "c", ["sindirim, solunum epiteli", "karaciğer, pankreas salgı hücreleri"]],
];
const germLayers: FigureDef = {
  caption:
    "Üç embriyonik tabakanın başlıca katkıları (nitel özet tablo). Bu eşlemeler bir organın bütün hücrelerinin tek tabakadan geldiğini göstermez: bağırsak epiteli endoderm kökenlidir, duvarındaki düz kas mezoderm katkısıdır. Soru organı mı, belirli bir doku ya da hücreyi mi soruyor, ayır.",
  alt: "Üç satır: ektoderm yanında epidermis ve sinir sistemi; mezoderm yanında kas-kemik-bağ doku, kan ve damarlar, böbrek ve gonad; endoderm yanında sindirim ve solunum epiteli, karaciğer ve pankreas salgı hücreleri. Altta bağırsak örneği: epitel endoderm, düz kas mezoderm.",
  draw: () => {
    const els: El[] = [];
    let y = 0;
    GERM.forEach(([n, t, items]) => {
      els.push(...box(0, y, 3.0, 0.7, n, { tone: t, fill: t, bold: true }));
      items.forEach((it, k) => els.push(txt(v(1.8, y + 0.15 - k * 0.55), it, "e", { small: true })));
      y -= Math.max(1.2, items.length * 0.55 + 0.5);
    });
    els.push(seg(v(-1.6, y + 0.3), v(8.6, y + 0.3), { thin: true, tone: "muted" }));
    els.push(txt(v(-1.5, y - 0.1), "bağırsak: epitel ← endoderm,", "e", { small: true, bold: true, tone: "a" }), txt(v(-1.5, y - 0.65), "düz kas ← mezoderm", "e", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-1.9, 0.6), v(8.9, y - 1.1)));
    return { els, readout: ["Ektoderm: epidermis ve sinir sistemi; endoderm: kanal epitelleri; mezoderm: geri kalan çoğu doku.", "Farklı görevler farklı gen ifadesiyle açıklanır, farklı kromozom sayısıyla değil."] };
  },
};

const placenta: FigureDef = {
  caption:
    "Plasentada iki kan yolu karışmadan yaklaşır (özgün şema, ölçekli değil): fetal damarlar villusların içinde, anne kanı çevredeki aralıklarda. O₂ ve besinler fetüse, CO₂ ve birçok atık anneye geçer; IgG gibi bazı antikorlar anneden fetüse geçer. Plasenta her zararlı maddeyi durduran kusursuz bir duvar değildir.",
  alt: "Alt kısımda anne kanı aralığı, içine sarkan parmak biçimli fetal villus; villusun içinde fetal kılcal damar. Anne kanından villusa O₂, besin ve IgG okları; villustan anne kanına CO₂ ve atık okları.",
  draw: () => {
    const villus: V[] = [v(-1.2, 2.6), v(-1.2, -0.4), v(-0.8, -1.4), v(0, -1.7), v(0.8, -1.4), v(1.2, -0.4), v(1.2, 2.6)];
    const cap: V[] = [v(-0.5, 2.6), v(-0.5, -0.4), v(0, -0.9), v(0.5, -0.4), v(0.5, 2.6)];
    const els: El[] = [
      rect(-4.5, -2.6, 4.5, 1.6, { tone: "warn", fill: "warn", thin: true }),
      poly(villus, { open: true, tone: "b", bold: true, smooth: true }),
      poly(cap, { open: true, tone: "c", smooth: true }),
      txt(v(-3.2, -2.0), "anne kanı", "c", { small: true, bold: true, tone: "warn" }),
      txt(v(1.4, 2.4), "fetal villus", "e", { small: true, bold: true, tone: "b" }),
      txt(v(0, 2.9), "fetal kılcal", "n", { small: true, tone: "c" }),
      arrow(v(-3.6, 0.6), v(-1.4, 0.6), "a", { bold: true }),
      txt(v(-3.7, 0.95), "O₂, besin, IgG", "n", { small: true, bold: true, tone: "a" }),
      arrow(v(1.4, -0.2), v(3.6, -0.2), "ink", { bold: true }),
      txt(v(3.0, 0.15), "CO₂, atık", "n", { small: true, bold: true }),
      ...pad(v(-4.8, 3.4), v(4.8, -2.9)),
    ];
    return { els, readout: ["İki kan tek havuzda karışmaz; madde geçişi maddeye göre farklı yollarla olur.", "Bütün antikor türleri aynı ölçüde geçmez."] };
  },
};

const twins: FigureDef = {
  caption:
    "İkizliği zigot sayısından başlayarak çöz (özgün şema, ölçekli değil). Çift yumurta: iki oosit iki ayrı spermle döllenir, iki zigot; genetik benzerlik kardeşler düzeyindedir. Tek yumurta: tek zigot erken gelişimde ayrılır; başlangıç genetik yapıları çok benzerdir. Zar ve plasenta paylaşımı ayrılma zamanına bağlıdır.",
  alt: "Birinci adımda iki oosit ve iki sperm, iki zigot ve iki embriyo. İkinci adımda bir oosit ve bir sperm, tek zigot, ayrılma ve iki embriyo.",
  steps: ["Çift yumurta", "Tek yumurta"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      for (const y of [1.0, -1.0]) {
        els.push(...box(0, y, 2.6, 0.7, "oosit + sperm"), arrow(v(1.3, y), v(2.3, y), "c"), ...box(3.4, y, 1.8, 0.7, "zigot", { tone: "c", fill: "c" }), arrow(v(4.3, y), v(5.3, y), "c"), ...box(6.5, y, 2.0, 0.7, "embriyo"));
      }
      els.push(txt(v(3.4, -1.75), "iki ayrı zigot", "s", { small: true, bold: true, tone: "c" }));
    } else {
      els.push(...box(0, 0, 2.6, 0.7, "oosit + sperm"), arrow(v(1.3, 0), v(2.3, 0), "c"), ...box(3.4, 0, 1.8, 0.7, "zigot", { tone: "c", fill: "c" }));
      els.push(arrow(v(4.3, 0.15), v(5.4, 1.0), "a", { bold: true }), arrow(v(4.3, -0.15), v(5.4, -1.0), "a", { bold: true }), ...box(6.5, 1.0, 2.0, 0.7, "embriyo"), ...box(6.5, -1.0, 2.0, 0.7, "embriyo"));
      els.push(txt(v(4.6, -1.75), "erken ayrılma", "s", { small: true, bold: true, tone: "a" }));
    }
    els.push(...pad(v(-1.5, 1.6), v(7.7, -2.3)));
    return { els, readout: [step ? "Tek zigot → ayrılma → iki embriyo." : "İki oosit, iki sperm → iki zigot → iki embriyo.", "Plasenta sayısı tek başına değişmez genetik test sayılmaz."] };
  },
};

/* ---------------- Gametogenez ---------------- */

const COUNT: [string, string, string, string][] = [
  ["Birincil (S sonrası)", "46", "92", "4C"],
  ["Mayoz I sonrası", "23 (n)", "46", "2C"],
  ["Mayoz II sonrası", "23 (n)", "23", "1C"],
];
const counters: FigureDef = {
  caption:
    "Üç sayaç üç ayrı şeyi sayar (bölüm örneği, insan hücresi): kromozom (sentromer), kromatit (DNA kopyası) ve C (eşlenmemiş tek haploit genomun göreli DNA miktarı). DNA eşlenmiş birincil hücre 46 kromozom, 92 kromatit, 4C; mayoz I sonrası n ve 2C; mayoz II sonrası n ve 1C. C gram cinsinden sabit değildir.",
  alt: "Üç satır ve üç sayı sütunlu tablo: birincil spermatosit 46, 92, 4C; mayoz I sonrası 23, 46, 2C; mayoz II sonrası 23, 23, 1C.",
  draw: () => {
    const els: El[] = [];
    ["kromozom", "kromatit", "DNA"].forEach((c, j) => els.push(txt(v(6.0 + j * 2.6, 0.75), c, "c", { small: true, bold: true, tone: "muted" })));
    COUNT.forEach(([n, a, b, c], i) => {
      const y = -i * 0.9;
      els.push(txt(v(0, y), n, "e", { small: true, bold: true }));
      [a, b, c].forEach((x, j) => els.push(txt(v(6.0 + j * 2.6, y), x, "c", { small: true, bold: true, tone: j === 2 ? "a" : "ink" })));
    });
    els.push(...pad(v(-0.3, 1.2), v(12.4, -2.3)));
    return { els, readout: ["Mayoz I kromozom sayısını yarıya indirir; mayoz II kardeş kromatitleri ayırır.", "Kromozom sayısı ile DNA miktarı (C) farklı ölçülerdir."] };
  },
};

const spermTree: FigureDef = {
  caption:
    "Sperm yolu (özgün şema, ölçekli değil): spermatogonyumlar mitozla havuzu sürdürür; bir birincil spermatosit mayoz I'de iki ikincil spermatosit, mayoz II'de toplam dört haploit spermatit oluşturur. Yuvarlak spermatit olgun spermle aynı değildir; farklılaşma (spermiogenez) gerekir.",
  alt: "Yukarıdan aşağı ağaç: spermatogonyum, mitoz oku ile birincil spermatosit, mayoz I ile iki ikincil spermatosit, mayoz II ile dört spermatit, farklılaşma ile dört sperm.",
  draw: () => {
    const els: El[] = [];
    const lvl = (y: number, xs: number[], label: string, tone: Tone = "c") => xs.forEach((x) => els.push(circle(v(x, y), 0.32, { tone, fill: tone })), els.push(txt(v(-4.6, y), label, "e", { small: true, bold: true })));
    lvl(3.6, [3], "Spermatogonyum", "muted");
    lvl(2.4, [3], "Birincil spermatosit");
    lvl(1.2, [1.8, 4.2], "İkincil spermatosit");
    lvl(0, [1.2, 2.4, 3.6, 4.8], "Spermatit (n)", "b");
    lvl(-1.2, [1.2, 2.4, 3.6, 4.8], "Sperm", "a");
    els.push(seg(v(3, 3.28), v(3, 2.72), { tone: "muted" }), txt(v(3.4, 3.0), "mitoz, büyüme", "e", { small: true, tone: "muted" }));
    els.push(seg(v(3, 2.08), v(1.8, 1.52), { tone: "ink" }), seg(v(3, 2.08), v(4.2, 1.52), { tone: "ink" }), txt(v(4.6, 1.8), "mayoz I", "e", { small: true, tone: "c" }));
    for (const [a, b, c] of [[1.8, 1.2, 2.4], [4.2, 3.6, 4.8]]) els.push(seg(v(a, 0.88), v(b, 0.32), { tone: "ink" }), seg(v(a, 0.88), v(c, 0.32), { tone: "ink" }));
    els.push(txt(v(5.3, 0.6), "mayoz II", "e", { small: true, tone: "b" }));
    for (const x of [1.2, 2.4, 3.6, 4.8]) els.push(seg(v(x, -0.32), v(x, -0.88), { thin: true, tone: "a", dash: true }));
    els.push(txt(v(5.3, -0.6), "farklılaşma", "e", { small: true, tone: "a" }));
    els.push(...pad(v(-4.8, 4.1), v(7.6, -1.7)));
    return { els, readout: ["1 birincil spermatosit → 2 ikincil → 4 spermatit → 4 sperm.", "Dört haploit hücre dört başarılı döllenme demek değildir."] };
  },
};

const polar: FigureDef = {
  caption:
    "Oogenezde sitoplazma eşit bölünmez (özgün şema, ölçekli değil): birincil oosit mayoz I'de büyük ikincil oosit ve küçük birinci kutup hücresi verir; mayoz II'de büyük ovum ve ikinci kutup hücresi. İlk kutup hücresi bölünmezse iki, bölünürse üç küçük kutup hücresi görülür. Hiçbir durumda dört eşit yumurta oluşmaz.",
  alt: "Büyük birincil oosit, okla büyük ikincil oosit ve küçük birinci kutup hücresi; sonra büyük ovum ve küçük ikinci kutup hücresi. İkinci adımda birinci kutup hücresi de ikiye bölünmüş: toplam üç küçük kutup hücresi.",
  steps: ["İlk kutup bölünmez", "İlk kutup da bölünür"],
  draw: (_v, step) => {
    const els: El[] = [
      circle(v(0, 0), 1.0, { tone: "c", fill: "c" }),
      txt(v(0, -1.35), "birincil oosit", "s", { small: true, bold: true }),
      arrow(v(1.15, 0), v(2.85, 0), "ink"),
      txt(v(2.0, 0.25), "mayoz I", "n", { small: true, tone: "muted" }),
      circle(v(4, 0), 0.95, { tone: "c", fill: "c" }),
      circle(v(4, 1.4), 0.25, { tone: "warn", fill: "warn" }),
      arrow(v(5.1, 0), v(6.95, 0), "ink"),
      txt(v(6.0, 0.25), "mayoz II", "n", { small: true, tone: "muted" }),
      circle(v(8, 0), 0.9, { tone: "a", fill: "a" }),
      circle(v(8, 1.35), 0.22, { tone: "warn", fill: "warn" }),
      txt(v(8, -1.3), "ovum", "s", { small: true, bold: true, tone: "a" }),
      txt(v(4, -1.3), "ikincil oosit", "s", { small: true, bold: true }),
    ];
    if (step === 1) els.push(circle(v(9.1, 1.6), 0.2, { tone: "warn", fill: "warn" }), circle(v(9.6, 1.1), 0.2, { tone: "warn", fill: "warn" }), txt(v(10.0, 1.35), "3 kutup", "e", { small: true, bold: true, tone: "warn" }));
    else els.push(circle(v(9.3, 1.35), 0.25, { tone: "warn", fill: "warn" }), txt(v(9.8, 1.35), "2 kutup", "e", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-1.4, 2.2), v(12.0, -1.8)));
    return { els, readout: [step ? "İlk kutup hücresi de bölünürse 1 ovum + 3 kutup hücresi." : "Bu dersin modeli: 1 ovum + 2 kutup hücresi.", "Kalıtsal takımın yarılanması sitoplazmanın eşit paylaşılmasını gerektirmez."] };
  },
};

const gonadAxis: FigureDef = {
  caption:
    "Gonadotropin ekseni (özgün şema, ölçekli değil): hipotalamus GnRH ile ön hipofizi uyarır; FSH ve LH gonadlara etki eder. Erkekte FSH Sertoli desteğiyle, LH Leydig hücrelerinin testosteron üretimiyle ilişkilidir; inhibin özellikle FSH'yi baskılar. Dişide FSH folikül gelişimini, LH ovulasyon ve korpus luteum oluşumunu destekler.",
  alt: "Yukarıdan aşağı hipotalamus, GnRH oku, ön hipofiz; ön hipofizden iki ok: FSH ve LH. Erkek adımında FSH Sertoli hücresine, LH Leydig hücresine ve testosterona; Sertoli'den inhibin ile FSH'ye kesik eksi ok. Dişi adımında FSH folikül gelişimine, LH ovulasyon ve korpus luteuma.",
  steps: ["Erkek", "Dişi"],
  draw: (_v, step) => {
    const male = step === 0;
    const els: El[] = [
      ...box(2, 3, 3.0, 0.7, "Hipotalamus", { bold: true }),
      arrow(v(2, 2.63), v(2, 1.87), "c", { bold: true }),
      txt(v(2.2, 2.25), "GnRH", "e", { small: true, bold: true, tone: "c" }),
      ...box(2, 1.5, 3.0, 0.7, "Ön hipofiz", { bold: true }),
      arrow(v(1.2, 1.13), v(0, 0.17), "b", { bold: true }),
      arrow(v(2.8, 1.13), v(4.2, -1.03), "warn", { bold: true }),
      txt(v(0.3, 0.8), "FSH", "w", { small: true, bold: true, tone: "b" }),
      txt(v(3.7, 0.8), "LH", "e", { small: true, bold: true, tone: "warn" }),
      ...box(0, -0.2, 3.0, 0.7, male ? "Sertoli hücresi" : "Folikül gelişimi", { tone: "b" }),
      ...box(4.4, -1.4, 4.8, 0.7, male ? "Leydig: testosteron" : "Ovulasyon, korpus luteum", { tone: "warn" }),
    ];
    if (male) els.push(seg(v(-1.5, -0.2), v(-2.0, -0.2), { tone: "warn", dash: true }), seg(v(-2.0, -0.2), v(-2.0, 1.5), { tone: "warn", dash: true }), arrow(v(-2.0, 1.5), v(0.4, 1.5), "warn", { dash: true }), txt(v(-2.2, 0.65), "inhibin (−)", "w", { small: true, bold: true, tone: "warn" }));
    else els.push(txt(v(2, -2.1), "östrojen, progesteron: geri bildirim", "s", { small: true, tone: "muted" }));
    els.push(...pad(v(-4.4, 3.6), v(7.0, -2.8)));
    return { els, readout: [male ? "FSH → Sertoli desteği; LH → Leydig testosteronu; inhibin FSH'yi baskılar." : "FSH → folikül gelişimi; LH → ovulasyon ve korpus luteum.", "Aynı hormon adı iki eşeyde aynı hedef ve sonuç demek değildir."] };
  },
};

export const biologyFigures059Life: Record<string, Record<string, FigureDef>> = {
  "ekoloji-populasyon": {
    "Birey bilançosunu dört akışla kur": balance,
    "Doğal artış ile toplam artış aynı değildir": amountRate,
    "Hayatta kalma eğrisi bir doğum grubunu izler": survival,
    "Üstel büyümede kişi başına hız ile toplam hız farklıdır": jVsS,
    "Lojistik modelde S eğrisi ve en hızlı mutlak artış": logistic,
  },
  "ekoloji-komunite": {
    "Rekabet dışlanması koşullarıyla geçerlidir": niche,
    "Av–avcı ilişkisini zaman içinde takip et": predPrey,
    "Yarar ve zararı kontrol grubuna göre tanımla": signTable,
    "Birincil ve ikincil süksesyonu başlangıçtan ayır": succession,
  },
  "ureme-embriyonik-gelisim": {
    "Segmentasyon: daha çok hücre, başlangıçta daha büyük olmayan bütün": cleavage,
    "Moruladan iç boşluğu olan blastosiste": blastocyst,
    "Ektoderm, mezoderm ve endodermi organ katkılarıyla öğren": germLayers,
    "Plasentada iki kan yolu birbirine karışmadan yaklaşır": placenta,
    "İkizliği zigot sayısından başlayarak çöz": twins,
  },
  "ureme-gametogenez": {
    "Önce üç sayacın ne saydığını bil": counters,
    "Sperm yolunda çoğalma ve mayoz basamakları": spermTree,
    "Kutup hücresi sayısını varsayımıyla söyle": polar,
    "GnRH, FSH ve LH görev paylaşımı kurar": gonadAxis,
  },
};
