import {
  bimetalCool214, bimetalHeat214, channelNames214, colours214, expansionRows214, expansionSection214, fieldAt214,
  filterRows214, filterSection214, heading214, lensRows214, lensSection214, lightNames214, lightText214, magnetCases214,
  magnetSection214, num214, rodDeltaT214, rodLength214, signedNum214, type Pole214, type Rgb214, type Vec214,
} from "../depth214";
import { add, circle, mid, mul, poly, pt, seg, sub, txt, unit, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad } from "./physicsFigures058Kit";
import { cell } from "./mathFigures060TytKit";

/*
 * 0.214.0 TYT Fizik derinleştirme çizimleri. Işın çizimleri ince mercek
 * bağıntısının aynı fonksiyonundan, pusula yönleri ve alan çizgileri iki
 * kutuplu modelin aynı alan fonksiyonundan, filtre kanalları ve uzamalar
 * depth214 tablolarından gelir. Adım değiştirmek öğrenme kaydı oluşturmaz.
 */

/** Yalnız ilk harfi küçült: kutup adları (N, S) büyük kalır. */
const low = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);

/** Kısa yön oku bulunan ışın parçası. */
const lightRay = (a: V, b: V, tone: Tone): El[] => {
  const d = unit(sub(b, a));
  const m = mid(a, b);
  return [seg(a, b, { tone }), vec(sub(m, mul(d, 0.4)), add(m, mul(d, 0.4)), { tone })];
};

/* ---------- Mercekler: tablonun her satırı için gerçek ışın çizimi ---------- */

