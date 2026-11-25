import { poly, seg, txt, v, type El, type FigureDef } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W } from "./geographyFigures061Kit";
import { flowFig, mapFig, tableFig, timelineFig, treeFig } from "./turkishFigures060Kit";
import { drawFig, lines } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Coğrafya · Türkiye’de yerleşmeler, doğa ve insan, coğrafyanın
 * tarihî gelişimi. Yer, kişi ve eser adları yalnız bölüm metninden alınır.
 * Takvim çubuğu bölümdeki modelin beş ve on iki aylık kartlarıdır, gerçek
 * her yaylanın ölçümü değildir. Zaman şeridi sıralama aracıdır: eşit
 * aralıklar eşit süre göstermez; şemalar ölçekli değildir.
 */

/* ---------------- Türkiye’de yerleşmeler ---------------- */

// 3 · Mevsimlik ve sürekli kullanım.
const monthX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 12;
const calDraw = () => {
  const els: El[] = [];
  let y = 0;
  y = barRow(els, y, "Yayla kartı", [{ len: 5, tone: "c" }], monthX, "5 ay: yalnız yaz döneminde kalınan örnek");
  y = barRow(els, y, "Kent konutları", [{ len: 12, tone: "b" }], monthX, "12 ay: yıl boyu kullanım");
  y = axis(els, y + 0.2, [0, 3, 6, 9, 12], monthX, "ay");
  y = lines(els, y, ["Bölümdeki modelin kartları; beş ay gerçek her yaylanın ölçümü değildir."]);
  return { els, h: -y };
};
const calH = calDraw().h;
const calendar: FigureDef = drawFig({
  caption:
    "Bölümdeki model: beş ay kullanılan ayrı yayla kartı ile on iki ay kullanılan kent konutları. Çubuklar ay sayısıyla ölçeklidir. Turistin geçici ziyareti ile yerleşmenin kullanım süresi ayrı verilerdir.",
  alt: "Ay ekseninde iki yatay çubuk: yayla kartı 5 ay, kent konutları 12 ay.",
  h: calH,
  draw: () => ({ els: calDraw().els, readout: ["Yayla, oba, kom, ağıl ya da dam her bölgede aynı ay sayısıyla kullanılmaz.", "Tarihsel adı bugün aynı kullanımı garanti etmez; turizm ya da sürekli konut yeni takvim kurabilir."] }),
});

// 9 · Merkezî ve yerel yönetim.
const admin = tableFig({
  caption:
    "Görev sahibinin adı ile kurumun hukukî niteliği ayrı sorulardır. Bir göreve tıkla. Mahallede muhtar bulunması mahalleyi ayrı yerel yönetim tüzel kişiliği yapmaz.",
  alt: "Dört satırlı tablo. Vali: il, merkezî yönetimin taşra görevi, atanmış. Kaymakam: ilçe, merkezî yönetim, atanmış. Belediye başkanı ve belediye organları: yerel hizmet yönetimi, seçilmiş. Muhtar: köy ya da mahalle, seçilmiş.",
  cols: [
    { name: "Görev", w: 2.8 },
    { name: "Düzey ve bağlam", w: 4.6 },
    { name: "Göreve geliş", w: 2.6 },
  ],
  rows: [
    { cells: ["Vali", "il; merkezî yönetimin taşra görevi", "atanmış"], tones: [undefined, "b", "muted"], detail: ["İl düzeyinde merkezî yönetimin taşra görevi."] },
    { cells: ["Kaymakam", "ilçe; merkezî yönetim", "atanmış"], tones: [undefined, "b", "muted"], detail: ["İlçe düzeyinde merkezî yönetim görevi."] },
    { cells: ["Belediye", "seçilmiş organlarla yerel hizmet", "seçilmiş"], tones: [undefined, "c", "muted"], detail: ["İl özel idaresi, belediye ve köy yerel yönetim türleri arasında ele alınır."] },
    { cells: ["Muhtar", "köy ya da mahalle", "seçilmiş"], tones: [undefined, "c", "muted"], detail: ["Mahallenin ayrı tüzel kişiliği olduğu sonucu çıkmaz."] },
  ],
  foot: "Nüfus eşiği tek başına büyükşehir statüsü yaratmaz; yasal karar gerekir.",
});

