import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * AYT Fizik · Doppler etkisi. Ses: durgun hava, tek doğrultu, ses altı hızlar.
 * + yön dalganın kaynaktan alıcıya ilerlediği yöndür; fₒ = fₛ(v − uₒ)/(v − uₛ).
 * Işık: ses formülü kullanılmaz; aynı tayf çizgisinin λ oranı karşılaştırılır.
 * Sayısal örnekler özgündür.
 */

const f2 = (x: number, d = 2) => String(Math.round(x * 10 ** d) / 10 ** d).replace(".", ",").replace("-", "−");
const rect = (x0: number, x1: number, y: number, h: number, tone: Tone): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], { fill: tone, tone });

// 1 · Hareket eden kaynağın dalga cepheleri.
const fronts: FigureDef = {
  caption:
    "Kaynak sağa hareket ederken her periyotta bir cephe yayar; her cephe yayıldığı noktadan dalga hızıyla büyür. Kaynak hızını ses hızına oranla değiştir: önde cepheler sıkışır (λ küçük, f büyük), arkada açılır.",
  alt: "Sağa doğru kaymış iç içe daireler: sağ tarafta birbirine yakın, sol tarafta uzak. Ortada kaynak noktası ve sağa ok.",
  param: { label: "vₛ / v", min: 0, max: 0.8, step: 0.1, init: 0.4, unit: "" },
  draw: (k) => {
    const N = 6, R = 0.55;
    const els: El[] = [];
    for (let i = 0; i < N; i++) {
      const age = N - i;
      const cx = -k * age * R;
      els.push(circle(v(cx, 0), age * R, { tone: i % 2 ? "b" : "c", thin: true }));
    }
    els.push(ball(v(0, 0), 0.13, "warn"), vec(v(0.2, 0), v(0.9, 0), { tone: "warn", bold: k > 0 }));
    const v0 = 340, fs = 600, lf = (v0 * (1 - k)) / fs, lb = (v0 * (1 + k)) / fs;
    els.push(txt(v(N * R * (1 - k) + 0.3, 0.4), "ön: sık", "e", { small: true, tone: "a" }), txt(v(-N * R * (1 + k) - 0.3, 0.4), "arka: seyrek", "w", { small: true, tone: "muted" }));
    els.push(txt(v(-N * R * 1.8 - 1.8, 3.6), " ", "c"), txt(v(N * R + 1.8, -3.6), " ", "c"));
    return {
      els,
      readout: [
        `v = 340 m/s, fₛ = 600 Hz, vₛ = ${f2(340 * k, 0)} m/s: önde λ = (v − vₛ)/fₛ = ${f2(lf, 3)} m, arkada ${f2(lb, 3)} m; duran alıcı önde ${f2(v0 / lf, 1)} Hz, arkada ${f2(v0 / lb, 1)} Hz duyar.`,
        "Kaynağın ürettiği frekans değişmez; değişen, alıcının saniyede karşılaştığı tepe sayısıdır.",
      ],
    };
  },
};

// 2 · İşaretli genel formül.
const OBS = [
  { name: "Alıcı duruyor", uo: 0 },
  { name: "Alıcı yaklaşıyor (−34)", uo: -34 },
  { name: "Alıcı kaçıyor (+34)", uo: 34 },
];
const signed: FigureDef = {
  caption:
    "+ yön: dalganın kaynaktan alıcıya ilerlediği yön (sağ). fₒ = fₛ(v − uₒ)/(v − uₛ), v = 340 m/s, fₛ = 680 Hz. Kaynak hızını kaydır, alıcının hareketini adımlarla seç: payın alıcıya, paydanın kaynağa ait olduğu görünür.",
  alt: "Solda kaynak, sağda alıcı; hız okları işaretli. Altta formül ve hesaplanan frekans.",
  param: { label: "Kaynak hızı uₛ", min: -40, max: 40, step: 5, init: 20, unit: " m/s", plain: true },
  steps: OBS.map((o) => o.name),
  draw: (us, step) => {
    const uo = OBS[step].uo, V = 340, fs = 680;
    const fo = (fs * (V - uo)) / (V - us);
    const S = 0.035;
    const els: El[] = [seg(v(-3.6, 0), v(3.6, 0), { thin: true, tone: "muted" }), vec(v(-0.6, 1.2), v(0.6, 1.2), { tone: "muted", thin: true }), txt(v(0, 1.55), "dalga yönü (+)", "c", { small: true, tone: "muted" })];
    els.push(ball(v(-2.8, 0), 0.2, "warn"), txt(v(-2.8, -0.5), "kaynak", "c", { small: true, tone: "warn" }));
    els.push(ball(v(2.8, 0), 0.2, "b"), txt(v(2.8, -0.5), "alıcı", "c", { small: true, tone: "b" }));
    if (us !== 0) els.push(vec(v(-2.8, 0.45), v(-2.8 + us * S, 0.45), { tone: "warn", bold: true }), txt(v(-2.8, 0.85), `uₛ = ${f2(us, 0)}`, "c", { small: true, tone: "warn" }));
    if (uo !== 0) els.push(vec(v(2.8, 0.45), v(2.8 + uo * S, 0.45), { tone: "b", bold: true }), txt(v(2.8, 0.85), `uₒ = ${f2(uo, 0)}`, "c", { small: true, tone: "b" }));
    els.push(txt(v(0, -1.3), `fₒ = 680·(340 − (${f2(uo, 0)}))/(340 − (${f2(us, 0)})) = ${f2(fo, 1)} Hz`, "c", { small: true, bold: true, tone: fo > fs ? "a" : fo < fs ? "c" : "ink" }));
    els.push(txt(v(-4.0, 2.0), " ", "c"), txt(v(4.0, -1.7), " ", "c"));
    return {
      els,
      readout: [
        `${fo > fs + 1e-9 ? "Aralık kapanıyor: f artar (tizleşir)." : fo < fs - 1e-9 ? "Aralık açılıyor: f düşer (kalınlaşır)." : "Kayma yok: aynı işaretli hızlarla birlikte giderken oran 1."} fₒ = ${f2(fo, 1)} Hz.`,
        "Hızlar havaya göredir ve ses hızından küçüktür. Karşıdan gelen alıcı uₒ < 0, alıcıya giden kaynak uₛ > 0.",
      ],
    };
  },
};

