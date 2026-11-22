import { fmt, type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, R, S, T, chain, lead, mk, tableFig } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Ağızdan bağırsağa sindirim organları, karaciğer ve pankreas
 * (Forge060). Organ çizimleri nitel öğretim şemasıdır, ölçekli değildir.
 * Sayılar yalnız bölümlerdeki öğretim örneklerinden gelir: erişkin diş
 * formülü 2-1-2-3, 20 birimlik model zincir, 800 + 200 − 700 − 100 mL sıvı
 * bilançosu, 100 birimlik safra tuzu havuzu ve 8 asit / 6 bikarbonat
 * eşdeğeri.
 */

/* ---------------- Ağız, yutak, yemek borusu ---------------- */

const fourJobs = mk({
  caption:
    "Dört iş, dört farklı soru (nitel akış şeması): alma, sindirim, emilim ve hücrede kullanım ayrı basamaklardır. Sindirim kanalının lümeni hücre dışıdır; emilim ürünün epitel bariyerini aşmasıdır. Sindirilmeyen artığın anüsten çıkışı ile metabolik atığın böbrekten uzaklaştırılması aynı işlev değildir.",
  alt: "Yukarıdan aşağı dört kutu: besinin alınması, lümende sindirim, epitelden emilim, hücrede kullanım. Sindirim kutusundan yana kesik bir ok sindirilmeyen artığın anüsten çıkışına gider; kullanım kutusundan metabolik atığın böbrek gibi yollarla uzaklaştırılmasına ayrı bir ok çıkar.",
  h: 330,
  draw: () => {
    const c = chain(
      [
        { label: "Besinin alınması", note: "lümen hücre dışıdır" },
        { label: "Sindirim", note: "büyük besin işlenir", tone: "c" },
        { label: "Emilim", note: "epitel bariyeri aşılır", tone: "a" },
        { label: "Hücrede kullanım", note: "ayrı basamak", tone: "b" },
      ],
      { cx: 112, w: 196 },
    );
    const els: El[] = [...c.els];
    els.push(T(266, 314, "artık: anüs; metabolik atık: böbrek", "c", { tone: "warn" }));
    return { els, readout: ["Su, iyon ve vitamin gibi küçük maddeler önce yapı taşına hidroliz edilmek zorunda değildir.", "Küçük olmak her zardan serbest geçişi garanti etmez: taşıyıcı ve çözünürlük önemlidir."] };
  },
});

const HALF = [
  ["kesici", 2],
  ["köpek", 1],
  ["küçük azı", 2],
  ["büyük azı", 3],
] as const;
const halfJaw = HALF.reduce((s, [, n]) => s + n, 0);
const tooth = mk({
  caption:
    "Dişin bölümleri (nitel şema, ölçekli değil): taç, boyun ve kök; taçta mineralce zengin mine, altında köke de uzanan dentin, özde damar ve sinir taşıyan pulpa. Tam erişkin modelde yarım çene 2 + 1 + 2 + 3 = 8 diş, dört yarım çene 32 diş eder; gerçek herkeste sayı aynı olmayabilir.",
  alt: "Boyuna kesilmiş tek diş: üstte dış katman mine, altında dentin, ortada köke kadar inen pulpa boşluğu. Diş eti hizasında kesik yatay çizgi boyunu, altındaki bölüm kökü gösteriyor. Solda taç, boyun ve kök yazıları.",
  h: 320,
  draw: () => {
    const els: El[] = [
      S([[94, 130], [90, 64], [110, 32], [145, 44], [180, 32], [200, 64], [196, 130], [182, 220], [162, 302], [128, 302], [108, 220]], { bold: true }),
      S([[104, 132], [102, 72], [118, 50], [145, 60], [172, 50], [188, 72], [186, 132]], { open: true, tone: "b" }),
      S([[125, 120], [128, 82], [145, 90], [162, 82], [165, 120], [156, 200], [148, 286], [142, 286], [134, 200]], { tone: "warn", fill: "warn" }),
      L(84, 136, 240, 136, { dash: true, tone: "c" }),
    ];
    els.push(T(40, 80, "taç", "c", { bold: true }), T(40, 136, "boyun", "c", { bold: true }), T(40, 230, "kök", "c", { bold: true }));
    els.push(...lead(100, 50, 250, 40, "mine: sert örtü", "b"));
    els.push(...lead(108, 100, 250, 96, "dentin", "ink"));
    els.push(...lead(240, 136, 250, 150, "diş eti hizası", "c"));
    els.push(...lead(158, 170, 250, 210, "pulpa: damar, sinir", "warn"));
    els.push(...lead(175, 260, 250, 270, "kök: çene içinde", "ink"));
    return {
      els,
      readout: [`Yarım çene: ${HALF.map(([n, k]) => `${k} ${n}`).join(" + ")} = ${halfJaw}; 4 × ${halfJaw} = ${4 * halfJaw} diş (tam erişkin model).`, "Süt dişi dizisi farklıdır; erişkin formülü her yaşa yayma."],
    };
  },
});

const N_CHAIN = 20;
const cutsAt = (k: number) => Array.from({ length: k }, (_, i) => Math.round(((i + 1) * N_CHAIN) / (k + 1)));
const hydrolysis = mk({
  caption:
    "Hidroliz ve parça sayısı (bölümdeki model: 20 glikoz birimli tek doğrusal zincir): k bağ kesilirse k + 1 parça oluşur. Üç kesim dört parça verir, yirmi serbest glikoz vermez; bütün birimlerin serbest kalması için 19 bağın kesilmesi gerekir. Dallanma veya halka varsa bu sayım yeniden koşullandırılır.",
  alt: "Yatay dizilmiş 20 yuvarlak birimden oluşan zincir. Sürgüyle seçilen sayıda bağ kesik çizgiyle işaretlenir; parçaların uzunlukları altlarına yazılır.",
  h: 200,
  param: { label: "Kesilen bağ sayısı", min: 0, max: 19, step: 1, init: 3 },
  draw: (k) => {
    const cuts = cutsAt(k);
    const els: El[] = [];
    const x = (i: number) => 28 + i * 25.6;
    for (let i = 0; i < N_CHAIN; i++) {
      if (i < N_CHAIN - 1 && !cuts.includes(i + 1)) els.push(L(x(i) + 9, 90, x(i + 1) - 9, 90, { bold: true }));
      els.push(C(x(i), 90, 9, { tone: "c", fill: "c" }));
    }
    for (const c of cuts) els.push(L((x(c - 1) + x(c)) / 2, 62, (x(c - 1) + x(c)) / 2, 118, { dash: true, tone: "warn" }));
    const edges = [0, ...cuts, N_CHAIN];
    const parts = edges.slice(1).map((e, i) => e - edges[i]);
    const free = parts.filter((p) => p === 1).length;
    if (k <= 6) parts.forEach((p, i) => els.push(T((x(edges[i]) + x(edges[i + 1] - 1)) / 2, 146, String(p), "c", { bold: true, tone: p === 1 ? "a" : "ink" })));
    els.push(T(266, 30, `${k} kesim → ${k + 1} parça`, "c", { bold: true }));
    if (k > 6) els.push(T(266, 146, `tek birimli parça: ${free}`, "c", { tone: free ? "a" : "muted" }));
    return { els, readout: [`${k} bağ kesildi: ${k + 1} parça, bunların ${free} tanesi serbest glikoz.`, "Parça sayısı ile bütün ürünlerin monomer olması aynı şey değildir."] };
  },
});

