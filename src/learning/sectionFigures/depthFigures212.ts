import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { membrane, rod } from "./biologyFiguresMitosis";
import {
  asexual212, asexualSection212, cellKinds212, chromatidText212, dnaCText212, dnaText212, heredityText212,
  helperText212, meiosisN212, meiosisRows212, meiosisSection212, membraneText212, mitosisN212, mitosisRows212,
  mitosisSection212, offspring212, organelleSection212, organelles212, transportSection212, transports212,
  type Chromosome212, type PhaseRow212,
} from "../depth212";

/*
 * 0.212 TYT Biyoloji tablo bölümlerinin çizimleri. Her adım tablonun bir
 * satırıdır; etiketler ve okumalar aynı veriden ve evre modelinden gelir.
 * Çizimler şematiktir, gerçek boyut oranı göstermez.
 */

const upper = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const lower = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);
const ellipse = (c: V, rx: number, ry: number, s: { tone?: Tone; fill?: Tone; dash?: boolean; thin?: boolean; bold?: boolean } = {}): El =>
  poly(Array.from({ length: 40 }, (_, i) => v(c[0] + rx * Math.cos((i / 40) * 2 * Math.PI), c[1] + ry * Math.sin((i / 40) * 2 * Math.PI))), { smooth: true, ...s });
const rect = (x0: number, y0: number, x1: number, y1: number, s: { tone?: Tone; fill?: Tone; dash?: boolean; thin?: boolean; bold?: boolean } = {}): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], s);

/* ---------- Organeller ---------- */

const organelleFigure: FigureDef = {
  caption: `${organelles212.length} yapıyı adım adım seç. Soldaki çizimde zar sayısı ve varsa yapının kendi DNA’sı, sağdaki kutularda yapının ${cellKinds212.join(", ")} hücresinde bulunup bulunmadığı görülür.`,
  alt: `Solda seçilen yapının şeması: zarsız yapılar küçük taneler, tek zarlılar tek çizgili, çift zarlılar iç içe iki çizgili kese olarak çizilir; DNA taşıyanlarda halka biçimli DNA ve ribozom taneleri görünür. Sağda ${cellKinds212.join(", ")} için üç kutu; yapı o hücrede varsa kutu dolu, yoksa kesik çizgilidir.`,
  steps: organelles212.map(({ name }) => name),
  draw: (_value, step) => {
    const o = organelles212[step];
    const c = v(2.6, 2.4);
    const els: El[] = [];
    if (o.membranes === 0) {
      [v(-0.5, 0.2), v(0.1, 0.45), v(0.55, -0.1), v(-0.1, -0.4), v(-0.6, -0.35)].forEach((d) =>
        els.push(circle(v(c[0] + d[0], c[1] + d[1]), 0.2, { tone: "b", fill: "b", thin: true })));
    } else {
      for (let k = 0; k < o.membranes; k++) els.push(ellipse(c, 2.1 - 0.28 * k, 1.4 - 0.28 * k, { tone: "c", bold: k === 0 }));
    }
    if (o.dna) {
      const d = v(c[0] - 0.6, c[1]);
      els.push(poly(Array.from({ length: 24 }, (_, i) => {
        const t = (i / 24) * 2 * Math.PI;
        const r = 0.38 + 0.06 * Math.sin(5 * t);
        return v(d[0] + r * Math.cos(t), d[1] + r * Math.sin(t));
      }), { smooth: true, tone: "warn", bold: true }), txt(v(d[0], d[1] - 0.45), "DNA", "s", { small: true, tone: "warn" }));
    }
    if (o.ownRibosomes) {
      const r0 = v(c[0] + 0.75, c[1]);
      [v(-0.2, 0.15), v(0.2, 0.2), v(0, -0.15)].forEach((d) => els.push(circle(v(r0[0] + d[0], r0[1] + d[1]), 0.09, { tone: "b", fill: "b", thin: true })));
      els.push(txt(v(r0[0], r0[1] - 0.45), "ribozom", "s", { small: true, tone: "b" }));
    }
    els.push(txt(v(c[0], c[1] + 1.65), membraneText212(o.membranes), "n", { small: true, bold: true }));
    cellKinds212.forEach((kind, i) => {
      const y = 3.6 - i * 1.25;
      const on = o.cells[kind];
      els.push(
        rect(5.6, y - 0.42, 9.4, y + 0.42, on ? { tone: "a", fill: "a", thin: true } : { tone: "muted", dash: true, thin: true }),
        txt(v(7.5, y), `${upper(kind)}: ${on ? "var" : "yok"}`, "c", { small: true, bold: on, tone: on ? "ink" : "muted" }),
      );
    });
    return {
      els,
      readout: [
        `${o.name}: ${lower(membraneText212(o.membranes))}, kendi DNA’sı ${lower(dnaText212(o))}.`,
        `Hücreler: ${cellKinds212.filter((kind) => o.cells[kind]).join(", ")}${o.cellNote ? ` (${o.cellNote})` : ""}. Görev: ${lower(o.role)}.`,
      ],
    };
  },
};

