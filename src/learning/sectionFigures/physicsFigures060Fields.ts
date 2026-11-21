import { ang, ball, circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge060) · Newton genel çekim, transformatörler, elektriksel
 * kuvvet ve su dalgalarında kırınım. Eğriler rehberdeki bağıntılardan
 * (F ∝ 1/r², g = g₀r/R, VS/VP = NS/NP, F = kq₁q₂/r², |sinβ/β|) hesaplanır.
 * Rehberin sayı vermediği yerlerde seçilen örnek figür yazısında söylenir.
 */

const R = (d: number) => (d * Math.PI) / 180;

/* ===================== Newton genel çekim ===================== */

const inverseSquare: FigureDef = {
  caption:
    "Kütleler sabit; uzaklık ilk değerin katı olarak, kuvvet ilk değerin kesri olarak. Uzaklığı değiştir: F/F₀ = (r₀/r)²; 2 katta 1/4, 3 katta 1/9. Eğri doğru da parabol de değildir; sonlu uzaklıkta sıfır olmaz, yalnız sıfıra yaklaşır.",
  alt: "Yatay eksende r/r₀, düşey eksende F/F₀; 1’den başlayıp hızla azalan ters kare eğrisi, 2 ve 3 katta işaretli noktalar ve seçili nokta.",
  param: { label: "r / r₀", min: 1, max: 5, step: 0.5, init: 2 },
  draw: (r) => {
    const X = (x: number) => (x - 1) * 1.9 + 0.4, Y = (f: number) => f * 3.4, F = (x: number) => 1 / (x * x);
    const els: El[] = [...axes(v(0, 0), 8.4, 3.9, "r / r₀", "F / F₀")];
    els.push(poly(curve(F, 1, 5, 80, X, Y), { open: true, tone: "a", bold: true }));
    for (const x of [1, 2, 3, 4, 5]) els.push(...xtick(X(x), 0, String(x)));
    els.push(...ytick(0, Y(1), "1"), ...ytick(0, Y(0.25), "1/4"));
    for (const x of [2, 3]) els.push(pt(v(X(x), Y(F(x))), undefined, "ne", "muted", true));
    els.push(pt(v(X(r), Y(F(r))), `${nf(F(r), 3)}`, "ne", "a"));
    els.push(...pad(-1.0, 4.3, 9.4, -0.8));
    return { els, readout: [`r = ${nf(r, 1)}r₀ ⇒ F = F₀/${nf(r * r, 2)} = ${nf(F(r), 3)}F₀.`, "Bir kütle iki katına çıkarsa aynı uzaklıkta kuvvet de iki katına çıkar: oranlar çarpılır."] };
  },
};

const insideSphere: FigureDef = {
  caption:
    "Özkütlesi sabit ideal küre (gerçek katmanlı Dünya değil). Konumu değiştir: içeride yalnız iç kütle M(r/R)³ etkili, g = g₀·r/R doğrusal; dışarıda g = g₀(R/r)². Merkezde 0, yüzeyde g₀; iki dal yüzeyde birleşir. h = R yüksekliğinde (r = 2R) g₀/4.",
  alt: "Yatay eksende r/R, düşey eksende g/g₀; 0’dan yüzeye doğrusal artan, yüzeyden sonra ters kare ile azalan eğri; küre içi bölge gölgeli.",
  param: { label: "r / R", min: 0, max: 3, step: 0.25, init: 0.5 },
  draw: (r) => {
    const X = (x: number) => x * 2.6, Y = (g: number) => g * 3.2, g = (x: number) => (x <= 1 ? x : 1 / (x * x));
    const els: El[] = [box(0, 0, X(1), Y(1.15), "c"), ...axes(v(0, 0), 8.3, 3.9, "r / R", "g / g₀")];
    els.push(txt(v(X(0.5), Y(1.08)), "küre içi", "c", { tone: "ink", small: true }));
    els.push(poly(curve(g, 0, 1, 10, X, Y), { open: true, tone: "a", bold: true }), poly(curve(g, 1, 3, 60, X, Y), { open: true, tone: "a", bold: true }));
    for (const x of [1, 2, 3]) els.push(...xtick(X(x), 0, String(x)));
    els.push(...ytick(0, Y(1), "1"), ...ytick(0, Y(0.25), "1/4"));
    els.push(pt(v(X(r), Y(g(r))), `${nf(g(r), 3)}`, r < 1 ? "nw" : "ne", "a"));
    els.push(...pad(-0.9, 4.3, 9.2, -0.8));
    return { els, readout: [r <= 1 ? `İçeride: g = g₀·${nf(r, 2)} = ${nf(g(r), 3)}g₀ (iç kütle oranı ${nf(r ** 3, 3)}).` : `Dışarıda: g = g₀/${nf(r * r, 3)} = ${nf(g(r), 3)}g₀.`, "İçerideki doğrusal dal yalnız homojen dağılıma aittir."] };
  },
};