// 10 · Mağara barınağı ve Neolitik yerleşme.
const prehistory = tableFig({
  caption:
    "Barınak, Neolitik yerleşme ve anıtsal-törensel yapı farklı kanıtlardır. Bir alana tıkla: yer ve işlev açılır. Kaynaktaki 10–12 bin yıllık vurgu tarım ve Neolitik dönüşüm bağlamıyla okunur.",
  alt: "Üç satırlı tablo. Mağara alanları: İstanbul Yarımburgaz, Antalya Karain, Adıyaman Palanlı, Hatay Üçağızlı; erken insan ve barınma, tarımdan eski. Neolitik yerleşmeler: Konya Çatalhöyük, Diyarbakır Çayönü, Aksaray Aşıklıhöyük, Burdur Hacılar. Anıtsal ve törensel: Şanlıurfa Göbeklitepe.",
  cols: [
    { name: "Tür", w: 2.6 },
    { name: "Bölümdeki örnek", w: 4.6 },
    { name: "İşlev", w: 2.8 },
  ],
  rows: [
    { cells: ["Mağara alanı", "Yarımburgaz, Karain, Palanlı, Üçağızlı", "erken insan, barınma"], tones: [undefined, "muted", "b"], detail: ["Bu tarih tarımdan daha eskidir; ilk barınma yalnız 10–12 bin yıl önce başlamamıştır."] },
    { cells: ["Neolitik", "Çatalhöyük, Çayönü, Aşıklıhöyük, Hacılar", "tarım ve yerleşik yaşam"], tones: [undefined, "muted", "c"], detail: ["Konya, Diyarbakır, Aksaray ve Burdur çevresindeki örnekler."] },
    { cells: ["Anıtsal", "Göbeklitepe (Şanlıurfa)", "anıtsal ve törensel yapılar"], tones: [undefined, "muted", "a"], detail: ["Bütün yapıları normal konut diye etiketlemek doğru değildir."] },
  ],
  foot: "Örneği yer, dönem ve yapının işleviyle birlikte öğren.",
});

// 11 · Kent işlevleri ve dağılış.
const functions = tableFig({
  caption:
    "Bölümdeki kent işlevi örnekleri. Bir işleve tıkla. Her şehir birden çok işlev taşır; küçük-orta-büyük kent eşikleri yasal büyükşehir statüsü değildir.",
  alt: "Dört satırlı tablo. Sanayi ve ticaret: Bursa, Kocaeli, Gaziantep. Liman: Mersin, İzmir, Samsun. Kültür ve eğitim: Eskişehir, Ankara. Turizm: Nevşehir, Bodrum, Marmaris.",
  cols: [
    { name: "İşlev", w: 3.4 },
    { name: "Bölümdeki örnek", w: 6.6 },
  ],
  rows: [
    { cells: ["Sanayi-ticaret", "Bursa, Kocaeli, Gaziantep"], tones: [undefined, "b"], detail: ["Uygun ova, tarım ve ulaşım bağlantıları Bursa çevresindeki yoğunlaşmaya katılır."] },
    { cells: ["Liman", "Mersin, İzmir, Samsun"], tones: [undefined, "c"], detail: ["İzmir ve Samsun çevresindeki yoğunlaşmalar da örneklenir."] },
    { cells: ["Kültür-eğitim", "Eskişehir, Ankara"], tones: [undefined, "a"], detail: ["Ankara’da yönetim işlevi de belirgindir."] },
    { cells: ["Turizm", "Nevşehir, Bodrum, Marmaris"], tones: [undefined, "c"], detail: ["Kıyı adı tek başına yoğunluk garantisi değildir."] },
  ],
  foot: "Menteşe, Biga, Taşeli ve Teke çevresinde engebe bazı alanlarda yerleşmeyi sınırlayabilir.",
});

