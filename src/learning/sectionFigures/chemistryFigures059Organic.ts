import { ang, ball, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { box, nf, pad } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: organik kimya. sp³ / sp² / sp yönleri (düzlem eğik
 * perspektifte, kalan p orbitalleri düzleme dik), s karakteri, alkan genel
 * formülünün değerlik sayımı, primer–kuaterner karbon, homolog seride ve
 * izomerlerde kaynama sıcaklığı, alkol derecesi ve benzer kütlede alkol / eter
 * / alkan kaynaması. Kaynama değerleri 1 atm'deki yaklaşık tablo değerleridir.
 */

/** Orbital lobu: o noktasından d yönünde uzunluk L, genişlik w olan damla. */
function lobe(o: V, d: V, L: number, w: number, tone: Tone): El {
  const n = Math.hypot(d[0], d[1]) || 1;
  const ux = d[0] / n;
  const uy = d[1] / n;
  const ps: V[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = (Math.PI * i) / 24;
    const a = (L / 2) * (1 - Math.cos(t));
    const b = (w / 2) * Math.sin(t) * Math.sin(t / 1.2 + 0.3);
    ps.push(v(o[0] + ux * a - uy * b, o[1] + uy * a + ux * b));
  }
  for (let i = 24; i >= 0; i--) {
    const t = (Math.PI * i) / 24;
    const a = (L / 2) * (1 - Math.cos(t));
    const b = -(w / 2) * Math.sin(t) * Math.sin(t / 1.2 + 0.3);
    ps.push(v(o[0] + ux * a - uy * b, o[1] + uy * a + ux * b));
  }
  return poly(ps, { tone, fill: tone, thin: true, smooth: true });
}

/** Düzlem içi yön (açı derece) eğik perspektifte: y ekseni 0,4 ile basık. */
const flat = (deg: number, r: number, o: V = v(0, 0)): V => v(o[0] + r * Math.cos((deg * Math.PI) / 180), o[1] + 0.4 * r * Math.sin((deg * Math.PI) / 180));

function atomAt(els: El[], p: V, label: string, tone: Tone, r = 0.28) {
  els.push(ball(p, r, tone), txt(p, label, "c", { tone: "ink", small: true, bold: true }));
}

/* ---------- hibritlesme ---------- */

const sp3: FigureDef = {
  caption:
    "Metanda karbonun bir s ve üç p orbitali karışarak dört eşdeğer sp³ hibriti verir. Dört σ bağı düzgün dört yüzlünün köşelerine yönelir; açı yaklaşık 109,5°. Kesikli bağ arkaya, kalın bağ öne doğrudur; çizim şematiktir. sp³ yerel bir tanımdır: etanda her karbon ayrı bir dört yüzlü merkezdir.",
  alt: "Ortada C atomu, dört H atomuna bağlı: biri yukarı, biri sol alt, biri sağ alt (kalın, öne), biri arkaya (kesikli). İki bağ arasında 109,5° açı yayı.",
  draw: () => {
    const c = v(0, 0);
    const hs: [V, boolean, boolean][] = [
      [v(0, 1.7), false, false],
      [v(-1.55, -0.75), false, false],
      [v(1.0, -1.3), true, false],
      [v(1.5, -0.1), false, true],
    ];
    const els: El[] = [];
    els.push(ang(c, hs[0][0], hs[1][0], undefined, { tone: "warn", r: 0.75 }), txt(v(-1.0, 0.75), "109,5°", "c", { tone: "warn", small: true, bold: true }));
    for (const [p, bold, dash] of hs) {
      els.push(seg(c, p, { tone: "ink", bold, dash }));
      atomAt(els, p, "H", "b", dash ? 0.2 : 0.24);
    }
    atomAt(els, c, "C", "a", 0.34);
    els.push(...pad(-2.8, 2.3, 2.8, -1.6));
    return { els, readout: ["sp³: 1 s + 3 p → 4 hibrit; 4 elektron bölgesi; ideal açı 109,47°.", "NH₃ ve H₂O da 4 bölgelidir ama ortaklanmamış çiftler molekül şeklini ve açıyı değiştirir."] };
  },
};

const sp2: FigureDef = {
  caption:
    "Etende her karbon bir s ve iki p'den üç sp² hibriti oluşturur: üç σ bağı aynı düzlemde, yaklaşık 120° aralıklı (düzlem eğik bakışla çizildi; şematik, ölçekli değil). Kalan saf p orbitali düzleme diktir; iki karbonun p orbitalleri yan yana örtüşerek π bağını kurar. Her karbonun üç komşusu, bağ mertebeleri toplamı dörttür.",
  alt: "Eğik görünen bir düzlem üzerinde iki C atomu ve her birine bağlı iki H; C'lerin üstünde ve altında düzleme dik p orbital lobları, iki karbonun lobları yan yana.",
  steps: ["σ iskeleti (sp²)", "Kalan p ve π örtüşmesi"],
  draw: (_v, step) => {
    const c1 = v(-0.8, 0);
    const c2 = v(0.8, 0);
    const els: El[] = [poly([flat(160, 3.9), flat(200, 3.9), flat(-20, 3.9), flat(20, 3.9)], { tone: "muted", dash: true, thin: true })];
    if (step >= 1) for (const c of [c1, c2]) els.push(lobe(c, v(0, 1), 1.5, 0.75, "c"), lobe(c, v(0, -1), 1.5, 0.75, "c"));
    els.push(seg(c1, c2, { tone: "ink", bold: true }));
    const hs: V[] = [flat(120, 2.0, c1), flat(240, 2.0, c1), flat(60, 2.0, c2), flat(-60, 2.0, c2)];
    hs.forEach((h, i) => {
      els.push(seg(i < 2 ? c1 : c2, h, { tone: "ink" }));
      atomAt(els, h, "H", "b", 0.22);
    });
    atomAt(els, c1, "C", "a");
    atomAt(els, c2, "C", "a");
    if (step >= 1) els.push(txt(v(1.25, 1.3), "p (düzleme dik)", "e", { tone: "c", small: true, bold: true }), txt(v(0, 1.75), "π", "n", { tone: "c", bold: true }));
    else els.push(txt(v(-2.1, 0), "120°", "w", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-4.2, 2.3, 4.3, -1.8));
    const rows: [string, string][] = [
      ["Her C: 3 σ bağı (2 C–H, 1 C–C) → 3 elektron bölgesi → sp², düzlemsel, ≈ 120°.", "π bağı bölge sayısına eklenmez."],
      ["Kalan p orbitalleri düzleme dik ve paralel: yan yana örtüşme → π bağı. C=C: 1 σ + 1 π.", "π bağı C=C ekseni etrafında dönmeyi engeller (cis–trans izomerliği)."],
    ];
    return { els, readout: rows[step] };
  },
};

const sp: FigureDef = {
  caption:
    "Etinde her karbon bir s ve bir p'den iki sp hibriti oluşturur: iki σ yönü birbirine 180° (doğrusal; loblar şematik). Kalan iki saf p orbitali birbirine ve molekül eksenine diktir; iki ayrı π bağı kurar. C≡C: 1 σ + 2 π.",
  alt: "Yatay doğru üzerinde H–C–C–H; C'lerin üstünde ve altında birinci p lob çifti, eğik doğrultuda ikinci p lob çifti.",
  steps: ["σ iskeleti (sp)", "İki p, iki π"],
  draw: (_v, step) => {
    const c1 = v(-0.75, 0);
    const c2 = v(0.75, 0);
    const els: El[] = [];
    if (step >= 1)
      for (const c of [c1, c2]) els.push(lobe(c, v(0, 1), 1.4, 0.65, "c"), lobe(c, v(0, -1), 1.4, 0.65, "c"), lobe(c, v(0.55, 0.45), 1.2, 0.55, "b"), lobe(c, v(-0.55, -0.45), 1.2, 0.55, "b"));
    els.push(seg(v(-2.1, 0), v(2.1, 0), { tone: "ink", bold: true }));
    atomAt(els, v(-2.1, 0), "H", "b", 0.22);
    atomAt(els, v(2.1, 0), "H", "b", 0.22);
    atomAt(els, c1, "C", "a");
    atomAt(els, c2, "C", "a");
    if (step === 0) els.push(txt(v(0, -0.35), "180°", "s", { tone: "warn", small: true, bold: true }));
    else els.push(txt(v(0, 1.55), "π₁", "n", { tone: "c", small: true, bold: true }), txt(v(1.75, 0.7), "π₂", "e", { tone: "b", small: true, bold: true }));
    els.push(...pad(-2.8, 2.2, 3.0, -1.7));
    const rows: [string, string][] = [
      ["Her C: 2 σ bağı (C–H, C–C) → 2 bölge → sp, doğrusal, 180°.", "HCN'de C ve N de iki bölgelidir (N: σ bağı + ortaklanmamış çift)."],
      ["İki p orbitali birbirine dik: iki ayrı yan örtüşme → 2 π. Üçlü bağ = 1 σ + 2 π.", "Çoklu bağ arttıkça bağ kısalır ve güçlenir (aynı atom çifti için)."],
    ];
    return { els, readout: rows[step] };
  },
};

const sChar: FigureDef = {
  caption:
    "s karakteri hibritin karışımındaki s payıdır: sp³'te 1/4, sp²'de 1/3, sp'de 1/2. Sıralama sp > sp² > sp³. Bu bir orbital karışım oranıdır; atomun bütün elektronlarının bu yüzdeyle s'de bulunduğu anlamına gelmez.",
  alt: "Üç yatay çubuk, her biri s (dolu) ve p (boş) paylarına bölünmüş: sp³ dörtte bir s, sp² üçte bir s, sp yarı s.",
  draw: () => {
    const rows: [string, number][] = [
      ["sp³", 1 / 4],
      ["sp²", 1 / 3],
      ["sp", 1 / 2],
    ];
    const W = 6;
    const els: El[] = [];
    rows.forEach(([name, f], i) => {
      const y = 2.2 - i * 0.9;
      els.push(box(0, y, W * f, y + 0.5, "warn"), box(W * f, y, W, y + 0.5, "muted", false));
      els.push(txt(v(-0.15, y + 0.25), name, "w", { tone: "ink", small: true, bold: true }));
      els.push(txt(v((W * f) / 2, y + 0.25), `s %${nf(f * 100, 1)}`, "c", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(W * f + (W * (1 - f)) / 2, y + 0.25), `p %${nf((1 - f) * 100, 1)}`, "c", { tone: "muted", small: true }));
    });
    els.push(...pad(-1.0, 3.0, 6.3, 0.2));
    return { els, readout: ["s payı: sp 1/2 > sp² 1/3 > sp³ 1/4.", "Karşılaştırma aynı atom türü ve benzer bağlar için anlamlıdır."] };
  },
};

/* ---------- alkanlar ---------- */

const formula: FigureDef = {
  caption:
    "Sürgüyle karbon sayısını değiştir. n karbonlu halkasız iskelette n − 1 C–C bağlantısı vardır; bunlar 2(n − 1) değerlik ucunu kullanır. Geriye H için 4n − 2(n − 1) = 2n + 2 uç kalır: CₙH₂ₙ₊₂. Uçtaki karbonlar CH₃, aradakiler CH₂ taşır.",
  alt: "Zikzak bir karbon zinciri; her karbonun yanında CH₃ ya da CH₂ yazıyor. Okumada formül ve değerlik sayımı.",
  param: { label: "Karbon sayısı n", min: 1, max: 8, step: 1, init: 4, unit: "" },
  draw: (n) => {
    const els: El[] = [];
    const ps: V[] = Array.from({ length: n }, (_, i) => v(i * 1.15, i % 2 ? 0.6 : 0));
    for (let i = 0; i + 1 < n; i++) els.push(seg(ps[i], ps[i + 1], { tone: "ink", bold: true }));
    ps.forEach((p, i) => {
      const lab = n === 1 ? "CH₄" : i === 0 || i === n - 1 ? "CH₃" : "CH₂";
      els.push(ball(p, 0.16, "a"), txt(p, lab, i % 2 ? "n" : "s", { tone: "ink", small: true, bold: true }));
    });
    els.push(...pad(-0.8, 1.4, Math.max(8.4, (n - 1) * 1.15 + 0.8), -0.8));
    const sub = (k: number) => String(k).split("").map((c) => "₀₁₂₃₄₅₆₇₈₉"[+c]).join("");
    return { els, readout: [`C${n > 1 ? sub(n) : ""}H${sub(2 * n + 2)}: H = 4 · ${n} − 2 · ${n - 1} = ${2 * n + 2}`, "Dallanma formülü değiştirmez; halka eklemek iki H eksiltir."] };
  },
};

/** 2,2,4-trimetilpentan iskeleti ve karbon dereceleri. */
const ISO_C: { p: V; deg: number }[] = [
  { p: v(0, 0), deg: 1 },
  { p: v(1.3, 0.6), deg: 4 },
  { p: v(2.6, 0), deg: 2 },
  { p: v(3.9, 0.6), deg: 3 },
  { p: v(5.2, 0), deg: 1 },
  { p: v(1.3, 1.9), deg: 1 },
  { p: v(1.3, -0.7), deg: 1 },
  { p: v(3.9, 1.9), deg: 1 },
];
const ISO_B: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [1, 6],
  [3, 7],
];
const DEG = ["", "primer", "sekonder", "tersiyer", "kuaterner"];
const DEG_TONE: Tone[] = ["ink", "b", "c", "a", "warn"];
const degrees: FigureDef = {
  caption:
    "İleri ile 2,2,4-trimetilpentanda karbon derecelerini bul. Bir karbonun bağlı olduğu karbon sayısı 1, 2, 3, 4 ise primer, sekonder, tersiyer, kuaterner denir. Derece H sayısı değildir; kuaterner karbon dört karbona bağlıdır ve H taşımaz.",
  alt: "Sekiz karbonlu dallı iskelet: beş karbonlu ana zincir, ikinci karbonda iki, dördüncü karbonda bir metil dalı. Her adımda bir derecedeki karbonlar renkli ve harfle işaretli.",
  steps: ["primer (1 C komşu)", "sekonder (2)", "tersiyer (3)", "kuaterner (4)"],
  draw: (_v, step) => {
    const d = step + 1;
    const els: El[] = [];
    for (const [a, b] of ISO_B) els.push(seg(ISO_C[a].p, ISO_C[b].p, { tone: "ink", bold: true }));
    ISO_C.forEach(({ p, deg }) => {
      const on = deg === d;
      els.push(ball(p, on ? 0.3 : 0.2, on ? DEG_TONE[deg] : "muted"));
      if (on) els.push(txt(p, deg === 1 ? "P" : deg === 2 ? "S" : deg === 3 ? "T" : "K", "c", { tone: "ink", small: true, bold: true }));
    });
    els.push(...pad(-0.8, 2.6, 6.0, -1.3));
    const count = ISO_C.filter((c) => c.deg === d).length;
    const hs = [0, 3, 2, 1, 0][d];
    return { els, readout: [`${DEG[d]}: ${count} karbon; her biri ${d} karbona bağlı, alkanda ${hs} H taşır.`, "C₈H₁₈: 5 primer, 1 sekonder, 1 tersiyer, 1 kuaterner = 8 karbon."] };
  },
};

