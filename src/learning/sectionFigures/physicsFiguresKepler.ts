import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

/*
 * AYT Fizik · Kepler yasaları. İdeal iki cisim modeli: yıldız odakta sabit,
 * gezegen kütlesi ihmal. Sektörler Kepler denklemi M = E − e·sinE ile
 * hesaplanır, yani boyalı alanlar gerçekten eşit süreye karşılık gelir.
 * Sayısal örnekler özgündür (GM = 80 m³/s², m = 1 kg, a = 5 m).
 */

const f1 = (x: number, d = 2) => String(Math.round(x * 10 ** d) / 10 ** d).replace(".", ",").replace("-", "−");

/** Point on an ellipse with semi-major a, eccentricity e, focus at origin, perihelion on +x. */
function atE(a: number, e: number, E: number): V {
  const b = a * Math.sqrt(1 - e * e);
  return v(a * (Math.cos(E) - e), b * Math.sin(E));
}
function solveKepler(M: number, e: number) {
  let E = M;
  for (let i = 0; i < 30; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}
function ellipse(a: number, e: number, K: number): V[] {
  const pts: V[] = [];
  for (let i = 0; i < 72; i++) { const p = atE(a, e, (i / 72) * Math.PI * 2); pts.push(v(p[0] * K, p[1] * K)); }
  return pts;
}

// 1 · Elips geometrisi.
const geometry: FigureDef = {
  caption:
    "Büyük yarı eksen a = 5 sabit; dış merkezliliği değiştir. Yıldız merkezde değil odaktadır. rp = a(1 − e), ra = a(1 + e), c = ae, b = √(a² − c²). e = 0’da yörünge çembere döner.",
  alt: "Odaklarından birinde yıldız bulunan elips. En yakın ve en uzak uzaklıklar, merkez ile odak arası uzaklık işaretli.",
  param: { label: "Dış merkezlilik e", min: 0, max: 0.8, step: 0.1, init: 0.6, unit: "" },
  draw: (e) => {
    const a = 5, K = 0.5, c = a * e, b = a * Math.sqrt(1 - e * e), rp = a - c, ra = a + c;
    const els: El[] = [poly(ellipse(a, e, K), { tone: "b" })];
    els.push(ball(v(0, 0), 0.22, "warn"), txt(v(0, -0.45), "yıldız (odak)", "c", { small: true, tone: "warn" }));
    els.push(circle(v(-c * K, 0), 0.07, { tone: "muted", fill: "muted" }), txt(v(-c * K - 0.12, 0.42), "merkez", "w", { small: true, tone: "muted" }));
    if (e > 0) els.push(circle(v(-2 * c * K, 0), 0.08, { tone: "muted", bold: true }));
    els.push(seg(v(0, 0), v(rp * K, 0), { tone: "a", bold: true }), seg(v(0, 0), v(-ra * K, 0), { tone: "c", dash: true }));
    els.push(txt(v(rp * K + 0.25, 0.3), `rp = ${f1(rp, 1)}`, "e", { small: true, tone: "a" }), txt(v((-ra * K) / 2 - 0.4, -0.3), `ra = ${f1(ra, 1)}`, "c", { small: true, tone: "c" }));
    els.push(seg(v(-c * K, 0), v(-c * K, b * K), { thin: true, tone: "muted" }), txt(v(-c * K + 0.15, (b * K) / 2), `b = ${f1(b, 2)}`, "e", { small: true, tone: "muted" }));
    els.push(txt(v(-5.6 * K - 1.0, 3.2), " ", "c"), txt(v(5 * K + 2.0, -3.0), " ", "c"));
    return {
      els,
      readout: [
        `e = ${f1(e, 1)}: rp = ${f1(rp, 1)}, ra = ${f1(ra, 1)}, a = (rp + ra)/2 = 5, c = ${f1(c, 1)}, b = ${f1(b, 2)}.`,
        "Uzaklıklar yıldızdan, a elips merkezinden ölçülür; rp tek başına a değildir. Periyodu a belirler, e değil.",
      ],
    };
  },
};

// 2 · Eşit süre, eşit alan.
const area: FigureDef = {
  caption:
    "rp = 2, ra = 8 (a = 5, e = 0,6). Süre aralığını değiştir: yakın uç ve uzak uç çevresinde aynı sürede taranan iki bölge boyanır. Alanlar eşittir (Kepler denklemiyle hesaplandı), yay uzunlukları değildir.",
  alt: "Odaktaki yıldızdan elipse iki üçgensi bölge: yakın uçta geniş açılı kısa, uzak uçta dar açılı uzun bölge; ikisi aynı alanda.",
  param: { label: "Süre (periyodun yüzdesi)", min: 4, max: 16, step: 2, init: 10, unit: " %", plain: true },
  draw: (pct) => {
    const a = 5, e = 0.6, K = 0.5, half = (pct / 100) * Math.PI;
    const sector = (Mc: number): V[] => {
      const pts: V[] = [v(0, 0)];
      for (let i = 0; i <= 24; i++) { const M = Mc - half + (i / 24) * 2 * half; const p = atE(a, e, solveKepler(M, e)); pts.push(v(p[0] * K, p[1] * K)); }
      return pts;
    };
    const arcLen = (Mc: number) => {
      let L = 0, prev = atE(a, e, solveKepler(Mc - half, e));
      for (let i = 1; i <= 60; i++) { const p = atE(a, e, solveKepler(Mc - half + (i / 60) * 2 * half, e)); L += Math.hypot(p[0] - prev[0], p[1] - prev[1]); prev = p; }
      return L;
    };
    const els: El[] = [poly(ellipse(a, e, K), { tone: "muted", thin: true })];
    els.push(poly(sector(0), { fill: "a", tone: "a" }), poly(sector(Math.PI), { fill: "c", tone: "c" }));
    els.push(ball(v(0, 0), 0.2, "warn"));
    const S = (pct / 100) * Math.PI * a * a * Math.sqrt(1 - e * e);
    els.push(txt(v(2.6 * K + 0.5, 0), `yay ${f1(arcLen(0), 1)}`, "e", { small: true, tone: "a" }), txt(v(-8 * K - 0.3, 0), `yay ${f1(arcLen(Math.PI), 1)}`, "w", { small: true, tone: "c" }));
    els.push(txt(v(-1.5, -2.4), `iki alan da ${f1(S, 2)} birim²`, "c", { small: true, bold: true }));
    els.push(txt(v(-8 * K - 2.4, 2.4), " ", "c"), txt(v(2 * K + 2.6, -2.8), " ", "c"));
    return {
      els,
      readout: [
        `Süre T’nin %${pct}’i: alan = (t/T)·πab = ${f1(S, 2)} birim² (her iki bölge). Yay: yakında ${f1(arcLen(0), 1)}, uzakta ${f1(arcLen(Math.PI), 1)}.`,
        "Eşit süre ⇒ eşit alan; eşit yay ya da eşit açı değil. Alan hızı S/t = L/(2m) sabit, çünkü yıldıza göre tork sıfır (2025 AYT Fen 9).",
      ],
    };
  },
};

// 3 · Enerji: r’ye göre K ve U.
const energy: FigureDef = {
  caption:
    "Özgün model: GM = 80 m³/s², m = 1 kg, a = 5 m (rp = 2, ra = 8). Yıldıza uzaklığı değiştir: E = −GMm/(2a) = −8 J sabit; U = −GMm/r, K = E − U, v² = GM(2/r − 1/a).",
  alt: "Üç yatay çubuk: potansiyel enerji (negatif, sola), kinetik enerji (pozitif, sağa) ve sabit toplam enerji. r küçüldükçe U daha negatif, K daha büyük.",
  param: { label: "Uzaklık r", min: 2, max: 8, step: 0.5, init: 2, unit: " m" },
  draw: (r) => {
    const GM = 80, a = 5, E = -GM / (2 * a), U = -GM / r, Kin = E - U, vel = Math.sqrt(GM * (2 / r - 1 / a));
    const S = 0.09, X0 = 4.0;
    const bar = (y: number, val: number, tone: "a" | "b" | "c" | "warn" | "muted" | "ink", lab: string): El[] => [
      poly([v(X0, y + 0.22), v(X0 + val * S, y + 0.22), v(X0 + val * S, y - 0.22), v(X0, y - 0.22)], { fill: tone, tone }),
      txt(v(X0 + (val >= 0 ? val * S + 0.15 : 0.15), y), `${lab} = ${f1(val, 1)} J`, "e", { small: true, tone }),
    ];
    const els: El[] = [seg(v(X0, 1.6), v(X0, -1.6), { thin: true, tone: "muted" }), ...bar(1.0, U, "c", "U"), ...bar(0, Kin, "a", "K"), ...bar(-1.0, E, "warn", "E")];
    els.push(txt(v(X0, 2.0), `r = ${f1(r, 1)} m · v = ${f1(vel, 2)} m/s`, "c", { small: true, bold: true }));
    els.push(txt(v(0, 2.3), " ", "c"), txt(v(X0 + 4.2, -1.8), " ", "c"));
    return {
      els,
      readout: [
        `U = −80/${f1(r, 1)} = ${f1(U, 1)} J; K = −8 − (${f1(U, 1)}) = ${f1(Kin, 1)} J; v = ${f1(vel, 2)} m/s.`,
        "Yakın uçta (r = 2) K = 32 J, v = 8 m/s; uzak uçta (r = 8) K = 2 J, v = 2 m/s. Elipste v = √(GM/r) yazmak daire koşulunu dayatır.",
      ],
    };
  },
};

// 4 · Üçüncü yasa.
const third: FigureDef = {
  caption:
    "Aynı yıldız çevresinde T²/a³ sabittir. İkinci yörüngenin büyük yarı eksenini birinciye oranla değiştir: T₂/T₁ = (a₂/a₁)^(3/2). Yıldız kütlesi de değişirse ayrıca √(M₁/M₂) çarpanı gerekir.",
  alt: "Ortak merkezli iki çember yörünge: iç yörünge a₁, dış yörünge a₂. Periyot oranı yazıyor.",
  param: { label: "a₂ / a₁", min: 1, max: 9, step: 1, init: 4, unit: "", plain: true },
  draw: (k) => {
    const R1 = 0.35, R2 = R1 * k;
    const els: El[] = [circle(v(0, 0), R1, { tone: "b" }), circle(v(0, 0), R2, { tone: "a", dash: true }), ball(v(0, 0), 0.14, "warn")];
    els.push(ball(v(R1, 0), 0.08, "b"), ball(v(0, R2), 0.1, "a"));
    const T = Math.pow(k, 1.5);
    els.push(txt(v(R2 + 0.3, -R2 * 0.6), `T₂/T₁ = ${k}^(3/2) = ${f1(T, 2)}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(-3.4, 3.4), " ", "c"), txt(v(3.2 + 3.2, -3.4), " ", "c"));
    return {
      els,
      readout: [
        `a oranı ${k} ⇒ periyot oranı ${f1(T, 2)}.${k === 4 ? " (4 kat a → 8 kat T)" : k === 9 ? " (9 kat a → 27 kat T)" : ""}`,
        "Elipste a yerine anlık r ya da rp kullanma: rp = 2, ra = 6 ise a = 4.",
      ],
    };
  },
};

export const physicsFiguresKepler: Record<string, Record<string, FigureDef>> = {
  "kepler-yasalari": {
    "Yarı ekseni yakın ve uzak noktadan bul": geometry,
    "İkinci yasa eşit zamanda eşit alan söyler": area,
    "Süratin değişmesini iş ve enerjiyle izle": energy,
    "Üçüncü yasa aynı merkezî kütlede karşılaştırır": third,
  },
};
