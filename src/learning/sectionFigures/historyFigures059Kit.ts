import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Forge059 TYT Tarih figürleri için ortak yapı taşları: seçilebilir yıl
 * çizelgesi, seçilebilir kart panosu, düşey adım zinciri ve kutu/bağ
 * çizimi. Bütün tarih, ad ve açıklamalar figürü kullanan dosyada bölüm
 * metninden alınır; burada veri yoktur.
 */

export type Ev = { y: number; y1?: number; s: string; what: string; tone?: Tone };

export const rectEl = (x0: number, y0: number, x1: number, y1: number, s: { tone?: Tone; fill?: Tone; thin?: boolean; bold?: boolean; dash?: boolean } = {}): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], s);

const yearText = (e: Ev) => `${e.y}${e.y1 ? `–${e.y1}` : ""}`;

/**
 * Yıl çizelgesi: her olay bir satır; adı solda (seçilebilir), yılı eksende
 * nokta (dönemse çubuk). Adına tıklayınca olayın bölümdeki açıklaması açılır.
 */
export function timelineFig(o: {
  events: Ev[];
  a0: number;
  a1: number;
  ticks: number[];
  caption: string;
  alt: string;
  foot: string;
  legend?: { code: string; label: string; tone: Tone }[];
}): FigureDef {
  const W = 9.6;
  const K = W / (o.a1 - o.a0);
  const X = (y: number) => (y - o.a0) * K;
  const ROW = 1.6;
  const n = o.events.length;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: Math.max(480, n * 48 + 40),
    picks: o.events.map((e) => ({ label: `${yearText(e)} ${e.s}`, title: `${yearText(e)} · ${e.s}`, detail: [e.what] })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      const top = (n - 1) * ROW;
      els.push(seg(v(0, -0.5), v(W, -0.5), { tone: "muted" }));
      for (const y of o.ticks) els.push(seg(v(X(y), -0.6), v(X(y), -0.4), { tone: "muted" }), txt(v(X(y), -0.65), String(y), "s", { small: true, tone: "muted" }));
      o.events.forEach((e, i) => {
        const y = top - i * ROW;
        const on = pick === i;
        const tone: Tone = on ? "a" : (e.tone ?? "c");
        els.push(seg(v(-0.2, y), v(X(e.y) - 0.14, y), { tone: on ? "a" : "muted", thin: !on, dash: !on }));
        if (e.y1) els.push(poly([v(X(e.y), y - 0.13), v(X(e.y1), y - 0.13), v(X(e.y1), y + 0.13), v(X(e.y), y + 0.13)], { tone, fill: tone, thin: true }));
        else els.push(ball(v(X(e.y), y), on ? 0.14 : 0.1, tone));
        els.push(txt(v(-0.4, y), `${yearText(e)} ${e.s}`, "w", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
      });
      els.push(txt(v(-0.6, top + 0.6), " ", "c"), txt(v(W + 0.4, -1.5), " ", "c"));
      const sel = pick >= 0 ? o.events[pick] : undefined;
      return { els, legend: o.legend, readout: [sel ? `${yearText(sel)} ${sel.s}: ${sel.what}` : "Bir olayın adına tıkla ya da aşağıdan seç.", o.foot] };
    },
  };
}

export type Card = { name: string; tag: string; what: string; tone: Tone };
/** Seçilebilir kart panosu: ad kalın, kısa etiket (" · " ile satırlara bölünür) altında. */
export function boardFig(cards: Card[], cols: number, caption: string, alt: string, foot: string, w = 3.9): FigureDef {
  return {
    caption,
    alt,
    picks: cards.map((c) => ({ label: c.name, title: `${c.name} · ${c.tag.replaceAll(" · ", ", ")}`, detail: [c.what] })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      const maxLines = Math.max(...cards.map((c) => c.tag.split(" · ").length));
      const H = 1.6 + 0.85 * maxLines;
      const rows = Math.ceil(cards.length / cols);
      cards.forEach((c, i) => {
        const x = (i % cols) * (w + 0.3);
        const y = (rows - 1 - Math.floor(i / cols)) * (H + 0.3);
        const on = pick === i;
        els.push(rectEl(x, y, x + w, y + H, { tone: on ? "a" : c.tone, fill: on ? "a" : c.tone, thin: !on, bold: on }));
        els.push(txt(v(x + w / 2, y + H - 0.6), c.name, "c", { bold: true, tone: "ink", pick: i }));
        c.tag.split(" · ").forEach((l, k) => els.push(txt(v(x + w / 2, y + H - 1.45 - k * 0.85), l, "c", { small: true, tone: on ? "ink" : "muted" })));
      });
      els.push(txt(v(-0.2, rows * (H + 0.3) + 0.1), " ", "c"), txt(v(cols * (w + 0.3), -0.3), " ", "c"));
      const sel = pick >= 0 ? cards[pick] : undefined;
      return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir kutuya tıkla ya da aşağıdan seç.", foot] };
    },
  };
}

/**
 * Düşey adım zinciri: her adım bir kutu; adım düğmesi ilerledikçe kutular
 * etkinleşir. Yıl ve ad kutuda, açıklama okuma satırında.
 */
export function stepsFig(o: { items: { s: string; what: string; tone?: Tone }[]; caption: string; alt: string; foot: string; w?: number }): FigureDef {
  const w = o.w ?? 6.4;
  return {
    caption: o.caption,
    alt: o.alt,
    steps: o.items.map((it) => it.s),
    draw: (_v, step) => {
      const els: El[] = [];
      const n = o.items.length;
      o.items.forEach((it, i) => {
        const y = (n - 1 - i) * 1.15;
        const on = i <= step;
        const cur = i === step;
        const tone = it.tone ?? "c";
        els.push(rectEl(2, y - 0.38, 2 + w, y + 0.38, { tone: cur ? "a" : on ? tone : "muted", fill: on ? (cur ? "a" : tone) : undefined, thin: !cur, bold: cur, dash: !on }));
        els.push(txt(v(2 + w / 2, y), it.s, "c", { small: true, bold: on, tone: on ? "ink" : "muted" }));
        if (i < n - 1) els.push(vec(v(2 + w / 2, y - 0.42), v(2 + w / 2, y - 0.73), { thin: true, tone: i < step ? "ink" : "muted" }));
      });
      els.push(txt(v(0, (n - 1) * 1.15 + 0.6), " ", "c"), txt(v(4 + w, -0.6), " ", "c"));
      const cur = o.items[step];
      return { els, readout: [`${cur.s}: ${cur.what}`, o.foot] };
    },
  };
}

/** Ortasında yazı olan kutu (seçilebilir olabilir). */
export function node(c: V, w: number, h: number, s: string, tone: Tone, opts: { pick?: number; on?: boolean; small?: boolean } = {}): El[] {
  const on = opts.on ?? false;
  return [
    rectEl(c[0] - w / 2, c[1] - h / 2, c[0] + w / 2, c[1] + h / 2, { tone: on ? "a" : tone, fill: on ? "a" : tone, thin: !on, bold: on }),
    txt(c, s, "c", { small: opts.small ?? true, bold: true, tone: on ? "a" : "ink", pick: opts.pick }),
  ];
}

/** Üst kutunun altından alt kutunun üstüne dirsekli bağ. */
export function elbow(a: V, b: V, tone: Tone = "muted"): El[] {
  const my = (a[1] + b[1]) / 2;
  return [seg(a, v(a[0], my), { thin: true, tone }), seg(v(a[0], my), v(b[0], my), { thin: true, tone }), seg(v(b[0], my), b, { thin: true, tone })];
}
