import {
  add,
  ang,
  circle,
  dim,
  dist,
  fmt,
  lerp,
  line,
  meet,
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
import { linearPairBisectors031 } from "./geometryFigures031";
import { prism, proj, pyramid, regularBase, solid, type P3 } from "./solidKit";

const labelAll = (
  ps: V[],
  names: string[],
  dirs: ("n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw")[],
) => ps.map((p, i) => pt(p, names[i], dirs[i]));
/** Parallelogram with base a along x, side b at angle alpha (degrees). */
function pgram(a: number, b: number, alpha: number): [V, V, V, V] {
  const A = v(0, 0);
  const B = v(a, 0);
  const D = pol(b, alpha);
  return [A, B, add(B, D), D];
}
const area = (ps: V[]) =>
  Math.abs(
    ps.reduce((s, p, i) => s + p[0] * ps[(i + 1) % ps.length][1] - ps[(i + 1) % ps.length][0] * p[1], 0),
  ) / 2;

const paralelkenar: Record<string, FigureDef> = {
  "Paralelkenarı iki çift paralellikle tanı": {
    caption:
      "İki çift karşı kenar paraleldir. AC köşegeni iki eş üçgen kurar; bu yüzden karşı kenarlar ve karşı açılar eşittir, komşu açılar 180° tamamlar.",
    alt: "ABCD paralelkenarı; karşı kenarlarda tek ve çift paralellik okları, AC köşegeniyle iki renkli eş üçgen, A ve C'de 65°, B ve D'de 115°.",
    draw: () => {
      const [A, B, C, D] = pgram(6, 3.4, 65);
      return {
        els: [
          poly([A, B, C], { fill: "a", thin: true }),
          poly([A, C, D], { fill: "b", thin: true }),
          poly([A, B, C, D]),
          seg(A, C, { dash: true }),
          par(A, B, 1),
          par(D, C, 1),
          par(A, D, 2),
          par(B, C, 2),
          ang(A, B, D, "65°", { tone: "a" }),
          ang(C, D, B, "65°", { tone: "a" }),
          ang(B, C, A, "115°", { tone: "c", r: 22 }),
          ang(D, A, C, "115°", { tone: "c", r: 22 }),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
      };
    },
  },
  "Köşegenlerin kesişimi ile orta noktayı ayır": {
    caption:
      "Açıyı değiştir: köşegenler her zaman birbirini ortalar (AO = OC, BO = OD) ama genelde eşit değildir. Yalnız 90°'de eşitlenir: dikdörtgen.",
    alt: "Paralelkenar ABCD ve O'da kesişen köşegenleri; AO ile OC tek çentikli, BO ile OD çift çentikli.",
    param: { label: "A açısı", min: 40, max: 140, step: 5, init: 60, unit: "°" },
    draw: (a) => {
      const [A, B, C, D] = pgram(5.5, 3.2, a);
      const O = mid(A, C);
      const ac = dist(A, C);
      const bd = dist(B, D);
      return {
        els: [
          poly([A, B, C, D], { fill: "muted" }),
          seg(A, C, { tone: "a" }),
          seg(B, D, { tone: "b" }),
          ticks(A, O, 1, "a"),
          ticks(O, C, 1, "a"),
          ticks(B, O, 2, "b"),
          ticks(O, D, 2, "b"),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["sw", "se", "ne", "nw", "s"]),
          txt(v(-3.5, -0.4), "", "c"),
          txt(v(9.5, 3.6), "", "c"),
        ],
        readout: [
          `AC ≈ ${fmt(ac, 2)} · BD ≈ ${fmt(bd, 2)}${Math.abs(ac - bd) < 1e-6 ? " · eşit: dikdörtgen" : ""}`,
        ],
      };
    },
  },
  "Açıortaylar neden dik olur?": {
    caption:
      "Komşu A ve B açıları 180° tamamlar; yarıları α/2 + (180° − α)/2 = 90° eder. Bu yüzden iki açıortay E'de dik kesişir.",
    alt: "Paralelkenarda A ve B köşelerinin iç açıortayları E noktasında dik açıyla buluşuyor.",
    param: { label: "A açısı α", min: 40, max: 140, step: 2, init: 70, unit: "°" },
    draw: (a) => {
      const [A, B, C, D] = pgram(6, 4.2, a);
      const bA = add(A, add(unit(sub(B, A)), unit(sub(D, A))));
      const bB = add(B, add(unit(sub(A, B)), unit(sub(C, B))));
      const E = meet(A, bA, B, bB);
      return {
        els: [
          poly([A, B, C, D]),
          seg(A, E, { tone: "a" }),
          seg(B, E, { tone: "b" }),
          ang(A, B, E, `${a / 2}°`, { tone: "a", r: 34 }),
          ang(A, E, D, undefined, { tone: "a", r: 40 }),
          ang(B, E, A, `${(180 - a) / 2}°`, { tone: "b", r: 34 }),
          ang(B, C, E, undefined, { tone: "b", r: 40 }),
          right(E, A, B),
          ...labelAll([A, B, C, D, E], ["A", "B", "C", "D", "E"], ["sw", "se", "ne", "nw", "n"]),
        ],
        readout: [`${a / 2}° + ${(180 - a) / 2}° = 90° ⇒ ∠AEB = 90°`],
      };
    },
  },
  "Alanı taban ve dik uzaklıkla kur": {
    caption:
      "D'den inen yükseklik bir dik üçgen keser. Bu üçgeni karşı tarafa taşıyınca aynı taban ve yükseklikte bir dikdörtgen oluşur: S = a·h.",
    alt: "Paralelkenar, tabana indirilen yükseklik ve eş alanlı dikdörtgen. Son adımda koordinatlar, dik yükseklik ve köşegenlerin ortak orta noktası gösterilir.",
    steps: ["Paralelkenar", "Yüksekliği indir", "Üçgeni taşı", "Verilen koordinatları kullan"],
    draw: (_, step) => {
      if (step === 3) {
        const A = v(1, 1), B = v(7, 1), D = v(3, 5);
        const C = add(B, sub(D, A));
        const H = v(D[0], A[1]);
        const O = mid(A, C);
        return {
          els: [
            ...axes(-0.5, 10.5, -0.5, 7, 2),
            poly([A, B, C, D], { fill: "muted" }),
            seg(A, C, { dash: true, tone: "a" }),
            seg(B, D, { dash: true, tone: "b" }),
            seg(D, H, { dash: true, tone: "c" }),
            right(H, B, D, "c"),
            ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["w", "se", "ne", "nw", "s"]),
          ],
          readout: [
            `A(1; 1), B(7; 1), D(3; 5). C = B + D − A = (${C[0]}; ${C[1]}).`,
            `Alan = ${dist(A, B)} × ${dist(D, H)} = ${area([A, B, C, D])} birim².`,
            `Ortak orta nokta O(${O[0]}; ${O[1]}).`,
          ],
        };
      }
      const [A, B, C, D] = pgram(6, 3.4, 62);
      const H = v(D[0], 0);
      const H2 = v(C[0], 0);
      const els: El[] = [];
      if (step < 2) {
        els.push(poly([A, B, C, D], { fill: "muted" }));
        if (step === 1) els.push(poly([A, H, D], { fill: "a", tone: "a", thin: true }), seg(D, H, { dash: true, tone: "a" }), right(H, B, D, "a"));
      } else {
        els.push(
          poly([H, B, C, D], { fill: "muted", thin: true }),
          poly([B, H2, C], { fill: "a", tone: "a", thin: true }),
          poly([A, H, D], { tone: "muted", dash: true, thin: true }),
          poly([H, H2, C, D], { tone: "b", bold: true }),
          vec(mid(A, D), mid(B, C), { tone: "a", thin: true }),
        );
      }
      els.push(
        dim(A, B, "a", D),
        ...(step >= 1 ? [dim(D, H, "h", B, "a")] : []),
        ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "s", "ne", "nw"]),
      );
      return { els, readout: step === 2 ? ["Dikdörtgen: a·h = paralelkenarın alanı"] : undefined };
    },
  },
  "Üçgenlere bölmek alanı görünür kılar": {
    caption:
      "P'yi paralelkenarın içinde gezdir: PAB ile PCD'nin alanları değişir ama toplamları hep alanın yarısıdır. P'nin merkez olması gerekmez.",
    alt: "Paralelkenar ABCD ve içindeki P noktası; PAB ve PCD üçgenleri renkli, diğer iki üçgen boş.",
    param: { label: "P'nin konumu", min: 0.1, max: 0.9, step: 0.05, init: 0.3 },
    draw: (t) => {
      const [A, B, C, D] = pgram(6, 3.6, 65);
      const P = add(lerp(A, C, t), v(0.9 * Math.sin(t * 6), 0));
      const s = area([A, B, C, D]);
      const s1 = area([P, A, B]);
      const s2 = area([P, C, D]);
      return {
        els: [
          poly([P, A, B], { fill: "a", thin: true }),
          poly([P, C, D], { fill: "b", thin: true }),
          poly([A, B, C, D]),
          seg(P, A, { thin: true }),
          seg(P, B, { thin: true }),
          seg(P, C, { thin: true }),
          seg(P, D, { thin: true }),
          ...labelAll([A, B, C, D, P], ["A", "B", "C", "D", "P"], ["sw", "se", "ne", "nw", "e"]),
        ],
        readout: [`PAB + PCD = ${fmt(s1, 2)} + ${fmt(s2, 2)} = ${fmt(s1 + s2, 2)} = S/2 (S = ${fmt(s, 2)})`],
      };
    },
  },
  "Eşkenar dörtgende diklik ve yarım köşegen": {
    caption:
      "Yarım köşegenler ve kenar bir dik üçgen oluşturur. İkinci adımda köşegenler iki katına çıkar. Çemberin yarıçapını alanı yarı çevreye bölerek karşılaştır.",
    alt: "Eşkenar dörtgen, dik kesişen iki köşegen ve kenarlara teğet çember. Ölçüler ikinci adımda büyür.",
    steps: ["8 ve 6 birim köşegen", "16 ve 12 birim köşegen"],
    draw: (_, step) => {
      const halfWidth = step === 0 ? 4 : 8;
      const halfHeight = step === 0 ? 3 : 6;
      const O = v(0, 0);
      const [A, B, C, D] = [v(-halfWidth, 0), v(0, -halfHeight), v(halfWidth, 0), v(0, halfHeight)];
      const side = Math.hypot(halfWidth, halfHeight);
      const shapeArea = area([A, B, C, D]);
      const radius = shapeArea / (2 * side);
      return {
        els: [
          txt(v(-9, -7), " ", "c"),
          txt(v(9, 7), " ", "c"),
          circle(O, radius, { tone: "b", thin: true }),
          poly([A, B, C, D], { fill: "muted" }),
          seg(A, C, { tone: "a" }),
          seg(B, D, { tone: "a" }),
          right(O, C, D),
          ...[A, B, C, D].map((p, i) => ticks(p, [B, C, D, A][i], 1)),
          dim(O, C, String(halfWidth), D, "a"),
          dim(O, D, String(halfHeight), A, "a"),
          dim(C, D, String(side), O),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["w", "s", "e", "n", "sw"]),
        ],
        readout: [
          `Yarı köşegenler ${halfWidth} ve ${halfHeight}. Kenar = √(${halfWidth}² + ${halfHeight}²) = ${side} birim.`,
          `Alan = ${2 * halfWidth}·${2 * halfHeight}/2 = ${shapeArea} birim².`,
          `r = ${shapeArea}/${2 * side} = ${fmt(radius)} birim. Yükseklik = ${fmt(2 * radius)} birim.`,
        ],
      };
    },
  },
  "Köşegenlerle genel alan ve uzunluk denetimi": {
    caption:
      "Köşegenler 8 ve 6, aralarındaki açı θ. θ'yı değiştir: alan d₁d₂sinθ/2 olur ve kenarlar ne olursa olsun d₁² + d₂² = 2(a² + b²) korunur.",
    alt: "Köşegenleri 8 ve 6 uzunlukta olan paralelkenar; köşegenler arasındaki θ açısı sürgüyle değişiyor.",
    param: { label: "θ", min: 20, max: 160, step: 5, init: 60, unit: "°" },
    draw: (th) => {
      const u = pol(4, 0);
      const w = pol(3, th);
      const O = v(0, 0);
      const A = mul(u, -1);
      const C = u;
      const B = mul(w, -1);
      const D = w;
      const a = dist(A, B);
      const b = dist(B, C);
      return {
        els: [
          poly([A, B, C, D], { fill: "muted" }),
          seg(A, C, { tone: "a" }),
          seg(B, D, { tone: "b" }),
          ang(O, C, D, "θ", { r: 28 }),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["w", "s", "e", "n", "sw"]),
          txt(v(-4.6, -3.2), "", "c"),
          txt(v(4.6, 3.2), "", "c"),
        ],
        readout: [
          `S = 8·6·sin ${th}°/2 ≈ ${fmt(24 * Math.sin((th * Math.PI) / 180), 2)}`,
          `2(a² + b²) ≈ ${fmt(2 * (a * a + b * b), 1)} = 8² + 6² = 100`,
        ],
      };
    },
  },
};

