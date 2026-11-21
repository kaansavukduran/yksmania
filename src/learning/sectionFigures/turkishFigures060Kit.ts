import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { LABEL_FS, SMALL_FS, textWidth } from "./labelPlacement";

/*
 * Forge060 Türkçe ve Felsefe figür yardımcıları. Her pano 10 birim genişlikte
 * çizilir ve yükseklik sınırı içerikten hesaplanır; böylece çizim ölçeği sabit
 * kalır (birim başına ≈ 53 SVG birimi) ve satır kaydırma yazının gerçek
 * genişliğiyle yapılır. Panolar kavram şemasıdır, ölçekli değildir; seçim ve
 * adım düğmeleri öğrenme kaydı üretmez.
 */

/** Çizim ölçeği: 10 birim genişlik → 532 SVG birimi. */
export const SC = 53.2;
/** Pano genişliği (çizim birimi). */
export const CW = 10;
/** Satır aralığı: küçük yazı ve kalın başlık. */
export const LH = 0.58;
export const LHB = 0.68;
/** "e" ile bağlanan yazının bağlantı noktasından sağa kayması (12 SVG birimi). */
const OFF = 12 / SC;

/** Yazının çizim birimi cinsinden genişliği. */
export const tw = (s: string, small = true, bold = false) =>
  textWidth(s, small ? SMALL_FS : LABEL_FS, small ? 500 : bold ? 700 : 600) / SC;

/** Sözcük sınırında satırlara böler; her satır `max` birimden dar kalır. */
export function wrap(s: string, max: number, small = true, bold = false): string[] {
  const out: string[] = [];
  for (const w of s.split(" ")) {
    const last = out[out.length - 1];
    if (last !== undefined && tw(`${last} ${w}`, small, bold) <= max) out[out.length - 1] = `${last} ${w}`;
    else out.push(w);
  }
  return out;
}

/** Dikdörtgen (x0,y0 sol üst; x1,y1 sağ alt). */
export const rect = (x0: number, y0: number, x1: number, y1: number, tone: Tone, fill = true, dash = false): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], fill ? { fill: tone, tone, thin: true, dash } : { tone, thin: true, dash });

/** Görünmez köşe etiketleri: pano genişliğini ve yüksekliğini sabitler. */
export const frame = (h: number, top = 0.45): El[] => [txt(v(-0.05, top), " ", "c"), txt(v(CW + 0.05, -h), " ", "c")];

/** Yükseklik sınırı: h birim içerik ölçeği düşürmeden sığar. */
export const fitH = (h: number, top = 0.45) => Math.ceil((h + top) * SC + 2 * 34 + 6);

export interface Line {
  s: string;
  tone?: Tone;
  bold?: boolean;
  small?: boolean;
  pick?: number;
}

/**
 * Kart: çerçeve, iç pay ve sola yaslı satırlar. Satırlar `max` genişliğe göre
 * önceden kaydırılmalıdır (cardLines). Alt kenarın y değerini döndürür.
 */
export function card(els: El[], x0: number, y0: number, x1: number, lines: Line[], tone: Tone, opts: { fill?: boolean; dash?: boolean; center?: boolean } = {}): number {
  const pad = 0.3;
  let y = y0 - pad - 0.2;
  const rows: El[] = [];
  lines.forEach((l, i) => {
    if (i > 0) y -= l.bold || lines[i - 1].bold ? LHB - 0.04 : LH;
    const small = l.small ?? !l.bold;
    rows.push(
      opts.center
        ? txt(v((x0 + x1) / 2, y), l.s, "c", { small, bold: l.bold, tone: l.tone ?? "ink", pick: l.pick })
        : txt(v(x0 + 0.2, y), l.s, "e", { small, bold: l.bold, tone: l.tone ?? "ink", pick: l.pick }),
    );
  });
  const y1 = y - 0.2 - pad;
  els.push(rect(x0, y0, x1, y1, tone, opts.fill ?? true, opts.dash), ...rows);
  return y1;
}

/** Kart içi kullanılabilir yazı genişliği (sola yaslı). */
export const inner = (x0: number, x1: number) => x1 - x0 - 0.4 - OFF - 0.12;

