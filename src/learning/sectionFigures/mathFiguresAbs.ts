import { ball, fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * Absolute value as distance. (1) The bar position in −3 + 4 − 5 + 6 − 7 = 3
 * decides which operations sit inside the absolute value: the logic of 2026 TYT
 * Temel Matematik 7 (only "after 5" gives 3). Each number is selectable and the
 * card evaluates that placement. (2) |x − 2| + |x + 1| is the sum of distances
 * to 2 and −1: constant 3 between them, larger outside. (3) y = |x − a| + b has
 * its vertex at (a, b); the inside sign shifts the other way.
 */

const NUMS = [-3, 4, -5, 6, -7];
const evalBar = (k: number) => {
  const inside = NUMS.slice(0, k + 1).reduce((a, b) => a + b, 0);
  const rest = NUMS.slice(k + 1).reduce((a, b) => a + b, 0);
  return { inside, rest, total: Math.abs(inside) + rest };
};
const m = (n: number) => String(n).replace("-", "−");
const shown = (n: number, i: number) => (i === 0 ? `−${-n}` : n < 0 ? `− ${-n}` : `+ ${n}`);

const barScope: FigureDef = {
  caption:
    "|−3 + 4 − 5 + 6 − 7 = 3 ifadesinde sağ çizgi eksik. Bir sayıya tıkla: çizgi o sayının sağına konur, içerisi önce toplanır, sonra mutlak değeri alınır. Yalnız 5'in sağı 3 verir (2026 TYT Temel Matematik 7 mantığı). Mutlak değeri her sayıya ayrı uygulamak işlemin kapsamını değiştirir.",
  alt: "Satırda −3, +4, −5, +6, −7 terimleri; solda açılış çizgisi; seçilen terimin sağında kapanış çizgisi ve çizginin içinde kalan terimler vurgulu.",
  picks: NUMS.map((n, k) => {
    const r = evalBar(k);
    const expr = NUMS.map((m, i) => shown(m, i)).slice(0, k + 1).join(" ");
    const tail = NUMS.slice(k + 1).map((m) => (m < 0 ? `− ${-m}` : `+ ${m}`)).join(" ");
    return {
      label: `${Math.abs(n)}'in sağı`,
      title: `Çizgi ${Math.abs(n)}'in sağında: |${expr}|${tail ? " " + tail : ""}`,
      detail: [
        `İçerisi: ${expr} = ${m(r.inside)} → |${m(r.inside)}| = ${Math.abs(r.inside)}`,
        tail ? `Dışarıdakiler: ${Math.abs(r.inside)} ${tail} = ${r.total}` : `Dışarıda terim yok; sonuç ${r.total}`,
        r.total === 3 ? "Sonuç 3: eşitlik sağlanır." : `Sonuç ${r.total} ≠ 3: bu konum olmaz.`,
      ],
    };
  }),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const X = (i: number) => 0.6 + i * 1.6;
    els.push(txt(v(0.15, 0), "|", "c", { bold: true }));
    NUMS.forEach((n, i) => {
      const inside = pick >= 0 && i <= pick;
      els.push(txt(v(X(i), 0), shown(n, i), "c", { bold: true, tone: inside ? "a" : pick >= 0 ? "muted" : "ink", pick: i }));
    });
    if (pick >= 0) {
      els.push(txt(v(X(pick) + 0.75, 0), "|", "c", { bold: true, tone: "a" }));
      els.push(poly([v(0, -0.45), v(X(pick) + 0.9, -0.45), v(X(pick) + 0.9, 0.45), v(0, 0.45)], { tone: "a", thin: true, dash: true }));
    }
    els.push(txt(v(X(4) + 1.1, 0), "= 3", "e", { bold: true }));
    els.push(txt(v(-0.4, 1.2), " ", "c"), txt(v(X(4) + 2.6, -1.0), " ", "c"));
    const r = pick >= 0 ? evalBar(pick) : undefined;
    return {
      els,
      readout: r ? [`İçerisi ${m(r.inside)}, mutlak değeri ${Math.abs(r.inside)}; sonuç ${r.total}`, r.total === 3 ? "Bu konum doğru." : "Bu konum 3 vermez."] : ["Bir sayıya tıkla ya da aşağıdan bir konum seç."],
    };
  },
};

