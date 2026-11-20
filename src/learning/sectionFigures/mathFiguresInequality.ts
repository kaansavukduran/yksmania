import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Matematik · Basit eşitsizlikler. Sayı doğruları şematiktir; dolu nokta
 * uç dahil, boş nokta uç hariç demektir. 2024 TYT Temel Matematik 8 verileri
 * resmî kitapçıktan özetlenmiştir; çözüm özgündür.
 */

const fmt = (x: number) => {
  const r = Math.round(x * 100) / 100;
  return String(r).replace(".", ",").replace("-", "−");
};

/** Number line from a to b mapped to [0, W]. */
function line(a: number, b: number, W: number, y: number, ticks: number[]) {
  const X = (t: number) => ((t - a) / (b - a)) * W;
  const els: El[] = [vec(v(-0.2, y), v(W + 0.3, y), { thin: true, tone: "muted" }), vec(v(0.2, y), v(-0.3, y), { thin: true, tone: "muted" })];
  for (const t of ticks) {
    els.push(seg(v(X(t), y - 0.08), v(X(t), y + 0.08), { thin: true, tone: "muted" }));
    els.push(txt(v(X(t), y - 0.38), fmt(t), "c", { small: true, soft: true, tone: "muted" }));
  }
  return { X, els };
}
const dot = (x: number, y: number, closed: boolean, tone: Tone = "a"): El =>
  closed ? ball(v(x, y), 0.13, tone) : circle(v(x, y), 0.13, { tone, bold: true });
/** Interval [lo,hi] with closed flags; Infinity extends to the arrow. */
function interval(X: (t: number) => number, W: number, y: number, lo: number, hi: number, cl: boolean, ch: boolean, tone: Tone = "a"): El[] {
  const x0 = lo === -Infinity ? -0.2 : X(lo), x1 = hi === Infinity ? W + 0.2 : X(hi);
  const els: El[] = [seg(v(x0, y), v(x1, y), { bold: true, tone })];
  if (lo !== -Infinity) els.push(dot(x0, y, cl, tone));
  if (hi !== Infinity) els.push(dot(x1, y, ch, tone));
  return els;
}

// 1 · Negatif çarpan yansıtır.
const reflect: FigureDef = {
  caption:
    "−3 < 2 doğru bir sıralama. Çarpanı değiştir: iki sayı da k ile çarpılır. Pozitif k sırayı korur; negatif k sayı doğrusunda 0 etrafında yansıtır ve sıra ters döner. k = 0 iki sayıyı aynı yapar, eşdeğer dönüşüm değildir.",
  alt: "Üstte −3 ve 2 noktalı bir sayı doğrusu, altta k ile çarpılmış görüntüleri. k negatifken görüntülerin sırası tersine dönüyor.",
  param: { label: "Çarpan k", min: -3, max: 3, step: 0.5, init: -1, unit: "" },
  draw: (k) => {
    const W = 8;
    const top = line(-9, 9, W, 1.2, [-9, -6, -3, 0, 3, 6, 9]);
    const bot = line(-9, 9, W, -0.8, [-9, -6, -3, 0, 3, 6, 9]);
    const a = -3, b = 2, ka = k * a, kb = k * b;
    const rel = k > 0 ? "<" : k < 0 ? ">" : "=";
    const els: El[] = [...top.els, ...bot.els];
    els.push(dot(top.X(a), 1.2, true, "c"), dot(top.X(b), 1.2, true, "b"));
    els.push(txt(v(top.X(a), 1.6), "a = −3", "c", { small: true, tone: "c" }), txt(v(top.X(b), 1.6), "b = 2", "c", { small: true, tone: "b" }));
    els.push(dot(bot.X(ka), -0.8, true, "c"), dot(bot.X(kb), -0.8, true, "b"));
    els.push(seg(v(top.X(a), 0.45), v(bot.X(ka), -0.65), { thin: true, dash: true, tone: "c" }), seg(v(top.X(b), 0.45), v(bot.X(kb), -0.65), { thin: true, dash: true, tone: "b" }));
    els.push(txt(v(W / 2, -1.7), `k·a = ${fmt(ka)}  ${rel}  k·b = ${fmt(kb)}`, "c", { bold: true, tone: k < 0 ? "warn" : "ink" }));
    els.push(txt(v(-0.6, 2.1), " ", "c"), txt(v(W + 0.6, -2.1), " ", "c"));
    return {
      els,
      readout: [
        k > 0 ? `k = ${fmt(k)} pozitif: sıra korunur (${fmt(ka)} < ${fmt(kb)}).` : k < 0 ? `k = ${fmt(k)} negatif: sıra döner (${fmt(ka)} > ${fmt(kb)}).` : "k = 0: iki taraf eşitlenir; 0 ile çarpmak eşdeğer çözüm kümesi vermez.",
        "Yön yalnız negatif sayıyla çarpma/bölmede döner; x − 5 < 2’de 5 eklemek yönü değiştirmez.",
      ],
    };
  },
};

