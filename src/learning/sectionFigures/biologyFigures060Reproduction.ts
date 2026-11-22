import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, R, S, T, chain, lead, mk, table, tableFig } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Kadın ve erkek üreme organları (Forge060). Organ ve hücre
 * çizimleri nitel öğretim şemasıdır, ölçekli değildir; ilerleme adımları
 * sıra göstergesidir, süre ya da hız ölçümü değildir. Mayoz sayımı bölümdeki
 * kayıpsız modelden gelir: birincil başına 1/2/4/4 hücre, hücre başına
 * 4/2/1/1C DNA.
 */

/* ---------------- Kadın üreme organları ---------------- */

const femaleMap = mk({
  caption:
    "Görevleri yerlerine yerleştir (nitel akış şeması): yumurtalık oositin geliştiği ve hormon üreten gonaddır; yumurta kanalı oositi yakalar ve taşır; rahim gelişen embriyoya ortam sağlar; serviks rahim ile vajina arasındaki dar geçittir. Döllenme çoğunlukla yumurta kanalında, yerleşme endometriyumda olur.",
  alt: "Yukarıdan aşağı beş kutu: yumurtalık, yumurta kanalı, rahim, serviks, vajina. Her kutunun yanında o organda gerçekleşen olay yazılı.",
  h: 330,
  draw: () => {
    const c = chain(
      [
        { label: "Yumurtalık", note: "oosit gelişimi, hormon", tone: "a" },
        { label: "Yumurta kanalı", note: "yakalama, döllenme", tone: "c" },
        { label: "Rahim", note: "endometriyumda yerleşme", tone: "b" },
        { label: "Serviks", note: "dar geçit" },
        { label: "Vajina", note: "dışarıya açılır" },
      ],
      { cx: 104, w: 180, gap: 20 },
    );
    return { els: c.els, readout: ["Hücre üretimi, taşıma, döllenme ve gelişim aynı yer ve aynı olay değildir.", "Önce organın adını, sonra içinde gerçekleşen olayı söyle."] };
  },
});

const follicle = mk({
  caption:
    "Folikülde oosit ile destek hücreleri (nitel şema, ölçekli değil): oosit tek hücredir; onu saran folikül hücreleri beslenme, korunma ve hormon üretimine katkı verir. Folikül büyürken sıvı dolu bir boşluk gelişebilir. Büyük folikül tek bir dev yumurta hücresi değildir.",
  alt: "Büyük yuvarlak folikül: çevresinde halka hâlinde küçük destek hücreleri, bir yanda hilal biçimli sıvı boşluğu, öbür yanda çekirdekli oosit.",
  h: 320,
  draw: () => {
    const els: El[] = [C(180, 160, 130, { bold: true })];
    for (let i = 0; i < 26; i++) {
      const t = (i / 26) * 2 * Math.PI;
      els.push(C(180 + 112 * Math.cos(t), 160 + 112 * Math.sin(t), 10, { tone: "c", thin: true }));
    }
    els.push(S([[150, 70], [230, 80], [270, 150], [240, 230], [170, 250], [200, 200], [215, 150], [195, 100]], { tone: "b", fill: "b" }));
    els.push(C(130, 160, 40, { tone: "a", fill: "a", bold: true }), C(130, 160, 12, { tone: "a", fill: "a" }));
    for (let i = 0; i < 10; i++) {
      const t = (i / 10) * 2 * Math.PI;
      els.push(C(130 + 52 * Math.cos(t), 160 + 52 * Math.sin(t), 8, { tone: "c", thin: true }));
    }
    els.push(...lead(130, 160, 340, 60, "oosit: tek hücre", "a", true));
    els.push(...lead(268, 210, 340, 170, "sıvı dolu boşluk", "b"));
    els.push(...lead(180 + 112 * Math.cos(1.1), 160 + 112 * Math.sin(1.1), 340, 280, "folikül hücreleri", "c"));
    els.push(T(316, 306, "beslenme, hormon", "e", { tone: "c" }));
    return { els, readout: ["Folikül hücrelerinin östrojen üretmesi ile oositin mayoz geçirmesi farklı görevlerdir.", "Ovulasyonda oosit ve onu saran bazı hücreler serbestleşir; geride kalan doku başka bir yapıya dönüşür."] };
  },
});

