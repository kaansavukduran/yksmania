import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const authoredGuides = [
  {
    id: "doga-insan-cografya",
    title: "Doğa, insan ve coğrafya: aynı vadiye farklı sorular",
    minutes: 55,
    objectives: [
      "Dört doğal ortamı bir olayın neden ve sonuçlarında ilişkilendir.",
      "İncelenen soruya göre fiziki ve beşerî coğrafyanın alt dallarını seç.",
      "Doğanın imkân ve sınırlarıyla insanın teknik kararlarını birlikte değerlendir.",
      "Bir veriden desteklenmeyen kesin yargıyı ayır.",
    ],
    sections: [
      {
        title: "Coğrafya bir yer adı listesi değildir",
        paragraphs: [
          "Coğrafya, olayların nerede bulunduğunu, neden orada oluştuğunu ve çevresiyle nasıl ilişkili olduğunu araştırır. Dağın adını bilmek başlangıçtır; dağın yağışı, ulaşımı, yerleşmeyi ve su toplama alanını nasıl etkilediğini açıklamak coğrafi düşünmedir. Aynı vadi farklı sorularla birden fazla alt dalın konusu olabilir. Bu üç soru ders dilinde dağılış, nedensellik ve karşılıklı ilgi ilkeleriyle ilişkilidir. Dağılışın birlikte görülmesi tek başına birinin ötekine neden olduğunu kanıtlamaz; zaman sırası ve alternatif açıklamalar ayrıca incelenir.",
          "Bir soruyu çözerken önce inceleme nesnesini ve istenen ilişkiyi belirle. “Vadiye baraj yapılıyor” bilgisi tek başına yalnız bir bilim dalını seçtirmez. Akış rejimi soruluyorsa su; göç soruluyorsa nüfus; üretim değişimi soruluyorsa ekonomik faaliyet öne çıkar. Anahtar sözcükten önce sorunun amacını oku.",
        ],
      },
      {
        title: "Dört ortam birbiriyle etkileşir",
        paragraphs: [
          "Litosfer kayaçları, yer şekillerini ve yüzeye yakın katı ortamı; atmosfer Dünya çevresindeki gaz örtüsünü; hidrosfer akarsu, deniz, göl, buzul ve yer altı suyunu; biyosfer canlıların yaşadığı alanları kapsar. Bunlar birbirinden yalıtılmış dört kutu değildir: bir bitkinin kökü toprağa, yaprağı havaya ve su döngüsüne bağlıdır.",
          "Yağışın yamaca düşmesi atmosferden hidrosfer ve litosfere uzanan bir etkidir. Bitki örtüsünün akışı yavaşlatması biyosferin su ve toprakla ilişkisini gösterir. Bir olayı tek ortama örnek vermek ile olayın yalnız o ortamdan etkilendiğini söylemek farklıdır; ikinci iddia ek kanıt gerektirir.",
        ],
      },
      {
        title: "Doğal ortamdan coğrafi ortama",
        paragraphs: [
          "Doğal ortamın yanında yollar, tarlalar, kentler, ekonomik ve toplumsal ilişkiler beşerî ortamı oluşturur. Coğrafi ortam bu doğal ve beşerî ilişkilerin birlikte ele alındığı yaşam alanıdır. Bir nehir fiziksel bir sistemken üzerindeki köprü ve su kullanım anlaşması insan kararlarını da içerir.",
          "Coğrafi ortamı incelerken insanı doğanın dışına yerleştirme. İnsan biyolojik bir canlıdır; planlama ve teknolojiyle çevresini değiştiren toplumsal aktördür. Bir baraj su tutar, bazı alanları su altında bırakır ve yeni ulaşım ihtiyaçları doğurur. Fayda ve maliyet farklı yer ve topluluklarda farklılaşabilir.",
        ],
      },
      {
        title: "Doğa etkiler; tek başına kader yazmaz",
        paragraphs: [
          "Yükselti, iklim, su ve toprak tarım ürünlerini, yapı malzemelerini, ulaşım güçlüğünü ve enerji ihtiyacını etkiler. Soğuk bir bölgede yalıtım ihtiyacı doğal koşulla ilişkilidir; herkesin aynı yemeği yemek zorunda olduğu sonucu çıkmaz. Kültür, gelir, teknoloji ve siyasal tercihler de davranışları etkiler.",
          "Bir nedene bakıp tek zorunlu sonuç üretmek çevresel belirlenim hatasıdır. Aynı yağış koşulunda sulama, ürün seçimi ve su yönetimi farklı sonuçlar doğurabilir. Soru “diğer koşullar aynı” diyorsa etkenin yönünü karşılaştır; bu koşul verilmediyse bütün toplumlar için kesin hüküm kurma.",
        ],
      },
      {
        title: "İnsan çevreyi değiştirir; etkiyi izle",
        paragraphs: [
          "Tünel açmak yer şeklinin ulaşım üzerindeki engelini azaltır, engelin hiçbir maliyetinin kalmadığını göstermez. Barajın enerji ve sulama yararı; habitat, tortu taşınımı ve yerleşme üzerindeki etkileriyle birlikte değerlendirilir. Teknoloji doğal süreçlerin bütününü ortadan kaldırmaz.",
          "Bir müdahaleyi neden → değişen süreç → olası sonuç sırasıyla çöz. Örneğin yol için bitki kaldırılması, yüzey akışını ve erozyon riskini artırabilir. Sonucun büyüklüğü eğim, yağış, zemin ve koruma önlemlerine bağlıdır. Modelimiz etkileşim yollarını gösterir; gerçek bir barajın kaç kişiyi taşıyacağını veri olmadan hesaplamaz.",
        ],
      },
      {
        title: "Fiziki alt dalları soru üzerinden seç",
        paragraphs: [
          "Jeomorfoloji yer şekilleri ve oluşum süreçlerine, klimatoloji iklim elemanları ve uzun dönem düzenlere, hidrografya yeryüzü sularının dağılış ve özelliklerine, biyocoğrafya canlı topluluklarının mekânsal dağılışına bakar. Kartografya harita üretimi ve haritalardan yararlanma yöntemlerini ele alır.",
          "Bir akarsu vadisinin aşınma biçimi jeomorfoloji; aylık akım değişimi hidrografya; havzanın uzun yıllar yağış düzeni klimatoloji açısından önceliklidir. Yardımcı alanlar bir arada çalışabilir. Su sözcüğünün bulunduğu her araştırmayı hidrografya, harita kullanılan her araştırmayı yalnız kartografya sayma.",
        ],
      },
      {
        title: "Beşerî alt dalları ayır",
        paragraphs: [
          "Nüfus coğrafyası dağılış, yoğunluk, yapı ve göçü; yerleşme coğrafyası yerleşmelerin konum, gelişim ve biçimini; ekonomik coğrafya tarım, sanayi, hizmet ve ticaretin mekânsal ilişkilerini inceler. Siyasi coğrafya sınırlar ve jeopolitik ilişkileri; tarihî coğrafya geçmişteki coğrafi ortamları araştırır. Ekonomik coğrafya içinde ulaşım coğrafyası güzergâh ve ağ bağlantılarını, enerji coğrafyası enerji kaynaklarının üretim ve kullanım ilişkilerini ele alır. Aynı kasabada evlerin malzemesi yerleşme; ürünlerin pazara taşınma yolu ulaşım sorusudur.",
          "“Barajdan sonra hangi köyler taşındı?” yerleşme ve nüfusla; “Sulanan alanda ürün deseni nasıl değişti?” ekonomik coğrafyayla ilişkilidir. Bir devleti ilgilendiren her konu doğrudan siyasi coğrafya değildir. Araştırmanın ülkesine değil, sorulan ilişkiye bakarak öncelikli alanı seç.",
        ],
      },
      {
        title: "Destek bilimleri, ölçek ve kanıt",
        paragraphs: [
          "Coğrafya jeoloji, meteoroloji, biyoloji, demografi, istatistik, tarih ve iktisat gibi alanlardan yararlanır. Destek bilimi kullanmak araştırmanın coğrafi sorusunu ortadan kaldırmaz. Nüfus dağılışını yorumlarken demografik sayımlar ve harita birlikte işe yarar; kayaç haritası da yerleşme için tek başına yeterli değildir. Bölgesel coğrafya belirli bir alanı doğal ve beşerî ilişkileriyle bütün olarak inceler; bir havzada toprak, üretim ve göçü birlikte ele almak buna örnektir. Bütüncül araştırmayla yalnız tek değişkeni inceleyen araştırmayı aynı yöntem sanma.",
          "Yerel bir gözlemi ülkenin bütününe genellemeden önce ölçek, zaman ve örneklemi denetle. Bir köyde göç artması bütün havzada nüfusun azaldığını kanıtlamaz; komşu yerleşmeye taşınma olabilir. Önce verinin neyi ölçtüğünü söyle, sonra izin verdiği en sınırlı sonucu kur. Bu alışkanlık coğrafya testlerinde güçlü çeldiricileri eler.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı baraj, iki araştırma",
        prompt:
          "Araştırma A, baraj sonrasında aylık akarsu debisini; B, köyden kente taşınan kişi sayısını karşılaştırıyor. Öncelikli iki alan nedir?",
        strategy: "Ölçülen değişkeni tanımla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Debi birim zamanda akan su miktarıdır: su sistemi incelenir.",
          },
          {
            label: "2. adım",
            explanation:
              "Taşınan kişi sayısı göç hareketine ilişkin nüfus verisidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Ortak yer baraj olsa da araştırma soruları farklıdır.",
          },
        ],
        answer: "A hidrografya, B nüfus coğrafyası.",
        check:
          "Harita kullanılması iki araştırmayı da yalnız kartografya yapmaz.",
        pitfall: "Baraj sözcüğüne göre ikisini tek alt dala atamak.",
      },
      {
        title: "Etkileşimi zincirle",
        prompt:
          "Bitki örtüsü kaldırılan dik yamaçta şiddetli yağıştan sonra toprağın taşınması artıyor. Hangi ortamlar ilişkilidir?",
        strategy: "Müdahale ve süreç sırasını izle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bitki örtüsü biyosferle ilişkilidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yağış atmosferden su girdisi sağlar; akış hidrosferle ilişkilidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Taşınan zemin litosferdedir; olay birden çok ortamı bağlar.",
          },
        ],
        answer: "Biyosfer, atmosfer, hidrosfer ve litosfer birlikte etkileşir.",
        check: "Tek bir ortam seçmek bütün etkileşimi açıklamaz.",
        pitfall: "Doğal ortamları birbirine kapalı kutular sanmak.",
      },
      {
        title: "Koşuldan kesinliğe atlama",
        prompt:
          "Bir dağlık bölgede tünel açıldı. “Ulaşımda yer şekillerinin bütün etkisi bitti” denebilir mi?",
        strategy: "Müdahalenin kapsamını sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Tünel bir güzergâh üzerindeki yükselti engelini azaltabilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Kar, heyelan, bağlantı yolları ve bakım gibi başka koşullar sürebilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Tek yapının varlığı tüm bölge için sıfır etki kanıtı değildir.",
          },
        ],
        answer:
          "Hayır; belirli bir engel azalabilir, bütün doğal etkiler ortadan kalkmaz.",
        check: "Etkinin azalması ile tamamen yok olması farklı iddialardır.",
        pitfall: "Teknolojiyi bütün doğal riskleri bitiren güç saymak.",
      },
      {
        title: "Ölçek denetimi",
        prompt:
          "A köyünden 200 kişi B kasabasına taşınıyor; ikisi aynı havzada ve başka nüfus değişimi yok. Havza nüfusu azalır mı?",
        strategy: "Sistem sınırını açık seç.",
        steps: [
          {
            label: "1. adım",
            explanation: "A köyü için 200 kişilik çıkış vardır.",
          },
          {
            label: "2. adım",
            explanation: "B kasabası aynı sistem içinde 200 kişi kazanır.",
          },
          {
            label: "3. adım",
            explanation: "Havza toplamındaki değişim −200+200=0 olur.",
          },
        ],
        answer: "Havza toplamı değişmez, dağılış değişir.",
        check: "Köy ölçeğiyle havza ölçeğini ayrı hesapladık.",
        pitfall: "Bir yerel azalmayı bütün bölge azalması saymak.",
      },
    ],
    recall: [
      {
        prompt: "Doğal ortamlar neden bağımsız değildir?",
        answer:
          "Su, enerji, madde ve canlı etkileşimleri ortamları birbirine bağlar.",
      },
      {
        prompt: "Bir alt dalı hangi bilgiyle seçersin?",
        answer:
          "Yalnız konu sözcüğüne değil araştırılan değişkene ve soruya bakarım.",
      },
      {
        prompt: "Nüfus ile yerleşme coğrafyası nasıl ayrılır?",
        answer:
          "Nüfus yapı ve hareketlere; yerleşme konum, biçim ve gelişime odaklanır, birlikte de çalışırlar.",
      },
      {
        prompt: "Bir yerel veriyi bölgeye genellemeden neyi kontrol edersin?",
        answer:
          "Ölçek, zaman, örneklem, sistem sınırı ve alternatif açıklamaları.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Doğa ve İnsan Etkileşimi / Coğrafya Bilimi, PDF s.10–11 ve 14–15 (basılı s.9–10,13–14) temelinde hazırlanmış özgün anlatım, model ve alıştırmalar. Sorular resmî sınav sorusu değildir. Aurelia 001 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
  {
    id: "cografyanin-tarihi-gelisimi",
    title: "Coğrafyanın gelişimi: gözlemden mekânsal analize",
    minutes: 55,
    objectives: [
      "Dönem, coğrafyacı ve araştırma yöntemini ayır.",
      "Gözlem, harita, ölçüm ve karşılaştırmanın farklı kanıtlarını tanı.",
      "Coğrafi bilginin farklı toplumlar arasında birikerek geliştiğini açıkla.",
      "Bir ismin dönemde yer almasıyla ona belirli eser atfetmek arasındaki kanıt farkını gör.",
    ],
    sections: [
      {
        title: "Bilgi birikimi: soru, araç ve kanıt",
        paragraphs: [
          "İnsanlar yön bulmak, suya ulaşmak, ticaret yapmak ve çevreyi anlamak için mekânsal bilgi üretti. Gözlem, seyahat, ölçüm ve çizim birbirini besledi. Coğrafyanın tarihi yalnız isim sırası değil, hangi sorunun hangi araç ve kanıtla araştırılabildiğinin tarihidir.",
          "Bir harita üretmek, bir seyahat anlatısı yazmak ve iki bölgeyi karşılaştırmak farklı ürünlerdir. Aynı kişi birden çok yöntem kullanabilir; aynı yöntem farklı çağlarda sürer. Uygulamadaki dönem kartları bu sürekliliği gösterir, bilgi üretimini çağ sınırlarında bir anda kesmez.",
        ],
      },
      {
        title: "İlk Çağ: tasvir ve akıl yürütme",
        paragraphs: [
          "Thales, Anaksimandros, Hekataios, Platon, Eratosthenes, Strabon ve Batlamyus kaynakta İlk Çağ bağlamında sıralanır. Yerlerin tanınması, dünyaya ilişkin düşünceler ve coğrafi betimleme bu dönemin öğrenme çerçevesidir. Antik çalışmaları yalnız masal veya bugünkü eksiksiz bilim olarak görmek iki ayrı aşırılıktır. Yeni karşılaştırılan Aurelia kâğıdı ayırt edici katkıları da verir: Eratosthenes Dünya çevresini gölge ve mesafelerle tahmin etmesiyle; Strabon Geographika adlı bölgesel tasviriyle; Batlamyus ise Geographia/Coğrafya Kılavuzu ve koordinat-harita yaklaşımıyla öne çıkar. Gölge hesabı ile harita koordinatını birbirine atama.",
          "“Coğrafya” adı Yunanca yer anlamındaki geo ve yazma/betimleme anlamındaki graphein kökleriyle ilişkilidir; Latince kökenli diye ezberleme. Eratosthenes adlandırma geleneğinde anılır. Bir listedeki bütün kişilere aynı eseri, yöntemi veya ölçümü atamak doğru değildir; böyle bir soru ayrıca açık bilgi gerektirir.",
        ],
      },
      {
        title: "Orta Çağ: tek merkezli bir duraklama öyküsü değil",
        paragraphs: [
          "Harezmi, İbn Sina, İbn Battuta, Biruni, Makdisi, İbn Hurdazbih, Mesudi ve İdrisi kaynakta bu dönem çerçevesinde yer alır. Yolculuklar, farklı bilgi birikimlerinin aktarılması, gözlem ve haritalama coğrafi bilginin devamını sağlar. Dönemde farklı bölgelerin koşulları ve kurumları aynı değildir. Biruni için konum ve mesafe hesabı; İdrisî için dünya haritası ve Sicilya çevresindeki çalışma bağlamı; İbn Battûta için uzun yolculuk gözlemleri ayırt edici ipuçlarıdır. İbn Haldun toplum ve çevre yorumlarıyla bu karşılaştırmaya katılır; yalnız “Orta Çağ coğrafyacısı” ifadesi bu kişileri tek başına ayırmaz.",
          "Bazı kurumların bilim üzerindeki baskısı, bütün dünyada hiç coğrafya üretilmediğini kanıtlamaz. Bir dönemin tüm insanları hakkında “herkes durdu” veya “yalnız bir toplum çalıştı” gibi hükümlerden kaçın. Yeni soru geldiğinde kişi, yöntem ve verilen kanıtı birlikte değerlendir; yüzyıl etiketini tek başına açıklama sayma.",
        ],
      },
      {
        title: "Yeni Çağ: deniz yolları ve haritalama",
        paragraphs: [
          "Bartholomeu Dias, Vasco da Gama, Kristof Kolomb ve Macellan yeni deniz yolları ve yolculuklar bağlamında; Pirî Reis ve Seydî Ali Reis Osmanlı denizcilik birikimiyle birlikte kaynakta anılır. Rönesans, teknik araçlar ve deniz ulaşımı coğrafi bilginin toplanma ve dolaşma imkânlarını etkiledi.",
          "“Yeni bir yer keşfedildi” ifadesini orada daha önce kimse yaşamıyordu biçiminde okuma; söz konusu olan belirli toplumların bilgisi ve bağlantı ağı olabilir. Yolculuk, yerel halkların bilgisini veya gözlem hatalarını dışlamaz. Harita doğruluğu için kaynağın, ölçeğin ve ölçüm yönteminin ayrıca incelenmesi gerekir.",
        ],
      },
      {
        title: "Osmanlı birikimi: farklı ürünleri ayır",
        paragraphs: [
          "Pirî Reis, Seydî Ali Reis, Kâtip Çelebi ve Evliya Çelebi kaynakta Yeni Çağ bölümündedir. Denizcilik, harita, derleme ve seyahat gibi bilgi türleri aynı dönemde yan yana bulunabilir. Bir kişi adı görmek tek başına hangi eserin hangi sayfasına ulaşıldığını göstermez. Kaynakla doğrulanan eser ayrımları şunlardır: Pirî Reis’in Kitâb-ı Bahriye’si denizcilik, kıyı ve liman bilgisini; Kâtip Çelebi’nin Cihannümâ’sı coğrafi derlemeyi; Evliya Çelebi’nin Seyahatnâme’si yerleşim, insan ve güzergâh gözlemlerini öne çıkarır. Eser adını, yazarını ve yaptığı işi birlikte hatırla.",
          "Bu ders kaynakta açıkça doğrulanmayan eser tarihi veya ayrıntısını soru anahtarı yapmaz. Sınavda bir seyahat notu verildiğinde, gözlenen yer ve tarih için bilgi sağlayabileceğini söyleyebilirsin. Bu notun bütün dünyayı sayısal olarak temsil ettiğini söylemek örneklem sınırını aşar.",
        ],
      },
      {
        title: "Yakın Çağ: ilişki ve karşılaştırma",
        paragraphs: [
          "Alexander von Humboldt, Carl Ritter ve Friedrich Ratzel kaynakta modern coğrafyanın gelişimiyle birlikte anılır. Yerleri tek tek tasvir etmenin yanında dağılışları, çevre–insan ilişkilerini ve nedenleri sistemli karşılaştırma önem kazanır. Önceki çağların gözlem ve haritaları da bu araştırmalar için birikim sağlar. Humboldt doğa olayları ve yükselti boyunca bitki dağılışı gibi fiziki örüntüleri; Ritter bölgeyi doğal koşul ve insan ilişkileriyle bütün olarak karşılaştırma odağıyla ayırt edilebilir. Ratzel ve Vidal de la Blache beşerî ve bölgesel yaklaşımların gelişiminde anılır. Bunlar katkı ağırlıklarıdır; her yazarın yalnız tek konuyla çalıştığı anlamına gelmez.",
          "Modern yaklaşımı bütün açıklamaların kesinleştiği bir bitiş noktası sayma. İnsan–çevre ilişkileri hakkındaki görüşler tartışılabilir ve yeni verilerle değişebilir. “Doğal koşul insan davranışını etkiler” ile “bütün toplumları tek başına zorunlu olarak belirler” aynı iddia değildir.",
        ],
      },
      {
        title: "Güncel mekânsal veri: araç ile sonuç farklı",
        paragraphs: [
          "Günümüzde sayısal haritalar, uzaktan algılama, konum verileri ve coğrafi bilgi sistemleri birden fazla katmanı birlikte incelemeyi kolaylaştırır. Bu, kaynak dönem sıralamasından güncel araştırma mantığına yapılan öğretici bir bağlantıdır; antik kişilere çağdaş araçlar atfedilmez.",
          "Bir taşkın incelemesinde yükselti, yağış ve yerleşme katmanları üst üste getirilebilir. Haritanın bilgisayarda çizilmesi sonucun otomatik doğru olduğunu göstermez. Tarih, çözünürlük, ölçüm doğruluğu ve eksik veriler hâlâ önemlidir; araç daha çok veri işlerken düşünme sorumluluğunu ortadan kaldırmaz.",
        ],
      },
      {
        title: "Tarih şeridini kanıtla oku",
        paragraphs: [
          "Önce dönem kartını seç, ardından gözlem, haritalama veya karşılaştırma kanıtını aç. Her kart belirli bir yöntemin neyi gösterebileceğini ve neyi tek başına gösteremeyeceğini belirtir. Dört eşit kutu dört eşit süreyi temsil etmez; şekil sıralama aracıdır.",
          "Soruda isimler verilirse önce onların kaynakta doğrulanan dönem çerçevesini eşleştir. Bir eserin adı ya da ölçüm tarihi verilmemişse bunu yalnız dönemden türetme. Gerekçeli cevap, veriyle desteklenen dar yargıyı seçer; etkileyici ama kanıtsız ayrıntıyı eklemez.",
        ],
      },
    ],
    examples: [
      {
        title: "Dönem eşleştir",
        prompt:
          "İdrisi ile Pirî Reis kaynakta sırasıyla hangi dönem çerçevelerinde yer alır?",
        strategy: "İsimleri doğrulanan dönem listesine yerleştir.",
        steps: [
          {
            label: "1. adım",
            explanation: "İdrisi Orta Çağ listesinde yer alır.",
          },
          {
            label: "2. adım",
            explanation: "Pirî Reis Yeni Çağ listesinde yer alır.",
          },
          {
            label: "3. adım",
            explanation:
              "İki kişinin farklı dönemde olması haritalama yönteminin yalnız bir çağda bulunmasını gerektirmez.",
          },
        ],
        answer: "Orta Çağ; Yeni Çağ.",
        check: "Eser ve kesin tarih bu eşleştirmeden çıkmaz.",
        pitfall: "Dönem bilgisinden bütün eserleri türetmek.",
      },
      {
        title: "Bir not neyi kanıtlar?",
        prompt:
          "Bir seyyah gördüğü bir limanın pazarını anlatıyor. Bu bütün dünya ticaret hacmini verir mi?",
        strategy: "Gözlemin yer ve zaman sınırını koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Not belirli limana ilişkin gözlem içerir.",
          },
          {
            label: "2. adım",
            explanation: "Bütün limanlar ve işlem miktarları ölçülmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Yerel nitel gözlemden küresel nicel toplam çıkarılamaz.",
          },
        ],
        answer: "Hayır; belirli yer ve döneme ilişkin sınırlı kanıt sağlar.",
        check: "Gözlem değersiz değildir; kapsamı sınırlıdır.",
        pitfall:
          "Sınırlı kanıtı ya her şeye yeterli ya tamamen değersiz saymak.",
      },
      {
        title: "Çağ ile yöntemi ayır",
        prompt:
          "Aynı zaman şeridinde hem antik hem güncel harita kartı var. Bu bir hata mı?",
        strategy: "Yöntemin sürmesi ile aracın değişmesini ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Haritalama farklı dönemlerde kullanılabilir.",
          },
          {
            label: "2. adım",
            explanation: "Ölçüm ve çizim araçları değişebilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Dönemler yöntemlerin birbirini bütünüyle silmesini gerektirmez.",
          },
        ],
        answer: "Hayır; yöntemler farklı araçlarla süreklilik gösterebilir.",
        check: "Antik haritayı uydu ürünü saymadık.",
        pitfall: "Bir yöntemin yalnız tek çağda kullanılabileceğini sanmak.",
      },
      {
        title: "Sayısal haritada denetim",
        prompt:
          "Bir araştırmacı 1980 nüfus verisini güncel yol verisiyle birleştirip bugünkü erişimi açıklıyor. İlk kontrol nedir?",
        strategy: "Katmanların zamanını karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Nüfus ve yol farklı yılları temsil ediyor.",
          },
          {
            label: "2. adım",
            explanation: "Bugünkü nüfus dağılışı aynı kalmamış olabilir.",
          },
          {
            label: "3. adım",
            explanation: "Zaman uyumu ve güncel nüfus verisi denetlenmelidir.",
          },
        ],
        answer: "Katmanların tarih ve temsil uyumunu kontrol etmek.",
        check: "Dijital çizim tek başına doğruluk kanıtı değildir.",
        pitfall: "Bilgisayar çıktısını kanıt denetiminden muaf tutmak.",
      },
      {
        title: "Gölge mi, koordinat mı?",
        prompt:
          "Bir kart Dünya çevresini gölge ve mesafe kullanarak tahmin etmeyi; bir kart koordinat bilgisiyle harita kılavuzunu anlatıyor. Eratosthenes, Strabon ve Batlamyus arasından hangi iki eşleşme yapılır?",
        strategy: "Ölçülen nesneyi ve üretilen bilgi türünü ayrı seç.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Dünya çevresi ve gölge geometrisi Eratosthenes’i ayırt eder.",
          },
          {
            label: "2. adım",
            explanation: "Koordinat-harita kılavuzu Batlamyus’a bağlanır.",
          },
          {
            label: "3. adım",
            explanation:
              "Strabon’un Geographika’sı bu ikisinin yerine bölgesel tasvir ipucuyla ayrılır.",
          },
        ],
        answer: "Çevre tahmini Eratosthenes; koordinat kılavuzu Batlamyus.",
        check: "Aynı dönem içinde bulunmak üç kişiye aynı katkıyı vermez.",
        pitfall: "Geographika ve Geographia benzer adlarını aynı eser saymak.",
      },
      {
        title: "Konum hesabı ile dünya haritası",
        prompt:
          "Bir çalışmada şehirlerin konumu ve aralarındaki uzaklık ölçülüyor; başka kartta Orta Çağ dünya haritası belirtiliyor. Biruni ile İdrisî nasıl ayrılır?",
        strategy: "Genel coğrafya kelimesi yerine ayırt edici işlemi bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Konum ve mesafe hesabı Biruni’nin öne çıkan katkısıdır.",
          },
          {
            label: "2. adım",
            explanation: "Dünya haritası İdrisî için güçlü ipucudur.",
          },
          {
            label: "3. adım",
            explanation:
              "Her iki yöntem başka kişilerde de bulunabilir; burada verilen ayırt edici kaynak eşleşmesi kullanılır.",
          },
        ],
        answer: "Biruni: konum-mesafe; İdrisî: dünya haritası.",
        check:
          "Salt “ölçüm” sözcüğünün her zaman Dünya çevresi olmadığını kontrol ettik.",
        pitfall: "Her hesap işini otomatik Eratosthenes’e bağlamak.",
      },
      {
        title: "Üç eserin amacı",
        prompt:
          "Kitâb-ı Bahriye, Cihannümâ ve Seyahatnâme adlarını yazar ve amaçlarıyla eşleştir.",
        strategy: "Eser–yazar–ürün türünü üç sütun yap.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kitâb-ı Bahriye, Pirî Reis’in kıyı-liman ve denizcilik bilgisini öne çıkarır.",
          },
          {
            label: "2. adım",
            explanation: "Cihannümâ, Kâtip Çelebi’nin coğrafi derlemesidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Seyahatnâme, Evliya Çelebi’nin gezi, yerleşim ve insan gözlemlerini içerir.",
          },
        ],
        answer:
          "Pirî Reis–denizcilik; Kâtip Çelebi–derleme; Evliya Çelebi–seyahat gözlemi.",
        check: "Bütün gezi veya kıyı ipuçları aynı kişiyi zorunlu seçtirmez.",
        pitfall: "Osmanlı döneminde olmakla eserleri birbirine karıştırmak.",
      },
      {
        title: "Fiziki örüntü ve bölge sentezi",
        prompt:
          "Bir araştırma yükseldikçe bitki kuşaklarını; diğeri bir bölgede fiziksel çevre ile toplum ilişkilerini birlikte karşılaştırıyor. Humboldt ve Ritter hangi ağırlıklarla eşleşir?",
        strategy: "Araştırmanın merkez değişkenine bak.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bitki-yükselti boyunca düzenli fiziki örüntü Humboldt için ayırt edicidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bölgesel doğa-toplum ilişkilerini bütün olarak ele alma Ritter odağıyla eşleşir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu ayrım ikisinin de modern coğrafyaya katkısını dışlamaz.",
          },
        ],
        answer: "İlk ağırlık Humboldt, ikinci ağırlık Ritter.",
        check:
          "Katkı ağırlığını yalnız bir konuya ömür boyu kapanma iddiasına çevirmedik.",
        pitfall: "İki modern ismin bütün yöntem ve eserlerini özdeş saymak.",
      },
    ],
    recall: [
      {
        prompt: "Coğrafya adının kökü nedir?",
        answer: "Yunanca geo ve graphein kökleriyle ilişkilidir.",
      },
      {
        prompt: "Çağların eşit kutularda çizilmesi ne demektir?",
        answer: "Sıralamayı gösterir; sürelerin eşit olduğunu göstermez.",
      },
      {
        prompt: "Bir seyahat kaydının sınırı nedir?",
        answer:
          "Belirli yer, dönem ve gözlemciye bağlı kanıttır; tek başına küresel ölçüm değildir.",
      },
      {
        prompt: "Modern mekânsal analizde hangi veri denetimleri sürer?",
        answer:
          "Kaynak, tarih, ölçek/çözünürlük, doğruluk ve eksik veri denetimi.",
      },
      {
        prompt: "Strabon ve Batlamyus’u hangi eser/katkı ayırır?",
        answer:
          "Strabon: Geographika ve bölgesel tasvir; Batlamyus: Geographia/Coğrafya Kılavuzu, koordinat ve haritacılık.",
      },
      {
        prompt:
          "Pirî Reis, Kâtip Çelebi ve Evliya Çelebi’nin ayırt edici eserleri?",
        answer:
          "Kitâb-ı Bahriye; Cihannümâ; Seyahatnâme. Sırasıyla denizcilik-kıyı, derleme ve gezi gözlemi öne çıkar.",
      },
      {
        prompt: "Biruni ile İdrisî hangi ipucuyla ayrılır?",
        answer:
          "Konum/mesafe hesabı ile dünya haritası ipuçlarını karşılaştırırım; yalnız aynı dönemde bulunmak yetmez.",
      },
      {
        prompt: "Humboldt ve Ritter’in ağırlıklarını nasıl ayırırsın?",
        answer:
          "Humboldt için fiziki/bitki örüntüsü, Ritter için bölgesel doğa-insan ilişkisi ayırt edici olabilir; bunlar tek konu sınırı değildir.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Coğrafya Bilimi, PDF s.14–16 (basılı s.13–15) temelinde özgün anlatım ve alıştırmalar. Kaynaktaki Yunanca köken ve bütün bir çağı genelleme hataları düzeltilmiştir; şerit eşit süreli tarih ekseni değildir. Aurelia 002 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
  {
    id: "yerel-saat",
    title: "Yerel saat: boylamdan dakikaya, dakikadan güne",
    minutes: 55,
    objectives: [
      "Doğu–batı işaretini kullanarak boylam farkını hesapla.",
      "Dört dakika/derece ilişkisini saat ve gün değişimine uygula.",
      "Yerel güneş saati, ortak saat ve tarih değiştirme çizgisini ayır.",
      "Aynı meridyen ve antimeridyen durumlarını hatasız yorumla.",
    ],
    sections: [
      {
        title: "Konumu iki ayrı açıyla belirt",
        paragraphs: [
          "Enlem Ekvator’a, boylam Greenwich başlangıç meridyenine göre açısal konumdur. Kuzey–güney farkı enlem; doğu–batı farkı boylamla ifade edilir. Bu dersteki saat hesabında temel değişken boylamdır. Aynı boylamdaki yerlerin enlemleri farklı olabilir.",
          "Meridyenler bir kutuptan ötekine uzanan yarım çemberlerdir; farklı enlemlerde aralarındaki yüzey mesafesi değişir. Buna karşılık bir derecelik boylam farkının okul modelindeki zaman karşılığı enleme göre değişmez. Kilometre farkı ile derece farkını karıştırma.",
        ],
      },
      {
        title: "Neden bir derece dört dakika?",
        paragraphs: [
          "Dünya’nın günlük dönüşü için okul yaklaşımında 360° dönüş 24 saat kabul edilir. 24 saat 1.440 dakikadır; 1.440/360=4 dakika/derece bulunur. Tersi dönüşümde dakika farkını dörde bölerek boylam farkını bulursun.",
          "Bu model ortalama yerel güneş saatini ideal biçimde temsil eder; hassas astronomik düzeltmeleri içermez. Dereceyi doğrudan saat sanmak veya 60 ile yanlış çarpmak birim hatasıdır. Önce derece×dakika/derece işlemini yaz, sonra dakikayı saate çevir.",
        ],
      },
      {
        title: "Doğu ileri; işaret yöntemi güvenlidir",
        paragraphs: [
          "Doğu boylamını pozitif, batıyı negatif al. Hedef boylamdan başlangıç boylamını çıkar ve sonucu dörtle çarp. Pozitif fark hedefte saatin ileri, negatif fark geri olduğunu gösterir. 30°D’den 45°D’ye fark +15° ve +60 dakikadır.",
          "Farklı yarımkürelerde mutlak değerler çoğu örnekte toplanır: 30°D ile 30°B arasında 60° vardır. Yine de hedefi belirtmeden yalnız 60 sayısını yazmak işlemi tamamlamaz; doğudan batıya gidildiğinde saat geri alınır. Her soruda nerede saat verildiğini ve nerede istendiğini işaretle.",
        ],
      },
      {
        title: "Dakikayı taşı; günü kaybetme",
        paragraphs: [
          "Hesabı toplam dakika üzerinden yapmak saat ve gün taşımalarını kolaylaştırır. 00.20’den 240 dakika çıkarılırsa sonuç −220 dakikadır; bir gün eklenerek önceki gün 20.20 bulunur. 23.40’a 80 dakika eklenirse ertesi gün 01.00 olur.",
          "Gün değişimi soru tarih içerdiğinde özellikle önemlidir. Aynı anda karşılaştırılan iki yer için “önceki gün” ifadesi başlangıç yerinin verilen takvim gününe göredir. Bir saati 24.80 gibi bırakma; dakikayı 0–59, saati 0–23 aralığına taşı.",
        ],
      },
      {
        title: "Aynı meridyen; farklı yaşam koşulları",
        paragraphs: [
          "Okul güneş saati modelinde aynı meridyen üzerindeki noktaların yerel saati aynıdır. Enlemler farklıysa gündüz süresi, Güneş’in yüksekliği ve iklim farklı olabilir. Saat eşitliğinden bu özelliklerin de aynı olduğu çıkarılmaz.",
          "Antimeridyen, verilen meridyenin tam karşısıdır: 30°D’nin karşısı 150°B’dir. 180°D ile 180°B ise ayrı iki yer değil aynı meridyenin iki yazımıdır. Bunları iki fiziksel nokta sayıp yalnız adlarından 24 saatlik fiziksel güneş saati farkı üretme.",
        ],
      },
      {
        title: "Ortak saat bir yönetim kararıdır",
        paragraphs: [
          "Yerel güneş saati boylamla değişirken ortak saat, geniş bir bölgenin günlük işlerini aynı saatte düzenler. Türkiye uygulamasında UTC+3 kullanılır; ideal merkez boylamı karşılığı 45°D’dir. Ülkenin her noktasının güneş öğlesi bu nedenle aynı duvar saatine denk gelmek zorunda değildir.",
          "30°D’deki bir kentin güneş saatiyle 45°D merkezine göre kurulan ideal ortak saat arasında bir saat fark bulunur. Soru “yerel saat” diyorsa boylam hesabı; “ortak/sivil saat” diyorsa verilen zaman dilimi kullanılır. Ülkelerin siyasi saat kararını yalnız haritadaki boylamdan zorunlu olarak türetemezsin. UTC, Eşgüdümlü Evrensel Zaman’dır. Saat dilimi farkları zaten saat/dakika birimindedir: hedef farkı eksi kaynak farkı alınır; boylam gibi dörtle çarpılmaz. Aynı andaki hedef gösterimi = kaynak gösterimi − kaynak UTC farkı + hedef UTC farkıdır.",
        ],
      },
      {
        title: "Tarih değiştirme çizgisi ayrı bağlam ister",
        paragraphs: [
          "Uluslararası tarih değiştirme çizgisi yaklaşık 180° çevresindedir; siyasi ve yerleşim nedenleriyle her yerde meridyeni izlemez. Sivil takvimde çizgi batıya geçildiğinde bir gün ileri, doğuya geçildiğinde bir gün geri alınır. Bu, aynı noktada Güneş’in bir anda 24 saat ilerlemesi değildir.",
          "180° yakınındaki noktaların sivil tarihini soran bir problemde çizginin hangi tarafında olunduğu ve saat dilimi bilgisi gerekir. Boylam formülü tek başına bütün siyasi takvim kararlarını vermez. Model bu sınıra yaklaşan hesapları Greenwich’e göre seçilmiş cebirsel gösterim olarak açıkça etiketler. Yolculuk varsa geçen gerçek süre UTC ekseninde ayrıca eklenir: varış gösterimi = kalkış gösterimi − kaynak farkı + yol süresi + hedef farkı. Bu işlem gün taşmasını da içerir; aynı geçiş için ayrıca “tarih çizgisi” diye bir gün daha eklemek çifte düzeltmedir. Varışta duvar saatinin daha erken görünmesi gerçek yol süresinin negatif olduğunu göstermez.",
        ],
      },
      {
        title: "Çözümünü ters işlemle denetle",
        paragraphs: [
          "Verilen yer, hedef yer, boylam farkı, zaman farkı ve gün bilgisini sırayla yaz. Sonuç doğudaki yer için daha geri çıkıyorsa işareti yeniden kontrol et. Dakika farkını dörde bölüp ilk boylam farkına dönmek birim denetimidir.",
          "Gündüz süresi veya mesafe sorusu bu hesapla karıştırılmamalıdır. İki meridyen arası saat farkı için 111 km gibi uzaklık bilgisini kullanmaya gerek yoktur. Öğrendikten sonra modeli kapatıp bir doğu–batı ve bir gece yarısı örneğini kendi cümlenle çöz; sorular her veriyi kendi kartında sunar.",
        ],
      },
    ],
    examples: [
      {
        title: "Doğuya bir saat",
        prompt: "30°D’de yerel saat 12.00. 45°D’de kaçtır?",
        strategy: "Hedef eksi başlangıç.",
        steps: [
          {
            label: "1. adım",
            explanation: "45−30=15° doğuya fark vardır.",
          },
          {
            label: "2. adım",
            explanation: "15×4=60 dakika ileri gidilir.",
          },
          {
            label: "3. adım",
            explanation: "12.00+1 saat=13.00.",
          },
        ],
        answer: "Aynı gün 13.00.",
        check: "Daha doğudaki yer ileridedir.",
        pitfall: "15 dereceyi 15 saat saymak.",
      },
      {
        title: "Gece yarısında batıya",
        prompt:
          "30°D’de 10 Mayıs 00.20. 30°B’de aynı anda okul modelindeki saat nedir?",
        strategy: "Batıyı negatif yaz.",
        steps: [
          {
            label: "1. adım",
            explanation: "−30−30=−60° bulunur.",
          },
          {
            label: "2. adım",
            explanation: "−60×4=−240 dakika, yani 4 saat geri.",
          },
          {
            label: "3. adım",
            explanation: "00.20−4 saat önceki gün 20.20’dir.",
          },
        ],
        answer: "9 Mayıs 20.20.",
        check: "20.20’ye 4 saat ekleyince 10 Mayıs 00.20’ye dönülür.",
        pitfall: "Sadece saati yazıp günü unutmamak gerekir.",
      },
      {
        title: "Saatten boylama",
        prompt:
          "20°D’de 10.00 iken hedefte yerel saat aynı gün 11.20. Hedef hangi boylamdadır?",
        strategy: "Zaman farkını dereceye çevir.",
        steps: [
          {
            label: "1. adım",
            explanation: "11.20−10.00=80 dakika ileridir.",
          },
          {
            label: "2. adım",
            explanation: "80/4=20° daha doğudadır.",
          },
          {
            label: "3. adım",
            explanation: "20°D+20°=40°D olur.",
          },
        ],
        answer: "40°D.",
        check: "20 derece×4 dakika=80 dakika.",
        pitfall: "80 dakikayı 80 derece almak.",
      },
      {
        title: "Aynı çizginin iki adı",
        prompt:
          "Bir nokta 180°D, aynı meridyendeki ikinci nokta 180°B diye yazılmış. Bu yazımdan fiziksel güneş saati farkı 24 saat çıkar mı?",
        strategy: "Konumun tekliğini denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "180°D ve 180°B aynı meridyenin iki adıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Aynı fiziksel meridyen için güneş saati fazı aynıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Sivil takvim farkı için tarih çizgisi tarafı ayrıca verilmelidir.",
          },
        ],
        answer:
          "Hayır; yalnız bu iki yazım 24 saatlik fiziksel fark kanıtlamaz.",
        check: "Adlandırmayı iki ayrı konum sanmadık.",
        pitfall: "+180 ve−180’i bağlamsız iki farklı nokta saymak.",
      },
      {
        title: "UTC ile aynı an",
        prompt:
          "Kaynak UTC−3 bölgesinde perşembe 22.50. Aynı anda UTC+2 bölgesinin sivil tarihi ve saati nedir?",
        strategy: "Önce UTC’ye, sonra hedefe taşı.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kaynak 22.50’den−3 saat çıkarmak 3 saat eklemektir: cuma 01.50 UTC.",
          },
          {
            label: "2. adım",
            explanation: "Hedef UTC+2 için 2 saat eklenir: cuma 03.50.",
          },
          {
            label: "3. adım",
            explanation:
              "Kısa denetim: hedef−kaynak=2−(−3)=5 saat;22.50+5=03.50 ertesi gün.",
          },
        ],
        answer: "Cuma 03.50.",
        check:
          "Boylamla dört dakika işlemi kullanılmadı; ofsetler zaten saat cinsindedir.",
        pitfall:
          "UTC farkını dörtle çarpmak veya gece yarısını iki kez saymak.",
      },
      {
        title: "Yolculukta tek zaman ekseni",
        prompt:
          "UTC+2 bölgesinden cuma 23.40’ta başlayan 7 saatlik uçuş UTC−4 bölgesinde hangi yerel tarih ve saatte biter?",
        strategy: "Gerçek süreyi UTC ekseninde ekle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kalkış UTC: cuma 23.40−2 saat=cuma 21.40.",
          },
          {
            label: "2. adım",
            explanation: "7 saat ekle: cumartesi 04.40 UTC.",
          },
          {
            label: "3. adım",
            explanation: "Hedef UTC−4: cumartesi 04.40−4 saat=cumartesi 00.40.",
          },
        ],
        answer: "Cumartesi 00.40.",
        check:
          "Toplam duvar saati farkı−2+7−4=+1 saat; cuma 23.40+1 saat aynı sonuca gider.",
        pitfall:
          "Uçuş süresini unutmak veya ofset dönüşümünden sonra ayrıca bir gün eklemek.",
      },
    ],
    recall: [
      {
        prompt: "Boylam farkını dakikaya nasıl çevirirsin?",
        answer: "Hedef eksi başlangıç boylamını 4 dakika/derece ile çarparım.",
      },
      {
        prompt: "Aynı boylam hangi özelliği eşitler?",
        answer:
          "Okul güneş saati modelinde yerel saati; gündüz süresini veya iklimi zorunlu eşitlemez.",
      },
      {
        prompt: "Yerel saat ile ortak saat neden farklı olabilir?",
        answer:
          "İlki boylama, ikincisi bölgenin kabul ettiği sivil zaman düzenine bağlıdır.",
      },
      {
        prompt: "180°D ve 180°B neyi gösterir?",
        answer:
          "Aynı meridyenin iki gösterimidir; sivil tarih çizgisi bağlamı ayrıca gerekir.",
      },
      {
        prompt: "Saat dilimi ve yol süresiyle genel varış hesabı nedir?",
        answer:
          "Kalkış gösterimi − kaynak UTC farkı + gerçek yol süresi + hedef UTC farkı; tarihi aynı dakika ekseninde taşırım.",
      },
      {
        prompt:
          "UTC dönüşümünden sonra ayrıca tarih çizgisi düzeltmesi neden yapılmaz?",
        answer:
          "Ofsetler ve geçen süreyle yapılan gün taşması zaten sivil tarihi verir; aynı geçişe ek gün uygulamak çifte sayımdır.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Coğrafi Konum, PDF s.15–17 (basılı s.14–16) temelinde özgün anlatım ve alıştırmalar. Hesap, okul düzeyindeki yerel güneş saati yaklaşımıdır; sivil saat ve tarih çizgisi ayrı açıklanmıştır. Aurelia 003 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
  {
    id: "atmosfer-katmanlari",
    title: "Atmosfer: karışımdan katmanlara, havadan iklime",
    minutes: 55,
    objectives: [
      "Atmosferin bileşimi ve işlevlerini süreçlerle ilişkilendir.",
      "Sıcaklığa göre temel katmanları sıralayıp yaklaşık sınırlarını yorumla.",
      "Ozon, iyonosfer ve sıcaklık katmanlarını aynı sınıflandırma sanma.",
      "Kısa hava olayı ile uzun dönem iklim örüntüsünü ayır.",
    ],
    sections: [
      {
        title: "Gaz örtüsü neden Dünya ile kalır?",
        paragraphs: [
          "Atmosfer yer çekiminin etkisiyle Dünya çevresinde tutulan gaz örtüsüdür. Yerden uzaklaşıldıkça yoğunluk genel olarak azalır; atmosfer tek bir sert duvarla bitmez. Gazların büyük bölümü yüzeye yakın alt katmanlarda bulunur, üst katmanlar çok seyrektir.",
          "Yüksek sıcaklık ile yoğun ısı aktarımı aynı şey değildir. Üst atmosferde taneciklerin kinetik enerjisi yüksekken tanecik sayısı çok az olabilir. Bu nedenle termosferin yüksek sıcaklığını yere yakın yoğun ve çok sıcak bir hava kütlesiyle özdeş düşünme.",
        ],
      },
      {
        title: "Bileşimin paydasını koru",
        paragraphs: [
          "Kuru hava için hacimce yaklaşık %78 azot, %21 oksijen ve %1 diğer gazlar biçiminde okul oranları kullanılır. Bu sayılar yuvarlatılmıştır; diğer gazlar arasında argon ve karbondioksit de vardır. Hidrojen bir asal gaz değildir; gaz listelerini yalnız ezber sırasına göre sınıflandırma.",
          "Su buharı yere ve zamana göre değişir. %2 su buharı içeren bir karışımda kalan %98’lik kuru hava payına %78 azot oranını uygulamak gerekir: yaklaşık %76,44 azot bulunur. Kuru hava oranlarına ayrıca %2 ekleyip toplamı %102 yapmak payda hatasıdır.",
        ],
      },
      {
        title: "Yaşam, enerji ve koruma",
        paragraphs: [
          "Atmosfer solunum ve fotosentez için gerekli gazları, su döngüsünü ve hava hareketlerini sağlar. Sera etkisinde bazı gazlar yeryüzünden çıkan uzun dalga ışınımla etkileşir. Doğal sera etkisi ile insan kaynaklı artışın iklimi değiştirmesi birbirinden ayrılmalıdır.",
          "Ozonun güneş kaynaklı morötesi ışınımla ilişkisi, sera gazlarının uzun dalga ışınımla ilişkisiyle aynı süreç değildir. Atmosfer sesi taşıyabilir; ışığın yayılması için ise mutlaka hava gerekmez. Gökyüzünün maviliği kısa dalga boylu görünür ışığın saçılmasıyla ilişkilidir, yalnız kırılma diye açıklanmaz.",
        ],
      },
      {
        title: "Troposfer: yere yakın değişim",
        paragraphs: [
          "Troposfer en alt katmandır; hava kütlesinin ve su buharının önemli bölümü burada bulunur. Günlük hava olaylarının büyük kısmı bu katmanda gerçekleşir. Yüzeyle etkileşim ve dikey-yatay hava hareketleri sıcaklık, nem ve bulutları etkiler.",
          "Kalınlık enlem ve mevsimle değişir; 13 km gibi değerler yaklaşık okul ortalamasıdır. Genel sıcaklık azalması her gün ve her yükseklikte zorunlu değildir; inversiyonda sıcaklık yükseklikle artabilir. “Su buharının tamamı yalnız burada bulunur” gibi mutlak bir sınır kurma.",
        ],
      },
      {
        title: "Stratosfer: sıcaklık yönü değişir",
        paragraphs: [
          "Stratosfer troposferin üzerindedir ve yaklaşık 50 km’ye uzanır. Ozonun önemli bölümü bu katmanda bulunur; morötesi ışınımın soğurulması sıcaklık profilinin yukarı doğru artan bölümüne katkı sağlar. Bütün katman tek ve değişmez −50°C değerinde değildir.",
          "Troposfer–stratosfer geçişi tropopoz, stratosfer–mezosfer geçişi stratopoz olarak adlandırılır. Geçiş bölgeleri çizimde keskin sınırla gösterilse de gerçek atmosfer koşulları değişir. Ozon katmanını tümüyle saf ozondan oluşan ayrı bir kabuk olarak düşünme.",
        ],
      },
      {
        title: "Mezosfer ve termosfer",
        paragraphs: [
          "Mezosfer yaklaşık 50–85 km aralığıyla gösterilir; sıcaklık genel olarak yeniden azalır. Atmosfere giren birçok küçük göktaşı bu bölgelerde ısınıp parçalanır. Bu, bütün büyüklüklerdeki bütün cisimlerin yere asla ulaşamayacağı anlamına gelmez.",
          "Termosfer yaklaşık 85 km’den sonra başlar; yüksek enerjili ışınımla etkileşim ve çok seyrek gazlar önemlidir. Kutup ışıkları üst atmosferle ilişkilidir. İyonosfer elektriksel özelliklere göre tanımlanan, birden çok sıcaklık katmanıyla örtüşebilen bölgedir; zorunlu bir altıncı sıcaklık katmanı değildir. Radyo dalgalarının iyonosferle etkileşimi frekansa ve bölgenin durumuna göre değişir; bütün radyo dalgaları her yükseklikte aynı biçimde yansır veya iletilir denmez.",
        ],
      },
      {
        title: "Ekzosfer ve şema sınırları",
        paragraphs: [
          "Ekzosfer atmosferin çok seyrek dış bölgesidir; uzaya geçiş kademelidir. Alt sınır için yüzlerce kilometrelik yaklaşık değerler verilir. Uyduların tamamını tek bir katmana yerleştiren genelleme yapma; farklı görevlerin farklı yörünge yükseklikleri bulunur.",
          "Modelde 13, 50, 85 ve 600 km sınırları öğretici bir profil seçimi olarak kullanılır. Sürgüyle yükseklik değişince işaret ve sıcaklık yönü değişir; sonuç gerçek bir hava gözlemi değildir. Katman seçildiğinde içinde ayrı bir saf gazın belirdiği yanlış görsel kullanılmaz; karışımın yoğunluğu değişir.",
        ],
      },
      {
        title: "Hava durumu, iklim ve kanıt",
        paragraphs: [
          "Belirli bir yerdeki kısa süreli sıcaklık, yağış ve rüzgâr durumu hava durumudur. İklim uzun yılların dağılım, ortalama, değişkenlik ve uç değer örüntüleriyle ilgilidir. Bir günlük kar yağışı, tek başına uzun dönem iklim eğilimini kanıtlamaz veya çürütmez.",
          "“Bugün yağmurlu” kısa süreli gözlem; “yazların genel olarak kurak geçmesi” uzun dönem örüntüsüdür. Meteoroloji ile klimatoloji ilişkili alanlardır, biri diğerini gereksiz kılmaz. Soru kartında verilen süreyi ve mekânı okuyup hangi tür kanıtın istendiğini belirle.",
        ],
      },
    ],
    examples: [
      {
        title: "Kuru hava paydası",
        prompt:
          "Karışımın hacimce %2’si su buharı. Kalan kuru havanın %78’i azotsa toplam karışımda yaklaşık azot yüzdesi nedir?",
        strategy: "Oranı ait olduğu parçaya uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "Toplam 100 birim kabul edilir; su buharı 2 birimdir.",
          },
          {
            label: "2. adım",
            explanation: "Kuru hava 98 birimdir.",
          },
          {
            label: "3. adım",
            explanation: "Azot 98×0,78=76,44 birim olur.",
          },
        ],
        answer: "Yaklaşık %76,44.",
        check:
          "76,44+20,58+0,98+2=100; yuvarlatılmış kuru hava oranlarıyla toplam korunur.",
        pitfall:
          "Kuru hava oranlarına ayrıca su ekleyip toplamı 100’ü aşırmak.",
      },
      {
        title: "Katmanı seç",
        prompt:
          "Yaklaşık şemada 30 km yüksekliğe çıkılıyor. Troposfer 13 km, stratosfer 50 km’de bitiyor. Hangi katmandasın?",
        strategy: "Verilen model sınırlarını karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "30>13 olduğundan troposfer aşılmıştır.",
          },
          {
            label: "2. adım",
            explanation: "30<50 olduğundan mezosfere ulaşılmamıştır.",
          },
          {
            label: "3. adım",
            explanation: "Bu iki sınır arasında stratosfer bulunur.",
          },
        ],
        answer: "Stratosfer.",
        check: "Sınırların model için yaklaşık kabul olduğunu koruduk.",
        pitfall: "13 km’yi bütün Dünya için kesin ölçüm saymak.",
      },
      {
        title: "Sıcak ama seyrek",
        prompt:
          "Termosferde sıcaklık yüksekken yoğunluk çok düşük. “Yerdeki yoğun sıcak hava gibi çok enerji aktarır” kesin mi?",
        strategy: "Sıcaklıkla tanecik sayısını ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Sıcaklık taneciklerin enerji ölçeğiyle ilgilidir.",
          },
          {
            label: "2. adım",
            explanation: "Çok seyrek ortamda birim hacimde tanecik azdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı sıcaklık adı, aynı miktarda enerji aktarımı garantilemez.",
          },
        ],
        answer: "Hayır; yoğunluk ve etkileşen tanecik sayısı da gerekir.",
        check: "Sıcaklık değeri ile toplam etkiyi özdeşleştirmedik.",
        pitfall:
          "Yüksek sıcaklığı tek başına bütün ısıl sonuçlara yeterli saymak.",
      },
      {
        title: "Tek günün kanıtı",
        prompt:
          "Bir kentte bugün kar yağıyor. Bu uzun dönem ısınma eğilimini tek başına çürütür mü?",
        strategy: "Zaman ölçeğini denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kar yağışı günlük hava olayıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "İklim eğilimi çok yıllı verinin dağılım ve değişimiyle incelenir.",
          },
          {
            label: "3. adım",
            explanation: "Tek gün uzun dönemin tümünü temsil etmez.",
          },
        ],
        answer: "Hayır; uzun dönem veri gerekir.",
        check: "Hava olayı gerçektir, fakat kanıt kapsamı farklıdır.",
        pitfall: "Hava durumuyla iklimi aynı örneklem saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Kuru hava oranıyla nemli hava oranı neden aynı payda değildir?",
        answer:
          "Su buharı toplamın bir bölümünü alır; kuru gaz oranları kalan paya uygulanır.",
      },
      {
        prompt: "Troposferin sınırı her yerde tam 13 km midir?",
        answer:
          "Hayır; enlem, mevsim ve koşullarla değişir; bu bir yaklaşık şema değeridir.",
      },
      {
        prompt: "İyonosfer neden zorunlu altıncı sıcaklık katmanı değildir?",
        answer:
          "Elektriksel özelliklere göre tanımlanır ve sıcaklık katmanlarıyla örtüşür.",
      },
      {
        prompt: "Bir günlük hava olayı iklim için yeterli midir?",
        answer:
          "Hayır; iklim uzun dönem örüntü ve değişkenlik verisi gerektirir.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Atmosfer ve İklim Elemanları, PDF s.10–11 (basılı s.9–10) temelinde özgün anlatım ve alıştırmalar. Katman sınırları yaklaşık, sıcaklık profili şematiktir; katmanlar saf gaz kutuları değildir. Aurelia 004 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
  {
    id: "cografya-sicaklik",
    title: "Sıcaklık: etkileri ayır, yükseltiyi kontrollü karşılaştır",
    minutes: 55,
    objectives: [
      "Isı, iç enerji ve sıcaklığı birbirinden ayır.",
      "Enlem, bakı, güneşlenme süresi ve yüzey özelliklerini birlikte değerlendir.",
      "Gerçek ve deniz seviyesine indirgenmiş sıcaklığı verilen yaklaşım altında hesapla.",
      "İnversiyon ve çok etkenli durumlarda basit kuralın sınırını fark et.",
    ],
    sections: [
      {
        title: "Sıcaklık bir enerji toplamı değildir",
        paragraphs: [
          "Sıcaklık maddenin termal durumunu belirleyen niceliktir; okul düzeyinde taneciklerin ortalama hareket enerjisiyle ilişkilendirilir. Termometreyle ölçülür; °C veya K gibi birimler kullanılır. Kelvin simgesine derece işareti eklenmez. Büyük bir gölün sıcaklığı düşükken toplam iç enerjisi küçük sıcak bir kaptan fazla olabilir.",
          "Isı, sıcaklık farkı nedeniyle aktarılan enerjidir; cisim içinde depolanan her enerjinin adı değildir. Maddenin iç enerjisi taneciklerin hareket ve etkileşim enerjilerini kapsar. Sıcaklık ile enerjiyi eşitlemek, coğrafyadaki deniz–kara karşılaştırmalarında yanlış sonuç üretir.",
        ],
      },
      {
        title: "Işının açısı ve yayılma alanı",
        paragraphs: [
          "Aynı ışınım demeti yüzeye daha dik geldiğinde enerji daha dar alana yayılır; küçük açıyla geldiğinde daha geniş yüzeye dağılır. Enlem, günün saati, eksen eğikliği ve eğim-bakı gelme açısını etkiler. Diğer koşullar benzerken birim alana enerji farkı sıcaklık üzerinde etkilidir.",
          "Açı tek değişken değildir: bulut, albedo, yükselti, nem ve taşınan hava da sonucu değiştirir. Ekvator’dan kutuplara genel eğilim bir haritadaki her iki nokta için koşulsuz sıcaklık sıralaması değildir. Kutupta gündüzün çok uzun olması da alçak Güneş açısını kendiliğinden ortadan kaldırmaz.",
        ],
      },
      {
        title: "Bakı ve gündüz süresi",
        paragraphs: [
          "Bakı yamaçların Güneş’e göre konumudur. Kuzey Yarım Küre’de Yengeç Dönencesi’nin kuzeyinde güneye bakan yamaçlar genel olarak daha uygun ışın açısı alır; Güney Yarım Küre’nin dönence dışındaki kısmında kuzeye bakanlar öne çıkar. Dönenceler arasında bu ilişki yıl içinde değişebilir.",
          "Güneşlenme süresi enerji alınan süreyi etkiler; bulutluluk gerçek gelen enerjiyi değiştirebilir. Sadece güney sözcüğünü görüp bütün Dünya için sıcak yamaç seçme. Önce yarımküre, enlem kuşağı, mevsim ve diğer koşulları kontrol et.",
        ],
      },
      {
        title: "Kara ve deniz neden farklı tepki verir?",
        paragraphs: [
          "Su ve karanın ısıl özellikleri, suyun karışması ve buharlaşması farklıdır. Karalar genel olarak daha hızlı ısınıp soğurken denizler sıcaklık değişimini daha yavaş gösterir. Bu fark kıyılarda günlük-yıllık sıcaklık farklarının iç kesimlere göre daha küçük olmasına katkı sağlar.",
          "Bu karşılaştırma her kıyı ile her iç nokta için tek etkenli kesin yasa değildir. Akıntı, rüzgâr, bulut ve yükselti de önemlidir. Denizden gelen hava yazın serinletici, kışın ılıtıcı olabilir; gelen hava kütlesinin gerçekten hangi özellikleri taşıdığına bakılmalıdır. Günlük veya yıllık sıcaklık farkı verilen dönemin en yüksek değeri eksi en düşük değeridir. Negatif en düşükte çıkarma işaretine dikkat et:24−(−3)=27°C. Tek bir günün veya ayın sıcaklığı bütün yılın farkını vermez.",
        ],
      },
      {
        title: "Yükselti ve indirgeme: koşulu yaz",
        paragraphs: [
          "Troposferde sıcaklık yükseklikle genel olarak azalır; gerçek oran koşullara göre değişir. Havanın yüzeyle enerji alışverişi ve yükselirken genleşip soğuması önemlidir. “Ağır sera gazları yalnız yerde durduğu için” biçiminde tek nedenli açıklama doğru değildir.",
          "Soruda 200 metrede 1°C azalma yaklaşımı veriliyorsa deniz seviyesine indirgenmiş sıcaklık T₀=Tölçülen+h/200 ile hesaplanır. 1.200 m’de 12°C için 18°C bulunur. Bu ölçülmüş deniz seviyesi sıcaklığı değil, yükselti etkisini belirli kabulle kaldıran karşılaştırma değeridir.",
        ],
      },
      {
        title: "İzoterm haritasının neyi gösterdiğini sor",
        paragraphs: [
          "İzoterm aynı sıcaklıktaki noktaları birleştiren eğridir. Gerçek sıcaklık haritası ölçülen değerleri; indirgenmiş harita yükseltinin etkisi bir yaklaşımla kaldırılmış değerleri gösterir. Bunlar aynı veri setinin farklı sorulara hizmet eden temsilleridir.",
          "Gerçek haritada yüksek dağ soğuk görünürken indirgenmiş haritada fark azalabilir. Buradan dağın gerçekten ısındığı sonucu çıkmaz; dönüşüm hesap üzerinde yapılmıştır. İndirgenmiş sıcaklıkta yükselti etkisinin kaldırılması enlem, denizellik ve akıntı gibi bütün başka etkenlerin de kaldırıldığı anlamına gelmez. Diğer koşullar benzer ve arka plan sıcaklığı Ekvator’a doğru artıyorsa soğuk bir kıyı akıntısında aynı sıcaklık eğrisine ulaşmak için Ekvator’a yaklaşmak gerekebilir; sıcak akıntıda tersi, kutba doğru sapma beklenebilir. Güney Yarım Küre’de Ekvator kuzeyde, Kuzey Yarım Küre’de güneydedir. Peru akıntısının Güney Amerika batı kıyısını soğutması bu yorum için örnektir; haritadaki her bükülme tek başına akıntı nedenini kanıtlamaz.",
        ],
      },
      {
        title: "Nem, örtü, albedo ve taşınım",
        paragraphs: [
          "Su buharı ve bulutlar ışınım dengesini, yüzeyler yansıtma ve soğurmayı etkiler. Kar örtüsü yüksek yansıtma eğilimiyle, bitki örtüsü gölgeleme ve buharlaşma-terlemeyle sıcaklığı değiştirir. Koyu-açık renk karşılaştırmasını yüzeyin bütün fiziksel özelliklerinin yerine koyma.",
          "Rüzgâr ve okyanus akıntıları enerji taşır; geldikleri kaynağa göre sıcaklık üzerinde etkili olur. Tek başına kuzeyden esmek bütün yarımkürelerde aynı sıcaklık etkisi demek değildir. İki istasyon karşılaştırıldığında değişkenleri ayrı ayrı yazmak bir güçlü etkenin diğerini gizlemesini önler.",
        ],
      },
      {
        title: "İnversiyon basit kuralın sınırıdır",
        paragraphs: [
          "İnversiyonda belirli bir tabakada sıcaklık yukarı doğru artar. Özellikle yüzeyin soğuduğu uygun koşullarda soğuk hava aşağıda birikebilir; bu durum kirleticilerin dağılmasını da zorlaştırabilir. Genel yükseklik azalmasını her gözleme zorla uygulama.",
          "Modelde normal yaklaşımı kapattığında indirgenmiş değer otomatik üretilmez. Çünkü inversiyon koşulunda aynı sabit oranla gerçek bir karşılaştırma yapmak desteklenmez. Bu bir hata ekranı değil, model varsayımının yetersiz kaldığını açıkça gösteren öğrenme durumudur.",
        ],
      },
    ],
    examples: [
      {
        title: "İndirgenmiş değer",
        prompt:
          "1.200 m’de 12°C ölçülüyor. Soru 200 m’de 1°C azalma kabul ediyor. Deniz seviyesine indirgenmiş değer nedir?",
        strategy: "Önce yükseltiye ait sıcaklık farkını bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "1.200/200=6°C yükselti farkı vardır.",
          },
          {
            label: "2. adım",
            explanation: "Deniz seviyesine inme yönünde bu 6°C eklenir.",
          },
          {
            label: "3. adım",
            explanation: "12+6=18°C hesaplanır.",
          },
        ],
        answer: "18°C.",
        check: "Yeniden 1.200 m’ye çıkma yaklaşımında 18−6=12°C.",
        pitfall: "Denize inerken sıcaklığı azaltmak.",
      },
      {
        title: "Gerçek ve indirgenmiş sıralama",
        prompt:
          "A:1.000 m’de 15°C; B:0 m’de 18°C. 200 m’de 1°C yaklaşımı altında A’nın indirgenmiş değeri ve karşılaştırma nedir?",
        strategy: "Yükselti etkisini yalnız A’dan kaldır.",
        steps: [
          {
            label: "1. adım",
            explanation: "A için 1.000/200=5°C eklenir.",
          },
          {
            label: "2. adım",
            explanation: "A indirgenmiş 20°C, B 18°C olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Gerçekte A daha soğukken indirgenmiş karşılaştırmada daha sıcaktır.",
          },
        ],
        answer: "A için 20°C; indirgenmiş değeri B’den 2°C yüksek.",
        check: "Bu, A’nın gerçekten 20°C ölçüldüğünü söylemez.",
        pitfall: "Harita dönüşümünü fiziksel ısınma sanmak.",
      },
      {
        title: "Bakı koşulu",
        prompt:
          "Kuzey Yarım Küre’de 40°K’daki aynı yükselti ve benzer özellikli iki yamacın hangisi genel olarak daha uygun ışın açısı alır?",
        strategy: "Dönence dışını ve yarımküreyi kontrol et.",
        steps: [
          {
            label: "1. adım",
            explanation: "40°K Yengeç Dönencesi’nin kuzeyindedir.",
          },
          {
            label: "2. adım",
            explanation: "Güneş gün içinde genel olarak güney gökyüzündedir.",
          },
          {
            label: "3. adım",
            explanation: "Bu koşulda güneye bakan yamaç öne çıkar.",
          },
        ],
        answer: "Güneye bakan yamaç.",
        check: "Bunu Güney Yarım Küre’ye koşulsuz taşımadık.",
        pitfall: "Güney yönünü bütün Dünya için sıcak saymak.",
      },
      {
        title: "İnversiyonda sınır",
        prompt:
          "Bir sabah vadide aşağıdaki hava üstteki havadan daha soğuk ölçülüyor. Normal 200 m’de 1°C kuralı bu ölçümü zorunlu açıklar mı?",
        strategy: "Ölçümü genel eğilimden ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Veri sıcaklığın yukarı doğru arttığını gösterir.",
          },
          {
            label: "2. adım",
            explanation: "Bu terselme/inversiyon durumudur.",
          },
          {
            label: "3. adım",
            explanation:
              "Normal azalmanın sabit oranını bu tabakaya zorla uygulamak uygun değildir.",
          },
        ],
        answer: "Hayır; inversiyon koşulu için ek profil gerekir.",
        check: "Modelin sayı üretmemesi burada bilimsel sınırdır.",
        pitfall: "Bütün gerçek verileri tek sabit orana uydurmak.",
      },
      {
        title: "Yıllık farkta negatif değer",
        prompt:
          "Kıyı X’in aylık ortalamaları yıl içinde 3–22°C, içteki Y’ninki −4–26°C arasında değişiyor. İki yıllık farkı karşılaştır.",
        strategy: "Her yerde maksimumdan minimumu çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation: "X:22−3=19°C.",
          },
          {
            label: "2. adım",
            explanation: "Y:26−(−4)=30°C.",
          },
          {
            label: "3. adım",
            explanation:
              "Y’de daha büyük fark, diğer koşullar da incelenmek üzere karasallıkla uyumludur.",
          },
        ],
        answer: "X 19°C, Y 30°C; Y’nin farkı 11°C daha büyük.",
        check: "Bir minimum sıcaklığı tek başına yıllık fark diye kullanmadık.",
        pitfall:
          "Negatif minimumu çıkarırken işaretini ikinci kez yanlış çevirmek.",
      },
      {
        title: "İzotermi yarımküreyle oku",
        prompt:
          "Kuzey Yarım Küre’de kıyıyı soğutan bir akıntı var; diğer koşullar benzer ve arka plan Ekvator’a doğru ısınıyor. Aynı sıcaklık eğrisi kıyıda Ekvator’a doğru kayarsa yön nedir?",
        strategy: "Önce Ekvator’un hangi yönde olduğunu belirle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Soğuk etki altında aynı sıcaklığa erişmek için daha sıcak enleme yaklaşılır.",
          },
          {
            label: "2. adım",
            explanation: "Bu varsayımda daha sıcak yön Ekvator’a doğrudur.",
          },
          {
            label: "3. adım",
            explanation:
              "Kuzey Yarım Küre’de Ekvator güneydedir; eğrinin bu sapması güneye olur.",
          },
        ],
        answer: "Güneye, Ekvator yönüne.",
        check:
          "Güney Yarım Küre’de aynı Ekvator yönü kuzeye döner; yönü ezberden taşımadık.",
        pitfall: "Her yarımkürede kuzeyi aynı sıcaklık anlamına bağlamak.",
      },
    ],
    recall: [
      {
        prompt: "Isı ile iç enerji farkı nedir?",
        answer:
          "Isı sıcaklık farkından kaynaklanan enerji aktarımıdır; iç enerji maddenin mikroskobik enerji toplamıdır.",
      },
      {
        prompt: "İndirgenmiş sıcaklık ölçüm müdür?",
        answer:
          "Verilen varsayımla hesaplanan karşılaştırma değeridir; aynı noktada yeni ölçüm değildir.",
      },
      {
        prompt: "Bakı sorusunda önce neyi kontrol edersin?",
        answer: "Yarımküre, enlem kuşağı, mevsim ve diğer koşulları.",
      },
      {
        prompt: "İnversiyon neden önemlidir?",
        answer:
          "Sıcaklığın yukarı doğru artabildiğini, genel azalmanın her tabakada zorunlu olmadığını gösterir.",
      },
      {
        prompt: "Yıllık sıcaklık farkı nasıl hesaplanır?",
        answer:
          "Verilen yılın en yüksek ortalamasından en düşük ortalamasını çıkarırım; negatif minimumun işaretini korurum.",
      },
      {
        prompt:
          "Soğuk akıntıda izoterm sapmasını yorumlarken hangi koşulu sorarsın?",
        answer:
          "Arka plan sıcaklık yönünü, yarımküreyi ve diğer etkenleri; Ekvator yönünün iki yarımkürede ters olduğunu.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Atmosfer ve İklim Elemanları, PDF s.12–13 (basılı s.11–12) temelinde özgün anlatım ve alıştırmalar. Kaynaktaki ısı/iç enerji ve yükselti açıklamaları düzeltilmiştir; 1°C/200 m yalnız açıkça verilen okul yaklaşımıdır. Aurelia 005 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
  {
    id: "basinc-ruzgarlar",
    title: "Basınç ve rüzgârlar: farkı, yönü ve ölçeği izle",
    minutes: 55,
    objectives: [
      "Basıncı kuvvet/alan ve üzerindeki hava sütunuyla açıkla.",
      "Göreli yüksek–alçak merkezleri ve basınç gradyanını hesapla.",
      "Basınç gradyanı, Coriolis ve yüzey sürtünmesinin farklı rollerini ayır.",
      "Sürekli, mevsimlik ve günlük yerel rüzgârları süreç ve zaman ölçeğiyle eşleştir.",
    ],
    sections: [
      {
        title: "Basınç kuvvet değil kuvvet/alandır",
        paragraphs: [
          "Atmosfer basıncı, üzerindeki hava sütununun birim alana etkisiyle ilişkilidir. Basınç birimi pascaldır; meteorolojide hPa kullanılır ve 1 hPa=1 mbar’dır. Barometre basınç ölçer. 1.013 hPa yaklaşık bir standart referanstır; bir basınç merkezinin adına tek başına karar vermez.",
          "Üstünde kalan hava sütunu yükseldikçe genellikle azalır, bu yüzden yüksekte basınç daha düşüktür. Sıcaklık, yoğunluk, hava kütlesi taşınması ve yer çekimi de ilişkilidir. Açık atmosferde sıcaklığın her artışı için tek ve zorunlu bir yerel basınç sayısı üretilmez; çevre ve hareketler de değerlendirilir.",
        ],
      },
      {
        title: "Yüksek ve alçak çevresine göredir",
        paragraphs: [
          "Çevresi 1.020 hPa iken 1.010 hPa’lık bir merkez göreli alçaktır; çevresi 990 hPa iken 1.000 hPa’lık merkez göreli yüksektir. İkincisi standart referanstan düşük olsa da çevresinden yüksektir. Soru önce merkezle komşularını karşılaştırmayı ister.",
          "Yüzeye yakın ideal genel modelde alçak merkeze yatay yakınsama ve yükselme; yüksek merkezden çevreye ayrılma ve alçalma görülür. Yükselme soğuma ve bulutlanmayı destekleyebilir, fakat her alçak merkezde kesin yağış garantisi değildir. Nem ve atmosfer kararlılığı gibi koşullar gerekir.",
        ],
      },
      {
        title: "Basınç farkını uzaklıkla birlikte oku",
        paragraphs: [
          "Yatay basınç gradyanı, basınç değişiminin uzaklığa oranıdır.1.020–1.000 hPa farkı 100 km’de 0,2 hPa/km;200 km’de 0,1 hPa/km olur. Aynı basınç farkı daha kısa mesafede daha büyük gradyan oluşturur. İzobarların sıklaşması da bu ilişkiyi gösterir. İzobar aynı basınçtaki noktaları birleştiren eğridir. Çizgi aralığıyla kıyas yaparken haritaların ölçeği ve komşu izobarlar arasındaki basınç adımı aynı olmalıdır; aksi hâlde çıplak çizgi sıkılığı yanıltabilir.",
          "Büyük gradyan diğer koşullar benzerken daha güçlü basınç kuvvetiyle ilişkilidir. Yalnız iki basınç ve mesafeden gerçek rüzgâr hızını m/s olarak bulamazsın. Coriolis, sürtünme, yükseklik ve akışın zamanı gibi ek bilgiler gerekir; model bu nedenle sahte hız puanı üretmez.",
        ],
      },
      {
        title: "Sapma ile sürtünmeyi karıştırma",
        paragraphs: [
          "Dünya’nın dönmesi hareketli havanın izlediği yönü etkiler; Kuzey Yarım Küre’de hareket yönünün sağına, Güney Yarım Küre’de soluna Coriolis sapması vardır. Sağ–sol gözlemcinin ekrana bakışına değil, havanın hareket yönüne göredir. Ekvator’da bu etki zayıflar.",
          "Coriolis “yol uzadığı için havayı sürtünmeyle yavaşlatır” diye açıklanmaz. Yüzey sürtünmesi ise hava ile zemin/engellerin etkileşiminden kaynaklanır ve hız-yön dengesini değiştirir. Vadiler yönü kanalize edebilir. Sadece haritada bir eğri çizmek gerçek hız veya tam meteorolojik yörünge hesabı değildir.",
        ],
      },
      {
        title: "Küresel kuşaklardan sürekli rüzgârlara",
        paragraphs: [
          "İdeal genel dolaşım şemasında Ekvator çevresinde termik alçak, kutuplarda termik yüksek;30° çevresinde dinamik yüksek,60° çevresinde dinamik alçak kuşaklar gösterilir. Gerçek basınç dağılışı mevsim, kara-deniz ve yükseklikle değişir; kuşaklar sabit duvar değildir.",
          "Alizeler yaklaşık 30°’den Ekvator’a; batı rüzgârları 30°’den 60°’ye; kutup rüzgârları kutuplardan 60°’ye yönelen genel dolaşımla ilişkilidir. Sapma nedeniyle yatay yönler değişir. Bunlar gün içinde yön değiştiren kıyı meltemiyle aynı zaman ve alan ölçeğinde değildir.",
        ],
      },
      {
        title: "Muson ve meltem: benzer neden farklı ölçek",
        paragraphs: [
          "Kara ve denizin farklı ısınması basınç farklarını etkiler. Musonlar mevsimlik ve geniş ölçekli dolaşımla ilişkilidir; temel okul şemasında yazın denizden karaya, kışın karadan denize yön baskındır. Yer şekilleri ve bölgesel koşullar yağışın dağılışını değiştirir.",
          "Kıyı meltemi daha yerel ve günlük döngüdedir: gündüz kara daha çabuk ısınıp göreli alçak hâle geldiğinde yüzey akışı denizden karaya; gece kara daha çabuk soğuduğunda karadan denize yönelir. Vadi–dağ meltemlerinde de yamacın günlük enerji dengesi önemlidir; ölçek işaretini okuyarak ayır. Tipik yamaç döngüsünde gündüz ısınan yamaç boyunca vadiden yukarı yüzey akışı vadi meltemi; gece soğuyan yamaçtan vadiye aşağı akış dağ meltemidir. Büyük ölçekli rüzgâr bu yerel örüntüyü bastırabilir. Bayrağın uzandığı yön, havanın geldiği yönün tersidir; rüzgâr adı ile ok ucunu ayrı oku.",
        ],
      },
      {
        title: "Föhn: alçalırken sıkışma ve ısınma",
        paragraphs: [
          "Dağı aşan hava rüzgâraltı yamaçtan alçalırken daha yüksek basınç ortamına girip sıkışır ve adiyabatik olarak ısınır. Önceki yükselmede nem kaybetmiş olması sıcak-kuru etkiyi güçlendirebilir. Ana mekanizma yamaçla sürtünüp ateş gibi ısınmak değildir.",
          "Model yalnız kuru alçalan hava için açıkça verilen 100 m’de 1°C yaklaşımını kullanır. Tepede 5°C hava 1.000 m alçalırsa bu kabulle 15°C olur. Bu sayı bütün gerçek Föhn olaylarının değişmez sonucu değildir; başlangıç koşulları ve doygunluk süreci ayrıca önemlidir.",
        ],
      },
      {
        title: "Yerel adlar ve ölçüm",
        paragraphs: [
          "Sirokko ve Hamsin sıcak kaynak bölgeleriyle; Mistral, Bora ve Krivetz soğuk kaynak ve güzergâhlarla birlikte kaynakta anılır. Bir rüzgâr deniz üzerinden geçerken nem kazanabilir. Adın sıcak veya kuru diye ezberlenmesi bütün yol boyunca hiç değişmediğini kanıtlamaz.",
          "Rüzgâr yönü geldiği yönle adlandırılır. Rüzgâr gülü esme sıklığını, anemometre hızını; yön ölçümü ise yön gözlem araçlarını kullanır. Frekans gülündeki en uzun kol en sık gelen yönü gösterir, zorunlu olarak en yüksek anlık hızı değil. Tropikal siklon ile küçük ölçekli hortumu da yalnız güçlü dönme sözcüğünden aynı olay sayma.",
        ],
      },
    ],
    examples: [
      {
        title: "Gradyanı hesapla",
        prompt:
          "İki merkez 1.020 ve 1.000 hPa, araları 100 km. Gradyan büyüklüğü nedir?",
        strategy: "Basınç farkını mesafeye böl.",
        steps: [
          {
            label: "1. adım",
            explanation: "Fark 20 hPa’dır.",
          },
          {
            label: "2. adım",
            explanation: "20/100=0,2 hPa/km.",
          },
          {
            label: "3. adım",
            explanation: "Bu sonuç hız değil mesafe başına basınç farkıdır.",
          },
        ],
        answer: "0,2 hPa/km.",
        check: "Birim hPa/km, m/s değildir.",
        pitfall: "Hesaplanan oranı gerçek rüzgâr hızı diye yazmak.",
      },
      {
        title: "Göreli merkezi bul",
        prompt:
          "Merkez 1.000 hPa, çevresi 990 hPa. Referans 1.013 hPa’dan küçük diye merkez alçak mıdır?",
        strategy: "Çevre değerini esas al.",
        steps: [
          {
            label: "1. adım",
            explanation: "Merkez çevresinden 10 hPa yüksektir.",
          },
          {
            label: "2. adım",
            explanation: "Yüksek–alçak adı bu göreli farkla konur.",
          },
          {
            label: "3. adım",
            explanation:
              "Standart referansın altında olmak adı zorunlu değiştirmez.",
          },
        ],
        answer: "Çevresine göre yüksek basınç merkezidir.",
        check: "1.000>990 karşılaştırması belirleyicidir.",
        pitfall: "Her 1.013 altını alçak saymak.",
      },
      {
        title: "Kıyıdaki yön değişimi",
        prompt:
          "Sakin genel hava koşullarında gündüz kara denizden daha çabuk ısınıyor. Yüzey meltemi nereye yönelir?",
        strategy: "Göreli basıncı kur.",
        steps: [
          {
            label: "1. adım",
            explanation: "Isınan kara üzerinde göreli alçak basınç gelişir.",
          },
          {
            label: "2. adım",
            explanation: "Deniz yüzeyi görece yüksek kalır.",
          },
          {
            label: "3. adım",
            explanation: "Yüzey akışı denizden karaya yönelir.",
          },
        ],
        answer: "Deniz meltemi: denizden karaya.",
        check: "Gece koşulu değiştiğinde yön tersine dönebilir.",
        pitfall: "Gündüz ve geceyi karıştırmak.",
      },
      {
        title: "Kuru alçalma hesabı",
        prompt:
          "5°C kuru hava 1.000 m alçalıyor. Soruda 100 m’de 1°C ısınma kabul ediliyor. Son sıcaklık nedir?",
        strategy: "Alçalma miktarına ait artışı bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "1.000/100=10°C artış.",
          },
          {
            label: "2. adım",
            explanation: "5+10=15°C.",
          },
          {
            label: "3. adım",
            explanation: "Ana neden sıkışmaya bağlı adiyabatik ısınmadır.",
          },
        ],
        answer: "15°C; verilen kuru yaklaşım altında.",
        check: "Bu hesap bütün gerçek dağ olayları için tek değer değildir.",
        pitfall: "Föhn’ü zemine sürtünme ısısı diye açıklamak.",
      },
      {
        title: "Yamaçta gidiş ve dönüş",
        prompt:
          "Genel rüzgârın zayıf olduğu bir vadide gündüz yamaca tırmanan, gece vadiye inen yerel hava akımları nasıl adlandırılır?",
        strategy: "Zamanı ve eğim boyunca yönü birlikte kur.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Gündüz yamaç ısınır; yüzeye yakın hava vadi tarafından yukarı ilerler.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu vadi meltemidir; gece soğuyan yamaçtan aşağı hareket dağ meltemidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Güçlü genel dolaşım verilirse bu ideal örüntüyü tek başına kesin rota sayamayız.",
          },
        ],
        answer: "Gündüz vadi meltemi, gece dağ meltemi.",
        check:
          "Rüzgârı yalnız gidilen yer adıyla değil süreç ve günlük zamanla eşleştirdik.",
        pitfall: "Gündüzün yamaç yukarı yönünü geceye aynen taşımak.",
      },
    ],
    recall: [
      {
        prompt: "Göreli yüksek merkezi nasıl seçersin?",
        answer:
          "Merkezi aynı düzeydeki çevre basıncıyla karşılaştırırım; sabit 1.013 eşiğine göre adlandırmam.",
      },
      {
        prompt: "Gradyan hangi birimde hesaplanır?",
        answer:
          "Basınç/uzaklık, örneğin hPa/km; tek başına rüzgâr hızı değildir.",
      },
      {
        prompt: "Coriolis ve sürtünme aynı mı?",
        answer:
          "Hayır; dönmeye bağlı sapma ile yüzey etkileşimi farklı mekanizmalardır.",
      },
      {
        prompt: "Föhn’ün temel ısınma mekanizması nedir?",
        answer:
          "Alçalan havanın daha yüksek basınçta sıkışarak adiyabatik ısınması.",
      },
      {
        prompt:
          "İzobar sıkılığıyla gradyanı karşılaştırmadan neyi eşit tutarsın?",
        answer:
          "Harita ölçeğini ve çizgiler arasındaki basınç adımını; sonra gerçek uzaklığı karşılaştırırım.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Atmosfer ve İklim Elemanları, PDF s.14–16 (basılı s.13–15) temelinde özgün anlatım ve alıştırmalar. Göreli basınç, Coriolis ve Föhn mekanizması bilimsel olarak düzeltilmiştir; gradyan gerçek rüzgâr hızına dönüştürülmez. Aurelia 006 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
  {
    id: "nem-yagis",
    title: "Nem ve yağış: miktardan doyuma, yükselmeden yağışa",
    minutes: 55,
    objectives: [
      "Mutlak nem, karışım oranı ve bağıl nemin birimlerini ayır.",
      "Sabit hacim ve toplam su koşulunda doygunluk ve yoğuşan miktarı hesapla.",
      "Çiy, kırağı, kırç, sis ve yağış türlerini süreçleriyle ilişkilendir.",
      "Orografik, konveksiyonel ve cephe yükselmesini karşılaştır.",
    ],
    sections: [
      {
        title: "Görünmeyen buhar, görünen damlacık",
        paragraphs: [
          "Havadaki gaz hâlindeki suya su buharı denir; çıplak gözle görülen mavi bir duman değildir. Kaynağı su yüzeylerinden buharlaşma, bitkilerin terlemesi ve başka su alışverişleridir. Bulut ve sis ise çok küçük sıvı damlacıklar veya buz kristalleri içerebilir.",
          "Bir su birikintisinin kaynamadan da buharlaşabilmesi, buharlaşmayla kaynamanın aynı süreç olmadığını gösterir. Buharlaşma suyu gaz fazına taşır; suyu yok etmez. Hava hareketi, yüzey alanı, sıcaklık ve çevre nemi buharlaşmayı etkiler; yalnız sıcaklık tek başına yeterli değildir.",
        ],
      },
      {
        title: "Birim sana neyin oranlandığını söyler",
        paragraphs: [
          "Mutlak nem birim hacimdeki su buharı kütlesi olarak g/m³ ile verilebilir. Karışım oranı ise kuru hava kütlesine göre su buharı kütlesidir ve g/kg gibi birim kullanır. Hacim başına ve kütle başına oranları aynı nicelik diye kullanma.",
          "Sabit su miktarı bulunan bir hava parselinin hacmi değişirse g/m³ değeri değişebilir. Bu yüzden modelde hacim sabit tutulur. Soruda farklı hacimler verilirse önce toplam su kütlesini bul; ardından istenen hacme böl. g/m³ ile yüzde birbirinin yerine geçmez.",
        ],
      },
      {
        title: "Doyma miktarı ve bağıl nem",
        paragraphs: [
          "Verilen sıcaklıkta denge koşullarındaki doygun su buharı miktarı sıcaklık arttıkça yükselir. Okul hesabında bağıl nem, mevcut buharın aynı koşullardaki doyma miktarına oranının 100 katıdır.10 g/m³ mevcut ve 20 g/m³ doyma değeri için%50 bulunur.",
          "“Sıcak hava daha çok su üretti” çıkarımı yanlıştır. Isınma doygunluk eşiğini değiştirebilir, ortama kendiliğinden yeni su eklemez. Gerçek meteorolojide bağıl nem buhar basıncı üzerinden tanımlanır; hacim oranı hesabımız sabit hacim ve aynı koşulları kullanan öğretici modeldir.",
        ],
      },
      {
        title: "Soğuma ve yoğuşmayı miktarla izle",
        paragraphs: [
          "Sabit hacimli kapalı modelde toplam su 10 g/m³ ve başlangıç doyma değeri 20 g/m³ olsun: hepsi buhar, bağıl nem%50’dir. Doyma değeri 10’a düşerse%100’e ulaşılır.8’e düşerse denge modelinde 8 buhar ve 2 yoğuşmuş su bulunur.",
          "Yoğuşan suyu hesapladıktan sonra buharı hâlâ10 g/m³ sayıp bağıl nemi%125 diye sürdürme. Bu ders denge modelinde fazla suyun yoğunlaştığını kabul eder. Gerçek bulut oluşumundaki çekirdekler ve geçici aşırı doygunluklar bu basitleştirilmiş hesabın dışındadır; varsayım açıkça yazılır.",
        ],
      },
      {
        title: "Çiy noktası, sis ve yerdeki sıvı",
        paragraphs: [
          "Çiy noktası, belirli su buharı içeriğiyle soğuyan havanın doygunluğa ulaşmasına ilişkin sıcaklıktır. Modelin doyma miktarı sürgüsü sıcaklığın kendisi değildir; gerçek sıcaklığa geçmek için sıcaklık–doyma verisi gerekir. Bu nedenle 8 g/m³ eşiğini doğrudan 8°C diye etiketleme.",
          "Yere yakın havada asılı küçük damlacıkların görüşü azaltması sisle; soğuyan yüzeyde sıvı damlalarının oluşması çiyle ilişkilidir. Yüzeydeki çiy gökten düşen yağmurla aynı oluşum yolu değildir. Bir bölgede sis görülmesi o anda mutlaka yere yağmur yağdığı anlamına gelmez.",
        ],
      },
      {
        title: "Buz oluşumu ve düşen yağışlar",
        paragraphs: [
          "Kırağı su buharının soğuk yüzeyde doğrudan buza dönüşmesiyle; kırç ise çoğunlukla aşırı soğumuş damlacıkların yüzeyde donmasıyla ilişkilidir. Sıvıdan donma ile gazdan katıya geçişin yollarını ayır. Kar buz kristalleri içeren, dolu güçlü bulut içi hareketlerle büyüyen buz parçaları şeklindeki yağıştır.",
          "Yağmur sıvı damlalar hâlinde yere ulaşır; bulutta damla bulunması her zaman yağmurun yere ulaşacağını garanti etmez. Dolu boyutu için tek bir aralığı evrensel üst sınır sayma. Yağışın türü ve yere ulaşması bulut içi ve altındaki sıcaklık-düşey hareket koşullarına bağlıdır.",
        ],
      },
      {
        title: "Yükselme nedenlerini karşılaştır",
        paragraphs: [
          "Hava dağ yamacı boyunca zorlandığında orografik/yamaç; yüzeyin ısıtmasıyla yükseldiğinde konveksiyonel; farklı özellikteki hava kütlelerinin karşılaşmasında sıcak hava yükselmeye zorlandığında cephe yağışı mekanizması öne çıkar. Ortak basamak yükselme, genleşme ve soğumanın doygunluğu desteklemesidir.",
          "Her yükselmede kesin yağış denmez; yeterli su buharı, doygunluk ve damla/kristal gelişimi gerekir. Aynı yerde farklı zamanlarda farklı mekanizmalar baskın olabilir. “Dağ var” demek her yağışın yalnız yamaç yağışı olduğunu kanıtlamaz; sorunun verdiği hava hareketine bak. Dağı karşılayan rüzgârüstü yamaçta zorlanmış yükselme yağışı destekleyebilir; rüzgâraltında alçalan havanın ısınması bağıl nemi düşürüp yağış olasılığını azaltabilir. Yalnız mevcut nem veya bağıl nem tablosundan en çok buharlaşmanın nerede gerçekleştiği kesin bulunmaz; su kaynağı, enerji, hava hareketi ve zaman verisi de gerekir.",
        ],
      },
      {
        title: "Su bütçesini ve kanıtı birlikte denetle",
        paragraphs: [
          "Modelde buhar+yoğuşmuş su toplamı korunur. Doyma eşiğini artırmak, kapalı kapta damla varsa bunların bir bölümünün yeniden buharlaşmasına izin verir; toplam suyu artırmaz. Öğrenme için miktar çubuğunu ve sayısal açıklamayı birlikte izle, sonra tahminini gerekçelendir.",
          "Gerçek atmosfere geçerken açık sistem, hacim değişimi ve su giriş-çıkışı gibi varsayımlar değişir. Kapalı 1 m³ modelin sonucunu bütün kente otomatik yayma. Soruda verilen birim, hacim, su kaynağı ve denge kabulünü yazmak hem hesap hatalarını hem kesin yağış gibi aşırı yorumları önler.",
        ],
      },
    ],
    examples: [
      {
        title: "Yarı doygun durum",
        prompt:
          "Sabit 1 m³ kapta 10 g su buharı var; aynı koşullarda doyma miktarı 20 g. Bağıl nem kaçtır?",
        strategy: "Aynı koşullardaki miktarları oranla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Mevcut 10 g, doyma 20 g.",
          },
          {
            label: "2. adım",
            explanation: "10/20=0,5.",
          },
          {
            label: "3. adım",
            explanation: "0,5×100=%50.",
          },
        ],
        answer: "%50.",
        check: "Sonuç yüzde,10 g/m³ değeri ise kütle/hacimdir.",
        pitfall: "Mutlak miktarı yüzde sanmak.",
      },
      {
        title: "Soğuma sonrası toplam",
        prompt:
          "Sabit hacimde toplam 10 g/m³ su içeren kapalı denge modelinde doyma 8 g/m³’e düşüyor. Son buhar ve yoğuşan su nedir?",
        strategy: "Fazla miktarı ayrı hesaba al.",
        steps: [
          {
            label: "1. adım",
            explanation: "Denge buharı doyma eşiği olan 8 g/m³’ü aşmaz.",
          },
          {
            label: "2. adım",
            explanation: "Fazla 10−8=2 g/m³ yoğunlaşır.",
          },
          {
            label: "3. adım",
            explanation: "8+2=10 ile toplam korunur.",
          },
        ],
        answer: "8 g/m³ buhar,2 g/m³ yoğuşmuş su; bağıl nem%100.",
        check: "Denge modelinde%125 buhar oranı bırakmadık.",
        pitfall: "Yoğuşanı toplamdan çıkarıp suyu yok etmek.",
      },
      {
        title: "Hacim değişirse",
        prompt:
          "Toplam 12 g buhar önce 2 m³, sonra yoğuşma olmadan 3 m³ hacimde bulunuyor. Son mutlak nem nedir?",
        strategy: "Kütleyi yeni hacme böl.",
        steps: [
          {
            label: "1. adım",
            explanation: "Toplam buhar kütlesi 12 g olarak veriliyor.",
          },
          {
            label: "2. adım",
            explanation: "Son hacim 3 m³.",
          },
          {
            label: "3. adım",
            explanation: "12/3=4 g/m³.",
          },
        ],
        answer: "4 g/m³.",
        check: "İlk değer 12/2=6 g/m³; kütle aynıyken hacim oranı değişti.",
        pitfall: "Hacim başına oranı toplam kütle gibi sabit tutmak.",
      },
      {
        title: "Hangi yükselme?",
        prompt:
          "Denizden gelen nemli hava kıyıya paralel dağı aşmak için yükseliyor ve doygunluğa ulaşıyor. Baskın mekanizma nedir?",
        strategy: "Havanın neden yükseldiğini bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "Hareket önünde dağ engeli vardır.",
          },
          {
            label: "2. adım",
            explanation: "Hava yamaç boyunca zorlanır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu orografik yükselme ve uygun koşulda yamaç yağışıdır.",
          },
        ],
        answer: "Orografik/yamaç mekanizması.",
        check:
          "Sadece yerin adı değil verilen yükselme nedeni belirleyici oldu.",
        pitfall: "Her nemli havaya aynı yağış adını vermek.",
      },
    ],
    recall: [
      {
        prompt: "Mutlak nem ile karışım oranını hangi birimler ayırır?",
        answer: "g/m³ hacim başına; g/kg kütle başına oranı belirtir.",
      },
      {
        prompt: "Isıtmak su miktarını kendiliğinden artırır mı?",
        answer: "Hayır; doyma eşiğini değiştirebilir, su girişi ayrı süreçtir.",
      },
      {
        prompt: "Dengede fazla su yoğunlaşınca bağıl nem ne olur?",
        answer:
          "Buhar doyma eşiğinde kalırsa%100 olur; toplam su buhar+yoğuşmuş olarak korunur.",
      },
      {
        prompt: "Üç yağış mekanizmasını ne ayırır?",
        answer:
          "Havanın dağla zorlanması, yüzey ısınması veya hava kütlelerinin karşılaşmasıyla yükselmesi.",
      },
    ],
    source:
      "OGM 9. Sınıf Dersler Cepte — Atmosfer ve İklim Elemanları, PDF s.13–17; özellikle PDF 17 (basılı 16) temelinde özgün anlatım ve alıştırmalar. g/m³ ile g/kg ayrılmış; model sabit hacimli kapalı denge kabulünü açıkça kullanır. Aurelia 007 TYT Coğrafya kopya kâğıdı, PDF s.1–7 ile 15 Kasım 2026 tarihinde içerik karşılaştırması yapıldı. Bu karşılaştırma kâğıttaki ÖSYM açıklamalarının resmî kitapçıklardan bağımsız doğrulandığı iddiası değildir.",
  },
];

