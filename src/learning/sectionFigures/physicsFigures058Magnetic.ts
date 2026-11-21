import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge058) · Akımın manyetik alanı ve alternatif akım.
 * μ₀ = 4π×10⁻⁷ T·m/A (K = 10⁻⁷). Alan okları, dalga eğrileri ve fazör
 * okları aynı hesaptan çizilir; AC örneklerinde tepe değerleri ve eleman
 * değerleri açıkça seçilmiş öğretim örnekleridir.
 */

const TAU = Math.PI * 2;
const MU0 = 4 * Math.PI * 1e-7;

/** Sayfaya dik akım/alan simgesi: ⊙ dışarı (nokta), ⊗ içeri (çarpı). */
function perp(p: V, out: boolean, r: number, tone: Tone): El[] {
  const els: El[] = [circle(p, r, { tone, bold: true })];
  if (out) els.push(circle(p, r * 0.22, { tone, fill: tone }));
  else {
    const d = r * 0.62;
    els.push(seg(v(p[0] - d, p[1] - d), v(p[0] + d, p[1] + d), { tone, bold: true }), seg(v(p[0] - d, p[1] + d), v(p[0] + d, p[1] - d), { tone, bold: true }));
  }
  return els;
}

/* ===================== Manyetik alan ===================== */

const rightHand: FigureDef = {
  caption:
    "Uzun düz tel sayfaya dik. Akım dışarı (⊙) iken alan çizgileri tel merkezli çemberlerdir ve saatin tersine dolaşır: sağdaki noktada B yukarı, soldakinde aşağı. Akımı içeri (⊗) çevirince bütün yönler ters döner. Alan radyal değildir; her noktada çembere teğettir. Şema ölçekli değil.",
  alt: "Ortada sayfaya dik tel simgesi, çevresinde iki eş merkezli kesikli çember ve çember üzerinde teğet yön okları; sağ ve sol noktalarda kalın B okları.",
  steps: ["Akım dışarı (⊙)", "Akım içeri (⊗)"],
  draw: (_v, step) => {
    const out = step === 0, sgn = out ? 1 : -1;
    const els: El[] = [...perp(v(0, 0), out, 0.28, "a")];
    for (const r of [1.2, 2.2]) {
      els.push(circle(v(0, 0), r, { tone: "muted", dash: true, thin: true }));
      for (const a0 of [45, 135, 225, 315]) {
        const a = (a0 * Math.PI) / 180, p = v(r * Math.cos(a), r * Math.sin(a)), t = v(-Math.sin(a) * sgn, Math.cos(a) * sgn);
        els.push(vec(v(p[0] - t[0] * 0.25, p[1] - t[1] * 0.25), v(p[0] + t[0] * 0.25, p[1] + t[1] * 0.25), { tone: "c" }));
      }
    }
    els.push(ball(v(2.2, 0), 0.08, "ink"), vec(v(2.2, 0), v(2.2, 1.0 * sgn), { tone: "b", bold: true }), txt(v(2.35, 0.5 * sgn), out ? "B yukarı" : "B aşağı", "e", { tone: "b", small: true, bold: true }));
    els.push(ball(v(-2.2, 0), 0.08, "ink"), vec(v(-2.2, 0), v(-2.2, -1.0 * sgn), { tone: "b", bold: true }), txt(v(-2.35, -0.5 * sgn), out ? "B aşağı" : "B yukarı", "w", { tone: "b", small: true, bold: true }));
    els.push(txt(v(0, -0.45), out ? "I dışarı" : "I içeri", "s", { tone: "a", small: true, bold: true }));
    els.push(...pad(-4.0, 2.6, 4.0, -2.6));
    return { els, readout: [out ? "+z akım: dolaşım saatin tersine (sağ elin başparmağı okuyucuya)." : "−z akım: dolaşım saat yönünde; aynı noktadaki B tersine döner.", "B, telden noktaya giden yarıçapa diktir: radyal dışarı değil, çembere teğet."] };
  },
};

