import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Ball-and-stick molecule models with shaded spheres. Atom positions are real
 * 3D directions (tetrahedral, trigonal, linear) seen from a fixed tilted view
 * and drawn back to front, so front atoms overlap rear ones as in a photo of a
 * model kit. Lone pairs are translucent lobes. Angles quoted are the school
 * reference values from the guide; arrows are relative, not measured dipoles.
 */

type P3 = [number, number, number];
const norm = ([x, y, z]: P3): P3 => {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
};
const scale = (p: P3, k: number): P3 => [p[0] * k, p[1] * k, p[2] * k];
// View: turn 28° about the vertical axis, then tilt 18° towards the viewer.
const A = (28 * Math.PI) / 180;
const B = (18 * Math.PI) / 180;
function view([x, y, z]: P3): P3 {
  const x1 = x * Math.cos(A) + z * Math.sin(A);
  const z1 = -x * Math.sin(A) + z * Math.cos(A);
  const y2 = y * Math.cos(B) - z1 * Math.sin(B);
  const z2 = y * Math.sin(B) + z1 * Math.cos(B);
  return [x1, y2, z2];
}

const ELEMENT: Record<string, { tone: Tone; r: number }> = {
  C: { tone: "muted", r: 0.42 },
  H: { tone: "ink", r: 0.26 },
  O: { tone: "warn", r: 0.4 },
  N: { tone: "b", r: 0.41 },
  F: { tone: "c", r: 0.36 },
  B: { tone: "a", r: 0.38 },
};
type Atom = { el: string; p: P3 };
type Molecule = { atoms: Atom[]; bonds: [number, number, number?][]; lone?: { from: number; dir: P3 }[] };

const TET: P3[] = [norm([1, 1, 1]), norm([1, -1, -1]), norm([-1, 1, -1]), norm([-1, -1, 1])];
/** Tetrahedron turned so one corner points straight up (lone pair on top). */
function tetUp(): P3[] {
  return [
    [0, 1, 0],
    [0.943, -0.333, 0],
    [-0.471, -0.333, 0.816],
    [-0.471, -0.333, -0.816],
  ];
}
const L = 1.25;

function draw(m: Molecule, offset: V = v(0, 0)): El[] {
  const proj = m.atoms.map((a) => view(a.p));
  const at = (i: number): V => v(proj[i][0] + offset[0], proj[i][1] + offset[1]);
  const items: { z: number; els: El[] }[] = [];
  // Lone pair lobes (behind their atom when pointing away).
  for (const lp of m.lone ?? []) {
    const d = view(scale(lp.dir, 0.95));
    const c0 = at(lp.from);
    const tip = v(c0[0] + d[0], c0[1] + d[1]);
    const mid = v(c0[0] + d[0] * 0.55, c0[1] + d[1] * 0.55);
    const len = Math.hypot(d[0], d[1]) || 0.001;
    const nx = -d[1] / len;
    const ny = d[0] / len;
    const w = 0.24;
    const pts: V[] = [c0, v(mid[0] + nx * w, mid[1] + ny * w), tip, v(mid[0] - nx * w, mid[1] - ny * w)];
    items.push({
      z: proj[lp.from][2] + d[2] * 0.6,
      els: [poly(pts, { tone: "a", fill: "a", dash: true, thin: true, smooth: true }), txt(v(tip[0] + nx * 0.02, tip[1] + 0.18 * Math.sign(d[1] || 1)), "• •", "c", { tone: "a", small: true })],
    });
  }
  // Bonds at the depth of their midpoint.
  for (const [i, j, order = 1] of m.bonds) {
    const a = at(i);
    const b = at(j);
    const z = (proj[i][2] + proj[j][2]) / 2 - 0.01;
    const els: El[] = [];
    if (order === 1) els.push(seg(a, b, { tone: "muted", bold: true }));
    else {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l = Math.hypot(dx, dy) || 1;
      const ox = (-dy / l) * 0.07;
      const oy = (dx / l) * 0.07;
      els.push(seg(v(a[0] + ox, a[1] + oy), v(b[0] + ox, b[1] + oy), { tone: "muted", bold: true }));
      els.push(seg(v(a[0] - ox, a[1] - oy), v(b[0] - ox, b[1] - oy), { tone: "muted", bold: true }));
    }
    items.push({ z, els });
  }
  m.atoms.forEach((a, i) => {
    const e = ELEMENT[a.el];
    items.push({ z: proj[i][2], els: [ball(at(i), e.r, e.tone, a.el)] });
  });
  // Far (negative z) first.
  items.sort((p, q) => p.z - q.z);
  return items.flatMap((it) => it.els);
}

const CH4: Molecule = {
  atoms: [{ el: "C", p: [0, 0, 0] }, ...TET.map((d) => ({ el: "H", p: scale(d, L) }))],
  bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
};
const tu = tetUp();
const NH3: Molecule = {
  atoms: [{ el: "N", p: [0, 0, 0] }, ...tu.slice(1).map((d) => ({ el: "H", p: scale(d, L) }))],
  bonds: [[0, 1], [0, 2], [0, 3]],
  lone: [{ from: 0, dir: tu[0] }],
};
const H2O: Molecule = {
  atoms: [
    { el: "O", p: [0, 0, 0] },
    { el: "H", p: scale(tu[1], L) },
    { el: "H", p: scale(tu[2], L) },
  ],
  bonds: [[0, 1], [0, 2]],
  lone: [
    { from: 0, dir: tu[0] },
    { from: 0, dir: tu[3] },
  ],
};
const CO2: Molecule = {
  atoms: [
    { el: "C", p: [0, 0, 0] },
    { el: "O", p: [L * 1.05, 0, 0] },
    { el: "O", p: [-L * 1.05, 0, 0] },
  ],
  bonds: [
    [0, 1, 2],
    [0, 2, 2],
  ],
};