const LENS_H = 4;
const lensFigure = (): FigureDef => {
  const rows = lensRows214();
  return {
    caption: `Her adım tablonun bir satırıdır. Cismin ucundan çıkan paralel ışın (kırmızı) odaktan geçecek ya da uzantısı odaktan gelecek biçimde kırılır, merkezden geçen ışın (yeşil) doğrultusunu korur. Görüntü bu iki ışının (sanal görüntüde kesik uzantılarının) buluştuğu yerdedir; uzaklıklar cm, cisim boyu ${LENS_H} cm. Düşey ölçek okunabilirlik için büyütülmüştür; doğrular ve kesişimler aynı kalır.`,
    alt: `Asal eksen üzerinde ince mercek, iki yanda F ve 2F noktaları. ${rows.map(({ f, u, v: vv, m }) => `f = ${signedNum214(f)}, u = ${num214(u)}: ${vv === undefined ? "görüntü yok" : `görüntü v = ${num214(vv)} cm, boy ${num214(m! * LENS_H)} cm`}`).join("; ")}.`,
    steps: rows.map(({ f, u }) => `${f > 0 ? "Yakınsak" : "Iraksak"}, u = ${num214(u)} cm`),
    draw: (_, step) => {
      const r = rows[step];
      const { f, u } = r;
      const hiCm = r.m === undefined ? 0 : r.m * LENS_H;
      const span = Math.max(u, Math.abs(r.v ?? 0), 2 * Math.abs(f)) + 3;
      // Düşey ölçek telefonda okunabilsin diye büyütülür; bu afin ölçek doğruları ve kesişimleri korur.
      const k = Math.max(1, (0.42 * span) / (Math.max(LENS_H, Math.abs(hiCm)) + 2));
      const hs = LENS_H * k;
      const hi = hiCm * k;
      const ymax = Math.max(hs, Math.abs(hi)) + 2 * k;
      const clip = (p: V, d: V): V => {
        const tx = d[0] > 0 ? (span - p[0]) / d[0] : Infinity;
        const ty = d[1] !== 0 ? ((Math.sign(d[1]) * ymax) - p[1]) / d[1] : Infinity;
        return add(p, mul(d, Math.min(tx, ty)));
      };
      const els: El[] = [seg(v(-span, 0), v(span, 0), { tone: "muted", thin: true })];
      // İnce mercek gövdesi (yalnız simge; uzaklıklar merkez düzleminden).
      const H = ymax - 0.6;
      const t = f > 0 ? 0.5 : -0.35;
      const e = f > 0 ? 0.08 : 0.55;
      const shape: V[] = [];
      for (let i = 0; i <= 20; i += 1) { const y = -H + (2 * H * i) / 20; shape.push(v(e + t * (1 - (y / H) ** 2), y)); }
      for (let i = 20; i >= 0; i -= 1) { const y = -H + (2 * H * i) / 20; shape.push(v(-(e + t * (1 - (y / H) ** 2)), y)); }
      els.push(poly(shape, { fill: "b", tone: "b", thin: true }));
      for (const k of [1, 2]) for (const s of [-1, 1]) els.push(pt(v(s * k * Math.abs(f), 0), k === 1 ? "F" : "2F", "s", "muted"));
      const tip = v(-u, hs);
      const P = v(0, hs);
      const O = v(0, 0);
      els.push(vec(v(-u, 0), tip, { tone: "ink", bold: true }), txt(tip, "cisim", "n", { small: true }));
      els.push(...lightRay(tip, P, "warn"), ...lightRay(tip, O, "c"));
      // Paralel ışın çıkışta: yakınsakta çıkış odağından (f, 0) geçer; ıraksakta giriş odağından (f, 0) geliyormuş gibi dağılır.
      const d1 = f > 0 ? unit(sub(v(f, 0), P)) : unit(sub(P, v(f, 0)));
      const d2 = unit(sub(O, tip));
      els.push(...lightRay(P, clip(P, d1), "warn"), ...lightRay(O, clip(O, d2), "c"));
      els.push(...pad(-span, ymax + 0.6, span, -ymax - 0.6));
      if (r.v === undefined) {
        return { els, readout: [`u = f = ${num214(u)} cm: 1/v = 1/f − 1/u = 0.`, "Çıkan iki ışın paraleldir; sonlu bir görüntü noktası yoktur."] };
      }
      const I = v(r.v, hi);
      if (r.v < 0) {
        // Sanal görüntü: çıkış ışınlarının geri uzantıları kesik çizgiyle buluşur.
        els.push(seg(P, f > 0 ? I : v(f, 0), { tone: "warn", dash: true, thin: true }), seg(O, I, { tone: "c", dash: true, thin: true }));
      }
      els.push(vec(v(r.v, 0), I, { tone: "a", bold: r.v > 0, dash: r.v < 0 }), txt(I, "görüntü", hi > 0 ? "n" : "s", { small: true, tone: "a" }));
      return {
        els,
        readout: [
          `1/v = 1/${f < 0 ? `(${num214(f)})` : num214(f)} − 1/${num214(u)} ⇒ v = ${num214(r.v)} cm; m = −v/u = ${num214(r.m!)}.`,
          `${r.side}; ${r.look.toLocaleLowerCase("tr-TR")}. Görüntü boyu ${num214(Math.abs(hiCm))} cm.`,
        ],
      };
    },
  };
};

/* ---------- Prizmalar ve renkler: kanal kanal filtre ---------- */