const PERI = ["Lokma yutakta", "Dalga ilerler", "Mideye yaklaşır"];
const peristalsis = mk({
  caption:
    "Peristaltik dalga (nitel şema, ölçekli değil): lokmanın arkasında duvar kasılıp daralır, önünde uygun gevşeme olur; ikisi birlikte lokmayı ilerletir. Yer çekimi katkı verebilir ama tek zorunlu motor değildir. Model yalnız bu taşıma aşamasını gösterir.",
  alt: "Yatay özofagus borusu ve içinde yuvarlak lokma. Lokmanın solunda boru duvarları daralmış (kasılma), sağında genişlemiş (gevşeme). Adımlarda lokma ve dalga sağa, mideye doğru ilerliyor.",
  h: 250,
  steps: PERI,
  draw: (_v, step) => {
    const c = 150 + step * 110;
    const half = (x: number) => {
      const d = x - c;
      if (d > -120 && d < -40) return 16;
      if (d >= -40 && d <= 40) return 44;
      if (d > 40 && d < 110) return 54;
      return 38;
    };
    const xs = Array.from({ length: 27 }, (_, i) => 14 + i * 19);
    const els: El[] = [
      S(xs.map((x) => [x, 110 - half(x)]), { open: true, bold: true }),
      S(xs.map((x) => [x, 110 + half(x)]), { open: true, bold: true }),
      C(c, 110, 32, { tone: "warn", fill: "warn" }),
      T(c, 110, "lokma", "c", { bold: true }),
      T(c - 80, 196, "kasılma", "c", { tone: "a", bold: true }),
      T(c - 80, 222, "(arka)", "c", { tone: "a" }),
      T(Math.min(c + 76, 470), 196, "gevşeme", "c", { tone: "c", bold: true }),
      T(Math.min(c + 76, 470), 222, "(ön)", "c", { tone: "c" }),
      A(380, 26, 500, 26, "muted"),
      T(372, 26, "mideye doğru", "w", { tone: "muted" }),
    ];
    return { els, readout: [`${step + 1}. ${PERI[step]}: arka daralır, ön açılır.`, "Lokmayı serbest düşen bir nokta gibi hızlandırmak bu fizyolojiyi yanlış temsil eder."] };
  },
});

/* ---------------- Mide ---------------- */

const stomach = mk({
  caption:
    "İki geçit arasında depo (nitel şema, ölçekli değil): özofagus kardia bölgesinden mideye açılır, çıkışta pilor duodenuma iletimi denetler. Girişte geri kaçışın sınırlanması ile çıkışta kontrollü iletim farklı düzenlemelerdir. J biçimi torbanın genişleyebilmesini anlatır.",
  alt: "J biçimli mide: sol üstten inen özofagus kardiada mideye girer, solda fundus kubbesi, ortada gövde, sağ altta daralan pilor ve ondan çıkan duodenum.",
  h: 330,
  draw: () => {
    const els: El[] = [
      L(146, 14, 160, 104, { bold: true }),
      L(186, 14, 196, 108, { bold: true }),
      S([[165, 108], [146, 92], [118, 94], [98, 126], [96, 182], [118, 242], [168, 290], [240, 312], [310, 306], [358, 282], [390, 246], [398, 238], [398, 212], [372, 210], [330, 216], [282, 222], [242, 206], [216, 170], [206, 128], [196, 108]], { bold: true, fill: "muted" }),
      L(398, 206, 398, 244, { bold: true, tone: "a" }),
      S([[398, 212], [452, 214], [482, 246], [488, 314]], { open: true, bold: true }),
      S([[398, 238], [440, 242], [456, 268], [458, 314]], { open: true, bold: true }),
      C(180, 106, 6, { tone: "b", fill: "b" }),
    ];
    els.push(T(170, 230, "gövde", "c", { bold: true }), T(156, 150, "fundus", "c", { tone: "muted" }));
    els.push(...lead(166, 40, 230, 40, "özofagus", "ink"));
    els.push(...lead(186, 106, 260, 120, "kardia: giriş", "b", true));
    els.push(...lead(398, 225, 370, 160, "pilor: çıkış", "a", true));
    els.push(T(508, 186, "duodenum", "w", { tone: "muted" }));
    return { els, readout: ["Besinlerin hepsi aynı anda ince bağırsağa boşaltılmaz.", "Kaynaktaki saat aralıkları her öğün ve kişi için değişmez sayaç değildir."] };
  },
});

const LAYERS: [string, Tone][] = [
  ["Lümen: mukus örtüsü", "muted"],
  ["Mukoza: kıvrım ve bezler, salgı, koruma", "c"],
  ["Bağ doku: damar ve sinir taşır", "ink"],
  ["Düz kas: farklı yönlü lifler, karıştırma", "warn"],
  ["Seroza: kaygan dış örtü", "b"],
];
const wall = mk({
  caption:
    "Mide duvarı içten dışa (nitel katman şeması, kalınlıklar ölçekli değil): mukoza kıvrımları ve bezleriyle salgı ve korumaya, farklı yönlü düz kas lifleri karıştırmaya katılır; bağ doku ve dış seroza farklı yapısal ilişkiler taşır. Kas enzim salgılamaz, mukoza kuvvet üretmez.",
  alt: "Üst üste beş yatay bant: en üstte lümen ve mukus, sonra mukoza, bağ doku, düz kas ve en altta seroza. Solda üstte iç, altta dış yazısı ve aşağı ok.",
  h: 300,
  draw: () => {
    const els: El[] = [];
    LAYERS.forEach(([l, t], i) => els.push(...B(296, 34 + i * 56, l, { w: 460, h: 56, tone: t === "ink" ? "ink" : t, fill: t === "ink" ? undefined : t, bold: i === 1 || i === 3 })));
    els.push(T(34, 34, "iç", "c", { bold: true }), A(34, 60, 34, 236, "muted"), T(34, 262, "dış", "c", { bold: true }));
    return { els, readout: ["Hangi yapı lümene madde veriyor, hangisi kuvvet üretiyor sorularını ayrı yanıtla.", "Mide kıvrımları bağırsak villuslarının aynısı değildir; ana emilim yüzeyi de değildir."] };
  },
});

