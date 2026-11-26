import {
  balanced224, concMol224, concRows224, concSection224, concTexts224, concValue224, concVolume224, dec224, envIssues224, envSection224,
  mixSection224, mixtureRows224, reactionText224, sepSection224, separations224, sideAtoms224, toNumber224, waterPath224, waterSection224,
  type ConcRow224, type Q224,
} from "../depth224";
import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, pad, rect } from "./mathFigures062TytKit";

/*
 * 0.224.0 TYT Kimya çizimleri: karışım sınıfı, derişim kapları, ayırma
 * yöntemi, suyun enerji basamakları ve tepkime atom sayımı. Her kutu,
 * tanecik, etiket ve okuma satırı depth224 modülündeki aynı verilerden
 * gelir; adım değiştirmek öğrenme kaydı oluşturmaz.
 */

const fail = (claim: string): never => { throw new Error(`depthFigures224: ${claim}`); };

/** Sabit, tekrarlanabilir dağılım: [0,1)² içinde düzgün yayılmış noktalar (altın oran dizisi). */
const spread = (n: number) => Array.from({ length: n }, (_, i) => [((i + 0.5) * 0.618034) % 1, (i + 0.5) / n] as const);

/* ---------- 1 · Dağıtıcı ortam ve dağılan tanecikler ---------- */

const mixtures = (): FigureDef => {
  const rows = mixtureRows224();
  const W = 6;
  const H = 3;
  return {
    caption: "Kutu dağıtıcı ortamdır: dolu kutu sıvı ya da katı, kesikli çerçeve gazdır; fazı alt satırda yazar. İçteki işaretler dağılan maddedir: küçük kareler moleküler ölçek, halkalar kolloid boyut, büyük toplar gözle görülen tanecik ya da damlacıktır. Boyutlar gerçek ölçekte değildir.",
    alt: `${rows.length} adım. Örneğin tuzlu suda dolu kutuya düzgün dağılmış küçük kareler, çamurlu suda dipte büyük toplar, sisde kesikli çerçeveli gaz kutusunda damlacıklar görünür.`,
    steps: rows.map((r) => r.example),
    draw: (_, step) => {
      const r = rows[step] ?? fail("karışım adımı yok");
      const els: El[] = [];
      const box = [v(0, 0), v(W, 0), v(W, H), v(0, H)];
      if (r.mPhase === "gaz") els.push(poly(box, { tone: "muted", dash: true }));
      else els.push(rect(0, 0, W, H, r.mPhase === "sıvı" ? "b" : "muted"));
      if (r.scale === "moleküler") {
        const cols = 8; const rws = 5;
        for (let i = 0; i < cols; i += 1) for (let j = 0; j < rws; j += 1) {
          const x = 0.4 + (i + (j % 2) * 0.5) * ((W - 0.8) / cols);
          const y = 0.35 + j * ((H - 0.7) / (rws - 1));
          els.push(rect(x - 0.06, y - 0.06, 0.12, 0.12, "warn"));
        }
      } else if (r.scale === "kolloid") {
        spread(14).forEach(([a, b]) => els.push(circle(v(0.35 + a * (W - 0.7), 0.3 + b * (H - 0.6)), 0.13, { tone: "warn", fill: "warn" })));
      } else if (r.dPhase === "katı" && r.mPhase === "sıvı") {
        [0.5, 1.3, 2.2, 3.1, 4.0, 4.9, 5.5].forEach((x, i) => els.push(ball(v(x, 0.32 + (i % 2) * 0.35), 0.28, "warn")));
        [1.8, 3.7].forEach((x) => els.push(ball(v(x, 1.7), 0.28, "warn")));
      } else {
        spread(7).forEach(([a, b]) => els.push(ball(v(0.5 + a * (W - 1), 0.45 + b * (H - 0.9)), 0.3, "warn")));
      }
      els.push(txt(v(0, H + 0.35), `${r.example} · ${r.kind}`, "e", { tone: "ink", bold: true }));
      els.push(txt(v(0, -0.4), `dağılan: ${r.dispersed} (${r.dPhase})`, "e", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(0, -0.9), `dağıtıcı: ${r.medium} (${r.mPhase})`, "e", { tone: r.mPhase === "sıvı" ? "b" : "muted", small: true, bold: true }));
      els.push(...pad(-0.2, H + 0.8, W + 0.2, -1.2));
      return {
        els,
        readout: [
          `${r.example}: ${r.dispersed} (${r.dPhase}) → ${r.medium} (${r.mPhase}); dağılan tanecik: ${r.particle}.`,
          `Sınıf: ${r.kind}. ${r.homogeneous ? "Homojen." : r.kind === "kolloid" ? "Heterojen; gözle tekdüze görünebilir." : "Heterojen."}`,
        ],
      };
    },
  };
};

