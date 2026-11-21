import { fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Coğrafya · Büyük iklim tipleri ve atmosfer (Forge058). Klimograflar
 * nitel örüntü şemasıdır: eksende sayı yok, biçim yalnız bölüm metnindeki
 * nitel tarifi (yıl boyu yüksek, yazın kurak, büyük yıllık fark…) gösterir;
 * ölçülmüş istasyon verisi değildir. Sayı olan yerlerde (0 °C ve 10 °C
 * eşiği, 13/50/85/600 km model sınırları, %78/%21/%1 ve %2 su buharı)
 * yalnız bölümde verilen değerler kullanılır.
 */

const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const BAR = 0.62;
const H = 4.2;

/** Qualitative climograph: t and p are 0..1 shapes (no numeric axis). */
function climo(t: number[], p: number[], opts: { marks?: boolean; showT?: boolean; showP?: boolean } = {}): El[] {
  const { marks = false, showT = true, showP = true } = opts;
  const els: El[] = [];
  const x = (i: number) => i + 0.5;
  els.push(seg(v(0, 0), v(12, 0), { thin: true }), seg(v(0, 0), v(0, H + 0.3), { thin: true, tone: "warn" }), seg(v(12, 0), v(12, H + 0.3), { thin: true, tone: "b" }));
  els.push(txt(v(-0.15, H + 0.5), "sıcaklık °C", "w", { small: true, tone: "warn" }), txt(v(12.15, H + 0.5), "yağış mm", "e", { small: true, tone: "b" }));
  if (showP)
    p.forEach((h, i) => {
      const y = Math.max(0.04, h) * H * 0.92;
      els.push(poly([v(x(i) - BAR / 2, 0), v(x(i) + BAR / 2, 0), v(x(i) + BAR / 2, y), v(x(i) - BAR / 2, y)], { tone: "b", fill: "b", thin: true }));
    });
  if (showT) els.push(poly(t.map((h, i) => v(x(i), h * H * 0.92)), { open: true, tone: "warn", bold: true, smooth: true }));
  MONTHS.forEach((m, i) => {
    if (i % 3 === 0 || i === 11) els.push(txt(v(x(i), -0.35), m, "s", { small: true, tone: "muted", soft: true }));
  });
  if (marks && showT) {
    const hi = t.indexOf(Math.max(...t));
    const lo = t.indexOf(Math.min(...t));
    const yh = t[hi] * H * 0.92;
    const yl = t[lo] * H * 0.92;
    els.push(seg(v(-0.6, yl), v(-0.6, yh), { tone: "a", bold: true }), seg(v(-0.75, yh), v(-0.45, yh), { tone: "a" }), seg(v(-0.75, yl), v(-0.45, yl), { tone: "a" }));
    els.push(txt(v(-0.85, (yh + yl) / 2), "yıllık fark", "w", { small: true, bold: true, tone: "a" }));
  }
  els.push(txt(v(-3.4, -0.9), " ", "c"), txt(v(15.2, H + 0.9), " ", "c"));
  return els;
}

const wave = (lo: number, hi: number, peak = 6.5) => MONTHS.map((_, i) => lo + ((hi - lo) * (1 + Math.cos(((i + 0.5 - peak) / 12) * 2 * Math.PI))) / 2);

type Pattern = { name: string; t: number[]; p: number[]; read: string[] };
const P_EKV: Pattern = {
  name: "Ekvatoral",
  t: wave(0.86, 0.9, 3.5),
  p: [0.9, 0.86, 0.95, 0.92, 0.82, 0.75, 0.7, 0.72, 0.8, 0.88, 0.92, 0.94],
  read: ["Yıl boyu yüksek sıcaklık, çok küçük yıllık fark; yağış yıl içine yayılmış ve bol.", "Amazon ve Kongo havzaları tipik örneklerdir; her gün aynı olmak zorunda değildir."],
};
const P_SAV: Pattern = {
  name: "Savan",
  t: wave(0.78, 0.92, 4.5),
  p: [0.04, 0.05, 0.1, 0.25, 0.55, 0.8, 0.88, 0.85, 0.6, 0.25, 0.06, 0.04],
  read: ["Sıcaklık yine yıl boyu yüksek; ayırt edici olan belirgin yağışlı ve kurak mevsim.", "Yalnız yıllık ortalama sıcaklık ya da toplam yağış ekvatoral–savan ayrımını tamamlamaz."],
};
const P_MUS: Pattern = {
  name: "Muson",
  t: wave(0.68, 0.9, 5),
  p: [0.04, 0.05, 0.07, 0.12, 0.3, 0.85, 0.98, 0.92, 0.6, 0.2, 0.06, 0.04],
  read: ["Yazın denizden karaya yönelen nemli hava ve dağların yükseltmesi yağışı artırır; kış daha kurak olabilir.", "Bütün muson alanlarına tek sıcaklık farkı ya da tek yağış miktarı yazılmaz."],
};
const P_COL: Pattern = {
  name: "Çöl",
  t: wave(0.55, 0.95, 6.5),
  p: [0.04, 0.04, 0.03, 0.02, 0.01, 0, 0, 0, 0.01, 0.02, 0.03, 0.04],
  read: ["Ortak işaret yağış azlığı ve su yetersizliği; bütün çöller sıcak değildir.", "Büyük günlük fark aylık ortalamaların yıllık farkıyla karıştırılmaz: bu çizgi aylık ortalamadır."],
};
const P_AKD: Pattern = {
  name: "Akdeniz",
  t: wave(0.45, 0.86),
  p: [0.62, 0.55, 0.42, 0.28, 0.14, 0.05, 0.02, 0.02, 0.08, 0.3, 0.5, 0.66],
  read: ["Yaz sıcak ve kurak, kış görece ılık ve yağışlı: yaz kuraklığı sıcak ayların yağış sütunlarından okunur.", "Kaliforniya, Orta Şili, Kap çevresi ve güney Avustralya kıyıları benzer örüntü taşır."],
};
const P_OKY: Pattern = {
  name: "Okyanusal",
  t: wave(0.42, 0.64),
  p: [0.58, 0.48, 0.45, 0.4, 0.42, 0.42, 0.45, 0.48, 0.5, 0.56, 0.6, 0.62],
  read: ["Deniz etkisi sıcaklık farkını sınırlar; yağış yıl içine daha fazla yayılır.", "Batı Avrupa, Güney Şili ve Yeni Zelanda birlikte düşünülür; tek bir bitki fotoğrafı teşhis değildir."],
};
const P_STE: Pattern = {
  name: "Step",
  t: wave(0.28, 0.82),
  p: [0.18, 0.16, 0.2, 0.26, 0.3, 0.18, 0.06, 0.05, 0.08, 0.14, 0.18, 0.2],
  read: ["Yarı kurak: yıl boyu sınırlı yağış, ilkbahar yağışıyla yeşerip yaz kuraklığında sararan bozkır.", "Yarı kuraklığın sınırı yalnız sabit bir mm sayısı değildir; sıcaklığa bağlı su kaybı da önemlidir."],
};
const P_SER: Pattern = {
  name: "Sert karasal",
  t: wave(0.02, 0.68),
  p: [0.14, 0.12, 0.12, 0.16, 0.24, 0.34, 0.4, 0.38, 0.28, 0.2, 0.16, 0.15],
  read: ["Uzun soğuk kış, kısa serin ya da ılık yaz ve büyük yıllık sıcaklık farkı.", "Soğuk kışlı her alan step değildir: yağışın miktarı, mevsimi, en sıcak ay ve kar örtüsü birlikte okunur."],
};

const pair = (a: Pattern, b: Pattern, what: string): FigureDef => ({
  caption: `${a.name} ile ${b.name.toLowerCase()} örüntüsünü adımlarla karşılaştır. Turuncu çizgi aylık ortalama sıcaklık, mavi sütunlar aylık toplam yağıştır; iki eksenin ölçeği farklıdır. Nitel örüntü şeması: eksenlerde sayı yok, ölçülmüş istasyon verisi değildir. ${what}`,
  alt: `İki eksenli klimograf: solda sıcaklık ekseni, sağda yağış ekseni, altta 1–12 ay. Adımlarda ${a.name} ve ${b.name} örüntüsü gösterilir.`,
  steps: [a.name, b.name],
  draw: (_v, step) => {
    const c = step === 0 ? a : b;
    return { els: climo(c.t, c.p, { marks: true }), readout: c.read };
  },
});

const reading: FigureDef = {
  caption:
    "Klimografı adım adım kur: önce aylık ortalama sıcaklık çizgisi (sol eksen, °C), sonra aylık toplam yağış sütunları (sağ eksen, mm). Çizgi ile sütunun kâğıttaki yüksekliğini doğrudan kıyaslama; eksen ölçekleri farklıdır. Nitel şema, sayı yok.",
  alt: "Boş iki eksenli klimograf; adımlarda turuncu sıcaklık çizgisi, mavi yağış sütunları ve en sıcak ile en soğuk ay arasındaki yıllık fark işareti eklenir.",
  steps: ["Sıcaklık çizgisi", "Yağış sütunları", "Yıllık fark ve toplam"],
  draw: (_v, step) => {
    const t = wave(0.3, 0.85);
    const p = P_AKD.p;
    const read = [
      ["Sıcaklık çizgisi her ayın ortalama sıcaklığıdır (°C); en sıcak ayların haziran–ağustosa denk gelmesi Kuzey Yarım Küre için destek verir.", "Ekvatora yakın, farkın çok küçük olduğu yerlerde tek tepe ayıyla kesin yarımküre seçilmez."],
      ["Sütunlar her ayın toplam yağışıdır (mm). Yıllık yağış on iki sütunun toplamıdır.", "Yaz kuraklığı toplamdan değil, sıcak dönemin aylık yağışından okunur."],
      ["Yıllık sıcaklık farkı = en sıcak ay ortalaması − en soğuk ay ortalaması.", "Aylık ortalama 3 °C, o ay hiç kar yağmadığını kanıtlamaz; buharlaşma için ek veri gerekir."],
    ][step];
    return { els: climo(t, p, { marks: step === 2, showP: step >= 1 }), readout: read };
  },
};

const tundra: FigureDef = {
  caption:
    "Yaygın sıcaklık sınıflamasında ölçüt en sıcak ayın ortalamasıdır: 0 °C'nin altında kutup (buz örtüsü) tipi, 0 °C ile 10 °C arasında tundra. Sürgüyle en sıcak ay ortalamasını değiştir. 10 °C üstünde başka tipe geçmek için yağış ve diğer aylar da gerekir; eşik yakınında kullanılan sınıflamayı denetle.",
  alt: "Dikey sıcaklık ekseninde 0 °C ve 10 °C eşik çizgileri; altta kutup, ortada tundra, üstte diğer tipler kuşağı. Sürgü en sıcak ay ortalamasını gösteren işareti taşır.",
  param: { label: "En sıcak ay ortalaması", min: -10, max: 20, step: 1, init: 6, unit: " °C", plain: true },
  draw: (val) => {
    const Y = (c: number) => (c + 10) * 0.16;
    const els: El[] = [];
    const band = (a: number, b: number, tone: Tone, name: string) => {
      els.push(poly([v(0, Y(a)), v(3, Y(a)), v(3, Y(b)), v(0, Y(b))], { tone, fill: tone, bare: true }));
      els.push(txt(v(1.5, (Y(a) + Y(b)) / 2), name, "c", { small: true, bold: true, tone }));
    };
    band(-10, 0, "b", "kutup (buz)");
    band(0, 10, "c", "tundra");
    band(10, 20, "muted", "başka tipler");
    els.push(seg(v(0, Y(-10)), v(0, Y(20)), { thin: true }));
    for (const c of [0, 10]) els.push(seg(v(0, Y(c)), v(3, Y(c)), { tone: "ink", dash: true, thin: true }), txt(v(-0.15, Y(c)), `${c} °C`, "w", { small: true, bold: true }));
    els.push(vec(v(4.3, Y(val)), v(3.15, Y(val)), { tone: "a", bold: true }), txt(v(4.45, Y(val)), `${fmt(val, 0).replace("-", "−")} °C`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-1.6, Y(-10.6)), " ", "c"), txt(v(6.4, Y(20.6)), " ", "c"));
    const cls = val < 0 ? "kutup (buz örtüsüyle ilişkili) tipi" : val < 10 ? "tundra" : "tundra ya da kutup değil; tipi seçmek için yağış ve diğer aylar gerekir";
    return {
      els,
      readout: [
        `En sıcak ay ${fmt(val, 0).replace("-", "−")} °C → ${cls}.`,
        val >= 0 && val < 10 ? "Kısa yaz yüzeyde çözülmeye izin verebilir; yosun, liken, ot ve cüce çalılar görülür." : "Yüksek dağ iklimi yalnız kutba yakın yerlerde görülmez: yükselti, bakı ve kar örtüsü de etkilidir.",
      ],
    };
  },
};