/** Başlık + metin satırlarını kart genişliğine göre hazırlar. */
export function cardLines(x0: number, x1: number, head: string | undefined, text: string | undefined, headTone: Tone = "ink", textTone: Tone = "ink", pick?: number): Line[] {
  const m = inner(x0, x1);
  const out: Line[] = [];
  if (head) wrap(head, m - (pick !== undefined ? 0.3 : 0), false, true).forEach((s, k) => out.push({ s, bold: true, tone: headTone, pick: k === 0 ? pick : undefined }));
  if (text) wrap(text, m).forEach((s) => out.push({ s, tone: textTone }));
  return out;
}

/** Düşey ok (kartlar arası). */
export const down = (x: number, y0: number, y1: number, tone: Tone = "muted"): El => vec(v(x, y0), v(x, y1), { tone, thin: true });
export const right = (y: number, x0: number, x1: number, tone: Tone = "muted"): El => vec(v(x0, y), v(x1, y), { tone, thin: true });

export interface Row {
  head: string;
  text: string;
  tone: Tone;
  detail: string[];
  title?: string;
}

/**
 * Seçilebilir satır panosu: solda renkli işaret şeridi, kalın başlık (seçim
 * düğmesi) ve altında açıklama. Seçilen satır vurgulanır, ayrıntı kartı açılır.
 */
export function rowsFig(o: { caption: string; alt: string; rows: Row[]; lead?: string; foot: string; prompt?: string }): FigureDef {
  const layoutRows = (pick: number) => {
    const els: El[] = [];
    let y = 0;
    if (o.lead) {
      for (const s of wrap(o.lead, CW - 0.6)) {
        els.push(txt(v(0, y), s, "e", { small: true, tone: "muted" }));
        y -= LH;
      }
      y -= 0.25;
    }
    o.rows.forEach((r, i) => {
      const sel = pick === i;
      const top = y + 0.42;
      const heads = wrap(r.head, CW - 1.2, true, true);
      const lines = wrap(r.text, CW - 1.1);
      heads.forEach((s, k) => {
        els.push(txt(v(0.35, y), s, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: k === 0 ? i : undefined }));
        y -= LH;
      });
      y -= 0.04;
      lines.forEach((s) => {
        els.push(txt(v(0.55, y), s, "e", { small: true, tone: r.tone === "muted" ? "ink" : r.tone }));
        y -= LH;
      });
      const bottom = y + LH - 0.3;
      els.push(rect(0, top, 0.16, bottom, sel ? "a" : r.tone, true));
      if (sel) els.push(rect(0.24, top, CW, bottom, "a", true));
      y -= 0.42;
    });
    return { els, h: -(y + 0.2) };
  };
  const h = Math.max(...[-1, ...o.rows.map((_, i) => i)].map((p) => layoutRows(p).h));
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    picks: o.rows.map((r) => ({ label: r.head, title: r.title ?? `${r.head}: ${r.text}`, detail: r.detail })),
    draw: (_v, _s, pick = -1) => {
      const { els } = layoutRows(pick);
      els.push(...frame(h));
      return {
        els,
        readout: [pick >= 0 ? o.rows[pick].detail[0] : (o.prompt ?? "Bir satıra tıkla ya da aşağıdan seç."), o.foot],
      };
    },
  };
}

export interface Rung {
  q: string;
  yes: string;
  tone: Tone;
}
export interface Walk {
  step: string;
  /** Örnek cümle ya da durum (readout'ta tam yazılır). */
  example: string;
  /** Örneğin "evet" dediği basamak; rungs.length = son "hayır" sonucu. */
  stop: number;
  why: string;
}

/**
 * Karar merdiveni: soru kartları yukarıdan aşağı; "evet" sağdaki sonuca,
 * "hayır" bir alttaki soruya götürür. Her adım bir örneği merdivende yürütür.
 */