// 2 · Bileşik eşitsizlik adımları.
const STEPS = [
  { lab: "−2 < 3x + 1 ≤ 10", lo: -2, hi: 10, note: "Başlangıç: iki koşul birlikte, 3x + 1 için aralık." },
  { lab: "−3 < 3x ≤ 9", lo: -3, hi: 9, note: "Üç tarafa da −1 ekle (1 çıkar): yön değişmez." },
  { lab: "−1 < x ≤ 3", lo: -1, hi: 3, note: "Üç tarafı pozitif 3’e böl: yön değişmez. Çözüm (−1, 3]." },
];
const compound: FigureDef = {
  caption:
    "Bileşik eşitsizlikte aynı işlem üç tarafa birlikte uygulanır. Adımlarda gösterilen ifadenin aralığı değişir; sol uç hep açık, sağ uç hep kapalı kalır.",
  alt: "Sayı doğrusunda üç adım: önce 3x+1 için −2 ile 10 arası, sonra 3x için −3 ile 9 arası, sonra x için −1 ile 3 arası; sol uç boş, sağ uç dolu nokta.",
  steps: STEPS.map((s, i) => (i === 0 ? "Başlangıç" : i === 1 ? "1 çıkar" : "3’e böl")),
  draw: (_v, step) => {
    const W = 8;
    const L = line(-4, 11, W, 0, [-3, -1, 0, 3, 6, 9]);
    const s = STEPS[step];
    const els: El[] = [...L.els, ...interval(L.X, W, 0, s.lo, s.hi, false, true)];
    els.push(txt(v(W / 2, 0.75), s.lab, "c", { bold: true }));
    els.push(txt(v(-0.6, 1.2), " ", "c"), txt(v(W + 0.6, -0.8), " ", "c"));
    return { els, readout: [s.note, "Kontrol: x = 3 ⇒ 3·3 + 1 = 10 ≤ 10 dahil; x = −1 ⇒ −2 < −2 yanlış, uç açık."] };
  },
};

