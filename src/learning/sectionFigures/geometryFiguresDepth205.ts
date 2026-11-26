import {
  add,
  circle,
  dim,
  foot,
  lerp,
  line,
  meet,
  mid,
  mul,
  poly,
  pt,
  right,
  seg,
  span,
  sub,
  ticks,
  txt,
  unit,
  v,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";
import {
  centerRows205,
  centerSection205,
  centerVertices205,
  decimalText205,
  euclidRows205,
  euclidSection205,
  fracText205,
  fracValue205,
  quadPropertyTests205,
  quadRows205,
  quadSection205,
  similarityBase205,
  similarityRows205,
  similaritySection205,
  trapezoidRows205,
  trapezoidSection205,
  triangleCenters205,
  type CenterPoint205,
} from "../geometryDepth205";
import { radicalText203 } from "../geometryDepth203";

/*
 * 0.205.0 tablo bölümlerinin çizimleri. Bütün koordinatlar, etiketler ve
 * okumalar tabloyu üreten aynı veri fonksiyonlarından gelir.
 */

const P = (p: readonly [number, number]): V => v(p[0], p[1]);
const Q = (c: CenterPoint205): V => v(fracValue205(c.x), fracValue205(c.y));

/* ---------- Dört merkez ---------- */

const cSides = triangleCenters205().sides;
const centerName = [cSides.c, cSides.a, cSides.b].sort((x, y) => x - y).join("–");
const corner = (name: keyof typeof centerVertices205) => `${name}(${centerVertices205[name].join("; ")})`;
const centerSteps = ["G: kenarortaylar", "I: iç açıortaylar", "H: yükseklikler", "O: orta dikmeler", "Euler doğrusu"];
const centerFigure: FigureDef = {
  caption:
    `${centerName} üçgeninde her adım bir merkezi kuran üç doğruyu çizer. Son adımda O, G ve H’nin aynı doğru üzerinde olduğunu gör.`,
  alt: `Köşeleri ${corner("B")}, ${corner("C")}, ${corner("A")} olan üçgen. Adım adım kenarortaylar ve G, açıortaylar ve iç teğet çemberiyle I, yükseklikler ve H, orta dikmeler ve çevrel çemberiyle O; son adımda O, G, H’den geçen Euler doğrusu.`,
  steps: centerSteps,
  draw: (_, step) => {
    const c = triangleCenters205();
    const rows = centerRows205();
    const A = P(centerVertices205.A);
    const B = P(centerVertices205.B);
    const C = P(centerVertices205.C);
    const [G, I, H, O] = [c.G, c.I, c.H, c.O].map(Q);
    const els: El[] = [poly([A, B, C])];
    const corners: [V, V, V][] = [[A, B, C], [B, C, A], [C, A, B]];
    let readout: string[] = [];
    if (step === 0) {
      for (const [X, Y, Z] of corners) {
        const M = mid(Y, Z);
        els.push(seg(X, M, { tone: "a" }), ticks(Y, M, 1, "a"), ticks(M, Z, 1, "a"));
      }
      els.push(pt(G, "G", "e", "a"));
      readout = [rows[0].pointText, rows[0].equal];
    } else if (step === 1) {
      for (const [X, Y, Z] of corners) {
        const D = meet(X, add(X, add(unit(sub(Y, X)), unit(sub(Z, X)))), Y, Z);
        els.push(seg(X, D, { tone: "b" }));
      }
      const r = fracValue205(c.inradius);
      const F = foot(I, B, C);
      els.push(
        circle(I, r, { tone: "b", dash: true }),
        seg(I, F, { tone: "b", thin: true }),
        right(F, C, I, "b"),
        txt(mid(I, F), `r = ${fracText205(c.inradius)}`, "e", { small: true, tone: "b" }),
        pt(I, "I", "ne", "b"),
      );
      readout = [rows[1].pointText, rows[1].equal];
    } else if (step === 2) {
      for (const [X, Y, Z] of corners) {
        const F = foot(X, Y, Z);
        els.push(seg(X, F, { tone: "c" }), right(F, Z, X, "c"));
      }
      els.push(pt(H, "H", "w", "c"));
      readout = [rows[2].pointText, rows[2].equal];
    } else if (step === 3) {
      for (const [, Y, Z] of corners) {
        const M = mid(Y, Z);
        const n = unit(sub(O, M));
        els.push(seg(M, add(O, mul(n, 1)), { tone: "warn" }), right(M, Z, O, "warn"));
      }
      els.push(
        circle(O, fracValue205(c.circumradius), { tone: "warn", dash: true }),
        seg(O, A, { tone: "warn", thin: true }),
        txt(mid(O, A), `R = ${fracText205(c.circumradius)}`, "e", { small: true, tone: "warn" }),
        pt(O, "O", "e", "warn"),
      );
      readout = [rows[3].pointText, rows[3].equal];
    } else {
      els.push(
        line(O, H, { tone: "muted", dash: true, ext: 3 }),
        pt(H, "H", "sw", "c"),
        pt(G, "G", "n", "a"),
        pt(O, "O", "se", "warn"),
      );
      readout = [
        `${rows[3].pointText}, ${rows[0].pointText}, ${rows[2].pointText}`,
        `GH = ${fracText205(c.eulerRatio)} · OG`,
      ];
    }
    els.push(pt(A, "A", "n"), pt(B, "B", "sw"), pt(C, "C", "se"));
    return { els, readout };
  },
};

/* ---------- Benzerlik oranı ---------- */

const simRows = similarityRows205();
const similarityFigure: FigureDef = {
  caption:
    `Kesikli çizgi ${[...similarityBase205.legs, similarityBase205.hypotenuse].join("–")} başlangıç üçgenidir. k’yi seç: bütün kenarlar ve yükseklik k ile, alan k² ile çarpılır.`,
  alt: "Dik açısı A’da olan başlangıç üçgeni kesikli; aynı A köşesinden k oranında büyütülmüş ya da küçültülmüş benzer üçgen dolu, kenar uzunlukları ve hipotenüse ait yükseklik etiketli.",
  steps: simRows.map(({ k }) => `k = ${fracText205(k)}`),
  draw: (_, step) => {
    const row = simRows[step];
    const k = fracValue205(row.k);
    const [p, q] = similarityBase205.legs;
    const A = v(0, 0);
    const B = v(0, p * k);
    const C = v(q * k, 0);
    const F = foot(A, B, C);
    const [ab, ac, bc] = row.sides.map(decimalText205);
    const els: El[] = [];
    if (k !== 1) els.push(poly([A, v(0, p), v(q, 0)], { tone: "muted", dash: true }));
    els.push(
      poly([A, B, C], { fill: "a" }),
      right(A, C, B),
      seg(A, F, { tone: "b" }),
      right(F, C, A, "b"),
      dim(A, B, ab, C),
      dim(A, C, ac, B),
      dim(B, C, bc, A),
      txt(lerp(A, F, 0.35), "h", "se", { small: true, tone: "b" }),
      pt(A, "A", "sw"),
      pt(B, "B", "n"),
      pt(C, "C", "e"),
    );
    return {
      els,
      readout: [
        `k = ${fracText205(row.k)}: kenarlar ${row.sides.map(decimalText205).join(" – ")}`,
        `Çevre ${decimalText205(row.perimeter)}, oran ${fracText205(row.k)}`,
        `Alan ${decimalText205(row.area)}, oran ${fracText205(row.areaRatio)}`,
        `Hipotenüse ait yükseklik h = ${decimalText205(row.height)}, oran ${fracText205(row.k)}`,
      ],
    };
  },
};

/* ---------- Öklid ---------- */

const euRows = euclidRows205();
const euclidFigure: FigureDef = {
  caption:
    "Hipotenüs BC yatay çizildi. A’dan inen AH yüksekliği BC’yi p ve q parçalarına ayırır; her üçgende h² = p·q.",
  alt: "A köşesi dik olan ABC üçgeni; BC tabanı yatay, A’dan BC’ye inen AH dikmesi. AB, AC, BH = p, HC = q ve AH = h uzunlukları etiketli.",
  steps: euRows.map(({ ab, ac, bc }) => `${ab}–${ac}–${bc}`),
  draw: (_, step) => {
    const row = euRows[step];
    const p = fracValue205(row.p);
    const h = fracValue205(row.h);
    const B = v(0, 0);
    const C = v(row.bc, 0);
    const H = v(p, 0);
    const A = v(p, h);
    return {
      els: [
        poly([A, B, C]),
        seg(A, H, { tone: "a" }),
        right(H, C, A, "a"),
        right(A, B, C),
        dim(B, A, String(row.ab), C),
        dim(A, C, String(row.ac), B),
        dim(B, H, `p = ${fracText205(row.p)}`, A, "b"),
        dim(H, C, `q = ${fracText205(row.q)}`, A, "c"),
        txt(mid(A, H), `h = ${fracText205(row.h)}`, "e", { small: true, tone: "a" }),
        pt(A, "A", "n"),
        pt(B, "B", "w"),
        pt(C, "C", "e"),
        pt(H, "H", "n", "a"),
      ],
      readout: [
        `p = ${row.ab}²/${row.bc} = ${fracText205(row.p)}, q = ${row.ac}²/${row.bc} = ${fracText205(row.q)}`,
        `h = ${row.ab}·${row.ac}/${row.bc} = ${fracText205(row.h)}`,
        `h² = ${fracText205(row.h2)} = p·q`,
      ],
    };
  },
};

/* ---------- Dörtgen ailesi ---------- */

const qRows = quadRows205();
const quadFigure: FigureDef = {
  caption:
    "Tablodaki dört örnek dörtgen. Köşegenler kesikli; dik kesişme, 90° köşe ve eş kenar işaretleri yalnız o özellik sağlandığında görünür.",
  alt: "Seçilen örnek dörtgen ve iki köşegeni. Eş kenarlar çentikle, dik köşeler ve köşegenlerin dik kesişimi dik açı işaretiyle gösterilir.",
  steps: qRows.map(({ name }) => name),
  draw: (_, step) => {
    const row = qRows[step];
    const [A, B, C, D] = row.vertices.map(P);
    const labels = quadPropertyTests205.map(({ label }) => label);
    const has = (label: string) => row.holds[labels.indexOf(label)];
    const O = mid(A, C);
    const els: El[] = [
      poly([A, B, C, D], { fill: "a" }),
      seg(A, C, { tone: "b", dash: true }),
      seg(B, D, { tone: "b", dash: true }),
    ];
    if (has("Bütün kenarlar eş")) {
      for (const [X, Y] of [[A, B], [B, C], [C, D], [D, A]] as [V, V][]) els.push(ticks(X, Y, 1));
    } else if (has("Karşı kenarlar eş")) {
      els.push(ticks(A, B, 1), ticks(C, D, 1), ticks(B, C, 2), ticks(D, A, 2));
    }
    if (has("Bütün açılar 90°"))
      els.push(right(A, B, D), right(B, C, A), right(C, D, B), right(D, A, C));
    if (has("Köşegenler dik")) els.push(right(O, C, D, "b"));
    els.push(pt(O, undefined, "s", "b"), pt(A, "A", "sw"), pt(B, "B", "se"), pt(C, "C", "ne"), pt(D, "D", "nw"));
    const yes = row.holds.filter(Boolean).length;
    return {
      els,
      readout: [
        `${row.name}: ${yes} / ${labels.length} özellik`,
        `Köşegenler ${row.diagonals.map(radicalText203).join(" ve ")}`,
        `Alan ${fracText205(row.area)} birim²`,
      ],
    };
  },
};

/* ---------- İkizkenar yamuk ---------- */

const tzRows = trapezoidRows205();
const trapezoidFigure: FigureDef = {
  caption:
    "Kesikli çizgi, yan kenarların orta noktalarını birleştiren orta tabandır: uzunluğu iki tabanın ortalaması, alan orta taban çarpı yüksekliktir.",
  alt: "AB alt, DC üst taban olan ikizkenar yamuk; yan kenarların orta noktalarını birleştiren kesikli orta taban, D’den inen yükseklik ve taban, yükseklik, yan kenar uzunlukları etiketli.",
  steps: tzRows.map(({ a, c }) => `${a} ve ${c}`),
  draw: (_, step) => {
    const row = tzRows[step];
    const d = fracValue205(row.overhang);
    const A = v(0, 0);
    const B = v(row.a, 0);
    const C = v(row.a - d, row.h);
    const D = v(d, row.h);
    const E = mid(A, D);
    const F = mid(B, C);
    const K = v(d, 0);
    const gap = row.a * 0.08;
    return {
      els: [
        poly([A, B, C, D], { fill: "a" }),
        seg(E, F, { tone: "b", dash: true, bold: true }),
        seg(D, K, { tone: "c", thin: true }),
        right(K, B, D, "c"),
        ticks(A, D, 1),
        ticks(B, C, 1),
        dim(A, B, `a = ${row.a}`, D),
        dim(D, C, `c = ${row.c}`, A),
        dim(B, C, radicalText203(row.leg), A),
        ...span(v(-gap, 0), v(-gap, row.h), `h = ${row.h}`, B, "c"),
        txt(lerp(E, F, 0.75), `m = ${decimalText205(row.median)}`, "n", { small: true, tone: "b" }),
        pt(A, "A", "sw"),
        pt(B, "B", "se"),
        pt(C, "C", "ne"),
        pt(D, "D", "nw"),
      ],
      readout: [
        `m = (${row.a} + ${row.c})/2 = ${decimalText205(row.median)}`,
        `Alan = ${decimalText205(row.median)} · ${row.h} = ${decimalText205(row.area)}`,
        `Yan kenar = √(${decimalText205(row.overhang)}² + ${row.h}²) = ${radicalText203(row.leg)}`,
      ],
    };
  },
};

export const geometryFiguresDepth205: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-ucgen-merkezleri-031": { [centerSection205.title]: centerFigure },
  "tyt-geo-eslik-benzerlik-031": { [similaritySection205.title]: similarityFigure },
  "tyt-geo-dik-ucgen-031": { [euclidSection205.title]: euclidFigure },
  "tyt-geo-paralelkenar-ozel-dortgenler-032": { [quadSection205.title]: quadFigure },
  "tyt-geo-yamuk-deltoid-032": { [trapezoidSection205.title]: trapezoidFigure },
};