const gland = tableFig({
  caption:
    "Bir bez, farklı hücre görevleri (bölüm metninden, ölçekli değil): baş hücreleri pepsinojen, pariyetal hücreler asit salgısıyla, yüzey ve boyun mukus hücreleri korumayla ilişkilidir; bunlar lümene verir. Gastrin üreten endokrin hücre ise kana verir. Mide normalde bağırsak tipi Goblet hücreleriyle kaplı çizilmez.",
  alt: "Dört satırlı tablo: hücre, salgı ve rota sütunları. Baş hücresi pepsinojen lümen, pariyetal hücre asit lümen, mukus hücreleri mukus lümen, endokrin hücre gastrin kan.",
  headers: ["Hücre", "Salgı", "Rota"],
  rows: [
    ["Baş (şef) hücresi", "pepsinojen", "lümen"],
    ["Pariyetal hücre", "asit (HCl)", "lümen"],
    ["Yüzey, boyun\nmukus hücresi", "mukus", "lümen, koruma"],
    ["Endokrin hücre", "gastrin", "kan"],
  ],
  readout: ["Aynı organın hem ekzokrin hem endokrin özellik göstermesi bu görev ayrımından anlaşılır.", "Lümen yolu ile kan yolu ayrı rotalardır."],
});

const zymogen = mk({
  caption:
    "İki ayrı ok (nitel şema): pepsinojen asidik koşulda aktif pepsine dönüşür; aktif pepsin daha fazla pepsinojenin etkinleşmesine katkı verebilir. Ayrı bir okta pepsin protein zincirindeki bazı peptit bağlarını hidroliz ederek daha küçük peptitler oluşturur. Bütün aminoasitler midede serbest kalmaz.",
  alt: "Üst sırada pepsinojen kutusundan pepsin kutusuna ok, okun üstünde asidik koşul yazılı; pepsinden pepsinojene dönen kesik geri besleme oku. Alt sırada protein kutusundan daha küçük peptitler kutusuna ok; pepsinden bu oka inen kesik katalizör çizgisi.",
  h: 300,
  draw: () => {
    const els: El[] = [
      ...B(110, 70, "Pepsinojen\n(öncül)", { tone: "muted", fill: "muted" }),
      ...B(420, 70, "Pepsin\n(aktif)", { tone: "a", fill: "a", bold: true }),
      A(178, 70, 360, 70, "a", { bold: true }),
      T(266, 46, "asidik koşul, HCl", "c", { tone: "a" }),
      S([[400, 108], [330, 128], [210, 128], [140, 108]], { open: true, dash: true, tone: "a" }),
      A(150, 112, 136, 106, "a"),
      T(270, 150, "daha fazla etkinleşme", "c", { tone: "a" }),
      ...B(110, 250, "Protein", { tone: "c" }),
      ...B(420, 250, "Daha küçük\npeptitler", { tone: "c", fill: "c" }),
      A(160, 250, 360, 250, "c", { bold: true }),
      L(420, 108, 420, 180, { dash: true, tone: "a" }),
      L(420, 180, 266, 236, { dash: true, tone: "a" }),
      T(424, 144, "katalizör", "e", { tone: "a" }),
    ];
    return { els, readout: ["Öncül → enzim oku ve protein → peptit oku ayrıdır; biri katalizörü, öteki besini anlatır.", "Sonraki bağırsak ve pankreas enzimleri sindirimi sürdürür."] };
  },
});

const threeStarts = mk({
  caption:
    "Üç başlangıç, üç taşıma biçimi (nitel şema, ölçekli değil): besinin görünmesi, kokusu, tadı ve düşüncesi sinir yoluyla; besin gelişi ve gerilme yerel ve hormonal yanıtlarla; gastrin ise kan yoluyla mide salgı ve hareketini destekler. Gastrin lümende protein parçalayan bir enzim değildir.",
  alt: "Üç sütun. Solda duyusal önceleme kutusu ve altında sinir yolu; ortada besin gelişi ve gerilme ve altında yerel yanıt; sağda G hücresi gastrin ve altında kan yolu. Üç sütun en alttaki mide salgı ve hareketi kutusunda birleşiyor.",
  h: 320,
  draw: () => {
    const cols: [number, string, string, Tone][] = [
      [92, "Görme, koku,\ntat, düşünce", "Sinir yolu\n(vagus)", "a"],
      [266, "Besin gelişi,\ngerilme", "Yerel ve\nhormonal yanıt", "c"],
      [440, "G hücresi:\ngastrin", "Kan yolu", "b"],
    ];
    const els: El[] = [];
    for (const [x, a, b, t] of cols) {
      els.push(...B(x, 44, a, { w: 162, tone: t }), A(x, 78, x, 112, t), ...B(x, 146, b, { w: 162, tone: t, fill: t }), A(x, 180, (x + 266) / 2, 248, t));
    }
    els.push(...B(266, 280, "Mide salgı ve hareketi", { bold: true }));
    return { els, readout: ["Sinir yolu yalnız lokma mideye değdikten sonra başlamaz.", "Asitlik ve geri etkiler de denetimin parçasıdır; hormon her koşulda sınırsız yükselmez."] };
  },
});

/* ---------------- Bağırsaklar ---------------- */

const gutPath = mk({
  caption:
    "Bir tüpün görevli bölgeleri (nitel akış şeması): kimus duodenuma girer, burada pankreas sıvısı ve safra ile buluşur; jejunum ve ileum geniş emilim yüzeyi sunar. Kalın bağırsak çekum ve kolonla sürer; rektum dışkıyı tutar, anal kanal çıkışı düzenler. Görevler keskin duvarlarla ayrılmış değildir.",
  alt: "Yukarıdan aşağı sekiz kutu: mideden gelen kimus, duodenum, jejunum, ileum, çekum, kolon, rektum, anal kanal. İnce bağırsak kutuları bir tonda, kalın bağırsak kutuları başka tonda; her kutunun yanında kısa görev notu.",
  h: 478,
  draw: () => {
    const c = chain(
      [
        { label: "Mideden kimus", tone: "muted" },
        { label: "Duodenum", note: "pankreas sıvısı + safra", tone: "c" },
        { label: "Jejunum", note: "geniş emilim yüzeyi", tone: "c" },
        { label: "İleum", note: "geniş emilim yüzeyi", tone: "c" },
        { label: "Çekum", note: "apendiks bağlı", tone: "b" },
        { label: "Kolon", note: "su ve iyon alımı", tone: "b" },
        { label: "Rektum", note: "dışkının tutulması", tone: "b" },
        { label: "Anal kanal", note: "çıkışın düzenlenmesi", tone: "b" },
      ],
      { cx: 110, w: 190, gap: 16 },
    );
    return { els: c.els, readout: ["İnce bağırsak: duodenum, jejunum, ileum. Kalın bağırsak: çekum, kolon, rektum, anal kanal.", "Her bölge aynı enzime, yüzeye ve taşıma biçimine sahip değildir."] };
  },
});

