import { txt, v, vec, type FigureDef } from "./figureKit";
import { boardFig, rectEl, stepsFig, timelineFig, type Ev } from "./historyFigures059Kit";
import { flowPickFig, flowStepFig, type FlowEdge, type FlowNode } from "./historyFigures061TytKit";
import { pad } from "./biologyFigures059Kit";

/*
 * TYT Tarih · Küresel savaşlar arasında Türkiye ve dünya; II. Dünya Savaşı ve
 * sonrası (Forge061). Yıllar, adlar ve bağlantı cümleleri yalnız ilgili bölüm
 * metinlerinden alınmıştır; tarafların gerekçeleri olay tanımı yerine
 * konmaz, değerlendirme eklenmez.
 */

/* ---------------- Küresel savaşlar arasında ---------------- */

const INTERWAR: Ev[] = [
  { y: 1917, s: "Rusya devrimleri", what: "Çarlık yıkıldı; geçici hükûmetin ardından Bolşevikler iktidarı aldı. Olay türü: devrim.", tone: "warn" },
  { y: 1920, s: "Milletler Cemiyeti", what: "Barış ve ortak güvenlik amacıyla faaliyete başladı; merkezi Cenevre. Olay türü: kurum.", tone: "c" },
  { y: 1925, s: "Locarno", what: "Almanya ile komşuları arasında güvenlik ve uzlaşma arayışı. Olay türü: belge.", tone: "b" },
  { y: 1928, s: "Briand-Kellogg", what: "Savaşın ulusal politika aracı olarak reddi taahhüdü; taahhüt etkili yaptırım değildir. Olay türü: belge.", tone: "b" },
  { y: 1929, s: "Ekonomik kriz", what: "New York Borsasındaki çöküş görünür işaretlerden biriydi. Olay türü: kriz.", tone: "warn" },
  { y: 1930, y1: 1939, s: "Yayılmacılık", what: "1930'ların yayılmacılığı uluslararası güvenlik düzenini zorladı. Olay türü: süreç.", tone: "a" },
];
const interwarLine = timelineFig({
  events: INTERWAR,
  a0: 1915,
  a1: 1940,
  ticks: [1915, 1920, 1925, 1930, 1935, 1940],
  caption:
    "1917 Rusya devrimleri, 1920 Milletler Cemiyeti, 1925 Locarno, 1928 Briand-Kellogg, 1929 ekonomik kriz ve 1930'ların yayılmacılığı aynı zaman çizgisinde ama farklı olay türleridir: devrim, kurum, belge, kriz ve süreç. Çizgide yan yana durmak, birinin ötekinin tek nedeni olduğunu göstermez.",
  alt: "Yatay yıl ekseni 1915–1940. Yukarıdan aşağıya altı satır: 1917 Rusya devrimleri, 1920 Milletler Cemiyeti, 1925 Locarno, 1928 Briand-Kellogg, 1929 ekonomik kriz noktaları ve 1930–1939 yayılmacılık çubuğu.",
  foot: "Tür ayrımı: kurum kurulması, belge imzası ve kriz aynı açıklama düzeyinde değildir.",
  legend: [
    { code: "D", label: "devrim ve kriz", tone: "warn" },
    { code: "K", label: "kurum", tone: "c" },
    { code: "B", label: "belge", tone: "b" },
    { code: "S", label: "süreç (çubuk)", tone: "a" },
  ],
});

