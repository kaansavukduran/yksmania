import { ball, poly, pt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge060) · Serbest düşme ve limit hız, sabit ivmeli hareket
 * grafikleri. Eğriler rehberdeki bağıntılardan çizilir: h = gt²/2,
 * v = vt·tanh(gt/vt), s = (vt²/g)·ln cosh(gt/vt), x(t) = 3 − 4t + t²,
 * v(t) = 6 − 2t. g = 10 m/s². Seçilen örnekler figür yazısında söylenir.
 */

const G = 10;

/* ===================== Serbest düşme ve limit hız ===================== */

const strobe: FigureDef = {
  caption:
    "İlk hızı sıfır ideal düşüş, g = 10 m/s², saniyede bir konum (ölçekli). Süreyi değiştir: toplam düşüşler 5, 20, 45, 80 m (1, 4, 9, 16 oranı); ardışık saniyelerdeki mesafeler farktan 5, 15, 25, 35 m (1, 3, 5, 7). Oranlar toplamların karelerinden doğar; ilk hız sıfır değilse geçerli değildir.",
  alt: "Yukarıdan aşağı düşen topun saniyede bir çekilmiş konumları; sağda başlangıçtan toplam uzaklıklar, solda ardışık aralıkların uzunlukları.",
  param: { label: "Süre", min: 1, max: 4, step: 1, init: 3, unit: " s", plain: true },
  draw: (n) => {
    const S = 0.055, y = (t: number) => -0.5 * G * t * t * S;
    const els: El[] = [seg(v(0, 0.2), v(0, y(4) - 0.2), { tone: "muted", dash: true, thin: true })];
    for (let t = 0; t <= n; t++) {
      els.push(ball(v(0, y(t)), 0.13, t === n ? "a" : "c"));
      if (t > 0) {
        els.push(seg(v(0.3, y(t)), v(0.6, y(t)), { tone: "muted", thin: true }), txt(v(0.7, y(t)), `${t} s: ${5 * t * t} m`, "e", { tone: "ink", small: true }));
        els.push(seg(v(-0.45, y(t - 1)), v(-0.45, y(t)), { tone: "b", thin: true }), txt(v(-0.6, (y(t - 1) + y(t)) / 2), `${5 * (2 * t - 1)} m`, "w", { tone: "b", small: true, bold: true }));
      }
    }
    els.push(txt(v(0.7, 0), "0", "e", { tone: "muted", small: true }));
    els.push(...pad(-2.6, 0.5, 3.4, y(4) - 0.4));
    return { els, readout: [`İlk ${n} s: toplam ${5 * n * n} m; son saniyede ${5 * (2 * n - 1)} m.`, "Aralık mesafeleri 1 : 3 : 5 : 7 oranında; hız her aralıkta farklıdır."] };
  },
};

const dragForces: FigureDef = {
  caption:
    "Örnek: m = 1 kg, karesel direnç Fd = c·v², c = 0,1 kg/m, durgun hava; limit sürat vt = √(mg/c) = 10 m/s. Sürati değiştir: direnç büyür, net kuvvet ve ivme küçülür ama ivme hâlâ aşağıysa sürat artmaya devam eder. Fd = mg/2 iken a = g/2; Fd = mg iken a = 0. Ok boyları ortak ölçekte.",
  alt: "Düşen top; aşağı sabit ağırlık oku, yukarı süratle büyüyen direnç oku; yanında net ivmeyi gösteren çubuk.",
  param: { label: "Sürat v", min: 0, max: 10, step: 1, init: 5, unit: " m/s", plain: true },
  draw: (sp) => {
    const m = 1, c = 0.1, W = m * G, Fd = c * sp * sp, a = G - Fd / m, S = 0.22;
    const els: El[] = [ball(v(0, 0), 0.3, "c")];
    els.push(vec(v(0, -0.3), v(0, -0.3 - W * S), { tone: "warn", bold: true }), txt(v(0.15, -0.3 - W * S), "mg = 10 N", "e", { tone: "warn", small: true, bold: true }));
    if (Fd > 0.05) els.push(vec(v(0, 0.3), v(0, 0.3 + Fd * S), { tone: "b", bold: true }));
    els.push(txt(v(0.15, 0.3 + Fd * S), `Fd = ${nf(Fd, 1)} N`, "e", { tone: "b", small: true, bold: true }));
    els.push(seg(v(3.0, 0), v(3.0, -W * S), { tone: "muted", thin: true }), txt(v(3.0, -W * S - 0.1), "g = 10", "s", { tone: "muted", small: true }));
    if (a > 0.05) els.push(box(2.7, 0, 3.3, -a * S, "a"));
    els.push(txt(v(3.45, -a * S / 2), `a = ${nf(a, 1)} m/s²`, "e", { tone: "a", small: true, bold: true }));
    els.push(...pad(-1.0, 2.9, 6.0, -2.7));
    return { els, readout: [`Fd = 0,1·${sp}² = ${nf(Fd, 1)} N; net ${nf(W - Fd, 1)} N aşağı; a = ${nf(a, 1)} m/s².`, a > 0.01 ? "İvme aşağı ve hız aşağı: sürat hâlâ artıyor, yalnız daha yavaş." : "Fd = mg: net kuvvet sıfır, sürat sabit (limit). Ağırlık yok olmadı."] };
  },
};