// 12 · Yerleşme sorusunu çözme sırası.
const order = flowFig({
  caption:
    "Bir Türkiye yerleşme sorusunda veri türlerini sırayla ayır. İleri ile adımları aç. Çizimdeki aynı daire gerçek nüfusu, bağlantı kalınlığı gerçek istihdam oranını temsil etmez.",
  alt: "Beş kart alt alta: sınır idari mi fiziksel mi; nüfus kuralı; kullanım süresi; doku; işlev.",
  nodes: [
    { head: "Sınır", text: "idari mi, fiziksel mi?", tone: "b", note: "İl bir idari alandır; tek bir kesintisiz kentsel yapı olmak zorunda değildir." },
    { head: "Nüfus kuralı", text: "eşik açık verilir, yalnız o kural uygulanır", tone: "c", note: "Kaynaklarda farklı nüfus eşikleri bulunabilir." },
    { head: "Kullanım süresi", text: "yıl boyu mu, mevsimlik mi?", tone: "c", note: "Ailelerin kaç ay kaldığı açık verilmelidir." },
    { head: "Doku", text: "toplu mu, dağınık mı?", tone: "c", note: "Önce konut aralıklarını gerçekten gözle, sonra etkenlerle gerekçelendir." },
    { head: "İşlev", text: "baskın işlev hangi kanıtla?", tone: "a", note: "Şema ile oynamak tamamlanma ya da XP sağlamaz; yeni kanıtı bağımsız kullan." },
  ],
  steps: ["Sınır", "Nüfus", "Süre", "Doku", "İşlev"],
  reveal: true,
  foot: "Bu düzen bir şehir adı ezberinden daha anlaşılır bir karar verir.",
});

/* ---------------- Doğa ve insan ---------------- */

// 1 · Dört ortam.
const spheres = mapFig({
  caption:
    "Dört ortam birbirinden yalıtılmış kutular değildir; her çift arasında etkileşim vardır. Bir ortama tıkla: kapsamı ve bölümdeki bağlantı örneği açılır. Kavram haritası, ölçekli değil.",
  alt: "Dört düğüm: litosfer, atmosfer, hidrosfer, biyosfer; her çift bir çizgiyle bağlı. Altta yağışın yamaca düşmesi ve bitki örtüsünün akışı yavaşlatması örnekleri.",
  h: 4.4,
  nodes: [
    { x: 2.2, y: -0.4, label: "Litosfer", tone: "c", title: "Litosfer", detail: ["Kayaçlar, yer şekilleri ve yüzeye yakın katı ortam."] },
    { x: 7.8, y: -0.4, label: "Atmosfer", tone: "b", title: "Atmosfer", detail: ["Dünya çevresindeki gaz örtüsü."] },
    { x: 2.2, y: -2.6, label: "Hidrosfer", tone: "b", title: "Hidrosfer", detail: ["Akarsu, deniz, göl, buzul ve yer altı suyu."] },
    { x: 7.8, y: -2.6, label: "Biyosfer", tone: "a", title: "Biyosfer", detail: ["Canlıların yaşadığı alanlar; bir bitkinin kökü toprağa, yaprağı havaya ve su döngüsüne bağlıdır."] },
  ],
  edges: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ],
  notes: ["Yağış: atmosfer → hidrosfer, litosfer.", "Bitki örtüsü: biyosfer → su, toprak."],
  foot: "Bir olayı tek ortama örnek vermek, yalnız o ortamdan etkilendiğini söylemek değildir.",
});

