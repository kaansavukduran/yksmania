import { fmt, type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, PL, R, S, T, chain, lead, mk, table, tw } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Yaprak, gövde, örtü doku ve temel doku (Forge060). Kesit
 * çizimleri tipik öğretim modelidir, ölçekli değildir; tabaka kalınlıkları
 * ölçülmüş tür oranı değildir. Sayılar bölümlerden gelir: beş düğüm dört
 * aralık, −0,3 ve −0,8 MPa örneği, hava %20 ve palizat payı 0,75 örneği.
 */

const mpa = (x: number) => fmt(x).replace("-", "−");

/** Çizimi yatayda x0 çevresinde k katına sıkıştırır (yalnız çizgi, çokgen, daire). */
const squeeze = (els: El[], k: number, x0 = 20): El[] => {
  const f = (p: readonly [number, number]): [number, number] => [x0 + (p[0] - x0) * k, p[1]];
  return els.map((e) => {
    if (e.k === "seg" || e.k === "vec" || e.k === "line" || e.k === "ray") return { ...e, a: f(e.a), b: f(e.b) };
    if (e.k === "poly") return { ...e, ps: e.ps.map(f) };
    if (e.k === "circle") return { ...e, c: f(e.c) };
    if (e.k === "text") return { ...e, p: f(e.p) };
    return e;
  });
};

/* ---------------- Yaprak enine kesiti ---------------- */