const villus = mk({
  caption:
    "Üç ölçek (nitel şema, ölçekli değil): büyük kıvrımların üzerinde çok hücreli villuslar, villusu örten epitel hücrelerinin apikal yüzünde mikrovilluslar vardır. Villusun içinde bağ doku, kılcal kan ağı ve lakteal bulunur. Alan için verilen sayılar ölçüm yöntemine bağlı yaklaşık değerlerdir.",
  alt: "Üstte kıvrım, villus ve mikrovillus kutuları oklarla sıralı. Altta solda parmak biçimli villus: dış yüzünde epitel, içinde ilmek yapan kılcal kan ağı ve ortada lakteal. Sağda tek emici hücre ve üst yüzünde fırça gibi mikrovilluslar.",
  h: 360,
  draw: () => {
    const els: El[] = [
      ...B(80, 30, "Kıvrım", { w: 130 }),
      ...B(266, 30, "Villus", { w: 130, tone: "c", fill: "c" }),
      ...B(452, 30, "Mikrovillus", { w: 150, tone: "a", fill: "a" }),
      A(148, 30, 198, 30, "muted"),
      A(334, 30, 374, 30, "muted"),
      T(80, 70, "duvar katı", "c", { tone: "muted" }),
      T(266, 70, "çok hücreli", "c", { tone: "c" }),
      T(440, 70, "zar uzantısı", "c", { tone: "a" }),
    ];
    els.push(S([[60, 340], [62, 160], [84, 112], [116, 112], [138, 160], [140, 340]], { open: true, bold: true, tone: "c" }));
    els.push(S([[72, 340], [74, 166], [90, 126], [110, 126], [126, 166], [128, 340]], { open: true, thin: true, dash: true, tone: "c" }));
    els.push(S([[82, 336], [84, 180], [100, 150], [116, 180], [118, 336]], { open: true, tone: "warn" }));
    els.push(L(100, 336, 100, 190, { bold: true, tone: "b" }), C(100, 186, 5, { tone: "b", fill: "b" }));
    els.push(...lead(64, 220, 180, 150, "epitel tabakası", "c"));
    els.push(...lead(84, 270, 180, 230, "kılcal kan ağı", "warn"));
    els.push(...lead(100, 300, 180, 300, "lakteal (lenf)", "b"));
    els.push(R(390, 200, 490, 330, { bold: true }), C(440, 280, 14, { thin: true }));
    for (let i = 0; i < 9; i++) els.push(L(396 + i * 11.5, 200, 396 + i * 11.5, 176, { tone: "a" }));
    els.push(T(440, 154, "fırçamsı kenar", "c", { tone: "a", bold: true }), T(440, 240, "emici hücre", "c", { tone: "muted" }));
    return { els, readout: ["Villus tek bir hücre değildir; mikrovillus bir hücrenin zar uzantısıdır.", "Kıvrım, villus ve mikrovillus art arda yüzey kazandırır."] };
  },
});

const twoGates = mk({
  caption:
    "Emilimin iki kapısı (nitel şema, ölçekli değil): ürün önce lümene bakan apikal zarı, sonra kan tarafına bakan bazolateral zarı geçer; iki yüzdeki taşıyıcılar aynı olmak zorunda değildir. Glikoz ve galaktoz apikal yüzde Na⁺ gradyanına bağlı ikincil aktif taşımayla, fruktoz kolaylaştırılmış geçişle alınır.",
  alt: "Ortada dikdörtgen epitel hücresi; solu lümen, sağı kan tarafı. Sol zardan iki ok girer: üstte glikoz ile Na⁺ birlikte, altta fruktoz. Sağ zardan iki ok kana çıkar. Hücrenin altında Na⁺ gradyanının dolaylı enerji gerektirdiği notu.",
  h: 330,
  draw: () => {
    const els: El[] = [
      R(186, 40, 346, 250, { bold: true }),
      L(186, 40, 186, 250, { bold: true, tone: "a" }),
      L(346, 40, 346, 250, { bold: true, tone: "b" }),
      T(90, 20, "Lümen", "c", { bold: true }),
      T(450, 20, "Kan tarafı", "c", { bold: true }),
      T(186, 272, "apikal zar", "c", { tone: "a" }),
      T(346, 272, "bazolateral zar", "c", { tone: "b" }),
      T(90, 90, "glikoz + Na⁺", "c", { tone: "c", bold: true }),
      A(150, 110, 230, 110, "c", { bold: true }),
      T(266, 84, "ikincil aktif", "c", { tone: "c" }),
      T(90, 180, "fruktoz", "c", { tone: "warn", bold: true }),
      A(150, 200, 230, 200, "warn", { bold: true }),
      T(266, 174, "kolaylaştırılmış", "c", { tone: "warn" }),
      A(306, 120, 400, 120, "c"),
      A(306, 210, 400, 210, "warn"),
      T(450, 150, "ayrı çıkış", "c", { tone: "muted" }),
      T(450, 176, "taşıyıcıları", "c", { tone: "muted" }),
      T(266, 304, "Na⁺ gradyanı: dolaylı enerji", "c", { tone: "muted" }),
    ];
    return { els, readout: ["Glikoz taşıyıcısı her geçişte ATP'yi doğrudan parçalamak zorunda değildir; gradyanı korumak enerji ister.", "Bir yandaki girişin açık olması öteki yandaki çıkışın aynı hızda işlediğini kanıtlamaz."] };
  },
});