/* ---------- 2 · Kaplar: hacim yüksekliği, her nokta 0,01 mol ---------- */

const MMOL_PER_DOT = 10;
const concentrations = (): FigureDef => {
  const rows = concRows224.filter((r) => concMol224(r) !== null);
  const bw = 1.7;
  const hPerMl = 2.6 / 500;
  const beaker = (x: number, ml: Q224, mol: Q224, tone: Tone, label: string): El[] => {
    const h = toNumber224(ml) * hPerMl;
    const dots = Math.round(toNumber224(mol) * 1000 / MMOL_PER_DOT);
    if (Math.abs(dots * MMOL_PER_DOT - toNumber224(mol) * 1000) > 1e-9) fail("nokta sayısı tam olmalı");
    const els: El[] = [
      rect(x, 0, bw, h, tone),
      poly([v(x, 2.9), v(x, 0), v(x + bw, 0), v(x + bw, 2.9)], { tone: "ink", open: true, thin: true }),
    ];
    const cols = Math.max(1, Math.min(dots, Math.round(Math.sqrt((dots * bw) / Math.max(h, 0.3)))));
    const rws = Math.ceil(dots / cols);
    for (let i = 0; i < dots; i += 1) {
      const c = i % cols; const r = Math.floor(i / cols);
      els.push(rect(x + ((c + 0.5) * bw) / cols - 0.06, ((r + 0.5) * h) / rws - 0.06, 0.12, 0.12, "warn"));
    }
    els.push(txt(v(x + bw / 2, -0.3), `${dec224(ml)} mL`, "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(x + bw / 2, -0.75), label, "c", { tone: "muted", small: true }));
    return els;
  };
  const molText = (c: Q224) => `${dec224(c)} M`;
  return {
    caption: `Kabın dolu yüksekliği hacimle, her küçük kare ${dec224({ n: MMOL_PER_DOT, d: 1000 })} mol çözünenle orantılıdır. Seyreltmede kare sayısı değişmez, yalnız hacim büyür; karıştırmada iki kabın kareleri toplanır.`,
    alt: `${rows.length} adım. Örneğin seyreltmede 100 mL kaptaki kareler aynı sayıda kalarak 300 mL kaba dağılır.`,
    steps: rows.map((r) => concTexts224(r).unit === "Molarite" ? `Molarite · ${(r as Extract<ConcRow224, { kind: "molar" }>).formula}` : concTexts224(r).unit),
    draw: (_, step) => {
      const r = rows[step] ?? fail("derişim adımı yok");
      const t = concTexts224(r);
      const els: El[] = [];
      const c = concValue224(r);
      if (r.kind === "molar") {
        els.push(...beaker(0, r.finalMl, concMol224(r)!, "b", molText(c)));
      } else if (r.kind === "dilute") {
        els.push(...beaker(0, r.v1Ml, concMol224(r)!, "b", molText(r.c1)));
        els.push(vec(v(bw + 0.2, 1.2), v(bw + 1.2, 1.2), { tone: "ink" }));
        els.push(txt(v(bw + 0.7, 1.4), "+ su", "n", { tone: "ink", small: true }));
        els.push(...beaker(bw + 1.4, r.v2Ml, concMol224(r)!, "b", molText(c)));
      } else if (r.kind === "mix") {
        const m1 = { n: r.c1.n * r.v1Ml.n, d: r.c1.d * r.v1Ml.d * 1000 };
        const m2 = { n: r.c2.n * r.v2Ml.n, d: r.c2.d * r.v2Ml.d * 1000 };
        els.push(...beaker(0, r.v1Ml, m1, "b", molText(r.c1)));
        els.push(txt(v(bw + 0.3, 1.2), "+", "c", { tone: "ink", bold: true }));
        els.push(...beaker(bw + 0.6, r.v2Ml, m2, "b", molText(r.c2)));
        els.push(vec(v(2 * bw + 0.75, 1.2), v(2 * bw + 1.35, 1.2), { tone: "ink" }));
        els.push(...beaker(2 * bw + 1.5, concVolume224(r)!, concMol224(r)!, "b", molText(c)));
      } else fail("molar olmayan satır çizilmez");
      els.push(...pad(-0.3, 3.2, 3 * bw + 1.7, -1.1));
      return { els, readout: [`${t.what}.`, `${t.work} = ${t.result}; çözünen ${dec224(concMol224(r)!)} mol.`] };
    },
  };
};

/* ---------- 3 · Karışım → yöntem → ayrılan ve kalan ---------- */

const separationsFig = (): FigureDef => {
  const rows = separations224;
  return {
    caption: "Soldaki kutu karışımdır: A ve B iki bileşeni gösterir. Ok yöntemi, alt satır yararlanılan farkı gösterir. Sağ üst kutu ayrılan, sağ alt kutu kalan bileşendir; yeni madde oluşmaz.",
    alt: `${rows.length} adım. Örneğin mıknatısla ayırmada A demir, B kükürt; A topları üst kutuya, B topları alt kutuya geçer.`,
    steps: rows.map((s) => s.method),
    draw: (_, step) => {
      const s = rows[step] ?? fail("yöntem adımı yok");
      const els: El[] = [];
      els.push(rect(0, -1.1, 2.6, 2.2, "muted", false));
      [[0.5, 0.55, "A"], [1.3, 0.6, "B"], [2.1, 0.5, "A"], [0.6, -0.4, "B"], [1.4, -0.35, "A"], [2.1, -0.5, "B"]].forEach(([x, y, k]) =>
        els.push(ball(v(x as number, y as number), 0.27, k === "A" ? "a" : "c", k as string)));
      els.push(vec(v(2.8, 0), v(4.4, 0), { tone: "ink" }));
      els.push(rect(4.6, 0.15, 2.6, 1.05, "a", false));
      els.push(rect(4.6, -1.2, 2.6, 1.05, "c", false));
      els.push(ball(v(4.95, 0.68), 0.27, "a", "A"), txt(v(5.35, 0.68), s.parts[0], "e", { tone: "ink", small: true, bold: true }));
      els.push(ball(v(4.95, -0.68), 0.27, "c", "B"), txt(v(5.35, -0.68), s.parts[1], "e", { tone: "ink", small: true, bold: true }));
      els.push(seg(v(4.4, 0), v(4.6, 0.68), { tone: "a", thin: true }));
      els.push(seg(v(4.4, 0), v(4.6, -0.68), { tone: "c", thin: true }));
      els.push(txt(v(0, 1.45), s.method, "e", { tone: "ink", bold: true }));
      els.push(txt(v(0, -1.6), `fark: ${s.difference.toLocaleLowerCase("tr-TR")}`, "e", { tone: "muted", small: true, bold: true }));
      els.push(...pad(-0.2, 1.8, 7.4, -1.9));
      return {
        els,
        legend: [
          { code: "A", label: `${s.parts[0]} (ayrılan)`, tone: "a" },
          { code: "B", label: `${s.parts[1]} (kalan)`, tone: "c" },
        ],
        readout: [`${s.method} · ${s.example}: ${s.separated}; ${s.remaining}.`, `Yararlanılan fark: ${s.difference.toLocaleLowerCase("tr-TR")}.`],
      };
    },
  };
};

/* ---------- 4 · 1 g buzdan buhara enerji basamakları ---------- */

const waterEnergy = (): FigureDef => {
  const total = waterPath224.reduce((s, p) => s + toNumber224(p.joules), 0);
  const Lbar = 8;
  const k = Lbar / total;
  const tones: Tone[] = ["b", "warn", "a"];
  return {
    caption: "Çubuk, 1 g buzu 0 °C’den 100 °C buhara götürmek için gereken enerjidir; parça uzunlukları joule ile orantılıdır. Her adım bir basamak ekler. En uzun parça buharlaşmadır.",
    alt: `Üç parçalı yatay çubuk: ${waterPath224.map((p) => `${p.label.toLocaleLowerCase("tr-TR")} ${dec224(p.joules)} J`).join(", ")}.`,
    steps: waterPath224.map((p) => p.label),
    draw: (_, step) => {
      if (step < 0 || step >= waterPath224.length) fail("su adımı yok");
      const els: El[] = [];
      let x = 0;
      let sum = 0;
      waterPath224.forEach((p, i) => {
        const w = toNumber224(p.joules) * k;
        const active = i === step;
        const shown = i <= step;
        els.push(rect(x, 0, w, 0.7, shown ? tones[i] : "muted", shown));
        const y = i % 2 === 0 ? 0.95 : -0.3;
        els.push(txt(v(x + w / 2, y), `${dec224(p.joules)} J`, i % 2 === 0 ? "n" : "s", { tone: shown ? "ink" : "muted", small: true, bold: active }));
        els.push(txt(v(x + w / 2, i % 2 === 0 ? 1.45 : -0.75), p.label, i % 2 === 0 ? "n" : "s", { tone: shown ? "ink" : "muted", small: true }));
        if (shown) sum += toNumber224(p.joules);
        x += w;
      });
      els.push(txt(v(0, -1.5), `toplam: ${dec224({ n: Math.round(sum), d: 1 })} J`, "e", { tone: "ink", bold: true }));
      els.push(...pad(-0.2, 2.1, Lbar + 0.2, -1.8));
      const p = waterPath224[step];
      return { els, readout: [`${p.label}: ${p.note}, ${dec224(p.joules)} J/g.`, `Şimdiye kadar toplam ${dec224({ n: Math.round(sum), d: 1 })} J.`] };
    },
  };
};

/* ---------- 5 · Tepkime adımında atom sayımı ---------- */

const envBalance = (): FigureDef => {
  const steps = envIssues224.flatMap((e) => e.steps.map((r, j) => ({ e, r, label: `${e.issue}${e.steps.length > 1 ? ` ${j + 1}` : ""}` })));
  return {
    caption: "Her adımda tablodaki bir tepkime yazılır. Sol sütun girenlerdeki, sağ sütun ürünlerdeki atom sayısıdır; iki sütun her element için eşitse tepkime denktir.",
    alt: `${steps.length} adım. Örneğin CH₄ + 2O₂ → CO₂ + 2H₂O için C 1 = 1, H 4 = 4, O 4 = 4.`,
    steps: steps.map((s) => s.label),
    draw: (_, step) => {
      const s = steps[step] ?? fail("tepkime adımı yok");
      if (!balanced224(s.r)) fail("tepkime denk olmalı");
      const a = sideAtoms224(s.r.left);
      const b = sideAtoms224(s.r.right);
      const els: El[] = [];
      els.push(txt(v(0, 1.2), reactionText224({ ...s.r, note: undefined }), "e", { tone: "ink", bold: true }));
      els.push(txt(v(2.3, 0.6), "girenler", "c", { tone: "a", small: true, bold: true }));
      els.push(txt(v(4.5, 0.6), "ürünler", "c", { tone: "c", small: true, bold: true }));
      const elsOrder = Object.keys(a);
      elsOrder.forEach((el, i) => {
        const y = -i * 0.75;
        els.push(...cell(0, y - 0.3, 1, 0.6, el, "muted", { fill: true }));
        els.push(...cell(1.6, y - 0.3, 1.4, 0.6, String(a[el]), "a", { fill: false }));
        els.push(txt(v(3.4, y), "=", "c", { tone: "ink", bold: true }));
        els.push(...cell(3.8, y - 0.3, 1.4, 0.6, String(b[el] ?? 0), "c", { fill: false }));
      });
      els.push(...pad(-0.2, 1.6, 6.2, -elsOrder.length * 0.75 + 0.2));
      return {
        els,
        readout: [`${s.e.issue}: ${reactionText224(s.r)}.`, `Atomlar: ${elsOrder.map((el) => `${el} ${a[el]} = ${b[el]}`).join(", ")}.`],
      };
    },
  };
};

export const depthFigures224: Record<string, Record<string, FigureDef>> = {
  "karisim-sinif-cozunme": { [mixSection224.figureTitle!]: mixtures() },
  "cozelti-derisimi": { [concSection224.figureTitle!]: concentrations() },
  "koligatif-ayirma": { [sepSection224.figureTitle!]: separationsFig() },
  "su-hayat-cevre": { [waterSection224.figureTitle!]: waterEnergy() },
  "doga-ve-kimya": { [envSection224.figureTitle!]: envBalance() },
};
