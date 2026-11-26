import {
  aboGroup215, bloodExample215, bloodSection215, deviationPhenotype215, deviationRows215, deviationSection215, gametes215,
  gameteSection215, genotypeText215, mendelPhenotype215, mendelRows215, mendelSection215, modelNames215, models215,
  parse215, punnett215, q215, qText215, rhGroup215, trioRows215, trioSection215, xRows215, xSection215,
  crossText215, cross215, phenotypes215, type Genotype215, type Q215,
} from "../depth215";
import { circle, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { box, pad, rect } from "./biologyFigures059Kit";
import { bars, punnett } from "./biologyFigures059TytKit";

/*
 * 0.215.0 TYT Biyoloji kalıtım çizimleri. Gametler, kutular, pay çubukları
 * ve okuma satırları depth215 modülünün aynı fonksiyonlarından gelir; adım
 * değiştirmek öğrenme kaydı oluşturmaz. Kare satır ve sütunlarında her
 * ebeveynin farklı gametleri vardır; bir ebeveynin gametleri eş paylıdır.
 */

function check215(ok: boolean, claim: string) {
  if (!ok) throw new Error(`depthFigures215: ${claim}`);
}
const PHEN_TONES: Tone[] = ["c", "a", "b", "warn", "muted", "ink"];
const share = (p: Q215, total: number) => (p.n * total) / p.d;

/* ---------- Kalıtıma giriş: gamet ağacı ---------- */

const gameteTree = (): FigureDef => {
  const full = parse215("AaBbCc");
  const levels = full.map((_, k) => gametes215(full.slice(0, k + 1)));
  const leafW = 1.45;
  const leaves = levels[levels.length - 1].length;
  const width = leaves * leafW;
  const dy = 1.7;
  const nodeX = (k: number, i: number) => (i + 0.5) * (width / levels[k].length);
  check215(levels.every((l, k) => l.length === 2 ** (k + 1)), "her heterozigot lokus çeşidi ikiye katlamalı");
  return {
    caption: `${genotypeText215(full)} bireyinde her heterozigot lokus her dalı ikiye ayırır. Üç adımda ${levels.map((l) => l.length).join(", ")} gamet çeşidi oluşur; son satırdaki her gametin payı ${qText215(levels[2][0].p)}.`,
    alt: `Ağaç diyagramı. Kökte ${genotypeText215(full)}. Birinci dalda ${levels[0].map((g) => g.text).join(", ")}; ikinci dalda ${levels[1].map((g) => g.text).join(", ")}; üçüncü dalda ${levels[2].map((g) => g.text).join(", ")}.`,
    steps: full.map(([x, y], k) => (k === 0 ? `${x}/${y} ayrılır` : `${x}/${y} eklenir`)),
    draw: (_, step) => {
      const els: El[] = [];
      els.push(...box(width / 2, 0, 2.2, 0.7, genotypeText215(full), { fill: "muted", bold: true }));
      for (let k = 0; k <= step; k += 1) {
        const y = -(k + 1) * dy;
        levels[k].forEach((g, i) => {
          const x = nodeX(k, i);
          const px = k === 0 ? width / 2 : nodeX(k - 1, Math.floor(i / 2));
          const py = -k * dy;
          els.push(seg(v(px, py - 0.35), v(x, y + 0.35), { tone: k === step ? "a" : "muted", thin: true }));
          els.push(...box(x, y, Math.min(1.25, (width / levels[k].length) - 0.15), 0.7, g.text, { fill: k === step ? "c" : undefined, bold: k === step }));
        });
      }
      els.push(...pad(v(-0.2, 0.6), v(width + 0.2, -levels.length * dy - 0.5)));
      const [x, y] = full[step];
      return {
        els,
        readout: [
          `${step + 1}. heterozigot lokus (${x}${y}): ${levels[step].length} çeşit gamet, her biri ${qText215(levels[step][0].p)}.`,
          step === 0 ? "Aa iki seçenek verir: A veya a." : `Her dal ${x} veya ${y} ile ikiye ayrılır: 2·${levels[step - 1].length} = ${levels[step].length}.`,
        ],
      };
    },
  };
};

/* ---------- Ortak Punnett çizimi ---------- */

const ratioText = (ps: readonly Q215[]) => {
  const L = ps.reduce((m, p) => (m * p.d) / gcdN(m, p.d), 1);
  const ints = ps.map((p) => (p.n * L) / p.d);
  const g = ints.reduce(gcdN, 0) || 1;
  return ints.map((x) => x / g).join(":");
};
function gcdN(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcdN(b, a % b); }

/** Kare + sağda fenotip pay çubukları. Kutu tonu kutunun fenotipine göredir. */
function square(first: string, second: string, phenotype: (g: Genotype215) => string, o: { tone?: (label: string, i: number) => Tone; on?: string } = {}) {
  const sq = punnett215(first, second);
  const cells = sq.grid.flat();
  // Fenotip sırası çaprazlama sınıflarının sırasıdır (modüldeki tablo ile aynı).
  const labels = phenotypes215(cross215(first, second), phenotype).map(({ label }) => label);
  const counts = labels.map((label) => cells.filter((c) => phenotype(c.genotype) === label).length);
  const toneOf = (label: string) => o.tone?.(label, labels.indexOf(label)) ?? PHEN_TONES[labels.indexOf(label) % PHEN_TONES.length];
  const s = 1.6;
  const els: El[] = punnett(sq.rows.map((g) => g.text), sq.cols.map((g) => g.text), (_r, _c, i, j) => {
    const cell = sq.grid[i][j];
    return { s: cell.text, tone: toneOf(phenotype(cell.genotype)), on: o.on !== undefined && phenotype(cell.genotype) === o.on };
  }, { x: 0, y: 0, size: s });
  const gridWidth = (sq.cols.length + 1) * s;
  const bottom = -(sq.rows.length + 1) * s;
  const big = sq.rows.length > 2 || sq.cols.length > 2;
  // Büyük karede çubuk yerine HTML anahtar: kutular dar ekranda okunur kalır.
  const legend = big ? labels.map((label, i) => ({ code: "■", label: `${label}: ${qText215(q215(counts[i], cells.length))}`, tone: toneOf(label) })) : undefined;
  if (big) els.push(...pad(v(-0.2, 0.3), v(gridWidth + 0.2, bottom - 0.2)));
  else {
    // Pay çubukları karenin altında: kare dar ekranda bütün genişliği kullanır.
    const barX = 0.4 + Math.max(...labels.map((l) => l.length)) * 0.2;
    const barW = Math.max(3, gridWidth - barX - 1.2);
    const top = bottom - 0.7;
    els.push(...bars(labels.map((label, i) => ({ label, n: counts[i], tone: toneOf(label), on: label === o.on })), cells.length, { x: barX, top, w: barW, row: 0.75 }));
    els.push(...pad(v(-0.2, 0.3), v(Math.max(gridWidth, barX + barW + 1.2, 6.6) + 0.2, top - (labels.length - 1) * 0.75 - 0.5)));
  }
  return { els, legend, sq, labels, counts, cells: cells.length };
}

/* ---------- Mendel genetiği: her satırın karesi ---------- */

const mendelSquares = (): FigureDef => {
  const rows = mendelRows215();
  return {
    caption: "Her adım tablodaki bir çaprazlamanın karesidir. Satırda birinci, sütunda ikinci ebeveynin farklı gametleri vardır. Kutular fenotipe göre boyanır ve sağdaki çubuklar kutular sayılarak çizilir.",
    alt: `Yedi adımlı Punnett karesi. ${rows.map((r) => `${crossText215(r.first, r.second)}: fenotip ${r.phenotypeRatio.join(":")}`).join("; ")}.`,
    steps: rows.map((r) => crossText215(r.first, r.second)),
    draw: (_, step) => {
      const r = rows[step];
      const f = square(r.first, r.second, mendelPhenotype215);
      check215(ratioText(f.counts.map((n) => q215(n, f.cells))) === r.phenotypeRatio.join(":"), "kare tablo oranını vermeli");
      return {
        els: f.els,
        legend: f.legend,
        readout: [
          `${f.sq.rows.length} × ${f.sq.cols.length} = ${f.cells} eş paylı kutu. ${r.zygotes.length === 1 ? `Tek genotip: ${r.zygotes[0].text}.` : `Genotip oranı ${r.genotypeRatio.join(":")} (${r.zygotes.length} sınıf).`}`,
          `Fenotip ${r.phen.map((x) => x.label).join(" : ")} = ${r.phenotypeRatio.join(":")}; ${r.recessiveLabel} payı ${qText215(r.recessive)}.`,
        ],
      };
    },
  };
};

/* ---------- Mendel’den sapmalar: aynı kare, üç okuma ---------- */

const deviationSquares = (): FigureDef => {
  const rows = deviationRows215();
  const picks = [rows[0], rows[0], rows[1], rows[4]];
  const steps = ["Kareyi kur", ...picks.slice(1).map((r) => `${r.relation}: ${crossText215(r.first, r.second)}`)];
  return {
    caption: `Üç ilişkide kare aynı biçimde kurulur ve genotip oranı ${rows[0].genotypeRatio.join(":")} çıkar. Kutular fenotipe göre boyanınca tam baskınlıkta ${rows[0].phenotypeRatio.join(":")}, eksik ve eş baskınlıkta ${rows[1].phenotypeRatio.join(":")} görülür.`,
    alt: `Dört adım. İlk adımda Aa × Aa karesi genotiplere göre: ${rows[0].zygotes.map((z) => z.text).join(", ")}. Sonra tam baskınlık (${rows[0].phen.map((x) => x.label).join(", ")}), eksik baskınlık (${rows[1].phen.map((x) => x.label).join(", ")}) ve eş baskınlık (${rows[4].phen.map((x) => x.label).join(", ")}) kareleri.`,
    steps,
    draw: (_, step) => {
      const r = picks[step];
      const f = step === 0 ? square(r.first, r.second, genotypeText215) : square(r.first, r.second, deviationPhenotype215);
      const ratio = ratioText(f.counts.map((n) => q215(n, f.cells)));
      check215(ratio === (step === 0 ? r.genotypeRatio : r.phenotypeRatio).join(":"), "kare tablo oranını vermeli");
      return {
        els: f.els,
        legend: f.legend,
        readout: step === 0
          ? [`Genotip ${f.labels.join(" : ")} = ${ratio}.`, "Bu oran üç ilişkide de aynıdır; değişen, genotipin fenotipe çevrilmesidir."]
          : [`${r.relation}: fenotip ${f.labels.join(" : ")} = ${ratio}.`, r.phen.length === r.zygotes.length ? "Heterozigot ayrı görünür; her genotipin kendi fenotipi vardır." : "AA ve Aa aynı görünür; heterozigot baskın fenotipe katılır."],
      };
    },
  };
};

/* ---------- Kan grupları: iki kare, sonra çarpım ---------- */

const bloodSquares = (): FigureDef => {
  const ex = bloodExample215;
  const [motherAbo, motherRh] = parse215(ex.mother).map(([x, y]) => x + y);
  const [fatherAbo, fatherRh] = parse215(ex.father).map(([x, y]) => x + y);
  const total = 16;
  const target = "AB Rh+";
  check215(ex.combined.every(({ p }) => Number.isInteger(share(p, total))), "birleşik paylar 16’da tam sayı olmalı");
  return {
    caption: `${ex.mother} × ${ex.father} ailesinde AB0 ve Rh ayrı karelerde çözülür, sonra paylar çarpılır. ${target} payı ${qText215(ex.target)} olur.`,
    alt: `Üç adım. ${motherAbo} × ${fatherAbo} karesi dört grup verir; ${motherRh} × ${fatherRh} karesi Rh+ ve Rh− verir; son adımda sekiz birleşik grubun pay çubukları: ${ex.combined.map((c) => `${c.label} ${qText215(c.p)}`).join(", ")}.`,
    steps: [`AB0: ${motherAbo} × ${fatherAbo}`, `Rh: ${motherRh} × ${fatherRh}`, "İki sistemi çarp"],
    draw: (_, step) => {
      if (step < 2) {
        const [a, b] = step === 0 ? [motherAbo, fatherAbo] : [motherRh, fatherRh];
        const group = step === 0 ? (g: Genotype215) => aboGroup215(g[0]) : (g: Genotype215) => rhGroup215(g[0]);
        const f = square(a, b, group, { on: step === 0 ? "AB" : undefined });
        return {
          els: f.els,
          legend: f.legend,
          readout: [
            `${crossText215(a, b)}: ${f.labels.map((l, i) => `${l} ${qText215(q215(f.counts[i], f.cells))}`).join(", ")}.`,
            step === 0 ? "A ve B eş baskın, ikisi de O’ya baskın." : "DD ve Dd Rh+, dd Rh−.",
          ],
        };
      }
      const els: El[] = bars(ex.combined.map((c, i) => ({ label: c.label, n: share(c.p, total), tone: PHEN_TONES[i % 4], on: c.label === target })), total, { x: 2.6, top: 0, w: 7, row: 0.8 });
      els.push(...pad(v(-0.2, 0.6), v(11.2, -ex.combined.length * 0.8)));
      return {
        els,
        readout: [`${target} = 1/4 · 3/4 = ${qText215(ex.target)}.`, `Sekiz grubun payları toplamı 1; her pay AB0 payı ile Rh payının çarpımıdır.`],
      };
    },
  };
};

/* ---------- Soy ağaçları: üç kişilik aile ve model kararları ---------- */

const trioFigure = (): FigureDef => {
  const rows = trioRows215();
  const person = (x: number, y: number, male: boolean, affected: boolean, label: string): El[] => {
    const fill = affected ? "warn" : undefined;
    const shape = male ? rect(x - 0.55, y - 0.55, x + 0.55, y + 0.55, { tone: "ink", fill }) : circle(v(x, y), 0.55, { tone: "ink", fill });
    return [shape, txt(v(x, y - 0.75), label, "s", { small: true, tone: "muted" })];
  };
  return {
    caption: "Kare erkek, daire kadın; dolu simge özelliği gösteren kişidir. Her adımda tablodaki bir aile kalıbı çizilir ve dört modelin kararı yanında okunur.",
    alt: `Sekiz adım. ${rows.map((r, i) => `${i + 1}: ${r.label}; uyumlu modeller ${r.compatible.map((m) => modelNames215[m]).join(", ")}`).join(". ")}.`,
    steps: rows.map((_, i) => `${i + 1}. kalıp`),
    draw: (_, step) => {
      const r = rows[step];
      const els: El[] = [];
      els.push(...person(0, 0, true, r.father, "baba"), ...person(3, 0, false, r.mother, "anne"));
      els.push(seg(v(0.55, 0), v(2.45, 0), { tone: "ink" }), seg(v(1.5, 0), v(1.5, -1.6), { tone: "ink" }));
      els.push(...person(1.5, -2.15, r.child === "E", r.childAffected, r.child === "E" ? "oğul" : "kız"));
      models215.forEach((m, i) => {
        const ok = r.verdicts[m].compatible;
        els.push(...box(1.5, -3.9 - i * 0.85, 6.4, 0.7, `${modelNames215[m]}: ${ok ? "uyumlu" : "elenir"}`, { fill: ok ? "c" : undefined, tone: ok ? "ink" : "muted", text: ok ? "ink" : "muted", bold: ok }));
      });
      els.push(...pad(v(-1.8, 0.8), v(4.8, -3.9 - 3 * 0.85 - 0.5)));
      const out = models215.filter((m) => !r.verdicts[m].compatible);
      return {
        els,
        readout: [r.label + ".", out.length ? `Elenen: ${out.map((m) => modelNames215[m]).join(", ")}.` : "Dört model de uyumlu; bu aile modelleri ayıramaz."],
      };
    },
  };
};

/* ---------- Eşeyin belirlenmesi: X’e bağlı çekinik kareler ---------- */

const xSquares = (): FigureDef => {
  const rows = xRows215();
  const kind = (g: Genotype215) => {
    const t = genotypeText215(g);
    const son = t.endsWith("Y");
    if (son) return t === "XᵃY" ? "özellikli oğul" : "sağlam oğul";
    return t === "XᵃXᵃ" ? "özellikli kız" : t === "XᴬXᵃ" ? "taşıyıcı kız" : "sağlam kız";
  };
  const tones: Record<string, Tone> = { "özellikli oğul": "warn", "özellikli kız": "warn", "taşıyıcı kız": "a", "sağlam kız": "c", "sağlam oğul": "b" };
  return {
    caption: "Satırda annenin, sütunda babanın farklı gametleri vardır. Oğul kutuları babanın Y’sini, kız kutuları babanın X’ini taşır; bu yüzden oğulların durumu yalnız anneye bağlıdır.",
    alt: `Altı adımlı kare. ${rows.map((r) => `${crossText215(r.mother, r.father)}: kutular ${r.zygotes.map((z) => z.text).join(", ")}`).join("; ")}.`,
    steps: rows.map((r) => crossText215(r.mother, r.father)),
    draw: (_, step) => {
      const r = rows[step];
      const f = square(r.mother, r.father, kind, { tone: (label) => tones[label] });
      const txtDist = (list: readonly { text: string; p: Q215 }[]) => list.map(({ text, p }) => `${qText215(p)} ${text}`).join(", ");
      return {
        els: f.els,
        legend: f.legend,
        readout: [`Kızlar: ${txtDist(r.daughters)}. Oğullar: ${txtDist(r.sons)}.`, `Tüm çocuklarda özelliği gösteren ${qText215(r.affected)}, taşıyıcı kız ${qText215(r.carrierDaughter)}.`],
      };
    },
  };
};

export const depthFigures215: Record<string, Record<string, FigureDef>> = {
  "kalitima-giris": { [gameteSection215.figureTitle!]: gameteTree() },
  "mendel-genetigi": { [mendelSection215.figureTitle!]: mendelSquares() },
  "mendelden-sapmalar": { [deviationSection215.figureTitle!]: deviationSquares() },
  "kan-gruplari": { [bloodSection215.figureTitle!]: bloodSquares() },
  "soy-agaclari": { [trioSection215.figureTitle!]: trioFigure() },
  "eseyin-belirlenmesi": { [xSection215.figureTitle!]: xSquares() },
};