/* ---------------- Atmosfer ---------------- */

const composition: FigureDef = {
  caption:
    "Kuru hava için hacimce yaklaşık %78 azot, %21 oksijen, %1 diğer gazlar (yuvarlatılmış okul oranları). Su buharı eklenince payda değişir: %2 su buharlı karışımda kuru hava %98'dir ve azot payı %98 × 0,78 = %76,44 olur. Toplamı %102 yapmak payda hatasıdır.",
  alt: "Yüzde yüzlük yatay şerit: azot, oksijen ve diğer gazlar dilimleri. İkinci adımda şeridin %2'si su buharına ayrılır ve diğer dilimler orantılı küçülür.",
  steps: ["Kuru hava", "%2 su buharlı hava"],
  draw: (_v, step) => {
    const vap = step === 1 ? 2 : 0;
    const dry = 100 - vap;
    const parts: { name: string; val: number; tone: Tone }[] = [
      { name: "azot", val: (dry * 78) / 100, tone: "b" },
      { name: "oksijen", val: (dry * 21) / 100, tone: "c" },
      { name: "diğer", val: (dry * 1) / 100, tone: "muted" },
    ];
    if (vap) parts.push({ name: "su buharı", val: vap, tone: "a" });
    const K = 0.1;
    let x = 0;
    const els: El[] = [];
    parts.forEach((p, i) => {
      const w = p.val * K;
      els.push(poly([v(x, 0), v(x + w, 0), v(x + w, 1.2), v(x, 1.2)], { tone: p.tone, fill: p.tone, thin: true }));
      const big = p.val > 10;
      if (big) els.push(txt(v(x + w / 2, 0.6), `${p.name} %${fmt(p.val, 2)}`, "c", { small: true, bold: true }));
      else els.push(seg(v(x + w / 2, 1.2), v(x + w / 2, 1.2 + 0.5 + i * 0.0), { thin: true, tone: p.tone }), txt(v(x + w / 2 + (p.name === "diğer" ? -0.1 : 0.1), 1.9 + (p.name === "su buharı" ? 0.7 : 0)), `${p.name} %${fmt(p.val, 2)}`, p.name === "diğer" ? "w" : "e", { small: true, tone: p.tone === "muted" ? "ink" : p.tone }));
      x += w;
    });
    els.push(txt(v(0, -0.5), "0", "c", { small: true, tone: "muted" }), txt(v(10, -0.5), "%100", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.3, 3.2), " ", "c"), txt(v(10.4, -1), " ", "c"));
    return {
      els,
      readout:
        step === 0
          ? ["Kuru hava: %78 + %21 + %1 = %100. Diğer gazlar arasında argon ve karbondioksit vardır.", "Hidrojen bir asal gaz değildir; listeleri ezber sırasına göre sınıflandırma."]
          : ["Su buharı %2 → kuru hava %98. Azot %98 × 0,78 = %76,44; oksijen %98 × 0,21 = %20,58; diğer %0,98. Toplam yine %100.", "Su buharı yere ve zamana göre değişir; payda her zaman yazılır."],
    };
  },
};