type LeafMode = "systems" | "stoma" | "vein" | "co2" | "water";
const SPONGY: [number, number][] = [
  [36, 166], [66, 220], [170, 164], [200, 214], [232, 168], [230, 206], [312, 166], [330, 214], [176, 230], [296, 196], [44, 206],
];
const leaf = (mode: LeafMode): El[] => {
  const els: El[] = [L(20, 36, 350, 36, { tone: "warn", bold: true }), L(20, 266, 350, 266, { tone: "warn", bold: true })];
  for (let x = 20; x < 350; x += 22) els.push(R(x, 40, x + 22, 62, { tone: "muted" }));
  for (let x = 20; x < 350; x += 22) if (x + 22 <= 250 || x >= 294) els.push(R(x, 238, x + 22, 260, { tone: "muted" }));
  for (let x = 22; x < 348; x += 20.5) els.push(R(x, 66, x + 17, 146, { tone: "c", fill: mode === "systems" ? "c" : undefined }));
  for (const [x, y] of SPONGY) els.push(C(x, y, 14, { tone: "c", fill: mode === "systems" ? "c" : undefined, thin: true }));
  const vh = mode === "vein" || mode === "water";
  els.push(C(116, 192, 34, { tone: vh ? "ink" : "muted", bold: vh }));
  for (const dx of [-12, 0, 12]) els.push(C(116 + dx, 180, 6, { tone: "a", fill: "a", bold: true }));
  for (const dx of [-8, 8]) els.push(C(116 + dx, 206, 4, { tone: "b", fill: "b" }));
  const sh = mode === "stoma" || mode === "co2" || mode === "water";
  els.push(S([[252, 242], [262, 238], [270, 249], [262, 260], [252, 256]], { tone: "c", fill: "c", bold: sh }), S([[292, 242], [282, 238], [274, 249], [282, 260], [292, 256]], { tone: "c", fill: "c", bold: sh }));
  const g = squeeze(els, 0.8);
  const lab: El[] = [];
  const X = (x: number) => 20 + (x - 20) * 0.8;
  const ld = (x: number, y: number, ly: number, t: string, tone: Tone, b = false) => lab.push(...lead(X(x), y, 300, ly, t, tone, b));
  const tx = (y: number, t: string, tone: Tone) => lab.push(T(300, y, t, "e", { tone }));
  if (mode === "systems") {
    ld(330, 51, 51, "epidermis", "ink", true);
    ld(330, 110, 110, "palizat mezofil", "c");
    ld(330, 214, 176, "sünger mezofil", "c");
    ld(150, 192, 214, "damar: iletim", "a", true);
    ld(240, 36, 16, "kütikula", "warn");
    ld(330, 249, 250, "alt epidermis", "ink");
  } else if (mode === "stoma") {
    ld(286, 249, 250, "bekçi hücreleri", "c", true);
    ld(272, 249, 290, "gözenek", "ink");
    ld(272, 222, 140, "hava boşluğu", "b", true);
    tx(168, "mezofil aralıklarıyla", "b");
    tx(194, "bağlantılı", "b");
  } else if (mode === "vein") {
    ld(128, 180, 110, "ksilem: üst yüz", "a", true);
    ld(124, 206, 230, "floem: alt yüz", "b", true);
    tx(20, "üst yüz", "muted");
    tx(286, "alt yüz", "muted");
  } else if (mode === "co2") {
    g.push(...squeeze([A(272, 300, 272, 228, "c", { bold: true }), A(272, 222, 236, 182, "c", { bold: true }), A(276, 222, 306, 180, "c", { bold: true })], 0.8));
    tx(290, "1. dış hava, stoma", "c");
    tx(222, "2. iç hava boşluğu", "c");
    tx(160, "3. hücre yüzeyi", "c");
    tx(96, "4. organik madde", "c");
  } else {
    g.push(...squeeze([A(132, 176, 196, 160, "b", { bold: true }), A(206, 176, 262, 220, "b", { bold: true, dash: true }), A(272, 232, 272, 300, "b", { bold: true, dash: true })], 0.8));
    tx(110, "1. sıvı: ksilemden", "b");
    tx(136, "mezofil çeperine", "b");
    tx(200, "2. buharlaşma", "b");
    tx(290, "3. buhar stomadan", "b");
  }
  return [...g, ...lab];
};
const leafSystems = mk({
  caption:
    "Enine kesitte üç doku sistemi (tipik yaprak modeli, tabaka kalınlıkları ölçekli değil): yüzeyi örten epidermis ve kütikula, aradaki temel doku mezofil (üstte palizat, altta sünger) ve damarları oluşturan iletim dokusu. Üst ve alt, yaprağın tanımlanmış yüzleridir.",
  alt: "Yaprak enine kesiti: üstte kütikula ve tek sıra epidermis, altında sık dizili uzun palizat hücreleri, onun altında aralıklı yuvarlak sünger hücreleri ve içlerinde damar, en altta alt epidermis ve bir stoma. Sağda doku adları.",
  h: 310,
  draw: () => ({ els: leaf("systems"), readout: ["Bütün yapraklar aynı kalınlıkta ya da aynı hücre dizilişinde değildir.", "Çizim doku bağlantısını gösteren bir öğretim düzenidir."] }),
});
const leafStoma = mk({
  caption:
    "Stoma iç hava alanını dışarıya açar (tipik yaprak modeli, ölçekli değil): iki bekçi hücre bir gözeneği çevreler; gözeneğin altında mezofil aralıklarıyla bağlantılı hava boşluğu vardır. Açıklık hücre değildir ve kloroplast taşımaz; kloroplast bekçi hücrelerdedir.",
  alt: "Aynı yaprak kesiti; alt epidermisteki iki bekçi hücre vurgulu, aralarında gözenek ve üstünde hava boşluğu işaretli.",
  h: 310,
  draw: () => ({ els: leaf("stoma"), readout: ["Açılıp kapanma bekçi hücrelerinin su durumu, iyon dengesi ve çeper düzeniyle ilişkilidir.", "Stoma yalnız terlemeyi artırmak için kurulmuş bir delik değildir; su kaybı ile CO₂ kazanımını dengeler."] }),
});
const leafVein = mk({
  caption:
    "Tipik damar içinde ksilem ve floem (gösterilen yaprak modeli, ölçekli değil): ksilem üst yüze, floem alt yüze yakın taraftadır. Ksilem su ve mineralin yaprağa ulaşmasına, floem organik maddenin iletimine katılır. Şekli döndürmek organ içindeki konumu tersine çevirmez.",
  alt: "Aynı yaprak kesiti; mezofildeki damar vurgulu. Damarın üst yarısında ksilem, alt yarısında floem grupları; sağda üst yüz ve alt yüz yazıları.",
  h: 310,
  draw: () => ({ els: leaf("vein"), readout: ["Yerleşim için yaprağın hangi yüzünün üst olduğu verilmelidir.", "Aynı damar iki farklı iletim görevini birlikte taşır."] }),
});
const leafCO2 = mk({
  caption:
    "CO₂ yolu (net fotosentez yapan, dış havadan içe CO₂ farkı bulunan olgun yaprak örneği; ölçekli değil): CO₂ stomadan iç hava boşluğuna, oradan hücre yüzeylerine yayılır; hücrede organik maddeye katılır. Gazın girmesi ile kimyasal bağlanması ayrı basamaklardır.",
  alt: "Aynı yaprak kesiti; alttan stomaya giren, hava boşluğundan iki mezofil hücresine dağılan oklar ve sağda numaralı basamaklar.",
  h: 310,
  draw: () => ({ els: leaf("co2"), readout: ["Solunum canlı hücrelerde de sürer; net fotosentez yoksa gradiyentler değişebilir.", "Her koşulda yapraktan yalnız oksijen çıkar, yalnız CO₂ girer diye ezberleme."] }),
});
const leafWater = mk({
  caption:
    "Su sıvı yoldan buhar yoluna geçer (tipik yaprak modeli, ölçekli değil): ksilemle gelen su mezofil çeperlerindeki ince filme ulaşır, buharlaşarak hava boşluklarına geçer ve dış hava daha kuruysa stomadan yayılır. Sıvı iletimi, buharlaşma ve gaz yayılması üç ayrı fiziksel basamaktır.",
  alt: "Aynı yaprak kesiti; damardaki ksilemden mezofil hücresine düz ok, oradan hava boşluğuna kesik ok, stomadan dışarı kesik ok. Sağda üç basamak.",
  h: 310,
  draw: () => ({ els: leaf("water"), readout: ["Düz ok sıvı suyu, kesik oklar buharı gösterir.", "Stoma kapanması kütikuladan gerçekleşen kaybı otomatik olarak sıfırlamaz."] }),
});

/* ---------------- Gövde ---------------- */

const nodes = mk({
  caption:
    "Düğüm ve iki düğüm arası (bölüm örneği: beş ardışık düğüm arasında dört tam aralık): yaprağın gövdeye bağlandığı yer düğümdür, iki düğüm arasındaki eksen bölümü internodyumdur. Düğüm saymak ile aralık uzunluğu ölçmek farklı işlemlerdir. Çizim ölçekli değildir.",
  alt: "Düşey gövde üzerinde sürgüyle seçilen sayıda düğüm; her düğümde dönüşümlü sağa ya da sola uzanan bir yaprak. Sağda en üstteki aralık işaretli.",
  h: 320,
  param: { label: "Düğüm sayısı", min: 2, max: 8, step: 1, init: 5 },
  draw: (n) => {
    const els: El[] = [L(140, 306, 140, 16, { bold: true, tone: "c" })];
    const y = (i: number) => 290 - (i * 260) / (n - 1);
    for (let i = 0; i < n; i++) {
      const s = i % 2 ? -1 : 1;
      els.push(C(140, y(i), 5, { tone: "a", fill: "a" }));
      els.push(S([[140, y(i)], [140 + s * 30, y(i) - 14], [140 + s * 64, y(i) - 10], [140 + s * 34, y(i) + 4]], { tone: "c", fill: "c" }));
    }
    els.push(L(230, y(n - 1), 230, y(n - 2), { tone: "b", bold: true }), L(222, y(n - 1), 238, y(n - 1), { tone: "b" }), L(222, y(n - 2), 238, y(n - 2), { tone: "b" }));
    els.push(T(244, (y(n - 1) + y(n - 2)) / 2, "iki düğüm arası", "e", { tone: "b" }));
    els.push(...lead(140, y(0), 230, 256, "düğüm", "a"));
    els.push(T(450, 214, `${n} düğüm`, "c", { bold: true, tone: "a" }), T(450, 242, `${n - 1} aralık`, "c", { bold: true, tone: "b" }));
    return { els, readout: [`${n} ardışık düğüm arasında ${n} − 1 = ${n - 1} tam aralık vardır.`, "Yaprak izi ve tomurcuk pulu izleri dış yüzeyde, büyüme halkaları ikincil ksilemdedir."] };
  },
});

