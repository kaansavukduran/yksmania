import {
  add,
  ang,
  circle,
  dim,
  meet,
  mid,
  pol,
  poly,
  pt,
  right,
  seg,
  sub,
  txt,
  v,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";
import { prism, proj, pyramid, regularBase, type P3 } from "./solidKit";
import { radicalText203 } from "../geometryDepth203";
import {
  circleAngleRows206, circleAngleSection206, circleArcs206, fracText206, fracValue206, piText206,
  polygonRows206, polygonSection206, powerRows206, powerSignSection206, prismRows206, prismSection206,
  pyramidRows206, pyramidSection206, solidRows206, solidSection206, sup206,
} from "../geometryDepth206";

/*
 * 0.206.0 tablo bölümlerinin çizimleri. Her okuma ve etiket, tablo
 * satırlarını üreten aynı fonksiyonlardan gelir.
 */

/* ---------- Çemberde altı açı türü ---------- */

const R = 3;
const O = v(0, 0);
const onCircle = (deg: number): V => pol(R, deg, O);

const circleAngles: FigureDef = {
  caption: `AB yayı ${circleArcs206.ab}°, CD yayı ${circleArcs206.cd}°. Adımları değiştir: aynı yaylarla köşe merkeze, çembere, teğet noktasına, içeriye ve dışarıya taşınır.`,
  alt: "Çember üzerinde saat yönünde A, B, C, D noktaları. Üstte kalın AB yayı, altta kalın CD yayı. Her adımda açının köşesi farklı bir yerdedir: merkez, çember üstü, teğet noktası, iki kirişin kesişimi, iki kesenin dış kesişimi ve iki teğetin kesişimi.",
  steps: circleAngleRows206().map(({ kind }) => kind),
  draw: (_value, step) => {
    const { ab, cd } = circleArcs206;
    const rows = circleAngleRows206(ab, cd);
    const row = rows[step];
    const aDeg = 90 + ab / 2;
    const bDeg = 90 - ab / 2;
    const cDeg = 270 + cd / 2;
    const dDeg = 270 - cd / 2;
    const [A, B, C, D] = [aDeg, bDeg, cDeg, dDeg].map(onCircle);
    const arc = (from: number, to: number) =>
      Array.from({ length: 33 }, (_, i) => onCircle(from + ((to - from) * i) / 32));
    const label = `${row.value}°`;
    const els: El[] = [
      circle(O, R, { tone: "ink" }),
      poly(arc(bDeg, aDeg), { open: true, tone: "b", bold: true }),
    ];
    const points: El[] = [pt(A, "A", "nw"), pt(B, "B", "ne")];
    const withCD = () => {
      els.push(poly(arc(dDeg, cDeg), { open: true, tone: "c", bold: true }));
      points.push(pt(C, "C", "se"), pt(D, "D", "sw"));
    };
    if (step === 0) {
      els.push(seg(O, A, { tone: "a" }), seg(O, B, { tone: "a" }), ang(O, B, A, label, { tone: "a" }));
      points.push(pt(O, "O", "s"));
    } else if (step === 1) {
      const X = onCircle(270);
      els.push(seg(X, A, { tone: "a" }), seg(X, B, { tone: "a" }), ang(X, B, A, label, { tone: "a", r: 40 }));
      points.push(pt(X, "X", "s", "a"));
    } else if (step === 2) {
      // Teğet A’da OA’ya diktir; saat yönünde AB yayına doğru giden ışın.
      const t = (aDeg * Math.PI) / 180;
      const dir: V = [Math.sin(t), -Math.cos(t)];
      const T1 = add(A, [dir[0] * 3, dir[1] * 3]);
      const T0 = sub(A, [dir[0] * 1.5, dir[1] * 1.5]);
      els.push(
        seg(T0, T1, { tone: "warn" }),
        seg(A, B, { tone: "a" }),
        seg(O, A, { tone: "muted", thin: true, dash: true }),
        right(A, O, T1, "muted"),
        ang(A, B, T1, label, { tone: "a", r: 40 }),
      );
      points.push(pt(O, "O", "s"));
    } else if (step === 3) {
      withCD();
      const P = meet(A, C, B, D);
      els.push(seg(A, C, { tone: "a" }), seg(B, D, { tone: "a" }), ang(P, B, A, label, { tone: "a" }));
      points.push(pt(P, "P", "w", "a"));
    } else if (step === 4) {
      withCD();
      const Q = meet(A, D, B, C);
      els.push(seg(Q, A, { tone: "a" }), seg(Q, B, { tone: "a" }), ang(Q, B, A, label, { tone: "a", r: 44 }));
      points.push(pt(Q, "Q", "s", "a"));
    } else {
      // A ve B’deki teğetler simetri ekseni üzerinde kesişir.
      const T = v(0, R / Math.cos(((ab / 2) * Math.PI) / 180));
      els.push(
        seg(T, A, { tone: "warn" }),
        seg(T, B, { tone: "warn" }),
        seg(O, A, { tone: "muted", thin: true, dash: true }),
        seg(O, B, { tone: "muted", thin: true, dash: true }),
        right(A, O, T, "muted"),
        right(B, O, T, "muted"),
        ang(T, A, B, label, { tone: "a", r: 36 }),
      );
      points.push(pt(O, "O", "s"), pt(T, "T", "n", "a"));
    }
    return {
      els: [...els, ...points],
      readout: [
        `${row.kind}: köşe ${row.vertex.charAt(0).toLocaleLowerCase("tr-TR")}${row.vertex.slice(1)}.`,
        `${row.formula} = ${row.value}° (AB = ${ab}°, CD = ${cd}°).`,
      ],
    };
  },
};

/* ---------- Küreyi saran silindir ---------- */

const solids: FigureDef = {
  caption: "Ön görünüş: küre silindirin iki tabanına ve yan yüzüne değer, koninin tepesi üst tabanın merkezindedir. Adımla bir cismi vurgula, sürgüyle yarıçapı değiştir.",
  alt: "Kenarları 2r olan kare kesit içinde yarıçapı r olan daire ve tabanı alt kenar, tepesi üst kenarın ortası olan üçgen. Seçilen cisim renkle vurgulanır.",
  steps: ["Silindir", "Küre", "Koni"],
  param: { label: "Yarıçap r", min: 1, max: 6, step: 1, init: 3, unit: " cm" },
  draw: (r, step) => {
    const [row] = solidRows206([r]);
    const s = 2;
    const L = -s;
    const Rx = s;
    const bottom = -s;
    const top = s;
    const box = [v(L, bottom), v(Rx, bottom), v(Rx, top), v(L, top)];
    const cone = [v(L, bottom), v(Rx, bottom), v(0, top)];
    const els: El[] = [
      poly(box, step === 0 ? { tone: "a", fill: "a", bold: true } : { tone: "ink" }),
      circle(O, s, step === 1 ? { tone: "b", fill: "b", bold: true } : { tone: "ink" }),
      poly(cone, step === 2 ? { tone: "c", fill: "c", bold: true } : { tone: "muted", dash: true }),
      seg(O, v(0, bottom), { tone: "ink", thin: true }),
      txt(mid(O, v(0, bottom)), `r = ${row.r}`, "e", { small: true }),
      dim(v(Rx, bottom), v(Rx, top), `h = ${row.h}`, 1),
      dim(v(L, bottom), v(Rx, bottom), `2r = ${2 * row.r}`, -1),
      pt(O, "O", "sw"),
    ];
    const volumes = [row.cylinder, row.sphere, row.cone];
    const names = ["Silindir", "Küre", "Koni"];
    return {
      els,
      readout: [
        `${names[step]} hacmi ${piText206(volumes[step])} cm³.`,
        `Koni : küre : silindir = ${piText206(row.cone)} : ${piText206(row.sphere)} : ${piText206(row.cylinder)} = 1 : ${fracValue206(row.sphere) / fracValue206(row.cone)} : ${fracValue206(row.cylinder) / fracValue206(row.cone)}.`,
        `Küre yüzeyi ${piText206(row.sphereArea)} = silindir yanal alanı ${piText206(row.cylinderLateral)}. Silindir toplam alanı ${piText206(row.cylinderTotal)} cm².`,
      ],
    };
  },
};

/* ---------- Üç sayı doğrusunda 2ⁿ, (−2)ⁿ, −2ⁿ ---------- */

const powerLines: FigureDef = {
  caption: "Üç sayı doğrusu aynı n üssünü üç ifadeye uygular. n’yi değiştir: (−2)ⁿ yalnız tek n’de sola geçer, −2ⁿ her zaman soldadır.",
  alt: "Alt alta üç sayı doğrusu: 2ⁿ, (−2)ⁿ ve −2ⁿ. Her doğruda 0 ortada, uçlarda ±2ⁿ büyüklüğü işaretli. Her ifadenin değeri bir noktayla gösterilir.",
  param: { label: "Üs n", min: -3, max: 4, step: 1, init: 3 },
  draw: (n) => {
    const [row] = powerRows206([n]);
    const half = 3;
    const gap = 1.7;
    const magnitude = fracValue206(row.positive);
    const lines = [
      { name: `2${sup206(n)}`, value: row.positive, tone: "a" as const },
      { name: `(−2)${sup206(n)}`, value: row.negativeBase, tone: "b" as const },
      { name: `−2${sup206(n)}`, value: row.outsideMinus, tone: "c" as const },
    ];
    const els: El[] = [];
    lines.forEach(({ name, value, tone }, i) => {
      const y = -i * gap;
      const x = (fracValue206(value) / magnitude) * half;
      els.push(
        seg(v(-half - 0.4, y), v(half + 0.4, y), { tone: "ink", thin: true }),
        seg(v(0, y - 0.12), v(0, y + 0.12), { tone: "ink" }),
        seg(v(-half, y - 0.12), v(-half, y + 0.12), { tone: "muted" }),
        seg(v(half, y - 0.12), v(half, y + 0.12), { tone: "muted" }),
        txt(v(0, y - 0.15), "0", "s", { small: true, tone: "muted" }),
        txt(v(-half - 0.6, y), name, "w", { tone, bold: true }),
        pt(v(x, y), fracText206(value), "n", tone),
      );
    });
    return {
      els,
      readout: [
        `n = ${n} (${row.parity}): 2${sup206(n)} = ${fracText206(row.positive)}, (−2)${sup206(n)} = ${fracText206(row.negativeBase)}, −2${sup206(n)} = ${fracText206(row.outsideMinus)}.`,
        row.parity === "çift" ? "Üs çift: (−2)ⁿ = 2ⁿ, ikisi sağda." : "Üs tek: (−2)ⁿ = −2ⁿ, ikisi solda.",
        n < 0 ? `Negatif üs: 1/(−2)${sup206(-n)}, işaret yine tek–çiftliğe bağlı.` : "−2ⁿ’de eksi üssün dışında: sonuç hep negatif.",
      ],
    };
  },
};

/* ---------- Düzgün n-gende açılar ve köşegenler ---------- */

const polygonFigure: FigureDef = {
  caption: "Kenar sayısını değiştir. İlk adım bir köşeden üçgenlere ayırır, ikinci adım düzgün çokgenin iç ve dış açısını, üçüncü adım bütün köşegenleri gösterir.",
  alt: "Düzgün çokgen. Birinci adımda bir köşeden çizilen köşegenler ve oluşan üçgenler, ikinci adımda bir köşede iç açı ile kenar uzantısındaki dış açı, üçüncü adımda bütün köşegenler.",
  steps: ["Bir köşeden üçgenler", "İç ve dış açı", "Bütün köşegenler"],
  param: { label: "Kenar sayısı n", min: 3, max: 12, step: 1, init: 6 },
  draw: (n, step) => {
    const [row] = polygonRows206([n]);
    const ps = regularBase(n, 3, -90 - 180 / n).map(([x, y]) => v(x, y));
    const els: El[] = [];
    if (step === 0) {
      for (let i = 1; i < n - 1; i++)
        els.push(poly([ps[0], ps[i], ps[i + 1]], { fill: i % 2 ? "a" : "b", tone: "muted", thin: true }));
      for (let i = 2; i < n - 1; i++) els.push(seg(ps[0], ps[i], { tone: "a", bold: true }));
    } else if (step === 2) {
      for (let i = 0; i < n; i++)
        for (let j = i + 2; j < n; j++)
          if (!(i === 0 && j === n - 1)) els.push(seg(ps[i], ps[j], { tone: "b", thin: true }));
    }
    els.push(poly(ps, { tone: "ink", bold: true }));
    if (step === 1) {
      // Alt kenar P₀P₁; P₁’de kenar uzantısı ile sonraki kenar arasındaki dış açı.
      const [P0, P1, P2] = ps;
      const ext = add(P1, sub(P1, P0));
      els.push(
        seg(P1, ext, { tone: "warn", dash: true }),
        ang(P1, ext, P2, `${row.exterior}°`, { tone: "warn", r: 44 }),
        ang(P1, P2, P0, `${row.interior}°`, { tone: "a", r: 30 }),
      );
    }
    els.push(pt(ps[step === 1 ? 1 : 0], step === 1 ? "B" : "A", step === 1 ? "se" : "sw"));
    const readouts = [
      [`${row.name}: bir köşeden ${row.fromVertex} köşegen, ${row.triangles} üçgen.`, `İç açılar toplamı ${row.triangles} · 180° = ${row.interiorSum}°.`],
      [`Düzgünse dış açı 360° / ${n} = ${row.exterior}°.`, `İç açı 180° − ${row.exterior}° = ${row.interior}°.`],
      [`Toplam köşegen ${n} · ${row.fromVertex} / 2 = ${row.diagonals}.`, "Her köşegen iki ucundan sayıldığı için 2’ye bölünür."],
    ];
    return { els, readout: readouts[step] };
  },
};

/* ---------- Dik prizma satırları ---------- */

const prismFigure: FigureDef = {
  caption: "Tablonun her satırı bir adımdır. Üst taban renklidir; ölçüler ayrıtların yanında, beş değer çizimin altındadır.",
  alt: "Seçilen dik prizma eğik izdüşümle çizilmiştir: küp, kare dik prizma, dikdörtgenler prizması ve dik üçgen prizma. Görünmeyen ayrıtlar kesiklidir.",
  steps: prismRows206().map(({ name }) => name),
  draw: (_value, step) => {
    const row = prismRows206()[step];
    const { a, b } = row.base;
    const base: [number, number][] = row.base.kind === "rect" ? [[0, 0], [a, 0], [a, b], [0, b]] : [[0, 0], [a, 0], [0, b]];
    const { vs, els } = prism(base, row.h, { fills: { 1: "b" } });
    const n = base.length;
    const center = proj([a / 3, row.h / 2, b / 3]);
    return {
      els: [
        ...els,
        dim(proj(vs[0]), proj(vs[1]), `${a}`, center),
        dim(proj(vs[n - 1]), proj(vs[0]), `${b}`, center),
        dim(proj(vs[0]), proj(vs[n]), `h = ${row.h}`, center),
      ],
      readout: [
        `B = ${row.B} cm², p = ${row.p} cm.`,
        `Yanal ${row.p} · ${row.h} = ${row.lateral} cm². Toplam 2 · ${row.B} + ${row.lateral} = ${row.total} cm².`,
        `Hacim ${row.B} · ${row.h} = ${row.volume} cm³.`,
      ],
    };
  },
};

/* ---------- Kare piramit satırları ---------- */

const pyramidFigure: FigureDef = {
  caption: "Tablonun her satırı bir adımdır. h tepeden merkeze, ℓ tepeden kenarın ortasına, e tepeden köşeye gider.",
  alt: "Düzgün kare piramit: tepe T, taban merkezi O, bir kenarın orta noktası M ve bir köşe A. TO kesikli dik yükseklik, TM yan yüz yüksekliği, TA yan ayrıt.",
  steps: pyramidRows206().map(({ a, h }) => `a = ${a}, h = ${h}`),
  draw: (_value, step) => {
    const row = pyramidRows206()[step];
    const half = row.a / 2;
    const base = regularBase(4, half * Math.SQRT2, -135);
    const T: P3 = [0, row.h, 0];
    const Oc: P3 = [0, 0, 0];
    const A: P3 = [base[0][0], 0, base[0][1]];
    const B: P3 = [base[1][0], 0, base[1][1]];
    const C: P3 = [base[2][0], 0, base[2][1]];
    const M: P3 = [(A[0] + B[0]) / 2, 0, (A[2] + B[2]) / 2];
    const { els } = pyramid(base, T, { fills: { 0: "muted" } });
    return {
      els: [
        ...els,
        seg(proj(T), proj(Oc), { tone: "a", dash: true }),
        seg(proj(Oc), proj(M), { tone: "muted", thin: true }),
        seg(proj(T), proj(M), { tone: "b", bold: true }),
        seg(proj(T), proj(A), { tone: "c", bold: true }),
        txt(mid(proj(T), proj(Oc)), "h", "e", { small: true, tone: "a" }),
        txt(mid(proj(T), proj(M)), "ℓ", "e", { small: true, tone: "b" }),
        txt(mid(proj(T), proj(A)), "e", "w", { small: true, tone: "c" }),
        dim(proj(B), proj(C), `a = ${row.a}`, proj(Oc)),
        pt(proj(T), "T", "n"),
        pt(proj(Oc), "O", "ne"),
        pt(proj(M), "M", "s"),
        pt(proj(A), "A", "sw"),
      ],
      readout: [
        `ℓ = √(${row.h}² + ${row.inradius}²) = ${row.slant}, e = √(${row.h}² + ${row.a ** 2 / 2}) = ${radicalText203(row.edge)}.`,
        `Yanal 2 · ${row.a} · ${row.slant} = ${row.lateral}, toplam ${row.base} + ${row.lateral} = ${row.total} cm².`,
        `Hacim ${row.base} · ${row.h} / 3 = ${row.volume} cm³; prizma ${row.prismVolume} cm³ = 3 · ${row.volume}.`,
      ],
    };
  },
};

export const geometryFiguresDepth206: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-cember-aci-040": { [circleAngleSection206.title]: circleAngles },
  "tyt-geo-silindir-koni-kure-040": { [solidSection206.title]: solids },
  "uslu-sayilar": { [powerSignSection206.title]: powerLines },
  "tyt-geo-cokgenler-032": { [polygonSection206.title]: polygonFigure },
  "tyt-geo-dik-prizmalar-032": { [prismSection206.title]: prismFigure },
  "tyt-geo-piramitler-032": { [pyramidSection206.title]: pyramidFigure },
};