// 2 · Doğal, beşerî ve coğrafi ortam.
const milieu = treeFig({
  caption:
    "Coğrafi ortam doğal ve beşerî ilişkilerin birlikte ele alındığı yaşam alanıdır. Bir dala ya da öğeye tıkla. İnsanı doğanın dışına yerleştirme. Kavram ağacı, ölçekli değil.",
  alt: "Ağaç: kök coğrafi ortam. Doğal ortam dalında litosfer, atmosfer, hidrosfer, biyosfer. Beşerî ortam dalında yollar, tarlalar, kentler, ekonomik ve toplumsal ilişkiler.",
  root: "Coğrafi ortam",
  branches: [
    {
      label: "Doğal ortam",
      title: "Doğal ortam",
      detail: ["Bir nehir fiziksel bir sistemdir."],
      tone: "c",
      leaves: [
        { label: "litosfer", title: "Litosfer", detail: ["Katı ortam ve yer şekilleri."] },
        { label: "atmosfer", title: "Atmosfer", detail: ["Gaz örtüsü."] },
        { label: "hidrosfer", title: "Hidrosfer", detail: ["Sular."] },
        { label: "biyosfer", title: "Biyosfer", detail: ["Canlıların yaşadığı alanlar."] },
      ],
    },
    {
      label: "Beşerî ortam",
      title: "Beşerî ortam",
      detail: ["Nehir üzerindeki köprü ve su kullanım anlaşması insan kararlarını içerir."],
      tone: "b",
      leaves: [
        { label: "yollar", title: "Yollar", detail: ["Beşerî ortamın parçasıdır."] },
        { label: "tarlalar", title: "Tarlalar", detail: ["Beşerî ortamın parçasıdır."] },
        { label: "kentler", title: "Kentler", detail: ["Beşerî ortamın parçasıdır."] },
        { label: "ilişkiler", title: "Ekonomik ve toplumsal ilişkiler", detail: ["Ekonomik ve toplumsal ilişkiler beşerî ortamı oluşturur."] },
      ],
    },
  ],
  foot: "Fayda ve maliyet farklı yer ve topluluklarda farklılaşabilir.",
});

// 4 · Müdahaleyi neden → süreç → sonuç diye izle.
const impact = flowFig({
  caption:
    "Bir müdahaleyi neden, değişen süreç ve olası sonuç sırasıyla çöz. İleri ile bölümdeki yol örneğini izle. Sonucun büyüklüğü eğim, yağış, zemin ve önlemlere bağlıdır; şema sayı üretmez.",
  alt: "Dört kart alt alta: neden, yol için bitki örtüsünün kaldırılması; değişen süreç, yüzey akışı; olası sonuç, erozyon riskinin artması; büyüklük, eğim, yağış, zemin ve koruma önlemlerine bağlı.",
  nodes: [
    { head: "Neden", text: "yol için bitki örtüsü kaldırılır", tone: "b", note: "Tünel açmak engeli azaltır ama maliyetin kalmadığını göstermez." },
    { head: "Değişen süreç", text: "yüzey akışı artabilir", tone: "c", note: "Teknoloji doğal süreçlerin bütününü ortadan kaldırmaz." },
    { head: "Olası sonuç", text: "erozyon riski artabilir", tone: "warn", note: "Barajın yararı habitat, tortu taşınımı ve yerleşme etkileriyle birlikte değerlendirilir." },
    { head: "Büyüklük", text: "eğim, yağış, zemin ve koruma önlemlerine bağlı", tone: "a", note: "Model etkileşim yollarını gösterir; veri olmadan kişi ya da miktar hesaplamaz." },
  ],
  steps: ["Neden", "Süreç", "Sonuç", "Büyüklük"],
  reveal: true,
  foot: "Önce verinin neyi ölçtüğünü söyle.",
});