const inverseR: FigureDef = {
  caption:
    "5 A akımlı uzun tel. Uzaklığı değiştir: B = 2K·I/r = 2×10⁻⁷·5/r tesla. 0,10 m’de 10 μT. r iki katına çıkınca B yarıya iner; kesikli eğri ters kare (1/r²) olsaydı ne olacağını gösterir: o elektrik alanın noktasal kaynak bağıdır.",
  alt: "Yatay eksende uzaklık, düşey eksende manyetik alan; 1/r biçiminde azalan eğri, karşılaştırma için daha hızlı düşen kesikli 1/r² eğrisi ve seçili noktada işaret.",
  param: { label: "Uzaklık r", min: 0.05, max: 0.3, step: 0.05, init: 0.1, unit: " m" },
  draw: (r) => {
    const KX = 14, KY = 0.13, X = (s: number) => s * KX, Y = (b: number) => b * KY;
    const B = (s: number) => (2e-7 * 5) / s / 1e-6;
    const els: El[] = [...axes(v(0, 0), 0.32 * KX, 22 * KY, "r (m)", "B (μT)")];
    els.push(poly(curve(B, 0.05, 0.3, 60, X, Y), { open: true, tone: "b", bold: true, smooth: true }));
    els.push(poly(curve((s) => 10 * (0.1 / s) ** 2, 0.0675, 0.3, 60, X, Y), { open: true, tone: "muted", dash: true, smooth: true }), txt(v(X(0.3) + 0.1, Y(10 * (0.1 / 0.3) ** 2)), "1/r² olsaydı", "e", { tone: "muted", small: true }));
    for (const s of [0.1, 0.2, 0.3]) els.push(...xtick(X(s), 0, nf(s)));
    els.push(...ytick(0, Y(10), "10"), ...ytick(0, Y(20), "20"));
    const p = v(X(r), Y(B(r)));
    els.push(seg(v(X(r), 0), p, { tone: "muted", thin: true, dash: true }), ball(p, 0.08, "b"), txt(v(p[0] + 0.12, p[1] + 0.08), `${nf(B(r), 2)} μT`, "ne", { tone: "b", small: true, bold: true }));
    els.push(...pad(-0.9, 22 * KY + 0.5, X(0.32) + 2.0, -0.5));
    return { els, readout: [`B = 2×10⁻⁷ · 5 / ${nf(r)} = ${nf(B(r), 2)} μT.`, "r = 0’da ince tel modeli tekildir; gerçek telin yarıçapı gerekir."] };
  },
};