const tanhCurve: FigureDef = {
  caption:
    "Aynı örnek (vt = 10 m/s): durgun başlayan düşüşün çözümü v(t) = vt·tanh(gt/vt). Zamanı değiştir: kesikli doğru dirençsiz v = gt’dir; eğri vt’ye yaklaşır ama sonlu t’de tam ulaşmaz. %99 eşiği t = (vt/g)·artanh(0,99) ≈ 2,65 s’de geçilir.",
  alt: "Yatay eksende saniye, düşey eksende sürat; başlangıçta dirençsiz doğruyla çakışıp sonra 10 m/s yatay kesikli çizgisine yaklaşan eğri, yüzde 99 eşiği işareti ve seçili nokta.",
  param: { label: "Zaman t", min: 0, max: 5, step: 0.25, init: 1 },
  draw: (t) => {
    const vt = 10, X = (s: number) => s * 1.6, Y = (u: number) => u * 0.3, V = (s: number) => vt * Math.tanh((G * s) / vt), t99 = (vt / G) * Math.atanh(0.99);
    const els: El[] = [...axes(v(0, 0), 8.4, 3.9, "t (s)", "v (m/s)")];
    els.push(seg(v(0, Y(10)), v(X(5), Y(10)), { tone: "muted", dash: true, thin: true }), txt(v(X(5) + 0.1, Y(10)), "vt = 10", "e", { tone: "muted", small: true }));
    els.push(seg(v(0, 0), v(X(1.2), Y(12)), { tone: "warn", dash: true, thin: true }), txt(v(X(1.2) + 0.1, Y(12)), "v = gt", "e", { tone: "warn", small: true }));
    els.push(poly(curve(V, 0, 5, 80, X, Y), { open: true, tone: "a", bold: true }));
    els.push(seg(v(X(t99), 0), v(X(t99), Y(9.9)), { tone: "b", dash: true, thin: true }), ...xtick(X(t99), 0, "2,65"));
    for (const s of [1, 5]) els.push(...xtick(X(s), 0, String(s)));
    els.push(pt(v(X(t), Y(V(t))), `${nf(V(t), 2)} m/s`, "se", "a"));
    els.push(...pad(-0.8, 4.3, 9.6, -0.8));
    return { els, readout: [`v(${nf(t, 2)}) = 10·tanh(${nf(t, 2)}) = ${nf(V(t), 3)} m/s (vt’nin %${nf(V(t) * 10, 1)}’i).`, `Dirençsiz olsaydı ${nf(G * t, 1)} m/s; a = 10[1 − (v/vt)²] = ${nf(G * (1 - (V(t) / vt) ** 2), 2)} m/s².`] };
  },
};