export function ladderFig(o: { caption: string; alt: string; rungs: Rung[]; last: string; lastTone?: Tone; walks: Walk[]; foot: string; qw?: number }): FigureDef {
  const QX1 = o.qw ?? 5.3;
  const RX0 = QX1 + 1.3;
  const build = (stop: number) => {
    const els: El[] = [];
    let y = 0;
    o.rungs.forEach((r, i) => {
      const on = stop >= i;
      const hit = stop === i;
      const lines = wrap(r.q, inner(0, QX1)).map((s) => ({ s, tone: (on ? "ink" : "muted") as Tone }));
      const y1 = card(els, 0, y, QX1, lines, hit ? "a" : on ? "c" : "muted", { fill: on });
      const midY = (y + y1) / 2;
      els.push(right(midY, QX1 + 0.06, RX0 - 0.08, hit ? "a" : "muted"));
      els.push(txt(v((QX1 + RX0) / 2, midY + 0.08), "evet", "n", { small: true, tone: hit ? "a" : "muted" }));
      const res = wrap(r.yes, CW - RX0 - OFF - 0.08, true, true);
      const ry = midY + ((res.length - 1) * LH) / 2;
      res.forEach((s, k) => els.push(txt(v(RX0, ry - k * LH), s, "e", { small: true, bold: true, tone: hit ? "a" : r.tone })));
      const gap = 0.95;
      els.push(down(0.7, y1 - 0.06, y1 - gap + 0.06, stop > i ? "ink" : "muted"));
      els.push(txt(v(0.85, y1 - gap / 2), "hayır", "e", { small: true, tone: stop > i ? "ink" : "muted" }));
      y = y1 - gap;
    });
    const hitLast = stop === o.rungs.length;
    const lines = wrap(o.last, inner(0, QX1), true, true).map((s) => ({ s, bold: true, small: true, tone: (hitLast ? "a" : o.lastTone ?? "ink") as Tone }));
    const yEnd = card(els, 0, y, QX1, lines, hitLast ? "a" : "muted", { fill: hitLast });
    return { els, h: -yEnd + 0.1 };
  };
  const h = build(o.rungs.length).h;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.walks.map((w) => w.step),
    draw: (_v, step) => {
      const w = o.walks[Math.min(step, o.walks.length - 1)];
      const { els } = build(w.stop);
      els.push(...frame(h));
      return { els, readout: [`Örnek: ${w.example}`, w.why, o.foot] };
    },
  };
}

export interface FlowNode {
  head: string;
  text: string;
  tone: Tone;
  note: string;
}

/** Düşey akış: kartlar oklarla bağlanır; her adım bir kartı daha açar. */
export function flowFig(o: { caption: string; alt: string; nodes: FlowNode[]; steps: string[]; foot: string; reveal?: boolean }): FigureDef {
  const build = (step: number) => {
    const els: El[] = [];
    let y = 0;
    o.nodes.forEach((n, i) => {
      const shown = !o.reveal || i <= step;
      const cur = i === step;
      const lines = cardLines(0.3, CW - 0.3, n.head, shown ? n.text : "?", cur ? "a" : shown ? "ink" : "muted", shown ? "ink" : "muted");
      const y1 = card(els, 0.3, y, CW - 0.3, lines, cur ? "a" : shown ? n.tone : "muted", { fill: shown, dash: !shown });
      if (i < o.nodes.length - 1) els.push(down(CW / 2, y1 - 0.06, y1 - 0.62, i < step ? "ink" : "muted"));
      y = y1 - 0.68;
    });
    return { els, h: -y - 0.5 };
  };
  const h = build(o.nodes.length - 1).h;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.steps,
    draw: (_v, step) => {
      const { els } = build(step);
      els.push(...frame(h));
      return { els, readout: [o.nodes[Math.min(step, o.nodes.length - 1)].note, o.foot] };
    },
  };
}

export interface Col {
  name: string;
  w: number;
  tone?: Tone;
}
export interface TRow {
  cells: string[];
  tones?: (Tone | undefined)[];
  detail: string[];
  title?: string;
}

/**
 * Karşılaştırma tablosu: üstte sütun adları, her satırın ilk hücresi seçim
 * düğmesidir. Hücre yazısı sütun genişliğinde kaydırılır.
 */
