import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Part–whole boxes for the scriptures named in the MEB Din Kültürü 11 unit:
 * Tora ⊂ Tanah (with Neviim, Ketuvim) and dört İncil ⊂ Yeni Ahit ⊂ Kitab-ı
 * Mukaddes (with Eski Ahit). The point is scope: a part is never the whole.
 * The symbol figure separates by counting: menora has seven branches, the
 * Davud Yıldızı six points. Drawings are plain geometry, not artwork.
 */

const box = (x0: number, y0: number, w: number, h: number, tone: Tone, on: boolean): El =>
  poly([v(x0, y0), v(x0 + w, y0), v(x0 + w, y0 + h), v(x0, y0 + h)], { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: !on });

const tanah: FigureDef = {
  caption:
    "Tanah bir bütündür: Tora (Öğreti, ilk beş kitap), Neviim (Peygamberler) ve Ketuvim (Yazılar). “Tora, Neviim, Ketuvim'in oluşturduğu bütün” sorusunun cevabı Tora değil Tanah'tır.",
  alt: "Büyük Tanah kutusunun içinde yan yana üç kutu: Tora, Neviim ve Ketuvim; adım adım vurgulanıyor.",
  steps: ["Bütün: Tanah", "Parça: Tora", "Üç parça birlikte"],
  draw: (_, step) => {
    const els: El[] = [box(0, 0, 9.6, 3, "c", step !== 1)];
    els.push(txt(v(4.8, 3), "Tanah (bütün)", "n", { bold: true, tone: step === 1 ? "muted" : "c" }));
    const parts = [
      ["Tora", "ilk beş kitap"],
      ["Neviim", "Peygamberler"],
      ["Ketuvim", "Yazılar"],
    ];
    parts.forEach(([n, d], i) => {
      const on = step === 2 || (step === 1 && i === 0);
      els.push(box(0.4 + i * 3.1, 0.4, 2.7, 1.9, i === 0 ? "a" : "b", on));
      els.push(txt(v(1.75 + i * 3.1, 1.55), n, "c", { bold: true, tone: on ? "ink" : "muted" }), txt(v(1.75 + i * 3.1, 0.95), d, "c", { small: true, tone: on ? "ink" : "muted" }));
    });
    els.push(txt(v(-0.3, 3.9), " ", "c"), txt(v(9.9, -0.4), " ", "c"));
    return {
      els,
      readout: [step === 0 ? "Tanah: Yahudi kutsal yazılarının bütünü" : step === 1 ? "Tora ⊂ Tanah: Tora bir parçadır, bütünün adı değildir" : "Tora + Neviim + Ketuvim = Tanah", "Talmud ayrı bir yorum ve tartışma külliyatıdır; Tora ile özdeş değildir."],
    };
  },
};

const bible: FigureDef = {
  caption:
    "Kitab-ı Mukaddes iki ana bölümdür: Eski Ahit ve Yeni Ahit. Dört İncil (Matta, Markos, Luka, Yuhanna) Yeni Ahit'in içindedir; Yeni Ahit'te Elçilerin İşleri, mektuplar ve Vahiy de bulunur. Bu yüzden “Yeni Ahit = dört İncil” yanlıştır.",
  alt: "İç içe kutular: dışta Kitab-ı Mukaddes, içinde solda Eski Ahit, sağda Yeni Ahit; Yeni Ahit'in içinde dört İncil kutusu ve diğer yazılar kutusu.",
  steps: ["Bütün: Kitab-ı Mukaddes", "İki ana bölüm", "Dört İncil ⊂ Yeni Ahit"],
  draw: (_, step) => {
    // Eski Ahit is a strip on top and Yeni Ahit spans the width below it, so
    // the two inner boxes are wide enough for their names on a phone.
    const els: El[] = [box(0, 0, 12, 6.6, "c", true)];
    els.push(txt(v(6, 6.6), "Kitab-ı Mukaddes", "n", { bold: true, tone: "c" }));
    if (step >= 1) {
      els.push(box(0.4, 5.0, 11.2, 1.2, "b", step === 1), txt(v(6, 5.6), "Eski Ahit", "c", { bold: true }));
      els.push(box(0.4, 0.4, 11.2, 4.3, "b", step === 1), txt(v(6, 4.7), "Yeni Ahit", "s", { bold: true }));
    }
    if (step >= 2) {
      els.push(box(0.7, 0.65, 5.3, 2.9, "a", true), txt(v(3.35, 3.0), "dört İncil", "c", { bold: true }), txt(v(3.35, 2.05), "Matta · Markos", "c", { small: true }), txt(v(3.35, 1.25), "Luka · Yuhanna", "c", { small: true }));
      els.push(box(6.3, 0.65, 5.0, 2.9, "muted", false), txt(v(8.8, 3.0), "diğer yazılar", "c", { small: true, bold: true }), txt(v(8.8, 2.05), "Elçilerin İşleri", "c", { small: true }), txt(v(8.8, 1.25), "mektuplar, Vahiy", "c", { small: true }));
    }
    els.push(txt(v(-0.3, 7.4), " ", "c"), txt(v(12.3, -0.4), " ", "c"));
    return {
      els,
      readout: [step === 0 ? "Hristiyan kutsal kitabının bütünü" : step === 1 ? "Eski Ahit + Yeni Ahit" : "Dört İncil ⊂ Yeni Ahit ⊂ Kitab-ı Mukaddes", "Eski Ahit ile Tanah ilişkilidir; sıra ve adlandırma farklılaşabilir."],
    };
  },
};

