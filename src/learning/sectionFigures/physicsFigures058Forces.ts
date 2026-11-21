import { ang, ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, beside, box, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge058) · Newton yasaları, kesişen kuvvetlerin dengesi, itme ve
 * momentum. Kuvvet okları hesaplanan büyüklüklerle orantılı çizilir (her
 * figürde ortak ok ölçeği); etiketteki sayı aynı hesaptan gelir. g = 10 m/s².
 * Kütleler ve katsayılar rehberde verilmeyen yerlerde açıkça seçilmiş öğretim
 * örnekleridir.
 */

const G = 10;
const R = (d: number) => (d * Math.PI) / 180;
const along = (o: V, dirDeg: number, l: number): V => v(o[0] + l * Math.cos(R(dirDeg)), o[1] + l * Math.sin(R(dirDeg)));

/** Eğik düzlem üçgeni ve yüzeye oturan blok; blok merkezini döndürür. */
function incline(th: number, W: number, at: number): { els: El[]; c: V } {
  const t = R(th);
  const els: El[] = [poly([v(0, 0), v(W, 0), v(W, W * Math.tan(t))], { fill: "muted", tone: "muted", thin: true })];
  const base = v(at * Math.cos(t), at * Math.sin(t));
  const u = v(Math.cos(t), Math.sin(t)), n = v(-Math.sin(t), Math.cos(t)), h = 0.32;
  const p = (a: number, b: number): V => v(base[0] + u[0] * a + n[0] * b, base[1] + u[1] * a + n[1] * b);
  els.push(poly([p(-h, 0), p(h, 0), p(h, 2 * h), p(-h, 2 * h)], { fill: "c", tone: "c" }));
  return { els, c: p(0, h) };
}

/* ===================== Newton yasaları ===================== */

const components: FigureDef = {
  caption:
    "2 kg blok sürtünmesiz sabit eğik düzlemde (g = 10 m/s²). Eğimi değiştir: gerçek ağırlık oku 20 N’dur; kesikli oklar onun yüzey boyunca (mg sinθ) ve yüzeye dik (mg cosθ) izdüşümleridir, ayrı kuvvet değildir. Dik doğrultuda ivme olmadığından N = mg cosθ; N = mg yalnız θ = 0’da.",
  alt: "Eğik düzlem üzerinde blok; bloktan aşağı ağırlık oku, yüzeye dik dışarı normal kuvvet oku ve ağırlığın yüzeye paralel ve dik kesikli bileşenleri.",
  param: { label: "Eğim θ", min: 0, max: 45, step: 5, init: 30, unit: "°", plain: true },
  draw: (th) => {
    const m = 2, S = 0.09, t = R(th);
    const { els, c } = incline(th, 5, 2.6);
    const Wv = m * G, par = Wv * Math.sin(t), perp = Wv * Math.cos(t);
    const u = v(Math.cos(t), Math.sin(t)), n = v(-Math.sin(t), Math.cos(t));
    els.push(vec(c, v(c[0], c[1] - Wv * S), { tone: "warn", bold: true }), txt(v(c[0] + 0.12, c[1] - Wv * S), "mg = 20 N", "e", { tone: "warn", small: true, bold: true }));
    els.push(vec(c, v(c[0] + n[0] * perp * S, c[1] + n[1] * perp * S), { tone: "a", bold: true }), txt(v(c[0] + n[0] * perp * S, c[1] + n[1] * perp * S + 0.1), `N = ${nf(perp, 1)} N`, "n", { tone: "a", small: true, bold: true }));
    if (par > 0.05) {
      const pe = v(c[0] - u[0] * par * S, c[1] - u[1] * par * S);
      els.push(vec(c, pe, { tone: "b", dash: true }), txt(v(pe[0] - 0.1, pe[1] + 0.05), `mg sinθ = ${nf(par, 1)}`, "nw", { tone: "b", small: true }));
    }
    els.push(vec(c, v(c[0] - n[0] * perp * S, c[1] - n[1] * perp * S), { tone: "muted", dash: true }));
    if (th > 0) els.push(ang(v(0, 0), v(1, 0), v(Math.cos(t), Math.sin(t)), `${th}°`, { tone: "muted", r: 30 }));
    els.push(...pad(-1.2, 4.0, 5.6, -0.8));
    return { els, readout: [`θ = ${th}°: mg sinθ = 20·sin${th}° = ${nf(par, 2)} N (yüzey boyunca), mg cosθ = ${nf(perp, 2)} N (yüzeye dik).`, `N − mg cosθ = 0 ⇒ N = ${nf(perp, 2)} N; ivme a = g sinθ = ${nf(G * Math.sin(t), 2)} m/s² (aşağı).`] };
  },
};

