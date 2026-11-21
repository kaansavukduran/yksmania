import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: gazlar. Açık uçlu manometre (fark ve mutlak basınç),
 * Charles doğrusu ve Kelvin ölçeği, aynı sıcaklıkta aynı ortalama enerji ama
 * farklı v_rms, Maxwell hız dağılımında üç ayrı hız, Graham oranı, d = PM/RT,
 * ortak hacimde kısmi basınç, su üstünde toplanan gaz, doygun buhar sınırı,
 * van der Waals modelinden Z–P eğrileri ve CO₂ / su faz şemaları. Bütün
 * sayılar formülden hesaplanır (R = 0,082 atm·L/(mol·K) ya da 8,314 J/(mol·K)).
 */

const R_SI = 8.314;
const R_ATM = 0.082;

/* ---------- ayt-gaz-ozellikleri ---------- */

const manometer: FigureDef = {
  caption:
    "Sürgüyle iki koldaki cıva düzeyleri arasındaki farkı (h) değiştir. Açık uçlu manometre gazın basıncını açık hava basıncına göre fark olarak gösterir: açık koldaki düzey yüksekse P_gaz = P₀ + h, alçaksa P_gaz = P₀ − h. PV = nRT için bu fark değil, mutlak basınç kullanılır. Çizim ölçekli değildir.",
  alt: "Solda gaz haznesi, sağda U borusu. Borunun alt kısmında cıva var; sol kol hazneye, sağ kol açık havaya açılıyor. İki kol arasındaki düzey farkı h ile gösteriliyor.",
  param: { label: "Düzey farkı h (açık kol yüksekse +)", min: -30, max: 30, step: 2, init: 14, unit: " cmHg" },
  draw: (h) => {
    const k = 0.05;
    const yL = 1.6 - (h * k) / 2;
    const yR = 1.6 + (h * k) / 2;
    const els: El[] = [];
    els.push(circle(v(0.2, 3.0), 0.7, { tone: "b", fill: "b" }), txt(v(0.2, 3.0), "gaz", "c", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(0.9, 3.1), v(2.1, 3.1), { tone: "ink" }), seg(v(0.9, 2.9), v(1.9, 2.9), { tone: "ink" }));
    els.push(poly([v(1.9, yL), v(1.9, 0), v(3.1, 0), v(3.1, yR), v(2.9, yR), v(2.9, 0.2), v(2.1, 0.2), v(2.1, yL)], { tone: "muted", fill: "muted" }));
    els.push(seg(v(1.9, 0), v(1.9, 2.9), { tone: "ink" }), seg(v(2.1, 0.2), v(2.1, 3.1), { tone: "ink" }));
    els.push(seg(v(2.9, 0.2), v(2.9, 3.6), { tone: "ink" }), seg(v(3.1, 0), v(3.1, 3.6), { tone: "ink" }), seg(v(1.9, 0), v(3.1, 0), { tone: "ink" }));
    els.push(txt(v(3.0, 3.6), "açık uç: P₀ = 76 cmHg", "n", { tone: "ink", small: true }));
    els.push(txt(v(2.5, 0), "Hg", "s", { tone: "muted", small: true, bold: true }));
    if (h !== 0) {
      els.push(seg(v(1.9, Math.min(yL, yR)), v(4.0, Math.min(yL, yR)), { tone: "muted", dash: true, thin: true }));
      els.push(seg(v(2.9, Math.max(yL, yR)), v(4.0, Math.max(yL, yR)), { tone: "muted", dash: true, thin: true }));
      els.push(seg(v(3.8, yL), v(3.8, yR), { tone: "warn", bold: true }));
      els.push(txt(v(3.9, 1.6), `h = ${Math.abs(h)} cm`, "e", { tone: "warn", small: true, bold: true }));
    }
    els.push(...pad(-0.8, 4.3, 6.4, -0.6));
    const P = 76 + h;
    return {
      els,
      readout: [
        h >= 0
          ? `Açık koldaki cıva ${h} cm yüksekte: P_gaz = 76 + ${h} = ${P} cmHg = ${nf(P / 76, 3)} atm (76 cmHg = 1 atm).`
          : `Gaz tarafındaki cıva ${-h} cm yüksekte: P_gaz = 76 − ${-h} = ${P} cmHg = ${nf(P / 76, 3)} atm.`,
        `Göstergeden okunan fark ${h > 0 ? "+" : h < 0 ? "−" : ""}${Math.abs(h)} cmHg; gaz denklemine giren mutlak değer ${P} cmHg.`,
      ],
    };
  },
};