// 5 · Fiziki alt dallar.
const physical = tableFig({
  caption:
    "Fiziki alt dalı anahtar sözcükle değil sorulan ilişkiyle seç. Bir dala tıkla: bölümdeki vadi örneği açılır. Su sözcüğü geçen her araştırma hidrografya değildir.",
  alt: "Beş satırlı tablo. Jeomorfoloji: yer şekilleri ve oluşum süreçleri. Klimatoloji: iklim elemanları ve uzun dönem düzenler. Hidrografya: yeryüzü sularının dağılış ve özellikleri. Biyocoğrafya: canlı topluluklarının mekânsal dağılışı. Kartografya: harita üretimi ve haritalardan yararlanma.",
  cols: [
    { name: "Alt dal", w: 3.4 },
    { name: "İnceleme nesnesi", w: 6.6 },
  ],
  rows: [
    { cells: ["Jeomorfoloji", "yer şekilleri ve oluşum süreçleri"], tones: [undefined, "c"], detail: ["Vadinin aşınma biçimi jeomorfoloji sorusudur."] },
    { cells: ["Klimatoloji", "iklim elemanları, uzun dönem düzenler"], tones: [undefined, "b"], detail: ["Havzanın uzun yıllar yağış düzeni klimatoloji açısından önceliklidir."] },
    { cells: ["Hidrografya", "yeryüzü sularının dağılış ve özellikleri"], tones: [undefined, "b"], detail: ["Aylık akım değişimi hidrografya sorusudur."] },
    { cells: ["Biyocoğrafya", "canlı topluluklarının mekânsal dağılışı"], tones: [undefined, "a"], detail: ["Canlı topluluklarının dağılışı biyocoğrafyanın konusudur."] },
    { cells: ["Kartografya", "harita üretimi ve haritalardan yararlanma"], tones: [undefined, "muted"], detail: ["Harita kullanılan her araştırma yalnız kartografya değildir."] },
  ],
  foot: "Yardımcı alanlar bir arada çalışabilir.",
});

// 6 · Beşerî alt dallar.
const human = tableFig({
  caption:
    "Beşerî alt dalı araştırmanın ülkesine değil sorulan ilişkiye bakarak seç. Bir dala tıkla: bölümdeki baraj ya da kasaba örneği açılır.",
  alt: "Beş satırlı tablo. Nüfus: dağılış, yoğunluk, yapı, göç. Yerleşme: konum, gelişim, biçim. Ekonomik: tarım, sanayi, hizmet, ticaret; içinde ulaşım ve enerji coğrafyası. Siyasi: sınırlar ve jeopolitik ilişkiler. Tarihî: geçmişteki coğrafi ortamlar.",
  cols: [
    { name: "Alt dal", w: 2.8 },
    { name: "İnceleme nesnesi", w: 7.2 },
  ],
  rows: [
    { cells: ["Nüfus", "dağılış, yoğunluk, yapı, göç"], tones: [undefined, "b"], detail: ["Barajdan sonra hangi köylerin taşındığı yerleşme ve nüfusla ilişkilidir."] },
    { cells: ["Yerleşme", "konum, gelişim, biçim"], tones: [undefined, "b"], detail: ["Aynı kasabada evlerin malzemesi yerleşme sorusudur."] },
    { cells: ["Ekonomik", "tarım, sanayi, hizmet, ticaret; ulaşım ve enerji coğrafyası"], tones: [undefined, "c"], detail: ["Ürünlerin pazara taşınma yolu ulaşım sorusudur; sulanan alanda ürün deseni ekonomik coğrafyadır."] },
    { cells: ["Siyasi", "sınırlar, jeopolitik ilişkiler"], tones: [undefined, "a"], detail: ["Bir devleti ilgilendiren her konu doğrudan siyasi coğrafya değildir."] },
    { cells: ["Tarihî", "geçmişteki coğrafi ortamlar"], tones: [undefined, "muted"], detail: ["Tarihî coğrafya geçmişteki coğrafi ortamları araştırır."] },
  ],
  foot: "Öncelikli alanı sorulan ilişki belirler.",
});

/* ---------------- Coğrafyanın tarihî gelişimi ---------------- */