const fatRoute = mk({
  caption:
    "Yağ ürünlerinin iki yolu (nitel akış şeması): uzun zincir ürünler epitelde yeniden trigliseride dönüşür, şilomikronla lakteale, lenf ve göğüs kanalı üzerinden venöz kana katılır. Kısa ve orta zincir yağ asitlerinin önemli bölümü ile gliserol portal kan yolunu kullanır. Misel lümende, şilomikron hücrede yapılan pakettir.",
  alt: "İki sütun. Solda uzun zincir yağ ürünleri, epitelde trigliserit, şilomikron, lakteal ve lenf, göğüs kanalı, venöz kan. Sağda kısa ve orta zincir yağ asitleri ile gliserol, kılcal ve portal kan.",
  h: 400,
  draw: () => {
    const left = chain(
      [
        { label: "Uzun zincir\nyağ ürünleri", tone: "warn" },
        { label: "Epitelde trigliserit" },
        { label: "Şilomikron", bold: true, tone: "warn", fill: "warn" },
        { label: "Lakteal, lenf", tone: "b" },
        { label: "Göğüs kanalı", tone: "b" },
        { label: "Venöz kan" },
      ],
      { cx: 134, w: 236, gap: 14 },
    );
    const right = chain(
      [
        { label: "Kısa ve orta zincir\nyağ asidi, gliserol", tone: "c" },
        { label: "Kılcal, portal kan", tone: "c", fill: "c", bold: true },
      ],
      { cx: 400, w: 236, gap: 14 },
    );
    return { els: [...left.els, ...right.els, T(400, 200, "lenfe gitmez", "c", { tone: "muted" })], readout: ["'Bütün yağ ürünleri önce lenfe gider' cümlesi fazla geneldir.", "Lenf de sonunda venöz birleşimle dolaşıma katılır."] };
  },
});

const FLOW = [
  { name: "Başlangıç", d: 800 },
  { name: "Salgı girişi", d: 200 },
  { name: "Emilim", d: -700 },
  { name: "İlerleme", d: -100 },
];
const balance = mk({
  caption:
    "Sıvı bilançosu (bölümdeki öğretim modeli, gerçek ölçüm değil): son lümen suyu = başlangıç + salgı − emilim − ilerleme = 800 + 200 − 700 − 100 = 200 mL. Birimleri aynı tut, bütün akışları say. Son hacim hangi hastalığın bulunduğunu göstermez.",
  alt: "Şelale grafiği: 800 mL başlangıç sütunu, üstüne 200 mL salgı eklenir, 700 mL emilim ve 100 mL ilerleme düşülür, en sağda 200 mL kalan sütunu. Adımlarla akışlar sırayla eklenir.",
  h: 330,
  steps: [...FLOW.map((f) => f.name), "Kalan"],
  draw: (_v, step) => {
    const k = 0.24;
    const base = 270;
    const els: El[] = [L(14, base, 518, base, { thin: true, tone: "muted" })];
    let level = 0;
    const shown = Math.min(step, FLOW.length - 1);
    FLOW.forEach((f, i) => {
      if (i > shown) return;
      const x = 40 + i * 96;
      const from = level;
      level += f.d;
      const y0 = base - Math.max(from, level) * k;
      const y1 = base - Math.min(from, level) * k;
      const t: Tone = i === 0 ? "ink" : f.d > 0 ? "c" : "warn";
      els.push(R(x, y0, x + 64, y1, { tone: t, fill: t === "ink" ? "muted" : t }));
      els.push(T(x + 32, y0 - 16, `${f.d > 0 && i > 0 ? "+" : f.d < 0 ? "−" : ""}${fmt(Math.abs(f.d), 0)}`, "c", { bold: true, tone: t }));
      els.push(T(x + 32, base + (i % 2 ? 44 : 18), f.name, "c", { tone: "muted" }));
      if (i < FLOW.length - 1 && i < shown) els.push(L(x + 64, base - level * k, x + 96, base - level * k, { dash: true, thin: true, tone: "muted" }));
    });
    if (step === FLOW.length) {
      const x = 40 + 4 * 96;
      els.push(R(x, base - level * k, x + 64, base, { tone: "a", fill: "a" }), T(x + 32, base - level * k - 16, `${fmt(level, 0)}`, "c", { bold: true, tone: "a" }), T(x + 32, base + 18, "Kalan", "c", { tone: "a" }));
    }
    const sum = FLOW.slice(0, shown + 1).reduce((s, f) => s + f.d, 0);
    const expr = FLOW.slice(0, shown + 1)
      .map((f, i) => (i === 0 ? fmt(f.d, 0) : `${f.d > 0 ? "+" : "−"} ${fmt(Math.abs(f.d), 0)}`))
      .join(" ");
    return { els, readout: [`${expr} = ${fmt(sum, 0)} mL.`, "Bu sayılar gerçek bir kişinin bağırsak ölçümleri değildir."] };
  },
});

/* ---------------- Karaciğer ve safra ---------------- */

const twoNets = mk({
  caption:
    "İki ayrı taşıma ağı (nitel akış şeması): kan karaciğere hepatik arter ve portal toplardamarla girer, hepatik toplardamarlarla sistemik dönüşe çıkar. Safra hepatositlerde üretilir ve kanallarla duodenuma gider. Portal kandaki glikoz safra kanalıyla duodenuma gitmez.",
  alt: "İki sütun. Solda kan ağı: hepatik arter ve portal toplardamar, karaciğer hepatositleri, hepatik toplardamar ve sistemik dönüş. Sağda safra ağı: hepatositler, safra kanalları, koledok, duodenum.",
  h: 320,
  draw: () => {
    const left = chain(
      [{ label: "Hepatik arter +\nportal toplardamar", tone: "warn" }, { label: "Hepatositler" }, { label: "Hepatik toplardamar", tone: "warn" }, { label: "Sistemik dönüş", tone: "warn" }],
      { cx: 132, w: 236, gap: 22, y0: 40 },
    );
    const right = chain(
      [{ label: "Hepatositler:\nsafra üretimi", tone: "c" }, { label: "Safra kanalları", tone: "c" }, { label: "Koledok", tone: "c" }, { label: "Duodenum", tone: "c", fill: "c" }],
      { cx: 400, w: 236, gap: 22, y0: 40 },
    );
    return { els: [...left.els, ...right.els, T(132, 16, "Kan ağı", "c", { bold: true, tone: "warn" }), T(400, 16, "Safra ağı", "c", { bold: true, tone: "c" })], readout: ["Kan ve safra aynı organdan geçse de farklı yönlerde akan ayrı ağlardır.", "Safra kesesi karaciğerle aynı organ değildir."] };
  },
});

