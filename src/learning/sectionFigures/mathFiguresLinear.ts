import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Matematik · Birinci dereceden denklemler. Grafikler kareli ve 1 birim
 * aralıklıdır. 2024 TYT Temel Matematik 17 verileri resmî kitapçıktan
 * özetlenmiştir; çözüm özgündür.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);

// 1 · Terazi: iki tarafa aynı işlem.
const BAL = [
  { l: "3x + 6", r: "24", note: "Başlangıç: iki taraf eşit." },
  { l: "3x + 6 − 6", r: "24 − 6", note: "İki taraftan 6 çıkar: denge korunur. “Karşıya geçince işaret değişir” ezberinin gerçek anlamı budur." },
  { l: "3x", r: "18", note: "Sadeleşti: x’li terim yalnız kaldı." },
  { l: "3x ÷ 3", r: "18 ÷ 3", note: "İki tarafı sıfır olmayan 3’e böl." },
  { l: "x", r: "6", note: "Kontrol ilk denklemde: 3·6 + 6 = 24 ✓." },
];
const balance: FigureDef = {
  caption:
    "Denklem bir terazidir: iki tarafa aynı işlem uygulanırsa denge bozulmaz. Adımlarda 3x + 6 = 24 çözülür. Sıfırla çarpmak dengeyi bozmaz ama x bilgisini siler; eşdeğer dönüşüm için çarpan sıfırdan farklı olmalıdır.",
  alt: "Ortadan dayanaklı yatay terazi kolu, iki kefede ifadeler: 3x + 6 ile 24, sonra 3x ile 18, en son x ile 6.",
  steps: ["Başlangıç", "6 çıkar", "Sadeleş", "3’e böl", "x = 6"],
  draw: (_v, step) => {
    const s = BAL[step];
    const els: El[] = [
      poly([v(3.6, -1.6), v(4.4, -1.6), v(4.0, -0.9)], { fill: "muted", tone: "muted" }),
      seg(v(0.6, -0.9), v(7.4, -0.9), { bold: true }),
      seg(v(1.6, -0.9), v(1.6, -0.3), { thin: true }), seg(v(6.4, -0.9), v(6.4, -0.3), { thin: true }),
      rect(0.4, 2.8, 0.05, 0.35, { fill: "c", tone: "c" }),
      rect(5.2, 7.6, 0.05, 0.35, { fill: "b", tone: "b" }),
      txt(v(1.6, 0.05), s.l, "c", { bold: true }),
      txt(v(6.4, 0.05), s.r, "c", { bold: true }),
      txt(v(4.0, 0.05), "=", "c", { bold: true, tone: "a" }),
      txt(v(-0.4, 0.8), " ", "c"), txt(v(8.4, -1.9), " ", "c"),
    ];
    return { els, readout: [s.note, "Bulunan değeri sadeleşmiş son satıra değil, ilk denkleme koy."] };
  },
};