const BP: [string, number][] = [
  ["C₁", -162],
  ["C₂", -89],
  ["C₃", -42],
  ["C₄", -1],
  ["C₅", 36],
  ["C₆", 69],
  ["C₇", 98],
  ["C₈", 126],
];
const ISOMERS: [string, number][] = [
  ["pentan", 36],
  ["2-metilbütan", 28],
  ["2,2-dimetilpropan", 10],
];
const boiling: FigureDef = {
  caption:
    "İleri ile iki ayrı karşılaştırmayı aç (1 atm, yaklaşık tablo değerleri). Homolog seride karbon sayısı arttıkça London etkileşimleri güçlenir, kaynama sıcaklığı yükselir. Aynı formüllü C₅H₁₂ izomerlerinde dallanma molekülü kompaktlaştırır, temas yüzeyi azalır, kaynama sıcaklığı düşer.",
  alt: "Birinci adımda C₁'den C₈'e düz zincirli alkanların kaynama sıcaklığı çubukları, soldan sağa yükseliyor. İkinci adımda pentan, 2-metilbütan ve 2,2-dimetilpropan çubukları, dallandıkça kısalıyor.",
  steps: ["Homolog seri", "C₅H₁₂ izomerleri"],
  draw: (_v, step) => {
    const Y = (t: number) => (t + 180) * 0.012;
    const els: El[] = [seg(v(0, Y(0)), v(9.0, Y(0)), { tone: "muted", dash: true, thin: true }), txt(v(9.0, Y(0)), "0 °C", "e", { tone: "muted", small: true })];
    const data = step === 0 ? BP : ISOMERS;
    const gap = step === 0 ? 1.1 : 2.8;
    data.forEach(([name, t], i) => {
      const x = 0.6 + i * gap;
      els.push(box(x - 0.35, 0, x + 0.35, Y(t), step === 0 ? "b" : "a"));
      els.push(txt(v(x, step === 1 && i % 2 ? -0.45 : 0), name, "s", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(x, Y(t)), `${t}`.replace("-", "−"), "n", { tone: "ink", small: true }));
    });
    els.push(seg(v(0, 0), v(9.0, 0), { tone: "ink", thin: true }));
    els.push(...pad(-0.3, 4.1, 10.0, -1.1));
    const rows: [string, string][] = [
      ["Kaynama (°C): CH₄ −162 … C₈H₁₈ 126. Zincir uzadıkça artar.", "Çubuk tabanı −180 °C; kesikli çizgi 0 °C. Oda koşulunda C₁–C₄ gaz, C₅–C₈ sıvıdır."],
      ["C₅H₁₂: pentan 36, 2-metilbütan 28, 2,2-dimetilpropan ≈ 10 °C.", "Aynı mol kütlesi, farklı şekil. Erime sıcaklığı bu basit kurala uymayabilir (paketlenme)."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- ayt-alkoller ---------- */

const ALC: { name: string; nb: number }[] = [
  { name: "etanol", nb: 1 },
  { name: "2-propanol", nb: 2 },
  { name: "tert-bütanol", nb: 3 },
];
const alcDegree: FigureDef = {
  caption:
    "İleri ile üç alkolde OH'nin bağlı olduğu alfa karbonuna bak. Alfa karbonunun doğrudan C komşusu 1 ise birincil, 2 ise ikincil, 3 ise üçüncül alkol. Toplam karbon sayısı dereceyi belirlemez: 1-bütanol birincil, 2-bütanol ikincil, 2-metil-2-propanol üçüncüldür.",
  alt: "Ortada alfa karbonu, yukarı doğru OH grubu; çevresinde adıma göre bir, iki ya da üç CH₃ grubu, geri kalan bağlarda H.",
  steps: ALC.map((a) => a.name),
  draw: (_v, step) => {
    const { nb } = ALC[step];
    const c = v(0, 0);
    const dirs: V[] = [v(-1.5, -0.7), v(1.5, -0.7), v(0, -1.6)];
    const els: El[] = [seg(c, v(0, 1.4), { tone: "ink", bold: true })];
    els.push(txt(v(0, 1.4), "OH", "n", { tone: "warn", bold: true }));
    dirs.forEach((d, i) => {
      const isC = i < nb;
      els.push(seg(c, d, { tone: "ink", bold: isC }));
      if (isC) els.push(ball(d, 0.24, "b"), txt(d, "CH₃", i === 0 ? "w" : i === 1 ? "e" : "s", { tone: "b", small: true, bold: true }));
      else els.push(txt(d, "H", i === 0 ? "w" : i === 1 ? "e" : "s", { tone: "muted", small: true }));
    });
    els.push(ball(c, 0.3, "a"), txt(c, "Cα", "c", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-3.0, 2.2, 3.0, -2.3));
    const kind = ["birincil", "ikincil", "üçüncül"][nb - 1];
    return { els, readout: [`${ALC[step].name}: alfa karbonunun ${nb} C komşusu → ${kind} alkol.`, nb === 3 ? "Üçüncül alkolün alfa karbonunda H yoktur (alfa H sayısı 0)." : `Alfa karbonunda ${3 - nb} H var.`] };
  },
};

const alcBoil: FigureDef = {
  caption:
    "Yakın mol kütleli üç maddeyi karşılaştır (1 atm, yaklaşık tablo değerleri): etanol (46 g/mol) 78 °C, dimetil eter (46 g/mol) −24 °C, propan (44 g/mol) −42 °C. Etanol molekülleri OH grubu üzerinden birbirine hidrojen bağı yapar; eterde O var ama O'ya bağlı H yoktur. Bu, her alkolün her eterden yüksek kaynadığı anlamına gelmez.",
  alt: "Üç dikey çubuk: etanol (en uzun), dimetil eter ve propan; tabanı −60 °C, 0 °C'de kesikli çizgi. Altlarında yapı formülleri.",
  draw: () => {
    const data: [string, string, number, Tone][] = [
      ["etanol", "CH₃CH₂OH", 78, "warn"],
      ["dimetil eter", "CH₃OCH₃", -24, "b"],
      ["propan", "CH₃CH₂CH₃", -42, "muted"],
    ];
    const Y = (t: number) => (t + 60) * 0.025;
    const els: El[] = [seg(v(-0.3, Y(0)), v(8.0, Y(0)), { tone: "muted", dash: true, thin: true }), txt(v(8.0, Y(0)), "0 °C", "e", { tone: "muted", small: true })];
    data.forEach(([name, f, t, tone], i) => {
      const x = 1.0 + i * 2.8;
      els.push(box(x - 0.45, 0, x + 0.45, Y(t), tone));
      els.push(txt(v(x, Y(t)), `${t} °C`.replace("-", "−"), "n", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(x, 0), name, "s", { tone: "ink", small: true, bold: true }), txt(v(x, -0.45), f, "s", { tone: "muted", small: true }));
    });
    els.push(seg(v(-0.3, 0), v(8.0, 0), { tone: "ink", thin: true }));
    els.push(...pad(-0.6, 4.0, 9.0, -1.2));
    return { els, readout: ["Etanol ile dimetil eter aynı formüllü (C₂H₆O) izomerlerdir; fark ≈ 100 °C.", "Homolog alkol serisinde zincir uzadıkça London katkısı da artar."] };
  },
};

export const chemistryFigures059Organic: Record<string, Record<string, FigureDef>> = {
  hibritlesme: {
    "sp³: dört hibrit yönü": sp3,
    "sp²: üç düzlemsel yön ve bir p": sp2,
    "sp: iki karşıt yön ve iki p": sp,
    "s karakterini nicel karşılaştır": sChar,
  },
  alkanlar: {
    "Genel formülü bir ağaçtan çıkar": formula,
    "Primer, sekonder, tersiyer, kuaterner": degrees,
    "Kaynama eğilimi ve dallanma": boiling,
  },
  "ayt-alkoller": {
    "Birinci, ikinci ve üçüncü derece": alcDegree,
    "Kaynamayı benzer örneklerle karşılaştır": alcBoil,
  },
};