const staticFriction: FigureDef = {
  caption:
    "Yatay yüzeyde N = 40 N, μs = 0,5: statik sürtünme en çok μsN = 20 N olabilir. İtme kuvvetini değiştir: blok dururken sürtünme tam itme kadardır (6 N itişe 6 N), sınır değil. İtme 20 N’yi aşınca statik denge mümkün değildir; kayma başlar ve kinetik model gerekir.",
  alt: "Yatay zeminde blok; sağa itme oku, sola sürtünme oku; altta gereken sürtünmeyi 20 N sınırıyla karşılaştıran çubuk.",
  param: { label: "İtme F", min: 0, max: 30, step: 2, init: 6, unit: " N", plain: true },
  draw: (F) => {
    const S = 0.09, lim = 20, holds = F <= lim, fs = holds ? F : lim;
    const els: El[] = [seg(v(-2.6, 0), v(2.6, 0), { tone: "muted", bold: true }), box(-0.6, 0, 0.6, 1.0, "c")];
    if (F > 0) els.push(vec(v(0.6, 0.55), v(0.6 + F * S, 0.55), { tone: "a", bold: true }), txt(v(0.6 + F * S + 0.1, 0.55), `F = ${F} N`, "e", { tone: "a", small: true, bold: true }));
    if (fs > 0) els.push(vec(v(-0.6, 0.15), v(-0.6 - fs * S, 0.15), { tone: "warn", bold: true, dash: !holds }), txt(v(-0.6 - fs * S - 0.1, 0.15), holds ? `fs = ${F} N` : "20 N sınır", "w", { tone: "warn", small: true, bold: true }));
    const bx = (x: number) => -2.2 + x * 0.15, by = -0.8;
    els.push(seg(v(bx(0), by), v(bx(30), by), { tone: "muted", thin: true }));
    if (F > 0) els.push(box(bx(0), by - 0.12, bx(F), by + 0.12, holds ? "a" : "warn"));
    els.push(seg(v(bx(lim), by - 0.3), v(bx(lim), by + 0.3), { tone: "warn", bold: true }));
    for (const x of [0, 10, 20, 30]) els.push(...xtick(bx(x), by - 0.2, `${x}`));
    els.push(...pad(-4.4, 1.5, 5.0, -1.6));
    return { els, readout: [holds ? `Gereken sürtünme ${F} N ≤ μsN = 20 N: blok durur, fs = ${F} N.` : `Gereken ${F} N > 20 N: statik denge yok, blok kaymaya başlar.`, "Katsayı kuvvet değildir; önce gereken sürtünmeyi bul, sonra sınırla karşılaştır."] };
  },
};

const upDown: FigureDef = {
  caption:
    "sinθ = 3/5, cosθ = 4/5, g = 10 m/s², dış kuvvet yok; yukarı yön +. Kinetik sürtünme göreli kaymaya terstir: blok yukarı kayarken aşağı, aşağı kayarken yukarı. a = −g sinθ ∓ μk g cosθ: yukarı kayışta −6 − 8μk, aşağı kayışta −6 + 8μk.",
  alt: "Eğik düzlemde blok; seçilen kayma yönünde hız oku, ona zıt sürtünme oku ve yüzey boyunca aşağı ağırlık bileşeni oku.",
  steps: ["Yukarı kayıyor", "Aşağı kayıyor"],
  param: { label: "μk", min: 0, max: 0.5, step: 0.05, init: 0.25 },
  draw: (mu, step) => {
    const th = (Math.asin(0.6) * 180) / Math.PI, S = 0.22;
    const { els, c } = incline(th, 5, 2.5);
    const u = v(0.8, 0.6), n = v(-0.6, 0.8), up = step === 0;
    const off = (k: number): V => v(c[0] + n[0] * k, c[1] + n[1] * k);
    const p0 = off(0.55), dir = up ? 1 : -1;
    els.push(vec(p0, v(p0[0] + u[0] * dir * 1.0, p0[1] + u[1] * dir * 1.0), { tone: "b", bold: true }), txt(v(p0[0] + u[0] * dir * 1.0, p0[1] + u[1] * dir * 1.0 + 0.1), up ? "v yukarı" : "v aşağı", "n", { tone: "b", small: true }));
    const gpar = 6, fk = 8 * mu;
    const gTip = v(c[0] - u[0] * gpar * S, c[1] - u[1] * gpar * S);
    els.push(vec(c, gTip, { tone: "warn", bold: true }), txt(beside(c, gTip, 0.5), "g sinθ = 6", "c", { tone: "warn", small: true }));
    if (fk > 0.01) {
      const q = off(1.15), fTip = v(q[0] - u[0] * dir * fk * S, q[1] - u[1] * dir * fk * S);
      els.push(vec(q, fTip, { tone: "a", bold: true }));
      els.push(txt(v(Math.min(q[0], fTip[0]) - 0.12, (q[1] + fTip[1]) / 2), `μk g cosθ = ${nf(fk, 1)}`, "w", { tone: "a", small: true }));
    }
    els.push(...pad(-2.0, 4.0, 5.4, -0.4));
    const a = up ? -6 - fk : -6 + fk;
    return { els, readout: [`${up ? "Yukarı" : "Aşağı"} kayış: a = −6 ${up ? "−" : "+"} 8·${nf(mu, 2)} = ${nf(a, 2)} m/s² (birim kütle başına kuvvet).`, up ? "Hız +, ivme −: blok yavaşlar; durunca statik sınırı yeniden denetle." : "Hız −, ivme −: aşağı doğru hızlanır (|a| < 6 m/s²)."] };
  },
};