const symbols: FigureDef = {
  caption:
    "Sayarak ayır: menora yedi kollu kandilliktir (kolları say), Davud Yıldızı altı köşeli yıldızdır (köşeleri say). Haç Hristiyan geleneğinin simgesidir. Simge bağlamı gösterir; kişinin mezhebini tek başına kanıtlamaz.",
  alt: "Solda yedi kollu menora çizgisi, kol uçlarında yedi nokta; ortada iki üçgenden oluşan altı köşeli yıldız, köşelerde altı nokta; sağda haç.",
  steps: ["Menora: 7 kol", "Davud Yıldızı: 6 köşe", "Haç"],
  draw: (_, step) => {
    const els: El[] = [];
    const tM = step === 0 ? "a" : "muted";
    // Menora: central stem plus three nested arms on each side.
    els.push(seg(v(1.8, 0), v(1.8, 2.6), { tone: tM, bold: step === 0 }), seg(v(1.0, 0), v(2.6, 0), { tone: tM }));
    for (let i = 1; i <= 3; i++) {
      const r = i * 0.5;
      els.push(poly([v(1.8 - r, 2.6), v(1.8 - r, 1.9 - r * 0.6), v(1.8 + r, 1.9 - r * 0.6), v(1.8 + r, 2.6)], { tone: tM, open: true, bold: step === 0 }));
    }
    for (let i = -3; i <= 3; i++) els.push(ball(v(1.8 + i * 0.5, 2.6), 0.1, step === 0 ? "warn" : "muted"));
    els.push(txt(v(1.8, 0), "menora", "s", { small: true, bold: step === 0, tone: tM }));
    // Six-pointed star from two triangles.
    const tS = step === 1 ? "b" : "muted";
    const C = { x: 5.6, y: 1.3 };
    const R = 1.25;
    const pt = (deg: number) => v(C.x + R * Math.cos((deg * Math.PI) / 180), C.y + R * Math.sin((deg * Math.PI) / 180));
    els.push(poly([pt(90), pt(210), pt(330)], { tone: tS, bold: step === 1 }), poly([pt(270), pt(30), pt(150)], { tone: tS, bold: step === 1 }));
    for (let k = 0; k < 6; k++) els.push(ball(pt(30 + k * 60), 0.1, step === 1 ? "warn" : "muted"));
    els.push(txt(v(5.6, 0), "Davud Yıldızı", "s", { small: true, bold: step === 1, tone: tS }));
    // Cross.
    const tC = step === 2 ? "c" : "muted";
    els.push(seg(v(8.8, 0.1), v(8.8, 2.6), { tone: tC, bold: step === 2 }), seg(v(8.1, 1.9), v(9.5, 1.9), { tone: tC, bold: step === 2 }));
    els.push(txt(v(8.8, 0), "haç", "s", { small: true, bold: step === 2, tone: tC }));
    els.push(txt(v(0.4, 3.1), " ", "c"), txt(v(10, -0.8), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "7 kol → menora (Yahudilik). Hanuka'daki dokuz kollu hanukiya ayrıdır." : step === 1 ? "6 köşe → Davud Yıldızı. Kol değil köşe sayılır; yedi kollu değildir." : "Haç → Hristiyanlık (çarmıhla ilişkili simge).",
        "Simge bağlamı gösterir; tek başına bir kişinin mezhebini ya da uygulamasını kanıtlamaz.",
      ],
    };
  },
};

export const religionFiguresBooks: Record<string, Record<string, FigureDef>> = {
  "yahudilik-ve-hristiyanlik": {
    "Tanahın üç ana bölümü": tanah,
    "Kitab-ı Mukaddesin kapsamı": bible,
    "Menora ve Davud Yıldızı": symbols,
  },
};