const CRISIS_NODES: FlowNode[] = [
  { c: v(6, 5.2), w: 6.4, s: "1929 borsa çöküşü · görünür işaret", tone: "warn", step: 0, h: 1.2 },
  { c: v(2.2, 3.2), w: 3.6, s: "Banka kaybı", step: 1 },
  { c: v(9.8, 3.2), w: 3.6, s: "Kredi azalır", step: 1 },
  { c: v(9.8, 1.0), w: 3.6, s: "Üretim kısılır", step: 2 },
  { c: v(2.2, 1.0), w: 3.6, s: "İşsizlik artar", step: 3 },
  { c: v(6, -0.9), w: 3.6, s: "Tüketim azalır", step: 4 },
];
const CRISIS_EDGES: FlowEdge[] = [
  { a: 0, b: 1, step: 1 },
  { a: 1, b: 2, step: 1 },
  { a: 2, b: 3, step: 2 },
  { a: 3, b: 4, step: 3 },
  { a: 4, b: 5, step: 4 },
  { a: 5, b: 3, step: 5, s: "besler", at: "e" },
];
const crisisLoop = flowStepFig({
  nodes: CRISIS_NODES,
  edges: CRISIS_EDGES,
  steps: [
    { s: "Görünür tetikleyici", what: "1929'da New York Borsasındaki çöküş finansal krizin görünür işaretlerinden biriydi; krediyle büyüyen alımlar, spekülasyon, banka kırılganlıkları ve üretim-talep dengesizlikleri daha geniş yapının parçalarıydı." },
    { s: "Banka → kredi", what: "Bir banka kayıp yaşayınca kredi vermeyi azaltır." },
    { s: "Kredi → üretim", what: "Kredi daralınca işletmeler yatırım ve üretimi kısabilir." },
    { s: "Üretim → işsizlik", what: "Üretimin kısılması işsizliği artırabilir." },
    { s: "İşsizlik → tüketim", what: "İşsizlik artışı tüketimi daha da azaltabilir." },
    { s: "Döngü", what: "Azalan tüketim üretimi yeniden baskılar; süreç birbirini besler." },
  ],
  caption:
    "1929 bunalımında görünür tetikleyici ile yayılma mekanizmasını ayır: banka kaybı kredi daralmasına, kredi daralması üretimin kısılmasına, bu da işsizliğe ve azalan tüketime yol açabilir; azalan tüketim üretimi yeniden baskılar. Her ok bir mekanizmadır; okların hepsi 'olabilir' bağlarıdır, kesin tek yönlü yasa değildir.",
  alt: "Üstte '1929 borsa çöküşü, görünür işaret' kutusu. Altında döngü: Banka kaybı → Kredi azalır → Üretim kısılır → İşsizlik artar → Tüketim azalır; son kutudan 'besler' oku Üretim kısılır kutusuna döner. Adımlarla oklar sırayla açılır.",
  foot: "İki göstergenin birlikte düşmesi tek başına tek yönlü ve tek nedenli bağ kurmaya yetmez.",
  extra: pad(v(-0.2, 6.1), v(12.2, -1.6)),
});

const SOURCES = boardFig(
  [
    { name: "Antlaşma", tag: "niyet · yükümlülük", what: "Bir antlaşma niyet ve yükümlülük hakkında bilgi verir; imzalanması barışın sağlandığını kanıtlamaz.", tone: "b" },
    { name: "Veri tablosu", tag: "ölçülen · ekonomik durum", what: "İşsizlik tablosu ölçülen ekonomik durumu gösterir; nedenini tek başına söylemez.", tone: "c" },
    { name: "Propaganda", tag: "ikna amaçlı · söylem", what: "Propaganda konuşması ikna amacı taşıyan söylemdir; liderin söylemesi hedefin gerçekleştiğini göstermez.", tone: "warn" },
  ],
  3,
  "Kaynak türü neyi gösterebildiğini sınırlar: antlaşma niyet ve yükümlülüğü, veri tablosu ölçülen ekonomik durumu, propaganda konuşması ikna amaçlı söylemi gösterir. Hepsini aynı kanıt türü sayarsan örgüt kurulduğu için barışın sağlandığını veya bir lider öyle dediği için hedefin gerçekleştiğini sanabilirsin.",
  "Yan yana üç kutu: Antlaşma (niyet, yükümlülük), Veri tablosu (ölçülen ekonomik durum), Propaganda (ikna amaçlı söylem). Her kutu seçilebilir.",
  "Karşılaştırma sırası: 1920 Cemiyet, 1928 savaşın reddi, 1929 kriz, 1933 Almanya'da iktidar, 1945 Birleşmiş Milletler.",
  4.1,
);

/* ---------------- II. Dünya Savaşı ---------------- */