type Block = "none" | "cystic" | "cbd";
const bileTree = (block: Block): El[] => {
  const ok = (on: boolean): Tone => (on ? "c" : "muted");
  const toDuo = block !== "cbd";
  const toSac = block !== "cystic";
  const els: El[] = [
    ...B(130, 40, "Karaciğer:\nsafra üretimi", { w: 200, tone: "b", fill: "b", bold: true }),
    L(90, 74, 170, 140, { bold: true, tone: "c" }),
    L(170, 74, 170, 140, { bold: true, tone: "c" }),
    T(76, 110, "sağ, sol", "c", { tone: "muted" }),
    L(170, 140, 170, 196, { bold: true, tone: "c" }),
    T(184, 156, "ortak hepatik", "e", { tone: "muted" }),
    L(170, 196, 330, 196, { bold: true, tone: ok(toSac), dash: !toSac }),
    T(252, 216, "sistik kanal", "c", { tone: ok(toSac) }),
    ...B(420, 196, "Safra kesesi:\ndepo", { w: 170, tone: ok(toSac), fill: toSac ? "c" : undefined, text: toSac ? "ink" : "muted" }),
    L(170, 196, 170, 282, { bold: true, tone: ok(toDuo), dash: !toDuo }),
    T(160, 240, "koledok", "w", { tone: ok(toDuo) }),
    ...B(180, 306, "Duodenum", { w: 200, tone: ok(toDuo), fill: toDuo ? "c" : undefined }),
    ...B(420, 306, "Pankreas", { w: 170, tone: "muted" }),
    L(335, 306, 282, 306, { tone: "muted", dash: true }),
    T(420, 270, "Wirsung ayrı bezden", "c", { tone: "muted" }),
  ];
  if (block === "cystic") els.push(L(252, 182, 252, 210, { bold: true, tone: "warn" }), T(252, 252, "tıkalı", "c", { bold: true, tone: "warn" }));
  if (block === "cbd") els.push(L(156, 254, 184, 254, { bold: true, tone: "warn" }), T(194, 254, "tıkalı", "e", { bold: true, tone: "warn" }));
  return els;
};
const bileFlow = mk({
  caption:
    "Hepatositten duodenuma safra akışı (öğretim şeması, ölçekli değil): kanalcıklar sağ ve sol kanallarda toplanır, ortak hepatik yol kesenin sistik kanalıyla birleşir; devamı koledoktur. Pankreasın Wirsung kanalı ayrı bir bezden gelir. Gerçek kanal birleşimlerinde anatomik varyasyon bulunabilir.",
  alt: "Üstte karaciğer kutusu; sağ ve sol kanallar ortak hepatik yola birleşir. Ortak yol sağa sistik kanalla safra kesesine, aşağı koledokla duodenuma uzanır. Sağ altta ayrı pankreas kutusu ve kesik Wirsung çizgisi.",
  h: 340,
  draw: () => ({ els: bileTree("none"), readout: ["Sistik kanal ile koledok şemada ayrı isimler taşır.", "Tek birleşim çizimi her insanda değişmez ayrıntı değildir."] }),
});
const BLOCKS: { name: string; b: Block; txt: string }[] = [
  { name: "Açık yollar", b: "none", txt: "Üretim karaciğerde sürer; kese öğünler arasında depolar ve yoğunlaştırır." },
  { name: "Sistik kanal tıkalı", b: "cystic", txt: "Kese kullanımı aksar; hepatik yol ve koledok açık kalabilir, safra duodenuma ulaşabilir." },
  { name: "Koledok tıkalı", b: "cbd", txt: "Karaciğerden duodenuma çıkış da etkilenir; iki tıkanma aynı deney değildir." },
];
const sacStore = mk({
  caption:
    "Kese üretmez; depolar ve yoğunlaştırır (öğretim şeması, tanı aracı değil): sistik kanal tıkanması ile koledok tıkanmasını karşılaştır. Kesenin bulunmaması karaciğerin safra üretimini durdurmaz; safra doğrudan kanal yoluyla bağırsağa akabilir.",
  alt: "Safra yolu ağacı. Birinci adımda bütün yollar açık. İkinci adımda sistik kanal üzerinde tıkalı işareti, kese sönük; koledok açık. Üçüncü adımda koledok üzerinde tıkalı işareti, duodenum sönük.",
  h: 340,
  steps: BLOCKS.map((b) => b.name),
  draw: (_v, step) => ({ els: bileTree(BLOCKS[step].b), readout: [BLOCKS[step].txt, "CCK yanıtı kesenin kasılmasına katılır; depolama akışı öğüne göre değişir."] }),
});

const POOL = 100;
const pool = mk({
  caption:
    "Enterohepatik havuz (bölümdeki oyuncak kütle bilançosu): 100 birimlik havuzdan r birim ileal geri alımla döner, kayıp 100 − r olur; havuz aynı kalacaksa yeni sentez kaybı tamamlar. Bölüm örneği r = 80, kayıp 20, sentez 20'dir. Gerçek sentez hızı bu yüzdeyle bulunmaz.",
  alt: "Döngü şeması: karaciğer kutusundan safra yoluyla bağırsak kutusuna ok, bağırsaktan portal kanla karaciğere dönen ok ve üzerinde geri dönen miktar. Bağırsaktan aşağı kayıp oku, karaciğere dışarıdan giren yeni sentez oku.",
  h: 300,
  param: { label: "Geri dönen safra tuzu", min: 50, max: 100, step: 5, init: 80, unit: " birim" },
  draw: (r) => {
    const loss = POOL - r;
    const els: El[] = [
      ...B(130, 70, `Karaciğer\nhavuz ${POOL}`, { w: 170, tone: "b", fill: "b", bold: true }),
      ...B(400, 70, "Bağırsak", { w: 170, tone: "c", fill: "c" }),
      A(218, 50, 312, 50, "c", { bold: true }),
      T(266, 26, `safra: ${POOL}`, "c", { tone: "c" }),
      A(312, 96, 218, 96, "b", { bold: true }),
      T(266, 124, `portal dönüş: ${r}`, "c", { tone: "b", bold: true }),
      A(400, 104, 400, 210, "warn", { bold: loss > 0, dash: loss === 0 }),
      T(400, 236, `kayıp: ${POOL} − ${r} = ${loss}`, "c", { tone: "warn", bold: true }),
      A(130, 210, 130, 106, "a", { bold: loss > 0, dash: loss === 0 }),
      T(130, 236, `yeni sentez: ${loss}`, "c", { tone: "a", bold: true }),
    ];
    return { els, readout: [`${r} birim döner, ${loss} birim kaybolur; havuzu ${POOL}'de tutmak için ${loss} birim yeni sentez gerekir.`, "Molekül her öğünde sıfırdan yapılmaz; döngü içinde yeniden kullanılır."] };
  },
});

