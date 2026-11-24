import { type El, type FigureDef } from "./figureKit";
import { A, B, C, L, PL, R, S, T, chain, lead, mk, table, tableFig } from "./biologyFigures060Kit";
import { bars, graph, tr } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Fotosentez ve solunum, fotosentezin genel yapısı (Forge061).
 * Organel çizimi ve soğurma eğrisi nitel öğretim şemasıdır, ölçekli değildir.
 * Sayılar bölüm metninden gelir: saatte 8 birim bağlanan ve 3 birim bırakılan
 * karbon, iki yönde 4'er birim akı (dengeleme); günlük sıfır koşulu brüt hız ×
 * aydınlık saat = solunum hızı × 24 (bölümün sabit hız modeli); denklemde 6CO₂ +
 * 12H₂O; görünür ışık yaklaşık 380–750 nm ve E = hc/λ.
 */

/* ---------------- Fotosentez ve solunum ---------------- */

const net = mk({
  caption:
    "Brüt ve net: ölçülen fark (bölümdeki örnek): saatte 8 birim karbon bağlanıp 3 birim CO₂ bırakılıyorsa net alım saatte 5 birimdir. Dışarıdan net gaz değişimi gözlenir; içeride iki yönde eş zamanlı akı vardır. Birim ve sistem sınırı aynı olmalıdır.",
  alt: "Üç yatay çubuk: brüt bağlama, solunumla bırakılan ve net alım. Sürgü brüt bağlama hızını 0 ile 10 birim/saat arasında değiştirir; solunum 3 birimde sabit.",
  h: 180,
  param: { label: "Brüt bağlama", min: 0, max: 10, step: 1, init: 8, unit: "birim/saat" },
  draw: (g) => {
    const n = g - 3;
    const b = bars(
      [
        { label: "Brüt bağlama", value: g, tone: "a" },
        { label: "Solunum", value: 3, tone: "warn" },
        { label: "Net alım", value: Math.abs(n), text: n < 0 ? `−${-n} (net çıkış)` : String(n), tone: n < 0 ? "warn" : "b", dash: n < 0 },
      ],
      { max: 10, valueW: 150 },
    );
    return { els: b.els, readout: [`Net = ${g} − 3 = ${n < 0 ? "−" + -n : n} birim/saat.`, "Net değeri brüt üretim diye kullanmak iki yolu tek sonuçla karıştırır."] };
  },
});

const comp = mk({
  caption:
    "Işık dengeleme noktası (bölümdeki örnek): fotosentetik CO₂ alımı solunumsal CO₂ çıkışına eşitse net değişim sıfırdır; iki yönde saatte 4'er birim akı sürer. Dengeleme iki yolun durduğu anlamına gelmez; gece solunumu gün bilançosuna ayrıca eklenir.",
  alt: "Ortada yaprak kutusu; soldan içeri 4 birimlik CO₂ alım oku, sağdan dışarı 4 birimlik solunum oku; altta net sıfır yazısı.",
  h: 220,
  draw: () => {
    const els: El[] = [
      ...B(266, 100, "Yaprak", { w: 160, h: 80, tone: "a", fill: "a", bold: true }),
      A(40, 80, 180, 80, "a", { bold: true }),
      A(352, 120, 492, 120, "warn", { bold: true }),
      T(110, 54, "fotosentez: 4", "c", { tone: "a", bold: true }),
      T(422, 150, "solunum: 4", "c", { tone: "warn", bold: true }),
      T(266, 196, "dışarıdan net: 4 − 4 = 0", "c", { tone: "b", bold: true }),
    ];
    return { els, readout: ["Net sıfır, iki akının eşit olduğunu gösterir; ikisi de sürer.", "Anlık hız mı, gün sonu bilanço mu istendiğini önce ayır."] };
  },
});

const daily = mk({
  caption:
    "Günlük bilanço (bölümün sabit hız modeli, örnek hızlar: brüt 8, solunum 3 birim/saat): aydınlıkta bağlanan karbon brüt hız × aydınlık saat; solunum 24 saat sürer. Günlük sıfır için 8 × aydınlık saat = 3 × 24 gerekir. Katsayılar gerçek bir türün ışık yanıt eğrisi değildir.",
  alt: "Üç yatay çubuk: aydınlıkta bağlanan, 24 saatlik solunum ve günlük net. Sürgü aydınlık süresini 0 ile 16 saat arasında değiştirir.",
  h: 180,
  param: { label: "Aydınlık", min: 0, max: 16, step: 1, init: 12, unit: "saat" },
  draw: (h) => {
    const fix = 8 * h;
    const resp = 3 * 24;
    const n = fix - resp;
    const b = bars(
      [
        { label: "Bağlanan", value: fix, text: `8 × ${h} = ${fix}`, tone: "a" },
        { label: "Solunum", value: resp, text: "3 × 24 = 72", tone: "warn" },
        { label: "Günlük net", value: Math.abs(n), text: n < 0 ? `−${-n}` : String(n), tone: n < 0 ? "warn" : "b", dash: n < 0 },
      ],
      { max: 128, valueW: 156 },
    );
    return { els: b.els, readout: [`Günlük net = ${fix} − 72 = ${n < 0 ? "−" + -n : n} birim.`, `Sıfır koşulu: 8 × aydınlık = 72, yani 9 saat${h === 9 ? " (şu an)" : ""}.`] };
  },
});