const MONO: [number, number][] = [
  [-90, -40], [-60, -90], [-10, -110], [50, -100], [95, -60], [110, 0], [90, 60], [40, 105], [-20, 108], [-75, 80], [-110, 20], [-40, -40], [20, -50], [60, -10], [30, 40], [-30, 30], [-60, -5], [0, 0], [-5, 70], [70, 30], [-100, -80], [100, -100],
];
const stemSection = (kind: "mono" | "dicot"): El[] => {
  const cx = 160;
  const cy = 160;
  const els: El[] = [C(cx, cy, 146, { bold: true }), C(cx, cy, 140, { tone: "muted", thin: true })];
  const lab: El[] = [];
  if (kind === "dicot") {
    els.push(C(cx, cy, 90, { tone: "warn", dash: true, thin: true }));
    for (let i = 0; i < 8; i++) {
      const t = (i / 8) * 2 * Math.PI;
      els.push(C(cx + 78 * Math.cos(t), cy + 78 * Math.sin(t), 11, { tone: "a", fill: "a", bold: true }), C(cx + 101 * Math.cos(t), cy + 101 * Math.sin(t), 8, { tone: "b", fill: "b" }));
    }
    lab.push(T(cx, cy, "öz", "c", { bold: true, tone: "muted" }));
    lab.push(...lead(cx + 125, cy - 30, 290, 30, "korteks", "muted"));
    lab.push(...lead(cx + 101 * Math.cos(-0.785), cy + 101 * Math.sin(-0.785), 290, 90, "floem: dış", "b", true));
    lab.push(...lead(cx + 90 * Math.cos(-0.4), cy + 90 * Math.sin(-0.4), 290, 150, "kambiyum", "warn"));
    lab.push(...lead(cx + 78, cy, 290, 210, "ksilem: içte", "a", true));
    lab.push(T(300, 270, "halka düzeni", "e", { tone: "ink" }));
  } else {
    for (const [dx, dy] of MONO) {
      const r = Math.hypot(dx, dy) || 1;
      els.push(C(cx + dx, cy + dy, 7, { tone: "a", fill: "a", bold: true }), C(cx + dx * (1 + 10 / r), cy + dy * (1 + 10 / r) + (r === 1 ? 10 : 0), 4, { tone: "b", fill: "b" }));
    }
    lab.push(...lead(cx + 110, cy, 290, 60, "dağınık demetler", "a", true));
    lab.push(...lead(cx + 60, cy + 90, 290, 150, "temel doku", "muted"));
    lab.push(T(300, 230, "olağan damar", "e", { tone: "warn" }), T(300, 256, "kambiyumu yok", "e", { tone: "warn" }));
  }
  const K = 0.82;
  const f = (p: readonly [number, number]): [number, number] => [cx + (p[0] - cx) * K, -cy + (p[1] + cy) * K];
  const g = els.map((e) => (e.k === "circle" ? { ...e, c: f(e.c), r: e.r * K } : e));
  return [...g, ...lab.map((e) => (e.k === "seg" ? { ...e, a: f(e.a) } : e.k === "circle" ? { ...e, c: f(e.c) } : e.k === "text" && e.at === "c" ? { ...e, p: f(e.p) } : e))];
};
const monoStem = mk({
  caption:
    "Tipik tek çenekli gövde kesiti (mısır gibi örnek; nitel şema, ölçekli değil): iletim demetleri temel doku içinde dağınıktır; korteks ile öz iki belirgin bölgeye ayrılmaz. Demetlerde olağan damar kambiyumu yoktur. Bu, hiçbir tek çeneklinin hiçbir yolla kalınlaşamayacağı iddiası değildir.",
  alt: "Yuvarlak gövde kesiti; içinde rastgele dağılmış çok sayıda küçük iletim demeti, her demette büyük ksilem ve yanında küçük floem noktası.",
  h: 320,
  draw: () => ({ els: stemSection("mono"), readout: ["Dağınık olmak düzensiz ya da işlevsiz olmak demek değildir.", "Tipik çift çenekli kalınlaşma modeli aynı biçimde uygulanmaz."] }),
});
const dicotStem = mk({
  caption:
    "Tipik çift çenekli genç gövde kesiti (nitel şema, ölçekli değil): demetler bir halka çevresinde dizilir; halkanın dışı korteks, merkez özdür. Demette merkeze yakın tarafta ksilem, dışa yakın tarafta floem, aralarında damar kambiyumu bulunabilir. İç ve dış sözcüklerinin referansı organın merkezidir.",
  alt: "Yuvarlak gövde kesiti; sekiz demet halka hâlinde. Her demette içte büyük ksilem, dışta küçük floem; ikisinin arasından geçen kesik kambiyum halkası. Merkezde öz.",
  h: 320,
  draw: () => ({ els: stemSection("dicot"), readout: ["Sayfa döndürülse de ksilem merkeze yakın kalır.", "Bu düzen kökteki merkezî ksilem yerleşimiyle aynı değildir."] }),
});