// 3 · Ve / veya.
const CASES = [
  { lab: "x > 1 ve x ≤ 4", a: [1, Infinity, false, false], b: [-Infinity, 4, false, true], res: [[1, 4, false, true]], out: "(1, 4]", note: "Ve: iki koşulu birden sağlayan ortak bölge (kesişim)." },
  { lab: "x ≤ −2 veya x > 3", a: [-Infinity, -2, false, true], b: [3, Infinity, false, false], res: [[-Infinity, -2, false, true], [3, Infinity, false, false]], out: "(−∞, −2] ∪ (3, ∞)", note: "Veya: en az bir koşul yeter (birleşim); arada kalan (−2, 3] dışarıda." },
  { lab: "x ≤ −2 ve x > 3", a: [-Infinity, -2, false, true], b: [3, Infinity, false, false], res: [], out: "∅", note: "Aynı x iki ayrık bölgede olamaz: kesişim boş küme. Bağlacı değiştirmek sonucu değiştirir." },
] as const;
const andOr: FigureDef = {
  caption:
    "Üstteki iki satır koşulları, alttaki satır sonucu gösterir. “Ve” kesişim, “veya” birleşimdir. Adımlarda bağlaç değişir.",
  alt: "Üç sayı doğrusu: iki koşul ve sonuç. İlk adımda kesişim (1,4], ikincide iki ayrı ışının birleşimi, üçüncüde boş küme.",
  steps: CASES.map((c) => c.lab),
  draw: (_v, step) => {
    const W = 8;
    const c = CASES[step];
    const T = [-4, -2, 0, 1, 3, 4, 6];
    const r1 = line(-5, 7, W, 1.6, T), r2 = line(-5, 7, W, 0.4, T), r3 = line(-5, 7, W, -1.0, T);
    const els: El[] = [...r1.els, ...r2.els, ...r3.els];
    els.push(...interval(r1.X, W, 1.6, c.a[0], c.a[1], c.a[2], c.a[3], "c"));
    els.push(...interval(r2.X, W, 0.4, c.b[0], c.b[1], c.b[2], c.b[3], "b"));
    for (const r of c.res) els.push(...interval(r3.X, W, -1.0, r[0], r[1], r[2], r[3], "a"));
    els.push(txt(v(-0.5, 1.6), "1.", "w", { small: true }), txt(v(-0.5, 0.4), "2.", "w", { small: true }), txt(v(-0.5, -1.0), "sonuç", "w", { small: true, bold: true }));
    els.push(txt(v(W / 2, -1.85), c.out, "c", { bold: true, tone: c.res.length ? "a" : "warn" }));
    els.push(txt(v(-1.8, 2.1), " ", "c"), txt(v(W + 0.6, -2.2), " ", "c"));
    return { els, readout: [c.note, "Uçlar ilk koşuldan gelir: ≤ dolu, < boş nokta; ∞ hiçbir zaman köşeli parantezle yazılmaz."] };
  },
};

// 4 · Aralıkta işlem (seçilebilir).
const OPS = [
  { label: "a + b", lo: 3, hi: 7, cl: false, ch: false, show: "3 < a + b < 7", detail: ["Küçüklerle küçük, büyüklerle büyük toplanır.", "a uçlarına ulaşmadığı için iki uç da açık."] },
  { label: "a − b", lo: -3, hi: 1, cl: false, ch: false, show: "−3 < a − b < 1", detail: ["Önce −4 ≤ −b ≤ −2 yaz, sonra a ile topla.", "Alt sınırda a küçük, b büyük seçilir; uçları kör çıkarma.", "a = b gibi bağlı değişkenlerde bu hesap tam aralığı vermez."] },
  { label: "a · b", lo: 2, hi: 12, cl: false, ch: false, show: "2 < ab < 12", detail: ["İkisi de pozitif: her biri büyüdükçe çarpım büyür.", "Aralık sıfırı içerseydi dört köşe çarpımı karşılaştırılırdı."] },
  { label: "a / b", lo: 0.25, hi: 1.5, cl: false, ch: false, show: "1/4 < a/b < 3/2", detail: ["Pay büyürken bölüm büyür, payda büyürken küçülür.", "En küçük: a küçük / b büyük; en büyük: a büyük / b küçük."] },
  { label: "a² (−2<a<3)", lo: 0, hi: 9, cl: true, ch: false, show: "0 ≤ a² < 9", detail: ["Aralık sıfırı içerir: a = 0 izinli, kare 0.", "4 < a² < 9 yanlış; a·a’nın çarpanları bağımsız değildir.", "Üst sınır 9’a ulaşılamaz (a < 3)."] },
];
const ops: FigureDef = {
  caption:
    "a ve b bağımsız: 1 < a < 3 ve 2 ≤ b ≤ 4. Bir işleme tıkla: sonucun tam aralığı sayı doğrusunda ve gerekçesi kartta açılır. Son seçenek ayrı aralık kullanır: −2 < a < 3.",
  alt: "Sayı doğrusunda seçilen işlemin sonuç aralığı; uçlar dolu ya da boş noktayla gösteriliyor.",
  picks: OPS.map((o) => ({ label: o.label, title: `${o.label}: ${o.show}`, detail: o.detail })),
  draw: (_v, _s, pick = -1) => {
    const W = 8;
    const L = line(-4, 13, W, 0, [-3, 0, 3, 6, 9, 12]);
    const els: El[] = [...L.els];
    const o = pick >= 0 ? OPS[pick] : undefined;
    ["a + b", "a − b", "a · b", "a / b", "a²"].forEach((t, i) =>
      els.push(txt(v(0.4 + i * 1.8, 1.6), t, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })),
    );
    if (o) els.push(...interval(L.X, W, 0, o.lo, o.hi, o.cl, o.ch), txt(v(W / 2, 0.8), o.show, "c", { bold: true, tone: "a" }));
    else els.push(txt(v(W / 2, 0.8), "Bir işlem seç", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.6, 2.0), " ", "c"), txt(v(W + 0.6, -0.8), " ", "c"));
    return { els, readout: [o ? o.detail[0] : "Bir işleme tıkla ya da aşağıdan seç.", "Açık uca erişilemez: sınır değerini sonuca dahil etme."] };
  },
};

