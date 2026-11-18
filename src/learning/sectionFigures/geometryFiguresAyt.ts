import {
  add,
  ang,
  circle,
  dim,
  dist,
  fmt,
  foot,
  line,
  mid,
  mul,
  par,
  pol,
  poly,
  pt,
  right,
  rot,
  seg,
  sub,
  ticks,
  txt,
  unit,
  v,
  vec,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";
import { axes } from "./geometryFiguresArea";

const xy = (p: V, d = 2) => `(${fmt(p[0], d)}; ${fmt(p[1], d)})`;
/** Visible part of ax + by + c = 0 inside a window, as a drawable line. */
function lineEq(a: number, b: number, c: number, x0: number, x1: number, y0: number, y1: number, style = {}): El | null {
  const pts: V[] = [];
  if (Math.abs(b) > 1e-12) {
    for (const x of [x0, x1]) {
      const y = (-c - a * x) / b;
      if (y >= y0 - 1e-9 && y <= y1 + 1e-9) pts.push(v(x, y));
    }
  }
  if (Math.abs(a) > 1e-12) {
    for (const y of [y0, y1]) {
      const x = (-c - b * y) / a;
      if (x > x0 + 1e-9 && x < x1 - 1e-9) pts.push(v(x, y));
    }
  }
  if (pts.length < 2) return null;
  return line(pts[0], pts[1], { ext: 0.15, ...style });
}
/** "y = mx + n" with 0, ±1 coefficients and signs written the usual way. */
function slopeForm(m: number, n: number) {
  const mx = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "−x" : `${fmt(m)}x`;
  if (!mx) return `y = ${fmt(n)}`;
  if (n === 0) return `y = ${mx}`;
  return `y = ${mx} ${n > 0 ? "+" : "−"} ${fmt(Math.abs(n))}`;
}
const curve = (f: (x: number) => number, x0: number, x1: number, tone: "a" | "b" | "c" = "b"): El =>
  poly(
    Array.from({ length: 61 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / 60;
      return v(x, f(x));
    }),
    { open: true, tone },
  );

const otelemeDonme: Record<string, FigureDef> = {
  "Bir dönüşüm her noktaya bir görüntü verir": {
    caption:
      "Öteleme her köşeye aynı vektörü ekler; şekil olduğu gibi kayar. Yalnız bir köşeyi taşımak bir dönüşüm uygulamak değildir: kenarlar ve alan değişir.",
    alt: "İlk adımda ABC üçgeni ve aynı okla taşınmış A′B′C′; ikinci adımda yalnız C köşesi taşınmış ve şekli bozulmuş üçgen.",
    steps: ["Aynı kural her köşeye", "Yalnız bir köşe: dönüşüm değil"],
    draw: (_, step) => {
      const P: V[] = [v(0, 0), v(3, 0), v(1, 2)];
      const t: V = v(3, 1.5);
      if (step === 0) {
        const Q = P.map((p) => add(p, t));
        return {
          els: [
            poly(P, { fill: "b" }),
            poly(Q, { fill: "a", tone: "a" }),
            ...P.map((p, i) => vec(p, Q[i], { tone: "muted", thin: true })),
          ],
          readout: ["Kenarlar ve alan korunur"],
        };
      }
      const Q: V[] = [P[0], P[1], add(P[2], t)];
      return {
        els: [poly(P, { fill: "b" }), poly(Q, { tone: "warn", dash: true }), vec(P[2], Q[2], { tone: "warn" })],
        readout: ["Biçim değişti: aynı dönüşüm değil"],
      };
    },
  },
  "Öteleme vektörünün iki bileşenini oku": {
    caption:
      "(−2; 3) noktasına (5; −4) eklenir: 5 birim sağa, 4 birim aşağı. İki hareketin ortak sonucu tek bir vektördür ve görüntü (3; −1) olur.",
    alt: "Koordinat düzleminde P(−2; 3), kesikli yatay 5 birim ve düşey −4 birim bileşenler, tek bir okla P′(3; −1).",
    draw: () => {
      const P = v(-2, 3);
      const Q = v(3, -1);
      return {
        els: [
          ...axes(-3, 4, -2, 4),
          seg(P, v(3, 3), { dash: true, tone: "b" }),
          seg(v(3, 3), Q, { dash: true, tone: "c" }),
          vec(P, Q, { tone: "a", bold: true }),
          dim(P, v(3, 3), "+5", Q, "b"),
          dim(v(3, 3), Q, "−4", P, "c"),
          pt(P, "P(−2; 3)", "nw"),
          pt(Q, "P′(3; −1)", "se", "a"),
        ],
      };
    },
  },
  "Önce görüntü verilirse tersini çıkar": {
    caption:
      "P′(5; −1) ve v = (−2; 3) biliniyor. Geri dönmek için vektörün iki işaretini birden değiştir: P = P′ − v = (7; −4).",
    alt: "P(7; −4) noktasından P′(5; −1) noktasına giden v okunun yanında geri yönlü kesikli ok.",
    draw: () => {
      const P = v(7, -4);
      const Q = v(5, -1);
      return {
        els: [
          ...axes(-1, 8, -5, 1),
          vec(P, Q, { tone: "a", bold: true }),
          vec(add(Q, v(0.4, 0)), add(P, v(0.4, 0)), { tone: "b", dash: true }),
          txt(mid(P, Q), "v = (−2; 3)", "w", { small: true, tone: "a" }),
          txt(add(mid(P, Q), v(0.5, 0)), "−v = (2; −3)", "e", { small: true, tone: "b" }),
          pt(P, "P(7; −4)", "se", "b"),
          pt(Q, "P′(5; −1)", "nw", "a"),
        ],
      };
    },
  },
  "Şekli köşe köşe taşı, bağıntıyı geri denetle": {
    caption:
      "Her köşeye (h; k) eklenir ve adlar korunur: A→A′, B→B′, C→C′. Karşılık gelen kenarlar aynı uzunluktadır.",
    alt: "ABC üçgeni ve ötelenmiş A′B′C′; karşılık gelen kenarlar aynı çentik sayısıyla işaretli.",
    draw: () => {
      const P: V[] = [v(1, 1), v(5, 1), v(2, 4)];
      const t: V = v(4, 2);
      const Q = P.map((p) => add(p, t));
      const tk = (ps: V[]) => [ticks(ps[0], ps[1], 1), ticks(ps[1], ps[2], 2), ticks(ps[2], ps[0], 3)];
      return {
        els: [
          ...axes(-0.5, 9, -0.5, 6.5, 2),
          poly(P, { fill: "b" }),
          poly(Q, { fill: "a", tone: "a" }),
          ...tk(P),
          ...tk(Q),
          ...P.map((p, i) => vec(p, Q[i], { tone: "muted", thin: true })),
          ...["A", "B", "C"].map((n, i) => pt(P[i], n, i === 2 ? "n" : "s")),
          ...["A′", "B′", "C′"].map((n, i) => pt(Q[i], n, i === 2 ? "n" : "se", "a")),
        ],
        readout: ["(x; y) → (x + 4; y + 2)"],
      };
    },
  },
  "Doğru denkleminde geri yerine koyma": {
    caption:
      "2x − y − 3 = 0 doğrusu (2; 1) ötelenince 2x − y − 6 = 0 olur. Kontrol: (0; −3) eski doğrudadır; görüntüsü (2; −2) yeni denklemi sağlar: 4 + 2 − 6 = 0.",
    alt: "İki paralel doğru: 2x − y − 3 = 0 ve 2x − y − 6 = 0; (0; −3) noktasından (2; −2) noktasına öteleme oku.",
    draw: () => {
      const W = [-1, 6, -4, 5] as const;
      return {
        els: [
          ...axes(...W),
          lineEq(2, -1, -3, ...W, { tone: "b" })!,
          lineEq(2, -1, -6, ...W, { tone: "a" })!,
          vec(v(0, -3), v(2, -2), { tone: "muted" }),
          pt(v(0, -3), "(0; −3)", "w", "b"),
          pt(v(2, -2), "(2; −2)", "se", "a"),
          txt(v(4, 5), "2x − y − 3 = 0", "w", { small: true, tone: "b" }),
          txt(v(5.4, 4), "2x − y − 6 = 0", "e", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Grafiği sağa taşırken parantezin içi neden eksi?": {
    caption:
      "f(x) = x² + 1 grafiği 3 sağa, 2 yukarı taşınınca g(x) = (x − 3)² + 3 olur. g'nin 3'teki değeri, f'nin 0'daki değerinden gelir: nokta +3 taşınırken kuralın içinde −3 vardır.",
    alt: "y = x² + 1 parabolü ve onun 3 sağa 2 yukarı ötelenmiş hâli y = (x − 3)² + 3; tepe noktaları (0; 1) ve (3; 3) bir okla bağlı.",
    draw: () => ({
      els: [
        ...axes(-3, 6, -0.5, 9, 2),
        curve((x) => x * x + 1, -2.8, 2.8, "b"),
        curve((x) => (x - 3) ** 2 + 3, 0.6, 5.4, "a"),
        vec(v(0, 1), v(3, 3), { tone: "muted" }),
        pt(v(0, 1), "(0; 1)", "w", "b"),
        pt(v(3, 3), "(3; 3)", "e", "a"),
      ],
      readout: ["g(x) = f(x − 3) + 2"],
    }),
  },
  "Dönme için merkez, açı ve yön birlikte gerekir": {
    caption:
      "P(3; 1) noktasını orijin etrafında döndür. Pozitif açı saatin tersine döner; uzaklık |OP| hep aynı kalır. 90°'de (−y; x), 180°'de (−x; −y) kuralını gör.",
    alt: "Orijin merkezli kesikli çember üzerinde P(3; 1) ve açı sürgüsüyle dönen P′; açı yayı işaretli.",
    param: { label: "Dönme açısı α", min: -180, max: 180, step: 15, init: 90, unit: "°" },
    draw: (a) => {
      const O = v(0, 0);
      const P = v(3, 1);
      const Q = rot(P, a);
      const r = Math.hypot(3, 1);
      return {
        els: [
          ...axes(-4, 4, -4, 4),
          circle(O, r, { dash: true, thin: true, tone: "muted" }),
          seg(O, P, { tone: "b" }),
          seg(O, Q, { tone: "a" }),
          ...(a !== 0 ? [ang(O, P, Q, `${a}°`, { r: 30, tone: "a", reflex: Math.abs(a) > 180 })] : []),
          pt(P, "P(3; 1)", "e", "b"),
          pt(Q, `P′${xy(Q)}`, a > 0 ? "nw" : "se", "a"),
        ],
        readout: [`P′ = ${xy(Q)} · |OP′| = √10`],
      };
    },
  },
  "Genel dönme bağıntısını yarıçap vektöründen kur": {
    caption:
      "Yarıçap vektörü θ açısındaysa döndükten sonra θ + α açısındadır. x′ = x cos α − y sin α, y′ = x sin α + y cos α; uzunluk değişmez.",
    alt: "P(4; 2) ve döndürülmüş P′; ikisinin x eksenine göre açıları θ ve θ + α olarak işaretli.",
    param: { label: "α", min: 0, max: 330, step: 15, init: 60, unit: "°" },
    draw: (a) => {
      const O = v(0, 0);
      const P = v(4, 2);
      const Q = rot(P, a);
      return {
        els: [
          ...axes(-5, 5, -5, 5, 2),
          seg(O, P, { tone: "b" }),
          seg(O, Q, { tone: "a" }),
          ang(O, v(1, 0), P, "θ", { r: 26, tone: "b" }),
          ...(a > 0 ? [ang(O, P, Q, "α", { r: 44, tone: "a", reflex: a > 180 })] : []),
          pt(P, "P(4; 2)", "e", "b"),
          pt(Q, "P′", "n", "a"),
        ],
        readout: [`P′ ≈ ${xy(Q)}`, `x′² + y′² ≈ ${fmt(Q[0] ** 2 + Q[1] ** 2, 2)} = 4² + 2² = 20`],
      };
    },
  },
  "Merkez orijin değilse önce merkezi çıkar": {
    caption:
      "C(1; −1) etrafında P(4; 3)'ü pozitif 90° döndür: CP = (3; 4) vektörü (−4; 3) olur, C geri eklenince P′(−3; 2).",
    alt: "C(1; −1) merkezi, CP ve CP′ vektörleri aralarında dik açıyla; P(4; 3) ve P′(−3; 2).",
    draw: () => {
      const C = v(1, -1);
      const P = v(4, 3);
      const Q = v(-3, 2);
      return {
        els: [
          ...axes(-4, 5, -2, 4),
          circle(C, 5, { dash: true, thin: true, tone: "muted" }),
          vec(C, P, { tone: "b" }),
          vec(C, Q, { tone: "a" }),
          right(C, P, Q),
          pt(C, "C(1; −1)", "s"),
          pt(P, "P(4; 3)", "e", "b"),
          pt(Q, "P′(−3; 2)", "w", "a"),
        ],
        readout: ["(3; 4) → (−4; 3)", "P′ = C + (−4; 3) = (−3; 2)"],
      };
    },
  },
  "Sabit nokta ile özdeşlik dönüşümünü ayır": {
    caption:
      "120°'lik dönmede yalnız merkez C yerinde kalır; diğer noktalar kendi çemberleri üzerinde yer değiştirir.",
    alt: "C merkezi etrafında üç nokta ve 120° döndürülmüş görüntüleri; her nokta kendi kesikli çemberi üzerinde.",
    draw: () => {
      const C = v(0, 0);
      const ps: V[] = [v(2, 0), v(0, 1.2), v(-1, -2)];
      return {
        els: [
          ...ps.flatMap((p) => {
            const q = rot(p, 120);
            return [
              circle(C, dist(C, p), { dash: true, thin: true, tone: "muted" }),
              vec(p, q, { tone: "muted", thin: true }),
              pt(p, undefined, "n", "b"),
              pt(q, undefined, "n", "a"),
            ];
          }),
          pt(C, "C", "s", "c"),
        ],
        readout: ["Yalnız merkez C yerinde kalır"],
      };
    },
  },
  "Öteleme ve dönmede sıra genellikle önemlidir": {
    caption:
      "P(1; 2): önce (3; −1) ötele, sonra 90° döndür → (−1; 4). Önce döndür, sonra ötele → (1; 0). Aynı iki işlem farklı sırada farklı sonuç verir.",
    alt: "P(1; 2) noktasından iki farklı yol: mavi yol önce ötelenip sonra dönerek (−1; 4)'e, turuncu yol önce dönüp sonra ötelenerek (1; 0)'a ulaşıyor.",
    draw: () => {
      const P = v(1, 2);
      return {
        els: [
          ...axes(-3, 5, -1, 5),
          vec(P, v(4, 1), { tone: "b" }),
          vec(v(4, 1), v(-1, 4), { tone: "b", dash: true }),
          vec(P, v(-2, 1), { tone: "a", dash: true }),
          vec(v(-2, 1), v(1, 0), { tone: "a" }),
          pt(P, "P(1; 2)", "n"),
          pt(v(4, 1), "(4; 1)", "e", "b"),
          pt(v(-1, 4), "(−1; 4)", "n", "b"),
          pt(v(-2, 1), "(−2; 1)", "w", "a"),
          pt(v(1, 0), "(1; 0)", "s", "a"),
        ],
        readout: ["R(P + v) = (−1; 4)", "R(P) + v = (1; 0)"],
      };
    },
  },
};

const yansimaSimetri: Record<string, FigureDef> = {
  "Ayna yalnız eş uzaklık değil orta dikmedir": {
    caption:
      "d, PP′'nün orta dikmesidir: H orta noktadır ve PP′ aynaya diktir. Q de aynaya P kadar uzaktır ama aynı taraftadır; P'nin görüntüsü değildir.",
    alt: "Eğik ayna doğrusu d; P ve P′ aynanın iki yanında, aradaki H ayağı dik işaretli ve eş parçalı. Aynı tarafta, aynaya eşit uzaklıkta bir Q noktası.",
    draw: () => {
      const A = v(-1, -1);
      const B = v(5, 3);
      const P = v(1, 3);
      const H = foot(P, A, B);
      const P2 = sub(mul(H, 2), P);
      const Q = add(P, mul(unit(sub(B, A)), 2.5));
      return {
        els: [
          line(A, B, { tone: "b", ext: 0.3 }),
          txt(B, "d", "se", { tone: "b" }),
          seg(P, P2, { tone: "a" }),
          right(H, B, P, "a"),
          ticks(P, H, 1, "a"),
          ticks(H, P2, 1, "a"),
          seg(Q, foot(Q, A, B), { dash: true, tone: "warn", thin: true }),
          pt(P, "P", "nw"),
          pt(P2, "P′", "se", "a"),
          pt(H, "H", "nw"),
          pt(Q, "Q", "ne", "warn"),
        ],
      };
    },
  },
  "Eksenler hangi koordinatı değiştirir?": {
    caption:
      "P(−2; 5) x eksenine göre (−2; −5), y eksenine göre (2; 5) olur. Aynaya paralel koordinat korunur, aynaya dik koordinat işaret değiştirir.",
    alt: "P(−2; 5) ve iki görüntüsü: x eksenine göre aşağıda (−2; −5), y eksenine göre sağda (2; 5); bağlayan kesikli doğrular eksenlere dik.",
    draw: () => {
      const P = v(-2, 5);
      return {
        els: [
          ...axes(-4, 4, -6, 6, 2),
          seg(P, v(-2, -5), { dash: true, tone: "b" }),
          seg(P, v(2, 5), { dash: true, tone: "c" }),
          right(v(-2, 0), v(0, 0), P, "b"),
          right(v(0, 5), P, v(0, 0), "c"),
          pt(P, "P(−2; 5)", "nw"),
          pt(v(-2, -5), "(−2; −5)", "sw", "b"),
          pt(v(2, 5), "(2; 5)", "ne", "c"),
        ],
      };
    },
  },
  "Merkeze göre simetri bir yarım turdur": {
    caption:
      "P(4; 3), C(1; −2): P′ = (2·1 − 4; 2·(−2) − 3) = (−2; −7). C, PP′'nün orta noktasıdır; bu, C etrafında 180° dönmeyle aynıdır.",
    alt: "P(4; 3), C(1; −2) ve P′(−2; −7) aynı doğru üzerinde; CP ve CP′ eşit çentikli.",
    draw: () => {
      const P = v(4, 3);
      const C = v(1, -2);
      const Q = v(-2, -7);
      return {
        els: [
          ...axes(-3, 5, -8, 4, 2),
          seg(P, Q, { tone: "a" }),
          ticks(P, C, 1, "a"),
          ticks(C, Q, 1, "a"),
          pt(C, "C(1; −2)", "e", "b"),
          pt(P, "P(4; 3)", "e"),
          pt(Q, "P′(−2; −7)", "e", "a"),
        ],
      };
    },
  },
  "y=x ve y=−x aynalarını koordinatla denetle": {
    caption:
      "P(−2; 5)'in y = x'e göre görüntüsü (5; −2). Orta nokta (3/2; 3/2) ayna üzerindedir ve PP′ yönü (7; −7), aynanın (1; 1) yönüne diktir.",
    alt: "y = x doğrusu, P(−2; 5) ve P′(5; −2); PP′ doğruyu (1,5; 1,5) noktasında dik kesiyor.",
    draw: () => {
      const P = v(-2, 5);
      const Q = v(5, -2);
      const M = v(1.5, 1.5);
      return {
        els: [
          ...axes(-3, 6, -3, 6, 2),
          line(v(-2.5, -2.5), v(6, 6), { tone: "b", ext: 0.1 }),
          txt(v(6, 6), "y = x", "se", { small: true, tone: "b" }),
          seg(P, Q, { tone: "a" }),
          right(M, Q, v(6, 6), "a"),
          ticks(P, M, 1, "a"),
          ticks(M, Q, 1, "a"),
          pt(P, "P(−2; 5)", "ne"),
          pt(Q, "P′(5; −2)", "ne", "a"),
          pt(M, "(1,5; 1,5)", "w"),
        ],
      };
    },
  },
  "Genel doğru için önce normal yönü bul": {
    caption:
      "d: 3x + 4y − 5 = 0 için n = (3; 4) doğruya diktir. P(3; 4)'ten bu yönde inilerek dik ayak H(3/5; 4/5) bulunur; t = 20/25 = 4/5.",
    alt: "3x + 4y − 5 = 0 doğrusu, üzerinde normal ok (3; 4); P(3; 4) noktasından doğruya inen dikme ve ayağı H.",
    draw: () => {
      const W = [-3, 4, -3, 5] as const;
      const P = v(3, 4);
      const H = v(0.6, 0.8);
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -5, ...W, { tone: "b" })!,
          vec(H, add(H, v(0.9, 1.2)), { tone: "c", bold: true }),
          txt(add(H, v(0.9, 1.2)), "n = (3; 4)", "w", { small: true, tone: "c" }),
          seg(P, H, { tone: "a", dash: true }),
          right(H, v(-1, 2), P, "a"),
          pt(P, "P(3; 4)", "ne"),
          pt(H, "H(0,6; 0,8)", "se", "a"),
        ],
      };
    },
  },
  "Dik ayağı bulduktan sonra ikinci yarıyı tamamla": {
    caption:
      "H, PP′'nün orta noktası olduğundan P′ = 2H − P = (−9/5; −12/5). Üç denetim: H doğruda, PH normal yönde, H = (P + P′)/2.",
    alt: "3x + 4y − 5 = 0 aynasına göre P(3; 4) ve görüntüsü P′(−1,8; −2,4); H orta noktası, PH ve HP′ eşit çentikli.",
    draw: () => {
      const W = [-3, 4, -3, 5] as const;
      const P = v(3, 4);
      const H = v(0.6, 0.8);
      const Q = v(-1.8, -2.4);
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -5, ...W, { tone: "b" })!,
          seg(P, Q, { tone: "a" }),
          right(H, v(-1, 2), P, "a"),
          ticks(P, H, 1, "a"),
          ticks(H, Q, 1, "a"),
          pt(P, "P(3; 4)", "ne"),
          pt(H, "H", "se"),
          pt(Q, "P′(−1,8; −2,4)", "e", "a"),
        ],
        readout: ["3·0,6 + 4·0,8 − 5 = 0 ✓", "(P + P′)/2 = (0,6; 0,8) = H ✓"],
      };
    },
  },
  "Görüntü çiftinden aynayı geri kur": {
    caption:
      "P(1; 1) ile P′(5; 3) verilirse ayna orta dikmedir: orta nokta (3; 2), normal P′ − P = (4; 2). Denklem 4(x − 3) + 2(y − 2) = 0, yani 2x + y − 8 = 0.",
    alt: "P(1; 1), P′(5; 3), orta nokta (3; 2) ve bu noktadan PP′'ye dik geçen 2x + y − 8 = 0 aynası.",
    draw: () => {
      const W = [-0.5, 6, -0.5, 6] as const;
      const P = v(1, 1);
      const Q = v(5, 3);
      const M = v(3, 2);
      return {
        els: [
          ...axes(...W),
          lineEq(2, 1, -8, ...W, { tone: "b" })!,
          seg(P, Q, { tone: "a" }),
          right(M, Q, v(2, 4), "a"),
          ticks(P, M, 1, "a"),
          ticks(M, Q, 1, "a"),
          pt(P, "P(1; 1)", "nw"),
          pt(Q, "P′(5; 3)", "e", "a"),
          pt(M, "(3; 2)", "se"),
          txt(v(1.4, 5.2), "2x + y − 8 = 0", "e", { small: true, tone: "b" }),
        ],
      };
    },
  },
  "Doğrunun merkeze göre görüntüsünü değişkenlerden çıkar": {
    caption:
      "d: x + y − 2 = 0 doğrusunu C(3; 1)'e göre yansıtmak için x yerine 6 − x, y yerine 2 − y yaz: görüntü x + y − 6 = 0. İki doğru paraleldir ve C'ye eşit uzaklıktadır.",
    alt: "Paralel iki doğru x + y − 2 = 0 ve x + y − 6 = 0, aralarında C(3; 1); C'den iki doğruya eşit uzunlukta dikmeler.",
    draw: () => {
      const W = [-1, 7, -1, 7] as const;
      const C = v(3, 1);
      const F1 = foot(C, v(0, 2), v(2, 0));
      const F2 = foot(C, v(0, 6), v(6, 0));
      return {
        els: [
          ...axes(...W, 2),
          lineEq(1, 1, -2, ...W, { tone: "b" })!,
          lineEq(1, 1, -6, ...W, { tone: "a" })!,
          seg(C, F1, { dash: true, tone: "muted" }),
          seg(C, F2, { dash: true, tone: "muted" }),
          ticks(C, F1, 1),
          ticks(C, F2, 1),
          pt(C, "C(3; 1)", "se"),
          txt(v(-0.6, 2.6), "x + y − 2 = 0", "e", { small: true, tone: "b" }),
          txt(v(4.6, 2.6), "x + y − 6 = 0", "e", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Bir şeklin görüntüsü köşelerden kurulur": {
    caption:
      "Üçgen y eksenine göre yansıtılınca kenarlar ve alan korunur ama A → B → C dolaşım yönü tersine döner.",
    alt: "y ekseninin sağında ABC üçgeni, solunda yansıması A′B′C′; köşe sırası iki üçgende zıt dolaşım yönünde.",
    draw: () => {
      const P: V[] = [v(1, 1), v(4, 1), v(2, 4)];
      const Q = P.map(([x, y]) => v(-x, y));
      return {
        els: [
          ...axes(-5, 5, -0.5, 5),
          poly(P, { fill: "b" }),
          poly(Q, { fill: "a", tone: "a" }),
          ...["A", "B", "C"].map((n, i) => pt(P[i], n, i === 2 ? "n" : "s")),
          ...["A′", "B′", "C′"].map((n, i) => pt(Q[i], n, i === 2 ? "n" : "s", "a")),
        ],
        readout: ["ABC: saat yönünün tersine · A′B′C′: saat yönünde"],
      };
    },
  },
  "İki paralel aynanın bileşkesi ötelemedir": {
    caption:
      "x = 0 ve x = 2 aynaları sırayla: P(1; 3) → (−1; 3) → (5; 3). Sonuç (4; 0) ötelemesidir: aynalar arası uzaklığın iki katı.",
    alt: "x = 0 ve x = 2 düşey aynaları; P(1; 3), ilk yansıma (−1; 3) ve ikinci yansıma (5; 3) oklarla bağlı.",
    draw: () => ({
      els: [
        ...axes(-2, 6, -0.5, 4.5),
        line(v(2, -0.5), v(2, 4.5), { tone: "b", ext: 0.1 }),
        txt(v(2, 4.6), "x = 2", "ne", { small: true, tone: "b" }),
        vec(v(1, 3), v(-1, 3), { tone: "muted" }),
        vec(v(-1, 3.3), v(5, 3.3), { tone: "a" }),
        pt(v(1, 3), "P(1; 3)", "s"),
        pt(v(-1, 3), "(−1; 3)", "s", "muted"),
        pt(v(5, 3), "(5; 3)", "s", "a"),
      ],
      readout: ["x → −x → 4 + x: öteleme (4; 0)"],
    }),
  },
  "Kesişen aynalarda açı iki katıyla görünür": {
    caption:
      "Önce x eksenine, sonra y = x doğrusuna yansıt: P(3; 1) → (3; −1) → (−1; 3). Aynalar arasında 45° var; bileşke 90°lik dönmedir.",
    alt: "x ekseni ve y = x aynaları, aralarında 45°; P(3; 1), ara görüntü (3; −1) ve son görüntü (−1; 3); P'den son görüntüye 90° yay.",
    draw: () => {
      const O = v(0, 0);
      const P = v(3, 1);
      return {
        els: [
          ...axes(-2, 4, -2, 4),
          line(v(-2, -2), v(4, 4), { tone: "b", ext: 0.1 }),
          ang(O, v(1, 0), v(1, 1), "45°", { r: 40, tone: "b" }),
          vec(P, v(3, -1), { tone: "muted", thin: true }),
          vec(v(3, -1), v(-1, 3), { tone: "muted", thin: true, dash: true }),
          ang(O, P, v(-1, 3), "90°", { r: 70, tone: "a" }),
          pt(P, "P(3; 1)", "e"),
          pt(v(3, -1), "(3; −1)", "e", "muted"),
          pt(v(-1, 3), "(−1; 3)", "w", "a"),
        ],
      };
    },
  },
};

const cember: Record<string, FigureDef> = {
  "Çember bir eş uzaklık kümesidir": {
    caption:
      "Çember yalnız sınırdır: M'ye uzaklığı r olan noktalar. İçteki boyalı bölge disk, yani başka bir kümedir.",
    alt: "M merkezli çember; M'den çembere eşit çentikli sekiz yarıçap, içi açık renkle boyalı disk.",
    draw: () => {
      const M = v(0, 0);
      return {
        els: [
          circle(M, 3, { fill: "muted", tone: "a" }),
          ...Array.from({ length: 8 }, (_, i) => pol(3, i * 45 + 10)).flatMap((p) => [
            seg(M, p, { thin: true, tone: "b" }),
            ticks(M, p, 1, "b"),
            pt(p, undefined, "n", "a"),
          ]),
          pt(M, "M", "s"),
          txt(v(2.4, 2.6), "çember (sınır)", "e", { small: true, tone: "a" }),
          txt(v(0, -1.5), "disk", "c", { small: true, tone: "muted" }),
        ],
      };
    },
  },
  "Standart denklemde merkezi ters işaretle oku": {
    caption:
      "(x + 2)² + (y − 4)² = 9: merkez (−2; 4), yarıçap √9 = 3. Parantezdeki + işareti merkezin apsisinin −2 olduğunu söyler.",
    alt: "Koordinat düzleminde merkezi (−2; 4), yarıçapı 3 olan çember ve merkezden çembere bir yarıçap.",
    draw: () => {
      const M = v(-2, 4);
      return {
        els: [
          ...axes(-6, 2, -0.5, 8, 2),
          circle(M, 3, { tone: "a" }),
          seg(M, add(M, v(3, 0)), { tone: "b" }),
          dim(M, add(M, v(3, 0)), "r = 3", add(M, v(1.5, 2)), "b"),
          pt(M, "M(−2; 4)", "n"),
        ],
      };
    },
  },
  "Merkez ve bir nokta yarıçapı belirler": {
    caption:
      "M(2; −1), P(5; 3): fark (3; 4), r = 5. Denklem (x − 2)² + (y + 1)² = 25.",
    alt: "Merkezi M(2; −1) olan çember ve üzerindeki P(5; 3); MP yarıçapı 3 ve 4 dik kenarlı üçgenin hipotenüsü.",
    draw: () => {
      const M = v(2, -1);
      const P = v(5, 3);
      return {
        els: [
          ...axes(-4, 8, -7, 5, 2),
          circle(M, 5, { tone: "a" }),
          poly([M, v(5, -1), P], { fill: "b", tone: "b", thin: true }),
          seg(M, P, { bold: true }),
          right(v(5, -1), M, P, "b"),
          dim(M, v(5, -1), "3", P, "b"),
          dim(v(5, -1), P, "4", M, "b"),
          pt(M, "M(2; −1)", "sw"),
          pt(P, "P(5; 3)", "ne"),
        ],
      };
    },
  },
  "Genel denklemi tam kareye tamamla": {
    caption:
      "x² + y² − 6x + 4y − 12 = 0 → (x − 3)² + (y + 2)² = 25. Tam kareye tamamlarken eklenen 9 ve 4 sağ tarafa da eklenir.",
    alt: "Merkezi (3; −2), yarıçapı 5 olan çember koordinat düzleminde.",
    draw: () => {
      const M = v(3, -2);
      return {
        els: [
          ...axes(-3, 9, -8, 4, 2),
          circle(M, 5, { tone: "a" }),
          seg(M, add(M, pol(5, 40)), { tone: "b" }),
          pt(M, "M(3; −2)", "s"),
          txt(add(M, pol(2.6, 40)), "5", "nw", { tone: "b" }),
        ],
        readout: ["−6x → (x − 3)² − 9 · +4y → (y + 2)² − 4", "12 + 9 + 4 = 25"],
      };
    },
  },
  "Pozitif çember, tek nokta ve boş kümeyi ayır": {
    caption:
      "x² + y² − 4x + 6y + F = 0 için r² = 13 − F. F'yi artır: r² > 0 iken çember, r² = 0'da yalnız (2; −3) noktası, r² < 0'da boş küme.",
    alt: "Merkezi (2; −3) olan ve F sürgüsüyle küçülen çember; F = 13'te tek nokta, F > 13'te çizim yok.",
    param: { label: "F", min: 0, max: 15, step: 1, init: 4 },
    draw: (F) => {
      const M = v(2, -3);
      const r2 = 13 - F;
      return {
        els: [
          ...axes(-2, 6, -7, 1),
          ...(r2 > 0 ? [circle(M, Math.sqrt(r2), { tone: "a" })] : []),
          pt(M, r2 === 0 ? "tek nokta" : "M(2; −3)", "e", r2 >= 0 ? "a" : "muted", r2 < 0),
        ],
        readout: [
          `r² = 13 − ${F} = ${r2}`,
          r2 > 0 ? `çember, r ≈ ${fmt(Math.sqrt(r2), 2)}` : r2 === 0 ? "yalnız (2; −3)" : "gerçek nokta yok (boş küme)",
        ],
      };
    },
  },
  "Noktanın yerini kareli uzaklıkla karşılaştır": {
    caption:
      "P'yi yatay kaydır. s = (x − a)² + (y − b)² değeri r²'den küçükse P içeride, eşitse çember üzerinde, büyükse dışarıdadır. Karekök almaya gerek yok.",
    alt: "Merkezi orijinde, yarıçapı 3 olan çember ve sürgüyle sağa sola kayan P noktası; P ile merkez arasında kesikli parça.",
    param: { label: "P'nin apsisi", min: -5, max: 5, step: 0.5, init: 1 },
    draw: (x) => {
      const P = v(x, 2);
      const s = x * x + 4;
      const where = s < 9 ? "içeride" : s === 9 ? "çember üzerinde" : "dışarıda";
      return {
        els: [
          ...axes(-5, 5, -4, 4, 2),
          circle(v(0, 0), 3, { tone: "a" }),
          seg(v(0, 0), P, { dash: true, tone: "b" }),
          pt(P, `P(${fmt(x)}; 2)`, "ne", s < 9 ? "c" : s === 9 ? "a" : "warn"),
        ],
        readout: [`s = ${fmt(x * x)} + 4 = ${fmt(s)} ${s < 9 ? "<" : s === 9 ? "=" : ">"} 9 → ${where}`],
      };
    },
  },
  "Eksen teğetliğinde koordinatın mutlak değerini kullan": {
    caption:
      "İki eksene de teğet, yarıçapı 2 olan dört çember: merkezleri (2; 2), (−2; 2), (−2; −2), (2; −2). Her merkezin iki eksene uzaklığı |a| = |b| = r.",
    alt: "Dört bölgenin her birinde iki eksene de teğet birer çember; teğet noktaları eksenler üzerinde işaretli.",
    draw: () => {
      const cs: V[] = [v(2, 2), v(-2, 2), v(-2, -2), v(2, -2)];
      return {
        els: [
          ...axes(-5, 5, -5, 5, 2),
          ...cs.flatMap((c, i) => [
            circle(c, 2, { tone: i % 2 ? "b" : "a" }),
            pt(c, `(${fmt(c[0])}; ${fmt(c[1])})`, "c", i % 2 ? "b" : "a"),
            pt(v(c[0], 0), undefined, "n", "muted"),
            pt(v(0, c[1]), undefined, "n", "muted"),
          ]),
        ],
      };
    },
  },
  "Doğru ile çemberi önce merkez uzaklığıyla karşılaştır": {
    caption:
      "M(2; 1), r = 5 ve düşey x = h doğrusu. h'yi değiştir: merkez uzaklığı δ = |h − 2|; δ > 5 ise ortak nokta yok, δ = 5 teğet, δ < 5 iki kesişim.",
    alt: "Merkezi M(2; 1), yarıçapı 5 olan çember ve sürgüyle kayan düşey bir doğru; M'den doğruya yatay dikme.",
    param: { label: "h", min: -5, max: 9, step: 1, init: 5 },
    draw: (h) => {
      const M = v(2, 1);
      const d = Math.abs(h - 2);
      const kind = d > 5 ? "ortak nokta yok" : d === 5 ? "teğet: bir ortak nokta" : "iki kesişim";
      const t = d < 5 ? Math.sqrt(25 - d * d) : 0;
      return {
        els: [
          ...axes(-5, 9, -5, 7, 2),
          circle(M, 5, { tone: "a" }),
          line(v(h, -5), v(h, 7), { tone: "b", ext: 0.1 }),
          seg(M, v(h, 1), { dash: true, tone: "c" }),
          pt(M, "M", "sw"),
          ...(d <= 5 ? [pt(v(h, 1 + t), undefined, "n", "b"), pt(v(h, 1 - t), undefined, "n", "b")] : []),
        ],
        readout: [`δ = |${h} − 2| = ${d} · ${kind}`],
      };
    },
  },
  "Gerçek dik ayaktan kiriş uçlarına geç": {
    caption:
      "M(2; 1), r = 5, x = 5: δ = 3, H(5; 1) kirişin orta noktası, yarım kiriş √(25 − 9) = 4. Uçlar (5; 5) ve (5; −3), kiriş 8.",
    alt: "Çember, x = 5 doğrusu, M'den H(5; 1)'e dikme ve H'den kiriş uçlarına 4'er birimlik parçalar; MH, HP ve MP dik üçgen.",
    draw: () => {
      const M = v(2, 1);
      const H = v(5, 1);
      const P = v(5, 5);
      const Q = v(5, -3);
      return {
        els: [
          ...axes(-4, 8, -5, 7, 2),
          circle(M, 5, { tone: "a" }),
          line(v(5, -5), v(5, 7), { tone: "b", ext: 0.1 }),
          poly([M, H, P], { fill: "c", tone: "c", thin: true }),
          right(H, M, P, "c"),
          dim(M, H, "δ = 3", P, "c"),
          dim(H, P, "4", M, "c"),
          dim(H, Q, "4", M, "c"),
          pt(M, "M", "w"),
          pt(H, "H", "se"),
          pt(P, "(5; 5)", "e", "b"),
          pt(Q, "(5; −3)", "e", "b"),
        ],
      };
    },
  },
  "Teğet doğru yarıçapa diktir": {
    caption:
      "x² + y² = 25 çemberinde P(3; 4) noktasındaki teğet, OP yarıçapına diktir: 3x + 4y = 25.",
    alt: "Orijin merkezli 5 yarıçaplı çember, P(3; 4) noktasına yarıçap ve P'de çembere teğet doğru; yarıçap ile teğet arasında dik işareti.",
    draw: () => {
      const W = [-6, 8, -6, 8] as const;
      const O = v(0, 0);
      const P = v(3, 4);
      return {
        els: [
          ...axes(...W, 2),
          circle(O, 5, { tone: "a" }),
          lineEq(3, 4, -25, ...W, { tone: "b" })!,
          seg(O, P, { tone: "c" }),
          right(P, O, v(7, 1), "c"),
          pt(P, "P(3; 4)", "ne"),
          txt(v(7.4, 0.6), "3x + 4y = 25", "s", { small: true, tone: "b" }),
        ],
      };
    },
  },
  "İki çemberde merkez uzaklığı iki yarıçapla yarışır": {
    caption:
      "r = 3 ve s = 2. Merkezler arası d'yi değiştir: d > 5 ayrık, d = 5 dıştan teğet, 1 < d < 5 iki kesişim, d = 1 içten teğet, d < 1 iç içe.",
    alt: "Yarıçapları 3 ve 2 olan iki çember; ikincisinin merkezi sürgüyle yatay kayıyor, merkezler arası uzaklık işaretli.",
    param: { label: "d", min: 0.5, max: 7, step: 0.5, init: 3.5 },
    draw: (d) => {
      const A = v(0, 0);
      const B = v(d, 0);
      const kind =
        d > 5 ? "dıştan ayrık" : d === 5 ? "dıştan teğet" : d > 1 ? "iki kesişim" : d === 1 ? "içten teğet" : "iç içe ayrık";
      return {
        els: [
          circle(A, 3, { tone: "a" }),
          circle(B, 2, { tone: "b" }),
          seg(A, B, { tone: "muted", dash: true }),
          pt(A, "M₁", "s", "a"),
          pt(B, "M₂", "s", "b"),
          txt(v(-3.4, -3.4), "", "c"),
          txt(v(9.4, 3.4), "", "c"),
        ],
        readout: [`d = ${fmt(d)} · r + s = 5, |r − s| = 1 → ${kind}`],
      };
    },
  },
};

const dogru: Record<string, FigureDef> = {
  "Denklem, bir nokta kümesini anlatır": {
    caption:
      "x + y = 4 denklemini (0; 4), (1; 3) ve (4; 0) sağlar. Bunlar aynı doğrunun farklı noktalarıdır.",
    alt: "x + y = 4 doğrusu ve üzerinde üç işaretli nokta: (0; 4), (1; 3), (4; 0).",
    draw: () => {
      const W = [-1, 5, -1, 5] as const;
      return {
        els: [
          ...axes(...W),
          lineEq(1, 1, -4, ...W, { tone: "b" })!,
          pt(v(0, 4), "(0; 4)", "e", "a"),
          pt(v(1, 3), "(1; 3)", "ne", "a"),
          pt(v(4, 0), "(4; 0)", "n", "a"),
        ],
      };
    },
  },
  "Eğim, yönlü iki değişimin oranıdır": {
    caption:
      "A(−1; −1), B(3; 5): Δx = 4, Δy = 6, m = 6/4 = 1,5. Uçları birlikte ters sırada çıkarmak eğimi değiştirmez.",
    alt: "A ve B noktaları ve aralarındaki doğru; eksenlere paralel dik kenarlar Δx = 4 ve Δy = 6.",
    draw: () => {
      const A = v(-1, -1);
      const B = v(3, 5);
      const K = v(3, -1);
      return {
        els: [
          ...axes(-2, 4, -2, 6, 2),
          line(A, B, { tone: "b", ext: 0.5 }),
          seg(A, K, { tone: "a", dash: true }),
          seg(K, B, { tone: "c", dash: true }),
          right(K, A, B),
          dim(A, K, "Δx = 4", B, "a"),
          dim(K, B, "Δy = 6", A, "c"),
          pt(A, "A(−1; −1)", "nw"),
          pt(B, "B(3; 5)", "nw"),
        ],
        readout: ["m = 6/4 = 1,5"],
      };
    },
  },
  "Eğim açısının başlangıcını ve aralığını seç": {
    caption:
      "Eğim açısı α pozitif x ekseninden saat yönünün tersine ölçülür, 0° ≤ α < 180°. m = tan α; α = 90°'de eğim tanımsızdır.",
    alt: "Orijinden geçen ve sürgüyle dönen doğru; pozitif x ekseninden doğruya kadar α yayı.",
    param: { label: "α", min: 0, max: 175, step: 5, init: 45, unit: "°" },
    draw: (a) => {
      const O = v(0, 0);
      const d = pol(3.6, a);
      const m = Math.tan((a * Math.PI) / 180);
      return {
        els: [
          ...axes(-4, 4, -4, 4, 2),
          line(mul(d, -1), d, { tone: "b", ext: 0.1 }),
          ...(a > 0 ? [ang(O, v(1, 0), d, `${a}°`, { r: 34, tone: "a", fill: true })] : []),
        ],
        readout: [a === 90 ? "α = 90°: düşey doğru, eğim tanımsız" : `m = tan ${a}° ≈ ${fmt(m, 3)}`],
      };
    },
  },
  "Bir nokta ve sonlu eğimden doğru kur": {
    caption:
      "P(2; 1)'den sayısız doğru geçer; eğimi seçince tek doğru belirlenir: y − 1 = m(x − 2). Düşey doğru bu biçime sığmaz, x = 2 diye ayrıca yazılır.",
    alt: "P(2; 1) noktasından geçen ince gri doğru demeti ve sürgüyle seçilen eğimli kalın doğru.",
    param: { label: "m", min: -3, max: 3, step: 0.5, init: 1 },
    draw: (m) => {
      const W = [-2, 6, -3, 5] as const;
      const fam = [-2, -1, -0.5, 0, 0.5, 1, 2].map((k) => lineEq(k, -1, 1 - 2 * k, ...W, { tone: "muted", thin: true }));
      return {
        els: [
          ...axes(...W),
          ...(fam.filter(Boolean) as El[]),
          line(v(2, -3), v(2, 5), { tone: "muted", thin: true, dash: true, ext: 0 }),
          lineEq(m, -1, 1 - 2 * m, ...W, { tone: "a", bold: true })!,
          pt(v(2, 1), "P(2; 1)", "se"),
        ],
        readout: [`y − 1 = ${fmt(m)}(x − 2) → ${slopeForm(m, 1 - 2 * m)}`],
      };
    },
  },
  "Katsayıdan eğimi doğru oku": {
    caption:
      "2x + 3y − 6 = 0'da y'yi yalnız bırak: y = −(2/3)x + 2. Eğim −a/b = −2/3: 3 birim sağa giderken 2 birim alçalır.",
    alt: "2x + 3y − 6 = 0 doğrusu; üzerinde 3 sağa, 2 aşağı adımlarını gösteren kesikli dik üçgen.",
    draw: () => {
      const W = [-1, 5, -1, 4] as const;
      return {
        els: [
          ...axes(...W),
          lineEq(2, 3, -6, ...W, { tone: "b" })!,
          seg(v(0, 2), v(3, 2), { dash: true, tone: "a" }),
          seg(v(3, 2), v(3, 0), { dash: true, tone: "c" }),
          dim(v(0, 2), v(3, 2), "+3", v(1, 0), "a"),
          dim(v(3, 2), v(3, 0), "−2", v(1, 0), "c"),
          pt(v(0, 2), "(0; 2)", "w"),
          pt(v(3, 0), "(3; 0)", "s"),
        ],
        readout: ["m = −2/3"],
      };
    },
  },
  "Yatay, düşey ve orijinden geçen doğrular": {
    caption:
      "y = 3 yatay, x = 3 düşey doğrudur; ikisi farklıdır. Orijinden geçen doğrular y = mx biçimindedir, ama x = 0 da orijinden geçer ve bu biçime sığmaz.",
    alt: "Koordinat düzleminde y = 3 yatay ve x = 3 düşey doğruları ile orijinden geçen y = x doğrusu.",
    draw: () => ({
      els: [
        ...axes(-1, 5, -1, 5),
        line(v(-1, 3), v(5, 3), { tone: "b", ext: 0.1 }),
        line(v(3, -1), v(3, 5), { tone: "a", ext: 0.1 }),
        line(v(-1, -1), v(5, 5), { tone: "c", ext: 0.1, dash: true }),
        txt(v(-1, 3), "y = 3", "nw", { small: true, tone: "b" }),
        txt(v(3, 5), "x = 3", "ne", { small: true, tone: "a" }),
        txt(v(5, 5), "y = x", "se", { small: true, tone: "c" }),
      ],
    }),
  },
  "Eksen kesişimlerinden grafiğe geç": {
    caption:
      "x/4 + y/3 = 1 doğrusu x eksenini (4; 0)'da, y eksenini (0; 3)'te keser. İki nokta doğruyu çizmeye yeter.",
    alt: "x/4 + y/3 = 1 doğrusu ve eksenlerle kesişim noktaları U(4; 0) ve V(0; 3).",
    draw: () => {
      const W = [-1, 6, -1, 5] as const;
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -12, ...W, { tone: "b" })!,
          pt(v(4, 0), "U(4; 0)", "ne", "a"),
          pt(v(0, 3), "V(0; 3)", "ne", "a"),
        ],
      };
    },
  },
  "Paralel ile çakışık aynı durum değildir": {
    caption:
      "y = x ile y = x + 3 ayrık paraleldir: eğimleri eşit, ortak noktaları yok. 2y = 2x ise y = x'in başka bir yazılışıdır: çakışıktır.",
    alt: "İki paralel doğru: y = x ve y = x + 3; aralarındaki dik uzaklık kesikli.",
    draw: () => {
      const W = [-4, 4, -3, 5] as const;
      return {
        els: [
          ...axes(...W),
          lineEq(1, -1, 0, ...W, { tone: "b" })!,
          lineEq(1, -1, 3, ...W, { tone: "a" })!,
          par(v(1, 1), v(2, 2), 1, "b"),
          par(v(-1, 2), v(0, 3), 1, "a"),
          txt(v(3.4, 3.4), "y = x (= 2y = 2x)", "se", { small: true, tone: "b" }),
          txt(v(1.4, 4.4), "y = x + 3", "w", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Tek kesişimi iki denklemden birlikte bul": {
    caption:
      "x + y = 4 ve 2x − y = −1 birlikte çözülür: toplayınca 3x = 3, x = 1, y = 3. P(1; 3) iki denklemi de sağlar.",
    alt: "x + y = 4 ve 2x − y = −1 doğruları ve kesişim noktası P(1; 3).",
    draw: () => {
      const W = [-2, 5, -2, 6] as const;
      return {
        els: [
          ...axes(...W),
          lineEq(1, 1, -4, ...W, { tone: "b" })!,
          lineEq(2, -1, 1, ...W, { tone: "a" })!,
          pt(v(1, 3), "P(1; 3)", "e"),
        ],
        readout: ["1 + 3 = 4 ✓ · 2 − 3 = −1 ✓"],
      };
    },
  },
  "Dik doğrular ve sonlu eğim istisnası": {
    caption:
      "Eğimleri −2/3 ve 3/2 olan doğrular diktir: çarpım −1. Eğimi 0 olan yatay doğrunun diki ise eğimi tanımsız düşey doğrudur.",
    alt: "Orijinde dik kesişen iki doğru: y = −(2/3)x ve y = (3/2)x; dik açı işareti.",
    draw: () => {
      const W = [-4, 4, -4, 4] as const;
      return {
        els: [
          ...axes(...W, 2),
          lineEq(2, 3, 0, ...W, { tone: "b" })!,
          lineEq(3, -2, 0, ...W, { tone: "a" })!,
          right(v(0, 0), v(3, -2), v(2, 3)),
          txt(v(4, -2.67), "m = −2/3", "n", { small: true, tone: "b" }),
          txt(v(2.67, 4), "m = 3/2", "e", { small: true, tone: "a" }),
        ],
        readout: ["(−2/3)·(3/2) = −1"],
      };
    },
  },
  "Normal yön, en kısa yolun nedenini gösterir": {
    caption:
      "3x + 4y − 12 = 0 için normal (3; 4) doğruya dik, (−4; 3) doğru boyuncadır. Skaler çarpımları 3·(−4) + 4·3 = 0.",
    alt: "3x + 4y − 12 = 0 doğrusu ve üzerinden çıkan iki ok: dik normal (3; 4) ve doğru boyunca (−4; 3).",
    draw: () => {
      const W = [-2, 6, -1, 5] as const;
      const Q = v(2.4, 1.2);
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -12, ...W, { tone: "b" })!,
          vec(Q, add(Q, v(0.9, 1.2)), { tone: "a", bold: true }),
          vec(Q, add(Q, v(-1.6, 1.2)), { tone: "c", bold: true }),
          right(Q, add(Q, v(0.9, 1.2)), add(Q, v(-1.6, 1.2))),
          txt(add(Q, v(0.9, 1.2)), "(3; 4)", "ne", { small: true, tone: "a" }),
          txt(add(Q, v(-1.6, 1.2)), "(−4; 3)", "nw", { small: true, tone: "c" }),
        ],
      };
    },
  },
  "Noktadan doğruya uzaklık": {
    caption:
      "P(5; 5)'in 3x + 4y − 12 = 0'a uzaklığı |15 + 20 − 12|/5 = 23/5 = 4,6. Aynı apsisteki düşey fark (kesikli) dik olmadığı için daha uzundur.",
    alt: "3x + 4y − 12 = 0 doğrusu, P(5; 5), P'den doğruya dik ve 4,6 uzunluklu parça; ayrıca P'den doğruya düşey, daha uzun kesikli parça.",
    draw: () => {
      const W = [-1, 6, -2, 6] as const;
      const P = v(5, 5);
      const H = v(2.24, 1.32);
      const V2 = v(5, -0.75);
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -12, ...W, { tone: "b" })!,
          seg(P, H, { tone: "a", bold: true }),
          right(H, v(0, 3), P, "a"),
          seg(P, V2, { tone: "warn", dash: true }),
          dim(P, H, "4,6", v(6, 0), "a"),
          dim(P, V2, "5,75", v(0, 5), "warn"),
          pt(P, "P(5; 5)", "ne"),
          pt(H, "H", "sw", "a"),
        ],
      };
    },
  },
  "Dik ayağı da bul ve iki koşulla denetle": {
    caption:
      "δ = 23/5, birim normal u = (3/5; 4/5): H = P − δu = (2,24; 1,32). Kontrol: 3·2,24 + 4·1,32 = 12 ve PH normal yönde.",
    alt: "Doğru, P(5; 5) ve dik ayak H(2,24; 1,32); PH boyunca normal ok.",
    draw: () => {
      const W = [-1, 6, -1, 6] as const;
      const P = v(5, 5);
      const H = v(2.24, 1.32);
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -12, ...W, { tone: "b" })!,
          vec(P, H, { tone: "a" }),
          right(H, v(0, 3), P, "a"),
          pt(P, "P(5; 5)", "ne"),
          pt(H, "H(2,24; 1,32)", "se", "a"),
        ],
        readout: ["3·2,24 + 4·1,32 − 12 = 0 ✓"],
      };
    },
  },
  "Paralel uzaklıkta önce katsayıları uyumlu yap": {
    caption:
      "3x + 4y − 12 = 0 ve 6x + 8y + 6 = 0. İkinciyi 2'ye bölüp 3x + 4y + 3 = 0 yap; uzaklık |−12 − 3|/5 = 3.",
    alt: "İki paralel doğru ve aralarında 3 birimlik dik parça.",
    draw: () => {
      const W = [-3, 6, -3, 5] as const;
      const A = v(4, 0);
      const B = sub(A, mul(v(0.6, 0.8), 3));
      return {
        els: [
          ...axes(...W),
          lineEq(3, 4, -12, ...W, { tone: "b" })!,
          lineEq(3, 4, 3, ...W, { tone: "a" })!,
          seg(A, B, { tone: "c", bold: true }),
          right(B, v(-1, 0), A, "c"),
          dim(A, B, "3", v(0, -3), "c"),
          txt(v(5.6, -1.2), "3x + 4y − 12 = 0", "n", { small: true, tone: "b" }),
          txt(v(-2.8, 1.4), "3x + 4y + 3 = 0", "n", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Alanı doğru analitiğine bağla": {
    caption:
      "x/4 + y/3 = 1 doğrusu eksenlerle OUV dik üçgenini kurar: alan |4·3|/2 = 6.",
    alt: "Doğru ve eksenler arasında boyalı OUV üçgeni; dik kenarlar 4 ve 3.",
    draw: () => {
      const W = [-1, 6, -1, 5] as const;
      return {
        els: [
          ...axes(...W),
          poly([v(0, 0), v(4, 0), v(0, 3)], { fill: "a", tone: "a" }),
          lineEq(3, 4, -12, ...W, { tone: "b" })!,
          right(v(0, 0), v(1, 0), v(0, 1)),
          txt(v(1.2, 0.9), "6", "c", { bold: true }),
          pt(v(4, 0), "U", "ne"),
          pt(v(0, 3), "V", "ne"),
        ],
      };
    },
  },
  "Parametreyi çözerken özel durumu kaybetme": {
    caption:
      "2x + (k − 1)y − 4 = 0. k'yi değiştir: k = 1 olunca y terimi kaybolur ve doğru düşey x = 2 olur; bu değeri baştan k − 1'e bölerek kaybetme.",
    alt: "k sürgüsüyle eğimi değişen ve hep (2; 0) noktasından geçen doğru; k = 1'de düşey.",
    param: { label: "k", min: -3, max: 5, step: 0.5, init: 3 },
    draw: (k) => {
      const W = [-2, 6, -4, 4] as const;
      const el = lineEq(2, k - 1, -4, ...W, { tone: "a", bold: true });
      return {
        els: [...axes(...W), ...(el ? [el] : []), pt(v(2, 0), "(2; 0)", "se")],
        readout: [k === 1 ? "k = 1: 2x − 4 = 0 → x = 2 (düşey, eğim tanımsız)" : `eğim = −2/(${fmt(k)} − 1) = ${fmt(-2 / (k - 1), 3)}`],
      };
    },
  },
};

export const geometryFiguresAyt: Record<string, Record<string, FigureDef>> = {
  "donusum-oteleme-donme": otelemeDonme,
  "donusum-yansima-simetri": yansimaSimetri,
  "cemberin-analitigi": cember,
  "dogrunun-analitigi": dogru,
};