const orbitEnergy: FigureDef = {
  caption:
    "Dairesel yörünge; enerji birimi GMm/R₀, uzaklık R₀’ın katı (sıfır sonsuzda). Yarıçapı değiştir: K = 1/(2r), U = −1/r, E = −1/(2r). U negatif, |U| = 2K; toplam negatif: bağlı yörünge. Bağlanmayı çözmek için gereken en küçük ek enerji −E’dir.",
  alt: "Sıfır çizgisinin üstünde kinetik enerji çubuğu, altında daha uzun potansiyel enerji çubuğu ve yarısı kadar toplam enerji çubuğu; çubuk boyları seçili yarıçapa göre.",
  param: { label: "Yörünge yarıçapı r", min: 1, max: 4, step: 0.25, init: 1, unit: " R₀" },
  draw: (r) => {
    const K = 1 / (2 * r), U = -1 / r, E = -1 / (2 * r), S = 2.6;
    const bars: { x: number; val: number; tone: Tone; name: string }[] = [
      { x: 0, val: K, tone: "a", name: "K" },
      { x: 1.8, val: U, tone: "b", name: "U" },
      { x: 3.6, val: E, tone: "warn", name: "E" },
    ];
    const els: El[] = [seg(v(-0.5, 0), v(5.4, 0), { tone: "ink", thin: true })];
    for (const b of bars) {
      els.push(box(b.x, 0, b.x + 1.0, b.val * S, b.tone));
      els.push(txt(v(b.x + 0.5, b.val > 0 ? b.val * S + 0.12 : b.val * S - 0.12), `${b.name} = ${nf(b.val, 3)}`, b.val > 0 ? "n" : "s", { tone: b.tone, small: true, bold: true }));
    }
    els.push(txt(v(5.5, 0), "0", "e", { tone: "muted", small: true }));
    els.push(...pad(-0.7, 1.9, 6.2, -3.4));
    return { els, readout: [`r = ${nf(r, 2)}R₀: K = ${nf(K, 3)}, U = ${nf(U, 3)}, E = ${nf(E, 3)} (GMm/R₀).`, `Gereken en küçük ek enerji −E = ${nf(-E, 3)}; |U| = 2K = ${nf(2 * K, 3)}.`] };
  },
};

const escape: FigureDef = {
  caption:
    "Gezegenin merkezinden r₀ uzaklıkta yarıçapa dik fırlatma, yalnız çekim etkili (ölçekli şema, gezegen yarıçapı 0,45 r₀). Sürati dairesel süratin katı olarak değiştir: 1’de çember, 1 ile √2 arasında elips, √2 ≈ 1,41 ve üstünde dönmeyen yol (parabol/hiperbol); küçük süratte elips gezegene çarpabilir. Kurtulma sürati = √2 × dairesel sürat.",
  alt: "Ortada gezegen, sağında fırlatma noktası ve yukarı hız oku; seçili sürate göre çember, elips, gezegene çarpan yay ya da açılıp giden yörünge eğrisi.",
  param: { label: "Sürat / dairesel sürat", min: 0.6, max: 1.6, step: 0.05, init: 1.2 },
  draw: (k) => {
    const Rp = 0.45, S = 1.1, k2 = k * k;
    const pts: V[] = [];
    let hit = false;
    for (let i = 0; i <= 240; i++) {
      const phi = (i / 240) * 2 * Math.PI, den = 1 + (k2 - 1) * Math.cos(phi);
      if (den <= 0.03) break;
      const r = k2 / den;
      if (r > 4.2) break;
      if (r < Rp) { hit = true; break; }
      pts.push(v(r * Math.cos(phi) * S, r * Math.sin(phi) * S));
    }
    const kind = hit ? "gezegene çarpar" : k < 0.999 ? "elips (fırlatma noktası en uzak)" : Math.abs(k - 1) < 0.01 ? "çember" : k < Math.SQRT2 ? "elips (fırlatma noktası en yakın)" : "kurtulur (dönmez)";
    const els: El[] = [circle(v(0, 0), Rp * S, { tone: "c", fill: "c" }), poly(pts, { open: true, tone: "a", bold: true })];
    els.push(ball(v(S, 0), 0.08, "ink"), vec(v(S, 0), v(S, k * 0.8), { tone: "warn", bold: true }), txt(v(S + 0.12, k * 0.8), `${nf(k, 2)} × dairesel`, "e", { tone: "warn", small: true, bold: true }));
    els.push(circle(v(0, 0), S, { tone: "muted", dash: true, thin: true }));
    els.push(...pad(-4.8, 3.2, 4.8, -3.2));
    return { els, readout: [`Sürat = ${nf(k, 2)} × dairesel: ${kind}.`, `Toplam enerji işareti: ${k2 < 2 ? "negatif (bağlı)" : "sıfır ya da pozitif (bağlı değil)"}; eşik √2 ≈ 1,41 × dairesel.`] };
  },
};

/* ===================== Transformatör ===================== */

function coil(x: number, y0: number, y1: number, n: number, tone: Tone): El[] {
  const els: El[] = [];
  const h = (y1 - y0) / n;
  for (let i = 0; i < n; i++) {
    const a = y0 + i * h;
    els.push(poly([v(x - 0.35, a), v(x + 0.35, a + h * 0.5), v(x - 0.35, a + h)], { open: true, tone, thin: false }));
  }
  return els;
}