const lonePairs: FigureDef = {
  caption:
    "İleri ile üç molekülü karşılaştır: hepsinde merkez çevresinde dört elektron bölgesi var. Ortaklanmamış çiftler (turuncu loblar) yer kaplar ama molekül şeklinin adına köşe olarak girmez: CH₄ düzgün dört yüzlü, NH₃ üçgen piramit, H₂O açısal.",
  alt: "Gölgeli küre-çubuk modeller: ortada merkez atom, çevresinde H atomları; NH₃'te bir, H₂O'da iki yarı saydam ortaklanmamış çift lobu.",
  steps: ["CH₄: 4 bağ, 0 çift", "NH₃: 3 bağ, 1 çift", "H₂O: 2 bağ, 2 çift"],
  draw: (_v, step) => {
    const m = [CH4, NH3, H2O][step];
    const info = [
      ["AX₄ · düzgün dört yüzlü · H–C–H ≈ 109,5°", "Dört eşdeğer bağ yönü; çift yok."],
      ["AX₃E · üçgen piramit · H–N–H ≈ 107°", "Çiftin daha güçlü itişi bağ açısını biraz daraltır."],
      ["AX₂E₂ · açısal (kırık doğru) · H–O–H ≈ 104,5°", "İki çift, açıyı daha da daraltır: 109,5° > 107° > 104,5°."],
    ][step];
    return { els: [...draw(m), txt(v(0, -1.75), info[0].split(" · ")[1], "c", { tone: "ink", small: true, bold: true })], readout: info };
  },
};

function dipole(a: V, b: V): El {
  // Arrow from the partly positive end towards the partly negative end.
  return vec(v(a[0] + (b[0] - a[0]) * 0.25, a[1] + (b[1] - a[1]) * 0.25 + 0.45), v(a[0] + (b[0] - a[0]) * 0.8, a[1] + (b[1] - a[1]) * 0.8 + 0.45), { tone: "c", bold: true });
}
const polarity: FigureDef = {
  caption:
    "İleri ile karşılaştır: CO₂'de iki C=O katkısı eşit ve tam zıt yönde olduğu için toplam sıfırdır (apolar). H₂O açısal olduğundan iki O–H katkısının yan bileşenleri dengelenir, açıortay yönünde net etki kalır (polar). Yeşil oklar göreli, ölçeksizdir.",
  alt: "Solda doğrusal CO₂ küre-çubuk modeli ve zıt yönlü iki ok; sağda açısal H₂O modeli, O'ya yönelen iki ok ve aşağıdan yukarı net ok.",
  steps: ["CO₂: polar bağlar, apolar molekül", "H₂O: polar bağlar, polar molekül"],
  draw: (_v, step) => {
    if (step === 0) {
      const proj = CO2.atoms.map((a) => view(a.p));
      const c = v(proj[0][0], proj[0][1]);
      const o1 = v(proj[1][0], proj[1][1]);
      const o2 = v(proj[2][0], proj[2][1]);
      return {
        els: [...draw(CO2), dipole(c, o1), dipole(c, o2), txt(v(0, -1.1), "net = 0", "c", { tone: "c", bold: true })],
        readout: ["Doğrusal ve uçlar eşdeğer: iki katkı birbirini götürür → apolar.", "C=O bağlarının kendisi polardır; iptal molekül ölçeğindedir."],
      };
    }
    const proj = H2O.atoms.map((a) => view(a.p));
    const o = v(proj[0][0], proj[0][1]);
    const h1 = v(proj[1][0], proj[1][1]);
    const h2 = v(proj[2][0], proj[2][1]);
    // Arrow along each O–H bond, from H towards O, shifted to the outer side.
    const along = (h: V, other: V): El => {
      const dx = o[0] - h[0];
      const dy = o[1] - h[1];
      const l = Math.hypot(dx, dy) || 1;
      let nx = -dy / l;
      let ny = dx / l;
      if (nx * (other[0] - h[0]) + ny * (other[1] - h[1]) > 0) {
        nx = -nx;
        ny = -ny;
      }
      const k = 0.42;
      return vec(v(h[0] + dx * 0.2 + nx * k, h[1] + dy * 0.2 + ny * k), v(h[0] + dx * 0.75 + nx * k, h[1] + dy * 0.75 + ny * k), { tone: "c", bold: true });
    };
    const toO = (h: V): El => along(h, h === h1 ? h2 : h1);
    const bis = v((h1[0] + h2[0]) / 2, (h1[1] + h2[1]) / 2);
    return {
      els: [...draw(H2O), toO(h1), toO(h2), vec(v(bis[0] * 2.1, bis[1] * 2.1), v(bis[0] * 1.15, bis[1] * 1.15), { tone: "warn", bold: true }), txt(v(bis[0] * 2.25, bis[1] * 2.25), "net etki (O'ya doğru)", "s", { tone: "warn", small: true, bold: true })],
      readout: ["Açısal düzen: yan bileşenler dengelenir, açıortay yönünde ortak etki kalır → polar.", "Eş iki bağ her zaman iptal etmez; yön de önemlidir."],
    };
  },
};

export const chemistryFiguresMolecules: Record<string, Record<string, FigureDef>> = {
  "molekul-geometrisi": {
    "Ortaklanmamış çiftler görünür şekle dahil edilmez": lonePairs,
  },
  "molekullerde-polarlik-apolarlik": {
    "CO₂ ile H₂O: eş bağların farklı yönleri": polarity,
  },
};