const YEARS = ["1. büyüme dönemi", "2. büyüme dönemi", "3. büyüme dönemi"];
const growth = mk({
  caption:
    "Vasküler kambiyum iki yana ürün verir (nitel şema, ölçekli değil): bölünmelerle içe ikincil ksilem, dışa ikincil floem eklenir; organın çevresi büyür. Ksilem birikimi odunun büyük bölümünü oluşturur, floem dışta daha ince kalabilir. İki ürünün eşit miktarda oluşacağı verilmeden kabul edilmez.",
  alt: "İç içe halkalar: merkezde öz, büyüyen ikincil ksilem, kalın kambiyum çizgisi, ince ikincil floem ve dış doku. Adımlarda ksilem halkası belirgin biçimde, floem halkası az genişliyor.",
  h: 320,
  steps: YEARS,
  draw: (_v, step) => {
    const cx = 150;
    const cy = 160;
    const ks = 50 + step * 30;
    const fl = ks + 12 + step * 3;
    const els: El[] = [
      C(cx, cy, fl + 12, { tone: "warn", fill: "warn" }),
      C(cx, cy, fl, { tone: "b", fill: "b" }),
      C(cx, cy, ks, { tone: "c", fill: "c" }),
      C(cx, cy, 16, { tone: "ink", fill: "muted" }),
      C(cx, cy, ks + 2, { tone: "a", bold: true }),
    ];
    els.push(...lead(cx + ks + 2, cy - 4, 320, 40, "kambiyum", "a", true));
    els.push(...lead(cx + ks * 0.6, cy + 20, 320, 110, "içe: ikincil ksilem", "c"));
    els.push(...lead(cx + fl - 4, cy + 30, 320, 180, "dışa: ikincil floem", "b"));
    els.push(T(320, 260, YEARS[step], "e", { bold: true }));
    return { els, readout: [`${step + 1}. dönem: ksilem içe birikir, floem dışta ince bir bölge olarak kalır.`, "Kambiyum yeni dokular eklerken organın çapı büyür."] };
  },
});

const rings = mk({
  caption:
    "Büyüme halkası (ders modeli: bir mevsim, bir halka kabulü; ölçekli değil): erken odun genellikle geniş lümenli ve ince çeperli, geç odun dar lümenli ve kalın çeperli elemanlar içerir; bir erken ve onu izleyen geç odun bir halkadır. Kuraklık yalancı halka oluşturabilir; kesitin yüksekliği verilmelidir.",
  alt: "İç içe halkalar: her yıl için geniş açık bir erken odun bandı ve dar koyu bir geç odun bandı. Sürgüyle yıl sayısı 1 ile 5 arasında değişir.",
  h: 320,
  param: { label: "Büyüme dönemi", min: 1, max: 5, step: 1, init: 3 },
  draw: (n) => {
    const cx = 150;
    const cy = 160;
    const els: El[] = [];
    for (let i = n; i >= 1; i--) {
      const r = 14 + i * 27;
      els.push(C(cx, cy, r, { tone: "warn", fill: "warn", bold: true }), C(cx, cy, r - 8, { tone: "c", fill: "c", thin: true }));
    }
    els.push(C(cx, cy, 14, { tone: "ink", fill: "muted" }));
    els.push(...lead(cx + 14 + 27 - 18, cy, 312, 60, "erken: geniş lümen", "c"));
    els.push(...lead(cx + 14 + 27 - 3, cy + 6, 320, 120, "geç: kalın çeper", "warn", true));
    els.push(T(320, 210, `${n} halka`, "e", { bold: true }), T(320, 238, `= ${n} dönem`, "e", { tone: "muted" }));
    return { els, readout: [`${n} erken + geç odun çifti → ${n} halka (bir mevsim, bir halka kabulüyle).`, "Bu kabul bütün doğaya otomatik taşınmaz; halka genişliği tek bir etkenin sonucu değildir."] };
  },
});

const GIRD = [
  { name: "Erken etki", late: false, txt: "Floem halkası kesildi, ksilem sağlam: yapraktan köke organik madde aktarımı kesilir; kesinin üstünde birikim görülebilir; su iletimi ilk anda sürer." },
  { name: "Geç etki", late: true, txt: "Uzun sürede kök depolarını tüketip canlılığını kaybederse su ve mineral alımı dolaylı biçimde aksar." },
];
const girdling = mk({
  caption:
    "Halka çıkarma deneyi (nitel şema, ölçekli değil): yalnız floemi etkileyen kabuk halkası çıkarılırsa yapraktan köke organik madde aktarımı kesintiye uğrayabilir; ksilem sağlamsa su iletimi ilk anda kesilmez. Uzun sürede kökün depoları tükenirse su alımı dolaylı aksar. İlk ve sonraki etki aynı mekanizma değildir.",
  alt: "Düşey gövde: üstte yapraklar, altta kökler. Ortada dış floem çizgilerinin kesildiği halka bölgesi; içteki ksilem çizgileri sürekli. Floem boyunca inen ok halkanın üstünde duruyor ve orada şişkinlik var; ksilemde yukarı ok. İkinci adımda kök sönük ve su oku kesik.",
  h: 330,
  steps: GIRD.map((g) => g.name),
  draw: (_v, step) => {
    const g = GIRD[step];
    const els: El[] = [
      S([[200, 40], [150, 20], [110, 36], [150, 50]], { tone: "c", fill: "c" }),
      S([[200, 40], [250, 20], [290, 36], [250, 50]], { tone: "c", fill: "c" }),
      L(192, 40, 192, 290, { tone: "b", bold: true }),
      L(208, 40, 208, 290, { tone: "b", bold: true }),
      L(182, 40, 182, 150, { tone: "warn", bold: true }),
      L(218, 40, 218, 150, { tone: "warn", bold: true }),
      L(182, 172, 182, 290, { tone: "warn", bold: true }),
      L(218, 172, 218, 290, { tone: "warn", bold: true }),
      S([[182, 120], [174, 136], [176, 150], [182, 150]], { open: true, tone: "warn" }),
      S([[218, 120], [226, 136], [224, 150], [218, 150]], { open: true, tone: "warn" }),
      A(200, 270, 200, 70, "b", { bold: !g.late, dash: g.late }),
      A(232, 60, 232, 140, "warn", { bold: true }),
    ];
    for (const dx of [-30, -10, 10, 30]) els.push(L(200, 290, 200 + dx, 318, { tone: g.late ? "muted" : "ink", dash: g.late }));
    els.push(...lead(218, 161, 290, 170, "halka: floem çıkarıldı", "warn", true));
    els.push(T(250, 110, "birikim", "e", { tone: "warn" }), T(120, 196, "ksilem: su", "c", { tone: "b" }), T(120, 228, g.late ? "dolaylı aksar" : "sürer", "c", { tone: "b", bold: true }));
    if (g.late) els.push(T(290, 300, "kök deposu tükenir", "e", { tone: "muted", bold: true }));
    return { els, readout: [g.txt, "Ksilem de zarar gördüyse yalnız floem sonucu çıkarılamaz; kesinin kapsamı verilmelidir."] };
  },
});