const dragEnergy: FigureDef = {
  caption:
    "Aynı örnek (m = 1 kg, vt = 10 m/s), durgun bırakıldı. Zamanı değiştir: düşülen yol s = (vt²/g)·ln cosh(gt/vt); kaybedilen potansiyel mgs bir kısmıyla kinetik K = mv²/2’ye, kalanıyla Q = mgs − K olarak hava ve cismin iç enerjisine gider. Limitte K sabitlenir ama mgs ve Q artmayı sürdürür.",
  alt: "Tek yığılı çubuk: toplam boyu kaybedilen potansiyel enerji; alt kısmı kinetik enerji, üst kısmı havaya aktarılan enerji.",
  param: { label: "Zaman t", min: 0.5, max: 5, step: 0.5, init: 2 },
  draw: (t) => {
    const vt = 10, m = 1, sp = vt * Math.tanh((G * t) / vt), s = ((vt * vt) / G) * Math.log(Math.cosh((G * t) / vt)), U = m * G * s, K = 0.5 * m * sp * sp, Q = U - K, S = 1 / 110;
    const els: El[] = [seg(v(-0.4, 0), v(3.6, 0), { tone: "muted", thin: true })];
    els.push(box(0, 0, 1.2, K * S, "a"), txt(v(1.35, (K * S) / 2), `K = ${nf(K, 1)} J`, "e", { tone: "a", small: true, bold: true }));
    if (Q > 0.5) els.push(box(0, K * S, 1.2, U * S, "b"));
    els.push(txt(v(1.35, K * S + Math.max(Q * S, 0.35) / 2 + 0.2), `Q = ${nf(Q, 1)} J`, "e", { tone: "b", small: true, bold: true }));
    els.push(txt(v(0.6, U * S + 0.1), `mgs = ${nf(U, 1)} J`, "n", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-0.6, Math.max(U * S, 4.0) + 0.5, 5.2, -0.4));
    return { els, readout: [`t = ${nf(t, 1)} s: s = ${nf(s, 2)} m, v = ${nf(sp, 2)} m/s.`, `mgs = ${nf(U, 1)} J = K ${nf(K, 1)} J + Q ${nf(Q, 1)} J.`] };
  },
};

/* ===================== Sabit ivmeli hareket grafikleri ===================== */

const tangentSecant: FigureDef = {
  caption:
    "x(t) = 3 − 4t + t² (m), v(t) = −4 + 2t, a = 2 m/s². Zamanı değiştir: dolu doğru o andaki teğettir, eğimi anlık hızdır. Kesikli sekant 0–4 s uçlarını birleştirir: x(0) = x(4) = 3 m olduğundan ortalama hız 0’dır. t = 2 s’de teğet yataydır (v = 0) ama ivme yine +2 m/s².",
  alt: "Yatay eksende saniye, düşey eksende metre; yukarı açılan parabol, seçili noktada teğet doğru, 0 ve 4 saniyedeki noktaları birleştiren yatay kesikli sekant.",
  param: { label: "Zaman t", min: 0, max: 5, step: 0.5, init: 1 },
  draw: (t) => {
    const x = (s: number) => 3 - 4 * s + s * s, vv = (s: number) => -4 + 2 * s, X = (s: number) => s * 1.5, Y = (m: number) => (m + 1.5) * 0.45, y0 = Y(0);
    const els: El[] = [vec(v(0, y0), v(8.0, y0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, Y(8.5)), { tone: "ink", thin: true })];
    els.push(txt(v(8.05, y0), "t (s)", "se", { tone: "ink", small: true }), txt(v(0, Y(8.5)), "x (m)", "n", { tone: "ink", small: true }));
    els.push(poly(curve(x, 0, 5, 60, X, Y), { open: true, tone: "a", bold: true }));
    els.push(seg(v(X(0), Y(3)), v(X(4), Y(3)), { tone: "b", dash: true }));
    const t0 = Math.max(0, t - 1.1), t1 = Math.min(5, t + 1.1);
    els.push(seg(v(X(t0), Y(x(t) + vv(t) * (t0 - t))), v(X(t1), Y(x(t) + vv(t) * (t1 - t))), { tone: "warn", bold: true }));
    els.push(pt(v(X(t), Y(x(t))), `v = ${nf(vv(t), 1)} m/s`, t < 2 ? "ne" : "nw", "warn"));
    for (const s of [2, 4]) els.push(seg(v(X(s), y0 - 0.07), v(X(s), y0 + 0.07), { tone: "muted", thin: true }), txt(v(X(s), y0 + 0.1), String(s), "n", { tone: "muted", small: true, soft: true }));
    els.push(...ytick(0, Y(3), "3"), ...ytick(0, Y(8), "8"));
    els.push(...pad(-0.9, Y(8.5) + 0.5, 9.0, -0.4));
    return { els, readout: [`t = ${nf(t, 1)} s: x = ${nf(x(t), 2)} m, teğet eğimi v = ${nf(vv(t), 1)} m/s.`, "Sekant (0–4 s): (3 − 3)/4 = 0 m/s ortalama hız; yol ise 4 + 4 = 8 m."] };
  },
};