const tablePulley: FigureDef = {
  caption:
    "Örnek: masada m₁ = 3 kg, asılı m₂ = 2 kg, ideal ip ve makara, μs = μk = μ seçildi. Katsayıyı değiştir: önce m₂g = 20 N statik sınır μm₁g = 30μ ile karşılaştırılır. Kayıyorsa a = (20 − 30μ)/5 ve T = m₂(g − a); gerilme 20 N değildir, çünkü asılı kütle ivmelenir.",
  alt: "Yatay masada blok, masanın köşesinde makara, makaradan sarkan ikinci blok; masadaki blokta sağa gerilme ve sola sürtünme okları, asılı blokta yukarı gerilme ve aşağı ağırlık okları.",
  param: { label: "μ", min: 0, max: 0.8, step: 0.05, init: 0.2 },
  draw: (mu) => {
    const m1 = 3, m2 = 2, S = 0.06;
    const moves = m2 * G > mu * m1 * G;
    const a = moves ? (m2 * G - mu * m1 * G) / (m1 + m2) : 0, T = m2 * (G - a), f = moves ? mu * m1 * G : m2 * G;
    const els: El[] = [box(-3.2, -0.2, 0, 0, "muted"), seg(v(0, 0), v(0, -3.2), { tone: "muted", thin: true })];
    const pc = v(0.25, 0.25);
    els.push(circle(pc, 0.25, { tone: "ink" }), box(-2.2, 0, -1.2, 0.8, "c"), txt(v(-1.7, 0.4), "3 kg", "c", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(-1.2, 0.5), v(0.25, 0.5), { tone: "ink", thin: true }), seg(v(0.5, 0.25), v(0.5, -1.6), { tone: "ink", thin: true }), box(0.15, -2.4, 0.85, -1.6, "b"), txt(v(0.5, -2.0), "2 kg", "c", { tone: "ink", small: true, bold: true }));
    els.push(vec(v(-1.2, 0.4), v(-1.2 + T * S, 0.4), { tone: "a", bold: true }), txt(v(-1.2 + T * S / 2, 0.75), `T = ${nf(T, 1)} N`, "n", { tone: "a", small: true, bold: true }));
    if (f > 0.01) els.push(vec(v(-2.2, 0.15), v(-2.2 - f * S, 0.15), { tone: "warn", bold: true }), txt(v(-2.2 - f * S - 0.1, 0.15), `f = ${nf(f, 1)} N`, "w", { tone: "warn", small: true }));
    els.push(vec(v(0.95, -1.6), v(0.95, -1.6 + T * S), { tone: "a" }), vec(v(0.95, -2.4), v(0.95, -2.4 - m2 * G * S), { tone: "warn" }), txt(v(1.05, -2.4 - m2 * G * S), "20 N", "e", { tone: "warn", small: true }));
    els.push(...pad(-4.8, 1.3, 2.4, -3.8));
    return {
      els,
      readout: moves
        ? [`20 N > 30·${nf(mu, 2)} = ${nf(30 * mu, 1)} N: kayar. a = (20 − ${nf(30 * mu, 1)})/5 = ${nf(a, 2)} m/s², T = 2·(10 − ${nf(a, 2)}) = ${nf(T, 2)} N.`, "Kontrol: m₁ için T − f = 3a ⇒ " + `${nf(T, 2)} − ${nf(f, 2)} = ${nf(T - f, 2)} = 3·${nf(a, 2)}.`]
        : [`20 N ≤ 30·${nf(mu, 2)} = ${nf(30 * mu, 1)} N: durur. a = 0, T = 20 N, gereken statik sürtünme 20 N.`, "Sınır μ = 2/3: bunun üstünde sistem kendiliğinden harekete başlamaz."],
    };
  },
};