export function tableFig(o: { caption: string; alt: string; cols: Col[]; rows: TRow[]; foot: string; prompt?: string }): FigureDef {
  const xs: number[] = [];
  let acc = 0;
  for (const c of o.cols) {
    xs.push(acc);
    acc += c.w;
  }
  const build = (pick: number) => {
    const els: El[] = [];
    let y = 0;
    const headLines = o.cols.map((c) => wrap(c.name, c.w - OFF - 0.25, true, true));
    const hn = Math.max(...headLines.map((l) => l.length));
    headLines.forEach((ls, j) => ls.forEach((s, k) => els.push(txt(v(xs[j], y - k * LH), s, "e", { small: true, bold: true, tone: o.cols[j].tone ?? "a" }))));
    y -= (hn - 1) * LH + 0.42;
    els.push(seg(v(0, y), v(CW, y), { tone: "muted", thin: true }));
    y -= 0.5;
    o.rows.forEach((r, i) => {
      const sel = pick === i;
      const cells = r.cells.map((c, j) => wrap(c, o.cols[j].w - OFF - 0.25 - (j === 0 ? 0.3 : 0), true, j === 0));
      const n = Math.max(...cells.map((l) => l.length));
      const top = y + 0.38;
      cells.forEach((ls, j) =>
        ls.forEach((s, k) =>
          els.push(
            txt(v(xs[j], y - k * LH), s, "e", {
              small: true,
              bold: j === 0,
              tone: sel ? "a" : j === 0 ? "ink" : (r.tones?.[j] ?? "ink"),
              pick: j === 0 && k === 0 ? i : undefined,
            }),
          ),
        ),
      );
      const bottom = y - (n - 1) * LH - 0.36;
      if (sel) els.push(rect(0, top, CW, bottom, "a", true));
      y = bottom - 0.12;
      if (i < o.rows.length - 1) els.push(seg(v(0, y), v(CW, y), { tone: "muted", thin: true, dash: true }));
      y -= 0.5;
    });
    return { els, h: -y - 0.2 };
  };
  const h = build(-1).h;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    picks: o.rows.map((r) => ({ label: r.cells[0], title: r.title ?? `${r.cells[0]}: ${r.cells.slice(1).join(" · ")}`, detail: r.detail })),
    draw: (_v, _s, pick = -1) => {
      const { els } = build(pick);
      els.push(...frame(h));
      return { els, readout: [pick >= 0 ? o.rows[pick].detail[0] : (o.prompt ?? "Bir satırın ilk hücresine tıkla ya da aşağıdan seç."), o.foot] };
    },
  };
}

export interface MapNode {
  x: number;
  y: number;
  label: string;
  tone: Tone;
  title: string;
  detail: string[];
}

/**
 * İlişki haritası: düğümler seçim düğmesi; kenarlar düz çizgi. Seçilen
 * düğümün kenarları koyulaşır. Kenar adları haritanın altında satır olarak
 * yazılır (çizgi üstünde yazı yok).
 */
export function mapFig(o: { caption: string; alt: string; nodes: MapNode[]; edges: [number, number][]; h: number; foot: string; prompt?: string; notes?: string[] }): FigureDef {
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(o.h),
    picks: o.nodes.map((n) => ({ label: n.label, title: n.title, detail: n.detail })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      for (const [a, b] of o.edges) {
        const A = o.nodes[a];
        const B = o.nodes[b];
        const on = pick === a || pick === b;
        els.push(seg(v(A.x, A.y), v(B.x, B.y), { tone: on ? "a" : "muted", thin: !on }));
      }
      o.nodes.forEach((n, i) => els.push(txt(v(n.x, n.y), n.label, "c", { small: true, bold: true, tone: pick === i ? "a" : n.tone, pick: i })));
      let y = -o.h + 0.25 + ((o.notes?.length ?? 0) - 1) * LH;
      for (const s of o.notes ?? []) {
        els.push(txt(v(0, y), s, "e", { small: true, tone: "muted" }));
        y -= LH;
      }
      els.push(...frame(o.h));
      return { els, readout: [pick >= 0 ? o.nodes[pick].detail[0] : (o.prompt ?? "Bir düğüme tıkla ya da aşağıdan seç."), o.foot] };
    },
  };
}

