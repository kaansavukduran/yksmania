import { circle, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { rectEl } from "./historyFigures059Kit";

/*
 * Forge061 TYT Biyoloji, Tarih ve Kimya figürleri için ortak akış şeması:
 * kutular (düğümler) ve aralarındaki oklar. Oklar kutu kenarından kırpılır,
 * böylece ok ucu yazının üstüne binmez. Adım verilirse kutular ve oklar
 * sırayla etkinleşir; seçim verilirse kutunun adı tıklanınca bölüm metnindeki
 * açıklama açılır. Burada veri yoktur; bütün metinler figür dosyalarında
 * ilgili bölümden alınır.
 */

export type FlowNode = {
  /** Kutu merkezi. */
  c: V;
  w: number;
  h?: number;
  /** Kutudaki kısa ad (satırlar " · " ile ayrılır). */
  s: string;
  tone?: Tone;
  /** Seçilince açılan açıklama (bölüm metninden). */
  what?: string;
  /** Bu kutunun etkinleştiği adım (verilmezse hep etkin). */
  step?: number;
  dash?: boolean;
};
export type FlowEdge = { a: number; b: number; s?: string; step?: number; dash?: boolean; at?: "n" | "s" | "e" | "w" };

/** a merkezli w×h kutunun, b yönündeki kenar noktası (biraz dışarıda). */
export function edgePoint(c: V, w: number, h: number, toward: V, gap = 0.1): V {
  const dx = toward[0] - c[0];
  const dy = toward[1] - c[1];
  const tx = dx ? (w / 2 + gap) / Math.abs(dx) : Infinity;
  const ty = dy ? (h / 2 + gap) / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty, 1);
  return v(c[0] + dx * t, c[1] + dy * t);
}

