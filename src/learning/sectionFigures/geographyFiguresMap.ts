import { ball, fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * Map scale. Units of the drawing are map centimetres. N in 1:N has no unit:
 * 1 cm on the map is N cm on the ground (100.000 cm = 1 km). When the whole
 * sheet is copied at k times its size, a drawn line scale shrinks or grows with
 * it and stays valid, while the printed fraction must become 1:(N/k): the
 * reasoning of 2013 YGS Sosyal Bilimler 16. Areas scale with the square.
 */

const boxEls = (x0: number, y0: number, w: number, h: number, tone: "muted" | "b" | "c" | "a" = "muted"): El =>
  poly([v(x0, y0), v(x0 + w, y0), v(x0 + w, y0 + h), v(x0, y0 + h)], { tone, thin: true });

const resize: FigureDef = {
  caption:
    "Haritayı fotokopiyle k kat büyüt ya da küçült. A–B ve altındaki çizgi ölçek aynı oranda değişir, çubuktan okunan arazi uzaklığı 4 km kalır. Basılı 1 : 100.000 yazısı değişmediği için artık yanlıştır; yeni ölçek 1 : 100.000/k (2013 YGS Sosyal Bilimler 16 mantığı).",
  alt: "Solda özgün harita çerçevesi, sağda k katına getirilmiş kopyası; her ikisinde 4 cm'lik A–B doğrusu ve 1 km bölmeli çizgi ölçek; kopyada basılı kesir ölçek yazısı geçersiz işaretli.",
  param: { label: "Kopya oranı k", min: 0.75, max: 1.5, step: 0.25, init: 0.75, unit: "" },
  draw: (k) => {
    const els: El[] = [];
    const panel = (x0: number, f: number, title: string, valid: boolean) => {
      const w = 5 * f;
      const h = 3.4 * f;
      els.push(boxEls(x0, 0, w, h));
      els.push(txt(v(x0 + w / 2, h), title, "n", { small: true, bold: true }));
      const A = v(x0 + 0.5 * f, 2.4 * f);
      const B = v(x0 + 4.5 * f, 2.4 * f);
      els.push(seg(A, B, { tone: "a", bold: true }), ball(A, 0.08, "a"), ball(B, 0.08, "a"));
      els.push(txt(A, "A", "n", { tone: "a", small: true }), txt(B, "B", "n", { tone: "a", small: true }));
      // Line scale: 4 blocks of 1 km = 1 cm each at f = 1.
      for (let i = 0; i < 4; i++)
        els.push(poly([v(x0 + 0.5 * f + i * f, 0.45 * f), v(x0 + 0.5 * f + (i + 1) * f, 0.45 * f), v(x0 + 0.5 * f + (i + 1) * f, 0.45 * f + 0.18), v(x0 + 0.5 * f + i * f, 0.45 * f + 0.18)], { tone: "b", fill: i % 2 ? undefined : "b", thin: true }));
      els.push(txt(v(x0 + 0.5 * f, 0.45 * f + 0.2), "0", "n", { tone: "b", small: true }), txt(v(x0 + 4.5 * f, 0.45 * f + 0.2), "4 km", "nw", { tone: "b", small: true }));
      els.push(txt(v(x0 + w / 2, -0.35), "1 : 100.000", "s", { small: true, tone: valid ? "c" : "warn", bold: !valid }));
      if (!valid) els.push(seg(v(x0 + w / 2 - 1.1, -0.85), v(x0 + w / 2 + 1.1, -0.85), { tone: "warn" }));
    };
    const U = 1.3;
    panel(0, U, "Özgün", true);
    panel(5 * U + 1, U * k, `Kopya (k = ${fmt(k, 2)})`, k === 1);
    els.push(txt(v(-0.4, 3.4 * U * 1.5 + 0.8), " ", "c"), txt(v(5 * U + 1 + 5 * U * 1.5 + 0.4, -1.4), " ", "c"));
    const N = 100000 / k;
    return {
      els,
      readout: [
        `Kopyada A–B = ${fmt(4 * k, 2)} cm · çizgi ölçekle 4 km (değişmedi)`,
        k === 1 ? "Basılı kesir ölçek geçerli: 4 × 100.000 cm = 4 km" : `Basılı yazıyla okunursa ${fmt(4 * k, 2)} km (yanlış) · yeni ölçek 1 : ${N.toLocaleString("tr-TR")}`,
      ],
    };
  },
};

const areaSquare: FigureDef = {
  caption:
    "1 : 200.000'de 1 cm = 200.000 cm = 2 km. 1 cm² ise iki kenarı da 2 km olan kareyi temsil eder: 2 × 2 = 4 km², yani paydanın karesi. Haritada 6 cm² olan göl 6 × 4 = 24 km²'dir; uzunluk çarpanıyla (6 × 2 = 12) hesaplamak ikinci kenarı unutur.",
  alt: "Solda haritadaki 1 cm × 1 cm kare, sağda arazideki 2 km × 2 km kare dört adet 1 km²'lik hücreye bölünmüş; üçüncü adımda 6 karelik göl.",
  steps: ["Uzunluk: 1 cm → 2 km", "Alan: 1 cm² → 4 km²", "Göl: 6 cm² → 24 km²"],
  draw: (_, step) => {
    const els: El[] = [];
    els.push(boxEls(0, 0, 1, 1, "b"), txt(v(0.5, 0), "1 cm", "s", { small: true, tone: "b" }), txt(v(0.5, 1), "harita", "n", { small: true }));
    els.push(boxEls(3, 0, 4, 4, "c"), txt(v(5, 0), "2 km", "s", { small: true, tone: "c" }), txt(v(7, 2), "2 km", "e", { small: true, tone: step >= 1 ? "c" : "muted" }), txt(v(5, 4), "arazi", "n", { small: true }));
    els.push(seg(v(1.2, 0.5), v(2.8, 0.5), { tone: "muted", dash: true }));
    if (step >= 1) {
      els.push(seg(v(5, 0), v(5, 4), { tone: "c", thin: true }), seg(v(3, 2), v(7, 2), { tone: "c", thin: true }));
      for (const [x, y] of [[4, 1], [6, 1], [4, 3], [6, 3]]) els.push(txt(v(x, y), "1 km²", "c", { small: true, tone: "c" }));
    }
    if (step >= 2) {
      for (let i = 0; i < 6; i++) els.push(poly([v(9 + (i % 3) * 0.6, Math.floor(i / 3) * 0.6), v(9.6 + (i % 3) * 0.6, Math.floor(i / 3) * 0.6), v(9.6 + (i % 3) * 0.6, 0.6 + Math.floor(i / 3) * 0.6), v(9 + (i % 3) * 0.6, 0.6 + Math.floor(i / 3) * 0.6)], { tone: "a", fill: "a", thin: true }));
      els.push(txt(v(9.9, 1.2), "göl 6 cm²", "n", { small: true, tone: "a", bold: true }));
    }
    els.push(txt(v(-0.5, 4.6), " ", "c"), txt(v(11.4, -0.8), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "1 × 200.000 cm = 200.000 cm = 2 km" : step === 1 ? "1 cm² = 2 km × 2 km = 4 km² (alan oranında N²)" : "6 cm² × 4 km² = 24 km²",
        step === 2 ? "Harita her yönde yarıya inerse göl 1,5 cm², ölçek 1 : 400.000, 1 cm² = 16 km²; yine 24 km²" : "Kare birimde iki kenar ayrı ayrı dönüştürülür.",
      ],
    };
  },
};

const PTS = [100, 180, 120, 160, 100];
const profile: FigureDef = {
  caption:
    "A–B hattında 1 km arayla kotlar 100, 180, 120, 160, 100 m. Bir aralık seç: eğim % = 100 × kot farkı / yatay uzaklık (aynı birimde). En yüksek nokta en dik yamaç demek değildir; düşey ölçek abartılı çizildiği için kâğıttaki açı ölçülmez.",
  alt: "Yatay eksende 0–4 km, düşey eksende 100–180 m; beş kot noktasını birleştiren profil çizgisi ve seçili aralıkta yükselti farkı ile yatay uzaklık dik üçgeni.",
  param: { label: "Aralık", min: 1, max: 4, step: 1, init: 1, unit: "" },
  draw: (seg1) => {
    const i = Math.round(seg1) - 1;
    const X = (km: number) => km * 2.4;
    const Y = (m: number) => (m - 100) / 25;
    const els: El[] = [];
    els.push(seg(v(0, 0), v(X(4) + 0.3, 0), { tone: "muted" }), seg(v(0, 0), v(0, Y(190)), { tone: "muted" }));
    for (const m of [100, 140, 180]) els.push(txt(v(-0.15, Y(m)), `${m} m`, "w", { small: true, tone: "muted" }));
    for (let k = 0; k <= 4; k++) els.push(txt(v(X(k), 0), `${k} km`, k === 0 ? "se" : "s", { small: true, tone: "muted" }));
    els.push(poly(PTS.map((m, k) => v(X(k), Y(m))), { tone: "c", open: true, bold: true }));
    const a = v(X(i), Y(PTS[i]));
    const b = v(X(i + 1), Y(PTS[i + 1]));
    const corner = v(X(i + 1), Y(PTS[i]));
    els.push(seg(a, corner, { tone: "a", dash: true }), seg(corner, b, { tone: "warn", dash: true }));
    PTS.forEach((m, k) => els.push(ball(v(X(k), Y(m)), 0.09, k === i || k === i + 1 ? "a" : "c")));
    const dh = PTS[i + 1] - PTS[i];
    els.push(txt(v(X(4) + 0.4, Y(170)), `Δh = ${dh > 0 ? "+" : ""}${dh} m`, "e", { small: true, tone: "warn", bold: true }), txt(v(X(4) + 0.4, Y(150)), "yatay = 1 km", "e", { small: true, tone: "a" }));
    els.push(txt(v(-1.6, Y(200)), " ", "c"), txt(v(X(4) + 2.8, -0.9), " ", "c"));
    const pct = (100 * Math.abs(dh)) / 1000;
    return {
      els,
      readout: [`Aralık ${i + 1}: ${PTS[i]} → ${PTS[i + 1]} m, yatay 1000 m`, `Eğim = 100 × ${Math.abs(dh)} / 1000 = %${fmt(pct, 0)} ${dh > 0 ? "çıkış" : "iniş"} (yüzde, derece değil)`],
    };
  },
};

export const geographyFiguresMap: Record<string, Record<string, FigureDef>> = {
  "harita-bilgisi": {
    "Boyut değişirse hangi ölçek geçerli?": resize,
    "Alan hesabında paydanın karesi": areaSquare,
    "Konturdan profile geç": profile,
  },
};