const loadChain: FigureDef = {
  caption:
    "İdeal trafo: NP = 400, VP = 120 V (etkin), sekonderde RY = 30 Ω. Sekonder sarımını değiştir: VS = 120·NS/400, IS = VS/RY, P = VS²/RY, IP = P/VP. NS = 100’de 30 V, 1 A, 30 W, 0,25 A. Aynı yükle NS iki katı ⇒ VS iki, güç dört katı; ek enerji kaynaktan gelir. Çizilen sarım sayısı oranla ölçeklidir.",
  alt: "Kare demir çekirdek; sol kolunda birincil sargı ve kaynak uçları, sağ kolunda sayısı değişen ikincil sargı ve uçlarına bağlı direnç.",
  param: { label: "NS", min: 50, max: 800, step: 50, init: 100, plain: true },
  draw: (NS) => {
    const VP = 120, NP = 400, RY = 30, VS = (VP * NS) / NP, IS = VS / RY, P = (VS * VS) / RY, IP = P / VP;
    const els: El[] = [box(-1.6, -1.6, 1.6, 1.6, "muted"), box(-1.0, -1.0, 1.0, 1.0, "muted")];
    els.push(...coil(-1.3, -1.2, 1.2, 8, "a"), ...coil(1.3, -1.2, 1.2, Math.max(1, Math.round(NS / 50)), "b"));
    els.push(seg(v(-1.65, 1.2), v(-2.6, 1.2), { tone: "a", thin: true }), seg(v(-1.65, -1.2), v(-2.6, -1.2), { tone: "a", thin: true }));
    els.push(txt(v(-2.7, 0), "VP = 120 V", "w", { tone: "a", small: true, bold: true }), txt(v(-2.7, -0.45), `IP = ${nf(IP, 3)} A`, "w", { tone: "a", small: true }));
    els.push(seg(v(1.65, 1.2), v(2.8, 1.2), { tone: "b", thin: true }), seg(v(1.65, -1.2), v(2.8, -1.2), { tone: "b", thin: true }));
    els.push(poly([v(2.8, 1.2), v(2.8, 0.7), v(2.6, 0.55), v(3.0, 0.35), v(2.6, 0.15), v(3.0, -0.05), v(2.6, -0.25), v(3.0, -0.45), v(2.8, -0.6), v(2.8, -1.2)], { open: true, tone: "ink" }));
    els.push(txt(v(3.15, 0.1), "30 Ω", "e", { tone: "ink", small: true }), txt(v(3.15, 0.7), `VS = ${nf(VS, 1)} V`, "e", { tone: "b", small: true, bold: true }), txt(v(3.15, -0.55), `IS = ${nf(IS, 2)} A`, "e", { tone: "b", small: true }));
    els.push(txt(v(-1.3, 1.85), "NP = 400", "n", { tone: "a", small: true }), txt(v(1.3, 1.85), `NS = ${NS}`, "n", { tone: "b", small: true }));
    els.push(...pad(-5.6, 2.6, 6.0, -1.9));
    return { els, readout: [`VS = 120·${NS}/400 = ${nf(VS, 1)} V; IS = ${nf(VS, 1)}/30 = ${nf(IS, 3)} A; P = ${nf(P, 1)} W.`, `IP = ${nf(P, 1)}/120 = ${nf(IP, 3)} A; IS/IP = ${nf(IS / IP, 2)} = NP/NS.`] };
  },
};

const emfRatio: FigureDef = {
  caption:
    "İdeal ortak akı: iki sargıdan aynı Φ(t) geçer (kesikli). ε = −N·dΦ/dt olduğundan emk’ler akının değişim hızıyla aynı anda tepe yapar; büyüklükleri sarım sayısıyla orantılıdır. Örnek NP = 400, NS = 100: εS/εP = 1/4, frekans aynı. Düşey eksen normalize, ölçekli değil.",
  alt: "Ortak zaman ekseninde kesikli akı eğrisi; ondan çeyrek periyot kaymış büyük genlikli birincil emk eğrisi ve aynı fazda dört kat küçük genlikli ikincil emk eğrisi.",
  draw: () => {
    const X1 = 8, k = (2 * Math.PI) / 4;
    const els: El[] = [vec(v(0, 0), v(X1 + 0.4, 0), { tone: "ink", thin: true }), txt(v(X1 + 0.5, 0), "t", "e", { tone: "ink", small: true })];
    els.push(poly(curve((t) => Math.sin(k * t), 0, X1, 80, (t) => t, (y) => y * 1.0), { open: true, tone: "muted", dash: true }));
    els.push(poly(curve((t) => -Math.cos(k * t), 0, X1, 80, (t) => t, (y) => y * 1.8), { open: true, tone: "a", bold: true }));
    els.push(poly(curve((t) => -Math.cos(k * t), 0, X1, 80, (t) => t, (y) => y * 0.45), { open: true, tone: "b", bold: true }));
    els.push(txt(v(2.0, 1.95), "εP (400 sarım)", "n", { tone: "a", small: true, bold: true }), txt(v(4.0, -0.6), "εS (100)", "s", { tone: "b", small: true, bold: true }), txt(v(5.0, 1.1), "Φ", "n", { tone: "muted", small: true }));
    els.push(...pad(-0.4, 2.6, 9.6, -2.2));
    return { els, readout: ["εP/εS = NP/NS = 400/100 = 4; 120 V girişte ideal çıkış 30 V.", "Sarım oranı frekansı çarpmaz: iki emk aynı periyotla salınır."] };
  },
};