/** Labeled 3D point. */
const p3 = (p: P3, label: string, at: "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw" = "ne", tone?: "a" | "b" | "c") =>
  pt(proj(p), label, at, tone);

const dikPrizmalar: Record<string, FigureDef> = {
  "Altıgen tabandan prizmanın en uzun köşegenine": {
    caption: "Altı eşkenar üçgenden taban alanını kur. Sonraki adımda tabanın karşıt köşeleri arasındaki 2a ile prizmanın 9 cm dik yüksekliğini kullan.",
    alt: "İlk adımda düzenli altıgen altı eşkenar üçgene ayrılmıştır. İkinci adımda alt ve üst karşıt köşeleri birleştiren cisim köşegeni çizilir.",
    steps: ["Altıgen taban", "Dik prizma"],
    param: { label: "Altıgenin kenarı", min: 2, max: 7, step: 1, init: 4, unit: " cm" },
    draw: (a, step) => {
      const height = 9;
      const scale = 0.45;
      const base = regularBase(6, a * scale);
      const areaCoefficient = (3 * a ** 2) / 2;
      const lateral = 6 * a * height;
      const volumeCoefficient = areaCoefficient * height;
      const diagonalSquared = 4 * a ** 2 + height ** 2;
      if (step === 0) {
        const points = base.map(([x, y]) => v(x, y));
        const O = v(0, 0);
        const [A, B] = points;
        const midpoint = mid(A, B);
        return {
          els: [
            poly(points, { tone: "ink" }),
            poly([O, A, B], { tone: "a", fill: "a" }),
            ...points.map((point) => seg(O, point, { tone: "muted", thin: true })),
            seg(O, midpoint, { tone: "b", dash: true }),
            right(midpoint, O, A, "ink"),
            pt(O, "O", "sw"),
            txt(A, `${a} cm`, "e", { tone: "a", small: true }),
          ],
          readout: [
            `Taban alanı 6 × (a²√3 / 4) = ${fmt(areaCoefficient, 1)}√3 cm².`,
            `Merkezden köşeye ${a} cm. Merkezden kenara dik uzaklık ${fmt(a / 2, 1)}√3 cm.`,
          ],
        };
      }
      const { vs, els } = prism(base, height * scale, { fills: { 1: "b" } });
      const from = proj(vs[0]);
      const opposite = proj(vs[3]);
      const above = proj(vs[9]);
      return {
        els: [
          ...els,
          seg(from, opposite, { tone: "b", dash: true }),
          seg(opposite, above, { tone: "b", bold: true }),
          seg(from, above, { tone: "a", bold: true }),
        ],
        readout: [
          `Yan alan ${lateral} cm². Kapalı toplam alan ${lateral} + ${fmt(2 * areaCoefficient, 1)}√3 cm².`,
          `Hacim ${fmt(volumeCoefficient, 1)}√3 cm³.`,
          `En uzun köşegen √(${2 * a}² + ${height}²) = √${diagonalSquared} cm.`,
        ],
      };
    },
  },

  "Üç boyutlu cismi iki boyutlu çizimden oku": {
    caption:
      "Üçgen dik prizma: iki eş üçgen taban (renkli), tabanları birleştiren yan ayrıtlar ve dikdörtgen yan yüzler. Kesikli çizgi arkada kalan ayrıttır.",
    alt: "Üçgen dik prizma; alt ve üst üçgen tabanlar boyalı, görünmeyen arka ayrıt kesikli.",
    draw: () => {
      const base: [number, number][] = [[0, 0], [4, 0], [1.2, 3]];
      const { vs, els } = prism(base, 3.4, { fills: { 0: "b", 1: "b" } });
      return {
        els: [
          ...els,
          txt(proj([2, 3.4, 1]), "taban", "c", { small: true, tone: "b" }),
          seg(proj(vs[1]), proj(vs[4]), { tone: "a", bold: true }),
          txt(proj([4, 1.7, 0]), "yan ayrıt", "e", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Diklik, yükseklik ve düzgünlük ayrı bilgilerdir": {
    caption:
      "Cismin yüksekliği h yan ayrıt boyunca ölçülür. Taban üçgeninin kendi yüksekliği (mavi) başka bir uzunluktur; ikisine aynı harfi verme.",
    alt: "Üçgen dik prizma; yan ayrıtta cismin yüksekliği h turuncu, taban üçgeninin içinde tabana inen üçgen yüksekliği mavi.",
    draw: () => {
      const base: [number, number][] = [[0, 0], [5, 0], [1.6, 2.6]];
      const { vs, els } = prism(base, 3.6, { fills: { 0: "muted" } });
      const F: P3 = [1.6, 0, 0];
      return {
        els: [
          ...els,
          seg(proj(vs[2]), proj(F), { tone: "b", dash: true }),
          txt(mid(proj(vs[2]), proj(F)), "hₜ", "e", { tone: "b" }),
          seg(proj(vs[1]), proj(vs[4]), { tone: "a", bold: true }),
          txt(mid(proj(vs[1]), proj(vs[4])), "h", "e", { tone: "a" }),
        ],
        readout: ["V = (taban alanı) · h", "Taban alanı = taban · hₜ / 2"],
      };
    },
  },
  "Köşe, ayrıt ve yüzleri sayarak modeli denetle": {
    caption:
      "Taban kenar sayısı n'yi değiştir: dik prizmada 2n köşe, 3n ayrıt ve n + 2 yüz vardır. Köşe − ayrıt + yüz her zaman 2 çıkar.",
    alt: "Düzgün n-gen tabanlı dik prizma; n sürgüyle 3'ten 8'e değişiyor.",
    param: { label: "Taban kenar sayısı n", min: 3, max: 8, step: 1, init: 6 },
    draw: (n) => {
      const { els } = prism(regularBase(n, 2.2), 3.2, { fills: { 1: "b" } });
      return {
        els,
        readout: [`Köşe ${2 * n} · Ayrıt ${3 * n} · Yüz ${n + 2}`, `${2 * n} − ${3 * n} + ${n + 2} = 2`],
      };
    },
  },
  "Hacmi taban alanından kur": {
    caption:
      "Tabanı dik kenarları 3 ve 4 olan üçgen (B = 6). Yüksekliği değiştir: her yatay dilim aynı 6 birimkarelik kesittir, hacim B·h olarak büyür.",
    alt: "Taban dik kenarları 3 ve 4 olan dik üçgen prizma; yükseklik sürgüyle değişiyor ve eşit aralıklı yatay dilim çizgileri görünüyor.",
    param: { label: "Yükseklik h", min: 1, max: 8, step: 1, init: 5 },
    draw: (h) => {
      const base: [number, number][] = [[0, 0], [4, 0], [0, 3]];
      const { els } = prism(base, h, { fills: { 0: "b" } });
      const slices: El[] = [];
      for (let k = 1; k < h; k++)
        slices.push(poly(base.map(([x, z]) => proj([x, k, z])), { tone: "b", thin: true, dash: true }));
      return {
        els: [...slices, ...els, txt(proj([5, 8, 0]), "", "c"), txt(proj([0, 0, 0]), "", "c")],
        readout: [`V = 6 · ${h} = ${6 * h} birimküp`],
      };
    },
  },
  "Açınım yüzey alanını görünür yapar": {
    caption:
      "Ayrıtları 4, 3, 2 olan dikdörtgenler prizmasının açınımı: karşılıklı yüzler eş renkte. Altı dikdörtgenin toplamı 2(12 + 8 + 6) = 52 birimkaredir.",
    alt: "Dikdörtgenler prizmasının haç biçimli açınımı; 4×3, 4×2 ve 3×2 boyutlu yüzler ikişer kez, karşılıklılar aynı renkte ve alanları yazılı.",
    draw: () => {
      const a = 4;
      const b = 3;
      const c = 2;
      const rect = (x: number, y: number, w: number, h: number, tone: "a" | "b" | "c", label: string): El[] => [
        poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: tone, tone }),
        txt(v(x + w / 2, y + h / 2), label, "c", { small: true, bold: true }),
      ];
      // Column: bottom a×b, front a×c, top a×b, back a×c; the two b×c side
      // faces fold up from the front face.
      const x0 = b;
      return {
        els: [
          ...rect(x0, 0, a, b, "a", "12"),
          ...rect(x0, b, a, c, "b", "8"),
          ...rect(x0, b + c, a, b, "a", "12"),
          ...rect(x0, 2 * b + c, a, c, "b", "8"),
          ...rect(0, b, b, c, "c", "6"),
          ...rect(x0 + a, b, b, c, "c", "6"),
          dim(v(x0, 0), v(x0 + a, 0), "4", v(x0, 1)),
          dim(v(x0 + a, 0), v(x0 + a, b), "3", v(x0, 1)),
          dim(v(0, b), v(0, b + c), "2", v(1, b + 1)),
        ],
        readout: ["S = 2(4·3 + 4·2 + 3·2) = 52", "V = 4·3·2 = 24"],
      };
    },
  },
  "Yüz köşegeni ile cisim köşegenini ayır": {
    caption:
      "Ayrıtları 3, 4, 12 olan kutuda taban yüzünün köşegeni 5'tir (mavi). Cisim köşegeni bu yüz köşegeni ile 12'lik ayrıtın dik üçgeninin hipotenüsüdür: 13.",
    alt: "Ayrıtları 4, 3 ve 12 birim olan dikdörtgenler prizması; tabanda yüz köşegeni mavi, karşı köşeleri cismin içinden birleştiren cisim köşegeni turuncu.",
    draw: () => {
      const s = 0.4;
      const base: [number, number][] = [[0, 0], [4, 0], [4, 3], [0, 3]];
      const { vs, els } = prism(base, 12 * s);
      const A = vs[0];
      const Cb = vs[2];
      const G = vs[6];
      return {
        els: [
          ...els,
          poly([proj(A), proj(Cb), proj(G)], { fill: "a", thin: true, tone: "a" }),
          seg(proj(A), proj(Cb), { tone: "b", bold: true }),
          seg(proj(A), proj(G), { tone: "a", bold: true }),
          txt(mid(proj(A), proj(Cb)), "5", "se", { tone: "b" }),
          txt(mid(proj(A), proj(G)), "13", "nw", { tone: "a" }),
          txt(mid(proj(Cb), proj(G)), "12", "e"),
        ],
        readout: ["Yüz: √(4² + 3²) = 5", "Cisim: √(5² + 12²) = √(4² + 3² + 12²) = 13"],
      };
    },
  },
  "Yüzeydeki en kısa yolu açınımla bul": {
    caption:
      "a = 2, b = 3, c = 4 kutusunda iki komşu yüzü düzleme açınca yüzey yolu düz bir doğru olur. Üç açınım sırasını karşılaştır; en kısası √41.",
    alt: "İki dikdörtgen yüzün yan yana açılmış hâli ve karşı köşeleri birleştiren doğru; adımlarda farklı yüz eşleşmeleri.",
    steps: ["(a + b) ve c", "(a + c) ve b", "(b + c) ve a"],
    draw: (_, step) => {
      const [p, q, r] = [
        [2, 3, 4],
        [2, 4, 3],
        [3, 4, 2],
      ][step];
      const L2 = (p + q) ** 2 + r ** 2;
      return {
        els: [
          poly([v(0, 0), v(p, 0), v(p, r), v(0, r)], { fill: "b", tone: "b" }),
          poly([v(p, 0), v(p + q, 0), v(p + q, r), v(p, r)], { fill: "c", tone: "c" }),
          seg(v(0, 0), v(p + q, r), { tone: "a", bold: true }),
          pt(v(0, 0), "başlangıç", "sw", "a"),
          pt(v(p + q, r), "hedef", "ne", "a"),
          dim(v(0, 0), v(p, 0), String(p), v(0, 1), "b"),
          dim(v(p, 0), v(p + q, 0), String(q), v(p, 1), "c"),
          dim(v(p + q, 0), v(p + q, r), String(r), v(0, 0)),
        ],
        readout: [`√(${p + q}² + ${r}²) = √${L2}`, "Adaylar: √41 < √45 < √53"],
      };
    },
  },
  "Kesit, ölçek ve birleşik cisimde sınırı izle": {
    caption:
      "Bütün uzunlukları k katına çıkar: yüz alanları k², hacim k³ katına çıkar. k = 2'de alan 4, hacim 8 katıdır.",
    alt: "Kenarı 1 olan küçük küp ve kenarı k olan büyük küp yan yana; k sürgüyle değişiyor.",
    param: { label: "Ölçek k", min: 1, max: 3, step: 0.5, init: 2 },
    draw: (k) => {
      const sq = (s: number, dx: number): [number, number][] => [[dx, 0], [dx + s, 0], [dx + s, s], [dx, s]];
      const small = prism(sq(1, 0), 1, { fills: { 1: "b" } });
      const big = prism(sq(k, 2), k, { fills: { 1: "a" } });
      return {
        els: [...small.els, ...big.els, txt(proj([5.5, 3.2, 3]), "", "c")],
        readout: [`Alan oranı k² = ${fmt(k * k, 2)}`, `Hacim oranı k³ = ${fmt(k ** 3, 3)}`],
      };
    },
  },
};

const piramitler: Record<string, FigureDef> = {
  "Piramidi bir taban ve bir tepeyle kur": {
    caption:
      "Taban kenar sayısını değiştir: n kenarlı tabanlı piramitte n + 1 köşe, 2n ayrıt ve n + 1 yüz vardır. Yan yüzlerin hepsi üçgendir.",
    alt: "Düzgün n-gen tabanlı dik piramit; taban boyalı, görünmeyen ayrıtlar kesikli.",
    param: { label: "Taban kenar sayısı n", min: 3, max: 8, step: 1, init: 4 },
    draw: (n) => {
      const { vs, els } = pyramid(regularBase(n, 2.4), [0, 4, 0], { fills: { 0: "b" } });
      return {
        els: [...els, p3(vs[n], "T", "n")],
        readout: [`Köşe ${n + 1} · Ayrıt ${2 * n} · Yüz ${n + 1}`],
      };
    },
  },
  "Yükseklik, yan yüz yüksekliği ve yan ayrıtı ayır": {
    caption:
      "Aynı T tepesinden üç farklı uzunluk çıkar: tabana dik yükseklik h (turuncu), bir yan yüzün yüksekliği ℓ (mavi) ve köşeye giden yan ayrıt e (nane).",
    alt: "Kare tabanlı düzgün piramit; tepe T'den taban merkezi O'ya h, taban kenarının orta noktası M'ye ℓ, bir köşe A'ya e çizilmiş.",
    draw: () => {
      const base: [number, number][] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      const T: P3 = [0, 4, 0];
      const { els } = pyramid(base, T);
      const O: P3 = [0, 0, 0];
      const M: P3 = [0, 0, -3];
      const A: P3 = [3, 0, -3];
      return {
        els: [
          ...els,
          seg(proj(T), proj(O), { tone: "a", dash: true }),
          seg(proj(T), proj(M), { tone: "b", bold: true }),
          seg(proj(T), proj(A), { tone: "c", bold: true }),
          seg(proj(O), proj(M), { tone: "muted", dash: true, thin: true }),
          p3(T, "T", "n"),
          p3(O, "O", "e"),
          p3(M, "M", "s", "b"),
          p3(A, "A", "se", "c"),
          txt(mid(proj(T), proj(O)), "h", "e", { tone: "a" }),
          txt(mid(proj(T), proj(M)), "ℓ", "w", { tone: "b" }),
          txt(mid(proj(T), proj(A)), "e", "e", { tone: "c" }),
        ],
      };
    },
  },
  "Düzgün kare piramitte iki farklı dik üçgen vardır": {
    caption:
      "a = 6, h = 4: TOM dik üçgeninde OM = 3, ℓ = 5. TOA dik üçgeninde OA = 3√2, e = √34. İki hipotenüs farklıdır.",
    alt: "Kare tabanlı piramit; adım adım TOM ve TOA dik üçgenleri boyanıyor.",
    steps: ["TOM: ℓ² = h² + (a/2)²", "TOA: e² = h² + (a√2/2)²"],
    draw: (_, step) => {
      const base: [number, number][] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      const T: P3 = [0, 4, 0];
      const O: P3 = [0, 0, 0];
      const M: P3 = [0, 0, -3];
      const A: P3 = [3, 0, -3];
      const Q = step === 0 ? M : A;
      const { els } = pyramid(base, T);
      return {
        els: [
          ...els,
          poly([proj(T), proj(O), proj(Q)], { fill: step === 0 ? "b" : "c", tone: step === 0 ? "b" : "c" }),
          p3(T, "T", "n"),
          p3(O, "O", "w"),
          p3(Q, step === 0 ? "M" : "A", "s"),
          txt(mid(proj(T), proj(O)), "4", "w", { tone: "a" }),
          txt(mid(proj(O), proj(Q)), step === 0 ? "3" : "3√2", "s"),
        ],
        readout: [step === 0 ? "ℓ = √(16 + 9) = 5" : "e = √(16 + 18) = √34"],
      };
    },
  },
  "Yanal alanı üçgenlerden, toplam alanı sınırlardan bul": {
    caption:
      "Kare tabanı 6, yan yüz yüksekliği 5 olan piramidin açınımı: bir kare ve dört eş üçgen. Yanal alan 4·6·5/2 = 60, toplam 36 + 60 = 96.",
    alt: "Ortada 6×6 kare, her kenarına yüksekliği 5 olan birer üçgen yapışık yıldız biçimli açınım.",
    draw: () => {
      const sq: V[] = [v(-3, -3), v(3, -3), v(3, 3), v(-3, 3)];
      const tris: El[] = sq.map((p, i) => {
        const q = sq[(i + 1) % 4];
        const m = mid(p, q);
        const out = mul(unit(m), 5);
        return poly([p, q, add(m, out)], { fill: i % 2 ? "b" : "c", thin: true });
      });
      return {
        els: [
          ...tris,
          poly(sq, { fill: "a", tone: "a" }),
          txt(v(0, 0), "36", "c", { bold: true }),
          txt(v(0, -4.6), "15", "c", { small: true }),
          dim(v(0, 3), v(0, 8), "ℓ = 5", v(-3, 5)),
          dim(sq[0], sq[1], "6", v(0, -5)),
        ],
        readout: ["Yanal: 4·(6·5/2) = 60", "Toplam: 36 + 60 = 96"],
      };
    },
  },
  "Hacimde üçte bir neden vardır?": {
    caption:
      "Aynı taban alanına ve aynı dik yüksekliğe sahip prizma ile piramit: piramidin hacmi prizmanınkinin tam üçte biridir.",
    alt: "Solda kare tabanlı dik prizma, sağda aynı taban ve yükseklikte kare piramit; ikisinin tabanı aynı renkte.",
    draw: () => {
      const sq = (dx: number): [number, number][] => [[dx, 0], [dx + 3, 0], [dx + 3, 3], [dx, 3]];
      const pr = prism(sq(0), 4, { fills: { 0: "b" } });
      const py = pyramid(sq(5.5), [7, 4, 1.5], { fills: { 0: "b" } });
      return {
        els: [
          ...pr.els,
          ...py.els,
          txt(proj([1.5, -0.8, 0]), "V = B·h", "c", { small: true }),
          txt(proj([7, -0.8, 0]), "V = B·h/3", "c", { small: true, tone: "a" }),
        ],
        readout: ["B = 9, h = 4: prizma 36, piramit 12"],
      };
    },
  },
  "Düzgün dört yüzlüyü özel olarak çöz": {
    caption:
      "Bütün ayrıtları 6 olan düzgün dört yüzlüde tepe, taban üçgeninin ağırlık merkezi G'nin tam üstündedir. GA = 2√3, h = √(36 − 12) = 2√6.",
    alt: "Düzgün dört yüzlü; tepe T'den taban ağırlık merkezi G'ye dik yükseklik, G'den bir köşe A'ya parça ve oluşan dik üçgen.",
    draw: () => {
      const a = 6;
      const R = a / Math.sqrt(3);
      const base = regularBase(3, R, -90 - 30);
      const h = (a * Math.sqrt(6)) / 3;
      const T: P3 = [0, h, 0];
      const { vs, els } = pyramid(base, T);
      const G: P3 = [0, 0, 0];
      const A = vs[0];
      return {
        els: [
          ...els,
          poly([proj(T), proj(G), proj(A)], { fill: "a", tone: "a", thin: true }),
          seg(proj(T), proj(G), { tone: "a", dash: true }),
          p3(T, "T", "n"),
          p3(G, "G", "e", "a"),
          p3(A, "A", "sw"),
        ],
        readout: [`h = 6√6/3 = 2√6 ≈ ${fmt(h, 2)}`, `V = a³√2/12 = 18√2 ≈ ${fmt((a ** 3 * Math.SQRT2) / 12, 2)}`],
      };
    },
  },
  "Paralel kesitte uzaklığın nereden ölçüldüğünü söyle": {
    caption:
      "k = tepe–kesit uzaklığı / tam yükseklik. Kesiti kaydır: üstteki küçük piramidin uzunlukları k, kesit alanı k², hacmi k³ oranındadır.",
    alt: "Kare tabanlı piramit; tabana paralel bir kesit düzlemi üstte küçük benzer piramidi ayırıyor ve küçük piramit boyalı.",
    param: { label: "k", min: 0.2, max: 0.9, step: 0.05, init: 0.5 },
    draw: (k) => {
      const base: [number, number][] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      const H = 6;
      const T: P3 = [0, H, 0];
      const { els } = pyramid(base, T);
      const yk = H * (1 - k);
      const sec: P3[] = base.map(([x, z]) => [x * k, yk, z * k] as P3);
      const small = solid([...sec, T], [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]], {
        tone: "a",
        fills: { 1: "a", 2: "a" },
      });
      return {
        els: [...els, poly(sec.map(proj), { fill: "a", tone: "a", thin: true }), ...small, p3(T, "T", "n")],
        readout: [
          `Uzunluk ${fmt(k, 2)} · Alan ${fmt(k * k, 3)} · Hacim ${fmt(k ** 3, 3)}`,
          `Kalan kesik cisim: ${fmt(1 - k ** 3, 3)}`,
        ],
      };
    },
  },
  "Kesik piramidi büyükten küçüğü çıkararak anla": {
    caption:
      "Adım 1: alt kare 6, üst kare 3, kesik yükseklik 4; büyük piramide tamamla, 96 − 12 = 84. Adım 2: yükseklik verilmez, yan ayrıt verilirse önce dik üçgenle h bulunur (2013 LYS-1 Geometri 22 mantığı).",
    alt: "Kare tabanlı kesik piramit. Birinci adımda üstüne kesikli çizgilerle küçük piramit tamamlanıyor; ikinci adımda üst köşeden tabana inen dik yükseklik, yan ayrıt ve tabandaki yatay kayma bir dik üçgen oluşturuyor.",
    steps: ["Büyük − küçük", "Yan ayrıttan dik yükseklik"],
    draw: (_, step) => {
      const big: [number, number][] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      if (step === 0) {
        const T: P3 = [0, 8, 0];
        const top: P3[] = big.map(([x, z]) => [x / 2, 4, z / 2] as P3);
        const bottom: P3[] = big.map(([x, z]) => [x, 0, z] as P3);
        const frustum = solid([...bottom, ...top], [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]], {
          fills: { 1: "b" },
        });
        return {
          els: [
            ...top.map((p) => seg(proj(p), proj(T), { dash: true, tone: "muted", thin: true })),
            ...frustum,
            p3(T, "T", "n", "a"),
            txt(proj([3.4, 2, -3]), "4", "e"),
            txt(proj([3.4, 6, -3]), "4", "e", { tone: "muted" }),
          ],
          readout: ["Büyük: 36·8/3 = 96 · Küçük: 9·4/3 = 12", "Kesik: 96 − 12 = 84"],
        };
      }
      // Bottom square 6, top square 4, slant edge √5: drawn with h = √3 at 1.6× vertical scale.
      const hy = Math.sqrt(3) * 1.6;
      const bottom: P3[] = big.map(([x, z]) => [x, 0, z] as P3);
      const top: P3[] = big.map(([x, z]) => [(x * 2) / 3, hy, (z * 2) / 3] as P3);
      const frustum = solid([...bottom, ...top], [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]], {
        fills: { 1: "b" },
      });
      const U = top[1];
      const F: P3 = [U[0], 0, U[2]];
      const B = bottom[1];
      return {
        els: [
          ...frustum,
          poly([proj(U), proj(F), proj(B)], { fill: "a", tone: "a", thin: true }),
          seg(proj(U), proj(F), { tone: "a", dash: true }),
          seg(proj(U), proj(B), { tone: "c", bold: true }),
          txt(mid(proj(U), proj(F)), "h", "w", { tone: "a", bold: true }),
          txt(mid(proj(U), mid(proj(U), proj(B))), "√5", "e", { tone: "c", bold: true }),
          txt(proj([3.2, 0, -3.4]), "6", "s"),
          txt(proj([-1, hy, -2]), "4", "s", { small: true }),
        ],
        readout: ["Kayma: (6 − 4)/2 = 1 iki eksende → FB² = 1 + 1 = 2", "h² = 5 − 2 = 3 → h = √3 · V = (36·3√3 − 16·2√3)/3 = 76√3/3"],
      };
    },
  },
};