const ROUTE: { name: string; p: [number, number]; n: number; txt: string }[] = [
  { name: "Ovulasyon", p: [96, 196], n: 1, txt: "Oosit yumurtalıktan serbestleşir; yumurtalık ile tüp arasında kapalı boru yoktur." },
  { name: "Saçaklarla yakalama", p: [122, 146], n: 1, txt: "Huni biçimli uçtaki saçaklar oositi tüpe alır." },
  { name: "Tüpte döllenme", p: [214, 92], n: 1, txt: "Sperm ikincil oosite ulaşırsa döllenme başlar; haploit katkılar diploit zigotu kurar." },
  { name: "Taşınırken ilk mitozlar", p: [288, 132], n: 4, txt: "Zigot silli epitel ve düz kas hareketleriyle rahme taşınırken bölünür." },
  { name: "Endometriyuma yerleşme", p: [446, 176], n: 4, txt: "Erken embriyo rahmin iç yüzeyine yerleşir; bu döllenmeden sonraki ayrı olaydır." },
];
const route = mk({
  caption:
    "Döllenme ile ilk mitozların yeri (sıra göstergesi, süre veya hız ölçümü değil; ölçekli değil): ovulasyon, saçaklarla yakalama, tüpte döllenme, taşınırken ilk bölünmeler ve en son endometriyuma yerleşme. Oosit kamçısıyla yüzmez; silli epitel ve düz kas taşımaya katkı verir.",
  alt: "Solda yumurtalık, ondan yukarı kıvrılan yumurta kanalı ve sağda rahim; rahmin iç yüzeyi kesik çizgiyle endometriyum. Adımlarda bir hücre işareti yumurtalıktan tüpe, tüpün ortasında zigota, rahme yakın dört hücreye ve en son rahim duvarına ilerliyor.",
  h: 330,
  steps: ROUTE.map((r) => r.name),
  draw: (_v, step) => {
    const r = ROUTE[step];
    const els: El[] = [
      C(70, 200, 34, { tone: "a", fill: "a" }),
      S([[112, 168], [132, 118], [182, 88], [242, 98], [292, 138], [318, 168]], { open: true, bold: true, tone: "c" }),
      S([[104, 158], [100, 140], [112, 150], [118, 132], [124, 150], [132, 136]], { open: true, tone: "c" }),
      S([[310, 130], [500, 130], [480, 220], [432, 282], [382, 282], [330, 220]], { bold: true, tone: "b" }),
      S([[332, 150], [478, 150], [460, 214], [420, 262], [394, 262], [350, 214]], { dash: true, tone: "b" }),
      L(406, 282, 406, 318, { bold: true }),
    ];
    const [x, y] = r.p;
    if (r.n === 1) els.push(C(x, y, 9, { tone: "warn", fill: "warn", bold: step >= 2 }));
    else for (const [dx, dy] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) els.push(C(x + dx, y + dy, 5, { tone: "warn", fill: "warn" }));
    els.push(T(70, 254, "yumurtalık", "c", { tone: "a" }), T(214, 50, "yumurta kanalı", "c", { tone: "c" }), T(406, 104, "rahim", "c", { tone: "b" }), T(416, 304, "serviks", "e", { tone: "muted" }));
    els.push(T(330, 300, "endometriyum", "w", { tone: "b" }));
    return { els, readout: [`${step + 1}. ${r.name}: ${r.txt}`, "Önce döllenme, sonra ilk bölünmeler, daha sonra yerleşme: sırayı tersine çeviren seçenek yanlış olabilir."] };
  },
});