const banks: Record<string, Question[]> = {
  "doga-insan-cografya": [
    {
      id: "f014-doga-insan-cografya-q1",
      prompt: {
        tr: "Bir araştırma akarsuyun aylık debi değişimini açıklamayı amaçlıyor. Öncelikli coğrafya alt dalı hangisidir?",
      },
      options: [
        {
          tr: "Hidrografya",
        },
        {
          tr: "Siyasi coğrafya",
        },
        {
          tr: "Nüfus coğrafyası",
        },
        {
          tr: "Yerleşme coğrafyası",
        },
        {
          tr: "Tarihî coğrafya",
        },
      ],
      answer: 0,
      hint: {
        tr: "Ölçülen değişken suyun akımıdır.",
      },
      explanation: {
        tr: "Aylık debi hidrosferdeki akarsu sisteminin özelliğidir; bu soru için hidrografya önceliklidir. Araştırmada insan etkisi bulunması su değişkeninin niteliğini değiştirmez.",
      },
      skill: "Araştırma sorusu ve alt dal",
    },
    {
      id: "f014-doga-insan-cografya-q2",
      prompt: {
        tr: "Bir ekip göç edenlerin yaş gruplarını ve varış yerlerini inceliyor. Öncelikli alan hangisidir?",
      },
      options: [
        {
          tr: "Jeomorfoloji",
        },
        {
          tr: "Nüfus coğrafyası",
        },
        {
          tr: "Klimatoloji",
        },
        {
          tr: "Kartografya",
        },
        {
          tr: "Hidrografya",
        },
      ],
      answer: 1,
      hint: {
        tr: "Yer değiştirenlerin sayısı ve yapısı inceleniyor.",
      },
      explanation: {
        tr: "Göçün yapısı ve mekânsal dağılışı nüfus coğrafyasının sorusudur. Sonucun haritaya işlenmesi araştırmayı yalnız harita üretimi konusuna dönüştürmez.",
      },
      skill: "Nüfus araştırması",
    },
    {
      id: "f014-doga-insan-cografya-q3",
      prompt: {
        tr: "Yoğun yağıştan sonra yamacın toprağı akışla taşınıyor. Atmosferden gelen başlangıç girdisi hangisidir?",
      },
      options: [
        {
          tr: "Kayaç türü",
        },
        {
          tr: "Yerleşme planı",
        },
        {
          tr: "Yağış",
        },
        {
          tr: "Nüfus hareketi",
        },
        {
          tr: "Maden çıkarımı",
        },
      ],
      answer: 2,
      hint: {
        tr: "Olayda dışarıdan su sağlayan süreci bul.",
      },
      explanation: {
        tr: "Yağış atmosferik girdidir. Ardından yüzey akışı ve toprağın taşınması hidrosfer ile litosfer arasında etkileşim oluşturur; bütün olay yalnız atmosferde gerçekleşmez.",
      },
      skill: "Doğal ortam etkileşimi",
    },
    {
      id: "f014-doga-insan-cografya-q4",
      prompt: {
        tr: "Dağlık bir yerde tünel açılması için en savunulabilir yorum hangisidir?",
      },
      options: [
        {
          tr: "Bütün doğal riskler biter.",
        },
        {
          tr: "Yer şekilleri artık yoktur.",
        },
        {
          tr: "Bütün yörelerin ekonomisi eşitlenir.",
        },
        {
          tr: "Belirli bir ulaşım engeli azaltılabilir.",
        },
        {
          tr: "İklim koşulları tamamen aynı olur.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Müdahalenin etkisini kendi kapsamıyla sınırla.",
      },
      explanation: {
        tr: "Tünel belirli güzergâhtaki topografik engeli azaltabilir. İklimi, bütün riskleri veya tüm ekonomik farkları ortadan kaldırdığı bilgisi verilmemiştir.",
      },
      skill: "Neden sonuç sınırı",
    },
    {
      id: "f014-doga-insan-cografya-q5",
      prompt: {
        tr: "Baraj gölü çevresinde tarımsal ürün deseninin değişimi araştırılıyor. Öncelikli beşerî alan hangisidir?",
      },
      options: [
        {
          tr: "Klimatoloji",
        },
        {
          tr: "Jeomorfoloji",
        },
        {
          tr: "Biyocoğrafya",
        },
        {
          tr: "Kartografya",
        },
        {
          tr: "Ekonomik coğrafya",
        },
      ],
      answer: 4,
      hint: {
        tr: "Soru doğal bitki dağılışı değil üretim faaliyetidir.",
      },
      explanation: {
        tr: "Tarımsal üretimin mekânsal değişimi ekonomik coğrafya konusudur. Su ve iklim destek açıklamalar sağlayabilir; araştırılan sonuç ürün desenidir.",
      },
      skill: "Ekonomik coğrafya",
    },
    {
      id: "f014-doga-insan-cografya-q6",
      prompt: {
        tr: "Nüfus dağılışını inceleyen araştırmacı yaş grubu sayımları ve istatistik kullanıyor. Hangi destek bilimi en doğrudan ilişkilidir?",
      },
      options: [
        {
          tr: "Demografi",
        },
        {
          tr: "Petrografi",
        },
        {
          tr: "Litoloji",
        },
        {
          tr: "Oseanografya",
        },
        {
          tr: "Astronomi",
        },
      ],
      answer: 0,
      hint: {
        tr: "Nüfusun yapısını sayısal inceleyen bilimden yararlanılır.",
      },
      explanation: {
        tr: "Demografi nüfusun sayısal özellikleri ve değişimleriyle ilgilenir. Bu veriler coğrafyada mekânsal dağılış sorusuyla birlikte yorumlanır.",
      },
      skill: "Destek bilimleri",
    },
    {
      id: "f014-doga-insan-cografya-q7",
      prompt: {
        tr: "A köyünden B kasabasına 150 kişi taşınıyor. İkisi aynı havzada ve başka değişim yok. Havza için doğru sonuç hangisidir?",
      },
      options: [
        {
          tr: "Toplam nüfus 150 azalır.",
        },
        {
          tr: "Toplam nüfus değişmez; dağılış değişir.",
        },
        {
          tr: "Toplam nüfus 300 artar.",
        },
        {
          tr: "Yer şekilleri eşitlenir.",
        },
        {
          tr: "Göç yaşanmamıştır.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Sistem içi hareketin çıkışını ve girişini birlikte say.",
      },
      explanation: {
        tr: "A’daki −150 ile B’deki +150 havza toplamında sıfırlanır. Yerleşmelerin payları değiştiği için dağılış değişir; toplam ve dağılış aynı kavram değildir.",
      },
      skill: "Ölçek ve toplam",
    },
    {
      id: "f014-doga-insan-cografya-q8",
      prompt: {
        tr: "Bir vadide aşınma sonucu oluşan yamaç biçimleri araştırılıyor. Öncelikli alan hangisidir?",
      },
      options: [
        {
          tr: "Nüfus coğrafyası",
        },
        {
          tr: "Siyasi coğrafya",
        },
        {
          tr: "Jeomorfoloji",
        },
        {
          tr: "Ekonomik coğrafya",
        },
        {
          tr: "Tarihî coğrafya",
        },
      ],
      answer: 2,
      hint: {
        tr: "Yer şeklinin oluşum süreci soruluyor.",
      },
      explanation: {
        tr: "Yamaçların biçimi ve aşınmayla gelişimi jeomorfolojiye girer. Vadide su bulunması, yer şekli sorusunu doğrudan yalnız hidrografya yapmaz.",
      },
      skill: "Yer şekilleri",
    },
    {
      id: "f014-doga-insan-cografya-q9",
      prompt: {
        tr: "Bir araştırma geçmişteki bir liman yerleşmesinin o dönemin kıyı çizgisiyle ilişkisini inceliyor. En uygun alan hangisidir?",
      },
      options: [
        {
          tr: "Yalnız kimya",
        },
        {
          tr: "Yalnız meteoroloji",
        },
        {
          tr: "Güncel seçim istatistiği",
        },
        {
          tr: "Tarihî coğrafya",
        },
        {
          tr: "Yalnız gök mekaniği",
        },
      ],
      answer: 3,
      hint: {
        tr: "Geçmişteki coğrafi ortam ilişkisi araştırılıyor.",
      },
      explanation: {
        tr: "Tarihî coğrafya geçmişin mekânsal ve çevresel ilişkilerini coğrafi yöntemlerle inceler; tarih ve arkeoloji bu araştırmayı destekleyebilir.",
      },
      skill: "Geçmiş mekân araştırması",
    },
    {
      id: "f014-doga-insan-cografya-q10",
      prompt: {
        tr: "“Aynı iklimde yaşayan bütün toplulukların beslenmesi zorunlu olarak aynıdır.” yargısının temel sorunu nedir?",
      },
      options: [
        {
          tr: "Doğal etkiyi hiç önemsememesi",
        },
        {
          tr: "Yer şekillerini ölçmesi",
        },
        {
          tr: "Bir ölçek kullanması",
        },
        {
          tr: "Doğal ve beşerî etkileşimi kabul etmesi",
        },
        {
          tr: "Kültür, ekonomi ve teknik gibi diğer etkenleri dışlayan kesin genelleme yapması",
        },
      ],
      answer: 4,
      hint: {
        tr: "İklim etkisi tek zorunlu sonuç anlamına gelmez.",
      },
      explanation: {
        tr: "Doğa imkân ve sınırlamalar sunar; kültür, erişim, teknoloji ve tercihler de beslenmeyi etkiler. Aynı iklimden her toplum için zorunlu özdeş sonuç çıkarılamaz.",
      },
      skill: "Genelleme denetimi",
    },
  ],
  "cografyanin-tarihi-gelisimi": [
    {
      id: "f014-cografyanin-tarihi-gelisimi-q1",
      prompt: {
        tr: "Coğrafya adındaki geo ve graphein kökleri hangi dil geleneğiyle ilişkilidir?",
      },
      options: [
        {
          tr: "Yunanca",
        },
        {
          tr: "Çince",
        },
        {
          tr: "Arapça",
        },
        {
          tr: "Farsça",
        },
        {
          tr: "Türkçe",
        },
      ],
      answer: 0,
      hint: {
        tr: "Yer ve betimleme anlamlarını taşıyan köklere bak.",
      },
      explanation: {
        tr: "Adlandırma Yunanca köklerle ilişkilidir. Kaynak özette geçen Latince ifadesi düzeltilmiştir; bu etimoloji bütün coğrafi bilginin tek toplumda üretildiği anlamına gelmez.",
      },
      skill: "Kavram kökeni",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q2",
      prompt: {
        tr: "OGM dönem çerçevesinde İdrisi hangi grupta yer alır?",
      },
      options: [
        {
          tr: "Yakın Çağ",
        },
        {
          tr: "Orta Çağ",
        },
        {
          tr: "Yalnız günümüz",
        },
        {
          tr: "İlk Çağ",
        },
        {
          tr: "Sanayi sonrası 21. yüzyıl",
        },
      ],
      answer: 1,
      hint: {
        tr: "İslam coğrafyacılarıyla verilen dönem listesini hatırla.",
      },
      explanation: {
        tr: "İdrisi kaynakta Orta Çağ listesinde yer alır. Bu eşleştirme onun bütün eserlerinin tarihini ayrıca kanıtlamaz.",
      },
      skill: "Dönem eşleştirme",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q3",
      prompt: {
        tr: "OGM dönem çerçevesinde Pirî Reis hangi gruptadır?",
      },
      options: [
        {
          tr: "İlk Çağ",
        },
        {
          tr: "Orta Çağ",
        },
        {
          tr: "Yeni Çağ",
        },
        {
          tr: "Yalnız günümüz",
        },
        {
          tr: "Tarih öncesi",
        },
      ],
      answer: 2,
      hint: {
        tr: "Osmanlı denizcilik ve haritalama birikiminin verildiği gruba bak.",
      },
      explanation: {
        tr: "Pirî Reis Yeni Çağ bölümünde anılır. Aynı yöntemin başka çağlarda kullanılabilmesi bu dönem bilgisini değiştirmez.",
      },
      skill: "Dönem eşleştirme",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q4",
      prompt: {
        tr: "Humboldt, Ritter ve Ratzel kaynakta hangi gelişim çerçevesiyle birlikte anılır?",
      },
      options: [
        {
          tr: "Yalnız tarih öncesi avcılık",
        },
        {
          tr: "İlk Çağ listesi",
        },
        {
          tr: "Yalnız deniz yolculuğu",
        },
        {
          tr: "Yakın Çağda modern coğrafi yaklaşım",
        },
        {
          tr: "Coğrafi bilginin tamamen ortadan kalkması",
        },
      ],
      answer: 3,
      hint: {
        tr: "19. yüzyıl ve modern coğrafya bağlantısını düşün.",
      },
      explanation: {
        tr: "Bu üç isim kaynakta Yakın Çağ ve modern coğrafyanın temelleriyle ilişkilendirilir. Dönem etiketi, bütün görüşlerinin aynı olduğu anlamına gelmez.",
      },
      skill: "Modern coğrafya",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q5",
      prompt: {
        tr: "Bir seyahat kaydı bir kasabanın 1650’deki yollarını betimliyor. Tek başına hangi iddiayı desteklemez?",
      },
      options: [
        {
          tr: "Belirli bir döneme ait gözlem içerdiğini",
        },
        {
          tr: "Yerel coğrafi bilgi sağlayabileceğini",
        },
        {
          tr: "Başka kaynaklarla karşılaştırılabileceğini",
        },
        {
          tr: "Gözlemcinin bakışını taşıyabileceğini",
        },
        {
          tr: "Bütün dünyanın bugünkü ulaşım hacmini verdiğini",
        },
      ],
      answer: 4,
      hint: {
        tr: "Yer ve zaman kapsamını koru.",
      },
      explanation: {
        tr: "Tek kasaba ve geçmiş tarihe ilişkin nitel betimleme, bugünkü bütün dünya ulaşım hacminin ölçümü değildir. Kaydı yerel kanıt olarak kullanmak ise mümkündür.",
      },
      skill: "Kanıt kapsamı",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q6",
      prompt: {
        tr: "Dört dönemi eşit genişlikte kutularla gösteren, sayısal tarih ölçeği olmayan bir şeritten hangi sonuç çıkarılabilir?",
      },
      options: [
        {
          tr: "Dönemlerin gösterilen sırası",
        },
        {
          tr: "Dört dönemin sürelerinin eşitliği",
        },
        {
          tr: "Her kişinin aynı yıl yaşadığı",
        },
        {
          tr: "Gözlemin yalnız tek dönemde yapıldığı",
        },
        {
          tr: "Her çağın bilgisinin tamamen silindiği",
        },
      ],
      answer: 0,
      hint: {
        tr: "Şekilde süre ölçeği verilmedi.",
      },
      explanation: {
        tr: "Bu şerit sıralama gösterir. Eşit kutu genişliği, sayısal zaman ölçeği bulunmadığında eşit tarihsel süre anlamına gelmez.",
      },
      skill: "Şerit okuma",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q7",
      prompt: {
        tr: "“Orta Çağda dünyanın hiçbir yerinde coğrafi bilgi üretilmedi.” yargısına en uygun eleştiri hangisidir?",
      },
      options: [
        {
          tr: "Bütün dönemler aynı uzunluktadır.",
        },
        {
          tr: "Bir dönemi ve farklı toplumları kanıtsız biçimde tümüyle geneller.",
        },
        {
          tr: "Hiç kaynak karşılaştırması gerekmez.",
        },
        {
          tr: "Haritalar sadece günümüzde vardır.",
        },
        {
          tr: "Yalnız yer adları bilimdir.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Listelenen farklı bölge ve bilim insanlarını düşün.",
      },
      explanation: {
        tr: "Kaynak bu dönemde çeşitli coğrafyacıları da sıralar. Bazı kurumlardaki sınırlamalardan bütün dünyada sıfır bilgi üretimi sonucu çıkarılamaz.",
      },
      skill: "Tarihsel genelleme",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q8",
      prompt: {
        tr: "Bir haritanın sayısal ortamda üretilmesi aşağıdakilerden hangisini tek başına garanti etmez?",
      },
      options: [
        {
          tr: "Katman kullanılabileceğini",
        },
        {
          tr: "Ekranda gösterilebileceğini",
        },
        {
          tr: "Verilerin güncel ve doğru olduğunu",
        },
        {
          tr: "Farklı verilerin karşılaştırılabileceğini",
        },
        {
          tr: "Bir çizim dosyası bulunabileceğini",
        },
      ],
      answer: 2,
      hint: {
        tr: "Araç ile verinin niteliği aynı değildir.",
      },
      explanation: {
        tr: "Sayısal araç hatalı, eski veya eksik veriyi de işleyebilir. Doğruluk için kaynak, zaman ve ölçüm denetimi ayrıca yapılmalıdır.",
      },
      skill: "Araç ve doğruluk",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q9",
      prompt: {
        tr: "Kaynak yalnız bir kişinin belirli dönemde yer aldığını söylüyor. Buradan hangi ek bilgi doğrudan türetilemez?",
      },
      options: [
        {
          tr: "Kaynakta adının geçtiği",
        },
        {
          tr: "Verilen dönem grubu",
        },
        {
          tr: "Başka bilgi gerektiren ayrıntılar bulunduğu",
        },
        {
          tr: "Yazdığı bütün eserlerin kesin tarihleri",
        },
        {
          tr: "Dönem listesinde karşılaştırılabileceği",
        },
      ],
      answer: 3,
      hint: {
        tr: "Verilmeyen ayrıntıyı isim bilgisinden üretme.",
      },
      explanation: {
        tr: "Bir dönem listesi bütün eser ve tarihleri içermez. Bu ayrıntılar ancak ek, doğrulanmış kaynakla sorulabilir.",
      },
      skill: "Eksik veri denetimi",
    },
    {
      id: "f014-cografyanin-tarihi-gelisimi-q10",
      prompt: {
        tr: "1980 nüfusu ile bugünkü yollar aynı analizde kullanılarak bugünkü erişim açıklanıyor. Öncelikle ne denetlenmelidir?",
      },
      options: [
        {
          tr: "Harita renginin beğenilmesi",
        },
        {
          tr: "Her yolun antik olması",
        },
        {
          tr: "Dört çağın eşitliği",
        },
        {
          tr: "Bütün insanların aynı yerde yaşaması",
        },
        {
          tr: "Veri katmanlarının tarih ve temsil uyumu",
        },
      ],
      answer: 4,
      hint: {
        tr: "Aynı ekrandaki katmanlar aynı yılı temsil etmeyebilir.",
      },
      explanation: {
        tr: "Yollar güncelken nüfus dağılışı eski olabilir. Bugünkü erişim yorumu için tarih, ölçek ve temsil uyumu kontrol edilmelidir.",
      },
      skill: "Mekânsal veri niteliği",
    },
  ],
  "yerel-saat": [
    {
      id: "f014-yerel-saat-q1",
      prompt: {
        tr: "Okul yerel güneş saati modelinde 1° boylam farkı kaç dakikaya karşılık gelir?",
      },
      options: [
        {
          tr: "4",
        },
        {
          tr: "15",
        },
        {
          tr: "24",
        },
        {
          tr: "60",
        },
        {
          tr: "360",
        },
      ],
      answer: 0,
      hint: {
        tr: "1.440 dakikayı 360 dereceye böl.",
      },
      explanation: {
        tr: "24 saat=1.440 dakika; 1.440/360=4 dakika/derece. Derece birimi sadeleşir ve sonuç dakika olur.",
      },
      skill: "Boylam zaman dönüşümü",
    },
    {
      id: "f014-yerel-saat-q2",
      prompt: {
        tr: "30°D’de yerel saat 12.00 iken 45°D’de aynı anda kaçtır?",
      },
      options: [
        {
          tr: "11.00",
        },
        {
          tr: "13.00",
        },
        {
          tr: "12.15",
        },
        {
          tr: "16.00",
        },
        {
          tr: "12.04",
        },
      ],
      answer: 1,
      hint: {
        tr: "Hedef 15° daha doğudadır.",
      },
      explanation: {
        tr: "45−30=15°; 15×4=60 dakika ileri. Sonuç aynı gün 13.00’dür.",
      },
      skill: "Doğuya saat hesabı",
    },
    {
      id: "f014-yerel-saat-q3",
      prompt: {
        tr: "30°D’de 10 Mayıs 00.20 iken 30°B’de aynı anda yerel saat nedir?",
      },
      options: [
        {
          tr: "10 Mayıs 04.20",
        },
        {
          tr: "10 Mayıs 20.20",
        },
        {
          tr: "9 Mayıs 20.20",
        },
        {
          tr: "9 Mayıs 23.20",
        },
        {
          tr: "11 Mayıs 00.20",
        },
      ],
      answer: 2,
      hint: {
        tr: "60 derece batıya gitmek 4 saat geri demektir.",
      },
      explanation: {
        tr: "Hedef −30°, başlangıç +30°: fark−60° ve−240 dakika. 00.20’den dört saat geri, önceki gün 20.20’dir.",
      },
      skill: "Gün taşması",
    },
    {
      id: "f014-yerel-saat-q4",
      prompt: {
        tr: "20°D’de yerel saat 10.00, hedefte aynı gün 11.20. Hedef boylamı hangisidir?",
      },
      options: [
        {
          tr: "20°B",
        },
        {
          tr: "0°",
        },
        {
          tr: "60°D",
        },
        {
          tr: "40°D",
        },
        {
          tr: "80°D",
        },
      ],
      answer: 3,
      hint: {
        tr: "80 dakika kaç derece eder?",
      },
      explanation: {
        tr: "80/4=20° fark vardır. Hedefin saati ileri olduğundan doğudadır; 20°D+20°=40°D.",
      },
      skill: "Ters saat hesabı",
    },
    {
      id: "f014-yerel-saat-q5",
      prompt: {
        tr: "Aynı meridyen üzerinde farklı enlemlerdeki iki yer için okul modelinde hangisi zorunlu eşittir?",
      },
      options: [
        {
          tr: "İklim",
        },
        {
          tr: "Gündüz süresi",
        },
        {
          tr: "Güneş yüksekliği",
        },
        {
          tr: "Yer yüzeyi sıcaklığı",
        },
        {
          tr: "Yerel güneş saati",
        },
      ],
      answer: 4,
      hint: {
        tr: "Boylam ile enlemin etkilerini ayır.",
      },
      explanation: {
        tr: "Aynı boylam aynı yerel güneş saati fazını verir. Gündüz süresi, Güneş açısı ve iklim enlemle ve başka koşullarla değişebilir.",
      },
      skill: "Aynı meridyen",
    },
    {
      id: "f014-yerel-saat-q6",
      prompt: {
        tr: "30°D meridyeninin antimeridyeni hangisidir?",
      },
      options: [
        {
          tr: "150°B",
        },
        {
          tr: "150°D",
        },
        {
          tr: "30°B",
        },
        {
          tr: "60°D",
        },
        {
          tr: "0°",
        },
      ],
      answer: 0,
      hint: {
        tr: "Karşı yarımküreye geç ve toplamı 180° yap.",
      },
      explanation: {
        tr: "30°D ile 150°B bir çemberin karşı meridyenleridir; 30+150=180°. 30°B ise yalnız simetrik boylamdır, karşı meridyen değildir.",
      },
      skill: "Antimeridyen",
    },
    {
      id: "f014-yerel-saat-q7",
      prompt: {
        tr: "180°D ve 180°B gösterimleri hakkında doğru yorum hangisidir?",
      },
      options: [
        {
          tr: "İki farklı fiziksel meridyendir.",
        },
        {
          tr: "Aynı meridyenin iki yazımıdır.",
        },
        {
          tr: "Birinin enlemi sıfırdır.",
        },
        {
          tr: "Aralarında zorunlu 360° uzaklık vardır.",
        },
        {
          tr: "Bütün ülkeler burada aynı takvim gününü kullanır.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Dünya üzerindeki çizgiyi, sayı gösteriminden ayır.",
      },
      explanation: {
        tr: "Bu iki ad aynı meridyeni ifade eder. Sivil tarih farklılığı için çizginin tarafları ve zaman düzeni bilinmelidir; yalnız adlar fiziksel fark üretmez.",
      },
      skill: "Konum ve takvim",
    },
    {
      id: "f014-yerel-saat-q8",
      prompt: {
        tr: "Bir soru Türkiye’de UTC+3 ortak saatiyle 30°D’nin ideal yerel güneş saatini karşılaştırıyor. UTC+3 merkez boylamı karşılığı 45°D alınırsa ortak saat yerel saatten nasıldır?",
      },
      options: [
        {
          tr: "2 saat geridir.",
        },
        {
          tr: "Eşittir.",
        },
        {
          tr: "1 saat ileridir.",
        },
        {
          tr: "4 dakika ileridir.",
        },
        {
          tr: "15 saat geridir.",
        },
      ],
      answer: 2,
      hint: {
        tr: "45°D,30°D’den 15° doğudadır.",
      },
      explanation: {
        tr: "15×4=60 dakika. Verilen ideal merkez boylamına göre ortak saat 30°D yerel saatinden bir saat ileridir. Gerçek güneş hareketinin küçük astronomik düzeltmeleri bu okul hesabının dışındadır.",
      },
      skill: "Ortak ve yerel saat",
    },
    {
      id: "f014-yerel-saat-q9",
      prompt: {
        tr: "Tarih değiştirme çizgisi hakkında doğru ifade hangisidir?",
      },
      options: [
        {
          tr: "Her yerde tam 180°’yi izlemek zorundadır.",
        },
        {
          tr: "Boylamdan bütün ülkelerin sivil tarihi kesin bulunur.",
        },
        {
          tr: "Çizgi Güneş’i aniden bir gün ileri götürür.",
        },
        {
          tr: "Yaklaşık 180° çevresindedir; sivil takvim düzeni nedeniyle sapmalar gösterir.",
        },
        {
          tr: "Enlem çizgisidir.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Fiziksel dönme ile takvim uzlaşmasını ayır.",
      },
      explanation: {
        tr: "Çizgi yaklaşık 180° yakınında sivil tarih düzenini ayırır ve siyasi/yerleşim nedenleriyle sapar. Sivil tarihi hesaplamak için uygun takvim ve saat dilimi bağlamı gerekir.",
      },
      skill: "Tarih çizgisi",
    },
    {
      id: "f014-yerel-saat-q10",
      prompt: {
        tr: "10°B’de 23.40 iken 10°D’de aynı anda yerel saat hangisidir?",
      },
      options: [
        {
          tr: "Aynı gün 22.20",
        },
        {
          tr: "Aynı gün 23.20",
        },
        {
          tr: "Önceki gün 01.00",
        },
        {
          tr: "Ertesi gün 00.20",
        },
        {
          tr: "Ertesi gün 01.00",
        },
      ],
      answer: 4,
      hint: {
        tr: "20 derece doğuya gitmek 80 dakika ileri demektir.",
      },
      explanation: {
        tr: "10−(−10)=20°; 20×4=80 dakika. 23.40+1 saat 20 dakika=ertesi gün 01.00.",
      },
      skill: "Gece yarısı doğuya",
    },
  ],
  "atmosfer-katmanlari": [
    {
      id: "f014-atmosfer-katmanlari-q1",
      prompt: {
        tr: "Kuru hava için yuvarlatılmış okul oranlarında en büyük pay hangi gazındır?",
      },
      options: [
        {
          tr: "Azot",
        },
        {
          tr: "Oksijen",
        },
        {
          tr: "Karbondioksit",
        },
        {
          tr: "Su buharı",
        },
        {
          tr: "Hidrojen",
        },
      ],
      answer: 0,
      hint: {
        tr: "Yaklaşık %78 payı düşün.",
      },
      explanation: {
        tr: "Kuru havada azot yaklaşık %78 ile en büyük paydadır. Bu değer değişken su buharını ayrıca içeren toplam karışım yüzdesiyle karıştırılmamalıdır.",
      },
      skill: "Atmosfer bileşimi",
    },
    {
      id: "f014-atmosfer-katmanlari-q2",
      prompt: {
        tr: "Toplam karışımın hacimce %2’si su buharı, kalan kuru havanın hacimce %78’i azottur. Toplamda yaklaşık azot yüzdesi kaçtır?",
      },
      options: [
        {
          tr: "%80",
        },
        {
          tr: "%76,44",
        },
        {
          tr: "%78",
        },
        {
          tr: "%98",
        },
        {
          tr: "%2",
        },
      ],
      answer: 1,
      hint: {
        tr: "Azot oranını %98 kuru hava payına uygula.",
      },
      explanation: {
        tr: "0,98×0,78=0,7644; yaklaşık %76,44. Kuru hava oranına su yüzdesi doğrudan eklenmez.",
      },
      skill: "Bileşim paydası",
    },
    {
      id: "f014-atmosfer-katmanlari-q3",
      prompt: {
        tr: "13–50 km arası stratosfer kabul edilen yaklaşık modelde 30 km hangi katmandadır?",
      },
      options: [
        {
          tr: "Troposfer",
        },
        {
          tr: "Mezosfer",
        },
        {
          tr: "Stratosfer",
        },
        {
          tr: "Ekzosfer",
        },
        {
          tr: "Katı yer kabuğu",
        },
      ],
      answer: 2,
      hint: {
        tr: "Verilen iki sınır arasında kalan yüksekliği seç.",
      },
      explanation: {
        tr: "30 km 13’ten büyük 50’den küçüktür; verilen şemada stratosferdir. Bu sınırlar bütün Dünya için değişmez ölçüler değildir.",
      },
      skill: "Katman şeması",
    },
    {
      id: "f014-atmosfer-katmanlari-q4",
      prompt: {
        tr: "Hava olaylarının büyük bölümünün gerçekleştiği en alt katman hangisidir?",
      },
      options: [
        {
          tr: "Ekzosfer",
        },
        {
          tr: "Mezosfer",
        },
        {
          tr: "Termosfer",
        },
        {
          tr: "Troposfer",
        },
        {
          tr: "Stratosfer",
        },
      ],
      answer: 3,
      hint: {
        tr: "Yüzey ve su buharıyla en yoğun etkileşen alt katmanı düşün.",
      },
      explanation: {
        tr: "Troposfer atmosferin en alt katmanıdır; hava kütlesi ve su buharının önemli bölümü buradadır. “Büyük bölüm” ifadesi bütün süreçleri tek kesin sınıra kapatmaz.",
      },
      skill: "Troposfer işlevi",
    },
    {
      id: "f014-atmosfer-katmanlari-q5",
      prompt: {
        tr: "Ozonun önemli bölümünün bulunduğu stratosferde temel koruyucu süreç hangisidir?",
      },
      options: [
        {
          tr: "Güneş’in bütün ışığını durdurmak",
        },
        {
          tr: "Yeryüzünün çekimini kaldırmak",
        },
        {
          tr: "Bütün gazları oksijene çevirmek",
        },
        {
          tr: "Sesin uzayda yayılmasını sağlamak",
        },
        {
          tr: "Morötesi ışınımın önemli bölümünü soğurmak",
        },
      ],
      answer: 4,
      hint: {
        tr: "Morötesi ışınım ile uzun dalga sera sürecini ayır.",
      },
      explanation: {
        tr: "Stratosferik ozon zararlı morötesi ışınımın önemli bölümünü soğurur. Bütün ışığı engellemez; bu işlev sera gazlarının uzun dalga etkileşimiyle aynı süreç değildir.",
      },
      skill: "Ozon ve ışınım",
    },
    {
      id: "f014-atmosfer-katmanlari-q6",
      prompt: {
        tr: "İyonosfer hakkında doğru yorum hangisidir?",
      },
      options: [
        {
          tr: "Elektriksel özelliklere göre tanımlanır ve sıcaklık katmanlarıyla örtüşebilir.",
        },
        {
          tr: "Zorunlu olarak tek bir saf azot katmanıdır.",
        },
        {
          tr: "Yalnız troposferin diğer adıdır.",
        },
        {
          tr: "Beş sıcaklık katmanını tamamen ortadan kaldırır.",
        },
        {
          tr: "Yer kabuğunun katı bölümüdür.",
        },
      ],
      answer: 0,
      hint: {
        tr: "Sınıflandırma ölçütlerini karşılaştır.",
      },
      explanation: {
        tr: "İyonosfer iyonlaşma/elektriksel özelliklerle tanımlanır. Sıcaklığa göre katmanlarla bire bir aynı sınıflama değildir ve bunlarla örtüşebilir.",
      },
      skill: "Katman sınıflandırması",
    },
    {
      id: "f014-atmosfer-katmanlari-q7",
      prompt: {
        tr: "Troposfer kalınlığı için “her yerde ve her mevsim tam 13 km” yargısına en uygun değerlendirme hangisidir?",
      },
      options: [
        {
          tr: "Tamamen doğrudur.",
        },
        {
          tr: "Yaklaşık ortalamayı değişmez evrensel sınır sanır.",
        },
        {
          tr: "Yalnız yerel saatle ilgilidir.",
        },
        {
          tr: "Bütün atmosferin sonunu tanımlar.",
        },
        {
          tr: "Her gazın yüzdesini verir.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Enlem ve mevsimle değişen sınırı hatırla.",
      },
      explanation: {
        tr: "13 km okul şemasında yaklaşık değer olabilir; troposferin kalınlığı enlem, mevsim ve atmosfer koşullarıyla değişir.",
      },
      skill: "Model sınırı",
    },
    {
      id: "f014-atmosfer-katmanlari-q8",
      prompt: {
        tr: "Termosfer için yüksek sıcaklık ile çok düşük yoğunluk birlikte veriliyor. Hangisi çıkarılamaz?",
      },
      options: [
        {
          tr: "Tanecik sayısının hacim başına az olabileceği",
        },
        {
          tr: "Sıcaklık ve yoğunluğun farklı özellikler olduğu",
        },
        {
          tr: "Yoğun yüzey havasıyla aynı ısı aktarımının zorunlu olduğu",
        },
        {
          tr: "Katman karşılaştırmasında iki niceliğin de önemli olduğu",
        },
        {
          tr: "Sıcaklığın tek başına bütün etkiyi vermediği",
        },
      ],
      answer: 2,
      hint: {
        tr: "Toplam etki için tanecik sayısı da gerekir.",
      },
      explanation: {
        tr: "Yüksek sıcaklık çok seyrek bir ortamda yoğun hava kadar enerji aktarımı garantilemez. Eşitlik iddiası için daha fazla fiziksel veri gerekir.",
      },
      skill: "Sıcaklık ve yoğunluk",
    },
    {
      id: "f014-atmosfer-katmanlari-q9",
      prompt: {
        tr: "Bir kent için “Bugün öğleden sonra sağanak bekleniyor.” ifadesi hangisidir?",
      },
      options: [
        {
          tr: "İklimin bütün geçmişi",
        },
        {
          tr: "Uzun dönem eğilim kanıtı",
        },
        {
          tr: "Jeolojik zaman ölçeği",
        },
        {
          tr: "Hava durumu öngörüsü",
        },
        {
          tr: "Kuru hava bileşim yüzdesi",
        },
      ],
      answer: 3,
      hint: {
        tr: "Belirtilen süre tek gündür.",
      },
      explanation: {
        tr: "Belirli yerdeki kısa süreli olay hava durumu kapsamındadır. İklim uzun yılların örüntüsünü ve değişkenliğini ele alır.",
      },
      skill: "Hava ve iklim",
    },
    {
      id: "f014-atmosfer-katmanlari-q10",
      prompt: {
        tr: "Mavi gökyüzünün temel açıklaması hangisidir?",
      },
      options: [
        {
          tr: "Atmosferin yalnız mavi gazdan oluşması",
        },
        {
          tr: "Deniz renginin her yerde aynen kopyalanması",
        },
        {
          tr: "Güneş’in yalnız mavi ışık yayması",
        },
        {
          tr: "Işığın hava olmadan hiç ilerleyememesi",
        },
        {
          tr: "Kısa dalga boylu görünür ışığın atmosferde daha güçlü saçılması",
        },
      ],
      answer: 4,
      hint: {
        tr: "Atmosfer ışığı farklı yönlere dağıtır.",
      },
      explanation: {
        tr: "Görünür ışığın kısa dalga boyları moleküler saçılmadan daha güçlü etkilenir. Gökyüzü saf mavi gaz tabakası değildir; yalnız kırılma açıklaması yeterli değildir.",
      },
      skill: "Atmosfer ve saçılma",
    },
  ],
  "cografya-sicaklik": [
    {
      id: "f014-cografya-sicaklik-q1",
      prompt: {
        tr: "Sıcaklık farkı nedeniyle bir cisimden diğerine aktarılan enerjiye ne denir?",
      },
      options: [
        {
          tr: "Isı",
        },
        {
          tr: "Boylam",
        },
        {
          tr: "Basınç",
        },
        {
          tr: "Nem",
        },
        {
          tr: "İzoterm",
        },
      ],
      answer: 0,
      hint: {
        tr: "Aktarım ile depolanmış enerji toplamını ayır.",
      },
      explanation: {
        tr: "Isı sıcaklık farkı nedeniyle aktarılan enerjidir. Maddenin bütün iç enerjisinin adı değildir.",
      },
      skill: "Isı sıcaklık ayrımı",
    },
    {
      id: "f014-cografya-sicaklik-q2",
      prompt: {
        tr: "1.200 m’de 12°C ölçülüyor. 200 m’de 1°C azalma kabulüyle deniz seviyesine indirgenmiş sıcaklık kaçtır?",
      },
      options: [
        {
          tr: "6°C",
        },
        {
          tr: "18°C",
        },
        {
          tr: "12°C",
        },
        {
          tr: "24°C",
        },
        {
          tr: "−6°C",
        },
      ],
      answer: 1,
      hint: {
        tr: "Denize indirirken yükseklik farkına ait sıcaklığı ekle.",
      },
      explanation: {
        tr: "1.200/200=6°C; 12+6=18°C. Bu değer verilen okul yaklaşımıyla hesaplanır, gerçek atmosfer için evrensel oran değildir.",
      },
      skill: "İndirgeme hesabı",
    },
    {
      id: "f014-cografya-sicaklik-q3",
      prompt: {
        tr: "A 1.000 m’de 15°C, B deniz seviyesinde 18°C. 200 m’de 1°C yaklaşımında A’nın indirgenmiş sıcaklığı kaçtır?",
      },
      options: [
        {
          tr: "10°C",
        },
        {
          tr: "15°C",
        },
        {
          tr: "20°C",
        },
        {
          tr: "18°C",
        },
        {
          tr: "25°C",
        },
      ],
      answer: 2,
      hint: {
        tr: "1.000 metre için 5°C düzeltme gerekir.",
      },
      explanation: {
        tr: "A’nın indirgenmiş değeri 15+1.000/200=20°C’dir. Ölçülmüş sıcaklığı 15°C olarak kalır; fiziksel olarak ısıtılmamıştır.",
      },
      skill: "Gerçek indirgenmiş değer",
    },
    {
      id: "f014-cografya-sicaklik-q4",
      prompt: {
        tr: "Aynı sıcaklıktaki noktaları birleştiren eğrinin adı nedir?",
      },
      options: [
        {
          tr: "İzobar",
        },
        {
          tr: "Meridyen",
        },
        {
          tr: "Paralel",
        },
        {
          tr: "İzoterm",
        },
        {
          tr: "Eşyükselti",
        },
      ],
      answer: 3,
      hint: {
        tr: "Soru sıcaklığın eşitliğini soruyor.",
      },
      explanation: {
        tr: "İzoterm eş sıcaklık eğrisidir. İzobar basınçla, eşyükselti yükseklikle ilgilidir; aynı harita sembolünü her niceliğe atama.",
      },
      skill: "Harita kavramları",
    },
    {
      id: "f014-cografya-sicaklik-q5",
      prompt: {
        tr: "Kuzey Yarım Küre’de 40°K’daki benzer özellikli ve aynı yükseltideki yamaçlardan hangisi bakı etkisiyle genel olarak daha uygun ışın açısı alır?",
      },
      options: [
        {
          tr: "Her zaman kuzeye bakan",
        },
        {
          tr: "Her zaman doğuya bakan",
        },
        {
          tr: "Yönün hiçbir etkisi yoktur",
        },
        {
          tr: "Yalnız batıya bakan",
        },
        {
          tr: "Güneye bakan",
        },
      ],
      answer: 4,
      hint: {
        tr: "Dönence dışında ve Kuzey Yarım Küre’desin.",
      },
      explanation: {
        tr: "Bu koşullarda güneye bakan yamaçlar genel olarak Güneş ışınlarını daha uygun açıyla alır. Hüküm bütün Dünya ve her koşul için aynı değildir.",
      },
      skill: "Bakı koşulu",
    },
    {
      id: "f014-cografya-sicaklik-q6",
      prompt: {
        tr: "Bir tabakada sıcaklığın yükseldikçe arttığı ölçülüyor. Bu durum hangisidir?",
      },
      options: [
        {
          tr: "İnversiyon",
        },
        {
          tr: "Boylam farkı",
        },
        {
          tr: "Mutlak nem",
        },
        {
          tr: "Yerel saat",
        },
        {
          tr: "Geri dönüşüm",
        },
      ],
      answer: 0,
      hint: {
        tr: "Genel yükseklik azalmasının tersine bak.",
      },
      explanation: {
        tr: "Sıcaklığın yukarı doğru arttığı tabaka sıcaklık terselmesi/inversiyon örneğidir. Normal azalma kuralı bu tabakaya zorunlu uygulanamaz.",
      },
      skill: "İnversiyon",
    },
    {
      id: "f014-cografya-sicaklik-q7",
      prompt: {
        tr: "Denizlerin karalara göre genel olarak daha geç ısınıp soğuması hangisine katkı sağlar?",
      },
      options: [
        {
          tr: "Kıyılarda her zaman sıfır yağışa",
        },
        {
          tr: "Kıyıların sıcaklık değişimlerinin daha ılımlı olmasına",
        },
        {
          tr: "Bütün yükseltilerin eşitliğine",
        },
        {
          tr: "Her kıyının aynı sıcaklığa",
        },
        {
          tr: "Boylam farkının yok olmasına",
        },
      ],
      answer: 1,
      hint: {
        tr: "Isıl tepki ve enerji depolama farkını düşün.",
      },
      explanation: {
        tr: "Su ile karanın ısıl özellikleri ve suyun karışması farklıdır. Bu, kıyılarda sıcaklık farklarını azaltıcı katkı sağlar; bütün kıyıların aynı olması sonucunu vermez.",
      },
      skill: "Denizellik",
    },
    {
      id: "f014-cografya-sicaklik-q8",
      prompt: {
        tr: "İndirgenmiş sıcaklık haritası için doğru yorum hangisidir?",
      },
      options: [
        {
          tr: "Dağlar gerçekte ısıtılmıştır.",
        },
        {
          tr: "Bütün iklim etkenleri kaldırılmıştır.",
        },
        {
          tr: "Yükselti etkisi belirli bir yaklaşımla hesap üzerinden kaldırılmıştır.",
        },
        {
          tr: "Bütün noktalar deniz kıyısına taşınmıştır.",
        },
        {
          tr: "Ölçülmüş sıcaklıkların hepsi aynıdır.",
        },
      ],
      answer: 2,
      hint: {
        tr: "Harita dönüşümüyle fiziksel değişimi ayır.",
      },
      explanation: {
        tr: "İndirgeme yükseltiye ilişkin hesap düzeltmesidir. Enlem, denizellik ve diğer etkenler otomatik kaldırılmaz; gerçek ölçüm değişmez.",
      },
      skill: "Harita yorumu",
    },
    {
      id: "f014-cografya-sicaklik-q9",
      prompt: {
        tr: "Sadece “A noktası daha güneydedir.” bilgisi verilirse hangi yargı güvenilmez?",
      },
      options: [
        {
          tr: "Enlemleri farklı olabilir.",
        },
        {
          tr: "Konum hakkında bir bilgi vardır.",
        },
        {
          tr: "Başka etkenler de sıcaklığı etkileyebilir.",
        },
        {
          tr: "A bütün koşullarda kesinlikle daha sıcaktır.",
        },
        {
          tr: "Yarımküre bilgisi gerekebilir.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Güney yönünü tek başına evrensel sıcaklık sırası sayma.",
      },
      explanation: {
        tr: "Yarımküre, yükselti, akıntı, mevsim ve başka etkenler bilinmeden kesin sıcaklık sırası kurulamaz. Genel eğilim koşulsuz her nokta kuralı değildir.",
      },
      skill: "Çok etkenli karşılaştırma",
    },
    {
      id: "f014-cografya-sicaklik-q10",
      prompt: {
        tr: "Kelvin biriminin doğru simgesi hangisidir?",
      },
      options: [
        {
          tr: "°K",
        },
        {
          tr: "k°C",
        },
        {
          tr: "K°",
        },
        {
          tr: "°Kelvin",
        },
        {
          tr: "K",
        },
      ],
      answer: 4,
      hint: {
        tr: "Kelvin simgesinde derece işareti yoktur.",
      },
      explanation: {
        tr: "SI sıcaklık birimi kelvinin simgesi K’dir. Celsius için°C kullanılması Kelvin’e de derece işareti ekleneceği anlamına gelmez.",
      },
      skill: "Birim doğruluğu",
    },
  ],
  "basinc-ruzgarlar": [
    {
      id: "f014-basinc-ruzgarlar-q1",
      prompt: {
        tr: "Merkez 1.000 hPa, çevresi 990 hPa. Merkez çevresine göre nasıl adlandırılır?",
      },
      options: [
        {
          tr: "Yüksek basınç",
        },
        {
          tr: "Alçak basınç",
        },
        {
          tr: "Basınçsız alan",
        },
        {
          tr: "Mutlak nem",
        },
        {
          tr: "Yerel saat",
        },
      ],
      answer: 0,
      hint: {
        tr: "Çevreyle farkı bul.",
      },
      explanation: {
        tr: "1.000−990=10 hPa; merkez çevresinden yüksek olduğundan göreli yüksek merkezdir.1.013 hPa referansı zorunlu adlandırma eşiği değildir.",
      },
      skill: "Göreli basınç",
    },
    {
      id: "f014-basinc-ruzgarlar-q2",
      prompt: {
        tr: "1.020 ve 1.000 hPa merkezler arası 100 km. Basınç gradyanı büyüklüğü kaçtır?",
      },
      options: [
        {
          tr: "20 hPa/km",
        },
        {
          tr: "0,2 hPa/km",
        },
        {
          tr: "2 m/s",
        },
        {
          tr: "100 hPa/km",
        },
        {
          tr: "0,02 m/s",
        },
      ],
      answer: 1,
      hint: {
        tr: "20 hPa farkı 100 km’ye böl.",
      },
      explanation: {
        tr: "20/100=0,2 hPa/km. İki basınç ve mesafe gerçek hız hesabına yetmez; sonuç basınç/uzaklıktır.",
      },
      skill: "Gradyan hesabı",
    },
    {
      id: "f014-basinc-ruzgarlar-q3",
      prompt: {
        tr: "Aynı 20 hPa fark 100 km yerine 200 km’ye yayılırsa gradyan nedir?",
      },
      options: [
        {
          tr: "0,4 hPa/km",
        },
        {
          tr: "20 hPa/km",
        },
        {
          tr: "0,1 hPa/km",
        },
        {
          tr: "2 hPa/km",
        },
        {
          tr: "200 m/s",
        },
      ],
      answer: 2,
      hint: {
        tr: "Aynı fark daha uzun mesafeye yayılıyor.",
      },
      explanation: {
        tr: "20/200=0,1 hPa/km; gradyan yarıya iner. Bunu doğrudan gerçek hızın tam yarıya indiği biçiminde kullanmak ek varsayım gerektirir.",
      },
      skill: "Mesafe ve gradyan",
    },
    {
      id: "f014-basinc-ruzgarlar-q4",
      prompt: {
        tr: "Kuzey Yarım Küre’de Coriolis sapması havanın hareket yönüne göre nasıldır?",
      },
      options: [
        {
          tr: "Her zaman ekranda yukarı",
        },
        {
          tr: "Sola",
        },
        {
          tr: "Hiçbir koşulda yok",
        },
        {
          tr: "Sağa",
        },
        {
          tr: "Yalnız aşağı",
        },
      ],
      answer: 3,
      hint: {
        tr: "Sağ–solu hareket eden havaya göre tanımla.",
      },
      explanation: {
        tr: "Kuzey Yarım Küre’de hareketin sağına sapma vardır. Bu, ekrana göre değişmez sağ yönü veya sürtünmeye bağlı yavaşlama tanımı değildir.",
      },
      skill: "Coriolis yönü",
    },
    {
      id: "f014-basinc-ruzgarlar-q5",
      prompt: {
        tr: "Gündüz kara denizden daha hızlı ısınıyor; genel dolaşımın baskın olmadığı kıyı modeli veriliyor. Yüzey meltemi hangisidir?",
      },
      options: [
        {
          tr: "Karadan denize",
        },
        {
          tr: "Yalnız düşey aşağı",
        },
        {
          tr: "Yalnız kutuptan Ekvator’a",
        },
        {
          tr: "Yön mutlaka sıfır",
        },
        {
          tr: "Denizden karaya",
        },
      ],
      answer: 4,
      hint: {
        tr: "Isınan kara üzerinde göreli alçak basınç gelişir.",
      },
      explanation: {
        tr: "Deniz görece yüksek, kara görece alçak basınçlıdır; yüzey akışı denizden karaya olur. Bu günlük yerel modeldir.",
      },
      skill: "Deniz meltemi",
    },
    {
      id: "f014-basinc-ruzgarlar-q6",
      prompt: {
        tr: "Gece kara denizden daha hızlı soğuyor. İdeal kıyı meltemi yüzeyde nereye eser?",
      },
      options: [
        {
          tr: "Karadan denize",
        },
        {
          tr: "Denizden karaya",
        },
        {
          tr: "Her zaman batıdan doğuya",
        },
        {
          tr: "Yalnız yukarı",
        },
        {
          tr: "Hiç rüzgâr oluşamaz",
        },
      ],
      answer: 0,
      hint: {
        tr: "Daha soğuk kara göreli yüksek hâle gelir.",
      },
      explanation: {
        tr: "Gece kara daha çabuk soğuduğunda ideal modelde kara göreli yüksek, deniz göreli alçaktır. Yüzey akışı karadan denize yönelir.",
      },
      skill: "Kara meltemi",
    },
    {
      id: "f014-basinc-ruzgarlar-q7",
      prompt: {
        tr: "Tepede 5°C kuru hava 1.000 m alçalıyor;100 m’de 1°C artış kabulü veriliyor. Son sıcaklık kaçtır?",
      },
      options: [
        {
          tr: "−5°C",
        },
        {
          tr: "15°C",
        },
        {
          tr: "10°C",
        },
        {
          tr: "6°C",
        },
        {
          tr: "105°C",
        },
      ],
      answer: 1,
      hint: {
        tr: "Alçalmanın 10°C ısıtma katkısını ekle.",
      },
      explanation: {
        tr: "1.000/100=10°C;5+10=15°C. Bu açık kuru hava yaklaşımıdır, her gerçek Föhn olayı için değişmez sayı değildir.",
      },
      skill: "Kuru alçalma",
    },
    {
      id: "f014-basinc-ruzgarlar-q8",
      prompt: {
        tr: "Föhn’ün ana ısınma açıklaması hangisidir?",
      },
      options: [
        {
          tr: "Yamaçla sürtünüp yanma",
        },
        {
          tr: "Güneş’in gece doğması",
        },
        {
          tr: "Alçalırken sıkışmaya bağlı adiyabatik ısınma",
        },
        {
          tr: "Boylamın değişmesi",
        },
        {
          tr: "Havadaki bütün gazların yok olması",
        },
      ],
      answer: 2,
      hint: {
        tr: "Basıncın alçalırken artmasını düşün.",
      },
      explanation: {
        tr: "Alçalan hava daha yüksek çevre basıncında sıkışır; adiyabatik ısınma gerçekleşir. Sürtünme bu temel mekanizmanın yerine konamaz.",
      },
      skill: "Föhn mekanizması",
    },
    {
      id: "f014-basinc-ruzgarlar-q9",
      prompt: {
        tr: "Bir rüzgâr frekans gülündeki en uzun kol öncelikle neyi gösterir?",
      },
      options: [
        {
          tr: "En soğuk ayı",
        },
        {
          tr: "En yüksek tek anlık hızı",
        },
        {
          tr: "Toplam yağışı",
        },
        {
          tr: "Rüzgârın en sık geldiği yönü",
        },
        {
          tr: "Bütün günlerde aynı basıncı",
        },
      ],
      answer: 3,
      hint: {
        tr: "Frekans sıklıktır, hız değildir.",
      },
      explanation: {
        tr: "Frekans gülünde uzunluk verilen dönemde o yönden esme sıklığını temsil eder. En sık yön ile en büyük anlık hız aynı nicelik değildir.",
      },
      skill: "Rüzgâr ölçümü",
    },
    {
      id: "f014-basinc-ruzgarlar-q10",
      prompt: {
        tr: "Muson ile kıyı meltemini ayıran temel zaman ölçeği hangisidir?",
      },
      options: [
        {
          tr: "İkisi de yalnız milyon yıllık",
        },
        {
          tr: "İkisi de yalnız saniyelik",
        },
        {
          tr: "Meltem mevsimlik, muson günlük",
        },
        {
          tr: "Hiçbiri zamanla değişmez",
        },
        {
          tr: "Muson temel olarak mevsimlik, meltem günlük yerel döngüdedir.",
        },
      ],
      answer: 4,
      hint: {
        tr: "Benzer kara-deniz nedenini farklı ölçekten ayır.",
      },
      explanation: {
        tr: "Muson geniş ölçekli mevsimlik dolaşımla, meltem dar alanlı günlük ısınma-soğuma farkıyla ilişkilidir. Benzer mekanizma her ölçekte aynı olay adı demek değildir.",
      },
      skill: "Rüzgâr ölçeği",
    },
  ],
  "nem-yagis": [
    {
      id: "f014-nem-yagis-q1",
      prompt: {
        tr: "Gaz hâlindeki su buharı için doğru ifade hangisidir?",
      },
      options: [
        {
          tr: "Çıplak gözle doğrudan görülmez.",
        },
        {
          tr: "Her zaman mavi damladır.",
        },
        {
          tr: "Yalnız kaynama anında vardır.",
        },
        {
          tr: "Yalnız buzda bulunur.",
        },
        {
          tr: "Basınç birimidir.",
        },
      ],
      answer: 0,
      hint: {
        tr: "Bulut damlacığı ile gaz fazını ayır.",
      },
      explanation: {
        tr: "Gaz hâlindeki su buharı doğrudan görünmez; görünen sis ve bulutlar küçük damlacık/buz parçaları içerir. Buharlaşma kaynama olmadan da olabilir.",
      },
      skill: "Su fazları",
    },
    {
      id: "f014-nem-yagis-q2",
      prompt: {
        tr: "10 g/m³ buhar ve 20 g/m³ doyma miktarı verilen sabit koşul modelinde bağıl nem kaçtır?",
      },
      options: [
        {
          tr: "%10",
        },
        {
          tr: "%50",
        },
        {
          tr: "%20",
        },
        {
          tr: "%100",
        },
        {
          tr: "%200",
        },
      ],
      answer: 1,
      hint: {
        tr: "Mevcut miktarı doyma miktarına bölüp 100 ile çarp.",
      },
      explanation: {
        tr: "10/20×100=%50. Aynı sıcaklık ve model koşullarına ait pay ve payda kullanıldı.",
      },
      skill: "Bağıl nem hesabı",
    },
    {
      id: "f014-nem-yagis-q3",
      prompt: {
        tr: "Sabit hacimli kapalı denge modelinde toplam su 10 g/m³ ve doyma 8 g/m³. Yoğuşmuş su miktarı kaçtır?",
      },
      options: [
        {
          tr: "18 g/m³",
        },
        {
          tr: "8 g/m³",
        },
        {
          tr: "2 g/m³",
        },
        {
          tr: "10 g/m³",
        },
        {
          tr: "0 g/m³",
        },
      ],
      answer: 2,
      hint: {
        tr: "Doyma değerini aşan toplam suyu ayır.",
      },
      explanation: {
        tr: "10−8=2 g/m³ su yoğunlaşır; buhar 8 g/m³ kalır. Toplam 8+2=10 korunur ve denge bağıl nemi%100’dür.",
      },
      skill: "Yoğuşma bütçesi",
    },
    {
      id: "f014-nem-yagis-q4",
      prompt: {
        tr: "12 g su buharı, yoğuşma olmadan 3 m³ hacimde bulunuyor. Mutlak nem kaçtır?",
      },
      options: [
        {
          tr: "36 g/m³",
        },
        {
          tr: "12 g/m³",
        },
        {
          tr: "3 g/m³",
        },
        {
          tr: "4 g/m³",
        },
        {
          tr: "9 g/m³",
        },
      ],
      answer: 3,
      hint: {
        tr: "Toplam kütleyi hacme böl.",
      },
      explanation: {
        tr: "12 g/3 m³=4 g/m³. g/kg farklı bir niceliği, kütle başına karışım oranını ifade eder.",
      },
      skill: "Birim hacimde miktar",
    },
    {
      id: "f014-nem-yagis-q5",
      prompt: {
        tr: "Havadaki su buharının soğuk yüzey üzerinde doğrudan buza dönüşmesi hangisidir?",
      },
      options: [
        {
          tr: "Yağmur",
        },
        {
          tr: "Sıvı çiy",
        },
        {
          tr: "Karadan denize meltem",
        },
        {
          tr: "Mutlak basınç",
        },
        {
          tr: "Kırağı",
        },
      ],
      answer: 4,
      hint: {
        tr: "Gazdan katıya geçişe bak.",
      },
      explanation: {
        tr: "Kırağı su buharının yüzeyde doğrudan buza dönüşmesiyle ilişkilidir. Kırç ise sıvı damlacıkların yüzeyde donmasıyla farklı yol izler.",
      },
      skill: "Kırağı kırç ayrımı",
    },
    {
      id: "f014-nem-yagis-q6",
      prompt: {
        tr: "Nemli havanın dağ yamacını aşmak zorunda kaldığı için yükselmesi hangi yağış mekanizmasıdır?",
      },
      options: [
        {
          tr: "Orografik",
        },
        {
          tr: "Yalnız boylamsal",
        },
        {
          tr: "Yalnız sivil saat",
        },
        {
          tr: "Tamamen gelgit",
        },
        {
          tr: "Yalnız volkanik",
        },
      ],
      answer: 0,
      hint: {
        tr: "Yükselmenin nedeni topografik engeldir.",
      },
      explanation: {
        tr: "Yamaç boyunca zorlanmış yükselme orografik mekanizmadır. Yağış için yeterli nem ve doygunluk gibi koşullar da gerekir.",
      },
      skill: "Yamaç yükselmesi",
    },
    {
      id: "f014-nem-yagis-q7",
      prompt: {
        tr: "Yüzeyin ısıttığı havanın yükselmesiyle gelişen yağış mekanizması hangisidir?",
      },
      options: [
        {
          tr: "Tarih değiştirme",
        },
        {
          tr: "Konveksiyonel",
        },
        {
          tr: "Antimeridyen",
        },
        {
          tr: "Kırç",
        },
        {
          tr: "Kara melteminin gece yönü",
        },
      ],
      answer: 1,
      hint: {
        tr: "Hareketin kaynağı yüzey ısınmasıdır.",
      },
      explanation: {
        tr: "Yüzey ısınmasıyla başlayan yükselme konveksiyonel mekanizmaya örnektir. Her yükselmede kesin yağış oluştuğu sonucu çıkarılmaz.",
      },
      skill: "Konveksiyon",
    },
    {
      id: "f014-nem-yagis-q8",
      prompt: {
        tr: "Farklı özellikteki iki hava kütlesinin karşılaşmasında sıcak havanın yükselmeye zorlanması hangi mekanizmadır?",
      },
      options: [
        {
          tr: "Yalnız kırağı",
        },
        {
          tr: "Yalnız yerel saat",
        },
        {
          tr: "Cephe yükselmesi",
        },
        {
          tr: "Yalnız suyun donması",
        },
        {
          tr: "Yalnız meridyen farkı",
        },
      ],
      answer: 2,
      hint: {
        tr: "Sınırda karşılaşan hava kütlelerine bak.",
      },
      explanation: {
        tr: "Hava kütlelerinin sınırında sıcak havanın yükselmeye zorlanması cephe mekanizmasıdır. Doyma ve yağış şartları süreç içinde ayrıca değerlendirilir.",
      },
      skill: "Cephe yağışı",
    },
    {
      id: "f014-nem-yagis-q9",
      prompt: {
        tr: "Kapalı ve sabit hacimli bir kap ısıtılıyor; dışarıdan su girmiyor. Isıtma hakkındaki hangi yargı yanlıştır?",
      },
      options: [
        {
          tr: "Doyma eşiği değişebilir.",
        },
        {
          tr: "Buharlaşma için sıvı varsa faz paylaşımı değişebilir.",
        },
        {
          tr: "Toplam su korunabilir.",
        },
        {
          tr: "Yeni su kendiliğinden üretilir.",
        },
        {
          tr: "Bağıl nem değişebilir.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Enerji girişi ile madde girişini ayır.",
      },
      explanation: {
        tr: "Isıtma toplam su yaratmaz; doygunluk ve faz dağılımı değişebilir. Su kütlesinin artması için madde girişi veya ayrıca verilen kimyasal süreç gerekir.",
      },
      skill: "Sistem ve madde",
    },
    {
      id: "f014-nem-yagis-q10",
      prompt: {
        tr: "Modelde doyma miktarı 8 g/m³ seçildi. Buradan sıcaklık için hangi yorum doğrudur?",
      },
      options: [
        {
          tr: "Kesin 8°C’dir.",
        },
        {
          tr: "Kesin−8°C’dir.",
        },
        {
          tr: "Kesin 100°C’dir.",
        },
        {
          tr: "Hacim bilgisi sıcaklığı gereksiz kılar.",
        },
        {
          tr: "Sıcaklık–doyma ilişkisini veren ek veri olmadan sıcaklık sayısı bulunamaz.",
        },
      ],
      answer: 4,
      hint: {
        tr: "g/m³ sıcaklık birimi değildir.",
      },
      explanation: {
        tr: "Doyma miktarı sıcaklıkla ilişkili olsa da 8 g/m³ değeri 8°C değildir. Sayısal sıcaklık dönüşümü için uygun ilişki veya veri gerekir.",
      },
      skill: "Nicelik ve birim",
    },
  ],
};

export const forge014GeographyTopics: Record<string, string> = {
  "doga-insan-cografya": "detail-37",
  "cografyanin-tarihi-gelisimi": "detail-38",
  "yerel-saat": "detail-39",
  "atmosfer-katmanlari": "detail-40",
  "cografya-sicaklik": "detail-41",
  "basinc-ruzgarlar": "detail-42",
  "nem-yagis": "detail-43",
};
export const forge014GeographyGuides: LessonGuide[] = authoredGuides.map(
  ({ title: _title, ...guide }) => guide,
);
export const forge014GeographyLessons: Lesson[] = authoredGuides.map(
  (guide) => ({
    id: guide.id,
    subjectId: "tyt-cografya",
    title: txt(guide.title),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: banks[guide.id],
    source: txt(guide.source),
    tags: [
      "kaynakli-anlatim",
      "etkilesimli",
      "ozgun-sorular",
      forge014GeographyTopics[guide.id],
    ],
  }),
);

function bounded(value: number, low: number, high: number, name: string) {
  if (!Number.isFinite(value) || value < low || value > high)
    throw new RangeError(name);
  return value;
}
export const geography014Focus = [
  {
    id: "flow",
    label: "Akım",
    question: "Barajdan sonra akarsuyun aylık debisi nasıl değişiyor?",
    primary: "Hidrografya",
    support: "Klimatoloji",
    target: "river",
    evidence:
      "Ölçülen sonuç birim zamandaki su akımıdır; yağış bilgisi açıklamayı destekler.",
    limit:
      "Gösterilen bağlar bir etkileşim şemasıdır; gerçek debi verisi verilmeden sayısal değişim hesaplanmaz.",
  },
  {
    id: "population",
    label: "Göç",
    question: "Su altında kalan köyden insanlar hangi yerleşmelere taşınıyor?",
    primary: "Nüfus coğrafyası",
    support: "Yerleşme coğrafyası",
    target: "village",
    evidence:
      "İnsanların yer değiştirmesi ve varış yerleri incelenir; nüfus hareketi öne çıkar.",
    limit:
      "Köyden çıkış, aynı havza içinde bir yere girişle dengelenebilir; bölge toplamı ayrı hesaplanır.",
  },
  {
    id: "farming",
    label: "Tarım",
    question:
      "Sulamaya açılan tarlalarda ürün deseni ve üretim nasıl değişiyor?",
    primary: "Ekonomik coğrafya",
    support: "Hidrografya",
    target: "field",
    evidence:
      "Araştırılan sonuç tarımsal üretimin mekânsal değişimidir; su koşulları etkileyen değişkendir.",
    limit:
      "Su bulunması her ürünün sınırsız yetişeceğini göstermez; toprak, iklim, maliyet ve erişim de gerekir.",
  },
  {
    id: "terrain",
    label: "Yamaç",
    question: "Vadinin yamaç biçimleri hangi aşınma süreçleriyle oluşmuş?",
    primary: "Jeomorfoloji",
    support: "Hidrografya",
    target: "mountain",
    evidence:
      "Araştırma yer şeklinin oluşumunu sorar; akarsuyun aşındırması açıklamaya katkı sunar.",
    limit:
      "Aynı vadide su ve insan bulunması bu yer şekli sorusunu otomatik olarak nüfus araştırması yapmaz.",
  },
] as const;
export function geography014FocusState(index: number) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= geography014Focus.length
  )
    throw new RangeError("GEOGRAPHY_FOCUS");
  return geography014Focus[index];
}
export const geography014Periods = [
  {
    label: "İlk Çağ",
    names:
      "Thales, Anaksimandros, Hekataios, Platon, Eratosthenes, Strabon, Batlamyus",
    method: "Betimleme",
    evidence:
      "Bir yolculukta kıyı çizgisi ve yerleşmeler gözlenip tarif ediliyor.",
    conclusion: "Belirli yerler hakkında gözleme dayalı betimleyici kanıt",
    limit:
      "Şema süre ölçeği değildir; bu yöntem sonraki çağlarda da sürer. Bütün isimlere aynı eser atfedilmez.",
  },
  {
    label: "Orta Çağ",
    names:
      "Harezmi, İbn Sina, İbn Battuta, Biruni, Makdisi, İbn Hurdazbih, Mesudi, İdrisi",
    method: "Bilgi aktarımı",
    evidence:
      "Farklı bölgelerin gözlem ve çizimleri derlenip yeni çalışmalarla karşılaştırılıyor.",
    conclusion: "Farklı bilgi birikimlerinin aktarımı ve geliştirilmesi",
    limit:
      "Bütün dünyada bilgi üretiminin durduğu sonucu çıkarılamaz; dönem tek bir topluma indirgenmez.",
  },
  {
    label: "Yeni Çağ",
    names:
      "Bartholomeu Dias, Vasco da Gama, Kristof Kolomb, Macellan, Pirî Reis, Seydî Ali Reis, Kâtip Çelebi, Evliya Çelebi",
    method: "Haritalama",
    evidence:
      "Deniz yolları ve kıyı bilgileri karşılaştırılıp bir seyir haritasına aktarılıyor.",
    conclusion:
      "Konum ve yol bilgilerinin mekânsal bir temsilde birleştirilmesi",
    limit:
      "Bu örnek dönemin bütün kişilerinin aynı haritayı ürettiği anlamına gelmez; yerel bilgiler de dikkate alınır.",
  },
  {
    label: "Yakın Çağ",
    names: "Alexander von Humboldt, Carl Ritter, Friedrich Ratzel",
    method: "Karşılaştırma",
    evidence:
      "İki bölgede doğal koşullar ve insan faaliyetlerinin dağılışı birlikte karşılaştırılıyor.",
    conclusion: "Dağılış ve insan–çevre ilişkilerini sistemli karşılaştırma",
    limit:
      "İlişki bulmak tek zorunlu neden kanıtı değildir; yöntemler önceki çağların birikimini de kullanır.",
  },
] as const;
export function geography014Period(index: number) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= geography014Periods.length
  )
    throw new RangeError("GEOGRAPHY_PERIOD");
  return geography014Periods[index];
}
export function localSolarTime(
  sourceLongitude: number,
  targetLongitude: number,
  sourceMinutes: number,
) {
  bounded(sourceLongitude, -180, 180, "SOURCE_LONGITUDE");
  bounded(targetLongitude, -180, 180, "TARGET_LONGITUDE");
  bounded(sourceMinutes, 0, 1439, "SOURCE_MINUTES");
  if (
    ![sourceLongitude, targetLongitude, sourceMinutes].every(Number.isInteger)
  )
    throw new RangeError("SOLAR_INTEGER");
  // +180 and -180 are two names for one physical meridian. The chosen
  // Greenwich-based representation is not a civil-date/time-zone resolver.
  const canonical = (x: number) => (x === 180 ? -180 : x);
  const difference = canonical(targetLongitude) - canonical(sourceLongitude);
  const minuteDifference = difference * 4;
  const total = sourceMinutes + minuteDifference;
  const dayOffset = Math.floor(total / 1440);
  const minuteOfDay = ((total % 1440) + 1440) % 1440;
  const clock =
    `${Math.floor(minuteOfDay / 60)}`.padStart(2, "0") +
    "." +
    `${minuteOfDay % 60}`.padStart(2, "0");
  return {
    difference,
    minuteDifference,
    dayOffset,
    minuteOfDay,
    clock,
    dateContextRequired:
      Math.abs(difference) > 180 ||
      Math.abs(sourceLongitude) === 180 ||
      Math.abs(targetLongitude) === 180,
  };
}
export const atmosphere014Layers = [
  {
    label: "Troposfer",
    from: 0,
    to: 13,
    note: "Hava olaylarının büyük bölümü; sınır enlem ve mevsimle değişir.",
  },
  {
    label: "Stratosfer",
    from: 13,
    to: 50,
    note: "Ozonun önemli bölümü; şemada sıcaklık yukarı doğru artar.",
  },
  {
    label: "Mezosfer",
    from: 50,
    to: 85,
    note: "Şemada sıcaklık yeniden azalır; birçok küçük göktaşı parçalanır.",
  },
  {
    label: "Termosfer",
    from: 85,
    to: 600,
    note: "Seyrek gaz ve yüksek sıcaklık; iyonosferle örtüşen bölgeler vardır.",
  },
  {
    label: "Ekzosfer",
    from: 600,
    to: 700,
    note: "Çok seyrek dış bölge; uzaya geçiş kademelidir, 700 km bir bitiş duvarı değildir.",
  },
] as const;
export function atmosphere014State(height: number, waterPercent: number) {
  bounded(height, 0, 700, "HEIGHT");
  bounded(waterPercent, 0, 4, "WATER_PERCENT");
  const index =
    height < 13 ? 0 : height < 50 ? 1 : height < 85 ? 2 : height < 600 ? 3 : 4;
  const nodes = [
    [0, 15],
    [13, -55],
    [50, 0],
    [85, -90],
    [600, 1000],
    [700, 1000],
  ];
  const lower = nodes[index],
    upper = nodes[index + 1];
  const temperature =
    lower[1] +
    ((height - lower[0]) / (upper[0] - lower[0])) * (upper[1] - lower[1]);
  return {
    index,
    layer: atmosphere014Layers[index],
    temperature,
    nitrogen: (100 - waterPercent) * 0.78,
    oxygen: (100 - waterPercent) * 0.21,
    other: (100 - waterPercent) * 0.01,
    water: waterPercent,
  };
}
export function reducedTemperature(
  measured: number,
  height: number,
  normal: boolean,
) {
  bounded(measured, -40, 50, "MEASURED_TEMPERATURE");
  bounded(height, 0, 4000, "HEIGHT");
  return {
    measured,
    height,
    correction: height / 200,
    reduced: normal ? measured + height / 200 : null,
  };
}
export function pressure014Gradient(
  first: number,
  second: number,
  distance: number,
) {
  bounded(first, 900, 1100, "FIRST_PRESSURE");
  bounded(second, 900, 1100, "SECOND_PRESSURE");
  bounded(distance, 1, 1000, "DISTANCE");
  const difference = first - second;
  return {
    difference,
    magnitude: Math.abs(difference) / distance,
    direction:
      difference === 0
        ? "Bu iki nokta arasında basınç farkı yok"
        : difference > 0
          ? "A’dan B’ye basınç kuvveti"
          : "B’den A’ya basınç kuvveti",
  };
}
export function foehn014Descent(topTemperature: number, descent: number) {
  bounded(topTemperature, -30, 30, "TOP_TEMPERATURE");
  bounded(descent, 0, 3000, "DESCENT");
  return {
    rise: descent / 100,
    finalTemperature: topTemperature + descent / 100,
  };
}
export function humidity014Balance(total: number, saturation: number) {
  bounded(total, 0, 40, "TOTAL_WATER");
  bounded(saturation, 1, 40, "SATURATION");
  const vapor = Math.min(total, saturation),
    condensed = total - vapor;
  return {
    total,
    saturation,
    vapor,
    condensed,
    relative: (vapor / saturation) * 100,
    saturated: total >= saturation,
  };
}
export const rainfall014Processes = [
  {
    label: "Yamaç",
    cause: "Nemli hava dağ yamacını aşmak zorunda kalır.",
    chain: [
      "Dağ engeli",
      "Zorlanmış yükselme",
      "Soğuma ve uygun koşulda yağış",
    ],
    limit:
      "Dağın varlığı tek başına kesin yağış garantisi değildir; yeterli nem ve doygunluk gerekir.",
  },
  {
    label: "Yükselim",
    cause: "Yüzeyin ısıttığı hava yükselir.",
    chain: [
      "Yüzey ısınması",
      "Konveksiyonel yükselme",
      "Soğuma ve uygun koşulda yağış",
    ],
    limit: "Yükselen her hava parseli mutlaka yere ulaşan yağmur üretmez.",
  },
  {
    label: "Cephe",
    cause:
      "Farklı hava kütleleri karşılaşırken sıcak hava yükselmeye zorlanır.",
    chain: [
      "Hava kütleleri sınırı",
      "Sıcak havanın yükselmesi",
      "Soğuma ve uygun koşulda yağış",
    ],
    limit:
      "Karşılaşmanın nem ve kararlılık koşulları yağışın gerçekleşmesini ve türünü etkiler.",
  },
] as const;

export const geography014Contributions = [
  [
    {
      person: "Eratosthenes",
      work: "Dünya çevresi tahmini",
      kind: "measure",
      explanation:
        "Gölge açısı ve yerler arası mesafe birlikte kullanılarak çevre tahmin edilir; her ölçüm kartı otomatik olarak bu hesabı anlatmaz.",
    },
    {
      person: "Strabon",
      work: "Geographika",
      kind: "travel",
      explanation:
        "Bölgelerin ayrıntılı tasviri öne çıkar. Batlamyus’un benzer adlı koordinat-harita kılavuzuyla aynı eser değildir.",
    },
    {
      person: "Batlamyus",
      work: "Geographia / Coğrafya Kılavuzu",
      kind: "map",
      explanation:
        "Yerlerin koordinat bilgisi ve harita temsili ayırt edicidir; Strabon’un bölgesel tasvir ipucundan ayrı değerlendirilir.",
    },
  ],
  [
    {
      person: "Biruni",
      work: "Konum ve mesafe hesabı",
      kind: "measure",
      explanation:
        "Kentlerin yerini ve uzaklık ilişkilerini hesaplama bu karşılaştırmada öne çıkar; yalnız “harita” sözcüğünden bütün işleri aynı kişiye bağlama.",
    },
    {
      person: "İdrisî",
      work: "Dünya haritası",
      kind: "map",
      explanation:
        "Dünya haritası ve Sicilya çevresindeki çalışma bağlamı güçlü ipuçlarıdır. Ölçüm, harita ve seyahat bu dönemde bir arada sürer.",
    },
    {
      person: "İbn Battûta",
      work: "Seyahat gözlemleri",
      kind: "travel",
      explanation:
        "Geniş yolculuk güzergâhlarındaki gözlemler öne çıkar; her seyahat kaydını aynı kişi veya bütün dünyayı temsil eden ölçüm sayma.",
    },
    {
      person: "İbn Haldun",
      work: "Toplum ve çevre yorumları",
      kind: "relations",
      explanation:
        "İnsan toplulukları ve çevre üzerine yorumlama katkısı anılır; aynı dönem etiketi bu katkıyı bir deniz kılavuzuyla özdeşleştirmez.",
    },
  ],
  [
    {
      person: "Pirî Reis",
      work: "Kitâb-ı Bahriye",
      kind: "map",
      explanation:
        "Denizcilik açısından kıyı ve liman bilgisi öne çıkar. Bir seyahat anlatısı, otomatik olarak denizcilere yönelik aynı kılavuz değildir.",
    },
    {
      person: "Kâtip Çelebi",
      work: "Cihannümâ",
      kind: "compile",
      explanation:
        "Farklı coğrafi kaynakların derlenmesi öne çıkar. Eser–yazar–amaç üçlüsüyle Pirî Reis ve Evliya Çelebi’den ayır.",
    },
    {
      person: "Evliya Çelebi",
      work: "Seyahatnâme",
      kind: "travel",
      explanation:
        "Yerleşim, insan ve güzergâh gözlemleri içerir. Her gezi kaydı aynı döneme veya aynı kişiye ait değildir; bağlamı kontrol et.",
    },
  ],
  [
    {
      person: "Humboldt",
      work: "Doğa ve bitki örüntüleri",
      kind: "relations",
      explanation:
        "Yükselti boyunca bitki dağılışı gibi fiziki örüntüleri sistemli karşılaştırma ayırt edicidir; bütün çalışmaları yalnız bu örneğe indirgenmez.",
    },
    {
      person: "Ritter",
      work: "Bölgesel doğa–insan sentezi",
      kind: "relations",
      explanation:
        "Bir bölgenin doğal koşulları ve insan ilişkilerini bütün olarak ele alma odağı öne çıkar; fiziki karşılaştırmayla ortak yönleri de bulunabilir.",
    },
    {
      person: "Ratzel ve Vidal de la Blache",
      work: "Beşerî ve bölgesel yaklaşımlar",
      kind: "relations",
      explanation:
        "Modern coğrafyada insan ve bölge odaklı yaklaşımların gelişiminde anılırlar. Burada aynı görüşü veya aynı eseri savundukları iddia edilmez.",
    },
  ],
] as const;
export function geography014Contribution(period: number, card: number) {
  if (
    !Number.isInteger(period) ||
    period < 0 ||
    period >= geography014Contributions.length
  )
    throw new RangeError("CONTRIBUTION_PERIOD");
  const rows = geography014Contributions[period];
  if (!Number.isInteger(card) || card < 0 || card >= rows.length)
    throw new RangeError("CONTRIBUTION_CARD");
  return rows[card];
}
export function civilArrival014(
  sourceMinutes: number,
  sourceOffsetMinutes: number,
  targetOffsetMinutes: number,
  elapsedMinutes: number,
) {
  bounded(sourceMinutes, 0, 1439, "CIVIL_START");
  bounded(sourceOffsetMinutes, -720, 840, "CIVIL_SOURCE_OFFSET");
  bounded(targetOffsetMinutes, -720, 840, "CIVIL_TARGET_OFFSET");
  bounded(elapsedMinutes, 0, 2880, "CIVIL_ELAPSED");
  if (
    ![
      sourceMinutes,
      sourceOffsetMinutes,
      targetOffsetMinutes,
      elapsedMinutes,
    ].every(Number.isInteger)
  )
    throw new RangeError("CIVIL_INTEGER_MINUTES");
  const utcStart = sourceMinutes - sourceOffsetMinutes;
  const utcArrival = utcStart + elapsedMinutes;
  const localArrival = utcArrival + targetOffsetMinutes;
  const minuteOfDay = ((localArrival % 1440) + 1440) % 1440;
  const clock =
    `${Math.floor(minuteOfDay / 60)}`.padStart(2, "0") +
    "." +
    `${minuteOfDay % 60}`.padStart(2, "0");
  return {
    utcStart,
    utcArrival,
    localArrival,
    minuteOfDay,
    clock,
    dayOffset: Math.floor(localArrival / 1440),
    wallDifference: elapsedMinutes + targetOffsetMinutes - sourceOffsetMinutes,
  };
}