/* ---------- Zarda taşıma ---------- */

const spot = (i: number, top: boolean): V => v(0.9 + (i % 3) * 0.8, top ? 4.0 + Math.floor(i / 3) * 0.7 : 2.0 - Math.floor(i / 3) * 0.7);

const transportFigure: FigureDef = {
  caption: `${transports212.length} taşıma yolunu adım adım seç. Zarın üstü hücre dışı, altı hücre içidir. Solda sayılan tanecikler, ortada kullanılan protein ya da kese, okta net yön görülür.`,
  alt: "Yatay çift çizgili hücre zarı. Üstte ve altta farklı sayıda tanecik; zarın ortasında seçilen yola göre boşluk, taşıyıcı ya da pompa proteini veya vezikül; düşey ok taneciğin ya da suyun net yönünü gösterir. ATP kullanan yollarda ATP yazısı görünür.",
  steps: transports212.map(({ name }) => name),
  draw: (_value, step) => {
    const t = transports212[step];
    const { outside, inside, to, substance } = t.demo;
    const water = t.direction === "su";
    const dotTone: Tone = water ? "c" : "b";
    const gate = 5.6;
    const els: El[] = [
      seg(v(0, 3.15), v(gate - 0.55, 3.15), { tone: "ink" }), seg(v(0, 2.85), v(gate - 0.55, 2.85), { tone: "ink" }),
      seg(v(gate + 0.55, 3.15), v(9.6, 3.15), { tone: "ink" }), seg(v(gate + 0.55, 2.85), v(9.6, 2.85), { tone: "ink" }),
      txt(v(9.6, 5.3), "hücre dışı", "w", { small: true, tone: "muted" }),
      txt(v(9.6, 0.6), "hücre içi", "w", { small: true, tone: "muted" }),
    ];
    if (t.helper === "vezikül") {
      const vc = v(gate, 1.9);
      els.push(circle(vc, 0.55, { tone: "c", bold: true }), circle(vc, 0.22, { tone: dotTone, fill: dotTone }));
      els.push(seg(v(gate - 0.55, 3.15), v(gate + 0.55, 3.15), { tone: "ink", dash: true }), seg(v(gate - 0.55, 2.85), v(gate + 0.55, 2.85), { tone: "ink", dash: true }));
    } else if (t.helper === "taşıyıcı" || t.helper === "pompa") {
      els.push(rect(gate - 0.45, 2.4, gate + 0.45, 3.6, { tone: "b", fill: "b", bold: true }));
    } else if (t.helper === "su-kanalı") {
      els.push(rect(gate - 0.3, 2.6, gate + 0.3, 3.4, { tone: "c", dash: true, thin: true }));
    } else {
      els.push(seg(v(gate - 0.55, 3.15), v(gate + 0.55, 3.15), { tone: "ink" }), seg(v(gate - 0.55, 2.85), v(gate + 0.55, 2.85), { tone: "ink" }));
    }
    // Vezikül yollarında yük kesenin içinde çizilir; ayrıca sayılmaz.
    if (t.helper !== "vezikül") {
      for (let i = 0; i < outside; i++) els.push(circle(spot(i, true), 0.17, { tone: dotTone, fill: dotTone, thin: true }));
      for (let i = 0; i < inside; i++) els.push(circle(spot(i, false), 0.17, { tone: dotTone, fill: dotTone, thin: true }));
    }
    const [a, b] = to === "içeri" ? [v(gate + 1.4, 4.7), v(gate + 1.4, 1.3)] : [v(gate + 1.4, 1.3), v(gate + 1.4, 4.7)];
    els.push(vec(a, b, { tone: "a", bold: true }), txt(v(gate + 1.55, 3.6), water ? "su" : substance, "e", { small: true, tone: "a", bold: true }));
    if (t.atp) els.push(txt(v(gate - 0.2, 1.05), "ATP", "w", { small: true, bold: true, tone: "warn" }));
    if (outside + inside > 1) els.push(txt(v(0.6, 0.6), `dış ${outside} · iç ${inside}`, "e", { small: true, tone: "muted", bold: true }));
    return {
      els,
      readout: [
        `${t.name}: ATP ${t.atp ? "gerekir" : "gerekmez"}; protein / yapı: ${lower(helperText212[t.helper])}.`,
        water
          ? `Geçemeyen çözünen dışta ${outside}, içte ${inside}: su ${to}.`
          : outside + inside > 1 ? `${upper(substance)} dışta ${outside}, içte ${inside}: net yön ${to}.` : `${upper(substance)} vezikülle ${to}.`,
        `Örnek: ${t.example}.`,
      ],
    };
  },
};

