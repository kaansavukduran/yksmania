import {
  add,
  dim,
  dist,
  fmt,
  lerp,
  line,
  meet,
  mid,
  mul,
  par,
  poly,
  pt,
  right,
  rot,
  seg,
  sub,
  ticks,
  txt,
  v,
  vec,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";

const labelAll = (
  ps: V[],
  names: string[],
  dirs: ("n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw")[],
) => ps.map((p, i) => pt(p, names[i], dirs[i]));
const triArea = (a: V, b: V, c: V) =>
  Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;

/** Coordinate grid with labeled integer ticks; equal unit on both axes. */
export function axes(x0: number, x1: number, y0: number, y1: number, every = 1): El[] {
  const els: El[] = [];
  for (let x = Math.ceil(x0); x <= x1; x++)
    if (x !== 0) els.push(seg(v(x, y0), v(x, y1), { tone: "muted", thin: true, dash: true }));
  for (let y = Math.ceil(y0); y <= y1; y++)
    if (y !== 0) els.push(seg(v(x0, y), v(x1, y), { tone: "muted", thin: true, dash: true }));
  els.push(
    vec(v(x0, 0), v(x1 + 0.6, 0), { tone: "muted" }),
    vec(v(0, y0), v(0, y1 + 0.6), { tone: "muted" }),
    txt(v(x1 + 0.6, 0), "x", "se", { small: true, tone: "muted", soft: true }),
    txt(v(0, y1 + 0.6), "y", "ne", { small: true, tone: "muted", soft: true }),
  );
  for (let x = Math.ceil(x0); x <= x1; x += every)
    if (x !== 0) els.push(txt(v(x, 0), String(x), "s", { small: true, tone: "muted", soft: true }));
  for (let y = Math.ceil(y0); y <= y1; y += every)
    if (y !== 0) els.push(txt(v(0, y), String(y), "w", { small: true, tone: "muted", soft: true }));
  return els;
}
const xy = (p: V) => `(${fmt(p[0], 2)}; ${fmt(p[1], 2)})`;

const alan: Record<string, FigureDef> = {
  "Alan, kaplanan bölgenin ölçüsüdür": {
    caption:
      "4 × 7 dikdörtgen 28 birim kareyle kaplanır: alan 28 cm². Çevre ise sınırın uzunluğudur: 4 + 7 + 4 + 7 = 22 cm. İkisi farklı ölçülerdir.",
    alt: "Birim karelere bölünmüş 7'ye 4 dikdörtgen; iç bölge boyalı ve 28 kare görülebiliyor, sınır kalın çizgiyle.",
    draw: () => {
      const cells: El[] = [];
      for (let x = 1; x < 7; x++) cells.push(seg(v(x, 0), v(x, 4), { thin: true, tone: "muted" }));
      for (let y = 1; y < 4; y++) cells.push(seg(v(0, y), v(7, y), { thin: true, tone: "muted" }));
      return {
        els: [
          poly([v(0, 0), v(7, 0), v(7, 4), v(0, 4)], { fill: "b", tone: "a", bold: true }),
          ...cells,
          dim(v(0, 0), v(7, 0), "7 cm", v(0, 4)),
          dim(v(7, 0), v(7, 4), "4 cm", v(0, 0)),
        ],
        readout: ["Alan: 4 · 7 = 28 cm²", "Çevre: 2(4 + 7) = 22 cm"],
      };
    },
  },
  "Parçaları taşırken hangi işlemler alanı korur?": {
    caption:
      "Üçgeni iki kenarın orta noktalarından kes ve üst parçayı orta nokta etrafında 180° döndür. Parça büyümez, boşluk ya da örtüşme oluşmaz: alan aynı kalır, şekil paralelkenar olur.",
    alt: "Üçgen, orta tabanından kesilip üst küçük üçgen 180° döndürülerek yandaki boşluğa yerleştiriliyor; sonuç bir paralelkenar.",
    steps: ["Üçgen", "Orta tabandan kes", "Üst parçayı döndür"],
    draw: (_, step) => {
      const A = v(2, 4);
      const B = v(0, 0);
      const C = v(6, 0);
      const D = mid(A, B);
      const E = mid(A, C);
      const els: El[] = [];
      if (step === 0) els.push(poly([A, B, C], { fill: "b" }));
      if (step >= 1) els.push(poly([D, B, C, E], { fill: "b" }));
      if (step === 1) els.push(poly([A, D, E], { fill: "a", tone: "a" }), seg(D, E, { tone: "a", dash: true }));
      if (step === 2) {
        const A2 = rot(A, 180, E);
        const D2 = rot(D, 180, E);
        els.push(
          poly([A, D, E], { tone: "muted", dash: true, thin: true }),
          poly([A2, D2, E], { fill: "a", tone: "a" }),
          pt(E, "E", "e"),
        );
      }
      els.push(ticks(A, D, 1), ticks(D, B, 1), ticks(A, E, 2), ticks(E, C, 2));
      return { els, readout: step === 2 ? ["Alan: 6·4/2 = 12 = 6·2 (paralelkenar)"] : undefined };
    },
  },
  "Paralelkenarda alan: eğikliği değil dik uzaklığı kullan": {
    caption:
      "Tabanı 10, yüksekliği 4 tutup üst kenarı kaydır: yan kenar ve çevre değişir, alan hep 10 · 4 = 40 kalır.",
    alt: "Tabanı 10 olan paralelkenar; üst kenar sürgüyle yatay kayıyor, iki paralel doğru arasındaki dik uzaklık 4 sabit.",
    param: { label: "Üst kenarı kaydır", min: -3, max: 6, step: 0.5, init: 3 },
    draw: (s) => {
      const A = v(0, 0);
      const B = v(10, 0);
      const D = v(s, 4);
      const C = v(s + 10, 4);
      const side = dist(A, D);
      return {
        els: [
          line(v(-3.4, 4), v(16.4, 4), { tone: "muted", thin: true, dash: true, ext: 0 }),
          line(v(-3.4, 0), v(16.4, 0), { tone: "muted", thin: true, dash: true, ext: 0 }),
          poly([A, B, C, D], { fill: "b" }),
          seg(D, v(s, 0), { tone: "a", dash: true }),
          right(v(s, 0), s < 10 ? B : A, D, "a"),
          ...(s !== 0 ? [dim(v(s, 0), D, "4", s > 0 ? A : B, "a")] : []),
          dim(A, B, "10", D),
          dim(A, D, s === 0 ? "4 (yan kenar = yükseklik)" : fmt(side, 2), s < 0 ? v(-20, 2) : B),
        ],
        readout: [`Alan = 10 · 4 = 40`, `Yan kenar ≈ ${fmt(side, 2)} · Çevre ≈ ${fmt(20 + 2 * side, 2)}`],
      };
    },
  },
  "Kenarortay ve ağırlık merkezinde eş alanlar": {
    caption:
      "Alanı 72 olan üçgende üç kenarortay altı eş alanlı parça oluşturur: her biri 12. Parçaların biçimleri farklıdır, alanları aynıdır.",
    alt: "Üç kenarortayıyla altı parçaya bölünmüş üçgen; her parçanın içine 12 yazılmış, parçalar sırayla iki renkte.",
    draw: () => {
      const A = v(2, 6);
      const B = v(0, 0);
      const C = v(8, 0);
      const G = mul(add(add(A, B), C), 1 / 3);
      const [Ma, Mb, Mc] = [mid(B, C), mid(C, A), mid(A, B)];
      const parts: [V, V][] = [
        [A, Mc],
        [Mc, B],
        [B, Ma],
        [Ma, C],
        [C, Mb],
        [Mb, A],
      ];
      return {
        els: [
          ...parts.map(([p, q], i) => poly([G, p, q], { fill: i % 2 ? "b" : "c", thin: true })),
          poly([A, B, C]),
          seg(A, Ma),
          seg(B, Mb),
          seg(C, Mc),
          ...parts.map(([p, q]) => txt(mul(add(add(G, p), q), 1 / 3), "12", "c", { small: true, bold: true })),
          pt(G, "G", "e", "a"),
        ],
        readout: ["72 / 6 = 12"],
      };
    },
  },
  "Benzerlikte uzunluk oranı ile alan oranını ayır": {
    caption:
      "2 × 6 ve 3 × 4 dikdörtgenlerin alanları 12'dir ama kenar oranları farklıdır: 2/6 ≠ 3/4. Eş alan, benzerlik demek değildir.",
    alt: "Yan yana iki dikdörtgen: biri 2'ye 6, diğeri 3'e 4; ikisinin de içinde 12 yazıyor.",
    draw: () => {
      const r1: V[] = [v(0, 0), v(6, 0), v(6, 2), v(0, 2)];
      const r2: V[] = [v(8, 0), v(12, 0), v(12, 3), v(8, 3)];
      return {
        els: [
          poly(r1, { fill: "b" }),
          poly(r2, { fill: "a" }),
          txt(v(3, 1), "12", "c", { bold: true }),
          txt(v(10, 1.5), "12", "c", { bold: true }),
          dim(r1[0], r1[1], "6", r1[3]),
          dim(r1[1], r1[2], "2", r1[0]),
          dim(r2[0], r2[1], "4", r2[3]),
          dim(r2[1], r2[2], "3", r2[0]),
        ],
        readout: ["Alanlar eşit, biçimler benzer değil"],
      };
    },
  },
  "Paralelkenarı bölen doğrularda alan ilişkileri": {
    caption:
      "O'yu AC köşegeni üzerinde kaydır. O'dan kenarlara paralel çizilen doğruların oluşturduğu DNOM ve KBLO paralelkenarlarının alanları her konumda eşittir.",
    alt: "ABCD paralelkenarı ve AC köşegeni üzerindeki O noktası; O'dan kenarlara paraleller, köşegenin iki yanındaki iki küçük paralelkenar renkli.",
    param: { label: "O'nun AC üzerindeki yeri", min: 0.15, max: 0.85, step: 0.05, init: 0.4 },
    draw: (t) => {
      const A = v(0, 0);
      const B = v(7, 0);
      const D = v(2, 4);
      const C = add(B, sub(D, A));
      const O = lerp(A, C, t);
      // Line through O parallel to AB meets AD at N and BC at L.
      const N = meet(O, add(O, sub(B, A)), A, D);
      const L = meet(O, add(O, sub(B, A)), B, C);
      // Line through O parallel to AD meets DC at M and AB at K.
      const M = meet(O, add(O, sub(D, A)), D, C);
      const K = meet(O, add(O, sub(D, A)), A, B);
      const area4 = (ps: V[]) => triArea(ps[0], ps[1], ps[2]) + triArea(ps[0], ps[2], ps[3]);
      return {
        els: [
          poly([D, N, O, M], { fill: "a", thin: true, tone: "a" }),
          poly([K, B, L, O], { fill: "b", thin: true, tone: "b" }),
          poly([A, B, C, D]),
          seg(A, C, { dash: true }),
          seg(N, L, { thin: true }),
          seg(M, K, { thin: true }),
          ...labelAll([A, B, C, D, O, N, L, M, K], ["A", "B", "C", "D", "O", "N", "L", "M", "K"], ["sw", "se", "ne", "nw", "se", "w", "e", "n", "s"]),
        ],
        readout: [`A(DNOM) ≈ ${fmt(area4([D, N, O, M]), 2)} · A(KBLO) ≈ ${fmt(area4([K, B, L, O]), 2)}`],
      };
    },
  },
};

const noktaninAnalitigi: Record<string, FigureDef> = {
  "Sayı doğrusundan sıralı ikiliye": {
    caption:
      "Önce yatay x kadar, sonra düşey y kadar git. (2; 5) ile (5; 2) aynı sayıları kullanır ama farklı noktalardır.",
    alt: "Koordinat düzleminde orijinden başlayan iki yol: biri 2 sağa 5 yukarı giderek P(2; 5)'e, diğeri 5 sağa 2 yukarı giderek Q(5; 2)'ye ulaşıyor.",
    draw: () => ({
      els: [
        ...axes(-1, 6, -1, 6),
        vec(v(0, 0), v(2, 0), { tone: "a" }),
        vec(v(2, 0), v(2, 5), { tone: "a" }),
        vec(v(0, 0.08), v(5, 0.08), { tone: "b", thin: true }),
        vec(v(5, 0), v(5, 2), { tone: "b" }),
        pt(v(2, 5), "P(2; 5)", "ne", "a"),
        pt(v(5, 2), "Q(5; 2)", "ne", "b"),
      ],
    }),
  },
  "Bölgeler, eksenler ve orijin": {
    caption:
      "t'yi değiştir: P(t − 1; 4 − t) noktası yalnız 1 < t < 4 iken I. bölgededir. t = 1 ya da t = 4 olduğunda nokta bir eksen üzerindedir, hiçbir bölgede değildir.",
    alt: "Dört bölgesi işaret çiftleriyle etiketli koordinat düzlemi ve t ile hareket eden P noktası.",
    param: { label: "t", min: -1, max: 6, step: 0.5, init: 2 },
    draw: (t) => {
      const P = v(t - 1, 4 - t);
      const region =
        P[0] === 0 || P[1] === 0
          ? P[0] === 0 && P[1] === 0
            ? "orijin"
            : P[1] === 0
              ? "x ekseni"
              : "y ekseni"
          : P[0] > 0
            ? P[1] > 0
              ? "I. bölge"
              : "IV. bölge"
            : P[1] > 0
              ? "II. bölge"
              : "III. bölge";
      return {
        els: [
          ...axes(-5, 5, -4, 5),
          txt(v(3, 4), "I (+; +)", "c", { small: true, tone: "b" }),
          txt(v(-3, 4), "II (−; +)", "c", { small: true, tone: "b" }),
          txt(v(-3, -3), "III (−; −)", "c", { small: true, tone: "b" }),
          txt(v(3, -3), "IV (+; −)", "c", { small: true, tone: "b" }),
          pt(P, `P${xy(P)}`, "ne", "a"),
        ],
        readout: [`t = ${fmt(t)}: P${xy(P)} → ${region}`],
      };
    },
  },
  "Bir eksene uzaklık: karşı koordinatın mutlak değeri": {
    caption:
      "P(−3; 2) için x eksenine uzaklık düşey yoldur: |y| = 2. y eksenine uzaklık yatay yoldur: |x| = 3. Eksenin adıyla aynı koordinatı seçme.",
    alt: "P(−3; 2) noktasından x eksenine düşey, y eksenine yatay kesikli dikmeler; uzunlukları 2 ve 3 olarak etiketli.",
    draw: () => {
      const P = v(-3, 2);
      return {
        els: [
          ...axes(-5, 3, -2, 4),
          seg(P, v(-3, 0), { tone: "a", bold: true }),
          seg(P, v(0, 2), { tone: "b", bold: true }),
          right(v(-3, 0), v(0, 0), P, "a"),
          right(v(0, 2), P, v(0, 0), "b"),
          dim(v(-3, 0), P, "|y| = 2", v(0, 1), "a"),
          dim(P, v(0, 2), "|x| = 3", v(-1, 0), "b"),
          pt(P, "P(−3; 2)", "nw"),
        ],
      };
    },
  },
  "İki nokta arası uzaklığı kur": {
    caption:
      "A(−2; −1), B(4; 7): yatay fark 6, düşey fark 8. Eksenlere paralel çizgilerle kurulan dik üçgenden |AB| = √(36 + 64) = 10. Kesikli köşeli yol 6 + 8 = 14 birimdir, daha uzundur.",
    alt: "Koordinat düzleminde A ve B noktaları; aralarındaki doğru parçası ve eksenlere paralel kenarlı dik üçgen, dik kenarları 6 ve 8.",
    draw: () => {
      const A = v(-2, -1);
      const B = v(4, 7);
      const K = v(4, -1);
      return {
        els: [
          ...axes(-3, 5, -2, 8, 2),
          poly([A, K, B], { fill: "a", thin: true, tone: "a" }),
          seg(A, B, { bold: true }),
          right(K, A, B, "a"),
          dim(A, K, "Δx = 6", B, "a"),
          dim(K, B, "Δy = 8", A, "a"),
          dim(A, B, "10", K),
          pt(A, "A(−2; −1)", "w"),
          pt(B, "B(4; 7)", "n"),
        ],
        readout: ["|AB| = √(6² + 8²) = 10", "Köşeli yol 6 + 8 = 14"],
      };
    },
  },
  "Bilinmeyen koordinatta tüm olasılıkları koru": {
    caption:
      "A(1; 4) ve B(5; 2)'ye eşit uzaklıktaki noktalar AB'nin orta dikmesindedir. x ekseni üzerinde olma koşulu bu doğrudan tek bir P(1,5; 0) seçer.",
    alt: "A ve B noktaları, AB'nin kesikli orta dikmesi ve bu dikmenin x eksenini kestiği P noktası; PA ve PB eşit çentikli.",
    draw: () => {
      const A = v(1, 4);
      const B = v(5, 2);
      const M = mid(A, B);
      const P = v(1.5, 0);
      const dir = rot(sub(B, A), 90);
      return {
        els: [
          ...axes(-1, 6, -1, 5),
          seg(A, B, { tone: "muted", thin: true }),
          line(sub(M, mul(dir, 0.35)), add(M, mul(dir, 0.28)), { dash: true, tone: "b", ext: 0.1 }),
          right(M, B, add(M, dir), "b"),
          seg(P, A, { tone: "a" }),
          seg(P, B, { tone: "a" }),
          ticks(P, A, 1, "a"),
          ticks(P, B, 1, "a"),
          pt(A, "A(1; 4)", "nw"),
          pt(B, "B(5; 2)", "ne"),
          pt(P, "P(1,5; 0)", "se", "a"),
        ],
        readout: ["(x − 1)² + 16 = (x − 5)² + 4 ⇒ 8x = 12 ⇒ x = 1,5"],
      };
    },
  },
  "Eksenlere göre yansıma": {
    caption:
      "A(3; 2)'nin x eksenine göre görüntüsü (3; −2), y eksenine göre (−3; 2), orijine göre (−3; −2) olur. Orijine göre simetri iki işareti birden değiştirir.",
    alt: "A(3; 2) ve üç görüntüsü: x eksenine, y eksenine ve orijine göre; görüntüleri A'ya bağlayan kesikli çizgiler.",
    draw: () => {
      const A = v(3, 2);
      const X = v(3, -2);
      const Y = v(-3, 2);
      const O = v(-3, -2);
      return {
        els: [
          ...axes(-4, 4, -3, 3),
          seg(A, X, { dash: true, tone: "b", thin: true }),
          seg(A, Y, { dash: true, tone: "c", thin: true }),
          seg(A, O, { dash: true, tone: "warn", thin: true }),
          pt(A, "A(3; 2)", "ne", "a"),
          pt(X, "(3; −2)", "se", "b"),
          pt(Y, "(−3; 2)", "nw", "c"),
          pt(O, "(−3; −2)", "sw", "warn"),
        ],
      };
    },
  },
  "Bir merkeze ve köşegen doğrularına göre simetri": {
    caption:
      "S(1; 1) merkezine göre A(4; 3)'ün görüntüsü A′(−2; −1): S, AA′'nün orta noktasıdır. y = x doğrusuna göre B(4; 1)'in görüntüsü B′(1; 4): koordinatlar yer değiştirir.",
    alt: "İlk adımda S merkezli simetri: A, S ve A′ aynı doğru üzerinde, S orta nokta. İkinci adımda y = x doğrusu ve B ile B′ bu doğruya göre simetrik.",
    steps: ["Merkeze göre", "y = x doğrusuna göre"],
    draw: (_, step) => {
      if (step === 0) {
        const S = v(1, 1);
        const A = v(4, 3);
        const A2 = v(-2, -1);
        return {
          els: [
            ...axes(-3, 5, -2, 4),
            seg(A, A2, { tone: "a" }),
            ticks(A, S, 1, "a"),
            ticks(S, A2, 1, "a"),
            pt(S, "S(1; 1)", "se", "b"),
            pt(A, "A(4; 3)", "ne"),
            pt(A2, "A′(−2; −1)", "sw", "a"),
          ],
          readout: ["A′ = (2·1 − 4; 2·1 − 3) = (−2; −1)"],
        };
      }
      const B = v(4, 1);
      const B2 = v(1, 4);
      const M = mid(B, B2);
      return {
        els: [
          ...axes(-1, 5, -1, 5),
          line(v(-0.5, -0.5), v(5, 5), { tone: "b", ext: 0.2 }),
          txt(v(5, 5), "y = x", "se", { tone: "b", small: true }),
          seg(B, B2, { dash: true, tone: "a" }),
          right(M, B2, v(5, 5), "a"),
          pt(B, "B(4; 1)", "e"),
          pt(B2, "B′(1; 4)", "w", "a"),
        ],
        readout: ["(x; y) → (y; x)"],
      };
    },
  },
  "Orta nokta ve eksik uç": {
    caption:
      "A(−2; 1), B(4; 5): orta nokta M((−2 + 4)/2; (1 + 5)/2) = M(1; 3). Yatay ve düşey değişimlerin yarısı ayrı ayrı alınır.",
    alt: "A ve B noktaları ve tam ortadaki M; AM ve MB eşit çentikli, yatay ve düşey değişimlerin yarıları kesikli.",
    draw: () => {
      const A = v(-2, 1);
      const B = v(4, 5);
      const M = v(1, 3);
      return {
        els: [
          ...axes(-3, 5, -1, 6),
          seg(A, B, { bold: true }),
          ticks(A, M, 1, "a"),
          ticks(M, B, 1, "a"),
          seg(A, v(1, 1), { dash: true, tone: "b", thin: true }),
          seg(v(1, 1), M, { dash: true, tone: "b", thin: true }),
          seg(M, v(4, 3), { dash: true, tone: "c", thin: true }),
          seg(v(4, 3), B, { dash: true, tone: "c", thin: true }),
          pt(A, "A(−2; 1)", "w"),
          pt(B, "B(4; 5)", "ne"),
          pt(M, "M(1; 3)", "nw", "a"),
        ],
        readout: ["Eksik uç: B = 2M − A = (2 − (−2); 6 − 1) = (4; 5)"],
      };
    },
  },
  "İçten bölmede ağırlıkların neden ters göründüğünü anla": {
    caption:
      "P'yi [AB] üzerinde kaydır: |AP| : |PB| = m : n iken P = A + (m/(m + n))(B − A). P'nin koordinatları her eksende iki ucun arasında kalır.",
    alt: "A(−3; −1) ile B(6; 5) arasındaki doğru parçası ve üzerinde kayan P noktası; AP ve PB iki renkte.",
    param: { label: "m / (m + n)", min: 0.1, max: 0.9, step: 0.05, init: 0.4 },
    draw: (t) => {
      const A = v(-3, -1);
      const B = v(6, 5);
      const P = lerp(A, B, t);
      return {
        els: [
          ...axes(-4, 7, -2, 6, 2),
          seg(A, P, { tone: "a", bold: true }),
          seg(P, B, { tone: "b", bold: true }),
          pt(A, "A(−3; −1)", "sw"),
          pt(B, "B(6; 5)", "nw"),
          pt(P, `P${xy(P)}`, "se", "a"),
        ],
        readout: [`AP : PB = ${fmt(t, 2)} : ${fmt(1 - t, 2)}`, `P = ${xy(P)}`],
      };
    },
  },
  "Oranla bölünen noktanın yönünü denetle": {
    caption: "A(−2; 1), B(7; 7). AP:PB oranında ilk sayıyı değiştir. İki uzunluğun toplamı AB, iki vektörün toplamı da A’dan B’ye değişimdir.",
    alt: "Koordinat düzleminde A ve B arasındaki doğru parçası iki renkle AP ve PB olarak ayrılmıştır. P her seçilen oranda doğru parçası üzerinde kalır.",
    param: { label: "AP’nin payı", min: 1, max: 5, step: 1, init: 1 },
    draw: (m) => {
      const n = 2;
      const A = v(-2, 1);
      const B = v(7, 7);
      const P = lerp(A, B, m / (m + n));
      const ap = sub(P, A);
      const pb = sub(B, P);
      return {
        els: [
          ...axes(-3, 8, -1, 8, 2),
          seg(A, P, { tone: "a", bold: true }),
          seg(P, B, { tone: "b", bold: true }),
          pt(A, "A(−2; 1)", "nw"),
          pt(B, "B(7; 7)", "ne"),
          pt(P, `P${xy(P)}`, "se", "a"),
        ],
        readout: [
          `AP : PB = ${m} : ${n}. A’nın katsayısı ${n}, B’nin katsayısı ${m}. P = ${xy(P)}.`,
          `AP = ${xy(ap)}, PB = ${xy(pb)}. İki vektör aynı yönde ve toplamları (9; 6).`,
        ],
      };
    },
  },
  "Dıştan bölme: eksi işaretinin geometrisi": {
    caption:
      "A(0; 0), B(4; 2) ve |AP| : |PB| = 3 : 1. m > n olduğundan P, B'nin ötesindedir: P = (3B − A)/2 = (6; 3).",
    alt: "A, B ve B'nin ötesinde aynı doğru üzerindeki P noktası; AP üç, PB bir parça olarak işaretli.",
    draw: () => {
      const A = v(0, 0);
      const B = v(4, 2);
      const P = v(6, 3);
      return {
        els: [
          ...axes(-1, 7, -1, 4),
          line(A, P, { tone: "muted", thin: true, ext: 0.5 }),
          seg(A, P, { tone: "a", bold: true }),
          seg(B, P, { tone: "b", bold: true }),
          dim(A, P, "3k", v(4, -1), "a"),
          dim(B, P, "k", v(6, 1), "b"),
          pt(A, "A(0; 0)", "se"),
          pt(B, "B(4; 2)", "se"),
          pt(P, "P(6; 3)", "nw", "a"),
        ],
        readout: ["|AP| = 3√5, |PB| = √5 ⇒ 3 : 1"],
      };
    },
  },
  "Oran tek başına noktanın yerini seçmez": {
    caption:
      "Q(8; 4) için |QA| : |QB| = 2 ama Q, AB doğrusu üzerinde değildir. Aynı 2 : 1 oranlı dış bölme noktası doğru üzerindeki P(12; 0)'dır. Oran, konumu tek başına seçmez.",
    alt: "A(0; 0), B(6; 0), doğrunun dışındaki Q(8; 4) ve doğru üzerindeki P(12; 0); QA ile QB, PA ile PB çizgileri.",
    draw: () => {
      const A = v(0, 0);
      const B = v(6, 0);
      const Q = v(8, 4);
      const P = v(12, 0);
      return {
        els: [
          ...axes(-1, 13, -1, 5, 2),
          seg(Q, A, { tone: "warn" }),
          seg(Q, B, { tone: "warn" }),
          seg(A, P, { tone: "b", bold: true }),
          pt(A, "A", "s"),
          pt(B, "B(6; 0)", "s"),
          pt(Q, "Q(8; 4)", "ne", "warn"),
          pt(P, "P(12; 0)", "n", "b"),
        ],
        readout: ["|QA| = 4√5, |QB| = 2√5 · doğru dışında", "|PA| = 12, |PB| = 6 · doğru üzerinde"],
      };
    },
  },
  "Üçgenin ağırlık merkezi ve 2:1 ilişkisi": {
    caption:
      "A(−3; −2), B(5; −1), C(1; 6) için G = ((−3 + 5 + 1)/3; (−2 − 1 + 6)/3) = G(1; 1). G, kenarortayı köşeden başlayarak 2 : 1 böler.",
    alt: "Koordinat düzleminde ABC üçgeni, C'den AB'nin orta noktasına kenarortay ve G(1; 1) ağırlık merkezi.",
    draw: () => {
      const A = v(-3, -2);
      const B = v(5, -1);
      const C = v(1, 6);
      const G = v(1, 1);
      const M = mid(A, B);
      return {
        els: [
          ...axes(-4, 6, -3, 7, 2),
          poly([A, B, C], { fill: "muted" }),
          seg(C, M, { tone: "a" }),
          dim(C, G, "2k", B, "a"),
          dim(G, M, "k", B, "a"),
          pt(A, "A(−3; −2)", "sw"),
          pt(B, "B(5; −1)", "se"),
          pt(C, "C(1; 6)", "n"),
          pt(M, "M", "s", "a"),
          pt(G, "G(1; 1)", "w", "a"),
        ],
      };
    },
  },
  "Orta noktanın şekillerdeki gücü": {
    caption:
      "Paralelkenarda köşegenler aynı orta noktayı paylaşır: A + C = B + D. A(0; 0), B(5; 1), C(7; 4) için D = A + C − B = (2; 3).",
    alt: "ABCD paralelkenarı ve köşegenlerin ortak orta noktası; dört köşenin koordinatları yazılı.",
    draw: () => {
      const A = v(0, 0);
      const B = v(5, 1);
      const C = v(7, 4);
      const D = v(2, 3);
      const O = mid(A, C);
      return {
        els: [
          ...axes(-1, 8, -1, 5, 2),
          poly([A, B, C, D], { fill: "b" }),
          seg(A, C, { dash: true }),
          seg(B, D, { dash: true }),
          par(A, B, 1),
          par(D, C, 1),
          pt(A, "A(0; 0)", "sw"),
          pt(B, "B(5; 1)", "se"),
          pt(C, "C(7; 4)", "ne"),
          pt(D, "D(2; 3)", "nw", "a"),
          pt(O, `(${fmt(O[0], 1)}; ${fmt(O[1], 1)})`, "e", "a"),
        ],
        readout: ["(A + C)/2 = (B + D)/2 = (3,5; 2)"],
      };
    },
  },
  "Alanı koordinattan geometriye geri bağla": {
    caption:
      "Üçgeni çevreleyen 6 × 5 dikdörtgenden üç dik üçgen çıkar: 30 − (6 + 6 + 5) = 13. Aynı sonuç 2S = |6·5 − 2·2| = 26 ile de bulunur.",
    alt: "A(1; 1), B(7; 3), C(3; 6) üçgeni; onu çevreleyen eksenlere paralel dikdörtgen ve köşelerde çıkarılan üç dik üçgen farklı renklerde.",
    draw: () => {
      const A = v(1, 1);
      const B = v(7, 3);
      const C = v(3, 6);
      return {
        els: [
          ...axes(-0.5, 8, -0.5, 7, 2),
          poly([v(1, 1), v(7, 1), v(7, 6), v(1, 6)], { tone: "muted", dash: true }),
          poly([A, v(7, 1), B], { fill: "c", thin: true, tone: "c" }),
          poly([B, v(7, 6), C], { fill: "b", thin: true, tone: "b" }),
          poly([C, v(1, 6), A], { fill: "a", thin: true, tone: "a" }),
          poly([A, B, C], { bold: true }),
          txt(v(5.6, 1.7), "6", "c", { small: true }),
          txt(v(5.8, 5), "6", "c", { small: true }),
          txt(v(1.7, 4.6), "5", "c", { small: true }),
          txt(mul(add(add(A, B), C), 1 / 3), "13", "c", { bold: true }),
          pt(A, "A(1; 1)", "sw"),
          pt(B, "B(7; 3)", "e"),
          pt(C, "C(3; 6)", "n"),
        ],
        readout: ["30 − 17 = 13", "2S = |(7 − 1)(6 − 1) − (3 − 1)(3 − 1)| = 26"],
      };
    },
  },
  "Öteleme: konumu değiştir, farkları koru": {
    caption:
      "Her köşeye aynı (−2; 3) vektörü eklenince üçgen kayar: kenar uzunlukları, açılar ve alan değişmez. Yalnız bir köşeyi taşımak bu korunumu vermez.",
    alt: "ABC üçgeni ve (−2; 3) kadar ötelenmiş A′B′C′ üçgeni; karşılık gelen köşeleri birleştiren üç eşit ok.",
    draw: () => {
      const tr: V = v(-2, 3);
      const P: V[] = [v(2, 0), v(6, 1), v(4, 3)];
      const Q = P.map((p) => add(p, tr));
      return {
        els: [
          ...axes(-1, 7, -1, 7, 2),
          poly(P, { fill: "b" }),
          poly(Q, { fill: "a", tone: "a" }),
          ...P.map((p, i) => vec(p, Q[i], { tone: "muted", thin: true })),
          ...labelAll(P, ["A", "B", "C"], ["s", "e", "e"]),
          ...labelAll(Q, ["A′", "B′", "C′"], ["w", "e", "n"]),
        ],
        readout: ["(x; y) → (x − 2; y + 3)"],
      };
    },
  },
};

export const geometryFiguresArea: Record<string, Record<string, FigureDef>> = {
  "alan-donusumleri": alan,
  "noktanin-analitigi": noktaninAnalitigi,
};