const transmission: FigureDef = {
  caption:
    "Örnek hat: taşınan güç P = 100 kW (güç faktörü 1), hattın toplam direnci 10 Ω. Hat gerilimini değiştir: I = P/V, kayıp I²R. Gerilim iki katına çıkınca akım yarıya, kayıp dörtte bire iner. Bu, P ve hat sabitken yapılan bir kıyastır.",
  alt: "Yatay eksende kilovolt hat gerilimi, düşey eksende kilowatt ısıl kayıp; hızla azalan ters kare eğrisi, seçili nokta ve iki katı gerilimdeki açık nokta.",
  param: { label: "Hat gerilimi V", min: 5, max: 50, step: 5, init: 10, unit: " kV", plain: true },
  draw: (V) => {
    const P = 100, Rh = 10, I = (kV: number) => P / kV, loss = (kV: number) => (I(kV) ** 2 * Rh) / 1000;
    const X = (kV: number) => kV / 6.5, Y = (kw: number) => kw * 0.9;
    const els: El[] = [...axes(v(0, 0), 8.4, 3.9, "V (kV)", "kayıp (kW)")];
    els.push(poly(curve(loss, 5, 50, 90, X, Y), { open: true, tone: "a", bold: true }));
    els.push(pt(v(X(V), Y(loss(V))), `${nf(loss(V) * 1000, 0)} W`, V <= 10 ? "e" : "ne", "a"));
    if (2 * V <= 50) els.push(pt(v(X(2 * V), Y(loss(2 * V))), `2V: ${nf(loss(2 * V) * 1000, 0)} W`, "n", "b", true));
    for (const kV of [10, 20, 50]) els.push(...xtick(X(kV), 0, String(kV)));
    els.push(...ytick(0, Y(1), "1"), ...ytick(0, Y(4), "4"));
    els.push(...pad(-0.9, 4.3, 9.4, -0.8));
    return { els, readout: [`I = 100 kW / ${V} kV = ${nf(I(V), 2)} A; kayıp = ${nf(I(V), 2)}²·10 = ${nf(loss(V) * 1000, 1)} W.`, `Kayıp oranı: %${nf((loss(V) / P) * 100, 2)} (taşınan güce göre).`] };
  },
};

const cascade: FigureDef = {
  caption:
    "İki ideal-oranlı trafo ardışık: önce NS/NP = 3, sonra 1/6. Gerilim oranları çarpılır: 3·(1/6) = 1/2, 120 V → 360 V → 60 V. Örnek: her kademenin verimi %80 ve giriş 100 W seçildi; verimler de çarpılır: 0,8·0,8 = 0,64 ⇒ 64 W (yüzde 160 değil).",
  alt: "Soldan sağa üç gerilim kutusu ve aralarında iki trafo kutusu; üstte gerilimler, altta güç değerleri ve kademe verimleri.",
  draw: () => {
    const els: El[] = [];
    const node = (x: number, top: string, bottom: string, tone: Tone) => {
      els.push(box(x - 0.8, -0.45, x + 0.8, 0.45, tone), txt(v(x, 0), top, "c", { tone: "ink", small: true, bold: true }), txt(v(x, -0.6), bottom, "s", { tone: "muted", small: true }));
    };
    const tr = (x: number, ratio: string) => {
      els.push(vec(v(x - 1.3, 0), v(x - 0.5, 0), { tone: "muted", thin: true }), vec(v(x + 0.5, 0), v(x + 1.3, 0), { tone: "muted", thin: true }));
      els.push(circle(v(x - 0.15, 0), 0.3, { tone: "ink" }), circle(v(x + 0.15, 0), 0.3, { tone: "ink" }), txt(v(x, 0.5), ratio, "n", { tone: "ink", small: true, bold: true }), txt(v(x, -0.5), "η = %80", "s", { tone: "warn", small: true }));
    };
    node(0, "120 V", "100 W", "a");
    tr(2.1, "×3");
    node(4.2, "360 V", "80 W", "b");
    tr(6.3, "×1/6");
    node(8.4, "60 V", "64 W", "c");
    els.push(...pad(-1.0, 1.2, 9.4, -1.3));
    return { els, readout: ["Gerilim: 120·3·(1/6) = 60 V (toplam oran 1/2).", "Güç: 100·0,8·0,8 = 64 W; toplam verim %64."] };
  },
};

/* ===================== Elektriksel kuvvet ===================== */