const CH_CODE = ["K", "Y", "M"] as const;
const CH_TONE: readonly Tone[] = ["warn", "c", "b"];
const filterFigure = (): FigureDef => {
  const rows = filterRows214();
  return {
    caption: "Her adımda bir renkli ışık altı ideal filtreye gönderilir. Soldaki K, Y, M kutuları gelen kırmızı, yeşil ve mavi kanallarıdır; sağda yalnız hem ışıkta hem filtrede bulunan kanallar kalır. Boş kutu o kanalın olmadığını gösterir.",
    alt: `Altı satır: ${rows.map(({ filter }) => `${filter} filtre`).join(", ")}. Her satırda gelen kanal kutuları, filtre kutusu ve çıkan kanal kutuları; adımlar ${lightNames214.join(", ")} ışık.`,
    steps: lightNames214.map((l) => `${cap(l)} ışık`),
    draw: (_, step) => {
      const light = lightNames214[step];
      const lc = colours214[light];
      const els: El[] = [];
      const cw = 0.7;
      const h = 0.7;
      const gap = 1.05;
      const xIn = 0;
      const xF = 3 * cw + 0.9;
      const fw = 3.3;
      const xOut = xF + fw + 0.9;
      const xName = xOut + 3 * cw + 0.3;
      const tokens = (x: number, y: number, c: Rgb214) => c.forEach((on, i) => {
        els.push(...cell(x + i * cw, y, cw, h, on ? CH_CODE[i] : "", on ? CH_TONE[i] : "muted", { fill: Boolean(on) }));
      });
      els.push(txt(v(xIn + 1.5 * cw, h + 0.35), `${light} ışık`, "c", { small: true, bold: true }));
      els.push(txt(v(xF + fw / 2, h + 0.35), "ideal filtre", "c", { small: true, bold: true }));
      els.push(txt(v(xOut + 1.5 * cw, h + 0.35), "çıkış", "c", { small: true, bold: true }));
      rows.forEach(({ filter, outputs }, i) => {
        const y = -i * gap;
        const out = outputs[step].out;
        tokens(xIn, y, lc);
        els.push(vec(v(xIn + 3 * cw + 0.1, y + h / 2), v(xF - 0.1, y + h / 2), { tone: "ink", thin: true }));
        els.push(...cell(xF, y, fw, h, `${filter} (${CH_CODE.filter((_, k) => colours214[filter][k]).join("")})`, "muted", { fill: false }));
        els.push(vec(v(xF + fw + 0.1, y + h / 2), v(xOut - 0.1, y + h / 2), { tone: out.some(Boolean) ? "ink" : "muted", thin: true, dash: !out.some(Boolean) }));
        tokens(xOut, y, out);
        els.push(txt(v(xName, y + h / 2), lightText214(out), "e", { small: true, bold: true }));
      });
      els.push(...pad(-0.2, h + 0.8, xName + 3.2, -(rows.length - 1) * gap - 0.2));
      const stopped = rows.filter(({ outputs }) => !outputs[step].out.some(Boolean)).map(({ filter }) => filter);
      const has = channelNames214.filter((_, k) => lc[k]);
      return {
        els,
        legend: CH_CODE.map((code, k) => ({ code, label: `${channelNames214[k]} kanal`, tone: CH_TONE[k] })),
        readout: [
          `${cap(light)} ışıkta ${has.join(", ")} kanalı var.`,
          stopped.length ? `Işığı tamamen durduran filtre: ${stopped.join(", ")}.` : "Hiçbir filtre ışığı tamamen durdurmaz; her biri kendi rengini bırakır.",
        ],
      };
    },
  };
};

/* ---------- Mıknatıslar: alan çizgisi ve pusula ---------- */