const openings = mk({
  caption:
    "Ayrı açıklıklar (nitel akış şeması): kadınlarda üretra mesaneden gelen idrarın vajinadan ayrı çıkış yoludur. Rahim serviksle vajinaya açılır; vajina spermin bırakıldığı, adet içeriğinin çıktığı ve normal doğumda doğum kanalının parçası olan kanaldır. Erkekteki ortak üretra bilgisi kadına aynen uygulanmaz.",
  alt: "İki ayrı sütun: solda mesane, üretra, dış açıklık; sağda rahim, serviks, vajina, dış açıklık. Sütunlar birleşmiyor.",
  h: 300,
  draw: () => {
    const l = chain([{ label: "Mesane", tone: "c" }, { label: "Üretra", tone: "c" }, { label: "Ayrı dış açıklık", tone: "c", fill: "c" }], { cx: 130, w: 220, y0: 40, gap: 34 });
    const r = chain([{ label: "Rahim", tone: "b" }, { label: "Serviks", tone: "b" }, { label: "Vajina", tone: "b" }, { label: "Ayrı dış açıklık", tone: "b", fill: "b" }], { cx: 400, w: 220, y0: 40, gap: 20 });
    return { els: [...l.els, ...r.els, T(130, 16, "İdrar yolu", "c", { bold: true, tone: "c" }), T(400, 16, "Üreme kanalı", "c", { bold: true, tone: "b" })], readout: ["Aynı bölgede bulunmak organları tek sisteme dönüştürmez.", "İdrar rahim veya vajinadan geçmez."] };
  },
});

const ivf = tableFig({
  caption:
    "IVF hangi basamağı başka ortamda gerçekleştirir? (bölüm metninden) Oositler ve spermler laboratuvarda bir araya getirilir, uygun erken embriyo rahme aktarılır. Döllenme basamağı desteklenir; embriyonun gelişim ve yerleşme koşullarına hâlâ ihtiyacı vardır. Transfer hücre sayısı değişmez bir kural değildir.",
  alt: "Dört satırlı tablo: basamak, doğal yol ve IVF sütunları. Oosit gelişimi iki yolda da yumurtalık; döllenme doğalda yumurta kanalı, IVF'de laboratuvar; ilk bölünmeler doğalda tüpte, IVF'de laboratuvar; yerleşme iki yolda da endometriyum.",
  headers: ["Basamak", "Doğal yol", "IVF"],
  rows: [
    ["Oosit gelişimi", "yumurtalık", "yumurtalık"],
    ["Döllenme", "yumurta kanalı", "laboratuvar"],
    ["İlk bölünmeler", "tüpte taşınırken", "laboratuvar"],
    ["Yerleşme", "endometriyum", "aktarım sonrası\nendometriyum"],
  ],
  readout: ["Tüp geçişinin aşılması rahmin görevini ortadan kaldırmaz.", "Mikroenjeksiyon tek bir spermin oosit içine verilmesini içeren yardımcı yöntemdir."],
});

/* ---------------- Erkek üreme organları ---------------- */

const tubule = mk({
  caption:
    "Seminifer tüpçük kesiti (nitel şema, ölçekli değil): gelişen hücreler bazal kısımdan lümene doğru farklılaşır; Sertoli hücreleri destek ve beslenmeye katılır, aralarındaki bağlantılar kan-testis bariyerinin önemli bölümüdür. Tüpçükler arasındaki bağ dokuda Leydig hücreleri steroid hormon üretir.",
  alt: "Büyük yuvarlak tüpçük kesiti: dış halkada küçük spermatogonyumlar, ortada spermatositler, içte spermatitler ve ortadaki lümene uzanan kuyruklar. Bir uzun Sertoli hücresi duvardan lümene uzanıyor. Tüpçüğün dışında sağ altta Leydig hücre kümesi.",
  h: 330,
  draw: () => {
    const cx = 170;
    const cy = 165;
    const els: El[] = [C(cx, cy, 145, { bold: true }), C(cx, cy, 34, { tone: "muted", dash: true })];
    const ring = (r: number, n: number, rr: number, t: Tone) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 2 * Math.PI + 0.2;
        els.push(C(cx + r * Math.cos(a), cy + r * Math.sin(a), rr, { tone: t, thin: true, fill: t }));
      }
    };
    ring(130, 28, 9, "c");
    ring(98, 18, 12, "warn");
    ring(64, 14, 8, "a");
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * 2 * Math.PI;
      els.push(L(cx + 54 * Math.cos(a), cy + 54 * Math.sin(a), cx + 26 * Math.cos(a + 0.3), cy + 26 * Math.sin(a + 0.3), { thin: true, tone: "a" }));
    }
    els.push(S([[cx - 20, cy + 145], [cx - 30, cy + 100], [cx - 14, cy + 50], [cx - 2, cy + 50], [cx + 10, cy + 100], [cx + 4, cy + 145]], { tone: "b", bold: true }));
    for (const [x, y] of [[352, 258], [370, 274], [388, 256], [366, 240]] as const) els.push(C(x, y, 10, { tone: "ink", fill: "muted" }));
    els.push(...lead(cx + 130, cy - 20, 330, 40, "spermatogonyum", "c"));
    els.push(...lead(cx + 98 * Math.cos(-0.5), cy + 98 * Math.sin(-0.5), 330, 90, "spermatosit", "warn"));
    els.push(...lead(cx + 64 * Math.cos(0.2), cy + 64 * Math.sin(0.2), 330, 140, "spermatit", "a"));
    els.push(...lead(cx - 10, cy + 110, 330, 200, "Sertoli hücresi", "b", true));
    els.push(T(384, 314, "Leydig: tüpçük dışı", "c", { tone: "ink" }));
    return { els, readout: ["Farklı evrelerdeki hücrelerin birlikte görülmesi üretimin sürmesine yardım eder.", "Sertoli ile Leydig farklı yerde ve farklı görevdedir."] };
  },
});