/* ---------------- Örtü doku ---------------- */

const stomaView = mk({
  caption:
    "Stoma yüzeyden (geniş yapraklı türlerde böbrek biçimli bekçi hücreleri; nitel şema, ölçekli değil): iki canlı bekçi hücresi çekirdek ve çoğunlukla kloroplast taşır, aralarında açıklık vardır; çevrede komşu epidermis hücreleri bulunur. Açıklık bir hücre değildir. Buğdaygillerde halter benzeri biçim görülebilir.",
  alt: "Ortada iki böbrek biçimli bekçi hücresi ve aralarında mercek biçimli gözenek; hücrelerde çekirdek ve küçük kloroplast noktaları. Çevrede düzensiz çokgen epidermis hücreleri.",
  h: 300,
  draw: () => {
    const els: El[] = [];
    const nb: [number, number][][] = [
      [[60, 30], [160, 20], [200, 70], [150, 110], [70, 100]],
      [[200, 70], [300, 30], [330, 76], [266, 92], [230, 92]],
      [[60, 120], [150, 110], [200, 150], [150, 200], [60, 190]],
      [[332, 140], [380, 110], [380, 210], [334, 180]],
      [[70, 210], [150, 200], [200, 250], [120, 290], [60, 270]],
      [[200, 250], [266, 228], [334, 250], [300, 290], [220, 290]],
    ];
    for (const p of nb) els.push(PL(p, { tone: "muted", thin: true }));
    els.push(S([[262, 92], [236, 104], [214, 150], [236, 210], [262, 222], [256, 190], [254, 150], [256, 112]], { tone: "c", fill: "c", bold: true }));
    els.push(S([[270, 92], [296, 104], [318, 150], [296, 210], [270, 222], [276, 190], [278, 150], [276, 112]], { tone: "c", fill: "c", bold: true }));
    els.push(C(232, 150, 9, { tone: "ink", fill: "ink" }), C(300, 150, 9, { tone: "ink", fill: "ink" }));
    for (const [x, y] of [[238, 120], [234, 180], [244, 200], [294, 120], [298, 182], [288, 200]] as const) els.push(C(x, y, 3.5, { tone: "c", fill: "c" }));
    const k = 0.8;
    const X = (x: number) => 20 + (x - 20) * k;
    const lab: El[] = [
      ...lead(X(266), 150, 330, 40, "açıklık", "ink", true),
      ...lead(X(306), 120, 330, 100, "bekçi hücresi", "c", true),
      ...lead(X(300), 150, 330, 160, "çekirdek", "ink"),
      ...lead(X(298), 182, 330, 220, "kloroplast", "c"),
      ...lead(X(360), 196, 330, 276, "epidermis", "muted"),
    ];
    return { els: [...squeeze(els, k), ...lab], readout: ["İçe ve dışa bakan çeper bölümlerinin kalınlık ve esneme özellikleri farklıdır.", "Tek çizimin şekli bütün türlerin zorunlu biçimi değildir."] };
  },
});

const psiOut = -0.3;
const psiCell = -0.8;
const psiFig = mk({
  caption:
    "Su potansiyelini topla, yönü bul (bölüm örneği: dış ortam −0,3 MPa, hücre −0,8 MPa): okul modelinde Ψ = Ψs + Ψp; su yüksek Ψ'den düşük Ψ'ye geçer. Negatif sayılarda −0,3 daha büyüktür, net yön hücre içinedir. Su geçişi ATP ile pompalanmaz; iyon pompaları farkı dolaylı oluşturabilir.",
  alt: "Solda dış ortam kutusu Ψ eksi 0,3; sağda hücre kutusu Ψ eksi 0,8; aralarında dış ortamdan hücreye su oku.",
  h: 220,
  draw: () => {
    const els: El[] = [
      ...B(110, 90, "Dış ortam", { w: 170, h: 90, tone: "c", bold: true }),
      ...B(422, 90, "Hücre", { w: 170, h: 90, tone: "b", bold: true }),
      T(110, 160, `Ψ = ${mpa(psiOut)} MPa`, "c", { bold: true, tone: "c" }),
      T(422, 160, `Ψ = ${mpa(psiCell)} MPa`, "c", { bold: true, tone: "b" }),
      A(200, 90, 332, 90, "a", { bold: true }),
      T(266, 64, "net su", "c", { tone: "a" }),
      T(266, 200, `${mpa(psiOut)} > ${mpa(psiCell)}`, "c", { bold: true }),
    ];
    return { els, readout: [`${mpa(psiOut)} > ${mpa(psiCell)} MPa: net su hücre içine.`, "Çözünen artışı Ψs'yi düşürür, pozitif turgor Ψp'yi artırır; iki etki toplanır."] };
  },
});