const CAUSE_NODES: FlowNode[] = [
  { c: v(3.05, 4.4), w: 5.5, s: "Versay tartışması", tone: "b", what: "Versay düzeninin tartışılması savaşın geniş bağlamındadır." },
  { c: v(8.95, 4.4), w: 5.5, s: "Yayılmacı rejimler", tone: "b", what: "Yayılmacı rejimler savaşın geniş bağlamındadır." },
  { c: v(3.05, 3.2), w: 5.5, s: "Ekonomik bunalım", tone: "b", what: "Ekonomik bunalım savaşın geniş bağlamındadır." },
  { c: v(8.95, 3.2), w: 5.5, s: "Zayıf ortak güvenlik", tone: "b", what: "Ortak güvenliğin zayıflığı savaşın geniş bağlamındadır." },
  { c: v(6, 0.9), w: 7.4, s: "1 Eylül 1939 · Polonya'nın işgali", tone: "warn", h: 1.25, what: "Almanya'nın Polonya'yı işgali Avrupa'da savaşın başlamasındaki yakın tetikleyicidir." },
  { c: v(6, -1.1), w: 7.4, s: "3 Eylül 1939 · savaş ilanı", tone: "c", h: 1.25, what: "İngiltere ve Fransa Almanya'ya savaş ilan etti." },
];
const causes = flowPickFig({
  nodes: CAUSE_NODES,
  edges: [{ a: 4, b: 5 }],
  caption:
    "Çerçevedeki dört kutu geniş bağlamdır (uzun neden): Versay düzeninin tartışılması, yayılmacı rejimler, ekonomik bunalım, ortak güvenliğin zayıflığı. 1 Eylül 1939'da Almanya'nın Polonya'yı işgali yakın tetikleyicidir; 3 Eylül'de İngiltere ve Fransa savaş ilan etti. Bağlam ile kesin tarihli başlangıç olayı aynı açıklama düzeyinde değildir.",
  alt: "Üstte 'geniş bağlam' çerçevesi içinde dört kutu: Versay tartışması, Yayılmacı rejimler, Ekonomik bunalım, Zayıf ortak güvenlik. Çerçeveden kesik okla '1 Eylül 1939 Polonya'nın işgali' kutusuna, oradan düz okla '3 Eylül 1939 savaş ilanı' kutusuna iniliyor.",
  foot: "Kesik ok: bağlam; düz ok: tarihli olaydan doğrudan sonraki adım.",
  extra: [
    rectEl(0, 2.5, 12, 5.1, { tone: "muted", thin: true, dash: true }),
    txt(v(0.1, 5.25), "geniş bağlam", "ne", { small: true, tone: "muted" }),
    vec(v(6, 2.4), v(6, 1.65), { tone: "ink", thin: true, dash: true }),
    ...pad(v(-0.2, 6.0), v(12.2, -2.0)),
  ],
});

const turning = stepsFig({
  items: [
    { s: "1942–1943 Stalingrad", what: "Mihver aleyhine dönüm noktalarından biri." },
    { s: "Kuzey Afrika başarıları", what: "Kuzey Afrika'daki Müttefik başarıları Mihver aleyhine dönüm noktalarından biri." },
    { s: "1943 İtalya çıkarmaları", what: "Mihver aleyhine dönüm noktalarından biri." },
    { s: "6 Haziran 1944 Normandiya", what: "Batı Avrupa'da yeni bir cephe açtı; bir muharebe bütün savaşın bitişi değildir." },
    { s: "Mayıs 1945 Almanya teslim", what: "Avrupa'daki savaş sona erdi; Asya-Pasifik'te çatışma sürdü.", tone: "b" },
    { s: "Ağustos 1945 son aşama", what: "Hiroşima ve Nagasaki'ye atom bombaları atıldı; Sovyetler Japonya'ya karşı savaşa girdi." },
    { s: "Eylül 1945 Japonya teslim", what: "Savaşın küresel bitişi.", tone: "b" },
  ],
  caption:
    "1945'in iki bitişi vardır: Mayıs 1945'te Almanya'nın teslimiyle Avrupa'daki savaş, Eylül 1945'te Japonya'nın teslimiyle küresel savaş sona erdi. Öncesinde 1942–1943 Stalingrad, Kuzey Afrika, 1943 İtalya ve 6 Haziran 1944 Normandiya dönüm noktalarıdır; tek muharebe bütün savaşın bitişi değildir.",
  alt: "Yukarıdan aşağıya yedi kutu: 1942–1943 Stalingrad, Kuzey Afrika başarıları, 1943 İtalya çıkarmaları, 6 Haziran 1944 Normandiya, Mayıs 1945 Almanya teslim, Ağustos 1945 son aşama, Eylül 1945 Japonya teslim. İki teslim kutusu ayrı renkte.",
  foot: "Avrupa'da bitiş Mayıs 1945, küresel bitiş Eylül 1945.",
  w: 7.4,
});