const coulombR: FigureDef = {
  caption:
    "Örnek: q₁ = q₂ = 1 μC, k = 9×10⁹ N·m²/C². Uzaklığı santimetre olarak değiştir: önce metreye çevir, sonra kare al. F = 9×10⁹·10⁻¹²/r² = 0,009/r² N; 30 cm = 0,30 m’de 0,09 m² ⇒ 0,1 N. Uzaklık iki katı ⇒ kuvvet dörtte bir (açık nokta).",
  alt: "Yatay eksende santimetre uzaklık, düşey eksende newton kuvvet; azalan ters kare eğrisi, seçili nokta ve iki katı uzaklıkta açık nokta.",
  param: { label: "Uzaklık r", min: 10, max: 30, step: 2.5, init: 15, unit: " cm" },
  draw: (rc) => {
    const F = (cm: number) => 0.009 / (cm / 100) ** 2, X = (cm: number) => cm / 7.5, Y = (f: number) => f * 4;
    const els: El[] = [...axes(v(0, 0), 8.6, 4.0, "r (cm)", "F (N)")];
    els.push(poly(curve(F, 10, 62, 80, X, Y), { open: true, tone: "a", bold: true }));
    els.push(pt(v(X(rc), Y(F(rc))), `${nf(F(rc), 3)} N`, "ne", "a"), pt(v(X(2 * rc), Y(F(2 * rc))), `2r: ${nf(F(2 * rc), 3)}`, "n", "b", true));
    for (const cm of [10, 30, 60]) els.push(...xtick(X(cm), 0, String(cm)));
    els.push(...ytick(0, Y(0.1), "0,1"), ...ytick(0, Y(0.9), "0,9"));
    els.push(...pad(-1.0, 4.3, 9.6, -0.8));
    return { els, readout: [`r = ${nf(rc, 1)} cm = ${nf(rc / 100, 3)} m; r² = ${nf((rc / 100) ** 2, 4)} m²; F = ${nf(F(rc), 4)} N.`, `2r = ${nf(2 * rc, 1)} cm’de ${nf(F(2 * rc), 4)} N = F/4.`] };
  },
};

const targetSum: FigureDef = {
  caption:
    "Hedef yük H (+) ve iki eşit büyüklüklü kaynak, 1 ve 2 (+), her biri H’ye F büyüklüğünde itme uygular. Yalnız H’ye gelen kuvvetler çizilir; kaynakların birbirine kuvveti H’nin toplamına girmez. Dik iki eşit kuvvetin toplamı √2F, zıt iki eşit kuvvetin toplamı 0’dır: aynı büyüklükler, farklı net etki.",
  alt: "Ortada hedef yük; birinci adımda solda ve altta iki kaynak, hedefte sağa ve yukarı iki eşit ok ve köşegen net ok; ikinci adımda solda ve sağda iki kaynak, hedefte zıt yönlü iki eşit ok.",
  steps: ["Dik iki eşit kuvvet", "Zıt iki eşit kuvvet"],
  draw: (_, step) => {
    const F = 1.6, H = v(0, 0);
    const srcA = v(-2.4, 0), srcB = step === 0 ? v(0, -2.4) : v(2.4, 0);
    const fA = v(F, 0), fB = step === 0 ? v(0, F) : v(-F, 0);
    const els: El[] = [];
    for (const [s, name] of [[srcA, "1 (+)"], [srcB, "2 (+)"]] as const) els.push(circle(s, 0.28, { tone: "b", fill: "b" }), txt(v(s[0], s[1] - 0.45), name, "s", { tone: "b", small: true, bold: true }));
    els.push(circle(H, 0.24, { tone: "a", fill: "a" }), txt(v(-0.3, 0.35), "H (+)", "nw", { tone: "a", small: true, bold: true }));
    els.push(vec(H, fA, { tone: "c", bold: true }), txt(v(fA[0] + 0.12, fA[1] - 0.1), "F₁", "se", { tone: "c", small: true }));
    els.push(vec(step === 0 ? H : v(0, 0.12), step === 0 ? fB : v(fB[0], 0.12), { tone: "warn", bold: true }), txt(step === 0 ? v(fB[0] - 0.12, fB[1] + 0.05) : v(fB[0] - 0.12, 0.3), "F₂", "nw", { tone: "warn", small: true }));
    if (step === 0) els.push(vec(H, v(F, F), { tone: "a", bold: true }), seg(fA, v(F, F), { tone: "muted", dash: true, thin: true }), seg(fB, v(F, F), { tone: "muted", dash: true, thin: true }), txt(v(F + 0.12, F + 0.05), "√2 F", "ne", { tone: "a", small: true, bold: true }));
    els.push(...pad(-3.2, 2.6, 3.4, -3.2));
    return { els, readout: step === 0 ? ["Fx = F, Fy = F ⇒ |F net| = √(F² + F²) = √2 F, yön 45°.", "Büyüklükleri doğrudan toplamak (2F) yalnız aynı yönde doğrudur."] : ["Fx = F − F = 0 ⇒ F net = 0.", "İki eşit yük olması tek başına sıfır net kuvvet garantisi değildir; geometri belirler."] };
  },
};