export interface Quad {
  head: string;
  text: string;
  tone: Tone;
  detail: string[];
}

/**
 * 2×2 tablo: iki ölçüt, dört hücre. Satır ve sütun adları dış kenarda; her
 * hücrenin başlığı seçim düğmesidir.
 */
export function quadFig(o: { caption: string; alt: string; cols: [string, string]; rows: [string, string]; axis: [string, string]; cells: [Quad, Quad, Quad, Quad]; foot: string }): FigureDef {
  const X0 = 2.2;
  const cw = (CW - X0) / 2;
  const build = (pick: number) => {
    const els: El[] = [];
    els.push(txt(v(X0 + cw, 0), o.axis[0], "c", { small: true, tone: "muted" }));
    o.cols.forEach((c, j) => els.push(txt(v(X0 + cw * (j + 0.5), -0.62), c, "c", { small: true, bold: true, tone: "ink" })));
    const lines = o.cells.map((c, i) => cardLines(0, cw, c.head, c.text, pick === i ? "a" : "ink", "ink", i));
    const rowH = [0, 1].map((r) => Math.max(...[0, 1].map((j) => lines[r * 2 + j].length)));
    let y = -1.05;
    const rowName = o.rows.map((r) => wrap(r, X0 - 0.4, true, true));
    for (let r = 0; r < 2; r++) {
      let bottom = y;
      for (let j = 0; j < 2; j++) {
        const i = r * 2 + j;
        const ls = [...lines[i]];
        while (ls.length < rowH[r]) ls.push({ s: " " });
        bottom = card(els, X0 + j * cw + 0.06, y, X0 + (j + 1) * cw - 0.06, ls, pick === i ? "a" : o.cells[i].tone);
      }
      const my = (y + bottom) / 2 + ((rowName[r].length - 1) * LH) / 2;
      rowName[r].forEach((s, k) => els.push(txt(v(0, my - k * LH), s, "e", { small: true, bold: true, tone: "ink" })));
      y = bottom - 0.12;
    }
    els.push(txt(v(0, y - 0.45), o.axis[1], "e", { small: true, tone: "muted" }));
    return { els, h: -(y - 0.45) + 0.3 };
  };
  const h = build(-1).h;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    picks: o.cells.map((c) => ({ label: c.head, title: `${c.head}: ${c.text}`, detail: c.detail })),
    draw: (_v, _s, pick = -1) => {
      const { els } = build(pick);
      els.push(...frame(h));
      return { els, readout: [pick >= 0 ? o.cells[pick].detail[0] : "Bir hücrenin başlığına tıkla ya da aşağıdan seç.", o.foot] };
    },
  };
}

export interface Era {
  when: string;
  head: string;
  text: string;
  tone: Tone;
  detail: string[];
}

/** Düşey zaman/sıra çizelgesi: solda eksen, her durakta kalın ad ve kısa not. */
export function timelineFig(o: { caption: string; alt: string; eras: Era[]; foot: string; prompt?: string }): FigureDef {
  const TX = 2.6;
  const build = (pick: number) => {
    const els: El[] = [];
    let y = 0;
    const ys: number[] = [];
    o.eras.forEach((e, i) => {
      const sel = pick === i;
      ys.push(y);
      wrap(e.when, TX - 0.7, true).forEach((s, k) => els.push(txt(v(TX - 0.35, y - k * LH), s, "w", { small: true, tone: "muted" })));
      els.push(rect(TX - 0.11, y + 0.11, TX + 0.11, y - 0.11, sel ? "a" : e.tone, true));
      const heads = wrap(e.head, CW - TX - 0.9, true, true);
      let yy = y;
      heads.forEach((s, k) => {
        els.push(txt(v(TX + 0.25, yy), s, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: k === 0 ? i : undefined }));
        yy -= LH;
      });
      wrap(e.text, CW - TX - 0.75).forEach((s) => {
        els.push(txt(v(TX + 0.4, yy), s, "e", { small: true, tone: e.tone === "muted" ? "ink" : e.tone }));
        yy -= LH;
      });
      y = Math.min(yy, y - Math.max(1, wrap(e.when, TX - 0.7).length) * LH) - 0.45;
    });
    els.push(seg(v(TX, ys[0] + 0.3), v(TX, ys[ys.length - 1] - 0.3), { tone: "muted", thin: true }));
    return { els, h: -y - 0.2 };
  };
  const h = build(-1).h;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    picks: o.eras.map((e) => ({ label: e.head, title: `${e.head}: ${e.text}`, detail: e.detail })),
    draw: (_v, _s, pick = -1) => {
      const { els } = build(pick);
      els.push(...frame(h));
      return { els, readout: [pick >= 0 ? o.eras[pick].detail[0] : (o.prompt ?? "Bir durağa tıkla ya da aşağıdan seç."), o.foot] };
    },
  };
}

