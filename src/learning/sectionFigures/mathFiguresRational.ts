import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Matematik · Rasyonel sayılar. Şerit modelleri aynı bütünü eş parçalara
 * böler; şerit boyu her zaman 1 bütündür. Örnek sayılar özgündür.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);

/** A strip of length W split into n equal parts with the first m shaded. */
function strip(x0: number, W: number, y: number, n: number, m: number, tone: Tone, from = 0): El[] {
  const els: El[] = [];
  const d = W / n;
  for (let i = 0; i < n; i++) {
    const on = i >= from && i < from + m;
    els.push(rect(x0 + i * d, x0 + (i + 1) * d, y, 0.28, { fill: on ? tone : undefined, tone: "ink", thin: true }));
  }
  return els;
}

// 1 · Denk kesir: 3/4 = 3k / 4k.
const equivalent: FigureDef = {
  caption:
    "3/4’ü genişlet: pay ve paydayı aynı sıfır olmayan k ile çarp. Her parça k eş parçaya bölünür; boyalı uzunluk değişmez, yalnız gösterim değişir. Yalnız payı değiştirmek değeri değiştirir.",
  alt: "Üstte dört parçanın üçü boyalı şerit. Altta aynı şerit 4k parçaya bölünmüş, 3k parçası boyalı; boyalı uzunluk iki şeritte aynı.",
  param: { label: "Genişletme k", min: 1, max: 4, step: 1, init: 2, unit: "", plain: true },
  draw: (k) => {
    const W = 8;
    const els: El[] = [
      ...strip(0, W, 1.0, 4, 3, "c"),
      ...strip(0, W, -0.4, 4 * k, 3 * k, "b"),
      txt(v(W + 0.3, 1.0), "3/4", "e", { bold: true }),
      txt(v(W + 0.3, -0.4), `${3 * k}/${4 * k}`, "e", { bold: true, tone: "b" }),
      seg(v(6, 1.4), v(6, -0.8), { dash: true, thin: true, tone: "warn" }),
      txt(v(-0.6, 1.8), " ", "c"),
      txt(v(W + 1.8, -1.0), " ", "c"),
    ];
    return {
      els,
      readout: [`3/4 = (3·${k})/(4·${k}) = ${3 * k}/${4 * k}: aynı bütünün aynı uzunluğu.`, "Sadeleştirme tersidir: ortak çarpana böl. 6/8 → 3/4; 6/8’den 3/8 yapmak değeri yarıya indirir."],
    };
  },
};

// 2 · Ortak payda.
const commonDenominator: FigureDef = {
  caption:
    "1/2 + 1/3 = 2/5 değildir: parça boyları farklı. Ortak payda, iki şeridi aynı boyda parçalara (altıda birlere) bölmektir. Adımlarda parçalar eşitlenir ve sayılır.",
  alt: "Üç adım: yarım ve üçte bir şeritleri; ikisi de altıya bölünmüş hâli; altıda beşi boyalı toplam şerit.",
  steps: ["Farklı parçalar", "Altıda birlere böl", "Topla: 5/6"],
  draw: (_v, step) => {
    const W = 8;
    const els: El[] = [];
    if (step === 0) {
      els.push(...strip(0, W, 1.2, 2, 1, "c"), ...strip(0, W, 0.2, 3, 1, "b"));
      els.push(txt(v(W + 0.3, 1.2), "1/2", "e", { bold: true }), txt(v(W + 0.3, 0.2), "1/3", "e", { bold: true }));
      els.push(txt(v(W / 2, -0.9), "Parça boyları farklı: 1 + 1 ve 2 + 3 toplanamaz", "c", { small: true, tone: "warn" }));
    } else if (step === 1) {
      els.push(...strip(0, W, 1.2, 6, 3, "c"), ...strip(0, W, 0.2, 6, 2, "b"));
      els.push(txt(v(W + 0.3, 1.2), "3/6", "e", { bold: true }), txt(v(W + 0.3, 0.2), "2/6", "e", { bold: true }));
      els.push(txt(v(W / 2, -0.9), "Ortak payda 6: aynı boyda parçalar", "c", { small: true, tone: "c" }));
    } else {
      const d = W / 6;
      for (let i = 0; i < 6; i++) els.push(rect(i * d, (i + 1) * d, 0.7, 0.28, { fill: i < 3 ? "c" : i < 5 ? "b" : undefined, tone: "ink", thin: true }));
      els.push(txt(v(W + 0.3, 0.7), "5/6", "e", { bold: true, tone: "a" }));
      els.push(txt(v(W / 2, -0.4), "3/6 + 2/6 = 5/6 (1/2’den büyük, 1’den küçük: tutarlı)", "c", { small: true }));
    }
    els.push(txt(v(-0.6, 1.8), " ", "c"), txt(v(W + 1.6, -1.3), " ", "c"));
    return { els, readout: ["Paydalar toplanmaz; parçalar aynı boya getirilir, sonra paylar toplanır.", "Kontrol: sonuç her iki terimden büyük ve 1’den küçük olmalı; 2/5 < 1/2 olduğu için 2/5 yanlış."] };
  },
};

