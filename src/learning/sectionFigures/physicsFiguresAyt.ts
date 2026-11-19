import { ang, ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

/*
 * AYT Fizik. Uniform circular motion with tangent velocity and inward
 * acceleration, simple harmonic motion as the shadow of circular motion with
 * its x–t trace, Lenz's law for a magnet approaching and leaving a coil, the
 * photoelectric Kmax–f line for two metals, and the radius of a charge
 * entering a magnetic field. Readouts carry the unit cancellation (e.g.
 * kg·m/s² = N) so dimensions are checked, not memorised. Values are teaching
 * examples; drawings are not to scale unless stated.
 */

const TAU = Math.PI * 2;
const deg = (a: number) => (a * Math.PI) / 180;

/* ---------- 1. Düzgün çembersel hareket ---------- */
const circular: FigureDef = {
  caption:
    "Sürgüyle cismi çember üzerinde ilerlet (r = 2 m, v = 4 m/s). Hız oku her an çembere teğettir, yönü sürekli değişir; büyüklüğü sabittir. İvme her an merkeze bakar: a = v²/r = 8 m/s². Merkezcil kuvvet yeni bir kuvvet değildir; ip gerilmesi, sürtünme ya da çekim gibi gerçek kuvvetlerin merkeze bakan toplamıdır.",
  alt: "Merkezi işaretli çember; üzerinde hareket eden top, topa teğet mavi hız oku ve merkeze bakan kırmızı ivme oku; merkezden topa yarıçap çizgisi ve açı yayı.",
  param: { label: "Açı θ", min: 0, max: 360, step: 15, init: 45, unit: "°", playMs: 6000 },
  draw: (a) => {
    const r = 2.2;
    const P: V = v(r * Math.cos(deg(a)), r * Math.sin(deg(a)));
    const t: V = v(-Math.sin(deg(a)), Math.cos(deg(a)));
    const els: El[] = [circle(v(0, 0), r, { tone: "muted", dash: true, thin: true }), ball(v(0, 0), 0.07, "ink"), seg(v(0, 0), P, { tone: "muted", thin: true })];
    if (a > 0 && a < 360) els.push(ang(v(0, 0), v(1, 0), P, undefined, { tone: "muted", r: 24 }));
    els.push(vec(P, v(P[0] + t[0] * 1.4, P[1] + t[1] * 1.4), { tone: "b", bold: true }), vec(P, v(P[0] * 0.55, P[1] * 0.55), { tone: "warn", bold: true }));
    els.push(ball(P, 0.16, "a"));
    els.push(txt(v(P[0] + t[0] * 1.45, P[1] + t[1] * 1.45), "v", Math.cos(deg(a)) > 0 ? "ne" : "nw", { tone: "b", bold: true }), txt(v(P[0] * 0.6 - t[0] * 0.3, P[1] * 0.6 - t[1] * 0.3), "a", "c", { tone: "warn", bold: true }));
    els.push(txt(v(-3.2, 3.4), " ", "c"), txt(v(3.2, -3.0), " ", "c"));
    return {
      els,
      readout: [
        `θ = ${a}° · a = v² / r = (4 m/s)² / 2 m = 8 m/s²  ·  birim: (m²/s²) / m = m/s²`,
        "1 kg kütle için gereken net merkezcil kuvvet F = m·a = 8 kg·m/s² = 8 N. Sürat sabitken iş yapılmaz: kuvvet hıza diktir.",
      ],
    };
  },
};

/* ---------- 2. BHH: çembersel hareketin izdüşümü ---------- */
const shm: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet. Çember üzerinde düzgün dönen noktanın yatay eksene izdüşümü basit harmonik hareket yapar: x = A·cos(ωt). Sağdaki grafik aynı izdüşümün zamana göre izidir. Uçlarda (x = ±A) hız sıfır, ivme en büyük; denge noktasında (x = 0) hız en büyük, ivme sıfırdır.",
  alt: "Solda referans çemberi ve dönen nokta, noktadan yatay eksene inen kesik çizgi ve eksendeki izdüşüm topu; sağda x–t grafiği, şimdiki zamana kadar çizilmiş kosinüs eğrisi.",
  param: { label: "Zaman (periyodun kesri)", min: 0, max: 1, step: 0.0625, init: 0.125, playMs: 5000 },
  draw: (f) => {
    const A = 1.6;
    const th = TAU * f;
    const P: V = v(A * Math.cos(th), A * Math.sin(th));
    const els: El[] = [circle(v(0, 0), A, { tone: "muted", dash: true, thin: true }), seg(v(-2.1, 0), v(2.1, 0), { tone: "ink", thin: true })];
    els.push(seg(P, v(P[0], 0), { tone: "muted", dash: true, thin: true }), ball(P, 0.12, "muted"), ball(v(P[0], 0), 0.16, "c"));
    for (const x of [-A, 0, A]) els.push(seg(v(x, -0.12), v(x, 0.12), { tone: "ink", thin: true }));
    els.push(txt(v(-A, -0.15), "−A", "s", { tone: "muted", small: true }), txt(v(A, -0.15), "+A", "s", { tone: "muted", small: true }), txt(v(0, -0.15), "0", "s", { tone: "muted", small: true }));
    // x–t graph on the right; time runs downward from the circle's level? Keep it horizontal.
    const gx = 3.0;
    const W = 4.2;
    els.push(vec(v(gx, 0), v(gx + W + 0.3, 0), { tone: "ink" }), vec(v(gx, -A - 0.3), v(gx, A + 0.4), { tone: "ink" }));
    els.push(txt(v(gx + W + 0.3, 0), "t", "se", { tone: "ink", small: true }), txt(v(gx, A + 0.4), "x", "nw", { tone: "ink", small: true }));
    const full: V[] = Array.from({ length: 81 }, (_, i) => v(gx + (i / 80) * W, A * Math.cos((TAU * i) / 80)));
    els.push(poly(full, { tone: "muted", open: true, thin: true, dash: true, smooth: true }));
    const n = Math.max(1, Math.round(f * 80));
    els.push(poly(full.slice(0, n + 1), { tone: "c", open: true, bold: true, smooth: true }), ball(v(gx + f * W, A * Math.cos(th)), 0.12, "c"));
    els.push(seg(v(P[0], 0), v(gx + f * W, A * Math.cos(th)), { tone: "c", thin: true, dash: true }));
    els.push(txt(v(-2.4, 2.2), " ", "c"), txt(v(gx + W + 0.8, -2.2), " ", "c"));
    const x = A * Math.cos(th);
    const atEnd = Math.abs(Math.abs(x) - A) < 1e-6;
    const atMid = Math.abs(x) < 1e-6;
    return {
      els,
      readout: [
        `x = A·cos(2π·${fmt(f, 4)}) = ${fmt(x / A, 3)}·A${atEnd ? " · uç nokta: v = 0, |a| en büyük" : atMid ? " · denge: |v| en büyük, a = 0" : ""}`,
        "ω = 2π/T (rad/s); vmax = A·ω (m · 1/s = m/s); amax = A·ω² (m/s²). Yay için T = 2π√(m/k): √(kg / (N/m)) = √(kg·m / (kg·m/s²)) = s.",
      ],
    };
  },
};