/** Düğümleri ve okları çizer; seçili ya da o adımda açılan kutu vurgulanır. */
export function flowEls(nodes: FlowNode[], edges: FlowEdge[], o: { step?: number; pick?: number; picks?: boolean } = {}): El[] {
  const step = o.step ?? 99;
  const els: El[] = [];
  const lineH = 0.74;
  const hOf = (n: FlowNode) => Math.max(n.h ?? 0.9, 0.3 + n.s.split(" · ").length * lineH);
  edges.forEach((e) => {
    const A = nodes[e.a];
    const B = nodes[e.b];
    const on = (e.step ?? 0) <= step;
    const p = edgePoint(A.c, A.w, hOf(A), B.c);
    const q = edgePoint(B.c, B.w, hOf(B), A.c, 0.14);
    els.push(vec(p, q, { tone: on ? "ink" : "muted", thin: true, dash: e.dash || !on }));
    if (e.s && on) {
      const m = v((p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
      els.push(txt(m, e.s, e.at ?? (Math.abs(q[0] - p[0]) > Math.abs(q[1] - p[1]) ? "n" : "e"), { small: true, tone: "a" }));
    }
  });
  let k = 0;
  nodes.forEach((n, i) => {
    const h = hOf(n);
    const on = (n.step ?? 0) <= step;
    const cur = n.step !== undefined && n.step === step;
    const sel = o.pick === i;
    const tone: Tone = sel || cur ? "a" : on ? (n.tone ?? "c") : "muted";
    els.push(rectEl(n.c[0] - n.w / 2, n.c[1] - h / 2, n.c[0] + n.w / 2, n.c[1] + h / 2, { tone, fill: on ? tone : undefined, thin: !(sel || cur), bold: sel || cur, dash: n.dash || !on }));
    const lines = n.s.split(" · ");
    const pickIdx = o.picks && n.what ? k++ : undefined;
    lines.forEach((l, j) =>
      els.push(txt(v(n.c[0], n.c[1] + ((lines.length - 1) / 2 - j) * lineH), l, "c", { small: true, bold: j === 0, tone: on ? "ink" : "muted", pick: j === 0 ? pickIdx : undefined })),
    );
  });
  return els;
}

/**
 * Seçilebilir akış şeması: kutuların adına tıklayınca açıklama kartı açılır.
 * Yalnız `what` taşıyan kutular seçilebilir.
 */
export function flowPickFig(o: { nodes: FlowNode[]; edges: FlowEdge[]; caption: string; alt: string; foot: string; prompt?: string; extra?: El[] }): FigureDef {
  const pickable = o.nodes.map((n, i) => ({ n, i })).filter((x) => x.n.what);
  return {
    caption: o.caption,
    alt: o.alt,
    picks: pickable.map(({ n }) => ({ label: n.s.replaceAll(" · ", " "), title: n.s.length > 3 ? n.s.replaceAll(" · ", " ") : `${n.s}: ${(n.what as string).split(/[.;]/)[0]}`, detail: [n.what as string] })),
    draw: (_v, _s, pick = -1) => {
      const node = pick >= 0 ? pickable[pick]?.i : undefined;
      const els = [...flowEls(o.nodes, o.edges, { pick: node, picks: true }), ...(o.extra ?? [])];
      const sel = pick >= 0 ? pickable[pick]?.n : undefined;
      return { els, readout: [sel ? `${sel.s.replaceAll(" · ", " ")}: ${sel.what}` : (o.prompt ?? "Bir kutunun adına tıkla ya da aşağıdan seç."), o.foot] };
    },
  };
}

/**
 * Adımlı akış şeması: her adımda o adıma ait kutular ve oklar etkinleşir;
 * okuma satırı adımın bölümdeki açıklamasını verir.
 */
export function flowStepFig(o: { nodes: FlowNode[]; edges: FlowEdge[]; steps: { s: string; what: string }[]; caption: string; alt: string; foot: string; extra?: El[] }): FigureDef {
  return {
    caption: o.caption,
    alt: o.alt,
    steps: o.steps.map((s) => s.s),
    draw: (_v, step) => ({ els: [...flowEls(o.nodes, o.edges, { step }), ...(o.extra ?? [])], readout: [`${o.steps[step].s}: ${o.steps[step].what}`, o.foot] }),
  };
}

export type LEv = { y: number; t: string; s: string; what: string; tone?: Tone };
/**
 * Yıl yazısı ayrıca verilen çizelge (MÖ tarihleri için): y sayısal konum
 * (MÖ negatif), t ekranda yazılan yıl. Satır adı seçilebilir; eksendeki
 * konumlar ölçeklidir, yazılar değil.
 */
export function labeledTimeline(o: { events: LEv[]; a0: number; a1: number; ticks: { y: number; t: string }[]; caption: string; alt: string; foot: string }): FigureDef {
  const W = 9.6;
  const X = (y: number) => ((y - o.a0) / (o.a1 - o.a0)) * W;
  const ROW = 1.6;
  const n = o.events.length;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: Math.max(480, n * 48 + 40),
    picks: o.events.map((e) => ({ label: `${e.t} ${e.s}`, title: `${e.t} · ${e.s}`, detail: [e.what] })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      const top = (n - 1) * ROW;
      els.push(seg(v(0, -0.5), v(W, -0.5), { tone: "muted" }));
      for (const k of o.ticks) els.push(seg(v(X(k.y), -0.6), v(X(k.y), -0.4), { tone: "muted" }), txt(v(X(k.y), -0.65), k.t, "s", { small: true, tone: "muted" }));
      o.events.forEach((e, i) => {
        const y = top - i * ROW;
        const on = pick === i;
        els.push(seg(v(-0.2, y), v(X(e.y) - 0.16, y), { tone: on ? "a" : "muted", thin: !on, dash: !on }));
        els.push(circle(v(X(e.y), y), on ? 0.15 : 0.11, { tone: on ? "a" : (e.tone ?? "c"), fill: on ? "a" : (e.tone ?? "c") }));
        els.push(txt(v(-0.4, y), `${e.t} ${e.s}`, "w", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
      });
      els.push(txt(v(-0.6, top + 0.6), " ", "c"), txt(v(W + 0.4, -1.5), " ", "c"));
      const sel = pick >= 0 ? o.events[pick] : undefined;
      return { els, readout: [sel ? `${sel.t} ${sel.s}: ${sel.what}` : "Bir olayın adına tıkla ya da aşağıdan seç.", o.foot] };
    },
  };
}

/** Tablo çiziminde ilk sütun yazılarını seçilebilir yapar (i. ad → seçim i). */
export function pickRows(els: El[], names: string[]): El[] {
  const used = new Set<number>();
  return els.map((el) => {
    if (el.k !== "text") return el;
    const i = names.indexOf(el.s);
    if (i < 0 || used.has(i)) return el;
    used.add(i);
    return { ...el, pick: i };
  });
}
