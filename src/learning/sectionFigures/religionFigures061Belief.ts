import type { FigureDef } from "./figureKit";
import { flowFig, quadFig, tableFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Din Kültürü · İnançla ilgili meseleler, Bilgi ve inanç,
 * Kur’an’da bazı kavramlar. Tanımlar ve örnekler yalnız bölüm metninden
 * alınır. Tablolar görüşleri hangi soruya cevap verdikleriyle sınıflar; görüş
 * sahiplerine değer biçmez, gerçek kişilere inanç ya da niyet atamaz.
 */

// inanc-ile-ilgili-meseleler · 1 · Dört eksen.
const axes = tableFig({
  caption:
    "Sınıflamaya başlamadan önce cümlenin hangi soruya cevap verdiğini bul. Bir eksene tıkla: sorusu ve bölümde o eksende ele alınan kavramlar açılır. Bir cümle aynı anda birden çok eksene ilişkin olabilir.",
  alt: "Dört satırlı tablo. Varlık: Tanrı var mı; teizm, deizm, ateizm, materyalizm. Bilgi: bunu kesin bilebilir miyiz; agnostisizm, pozitivizm. Siyaset-toplum: kamusal kurumlar nasıl düzenlenmeli; sekülarizm, laiklik. Değer: değerlerin nesnel temeli var mı; nihilizm.",
  cols: [
    { name: "Eksen", w: 3.2 },
    { name: "Soru", w: 3.5 },
    { name: "Bölümdeki kavramlar", w: 3.3 },
  ],
  rows: [
    { cells: ["Varlık", "Tanrı var mı? Gerçeklik nedir?", "teizm, deizm, ateizm, materyalizm"], tones: [undefined, "muted", "c"], detail: ["“Yalnız maddi gerçeklik vardır” ontolojik bir iddiadır; deney yapmak tek başına materyalist dünya görüşü değildir."] },
    { cells: ["Bilgi", "Bunu kesin bilebilir miyiz?", "agnostisizm, pozitivizm"], tones: [undefined, "muted", "b"], detail: ["Agnostisizmde belirleyici yüklem “bilmek”tir; pozitivizm gözlem, olgu ve deneysel bilgiyi öne çıkarır."] },
    { cells: ["Siyaset-toplum", "Kamusal kurumlar nasıl düzenlenmeli?", "sekülarizm, laiklik"], tones: [undefined, "muted", "a"], detail: ["Laiklik devlet ve din ilişkisinin düzenlenmesiyle ilgilidir; teist inanç ile seküler kurum tercihi birlikte taşınabilir."] },
    { cells: ["Değer", "Değerlerin nesnel temeli var mı?", "nihilizm"], tones: [undefined, "muted", "warn"], detail: ["“Nesnel ahlak temeli yoktur” cümlesi Tanrı’nın varlığı hakkında ayrı açık önerme vermeyebilir."] },
  ],
  foot: "Tek sözcükten gerçek kişilere inanç profili yüklenmez; açık önermeye ihtiyaç vardır.",
});

// inanc-ile-ilgili-meseleler · 2 · İslam öğretisi ile deizm.
const deism = tableFig({
  caption:
    "Ders karşılaştırması hangi konuda iki farklı önerme kurulduğunu gösterir. Bir konuya tıkla: iki tarafın bölümdeki ifadesi açılır. Bu karşılaştırma deneysel bir yarışma değildir ve görüş sahiplerine değer biçmez.",
  alt: "Üç satırlı tablo. Yaratıcı: İslam öğretisi kabul eder; deizm tipik tanımda kabul eder. Vahiy: İslam öğretisinde ilişki vahiyle sürer; deizm kabul etmez. Evrenle ilişki: İslam öğretisinde ilk yaratmayla sınırlı değil, bilgi, irade, kudret ve sorumlulukla devam eder; deizm doğaüstü müdahaleyi kabul etmez.",
  cols: [
    { name: "Konu", w: 2.6 },
    { name: "İslam öğretisi (OGM)", w: 3.9 },
    { name: "Deizm (ders tanımı)", w: 3.5 },
  ],
  rows: [
    { cells: ["Yaratıcı", "kabul edilir", "kabul edilir"], tones: [undefined, "c", "b"], detail: ["Yalnız “yaratıcı vardır” cümlesi deizmin ayırt edici yönünü vermez; bu noktada iki taraf ayrışmaz."] },
    { cells: ["Vahiy", "ilişki vahiyle sürer", "kabul edilmez"], tones: [undefined, "c", "b"], detail: ["“Vahiy hakkında henüz karar vermedim” ile “vahyi reddediyorum” aynı kesinlikte değildir."] },
    { cells: ["Evrenle ilişki", "ilk yaratmayla sınırlı değil; bilgi, irade, kudret, sorumluluk", "doğaüstü müdahale kabul edilmez"], tones: [undefined, "c", "b"], detail: ["OGM’ye göre İslam’da Allah’ın evrenle ilişkisi yalnız ilk yaratmayla sınırlanmaz; karşılaştırmanın belirleyici tarafı budur."] },
  ],
  foot: "Deizmi seçmek için iki öncülü birlikte bul: yaratıcı kabulü ve vahiy-müdahale konusundaki görüş.",
});

// inanc-ile-ilgili-meseleler · 3 · Önermenin ekseni.
const claims = tableFig({
  caption:
    "“Yoktur” varlık, “bilemeyiz” bilgi hakkında bir önermedir; ikisi mantıken aynı cümle değildir. Bir önermeye tıkla: ekseni ve eşleştiği terim açılır.",
  alt: "Dört satırlı tablo. Tanrı vardır: varlık ekseni, teizm. Tanrı yoktur: varlık ekseni, ateizmin bazı biçimleri. Kesin bilgiye erişilemez: bilgi ekseni, agnostisizm. Yaratıcı vardır ama vahiy ve müdahale yoktur: iki öncül, deizm.",
  cols: [
    { name: "Önerme", w: 4.4 },
    { name: "Eksen", w: 2.2 },
    { name: "Terim", w: 3.4 },
  ],
  rows: [
    { cells: ["“Tanrı vardır.”", "varlık", "teizm"], tones: [undefined, "muted", "c"], detail: ["Teizm Tanrı’nın varlığını kabul eden genel yaklaşımdır; tek tanrı inancına monoteizm, birden çok tanrı inancına politeizm denir."] },
    { cells: ["“Tanrı yoktur.”", "varlık", "ateizmin bazı biçimleri"], tones: [undefined, "muted", "b"], detail: ["Açık yokluk iddiasını bilgiye erişim çekincesiyle aynılaştırma; ateizm Tanrı inancının bulunmaması çerçevesinde de kullanılır."] },
    { cells: ["“Kesin bilemeyiz.”", "bilgi", "agnostisizm"], tones: [undefined, "muted", "a"], detail: ["Bilgi kesinliğini reddetmek iki ihtimale sayısal 50–50 olasılık vermek değildir."] },
    { cells: ["“Yaratıcı var; vahiy ve müdahale yok.”", "varlık + vahiy", "deizm"], tones: [undefined, "muted", "warn"], detail: ["Deizmin tipik ders tanımında iki öncül birlikte bulunur."] },
  ],
  foot: "Ne reddedildiğini cümledeki nesneyle birlikte oku.",
});

// inanc-ile-ilgili-meseleler · 4 · Ahlaki ve doğal kötülük.
const evil = tableFig({
  caption:
    "Kötülük probleminin tartışmasında iki tür ayrılır: doğrudan neden insanın tercihi mi, insan iradesinden doğrudan kaynaklanmayan doğal süreç mi? Bir türe tıkla: örnekler ve özgür irade cevabının hangi soruya yöneldiği açılır.",
  alt: "İki satırlı tablo. Ahlaki kötülük: doğrudan neden insanın tercih ve eylemi; hile, kasıtlı zarar, yolsuzluk, yardımı bilerek engelleme; özgür irade savunması buna verilen cevaplardan biri. Doğal kötülük: insan iradesinden doğrudan kaynaklanmayan doğal süreç; deprem, fırtına; özgür irade savunması fiziksel kökeni tek başına açıklamaz.",
  cols: [
    { name: "Tür", w: 2.4 },
    { name: "Doğrudan neden", w: 2.6 },
    { name: "Örnek", w: 2.6 },
    { name: "Özgür irade cevabı", w: 2.4 },
  ],
  rows: [
    { cells: ["Ahlaki", "insanın tercih ve eylemi", "hile, kasıtlı zarar, yolsuzluk", "bu soruya yönelir"], tones: [undefined, "warn", "muted", "c"], detail: ["Sel sonrası bağışları çalmak selin fiziksel mekanizmasından ayrı ahlaki bir fiildir; tek senaryoda birden çok neden bulunabilir."] },
    { cells: ["Doğal", "doğal süreç", "deprem, fırtına", "fiziksel kökeni açıklamaz"], tones: [undefined, "b", "muted", "muted"], detail: ["Doğal olayı “kötülük” diye sınıflandırmak doğaya ahlaki niyet yüklemek değildir; sonuçlar bina, altyapı ve yardım kararlarıyla ağırlaşabilir veya hafifleyebilir."] },
  ],
  foot: "Problemi tanımlamak onun tek zorunlu cevabını ilan etmek değildir; bu soruyu sormak da kişinin inancını göstermez.",
});

// bilgi-ve-inanc · 1 · Üç bilgi yolu.
const sources = treeFig({
  caption:
    "Ders kaynaklarındaki üç temel bilgi yolu ve bölümde her birinin altında verilenler. Bir dala ya da yaprağa tıkla: işlevi açılır. Üçlü katı ve kopuk kutular değildir; aynı olayda birkaçı birlikte bulunabilir.",
  alt: "Üç dallı ağaç. Salim duyular: görme, işitme, koklama, tatma, dokunma. Selim akıl: ilişki kurma, karşılaştırma, sonuç çıkarma. Sadık haber: mütevatir haber, peygamberden gelen haber.",
  root: "Bilgi yolları",
  branches: [
    {
      label: "Salim duyular",
      title: "Salim duyular",
      tone: "b",
      detail: ["Sağlıklı işleyen duyular dış çevreye ilişkin veri edinmede kullanılır; zilin sesini işitmek ya da termometreyi görmek örnektir.", "Duyunun sağlıklı olması bütün yanılma koşullarını kaldırmaz."],
      leaves: [
        { label: "görme", title: "Görme", detail: ["Termometredeki göstergeyi görmek duyusal veri örneğidir."] },
        { label: "işitme", title: "İşitme", detail: ["Bir söz kulağa duyuyla ulaşır; sözün güvenilir aktarım olup olmaması ayrı sorudur."] },
        { label: "koklama", title: "Koklama", detail: ["Dış çevreye ilişkin veri edinme yollarından biridir."] },
        { label: "tatma", title: "Tatma", detail: ["Dış çevreye ilişkin veri edinme yollarından biridir."] },
        { label: "dokunma", title: "Dokunma", detail: ["Dış çevreye ilişkin veri edinme yollarından biridir."] },
      ],
    },
    {
      label: "Selim akıl",
      title: "Selim akıl",
      tone: "c",
      detail: ["Doğru ve tutarlı değerlendirmeye yönelen akıl; veriler arasında ilişki kurar, karşılaştırır ve sonuç çıkarır.", "Yanlış veya eksik öncüllerle kurulan sonuç kesin sayılmaz."],
      leaves: [
        { label: "ilişki kurma", title: "İlişki kurma", detail: ["Akıl veriler arasında ilişki kurar."] },
        { label: "karşılaştırma", title: "Karşılaştırma", detail: ["Akıl verileri karşılaştırır."] },
        { label: "sonuç çıkarma", title: "Sonuç çıkarma", detail: ["Çıkarımın biçimi ve öncüllerin dayanağı ayrı denetlenmelidir."] },
      ],
    },
    {
      label: "Sadık haber",
      title: "Sadık haber",
      tone: "a",
      detail: ["Doğru veya güvenilir haber; vahiy ve peygamberden gelen haber temel örneklerdir.", "Tanımı her belirsiz internet iletisine otomatik uygulama."],
      leaves: [
        { label: "mütevatir", title: "Mütevatir haber", detail: ["Yalan üzerinde birleşmeleri aklen mümkün görülmeyen toplulukların kesintisiz iletimi; Kur’an’ın aktarımı bu başlıkla ilişkilendirilir."] },
        { label: "peygamberden", title: "Peygamberden gelen haber", detail: ["Kur’an ve sünnet Müslümanlar için temel başvuru kaynaklarıdır."] },
      ],
    },
  ],
  foot: "Sezgi, rüya, keşif ve ilham herkes için bağlayıcı olmayan öznel kaynaklar olarak ayrılır.",
});

// bilgi-ve-inanc · 2 · Mütevatir haberin koşulları.
const mutawatir = flowFig({
  caption:
    "Mütevatir tanımını üç koşulla birlikte denetle: çokluk, kaynak bağımsızlığı, aktarımın niteliği ve sürekliliği. İleri ile koşulları sırayla aç. Bir iletinin bin kez kopyalanması bin bağımsız kaynak demek değildir.",
  alt: "Dört kart alt alta: çokluk, aktaran topluluklar; kaynak bağımsızlığı, hepsi aynı ilk iddiaya mı dönüyor; aktarım koşulu ve süreklilik, kesintisiz iletim; sonuç, hazır örnek hangi şartı açık veriyorsa ona dayan.",
  nodes: [
    { head: "Çokluk", text: "aktaran topluluklar", tone: "b", note: "Yalnız büyük paylaşım sayısı yetmez; aktarımın niteliği ve sürekliliği de önemlidir." },
    { head: "Kaynak bağımsızlığı", text: "hepsi aynı belirsiz ilk iddiaya mı dönüyor?", tone: "c", note: "Bin kopya aynı belirsiz ilk iddiaya dönüyor olabilir; bu durumda bağımsız bin kaynak yoktur." },
    { head: "Aktarım koşulu ve süreklilik", text: "kesintisiz, nitelikli iletim", tone: "a", note: "Tanım yalan üzerinde birleşmeleri aklen mümkün görülmeyen toplulukların kesintisiz iletimini anlatır." },
    { head: "Karar", text: "örnek hangi şartı açık veriyor?", tone: "muted", note: "Bilinmeyen şartı tamamlanmış sayma; hazır kurgu örneğin açık verdiği şartlara dayan." },
  ],
  steps: ["Çokluk", "Bağımsızlık", "Süreklilik", "Karar"],
  reveal: true,
  foot: "Çokluk, kaynak bağımsızlığı ve aktarım koşulunu birlikte düşün.",
});

// bilgi-ve-inanc · 3 · Bilmek ve benimsemek.
const knowAccept = quadFig({
  caption:
    "Açıklayabilmek bilgiye, kalben benimsemek tasdike ilişkin farklı verilerdir. Bir hücreye tıkla: o durumda bölümün ne söylediği açılır. Din öğretisini öğrenmek kişisel inanç kabulü sayılmaz.",
  alt: "2×2 tablo. Sütunlar: benimser, benimsemez. Satırlar: ayrıntılı açıklayabilir, ayrıntıları bilmez. Açıklar ve benimsemez: araştırmacı örneği. Benimser ve ayrıntıları bilmez: kabul beyanı bütün ayrıntıyı bildiğini göstermez.",
  cols: ["Benimser", "Benimsemez"],
  rows: ["Ayrıntılı açıklar", "Ayrıntıyı bilmez"],
  axis: ["Kalben benimseme (tasdik)", "Satır: bilgi düzeyi"],
  cells: [
    { head: "Bilgi ve kabul", text: "iki veri birlikte", tone: "c", detail: ["Bilgi imanı anlamada araç olabilir; onun yerine aynı kavram olarak konulmaz."] },
    { head: "Araştırmacı", text: "kabul etmeyebilir", tone: "b", detail: ["Bir araştırmacı bir dinin görüşlerini ayrıntılı açıklayabilir ama bunları kendi inancı olarak kabul etmeyebilir."] },
    { head: "Kabul beyanı", text: "ayrıntı bilgisi göstermez", tone: "a", detail: ["Bir inancı kabul ettiğini söylemek o konunun bütün ayrıntılarını bildiğini göstermez."] },
    { head: "Veri yok", text: "niyet üretme", tone: "muted", detail: ["Sorudaki açık bilgiyi kullan; verilmeyen niyet ve bağlılığı üretme."] },
  ],
  foot: "Bilgi ve kabulün ilişkisi tek bir otomatik okla bütün durumları kapsamaz.",
});

// bilgi-ve-inanc · 4 · Taklidî ve tahkikî.
const taqlid = tableFig({
  caption:
    "Aynı kabul cümlesinin arkasında farklı edinim süreçleri olabilir; belirleyici veri sonucun nasıl edinildiğidir. Bir türe tıkla: vurgusu ve uyarı açılır. Bu sınıflama kişilerin değerine not verme aracı değildir.",
  alt: "İki satırlı tablo. Taklidî: çevreyi izleme yoluyla edinim. Tahkikî: bilgi, araştırma ve gerekçeyle temellendirme.",
  cols: [
    { name: "Edinim", w: 2.6 },
    { name: "Vurgu", w: 7.4 },
  ],
  rows: [
    { cells: ["Taklidî", "araştırma ve delil incelemesinden çok çevreyi izleme yoluyla edinim"], tones: [undefined, "b"], detail: ["Aileden öğrenip sonradan gerekçelerini araştıran birinin bütün sürecini yalnız ilk çevre etkisine bakıp tek etikete daraltma."] },
    { cells: ["Tahkikî", "bilgi, araştırma ve gerekçeyle temellendirme"], tones: [undefined, "c"], detail: ["Hazır örnekte verilen araştırma ve delil vurgusunu açıkça göster."] },
  ],
  foot: "Söylenen sonuç değil, onun nasıl edinildiği belirleyicidir.",
});

// kur-anda-gecen-bazi-kavramlar · 1 · Kavram ve boyut.
const conceptAxes = tableFig({
  caption:
    "Ünitedeki kavramlar farklı boyutlara bakar: yönelme, niyet, özen, sakınma, istikamet, çaba, iyi eylem. Bir kavrama tıkla: hangi soruyla tanındığı açılır. Kavramlar birbirini her zaman dışlamaz; bir yardım hem salih amel hem infakla ilişkili olabilir.",
  alt: "Yedi satırlı tablo. Hidayet: yönelme, hangi yöne. İhlas: niyet, niçin. İhsan: özen, nasıl. Takva: sakınma, hangi gerekçeyle. Sırat-ı müstakim: istikamet, yolun kendisi. Cihat: çaba, hedef ve araç. Salih amel: iyi eylem, yararı ve amacı.",
  cols: [
    { name: "Kavram", w: 3.6 },
    { name: "Boyut", w: 2.2 },
    { name: "Ayırt edici soru", w: 4.2 },
  ],
  rows: [
    { cells: ["Hidayet", "yönelme", "Hangi yol bırakıldı, hangisine yönelindi?"], tones: [undefined, "c", "muted"], detail: ["Allah açısından rehberlik etme, insan açısından bu rehberliğe yönelme boyutu ayrılır; dalalet karşıt kavramdır."] },
    { cells: ["İhlas", "niyet", "Niçin yaptı?"], tones: [undefined, "c", "muted"], detail: ["Söz ve davranışta Allah’ın rızasını gözetme, gösterişten uzak samimiyet; riyâ karşıtıdır."] },
    { cells: ["İhsan", "özen", "Nasıl yaptı?"], tones: [undefined, "c", "muted"], detail: ["Allah’ı görüyormuşçasına bilinçle kulluk; ihsan ile ihlas ilişkili olsa da aynı sorunun cevabı değildir."] },
    { cells: ["Takva", "sakınma", "Hangi gerekçeyle uzak durdu?"], tones: [undefined, "b", "muted"], detail: ["Allah’a karşı sorumluluk bilinciyle sakınma; yalnız yakalanma korkusu verilmişse aynı niyet eklenemez."] },
    { cells: ["Sırat-ı müstakim", "istikamet", "Yolun kendisi ve o doğrultuda ilerleme"], tones: [undefined, "b", "muted"], detail: ["Kur’an ve peygamberlerin gösterdiği doğru ilkelere bağlı, aşırılıktan uzak yol."] },
    { cells: ["Cihat", "çaba", "Hedef ve araç ne?"], tones: [undefined, "a", "muted"], detail: ["İyiliği gerçekleştirmek için bilinçli gayret; barışçıl öz disiplin örneğinden çatışma sonucu çıkarılamaz."] },
    { cells: ["Salih amel", "iyi eylem", "Yararlı iş gerçekleşti mi?"], tones: [undefined, "a", "muted"], detail: ["İman ve doğru niyetle ilişkilendirilen iyi, güzel ve yararlı iş; bir iyiliği düşünmek ile gerçekleştirmek aynı değildir."] },
  ],
  foot: "Soru “niyet bakımından” mı, “eylemin türü” mü diyor? Önce istenen boyutu belirle.",
});

// kur-anda-gecen-bazi-kavramlar · 2 · Takva ve gerekçe.
const taqwa = tableFig({
  caption:
    "Aynı sakınma davranışı farklı gerekçelerle anlatılabilir; kavramı metindeki gerekçe belirler. Bir duruma tıkla: hangi sonucun çıkarılabileceği açılır.",
  alt: "İki satırlı tablo. Haksız kazançtan Allah’a karşı sorumluluk bilinciyle uzak durduğunu söyleyen öğrenci: takva için kavramsal kanıt var. Yalnız yakalanmaktan korktuğu söylenen öğrenci: takva niyeti eklenemez.",
  cols: [
    { name: "Haksız kazançtan uzak duran", w: 3.6 },
    { name: "Verilen gerekçe", w: 3.4 },
    { name: "Sonuç", w: 3.0 },
  ],
  rows: [
    { cells: ["Birinci öğrenci", "Allah’a karşı sorumluluk bilinci", "takva için kanıt var"], tones: [undefined, "muted", "c"], detail: ["Bilinç, tercih ve davranış birlikte verilmiştir; müttaki takva sahibi kişi için kullanılır."] },
    { cells: ["İkinci öğrenci", "yalnız yakalanma korkusu", "takva niyeti eklenemez"], tones: [undefined, "muted", "warn"], detail: ["Her sakınma dinî sorumluluk beyanı değildir; takva yalnız kaygı duygusuna da indirgenmez."] },
  ],
  foot: "Metindeki gerekçe sonucu belirler.",
});

// kur-anda-gecen-bazi-kavramlar · 3 · Cihat ve kıtal.
const jihad = tableFig({
  caption:
    "İki terim aynı genişlikte değildir: cihat geniş çaba anlamı taşır, kıtal silahlı savaşma anlam alanıdır. Bir terime tıkla: bölümdeki kapsam ve uyarı açılır. Ayırmak için eylemin aracını ve doğrudan verisini sor.",
  alt: "İki satırlı tablo. Cihat: Allah’ın rızasını gözeterek iyiliği gerçekleştirmek için bilinçli gayret; örnek zararlı alışkanlıkla mücadele, doğru bilgiyi öğrenme-öğretme, toplumsal yarara çalışma. Kıtal: silahlı savaşma; ayrı ve zorunlulukla sınırlı bağlam.",
  cols: [
    { name: "Terim", w: 2.2 },
    { name: "Anlam alanı", w: 3.8 },
    { name: "Bölümdeki örnek ya da sınır", w: 4.0 },
  ],
  rows: [
    { cells: ["Cihat", "iyiliği gerçekleştirmek için bilinçli gayret ve mücadele", "zararlı alışkanlıkla mücadele, bilgiyi öğrenme-öğretme, toplumsal yarar"], tones: [undefined, "c", "muted"], detail: ["Sadece rekabet sözcüğü kavramın bütün koşullarını sağlamaz; işin hedefi ve aracı önemlidir."] },
    { cells: ["Kıtal", "silahlı savaşma", "ayrı ve zorunlulukla sınırlı bağlam"], tones: [undefined, "warn", "muted"], detail: ["Genel çaba bulunması silah veya çatışma gerçekleştiğini kanıtlamaz; kavram tarih, hukuk ve yetki koşullarıyla kullanılır."] },
  ],
  foot: "Barışçıl öğrenme örneğini askerî talimata dönüştürme; verilmeyen çatışma ayrıntısını ekleme.",
});

// kur-anda-gecen-bazi-kavramlar · 4 · Niyet ve eylem.
const intentAct = tableFig({
  caption:
    "Bölümdeki iki kurmaca kişi aynı fiili farklı niyetle yapar. Bir kişiye tıkla: hangi kavram bağının korunduğu, hangisinin değiştiği açılır. Bir boyutun değişmesi bütün verileri silmez.",
  alt: "İki satırlı tablo. Birinci kişi ihtiyaç sahibine araç verir, amaç olarak Allah’ın rızasını belirtir: infak kanıtı var, ihlas yorumu desteklenir. İkinci kişi aynı fiili yalnız alkış için yapar: infak kanıtı korunur, ihlas yorumu desteklenmez.",
  cols: [
    { name: "Kurmaca kişi", w: 2.8 },
    { name: "Eylem", w: 2.4 },
    { name: "Niyet", w: 2.4 },
    { name: "Kavram bağı", w: 2.4 },
  ],
  rows: [
    { cells: ["Birinci kişi", "araç verir", "Allah’ın rızası", "infak + ihlas"], tones: [undefined, "b", "c", "c"], detail: ["Eylem düzeyinde paylaşım vardır; niyet beyanı ihlas yorumunu destekler."] },
    { cells: ["İkinci kişi", "araç verir", "yalnız alkış", "infak, ihlas yok"], tones: [undefined, "b", "warn", "muted"], detail: ["Yardım fiili korunduğu için infak kanıtı korunur; niyet düzeyinde ihlas yorumu aynı değildir."] },
  ],
  foot: "İşin özeni değişirse ihsan ilişkisi ayrıca değerlendirilir.",
});

export const religionFigures061Belief: Record<string, Record<string, FigureDef>> = {
  "inanc-ile-ilgili-meseleler": {
    "Önce sorunun eksenini bul": axes,
    "İslam öğretisi ile deizm karşılaştırması": deism,
    "Agnostisizm: bilmenin sınırı": claims,
    "Doğal kötülük": evil,
  },
  "bilgi-ve-inanc": {
    "Üç kaynak birlikte iş görebilir": sources,
    "Mütevatir haber": mutawatir,
    "Bilmek ve benimsemek": knowAccept,
    "Taklidî ve tahkikî edinim": taqlid,
  },
  "kur-anda-gecen-bazi-kavramlar": {
    "Kavram bir anlam ağıdır": conceptAxes,
    "Takva: sorumluluk ve sakınma": taqwa,
    "Cihat ile kıtal aynı genişlikte değildir": jihad,
    "Niyet ve eylem ayrı değişebilir": intentAct,
  },
};