// 3 · Aynı kapanma hızı, farklı sonuç.
const sameClosing: FigureDef = {
  caption:
    "v = 300 m/s, fₛ = 600 Hz, kapanma hızı ikisinde de 30 m/s. A’da kaynak yaklaşır, B’de alıcı. Ses ortamlı bir dalga olduğundan kaynak cephe aralığını, alıcı karşılaşma hızını değiştirir; sonuçlar farklıdır.",
  alt: "Üç yatay çubuk: kaynak frekansı 600 Hz, A durumunda 666,67 Hz, B durumunda 660 Hz.",
  draw: () => {
    const S = 0.035, X0 = 2.4, B = 560;
    const rows: [string, number, Tone][] = [["fₛ (üretilen)", 600, "muted"], ["A: kaynak 30 m/s yaklaşır", (600 * 300) / 270, "warn"], ["B: alıcı 30 m/s yaklaşır", (600 * 330) / 300, "b"]];
    const els: El[] = [];
    rows.forEach(([lab, val, tone], i) => {
      const y = -i * 0.9;
      els.push(txt(v(X0 - 0.15, y), lab, "w", { small: true }), rect(X0, X0 + (val - B) * S, y, 0.25, tone), txt(v(X0 + (val - B) * S + 0.15, y), `${f2(val, 2)} Hz`, "e", { small: true, bold: true, tone }));
    });
    els.push(txt(v(X0, -2.4), `taban ${B} Hz`, "c", { small: true, tone: "muted" }), txt(v(-2.6, 0.6), " ", "c"), txt(v(X0 + 120 * S + 1.6, -2.7), " ", "c"));
    return { els, readout: ["A: 600·300/270 ≈ 666,67 Hz (payda kaynağın). B: 600·330/300 = 660 Hz (pay alıcının).", "Salt bağıl hızı tek formüle koyma; havaya göre hangi cismin hareket ettiğini ayrı yaz."] };
  },
};

// 4 · Tayf çizgisi.
const spectrum: FigureDef = {
  caption:
    "Laboratuvarda 500 nm’de görülen bir tayf çizgisinin gözlenen konumunu değiştir. Daha uzun λ kırmızıya, daha kısa λ maviye kaymadır. z = (λgözlenen − λref)/λref. Ses formülü ışığa uygulanmaz; büyük z’de z = v/c otomatik değildir.",
  alt: "400–700 nm arası renk şeridi; 500 nm’de kesikli referans çizgisi, gözlenen çizgi kaydırıcıya göre sağa ya da sola kayıyor.",
  param: { label: "λ gözlenen", min: 450, max: 560, step: 5, init: 525, unit: " nm", plain: true },
  draw: (lam) => {
    const X = (l: number) => (l - 400) * 0.026;
    const bands: [number, Tone][] = [[400, "b"], [480, "c"], [580, "a"], [620, "warn"]];
    const els: El[] = [];
    bands.forEach(([l, t], i) => { const l2 = i < bands.length - 1 ? bands[i + 1][0] : 700; els.push(rect(X(l), X(l2), 0, 0.45, t)); });
    els.push(seg(v(X(500), -0.7), v(X(500), 0.7), { dash: true, bold: true }), txt(v(X(500), 1.0), "ref 500", "c", { small: true }));
    els.push(seg(v(X(lam), -0.7), v(X(lam), 0.7), { bold: true, tone: "ink" }), txt(v(X(lam), -1.0), `${lam} nm`, "c", { small: true, bold: true }));
    for (const l of [400, 500, 600, 700]) els.push(txt(v(X(l), -1.5), String(l), "c", { small: true, soft: true, tone: "muted" }));
    const z = (lam - 500) / 500;
    els.push(txt(v(-0.4, 1.4), " ", "c"), txt(v(X(700) + 0.4, -1.8), " ", "c"));
    return {
      els,
      readout: [
        `z = (${lam} − 500)/500 = ${f2(z, 3)}: ${z > 0 ? "kırmızıya kayma (λ uzadı, f azaldı)" : z < 0 ? "maviye kayma (λ kısaldı, f arttı)" : "kayma yok"}.`,
        "Önce ekseni oku: frekans ekseninde sağa kayma daha yüksek f demektir. Kırmızıya kayma parlaklığın azalması değildir.",
      ],
    };
  },
};

export const physicsFiguresDoppler: Record<string, Record<string, FigureDef>> = {
  "doppler-etkisi": {
    "Hareket eden kaynağın izini çiz": fronts,
    "Bir boyutlu formülü işaretlerden kur": signed,
    "Aynı kapanma hızı her zaman aynı sonucu vermez": sameClosing,
    "Bir spektrum çizgisini karşılaştır": spectrum,
  },
};