const twoWires: FigureDef = {
  caption:
    "İki uzun tel x = ±0,10 m’de, her biri 5 A. Gözlem noktasını teller arasında kaydır; her telin alanı ayrı bulunur, sonra toplanır. Akımlar aynı yöndeyse ortada alanlar zıt olup birbirini götürür; zıt yöndeyse aynı yönde toplanır (orta noktada 20 μT).",
  alt: "Yatay eksende iki tel simgesi ve aralarındaki gözlem noktası; noktada her telden gelen düşey alan okları ve altında net alan oku.",
  steps: ["Aynı yön (⊙ ⊙)", "Zıt yön (⊙ ⊗)"],
  param: { label: "Nokta x", min: -0.06, max: 0.06, step: 0.02, init: 0, unit: " m" },
  draw: (x, step) => {
    const K = 20, S = 0.07, I1 = 5, I2 = step === 0 ? 5 : -5;
    const b = (I: number, x0: number) => (2e-7 * I) / (x - x0) / 1e-6;
    const B1 = b(I1, -0.1), B2 = b(I2, 0.1), Bn = B1 + B2, P = v(x * K, 0);
    const els: El[] = [seg(v(-2.6, 0), v(2.6, 0), { tone: "muted", thin: true }), ...perp(v(-2, 0), true, 0.22, "a"), ...perp(v(2, 0), I2 > 0, 0.22, "a")];
    els.push(ball(P, 0.07, "ink"));
    els.push(vec(v(P[0] - 0.2, 0), v(P[0] - 0.2, B1 * S), { tone: "b", bold: true }), vec(v(P[0] + 0.2, 0), v(P[0] + 0.2, B2 * S), { tone: "c", bold: true }));
    els.push(txt(v(P[0] - 0.3, B1 * S), `B₁ = ${nf(Math.abs(B1), 1)}`, "w", { tone: "b", small: true }), txt(v(P[0] + 0.3, B2 * S), `B₂ = ${nf(Math.abs(B2), 1)}`, "e", { tone: "c", small: true }));
    els.push(txt(v(0, -2.0), Math.abs(Bn) < 1e-6 ? "B_net = 0" : `B_net = ${nf(Math.abs(Bn), 1)} μT ${Bn > 0 ? "yukarı" : "aşağı"}`, "c", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-2, -0.4), "5 A", "s", { tone: "a", small: true }), txt(v(2, -0.4), "5 A", "s", { tone: "a", small: true }));
    els.push(...pad(-3.0, 2.0, 3.0, -2.4));
    return { els, readout: [`B₁ = 2×10⁻⁷·5/${nf(x + 0.1)} = ${nf(B1, 1)} μT, B₂ = ${nf(B2, 1)} μT (yukarı +); net ${nf(Bn, 1)} μT.`, "Her telin katkısını noktaya göre gerçek konumla bul; akım işaretlerini cebirsel toplamak yön vermez."] };
  },
};

const arc: FigureDef = {
  caption:
    "Yarıçap 0,10 m, akım 5 A. Tam halkanın merkezinde B = μ₀I/(2R) ≈ 31,4 μT. Yay açısını değiştir: α derecelik yayın merkez katkısı tam halkanın α/360’ıdır. Akım saatin tersine dolaştığından merkezdeki B sayfadan dışarıdır (⊙).",
  alt: "Kesikli tam çember üzerinde seçilen açı kadar kalın akım yayı ve ucunda yön oku; merkezde sayfadan dışarı alan simgesi ve değeri.",
  param: { label: "Yay açısı α", min: 30, max: 360, step: 30, init: 180, unit: "°", plain: true },
  draw: (al) => {
    const R = 2, Bfull = (MU0 * 5) / (2 * 0.1) / 1e-6, B = (Bfull * al) / 360;
    const els: El[] = [circle(v(0, 0), R, { tone: "muted", dash: true, thin: true })];
    const ps: V[] = [];
    for (let i = 0; i <= 60; i++) {
      const a = ((al * i) / 60) * (Math.PI / 180);
      ps.push(v(R * Math.cos(a), R * Math.sin(a)));
    }
    els.push(poly(ps, { open: true, tone: "a", bold: true }));
    const e = (al * Math.PI) / 180, m = e - 0.25;
    els.push(vec(v(R * Math.cos(m), R * Math.sin(m)), v(R * Math.cos(e), R * Math.sin(e)), { tone: "a", bold: true }));
    els.push(...perp(v(0, 0), true, 0.2, "b"), txt(v(0, -0.35), `B = ${nf(B, 2)} μT`, "s", { tone: "b", small: true, bold: true }));
    els.push(txt(v(R + 0.15, -0.2), "I = 5 A", "e", { tone: "a", small: true }));
    els.push(...pad(-2.8, 2.6, 3.8, -2.6));
    return { els, readout: [`B = (${al}/360)·31,42 = ${nf(B, 2)} μT.`, "Bu yalnız yay parçasının katkısıdır; devrenin diğer telleri ayrıca hesaplanır."] };
  },
};