const chemi = tableFig({
  caption:
    "İki organelde ortak ilke: kemiosmoz (bölüm metninden): elektron aktarımı protonları bir bölmede biriktirir, protonların ATP sentaz üzerinden dönüşü ATP sentezine bağlanır. Ortak ilke proton itici güçtür; bölmeler aynı değildir. ATP sentaz enerjiyi yoktan yaratmaz.",
  alt: "Üç satırlı tablo: mitokondride protonlar zarlar arası boşlukta birikir ve matrikse döner; kloroplastta tilakoit lümeninde birikir ve stromaya döner; elektron kaynağı mitokondride besinler, kloroplastta ışıkla bağlantılı akış.",
  headers: ["", "Mitokondri", "Kloroplast"],
  rows: [
    ["Birikme", "zarlar arası\nboşluk", "tilakoit\nlümeni"],
    ["Dönüş", "→ matriks", "→ stroma"],
    ["Elektron\nakışı", "besinlerin\nyükseltgenmesi", "ışıkla\nbağlantılı"],
  ],
  readout: ["Kloroplast stromasını yapraktaki stoma açıklığıyla karıştırma.", "Protonların dönüşü ATP sentaz üzerinden olur."],
});

const electrons = mk({
  caption:
    "Elektron vericisi ve son alıcı (nitel akış şeması): oksijenli fotosentezin doğrusal akışında su elektron kaynağıdır, NADP⁺ elektron alarak NADPH'ye geçer. Oksijenli solunumda NADH ve FADH₂ elektronlarını ETS'ye aktarır, O₂ son alıcıdır.",
  alt: "İki yatay akış. Üstte: su, ışık destekli akış, NADP⁺ ve NADPH. Altta: NADH ve FADH₂, ETS, O₂ ve su.",
  h: 250,
  draw: () => {
    const els: El[] = [
      T(20, 24, "Fotosentez", "e", { tone: "a", bold: true }),
      ...B(80, 80, "H₂O", { w: 110, tone: "c" }),
      A(138, 80, 196, 80, "a"),
      ...B(266, 80, "ışıkla akış", { w: 130, tone: "a" }),
      A(334, 80, 392, 80, "a"),
      ...B(456, 80, "NADP⁺ →\nNADPH", { w: 120, tone: "b", fill: "b" }),
      T(20, 150, "Solunum", "e", { tone: "warn", bold: true }),
      ...B(80, 206, "NADH,\nFADH₂", { w: 110, tone: "warn" }),
      A(138, 206, 196, 206, "warn"),
      ...B(266, 206, "ETS", { w: 130, tone: "warn" }),
      A(334, 206, 392, 206, "warn"),
      ...B(456, 206, "O₂ → H₂O", { w: 120, tone: "b", fill: "b" }),
    ];
    return { els, readout: ["NADP⁺ ilk elektron vericisi değildir; alıcıdır.", "Işık enerji düzeyini yükseltir; yeni elektron atomu değildir."] };
  },
});

/* ---------------- Fotosentezin genel yapısı ---------------- */

