import { seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { boardFig, node, rectEl, stepsFig, timelineFig, type Ev } from "./historyFigures059Kit";
import { table } from "./biologyFigures059TytKit";

/*
 * TYT Tarih · Denge stratejisi, devrimler çağı, XX. yüzyıl başları ve iki
 * savaş arası Türkiye (Forge059). Yıllar, adlar ve sonuç cümleleri ilgili
 * bölüm metinlerinden alınmıştır; yorum ve taraf tutma eklenmez. Bir sonraki
 * aşamaya geçen kronolojilerde köprü adımı ayrıca etiketlenir.
 */

/* ---------------- Denge stratejisi ---------------- */

const crimea = stepsFig({
  items: [
    { s: "1774 Küçük Kaynarca", what: "Kırım'ın siyasi bağımsızlığı kabul edildi." },
    { s: "1783 Rusya'nın ilhakı", what: "Rusya Kırım'ı ilhak etti; statüde yeni bir aşama." },
    { s: "1792 Yaş Antlaşması", what: "Osmanlı ilhakı tanıdı. Avusturya'yla 1791 Ziştovi ayrı bir antlaşmadır." },
  ],
  caption: "Kırım'ın statüsü tek olay değil, aşamalardır: 1774 Küçük Kaynarca'da siyasi bağımsızlık, 1783'te Rusya'nın ilhakı, 1792 Yaş'ta Osmanlı'nın bu ilhakı tanıması. Bağımsızlık, ilhak ve tanınma ayrı adımlardır.",
  alt: "Yukarıdan aşağıya üç kutu: 1774 Küçük Kaynarca, 1783 Rusya'nın ilhakı, 1792 Yaş Antlaşması. Adımlarla sırayla etkinleşir.",
  foot: "1791 Ziştovi (Avusturya) ile 1792 Yaş (Rusya) ayrı antlaşmalardır.",
});

const STAT_ROWS: [string, string][] = [
  ["1804 isyan", "1821 hareket"],
  ["1812 Bükreş: ayrıcalık", "1827 Navarin"],
  ["1829 Edirne: özerklik", "1829 Edirne"],
  ["1878 Berlin: bağımsızlık", "1830 Londra Protokolü"],
];
const statusLanes: FigureDef = {
  caption:
    "Statüyü basamaklandır: Sırp hareketinde 1804 isyan, 1812 Bükreş ayrıcalıkları, 1829 Edirne özerkliği, 1878 Berlin bağımsızlığı; Yunan hareketinde 1821, 1827 Navarin (İngiliz, Fransız ve Rus donanmaları Osmanlı-Mısır donanmasını imha etti), 1829 Edirne ve 1830 Londra Protokolü. 1829/1830 iki çelişen tarih değil, ayrı diplomatik aşamalardır.",
  alt: "İki sütunlu tablo, her sütunda yukarıdan aşağıya dört aşama. Sırp: 1804 isyan, 1812 Bükreş ayrıcalık, 1829 Edirne özerklik, 1878 Berlin bağımsızlık. Yunan: 1821 hareket, 1827 Navarin, 1829 Edirne, 1830 Londra Protokolü. Son satır bağımsızlık aşamasıdır.",
  draw: () => {
    const els: El[] = [...table(["Sırp", "Yunan"], STAT_ROWS.map((r) => [...r]), [5.9, 5.9], { top: 4.5, rowH: 0.9, tone: (r, c) => (r === 3 ? "a" : c === 0 ? "c" : "b") }), txt(v(-0.1, 4.7), " ", "c"), txt(v(11.9, -0.1), " ", "c")];
    return { els, readout: ["Ayrıcalık, özerklik ve bağımsızlık ayrı statü basamaklarıdır.", "Sırp bağımsızlığı 1878 Berlin'de, Yunan bağımsızlığının uluslararası kesinleşmesi 1830 Londra Protokolü'yle."] };
  },
};

const egypt = stepsFig({
  items: [
    { s: "Mehmet Ali Paşa tehdidi", what: "II. Mahmut Rusya'dan destek istedi." },
    { s: "1833 Hünkâr İskelesi", what: "Rusya ile antlaşma; bu tehditle ilişkilidir. Kütahya düzenlemesi ayrı bir aşamadır." },
    { s: "1839 Nizip yenilgisi", what: "Kriz yeniden büyüdü." },
    { s: "1840 Londra (Mısır)", what: "Mehmet Ali Paşa ailesinin Mısır valiliği ve Osmanlı egemenliği çerçevesinde çözüm arandı." },
    { s: "1841 Londra Boğazlar Sözleşmesi", what: "Osmanlı barış hâlindeyken Boğazların yabancı savaş gemilerine kapalılığı çok taraflı güvenceye bağlandı." },
  ],
  caption: "Mısır krizi aşamaları: 1833 Hünkâr İskelesi, 1839 Nizip, 1840 Londra çözümü (Mısır sorunu), 1841 Londra Boğazlar Sözleşmesi (Boğazların statüsü). İki Londra aynı belge değildir: biri Mısır, öteki Boğazlarla ilgilidir.",
  alt: "Yukarıdan aşağıya beş kutu: Mehmet Ali Paşa tehdidi, 1833 Hünkâr İskelesi, 1839 Nizip, 1840 Londra, 1841 Londra Boğazlar Sözleşmesi.",
  foot: "Aynı şehir adı, farklı konu: 1840 Mısır, 1841 Boğazlar.",
  w: 7.2,
});

const roles: FigureDef = {
  caption:
    "Denge stratejisinde aynı devlet farklı dönemlerde farklı rol üstlenebilir: Fransa 1798'de Mısır'ı işgal ederek tehdit, 1854'te İngiltere ile Rusya'ya karşı savaşa girerek destek; Rusya 1833'te yardım eden, 1853'te savaştığı taraf. Tehdidi, desteği ve bedeli birlikte oku.",
  alt: "İki satırlı tablo: devlet, tehdit olduğu yıl, destek olduğu yıl. Fransa: tehdit 1798 Mısır işgali, destek 1854. Rusya: destek 1833, tehdit 1853.",
  draw: () => {
    const body = [
      ["Fransa", "1798 Mısır işgali", "1854 savaşa girdi"],
      ["Rusya", "1853 savaş", "1833 yardım"],
    ];
    const els: El[] = [...table(["devlet", "tehdit", "destek"], body, [2.6, 4.6, 4.6], { top: 2.8, rowH: 0.95, tone: (_r, c) => (c === 1 ? "warn" : c === 2 ? "c" : undefined) }), txt(v(-0.1, 3.0), " ", "c"), txt(v(12.3, -0.1), " ", "c")];
    return { els, readout: ["1798'i yalnız 'Fransa eskiden dosttu, şimdi değil' diye ezberleme.", "Destek bedel taşıyabilir: 1854'te başlayan dış borçlanma mali bağımlılıkla ilişkilidir."] };
  },
};

/* ---------------- Devrimler çağı ---------------- */

const REFORM: Ev[] = [
  { y: 1789, s: "Fransız İhtilali", what: "Mali krizden egemenlik tartışmasına.", tone: "b" },
  { y: 1807, s: "Kabakçı Mustafa İsyanı", what: "Nizam-ı Cedit girişimini kesintiye uğrattı.", tone: "c" },
  { y: 1808, s: "Sened-i İttifak", what: "Merkezle bazı ayanlar arasında siyasal uzlaşma; anayasa değildir.", tone: "c" },
  { y: 1826, s: "Yeniçeri Ocağı kaldırıldı", what: "Asakir-i Mansure-i Muhammediye kuruldu.", tone: "c" },
  { y: 1830, s: "1830 devrimleri", what: "Liberal, ulusal ve sosyal talepler farklı ağırlıklarla birleşti.", tone: "b" },
  { y: 1839, s: "Tanzimat Fermanı", what: "Can, mal ve namus güvenliği; düzenli vergi ve askerlik; kanuna bağlılık.", tone: "c" },
  { y: 1848, s: "1848 devrimleri", what: "Liberal, ulusal ve sosyal talepler farklı ağırlıklarla birleşti.", tone: "b" },
  { y: 1856, s: "Islahat Fermanı", what: "Gayrimüslimlerin hukuki ve toplumsal durumuna ilişkin eşitlik güvenceleri; anayasa değildir.", tone: "c" },
  { y: 1876, s: "Kanun-ı Esasi", what: "İlk Osmanlı anayasası; Meclis-i Umumî: atanan Ayan, seçilen Mebusan.", tone: "c" },
  { y: 1878, s: "Meclisin tatili", what: "Süresiz tatil anayasal yönetimi kesintiye uğrattı.", tone: "c" },
  { y: 1908, s: "II. Meşrutiyet", what: "Anayasal yönetim ve meclis yeniden işler hâle geldi.", tone: "c" },
  { y: 1909, s: "31 Mart, değişiklikler", what: "Ayaklanma Hareket Ordusu'nca bastırıldı; anayasa değişiklikleri padişahın yetkilerini daralttı.", tone: "c" },
  { y: 1913, s: "Babıâli Baskını", what: "Temsil kurumlarının bulunması ile özgür siyasal işleyişin aynı olmadığını gösterir.", tone: "c" },
];
const reformTimeline = timelineFig({
  events: REFORM,
  a0: 1780,
  a1: 1920,
  ticks: [1780, 1820, 1860, 1900],
  caption:
    "Avrupa'daki devrimler (mavi) ile Osmanlı'daki düzenlemeler (yeşil) aynı yıl ekseninde. Reformlar tek ve geri dönüşsüz bir başarı merdiveni değil; kazanım, sınırlılık ve kesintilerle okunur (1878 tatili, 1913 baskını). Bir olaya tıkla.",
  alt: "Yatay eksende 1780–1920; her satırda bir olay: 1789 Fransız İhtilali'nden 1913 Babıâli Baskını'na on üç olay. Avrupa olayları mavi, Osmanlı olayları yeşil nokta.",
  foot: "Ferman, uzlaşma belgesi ve anayasa farklı hukuki türlerdir.",
  legend: [
    { code: "A", label: "Avrupa", tone: "b" },
    { code: "O", label: "Osmanlı", tone: "c" },
  ],
});

const docs = boardFig(
  [
    { name: "Sened-i İttifak", tag: "1808 · uzlaşma belgesi · merkez ve ayan", what: "Merkezle bazı ayanlar arasında siyasal uzlaşma; anayasa değildir.", tone: "muted" },
    { name: "Tanzimat", tag: "1839 · ferman · hukuk güvenliği", what: "Can, mal ve namus güvenliği; düzenli vergi ve askerlik; kanuna bağlılık. Meclis ve genel oy getirmez.", tone: "b" },
    { name: "Islahat", tag: "1856 · ferman · eşitlik güvencesi", what: "Özellikle gayrimüslimlerin hukuki ve toplumsal durumuna ilişkin eşitlik güvencelerini genişletme arayışı; ilk anayasa değildir.", tone: "b" },
    { name: "Kanun-ı Esasi", tag: "1876 · anayasa · Ayan ve Mebusan", what: "İlk Osmanlı anayasası; Ayan padişahça atanır, Mebusan dolaylı seçimle oluşur.", tone: "a" },
  ],
  2,
  "Belgeleri tür ve kapsamla ayır: 1808 Sened-i İttifak merkez ile ayan arasında uzlaşma; 1839 Tanzimat ve 1856 Islahat padişahın fermanları; 1876 Kanun-ı Esasi ilk anayasa ve iki kanatlı meclis. 'Eşitlik' sözcüğünden değil tarih, muhatap ve kurum türünden karar ver. Bir kutuya tıkla.",
  "İki sütunlu dört kutu: Sened-i İttifak (1808, uzlaşma), Tanzimat (1839, ferman), Islahat (1856, ferman), Kanun-ı Esasi (1876, anayasa). Kutular seçilebilir.",
  "İlan edilen ilke ile kesintisiz gerçekleşmiş sonuç eşit değildir.",
  5.4,
);

/* ---------------- XX. yüzyıl başları ---------------- */

const causes: FigureDef = {
  caption:
    "Neden ile tetikleyiciyi ayır: emperyal rekabet, silahlanma, milliyetçilik, ittifaklar ve güvenlik kaygıları savaşın uzun dönem ortamını oluşturdu; 28 Haziran 1914 Saraybosna suikastı yakın tetikleyiciydi. Tetikleyici tek başına bütün savaşı açıklamaz.",
  alt: "Solda alt alta beş uzun dönem neden kutusu, sağa doğru oklarla tek bir ortam kutusuna bağlanıyor; ortama üstten 28 Haziran 1914 Saraybosna suikastı tetikleyici kutusu ok veriyor; sonuç kutusu savaş.",
  draw: () => {
    const items = ["emperyal rekabet", "silahlanma", "milliyetçilik", "ittifaklar", "güvenlik kaygıları"];
    const els: El[] = [];
    items.forEach((s, i) => {
      const y = 4.4 - i * 1.0;
      els.push(...node(v(2.0, y), 3.8, 0.7, s, "muted"), vec(v(3.95, y), v(5.55, 2.4), { thin: true, tone: "muted" }));
    });
    els.push(...node(v(7.2, 2.4), 3.0, 0.9, "savaş ortamı", "b"));
    els.push(...node(v(8.2, 4.6), 5.2, 0.9, "Saraybosna suikastı", "warn"), txt(v(8.2, 5.2), "28 Haziran 1914", "n", { small: true, bold: true, tone: "warn" }), vec(v(7.4, 4.12), v(7.4, 2.9), { tone: "warn" }), txt(v(7.55, 3.5), "tetikleyici", "e", { small: true, bold: true, tone: "warn" }));
    els.push(vec(v(8.75, 2.4), v(9.85, 2.4)), ...node(v(10.8, 2.4), 1.8, 0.9, "savaş", "a"));
    els.push(txt(v(2.0, 5.15), "uzun dönem", "n", { small: true, tone: "muted" }), txt(v(0, 6.0), " ", "c"), txt(v(11.9, -0.1), " ", "c"));
    return { els, readout: ["Uzun dönem nedenler ortamı kurar; suikast yakın tetikleyicidir.", "1882 Üçlü İttifak'taki İtalya savaş başlayınca tarafsız kaldı, 1915'te İtilaf yanında girdi."] };
  },
};

const entry = stepsFig({
  items: [
    { s: "Ortam: güvenlik arayışı, bağımlılıklar", what: "Güvenlik arayışı, kaybedilen bölgelerle ilgili beklentiler, mali ve askerî bağımlılıklar, Almanya'yla yakınlık." },
    { s: "2 Ağustos 1914 gizli ittifak", what: "Osmanlı–Alman ittifakı bir diplomatik karardır." },
    { s: "29 Ekim 1914 Karadeniz harekâtı", what: "Osmanlı donanmasının Rus limanlarına yönelik harekâtı fiilî savaşa girişin yakın tetikleyicisidir." },
  ],
  caption: "Osmanlı'nın savaşa girişini üç düğümle oku: ortam, 2 Ağustos 1914 gizli Osmanlı–Alman ittifakı (diplomatik karar) ve 29 Ekim 1914 Karadeniz harekâtı (fiilî girişin yakın tetikleyicisi).",
  alt: "Yukarıdan aşağıya üç kutu: ortam, 2 Ağustos 1914 gizli ittifak, 29 Ekim 1914 Karadeniz harekâtı.",
  foot: "Diplomatik karar ile fiilî savaşa giriş ayrı tarihlerdir.",
  w: 7.8,
});

const JOIN: { y: number; s: string; side: 0 | 1 | 2; what: string }[] = [
  { y: 1914, s: "Osmanlı", side: 0, what: "İttifak yanında savaşa katıldı." },
  { y: 1915, s: "İtalya", side: 1, what: "Savaş başladığında tarafsız kaldı, 1915'te İtilaf yanında girdi." },
  { y: 1915, s: "Bulgaristan", side: 0, what: "İttifak yanında katıldı." },
  { y: 1917, s: "ABD", side: 1, what: "İtilaf'a insan, finansman ve üretim kapasitesi sağladı." },
  { y: 1918, s: "Rusya (Brest-Litovsk)", side: 2, what: "1917 devrimlerinin ardından savaştan resmî çekiliş 1918 Brest-Litovsk Antlaşması'yla düzenlendi." },
];
const joining: FigureDef = {
  caption:
    "Taraflar savaş boyunca aynı kalmadı: Osmanlı 1914'te, Bulgaristan 1915'te İttifak yanında katıldı; İtalya 1915'te İtilaf yanında girdi; ABD 1917'de İtilaf tarafında yer aldı; Rusya'nın çekilişi 1918 Brest-Litovsk'la düzenlendi.",
  alt: "Yıl ekseni 1914–1918 ve iki şerit: üstte İttifak'a katılanlar (1914 Osmanlı, 1915 Bulgaristan), altta İtilaf'a katılanlar (1915 İtalya, 1917 ABD); 1918'de Rusya'nın çekilişi ayrı işaretli.",
  draw: () => {
    const X = (y: number) => (y - 1914) * 2.6 + 0.6;
    const els: El[] = [seg(v(0, 0), v(11.6, 0), { tone: "muted" })];
    for (let y = 1914; y <= 1918; y++) els.push(seg(v(X(y), -0.1), v(X(y), 0.1), { tone: "muted" }), txt(v(X(y), -0.15), String(y), "s", { small: true, tone: "muted" }));
    const laneY = [4.6, 2.4];
    const names = ["İttifak'a katılan", "İtilaf'a katılan"];
    laneY.forEach((y, i) => els.push(seg(v(0, y), v(11.6, y), { thin: true, tone: i ? "b" : "warn" }), txt(v(0, y - 0.25), names[i], "se", { small: true, bold: true, tone: i ? "b" : "warn" })));
    JOIN.forEach((e) => {
      const lane = e.side === 2 ? 1 : e.side;
      const y = e.side === 2 ? 0.9 : laneY[lane];
      const tone: Tone = e.side === 0 ? "warn" : e.side === 1 ? "b" : "muted";
      els.push({ k: "ball", c: v(X(e.y), y), r: 0.13, tone });
      els.push(txt(v(e.side === 2 ? X(e.y) - 0.25 : X(e.y), y + 0.25), e.side === 2 ? `${e.s}: çekiliş` : e.s, e.side === 2 ? "nw" : "n", { small: true, bold: true, tone: e.side === 2 ? "muted" : "ink" }));
    });
    els.push(txt(v(-0.2, 5.6), " ", "c"), txt(v(11.8, -0.8), " ", "c"));
    return { els, readout: ["İttifak: Osmanlı 1914, Bulgaristan 1915. İtilaf: İtalya 1915, ABD 1917.", "Rusya'nın savaştan resmî çekilişi 1918 Brest-Litovsk Antlaşması'yla düzenlendi."] };
  },
};

/* ---------------- İki savaş arası ---------------- */

const FOREIGN: Ev[] = [
  { y: 1923, s: "Lozan", what: "Boğazlarda uluslararası komisyon ve askerden arındırma hükümleri; Musul çözümlenmeyip görüşmeye bırakıldı." },
  { y: 1924, s: "Haliç görüşmeleri", what: "Musul konusunda sonuç alınamadı; mesele Milletler Cemiyeti sürecine taşındı." },
  { y: 1926, s: "Ankara Antlaşması", what: "Türkiye-Irak sınırı düzenlendi; 1921'de Fransa'yla yapılan Ankara Antlaşması değildir." },
  { y: 1930, s: "Türk-Yunan uzlaşması", what: "Mübadeledeki yerleşik sayılma tartışmalarından sonra ilişkilerin iyileşmesini destekledi." },
  { y: 1932, s: "Milletler Cemiyeti", what: "Türkiye Milletler Cemiyetine katıldı." },
  { y: 1934, s: "Balkan Antantı", what: "Türkiye, Yunanistan, Yugoslavya ve Romanya arasında bölgesel güvenlik." },
  { y: 1936, s: "Montrö", what: "20 Temmuz 1936: komisyon kaldırıldı, Türkiye'nin savunma yetkisi güçlendi, savaş gemilerinin geçişi koşullara bağlandı." },
  { y: 1937, s: "Sadabat Paktı", what: "Türkiye, İran, Irak ve Afganistan arasında komşuluk ve saldırmazlık çerçevesi." },
  { y: 1938, s: "Hatay Devleti", what: "Hatay Devleti kuruldu; Milletler Cemiyeti sürecinden ayrı bir aşamadır." },
  { y: 1939, s: "Hatay'ın katılması (köprü)", what: "Türkiye'ye katılma kararı 1939'dadır; 1938'e taşınmaz." },
];
const foreignTimeline = timelineFig({
  events: FOREIGN,
  a0: 1920,
  a1: 1940,
  ticks: [1920, 1930, 1940],
  caption:
    "1923–1930 dış politikasında Lozan'dan kalan sorunlar, 1930'larda bölgesel güvenlik ve barış iş birliği öne çıkar. Bir olaya tıkla. 1939 Hatay'ın katılması 1938'de biten dönemin köprü adımı olarak ayrıca etiketlidir.",
  alt: "Yatay eksende 1920–1940; her satırda bir olay: 1923 Lozan'dan 1939 Hatay'ın katılmasına on olay, yılında nokta. Olay adları seçilebilir.",
  foot: "Ad tek başına yetmez: Ankara 1921 (Fransa) ile Ankara 1926 (Irak sınırı) farklı belgelerdir.",
});

const parties = stepsFig({
  items: [
    { s: "1923 Halk Fırkası", what: "1923 seçimleriyle II. TBMM çalışmaya başladı; 1923 Halk Fırkası, 1924 ve 1930 girişimlerinden ayrı bir girişimdir." },
    { s: "1924 Terakkiperver Cumhuriyet Fırkası", what: "Kuruldu." },
    { s: "1925 kapatılma", what: "Şeyh Said İsyanı ve Takrir-i Sükûn ortamında kapatıldı." },
    { s: "1926 İzmir suikast girişimi", what: "Güvenlik olayları kronolojisinde." },
    { s: "1930 Serbest Cumhuriyet Fırkası", what: "Fethi Okyar kurdu; aynı yıl kendisini feshetti. Menemen Olayı da 1930'dadır." },
  ],
  caption: "Çok partili denemeler ve güvenlik olayları ayrı satırlarda: 1923 Halk Fırkası, 1924 Terakkiperver Cumhuriyet Fırkası (1925'te kapatıldı), 1926 İzmir suikast girişimi, 1930 Serbest Cumhuriyet Fırkası (aynı yıl kendini feshetti) ve 1930 Menemen Olayı.",
  alt: "Yukarıdan aşağıya beş kutu: 1923 Halk Fırkası, 1924 Terakkiperver Cumhuriyet Fırkası, 1925 kapatılma, 1926 İzmir suikast girişimi, 1930 Serbest Cumhuriyet Fırkası.",
  foot: "Farklı girişimleri ve kapanış biçimlerini (kapatılma, kendini feshetme) ayır.",
  w: 7.8,
});

const straits: FigureDef = {
  caption:
    "Montrö'yü güvenlik ile geçişi birlikte okuyarak karşılaştır: 1923 Lozan düzeninde Boğazlarda uluslararası komisyon ve askerden arındırma hükümleri vardı; 20 Temmuz 1936 Montrö Boğazlar Sözleşmesi komisyonu kaldırdı, Türkiye'nin savunma yetkisini güçlendirdi ve savaş gemilerinin geçişini koşullara bağladı.",
  alt: "İki sütunlu karşılaştırma: solda 1923 Lozan (uluslararası komisyon, askerden arındırma), sağda 1936 Montrö (komisyon kaldırıldı, savunma yetkisi güçlendi, savaş gemisi geçişi koşullu). Ortada sağa ok.",
  draw: () => {
    const els: El[] = [];
    const col = (x: number, head: string, lines: string[], tone: Tone) => {
      els.push(rectEl(x, 0, x + 4.8, 3.9, { tone, fill: tone, thin: true }), txt(v(x + 2.4, 3.4), head, "c", { bold: true }));
      lines.forEach((l, i) => els.push(txt(v(x + 2.4, 2.6 - i * 0.7), l, "c", { small: true })));
    };
    col(0, "1923 Lozan", ["uluslararası komisyon", "askerden arındırma"], "muted");
    col(6.6, "1936 Montrö", ["komisyon kaldırıldı", "savunma yetkisi arttı", "savaş gemisi geçişi", "koşullara bağlandı"], "c");
    els.push(vec(v(5.0, 1.95), v(6.4, 1.95), { bold: true, tone: "a" }));
    els.push(txt(v(-0.1, 4.1), " ", "c"), txt(v(11.5, -0.1), " ", "c"));
    return { els, readout: ["Türkiye değişen güvenlik ortamında statünün yeniden görüşülmesini istedi.", "Geçiş tamamen kapanmadı; koşullara bağlandı."] };
  },
};

export const historyFigures059Modern: Record<string, Record<string, FigureDef>> = {
  "denge-stratejisi": {
    "Denge: tehdidi, desteği ve bedeli birlikte oku": roles,
    "1774–1792: Kırım'ın statüsündeki aşamalar": crimea,
    "Sırp ve Yunan hareketleri: statüyü basamaklandır": statusLanes,
    "Mehmet Ali Paşa krizi ve 1833": egypt,
  },
  "devrimler-caginda-devlet-toplum": {
    "1789: mali krizden egemenlik tartışmasına": reformTimeline,
    "1876 Kanun-ı Esasi: anayasa ve meclis": docs,
  },
  "yirminci-yuzyil-baslarinda-osmanli": {
    "1914 Dünya Savaşı: neden ve tetikleyici": causes,
    "Osmanlı'nın savaşa girişi: ittifak ve Karadeniz harekâtı": entry,
    "1917–1918: çekilen Rusya, katılan ABD": joining,
  },
  "iki-savas-arasi-turkiye-dunya": {
    "Lozan sonrası sorunlara yöntemle yaklaş": foreignTimeline,
    "Çok partili denemeler ve güvenlik olayları": parties,
    "Montrö: güvenlik ile geçişi birlikte oku": straits,
  },
};
