import { txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { boardFig, stepsFig, timelineFig, type Ev } from "./historyFigures059Kit";
import { flowPickFig, flowStepFig, type FlowNode } from "./historyFigures061TytKit";
import { pad } from "./biologyFigures059Kit";
import { table } from "./biologyFigures059TytKit";

/*
 * TYT Tarih · Değişim çağında Avrupa ve Osmanlı, XIX–XX. yüzyılda değişen
 * sosyoekonomik hayat, klasik çağda Osmanlı toplum düzeni, değişen dünya
 * dengeleri (Forge061). Yıllar, adlar, kurumların işlevleri ve sonuç
 * nitelemeleri (kazanım, kayıp, statü) yalnız bölüm metinlerindeki
 * ifadelerdir; ek yorum ve taraf tutma yoktur.
 */

/* ---------------- Değişim çağında Avrupa ve Osmanlı ---------------- */

const fiscal = flowStepFig({
  nodes: [
    { c: v(6, 4.6), w: 8.6, s: "Ateşli silah, sürekli piyade · uzun seferler", tone: "b", step: 0, h: 1.25 },
    { c: v(6, 2.7), w: 7.2, s: "Düzenli nakit gider arttı", tone: "warn", step: 1 },
    { c: v(3.0, 0.8), w: 5.6, h: 1.25, s: "Yeniçeri sayısı · arttı", step: 2 },
    { c: v(9.0, 0.8), w: 5.6, h: 1.25, s: "Sekban, sarıca · levent", step: 2 },
    { c: v(3.0, -1.1), w: 5.6, s: "İltizam", tone: "a", step: 3 },
    { c: v(9.0, -1.1), w: 5.6, s: "1695 malikâne", tone: "a", step: 4 },
  ],
  edges: [
    { a: 0, b: 1, step: 1 },
    { a: 1, b: 2, step: 2 },
    { a: 1, b: 3, step: 2 },
    { a: 2, b: 4, step: 3, dash: true },
    { a: 4, b: 5, step: 4 },
  ],
  steps: [
    { s: "Değişen koşul", what: "Ateşli silahların, sürekli eğitimli piyadenin ve uzun seferlerin önemi arttı." },
    { s: "Mali sonuç", what: "Ordunun düzenli nakit gideri yükseldi." },
    { s: "Asker toplama", what: "Yönetim yeniçeri sayısını artırma ve sekban, sarıca, levent gibi silahlı unsurlardan yararlanma yollarına başvurdu; tımarlı sipahinin işlevi bir anda sıfırlanmadı." },
    { s: "Nakit gelir", what: "İltizam: vergi toplama hakkının belirli bedel karşılığında mültezime verilmesi." },
    { s: "Malikâne", what: "1695'ten itibaren bu hak hayat boyu verilebildi; toprağın sınırsız mülkiyetini devretmek demek değildir." },
  ],
  caption:
    "Değişen koşuldan kurumun tepkisine: ateşli silah, sürekli piyade ve uzun seferler ordunun düzenli nakit giderini artırdı; yönetim yeniçeri sayısını artırdı, sekban, sarıca ve levent gibi unsurlardan yararlandı, nakit gelir için iltizama, 1695'ten itibaren hayat boyu malikâneye başvurdu. Kesik ok: doğrudan neden değil, aynı ihtiyacın başka bir aracı.",
  alt: "Yukarıdan aşağıya akış: 'Ateşli silah, sürekli piyade, uzun seferler' → 'Düzenli nakit gider arttı' → iki kutu: 'Yeniçeri sayısı arttı' ve 'Sekban, sarıca, levent'; altta 'İltizam' → '1695 malikâne'. Adımlarla sırayla açılır.",
  foot: "Tımar hizmet karşılığı vergi geliri tahsisidir; iltizam ve malikâne vergi toplama hakkıdır, toprağın mülkiyeti değildir.",
  extra: pad(v(-0.2, 5.6), v(12.2, -1.9)),
});

const revolts = boardFig(
  [
    { name: "Celâli", tag: "taşra · vergi, savaş · güvenlik", what: "Farklı dönem ve grupların isyanları; vergi yükü, uzun savaşlar, silahlı işsiz gruplar, yerel yöneticiler ve güvenlik sorunları birlikte etkili olabiliyordu. Büyük Kaçgun tarım ve vergi düzenini sarstı.", tone: "warn" },
    { name: "Suhte", tag: "medrese · eğitim, geçim · görev bulma", what: "Medrese öğrencilerinin eğitim, geçim ve görev bulma sorunları öne çıkar.", tone: "b" },
    { name: "Yeniçeri", tag: "başkent · maaş, sikke · disiplin", what: "Başkent yeniçeri hareketlerinde maaş, sikke, disiplin ve siyasal çıkarlar öne çıkar.", tone: "c" },
  ],
  3,
  "Üç hareketi yer ve temel talep ayırır: Celâli taşrada (Anadolu) vergi yükü, uzun savaş ve güvenlik; suhte medrese öğrencilerinin eğitim, geçim ve görev sorunu; yeniçeri hareketi merkezde (başkent) maaş, sikke ve disiplin. Birbirinden yalıtık değildirler ama tek başlık altında özdeşleştirilemezler.",
  "Yan yana üç kutu: Celâli (taşra; vergi, savaş; güvenlik), Suhte (medrese; eğitim, geçim; görev bulma), Yeniçeri (başkent; maaş, sikke; disiplin). Kutular seçilebilir.",
  "İsyanı bastırmak vergi, gelir ve istihdam sorunlarının kendiliğinden çözüldüğünü göstermez.",
  4.1,
);

const TULIP: Ev[] = [
  { y: 1718, s: "Pasarofça", what: "Lâle Devri bu antlaşmanın sonrasından başlatılır.", tone: "b" },
  { y: 1718, y1: 1730, s: "Lâle Devri", what: "Avrupa'yı tanıma, elçilik gözlemleri, tercüme, üretim ve şehir hayatındaki yeniliklerle ilişkilidir.", tone: "a" },
  { y: 1727, s: "Müteferrika matbaası", what: "İbrahim Müteferrika ve Said Efendi'nin girişimi; Türkçe eser basan Müslüman matbaacılığında önemlidir. İlk basılan eser Vankulu Lügati.", tone: "c" },
  { y: 1730, s: "Patrona Halil İsyanı", what: "Lâle Devri bu isyanla kapanır.", tone: "warn" },
];
const tulip = timelineFig({
  events: TULIP,
  a0: 1715,
  a1: 1735,
  ticks: [1715, 1720, 1725, 1730, 1735],
  caption:
    "Lâle Devri 1718 Pasarofça sonrasından 1730 Patrona Halil İsyanı'na uzanır; 1727'deki İbrahim Müteferrika ve Said Efendi girişimi bu aralıktadır. Bu, Türkçe eser basan Müslüman matbaacılığı için önemlidir; Osmanlı ülkesinde daha önce hiç matbaa bulunmadığı anlamına gelmez. Dönemle ilişkilendirilen bir etkiyi sonraki yapıları bu aralığa taşımak için kullanma.",
  alt: "Yatay yıl ekseni 1715–1735. Dört satır: 1718 Pasarofça noktası, 1718–1730 Lâle Devri çubuğu, 1727 Müteferrika matbaası noktası, 1730 Patrona Halil İsyanı noktası.",
  foot: "Paris elçiliği (Yirmisekiz Çelebi Mehmet) dış dünyayı gözlemleme örneğidir.",
});

/* ---------------- Değişen sosyoekonomik hayat ---------------- */

const debt = stepsFig({
  items: [
    { s: "1838 Balta Limanı", what: "Ticaret antlaşması: İngiliz tüccarın hareket alanını genişletti, tekelleri kaldıran hükümler içerdi. İlk dış borç sözleşmesi değildir." },
    { s: "1854 ilk dış borç", what: "Kırım Savaşı sırasında büyüyen harcamalar için dış finansman; kısa vadeli ödeme imkânı, faiz ve geri ödeme yükümlülüğü.", tone: "b" },
    { s: "1875 ödeme krizi", what: "Savaşlar, bütçe açıkları, gelir yetersizliği ve borç hizmeti birbirini besledi.", tone: "warn" },
    { s: "1881 Düyûn-ı Umûmiye", what: "Muharrem Kararnamesi'yle alacaklıları temsil eden idare belirli gelirleri toplayıp borç ödemelerine yönlendirdi.", tone: "b" },
  ],
  caption:
    "Ticaret, borç ve gelir denetimi ayrı aşamalardır: 1838 Balta Limanı bir ticaret antlaşmasıdır, borç sözleşmesi değildir; 1854'te Kırım Savaşı sırasında ilk dış borç alındı; 1875 ödeme krizi geldi; 1881'de Düyûn-ı Umûmiye kuruldu. 'İlk borç alındı, aynı gün Düyûn-ı Umûmiye kuruldu' demek aradaki süreci siler.",
  alt: "Yukarıdan aşağıya dört kutu: 1838 Balta Limanı, 1854 ilk dış borç, 1875 ödeme krizi, 1881 Düyûn-ı Umûmiye. Adımlarla sırayla etkinleşir.",
  foot: "Borç alınan para gelir değil, faiz ve geri ödeme yükümlülüğü doğuran finansmandır.",
  w: 7,
});

const DUI: FlowNode[] = [
  { c: v(2.4, 3.2), w: 4.2, s: "Tuz", tone: "c", what: "Tuz geliri Düyûn-ı Umûmiye düzeninin kapsamındaydı." },
  { c: v(6, 3.2), w: 2.6, s: "Tütün", tone: "c", what: "Tütün geliri bu düzenin kapsamındaydı." },
  { c: v(9.6, 3.2), w: 4.2, s: "Bazı vergiler", tone: "c", what: "Bazı vergi gelirleri bu düzenin kapsamındaydı." },
  { c: v(6, 1.2), w: 8.4, s: "Düyûn-ı Umûmiye · alacaklıları temsil eden idare", tone: "warn", h: 1.25, what: "Belirli Osmanlı gelirlerini toplar ve borç ödemelerine yönlendirir. Mali egemenliğin daralmasını gösterir; bütün devletin ortadan kalktığını göstermez." },
  { c: v(6, -0.8), w: 5.6, s: "Borç ödemeleri", tone: "b", what: "Toplanan gelir alacaklılara yapılan borç ödemelerine gider." },
];
const duyun = flowPickFig({
  nodes: DUI,
  edges: [
    { a: 0, b: 3 },
    { a: 1, b: 3 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
  ],
  caption:
    "Hangi gelir kimin elinde? 1881 Muharrem Kararnamesi'yle tuz, tütün ve bazı vergi gelirleri alacaklıları temsil eden Düyûn-ı Umûmiye idaresince toplanıp borç ödemelerine yönlendirildi. Vergi gelirini kimin yönettiği ile paranın kime ödendiği ayırt edicidir. Kurum yerli sanayiyi geliştirmek veya çiftçiye kredi vermek için kurulmadı.",
  alt: "Üstte üç gelir kutusu: Tuz, Tütün, Bazı vergiler. Üçünden oklar ortadaki 'Düyûn-ı Umûmiye, alacaklıları temsil eden idare' kutusuna, oradan 'Borç ödemeleri' kutusuna iniyor. Kutular seçilebilir.",
  foot: "Mali denetim ile askerî işgal aynı araç değildir.",
  extra: pad(v(-0.1, 4.0), v(12.1, -1.6)),
});

const schools = boardFig(
  [
    { name: "Mühendishane", tag: "mühendis", what: "Mühendislik uzmanlığı yetiştirme amacıyla bağlantılıdır.", tone: "b" },
    { name: "Tıbbiye", tag: "hekim", what: "Hekim yetiştirme amacıyla bağlantılıdır.", tone: "c" },
    { name: "Harbiye", tag: "subay", what: "Subay yetiştirme amacıyla bağlantılıdır.", tone: "warn" },
    { name: "Mülkiye", tag: "sivil yönetici", what: "Sivil yönetici yetiştirme amacıyla bağlantılıdır.", tone: "a" },
  ],
  2,
  "Mühendishaneler, Tıbbiye, Harbiye ve Mülkiye farklı uzmanlık ihtiyaçlarına yanıt verir: mühendis, hekim, subay ve sivil yönetici. Bu okullar medreselerle ve farklı toplulukların okullarıyla uzun süre yan yana bulundu; eğitimde yenilenme bütün kurumların bir günde tek programa bağlanması değildir.",
  "İki sütunlu dört kutu: Mühendishane (mühendis), Tıbbiye (hekim), Harbiye (subay), Mülkiye (sivil yönetici). Kutular seçilebilir.",
  "Hastaneler, Darülaceze ve emeklilik sandıkları sosyal hizmet alanını genişletti; vakıf geleneği daha önce de vardı.",
  5.6,
);

const purposes = boardFig(
  [
    { name: "Ziraat Bankası", tag: "tarım kredisi", what: "Memleket Sandıkları ve daha sonra Ziraat Bankası tarımsal kredi ve üreticinin finansman ihtiyacına yöneliktir.", tone: "c" },
    { name: "Sanayi mektebi", tag: "yetişmiş iş gücü", what: "Yetişmiş iş gücü sorununa yönelir; borç tahsili veya askerî cephe yönetimi yapmaz.", tone: "b" },
    { name: "Düyûn-ı Umûmiye", tag: "borç ödemesi", what: "Belirli gelirleri toplayıp borç ödemelerine yönlendirir; sanayi veya ucuz kredi amacı taşımaz.", tone: "warn" },
    { name: "Teşvik-i Sanayi", tag: "1913 · yerli girişim", what: "Millî iktisat bağlamında yerli sermayeyi ve girişimciliği güçlendirme düzenlemesi.", tone: "a" },
  ],
  2,
  "Yakın seçeneklerde kurumu amacıyla eşleştir: Memleket Sandıkları ve Ziraat Bankası tarım kredisi, sanayi mektebi yetişmiş iş gücü, Düyûn-ı Umûmiye borç ödemesi, 1913 Teşvik-i Sanayi yerli girişim. Bir kurumun adında 'millî' geçmesi hangi somut aracı kullandığını tek başına açıklamaz.",
  "İki sütunlu dört kutu: Ziraat Bankası (tarım kredisi), Sanayi mektebi (yetişmiş iş gücü), Düyûn-ı Umûmiye (borç ödemesi), Teşvik-i Sanayi (1913, yerli girişim). Kutular seçilebilir.",
  "Başarı için hedef değil üretim, gelir ve uygulama kanıtı gerekir.",
  5.6,
);

/* ---------------- Klasik çağda Osmanlı toplum düzeni ---------------- */

const AXES = ["dinî aidiyet", "görev-vergi", "meslek", "yaşanılan yer"];
const PEOPLE: { name: string; vals: string[] }[] = [
  { name: "Terzi 1", vals: ["Müslüman", "reaya", "terzi", "şehirli"] },
  { name: "Terzi 2", vals: ["gayrimüslim", "reaya", "terzi", "şehirli"] },
  { name: "Kadı", vals: ["Müslüman", "askerî", "kadılık", "şehirli"] },
];
const axesFig: FigureDef = {
  caption:
    "Dinî aidiyet, görev-vergi statüsü, meslek ve yaşanılan yer ayrı sınıflandırma eksenleridir. Yalnız dinî aidiyeti değişen iki terzide meslek ve görev statüsü aynı kalır; kadıya geçince değişen inanç değil görevdir: kadı askerî sınıftandır, çünkü askerî sınıf hukuk, eğitim ve bürokrasi görevlilerini de kapsar.",
  alt: "Tablo: satırlar dört eksen (dinî aidiyet, görev-vergi, meslek, yaşanılan yer), sütunlar Terzi 1, Terzi 2, Kadı. Terzi 1: Müslüman, reaya, terzi, şehirli. Terzi 2: gayrimüslim, reaya, terzi, şehirli. Kadı: Müslüman, askerî, kadılık, şehirli. Adımlarla önceki sütundan değişen hücre vurgulanır.",
  steps: ["Terzi 1", "Terzi 2: inanç değişti", "Kadı: görev değişti"],
  draw: (_v, step) => {
    const body = AXES.map((a, r) => [a, ...PEOPLE.map((p, c) => (c <= step ? p.vals[r] : "?"))]);
    const changed = (r: number, c: number) => c >= 2 && c - 1 === step && step > 0 && PEOPLE[c - 1].vals[r] !== PEOPLE[c - 2].vals[r];
    const els: El[] = [...table(["eksen", ...PEOPLE.map((p) => p.name)], body, [3.3, 2.9, 2.9, 2.9], { top: 4.5, rowH: 0.9, tone: (r, c) => (c === 0 ? "muted" : undefined), on: (r, c) => changed(r, c) }), ...pad(v(-0.1, 4.7), v(12.1, -0.1))];
    const msg = ["Bir kişi aynı anda Müslüman, terzi, reaya ve şehirli olabilir.", "Yalnız dinî aidiyet değişti; meslek ve görev statüsü aynı kaldı.", "Değişen görev-vergi statüsüdür: kadı askerî sınıftandır; askerî sınıf yalnız savaşçı değildir."][step];
    return { els, readout: [msg, "Reaya yalnız Müslüman köylüler değildir; şehirli esnaf ve farklı dinlerden insanlar da reayadandır."] };
  },
};

const TIMAR: FlowNode[] = [
  { c: v(6, 2.5), w: 4.4, s: "Mirî arazi", tone: "muted", h: 1.0 },
  { c: v(6, 4.6), w: 3.6, s: "Devlet", tone: "b", what: "Mülkiyet devlete aittir (çıplak mülkiyet)." },
  { c: v(1.9, 0.2), w: 3.6, s: "Köylü", tone: "c", what: "Kullanım köylüdedir; ekip biçmesi tam özel mülkiyet kazandırmaz. Haklı neden olmadan toprağı boş bırakmak çiftbozan yükümlülüğüyle ilişkilendirilebilirdi." },
  { c: v(10.0, 0.2), w: 4.0, h: 1.25, s: "Sipahi · hizmet karşılığı", tone: "warn", what: "Belirli vergi gelirini hizmet ve asker yetiştirme yükümlülüğü karşılığında alır; toprağı serbestçe satamaz." },
];
const timar = flowPickFig({
  nodes: TIMAR,
  edges: [
    { a: 1, b: 0, s: "mülkiyet", at: "e" },
    { a: 2, b: 0 },
    { a: 3, b: 0 },
  ],
  caption:
    "Tımar örneğinde üç aktör aynı mirî araziyle farklı ilişki kurar: mülkiyet devlette, kullanım köylüde, belirli vergi geliri hizmet ve asker yetiştirme karşılığında sipahidedir. Bu üç hak aynı kişide olmak zorunda değildir; sipahinin gelir alması toprağı satabileceğini göstermez. Rol ayrımı sipahiyi her senyörle özdeşleştirmeyi engeller.",
  alt: "Ortada 'Mirî arazi' kutusu. Üstte Devlet ('mülkiyet' oku), sol altta Köylü ('kullanım' oku), sağ altta 'Sipahi, hizmet karşılığı' ('vergi geliri' oku) araziye bağlı. Aktör kutuları seçilebilir.",
  foot: "Çift-hane üretim birimini, tımar vergi gelirinin hizmet karşılığı tahsisini açıklar.",
  extra: [txt(v(2.9, 1.8), "kullanım", "c", { small: true, tone: "a" }), txt(v(9.1, 1.8), "vergi geliri", "c", { small: true, tone: "a" }), ...pad(v(-0.1, 5.4), v(12.1, -0.7))],
});

const WAQF: FlowNode[] = [
  { c: v(2.2, 4.0), w: 4.0, s: "Vakfeden", tone: "b", what: "Kurucudur; ölümü vakfı kendiliğinden sona erdirmez. Hanedan üyeleri, görevliler ve başka kişiler vakıf kurabiliyordu." },
  { c: v(9.8, 4.0), w: 4.0, s: "Vakfiye", tone: "muted", what: "Amacı, malı, işleyiş şartlarını ve yönetimi belirleyen belgedir." },
  { c: v(2.2, 1.9), w: 4.0, s: "Mal: dükkân", tone: "c", what: "Gelir üreten mal; örneğin bir dükkân." },
  { c: v(6, 1.9), w: 3.0, s: "Gelir: kira", tone: "c", what: "Dükkânın kirası hizmetin giderlerine ayrılır." },
  { c: v(9.8, 1.9), w: 4.0, s: "Hizmet", tone: "a", what: "Medrese, imaret, şifahane, çeşme veya köprünün giderleri." },
  { c: v(9.8, -0.1), w: 4.0, s: "Mütevelli", tone: "warn", what: "Vakfın yöneticisidir; kurucu değildir." },
];
const waqf = flowPickFig({
  nodes: WAQF,
  edges: [
    { a: 0, b: 2, s: "tahsis", at: "e" },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 1, b: 4, dash: true, s: "şartlar", at: "e" },
    { a: 5, b: 4, dash: true, s: "yönetir", at: "e" },
  ],
  caption:
    "Vakıfta zincir maldan gelire, gelirden hizmete gider: vakfeden bir malı (ör. dükkân) tahsis eder, kirası medrese, imaret, şifahane, çeşme veya köprünün giderine ayrılır. Vakfiye amacı ve şartları belirleyen belge, mütevelli yönetici, vakfeden kurucudur. Kurum, belge, yönetici ve mal aynı şey değildir.",
  alt: "Sol üstte Vakfeden, 'tahsis' okuyla altındaki 'Mal: dükkân' kutusuna; oradan 'Gelir: kira' ve 'Hizmet' kutularına oklar. Sağ üstte Vakfiye ('şartlar' kesik oku) ve sağ altta Mütevelli ('yönetir' kesik oku) Hizmet kutusuna bağlı. Kutular seçilebilir.",
  foot: "Kurucunun ölümü vakfı sona erdirmez; süreklilik için gelir ve hukuki düzen kurulmuştur.",
  extra: pad(v(-0.1, 4.8), v(12.1, -0.9)),
});

/* ---------------- Değişen dünya dengeleri ---------------- */

const KAZ: Tone = "c";
const KAY: Tone = "warn";
const STA: Tone = "b";
const BALANCE: Ev[] = [
  { y: 1596, s: "Haçova", what: "III. Mehmet'in katıldığı muharebe Osmanlı zaferidir; savaş yıllarca sürdü.", tone: KAZ },
  { y: 1606, s: "Zitvatorok", what: "Habsburg hükümdarı protokolde Osmanlı padişahına denk kabul edildi: statü değişimi, toprak kaybı değil.", tone: STA },
  { y: 1639, s: "Kasr-ı Şirin", what: "Doğu sınırının ana çerçevesini belirleyen düzenleme.", tone: STA },
  { y: 1669, s: "Girit", what: "Venedik'le uzun mücadele adanın fethiyle sonuçlandı.", tone: KAZ },
  { y: 1672, s: "Bucaş", what: "Batıdaki önemli kazanımlardan biri, özellikle Podolya.", tone: KAZ },
  { y: 1683, s: "II. Viyana", what: "Kuşatma başarısız oldu; ardından Kutsal İttifak savaşları.", tone: KAY },
  { y: 1699, s: "Karlofça", what: "Avusturya, Lehistan ve Venedik karşısında büyük toprak kayıpları.", tone: KAY },
  { y: 1700, s: "İstanbul", what: "Rusya'yla ayrı barış; Azak Rusya'ya bırakıldı.", tone: KAY },
  { y: 1711, s: "Prut", what: "Azak'ın geri alınması Osmanlı açısından kazanımdı.", tone: KAZ },
  { y: 1718, s: "Pasarofça", what: "Mora Osmanlı'da kaldı, Avusturya karşısında kayıplar da var: farklı yönlü sonuçlar.", tone: STA },
  { y: 1739, s: "Belgrad", what: "Görece elverişli sonuçlar: Belgrad geri alındı, Rusya'nın Karadeniz'deki askerî imkânları sınırlandı.", tone: KAZ },
  { y: 1774, s: "Küçük Kaynarca", what: "Kırım'ın siyasi bağımsızlığı, Rusya'ya ticari haklar ve ağır yükümlülükler.", tone: KAY },
];
const balance = timelineFig({
  events: BALANCE,
  a0: 1590,
  a1: 1780,
  ticks: [1600, 1650, 1700, 1750],
  caption:
    "1595–1774 tek yönlü bir gerileme çizgisi değildir: aynı çizelgede kazanımlar (Haçova, Girit, Bucaş, Prut, Belgrad), kayıplar (II. Viyana, Karlofça, İstanbul, Küçük Kaynarca) ve statü ya da çok yönlü düzenlemeler (Zitvatorok, Kasr-ı Şirin, Pasarofça) karışık sıralanır. Nitelemeler bölüm metnindendir. Komşu iki nokta birbirinin tek nedeni değildir.",
  alt: "Yatay yıl ekseni 1590–1780. On iki satır: 1596 Haçova, 1606 Zitvatorok, 1639 Kasr-ı Şirin, 1669 Girit, 1672 Bucaş, 1683 II. Viyana, 1699 Karlofça, 1700 İstanbul, 1711 Prut, 1718 Pasarofça, 1739 Belgrad, 1774 Küçük Kaynarca. Kazanım, kayıp ve statü ayrı renkte ve anahtarla.",
  foot: "Her antlaşmada sor: toprak mı el değiştirdi, protokol statüsü mü düzenlendi, ticari hak mı tanındı?",
  legend: [
    { code: "+", label: "kazanım", tone: KAZ },
    { code: "−", label: "kayıp veya ağır yük", tone: KAY },
    { code: "=", label: "statü, sınır, çok yönlü", tone: STA },
  ],
});

const evidence = flowStepFig({
  nodes: [
    { c: v(6, 4.4), w: 6.4, s: "Çok cepheli savaş", tone: "b", step: 0 },
    { c: v(6, 2.6), w: 8.0, s: "İnsan, para, ikmal baskısı", tone: "warn", step: 1 },
    { c: v(6, 0.8), w: 8.0, s: "Bazı cephelerde barış arayışı", tone: "c", step: 2 },
    { c: v(6, -1.2), w: 8.8, s: "Safevi–Habsburg ittifakı? · kanıt yok", tone: "muted", step: 3, dash: true, h: 1.25 },
  ],
  edges: [
    { a: 0, b: 1, step: 1 },
    { a: 1, b: 2, step: 2 },
  ],
  steps: [
    { s: "Olay", what: "Osmanlı aynı anda birden çok cephede savaşıyordu." },
    { s: "Ara mekanizma", what: "Çok cepheli savaş insan, para ve ikmal baskısı yaratır." },
    { s: "Sonuç", what: "Bazı cephelerde barış arayışı artar." },
    { s: "Varsayım", what: "'Safeviler Osmanlı'nın Habsburg savaşından yararlandı' fırsat kullanımını gösterir; ortak ordu, sözleşme veya koordinasyon kanıtı olmadan 'ittifak kuruldu' denemez." },
  ],
  caption:
    "Nedensel açıklamada ara mekanizmayı yaz: çok cepheli savaş → insan, para ve ikmal baskısı → bazı cephelerde barış arayışının artması. Son kutu bağlantısızdır: fırsat kullanımı ittifak kanıtı değildir; ortak ordu, sözleşme veya koordinasyon kanıtı gerekir.",
  alt: "Yukarıdan aşağıya üç kutu oklarla bağlı: Çok cepheli savaş → İnsan, para, ikmal baskısı → Bazı cephelerde barış arayışı. Altta oksuz, kesik çerçeveli 'Safevi–Habsburg ittifakı? kanıt yok' kutusu.",
  foot: "Önce gelen her olay sonraki olayın tek nedeni değildir.",
  extra: pad(v(-0.2, 5.2), v(12.2, -2.0)),
});

const ships: FigureDef = {
  caption:
    "Kadırga ağırlıkla kürek gücüyle, kalyon yelkenle hareket eder. Açık deniz, uzun menzil ve ağır top kullanımının önem kazanması kalyonun değerini artırdı; Akdeniz'deki rüzgâr, kıyı ve manevra şartları kadırganın bazı görevlerde kullanılmasını açıklıyordu. Gemi tipi tek başına 'her yerde üstün' etiketi taşımaz.",
  alt: "İki sütunlu tablo: Kadırga ve Kalyon. Satırlar: hareket (kürek / yelken), koşul (kıyı, manevra / açık deniz), öne çıkan (Akdeniz görevleri / uzun menzil, top).",
  draw: () => {
    const body = [
      ["hareket", "kürek", "yelken"],
      ["koşul", "kıyı, manevra", "açık deniz"],
      ["öne çıkan", "Akdeniz görevleri", "uzun menzil, top"],
    ];
    const els: El[] = [...table(["", "kadırga", "kalyon"], body, [2.8, 4.6, 4.6], { top: 3.6, rowH: 0.9, tone: (_r, c) => (c === 1 ? "b" : c === 2 ? "c" : "muted") }), ...pad(v(-0.1, 3.8), v(12.1, -0.1))];
    return { els, readout: ["Görev ve çevre koşulları teknik tercihi belirler.", "Denizcilik yalnız gövde değil; eğitimli personel, top, tersane, mali kaynak ve taktik bilgisidir."] };
  },
};

export const historyFigures061TytOttoman: Record<string, Record<string, FigureDef>> = {
  "degisim-caginda-avrupa-osmanli": {
    "Askerî dönüşüm ve nakit gelir arayışı": fiscal,
    "Celâli, suhte ve yeniçeri hareketlerini ayır": revolts,
    "Lâle Devri: seçici bilgi aktarımı ve kültür": tulip,
  },
  "degisen-sosyoekonomik-hayat": {
    "1854 borçlanma: gelir değil yükümlülük": debt,
    "1881 Düyûn-ı Umûmiye: hangi gelir kimin elinde?": duyun,
    "Okul ve sosyal hizmetlerin yeni örgütlenmesi": schools,
    "Tarım kredisi, yerli girişim ve millî iktisat": purposes,
  },
  "klasik-cag-osmanli-toplum-duzeni": {
    "Bir kişi toplumda birden çok ilişkiye katılır": axesFig,
    "Tımar: gelir karşılığında hizmet": timar,
    "Vakıf: maldan gelire, gelirden hizmete": waqf,
  },
  "degisen-dunya-dengeleri-osmanli": {
    "1595–1774: tek yönlü bir gerileme çizgisi değil": balance,
    "Kanıtı nedensellikten ve varsayımdan ayır": evidence,
    "Kadırga, kalyon ve deniz rekabeti": ships,
  },
};