/* ---------- 3. Lenz yasası ---------- */
const lenz: FigureDef = {
  caption:
    "İleri ile mıknatısın bobine yaklaşmasını ve uzaklaşmasını izle. İndüklenen akım, alanın kendisine değil akının değişimine karşı koyar. N kutbu yaklaşınca bobinin o ucu N olur ve mıknatısı iter; N kutbu uzaklaşınca o uç S olur ve mıknatısı geri çeker. Mıknatıs dururken akı değişmez, akım yoktur.",
  alt: "Solda çubuk mıknatıs (N kutbu bobine dönük), sağda sarımlı bobin ve ampermetre. Adımlara göre mıknatısın hareket oku, bobinin yakın ucunda oluşan N ya da S harfi ve sarımlardaki akım yön okları gösterilir.",
  steps: ["Yaklaşıyor", "Duruyor", "Uzaklaşıyor"],
  draw: (_v, step) => {
    const els: El[] = [];
    const mx = step === 0 ? -2.6 : step === 1 ? -2.0 : -3.2;
    els.push(poly([v(mx - 1.6, -0.35), v(mx - 0.8, -0.35), v(mx - 0.8, 0.35), v(mx - 1.6, 0.35)], { tone: "b", fill: "b" }), poly([v(mx - 0.8, -0.35), v(mx, -0.35), v(mx, 0.35), v(mx - 0.8, 0.35)], { tone: "warn", fill: "warn" }));
    els.push(txt(v(mx - 1.2, 0), "S", "c", { tone: "ink", bold: true }), txt(v(mx - 0.4, 0), "N", "c", { tone: "ink", bold: true }));
    if (step !== 1) els.push(vec(v(mx - 0.8, 0.75), v(mx - 0.8 + (step === 0 ? 0.9 : -0.9), 0.75), { tone: "ink", bold: true }), txt(v(mx - 0.8, 0.95), step === 0 ? "yaklaşır" : "uzaklaşır", "n", { tone: "ink", small: true }));
    // Coil: loops drawn as ellipses.
    for (let i = 0; i < 6; i++) {
      const cx = 0.4 + i * 0.42;
      const loop: V[] = Array.from({ length: 25 }, (_, k) => v(cx + 0.14 * Math.cos((TAU * k) / 24), 0.7 * Math.sin((TAU * k) / 24)));
      els.push(poly(loop, { tone: "a", thin: true, smooth: true }));
    }
    els.push(seg(v(0.4, -0.7), v(0.4, -1.5), { tone: "a", thin: true }), seg(v(2.5, -0.7), v(2.5, -1.5), { tone: "a", thin: true }), seg(v(0.4, -1.5), v(1.15, -1.5), { tone: "a", thin: true }), seg(v(1.75, -1.5), v(2.5, -1.5), { tone: "a", thin: true }));
    els.push(circle(v(1.45, -1.5), 0.3, { tone: "ink" }), txt(v(1.45, -1.5), "A", "c", { tone: "ink", small: true, bold: true }));
    if (step !== 1) {
      const pole = step === 0 ? "N" : "S";
      els.push(txt(v(0.15, 0.95), pole, "n", { tone: step === 0 ? "warn" : "b", bold: true }));
      const dir = step === 0 ? 1 : -1;
      els.push(vec(v(1.45 - 0.5 * dir, -1.85), v(1.45 + 0.5 * dir, -1.85), { tone: "c", bold: true }), txt(v(1.45, -2.0), "indüklenen akım", "s", { tone: "c", small: true }));
    } else els.push(txt(v(1.45, -2.0), "akım yok", "s", { tone: "muted", small: true }));
    els.push(txt(v(-5.0, 1.6), " ", "c"), txt(v(3.4, -2.8), " ", "c"));
    const rows: [string, string][] = [
      ["N yaklaşıyor: bobindeki akı artıyor. Akım, yakın uçta N kutbu oluşturur ve mıknatısı iter.", "Lenz: indüklenen akım nedenine (akı artışına) karşı koyar. Mıknatısı itmek için dış iş gerekir: enerji korunumu."],
      ["Mıknatıs duruyor: akı sabit, ε = −ΔΦ/Δt = 0, akım yok.", "Güçlü bir mıknatıs olması yetmez; belirleyici olan akının değişimidir."],
      ["N uzaklaşıyor: akı azalıyor. Akım yönü tersine döner; yakın uç S olur ve mıknatısı geri çeker.", "ε = −N·ΔΦ/Δt; birim: Wb/s = T·m²/s = V."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Fotoelektrik: Kmax–f ---------- */
const H_EV = 4.14e-15; // eV·s
const photo: FigureDef = {
  caption:
    "Sürgüyle ışığın frekansını değiştir. Einstein: Kmax = h·f − W. İki metal aynı eğimli (h) paralel doğrular çizer; doğrunun frekans eksenini kestiği yer eşik frekansıdır (f₀ = W/h). Eşiğin altında ışık ne kadar şiddetli olursa olsun elektron sökülmez; şiddet yalnız sökülen elektron sayısını (akımı) değiştirir.",
  alt: "Yatay eksende frekans, düşey eksende en büyük kinetik enerji; iki paralel doğru (W = 2,0 eV ve W = 3,0 eV) frekans eksenini farklı eşiklerde keser; sürgüyle hareket eden dikey çizgi ve doğrular üzerindeki noktalar.",
  param: { label: "Frekans f", min: 3, max: 12, step: 0.5, init: 8, unit: " ×10¹⁴ Hz" },
  draw: (f14) => {
    const X = (f: number) => f * 0.5;
    const Y = (k: number) => k * 1.1;
    const metals = [
      { W: 2.0, name: "W = 2,0 eV", tone: "b" as const },
      { W: 3.0, name: "W = 3,0 eV", tone: "warn" as const },
    ];
    const els: El[] = [vec(v(0, 0), v(X(13), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(3.4)), { tone: "ink" })];
    els.push(txt(v(X(13), 0), "f (×10¹⁴ Hz)", "se", { tone: "ink", small: true }), txt(v(0, Y(3.4)), "Kmax (eV)", "n", { tone: "ink", small: true }));
    for (const g of [4, 8, 12]) els.push(seg(v(X(g), -0.08), v(X(g), 0.08), { tone: "muted", thin: true }), txt(v(X(g), -0.1), String(g), "s", { tone: "muted", small: true, soft: true }));
    for (const k of [1, 2, 3]) els.push(seg(v(-0.08, Y(k)), v(0.08, Y(k)), { tone: "muted", thin: true }), txt(v(-0.1, Y(k)), String(k), "w", { tone: "muted", small: true, soft: true }));
    const f = f14 * 1e14;
    const rows: string[] = [];
    for (const m of metals) {
      const f0 = m.W / H_EV / 1e14;
      const f1 = 12.5;
      els.push(seg(v(X(f0), 0), v(X(f1), Y(H_EV * f1 * 1e14 - m.W)), { tone: m.tone, bold: true }), ball(v(X(f0), 0), 0.09, m.tone));
      els.push(txt(v(X(f1), Y(H_EV * f1 * 1e14 - m.W)), m.name, "e", { tone: m.tone, small: true, bold: true }));
      const K = H_EV * f - m.W;
      if (K > 0) els.push(ball(v(X(f14), Y(K)), 0.11, m.tone));
      rows.push(K > 0 ? `${m.name}: Kmax = ${fmt(H_EV * f, 2)} − ${fmt(m.W, 1)} = ${fmt(K, 2)} eV` : `${m.name}: eşik altında (f₀ ≈ ${fmt(f0, 2)}), elektron yok`);
    }
    els.push(seg(v(X(f14), 0), v(X(f14), Y(3.2)), { tone: "muted", dash: true, thin: true }));
    els.push(txt(v(-1.2, Y(3.6)), " ", "c"), txt(v(X(13) + 2.6, -0.9), " ", "c"));
    return {
      els,
      readout: [rows.join(" · "), "h·f: (eV·s)·(1/s) = eV. Eğim h her metalde aynıdır; şiddet doğruyu kaydırmaz, yalnız akımı artırır."],
    };
  },
};

/* ---------- 5. Manyetik alanda dairesel yörünge ---------- */
const radius: FigureDef = {
  caption:
    "Sürgüyle yüklü parçacığın süratini değiştir (m = 2×10⁻²⁶ kg, q = 1,6×10⁻¹⁹ C, B = 0,5 T; alan sayfa düzleminden içeri). Manyetik kuvvet hıza dik olduğu için yalnız yönü değiştirir: q·v·B = m·v²/r → r = m·v / (q·B). Sürat artınca yarıçap aynı oranda büyür, dönme süresi T = 2πm/(qB) ise süratten bağımsızdır.",
  alt: "Sayfadan içeri bakan alanı gösteren çarpı işaretleri ızgarası; alana dik giren pozitif parçacığın yarım çember yörüngesi, hız oku ve merkeze bakan kuvvet oku; sürgüyle yarıçap değişir.",
  param: { label: "Sürat v", min: 1, max: 6, step: 0.5, init: 3, unit: " ×10⁵ m/s" },
  draw: (v5) => {
    const m = 2e-26;
    const q = 1.6e-19;
    const B = 0.5;
    const vel = v5 * 1e5;
    const r = (m * vel) / (q * B); // metres
    const R = r * 20; // drawing scale (units per metre)
    const els: El[] = [];
    for (let i = -1; i <= 3; i++) for (let j = 0; j <= 6; j++) els.push(txt(v(i * 1.0, j * 1.0 - 0.2), "×", "c", { tone: "muted", small: true, soft: true }));
    const arc: V[] = Array.from({ length: 41 }, (_, k) => {
      const t = Math.PI * (k / 40);
      return v(R * Math.sin(t), R - R * Math.cos(t));
    });
    els.push(seg(v(-1.5, 0), v(0, 0), { tone: "a", dash: true }), poly(arc, { tone: "a", open: true, bold: true, smooth: true }));
    els.push(ball(v(0, 0), 0.14, "warn"), vec(v(0, 0), v(0.9, 0), { tone: "b", bold: true }), vec(v(0, 0), v(0, 0.8), { tone: "warn", bold: true }));
    els.push(txt(v(0.95, 0), "v", "e", { tone: "b", bold: true }), txt(v(0, 0.85), "F", "n", { tone: "warn", bold: true }));
    els.push(seg(v(0, R), v(R, R), { tone: "muted", thin: true, dash: true }), txt(v(R + 0.1, R), `r = ${fmt(r * 100, 2)} cm`, "e", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-2.2, 6.6), " ", "c"), txt(v(6.2, -0.8), " ", "c"));
    return {
      els,
      readout: [
        `r = m·v/(q·B) = (2×10⁻²⁶ · ${fmt(v5, 1)}×10⁵) / (1,6×10⁻¹⁹ · 0,5) = ${fmt(r * 100, 2)} cm`,
        "Birim: kg·(m/s) / (C·T); T = N/(A·m) = kg/(C·s) → kg·m/s / (C·kg/(C·s)) = m. Kuvvet hıza dik: sürat ve kinetik enerji değişmez.",
      ],
    };
  },
};

/* ---------- Eğik atış: tamamlayıcı açılar ---------- */
const projectileAngles: FigureDef = {
  caption:
    "Sürgüyle atış açısını değiştir (v₀ = 20 m/s, g = 10 m/s², hava direnci yok, atış ve iniş aynı seviyede). Kesik eğri tamamlayıcı açının (90° − θ) yörüngesidir: menziller eşit, tepe ve uçuş süresi farklı. En büyük menzil 45°'te 40 m. Tepede yalnız düşey hız sıfırdır; yatay hız v₀cosθ sürer.",
  alt: "Yatay zemin üzerinde iki parabol: seçilen açının yörüngesi ve tamamlayıcı açının kesik yörüngesi; ikisi aynı noktaya düşer. Seçilen yörüngenin tepesinde yatay hız oku.",
  param: { label: "Atış açısı θ", min: 15, max: 75, step: 5, init: 30, unit: "°" },
  draw: (deg) => {
    const g = 10;
    const v0 = 20;
    const k = 0.17;
    const path = (a: number): V[] => {
      const r = (a * Math.PI) / 180;
      const T = (2 * v0 * Math.sin(r)) / g;
      return Array.from({ length: 41 }, (_, i) => {
        const t = (T * i) / 40;
        return v(v0 * Math.cos(r) * t * k, (v0 * Math.sin(r) * t - (g * t * t) / 2) * k);
      });
    };
    const r = (deg * Math.PI) / 180;
    const R = (v0 * v0 * Math.sin(2 * r)) / g;
    const T = (2 * v0 * Math.sin(r)) / g;
    const H = (v0 * Math.sin(r)) ** 2 / (2 * g);
    const vx = v0 * Math.cos(r);
    const els: El[] = [seg(v(-0.3, 0), v(42 * k, 0), { tone: "ink" })];
    if (deg !== 45) els.push(poly(path(90 - deg), { tone: "muted", open: true, dash: true, smooth: true }));
    els.push(poly(path(deg), { tone: "c", open: true, bold: true, smooth: true }));
    els.push(vec(v(0, 0), v(v0 * Math.cos(r) * 0.08, v0 * Math.sin(r) * 0.08), { tone: "a", bold: true }));
    els.push(txt(v(v0 * Math.cos(r) * 0.08, v0 * Math.sin(r) * 0.08), "v₀", "ne", { tone: "a", small: true, bold: true }));
    const top = v((R / 2) * k, H * k);
    els.push(vec(top, v(top[0] + vx * 0.06, top[1]), { tone: "warn", bold: true }), ball(top, 0.08, "warn"));
    els.push(txt(v(top[0] + vx * 0.06, top[1]), "vₓ", "e", { tone: "warn", small: true, bold: true }));
    els.push(ball(v(R * k, 0), 0.08, "c"), txt(v(R * k, 0), `R = ${fmt(R, 1)} m`, "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-1.0, 3.9), " ", "c"), txt(v(42 * k + 1.0, -0.9), " ", "c"));
    return {
      els,
      readout: [
        `θ = ${deg}°: vₓ = 20·cos${deg}° = ${fmt(vx, 1)} m/s, v₀y = ${fmt(v0 * Math.sin(r), 1)} m/s · T = 2v₀y/g = ${fmt(T, 2)} s · H = v₀y²/2g = ${fmt(H, 1)} m · R = vₓ·T = ${fmt(R, 1)} m`,
        deg === 45
          ? "45°: aynı seviyede en büyük menzil u²/g = 40 m. Birim: (m/s)² ÷ (m/s²) = m."
          : `${90 - deg}° ile aynı menzil, farklı tepe (${fmt((v0 * Math.cos(r)) ** 2 / (2 * g), 1)} m) ve süre. Farklı iniş seviyesinde bu eşitlik ve 45° kuralı geçerli değil.`,
      ],
    };
  },
};

export const physicsFiguresAyt: Record<string, Record<string, FigureDef>> = {
  "egik-atis": { "45° ve tamamlayıcı açılar nerede geçerli?": projectileAngles },
  "cembersel-hareket": { "İvme içe bakar, büyüklüğü sabit olabilir": circular },
  "basit-harmonik-hareket": { "Çembersel hareketin izdüşümü": shm },
  "elektromanyetik-induksiyon": { "Lenz yasası alanı değil değişimi karşılar": lenz },
  "fotoelektrik-olay": { "Kmax-f grafiği": photo },
  "manyetik-kuvvet": { "Dik girişte çemberin yarıçapını kur": radius },
};