const symmetry: FigureDef = {
  caption:
    "Kaynaklar (±1; 0) noktalarında eşit büyüklükte, hedef +q orta dikme üzerinde (0; y). Kuvvet birimi kQq/a², a = 1. Yüksekliği değiştir: iki kaynak + iken x bileşenleri birbirini götürür, y bileşenleri toplanır; sağ kaynak − iken roller değişir: y bileşenleri götürür, x toplanır. Oklar ortak ölçekte.",
  alt: "Yatay eksende iki kaynak yükü, orta dikme üzerinde hedef yük; hedefte her kaynaktan gelen kuvvet oku ve ikisinin bileşkesi.",
  steps: ["İki kaynak +", "Sağ kaynak −"],
  param: { label: "Hedef yüksekliği y", min: 0.25, max: 3, step: 0.25, init: 1 },
  draw: (y, step) => {
    const S = 3, Tg = v(0, y), sR = step === 0 ? 1 : -1;
    const f = (src: V, sgn: number): V => {
      const d = v(Tg[0] - src[0], Tg[1] - src[1]), r3 = Math.hypot(d[0], d[1]) ** 3;
      return v((sgn * d[0]) / r3, (sgn * d[1]) / r3);
    };
    const f1 = f(v(-1, 0), 1), f2 = f(v(1, 0), sR), net = v(f1[0] + f2[0], f1[1] + f2[1]);
    const P = (p: V) => v(p[0] * 1.6, p[1] * 1.6);
    const tip = (fv: V) => v(P(Tg)[0] + fv[0] * S, P(Tg)[1] + fv[1] * S);
    const els: El[] = [seg(P(v(-1.8, 0)), P(v(1.8, 0)), { tone: "muted", thin: true }), seg(P(v(0, 0)), P(v(0, 3.4)), { tone: "muted", dash: true, thin: true })];
    els.push(circle(P(v(-1, 0)), 0.2, { tone: "b", fill: "b" }), txt(v(P(v(-1, 0))[0], -0.35), "+Q", "s", { tone: "b", small: true, bold: true }));
    els.push(circle(P(v(1, 0)), 0.2, { tone: sR > 0 ? "b" : "warn", fill: sR > 0 ? "b" : "warn" }), txt(v(P(v(1, 0))[0], -0.35), sR > 0 ? "+Q" : "−Q", "s", { tone: sR > 0 ? "b" : "warn", small: true, bold: true }));
    els.push(vec(P(Tg), tip(f1), { tone: "b", dash: true }), vec(P(Tg), tip(f2), { tone: sR > 0 ? "b" : "warn", dash: true }));
    const nm = Math.hypot(net[0], net[1]);
    if (nm > 0.02) els.push(vec(P(Tg), tip(net), { tone: "a", bold: true }));
    els.push(circle(P(Tg), 0.14, { tone: "a", fill: "a" }), txt(v(P(Tg)[0] - 0.2, P(Tg)[1]), "+q", "w", { tone: "a", small: true, bold: true }));
    els.push(...pad(-3.6, 7.6, 3.6, -0.8));
    return { els, readout: [`y = ${nf(y, 2)}: F net = (${nf(net[0], 3)}; ${nf(net[1], 3)}) kQq/a², büyüklük ${nf(nm, 3)}.`, step === 0 ? "x bileşenleri simetriyle sıfırlandı; yalnız y kalır." : "y bileşenleri sıfırlandı; net kuvvet −Q’ya doğru yatay."] };
  },
};

const hangBalance: FigureDef = {
  caption:
    "Örnek: m = 10 g küre (mg = 0,1 N), ipe asılı; yatay elektrik kuvveti Fe. Kuvveti değiştir: denge için T sinθ = Fe, T cosθ = mg ⇒ tanθ = Fe/(mg). Net elektrik kuvvetini bulmak yetmez; ağırlık ve ip gerilmesi de dengeye girer.",
  alt: "Tavandan sarkan ip ve ucunda küre; ip düşeyden θ açısıyla ayrılmış; kürede yatay elektrik kuvveti oku, aşağı ağırlık oku ve ip boyunca gerilme oku.",
  param: { label: "Fe", min: 0, max: 0.2, step: 0.01, init: 0.05, unit: " N" },
  draw: (Fe) => {
    const mg = 0.1, th = Math.atan2(Fe, mg), T = Math.hypot(Fe, mg), L = 3, S = 12;
    const top = v(0, 0), b = v(L * Math.sin(th), -L * Math.cos(th));
    const els: El[] = [box(-1.2, 0, 1.2, 0.2, "muted"), seg(top, v(0, -L), { tone: "muted", dash: true, thin: true }), seg(top, b, { tone: "ink" })];
    if (Fe > 0) els.push(ang(top, v(0, -1), b, `${nf((th * 180) / Math.PI, 1)}°`, { tone: "muted", r: 52 }));
    els.push(vec(b, v(b[0], b[1] - mg * S), { tone: "warn", bold: true }), txt(v(b[0] + 0.12, b[1] - mg * S), "mg = 0,1 N", "e", { tone: "warn", small: true }));
    if (Fe > 0.004) els.push(vec(b, v(b[0] + Fe * S, b[1]), { tone: "a", bold: true }), txt(v(b[0] + Fe * S + 0.12, b[1] + 0.1), `Fe = ${nf(Fe, 2)} N`, "e", { tone: "a", small: true, bold: true }));
    els.push(vec(b, v(b[0] - Math.sin(th) * T * S, b[1] + Math.cos(th) * T * S), { tone: "b", bold: true }));
    els.push(ball(b, 0.18, "c"));
    els.push(...pad(-1.6, 0.6, 5.4, -4.9));
    return { els, readout: [`tanθ = ${nf(Fe, 2)}/0,1 = ${nf(Fe / mg, 2)} ⇒ θ = ${nf((th * 180) / Math.PI, 1)}°.`, `T = √(Fe² + (mg)²) = ${nf(T, 3)} N.`] };
  },
};

/* ===================== Su dalgalarında kırınım ===================== */

const LAM = 0.5;

