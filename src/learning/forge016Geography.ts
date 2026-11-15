import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
const s = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const e = (
  title: string,
  prompt: string,
  strategy: string,
  steps: string[],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map((explanation, i) => ({
    label: `${i + 1}. adım`,
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const r = (prompt: string, answer: string) => ({ prompt, answer });
type Authored = LessonGuide & { title: string };
const guides: Authored[] = [
  {
    id: "cografya-kayaclar",
    title: "Kayaçlar: bir taşın geçmişini süreçlerden kur",
    minutes: 70,
    objectives: [
      "Mineral ile kayaç ve üç ana oluşum ailesini ayır.",
      "Soğuma, taşlaşma, başkalaşma ve erime yollarını kanıtla eşleştir.",
      "Kayaç yapısını aşınma ve kullanım bağlamında yorumla.",
    ],
    sections: [
      s(
        "Mineral başka, kayaç başka",
        "Mineral belirli kimyasal ve kristal özellikleri olan doğal bir bileşendir; kayaç bir veya birkaç mineralin ya da bazı doğal camsı/organik malzemelerin oluşturduğu kütledir. Granitte birden fazla mineral ayırt edilebilir. Kayacın adı yalnız rengiyle konmaz; doku, bileşim ve oluşum ilişkisi birlikte okunur.",
        "Coğrafyada magmatik, tortul ve başkalaşım aileleri oluşum sürecine dayanır. Aynı kimyasal madde farklı süreçlerle farklı kayaçlara katılabilir. Bir örneğin hangi ailede olduğunu seçerken sorudaki kanıtı, örneğin yavaş soğuma veya tabakalaşma bilgisini kullan; bir fotoğrafın rengi tek başına yeterli değildir.",
      ),
      s(
        "Magmanın soğuduğu yer dokuyu değiştirir",
        "Magma yer kabuğunun içinde yavaş soğursa kristaller büyümek için daha çok zaman bulabilir. Granit, siyenit, diyorit ve gabro derinlik kayaçlarına örnektir. Yavaş soğuma–iri kristal ilişkisi, bileşim koşulları da dikkate alınarak okunur; bütün derinlik kayaçlarının aynı mineralden oluştuğu sonucu çıkmaz.",
        "Yüzeye çıkan lav daha hızlı soğur; bazalt ve andezit gibi yüzey kayaçlarında doku çoğunlukla daha incedir. Obsidiyen çok hızlı soğumayla camsı yapı kazanır; iri kristal zorunluluğu yoktur. Süngertaşının gözenekleri gaz çıkışıyla, tüf ise püsküren parçaların birikip pekişmesiyle ilişkilidir. Tüf sıradan akarsu tortusu sanılmaz.",
      ),
      s(
        "Taneler taşınır, tortul kayaç taşlaşır",
        "Fiziksel ya da kırıntılı tortul kayaçlarda daha eski kayaçlardan kopan taneler taşınıp birikir; sıkışma ve doğal çimentolanma ile kayaçlaşır. Kum taşı, kil taşı ve çakıl taşı tanelerin boyutu ve yapısıyla ayırt edilir. Tortu gevşek malzeme, tortul kayaç ise taşlaşmış üründür.",
        "Tabakalar değişen birikim ortamlarını kaydedebilir; tortul kayaçlarda fosil korunabilir. Fakat her tortul kayaçta fosil bulunmaz ve fosilsiz bir taşın magmatik olduğu kesinleşmez. Kayaç katmanının göreli yaşı ile içindeki yeniden taşınmış parçanın yaşı farklı olabilir; tek bir fosil fotoğrafından bütün araziyi yaşlandırma.",
      ),
      s(
        "Çökelme ile organik birikimi ayır",
        "Kimyasal tortullar, suda çözünmüş maddelerin uygun koşullarda çökelmesiyle gelişir. Jips, kaya tuzu ve traverten örneklerdir; hepsinin bileşimi kalsiyum karbonat değildir. Buharlaşma suyu azaltıp çözeltinin doygunluğunu artırabilir, fakat çökelme mekanizması mineral ve koşula bağlıdır.",
        "Mercan iskeletleri, tebeşir ve bitkisel kalıntılardan gelişen kömürler organik/biyojenik köken ilişkisini gösterir. Kireç taşının kimyasal veya biyojenik katkılı türleri vardır; yalnız adını görüp her örneğe tek bir ayrıntılı geçmiş atama. Kaynakta kullanılan okul gruplaması ile gerçek örneğin karma oluşumunu ayır.",
      ),
      s(
        "Başkalaşma erime değildir",
        "Yüksek sıcaklık, basınç ve akışkanların etkisiyle kayaç katı hâlde değişebilir. Kireç taşından mermer, granitten gnays, kum taşından kuvarsit ve kilce zengin uygun kayaçlardan şist gelişmesi okul örnekleridir. Yeni mineral ve doku oluşabilir; başlangıç kayacı ve koşul sonucu belirler.",
        "Kayaç tümüyle erirse magma aşamasına geçer; sonradan soğuyan ürün magmatiktir. Bu yüzden mermer oluşumunu kalkerin eritilip tekrar dondurulması diye anlatma. Şistte yönlü doku görülebilir, ancak bütün başkalaşım kayaçları aynı yapraklanmayı göstermez; mermer bunun iyi bir karşı örneğidir.",
      ),
      s(
        "Döngü tek bir sıra değildir",
        "Bir kayaç ayrışıp tortuya dönüşebilir, tortu taşlaşabilir; herhangi bir kayaç uygun koşullarda başkalaşabilir veya eriyebilir. Magma soğuyarak yeni magmatik kayaç oluşturur. Döngü çizgisindeki her okun adı fiziksel bir süreçtir, bütün kayaçlar bütün durakları aynı sırayla geçmek zorunda değildir.",
        "Taşlaşma ile soğuma, başkalaşma ile erime ayrı oklardır. Laboratuvarda süreç seçmek yalnız bir temsilî yolu gösterir; süreler, derinlikler ve gerçek saha hızları hesaplanmaz. Önce ürünü tahmin et, sonra ok üzerindeki süreç ile kayacın dokusunu karşılaştır. Bu keşif sınav başarısı veya XP oluşturmaz.",
      ),
      s(
        "Kayaç direnci araziyi etkiler",
        "Farklı dirençte tabakalar aynı dış koşullarda farklı hızla aşınabilir. Tüf üzerindeki daha dayanıklı başlık, peribacası sütununun korunmasına yardım eder. Karstta kireç taşı ve jips gibi uygun kayaçlar çözünür; granit blokların ayrışıp açığa çıkması tor topoğrafyasıyla ilişkilidir.",
        "Direnç tek başına bütün şekli belirlemez; çatlaklar, su, iklim, eğim ve süreç geçmişi de önemlidir. Bazalt sütunlarının çokgen çatlakları lavın soğuyup büzülmesiyle ilişkilidir. Her sütunu akarsu oyması veya her dik yamacı aynı kayaç olarak okumak, malzeme ile etkeni karıştırır.",
      ),
      s(
        "Kullanım kararını özelliğe bağla",
        "Mermer yapı ve süslemede, granit dayanıklı kaplamalarda, andezit kaplama ve yol işlerinde, jips yapı ürünlerinde kullanılabilir. Kömür enerji kaynağıdır; kayaçların sanayideki önemi bileşimi ve fiziksel özellikleriyle bağlantılıdır. Tek bir kullanım alanı, oluşum ailesini bütün ayrıntılarıyla kanıtlamaz.",
        "Bir soru çözerken önce köken, sonra doku ve son olarak kullanım kanıtını sırala. Fosil varsa korunan canlı izini; iri kristal varsa soğuma bağlamını; çözünme varsa mineral koşulunu sorgula. Taşın adı verilmediyse kanıtın izin verdiğinden daha kesin bir ad yazma; olası aileyi gerekçesiyle seç.",
      ),
    ],
    examples: [
      e(
        "İri kristalin izi",
        "Yer altında yavaş soğuyan magmada iri kristaller gelişmiştir. Hangi aile ve alt grup desteklenir?",
        "Önce süreç, sonra konum seç.",
        [
          "Soğuyup katılaşma magmatik oluşumdur.",
          "Yer altında yavaş soğuma derinlik grubunu destekler.",
          "Granit bu gruba örnektir; yalnız bu veriden örneğin kesin granit olduğu söylenmez.",
        ],
        "Magmatik derinlik kayacı.",
        "İri kristal tek başına bütün kimyasal bileşimi vermez.",
        "Her iri kristalli taşı granit ilan etmek.",
      ),
      e(
        "Erimeden dönüşüm",
        "Kalker yüksek sıcaklık ve basınç altında katı hâlde yeniden kristalleşmiştir. Ürün ve süreç nedir?",
        "Faz değişimini kontrol et.",
        [
          "Başlangıç kalkerdir.",
          "Katı hâlde yeniden kristalleşme başkalaşmadır; magma oluşmamıştır.",
          "Okul eşleştirmesinde kalker mermer olur.",
        ],
        "Mermer; başkalaşım.",
        "Eriyen kayacın sonraki soğuma ürünü farklı bir yoldur.",
        "Başkalaşmayı erime diye açıklamak.",
      ),
      e(
        "Kumun iki yolu",
        "Kum önce birikip çimentolanıyor; oluşan kayaç daha sonra erimeden başkalaşıyor. İki ürünü sırala.",
        "Her oku ayrı adlandır.",
        [
          "Kumun taşlaşması kum taşını oluşturur.",
          "Kum taşı kırıntılı tortul kayaçtır.",
          "Uygun başkalaşma koşullarında kuvarsit gelişebilir.",
        ],
        "Kum taşı → kuvarsit.",
        "İlk ok çimentolanma, ikinci ok katı hâlde değişimdir.",
        "İki aşamayı tek magmatik olay sanmak.",
      ),
      e(
        "Şapka mı, malzeme mi?",
        "Yumuşak tüfün üstünde dayanıklı blok kalmış; çevre yüzey akışıyla daha hızlı oyulmuştur. Sütunun biçimlenmesini açıkla.",
        "Malzemenin kökeni ile güncel süreci ayır.",
        [
          "Tüf volkanik kökenli malzemedir.",
          "Dayanıklı üst parça altındaki tüfü görece korur.",
          "Çevrenin farklı hızla aşınması sütun biçimini destekler.",
        ],
        "Volkanik malzeme üzerinde dış aşındırma ile peribacası gelişimi.",
        "Güncel biçimi yalnız volkanın püskürmesi yapmamıştır.",
        "Kayacın üretildiği süreç ile son şekli özdeşleştirmek.",
      ),
    ],
    recall: [
      r(
        "Mermer oluşurken kalker mutlaka erir mi?",
        "Hayır; başkalaşma katı hâlde gerçekleşir.",
      ),
      r(
        "Her tortul kayaç fosilli midir?",
        "Hayır; fosil korunabilir, fakat zorunlu değildir.",
      ),
      r(
        "Obsidiyenin camsı dokusu neyi destekler?",
        "Kristal büyümesine az zaman bırakan çok hızlı soğumayı.",
      ),
      r(
        "Tortu ile tortul kayaç farkı?",
        "Gevşek birikim ile taşlaşmış ürün arasındaki farktır.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Kayaçlar ve Türkiye’de İç Kuvvetler PDF s. 10; MEBİ TYT Coğrafya Konu Özetleri PDF s. 66–67; Aurelia 012 Kayaçlar 7 sayfa temelinde özgün öğretim. Ham kaynaklar yayımlanmamıştır; örnek ve sorular özgündür.",
  },
  {
    id: "turkiye-ic-kuvvetler",
    title: "Türkiye’de iç kuvvetler: faydan dağ kuşağına kanıt oku",
    minutes: 75,
    objectives: [
      "Türkiye’de kıvrım, kırık, volkanizma ve geniş ölçekli yükselmeyi ayır.",
      "Batı Anadolu gerilmesi ile kuzey/doğu yanal faylarını karşılaştır.",
      "Yapısal kökeni dış süreçlerle ve deprem tahminiyle karıştırma.",
    ],
    sections: [
      s(
        "Birden fazla yaş ve süreç birlikte",
        "Türkiye Alp–Himalaya kuşağında, Afrika, Arabistan ve Avrasya levhalarının etkileşim alanındadır. Özellikle Senozoyik hareketler ana dağ kuşakları ve genç yüzey şekillerinde önemlidir. Bununla birlikte daha eski kayaç ve temel alanlar bulunur; bütün taşların veya bütün arazinin aynı yaşta olduğu söylenemez.",
        "Bir dağın bugünkü biçimi tek olayın fotoğrafı değildir. Önce tortu birikebilir, sonra sıkışıp yükselir, daha sonra akarsu veya buzul tarafından işlenir. Kayaç yaşı, dağ oluşumu ve bugünkü aşınma yaşı birbirinden ayrılır. Aynı bölgede iç ve dış süreçler art arda ve birlikte iz bırakabilir.",
      ),
      s(
        "Kıvrım kuşakları ve sıkışma",
        "Tetis havzalarında biriken tortuların levha yakınsamasıyla sıkışması, Kuzey Anadolu Dağları ve Toroslar gibi ana kuşakların oluşum geçmişinde önemlidir. Tabakaların antiklinal ve senklinal geometrisi kıvrımlanmayı gösterebilir; sıkışma yalnız dikey itme olarak çizilmez.",
        "Genel doğu–batı uzanışı birçok yerde görülse de her sırtın bire bir aynı doğrultuda olması gerekmez. Bir haritada yüksek alan görmek tek başına kıvrım kanıtı değildir; tabaka yapısı, konum ve kaynak açıklaması gerekir. Volkan konisi de yüksek olabilir; yükseklik ile köken aynı sınıflama değildir.",
      ),
      s(
        "Batı Anadolu’da gerilme ve bloklar",
        "Batı Anadolu’daki yaygın gerilme, normal faylar boyunca göreli yükselen horstlar ve çöken grabenlerle ilişkilidir. Gediz, Küçük ve Büyük Menderes doğrultularındaki alçak koridorlar, aradaki dağ sıralarıyla birlikte okunur. Yapısal çukur daha sonra alüvyonla dolabilir.",
        "Madra, Yunt, Bozdağlar ve Aydın Dağları kırık dağ örnekleridir. Her graben bir delta değildir: delta için kıyıda akarsu tortusunun birikmesi gerekir. Aynı ovanın tabanında tektonik çökme ve yüzeyinde birikim izleri bulunabilir; iki doğru açıklama farklı aşamaları anlatıyor olabilir.",
      ),
      s(
        "Kuzey ve doğuda yanal hareket",
        "Kuzey Anadolu ve Doğu Anadolu fay sistemlerinde önemli hareket bileşeni doğrultu atımlı, yani yanal kaymadır. Basitleştirilmiş üstten çizimde bloklar fay boyunca birbirine göre yer değiştirir. Bu oklar bütün arazinin düşey çökmesini veya her yerde aynı fay düzlemini göstermez.",
        "Batı Anadolu’daki normal fay kesitiyle yanal fay üstten görünüşünü aynı ok gibi okuma. Deprem gerilim birikimi ve ani kırılmayla ilişkilidir; fayın bilinmesi tam gün, saat ve büyüklük kestirimi sağlamaz. Güncel tehlike ve yapı güvenliği, ders şemasının ötesinde uzman değerlendirmesi gerektirir.",
      ),
      s(
        "Geniş alanlı yükselme ve göreli deniz",
        "Anadolu’nun birçok yerinde yüksek düzlükler ve akarsuların derine yardığı yüzeyler, geniş ölçekli yükselme geçmişiyle ilişkilidir. Epirojenez okul dilinde geniş alanlı dikey hareketleri anlatır. Tek bir plato fotoğrafından bütün ülkenin aynı anda ve aynı miktarda yükseldiği sonucu çıkarılamaz.",
        "Kıyı taraçası eski kıyı seviyesinin bugüne göre konumunu kaydeder. Göreli deniz düzeyi kara hareketinden veya deniz düzeyi değişiminden etkilenebilir; yalnız taraçayı görmek tek nedeni ispatlamaz. Ege ve boğazların uzun gelişimi, bir anda çöken tek kara parçası şeklinde öğretilmez.",
      ),
      s(
        "Volkanik yerleri ada göre değil yapıya göre",
        "Ağrı, Süphan, Tendürek, Erciyes, Hasan ve Karacadağ volkanik geçmişin örnekleridir. Kula’da koniler ve lavlar, Meke’de maar, Bitlis yakınındaki Nemrut’ta kaldera volkanik farklı biçimleri gösterir. Krater, maar ve kaldera aynı oluşum ayrıntısına sahip değildir.",
        "Bitlis’teki Nemrut volkanı ile Adıyaman’daki Nemrut Dağı’nı karıştırma. Bir volkanın bugün püskürmemesi gelecekte hiçbir etkinlik ihtimali olmadığı anlamına gelmez; kaynaklarda geçen aktiflik terimi zaman penceresine bağlıdır. Laboratuvar güncel volkan veya deprem tahmini üretmez; yalnız verilen oluşum kanıtını açıklar.",
      ),
      s(
        "İç kuvvet üzerine dış işleme",
        "Tektonik yükselme eğimi ve akarsuların işleyebileceği yüksekliği artırabilir; lavlar aşınmaya sunulan yeni malzeme oluşturur. Ardından sular, rüzgâr ve buzullar bu yüzeyi aşındırıp başka yerde biriktirir. Bu nedenle bir yüzeyin malzemesi volkanik, biçimlenmesi akarsu kökenli olabilir.",
        "Bir ovanın düz olması tek başına epirojenez veya tektonik çökme ispatı değildir. Çökme kanıtı fay geometrisinde, birikim kanıtı tortu düzeninde aranır. Aynı düzlüğün hem tektonik hem alüvyal niteliği olabilir. Bir soru tek süreç istiyorsa hangi aşamayı sorduğunu belirle.",
      ),
      s(
        "Harita ölçütü ve güvenilir sınır",
        "Laboratuvardaki Türkiye anahtarı yalnız bölgeleri seçtiren yer şemasıdır; gerçek fay koordinatı, risk haritası veya ölçülü arazi kesiti değildir. Seçilen kanıtın altında hareket yönü ve beklenen yapı ayrı gösterilir. Dışarıda bırakılan karmaşık bölgesel ayrıntılar bütün ülkeye yok sayılmaz.",
        "Bir kanıttan bir sonuç kur: tabaka bükülmesi kıvrım, yanal ötelenme yanal fay, blok çökmesi normal fay, lav ve kül volkanizma. Yalnız yüksekliğe bakarak volkan; yalnız düzlüğe bakarak delta deme. Tahminini süreç kanıtına bağladığında benzer görünen arazilerin farklı geçmişlerini ayırt edebilirsin.",
      ),
    ],
    examples: [
      e(
        "Gediz’de iki aşama",
        "Faylarla sınırlı bir çöküntünün tabanını daha sonra akarsuların tortuları dolduruyor. Ova yalnız akarsu mu yalnız tektonik mi?",
        "Oluşum aşamalarını sırala.",
        [
          "Faylarla göreli çökme yapısal çanağı oluşturur.",
          "Tortuların gelmesi tabanı doldurup düzleştirir.",
          "İlk yapısal köken ile sonraki alüvyal örtü birlikte doğrudur.",
        ],
        "Tektonik çukur üzerine akarsu birikimi.",
        "İki açıklama farklı aşamalardır.",
        "Düz bir yüzeyi mutlaka delta saymak.",
      ),
      e(
        "Okun bakış yönü",
        "Üstten çizimde fayın iki yanındaki bloklar fay boyunca ters yönlere kayıyor. Gösterilen temel hareket nedir?",
        "Kesit ile üstten görünüşü ayır.",
        [
          "Görünüş üsttendir.",
          "Oklar fay boyunca yataydır.",
          "Temel kanıt doğrultu atımlı göreli kaymayı destekler.",
        ],
        "Yanal fay hareketi.",
        "Bu çizimden zorunlu bir graben çıkarılmaz.",
        "Yatay okları düşey çökme sanmak.",
      ),
      e(
        "İki Nemrut",
        "Bir kartta Bitlis’te geniş kaldera, diğerinde Adıyaman’da tarihî anıtlar yazıyor. Volkanik örnek için hangisi uygundur?",
        "Aynı adı konumla ayır.",
        [
          "Ad benzerliği aynı dağı göstermez.",
          "Bitlis’teki Nemrut kalderası volkanik yapıdır.",
          "Adıyaman’daki anıt alanını bu veriyle volkan diye etiketleme.",
        ],
        "Bitlis yakınındaki Nemrut volkanı.",
        "İl ve yer şekli kanıtı birlikte gerekir.",
        "Yalnız ada bakarak iki yeri eşitlemek.",
      ),
      e(
        "Eski kıyının yüksekliği",
        "Bugünkü denizin üstünde eski dalga aşınım yüzeyi görülüyor. Deniz düzeyi ayrıca verilmemiş. Tek neden kesinleşir mi?",
        "Göreli değişimi tek nedene indirme.",
        [
          "Eski kıyı bugünkü denize göre daha yüksektir.",
          "Kara yükselmesi veya deniz alçalması gibi göreli değişimler bunu açıklayabilir.",
          "Ek tarih ve düzey verisi olmadan tek nedeni kesin seçemeyiz.",
        ],
        "Göreli kıyı düzeyi değişimi; tek neden için ek veri gerekir.",
        "Taraça, bütün ülkenin aynı anda yükseldiğini göstermez.",
        "Kanıtın izin verdiğinden kesin bir tarih ve neden uydurmak.",
      ),
    ],
    recall: [
      r(
        "Horst–graben için temel bağlam?",
        "Gerilme ve normal faylarla göreli yükselen–çöken bloklar.",
      ),
      r(
        "Fay haritası deprem gününü verir mi?",
        "Hayır; tehlike bilgisi tam zaman tahmini değildir.",
      ),
      r(
        "Toroslar ile Ağrı’nın kökeni aynı mı?",
        "Toroslar kıvrım kuşağı, Ağrı volkanik köken örneğidir.",
      ),
      r(
        "Taraçada tek neden kesin midir?",
        "Hayır; kara ve deniz düzeyi geçmişi birlikte araştırılır.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Kayaçlar ve Türkiye’de İç Kuvvetler PDF s. 11; MEBİ TYT Coğrafya Konu Özetleri PDF s. 75; Aurelia 013 Türkiye’de İç Kuvvetler 7 sayfa ile karşılaştırılmış özgün öğretim. Şemalar güncel fay/risk tahmini değildir.",
  },
  {
    id: "dis-kuvvetler-akarsular",
    title: "Akarsular: kesitten debiye, virajdan deltaya",
    minutes: 85,
    objectives: [
      "Debi, hız, eğim ve rejimi birimlerle ayır.",
      "Aşındırma, taşıma ve birikimi aynı akarsu üzerinde izle.",
      "Vadi, menderes, taraça ve delta için gerekli kanıtı seç.",
    ],
    sections: [
      s(
        "Kaynak, yatak, ağız ve havza",
        "Akarsu belirli yatak boyunca akan sudur; sürekli, mevsimlik veya geçici olabilir. Doğduğu alan kaynak, aktığı çukur yatak, göle ya da denize ulaştığı yer ağızdır. Havza ana kol ve kollarının sularını topladığı alandır; su bölümü çizgisi komşu havzaları ayırır.",
        "Açık havza denize yüzeysel çıkış sağlayabilir; kapalı havza denize ulaşmayan bir iç çanağa yönelir. Açık havzadaki her damla denize varmaz: buharlaşma, sızma ve kullanım da vardır. Bir çizimde sağa akan suyun doğuya aktığı söylenmez; yön için pusula veya harita bilgisi gerekir.",
      ),
      s(
        "Debi ile hız aynı nicelik değildir",
        "Debi bir kesitten birim zamanda geçen su hacmidir; m³/s ile verilir. Ortalama hız m/s, kesit alanı m² ile veriliyorsa uygun kesit ortalaması için Q = A × v yazılır. Dikdörtgen kesit kabulünde alan genişlik × ortalama derinliktir; gerçek düzensiz kesitte alan ayrıca ölçülür.",
        "Aynı debi farklı alan ve hızlarla oluşabilir. Geniş kesitte yavaş akan bir nehir, dar kesitte hızlı akanla eşit hacim taşıyabilir. Laboratuvar alan ve ortalama hızı bağımsız verilen özgün ideal kesittir; eğimi değiştirince gerçek hızı otomatik hesaplayan bir hidrolik tahmin değildir.",
      ),
      s(
        "Rejim bir dizi ölçüm ister",
        "Rejim debinin yıl içindeki değişimidir. Yağmur, kar ve buzul erimesi, yer altı beslenmesi, buharlaşma, havza büyüklüğü ve zemin rejimi etkiler. Bir ilkbahar ölçümü yalnız o zamanı gösterir; yıllık düzen için farklı aylardaki ölçümler gerekir.",
        "Aylık debi grafiğinin sütunu m³/s olabilir; bu değer aylık toplam su hacmiyle aynı şey değildir. Hacme çevirmek için süre gerekir. Düzenli rejim, her saniyenin bire bir aynı debide olduğu anlamına gelmez; yıl içi değişimin görece sınırlı olması anlamında kullanılır.",
      ),
      s(
        "Eğim, yük ve aşındırmanın yönü",
        "Akarsu yatağını derine, yana ve geriye aşındırabilir. Yatak eğimi, su miktarı, yük ve tane boyu, kayaç direnci ve bitki örtüsü birlikte etkilidir. Büyük eğim çoğu durumda güçlü enerji potansiyelini destekler; yalnız eğimden kesin akış hızı veya aşınan ton miktarı çıkarılmaz.",
        "İki nokta arasında eğim yüzdesi, yükseklik farkının aynı birimdeki yatay uzaklığa oranının yüz katıdır. Taban seviyesi genel olarak deniz ya da yerel göl gibi sınırlarca etkilenir. Denge profili ideal uzun dönem yaklaşımıdır; akarsu bir anda tamamen durmaz veya bütün aşındırması sıfırlanmaz.",
      ),
      s(
        "Vadilerde şekil ile yapıyı birleştir",
        "Kertik vadide derine aşınma ve dar V kesiti, boğaz vadide yüksek alanı yarma, kanyonda dirençli veya uygun yatay tabakalı yapılarda derin dik/basamaklı yamaçlar öne çıkar. Geniş tabanlı vadide yana aşınma ve alüvyal taban belirgindir; asimetrik vadide yamaçlar farklı özellik gösterir.",
        "Şelalede eğim kırığı, altında dev kazanında oyulma aranır. Plato akarsularla yarılmış görece yüksek düzlük; peneplen uzun aşınmayla taban seviyesine yaklaşmış yüzeydir. Yalnız tek bir çizgiden kayaç türü, kesin yaş veya oluşum hızı seçilmez; soruda verilen yapı kanıtı gerekir.",
      ),
      s(
        "Menderesin iki kıyısı iki işi yapar",
        "Menderes kıvrımının dış kıyısında daha hızlı akışla aşınma, iç kıyısında görece yavaş akışla birikim görülebilir. Böylece aynı kesimde hem aşındırma hem biriktirme gerçekleşir. Bürokratik bir tek kutu seçmek yerine, hangi kıyıda hangi işin yapıldığını tarif et.",
        "Büklümlü yol aynı iki uç arasında uzunluğu artırır; eğimi az alanlarda yana işleme önemlidir. Ancak menderesli her akarsuyun bütün yatağında hız ve aşınma aynı değildir. İç banktaki kum birikimini dış banktaki oyulmayla karıştırma; şemanın akış oku ve virajın merkezini birlikte izle.",
      ),
      s(
        "Birikim şekli konuma bağlıdır",
        "Dağdan düzlüğe çıkışta birikinti konisi veya daha yayvan yelpaze gelişebilir; yan yana birleşmeleri dağ eteği ovasına katkı verir. Dağ içindeki çukurlar tortuyla dolabilir; yatak içinde biriken alüvyon ırmak adası oluşturabilir. Birikim koşulları su ve tane taşınabilirliğindeki değişimle ilişkilidir.",
        "Deltada akarsu ağzına getirilen tortunun kıyıda yeterince tutulması gerekir. Sığ kıyı, tortu beslenmesi ve deniz hareketlerinin etkisi birlikte değerlendirilir. Çok güçlü kıyı taşınımı birikimi uzaklaştırabilir; akarsu ağzı görmek delta varlığını tek başına kanıtlamaz. Delta deniz yanında göl kıyısında da oluşabilir.",
      ),
      s(
        "Taraça ve direnç farkının geçmişi",
        "Akarsu eski tabanını yeniden yarıp aşağı gömüldüğünde eski yüzeyler kenarlarda taraça basamakları olarak kalabilir. Taban seviyesi veya yükselme değişimi olası nedenlerdendir. Her basamak bir tortu yığını değildir; eski birikim yüzeyi sonradan aşınmış olabilir.",
        "Seyrek bitkili, kolay aşınan yüzeylerde sel yarıntıları kırgıbayır geliştirir; farklı dirençte malzemelerde peribacası ortaya çıkabilir. Malzemenin volkanik oluşu ile şeklin dış aşındırmayla gelişmesi ayrı aşamalardır. Sonucunu yer adı ezberinden önce süreç ve verilen koşulla kur.",
      ),
    ],
    examples: [
      e(
        "Kesitten hacme",
        "İdeal dikdörtgen kesit 8 m genişlikte ve ortalama 2 m derinliktedir. Kesit ortalama hızı 1,5 m/s verilmiştir. Debi nedir?",
        "Önce alan, sonra hacim/zaman.",
        [
          "Alan 8 × 2 = 16 m².",
          "Q = 16 × 1,5 = 24 m³/s.",
          "Bu bir saniyedeki hacimdir; hızın birimi m/s olarak ayrı kalır.",
        ],
        "24 m³/s.",
        "24 ÷ 16 = 1,5 m/s ile geri denetle.",
        "Genişliği tek başına kesit alanı sanmak.",
      ),
      e(
        "Eğimin birimi",
        "İki nokta arasında düşey fark 120 m, yatay uzaklık 6 km. Eğim yüzdesi kaçtır?",
        "Önce uzaklığı aynı birime çevir.",
        [
          "6 km = 6000 m.",
          "Eğim = 120 / 6000 × 100.",
          "Sonuç yüzde 2; derece değil yüzde olarak yazılır.",
        ],
        "%2.",
        "6000 metrenin yüzde 2’si 120 metredir.",
        "Kilometreyi çevirmeden 120/6 yapmak.",
      ),
      e(
        "Bir virajda iki iş",
        "Menderesin X dış bankında oyulma, Y iç bankında kum yığılması gözleniyor. Ortak süreç nasıl anlatılır?",
        "Gözlem yerlerini ayır.",
        [
          "X dış kıyı aşınma kanıtıdır.",
          "Y iç kıyı birikim kanıtıdır.",
          "Akarsu aynı anda farklı yerlerde iki işi yapabilir.",
        ],
        "X’te aşındırma, Y’de biriktirme.",
        "Tek bir menderese yalnız biriktirme etiketi vermek yetersizdir.",
        "Dış ve iç kıyıları ters çevirmek.",
      ),
      e(
        "Delta bütçesi",
        "Özgün ideal örnekte yılda 120 birim tortu ağza geliyor, 90 birim kıyı akıntısıyla ayrılıyor. Başka giriş/çıkış yok. Net birikim nedir?",
        "Girişten çıkışı çıkar.",
        [
          "Giriş 120 birimdir.",
          "Kıyıdan ayrılan 90 birim kayıptır.",
          "Net 120 − 90 = 30 birim tutulur.",
        ],
        "30 birim net tortu tutulur.",
        "Bu ideal bütçe tek başına gerçek delta büyüklüğü veya kıyı çizgisi vermez.",
        "Gelen bütün tortunun kıyıda kaldığını varsaymak.",
      ),
    ],
    recall: [
      r(
        "Q = A × v hangi birimlerle?",
        "m² × m/s = m³/s; hız kesit ortalamasıdır.",
      ),
      r(
        "Rejim için tek ölçüm yeterli mi?",
        "Hayır; zaman içindeki debi örüntüsü gerekir.",
      ),
      r(
        "Menderesin dış bankı?",
        "Genel öğretim şemasında aşınma; iç bankında birikim.",
      ),
      r(
        "Her akarsu ağzı delta mı?",
        "Hayır; tortunun kıyıda tutulması için ek koşullar gerekir.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Akarsular PDF s. 14–15; MEBİ TYT Coğrafya Konu Özetleri PDF s. 69–71; Aurelia 014 Akarsular 7 sayfa temelinde özgün öğretim. Kesit, debi ve tortu sayıları ideal öğretim verisidir.",
  },
  {
    id: "karstik-sekiller",
    title: "Karstik şekiller: çözünmeden mağara sütununa",
    minutes: 70,
    objectives: [
      "Çözünmeye elverişli kayaç, çatlak ve su koşullarını ilişkilendir.",
      "Aşınım şekilleri ile çökelme şekillerini yerinde ayır.",
      "Yüzey–yer altı akışı ve çökme kanıtlarını karşılaştır.",
    ],
    sections: [
      s(
        "Karst için malzeme ve su birlikte gerekir",
        "Kalker, jips ve kaya tuzu gibi çözünmeye elverişli kayaçlar üzerinde suyun etkisiyle karstik şekiller gelişebilir. Kalkerle ilgili yaygın süreçte suya karışan karbondioksit çözünmeyi destekler. Her kayaç aynı hızla çözünmez; kayacın saflığı, çatlaklar, suyun kimyası ve iklim etkilidir.",
        "Karstı yalnız yer altına indirme: yüzeyde oluk ve çukurlar, yer altında boşluk ve akış ağı olabilir. Her mağara karstik değildir; lav tüpü veya dalga mağarası farklı süreçle oluşur. İlk iş şeklin adını ezberlemek değil, malzemenin yerinden çözünüp uzaklaştığını mı, yoksa çökelip eklendiğini mi belirlemektir.",
      ),
      s(
        "Lapya, dolin ve birleşen çukurlar",
        "Lapya kaya yüzeyindeki küçük çözünme oluklarıdır. Dolin karstik arazide çözünme veya çökme katkısıyla gelişebilen kapalı çanaktır. Dolinlerin birleşmesi daha büyük ve düzensiz uvalalar oluşturabilir. Bu adlar yalnız mutlak derinliğe göre sıralanan cetvel aralıkları değildir.",
        "Polye geniş, çoğunlukla düz tabanlı karstik kapalı alanı anlatır; yerel yapı ve tektonik de biçimlenmesine katılabilir. Her polye zorunlu olarak tek bir çizgisel dolin–uvala büyümesinin sonucu değildir. Düz tabanı görmek onu otomatik akarsu deltası yapmaz; kapalı çanak, kayaç ve drenaj bilgisi birlikte değerlendirilir.",
      ),
      s(
        "Düden ve kör vadinin akışını izle",
        "Düden yüzey suyunun yer altına girdiği açıklık veya çatlak sistemiyle ilişkilidir. Akarsu yüzeyde ilerlerken yer altına geçip yüzey vadisi orada sonlanıyorsa kör vadi düşünülebilir. Suyun gözden kaybolması suyun yok olması anlamına gelmez; yer altı akışına katılmış olabilir.",
        "Karstik kaynakta su yeniden yüzeye çıkabilir. Girişle kaynak arasında görülen yakınlık tek başına kesin bağlantıyı veya yolculuk süresini vermez; izleme çalışması gerekir. Geçirgen çatlaklı arazide yüzey akışı görece azalabilir, fakat karstın bulunduğu her yerde hiç yüzey suyu olmadığını söylemek yanlıştır.",
      ),
      s(
        "Mağara, galeri ve obruk aynı şey değil",
        "Yer altında çözünmeyle genişleyen boşluk mağara; bağlantılı geçitler galeri olarak adlandırılır. Tavanın taşıyıcılığını yitirmesiyle çökme çukurları gelişebilir. Obruk derin kapalı çukur biçimidir; çözünme ve çökme süreçlerinin payı örneğe göre değişir.",
        "Yer altı su düzeyinin insan etkisiyle değişmesi bazı hassas alanlarda çökme riskini etkileyebilir; bundan her obruğun tek başına pompalamayla oluştuğu sonucu çıkmaz. Şema bir risk tahmini veya güvenli yapı yeri belirleme aracı değildir. Bir çukurun fotoğrafından kesin yaş ve güncel çökme zamanı hesaplanmaz.",
      ),
      s(
        "Çökelme yeni madde ekler",
        "Kalsiyum karbonatça zengin su uygun doygunluk, karbondioksit kaybı ve diğer koşullarda karbonatı çökeltebilir. Mağara yüzeyine veya kaynağın çevresine malzeme eklenir. Bu süreç suyla ilişkili olsa da çözünmenin yaptığı malzeme uzaklaştırmadan farklıdır.",
        "Aynı karst sisteminde bir yerde kayaç çözünürken başka yerde çökelme olabilir. Laboratuvar iki aşamayı ayrı seçtirir; asit düzeyi ile büyüme hızı arasında uydurma nicel bir bağıntı kurmaz. Seçilen şeklin süreç kanıtını yaz: yüzeyden kütle ayrılıyor mu, yüzeye yeni mineral mi ekleniyor?",
      ),
      s(
        "Sarkıt tavandan, dikit tabandan",
        "Tavanda biriken mineral aşağı uzanan sarkıtı; tabanda büyüyen birikim dikiti oluşturabilir. Sarkıt ile dikit birleştiğinde sütun gelişir. Her damla bir sütun yapmaz; çökelme koşulları ve uzun süreli beslenme gerekir.",
        "Yerini sözcükten çok çizimden kontrol et: tavandan sarkan ile tabandan yükseleni karşılaştır. Mağara boşluğu çoğunlukla çözünmeyle açılmışken içindeki sarkıt çökelmeyle büyüyebilir. Aynı fotoğrafta görülen boşluk ve birikim şekline tek bir süreç etiketi vermek yetersizdir.",
      ),
      s(
        "Traverten ve Türkiye örnekleri",
        "Traverten mineralli sudan karbonat çökelmesiyle gelişir; Pamukkale bunun bilinen örneğidir. Basamaklar üzerinde yeni malzeme birikmesi, çözünmeyle açılan mağaradan farklıdır. Beyaz görünüm veya kaynak suyu tek başına her kayayı traverten yapmaz; oluşum bilgisi gerekir.",
        "Toroslar, Teke ve Taşeli, Göller Yöresi, Konya çevresindeki uygun alanlar karst örnekleri içerir. Jips karstı Çankırı–Sivas gibi alanlarda da görülebilir; karst yalnız Akdeniz kıyısına özgü değildir. Bölgesel yaygınlık bütün bölgenin her noktasında aynı kayacın bulunduğu anlamına gelmez.",
      ),
      s(
        "Şemadan koşullu sonuca",
        "Laboratuvardaki kesit gerçek bir mağaranın ölçüsü değildir; seçilen yer şeklinin konum ve süreç ilişkisini büyüterek gösterir. Lapya yüzeyde, düden girişte, mağara yer altında, sarkıt ve dikit boşluğun içinde vurgulanır. Şemanın tamamında anlatılan bütün ayrıntılar ayrıca yazılı kanıtta bulunur.",
        "Soru kökünde oluşum mu, boyut mu, suyun izlediği yol mu sorulduğunu ayır. Karstik şekli adlandırdıktan sonra yakın yanlışı çürüt: dikit tavandan mı, traverten aşınım mı, her mağara çökelme mi? Kuralı bu karşılaştırmayla kullandığında yeni çizimlere de aktarabilirsin.",
      ),
    ],
    examples: [
      e(
        "İç içe iki süreç",
        "Bir mağara boşluğu çözünmeyle genişliyor; tavanında karbonat birikimi aşağı doğru uzuyor. İki süreci adlandır.",
        "Boşluk ve eklentiyi ayır.",
        [
          "Boşluğun genişlemesi kayaç maddesinin uzaklaşmasıdır.",
          "Tavandaki mineral eklenmesi çökelmedir.",
          "Aşağı sarkan birikim sarkıttır.",
        ],
        "Mağarada çözünme; sarkıtta biriktirme.",
        "Aynı sistem iki ayrı süreci içerebilir.",
        "Bütün mağara öğelerini aşınım saymak.",
      ),
      e(
        "Akarsu nerede kayboldu?",
        "Kalkerli arazide yüzey akarsu yatağı bir açıklıkta sonlanıyor; su yer altına geçiyor. İki ad nedir?",
        "Giriş ile sonlanan vadiyi ayır.",
        [
          "Açıklık yer altına su girişidir.",
          "Bu giriş düdenle uyumludur.",
          "Yüzey vadisinin orada sonlanması kör vadiyi destekler.",
        ],
        "Düden ve kör vadi.",
        "Suyun kaybolması buharlaştığı anlamına gelmez.",
        "Kaybolan suyu döngü dışı saymak.",
      ),
      e(
        "Pamukkale’de kütle",
        "Kaynak suyundaki çözünmüş karbonat yamaçta çökelerek basamaklara ekleniyor. Aşınım mı birikim mi?",
        "Kütlenin yerel yönünü oku.",
        [
          "Su çözünmüş madde taşıyor.",
          "Basamak yüzeyine mineral ekleniyor.",
          "Şekil traverten; yerel olay birikimdir.",
        ],
        "Traverten birikimi.",
        "Su etkisi her zaman aşındırma değildir.",
        "Suyla oluşan her şekle erime demek.",
      ),
      e(
        "Tavandaki ve tabandaki",
        "Tavandan aşağı A, tabandan yukarı B büyüyor; zamanla birleşiyorlar. Adlarını sırala.",
        "Bağlantıdan önce konumu kullan.",
        [
          "A tavana bağlıdır: sarkıt.",
          "B tabandan yükselir: dikit.",
          "Birleşmeleri sütun oluşturur.",
        ],
        "A sarkıt, B dikit; birleşince sütun.",
        "İkisi de karbonat birikimi olabilir.",
        "Üçünü ayrı kayaç türü sanmak.",
      ),
    ],
    recall: [
      r(
        "Karst yalnız kalkerde mi olur?",
        "Hayır; jips ve kaya tuzu gibi çözünmeye uygun kayaçlarda da olabilir.",
      ),
      r("Düden neyi gösterir?", "Yüzey suyunun yer altına geçtiği girişi."),
      r(
        "Mağara ile içindeki sarkıt aynı süreç mi?",
        "Boşlukta çözünme, sarkıtta mineral çökelmesi öne çıkar.",
      ),
      r(
        "Her polye delta mıdır?",
        "Hayır; delta ağız birikimi, polye karstik kapalı alanla ilişkilidir.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Yer Altı Suları PDF s. 17–18; MEBİ TYT Coğrafya Konu Özetleri PDF s. 72–73; Aurelia 015 Karstik Şekiller 7 sayfa temelinde özgün öğretim. Kesit ölçülü arazi veya risk modeli değildir.",
  },
  {
    id: "ruzgar-ve-buzul",
    title: "Rüzgâr ve buzul: taşıyıcının izini malzemeden bul",
    minutes: 80,
    objectives: [
      "Rüzgâr ile buzulun aşınım ve birikim kanıtlarını ayır.",
      "Kum, silt ve karışık taneli tortuların anlamını karşılaştır.",
      "Buzul, bankiz, aysberg ve kalıcı kar sınırını bağlamında kullan.",
    ],
    sections: [
      s(
        "Sıcaklık değil, etkin süreç seç",
        "Rüzgâr her iklimde eser; yer şekillendirici etkisi gevşek, kuru ve bitki örtüsü seyrek yüzeylerde daha görünür olabilir. Yüzeyde taşınabilir malzeme, rüzgâr gücü ve nem birlikte önemlidir. Kurak yer görmek bütün aşındırmayı yalnız rüzgâra bağlamaz; ani seller de etkilidir.",
        "Buzul birikmiş karın zamanla sıkışıp buza dönüşmesi ve kütlenin yer çekimiyle akmasıyla ilişkilidir. Buzulun ilerlemesi katı malzemenin hareketidir; erime suyu ayrı bir taşıyıcıdır. Soğuk hava tek başına bütün yüzeyi buzul kapladığını veya her kar yığınının buzul olduğunu kanıtlamaz.",
      ),
      s(
        "Rüzgârın kaldırması ve aşındırması",
        "Deflasyon gevşek malzemenin uzaklaştırılmasıdır; ince taneler ayrılınca iri taşlı yüzey kalabilir. Rüzgârın taşıdığı tanelerin yüzeye çarpması aşındırıcı etki yapar. Mantar kayada alt bölümün daha çok aşınması, yere yakın taşınan kumla ve kayaç direnciyle ilişkilendirilebilir.",
        "Yardangda baskın rüzgâr doğrultusuna uzanan sırt–oluk örüntüsü aranır. Tafoni boşluklarında tuz ayrışması ve başka süreçler de etkili olabilir; her tafoniyi yalnız rüzgâr oyması diye açıklama. Hamada taşlı çöl yüzeyi, ince malzemenin süpürülmesiyle kalan çöl kaldırımı ise daha dar bir süreç tanımıdır.",
      ),
      s(
        "Kumulu lösle karıştırma",
        "Kumullar taşınan kumun uygun yerde yığılmasıyla gelişir. Barkan tek baskın rüzgâr ve sınırlı kum koşullarında hilal biçimiyle tanınabilir; kolları genel olarak taşınma yönüne uzanır. Bütün kumullar aynı şekil veya aynı yön bilgisine sahip değildir.",
        "Lös çoğunlukla silt boyutlu, rüzgârla taşınıp biriken malzemedir; her kumul lös değildir. Laboratuvar kum ile silt ayrımını tane kanıtıyla gösterir; temsilî noktalar gerçek tane çapı ölçümü değildir. Bitki örtüsünün tutucu etkisi kum hareketini azaltabilir, fakat gerçek hareket hızı yalnız örtü yüzdesinden hesaplanmaz.",
      ),
      s(
        "Karın kalıcılığı ve buzun türleri",
        "Kalıcı kar sınırı, karın yıl boyunca kalabilmesinin alt yükselti sınırı için kullanılan ideal kavramdır. Enlem, yükselti, bakı ve yağışla değişir; bütün dünyada sabit metre değildir. Ekvatora yakın yüksek dağlarda da buzullar bulunabilir; yalnız kutup şartı aranmaz.",
        "Örtü buzulu geniş alanları kaplar, takke buzulu dağ üstünü örter; sirk ve vadi buzulları konumla adlandırılır. Aysberg kara buzulundan kopup suda yüzen parçadır. Bankiz deniz suyunun donmasıyla oluşan deniz buzudur; onu vadi kazan kara buzulu ile aynı aşınım etkeni gibi okumamak gerekir.",
      ),
      s(
        "Buzul aşındırır, çizik ve U kesit bırakır",
        "Hareket eden buzul alttaki kayacı söküp taşıyabilir ve içindeki parçalarla yüzeyi aşındırabilir. Sirk dağ başında çanak, tekne biçimli U vadi eski buzul vadisi için önemli kanıtlardır. Çizikler ve cilalı yüzeyler kanıtı güçlendirir; tek bir geniş çukur tek başına kesin buzul teşhisi değildir.",
        "Hörgüç kaya akışa göre farklı işlenmiş yuvarlak kaya yüzeyidir; gelişiminde aşındırma ve koparma birlikte düşünülebilir. Yan vadinin ana vadiye göre yüksekte kaldığı asılı vadi, farklı oyulmayla ilişkilidir. Akarsu V kesitiyle buzul U kesitinin öğretim şeması, her gerçek vadinin kusursuz harf biçiminde olduğu iddiası değildir.",
      ),
      s(
        "Moren ile sanderin taşıyıcısı farklı",
        "Buzul farklı boydaki malzemeleri birlikte taşıyıp doğrudan bıraktığında kötü boylanmış moren birikimi gelişebilir. Drumlinler buzul altındaki akış yönüyle ilişkili uzamış tepelerdir; sadece kaya etrafına rastgele tortu yığılması diye açıklanmaz. Birikimin şekli ve düzeni süreç kanıtıdır.",
        "Buzul erime sularının taşıdığı malzeme buzul önünde daha iyi boylanmış ve tabakalı sander düzlüğü oluşturabilir. Burada başlangıç malzemesi buzulla ilişkili, son taşıyıcı ise akarsudur. Karışık moren ile suyun ayırdığı çakıl–kum tabakalarını karşılaştır; aynı bölgedeki bütün tortulara tek taşıyıcı yazma.",
      ),
      s(
        "Türkiye’de yer ve süreç sınırı",
        "Karapınar ve Iğdır’ın uygun kuru, gevşek kumlu alanları rüzgâr birikimine örnektir. Kaçkar, Ağrı, Aladağlar ve diğer yüksek dağlarda güncel veya eski buzullaşma izleri bulunur. Eski buzul şekli, bugün o noktada mutlaka yaşayan buzul bulunduğunu göstermez.",
        "Türkiye’nin yüksek dağlarında buzullaşma görülmesi denize ulaşan fiyort buzullaşmasını kanıtlamaz. Hamsilos’u yalnız girintili görüntüsü yüzünden fiyort sayma; fiyort için deniz altında kalmış gerçek buzul vadisi gerekir. Yer adı yerine U kesit, çizikler, sirk ve moren gibi oluşum kanıtını ara.",
      ),
      s(
        "İki taşıyıcıyı kanıtla karşılaştır",
        "Laboratuvarda rüzgâr, doğrudan buzul ve erime suyu ayrı seçilir. Aynı malzeme çizimindeki nokta dizisi, taşınan tanelerin göreli düzenini; vadi kesiti ve taşıma oku ise süreç türünü gösterir. Şekiller büyütülmüş, özgün öğretim şemalarıdır; gerçek hız veya geçmiş iklim tarihi ölçümü değildir.",
        "Önce tahmin yaz, sonra malzemenin boylanması ve vadi izini birlikte kontrol et. Kum yığını rüzgârla, kötü boylanmış taşlı yığın doğrudan buzulla, düzenli çakıl–kum tabakaları erime suyuyla uyumlu olabilir. Tek kanıtın başka süreçle de oluşabileceği durumda kesinlik yerine ek gözlem iste.",
      ),
    ],
    examples: [
      e(
        "İki tortu yığını",
        "X’te kil, kum ve iri bloklar karışık; Y’de çakıl ve kum tabakaları ayrılmış. İkisi buzul önünde. Hangi taşıyıcılar desteklenir?",
        "Başlangıç ortamını son taşıyıcıdan ayır.",
        [
          "X kötü boylanmıştır; doğrudan buzul birikimiyle uyumludur.",
          "Y suyla taşınmada boylanma ve tabakalanma göstermektedir.",
          "Buzul önündeki Y için erime suyu sanderi desteklenir.",
        ],
        "X moren; Y erime suyu birikimi.",
        "Buzul yakınlığı bütün tortuyu doğrudan buzun bıraktığını kanıtlamaz.",
        "Her iki yığına aynı tane düzenini yüklemek.",
      ),
      e(
        "Barkan ile lös",
        "A kum boyutlu hilal tepe; B silt ağırlıklı yaygın rüzgâr örtüsüdür. Adlandır.",
        "Şekil ve tane boyunu birlikte kullan.",
        [
          "A’da hilal biçimi ve kum vardır.",
          "Bu barkan kumuluyla uyumludur.",
          "B’de silt örtüsü lösü destekler.",
        ],
        "A barkan; B lös.",
        "Her rüzgâr tortusu kum değildir.",
        "Lösü kumul şeklinin başka adı saymak.",
      ),
      e(
        "Buz mu deniz buzu mu?",
        "X dağdaki buzuldan kopup denizde yüzen parça; Y deniz suyunun donmuş yüzeyidir. Ayır.",
        "Buzun nerede oluştuğunu izle.",
        [
          "X kara buzulundan gelmiştir.",
          "X aysbergdir.",
          "Y deniz buzudur; bankiz olarak adlandırılır.",
        ],
        "X aysberg, Y bankiz.",
        "Y’yi U vadi kazan dağ buzulu gibi kullanma.",
        "Yüzdüğü için ikisini aynı kökenli saymak.",
      ),
      e(
        "Eski buzulun izi",
        "Yüksek dağda U vadi, kaya çizikleri ve karışık taneli sırt var; bugün buzul gözlenmiyor. Ne çıkar?",
        "Geçmiş kanıtı güncel durumdan ayır.",
        [
          "U kesit ve çizikler aşındırma izleridir.",
          "Karışık sırt morenle uyumlu olabilir.",
          "Bunlar geçmiş buzullaşmayı destekler; bugün buzul varlığını zorunlu kılmaz.",
        ],
        "Eski buzul etkinliği desteklenir.",
        "Denize ulaşmış buzul ve kesin tarih için ek veri gerekir.",
        "Eski şekli güncel buzul haritası saymak.",
      ),
    ],
    recall: [
      r("Lösün yaygın tane boyu?", "Silt; her kumul lös değildir."),
      r(
        "Moren niçin çoğu kez kötü boylanır?",
        "Buzul farklı boyları doğrudan birlikte taşıyıp bırakabilir.",
      ),
      r("Sanderin son taşıyıcısı?", "Buzul erime suyu, yani akarsu."),
      r(
        "Hamsilos görüntüsü fiyort kanıtı mı?",
        "Hayır; deniz altında kalmış buzul vadisi kanıtı gerekir.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Rüzgârlar PDF s. 16 ve Buzullar PDF s. 10; MEBİ TYT Coğrafya Konu Özetleri PDF s. 67–68; Aurelia 016 Rüzgâr ve Buzul 7 sayfa ile karşılaştırılmış özgün öğretim. Şekiller gerçek tane ve hız ölçümü değildir.",
  },
  {
    id: "dalga-akinti-kiyi-tipleri",
    title: "Kıyılar: dalga işini ve sular altında kalan vadinin izini ayır",
    minutes: 85,
    objectives: [
      "Dalga salınımı ile akıntı taşınımını ayır.",
      "Falez, kordon, lagün ve tombolonun süreç ve yerini izle.",
      "Ria, fiyort, dalmaçya ve diğer kıyı tiplerini oluşum kanıtıyla karşılaştır.",
    ],
    sections: [
      s(
        "Dalga ile akıntının işi",
        "Dalga su yüzeyindeki salınımın ve enerjinin yayılmasıdır; sıradan açık deniz dalgasında su parçacıkları bütün dalga boyu boyunca aynı hızla kıyıya yürümez. Akıntı daha süreklilik gösteren yönlü su hareketidir. Rüzgâr, yoğunluk ve seviye farkları ile gelgit farklı akıntılara katkı yapabilir.",
        "Kıyıdaki dalga kırılması ve kıyıya eğik yaklaşma kıyı boyu tortu taşınımına yol açabilir. Dalgaların varlığı her kıyıda aynı aşınmayı veya birikimi doğurmaz. Kıyı şekli, kayaç, su derinliği, tortu beslenmesi ve dalga koşulları birlikte etkilidir; yalnız tek bir hareket oku bütün kıyının geleceğini hesaplamaz.",
      ),
      s(
        "Aşınan kıyıda falez ve platform",
        "Dalga aşındırması uygun dik kıyının tabanını oyabilir; üst bölüm çökerken dik yüzey geriler ve falez gelişir. Önünde açığa çıkan aşınım düzlüğü abrazyon platformudur. Şemada gerileme yönü ile malzeme kaybı birlikte gösterilmelidir.",
        "Kıta sahanlığı deniz altındaki kıta kenarının görece sığ uzantısıdır; okulda yaklaşık 200 m derinliğe kadar anlatılabilir, gerçek sınır sabit metre çizgisi değildir. Dar şelf ve dik kıyı aşınımı destekleyebilir; yine de bütün dar şelf kıyılarında aynı falez yüksekliği veya gerileme hızı zorunlu değildir.",
      ),
      s(
        "Biriken tortunun bağlandığı yer",
        "Plaj kıyıda biriken kum/çakıl malzemesidir. Kıyı oku bir ucu karaya bağlı uzanan birikim şerididir; kordon koy ağzını kapatmaya uzanabilir. Bir koyun önünün kıyı birikimiyle ayrılması lagün gelişimine katkı verir. Kıyı şeklinin çizgisi kadar tortunun bağlantısını da oku.",
        "Ada ile ana kara arasında kum boynu kuran birikim tombolo ile ilişkilidir. Tombolo dalganın oyarak açtığı bir geçit değildir. Lagün suyunun mutlaka tatlı olduğu da söylenemez; denizle bağlantı, tatlı su girişi ve buharlaşma su özelliğini etkiler.",
      ),
      s(
        "Dağların yönü: enine ve boyuna",
        "Dağ sıraları kıyıya genel olarak paralelse boyuna, kıyıya dik uzanan sırt ve vadiler varsa enine kıyı örüntüsü düşünülebilir. Türkiye’nin Karadeniz ve Akdeniz ana kıyı kuşakları boyuna, Ege’nin birçok kesimi enine örüntüye örnektir. Bu bölgesel genelleme her koyun bire bir aynı olduğu iddiası değildir.",
        "Enine örüntü koy ve körfezlerle girintili kıyıyı destekleyebilir; kıyı–iç kesim geçişinde vadiler koridor sağlayabilir. Ancak yön tek başına iklimi, bütün limanların yerini veya ulaşımın hiç kesilmediğini kanıtlamaz. Haritada kuzey okunu ve kıyı çizgisini birlikte kullan; sayfa yatayını deniz yönü sanma.",
      ),
      s(
        "Ria ve fiyort: su bastığı vadiyi tanı",
        "Ria göreli deniz yükselmesiyle akarsu vadilerinin su altında kalmasıyla ilişkilidir. Fiyortta ise daha önce buzulla oyulmuş derin U vadinin denizle dolması vardır. İkisinde de su basması olabilir, fakat önceden vadinin etkeni farklıdır; yalnız girintili çizgiyle ayrım yapılmaz.",
        "Fiyort için buzul aşınım kanıtı, ria için akarsu vadisi ağı kanıtı ara. Norveç gibi alanlar fiyort örnekleri taşır. Türkiye’nin yüksek dağlarındaki buzullaşma bütün kıyılarda buzul vadisi bulunduğu anlamına gelmez; Hamsilos’u bu yüzden otomatik fiyort diye etiketleme.",
      ),
      s(
        "Dalmaçya ile skyer farklı geçmişler",
        "Kıyıya paralel uzanan sırt ve vadiler göreli su yükselmesiyle kısmen örtülür, sırtlar uzun adalar olarak kalırsa dalmaçya örüntüsü gelişebilir. Hırvatistan kıyıları bilinen örnektir; Türkiye’de Kaş–Finike çevresinde örnekler anlatılır. Her ada grubu dalmaçya değildir.",
        "Skyer buzulla işlenmiş alçak arazinin su altında kalmasıyla çok sayıda küçük kayalık ada içeren kıyı örüntüsüdür; İsveç–Finlandiya çevresi örnekleri vardır. Ada sayısından önce kayaç yüzeyinin buzul geçmişini ve şekil düzenini araştır. Dalmaçya sırtlarıyla skyerin buzul işlenmiş yüzeyini aynı kutuya koyma.",
      ),
      s(
        "Gelgit, limanlı, kalanklı ve mercanlı",
        "Haliçli kıyıda gelgit etkisiyle biçimlenen, denize doğru genişleyen akarsu ağzı; watt kıyıda güçlü gelgitte açığa çıkan sığ alanlar öne çıkar. Gelgit Ay ve Güneş’in çekim etkileriyle ilişkilidir; yalnız rüzgârın bir kez suyu yığması aynı olay değildir.",
        "Limanlı kıyı bazı koyların kordonlarla ayrılmasıyla, kalanklı kıyı karstik vadilerin denizle örtülmesiyle ilişkilidir. Mercan resifli kıyıda biyolojik karbonat birikimi önemlidir; sıcak, ışıklı ve uygun deniz koşulları aranır. Her sıcak denizde otomatik aynı resif oluşmaz; tuzluluk, berraklık ve canlı ortamı da etkilidir.",
      ),
      s(
        "Kıyı bütçesi ve şema sınırı",
        "Laboratuvar kıyı oku, lagün, tombolo ve su altında kalan vadi biçimlerini ayrı gösterir. Şematik kesit ile üstten görünüş özellikle belirtilir; gerçek kıyı koordinatı, zaman veya kıyı erozyon tahmini üretilmez. Gözlemlediğin kum bağlantısı ile eski vadi geometrisini farklı kanıtlar olarak kaydet.",
        "Kıyıya tortu girişi artarken kıyı akıntısı daha fazlasını uzaklaştırıyorsa net birikim şart değildir. Bir dalga kıran komşu kıyının tortu dengesini değiştirebilir; tek yapı fotoğrafından bütün sonuçlar çıkarılamaz. Soruda süreç, köken ve bugünkü bağlantıdan hangisinin istendiğini seç; sonra kanıtın sınırını yaz.",
      ),
    ],
    examples: [
      e(
        "Ada bağlandı",
        "Ada ile ana kara arasında dalga ve kıyı akıntılarının biriktirdiği kum boynu var. Şekil ve süreç?",
        "Bağlantıyı ve malzemeyi oku.",
        [
          "Kum taşınmıştır.",
          "Birikim ada ile ana karayı bağlıyor.",
          "Bu tombolo örüntüsüdür; aşınım geçidi değildir.",
        ],
        "Tombolo; kıyı birikimi.",
        "Ada ile kara arasındaki bağ ayırt edicidir.",
        "Her kıyı kumunu lagün saymak.",
      ),
      e(
        "Aynı su, farklı vadi",
        "A’da eski akarsu V vadisi, B’de buzul çizikleri taşıyan U vadi denizle dolmuştur. Kıyı tipleri?",
        "Su basmasından önceki şekli seç.",
        [
          "A’nın önceki etkeni akarsudur.",
          "B’nin önceki etkeni buzuldur.",
          "A ria, B fiyort ile uyumludur.",
        ],
        "A ria, B fiyort.",
        "Yalnız girintili görünüş ayrımı vermez.",
        "Her su basmış vadinin fiyort olduğunu sanmak.",
      ),
      e(
        "Kum setinin gerisi",
        "Kıyı kordonu koy ağzını büyük ölçüde kapatmış, geride kıyı suyu kalmıştır. Ne gelişir, su mutlaka tatlı mı?",
        "Şekil ile su özelliğini ayır.",
        [
          "Kordon birikim setidir.",
          "Geride kalan kıyı su alanı lagünle uyumludur.",
          "Tatlılık için giriş, deniz bağlantısı ve buharlaşma gerekir.",
        ],
        "Lagün; suyun mutlaka tatlı olduğu söylenemez.",
        "Çanağın oluşumu suyun kimyasını tek başına belirlemez.",
        "Lagünü zorunlu tatlı su gölü saymak.",
      ),
      e(
        "Kıyı çizgisi geriliyor",
        "Dik kıyının altı oyuluyor, üst bloklar çöküyor ve önünde kayalık düzlük kalıyor. İki şekli yaz.",
        "Aşınan duvar ile önündeki yüzeyi ayır.",
        [
          "Taban oyulması kıyı gerilemesini destekler.",
          "Dik gerileyen yüzey falezdir.",
          "Önündeki aşınım düzlüğü abrazyon platformudur.",
        ],
        "Falez ve abrazyon platformu.",
        "Kum birikimi verisi yoktur.",
        "Platformu delta ovası diye adlandırmak.",
      ),
    ],
    recall: [
      r(
        "Fiyort için ayırt edici eski etken?",
        "Buzulun oyduğu vadi; sadece deniz basması yeterli değildir.",
      ),
      r(
        "Tombolo ile lagün farkı?",
        "Tombolo adayı karaya bağlar; lagün kıyı seti gerisindeki su alanıdır.",
      ),
      r(
        "Dalga mı akıntı mı yönlü taşıma?",
        "Akıntı yönlü su hareketidir; dalga salınım ve enerji yayılımıdır.",
      ),
      r(
        "Dalmaçya için ada sayısı yeterli mi?",
        "Hayır; kıyıya paralel eski sırt–vadi düzeni ve su basması aranır.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Dalga–Akıntı–Kıyılar PDF s. 11–12; MEBİ TYT Coğrafya Konu Özetleri PDF s. 73–74; Aurelia 017 Dalga ve Akıntılar–Kıyı Tipleri 7 sayfa ile karşılaştırılmış özgün öğretim. Şemalar gerçek kıyı ölçümü değildir.",
  },
  {
    id: "turkiye-dis-kuvvetler",
    title: "Türkiye’de dış kuvvetler: yeri ezberlemekten süreci görmeye",
    minutes: 85,
    objectives: [
      "Türkiye örneklerini aşınım, taşıma ve birikimle eşleştir.",
      "Akarsu, karst, buzul, rüzgâr ve kıyı kanıtlarını ayır.",
      "İç kökenli malzeme ile dış etkenli son biçimi birlikte açıkla.",
    ],
    sections: [
      s(
        "Ülkenin tamamına tek etken verme",
        "Türkiye’nin yüksek ve engebeli yerleri akarsuların derine işleyebileceği büyük yükselti farkları içerir; kıyı ve iç düzlüklerde birikim alanları da vardır. İklim, kayaç ve yer şekilleri kısa mesafede değiştiği için tek bir dış kuvvet bütün alanlarda aynı ölçüde baskın değildir.",
        "Dış süreçlerin enerjisinde Güneş ve yer çekimi önemlidir; malzeme önce iç süreçlerle yükselmiş veya üretilmiş olabilir. Sonraki su, rüzgâr veya buzul işi bundan ayrı aşamadır. Yer adını gördüğünde önce gözlenen malzeme ve oluşum işini yaz; aynı adın çevresinde birden çok etken bulunabilir.",
      ),
      s(
        "Vadi ve şelalenin kanıtı",
        "Dağlık kuşaklarda kertik ve boğaz vadiler, uygun tabakalı karstik alanlarda kanyonlar görülebilir. Çoruh ve Toroslar çevresindeki yarılmış alanlar, akarsuyun araziye işleyişiyle ilişkilidir. Bir boğazı görmek tek başına bütün geçmişini veya hangi hızla kazıldığını hesaplamaz.",
        "Tortum, Düden, Manavgat, Kapuzbaşı ve Muradiye gibi şelale örneklerinde eğim kırığı ve suyun düştüğü yer önemlidir. Dev kazanı düşen suyun aşındırdığı çukurdur. Aynı bölgede akarsu başka bir yerde malzeme biriktirebilir; nehir adını bir kez aşındırma kutusuna koyup tüm yatağı öyle sayma.",
      ),
      s(
        "Kapadokya’da kayaç ile şekli ayır",
        "Nevşehir–Aksaray çevresindeki tüflü arazilerde yüzey akışı ve farklı dirençte kayaçların seçici aşınması peribacalarını biçimlendirir. Üstte dayanıklı blok altındaki tüfü görece koruyabilir. İlk malzeme volkanik, son biçim dış süreçlerle gelişmiştir.",
        "Seyrek bitkili, kolay aşınan yüzeylerde sel yarıntıları kırgıbayır geliştirir; yalnızca peribacası görülen yerlerde bulunmak zorunda değildir. Her iki şekli de yalnız rüzgârın oyduğu veya dayanıklı ana kayanın zorunlu olduğu biçiminde genelleme. Yağışın miktarı kadar akış biçimi ve yüzey direnci de önemlidir.",
      ),
      s(
        "Birikim alanı dağdan kıyıya değişir",
        "Dağ eteklerindeki yelpazeler ve koniler, eğim ve taşıma koşulları değişirken alüvyonun bırakılmasıyla gelişebilir. Uludağ ve Batı Anadolu dağlarının bazı etekleri örnekler içerir. Dağ içi çukurlar tortuyla dolabilir; tektonik temel ile alüvyal üst yüzey birlikte bulunur.",
        "Kızılırmak Bafra, Yeşilırmak Çarşamba, Göksu Silifke, Seyhan–Ceyhan Çukurova deltalarıyla ilişkilidir. Batı Anadolu’daki Gediz ve Menderes ağızlarında da birikim görülür. Delta için kıyı koşullarını unutma; akarsuyun getirdiği her tanenin mutlaka delta içinde kaldığı varsayılmaz.",
      ),
      s(
        "Karstta çözünen yer ile çöken mineral",
        "Teke, Taşeli ve Torosların uygun karbonatlı arazilerinde lapya, dolin, polye, mağara ve düdenler yaygındır. Konya çevresinde obruk örnekleri, Çankırı–Sivas jipsli arazilerinde farklı karst şekilleri bulunur. Türkiye’de karst yalnız tek bir kayaç veya tek bir bölgeye sıkışmaz.",
        "Pamukkale’de traverten karbonat çökelmesiyle büyür; mağara boşluğu ise çözünmeyle açılabilir. Aynı sistemdeki sarkıt, dikit ve sütunlar birikim şekilleridir. Suyun bulunduğu her örneği aşınım sayma; yerel olarak madde ekleniyor mu uzaklaşıyor mu, bunu gözle veya verilen açıklamayla belirle.",
      ),
      s(
        "Rüzgârın ve buzulların yeri sınırlıdır",
        "Karapınar ve Iğdır’ın uygun gevşek kumlu yüzeyleri rüzgâr birikimini gösterir. Bitki örtüsünün seyrekliği ve yüzeyin kuruluğu taşınabilirliği etkiler. Buna karşılık aynı kurak bölgede sağanakla sel aşındırması olabilir; bütün yüzeyi sadece rüzgârın ürünü sayma.",
        "Kaçkar, Ağrı, Süphan, Aladağlar, Buzul ve Sat gibi yüksek alanlarda buzul veya eski buzullaşma izleri bulunabilir. Sirk, U vadi ve moren birlikte yorumlanır. Eski şekil günümüzde aynı yerde canlı buzul olduğunu veya buzun denize ulaştığını zorunlu kılmaz; kaynak yılı ve gözlem bağlamı önemlidir.",
      ),
      s(
        "Kıyı ile yamaç farklı taşıyıcılar",
        "Karadeniz ve Akdeniz’in uygun dik kesimlerinde falezler; sığ birikim alanlarında plaj, kordon ve lagün örnekleri bulunur. Kapıdağ ve Sinop tombolo örnekleri olarak anlatılır; Büyükçekmece ve Küçükçekmece kıyı seti gerisindeki su alanlarına örnektir. Yerel kıyı tarihi tek bir çizgiyle tamamlanmaz.",
        "Heyelan ise kaya ve toprağın yer çekimiyle kütle hâlinde yamaç aşağı yer değiştirmesidir. Yağışla doygunlaşma, eğim, tabaka yapısı ve insan müdahalesi etkili olabilir. Karadeniz’in uygun yamaçları sık örnek sunar, fakat her yağışlı yamaç kaymaz ve her toprak taşınması akarsu erozyonu değildir.",
      ),
      s(
        "Kanıt kartından koşullu eşleştirme",
        "Laboratuvar gerçek yer adı içeren dokuz öğretim kartını süreç kesitiyle eşler; konum seçicisi coğrafi yer belirleme haritası değildir. Bafra’da tortu birikimi, Pamukkale’de karbonat çökelmesi, Kapadokya’da seçici aşınma gibi belirli kanıtlar yazıyla açıklanır. Şekiller gerçek ölçülü arazi değildir.",
        "Bir kartın cevabını yalnız il adıyla verme: taşıyıcı, malzeme, işlem ve ürün zinciri kur. Örneğin tüf → yüzey akışı → farklı aşınma → peribacası. Sonra yakın hatayı dene: Pamukkale’de aynı renk olabilir ama süreç aşınma değil birikimdir. Bu aktarım, yeni bir yer sorusunu ezbere ihtiyaç duymadan çözmeyi sağlar.",
      ),
    ],
    examples: [
      e(
        "İki delta, iki nehir",
        "Bir haritada Bafra ve Çarşamba deltaları var. Oluşturan başlıca nehirleri sırayla eşleştir.",
        "Konum bilgisini ağız tortusuyla bağla.",
        [
          "Bafra Kızılırmak’ın ağzındaki birikimle ilişkilidir.",
          "Çarşamba Yeşilırmak’ın ağzındaki birikimle ilişkilidir.",
          "İki ovada ortak işlem akarsu tortusunun kıyıda birikmesidir.",
        ],
        "Bafra–Kızılırmak; Çarşamba–Yeşilırmak.",
        "Nehirleri ters eşleştirmeden süreç ortaklığını yaz.",
        "Delta adını görüp iki nehri eşitlemek.",
      ),
      e(
        "İki beyaz şekil",
        "A’da tüf yüzey akışıyla oyuluyor, B’de kaynak suyundan karbonat basamaklara ekleniyor. İşlemler?",
        "Renk yerine kütle yönünü kullan.",
        [
          "A’da malzeme uzaklaşır: aşındırma.",
          "B’de yeni mineral eklenir: birikim.",
          "A Kapadokya seçici aşınması, B Pamukkale traverteni ile uyumludur.",
        ],
        "A aşınım; B çökelme/birikim.",
        "Her açık renkli şekil aynı süreç değildir.",
        "Kaynak suyunu zorunlu aşındırma sanmak.",
      ),
      e(
        "Dağın üstünde ve önünde",
        "Yüksek dağda sirk, aşağıda karışık iri–ince malzeme sırtı görülüyor. İki süreci söyle.",
        "Oyulan alan ile bırakılan yükü ayır.",
        [
          "Sirk buzul aşındırma çanağıyla uyumludur.",
          "Karışık tortu sırtı moren olabilir.",
          "Buzul hem aşındırır hem biriktirir.",
        ],
        "Sirk aşınımı; moren birikimi.",
        "Kesin yaş veya güncel buzul varlığı için ek veri gerekir.",
        "Bir etkenin yalnız tek iş yaptığını sanmak.",
      ),
      e(
        "Bütün yamaç kaydı",
        "Yağış sonrası toprak ve kaya kütlesi kayma yüzeyi boyunca birlikte aşağı inmiş. Akarsu mu kütle hareketi mi?",
        "Taşınmanın biçimini belirle.",
        [
          "Malzeme kanal içindeki taneler gibi tek tek taşınmıyor.",
          "Bir kütle yamaç boyunca yer değiştiriyor.",
          "Eğim, doygunluk ve zemin bağlamı heyelanı destekler.",
        ],
        "Heyelan; kütle hareketi.",
        "Yağış tetikleyici olabilir, tek başına her yerde heyelan yaratmaz.",
        "Yağmur varsa bütün taşınmayı akarsu saymak.",
      ),
    ],
    recall: [
      r(
        "Bafra’yı hangi nehirle eşlersin?",
        "Kızılırmak; Çarşamba ise Yeşilırmak.",
      ),
      r(
        "Pamukkale’nin yerel kütle değişimi?",
        "Karbonat çökelmesiyle madde eklenmesi.",
      ),
      r(
        "Peribacasının tüfü hangi kökenli?",
        "Volkanik; sonraki biçimlenme dış aşındırmayla gelişir.",
      ),
      r(
        "Heyelan ile akarsu taşıması farkı?",
        "Heyelanda yamaç kütlesi yer çekimiyle birlikte yer değiştirir.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Türkiye’de Dış Kuvvetler PDF s. 15–17; MEBİ TYT Coğrafya Konu Özetleri PDF s. 76–77; Aurelia 018 Türkiye’de Dış Kuvvetler 7 sayfa temelinde özgün öğretim. Yer kartları ölçülü risk veya konum modeli değildir.",
  },
  {
    id: "turkiye-yer-sekilleri",
    title: "Türkiye’nin yer şekilleri: göreli yükseklikten ulaşım koridoruna",
    minutes: 80,
    objectives: [
      "Dağ, ova ve platoyu göreli konum ve kökenle ayır.",
      "Başlıca Türkiye örneklerini yer ve süreçle birlikte kullan.",
      "Dağ–kıyı doğrultusunu koşullu iklim ve ulaşım yorumuna dönüştür.",
    ],
    sections: [
      s(
        "Ortalama ile tek nokta aynı değil",
        "Türkiye’nin ortalama yükseltisi kaynaklarda yaklaşık 1141 m verilir; batıdan doğuya genel artış görülür. Bu istatistik bütün doğu noktalarının bütün batı noktalarından yüksek olduğu anlamına gelmez. Aynı bölgede yüksek dağ, alçak ova ve yarılmış düzlük yan yana olabilir.",
        "Yükselti deniz seviyesine göre konumdur; engebe yakın noktalar arasındaki farkla ilgilidir. 1200 m’deki düz yüzey, 300 m’den 1000 m’ye çıkan dik yamaçtan daha yüksek ama daha az eğimli olabilir. Haritada renk basamağını eğim veya kayaç kökeni yerine kullanma; eş yükselti aralığı ve mesafe de gerekir.",
      ),
      s(
        "Dağların kökenini yapıyla ayır",
        "Kuzey Anadolu Dağları ve Toroslar kıvrım kuşakları; Madra, Yunt, Bozdağlar ve Aydın Dağları kırık dağ örnekleridir. Ağrı, Süphan, Tendürek, Erciyes ve Hasan volkanik köken örnekleridir. Hepsi yüksek olabilir; ayırt edici olan oluşum kanıtıdır.",
        "Bugünkü bir dağda farklı yaşta ve kökende kayaçlar bulunabilir. Kaynağın ana sınıflaması baskın yapısal geçmişi anlatır; her yüzey parçasının aynı süreçle oluştuğu anlamına gelmez. Yer adını ezberledikten sonra mutlaka kıvrım, fay bloğu veya lav–kül kanıtıyla ilişkilendir; tek fotoğrafla her dağı adlandıramazsın.",
      ),
      s(
        "Ovada alçaklık çevresine göredir",
        "Ova çevresine göre az eğimli düzlük alandır; mutlaka deniz seviyesinde olmak zorunda değildir. Konya, Erzincan, Muş ve Yüksekova gibi iç ovalar kıyı ovalarından daha yüksekte olabilir. Yalnız rakamı yüksek diye bir ovayı plato yapma.",
        "Tektonik çukurun dolması, eski göl tabanı, karst veya kıyı alüvyonu ova gelişimine katılabilir. Gediz ve Büyük Menderes grabenleri yapısal kökenle; Bafra, Çarşamba, Silifke ve Çukurova ağız birikimiyle ilişkilidir. Aynı ovanın birden fazla oluşum aşaması bulunabilir.",
      ),
      s(
        "Plato yalnız yüksek düz tabla değildir",
        "Plato akarsularla yarılıp çevresine göre yüksek kalmış görece düz yüzeydir. Cihanbeyli, Haymana, Obruk ve Uzunyayla İç Anadolu; Gaziantep ve Şanlıurfa Güneydoğu Anadolu; Erzurum–Kars ve Ardahan doğudaki örneklerdendir. Akarsu yarılması önemli ayırt edici kanıttır.",
        "Teke ve Taşeli karstik plato; Erzurum–Kars lav plato bağlamıyla anlatılır. Çatalca–Kocaeli ve Perşembe gibi daha alçak aşınım yüzeyleri de plato örneği olabilir. Bu yüzden plato için bütün dünyada zorunlu tek bir minimum yükselti sayısı konmaz; göreli yüzey ve yarılma bilgisi gerekir.",
      ),
      s(
        "Kıyıya paralel kuşaklar ve geçitler",
        "Karadeniz ve Akdeniz’in birçok kesiminde dağ kuşakları kıyıya paraleldir. Kıyı ile iç kesimler arasındaki doğal geçiş vadilere ve geçitlere yönelebilir; deniz etkisi yerel topografyaya göre sınırlanabilir. Bu durum bütün ulaşımın imkânsız olduğu anlamına gelmez.",
        "Kuzey Anadolu kuşağı ve Toroslar içinde alçak geçitler ile boğaz vadiler vardır. Güzergâh seçimi en yüksek zirveden geçmek zorunda değildir; daha alçak eşik rotayı değiştirebilir. Yol yapımı, tüneller ve diğer beşerî koşullar da gerçek ulaşımı etkiler; yalnız topografya çizgisi kesin ekonomik sonuç vermez.",
      ),
      s(
        "Ege koridorları ve girintili kıyı",
        "Ege’de doğu–batı uzanımlı sırtlar ve aralarındaki alçak graben koridorları kıyı–iç kesim ilişkisini etkiler. Kıyıya genel olarak dik örüntü koy ve körfezlerle daha girintili kıyıyı destekler. Deniz etkisi uygun koridorlardan içeri ilerleyebilir.",
        "Her Ege vadisi aynı yükseltide, aynı genişlikte veya aynı iklimde değildir. Koridorun yönü, uzunluğu, rüzgâr ve yükselti birlikte önemlidir. Kıyı uzunluğu yalnız ülkenin yüzölçümüyle veya bir dağın yüksekliğiyle bulunmaz; kıyı çizgisinin ayrıntı ölçeği de ölçümü etkiler.",
      ),
      s(
        "Arazi ölçüsünü doğru hesapla",
        "İki nokta arasındaki eğim, düşey fark/yatay uzaklık oranıyla bulunur; birim dönüştürülmeden karşılaştırma yapılmaz. İki yüzey aynı ortalama yükseltide olsa bile biri vadilerle daha fazla parçalanmış olabilir. Tek bir ortalama değer rölyefin bütün bilgisini taşımaz.",
        "Laboratuvardaki kesit, iki özgün öğretim yüzeyi ve üç verilen rota eşiğini karşılaştırır. Bunlar Türkiye’de gerçek bir yol veya ölçülmüş istasyon değildir. En alçak gösterilen eşik yalnız verilen seçenekler arasında daha düşük aşma yüksekliği sağlar; en kısa, en ucuz veya en güvenli gerçek yol olduğu sonucu çıkmaz.",
      ),
      s(
        "Harita sorusunda üç ayrı karar",
        "Önce biçimi adlandır: dağ, ova, plato veya kıyı şekli. Sonra oluşum kanıtını ayır: fay çukuru, lav örtüsü, kıvrımlı tabaka veya alüvyon birikimi. Üçüncü olarak konum ve doğrultuyu kullan; aynı biçim başka bir bölgede başka süreçle gelişmiş olabilir.",
        "Genel ülke örüntüsüyle özel nokta yargısını karıştırma. Doğuya artış genel, her nokta karşılaştırması ayrı veriye bağlıdır. Aynı kavramı yeni kesitte açıklamak için tanımı hatırla: çevresine göre alçak az eğimli alan ova; akarsuyla yarılmış görece yüksek düzlük plato. Öğrenmeyi renk ezberinden süreç ve kanıta taşı.",
      ),
    ],
    examples: [
      e(
        "Yüksek ova olur mu?",
        "X çevresindeki dağlardan alçak, az eğimli bir taban; denizden yükseltisi 1500 m. Sırf 1500 m olduğu için plato mu?",
        "Mutlak ve göreli konumu ayır.",
        [
          "1500 m denize göre yükseltidir.",
          "Çevresine göre alçak ve az eğimli taban ova tanımıyla uyumludur.",
          "Plato için yarılmış, çevreye göre yüksek yüzey kanıtı gerekir.",
        ],
        "Hayır; verilenler yüksek ova ile uyumludur.",
        "Yalnız rakım sınıf belirlemez.",
        "Ova için 0 m zorunlu sanmak.",
      ),
      e(
        "Yarılan lav yüzeyi",
        "Yüksek lav örtüsünü akarsular derin vadilerle parçalamış. Yüzey ve köken?",
        "Biçim ile malzemeyi ayrı yaz.",
        [
          "Lav örtüsü volkanik malzemeyi gösterir.",
          "Akarsu yarılması platoyu destekler.",
          "İki bilgi lav platosu bağlamında birlikte kullanılabilir.",
        ],
        "Volkanik malzemeli, akarsularla yarılmış plato.",
        "Son yarılma dış süreçtir.",
        "Lav varsa bütün yüzeye volkan konisi demek.",
      ),
      e(
        "Üç rota eşiği",
        "Özgün modelde kıyıdan iç havzaya üç rotanın en yüksek noktaları A 1600 m, B 900 m, C 1200 m. Yalnız aşma yüksekliğini küçültmek için hangisi?",
        "İstenen ölçütü sınırla.",
        [
          "Üç değer aynı niceliktir: rota üzerindeki en yüksek yükselti.",
          "En küçük 900 m, B rotasındadır.",
          "Bu bilgi uzunluk, maliyet ve risk seçimini tek başına yapmaz.",
        ],
        "Verilen rotalar içinde B.",
        "En alçak eşik en kısa yol demek değildir.",
        "Soruda olmayan ekonomik sonuç çıkarmak.",
      ),
      e(
        "Genel örüntünün istisnası",
        "Batıdaki A dağı 2200 m, doğudaki B ovası 900 m verilmiş. Bu karşılaştırma genel doğuya yükselme örüntüsünü çürütür mü?",
        "Tek çift ile bölgesel eğilimi ayır.",
        [
          "A ve B farklı yer şekilleridir.",
          "A’nın B’den yüksek olması nokta karşılaştırmasıdır.",
          "Bölgesel ortalama eğilim bütün çiftlerin aynı sırada olmasını istemez.",
        ],
        "Hayır; yerel istisna genel ortalama eğilimle birlikte bulunabilir.",
        "Karşılaştırmanın ölçeğini yaz.",
        "Genel sözcüğünü istisnasız zorunluluk saymak.",
      ),
    ],
    recall: [
      r("Her ova deniz kıyısında mı?", "Hayır; yüksek iç ovalar da vardır."),
      r(
        "Platonun tanımında yalnız rakım yeterli mi?",
        "Hayır; çevreye göre yüksek düzlük ve akarsu yarılması aranır.",
      ),
      r(
        "Toroslarla kıyı arasındaki genel yön?",
        "Ana kuşak birçok yerde kıyıya paraleldir; geçitler bulunur.",
      ),
      r(
        "Doğuya yükselti artışı bütün noktalarda zorunlu mu?",
        "Hayır; genel bölgesel örüntüdür.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Türkiye’de Başlıca Yüzey Şekilleri PDF s. 18; MEBİ TYT Coğrafya Konu Özetleri PDF s. 78; Aurelia 019 Türkiye’nin Yer Şekilleri 7 sayfa ile karşılaştırılmış özgün öğretim. Kesit ve rota sayıları gerçek yol ölçümü değildir.",
  },
  {
    id: "dunyada-sular",
    title: "Dünyada sular: depo, akış ve kullanılabilir suyu birlikte izle",
    minutes: 90,
    objectives: [
      "Küresel su payı ile erişilebilir tatlı suyu ayır.",
      "Su bütçesini, havza ve debiyi birimleriyle hesapla.",
      "Göl kökeni, tuzluluk ve yer altı kaynaklarını koşullarıyla karşılaştır.",
    ],
    sections: [
      s(
        "Dünya yüzeyi ile su hacmi ayrı paydalar",
        "Dünya yüzeyinin yaklaşık %71’i sularla kaplıdır; bu alan oranıdır. Dünya su hacminin yaklaşık %97,5’i tuzlu, %2,5’i tatlı su olarak verilir; bu başka bir paydadır. Alan yüzdesini hacim yüzdesiyle doğrudan toplamak yanlış olur.",
        "Tatlı suyun büyük kısmı buz ve yer altında bulunduğundan kolay erişilen yüzey suyu daha küçük paydır. Tatlı düşük tuzluluğu anlatır, otomatik içilebilir ve kirlenmemiş demek değildir. Kaynağın hacmi, erişimi, yenilenmesi ve kalitesi ayrı değerlendirilir; denizle çevrili olmak yeterli içme suyu sağlandığını göstermez.",
      ),
      s(
        "Döngü su üretme makinesi değildir",
        "Buharlaşma ve bitki terlemesi suyu atmosfere; yoğuşma ve yağış yeniden yüzeye taşır. Su yüzeyde akabilir, toprağa sızabilir, yer altında depolanıp akabilir. Güneş enerjisi ve yer çekimi bu hareketlerde önemlidir; depo ve akış kavramlarını farklı renkte izlemek yararlıdır.",
        "Döngü yerel kullanılabilir suyu sınırsız yenilemez. Bir akiferin çekimi beslenmeden fazlaysa düzey düşebilir; kirlenme veya mevsimlik kuraklık erişimi sınırlayabilir. Kapalı seçilmiş bütçede giriş eksi çıkış stok değişimini verir; suyun başka depoya geçmesi dünya ölçeğinde yok olduğu anlamına gelmez.",
      ),
      s(
        "Okyanus ve denizlerde hareket ve tuz",
        "Güncel beş okyanus tasnifi Pasifik, Atlas, Hint, Kuzey/Arktik ve Güney okyanuslarını ayırır. Kenar denizler okyanus kenarında, iç denizler kıta içlerine sokulmuş bağlantılı su alanlarıdır. Eski üç okyanus listesi bu güncel öğretim çerçevesinin tamamı yerine kullanılmaz.",
        "Tuzluluk buharlaşma, yağış, nehir girişi, donma/erime, akıntı ve karışımla değişir. Ekvatorun her yerde en tuzlu olduğu veya kutba gidildikçe istisnasız tek çizgi izlediği söylenmez. Akıntı yönlü su hareketi, dalga salınım; gelgit ise Ay ve Güneş’in çekim etkileriyle su düzeyinin periyodik değişimidir.",
      ),
      s(
        "Havza ve debi ölçütleri",
        "Su bölümü çizgisi komşu havzaları ayırır. Açık havza denize yüzeysel çıkış, kapalı havza iç çanakta sonlanma bağlamıyla kullanılır. Kapalı havzada da buharlaşma, sızma ve yer altı ilişkileri bulunur; kapalı ifadesi bütün gezegen su döngüsünden kopuk anlamına gelmez.",
        "Debi belirli kesitten geçen hacim/zamandır;30 m³ su 2 saniyede geçerse ortalama 15 m³/s olur. Rejim yıl içindeki değişim örüntüsüdür. Kar erimesi ilkbahar akışını artırabilir, ama tek ilkbahar ölçümü bütün yılın rejimini göstermez. Havza büyüklüğü de tek başına hız veya debiyi kesin sıralamaz.",
      ),
      s(
        "Gölün çanağı ve suyu farklı sorulardır",
        "Tektonik çukur, volkanik krater/kaldera/maar, karstik çözünme çanağı ve buzul aşınım çanağı yerli kaya göllerini oluşturabilir. Lav, moren, alüvyon, heyelan veya kıyı seti bir vadiyi/koyu kapatarak set gölü geliştirebilir. Baraj gölü insanın yaptığı setin arkasında oluşur.",
        "Bir göl birden çok süreçten etkilenmiş karma kökenli olabilir. Çanağın kökenini yalnız bugünkü suyun rengi veya tuzluluğundan seçme. Göllerin en büyük ya da en yüksek gibi unvanlarında alan, hacim, tuzluluk, doğal/yapay ve ulaşım ölçütü önemlidir; Titikaka’yı bütün göllerin mutlak en yükseği diye öğretmek doğru değildir.",
      ),
      s(
        "Çıkış ile buharlaşmayı bütçede izle",
        "Denize çıkışı olan göl çözünmüş maddeleri dışarı taşıyabilir; çıkışsız ve güçlü buharlaşmalı gölde tuz birikimi kolaylaşabilir. Bu güçlü bir süreç ilişkisi, bütün çıkışlı göller zorunlu tatlı ve bütün çıkışsızlar zorunlu tuzlu biçiminde istisnasız kural değildir. Girişin kimyası ve gölün geçmişi önemlidir.",
        "Laboratuvar tek dönemli özgün ideal göl bütçesidir. Yağış ve nehir girişi stok artırır; buharlaşma ve dış akış azaltır. Su buharlaşırken çoğu çözünmüş tuz geride kalır; dış akışın tuz taşıması ayrıca belirtilmelidir. Model yalnız su hacmini hesaplar, tuz kütlesi ve karışım verisi olmadan kesin tuzluluk üretmez.",
      ),
      s(
        "Akifer ve kaynağın çıkış yolu",
        "Akifer su depolayıp iletebilen jeolojik birimdir. Gözeneklilik depolama boşluklarıyla, geçirgenlik bağlantı ve iletim kolaylığıyla ilgilidir; çok gözenekli her malzeme çok geçirgen değildir. Çatlaklı kayaç da su iletebilir. Sızma, yağış, eğim, yüzey ve bitki koşullarıyla değişir.",
        "Yamaç kaynağında su taşıyan birim yüzeyi keser; karstik kaynakta çözünme boşluklarından gelen su çıkar. Basınçlı akiferde artezyen kuyusu açılabilir; su her kuyuda kendiliğinden yeryüzüne taşmak zorunda değildir. Fay çatlakları akış yolu sağlayabilir; her fay kaynağı sıcak veya yıl boyu sabit debili değildir.",
      ),
      s(
        "Sıcak kaynak, gayzer ve sonuç sınırı",
        "Gayzer uygun ısı kaynağı, su ve yer altı kanal/basınç koşullarıyla dönemsel püskürme gösterir. Her sıcak kaynak gayzer değildir. Yer altından çıkan suyun içilebilirliği yalnız sıcaklığından veya kaynak türünden anlaşılmaz; kimyasal ve mikrobiyolojik kalite ayrıca gerekir.",
        "Su bütçesinde depoyu ve süreyi açık yaz: başlangıç + giriş − çıkış = son stok. Stok negatif çıkıyorsa varsayılan çıkışların tamamı sağlanamaz; sıfıra kırpıp eksik kısmı gizlemek yerine karşılanamayan talebi göster. Bu laboratuvar bir gerçek havzanın güvenli su yönetim planı değil, verilen sayıları koruyan öğretim modelidir.",
      ),
    ],
    examples: [
      e(
        "İki yüzde, iki payda",
        "İdeal 1000 birim dünya suyu örneğinde tatlı payı %2,5; bunun yalnız %0,3’ü seçilen yüzey suyu alt payıdır. Yüzey alt payı kaç birim?",
        "Yüzdeleri sırayla uygula.",
        [
          "Tatlı su 1000 × 0,025 = 25 birim.",
          "Alt pay 25 × 0,003 = 0,075 birim.",
          "Bu dünya toplamının %0,0075’idir; alan oranı %71 kullanılmaz.",
        ],
        "0,075 birim.",
        "0,3’ü 25’e yüzde olarak uyguladığını kontrol et.",
        "Yüzde paydalarını karıştırmak.",
      ),
      e(
        "Göl bütçesi",
        "İdeal dönemin başında 100 hm³ su var. Yağış 10, nehir 30 hm³; buharlaşma 15 ve dış akış 20 hm³. Başka giriş/çıkış yok. Son stok?",
        "Bir dönemi ve bütün terimleri yaz.",
        [
          "Giriş 10 + 30 = 40 hm³.",
          "Çıkış 15 + 20 = 35 hm³.",
          "Son stok 100 + 40 − 35 = 105 hm³.",
        ],
        "105 hm³; net artış 5 hm³.",
        "Su miktarından tek başına kesin tuzluluk hesaplanmaz.",
        "Buharlaşmayı veya dış akışı unutmak.",
      ),
      e(
        "Düşük stok uyarısı",
        "Başlangıç 10 hm³, giriş 5 hm³, istenen toplam çıkış 25 hm³. Başka kaynak yok. 25’in tamamı sağlanabilir mi?",
        "Kullanılabilir suyu önce hesapla.",
        [
          "Kullanılabilir stok 10 + 5 = 15 hm³.",
          "Talep 25 hm³, mevcut sudan 10 hm³ fazladır.",
          "Son stok negatif olamaz; bu kapalı modelde 10 hm³ çıkış karşılanamaz.",
        ],
        "Hayır; 10 hm³ açık vardır.",
        "Son stoku −10 diye gerçek su hacmi sanma.",
        "Modeli kırpıp karşılanamayan çıkışı saklamak.",
      ),
      e(
        "Basınçlı kuyu",
        "İki az geçirgen birim arasındaki su taşıyan tabakada kuyu açılıyor. Basınç suyu kuyu içinde yükseltiyor, ama yüzeye ulaşmıyor. Artezyen koşulu olabilir mi?",
        "Basınçlılığı yüzeye taşmadan ayır.",
        [
          "Su taşıyan tabaka basınç altındadır.",
          "Kuyuda yükselme piezometrik düzeye kadardır.",
          "Bu düzey yüzeyin altında kalabilir; her artezyen kuyu akan kuyu değildir.",
        ],
        "Evet; basınçlı artezyen kuyu, kendiliğinden taşma zorunlu değil.",
        "Kaynak sınıfından su kalitesi de otomatik çıkmaz.",
        "Artezyenin mutlaka fıskiye olduğunu sanmak.",
      ),
    ],
    recall: [
      r(
        "Tatlı su otomatik içilebilir mi?",
        "Hayır; tuzluluk ile kalite ve erişim ayrı ölçütlerdir.",
      ),
      r(
        "Su bütçesi denklemi?",
        "Son stok = başlangıç + giriş − çıkış; karşılanamayan çıkış varsa belirtilir.",
      ),
      r(
        "Her artezyen kuyu yüzeye taşar mı?",
        "Hayır; basınç düzeyi yüzeyin altında kalabilir.",
      ),
      r(
        "Göl tuzluluğu çanağın kökenini tek başına verir mi?",
        "Hayır; su bütçesi ve jeoloji birlikte değerlendirilir.",
      ),
    ],
    source:
      "OGM Coğrafya 10 Dersler Cepte, Sular PDF s. 10–13; MEBİ TYT Coğrafya Konu Özetleri PDF s. 79–82; Aurelia 020 Dünyada Sular 7 sayfa temelinde özgün öğretim. Eski kaynakların istisnasız göl/artezyen genellemeleri koşullandırılmıştır; bütçe verileri temsilîdir.",
  },
];
type BankItem = [string, string[], number, string, string, string];
const banks: Record<string, BankItem[]> = {
  "cografya-kayaclar": [
    [
      "Magma yüzeye çıkmadan yavaşça soğuyor ve iri kristaller gelişiyor. Hangi sınıflama verilen kanıtlarla uyumludur?",
      [
        "Organik tortul",
        "Kimyasal tortul",
        "Magmatik derinlik",
        "Buzul tortusu",
        "Her durumda kuvarsit",
      ],
      2,
      "Soğuma işlemi ile yer altı konumunu birleştir.",
      "Katılaşma magmatik oluşumdur; yer altında yavaş soğuma derinlik kayaçlarıyla uyumludur. Yalnız bu veri kesin mineral bileşimini veya tek bir kayaç adını vermez.",
      "Derinlik kayaçları",
    ],
    [
      "Kalker yüksek sıcaklık ve basınç altında erimeden yeniden kristalleşiyor. Okul örneğinde beklenen ürün hangisidir?",
      ["Mermer", "Bazalt", "Kaya tuzu", "Kum taşı", "Obsidiyen"],
      0,
      "Erime olup olmadığını ilk adımda kontrol et.",
      "Katı hâlde değişim başkalaşmadır. Kalker uygun koşullarda mermere dönüşür; magma soğuması veya tortu birikimi verilmemiştir.",
      "Başkalaşım",
    ],
    [
      "Bir akarsu kum tanelerini göl kıyısında biriktiriyor; taneler zamanla sıkışıp çimentolanıyor. Oluşumla en uyumlu kayaç hangisidir?",
      ["Granit", "Gnays", "Gabro", "Kum taşı", "Süngertaşı"],
      3,
      "Başlangıç malzemesi ile taşlaşma yolunu izle.",
      "Kum boyutlu kırıntıların sıkışıp çimentolanması kum taşı oluşumunu destekler. Granit ve gabro magma soğuması; gnays başkalaşma ürünüdür.",
      "Kırıntılı tortul",
    ],
    [
      "Bir lav çok hızlı soğuyarak camsı doku kazanıyor. Bu veri hangi yorumu destekler?",
      [
        "Bütün kristaller zorunlu iri gelişmiştir.",
        "Ürün mutlaka organik kömürdür.",
        "Taneler akarsu yatağında çimentolanmıştır.",
        "Kayaç erimeden mermerleşmiştir.",
        "Kristal büyümesine az zaman kalmış; obsidiyenle uyumlu doku gelişmiştir.",
      ],
      4,
      "Camsı doku ile kristal büyüme süresini karşılaştır.",
      "Çok hızlı soğuma kristal büyümesini sınırlayabilir ve obsidiyen gibi camsı volkanik doku oluşturabilir. Camsı yapı yavaş soğuma veya çimentolanma kanıtı değildir.",
      "Soğuma dokusu",
    ],
    [
      "Bir mağara duvarına sudan karbonat çökelerek mineral ekleniyor. Verilen sürecin ana niteliği hangisidir?",
      [
        "Yalnız fiziksel kırıntı birikimi",
        "Çözünmüş mineralin kimyasal çökelmesi",
        "Katı kalkerin magma hâline gelmesi",
        "Kumun erimeden kuvarsit olması",
        "Yer altında granitin yavaş soğuması",
      ],
      1,
      "Malzeme tane olarak mı, çözünmüş olarak mı geliyor?",
      "Çözünmüş karbonatın çökelmesi kimyasal tortul oluşumla ilişkilidir. Bu örnek bütün kimyasal tortulların aynı bileşimde olduğunu göstermez; jips ve kaya tuzu farklıdır.",
      "Kimyasal tortul",
    ],
    [
      "Kayaç döngüsü hakkında hangi ifade doğrudur?",
      [
        "Her kayaç bütün aşamalardan aynı sırayla geçer.",
        "Başkalaşım her zaman tam erime demektir.",
        "Tortul kayaçlar hiçbir zaman eriyemez.",
        "Farklı kayaçlar uygun koşullarda ayrışabilir, başkalaşabilir veya eriyebilir.",
        "Magmatik kayaç sadece fosillerin sıkışmasıyla oluşur.",
      ],
      3,
      "Döngüyü tek yönlü bir ders listesi gibi düşünme.",
      "Döngü çeşitli yollar içerir. Başkalaşma katı hâlde, erime ise magma aşamasına geçiştir. Her örneğin bütün durakları sırayla geçmesi zorunlu değildir.",
      "Döngü yolları",
    ],
    [
      "Bir tortul kayaç örneğinde fosil bulunamamıştır. Yalnız bu bilgiyle hangisi söylenebilir?",
      [
        "Kayaç kesin granittir.",
        "Kayaç hiçbir zaman suda oluşmamıştır.",
        "Kayaç kesin volkan camıdır.",
        "Tüm tortul kayaçlar fosilsizdir.",
        "Fosilin yokluğu kayaç ailesini tek başına kesinleştirmez.",
      ],
      4,
      "Fosil bulunabilir sözü zorunlu bulunur demek midir?",
      "Tortul kayaçlarda fosil korunabilir fakat zorunlu değildir. Yokluk tek başına magmatik ya da başkalaşım sınıflaması yaptırmaz; doku ve oluşum kanıtı gerekir.",
      "Fosil sınırı",
    ],
    [
      "Kum taşı uygun sıcaklık ve basınç altında erimeden başkalaşıyor. Yaygın okul eşleştirmesi hangisidir?",
      ["Kuvarsit", "Kaya tuzu", "Bazalt", "Linyit", "Tüf"],
      0,
      "Başlangıç kum taşı ile katı hâlde dönüşümü birlikte kullan.",
      "Kum taşının başkalaşması kuvarsitle eşleştirilir. Bazalt ve tüf volkanik; kaya tuzu kimyasal tortul, linyit organik kökenlidir.",
      "Ana kaya–ürün",
    ],
    [
      "Yumuşak tüf üstünde dayanıklı bir blok çevreye göre daha az aşınmış sütunu koruyor. En uygun açıklama hangisidir?",
      [
        "Şeklin tamamını yalnız güncel lav akışı oluşturur.",
        "Kayacın rengi aşınma hızının tek nedenidir.",
        "Malzeme volkanik kökenli olabilir; son sütun farklı aşınma ile biçimlenmiştir.",
        "Bütün peribacaları mermer başkalaşmasıdır.",
        "Suda çözünmüş tuz doğrudan granit yapmıştır.",
      ],
      2,
      "Malzeme kökeniyle biçimlenme sürecini iki aşamaya ayır.",
      "Tüf volkanik malzemedir; dayanıklı başlığın koruduğu kesimle çevresinin farklı aşınması dış kuvvetle peribacası gelişimini destekler. Volkanik köken son şeklin yalnız püskürmeyle yapıldığını göstermez.",
      "Malzeme ve süreç",
    ],
    [
      "Kalker, kaya tuzu ve jips için hangi ortak ifade daha doğrudur?",
      [
        "Hepsi aynı kimyasal bileşimlidir.",
        "Uygun su koşullarında çözünmeye elverişli olabilirler; bileşimleri aynı değildir.",
        "Hepsi magma yüzeyde soğuyunca oluşur.",
        "Hiçbiri yer şekillerini etkilemez.",
        "Her örnek mutlaka fosillidir.",
      ],
      1,
      "Benzer çözünebilirlik aynı kimyasal formül mü gerektirir?",
      "Bu kayaçlar karstik çözünmeye uygun örneklerdir fakat kalker karbonat, kaya tuzu ve jips farklı bileşimlerdedir. Ortak süreç potansiyeli tüm ayrıntıları özdeşleştirmez.",
      "Kayaç bileşimi",
    ],
  ],
  "turkiye-ic-kuvvetler": [
    [
      "Batı Anadolu’da gerilme altında normal faylar boyunca bazı bloklar göreli yükselmiş, bazıları çökmüştür. En uygun ikili hangisidir?",
      [
        "Krater–maar",
        "Horst–graben",
        "Sarkıt–dikit",
        "Kumul–lös",
        "Falez–plaj",
      ],
      1,
      "Yükselen ve çöken fay bloklarının adlarını eşleştir.",
      "Gerilme ve normal faylarla göreli yükselen blok horst, çöken blok graben olarak adlandırılır. Diğer seçenekler farklı volkanik, karstik, rüzgâr veya kıyı süreçleridir.",
      "Batı Anadolu blokları",
    ],
    [
      "Bir ova önce faylarla çökmüş, sonra akarsu tortularıyla dolmuştur. Hangi yorum uygundur?",
      [
        "Ova yalnız volkanik olabilir.",
        "Alüvyon varsa tektonik köken imkânsızdır.",
        "Fay varsa hiçbir dış süreç etkili olamaz.",
        "Yapısal çukur ile sonraki alüvyal dolgu birlikte bulunabilir.",
        "Bütün ovalar deniz deltasıdır.",
      ],
      3,
      "İki farklı aşamayı birbirini dışlıyor sanma.",
      "Tektonik süreç çanağı, akarsular daha sonraki dolguyu oluşturabilir. Köken ve yüzey malzemesi iki ayrı soruyu yanıtlar; düzlüğün varlığı delta koşulunu tek başına sağlamaz.",
      "Çok aşamalı ova",
    ],
    [
      "Fay şeması üstten görülüyor; iki blok fay doğrultusu boyunca ters yönde yatay öteleniyor. Temel hareket hangisidir?",
      [
        "Yanal/doğrultu atımlı hareket",
        "Her iki bloğun magma olarak erimesi",
        "Yalnız düşey çökme",
        "Kıyı kumunun birikmesi",
        "Bir sarkıtın büyümesi",
      ],
      0,
      "Okların fay boyunca mı, düşey mi olduğuna bak.",
      "Üstten görünüşte fay boyunca göreli yatay ötelenme doğrultu atımlı hareketi destekler. Bu kanıttan zorunlu horst–graben veya volkanizma çıkarılmaz.",
      "Fay bakış yönü",
    ],
    [
      "Kuzey Anadolu Dağları ve Torosların oluşum geçmişinde verilen temel mekanizma hangisidir?",
      [
        "Buzulların denizi dondurması",
        "Rüzgârın kum yığması",
        "Kıyı oklarının birleşmesi",
        "Karbonatın mağarada çökelmesi",
        "Levha yakınsamasıyla tortul tabakaların sıkışıp yükselmesi",
      ],
      4,
      "Yüksekliğin yanı sıra tabaka deformasyonunu düşün.",
      "Alp–Himalaya bağlamındaki yakınsama ve sıkışma ana kıvrım kuşaklarını açıklamada önemlidir. Sonraki aşınma bugünkü biçime katkı verebilir; bütün kayaçların aynı yaşta olduğu çıkmaz.",
      "Kıvrım kuşağı",
    ],
    [
      "Eski bir kıyı aşınım yüzeyi bugün deniz seviyesinin üzerindedir. Deniz düzeyinin geçmişi bilinmiyor. Hangi sonuç daha sınırlı ve doğrudur?",
      [
        "Bütün Türkiye aynı gün yükselmiştir.",
        "Yalnız deniz mutlaka yükselmiştir.",
        "Göreli düzey değişmiştir; kara ve deniz geçmişi ayrılmadan tek neden kesinleşmez.",
        "Yüzeyin kesin volkanik olduğu kanıtlanır.",
        "Depremin yarınki saati bulunur.",
      ],
      2,
      "Göreli seviye ile tek fiziksel nedeni ayır.",
      "Yüzeyin bugünkü denize göre konumu göreli değişimi gösterir. Kara yükselmesi ve deniz düzeyi değişimleri gibi olasılıklar ek veriyle ayrılır; tek fotoğraf kesin tarih ve nedeni vermez.",
      "Göreli kıyı düzeyi",
    ],
    [
      "Bir kartta Bitlis çevresindeki Nemrut kalderası yazıyor. Hangi sınıflama bu kanıtla uyumludur?",
      [
        "Yalnız akarsu deltası",
        "Volkanik yapı",
        "Kesin mercan resifi",
        "Rüzgâr lösü",
        "Yalnız kıvrım antiklinali",
      ],
      1,
      "Aynı adlı yerleri konumla ayır.",
      "Bitlis yakınındaki Nemrut volkanı kalderasıyla bilinir. Adıyaman’daki aynı adlı tarihî alanla ad benzerliği kurup kökeni aktarmamak gerekir.",
      "Volkanik konum",
    ],
    [
      "Bir fay haritası aktif sistemlerin konumunu gösteriyor. Haritadan tek başına hangisi bulunamaz?",
      [
        "Fayların genel dağılımı",
        "Gösterilen fayın haritadaki yönü",
        "Haritanın belirttiği sistem adı",
        "Bir sonraki depremin kesin günü ve saati",
        "İşaretli alanların göreli konumu",
      ],
      3,
      "Tehlike konumuyla kesin zaman tahmini aynı mı?",
      "Fay konumu ve hareket geçmişi deprem tehlikesi hakkında bilgi verebilir; tek başına bir sonraki depremin kesin gün ve saatini vermez. Haritanın ölçek ve lejant sınırları da korunmalıdır.",
      "Tahmin sınırı",
    ],
    [
      "Türkiye’de Senozoyik hareketlerin önemi vurgulanıyor. Bununla birlikte hangi ifade doğrudur?",
      [
        "Daha eski kayaç ve temel alanlar da bulunabilir.",
        "Bütün kayaçlar kesin aynı yaştadır.",
        "Eski kayaç bulunan yerde genç fay olamaz.",
        "Bütün dağlar yalnız bir volkanın ürünüdür.",
        "Ülkede dış kuvvet hiç çalışmamıştır.",
      ],
      0,
      "Genç yüzey şekli ile bütün taşların yaşını özdeşleştirme.",
      "Ana şekillenmede genç hareketler önemli olsa da eski kayaçlar ve temel alanlar bulunur. Kayaç yaşı, deformasyon yaşı ve güncel yüzey aşınması farklı olabilir.",
      "Kayaç ve şekil yaşı",
    ],
    [
      "Bir volkan bugün püskürmüyor. Yalnız bu gözlemden hangi çıkarım yapılamaz?",
      [
        "Gözlem sırasında püskürme görülmediği",
        "Bugünkü gözlemin bir zaman penceresi olduğu",
        "Eski lavların araştırılabileceği",
        "Geçmiş volkanik biçimlerin korunabileceği",
        "Gelecekte hiçbir etkinlik olasılığı bulunmadığı",
      ],
      4,
      "Güncel sessizlik geleceğin tamamını ispatlar mı?",
      "Püskürmüyor gözlemi yalnız belirtilen zamanı anlatır. Uzun dönem aktiflik değerlendirmesi geçmiş ve güncel bilimsel verilere bağlıdır; gelecekteki imkânsızlık kanıtı değildir.",
      "Volkanik zaman sınırı",
    ],
    [
      "Kapadokya’da volkanik tüf daha sonra yüzey akışıyla peribacası biçimi kazanmıştır. İç ve dış süreç nasıl ayrılır?",
      [
        "İkisi de yalnız kıyı birikimidir.",
        "İkisi de yalnız depremdir.",
        "Tüfün üretimi iç/volkanik; sonraki biçimlenme dış aşındırmayla ilişkilidir.",
        "Dış aşındırma varsa tüf volkanik olamaz.",
        "Tüfün her tanesi güncel magmadır.",
      ],
      2,
      "Önce malzeme oluşumu, sonra yüzey işlenmesini sırala.",
      "Volkanizma malzemeyi üretmiş, dış kuvvetler onu sonradan işlemiştir. Aynı yerin çok aşamalı açıklaması çelişki değildir.",
      "İç–dış süreç zinciri",
    ],
  ],
  "dis-kuvvetler-akarsular": [
    [
      "İdeal dikdörtgen akarsu kesiti 10 m genişlik, 2 m ortalama derinlik ve 1,5 m/s kesit ortalama hızına sahiptir. Debi kaçtır?",
      ["3 m³/s", "13,5 m³/s", "20 m³/s", "30 m³/s", "150 m³/s"],
      3,
      "Önce kesit alanını bul; sonra hızla çarp.",
      "A = 10 × 2 = 20 m²; Q = 20 × 1,5 = 30 m³/s. Hız 1,5 m/s olarak kalır; debi hacim/zamandır.",
      "Kesit debisi",
    ],
    [
      "Akarsuda bir kesitten 4 saniyede 80 m³ su geçmiştir. Bu aralığın ortalama debisi kaçtır?",
      ["320 m³/s", "84 m³/s", "20 m³/s", "76 m³/s", "4 m³/s"],
      2,
      "Hacmi süreye böl.",
      "Q = 80/4 = 20 m³/s. Toplam hacim 80 m³’tür; bu sayı debi olarak birimsiz kullanılmaz.",
      "Hacim/zaman",
    ],
    [
      "Bir akarsuda ocakta ölçülen debi 25 m³/s’tir. Yalnız bu ölçümden hangisi belirlenemez?",
      [
        "Yıllık debi rejimi",
        "Ölçümün bir debi değeri olduğu",
        "Birim zamanda geçen hacimle ilişkili olduğu",
        "Birimde saniye bulunduğu",
        "Ölçümün ocak dönemine ait olduğu",
      ],
      0,
      "Tek zaman noktası yıllık bir seri midir?",
      "Rejim yıl içi değişim örüntüsüdür. Ocak değeri tek başına diğer ayları veya kar erimesi tepesini vermez.",
      "Rejim sınırı",
    ],
    [
      "İki noktanın yükselti farkı 100 m, yatay uzaklığı 5 km’dir. Eğim yüzdesi kaçtır?",
      ["%500", "%20", "%0,02", "%5", "%2"],
      4,
      "Kilometreyi metreye çevir.",
      "5 km = 5000 m; eğim 100/5000 × 100 =%2. Sonuç derece değil yüzde olarak istenmiştir.",
      "Eğim dönüşümü",
    ],
    [
      "Menderesin X dış bankında oyulma, Y iç bankında kum birikimi gözleniyor. Hangi eşleştirme doğrudur?",
      [
        "X ve Y yalnız erime",
        "X aşınım, Y birikim",
        "X birikim, Y aşınım",
        "İkisi de yalnız volkanizma",
        "Hiçbir yerde malzeme taşınmıyor",
      ],
      1,
      "Virajın merkezi ile dış kıyıyı ayır.",
      "Dış bankta hızlı akışla aşınma, iç bankta görece yavaş akışla birikim görülebilir. Menderes aynı sistemde iki süreci içerir.",
      "Menderes kıyıları",
    ],
    [
      "Dağdan çıkan akarsu düzlüğe ulaşınca yükünün bir kısmını yayvan biçimde bırakıyor. En uygun şekil hangisidir?",
      [
        "Fiyort",
        "Sarkıt",
        "Birikinti yelpazesi",
        "Volkanik krater",
        "Hörgüç kaya",
      ],
      2,
      "Çıkış konumu ile birikimin yayvanlığını kullan.",
      "Eğim ve taşıma koşulları değişirken yayvan alüvyon birikimi yelpazeyle uyumludur. Kıyı veya magma koşulu verilmemiştir.",
      "Yelpaze",
    ],
    [
      "Bir akarsu bol tortuyla denize ulaşıyor; güçlü kıyı akıntısı tortunun çoğunu uzaklaştırıyor. Hangi yorum en uygundur?",
      [
        "Her ağız zorunlu büyük delta olur.",
        "Tortunun tutulması önemli değildir.",
        "Delta yalnız granitten oluşur.",
        "Delta büyümesi yalnız akarsu adından bulunur.",
        "Bol tortu girişi tek başına delta gelişimini zorunlu kılmaz.",
      ],
      4,
      "Giriş kadar kıyıdan çıkışı da düşün.",
      "Deltada tortunun yeterince tutulması gerekir. Güçlü kıyı taşınımı gelen malzemeyi uzaklaştırabilir; bol giriş tek neden değildir.",
      "Delta koşulları",
    ],
    [
      "Akarsu eski tabanına göre daha derine gömülmüş; kenarlarda eski taban yüzeyleri basamak olarak kalmıştır. En uygun ad hangisidir?",
      ["Seki/taraça", "Kumul", "Kaldera", "Tombolo", "Sarkıt"],
      0,
      "Basamağın eski akarsu tabanıyla ilişkisini izle.",
      "Eski yüzeyin yeni yarılmadan sonra kenarda basamak kalması taraçayı destekler. Her basamak yalnız güncel tortu yığılması değildir.",
      "Taraça geçmişi",
    ],
    [
      "İki ideal kesitte A= 20 m² ve v= 1 m/s; B= 10 m² ve v= 2 m/s verilmiştir. Karşılaştırma hangisidir?",
      [
        "A’nın debisi B’nin iki katıdır.",
        "B’nin hızı A’nın yarısıdır.",
        "Alanlar eşittir.",
        "Debiler eşit 20 m³/s, hızlar farklıdır.",
        "Debi farkı yalnız yatak adından bulunur.",
      ],
      3,
      "Her kesit için alan×hız işlemini ayrı yap.",
      "A’da 20 × 1 = 20; B’de 10 × 2 = 20 m³/s. Eşit debi eşit hız gerektirmez; kesit alanları farklıdır.",
      "Hız–debi ayrımı",
    ],
    [
      "Özgün ideal dönemde akarsu ağzına 150 birim tortu giriyor, kıyıdan 110 birim ayrılıyor; başka terim yok. Net tutulan tortu kaçtır?",
      ["260", "40", "110", "150", "−260"],
      1,
      "Net değişim giriş eksi çıkıştır.",
      "150 − 110 = 40 birim net tortu tutulur. Bu bütçe gerçek delta alanını veya kalınlığını ayrıca hacim/yoğunluk verisi olmadan hesaplamaz.",
      "Tortu bütçesi",
    ],
  ],
  "karstik-sekiller": [
    [
      "Kalkerli arazide yağmur suyu kaya yüzeyinde küçük oluklar açmıştır. Verilen şekil hangisiyle uyumludur?",
      ["Delta", "Barkan", "Falez", "Lapya", "Lav konisi"],
      3,
      "Yüzeydeki küçük çözünme oluklarına odaklan.",
      "Lapya karstik kaya yüzeyindeki küçük çözünme oluklarıdır. Kıyı, rüzgâr veya volkanik birikim kanıtı yoktur.",
      "Lapya",
    ],
    [
      "Bir mağara tavanından karbonat çökelmesiyle aşağı uzanan birikim hangisidir?",
      ["Dikit", "Sarkıt", "Düden", "Dolin", "Moren"],
      1,
      "Başlangıç konumu tavandır.",
      "Tavandan sarkan birikim sarkıttır. Dikit tabandan yükselir; düden yüzey suyunun yer altına girişidir.",
      "Sarkıt konumu",
    ],
    [
      "Mağara tabanında yukarı büyüyen B, tavandan aşağı büyüyen A ile birleşiyor. Birleşmiş biçim hangisidir?",
      ["Traverten", "Obruk", "Sütun", "Kör vadi", "Lapya"],
      2,
      "İki birikim ucu temas ettiğinde oluşanı düşün.",
      "A sarkıt, B dikittir; birleşmeleri sütun oluşturur. Boşluk açılması veya tavan çökmesi anlatılmamıştır.",
      "Sütun",
    ],
    [
      "Karstik arazide yüzey akarsuyu bir açıklıktan yer altına iniyor ve yüzey vadisi burada sonlanıyor. Hangisi doğru eşleştirmedir?",
      [
        "Giriş düden, sonlanan yüzey biçimi kör vadi",
        "Giriş moren, sonlanan biçim delta",
        "Giriş lav, sonlanan biçim krater",
        "Giriş sarkıt, sonlanan biçim barkan",
        "Su döngüden tamamen çıkmıştır",
      ],
      0,
      "Su girişinin adıyla vadinin adını ayır.",
      "Düden yüzeyden yer altına girişle, kör vadi yüzey akışının bu biçimde sonlanmasıyla ilişkilidir. Su yok olmamış, akış yolunu değiştirmiştir.",
      "Yer altı akışı",
    ],
    [
      "Kaynak suyu taşıdığı karbonatı yamaç basamaklarına ekliyor. Hangi süreç ve şekil uygundur?",
      [
        "Magma soğuması–granit",
        "Rüzgâr aşınımı–yardang",
        "Buzul aşınımı–sirk",
        "Kalker çözünmesi–mağara boşluğu",
        "Çökelme/birikim–traverten",
      ],
      4,
      "Yerel olarak madde ekleniyor mu, uzaklaşıyor mu?",
      "Yeni mineral eklenmesi traverten birikimini destekler. Su etkisi her zaman aşınım değildir; mağara boşluğu ise çözünmeyle gelişebilir.",
      "Traverten",
    ],
    [
      "Aynı karst sisteminde kayaç çözünerek mağara açılıyor; içeride damlayan sudan sarkıt büyüyor. Hangi yorum doğrudur?",
      [
        "İkisi de yalnız eriyen lavdır.",
        "Boşluk çözünme, sarkıt çökelme ile ilişkilidir.",
        "Sarkıt tavandaki kayacın mutlaka çökmesidir.",
        "Mağarada hiçbir madde taşınmaz.",
        "İkisi de zorunlu rüzgâr tortusudur.",
      ],
      1,
      "Boşluk ile mineral eklentisinin kütle yönü farklıdır.",
      "Çözünme kayaç maddesini uzaklaştırır; sarkıtta sudaki mineral çökelip eklenir. Bir sistemde iki süreç birlikte yer alabilir.",
      "Çözünme–çökelme",
    ],
    [
      "Geniş, düz tabanlı bir kapalı alan kalker üzerinde gelişmiştir; suyu düdenlerle yer altına inmektedir. Hangi yorum daha uygundur?",
      [
        "Mutlaka kıyı deltasıdır.",
        "Düz olduğu için her zaman deniz seviyesindedir.",
        "Mutlaka güncel lav gölüdür.",
        "Polye ile uyumlu olabilir; tek başına düzlük delta kanıtı değildir.",
        "Her polye yalnız tek dolinin bir günde büyümesidir.",
      ],
      3,
      "Düzlüğün kökenini konum ve malzemeyle birlikte düşün.",
      "Polye geniş karstik kapalı alanla uyumludur; çözünme yanında yapısal koşullar da etkili olabilir. Delta için akarsu ağzı ve tortu birikimi gerekir.",
      "Polye sınırı",
    ],
    [
      "Hangisi karstik çözünmeye uygun kayaçlara doğru örnektir?",
      [
        "Kalker, jips, kaya tuzu",
        "Yalnız bütün metaller",
        "Yalnız saf bazalt lavı",
        "Yalnız plastik",
        "Yalnız tümü aynı mineralden granit",
      ],
      0,
      "Aynı kimyasal bileşim gerektirmeden çözünebilirliği düşün.",
      "Kalker, jips ve kaya tuzu uygun koşullarda çözünmeye elverişli kayaç örnekleridir. Bunların kimyasal bileşimleri aynı değildir.",
      "Çözünebilir kayaç",
    ],
    [
      "Bir yer altı boşluğunun tavanı çökmüş ve derin kapalı çukur oluşmuştur. Hangi şekil desteklenir?",
      ["Birikinti yelpazesi", "Tombolo", "Obruk", "Barkan", "Sander"],
      2,
      "Tavan çökmesi ve kapalı derin çukuru birleştir.",
      "Karstik boşluk tavanının çökmesi obruk gelişimine katkı verebilir. Örnekten bütün obrukların tek insan faaliyetiyle oluştuğu sonucu çıkmaz.",
      "Obruk",
    ],
    [
      "Yalnız bir mağaranın varlığı bilinmektedir; kayaç ve oluşum bilgisi verilmemiştir. Hangi yargı aşırı kesindir?",
      [
        "Kayaç yapısı ayrıca incelenmelidir.",
        "Lav tüpü gibi farklı mağara kökenleri olabilir.",
        "Bir şeklin adı kökeni tek başına kesinleştirmeyebilir.",
        "Daha çok oluşum kanıtı gerekebilir.",
        "Her mağara kesin kalker çözünmesiyle oluşmuştur.",
      ],
      4,
      "Mağara sözcüğü tek süreç mi kapsar?",
      "Karst mağaraları yaygındır fakat lav tüpü veya dalga mağarası gibi farklı kökenler de vardır. Verilmeyen malzeme ve süreç bilgisini fotoğraftan zorunlu saymamak gerekir.",
      "Köken kanıtı",
    ],
  ],
  "ruzgar-ve-buzul": [
    [
      "Kuru, gevşek kumlu ve seyrek bitkili bir yüzeyde kum taneleri taşınıp yığılıyor. Hangi şekillendirici etken desteklenir?",
      [
        "Yalnız magma",
        "Yalnız karstik çökelme",
        "Rüzgâr",
        "Yalnız gelgit",
        "Yalnız kimyasal başkalaşım",
      ],
      2,
      "Taşınabilir kum ve kuru yüzey koşulunu kullan.",
      "Rüzgâr bu koşullarda kum taşıyıp biriktirebilir. Bununla birlikte aynı bölgede sel gibi başka süreçler de çalışabilir; tüm şekilleri tek etkene bağlama.",
      "Rüzgâr koşulları",
    ],
    [
      "A kum boyutlu hilal tepe, B silt ağırlıklı rüzgâr örtüsüdür. Hangi eşleştirme doğrudur?",
      [
        "A lös, B sirk",
        "A moren, B krater",
        "A tombolo, B falez",
        "A kanyon, B dolin",
        "A barkan, B lös",
      ],
      4,
      "Tane boyu ve biçim kanıtını birlikte kullan.",
      "Barkan hilal biçimli kumul, lös çoğunlukla silt boyutlu rüzgâr birikimidir. Aynı taşıyıcı bütün malzemeleri aynı boyda yapmaz.",
      "Barkan ve lös",
    ],
    [
      "Buzul önündeki X tortusu kil, kum ve iri blokları düzensiz biçimde içeriyor. Doğrudan buzul birikimi açısından en uygun ad hangisidir?",
      ["Moren", "Traverten", "Mercan resifi", "Obsidiyen", "Dikit"],
      0,
      "Kötü boylanmış karışık tane topluluğuna bak.",
      "Buzul farklı boydaki malzemeleri birlikte taşıyıp bırakabilir; bu morenle uyumludur. Kesin saha yorumu için diğer kanıtlar da değerlendirilir.",
      "Moren",
    ],
    [
      "Buzulun erime suyu çakıl ve kumu ayırıp tabakalı bir düzlükte biriktiriyor. Son taşıyıcı ve şekil hangisidir?",
      [
        "Buz–sarkıt",
        "Rüzgâr–lapya",
        "Magma–kaldera",
        "Akarsu/erime suyu–sander",
        "Deniz buzu–kalker",
      ],
      3,
      "Buzul yakınlığını son taşıyıcıyla eşitleme.",
      "Sander erime sularının taşıyıp biriktirdiği malzemeyle ilişkilidir. Boylanma ve tabakalanma suyla taşınmanın kanıtıdır; doğrudan morenle aynı düzen değildir.",
      "Sander",
    ],
    [
      "Kara buzulundan kopup denizde yüzen X ve deniz suyunun donmasıyla oluşan Y verilmiştir. Hangisi doğrudur?",
      [
        "İkisi de mutlaka kara vadisi kazmıştır.",
        "X aysberg, Y bankiz",
        "X bankiz, Y aysberg",
        "İkisi de yalnız yağmur damlasıdır.",
        "Y rüzgâr kumuludur.",
      ],
      1,
      "Buzun oluştuğu ortamı izle.",
      "Aysberg kara buzulundan kopar; bankiz deniz buzudur. Denizde yüzmeleri aynı köken ve aynı arazi aşındırması anlamına gelmez.",
      "Buz türleri",
    ],
    [
      "Bir yüksek dağda U vadi, çizikli kaya ve moren gözleniyor; güncel buzul görülmüyor. Hangi sonuç uygundur?",
      [
        "Geçmiş buzullaşma desteklenir; güncel buzul varlığı zorunlu değildir.",
        "Bütün şekiller kesin bugün oluşmuştur.",
        "Buzul mutlaka denize ulaşmıştır.",
        "Vadi kesin yalnız kıyı dalgasıdır.",
        "Geçmiş iklimin her günü hesaplanabilir.",
      ],
      0,
      "Eski şekil ile güncel buz örtüsünü ayır.",
      "Birlikte bulunan kanıtlar geçmiş buzul etkinliğini destekler. Bunlar güncel buzul, denize ulaşım veya kesin oluşum tarihi hakkında tek başına yeterli değildir.",
      "Geçmiş izler",
    ],
    [
      "Kalıcı kar sınırı hakkında hangisi daha doğrudur?",
      [
        "Bütün dünyada 1000 m’dir.",
        "Yalnız enlemle belirlenir; yağış etkilemez.",
        "Ekvatora yakın yüksek dağlarda hiç buzul olamaz.",
        "Bankizin yüksekliğiyle aynıdır.",
        "Enlem, yükselti, bakı ve yağış koşullarıyla değişebilir.",
      ],
      4,
      "Sıcaklığın yanı sıra karın beslenmesini de düşün.",
      "Kalıcı kar sınırı bir ideal iklim–yükselti kavramıdır; aynı enlemde bakı ve yağış gibi koşullar fark yaratabilir. Ekvatoral yüksek dağlarda da buzullar bulunabilir.",
      "Kalıcı kar koşulları",
    ],
    [
      "Bir kıyı girintisinin yalnız şekli Hamsilos’a benziyor. Bunu fiyort diye sınıflamak için asıl hangi ek kanıt gerekir?",
      [
        "Kıyının adının uzunluğu",
        "Yakında kum plaj bulunması",
        "Deniz altında kalmış buzul vadisi geçmişi",
        "Herhangi bir yerde az kar yağmış olması",
        "Kentin nüfusu",
      ],
      2,
      "Fiyorttaki vadinin önceki etkenini hatırla.",
      "Fiyort için buzulla oyulmuş vadinin deniz altında kalması gerekir. Girintili kıyı görüntüsü veya Türkiye’de yüksek dağ buzullarının varlığı bunu tek başına kanıtlamaz.",
      "Fiyort sınırı",
    ],
    [
      "Bir kayada tafoni adı verilen oyuklar görülüyor. Hangi açıklama daha dikkatli ve doğrudur?",
      [
        "Her oyuk yalnız bir kum tanesinin tek çarpmasıdır.",
        "Tafoni mutlaka volkanik kraterdir.",
        "Tafoni yalnız bankiz birikimidir.",
        "Tuz ayrışması ve başka süreçler de katkı verebilir; tek etken zorunlu tutulmaz.",
        "Oyuk varsa kaya hiç ayrışmamıştır.",
      ],
      3,
      "Bir şekil adı her yerde tek mekanizma mı gerektirir?",
      "Tafoni gelişimi ayrışma ve aşındırmanın karma etkileriyle ilişkilidir; tuz ayrışması önemli olabilir. Yalnız rüzgâr oyması şeklinde istisnasız genelleme doğru değildir.",
      "Karma süreç",
    ],
    [
      "İnce taneler rüzgârla uzaklaşırken iri parçalar yüzeyde kalıyor. Verilen olay için en uygun terim hangisidir?",
      [
        "Metamorfizma",
        "Deflasyon",
        "Karbonat çökelmesi",
        "Magma soğuması",
        "Kaldera çökmesi",
      ],
      1,
      "Taşınan ince malzeme ve geride kalan iri yüzeyi ayır.",
      "Deflasyon gevşek malzemenin rüzgârla uzaklaştırılmasıdır. İri taşlı bir artık yüzey oluşabilir; bu yeni lavın soğuması değildir.",
      "Deflasyon",
    ],
  ],
  "dalga-akinti-kiyi-tipleri": [
    [
      "Ada ile ana kara arasında kıyı taşınımıyla kum boynu birikmiştir. Hangi şekil desteklenir?",
      ["Fiyort", "Tombolo", "Sirk", "Obruk", "Horst"],
      1,
      "Kum bağlantısının hangi iki alanı birleştirdiğine bak.",
      "Tombolo birikimin adayı ana karaya bağlamasıyla ilişkilidir. Fiyort eski buzul vadisinin su altında kalmasıdır; burada böyle bir kanıt yoktur.",
      "Tombolo",
    ],
    [
      "Kordon bir koyun ağzını kapatmış ve gerisinde su alanı kalmıştır. Şekil ve su özelliği için hangisi uygundur?",
      [
        "Delta; mutlaka denizden tuzludur.",
        "Barkan; mutlaka buzla kaplıdır.",
        "Kaldera; mutlaka tatlıdır.",
        "Lagün; tatlılık deniz bağlantısı, giriş ve buharlaşmaya bağlıdır.",
        "Sirk; kıyı bağlantısı önemsizdir.",
      ],
      3,
      "Çanak kökeni suyun kimyasını tek başına verir mi?",
      "Kıyı seti gerisindeki su alanı lagünle uyumludur. Tuzluluk su bütçesi ve denizle bağlantıya bağlıdır; zorunlu tatlılık çıkarılamaz.",
      "Lagün",
    ],
    [
      "A akarsu V vadisinin, B buzul çizikli U vadinin denizle dolmasıyla oluşmuştur. Hangisi doğru eşleştirmedir?",
      [
        "A ria, B fiyort",
        "A fiyort, B ria",
        "A moren, B lös",
        "A sarkıt, B dikit",
        "İkisi de yalnız güncel kumul",
      ],
      0,
      "Su basmasından önce vadinin etkenini belirle.",
      "Ria su altında kalmış akarsu vadisi; fiyort su altında kalmış buzul vadisiyle ilişkilidir. Görüntüde girinti bulunması tek ayrım değildir.",
      "Ria–fiyort",
    ],
    [
      "Kıyıya paralel eski sırtlar kısmen denizle örtülmüş; uzun sırt tepeleri paralel adalar olarak kalmıştır. Hangi kıyı örüntüsü uygundur?",
      ["Watt", "Kertik vadi", "Sander", "Lapya", "Dalmaçya"],
      4,
      "Adaların düzenini eski sırt doğrultusuyla bağla.",
      "Paralel sırt–vadi düzeninin suyla örtülmesi dalmaçya örüntüsünü destekler. Her adalı kıyı dalmaçya değildir; burada ayırt edici veri düzen ve geçmiş geometridir.",
      "Dalmaçya",
    ],
    [
      "Dik kıyının tabanı oyuluyor; üst kütle çöktükçe duvar geriliyor ve önünde kayalık düz yüzey kalıyor. İkili hangisidir?",
      [
        "Barkan–lös",
        "Dolin–uvala",
        "Falez–abrazyon platformu",
        "Horst–graben",
        "Krater–maar",
      ],
      2,
      "Duvar ile önündeki aşınım yüzeyini ayrı adlandır.",
      "Gerileyen dik kıyı falez, önündeki aşınım düzlüğü abrazyon platformudur. Kum birikimi veya fay blok hareketi verilmemiştir.",
      "Kıyı aşınımı",
    ],
    [
      "Bir dalga açık denizde ilerliyor. Dalga ile yönlü akıntıyı ayıran en uygun ifade hangisidir?",
      [
        "Her su parçacığı dalgayla aynı hızda bütün okyanusu geçer.",
        "Dalga salınım ve enerji yayılımı; akıntı yönlü su hareketidir.",
        "Akıntı yalnız katı kayanın yer değiştirmesidir.",
        "Dalgada hiçbir enerji bulunmaz.",
        "İkisi de yalnız yer altı suyu hareketidir.",
      ],
      1,
      "Şeklin ilerlemesi ile aynı suyun taşınmasını eşitleme.",
      "Sıradan dalgada salınım ve enerji yayılımı önemlidir; parçacıklar bütün dalga yolunu aynı biçimde katetmez. Akıntı yönlü su hareketidir; kıyı kırılması ayrıca net taşıma yaratabilir.",
      "Dalga–akıntı",
    ],
    [
      "Dağlar kıyıya genel olarak dik uzanıyor, vadiler kıyıdan içeri sokuluyor. Hangi okul kıyı sınıflamasıyla uyumludur?",
      [
        "Yalnız kutup bankizi",
        "Yalnız bütün fiyortlar",
        "Kesin her yerde aynı boyuna kıyı",
        "Yalnız karstik obruk",
        "Enine kıyı örüntüsü",
      ],
      4,
      "Dağ doğrultusunu kıyı çizgisine göre karşılaştır.",
      "Kıyıya dik sırt–vadi düzeni enine kıyı örüntüsünü destekler. Bu yön bilgisi tek başına bütün kıyıların aynı derinlik ve iklimde olduğunu göstermez.",
      "Kıyı yönü",
    ],
    [
      "Güçlü gelgitte geniş sığ yüzeyler çekilme sırasında açığa çıkıyor. Hangi kıyı tipi desteklenir?",
      ["Watt", "Kaldera", "Moren", "Sarkıt", "Yardang"],
      0,
      "Periyodik açığa çıkan sığ gelgit düzlüğüne odaklan.",
      "Watt kıyıları gelgitin belirgin olduğu sığ alanlarda ortaya çıkar. Tek bir fırtınanın suyu yığması periyodik gelgitle aynı olay değildir.",
      "Watt",
    ],
    [
      "Bir kıyıda mercanların kalkerli iskeletleri birikerek resif oluşturuyor. En uygun açıklama hangisidir?",
      [
        "Yalnız buzun kaya kazımasıdır.",
        "Yalnız granitin katılaşmasıdır.",
        "Yalnız bütün tuzların buharlaşmasıdır.",
        "Uygun deniz koşullarında biyolojik karbonat birikimi vardır.",
        "Bütün sıcak denizler zorunlu aynı resifle kaplıdır.",
      ],
      3,
      "Canlıların iskelet katkısını ve çevre koşullarını ayır.",
      "Resif biyolojik karbonat birikimiyle ilişkilidir. Sıcaklık yanında ışık, su koşulları ve canlı ortamı önemlidir; bütün sıcak denizlerde aynı sonuç zorunlu değildir.",
      "Mercanlı kıyı",
    ],
    [
      "Buzulla işlenmiş alçak yüzey denizle örtülmüş; çok sayıda küçük kayalık ada kalmıştır. Verilen geçmiş hangi örüntüyü destekler?",
      ["Tombolo", "Delta", "Skyer", "Plato", "Kum taşı"],
      2,
      "Alçak buzul işlenmiş arazi ve çoklu kayalık adaları birleştir.",
      "Skyer kıyılarında buzulla işlenmiş alçak arazinin kısmen su altında kalması önemlidir. Dalmaçya için paralel sırt düzeni; fiyort için derin buzul vadisi kanıtı aranır.",
      "Skyer",
    ],
  ],
  "turkiye-dis-kuvvetler": [
    [
      "Bafra ve Çarşamba deltalarını oluşturan başlıca akarsular sırayla hangisidir?",
      [
        "Yeşilırmak–Kızılırmak",
        "Göksu–Seyhan",
        "Kızılırmak–Yeşilırmak",
        "Gediz–Büyük Menderes",
        "Fırat–Dicle",
      ],
      2,
      "İki Karadeniz deltası için ayrı ağız eşleştirmesi yap.",
      "Bafra Kızılırmak, Çarşamba Yeşilırmak ağzındaki alüvyon birikimiyle ilişkilidir. İki delta aynı nehrin farklı adı değildir.",
      "Delta–nehir",
    ],
    [
      "Kapadokya’da tüf üstündeki dayanıklı blok çevresine göre korunmuş sütun oluşturuyor. En uygun süreç zinciri hangisidir?",
      [
        "Yalnız güncel magma soğuması son biçimi tamamlar.",
        "Yalnız bankiz kum biriktirir.",
        "Sütunun her yeri aynı hızla çözünür.",
        "Volkanik tüf üzerinde farklı hızdaki yüzey aşındırması peribacasını biçimlendirir.",
        "Yalnız mercan iskeletleri üst üste gelir.",
      ],
      3,
      "Malzemenin kökeni ile son biçimlenmeyi ayır.",
      "Tüf volkanik malzemedir; daha dayanıklı başlığın koruduğu alan ve çevrenin seçici aşınması dış süreçle sütunu biçimlendirir. Kayacın kökeni son şeklin tek etkeni değildir.",
      "Peribacası zinciri",
    ],
    [
      "Pamukkale’de kaynak suyundan karbonat çökelip basamaklara ekleniyor. Yerel olay hangisidir?",
      [
        "Buzul koparması",
        "Yalnız magma sokulması",
        "Rüzgârla kum aşınımı",
        "Sadece tavan çökmesi",
        "Traverten birikimi",
      ],
      4,
      "Yeni mineralin yüzeye eklenmesine bak.",
      "Traverten çökelme/birikim şeklidir. Su bulunması bunun mutlaka çözünme ve malzeme kaybı olduğu anlamına gelmez.",
      "Pamukkale",
    ],
    [
      "Konya Karapınar’da kuru, gevşek kumlar taşınarak tepecikler oluşturuyor. Hangi etken ve ürün desteklenir?",
      [
        "Rüzgâr–kumul",
        "Magma–granit",
        "Buzul–kaldera",
        "Kalker–mermer",
        "Dalga–sirk",
      ],
      0,
      "Kumun kuru yüzeyde taşınmasını değerlendir.",
      "Karapınar’ın uygun alanlarında rüzgâr kum taşıyıp kumul biriktirebilir. Bu yerel örnek bölgedeki bütün şekillerin yalnız rüzgâr ürünü olduğunu göstermez.",
      "Karapınar",
    ],
    [
      "Kaçkarlar’da sirk çanağı, U vadi ve karışık taneli sırt birlikte görülüyor. Hangi yorum uygundur?",
      [
        "Yalnız deniz mercanları büyümüştür.",
        "Buzul aşındırması ve moren birikimi birlikte desteklenir.",
        "Bütün şekiller yalnız yer altı suyu kaynağıdır.",
        "Sadece rüzgâr lösü vardır.",
        "Bu kanıtla denize ulaşmış buzul zorunludur.",
      ],
      1,
      "Oyulmuş şekilleri bırakılmış yükten ayır.",
      "Sirk ve U vadi buzul aşınımı, karışık tortu sırtı moren birikimiyle uyumludur. Denizle bağlantı veya güncel buzul varlığı ayrıca kanıtlanmalıdır.",
      "Kaçkar buzul izleri",
    ],
    [
      "Yağışla doygun yamaçta kaya ve toprak kütlesi bir kayma yüzeyi boyunca birlikte yer değiştiriyor. Olay hangisidir?",
      [
        "Delta ilerlemesi",
        "Volkanik püskürme",
        "Heyelan",
        "Sarkıt büyümesi",
        "Bankiz oluşumu",
      ],
      2,
      "Kanalda tek tek tane taşınması mı, kütle kayması mı?",
      "Bir yamaç kütlesinin yer çekimiyle kayması heyelandır. Doygunluk, eğim ve jeolojik yapı etkilidir; her yağış tek başına aynı sonucu doğurmaz.",
      "Kütle hareketi",
    ],
    [
      "Kapıdağ’da birikmiş kıyı boynu eski adayı ana karaya bağlamıştır. Verilen biçim hangisidir?",
      ["Tombolo", "Fiyort", "Obruk", "Kertik vadi", "Moren"],
      0,
      "Adanın karayla bağlantısına odaklan.",
      "Tombolo kıyı birikiminin adayı ana karaya bağlamasıdır. Bu örnek dalga aşındırmasıyla açılan bir vadi veya buzul biçimi değildir.",
      "Türkiye tombolosu",
    ],
    [
      "Teke–Taşeli çevresinde uygun kalker arazilerde mağara ve polye gözleniyor. Hangi süreç ortak bağlamı sağlar?",
      [
        "Her taşın tamamen magma olması",
        "Yalnız deniz buzu",
        "Yalnız rüzgâr kumu",
        "Kayaçların hiçbir suyla temas etmemesi",
        "Çözünmeye elverişli kayaçta suyun karstik işlemesi",
      ],
      4,
      "Yer adından önce kayaç ve çözünme bilgisini kullan.",
      "Kalkerli uygun koşullarda karstik çözünme ve kapalı drenaj şekilleri gelişebilir. Bütün bölgenin her metrekaresi aynı kayaç ve şekle sahip değildir.",
      "Türkiye karstı",
    ],
    [
      "Göksu’nun ağzında tortu birikimiyle gelişen delta için verilen örnek hangisidir?",
      [
        "Kaçkar sirki",
        "Nemrut kalderası",
        "Karapınar kumulu",
        "Silifke deltası",
        "Pamukkale traverteni",
      ],
      3,
      "Akarsu adıyla kıyı birikimini eşleştir.",
      "Göksu ağzındaki Silifke deltası akarsu alüvyonlarının uygun kıyıda tutulmasıyla ilişkilidir. Diğer örneklerin taşıyıcı ve süreçleri farklıdır.",
      "Göksu–Silifke",
    ],
    [
      "Türkiye’de bir akarsu kıyıya tortu getiriyor fakat güçlü kıyı taşınımı bunu uzaklaştırıyor. Hangi yaklaşım uygundur?",
      [
        "Nehir adı varsa delta her koşulda büyür.",
        "Delta için tortu girişi yanında kıyıda tutulma koşulları değerlendirilir.",
        "Yalnız havanın sıcaklığı yeterlidir.",
        "Her kıyı düzlüğü aynı yaşta volkaniktir.",
        "Tortunun nereye gittiği önemsizdir.",
      ],
      1,
      "Birikim bütçesinin çıkışını unutma.",
      "Delta gelişiminde akarsu beslemesi, kıyı derinliği ve dalga/akıntı etkisi birlikte önemlidir. Gelen bütün tortunun birikimde kaldığı varsayılmaz.",
      "Koşullu kıyı sonucu",
    ],
  ],
  "turkiye-yer-sekilleri": [
    [
      "Denizden 1500 m yüksekteki X yüzeyi çevresindeki dağlara göre alçak ve az eğimli tabandır. Yalnız bu bilgiyle hangisi daha uygundur?",
      [
        "Mutlaka deniz deltasıdır.",
        "Her yüksek alan volkan konisidir.",
        "Plato olması için başka kanıt asla gerekmez.",
        "Yüksek ova ile uyumlu olabilir; rakım tek başına plato demek değildir.",
        "1500 m’de düzlük olamaz.",
      ],
      3,
      "Mutlak yükselti ile çevreye göre konumu ayır.",
      "Ova deniz seviyesinde olmak zorunda değildir. Çevresine göre alçak, az eğimli taban yüksek ova olabilir; plato için göreli yüksek yarılmış yüzey kanıtı gerekir.",
      "Yüksek ova",
    ],
    [
      "Yüksekçe bir düzlük akarsuların derin vadileriyle parçalanmıştır. Verilen yer şekli hangisiyle uyumludur?",
      ["Plato", "Barkan", "Tombolo", "Falez", "Krater"],
      0,
      "Düzlük ile yarılma ve göreli yüksekliği birlikte kullan.",
      "Plato akarsularla yarılmış, çevresine göre yüksek görece düz yüzeydir. Tanımda bütün örnekler için zorunlu tek mutlak rakım yoktur.",
      "Plato tanımı",
    ],
    [
      "Ağrı, Toroslar ve Bozdağlar için verilen temel köken eşleştirmesi hangisidir?",
      [
        "Üçü de aynı kıyı kumuludur.",
        "Ağrı karstik; Toroslar kumul; Bozdağlar mercan",
        "Ağrı delta; Toroslar lös; Bozdağlar buzul",
        "Üçü de yalnız güncel alüvyon",
        "Ağrı volkanik; Toroslar kıvrım kuşağı; Bozdağlar kırık dağ",
      ],
      4,
      "Yüksek görünüş yerine ana oluşum kanıtını düşün.",
      "Ağrı volkanik, Toroslar Alp–Himalaya kıvrım kuşağı, Batı Anadolu Bozdağlar horst/kırık dağ örneğidir. Aynı yükselti ailesi aynı kökeni gerektirmez.",
      "Dağ kökenleri",
    ],
    [
      "Erzurum–Kars’ta lav örtüsü üzerinde akarsularla yarılmış geniş yüksek yüzey anlatılıyor. Hangi sınıflama uygundur?",
      [
        "Yalnız kıyı lagünü",
        "Yalnız kumul",
        "Lav platosu bağlamı",
        "Her durumda buzul bankizi",
        "Mecburen deniz tabanı",
      ],
      2,
      "Malzeme ile son yüzey biçimini birlikte söyle.",
      "Lav volkanik malzeme kökenini, yarılmış yüksek düzlük plato biçimini gösterir. Bir yüzeyin bütün görünüşünü yalnız volkan konisi diye etiketlemek yetersizdir.",
      "Lav platosu",
    ],
    [
      "Torosların birçok kesimi kıyıya paralel uzanıyor. Ulaşım için hangi koşullu yorum daha uygundur?",
      [
        "Kıyıdan içeri hiçbir geçiş mümkün değildir.",
        "Vadiler ve geçitler doğal geçişi belirli koridorlara yöneltebilir.",
        "Her yol mutlaka en yüksek zirveden geçer.",
        "Tünel ve yol yapımı topoğrafyadan hiç etkilenmez.",
        "Dağ yönü bütün ekonomik sonuçları tek başına hesaplar.",
      ],
      1,
      "Engel etkisini imkânsızlıkla karıştırma.",
      "Paralel kuşak kıyı–iç kesim geçişini sınırlayabilir; geçitler ve vadiler koridor sağlar. Gerçek yol seçimine tünel, maliyet ve diğer beşerî koşullar da etki eder.",
      "Dağ ve ulaşım",
    ],
    [
      "Türkiye’de yükselti batıdan doğuya genel olarak artar. Batıda 2200 m dağ, doğuda 900 m ova verilmesi ne gösterir?",
      [
        "Genel eğilimle birlikte yerel nokta istisnaları olabilir.",
        "Her doğu noktası zorunlu daha yüksektir.",
        "Ülke ortalaması kesin 900 m’dir.",
        "Bütün doğu ovaları deniz seviyesindedir.",
        "Verilen nokta değerleri imkânsızdır.",
      ],
      0,
      "Genel ortalama ile bütün nokta çiftlerini ayır.",
      "Bölgesel genel artış her doğu noktasının her batı noktasından yüksek olmasını gerektirmez. Farklı yer şekilleri ve yerel yükselti farkları birlikte bulunur.",
      "Genel–özel ölçek",
    ],
    [
      "Kıyıdan içeri üç özgün rota için en yüksek noktalar A 1800 m, B 1100 m, C 1400 m verilmiştir. Yalnız aşma yüksekliğini küçültmek için hangisi seçilir?",
      [
        "A; çünkü sayısı en büyük",
        "C; bütün yolları en kısa yapar",
        "Her rota mutlaka aynı yükseltidedir.",
        "B; ayrıca en ucuz olduğu kesinleşir.",
        "B; diğer rota ölçütleri için ek veri gerekir.",
      ],
      4,
      "İstenen tek ölçütü ve en küçük değeri kullan.",
      "Verilen en yüksek noktaların en küçüğü 1100 m ile B’dir. Bu seçim yalnız aşma yüksekliği içindir; uzunluk, maliyet ve güvenlik hakkında veri yoktur.",
      "Koşullu rota",
    ],
    [
      "Taşeli, Bafra ve Gediz için hangisi doğru örnek dizisidir?",
      [
        "Üçü de aynı volkan kalderası",
        "Taşeli kıyı oku; Bafra sirk; Gediz bankiz",
        "Taşeli karstik plato; Bafra delta; Gediz graben ovası bağlamı",
        "Üçü de zorunlu deniz buzulu",
        "Taşeli kumul; Bafra mermer; Gediz resif",
      ],
      2,
      "Biçim ile ana oluşum bağlamını ayrı eşleştir.",
      "Taşeli karstik plato, Bafra Kızılırmak ağız birikimi, Gediz Batı Anadolu çöküntü ovası bağlamıyla anlatılır. Gediz’in alüvyal dolgusu yapısal kökeni dışlamaz.",
      "Üç arazi örneği",
    ],
    [
      "Arazinin ortalama yükseltisi 1200 m verilmiştir. Yalnız bu sayıdan hangisi kesin bulunamaz?",
      [
        "Verilen ortalamanın biriminde metre olduğu",
        "Deniz düzeyi referansının kullanıldığı",
        "Ortalama değerin 1200 olduğu",
        "Bütün yamaçların eğimi ve vadilerin yarılma miktarı",
        "Tekil yüksekliklerin ortalamadan farklı olabileceği",
      ],
      3,
      "Ortalama engebenin bütün bilgisini taşır mı?",
      "Ortalama yükselti yerel eğim ve yarılmayı tek başına vermez. Aynı ortalamaya sahip düz ve çok parçalı araziler bulunabilir; mesafe ve nokta değerleri gerekir.",
      "Yükselti–engebe",
    ],
    [
      "Ege’de kıyıya dik sırtlar ve aradaki alçak vadiler verilmiştir. Hangi yorum desteklenebilir?",
      [
        "Bütün vadiler aynı iklimi zorunlu taşır.",
        "Girintili kıyı ve uygun koridorlardan içeri geçiş kolaylaşabilir.",
        "Kıyı çizgisi her yerde dümdüz olmak zorundadır.",
        "Hiçbir yerde yerel yükselti etkisi bulunmaz.",
        "Deniz etkisi her noktada aynı uzaklığa ulaşır.",
      ],
      1,
      "Doğrultunun olası etkisini yerel koşullarla sınırla.",
      "Enine örüntü koy–körfezleri ve kıyı–iç kesim koridorlarını destekleyebilir. Uzaklık, yükselti ve rüzgâr gibi koşullar sonucu değiştirir; istisnasız tek iklim sonucu çıkarılmaz.",
      "Ege koridorları",
    ],
  ],
  "dunyada-sular": [
    [
      "Dünya su hacminin yaklaşık %2,5’i tatlı su olarak veriliyor. Bu ifade hakkında hangisi doğrudur?",
      [
        "Dünya yüzeyinin %2,5’inin kara olduğu anlamına gelir.",
        "Tatlı suyun tamamı doğrudan içilebilir.",
        "Hacim payıdır; alan oranı ve erişilebilir temiz su miktarı ayrı ölçütlerdir.",
        "Okyanusların tamamı tatlıdır.",
        "Her akiferin suyu sınırsızdır.",
      ],
      2,
      "Yüzdenin paydasını ve kalite ölçütünü ayır.",
      "%2,5 toplam su hacmi içindeki tatlı payını anlatır. Dünya alanındaki kara–su oranıyla farklıdır; tatlılık kalite ve kolay erişim garantisi değildir.",
      "Payda ve erişim",
    ],
    [
      "İdeal göl dönem başında 80 hm³ su içeriyor. Girişler toplam 30, buharlaşma 10 ve dış akış 15 hm³; başka terim yok. Son stok kaçtır?",
      ["55 hm³", "75 hm³", "110 hm³", "135 hm³", "85 hm³"],
      4,
      "Başlangıç + giriş − çıkış işlemini yap.",
      "80 + 30 − 10 − 15 = 85 hm³. Net değişim +5 hm³’tür; son stok ile yalnız değişim farklıdır.",
      "Su bütçesi",
    ],
    [
      "Kapalı ideal bütçede başlangıç 8 hm³, giriş 4 hm³ ve istenen çıkış 20 hm³. Başka kaynak yok. Hangi sonuç doğrudur?",
      [
        "12 hm³ mevcut; 8 hm³ çıkış karşılanamaz.",
        "Gerçek son su hacmi −8 hm³ olur.",
        "Çıkışların tamamı kesin karşılanır.",
        "Stok otomatik 20 hm³’e yükselir.",
        "Eksik su kütlesi yok sayılabilir.",
      ],
      0,
      "Talep mevcut toplamı aşıyor mu?",
      "Mevcut su 8 + 4 = 12 hm³;20 hm³ talebin 8 hm³’ü karşılanamaz. Son fiziksel stok negatif sayı olamaz; model açığı belirtmelidir.",
      "Bütçe açığı",
    ],
    [
      "İki az geçirgen tabaka arasındaki basınçlı akiferde kuyu suyu yükseliyor, fakat yüzeye ulaşmıyor. Hangisi doğrudur?",
      [
        "Artezyen koşulu kesin imkânsızdır.",
        "Her basınçlı su mutlaka gayzerdir.",
        "Suyun kalitesi yalnız bu bilgiyle içilebilir bulunur.",
        "Artezyen kuyu olabilir; kendiliğinden yüzeye taşma zorunlu değildir.",
        "Kuyu suyu magmadır.",
      ],
      3,
      "Basınçlılığı piezometrik düzeyle ilişkilendir.",
      "Basınçlı akiferde kuyu suyu basınç düzeyine yükselir; bu düzey arazi yüzeyinden aşağıda kalabilir. Akan artezyen bütün artezyenlerin zorunlu özelliği değildir.",
      "Artezyen sınırı",
    ],
    [
      "A gölünün çanağı eski buzul aşındırmasıyla, B’nin çanağı heyelan seti gerisinde oluşmuştur. Suyun tuzluluğu verilmemiş. Hangisi doğrudur?",
      [
        "A zorunlu tuzlu, B zorunlu sodalıdır.",
        "Çanak kökenleri farklıdır; tuzluluk için su bütçesi ve kimya gerekir.",
        "İkisi de mutlaka lav gölüdür.",
        "Her göl yalnız kıyı dalgasıyla oluşur.",
        "Çanak kökeni ancak gölün rengine bakılarak bulunur.",
      ],
      1,
      "Çanağı yapan olay ile suyun özelliği iki ayrı sorudur.",
      "A buzul çanağı, B heyelan seti kökenini gösterir. Giriş, çıkış, buharlaşma ve çözünmüş maddeler bilinmeden kesin tuzluluk seçilmez.",
      "Göl kökeni ve suyu",
    ],
    [
      "Bir kesitten 3 saniyede 45 m³ su geçiyor. Ortalama debi nedir?",
      ["135 m³/s", "48 m³/s", "42 m³/s", "3 m³/s", "15 m³/s"],
      4,
      "Toplam hacmi geçen süreye böl.",
      "45/3 = 15 m³/s. Bu ölçüm o aralığın ortalamasıdır; tek başına yıllık rejimi vermez.",
      "Debi birimi",
    ],
    [
      "Denize yüzeysel çıkışı olmayan, iç çanakta sonlanan havza için hangisi uygundur?",
      [
        "Su döngüsünden tamamen kopmuştur.",
        "Hiç buharlaşma olmaz.",
        "Kapalı havzadır; sızma ve buharlaşma yine olabilir.",
        "Havzadaki suyun hepsi zorunlu tuzsuzdur.",
        "Dünyadaki bütün su burada üretilir.",
      ],
      2,
      "Kapalı sözcüğünün hangi bağlantıyı anlattığını belirle.",
      "Kapalı havza denize yüzeysel çıkış bulunmaması bağlamındadır. Atmosferle ve yer altıyla su değişimi olabilir; bütün gezegen döngüsünden yalıtılmış değildir.",
      "Havza sınırı",
    ],
    [
      "Bir malzemede çok gözenek var, fakat gözenekler arası bağlantı zayıf. Hangi yorum daha doğrudur?",
      [
        "Gözeneklilik yüksek olsa da suyu iletme kolaylığı düşük olabilir.",
        "Gözenek varsa geçirgenlik mutlaka sonsuzdur.",
        "Hiç su depolanamaz.",
        "Malzeme mutlaka volkan lavıdır.",
        "Bağlantı su akışını hiç etkilemez.",
      ],
      0,
      "Depolama boşluğu ile iletim bağlantısını ayır.",
      "Gözeneklilik boşluk oranıyla, geçirgenlik bağlantı ve akış kolaylığıyla ilişkilidir. Yüksek gözeneklilik her zaman yüksek iletim anlamına gelmez.",
      "Akifer özellikleri",
    ],
    [
      "Bir sıcak kaynak sürekli sakin akıyor; dönemsel basınçlı püskürme kanıtı yok. Yalnız sıcak olması hangi sonucu zorunlu yapmaz?",
      [
        "Suyun sıcak ölçüldüğünü",
        "Kalite için ayrıca analiz gerektiğini",
        "Yer altı akışının incelenebileceğini",
        "Kaynağın kesin gayzer olduğunu",
        "Kaynak türü için ek koşullar bulunduğunu",
      ],
      3,
      "Gayzerin ayırt edici hareketini ara.",
      "Gayzer uygun ısı, su ve yer altı kanal/basınç koşullarında dönemsel püskürmeyle ilişkilidir. Her sıcak kaynak gayzer değildir; kalite de sıcaklıktan bulunmaz.",
      "Gayzer sınırı",
    ],
    [
      "Bir gölün çıkışı yok, buharlaşması güçlü ve çözünmüş tuz girişi var. Hangi sınırlı yorum uygundur?",
      [
        "Göldeki bütün tuz suyla birlikte buharlaşır.",
        "Tuz birikimi kolaylaşabilir; kesin oran için tuz ve su bütçesi gerekir.",
        "Her çıkışsız göl aynı yüzde tuzludur.",
        "Çanağın mutlaka volkanik olduğu kesinleşir.",
        "Buharlaşma su stokunu artırır.",
      ],
      1,
      "Su çıkışı ile çözünmüş tuzun çıkışını ayrı düşün.",
      "Buharlaşan suyun çoğu çözünmüş tuzu gölde kalır; tuz birikimi artabilir. Kesin tuzluluk için kütle, hacim, giriş/çıkış ve karışım bilgisi gerekir.",
      "Tuzluluk koşulu",
    ],
  ],
};
export const forge016GeographyTopics: Record<string, string> = {
  "cografya-kayaclar": "detail-48",
  "turkiye-ic-kuvvetler": "detail-49",
  "dis-kuvvetler-akarsular": "detail-50",
  "karstik-sekiller": "detail-51",
  "ruzgar-ve-buzul": "detail-52",
  "dalga-akinti-kiyi-tipleri": "detail-53",
  "turkiye-dis-kuvvetler": "detail-54",
  "turkiye-yer-sekilleri": "detail-55",
  "dunyada-sular": "detail-56",
};
export const forge016GeographyGuides: LessonGuide[] = guides.map(
  ({ title: _title, ...guide }) => guide,
);
export const forge016GeographyLessons: Lesson[] = guides.map((g) => ({
  id: g.id,
  subjectId: "tyt-cografya",
  title: txt(g.title),
  minutes: g.minutes,
  objectives: g.objectives.map(txt),
  body: g.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: banks[g.id].map(
    ([prompt, options, answer, hint, explanation, skill], i): Question => ({
      id: `f016-${g.id}-q${i + 1}`,
      prompt: txt(prompt),
      options: options.map(txt),
      answer,
      hint: txt(hint),
      explanation: txt(explanation),
      skill,
    }),
  ),
  source: txt(g.source),
  tags: [
    "kaynakli-anlatim",
    "etkilesimli",
    "ozgun-sorular",
    forge016GeographyTopics[g.id],
  ],
}));
function bound(n: number, min: number, max: number, name: string) {
  if (!Number.isFinite(n) || n < min || n > max) throw new RangeError(name);
  return n;
}
function pick<T extends { id: string }>(values: readonly T[], id: string) {
  const x = values.find((v) => v.id === id);
  if (!x) throw new RangeError("GEOGRAPHY016_CHOICE");
  return x;
}
export const rocks016Actions = [
  {
    id: "cool-deep",
    label: "Derinde soğut",
    from: "Magma",
    to: "Granit örneği",
    family: "Magmatik",
    process: "Yavaş soğuma",
    proof:
      "Yer altında yavaş soğuma iri kristallerin gelişmesine zaman sağlar. Granit bir örnektir; her derinlik kayacı granit değildir.",
    limit:
      "Bu yolun ürün adı öğretim örneğidir; gerçek magmanın bileşimi ve koşulları ölçülmedi.",
    path: [0, 1],
  },
  {
    id: "cool-fast",
    label: "Yüzeyde hızla soğut",
    from: "Lav",
    to: "Obsidiyen örneği",
    family: "Magmatik",
    process: "Çok hızlı soğuma",
    proof:
      "Kristal büyümesi için az zaman kalması camsı doku ile uyumludur; obsidiyen bunun öğretim örneğidir.",
    limit:
      "Her yüzey lavı zorunlu camsı değildir; farklı hız ve bileşim bazalt veya başka ürünler yapabilir.",
    path: [0, 2],
  },
  {
    id: "lithify",
    label: "Kumu taşlaştır",
    from: "Kum tortusu",
    to: "Kum taşı",
    family: "Kırıntılı tortul",
    process: "Sıkışma ve çimento",
    proof:
      "Gevşek kum taneleri birikip sıkışır, doğal çimentoyla bağlanır; taşlaşmış ürün kum taşıdır.",
    limit:
      "Bu yol soğuma veya erime değildir; süre ve gerçek çimento bileşimi modelde yok.",
    path: [3, 4],
  },
  {
    id: "marble",
    label: "Kalkeri başkalaştır",
    from: "Kalker",
    to: "Mermer",
    family: "Başkalaşım",
    process: "Katı hâlde değişim",
    proof:
      "Kalker erimeden uygun sıcaklık ve basınçta yeni kristal yapı kazanıp mermere dönüşebilir.",
    limit:
      "Tam erime katı dönüşüm değil, magma yoludur; bu mermer örneği kat kat doku taşımak zorunda değildir.",
    path: [5, 6],
  },
  {
    id: "quartzite",
    label: "Kum taşını değiştir",
    from: "Kum taşı",
    to: "Kuvarsit",
    family: "Başkalaşım",
    process: "Katı hâlde değişim",
    proof:
      "Kum taşı uygun sıcaklık ve basınç altında kuvarsit örneğine dönüşebilir; başlangıç ve ürün aynı aile değildir.",
    limit: "Süre, basınç ve sıcaklık için sayısal saha kestirimi yoktur.",
    path: [4, 7],
  },
  {
    id: "melt",
    label: "Kayacı erit",
    from: "Mermer",
    to: "Magma",
    family: "Erimiş malzeme",
    process: "Erime",
    proof:
      "Erime kayacı magma aşamasına geçirir. Daha sonraki soğuma ayrıca seçilmesi gereken yeni bir süreçtir.",
    limit:
      "Magma henüz katı bir kayaç ailesi değildir; bütün mantonun sıvı olduğu anlamına gelmez.",
    path: [6, 0],
  },
  {
    id: "weather",
    label: "Kayacı ayrıştır",
    from: "Granit",
    to: "Tortu örneği",
    family: "Gevşek malzeme",
    process: "Ayrışma ve taşıma",
    proof:
      "Fiziksel ayrışan parçalar taşınıp tortu olarak birikebilir; taşlaşma ayrıca gerekir.",
    limit:
      "Ayrışmanın tamamı taşınma değildir; bu seçili yol kırıntılı malzemenin birikimine kadar izler.",
    path: [1, 3],
  },
] as const;
export function rock016State(action: string) {
  return pick(rocks016Actions, action);
}
export const turkeyInner016Cases = [
  {
    id: "west",
    label: "Batı: fay blokları",
    region: "Batı Anadolu",
    kind: "normal",
    title: "Horst ve graben",
    proof:
      "Gerilme altındaki normal faylarla göreli yükselen sırtlar ve çöken koridorlar. Gediz ile Menderes grabenleri ve aradaki horstlar örnektir.",
    limit:
      "Kesit şemasıdır; gerçek fay eğimi ve atım miktarı verilmez. Çukurun sonradan alüvyonla dolması tektonik kökeni dışlamaz.",
  },
  {
    id: "north",
    label: "Kuzey: yanal fay",
    region: "Kuzey Anadolu",
    kind: "strike",
    title: "Yanal kayma",
    proof:
      "Fay boyunca göreli yatay ötelenme doğrultu atımlı hareketi gösterir. Kuzey Anadolu Fay Sistemi temel örnektir.",
    limit:
      "Üstten görünüş; oklar düşey graben oluşumunu göstermez. Konum veya oklar deprem tarihi ve büyüklüğü tahmini değildir.",
  },
  {
    id: "east",
    label: "Doğu: yanal fay",
    region: "Doğu Anadolu",
    kind: "strike",
    title: "Yanal kayma",
    proof:
      "Doğu Anadolu Fay Sistemi boyunca önemli bileşen yanal harekettir; çizim bu bileşeni üstten gösterir.",
    limit:
      "Şema tüm gerçek dalları, blokları ve hareket türlerini içermez; kesin zaman tahmini yapılamaz.",
  },
  {
    id: "fold",
    label: "Kuşak: kıvrım",
    region: "Kuzey kuşak ve Toroslar",
    kind: "fold",
    title: "Tabaka kıvrımı",
    proof:
      "Yakınsama ve sıkışma tabakaları büker; ana dağ kuşakları böyle gelişebilir. Yalnız yükselti kıvrım kanıtı değildir.",
    limit:
      "Kesit ölçekli değil; bütün dağ ve kayaçların aynı yaşta olduğu sonucu çıkmaz.",
  },
  {
    id: "volcano",
    label: "İç ve doğu: volkan",
    region: "İç ve Doğu Anadolu örnekleri",
    kind: "volcano",
    title: "Volkanik malzeme",
    proof:
      "Erciyes, Hasan, Ağrı ve Süphan gibi örneklerde lav ve püskürme malzemeleri volkanik kökeni gösterir. Bitlis Nemrut kalderası Adıyaman ilindeki adaşından ayrıdır.",
    limit:
      "Bugün püskürme yok diye gelecekte etkinlik imkânsız denemez. Çizim gerçek volkan ölçümü veya etkinlik tahmini değildir.",
  },
] as const;
export function turkeyInner016State(id: string) {
  return pick(turkeyInner016Cases, id);
}
export const river016Modes = [
  { id: "cross", label: "Kesit ve debi" },
  { id: "meander", label: "Menderes kıyıları" },
  { id: "delta", label: "Ağız tortu bütçesi" },
] as const;
export function river016State(
  mode: string,
  width: number,
  depth: number,
  speed: number,
  drop: number,
  distance: number,
  input: number,
  removed: number,
) {
  pick(river016Modes, mode);
  bound(width, 2, 20, "RIVER_WIDTH");
  bound(depth, 1, 5, "RIVER_DEPTH");
  bound(speed, 0.5, 3, "RIVER_SPEED");
  bound(drop, 0, 300, "RIVER_DROP");
  bound(distance, 1, 20, "RIVER_DISTANCE");
  bound(input, 0, 200, "RIVER_INPUT");
  bound(removed, 0, 200, "RIVER_REMOVED");
  return {
    mode,
    width,
    depth,
    speed,
    drop,
    distance,
    input,
    removed,
    area: width * depth,
    discharge: width * depth * speed,
    slope: (drop / (distance * 1000)) * 100,
    retained: input - removed,
    proof:
      mode === "meander"
        ? "Dış kıyıda oyulma, iç kıyıda kum birikimi: aynı mendereste iki işlem. Bu şema bütün yatağın aynı hızda olduğunu söylemez."
        : mode === "delta"
          ? "Net tortu = ağza giriş − kıyıdan ayrılan. Pozitif bütçe tutulmayı gösterir; gerçek delta alanı veya büyüme hızı ayrıca veri ister."
          : "Q = kesit alanı × verilen kesit ortalama hızı. Eğim ayrıca hesaplanır; model eğimden gerçek hızı türetmez.",
  };
}
export const karst016Forms = [
  {
    id: "lapya",
    label: "Lapya",
    kind: "dissolve",
    title: "Yüzeyde küçük oluklar",
    proof:
      "Uygun karstik kaya yüzeyinde suyla çözünme küçük oluklar açar. Yeni mineral eklenmesi değil, yüzeyden malzeme ayrılması öne çıkar.",
  },
  {
    id: "dolin",
    label: "Dolin ve polye",
    kind: "dissolve",
    title: "Kapalı karst çanakları",
    proof:
      "Dolin küçük kapalı çanak; uvala birleşen çukurlar, polye geniş düz tabanlı karstik alan olabilir. Yapısal koşullar da katkı verebilir; her polye tek çizgisel büyüme değildir.",
  },
  {
    id: "duden",
    label: "Düden ve kör vadi",
    kind: "dissolve",
    title: "Yüzeyden yer altına",
    proof:
      "Yüzey suyu düdenle yer altına girer; yüzey vadisinin burada sonlanması kör vadiyle uyumludur. Su yok olmaz, yer altı akışına katılır.",
  },
  {
    id: "cave",
    label: "Mağara ve obruk",
    kind: "dissolve",
    title: "Boşluk ve olası çökme",
    proof:
      "Çözünme yer altı boşluğunu genişletir; tavan çökerse derin çökme çukuru gelişebilir. Her mağaranın karstik veya her obruğun tek insan etkisiyle oluştuğu söylenmez.",
  },
  {
    id: "stalactite",
    label: "Sarkıt",
    kind: "deposit",
    title: "Tavandan aşağı birikim",
    proof:
      "Damlayan sudaki mineral tavanda çökelir, sarkıt aşağı uzanır. Mağaranın boşluğu ile sarkıtın büyümesi farklı süreçlerdir.",
  },
  {
    id: "stalagmite",
    label: "Dikit",
    kind: "deposit",
    title: "Tabandan yukarı birikim",
    proof:
      "Mineral mağara tabanına eklenip dikiti yükseltir. Sarkıt ile birleşirse sütun gelişebilir; bu çizim gerçek büyüme süresi vermez.",
  },
  {
    id: "column",
    label: "Sütun",
    kind: "deposit",
    title: "Tavan ve taban birleşir",
    proof:
      "Sarkıt ile dikitin birleşmesi sütun oluşturur. Bu birikim şeklidir; mağara boşluğunu açan süreçle aynı sayılmaz.",
  },
  {
    id: "travertine",
    label: "Traverten",
    kind: "deposit",
    title: "Kaynak suyundan çökelme",
    proof:
      "Karbonat yüklü su uygun koşullarda mineral çökeltip basamak üstüne ekler. Pamukkale bilinen örnektir; kaynak suyu tek başına her yerde aynı şekli doğurmaz.",
  },
] as const;
export function karst016State(form: string, rock: string) {
  const f = pick(karst016Forms, form);
  if (!["limestone", "gypsum", "granite"].includes(rock))
    throw new RangeError("KARST_ROCK");
  const carbonate = [
    "stalactite",
    "stalagmite",
    "column",
    "travertine",
  ].includes(form);
  return {
    form: f,
    rock,
    compatible: carbonate ? rock === "limestone" : rock !== "granite",
    proof: carbonate
      ? rock === "limestone"
        ? "Seçilen karbonat yüklü su ve kalker örneği bu birikimle uyumludur."
        : "Bu özel şema karbonat birikimini anlatır; jips veya granit seçimini aynı karbonat kanıtı sayma."
      : rock === "granite"
        ? "Granit seçimi bu kalker/jips çözünmesi şemasının malzeme kanıtını sağlamaz. Başka ayrışma ve mağara yolları ayrı ele alınır."
        : "Seçilen kayaç çözünmeye elverişli örnektir. Çatlak ve su koşulları da gerekir; şekil otomatik veya anlık oluşmaz.",
  };
}
export const windIce016Cases = [
  {
    id: "wind-dune",
    label: "Rüzgâr: kumul",
    kind: "wind",
    process: "Birikim",
    title: "Kum taneleri yığılır",
    proof:
      "Taşınan kum uygun yerde birikerek kumul yapabilir. Hilal barkan için baskın yön ve sınırlı kum bağlamı gerekir; her kumul aynı biçimde değildir.",
    sort: "Kum ağırlıklı örnek; tane noktaları gerçek ölçekte değildir.",
  },
  {
    id: "wind-loess",
    label: "Rüzgâr: lös",
    kind: "loess",
    process: "Birikim",
    title: "Silt örtüsü",
    proof:
      "Rüzgârla taşınıp biriken silt ağırlıklı örtü lösle uyumludur. Kum tepesinin başka adı değildir.",
    sort: "Daha ince silt örneği; gerçek mikrometre ekseni yer almaz.",
  },
  {
    id: "wind-erosion",
    label: "Rüzgâr: aşınma",
    kind: "abrasion",
    process: "Aşındırma",
    title: "Alt bölüm daha çok aşınır",
    proof:
      "Yere yakın taşınan taneler ve kayaç direnci uygun olduğunda mantar kaya örüntüsüne katkı sağlar. Tafonide tuz ayrışması gibi başka süreçler de olabilir.",
    sort: "Çarpma okları temsilî; gerçek aşınma miktarı ve hız hesabı yok.",
  },
  {
    id: "ice-erosion",
    label: "Buzul: U vadi",
    kind: "ice",
    process: "Aşındırma",
    title: "V kesitten U kesite",
    proof:
      "Hareket eden buzul aşındırma ve koparmayla tekne biçimli vadi yapabilir. Çizikler ve sirk gibi kanıtlar yorumu güçlendirir.",
    sort: "Önceki V çizgisi kesiklidir; sonraki U kesit öğretim temsilidir.",
  },
  {
    id: "ice-till",
    label: "Buzul: moren",
    kind: "till",
    process: "Birikim",
    title: "Karışık boylar birlikte",
    proof:
      "Doğrudan buzulun taşıyıp bıraktığı malzeme farklı boyları birlikte içerebilir; kötü boylanmış moren örneği gösteriliyor.",
    sort: "İri–ince birlikte; gerçek tane çapı veya saha ölçümü değildir.",
  },
  {
    id: "meltwater",
    label: "Erime suyu: sander",
    kind: "water",
    process: "Birikim",
    title: "Su taneleri ayırır",
    proof:
      "Buzul erime suyu taşıma ve birikimde taneleri boylayıp tabakalar yapabilir. Sanderin son taşıyıcısı akarsudur; doğrudan buzul bırakması değildir.",
    sort: "Çakıl ve kum boylarına göre ayrı tabaka yapar.",
  },
] as const;
export function windIce016State(id: string) {
  return pick(windIce016Cases, id);
}
export const coast016Forms = [
  {
    id: "cliff",
    label: "Falez ve platform",
    view: "Kesit",
    type: "Aşındırma",
    proof:
      "Tabanı oyulan dik kıyı geriler; önünde abrazyon platformu kalabilir. Şema gerçek metre ve zaman vermez.",
  },
  {
    id: "lagoon",
    label: "Kordon ve lagün",
    view: "Üstten",
    type: "Birikim",
    proof:
      "Koy ağzındaki kum kordonu geride bir su alanı ayırır. Lagünün tuzluluğu bağlantı ve su bütçesine bağlıdır; mutlaka tatlı değildir.",
  },
  {
    id: "tombolo",
    label: "Tombolo",
    view: "Üstten",
    type: "Birikim",
    proof:
      "Kum boynu adayı ana karaya bağlar. Ayırt edici kanıt ada–kara bağıdır; bütün kıyı kumları tombolo değildir.",
  },
  {
    id: "ria",
    label: "Ria",
    view: "Üstten",
    type: "Akarsu vadisi + su basması",
    proof:
      "Dallanan eski akarsu vadisine deniz girip vadiyi örterse ria örüntüsü gelişebilir. Bu örnekte buzul geçmişi bilgisi yok.",
  },
  {
    id: "fjord",
    label: "Fiyort",
    view: "Kesit",
    type: "Buzul vadisi + su basması",
    proof:
      "Önce buzulun oyduğu U vadi, sonra denizin dolması gerekir. Yalnız girintili kıyı fotoğrafı veya Hamsilos adı yeterli değildir.",
  },
  {
    id: "dalmatian",
    label: "Dalmaçya",
    view: "Üstten",
    type: "Paralel sırtlar + su basması",
    proof:
      "Kıyıya paralel eski sırtlar su üstünde uzun adalar olarak kalır; aradaki vadiler örtülür. Her ada grubu bu kökeni göstermez.",
  },
  {
    id: "skerry",
    label: "Skyer",
    view: "Üstten",
    type: "Buzul yüzeyi + su basması",
    proof:
      "Buzulla işlenmiş alçak arazi suyla örtülürken çok sayıda küçük kayalık ada kalabilir. Derin U vadiyi gerektiren fiyortla aynı geometrik örüntü değildir.",
  },
] as const;
export function coast016State(id: string, phase: string) {
  const form = pick(coast016Forms, id);
  if (!["before", "after"].includes(phase)) throw new RangeError("COAST_PHASE");
  return {
    form,
    phase,
    water: phase === "after",
    limit:
      "Önce / sonra kavramsal durumdur; gerçek süre, deniz seviyesi metre değeri veya kıyı koordinatı değildir.",
  };
}
export const turkeyExternal016Sites = [
  {
    id: "bafra",
    label: "Bafra",
    agent: "Akarsu",
    kind: "delta",
    process: "Birikim",
    proof:
      "Kızılırmak ile gelen tortunun uygun kıyıda tutulması Bafra deltasına katkı verir. Yeşilırmak ise Çarşamba ile eşlenir.",
  },
  {
    id: "cappadocia",
    label: "Kapadokya",
    agent: "Yüzey akışı",
    kind: "pillar",
    process: "Aşındırma",
    proof:
      "Volkanik tüf farklı dirençte malzemeyle birlikte seçici aşınır; dayanıklı üst blok sütunu görece koruyabilir.",
  },
  {
    id: "pamukkale",
    label: "Pamukkale",
    agent: "Karbonatlı su",
    kind: "travertine",
    process: "Birikim",
    proof:
      "Sudaki çözünmüş karbonat çökelerek traverten yüzeyine eklenir. Su bulunması yerel işlemi aşındırma yapmaz.",
  },
  {
    id: "karapinar",
    label: "Karapınar",
    agent: "Rüzgâr",
    kind: "dune",
    process: "Birikim",
    proof:
      "Kuru, gevşek kumlu ve örtünün seyrek olduğu uygun yüzeylerde rüzgâr kumul biriktirebilir.",
  },
  {
    id: "kackar",
    label: "Kaçkarlar",
    agent: "Buzul",
    kind: "cirque",
    process: "Aşındırma",
    proof:
      "Yüksek dağdaki sirk ve U vadiler eski veya güncel buzul aşınımı için kanıt olabilir. Yakındaki moren ise birikimdir.",
  },
  {
    id: "kapidag",
    label: "Kapıdağ",
    agent: "Dalga ve akıntı",
    kind: "tombolo",
    process: "Birikim",
    proof:
      "Kıyı tortusu boyun oluşturarak adayı ana karaya bağlamıştır; tombolo örneğidir.",
  },
  {
    id: "tortum",
    label: "Tortum",
    agent: "Yer çekimi",
    kind: "slide",
    process: "Kütle hareketi",
    proof:
      "Heyelan kütlesi vadiyi setleyerek göl gelişimine katkı verebilir. Kaya ve toprak birlikte kayar; akarsuyun tek tek tane taşıması aynı süreç değildir.",
  },
  {
    id: "taseli",
    label: "Taşeli",
    agent: "Çözen su",
    kind: "karst",
    process: "Çözünme",
    proof:
      "Uygun kalkerli arazilerde karstik yarılma ve boşluklar gelişebilir. Bütün plato aynı noktada aynı şekli taşımaz.",
  },
  {
    id: "falez",
    label: "Dik kıyı örneği",
    agent: "Dalga",
    kind: "cliff",
    process: "Aşındırma",
    proof:
      "Dalga kıyı tabanını oyar; üst kesim gerilerken falez ve aşınım platformu gelişebilir. Gerçek saha hızı verilmiş değil.",
  },
] as const;
export function turkeyExternal016State(id: string) {
  return pick(turkeyExternal016Sites, id);
}
export const relief016Profiles = [
  {
    id: "plain",
    label: "İç ova",
    points: [1700, 1400, 1200, 1200, 1200, 1450, 1800],
    title: "Çevreye göre alçak taban",
    proof:
      "Düz taban 1200 m olsa da çevresine göre alçaktır; yüksek ova ile uyumlu. Rakım tek başına plato yapmaz.",
  },
  {
    id: "plateau",
    label: "Yarılmış plato",
    points: [900, 1500, 1500, 1050, 1500, 1500, 900],
    title: "Yüksek yüzey ve vadi",
    proof:
      "Yüksekçe düz yüzey akarsu vadisiyle yarılmış; plato tanımıyla uyumlu. Malzeme kökeni ayrıca kanıt ister.",
  },
  {
    id: "coast",
    label: "Kıyı ve geçit",
    points: [0, 300, 1400, 1700, 1400, 900, 1000],
    title: "Kuşağı aşan rota",
    proof:
      "Paralel kuşak geçişi daraltabilir; verilen eşikler farklı aşma yüksekliği sunar. Gerçek yol için maliyet, süre ve güvenlik verisi yok.",
  },
] as const;
export function relief016State(id: string, offset: number, route: string) {
  const profile = pick(relief016Profiles, id);
  bound(offset, 0, 1800, "RELIEF_OFFSET");
  if (!["A", "B", "C"].includes(route)) throw new RangeError("RELIEF_ROUTE");
  const passes = { A: 1600 + offset, B: 900 + offset, C: 1200 + offset };
  return {
    profile,
    offset,
    route,
    points: profile.points.map((x) => x + offset),
    passes,
    selectedPass: passes[route as keyof typeof passes],
    best: "B",
    limit:
      "Özgün temsilî kesit; yatay eş aralıklar gerçek km değildir. Düşey metre ekseni verilen ideal değerleri gösterir. Üç rota eşiği kesit dışında verilmiş ayrı bir listedir.",
  };
}
export const water016Springs = [
  {
    id: "slope",
    label: "Yamaç kaynağı",
    proof:
      "Su taşıyan birim arazi yüzeyini keser; yer altı suyu doğal olarak dışarı çıkar. Sıcaklık ve kalite yalnız adından kesin olmaz.",
  },
  {
    id: "artesian",
    label: "Artezyen kuyu",
    proof:
      "Az geçirgen birimler arasındaki akifer basınçlıdır. Kuyudaki su basınç düzeyine yükselir; düzey yüzeyin altında kalırsa kendi gücüyle taşmaz.",
  },
  {
    id: "karst",
    label: "Karstik kaynak",
    proof:
      "Çözünme boşlukları ve çatlakları boyunca taşınan su yüzeye çıkar. Kesin giriş noktası, yolculuk süresi ve kalite için ayrıca veri gerekir.",
  },
  {
    id: "fault",
    label: "Fay kaynağı",
    proof:
      "Fay çatlakları suya yol sağlar. Derinden beslenen sıcak örnekler vardır; her fay kaynağının sıcak ve yıl boyu aynı debili olması zorunlu değildir.",
  },
  {
    id: "geyser",
    label: "Gayzer",
    proof:
      "Uygun ısı, su, kanal ve basınç koşulları dönemsel püskürmeyi sağlar. Her sıcak kaynak gayzer değildir; çizim zaman kestirimi vermez.",
  },
] as const;
export function water016State(
  initial: number,
  rain: number,
  inflow: number,
  evaporation: number,
  outflow: number,
  spring: string,
) {
  bound(initial, 0, 200, "WATER_INITIAL");
  bound(rain, 0, 100, "WATER_RAIN");
  bound(inflow, 0, 100, "WATER_INFLOW");
  bound(evaporation, 0, 200, "WATER_EVAPORATION");
  bound(outflow, 0, 200, "WATER_OUTFLOW");
  const source = pick(water016Springs, spring),
    available = initial + rain + inflow,
    demand = evaporation + outflow,
    change = rain + inflow - demand;
  return {
    initial,
    rain,
    inflow,
    evaporation,
    outflow,
    source,
    available,
    demand,
    change,
    final: Math.max(0, available - demand),
    unmet: Math.max(0, demand - available),
    proof:
      "Tek dönemde başlangıç + yağış + nehir girişi − istenen çıkış. Çıkış mevcut suyu aşarsa eksik miktar ayrıca gösterilir; hangi çıkışa öncelik verileceği bu modelde yok. Tuz kütlesi ve karışım verisi yok; kesin tuz oranı bu yüzden bulunamaz.",
  };
}