export interface TreeNode {
  label: string;
  title: string;
  detail: string[];
}
export interface Branch extends TreeNode {
  tone: Tone;
  leaves: TreeNode[];
}

/**
 * Sınıflama ağacı: üstte kök kavram, altında iki ya da üç dal; her dalın
 * yaprakları dalın altında bir omurga çizgisine bağlı alt alta dizilir.
 * Dal ve yaprak adları seçim düğmesidir.
 */
export function treeFig(o: { caption: string; alt: string; root: string; branches: Branch[]; foot: string; prompt?: string }): FigureDef {
  const n = o.branches.length;
  const colW = CW / n;
  const nodes: TreeNode[] = o.branches.flatMap((b) => [b, ...b.leaves]);
  const maxLeaves = Math.max(...o.branches.map((b) => b.leaves.length));
  const STEP = 0.74;
  const HEAD_Y = -1.35;
  const h = -(HEAD_Y - 0.55 - maxLeaves * STEP) + 0.1;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    picks: nodes.map((x) => ({ label: x.label, title: x.title, detail: x.detail })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [txt(v(CW / 2, 0), o.root, "c", { bold: true, tone: "ink" })];
      const BUS = -0.55;
      els.push(seg(v(CW / 2, -0.3), v(CW / 2, BUS), { tone: "muted", thin: true }));
      els.push(seg(v(colW / 2, BUS), v(CW - colW / 2, BUS), { tone: "muted", thin: true }));
      let k = 0;
      o.branches.forEach((b, j) => {
        const cx = colW * (j + 0.5);
        const bi = k++;
        const selB = pick === bi;
        els.push(seg(v(cx, BUS), v(cx, HEAD_Y + 0.33), { tone: selB ? "a" : "muted", thin: true }));
        els.push(txt(v(cx, HEAD_Y), b.label, "c", { small: true, bold: true, tone: selB ? "a" : b.tone, pick: bi }));
        const sx = colW * j + 0.3;
        const lastY = HEAD_Y - 0.55 - (b.leaves.length - 0.5) * STEP;
        els.push(seg(v(cx, HEAD_Y - 0.33), v(cx, HEAD_Y - 0.48), { tone: "muted", thin: true }));
        els.push(seg(v(sx, HEAD_Y - 0.48), v(cx, HEAD_Y - 0.48), { tone: "muted", thin: true }));
        els.push(seg(v(sx, HEAD_Y - 0.48), v(sx, lastY), { tone: selB ? "a" : b.tone, thin: true }));
        b.leaves.forEach((l, i) => {
          const li = k++;
          const y = HEAD_Y - 0.55 - (i + 0.5) * STEP;
          const sel = pick === li || selB;
          els.push(seg(v(sx, y), v(sx + 0.22, y), { tone: sel ? "a" : b.tone, thin: true }));
          els.push(txt(v(sx + 0.2, y), l.label, "e", { small: true, tone: pick === li ? "a" : "ink", pick: li }));
        });
      });
      els.push(...frame(h));
      return { els, readout: [pick >= 0 ? nodes[pick].detail[0] : (o.prompt ?? "Bir dala ya da yaprağa tıkla, ya da aşağıdan seç."), o.foot] };
    },
  };
}

/**
 * Argüman şeması: iki öncül kartı yan yana, oklar sonuç kartında birleşir.
 * Adımlar önce öncülleri, sonra sonucu, en son denetim notunu gösterir.
 */
