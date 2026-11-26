import {
  ang,
  ball,
  circle,
  meet,
  mid,
  par,
  pol,
  poly,
  pt,
  right,
  seg,
  span,
  ticks,
  txt,
  v,
  vec,
  dim,
  type El,
  type FigureDef,
  type Tone,
  type V,
} from "./figureKit";
import {
  absRows207,
  absSection207,
  equationSection207,
  equationSteps207,
  fracText207,
  fracValue207,
  inequalityRows207,
  inequalitySection207,
  kindComparison207,
  quadConditionTests207,
  sufficiencyRows207,
  sufficiencySection207,
  thirdSideRows207,
  thirdSideSection207,
  triangleKind207,
} from "../depth207";

/*
 * 0.207.0 tablo bölümlerinin çizimleri. Koordinatlar, etiketler ve okumalar
 * tabloyu üreten aynı veri fonksiyonlarından gelir.
 */

const num = (x: number) => String(x).replace("-", "−");
const capital = (s: string) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);

/* ---------- Üçgen: üçüncü kenarın tam sayı değerleri ---------- */

const triRow = thirdSideRows207()[0];
const triFigure: FigureDef = {
  caption:
    `${triRow.a} ve ${triRow.b} birimlik kenarlar C köşesinde birleşir. c’yi seç: A noktası kesikli yay üzerinde kayar, en büyük açı işaretlenir ve türü okunur.`,
  alt: `C köşesinden yatay ${triRow.b} birimlik CB kenarı ve ${triRow.a} birimlik CA kenarı. A, merkezi C olan ${triRow.a} yarıçaplı kesikli yay üzerindedir; AB = c uzunluğu ${triRow.values[0]} ile ${triRow.values.at(-1)} arasında seçilir ve en büyük açı dar, dik ya da geniş olarak işaretlenir.`,
  steps: triRow.values.map((c) => `c = ${c}`),
  draw: (_, step) => {
    const { a, b } = triRow;
    const c = triRow.values[step];
    const kind = triangleKind207(a, b, c)!;
    const cmp = kindComparison207(a, b, c);
    const cosC = (a * a + b * b - c * c) / (2 * a * b);
    const C = v(0, 0);
    const B = v(b, 0);
    const A = v(a * cosC, a * Math.sqrt(1 - cosC * cosC));
    // En uzun kenarın karşısındaki köşe: AB = c → C, CB = b → A, CA = a → B.
    const opposite: [number, V, V, V][] = [[c, C, A, B], [b, A, C, B], [a, B, A, C]];
    const [, O, P, Q] = opposite.reduce((best, item) => (item[0] > best[0] ? item : best));
    const tone: Tone = kind === "geniş" ? "warn" : kind === "dik" ? "c" : "a";
    // Yay A’dan sola doğru çizilir; üçgenin içinden geçen kısmı gösterilmez.
    const start = (Math.acos(cosC) * 180) / Math.PI;
    const arc = Array.from({ length: 31 }, (_, i) => pol(a, start + ((180 - start) * i) / 30));
    const els: El[] = [
      poly(arc, { open: true, dash: true, tone: "muted", thin: true }),
      poly([A, B, C], { fill: "a" }),
      kind === "dik" ? right(O, P, Q, tone) : ang(O, P, Q, undefined, { tone, fill: true }),
      dim(C, B, String(b), A),
      dim(C, A, String(a), B),
      dim(A, B, `c = ${c}`, C, "b"),
      pt(A, "A", "n"),
      pt(B, "B", "se"),
      pt(C, "C", "sw"),
    ];
    return {
      els,
      readout: [
        `${triRow.lo} < c < ${triRow.hi}; seçilen c = ${c}`,
        `En uzun kenar ${cmp.r}: ${cmp.text}`,
        `${capital(kind)} açılı üçgen`,
      ],
    };
  },
};

/* ---------- Dörtgen: koşulun yeterliliği ---------- */