const sources = tableFig({
  caption:
    "Doğru kaynak (bölüm metninden): karaciğer amonyağın yönetimine üre sentezi ile katkı verir, üre kana verilir ve başlıca böbrekten atılır. Albümin ve fibrinojen karaciğerde yapılır; antikorları ise plazma hücreleri üretir.",
  alt: "Dört satırlı tablo: madde, yapıldığı yer ve sonraki yol. Üre karaciğer kan ve böbrek; albümin ve fibrinojen karaciğer plazma; antikor plazma hücresi.",
  headers: ["Madde", "Yapıldığı yer", "Sonra"],
  rows: [
    ["Üre", "karaciğer\n(amonyaktan)", "kanla böbreğe"],
    ["Albümin", "karaciğer", "plazmada"],
    ["Fibrinojen", "karaciğer", "plazmada"],
    ["Antikor", "plazma hücresi", "hepatosit\nürünü değil"],
  ],
  readout: ["Bütün globulinleri veya bütün savunma moleküllerini hepatosit ürünü sayma.", "Aminoasit havuzu glikojen gibi sınırsız bir protein deposu değildir."],
});

/* ---------------- Pankreas ---------------- */

const pancreasMap = mk({
  caption:
    "Karma bez (nitel şema, ölçekli değil): pankreasın başı duodenum kıvrımındadır; asiner hücrelerin salgısı ana kanal Wirsung ile duodenuma gider. Koledok başka organdan, karaciğerden gelir. Adacıklar aralara dağılmış ayrı endokrin hücre gruplarıdır. Ortak son giriş gösterilse de kanal varyasyonları vardır.",
  alt: "Solda C biçimli duodenum, kıvrımın içinde pankreas başı, sağa uzanan gövde ve kuyruk. Pankreas boyunca uzanan Wirsung kanalı duodenuma açılır; yukarıdan inen koledok aynı bölgeye gelir. Pankreas içinde birkaç küçük adacık halkası.",
  h: 300,
  draw: () => {
    const els: El[] = [
      S([[220, 44], [140, 56], [94, 150], [124, 248], [230, 268]], { open: true, bold: true }),
      S([[220, 74], [160, 82], [126, 150], [148, 222], [230, 238]], { open: true, bold: true }),
      S([[150, 132], [200, 108], [290, 122], [400, 108], [488, 100], [508, 118], [488, 140], [400, 156], [290, 172], [200, 200], [156, 184]], { tone: "warn", fill: "warn" }),
      L(482, 120, 290, 146, { tone: "a", bold: true }),
      L(290, 146, 132, 152, { tone: "a", bold: true }),
      L(190, 14, 136, 140, { tone: "c", bold: true }),
      C(330, 132, 8, { tone: "b", fill: "b" }),
      C(430, 122, 8, { tone: "b", fill: "b" }),
      C(240, 168, 8, { tone: "b", fill: "b" }),
    ];
    els.push(T(70, 150, "duodenum", "c", { tone: "muted" }));
    els.push(...lead(186, 26, 240, 20, "koledok (safra)", "c"));
    els.push(...lead(380, 136, 250, 236, "Wirsung: pankreas sıvısı", "a", false, "e"));
    els.push(...lead(430, 122, 420, 60, "adacık", "b", false, "e"));
    els.push(...lead(190, 180, 220, 280, "pankreas başı", "warn"));
    els.push(T(490, 170, "kuyruk", "c", { tone: "muted" }));
    return { els, readout: ["Aynı organda bulunmak salgıların aynı boşluğa gittiği anlamına gelmez.", "Pankreas sıvısı ile safra farklı organlardan gelir."] };
  },
});

const enzymes = tableFig({
  caption:
    "Karbonhidrat ve lipit enzimleri (bölüm metninden): pankreatik amilaz nişasta ve glikojenin uygun bağlarını keser, son disakkarit parçalanması fırçamsı kenarda tamamlanabilir; selülozu aynı biçimde kesmez. Lipazın baskın ürünleri yağ asitleri ve monoasilgliseroldür; tam hidroliz açıkça verilen son nokta modelidir.",
  alt: "İki satırlı tablo: enzim, substrat, ürün ve not sütunları. Amilaz nişasta ve glikojen, küçük karbonhidratlar; lipaz trigliserit, yağ asitleri ve monoasilgliserol.",
  headers: ["Enzim", "Substrat", "Baskın ürün"],
  rows: [
    ["Pankreatik\namilaz", "nişasta,\nglikojen\n(selüloz değil)", "küçük\nkarbonhidratlar;\nson: fırçamsı kenar"],
    ["Pankreatik\nlipaz", "trigliserit\n(safra destekli)", "yağ asitleri,\nmonoasilgliserol"],
  ],
  readout: ["Enzim özgüllüğü: aynı glikoz birimlerinden yapılmış olmak aynı kesimi zorunlu kılmaz.", "Lipaz etkisini safra destekli dağılım ve yardımcı koşullar destekler."],
});

const nuclease = mk({
  caption:
    "Nükleazdan son parçalama basamaklarına (nitel akış şeması): pankreatik nükleazlar besinle gelen DNA ve RNA'yı daha küçük nükleotitlere hidroliz eder; bağırsak yüzeyindeki devam enzimleriyle şeker, fosfat ve azotlu baza ilerlenir. Sindirim ürünü oluşturmak ile ürünün epitele alınması aynı olay değildir.",
  alt: "Yukarıdan aşağı dört kutu: DNA ve RNA, nükleotitler, şeker fosfat ve azotlu baz, epitelden emilim. İlk okun yanında pankreatik nükleaz, ikinci okun yanında bağırsak yüzeyi enzimleri yazılı; son kutu kesik.",
  h: 300,
  draw: () => {
    const c = chain(
      [
        { label: "DNA, RNA (besin)", tone: "b" },
        { label: "Nükleotitler", note: "pankreatik nükleaz ile", tone: "b" },
        { label: "Şeker + fosfat + baz", note: "yüzey enzimleri", tone: "c" },
        { label: "Epitelden emilim", note: "ayrı bir olay", dash: true, tone: "muted" },
      ],
      { cx: 128, w: 228 },
    );
    return { els: c.els, readout: ["Nükleazın substratı nükleik asittir; protein için proteaz, yağ için lipaz ayrımı korunur.", "Pankreas kanalı besinleri karaciğere taşıyan portal damar değildir."] };
  },
});

