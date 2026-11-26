import { ball, poly, pt, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge058) · Su dalgalarında girişim, ışık teorileri (Young ve
 * tek yarık) ve atom modelleri. Girişim çizgileri gerçek hiperbol denkleminden,
 * saçak desenleri cos² ve sinc² şiddetinden, enerji düzeyleri Eₙ = −13,6 Z²/n²
 * eV bağıntısından çizilir. Değerler rehber bölümlerinin öğretim örnekleridir.
 */

const TAU = Math.PI * 2;

/* ===================== Su dalgalarında girişim ===================== */

/** Δr = r₂ − r₁ = D olan noktalar (odaklar x = ±c); |y| ≤ ymax ile kırpılmış hiperbol dalı. */
function hyperbola(D: number, c: number, ymax: number, xmax: number): V[] {
  if (Math.abs(D) < 1e-9) return [v(0, -ymax), v(0, ymax)];
  const a = Math.abs(D) / 2, b = Math.sqrt(Math.max(c * c - a * a, 1e-9)), side = D > 0 ? -1 : 1;
  const ps: V[] = [];
  const umax = Math.asinh(ymax / b);
  for (let i = 0; i <= 60; i++) {
    const u = -umax + (2 * umax * i) / 60, x = side * a * Math.cosh(u), y = b * Math.sinh(u);
    if (Math.abs(x) <= xmax) ps.push(v(x, y));
  }
  return ps;
}

const hyperbolas: FigureDef = {
  caption:
    "Aynı fazlı iki kaynak arası 6 cm; dalga boyunu değiştir. Katar çizgileri (dolu) |Δr| = nλ, düğüm çizgileri (kesikli) |Δr| = (n − ½)λ koşulundan çizilen hiperbollerdir; Δr = 0 orta dikmedir. |Δr| < d sınırı içinde kalan çizgiler sayılır; λ küçülünce çizgi sayısı basamaklı artar.",
  alt: "İki kaynak noktası ve onları odak alan, yukarı ve aşağı uzanan dolu katar hiperbolleri ile kesikli düğüm hiperbolleri; ortada düz merkez katar çizgisi.",
  param: { label: "Dalga boyu λ", min: 1, max: 4, step: 0.5, init: 2, unit: " cm" },
  draw: (lam) => {
    const d = 6, c = d / 2, K = 0.5, Y = 5, Xm = 6.5;
    const els: El[] = [];
    let anti = 0, nodes = 0;
    for (let n = -6; n <= 6; n++) {
      const D = n * lam;
      if (Math.abs(D) < d - 1e-9) {
        anti++;
        els.push(poly(hyperbola(D, c, Y, Xm).map((p) => v(p[0] * K, p[1] * K)), { open: true, tone: "a", bold: n === 0 }));
      }
    }
    for (let n = 1; n <= 7; n++) {
      const D = (n - 0.5) * lam;
      if (D < d - 1e-9) {
        nodes += 2;
        for (const s of [1, -1]) els.push(poly(hyperbola(s * D, c, Y, Xm).map((p) => v(p[0] * K, p[1] * K)), { open: true, tone: "b", dash: true, thin: true }));
      }
    }
    els.push(seg(v(-c * K, 0), v(c * K, 0), { tone: "muted", thin: true }), ball(v(-c * K, 0), 0.1, "ink"), ball(v(c * K, 0), 0.1, "ink"));
    els.push(txt(v(-c * K - 0.15, -0.15), "K₁", "sw", { tone: "ink", small: true, bold: true }), txt(v(c * K + 0.15, -0.15), "K₂", "se", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-Xm * K - 0.3, Y * K + 0.3, Xm * K + 0.3, -Y * K - 0.3));
    return { els, readout: [`λ = ${nf(lam, 1)} cm, d = 6 cm: ${anti} katar çizgisi (merkez dahil), ${nodes} düğüm çizgisi.`, "Eşitlik |Δr| = d kaynak doğrusunun dışına uzanan ışınlardır; sayıya katılmaz."] };
  },
};