const suffRows = sufficiencyRows207();
const dirFrom = (o: V, p: V) => {
  const dirs = ["e", "ne", "n", "nw", "w", "sw", "s", "se"] as const;
  const angle = (Math.atan2(p[1] - o[1], p[0] - o[0]) * 180) / Math.PI;
  return dirs[(Math.round(angle / 45) + 8) % 8];
};
const quadFigure: FigureDef = {
  caption:
    "Her adım tablonun bir satırındaki örnek dörtgendir. Köşegenler kesikli; dik kesişme, ortalanan yarılar ve paralel kenarlar yalnız örnekte gerçekten sağlandığında işaretlenir.",
  alt: "Seçilen satırın örnek dörtgeni ve iki köşegeni. Köşegenler birbirini ortalıyorsa yarıları çentikle, dik kesişiyorsa kesişimde dik açı işaretiyle, paralel kenarlar okla gösterilir.",
  steps: suffRows.map(({ target, sufficient }) => `${target} · ${sufficient ? "yeterli" : "yetmez"}`),
  draw: (_, step) => {
    const row = suffRows[step];
    const [A, B, C, D] = row.example.map(([x, y]) => v(x, y));
    const K = meet(A, C, B, D);
    const center = mid(mid(A, C), mid(B, D));
    const holds = (key: keyof typeof quadConditionTests207) => quadConditionTests207[key].holds(row.example);
    const els: El[] = [
      poly([A, B, C, D], { fill: row.sufficient ? "a" : "c" }),
      seg(A, C, { tone: "b", dash: true }),
      seg(B, D, { tone: "b", dash: true }),
    ];
    if (holds("bisect")) els.push(ticks(A, K, 1, "b"), ticks(K, C, 1, "b"), ticks(B, K, 2, "b"), ticks(K, D, 2, "b"));
    if (holds("perpendicularDiagonals")) els.push(right(K, C, D, "b"));
    if (row.conditions.includes("parallelAndOtherEqual")) els.push(par(A, B, 1), par(D, C, 1), ticks(A, D, 1), ticks(B, C, 1));
    els.push(pt(K, undefined, "s", "b"));
    for (const [P, name] of [[A, "A"], [B, "B"], [C, "C"], [D, "D"]] as [V, string][]) els.push(pt(P, name, dirFrom(center, P)));
    return {
      els,
      readout: [
        `Koşul: ${row.conditionText}`,
        `${row.target} için ${row.sufficient ? "yeterli" : "yetmez"}; örnek: ${row.name.toLocaleLowerCase("tr")}`,
        `AC = ${row.diagonals[0]}, BD = ${row.diagonals[1]}`,
      ],
    };
  },
};

/* ---------- Denklem: iki tarafın doğruları ---------- */

const eq = equationSteps207();
const xMax = eq.root + 2;
const sideValues = eq.rows.flatMap(({ left, right: r }) => [left, r].flatMap((s) => [s.k, s.x * xMax + s.k]));
const yMin = Math.min(0, ...sideValues);
const yMax = Math.max(0, ...sideValues);
const sy = 5 / (yMax - yMin);
const Y = (y: number) => y * sy;
const eqFigure: FigureDef = {
  caption:
    `İki doğru denklemin sol ve sağ tarafını x’e göre çizer; renkler alttaki açıklamada. Her adımda iki doğru da değişir ama kesişim noktasının x’i hep ${eq.root} olur: kök korunur.`,
  alt: `Yatay x ekseni 0 ile ${xMax} arasında, düşey eksen taraf değerleri. Her adımda denklemin sol ve sağ tarafının doğruları çizilir; kesişim noktasından x eksenine inen kesikli çizgi x = ${eq.root} gösterir.`,
  steps: eq.rows.map(({ operation }, i) => (i === 0 ? "Başlangıç" : operation.replace("İki taraftan ", "").replace("İki tarafa ", "").replace("İki tarafı ", ""))),
  draw: (_, step) => {
    const row = eq.rows[step];
    const [leftText, rightText] = row.text.split(" = ");
    const at = (s: { x: number; k: number }, x: number) => v(x, Y(s.x * x + s.k));
    const meetPoint = v(eq.root, Y(row.leftValue));
    const els: El[] = [
      vec(v(0, 0), v(xMax + 0.5, 0), { thin: true, tone: "muted" }),
      vec(v(0, Y(yMin) - 0.2), v(0, Y(yMax) + 0.4), { thin: true, tone: "muted" }),
      txt(v(xMax + 0.5, 0), "x", "se", { small: true, tone: "muted" }),
    ];
    for (let x = 2; x <= xMax; x += 2) {
      if (x === eq.root) continue;
      els.push(seg(v(x, -0.08), v(x, 0.08), { thin: true, tone: "muted" }), txt(v(x, -0.12), num(x), "s", { small: true, soft: true, tone: "muted" }));
    }
    for (let y = Math.ceil(yMin / 10) * 10; y <= yMax; y += 10) {
      if (y === 0) continue;
      els.push(seg(v(-0.08, Y(y)), v(0.08, Y(y)), { thin: true, tone: "muted" }), txt(v(-0.15, Y(y)), num(y), "w", { small: true, soft: true, tone: "muted" }));
    }
    els.push(
      seg(at(row.left, 0), at(row.left, xMax), { tone: "a", bold: true }),
      seg(at(row.right, 0), at(row.right, xMax), { tone: "b", bold: true }),
      seg(meetPoint, v(eq.root, 0), { tone: "c", dash: true, thin: true }),
      pt(meetPoint, undefined, "n", "c"),
      txt(v(eq.root, -0.12), `x = ${eq.root}`, "s", { small: true, bold: true, tone: "c" }),
    );
    return {
      els,
      legend: [
        { code: "1", label: `Sol taraf: ${leftText}`, tone: "a" },
        { code: "2", label: `Sağ taraf: ${rightText}`, tone: "b" },
      ],
      readout: [
        `${row.operation}: ${row.text}`,
        `x = ${eq.root} iken sol ${num(row.leftValue)}, sağ ${num(row.rightValue)}`,
        `Kesişim (${eq.root}; ${num(row.leftValue)}); kök değişmedi`,
      ],
    };
  },
};