const OUT = [
  { name: "İki yol açık", closed: false, txt: "Enzimli salgı kanalla duodenum lümenine, insülin ve glukagon adacıklardan kana gider." },
  { name: "Ana kanal kapalı", closed: true, txt: "Seçici deneyde enzim teslimi duodenuma ulaşmaz; adacık dolaşımı sağlamsa hormonlar kana çıkmayı sürdürür." },
];
const twoOutputs = mk({
  caption:
    "Endokrin adacığın yolu kanaldan ayrıdır (seçici öğretim deneyi, ölçekli değil): asiner salgı ana kanalla duodenum lümenine, beta hücrelerinden insülin ve alfa hücrelerinden glukagon kana verilir. Yalnız ana kanal kapatılırsa hormon çıkışı bu nedenle sıfırlanmaz; yaygın organ hasarı ise başka bir koşuldur.",
  alt: "Üst sırada asiner hücreler kutusundan ana kanal okuyla duodenum lümenine; alt sırada adacık kutusundan kan okuyla kan dolaşımına. İkinci adımda üst ok kesik ve tıkalı işaretli, alt ok sağlam.",
  h: 260,
  steps: OUT.map((o) => o.name),
  draw: (_v, step) => {
    const o = OUT[step];
    const t: Tone = o.closed ? "muted" : "a";
    const els: El[] = [
      ...B(100, 60, "Asiner hücre\n+ kanal", { w: 172, tone: "warn" }),
      A(190, 60, 340, 60, t, { bold: !o.closed, dash: o.closed }),
      T(266, 36, "ana kanal: enzim", "c", { tone: t }),
      ...B(432, 60, "Duodenum\nlümeni", { w: 172, tone: t, fill: o.closed ? undefined : "a", text: o.closed ? "muted" : "ink" }),
      ...B(100, 196, "Adacık:\nalfa, beta", { w: 172, tone: "b" }),
      A(190, 196, 340, 196, "b", { bold: true }),
      T(266, 172, "kan: hormon", "c", { tone: "b" }),
      ...B(432, 196, "Kan dolaşımı", { w: 172, tone: "b", fill: "b" }),
    ];
    if (o.closed) els.push(L(266, 46, 266, 74, { bold: true, tone: "warn" }), T(266, 96, "kapalı", "c", { tone: "warn", bold: true }));
    return { els, readout: [o.txt, "İnsülin ve glukagon besin bağlarını lümende kesen sindirim enzimleri değildir."] };
  },
});

const ACID = 8;
const neutral = mk({
  caption:
    "Asit-baz eşdeğeri hesabı (bölümdeki model: 8 birim asit eşdeğeri, bire bir tepkime): teslim edilen bikarbonat b ise nötralize edilen = en küçük(8, b), kalan asit = 8 − nötralize. Bölüm örneği b = 6 için 6 nötralize, 2 asit kalır. Kanal kapalıysa teslim 0'dır. Kalan 2 birim pH 2 demek değildir.",
  alt: "İki çubuk çifti: solda başlangıç asit ve teslim edilen bikarbonat, sağda tepkime sonrası kalan asit ve kalan bikarbonat. Sürgüyle bikarbonat teslimi 0 ile 10 birim arasında değişir.",
  h: 340,
  param: { label: "Teslim edilen bikarbonat", min: 0, max: 10, step: 1, init: 6, unit: " birim" },
  draw: (b) => {
    const n = Math.min(ACID, b);
    const k = 22;
    const base = 260;
    const bar = (x: number, val: number, t: Tone, label: string): El[] => [
      ...(val > 0 ? [R(x, base - val * k, x + 70, base, { tone: t, fill: t })] : [L(x, base, x + 70, base, { bold: true, tone: t })]),
      T(x + 35, base - val * k - 16, fmt(val, 0), "c", { bold: true, tone: t }),
      T(x + 35, base + 18, label, "c", { tone: "muted" }),
    ];
    const els: El[] = [
      L(14, base, 518, base, { thin: true, tone: "muted" }),
      ...bar(40, ACID, "warn", "asit"),
      ...bar(130, b, "c", "bikarbonat"),
      ...bar(300, ACID - n, "warn", "kalan asit"),
      ...bar(430, b - n, "c", "kalan baz"),
      A(222, 120, 284, 120, "ink"),
      T(266, 318, `nötralize = en küçük(${ACID}, ${b}) = ${n}`, "c", { bold: true }),
    ];
    return { els, readout: [`${n} birim nötralize edilir; ${ACID - n} birim asit, ${b - n} birim bikarbonat kalır.`, b === 0 ? "Teslim 0: kanal kapalı koşulunda üretim olsa bile duodenuma bikarbonat ulaşmaz." : "Asit ve baz ayrı stoklar olarak tutulunca negatif miktar oluşmaz."] };
  },
});

export const biologyFigures060Digestion: Record<string, Record<string, FigureDef>> = {
  "sindirim-agiz-yutak-yemek-borusu": {
    "Dört iş, dört farklı soru": fourJobs,
    "Dişin görünen tacı ile canlı pulpasını ayır": tooth,
    "Hidroliz, zincir sayısı ve ürünün kimliği": hydrolysis,
    "Peristaltik dalgada arka daralır, ön açılır": peristalsis,
  },
  "sindirim-mide": {
    "İki geçit arasında değişen bir depo": stomach,
    "Duvarın her katmanı aynı işi yapmaz": wall,
    "Bir bez resmi, farklı hücre görevleri": gland,
    "Zimojenin aktifleşmesiyle proteinin parçalanması ayrı oklar": zymogen,
    "Sinirsel önceleme ve gastrinin kan yolu": threeStarts,
  },
  "sindirim-bagirsaklar": {
    "Bir tüpün farklı görevli bölgeleri": gutPath,
    "Kıvrım, villus ve mikrovillus üç ayrı ölçektir": villus,
    "Emilimin iki kapısı: apikal giriş ve bazolateral çıkış": twoGates,
    "Yağ yolunda yeniden paketleme ve önemli istisna": fatRoute,
    "Bir bilanço kur, eksik bilgiyi üretme": balance,
  },
  "sindirim-karaciger-safra": {
    "Sağ üst karında iki ayrı taşıma ağı": twoNets,
    "Hepatositten duodenuma safra akışı": bileFlow,
    "Kese üretmez; depolar ve yoğunlaştırır": sacStore,
    "Geri dönen safra tuzuyla bir havuz kur": pool,
    "Azot, üre ve plazma proteinlerinde doğru kaynak": sources,
  },
  "sindirim-pankreas": {
    "Midenin arkasında bir karma bez": pancreasMap,
    "Karbonhidrat ve lipit enzimleri": enzymes,
    "Nükleazdan son parçalama basamaklarına": nuclease,
    "Endokrin adacığın yolu kanaldan ayrıdır": twoOutputs,
    "Asit-baz eşdeğeri hesabını sınırla": neutral,
  },
};