const GUARD = [
  {
    name: "Açılma",
    items: ["K⁺ ve çözünen girer", "Ψs düşer", "Su içeri girer", "Turgor artar", "Çeper eşit esnemez", "Açıklık genişler"],
    txt: "İyon ve çözünen alımı → su girişi → turgor artışı → eşit olmayan esneme → açılma.",
  },
  { name: "Kapanma", items: ["Çözünen dışarı çıkar", "Ψs yükselir", "Su dışarı çıkar", "Turgor azalır", "Çeper gevşer", "Açıklık daralır"], txt: "Çözünen çıkışı ve su kaybı turgoru azaltarak kapanmayı destekler." },
];
const guardChain = mk({
  caption:
    "Çözünen → su → turgor → şekil zinciri (nitel akış şeması): bekçi hücrelerine K⁺ ve eş iyonların alınması su girişini destekler, turgor artar ve eşit esnemeyen çeperler açıklığı genişletir. Ters zincir kapanmayı destekler. 'Işık deliği açar' demek basamakları atlar; çizimdeki açıklık gerçek gözenek çapı hesabı değildir.",
  alt: "Altı kutulu düşey zincir. Açılma adımında: K⁺ ve çözünen girer, Ψs düşer, su içeri girer, turgor artar, çeper eşit esnemez, açıklık genişler. Kapanma adımında ters yönlü karşılıkları.",
  h: 340,
  steps: GUARD.map((g) => g.name),
  draw: (_v, step) => {
    const g = GUARD[step];
    const t: Tone = step === 0 ? "c" : "warn";
    const c = chain(
      g.items.map((l, i) => ({ label: l, tone: i === 5 ? t : "ink", fill: i === 5 ? t : undefined, bold: i === 5 })),
      { cx: 150, w: 260, gap: 12 },
    );
    return { els: c.els, readout: [g.txt, "Anlık Ψs ve Ψp ölçümü bütün hücre hacmini ya da gelecekteki açıklığı kesin vermez."] };
  },
});

const PERI: [string, Tone, boolean][] = [
  ["Mantar hücreleri: süberinli, çoğu ölü", "warn", false],
  ["Mantar kambiyumu: canlı meristem", "a", true],
  ["Felloderm: parankima", "c", false],
  ["İçteki dokular", "muted", false],
];
const periderm = mk({
  caption:
    "Periderm katmanları (nitel şema, kalınlıklar ölçekli değil): kalınlaşan organda epidermisin yerini periderm alır. Üretici katman mantar kambiyumudur; dışa süberinli mantar hücreleri, birçok türde içe felloderm üretir. Periderm tek bir ölü tabaka değildir; mantar kambiyumu ksilem-floem üreten damar kambiyumundan farklıdır.",
  alt: "Üst üste dört bant: en üstte dış yüzeydeki mantar hücreleri, altında vurgulu mantar kambiyumu, altında felloderm ve en altta içteki dokular. Kambiyumdan yukarı dışa ve aşağı içe oklar.",
  h: 300,
  draw: () => {
    const els: El[] = [];
    PERI.forEach(([l, t, b], i) => els.push(...B(306, 40 + i * 60, l, { w: 430, h: 60, tone: t, fill: t === "muted" ? undefined : t, bold: b, text: t === "muted" ? "muted" : "ink" })));
    els.push(A(46, 92, 46, 30, "warn", { bold: true }), A(46, 108, 46, 170, "c", { bold: true }), T(46, 16, "dış", "c", { bold: true }), T(46, 196, "iç", "c", { bold: true }));
    els.push(T(266, 284, "dışa: mantar · içe: felloderm", "c", { tone: "a" }));
    return { els, readout: ["Olgun mantar hücrelerinin çeperleri süberin biriktirir ve çoğunlukla canlılıklarını kaybeder.", "Canlı kambiyum ve iç parankima da peridermin parçasıdır."] };
  },
});

const gates = mk({
  caption:
    "Üç geçidi aynı ölçütlerle karşılaştır (bölümdeki tablodan): stoma bekçi hücreleriyle ayarlanan gaz geçidi, hidatot ksilemle ilişkili sıvı çıkış yolu, lentisel peridermli yüzeyde gaz alışverişine katkı veren gevşek doku bölgesidir. Su buharı çıkışı tek başına stoma kanıtı değildir.",
  alt: "Dört satırlı tablo: ölçüt, stoma, hidatot ve lentisel. Yer, denetim, suyun hâli ve ana ilişki satırları.",
  h: 452,
  draw: () => {
    const rows = [
      ["Yer", "yaprak,\ngenç\ngövde", "yaprak\nucu ve\nkenarı", "peridermli\nyüzey"],
      ["Denetim", "bekçi\nhücresi\nturgoru", "etkin\naçma-\nkapama yok", "bekçi\nhücresi\nçifti yok"],
      ["Su hâli", "buhar", "iyonlu\nsıvı", "biraz\nbuhar"],
      ["İlişki", "gaz\nalışverişi,\nterleme", "ksilem,\ngutasyon", "iç doku\ngaz\nalışverişi"],
    ];
    const heads = ["", "Stoma", "Hidatot", "Lentisel"];
    return { els: table(heads, rows).els, readout: ["Mineralli damla ve ksilem bağlantısı birlikte hidatot için daha güçlü kanıttır.", "Kloroplastlı bekçi hücresini gözenek boşluğundan ayır."] };
  },
});

