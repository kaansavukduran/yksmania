import { fmt, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { CW, fitH, frame, LH, rect, tw, wrap } from "./turkishFigures060Kit";

/*
 * Forge061 Türkçe ve Felsefe ek çizim yardımcıları: sayısal çubuk panosu,
 * daire dilimi, numaralı cümle yığını ve iç içe kapsam kümeleri. Hepsi
 * Forge060 kitinin 10 birimlik pano ölçeğini kullanır. Sayılar yalnız bölüm
 * metninden gelir ve hesaplar burada yapılır; adımlar ve seçimler öğrenme
 * kaydı üretmez.
 */

/** Çubuk panosu ekseni: etiket sütunu ve çubuk başlangıcı. */
const LX = 2.75;
const BX = 2.95;

export interface Bar {
  label: string;
  value: number;
  /** Çubuğun koyu (seçili) bölümü; verilmezse yok. */
  part?: number;
  tone: Tone;
  /** Çubuğun sağına yazılan değer metni. */
  text: string;
}
export interface BarStep {
  label: string;
  /** Eksen başlangıcı (görsel uzunluk bunu sıfır alır). */
  base: number;
  /** Eksenin sağ ucu. */
  top: number;
  bars: Bar[];
  /** Ölçüm köprüsü: iki çubuğun uçları arasındaki fark çizgisi ve etiketi. */
  bridge?: { from: number; to: number; label: string };
  readout: string[];
}

/**
 * Yatay çubuklar: her adım aynı ya da farklı eksenle çizilir. Değerler ve
 * eksen uçları adımın verisinden gelir; görsel uzunluk (değer − başlangıç)
 * ile orantılıdır.
 */
export function barsFig(o: { caption: string; alt: string; steps: BarStep[]; foot: string; unit?: string }): FigureDef {
  const ROW = 1.05;
  const build = (st: BarStep) => {
    const els: El[] = [];
    const maxText = Math.max(...st.bars.map((b) => tw(b.text)));
    const span = CW - BX - maxText - 0.35;
    const X = (x: number) => BX + ((x - st.base) / (st.top - st.base)) * span;
    let y = 0;
    if (st.bridge) y -= 0.9;
    const rows: number[] = [];
    st.bars.forEach((b) => {
      rows.push(y);
      wrap(b.label, LX - 0.2, true, true).forEach((s, k, a) => els.push(txt(v(LX, y + ((a.length - 1) * LH) / 2 - k * LH), s, "w", { small: true, bold: true, tone: "ink" })));
      els.push(rect(BX, y + 0.26, X(b.value), y - 0.26, b.tone, b.part === undefined));
      if (b.part !== undefined) els.push(rect(BX, y + 0.26, X(b.part), y - 0.26, "a", true));
      els.push(txt(v(X(b.value) + 0.12, y), b.text, "e", { small: true, tone: "ink" }));
      y -= ROW;
    });
    const ay = y + ROW - 0.55;
    els.push(seg(v(BX, rows[0] + 0.45), v(BX, ay), { tone: "muted", thin: true }));
    els.push(seg(v(BX, ay), v(X(st.top), ay), { tone: "muted", thin: true }));
    for (const t of [st.base, st.top]) {
      els.push(seg(v(X(t), ay + 0.07), v(X(t), ay - 0.07), { tone: "muted", thin: true }));
      els.push(txt(v(X(t), ay - 0.12), `${fmt(t)}${o.unit ?? ""}`, "s", { small: true, tone: "muted" }));
    }
    if (st.bridge) {
      const x0 = X(st.bridge.from);
      const x1 = X(st.bridge.to);
      const by = rows[0] + 0.6;
      els.push(seg(v(x0, by), v(x1, by), { tone: "a" }), seg(v(x0, by), v(x0, by - 0.18), { tone: "a" }), seg(v(x1, by), v(x1, by - 0.18), { tone: "a" }));
      const cx = Math.min(Math.max((x0 + x1) / 2, BX + tw(st.bridge.label) / 2), CW - tw(st.bridge.label) / 2 - 0.1);
      els.push(txt(v(cx, by + 0.12), st.bridge.label, "n", { small: true, bold: true, tone: "a" }));
    }
    return { els, h: -(ay - 0.75) };
  };
  const h = Math.max(...o.steps.map((s) => build(s).h));
  const top = 0.45;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h, top),
    steps: o.steps.map((s) => s.label),
    draw: (_v, step) => {
      const st = o.steps[Math.min(step, o.steps.length - 1)];
      const { els } = build(st);
      els.push(...frame(h, top));
      return { els, readout: [...st.readout, o.foot] };
    },
  };
}

/**
 * Daire grafiğinde bir dilim: açı / 360 = pay. Dilim kenarları merkezden
 * çizilir; açı ve pay sağdaki satırlarda yazılı (çizgi üstünde yazı yok).
 */