const distSum: FigureDef = {
  caption:
    "|x − 2| + |x + 1|, x noktasının 2'ye ve −1'e uzaklıklarının toplamıdır. x iki nokta arasındayken toplam her zaman 3'tür (iki uç arası); dışarı çıkınca iki parça birlikte büyür. En küçük değer 3, x ∈ [−1, 2].",
  alt: "Sayı doğrusu −4'ten 6'ya; −1 ve 2 işaretli; sürgüyle kayan x noktasından −1'e ve 2'ye iki renkli uzaklık çubuğu.",
  param: { label: "x", min: -4, max: 6, step: 0.5, init: 4 },
  draw: (x) => {
    const els: El[] = [];
    els.push(seg(v(-4.4, 0), v(6.4, 0), { tone: "muted" }));
    for (let t = -4; t <= 6; t += 2) els.push(txt(v(t, 0), String(t).replace("-", "−"), "s", { small: true, tone: "muted" }));
    els.push(ball(v(-1, 0), 0.12, "b"), ball(v(2, 0), 0.12, "b"));
    els.push(txt(v(-1, 0.25), "−1", "n", { small: true, bold: true, tone: "b" }), txt(v(2, 0.25), "2", "n", { small: true, bold: true, tone: "b" }));
    const d1 = Math.abs(x - 2);
    const d2 = Math.abs(x + 1);
    els.push(seg(v(x, 1.0), v(2, 1.0), { tone: "a", bold: true }), seg(v(x, 2.0), v(-1, 2.0), { tone: "c", bold: true }));
    els.push(txt(v(Math.max(x, 2) + 0.15, 1.0), `|x − 2| = ${fmt(d1, 1)}`, "e", { small: true, tone: "a" }));
    els.push(txt(v(Math.max(x, -1) + 0.15, 2.0), `|x + 1| = ${fmt(d2, 1)}`, "e", { small: true, tone: "c" }));
    els.push(seg(v(x, -0.1), v(x, 2.1), { tone: "warn", dash: true }), ball(v(x, 0), 0.1, "warn"));
    els.push(txt(v(-4.8, 2.6), " ", "c"), txt(v(9.6, -0.8), " ", "c"));
    const inside = x >= -1 && x <= 2;
    return { els, readout: [`Toplam = ${fmt(d1, 1)} + ${fmt(d2, 1)} = ${fmt(d1 + d2, 1)}`, inside ? "x arada: toplam iki nokta arası uzaklık, 3." : "x dışarıda: fazladan gidiş-dönüş eklenir, toplam 3'ten büyük."] };
  },
};

const shiftV: FigureDef = {
  caption:
    "y = |x − a| + b: tepe (a, b). İçteki −a grafiği a birim SAĞA, dıştaki +b yukarı taşır. a sürgüsüyle tepeyi kaydır; b = −1 iken kökler a − 1 ve a + 1, tepeye eşit uzaklıktadır.",
  alt: "Koordinat düzleminde V biçimli y = |x − a| − 1 grafiği; tepe noktası (a, −1) ve x eksenini kestiği iki nokta.",
  param: { label: "a", min: -2, max: 3, step: 1, init: 2 },
  draw: (a) => {
    const b = -1;
    const els: El[] = [];
    els.push(seg(v(-4.5, 0), v(5.5, 0), { tone: "muted" }), seg(v(0, -1.6), v(0, 3.6), { tone: "muted" }));
    for (const t of [-4, -2, 2, 4]) if (Math.abs(t - a) > 1.5) els.push(txt(v(t, 0), String(t).replace("-", "−"), "s", { small: true, tone: "muted" }));
    els.push(poly([v(a - 4.2, 4.2 + b), v(a, b), v(a + 4.2, 4.2 + b)], { tone: "c", open: true, bold: true }));
    els.push(seg(v(a, b), v(a, 3.5), { tone: "muted", dash: true }));
    els.push(ball(v(a, b), 0.11, "warn"), txt(v(a + 0.2, b), `tepe (${a}, ${b})`.replace("-", "−").replace("(−", "(−"), "se", { small: true, bold: true, tone: "warn" }));
    els.push(ball(v(a - 1, 0), 0.08, "a"), ball(v(a + 1, 0), 0.08, "a"));
    els.push(txt(v(-4.8, 4.0), " ", "c"), txt(v(6.6, -2.0), " ", "c"));
    const sign = a >= 0 ? `x − ${a}` : `x + ${-a}`;
    return { els, readout: [`y = |${a === 0 ? "x" : sign}| − 1 → tepe (${a}, −1)`.replace("(-", "(−"), `Kökler: |${a === 0 ? "x" : sign}| = 1 → x = ${a - 1} veya ${a + 1}`.replace(/-(\d)/g, "−$1")] };
  },
};

export const mathFiguresAbs: Record<string, Record<string, FigureDef>> = {
  "tyt-mat-mutlak-deger-kaynak-038": {
    "Mutlak değer çizgisi işlem kapsamını belirler": barScope,
    "İki noktaya uzaklık toplamı neden arada sabit?": distSum,
    "Yatay ve düşey öteleme": shiftV,
  },
};
