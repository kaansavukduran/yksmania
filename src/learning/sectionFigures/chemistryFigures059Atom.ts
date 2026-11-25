import { circle, poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { pad } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: kuantum sayıları ve periyodik eğilim. n katmanında
 * izinli l değerleri (0 … n−1), bir alt kabukta 2l + 1 orbital ve 2(2l + 1)
 * elektron, bir katmanda n² orbital ve 2n² kapasite; aynı periyotta ve aynı
 * grupta yarıçap sırası ile 10 elektronlu izoelektronik seri. Atom çizimleri
 * katman modelidir; dairelerin boyutu yalnız bölümdeki sırayı gösterir.
 */

const SUB = ["s", "p", "d", "f"];

/** Orbital kutuları: n tane kutu, her birinde 0–2 ok. */
function boxes(els: El[], x: number, y: number, count: number, fill: number, tone: Tone, w = 0.62) {
  for (let i = 0; i < count; i++) {
    const bx = x + i * w;
    els.push(poly([v(bx, y), v(bx + w, y), v(bx + w, y + 0.75), v(bx, y + 0.75)], { tone: "ink", thin: true }));
    const e = Math.max(0, Math.min(2, fill - i * 2));
    if (e >= 1) els.push(vec(v(bx + w * 0.33, y + 0.1), v(bx + w * 0.33, y + 0.65), { tone, bold: true }));
    if (e >= 2) els.push(vec(v(bx + w * 0.67, y + 0.65), v(bx + w * 0.67, y + 0.1), { tone, bold: true }));
  }
}

/* ---------- ayt-kuantum-sayilari ---------- */

const allowedL: FigureDef = {
  caption:
    "İleri ile n'yi 1'den 4'e artır. l, 0 ile n − 1 arasındaki tam sayılardır (0 = s, 1 = p, 2 = d, 3 = f). Dolu hücreler izinli alt kabuklardır; kesikli hücreler o katmanda izinli olmayan adlardır: 1p, 2d, 3f yoktur. İzinli olmak, seçilen atomda o alt kabuğun dolu olduğu anlamına gelmez.",
  alt: "Satırları n = 1–4, sütunları s, p, d, f olan tablo. İzinli hücrelerde 1s, 2s, 2p gibi adlar yazıyor; izinsiz hücreler kesikli çerçeveli ve boş. Seçili satır vurgulu.",
  steps: ["n = 1", "n = 2", "n = 3", "n = 4"],
  draw: (_v, step) => {
    const els: El[] = [];
    const cw = 1.4;
    const rh = 0.9;
    SUB.forEach((s, j) => els.push(txt(v(1.0 + cw * (j + 0.5), 4.1), `${s} (l = ${j})`, "c", { tone: "ink", small: true, bold: true })));
    for (let n = 1; n <= 4; n++) {
      const y = 4.0 - n * rh;
      const on = n === step + 1;
      els.push(txt(v(0.85, y + rh / 2), `n = ${n}`, "w", { tone: on ? "warn" : "ink", small: true, bold: on }));
      for (let j = 0; j < 4; j++) {
        const x = 1.0 + cw * j;
        const ok = j <= n - 1;
        els.push(poly([v(x + 0.08, y + 0.08), v(x + cw - 0.08, y + 0.08), v(x + cw - 0.08, y + rh - 0.08), v(x + 0.08, y + rh - 0.08)], ok ? { tone: on ? "warn" : "c", fill: on ? "warn" : "c", thin: true } : { tone: "muted", dash: true, thin: true }));
        if (ok) els.push(txt(v(x + cw / 2, y + rh / 2), `${n}${SUB[j]}`, "c", { tone: "ink", small: true, bold: true }));
      }
    }
    els.push(...pad(-0.6, 4.5, 6.8, 0.2));
    const n = step + 1;
    const ls = Array.from({ length: n }, (_, j) => `${j} (${SUB[j]})`).join(", ");
    return { els, readout: [`n = ${n}: l = ${ls}`, n === 2 ? "2d izinli değildir: d için l = 2, bu da n ≥ 3 ister." : `n = ${n} katmanında ${n} alt kabuk adı bulunabilir.`] };
  },
};

const subshell: FigureDef = {
  caption:
    "İleri ile s, p, d ve f alt kabuklarını aç. Bir alt kabukta 2l + 1 orbital vardır; her kutunun altında m_l değeri (−l … +l) yazar. Her orbital en çok iki elektron (zıt spin) alır: kapasite 2(2l + 1) = 2, 6, 10, 14. Tek orbitalin iki elektron kuralını bütün alt kabuğa uygulamak hatadır.",
  alt: "Yan yana orbital kutuları: s'de 1, p'de 3, d'de 5, f'de 7 kutu, her birinde yukarı ve aşağı iki ok; kutuların altında m_l değerleri.",
  steps: ["s (l = 0)", "p (l = 1)", "d (l = 2)", "f (l = 3)"],
  draw: (_v, step) => {
    const l = step;
    const count = 2 * l + 1;
    const els: El[] = [];
    const w = 0.85;
    const x0 = 3.0 - (count * w) / 2;
    boxes(els, x0, 1.0, count, 2 * count, "c", w);
    for (let i = 0; i < count; i++) els.push(txt(v(x0 + i * w + w / 2, 1.0), String(i - l).replace("-", "−"), "s", { tone: "muted", small: true }));
    els.push(txt(v(x0 - 0.15, 1.0), "m_l", "sw", { tone: "muted", small: true }));
    els.push(txt(v(3.0, 1.75), `${count} orbital · ${2 * count} elektron`, "n", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-0.2, 2.6, 6.2, 0.2));
    return { els, readout: [`l = ${l} (${SUB[l]}): orbital = 2 · ${l} + 1 = ${count}, kapasite = 2 · ${count} = ${2 * count}`, l === 2 ? "l = 2 verildiyse n en az 3 olmalıdır; d alt kabuğu 5 orbital içerir." : `m_l değerleri: ${Array.from({ length: count }, (_, i) => String(i - l).replace("-", "−")).join(", ")}`] };
  },
};

const shellCount: FigureDef = {
  caption:
    "İleri ile katmanları say. n katmanında l = 0 … n − 1 alt kabuklarının orbital sayıları toplanır: 1 + 3 + … + (2n − 1) = n². Her orbital iki spin durumuna izin verir; katman kapasitesi 2n². Bu kuramsal kapasitedir, her atomda o katmanın dolu olduğu anlamına gelmez.",
  alt: "Her alt kabuk için bir sıra orbital kutusu: n = 1'de yalnız 1s, n = 2'de 2s ve 2p, n = 3'te 3s, 3p, 3d, n = 4'te 4s, 4p, 4d, 4f. Kutular boş; toplam orbital ve kapasite yazıyor.",
  steps: ["n = 1", "n = 2", "n = 3", "n = 4"],
  draw: (_v, step) => {
    const n = step + 1;
    const els: El[] = [];
    for (let l = 0; l < n; l++) {
      const y = 3.2 - l * 1.0;
      els.push(txt(v(0.6, y + 0.37), `${n}${SUB[l]}`, "w", { tone: "ink", small: true, bold: true }));
      boxes(els, 0.8, y, 2 * l + 1, 0, "c", 0.6);
      els.push(txt(v(0.8 + (2 * l + 1) * 0.6 + 0.15, y + 0.37), `${2 * l + 1}`, "e", { tone: "muted", small: true }));
    }
    els.push(...pad(-0.4, 4.3, 6.4, -0.4));
    const sum = Array.from({ length: n }, (_, l) => 2 * l + 1);
    return { els, readout: [`n = ${n}: ${sum.join(" + ")} = ${n * n} orbital`, `Kapasite 2n² = 2 · ${n * n} = ${2 * n * n} elektron`] };
  },
};

const filteredShellCapacity: FigureDef = {
  caption: "Kutular orbitalleri gösterir. Oklar seçilen koşulda izinli spin durumlarını saydırır. Bunlar bir atomun gerçek elektron dizilimi değil, kapasite hesabıdır.",
  alt: "Her alt kabuk bir satır. Kutuların altında mℓ değerleri var. Koşul değiştikçe seçilen kutularda yukarı veya aşağı oklar görünür.",
  steps: ["Tüm durumlar", "Yalnız mℓ = 0", "Yalnız spin +½", "İki koşul birlikte"],
  param: { label: "Katman numarası n", min: 1, max: 4, step: 1, init: 3, plain: true },
  draw: (n, step) => {
    const restrictOrbital = step === 1 || step === 3;
    const oneSpin = step >= 2;
    const els: El[] = [];
    let orbitalCount = 0;
    let capacity = 0;
    const width = 0.86;
    for (let l = 0; l < n; l++) {
      const y = 3.7 - l * 1.27;
      els.push(txt(v(0.72, y + 0.38), `${n}${SUB[l]}`, "w", { small: true, bold: true }));
      for (let m = -l; m <= l; m++) {
        const x = 1 + width * (m + l);
        const enabled = !restrictOrbital || m === 0;
        const spins = enabled ? (oneSpin ? 1 : 2) : 0;
        orbitalCount += Number(enabled);
        capacity += spins;
        boxes(els, x, y, 1, spins, "c", width);
        els.push(txt(v(x + width / 2, y - 0.07), String(m).replace("-", "−"), "s", { small: true, tone: "muted" }));
      }
    }
    els.push(...pad(-0.32, 4.84, 7.35, -0.85));
    return {
      els,
      readout: [
        `n = ${n}: ${orbitalCount} uygun orbital, en çok ${capacity} elektron.`,
        restrictOrbital
          ? "Her alt kabukta mℓ = 0 olan bir orbital seçilir."
          : `${Array.from({ length: n }, (_, l) => 2 * l + 1).join(", ")} kutu seçili alt kabukların orbital sayılarını verir.`,
        oneSpin ? "Her seçili orbitale en fazla bir +½ spin sığar." : "Her seçili orbitale iki zıt spin sığar.",
      ],
    };
  },
};

/* ---------- ayt-periyodik-sistem-atom-capi ---------- */

/** Katman modeli: çekirdek ve iç içe katmanlar; r dış katman yarıçapı. */
function atom(els: El[], cx: number, r: number, shells: number, nucleus: string, name: string, tone: Tone) {
  for (let k = 1; k <= shells; k++) els.push(circle(v(cx, 0), (r * k) / shells, { tone: k === shells ? tone : "muted", thin: k !== shells, bold: k === shells }));
  els.push(circle(v(cx, 0), 0.22, { tone: "warn", fill: "warn" }), txt(v(cx, 0), nucleus, "c", { tone: "ink", small: true, bold: true }));
  els.push(txt(v(cx, -r - 0.05), name, "s", { tone: "ink", small: true, bold: true }));
}

const period: FigureDef = {
  caption:
    "İleri ile Na, Mg ve Al'yi karşılaştır (3. periyot, katman modeli, ölçekli değil). Üçünde de dış elektronlar 3. katmandadır; proton sayısı 11, 12, 13 diye artar. İç elektronlar dış elektronu tam perdeleyemediği için etkin çekim artar ve bulut küçülür: Na > Mg > Al.",
  alt: "Yan yana üç atom: her birinde çekirdek (+11, +12, +13) ve üç katman. Soldan sağa dış katman küçülüyor.",
  steps: ["Aynı katman sayısı", "Artan çekirdek yükü"],
  draw: (_v, step) => {
    const els: El[] = [];
    const data: [string, string, number][] = [
      ["Na", "+11", 1.6],
      ["Mg", "+12", 1.35],
      ["Al", "+13", 1.15],
    ];
    data.forEach(([name, z, r], i) => atom(els, 1.8 + i * 3.4, step >= 1 ? r : 1.45, 3, z, name, "c"));
    if (step >= 1) els.push(vec(v(0.6, 2.2), v(8.2, 2.2), { tone: "b", bold: true }), txt(v(4.4, 2.3), "periyotta sağa: yarıçap küçülür", "n", { tone: "b", small: true, bold: true }));
    els.push(...pad(-0.2, 2.9, 9.6, -2.3));
    const rows: [string, string][] = [
      ["Na, Mg, Al: üçü de 3 katmanlı (2, 8, x). Katman sayısı aynı.", "Karşılaştırma aynı yarıçap tanımında (ör. metalik) yapılmalı."],
      ["Proton sayısı artar, perdeleme bunu tam dengelemez: etkin çekim artar. Sıra Na > Mg > Al.", "Nitel eğilimdir; yarıçap Z'nin basit tersi diye sayısal formül kurulmaz."],
    ];
    return { els, readout: rows[step] };
  },
};

const group: FigureDef = {
  caption:
    "İleri ile 1A grubunda aşağı in: Li, Na, K (katman modeli, ölçekli değil). Her adımda yeni bir dış katman dolmaya başlar: 2, 3, 4 katman. Artan uzaklık ve iç elektronların perdelemesi dış bulutu büyütür: Li < Na < K.",
  alt: "Alt alta değil yan yana üç atom: Li iki katmanlı, Na üç katmanlı, K dört katmanlı; dış daire soldan sağa büyüyor.",
  steps: ["Li", "Li, Na", "Li, Na, K"],
  draw: (_v, step) => {
    const els: El[] = [];
    const data: [string, string, number, number][] = [
      ["Li", "+3", 0.9, 2],
      ["Na", "+11", 1.35, 3],
      ["K", "+19", 1.8, 4],
    ];
    data.forEach(([name, z, r, sh], i) => {
      if (i <= step) atom(els, 1.2 + [0, 2.6, 6.0][i], r, sh, z, `${name} · ${sh} katman`, "a");
    });
    els.push(...pad(-0.4, 2.2, 9.4, -2.5));
    const rows: [string, string][] = [
      ["Li (Z = 3): 2 katman (2, 1).", "Dış elektron 2. katmanda."],
      ["Na (Z = 11): 3 katman (2, 8, 1). Li < Na.", "Proton sayısı artsa da yeni katmanın uzaklığı baskın gelir."],
      ["K (Z = 19): 4 katman (2, 8, 8, 1). Li < Na < K.", "Hem grup hem periyot farklıysa tek ok her çifti kesin sıralamaz."],
    ];
    return { els, readout: rows[step] };
  },
};

const ISO: [string, number][] = [
  ["O²⁻", 8],
  ["F⁻", 9],
  ["Na⁺", 11],
  ["Mg²⁺", 12],
  ["Al³⁺", 13],
];
const isoelectronic: FigureDef = {
  caption:
    "İleri ile 10 elektronlu iyonları sırala (katman modeli, ölçekli değil). Beşinde de e = Z − q = 10 ve dizilim 2, 8'dir. Proton sayısı 8'den 13'e artarken aynı 10 elektron daha sıkı tutulur: O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺. Yükün mutlak değerine bakmak bu sırayı açıklamaz.",
  alt: "Yan yana beş iyon, her birinde iki katman ve çekirdekte proton sayısı; soldan sağa dış daire küçülüyor.",
  steps: ["Elektron sayısını eşitle", "Proton sayısına göre sırala"],
  draw: (_v, step) => {
    const els: El[] = [];
    ISO.forEach(([name, z], i) => {
      const r = step >= 1 ? 1.25 - (z - 8) * 0.1 : 0.95;
      atom(els, 1.2 + i * 2.6, r, 2, `+${z}`, name, "b");
    });
    if (step >= 1) els.push(vec(v(0.3, 1.6), v(11.8, 1.6), { tone: "warn", bold: true }), txt(v(6.0, 1.7), "Z artar, yarıçap küçülür", "n", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.3, 2.3, 12.4, -1.8));
    const rows: [string, string][] = [
      ["e = Z − q: O²⁻ 8 + 2, F⁻ 9 + 1, Na⁺ 11 − 1, Mg²⁺ 12 − 2, Al³⁺ 13 − 3 → hepsi 10.", "Aynı elektron sayısı ve aynı katman düzeni (2, 8)."],
      ["Proton 8 → 13: O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺.", "Atom ile kendi katyonu: katyon küçük; atom ile kendi anyonu: anyon büyük."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures059Atom: Record<string, Record<string, FigureDef>> = {
  "ayt-kuantum-sayilari": {
    "l: katmanın içindeki alt kabuk": allowedL,
    "Bir alt kabuğu say": subshell,
    "Bir katmanı say": shellCount,
    "Katmanda orbital ve spin koşulunu birlikte say": filteredShellCapacity,
  },
  "ayt-periyodik-sistem-atom-capi": {
    "Aynı periyotta genel küçülme": period,
    "Aynı grupta yeni katmanın etkisi": group,
    "Önce elektron sayısını eşitle": isoelectronic,
  },
};