export function pieFig(o: { caption: string; alt: string; angle: number; foot: string; lines: (pay: number) => string[] }): FigureDef {
  const C = v(1.9, -1.95);
  const R = 1.65;
  const h = 4.1;
  const pay = o.angle / 360;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    draw: () => {
      const els: El[] = [];
      const arc: ReturnType<typeof v>[] = [C];
      for (let a = 0; a <= o.angle; a += 4) arc.push(v(C[0] + R * Math.cos(((90 - a) * Math.PI) / 180), C[1] + R * Math.sin(((90 - a) * Math.PI) / 180)));
      const end = 90 - o.angle;
      arc.push(v(C[0] + R * Math.cos((end * Math.PI) / 180), C[1] + R * Math.sin((end * Math.PI) / 180)));
      const ring: ReturnType<typeof v>[] = [];
      for (let a = 0; a < 360; a += 6) ring.push(v(C[0] + R * Math.cos((a * Math.PI) / 180), C[1] + R * Math.sin((a * Math.PI) / 180)));
      els.push(poly(ring, { tone: "muted", thin: true }));
      els.push(poly(arc, { fill: "a", tone: "a", thin: true }));
      let y = -0.55;
      for (const line of o.lines(pay)) {
        for (const s of wrap(line, CW - 4.3)) {
          els.push(txt(v(4.1, y), s, "e", { small: true, tone: "ink" }));
          y -= LH;
        }
        y -= 0.2;
      }
      els.push(...frame(h));
      return { els, readout: [`${fmt(o.angle, 0)}° / 360° = ${fmt(pay, 2)}, yani bütünün %${fmt(pay * 100, 0)}’u.`, o.foot] };
    },
  };
}

export interface Sent {
  n: string;
  s: string;
  role: string;
}
export interface StackStep {
  label: string;
  /** Yeni paragrafın başladığı cümle sırası (0 tabanlı). */
  cut?: number;
  /** Geçici olarak çıkarılan cümleler. */
  removed?: number[];
  /** Bu adımda sorunlu cümleye düşülen not (uyarı tonu). */
  flags?: Record<number, string>;
  note: string;
}

/**
 * Numaralı cümle yığını: bölümdeki parçanın cümleleri işlevleriyle alt alta.
 * Adımlar sınır çizer ya da cümle çıkarır; çıkarılan cümle soluk ve kesik
 * çerçeveyle yerinde kalır, böylece kaybolan bilgi görünür.
 */
export function stackFig(o: { caption: string; alt: string; sents: Sent[]; steps: StackStep[]; foot: string }): FigureDef {
  const NX = 0.15;
  const SX = 0.85;
  const build = (st: StackStep) => {
    const els: El[] = [];
    let y = 0;
    o.sents.forEach((c, i) => {
      if (i > 0) {
        if (st.cut === i) {
          els.push(seg(v(0, y - 0.12), v(CW, y - 0.12), { tone: "a" }));
          els.push(txt(v(CW, y - 0.47), "yeni paragraf", "w", { small: true, bold: true, tone: "a" }));
          y -= 1.4;
        } else y -= 0.7;
      }
      const out = st.removed?.includes(i) ?? false;
      const grp = st.cut !== undefined && i >= st.cut ? "b" : "c";
      const top = y + 0.38;
      els.push(txt(v(NX, y), c.n, "e", { small: true, bold: true, tone: out ? "muted" : "ink" }));
      wrap(c.s, CW - SX - 0.45).forEach((s) => {
        els.push(txt(v(SX, y), s, "e", { small: true, tone: out ? "muted" : "ink" }));
        y -= LH;
      });
      const flag = st.flags?.[i];
      const role = out ? "çıkarıldı" : (flag ?? c.role);
      wrap(role, CW - SX - 0.45).forEach((s) => {
        els.push(txt(v(SX, y), s, "e", { small: true, tone: out ? "muted" : flag ? "warn" : grp }));
        y -= LH;
      });
      const bottom = y + LH - 0.3;
      if (out) els.push(rect(0, top, CW, bottom, "muted", false, true));
      else els.push(rect(0, top, 0.1, bottom, flag ? "warn" : grp, true));
      y = bottom;
    });
    return { els, h: -y + 0.2 };
  };
  const h = Math.max(...o.steps.map((s) => build(s).h));
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    steps: o.steps.map((s) => s.label),
    draw: (_v, step) => {
      const st = o.steps[Math.min(step, o.steps.length - 1)];
      const { els } = build(st);
      els.push(...frame(h));
      return { els, readout: [st.note, o.foot] };
    },
  };
}

export interface Level {
  label: string;
  title: string;
  detail: string[];
}

/**
 * İç içe kapsam kümeleri: dıştaki kutu en geniş kümedir, her iç kutu bir
 * öncekinin içindeki daha dar gruptur. Seçilen kutu vurgulanır.
 */
export function nestFig(o: { caption: string; alt: string; levels: Level[]; foot: string }): FigureDef {
  const n = o.levels.length;
  const STEP_Y = 0.78;
  const IN_X = 0.55;
  const h = n * STEP_Y + 0.25 * n + 0.6;
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h),
    picks: o.levels.map((l) => ({ label: l.label, title: l.title, detail: l.detail })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      o.levels.forEach((l, i) => {
        const x0 = i * IN_X;
        const y0 = 0.3 - i * STEP_Y;
        const x1 = CW - i * IN_X;
        const y1 = -h + 0.15 + i * 0.25;
        els.push(rect(x0, y0, x1, y1, pick === i ? "a" : i === n - 1 ? "c" : "muted", pick === i));
        els.push(txt(v(x0 + 0.2, y0 - 0.38), l.label, "e", { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
      });
      els.push(...frame(h));
      return { els, readout: [pick >= 0 ? o.levels[pick].detail[0] : "Bir kümeye tıkla ya da aşağıdan seç.", o.foot] };
    },
  };
}