const charles: FigureDef = {
  caption:
    "Sürgüyle sıcaklığı °C cinsinden değiştir: 1 mol ideal gaz, 1 atm. Hacim Kelvin sıcaklığıyla doğru orantılıdır (V = nRT/P). Doğru °C ekseninde −273,15'e uzatılınca sıfıra iner; kesikli kısım yalnız ideal modelin uzantısıdır, gerçek gaz o sıcaklıklara inmeden yoğuşur.",
  alt: "Hacim–sıcaklık grafiği. Yatay eksen °C, dikey eksen litre. Düz çizgi −50 °C ile 300 °C arasında, kesikli uzantısı −273,15 °C'de sıfır hacme iniyor. Sürgüyle hareket eden nokta seçili sıcaklığı gösteriyor.",
  param: { label: "Sıcaklık t", min: -50, max: 300, step: 1, init: 27, unit: " °C" },
  draw: (t) => {
    const X = (c: number) => 3.0 + c * 0.0105;
    const Y = (vol: number) => vol * 0.08;
    const Vof = (c: number) => R_ATM * (c + 273.15);
    const els: El[] = [];
    els.push(vec(v(X(-300), 0), v(X(330), 0), { tone: "ink", thin: true }), vec(v(X(0), 0), v(X(0), Y(52)), { tone: "ink", thin: true }));
    els.push(txt(v(X(330), 0), "t (°C)", "se", { tone: "ink", small: true }), txt(v(X(0), Y(52)), "V (L)", "n", { tone: "ink", small: true }));
    els.push(seg(v(X(-273.15), 0), v(X(-50), Y(Vof(-50))), { tone: "c", dash: true }));
    els.push(poly(curve(Vof, -50, 300, 4, X, Y), { tone: "c", open: true, bold: true }));
    els.push(...xtick(X(-273.15), 0, "−273,15"), ...xtick(X(100), 0, "100"), ...xtick(X(200), 0, "200"));
    els.push(...ytick(X(0), Y(20), "20"), ...ytick(X(0), Y(40), "40"));
    const Vt = Vof(t);
    els.push(seg(v(X(t), 0), v(X(t), Y(Vt)), { tone: "muted", dash: true, thin: true }), ball(v(X(t), Y(Vt)), 0.11, "warn"));
    els.push(txt(v(X(-160), Y(10)), "ideal uzantı", "n", { tone: "muted", small: true }));
    els.push(...pad(-0.4, Y(56), X(330) + 1.0, -0.7));
    const T = t + 273.15;
    return {
      els,
      readout: [
        `T = ${t} + 273,15 = ${nf(T, 2)} K → V = 1 mol · 0,082 · ${nf(T, 2)} K ÷ 1 atm = ${nf(Vt, 1)} L`,
        "27 °C → 300,15 K, 54 °C → 327,15 K: °C iki katına çıkınca mutlak sıcaklık yalnız 1,09 katına çıkar.",
      ],
    };
  },
};

const sameT: FigureDef = {
  caption:
    "Sürgüyle sıcaklığı değiştir. Aynı T'de He ve O₂ taneciklerinin ortalama öteleme kinetik enerjisi aynıdır (3kT/2), çubuklar eşit uzunlukta kalır. v_rms = √(3RT/M) ise mol kütlesine bağlıdır: O₂'nin mol kütlesi He'nin 8 katı olduğundan v_rms'si √8 ≈ 2,83 kat küçüktür.",
  alt: "Dört yatay çubuk: üstte He ve O₂ için ortalama kinetik enerji (eşit), altta He ve O₂ için v_rms (He çubuğu yaklaşık 2,8 kat uzun).",
  param: { label: "Sıcaklık T", min: 200, max: 800, step: 50, init: 300, unit: " K" },
  draw: (T) => {
    const ek = 1.5 * 1.380649e-23 * T;
    const vHe = Math.sqrt((3 * R_SI * T) / 0.004);
    const vO2 = Math.sqrt((3 * R_SI * T) / 0.032);
    const els: El[] = [];
    const rows: { label: string; w: number; value: string; tone: Tone; y: number }[] = [
      { label: "He · Ek", w: (ek / 1e-21) * 0.3, value: `${nf(ek / 1e-21, 2)}×10⁻²¹ J`, tone: "a", y: 3.3 },
      { label: "O₂ · Ek", w: (ek / 1e-21) * 0.3, value: `${nf(ek / 1e-21, 2)}×10⁻²¹ J`, tone: "b", y: 2.6 },
      { label: "He · v_rms", w: vHe * 0.0022, value: `${nf(vHe, 0)} m/s`, tone: "a", y: 1.2 },
      { label: "O₂ · v_rms", w: vO2 * 0.0022, value: `${nf(vO2, 0)} m/s`, tone: "b", y: 0.5 },
    ];
    for (const r of rows) {
      els.push(box(0, r.y - 0.22, r.w, r.y + 0.22, r.tone));
      els.push(txt(v(-0.15, r.y), r.label, "w", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(r.w + 0.12, r.y), r.value, "e", { tone: r.tone, small: true, bold: true }));
    }
    els.push(seg(v(0, 0), v(0, 3.8), { tone: "ink", thin: true }));
    els.push(...pad(-2.6, 4.1, 7.6, 0));
    return {
      els,
      readout: [
        `Ek = 3kT/2 = 1,5 · 1,38×10⁻²³ J/K · ${T} K = ${nf(ek / 1e-21, 2)}×10⁻²¹ J (iki gaz için aynı)`,
        `v_rms(He) = √(3 · 8,314 · ${T} ÷ 0,004) = ${nf(vHe, 0)} m/s · v_rms(O₂) = √(3 · 8,314 · ${T} ÷ 0,032) = ${nf(vO2, 0)} m/s (M kg/mol)`,
      ],
    };
  },
};

/* ---------- ayt-kinetik-yogunluk ---------- */

