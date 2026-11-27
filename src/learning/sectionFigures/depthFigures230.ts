import { circle, poly, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { rect } from "./mathFigures060TytKit";
import { pad } from "./physicsFigures058Kit";
import {
  beingQuestions230, beingRows230, beingSection230, countermodel230, evalFormula230, gorgiasStages230, inferenceChecked230,
  inferenceSection230, knowRows230, knowSection230, scienceRows230, scienceSection230, sourceLabel230, sources230,
  swanObservations230, swanSteps230, traitSection230, traitVerdicts230, type Formula230, type Model230,
} from "../depth230";

/*
 * 0.230 TYT Felsefe tablo bölümlerinin çizimleri. Kutular, işaretler ve
 * okumalar tabloyu üreten aynı depth230 verilerinden ve kurallarından gelir.
 * Çizimler kavram şemasıdır, ölçekli değildir; adım değiştirmek öğrenme
 * kaydı üretmez.
 */

const check230 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures230: ${claim}`);
};
const box = (x: number, y: number, w: number, h: number, s: { tone: Tone; on?: boolean }) =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], s.on ? { tone: s.tone, fill: s.tone, bold: true } : { tone: s.tone, thin: true });
const WIDTH = 10.4;

/* ---------- Felsefeyi tanıma: sekiz özellik, uyar / uymaz ---------- */

const ROWH = 0.62;
const ROWGAP = 0.18;
const traitFigure: FigureDef = {
  caption: "Her adım tablodaki bir özelliğin ifadesini sınar. Soldaki listede incelenen satır doludur; önceki satırların kararı yazılıdır, sonrakiler henüz sınanmadı. Sağdaki kutular ölçütün istediği işlemin (gereken) ve ölçütü bozan bir işlemin (bozan) ifadede bulunup bulunmadığını gösterir.",
  alt: `Sekiz adımlı liste. ${traitVerdicts230.map((t) => `${t.trait}: ${t.fit ? "uyar" : "uymaz"}`).join("; ")}.`,
  steps: traitVerdicts230.map((t) => t.short),
  draw: (_value, step) => {
    const cur = traitVerdicts230[step];
    const els: El[] = [];
    traitVerdicts230.forEach((t, i) => {
      const y = -i * (ROWH + ROWGAP);
      const sel = i === step;
      const done = i <= step;
      els.push(
        box(0, y - ROWH, 3.0, ROWH, { tone: sel ? "a" : "muted", on: sel }),
        txt(v(1.5, y - ROWH / 2), t.short, "c", { small: true, bold: sel, tone: "ink" }),
        txt(v(3.2, y - ROWH / 2), done ? (t.fit ? "uyar" : "uymaz") : "?", "e", { small: true, bold: done, tone: done ? (t.fit ? "b" : "warn") : "muted" }),
      );
    });
    const needState = cur.need.length === 0 ? "aranmaz" : cur.need.every((m) => cur.marks.includes(m)) ? "var" : "yok";
    const badState = cur.bad.some((m) => cur.marks.includes(m)) ? "var" : "yok";
    const px = 5.1;
    const pw = WIDTH - px;
    els.push(
      txt(v(px + pw / 2, -0.25), cur.trait, "c", { small: true, bold: true, tone: "a" }),
      box(px, -1.5, pw, 0.85, { tone: needState === "yok" ? "warn" : "b" }),
      txt(v(px + pw / 2, -1.075), `Gereken: ${needState}`, "c", { small: true, bold: true, tone: "ink" }),
      box(px, -2.75, pw, 0.85, { tone: badState === "var" ? "warn" : "b" }),
      txt(v(px + pw / 2, -2.325), `Bozan: ${badState}`, "c", { small: true, bold: true, tone: "ink" }),
      box(px, -4.0, pw, 0.85, { tone: cur.fit ? "b" : "warn", on: true }),
      txt(v(px + pw / 2, -3.575), cur.fit ? "Ölçüte uyar" : "Ölçüte uymaz", "c", { small: true, bold: true, tone: "ink" }),
    );
    const bottom = -traitVerdicts230.length * (ROWH + ROWGAP);
    return {
      els: [...els, ...pad(-0.2, 0.15, WIDTH + 0.2, bottom - 0.1)],
      readout: [`${cur.trait}: ${cur.criterion}`, `İfade: ${cur.statement}`, `${cur.fit ? "Uyar" : "Uymaz"}. ${cur.reason}`],
    };
  },
};
check230(traitVerdicts230.every((t) => t.short.length <= 12), "kısa adlar kutuya sığmalı");

/* ---------- Felsefe ile düşünme: doğruluk çizelgesi veya karşı model ---------- */

const collectAtoms = (fs: readonly Formula230[]): string[] => {
  const out = new Set<string>();
  const walk = (f: Formula230) => {
    if (f.k === "atom") out.add(f.p);
    else if (f.k === "not") walk(f.f);
    else if (f.k === "if") { walk(f.a); walk(f.b); }
  };
  fs.forEach(walk);
  return [...out];
};
const collectPreds = (fs: readonly Formula230[]): string[] => {
  const out = new Set<string>();
  for (const f of fs) if (f.k === "all") { out.add(f.a); out.add(f.b); } else if (f.k === "has") out.add(f.p);
  return [...out];
};
const CW = 1.25;
const CH = 0.62;
const predShort: Record<string, string> = { A: "A", B: "B", O: "göz.", F: "F", G: "G" };
const inferenceFigure: FigureDef = {
  caption: "Her adım tablodaki bir biçimdir. Önermeli biçimlerde dört doğruluk satırı çizilir: öncüllerin hepsi doğru olan satırlar mavi, bunlardan sonucu yanlış olan satır turuncudur. Adlı biçimlerde bulunan karşı modelin öğeleri ve özellikleri gösterilir. Turuncu satır yoksa biçim geçerlidir.",
  alt: `Sekiz adımlı çizelge. ${inferenceChecked230.map((r) => `${r.form} ${r.valid ? "karşı model yok" : `karşı model: ${r.model}`}`).join("; ")}.`,
  steps: inferenceChecked230.map((_, i) => `${i + 1}. biçim`),
  draw: (_value, step) => {
    const r = inferenceChecked230[step];
    const atoms = collectAtoms([...r.premises, r.conclusion]);
    const els: El[] = [];
    const heads: string[] = [];
    const rows: { cells: string[]; tone: Tone; on: boolean }[] = [];
    const premiseHeads = r.premises.map((_, i) => `Ö${i + 1}`);
    if (atoms.length) {
      heads.push(...atoms, ...premiseHeads, "S");
      for (const p of [true, false]) for (const q of [true, false]) {
        const m: Model230 = { atoms: { P: p, Q: q }, items: [], names: {} };
        const pv = r.premises.map((f) => evalFormula230(f, m));
        const cv = evalFormula230(r.conclusion, m);
        const live = pv.every(Boolean);
        rows.push({ cells: [p, q, ...pv, cv].map((b) => (b ? "D" : "Y")), tone: live ? (cv ? "b" : "warn") : "muted", on: live });
      }
    } else {
      const preds = collectPreds([...r.premises, r.conclusion]);
      heads.push("öğe", ...preds.map((p) => predShort[p]));
      const cm = r.countermodel;
      if (cm) {
        cm.items.forEach((it, i) => {
          const ns = Object.entries(cm.names).filter(([, k]) => k === i).map(([n]) => n);
          rows.push({ cells: [ns.length ? ns.join("=") : "diğer", ...preds.map((p) => (it.includes(p) ? "+" : "−"))], tone: "warn", on: true });
        });
      } else {
        // Geçerli adlı biçim: X’in A olduğu her modelde B de doğrudur; zorunlu satır gösterilir.
        const forced: Model230 = { atoms: {}, items: [["A", "B"]], names: { X: 0 } };
        check230(r.premises.every((f) => evalFormula230(f, forced)) && evalFormula230(r.conclusion, forced), "zorunlu satır öncülleri ve sonucu sağlamalı");
        check230(countermodel230(r.premises, r.conclusion) === null, "geçerli biçimde karşı model olmamalı");
        rows.push({ cells: ["X", ...preds.map((p) => (forced.items[0].includes(p) ? "+" : "−"))], tone: "b", on: true });
      }
    }
    const x0 = (WIDTH - heads.length * CW) / 2;
    heads.forEach((h, c) => els.push(txt(v(x0 + c * CW + CW / 2, 0.3), h, "c", { small: true, bold: true, tone: "ink" })));
    rows.forEach((row, i) => {
      const y = -i * (CH + 0.12) - CH;
      els.push(box(x0, y, heads.length * CW, CH, { tone: row.tone, on: row.on && row.tone !== "muted" }));
      row.cells.forEach((c, j) => els.push(txt(v(x0 + j * CW + CW / 2, y + CH / 2), c, "c", { small: true, bold: row.on, tone: "ink" })));
    });
    const footY = -4 * (CH + 0.12) - 0.55;
    els.push(
      rect(0, footY - 0.75, WIDTH, 0.75, r.valid ? "b" : "warn"),
      txt(v(WIDTH / 2, footY - 0.375), r.valid ? `${r.kind}: karşı model yok` : `${r.kind}: karşı model var`, "c", { small: true, bold: true, tone: "ink" }),
    );
    return {
      els: [...els, ...pad(-0.2, 0.7, WIDTH + 0.2, footY - 0.95)],
      readout: [r.form, r.valid ? "Öncüllerin hepsi doğruyken sonucun yanlış olduğu bir durum bulunmadı." : `Karşı model: ${r.model}.`, inferenceSection230.table!.rows[step][4]],
    };
  },
};
check230(inferenceChecked230.every((r) => collectAtoms([...r.premises, r.conclusion]).every((a) => a === "P" || a === "Q")), "önermeli biçimler yalnız P ve Q kullanmalı");
check230(inferenceChecked230.every((r) => (r.countermodel?.items.length ?? 0) <= 4), "karşı model en çok dört satır olmalı");

/* ---------- Varlık felsefesi: soru, yaklaşım, temeller ---------- */

const QW = 3.2;
/** Gorgias’ın üç aşamasının kısa adları (dersin aşama sırasıyla). */
const gorgiasShort = ["varlık", "bilgi", "aktarım"] as const;
check230(gorgiasShort.length === gorgiasStages230.length && gorgiasShort.every((s, i) => gorgiasStages230[i].startsWith(s.slice(0, 4))), "kısa aşama adları aşamalarla eşleşmeli");
const QGAP = (WIDTH - 3 * QW) / 2;
const beingFigure: FigureDef = {
  caption: "Üstteki üç kutu varlık felsefesinin üç sorusudur; dolu kutu seçili satırın sorusudur. Ortada yaklaşımın adı yazılır. Nicelik satırlarında daireler açıklamadaki indirgenemez temellerdir ve sayıları yaklaşımın adını verir; öteki satırlarda derste anılan düşünürler veya Gorgias’ın üç aşaması gösterilir.",
  alt: `Sekiz adımlı şema. ${beingRows230.map((r) => `${r.question} ${r.approach}: ${r.bases ? `${r.bases.length} temel (${r.bases.join(", ")})` : r.names.join(", ")}`).join("; ")}.`,
  steps: beingRows230.map((r) => r.approach.replace("Gorgias’a atfedilen üç sav", "Gorgias")),
  draw: (_value, step) => {
    const r = beingRows230[step];
    const els: El[] = [];
    beingQuestions230.forEach((q, i) => {
      const x = i * (QW + QGAP);
      const on = q === r.question;
      els.push(box(x, -0.7, QW, 0.7, { tone: on ? "a" : "muted", on }), txt(v(x + QW / 2, -0.35), q, "c", { small: true, bold: on, tone: "ink" }));
    });
    els.push(txt(v(WIDTH / 2, -1.45), r.approach, "c", { bold: true, tone: "a" }));
    const items = r.bases ?? (r.question === "Var mı?" ? [...gorgiasShort] : r.names);
    const n = items.length;
    const slot = WIDTH / Math.max(n, 1);
    items.forEach((label, i) => {
      const cx = slot * (i + 0.5);
      if (r.bases) els.push(circle(v(cx, -2.85), 0.88, { tone: "b", fill: "b" }), txt(v(cx, -2.85), label, "c", { small: true, bold: true, tone: "ink" }));
      else els.push(box(cx - slot / 2 + 0.12, -3.2, slot - 0.24, 0.7, { tone: "c", on: true }), txt(v(cx, -2.85), label, "c", { small: true, bold: true, tone: "ink" }));
    });
    const foot = r.bases ? `${r.bases.length} temel → ${r.approach}` : r.question === "Var mı?" ? "üç ayrı aşama" : r.names.length > 1 ? `${r.names.length} düşünür, ayrıntılar farklı` : "derste anılan düşünür";
    els.push(txt(v(WIDTH / 2, -4.3), foot, "c", { small: true, tone: "muted" }));
    return {
      els: [...els, ...pad(-0.2, 0.2, WIDTH + 0.2, -4.7)],
      readout: [`${r.question} · ${r.approach} · ${r.names.join(", ")}`, beingSection230.table!.rows[step][3], `Dikkat: ${r.caution}`],
    };
  },
};
check230(Math.max(...beingRows230.map((r) => (r.bases ?? r.names).length)) <= 4, "bir adımda en çok dört öğe olmalı");

/* ---------- Bilgi felsefesi: imkân ve dayanak ---------- */

const SCOLS = 2;
const SGAP = 0.4;
const SW = (WIDTH - (SCOLS - 1) * SGAP) / SCOLS;
const SH = 0.68;
const SROWS = Math.ceil(sources230.length / SCOLS);
const namesY = -1.6 - SROWS * (SH + 0.22) - 0.45;
const knowFigure: FigureDef = {
  caption: "Üstteki iki kutu bilginin imkânı sorusunun yanıtıdır. Ortadaki kutular tablodaki dayanaklardır; seçili yaklaşımın dayandıkları doludur. Eleştirel yaklaşımda iki kutu birlikte dolar. Altta derste anılan düşünürler yazılır.",
  alt: `Sekiz adımlı şema. ${knowRows230.map((r) => `${r.approach}: ${r.possible ? "bilgi mümkün" : "kesinlik sorgulanır"}, ${r.sources.length ? r.sources.map((s) => sourceLabel230[s]).join(" ve ") : "dayanak yok"}`).join("; ")}.`,
  steps: knowRows230.map((r) => r.approach.replace(/ \(.*\)/, "").replace(" yaklaşımlar", "").replace(" yaklaşım", "")),
  draw: (_value, step) => {
    const r = knowRows230[step];
    const half = (WIDTH - 0.4) / 2;
    const els: El[] = [
      box(0, -0.75, half, 0.75, { tone: "warn", on: !r.possible }),
      txt(v(half / 2, -0.375), "Kesinlik sorgulanır", "c", { small: true, bold: !r.possible, tone: "ink" }),
      box(half + 0.4, -0.75, half, 0.75, { tone: "b", on: r.possible }),
      txt(v(half + 0.4 + half / 2, -0.375), "Bilgi mümkün", "c", { small: true, bold: r.possible, tone: "ink" }),
    ];
    sources230.forEach((s, i) => {
      const x = (i % SCOLS) * (SW + SGAP);
      const y = -1.6 - Math.floor(i / SCOLS) * (SH + 0.22) - SH;
      const on = r.sources.includes(s);
      els.push(box(x, y, SW, SH, { tone: on ? "a" : "muted", on }), txt(v(x + SW / 2, y + SH / 2), sourceLabel230[s], "c", { small: true, bold: on, tone: "ink" }));
    });
    els.push(txt(v(WIDTH / 2, namesY), r.names.length ? r.names.join(", ") : "Derste ad verilmez", "c", { small: true, bold: true, tone: r.names.length ? "c" : "muted" }));
    return {
      els: [...els, ...pad(-0.2, 0.15, WIDTH + 0.2, namesY - 0.4)],
      readout: [`${r.approach} · ${r.possible ? "bilgi mümkün" : "kesinlik sorgulanır"}`, `Dayanak: ${knowSection230.table!.rows[step][2]}.`, r.claim],
    };
  },
};
check230(sources230.every((s) => sourceLabel230[s].length <= 18), "dayanak adları kutuya sığmalı");
check230(knowRows230.every((r) => r.names.join(", ").length <= 36), "düşünür satırı tek satıra sığmalı");

/* ---------- Bilim felsefesi: kuğu dizisi ---------- */

const swanR = 0.55;
const swanFigure: FigureDef = {
  caption: "Sav: “Bu gölün bütün kuğuları beyazdır.” Her adımda bir gözlem eklenir. Açık daire beyaz, turuncu daire siyah kuğudur. Alttaki kutu savın durumunu verir: uyan gözlemler savı kesinleştirmez, tek siyah kuğu savla bağdaşmaz.",
  alt: `Altı adımlı gözlem dizisi: ${swanObservations230.join(", ")}. ${swanSteps230.map((s) => `${s.n}. adım: ${s.status}`).join("; ")}.`,
  steps: swanSteps230.map((s) => `${s.n}. gözlem`),
  draw: (_value, step) => {
    const s = swanSteps230[step];
    const slot = WIDTH / swanObservations230.length;
    const els: El[] = [txt(v(WIDTH / 2, 0.35), "Bütün kuğular beyazdır.", "c", { small: true, bold: true, tone: "ink" })];
    swanObservations230.forEach((o, i) => {
      const c = v(slot * (i + 0.5), -0.8);
      if (i > step) els.push(circle(c, swanR, { tone: "muted", dash: true, thin: true }), txt(c, "?", "c", { small: true, tone: "muted" }));
      else if (o === "beyaz") els.push(circle(c, swanR, { tone: "b", bold: i === step }), txt(c, "B", "c", { small: true, bold: true, tone: "ink" }));
      else els.push(circle(c, swanR, { tone: "warn", fill: "warn", bold: true }), txt(c, "S", "c", { small: true, bold: true, tone: "ink" }));
    });
    const tone: Tone = s.status === "bağdaşmaz" ? "warn" : "b";
    els.push(
      txt(v(WIDTH / 2, -1.85), `beyaz: ${s.white} · siyah: ${s.n - s.white}`, "c", { small: true, tone: "muted" }),
      rect(0, -3.05, WIDTH, 0.8, tone),
      txt(v(WIDTH / 2, -2.65), `Sav: ${s.status}`, "c", { small: true, bold: true, tone: "ink" }),
    );
    const popper = scienceRows230.find((r) => r.names.includes("Popper"))!;
    return {
      els: [...els, ...pad(-0.2, 0.7, WIDTH + 0.2, -3.25)],
      readout: [
        `${s.n} gözlem: ${s.white} beyaz, ${s.n - s.white} siyah.`,
        s.status === "bağdaşmaz" ? "Evrensel sav bu bulguyla bağdaşmaz. Ölçüm ve koşulların sağlanıp sağlanmadığı da incelenir." : "Gözlemler savla uyumlu; destek artar, mantıksal kesinlik oluşmaz.",
        `${popper.approach} (${popper.names[0]}): ${popper.question}`,
      ],
    };
  },
};
check230(scienceSection230.figureTitle === scienceSection230.title, "bilim çizimi bölüm başlığıyla eşleşmeli");

export const depthFigures230: Record<string, Record<string, FigureDef>> = {
  "felsefeyi-tanima": { [traitSection230.title]: traitFigure },
  "felsefe-ile-dusunme": { [inferenceSection230.title]: inferenceFigure },
  "varlik-felsefesi": { [beingSection230.title]: beingFigure },
  "bilgi-felsefesi": { [knowSection230.title]: knowFigure },
  "bilim-felsefesi": { [scienceSection230.title]: swanFigure },
};
