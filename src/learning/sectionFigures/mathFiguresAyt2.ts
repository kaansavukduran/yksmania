import { ang, ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Matematik (2): trigonometric equation families on the unit circle and
 * the sine graph, vertical/horizontal line tests, Gauss pairing for arithmetic
 * sums, the remainder theorem on a cubic, and rotation of a point on the unit
 * circle (angle addition). Every point is computed from its formula.
 */

const fmt = (x: number, d = 3) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });
const rad = (d: number) => (d * Math.PI) / 180;
function axes(x0: number, x1: number, y0: number, y1: number, lx = "x", ly = "y"): El[] {
  return [vec(v(x0, 0), v(x1, 0), { tone: "ink" }), vec(v(0, y0), v(0, y1), { tone: "ink" }), txt(v(x1 + 0.05, 0), lx, "e", { tone: "ink", small: true }), txt(v(0, y1 + 0.05), ly, "n", { tone: "ink", small: true })];
}
function curve(f: (x: number) => number, a: number, b: number, n = 160): V[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / n;
    return v(x, f(x));
  });
}

/* ---------- Trig denklem: sin x = 1/2 ---------- */
const sinFamilies: FigureDef = {
  caption:
    "İleri ile sin x = 1/2'yi çöz. Birim çemberde y = 1/2 doğrusu çemberi iki noktada keser: 30° ve 180° − 30° = 150°. Her biri 360°'lik turla tekrar eder: x = 30° + k·360° ve x = 150° + k·360°. Sinüs grafiğinde aynı kökler y = 1/2 doğrusunun kesişimleridir.",
  alt: "Solda birim çember, y = 1/2 yatay doğrusu ve 30°, 150° yarıçapları; sağda sinüs eğrisi ve y = 1/2 doğrusunun 0–720° arasındaki dört kesişim noktası.",
  steps: ["Birim çember", "İki aile", "Grafikte tekrar"],
  draw: (_v, step) => {
    const els: El[] = [];
    const C = v(-3.2, 0);
    const R = 1.6;
    els.push(circle(C, R, { tone: "ink", thin: true }), seg(v(C[0] - 2, 0), v(C[0] + 2, 0), { tone: "muted", thin: true }), seg(v(C[0], -2), v(C[0], 2), { tone: "muted", thin: true }));
    els.push(seg(v(C[0] - 2, R / 2), v(C[0] + 2, R / 2), { tone: "warn", dash: true }), txt(v(C[0] + 2.05, R / 2), "y = 1/2", "e", { tone: "warn", small: true }));
    const P1 = v(C[0] + R * Math.cos(rad(30)), R * Math.sin(rad(30)));
    const P2 = v(C[0] + R * Math.cos(rad(150)), R * Math.sin(rad(150)));
    els.push(seg(C, P1, { tone: "b", bold: true }), ball(P1, 0.1, "b"), ang(C, v(C[0] + 1, 0), P1, "30°", { tone: "b", r: 34 }));
    if (step >= 1) els.push(seg(C, P2, { tone: "c", bold: true }), ball(P2, 0.1, "c"), txt(v(P2[0] - 0.1, P2[1] + 0.15), "150°", "nw", { tone: "c", small: true, bold: true }));
    if (step >= 2) {
      const X = (deg: number) => 0.8 + deg / 120;
      const Y = (y: number) => y * 1.2;
      els.push(vec(v(0.6, 0), v(X(760), 0), { tone: "ink" }), seg(v(0.8, -1.4), v(0.8, 1.5), { tone: "ink", thin: true }));
      els.push(poly(curve((d) => Y(Math.sin(rad(d))), 0, 720).map((p, i) => v(X((720 * i) / 160), p[1])), { tone: "b", open: true, bold: true, smooth: true }));
      els.push(seg(v(X(0), Y(0.5)), v(X(730), Y(0.5)), { tone: "warn", dash: true, thin: true }));
      for (const [d, t] of [
        [30, "b"],
        [150, "c"],
        [390, "b"],
        [510, "c"],
      ] as [number, Tone][])
        // The 150° family drops one row lower so neighbouring angle names never touch.
        els.push(ball(v(X(d), Y(0.5)), 0.09, t), seg(v(X(d), Y(0.5)), v(X(d), d % 360 === 150 ? -2.05 : -1.45), { tone: t, dash: true, thin: true }), txt(v(X(d), d % 360 === 150 ? -2.1 : -1.5), `${d}°`, "s", { tone: t, small: true }));
    }
    els.push(txt(v(-5.4, 2.2), " ", "c"), txt(v(7.4, -2.8), " ", "c"));
    const rows: [string, string][] = [
      ["sin x, birim çemberdeki noktanın y koordinatıdır. y = 1/2 olan ilk açı 30°.", "Tek bir kök bulmak çözüm kümesini bulmak değildir."],
      ["Sinüs ikinci bölgede de pozitif: 180° − 30° = 150°. Aileler: 30° + k·360° ve 150° + k·360°.", "Kosinüste aileler x = ±α + k·360°; tanjantta tur 180°'dir."],
      ["Grafikte [0°, 720°) aralığında dört kök: 30°, 150°, 390°, 510°.", "Aralık verildiyse k'yı tara; sin(2x) gibi iç açıyı önce tamamen çöz."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Fonksiyon: dikey ve yatay doğru testi ---------- */
const lineTest: FigureDef = {
  caption:
    "Sürgüyle doğruyu kaydır. f(x) = x² − 2 grafiğini her dikey doğru en çok bir noktada keser: fonksiyondur. Bazı yatay doğrular iki noktada keser: bire bir değildir, tersi yoktur. Tanım kümesi x ≥ 0'a kısıtlanırsa (son adım) yatay doğru da tek noktada keser.",
  alt: "Parabol y = x² − 2; sürgüye göre hareket eden kesik yatay doğru ve kesişim noktaları. Kısıtlanmış durumda parabolün sol kolu soluk.",
  param: { label: "Yatay doğru y = c", min: -2, max: 3, step: 0.25, init: 1 },
  draw: (c) => {
    const els: El[] = [...axes(-2.8, 2.8, -2.6, 3.4)];
    els.push(poly(curve((x) => x * x - 2, -2.3, 2.3), { tone: "b", open: true, bold: true, smooth: true }));
    els.push(seg(v(-2.6, c), v(2.6, c), { tone: "warn", dash: true }), txt(v(-2.65, c), `y = ${fmt(c, 2)}`, "w", { tone: "warn", small: true }));
    const hits: V[] = c > -2 ? [v(-Math.sqrt(c + 2), c), v(Math.sqrt(c + 2), c)] : c === -2 ? [v(0, -2)] : [];
    for (const h of hits) els.push(ball(h, 0.1, "warn"));
    els.push(seg(v(1.2, -2.6), v(1.2, 3.2), { tone: "c", dash: true, thin: true }), ball(v(1.2, 1.2 * 1.2 - 2), 0.09, "c"), txt(v(1.2, -2.6), "dikey: 1 nokta", "s", { tone: "c", small: true }));
    els.push(txt(v(-3.2, 3.8), " ", "c"), txt(v(4.2, -3.4), " ", "c"));
    return {
      els,
      readout: [
        `y = ${fmt(c, 2)} yatay doğrusu ${hits.length} noktada kesiyor${hits.length === 2 ? `: x = ±${fmt(Math.sqrt(c + 2), 3)}` : ""}.`,
        hits.length === 2 ? "İki farklı x aynı çıktıyı veriyor: bire bir değil. Ters fonksiyon için tanım kümesini kısıtla (ör. x ≥ 0)." : "Görüntü kümesi [−2, ∞): y < −2 hiç kesilmez, örten olması değer kümesine bağlıdır.",
      ],
    };
  },
};

/* ---------- Diziler: Gauss eşleme ---------- */
const gauss: FigureDef = {
  caption:
    "İleri ile 1 + 2 + … + n toplamını eşleştirerek türet (n = 6). Merdiveni ters çevrilmiş kopyasıyla birleştirince n × (n + 1) boyutunda bir dikdörtgen oluşur; toplam bunun yarısıdır: n(n + 1)/2 = 21. Aynı fikir her aritmetik dizide çalışır: (ilk + son) × terim sayısı / 2.",
  alt: "Altı sütunlu merdiven: yükseklikler 1'den 6'ya; ikinci adımda üstüne ters merdiven eklenip 6 × 7'lik dikdörtgen tamamlanıyor.",
  steps: ["Merdiven", "Ters kopya", "Yarısı"],
  draw: (_v, step) => {
    const n = 6;
    const u = 0.55;
    const els: El[] = [];
    for (let i = 1; i <= n; i++) {
      const x = (i - 1) * u;
      for (let j = 0; j < i; j++) els.push(poly([v(x, j * u), v(x + u, j * u), v(x + u, (j + 1) * u), v(x, (j + 1) * u)], { tone: "b", fill: "b", thin: true }));
      if (step >= 1) for (let j = i; j < n + 1; j++) els.push(poly([v(x, j * u), v(x + u, j * u), v(x + u, (j + 1) * u), v(x, (j + 1) * u)], { tone: "c", fill: "c", thin: true }));
      els.push(txt(v(x + u / 2, -0.15), String(i), "s", { tone: "ink", small: true }));
    }
    if (step >= 1) els.push(txt(v(n * u + 0.2, ((n + 1) * u) / 2), `${n + 1} kat`, "e", { tone: "ink", small: true, bold: true }), txt(v((n * u) / 2, (n + 1) * u + 0.15), `${n} sütun`, "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-0.6, 4.6), " ", "c"), txt(v(5.2, -0.6), " ", "c"));
    const rows: [string, string][] = [
      ["1 + 2 + 3 + 4 + 5 + 6: mavi kareler merdiveni.", "Her sütun bir terim; sütun yüksekliği terimin değeri."],
      ["Ters kopya (yeşil) eklenince her sütun 1 + 6 = 2 + 5 = … = 7 olur: 6 × 7 = 42 kare.", "Eşleştirme: ilk + son = ikinci + sondan ikinci = sabit."],
      ["Toplam = 42 / 2 = 21 = n(n + 1)/2.", "Genel aritmetik dizi: Sₙ = n(a₁ + aₙ)/2. Sₙ − Sₙ₋₁ = aₙ ile toplamdan tek terime dönülür."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Polinom: kalan teoremi ---------- */
const P = (x: number) => x * x * x - 2 * x + 1;
const remainder: FigureDef = {
  caption:
    "Sürgüyle a'yı değiştir. P(x) = x³ − 2x + 1 polinomunun (x − a) ile bölümünden kalan P(a)'dır: grafikte x = a'daki yükseklik. Kalan 0 olduğunda (x = 1'de) x − 1 bir çarpandır (çarpan teoremi).",
  alt: "Kübik eğri y = x³ − 2x + 1; sürgüye göre x = a'daki dikey kesik çizgi ve eğri üzerindeki nokta; x = 1'de eğri ekseni kesiyor.",
  param: { label: "a", min: -2, max: 2, step: 0.25, init: 2 },
  draw: (a) => {
    const els: El[] = [...axes(-2.4, 2.6, -3.4, 5.4)];
    els.push(poly(curve(P, -2.05, 2.05), { tone: "b", open: true, bold: true, smooth: true }));
    const y = P(a);
    els.push(seg(v(a, 0), v(a, y), { tone: "warn", dash: true }), ball(v(a, y), 0.1, "warn"), txt(v(a, y), `P(${fmt(a, 2)}) = ${fmt(y, 3)}`, a > 0 ? (y >= 0 ? "nw" : "sw") : y >= 0 ? "ne" : "se", { tone: "warn", small: true, bold: true }));
    for (const t of [-2, -1, 1, 2]) els.push(seg(v(t, -0.08), v(t, 0.08), { tone: "ink" }), txt(v(t, -0.2), String(t), "s", { tone: "ink", small: true, soft: true }));
    els.push(txt(v(-2.8, 5.8), " ", "c"), txt(v(4.4, -3.7), " ", "c"));
    return {
      els,
      readout: [
        `P(x) = (x − ${fmt(a, 2)})·Q(x) + ${fmt(y, 3)}: x = ${fmt(a, 2)} koyunca ilk terim sıfırlanır, kalan P(${fmt(a, 2)}).`,
        Math.abs(y) < 1e-9 ? "Kalan 0: (x − a) bir çarpandır, a bir köktür." : "Bölüm eşitliğini önce yaz: P(x) = B(x)·Q(x) + K(x), der K < der B.",
      ],
    };
  },
};

/* ---------- Dönme: toplam formülü ---------- */
const rotation: FigureDef = {
  caption:
    "Sürgüyle β kadar döndür. Birim çemberde α açısındaki nokta (cos α, sin α). β kadar daha dönünce (cos(α + β), sin(α + β)) olur; iki koordinat birlikte değişir: sin(α + β) = sin α cos β + cos α sin β. α = 30° sabit.",
  alt: "Birim çember, 30° açısında mavi nokta, sürgüye göre β kadar ileride turuncu nokta; turuncu noktanın x ve y koordinatlarına inen kesik çizgiler.",
  param: { label: "β", min: 0, max: 150, step: 15, init: 45, unit: "°" },
  draw: (b) => {
    const a = 30;
    const R = 2;
    const els: El[] = [circle(v(0, 0), R, { tone: "ink", thin: true }), ...axes(-2.5, 2.6, -2.5, 2.6)];
    const A = v(R * Math.cos(rad(a)), R * Math.sin(rad(a)));
    const B = v(R * Math.cos(rad(a + b)), R * Math.sin(rad(a + b)));
    els.push(seg(v(0, 0), A, { tone: "b", bold: true }), ball(A, 0.1, "b"), seg(v(0, 0), B, { tone: "warn", bold: true }), ball(B, 0.1, "warn"));
    if (b > 0) els.push(ang(v(0, 0), A, B, "β", { tone: "warn", r: 62 }));
    els.push(ang(v(0, 0), v(1, 0), A, "α", { tone: "b", r: 34 }));
    els.push(seg(B, v(B[0], 0), { tone: "warn", dash: true, thin: true }), seg(B, v(0, B[1]), { tone: "warn", dash: true, thin: true }));
    els.push(txt(v(-3, 3), " ", "c"), txt(v(3.2, -2.9), " ", "c"));
    const s = Math.sin(rad(a + b));
    const c = Math.cos(rad(a + b));
    return {
      els,
      readout: [
        `α + β = ${a + b}°: sin = ${fmt(s, 3)}, cos = ${fmt(c, 3)}`,
        `sin α cos β + cos α sin β = ${fmt(Math.sin(rad(a)) * Math.cos(rad(b)) + Math.cos(rad(a)) * Math.sin(rad(b)), 3)} (aynı değer). sin(α + β) ≠ sin α + sin β = ${fmt(Math.sin(rad(a)) + Math.sin(rad(b)), 3)}.`,
      ],
    };
  },
};

const piecewiseDomain: FigureDef = {
  caption: "x = 1 iki kuralın sınırı. Açık nokta x + 2 kuralının dışarıda kalan ucunu gösterir. Dolu nokta 2x + 2 kuralına göre g(1) değeridir.",
  alt: "Parçalı grafik. (−2,0) dolu ile (1,3) boş arasında bir doğru parçası. (1,4) dolu ile (3,8) dolu arasında başka doğru parçası. Düşey kesikli çizgi seçilen girdiden geçer.",
  param: { label: "Girdi x", min: -2, max: 3, step: 0.5, init: 1 },
  draw: (x) => {
    const left = (n: number) => n + 2;
    const right = (n: number) => 2 * n + 2;
    const value = x < 1 ? left(x) : right(x);
    const point = (a: number, b: number) => v(a * 1.2, b * 0.52);
    const open = point(1, left(1));
    const included = point(1, right(1));
    const els: El[] = [
      ...axes(-3.0, 4.35, -0.45, 4.65, "x", "g(x)"),
      seg(point(x, -0.35), point(x, 8.45), { tone: "muted", dash: true }),
      seg(point(-2, left(-2)), point(0.91, left(0.91)), { tone: "a", bold: true }),
      seg(included, point(3, right(3)), { tone: "b", bold: true }),
      circle(open, 0.12, { tone: "a" }),
      ball(point(-2, left(-2)), 0.09, "a"),
      ball(included, 0.105, "b"),
      ball(point(3, right(3)), 0.105, "b"),
      circle(point(x, value), 0.18, { tone: "warn" }),
      txt(v(-3.22, 5.12), "", "c"),
      txt(v(4.92, -0.8), "", "c"),
    ];
    for (const tick of [-2, -1, 0, 1, 2, 3]) {
      els.push(txt(point(tick, -0.42), fmt(tick).replace("-", "−"), "s", { small: true }));
    }
    for (const tick of [2, 4, 6, 8]) {
      els.push(txt(point(-0.12, tick), String(tick), "w", { small: true }));
    }
    return { els, readout: [
      `x = ${fmt(x).replace("-", "−")} için ${x < 1 ? "x + 2" : "2x + 2"} kullanılır. g(x) = ${fmt(value)}.`,
      "Sınırda (1, 3) açık, (1, 4) doludur. x = 1 için g(1) = 4.",
    ] };
  },
};

const quadraticRemainder: FigureDef = {
  caption: "İki yüksekliği aynı x değerinde karşılaştır. Sürekli eğri P, kesikli doğru kalandır. Sürgüyü 1 ve 2 köklerine, ardından 0’a getir.",
  alt: "Aynı koordinat sisteminde P(x) = x³ + 2x + 1 kübik eğrisi ve R(x) = 9x − 5 kesikli doğrusu. 1 ve 2 kökleri aynı yüksekliği verir. Sürgü seçilen x’te iki değeri gösterir.",
  param: { label: "Karşılaştırılan x", min: 0, max: 2.5, step: 0.25, init: 1 },
  draw: (x) => {
    const polynomial = (a: number) => a ** 3 + 2 * a + 1;
    const slope = polynomial(2) - polynomial(1);
    const remaining = (a: number) => polynomial(1) + slope * (a - 1);
    const divisor = (x - 1) * (x - 2);
    const point = (a: number, y: number) => v(a * 2.5, y * 0.24);
    const show = (n: number) => fmt(n).replace("-", "−");
    const p = polynomial(x);
    const r = remaining(x);
    const start = -0.25;
    const end = 2.5;
    const els: El[] = [
      ...axes(-1, 6.65, -2.05, 5.55, "x", "y"),
      poly(curve(polynomial, start, end, 88).map(([a, y]) => point(a, y)), { tone: "b", open: true, bold: true }),
      seg(point(start, remaining(start)), point(end, remaining(end)), { tone: "warn", dash: true, bold: true }),
      seg(point(x, 0), point(x, Math.max(p, r)), { tone: "muted", thin: true, dash: true }),
      ball(point(x, p), 0.105, p === r ? "c" : "b"),
      txt(v(-1.9, 6.3), "", "c"),
      txt(v(7.1, -2.65), "", "c"),
    ];
    if (p !== r) {
      els.push(seg(point(x, p), point(x, r), { tone: "a", dash: true }), ball(point(x, r), 0.105, "warn"));
    }
    for (const a of [0, 1, 2]) els.push(txt(point(a, -1), String(a), "s", { small: true }));
    for (const y of [-5, 5, 10, 15, 20]) els.push(txt(point(-0.06, y), show(y), "w", { small: true }));
    return {
      els,
      readout: [
        `x = ${show(x)} için P(x) = ${show(p)}, R(x) = ${show(r)}.`,
        divisor === 0
          ? "D(x) = 0. x bu bölenin kökü olduğu için P(x) ile R(x) eşit."
          : `P(x) − R(x) = ${show(p - r)}. Bu fark D(x) · (x + 3) çarpımından gelir.`,
      ],
    };
  },
};

export const mathFiguresAyt2: Record<string, Record<string, FigureDef>> = {
  "ayt-trigonometrik-denklemler": { "Sinüste iki simetrik aileyi kur": sinFamilies },
  "ayt-fonksiyonlar": {
    "Grafik noktaları ve iki doğru testi": lineTest,
    "Parçalı fonksiyonda açık ve dolu ucu ayır": piecewiseDomain,
  },
  "ayt-diziler": { "Aritmetik toplamı eşleştirerek türet": gauss },
  "ayt-polinomlar": {
    "Doğrusal bölenin kökü kalanı verir": remainder,
    "İkinci derece bölenin iki köküyle kalanı kur": quadraticRemainder,
  },
  "ayt-toplam-fark-yarim-aci": { "Dönme, iki koordinatı birlikte değiştirir": rotation },
};