const maxwell: FigureDef = {
  caption:
    "Sürgüyle O₂ gazının sıcaklığını değiştir. Eğri, taneciklerin hangi süratlerde bulunduğunu gösteren Maxwell dağılımıdır; alanı her sıcaklıkta aynı kalır. En olası hız (tepe), ortalama sürat ve v_rms üç ayrı sayıdır ve hep bu sırayla büyür: √2 : √(8/π) : √3.",
  alt: "Yatay eksen sürat (m/s), dikey eksen tanecik payı. Tek tepeli, sağa uzanan eğri; üç dikey kesikli çizgi en olası hız, ortalama sürat ve v_rms değerlerini gösteriyor. Sıcaklık artınca tepe sağa kayıp alçalıyor.",
  param: { label: "Sıcaklık T", min: 200, max: 1000, step: 50, init: 300, unit: " K" },
  draw: (T) => {
    const M = 0.032;
    const a = M / (2 * R_SI * T);
    const f = (s: number) => 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * s * s * Math.exp(-a * s * s);
    const X = (s: number) => s * 0.005;
    const Y = (y: number) => y * 1250;
    const els: El[] = [...axes(v(0, 0), X(1600), Y(0.0043), "sürat (m/s)", "tanecik payı")];
    els.push(poly(curve(f, 0, 1500, 120, X, Y), { tone: "c", open: true, bold: true, smooth: true }));
    for (const s of [500, 1000, 1500]) els.push(...xtick(X(s), 0, String(s)));
    const vp = Math.sqrt((2 * R_SI * T) / M);
    const va = Math.sqrt((8 * R_SI * T) / (Math.PI * M));
    const vr = Math.sqrt((3 * R_SI * T) / M);
    const top = Y(f(vp));
    const marks: [number, string, Tone, "nw" | "n" | "ne", number][] = [
      [vp, "en olası", "a", "nw", top + 0.35],
      [va, "ortalama", "b", "n", top + 0.85],
      [vr, "v_rms", "warn", "ne", top + 0.35],
    ];
    for (const [s, label, tone, at, h] of marks) {
      els.push(seg(v(X(s), 0), v(X(s), h), { tone, dash: true }));
      els.push(txt(v(X(s), h), label, at, { tone, small: true, bold: true }));
    }
    els.push(...pad(-0.6, 5.9, X(1600) + 1.2, -0.7));
    return {
      els,
      readout: [
        `En olası √(2RT/M) = ${nf(vp, 0)} m/s · ortalama √(8RT/πM) = ${nf(va, 0)} m/s · v_rms √(3RT/M) = ${nf(vr, 0)} m/s`,
        "M = 32 g/mol = 0,032 kg/mol girilir; gram girilseydi hızlar √1000 ≈ 31,6 kat büyük çıkardı.",
      ],
    };
  },
};

const graham: FigureDef = {
  caption:
    "İleri ile gaz çiftlerini değiştir. Aynı sıcaklık ve basınçta, küçük delikten geçişte hız oranı r₁/r₂ = √(M₂/M₁): hafif gaz daha hızlı geçer. Oklar geçiş hızıyla orantılı çizildi. Eşit miktarın geçiş süresi hızla ters orantılıdır.",
  alt: "Üst üste iki kap, her birinin sağ duvarında küçük bir delik ve delikten çıkan bir ok. Hafif gazın oku daha uzun.",
  steps: ["He ve O₂", "H₂ ve O₂", "CH₄ ve SO₂"],
  draw: (_v, step) => {
    const pairs: [string, number, string, number][] = [
      ["He", 4, "O₂", 32],
      ["H₂", 2, "O₂", 32],
      ["CH₄", 16, "SO₂", 64],
    ];
    const [g1, m1, g2, m2] = pairs[step];
    const ratio = Math.sqrt(m2 / m1);
    const els: El[] = [];
    const row = (y: number, name: string, M: number, L: number, tone: Tone) => {
      els.push(box(0.05, y + 0.05, 2.55, y + 1.35, tone));
      els.push(seg(v(0, y), v(2.6, y), { tone: "ink" }), seg(v(0, y + 1.4), v(2.6, y + 1.4), { tone: "ink" }), seg(v(0, y), v(0, y + 1.4), { tone: "ink" }));
      els.push(seg(v(2.6, y), v(2.6, y + 0.55), { tone: "ink", bold: true }), seg(v(2.6, y + 0.85), v(2.6, y + 1.4), { tone: "ink", bold: true }));
      els.push(txt(v(1.3, y + 0.7), `${name} · ${M} g/mol`, "c", { tone: "ink", small: true, bold: true }));
      els.push(vec(v(2.75, y + 0.7), v(2.75 + L, y + 0.7), { tone, bold: true }));
    };
    row(2.0, g1, m1, ratio * 1.1, "a");
    row(0, g2, m2, 1.1, "b");
    els.push(txt(v(2.75 + ratio * 1.1, 2.7), `${nf(ratio, 2)} birim`, "e", { tone: "a", small: true }));
    els.push(txt(v(3.85, 0.7), "1 birim", "e", { tone: "b", small: true }));
    els.push(...pad(-0.3, 3.8, 8.6, -0.3));
    return {
      els,
      readout: [
        `r(${g1}) / r(${g2}) = √(${m2} ÷ ${m1}) = ${nf(ratio, 2)}`,
        `Aynı miktarın geçişi: t(${g2}) / t(${g1}) = ${nf(ratio, 2)}. Bağıntı yalnız aynı T ve P'de, küçük delikten geçiş koşulunda kullanılır.`,
      ],
    };
  },
};