const wagon: FigureDef = {
  caption:
    "Vagon yatayda sabit a ivmesiyle hızlanıyor; 1 kg’lık bob vagona göre sabit açıda duruyor. İvmeyi değiştir: T cosθ = mg, T sinθ = ma ⇒ tanθ = a/g (açı düşeyden). Sabit hızda (a = 0) ip düşeydir; açı hızı değil ivmeyi gösterir.",
  alt: "Vagon kutusu ve sağa ivme oku; tavandan sarkan ip geriye doğru açılı, ucunda bob; bobda ip gerilmesi ve ağırlık okları, düşeyle açı işaretli.",
  param: { label: "İvme a", min: 0, max: 10, step: 1, init: 4, unit: " m/s²", plain: true },
  draw: (a) => {
    const m = 1, L = 2.2, th = Math.atan2(a, G), T = m * Math.hypot(G, a), S = 0.09;
    const top = v(0, 2.6), bob = v(-L * Math.sin(th), 2.6 - L * Math.cos(th));
    const els: El[] = [box(-2.8, 0, 2.8, 2.9, "muted", false), seg(v(-3.2, -0.3), v(3.2, -0.3), { tone: "muted", thin: true })];
    els.push(circle(v(-1.9, -0.15), 0.15, { tone: "ink" }), circle(v(1.9, -0.15), 0.15, { tone: "ink" }));
    els.push(seg(v(0, 2.6), v(0, 0.6), { tone: "muted", dash: true, thin: true }), seg(top, bob, { tone: "ink" }), ball(bob, 0.14, "b"));
    if (a > 0) els.push(ang(top, v(0, 0), bob, `${nf((th * 180) / Math.PI, 1)}°`, { tone: "muted", r: 30 }));
    els.push(vec(bob, v(bob[0] + Math.sin(th) * T * S, bob[1] + Math.cos(th) * T * S), { tone: "a", bold: true }), vec(bob, v(bob[0], bob[1] - m * G * S), { tone: "warn", bold: true }));
    els.push(txt(v(bob[0] + 0.15, bob[1] - m * G * S + 0.1), "mg = 10 N", "e", { tone: "warn", small: true }));
    if (a > 0) els.push(vec(v(1.6, 3.2), v(1.6 + a * 0.12, 3.2), { tone: "c", bold: true }), txt(v(1.5, 3.2), `a = ${a} m/s²`, "w", { tone: "c", small: true }));
    els.push(...pad(-3.4, 3.5, 3.4, -0.6));
    return { els, readout: [`tanθ = ${a}/10 ⇒ θ = ${nf((th * 180) / Math.PI, 1)}°; T = √(10² + ${a}²) = ${nf(T, 2)} N.`, "Yer çerçevesinde yalnız T ve mg vardır; T’nin yatay bileşeni ma’yı sağlar."] };
  },
};

/* ===================== Kesişen kuvvetler ===================== */

function knotEls(dirs: { deg: number; T: number; tone: Tone; label: string }[], W: number, S: number, L: number): El[] {
  const O = v(0, 0);
  const els: El[] = [];
  for (const d of dirs) {
    const A = along(O, d.deg, L);
    els.push(seg(O, A, { tone: "muted", thin: true }), seg(v(A[0] - 0.3, A[1]), v(A[0] + 0.3, A[1]), { tone: "muted", bold: true }));
    els.push(vec(O, along(O, d.deg, d.T * S), { tone: d.tone, bold: true }));
    const tip = along(O, d.deg, d.T * S);
    if (d.label) els.push(txt(v(tip[0] + (d.deg > 90 ? -0.1 : 0.1), tip[1] - 0.05), d.label, d.deg > 90 ? "sw" : "se", { tone: d.tone, small: true, bold: true }));
  }
  els.push(seg(O, v(0, -1.0), { tone: "muted", thin: true }), box(-0.35, -1.6, 0.35, -1.0, "c"));
  els.push(vec(v(0, -1.6), v(0, -1.6 - W * S), { tone: "warn", bold: true }), txt(v(0.12, -1.6 - W * S), `W = ${W} N`, "e", { tone: "warn", small: true, bold: true }));
  els.push(ball(O, 0.07, "ink"));
  return els;
}

const twoTensions: FigureDef = {
  caption:
    "Kütlesiz düğümde W = 100 N; sağ ip yatayla β = 60°, sol ipin açısını değiştir. x: −TL cosα + TR cosβ = 0; y: TL sinα + TR sinβ = W. Çözüm TL = W cosβ / sin(α + β), TR = W cosα / sin(α + β). Ok boyları hesaplanan gerilmelerle orantılıdır.",
  alt: "Düğümden sol yukarı ve sağ yukarı iki ip; iplerin üzerinde gerilme okları ve değerleri, düğümün altında asılı yük ve aşağı ağırlık oku.",
  param: { label: "Sol açı α", min: 20, max: 75, step: 5, init: 30, unit: "°", plain: true },
  draw: (al) => {
    const W = 100, be = 60, s = Math.sin(R(al + be));
    const TL = (W * Math.cos(R(be))) / s, TR = (W * Math.cos(R(al))) / s;
    const els = knotEls(
      [
        { deg: 180 - al, T: TL, tone: "b", label: `TL = ${nf(TL, 1)} N` },
        { deg: be, T: TR, tone: "a", label: `TR = ${nf(TR, 1)} N` },
      ],
      W,
      0.028,
      3.4,
    );
    const aL = along(v(0, 0), 180 - al, 3.4), aR = along(v(0, 0), be, 3.4);
    els.push(ang(v(0, 0), v(-1, 0), along(v(0, 0), 180 - al, 1), undefined, { tone: "muted", r: 26 }), ang(v(0, 0), v(1, 0), along(v(0, 0), be, 1), undefined, { tone: "muted", r: 26 }));
    els.push(txt(v(aL[0], aL[1] + 0.12), `α = ${al}°`, "n", { tone: "muted", small: true }), txt(v(aR[0], aR[1] + 0.12), "β = 60°", "n", { tone: "muted", small: true }));
    els.push(...pad(-3.8, 3.9, 3.8, -4.6));
    return { els, readout: [`TL = 100·cos60°/sin${al + be}° = ${nf(TL, 1)} N; TR = 100·cos${al}°/sin${al + be}° = ${nf(TR, 1)} N.`, `Kontrol x: ${nf(TL * Math.cos(R(al)), 1)} = ${nf(TR * Math.cos(R(be)), 1)}; y: ${nf(TL * Math.sin(R(al)) + TR * Math.sin(R(be)), 1)} = 100 N.`] };
  },
};

