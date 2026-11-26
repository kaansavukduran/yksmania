import {
  fixed213, focal213, illuminanceRows213, intensity213, lightSection213, mirrorImage213, mirrorRows213, mirrorSection213, num213,
  obstacle213, refractionRows213, refractionSection213, refractiveIndex213, shadowRows213, shadowSection213,
  sphericalRows213, sphericalSection213, tiltAngle213,
} from "../depth213";
import { ang, circle, meet, poly, pol, pt, seg, span, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad, rect } from "./mathFigures062TytKit";

/*
 * 0.213.0 TYT Fizik optik derinleştirme çizimleri. Her koordinat depth213
 * modülündeki aynı formül fonksiyonlarından gelir: çubuk yükseklikleri
 * E = I·cos θ/r², gölge sınırları kaynak ve engel uçlarından geçen doğrular,
 * ayna görüntüleri yansıma zinciri, küresel ayna görüntüsü iki ışının
 * kesişimi, kırılan ışınlar Snell bağıntısıdır. Adım değiştirmek öğrenme
 * kaydı oluşturmaz.
 */

const fail = (claim: string): never => {
  throw new Error(`depthFigures213: ${claim}`);
};
const deg = (x: number) => `${num213(x, 1)}°`;
const lightRay = (a: V, b: V, tone: Tone, dash = false): El[] => {
  const d = [b[0] - a[0], b[1] - a[1]];
  const l = Math.hypot(d[0], d[1]) || 1;
  const m = v((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
  const e = 0.04 * l;
  return [
    seg(a, b, { tone, dash, thin: dash }),
    ...(dash ? [] : [vec(v(m[0] - (d[0] / l) * e, m[1] - (d[1] / l) * e), v(m[0] + (d[0] / l) * e, m[1] + (d[1] / l) * e), { tone })]),
  ];
};

/* ---------- Işık bilgisi: her uzaklıkta iki aydınlanma çubuğu ---------- */

const light = (): FigureDef => {
  const rows = illuminanceRows213();
  const top = rows[0].E;
  const H = 4;
  const k = H / top;
  const cw = 1.35;
  const bw = 0.45;
  return {
    caption: `${intensity213} cd’lik noktasal kaynakta her uzaklık için iki çubuk çizilir: ışın yüzeye dik (E = I/r²) ve yüzeyin normaliyle ${tiltAngle213}° yapıyor (E = I·cos ${tiltAngle213}°/r²). Çubuk boyları lx cinsinden aynı ölçektedir. Uzaklık iki katına çıkınca çubuk dörtte bire iner, eğik çubuk her zaman diğerinin yarısıdır.`,
    alt: `Çubuk grafik. Yatay eksende r = ${rows.map((r) => num213(r.r)).join(", ")} m. Dik gelişte E = ${rows.map((r) => num213(r.E, 3)).join(", ")} lx; normalle ${tiltAngle213}° açıda ${rows.map((r) => num213(r.Etilt, 3)).join(", ")} lx.`,
    steps: rows.map((r) => `r = ${num213(r.r)} m`),
    draw: (_, step) => {
      const els: El[] = [];
      const x0 = -0.25;
      const right = rows.length * cw + 0.1;
      els.push(seg(v(x0, 0), v(right, 0), { tone: "ink" }), seg(v(x0, 0), v(x0, H + 0.35), { tone: "ink" }));
      for (let t = 0; t <= 4; t += 1) {
        const y = (t * H) / 4;
        els.push(seg(v(x0 - 0.08, y), v(x0, y), { tone: "ink", thin: true }));
        els.push(txt(v(x0 - 0.12, y), num213((t * top) / 4), "w", { small: true, tone: "muted" }));
      }
      els.push(txt(v(x0 - 0.12, H + 0.62), "E (lx)", "w", { small: true, bold: true }));
      rows.forEach((row, i) => {
        const x = i * cw + 0.12;
        const on = i === step;
        els.push(rect(x, 0, bw, row.E * k, on ? "a" : "muted"));
        els.push(rect(x + bw + 0.05, 0, bw, row.Etilt * k, on ? "c" : "muted"));
        els.push(txt(v(x + bw + 0.025, -0.12), num213(row.r), "s", { small: true, tone: on ? "ink" : "muted", bold: on }));
        if (on) els.push(txt(v(x + bw + 0.025, row.E * k + 0.08), `${num213(row.E, 3)} ; ${num213(row.Etilt, 3)}`, "n", { small: true, bold: true }));
      });
      els.push(txt(v(right + 0.1, 0), "r (m)", "e", { small: true, bold: true }));
      els.push(...pad(x0 - 1, H + 1.1, right + 1.6, -0.9));
      const row = rows[step];
      return {
        els,
        legend: [
          { code: "D", label: "ışın yüzeye dik", tone: "a" },
          { code: "E", label: `eğik: ışın normalle ${tiltAngle213}°`, tone: "c" },
        ],
        readout: [
          `r = ${num213(row.r)} m: E = ${intensity213}/${num213(row.r2, 4)} = ${num213(row.E, 3)} lx.`,
          `Normalle ${tiltAngle213}°: E = ${num213(row.E, 3)}·cos ${tiltAngle213}° = ${num213(row.Etilt, 3)} lx. E·r² = ${num213(row.E * row.r2)} her uzaklıkta.`,
        ],
      };
    },
  };
};

/* ---------- Gölge: kaynak uçlarından geçen sınır doğruları ---------- */

const shadow = (): FigureDef => {
  const rows = shadowRows213();
  const h = obstacle213;
  const Ymax = Math.max(...rows.map((r) => r.total / 2), h) + 2;
  const Xmax = Math.max(...rows.map((r) => r.b)) + 6;
  return {
    caption: `Kesit görünüş: solda D boylu kaynak, ortada ${h} cm’lik opak engel, sağda perde. Kaynağın üst ucunu engelin üst ucuna bağlayan doğru tam gölgenin, alt ucunu engelin üst ucuna bağlayan doğru gölgeli bölgenin sınırıdır. Perdenin yanındaki şeritler tam gölgeyi ve yarı gölgeyi gösterir.`,
    alt: `Sekiz durum. ${rows.map((r) => `D = ${r.D}, a = ${r.a}, b = ${r.b}: tam gölge ${r.umbra} cm, gölgeli bölge ${r.total} cm`).join("; ")}.`,
    steps: rows.map((r) => (r.D === 0 ? `Noktasal, b = ${r.b}` : `D = ${r.D}, b = ${r.b}`)),
    draw: (_, step) => {
      const r = rows[step];
      const els: El[] = [];
      const S1 = v(0, r.D / 2);
      const S2 = v(0, -r.D / 2);
      const E1 = v(r.a, h / 2);
      const E2 = v(r.a, -h / 2);
      const onScreen = (s: V, e: V) => v(r.b, s[1] + ((e[1] - s[1]) * r.b) / r.a);
      // Tam gölge sınırları: aynı taraftaki uçlar. Dış sınırlar: çapraz uçlar.
      const umbraTop = onScreen(S1, E1);
      const outerTop = onScreen(S2, E1);
      if (Math.abs(umbraTop[1] - r.rawUmbra / 2) > 1e-9 || Math.abs(outerTop[1] - r.total / 2) > 1e-9) fail("gölge sınırı tablo ile aynı olmalı");
      els.push(seg(v(0, 0), v(r.b, 0), { tone: "muted", thin: true, dash: true }));
      els.push(seg(v(r.b, -Ymax), v(r.b, Ymax), { tone: "muted", bold: true }));
      els.push(txt(v(r.b, Ymax), "perde", "n", { small: true, tone: "muted" }));
      els.push(...lightRay(S1, umbraTop, "a"), ...lightRay(S2, v(r.b, -umbraTop[1]), "a"));
      if (r.D > 0) els.push(...lightRay(S2, outerTop, "c", true), ...lightRay(S1, v(r.b, -outerTop[1]), "c", true));
      els.push(seg(E2, E1, { tone: "ink", bold: true }));
      if (r.D === 0) els.push(pt(S1, "K", "w", "warn"));
      else els.push(seg(S2, S1, { tone: "warn", bold: true }), txt(v(-0.8, 0), `D = ${r.D}`, "w", { small: true, tone: "warn", bold: true }));
      const bx = r.b + 1.2;
      if (r.penumbra > 0) els.push(rect(bx, -r.total / 2, 2.2, r.total, "c"));
      if (r.umbra > 0) els.push(rect(bx, -r.umbra / 2, 2.2, r.umbra, "b"));
      if (r.rawUmbra === 0) els.push(pt(v(r.b, 0), undefined, "e", "b"));
      if (Number.isFinite(r.apex) && r.apex < r.b) els.push(pt(v(r.apex, 0), "uç", "s", "a"));
      els.push(...span(v(0, -Ymax - 3), v(r.a, -Ymax - 3), `a = ${r.a} cm`, -1));
      els.push(...span(v(0, -Ymax - 11), v(r.b, -Ymax - 11), `b = ${r.b} cm`, -1));
      els.push(...pad(-12, Ymax + 6, Xmax, -Ymax - 18));
      const umbraText = r.rawUmbra > 0 ? `${r.umbra} cm` : r.rawUmbra === 0 ? "tek nokta" : "yok";
      return {
        els,
        legend: [
          { code: "U", label: "tam gölge", tone: "b" },
          { code: "Y", label: "yarı gölge", tone: "c" },
        ],
        readout: [
          `D = ${r.D} cm, h = ${h} cm, a = ${r.a} cm, b = ${r.b} cm: tam gölge ${umbraText}, gölgeli bölge W = ${r.total} cm.`,
          r.D === 0 ? "Noktasal kaynakta yarı gölge yoktur, U = W = h·b/a." : `Yarı gölge toplamı ${r.penumbra} cm.${Number.isFinite(r.apex) ? ` Tam gölge b = ${r.apex} cm’de biter.` : ""}`,
        ],
      };
    },
  };
};

/* ---------- Düzlem ayna: iki ayna arasında görüntüler çember üzerinde ---------- */

const DIRS = ["e", "ne", "n", "nw", "w", "sw", "s", "se"] as const;
const dirOf = (angle: number) => DIRS[Math.round((((angle % 360) + 360) % 360) / 45) % 8];

const mirrors = (): FigureDef => {
  const rows = mirrorRows213();
  const R = 2.6;
  const L = 4;
  return {
    caption: "Cisim iki aynanın açıortayındadır. Görüntüler yansıma zinciriyle bulunur ve hepsi O merkezli, cisimden geçen çember üzerindedir. Kesik çizgiler aynaların O’dan geriye uzantısıdır; zincir bu uzantıların arkasındaki bölgede durur.",
    alt: `Sekiz açı. ${rows.map((r) => `α = ${r.alpha}°: ${r.bisector.length} görüntü, açıları ${r.bisector.map((x) => `${num213(x, 0)}°`).join(", ")}`).join("; ")}.`,
    steps: rows.map((r) => `α = ${r.alpha}°`),
    draw: (_, step) => {
      const r = rows[step];
      const O = v(0, 0);
      const els: El[] = [circle(O, R, { tone: "muted", dash: true, thin: true })];
      els.push(seg(O, pol(L, 180), { tone: "muted", dash: true, thin: true }), seg(O, pol(L, r.alpha + 180), { tone: "muted", dash: true, thin: true }));
      els.push(seg(O, pol(L, 0), { tone: "ink", bold: true }), seg(O, pol(L, r.alpha), { tone: "ink", bold: true }));
      els.push(txt(pol(L, 0), "A", "e", { bold: true }), txt(pol(L, r.alpha), "B", dirOf(r.alpha), { bold: true }));
      els.push(ang(O, pol(1, 0), pol(1, r.alpha), `${r.alpha}°`, { r: 26, tone: "muted" }));
      const object = pol(R, r.alpha / 2);
      els.push(circle(object, 0.16, { tone: "a", fill: "a" }), pt(object, "cisim", dirOf(r.alpha / 2), "a"));
      for (const a of r.bisector) els.push(circle(pol(R, a), 0.14, { tone: "b", fill: "b" }));
      els.push(pt(O, "O", dirOf(r.alpha / 2 + 180 + 22.5), "ink"));
      els.push(...pad(-L - 0.4, L + 0.4, L + 0.4, -L - 0.4));
      return {
        els,
        legend: [
          { code: "C", label: "cisim (açıortayda)", tone: "a" },
          { code: "G", label: "görüntü", tone: "b" },
        ],
        readout: [
          `α = ${r.alpha}°: 360°/α = ${r.n}, çizimle ${r.bisector.length} görüntü (N = n − 1 = ${r.formula}).`,
          r.even ? "n çift: cisim açıortaydan kaysa da görüntü sayısı değişmez." : `n tek: cisim açıortay dışında olsaydı ${r.offAxis.length} görüntü olurdu.`,
        ],
      };
    },
  };
};

/* ---------- Küresel ayna: iki ışının kesişimiyle görüntü ---------- */

const spherical = (): FigureDef => {
  const rows = sphericalRows213();
  const f = focal213;
  const h = 2;
  return {
    caption: `Odak uzaklığı ${f} cm olan çukur ayna (T tepe, F odak, M merkez). Cismin tepesinden asal eksene paralel giden ışın odaktan geçecek biçimde, tepeye giden ışın asal eksene göre simetrik yansır. İki yansıyan ışının ya da kesik uzantılarının kesiştiği yer görüntünün tepesidir. Okunaklılık için düşey ölçek büyütülmüştür; kat sayısı her adımın okuma satırındadır, ışınların kesiştiği yer bundan etkilenmez.`,
    alt: `Sekiz konum. ${rows.map((r) => (r.img ? `u = ${r.u} cm: v = ${num213(r.v ?? 0)} cm, m = ${num213(r.m ?? 0)}` : `u = ${r.u} cm: yansıyan ışınlar paralel`)).join("; ")}.`,
    steps: rows.map((r) => `u = ${r.u} cm`),
    draw: (_, step) => {
      const u = rows[step].u;
      const tip: V = [-u, h];
      const P1: V = [0, h];
      const O: V = [0, 0];
      const F: V = [-f, 0];
      const mirrorDir: V = [-u, -h]; // tepeden simetrik yansıyan ışının bir noktası
      const img = mirrorImage213(u);
      const beyond = (from: V, through: V, x: number): V => v(x, from[1] + ((through[1] - from[1]) * (x - from[0])) / (through[0] - from[0]));
      // Fizik koordinatlarında (cm) iki yansıyan ışının kesişimi.
      const I = img ? meet(P1, F, O, mirrorDir) : undefined;
      const vNum = img ? img.v.n / img.v.d : 0;
      const mNum = img ? img.m.n / img.m.d : 0;
      if (I && (Math.abs(I[0] + vNum) > 1e-9 || Math.abs(I[1] - mNum * h) > 1e-9)) fail("ışın kesişimi ayna denklemiyle aynı olmalı");
      const real = vNum > 0;
      const endX = I && real ? I[0] - 4 : Math.min(-u - 6, -f - 5);
      const end1 = beyond(P1, F, endX);
      const end2 = beyond(O, mirrorDir, endX);
      const xL = Math.min(-2 * f, endX, -u) - 3;
      const xR = (I && !real ? I[0] : 0) + 4;
      const yT = Math.max(h, I ? I[1] : 0, end1[1], end2[1]);
      const yB = Math.min(0, I ? I[1] : 0, end1[1], end2[1]);
      const Y = Math.min(8, Math.max(1, Math.round((0.42 * (xR - xL)) / (yT - yB))));
      const sc = (p: V): V => v(p[0], p[1] * Y);
      const els: El[] = [seg(v(xL, 0), v(xR, 0), { tone: "muted", thin: true })];
      const half = (h * Y) * 1.35;
      els.push(poly(Array.from({ length: 21 }, (_, i) => {
        const y = -half + (2 * half * i) / 20;
        return v(-(y * y) / (half * half), y);
      }), { open: true, bold: true }));
      els.push(pt(v(-f, 0), "F", "se", "muted"), pt(v(-2 * f, 0), undefined, "se", "muted"), txt(v(-2 * f, 0), "M", "se", { tone: "muted", soft: true }), pt(v(0, 0), "T", "se", "muted"));
      els.push(vec(sc(v(-u, 0)), sc(tip), { tone: "ink", bold: true }), txt(sc(tip), "cisim", "n", { small: true }));
      els.push(...lightRay(sc(tip), sc(P1), "a"), ...lightRay(sc(tip), sc(O), "c"));
      els.push(...lightRay(sc(P1), sc(end1), "a"), ...lightRay(sc(O), sc(end2), "c"));
      els.push(...pad(xL, yT * Y + 1.5, xR, yB * Y - 1.5));
      if (!I) {
        return {
          els,
          readout: [`u = f = ${f} cm: v = fu/(u − f) tanımsız.`, `İki yansıyan ışın paraleldir, sonlu görüntü yoktur. Düşey ölçek ×${Y}.`],
        };
      }
      if (!real) els.push(seg(sc(P1), sc(I), { tone: "a", dash: true, thin: true }), seg(sc(O), sc(I), { tone: "c", dash: true, thin: true }));
      els.push(vec(sc(v(I[0], 0)), sc(I), { tone: "b", bold: real, dash: !real }));
      // Kısa görüntü bir F/M işaretinin yanındaysa etiket işaretten uzak yana yazılır.
      const marks = [-f, -2 * f, 0];
      const nearest = marks.reduce((p, q) => (Math.abs(q - I[0]) < Math.abs(p - I[0]) ? q : p));
      const short = Math.abs(nearest - I[0]) < 6;
      const side = nearest <= I[0] ? "e" : "w";
      els.push(txt(sc(I), "görüntü", short ? (I[1] < 0 ? (side === "e" ? "se" : "sw") : side === "e" ? "ne" : "nw") : I[1] < 0 ? "s" : "n", { small: true, tone: "b" }));
      return {
        els,
        readout: [
          `u = ${u} cm, f = ${f} cm → v = ${num213(vNum)} cm, m = ${num213(mNum)}.`,
          `Görüntü ${rows[step].nature}; boyu ${num213(Math.abs(mNum) * h)} cm (cisim ${h} cm). Düşey ölçek ×${Y}.`,
        ],
      };
    },
  };
};

/* ---------- Kırılma: aynı gelme açısıyla su ve cam ---------- */

const refraction = (): FigureDef => {
  const rows = refractionRows213();
  const { hava, su, cam } = refractiveIndex213;
  const L = 3;
  const gap = 8.4;
  const panel = (cx: number, i: number, r: number, n2: number, name: string, tone: Tone): El[] => {
    const P = v(cx, 0);
    const inc = v(cx - L * Math.sin((i * Math.PI) / 180), L * Math.cos((i * Math.PI) / 180));
    const out = v(cx + L * Math.sin((r * Math.PI) / 180), -L * Math.cos((r * Math.PI) / 180));
    // Snell denetimi çizimin kendi koordinatlarından.
    const sinI = (P[0] - inc[0]) / L;
    const sinR = (out[0] - P[0]) / L;
    if (Math.abs(hava * sinI - n2 * sinR) > 1e-9) fail("çizilen ışınlar Snell bağıntısını sağlamalı");
    const els: El[] = [
      rect(cx - 3.6, -3.2, 7.2, 3.2, tone),
      seg(v(cx - 3.6, 0), v(cx + 3.6, 0), { tone: "ink" }),
      seg(v(cx, -3.2), v(cx, 3.2), { tone: "muted", dash: true, thin: true }),
      ...lightRay(inc, P, "a"),
      ...lightRay(P, out, "b"),
      txt(v(cx + 3.5, 2.9), `hava ${fixed213(hava, 2)}`, "w", { small: true, tone: "muted" }),
      txt(v(cx - 3.5, -2.9), `${name} ${fixed213(n2, 2)}`, "e", { small: true, bold: true }),
    ];
    if (i > 0) {
      // Açı etiketleri ışının dış yanına (ışınla ara yüzey arasına) yazılır, ışını örtmez.
      const at = (base: number, sign: 1 | -1, a: number) => v(cx + sign * 2.1 * Math.sin((a * Math.PI) / 180), base * 2.1 * Math.cos((a * Math.PI) / 180));
      const incAt = i + 22 <= 84 ? i + 22 : i / 2;
      els.push(ang(P, v(cx, 1), inc, undefined, { r: 26, tone: "a" }), ang(P, v(cx, -1), out, undefined, { r: 26, tone: "b" }));
      els.push(txt(at(1, -1, incAt), deg(i), "c", { small: true, bold: true, tone: "a" }), txt(at(-1, 1, r + 26), deg(r), "c", { small: true, bold: true, tone: "b" }));
    }
    return els;
  };
  return {
    caption: `Aynı gelme açısıyla gelen ışık solda suya (n = ${num213(su)}), sağda cama (n = ${fixed213(cam, 2)}) geçer. Açılar kesik çizgili normalden ölçülür. Kırılan ışın her iki ortamda normale yaklaşır, camda daha çok yaklaşır. Son adımda ışın yüzeyi sıyırarak gelir ve kırılma açısı kritik açıya eşit olur.`,
    alt: `Yedi gelme açısı. ${rows.map((r) => `i = ${r.i}°: suda r = ${deg(r.rSu)}, camda r = ${deg(r.rCam)}`).join("; ")}.`,
    steps: rows.map((r) => `i = ${r.i}°`),
    draw: (_, step) => {
      const r = rows[step];
      const els: El[] = [...panel(0, r.i, r.rSu, su, "su", "c"), ...panel(gap, r.i, r.rCam, cam, "cam", "b")];
      els.push(...pad(-4, 3.6, gap + 4, -3.6));
      return {
        els,
        readout: [
          `i = ${r.i}°: sin r = sin i/n → suda r = ${deg(r.rSu)}, camda r = ${deg(r.rCam)}.`,
          r.i === 90 ? `Bu açılar sudan ve camdan havaya geçişin kritik açılarıdır.` : `Sapma i − r: suda ${deg(r.dSu)}, camda ${deg(r.dCam)}.`,
        ],
      };
    },
  };
};

export const depthFigures213: Record<string, Record<string, FigureDef>> = {
  "isik-bilgisi": { [lightSection213.figureTitle!]: light() },
  "golge-yari-golge": { [shadowSection213.figureTitle!]: shadow() },
  "duzlem-ayna": { [mirrorSection213.figureTitle!]: mirrors() },
  "kuresel-aynalar": { [sphericalSection213.figureTitle!]: spherical() },
  "isigin-kirilmasi": { [refractionSection213.figureTitle!]: refraction() },
};