const density: FigureDef = {
  caption:
    "Sürgüyle sıcaklığı değiştir; basınç 1 atm. d = PM/(RT) olduğundan aynı P ve T'de yoğunluk mol kütlesiyle doğru orantılıdır: çubukların oranı her sıcaklıkta aynı kalır, sıcaklık artınca hepsi aynı oranda kısalır.",
  alt: "Beş dikey çubuk: H₂, He, N₂, O₂ ve CO₂ gazlarının yoğunluğu; çubuklar mol kütlesiyle aynı sırada uzuyor.",
  param: { label: "Sıcaklık T", min: 250, max: 600, step: 25, init: 275, unit: " K" },
  draw: (T) => {
    const gases: [string, number][] = [
      ["H₂", 2],
      ["He", 4],
      ["N₂", 28],
      ["O₂", 32],
      ["CO₂", 44],
    ];
    const els: El[] = [vec(v(0, 0), v(7.2, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 4.0), { tone: "ink", thin: true })];
    els.push(txt(v(0, 4.0), "d (g/L)", "n", { tone: "ink", small: true }));
    gases.forEach(([name, M], i) => {
      const d = (1 * M) / (R_ATM * T);
      const x = 0.7 + i * 1.35;
      const h = d * 1.6;
      els.push(box(x - 0.35, 0, x + 0.35, Math.max(h, 0.02), i < 2 ? "a" : "b"));
      els.push(txt(v(x, 0), name, "s", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(x, Math.max(h, 0.02)), nf(d, 2), "n", { tone: "ink", small: true }));
    });
    els.push(...pad(-0.5, 4.5, 7.6, -0.6));
    const dO2 = 32 / (R_ATM * T);
    return {
      els,
      readout: [
        `d(O₂) = 1 atm · 32 g/mol ÷ (0,082 · ${T} K) = ${nf(dO2, 2)} g/L (atm·g/mol ÷ atm·L/mol = g/L)`,
        "Aynı P ve T: d(CO₂) / d(He) = 44 / 4 = 11. P ya da T farklıysa yoğunluk oranı mol kütlesi oranı değildir.",
      ],
    };
  },
};

/* ---------- ayt-kismi-basinci-suustu ---------- */

const shared: FigureDef = {
  caption:
    "Sürgüyle kaba eklenen B gazının molünü değiştir (8,2 L, 300 K, A: 0,4 mol). Her iki tür kabın bütün hacmine yayılır; her biri kendi molüyle Pᵢ = nᵢRT/V basıncını yapar. A'nın kısmi basıncı B eklense de değişmez; toplam basınç ve A'nın mol kesri değişir. Her nokta 0,1 mol.",
  alt: "Solda bir kap, içinde karışık dağılmış A (dolu) ve B (halka) tanecikleri; sağda üst üste iki parçalı çubuk: alt parça P_A, üst parça P_B.",
  param: { label: "B gazı", min: 0, max: 0.8, step: 0.1, init: 0.3, unit: " mol" },
  draw: (nB) => {
    const nA = 0.4;
    const k = (R_ATM * 300) / 8.2;
    const pA = nA * k;
    const pB = nB * k;
    const els: El[] = [poly([v(0, 0), v(3.4, 0), v(3.4, 3.4), v(0, 3.4)], { tone: "ink" })];
    const nb = Math.round(nB * 10);
    const spots: V[] = [];
    for (let i = 0; i < 12; i++) spots.push(v(0.5 + (i % 4) * 0.8 + ((i * 7) % 3) * 0.12, 0.55 + Math.floor(i / 4) * 1.05 + ((i * 5) % 4) * 0.1));
    for (let i = 0; i < 4; i++) els.push(circle(spots[i * 3], 0.13, { tone: "a", fill: "a" }));
    const free = spots.filter((_, i) => i % 3 !== 0);
    for (let i = 0; i < nb; i++) els.push(circle(free[i], 0.13, { tone: "b" }));
    els.push(txt(v(1.7, 0), "8,2 L · 300 K", "s", { tone: "ink", small: true }));
    const bx = 4.6;
    const S = 0.75;
    els.push(box(bx, 0, bx + 0.8, pA * S, "a"));
    if (pB > 0) els.push(box(bx, pA * S, bx + 0.8, (pA + pB) * S, "b", false));
    els.push(txt(v(bx + 0.9, (pA * S) / 2), `P_A = ${nf(pA, 2)} atm`, "e", { tone: "a", small: true, bold: true }));
    if (pB > 0) els.push(txt(v(bx + 0.9, pA * S + (pB * S) / 2), `P_B = ${nf(pB, 2)} atm`, "e", { tone: "b", small: true, bold: true }));
    els.push(seg(v(bx - 0.2, 0), v(bx + 1.0, 0), { tone: "ink", thin: true }));
    els.push(...pad(-0.3, 3.9, 8.8, -0.6));
    const xA = nA / (nA + nB);
    return {
      els,
      readout: [
        `P_A = 0,4 mol · 0,082 · 300 K ÷ 8,2 L = ${nf(pA, 2)} atm · P_B = ${nf(nB, 1)} · 3 = ${nf(pB, 2)} atm · P_toplam = ${nf(pA + pB, 2)} atm`,
        `Denetim: x_A = 0,4 ÷ ${nf(nA + nB, 1)} = ${nf(xA, 3)} → x_A · P_toplam = ${nf(xA * (pA + pB), 2)} atm = P_A`,
      ],
    };
  },
};

