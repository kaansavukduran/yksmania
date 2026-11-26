import { add, circle, mul, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { enText209 } from "../depth209";
import {
  EN_CUE220, LEWIS220, acceptorPairs220, bondRows220, bondTypeSection220, centralLonePairs220, covalentNameSection220, covalentSet220,
  donorH220, gridAnions220, gridCations220, hBondPure220, hbondCountSection220, hbondIds220, interactions220, ionText220, isPolar220,
  lewisCountText220, moleculeFormula220, moleculeName220, nameGridSection220, polarText220, prefix220, saltGrid220, weakMolecules220,
  weakSection220, type Lewis220, type LewisId220,
} from "../depth220";

/*
 * 0.220 kimyasal bağ tablo bölümlerinin çizimleri. Her etiket ve okuma
 * depth220 verisinden gelir. Lewis çizimleri bağ ve çift sayısını gösteren
 * düzlem şemalardır; bağ açılarını ve molekül şeklini ölçekli göstermez.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill: boolean): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: !fill });
const frame = (a: V, b: V): El[] => [txt(a, " ", "c"), txt(b, " ", "c")];
const cueText = enText209(EN_CUE220).replace(/0$/, "");

/* ---------- 1 · ΔEN sayı doğrusu ---------- */

const K = 2.2;
const above = bondRows220.filter(({ type }) => type === "iyonik").sort((a, b) => a.d - b.d);
const below = bondRows220.filter(({ type }) => type !== "iyonik").sort((a, b) => a.d - b.d);
const levelOf = new Map<(typeof bondRows220)[number], number>();
[above, below].forEach((side) => side.forEach((row, i) => levelOf.set(row, (i % 3) + 1)));
const enMax = Math.max(...bondRows220.map(({ d }) => d));
const axisEnd = Math.ceil(enMax * 2) / 2;
const tick = (t: number) => enText209(t).replace(/,?0+$/, "") || "0";
const bondLine: FigureDef = {
  caption: `Pauling elektronegatiflik farkları aynı sayı doğrusunda. Doğrunun üstünde iyonik (metal–ametal), altında kovalent (ametal–ametal) çiftler var. Kesikli çizgi ${cueText}’deki kaba ipucudur. Adımla bir çift seç: üst ve alt taraf sınıftan gelir, çizginin solu ya da sağı değil.`,
  alt: `Yatay ΔEN ekseni 0’dan ${tick(axisEnd)}’e. Eksenin üstünde ${above.length} iyonik çift, altında ${below.length} kovalent çift etiketli; ${cueText}’de dikey kesikli çizgi. Seçilen çiftin etiketi renkli ve kalın.`,
  steps: bondRows220.map(({ a, b }) => `${a}–${b}`),
  draw: (_value, step) => {
    const sel = bondRows220[step];
    const els: El[] = [seg(v(0, 0), v(axisEnd * K, 0), { tone: "muted" })];
    for (let t = 0; t <= axisEnd + 1e-9; t += 0.5) els.push(seg(v(t * K, -0.1), v(t * K, 0.1), { tone: "muted", thin: true }), txt(v(t * K, -0.2), tick(t), "s", { small: true, tone: "muted", soft: true }));
    els.push(seg(v(EN_CUE220 * K, -2.8), v(EN_CUE220 * K, 2.8), { dash: true, thin: true, tone: "warn" }), txt(v(EN_CUE220 * K, 3.05), `≈${cueText}`, "c", { small: true, tone: "warn" }));
    bondRows220.forEach((row) => {
      const on = row === sel;
      const side = row.type === "iyonik" ? 1 : -1;
      const h = side * (0.3 + 0.75 * levelOf.get(row)!);
      const x = row.d * K;
      els.push(
        seg(v(x, 0), v(x, h - side * 0.22), { thin: !on, tone: on ? "a" : "muted" }),
        circle(v(x, 0), 0.09, { fill: on ? "a" : row.type === "iyonik" ? "b" : "c", tone: on ? "a" : row.type === "iyonik" ? "b" : "c" }),
        txt(v(x, h), `${row.a}–${row.b}`, "c", { small: true, bold: on, tone: on ? "a" : "ink" }),
      );
    });
    els.push(txt(v(-0.2, 2.6), "iyonik", "w", { small: true, tone: "b" }), txt(v(-0.2, -2.6), "kovalent", "w", { small: true, tone: "c" }));
    els.push(...frame(v(-1.6, 3.4), v(axisEnd * K + 0.5, -3.1)));
    const misfit = (sel.type === "iyonik") !== (sel.d >= EN_CUE220);
    return {
      els,
      readout: [
        `${sel.a}–${sel.b}: ${sel.type === "iyonik" ? "metal–ametal" : "ametal–ametal"}, ΔEN = ${enText209(sel.d)} → ${sel.type}; ${sel.particle}.`,
        misfit ? `ΔEN ${cueText}’den büyük ama iki atom da ametal: kaba ipucu bu çiftte yanılır.` : `Kaba ipucu (${cueText}) bu çiftte sınıfla aynı sonucu verir.`,
      ],
    };
  },
};

/* ---------- 2 · Katyon × anyon ızgarası ---------- */

const CW0 = 1.9;
const CW = 3.1;
const RH = 1.1;
const nameGrid: FigureDef = {
  caption: "Adımla bir katyon satırı seç. Hücrelerde yükleri sıfırlayan en küçük oranla yazılmış formüller var; okuma satırdaki adları ve yük toplamlarını verir.",
  alt: `${gridCations220.length} satır ve ${gridAnions220.length} sütunluk ızgara. Üst satırda anyonlar (${gridAnions220.map(ionText220).join(", ")}), sol sütunda katyonlar (${gridCations220.map(ionText220).join(", ")}). Seçilen katyonun satırı renkli.`,
  steps: gridCations220.map(ionText220),
  draw: (_value, step) => {
    const els: El[] = [];
    gridAnions220.forEach((a, j) => els.push(txt(v(CW0 + j * CW + CW / 2, RH * 0.55), ionText220(a), "c", { small: true, bold: true, tone: "b" })));
    gridCations220.forEach((c, i) => {
      const on = i === step;
      const y = -i * RH;
      els.push(txt(v(CW0 - 0.15, y - RH / 2), ionText220(c), "w", { small: true, bold: true, tone: on ? "a" : "ink" }));
      saltGrid220[i].forEach((s, j) => {
        const x = CW0 + j * CW;
        els.push(rect(x + 0.04, x + CW - 0.04, y - RH + 0.05, y - 0.05, on ? "a" : "muted", on), txt(v(x + CW / 2, y - RH / 2), s.formula, "c", { small: true }));
      });
    });
    els.push(...frame(v(-0.1, RH * 1.1), v(CW0 + gridAnions220.length * CW + 0.1, -gridCations220.length * RH - 0.1)));
    const row = saltGrid220[step];
    return {
      els,
      readout: [
        `${ionText220(gridCations220[step])}: ${row.map((s) => `${s.formula} ${s.name}`).join("; ")}.`,
        `Yük toplamları: ${row.map((s) => `${s.nc} · (+${s.cation.charge}) + ${s.na} · (${s.anion.charge}) = 0`).join("; ").replace(/\(-(\d)\)/g, "(−$1)")}.`,
      ],
    };
  },
};

/* ---------- 3 · Ön ekten ad ---------- */

const BALL = 0.95;
const covalentBalls: FigureDef = {
  caption: "Adımla bir molekül seç. Renkli toplar iki elementin atomlarıdır; her grubun altında atom sayısının ön eki yazar. İlk element tek atomsa mono yazılmaz.",
  alt: "Yan yana iki renkte toplar: soldaki grup birinci elementin, sağdaki grup ikinci elementin atomları. Grupların altında ön ek ve element adı parçaları, en altta molekülün formülü ve adı.",
  steps: covalentSet220.map(moleculeFormula220),
  draw: (_value, step) => {
    const m = covalentSet220[step];
    const els: El[] = [];
    const x2 = m.n1 * BALL + 1.5;
    for (let i = 0; i < m.n1; i++) els.push(circle(v(i * BALL + 0.4, 0), 0.4, { fill: "a", tone: "a" }), txt(v(i * BALL + 0.4, 0), m.first, "c", { small: true, bold: true }));
    for (let i = 0; i < m.n2; i++) els.push(circle(v(x2 + i * BALL + 0.4, 0), 0.4, { fill: "b", tone: "b" }), txt(v(x2 + i * BALL + 0.4, 0), m.second, "c", { small: true, bold: true }));
    const mid1 = ((m.n1 - 1) * BALL) / 2 + 0.4;
    const mid2 = x2 + ((m.n2 - 1) * BALL) / 2 + 0.4;
    const name = moleculeName220(m);
    const [firstWord, secondWord] = name.split(" ");
    els.push(
      txt(v(mid1, -0.85), `${m.n1} → ${m.n1 === 1 ? "ön ek yok" : prefix220(m.n1)}`, "c", { small: true, tone: "a" }),
      txt(v(mid2, -0.85), `${m.n2} → ${prefix220(m.n2)}`, "c", { small: true, tone: "b" }),
      txt(v(mid1, -1.45), firstWord, "c", { small: true }),
      txt(v(mid2, -1.45), secondWord, "c", { small: true }),
      txt(v(0, -2.35), `${moleculeFormula220(m)}: ${name}`, "e", { bold: true, tone: "a" }),
    );
    els.push(...frame(v(-0.6, 0.8), v(8.0, -2.7)));
    return {
      els,
      readout: [
        `${moleculeFormula220(m)}: ${m.n1} ${m.first} + ${m.n2} ${m.second} = ${m.n1 + m.n2} atom.`,
        `${m.n1 === 1 ? "İlk element tek: ön ek yok" : `İlk ön ek ${prefix220(m.n1)}`}; ikinci ön ek ${prefix220(m.n2)} → ${name}.`,
      ],
    };
  },
};

/* ---------- Ortak Lewis çizimi ---------- */

const S = 1.25;
/** Düzlem şema konumları (ızgara birimi); yalnız çizim içindir. */
const LAYOUT: Record<LewisId220, V[]> = {
  H2O: [v(0, 0), v(-1, 0), v(0, -1)],
  NH3: [v(0, 0), v(-1, 0), v(1, 0), v(0, -1)],
  CH4: [v(0, 0), v(-1, 0), v(1, 0), v(0, 1), v(0, -1)],
  CO2: [v(0, 0), v(-1, 0), v(1, 0)],
  HCl: [v(-0.5, 0), v(0.5, 0)],
  N2: [v(-0.5, 0), v(0.5, 0)],
  O2: [v(-0.5, 0), v(0.5, 0)],
  HF: [v(-0.5, 0), v(0.5, 0)],
  H2S: [v(0, 0), v(-1, 0), v(0, -1)],
  CH3OH: [v(-0.5, 0), v(-0.5, 1), v(-0.5, -1), v(-1.5, 0), v(0.5, 0), v(0.5, -1)],
  CH3OCH3: [v(-1, 0), v(-1, 1), v(-1, -1), v(-2, 0), v(0, 0), v(1, 0), v(1, 1), v(1, -1), v(2, 0)],
};
const CARD: V[] = [v(0, 1), v(0, -1), v(1, 0), v(-1, 0)];
const same = (p: V, q: V) => Math.abs(p[0] - q[0]) < 1e-9 && Math.abs(p[1] - q[1]) < 1e-9;
/** Ortaklanmamış çiftlerin yönleri: bağların kullanmadığı dört ana yönden. */
const pairDirs = (m: Lewis220, a: number): V[] => {
  const pos = LAYOUT[m.id as LewisId220];
  const used = m.links.filter((l) => l.includes(a)).map(([p, q]) => {
    const o = p === a ? q : p;
    return v(Math.sign(pos[o][0] - pos[a][0]), Math.sign(pos[o][1] - pos[a][1]));
  });
  const free = CARD.filter((d) => !used.some((u) => same(u, d)));
  const n = m.lonePairs[a];
  const opposite = used.length === 1 ? mul(used[0], -1) : null;
  const order = n % 2 === 1 && opposite ? [opposite, ...free.filter((d) => !same(d, opposite))] : free;
  if (order.length < n) throw new Error(`depthFigures220: ${m.formula} atom ${a} için çift yeri yok`);
  return order.slice(0, n);
};
for (const m of Object.values(LEWIS220)) {
  if (LAYOUT[m.id as LewisId220].length !== m.atoms.length) throw new Error(`depthFigures220: ${m.formula} yerleşimi eksik`);
  m.atoms.forEach((_, a) => pairDirs(m, a));
}
const drawLewis = (m: Lewis220, atomTone: (a: number) => Tone, pairTone: (a: number) => Tone): El[] => {
  const pos = LAYOUT[m.id as LewisId220].map((p) => mul(p, S));
  const els: El[] = [];
  m.links.forEach(([p, q], i) => {
    const d = v(pos[q][0] - pos[p][0], pos[q][1] - pos[p][1]);
    const L = Math.hypot(d[0], d[1]);
    const u = v(d[0] / L, d[1] / L);
    const n = v(-u[1], u[0]);
    const k = m.orders[i];
    const offsets = k === 1 ? [0] : k === 2 ? [-0.1, 0.1] : [-0.15, 0, 0.15];
    for (const o of offsets) els.push(seg(add(add(pos[p], mul(u, 0.36)), mul(n, o)), add(add(pos[q], mul(u, -0.36)), mul(n, o)), { tone: "ink" }));
  });
  m.atoms.forEach((s, a) => {
    els.push(txt(pos[a], s, "c", { bold: true, tone: atomTone(a) }));
    for (const d of pairDirs(m, a)) {
      const c = add(pos[a], mul(d, 0.44));
      const n = v(-d[1], d[0]);
      const tone = pairTone(a);
      els.push(circle(add(c, mul(n, 0.11)), 0.05, { fill: tone, tone }), circle(add(c, mul(n, -0.11)), 0.05, { fill: tone, tone }));
    }
  });
  return els;
};
const LEWIS_FRAME = frame(v(-3.0, 1.9), v(3.0, -1.9));

/* ---------- 4 · Lewis sayımından kutupluluk ---------- */

const weakLewis: FigureDef = {
  caption: "Adımla bir molekül seç: Lewis şemasında çizgiler bağ çiftleri, nokta ikilileri ortaklanmamış çiftlerdir. Merkez atomdaki çiftler turuncu. Şema bağ açısını ölçekli göstermez.",
  alt: "Element sembolleri, aralarında tekli, ikili ya da üçlü bağ çizgileri ve sembollerin çevresinde nokta ikilileri. Merkez atomun çiftleri turuncu.",
  steps: weakMolecules220.map((id) => LEWIS220[id].formula),
  draw: (_value, step) => {
    const m = LEWIS220[weakMolecules220[step]];
    const lp = centralLonePairs220(m);
    const centre = lp === null ? -1 : m.links[0][0];
    const els = [...drawLewis(m, () => "ink", (a) => (a === centre ? "warn" : "b")), ...LEWIS_FRAME];
    return {
      els,
      readout: [
        `${m.formula}: ${lewisCountText220(m)}.`,
        lp === null ? `İki atomlu: ${m.atoms[0] === m.atoms[1] ? "aynı atomlar, bağ apolar" : "farklı atomlar, bağ polar"} → ${polarText220(m)}.` : `Merkez ${m.atoms[centre]}: ${lp} çift → ${polarText220(m)}${!isPolar220(m) ? " (bağ dipolleri birbirini götürür)" : ""}.`,
        `${m.formula}···${m.formula}: ${interactions220({ kind: "molecule", m }, { kind: "molecule", m }).join(", ")}.`,
      ],
    };
  },
};

/* ---------- 5 · Verici H ve alıcı çift ---------- */

const FON = new Set(["F", "O", "N"]);
const hbondLewis: FigureDef = {
  caption: "Adımla bir molekül seç. Renkli H’ler F, O ya da N’ye bağlı verici H’lerdir; turuncu nokta ikilileri F, O, N üzerindeki alıcı çiftlerdir. Diğer çiftler gri.",
  alt: "Lewis şeması: semboller, bağ çizgileri ve nokta ikilileri. Verici H sembolleri renkli, F/O/N üzerindeki çiftler turuncu, diğer atomlardaki çiftler gri.",
  steps: hbondIds220.map((id) => LEWIS220[id].formula),
  draw: (_value, step) => {
    const m = LEWIS220[hbondIds220[step]];
    const donor = (a: number) => m.atoms[a] === "H" && m.links.some((l) => l.includes(a) && FON.has(m.atoms[l[0] === a ? l[1] : l[0]]));
    const els = [...drawLewis(m, (a) => (donor(a) ? "a" : "ink"), (a) => (FON.has(m.atoms[a]) ? "warn" : "muted")), ...LEWIS_FRAME];
    const [d, acc] = [donorH220(m), acceptorPairs220(m)];
    return {
      els,
      legend: [{ code: "H", label: "verici H", tone: "a" }, { code: "··", label: "F/O/N’de alıcı çift", tone: "warn" }],
      readout: [
        `${m.formula} (${m.name}): verici H ${d}, F/O/N’de çift ${acc}.`,
        hBondPure220(m) ? "Saf hâlde kendi molekülleri arasında hidrojen bağı var." : d === 0 && acc > 0 ? "Alıcı var ama verici yok: saf hâlde hidrojen bağı yok." : "Verici de alıcı da yok: saf hâlde hidrojen bağı yok.",
      ],
    };
  },
};

export const depthFigures220: Record<string, Record<string, FigureDef>> = {
  "iyonik-bag-ve-guclu-etkilesimler": { [bondTypeSection220.title]: bondLine },
  "iyonik-bilesik-adlandirma": { [nameGridSection220.title]: nameGrid },
  "kovalent-adlandirma-metalik-bag": { [covalentNameSection220.title]: covalentBalls },
  "zayif-etkilesimler": { [weakSection220.title]: weakLewis },
  "hidrojen-bagi": { [hbondCountSection220.title]: hbondLewis },
};