// 5 · 2024 TYT Temel Matematik 8: kâr ve zarar.
const profit: FigureDef = {
  caption:
    "2024 TYT Temel Matematik 8 (resmî kitapçıktan özet): maliyet 18 + 22 + b = 40 + b bin TL; bir satış 2b + 30 ile kâr, öteki 3b − 20 ile zarar. b’yi değiştir: iki koşulun birlikte sağlandığı aralık 10 < b < 30.",
  alt: "b ekseni üzerinde 10 ve 30 boş uçlu yeşil aralık. Üstte seçilen b için maliyet ve iki satış çubuğu karşılaştırılıyor.",
  param: { label: "b (bin TL)", min: 0, max: 40, step: 1, init: 20, unit: "", plain: true },
  draw: (b) => {
    const cost = 40 + b, s1 = 2 * b + 30, s2 = 3 * b - 20;
    const K = 0.045;
    const ok1 = s1 > cost, ok2 = s2 < cost;
    const bar = (y: number, val: number, tone: Tone, lab: string): El[] => [
      poly([v(0, y + 0.22), v(Math.max(val, 0) * K, y + 0.22), v(Math.max(val, 0) * K, y - 0.22), v(0, y - 0.22)], { fill: tone, tone }),
      txt(v(Math.max(val, 0) * K + 0.15, y), `${lab} ${val}`, "e", { small: true }),
    ];
    const els: El[] = [
      ...bar(2.6, cost, "muted", "maliyet"),
      ...bar(2.0, s1, ok1 ? "c" : "warn", "satış₁"),
      ...bar(1.4, s2, ok2 ? "c" : "warn", "satış₂"),
    ];
    const W = 8;
    const L = line(0, 40, W, 0, [0, 10, 20, 30, 40]);
    els.push(...L.els, ...interval(L.X, W, 0, 10, 30, false, false, "c"), dot(L.X(b), 0, true, ok1 && ok2 ? "a" : "warn"));
    els.push(txt(v(L.X(b), 0.45), `b = ${b}`, "c", { small: true, bold: true }));
    els.push(txt(v(-0.6, 3.1), " ", "c"), txt(v(W + 1.6, -0.8), " ", "c"));
    return {
      els,
      readout: [
        `Maliyet ${cost}; satış₁ ${s1} ${ok1 ? "> maliyet: kâr ✓" : s1 === cost ? "= maliyet: başa baş ✗" : "< maliyet ✗"}; satış₂ ${s2} ${ok2 ? "< maliyet: zarar ✓" : s2 === cost ? "= maliyet: başa baş ✗" : "> maliyet ✗"}.`,
        "Kâr: 2b + 30 > b + 40 ⇒ b > 10. Zarar: 3b − 20 < b + 40 ⇒ b < 30. Uçlarda başa baş olduğu için açık. “Zarar etmez” dense ≥ olurdu.",
      ],
    };
  },
};

export const mathFiguresInequality: Record<string, Record<string, FigureDef>> = {
  "basit-esitsizlikler": {
    "Yön yalnız negatifle çarpma ve bölmede neden döner?": reflect,
    "Bileşik eşitsizlikte bütün taraflara işlem uygula": compound,
    "‘Ve’ kesişim, ‘veya’ birleşimdir": andOr,
    "Ters alma, kare alma ve aralık işlemlerinde koşul": ops,
    "Sözel sınırı sembole çevir": profit,
  },
};