export function argFig(o: { caption: string; alt: string; premises: [string, string]; conclusion: string; marker: string; steps: { label: string; note: string }[]; foot: string; conclusionTone?: Tone }): FigureDef {
  const build = (step: number) => {
    const els: El[] = [];
    const L = cardLines(0, 4.85, "Öncül", o.premises[0], "ink", "ink");
    const R = cardLines(5.15, CW, "Öncül", o.premises[1], "ink", "ink");
    while (L.length < R.length) L.push({ s: " " });
    while (R.length < L.length) R.push({ s: " " });
    const yb = card(els, 0, 0, 4.85, L, "c");
    card(els, 5.15, 0, CW, R, "c");
    const yc = yb - 1.3;
    const on = step >= 1;
    els.push(vec(v(2.4, yb - 0.06), v(4.4, yc + 0.08), { tone: on ? "ink" : "muted", thin: true }));
    els.push(vec(v(7.6, yb - 0.06), v(5.6, yc + 0.08), { tone: on ? "ink" : "muted", thin: true }));
    els.push(txt(v(CW / 2, (yb + yc) / 2 + 0.1), o.marker, "c", { small: true, bold: true, tone: on ? "a" : "muted" }));
    const C = cardLines(1.4, CW - 1.4, "Sonuç", on ? o.conclusion : "?", on ? "a" : "muted", on ? "ink" : "muted");
    const yEnd = card(els, 1.4, yc, CW - 1.4, C, on ? (o.conclusionTone ?? "a") : "muted", { fill: on, dash: !on });
    return { els, h: -yEnd + 0.1 };
  };
  const h = build(1).h;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.steps.map((s) => s.label),
    draw: (_v, step) => {
      const { els } = build(step);
      els.push(...frame(h));
      return { els, readout: [o.steps[Math.min(step, o.steps.length - 1)].note, o.foot] };
    },
  };
}

export interface Grouping {
  tokens: string[];
  /** level: iç içe öbekte köşeli çizginin katı (0 üstte); verilirse sıra yerine kat kullanılır. */
  groups: { from: number; to: number; label: string; tone: Tone; level?: number }[];
  note: string;
  noteTone?: Tone;
}

/**
 * Gruplama karşılaştırması: aynı sözcükler farklı işaretle yazılır, her
 * yazılışın altında köşeli çizgiyle hangi sözlerin bir öbek kurduğu ve
 * öbeğin görevi gösterilir. Bitişik öbek adları iki sıraya dağıtılır.
 */
export function groupFig(o: { caption: string; alt: string; variants: Grouping[]; foot: string }): FigureDef {
  const GAP = 0.28;
  const build = () => {
    const els: El[] = [];
    let y = 0;
    o.variants.forEach((g) => {
      const ws = g.tokens.map((t) => tw(t, false, true));
      const total = ws.reduce((a, b) => a + b, 0) + GAP * (ws.length - 1);
      let x = Math.max(0.3, (CW - total) / 2);
      const xs = ws.map((w) => {
        const x0 = x;
        x += w + GAP;
        return [x0, x0 + w] as const;
      });
      g.tokens.forEach((t, i) => els.push(txt(v((xs[i][0] + xs[i][1]) / 2, y), t, "c", { bold: true, tone: "ink" })));
      const by = y - 0.5;
      let low = by - 0.4;
      g.groups.forEach((gr, k) => {
        const x0 = xs[gr.from][0] - 0.04;
        const x1 = xs[gr.to][1] + 0.04;
        const bl = by - (gr.level ?? 0) * 0.95;
        els.push(seg(v(x0, bl), v(x1, bl), { tone: gr.tone }), seg(v(x0, bl), v(x0, bl + 0.12), { tone: gr.tone }), seg(v(x1, bl), v(x1, bl + 0.12), { tone: gr.tone }));
        const ly = gr.level === undefined ? bl - 0.4 - (k % 2) * LH : bl - 0.4;
        low = Math.min(low, ly);
        const cx = Math.min(Math.max((x0 + x1) / 2, tw(gr.label) / 2 + 0.1), CW - tw(gr.label) / 2 - 0.1);
        els.push(txt(v(cx, ly), gr.label, "c", { small: true, tone: gr.tone }));
      });
      y = low - LH - 0.05;
      for (const s of wrap(g.note, CW - 0.6)) {
        els.push(txt(v(0, y), s, "e", { small: true, tone: g.noteTone ?? "muted" }));
        y -= LH;
      }
      y -= 0.6;
    });
    return { els, h: -y - 0.4 };
  };
  const { h } = build();
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    draw: () => {
      const { els } = build();
      els.push(...frame(h));
      return { els, readout: [o.foot] };
    },
  };
}