const BOUND_X = 7;
const BOUND_Y = 4;
const BAR_H = 0.9;
type Bar = { x0: number; x1: number; left: "N" | "S" };
const barsOf = (poles: readonly Pole214[]): Bar[] => {
  const out: Bar[] = [];
  for (let i = 0; i < poles.length; i += 2) out.push({ x0: poles[i].x, x1: poles[i + 1].x, left: poles[i].s === 1 ? "N" : "S" });
  return out;
};
const insideBar = (bars: readonly Bar[], p: Vec214) => bars.some(({ x0, x1 }) => p[0] > x0 - 0.02 && p[0] < x1 + 0.02 && Math.abs(p[1]) < BAR_H / 2);
/** Alan çizgisi; sense = −1 alanın tersine izler (S kutbundan geriye). escaped: çerçeveden çıktı. */
const traceLine = (poles: readonly Pole214[], bars: readonly Bar[], start: Vec214, sense: 1 | -1 = 1): { pts: V[]; escaped: boolean } => {
  const dir = (p: Vec214): Vec214 => {
    const b = fieldAt214(poles, p);
    const l = Math.hypot(b[0], b[1]) || 1;
    return [(sense * b[0]) / l, (sense * b[1]) / l];
  };
  let p = start;
  const out: V[] = [v(p[0], p[1])];
  for (let i = 0; i < 1600; i += 1) {
    const d = dir(p);
    const m: Vec214 = [p[0] + d[0] * 0.02, p[1] + d[1] * 0.02];
    const dm = dir(m);
    p = [p[0] + dm[0] * 0.04, p[1] + dm[1] * 0.04];
    if (i % 3 === 0) out.push(v(p[0], p[1]));
    if (Math.abs(p[0]) > BOUND_X || Math.abs(p[1]) > BOUND_Y || insideBar(bars, p)) break;
  }
  out.push(v(Math.max(-BOUND_X, Math.min(BOUND_X, p[0])), Math.max(-BOUND_Y, Math.min(BOUND_Y, p[1]))));
  const escaped = !insideBar(bars, p);
  // Geriye izlenen çizgi alan yönünde okunsun diye ters çevrilir.
  return { pts: sense === 1 ? out : out.reverse(), escaped };
};
const magnetBar = ({ x0, x1, left }: Bar): El[] => {
  const m = (x0 + x1) / 2;
  const lt: Tone = left === "N" ? "warn" : "b";
  const rt: Tone = left === "N" ? "b" : "warn";
  const y0 = -BAR_H / 2;
  const y1 = BAR_H / 2;
  return [
    poly([v(x0, y0), v(m, y0), v(m, y1), v(x0, y1)], { tone: lt, fill: lt }),
    poly([v(m, y0), v(x1, y0), v(x1, y1), v(m, y1)], { tone: rt, fill: rt }),
    txt(v((x0 + m) / 2, 0), left, "c", { tone: lt, bold: true }),
    txt(v((m + x1) / 2, 0), left === "N" ? "S" : "N", "c", { tone: rt, bold: true }),
  ];
};
const needle = (p: V, d: V, len = 0.5): El[] => {
  const tip = add(p, mul(d, len));
  const tail = sub(p, mul(d, len));
  const n = v(-d[1] * 0.13, d[0] * 0.13);
  return [
    circle(p, len + 0.1, { tone: "ink", thin: true }),
    poly([tip, add(p, n), sub(p, n)], { tone: "warn", fill: "warn", thin: true }),
    poly([tail, add(p, n), sub(p, n)], { tone: "b", fill: "b", thin: true }),
  ];
};
const magnetFigure = (): FigureDef => {
  const cache = new Map<number, V[][]>();
  const linesFor = (step: number) => {
    const hit = cache.get(step);
    if (hit) return hit;
    const { poles } = magnetCases214[step];
    const bars = barsOf(poles);
    const lines: V[][] = [];
    for (const q of poles) {
      const bar = bars.find(({ x0, x1 }) => q.x === x0 || q.x === x1)!;
      const outward = q.x === bar.x0 ? 180 : 0;
      for (const a of [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]) {
        const ang = ((outward + a) * Math.PI) / 180;
        const start: Vec214 = [q.x + Math.cos(ang) * 0.55, q.y + Math.sin(ang) * 0.55];
        if (insideBar(bars, start)) continue;
        // N’den ileri izlenen her çizgi alınır; S’den geri izlenenlerden yalnız çerçeveden gelenler (N’ye varanlar zaten çizildi).
        const line = traceLine(poles, bars, start, q.s);
        if (q.s === 1 || line.escaped) lines.push(line.pts);
      }
    }
    cache.set(step, lines);
    return lines;
  };
  return {
    caption: "Her adım tablonun bir satırıdır. Alan çizgileri iki kutuplu modelden hesaplanıp N kutuplarından başlatılarak çizildi; pusulanın kırmızı ucu (N) bulunduğu noktadaki alan yönünü gösterir. Mıknatıs içindeki kapanan kısım çizilmez.",
    alt: `Bir ya da iki çubuk mıknatıs, N kutbundan çıkan alan çizgileri ve işaretli noktada pusula. ${magnetCases214.map((c) => `${c.setup}, ${c.place}: ${heading214(fieldAt214(c.poles, c.p))}`).join("; ")}.`,
    steps: magnetCases214.map(({ place, setup }) => `${setup.split(": ")[1]} · ${place}`),
    draw: (_, step) => {
      const c = magnetCases214[step];
      const bars = barsOf(c.poles);
      const els: El[] = [];
      for (const l of linesFor(step)) {
        els.push(poly(l, { tone: "c", open: true, thin: true, smooth: true }));
        const i = Math.floor(l.length * 0.35);
        if (l.length > 6) els.push(vec(l[i - 1], l[i + 1], { tone: "c", bold: true }));
      }
      for (const b of bars) els.push(...magnetBar(b));
      const p = v(c.p[0], c.p[1]);
      const B = fieldAt214(c.poles, c.p);
      const h = heading214(B);
      if (h === "yön yok") {
        els.push(circle(p, 0.6, { tone: "ink", dash: true }), txt(v(p[0], p[1] + 0.75), "B = 0", "n", { small: true, bold: true }));
      } else {
        const m = Math.hypot(B[0], B[1]);
        els.push(...needle(p, v(B[0] / m, B[1] / m)));
      }
      els.push(...pad(-BOUND_X, BOUND_Y, BOUND_X, -BOUND_Y));
      return {
        els,
        readout: [`${c.setup}. Pusula: ${low(c.place)}.`, h === "yön yok" ? `B = 0: ${low(c.why)}.` : `Pusulanın N ucu ${h}: ${low(c.why)}.`],
      };
    },
  };
};