const signedArea: FigureDef = {
  caption:
    "v(t) = 6 − 2t, 1 ≤ t ≤ 5 s; uç hızlar +4 ve −4 m/s, hız sıfırı t = 3 s. Bitişi değiştir: eksenin üstündeki alan pozitif, altındaki negatif yer değiştirmedir. 1–5 s’de +4 m ve −4 m: yer değiştirme 0, yol 8 m. Alanı hız sıfırında böl.",
  alt: "Yatay eksende saniye, düşey eksende metre bölü saniye; 1’den 5’e azalan doğru, 3 saniyeye kadar eksen üstünde dolu üçgen, sonra eksen altında farklı dolgulu üçgen.",
  param: { label: "Bitiş t₂", min: 1, max: 5, step: 0.5, init: 5, unit: " s" },
  draw: (t2) => {
    const vv = (s: number) => 6 - 2 * s, X = (s: number) => s * 1.5, Y = (u: number) => u * 0.45;
    const els: El[] = [...axes(v(0, 0), 8.4, 2.4, "t (s)", "v (m/s)", 2.4)];
    const ta = Math.min(t2, 3);
    if (ta > 1) els.push(poly([v(X(1), 0), v(X(1), Y(4)), v(X(ta), Y(vv(ta))), v(X(ta), 0)], { fill: "a", tone: "a", thin: true }));
    if (t2 > 3) els.push(poly([v(X(3), 0), v(X(t2), Y(vv(t2))), v(X(t2), 0)], { fill: "warn", tone: "warn", thin: true }));
    els.push(seg(v(X(1), Y(4)), v(X(5), Y(-4)), { tone: "ink", bold: true }));
    const A1 = ta > 1 ? ((4 + vv(ta)) / 2) * (ta - 1) : 0, A2 = t2 > 3 ? (vv(t2) / 2) * (t2 - 3) : 0;
    if (A1 > 0.3) els.push(txt(v(X((1 + ta) / 2), Y(vv((1 + ta) / 2) / 2)), `+${nf(A1, 2)}`, "c", { tone: "ink", small: true, bold: true }));
    if (A2 < -0.3) els.push(txt(v(X((3 + t2) / 2 + 0.15), Y(vv((3 + t2) / 2) / 2)), nf(A2, 2), "c", { tone: "ink", small: true, bold: true }));
    for (const s of [1, 3, 5]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, Y(4), "4"), ...ytick(0, Y(-4), "−4"));
    els.push(...pad(-0.9, 2.6, 9.0, -2.6));
    return { els, readout: [`Δx = ${nf(A1, 2)} + (${nf(A2, 2)}) = ${nf(A1 + A2, 2)} m.`, `Yol = ${nf(A1, 2)} + ${nf(-A2, 2)} = ${nf(A1 - A2, 2)} m.`] };
  },
};