const kaynakPekistirme: Record<string, FigureDef> = {
  "Doğrusal çiftte açıortaylar": {
    ...linearPairBisectors031,
    caption: "Ortak kolu çevir. Dış kollar zıt yönlerde kaldığında açıortayların arasındaki ölçüyü izle.",
    param: { ...linearPairBisectors031.param, label: "Sağ koldan ölçülen açı", init: 78 },
    draw: (angle) => {
      const frame = linearPairBisectors031.draw(angle);
      return {
        ...frame,
        readout: [`Doğrusal çift: ${angle}° + ${180 - angle}° = 180°.`, ...frame.readout],
      };
    },
  },
  "Açı adından köşeye ve kollara git": {
    caption:
      "Kolları uzat ya da kısalt: ∠ABC'nin ölçüsü değişmez. Ölçü kolların uzunluğuna değil, bir koldan ötekine dönüşe bağlıdır.",
    alt: "B köşeli, BA ve BC kollu 50°'lik açı; kolların çizilen uzunluğu sürgüyle değişiyor.",
    param: { label: "Kol uzunluğu", min: 1, max: 4, step: 0.5, init: 2 },
    draw: (L) => {
      const B = v(0, 0);
      const A = pol(L, 50);
      const C = v(L, 0);
      return {
        els: [
          seg(B, A, { bold: true }),
          seg(B, C, { bold: true }),
          ang(B, C, A, "50°", { fill: true }),
          pt(B, "B", "sw", "a"),
          pt(A, "A", "n"),
          pt(C, "C", "e"),
          txt(v(-0.6, -0.6), "", "c"),
          txt(v(4.5, 3.4), "", "c"),
        ],
        readout: [`m(∠ABC) = 50° · kol uzunluğu ${fmt(L)}`],
      };
    },
  },
  "Ölçü aralığıyla adlandır": {
    caption:
      "Yarım dönüş üzerinde sınıflar: 0°–90° arası dar, tam 90° dik, 90°–180° arası geniş. 87° ile 93° birbirine yakın ama farklı sınıftadır.",
    alt: "Yarım daire biçiminde açıölçer; 0'dan 90'a dar bölge mavi, 90'dan 180'e geniş bölge turuncu, 87° ve 93° ışınları işaretli.",
    draw: () => {
      const O = v(0, 0);
      const r = 3.6;
      return {
        els: [
          ang(O, v(r, 0), v(0, r), undefined, { tone: "b", fill: true, r: 120 }),
          ang(O, v(0, r), v(-r, 0), undefined, { tone: "a", fill: true, r: 120 }),
          seg(v(-r, 0), v(r, 0)),
          seg(O, v(0, r), { tone: "ink" }),
          right(O, v(1, 0), v(0, 1)),
          seg(O, pol(r, 87), { tone: "b", thin: true }),
          seg(O, pol(r, 93), { tone: "a", thin: true }),
          txt(pol(r + 0.2, 84), "87°", "ne", { small: true, tone: "b" }),
          txt(pol(r + 0.2, 96), "93°", "nw", { small: true, tone: "a" }),
          txt(pol(2.2, 40), "dar", "c", { tone: "b", bold: true }),
          txt(pol(2.2, 140), "geniş", "c", { tone: "a", bold: true }),
          txt(v(r, -0.4), "0°", "s", { small: true }),
          txt(v(-r, -0.4), "180°", "s", { small: true }),
          pt(O),
        ],
      };
    },
  },
  "Komşuluk ile toplam koşulunu ayır": {
    caption:
      "Solda komşu iki açı: 30° + 40° = 70°, toplam 180° değil. Ortada komşu olmayan tümler açılar: 30° + 60° = 90°. Sağda doğrusal çift: 70° + 110° = 180°.",
    alt: "Üç panel: aynı köşede yan yana 30° ve 40°; birbirinden ayrı duran 30° ve 60°; bir doğru üzerinde 70° ve 110°.",
    draw: () => {
      const O1 = v(0, 0);
      const O2a = v(4.4, 0);
      const O2b = v(6.4, 0);
      const O3 = v(10.6, 0);
      return {
        els: [
          seg(O1, v(2.8, 0)),
          seg(O1, pol(2.8, 30)),
          seg(O1, pol(2.8, 70)),
          ang(O1, v(1, 0), pol(1, 30), "30°", { tone: "b", fill: true, r: 40 }),
          ang(O1, pol(1, 30), pol(1, 70), "40°", { tone: "a", fill: true, r: 52 }),
          seg(O2a, add(O2a, v(1.6, 0))),
          seg(O2a, add(O2a, pol(1.6, 30))),
          ang(O2a, add(O2a, v(1, 0)), add(O2a, pol(1, 30)), "30°", { tone: "b", fill: true, r: 40 }),
          seg(O2b, add(O2b, v(1.6, 0))),
          seg(O2b, add(O2b, pol(1.6, 60))),
          ang(O2b, add(O2b, v(1, 0)), add(O2b, pol(1, 60)), "60°", { tone: "c", fill: true, r: 34 }),
          line(sub(O3, v(2.4, 0)), add(O3, v(2.4, 0)), { ext: 0.1 }),
          seg(O3, add(O3, pol(2.4, 70))),
          ang(O3, add(O3, v(1, 0)), add(O3, pol(1, 70)), "70°", { tone: "b", fill: true, r: 34 }),
          ang(O3, add(O3, pol(1, 70)), sub(O3, v(1, 0)), "110°", { tone: "a", fill: true, r: 28 }),
          txt(v(1.2, -0.9), "komşu: 70°", "c", { small: true }),
          txt(v(6, -0.9), "tümler: 90°", "c", { small: true }),
          txt(v(10.6, -0.9), "doğrusal çift: 180°", "c", { small: true }),
        ],
      };
    },
  },
  "Aynı kesişimde ters açıları bul": {
    caption:
      "Ters iki açı 93° ise komşuları 87°dir. Dört açı sırasıyla 93°, 87°, 93°, 87° olur ve tam açıyı tamamlar.",
    alt: "Kesişen iki doğru; karşılıklı iki açı 93°, diğer iki açı 87° olarak iki renkle işaretli.",
    draw: () => {
      const O = v(0, 0);
      const E = v(3, 0);
      const W = v(-3, 0);
      const U = pol(3, 93);
      const D = pol(3, 273);
      return {
        els: [
          line(W, E, { ext: 0.2 }),
          line(D, U, { ext: 0.2 }),
          ang(O, E, U, "93°", { fill: true, r: 32 }),
          ang(O, W, D, "93°", { fill: true, r: 32 }),
          ang(O, U, W, "87°", { fill: true, tone: "b", r: 26 }),
          ang(O, D, E, "87°", { fill: true, tone: "b", r: 26 }),
          pt(O),
        ],
        readout: ["93 + 87 + 93 + 87 = 360"],
      };
    },
  },
  "Paralellerde konumu tarif et": {
    caption:
      "Sekiz açı numaralı. Adımlarda çift türünü konumdan oku: aynı köşe konumu (yöndeş), içeride karşı yanlar (iç ters), dışarıda karşı yanlar (dış ters), içeride aynı yan (toplam 180°).",
    alt: "Paralel d₁ ve d₂'yi kesen doğru; her kesişimde dört açı 1'den 8'e numaralı, seçilen çift renkli.",
    steps: ["Yöndeş: 1 ve 5", "İç ters: 3 ve 5", "Dış ters: 1 ve 7", "Aynı yan iç: 4 + 5 = 180°"],
    draw: (_, step) => {
      const t = 60;
      const u = pol(1, t);
      const P2 = v(2.4, 0);
      const P1 = add(P2, mul(u, 2.6 / Math.sin((t * Math.PI) / 180)));
      const R = v(1, 0);
      const quad = (P: V) => [
        [add(P, R), add(P, u)],
        [add(P, u), sub(P, R)],
        [sub(P, R), sub(P, u)],
        [sub(P, u), add(P, R)],
      ] as [V, V][];
      const vals = [60, 120, 60, 120];
      const pairs = [
        [1, 5],
        [3, 5],
        [1, 7],
        [4, 5],
      ][step];
      const els: El[] = [
        line(v(-1, 2.6), v(7, 2.6), { ext: 0.2 }),
        line(v(-1, 0), v(7, 0), { ext: 0.2 }),
        par(v(0, 2.6), v(0.8, 2.6), 1, "muted"),
        par(v(0, 0), v(0.8, 0), 1, "muted"),
        line(sub(P2, mul(u, 1.4)), add(P1, mul(u, 1.4)), { tone: "b", ext: 0.1 }),
        txt(v(7.4, 2.6), "d₁", "e", { tone: "muted" }),
        txt(v(7.4, 0), "d₂", "e", { tone: "muted" }),
      ];
      [P1, P2].forEach((P, k) =>
        quad(P).forEach(([p, q], i) => {
          const n = k * 4 + i + 1;
          const on = pairs.includes(n);
          els.push(
            ang(P, p, q, String(n), {
              r: 26,
              tone: on ? (n === pairs[0] ? "a" : "c") : "muted",
              fill: on,
            }),
          );
        }),
      );
      const [x, y] = pairs;
      return {
        els,
        readout: [
          step === 3
            ? `${vals[(x - 1) % 4]}° + ${vals[(y - 1) % 4]}° = 180°`
            : `${x}. açı = ${y}. açı = ${vals[(x - 1) % 4]}°`,
        ],
      };
    },
  },
  "Bilinmeyen ile istenen ölçüyü ayır": {
    caption:
      "Üç durum, üç farklı denklem: ilişkinin adı denklemi seçer. Son adımda x'i sorulan ifadeye geri koymayı unutma.",
    alt: "Adımlara göre değişen şekil: tümler iki açı, paraleller arasında aynı yan iç açılar, kesişen doğrularda ters açılar; açılar cebirsel ifadelerle etiketli.",
    steps: ["Tümler", "Aynı yan iç açılar", "Ters açılar"],
    draw: (_, step) => {
      if (step === 0) {
        const O = v(0, 0);
        return {
          els: [
            seg(O, v(3, 0)),
            seg(O, v(0, 3)),
            seg(O, pol(3, 28), { tone: "b" }),
            right(O, v(1, 0), v(0, 1), "muted"),
            ang(O, v(1, 0), pol(1, 28), "x", { r: 60, fill: true }),
            ang(O, pol(1, 28), v(0, 1), "2x + 6", { r: 44, fill: true, tone: "b" }),
          ],
          readout: ["x + (2x + 6) = 90 ⇒ x = 28", "Açılar 28° ve 62°"],
        };
      }
      if (step === 1) {
        const t = 70;
        const u = pol(1, t);
        const P2 = v(2, 0);
        const P1 = add(P2, mul(u, 2.6 / Math.sin((t * Math.PI) / 180)));
        return {
          els: [
            line(v(-0.5, 2.6), v(5.5, 2.6), { ext: 0.2 }),
            line(v(-0.5, 0), v(5.5, 0), { ext: 0.2 }),
            par(v(0, 2.6), v(0.8, 2.6), 1, "muted"),
            par(v(0, 0), v(0.8, 0), 1, "muted"),
            line(sub(P2, mul(u, 1)), add(P1, mul(u, 1)), { tone: "b", ext: 0.1 }),
            ang(P1, add(P1, v(1, 0)), sub(P1, u), "3x + 10", { fill: true, r: 30 }),
            ang(P2, add(P2, v(1, 0)), add(P2, u), "2x + 20", { fill: true, r: 30, tone: "c" }),
          ],
          readout: ["(3x + 10) + (2x + 20) = 180 ⇒ x = 30", "Açılar 100° ve 80°"],
        };
      }
      const O = v(0, 0);
      return {
        els: [
          line(v(-3, 0), v(3, 0), { ext: 0.2 }),
          line(pol(3, 273), pol(3, 93), { ext: 0.2 }),
          ang(O, v(1, 0), pol(1, 93), "4x − 7", { fill: true, r: 34 }),
          ang(O, v(-1, 0), pol(1, 273), "3x + 18", { fill: true, r: 34 }),
          ang(O, pol(1, 93), v(-1, 0), "?", { fill: true, r: 26, tone: "b" }),
        ],
        readout: ["4x − 7 = 3x + 18 ⇒ x = 25", "Ters açı 93°, istenen komşu 180° − 93° = 87°"],
      };
    },
  },
  "Kendi çözümünü kısa bir gerekçeyle denetle": {
    caption:
      "Bu iki doğru paralel işaretlenmemiştir ve gerçekten paralel değildir: yöndeş konumdaki açılar 48° ve 60°. Paralellik verilmeden yöndeş eşitlik yazılamaz.",
    alt: "Paralel olmayan iki doğruyu kesen bir doğru; üst kesişimde 48°, alt kesişimde 60° yöndeş konumda.",
    draw: () => {
      const t = 60;
      const u = pol(1, t);
      const P2 = v(2, 0);
      const P1 = add(P2, mul(u, 3));
      const top = rot(v(1, 0), 12);
      return {
        els: [
          line(sub(P1, mul(top, 3)), add(P1, mul(top, 3)), { ext: 0.1 }),
          line(v(-1, 0), v(6, 0), { ext: 0.1 }),
          line(sub(P2, mul(u, 1)), add(P1, mul(u, 1)), { tone: "b", ext: 0.1 }),
          ang(P1, add(P1, top), add(P1, u), "48°", { fill: true, r: 32, tone: "warn" }),
          ang(P2, add(P2, v(1, 0)), add(P2, u), "60°", { fill: true, r: 32 }),
        ],
        readout: ["Yöndeş konumda ama 48° ≠ 60°: doğrular paralel değil"],
      };
    },
  },
  "Koşul değiştiğinde çözüm yolunu değiştir": {
    caption:
      "Paraleller arasındaki kırık yolda E'deki açıyı bulmak için E'den paralellere paralel yardımcı doğru çiz. Açı iki iç ters parçaya ayrılır: 40° + 30° = 70°.",
    alt: "Paralel iki doğru ve aralarında E köşeli kırık yol; ikinci adımda E'den geçen kesikli paralel, üçüncü adımda 40° ve 30° parçaları.",
    steps: ["Kırık yol", "E'den paralel çiz", "Parçaları taşı"],
    draw: (_, step) => {
      const E = v(3.2, 1.6);
      const A1 = meet(E, add(E, pol(1, 140)), v(0, 3), v(1, 3));
      const B1 = meet(E, add(E, pol(1, 210)), v(0, 0), v(1, 0));
      const els: El[] = [
        line(v(-1, 3), v(6, 3), { ext: 0.2 }),
        line(v(-1, 0), v(6, 0), { ext: 0.2 }),
        par(v(5, 3), v(5.6, 3), 1, "muted"),
        par(v(5, 0), v(5.6, 0), 1, "muted"),
        seg(A1, E, { bold: true }),
        seg(E, B1, { bold: true }),
        ang(A1, E, v(6, 3), "40°", { tone: "b", fill: true, r: 30 }),
        ang(B1, v(6, 0), E, "30°", { tone: "c", fill: true, r: 30 }),
        pt(E, "E", "e"),
      ];
      if (step >= 1) els.push(line(sub(E, v(3, 0)), add(E, v(2.6, 0)), { dash: true, tone: "a", ext: 0.1 }));
      if (step >= 2)
        els.push(
          ang(E, A1, sub(E, v(1, 0)), "40°", { tone: "b", fill: true, r: 40 }),
          ang(E, sub(E, v(1, 0)), B1, "30°", { tone: "c", fill: true, r: 58 }),
        );
      else els.push(ang(E, A1, B1, "?", { tone: "a", r: 40 }));
      return { els, readout: step >= 2 ? ["∠E = 40° + 30° = 70°"] : undefined };
    },
  },
};

export const geometryFigures032b: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-paralelkenar-ozel-dortgenler-032": paralelkenar,
  "tyt-geo-dik-prizmalar-032": dikPrizmalar,
  "tyt-geo-piramitler-032": piramitler,
  "tyt-geo-acilar-kaynak-pekitirme-032": kaynakPekistirme,
};