/* ---------- Genleşme: 1 m çubuklar ve bimetal ---------- */

const ROD_W = 6; // 1 m çizimde 6 birim
const MM = 1; // uzama çizimde 1 mm = 1 birim (abartılı)
const expansionFigure = (): FigureDef => {
  const rows = expansionRows214();
  const steps = ["İlk boylar eşit", `ΔT = +${rodDeltaT214} °C`, "Al–demir şerit ısıtılınca", "Al–demir şerit soğutulunca"];
  return {
    caption: `İlk iki adımda ${rodLength214} m’lik dört çubuk ${rodDeltaT214} °C ısıtılır; uzama, okunabilsin diye 1 mm çubuk boyunun altıda biri kadar abartılarak çizilmiştir. Son iki adımda alüminyum–demir şeridin eğilme yönü gösterilir; bükülme de abartılıdır.`,
    alt: `Dört yatay çubuk: ${rows.map(({ material, dL }) => `${material} ${num214(dL * 1000)} mm`).join(", ")}. Ardından ısıtılınca alüminyum dışta kalacak biçimde demire doğru, soğutulunca demir dışta kalacak biçimde alüminyuma doğru eğilen bimetal şerit.`,
    steps,
    draw: (_, step) => {
      const els: El[] = [];
      if (step <= 1) {
        const lw = 4.2;
        rows.forEach(({ material, dL }, i) => {
          const y = -i * 1.3;
          els.push(txt(v(lw - 0.3, y + 0.3), material, "w", { small: true, bold: true }));
          els.push(poly([v(lw, y), v(lw + ROD_W, y), v(lw + ROD_W, y + 0.6), v(lw, y + 0.6)], { tone: "muted", fill: "muted", thin: true }));
          if (step === 1) {
            const w = dL * 1000 * MM;
            els.push(poly([v(lw + ROD_W, y), v(lw + ROD_W + w, y), v(lw + ROD_W + w, y + 0.6), v(lw + ROD_W, y + 0.6)], { tone: "warn", fill: "warn", thin: true }));
            els.push(txt(v(lw + ROD_W + w + 0.2, y + 0.3), `+${num214(dL * 1000)} mm`, "e", { small: true, tone: "warn" }));
          }
        });
        els.push(seg(v(lw, 0.9), v(lw, -3 * 1.3 - 0.3), { tone: "ink", dash: true, thin: true }));
        els.push(seg(v(lw + ROD_W, 0.9), v(lw + ROD_W, -3 * 1.3 - 0.3), { tone: "ink", dash: true, thin: true }));
        els.push(txt(v(lw + ROD_W / 2, 0.95), `L0 = ${rodLength214} m`, "n", { small: true }));
        els.push(...pad(-0.5, 1.8, lw + ROD_W + 5.4, -3 * 1.3 - 0.4));
        const [al, , , glass] = rows;
        return {
          els,
          readout: step === 0
            ? [`Dört çubuk da ${rodLength214} m ve aynı ilk sıcaklıktadır.`, "Uzamayı yalnız α belirleyecek: L0 ve ΔT ortak."]
            : [`ΔL = α·L0·ΔT: ${rows.map(({ material, dL }) => `${material.toLocaleLowerCase("tr-TR")} ${num214(dL * 1000)} mm`).join(", ")}.`, `En çok ${al.material.toLocaleLowerCase("tr-TR")}, en az ${glass.material.toLocaleLowerCase("tr-TR")} uzar; en uzun son boy bile ${num214(al.L, 4)} m’dir.`],
        };
      }
      const heat = step === 2;
      const info = heat ? bimetalHeat214 : bimetalCool214;
      // Şerit sol ucundan sabit; eğrilik merkezi iç (kısa) yayın tarafında. Üst katman alüminyum.
      const R = 9;
      const L = 10;
      const th = 0.45;
      const sgn = heat ? -1 : 1; // ısıtmada aşağı (demire), soğutmada yukarı (alüminyuma) eğilir
      const arc = (off: number) => Array.from({ length: 31 }, (_, i) => {
        const a = (L / R) * (i / 30);
        const rr = R - sgn * off;
        return v(rr * Math.sin(a), sgn * (R - rr * Math.cos(a)));
      });
      const band = (o0: number, o1: number, tone: Tone) => poly([...arc(o0), ...arc(o1).reverse()], { tone, fill: tone, thin: true });
      els.push(band(0, th, "a"), band(-th, 0, "muted"));
      const top = arc(th / 2)[30];
      const bot = arc(-th / 2)[30];
      els.push(txt(v(arc(th)[18][0], arc(th)[18][1] + 0.3), "alüminyum", "n", { small: true, tone: "a", bold: true }));
      els.push(txt(v(arc(-th)[18][0], arc(-th)[18][1] - 0.3), "demir", "s", { small: true, bold: true }));
      els.push(seg(v(0, -1.2), v(0, 1.2), { tone: "ink", bold: true }), txt(v(-0.2, 0), "sabit uç", "w", { small: true }));
      els.push(seg(v(L * 0.75, 0), v(L, 0), { tone: "muted", dash: true, thin: true }), txt(v(L, 0), "ilk düz hâl", "e", { small: true, tone: "muted" }));
      els.push(vec(mid(top, bot), add(mid(top, bot), v(0, sgn * 1.1)), { tone: "warn", bold: true }));
      els.push(...pad(-3, 3.6, L + 3.4, -3.6));
      return {
        els,
        readout: [
          `${heat ? "Isıtma" : "Soğutma"}: dış yayda ${info.outer.toLocaleLowerCase("tr-TR")}, iç yayda ${info.inner.toLocaleLowerCase("tr-TR")}.`,
          `Şerit ${info.bendsToward.toLocaleLowerCase("tr-TR")} tarafına eğilir; ${heat ? "alüminyum daha çok uzamak ister" : "alüminyum daha çok kısalmak ister"}.`,
        ],
      };
    },
  };
};

export const depthFigures214: Record<string, Record<string, FigureDef>> = {
  mercekler: { [lensSection214.title]: lensFigure() },
  "prizmalar-renkler": { [filterSection214.title]: filterFigure() },
  "miknatislar-ve-manyetik-alan": { [magnetSection214.title]: magnetFigure() },
  genlesme: { [expansionSection214.title]: expansionFigure() },
};