export type Kind = "kök" | "yapım" | "çekim" | "ara";
export interface Morph {
  s: string;
  kind: Kind;
  label: string;
}
export interface Parse {
  step: string;
  word: string;
  context: string;
  parts: Morph[];
  note: string;
}
const KIND_TONE: Record<Kind, Tone> = { kök: "ink", yapım: "c", çekim: "b", ara: "muted" };
const KIND_NAME: Record<Kind, string> = { kök: "kök / taban", yapım: "yapım eki", çekim: "çekim eki", ara: "ses ya da ara ek" };
const KIND_SHAPE: Record<Kind, string> = { kök: "kalın çerçeve", yapım: "dolu kutu", çekim: "kesik çerçeve", ara: "soluk kutu" };

/**
 * Kök–ek ayrıştırması: her parça bir satır. Kök kalın çerçeve, yapım eki dolu
 * kutu, çekim eki kesik çerçeve, ara parçalar soluk dolgu: renk ve biçim
 * birlikte ayırt eder. Adımlar bölümdeki sözcükleri sırayla açar.
 */
export function splitFig(o: { caption: string; alt: string; parses: Parse[]; foot: string }): FigureDef {
  const BX1 = 2.9;
  const build = (p: Parse) => {
    const els: El[] = [];
    let y = 0;
    for (const s of wrap(p.context, CW - 0.4)) {
      els.push(txt(v(0, y), s, "e", { small: true, tone: "muted" }));
      y -= LH;
    }
    y -= 0.05;
    p.parts.forEach((m) => {
      const tone = KIND_TONE[m.kind];
      const lines = wrap(`${KIND_NAME[m.kind]}: ${m.label}`, CW - BX1 - 0.6);
      const hh = Math.max(0.42, ((lines.length - 1) * LH) / 2 + 0.36);
      const top = y;
      const bottom = y - 2 * hh;
      const cy = y - hh;
      els.push(
        m.kind === "kök"
          ? poly([v(0, top), v(BX1, top), v(BX1, bottom), v(0, bottom)], { tone, bold: true })
          : rect(0, top, BX1, bottom, tone, m.kind !== "çekim", m.kind === "çekim"),
      );
      els.push(txt(v(BX1 / 2, cy), m.s, "c", { bold: true, tone: m.kind === "ara" ? "muted" : "ink" }));
      const ly = cy + ((lines.length - 1) * LH) / 2;
      lines.forEach((s, k) => els.push(txt(v(BX1 + 0.2, ly - k * LH), s, "e", { small: true, tone: m.kind === "ara" ? "ink" : tone })));
      y = bottom - 0.2;
    });
    return { els, h: -y - 0.2 };
  };
  const h = Math.max(...o.parses.map((p) => build(p).h));
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.parses.map((p) => p.step),
    draw: (_v, step) => {
      const p = o.parses[Math.min(step, o.parses.length - 1)];
      const { els } = build(p);
      els.push(...frame(h));
      return {
        els,
        word: p.parts.map((m) => ({ s: m.s.replace(/^-|-$/g, ""), tone: KIND_TONE[m.kind], label: KIND_NAME[m.kind] })),
        legend: (["kök", "yapım", "çekim", "ara"] as Kind[]).filter((k) => p.parts.some((m) => m.kind === k)).map((k) => ({ code: "", label: `${KIND_NAME[k]}: ${KIND_SHAPE[k]}`, tone: KIND_TONE[k] })),
        readout: [`${p.word}: ${p.note}`, o.foot],
      };
    },
  };
}