const PSAT: Record<number, number> = { 15: 12.8, 20: 17.5, 25: 23.8, 30: 31.8, 35: 42.2 };
const wetGas: FigureDef = {
  caption:
    "Sürgüyle suyun sıcaklığını değiştir. Ters çevrilmiş tüpte su üstünde toplanan X gazı su buharıyla birliktedir. İç ve dış su düzeyleri eşitlendiğinde tüpteki toplam basınç açık hava basıncına (760 mmHg) eşittir; kuru X'in basıncı P_X = P_toplam − P_su. Su buharı basınçları yaklaşık tablo değerleridir.",
  alt: "Su dolu tekne içinde ters çevrilmiş tüp; tüpün üst kısmında gaz, alt kısmında su; iç ve dış su düzeyi aynı yükseklikte. Sağda 760 mmHg'lik çubuk iki parçaya bölünmüş: P_X ve P_su.",
  param: { label: "Su sıcaklığı", min: 15, max: 35, step: 5, init: 25, unit: " °C" },
  draw: (t) => {
    const pw = PSAT[t] ?? 23.8;
    const px = 760 - pw;
    const els: El[] = [];
    els.push(poly([v(0, 1.6), v(0, 0), v(4.0, 0), v(4.0, 1.6)], { tone: "ink", open: true }));
    els.push(box(0.05, 0.05, 3.95, 1.2, "b"));
    els.push(poly([v(1.4, 0.3), v(1.4, 3.6), v(2.6, 3.6), v(2.6, 0.3)], { tone: "ink", open: true }));
    els.push(box(1.45, 1.2, 2.55, 3.55, "c"));
    els.push(txt(v(2.0, 2.4), "X + H₂O(g)", "c", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(0.1, 1.2), v(3.9, 1.2), { tone: "muted", dash: true, thin: true }));
    els.push(txt(v(4.0, 1.2), "düzeyler eşit", "e", { tone: "muted", small: true }));
    const bx = 5.6;
    const S = 0.0045;
    els.push(box(bx, 0, bx + 0.8, px * S, "c"), box(bx, px * S, bx + 0.8, 760 * S, "b"));
    els.push(txt(v(bx + 0.9, (px * S) / 2), `P_X = ${nf(px, 1)}`, "e", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(bx + 0.9, px * S + (pw * S) / 2), `P_su = ${nf(pw, 1)}`, "e", { tone: "b", small: true, bold: true }));
    els.push(txt(v(bx + 0.4, 760 * S), "760 mmHg", "n", { tone: "ink", small: true }));
    els.push(...pad(-0.3, 4.1, 9.2, -0.3));
    return {
      els,
      readout: [
        `${t} °C: P_su ≈ ${nf(pw, 1)} mmHg → P_X = 760 − ${nf(pw, 1)} = ${nf(px, 1)} mmHg = ${nf(px / 760, 3)} atm`,
        "Kuru gazın molü n = P_X·V/(RT) ile bulunur; toplam basınçla hesaplanırsa su buharı da X sayılmış olur.",
      ],
    };
  },
};

const saturation: FigureDef = {
  caption:
    "Sürgüyle 10,0 L'lik kapalı kaba konan suyun molünü değiştir (25 °C, P_sat ≈ 23,8 mmHg = 0,0313 atm). Doygun buhar için gereken mol n* = P_sat·V/(RT). Su n*'dan azsa tümü buhardır ve basınç P_sat'ın altında kalır; fazlası sıvı olarak kalır, basınç P_sat'ta sabitlenir.",
  alt: "Su buharı basıncı–konan su molü grafiği: n*'a kadar düz yükselen, sonra yatay kalan çizgi; seçili miktarı gösteren nokta. Sağda kap, içinde varsa sıvı su katmanı.",
  param: { label: "Konan su", min: 0, max: 30, step: 2, init: 8, unit: " mmol" },
  draw: (mmol) => {
    const n = mmol / 1000;
    const psat = 23.8 / 760;
    const T = 298;
    const nStar = (psat * 10) / (R_ATM * T);
    const P = (x: number) => Math.min((x * R_ATM * T) / 10, psat);
    const X = (x: number) => x * 160;
    const Y = (p: number) => p * 80;
    const els: El[] = [...axes(v(0, 0), X(0.032), Y(0.042), "n(H₂O) mol", "P_su (atm)")];
    els.push(poly([v(0, 0), v(X(nStar), Y(psat)), v(X(0.03), Y(psat))], { tone: "c", open: true, bold: true }));
    els.push(seg(v(X(nStar), 0), v(X(nStar), Y(psat)), { tone: "muted", dash: true, thin: true }), ...xtick(X(nStar), 0, "n*"));
    els.push(...ytick(0, Y(psat), "0,0313"));
    els.push(ball(v(X(n), Y(P(n))), 0.11, "warn"));
    const cx = 6.0;
    els.push(poly([v(cx, 0), v(cx + 1.6, 0), v(cx + 1.6, 2.6), v(cx, 2.6)], { tone: "ink" }));
    const liquid = Math.max(0, n - nStar);
    if (liquid > 1e-9) els.push(box(cx + 0.05, 0.05, cx + 1.55, 0.05 + liquid * 30, "b"));
    const dots = Math.round((Math.min(n, nStar) / nStar) * 8);
    for (let i = 0; i < dots; i++) els.push(circle(v(cx + 0.35 + (i % 3) * 0.45, 1.0 + Math.floor(i / 3) * 0.5 + (i % 2) * 0.12), 0.08, { tone: "c", fill: "c" }));
    els.push(txt(v(cx + 0.8, 2.6), liquid > 1e-9 ? "sıvı + doygun buhar" : n === 0 ? "boş" : "yalnız buhar", "n", { tone: "ink", small: true }));
    els.push(...pad(-0.8, 3.9, 8.6, -0.7));
    const state =
      n === 0
        ? "Kapta su yok."
        : liquid > 1e-9
          ? `n > n*: ${nf(nStar, 4)} mol buhar, ${nf(liquid, 4)} mol sıvı; basınç P_sat = 0,0313 atm.`
          : `n ≤ n*: tümü buhar; P_su = ${nf(n, 3)} · 0,082 · 298 ÷ 10,0 = ${nf(P(n), 4)} atm${Math.abs(n - nStar) < 0.001 ? " (sınıra yakın)" : ""}.`;
    return { els, readout: [`n* = 0,0313 atm · 10,0 L ÷ (0,082 · 298 K) = ${nf(nStar, 4)} mol`, state] };
  },
};