const meiosisTree = mk({
  caption:
    "Mayoz I ve II sonunda dört hücre (bölümdeki kayıpsız model): mayoz I homologları ayırır, bir birincil spermatositten n kromozomlu ve 2C DNA'lı iki ikincil spermatosit oluşur; mayoz II kardeş kromatitleri ayırır, n ve 1C taşıyan dört spermatit oluşur. Toplam 4C korunur; bölünmeler arasında DNA eşlenmesi yoktur.",
  alt: "Ağaç şeması: üstte bir birincil spermatosit 2n ve 4C; mayoz I okuyla iki ikincil spermatosit n ve 2C; mayoz II oklarıyla dört spermatit n ve 1C.",
  h: 320,
  draw: () => {
    const els: El[] = [...B(266, 40, "Birincil spermatosit\n2n, 4C", { tone: "warn", fill: "warn", bold: true })];
    const xs2 = [140, 392];
    const xs4 = [72, 200, 332, 460];
    for (const x of xs2) els.push(A(266, 76, x, 128, "ink"), ...B(x, 160, "İkincil\nn, 2C", { w: 130, tone: "b", fill: "b" }));
    xs4.forEach((x, i) => els.push(A(xs2[i >> 1], 196, x, 246, "ink"), ...B(x, 280, "Spermatit\nn, 1C", { w: 120, tone: "a", fill: "a" })));
    els.push(T(470, 100, "mayoz I", "c", { tone: "muted", bold: true }), T(266, 222, "mayoz II", "c", { tone: "muted", bold: true }));
    return { els, readout: ["1 × 4C = 2 × 2C = 4 × 1C: toplam DNA korunur.", "İkincil spermatositte kardeş kromatitlerin birlikte bulunması iki homolog takım taşıdığı anlamına gelmez."] };
  },
});

const sperm = mk({
  caption:
    "Spermin bölümleri (nitel şema, ölçekli değil): başta haploit çekirdek ve akrozom, orta bölümde mitokondriler, mikrotübüllü kuyrukta hareket düzeneği. Akrozom tek başına bütün döllenmeyi bitirmez; spermde glikoliz de enerji kaynağıdır.",
  alt: "Yatay sperm: solda oval baş ve ön ucunda başlık gibi akrozom, içinde çekirdek; ortada sarmal mitokondrili orta bölüm; sağa uzanan dalgalı kuyruk.",
  h: 240,
  draw: () => {
    const els: El[] = [
      S([[40, 120], [60, 92], [110, 88], [140, 104], [146, 120], [140, 136], [110, 152], [60, 148]], { bold: true }),
      S([[42, 116], [60, 90], [90, 86], [80, 120], [90, 154], [60, 150], [42, 124]], { tone: "c", fill: "c" }),
      C(108, 120, 20, { tone: "a", fill: "a" }),
      R(146, 108, 240, 132, { bold: true }),
    ];
    for (let i = 0; i < 7; i++) els.push(L(152 + i * 13, 108, 160 + i * 13, 132, { tone: "warn", bold: true }));
    els.push(S(Array.from({ length: 15 }, (_, i) => [240 + i * 19, 120 + (i % 2 ? 14 : -14)] as [number, number]), { open: true, bold: true }));
    els.push(...lead(60, 100, 40, 30, "akrozom", "c", true, "e"));
    els.push(...lead(108, 130, 110, 210, "haploit çekirdek", "a"));
    els.push(...lead(190, 108, 220, 40, "orta bölüm: mitokondri", "warn"));
    els.push(...lead(380, 134, 300, 200, "kuyruk: mikrotübül", "ink", false, "e"));
    return { els, readout: ["Yapı, enerji kaynağı ve hareketin mekanik aparatı farklı düzeylerdir.", "Sperm ve yumurta zarlarının kaynaşması akrozom tepkimesinden ayrı bir basamaktır."] };
  },
});