function gapScene(w: number): El[] {
  const W = w * LAM, th1 = w > 1 ? Math.asin(1 / w) : Math.PI / 2, Ymax = 3.4;
  const els: El[] = [seg(v(0, W / 2), v(0, Ymax), { tone: "ink", bold: true }), seg(v(0, -W / 2), v(0, -Ymax), { tone: "ink", bold: true })];
  for (let k = 1; k <= 6; k++) els.push(seg(v(-k * LAM, -Ymax + 0.2), v(-k * LAM, Ymax - 0.2), { tone: "a", thin: true }));
  for (let n = 1; n <= 7; n++) {
    const r = n * LAM;
    const top: V[] = [], bot: V[] = [];
    for (let i = 0; i <= 16; i++) {
      const a = (th1 * i) / 16;
      top.push(v(r * Math.cos(a), W / 2 + r * Math.sin(a)));
      bot.push(v(r * Math.cos(a), -W / 2 - r * Math.sin(a)));
    }
    const ps = [...top.reverse(), ...bot].filter((p) => Math.abs(p[1]) <= Ymax);
    els.push(poly(ps, { open: true, tone: "a", thin: n > 1 }));
  }
  return els;
}

const gapSpread: FigureDef = {
  caption:
    "Üstten görünüş, şematik: düz dalga cepheleri açıklığa gelir; açıklık genişliği w dalga boyunun katı olarak. w/λ’yı değiştir: λ/w büyüdükçe yana yayılma belirginleşir. Yanlara uzanan yayların açısı ideal uzak alan ilk sıfırından (w sinθ = λ) alındı; w ≤ λ iken neredeyse yarım daire yayılır. Ölçekli değil.",
  alt: "Ortada açıklığı olan dikey engel; solda eşit aralıklı düz dalga cepheleri, sağda açıklıktan çıkan, ortası düz kenarları bükülen dalga cepheleri.",
  param: { label: "w / λ", min: 0.5, max: 5, step: 0.5, init: 2 },
  draw: (w) => {
    const els = gapScene(w);
    els.push(vec(v(-3.2, 3.7), v(-2.0, 3.7), { tone: "muted", thin: true }), txt(v(-1.9, 3.7), "geliş", "e", { tone: "muted", small: true }));
    els.push(...pad(-3.8, 4.0, 4.0, -3.6));
    const th = w > 1 ? (Math.asin(1 / w) * 180) / Math.PI : 90;
    return { els, readout: [`λ/w = ${nf(1 / w, 2)}; ana demetin kenar açısı ${w > 1 ? `arcsin(1/${nf(w, 1)}) = ${nf(th, 1)}°` : "≈ 90° (w ≤ λ)"}.`, "Oran bir anahtar değil belirginlik ölçüsüdür; w > λ iken de kırınım vardır."] };
  },
};

const sincCurve: FigureDef = {
  caption:
    "Tek açıklığın skaler uzak alan modeli: β = πw sinθ/λ, normalize genlik |sinβ/β| (merkezde 1). w/λ’yı değiştir: açıklık daraldıkça ana lob genişler. Kesikli eğri w = 2λ başvurusudur (ilk sıfır 30°). Merkez değeri 1 alındığı için geçen toplam güç gösterilmez.",
  alt: "Yatay eksende −90’dan 90 dereceye açı, düşey eksende normalize genlik; seçili w/λ için ortası tepe yapan dolu eğri ve w = 2λ için kesikli başvuru eğrisi.",
  param: { label: "w / λ", min: 0.5, max: 5, step: 0.5, init: 3 },
  draw: (w) => {
    const amp = (d: number, ww: number) => {
      const b = Math.PI * ww * Math.sin(R(d));
      return Math.abs(b) < 1e-9 ? 1 : Math.abs(Math.sin(b) / b);
    };
    const X = (d: number) => d / 22, Y = (a: number) => a * 3;
    const els: El[] = [seg(v(X(-90), 0), v(X(90), 0), { tone: "ink", thin: true }), seg(v(0, 0), v(0, 3.4), { tone: "muted", thin: true })];
    els.push(poly(curve((d) => amp(d, 2), -90, 90, 180, X, Y), { open: true, tone: "muted", dash: true }));
    els.push(poly(curve((d) => amp(d, w), -90, 90, 180, X, Y), { open: true, tone: "a", bold: true }));
    for (const d of [-90, -30, 30, 90]) els.push(...xtick(X(d), 0, `${d}°`.replace("-", "−")));
    els.push(txt(v(0.1, Y(1)), "1", "e", { tone: "muted", small: true }));
    els.push(txt(v(X(90) + 0.15, 0), "θ", "e", { tone: "ink", small: true }));
    els.push(...pad(-4.5, 3.8, 4.9, -0.8));
    const th = w >= 1 ? (Math.asin(1 / w) * 180) / Math.PI : NaN;
    return { els, readout: [`w = ${nf(w, 1)}λ: ${w >= 1 ? `ilk sıfır θ₁ = ${nf(th, 1)}°` : "ileri yarı düzlemde sıfır yok (ana lob çok geniş)"}.`, `θ = 45°’de genlik ${nf(amp(45, w), 3)} (w = 2λ’da ${nf(amp(45, 2), 3)}).`] };
  },
};