// 3 · Sıralama yöntemleri (seçilebilir).
const PAIRS = [
  { label: "Ortak payda", lo: 0.5, hi: 0.7, ticks: [[0.5, "1/2"], [7 / 12, "14/24"], [5 / 8, "15/24"], [0.7, ""]] as [number, string][], a: 5 / 8, b: 7 / 12, la: "5/8", lb: "7/12", detail: ["5/8 = 15/24, 7/12 = 14/24.", "Pozitif ortak paydada büyük pay büyük sayıdır: 5/8 > 7/12.", "Yalnız payda büyük diye karar verme."] },
  { label: "1’e eksik", lo: 0.8, hi: 1, ticks: [[0.8, ""], [7 / 8, "1 − 1/8"], [11 / 12, "1 − 1/12"], [1, "1"]] as [number, string][], a: 7 / 8, b: 11 / 12, la: "7/8", lb: "11/12", detail: ["Eksikler 1/8 ve 1/12; küçük eksik büyük sayı.", "11/12 > 7/8. Eksiklerin payı farklıysa eksikleri gerçekten hesapla.", "Çapraz kontrol: 7·12 = 84 < 88 = 11·8."] },
  { label: "Negatifler", lo: -0.75, hi: -0.5, ticks: [[-0.75, "−3/4"], [-2 / 3, "−10/15"], [-3 / 5, "−9/15"], [-0.5, "−1/2"]] as [number, string][], a: -2 / 3, b: -3 / 5, la: "−2/3", lb: "−3/5", detail: ["Pozitif payda 15: −10/15 ve −9/15.", "−10 < −9 olduğundan −2/3 < −3/5.", "Sıfıra uzaklık büyük olan negatif sayı daha küçüktür."] },
];
const ordering: FigureDef = {
  caption:
    "Sıralamada yöntemi koşula göre seç. Bir yönteme tıkla: sayı doğrusu o çiftin bulunduğu aralığa yakınlaşır, iki sayı yerine oturur ve gerekçe açılır. Sağdaki sayı her zaman büyüktür.",
  alt: "−1’den 1’e sayı doğrusu; seçilen çiftin iki noktası işaretli.",
  picks: PAIRS.map((p) => ({ label: p.label, title: `${p.label}: ${p.la} ile ${p.lb}`, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const W = 8;
    const p = pick >= 0 ? PAIRS[pick] : undefined;
    const lo = p ? p.lo : -1, hi = p ? p.hi : 1;
    const X = (t: number) => ((t - lo) / (hi - lo)) * W;
    const ticks: [number, string][] = p ? p.ticks : [[-1, "−1"], [-0.5, "−1/2"], [0, "0"], [0.5, "1/2"], [1, "1"]];
    const els: El[] = [vec(v(-0.2, 0), v(W + 0.3, 0), { thin: true, tone: "muted" })];
    for (const [t, l] of ticks) {
      els.push(seg(v(X(t), -0.08), v(X(t), 0.08), { thin: true, tone: "muted" }));
      if (l) els.push(txt(v(X(t), -0.4), l, "c", { small: true, tone: "muted" }));
    }
    PAIRS.forEach((q, i) => els.push(txt(v(1.2 + i * 2.8, 1.6), q.label, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    if (p) {
      els.push(ball(v(X(p.a), 0), 0.13, "c"), ball(v(X(p.b), 0), 0.13, "b"));
      els.push(txt(v(X(p.a), 0.5), p.la, "c", { small: true, bold: true, tone: "c" }));
      els.push(txt(v(X(p.b), 0.5), p.lb, "c", { small: true, bold: true, tone: "b" }));
    }
    els.push(txt(v(-0.6, 2.0), " ", "c"), txt(v(W + 0.6, -0.8), " ", "c"));
    return { els, readout: [p ? p.detail[1] : "Bir yönteme tıkla ya da aşağıdan seç.", "Önce işaret ve 0, 1/2, 1 referansları; sonra ortak payda, 1’e eksik ya da çapraz çarpım."] };
  },
};

// 4 · Kalanın kesri: bütün her adımda değişir.
const remainder: FigureDef = {
  caption:
    "Özgün örnek: tanktaki suyun önce 1/4’ü, sonra kalanın 1/3’ü kullanılıyor; 40 L kalıyor. Her adımda “hangi bütünün kesri?” sorusunu etiketle. Adımlarda şerit 12 eş parçayla izlenir.",
  alt: "Üç adım: 12 parçalı şerit; 3 parça kullanılmış; kalan 9 parçanın 3’ü daha kullanılmış, 6 parça kalmış ve 40 L’ye eşit.",
  steps: ["Başlangıç x", "1/4 kullanıldı", "Kalanın 1/3’ü"],
  draw: (_v, step) => {
    const W = 8, d = W / 12;
    const els: El[] = [];
    for (let i = 0; i < 12; i++) {
      const used1 = step >= 1 && i < 3, used2 = step >= 2 && i >= 3 && i < 6;
      els.push(rect(i * d, (i + 1) * d, 0.6, 0.3, { fill: used1 ? "warn" : used2 ? "muted" : "c", tone: "ink", thin: true }));
    }
    if (step >= 1) els.push(txt(v(1.5 * d, 1.25), "1/4 · x", "c", { small: true, tone: "warn" }));
    if (step >= 2) els.push(txt(v(4.5 * d, 1.25), "kalanın 1/3’ü", "c", { small: true, tone: "muted" }), txt(v(9 * d, 1.25), "6/12 = x/2 = 40 L", "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(W / 2, -0.3), step === 0 ? "x = 12 eş parça" : step === 1 ? "kalan (3/4)x = 9 parça" : "kalan (2/3)·(3/4)x = x/2 ⇒ x = 80 L", "c", { small: true, bold: true }));
    els.push(txt(v(-0.6, 1.8), " ", "c"), txt(v(W + 0.6, -0.8), " ", "c"));
    return {
      els,
      readout: [
        step < 2 ? "İlk kesir başlangıç bütününe, ikinci kesir kalan bütüne aittir." : "Kontrol: 80’den 20 gider, 60 kalır; 60’ın 1/3’ü 20 gider, 40 kalır.",
        "Kalanın 1/3’ünü başlangıcın 1/3’ü sanırsan farklı bir metni çözersin (80 − 20 − 26,67 ≠ 40).",
      ],
    };
  },
};

export const mathFiguresRational: Record<string, Record<string, FigureDef>> = {
  "rasyonel-sayilar": {
    "Denk kesir, sadeleştirme ve genişletme": equivalent,
    "Toplama ve çıkarma neden ortak payda ister?": commonDenominator,
    "Sıralamada yöntemi koşula göre seç": ordering,
    "Problemlerde bütün ne?": remainder,
  },
};
