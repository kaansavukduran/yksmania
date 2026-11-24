import { lightTransmissionFigures } from "./mebiLightTransmissionFigures";
import { pointSphereShadowFigures } from "./mebiPointSphereShadowFigures";
import { coaxialShadowFigures } from "./mebiCoaxialShadowFigures";
import { equalExtendedShadowFigures } from "./mebiEqualExtendedShadowFigures";
import { stackedPointShadowFigures } from "./mebiStackedPointShadowFigures";
import { extendedShadowConeFigures } from "./mebiExtendedShadowConeFigures";
import {
  span,
  add,
  ang,
  dim,
  fmt,
  line,
  mid,
  mul,
  pol,
  poly,
  pt,
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

const deg2 = (d: number) => (d * Math.PI) / 180;
const asinDeg = (x: number) => (Math.asin(x) * 180) / Math.PI;

/** A light ray from a to b with a small direction arrow at its middle. */
function ray(a: V, b: V, tone: "a" | "b" | "c" | "warn" = "a", dash = false): El[] {
  const d = unit(sub(b, a));
  const m = mid(a, b);
  return [
    seg(a, b, { tone, dash, thin: dash }),
    ...(dash ? [] : [vec(sub(m, mul(d, 0.05)), add(m, mul(d, 0.05)), { tone })]),
  ];
}
const arrow = (x: number, h: number, tone: "ink" | "a" | "b" | "c" = "ink", dash = false): El =>
  vec(v(x, 0), v(x, h), { tone, bold: !dash, dash });

/**
 * Paraxial ray diagram for a spherical mirror (side = −1, light returns to
 * the left) or a thin lens (side = +1, light continues to the right). The
 * optical element sits at x = 0, the real object at x = −u with height h.
 * f > 0 converging (concave / convex lens), f < 0 diverging.
 */
function rayDiagram(kind: "mirror" | "lens", f: number, u: number, h = 3) {
  const side = kind === "mirror" ? -1 : 1;
  const span = Math.max(u, 2 * Math.abs(f)) + 2;
  const tip = v(-u, h);
  const F = v(side * f, 0);
  const els: El[] = [line(v(-span, 0), v(span, 0), { tone: "muted", thin: true, ext: 0 })];
  // Element outline.
  const H = h + 1.4;
  if (kind === "mirror") {
    const k = 0.03 * Math.sign(f);
    els.push(
      poly(
        Array.from({ length: 21 }, (_, i) => {
          const y = -H + (2 * H * i) / 20;
          return v(-k * y * y, y);
        }),
        { open: true, bold: true },
      ),
    );
  } else {
    const t = f > 0 ? 0.35 : -0.25;
    const edge = f > 0 ? 0.06 : 0.4;
    const pts: V[] = [];
    for (let i = 0; i <= 20; i++) {
      const y = -H + (2 * H * i) / 20;
      pts.push(v(edge + t * (1 - (y / H) ** 2), y));
    }
    for (let i = 20; i >= 0; i--) {
      const y = -H + (2 * H * i) / 20;
      pts.push(v(-(edge + t * (1 - (y / H) ** 2)), y));
    }
    els.push(poly(pts, { fill: "b", tone: "b", thin: true }));
  }
  // A mirror has one focus on its own optical side; a lens has one on each.
  const focusSides = kind === "mirror" ? [side * Math.sign(f)] : [-1, 1];
  for (const k of [1, 2])
    for (const s of focusSides) {
      const x = s * k * Math.abs(f);
      if (Math.abs(x) <= span) els.push(pt(v(x, 0), k === 1 ? "F" : "2F", "s", "muted"));
    }
  els.push(arrow(-u, h), txt(tip, "cisim", "n", { small: true }));
  const objLabel = els.length - 1;
  const P1 = v(0, h);
  const O = v(0, 0);
  const d1 = unit(mul(sub(F, P1), Math.sign(f)));
  const d2 = unit(v(side * u, -h));
  els.push(...ray(tip, P1, "a"), ...ray(tip, O, "c"));
  const atF = Math.abs(u - f) < 1e-9;
  if (atF) {
    els.push(...ray(P1, add(P1, mul(d1, span)), "a"), ...ray(O, add(O, mul(d2, span)), "c"));
    return { els, readout: ["u = f: çıkan ışınlar paralel, sonlu görüntü yok"] };
  }
  const vv = (f * u) / (u - f);
  const m = -vv / u;
  const I = v(side * vv, m * h);
  const real = vv > 0;
  // A real mirror image stays in front of the mirror: a short axis behind it
  // keeps the diagram large on a phone.
  if (kind === "mirror" && real) els[0] = line(v(-span, 0), v(3, 0), { tone: "muted", thin: true, ext: 0 });
  const reach = (p: V, d: V) => {
    // Extend the outgoing ray a little beyond the image along its direction.
    const t = real ? Math.hypot(I[0] - p[0], I[1] - p[1]) + 1 : span * 0.8;
    return add(p, mul(d, t));
  };
  els.push(...ray(P1, reach(P1, d1), "a"), ...ray(O, reach(O, d2), "c"));
  if (!real) els.push(seg(P1, I, { dash: true, thin: true, tone: "a" }), seg(O, I, { dash: true, thin: true, tone: "c" }));
  // Upright images share the object's side of the axis: push the two labels
  // apart horizontally. Inverted images keep their label clear of F/2F marks.
  const right = I[0] > -u;
  // A short image standing next to an F or 2F mark: label it beside the arrow,
  // on the side away from that mark.
  const marks = focusSides.flatMap((sd) => [1, 2].map((k) => sd * k * Math.abs(f)));
  const near = marks.reduce((b, x) => (Math.abs(x - I[0]) < Math.abs(b - I[0]) ? x : b), Infinity);
  const imgAt = right ? "ne" : "nw";
  const crowded = Math.abs(near - I[0]) < 1.2 && Math.abs(I[1]) < 2;
  els.push(
    arrow(I[0], I[1], "b", !real),
    crowded
      ? txt(v(I[0], I[1] * 0.6), "görüntü", near < I[0] ? "e" : "w", { small: true, tone: "b" })
      : I[1] < 0
        ? txt(v(I[0], I[1] - 0.3 * h - 0.6), "görüntü", "s", { small: true, tone: "b" })
        : txt(I, "görüntü", imgAt, { small: true, tone: "b" }),
  );
  if (I[1] >= 0) els[objLabel] = txt(tip, "cisim", right ? "nw" : "ne", { small: true });
  const nature = `${real ? "gerçek" : "sanal"}, ${m < 0 ? "ters" : "düz"}, ${Math.abs(Math.abs(m) - 1) < 1e-9 ? "eş boylu" : Math.abs(m) > 1 ? "büyük" : "küçük"}`;
  return {
    els,
    readout: [`u = ${fmt(u)}, f = ${fmt(f)} → v = ${fmt(vv, 2)}, m = ${fmt(m, 2)}`, `Görüntü ${nature}`],
  };
}

/** Refraction at a horizontal boundary y = 0, light coming from above. */
function refraction(i: number, n1: number, n2: number) {
  const P = v(0, 0);
  const inc = add(P, mul(pol(1, 90 + i), 3));
  const s = (n1 / n2) * Math.sin(deg2(i));
  const els: El[] = [
    seg(v(-4, 0), v(4, 0), { tone: "muted" }),
    line(v(0, -3), v(0, 3), { tone: "muted", dash: true, thin: true, ext: 0 }),
    ...ray(inc, P, "a"),
    ang(P, v(0, 1), inc, `${fmt(i, 0)}°`, { r: 46, tone: "a" }),
    txt(v(3.8, 1.2), `n₁ = ${fmt(n1, 2)}`, "w", { small: true }),
    txt(v(3.8, -1.2), `n₂ = ${fmt(n2, 2)}`, "w", { small: true }),
  ];
  if (s <= 1) {
    const r = asinDeg(s);
    const out = add(P, mul(pol(1, -90 + r), 3));
    els.push(...ray(P, out, "b"), ang(P, v(0, -1), out, `${fmt(r, 1)}°`, { r: 46, tone: "b" }));
    return { els, r };
  }
  const refl = add(P, mul(pol(1, 90 - i), 3));
  els.push(...ray(P, refl, "warn"));
  return { els, r: undefined };
}

const duzlemAyna: Record<string, FigureDef> = {
  "Yansıma normalle başlar": {
    caption:
      "Açıları yüzeyden değil normalden ölç. Gelme açısını değiştir: yansıma açısı hep ona eşit kalır; yüzeyle yapılan açı 90° − i olur.",
    alt: "Yatay ayna, gelme noktasında kesikli normal; gelen ve yansıyan ışınlar normalle eşit açı yapıyor.",
    param: { label: "Gelme açısı i", min: 5, max: 85, step: 5, init: 35, unit: "°" },
    draw: (i) => {
      const P = v(0, 0);
      const A = add(P, mul(pol(1, 90 + i), 3));
      const B = add(P, mul(pol(1, 90 - i), 3));
      return {
        els: [
          seg(v(-3.5, 0), v(3.5, 0), { bold: true }),
          ...Array.from({ length: 8 }, (_, k) => seg(v(-3.2 + k * 0.9, 0), v(-3.5 + k * 0.9, -0.3), { thin: true, tone: "muted" })),
          line(P, v(0, 3), { tone: "muted", dash: true, thin: true, ext: 0 }),
          ...ray(A, P, "a"),
          ...ray(P, B, "b"),
          ang(P, A, v(0, 1), "i", { r: 52, tone: "a" }),
          ang(P, v(0, 1), B, "r", { r: 74, tone: "b" }),
          txt(v(0, 3.2), "normal", "n", { small: true, tone: "muted" }),
        ],
        readout: [`i = r = ${i}° · yüzeyle açı ${90 - i}°`],
      };
    },
  },
  "Düzgün ve dağınık yansıma aynı yasaya uyar": {
    caption:
      "Solda düz yüzeyde paralel ışınlar paralel yansır. Sağda pürüzlü yüzeyin her parçasının normali farklıdır; her ışın yine kendi normaline göre yansır ama yönler dağılır.",
    alt: "Solda düz yüzeye paralel gelen üç ışın paralel yansıyor; sağda zikzak yüzeyde her ışın kendi kesikli normaline göre farklı yöne yansıyor.",
    draw: () => {
      const els: El[] = [seg(v(-0.5, 0), v(3.5, 0), { bold: true })];
      [0.6, 1.5, 2.4].forEach((x) => {
        const P = v(x, 0);
        els.push(...ray(add(P, mul(pol(1, 125), 2.4)), P, "a"), ...ray(P, add(P, mul(pol(1, 55), 2.4)), "b"));
      });
      const tilts = [18, -14, 10];
      const xs = [5.6, 6.6, 7.6];
      xs.forEach((x, k) => {
        const n = pol(1, 90 + tilts[k]);
        const t = v(n[1], -n[0]);
        const P = v(x, 0);
        els.push(seg(sub(P, mul(t, 0.45)), add(P, mul(t, 0.45)), { bold: true }));
        els.push(seg(P, add(P, mul(n, 1.2)), { dash: true, thin: true, tone: "muted" }));
        const inc = unit(pol(1, -55));
        const out = sub(inc, mul(n, 2 * (inc[0] * n[0] + inc[1] * n[1])));
        els.push(...ray(sub(P, mul(inc, 2.4)), P, "a"), ...ray(P, add(P, mul(out, 2.2)), "b"));
      });
      els.push(txt(v(1.5, -0.7), "düzgün", "c", { small: true }), txt(v(6.6, -0.7), "dağınık", "c", { small: true }));
      return { els };
    },
  },
  "Görüntüyü ışın uzantılarıyla kur": {
    caption:
      "A'dan çıkan iki ışın yansır; yansıyan ışınların kesikli geri uzantıları aynanın arkasında A′'de buluşur. A ile A′ aynaya eşit dik uzaklıktadır.",
    alt: "Düşey ayna, önünde A noktası; iki ışın aynaya gelip yansıyor, geri uzantıları aynanın arkasındaki A′ noktasında kesişiyor.",
    draw: () => {
      const A = v(-3, 1);
      const A2 = v(3, 1);
      const P1 = v(0, 2.5);
      const P2 = v(0, -0.5);
      const out1 = add(P1, mul(unit(sub(P1, A2)), 3));
      const out2 = add(P2, mul(unit(sub(P2, A2)), 3));
      return {
        els: [
          seg(v(0, -2), v(0, 3.5), { bold: true }),
          ...ray(A, P1, "a"),
          ...ray(A, P2, "c"),
          ...ray(P1, out1, "a"),
          ...ray(P2, out2, "c"),
          seg(P1, A2, { dash: true, thin: true, tone: "a" }),
          seg(P2, A2, { dash: true, thin: true, tone: "c" }),
          seg(A, v(0, 1), { tone: "muted", thin: true }),
          seg(v(0, 1), A2, { tone: "muted", thin: true, dash: true }),
          ticks(A, v(0, 1), 1),
          ticks(v(0, 1), A2, 1),
          pt(A, "A", "w"),
          pt(A2, "A′", "e", "b", true),
        ],
      };
    },
  },
  "Sanal, düz ve eş boylu ne demektir?": {
    caption:
      "Ok biçimli cismin görüntüsü aynanın arkasında, aynı boyda ve dik durur. Görüntüde ışınlar gerçekten buluşmaz, yalnız uzantılar buluşur: görüntü sanaldır.",
    alt: "Düşey aynanın önünde 2 birim boyunda bir ok, arkasında aynı uzaklıkta ve aynı boyda kesikli çizilmiş görüntü oku.",
    draw: () => ({
      els: [
        seg(v(0, -0.5), v(0, 3), { bold: true }),
        seg(v(-4, 0), v(4, 0), { tone: "muted", thin: true }),
        arrow(-2.5, 2),
        arrow(2.5, 2, "b", true),
        dim(v(-2.5, 0), v(0, 0), "d", v(-1, 1)),
        dim(v(0, 0), v(2.5, 0), "d", v(1, 1)),
        txt(v(-2.5, 2.2), "cisim", "n", { small: true }),
        txt(v(2.5, 2.2), "görüntü (sanal)", "n", { small: true, tone: "b" }),
      ],
    }),
  },
  "Sonlu aynada görüntünün yeri ile görünmesi farklıdır": {
    caption:
      "Her noktanın görüntüsü vardır, ama göz yalnız göz–görüntü doğrusu aynanın kendisinden geçiyorsa görür. A′ doğrusu aynadan geçer (görünür); B′ doğrusu aynanın dışından geçer (görünmez).",
    alt: "Kısa düşey ayna, önünde göz G ile A ve B noktaları, arkada A′ ve B′ görüntüleri; G'den A′'ye doğru aynayı keser, G'den B′'ye doğru aynanın ucundan geçmez.",
    draw: () => {
      const G = v(-3, 0);
      const A = v(-1.5, 1.2);
      const B = v(-1.5, 3.2);
      const A2 = v(1.5, 1.2);
      const B2 = v(1.5, 3.2);
      const hitA = v(0, G[1] + (A2[1] - G[1]) * (3 / 4.5));
      const hitB = v(0, G[1] + (B2[1] - G[1]) * (3 / 4.5));
      return {
        els: [
          seg(v(0, -0.6), v(0, 1.4), { bold: true }),
          seg(v(0, 1.4), v(0, 3.6), { tone: "muted", dash: true, thin: true }),
          seg(G, A2, { tone: "c", dash: true, thin: true }),
          seg(G, B2, { tone: "warn", dash: true, thin: true }),
          ...ray(A, hitA, "c"),
          ...ray(hitA, G, "c"),
          pt(hitB, undefined, "n", "warn", true),
          pt(G, "göz", "w"),
          pt(A, "A", "n"),
          pt(B, "B", "n"),
          pt(A2, "A′ görünür", "e", "c", true),
          pt(B2, "B′ görünmez", "e", "warn", true),
        ],
      };
    },
  },
  "Tam boy aynayı yarım boy kılan benzerlik": {
    caption:
      "Boyu 170 cm, göz yüksekliği 160 cm olan kişi: ayaktan gelen ışın 80 cm'de, baştan gelen ışın 165 cm'de yansır. Gereken ayna 85 cm = boyun yarısıdır.",
    alt: "Düşey ayna ve önünde dik duran kişi; ayaktan aynaya ve aynadan göze, baştan aynaya ve aynadan göze giden ışınlar; aynanın alt ve üst uçları 80 ve 165 cm.",
    draw: () => {
      const s = 0.02;
      const x = -1.5;
      const foot0 = v(x, 0);
      const head = v(x, 170 * s);
      const eye = v(x, 160 * s);
      const lo = v(0, 80 * s);
      const hi = v(0, 165 * s);
      return {
        els: [
          seg(v(-2.5, 0), v(0.6, 0), { tone: "muted" }),
          seg(foot0, head, { bold: true }),
          seg(lo, hi, { bold: true, tone: "b" }),
          seg(v(0, 0), lo, { tone: "muted", dash: true, thin: true }),
          ...ray(foot0, lo, "a"),
          ...ray(lo, eye, "a"),
          ...ray(head, hi, "c"),
          ...ray(hi, eye, "c"),
          pt(eye, "göz 160", "sw"),
          pt(head, "baş 170", "nw"),
          pt(lo, "80", "e", "b"),
          pt(hi, "165", "e", "b"),
        ],
        readout: ["Ayna boyu 165 − 80 = 85 cm = 170/2"],
      };
    },
  },
  "Görüş alanı sorusunda neyin sabit olduğunu söyle": {
    caption:
      "Gözü aynaya yaklaştır: gözün aynadaki görüntüsünden aynanın iki ucuna çizilen sınır doğruları açılır ve arkadaki duvarda görülen aralık genişler.",
    alt: "Düşey küçük ayna, önünde göz, aynanın arkasında gözün görüntüsü; görüntüden aynanın uçlarından geçip öndeki duvara uzanan iki sınır doğrusu.",
    param: { label: "Gözün aynaya uzaklığı", min: 0.5, max: 3, step: 0.25, init: 1.5 },
    draw: (d) => {
      const E = v(-d, 0);
      const E2 = v(d, 0);
      const top = v(0, 0.6);
      const bot = v(0, -0.6);
      const wall = -5;
      const hit = (q: V) => add(E2, mul(sub(q, E2), (wall - E2[0]) / (q[0] - E2[0])));
      const T = hit(top);
      const B = hit(bot);
      return {
        els: [
          seg(bot, top, { bold: true }),
          seg(v(wall, -4), v(wall, 4), { tone: "muted", bold: true }),
          seg(E2, T, { dash: true, thin: true, tone: "muted" }),
          seg(E2, B, { dash: true, thin: true, tone: "muted" }),
          seg(top, T, { tone: "a" }),
          seg(bot, B, { tone: "a" }),
          seg(T, B, { tone: "a", bold: true }),
          pt(E, "göz", "s"),
          pt(E2, "gözün görüntüsü", "e", "muted", true),
          txt(v(wall, 4), "duvar", "n", { small: true, tone: "muted" }),
        ],
        readout: [`Duvarda görülen aralık ≈ ${fmt(Math.abs(T[1] - B[1]), 2)} birim`],
      };
    },
  },
  "Hareketi sabit bir referansa göre çöz": {
    caption:
      "Cisim sabitken ayna cisme 3 cm yaklaşırsa görüntü yere göre 6 cm yer değiştirir: xg = 2xm − xc. Cisim–ayna uzaklığı yalnız 3 cm azalır.",
    alt: "Sayı doğrusu üzerinde sabit cisim, aynanın eski ve yeni yeri ve görüntünün eski ve yeni yeri; ayna 3, görüntü 6 birim kaymış.",
    steps: ["Başlangıç", "Ayna 3 cm yaklaştı"],
    draw: (_, step) => {
      const xc = 0;
      const xm = step === 0 ? 10 : 7;
      const xg = 2 * xm - xc;
      const els: El[] = [
        seg(v(-1, 0), v(21, 0), { tone: "muted" }),
        ...[0, 5, 10, 15, 20].map((x) => txt(v(x, -0.6), String(x), "c", { small: true, tone: "muted" })),
        arrow(xc, 2),
        seg(v(xm, -0.3), v(xm, 2.6), { bold: true, tone: "b" }),
        arrow(xg, 2, "a", true),
        txt(v(xc, 2.2), "cisim", "n", { small: true }),
        txt(v(xm, 2.8), "ayna", "n", { small: true, tone: "b" }),
        txt(v(xg, 2.2), "görüntü", "n", { small: true, tone: "a" }),
      ];
      if (step === 1) els.push(seg(v(10, -0.3), v(10, 2.6), { dash: true, thin: true, tone: "muted" }), arrow(20, 2, "ink", true));
      return { els, readout: [`xm = ${xm}, xg = 2·${xm} − 0 = ${xg}`] };
    },
  },
};

const kureselAynalar: Record<string, FigureDef> = {
  "Kürenin hangi yüzü yansıtıyor?": {
    caption:
      "Kürenin içi yansıtıyorsa çukur, dışı yansıtıyorsa tümsek ayna olur. Normal her noktada o noktayı M merkezine bağlayan doğrudur; F, TM'nin ortasındadır (f ≈ R/2).",
    alt: "Solda içi yansıtıcı çukur ayna yayı, önünde M ve F; sağda dışı yansıtıcı tümsek ayna yayı, arkasında F ve M. Her birinde bir noktadan M'ye giden kesikli normal.",
    draw: () => {
      const arc = (c: V, R: number, a0: number, a1: number) =>
        poly(Array.from({ length: 31 }, (_, i) => add(c, pol(R, a0 + ((a1 - a0) * i) / 30))), { open: true, bold: true });
      const M1 = v(-4, 0);
      const R = 4;
      const M2 = v(12, 0);
      const T2 = v(8, 0);
      const P1 = add(M1, pol(R, 30));
      const P2 = add(M2, pol(R, 150));
      return {
        els: [
          seg(v(-6, 0), v(1, 0), { tone: "muted", thin: true }),
          arc(M1, R, -40, 40),
          seg(P1, M1, { dash: true, thin: true, tone: "c" }),
          pt(M1, "M", "s"),
          pt(v(-2, 0), "F", "s", "a"),
          pt(v(0, 0), "T", "se"),
          txt(v(-1, -3), "çukur", "c", { small: true }),
          seg(v(7, 0), v(13, 0), { tone: "muted", thin: true }),
          arc(M2, R, 140, 220),
          seg(P2, M2, { dash: true, thin: true, tone: "c" }),
          pt(M2, "M", "s"),
          pt(v(10, 0), "F", "s", "a"),
          pt(T2, "T", "sw"),
          txt(v(9, -3), "tümsek", "c", { small: true }),
        ],
      };
    },
  },
  "Çukur ayna her zaman büyütmez": {
    caption:
      "Cismi kaydır (f = 4). 2F'nin dışında görüntü küçük ve ters, F ile 2F arasında büyük ve ters, F ile ayna arasında sanal, düz ve büyük olur.",
    alt: "Çukur ayna için ışın çizimi: cisim oku, paralel gelip odaktan geçen ışın, tepeye gelip simetrik yansıyan ışın ve oluşan görüntü oku.",
    param: { label: "Cisim uzaklığı u", min: 1, max: 12, step: 0.5, init: 10 },
    draw: (u) => rayDiagram("mirror", 4, u),
  },
  "Özel ışınları yansıma yasasından türet": {
    caption:
      "Üç özel ışın: asal eksene paralel gelen odaktan geçer; odaktan gelen paralel döner; merkezden gelen normal boyunca geldiği için kendi yolundan geri döner.",
    alt: "Çukur ayna; adıma göre paralel–odak, odak–paralel ve merkez–geri dönüş ışınlarından biri çizili.",
    steps: ["Paralel → odaktan geçer", "Odaktan → paralel çıkar", "Merkezden → geri döner"],
    draw: (_, step) => {
      const f = 3;
      const els: El[] = [
        seg(v(-8, 0), v(1, 0), { tone: "muted", thin: true }),
        poly(Array.from({ length: 21 }, (_, i) => { const y = -3 + (6 * i) / 20; return v(-0.03 * y * y, y); }), { open: true, bold: true }),
        pt(v(-f, 0), "F", "s", "a"),
        pt(v(-2 * f, 0), "M", "s"),
      ];
      const h = 2;
      if (step === 0) els.push(...ray(v(-8, h), v(0, h), "a"), ...ray(v(0, h), add(v(-f, 0), mul(unit(v(-f, -h)), 2.5)), "a"));
      if (step === 1) {
        const P = v(0, h);
        const S = add(v(-f, 0), mul(unit(sub(v(-f, 0), P)), 2));
        els.push(...ray(S, P, "c"), ...ray(P, v(-8, h), "c"));
      }
      if (step === 2) {
        const P = v(0, 1.5);
        const S = add(v(-2 * f, 0), mul(unit(sub(v(-2 * f, 0), P)), 1.5));
        els.push(...ray(S, P, "b"), seg(P, S, { tone: "b", dash: true, thin: true }), right(P, v(0, 3), S, "muted"));
      }
      return { els };
    },
  },
  "Gerçek ile sanal, ışınla uzantı ayrımıdır": {
    caption:
      "Yansıyan ışınlar gerçekten buluşursa görüntü gerçektir (ilk adım). Yalnız kesikli geri uzantılar buluşursa görüntü sanaldır ve aynanın arkasındadır (ikinci adım).",
    alt: "Çukur aynada iki durum: önce yansıyan ışınların önde kesiştiği gerçek görüntü, sonra uzantıların arkada kesiştiği sanal görüntü.",
    steps: ["u = 10: gerçek görüntü", "u = 2: sanal görüntü"],
    draw: (_, step) => rayDiagram("mirror", 4, step === 0 ? 10 : 2),
  },
  "İki odak çevresindeki beş konum": {
    caption:
      "Çukur aynada cismin bölgesi görüntüyü belirler. Numaralı beş konumun sonucu alttadır; bunlar ezber değil, v = fu/(u − f) bağıntısının farklı aralıklarıdır.",
    alt: "Asal eksen üzerinde ayna, F ve 2F işaretli; cismin beş konumu 1'den 5'e numaralı.",
    draw: () => {
      const f = 2;
      const xs = [-6, -4, -3, -2, -1];
      return {
        els: [
          seg(v(-7, 0), v(0.4, 0), { tone: "muted" }),
          poly(Array.from({ length: 21 }, (_, i) => { const y = -1.6 + (3.2 * i) / 20; return v(-0.03 * y * y, y); }), { open: true, bold: true }),
          pt(v(-f, 0), "F", "s", "a"),
          pt(v(-2 * f, 0), "2F", "s", "a"),
          ...xs.flatMap((x, i) => [seg(v(x, 0), v(x, 0.9), { tone: "b" }), txt(v(x, 0.9), String(i + 1), "n", { tone: "b", bold: true })]),
        ],
        readout: [
          "1) u > 2f: F–2F arası, gerçek, ters, küçük",
          "2) u = 2f: 2F'de, gerçek, ters, eş boy",
          "3) f < u < 2f: 2F dışı, gerçek, ters, büyük",
          "4) u = f: sonlu görüntü yok",
          "5) u < f: arkada, sanal, düz, büyük",
        ],
      };
    },
  },
  "Odakta sonlu görüntü çizme": {
    caption:
      "Cisim tam odaktayken (u = f) yansıyan ışınlar paralel çıkar; buluşmazlar. Sonlu bir görüntü çizilmez, “sonsuzda görüntü” bu sınırın adıdır.",
    alt: "Çukur aynanın odağında duran cisim; yansıyan iki ışın birbirine paralel ilerliyor.",
    draw: () => rayDiagram("mirror", 4, 4),
  },
  "Tümsek aynadaki dar görüntüyü açıkla": {
    caption:
      "Tümsek aynada (f = −4) gerçek cisim nerede olursa olsun görüntü aynanın arkasında, F ile tepe arasında, sanal, düz ve küçüktür. Cismi yaklaştır: görüntü büyür ama 1'e ulaşmaz.",
    alt: "Tümsek ayna ışın çizimi: paralel gelen ışın odaktan geliyormuş gibi dağılıyor, uzantılar aynanın arkasında küçük düz görüntüde buluşuyor.",
    param: { label: "Cisim uzaklığı u", min: 1, max: 12, step: 0.5, init: 6 },
    draw: (u) => rayDiagram("mirror", -4, u),
  },
  "Her sonuca üç kontrol koy": {
    caption:
      "f = 10 cm, u = 30 cm: v = 15 cm, m = −0,5. Cisim 2F'nin dışında olduğu için görüntü F ile 2F arasında, ters ve yarı boydadır: çizim, formül ve bölge aynı şeyi söyler.",
    alt: "Çukur ayna, odak 10 ve merkez 20 cm'de; 30 cm'deki cisim ve 15 cm'deki ters, yarı boy görüntü.",
    draw: () => rayDiagram("mirror", 10, 30, 4),
  },
};

const kirilma: Record<string, FigureDef> = {
  "İndis hangi sürati karşılaştırır?": {
    caption:
      "n = c/v: indis büyüdükçe ortamdaki ışık sürati küçülür. Hava ≈ 1, su ≈ 1,33, cam ≈ 1,5 için sürat çubukları c'nin kesri olarak çizildi.",
    alt: "Üç yatay çubuk: hava, su ve cam için ışık süratinin c'ye oranı; hava en uzun, cam en kısa.",
    draw: () => {
      const rows: [string, number][] = [
        ["hava (n ≈ 1)", 1],
        ["su (n ≈ 1,33)", 1 / 1.33],
        ["cam (n ≈ 1,5)", 1 / 1.5],
      ];
      return {
        els: rows.flatMap(([name, r], i) => [
          poly([v(0, -i * 1.2), v(8 * r, -i * 1.2), v(8 * r, -i * 1.2 + 0.7), v(0, -i * 1.2 + 0.7)], { fill: "b", tone: "b" }),
          txt(v(-0.3, -i * 1.2 + 0.35), name, "w", { small: true }),
          txt(v(8 * r + 0.2, -i * 1.2 + 0.35), `${fmt(r, 2)}c`, "e", { small: true, tone: "b" }),
        ]),
      };
    },
  },
  "Normal çizmeden açı seçme": {
    caption:
      "Havadan (n₁ = 1) cama (n₂ = 1,5) geçen ışın normale yaklaşır. Gelme açısını değiştir: n₁ sin i = n₂ sin r her açıda sağlanır.",
    alt: "Yatay ara yüzey, kesikli normal; üstten gelen ışın ve alttaki ortamda normale yaklaşarak kırılan ışın, i ve r açıları işaretli.",
    param: { label: "Gelme açısı i", min: 0, max: 80, step: 5, init: 40, unit: "°" },
    draw: (i) => {
      const { els, r } = refraction(i, 1, 1.5);
      return { els, readout: [`1 · sin ${i}° = 1,5 · sin r → r ≈ ${fmt(r ?? 0, 1)}°`] };
    },
  },
  "Kaynak frekansını sınırda koru": {
    caption:
      "Boşlukta 600 nm olan ışık n = 1,5 ortamda 400 nm dalga boyuna iner; frekansı 5×10¹⁴ Hz olarak kalır. Tepeler sıklaşır, saniyede geçen tepe sayısı aynıdır.",
    alt: "Soldan sağa ilerleyen dalga; sol bölgede uzun dalga boylu, ara yüzeyden sonra sağ bölgede daha kısa dalga boylu.",
    draw: () => {
      const pts: V[] = [];
      for (let k = 0; k <= 240; k++) {
        const x = (k / 240) * 12;
        const phase = x <= 6 ? (2 * Math.PI * x) / 3 : (2 * Math.PI * 6) / 3 + (2 * Math.PI * (x - 6)) / 2;
        pts.push(v(x, Math.sin(phase)));
      }
      return {
        els: [
          poly([v(6, -1.6), v(12, -1.6), v(12, 1.6), v(6, 1.6)], { fill: "b", tone: "b", thin: true }),
          poly(pts, { open: true, tone: "a" }),
          ...span(v(0.75, 1), v(3.75, 1), "600 nm", v(2, -1), "a"),
          ...span(v(6.5, 1), v(8.5, 1), "400 nm", v(7, -1), "a"),
          txt(v(3, -1.9), "boşluk", "c", { small: true }),
          txt(v(9, -1.9), "n = 1,5", "c", { small: true, tone: "b" }),
        ],
        readout: ["f = c/λ = 3×10⁸ / 600×10⁻⁹ = 5×10¹⁴ Hz (her iki ortamda)"],
      };
    },
  },
  "Geçiş ve yansıma birlikte bulunabilir": {
    caption:
      "Sınıra gelen ışığın bir kısmı aynı ortama i açısıyla yansır, bir kısmı kırılarak geçer. Snell yasası yalnız kırılan ışının yönünü verir; enerji paylarını vermez.",
    alt: "Ara yüzeyde gelen ışın, aynı ortama yansıyan ince ışın ve alttaki ortama kırılan ışın.",
    draw: () => {
      const { els } = refraction(40, 1, 1.5);
      const P = v(0, 0);
      const refl = add(P, mul(pol(1, 50), 3));
      return { els: [...els, ...ray(P, refl, "c"), ang(P, v(0, 1), refl, "40°", { r: 88, tone: "c" })] };
    },
  },
  "Sınır açısının varlık koşulunu önce sor": {
    caption:
      "Camdan (1,5) havaya (1) çıkan ışın normalden uzaklaşır. i'yi artır: sin i_c = 1/1,5 ile i_c ≈ 41,8°. Daha büyük açıda ışık geçmez, tamamen geri yansır.",
    alt: "Üstte cam, altta hava; gelme açısı sürgüyle artıyor, kritik açıdan sonra kırılan ışın kayboluyor ve ışın yansıyor.",
    param: { label: "Gelme açısı i", min: 10, max: 70, step: 2, init: 30, unit: "°" },
    draw: (i) => {
      const { els, r } = refraction(i, 1.5, 1);
      const ic = asinDeg(1 / 1.5);
      return {
        els,
        readout: [
          r === undefined
            ? `i = ${i}° > i_c ≈ ${fmt(ic, 1)}°: tam iç yansıma`
            : `i = ${i}° < i_c ≈ ${fmt(ic, 1)}°: r ≈ ${fmt(r, 1)}°`,
        ],
      };
    },
  },
  "Görünür derinlik gerçek yer değiştirme değildir": {
    caption:
      "Sudaki cisimden çıkan ışın havaya geçerken normalden uzaklaşır; göz onu geriye uzatınca cismi daha sığda görür: 3 m derinlik yaklaşık 2,25 m görünür.",
    alt: "Su yüzeyi, 3 m derinlikte cisim, cisimden çıkıp yüzeyde kırılan ışın ve gözün geri uzattığı kesikli doğru; görünen konum 2,25 m derinlikte.",
    draw: () => {
      const O = v(0, -3);
      const S = v(0.3, 0);
      const tanR = 0.3 / 3;
      const sinR = tanR / Math.sqrt(1 + tanR * tanR);
      const sinI = (4 / 3) * sinR;
      const dir = v(sinI, Math.sqrt(1 - sinI * sinI));
      const app = v(0, -0.3 / (dir[0] / dir[1]));
      return {
        els: [
          poly([v(-2, 0), v(2.5, 0), v(2.5, -3.6), v(-2, -3.6)], { fill: "b", tone: "b", thin: true }),
          seg(v(0, 0), v(0, -3.6), { tone: "muted", dash: true, thin: true }),
          ...ray(O, S, "a"),
          ...ray(S, add(S, mul(dir, 2.5)), "a"),
          seg(S, app, { dash: true, thin: true, tone: "a" }),
          pt(O, "gerçek 3 m", "w"),
          pt(app, "görünen", "w", "a", true),
        ],
        readout: ["h′ = 3 · 1/(4/3) = 2,25 m (dik bakışa yakın)"],
      };
    },
  },
  "Paralel levhada çıkış yönünü denetle": {
    caption:
      "n = 1,5 levhaya 50° ile giren ışın içeride normale yaklaşır, çıkışta aynı açıyla açılır: çıkan ışın gelen ışına paraleldir ama yana kaymıştır.",
    alt: "Paralel yüzlü cam levha; üstten eğik gelen ışın, levha içindeki kırılmış yol ve alttan çıkan, gelene paralel ama yana kaymış ışın; gelen ışının uzantısı kesikli.",
    draw: () => {
      const t = 2;
      const i = 50;
      const r = asinDeg(Math.sin(deg2(i)) / 1.5);
      const P = v(0, 0);
      const Q = v(t * Math.tan(deg2(r)), -t);
      const inDir = pol(1, -90 + i);
      const start = sub(P, mul(inDir, 2.5));
      const out = add(Q, mul(inDir, 2.5));
      return {
        els: [
          poly([v(-3, 0), v(5, 0), v(5, -t), v(-3, -t)], { fill: "b", tone: "b", thin: true }),
          ...ray(start, P, "a"),
          ...ray(P, Q, "a"),
          ...ray(Q, out, "a"),
          seg(P, add(P, mul(inDir, 4)), { dash: true, thin: true, tone: "muted" }),
          ang(P, v(0, 1), start, "50°", { r: 40 }),
          ang(Q, v(Q[0], -t - 1), out, "50°", { r: 40 }),
          txt(v(4.6, -1), "n = 1,5", "w", { small: true, tone: "b" }),
        ],
        readout: [`İçeride r ≈ ${fmt(r, 1)}° · çıkış 50°: gelen ile paralel`],
      };
    },
  },
  "Uygulama koşullarını sorgula": {
    caption:
      "Çekirdek 1,50, kılıf 1,20: sin i_c = 0,80. Çekirdek duvarının normaline 60° ile gelen ışında sin 60° ≈ 0,866 > 0,80, ışın her çarpmada tam yansır ve fiber boyunca ilerler.",
    alt: "İki paralel çizgi arasında çekirdek; içinde duvarlara 60° normal açıyla çarpıp zikzak çizerek ilerleyen ışın; dışta kılıf bölgesi.",
    draw: () => {
      const H = 1;
      const run = H * Math.tan(deg2(60));
      const pts: V[] = [v(0, -0.5)];
      let y = H;
      let x = run / 2;
      for (let k = 0; k < 5; k++) {
        pts.push(v(x, y === H ? 0.5 : -0.5));
        x += run;
        y = -y;
      }
      const P = pts[1];
      return {
        els: [
          poly([v(-0.5, -1), v(10, -1), v(10, 1), v(-0.5, 1)], { fill: "muted", thin: true, tone: "muted" }),
          poly([v(-0.5, -0.5), v(10, -0.5), v(10, 0.5), v(-0.5, 0.5)], { fill: "b", tone: "b" }),
          poly(pts, { open: true, tone: "a" }),
          seg(P, v(P[0], -0.2), { dash: true, thin: true, tone: "muted" }),
          ang(P, v(P[0], -0.2), pts[0], "60°", { r: 34 }),
          txt(v(10, 0.75), "kılıf 1,20", "e", { small: true, tone: "muted" }),
          txt(v(10, 0), "çekirdek 1,50", "e", { small: true, tone: "b" }),
        ],
      };
    },
  },
};

const mercekler: Record<string, FigureDef> = {
  "Biçim ve davranış aynı kelime değildir": {
    caption:
      "Havada ince kenarlı (bikonveks) cam paralel ışınları toplar, kalın kenarlı (bikonkav) cam dağıtır. Mercek çevresinden düşük indisli olursa bu davranış tersine döner.",
    alt: "Solda bikonveks mercek, paralel üç ışın arkadaki odakta toplanıyor; sağda bikonkav mercek, paralel ışınlar dağılıyor ve uzantıları öndeki odaktan geliyor.",
    draw: () => {
      const lens = (cx: number, conv: boolean) => {
        const pts: V[] = [];
        const H = 1.8;
        const t = conv ? 0.35 : -0.25;
        const e = conv ? 0.06 : 0.4;
        for (let i = 0; i <= 20; i++) { const y = -H + (2 * H * i) / 20; pts.push(v(cx + e + t * (1 - (y / H) ** 2), y)); }
        for (let i = 20; i >= 0; i--) { const y = -H + (2 * H * i) / 20; pts.push(v(cx - (e + t * (1 - (y / H) ** 2)), y)); }
        return poly(pts, { fill: "b", tone: "b", thin: true });
      };
      const els: El[] = [lens(0, true), lens(9, false), seg(v(-3, 0), v(4, 0), { tone: "muted", thin: true }), seg(v(6, 0), v(13, 0), { tone: "muted", thin: true })];
      for (const y of [-1.2, 0, 1.2]) {
        els.push(...ray(v(-3, y), v(0, y), "a"), ...ray(v(0, y), add(v(3, 0), mul(unit(v(3, -y)), 1)), "a"));
        const P = v(9, y);
        const d = unit(sub(P, v(6.5, 0)));
        els.push(...ray(v(6, y), P, "c"), ...ray(P, add(P, mul(d, 3)), "c"));
        if (y !== 0) els.push(seg(P, v(6.5, 0), { dash: true, thin: true, tone: "c" }));
      }
      els.push(pt(v(3, 0), "F", "s", "a"), pt(v(6.5, 0), "F", "s", "c"));
      return { els };
    },
  },
  "İki odak ve üç temel ışın": {
    caption:
      "Yakınsak mercekte (f = 4, u = 10): paralel gelen ışın arkadaki odaktan geçer, merkezden geçen ışın sapmaz. İki ışının kesiştiği yer görüntünün ucudur.",
    alt: "Yakınsak mercek ışın çizimi: 10 birim uzaktaki cisim, paralel ve merkezi ışınlar, arkada ters ve küçük gerçek görüntü.",
    draw: () => rayDiagram("lens", 4, 10),
  },
  "İşaret kuralını aynadan bilinçli ayır": {
    caption:
      "Mercekte ışık karşı tarafa geçer: gerçek görüntü çıkış tarafında (v > 0), sanal görüntü cismin tarafında (v < 0). Aynada ise gerçek görüntü cismin tarafındadır.",
    alt: "Mercek ve asal eksen; sol taraf giriş (u > 0, sanal görüntü v < 0), sağ taraf çıkış (gerçek görüntü v > 0) olarak etiketli.",
    draw: () => ({
      els: [
        seg(v(-6, 0), v(6, 0), { tone: "muted" }),
        seg(v(0, -2), v(0, 2), { tone: "b", bold: true }),
        vec(v(-5.5, 1.4), v(-1, 1.4), { tone: "a" }),
        txt(v(-3.2, 1.6), "ışık", "n", { small: true, tone: "a" }),
        txt(v(-3.2, -0.7), "giriş: cisim u > 0", "c", { small: true }),
        txt(v(-3.2, -1.4), "sanal görüntü v < 0", "c", { small: true, tone: "c" }),
        txt(v(3.2, -0.7), "çıkış: gerçek görüntü v > 0", "c", { small: true, tone: "a" }),
      ],
    }),
  },
  "Yakınsak mercekte cismi odakla karşılaştır": {
    caption:
      "Cismi kaydır (f = 4). 2F dışında görüntü küçük ve ters, F ile 2F arasında büyük ve ters; F içinde aynı tarafta sanal, düz ve büyük (büyüteç).",
    alt: "Yakınsak mercek ışın çizimi; cisim uzaklığı sürgüyle değişiyor ve görüntünün yeri, boyu ve türü değişiyor.",
    param: { label: "Cisim uzaklığı u", min: 1, max: 12, step: 0.5, init: 6 },
    draw: (u) => rayDiagram("lens", 4, u),
  },
  "Iraksak merceğin gerçek cismi": {
    caption:
      "Iraksak mercekte (f = −4) gerçek cisim için görüntü hep cismin tarafında, sanal, düz ve küçüktür. Cismi yaklaştır: görüntü büyür ama 1'e ulaşmaz.",
    alt: "Iraksak mercek ışın çizimi: paralel ışın dağılıyor, geri uzantısı öndeki odaktan geçiyor; merkezi ışınla birlikte küçük düz sanal görüntü.",
    param: { label: "Cisim uzaklığı u", min: 1, max: 12, step: 0.5, init: 6 },
    draw: (u) => rayDiagram("lens", -4, u),
  },
  "Bağıl indis odağı gerçekten değiştirir": {
    caption:
      "n = 1,5, R = 10 cm bikonveks mercek havada f = 10 cm ile toplar. Aynı mercek n = 1,6 ortama alınınca f = −80 cm olur: biçim aynı, davranış ıraksak.",
    alt: "İlk adımda havadaki bikonveks mercek paralel ışınları topluyor; ikinci adımda daha yüksek indisli ortamda aynı mercek ışınları dağıtıyor.",
    steps: ["Havada: n_o = 1", "n_o = 1,6 ortamında"],
    draw: (_, step) => {
      const f = step === 0 ? 10 : -80;
      const els: El[] = [
        ...(step === 1 ? [poly([v(-8, -3), v(8, -3), v(8, 3), v(-8, 3)], { fill: "muted", thin: true, tone: "muted" })] : []),
        seg(v(-8, 0), v(8, 0), { tone: "muted", thin: true }),
      ];
      const H = 2.2;
      const pts: V[] = [];
      for (let i = 0; i <= 20; i++) { const y = -H + (2 * H * i) / 20; pts.push(v(0.06 + 0.35 * (1 - (y / H) ** 2), y)); }
      for (let i = 20; i >= 0; i--) { const y = -H + (2 * H * i) / 20; pts.push(v(-(0.06 + 0.35 * (1 - (y / H) ** 2)), y)); }
      els.push(poly(pts, { fill: "b", tone: "b", thin: true }));
      for (const y of [-1.4, 1.4]) {
        const P = v(0, y);
        const d = f > 0 ? unit(sub(v(f * 0.6, 0), P)) : unit(sub(P, v(f * 0.6, 0)));
        els.push(...ray(v(-8, y), P, "a"), ...ray(P, add(P, mul(d, 7)), "a"));
      }
      return { els, readout: [step === 0 ? "1/f = (1,5/1 − 1)·2/10 → f = 10 cm" : "1/f = (1,5/1,6 − 1)·2/10 → f = −80 cm"] };
    },
  },
  "Eğrilik, renk ve model koşulları": {
    caption:
      "Olağan camda mor ışık kırmızıdan biraz daha fazla kırılır: mor odak merceğe daha yakındır. Bu fark renk sapmasıdır ve tek renkli modelde hesaplanmaz.",
    alt: "Yakınsak mercek; paralel gelen beyaz ışın, mor ışınlar daha yakın, kırmızı ışınlar daha uzak bir odakta toplanıyor.",
    draw: () => {
      const els: El[] = [seg(v(-5, 0), v(8, 0), { tone: "muted", thin: true }), seg(v(0, -2), v(0, 2), { tone: "b", bold: true })];
      for (const y of [-1.5, 1.5]) {
        const P = v(0, y);
        els.push(...ray(v(-5, y), P, "c"));
        els.push(seg(P, add(P, mul(unit(sub(v(5, 0), P)), 7.2)), { tone: "warn" }));
        els.push(seg(P, add(P, mul(unit(sub(v(4.4, 0), P)), 6.6)), { tone: "b" }));
      }
      els.push(pt(v(4.4, 0), "F mor", "s", "b"), pt(v(5, 0), "F kırmızı", "n", "warn"));
      return { els };
    },
  },
  "Çizim ile hesabı birlikte denetle": {
    caption:
      "u = f olduğunda yakınsak mercekten çıkan ışınlar paraleldir; sonlu görüntü oku çizilmez. Bu, merceğin hiç kırmadığı indis eşleşmesi durumundan farklıdır.",
    alt: "Yakınsak merceğin odağındaki cisimden çıkan iki ışın mercekten paralel çıkıyor.",
    draw: () => rayDiagram("lens", 4, 4),
  },
};

const golge: Record<string, FigureDef> = {
  ...lightTransmissionFigures,
  ...pointSphereShadowFigures,
  ...coaxialShadowFigures,
  ...equalExtendedShadowFigures,
  ...stackedPointShadowFigures,
  ...extendedShadowConeFigures,
  "Işık yolu ve opak engel": {
    caption:
      "Noktasal kaynaktan çıkan doğrusal ışınlar opak engelin iki ucuna teğet geçer. Aradaki bölgeye doğrudan ışık ulaşmaz: perdede tam gölge oluşur.",
    alt: "Solda noktasal kaynak, ortada opak düşey engel, sağda perde; engelin uçlarından geçen iki sınır ışını ve perdedeki koyu gölge bölgesi.",
    draw: () => shadowScene(2, 6, 1),
  },
  "Tek noktasal kaynakta sınırlar": {
    caption:
      "Cismi kaynağa yaklaştır ya da uzaklaştır. Gölge boyu H = (b/a)·h; burada a kaynak–cisim, b kaynak–perde uzaklığıdır (b ≠ cisim–perde uzaklığı).",
    alt: "Noktasal kaynak, sürgüyle yeri değişen opak cisim ve sabit perde; sınır ışınları ve perdedeki gölge boyu.",
    param: { label: "a = kaynak–cisim", min: 1, max: 6, step: 0.5, init: 2 },
    draw: (a) => shadowScene(a, 8, 1),
  },
  "Kaynağa ve perdeye yaklaşmayı ayrı değiştir": {
    caption:
      "İlk adımda cisim kaynağa yaklaşır (a küçülür), ikinci adımda perde uzaklaşır (b büyür). İkisi de gölgeyi büyütür ama farklı işlemlerdir.",
    alt: "Kaynak, cisim ve perde düzeni; adıma göre cismin ya da perdenin yeri değişmiş ve gölge boyu yazılı.",
    steps: ["a = 3, b = 6", "Cisim yaklaştı: a = 2", "Perde uzaklaştı: b = 9"],
    draw: (_, step) => shadowScene(step === 1 ? 2 : 3, step === 2 ? 9 : 6, 1),
  },
  "İki kaynakta her gölgeyi ayrı çiz": {
    caption:
      "İki noktasal kaynağın gölgelerini ayrı ayrı çiz. İki gölgenin örtüştüğü yer tam gölge, yalnız birinin gölgesinde kalan yer yarı gölgedir.",
    alt: "Üst üste iki noktasal kaynak, opak engel ve perde; her kaynaktan iki sınır ışını; perdede ortada tam gölge, iki yanda yarı gölge bölgeleri.",
    draw: () => twoSources(0.3),
  },
  "Örtüşme var mı, önce onu sor": {
    caption:
      "Kaynakları birbirinden ayır: iki gölge zıt yönlere kayar, ortak tam gölge daralır ve sonunda kaybolabilir; geriye yalnız yarı gölgeler kalır.",
    alt: "İki kaynak arası uzaklık sürgüyle değişiyor; perdedeki tam gölge ve yarı gölge aralıkları değişiyor.",
    param: { label: "Kaynaklar arası yarı uzaklık", min: 0.1, max: 1.2, step: 0.05, init: 0.3 },
    draw: (s) => twoSources(s),
  },
  "Geniş kaynakta görünür kısmı düşün": {
    caption:
      "Kaynak engelden büyükse tam gölge koniye benzer ve belirli uzaklıkta biter. Daha uzaktaki perde noktaları kaynağın kenarlarını görür: yalnız yarı gölge kalır.",
    alt: "Solda büyük kaynak, ortada daha küçük engel; kaynağın uçlarından engelin uçlarına çizilen ışınlar engelin arkasında kesişip daralan bir tam gölge bölgesi oluşturuyor.",
    draw: () => {
      const S1 = v(0, 1.5);
      const S2 = v(0, -1.5);
      const E1 = v(3, 0.6);
      const E2 = v(3, -0.6);
      const apex = v(3 + (0.6 * 3) / 0.9, 0);
      const far = (a: V, b: V) => add(b, mul(unit(sub(b, a)), 6));
      return {
        els: [
          seg(S1, S2, { tone: "a", bold: true }),
          seg(E1, E2, { bold: true }),
          poly([E1, E2, apex], { fill: "muted", tone: "muted", thin: true }),
          seg(S1, far(S1, E1), { tone: "a", thin: true }),
          seg(S2, far(S2, E2), { tone: "a", thin: true }),
          seg(S1, far(S1, E2), { tone: "c", thin: true, dash: true }),
          seg(S2, far(S2, E1), { tone: "c", thin: true, dash: true }),
          txt(apex, "tam gölge burada biter", "s", { small: true }),
          txt(v(0, 1.7), "geniş kaynak", "n", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "Gözlemci ve perde aynı kanıtı paylaşır": {
    caption:
      "Perde noktasından kaynağa geri bak: engel kaynağın tamamını örtüyorsa tam gölge, bir kısmını örtüyorsa yarı gölge, hiç örtmüyorsa aydınlık.",
    alt: "Geniş kaynak, engel ve perde üzerinde üç gözlem noktası; her noktadan kaynağa giden görüş çizgileri engelle kesilmiş ya da kesilmemiş.",
    draw: () => {
      const S1 = v(0, 1.2);
      const S2 = v(0, -1.2);
      const E1 = v(3, 0.7);
      const E2 = v(3, -0.7);
      const pts: [V, string, "warn" | "c" | "b"][] = [
        [v(6, 0), "tam gölge", "warn"],
        [v(6, 1.5), "yarı gölge", "c"],
        [v(6, 3.2), "aydınlık", "b"],
      ];
      return {
        els: [
          seg(S1, S2, { tone: "a", bold: true }),
          seg(E1, E2, { bold: true }),
          seg(v(6, -2), v(6, 3.6), { tone: "muted" }),
          ...pts.flatMap(([P, s, t]) => [
            seg(P, S1, { tone: t, thin: true, dash: true }),
            seg(P, S2, { tone: t, thin: true, dash: true }),
            pt(P, s, "e", t),
          ]),
        ],
      };
    },
  },
};

/** Point source at origin, opaque bar of half-height h at x = a, screen at x = b. */
function shadowScene(a: number, b: number, h: number) {
  const S = v(0, 0);
  const T = v(a, h);
  const B = v(a, -h);
  const H = (b / a) * h;
  return {
    els: [
      seg(v(b, -Math.max(H, 2) - 0.5), v(b, Math.max(H, 2) + 0.5), { tone: "muted", bold: true }),
      poly([T, B, v(b, -H), v(b, H)], { fill: "muted", tone: "muted", thin: true }),
      ...ray(S, v(b, H), "a"),
      ...ray(S, v(b, -H), "a"),
      seg(T, B, { bold: true }),
      seg(v(b, -H), v(b, H), { tone: "warn", bold: true }),
      pt(S, "kaynak", "w", "a"),
      dim(S, v(a, 0), `a = ${fmt(a)}`, v(0, 3)),
      dim(v(a, 0), T, `h = ${fmt(2 * h)}`, v(0, 0)),
      txt(v(b, H), `gölge ${fmt(2 * H, 2)}`, "ne", { small: true, tone: "warn" }),
      txt(v(0, -Math.max(H, 2) - 0.8), "", "c"),
    ],
    readout: [`H = (b/a)·h = (${fmt(b)}/${fmt(a)})·${fmt(2 * h)} = ${fmt(2 * H, 2)}`],
  };
}

/** Two point sources at (0, ±s), bar ±0.6 at x = 3, screen at x = 8. */
function twoSources(s: number) {
  const a = 3;
  const b = 8;
  const h = 0.6;
  const proj = (sy: number, ey: number) => sy + ((ey - sy) * b) / a;
  const A1 = proj(s, h);
  const A2 = proj(s, -h);
  const B1 = proj(-s, h);
  const B2 = proj(-s, -h);
  // Interval shadowed by each source on the screen (lower, upper).
  const I1: [number, number] = [Math.min(A1, A2), Math.max(A1, A2)];
  const I2: [number, number] = [Math.min(B1, B2), Math.max(B1, B2)];
  const lo = Math.max(I1[0], I2[0]);
  const hi = Math.min(I1[1], I2[1]);
  const els: El[] = [
    seg(v(b, -5), v(b, 5), { tone: "muted", bold: true }),
    seg(v(a, -h), v(a, h), { bold: true }),
    seg(v(0, s), v(b, A1), { tone: "a", thin: true }),
    seg(v(0, s), v(b, A2), { tone: "a", thin: true }),
    seg(v(0, -s), v(b, B1), { tone: "c", thin: true }),
    seg(v(0, -s), v(b, B2), { tone: "c", thin: true }),
    seg(v(b + 0.25, I1[0]), v(b + 0.25, I1[1]), { tone: "a", bold: true }),
    seg(v(b + 0.5, I2[0]), v(b + 0.5, I2[1]), { tone: "c", bold: true }),
    pt(v(0, s), "K₁", "nw", "a"),
    pt(v(0, -s), "K₂", "sw", "c"),
  ];
  if (hi > lo) els.push(seg(v(b + 0.75, lo), v(b + 0.75, hi), { tone: "warn", bold: true }), txt(v(b + 0.9, (lo + hi) / 2), "tam gölge", "e", { small: true, tone: "warn" }));
  return {
    els,
    readout: [hi > lo ? `Tam gölge genişliği ≈ ${fmt(hi - lo, 2)}` : "Ortak tam gölge yok: yalnız yarı gölgeler"],
  };
}

export const physicsFiguresOptics: Record<string, Record<string, FigureDef>> = {
  "duzlem-ayna": duzlemAyna,
  "kuresel-aynalar": kureselAynalar,
  "isigin-kirilmasi": kirilma,
  mercekler,
  "golge-yari-golge": golge,
};