/* ---------- ayt-gercek-gaz-faz ---------- */

const VDW: [string, number, number, Tone][] = [
  ["H₂", 0.244, 0.0266, "a"],
  ["N₂", 1.39, 0.0391, "b"],
  ["CO₂", 3.59, 0.0427, "warn"],
];
function zVdw(P: number, a: number, b: number, T = 400) {
  if (P <= 0) return 1;
  const R = 0.082057;
  let lo = b * 1.0001;
  let hi = (R * T) / P * 2 + 1;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    if (R * T / (m - b) - a / (m * m) - P > 0) lo = m;
    else hi = m;
  }
  return (P * (lo + hi)) / 2 / (R * T);
}
const zCurves: FigureDef = {
  caption:
    "Sürgüyle basıncı değiştir. Eğriler aynı sıcaklıkta (400 K) üç gaz için van der Waals modeliyle hesaplanmış Z = PV/(nRT) değerleridir; ölçüm verisi değil, model eğilimidir. Kesikli Z = 1 ideal çizgidir. CO₂'de önce çekim baskın (Z < 1), yüksek basınçta öz hacim baskın (Z > 1). H₂ ile N₂ eğrileri yüksek basınçta kesişir: sıra basınç aralığına bağlıdır.",
  alt: "Z–P grafiği, 0–600 atm. Kesikli yatay Z = 1 çizgisi. H₂ eğrisi düzgün yükselir; N₂ önce 1'e yakın kalıp sonra yükselir; CO₂ önce belirgin biçimde 1'in altına iner, sonra yükselir. Sürgüyle hareket eden dikey çizgi.",
  param: { label: "Basınç P", min: 0, max: 600, step: 25, init: 150, unit: " atm" },
  draw: (P) => {
    const X = (p: number) => p * 0.012;
    const Y = (z: number) => (z - 0.5) * 3.6;
    const els: El[] = [...axes(v(0, 0), X(640), Y(1.62), "P (atm)", "Z")];
    els.push(seg(v(0, Y(1)), v(X(600), Y(1)), { tone: "muted", dash: true }));
    els.push(...ytick(0, Y(1), "1"), ...ytick(0, Y(0.6), "0,6"), ...ytick(0, Y(1.4), "1,4"));
    for (const p of [200, 400, 600]) els.push(...xtick(X(p), 0, String(p)));
    const ends: [number, string, Tone][] = [];
    for (const [name, a, b, tone] of VDW) {
      els.push(poly(curve((p) => zVdw(p, a, b), 0, 600, 60, X, Y), { tone, open: true, bold: true, smooth: true }));
      ends.push([zVdw(600, a, b), name, tone]);
    }
    ends.sort((p, q) => q[0] - p[0]);
    ends.forEach(([z, name, tone], i) => els.push(txt(v(X(600) + 0.1, Y(z) + (i === 0 ? 0.12 : i === 1 ? -0.12 : 0)), name, "e", { tone, small: true, bold: true })));
    els.push(seg(v(X(P), 0), v(X(P), Y(1.55)), { tone: "muted", thin: true }));
    for (const [, a, b, tone] of VDW) els.push(ball(v(X(P), Y(zVdw(P, a, b))), 0.09, tone));
    els.push(...pad(-0.8, Y(1.75), X(640) + 1.0, -0.7));
    const zs = VDW.map(([name, a, b]) => `${name} ${nf(zVdw(P, a, b), 3)}`);
    return {
      els,
      readout: [`${P} atm, 400 K: Z → ${zs.join(" · ")}`, "Z < 1: P ideal nRT/V'den küçük (çekim). Z > 1: büyük (taneciklerin öz hacmi). Tek noktada Z ≈ 1 olması gazın her koşulda ideal olduğunu göstermez."],
    };
  },
};