// 2 · Tek çözüm, özdeşlik, çelişki (seçilebilir grafik).
const KINDS = [
  { label: "Tek çözüm", eq: "2x − 1 = x + 2", f: (x: number) => 2 * x - 1, g: (x: number) => x + 2, detail: ["Sol ve sağ taraf iki farklı eğimli doğru: bir noktada kesişir.", "x = 3 (iki taraf da 5). ÇK = {3}."] },
  { label: "Özdeşlik", eq: "2(x + 1) = 2x + 2", f: (x: number) => 2 * x + 2, g: (x: number) => 2 * x + 2, detail: ["İki taraf aynı doğru: her x’te eşit.", "Sadeleşince 0 = 0. ÇK = ℝ; tek bir örnek (x = 0) bütün kümeyi temsil etmez."] },
  { label: "Çelişki", eq: "2x − 1 = 2x + 2", f: (x: number) => 2 * x - 1, g: (x: number) => 2 * x + 2, detail: ["Eğimler aynı, sabitler farklı: paralel doğrular hiç kesişmez.", "Sadeleşince −1 = 2. ÇK = ∅."] },
];
const kinds: FigureDef = {
  caption:
    "Denklemin iki tarafını ayrı doğrular olarak çiz: y = sol taraf ve y = sağ taraf. Kesişim noktasının x’i köktür. Bir türe tıkla: tek nokta, çakışık doğru ya da paralel doğru görünür.",
  alt: "Kareli koordinat düzleminde iki doğru. Tek çözümde (3, 5)’te kesişiyor, özdeşlikte çakışık, çelişkide paralel.",
  picks: KINDS.map((k) => ({ label: k.label, title: `${k.label}: ${k.eq}`, detail: k.detail })),
  draw: (_v, _s, pick = -1) => {
    const S = 0.55, X = (x: number) => (x + 1) * S * 1.6, Y = (y: number) => y * S;
    const els: El[] = [];
    for (let x = -1; x <= 5; x++) els.push(seg(v(X(x), Y(-3)), v(X(x), Y(11)), { thin: true, tone: "muted" }));
    for (let y = -3; y <= 11; y += 2) els.push(seg(v(X(-1), Y(y)), v(X(5), Y(y)), { thin: true, tone: "muted" }));
    els.push(vec(v(X(-1), 0), v(X(5) + 0.3, 0), { thin: true }), vec(v(X(0), Y(-3)), v(X(0), Y(11) + 0.3), { thin: true }));
    els.push(txt(v(X(5) + 0.45, 0), "x", "e", { small: true }), txt(v(X(0), Y(11) + 0.6), "y", "c", { small: true }));
    for (const x of [1, 3, 5]) els.push(txt(v(X(x), -0.35), String(x), "c", { small: true, soft: true, tone: "muted" }));
    KINDS.forEach((k, i) => els.push(txt(v(X(5) + 0.9, Y(9) - i * 1.4), k.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    const k = pick >= 0 ? KINDS[pick] : KINDS[0];
    const clipLine = (f: (x: number) => number): V[] => {
      const pts: V[] = [];
      for (let x = -1; x <= 5.001; x += 0.25) { const y = f(x); if (y >= -3 && y <= 11) pts.push(v(X(x), Y(y))); }
      return pts;
    };
    els.push(poly(clipLine(k.f), { open: true, tone: "c", bold: true }));
    els.push(poly(clipLine(k.g), { open: true, tone: "b", bold: pick === 1 ? false : true, dash: pick === 1 }));
    if (k === KINDS[0]) els.push(ball(v(X(3), Y(5)), 0.13, "a"), txt(v(X(3) + 0.25, Y(5) + 0.35), "(3, 5)", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.5, Y(11) + 0.9), " ", "c"), txt(v(X(5) + 4.2, Y(-3) - 0.3), " ", "c"));
    return { els, readout: [`${k.eq}: ${k.detail[1]}`, "Yeşil y = sol taraf, mavi y = sağ taraf. Kök, iki doğrunun aynı yüksekliğe geldiği x’tir."] };
  },
};

// 3 · Kesirli denklem ve yasak değer.
const FRAC = [
  { eq: "(x + 2)/(x − 1) = 2", f: (x: number) => (x + 2) / (x - 1), k: 2, sol: 4, note: "x ≠ 1 koşulunda çarp: x + 2 = 2x − 2 ⇒ x = 4. Koşula uyar: 6/3 = 2 ✓." },
  { eq: "(2x − 2)/(x − 1) = 3", f: (x: number) => (2 * x - 2) / (x - 1), k: 3, sol: NaN, note: "Çarpınca x = 1 çıkar ama başlangıçta yasak. Tanımlı her x’te sol taraf 2’dir: 3 olamaz. ÇK = ∅." },
];
const fraction: FigureDef = {
  caption:
    "Paydada değişken varsa önce yasak değeri yaz: x ≠ 1. Grafikte sol taraf eğri (ya da delikli doğru), sağ taraf yatay doğrudur. Paydadan kurtulmak yasak değeri ortadan kaldırmaz.",
  alt: "Birinci adımda (x+2)/(x−1) eğrisi y = 2 doğrusunu x = 4’te kesiyor; x = 1’de kesikli dikey asimptot. İkinci adımda y = 2 doğrusu x = 1’de boş noktalı ve y = 3 doğrusuyla hiç kesişmiyor.",
  steps: ["Çözüm var", "Aday yasak"],
  draw: (_v, step) => {
    const F = FRAC[step];
    const S = 0.6, X = (x: number) => (x + 2) * S, Y = (y: number) => y * S;
    const els: El[] = [
      vec(v(X(-2), 0), v(X(7) + 0.3, 0), { thin: true }),
      vec(v(X(0), Y(-4)), v(X(0), Y(7) + 0.3), { thin: true }),
      seg(v(X(1), Y(-4)), v(X(1), Y(7)), { dash: true, thin: true, tone: "warn" }),
      txt(v(X(1), Y(7) + 0.35), "x ≠ 1", "c", { small: true, tone: "warn" }),
    ];
    for (const x of [-1, 1, 2, 4, 6]) els.push(txt(v(X(x), -0.35), String(x), "c", { small: true, soft: true, tone: "muted" }));
    for (const part of [[-2, 0.9], [1.1, 7]] as const) {
      const pts: V[] = [];
      for (let x = part[0]; x <= part[1] + 1e-9; x += 0.05) { const y = F.f(x); if (y >= -4 && y <= 7) pts.push(v(X(x), Y(y))); }
      if (pts.length > 1) els.push(poly(pts, { open: true, tone: "c", bold: true }));
    }
    if (step === 1) els.push(circle(v(X(1), Y(2)), 0.12, { tone: "c", bold: true }));
    els.push(seg(v(X(-2), Y(F.k)), v(X(7), Y(F.k)), { tone: "b", bold: true }), txt(v(X(7) + 0.1, Y(F.k)), `y = ${F.k}`, "e", { small: true, tone: "b" }));
    if (!Number.isNaN(F.sol)) els.push(ball(v(X(F.sol), Y(F.k)), 0.13, "a"), txt(v(X(F.sol), Y(F.k) + 0.45), `x = ${F.sol}`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(2.5), Y(-4) - 0.2), F.eq, "c", { small: true, bold: true }));
    els.push(txt(v(X(-2) - 0.3, Y(7) + 0.7), " ", "c"), txt(v(X(7) + 1.2, Y(-4) - 0.6), " ", "c"));
    return { els, readout: [F.note, "Önce koşul, sonra çarpma, en son adayı koşulla ve ilk denklemle denetle."] };
  },
};

// 4 · 2024 TYT Temel Matematik 17: yürüyüş süresi.
const walk: FigureDef = {
  caption:
    "2024 TYT Temel Matematik 17 (resmî kitapçıktan özet): 30 gün; ilk gün x dakika, ilk 15 günde her gün 1 dakika artar, sonraki 15 günde her gün 1 dakika azalır; toplam 1395 dakika. x’i değiştir: çubukların toplamı 30x + 195’tir.",
  alt: "30 dikey çubuk: 15. güne kadar yükselen, 16. günden itibaren alçalan süreler. Tepe yalnız 15. günde. Toplam x = 40’ta 1395’e eşit.",
  param: { label: "İlk gün x (dk)", min: 30, max: 50, step: 1, init: 36, unit: "", plain: true },
  draw: (x) => {
    const days = Array.from({ length: 30 }, (_, i) => (i < 15 ? x + i : x + 13 - (i - 15)));
    const total = days.reduce((a, b) => a + b, 0);
    const W = 8, d = W / 30, K = 0.045, base = 25;
    const els: El[] = [seg(v(0, 0), v(W, 0), { thin: true })];
    days.forEach((m, i) => {
      const h = (m - base) * K;
      els.push(rect(i * d + 0.02, (i + 1) * d - 0.02, h / 2, h / 2, { fill: i === 14 ? "warn" : i < 15 ? "c" : "b", tone: i === 14 ? "warn" : i < 15 ? "c" : "b", thin: true }));
    });
    els.push(txt(v(14.5 * d, (days[14] - base) * K + 0.3), `15. gün: x + 14 = ${days[14]}`, "c", { small: true, tone: "warn" }));
    els.push(txt(v(0.5 * d, -0.35), "1", "c", { small: true, tone: "muted" }), txt(v(15.5 * d, -0.35), "16", "c", { small: true, tone: "muted" }), txt(v(29.5 * d, -0.35), "30", "c", { small: true, tone: "muted" }));
    els.push(txt(v(W / 2, -0.95), `toplam = 30·${x} + 195 = ${total}${total === 1395 ? " ✓" : total < 1395 ? " < 1395" : " > 1395"}`, "c", { bold: true, tone: total === 1395 ? "a" : "ink" }));
    els.push(txt(v(-0.4, 1.9), " ", "c"), txt(v(W + 0.4, -1.3), " ", "c"));
    return {
      els,
      readout: [
        "İlk 15 gün: 15x + (0 + 1 + … + 14) = 15x + 105. Sonraki 15 gün x + 13’ten x − 1’e: 15x + 90. Toplam 30x + 195.",
        "30x + 195 = 1395 ⇒ x = 40 dakika. Tuzak: 16. günü x + 14’ten başlatmak tepe günü iki kez sayar.",
      ],
    };
  },
};

export const mathFiguresLinear: Record<string, Record<string, FigureDef>> = {
  "birinci-dereceden-denklemler": {
    "İki tarafa aynı işlemi yapmak neyi korur?": balance,
    "Tek çözüm, özdeşlik ve çelişki": kinds,
    "Kesirli denklemde her terimi ve yasak değeri koru": fraction,
    "Sözel durumu bilinmeyenle kur": walk,
  },
};