type Side = { C: number; H: number; O: number };
const atoms = (co2: number, h2oL: number, h2oR: number): [Side, Side] => [
  { C: co2, H: 2 * h2oL, O: 2 * co2 + h2oL },
  { C: 6, H: 12 + 2 * h2oR, O: 6 + 12 + h2oR },
];
const EQ = [
  { name: "Brüt", co2: 6, l: 12, r: 6, eq: "6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O" },
  { name: "Net", co2: 6, l: 6, r: 0, eq: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
];
const equation = mk({
  caption:
    "Brüt ve net denklem (bölümdeki okul düzeyi özet): iki taraftaki 6 su sadeleşince net denklem kalır. Atom sayıları iki yazımda da korunur; brüt 12 su girdisi ile net 6 su tüketimi farklı soruların yanıtıdır. Denklem çok basamaklı süreci heksoz eşdeğeriyle özetler.",
  alt: "Üstte seçili denklem; altında C, H ve O için sol ve sağ taraf atom sayıları tablosu. İki adım: brüt ve net.",
  h: 250,
  steps: EQ.map((e) => e.name),
  draw: (_v, step) => {
    const e = EQ[step];
    const [l, r] = atoms(e.co2, e.l, e.r);
    const t = table(
      ["Atom", "Sol", "Sağ"],
      (["C", "H", "O"] as const).map((k) => [k, String(l[k]), String(r[k])]),
      { y0: 60 },
    );
    return { els: [T(266, 24, e.eq, "c", { tone: "a", bold: true }), ...t.els], readout: [`${e.name}: C ${l.C} = ${r.C}, H ${l.H} = ${r.H}, O ${l.O} = ${r.O}.`, "Sadeleşme atomların mekanistik yolunu tek başına kanıtlamaz."] };
  },
});

const chloro = mk({
  caption:
    "Kloroplastın zarfı ve iç bölmeleri (nitel şema, ölçekli değil): iki zarlı organel; stroma sıvısında DNA, ribozom ve Calvin enzimleri; tilakoit keseciklerinin yığını granum, onları bağlayan lameller; kesecik içi lümen. Işık tepkimelerinin zar düzenekleri tilakoitte yer alır.",
  alt: "Yatay oval kloroplast, iki çizgili zarf. İçinde üç tilakoit yığını ve aralarını bağlayan yatay lameller; stroma, granum, lümen, DNA halkası ve ribozom noktaları işaretli.",
  h: 300,
  draw: () => {
    const els: El[] = [
      S([[20, 150], [80, 60], [260, 40], [440, 60], [500, 150], [440, 240], [260, 260], [80, 240]], { bold: true, tone: "a" }),
      S([[34, 150], [90, 72], [260, 54], [430, 72], [486, 150], [430, 228], [260, 246], [90, 228]], { tone: "a" }),
    ];
    for (const gx of [130, 260, 390]) for (let i = 0; i < 5; i++) els.push(R(gx - 34, 104 + i * 18, gx + 34, 118 + i * 18, { tone: "b", fill: "b" }));
    els.push(L(164, 140, 226, 140, { tone: "b", bold: true }), L(294, 158, 356, 158, { tone: "b", bold: true }));
    els.push(C(200, 210, 14, { tone: "warn" }));
    for (const [x, y] of [[330, 214], [346, 206], [354, 222]]) els.push(C(x, y, 3, { tone: "ink", fill: "ink" }));
    els.push(...lead(130, 104, 130, 24, "granum", "b", true, "e"));
    els.push(...lead(194, 140, 300, 24, "lamel", "b", false, "e"));
    els.push(...lead(260, 113, 400, 24, "lümen", "b", false, "e"));
    els.push(...lead(80, 190, 40, 284, "iki zarlı zarf", "a", false, "e"));
    els.push(...lead(200, 210, 230, 284, "DNA", "warn", false, "e"));
    els.push(...lead(346, 214, 330, 284, "ribozom", "ink", false, "e"));
    els.push(T(450, 190, "stroma", "c", { tone: "muted", bold: true }));
    return { els, readout: ["Calvin karbon tepkimelerinin temel enzimleri stromadadır.", "Stroma ile stoma farklı sözcüklerdir."] };
  },
});

const photon = mk({
  caption:
    "Dalga boyu ve foton enerjisi (bölümdeki bağıntı E = hc/λ; görünür aralık yaklaşık 380–750 nm): kısa dalga boyu daha yüksek foton enerjisi taşır. Oran yalnız dalga boylarından hesaplanır; ışık şiddeti ve foton sayısı ayrı niceliklerdir.",
  alt: "380 ile 750 nm arasında yatay dalga boyu ekseni; seçili dalga boyunda işaret ve altta 750 nm fotonuna göre enerji oranı çubuğu. Sürgü dalga boyunu değiştirir.",
  h: 220,
  param: { label: "Dalga boyu", min: 380, max: 750, step: 10, init: 450, unit: "nm" },
  draw: (lam) => {
    const X = (l: number) => 60 + ((l - 380) / 370) * 410;
    const els: El[] = [R(60, 36, 470, 66, { tone: "muted" }), L(X(lam), 30, X(lam), 72, { tone: "warn", bold: true })];
    els.push(T(60, 92, "380 nm", "c", { tone: "muted" }), T(470, 92, "750 nm", "c", { tone: "muted" }), T(X(lam), 14, `${lam} nm`, "c", { tone: "warn", bold: true }));
    const k = 750 / lam;
    const b = bars(
      [
        { label: "750 nm", value: 1, text: "1", tone: "muted" },
        { label: `${lam} nm`, value: k, text: `${tr(k, 2)} kat`, tone: "warn" },
      ],
      { y0: 116, max: 2, rowH: 44 },
    );
    els.push(...b.els);
    return { els, readout: [`E(${lam}) / E(750) = 750 / ${lam} = ${tr(k, 2)}.`, "Daha enerjik foton tek başına en yüksek fotosentez hızı demek değildir."] };
  },
});

const absorb = mk({
  caption:
    "Klorofil neden yeşil görünür? (nitel soğurma eğrisi, ölçekli değil): bitki klorofilleri mavi ve kırmızı bölgeleri güçlü soğurur; yeşil ışığın büyük bölümü yansır ya da geçer. Yeşil görünüm, yeşil fotonların en iyi kullanıldığının kanıtı değildir.",
  alt: "Yatay eksen dalga boyu, düşey eksen soğurma. Eğri mavi bölgede yüksek tepe, yeşil bölgede çukur, kırmızı bölgede ikinci tepe yapıyor. Altında mavi, yeşil ve kırmızı bölge etiketleri.",
  h: 280,
  draw: () => {
    const g = graph({ x0: 112, yb: 220, w: 380, h: 170, xmin: 400, xmax: 700, ymax: 1.1, xl: "λ", yl: "soğurma" });
    const f = (x: number) => 0.06 + 0.9 * Math.exp(-(((x - 440) / 28) ** 2)) + 0.65 * Math.exp(-(((x - 665) / 18) ** 2));
    const els: El[] = [...g.els, PL(g.plot(f, 400, 700, 80), { open: true, bold: true, tone: "a" })];
    els.push(T(g.X(440), 252, "mavi", "c", { tone: "b", bold: true }), T(g.X(550), 252, "yeşil: yansır", "c", { tone: "a" }), T(g.X(665), 252, "kırmızı", "c", { tone: "warn", bold: true }));
    return { els, readout: ["Klorofilin merkez atomu Mg'dir; Fe değildir.", "Soğurma spektrumu ile eylem spektrumu ilişkili ama özdeş değildir."] };
  },
});

const history = mk({
  caption:
    "Deneyler nasıl bilgi biriktirdi? (bölüm metninden, tarih verilmez): her deney kendi öncülleriyle değerlendirilir; tek bir çalışma bütün mekanizmayı bir anda ortaya koymadı. İzotop deneyleri O₂'nin su kaynaklı olduğunu aydınlattı.",
  alt: "Yukarıdan aşağı altı kutu: Van Helmont toprak kütlesi yetmez; Priestley hava bileşimi; De Saussure CO₂ ve su katkısı; Van Niel farklı elektron kaynakları; Hill kloroplastta O₂ çıkışı; Ruben ve arkadaşları izotopla O₂ kaynağı.",
  h: 440,
  draw: () => {
    const c = chain(
      [
        { label: "Van Helmont", note: "toprak yetmez" },
        { label: "Priestley", note: "hava bileşimi" },
        { label: "De Saussure", note: "CO₂ ve su" },
        { label: "Van Niel", note: "elektron kaynağı", tone: "c" },
        { label: "Hill", note: "ayrı O₂ çıkışı", tone: "b" },
        { label: "Ruben ve ark.", note: "izotop: su → O₂", tone: "a", bold: true },
      ],
      { cx: 116, w: 200, gap: 22 },
    );
    return { els: c.els, readout: ["Van Helmont'un gözlemi bütün karbonun sudan geldiğini kanıtlamadı.", "Hill düzeneği O₂ çıkışını CO₂ bağlanmasından ayrı inceledi."] };
  },
});

export const biologyFigures061Photo: Record<string, Record<string, FigureDef>> = {
  "ayt-fotosentez-solunum": {
    "Brüt ve net: ölçülen fark": net,
    "Işık dengeleme noktası": comp,
    "İki organelde ortak ilke: kemiosmoz": chemi,
    "Elektron vericisi ve son alıcı": electrons,
    "Grafiği okuyarak düşün": daily,
  },
  "ayt-fotosentez-genel": {
    "Brüt ve net denklemi oku": equation,
    "Deneyler nasıl bilgi biriktirdi?": history,
    "Kloroplastın zarfı ve iç bölmeleri": chloro,
    "Işığın dalga boyu ve fotonu": photon,
    "Klorofil neden yeşil görünür?": absorb,
  },
};