/** Şematik CO₂ faz şeması: üçlü nokta (3,1.6), kritik nokta (6.2,3.8). */
function co2Base(els: El[]) {
  els.push(...axes(v(0, 0), 8.2, 5.0, "T", "P"));
  const tp = v(3, 1.6);
  const cp = v(6.2, 3.8);
  els.push(poly([v(0.4, 0.15), v(1.6, 0.5), v(2.4, 0.95), tp], { tone: "ink", open: true, bold: true, smooth: true }));
  els.push(poly([tp, v(4.2, 2.2), v(5.3, 2.95), cp], { tone: "ink", open: true, bold: true, smooth: true }));
  els.push(seg(tp, v(3.7, 4.8), { tone: "ink", bold: true }));
  return { tp, cp };
}
const triple: FigureDef = {
  caption:
    "İleri ile CO₂'nin şematik faz şemasını oku (ölçekli değil). Üç sınır eğrisi üçlü noktada (−56,4 °C; 5,11 atm) buluşur: bu tek bir T, P çiftidir. 1 atm üçlü nokta basıncının altında olduğundan sabit 1 atm'de ısıtılan katı CO₂ sıvı bölgesine girmeden doğrudan gaza geçer (süblimleşme).",
  alt: "Sıcaklık yatay, basınç dikey eksende faz şeması: katı (sol üst), sıvı (orta üst), gaz (sağ alt) bölgeleri; üç eğrinin buluştuğu üçlü nokta işaretli. Son adımda üçlü noktanın altından geçen yatay 1 atm çizgisi ve üzerinde soldan sağa ok.",
  steps: ["Bölgeler ve sınırlar", "Üçlü nokta", "1 atm'de ısıtma"],
  draw: (_v, step) => {
    const els: El[] = [];
    const { tp } = co2Base(els);
    els.push(txt(v(1.3, 3.4), "katı", "c", { tone: "a", bold: true }), txt(v(4.6, 3.9), "sıvı", "c", { tone: "b", bold: true }), txt(v(6.9, 0.3), "gaz", "c", { tone: "c", bold: true }));
    if (step >= 1) {
      els.push(ball(tp, 0.13, "warn"), txt(v(3.15, 1.5), "üçlü nokta", "e", { tone: "warn", small: true, bold: true }));
      els.push(seg(v(0, tp[1]), tp, { tone: "muted", dash: true, thin: true }), ...ytick(0, tp[1], "5,11 atm"));
    }
    if (step >= 2) {
      els.push(seg(v(0, 0.75), v(7.6, 0.75), { tone: "muted", dash: true, thin: true }), ...ytick(0, 0.75, "1 atm"));
      els.push(vec(v(0.9, 0.75), v(4.4, 0.75), { tone: "warn", bold: true }));
      els.push(txt(v(1.95, 0.75), "süblimleşme", "s", { tone: "warn", small: true }));
    }
    els.push(...pad(-1.6, 5.5, 9.0, -0.7));
    const rows: [string, string][] = [
      ["Bölge içinde tek faz, eğri üzerinde iki faz dengede bulunur.", "Sıcaklık yatay, basınç dikey: izobar yatay yol, izoterm dikey yoldur."],
      ["Üçlü nokta: katı, sıvı ve buhar birlikte dengede; CO₂ için yaklaşık −56,4 °C ve 5,11 atm.", "Üç çizginin buluşması üç ayrı sıcaklık değildir; üç fazdan eşit miktar bulunması da gerekmez."],
      ["1 atm < 5,11 atm: yatay ısıtma yolu katı–gaz sınırını keser, sıvı bölgesine hiç girmez.", "Kuru buzun açık havada erimeden buharlaşması bu yüzdendir."],
    ];
    return { els, readout: rows[step] };
  },
};