/* ---------- Sayı doğrusu yardımcıları ---------- */

const H = 0.13;
const endDot = (x: number, closed: boolean, tone: Tone = "a"): El =>
  closed ? ball(v(x, 0), H, tone) : circle(v(x, 0), H, { tone, bold: true });
function numberLine(lo: number, hi: number): El[] {
  const els: El[] = [
    seg(v(lo - 0.5, 0), v(hi + 0.5, 0), { thin: true, tone: "muted" }),
    vec(v(lo - 0.3, 0), v(lo - 0.8, 0), { thin: true, tone: "muted" }),
    vec(v(hi + 0.3, 0), v(hi + 0.8, 0), { thin: true, tone: "muted" }),
  ];
  for (let t = lo; t <= hi; t += 1)
    els.push(seg(v(t, -0.08), v(t, 0.08), { thin: true, tone: "muted" }), txt(v(t, -0.18), num(t), "s", { small: true, soft: true, tone: "muted" }));
  return els;
}
/** Bir parça: uçlar sonlu ya da ok ucu. */
function piece(lo: number, hi: number, from: number | undefined, fromClosed: boolean, to: number | undefined, toClosed: boolean): El[] {
  const x0 = from ?? lo - 0.6;
  const x1 = to ?? hi + 0.6;
  const els: El[] = from === undefined ? [vec(v(x1, 0), v(x0, 0), { bold: true, tone: "a" })] : to === undefined ? [vec(v(x0, 0), v(x1, 0), { bold: true, tone: "a" })] : [seg(v(x0, 0), v(x1, 0), { bold: true, tone: "a" })];
  if (from !== undefined) els.push(endDot(from, fromClosed));
  if (to !== undefined) els.push(endDot(to, toClosed));
  return els;
}
const DOT_Y = 0.5;
const intDots = (xs: readonly number[]): El[] => xs.map((x) => ball(v(x, DOT_Y), 0.12, "b"));

/* ---------- Basit eşitsizlik ---------- */