const LAYERS: { name: string; lo: number; hi: number; dir: string; note: string; tone: Tone }[] = [
  { name: "Troposfer", lo: 0, hi: 13, dir: "genel olarak azalır", note: "Hava kütlesinin ve su buharının önemli bölümü; günlük hava olaylarının çoğu. Kalınlık enlem ve mevsimle değişir; inversiyonda sıcaklık yükseklikle artabilir.", tone: "c" },
  { name: "Stratosfer", lo: 13, hi: 50, dir: "artar", note: "Ozonun önemli bölümü burada; morötesi ışınımın soğurulması yukarı doğru artışa katkı verir. Ozon katmanı saf ozondan ayrı bir kabuk değildir.", tone: "b" },
  { name: "Mezosfer", lo: 50, hi: 85, dir: "yeniden azalır", note: "Birçok küçük göktaşı bu bölgelerde ısınıp parçalanır; bütün cisimlerin yere asla ulaşamayacağı anlamına gelmez.", tone: "a" },
  { name: "Termosfer", lo: 85, hi: 600, dir: "artar (çok seyrek gaz)", note: "Yüksek enerjili ışınımla etkileşim; kutup ışıkları. Yüksek sıcaklık yoğun ısı aktarımı demek değildir. İyonosfer elektriksel bir bölgedir, altıncı sıcaklık katmanı değildir.", tone: "warn" },
  { name: "Ekzosfer", lo: 600, hi: 700, dir: "uzaya kademeli geçiş", note: "Çok seyrek dış bölge; alt sınır için yüzlerce km'lik yaklaşık değerler verilir. Uyduların hepsi tek katmanda değildir.", tone: "muted" },
];
const layers: FigureDef = {
  caption:
    "Modelin öğretici sınırları 13, 50, 85 ve 600 km'dir. Düşey eksen ölçekli değildir (her katman eşit yükseklikte çizildi); sağdaki ok sıcaklığın yükseklikle genel yönünü gösterir. Bir katmana tıkla: içinde ayrı bir saf gaz belirmez, karışımın yoğunluğu yukarı doğru azalır.",
  alt: "Beş katmanlı yığın: alttan troposfer, stratosfer, mezosfer, termosfer, ekzosfer; sınırlarda 13, 50, 85 ve 600 km yazıyor; her katmanın yanında sıcaklık yönü oku var.",
  picks: LAYERS.map((l) => ({ label: l.name, title: `${l.name} (${l.lo}–${l.name === "Ekzosfer" ? "…" : l.hi} km)`, detail: [`Sıcaklık yükseklikle ${l.dir}.`, l.note] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const h = 1.1;
    LAYERS.forEach((l, i) => {
      const y0 = i * h;
      const on = pick === i;
      els.push(poly([v(0, y0), v(4.6, y0), v(4.6, y0 + h), v(0, y0 + h)], { tone: l.tone, fill: l.tone, bare: !on, bold: on }));
      els.push(txt(v(2.3, y0 + h / 2), l.name, "c", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
      if (i > 0) els.push(seg(v(0, y0), v(4.6, y0), { thin: true, dash: true }), txt(v(-0.15, y0), `${l.lo} km`, "w", { small: true, tone: "muted" }));
      const up = l.dir.startsWith("artar");
      const down = l.dir.includes("azalır");
      if (up || down) els.push(vec(v(5.2, y0 + (up ? 0.25 : h - 0.25)), v(5.2, y0 + (up ? h - 0.25 : 0.25)), { tone: up ? "warn" : "b", bold: true }));
    });
    els.push(txt(v(5.5, 0.3), "sıcaklık", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-2, -0.4), " ", "c"), txt(v(7.4, 5 * h + 0.3), " ", "c"));
    const sel = pick >= 0 ? LAYERS[pick] : undefined;
    return {
      els,
      readout: [sel ? `${sel.name}: sıcaklık yükseklikle ${sel.dir}. ${sel.note}` : "Bir katmana tıkla ya da aşağıdan seç.", "Tropopoz troposfer–stratosfer, stratopoz stratosfer–mezosfer geçişidir; gerçek atmosferde sınırlar değişir."],
    };
  },
};

const density: FigureDef = {
  caption:
    "Atmosfer yer çekimiyle tutulur; yerden uzaklaştıkça yoğunluk genel olarak azalır ve sert bir duvarla bitmez. Gazların büyük bölümü yüzeye yakın alt katmanlardadır. Nokta sıklığı nitel bir gösterimdir, ölçekli değildir.",
  alt: "Dikey sütun: altta sık noktalar, yukarı çıktıkça seyrekleşen noktalar; üstte keskin bir sınır yok.",
  draw: () => {
    const els: El[] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let row = 0; row < 12; row++) {
      const n = Math.round(14 * Math.exp(-row * 0.32));
      for (let k = 0; k < n; k++) {
        const x = 0.2 + rnd() * 3.6;
        const y = row * 0.38 + rnd() * 0.3;
        els.push(poly([v(x - 0.05, y - 0.05), v(x + 0.05, y - 0.05), v(x + 0.05, y + 0.05), v(x - 0.05, y + 0.05)], { tone: "b", fill: "b", thin: true }));
      }
    }
    els.push(seg(v(0, -0.05), v(4, -0.05), { bold: true }), txt(v(2, -0.35), "yeryüzü", "s", { small: true, tone: "muted" }));
    els.push(vec(v(4.6, 0.2), v(4.6, 4.4), { tone: "muted" }), txt(v(4.8, 4.2), "yükseklik", "e", { small: true, tone: "muted" }));
    els.push(txt(v(4.8, 0.6), "yoğun", "e", { small: true, bold: true, tone: "b" }), txt(v(4.8, 3.2), "seyrek", "e", { small: true, tone: "b" }));
    els.push(txt(v(-0.4, 4.9), " ", "c"), txt(v(7.4, -1), " ", "c"));
    return { els, readout: ["Üst atmosferde taneciklerin kinetik enerjisi yüksekken tanecik sayısı çok az olabilir: termosferin yüksek sıcaklığı yere yakın sıcak ve yoğun bir hava kütlesi değildir."] };
  },
};

export const geographyFigures058Climate: Record<string, Record<string, FigureDef>> = {
  "buyuk-iklim-tipleri": {
    "Klimografın iki eksenini ayrı oku": reading,
    "Ekvatoral ile savanı kurak dönem ayırır": pair(P_EKV, P_SAV, "Savanı ekvatoraldan ayıran, yağışın kurak dönemde çökmesidir."),
    "Muson ile çölü dolaşım bağlamında düşün": pair(P_MUS, P_COL, "Musonda yağış yaz aylarına yığılır; çölde her ay az kalır."),
    "Akdeniz ile okyanusal iklimde yağışın zamanı": pair(P_AKD, P_OKY, "Fark yağışın zamanındadır: Akdeniz'de yazın sütunlar neredeyse yok olur."),
    "Step ve sert karasal: az yağış ile sert kışı ayır": pair(P_STE, P_SER, "Step az yağışla, sert karasal uzun soğuk kış ve büyük yıllık farkla tanınır."),
    "Tundra, kutup ve yüksek dağ": tundra,
  },
  "atmosfer-katmanlari": {
    "Gaz örtüsü neden Dünya ile kalır?": density,
    "Bileşimin paydasını koru": composition,
    "Ekzosfer ve şema sınırları": layers,
  },
};