/* ---------------- Temel doku ---------------- */

const colTypes = mk({
  caption:
    "Kollenkima: büyüyen bölgeye esnek destek (nitel şema, ölçekli değil): olgunlukta canlı hücrelerden oluşur; birincil çeperde eşit olmayan kalınlaşmalar görülür. Köşe kollenkimasında kalınlaşma köşelerde, levha kollenkimasında karşılıklı yüzlerde belirgindir. Ligninli kalın ikincil çeper taşıyan sklerenkimadan ayrılır.",
  alt: "İki grup hücre. Solda köşelerinde dolgun kalınlaşmalar olan altı hücre, sağda üst ve alt duvarları kalın altı hücre; her hücrede çekirdek.",
  h: 260,
  draw: () => {
    const els: El[] = [];
    const grid = (x0: number, kind: "corner" | "plate") => {
      for (let r = 0; r < 2; r++)
        for (let c = 0; c < 3; c++) {
          const x = x0 + c * 66;
          const y = 40 + r * 70;
          els.push(R(x, y, x + 66, y + 70, { tone: "ink" }), C(x + 33, y + 35, 6, { tone: "ink", fill: "ink" }));
          if (kind === "corner")
            for (const [cx, cy, sx, sy] of [[x, y, 1, 1], [x + 66, y, -1, 1], [x, y + 70, 1, -1], [x + 66, y + 70, -1, -1]] as const) els.push(PL([[cx, cy], [cx + sx * 16, cy], [cx, cy + sy * 16]], { tone: "a", fill: "a" }));
          else els.push(R(x + 2, y + 2, x + 64, y + 9, { tone: "a", fill: "a" }), R(x + 2, y + 61, x + 64, y + 68, { tone: "a", fill: "a" }));
        }
    };
    grid(20, "corner");
    grid(314, "plate");
    els.push(T(119, 210, "köşe kollenkiması", "c", { bold: true, tone: "a" }), T(413, 210, "levha kollenkiması", "c", { bold: true, tone: "a" }));
    els.push(T(266, 244, "ikisinde de hücreler canlı, çeper birincil", "c", { tone: "muted" }));
    return { els, readout: ["Temel tanı: canlılık + düzensiz birincil çeper kalınlaşması.", "Kollenkima büyümeyi durduran tek tip taş duvar değildir."] };
  },
});

const fiberSclereid = mk({
  caption:
    "Lif ile taş hücresi (nitel şema, ölçekli değil): sklerenkima lifleri uzun, dar ve çoğu kez demet hâlindedir; keten gibi bitkilerde mekanik nitelikten yararlanılır. Taş hücreleri (sklereidler) daha kısa ya da dallanmış olabilir; armuttaki kumlu his örnektir. Meyvenin tamamı taş hücresi değildir.",
  alt: "Solda yan yana dört uzun, iğ biçimli, kalın çeperli lif; ortalarında dar lümen çizgisi. Sağda üç kısa yuvarlak taş hücresi; kalın çeperlerinden merkeze uzanan ince geçit kanalları.",
  h: 312,
  draw: () => {
    const els: El[] = [];
    for (let i = 0; i < 4; i++) {
      const x = 70 + i * 34;
      els.push(S([[x, 20], [x + 14, 74], [x + 14, 208], [x, 262], [x - 14, 208], [x - 14, 74]], { tone: "c", fill: "c", bold: true }), L(x, 56, x, 226, { tone: "ink", thin: true }));
    }
    for (const [x, y] of [[360, 90], [440, 130], [370, 200]] as const) {
      els.push(C(x, y, 34, { tone: "warn", fill: "warn", bold: true }), C(x, y, 8, { tone: "ink" }));
      for (let k = 0; k < 6; k++) {
        const t = (k / 6) * 2 * Math.PI;
        els.push(L(x + 9 * Math.cos(t), y + 9 * Math.sin(t), x + 30 * Math.cos(t), y + 30 * Math.sin(t), { thin: true, tone: "ink" }));
      }
    }
    els.push(T(134, 294, "lif: uzun, dar, demet", "c", { bold: true, tone: "c" }), T(400, 270, "taş hücresi: kısa", "c", { bold: true, tone: "warn" }));
    return { els, readout: ["İki örnek aynı doku grubuna girer; biri lif, diğeri taş hücresidir.", "Tek hücre tipi görmek organın bütün işlevlerini o hücreye yüklemeye yetmez."] };
  },
});