/* ---------- Mitoz ve mayoz ---------- */

const ORIGIN_TONE: Tone[] = ["a", "b"];
const rodLength = (pair: number) => Math.max(0.45, 1.1 - 0.2 * pair);

function chromosome(c: V, ch: Chromosome212): El[] {
  const h = rodLength(ch.pair) / 2;
  const tone = ORIGIN_TONE[ch.origin];
  if (ch.chromatids === 1) return [rod(v(c[0] - h, c[1]), v(c[0] + h, c[1]), 0.13, tone)];
  return [
    rod(v(c[0] - h, c[1] + 0.08), v(c[0] + h, c[1] + 0.08), 0.13, tone),
    rod(v(c[0] - h, c[1] - 0.08), v(c[0] + h, c[1] - 0.08), 0.13, tone),
    circle(c, 0.06, { tone: "ink", fill: "ink" }),
  ];
}

function group(cs: Chromosome212[], center: V, tetrads: boolean): El[] {
  const sorted = [...cs].sort((p, q) => p.pair - q.pair || p.origin - q.origin);
  if (tetrads) {
    const pairs = [...new Set(sorted.map(({ pair }) => pair))];
    const gap = 0.55;
    return pairs.flatMap((pair, i) => {
      const y = center[1] + ((pairs.length - 1) / 2 - i) * gap;
      return sorted.filter((c) => c.pair === pair).flatMap((c) => chromosome(v(center[0] + (c.origin === 0 ? -0.62 : 0.62), y), c));
    });
  }
  const gap = sorted[0]?.chromatids === 2 ? 0.48 : 0.4;
  return sorted.flatMap((c, i) => chromosome(v(center[0], center[1] + ((sorted.length - 1) / 2 - i) * gap), c));
}

