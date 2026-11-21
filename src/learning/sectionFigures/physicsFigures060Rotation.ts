import { ang, ball, circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge060) · Açısal momentum, dönerek öteleme, kütle ve ağırlık
 * merkezi, basit makineler. Sayılar rehber bölümlerindeki örneklerden gelir
 * (r = (2; 1) m, v = (1; 4) m/s, I 9 → 3 kg·m², R = 0,4 m teker …); rehberin
 * sayı vermediği yerlerde seçilen örnek figür yazısında söylenir. g = 10 m/s².
 */

const G = 10;
const R = (d: number) => (d * Math.PI) / 180;

/* ===================== Açısal momentum ===================== */

const crossDef: FigureDef = {
  caption:
    "m = 3 kg, bir anda r = (2; 1) m ve v = (1; 4) m/s; cisim bu doğru boyunca sabit hızla gidiyor (kesikli çizgi). Zamanı değiştir: r değişir ama Lz = x·py − y·px = 21 kg·m²/s sabit kalır, çünkü O’nun hareket doğrusuna dik uzaklığı d değişmez: L = p·d. mvr kısa yolu yalnız r ⟂ v iken doğrudur.",
  alt: "Koordinat düzleminde O başlangıç noktası, eğik kesikli hareket doğrusu, O’dan cisme konum oku, cisimden doğru boyunca momentum oku ve O’dan doğruya dik uzaklık parçası.",
  param: { label: "Zaman t", min: -0.5, max: 0.6, step: 0.1, init: 0, unit: " s" },
  draw: (t) => {
    const m = 3, P = v(2 + t, 1 + 4 * t), p = v(3, 12), S = 0.14;
    const a = v(1.3, -1.8), b = v(2.85, 4.4);
    const L = P[0] * p[1] - P[1] * p[0];
    const pm = Math.hypot(p[0], p[1]), d = Math.abs(L) / pm;
    const u = v(p[0] / pm, p[1] / pm), F = v(u[1] * d, -u[0] * d);
    const els: El[] = [...axes(v(0, 0), 4.2, 4.6, "x (m)", "y (m)", 1.8), seg(v(-1.0, 0), v(0, 0), { tone: "ink", thin: true })];
    els.push(seg(a, b, { tone: "muted", dash: true, thin: true }));
    els.push(seg(v(0, 0), F, { tone: "c", thin: true }), txt(v(F[0] / 2 + 0.1, F[1] / 2 - 0.1), `d = ${nf(d, 2)} m`, "se", { tone: "c", small: true }));
    els.push(vec(v(0, 0), P, { tone: "b", bold: true }), txt(v(P[0] / 2 - 0.12, P[1] / 2 + 0.08), "r", "nw", { tone: "b", small: true, bold: true }));
    els.push(vec(P, v(P[0] + p[0] * S, P[1] + p[1] * S), { tone: "a", bold: true }), txt(v(P[0] + p[0] * S + 0.12, P[1] + p[1] * S), "p = (3; 12)", "e", { tone: "a", small: true, bold: true }));
    els.push(ball(P, 0.09, "ink"), pt(v(0, 0), "O", "sw"));
    els.push(...pad(-1.3, 5.2, 5.6, -2.1));
    return { els, readout: [`r = (${nf(P[0], 1)}; ${nf(P[1], 1)}) m: Lz = ${nf(P[0], 1)}·12 − ${nf(P[1], 1)}·3 = ${nf(L, 1)} kg·m²/s.`, `p·d = ${nf(pm, 2)} · ${nf(d, 3)} = ${nf(pm * d, 1)}; m = ${m} kg, |r| = ${nf(Math.hypot(P[0], P[1]), 2)} m değişse de L aynı.`] };
  },
};

