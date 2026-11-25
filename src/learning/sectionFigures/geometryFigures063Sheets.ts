import {
  add,
  ang,
  angleAt,
  centroid,
  circle,
  dim,
  dist,
  fmt,
  foot,
  incenter,
  lerp,
  line,
  meet,
  mid,
  mul,
  pol,
  poly,
  pt,
  rad,
  right,
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

/*
 * Forge063: four TYT Geometri cheat sheets (right triangles, triangle centres,
 * triangle area, rectangle) taught as original interactive figures. Every
 * number is the drawing's own and is recomputed from its coordinates; the
 * sheets' wording and examples are not reused. Each entry replaces the earlier
 * figure of the same section and keeps that figure's first state as step 0.
 */

const tri = (A: V, B: V, C: V, fill?: "a" | "b" | "c" | "muted") => poly([A, B, C], { fill });
const anchor = (p: V): El => txt(p, "", "c");
/** Apex of a triangle on base B(0,0)–C(base,0) with the given base angles. */
function fromAngles(base: number, b: number, c: number): [V, V, V] {
  const B = v(0, 0);
  const C = v(base, 0);
  const A = meet(B, pol(1, b), C, pol(1, 180 - c, C));
  return [A, B, C];
}
const sinD = (d: number) => Math.sin(rad(d));
const cosD = (d: number) => Math.cos(rad(d));

/* ───────────── 004 Dik üçgenler ───────────── */

const dikUcgen: Record<string, FigureDef> = {
  "Ters Pisagor ve ölçünün gerçekliği": {
    caption:
      "İki kenar 12 ve 16 sabit; üçüncü kenarı değiştir. Yalnız c² = 12² + 16² = 400 iken c'nin karşısındaki açı 90° olur. Daha kısa c dar, daha uzun c geniş açı verir: eşitlik dikliği sınar, dikliği kendisi varsaymaz. 5–12–13 ve 8–15–17 aileleri de aynı sınavdan geçer.",
    alt: "Kenarları 12 ve 16 sabit olan üçgen; üçüncü kenar c sürgüyle 6'dan 26'ya değişiyor, aradaki açı c = 20 iken dik açı işaretiyle gösteriliyor.",
    param: { label: "Üçüncü kenar c", min: 6, max: 26, step: 1, init: 20 },
    draw: (c) => {
      const cosG = (144 + 256 - c * c) / 384;
      const g = (Math.acos(Math.max(-1, Math.min(1, cosG))) * 180) / Math.PI;
      const A = v(0, 0);
      const B = v(16, 0);
      const C = v(12 * cosG, 12 * Math.sin(Math.acos(cosG)));
      const isRight = c === 20;
      const verdict =
        c * c < 400
          ? `c² < 400 ⇒ A açısı dar (≈ ${fmt(g)}°); Pisagor uygulanmaz`
          : isRight
            ? "c² = 400 ⇒ A = 90°; 12–16–20 = 4 · (3–4–5)"
            : `c² > 400 ⇒ A açısı geniş (≈ ${fmt(g)}°); Pisagor uygulanmaz`;
      return {
        els: [
          anchor(v(-9.2, -1.6)),
          anchor(v(16.6, 12.6)),
          tri(A, B, C, "muted"),
          seg(B, C, { tone: "a", bold: true }),
          isRight ? right(A, B, C, "a") : ang(A, B, C, `${fmt(g)}°`, { tone: "a", r: 26 }),
          dim(A, B, "16", C),
          dim(C, A, "12", B),
          dim(B, C, `c = ${c}`, A, "a"),
          pt(A, "A", "sw"),
          pt(B, "B", "se"),
          pt(C, "C", "n"),
        ],
        readout: [`12² + 16² = 400 · c² = ${c * c}`, verdict],
      };
    },
  },
  "Özel üçgenler: açı hangi kenarın karşısında?": {
    caption:
      "Adım 1: 45°–45°–90° üçgeninde kenarlar a, a, a√2; 30°–60°–90° üçgeninde 30° karşısı a, 60° karşısı a√3, hipotenüs 2a. Adım 2: kenarı 8 olan eşkenar üçgen yüksekliğiyle iki 30°–60°–90° üçgenine ayrılır: 4, 4√3, 8. Adım 3: verilen kenar 60°'nin karşısındaysa önce a√3 = 6 çözülür.",
    alt: "Üç adım: iki özel dik üçgen yan yana; kenarı 8 olan eşkenar üçgen ve ortadan indirilen yükseklik; 60° karşısı 6 olan 30°–60°–90° üçgeni.",
    steps: ["İki özel üçgen", "Eşkenarı ortadan böl", "60° karşısı verilirse"],
    draw: (_, step) => {
      if (step === 1) {
        const B = v(0, 0);
        const C = v(8, 0);
        const A = v(4, 4 * Math.sqrt(3));
        const H = v(4, 0);
        return {
          els: [
            tri(A, B, H, "b"),
            tri(A, B, C),
            seg(A, H, { tone: "a" }),
            right(H, C, A, "a"),
            ticks(B, H, 1),
            ticks(H, C, 1),
            ang(A, B, H, "30°", { tone: "b", r: 34 }),
            ang(B, H, A, "60°", { tone: "c" }),
            dim(B, H, "4", A, "b"),
            dim(A, B, "8", H),
            dim(H, A, "4√3", B, "a"),
            pt(A, "A", "n"),
            pt(B, "B", "sw"),
            pt(C, "C", "se"),
            pt(H, "H", "s"),
          ],
          readout: ["Yarım taban 4: 30°'nin karşısı, hipotenüs 8'in yarısı", "Yükseklik √(64 − 16) = √48 = 4√3: 60°'nin karşısı"],
        };
      }
      if (step === 2) {
        const S = v(0, 0);
        const T = v(6, 0);
        const U = v(0, 2 * Math.sqrt(3));
        return {
          els: [
            tri(S, T, U, "muted"),
            right(S, T, U),
            ang(U, S, T, "60°", { fill: true, tone: "c" }),
            ang(T, U, S, "30°", { fill: true, tone: "b", r: 40 }),
            dim(S, T, "6", U, "c"),
            dim(U, S, "2√3", T, "b"),
            dim(T, U, "4√3", S, "a"),
          ],
          readout: ["60° karşısı a√3 = 6 ⇒ a = 6/√3 = 2√3", "Hipotenüs 2a = 4√3; “yarısı” kuralı yalnız 30° karşısı için"],
        };
      }
      const P = v(0, 0);
      const Q = v(3, 0);
      const R = v(0, 3);
      const S = v(5, 0);
      const T = v(5 + 2 * Math.sqrt(3), 0);
      const U = v(5, 2);
      return {
        els: [
          tri(P, Q, R),
          right(P, Q, R),
          ang(Q, R, P, "45°", { fill: true }),
          ang(R, P, Q, "45°", { fill: true }),
          dim(P, Q, "a", R),
          dim(R, P, "a", Q),
          dim(Q, R, "a√2", P, "a"),
          tri(S, T, U),
          right(S, T, U),
          ang(T, U, S, "30°", { fill: true, tone: "b", r: 40 }),
          ang(U, S, T, "60°", { fill: true, tone: "c" }),
          dim(U, S, "a", T, "b"),
          dim(S, T, "a√3", U, "c"),
          dim(T, U, "2a", S, "a"),
        ],
      };
    },
  },
  "Son kontrol: en uzun kenar, birim ve iki bağımsız eşitlik": {
    caption:
      "Adım 1: hipotenüsün orta noktası M üç köşeye eşit uzaklıktadır, AM = BC/2; aynı köşeden inen AH ayrı bir parçadır. Adım 2: dik kenarlar 20 ve 21 ise hipotenüs 41 değil 29'dur. Sonuç iki dik kenardan uzun, toplamlarından kısa olmalıdır.",
    alt: "İki adım: 6–8–10 dik üçgeninde hipotenüs ortasından geçen çember, kenarortay ve yükseklik; dik kenarları 20 ve 21 olan üçgende iki dik kenar boyunca yürüyen yol ile doğrudan hipotenüs.",
    steps: ["Kenarortay ve yükseklik ayrı", "Kenarlar toplanmaz"],
    draw: (_, step) => {
      if (step === 1) {
        const C = v(0, 0);
        const B = v(21, 0);
        const A = v(0, 20);
        return {
          els: [
            tri(A, B, C, "muted"),
            vec(A, C, { tone: "c", dash: true }),
            vec(C, B, { tone: "c", dash: true }),
            seg(A, B, { tone: "a", bold: true }),
            right(C, B, A),
            dim(A, C, "20", B, "c"),
            dim(C, B, "21", A, "c"),
            dim(B, A, "29", C, "a"),
            pt(A, "A", "n"),
            pt(B, "B", "se"),
            pt(C, "C", "sw"),
          ],
          readout: ["Dik kenarlar boyunca yol 20 + 21 = 41", "Doğrudan: √(400 + 441) = √841 = 29; 21 < 29 < 41"],
        };
      }
      const B = v(0, 0);
      const C = v(10, 0);
      const A = v(3.6, 4.8);
      const M = v(5, 0);
      const H = v(3.6, 0);
      return {
        els: [
          circle(M, 5, { dash: true, thin: true, tone: "muted" }),
          tri(A, B, C),
          right(A, B, C),
          seg(A, M, { tone: "a" }),
          seg(A, H, { tone: "b", dash: true }),
          right(H, C, A, "b"),
          ticks(B, M, 1, "a"),
          ticks(M, C, 1, "a"),
          pt(A, "A", "n"),
          pt(B, "B", "w"),
          pt(C, "C", "e"),
          pt(M, "M", "s", "a"),
          pt(H, "H", "s", "b"),
        ],
        readout: ["AM = BM = MC = 5", "AH = 4,8 ≠ AM"],
      };
    },
  },
};

const trigPicks = [
  {
    label: "B açısı",
    title: "B açısına göre: karşı AC, komşu BC",
    detail: [
      "sin B = 8/17, cos B = 15/17.",
      "tan B = 8/15, cot B = 15/8.",
      "Hipotenüs tan ve cot oranlarının hiçbirine girmez.",
    ],
  },
  {
    label: "A açısı",
    title: "A açısına göre: karşı BC, komşu AC",
    detail: [
      "sin A = 15/17, cos A = 8/17.",
      "tan A = 15/8, cot A = 8/15.",
      "A + B = 90° olduğundan sin A = cos B: tümler açıda oranlar yer değiştirir.",
    ],
  },
  {
    label: "Denetim",
    title: "Bir orandan üçgeni kur ve sına",
    detail: [
      "cos B = 15/17 verilirse komşu 15k, hipotenüs 17k al; karşı √(289 − 225)·k = 8k.",
      "sin² B + cos² B = (64 + 225)/289 = 1 sağlanmalı; sin ve cos 1'i aşamaz.",
      "“tan B = 8/17” yazmak hipotenüsü paydaya taşır; doğrusu 8/15.",
    ],
  },
];

const trig: Record<string, FigureDef> = {
  "Trigonometri sorusunu adım adım çöz": {
    caption:
      "8–15–17 dik üçgeninde bir dar açı seç: karşı ve komşu kenarın adı seçilen açıya göre değişir, hipotenüs aynı kalır. Denetim kartı, verilen bir orandan kenarları k ile kurmayı ve sin² + cos² = 1 sınamasını gösterir.",
    alt: "C köşesinde dik açılı ABC üçgeni; AC = 8, BC = 15, AB = 17. Seçilen açıya göre karşı ve komşu dik kenar ayrı biçimde vurgulanıyor.",
    picks: trigPicks,
    draw: (_, __, pick = -1) => {
      const C = v(0, 0);
      const B = v(15, 0);
      const A = v(0, 8);
      const els: El[] = [tri(A, B, C, "muted"), right(C, B, A)];
      if (pick === 0 || pick === 1) {
        const atB = pick === 0;
        els.push(
          seg(A, C, { tone: atB ? "a" : "b", bold: atB }),
          seg(C, B, { tone: atB ? "b" : "a", bold: !atB }),
          seg(A, B, { tone: "c", dash: true }),
          atB ? ang(B, C, A, "B", { fill: true, tone: "c", r: 40 }) : ang(A, B, C, "A", { fill: true, tone: "c", r: 30 }),
          dim(A, C, atB ? "karşı 8" : "komşu 8", B, atB ? "a" : "b"),
          dim(C, B, atB ? "komşu 15" : "karşı 15", A, atB ? "b" : "a"),
          dim(B, A, "hipotenüs 17", C, "c"),
        );
      } else {
        const k = pick === 2 ? "k" : "";
        els.push(
          seg(A, B, { tone: "c" }),
          dim(A, C, `8${k}`, B),
          dim(C, B, `15${k}`, A),
          dim(B, A, `17${k}`, C, "c"),
        );
      }
      els.push(pt(A), pt(B), pt(C, "C", "sw"), txt(A, "A", "n", { bold: true, pick: 1 }), txt(B, "B", "se", { bold: true, pick: 0 }), txt(v(11, 6.4), "denetim", "c", { small: true, pick: 2 }));
      const readout =
        pick === 0
          ? ["sin B = 8/17 · cos B = 15/17", "tan B = 8/15 · cot B = 15/8"]
          : pick === 1
            ? ["sin A = 15/17 · cos A = 8/17", "tan A = 15/8 · cot A = 8/15"]
            : pick === 2
              ? ["Karşı = √(17² − 15²)·k = 8k", "sin² B + cos² B = 64/289 + 225/289 = 1"]
              : ["Önce açıyı seç: karşı ve komşu ona göre adlanır"];
      return { els, readout };
    },
  },
};

/* ───────────── 009 Üçgende merkezler ───────────── */

const centerPicks = [
  {
    label: "I",
    title: "I: üç kenar doğrusuna eşit dik uzaklık",
    detail: [
      "Eş açı (açıortay) işareti seni I'ya götürür.",
      "Dik üçgende r = (a + b − c)/2; her üçgende alan = r·s.",
      "I her üçgende içeridedir.",
    ],
  },
  {
    label: "O",
    title: "O: üç köşeye eşit uzaklık",
    detail: [
      "Kenar ortasından çıkan dikme (orta dikme) seni O'ya götürür.",
      "Dik üçgende O hipotenüsün ortasıdır; geniş açılıda dışarı çıkar.",
      "2026 TYT Temel Matematik 35 mantığı: B'yi C'nin üstüne getiren kat çizgisi BC'nin orta dikmesidir.",
    ],
  },
  {
    label: "G",
    title: "G: köşe koordinatlarının ortalaması",
    detail: [
      "Eş parça (kenar ortası) işareti kenarortaya götürür.",
      "G kenarortayı köşeden başlayarak 2 : 1 böler; altı eş alan oluşur.",
      "G'nin köşelere ya da kenarlara eşit uzak olması gerekmez.",
    ],
  },
  {
    label: "H",
    title: "H: yüksekliklerin kesişimi",
    detail: [
      "Köşeden karşı kenar doğrusuna inen dikme yüksekliktir.",
      "Dik üçgende iki dik kenar birer yükseklik olduğundan H dik köşededir.",
      "Geniş açılıda yükseklik uzantıya iner ve H dışarıda kalır.",
    ],
  },
];

const ucgenMerkezleri: Record<string, FigureDef> = {
  "Merkez seçerken hangi bilgiye ihtiyacın var?": {
    caption:
      "Aynı 12–5–13 dik üçgeninde bir merkez seç: hangi çizgi ailesinin kesiştiği ve merkezin neye eşit uzak olduğu görünür. Eş açı → I, eş parça → G, köşeden dikme → H, kenar ortasından dikme → O. Dört merkez bu üçgende dört ayrı noktadır.",
    alt: "A(0; 0), B(12; 0), C(0; 5) dik üçgeni. Seçime göre iç teğet çember ve açıortaylar, çevrel çember ve orta dikmeler, kenarortaylar ya da yükseklikler çiziliyor.",
    picks: centerPicks,
    draw: (_, __, pick = -1) => {
      const A = v(0, 0);
      const B = v(12, 0);
      const C = v(0, 5);
      const I = v(2, 2);
      const O = v(6, 2.5);
      const G = v(4, 5 / 3);
      const els: El[] = [anchor(v(-1.2, -4.4)), anchor(v(12.9, 9.4)), tri(A, B, C, "muted"), right(A, B, C)];
      let readout: string[] = ["Bir merkez seç: çizgileri ve eşit uzaklığı görünür"];
      if (pick === 0) {
        const fs = [foot(I, B, C), foot(I, C, A), foot(I, A, B)];
        els.push(
          circle(I, 2, { tone: "b", thin: true }),
          ...[A, B, C].map((p) => seg(p, I, { tone: "muted", dash: true, thin: true })),
          ...fs.map((f) => seg(I, f, { tone: "b" })),
          right(fs[0], C, I, "b"),
        );
        readout = ["r = (12 + 5 − 13)/2 = 2 · I = (2; 2)", "Alan 30 = r·s = 2 · 15"];
      } else if (pick === 1) {
        els.push(
          circle(O, 6.5, { tone: "a", thin: true, dash: true }),
          seg(v(6, -0.8), v(6, 4.4), { tone: "a", thin: true }),
          seg(v(-0.8, 2.5), v(8, 2.5), { tone: "a", thin: true }),
          right(v(6, 0), B, v(6, 1), "a"),
          ticks(A, v(6, 0), 1, "a"),
          ticks(v(6, 0), B, 1, "a"),
        );
        readout = ["O = BC'nin ortası (6; 2,5)", "R = 13/2 = 6,5: OA = OB = OC"];
      } else if (pick === 2) {
        const Ma = mid(B, C);
        const Mb = mid(C, A);
        const Mc = mid(A, B);
        els.push(
          seg(A, Ma, { tone: "c" }),
          seg(B, Mb, { tone: "c", thin: true }),
          seg(C, Mc, { tone: "c", thin: true }),
          ticks(B, Ma, 1, "c"),
          ticks(Ma, C, 1, "c"),
        );
        readout = ["G = ((0 + 12 + 0)/3; (0 + 0 + 5)/3) = (4; 5/3)", "A'dan kenarortay 6,5 ⇒ AG = 13/3, GM = 13/6"];
      } else if (pick === 3) {
        const F = foot(A, B, C);
        els.push(
          seg(A, F, { tone: "warn" }),
          right(F, C, A, "warn"),
          seg(A, B, { tone: "warn", thin: true }),
          seg(A, C, { tone: "warn", thin: true }),
        );
        readout = ["AB ve AC zaten birer yükseklik: H = A = (0; 0)", "A'dan BC'ye yükseklik 12·5/13 = 60/13 ≈ 4,62"];
      }
      els.push(
        pt(I, undefined, "c", "b"),
        pt(O, undefined, "c", "a"),
        pt(G, undefined, "c", "c"),
        txt(I, "I", "nw", { tone: "b", bold: true, pick: 0 }),
        txt(O, "O", "ne", { tone: "a", bold: true, pick: 1 }),
        txt(G, "G", "s", { tone: "c", bold: true, pick: 2 }),
        txt(A, "H", "nw", { tone: "warn", bold: true, pick: 3 }),
        pt(A, "A", "sw"),
        pt(B, "B", "se"),
        pt(C, "C", "nw"),
      );
      return { els, readout };
    },
  },
  "İç merkez I: kenarlara eş dik uzaklık": {
    caption:
      "Adım 1: I'dan üç kenara inen dikmeler eşittir (r); I'nın köşelere uzaklıkları farklıdır. Adım 2: kenarları 12, 16, 20 olan üçgen I'dan üç parçaya ayrılır; her parçanın yüksekliği r = 4 olduğundan alan r·s = 4 · 24 = 96. Adım 3: A'ya karşı dış teğet çemberin merkezi de üç kenar doğrusuna eşit uzaktır ama dışarıdadır: rₐ = 24. Son iki adımda 6, 8 ve 10 kenarlı dik üçgenin iç ve A karşısındaki dış çemberini karşılaştır.",
    alt: "İç teğet çember, 12–16–20 dik üçgeninde alan ve dış çember, ardından 6–8–10 dik üçgeninde karşılaştırma. Çemberler kenar doğrularına dik parçalarla gösterilir.",
    steps: ["İç teğet çember", "Alan = r · s", "Dış teğet çember", "6–8–10: iç çember", "6–8–10: dış çember"],
    draw: (_, step) => {
      if (step >= 3) {
        const A = v(0, 0);
        const B = v(6, 0);
        const C = v(0, 8);
        const a = dist(B, C);
        const area = dist(A, B) * dist(A, C) / 2;
        const s = (a + dist(A, B) + dist(A, C)) / 2;
        const external = step === 4;
        const radius = area / (external ? s - a : s);
        const center = v(radius, radius);
        const tangent = foot(center, B, C);
        const onAB = foot(center, A, B);
        const onAC = foot(center, A, C);
        const centerLabel = external ? "Iₐ" : "I";
        return {
          els: [
            ...(external ? [seg(B, onAB, {dash: true}), seg(C, onAC, {dash: true})] : []),
            tri(A, B, C),
            circle(center, radius, {tone: "a"}),
            ...[onAB, onAC, tangent].flatMap((point) => [seg(center, point, {tone: "c", dash: true}), pt(point, undefined, "n", "c")]),
            pt(A, "A", "sw"), pt(B, "B", "se"), pt(C, "C", "nw"),
            pt(center, centerLabel, "ne", "a"),
          ],
          readout: [
            `Alan ${area} birim². Yarı çevre s = ${s}. ${external ? "rₐ = S / (s − a)" : "r = S / s"} = ${radius} birim.`,
            `${centerLabel} = (${radius}; ${radius}). BC’ye teğet noktası (${fmt(tangent[0])}; ${fmt(tangent[1])}).`,
            external ? "BC parçası ile AB ve AC uzantılarına teğet." : "Üç teğet noktası kenar parçalarının üzerinde.",
          ],
        };
      }
      if (step >= 1) {
        const A = v(0, 0);
        const B = v(16, 0);
        const C = v(0, 12);
        const I = v(4, 4);
        const fs = [foot(I, B, C), foot(I, C, A), foot(I, A, B)];
        if (step === 1)
          return {
            els: [
              tri(I, A, B, "a"),
              tri(I, B, C, "b"),
              tri(I, C, A, "c"),
              tri(A, B, C),
              right(A, B, C),
              ...fs.map((f) => seg(I, f, { tone: "muted", dash: true })),
              right(fs[2], B, I),
              dim(A, B, "16", C),
              dim(C, A, "12", B),
              dim(B, C, "20", A),
              pt(A, "A", "sw"),
              pt(B, "B", "se"),
              pt(C, "C", "n"),
              pt(I, "I", "ne"),
            ],
            readout: ["16·4/2 + 20·4/2 + 12·4/2 = 32 + 40 + 24 = 96", "r·s = 4 · 24 = 96 = 16·12/2"],
          };
        const E = v(24, 24);
        const T = foot(E, B, C);
        return {
          els: [
            circle(E, 24, { tone: "a", thin: true }),
            circle(I, 4, { tone: "b", thin: true }),
            seg(B, v(26.5, 0), { tone: "muted", dash: true }),
            seg(C, v(0, 26.5), { tone: "muted", dash: true }),
            tri(A, B, C, "muted"),
            seg(E, T, { tone: "a", dash: true }),
            seg(E, v(24, 0), { tone: "a", dash: true, thin: true }),
            seg(E, v(0, 24), { tone: "a", dash: true, thin: true }),
            right(T, C, E, "a"),
            line(A, E, { tone: "muted", thin: true, dash: true, ext: 0 }),
            pt(A, "A", "sw"),
            pt(B, "B", "s"),
            pt(C, "C", "w"),
            pt(I, "I", "ne", "b"),
            pt(E, "Iₐ", "ne", "a"),
          ],
          readout: [
            "İç: I = (4; 4), r = 4 · Dış: Iₐ = (24; 24), rₐ = 24",
            "BC doğrusu 3x + 4y = 48: (3·24 + 4·24 − 48)/5 = 24",
            "İkisi de kenar doğrularına eşit uzak; yalnız I içeride",
          ],
        };
      }
      const [A, B, C] = fromAngles(7, 64, 46);
      const I = incenter(A, B, C);
      const fs = [foot(I, B, C), foot(I, C, A), foot(I, A, B)];
      const r = dist(I, fs[0]);
      const a = angleAt(A, B, C);
      return {
        els: [
          circle(I, r, { tone: "b", thin: true }),
          tri(A, B, C),
          ...[A, B, C].map((p) => seg(I, p, { tone: "muted", dash: true, thin: true })),
          ...fs.map((f) => seg(I, f, { tone: "b" })),
          right(fs[0], C, I, "b"),
          right(fs[1], A, I, "b"),
          right(fs[2], B, I, "b"),
          ...fs.map((f) => ticks(I, f, 1, "b")),
          ang(I, C, B, `${fmt(90 + a / 2)}°`, { r: 22, tone: "a" }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(I, "I", "nw", "a"),
        ],
        readout: [`A = ${fmt(a)}° ⇒ ∠BIC = 90° + A/2 = ${fmt(90 + a / 2)}°`],
      };
    },
  },
  "Simetri ne zaman çizgileri ve merkezleri birleştirir?": {
    caption:
      "Tabanı 6 olan ikizkenar üçgende tepe açısını değiştir: dört merkez hep simetri ekseninde kalır ama yalnız 60°'de (eşkenar) tek noktada buluşur; o zaman R = 2√3, r = √3. 90°'de O tabanın (hipotenüsün) ortasına, H dik köşeye gelir; geniş açıda O ve H üçgenin dışına çıkar.",
    alt: "Tabanı 6 olan ikizkenar üçgen ve dikey simetri ekseni; eksen üzerindeki I, G, O, H noktaları sağdaki etiketlere ince çizgilerle bağlı.",
    param: { label: "Tepe açısı", min: 50, max: 130, step: 10, init: 60, unit: "°" },
    draw: (al) => {
      const h = 3 / Math.tan(rad(al / 2));
      const B = v(-3, 0);
      const C = v(3, 0);
      const A = v(0, h);
      const ys: [string, number, "a" | "b" | "c" | "warn"][] = [
        ["I", 3 * Math.tan(rad((180 - al) / 4)), "b"],
        ["G", h / 3, "c"],
        ["O", (h * h - 9) / (2 * h), "a"],
        ["H", 9 / h, "warn"],
      ];
      const lo = Math.min(0, ...ys.map((y) => y[1]));
      const hi = Math.max(h, ...ys.map((y) => y[1]));
      const els: El[] = [
        anchor(v(-3.6, -2.9)),
        anchor(v(5.6, 6.8)),
        tri(A, B, C, "muted"),
        seg(v(0, lo - 0.4), v(0, hi + 0.4), { tone: "muted", dash: true, thin: true }),
        pt(A, "A", al >= 90 ? "nw" : "n"),
        pt(B, "B", "s"),
        pt(C, "C", "s"),
      ];
      const same = ys.every((y) => Math.abs(y[1] - ys[0][1]) < 1e-9);
      if (same) {
        els.push(pt(v(0, ys[0][1]), undefined, "c", "a"), seg(v(0, ys[0][1]), v(3.8, ys[0][1]), { tone: "muted", thin: true }));
        els.push(txt(v(3.9, ys[0][1]), "I = G = O = H", "e", { tone: "a", bold: true }));
      } else {
        const sorted = [...ys].sort((p, q) => p[1] - q[1]);
        const gap = 0.9;
        let last = -Infinity;
        for (const [name, y, tone] of sorted) {
          const ly = Math.max(y, last + gap);
          last = ly;
          els.push(
            pt(v(0, y), undefined, "c", tone),
            seg(v(0, y), v(3.8, ly), { tone: "muted", thin: true }),
            txt(v(3.9, ly), name, "e", { tone, bold: true }),
          );
        }
      }
      const kind =
        al === 60
          ? "Eşkenar: I = G = O = H; R = 2√3, r = √3"
          : al === 90
            ? "Dik: O hipotenüsün ortasında, H dik köşe A'da"
            : al > 90
              ? "Geniş: O tabanın altında, H tepenin üstünde; I ve G içeride"
              : "Dar: dört merkez içeride, ama ayrı noktalarda";
      return {
        els,
        readout: [
          `Tabandan yükseklikler: I ≈ ${fmt(ys[0][1], 2)} · G ≈ ${fmt(ys[1][1], 2)} · O ≈ ${fmt(ys[2][1], 2).replace("-", "−")} · H ≈ ${fmt(ys[3][1], 2)}`,
          kind,
        ],
      };
    },
  },
  "Kenarortay ve ağırlık merkezi G": {
    caption:
      "Adım 1: üç kenarortay G'de kesişir, üçgeni eş alanlı altı parçaya böler ve her kenarortayı köşeden başlayarak 2 : 1 ayırır. Adım 2: koordinatta G köşelerin ortalamasıdır; A(−2; 1), B(7; 1), C(1; 7) için G = (2; 3) ve AG : GM = 2√5 : √5.",
    alt: "İki adım: altı parçası iki tonda boyalı ABC üçgeni ve kenarortaylar; koordinat ızgarasında A(−2; 1), B(7; 1), C(1; 7) üçgeni, BC'nin ortası M ve G(2; 3).",
    steps: ["Altı eş alan", "Koordinatta G"],
    draw: (_, step) => {
      if (step === 1) {
        const A = v(-2, 1);
        const B = v(7, 1);
        const C = v(1, 7);
        const G = centroid(A, B, C);
        const M = mid(B, C);
        return {
          els: [
            ...axes(-3, 8, -1, 8, 2),
            tri(A, B, C, "muted"),
            seg(A, M, { tone: "a" }),
            seg(B, mid(C, A), { thin: true }),
            seg(C, mid(A, B), { thin: true }),
            ticks(B, M, 1, "a"),
            ticks(M, C, 1, "a"),
            pt(A, "A", "w"),
            pt(B, "B", "e"),
            pt(C, "C", "n"),
            pt(M, "M", "ne", "a"),
            pt(G, "G", "nw", "a"),
          ],
          readout: ["G = ((−2 + 7 + 1)/3; (1 + 1 + 7)/3) = (2; 3)", "M = (4; 4) · AG = √20 = 2√5, GM = √5 ⇒ 2 : 1"],
        };
      }
      const A = v(2, 5);
      const B = v(0, 0);
      const C = v(7, 0);
      const G = centroid(A, B, C);
      const Ma = mid(B, C);
      const Mb = mid(C, A);
      const Mc = mid(A, B);
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
          tri(A, B, C),
          seg(A, Ma, { tone: "a" }),
          seg(B, Mb),
          seg(C, Mc),
          dim(A, G, "2k", C, "a"),
          dim(G, Ma, "k", C, "a"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(Ma, "M", "s", "a"),
          pt(G, "G", "e", "a"),
        ],
        readout: ["AG : GM = 2 : 1", "Altı parçanın alanı eşit"],
      };
    },
  },
};

/* ───────────── 013 Üçgende alan ───────────── */

const triArea = (a: V, b: V, c: V) =>
  Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;

const alan: Record<string, FigureDef> = {
  "Bir çözümün son denetimi: şekil, diklik, parça ve birim": {
    caption:
      "Taban 12 cm, yan kenar 5 cm sabit; aradaki B açısını değiştir. Alan 5 cm'nin kendisiyle değil, A'dan BC doğrusuna dik uzaklıkla hesaplanır: en çok 30 cm², o da yalnız 90°'de. Geniş açıda dikmenin ayağı kenarın uzantısına düşer; sonuç kare birimle yazılır.",
    alt: "BC = 12 cm tabanlı, AB = 5 cm olan üçgen; B açısı sürgüyle 30°'den 150°'ye değişiyor, A'dan BC doğrusuna inen dik yükseklik kesikli çiziliyor.",
    param: { label: "B açısı", min: 30, max: 150, step: 10, init: 60, unit: "°" },
    draw: (b) => {
      const B = v(0, 0);
      const C = v(12, 0);
      const A = v(5 * cosD(b), 5 * sinD(b));
      const H = v(A[0], 0);
      const h = 5 * sinD(b);
      const els: El[] = [anchor(v(-4.8, -1)), anchor(v(12.8, 5.6)), tri(A, B, C, "muted")];
      if (b > 90) els.push(seg(H, B, { tone: "muted", dash: true }));
      if (b !== 90) els.push(seg(A, H, { tone: "a", dash: true }), right(H, b > 90 ? B : C, A, "a"), dim(H, A, `h ≈ ${fmt(h, 2)}`, b > 90 ? C : B, "a"));
      else els.push(right(B, C, A, "a"));
      els.push(
        seg(A, B, { tone: "c", bold: true }),
        dim(B, C, "12 cm", A),
        dim(A, B, "5 cm", C, "c"),
        pt(A, "A", "n"),
        pt(B, "B", b > 90 ? "se" : "sw"),
        pt(C, "C", "se"),
      );
      const area = 6 * h;
      return {
        els,
        readout: [
          `h = 5 · sin ${b}° ≈ ${fmt(h, 2)} cm ⇒ alan ≈ ${fmt(area, 2)} cm²`,
          b === 90
            ? "Yalnız B = 90° iken yan kenar yüksekliktir: 12·5/2 = 30 cm²"
            : b > 90
              ? "Dikmenin ayağı CB'nin uzantısında; 12·5/2 = 30 yazmak yanlış"
              : "5 cm tabana dik değil; 12·5/2 = 30 yazmak yanlış",
        ],
      };
    },
  },
  "Üçgen alanındaki yarım nereden gelir?": {
    caption:
      "Adım 1–2: üçgenin eş kopyası 180° döndürülüp eklenince tabanı b, yüksekliği h olan paralelkenar oluşur; üçgen onun yarısıdır. Adım 3: 6 ve 10 kenarlarının arasındaki açı 30° ise alan 6·10·sin 30°/2 = 15. Adım 4: 30° yalnız 6'ya komşu, 10 karşıdaysa bu formül yazılamaz; önce yükseklik 3 ve taban bulunur (2024 TYT Temel Matematik 34 mantığı).",
    alt: "Dört adım: üçgen; döndürülmüş kopyayla oluşan paralelkenar; 6 ve 10 kenarları arasında 30° olan üçgen; 30° açısı 6 ile taban arasında, 10 karşıda olan üçgen ve yüksekliği.",
    steps: ["Üçgen", "Eş kopyayı döndür ve ekle", "Açı iki kenarın arasında", "Açı arada değil"],
    draw: (_, step) => {
      if (step >= 2) {
        const B = v(0, 0);
        const A = v(3 * Math.sqrt(3), 3);
        const H = v(A[0], 0);
        const between = step === 2;
        const C = between ? v(10, 0) : v(A[0] + Math.sqrt(91), 0);
        return {
          els: [
            tri(A, B, C, "muted"),
            ang(B, C, A, "30°", { fill: true, tone: "c", r: 40 }),
            seg(A, H, { tone: "a", dash: true }),
            right(H, C, A, "a"),
            dim(H, A, "3", C, "a"),
            dim(A, B, "6", C),
            between ? dim(B, C, "10", A, "b") : dim(C, A, "10", B, "b"),
            pt(A, "A", "n"),
            pt(B, "B", "sw"),
            pt(C, "C", "se"),
            pt(H, "H", "s", "a"),
          ],
          readout: between
            ? ["Alan = 6·10·sin 30°/2 = 6·10·(1/2)/2 = 15", "Denetim: h = 6·sin 30° = 3 ⇒ 10·3/2 = 15"]
            : [
                "30°'ye komşu kenarlar 6 ve BC; 10 karşı kenar",
                `BC = 3√3 + √(100 − 9) ≈ ${fmt(C[0], 2)} ⇒ alan ≈ ${fmt((3 * C[0]) / 2, 2)} (15 değil)`,
              ],
        };
      }
      const A = v(1.8, 3.4);
      const B = v(0, 0);
      const C = v(6, 0);
      const M = mid(A, C);
      const B2 = add(M, sub(M, B));
      const H = foot(A, B, C);
      return {
        els: [
          poly([A, B, C], { fill: "b" }),
          ...(step === 1 ? [poly([A, C, B2], { fill: "a", tone: "a" })] : []),
          seg(A, H, { dash: true, tone: "a" }),
          right(H, C, A, "a"),
          dim(A, H, "h", C, "a"),
          dim(B, C, "b", A),
        ],
        readout: step === 1 ? ["Paralelkenar: b·h", "Her üçgen: b·h/2"] : ["Üçgen: ?"],
      };
    },
  },
  "Alan oranını bulurken ortak olan büyüklüğü sadeleştir": {
    caption:
      "Adım 1: D'yi BC üzerinde kaydır; ABD ile ADC aynı A yüksekliğini paylaşır, toplam 12 birimkare BD : DC oranında bölünür. Adım 2: tepe BC'ye paralel bir doğru üzerinde kayarsa taban 6 ve yükseklik 4 değişmez, alan 12 kalır; eş alan eş üçgen demek değildir.",
    alt: "Ortak yüksekliği olan iki renkli üçgen. Son adımda taban 25, yükseklik 6, alan payları 30 ve 45 birim². P yatay konumunu değiştirir.",
    steps: ["Ortak tepe: taban oranı", "Ortak taban: tepe paralelde", "Alan 75, parçalar 30 ve 45"],
    param: { label: "Noktayı kaydır", min: 1, max: 5, step: 0.5, init: 2 },
    draw: (t, step) => {
      if (step === 2) {
        const height = 6;
        const area = 75;
        const whole = 2 * area / height;
        const part = whole * 2 / 5;
        const topX = (t - 1) * (whole + 10) / 4 - 5;
        const scaled = (x: number, y: number) => v(x / 4, y / 4);
        const A = scaled(0, 0);
        const D = scaled(part, 0);
        const B = scaled(whole, 0);
        const P = scaled(topX, height);
        const H = scaled(topX, 0);
        return {
          els: [
            line(scaled(-6, 0), scaled(31, 0), {tone: "muted", thin: true, dash: true, ext: 0}),
            poly([P, A, D], {fill: "a", thin: true}),
            poly([P, D, B], {fill: "b", thin: true}),
            seg(P, H, {tone: "c", dash: true}),
            right(H, topX < whole / 2 ? B : A, P, "c"),
            pt(P, "P", "n"), pt(A, "A", "sw"), pt(D, "D", "s"), pt(B, "B", "se"),
          ],
          readout: [
            `AB = 2 · ${area} / ${height} = ${whole} birim. AD = ${part}, DB = ${whole - part}.`,
            `Alan(PAD) = ${part * height / 2}; alan(PDB) = ${(whole - part) * height / 2} birim². Yükseklik ${height} kalır.`,
          ],
        };
      }
      const B = v(0, 0);
      const C = v(6, 0);
      const A = v(2, 4);
      if (step === 1) {
        const P = v((t - 1) * 2.5 - 2, 4);
        const F = v(P[0], 0);
        const els: El[] = [
          line(v(-2.6, 4), v(8.6, 4), { tone: "muted", dash: true, thin: true, ext: 0 }),
          line(v(-2.6, 0), v(8.6, 0), { tone: "muted", dash: true, thin: true, ext: 0 }),
          poly([A, B, C], { tone: "muted", dash: true, thin: true }),
          tri(P, B, C, "b"),
          seg(P, F, { tone: "a", dash: true }),
          right(F, P[0] < 3 ? C : B, P, "a"),
          dim(B, C, "6", v(3, 8)),
          pt(B, "B", "s"),
          pt(C, "C", "s"),
          pt(P, "P", "n", "b"),
        ];
        if (P[0] > 0.6 && P[0] < 5.4) els.push(dim(F, P, "4", P[0] < 3 ? C : B, "a"));
        return { els, readout: [`P = (${fmt(P[0])}; 4) · alan = 6·4/2 = 12`, "Tepe paralelde kaydıkça alan sabit; şekil değişir"] };
      }
      const D = v(t, 0);
      const H = foot(A, B, C);
      const a1 = triArea(A, B, D);
      const a2 = triArea(A, D, C);
      return {
        els: [
          poly([A, B, D], { fill: "a", thin: true }),
          poly([A, D, C], { fill: "b", thin: true }),
          poly([A, B, C]),
          seg(A, D),
          seg(A, H, { dash: true, tone: "muted" }),
          right(H, C, A, "muted"),
          dim(B, D, fmt(t), A, "a"),
          dim(D, C, fmt(6 - t), A, "b"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(D, "D", "s"),
        ],
        readout: [`A(ABD) : A(ADC) = ${fmt(a1, 2)} : ${fmt(a2, 2)} = ${fmt(t)} : ${fmt(6 - t)}`, "Toplam 6·4/2 = 12; her birim taban 2 birimkare"],
      };
    },
  },
  "Tabanı seçtiğinde yüksekliği de yeniden seçmiş olursun": {
    caption:
      "Her taban, karşı köşenin o kenarın DOĞRUSUNA olan dik uzaklığıyla eşleşir. Adım 1–2: geniş açılı üçgende dikmenin ayağı uzantıya düşer, alan değişmez. Adım 3: kenarları 10, 17, 21 olan üçgende üç taban ve üç yükseklik aynı alanı, 84'ü verir; Heron da 84 bulur.",
    alt: "Üç adım: B'de geniş açılı ABC'de BC tabanına A'dan ve AB tabanına C'den inen yükseklik; kenarları 10, 17, 21 olan üçgende üç kesikli yükseklik, ikisi kenar uzantılarına iniyor.",
    steps: ["Taban BC, yükseklik A'dan", "Taban AB, yükseklik C'den", "Üç taban, tek alan"],
    draw: (_, step) => {
      if (step === 2) {
        const B = v(0, 0);
        const C = v(21, 0);
        const A = v(6, 8);
        const Ha = v(6, 0);
        const Hb = foot(B, A, C);
        const Hc = foot(C, A, B);
        return {
          els: [
            tri(A, B, C, "muted"),
            seg(A, Hb, { tone: "muted", dash: true, thin: true }),
            seg(A, Hc, { tone: "muted", dash: true, thin: true }),
            seg(A, Ha, { tone: "a", dash: true }),
            seg(B, Hb, { tone: "b", dash: true }),
            seg(C, Hc, { tone: "c", dash: true }),
            right(Ha, C, A, "a"),
            right(Hb, B, A, "b"),
            right(Hc, C, B, "c"),
            dim(B, C, "21", A),
            dim(A, B, "10", v(-20, 20)),
            dim(C, A, "17", B),
            txt(mid(A, Ha), "8", "e", { tone: "a", bold: true }),
            txt(lerp(B, Hb, 0.5), "168/17", "w", { tone: "b", bold: true, small: true }),
            txt(lerp(C, Hc, 0.5), "16,8", "ne", { tone: "c", bold: true, small: true }),
            pt(A, "A", "s"),
            pt(B, "B", "sw"),
            pt(C, "C", "se"),
          ],
          readout: ["21·8/2 = 17·(168/17)/2 = 10·16,8/2 = 84", "Heron: s = 24 ⇒ √(24·3·7·14) = √7056 = 84"],
        };
      }
      const B = v(0, 0);
      const C = v(6, 0);
      const A = v(-1.6, 3);
      const els: El[] = [poly([A, B, C], { fill: "muted" })];
      if (step === 0) {
        const H = foot(A, B, C);
        els.push(
          seg(B, C, { tone: "b", bold: true }),
          seg(H, B, { dash: true, tone: "muted" }),
          seg(A, H, { tone: "a", dash: true }),
          right(H, C, A, "a"),
          dim(A, H, "hₐ = 3", C, "a"),
          dim(B, C, "a = 6", A, "b"),
          pt(H, "H", "s", "a"),
          pt(A, "A", "n"),
          pt(B, "B", "s"),
          pt(C, "C", "se"),
        );
        return { els, readout: ["Alan = 6 · 3 / 2 = 9"] };
      }
      const H = foot(C, A, B);
      const ab = dist(A, B);
      els.push(
        seg(A, B, { tone: "b", bold: true }),
        seg(B, H, { dash: true, tone: "muted" }),
        seg(C, H, { tone: "a", dash: true }),
        right(H, C, A, "a"),
        pt(H, "H", "w", "a"),
        pt(A, "A", "n"),
        pt(B, "B", "s"),
        pt(C, "C", "se"),
      );
      return {
        els,
        readout: [`AB ≈ ${fmt(ab, 2)}, h ≈ ${fmt(dist(C, H), 2)} ⇒ alan ≈ ${fmt((ab * dist(C, H)) / 2, 2)}`],
      };
    },
  },
};

/* ───────────── 019 Dikdörtgen ───────────── */

const rect = (w: number, h: number, o: V = v(0, 0)): [V, V, V, V] => [o, add(o, v(w, 0)), add(o, v(w, h)), add(o, v(0, h))];

export const squareFromMidpoints: FigureDef = {
  caption: "Dış karenin kenarı değişirken dört eş dik üçgenin ve ortadaki karenin alanlarını karşılaştır.",
  alt: "Dış kare ve kenar orta noktalarına oturan iç kare. Dört dış köşe üçgeninin her iki dik kenarı dış karenin kenarının yarısı.",
  param: { label: "Dış karenin kenarı", min: 4, max: 14, step: 1, init: 8, unit: " birim" },
  draw: (side) => {
    const corners = rect(side, side);
    const inner = corners.map((point, i) => mid(point, corners[(i + 1) % 4]));
    const half = side / 2;
    const triangleArea = half * half / 2;
    const outerArea = side ** 2;
    const insideArea = outerArea - 4 * triangleArea;
    return {
      els: [
        ...corners.map((corner, i) => poly([corner, inner[i], inner[(i + 3) % 4]], { fill: "muted", thin: true })),
        poly(inner, { tone: "b", fill: "b" }),
        poly(corners),
        ...inner.map((point) => pt(point)),
        ...corners.map((point, i) => pt(point, ["A","B","C","D"][i], ["sw","se","ne","nw"][i] as "sw" | "se" | "ne" | "nw")),
      ],
      readout: [
        `İç karenin kenarı ${fmt(half)}√2 birim. Dış karenin alanı ${fmt(outerArea)} birim².`,
        `Her köşe üçgeni ${fmt(triangleArea)} birim². Dört üçgen toplam ${fmt(4 * triangleArea)} birim².`,
        `İç karenin alanı ${fmt(insideArea)} birim², dış alanın yarısı.`,
      ],
    };
  },
};

const dikdortgen: Record<string, FigureDef> = {
  "Dikdörtgende eş köşegenin kaynağı": {
    caption: "Eş köşegenler birbirini ortalar. Çevre ve köşegen biliniyorsa yarı çevrenin karesinden köşegenin karesini çıkar. Alan, farkın yarısıdır.",
    alt: "Önce eş köşegenler ve köşelerden geçen çember. Sonra köşegenlerin kesişme açıları. Son iki adımda çevre ve köşegenden türetilen iki dikdörtgen.",
    steps: ["Eş köşegen, ortak merkez", "Eş ama dik değil", "Çevre 62 ve köşegen 25", "Çevre 34 ve köşegen 13"],
    draw: (_, step) => {
      if (step >= 2) {
        const perimeter = step === 2 ? 62 : 34;
        const diagonal = step === 2 ? 25 : 13;
        const halfPerimeter = perimeter / 2;
        const twiceArea = halfPerimeter ** 2 - diagonal ** 2;
        const difference = Math.sqrt(halfPerimeter ** 2 - 2 * twiceArea);
        const width = (halfPerimeter + difference) / 2;
        const height = (halfPerimeter - difference) / 2;
        const [A, B, C, D] = rect(width, height);
        return {
          els: [
            poly([A, B, C, D], { fill: "muted" }),
            seg(A, C, { tone: "a" }),
            right(A, B, D),
            dim(A, B, String(width), D),
            dim(B, C, String(height), A),
            txt(mid(A, C), String(diagonal), "nw", { tone: "a", bold: true }),
            pt(A, "A", "sw"),
            pt(B, "B", "se"),
            pt(C, "C", "ne"),
            pt(D, "D", "nw"),
          ],
          readout: [
            `a + b = ${perimeter}/2 = ${halfPerimeter} · a² + b² = ${diagonal}² = ${diagonal ** 2}`,
            `2ab = ${halfPerimeter}² − ${diagonal ** 2} = ${twiceArea} ⇒ alan ${twiceArea / 2} ⇒ ${width} ve ${height}`,
          ],
        };
      }
      const [A, B, C, D] = rect(8, 6);
      const O = v(4, 3);
      if (step === 1)
        return {
          els: [
            poly([A, B, C, D], { fill: "muted" }),
            seg(A, C, { tone: "a" }),
            seg(B, D, { tone: "a" }),
            ang(O, A, B, "≈ 106,3°", { tone: "b", r: 30 }),
            ang(O, B, C, "≈ 73,7°", { tone: "c", r: 38 }),
            pt(A, "A", "sw"),
            pt(B, "B", "se"),
            pt(C, "C", "ne"),
            pt(D, "D", "nw"),
            pt(O, "O", "n"),
          ],
          readout: ["cos ∠AOB = (−16 + 9)/25 = −7/25 ⇒ ≈ 106,3°", "Köşegenler eş ama dik değil; dikliği yalnız kare verir"],
        };
      return {
        els: [
          circle(O, 5, { dash: true, thin: true, tone: "muted" }),
          poly([A, B, C, D], { fill: "muted" }),
          seg(A, C, { tone: "a" }),
          seg(B, D, { tone: "a" }),
          right(A, B, D),
          dim(A, B, "8", D),
          dim(B, C, "6", A),
          dim(O, C, "5", B, "a"),
          pt(A, "A", "sw"),
          pt(B, "B", "se"),
          pt(C, "C", "ne"),
          pt(D, "D", "nw"),
          pt(O, "O", "s"),
        ],
        readout: ["d² = 8² + 6² = 100 ⇒ d = 10", "Alan 48 · çevre 28"],
      };
    },
  },
  "Kare iki ailenin özelliklerini birlikte taşır": {
    caption:
      "Çevre 24 sabit; genişliği değiştir. a = 6'da dikdörtgen kare olur: köşegenler eş, dik ve köşe açılarını 45° + 45° böler; iç çember r = 3, çevrel çember R = 3√2 ve alan en büyük değeri 36'ya ulaşır. Diğer genişliklerde köşegenler eş kalır ama dik kesişmez, alan 36'dan küçüktür.",
    alt: "Çevresi 24 olan dikdörtgen; genişlik sürgüyle 1'den 11'e değişiyor, yükseklik 12 − a. a = 6'da kare, iç ve çevrel çemberleri ve köşegenlerin dik kesişimi gösteriliyor.",
    param: { label: "Genişlik a", min: 1, max: 11, step: 0.5, init: 6 },
    draw: (a) => {
      const b = 12 - a;
      const [A, B, C, D] = rect(a, b);
      const O = v(a / 2, b / 2);
      const square = a === 6;
      const els: El[] = [anchor(v(-1.8, -1.8)), anchor(v(12.4, 12.2))];
      if (square)
        els.push(
          circle(O, 3 * Math.SQRT2, { dash: true, thin: true, tone: "muted" }),
          circle(O, 3, { thin: true, tone: "b" }),
        );
      els.push(poly([A, B, C, D], { fill: square ? undefined : "muted" }), seg(A, C, { tone: "a" }), seg(B, D, { tone: "a" }));
      if (square) els.push(right(O, C, D, "a"), ang(A, B, C, "45°", { tone: "c" }), ang(A, C, D, "45°", { tone: "c", r: 36 }));
      els.push(
        dim(A, B, fmt(a), D),
        dim(B, C, fmt(b), A),
        pt(A, "A", "sw"),
        pt(B, "B", "se"),
        pt(C, "C", "ne"),
        pt(D, "D", "nw"),
      );
      return {
        els,
        readout: [
          `Çevre 2(${fmt(a)} + ${fmt(b)}) = 24 · alan ${fmt(a * b, 2)} · köşegen ≈ ${fmt(Math.hypot(a, b), 2)}`,
          square ? "Kare: alan en büyük 36, köşegen 6√2, köşegenler dik" : `Alan ${fmt(a * b, 2)} < 36: aynı çevrede en büyük alan karede`,
        ],
      };
    },
  },
  "Koşulu en kısa yöntemle sonuca bağla": {
    caption:
      "Adım 1: önce aileyi belirle (dik açı → dikdörtgen, eş kenar → eşkenar dörtgen, ikisi → kare). Adım 2: dikdörtgenin içindeki her P için PA² + PC² = PB² + PD². Adım 3: ortak genişlikte çevre farkı yükseklik farkının iki katıdır, alan oranı yükseklik oranıdır (2026 TYT Temel Matematik 37 mantığı). Adım 4: çerçevede pay iki yandan çıkar.",
    alt: "Dört adım: paralelkenardan dikdörtgen, eşkenar dörtgen ve kareye ağaç; 10 × 6 dikdörtgende P'den dört köşeye çizgiler; genişliği 9 olan iki dikdörtgen bölme; 14 × 9 dış, 10 × 5 iç ölçülü çerçeve.",
    steps: ["Aileyi belirle", "Karşı köşelerin kareleri", "Ortak genişlik", "Çerçevede boşluk"],
    draw: (_, step) => {
      if (step === 1) {
        const [A, B, C, D] = rect(10, 6);
        const P = v(4, 1);
        return {
          els: [
            poly([A, B, C, D], { fill: "muted" }),
            seg(P, A, { tone: "a", bold: true }),
            seg(P, C, { tone: "a", bold: true }),
            seg(P, B, { tone: "b", dash: true }),
            seg(P, D, { tone: "b", dash: true }),
            pt(A, "A", "sw"),
            pt(B, "B", "se"),
            pt(C, "C", "ne"),
            pt(D, "D", "nw"),
            pt(P, "P", "s"),
          ],
          readout: ["PA² + PC² = 17 + 61 = 78", "PB² + PD² = 37 + 41 = 78: üç uzaklıktan dördüncüsü"],
        };
      }
      if (step === 2) {
        const S = rect(9, 5);
        const L = rect(9, 25, v(16, 0));
        return {
          els: [
            poly(S, { fill: "b" }),
            poly(L, { fill: "a" }),
            dim(S[0], S[1], "9", S[3]),
            dim(L[0], L[1], "9", L[3]),
            dim(S[1], S[2], "h = 5", S[0], "b"),
            dim(L[1], L[2], "5h = 25", L[0], "a"),
          ],
          readout: ["Çevre farkı 2(9 + 5h) − 2(9 + h) = 8h = 40 ⇒ h = 5", "Alanlar 45 ve 225: oran 1 : 5, yükseklik oranı"],
        };
      }
      if (step === 3) {
        const Out = rect(14, 9);
        const In = rect(10, 5, v(2, 2));
        return {
          els: [
            poly(Out, { fill: "a" }),
            poly(In, { fill: "muted" }),
            dim(Out[0], Out[1], "14", Out[3]),
            dim(Out[1], Out[2], "9", Out[0]),
            dim(In[0], In[1], "10", In[3]),
            dim(In[3], In[0], "5", In[1]),
            dim(v(12, 4.5), v(14, 4.5), "2", v(13, 0), "a"),
            dim(v(7, 7), v(7, 9), "2", v(0, 8), "a"),
          ],
          readout: ["İç ölçü: 14 − 2·2 = 10 ve 9 − 2·2 = 5", "Çerçeve alanı 14·9 − 10·5 = 126 − 50 = 76 cm²"],
        };
      }
      const icon = (o: V, ps: V[]) => poly(ps.map((p) => add(o, p)), { fill: "muted", thin: true });
      const P = v(0, 2);
      const R = v(5, 4);
      const Rh = v(5, 0);
      const Sq = v(10, 2);
      const arrow = (a: V, b: V, label: string) => {
        const d = unit(sub(b, a));
        const m = mid(a, b);
        return [
          vec(add(a, mul(d, 1.5)), sub(b, mul(d, 1.5)), { tone: "a", thin: true }),
          txt(add(m, v(0, 0.6)), label, "c", { small: true, tone: "a" }),
        ];
      };
      return {
        els: [
          icon(P, [v(-1.1, -0.6), v(0.6, -0.6), v(1.1, 0.6), v(-0.6, 0.6)]),
          icon(R, [v(-1.1, -0.6), v(1.1, -0.6), v(1.1, 0.6), v(-1.1, 0.6)]),
          icon(Rh, [v(-0.9, 0), v(0, -0.65), v(0.9, 0), v(0, 0.65)]),
          icon(Sq, [v(-0.65, -0.65), v(0.65, -0.65), v(0.65, 0.65), v(-0.65, 0.65)]),
          ...arrow(P, R, "+ dik açı"),
          ...arrow(P, Rh, "+ eş kenar"),
          ...arrow(R, Sq, "+ eş kenar"),
          ...arrow(Rh, Sq, "+ dik açı"),
          txt(add(P, v(0, -1.1)), "paralelkenar", "c", { small: true }),
          txt(add(R, v(0, -1.1)), "dikdörtgen", "c", { small: true }),
          txt(add(Rh, v(0, -1.1)), "eşkenar dörtgen", "c", { small: true }),
          txt(add(Sq, v(0, -1.1)), "kare", "c", { small: true, bold: true }),
        ],
      };
    },
  },
};

export const geometryFigures063Sheets: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-dik-ucgen-031": dikUcgen,
  "tyt-geo-trigonometrik-oranlar-040": trig,
  "tyt-geo-ucgen-merkezleri-031": ucgenMerkezleri,
  "alan-donusumleri": alan,
  "tyt-geo-paralelkenar-ozel-dortgenler-032": dikdortgen,
};