function phaseFigure(rows: PhaseRow212[], twoN: number): FigureDef {
  return {
    caption: `2n = ${twoN} model hücrede ${rows.length} satırı adım adım izle. İki renk anneden ve babadan gelen homologları ayırır; iki çizgili çubuk iki kardeş kromatitli, tek çizgili çubuk tek kromatitli kromozomdur.`,
    alt: `Hafif düzensiz zarlı model hücre. İçinde 2n = ${twoN} için iki renkli kromozom çubukları; eşlenmiş kromozomlar ortasında sentromer noktası olan iki paralel çubuk. Ara evrede çekirdek zarı, metafazda kesik ekvator çizgisi, anafazda iki kutup grubu ve boğumlanan zar, kutup satırında kesik çizgili tek grup görülür.`,
    steps: rows.map(({ phase }) => phase),
    draw: (_value, step) => {
      const row = rows[step];
      const c = v(0, 0);
      const els: El[] = [];
      if (row.groups.length === 2) {
        els.push(membrane(c, 4.4, 2.3, 0.22, step));
        els.push(...group(row.groups[0], v(-2.1, 0), false), ...group(row.groups[1], v(2.1, 0), false));
      } else {
        if (row.scope === "kutup") els.push(ellipse(c, 2.4, 2.2, { tone: "muted", dash: true }), txt(v(0, 2.3), "bir kutup", "n", { small: true, tone: "muted" }));
        else els.push(membrane(c, 3.0, 2.3, 0, step));
        if (row.interphase) els.push(ellipse(c, 1.75, 2.0, { tone: "b", thin: true }));
        if (row.phase.startsWith("Metafaz")) els.push(seg(v(0, -2.1), v(0, 2.1), { tone: "muted", dash: true, thin: true }));
        els.push(...group(row.groups[0], c, row.tetrads));
      }
      return {
        els,
        readout: [
          `${row.phase}: ${row.chromosomes} kromozom, kromatit / DNA molekülü ${chromatidText212(row)}, DNA ${dnaCText212(row.dnaC)}.`,
          `Homolog durumu: ${lower(row.homolog)}.`,
        ],
      };
    },
  };
}

/* ---------- Eşeysiz üreme ---------- */

const asexualFigure: FigureDef = {
  caption: `${asexual212.length} eşeysiz yolu adım adım seç. Soldaki ata ile sağdaki yavrular aynı gen için genotip taşır; okun üstünde yavruyu oluşturan hücre olayı yazar.`,
  alt: "Solda dolu daire içinde ata genotipi, ortada ok ve üstünde hücre olayı, sağda bir ile üç arasında yavru dairesi. Ataya aynı genotipli yavrular atayla aynı renkte, farklı genotipli yavrular başka renktedir.",
  steps: asexual212.map(({ name }) => name),
  draw: (_value, step) => {
    const row = asexual212[step];
    const kids = offspring212(row);
    const els: El[] = [
      circle(v(1.2, 2.5), 0.85, { tone: "a", fill: "a", bold: true }),
      txt(v(1.2, 2.5), row.parent, "c", { bold: true }),
      txt(v(1.2, 1.45), "ata", "s", { small: true, tone: "muted" }),
      vec(v(2.3, 2.5), v(4.7, 2.5), { tone: "ink" }),
      txt(v(3.5, 2.75), row.division, "n", { small: true, tone: "muted" }),
    ];
    kids.forEach((g, i) => {
      const p = v(6.0, 2.5 + ((kids.length - 1) / 2 - i) * 1.55);
      const tone: Tone = g === row.parent ? "a" : "c";
      els.push(circle(p, 0.6, { tone, fill: tone, thin: true }), txt(p, g, "c", { bold: true }));
    });
    return {
      els,
      readout: [
        `${row.name}: ${lower(row.mechanism)}. Döllenme yok.`,
        `Ata ${row.parent} → yavru ${kids.join(", ")}: ${lower(heredityText212(row))}.`,
      ],
    };
  },
};

export const depthFigures212: Record<string, Record<string, FigureDef>> = {
  "hucre-organelleri": { [organelleSection212.title]: organelleFigure },
  "hucre-zarinda-madde-alisverisleri": { [transportSection212.title]: transportFigure },
  mitoz: { [mitosisSection212.title]: phaseFigure(mitosisRows212(mitosisN212), 2 * mitosisN212) },
  mayoz: { [meiosisSection212.title]: phaseFigure(meiosisRows212(meiosisN212), 2 * meiosisN212) },
  "eseysiz-ureme": { [asexualSection212.title]: asexualFigure },
};