const pathPhase: FigureDef = {
  caption:
    "Kaynaklar 6 cm arayla, λ = 2 cm, eşit genlik. P noktası kaynakların 4 cm yukarısındaki çizgide; konumunu değiştir. Δr = r₂ − r₁ ve δ = φ − 2πΔr/λ. Aynı fazda |Δr| = nλ katar, buçuklu kat düğümdür. Zıt fazlı kaynakta aynı nokta için roller yer değiştirir.",
  alt: "İki kaynak ve yukarıdaki P noktası; kaynaklardan P’ye iki uzaklık çizgisi ve değerleri; P’nin türü yazılı.",
  steps: ["Aynı faz (φ = 0)", "Zıt faz (φ = π)"],
  param: { label: "P’nin x konumu", min: -5, max: 5, step: 0.5, init: 1, unit: " cm" },
  draw: (x, step) => {
    const lam = 2, K = 0.5, S1 = v(-3, 0), S2 = v(3, 0), P = v(x, 4), phi = step === 0 ? 0 : Math.PI;
    const r1 = Math.hypot(P[0] - S1[0], P[1]), r2 = Math.hypot(P[0] - S2[0], P[1]), dr = r2 - r1;
    const delta = phi - (TAU * dr) / lam, A = 2 * Math.abs(Math.cos(delta / 2));
    const kind = A > 1.98 ? "katar" : A < 0.02 ? "düğüm" : "ara nokta";
    const sc = (p: V): V => v(p[0] * K, p[1] * K);
    const els: El[] = [seg(sc(v(-6, 4)), sc(v(6, 4)), { tone: "muted", dash: true, thin: true }), seg(sc(S1), sc(P), { tone: "b" }), seg(sc(S2), sc(P), { tone: "c" })];
    els.push(ball(sc(S1), 0.1, "ink"), ball(sc(S2), 0.1, "ink"), ball(sc(P), 0.1, kind === "katar" ? "a" : kind === "düğüm" ? "b" : "muted"));
    els.push(txt(v(S1[0] * K, -0.2), "K₁", "s", { tone: "ink", small: true, bold: true }), txt(v(S2[0] * K, -0.2), "K₂", "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(P[0] * K, P[1] * K + 0.18), `P: ${kind}`, "n", { tone: "a", small: true, bold: true }));
    const m1 = sc(v((S1[0] + P[0]) / 2, 2)), m2 = sc(v((S2[0] + P[0]) / 2, 2));
    els.push(txt(v(m1[0] - 0.12, m1[1]), `r₁ = ${nf(r1, 2)}`, "w", { tone: "b", small: true }), txt(v(m2[0] + 0.12, m2[1]), `r₂ = ${nf(r2, 2)}`, "e", { tone: "c", small: true }));
    els.push(...pad(-4.0, 2.8, 4.0, -0.5));
    return { els, readout: [`Δr = ${nf(r2, 2)} − ${nf(r1, 2)} = ${nf(dr, 2)} cm = ${nf(dr / lam, 2)}λ; δ = ${nf(((delta % TAU) + TAU) % TAU / Math.PI, 2)}π.`, `Toplam genlik 2A·|cos(δ/2)| = ${nf(A, 2)}A: ${kind}.`] };
  },
};

const quarter: FigureDef = {
  caption:
    "Kaynaklar 6 cm, λ = 2 cm. Yalnız kaynakları birleştiren doğru üzerinde Δr = −2x olduğundan katar kesişimleri λ/2 = 1 cm, katar ile komşu düğüm λ/4 = 0,5 cm aralıklıdır. Kesikli üst çizgide (y = 4 cm) aynı hiperbollerin yatay aralıkları farklıdır: λ/4 evrensel cetvel değildir.",
  alt: "Kaynak doğrusu üzerinde dolu katar ve boş düğüm işaretleri eşit aralıklı; üstte aynı hiperbollerin y = 4 cm çizgisini kestiği noktalar, aralıklar eşit değil.",
  draw: () => {
    const lam = 2, c = 3, K = 0.6, yU = 4;
    const els: El[] = [seg(v(-c * K, 0), v(c * K, 0), { tone: "muted" }), seg(v(-4.4 * K, yU * K), v(4.4 * K, yU * K), { tone: "muted", dash: true, thin: true })];
    for (let n = -5; n <= 5; n++) {
      const D = (n * lam) / 2;
      if (Math.abs(D) >= 2 * c - 1e-9) continue;
      const isAnti = n % 2 === 0, x0 = -D / 2;
      els.push(poly(hyperbola(D, c, yU, 6).map((p) => v(p[0] * K, p[1] * K)), { open: true, tone: isAnti ? "a" : "b", thin: true, dash: !isAnti }));
      els.push(pt(v(x0 * K, 0), undefined, "n", isAnti ? "a" : "b", !isAnti));
      // Crossing with y = yU: solve r2 − r1 = D numerically.
      let lo = -6, hi = 6;
      const f = (x: number) => Math.hypot(x - c, yU) - Math.hypot(x + c, yU) - D;
      for (let it = 0; it < 50; it++) {
        const m = (lo + hi) / 2;
        if (f(lo) * f(m) <= 0) hi = m;
        else lo = m;
      }
      els.push(pt(v(((lo + hi) / 2) * K, yU * K), undefined, "n", isAnti ? "a" : "b", !isAnti));
    }
    els.push(ball(v(-c * K, 0), 0.1, "ink"), ball(v(c * K, 0), 0.1, "ink"));
    els.push(seg(v(0, -0.35), v(0.5 * K, -0.35), { tone: "warn", bold: true }), txt(v(0.25 * K, -0.5), "λ/4 = 0,5 cm", "s", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(0, yU * K + 0.18), "y = 4 cm", "n", { tone: "muted", small: true }));
    els.push(...pad(-c * K - 0.6, yU * K + 0.6, 4.4 * K + 1.6, -1.0));
    return { els, readout: ["Kaynak doğrusunda katarlar x = 0, ±1, ±2 cm; düğümler x = ±0,5, ±1,5, ±2,5 cm.", "Üst çizgide aynı katar ve düğümlerin aralıkları merkezden uzaklaştıkça büyür; ölçeksiz şekilde λ/4 uygulamadan önce noktanın kaynak doğrusunda olduğunu denetle."] };
  },
};

const amplitude: FigureDef = {
  caption:
    "Aynı frekanslı iki katkı: A₁ = 2, A₂ = 1 birim. Faz farkını değiştir: genlikler uç uca eklenen oklar gibi birleşir, A² = A₁² + A₂² + 2A₁A₂cosδ. Aynı evrede 3, ters evrede 1, δ = 90°’de √5. Alttaki şerit |A₁ − A₂| ≤ A ≤ A₁ + A₂ aralığıdır; eşit olmayan genliklerde tam düğüm oluşmaz.",
  alt: "Yatay A₁ oku, ucuna seçilen açıyla eklenmiş A₂ oku ve başlangıçtan uca toplam genlik oku; altta 0 ile 3 arasında toplam genliği gösteren şerit.",
  param: { label: "Faz farkı δ", min: 0, max: 360, step: 15, init: 90, unit: "°", plain: true },
  draw: (d) => {
    const K = 1.1, r = (d * Math.PI) / 180, A1 = 2, A2 = 1, A = Math.sqrt(A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(r));
    const O = v(0, 0), P = v(A1 * K, 0), T = v(P[0] + A2 * K * Math.cos(r), A2 * K * Math.sin(r));
    const els: El[] = [vec(O, P, { tone: "b", bold: true }), vec(P, T, { tone: "c", bold: true }), vec(O, T, { tone: "a", bold: true })];
    const up = T[1] >= -1e-9;
    els.push(txt(v(P[0] / 2, up ? -0.15 : 0.15), "A₁ = 2", up ? "s" : "n", { tone: "b", small: true, bold: true }), txt(v(T[0] + 0.12, T[1]), "A₂ = 1", "e", { tone: "c", small: true }));
    els.push(txt(v(T[0] / 2 - 0.1, T[1] / 2 + (up ? 0.15 : -0.15)), `A = ${nf(A, 2)}`, up ? "nw" : "sw", { tone: "a", small: true, bold: true }));
    const by = -1.6, bx = (a: number) => a * 1.1;
    els.push(seg(v(bx(0), by), v(bx(3), by), { tone: "muted" }), box(bx(1), by - 0.08, bx(3), by + 0.08, "a"));
    for (const a of [0, 1, 2, 3]) els.push(...xtick(bx(a), by - 0.1, String(a)));
    els.push(ball(v(bx(A), by), 0.1, "warn"));
    els.push(...pad(-1.2, 1.6, 4.6, -2.3));
    return { els, readout: [`δ = ${d}°: A = √(4 + 1 + 4·cos${d}°) = ${nf(A, 3)}.`, "Toplam genlik her zaman 1 ile 3 arasında kalır; iki genliği her noktada doğrudan toplayamazsın."] };
  },
};

/* ===================== Işık teorileri ===================== */

function screenPattern(I: (ymm: number) => number, x0: number, KY: number, H: number, ymax: number, n = 240): V[] {
  const ps: V[] = [];
  for (let i = 0; i <= n; i++) {
    const y = -ymax + (2 * ymax * i) / n;
    ps.push(v(x0 + I(y) * H, y * KY));
  }
  return ps;
}

const young: FigureDef = {
  caption:
    "Young düzeneği: d = 0,30 mm, L = 2 m (şema ölçekli değil). Dalga boyunu değiştir: Δy = λL/d. 600 nm’de 600×10⁻⁹·2/0,3×10⁻³ = 4 mm. Perdenin yanındaki eğri bağıl ışık şiddetidir; merkez yol farkı sıfır olduğu için aydınlıktır, uzun dalga boyu deseni açar.",
  alt: "Solda iki dar yarık, sağda düşey perde; perdenin sağında yatay olarak çizilmiş cos² biçimli şiddet eğrisi; iki komşu aydınlık arası Δy ölçüsü.",
  param: { label: "Dalga boyu λ", min: 400, max: 700, step: 50, init: 600, unit: " nm", plain: true },
  draw: (lam) => {
    const L = 2, d = 0.3e-3, dy = (lam * 1e-9 * L) / d * 1000, KY = 0.17, sx = 4.2, ymax = 13;
    const els: El[] = [seg(v(0, -2.4), v(0, -0.25), { tone: "ink", bold: true }), seg(v(0, -0.12), v(0, 0.12), { tone: "ink", bold: true }), seg(v(0, 0.25), v(0, 2.4), { tone: "ink", bold: true })];
    els.push(seg(v(0, 0.19), v(sx, 0), { tone: "muted", thin: true, dash: true }), seg(v(0, -0.19), v(sx, 0), { tone: "muted", thin: true, dash: true }));
    els.push(seg(v(sx, -ymax * KY), v(sx, ymax * KY), { tone: "muted", bold: true }));
    els.push(poly(screenPattern((y) => Math.cos((Math.PI * y) / dy) ** 2, sx + 0.08, KY, 1.2, ymax), { open: true, tone: "a", bold: true, smooth: true }));
    els.push(seg(v(sx + 1.6, 0), v(sx + 1.6, dy * KY), { tone: "c", bold: true }), txt(v(sx + 1.75, (dy * KY) / 2), `Δy = ${nf(dy, 2)} mm`, "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.15, 0), "d", "w", { tone: "ink", small: true }), txt(v(sx / 2, -0.35), "L = 2 m", "s", { tone: "muted", small: true }));
    els.push(...pad(-0.8, ymax * KY + 0.3, sx + 3.8, -ymax * KY - 0.3));
    return { els, readout: [`Δy = ${lam}×10⁻⁹ · 2 / 0,3×10⁻³ = ${nf(dy, 2)} mm.`, "L artarsa desen açılır, d artarsa sıklaşır, λ artarsa aralık büyür."] };
  },
};

const orders: FigureDef = {
  caption:
    "Δy = 4 mm olan çift yarık deseni yatay perdede. m’inci aydınlık merkezden m·Δy, karanlıklar Δy/2, 3Δy/2, 5Δy/2 uzaklıktadır. Merkezin iki yanındaki ikinci aydınlıklar arasında dört aralık vardır: 16 mm. Sağ ve sol aynı sıranın iki ayrı konumudur.",
  alt: "Yatay perde ekseni boyunca cos² şiddet eğrisi; tepe noktalarının üstünde M, 1. A, 2. A etiketleri, çukurların altında 1. K, 2. K, 3. K etiketleri ve milimetre konumları.",
  draw: () => {
    const dy = 4, KX = 0.32, H = 1.2, ymax = 11;
    const els: El[] = [seg(v(-ymax * KX, 0), v(ymax * KX, 0), { tone: "muted" })];
    const ps: V[] = [];
    for (let i = 0; i <= 240; i++) {
      const y = -ymax + (2 * ymax * i) / 240;
      ps.push(v(y * KX, H * Math.cos((Math.PI * y) / dy) ** 2));
    }
    els.push(poly(ps, { open: true, tone: "a", bold: true, smooth: true }));
    for (const m of [-2, -1, 0, 1, 2]) els.push(txt(v(m * dy * KX, H + 0.12), m === 0 ? "M" : `${Math.abs(m)}. A`, "n", { tone: "a", small: true, bold: true }));
    for (const m of [1, 2, 3]) for (const s of [-1, 1]) els.push(txt(v(s * (m - 0.5) * dy * KX, -0.12), `${m}. K`, "s", { tone: "b", small: true }));
    els.push(seg(v(-2 * dy * KX, -0.75), v(2 * dy * KX, -0.75), { tone: "c", bold: true }), txt(v(0, -0.9), "4Δy = 16 mm", "s", { tone: "c", small: true, bold: true }));
    els.push(...pad(-ymax * KX - 0.3, H + 0.7, ymax * KX + 0.3, -1.4));
    return { els, readout: ["Aydınlıklar 0, ±4, ±8 mm; karanlıklar ±2, ±6, ±10 mm.", "Üç ardışık aydınlığın merkezleri arasında iki aralık (8 mm) vardır; adları saymak aralık saymak değildir."] };
  },
};

const plate: FigureDef = {
  caption:
    "Üst yarığın önüne n = 1,5 kırılma indisli, t kalınlıklı saydam levha konuyor (λ = 600 nm, Δy = 4 mm). Ek optik yol (n − 1)t; desen bu yolun kaç λ ettiği kadar saçak kayar. Merkez aydınlık levhanın bulunduğu yarık tarafına (yukarı) kayar; kesikli çizgi eski merkezdir. Şema ölçekli değil.",
  alt: "Solda iki yarık, üst yarığın önünde ince levha dikdörtgeni; sağda perde, kaymış şiddet eğrisi; eski merkez kesikli, yeni merkez işaretli.",
  param: { label: "Levha kalınlığı t", min: 0, max: 3, step: 0.5, init: 1.5, unit: " μm" },
  draw: (t) => {
    const n = 1.5, lam = 0.6, dy = 4, shiftFr = ((n - 1) * t) / lam, shift = shiftFr * dy, KY = 0.17, sx = 4.2, ymax = 13;
    const els: El[] = [seg(v(0, -2.4), v(0, -0.25), { tone: "ink", bold: true }), seg(v(0, -0.12), v(0, 0.12), { tone: "ink", bold: true }), seg(v(0, 0.25), v(0, 2.4), { tone: "ink", bold: true })];
    if (t > 0) els.push(box(0.1, 0.13, 0.1 + 0.1 * t, 0.27, "c"), txt(v(-0.15, 0.6), `levha t = ${nf(t, 1)} μm`, "w", { tone: "c", small: true }));
    els.push(seg(v(sx, -ymax * KY), v(sx, ymax * KY), { tone: "muted", bold: true }), seg(v(sx - 0.3, 0), v(sx + 1.5, 0), { tone: "muted", dash: true, thin: true }));
    els.push(poly(screenPattern((y) => Math.cos((Math.PI * (y - shift)) / dy) ** 2, sx + 0.08, KY, 1.2, ymax), { open: true, tone: "a", bold: true, smooth: true }));
    els.push(ball(v(sx, shift * KY), 0.08, "a"), txt(v(sx - 0.15, shift * KY), `yeni merkez +${nf(shift, 2)} mm`, "w", { tone: "a", small: true, bold: true }));
    els.push(...pad(-2.8, ymax * KY + 0.3, sx + 1.8, -ymax * KY - 0.3));
    return { els, readout: [`(n − 1)t = 0,5 · ${nf(t, 1)} μm = ${nf(0.5 * t, 2)} μm = ${nf(shiftFr, 2)}λ ⇒ kayma ${nf(shiftFr, 2)} · 4 = ${nf(shift, 2)} mm yukarı.`, "Saçak aralığı değişmez; iki yarığı eşit geciktirmek deseni hiç kaydırmaz."] };
  },
};

const singleSlit: FigureDef = {
  caption:
    "Tek yarık: λ = 600 nm, L = 2 m; yarık genişliğini değiştir. İlk karanlıklar y = ±λL/a, merkez aydınlık genişliği 2λL/a. a = 0,2 mm’de ±6 mm, genişlik 12 mm. Yarık iki katına çıkınca merkez genişliği yarıya iner. Eğri gerçek sinc² şiddetidir; a’yı çift yarık aralığı d ile karıştırma.",
  alt: "Yatay perde ekseninde ortada geniş ve yüksek merkez tepe, yanlarda küçük yan tepeler; ilk karanlıklar arasında merkez genişliği ölçüsü.",
  param: { label: "Yarık genişliği a", min: 0.1, max: 0.4, step: 0.05, init: 0.2, unit: " mm" },
  draw: (a) => {
    const lam = 600e-9, L = 2, y1 = ((lam * L) / (a * 1e-3)) * 1000, KX = 0.11, H = 2, ymax = 30;
    const I = (y: number) => {
      const b = (Math.PI * (a * 1e-3) * (y / 1000)) / (lam * L);
      return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2;
    };
    const els: El[] = [...axes(v(-ymax * KX - 0.2, 0), 2 * ymax * KX + 0.6, H + 0.4, "y (mm)", "I")];
    els.push(poly(curve(I, -ymax, ymax, 300, (y) => y * KX, (u) => u * H), { open: true, tone: "a", bold: true, smooth: true }));
    els.push(seg(v(-y1 * KX, -0.3), v(y1 * KX, -0.3), { tone: "c", bold: true }), txt(v(0, -0.45), `merkez genişliği ${nf(2 * y1, 1)} mm`, "s", { tone: "c", small: true, bold: true }));
    for (const s of [-1, 1]) els.push(...xtick(s * y1 * KX, 0, `${s < 0 ? "−" : ""}${nf(y1, 1)}`));
    els.push(...pad(-ymax * KX - 0.6, H + 0.8, ymax * KX + 1.6, -1.1));
    return { els, readout: [`y₁ = λL/a = 600×10⁻⁹ · 2 / ${nf(a, 2)}×10⁻³ = ${nf(y1, 2)} mm; merkez genişliği ${nf(2 * y1, 2)} mm.`, "Yan tepe yerleri tam yarım kat bağıntısıyla bulunmaz; karanlıklar a·sinθ = mλ koşulundandır."] };
  },
};

/* ===================== Atom modelleri ===================== */

const ZS = [
  { name: "H (Z = 1)", Z: 1 },
  { name: "He⁺ (Z = 2)", Z: 2 },
  { name: "Li²⁺ (Z = 3)", Z: 3 },
];
const levels: FigureDef = {
  caption:
    "Tek elektronlu sistemde Eₙ = −13,6 Z²/n² eV; sıfır, çekirdekten sonsuz uzakta durgun elektrondur. Sistemi seç: düzey çizgileri formülden konur (düşey ölçek her sistemde kendi temel düzeyine göre). −3,4 eV, −13,6 eV’den yüksektir; n büyüdükçe düzeyler sıfıra sıkışır.",
  alt: "Düşey enerji ekseninde sıfır çizgisi ve altında n = 1’den 5’e yatay düzey çizgileri; düzeyler yukarı doğru sıklaşıyor; solda n değerleri, sağda eV değerleri.",
  steps: ZS.map((z) => z.name),
  draw: (_v, step) => {
    const Z = ZS[step].Z, E1 = -13.6 * Z * Z, KY = 3.6 / -E1;
    const els: El[] = [seg(v(0, 0), v(3, 0), { tone: "muted", dash: true }), txt(v(3.15, 0), "0 eV (n = ∞)", "e", { tone: "muted", small: true })];
    for (let n = 1; n <= 5; n++) {
      const E = E1 / (n * n), y = E * KY;
      els.push(seg(v(0, y), v(3, y), { tone: n === 1 ? "a" : "ink", bold: n === 1 }));
      els.push(txt(v(-0.15, y), `n = ${n}`, "w", { tone: "ink", small: true, soft: n >= 4 }), txt(v(3.15, y), `${nf(E, 2)} eV`, "e", { tone: n === 1 ? "a" : "ink", small: true, soft: n >= 4 }));
    }
    els.push(...pad(-1.6, 0.4, 5.6, -3.9));
    return { els, readout: [`${ZS[step].name}: E₁ = ${nf(E1, 1)} eV, E₂ = ${nf(E1 / 4, 2)} eV, E₃ = ${nf(E1 / 9, 2)} eV; temelden iyonlaşma ${nf(-E1, 1)} eV.`, "Bohr modelinde K = −Eₙ, U = 2Eₙ: temel H’de K = 13,6 eV, U = −27,2 eV."] };
  },
};

const SER = [
  { name: "Lyman (son n = 1)", nl: 1 },
  { name: "Balmer (son n = 2)", nl: 2 },
  { name: "Paschen (son n = 3)", nl: 3 },
];
const series: FigureDef = {
  caption:
    "Hidrojen düzeyleri. Seriyi (son düzeyi) seç, üst düzeyi değiştir: foton enerjisi E = 13,6(1/n_son² − 1/n_üst²) eV, dalga boyu λ = hc/E ≈ 1240/E nm. Lyman morötesi, Paschen kızılötesi; Balmer’in bazı çizgileri görünür. Seri adı aynı enerjiyi değil aynı son düzeyi söyler.",
  alt: "Hidrojen enerji düzeyleri ve seçilen üst düzeyden son düzeye inen kalın geçiş oku; yanında foton enerjisi ve dalga boyu.",
  steps: SER.map((s) => s.name),
  param: { label: "Üst düzey: son + Δn", min: 1, max: 4, step: 1, init: 1, unit: "", plain: true },
  draw: (dn, step) => {
    const nl = SER[step].nl, nu = nl + dn, KY = 3.6 / 13.6;
    const E = 13.6 * (1 / (nl * nl) - 1 / (nu * nu)), lam = 1239.84 / E;
    const region = lam < 400 ? "morötesi" : lam <= 700 ? "görünür" : "kızılötesi";
    const els: El[] = [seg(v(0, 0), v(3, 0), { tone: "muted", dash: true })];
    for (let n = 1; n <= 7; n++) {
      const y = (-13.6 / (n * n)) * KY;
      els.push(seg(v(0, y), v(3, y), { tone: n === nl || n === nu ? "ink" : "muted", thin: n !== nl && n !== nu }));
      if (n <= 3 || n === nu) els.push(txt(v(-0.15, y), `n = ${n}`, "w", { tone: "ink", small: true, soft: n >= 4 }));
    }
    const yu = (-13.6 / (nu * nu)) * KY, yl = (-13.6 / (nl * nl)) * KY;
    els.push(vec(v(1.5, yu), v(1.5, yl), { tone: "a", bold: true }), txt(v(1.65, (yu + yl) / 2), `${nf(E, 2)} eV`, "e", { tone: "a", small: true, bold: true }));
    els.push(txt(v(3.15, yl), `λ ≈ ${nf(lam, 0)} nm (${region})`, "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-1.6, 0.4, 6.4, -3.9));
    return { els, readout: [`n = ${nu} → ${nl}: E = 13,6(1/${nl * nl} − 1/${nu * nu}) = ${nf(E, 2)} eV; λ = 1240/${nf(E, 2)} ≈ ${nf(lam, 0)} nm, ${region}.`, "Foton enerjisi pozitif farktır (−10,2 eV yazılmaz); en büyük fark en kısa dalga boyunu verir."] };
  },
};

/** İtici Coulomb alanında hız-Verlet ile yörünge; çekirdek orijinde, en yakın kafa kafaya uzaklık D = 1. */
function alphaPath(b: number): V[] {
  const kk = 0.5;
  let x = -7, y = b, vx = 1, vy = 0;
  const ps: V[] = [v(x, y)];
  const acc = (px: number, py: number): [number, number] => {
    const r = Math.hypot(px, py), f = kk / (r * r * r);
    return [f * px, f * py];
  };
  const dt = 0.02;
  let [ax, ay] = acc(x, y);
  for (let i = 0; i < 1400; i++) {
    x += vx * dt + 0.5 * ax * dt * dt;
    y += vy * dt + 0.5 * ay * dt * dt;
    const [nx, ny] = acc(x, y);
    vx += 0.5 * (ax + nx) * dt;
    vy += 0.5 * (ay + ny) * dt;
    [ax, ay] = [nx, ny];
    if (i % 4 === 0) ps.push(v(x, y));
    if (Math.abs(x) > 7 || Math.abs(y) > 4.5) break;
  }
  ps.push(v(x, y));
  return ps;
}
const BS = [0.15, 0.4, 0.8, 1.6, 2.8];
const rutherford: FigureDef = {
  caption:
    "Alfa parçacıkları pozitif çekirdeğin itme alanında (şema ölçekli değil). Yörüngeler Coulomb kuvvetiyle sayısal olarak çizildi; sapma açısı tan(θ/2) = D/(2b) bağıntısına uyar (D: kafa kafaya en yakın uzaklık, b: çarpma parametresi). Uzaktan geçenler az sapar; yalnız çekirdeğe çok yakın gelen azınlık büyük açıyla döner.",
  alt: "Soldan sağa paralel gelen beş alfa yörüngesi ve ortada küçük çekirdek; uzaktan geçen yörüngeler hafif bükülüyor, en yakından gelen neredeyse geri dönüyor.",
  draw: () => {
    const K = 0.42;
    const els: El[] = [ball(v(0, 0), 0.12, "warn"), txt(v(0, -0.2), "çekirdek", "s", { tone: "warn", small: true })];
    BS.forEach((b, i) => {
      const th = 2 * Math.atan(1 / (2 * b));
      els.push(poly(alphaPath(b).map((p) => v(p[0] * K, p[1] * K)), { open: true, tone: i === 0 ? "a" : "b", bold: i === 0, thin: i !== 0, smooth: true }));
      if (i === 0 || i === BS.length - 1) els.push(txt(v(-7 * K - 0.1, b * K), `θ = ${nf((th * 180) / Math.PI, 0)}°`, "w", { tone: i === 0 ? "a" : "b", small: true, bold: true }));
    });
    els.push(...pad(-7 * K - 1.6, 4.5 * K + 0.3, 7 * K + 0.3, -0.8));
    return { els, readout: [`b = ${BS.map((b) => nf(b, 2)).join("; ")} D için sapmalar ${BS.map((b) => nf((2 * Math.atan(1 / (2 * b)) * 180) / Math.PI, 0) + "°").join("; ")}.`, "Çoğunluğun az sapması atomun büyük bölümünün boş olduğunu, az sayıdaki büyük sapma küçük ve yoğun pozitif çekirdeği gösterir."] };
  },
};

const lineCount: FigureDef = {
  caption:
    "Atomlar en üst n düzeyine kadar uyarılabiliyor (aralıklar ölçekli değil). Çok atomda bütün düzey çiftleri ayrı çizgi verebilir: n(n − 1)/2. Tek atom bir düşüşte ancak bir zincir izler; en fazla n − 1 foton yayar. n’yi değiştir ve iki sayıyı karşılaştır.",
  alt: "Eşit aralıklı çizilmiş n düzey; ilk adımda her düzey çifti arasında aşağı yönlü geçiş okları, ikinci adımda tek atomun en üstten temel düzeye basamak basamak inen zinciri.",
  steps: ["Çok atom: bütün çiftler", "Tek atom: en uzun zincir"],
  param: { label: "En üst düzey n", min: 2, max: 6, step: 1, init: 4, unit: "", plain: true },
  draw: (n, step) => {
    const H = 0.7, W = 0.3 * ((n * (n - 1)) / 2) + 0.6;
    const els: El[] = [];
    for (let i = 1; i <= n; i++) els.push(seg(v(0, (i - 1) * H), v(W, (i - 1) * H), { tone: "ink" }), txt(v(-0.15, (i - 1) * H), `n = ${i}`, "w", { tone: "ink", small: true }));
    let col = 0;
    if (step === 0) {
      for (let hi = n; hi >= 2; hi--)
        for (let lo = hi - 1; lo >= 1; lo--) {
          const x = 0.45 + col * 0.3;
          els.push(vec(v(x, (hi - 1) * H), v(x, (lo - 1) * H), { tone: "a" }));
          col++;
        }
    } else
      for (let hi = n; hi >= 2; hi--) {
        const x = 0.45 + (n - hi) * 0.5;
        els.push(vec(v(x, (hi - 1) * H), v(x, (hi - 2) * H), { tone: "b", bold: true }));
      }
    els.push(...pad(-1.4, (n - 1) * H + 0.4, 3.4 * 0.3 * 5 + 0.8, -0.4));
    return { els, readout: [`n = ${n}: farklı çizgi üst sınırı ${n}·${n - 1}/2 = ${(n * (n - 1)) / 2}; tek atomun tek düşüşte yayabileceği en fazla foton ${n - 1}.`, "Çizgi çeşitliliği ile tek bir atomun yaydığı foton sayısı farklı sorulardır."] };
  },
};

export const physicsFigures058Waves: Record<string, Record<string, FigureDef>> = {
  "su-dalgalarinda-girisim": {
    "Dalga boyu yol farkını faza çevirir": pathPhase,
    "Gerçek girişim çizgileri hiperboldür": hyperbolas,
    "λ/4 aralığı nerede geçerlidir?": quarter,
    "Toplam genliği cebirle hesapla": amplitude,
  },
  "isik-teorileri": {
    "Saçak aralığını geometriyle üret": young,
    "Saçak sırası ile aralık sayısını ayır": orders,
    "Optik yol ve saydam levha": plate,
    "Tek yarığın minimumlarını çift yarıktan ayır": singleSlit,
  },
  "atom-modelleri-fizik": {
    "Rutherford saçılmasını iki gözlemle yorumla": rutherford,
    "Enerji ölçeğini negatif sayılarla oku": levels,
    "Bir atom, çok atom ve tayf çizgisi sayısı": lineCount,
    "Hidrojen serilerini son düzeyle tanı": series,
  },
};