const unSteps = stepsFig({
  items: [
    { s: "1941 Atlantik Bildirisi", what: "Savaş sonrasına ilişkin ilke adımı." },
    { s: "1942 BM Bildirisi", what: "1942 Birleşmiş Milletler Bildirisi: iş birliği adımı." },
    { s: "1945 San Francisco", what: "Birleşmiş Milletler Şartı hazırlandı." },
    { s: "24 Ekim 1945 yürürlük", what: "Örgüt yürürlüğe giren Şart'la resmen kuruldu.", tone: "b" },
  ],
  caption:
    "Bildiri, konferans, imza ve yürürlük aynı işlem değildir: 1941 Atlantik Bildirisi ve 1942 Birleşmiş Milletler Bildirisi ilke ve iş birliği adımlarıydı; 1945 San Francisco Konferansı'nda Şart hazırlandı; örgüt 24 Ekim 1945'te yürürlüğe giren Şart'la resmen kuruldu.",
  alt: "Yukarıdan aşağıya dört kutu: 1941 Atlantik Bildirisi, 1942 BM Bildirisi, 1945 San Francisco, 24 Ekim 1945 yürürlük.",
  foot: "Güvenlik Konseyi'nde beş daimi üye: ABD, SSCB, İngiltere, Fransa, Çin; veto bu konseyin karar usulüyle ilgilidir.",
  w: 7.4,
});

const WAR_ECON: FlowNode[] = [
  { c: v(6, 4.2), w: 7.6, s: "Fiilî çatışmaya katılmamak", tone: "b" },
  { c: v(2.4, 2.3), w: 4.4, s: "Seferberlik", what: "Üretken nüfusu ve bütçeyi etkiledi." },
  { c: v(9.6, 2.3), w: 4.4, s: "İthalat güçlüğü", what: "Mal darlığı ve fiyat baskısı yaşandı." },
  { c: v(2.4, 0.4), w: 4.4, s: "1940 Kanun", tone: "a", what: "Millî Korunma Kanunu devletin üretim, tüketim ve fiyat alanındaki müdahale imkânlarını genişletti; kanun çıkarmak üretimin kesin arttığı anlamına gelmez." },
  { c: v(9.6, 0.4), w: 4.4, s: "1942 karne", tone: "a", what: "Ekmek karnesi temel ihtiyaçların paylaştırılmasıyla ilgilidir; karne, vergi ve fabrika yatırımı aynı araç değildir." },
];
const warEconomy = flowPickFig({
    nodes: WAR_ECON,
    edges: [
      { a: 0, b: 1, dash: true },
      { a: 0, b: 2, dash: true },
      { a: 1, b: 3 },
      { a: 2, b: 4 },
    ],
    caption:
      "Fiilî çatışmaya katılmamak savaş ekonomisinden etkilenmemek demek değildir: seferberlik üretken nüfusu ve bütçeyi, ithalat güçlükleri mal darlığı ve fiyat baskısını getirdi. 1940 Millî Korunma Kanunu müdahale imkânını genişletti, 1942 ekmek karnesi temel ihtiyaçları paylaştırdı. Kanun ve karne farklı araçlardır.",
    alt: "Üstte 'Fiilî çatışmaya katılmamak' kutusu; kesik oklarla iki kutuya iniyor: Seferberlik ve İthalat güçlüğü. Bunların altında araçlar: 1940 Kanun ve 1942 karne. Kutular seçilebilir.",
    foot: "Nominal ücret sabitken fiyatlar yükselirse gerçek alım gücü düşer.",
    extra: pad(v(-0.1, 5.0), v(12.1, -0.4)),
});

export const historyFigures061TytWorld: Record<string, Record<string, FigureDef>> = {
  "kuresel-savaslar-arasinda-turkiye-dunya": {
    "1919’dan 1939’a: barış yalnız imza değildir": interwarLine,
    "1929 bunalımı: görünür tetikleyici ve yapı": crisisLoop,
    "Kaynak okuma: niyet, veri ve sonuç": SOURCES,
  },
  "ikinci-dunya-savasi-sonrasi": {
    "Uzun neden ile savaşı başlatan olayı ayır": causes,
    "Dönüm noktaları ve 1945’in iki bitişi": turning,
    "Birleşmiş Milletler:1941’den 1945’e": unSteps,
    "Savaşın ekonomi üzerindeki yükü": warEconomy,
  },
};