const threeCells = mk({
  caption:
    "Üç dokuyu karşılaştırma ölçütü (bölümdeki tablodan): önce canlılığa ve çeperin birincil mi ikincil mi olduğuna, sonra kalınlaşmanın eşitliğine bak. İnce çeperli canlı hücre parankima, canlı düzensiz kalın birincil çeper kollenkima, olgun ligninli destek hücresi sklerenkima ile uyumludur.",
  alt: "Yan yana üç hücre: ince çeperli, çekirdekli ve büyük kofullu parankima; köşeleri kalınlaşmış çekirdekli kollenkima; çok kalın çeperli, içi boş sklerenkima. Altlarında canlılık ve çeper notları.",
  h: 300,
  draw: () => {
    const els: El[] = [];
    const cols = [90, 266, 442];
    els.push(R(cols[0] - 55, 30, cols[0] + 55, 140, { thin: true }), C(cols[0] - 20, 60, 8, { tone: "ink", fill: "ink" }), C(cols[0] + 10, 96, 30, { tone: "b", dash: true }));
    els.push(R(cols[1] - 55, 30, cols[1] + 55, 140, {}), C(cols[1], 85, 8, { tone: "ink", fill: "ink" }));
    for (const [cx, cy, sx, sy] of [[cols[1] - 55, 30, 1, 1], [cols[1] + 55, 30, -1, 1], [cols[1] - 55, 140, 1, -1], [cols[1] + 55, 140, -1, -1]] as const) els.push(PL([[cx, cy], [cx + sx * 20, cy], [cx, cy + sy * 20]], { tone: "a", fill: "a" }));
    els.push(R(cols[2] - 55, 30, cols[2] + 55, 140, { tone: "warn", fill: "warn", bold: true }), R(cols[2] - 30, 55, cols[2] + 30, 115, { tone: "warn" }));
    const info: [string, string, string, string][] = [
      ["Parankima", "çoğunlukla canlı", "ince", "birincil"],
      ["Kollenkima", "canlı", "eşit olmayan", "birincil"],
      ["Sklerenkima", "çoğu ölü", "ligninli kalın", "ikincil"],
    ];
    info.forEach(([n, l, w1, w2], i) => {
      els.push(T(cols[i], 168, n, "c", { bold: true }), T(cols[i], 196, l, "c", { tone: i === 2 ? "warn" : "c" }), T(cols[i], 224, w1, "c", { tone: "muted" }), T(cols[i], 250, w2, "c", { tone: "muted" }));
    });
    return { els, readout: ["Bir ölçütü bütün gelişim evreleri için mutlaklaştırma.", "'Çekirdeği görülmedi' gözlemi kesit ve boyama bilgisi olmadan ölüm kanıtı değildir."] };
  },
});

const AIR = 0.2;
const percent = mk({
  caption:
    "Yüzdede hangi bütün? (bölüm örneği: hava toplamın %20'si, palizat hücre alanının %75'i): hücre alanı A × (1 − h); palizat, bütün A'nın değil kalan hücre alanının p katıdır: 0,80 × 0,75 = 0,60. Sünger hücre alanı kalan hücre alanından palizatı çıkarınca bulunur. Hava + palizat + sünger = %100.",
  alt: "Yüzde yüzlük yatay çubuk üç parçaya bölünmüş: hava, palizat hücreleri ve sünger hücreleri. Sürgü palizatın hücre alanındaki payını değiştirir; hava payı yüzde 20'de sabit.",
  h: 220,
  param: { label: "Palizatın hücre alanındaki payı (p)", min: 0.5, max: 0.9, step: 0.05, init: 0.75 },
  draw: (p) => {
    const pal = (1 - AIR) * p;
    const sp = (1 - AIR) - pal;
    const parts: [string, number, Tone, boolean][] = [
      ["hava", AIR, "muted", true],
      ["palizat", pal, "c", false],
      ["sünger", sp, "b", false],
    ];
    const els: El[] = [];
    let x = 26;
    const W = 480;
    parts.forEach(([n, f, t, d]) => {
      els.push(R(x, 70, x + f * W, 130, { tone: t, fill: t, dash: d }));
      const mid = x + (f * W) / 2;
      const fits = f * W >= tw(n, true) + 16;
      if (fits) els.push(T(mid, 100, n, "c", { bold: true }));
      els.push(T(Math.min(Math.max(mid, 64), 468), 158, fits ? `%${fmt(f * 100, 0)}` : `${n} %${fmt(f * 100, 0)}`, "c", { tone: t === "muted" ? "ink" : t }));
      x += f * W;
    });
    els.push(T(266, 30, `palizat = ${fmt(1 - AIR, 2)} × ${fmt(p, 2)} = ${fmt(pal, 2)}`, "c", { bold: true }));
    return { els, readout: [`Hava %${fmt(AIR * 100, 0)}; palizat ${fmt(1 - AIR, 2)} × ${fmt(p, 2)} = ${fmt(pal, 2)}; sünger ${fmt(1 - AIR, 2)} − ${fmt(pal, 2)} = ${fmt(sp, 2)}.`, "Yüzdeleri doğrudan toplayıp çıkarmak yerine her yüzdenin paydasını yaz."] };
  },
});

export const biologyFigures060Plant2: Record<string, Record<string, FigureDef>> = {
  "ayt-yaprak-yapisi": {
    "Enine kesitte üç doku sistemini yerleştir": leafSystems,
    "Stoma, iç hava alanını dışarıya açar": leafStoma,
    "Ksilem ve floemi tipik damar içinde ayır": leafVein,
    "CO₂ yolu bir gradiyent ve gündüz koşulu taşır": leafCO2,
    "Su sıvı yoldan buhar yoluna geçer": leafWater,
  },
  "ayt-govde-yapisi": {
    "Düğüm, iki düğüm arası ve yaprak izini ayır": nodes,
    "Tipik tek çenekli kesitte demetleri izle": monoStem,
    "Tipik çift çenekli kesitte halkayı kur": dicotStem,
    "Vasküler kambiyum iki yana ürün verir": growth,
    "Bir büyüme halkasının nedenini açıkla": rings,
    "Halka çıkarma deneyinde zamanı ayrı satıra koy": girdling,
  },
  "bitki-ortu-doku": {
    "Stoma: iki hücre ve aralarındaki açıklık": stomaView,
    "Su potansiyelini toplayarak suyun yönünü bul": psiFig,
    "Çözünen → su → turgor → şekil zinciri": guardChain,
    "Kalınlaşan organda periderm gelişir": periderm,
    "Üç geçidi aynı ölçütlerle karşılaştır": gates,
  },
  "ayt-temel-doku": {
    "Kollenkima: büyüyen bölgeye esnek destek": colTypes,
    "Lif ile taş hücresini ayır": fiberSclereid,
    "Üç dokuyu karşılaştırma ölçütü": threeCells,
    "Yüzdede hangi bütün?": percent,
  },
};