const firstMin: FigureDef = {
  caption:
    "İdeal uzak alan zarfında ilk sıfır w sinθ = λ koşulundadır: θ₁ = arcsin(λ/w). w/λ’yı değiştir: w = 2λ’da 30°, w = λ’da 90° sınırı; w < λ iken ilk sıfır ileri yarı düzlemde oluşmaz (kırınım yok demek değil, ana lob çok geniştir).",
  alt: "Yatay eksende w/λ, düşey eksende ilk sıfır açısı; w = λ’da 90 dereceden başlayıp azalan eğri, w = 2λ’da 30 derece noktası ve seçili nokta.",
  param: { label: "w / λ", min: 0.5, max: 6, step: 0.25, init: 2 },
  draw: (w) => {
    const X = (x: number) => x * 1.35, Y = (d: number) => d / 25, th = (x: number) => (Math.asin(1 / x) * 180) / Math.PI;
    const els: El[] = [box(0, 0, X(1), Y(90), "warn"), ...axes(v(0, 0), 8.6, 4.0, "w / λ", "θ₁ (°)")];
    els.push(txt(v(X(0.5), Y(45)), "sıfır yok", "c", { tone: "ink", small: true }));
    els.push(poly(curve(th, 1, 6, 80, X, Y), { open: true, tone: "a", bold: true }));
    for (const x of [1, 2, 4, 6]) els.push(...xtick(X(x), 0, String(x)));
    els.push(...ytick(0, Y(30), "30"), ...ytick(0, Y(90), "90"));
    if (w >= 1) els.push(pt(v(X(w), Y(th(w))), `${nf(th(w), 1)}°`, "ne", "a"));
    els.push(...pad(-0.9, 4.3, 9.4, -0.8));
    return { els, readout: [w >= 1 ? `θ₁ = arcsin(1/${nf(w, 2)}) = ${nf(th(w), 1)}°.` : `w = ${nf(w, 2)}λ < λ: sinθ = λ/w > 1, ileri yarı düzlemde ilk sıfır yok.`, "Açıklık yarıya inerse λ/w iki katına çıkar ve lob genişler."] };
  },
};

const freqChange: FigureDef = {
  caption:
    "Örnek dalga leğeni: yayılma sürati v = 20 cm/s sabit (aynı derinlik), açıklık w = 4 cm. Frekansı değiştir: λ = v/f; frekans azalınca dalga boyu büyür ve λ/w artar, kırınım belirginleşir. Hız frekansla değişmez (bu modelde). Çizim ölçekli.",
  alt: "Üstte seçili dalga boyuyla çizilmiş sinüs dalgası ve bir dalga boyu ölçüsü; altında 4 santimetrelik açıklık genişliği çubuğu karşılaştırma için.",
  param: { label: "Frekans f", min: 2, max: 10, step: 1, init: 5, unit: " Hz", plain: true },
  draw: (f) => {
    const vv = 20, lam = vv / f, S = 0.5, X1 = 16 * S;
    const els: El[] = [poly(curve((x) => Math.sin((2 * Math.PI * x) / lam), 0, 16, 160, (x) => x * S, (y) => 1.6 + y * 0.6), { open: true, tone: "a", bold: true })];
    els.push(seg(v(lam * 0.25 * S, 2.45), v(lam * 1.25 * S, 2.45), { tone: "a", thin: true }), txt(v(lam * 0.75 * S, 2.55), `λ = ${nf(lam, 2)} cm`, "n", { tone: "a", small: true, bold: true }));
    els.push(box(0, 0, 4 * S, 0.3, "b"), txt(v(4 * S + 0.15, 0.15), "w = 4 cm", "e", { tone: "b", small: true, bold: true }));
    els.push(...pad(-0.3, 3.2, X1 + 0.3, -0.4));
    return { els, readout: [`λ = 20/${f} = ${nf(lam, 2)} cm; λ/w = ${nf(lam / 4, 2)}.`, lam >= 4 ? "λ ≥ w: geniş açılı yayılma kolay seçilir." : "λ < w: ana ileri demet daha dar görünür."] };
  },
};

export const physicsFigures060Fields: Record<string, Record<string, FigureDef>> = {
  "newton-genel-cekim-yasasi": {
    "Ters kare ilişkisini oranla oku": inverseSquare,
    "Homojen kürenin içinde yalnız iç kütle etkili olur": insideSphere,
    "Dairesel yörüngenin enerji bütçesi": orbitEnergy,
    "Kurtulma süratinde başlangıç durumu önemlidir": escape,
  },
  transformatorler: {
    "Aynı akı değişimi, sarım başına aynı emk": emfRatio,
    "Yük direncinden bütün akımlara git": loadChain,
    "İletimde yüksek gerilim kaybı neden azaltır?": transmission,
    "Ardışık iki trafonun oranlarını çarp": cascade,
  },
  "elektriksel-kuvvet-ayt": {
    "Mikro öneki ve uzaklığın karesi": coulombR,
    "Hedef yükü seç, yalnız ona gelenleri çiz": targetSum,
    "Dengeyi alan hesabıyla bitirme": hangBalance,
    "Simetriyi geometriyle sınırla": symmetry,
  },
  "su-dalgalarinda-kirinim": {
    "Ana oran: dalga boyu bölü açıklık": gapSpread,
    "Frekans değişince dalga boyunu yeniden bul": freqChange,
    "Etkileşimdeki eğri neyi gösteriyor?": sincCurve,
    "İlk minimum ve belirginlik": firstMin,
  },
};