const ineqRows = inequalityRows207();
const ineqEnds = ineqRows.flatMap(({ lower, upper }) => [lower, upper].flatMap((b) => (b ? [fracValue207(b.v)] : [])));
const ineqLo = Math.floor(Math.min(...ineqEnds)) - 1;
const ineqHi = Math.ceil(Math.max(...ineqEnds)) + 1;
const ineqFigure: FigureDef = {
  caption:
    "Her adım tablonun bir satırının çözümünü sayı doğrusunda gösterir. Dolu nokta uç dahil, boş nokta uç hariç; ok aralığın o yönde sınırsız sürdüğünü, doğrunun hemen üstündeki küçük noktalar sınırlı aralıktaki tam sayıları gösterir.",
  alt: `${num(ineqLo)} ile ${ineqHi} arasında sayı doğrusu. Seçilen eşitsizliğin çözüm aralığı kalın çizgiyle, uçları dolu ya da boş noktayla, kesirli uçların değeri üstte yazılı; sınırlı aralıkta tam sayı çözümleri doğrunun hemen üstünde küçük noktalarla gösterilir.`,
  steps: ineqRows.map(({ text }) => text),
  draw: (_, step) => {
    const row = ineqRows[step];
    const lo = row.lower && fracValue207(row.lower.v);
    const hi = row.upper && fracValue207(row.upper.v);
    const els: El[] = [
      ...numberLine(ineqLo, ineqHi),
      ...piece(ineqLo, ineqHi, lo, !!row.lower && !row.lower.strict, hi, !!row.upper && !row.upper.strict),
    ];
    for (const b of [row.lower, row.upper]) if (b && b.v.d !== 1) els.push(txt(v(fracValue207(b.v), 1.05), fracText207(b.v), "c", { small: true, bold: true, tone: "a" }));
    if (row.integers) els.push(...intDots(row.integers));
    return {
      els,
      readout: [
        `${row.text} ⇒ ${row.solution} (${row.operation})`,
        `Aralık ${row.interval}; ${row.ends}`,
        `Tam sayılar: ${row.integerText}`,
      ],
    };
  },
};

/* ---------- Mutlak değer ---------- */

const absRows = absRows207();
const absEnds = absRows.flatMap(({ left, right: r }) => [fracValue207(left), fracValue207(r)]);
const absLo = Math.floor(Math.min(...absEnds)) - 1;
const absHi = Math.ceil(Math.max(...absEnds)) + 1;
const absFigure: FigureDef = {
  caption:
    "Her adımda koşul |x − a| ◇ r biçimine getirilir. Merkez a’dan iki yana r kadar ölçülür; <, ≤ içeriyi, = iki ucu, > dışarıyı seçer. Doğrunun hemen üstündeki küçük noktalar sınırlı çözümdeki tam sayılardır.",
  alt: `${num(absLo)} ile ${absHi} arasında sayı doğrusu. Seçilen koşulun merkezi a doğrunun altında yazılı; merkezden iki yana r uzunluğunda ölçü çizgileri, çözüm bölgesi kalın çizgi ve uç noktalarla, tam sayı çözümleri doğrunun hemen üstünde küçük noktalarla gösterilir.`,
  steps: absRows.map(({ text }) => text),
  draw: (_, step) => {
    const row = absRows[step];
    const c = fracValue207(row.center);
    const L = fracValue207(row.left);
    const R = fracValue207(row.right);
    const closed = !row.strict;
    const els: El[] = [...numberLine(absLo, absHi)];
    if (row.rel === "=") els.push(ball(v(L, 0), H, "a"), ball(v(R, 0), H, "a"));
    else if (row.inside) els.push(...piece(absLo, absHi, L, closed, R, closed));
    else els.push(...piece(absLo, absHi, undefined, false, L, closed), ...piece(absLo, absHi, R, closed, undefined, false));
    const r = fracText207(row.radius);
    els.push(
      seg(v(c, 0), v(c, 1.2), { tone: "c", thin: true, dash: true }),
      ...span(v(L, 1.2), v(c, 1.2), r, 1, "c"),
      ...span(v(c, 1.2), v(R, 1.2), r, 1, "c"),
      txt(v(c, -1.3), `a = ${fracText207(row.center)}`, "s", { small: true, bold: true, tone: "c" }),
    );
    if (row.integers) els.push(...intDots(row.integers));
    return {
      els,
      readout: [
        `${row.text}: a = ${fracText207(row.center)}, r = ${r}`,
        `${row.distanceText} ⇒ ${row.solution}`,
        `Tam sayılar: ${row.integerText}`,
      ],
    };
  },
};

export const depthFigures207: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-ucgen-esitsizligi-031": { [thirdSideSection207.title]: triFigure },
  "tyt-geo-dortgen-hiyerarsi-032": { [sufficiencySection207.title]: quadFigure },
  "birinci-dereceden-denklemler": { [equationSection207.title]: eqFigure },
  "basit-esitsizlikler": { [inequalitySection207.title]: ineqFigure },
  "mutlak-deger": { [absSection207.title]: absFigure },
};