const symmetric: FigureDef = {
  caption:
    "İki ip yatayla aynı θ açısını yapıyor, W = 100 N. 2T sinθ = W ⇒ T = W / (2 sinθ). Yataydan θ küçüldükçe ip yataylaşır, gerilme büyür; aynı olay ipler arasındaki üst açı γ = 180° − 2θ büyürken de anlatılır. θ = 30°’de T = W, θ = 90°’de T = W/2.",
  alt: "Düğümden simetrik iki ip, yatayla θ açısı ve ipler arası γ açısı işaretli; ipler üzerinde eşit gerilme okları, altta asılı yük.",
  param: { label: "θ (yataydan)", min: 15, max: 90, step: 5, init: 30, unit: "°", plain: true },
  draw: (th) => {
    const W = 100, T = W / (2 * Math.sin(R(th)));
    const els = knotEls(
      [
        { deg: 180 - th, T, tone: "b", label: th < 90 ? `T = ${nf(T, 1)} N` : "" },
        { deg: th, T, tone: "a", label: `T = ${nf(T, 1)} N` },
      ],
      W,
      0.016,
      3.6,
    );
    if (th < 90) {
      const aR = along(v(0, 0), th, 3.6);
      els.push(ang(v(0, 0), v(1, 0), along(v(0, 0), th, 1), undefined, { tone: "muted", r: 30 }), txt(v(aR[0] + 0.4, aR[1]), `θ = ${th}°`, "e", { tone: "muted", small: true }));
      els.push(ang(v(0, 0), along(v(0, 0), th, 1), along(v(0, 0), 180 - th, 1), undefined, { tone: "c", r: 20 }), txt(v(0, aR[1] + 0.35), `γ = ${180 - 2 * th}°`, "n", { tone: "c", small: true }));
    }
    els.push(...pad(-4.4, 4.2, 5.4, -3.4));
    return { els, readout: [`T = 100 / (2·sin${th}°) = ${nf(T, 1)} N; üst açı γ = ${180 - 2 * th}°.`, "“Açı artarsa gerilme artar” demeden önce hangi açıyı kastettiğini söyle: θ artınca T azalır, γ artınca T artar."] };
  },
};

const lami: FigureDef = {
  caption:
    "α = 30°, β = 60°, W = 100 N düğümü: TL = 50 N, TR = 86,6 N. Üç kuvvet dengedeyse uç uca dizildiklerinde üçgen kapanır. Lami: her kuvvet, diğer ikisi arasındaki açının sinüsüne bölünürse aynı oran (100 N) çıkar.",
  alt: "İlk adımda düğümdeki üç kuvvet oku; ikinci adımda aynı oklar uç uca eklenerek kapalı bir dik üçgen oluşturuyor.",
  steps: ["Düğümdeki kuvvetler", "Uç uca: üçgen kapanır"],
  draw: (_v, step) => {
    const S = 0.03, TL = 50, TR = 100 * Math.cos(R(30));
    const O = v(0, 0);
    const els: El[] = [];
    const tl = along(O, 150, TL * S), tr = along(O, 60, TR * S), w = v(0, -100 * S);
    if (step === 0) {
      els.push(vec(O, tl, { tone: "b", bold: true }), vec(O, tr, { tone: "a", bold: true }), vec(O, w, { tone: "warn", bold: true }), ball(O, 0.07, "ink"));
      els.push(txt(v(tl[0] - 0.1, tl[1]), "TL = 50 N", "w", { tone: "b", small: true, bold: true }), txt(v(tr[0] + 0.1, tr[1]), "TR = 86,6 N", "e", { tone: "a", small: true, bold: true }), txt(v(0.15, w[1] * 0.7), "W = 100 N", "e", { tone: "warn", small: true, bold: true }));
      els.push(ang(O, tl, tr, "90°", { tone: "muted", r: 22 }), ang(O, tr, w, "150°", { tone: "muted", r: 30 }));
    } else {
      const A = O, B = w, C = v(B[0] + tr[0], B[1] + tr[1]);
      els.push(vec(A, B, { tone: "warn", bold: true }), vec(B, C, { tone: "a", bold: true }), vec(C, A, { tone: "b", bold: true }));
      els.push(txt(v(-0.15, B[1] / 2), "W", "w", { tone: "warn", small: true, bold: true }), txt(beside(B, C, -0.35), "TR", "c", { tone: "a", small: true, bold: true }), txt(beside(C, A, -0.35), "TL", "c", { tone: "b", small: true, bold: true }));
      els.push(ang(C, B, A, "90°", { tone: "muted", r: 20 }));
    }
    els.push(...pad(-2.8, 2.6, 2.8, -3.3));
    return { els, readout: ["TL / sin150° = 50 / 0,5 = 100; TR / sin120° = 86,6 / 0,866 = 100; W / sin90° = 100.", "Paydaki açı, kuvvetin karşısındaki (diğer iki kuvvet arasındaki) açıdır."] };
  },
};

