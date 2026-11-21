import { circle, fmt, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { arrow, box, hi, pad, rect } from "./biologyFigures059Kit";

/*
 * AYT Biyoloji · Protein sentezi, fotosentez tepkimeleri ve oksijenli solunum
 * bilançosu (Forge059). Sayılar bölüm metinlerindedir: Calvin döngüsünde 3 CO₂
 * + 3 RuBP (15 C) → 6 PGA (18 C), 6 ATP + 6 NADPH → 6 trioz fosfat, 1 çıkış
 * (3 C), 5'i 3 ATP ile 3 RuBP'ye; net trioz başına 9 ATP + 6 NADPH. Glikoliz
 * brüt 4, yatırım 2, net 2 ATP, 2 NADH (3 glikozda 12 / 6 / 6). İki Krebs turu
 * 4 CO₂, 6 NADH, 2 FADH₂, 2 ATP; bağlantı 2 CO₂ + 2 NADH; toplam 6 CO₂,
 * 10 NADH, 2 FADH₂, 4 ATP. NADH ≈ 2,5, FADH₂ ≈ 1,5 ATP → 28 + 4 = 32 ya da
 * 26 + 4 = 30. Şemalar ölçekli değildir.
 */

/* ---------------- Protein sentezi ---------------- */

const transcription: FigureDef = {
  caption:
    "Transkripsiyon yönlüdür (özgün şema, ölçekli değil): RNA polimeraz kalıp ipliği 3′→5′ izler, yeni RNA'nın 3′ ucuna nükleotit ekler; RNA 5′→3′ büyür. Yalnız ilgili bölge yerel olarak açılır. Kalıp ve kodlayan iplik adları o gene göredir.",
  alt: "Üstte kodlayan DNA ipliği soldan sağa 5′ → 3′, altında kalıp iplik 3′ → 5′. Açılmış bölgede RNA polimeraz kutusu; kalıbın altında soldan polimeraza kadar uzanan RNA zinciri 5′ ucu solda. Adımlarda polimeraz sağa ilerliyor ve RNA uzuyor.",
  steps: ["Başlangıç", "Uzama", "Daha ileri"],
  draw: (_v, step) => {
    const px = 2 + step * 2;
    const els: El[] = [
      seg(v(0, 1.0), v(9, 1.0), { tone: "b", bold: true }),
      seg(v(0, 0), v(9, 0), { tone: "c", bold: true }),
      txt(v(-0.2, 1.0), "5′", "w", { small: true, bold: true, tone: "b" }),
      txt(v(9.2, 1.0), "3′", "e", { small: true, bold: true, tone: "b" }),
      txt(v(-0.2, 0), "3′", "w", { small: true, bold: true, tone: "c" }),
      txt(v(9.2, 0), "5′", "e", { small: true, bold: true, tone: "c" }),
      rect(px - 0.9, -0.5, px + 0.9, 1.5, { tone: "warn", thin: true }),
      txt(v(px, 1.85), "RNA polimeraz", "n", { small: true, bold: true, tone: "warn" }),
      seg(v(0.6, -0.9), v(px, -0.9), { tone: "a", bold: true }),
      txt(v(0.4, -0.9), "5′", "w", { small: true, bold: true, tone: "a" }),
      arrow(v(px, -0.9), v(px + 0.7, -0.9), "a"),
      txt(v(px + 0.8, -0.9), "3′ büyür", "e", { small: true, tone: "a" }),
    ];
    els.push(...pad(v(-1.0, 2.4), v(11.0, -1.4)));
    return { els, readout: ["Kalıp 3′→5′ okunur; RNA 5′→3′ yönünde uzar.", "RNA oluşumu DNA miktarını iki katına çıkarmaz; karşı iplik de genetik bilgi taşır."] };
  },
};

const splicing: FigureDef = {
  caption:
    "Ökaryotta öncül RNA işlenir (özgün şema, ölçekli değil): uç koruyucu yapılar eklenir, intronlar çıkarılır, ekzonlar birleşir. Olgun mRNA'nın her nükleotidi amino asit belirlemez: 5′ ve 3′ uçlarda çevrilmeyen bölgeler vardır. Bu yüzden protein uzunluğundan gen uzunluğu koşulsuz bulunmaz.",
  alt: "Birinci adımda öncül RNA: üç ekzon kutusu arasında iki intron. İkinci adımda intronlar çıkmış, üç ekzon yan yana; iki uçta uç yapıları ve çevrilmeyen bölgeler işaretli.",
  steps: ["Öncül RNA", "Olgun mRNA"],
  draw: (_v, step) => {
    const els: El[] = [];
    const parts: [string, number, Tone][] = step === 0 ? [["E1", 1.4, "b"], ["intron", 1.6, "muted"], ["E2", 1.2, "b"], ["intron", 1.8, "muted"], ["E3", 1.6, "b"]] : [["E1", 1.4, "b"], ["E2", 1.2, "b"], ["E3", 1.6, "b"]];
    let x = 0;
    if (step === 1) {
      els.push(rect(-0.8, -0.3, 0, 0.3, { tone: "c", thin: true }), txt(v(-0.4, -0.55), "uç", "s", { small: true, tone: "c" }));
    }
    parts.forEach(([n, w, t]) => {
      els.push(rect(x, -0.3, x + w, 0.3, { tone: t, fill: t === "b" ? "b" : undefined, thin: true, dash: t === "muted" }));
      els.push(txt(v(x + w / 2, 0), n, "c", { small: true, bold: t === "b", tone: t === "b" ? "ink" : "muted" }));
      x += w;
    });
    if (step === 1) {
      els.push(rect(x, -0.3, x + 0.8, 0.3, { tone: "c", thin: true }), txt(v(x + 0.4, -0.55), "uç", "s", { small: true, tone: "c" }));
      els.push(seg(v(0, 0.55), v(0.5, 0.55), { tone: "warn" }), txt(v(0.25, 0.7), "5′ çevrilmeyen", "n", { small: true, tone: "warn" }));
      els.push(seg(v(x - 0.6, 0.55), v(x, 0.55), { tone: "warn" }), txt(v(x - 0.3, 0.7), "3′ çevrilmeyen", "n", { small: true, tone: "warn" }));
      els.push(txt(v(x / 2, -0.85), "kodlayan bölge ekzonların içinde", "s", { small: true, tone: "muted" }));
    } else els.push(txt(v(x / 2, -0.85), "intronlar çıkarılacak", "s", { small: true, tone: "muted" }));
    els.push(...pad(v(-1.4, 1.5), v(8.2, -1.4)));
    return { els, readout: [step ? "Olgun mRNA: uç yapıları + birleşmiş ekzonlar; uçlarda çevrilmeyen bölgeler." : "Öncül RNA intron ve ekzon içerir.", "Alternatif birleştirme bazı genlerden farklı olgun RNA'lar oluşturabilir."] };
  },
};

const SITES = [
  { name: "A'ya yeni tRNA", text: "Yeni amino asidi taşıyan tRNA A bölgesindeki kodonla eşleşir." },
  { name: "Peptit bağı", text: "P'deki zincir A'daki amino aside aktarılır; uzun zincir şimdi A'daki tRNA'dadır." },
  { name: "Üç baz ilerleme", text: "Ribozom üç baz ilerler: zincirli tRNA P'ye, boş tRNA E'ye geçer; A boşalır." },
];
const apeSites: FigureDef = {
  caption:
    "Uzamada A, P ve E bölgeleri (özgün şema, ölçekli değil): yeni yüklü tRNA A'ya gelir, peptit bağıyla P'deki zincir A'daki amino aside aktarılır, ribozomun üç bazlık ilerlemesiyle zincirli tRNA P'ye, boş tRNA E'ye geçer. mRNA 5′→3′ okunur, polipeptit N ucundan C ucuna büyür.",
  alt: "Yatay mRNA üzerinde üç bölmeli ribozom: soldan E, P, A. Adımlarda A'ya yeni tRNA geliyor, zincir A'daki tRNA'ya aktarılıyor ve sonra ribozom bir kodon sağa kayarak tRNA'lar E ve P'ye geçiyor.",
  steps: SITES.map((s) => s.name),
  draw: (_v, step) => {
    const shift = step === 2 ? 1.6 : 0;
    const X = (i: number) => i * 1.6 + shift; // E, P, A bölge merkezleri
    const els: El[] = [seg(v(-1.5, 0), v(8.5, 0), { tone: "b", bold: true }), txt(v(-1.7, 0), "5′", "w", { small: true, bold: true, tone: "b" }), txt(v(8.7, 0), "3′", "e", { small: true, bold: true, tone: "b" })];
    for (let k = -1; k < 5; k++) els.push(seg(v(k * 1.6 + 0.8, -0.12), v(k * 1.6 + 0.8, 0.12), { thin: true, tone: "b" }));
    els.push(rect(X(0) - 0.8, -0.5, X(2) + 0.8, 2.3, { tone: "muted", thin: true }));
    ["E", "P", "A"].forEach((s, i) => els.push(txt(v(X(i), 2.6), s, "n", { small: true, bold: true, tone: "muted" })));
    const trna = (x: number, tone: Tone, label: string) => els.push(rect(x - 0.45, 0.25, x + 0.45, 1.25, { tone, fill: tone, thin: true }), txt(v(x, 0.75), label, "c", { small: true, bold: true }));
    if (step === 0) {
      trna(X(1), "c", "tRNA");
      trna(X(2), "a", "yeni");
      els.push(poly([v(X(1), 1.25), v(X(1) - 0.3, 1.7), v(X(1) + 0.1, 2.0)], { open: true, tone: "warn", bold: true }));
    } else if (step === 1) {
      trna(X(1), "muted", "boş");
      trna(X(2), "a", "tRNA");
      els.push(poly([v(X(2), 1.25), v(X(2) - 0.3, 1.6), v(X(2) + 0.1, 1.9), v(X(2) - 0.2, 2.15)], { open: true, tone: "warn", bold: true }));
    } else {
      trna(X(0), "muted", "boş");
      trna(X(1), "a", "tRNA");
      els.push(poly([v(X(1), 1.25), v(X(1) - 0.3, 1.6), v(X(1) + 0.1, 1.9), v(X(1) - 0.2, 2.15)], { open: true, tone: "warn", bold: true }));
      els.push(arrow(v(2.0, -0.85), v(3.6, -0.85), "a", { bold: true }), txt(v(3.8, -0.85), "3 baz", "e", { small: true, tone: "a" }));
    }
    els.push(txt(v(-1.4, 2.0), "zincir", "w", { small: true, tone: "warn" }));
    els.push(...pad(v(-2.6, 3.1), v(9.4, -1.3)));
    return { els, readout: [`${step + 1}. ${SITES[step].text}`, "P bölgesinde bütün bağların tek başına oluştuğunu söylemek mekanizmayı eksiltir."] };
  },
};

const termination: FigureDef = {
  caption:
    "Sonlanma (özgün şema, ölçekli değil): okuma çerçevesinde UAA, UAG ya da UGA A bölgesine gelince salım faktörü bağlanır; polipeptit ile son tRNA arasındaki bağ hidrolizle ayrılır ve ürün serbest kalır. Duruş kodonu amino asit eklemez; transkripsiyonun sonlanma sinyali değildir.",
  alt: "mRNA üzerinde ribozom; A bölgesinde UAG duruş kodonu. Birinci adımda P'de zincirli tRNA, A boş. İkinci adımda A'da salım faktörü, zincir ayrılmış ve ribozomdan uzaklaşıyor.",
  steps: ["Duruş kodonu A'da", "Ürün serbest"],
  draw: (_v, step) => {
    const els: El[] = [
      seg(v(-1.5, 0), v(6.5, 0), { tone: "b", bold: true }),
      rect(-0.8, -0.5, 4.0, 2.3, { tone: "muted", thin: true }),
      txt(v(3.2, -0.3), "UAG", "s", { small: true, bold: true, tone: "warn" }),
      txt(v(1.6, 2.6), "P", "n", { small: true, bold: true, tone: "muted" }),
      txt(v(3.2, 2.6), "A", "n", { small: true, bold: true, tone: "muted" }),
      rect(1.15, 0.25, 2.05, 1.25, { tone: "c", fill: "c", thin: true }),
      txt(v(1.6, 0.75), "tRNA", "c", { small: true, bold: true }),
    ];
    if (step === 0) els.push(poly([v(1.6, 1.25), v(1.3, 1.7), v(1.7, 2.0), v(1.4, 2.6), v(1.8, 3.1)], { open: true, tone: "warn", bold: true }), txt(v(1.2, 3.1), "polipeptit", "w", { small: true, tone: "warn" }));
    else {
      els.push(rect(2.75, 0.25, 3.65, 1.25, { tone: "a", fill: "a", thin: true }), txt(v(3.2, 0.75), "SF", "c", { small: true, bold: true }));
      els.push(poly([v(5.0, 2.4), v(5.4, 2.8), v(5.1, 3.2), v(5.6, 3.6)], { open: true, tone: "warn", bold: true }), txt(v(5.8, 3.0), "serbest ürün", "e", { small: true, bold: true, tone: "warn" }));
      els.push(txt(v(4.2, 0.75), "salım faktörü", "e", { small: true, tone: "a" }));
    }
    els.push(...pad(v(-1.8, 3.9), v(8.8, -1.0)));
    return { els, readout: [step ? "Bağ hidrolizle ayrılır; ribozom bileşenleri yeniden kullanılabilir." : "UAA, UAG, UGA: amino asit eklemeyen duruş kodonları.", "İlk ürün çerçeve içi ilk duruşta biter."] };
  },
};

const polysome: FigureDef = {
  caption:
    "Polizom (özgün şema, ölçekli değil): aynı mRNA üzerinde farklı konumlarda ilerleyen birden çok ribozom. Her ribozom kendi zincirini taşır; 3′ uca yakın olan daha uzun yol aldığı için zinciri daha uzundur. Aynı çerçeve çevriliyorsa ürünlerin dizisi aynıdır.",
  alt: "Soldan sağa 5′ → 3′ yatay mRNA üzerinde dört ribozom. Her ribozomdan çıkan polipeptit zinciri sağa doğru gittikçe uzuyor.",
  draw: () => {
    const els: El[] = [seg(v(0, 0), v(10, 0), { tone: "b", bold: true }), txt(v(-0.2, 0), "5′", "w", { small: true, bold: true, tone: "b" }), txt(v(10.2, 0), "3′", "e", { small: true, bold: true, tone: "b" }), arrow(v(3.5, -0.8), v(6.5, -0.8), "muted"), txt(v(6.7, -0.8), "okuma yönü", "e", { small: true, tone: "muted" })];
    [1.5, 4, 6.5, 9].forEach((x, i) => {
      els.push(circle(v(x, 0.45), 0.55, { tone: "c", fill: "c" }));
      const ps: V[] = [];
      for (let k = 0; k <= 2 + i * 2; k++) ps.push(v(x + (k % 2 ? 0.25 : -0.15), 1.0 + k * 0.35));
      els.push(poly(ps, { open: true, tone: "warn", bold: true }));
    });
    els.push(txt(v(9.5, 3.4), "uzun zincir", "e", { small: true, tone: "warn" }), txt(v(1.1, 1.9), "kısa", "w", { small: true, tone: "warn" }));
    els.push(...pad(v(-0.9, 4.2), v(12.2, -1.3)));
    return { els, readout: ["Her ribozom ayrı bir ürün zinciri taşır; zinciri birlikte çekmezler.", "mRNA çeşidi, ribozom sayısı ve ürün sayısı bire bir eşitlenmez."] };
  },
};

/* ---------------- Fotosentez tepkimeleri ---------------- */

const twoStages: FigureDef = {
  caption:
    "İki evre birbirinin girdisini üretir (özgün şema, ölçekli değil): tilakoit zarındaki ışığa bağlı tepkimeler ATP ve NADPH verir, sudan O₂ çıkar; stromadaki Calvin döngüsü bu taşıyıcılarla CO₂'yi organik karbona bağlar ve ADP, Pi, NADP⁺'yı geri gönderir.",
  alt: "Solda ışığa bağlı tepkimeler (tilakoit), sağda Calvin döngüsü (stroma). Soldan sağa ATP ve NADPH okları, sağdan sola ADP, Pi ve NADP⁺ okları. Sol kutuya ışık ve su giriyor, O₂ çıkıyor; sağ kutuya CO₂ giriyor, şeker çıkıyor.",
  draw: () => {
    const els: El[] = [
      rect(-1.6, -0.8, 1.6, 0.8, { tone: "c", fill: "c", thin: true }),
      txt(v(0, 0.3), "Işığa bağlı", "c", { small: true, bold: true }),
      txt(v(0, -0.3), "tilakoit", "c", { small: true, tone: "muted" }),
      rect(4.8, -0.8, 8.0, 0.8, { tone: "b", fill: "b", thin: true }),
      txt(v(6.4, 0.3), "Calvin döngüsü", "c", { small: true, bold: true }),
      txt(v(6.4, -0.3), "stroma", "c", { small: true, tone: "muted" }),
      arrow(v(1.7, 0.45), v(4.7, 0.45), "a", { bold: true }),
      txt(v(3.2, 0.7), "ATP, NADPH", "n", { small: true, bold: true, tone: "a" }),
      arrow(v(4.7, -0.45), v(1.7, -0.45), "muted"),
      txt(v(3.2, -0.7), "ADP, Pi, NADP⁺", "s", { small: true, tone: "muted" }),
      arrow(v(-0.6, 2.2), v(-0.6, 0.85), "warn"),
      txt(v(-0.6, 2.3), "ışık, H₂O", "n", { small: true, tone: "warn" }),
      arrow(v(0.6, 0.85), v(0.6, 2.2), "c"),
      txt(v(0.7, 2.3), "O₂", "ne", { small: true, bold: true, tone: "c" }),
      arrow(v(5.8, 2.2), v(5.8, 0.85), "ink"),
      txt(v(5.8, 2.3), "CO₂", "n", { small: true, bold: true }),
      arrow(v(7.0, 0.85), v(7.0, 2.2), "b"),
      txt(v(7.1, 2.3), "şeker", "ne", { small: true, bold: true, tone: "b" }),
      ...pad(v(-2.0, 3.0), v(8.4, -1.4)),
    ];
    return { els, readout: ["ATP enerji, NADPH indirgeme gücü taşır; birbirinin yerine aynı mol sayısıyla kullanılmaz.", "Bir evrenin ürünü diğerinin girdisidir."] };
  },
};

/** Zar şeması: üstte proton biriken bölme, altta ATP'nin oluştuğu bölme. */
const membrane = (top: string, bottom: string, pumpLabel: string, caption2: string): El[] => {
  const els: El[] = [
    rect(0, -0.35, 9, 0.35, { tone: "muted", fill: "muted", thin: true }),
    txt(v(-0.2, 1.6), top, "w", { small: true, bold: true }),
    txt(v(-0.2, -1.6), bottom, "w", { small: true, bold: true }),
    ...box(2.2, 0, 2.2, 1.1, pumpLabel, { tone: "c", fill: "c", bold: true }),
    rect(6.4, -0.55, 7.2, 0.55, { tone: "a", fill: "a", thin: true }),
    txt(v(7.4, 0), "ATP sentaz", "e", { small: true, bold: true, tone: "a" }),
    arrow(v(0.75, -1.4), v(0.75, 1.4), "warn", { bold: true }),
    arrow(v(3.65, -1.4), v(3.65, 1.4), "warn", { bold: true }),
    txt(v(2.2, 1.8), "H⁺ birikir", "n", { small: true, bold: true, tone: "warn" }),
    arrow(v(6.8, 1.4), v(6.8, -1.4), "warn", { bold: true }),
    txt(v(6.6, 1.6), "H⁺ geri döner", "w", { small: true, bold: true, tone: "warn" }),
    txt(v(6.8, -1.75), "ADP + Pi → ATP", "s", { small: true, bold: true, tone: "a" }),
    arrow(v(0.4, -0.85), v(4.4, -0.85), "b"),
    txt(v(4.6, -0.85), "e⁻", "e", { small: true, bold: true, tone: "b" }),
    txt(v(4.6, 2.6), caption2, "n", { small: true, tone: "muted" }),
  ];
  return els;
};
const photoSynthase: FigureDef = {
  caption:
    "Kloroplastta kemiosmoz (özgün şema, ölçekli değil): elektron taşıma basamakları protonları lümende biriktirir; ATP sentaz protonların lümenden stromaya dönüşünü ADP + Pi → ATP tepkimesine bağlar (fotofosforilasyon). Elektron akışı, proton taşınması ve ATP sentezi bağlantılı ama ayrı olaylardır.",
  alt: "Yatay tilakoit zarı. Üstte lümen, altta stroma. Zarda elektron taşıma kutusu stromadan lümene H⁺ okları taşıyor; zar boyunca e⁻ oku. Sağda ATP sentaz, lümenden stromaya H⁺ oku ve stroma tarafında ATP oluşumu.",
  draw: () => ({ els: [...membrane("lümen", "stroma", "Taşıma", "tilakoit zarı"), ...pad(v(-2.0, 3.0), v(10.6, -2.3))], readout: ["H⁺ lümende birikir, ATP sentazdan stromaya döner; ATP stromada oluşur.", "Protonları iki tarafta eşitleyen bir etki ATP üretimini zayıflatabilir."] }),
};

/* Calvin döngüsü: 3 CO₂ paketi için karbon ve taşıyıcı defteri. */
const CALVIN = [
  { at: v(0, 2.2), label: "3 RuBP (15 C)" },
  { at: v(5.2, 2.2), label: "6 PGA (18 C)" },
  { at: v(5.2, -1.2), label: "6 trioz P (18 C)" },
  { at: v(0, -1.2), label: "5 trioz P (15 C)" },
];
const calvin = (focus: number): FigureDef["draw"] => () => {
  const t = (i: number): Tone => (focus === i ? "a" : "muted");
  const els: El[] = [];
  CALVIN.forEach((c, i) => els.push(...box(c.at[0], c.at[1], 3.2, 0.75, c.label, { bold: true, tone: focus === i || focus === (i + 3) % 4 ? "a" : "ink" })));
  els.push(arrow(v(1.6, 2.2), v(3.6, 2.2), t(0), { bold: focus === 0 }), txt(v(2.6, 2.6), "+ 3 CO₂", "n", { small: true, bold: true, tone: focus === 0 ? "a" : "ink" }), txt(v(2.6, 1.85), "Rubisco", "s", { small: true, tone: "muted" }));
  els.push(arrow(v(5.2, 1.82), v(5.2, -0.82), t(1), { bold: focus === 1 }), txt(v(5.4, 0.5), "6 ATP, 6 NADPH", "e", { small: true, bold: true, tone: focus === 1 ? "a" : "ink" }));
  els.push(arrow(v(3.6, -1.2), v(1.6, -1.2), t(2), { bold: focus === 2 }), arrow(v(6.0, -1.58), v(6.0, -2.5), t(2), { bold: focus === 2 }), txt(v(6.2, -2.4), "1 trioz çıkar (3 C)", "e", { small: true, bold: true, tone: focus === 2 ? "a" : "ink" }));
  els.push(arrow(v(0, -0.82), v(0, 1.82), t(2), { bold: focus === 2 }), txt(v(-0.2, 0.5), "3 ATP", "w", { small: true, bold: true, tone: focus === 2 ? "a" : "ink" }));
  els.push(...pad(v(-2.3, 3.1), v(9.8, -2.9)));
  const read = [
    ["3 RuBP'nin 15 karbonuna 3 CO₂ eklenir: 6 PGA'da 18 karbon.", "İlk bağlama serbest glikoz üretmez; indirgeme ve yenileme gerekir."],
    ["6 PGA, 6 ATP ve 6 NADPH ile 6 trioz fosfata indirgenir: yine 18 karbon.", "ATP enerji, NADPH indirgeme gücü verir; birbirinin yerine konmaz."],
    ["1 trioz net çıkar (3 C); 5 trioz (15 C) 3 ATP ile 3 RuBP'yi yeniden kurar.", "Net trioz başına 9 ATP + 6 NADPH; altısını da çıkarmak döngüyü durdurur."],
  ][focus];
  return { els, readout: read };
};
const calvinAlt = "Dört kutulu döngü: 3 RuBP (15 C), 3 CO₂ eklenince 6 PGA (18 C), 6 ATP ve 6 NADPH ile 6 trioz fosfat (18 C), bir trioz dışarı çıkıyor, kalan 5 trioz (15 C) 3 ATP ile yeniden 3 RuBP oluyor.";
const calvinFix: FigureDef = {
  caption: "Karbon bağlama (özgün şema, ölçekli değil): Rubisco, 3 CO₂'yi 3 adet beş karbonlu RuBP'ye bağlar; kararsız ara yapılar 6 adet üç karbonlu PGA'ya ayrılır. 15 + 3 = 18 karbon. Fotorespirasyon bu basit net bütçenin dışındadır.",
  alt: calvinAlt,
  draw: (x, s) => calvin(0)(x, s),
};
const calvinReduce: FigureDef = {
  caption: "PGA'dan trioz fosfata (özgün şema, ölçekli değil): 3 CO₂'lik standart hesapta 6 PGA'nın indirgenmesi 6 ATP ve 6 NADPH kullanır; 6 trioz fosfat (PGAL/G3P) 18 karbonu taşır. Bu aşamadaki triozların hepsi net ürün değildir.",
  alt: calvinAlt,
  draw: (x, s) => calvin(1)(x, s),
};
const calvinRegen: FigureDef = {
  caption: "Bir çıkış, beş yenileme (özgün şema, ölçekli değil): 6 triozun biri net çıkar (3 C); kalan 5 triozun 15 karbonu 3 ATP ile 3 RuBP'yi yeniden kurar. Net bir trioz için toplam 9 ATP ve 6 NADPH.",
  alt: calvinAlt,
  draw: (x, s) => calvin(2)(x, s),
};

/* ---------------- Oksijenli solunum bilançosu ---------------- */

const COMP = [
  { label: "Sitozol", title: "Sitozol: glikoliz", detail: ["Glikoliz sitozolde gerçekleşir.", "Glikoz iki piruvata ayrılır; O₂ doğrudan kullanılmaz.", "Prokaryotta çözünür basamakların hepsi sitoplazmadadır."] },
  { label: "Matriks", title: "Matriks: bağlantı ve Krebs", detail: ["Piruvat asetil-CoA'ya burada dönüşür; Krebs döngüsü matrikste yürür.", "CO₂ bu basamaklarda çıkar.", "Protonların geri döndüğü bölmedir."] },
  { label: "İç zar", title: "İç zar: ETS ve ATP sentaz", detail: ["ETS ve ATP sentaz iç zarda çalışır.", "Oksijen son elektron alıcısıdır.", "Prokaryotta ETS hücre zarındadır."] },
  { label: "Zarlar arası", title: "Zarlar arası boşluk", detail: ["ETS'nin pompaladığı protonlar burada birikir.", "Matriksle aynı bölme değildir.", "Proton farkı ATP sentazı çalıştırır."] },
];
const compartments: FigureDef = {
  caption:
    "Hangi evre hangi bölmede? (özgün şema, ölçekli değil): glikoliz sitozolde; bağlantı tepkimesi ve Krebs matrikste; ETS ve ATP sentaz iç zarda; protonlar zarlar arası boşlukta birikir. Bir bölmenin adına tıkla.",
  alt: "Sitozol içinde mitokondri: dış zar, kıvrımlı iç zar, aradaki zarlar arası boşluk ve iç zarın çevrelediği matriks. Sitozolde glikoliz, matrikste Krebs, iç zarda ETS yazıyor.",
  picks: COMP,
  draw: (_v, _s, pick = -1) => {
    const outer: V[] = Array.from({ length: 40 }, (_, i) => v(3.2 * Math.cos((2 * Math.PI * i) / 40), 1.7 * Math.sin((2 * Math.PI * i) / 40)));
    const inner: V[] = Array.from({ length: 60 }, (_, i) => {
      const a = (2 * Math.PI * i) / 60;
      const r = 1 + 0.12 * Math.cos(10 * a);
      return v(2.6 * r * Math.cos(a), 1.2 * r * Math.sin(a));
    });
    const els: El[] = [
      rect(-4.6, -2.6, 4.6, 2.6, { tone: hi(pick === 0, "muted"), thin: true, dash: true }),
      poly(outer, { tone: hi(pick === 3, "ink"), fill: pick === 3 ? "a" : undefined, smooth: true }),
      poly(inner, { tone: hi(pick === 2, "c"), fill: hi(pick === 1, "b"), smooth: true, bold: pick === 2 }),
      txt(v(-3.9, 2.2), "Sitozol", "e", { small: true, bold: pick === 0, tone: hi(pick === 0, "ink"), pick: 0 }),
      txt(v(0, 0.3), "Matriks", "c", { small: true, bold: pick === 1, tone: hi(pick === 1, "ink"), pick: 1 }),
      txt(v(4.0, -1.0), "İç zar", "e", { small: true, bold: pick === 2, tone: hi(pick === 2, "c"), pick: 2 }),
      seg(v(3.9, -1.0), v(2.3, -0.75), { thin: true, tone: "muted" }),
      txt(v(4.0, 1.4), "Zarlar arası", "e", { small: true, bold: pick === 3, tone: hi(pick === 3, "ink"), pick: 3 }),
      seg(v(3.9, 1.4), v(2.7, 1.05), { thin: true, tone: "muted" }),
      txt(v(-3.9, -2.2), "glikoliz", "e", { small: true, tone: "muted" }),
      ...pad(v(-4.9, 2.9), v(7.6, -2.9)),
    ];
    return { els, readout: [pick >= 0 ? COMP[pick].detail[0] : "Bir bölmeye tıkla ya da aşağıdan seç.", "Yer sorusunda önce hücre tipini belirle: prokaryotta mitokondri yoktur."] };
  },
};

const glycolysis: FigureDef = {
  caption:
    "Glikoliz defteri (bölüm örneği, çubuklar ölçekli): serbest glikoz başına 2 ATP yatırım, 4 ATP üretim → net 2 ATP; ayrıca 2 NADH ve 2 piruvat. Brüt 4 ile net 2 farklı soruların cevabıdır. 3 glikozda brüt 12, yatırım 6, net 6 ATP. Mol verilmişse sonuç mol, molekül verilmişse molekül sayısıdır.",
  alt: "Yatay çubuk grafik: yatırım ATP sola giden negatif çubuk, üretilen ATP sağa giden pozitif çubuk, altında net ATP çubuğu. Yanlarda NADH ve piruvat sayısı. İkinci adımda değerler üç katına çıkıyor.",
  steps: ["1 glikoz", "3 glikoz"],
  draw: (_v, step) => {
    const n = step ? 3 : 1;
    const K = 0.42;
    const els: El[] = [
      seg(v(0, 1.2), v(0, -2.4), { thin: true, tone: "muted" }),
      rect(-2 * n * K, 0.4, 0, 0.9, { tone: "warn", fill: "warn", thin: true }),
      rect(0, -0.4, 4 * n * K, 0.1, { tone: "c", fill: "c", thin: true }),
      rect(0, -1.7, 2 * n * K, -1.2, { tone: "a", fill: "a", thin: true }),
      txt(v(-2 * n * K - 0.15, 0.65), `yatırım −${2 * n}`, "w", { small: true, bold: true, tone: "warn" }),
      txt(v(4 * n * K + 0.15, -0.15), `üretim +${4 * n}`, "e", { small: true, bold: true, tone: "c" }),
      txt(v(2 * n * K + 0.15, -1.45), `net +${2 * n} ATP`, "e", { small: true, bold: true, tone: "a" }),
      txt(v(0, -2.6), `+ ${2 * n} NADH, ${2 * n} piruvat`, "s", { small: true, bold: true }),
      ...pad(v(-4.0, 1.5), v(8.2, -3.3)),
    ];
    return { els, readout: [`${4 * n} − ${2 * n} = ${2 * n} ATP net; ${2 * n} NADH.`, "Bu evre O₂ kullanmaz ve CO₂ çıkarmaz."] };
  },
};

const LEDGER: [string, number, number, number, number][] = [
  ["Glikoliz", 0, 2, 0, 2],
  ["Bağlantı ×2", 2, 2, 0, 0],
  ["Krebs ×2", 4, 6, 2, 2],
  ["Toplam", 6, 10, 2, 4],
];
const krebsLedger: FigureDef = {
  caption:
    "Bir glikozun defteri (bölüm örneği): iki Krebs turu 4 CO₂, 6 NADH, 2 FADH₂, 2 ATP eşdeğeri; iki bağlantı basamağı 2 CO₂ ve 2 NADH; glikoliz 2 NADH ve net 2 ATP. Toplam 6 CO₂ (glikozun 6 karbonu), 10 NADH, 2 FADH₂ ve substrat düzeyinde 4 ATP. Bunlar üretilen miktarlardır, hücrede birikmiş havuz değildir.",
  alt: "Dört satır ve dört sütunlu tablo: glikoliz, bağlantı, Krebs ve toplam satırları; CO₂, NADH, FADH₂ ve ATP sütunları. Toplam satırı 6, 10, 2, 4.",
  draw: () => {
    const cols = ["CO₂", "NADH", "FADH₂", "ATP"];
    const els: El[] = [];
    cols.forEach((c, j) => els.push(txt(v(3.6 + j * 1.7, 0.7), c, "c", { small: true, bold: true, tone: "muted" })));
    LEDGER.forEach(([n, ...vals], i) => {
      const y = -i * 0.9;
      const tot = i === 3;
      if (tot) els.push(seg(v(-0.2, y + 0.45), v(9.4, y + 0.45), { thin: true, tone: "muted" }));
      els.push(txt(v(0, y), n, "e", { small: true, bold: tot, tone: tot ? "a" : "ink" }));
      vals.forEach((x, j) => els.push(txt(v(3.6 + j * 1.7, y), String(x), "c", { small: true, bold: tot, tone: tot ? "a" : "ink" })));
    });
    els.push(...pad(v(-0.4, 1.2), v(9.6, -3.2)));
    return { els, readout: ["CO₂: 0 + 2 + 4 = 6; NADH: 2 + 2 + 6 = 10; FADH₂ 2; ATP: 2 + 2 = 4.", "Glikolizde CO₂ oluşmaz; altı karbonun hepsi bağlantı ve Krebs'te çıkar."] };
  },
};

const mitoSynthase: FigureDef = {
  caption:
    "Mitokondride kemiosmoz (özgün şema, ölçekli değil): ETS etkinliği protonları matriksten zarlar arası boşluğa taşır; protonlar ATP sentazdan matrikse dönerken ATP oluşur. ATP sentazın ATP yapan başı matrikse bakar. Elektronun yolu ile protonun zarı geçiş yönü aynı çizgi değildir.",
  alt: "Yatay iç zar. Üstte zarlar arası boşluk, altta matriks. ETS kutusu matriksten yukarı H⁺ okları taşıyor; zar boyunca e⁻ oku. Sağda ATP sentaz, yukarıdan matrikse H⁺ oku ve matriks tarafında ATP oluşumu.",
  draw: () => ({ els: [...membrane("zarlar arası", "matriks", "ETS", "iç zar"), ...pad(v(-3.2, 3.0), v(10.6, -2.3))], readout: ["H⁺ dışa pompalanır, ATP sentazdan matrikse döner; ATP matrikste oluşur.", "Zar bütünlüğü bozulursa elektron aktarımı ile ATP verimi ayrışabilir."] }),
};

const MODELS = [
  { name: "32 modeli", cyto: 2.5 },
  { name: "30 modeli", cyto: 1.5 },
];
const atpModels: FigureDef = {
  caption:
    "Yaklaşık öğretim hesabı: mitokondri NADH'ı başına ≈2,5, FADH₂ başına ≈1,5 ATP. 8 mitokondri NADH'ı × 2,5 = 20, 2 FADH₂ × 1,5 = 3; sitozolik 2 NADH 2,5 üzerinden 5 katılırsa oksidatif 28 + substrat 4 = 32; diğer mekik kabulünde 3 katılır: 26 + 4 = 30. Evrensel kesin sayı değildir.",
  alt: "Yığılmış yatay çubuk: substrat düzeyinde 4, mitokondri NADH'ından 20, FADH₂'den 3, sitozolik NADH'tan 5 ya da 3 ATP. Toplam 32 ya da 30.",
  steps: MODELS.map((m) => m.name),
  draw: (_v, step) => {
    const m = MODELS[step];
    const cyto = 2 * m.cyto;
    const parts: [string, number, Tone][] = [["substrat 4", 4, "muted"], ["8 NADH → 20", 20, "b"], ["2 FADH₂ → 3", 3, "c"], [`sitozolik 2 NADH → ${fmt(cyto, 0)}`, cyto, "a"]];
    const K = 0.25;
    const els: El[] = [];
    let x = 0;
    parts.forEach(([n, val, t], i) => {
      els.push(rect(x, 0, x + val * K, 0.7, { tone: t, fill: t, thin: true }));
      const at = i === 1 ? "c" : i === 3 ? "s" : "n";
      els.push(txt(v(x + (val * K) / 2, at === "c" ? 0.35 : at === "s" ? -0.25 : 0.95), n, at, { small: true, bold: true, tone: t === "muted" || i === 1 ? "ink" : t }));
      x += val * K;
    });
    const total = 4 + 23 + cyto;
    els.push(txt(v(x + 0.2, 0.35), `= ${fmt(total, 0)}`, "e", { bold: true, tone: "a" }));
    els.push(...pad(v(-1.0, 1.6), v(10.4, -1.0)));
    return { els, readout: [`Oksidatif ${fmt(23 + cyto, 0)} + substrat 4 = ${fmt(total, 0)} ATP.`, "Zar sızıntısı ve taşıma maliyeti gerçek verimi değiştirir; soruda verilen modeli kullan."] };
  },
};

export const biologyFigures059Molecular: Record<string, Record<string, FigureDef>> = {
  "ayt-protein-sentezi": {
    "RNA polimerazın yönlü çalışması": transcription,
    "Öncül RNA ile olgun mRNA": splicing,
    "A, P ve E bölgeleri": apeSites,
    "Sonlanma ve ürünün serbest kalması": termination,
    "Bir mRNA'da birden çok ribozom": polysome,
  },
  "ayt-fotosentez-tepkimeler": {
    "İki evre birbiriyle bağlantılıdır": twoStages,
    "ATP sentaz ve proton dönüşü": photoSynthase,
    "Calvin döngüsünde karbon bağlama": calvinFix,
    "PGA'dan trioz fosfata": calvinReduce,
    "Bir çıkış, beş yenileme": calvinRegen,
  },
  "solunum-oksijenli-bilanco": {
    "Hangi evre hangi bölmede?": compartments,
    "Glikolizin geri ödemesi ve net kazancı": glycolysis,
    "İki turun defterini kapat": krebsLedger,
    "Protonlar dışa pompalanır, matrikse geri döner": mitoSynthase,
    "30 ve 32 yaklaşık öğretim hesaplarıdır": atpModels,
  },
};