const ducts = mk({
  caption:
    "Taşıma yolunu birleşme noktasından izle (nitel akış şeması): testis → epididimis → vas deferens → ejakülasyon kanalı → üretra. Vas deferens seminal kese kanalıyla birleşerek ejakülasyon kanalına katılır. Mesane yakınından geçmek mesane lümeninden geçmek değildir; testosteron kanla taşınır, bu borudan değil.",
  alt: "Yukarıdan aşağı beş kutu: testis, epididimis, vas deferens, ejakülasyon kanalı, üretra. Sağdan seminal kese kanalı oku ejakülasyon kanalına katılıyor.",
  h: 330,
  draw: () => {
    const c = chain(
      [{ label: "Testis", note: "sperm üretimi", tone: "a" }, { label: "Epididimis", note: "olgunlaşma" }, { label: "Vas deferens", note: "kaslı kanal" }, { label: "Ejakülasyon kanalı", bold: true }, { label: "Üretra (penis içi)", note: "son çıkış yolu" }],
      { cx: 130, w: 236, gap: 20 },
    );
    const els = [...c.els, ...B(440, 218, "Seminal kese\nkanalı", { w: 150, tone: "b", fill: "b" }), A(364, 218, 252, 218, "b")];
    return { els, readout: ["Kanal duvarının kasılmaları taşımaya katkı verir.", "Sperm hücresi ve testosteron aynı boru içinde aynı hedefe gitmez."] };
  },
});

const axis = (feedback: boolean): El[] => {
  const els: El[] = [
    ...B(266, 30, "Hipotalamus: GnRH", { tone: "a", fill: "a", bold: true }),
    A(266, 52, 266, 92, "a"),
    ...B(266, 114, "Ön hipofiz", { tone: "a" }),
    A(230, 136, 150, 178, "a"),
    A(302, 136, 382, 178, "a"),
    ...B(130, 198, "LH", { w: 90, tone: "c", fill: "c", bold: true }),
    ...B(400, 198, "FSH", { w: 90, tone: "b", fill: "b", bold: true }),
    A(130, 220, 130, 254, "c"),
    A(400, 220, 400, 254, "b"),
    ...B(130, 276, "Leydig hücresi", { w: 170, tone: "c" }),
    ...B(400, 276, "Sertoli hücresi", { w: 170, tone: "b" }),
    A(130, 298, 130, 330, "c"),
    ...B(130, 352, "Testosteron", { w: 170, tone: "c", fill: "c" }),
  ];
  if (!feedback) els.push(T(400, 334, "spermatogenez desteği", "c", { tone: "b" }));
  if (feedback) {
    els.push(S([[46, 352], [26, 220], [40, 60], [130, 30], [164, 30]], { open: true, dash: true, tone: "warn" }), A(150, 30, 168, 30, "warn"));
    els.push(L(40, 114, 196, 114, { dash: true, tone: "warn" }), A(184, 114, 200, 114, "warn"));
    els.push(T(64, 84, "−", "c", { bold: true, tone: "warn" }));
    els.push(...B(400, 372, "İnhibin", { w: 130, tone: "warn", fill: "warn" }));
    els.push(S([[466, 372], [506, 300], [506, 150], [470, 114], [340, 114]], { open: true, dash: true, tone: "warn" }), A(352, 114, 336, 114, "warn"));
    els.push(T(490, 230, "−", "c", { bold: true, tone: "warn" }));
    els.push(L(400, 298, 400, 350, { thin: true, tone: "b" }));
  }
  return els;
};
const axisUp = mk({
  caption:
    "GnRH iki ön hipofiz kolunu başlatır (nitel denetim şeması): LH testiste Leydig hücrelerini ve testosteron üretimini, FSH Sertoli hücreleri üzerinden spermatogenez desteğini uyarır. Hormonlar hedef hücre ve reseptör üzerinden etki eder.",
  alt: "Üstte hipotalamus GnRH, altında ön hipofiz. Hipofizden sola LH, Leydig hücresi ve testosteron; sağa FSH, Sertoli hücresi ve spermatogenez desteği.",
  h: 390,
  draw: () => ({ els: axis(false), readout: ["İki kol aynı merkezden başlar ama farklı hedef hücrelere gider.", "Tek hormon düzeyi bir kişinin kimliğini veya bütün davranışlarını belirleyen kesin etiket değildir."] }),
});
const FB = [
  { name: "Uyarı kolları", fb: false, txt: "GnRH → LH → Leydig → testosteron; GnRH → FSH → Sertoli." },
  { name: "İki geri bildirim", fb: true, txt: "Testosteron hipotalamus ve hipofiz düzeyinde, inhibin özellikle FSH kolunda uyarıyı sınırlar." },
];
const axisFeedback = mk({
  caption:
    "İki negatif geri bildirim (nitel denetim şeması): artan testosteron GnRH ve gonadotropin uyarısını sınırlar; Sertoli hücrelerinden inhibin özellikle ön hipofizin FSH kolunu azaltır. Eksi işareti anlık bütün hücrelerin durması anlamına gelmez; döngüler pulslarla değişir.",
  alt: "Hipotalamus, hipofiz, LH ve FSH kolları. İkinci adımda testosterondan hipotalamusa ve hipofize, inhibinden hipofize dönen kesik eksi okları.",
  h: 400,
  steps: FB.map((f) => f.name),
  draw: (_v, step) => ({ els: axis(FB[step].fb), readout: [FB[step].txt, "Önce hormon kaynağı, sonra hedefi, en son geri bildirim okunun yönünü izle."] }),
});