const reference: FigureDef = {
  caption:
    "Aynı 20 N’luk ip kuvveti iki biçimde tanımlanıyor: yataydan 30° ya da düşeyden 60°. Yataydan ölçünce Tx = T cos30°, Ty = T sin30°; düşeyden ölçünce Tx = T sin60°, Ty = T cos60°. Bileşenler aynı çıkmalıdır: 17,32 N ve 10 N.",
  alt: "Başlangıçtan sağ yukarı 20 N kuvvet oku; yatay ve düşey kesikli bileşenleri; adıma göre açı yayı yataydan ya da düşeyden işaretli.",
  steps: ["Yataydan 30°", "Düşeyden 60°"],
  draw: (_v, step) => {
    const S = 0.14, T = 20, O = v(0, 0), P = along(O, 30, T * S);
    const els: El[] = [seg(v(-0.5, 0), v(3.4, 0), { tone: "muted", thin: true }), seg(v(0, -0.3), v(0, 2.4), { tone: "muted", thin: true })];
    els.push(vec(O, v(P[0], 0), { tone: "b", dash: true }), vec(v(P[0], 0), P, { tone: "c", dash: true }), vec(O, P, { tone: "a", bold: true }));
    els.push(txt(v(P[0] / 2, -0.15), "Tx = 17,32 N", "s", { tone: "b", small: true, bold: true }), txt(v(P[0] + 0.15, P[1] / 2), "Ty = 10 N", "e", { tone: "c", small: true, bold: true }), txt(beside(O, P, 0.35), "T = 20 N", "c", { tone: "a", small: true, bold: true }));
    els.push(step === 0 ? ang(O, v(1, 0), P, "30°", { tone: "warn", r: 40 }) : ang(O, P, v(0, 1), "60°", { tone: "warn", r: 40 }));
    els.push(...pad(-0.8, 2.8, 4.4, -0.8));
    return { els, readout: [step === 0 ? "Yataydan: Tx = 20·cos30° = 17,32 N, Ty = 20·sin30° = 10 N." : "Düşeyden: Tx = 20·sin60° = 17,32 N, Ty = 20·cos60° = 10 N.", "Sinüs ya da kosinüs adı değil, açının bağlandığı eksen bileşeni seçer."] };
  },
};

/* ===================== İtme ve momentum ===================== */

/** Örnek F–t eğrisi: 0–1 s doğrusal 10 N’a, 3 s’ye kadar sabit, 4 s’de 0; 4–6 s −5 N. */
const force = (t: number) => (t < 1 ? 10 * t : t < 3 ? 10 : t < 4 ? 10 * (4 - t) : t < 6 ? -5 : 0);
const impulseTo = (t: number) => {
  let s = 0;
  const n = 600;
  for (let i = 0; i < n; i++) {
    const a = (t * i) / n, b = (t * (i + 1)) / n;
    s += ((force(a) + force(b)) / 2) * (b - a);
  }
  return Math.round(s * 1000) / 1000;
};
const ftArea: FigureDef = {
  caption:
    "Örnek F–t grafiği (2 kg cisim, başlangıçta durgun). Zaman imlecini kaydır: zaman ekseninin üstündeki alan pozitif, altındaki negatif itmedir ve momentum değişimine eşittir. Yamuk 30 N·s, sonraki dikdörtgen −10 N·s; 6 s sonunda p = 20 kg·m/s.",
  alt: "Kuvvet–zaman grafiği: önce yükselen, sabit kalan ve inen pozitif yamuk, ardından eksen altında negatif dikdörtgen; seçili zamana kadar olan alan taralı.",
  param: { label: "Zaman t", min: 0, max: 6, step: 0.5, init: 3, unit: " s" },
  draw: (t) => {
    const KT = 0.75, KF = 0.18, X = (s: number) => s * KT, Y = (f: number) => f * KF;
    const els: El[] = [...axes(v(0, 0), 6 * KT + 0.4, 11 * KF, "t (s)", "F (N)", 6 * KF)];
    const pos: V[] = [v(0, 0)], neg: V[] = [];
    for (let i = 0; i <= 48; i++) {
      const s = Math.min((t * i) / 48, 4);
      if (s <= t) pos.push(v(X(s), Y(Math.max(force(s), 0))));
    }
    pos.push(v(X(Math.min(t, 4)), 0));
    if (t > 0) els.push(poly(pos, { fill: "a", tone: "a", thin: true }));
    if (t > 4) {
      neg.push(v(X(4), 0), v(X(4), Y(-5)), v(X(t), Y(-5)), v(X(t), 0));
      els.push(poly(neg, { fill: "warn", tone: "warn", thin: true }));
    }
    const line: V[] = [v(0, 0), v(X(1), Y(10)), v(X(3), Y(10)), v(X(4), 0), v(X(4), Y(-5)), v(X(6), Y(-5)), v(X(6), 0)];
    els.push(poly(line, { open: true, tone: "ink", bold: true }), seg(v(X(t), Y(-6)), v(X(t), Y(11)), { tone: "c", dash: true, thin: true }));
    for (const s of [1, 3, 4, 6]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, Y(10), "10"), ...ytick(0, Y(-5), "−5"));
    const I = impulseTo(t);
    els.push(...pad(-0.9, 11 * KF + 0.5, X(6) + 0.9, -6 * KF - 0.4));
    return { els, readout: [`0–${nf(t)} s itme = ${nf(I, 2)} N·s ⇒ p = 0 + ${nf(I, 2)} = ${nf(I, 2)} kg·m/s, v = ${nf(I / 2, 2)} m/s.`, "Grafiğin eğimi momentum değişimi değildir; eşit pozitif ve negatif alan Δp = 0 verir ama ara hareketi silmez."] };
  },
};