const solenoid: FigureDef = {
  caption:
    "Uzun bobin: N = 500 sarım, I = 2 A. Sarılı uzunluğu değiştir: B ≈ μ₀(N/L)I. Aynı N ve I’de L iki katına çıkınca sarımlar seyrelir ve iç alan yarıya iner. Çizimde sarımların temsilî bir kısmı görünür; iç oklar uçlardan uzak düzgün bölgeyi gösterir.",
  alt: "Yatay bobin: seçilen uzunluk boyunca dizilmiş sarım halkaları ve içinde sağa yönlü paralel alan okları; altında alan değeri.",
  param: { label: "Uzunluk L", min: 0.1, max: 0.5, step: 0.1, init: 0.2, unit: " m" },
  draw: (L) => {
    const K = 10, W = L * K, n = 12, B = (MU0 * (500 / L) * 2) / 1e-3;
    const els: El[] = [];
    for (let i = 0; i < n; i++) {
      const cx = (W * (i + 0.5)) / n;
      const loop: V[] = Array.from({ length: 25 }, (_, j) => v(cx + 0.1 * Math.cos((TAU * j) / 24), 0.8 * Math.sin((TAU * j) / 24)));
      els.push(poly(loop, { tone: "a", thin: true, smooth: true }));
    }
    for (const y of [-0.35, 0.35]) els.push(vec(v(0.1, y), v(W - 0.1, y), { tone: "c" }));
    els.push(seg(v(0, -1.1), v(W, -1.1), { tone: "muted", thin: true }), txt(v(W / 2, -1.25), `L = ${nf(L, 1)} m`, "s", { tone: "muted", small: true }));
    els.push(txt(v(W + 0.2, 0), `B = ${nf(B, 2)} mT`, "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-0.4, 1.2, 5 + 2.4, -1.8));
    return { els, readout: [`N/L = 500/${nf(L, 1)} = ${nf(500 / L, 0)} sarım/m; B = 4π×10⁻⁷ · ${nf(500 / L, 0)} · 2 = ${nf(B, 2)} mT.`, "Bobin yarıçapı bu formülde L’nin yerine geçmez; halka merkezindeki 1/R bağı ayrı bir geometridir."] };
  },
};

/* ===================== Alternatif akım ===================== */

const period: FigureDef = {
  caption:
    "Örnek kaynak: tepe değeri 10 V. Frekansı değiştir: T = 1/f, ω = 2πf. 50 Hz’de T = 0,020 s ve ω = 100π rad/s. Pencere hep 0,04 s; yüksek frekansta aynı sürede daha çok tekrar sığar. İşaret yarım periyotta tersine döner, tam tekrar bir T ister.",
  alt: "Zaman ekseninde 0 ile 0,04 saniye arasında sinüs biçimli gerilim eğrisi; bir periyotluk aralık işaretli.",
  param: { label: "Frekans f", min: 25, max: 100, step: 25, init: 50, unit: " Hz", plain: true },
  draw: (f) => {
    const KX = 110, KY = 0.14, X = (t: number) => t * KX, Y = (u: number) => u * KY, T = 1 / f;
    const els: El[] = [...axes(v(0, 0), 0.042 * KX + 0.3, 11 * KY, "t (s)", "v (V)", 11 * KY)];
    els.push(poly(curve((t) => 10 * Math.sin(TAU * f * t), 0, 0.04, 160, X, Y), { open: true, tone: "a", bold: true, smooth: true }));
    els.push(...xtick(X(0.02), 0, "0,02"), ...xtick(X(0.04), 0, "0,04"), ...ytick(0, Y(10), "10"), ...ytick(0, Y(-10), "−10"));
    const yb = -12.5 * KY;
    els.push(seg(v(0, yb), v(X(T), yb), { tone: "c", bold: true }), seg(v(0, yb - 0.1), v(0, yb + 0.1), { tone: "c" }), seg(v(X(T), yb - 0.1), v(X(T), yb + 0.1), { tone: "c" }));
    els.push(txt(v(X(T) + 0.12, yb), `T = ${nf(T, 3)} s`, "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-0.9, 11 * KY + 0.5, X(0.042) + 1.0, yb - 0.4));
    return { els, readout: [`f = ${f} Hz: T = 1/${f} = ${nf(T, 3)} s, ω = 2π·${f} = ${nf(TAU * f, 1)} rad/s.`, "Pozitif tepe bir periyotta bir kez, |v| tepesi iki kez görülür."] };
  },
};

const rms: FigureDef = {
  caption:
    "Örnek: tepe akımı 2 A. Üstte i(t), altta i²(t). İmzalı akımın ortalaması 0 olsa da i² hiç negatif olmaz; ortalaması tepe²/2 = 2 A²’dir. Etkin değer bunun karekökü: 2/√2 ≈ 1,41 A. Aynı dirençte aynı ısıyı bu sabit akım üretir.",
  alt: "Üst grafikte bir periyotluk sinüs akımı ve 1,41 A’de kesikli etkin değer çizgisi; alt grafikte her yerde pozitif olan akımın karesi ve 2 A²’de kesikli ortalama çizgisi.",
  draw: () => {
    const KX = 4, KY = 0.4, X = (t: number) => t * KX, top = 2.2;
    const els: El[] = [...axes(v(0, top), 1.05 * KX + 0.3, 2.4 * KY, "t", "i (A)", 2.4 * KY)];
    els.push(poly(curve((t) => 2 * Math.sin(TAU * t), 0, 1, 80, X, (u) => top + u * KY), { open: true, tone: "a", bold: true, smooth: true }));
    els.push(seg(v(0, top + Math.SQRT2 * KY), v(X(1), top + Math.SQRT2 * KY), { tone: "c", dash: true }), txt(v(X(1) + 0.1, top + Math.SQRT2 * KY), "I_etkin ≈ 1,41 A", "e", { tone: "c", small: true, bold: true }));
    els.push(...ytick(0, top + 2 * KY, "2"));
    const K2 = 0.3;
    els.push(...axes(v(0, -1.6), 1.05 * KX + 0.3, 4.4 * K2, "t", "i² (A²)"));
    els.push(poly(curve((t) => 4 * Math.sin(TAU * t) ** 2, 0, 1, 80, X, (u) => -1.6 + u * K2), { open: true, tone: "warn", bold: true, smooth: true }));
    els.push(seg(v(0, -1.6 + 2 * K2), v(X(1), -1.6 + 2 * K2), { tone: "c", dash: true }), txt(v(X(1) + 0.1, -1.6 + 2 * K2), "ortalama 2 A²", "e", { tone: "c", small: true, bold: true }));
    els.push(...ytick(0, -1.6 + 4 * K2, "4"));
    els.push(...pad(-0.8, top + 2.4 * KY + 0.5, X(1) + 2.6, -1.9));
    return { els, readout: ["⟨i²⟩ = I_tepe²/2 = 2 A² ⇒ I_etkin = √2 ≈ 1,41 A; dirençte P = I_etkin²R.", "√2 kuralı sinüs içindir; genel tanım karelerin ortalamasının kareköküdür."] };
  },
};

const PH = [
  { name: "Direnç", shift: 0, line: "R: akım ve gerilim aynı fazda; tepeler aynı anda." },
  { name: "Bobin", shift: Math.PI / 2, line: "L: gerilim akımdan 90° (T/4) önde; v = L·di/dt, akım en hızlı değişirken v en büyük." },
  { name: "Sığaç", shift: -Math.PI / 2, line: "C: akım gerilimden 90° önde; i = C·dv/dt, v tepedeyken i = 0." },
];
const phase: FigureDef = {
  caption:
    "Aynı sinüs akımı üç ideal elemandan geçiyor. Elemanı seç: dirençte gerilim akımla aynı fazda; bobinde gerilim çeyrek periyot önde; sığaçta çeyrek periyot geride. Noktalar ilk tepeleri işaretler: hangisinin önce geldiği fazı gösterir.",
  alt: "Bir buçuk periyotluk zaman ekseninde akım ve gerilim eğrileri; seçilen elemana göre gerilim eğrisi akıma göre kaydırılmış, ilk tepe noktaları işaretli.",
  steps: PH.map((p) => p.name),
  draw: (_v, step) => {
    const KX = 3.2, X = (t: number) => t * KX, sh = PH[step].shift;
    const iF = (t: number) => Math.sin(TAU * t), vF = (t: number) => 1.5 * Math.sin(TAU * t + sh);
    const els: El[] = [...axes(v(0, 0), 1.25 * KX + 0.3, 1.8, "t", "i, v", 1.8)];
    els.push(poly(curve(iF, 0, 1.25, 100, X, (u) => u), { open: true, tone: "b", bold: true, smooth: true }), poly(curve(vF, 0, 1.25, 100, X, (u) => u), { open: true, tone: "a", bold: true, smooth: true }));
    const tPi = 0.25, tPv = (((0.25 - sh / TAU) % 1) + 1) % 1;
    els.push(ball(v(X(tPi), 1), 0.08, "b"), ball(v(X(tPv), 1.5), 0.08, "a"));
    els.push(txt(v(X(tPi) - 0.15, 1), "i", "w", { tone: "b", small: true, bold: true }), txt(v(X(tPv) + 0.15, 1.5), "v", "e", { tone: "a", small: true, bold: true }));
    els.push(...pad(-0.6, 2.3, X(1.25) + 1.0, -2.0));
    return { els, readout: [PH[step].line, "Reaktans: XL = ωL frekansla artar, XC = 1/(ωC) frekansla azalır; ideal L ve C ortalama güç tüketmez."] };
  },
};

const phasor: FigureDef = {
  caption:
    "Seri RLC örneği: R = 30 Ω, XL = 60 Ω, kaynak 100 V etkin; XC’yi değiştir. Akım ortaktır ve yatay referanstır: VR akımla aynı, VL 90° yukarı, VC 90° aşağı. Kaynak gerilimi VR ile (VL − VC)’nin bileşkesidir: V = √(VR² + (VL − VC)²).",
  alt: "Fazör diyagramı: yatay VR oku, yukarı VL ve aşağı VC okları, ucunda net reaktif bileşen ve başlangıçtan uca kaynak gerilimi oku, faz açısı.",
  param: { label: "XC", min: 0, max: 100, step: 10, init: 20, unit: " Ω", plain: true },
  draw: (XC) => {
    const R = 30, XL = 60, V = 100, Z = Math.hypot(R, XL - XC), I = V / Z, S = 0.032;
    const VR = I * R, VL = I * XL, VC = I * XC, phi = (Math.atan2(XL - XC, R) * 180) / Math.PI;
    const O = v(0, 0), A = v(VR * S, 0), T = v(VR * S, (VL - VC) * S);
    const els: El[] = [vec(O, A, { tone: "b", bold: true }), txt(v(A[0] / 2, -0.15), `VR = ${nf(VR, 1)}`, "s", { tone: "b", small: true, bold: true })];
    els.push(vec(A, v(A[0], VL * S), { tone: "a" }), txt(v(A[0] + 0.12, VL * S), `VL = ${nf(VL, 1)}`, "e", { tone: "a", small: true }));
    if (VC > 0.01) els.push(vec(v(A[0] + 0.35, 0), v(A[0] + 0.35, -VC * S), { tone: "c" }), txt(v(A[0] + 0.47, -VC * S), `VC = ${nf(VC, 1)}`, "e", { tone: "c", small: true }));
    els.push(vec(O, T, { tone: "warn", bold: true }), txt(v(T[0] / 2 - 0.15, T[1] / 2 + (T[1] >= 0 ? 0.15 : -0.15)), `V = 100`, T[1] >= 0 ? "nw" : "sw", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-1.8, 4.6, 5.0, -6.6));
    return {
      els,
      readout: [`Z = √(30² + (60 − ${XC})²) = ${nf(Z, 1)} Ω, I = 100/${nf(Z, 1)} = ${nf(I, 2)} A; φ = ${nf(phi, 1)}° ${XL > XC ? "(gerilim önde: indüktif)" : XL < XC ? "(akım önde: kapasitif)" : "(rezonans)"}.`, `Skaler toplam VR + VL + VC = ${nf(VR + VL + VC, 1)} V olurdu; kaynak 100 V’tur. Gerçek güç P = I²R = ${nf(I * I * R, 1)} W.`],
    };
  },
};

const resonance: FigureDef = {
  caption:
    "Seri RLC örneği: R = 30 Ω, L = 0,1 H, C = 100 μF, kaynak 100 V etkin. Frekansı değiştir: XL artar, XC azalır. XL = XC olduğunda (f₀ = 1/(2π√LC) ≈ 50,3 Hz) Z = R en küçük, akım en büyük: 100/30 ≈ 3,33 A. Rezonansı geçince akım yeniden azalır.",
  alt: "Yatay eksende frekans, düşey eksende etkin akım; f₀ civarında tepe yapan rezonans eğrisi, tepe noktasında kesikli çizgi ve seçili frekanstaki nokta.",
  param: { label: "Frekans f", min: 10, max: 150, step: 10, init: 30, unit: " Hz", plain: true },
  draw: (f) => {
    const R = 30, L = 0.1, C = 1e-4, V = 100;
    const I = (fr: number) => {
      const w = TAU * fr;
      return V / Math.hypot(R, w * L - 1 / (w * C));
    };
    const f0 = 1 / (TAU * Math.sqrt(L * C));
    const KX = 0.03, KY = 0.8, X = (s: number) => s * KX, Y = (i: number) => i * KY;
    const els: El[] = [...axes(v(0, 0), 155 * KX + 0.3, 3.8 * KY, "f (Hz)", "I (A)")];
    els.push(poly(curve(I, 5, 150, 120, X, Y), { open: true, tone: "a", bold: true, smooth: true }));
    els.push(seg(v(X(f0), 0), v(X(f0), Y(I(f0))), { tone: "muted", dash: true, thin: true }), ...xtick(X(f0), 0, "f₀"), ...xtick(X(100), 0, "100"), ...xtick(X(150), 0, "150"));
    els.push(...ytick(0, Y(V / R), "3,33"));
    const p = v(X(f), Y(I(f)));
    els.push(ball(p, 0.08, "a"), txt(v(p[0] + 0.12, p[1] + 0.1), `${nf(I(f), 2)} A`, "ne", { tone: "a", small: true, bold: true }));
    els.push(...pad(-1.0, 3.8 * KY + 0.5, X(155) + 1.0, -0.5));
    const w = TAU * f;
    return { els, readout: [`f = ${f} Hz: XL = ${nf(w * L, 1)} Ω, XC = ${nf(1 / (w * C), 1)} Ω, I = ${nf(I(f), 2)} A.`, `f₀ = 1/(2π√(0,1·10⁻⁴)) = ${nf(f0, 1)} Hz; orada bobin ve sığaç gerilimleri sıfır değil, eşit ve zıt fazlıdır.`] };
  },
};

export const physicsFigures058Magnetic: Record<string, Record<string, FigureDef>> = {
  "manyetik-alan-ayt": {
    "Düz tel çevresindeki alan sağ elle bulunur": rightHand,
    "Düz telin büyüklüğü ters birinci uzaklıktır": inverseR,
    "Alanları aynı noktada vektörel topla": twoWires,
    "Yay açısı katkının kesrini belirler": arc,
    "Bobinde sarım yoğunluğu alanı güçlendirir": solenoid,
  },
  "alternatif-akim": {
    "Periyot, frekans ve açısal frekans": period,
    "Etkin değer aynı ısıl etkiyi karşılaştırır": rms,
    "Bobin akımın değişimine karşı gerilim ister": phase,
    "Empedansın büyüklüğü ve fazı birlikte gerekir": phasor,
    "Rezonans hangi devrede akımı büyütür?": resonance,
  },
};
