import { ball, circle, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { rect } from "./mathFigures060TytKit";
import { pad } from "./physicsFigures058Kit";
import {
  ATOMIC_MASS219, MGO_RATIO219, countSci219, NA219, NA_EXP219, countRows219, countSection219, fx219, isoRows219, isoSection219, leftText219,
  massRows219, massSection219, mgoRows219, mgoSection219, molarText219, num219, realRows219, realSection219, unitWord219, sci219, sup219,
  type El219,
} from "../depth219";

/*
 * 0.219.0 mol ve temel kanunlar tablo bölümlerinin çizimleri. Her etiket ve
 * okuma depth219 verisinden gelir. Çubuk boyları satırların değerleriyle
 * orantılıdır; atom topları şematiktir, ölçekli atom boyu değildir. Adım
 * değiştirmek öğrenme kaydı üretmez.
 */

const BAR_ROW = 0.8;
/** Yatay çubuk listesi: solda etiket, çubuk boyu değerle orantılı, sağda değer. */
const barList = (x0: number, width: number, items: { label: string; value: number; text: string }[], selected: number, title: string, tone: Tone): El[] => {
  const max = Math.max(...items.map(({ value }) => value));
  const els: El[] = [txt(v(x0 - 0.3, 0.6), title, "e", { small: true, bold: true, tone: "muted" })];
  items.forEach(({ label, value, text }, i) => {
    const y = -i * BAR_ROW;
    const on = i === selected;
    const w = max > 0 ? (width * value) / max : 0;
    els.push(txt(v(x0 - 0.15, y), label, "w", { small: true, bold: on, tone: on ? tone : "ink" }));
    if (w > 0) els.push(rect(x0, y - 0.25, w, 0.5, on ? tone : "muted", true));
    els.push(txt(v(x0 + w + 0.1, y), text, "e", { small: true, bold: on, tone: on ? "ink" : "muted" }));
  });
  return els;
};

/* ---------- 1 · Kütle ve mol çubukları ---------- */

const massFigure: FigureDef = {
  caption: `Soldaki çubuklar ${massRows219.length} örneğin kütlesini, sağdakiler mol miktarını gösterir. Adımı değiştir: seçilen satırda n = m/M bölmesi ve sayılan varlık aşağıda okunur. Kütle sırası ile mol sırası aynı değildir.`,
  alt: `İki sütun yatay çubuk. Solda örnek kütleleri: ${massRows219.map(({ f, m }) => `${f.formula} ${fx219(m)} g`).join(", ")}. Sağda mol miktarları: ${massRows219.map(({ f, n }) => `${f.formula} ${fx219(n)} mol`).join(", ")}. Seçilen satır renkli.`,
  steps: massRows219.map(({ f }) => f.formula),
  draw: (_value, step) => {
    const row = massRows219[step];
    const els = [
      ...barList(1.6, 3.6, massRows219.map(({ f, m }) => ({ label: f.formula, value: num219(m), text: `${fx219(m)} g` })), step, "Örnek kütlesi", "a"),
      ...barList(8.8, 2.6, massRows219.map(({ f, n }) => ({ label: f.formula, value: num219(n), text: `${fx219(n)} mol` })), step, "n = m/M", "b"),
    ];
    return {
      els: [...els, ...pad(-0.2, 1.0, 12.9, -(massRows219.length - 1) * BAR_ROW - 0.5)],
      readout: [
        `${row.f.formula}: M = ${molarText219(row.f)}.`,
        `n = ${fx219(row.m)} g ÷ ${fx219(row.M)} g/mol = ${fx219(row.n)} mol → ${fx219(row.n)} Nₐ ${row.f.unit}.`,
      ],
    };
  },
};

/* ---------- 2 · Bir birimin atomları ve toplam atom çubukları ---------- */

const elTone: Partial<Record<El219, Tone>> = { H: "muted", O: "warn", N: "b", C: "ink", Mg: "a", Cl: "c", Na: "a" };
const countFigure: FigureDef = {
  caption: `Üstte seçilen maddenin bir molekülü ya da formül birimi, her atom bir topla gösterilir. Alttaki çubuklar ${countRows219.length} örneğin toplam atom miktarını karşılaştırır. Toplar şematiktir; bağ düzenini ve gerçek boyutu göstermez.`,
  alt: `Üstte element gruplarına ayrılmış toplar ve her grubun altında atom sayısı. Altta yatay çubuklar: ${countRows219.map(({ f, atoms }) => `${f.formula} ${fx219(atoms)} mol atom`).join(", ")}. Seçilen satır renkli.`,
  steps: countRows219.map(({ f }) => f.formula),
  maxHeight: 560,
  draw: (_value, step) => {
    const row = countRows219[step];
    const els: El[] = [];
    let x = 0.6;
    const top = 3.6;
    for (const [el, k] of row.f.parts) {
      const cols = Math.min(k, 3);
      for (let i = 0; i < k; i++) els.push(ball(v(x + (i % 3) * 0.75, top - Math.floor(i / 3) * 0.75), 0.32, elTone[el] ?? "a", el));
      els.push(txt(v(x + ((cols - 1) * 0.75) / 2, top - (Math.ceil(k / 3) - 1) * 0.75 - 0.36), `${k} ${el}`, "s", { small: true, bold: true }));
      x += cols * 0.75 + 0.7;
    }
    els.push(txt(v(x - 0.3, top), `= ${row.perUnit} atom / birim`, "e", { small: true, bold: true, tone: "a" }));
    els.push(...barList(2.6, 5.2, countRows219.map(({ f, atoms }) => ({ label: f.formula, value: num219(atoms), text: `${fx219(atoms)} mol` })), step, "Toplam atom miktarı", "a").map((e) => shift(e, -0.9)));
    return {
      els: [...els, ...pad(-0.2, top + 0.6, 12.4, -0.9 - (countRows219.length - 1) * BAR_ROW - 0.5)],
      readout: [
        `${row.f.formula} (${row.f.unit}): ${row.f.parts.map(([el, k]) => `${k} ${el}`).join(" + ")} = ${row.perUnit} atom.`,
        `${row.perUnit} × ${fx219(row.n)} mol = ${fx219(row.atoms)} mol atom = ${countSci219(row.atoms)} atom.`,
        ...(row.ions ? [`İyon sayısı: birim başına ${row.ions}; atomlar bileşimi anlatır.`] : []),
      ],
    };
  },
};
/** Çubuk listesini aşağı kaydırır. */
function shift(e: El, dy: number): El {
  if (e.k === "text") return { ...e, p: v(e.p[0], e.p[1] + dy) };
  if (e.k === "poly") return { ...e, ps: e.ps.map(([x, y]) => v(x, y + dy)) };
  return e;
}

/* ---------- 3 · İzotop çubukları ve ortalama çizgisi ---------- */

const ISO_W = 9;
const ISO_H = 4;
const isoFigure: FigureDef = {
  caption: `Adımla elementi değiştir. Her çubuk bir izotoptur: konumu izotop kütlesi, boyu atomca bolluğudur (NIST). Kesikli çizgi ağırlıklı ortalamadır; en bol izotopa yakın düşer.`,
  alt: `Yatay eksende kütle (u), düşey eksende atomca bolluk. Seçilen elementin izotop çubukları ve ortalamayı gösteren kesikli düşey çizgi. Elementler: ${isoRows219.map(({ el, byMass }) => `${el} ${fx219(byMass, 2, true)} u`).join(", ")}.`,
  steps: isoRows219.map(({ el }) => el),
  draw: (_value, step) => {
    const row = isoRows219[step];
    const lo = row.isotopes[0].a - 1;
    const hi = row.isotopes.at(-1)!.a + 1;
    const X = (m: number) => ((m - lo) / (hi - lo)) * ISO_W;
    const els: El[] = [seg(v(0, 0), v(ISO_W, 0), { tone: "muted" })];
    for (let a = lo; a <= hi; a++) els.push(seg(v(X(a), 0), v(X(a), -0.15), { tone: "muted", thin: true }));
    let prevTop = -Infinity;
    for (const { a, mass, frac, pct } of row.isotopes) {
      const x = X(num219(mass));
      const hgt = ISO_H * num219(frac);
      // Komşu kısa çubukların etiketleri üst üste binmesin diye bir kat yukarı al.
      const labelY = Math.abs(hgt - prevTop) < 0.8 ? hgt + 0.95 : hgt + 0.1;
      prevTop = labelY - 0.1;
      els.push(rect(x - 0.3, 0, 0.6, hgt, "a", true), txt(v(x, labelY), `${sup219(a)}${row.el} %${fx219(pct)}`, "n", { small: true, bold: true }));
    }
    const ax = X(num219(row.byMass));
    els.push(
      seg(v(ax, 0), v(ax, -0.9), { tone: "warn", dash: true }),
      txt(v(ax, -0.95), `ortalama ${fx219(row.byMass, 2, true)} u`, "s", { small: true, bold: true, tone: "warn" }),
      txt(v(ISO_W, 0), "kütle (u)", "e", { small: true, tone: "muted" }),
    );
    return {
      els: [...els, ...pad(-0.6, ISO_H + 1.0, ISO_W + 0.6, -1.9)],
      readout: [
        `${row.isotopes.map(({ mass, frac }) => `${fx219(mass, 3)} × ${fx219(frac, 4)}`).join(" + ")} ≈ ${fx219(row.byMass, 2, true)} u.`,
        `Kütle numarasıyla: ${fx219(row.byA, 4)} u. Okul değeri: ${fx219(row.school)}.`,
      ],
    };
  },
};

/* ---------- 4 · Logaritmik gram ekseni: bir tanecik ve bir mol ---------- */

const LOG_MIN = -24;
const LOG_MAX = 2;
const LOG_W = 12;
const LX = (lg: number) => ((lg - LOG_MIN) / (LOG_MAX - LOG_MIN)) * LOG_W;
const realFigure: FigureDef = {
  caption: `Eksen gram cinsinden logaritmiktir: her çentik 10 kat. Solda seçilen taneciğin tek kütlesi (M/Nₐ), sağda bir molünün kütlesi (M). İkisi arasındaki ok Nₐ ≈ ${sci219(NA219, NA_EXP219)} katıdır, yani yaklaşık ${NA_EXP219} basamaklık sıçrama.`,
  alt: `10⁻²⁴ g ile 10² g arasında logaritmik yatay eksen. Seçilen tanecik için solda tek tanecik kütlesi, sağda mol kütlesi işaretli; aralarında “× Nₐ” oku. Tanecikler: ${realRows219.map(({ f, M }) => `${f.formula} ${fx219(M)} g/mol`).join(", ")}.`,
  steps: realRows219.map(({ f }) => f.formula),
  draw: (_value, step) => {
    const row = realRows219[step];
    const els: El[] = [seg(v(0, 0), v(LOG_W, 0), { tone: "muted" })];
    for (let e = LOG_MIN; e <= LOG_MAX; e++) {
      const major = (e - LOG_MIN) % 4 === 0 || e === LOG_MAX;
      els.push(seg(v(LX(e), 0), v(LX(e), major ? -0.22 : -0.1), { tone: "muted", thin: true }));
      if (major) els.push(txt(v(LX(e), -0.3), `10${sup219(e)}`, "s", { small: true, tone: "muted", soft: true }));
    }
    const lgSingle = Math.log10(num219(row.single.m)) + row.single.e;
    const lgMol = Math.log10(num219(row.M));
    const ps = v(LX(lgSingle), 0);
    const pm = v(LX(lgMol), 0);
    els.push(
      circle(ps, 0.14, { tone: "a", fill: "a" }),
      circle(pm, 0.14, { tone: "b", fill: "b" }),
      txt(v(ps[0], 0.2), `1 tanecik: ${fx219(row.single.m, 2, true)} × 10${sup219(row.single.e)} g`, "ne", { small: true, bold: true, tone: "a" }),
      txt(v(pm[0], 0.2), `1 mol: ${fx219(row.M)} g`, "nw", { small: true, bold: true, tone: "b" }),
      vec(v(ps[0], 1.5), v(pm[0], 1.5), { tone: "warn" }),
      txt(v((ps[0] + pm[0]) / 2, 1.6), `× Nₐ (${sci219(NA219, NA_EXP219)})`, "n", { small: true, tone: "warn" }),
      txt(v(LOG_W / 2, -1.45), "kütle (g), logaritmik", "c", { small: true, tone: "muted" }),
    );
    return {
      els: [...els, ...pad(-0.8, 2.6, LOG_W + 0.8, -1.9)],
      readout: [
        `${unitWord219(row.f)}: ${fx219(row.M)} u; M = ${fx219(row.M)} g/mol.`,
        `Bir tanecik: ${fx219(row.M)} ÷ ${sci219(NA219, NA_EXP219)} = ${fx219(row.single.m, 2, true)} × 10${sup219(row.single.e)} g. 1 g’da ${fx219(row.perGram.m, 2, true)} × 10${sup219(row.perGram.e)} tanecik.`,
      ],
    };
  },
};

/* ---------- 5 · Önce / sonra yığılmış çubuklar ---------- */

const MGO_SCALE = 0.25; // birim / g
const MGO_W = 2.2;
const stack = (x: number, parts: { g: number; tone: Tone; label: string }[], title: string): El[] => {
  const els: El[] = [txt(v(x + MGO_W / 2, -0.15), title, "s", { small: true, bold: true, tone: "muted" })];
  let y = 0;
  for (const { g, tone, label } of parts) {
    if (g <= 0) continue;
    const h = g * MGO_SCALE;
    els.push(rect(x, y, MGO_W, h, tone, true), txt(v(x + MGO_W + 0.15, y + h / 2), label, "e", { small: true, bold: true }));
    y += h;
  }
  return els;
};
const maxTotal = Math.max(...mgoRows219.map(({ after }) => num219(after)));
const mgoFigure: FigureDef = {
  caption: `Soldaki sütun başlangıçtaki Mg ve oksijeni, sağdaki tepkimeden sonraki MgO ile artan maddeyi gösterir. Sütun boyları kütleyle orantılıdır; kapalı kapta iki sütunun boyu her adımda aynıdır. MgO’da Mg : O = ${MGO_RATIO219.a} : ${MGO_RATIO219.b} (${ATOMIC_MASS219.Mg} : ${ATOMIC_MASS219.O}).`,
  alt: `İki yığılmış sütun. Önce: Mg ve O kütleleri. Sonra: MgO ve varsa artan madde. Satırlar: ${mgoRows219.map((r) => `${fx219(r.mg0)} g Mg + ${fx219(r.o0)} g O → ${fx219(r.mgo)} g MgO, ${leftText219(r) === "Artan yok" ? "artan yok" : `artan ${leftText219(r)}`}`).join("; ")}.`,
  steps: mgoRows219.map((r) => `${fx219(r.mg0)} + ${fx219(r.o0)}`),
  draw: (_value, step) => {
    const r = mgoRows219[step];
    const left = num219(r.leftMg) > 0 ? { g: num219(r.leftMg), tone: "a" as Tone, label: `artan Mg ${fx219(r.leftMg)} g` } : { g: num219(r.leftO), tone: "warn" as Tone, label: `artan O ${fx219(r.leftO)} g` };
    const els = [
      ...stack(0, [{ g: num219(r.mg0), tone: "a", label: `Mg ${fx219(r.mg0)} g` }, { g: num219(r.o0), tone: "warn", label: `O ${fx219(r.o0)} g` }], "Önce"),
      ...stack(6.2, [{ g: num219(r.mgo), tone: "b", label: `MgO ${fx219(r.mgo)} g` }, left], "Sonra"),
    ];
    return {
      els: [...els, ...pad(-0.3, maxTotal * MGO_SCALE + 0.3, 11.8, -1.1)],
      readout: [
        `Tüketilen: ${fx219(r.usedMg)} g Mg + ${fx219(r.usedO)} g O (${MGO_RATIO219.a} : ${MGO_RATIO219.b}) = ${fx219(r.mgo)} g MgO. ${leftText219(r) === "Artan yok" ? "Artan yok" : `Artan: ${leftText219(r)}`}.`,
        `Önce ${fx219(r.mg0)} + ${fx219(r.o0)} = ${fx219(r.after)} g; sonra ${fx219(r.mgo)} + ${fx219(num219(r.leftMg) > 0 ? r.leftMg : r.leftO)} = ${fx219(r.after)} g.`,
      ],
    };
  },
};

export const depthFigures219: Record<string, Record<string, FigureDef>> = {
  "mol-kutle-iliskisi": { [massSection219.title]: massFigure },
  "mol-tanecik-iliskisi": { [countSection219.title]: countFigure },
  "atom-kutlesi-hesaplari": { [isoSection219.title]: isoFigure },
  "gercek-kutle-akb-nk": { [realSection219.title]: realFigure },
  "kutle-korunumu-sabit-oran": { [mgoSection219.title]: mgoFigure },
};