// 1 · İlk Çağ katkıları.
const ancient = tableFig({
  caption:
    "Bölümde ayırt edici katkısı verilen üç İlk Çağ adı. Bir ada tıkla. Gölge hesabı ile harita koordinatını birbirine atama; listedeki herkese aynı eseri ya da ölçümü yükleme.",
  alt: "Üç satırlı tablo. Eratosthenes: Dünya çevresini gölge ve mesafelerle tahmin. Strabon: Geographika, bölgesel tasvir. Batlamyus: Geographia, Coğrafya Kılavuzu; koordinat ve harita yaklaşımı.",
  cols: [
    { name: "Ad", w: 3.0 },
    { name: "Ayırt edici katkı", w: 7.0 },
  ],
  rows: [
    { cells: ["Eratosthenes", "Dünya çevresini gölge ve mesafelerle tahmin; adlandırma geleneğinde anılır"], tones: [undefined, "a"], detail: ["Coğrafya adı Yunanca geo ve graphein kökleriyle ilişkilidir."] },
    { cells: ["Strabon", "Geographika: bölgesel tasvir"], tones: [undefined, "b"], detail: ["Bölgesel tasvir bir gözlem ve betimleme ürünüdür."] },
    { cells: ["Batlamyus", "Geographia (Coğrafya Kılavuzu): koordinat ve harita yaklaşımı"], tones: [undefined, "c"], detail: ["Koordinat-harita yaklaşımı gölge hesabıyla aynı katkı değildir."] },
  ],
  foot: "Antik çalışmalar ne masal ne de bugünkü eksiksiz bilimdir.",
});

// 2 · Orta Çağ katkıları.
const medieval = tableFig({
  caption:
    "Orta Çağ coğrafyacısı ifadesi kişileri tek başına ayırmaz; bölümdeki ayırt edici ipuçlarını kullan. Bir ada tıkla.",
  alt: "Dört satırlı tablo. Biruni: konum ve mesafe hesabı. İdrisî: dünya haritası, Sicilya çevresindeki çalışma. İbn Battûta: uzun yolculuk gözlemleri. İbn Haldun: toplum ve çevre yorumları.",
  cols: [
    { name: "Ad", w: 3.0 },
    { name: "Ayırt edici ipucu", w: 7.0 },
  ],
  rows: [
    { cells: ["Biruni", "konum ve mesafe hesabı"], tones: [undefined, "a"], detail: ["Ölçüm ve hesap ipucudur."] },
    { cells: ["İdrisî", "dünya haritası; Sicilya çevresindeki çalışma"], tones: [undefined, "c"], detail: ["Haritalama ipucudur."] },
    { cells: ["İbn Battûta", "uzun yolculuk gözlemleri"], tones: [undefined, "b"], detail: ["Seyahat gözlemi ipucudur."] },
    { cells: ["İbn Haldun", "toplum ve çevre yorumları"], tones: [undefined, "muted"], detail: ["Toplum-çevre yorumu ipucudur."] },
  ],
  foot: "Bir dönemin bütün insanları hakkında herkes durdu türünden hüküm kurma.",
});

// 4 · Osmanlı eserleri.
const ottoman = tableFig({
  caption:
    "Kaynakla doğrulanan eser ayrımları: eser adı, yazar ve yaptığı iş birlikte. Bir esere tıkla. Bölüm, doğrulanmayan eser tarihini soru anahtarı yapmaz.",
  alt: "Üç satırlı tablo. Pirî Reis, Kitâb-ı Bahriye: denizcilik, kıyı ve liman bilgisi. Kâtip Çelebi, Cihannümâ: coğrafi derleme. Evliya Çelebi, Seyahatnâme: yerleşim, insan ve güzergâh gözlemleri.",
  cols: [
    { name: "Yazar", w: 3.0 },
    { name: "Eser", w: 3.2 },
    { name: "Ne yapar?", w: 3.8 },
  ],
  rows: [
    { cells: ["Pirî Reis", "Kitâb-ı Bahriye", "denizcilik, kıyı ve liman bilgisi"], tones: [undefined, "b", "muted"], detail: ["Denizcilik ve harita bilgisi."] },
    { cells: ["Kâtip Çelebi", "Cihannümâ", "coğrafi derleme"], tones: [undefined, "c", "muted"], detail: ["Derleme bilgi türü."] },
    { cells: ["Evliya Çelebi", "Seyahatnâme", "yerleşim, insan, güzergâh gözlemi"], tones: [undefined, "a", "muted"], detail: ["Bir seyahat notu gözlenen yer ve tarih için bilgi sağlayabilir; bütün dünyayı sayısal temsil etmez."] },
  ],
  foot: "Kişi adı görmek hangi eserin hangi sayfasına ulaşıldığını göstermez.",
});