const rebound: FigureDef = {
  caption:
    "0,5 kg top duvara +6 m/s ile gidiyor; dönüş hızını değiştir. Δp = m(v_son − v_ilk). −4 m/s ile dönerse Δp = 0,5(−4 − 6) = −5 N·s; süratlerin farkı (6 − 4) yön değişimini kaybettirir.",
  alt: "Duvar ve iki yatay ok: ilk momentum sağa, son momentum seçilen yönde; altta son eksi ilk olarak çizilen momentum değişimi oku.",
  param: { label: "Son hız", min: -6, max: 6, step: 1, init: -4, unit: " m/s", plain: true },
  draw: (vs) => {
    const m = 0.5, K = 0.6, pi = m * 6, ps = m * vs, dp = ps - pi;
    const els: El[] = [box(4.0, -2.4, 4.3, 1.6, "muted"), seg(v(0, -2.3), v(0, 1.5), { tone: "muted", thin: true, dash: true })];
    els.push(vec(v(0, 1.0), v(pi * K, 1.0), { tone: "b", bold: true }), txt(v(pi * K + 0.1, 1.0), "p_ilk = +3", "e", { tone: "b", small: true, bold: true }));
    if (ps !== 0) els.push(vec(v(0, 0.1), v(ps * K, 0.1), { tone: "c", bold: true }));
    els.push(txt(v(ps >= 0 ? ps * K + 0.1 : 0.1, 0.1), `p_son = ${nf(ps, 1)}`, "e", { tone: "c", small: true, bold: true }));
    if (dp !== 0) els.push(vec(v(0, -1.2), v(dp * K, -1.2), { tone: "warn", bold: true }));
    els.push(txt(v(dp >= 0 ? dp * K + 0.1 : 0.1, -1.2), `Δp = ${nf(dp, 1)} N·s`, "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-4.0, 1.8, 4.6, -2.6));
    return { els, readout: [`Δp = 0,5·(${nf(vs)} − 6) = ${nf(dp, 1)} N·s${dp < 0 ? " (duvardan dışarı)" : ""}.`, "Duvarın topa uyguladığı itme bu Δp’ye eşittir; ağırlığın kısa süredeki itmesi ihmal edildi."] };
  },
};

const restitution: FigureDef = {
  caption:
    "Örnek: A (2 kg, +6 m/s) duran B’ye (1 kg) çarpıyor. Geri sıçrama katsayısını değiştir: momentum her durumda 12 kg·m/s korunur, vB − vA = e·(uA − uB). e = 1 esnek (kinetik enerji 36 J kalır), e = 0 kenetlenme (ortak 4 m/s, 24 J).",
  alt: "Üstte çarpışmadan önce A ve B arabaları ve hız okları, altta sonra; sağda öncesi ve sonrası toplam kinetik enerji çubukları.",
  param: { label: "Katsayı e", min: 0, max: 1, step: 0.1, init: 0.5 },
  draw: (e) => {
    const mA = 2, mB = 1, uA = 6, vA = (mA * uA - mB * e * uA) / (mA + mB), vB = vA + e * uA;
    const K0 = 0.5 * mA * uA * uA, K1 = 0.5 * mA * vA * vA + 0.5 * mB * vB * vB, S = 0.22;
    const cart = (x: number, y: number, label: string, tone: Tone, w: number): El[] => [box(x - w, y, x + w, y + 0.6, tone), txt(v(x, y + 0.3), label, "c", { tone: "ink", small: true, bold: true })];
    const els: El[] = [seg(v(-2.6, 1.2), v(3.4, 1.2), { tone: "muted", thin: true }), seg(v(-2.6, -0.6), v(3.4, -0.6), { tone: "muted", thin: true })];
    els.push(...cart(-1.6, 1.2, "A", "b", 0.45), ...cart(0.6, 1.2, "B", "c", 0.32), vec(v(-1.6, 2.05), v(-1.6 + uA * S, 2.05), { tone: "b", bold: true }), txt(v(-1.6 + uA * S + 0.1, 2.05), "6 m/s", "e", { tone: "b", small: true }));
    els.push(txt(v(-2.7, 1.5), "önce", "w", { tone: "muted", small: true }), txt(v(-2.7, -0.3), "sonra", "w", { tone: "muted", small: true }));
    els.push(...cart(-0.6, -0.6, "A", "b", 0.45), ...cart(0.4 + e * 0.8, -0.6, "B", "c", 0.32));
    els.push(vec(v(-0.6, 0.25), v(-0.6 + vA * S, 0.25), { tone: "b", bold: true }), txt(v(-0.6 - 0.1, 0.25), `${nf(vA, 2)} m/s`, "w", { tone: "b", small: true }));
    els.push(vec(v(0.4 + e * 0.8, -0.85), v(0.4 + e * 0.8 + vB * S, -0.85), { tone: "c", bold: true }), txt(v(0.4 + e * 0.8 + vB * S + 0.1, -0.85), `${nf(vB, 2)} m/s`, "e", { tone: "c", small: true }));
    const bx = 4.6, KB = 0.06;
    els.push(box(bx, -0.6, bx + 0.45, -0.6 + K0 * KB, "muted"), box(bx + 1.25, -0.6, bx + 1.7, -0.6 + K1 * KB, "a"), seg(v(bx - 0.2, -0.6), v(bx + 1.9, -0.6), { tone: "ink", thin: true }));
    els.push(txt(v(bx + 0.22, -0.6 + K0 * KB + 0.08), "36 J", "n", { tone: "muted", small: true }), txt(v(bx + 1.48, -0.6 + K1 * KB + 0.08), `${nf(K1, 1)} J`, "n", { tone: "a", small: true, bold: true }));
    els.push(...pad(-3.6, 2.7, 6.8, -1.3));
    return { els, readout: [`vA = (12 − 6e)/3 = ${nf(vA, 2)} m/s, vB = vA + 6e = ${nf(vB, 2)} m/s; momentum 2·${nf(vA, 2)} + 1·${nf(vB, 2)} = 12.`, `Kinetik enerji 36 J → ${nf(K1, 2)} J (kayıp ${nf(K0 - K1, 2)} J iç enerji ve sese).`] };
  },
};

const twoD: FigureDef = {
  caption:
    "2 kg cisim (3, 0) m/s, 1 kg cisim (0, 4) m/s ile gelip kenetleniyor; dış itme ihmal. Momentumlar uç uca: (6, 0) + (0, 4) = (6, 4) kg·m/s. Ortak hız (6, 4)/3 = (2; 4/3) m/s. Süratler doğrudan toplanmaz.",
  alt: "Momentum düzleminde sağa 6 ve yukarı 4 birimlik iki ok uç uca, başlangıçtan uca toplam momentum oku; yanında daha kısa ortak hız oku.",
  draw: () => {
    const K = 0.45, O = v(0, 0), P1 = v(6 * K, 0), P = v(6 * K, 4 * K), V3 = v(2 * K, (4 / 3) * K);
    const els: El[] = [vec(O, P1, { tone: "b", bold: true }), vec(P1, P, { tone: "c", bold: true }), vec(O, P, { tone: "a", bold: true })];
    els.push(txt(v(P1[0] / 2, -0.15), "p₁ = (6, 0)", "s", { tone: "b", small: true, bold: true }), txt(v(P1[0] + 0.15, P[1] / 2), "p₂ = (0, 4)", "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(P[0] - 0.1, P[1] + 0.12), "p = (6, 4)", "n", { tone: "a", small: true, bold: true }));
    const O2 = v(0.2, -1.6), V2 = v(O2[0] + V3[0] * 1.4, O2[1] + V3[1] * 1.4);
    els.push(vec(O2, V2, { tone: "warn", bold: true }), txt(v(V2[0] + 0.12, V2[1] - 0.05), "v = (2; 1,33) m/s", "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.8, 2.4, 4.6, -1.9));
    return { els, readout: [`|p| = √(36 + 16) = ${nf(Math.sqrt(52), 2)} kg·m/s; ortak sürat ${nf(Math.sqrt(52) / 3, 2)} m/s.`, "Sürat toplamı 3 + 4 = 7 m/s hiçbir anlamlı sonuç vermez; her bileşende ayrı korunum yaz."] };
  },
};

export const physicsFigures058Forces: Record<string, Record<string, FigureDef>> = {
  "ayt-newton-hareket-yasalari": {
    "Kuvvet ve bileşen aynı listede iki kez sayılmaz": components,
    "Duran blokta gereken sürtünmeyi bul": staticFriction,
    "Yönlü denklemle çıkış ve inişi ayır": upDown,
    "Sabit ideal makara: gerilmeyi alt cisimden doğrula": tablePulley,
    "İvmeli vagondaki açı bir hız göstergesi değildir": wagon,
  },
  "kesisen-kuvvetler-dengesi": {
    "Açının referansı bileşeni değiştirir": reference,
    "İki denklem, iki gerilme": twoTensions,
    "Simetrik askıda açı büyürken hangi açı?": symmetric,
    "Üç kuvvet üçgeni ve Lami": lami,
  },
  "itme-momentum": {
    "Kuvvet–zaman grafiğinde alan işaretlidir": ftArea,
    "Geri sıçramada son eksi ilk": rebound,
    "Esnek çarpışmanın ikinci denklemi": restitution,
    "İki boyutta toplam ve özel diklik": twoD,
  },
};