const skater: FigureDef = {
  caption:
    "Dönen sporcu (üstten görünüş, ölçekli değil), dış tork ihmal. Eylemsizlik momentini değiştir: L = Iω = 9·2 = 18 kg·m²/s sabit; I 3 kg·m²’ye inince ω 6 rad/s olur. K = L²/(2I) ise 18 J’den 54 J’ye çıkar: fark kasların yaptığı iştir, açısal momentum üretilmez.",
  alt: "Ortada gövde dairesi, iki yana uzanan kollar ve uçlarında ağırlıklar; sağda açısal hız ve dönme kinetik enerjisi için iki yatay çubuk.",
  param: { label: "Eylemsizlik momenti I", min: 3, max: 9, step: 0.5, init: 9, unit: " kg·m²" },
  draw: (I) => {
    const L = 18, w = L / I, K = (L * L) / (2 * I), rho = 0.5 + ((I - 3) / 6) * 1.5;
    const els: El[] = [circle(v(0, 0), 0.45, { tone: "ink", fill: "muted" })];
    for (const s of [1, -1]) els.push(seg(v(0.45 * s, 0), v(rho * s, 0), { tone: "ink", bold: true }), ball(v(rho * s, 0), 0.16, "b"));
    els.push(poly(curve((a) => a, 20, 160, 20, (a) => 2.25 * Math.cos(R(a)), (a) => 2.25 * Math.sin(R(a))), { open: true, tone: "muted", thin: true }));
    els.push(vec(v(2.25 * Math.cos(R(25)), 2.25 * Math.sin(R(25))), v(2.25 * Math.cos(R(10)), 2.25 * Math.sin(R(10))), { tone: "muted", thin: true }));
    const bx = 3.0, S1 = 0.35, S2 = 0.05;
    els.push(box(bx, 0.6, bx + w * S1, 1.0, "a"), txt(v(bx + w * S1 + 0.12, 0.8), `ω = ${nf(w, 2)} rad/s`, "e", { tone: "a", small: true, bold: true }));
    els.push(box(bx, -0.6, bx + K * S2, -0.2, "warn"), txt(v(bx + K * S2 + 0.12, -0.4), `K = ${nf(K, 1)} J`, "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(bx, -0.9), v(bx, 1.3), { tone: "muted", thin: true }));
    els.push(...pad(-2.6, 2.6, 8.4, -2.0));
    return { els, readout: [`L = I·ω = ${nf(I, 1)} · ${nf(w, 2)} = 18 kg·m²/s (sabit).`, `K = 18²/(2·${nf(I, 1)}) = ${nf(K, 1)} J; I = 9’da 18 J.`] };
  },
};

const torqueImpulse: FigureDef = {
  caption:
    "Örnek: başlangıçta L = 0; 0–3 s arası τ = +4 N·m, 3–5 s arası τ = −2 N·m dış tork. Zamanı değiştir: tork–zaman grafiğinin işaretli alanı açısal itmedir, ΔL = ∫τ dt. Önce +12 kg·m²/s birikir, sonra negatif alan 4 kg·m²/s geri alır: L(5 s) = 8 kg·m²/s.",
  alt: "Üstte tork–zaman basamak grafiği, seçili zamana kadar gölgeli işaretli alan; altta açısal momentum–zaman grafiği, önce artan sonra azalan kırık doğru ve seçili nokta.",
  param: { label: "Zaman t", min: 0, max: 5, step: 0.5, init: 4, unit: " s" },
  draw: (t) => {
    const X = (s: number) => s * 1.3;
    const Lf = (s: number) => (s <= 3 ? 4 * s : 12 - 2 * (s - 3));
    const yT = 4.0, sT = 0.25, sL = 0.17;
    const els: El[] = [...axes(v(0, yT), 7.2, 1.4, "t (s)", "τ (N·m)", 0.7), ...axes(v(0, 0), 7.2, 2.5, "t (s)", "L (kg·m²/s)")];
    const t1 = Math.min(t, 3);
    if (t1 > 0) els.push(box(X(0), yT, X(t1), yT + 4 * sT, "a"));
    if (t > 3) els.push(box(X(3), yT, X(t), yT - 2 * sT, "warn"));
    els.push(poly([v(X(0), yT + 4 * sT), v(X(3), yT + 4 * sT), v(X(3), yT - 2 * sT), v(X(5), yT - 2 * sT)], { open: true, tone: "ink", bold: true }));
    els.push(poly(curve(Lf, 0, 5, 20, X, (l) => l * sL), { open: true, tone: "b", bold: true }));
    els.push(pt(v(X(t), Lf(t) * sL), `L = ${nf(Lf(t), 1)}`, t > 3.5 ? "ne" : "nw", "b"));
    for (const s of [3, 5]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, yT + 4 * sT, "+4"), ...ytick(0, yT - 2 * sT, "−2"), ...ytick(0, 12 * sL, "12"));
    els.push(seg(v(X(t), 0), v(X(t), yT + 1.1), { tone: "muted", dash: true, thin: true }));
    els.push(...pad(-1.0, yT + 1.9, 8.8, -0.7));
    const A1 = 4 * t1, A2 = t > 3 ? -2 * (t - 3) : 0;
    return { els, readout: [`İşaretli alan: ${nf(A1, 1)}${t > 3 ? ` + (${nf(A2, 1)})` : ""} = ${nf(A1 + A2, 1)} kg·m²/s.`, `L(${nf(t, 1)} s) = 0 + ${nf(A1 + A2, 1)} = ${nf(Lf(t), 1)} kg·m²/s.`] };
  },
};

const orbitL: FigureDef = {
  caption:
    "Örnek eliptik yörünge, yıldız odakta; en yakın uzaklık 1, en uzak 3 birim (ölçekli şema). Konumu değiştir: sürat değişir ve hız genel olarak yarıçapa dik değildir; korunan r·v·sinθ (r ile hızın teğet bileşeninin çarpımı). En yakın ve en uzak noktada θ = 90° olduğundan r₁v₁ = r₂v₂ ⇒ v₁/v₂ = 3.",
  alt: "Odakta yıldız bulunan elips; seçili konumda yıldızdan gezegene yarıçap oku, gezegenden yörüngeye teğet hız oku ve aralarındaki açı.",
  param: { label: "Yörünge açısı φ", min: 0, max: 345, step: 15, init: 60, unit: "°", plain: true },
  draw: (ph) => {
    const a = 2, e = 0.5, p = a * (1 - e * e), bA = a * Math.sqrt(1 - e * e), Sv = 1.3;
    const r = p / (1 + e * Math.cos(R(ph)));
    const P = v(r * Math.cos(R(ph)), r * Math.sin(R(ph)));
    const vr = e * Math.sin(R(ph)), vt = 1 + e * Math.cos(R(ph));
    const dir = v(vr * Math.cos(R(ph)) - vt * Math.sin(R(ph)), vr * Math.sin(R(ph)) + vt * Math.cos(R(ph)));
    const sp = Math.hypot(vr, vt), th = (Math.acos((vr * 1) / sp) * 180) / Math.PI;
    const ell: V[] = [];
    for (let i = 0; i <= 72; i++) ell.push(v(-a * e + a * Math.cos((i / 72) * 2 * Math.PI), bA * Math.sin((i / 72) * 2 * Math.PI)));
    const els: El[] = [poly(ell, { tone: "muted", thin: true }), ball(v(0, 0), 0.16, "warn")];
    els.push(vec(v(0, 0), P, { tone: "b", bold: true }));
    const tip = v(P[0] + dir[0] * Sv, P[1] + dir[1] * Sv);
    els.push(vec(P, tip, { tone: "a", bold: true }), txt(v(tip[0] + 0.1, tip[1] + 0.05), `v = ${nf(sp, 2)}`, "ne", { tone: "a", small: true, bold: true }));
    els.push(ang(P, v(2 * P[0], 2 * P[1]), tip, `${nf(th, 0)}°`, { tone: "muted", r: 22 }));
    els.push(ball(P, 0.1, "b"), txt(v(-a * e - a - 0.1, 0), "r = 3", "w", { tone: "muted", small: true, soft: true }), txt(v(1.1, 0), "r = 1", "e", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-4.2, 2.4, 3.0, -2.4));
    return { els, readout: [`r = ${nf(r, 3)}, v = ${nf(sp, 3)}, θ = ${nf(th, 1)}°: r·v·sinθ = ${nf(r * sp * Math.sin(R(th)), 3)} (sabit).`, `r·v (sinθ’sız) = ${nf(r * sp, 3)}: θ ≠ 90° iken korunan nicelik değildir.`] };
  },
};

/* ===================== Dönerek öteleme ===================== */

const pointVelocity: FigureDef = {
  caption:
    "R = 0,4 m teker, merkez sağa 2 m/s, ω = −5 rad/s (saat yönü), +z sayfadan dışarı. Janttaki noktayı değiştir: dönme katkısı ω × r = (−ωy; ωx) yarıçapa diktir ve büyüklüğü 2 m/s’dir; ortak merkez hızıyla vektörel toplanır. Üstte 4 m/s, altta 0, sağ yanda (2; −2) m/s ⇒ 2√2 m/s.",
  alt: "Zemin üzerinde teker, merkezde sağa hız oku; seçili jant noktasında merkez hızının kopyası, yarıçapa dik dönme hızı oku ve ikisinin toplamı olan gerçek hız oku.",
  param: { label: "Nokta açısı α", min: 0, max: 345, step: 15, init: 0, unit: "°", plain: true },
  draw: (al) => {
    const Rm = 0.4, vC = 2, w = -5, K = 4, S = 0.55;
    const x = Rm * Math.cos(R(al)), y = Rm * Math.sin(R(al));
    const rotV = v(-w * y, w * x), tot = v(vC + rotV[0], rotV[1]);
    const P = v(x * K, y * K);
    const els: El[] = [seg(v(-2.6, -Rm * K), v(3.6, -Rm * K), { tone: "muted", bold: true }), circle(v(0, 0), Rm * K, { tone: "ink" })];
    els.push(seg(v(0, 0), P, { tone: "muted", thin: true }), ball(v(0, 0), 0.06, "ink"));
    els.push(vec(v(0, 0), v(vC * S, 0), { tone: "c", bold: true }), txt(v(vC * S / 2, -0.15), "2 m/s", "s", { tone: "c", small: true }));
    els.push(vec(P, v(P[0] + vC * S, P[1]), { tone: "c", dash: true }));
    els.push(vec(P, v(P[0] + rotV[0] * S, P[1] + rotV[1] * S), { tone: "b", dash: true }));
    const sp = Math.hypot(tot[0], tot[1]);
    if (sp > 0.05) {
      const tip = v(P[0] + tot[0] * S, P[1] + tot[1] * S);
      els.push(vec(P, tip, { tone: "a", bold: true }), txt(v(tip[0] + 0.1, tip[1] + 0.05), `${nf(sp, 2)} m/s`, "ne", { tone: "a", small: true, bold: true }));
    }
    els.push(ball(P, 0.08, "a"));
    els.push(...pad(-2.8, 3.6, 4.6, -2.0));
    return { els, readout: [`α = ${al}°: dönme katkısı (${nf(rotV[0], 2)}; ${nf(rotV[1], 2)}) m/s.`, `Gerçek hız = (2 + ${nf(rotV[0], 2)}; ${nf(rotV[1], 2)}) = (${nf(tot[0], 2)}; ${nf(tot[1], 2)}) m/s, sürat ${nf(sp, 3)} m/s.`] };
  },
};

const rimPoints: FigureDef = {
  caption:
    "Kaymadan sağa yuvarlanan teker, merkez sürati v. Her jant noktasının hızı, temas noktası P’den o noktaya çizilen doğruya diktir ve büyüklüğü P’ye uzaklıkla orantılıdır: üst 2v, yanlar √2 v, merkez v, temas 0. Temas noktası her an başka bir jant noktasıdır.",
  alt: "Zemine değen teker; jant üzerindeki sekiz noktada uzunlukları farklı hız okları, temas noktasından bu noktalara ince kesikli çizgiler ve üst, yan, alt etiketleri.",
  draw: () => {
    const K = 1.6, S = 0.45, v0 = 2;
    const C = v(0, K), Pc = v(0, 0);
    const els: El[] = [seg(v(-3, 0), v(3.4, 0), { tone: "muted", bold: true }), circle(C, K, { tone: "ink" })];
    for (let i = 0; i < 8; i++) {
      const a = (i * 45 * Math.PI) / 180;
      const Q = v(C[0] + K * Math.cos(a), C[1] + K * Math.sin(a));
      const rq = v(Q[0] - Pc[0], Q[1] - Pc[1]);
      const vel = v((rq[1] * v0) / K, (-rq[0] * v0) / K);
      if (i !== 6) els.push(seg(Pc, Q, { tone: "muted", dash: true, thin: true }), vec(Q, v(Q[0] + vel[0] * S, Q[1] + vel[1] * S), { tone: i === 2 ? "a" : i === 0 || i === 4 ? "b" : "c", bold: i === 2 }));
    }
    els.push(vec(C, v(C[0] + v0 * S, C[1]), { tone: "warn", bold: true }), txt(v(C[0] + v0 * S / 2, C[1] - 0.15), "v", "s", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(2 * v0 * S + 0.1, 2 * K + 0.05), "2v", "e", { tone: "a", small: true, bold: true }), txt(v(K + 0.2, K + 0.1), "√2 v", "e", { tone: "b", small: true, bold: true }), txt(v(-K - 0.2, K), "√2 v", "w", { tone: "b", small: true, bold: true }));
    els.push(pt(Pc, "P: 0", "sw", "ink"));
    els.push(...pad(-3.2, 4.0, 4.0, -0.7));
    return { els, readout: ["Üst: v + ωR = 2v; yan: √(v² + v²) = √2 v; temas: v − ωR = 0.", "Temas noktasının hızı sıfırdır ama ivmesi sıfır değildir (merkeze doğru)."] };
  },
};

const cycloid: FigureDef = {
  caption:
    "Kaymadan yuvarlanan teker (R = 1 birim); janttaki boya lekesi başta yerde. Tur kesrini değiştir: merkez düz çizgide 2πR·n ilerler; leke yere göre sikloid çizer. Bir turda merkez yolu 2πR ≈ 6,28R, lekenin sikloid boyunca aldığı yol 8R’dir; merkeze göre ise 2πR.",
  alt: "Zemin üzerinde teker; merkezden geçen yatay kesikli merkez yolu, boya lekesinin çizdiği kemer biçimli sikloid eğrisi ve tekerin seçili konumu.",
  param: { label: "Tur sayısı", min: 0, max: 1, step: 0.05, init: 0.5 },
  draw: (n) => {
    const Rr = 1, th = 2 * Math.PI * n, cx = Rr * th;
    const cyc = (t: number): V => v(Rr * (t - Math.sin(t)), Rr * (1 - Math.cos(t)));
    const els: El[] = [seg(v(-0.6, 0), v(7.2, 0), { tone: "muted", bold: true }), seg(v(0, Rr), v(2 * Math.PI * Rr, Rr), { tone: "c", dash: true, thin: true })];
    els.push(poly(Array.from({ length: 61 }, (_, i) => cyc((2 * Math.PI * i) / 60)), { open: true, tone: "muted", thin: true, dash: true }));
    if (n > 0) els.push(poly(Array.from({ length: 41 }, (_, i) => cyc((th * i) / 40)), { open: true, tone: "a", bold: true }));
    els.push(circle(v(cx, Rr), Rr, { tone: "ink" }), ball(v(cx, Rr), 0.06, "ink"), seg(v(cx, Rr), cyc(th), { tone: "muted", thin: true }), ball(cyc(th), 0.1, "a"));
    els.push(txt(v(2 * Math.PI * Rr + 0.15, Rr), "merkez yolu", "e", { tone: "c", small: true }));
    els.push(...pad(-0.8, 2.5, 8.6, -0.5));
    const s = 4 * Rr * (1 - Math.cos(th / 2));
    return { els, readout: [`Merkez: 2πR·${nf(n, 2)} = ${nf(cx, 2)}R; açı ${nf(th, 2)} rad.`, `Leke (yere göre, sikloid boyunca): 4R(1 − cos(θ/2)) = ${nf(s, 2)}R.`] };
  },
};

const BODIES = [
  { name: "kayan blok (sürtünmesiz)", k: 0, tone: "muted" as const },
  { name: "dolu küre", k: 0.4, tone: "a" as const },
  { name: "dolu disk", k: 0.5, tone: "b" as const },
  { name: "ince halka", k: 1, tone: "c" as const },
];

const rollRace: FigureDef = {
  caption:
    "Durgun bırakılan cisimler h kadar alçalıyor; yuvarlananlar kaymadan, kayıpsız (g = 10 m/s²). Yüksekliği değiştir: mgh = (1 + k)mv²/2 ⇒ v = √[2gh/(1 + k)]; kütle ve yarıçap sadeleşir. Küre k = 0,4, disk 0,5, halka 1: küre en hızlıdır. Sürtünmesiz kayan blok (k = 0) karşılaştırma içindir.",
  alt: "Dört yatay çubuk: kayan blok, dolu küre, dolu disk ve ince halka için ulaşılan sürat; çubuk boyları sürate orantılı.",
  param: { label: "Yükseklik h", min: 1, max: 5, step: 0.5, init: 2, unit: " m" },
  draw: (h) => {
    const S = 0.55;
    const els: El[] = [seg(v(0, -0.3), v(0, 4.2), { tone: "muted", thin: true })];
    BODIES.forEach((b, i) => {
      const sp = Math.sqrt((2 * G * h) / (1 + b.k)), y = 3.4 - i * 1.05;
      els.push(box(0, y, sp * S, y + 0.5, b.tone));
      els.push(txt(v(sp * S + 0.12, y + 0.25), `${nf(sp, 2)} m/s`, "e", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(0.08, y + 0.62), `${b.name}, k = ${nf(b.k, 1)}`, "ne", { tone: "muted", small: true }));
    });
    els.push(...pad(-0.4, 4.6, 8.6, -0.5));
    return { els, readout: [`h = ${nf(h, 1)} m: küre √(${nf(2 * G * h, 0)}/1,4) = ${nf(Math.sqrt((2 * G * h) / 1.4), 2)} m/s, halka √(${nf(2 * G * h, 0)}/2) = ${nf(Math.sqrt(G * h), 2)} m/s.`, "Aynı h’de enerji aynı; dönmeye giden pay büyüdükçe merkez sürati küçülür."] };
  },
};

/* ===================== Kütle ve ağırlık merkezi ===================== */

const twoMasses: FigureDef = {
  caption:
    "Örnek: 6 m’lik kütlesiz çubuğun sol ucunda m₁ = 3 kg, sağ ucunda m₂. m₂’yi değiştir: merkez büyük kütleye yakındır ve m₁d₁ = m₂d₂ sağlanır; xKM = m₂·6/(3 + m₂). m₂ = 0’da merkez m₁’in üstüne gelir; eşit kütlede orta nokta.",
  alt: "Yatay çubuk, solda ve sağda büyüklüğü kütleye göre değişen iki küre; çubuk üzerinde kütle merkezini gösteren üçgen işaret ve iki yandaki uzaklık ölçüleri.",
  param: { label: "m₂", min: 0, max: 9, step: 1, init: 6, unit: " kg", plain: true },
  draw: (m2) => {
    const m1 = 3, Lr = 6, S = 1.1, x = (m2 * Lr) / (m1 + m2);
    const els: El[] = [seg(v(0, 0), v(Lr * S, 0), { tone: "ink", bold: true })];
    els.push(ball(v(0, 0), 0.18 * Math.sqrt(m1), "b"), txt(v(0, 0.6), "3 kg", "n", { tone: "b", small: true, bold: true }));
    if (m2 > 0) els.push(ball(v(Lr * S, 0), 0.18 * Math.sqrt(m2), "a"));
    els.push(txt(v(Lr * S, 0.75), `${m2} kg`, "n", { tone: "a", small: true, bold: true }));
    els.push(poly([v(x * S, -0.08), v(x * S - 0.22, -0.45), v(x * S + 0.22, -0.45)], { fill: "warn", tone: "warn" }), txt(v(x * S, -0.55), "KM", "s", { tone: "warn", small: true, bold: true }));
    if (x > 0.3) els.push(seg(v(0, -1.2), v(x * S, -1.2), { tone: "b", thin: true }), txt(v((x * S) / 2, -1.3), `d₁ = ${nf(x, 2)} m`, "s", { tone: "b", small: true }));
    if (Lr - x > 0.3) els.push(seg(v(x * S, -1.2), v(Lr * S, -1.2), { tone: "a", thin: true }), txt(v(((x + Lr) * S) / 2, -1.3), `d₂ = ${nf(Lr - x, 2)} m`, "s", { tone: "a", small: true }));
    els.push(...pad(-0.8, 1.3, Lr * S + 0.8, -2.0));
    return { els, readout: [`xKM = ${m2}·6 / (3 + ${m2}) = ${nf(x, 2)} m.`, m2 > 0 ? `Kontrol: 3·${nf(x, 2)} = ${nf(3 * x, 2)} = ${m2}·${nf(Lr - x, 2)}.` : "m₂ = 0: tek kütle kaldı, merkez onun üstünde."] };
  },
};

const compound: FigureDef = {
  caption:
    "Türdeş, aynı kalınlıkta L biçimli levha iki dikdörtgene ayrılır: alt parça 4×1 (alan 4, merkez (2; 0,5)), dik parça 1×3 (alan 3, merkez (0,5; 2,5)). Alanlar kütle yerine kullanılır. Birleşik merkez (9,5/7; 9,5/7) ≈ (1,36; 1,36), iki parça merkezini birleştiren doğru üzerindedir ve levhanın maddesinin dışında kalır.",
  alt: "Koordinat düzleminde L biçimli levha; iki parçanın merkez noktaları, onları birleştiren kesikli doğru ve bu doğru üzerinde, levhanın iç köşesinin dışındaki boşlukta kalan birleşik merkez.",
  steps: ["Parçalar ve merkezleri", "Ağırlıklı ortalama"],
  draw: (_, step) => {
    const S = 1;
    const els: El[] = [box(0, 0, 4 * S, 1 * S, "b"), box(0, 1 * S, 1 * S, 4 * S, "c")];
    const A = v(2, 0.5), B = v(0.5, 2.5), C = v(9.5 / 7, 9.5 / 7);
    els.push(pt(A, "4 br²", "e", "b"), pt(B, "3 br²", "e", "c"));
    if (step === 1) els.push(seg(A, B, { tone: "muted", dash: true, thin: true }), pt(C, "KM (1,36; 1,36)", "ne", "warn"));
    els.push(txt(v(4, -0.15), "4", "s", { tone: "muted", small: true, soft: true }), txt(v(-0.15, 4), "4", "w", { tone: "muted", small: true, soft: true }), txt(v(-0.15, -0.15), "0", "sw", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-0.8, 4.6, 5.6, -0.7));
    return { els, readout: step === 0 ? ["Alt parça: 4·1 = 4, merkez (2; 0,5). Dik parça: 1·3 = 3, merkez (0,5; 2,5).", "Örtüşen alan yok: dik parça y = 1’den başlar."] : ["x = (4·2 + 3·0,5)/7 = 9,5/7 ≈ 1,36; y = (4·0,5 + 3·2,5)/7 = 9,5/7 ≈ 1,36.", "Merkez maddenin dışında: (1,36; 1,36) ne alt ne dik parçanın içinde."] };
  },
};

const cutOut: FigureDef = {
  caption:
    "Örnek: 4×4 türdeş kare levha (merkez (2; 2)), sağ üst köşeden s×s kare kesiliyor. Kesilen kenarı değiştir: rK = (M·r₀ − m·rc)/(M − m), M = 16, m = s² (alanlar). Kalan merkez kesilen parçanın merkezinden uzağa, sol alta kayar. Eksi terim muhasebedir, negatif kütle değildir.",
  alt: "Kare levha, sağ üst köşesinde kesilmiş boş kare; ilk merkez açık nokta, kesilen parçanın merkezi ve kalan levhanın yeni merkezi dolu nokta.",
  param: { label: "Kesilen kenar s", min: 0, max: 3, step: 0.5, init: 2, unit: " birim" },
  draw: (s) => {
    const M = 16, m = s * s, c = 4 - s / 2, rK = (M * 2 - m * c) / (M - m);
    const els: El[] = [poly(s > 0 ? [v(0, 0), v(4, 0), v(4, 4 - s), v(4 - s, 4 - s), v(4 - s, 4), v(0, 4)] : [v(0, 0), v(4, 0), v(4, 4), v(0, 4)], { fill: "b", tone: "b", thin: true })];
    if (s > 0) els.push(poly([v(4 - s, 4 - s), v(4, 4 - s), v(4, 4), v(4 - s, 4)], { tone: "muted", dash: true, thin: true }), pt(v(c, c), "kesilen", "n", "muted", true));
    els.push(pt(v(2, 2), "ilk (2; 2)", "ne", "ink", true));
    if (s > 0) els.push(pt(v(rK, rK), `kalan (${nf(rK, 2)}; ${nf(rK, 2)})`, "sw", "warn"));
    els.push(...pad(-1.6, 4.4, 4.6, -0.6));
    return { els, readout: [s > 0 ? `x = (16·2 − ${nf(m, 2)}·${nf(c, 2)}) / (16 − ${nf(m, 2)}) = ${nf(rK, 3)}; y aynı (simetri).` : "Kesim yok: merkez (2; 2).", "Kesilen parça merkezden uzaklaştıkça ve büyüdükçe kayma artar."] };
  },
};

const tipping: FigureDef = {
  caption:
    "Örnek rijit blok: taban yarı genişliği b = 0,5 m, kütle merkezi tabandan h = 1 m yüksekte; sağ alt köşe çevresinde kaymadan yatırılıyor. Açıyı değiştir: ağırlık doğrusu köşenin solundayken blok geri döner; tanφ = b/h ⇒ φ ≈ 26,6°’de doğru köşeden geçer (eşik); sonra devrilir.",
  alt: "Zeminde sağ alt köşesi üzerinde eğilmiş dikdörtgen blok; kütle merkezinden aşağı inen kesikli ağırlık doğrusu ve köşe noktası.",
  param: { label: "Eğim φ", min: 0, max: 40, step: 2, init: 20, unit: "°", plain: true },
  draw: (phi) => {
    const b = 0.5, h = 1, S = 1.8, O = v(0, 0);
    const rotp = (p: V): V => v(p[0] * Math.cos(R(phi)) + p[1] * Math.sin(R(phi)), -p[0] * Math.sin(R(phi)) + p[1] * Math.cos(R(phi)));
    const corners = [v(-2 * b, 0), v(0, 0), v(0, 2 * h), v(-2 * b, 2 * h)].map((p) => rotp(v(p[0] * S, p[1] * S)));
    const cm = rotp(v(-b * S, h * S));
    const crit = (Math.atan(b / h) * 180) / Math.PI;
    const state = phi < crit - 0.01 ? "geri döner" : phi <= crit + 0.01 ? "eşik" : "devrilir";
    const els: El[] = [seg(v(-3.0, 0), v(2.2, 0), { tone: "muted", bold: true }), poly(corners, { fill: "c", tone: "c" })];
    els.push(seg(cm, v(cm[0], 0), { tone: "warn", dash: true }), vec(cm, v(cm[0], cm[1] - 0.8), { tone: "warn", bold: true }), ball(cm, 0.08, "warn"));
    els.push(pt(O, "köşe", "se", "ink"));
    if (phi > 0) els.push(ang(O, v(-1, 0), corners[0], `${phi}°`, { tone: "muted", r: 30 }));
    els.push(txt(v(cm[0] - 0.12, cm[1] + 0.1), "KM", "nw", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-3.2, 4.4, 2.0, -0.7));
    return { els, readout: [`Eşik: tanφ = 0,5/1 ⇒ φ = ${nf(crit, 1)}°. Şimdi φ = ${phi}°: ${state}.`, `Ağırlık doğrusunun köşeye yatay uzaklığı ${nf(-cm[0] / S, 3)} m (artı: destek içinde).`] };
  },
};

/* ===================== Basit makineler ===================== */

const lever: FigureDef = {
  caption:
    "Örnek: 6 m’lik ağırlıksız kaldıraç, sol uçta G = 60 N yük, sağ uçta düşey kuvvet F. Desteği kaydır: F·dF = G·dG ⇒ F = 60·dG/(6 − dG). Kuvvet kolu uzunsa F < G (kuvvetten kazanç), kısa ise F > G; kollar eşitken F = G. Ok boyları kuvvetlerle orantılı.",
  alt: "Yatay çubuk, altında üçgen destek; sol uçta aşağı yük oku, sağ uçta aşağı kuvvet oku; destek ile iki uç arasındaki kol uzunlukları.",
  param: { label: "Destekten yüke uzaklık dG", min: 1, max: 5, step: 0.5, init: 2, unit: " m" },
  draw: (dG) => {
    const S = 0.9, Gv = 60, F = (Gv * dG) / (6 - dG), A = 0.008;
    const els: El[] = [seg(v(0, 0), v(6 * S, 0), { tone: "ink", bold: true }), poly([v(dG * S, 0), v(dG * S - 0.25, -0.45), v(dG * S + 0.25, -0.45)], { fill: "muted", tone: "ink" })];
    els.push(vec(v(0, 0), v(0, -Gv * A), { tone: "warn", bold: true }), txt(v(0.12, -Gv * A), "G = 60 N", "e", { tone: "warn", small: true, bold: true }));
    els.push(vec(v(6 * S, 0), v(6 * S, -F * A), { tone: "a", bold: true }), txt(v(6 * S - 0.12, -F * A), `F = ${nf(F, 1)} N`, "w", { tone: "a", small: true, bold: true }));
    els.push(seg(v(0, 0.45), v(dG * S, 0.45), { tone: "warn", thin: true }), txt(v((dG * S) / 2, 0.55), `dG = ${nf(dG, 1)} m`, "n", { tone: "warn", small: true }));
    els.push(seg(v(dG * S, 0.45), v(6 * S, 0.45), { tone: "a", thin: true }), txt(v(((dG + 6) * S) / 2, 0.55), `dF = ${nf(6 - dG, 1)} m`, "n", { tone: "a", small: true }));
    els.push(...pad(-0.8, 1.2, 6 * S + 0.8, -2.8));
    return { els, readout: [`F = 60·${nf(dG, 1)} / ${nf(6 - dG, 1)} = ${nf(F, 2)} N.`, F < Gv ? "Kuvvet kolu uzun: kuvvetten kazanç, yoldan kayıp." : F > Gv ? "Kuvvet kolu kısa: kuvvetten kayıp, yoldan kazanç." : "Kollar eşit: F = G."] };
  },
};

const movablePulley: FigureDef = {
  caption:
    "Örnek: G = 80 N yük, hareketli makara Gm = 20 N, ideal ip. İki düşey kol bloğu taşır: 2T = G + Gm ⇒ T = F = 50 N. Yükü kaldır: yük h yükselince iki kolun her biri h kısalır, serbest uçtan 2h ip çekilir. İş: F·2h = (G + Gm)·h.",
  alt: "Tavana bağlı ipin bir kolu aşağı inip hareketli makaranın altından dolanıyor, diğer kol yukarı çıkıp serbest uca gidiyor; makaranın altında asılı yük; kollarda gerilme okları.",
  param: { label: "Yük yükselmesi h", min: 0, max: 1, step: 0.1, init: 0.5, unit: " m" },
  draw: (h) => {
    const r = 0.45, S = 1.2, yp = -3 + h * S, yf = -0.6 + 2 * h * S, x0 = 0;
    const els: El[] = [box(-1.4, 2.6, 0.2, 2.8, "muted")];
    els.push(seg(v(x0 - r, 2.6), v(x0 - r, yp), { tone: "ink" }), seg(v(x0 + r, yp), v(x0 + r, yf), { tone: "ink" }));
    els.push(poly(curve((a) => a, 180, 360, 16, (a) => x0 + r * Math.cos(R(a)), (a) => yp + r * Math.sin(R(a))), { open: true, tone: "ink" }), circle(v(x0, yp), r, { tone: "ink" }));
    els.push(seg(v(x0, yp), v(x0, yp - 0.8), { tone: "ink", thin: true }), box(x0 - 0.5, yp - 1.6, x0 + 0.5, yp - 0.8, "b"), txt(v(x0 + 0.65, yp - 1.2), "80 N", "e", { tone: "b", small: true, bold: true }));
    els.push(vec(v(x0 - r - 0.2, yp + 0.6), v(x0 - r - 0.2, yp + 1.4), { tone: "a" }), vec(v(x0 + r + 0.2, yp + 0.6), v(x0 + r + 0.2, yp + 1.4), { tone: "a" }));
    els.push(txt(v(x0 - r - 0.3, yp + 1.0), "T", "w", { tone: "a", small: true, bold: true }), txt(v(x0 + r + 0.3, yp + 1.0), "T", "e", { tone: "a", small: true, bold: true }));
    els.push(vec(v(x0 + r, yf), v(x0 + r, yf + 0.7), { tone: "warn", bold: true }), txt(v(x0 + r + 0.15, yf + 0.6), "F = 50 N", "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(-1.6, -4.5), v(-1.0, -4.5), { tone: "muted", thin: true }), seg(v(-1.6, -4.5 + h * S), v(-1.0, -4.5 + h * S), { tone: "muted", thin: true }));
    if (h > 0) els.push(txt(v(-1.7, -4.5 + (h * S) / 2), `h = ${nf(h, 1)} m`, "w", { tone: "muted", small: true }));
    els.push(...pad(-3.4, 3.2, 3.2, -4.9));
    return { els, readout: [`2T = 80 + 20 ⇒ T = F = 50 N. Yük ${nf(h, 1)} m ⇒ serbest uç ${nf(2 * h, 1)} m.`, `Giriş işi 50·${nf(2 * h, 1)} = ${nf(100 * h, 0)} J = (80 + 20)·${nf(h, 1)}; yük için yararlı ${nf(80 * h, 0)} J.`] };
  },
};

const rampEnergy: FigureDef = {
  caption:
    "Örnek rampa: G = 100 N, L = 5 m, h = 3 m (sinθ = 0,6, cosθ = 0,8); yük paralel kuvvetle yukarı sabit hızla kayıyor. μk’yı değiştir: F = G sinθ + μkG cosθ = 60 + 80μk. Giriş FL, yararlı Gh = 300 J, ısı fk·L = 400μk J. Çubuk enerji bilançosudur.",
  alt: "Solda küçük eğik düzlem ve blok; sağda giriş işini gösteren uzun çubuk ve onunla aynı boyda, yararlı potansiyel enerji ile ısıdan oluşan yığılı çubuk.",
  param: { label: "μk", min: 0, max: 0.5, step: 0.05, init: 0.25 },
  draw: (mu) => {
    const F = 60 + 80 * mu, Win = F * 5, Q = 400 * mu, eta = 300 / Win, S = 1 / 160;
    const els: El[] = [poly([v(0, 0), v(2.4, 0), v(2.4, 1.8)], { fill: "muted", tone: "muted", thin: true }), txt(v(1.2, -0.15), "L = 5 m, h = 3 m", "s", { tone: "muted", small: true })];
    const bx = 3.6;
    els.push(box(bx, 0, bx + 0.9, Win * S, "a"), txt(v(bx + 0.45, Win * S + 0.1), `FL = ${nf(Win, 0)} J`, "n", { tone: "a", small: true, bold: true }));
    els.push(box(bx + 1.6, 0, bx + 2.5, 300 * S, "b"), txt(v(bx + 2.65, 150 * S), "Gh = 300 J", "e", { tone: "b", small: true, bold: true }));
    if (Q > 1) els.push(box(bx + 1.6, 300 * S, bx + 2.5, Win * S, "warn"), txt(v(bx + 2.65, (300 + Q / 2) * S + 0.12), `ısı ${nf(Q, 0)} J`, "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(bx - 0.3, 0), v(bx + 2.8, 0), { tone: "muted", thin: true }));
    els.push(...pad(-0.4, 3.0, 9.6, -0.6));
    return { els, readout: [`F = 60 + 80·${nf(mu, 2)} = ${nf(F, 1)} N; giriş ${nf(Win, 0)} J = 300 J + ${nf(Q, 0)} J.`, `Verim η = 300/${nf(Win, 0)} = %${nf(100 * eta, 1)}; kuvvet kazancı G/F = ${nf(100 / F, 2)}.`] };
  },
};

const windlass: FigureDef = {
  caption:
    "Örnek çıkrık: tambur yarıçapı r = 0,1 m, yük G = 200 N; kol yarıçapını değiştir. Moment dengesi F·R = G·r ⇒ F = 20/R. Bir turda el 2πR, yük 2πr yol alır; iş F·2πR = G·2πr. Kuvvet kola teğet uygulanır.",
  alt: "Eş merkezli iki çember: küçük tambur ve büyük kol çemberi; tamburdan aşağı sarkan ip ve yük, kol çemberinin teğetinde kuvvet oku ve iki yarıçap çizgisi.",
  param: { label: "Kol yarıçapı R", min: 0.2, max: 0.6, step: 0.05, init: 0.4, unit: " m" },
  draw: (Rk) => {
    const r = 0.1, Gv = 200, F = (Gv * r) / Rk, K = 5;
    const els: El[] = [circle(v(0, 0), Rk * K, { tone: "muted", dash: true }), circle(v(0, 0), r * K, { tone: "ink", fill: "muted" })];
    els.push(seg(v(0, 0), v(-Rk * K, 0), { tone: "a", thin: true }), txt(v((-Rk * K) / 2, 0.12), `R = ${nf(Rk, 2)} m`, "n", { tone: "a", small: true }));
    els.push(seg(v(r * K, 0), v(r * K, -3.6), { tone: "ink" }), box(r * K - 0.35, -4.3, r * K + 0.35, -3.6, "b"), txt(v(r * K + 0.5, -3.95), "200 N", "e", { tone: "b", small: true, bold: true }));
    els.push(vec(v(-Rk * K, 0), v(-Rk * K, F * 0.02), { tone: "warn", bold: true }), txt(v(-Rk * K - 0.12, F * 0.02), `F = ${nf(F, 1)} N`, "w", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(r * K + 0.1, 0.3), "r", "ne", { tone: "ink", small: true }));
    els.push(...pad(-4.8, 3.4, 3.4, -4.7));
    return { els, readout: [`F = 200·0,1/${nf(Rk, 2)} = ${nf(F, 1)} N.`, `Bir tur: el 2π·${nf(Rk, 2)} = ${nf(2 * Math.PI * Rk, 2)} m, yük 2π·0,1 = ${nf(2 * Math.PI * r, 3)} m.`] };
  },
};

export const physicsFigures060Rotation: Record<string, Record<string, FigureDef>> = {
  "acisal-momentum": {
    "Tam tanım konum ile momentumun çapraz çarpımıdır": crossDef,
    "Dış tork açısal momentumu değiştirir": torqueImpulse,
    "Kollar kapanınca hız neden artar": skater,
    "Gezegen örneğinde dönüş ile dolanımı ayır": orbitL,
  },
  "donerek-oteleme-hareketi": {
    "Gerçek nokta hızını vektörle kur": pointVelocity,
    "Üst, alt ve yan noktaları karşılaştır": rimPoints,
    "Bir tur, merkez yolu ve boya izinin yolu": cycloid,
    "Eğik düzlemde enerjiyi hareketle bağla": rollRace,
  },
  "kutle-agirlik-merkezi": {
    "İki kütlede uzaklıklar ters kütle oranında": twoMasses,
    "Birleşik şekli küçük ve doğru parçalara ayır": compound,
    "Kesilen parçayı çıkar, negatif madde icat etme": cutOut,
    "Destek alanı ve devrilme eşiği": tipping,
  },
  "basit-makineler-ayt": {
    "Kaldıraçta iki dik kol": lever,
    "Tek hareketli makarada gerçek taşıyıcı kollar": movablePulley,
    "Sürtünmeli rampanın enerji hesabı": rampEnergy,
    "Çıkrık: aynı tur, farklı çevre": windlass,
  },
};