// 5 · Yakın Çağ.
const modern = tableFig({
  caption:
    "Yakın Çağ adlarının katkı ağırlıkları. Bir ada tıkla. Bunlar ağırlıktır; her yazarın yalnız tek konuyla çalıştığı anlamına gelmez.",
  alt: "Üç satırlı tablo. Humboldt: doğa olayları, yükselti boyunca bitki dağılışı gibi fiziki örüntüler. Ritter: bölgeyi doğal koşul ve insan ilişkileriyle bütün olarak karşılaştırma. Ratzel ve Vidal de la Blache: beşerî ve bölgesel yaklaşımların gelişimi.",
  cols: [
    { name: "Ad", w: 3.6 },
    { name: "Katkı ağırlığı", w: 6.4 },
  ],
  rows: [
    { cells: ["Humboldt", "fiziki örüntüler; yükselti boyunca bitki dağılışı"], tones: [undefined, "c"], detail: ["Dağılışları ve nedenleri sistemli karşılaştırma önem kazanır."] },
    { cells: ["Ritter", "bölgeyi doğal koşul ve insan ilişkileriyle bütün olarak karşılaştırma"], tones: [undefined, "b"], detail: ["Bölgesel bütünlük odağı."] },
    { cells: ["Ratzel, Vidal de la Blache", "beşerî ve bölgesel yaklaşımların gelişimi"], tones: [undefined, "a"], detail: ["Doğal koşul insan davranışını etkiler ile bütün toplumları zorunlu belirler aynı iddia değildir."] },
  ],
  foot: "Modern yaklaşım açıklamaların kesinleştiği bir bitiş noktası değildir.",
});

// 7 · Tarih şeridi.
const strip = timelineFig({
  caption:
    "Dönem kartlarını sıralama aracı olarak oku: eşit aralıklar eşit süre göstermez. Bir döneme tıkla: o dönemin öne çıkan yöntemi ve tek başına gösteremediği şey açılır.",
  alt: "Düşey şerit, beş durak: İlk Çağ tasvir ve akıl yürütme; Orta Çağ yolculuk, aktarım, gözlem ve haritalama; Yeni Çağ deniz yolları ve haritalama; Yakın Çağ ilişki ve karşılaştırma; günümüz sayısal harita, uzaktan algılama ve coğrafi bilgi sistemleri.",
  eras: [
    { when: "İlk Çağ", head: "Tasvir ve akıl yürütme", text: "yerlerin tanınması, dünyaya ilişkin düşünceler", tone: "c", detail: ["Antik kişilere çağdaş araçlar atfedilmez."] },
    { when: "Orta Çağ", head: "Yolculuk ve aktarım", text: "gözlem, haritalama, bilgi birikimlerinin aktarılması", tone: "b", detail: ["Tek merkezli bir duraklama öyküsü değildir."] },
    { when: "Yeni Çağ", head: "Deniz yolları", text: "teknik araçlar ve haritalama", tone: "c", detail: ["Keşfedildi ifadesi orada daha önce kimse yaşamıyordu demek değildir."] },
    { when: "Yakın Çağ", head: "İlişki ve karşılaştırma", text: "dağılış, çevre–insan ilişkisi, nedenler", tone: "b", detail: ["Önceki çağların gözlem ve haritaları birikim sağlar."] },
    { when: "Günümüz", head: "Mekânsal veri", text: "sayısal harita, uzaktan algılama, CBS", tone: "a", detail: ["Haritanın bilgisayarda çizilmesi sonucun otomatik doğru olduğunu göstermez."] },
  ],
  foot: "Bir eserin adı ya da ölçüm tarihi verilmemişse yalnız dönemden türetme.",
});