const critical: FigureDef = {
  caption:
    "İleri ile CO₂'nin sıvı–buhar eğrisinin sonuna bak (şematik, ölçekli değil). Eğri kritik noktada (31,2 °C; 73 atm) biter. T > Tc iken yalnız basınç artırarak sıvı–buhar sınırı geçilemez. Kritiküstü akışkan bölgesi için T > Tc ve P > Pc birlikte sağlanmalıdır.",
  alt: "CO₂ faz şeması; sıvı–buhar eğrisinin ucunda kritik nokta. Adımlarda kritik sıcaklıktan geçen dikey ve kritik basınçtan geçen yatay kesikli çizgiler, sonra ikisinin de aşıldığı sağ üst bölge taranıyor.",
  steps: ["Sıvı–buhar eğrisi", "Kritik nokta", "T > Tc'de sıkıştırma", "Kritiküstü bölge"],
  draw: (_v, step) => {
    const els: El[] = [];
    const { cp } = co2Base(els);
    if (step >= 3) els.push(box(cp[0], cp[1], 8.0, 4.9, "c"), txt(v(7.1, 4.35), "kritiküstü", "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(4.3, 2.9), "sıvı", "c", { tone: "b", bold: true }), txt(v(5.6, 1.2), "gaz", "c", { tone: "c", bold: true }));
    if (step >= 1) {
      els.push(ball(cp, 0.13, "warn"), txt(v(cp[0] - 0.15, cp[1] + 0.1), "kritik nokta", "nw", { tone: "warn", small: true, bold: true }));
      els.push(seg(v(cp[0], 0), v(cp[0], 4.9), { tone: "muted", dash: true, thin: true }), seg(v(0, cp[1]), v(8.0, cp[1]), { tone: "muted", dash: true, thin: true }));
      els.push(...xtick(cp[0], 0, "Tc"), ...ytick(0, cp[1], "Pc"));
    }
    if (step === 2) els.push(vec(v(7.0, 0.6), v(7.0, 4.6), { tone: "warn", bold: true }), txt(v(7.1, 2.2), "sınır yok", "e", { tone: "warn", small: true }));
    els.push(...pad(-1.0, 5.5, 9.4, -0.7));
    const rows: [string, string][] = [
      ["Sıvı–buhar eğrisi boyunca iki faz dengede; eğri üçlü noktadan başlar.", "Eğri üzerindeki her nokta bir kaynama sıcaklığı–buhar basıncı çiftidir."],
      ["Eğri kritik noktada biter: CO₂ için yaklaşık Tc = 31,2 °C, Pc = 73 atm.", "Kritik nokta ile üçlü nokta ayrı noktalardır."],
      ["T > Tc'de dikey sıkıştırma yolu hiçbir sıvı–buhar eğrisini kesmez; klasik yoğuşma görülmez.", "Basınç yine yoğunluğu artırır; yalnız ayrı bir sıvı fazı oluşmaz."],
      ["Taralı bölge: T > Tc ve P > Pc birlikte. Yalnız birinin aşılması kritiküstü demek değildir.", "Kritiküstü akışkan: sıvıya yakın yoğunluk, gaza yakın yayılma."],
    ];
    return { els, readout: rows[step] };
  },
};

const waterMelt: FigureDef = {
  caption:
    "İleri ile su ve CO₂'nin katı–sıvı sınırını karşılaştır (şematik, ölçekli değil). Suda erime eğrisi sola yatıktır (negatif eğim): sabit sıcaklıkta basınç artırılınca buz eriyebilir, çünkü buz sıvı sudan daha az yoğundur. CO₂'de eğri sağa yatıktır (pozitif eğim); basınç artışı katıyı kararlı kılar.",
  alt: "İki adımda faz şeması: suyunkinde üçlü noktadan sol üste giden katı–sıvı çizgisi ve buz bölgesinden sıvı bölgesine yukarı doğru dikey ok; CO₂'ninkinde sağ üste giden çizgi ve sıvıdan katıya geçen ok.",
  steps: ["Su", "CO₂"],
  draw: (_v, step) => {
    const els: El[] = [...axes(v(0, 0), 8.2, 5.0, "T", "P")];
    const tp = v(3, 1.4);
    const top: V = step === 0 ? v(1.8, 4.8) : v(3.9, 4.8);
    els.push(poly([v(0.4, 0.15), v(1.6, 0.5), v(2.4, 0.9), tp], { tone: "ink", open: true, bold: true, smooth: true }));
    els.push(poly([tp, v(4.4, 2.2), v(5.6, 3.0), v(6.6, 3.8)], { tone: "ink", open: true, bold: true, smooth: true }));
    els.push(seg(tp, top, { tone: "warn", bold: true }), ball(tp, 0.1, "ink"));
    els.push(txt(v(1.0, 3.2), "katı", "c", { tone: "a", bold: true }), txt(v(5.0, 4.0), "sıvı", "c", { tone: "b", bold: true }), txt(v(6.2, 1.0), "gaz", "c", { tone: "c", bold: true }));
    const x = step === 0 ? 2.5 : 3.3;
    els.push(vec(v(x, step === 0 ? 1.7 : 1.9), v(x, 4.2), { tone: "c", bold: true }));
    els.push(txt(v(x, 4.4), step === 0 ? "katı → sıvı" : "sıvı → katı", "n", { tone: "c", small: true, bold: true }));
    els.push(...pad(-0.6, 5.5, 9.0, -0.7));
    const rows: [string, string][] = [
      ["Su: erime eğrisinin eğimi negatif. Eğriye yakın sabit sıcaklıkta basınç artınca buz sıvıya geçebilir.", "Buz, sıvı sudan daha düşük yoğunluklu; sıkıştırma daha yoğun fazı (sıvı) kayırır."],
      ["CO₂: erime eğrisinin eğimi pozitif. Sabit sıcaklıkta basınç artınca sıvı katıya geçebilir.", "Su davranışı bütün maddelere genellenmez; sıvı–buhar sınırı her iki maddede de T ve P birlikte okunur."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures059Gas: Record<string, Record<string, FigureDef>> = {
  "ayt-gaz-ozellikleri": {
    "Basınç birimi ve araç": manometer,
    "Sıcaklıkta mutlak ölçek": charles,
    "Aynı T, aynı ortalama enerji; aynı hız değil": sameT,
  },
  "ayt-kinetik-yogunluk": {
    "Üç hız adı, üç farklı ortalama": maxwell,
    "Difüzyon ve küçük delikten geçiş": graham,
    "Yoğunluk: denklemden yeni bir okuma": density,
  },
  "ayt-kismi-basinci-suustu": {
    "Her tür aynı hacmi paylaşır": shared,
    "Islak gaz ile kuru hedef gaz": wetGas,
    "Sıvı bitince üç durumu ayır": saturation,
  },
  "ayt-gercek-gaz-faz": {
    "Eğriyi doğru sabitlerle karşılaştır": zCurves,
    "Üçlü nokta tek bir T ve P çifti": triple,
    "Kritik nokta eğrinin sonudur": critical,
    "Suyun erime eğrisi neden farklı?": waterMelt,
  },
};