const STAGES = [
  ["Birincil\nspermatosit", 1, 4],
  ["İkincil\nspermatosit", 2, 2],
  ["Spermatit", 4, 1],
  ["Sperm", 4, 1],
] as const;
const countModel = mk({
  caption:
    "Hücre sayısı modeli (bölümdeki kayıpsız varsayım): birincil spermatosit sayısı n seçilir; birincil başına 1/2/4/4 hücre, hücre başına 4/2/1/1C DNA. Toplam DNA her evrede 4n C'dir; hücre sayısının artması yeni DNA eşlenmesi değildir.",
  alt: "Dört satırlı tablo: evre, hücre sayısı, hücre başına DNA ve toplam DNA. Sürgü birincil spermatosit sayısını 1 ile 4 arasında değiştirir.",
  h: 330,
  param: { label: "Birincil spermatosit", min: 1, max: 4, step: 1, init: 1 },
  draw: (n) => {
    const t = table(
      ["Evre", "Hücre", "Hücre\nbaşına", "Toplam"],
      STAGES.map(([s, k, c]) => [s, String(k * n), `${c}C`, `${k * n * c}C`]),
    );
    return { els: t.els, readout: [`${n} birincil: ${STAGES.map(([, k, c]) => `${k * n} × ${c}C`).join(" = ")} = ${4 * n}C.`, "Vas deferens engeli yalnız sperm teslim yolunu kapatır; modelde kanla hormon çıkışı korunur."] };
  },
});

export const biologyFigures060Reproduction: Record<string, Record<string, FigureDef>> = {
  "ureme-kadin-organlar": {
    "Önce görevleri yerlerine yerleştir": femaleMap,
    "Folikülde oosit ile destek hücrelerini ayır": follicle,
    "Döllenme ile ilk mitozların yeri": route,
    "Serviks, vajina ve üretranın ayrı açıklıkları": openings,
    "IVF hangi basamağı başka ortamda gerçekleştirir?": ivf,
  },
  "erkek-ureme-organlari": {
    "Seminifer tüpçükte hücrelerin düzeni": tubule,
    "Mayoz I ve II sonunda dört hücre": meiosisTree,
    "Spermin baş, orta bölüm ve kuyruğu": sperm,
    "Taşıma yolunu birleşme noktasından izle": ducts,
    "GnRH iki ön hipofiz kolunu başlatır": axisUp,
    "İki negatif geri bildirimi ayır": axisFeedback,
    "Seçici kanal ve hücre sayısı modeli": countModel,
  },
};