const riverStudySubjects: FigureDef = {
  caption: "Aynı akarsu üzerinde üç araştırma sorusu izle. Konuyu, ölçülecek ya da karşılaştırılacak ilişkiye göre seç.",
  alt: "Ortada kıvrılan akarsu, solda kıyı bitkileri, sağda üç tarla basamağı. Adımlar akarsu akımını, bitki dağılışını ve tarımsal kullanım ilişkisini vurgular.",
  steps: ["Akım", "Kıyı bitkileri", "Tarımsal kullanım"],
  draw: (_, step) => {
    const landTone = step === 2 ? "warn" : "muted";
    const plantTone = step === 1 ? "c" : "muted";
    const els: El[] = [
      poly([v(4.3, 3.3), v(3.7, 2.7), v(4.2, 1.9), v(4.5, 1.25), v(3.9, 0.5)], { open: true, tone: "b", bold: step === 0 }),
      txt(v(4.2, 0.18), "Akarsu", "s", { tone: "b", small: true, bold: step === 0 }),
      txt(v(1.5, 0.18), "Bitki örtüsü", "s", { tone: plantTone, small: true, bold: step === 1 }),
      txt(v(7.1, 0.18), "Tarlalar", "s", { tone: landTone, small: true, bold: step === 2 }),
      txt(v(-0.45, 3.65), "", "c"),
      txt(v(8.85, -0.75), "", "c"),
    ];
    for (const [x, y] of [[0.9, 1.15], [1.55, 1.45], [2.2, 1.75]]) {
      els.push(seg(v(x, y), v(x, y + 0.3), { tone: plantTone }));
      els.push(poly([v(x - 0.25, y + 0.3), v(x, y + 0.9), v(x + 0.25, y + 0.3)], { tone: plantTone, fill: plantTone }));
    }
    for (let i = 0; i < 3; i += 1) {
      const x = 6.0 + i * 0.44, y = 1.1 + i * 0.45;
      els.push(poly([v(x, y), v(x + 1.1, y), v(x + 1.4, y + 0.23), v(x + 0.3, y + 0.23)], { tone: landTone, fill: landTone, thin: true }));
    }
    const notes = [
      "Akarsu akımı aylara göre nasıl değişir? Suyun akımını hidrografya inceler.",
      "Kıyı bitkileri hangi alanlarda toplanır? Canlı topluluklarının dağılışını biyocoğrafya inceler.",
      "Suya yakınlık tarlaların dağılışını nasıl etkiler? Tarımsal etkinliğin konumu ekonomik coğrafyanın sorusudur.",
    ];
    return { els, readout: [notes[step]] };
  },
};

export const geographyFigures062Human: Record<string, Record<string, FigureDef>> = {
  "turkiye-yerlesmeleri": {
    "Yayla ve başka mevsimlik kullanımlarda takvim": calendar,
    "Merkezî ve yerel yönetimde görevler": admin,
    "Anadolu’da barınak ile Neolitik yerleşmeyi ayır": prehistory,
    "Dağılış ve kent işlevlerini somut örnekle bağla": functions,
    "İşlev haritasını takvimle karıştırma": order,
  },
  "doga-insan-cografya": {
    "Aynı akarsuyu üç farklı soruyla incele": riverStudySubjects,
    "Dört ortam birbiriyle etkileşir": spheres,
    "Doğal ortamdan coğrafi ortama": milieu,
    "İnsan çevreyi değiştirir; etkiyi izle": impact,
    "Fiziki alt dalları soru üzerinden seç": physical,
    "Beşerî alt dalları ayır": human,
  },
  "cografyanin-tarihi-gelisimi": {
    "İlk Çağ: tasvir ve akıl yürütme": ancient,
    "Orta Çağ: tek merkezli bir duraklama öyküsü değil": medieval,
    "Osmanlı birikimi: farklı ürünleri ayır": ottoman,
    "Yakın Çağ: ilişki ve karşılaştırma": modern,
    "Tarih şeridini kanıtla oku": strip,
  },
};