const accelArea: FigureDef = {
  caption:
    "İki cisim aynı a–t grafiğine sahip: 3 s boyunca +2 m/s², alan Δv = +6 m/s. Zamanı değiştir: ilk hızı −8 m/s olan cisim −2 m/s’ye gelir (sürati azalır), +1 m/s olan +7 m/s’ye çıkar (sürati artar). Alan son hızı değil hız değişimini verir; vson = vilk + Δv.",
  alt: "Yatay eksende saniye, düşey eksende hız; aynı eğimli iki paralel doğru, biri eksi sekizden eksi ikiye, diğeri birden yediye; seçili zamanda iki nokta.",
  param: { label: "Zaman t", min: 0, max: 3, step: 0.5, init: 3, unit: " s" },
  draw: (t) => {
    const X = (s: number) => s * 2.2, Y = (u: number) => u * 0.3;
    const els: El[] = [...axes(v(0, 0), 7.4, 2.6, "t (s)", "v (m/s)", 2.7)];
    els.push(seg(v(X(0), Y(-8)), v(X(3), Y(-2)), { tone: "b", bold: true }), seg(v(X(0), Y(1)), v(X(3), Y(7)), { tone: "a", bold: true }));
    els.push(pt(v(X(t), Y(-8 + 2 * t)), `${nf(-8 + 2 * t, 1)}`, "se", "b"), pt(v(X(t), Y(1 + 2 * t)), `${nf(1 + 2 * t, 1)}`, "nw", "a"));
    for (const s of [1, 2, 3]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, Y(-8), "−8"), ...ytick(0, Y(7), "7"));
    els.push(box(X(3) + 0.6, 0, X(3) + 1.0, Y(2 * t), "c"), txt(v(X(3) + 1.15, Y(t)), `Δv = ${nf(2 * t, 1)}`, "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-0.9, 2.9, 10.2, -2.9));
    return { els, readout: [`Δv = 2·${nf(t, 1)} = ${nf(2 * t, 1)} m/s (iki cisim için aynı).`, `vilk = −8 ⇒ ${nf(-8 + 2 * t, 1)} m/s; vilk = +1 ⇒ ${nf(1 + 2 * t, 1)} m/s.`] };
  },
};

const stepAccel: FigureDef = {
  caption:
    "Örnek iki evre: x₀ = 0, v₀ = 0; 0–3 s a₁ = +2 m/s², 3–6 s a₂ = −3 m/s². Zamanı değiştir: ivme 3 s’de basamakla sıçrar ama hız kopmaz (kırık doğru), konum eğrisi teğeti ortak iki parabol parçasıdır. Ortak imleç üç panelde aynı anı gösterir; x–t’nin yatay teğeti (5 s) v = 0 ile çakışır.",
  alt: "Üst üste üç panel: konum–zaman iki parabol parçası, hız–zaman kırık doğru, ivme–zaman basamak; üç panelden geçen dikey zaman imleci.",
  param: { label: "Zaman t", min: 0, max: 6, step: 0.5, init: 4 },
  maxHeight: 560,
  draw: (t) => {
    const x = (s: number) => (s <= 3 ? s * s : 9 + 6 * (s - 3) - 1.5 * (s - 3) ** 2);
    const vv = (s: number) => (s <= 3 ? 2 * s : 6 - 3 * (s - 3));
    const a = (s: number) => (s < 3 ? 2 : -3);
    const X = (s: number) => s * 1.2, yx = 6.4, yv = 3.2, ya = 0.0;
    const els: El[] = [];
    for (const [y0, name, neg] of [[yx, "x (m)", 0], [yv, "v (m/s)", 0.6], [ya, "a (m/s²)", 0.8]] as const) els.push(...axes(v(0, y0), 7.6, 1.6, "t (s)", name, neg));
    els.push(poly(curve(x, 0, 6, 60, X, (m) => yx + m * 0.1), { open: true, tone: "a", bold: true }));
    els.push(poly(curve(vv, 0, 6, 12, X, (u) => yv + u * 0.2), { open: true, tone: "b", bold: true }));
    els.push(poly([v(X(0), ya + 0.4), v(X(3), ya + 0.4), v(X(3), ya - 0.6), v(X(6), ya - 0.6)], { open: true, tone: "warn", bold: true }));
    els.push(seg(v(X(t), ya - 0.8), v(X(t), yx + 1.6), { tone: "muted", dash: true, thin: true }));
    els.push(pt(v(X(t), yx + x(t) * 0.1), `${nf(x(t), 2)} m`, "nw", "a"), pt(v(X(t), yv + vv(t) * 0.2), `${nf(vv(t), 1)} m/s`, t > 4.5 ? "nw" : "ne", "b"));
    els.push(...ytick(0, ya + 0.4, "+2"), ...ytick(0, ya - 0.6, "−3"), ...ytick(0, yv + 1.2, "6"), ...ytick(0, yx + 1.5, "15"));
    for (const s of [3, 6]) els.push(...xtick(X(s), ya, String(s)));
    els.push(...pad(-1.0, yx + 2.1, 8.8, ya - 1.2));
    return { els, readout: [`t = ${nf(t, 1)} s: x = ${nf(x(t), 2)} m, v = ${nf(vv(t), 1)} m/s, a = ${t === 6 ? "−3" : a(t) > 0 ? "+2" : "−3"} m/s².`, "3 s’de: x = 9 m, v = 6 m/s; ikinci evre bu değerlerle başlar."] };
  },
};

export const physicsFigures060Motion: Record<string, Record<string, FigureDef>> = {
  "serbest-dusme-limit-hiz": {
    "Eşit zamanlarda mesafeler neden 1, 3, 5 gider?": strobe,
    "Net kuvvet küçülürken sürat yine artabilir": dragForces,
    "Tam denge ile dengeye yaklaşma farklıdır": tanhCurve,
    "Enerji kaybı toplam enerjinin yok olması değildir": dragEnergy,
  },
  "sabit-ivmeli-hareket-grafikleri": {
    "Konum grafiğinde teğet ile sekantı ayır": tangentSecant,
    "Hız grafiğinin altında kalan alan işaretlidir": signedArea,
    "İvme alanı son hızı başlangıçtan taşır": accelArea,
    "İvme basamaklanınca hız kopmaz": stepAccel,
  },
};
