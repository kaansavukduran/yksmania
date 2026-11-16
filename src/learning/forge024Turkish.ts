import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const guideSpecs024: (LessonGuide & { title: string })[] = [
  {
    id: "paragrafta-coklu-sorular",
    title: "Aynı parçaya bağlı çoklu sorular: her köke ayrı kanıt",
    minutes: 120,
    objectives: [
      "Ortak pasajın cümleleriyle her soru hedefini bağımsız eşleştir.",
      "Ana düşünce, ayrıntı, çıkarım, tutum ve söz işlevini aynı metinde ayır.",
      "Olumsuz kökte kapsam ve kanıt eksikliğini denetle.",
      "Bir sorunun seçeneğini ötekinin öncülü yapmadan çözümü açıkla.",
    ],
    sections: [
      {
        title: "Ortak metin, ayrı sorular",
        paragraphs: [
          "Bir paragrafa bağlı iki veya daha çok soru, aynı bilgiyi farklı işlemler için kullanır. Bir soru yazarın temel düşüncesini, diğeri açık bir ayrıntıyı, bir başkası desteklenmeyen bir çıkarımı isteyebilir. Metin ortaktır; soru kökü, seçenekler ve seçilecek yanıt her kart için yeniden değerlendirilir.",
          "Birinci soruda bulduğun cevabı metnin yerine koyma. Yanlış bir ilk cevap ikinci soruyu zorunlu olarak yanlış yapmaz; ikinci sorunun kanıtı yine tam pasajdır. Soruları ters sırada da çözebilmelisin. Her soruya “istenen işlem, kullanılan cümleler, varılan sonuç” biçiminde ayrı bir kısa açıklama kur.",
        ],
      },
      {
        title: "Önce soru hedefini adlandır",
        paragraphs: [
          "“Asıl anlatılmak istenen” bütünün merkez yargısını ister. “Parçaya göre” seçeneklerin metinle desteğini, “değinilmemiştir” metinde bulunmayan bilgi alanını araştırır. “Altı çizili sözün işlevi” ise belirli ifadenin yerel bağlamdaki görevini sorar. Hepsine tek bir ana düşünce cevabı vermek yeterli değildir.",
          "Kökü kendi sözlerinle yaz: “bütünün savı”, “verilmiş ayrıntı”, “kanıtsız yargı” veya “sözün metindeki işi”. Sonra o hedefe uygun kanıt aramaya başla. Kök bir cümleyi belirtiyorsa komşu cümleleri de oku; sözün anlamını etkileyen karşıtlık veya açıklama önceki ya da sonraki cümlede olabilir.",
        ],
      },
      {
        title: "İlk okumada anlam iskeleti",
        paragraphs: [
          "Metni ilk kez okurken her sözcüğü ayrı etiketlemek yerine kimden, hangi durumdan ve hangi ilişkiden söz edildiğini belirle. Ardından ana iddia, gerekçe, örnek, karşı görüş ve sınır cümlelerini ayır. Bu iskelet sorular arasında yeniden kullanılabilir; hazır cevap olarak taşınmaz.",
          "Örneğin bir editör önce bir tercihi anlatabilir, sonra bunun gerekçesini açıklayabilir, en sonda istisna koyabilir. Bir soru tercihin nedenini, diğeri istisnayı sorarsa farklı cümlelere dönersin. İlk okumada kurduğun iskelet, her yeni kökte hangi cümleye bakacağını bulmana yardım eder; bütün seçenekleri denetleme işinin yerine geçmez.",
        ],
      },
      {
        title: "Kanıtı cümle numarasına bağla",
        paragraphs: [
          "Bir seçeneği doğru bulduğunda yalnız “metinde var” deme; hangi cümlede ve hangi sözlerle bulunduğunu göster. İki cümle birlikte gerekiyorsa ikisini de kullan. Birinci cümlede bir amaç, dördüncü cümlede o amacın henüz gerçekleşmediği yazılıysa hedef ile sonuç aynı cevapta karıştırılmamalıdır.",
          "Kanıt haritasında satırlara soruları, yanlarına gerekli cümleleri yazabilirsin. Aynı cümle birden fazla soruda kullanılabilir; her kullanımda kurulan ilişki değişebilir. Bir seçeneğin yarısı destekli, diğer yarısı kanıtsızsa seçeneğin bütünü doğrulanmış olmaz. Özellikle “ve” ile bağlanmış iki iddiayı ayrı ayrı denetle.",
        ],
      },
      {
        title: "Ana düşünceyi ayrıntıdan ayır",
        paragraphs: [
          "Ana düşünce, yazarın metnin bütünüyle ilettiği merkez yargıdır. Bir kişinin adı, tek bir tarih veya kullanılan bir nesne bu yargıyı örneklendirebilir. Ayrıntı doğru olsa bile metnin bütün amacını kapsamıyorsa ana düşünce sorusunun doğru cevabı olamaz.",
          "Bir örnek cümlesini zihnen kaldırıp kalan yargının neyi savunduğunu araştır. Ancak bunu metni keyfî değiştirerek yapma; örneğin hangi savı açıkladığını belirlemek için kullan. Ana düşünce adayı hem temel açıklamaları hem metnin koyduğu sınırı taşımalıdır. “Yalnız”, “da” ve “ama” gibi sözlerin kapsamı önemlidir.",
        ],
      },
      {
        title: "Açık bilgi için gereksiz yorum ekleme",
        paragraphs: [
          "Açık ayrıntı sorusunda verilen kişi, eylem, yer veya zaman doğrudan bulunabilir. “Üç kayıt yeniden dinlendi” sözü yeniden dinlenen kayıt sayısını verir; kayıtların tamamının üç tane olduğunu söylemez. Cümlenin belirlediği miktarla bütünün büyüklüğünü ayrı tut.",
          "Ayrıntı cevabı kurarken ilgili fiilin öznesini ve nesnesini de koru. Bir ekibin gözden geçirdiği örneklerle yayımladığı örnekler aynı küme olmak zorunda değildir. Metin bu ilişkiyi kurmuyorsa dışarıdan ekleme. Doğrudan bilgi sorusunu çözmek için önceki sorunun temel yargısına değil, ayrıntıyı veren cümleye dön.",
        ],
      },
      {
        title: "Çıkarım ve ek varsayım",
        paragraphs: [
          "Çıkarım, metindeki öncüllerden gerekçeli olarak ulaşılan sonuçtur. “Sergi cuma günü açılacak; bakım perşembe bitecek” bilgileri planlanan sırayı gösterebilir. Buna “bütün bakım işlemleri her zaman bir günde biter” eklemek, verilen tek olaydan genel yasa üretmektir.",
          "Bir çıkarımı sınamak için “bu sonuç yanlış olsaydı pasajın bir cümlesiyle çelişir miydi?” diye düşün. Metinle uyumlu başka bir olasılık kalıyorsa kesinlik iddiası zayıflar. Olası karşı durumun gerçekten yaşandığını iddia etme; amacı, sonucun metinden zorunlu çıkmadığını göstermektir. Kesin ile olabilir kökleri aynı ölçütü istemez.",
        ],
      },
      {
        title: "Olumsuz kökün yönü",
        paragraphs: [
          "“Ulaşılamaz”, “söylenemez” ve “değinilmemiştir” gibi köklerde desteklenmeyen seçeneği ararsın. Bu seçenek metne açıkça aykırı olabilir veya doğruluğu hakkında yeterli bilgi bulunmayabilir. İkisi de olumlu kanıtla doğrulanmış seçeneklerden farklıdır.",
          "Olumsuz kökte metindeki olumsuz bir bilgiyi otomatik seçme. “Henüz yayımlanmadı” metinde açıkça yazıyorsa yayımlanmamış olması destekli bir bilgidir. Doğru seçenek, kökün tam istediğine göre metinde bulunmayan veya metne uymayan iddiadır. Son kontrolde kökü cevabınla birlikte oku ve hangi iddianın kanıt eksiği taşıdığını söyle.",
        ],
      },
      {
        title: "Zaman sınırını koru",
        paragraphs: [
          "Bir sonuç “denemenin ilk gününde”, “geçen kış” veya “bu sürümde” gözlenmiş olabilir. Bu kayıt aynı sonucun bütün dönemlerde geçerli olduğunu söylemez. Çoklu sorularda bir soru ilk günün verisini, diğeri geleceğe dair çıkarımı isteyebilir; aynı sayıyı iki kökte aynı genişlikle kullanamazsın.",
          "Zaman ifadelerini yalnız takvim ayrıntısı olarak görme; bunlar yargının sınırıdır. “Henüz” gelecekte mutlaka olacağı anlamına gelmez, “artık” da geçmişin her anının aynı olduğunu kanıtlamaz. Her seçeneğin zamanını metnin zamanı ile eşleştir. Metin geleceğe dair karar verilmediğini söylüyorsa tahmini kesin plan diye sunma.",
        ],
      },
      {
        title: "Nicelik sözlerini dikkatle oku",
        paragraphs: [
          "Bazı, çoğu, bütün, en az ve yalnız sözleri aynı nicelik ilişkisini kurmaz. “Bazı dinleyiciler not aldı” herkesin not aldığını gerektirmez; herkesin not almadığını da kesin söylemez. Türkçedeki günlük sezgiler yerine sorunun verdiği açık kapsamı koru.",
          "“Çoğu” belirli grubun yarıdan fazlasını belirtir; bu bilgi başka bir gruba taşınmaz. “En az beş” sayının beş veya daha fazla olmasına izin verir, tam beş demek değildir. İki soruda aynı niceleyiciye farklı iddia eklenebilir. Seçeneğin tamamında kim, kaç, ne zaman ve hangi eylem sınırlarının aynı kaldığını denetle.",
        ],
      },
      {
        title: "Birlikte değişim neden kanıtı değildir",
        paragraphs: [
          "Bir uygulamadan sonra bir sonuç görülmesi, o sonucun tek nedeninin uygulama olduğunu tek başına kanıtlamaz. Aynı dönemde koşullar değişmiş veya ölçülen grup farklılaşmış olabilir. Metin neden konusunda temkinliyse bu tutumu “hiç sonuç yok” diye de çevirmemelisin.",
          "Bir soruda gözlenen değişimi doğrudan seçebilir, ötekinde bu değişime ilişkin kesin neden iddiasını reddedebilirsin. Bu iki yanıt çelişmez; birinde olayın varlığı, ötekinde açıklamasının kanıtı tartışılır. Nedenselliğe ilişkin ek karşılaştırma verilmişse onun kapsamını da koru; deney adı geçmesi sınırsız genelleme hakkı vermez.",
        ],
      },
      {
        title: "Sözün sahibini koru",
        paragraphs: [
          "Yazar başka bir kişinin görüşünü aktarabilir ve ardından ona katılmayabilir. Tırnak içinde verilen bir iddia her zaman yazarın kendi düşüncesi değildir. Görüş sorularında önce konuşanı belirle; aktarılan kişi, anlatıcı ve yazarın açık değerlendirmelerini ayrı tut.",
          "“Eleştirmenler böyle der, ben ise...” kuruluşunda ilk iddiayı yazarın savı yapmak anlamı ters çevirir. Bir soru aktarılan görüşü, diğeri yazarın ona karşı tutumunu sorabilir. Aynı cümleleri kullanarak iki farklı özneye ait sonuçlar kurarsın. Her seçenekte yüklemin kime bağlandığını açıkça kontrol et.",
        ],
      },
      {
        title: "Karşıtlık ve sınırlama",
        paragraphs: [
          "Ama, ancak, oysa, buna rağmen gibi bağlar bir önceki yargının yönünü değiştirebilir veya onu sınırlayabilir. “Hızlıdır ama her metne uygun değildir” cümlesi hem hız hem uygunluk sınırı verir. “Yöntem hiçbir işe yaramaz” sonucu da “her yerde kullanılmalıdır” sonucu da bu cümleyi bozabilir.",
          "Karşıtlığı gördüğünde ilk tarafı silme; iki tarafın ilişkisini koru. Bir soru yöntemin avantajını, bir diğeri kullanım koşulunu isteyebilir. Sadece son cümleyi okumak avantajı, sadece ilkini okumak sınırı kaçırabilir. Doğru cevap, sorunun istediği tarafı öteki tarafı inkâr etmeden açıklayabilmelidir.",
        ],
      },
      {
        title: "Bir sözün işlevini bağlamdan bul",
        paragraphs: [
          "Bir mecaz, benzetme veya kısa söz paragrafta neyi görünür kılıyorsa işlevi odur. “Metne pencere açmak” gerçek bir binaya müdahale etmek değil, bağlama göre yeni bir bakış veya erişim sağlamak olabilir. Sözlük anlamıyla yetinmek de her mecaza aynı soyut anlamı vermek de güvenli değildir.",
          "Sözün öncesini ve sonrasını düz cümleye çevir. “Bu ifade çıkarılsa yazarın hangi karşılaştırması veya vurgusu zayıflar?” diye sor. Çoklu metin setinde sözün işlevini bulduğun cevap ana düşünce sorusunun hazır cevabı olmayabilir; yerel işlevi bütünün yargısıyla ilişkilendir, fakat ikisini aynı görev sayma.",
        ],
      },
      {
        title: "İki metni aynı ölçütle karşılaştır",
        paragraphs: [
          "Ortak parçanın içinde iki sanatçı, iki yöntem veya iki döneme ilişkin kısa anlatımlar bulunabilir. Ortak yön sorusunda ikisinde de açık dayanak ara. Birinde bulunan özelliği diğerine taşımak ortaklık kurmaz; farklılık sorusunda ise karşılaştırmanın hangi ölçüte göre yapıldığını belirt.",
          "Aynı sözcüklerin kullanılmaması aynı ilişkinin bulunmadığını göstermez. Örneğin iki anlatıda da okurun tamamlamasına bırakılmış bir alan bulunabilir. Buna karşılık ikisinin bütün görüşlerinin aynı olduğu sonucu çıkmaz. Her iki taraf için ayrı kanıt satırı yaz ve yalnız kesişen özelliği ortak yön olarak seç.",
        ],
      },
      {
        title: "Veri ve yöntem soruları",
        paragraphs: [
          "Parçada bir çizelgenin verileri veya bir araştırmanın adımları düz metinle verilebilir. Önce birim ve ölçülen şeyi ayır: ziyaret sayısı kişi sayısı olmayabilir, örnek sayısı deney tekrarıyla aynı şey olmayabilir. Metnin vermediği toplamı veya birimi önceki sorudan türetme.",
          "Bir soruda sayısal karşılaştırma, diğerinde yöntemin sınırı istenebilir. Hesaplanmış farkın doğru olması neden yorumunun da doğru olduğunu göstermez. Hesabın hangi kayıtları kullandığını açık tut; eksik veya bilinmeyen veriyi sıfır diye doldurma. Kökün istediği işlem ile kullanılan veri aynı kapsamda buluşmalıdır.",
        ],
      },
      {
        title: "Yanlışı ilk bozulan bağdan onar",
        paragraphs: [
          "Yanlış bir cevap gördüğünde yalnız anahtarı ezberlemek yerine ilk kopan bağı bul: soru hedefi mi değişti, sözün sahibi mi karıştı, kapsam mı büyüdü, yoksa kanıt yerine önceki seçenek mi kullanıldı? Bu ayrım, bir sonraki soruda hangi kontrolü uygulayacağını belirler.",
          "Aynı metindeki doğru çözdüğün soruyu yeniden anlatmak hatalı soruyu onarmaz. Hatalı kökü yeniden yaz, gerekli cümleyi bul ve seçeneğin yalnız bozuk bölümünü düzelt. Ardından farklı bir pasajda aynı işlemi dene. Doğru şıkkı daha önce görmek ile yeni metinde bağımsız kanıt kurmak farklı gözlemlerdir.",
        ],
      },
      {
        title: "Desteği azaltarak bağımsız çöz",
        paragraphs: [
          "İlk çözümlü örnekte soru hedefi, cümle kanıtı ve kapsam denetimini sırayla aç. Sonraki örnekte yalnız takıldığın basamağı oku. Ardından yeni bir soru kartında tam pasajı kullanarak kendi gerekçeni oluştur; önceki örneğin cümlesini hazır sonuç diye kopyalama.",
          "Etkileşimli modelde soru değiştiğinde tahmin ve açıklama yeniden kurulur. Bu keşif bir sınav sonucu veya konu tamamlama kaydı üretmez. Geri çağırma sorularında yöntemi metne bakmadan anlatabilir, sonra eksik kalan ayrımı tekrar okuyabilirsin. Çalışma süresi ve ekrana bakmak tek başına öğrenildiği anlamına gelmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Takvim ile amacı ayrı çöz",
        prompt:
          "Okul korosu yeni parçayı önce küçük gruplarla, sonra bütün koroyla çalıştı. Şef, küçük grup çalışmasını ses girişlerini tek tek duyabilmek için seçti. Son konserin seyirci sayısı henüz bilinmiyor.\n1) Küçük grup çalışmasının amacı nedir? A) Her sesin girişini duyabilmek B) Seyirci sayısını ölçmek C) Konseri iptal etmek D) Bütün sesleri susturmak E) Çalışmayı yalnız şefle yapmak\n2) Hangisi kesin bilinmez? A) Küçük grup çalışıldığı B) Sonra bütün koroyla çalışıldığı C) Şefin bir amaç açıkladığı D) Konserin seyirci sayısı E) Yeni parçanın çalışıldığı",
        strategy: "İlk kökte amaç, ikincide bilinmeyen ayrıntı ara.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Birinci kök yöntemin sırasını değil, küçük grupla başlamanın hedefini sorar; ikinci cümle ses girişlerini duyabilmek der.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "1. soruda A hedefi karşılar. Seyirci ölçümü, iptal, susturma ve yalnız şefle çalışma bilgisi verilmemiştir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "İkinci kökte henüz bilinmeyen veri seyirci sayısıdır; öteki dört seçenek gerçekleşen çalışma ve açık amaç bilgisidir.",
          },
          {
            label: "Cevabı kontrol et",
            explanation:
              "2. soruda D seçilir. İlk sorunun A olması ikinci sorunun kanıtı değildir; iki köke ayrı cümle kullandık.",
          },
        ],
        answer: "1=A; 2=D.",
        check:
          "Amaç ve bilinmeyen sayı için farklı kanıt cümlelerini gösterebiliyor musun?",
        pitfall:
          "İlk sorunun çalışma amacını ikinci sorunun bilinmeyen sayısının yerine koymak.",
      },
      {
        title: "Övgü, sınırsız öneri değildir",
        prompt:
          "Bir tasarımcı karton maketin hızlı kurulmasını yararlı buluyor. Ancak yağmurlu açık hava denemesinde aynı malzemenin uygun olmadığını belirtiyor. Kalıcı dış mekân yapıları için başka malzeme araştıracağını söylüyor.\n1) Tutumu hangisidir? A) Karton her koşulda üstündür B) Yararını kabul ederken kullanım sınırı koyar C) Maketleri bütünüyle reddeder D) Yağmuru önleyebileceğini söyler E) Kalıcı yapı bitmiştir\n2) Hangi öneri görüşüyle uyuşmaz? A) Hızlı kurulum değerlendirilebilir B) Ortam koşulu önemlidir C) Malzeme seçimi amaca bağlıdır D) Karton yağmurlu dış ortamda her işte zorunlu kullanılmalıdır E) Başka malzeme incelenebilir",
        strategy:
          "Tutum için iki tarafı, uyumsuz öneri için açık sınırı birlikte oku.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Hızlı kurulum olumlu değerlendirilir; yağmurlu dış ortam için uygunluk sınırı konur.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "1. soruda B iki yönü taşır; A sınırsızlaştırır, C olumlu yönü siler, D-E yeni gerçekleşme ekler.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "İkinci kökte görüşle uyuşmayan öneri aranır; D yağmurlu ortamda her işe karton zorunluluğu getirir.",
          },
          {
            label: "Cevabı kontrol et",
            explanation:
              "2. soruda D seçilir. A-C ve E olumlu yön ile sınırı koruyan olasılıklardır.",
          },
        ],
        answer: "1=B; 2=D.",
        check:
          "İkinci sorunun cevabı için hangi kullanım koşulu belirleyici oldu?",
        pitfall:
          "Bir malzemenin tek yararını, bütün ortamlarda koşulsuz kullanım zorunluluğuna çevirmek.",
      },
      {
        title: "Aktarılan görüş ile yazarın sözü",
        prompt:
          "Bir dergi yazısı şöyle diyor: “Bazı yorumcular kısa notların bütün ayrıntıları yok ettiğini savunuyor. Ben, iyi seçilmiş kısa notun okuru ana belgeye yönlendirebildiğini düşünüyorum. Kısa not, belgenin yerini almak zorunda değildir.”\n1) Yazarın görüşü nedir? A) Bütün yorumcularla aynıdır B) Ana belgeler gereksizdir C) Kısa not yönlendirici olabilir D) Her not ayrıntıyı yok eder E) Kısa notlar yasaklanmalıdır\n2) İlk cümlenin işlevi nedir? A) Tarih vermek B) Yazarın tartışacağı görüşü aktarmak C) Sayısal kanıt göstermek D) Belgeyi tanımlamak E) Yazarın mesleğini açıklamak",
        strategy:
          "Görüşün sahibini etiketle; sonra cümlenin metindeki rolünü belirle.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Bütün ayrıntıları yok etme savı yorumculara aittir; yazar kendi düşüncesini “Ben” ile ayırır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "1. soruda C yönlendirme imkânını korur; diğerleri yazarın sınırlı savını değiştirir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "İlk cümle sonraki karşı görüşün başlangıç noktasıdır; tarih, sayı, tanım veya meslek bilgisi sunmaz.",
          },
          {
            label: "Cevabı kontrol et",
            explanation:
              "2. soruda B seçilir. Aynı pasajda biri tutum, biri söyleyiş işlevi olmak üzere iki ayrı işlem yaptık.",
          },
        ],
        answer: "1=C; 2=B.",
        check: "“Ben” sözcüğünün ayırdığı savı yorumculara taşımadın mı?",
        pitfall:
          "Tırnak içindeki ilk savı konuşan kişi kontrolü yapmadan yazarın ana düşüncesi saymak.",
      },
      {
        title: "Sayı ile yorumun sınırı",
        prompt:
          "Bir gözlem defterine yalnız cumartesi günü on bir tekne geçişi yazılmıştır. Aynı tekne birden fazla kez geçmiş olabilir; tekne kimlikleri kaydedilmemiştir. Gözlem pazar günü yapılmamıştır.\n1) Kesin veri hangisidir? A) On bir farklı tekne vardır B) Pazar sıfır tekne geçmiştir C) Bütün hafta gözlenmiştir D) Cumartesi on bir geçiş kaydedilmiştir E) Her geçiş başka tekneye aittir\n2) Hangi ek kayıt farklı tekne sayısını belirlemede doğrudan yararlıdır? A) Her geçişte tekne kimliği B) Defterin rengi C) Gözlemcinin yaşı D) Kalemin markası E) Sayfanın kalınlığı",
        strategy:
          "Geçiş sayısını farklı nesne sayısından ayır; yeni soruda eksik değişkeni ara.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "İlk cümlenin ölçtüğü nicelik geçiştir; kimlik bilgisi bulunmadığı açıkça belirtilir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "1. soruda D doğrudan kaydı söyler; A ve E tekrarları yok sayar, B ve C gözlenmeyen zamanı veri yapar.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "Farklı tekne sayısında hangi geçişlerin aynı tekneye ait olduğunu ayırmak gerekir; kimlik kaydı bu ilişkiyi sağlar.",
          },
          {
            label: "Cevabı kontrol et",
            explanation:
              "2. soruda A seçilir. Defter ve kalem özellikleri ölçülen kimlik eksikliğini kapatmaz.",
          },
        ],
        answer: "1=D; 2=A.",
        check:
          "On bir sayısını her iki soruda da aynı niceliğin adıyla mı kullandın?",
        pitfall:
          "Geçişlerin toplamını tekne kimlikleri olmadan farklı tekne sayısına eşitlemek.",
      },
      {
        title: "Bir benzetmenin iki ayrı görevi",
        prompt:
          "Bir zanaatkâr, çırak sorusunu “kapıyı aralayan el” diye adlandırıyor: ona göre iyi soru yeni denemeye başlatır ama bütün çözümü hazır vermez. Denemede yanlış çıkan sonuçların da bir sonraki soruyu doğurabileceğini ekliyor.\n1) Benzetme neyi vurgular? A) Bütün kapıların onarılmasını B) Elin ölçüsünü C) Sorunun araştırmaya başlangıç açmasını D) Yanlışın yasak olmasını E) Çırağın susmasını\n2) Bu görüşle hangi yargı uyuşur? A) İyi soru bütün cevabı baştan hazır verir B) Yanlış deneme yeni soruya kaynak olabilir C) Her deneme mutlaka doğrudur D) Tek bir sorudan sonra araştırma biter E) Denemeye gerek yoktur",
        strategy:
          "Yerel benzetmeyi düz anlama çevir; ikinci kökte yeni cümlenin desteğini kullan.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "“Kapıyı aralamak” burada gerçek onarım değil, yeni denemeye başlangıç sağlama işidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "1. soruda C doğrudur; diğerleri mecazı gerçek anlamla veya metne aykırı yasakla değiştirir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "Son cümle yanlış sonuçların yeni soruya yol açabileceğini açıkça söyler; hazır çözüm ve araştırmanın bitmesi iddialarıyla uyuşmaz.",
          },
          {
            label: "Cevabı kontrol et",
            explanation:
              "2. soruda B seçilir. İlk kökün benzetme işlevi ile ikinci kökün destekli yargısı ayrı açıklanır.",
          },
        ],
        answer: "1=C; 2=B.",
        check:
          "Benzetmenin anlamını gösterirken son cümledeki olasılık sınırını korudun mu?",
        pitfall:
          "Benzetmeyi gerçek bir kapı işlemi veya bütün çözümün hazır verilmesi diye okumak.",
      },
      {
        title: "Ortak ölçüt, farklı örnek",
        prompt:
          "Bir metin iki fotoğrafçıyı karşılaştırır: İlki gece çekiminde ışığı azaltıp gölgeyi belirginleştirir; ikincisi gündüz yansımayı perdeyle keserek benzer bir gölge vurgusu kurar. Metin iki sanatçının bütün tercihlerinin aynı olduğunu söylemez.\n1) Ortak yön nedir? A) Aynı saatte çekim B) Aynı araç C) Aynı mekân D) Bütün eserlerin eşitliği E) Işığı düzenleyerek gölge vurgusu kurma\n2) Hangi bilgi verilmemiştir? A) İlkinde gece çekildiği B) İkincide perde kullanıldığı C) Gölgenin vurgulandığı D) İki sanatçının yaşları E) İlkinde ışığın azaltıldığı",
        strategy:
          "Her iki örnekte aynı ilişkiye kanıt bul; başka soruda eksik alanı ayrı ara.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "İlk sanatçı ışığı azaltır, ikincisi yansımayı keser; ortak sonuç gölge vurgusudur.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "1. soruda E iki örnekte de desteklidir; saat, araç ve bütün eser özdeşliği kurulmamıştır.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "Gece çekimi A’yı, perde B’yi, gölge vurgusu C’yi ve ilkinde ışığın azaltılması E’yi destekler; yaş bilgisi verilmez.",
          },
          {
            label: "Cevabı kontrol et",
            explanation:
              "2. soruda yalnız D kanıtsızdır; ilk fotoğrafçının hangi aracı kullandığı söylenmemesi, E’deki açık ışık azaltma bilgisini değiştirmez.",
          },
        ],
        answer: "1=E; 2=D.",
        check:
          "Ortak yön için iki ayrı dayanak gösterip yaşı boş bırakabildin mi?",
        pitfall:
          "Bir ortak sonucun bütün kişisel ve sanatsal özelliklerin aynı olduğunu kanıtladığını sanmak.",
      },
    ],
    recall: [
      {
        prompt:
          "Aynı metindeki ikinci sorunun kanıtı neden birinci sorunun seçeneği değildir?",
        answer:
          "Her soru kendi kökü ve tam pasajla gerekçelendirilir; ilk seçenek yanlış olabilir veya başka bir ilişkiyi ölçebilir.",
      },
      {
        prompt:
          "Olumsuz kökte metindeki olumsuz bir cümle otomatik doğru cevap mıdır?",
        answer:
          "Hayır. Açıkça verilen olumsuz bilgi de desteklidir; kök desteklenmeyen veya uyuşmayan yargıyı isteyebilir.",
      },
      {
        prompt:
          "Bir seçeneğin iki iddiasından yalnız biri kanıtlanıyorsa ne yaparsın?",
        answer:
          "İki iddiayı ayrı denetlerim; bütün seçenek doğrulanmış sayılmaz.",
      },
      {
        prompt: "Gözlenen artış ile bu artışın nedeni hangi açıdan ayrılır?",
        answer:
          "Artış olay bilgisidir; kesin neden için ayrıca uygun karşılaştırma ve diğer koşullara ilişkin kanıt gerekir.",
      },
      {
        prompt: "Aktarılan görüşün sahibini nasıl bulursun?",
        answer:
          "Atıf, tırnak ve karşı görüş sözlerini izleyip her savı konuşan kişiye bağlarım.",
      },
      {
        prompt: "Soruları ters sırada çözebilmek neyi denetler?",
        answer:
          "İkinci yanıtı ilk seçeneğe değil, kendi kökü ve pasaj kanıtına dayandırabildiğimi denetler.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri, Paragrafta Anlam; OGM 12. Sınıf Paragrafta Anlam. Metin, veri ve alıştırmalar özgün öğretim içeriğidir; resmî sınav sorusu değildir.",
  },
  {
    id: "paragrafta-konu",
    title: "Paragrafta konu: ortak odağı ve kapsamı bul",
    minutes: 110,
    objectives: [
      "Konu, ana düşünce, başlık ve ayrıntıyı görevlerine göre ayır.",
      "Her önemli cümlenin ortak odağını kendi sözlerinle adlandır.",
      "Çok geniş, çok dar ve metin dışı konu adaylarını gerekçeyle ele.",
      "Örnek, karşıtlık ve farklı bakışları tek odak altında yorumla.",
    ],
    sections: [
      {
        title: "Konu neyi adlandırır?",
        paragraphs: [
          "Konu, bir metnin üzerinde durduğu olay, durum, kavram veya ilişkidir. “Bu metin ne hakkında?” sorusuna verilen cevaptır. “Tamircilerin deneyim aktarma yolları” bir konu adlandırmasıdır; metin bu yolların yararlı, sorunlu veya değişken olduğunu ayrıca savunabilir. Konu ile o konu hakkındaki yargıyı ayrı tut.",
          "Konu yalnız tek nesnenin adı olmak zorunda değildir. Bir karşılaştırma, dönüşüm, sorun veya ilişki de konu olabilir. “Bisiklet” demek çok geniş kalırken “kentte bisiklet bakımının ortak atölyelerde öğrenilmesi” metnin gerçekten açıkladığı yönü gösterebilir. Doğru kapsam, yalnız kısa olmaya veya uzun olmaya göre belirlenmez.",
        ],
      },
      {
        title: "Konu ve ana düşünce",
        paragraphs: [
          "Konu üzerinde konuşulan alanı; ana düşünce bu alanda iletilen temel yargıyı gösterir. “Çeviride dipnot kullanımı” konu, “Dipnot ancak gerekli bağlamı tamamladığında yararlıdır” ana düşünce olabilir. Aynı konudaki iki yazar farklı temel görüşler savunabilir.",
          "Ad öbeği ile yargı cümlesi ayrımı başlangıçta yardımcıdır; tek başına mekanik bir anahtar değildir. Bir seçenek cümle biçiminde yazıldığı hâlde konuya ilişkin açıklayıcı bir özet olabilir. Önce kökün neyi istediğini, sonra seçeneğin metindeki odağı mı yoksa temel savı mı üstlendiğini incele.",
        ],
      },
      {
        title: "Konu ve başlık",
        paragraphs: [
          "Başlık metni kısa biçimde tanıtır; konu ve temel vurguya bağlıdır. Her başlık konunun bütün ayrıntılarını saymak zorunda değildir. Fakat yalnız dikkat çekici olduğu için metnin işlemediği başka bir alanı öne çıkaran başlık uygun olmaz. “Sessiz Harfler” şiir üzerine bir metinde anlamlı olabilirken her dil metnine uygun değildir.",
          "Başlık adayını seçerken metnin temel nesnesi ve ayırt edici yönünü birleştir. Konu “kaset kayıtlarının korunmasında ortam koşulları” ise yalnız “Müzik” başlığı ayırt edici odağı kaybeder. Metinde sanatçının yaşamı anlatılmıyorsa onun biyografisini ima eden başlık da veri ekler. Başlık, içerikle karşılıklı doğrulanmalıdır.",
        ],
      },
      {
        title: "Her cümlenin katkısını bul",
        paragraphs: [
          "Her cümleye bir veya birkaç sözcüklük katkı notu yaz: sorunu tanıtma, nedeni açıklama, örnek verme, yöntem sunma veya sınır koyma. Sonra bu katkıların hangi ortak alanı geliştirdiğini belirle. Konu, yalnız en çok tekrar edilen sözcük sayılarak bulunmaz.",
          "Bir metinde “su” birkaç kez geçse bile asıl odak depolama değil, suyu anlatan şiirlerin dil özellikleri olabilir. Cümlelerin neyi açıkladığını eylemleri ve ilişkileriyle birlikte oku. Aday konuyu her cümleye geri uyguladığında temel cümlelerin neden o metinde bulunduğu açıklanabilmelidir.",
        ],
      },
      {
        title: "Geniş alan ve özel yön",
        paragraphs: [
          "Bilim, sanat, doğa veya eğitim gibi sözcükler bir metnin genel alanını gösterebilir. Konu sorusu ise çoğu zaman o alanın metinde ele alınan özel yönünü ister. Eğitim hakkındaki bir metin yalnız öğretmen geribildiriminin zamanını tartışıyorsa bütün eğitim sorunlarını konu diye yazmak gereğinden geniştir.",
          "Konu adayına “bu alanın hangi yönü?” sorusunu uygula. Metnin vermediği düzeyde ayrıntı ekleme; her cümle tek bir uygulamayı açıklıyorsa o uygulamanın amacı ve yöntemi uygun kapsam olabilir. Daha fazla sözcük içeren seçeneği otomatik doğru sayma. Genişliğin ölçütü metindeki önemli ilişkileri taşımasıdır.",
        ],
      },
      {
        title: "Fazla dar adayı tanı",
        paragraphs: [
          "Bir örneğin kişi adı, bir nesnenin rengi veya tek bir uygulamanın tarihi metinde geçebilir. Bunlar konuya destek veren ayrıntılarsa metnin tamamını temsil edemez. Üç farklı bölgede anlatıcılık geleneklerini tartışan paragrafı yalnız bir köydeki masal akşamına indirgemek öteki cümleleri dışarıda bırakır.",
          "Dar adayın hangi cümleyi iyi açıkladığını ve hangilerini dışarıda bıraktığını göster. Böylece elemen “çok kısa” gibi belirsiz bir yargıya dayanmaz. Metnin kendisi yalnız o tek ayrıntıyı inceliyorsa dar görünen adlandırma doğru da olabilir. Kapsamı seçenek uzunluğundan değil, metnin işlediği bilgi alanından çıkar.",
        ],
      },
      {
        title: "Fazla geniş adayı tanı",
        paragraphs: [
          "Bir konu adayı metnin ait olduğu genel alanı taşıyabilir, fakat ayırt edici yönü söylemeyebilir. “Kent yaşamı” kentteki ortak tamir masalarının işleyişini anlatan metne uzaktan ilişkilidir; konunun özel odağını belirlemez. “Bütün kentlerin bütün sorunları” ise metnin hiç kapsamadığı alanları da ekler.",
          "Geniş adayı daraltırken metnin cümlelerini dışlamadan sınır koy. Yer, dönem, etkinlik veya ilişki adlandırması yardımcı olabilir. Önemli olan en küçük kelime sayısı değil, aynı kapsamı açıkça kurmaktır. Bir seçenek bütün cümlelere gevşek biçimde değiyor diye en uygun konu sayılmaz; neyi açıkladığı belirgin olmalıdır.",
        ],
      },
      {
        title: "Metin dışı ayrıntıyı ele",
        paragraphs: [
          "Bir metin fotoğrafların nasıl saklandığını anlatırken fotoğraf makinelerinin satış fiyatını vermeyebilir. İki alan aynı nesne çevresinde olsa da ayrı konulardır. Seçeneğin metne yakın görünmesi onun metnin konusu olduğuna kanıt değildir. Her eklenen ilişki için gerçek cümle dayanağı ara.",
          "Özellikle neden, amaç veya sonuç içeren konu adları dikkat ister. “Yeni yöntemin başarıyı artırması” ifadesi yalnız yöntemin uygulandığı bir metne başarı ölçümü ekleyebilir. Metinde yöntem ve hedef varsa bunları koru; hedefin gerçekleştiği sonucunu konu adına gizlice yerleştirme. Konu adlandırması da kanıt sınırına uymalıdır.",
        ],
      },
      {
        title: "İlk cümle bir ipucudur",
        paragraphs: [
          "İlk cümle çoğu metinde odağa giriş yapar; fakat her zaman konuyu bütünüyle vermez. Bir anı, soru veya örnekle başlayan metin daha sonra farklı bir genel ilişkiye yönelebilir. İlk cümledeki bir nesneyi bulup devamını okumadan konu seçmek bu yön değişimini kaçırabilir.",
          "Giriş cümlesini gelişme ve sonuçla birlikte değerlendir. İlk örneğin hangi genel soruna açıldığını izle. Son cümle de her zaman tek başına anahtar değildir; bir sınır veya yan ayrıntı olabilir. Konuyu baştaki ve sondaki sözcükleri birleştirerek değil, metin boyunca sürdürülen ortak odağı bularak kur.",
        ],
      },
      {
        title: "Örnek ve ortak ilke",
        paragraphs: [
          "Bir paragraf iki farklı ustanın deneyimini anlatarak meslek bilgisinin aktarılmasını açıklayabilir. Ustaların adları ve kullandıkları araçlar değişse de örneklerin ortak ilişkisi aynı kalır. Konu, bu ilişkinin uygun genişlikte adlandırılmasıyla bulunur.",
          "Örneği çıkardığında kalan açıklamayı ve öteki örnekleri incele. Tek örnek bütün konu sayılmaz; ancak örnekler metnin odağı hakkında kanıt sunar. Ortak konu bulmak, bütün örneklerin her özellikte aynı olduğunu söylemek değildir. Yalnız aynı soruya katkı veren yönleri ortaklaştır.",
        ],
      },
      {
        title: "Karşıt görüşler de aynı konuya aittir",
        paragraphs: [
          "Bir metinde iki kişi bir yöntemin kullanımını farklı değerlendirebilir. Biri hızını över, diğeri ayrıntı kaybını eleştirir. Görüşleri karşıt olsa da tartışmanın konusu aynı yöntem ve onun kullanım sonuçları olabilir. Konuyu yalnız bir tarafın savıyla adlandırmak metnin yarısını dışarıda bırakır.",
          "Önce iki tarafın hangi ortak soruya cevap verdiğini yaz. Sonra düşünce farkını bu sorunun altında göster. Yazar bir tarafa katılıyorsa ana düşünce sorusunda o tutum önemlidir; konu sorusunda ise ortak tartışma alanı korunur. “İki kişi aynı konuda konuşuyorsa aynı fikirdedir” sonucu kurulamaz.",
        ],
      },
      {
        title: "Yakınma ve eleştiri odağı",
        paragraphs: [
          "“Neden yakınılıyor?” biçimindeki soru metnin olumsuz değerlendirdiği durumu adlandırmanı ister. Konu alanının yanında eleştirinin yönü de görünür olmalıdır. Metin hızlı karar verilmesini eleştiriyorsa yalnız “kararlar” demek yakınmanın ne olduğunu açıklamaz.",
          "Eleştirilen durumun yerine metinde önerilen çözümü koyma. Bir yazar yetersiz kayıt tutmaya karşı belge düzeni önerebilir; yakınma sorusunun cevabı belge düzeninin yararı değil, kayıtların düzensizliğidir. Yazarın tüm yaşamına veya bütün kurumlara genelleme yapmadan hangi davranışın eleştirildiğini göster.",
        ],
      },
      {
        title: "Zamanla değişen bir uygulama",
        paragraphs: [
          "Metin geçmişteki bir yöntemi ve bugünkü kullanımını karşılaştırıyorsa konu zaman içindeki dönüşüm olabilir. Yalnız eski dönemi veya yalnız yeni aracı seçmek karşılaştırmayı eksiltir. “El notlarından ortak dijital çizelgeye geçiş” iki ucu birlikte taşıyabilir.",
          "Dönüşümün anlatılması yeni yöntemin her bakımdan üstün olduğu anlamına gelmez. Metin hız, erişim veya hata türlerinden hangisini işliyorsa konuya o yönü ekle. Henüz ölçülmemiş bir başarıyı kesin sonuç diye yazma. Tarih bilgisi yoksa başlığa belirli bir yüzyıl veya yıl eklemek de aynı tür veri genişletmesidir.",
        ],
      },
      {
        title: "Birden çok bakışı birleştir",
        paragraphs: [
          "Bir sorun hakkında kullanıcı, tasarımcı ve bakım görevlisinin farklı kaygıları anlatılabilir. Ortak konu bu farklı sözlerin dönüp durduğu karar veya uygulamadır. Kişilerin mesleklerini listelemek tek başına konu bulmak değildir; niçin aynı paragrafta olduklarını açıklamak gerekir.",
          "Birleştirici aday her görüşü aynılaştırmamalıdır. Kullanıcı erişim, tasarımcı görünüş, bakım görevlisi dayanıklılık üzerinde duruyorsa konu bu ölçütlerle değerlendirilen tasarım olabilir. “Herkes aynı projeyi onayladı” sonucu, yalnız görüşlerin birlikte sunulmasından çıkmaz. Karar verilmediyse konu adına kesin uygulama sonucu ekleme.",
        ],
      },
      {
        title: "İki konu adayını cümlelerle sınama",
        paragraphs: [
          "Birbirine yakın iki seçenek kaldığında ikisini de her temel cümleye uygula. Hangisi cümlelerin ortak amacını daha açık gösteriyor, hangisi bir bölümünü dışlıyor veya yeni bir iddia ekliyor? Bu karşılaştırmayı yalnız kelime benzerliğiyle yapma.",
          "Bir aday tüm cümlelerde aynı sözcüğü bulabilir ama ilişkileri açıklamayabilir. Öteki aday farklı sözcüklerle aynı yöntemi, sorunu veya dönüşümü adlandırabilir. Son kararda iki testi birlikte kullan: kapsama ve metne dışarıdan alan eklememe. Kapsayıcılık metinde bulunmayan her şeyi eklemek demek değildir.",
        ],
      },
      {
        title: "Konu çıkarma ve özet",
        paragraphs: [
          "Kısa özet ana bilgileri yeniden kurar; konu adlandırması ise bu bilgilerin hangi ortak alanı işlediğini belirtir. Konuyu söylemek için bütün ayrıntıları tekrar etmek gerekmez. Ancak ayrıntıları hiç anlamadan tek bir etiket koymak da odağı kaçırabilir.",
          "Önce cümlelerin ne anlattığını kısa notlarla çıkar, sonra ortak odağı bir adlandırmada birleştir. “Neyin hangi yönü?” sorusu yardımcıdır: ses kayıtlarının hangi yönü, saklama koşulları; bir metnin hangi yönü, dipnotlarının işlevi. Ana düşünce istendiğinde bu odak hakkında kurulan temel yargıya ayrıca geç.",
        ],
      },
      {
        title: "Kapsamı değiştiren küçük sözler",
        paragraphs: [
          "“Yalnız”, “bazı”, “yerel”, “ilk deneme” gibi sözler uygun konunun sınırını daraltabilir. “Yerel ağızların bir belgedeki yazımı” metnini bütün dil tarihinin konu edildiği biçiminde okumak kapsamı büyütür. “Da” sözü ise önceki işlevin tamamen kaldırılmadığını gösterebilir.",
          "Konu adını son kez metne geri koy ve onu bozacak küçük bir sınırlama olup olmadığını ara. Bir süreç yalnız önerildiyse “uygulanmış olması” diye adlandırma; iki örnek verilmişse “ülke çapındaki bütün örnekler” deme. Konu belirlerken nicelik, zaman ve gerçekleşme durumu düşünceyi değiştiren gerçek verilerdir.",
        ],
      },
      {
        title: "Yeni metinde bağımsız denetim",
        paragraphs: [
          "Etkileşimli alanda farklı konu adaylarının cümle kapsamını incele. Bir adayın hangi cümleyle uyuştuğunu görmen, o adayı bütün metnin konusu yapmaya yetmeyebilir. İlgili bütün cümleleri ve adayın eklediği iddiayı birlikte değerlendir.",
          "Çözümlü örnekte açıklanan metni ezberlemek yerine aynı yöntemi yeni bir pasajda uygula. Geri çağırırken konu ile ana düşünceyi kendi farklı örneğinle anlat. Yanlışta ilk dışlanan cümleyi veya eklenen alanı belirle; yalnız doğru başlığı tekrar etme. Bu çalışma bir kişi hakkında genel okuma başarısı ölçümü değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Yalnız ilk nesneyi seçme",
        prompt:
          "Bir marangoz eski bir sandalyeyi göstererek başlıyor. Ardından çırakların ölçü alma, hata notu tutma ve denemeyi yeniden yapma yollarını anlatıyor. Sandalyenin hangi ağaçtan olduğu üzerinde durmuyor.\nParçanın konusu hangisidir? A) Sandalye ağacının türleri B) Ahşap fiyatları C) Marangozlukta öğrenme ve deneme yolları D) Bütün mesleklerin tarihi E) Sandalye renkleri",
        strategy:
          "Giriş nesnesini sonraki cümlelerin ortak amacıyla karşılaştır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Sandalye bir başlangıç örneğidir; devamdaki eylemler ölçme, hata kaydı ve yeniden denemedir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Bu eylemler çırakların öğrenme biçimini açıklar; malzeme türü veya renk bilgisi verilmez.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "C bütün temel eylemleri ortak odakta toplar; A, B, D ve E nesne ayrıntısı veya metin dışı alan ekler.",
          },
        ],
        answer: "C: Marangozlukta öğrenme ve deneme yolları.",
        check:
          "Adayın ölçme, hata kaydı ve yeniden denemeyi aynı anda kapsıyor mu?",
        pitfall:
          "İlk cümledeki somut nesneyi metnin devamındaki ortak ilişkinin yerine geçirmek.",
      },
      {
        title: "Konu ile savı iki kutuya yaz",
        prompt:
          "Bir müzik yazısı, eserlerde sessiz aralıkların nasıl kullanıldığını anlatır. Yazar bu aralıkların bazen melodinin duygusunu belirginleştirebildiğini savunur; her eserde aynı etkiyi doğuracağını söylemez.\nKonu ve ana düşünce ayrımını hangi seçenek korur? A) Konu: müzik tarihi; sav: bütün sessizlikler aynıdır B) Konu: sessiz aralıkların kullanımı; sav: bu aralıklar bazı bağlamlarda duyguyu belirginleştirebilir C) Konu: yazarın yaşı; sav: yaş önemlidir D) Konu: her eser aynı etkiyi verir; sav: sessiz aralık E) İkisi de yalnız notaların sayısıdır",
        strategy:
          "Ne hakkında ile o konuda ne söylüyor sorularını ayrı yanıtla.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "İşlenen alan eserlerdeki sessiz aralıklardır; bu konu adlandırmasıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Yazarın o alandaki sınırlı yargısı bazı bağlamlarda duyguyu belirginleştirme imkânıdır.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "B iki görevi ve “bazı” sınırını korur; diğerleri kapsamı değiştirir veya görevleri ters kurar.",
          },
        ],
        answer: "B: Konu kullanım, sav bağlama bağlı etkidir.",
        check: "Ana düşünceye “her zaman” eklemeden yargı kurabildin mi?",
        pitfall:
          "Konu adını tam bir sav sanmak veya yazarın sınırlı olasılığını koşulsuz etkiye çevirmek.",
      },
      {
        title: "Örneğin üstündeki ortak ilişki",
        prompt:
          "Bir yazı üç pazar yerinde farklı dil konuşan satıcıların anlaşmak için işaret, kısa not ve çeviri kartı kullandığını anlatıyor. Yerlerden birinin adı yalnız örnek olarak veriliyor.\nUygun konu hangisidir? A) Yalnız adı verilen pazarın kuruluşu B) Dünyadaki bütün dillerin kökeni C) Satılan meyvelerin fiyatı D) Çok dilli pazarlarda anlaşma yolları E) Her satıcının aynı dili öğrenmesi",
        strategy:
          "Farklı yerlerde tekrarlanan iletişim ilişkisini ortaklaştır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Üç yerin hepsinde dil farkıyla karşılaşılır ve buna karşı bir anlaşma aracı kullanılır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Pazar adı bir örnektir; metin kuruluş tarihi, dil kökeni veya fiyat incelemez.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "D üç örneği kapsar; A dar kalır, B aşırı geniştir, C-E yeni alan veya sonuç ekler.",
          },
        ],
        answer: "D: Çok dilli pazarlarda anlaşma yolları.",
        check:
          "Üç yerin her biri için konuya katkı veren bir davranış gösterebilir misin?",
        pitfall: "Bir örnek yer adını bütün metnin odağı saymak.",
      },
      {
        title: "Karşıt değerlendirmeyi ortak konuda tut",
        prompt:
          "Bir panelde ilk konuşmacı mektupların sayısallaştırılmasının erişimi hızlandırdığını, ikinci konuşmacı ise sayfa dokusunun ekranda tam aktarılamadığını anlatıyor. İkisi de aynı koleksiyonun dijital sunumunu tartışıyor.\nKonu hangisidir? A) Mektup koleksiyonunun dijital sunumunun olanak ve sınırları B) Yalnız ilk konuşmacının hayatı C) Kâğıt üretim maliyeti D) Bütün mektupların kaybolması E) İki konuşmacının aynı fikri savunması",
        strategy:
          "Ortak soruyu belirle; olumlu ve sınırlayıcı bakışları silme.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "İlk görüş erişim hızını, ikincisi dokunun aktarım sınırını konu alır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İki yön aynı dijital sunumun özellikleridir; ortak konu aynı fikirde olmayı gerektirmez.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "A her iki katkıyı kapsar; B-C yeni alan, D-E verilmemiş sonuçtur.",
          },
        ],
        answer: "A: Dijital sunumun olanakları ve sınırları.",
        check: "Konu adın ikinci konuşmacının itirazını da görünür tutuyor mu?",
        pitfall:
          "İki karşıt görüş görünce ortak bir konunun bulunamayacağını sanmak.",
      },
      {
        title: "Başlığı kanıt sınırında tut",
        prompt:
          "Bir deneme, günlük yürüyüşte sesleri kaydetmenin kişiye çevresindeki ayrıntıları fark ettirdiğini anlatıyor. Yalnız yazarın deneyimi veriliyor; sağlık değişimi ölçülmüyor.\nEn uygun başlık hangisidir? A) Bütün Hastalıkların Tedavisi B) Kentlerin Kuruluşu C) Adımlarla Duyulan Ayrıntılar D) Ses Cihazlarının Fiyatı E) Herkes Aynı Sesi Duyar",
        strategy:
          "Başlığın temel eylem ve vurguyu tanıtmasını sağla; ölçülmemiş sonucu ekleme.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Temel eylem günlük yürüyüşte ses kaydı, vurgu çevre ayrıntılarını fark etmektir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Sağlık etkisi ve bütün insanlara ilişkin sonuç verilmediğinden bunları başlığa ekleyemeyiz.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "C yürüyüş ve işitilen ayrıntı bağını taşır; diğerleri tedavi, tarih, fiyat veya evrensel aynılık ekler.",
          },
        ],
        answer: "C: Adımlarla Duyulan Ayrıntılar.",
        check:
          "Başlığa metinde ölçülmemiş bir başarı veya sağlık sonucu koydun mu?",
        pitfall:
          "Dikkat çekici ama metnin konusu dışında iddia taşıyan başlığı seçmek.",
      },
      {
        title: "Yakınmanın hedefi ile çözüm",
        prompt:
          "Bir editör, gönderilen yazılarda alıntıların kaynak belirtilmeden kullanılmasından yakınıyor. Çözüm olarak açık atıf ve özgün yorumun birbirinden ayrılmasını öneriyor. Baskı tekniğini tartışmıyor.\nYakınılan durum nedir? A) Her yazının uzun olması B) Alıntıların kaynaksız sunulması C) Açık atıf yapılması D) Basım makinelerinin yavaşlığı E) Her yorumun özgün olması",
        strategy: "Eleştirilen davranışı önerilen çözümden ayrı adlandır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Yakınma cümlesi alıntıların kaynak belirtilmeden kullanılmasını hedefler.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Atıf ve özgün yorum ayrımı çözüm olarak verilir; bu davranışlardan yakınılmamaktadır.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "B doğru hedefi korur; C-E çözümü ya da yeni ayrıntıyı yakınmaya dönüştürür.",
          },
        ],
        answer: "B: Alıntıların kaynaksız sunulması.",
        check:
          "Cevabın metindeki öneriyi değil eleştirilen eksikliği söylüyor mu?",
        pitfall:
          "Önerilen çözümü, yazarın şikâyet ettiği durumun yerine koymak.",
      },
    ],
    recall: [
      {
        prompt: "Konu ile ana düşünceyi farklı bir örnekle ayır.",
        answer:
          "Örnek: konu not tutma yöntemleri; ana düşünce notun amaca göre seçilmesi gerektiğidir. Biri alan, diğeri o alandaki yargıdır.",
      },
      {
        prompt: "Çok dar konu adayını nasıl kanıtlarsın?",
        answer:
          "Hangi önemli cümleleri dışarıda bıraktığını gösteririm; yalnız kısa olduğu için elemem.",
      },
      {
        prompt: "Çok geniş adayın sorunu nedir?",
        answer:
          "Metnin ayırt edici yönünü söylemeyebilir veya işlenmemiş alanları kapsama ekleyebilir.",
      },
      {
        prompt: "İlk cümle neden her zaman yeterli değildir?",
        answer:
          "Bir örnekle giriş yapıp ileride asıl odağı kurabilir; gelişme ve sınır cümlelerini de okumak gerekir.",
      },
      {
        prompt: "Karşıt görüşlerin ortak konusu olabilir mi?",
        answer:
          "Evet. Aynı soruyu farklı değerlendirebilirler; ortak konu aynı düşüncede olmak değildir.",
      },
      {
        prompt: "Başlıkta neyi denetlersin?",
        answer:
          "Temel odak ve vurguyu tanıtmasını, metin dışı sonuç veya aşırı genelleme eklememesini denetlerim.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri, Paragrafta Anlam; OGM 12. Sınıf Paragrafta Anlam. Metin, veri ve alıştırmalar özgün öğretim içeriğidir; resmî sınav sorusu değildir.",
  },
  {
    id: "metin-tablo-gorsel-yorumlama",
    title: "Metin, tablo ve görsel: veriyi kapsamıyla yorumla",
    minutes: 130,
    objectives: [
      "Başlık, birim, zaman, gösterge ve eksik veriyi önce belirle.",
      "Sayı, oran, yüzde, yüzde puanı ve farklı bütünleri ayır.",
      "Grafik, çizelge, afiş ve şemayı metinle birlikte denetle.",
      "Görünüşten ölçülmemiş neden, toplam veya kesinlik üretme.",
    ],
    sections: [
      {
        title: "Veri okumanın başlangıcı",
        paragraphs: [
          "Bir tablo veya görsel yalnız sayılar ve renklerden oluşmaz. Başlık neyin incelendiğini, satır ve sütun adları hangi grupların karşılaştırıldığını, birim neyin sayıldığını belirtir. Önce bunları oku; aynı sayı farklı birimlerde aynı nicelik değildir. On kayıt ile on kişi farklı şeyler olabilir.",
          "Sorudaki metin, gösterge ve dipnotlar verinin parçasıdır. Bir simge on kitabı temsil ediyorsa üç simge otuz kitaptır; açıklama yoksa simgeyi otomatik bir kişi diye okuyamazsın. Bu derste soru kartları gereken verileri tam metin olarak verir. Atölyede aynı kayıtlar okunabilir yazı ve özgün çizim ile birlikte gösterilir.",
        ],
      },
      {
        title: "Satır ve sütunu doğru eşleştir",
        paragraphs: [
          "Bir satır bir günü, şubeyi veya grubu temsil edebilir; sütunlar ise kapasite, katılım ve oran gibi ayrı ölçüler olabilir. Yanlış sütunu okumak doğru toplama işlemiyle bile yanlış sonuca götürür. Önce istenen niceliği ve onun bulunduğu sütunu adlandır.",
          "Kapasite kaç kişilik yer ayrıldığını, katılım kaç kişinin geldiğini gösterir. Daha büyük kapasite, daha yüksek doluluk oranını zorunlu kılmaz. Her satırın başlığını sayıyla birlikte söyle ve karşılaştırmayı aynı sütunda yap. Metin toplam kapasiteyi veya her grubun ayrı kapasitesini veriyorsa paydanın hangisi olduğunu açık tut.",
        ],
      },
      {
        title: "En büyük değerde eşitlik",
        paragraphs: [
          "En çok veya en az sorusunda ilgili bütün bilinen değerleri karşılaştır. Aynı en büyük değer birden fazla satırda bulunabilir. Bu durumda ortak liderler vardır; “yalnız biri en çoktur” yargısı desteklenmez. “En çok olanlardan biridir” ise aynı veriyle desteklenebilir.",
          "Bir hücre bilinmiyorsa yalnız bilinen satırlar içindeki en büyüğü belirleyebilirsin; eksik değer tüm grupların sıralamasını değiştirebilir. Kök “bilinen kayıtlar arasında” diyorsa sınır bunu çözer. Böyle bir sınır yoksa eksik bilgiyi sessizce sıfır yaparak tek lider ilan etme. Eşitlik ve bilinmeyen iki ayrı kontroldür.",
        ],
      },
      {
        title: "Fark ve oran",
        paragraphs: [
          "Fark, iki değerin çıkarılmasıyla bulunur; oran, birinin diğerine bölünmesidir. Bir kolda otuz altı, diğerinde yirmi dört kayıt varsa fark on iki kayıttır; ilk değer ikincinin bir buçuk katıdır. Bu iki sonuç aynı karşılaştırmanın farklı sorularına cevap verir.",
          "Oran sorusunda hangi değerin hangisine bölündüğünü söyle. “A, B’den yüzde kaç fazla?” işleminde farkın paydası B’dir. “B, A’nın yüzde kaçı?” ise B/A ister. Sayıların yerini değiştirmek aynı yüzdeyi vermez. İşlemden önce soru cümlesini birim ve yönüyle yeniden kurmak karışıklığı azaltır.",
        ],
      },
      {
        title: "Yüzde, pay ve bütün",
        paragraphs: [
          "Yüzde, bir bütünün yüz eşit payından kaçını anlatır. Bir grubun yüzde yirmisi denildiğinde o grubun toplamını bilmeden kişi sayısı bulunamaz. Toplam yüz elli ise yüzde yirmi otuz kişidir; toplam altmışsa aynı yüzde on iki kişidir. Oran ile mutlak sayıyı ayrı tut.",
          "Farklı büyüklükte iki grupta daha yüksek yüzde daha fazla kişi anlamına gelmeyebilir. Önce her grubun payını kendi toplamıyla çarp, sonra aynı birimdeki kişi sayılarını karşılaştır. İki grup aynı büyüklükteyse yüzdeler doğrudan sayısal sıralamayı verir; bu özel koşulu bütün karşılaştırmalara yayma.",
        ],
      },
      {
        title: "Yüzde puanı ve yüzde değişim",
        paragraphs: [
          "Bir oran yüzde otuzdan yüzde kırka çıkarsa on yüzde puanı artmıştır. Göreli artış ise (40−30)/30 olduğundan yaklaşık yüzde otuz üçtür. “On puan” ile “yüzde on artış” aynı iddia değildir. Sorunun hangi değişimi istediğini önce belirle.",
          "Kişi sayısı ve kapasite değiştiğinde orandaki değişimin hangi bileşenden geldiğine dikkat et. Aynı kişi sayısı daha az kapasitede daha yüksek doluluk verebilir. Sadece oran arttı diye katılan kişi sayısının da arttığını söyleme. İki pay ve iki paydayı birlikte incelemek metinle sayının aynı şeyi anlattığını gösterir.",
        ],
      },
      {
        title: "Zaman sırası ve bütün geçişler",
        paragraphs: [
          "Bir çizgi serisinde ilk ve son değer arasındaki artış, her ara dönemde artış olduğunu göstermez. Komşu dönemlerin farklarını sırayla incele. Arada tek bir düşüş bulunması “her dönemde arttı” yargısını çürütür; son değerin başlangıçtan büyük olması bu düşüşü ortadan kaldırmaz.",
          "Zaman aralıkları eşit değilse çizginin eğimini doğrudan aynı dönemlik hız sanma. Bir haftada beş, üç haftada altı artış farklı sürelerde gerçekleşir. Noktaların arasında ölçüm verilmediyse her günün kesin değerini de bulamazsın. Çizgi noktaları birleştiren temsil olabilir; aradaki gerçek yol ayrıca belirtilmelidir.",
        ],
      },
      {
        title: "Eksen başlangıcı ve görsel uzunluk",
        paragraphs: [
          "Bir sütun ekseni sıfırdan başlamıyorsa görünen sütun boylarının oranı gerçek değerlerin oranı olmayabilir. Etiketlerde yüz dört ve yüz on iki yazması ikinci miktarın iki kat olduğu anlamına gelmez. Başlangıç çizgisini ve basamak aralığını okuyarak gerçek sayıları kullan.",
          "Grafik değeri gizliyorsa ölçek üzerinden belirle; ölçek yoksa kesin nicel oran üretme. Sütunlar yatay da olabilir; mantık aynıdır. Atölyedeki miktar görünümü sıfırdan başlayan ortak ölçek kullanır ve bütün kesin değerler yazılı kayıtta da bulunur. Görsel ile metin farklı değer gösteriyorsa birini tahminle diğerine uydurma.",
        ],
      },
      {
        title: "Daire grafiğinde payda",
        paragraphs: [
          "Bir tam daire üç yüz altmış derecedir. Bir dilimin açısını toplam açıya bölerek bütün içindeki payını bulursun. Yüz sekiz derecelik dilim bütünün yüzde otuzudur. Kişi sayısı isteniyorsa bu pay ayrıca ilgili bütünün toplam kişi sayısıyla çarpılır.",
          "Farklı daireler farklı toplamları temsil ediyorsa dilim açılarını doğrudan kişi sayısı gibi karşılaştırma. Büyük dilim daha küçük bir toplamda az kişi taşıyabilir. Yuvarlama varsa kesin toplam veya tam sayı beklentisinin buna uygun olup olmadığını incele. Görsel açı belirli verildiyse görünüşten başka bir açı uydurma.",
        ],
      },
      {
        title: "Simge ve gösterge",
        paragraphs: [
          "Bir resimli grafikte her tam simge sekiz ürünü temsil edebilir; yarım simgenin anlamı da açıkça belirtilmelidir. Simgenin gerçek nesneye benzemesi onun bir adet anlamına geldiğini garanti etmez. Gösterge aynı görseldeki farklı renk veya çizgi türlerinin neyi temsil ettiğini de açıklar.",
          "Açıklanmamış bir renge başarı, tehlike veya belirli kişi sayısı yükleme. Kategori adları, desenler ve metin eşlikleriyle bilgiyi doğrula. Renk ayırt edilemese bile gerekli veri okunabilmelidir. Bu yüzden atölyede satır kodları ve açık değerler bulunur; sonuç yalnız yeşil veya kırmızı oluşuyla anlatılmaz.",
        ],
      },
      {
        title: "Eksik hücre sıfır değildir",
        paragraphs: [
          "Çizelgede boş bırakılmış bir alan bilinmeyen, toplanmamış veya uygulanmayan veri olabilir. Hangisi olduğu açıklama varsa ona göre belirlenir; açıklama yoksa sıfır diye doldurulamaz. Açıkça “0 kayıt” yazılmasıyla boş hücre aynı bilgi değildir.",
          "Eksik veri varken yine de bazı sonuçlar bulunabilir. Bilinen üç günün toplamı hesaplanabilir; sayımlar negatif değilse tam haftanın en az bu toplam kadar olduğu söylenebilir. Ama tüm haftanın tam toplamı bilinmeyebilir. Alt sınır ile kesin toplamı, bilinen en küçük ile bütün satırların en küçüğünü ayır.",
        ],
      },
      {
        title: "Kayıt, ziyaret ve farklı kişi",
        paragraphs: [
          "Bir kişi iki kez gelirse ziyaret sayısı iki, farklı kişi sayısı birdir. İki dönemin ziyaretlerini toplamak farklı kişilerin sayısını otomatik vermez. Kümeler arasında aynı kişinin yeniden bulunup bulunmadığını bilmek gerekir. Metindeki ölçüm tanımını sorunun bütün adımlarında koru.",
          "“Tekil kullanıcı” açıkça denmişse tekrarlar ayıklanmıştır; “giriş sayısı” denmişse aynı kişinin farklı girişleri bulunabilir. İki şubedeki kişi listeleri ayrıysa ortak kişilerin olup olmadığı belirtilmeden bütünün farklı kişi sayısı kesinleşmez. Çakışmama koşulu verilmişse bu yeni bilgiyle toplam kurabilirsin.",
        ],
      },
      {
        title: "Metin ve veri kapsamını birleştir",
        paragraphs: [
          "Bir metin bütün ayı anlatırken çizelge yalnız hafta içi kayıtlarını verebilir. İki parçanın zaman ve grup kapsamı aynı değilse birinin toplamını diğerinin bütününe taşıyamazsın. Önce her kaynağın hangi günleri, kimleri ve hangi birimi kapsadığını ayrı yaz.",
          "Metinde hafta sonu etkinlik yapıldığı söylenmesi hafta sonu katılımının miktarını vermez. Buna rağmen hafta içi verilerini yok saymak da yanlıştır. Bildiğin bölümün toplamını ve bilmediğin bölümün durumunu ayır. Sorudaki yargı bütün ayı kapsıyorsa eksik bölümün sonuca etkisini açıkça değerlendir.",
        ],
      },
      {
        title: "Afiş ve koşulları birlikte oku",
        paragraphs: [
          "Bir afişte gün, saat, yaş koşulu, ücret, kayıt ve kapasite farklı bilgi alanlarıdır. Giriş ücretsiz olabilirken malzeme ayrı ücretli olabilir. Kayıt zorunlu olması etkinliğin ücretli olduğunu, kontenjan bulunması herkesin kabul edileceğini tek başına söylemez.",
          "Koşullu cümleyi yönüyle koru. “Kayıt yaptıran ve on altı yaşını dolduran herkes katılabilir” iki koşulu birlikte verir. Yalnız yaş koşulunu sağlayana kesin katılım hakkı çıkarma. Bir başvurunun kabul edildiği metinde ayrıca belirtilmişse sonucu o bilgiye dayandır. Afişten ulaşım veya hava durumu gibi yeni alanlar üretme.",
        ],
      },
      {
        title: "Şema, ok ve süreç",
        paragraphs: [
          "Bir süreç şemasında ok bir adımın ardından gelen adımı veya belirli koşulda geçişi gösterebilir. Okun anlamı açıklanmış olmalıdır. “Kontrol geçilirse paketle, geçilmezse düzeltmeye dön” kuralı iki farklı yol kurar. Her nesnenin paketlendiğini söylemek koşulu kaldırır.",
          "Yönlü yol gösteriminde A’dan B’ye ok olması B’den A’ya da yol bulunduğunu garanti etmez. Mesafe veya süre yazmıyorsa görünür çizginin boyundan gerçek uzaklık çıkarma. Soruda gerekli düğüm adları ve geçiş koşulları metinle verilir. Ulaşılan sonuç, şemanın izin verdiği yol ve koşulla birlikte belirtilmelidir.",
        ],
      },
      {
        title: "Gözlem ile açıklanan neden",
        paragraphs: [
          "Sayıların birlikte artması veya bir değişimin uygulamadan sonra görülmesi nedenin tek başına uygulama olduğunu kanıtlamaz. Katılım artmış olabilir; duyuru, mevsim, kapasite ve seçilen grup gibi başka koşullar da değişmiş olabilir. Ölçülen artış ile bu artışın açıklaması farklı iddialardır.",
          "Metin güvenilir bir karşılaştırmanın koşullarını veriyorsa onu incele; fakat yalnız grafik çizildi diye neden-sonuç doğrulanmış sayma. “Nedeni bilinmiyor” demek gözlenen sayıları inkâr etmez. Bir seçenek sayı artışını, öteki kesin nedenini söylüyorsa aynı destek düzeyinde değildir; her iddiaya ayrı kanıt gerekir.",
        ],
      },
      {
        title: "Kesin, olabilir ve sınır",
        paragraphs: [
          "Kesin bir sonuç verilen koşullarla uyumlu bütün olasılıklarda geçerli olmalıdır. Bir bilinmeyen değerin iki farklı olası değeri sonucu değiştiriyorsa kesin sonuç kurulamaz. “Olabilir” sorusunda ise koşullarla çelişmeyen bir durum göstermek yeterli olabilir; gerçekleştiğini iddia etmezsin.",
          "Bir alt sınır sorusunda sayımların negatif olmaması gibi varsayımlar gereklidir. Verilen veri türünün izin vermediği negatif kişi veya yarım insan ekleme. Tam sayı, pozitiflik ve çakışmama koşulları soruda açıkça bulunmalıdır. Kendi hesabını sonuç ve birim olarak geri yerine koyup aynı koşulları sağlayıp sağlamadığını denetle.",
        ],
      },
      {
        title: "Kanıtı yeniden üret",
        paragraphs: [
          "Çözümlü örnekte önce başlık ve birimi belirle, sonra yalnız gerekli işlemi kur, son olarak yargının kapsamını kontrol et. Yeni soruda aynı sayıları aramak yerine hangi ilişkinin gerektiğini tanı. Fark sorusunda çıkarma, farklı bütünlerin payında ayrı çarpma, her dönem iddiasında bütün komşu geçişler gerekir.",
          "Etkileşimli modelde miktar ve doluluk görünümünü değiştirerek sıralamanın neden değişebildiğini incele. Dönem seçimi değişince veri kümesini de yeniden oku. Tahminin gerekçesini yazıp sonra model açıklamasını aç. Bu keşif puan veya gerçek araştırma sonucu üretmez; yeni soru kartları kendi tam verileriyle bağımsız çözülür.",
        ],
      },
    ],
    examples: [
      {
        title: "Miktar ve doluluk farklı sıralanır",
        prompt:
          "Özgün veri: Atölye R, kapasite 25 kişi, katılım 20 kişi; Atölye S, kapasite 50 kişi, katılım 30 kişi. Doluluk=katılım/kapasite×100.\nHangi yargı doğrudur? A) S hem kişi sayısında hem dolulukta yüksektir B) R kişi sayısında yüksektir C) İkisi aynı doluluktadır D) S daha çok kişi ağırlarken R daha yüksek doluluktadır E) Her iki atölye tamamen dolmuştur",
        strategy: "Kişi sütununu ve her satırın kendi paydasını ayrı kullan.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Katılım sayıları R=20 ve S=30 olduğundan S daha çok kişi ağırlamıştır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Doluluk R=20/25=%80; S=30/50=%60 olur. R oran bakımından yüksektir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "D iki sıralamayı birlikte korur; ötekiler sayıyı oranla eşitler veya doluluğu %100 yapar.",
          },
        ],
        answer: "D: Sayıda S, dolulukta R.",
        check: "20+5=25 ve 30+20=50 boş yerleriyle oranlarını geri denetle.",
        pitfall:
          "Kapasiteleri farklı iki etkinlikte kişi sayısının sırasını doluluk sırası sanmak.",
      },
      {
        title: "Göreli değişim ile puan",
        prompt:
          "Bir kurulda öneriyi destekleyenlerin oranı önce %40, sonra %50 olarak ölçülüyor. İki ölçümün oranları kesin verilmiştir.\nOranın değişimi nasıl ifade edilir? A) 10 yüzde puanı; başlangıca göre %25 artış B) 10 kişi; %10 artış C) 25 yüzde puanı; %10 artış D) 50 kişi; %40 artış E) Hiç değişim yok",
        strategy: "Oranların farkıyla farkın başlangıç oranına bölümünü ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Oran farkı 50−40=10 yüzde puanıdır; kişi toplamları verilmediğinden kişi farkı bulunmaz.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Başlangıca göre göreli artış 10/40=0,25 yani %25’tir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "A iki ölçüyü ayrı adlandırır; B-E birimi veya paydayı değiştirir.",
          },
        ],
        answer: "A: 10 yüzde puanı, %25 göreli artış.",
        check: "%40’ın %25 fazlası %50 eder mi? 40×1,25=50.",
        pitfall:
          "Oran farkındaki 10 puanı başlangıç oranından bağımsız yüzde on artış saymak.",
      },
      {
        title: "Bilinmeyen kayıt ve alt sınır",
        prompt:
          "Bir depoya gelen paket sayıları: Pazartesi 16, Salı bilinmiyor, Çarşamba 19. Paket sayıları negatif olmayan tam sayıdır.\nBu üç gün için hangisi kesindir? A) Toplam tam 35 B) Salı sıfır C) Salı en az 20 D) Toplam en az 35 E) Her gün en az 16",
        strategy:
          "Bilineni topla; bilinmeyenin yalnız verilen sınırını kullan.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İki bilinen günün toplamı 16+19=35 pakettir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Salı sayısı negatif olamayacağından toplam 35’in altına inmez; fakat salı sıfır da daha büyük de olabilir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "D alt sınırı doğru söyler; A-B bilinmeyeni sıfıra sabitler, C-E yeni alt sınır ekler.",
          },
        ],
        answer: "D: Toplam en az 35 paket.",
        check:
          "Salı 0 ve salı 7 örneklerinde cevabın her ikisinde de doğru kalıyor mu?",
        pitfall: "Bilinmeyeni sıfır sayıp alt sınırdan kesin toplama geçmek.",
      },
      {
        title: "Simgenin açıklamasını kullan",
        prompt:
          "Bir resimli çizelgede her tam kutu 6 fidanı, yarım kutu 3 fidanı temsil ediyor. A ekibi 2 tam ve 1 yarım kutuyla gösteriliyor.\nA ekibinin fidan sayısı nedir? A) 2,5 B) 6 C) 9 D) 12 E) 15",
        strategy: "Resim sayısından önce her gösterimin açık değerini oku.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İki tam kutu 2×6=12 fidanı temsil eder.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Bir yarım kutu ayrıca 3 fidan olduğundan toplam 12+3=15’tir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "E doğrudur; A yalnız kutu sayısıdır, B-D temsil edilen toplamın bir bölümünü eksiltir.",
          },
        ],
        answer: "E: 15 fidan.",
        check:
          "15=2×6+3 eşitliğinde her simgenin anlamını gösterebiliyor musun?",
        pitfall:
          "Bir resim simgesini açıklamaya bakmadan bir gerçek fidanla eşitlemek.",
      },
      {
        title: "Koşullu geçişi izle",
        prompt:
          "Özgün süreç: Her ürün önce P kontrolüne girer. P’yi geçen Q paketlemeye gider; geçmeyen R düzeltmeye döner. Düzeltmeden sonra yeniden P’ye girer. Ürün L ilk P kontrolünü geçememiştir.\nİlk kontrolün hemen ardından L nereye gider? A) Doğrudan Q B) R düzeltme C) Süreç biter D) Satışa çıkar E) İki yere birden zorunlu gider",
        strategy: "Okun yönünü ürünün verilen koşuluyla birlikte izle.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Verilen koşul L’nin ilk P kontrolünü geçememesidir; başarılı geçiş kuralı ona o anda uygulanmaz.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Başarısız ürün için açık geçiş R düzeltmedir; sonra yeniden P’ye girebilir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "B hemen sonraki adımı verir; A, C ve D başarılı yol veya verilmemiş bitiş ekler, E iki koşulu aynı anda varsayar.",
          },
        ],
        answer: "B: R düzeltme.",
        check:
          "Sonraki yeniden kontrol olasılığını ilk adımın yerine koymadın mı?",
        pitfall:
          "P’den Q’ya yol bulunmasını bütün ürünlerin koşulsuz Q’ya geçtiği anlamına almak.",
      },
      {
        title: "Toplam aynı, yön değişik",
        prompt:
          "Bir seri eşit aralıklı üç haftada sırasıyla 27, 41, 33 kg ürün veriyor. Noktalar arasındaki günlerde ayrı ölçüm yoktur.\nHangi yargı doğrudur? A) Her hafta artmıştır B) İkinci-son hafta değişimi +8 kg C) İlk-son fark +6 kg; her geçiş artış değildir D) Ara günler tam bilinir E) İlk ve son eşittir",
        strategy: "İlk-son farkla komşu geçişleri ayrı hesapla.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk-son fark 33−27=6 kg artıştır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Komşu geçişler 27→41 artış,41→33 düşüştür; bütün geçişler artış değildir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "C iki bulguyu korur; A düşüşü siler, B işareti ters çevirir, D ölçülmemiş ara günleri uydurur, E farkı yok sayar.",
          },
        ],
        answer: "C: İlk-son +6 kg, ara düşüş var.",
        check:
          "41’den 33’e geçişin işareti nedir ve “her” sözüne etkisi ne olur?",
        pitfall:
          "Son değer başlangıçtan büyük diye bütün ara geçişlerin de yükseldiğini sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Doluluk ve katılım sayısını nasıl ayırırsın?",
        answer:
          "Katılım kişi sayısıdır; doluluk katılımın ilgili kapasiteye oranıdır. Farklı kapasitede sıralamalar değişebilir.",
      },
      {
        prompt: "Boş hücre ile 0 neden aynı değildir?",
        answer:
          "Boşluk bilinmeyen veya toplanmamış veri olabilir; sıfır açık bir ölçüm değeridir.",
      },
      {
        prompt: "Her dönem artış iddiasını nasıl test edersin?",
        answer:
          "Zaman sırasını koruyup bütün komşu geçişleri incelerim; tek düşüş her iddiasını bozar.",
      },
      {
        prompt: "Yüzde puanı ve göreli artışın farkı nedir?",
        answer:
          "Puan iki oranın farkı; göreli artış bu farkın başlangıç oranına bölümüdür.",
      },
      {
        prompt: "Simge açıklaması yoksa üç resimden üç kişi çıkar mı?",
        answer:
          "Hayır. Her simgenin temsil ettiği sayı ve kategorisi verilmelidir.",
      },
      {
        prompt: "Ziyaret toplamı farklı kişi toplamını ne zaman verir?",
        answer:
          "Her ziyarette farklı kişi bulunduğu veya tekrarların ayıklandığı açıkça belirtilmişse; aksi durumda kimlik/çakışma bilgisi gerekir.",
      },
    ],
    source:
      "MEBİ Türkçe Görsel, Grafik ve Tablo Yorumlama (LGS), fiziksel 49–52: yalnız ortak veri okuma temelleri; TYT kapsam kanıtı sayılmaz. MEBİ TYT Türkçe Paragrafta Anlam. Tüm veri ve sorular özgündür; resmî sınav sorusu değildir.",
  },
];
const questionRows024 = [
  [
    {
      passage:
        "Bir çini onarımcısı, eski bir tabağın çatlaklarını tamamen görünmez kılmayı seçmiyor. Onarılan kısmı uzaktan bütünlük duygusunu bozmayacak, yakından bakıldığında ise fark edilecek biçimde tamamlıyor. Ona göre çatlaklar, nesnenin geçirdiği zamanın sessiz kayıtlarıdır. Kullandığı yeni malzeme gerektiğinde özgün yüzeye zarar vermeden çıkarılabiliyor. Onarımcı, yöntemin her nesneye aynı biçimde uygulanacağını ileri sürmüyor.",
      prompt:
        "Bu parçadaki onarım anlayışını en iyi karşılayan yargı hangisidir?",
      options: [
        "Bütünlüğü desteklerken nesnenin geçmiş izlerini ve özgün yüzeyi gözetmek",
        "Nesnenin yaşını göstermek için onarımı bütünüyle reddetmek",
        "Her çatlağı uzaktan daha belirgin hâle getirmeyi temel almak",
        "Özgün yüzeyi yeni malzemeyle kalıcı olarak değiştirmek",
        "Aynı onarım yöntemini her nesne için zorunlu tutmak",
      ],
      reasons: [
        "Uzakta bütünlük, yakında ayırt edilebilirlik ve çıkarılabilir malzeme birlikte bu dengeyi kurar.",
        "Onarım yapıldığı açıkça anlatılır; reddedildiği söylenmez.",
        "Uzaktan bütünlük korunur; çatlağı her mesafede büyütme hedefi yoktur.",
        "Malzemenin özgün yüzeye zarar vermeden çıkarılabilmesi kalıcı değiştirme iddiasına uymaz.",
        "Son cümle yöntemin her nesneye aynı uygulanması iddiasını sınırlar.",
      ],
      knowledge:
        "Ana düşünce, açıklanan tercihleri ve konan sınırı birlikte taşıyan merkez yargıdır.",
      strategy:
        "Çatlağı koruma, bütünlük ve geri alınabilirlik bilgilerini aynı adayda birleştir.",
      steps: [
        "İlk iki cümle, geçmiş izi silmeden bütünlük duygusu sağlandığını gösterir.",
        "Dördüncü cümle özgün yüzeyin korunmasını geri alınabilir malzemeyle tamamlar.",
        "Bu üç öğeyi tutan adayı seç; onarımı reddeden veya her nesneye zorunlu kılan adayları ele.",
      ],
      commonError:
        "Çatlak izinin korunmasını hiç onarım yapılmamasıyla eşitlemek.",
      check:
        "Cevabın hem tamamlamayı hem geçmiş izini ve yüzey korumasını içeriyor mu?",
    },
    {
      passage:
        "Bir çini onarımcısı, eski bir tabağın çatlaklarını tamamen görünmez kılmayı seçmiyor. Onarılan kısmı uzaktan bütünlük duygusunu bozmayacak, yakından bakıldığında ise fark edilecek biçimde tamamlıyor. Ona göre çatlaklar, nesnenin geçirdiği zamanın sessiz kayıtlarıdır. Kullandığı yeni malzeme gerektiğinde özgün yüzeye zarar vermeden çıkarılabiliyor. Onarımcı, yöntemin her nesneye aynı biçimde uygulanacağını ileri sürmüyor.",
      prompt:
        "Kullanılan yeni malzemeye ilişkin hangi bilgi doğrudan verilmiştir?",
      options: [
        "Gerektiğinde özgün yüzeye zarar vermeden çıkarılabildiği",
        "Bütün çini türlerinde aynı süre dayandığı",
        "Çatlağın oluştuğu tarihte üretilmiş olduğu",
        "Her mesafeden eski parçadan ayırt edilemediği",
        "Özgün yüzeyden daha değerli olduğu",
      ],
      reasons: [
        "Dördüncü cümlede çıkarılabilirlik ve zarar vermeme açıkça belirtilir.",
        "Malzemenin bütün türlerdeki dayanma süresi açıklanmaz.",
        "Yeni malzemenin çatlakla aynı tarihte üretildiği söylenmez.",
        "Yakından onarılan kısmın fark edildiği yazılıdır.",
        "Eski ve yeni malzeme arasında değer sıralaması yapılmaz.",
      ],
      knowledge:
        "Doğrudan ayrıntı, ilgili nesne ve özelliği veren cümleden alınır.",
      strategy:
        "Malzemenin niteliğini sormayan diğer yorumlardan ayrılıp dördüncü cümleye dön.",
      steps: [
        "Soru onarımın genel amacını değil, yeni malzemenin verilmiş özelliğini soruyor.",
        "Gerektiğinde çıkarılma ve özgün yüzeye zarar vermeme birlikte yazılmıştır.",
        "Süre, üretim tarihi ve değer kıyasına ilişkin veri olmadığından bunları ekleme.",
      ],
      commonError:
        "Genel onarım anlayışını malzemenin ölçülmemiş dayanıklılığına kanıt saymak.",
      check:
        "İşaretlediğin niteliği dördüncü cümlede iki parçasıyla gösterebiliyor musun?",
    },
    {
      passage:
        "Bir çini onarımcısı, eski bir tabağın çatlaklarını tamamen görünmez kılmayı seçmiyor. Onarılan kısmı uzaktan bütünlük duygusunu bozmayacak, yakından bakıldığında ise fark edilecek biçimde tamamlıyor. Ona göre çatlaklar, nesnenin geçirdiği zamanın sessiz kayıtlarıdır. Kullandığı yeni malzeme gerektiğinde özgün yüzeye zarar vermeden çıkarılabiliyor. Onarımcı, yöntemin her nesneye aynı biçimde uygulanacağını ileri sürmüyor.",
      prompt: "Bu parçadan hangisine ulaşılamaz?",
      options: [
        "Yöntemin bütün nesnelerde aynı biçimde kullanılması gerektiğine",
        "Çatlakların geçmiş yaşantıya ilişkin iz sayıldığına",
        "Onarılan bölümün yakından fark edilebildiğine",
        "Uzaktan bütünlüğün gözetildiğine",
        "Yeni malzemenin gerektiğinde çıkarılabildiğine",
      ],
      reasons: [
        "Son cümle her nesneye aynı uygulama savını özellikle kurmaz.",
        "Sessiz kayıt benzetmesi geçmiş izini açıklar.",
        "İkinci cümle yakından fark edilebilirliği verir.",
        "İkinci cümlede uzaktan bütünlüğü bozmama koşulu vardır.",
        "Dördüncü cümle bu niteliği açıkça belirtir.",
      ],
      knowledge:
        "Olumsuz kökte dört destekli yargıyla kapsamı aşan adayı ayırmak gerekir.",
      strategy: "Son cümlenin hangi genellemeyi sınırlandırdığını bul.",
      steps: [
        "Kök desteklenmeyen yargıyı istiyor; metinde verilen bir ayrıntıyı seçmeyeceğiz.",
        "Her nesneye aynı uygulama iddiası son cümlede reddedilen kapsam genişlemesidir.",
        "Öteki dört yargının ikinci, üçüncü veya dördüncü cümlede açık dayanağı vardır.",
      ],
      commonError: "Olumsuz kökte dikkat çekici bir doğru ayrıntıyı seçmek.",
      check:
        "Dört adayın dayanağını bulup kalan adayın hangi evrensel sözü eklediğini söyle.",
    },
    {
      passage:
        "Bir çini onarımcısı, eski bir tabağın çatlaklarını tamamen görünmez kılmayı seçmiyor. Onarılan kısmı uzaktan bütünlük duygusunu bozmayacak, yakından bakıldığında ise fark edilecek biçimde tamamlıyor. Ona göre çatlaklar, nesnenin geçirdiği zamanın sessiz kayıtlarıdır. Kullandığı yeni malzeme gerektiğinde özgün yüzeye zarar vermeden çıkarılabiliyor. Onarımcı, yöntemin her nesneye aynı biçimde uygulanacağını ileri sürmüyor.",
      prompt:
        "“Zamanın sessiz kayıtları” sözü çatlakların hangi yönünü öne çıkarır?",
      options: [
        "Nesnenin geçmişini görünür izlerle taşımasını",
        "Çatlaklardan gerçek konuşma sesi çıkmasını",
        "Tabağın üretim yılının sayısal olarak okunmasını",
        "Her çatlağın aynı olayda oluşmuş olmasını",
        "Onarımcının yalnız yazılı belgelerle çalışmasını",
      ],
      reasons: [
        "Bağlamda çatlaklar nesnenin geçirdiği zamanın izleri olarak değerlendirilir.",
        "Sessiz kayıt mecazı fiziksel ses çıkarmayı anlatmaz.",
        "Benzetme kesin bir üretim yılı vermemektedir.",
        "Çatlakların oluşma olayları tekleştirilmez.",
        "Onarımcının bütün çalışma araçları hakkında böyle bir bilgi yoktur.",
      ],
      knowledge:
        "Benzetmenin işlevi yakın cümlelerde kurduğu anlam ilişkisiyle belirlenir.",
      strategy:
        "Kayıt sözcüğünü çatlağın nesnenin geçmişiyle ilişkisine çevir.",
      steps: [
        "Üçüncü cümle çatlakları nesnenin geçirdiği zamanla bağlar.",
        "Kayıt, burada yazı veya ses dosyası değil, geçmişi hatırlatan görünür iz anlamındadır.",
        "Geçmiş izi vurgusunu seç; tarih sayısı, ortak olay ve çalışma aracı gibi yeni bilgiler ekleme.",
      ],
      commonError:
        "Mecazı gerçek ses kaydı veya sayısal tarih belgesi gibi okumak.",
      check:
        "Sözü çıkarıp yerine “geçmişten kalan iz” koyduğunda bağlam korunuyor mu?",
    },
    {
      passage:
        "Bir derleyici, köylerde anlattırdığı yemek tariflerini yazıya geçirirken yerel ölçü adlarını olduğu gibi bırakıyor. Bu adları bilmeyen okurlar için kitabın sonuna ayrı bir açıklama listesi ekliyor. Amacı, anlatıcıların söyleyişini tek biçime sokmak değil, farklı okurların aynı anlatıma erişebilmesini sağlamak. Kayıtların yalnız iki köyden geldiğini belirtiyor; bu nedenle kitabını bölgedeki bütün yemeklerin eksiksiz listesi olarak sunmuyor.",
      prompt: "Derleyicinin temel amacı hangisidir?",
      options: [
        "Yerel söyleyişi korurken başka okurlar için anlaşılma imkânı sağlamak",
        "Yerel ölçü adlarını silerek bütün tarifleri tek söyleyişe çevirmek",
        "İki köydeki tarifleri bütün bölgenin eksiksiz dökümü saymak",
        "Okurların açıklama listesine erişmesini engellemek",
        "Yemeklerin besin değerini ölçmek",
      ],
      reasons: [
        "Yerel adların korunması ve ayrı açıklama listesi bu iki amacı birleştirir.",
        "Tek biçime sokma amacı açıkça reddedilir.",
        "Son cümle eksiksiz bölge listesi iddiasını sınırlar.",
        "Liste bilinmeyen adları açıklamak için eklenmiştir.",
        "Besin değerine ilişkin ölçüm veya amaç verilmez.",
      ],
      knowledge:
        "Amaç cümlesi, kullanılan iki yöntemi hangi hedefte birleştirdiğini açıklar.",
      strategy:
        "Korunan unsurla eklenen desteği ayrı bulup amaç cümlesinde birleştir.",
      steps: [
        "Korunan unsur yerel ölçü adlarıdır; eklenen destek kitabın sonundaki açıklama listesidir.",
        "Üçüncü cümle iki tercihin amacını farklı okurların aynı anlatıma erişmesi diye açıklar.",
        "Bu dengeyi veren adayı seç; standartlaştırma, tam envanter veya besin ölçümü ekleyenleri ele.",
      ],
      commonError:
        "Açıklama listesi eklenmesini yerel söyleyişin kaldırılması sanmak.",
      check: "Cevabın hem özgün adı tutuyor hem okur desteğini açıklıyor mu?",
    },
    {
      passage:
        "Bir derleyici, köylerde anlattırdığı yemek tariflerini yazıya geçirirken yerel ölçü adlarını olduğu gibi bırakıyor. Bu adları bilmeyen okurlar için kitabın sonuna ayrı bir açıklama listesi ekliyor. Amacı, anlatıcıların söyleyişini tek biçime sokmak değil, farklı okurların aynı anlatıma erişebilmesini sağlamak. Kayıtların yalnız iki köyden geldiğini belirtiyor; bu nedenle kitabını bölgedeki bütün yemeklerin eksiksiz listesi olarak sunmuyor.",
      prompt: "Kitabın kapsamına ilişkin hangi yargı desteklenir?",
      options: [
        "İki köyden gelen kayıtlar içerir; bütün bölgenin eksiksiz dökümü sayılmaz",
        "Bölgedeki bütün köylerden eşit sayıda kayıt içerir",
        "Yalnız açıklama listesinden oluşur",
        "Yerel adları açıklama listesi dışında hiçbir yerde kullanmaz",
        "Her tarifin bütün bölgedeki tek geçerli biçimi verilir",
      ],
      reasons: [
        "Son cümlede kaynak iki köyle sınırlandırılır ve tam bölge dökümü olmadığı söylenir.",
        "Bütün köylerden kayıt alındığına dair bilgi yoktur.",
        "Tariflerin yazıya geçirildiği, listenin ayrıca eklendiği anlatılır.",
        "Yerel adların tariflerde olduğu gibi bırakıldığı ilk cümlede yazılıdır.",
        "Tek geçerli biçim iddiası yerel çeşitliliği koruma amacıyla da bağdaşmaz.",
      ],
      knowledge:
        "Bir derlemenin kayıt alanı ile hedeflediği daha geniş kültür alanı aynı kapsam değildir.",
      strategy:
        "Kaynak yer bilgisini son cümlenin eksiksizlik sınırıyla birlikte oku.",
      steps: [
        "Kayıtlar iki köyden gelmektedir.",
        "Derleyici bu sınırlı kaynaktan bütün bölgenin eksiksiz listesini çıkardığını söylemez.",
        "Hem iki köyü hem eksiksizlik sınırını koruyan adayı bul; diğer adaylar kaynağı genişletir veya metnin yapısını değiştirir.",
      ],
      commonError: "İki köy örneğini bölgenin bütününe ait tam kayıt saymak.",
      check:
        "“Bütün” sözcüğünü hangi cümleye dayanarak kullanabildiğini kontrol et.",
    },
    {
      passage:
        "Bir derleyici, köylerde anlattırdığı yemek tariflerini yazıya geçirirken yerel ölçü adlarını olduğu gibi bırakıyor. Bu adları bilmeyen okurlar için kitabın sonuna ayrı bir açıklama listesi ekliyor. Amacı, anlatıcıların söyleyişini tek biçime sokmak değil, farklı okurların aynı anlatıma erişebilmesini sağlamak. Kayıtların yalnız iki köyden geldiğini belirtiyor; bu nedenle kitabını bölgedeki bütün yemeklerin eksiksiz listesi olarak sunmuyor.",
      prompt:
        "Açıklama listesinin eklenmesi aşağıdaki sorunlardan hangisine yöneliktir?",
      options: [
        "Bazı okurların yerel ölçü adlarını bilmemesine",
        "Tariflerde yemek adlarının hiç bulunmamasına",
        "Kayıtların iki köyden geldiğinin gizlenmesine",
        "Kitabın bütün köylerde aynı tarihte basılmasına",
        "Anlatıcıların mutlaka aynı yaştan seçilmesine",
      ],
      reasons: [
        "İkinci cümle, adları bilmeyen okurlar için liste eklendiğini doğrudan belirtir.",
        "Yemek adlarının bulunmadığı söylenmemektedir.",
        "Kaynak köy sayısı açıkça verilmiştir; gizleme amacı yoktur.",
        "Basım tarihleri ve köyler arası eşzamanlılık yoktur.",
        "Anlatıcı yaşları ve seçme koşulu açıklanmamıştır.",
      ],
      knowledge:
        "Araç ile gidermek istediği bilgi açığı doğrudan eşleştirilir.",
      strategy: "İkinci cümlede “için” sözünün bağladığı okur ihtiyacını bul.",
      steps: [
        "Ek araç, kitabın sonundaki açıklama listesidir.",
        "Hedeflenen güçlük bazı okurların yerel ölçü adlarını tanımamasıdır.",
        "Bunu söyleyen adayı seç; yaş, basım tarihi veya gizleme gibi verilmemiş amaçları ele.",
      ],
      commonError:
        "Ayrı bir aracın varlığından metinde belirtilmeyen üretim sorunu çıkarmak.",
      check: "Liste hangi okura hangi bilgi konusunda yardımcı oluyor?",
    },
    {
      passage:
        "Bir derleyici, köylerde anlattırdığı yemek tariflerini yazıya geçirirken yerel ölçü adlarını olduğu gibi bırakıyor. Bu adları bilmeyen okurlar için kitabın sonuna ayrı bir açıklama listesi ekliyor. Amacı, anlatıcıların söyleyişini tek biçime sokmak değil, farklı okurların aynı anlatıma erişebilmesini sağlamak. Kayıtların yalnız iki köyden geldiğini belirtiyor; bu nedenle kitabını bölgedeki bütün yemeklerin eksiksiz listesi olarak sunmuyor.",
      prompt: "Bu parçadan derleyici hakkında hangisi çıkarılamaz?",
      options: [
        "Anlatıcıların yaşlarının etkisini karşılaştırdığı",
        "Yerel ölçü adlarını korumayı seçtiği",
        "Bazı okurlara açıklama desteği sunduğu",
        "Kendi çalışmasının kapsamını sınırladığı",
        "Anlatımları tek biçime sokmayı amaçlamadığı",
      ],
      reasons: [
        "Anlatıcı yaşları veya bunların etkisi hakkında hiçbir karşılaştırma yoktur.",
        "İlk cümle yerel adların olduğu gibi bırakıldığını söyler.",
        "İkinci cümle açıklama listesiyle okur desteğini verir.",
        "Son cümle iki köy kaynağının kapsamını açıklar.",
        "Üçüncü cümle standartlaştırma amacını reddeder.",
      ],
      knowledge:
        "Çıkarılamayan özellik, aynı kişi hakkında makul görünse de metin kanıtı olmayan özelliktir.",
      strategy:
        "Derleyicinin dört açık tercihini belirleyip yeni araştırma değişkeni ekleyen adayı bul.",
      steps: [
        "Derleyici yerel adları korur, açıklama desteği ekler ve iki köyden gelen kaynağını sınırlar.",
        "Yaş etkisi ölçümü metnin hiçbir cümlesinde yer almıyor.",
        "Adları koruma, okura destek ve kapsam sınırlama diğer adayları metne bağlar; eksik yaş karşılaştırması kalır.",
      ],
      commonError:
        "Derleme çalışması var diye her sosyolojik değişkenin incelendiğini varsaymak.",
      check: "Yaş karşılaştırmasını doğrulayan bir cümle gösterebiliyor musun?",
    },
    {
      passage:
        "Bir öykü yazarı, ilk taslağında kahramanın aldığı kararı son sayfada açıkça anlatmıştı. Yeni taslakta bu sayfayı çıkarıp kararın öncesindeki iki farklı davranışı görünür bıraktı. Okurun bu davranışları tartarak birden çok makul son düşünebilmesini istiyor. Bunun her okurda aynı yorumu doğuracağını savunmuyor. “Bir boşluk bırakıyorum; metni yarım okumayı değil, okurun düşünmesini istiyorum.” diyor.",
      prompt: "Yazarın son sayfayı çıkarmasının amacı hangisidir?",
      options: [
        "Okurun verilen davranışlardan hareketle olası sonları düşünmesine alan açmak",
        "Kahramanın hiçbir davranışının bilinmemesini sağlamak",
        "Bütün okurların tek ve aynı sonu bulmasını garanti etmek",
        "Taslakların tamamını yayımlamaktan vazgeçmek",
        "Okurun metnin yalnız ilk sayfasını okumasını istemek",
      ],
      reasons: [
        "Üçüncü ve son cümle, makul sonlar düşünme ve okurun etkinliği amacını açıklar.",
        "İki davranış özellikle görünür bırakılmıştır.",
        "Dördüncü cümle tek yorum garantisini reddeder.",
        "Yayımdan vazgeçildiği belirtilmez.",
        "Yazar yarım okumayı istemediğini açıkça söyler.",
      ],
      knowledge:
        "Amaç, metindeki düzenlemenin hedeflediği okur etkinliğiyle belirlenir; garanti edilmiş sonuç değildir.",
      strategy:
        "Çıkarılan sayfadan sonra bırakılan kanıtı ve hedeflenen düşünme işini birlikte oku.",
      steps: [
        "Kararı açıklayan sayfa çıkarılırken iki davranış bilgisi korunmuştur.",
        "Bu tercih, okurun davranışları tartıp birden çok makul son düşünmesini hedefler.",
        "Hedefi veren adayı seç; verinin yok edilmesi veya tek yorum garantisi önerenleri ele.",
      ],
      commonError:
        "Açık sonu, okuyucunun hiçbir kanıta ihtiyaç duymadığı rastgele yorum alanı sanmak.",
      check:
        "Okurun olası sonları hangi görünür verilere dayanarak kurması isteniyor?",
    },
    {
      passage:
        "Bir öykü yazarı, ilk taslağında kahramanın aldığı kararı son sayfada açıkça anlatmıştı. Yeni taslakta bu sayfayı çıkarıp kararın öncesindeki iki farklı davranışı görünür bıraktı. Okurun bu davranışları tartarak birden çok makul son düşünebilmesini istiyor. Bunun her okurda aynı yorumu doğuracağını savunmuyor. “Bir boşluk bırakıyorum; metni yarım okumayı değil, okurun düşünmesini istiyorum.” diyor.",
      prompt: "İlk taslak ile yeni taslak arasındaki fark hangisidir?",
      options: [
        "Kararın doğrudan açıklanması yerine öncesindeki davranışlardan yorum alanı kurulması",
        "Kahramanın bütün davranışlarının metinden silinmesi",
        "İlk taslakta hiç karar bulunmaması",
        "Yeni taslakta kararın açıkça daha ayrıntılı anlatılması",
        "İki taslağın bütün cümlelerinin aynı kalması",
      ],
      reasons: [
        "İlk iki cümle doğrudan son açıklamasının çıkarılıp davranışların bırakıldığını gösterir.",
        "İki davranış görünürdür; tümünün silinmesi söylenmez.",
        "İlk taslakta alınan karar açıkça anlatılmıştır.",
        "Kararı açıklayan sayfa yeni taslaktan çıkarılmıştır.",
        "Bir sayfanın çıkarılması bütün cümlelerin aynı kaldığı iddiasına uymaz.",
      ],
      knowledge:
        "Karşılaştırmada aynı ölçüt iki duruma ayrı uygulanır: kararın nasıl sunulduğu.",
      strategy:
        "İlk ve yeni sürümde kararın sunuluşunu iki satırda karşılaştır.",
      steps: [
        "İlk sürümde karar son sayfada doğrudan anlatılmıştır.",
        "Yeni sürümde bu sayfa yoktur; karar öncesi iki davranış ipucu olarak kalır.",
        "Bu sunuş farkını veren adayı seç; bütün davranışları silme veya yeni açıklama ekleme iddialarını çıkar.",
      ],
      commonError:
        "Son sayfanın çıkarılmasını kahramana ilişkin bütün verilerin çıkarılması saymak.",
      check: "Karşılaştırmandaki ölçüt her iki sürümde de kararın sunuluşu mu?",
    },
    {
      passage:
        "Bir öykü yazarı, ilk taslağında kahramanın aldığı kararı son sayfada açıkça anlatmıştı. Yeni taslakta bu sayfayı çıkarıp kararın öncesindeki iki farklı davranışı görünür bıraktı. Okurun bu davranışları tartarak birden çok makul son düşünebilmesini istiyor. Bunun her okurda aynı yorumu doğuracağını savunmuyor. “Bir boşluk bırakıyorum; metni yarım okumayı değil, okurun düşünmesini istiyorum.” diyor.",
      prompt: "Yazarın görüşüyle hangi yargı uyuşmaz?",
      options: [
        "Açık bırakılan son bütün okurlarda zorunlu tek yorum oluşturur",
        "Okur davranış ipuçlarını tartabilir",
        "Birden fazla makul son düşünülebilir",
        "Okurun düşünmesi amaçlanır",
        "Boşluk bırakmak yarım okuma isteğiyle aynı değildir",
      ],
      reasons: [
        "Yazar her okurda aynı yorumu doğurma savını açıkça kurmaz.",
        "Üçüncü cümle davranışların tartılmasını ister.",
        "Birden çok makul son düşünülmesi amacı belirtilmiştir.",
        "Son cümlede okurun düşünmesi istenir.",
        "Son sözde yarım okuma ile düşünme arasında ayrım yapılır.",
      ],
      knowledge:
        "Görüşle uyuşmayan yargıda yazarın özellikle koyduğu kesinlik sınırı aranır.",
      strategy: "Her okur ve zorunlu sözlerini dördüncü cümleyle karşılaştır.",
      steps: [
        "Üçüncü cümlede okurun birden çok makul son düşünmesi hedeflenir.",
        "Zorunlu tek yorum adayı bu hedefi bütün okurlarda aynı sonuca çevirir; dördüncü cümle böyle bir garanti kurmaz.",
        "Tek yorumu zorunlu kılan adayı seç; diğerleri açıkça anlatılan amaç ve yöntemi korur.",
      ],
      commonError:
        "Birden çok makul son hedefini herkesin aynı sonucu bulacağına çevirmek.",
      check:
        "Yazarın hangi cümlesi “bütün okurlarda tek sonuç” kapsamını engelliyor?",
    },
    {
      passage:
        "Bir öykü yazarı, ilk taslağında kahramanın aldığı kararı son sayfada açıkça anlatmıştı. Yeni taslakta bu sayfayı çıkarıp kararın öncesindeki iki farklı davranışı görünür bıraktı. Okurun bu davranışları tartarak birden çok makul son düşünebilmesini istiyor. Bunun her okurda aynı yorumu doğuracağını savunmuyor. “Bir boşluk bırakıyorum; metni yarım okumayı değil, okurun düşünmesini istiyorum.” diyor.",
      prompt: "Son cümledeki “boşluk” sözcüğü hangi anlamda kullanılmıştır?",
      options: [
        "Okurun verilen ipuçlarıyla düşüneceği açık bırakılmış sonuç alanı",
        "Basım hatası nedeniyle beyaz kalan kâğıt",
        "Kahramanın bulunduğu fiziksel oda",
        "Öykünün hiçbir olay içermemesi",
        "Metnin yalnız başlığının bulunması",
      ],
      reasons: [
        "Karar açıklamasının çıkarılması ve düşünme amacı bu anlamı kurar.",
        "Bir basım hatası değil bilinçli düzenleme anlatılır.",
        "Boşluk fiziksel yer adı olarak kullanılmaz.",
        "Karar ve iki davranışa ilişkin olay bilgisi vardır.",
        "Öykü taslakları ve sayfa düzenlemesi anlatılır; yalnız başlık yoktur.",
      ],
      knowledge:
        "Bir sözcüğün bağlamsal anlamı, hangi işlem ve amaçla ilişkilendirildiğiyle bulunur.",
      strategy:
        "Boşluğu son sayfanın çıkarılması ve okura bırakılan görevle eşleştir.",
      steps: [
        "Boşluk, kararın doğrudan açıklanmadığı sonla ilgilidir.",
        "Okurun düşünmesi istendiği için bu alan verilmiş davranışlara dayanan yorumla tamamlanır.",
        "Bu anlamı koruyan adayı seç; fiziksel boşluk veya olay yokluğu anlamlarını ele.",
      ],
      commonError: "Mecazi açıklığı fiziksel kâğıt boşluğuna indirgemek.",
      check:
        "Bu sözcüğü “açık bırakılan sonuç” ile değiştirince yazarın amacı korunuyor mu?",
    },
    {
      passage:
        "Bir dağ okulunun öğrencileri aynı kar çubuğunu dört pazartesi sabahı ölçtü: 18, 26, 21 ve 29 santimetre. Defterde ölçümün yeri ve saati de yazıldı. Öğretmen, son değerin ilkinden büyük olduğunu, fakat her hafta artış olmadığını belirtti. Çubuğun başka bir noktaya taşınmaması karşılaştırma için önemlidir. Bu dört ölçümden bütün dağın yıllık kar miktarı çıkarılmadı.",
      prompt:
        "Öğretmenin yaptığı değerlendirmeyi hangi karşılaştırma destekler?",
      options: [
        "Son değer 18’den büyüktür;26’dan 21’e geçişte ise düşüş vardır",
        "Bütün komşu değerler artmıştır",
        "Son değer ilk değerden küçüktür",
        "İkinci ve üçüncü değerler eşittir",
        "Dört ölçümün hepsi 29 santimetredir",
      ],
      reasons: [
        "29>18 ilk-son artışı;21<26 ara düşüşü gösterir.",
        "26→21 geçişi artış değildir.",
        "29,18’den büyüktür.",
        "26 ile 21 eşit değildir.",
        "Yalnız son değer 29’dur.",
      ],
      knowledge:
        "İlk-son değişim ile her ara dönemin değişimi farklı iddialardır.",
      strategy: "İlk-son çifti ve düşüş taşıyan komşu çifti ayrı karşılaştır.",
      steps: [
        "İlk ölçüm 18, son ölçüm 29 olduğundan son değer daha büyüktür.",
        "İkinci ölçüm 26’dan üçüncü 21’e iniş, her hafta artış olmadığını gösterir.",
        "Her iki bulguyu birlikte veren adayı seç; diğerleri en az bir ölçümü değiştirir.",
      ],
      commonError: "Yalnız son ve ilk değeri okuyup ara düşüşü görmemek.",
      check: "26→21 geçişi cevabının her hafta iddiasına ne yapıyor?",
    },
    {
      passage:
        "Bir dağ okulunun öğrencileri aynı kar çubuğunu dört pazartesi sabahı ölçtü: 18, 26, 21 ve 29 santimetre. Defterde ölçümün yeri ve saati de yazıldı. Öğretmen, son değerin ilkinden büyük olduğunu, fakat her hafta artış olmadığını belirtti. Çubuğun başka bir noktaya taşınmaması karşılaştırma için önemlidir. Bu dört ölçümden bütün dağın yıllık kar miktarı çıkarılmadı.",
      prompt: "Kar çubuğunun aynı noktada tutulması hangi işleve yöneliktir?",
      options: [
        "Farklı zaman ölçümlerinin yer farkıyla karışmasını azaltmaya",
        "Her ölçümün mutlaka aynı sayı çıkmasını sağlamaya",
        "Bütün dağın yıllık toplamını doğrudan vermeye",
        "Dört ölçümün sırasını değiştirmeye",
        "Öğrencilerin hava durumunu kontrol etmesine",
      ],
      reasons: [
        "Yer sabit tutulunca farklı noktaların etkisi ölçüm karşılaştırmasına eklenmez.",
        "Aynı yerde ölçümün değerleri değişmiştir; aynı sayı garantisi yoktur.",
        "Son cümle yıllık dağ toplamı çıkarılmadığını söyler.",
        "Yer sabitliği kronolojik sırayı değiştirmez.",
        "Hava koşullarını öğrencilerin kontrol ettiği söylenmez.",
      ],
      knowledge:
        "Karşılaştırmanın koşullarını sabit tutmak ölçülen değişimin yorumunu destekler; eşit sonuç garantisi vermez.",
      strategy:
        "Dördüncü cümledeki karşılaştırma vurgusunu ölçüm yeriyle birleştir.",
      steps: [
        "Dört ölçüm farklı zamanlarda aynı çubukla yapılmıştır.",
        "Çubuk taşınırsa yer farkı da değeri etkileyebilir; aynı noktada tutmak bu farkı azaltır.",
        "Bu işlevi söyleyen adayı seç; eşit sayı veya tüm dağı temsil gibi kapsamlar ekleme.",
      ],
      commonError: "Sabit ölçüm koşulunu sabit ölçüm sonucu sanmak.",
      check:
        "18,26,21,29 sayıları aynı yerin aynı sayı garantisi vermediğini gösteriyor mu?",
    },
    {
      passage:
        "Bir dağ okulunun öğrencileri aynı kar çubuğunu dört pazartesi sabahı ölçtü: 18, 26, 21 ve 29 santimetre. Defterde ölçümün yeri ve saati de yazıldı. Öğretmen, son değerin ilkinden büyük olduğunu, fakat her hafta artış olmadığını belirtti. Çubuğun başka bir noktaya taşınmaması karşılaştırma için önemlidir. Bu dört ölçümden bütün dağın yıllık kar miktarı çıkarılmadı.",
      prompt: "Bu parçadan hangisine ulaşılamaz?",
      options: [
        "Ölçümlerin bütün dağın yıllık kar toplamını verdiğine",
        "Dört pazartesi sabahı ölçüm yapıldığına",
        "Yer ve saat bilgisinin deftere yazıldığına",
        "Son ölçümün ilkinden yüksek olduğuna",
        "Her hafta artış gerçekleşmediğine",
      ],
      reasons: [
        "Son cümle böyle bir toplam çıkarılmadığını açıkça belirtir.",
        "İlk cümlede dört pazartesi sabahı denir.",
        "İkinci cümle yer ve saat kaydını verir.",
        "29,18’den büyüktür; öğretmen de bunu belirtir.",
        "26’dan 21’e düşüş ve öğretmenin açıklaması bu yargıyı destekler.",
      ],
      knowledge:
        "Bir noktada dört ölçüm, daha geniş yer ve zaman toplamının yerine geçmez.",
      strategy:
        "Son cümlenin hangi iki kapsamı genişletmeyi engellediğini belirle.",
      steps: [
        "Dört pazartesi sabahı aynı yerdeki kar çubuğu ölçülmüştür.",
        "Veriler bir çubuğun dört sabahına aittir; bütün dağ ve bütün yıl kapsamı verilmemiştir.",
        "Bu genişlemeyi yapan adayı seç; öteki adaylar açık kayıt veya verilen sayılardan doğrulanır.",
      ],
      commonError:
        "Sınırlı yer ve zaman örneğini bütün yılın ve alanın toplamı saymak.",
      check:
        "Cevabın ölçüm noktası ile dağ, dört sabah ile yıl ayrımlarını koruyor mu?",
    },
    {
      passage:
        "Bir dağ okulunun öğrencileri aynı kar çubuğunu dört pazartesi sabahı ölçtü: 18, 26, 21 ve 29 santimetre. Defterde ölçümün yeri ve saati de yazıldı. Öğretmen, son değerin ilkinden büyük olduğunu, fakat her hafta artış olmadığını belirtti. Çubuğun başka bir noktaya taşınmaması karşılaştırma için önemlidir. Bu dört ölçümden bütün dağın yıllık kar miktarı çıkarılmadı.",
      prompt: "Parçanın anlatımında aşağıdaki yollardan hangisi belirgindir?",
      options: [
        "Somut ölçümlerle bir yorumun sınırını göstermek",
        "Bir kişinin çocukluğunu ayrıntılı anlatmak",
        "Bir şiirin ses özelliklerini incelemek",
        "Doğrudan olay verisi olmadan yalnız duygusal yargı sıralamak",
        "Gelecek yılın kar miktarını kesin tahmin etmek",
      ],
      reasons: [
        "Sayılar ilk-son artış ve ara düşüş yorumunu temellendirir, kapsamın sınırı ayrıca belirtilir.",
        "Çocukluk anlatısı yoktur.",
        "Şiir veya ses incelemesi yoktur.",
        "Dört somut ölçüm açıkça verilmiştir.",
        "Gelecek yıl hakkında tahmin yoktur.",
      ],
      knowledge:
        "Anlatımın işlevi somut verilerin hangi açıklamaya hizmet ettiğine bakılarak belirlenir.",
      strategy: "Sayı dizisinin öğretmenin yargısında hangi işi gördüğünü bul.",
      steps: [
        "Paragraf dört ölçümü açıkça verir.",
        "Öğretmen bu değerlerle iki farklı artış iddiasını ayırır ve daha geniş toplamı çıkarmaz.",
        "Somut ölçümle yorum sınırı kurulduğunu söyleyen adayı seç; diğer tür ve amaçlar metinde yoktur.",
      ],
      commonError:
        "Sayısal veri gördüğünde işlevini açıklamadan yalnız hesap sorusu sanmak.",
      check:
        "Veriler hangi yorumun gerekçesi, son cümle hangi kapsamın sınırı?",
    },
    {
      passage:
        "Bir otogar ekibi yeni yön tabelalarını iki gün boyunca gönüllülerle denedi. Katılımcılar, tanımadıkları perona giderken duraksadıkları noktaları işaretledi. Ekip, en çok işaretlenen iki kavşağa ek ok yerleştirdi. Deneme grubu yalnız ilk kez gelen yetişkinlerden oluşuyordu. Çocuklar ve sürekli yolcular bu denemede gözlenmediği için ekip yeni düzenin herkeste aynı kolaylığı sağlayacağını söylemedi.",
      prompt: "Bu çalışmada ek okların yerini belirleyen veri hangisidir?",
      options: [
        "Gönüllülerin en çok duraksama işareti koyduğu noktalar",
        "Bütün çocukların tercih ettiği renkler",
        "Sürekli yolcuların bilet fiyatları",
        "Otogarın yıllık gelir sıralaması",
        "Tabelaların yalnız üretim maliyeti",
      ],
      reasons: [
        "İkinci ve üçüncü cümle işaretlerin yoğunluğuna göre iki kavşağın seçildiğini gösterir.",
        "Çocuklar gözlenmemiştir; renk tercihi ölçülmemiştir.",
        "Sürekli yolcular gözlenmemiş, fiyat verisi sunulmamıştır.",
        "Yıllık gelir incelenmemiştir.",
        "Maliyet ölçütü anlatılmaz.",
      ],
      knowledge:
        "Bir müdahale noktasının ölçütü, karara bağlanan gözlemden çıkarılır.",
      strategy: "Katılımcıların verdiği işaretle ekibin kavşak seçimini bağla.",
      steps: [
        "Katılımcılar duraksadıkları yerleri işaretlemiştir.",
        "Ekip en çok işaretlenen iki kavşağa ok eklemiştir; kararın dayanağı bu yoğunluktur.",
        "Bu veriyi söyleyen adayı seç; renk, fiyat, gelir ve maliyet verileri ekleme.",
      ],
      commonError:
        "Kararın temelini belirtilmeyen maliyet veya genel beğeni ölçütüne dayandırmak.",
      check:
        "En çok işaretlenme ile ek ok yerleştirme arasında açık bağ var mı?",
    },
    {
      passage:
        "Bir otogar ekibi yeni yön tabelalarını iki gün boyunca gönüllülerle denedi. Katılımcılar, tanımadıkları perona giderken duraksadıkları noktaları işaretledi. Ekip, en çok işaretlenen iki kavşağa ek ok yerleştirdi. Deneme grubu yalnız ilk kez gelen yetişkinlerden oluşuyordu. Çocuklar ve sürekli yolcular bu denemede gözlenmediği için ekip yeni düzenin herkeste aynı kolaylığı sağlayacağını söylemedi.",
      prompt:
        "Ekibin herkeste aynı kolaylığın sağlanacağını söylememesinin gerekçesi nedir?",
      options: [
        "Deneme grubunun ilk kez gelen yetişkinlerle sınırlı olması",
        "Hiçbir katılımcının tabelaları denememesi",
        "Ek okların bütün kavşaklara konulması",
        "Çocukların daha hızlı yürüdüğünün kanıtlanması",
        "Denemenin bütün yıl sürmesi",
      ],
      reasons: [
        "Son iki cümle gözlenmeyen gruplar nedeniyle genellemenin sınırını açıklar.",
        "İlk iki cümle gönüllü denemesini anlatır.",
        "Yalnız iki kavşağa ok yerleştirilmiştir.",
        "Çocuklar gözlenmediği için hızları hakkında böyle bir kanıt yoktur.",
        "Deneme iki gün sürmüştür.",
      ],
      knowledge:
        "Örneklemin özellikleri, sonuçların hangi gruplara genellenebileceğini sınırlar.",
      strategy:
        "Kimlerin gözlendiği ile kimlerin dışarıda kaldığını birlikte kullan.",
      steps: [
        "Deneme grubu yalnız ilk kez gelen yetişkinlerden oluşur.",
        "Çocuklar ve sürekli yolcular gözlenmediğinden onların aynı sonucu vereceği doğrulanmaz.",
        "Grup sınırını gerekçe yapan adayı seç; hiç deneme yok veya tüm yıl sürme gibi ters bilgileri ele.",
      ],
      commonError:
        "Gözlenmeyen grupları gözlenenlerle aynı sonuçta zorunlu birleştirmek.",
      check: "Son iki cümlede gözlenmeyen iki grubu adlandırabiliyor musun?",
    },
    {
      passage:
        "Bir otogar ekibi yeni yön tabelalarını iki gün boyunca gönüllülerle denedi. Katılımcılar, tanımadıkları perona giderken duraksadıkları noktaları işaretledi. Ekip, en çok işaretlenen iki kavşağa ek ok yerleştirdi. Deneme grubu yalnız ilk kez gelen yetişkinlerden oluşuyordu. Çocuklar ve sürekli yolcular bu denemede gözlenmediği için ekip yeni düzenin herkeste aynı kolaylığı sağlayacağını söylemedi.",
      prompt: "Bu parçadan hangi yargı çıkarılamaz?",
      options: [
        "Yeni düzenin çocukların yol bulma süresini kesin azalttığı",
        "Gönüllülerin duraksama noktalarını işaretlediği",
        "İki kavşağa ek ok yerleştirildiği",
        "Denemenin iki gün sürdüğü",
        "Ekip tarafından genelleme sınırı konduğu",
      ],
      reasons: [
        "Çocuklar denemede gözlenmemiştir; süre azalışı verisi yoktur.",
        "İkinci cümle işaretleme işlemini açıkça söyler.",
        "Üçüncü cümlede iki kavşak verilir.",
        "İlk cümle iki günlük süreyi belirtir.",
        "Son cümle herkese aynı kolaylık iddiasının kurulmadığını açıklar.",
      ],
      knowledge:
        "Bir gruba ait ölçülmemiş sonuç, başka grubun denemesinden kesin türetilemez.",
      strategy:
        "Çocuklarla ilgili fiilin gözlendi mi gözlenmedi mi olduğunu belirle.",
      steps: [
        "Ek oklar yalnız ilk kez gelen yetişkinlerin duraksama işaretleri değerlendirilerek yerleştirilmiştir.",
        "Çocukların gözlenmediği yazılıdır; sürelerinin azalması hakkında ölçüm verilmez.",
        "Çocuklara kesin etki yükleyen adayı seç; ötekilerin kendi cümle dayanaklarını göster.",
      ],
      commonError:
        "Uygulama denenmişse bütün yaş gruplarında aynı fayda ölçülmüş sanmak.",
      check: "Çocuklara ilişkin bir önce-sonra süre kaydı pasajda var mı?",
    },
    {
      passage:
        "Bir otogar ekibi yeni yön tabelalarını iki gün boyunca gönüllülerle denedi. Katılımcılar, tanımadıkları perona giderken duraksadıkları noktaları işaretledi. Ekip, en çok işaretlenen iki kavşağa ek ok yerleştirdi. Deneme grubu yalnız ilk kez gelen yetişkinlerden oluşuyordu. Çocuklar ve sürekli yolcular bu denemede gözlenmediği için ekip yeni düzenin herkeste aynı kolaylığı sağlayacağını söylemedi.",
      prompt: "Ekibin sonuçları sunma tutumu en iyi hangi sözle anlatılır?",
      options: [
        "Gözlenen veriyi kullanıp yorumun kapsamını sınırlama",
        "Hiç veri toplamadan bütün düzeni reddetme",
        "Bütün yolcu grupları için sınırsız başarı garantisi verme",
        "Yalnız geleneksel alışkanlığı ölçüt sayma",
        "Katılımcı işaretlerini kararın tamamen dışında tutma",
      ],
      reasons: [
        "İşaretler kararda kullanılır ve gözlenmeyen gruplar için garanti verilmez.",
        "Veri toplandığı ve ok eklendiği anlatılır.",
        "Son cümle böyle bir garantiyi özellikle kurmaz.",
        "Karar güncel gönüllü işaretlerine dayanır.",
        "En çok işaretlenen yerler ek okların konacağı kavşakları belirler.",
      ],
      knowledge:
        "Tutum değerlendirmesi hem yapılan kararı hem açıklanan sınırı kapsamalıdır.",
      strategy:
        "Eylemi ve sonuç cümlesini iki ayrı tutum kanıtı olarak birleştir.",
      steps: [
        "Ekip katılımcı işaretlerine göre iki noktada düzenleme yapar.",
        "Son cümlede gözlenmeyen gruplara aynı etkiyi genellemez.",
        "Hem veri kullanımı hem kapsam sınırlamasını veren adayı seç; yalnız ret veya garanti seçeneklerini ele.",
      ],
      commonError:
        "Temkinli yorumlamayı hiçbir gözlemi kabul etmemekle eşitlemek.",
      check:
        "Cevabın ekibin gerçekten yaptığı düzenlemeyi de görünür tutuyor mu?",
    },
  ],
  [
    {
      passage:
        "Bir gökbilim kulübü, gökyüzündeki takımyıldızları anlatan afişlerdeki adları inceliyor. Aynı yıldız grubunun farklı kültürlerde başka varlıklarla ilişkilendirildiğini karşılaştırıyor. Çalışma yıldızların uzaklığını ölçmüyor; insanların gökyüzünü adlandırma biçimlerine odaklanıyor.",
      prompt: "Bu parçanın konusu hangisidir?",
      options: [
        "Takımyıldız adlarının kültürlere göre değişen anlamlandırılması",
        "Yıldızların fiziksel uzaklıklarının yeni ölçümlerle bulunması",
        "Gökbilim kulübünün kuruluş ve büyüme tarihi",
        "Bütün kültürlerin gökyüzünü aynı biçimde yorumlaması",
        "Afiş basımında kullanılan renklerin maliyeti",
      ],
      reasons: [
        "İkinci ve son cümle adlandırmadaki kültürel farkı ortak odak olarak açıklar.",
        "Uzaklık ölçülmediği özellikle belirtilir.",
        "Kulübün kuruluş geçmişi anlatılmaz.",
        "Farklı varlıklarla ilişkilendirme verisi aynılık iddiasını bozuyor.",
        "Basım maliyeti incelenmez.",
      ],
      knowledge:
        "Konu, aynı nesnenin metinde incelenen özel yönünü adlandırır.",
      strategy:
        "Yıldız nesnesini görünce fiziksel ölçüme atlamadan çalışma odağını bul.",
      steps: [
        "Afişlerdeki adlar incelenir ve farklı kültürlerin aynı gruba verdiği anlamlar karşılaştırılır.",
        "Son cümle fiziksel uzaklığı dışlayıp insanların adlandırma biçimini odağa alır.",
        "Kültürel adlandırmayı veren adayı seç; fiziksel ölçüm, kuruluş veya basım fiyatı ekleme.",
      ],
      commonError:
        "Metindeki gökbilim sözcüğünden her astronomi konusunun işlendiğini varsaymak.",
      check: "Seçeneğin uzaklık değil adlandırma farkını mı söylüyor?",
    },
    {
      passage:
        "Bir terzi, ölçü defterindeki kısaltmaları yeni çırağa açıklıyor. Bazı işaretlerin yalnız kendi atölyelerinde kullanıldığını, başka bir ustanın defterine aynen taşınamayacağını gösteriyor. Denemeler boyunca yanlış okunan işaretleri açık sözcüklerle yeniden yazıyor.",
      prompt: "Parçada üzerinde durulan konu nedir?",
      options: [
        "Atölye içi ölçü notlarının anlaşılır aktarılması ve yerel işaretlerin sınırı",
        "Terzilikte kullanılan bütün kumaşların fiziksel dayanıklılığı",
        "Çırağın çocukluğundan başlayan kişisel yaşamı",
        "Ölçü defterlerinin yalnız süsleme amacıyla kullanılması",
        "Bütün ustaların aynı kısaltmaları zorunlu kullanması",
      ],
      reasons: [
        "Açıklama, başka deftere aynen aktaramama ve açık yazma aynı not aktarımı sorununu işler.",
        "Kumaş türleri veya dayanıklılık verisi yoktur.",
        "Çırağın yaşam öyküsü anlatılmamıştır.",
        "Defter işaretleri ölçü bilgisini taşıyan araçlardır.",
        "Bazı işaretlerin atölyeye özgü olduğu aynılık savını sınırlar.",
      ],
      knowledge:
        "Konu belirlemede cümlelerin ortak sorunu ve onu çözmeye dönük işlemler birlikte okunur.",
      strategy:
        "Kısaltma, anlam sınırı ve yeniden yazma eylemlerini ortak bir odakta topla.",
      steps: [
        "İlk cümle notların çırağa açıklanmasını anlatır.",
        "Sonraki cümleler yerel işaretin aktarım sınırını ve yanlış okumaya karşı açık yazmayı verir.",
        "Bu üç eylemi kapsayan adayı seç; malzeme, biyografi veya zorunlu tek sistem adayı dışarıda kalır.",
      ],
      commonError:
        "İlk nesne defter diye konuyu defterin süsleme veya üretimine kaydırmak.",
      check:
        "Konu adın hem açıklamayı hem atölyeye özgü işaret sınırını kapsıyor mu?",
    },
    {
      passage:
        "Bir ses sanatçısı eski kayıtları dinlerken yalnız söylenen söze bakmıyor. Uzun duraklamaların, nefesin ve vurgu değişimlerinin anlatıya kattığı anlamı da not ediyor. Kayıtları daha hızlı dinlediğinde bu ayrıntılardan bazılarının silikleştiğini söylüyor.",
      prompt: "En uygun konu hangisidir?",
      options: [
        "Ses kayıtlarında söz dışındaki söyleyiş ayrıntılarının anlama katkısı",
        "Bütün eski kayıtların yapıldığı cihazların fiyatı",
        "Sanatçının her kaydı aynı hızda üretmesi",
        "Yalnız kelimelerin yazım kuralları",
        "Kayıtların süre sırasına göre depolanması",
      ],
      reasons: [
        "Duraklama, nefes ve vurgu ortak olarak söyleyişin anlam etkisini açıklar.",
        "Cihaz fiyatı yoktur.",
        "Dinleme anlatılır; bütün kayıtları aynı hızda üretme söylenmez.",
        "Söz dışındaki işitsel özellikler özellikle öne çıkarılır.",
        "Depolama sırası incelenmemiştir.",
      ],
      knowledge:
        "Bir sıralama veya araç sözcüğü, cümlelerin asıl açıkladığı ilişkinin yerine geçmez.",
      strategy:
        "Üç işitsel ayrıntının ortak işlevini son cümledeki kayıpla birlikte düşün.",
      steps: [
        "Sanatçı duraklama, nefes ve vurguyu ayrı ayrı not eder.",
        "Bunlar anlatıya anlam katan söyleyiş özellikleridir; hızlanmada ayrıntı kaybı bu odağı destekler.",
        "Söyleyiş ve anlam bağını seç; fiyat, üretim veya depolama alanını ekleme.",
      ],
      commonError:
        "Hız sözcüğünü görünce konuyu ses cihazının teknik üretimine indirgemek.",
      check: "Duraklama ve nefes seçtiğin konuya doğrudan dâhil mi?",
    },
    {
      passage:
        "Bir deneme yazarı iki otobüs yolculuğunu anlatıyor: Birinde kimse çevreye bakmazken diğerinde yolcular gördükleri bir yapıyı birlikte konuşuyor. Yazar bu iki sahneyle yolculuğun yalnız bir yer değiştirme değil, ortak dikkat oluşturma fırsatı da olabileceğini düşünüyor.",
      prompt: "Bu parçanın konusu hangisidir?",
      options: [
        "Yolculuğun insanlar arasında ortak dikkat ve konuşmaya alan açması",
        "Otobüslerin bütün teknik bakım aşamaları",
        "İki şehrin nüfus artış hızları",
        "Yolcuların her koşulda aynı konuya ilgi duyması",
        "Yalnız görülen yapının inşa maliyeti",
      ],
      reasons: [
        "İki sahne ortak dikkat ve konuşma imkânını göstermek için karşılaştırılır.",
        "Teknik bakım anlatılmaz.",
        "Nüfus veya artış hızı verilmez.",
        "İlk sahnede ortak dikkat bulunmaması koşulsuz aynılığı engeller.",
        "Yapı örnektir; maliyeti incelenmez.",
      ],
      knowledge:
        "Örnek sahnelerin ortaklaştırdığı ilişki, tek sahnedeki nesnenin ayrıntısından daha kapsayıcı konudur.",
      strategy:
        "Yapının kendisinden önce iki sahnenin niçin yan yana getirildiğini bul.",
      steps: [
        "İki yolculukta çevreye yönelen ortak dikkat farklıdır.",
        "Yazar bu farkla yolculuğun ortak konuşma fırsatı olabileceğini tartışır.",
        "Bu ilişkiyi adlandıran adayı seç; yapı maliyeti veya teknik bakım metnin odağı değildir.",
      ],
      commonError: "Bir sahnede adı geçen yapıyı bütün metnin konusu sanmak.",
      check: "Her iki yolculuk seçtiğin ortak ilişkiye katkı veriyor mu?",
    },
    {
      passage:
        "Bir araştırmacı eski mektup zarflarındaki damgaları okuyarak mektupların izlediği güzergâhları çıkarıyor. Damga yerlerini tarihle birlikte karşılaştırıyor. Mektupların içindeki kişisel anlaşmazlıkları ise bu çalışmada çözümlemiyor.",
      prompt: "Bu parçanın konusu nedir?",
      options: [
        "Posta damgaları yardımıyla eski mektupların taşıma yollarını belirleme",
        "Mektup yazarları arasındaki bütün kişisel sorunlar",
        "Eski kâğıtların kimyasal üretim süreci",
        "Zarfların sanat piyasasındaki satış değeri",
        "Her mektubun aynı yoldan taşındığının ispatı",
      ],
      reasons: [
        "Damga, yer ve tarih karşılaştırması taşıma güzergâhını çıkarmaya yöneliktir.",
        "Kişisel anlaşmazlıklar dışarıda bırakılmıştır.",
        "Kâğıt üretimi incelenmez.",
        "Piyasa değeri verilmez.",
        "Güzergâhlar çıkarılır; hepsinin aynı olduğu söylenmez.",
      ],
      knowledge:
        "Konu adlandırması kullanılan veri ile araştırılan ilişkiyi birlikte taşıyabilir.",
      strategy: "Damgaların hangi soruya cevap bulmak için okunduğunu belirle.",
      steps: [
        "Veri damgalardaki yer ve tarihlerdir.",
        "Bu veriler mektupların izlediği güzergâhı araştırmak için karşılaştırılır.",
        "Damga-güzergâh bağını veren adayı seç; içerik tartışması ve fiyat bilgisi ekleme.",
      ],
      commonError:
        "Mektup nesnesinden otomatik olarak kişisel duygu veya anlaşmazlık konusu çıkarmak.",
      check:
        "Seçeneğinde hem veri kaynağı hem araştırılan yol ilişkisi var mı?",
    },
    {
      passage:
        "Bir seramik kursunda öğrenciler aynı biçimdeki kabı üç farklı sırla kaplıyor. Eğitmen, renk ve yüzey farklarını yan yana gösterip seçim yapılırken kabın kullanım amacının da düşünülmesini istiyor. Kursun anlatıldığı bölümde satış veya müşteri talebi ele alınmıyor.",
      prompt: "Parçanın konusu hangisidir?",
      options: [
        "Seramikte sır seçiminin görünüş ve kullanım amacıyla ilişkisi",
        "Seramik ürünlerinin bütün pazarlardaki satış miktarı",
        "Kursa katılanların yaşlarına göre dağılımı",
        "Yalnız bir kabın sayısal ağırlığı",
        "Üç sırın her kullanımda aynı sonucu vermesi",
      ],
      reasons: [
        "Renk, yüzey ve kullanım amacı sır seçiminin karşılaştırma boyutlarıdır.",
        "Satış ele alınmadığı açıkça söylenir.",
        "Yaş dağılımı sunulmaz.",
        "Ağırlık ölçülmemiştir.",
        "Üç sırın farklı özellikleri karşılaştırılır; koşulsuz aynı sonuç yoktur.",
      ],
      knowledge:
        "Bir seçimin birden çok ölçütü anlatılıyorsa konu bu ölçütler arasındaki ilişkiyi kapsamalıdır.",
      strategy:
        "Sırların farkını ve kullanım amacı koşulunu aynı konuya bağla.",
      steps: [
        "Aynı biçimdeki kaplar üç sırla farklı renk ve yüzey kazanır.",
        "Eğitmen seçimi kullanım amacıyla birlikte düşünmeyi ister.",
        "Görünüş ve amaç ilişkisini kapsayan adayı seç; satış veya yaş alanlarını ele.",
      ],
      commonError:
        "Somut kap örneğini yalnız ağırlık ölçümü gibi dar bir alana indirmek.",
      check: "Kullanım amacı cümlesi seçtiğin konu altında açıklanabiliyor mu?",
    },
    {
      passage:
        "Bir kent tarihçisi, sokak adlarının değişimini yalnız resmî listelerden okumuyor. Esnafın ve mahalle sakinlerinin eski adları hangi durumlarda sürdürdüğünü de kaydediyor. Resmî ad ile gündelik kullanımın aynı hızda değişmediğini gözlüyor.",
      prompt: "Bu parçanın konusu hangisidir?",
      options: [
        "Sokak adlarının resmî kayıtlardaki değişimi ile gündelik kullanım arasındaki ilişki",
        "Kentteki bütün esnafın ekonomik kazancı",
        "Sokakların fiziksel uzunluklarının ölçülmesi",
        "Bütün eski adların bir günde unutulması",
        "Yalnız tarihçinin kişisel eğitim geçmişi",
      ],
      reasons: [
        "Resmî liste ve gündelik ad kullanımı farklı değişim hızlarıyla karşılaştırılır.",
        "Kazanç verisi sunulmaz.",
        "Uzunluk ölçümü yoktur.",
        "Aynı hızda değişmeme bilgisi bir günde tümüyle unutulma savını desteklemez.",
        "Tarihçinin biyografisi anlatılmaz.",
      ],
      knowledge:
        "İki kaynak türünün aynı olay hakkında farklı görünüşler sunması bir ilişki konusudur.",
      strategy:
        "Liste ile konuşma kaydının hangi değişim bakımından karşılaştırıldığını bul.",
      steps: [
        "İlk kaynak resmî sokak adı listeleridir.",
        "İkinci kaynak mahallelinin eski adları kullanmayı sürdürdüğü durumlardır.",
        "İki kullanım arasındaki değişim ilişkisini seç; ekonomi, uzunluk ve biyografi dışarıda kalır.",
      ],
      commonError:
        "Sokak adlarını gerçek sokakların fiziksel ölçümüyle aynı konu sanmak.",
      check: "Resmî ve gündelik kullanım ayrımı cevabında korunuyor mu?",
    },
    {
      passage:
        "Bir öğretmen, öğrencilerin taslaklarına yalnız yanlış işareti koymuyor. Hangi bölümün anlaşılmadığını açıklayan kısa sorular yazıyor ve öğrencinin metni yeniden düzenlemesini istiyor. Her taslağı kendi yerine yeniden yazmaktan kaçınıyor.",
      prompt: "En uygun konu hangisidir?",
      options: [
        "Yazı taslağına öğrencinin yeniden düşünmesini sağlayan geribildirim verme",
        "Öğretmenin bütün metinleri öğrencinin yerine yazması",
        "Sınıftaki öğrencilerin sınav puanlarının sıralanması",
        "Yanlış işaretlerinin renk kimyası",
        "Eğitim tarihindeki bütün öğretim yöntemleri",
      ],
      reasons: [
        "Soru biçimindeki geribildirim öğrencinin kendi taslağını yeniden düzenlemesine yöneliktir.",
        "Öğretmen yerine yeniden yazmaktan kaçınır.",
        "Puan sıralaması verilmez.",
        "İşaretlerin kimyasal niteliği tartışılmaz.",
        "Metin tek bir geribildirim yoluna odaklanır; bütün eğitim tarihi değildir.",
      ],
      knowledge:
        "Bir uygulamanın yöntemi ile hedefi birlikte anlatılıyorsa konu bu odağı taşımalıdır.",
      strategy:
        "Kısa soruların öğrencide hangi işi başlatmak için verildiğini belirle.",
      steps: [
        "Öğretmen anlaşılmayan bölümü sorularla görünür kılar.",
        "Yeniden düzenlemeyi öğrencinin yapmasını ister; işi onun yerine bitirmez.",
        "Öğrencinin yeniden düşünmesini sağlayan geribildirim odağını seç; puan veya bütün yöntemler alanını ekleme.",
      ],
      commonError:
        "Öğrenciye destek verilmesini onun yerine bütün görevin yapılması sanmak.",
      check: "Öğretmenin yapmadığı işi de sınır olarak korudun mu?",
    },
    {
      passage:
        "Bir fotoğraf denemesi, aynı odanın sabah ve akşam ışığında nasıl başka ayrıntılar gösterdiğini anlatıyor. Fotoğrafçı odadaki eşyaları değiştirmiyor; pencerenin yönü ve ışığın geliş açısını not ediyor. Değişen görünüşü yalnız eşya sayısıyla açıklayamıyor.",
      prompt: "Parçanın konusu hangisidir?",
      options: [
        "Işık koşullarının aynı mekânın fotoğraftaki görünüşüne etkisi",
        "Odadaki eşyaların sayısının zamanla artması",
        "Pencerelerin satış fiyatlarının düşmesi",
        "Fotoğrafçının her mekânda aynı yorumu yapması",
        "Bir evin tapu ve mülkiyet geçmişi",
      ],
      reasons: [
        "Aynı oda ve sabit eşyalar farklı ışık koşullarında karşılaştırılır.",
        "Eşyalar değiştirilmediği için sayı artışı anlatılmaz.",
        "Pencere fiyatı yoktur.",
        "Bütün mekânlarda aynı yorum genellemesi kurulmaz.",
        "Mülkiyet geçmişi ele alınmaz.",
      ],
      knowledge:
        "Değişen ve sabit tutulan öğeleri ayırmak metnin incelediği ilişkiyi belirginleştirir.",
      strategy:
        "Sabit eşyalarla değişen ışığı karşılaştırıp görüntü farkının hangi yönünün incelendiğini bul.",
      steps: [
        "Oda ve eşyalar aynıdır; sabah ve akşam ışığı değişir.",
        "Fotoğrafçı yön ve geliş açısını not ederek görünüş farkını ışıkla ilişkilendirir.",
        "Işık-görünüş bağını adlandıran adayı seç; eşya artışı veya fiyat alanı ekleme.",
      ],
      commonError:
        "Aynı nesnelerin farklı görünmesini nesne sayısının değişmesine bağlamak.",
      check: "Hangi öğe sabit, hangi koşul değişken olarak anlatılmış?",
    },
    {
      passage:
        "Bir yazıda dil öğrenen yetişkinlerin günlük konuşmalardan kendi kısa sözlüklerini oluşturması anlatılıyor. Yeni sözcüklerin tek başına değil, duyuldukları cümleyle kaydedildiği belirtiliyor. Çalışma bu defterleri hazırlama biçimini açıklıyor; bütün dil öğretiminin tarihini vermiyor.",
      prompt:
        "Bu metnin konusu için “dil eğitimi” adayının temel eksiği nedir?",
      options: [
        "Metnin özel olarak açıkladığı bağlamlı kişisel sözlük hazırlama odağını belirtmemesi",
        "Metinde dille ilgili hiçbir şey bulunmaması",
        "Adayın gereğinden az harf içermesi",
        "Konu adının mutlaka kişi adı olmak zorunda olması",
        "Her konu seçeneğinin tam bir yargı cümlesi olmak zorunda olması",
      ],
      reasons: [
        "Dil eğitimi genel alandır; metnin ayırt edici yönü cümle içinde kişisel sözlük hazırlamadır.",
        "Dil öğrenme açıkça anlatılmaktadır.",
        "Harf sayısı kapsam ölçütü değildir.",
        "Konu kişi adı olmak zorunda değildir.",
        "Konu adlandırması ad öbeği de olabilir.",
      ],
      knowledge:
        "Çok geniş aday, alanla ilişkili olsa bile metnin ayırt edici yönünü söylemeyebilir.",
      strategy: "Genel alanla özel uygulamayı iki satırda ayır.",
      steps: [
        "Genel alan dil öğrenmedir.",
        "Özel uygulama, günlük konuşmada duyulan sözcükleri kendi cümle bağlamıyla kaydetmektir.",
        "Adayın bu özel yönü belirtmemesini seç; uzunluk veya dil bilgisi biçimi gibi sahte ölçütler kullanma.",
      ],
      commonError: "Bir genel alan metne değiyor diye en uygun konu saymak.",
      check:
        "Daha özel bir konu adı, metindeki bütün temel cümleleri dışlamadan kurulabiliyor mu?",
    },
    {
      passage:
        "Bir söyleşi, bir çevirmenin yalnız kelime karşılığı aramakla yetinmediğini anlatıyor. Konuşmanın hızını, şakaların bağlamını ve karakterlerin birbirine hitap biçimini de tartışıyor. Son bölüm bu tercihlerin tek bir doğru kalıba indirgenemeyeceğini vurguluyor.",
      prompt: "Bu parçaya en uygun başlık hangisidir?",
      options: [
        "Çeviride Anlam, Ritim ve Ses",
        "Sözlük Basımının Maliyeti",
        "Bütün Çevirilerin Tek Kuralı",
        "Çevirmenin Çocukluk Evleri",
        "Yalnız Sözcük Sayısı",
      ],
      reasons: [
        "Başlık kelime anlamı yanında hız, şaka ve hitap sesini kapsar.",
        "Basım maliyeti yoktur.",
        "Son cümle tek doğru kalıp iddiasını sınırlar.",
        "Çocukluk yaşamı anlatılmaz.",
        "Sözcük sayısı metnin anlam ve üslup odağını kapsamaz.",
      ],
      knowledge:
        "Başlık metnin temel alanını ayırt edici vurgularıyla kısa biçimde tanıtmalıdır.",
      strategy: "Anlam dışındaki iki önemli boyutu da başlık adayına uygula.",
      steps: [
        "Metin kelime karşılığının yanında konuşma hızını ve hitabı anlatır.",
        "Bu seçimler anlam, ritim ve karakter sesi boyutlarında toplanabilir.",
        "Üç boyutu kapsayan başlığı seç; tek kural veya yalnız sayı başlığı sınırı bozar.",
      ],
      commonError:
        "Tekrar eden kelime sözcüğünü bütün paragrafın tek odağı saymak.",
      check: "Başlığın şaka bağlamı ve konuşma hızını da içeriyor mu?",
    },
    {
      passage:
        "Bir kasaba, kullanılmayan su değirmenini onarıp öğrencilerin üretim araçlarını deneyebildiği bir eğitim alanına dönüştürüyor. Yapının eski parçaları tanıtılıyor ve yeni deney masaları bunlardan ayrılarak yerleştiriliyor. Değirmenin eski işleviyle yeni kullanımı birlikte anlatılıyor.",
      prompt: "En uygun başlık hangisidir?",
      options: [
        "Değirmenden Deney Alanına",
        "Kasabanın Bütün Ekonomik Gelirleri",
        "Yeni Değirmen Ununun Satışı",
        "Tarihin Tamamen Silinmesi",
        "Yalnız Bir Masanın Ölçüsü",
      ],
      reasons: [
        "Başlık eski işlev ile yeni eğitim kullanımını birlikte taşır.",
        "Ekonomik gelirler anlatılmaz.",
        "Un satışı değil eğitim kullanımı açıklanır.",
        "Eski parçalar tanıtılarak korunur; tamamen silinme söylenmez.",
        "Tek masa ayrıntısı metnin dönüşümünü kapsamaz.",
      ],
      knowledge:
        "Dönüşüm metninin başlığı başlangıç ve yeni kullanım arasındaki bağı kapsamalıdır.",
      strategy: "Eski yapı ve yeni etkinliğin ortak dönüşümünü adlandır.",
      steps: [
        "Başlangıçtaki nesne kullanılmayan su değirmenidir.",
        "Onarım sonrası öğrencilerin deneyebildiği eğitim alanına dönüşür; eski parçalar da tanıtılır.",
        "Bu iki ucu birleştiren başlığı seç; un satışı veya tek masa odağına daralma.",
      ],
      commonError: "Eski yapı sözcüğünü görünce yeni işlevi yok saymak.",
      check: "Başlıkta hem değirmen hem yeni öğrenme kullanımı görünür mü?",
    },
    {
      passage:
        "Bir anlatıcı tren istasyonunda duyduğu ilanları, ayak seslerini ve bavul tekerleklerini ayrı ayrı not ediyor. Bu seslerin mekânı görmeden de bir yer duygusu kurabildiğini anlatıyor. Metin trenlerin motor gücünü ölçmüyor.",
      prompt: "En uygun başlık hangisidir?",
      options: [
        "İstasyonun İşitilen Yüzü",
        "Lokomotiflerin Motor Gücü",
        "Yolculuk Ücretleri Cetveli",
        "Bütün Şehirlerin Ortak Tarihi",
        "İstasyonsuz Bir Dünya",
      ],
      reasons: [
        "İşitilen seslerle mekân duygusu kurma odağını taşır.",
        "Motor gücü özellikle dışarıda bırakılmıştır.",
        "Ücret verisi yoktur.",
        "Bütün şehir tarihi anlatılmaz.",
        "İstasyonun yokluğu değil duyulabilen özellikleri işlenir.",
      ],
      knowledge:
        "Mecazlı başlık ancak metindeki gerçek odağa karşılık veriyorsa uygundur.",
      strategy:
        "İlan, adım ve tekerlek seslerinin hangi ortak etkiyi oluşturduğunu belirle.",
      steps: [
        "Metin üç ses örneğini bir araya getirir.",
        "Ortak etkileri görme olmadan istasyonun yer duygusunu kurabilmeleridir.",
        "Bu odağı kısa biçimde adlandıran başlığı seç; ücret ve motor ölçüsü ekleme.",
      ],
      commonError:
        "Başlığın mecazlı oluşunu içerik uygunluğundan bağımsız ölçüt yapmak.",
      check:
        "“İşitilen yüz” ifadesinin hangi üç metin verisine dayandığını gösterebiliyor musun?",
    },
    {
      passage:
        "Bir yazar, çocukken oynadığı bir oyunun kurallarının yeni mahalleye taşınınca değiştiğini hatırlıyor. Arkadaşlarının oyuna farklı adlar ve yeni kısıtlar eklediğini anlatıyor. Bu anıdan hareketle oyunların yerel ortak kararlarla yeniden kurulmasını tartışıyor.",
      prompt: "En uygun başlık hangisidir?",
      options: [
        "Mahalleden Mahalleye Değişen Oyun",
        "Yazarın Bütün Çocukluğu",
        "Değişmez Oyun Yasaları",
        "Bütün Çocukların Aynı Kararı",
        "Oyuncak Fabrikalarının Üretimi",
      ],
      reasons: [
        "Başlık farklı mahallelerde ad ve kural değişimini kapsar.",
        "Bütün çocukluk yalnız bu tek anıdan daha geniştir.",
        "Kuralların değiştiği anlatılır; değişmezlik uygun değildir.",
        "Farklı eklemeler ve kararlar vardır; aynılık kurulmaz.",
        "Oyuncak üretimi anlatılmaz.",
      ],
      knowledge:
        "Anı örneği bir genel ilişkiyi açıklıyorsa başlık o ilişkiyi kapsamalıdır.",
      strategy: "Bireysel anının açıldığı genel oyun-kural ilişkisini bul.",
      steps: [
        "Örnek yeni mahallede oyun adının ve kısıtlarının değişmesidir.",
        "Yazar bununla yerel ortak kararların oyunları yeniden kurmasını tartışır.",
        "Değişen oyun başlığını seç; bütün çocukluk, sabit yasa veya üretim alanı dışarıda kalır.",
      ],
      commonError:
        "Bir anı anlatıldığında konunun zorunlu bütün yaşam öyküsü olduğunu sanmak.",
      check: "Başlık örnekten çıkarılan yerel kural değişimini koruyor mu?",
    },
    {
      passage:
        "“Mahalle bostanlarında ortak iş bölümü” bir metnin konusu olarak verilmiştir. O metin bu iş bölümünün ancak sorumluluklar açıkça konuşulursa sürdürülebildiğini savunmaktadır.",
      prompt: "Konu ve ana düşünceyi doğru ayıran seçenek hangisidir?",
      options: [
        "Konu ortak iş bölümü; ana düşünce sürdürülebilmesi için sorumlulukların açık konuşulmasının önemidir",
        "Konu bütün tarım tarihi; ana düşünce herkesin aynı işi yapmasıdır",
        "Konu sorumlulukların sayısı; ana düşünce sayı bilgisinin bulunmamasıdır",
        "Konu yazarın hayatı; ana düşünce bostanların yaşını ölçmektir",
        "Konu ve ana düşünce zorunlu aynı sözcüklerden oluşan iki addır",
      ],
      reasons: [
        "Alan ortak iş bölümü; bu alan hakkındaki sav açık sorumluluk koşuludur.",
        "Bütün tarım ve aynı iş iddiası verilmez.",
        "Sorumluluk sayısı ölçülmez.",
        "Yazar hayatı veya bostan yaşı anlatılmaz.",
        "İki görev aynı şey değildir; biri alan, diğeri o alandaki yargıdır.",
      ],
      knowledge:
        "Konu alanı adlandırırken ana düşünce o alanla ilgili temel ilişkiyi yargı olarak kurar.",
      strategy:
        "Verilen konu adını tutup “bu konuda ne savunuluyor?” sorusunu yanıtla.",
      steps: [
        "Verilmiş konu mahalle bostanlarındaki ortak iş bölümüdür.",
        "Sav, bu düzenin sürmesiyle sorumlulukların açık konuşulması arasındaki koşul ilişkisidir.",
        "Alan ve savı ayrı görevlerde veren adayı seç; sayı, yaş veya aynı iş gibi ekler yapma.",
      ],
      commonError: "Ortak iş bölümünü herkesin aynı işi yapmasıyla eşitlemek.",
      check: "Ana düşüncende verilen koşul ilişkisi korunuyor mu?",
    },
    {
      passage:
        "Bir paragrafın konusu “sözlü tarih kayıtlarında soruların hazırlanması”dır. Yazar, ön araştırma yapılmasının konuşmacının cevabına göre yeni sorular sorulmasını engellemediğini savunur.",
      prompt: "Bu bilgiye göre yazarın ana düşüncesi hangisidir?",
      options: [
        "Hazırlık ile yanıta bağlı esneklik birlikte yürüyebilir",
        "Sözlü tarih kayıtlarının sayısı konu başlığıdır",
        "Önceden hazırlanan soru bütün yeni soruları yasaklar",
        "Her konuşmacının aynı cevabı vermesi gerekir",
        "Hazırlıksızlık her zaman tek geçerli yöntemdir",
      ],
      reasons: [
        "Yazarın savı ön araştırma ve yeni yanıta göre soru üretmenin bağdaşmasıdır.",
        "Bu bir kayıt sayısı değildir; ana düşünce yargısını da vermez.",
        "Metin engellememe der; yasaklama tersidir.",
        "Cevapların aynı olması gerektiği belirtilmez.",
        "Ön araştırmanın mümkün ve yararlı biçimde sürdürülebildiği savıyla çelişir.",
      ],
      knowledge:
        "Ana düşünce konu başlığının tekrarı değil, yazarın konuyla ilgili temel savıdır.",
      strategy:
        "Hazırlık ve yeni sorular arasındaki olumsuz olmayan ilişkiyi koru.",
      steps: [
        "Konu soru hazırlamadır; sayı veya bütün cevapların aynılığı değildir.",
        "Yazar ön araştırma ile yeni yanıta uyarlamayı birbirini dışlamayan işler olarak sunar.",
        "Birlikte yürüyebilme yargısını seç; engel veya tek yol ekleyen adayları ele.",
      ],
      commonError:
        "Konu sorusuyla ana düşünce sorusunu aynı adlandırma işi sanmak.",
      check:
        "Seçeneğin yalnız alanı mı adlandırıyor, yoksa iki iş arasındaki savı mı kuruyor?",
    },
    {
      passage:
        "Bir metinde “Kayıp kelimeler” başlığı altında iki kuşağın aynı ev eşyalarına verdiği farklı adlar anlatılıyor. Amaç bu adların hangisinin daha üstün olduğunu sıralamak değil, kullanımın kuşaklara göre değişmesini görünür kılmak.",
      prompt: "Bu parçanın konusu hangisidir?",
      options: [
        "Ev eşyalarının adlandırılmasının kuşaklara göre değişimi",
        "Kayıp eşyaların maddi değerinin belirlenmesi",
        "Bir kuşağın bütün alanlarda üstünlüğü",
        "Evlerin mimari planlarının tarihsel dönüşümü",
        "Bütün kelimelerin sözlükten silinmesi",
      ],
      reasons: [
        "Eşya adları aynı nesneler için iki kuşakta karşılaştırılır.",
        "Kayıp başlığı mecazdır; maddi eşya kaybı ölçülmez.",
        "Üstünlük sıralaması amaç olmadığı belirtilir.",
        "Mimari planlar anlatılmaz.",
        "Bütün kelimelerin silinmesi hakkında bilgi yoktur.",
      ],
      knowledge:
        "Başlıkta kullanılan mecaz, konuyu metnin gerçek açıklamasıyla birlikte belirlemeyi gerektirir.",
      strategy:
        "Kayıp kelimeler ifadesini eşyaların kendisine değil, iki kuşağın kullandığı adlara bağla.",
      steps: [
        "Aynı ev eşyası iki kuşakta farklı adlarla anılır.",
        "Metin üstünlük değil kuşaklara göre kullanım değişimini görünür kılar.",
        "Adlandırma değişimini seç; eşya değeri veya ev planı gibi başka alanlara geçme.",
      ],
      commonError:
        "Başlıktaki kayıp sözcüğünü gerçek bir eşya kaybı diye okumak.",
      check: "Adayın aynı nesne ve farklı ad ilişkisini taşıyor mu?",
    },
    {
      passage:
        "Bir panelde kütüphaneci sessiz çalışma köşelerinin ihtiyacını, drama eğitmeni grup çalışmasının sesli yönünü anlatıyor. Mekân tasarımcısı aynı binada iki kullanım için ayrı bölgeler kurulabileceğini söylüyor. Tartışmada kesin proje seçilmiyor.",
      prompt: "Parçanın ortak konusu hangisidir?",
      options: [
        "Bir öğrenme mekânında farklı çalışma ihtiyaçlarının birlikte planlanması",
        "Yalnız drama eğitmeninin bütün görüşleri",
        "Binanın kesinleşmiş yıkım kararı",
        "Bütün kullanıcıların sessiz çalışmayı reddetmesi",
        "Sadece kitapların basım tekniği",
      ],
      reasons: [
        "Üç konuşmacı aynı mekânda farklı kullanım ihtiyaçlarının düzenlenmesini tartışır.",
        "Tek tarafın görüşü ötekileri kapsamaz.",
        "Kesin proje seçilmediği belirtilir; yıkım kararı yoktur.",
        "Sessiz çalışma ihtiyacı ilk konuşmacı tarafından savunulur.",
        "Basım tekniği incelenmez.",
      ],
      knowledge:
        "Birden çok bakışın ortak konusu, onların cevap verdiği ortak düzenleme problemidir.",
      strategy: "Her konuşmacının kaygısını aynı mekân kararına bağla.",
      steps: [
        "İlk iki konuşmacı sessiz ve sesli çalışma gereksinimlerini açıklar.",
        "Tasarımcı bu farklı ihtiyaçlara aynı binada yer açma yolunu önerir.",
        "İhtiyaçların birlikte planlanması odağını seç; tek kişi veya kesin proje kapsamı ekleme.",
      ],
      commonError:
        "Farklı ihtiyaçların anlatılmasını bütün kullanıcıların tek tercihte birleşmesi sanmak.",
      check:
        "Ortak konu seçtiğinde sessiz ve sesli iki gereksinim de içeride kalıyor mu?",
    },
    {
      passage:
        "Bir eleştirmen, doğa belgesellerinde yalnız etkileyici görüntülerin gösterilip çekim koşullarının saklanmasından yakınıyor. İzleyicinin bir sahnenin nasıl elde edildiğini de bilmesini istiyor. Belgesel çekimine bütünüyle karşı çıkmıyor.",
      prompt: "Eleştirmenin yakındığı durum hangisidir?",
      options: [
        "Etkileyici sahnelerin üretim koşullarının izleyiciden gizlenmesi",
        "Belgesellerin doğayı konu alması",
        "İzleyiciye çekim sürecinin açıklanması",
        "Her sahnede insan bulunması",
        "Bütün görüntülerin bilimsel değer taşımaması",
      ],
      reasons: [
        "Yakınma, görüntülerin yanında çekim koşullarının saklanmasına yöneliktir.",
        "Belgesel çekimine bütünüyle karşı çıkmadığı belirtilir.",
        "Bu önerilen çözüm yönüdür; yakınmanın hedefi değildir.",
        "Her sahnede insan bulunduğu yazılı değildir.",
        "Bütün görüntülerin bilimsel değeri hakkında genel hüküm yoktur.",
      ],
      knowledge:
        "Yakınma sorusu eleştirilen davranışın ne olduğunu ister; önerilen çözümle karıştırılmaz.",
      strategy: "Saklanan bilgi ile istenen açıklığı iki ayrı kutuda düşün.",
      steps: [
        "Eleştirilen durum çekim koşullarının saklanmasıdır.",
        "Çözüm olarak sahnenin nasıl elde edildiğinin bilinmesi istenir.",
        "Gizlenen üretim koşulunu seç; doğa konusu veya önerilen açıklamayı yakınma sayma.",
      ],
      commonError:
        "Eleştirilen uygulamayı bütün türün reddi olarak genişletmek.",
      check:
        "Cevabın eleştiriyi belgeselin tamamına değil belirtilen gizlemeye mi yöneltiyor?",
    },
    {
      passage:
        "Bir deneme, kitap kenarına alınan notların zamanla değişmesini anlatıyor. Yazar aynı kitabı yeniden okuduğunda önceki notlarına katılmadığı yerleri işaretliyor. Bunu kitabın değişmesiyle değil, kendi sorularının ve deneyiminin dönüşmesiyle ilişkilendiriyor.",
      prompt: "Parçanın konusu hangisidir?",
      options: [
        "Yeniden okumada okur yorumlarının zamanla değişmesi",
        "Kitapların her baskıda mutlaka farklı yazılması",
        "Yalnız not almak için kullanılan kalem türleri",
        "Yazarın hiçbir eski düşüncesinin bulunmaması",
        "Bütün okurların aynı hızda değişmesi",
      ],
      reasons: [
        "Eski ve yeni okuma notları okurun soruları ve deneyimiyle karşılaştırılır.",
        "Yazar değişimi kitabın değişmesine bağlamaz.",
        "Kalem türü ayrıntısı yoktur.",
        "Eski notlar önceki düşüncelerin varlığını gösterir.",
        "Tek okur deneyiminden bütün okurların aynı hızı çıkarılmaz.",
      ],
      knowledge:
        "Zaman içinde karşılaştırılan şey kitabın içeriği değil okurun yorumları olabilir.",
      strategy: "Değişen öğeyi yazarın kurduğu neden ilişkisinden belirle.",
      steps: [
        "Aynı kitap yeniden okunur; önceki notlarla yeni düşünceler karşılaştırılır.",
        "Yazar değişimi kendi soruları ve deneyimiyle ilişkilendirir.",
        "Okur yorumunun dönüşümünü konu alan adayı seç; baskı değişimi veya bütün okurlar kapsamını ele.",
      ],
      commonError:
        "Yorumdaki değişimi metnin mutlaka değişmiş olmasına bağlamak.",
      check: "Cevabın “aynı kitap” koşulunu koruyor mu?",
    },
  ],
  [
    {
      passage:
        "Çizelgenin tam verileri: Ölçülen nicelik bir depoya teslim edilen koli sayısıdır. Pazartesi 17, Salı 23, Çarşamba 23, Perşembe 19 koli teslim edilmiştir. Dört günün tamamı kayda alınmıştır.",
      prompt: "Verilen kayıtlara göre hangisi doğrudur?",
      options: [
        "Salı ve çarşamba eşit en yüksek koli sayısına sahiptir",
        "Yalnız salı en yüksek koli sayısına sahiptir",
        "Perşembe en az koli teslim edilen gündür",
        "Dört günün koli sayıları birbirine eşittir",
        "Pazartesi çarşambadan daha çok koli teslim edilmiştir",
      ],
      reasons: [
        "En büyük değer 23’tür ve iki günde bulunur.",
        "Çarşamba da 23 olduğu için yalnız sözü geçersizdir.",
        "En küçük değer pazartesi 17’dir; perşembe 19’dur.",
        "17,23,23,19 değerleri eşit değildir.",
        "17,23’ten küçüktür.",
      ],
      knowledge:
        "En büyük değeri bulmakla bu değeri taşıyan bütün kategorileri belirlemek birlikte gerekir.",
      strategy:
        "Dört sayıyı karşılaştırıp maksimumun kaç kez tekrarlandığını say.",
      steps: [
        "17,23,23,19 içinde en büyük sayı 23’tür.",
        "Bu değer hem salı hem çarşamba kayıtlarında yer alır.",
        "Ortak en yüksek iki günü veren adayı seç; yalnız sözü ekleyen adayı ele.",
      ],
      commonError:
        "İlk gördüğün en yüksek değerde durup sonraki eşit değeri atlamak.",
      check: "İki 23 kaydını da cevabına kattın mı?",
    },
    {
      passage:
        "Bir çizgi serisinin eksiksiz metin eşdeğeri: Ardışık dört ayda su deposunda ay sonunda 56,63,59,68 metreküp su ölçülmüştür. Aylar eşit sıradadır; ara günlerdeki değerler verilmemiştir.",
      prompt: "Hangi yargı kesin doğrudur?",
      options: [
        "Son değer ilkinden 12 metreküp büyüktür; her ay artış olmamıştır",
        "Su miktarı her ay kesin artmıştır",
        "İkinci aydan üçüncü aya 4 metreküp artış vardır",
        "Her ara günün değeri tam olarak bilinmektedir",
        "Dört ayın son değerleri eşittir",
      ],
      reasons: [
        "68−56=12;63→59 geçişi düşüştür.",
        "63’ten 59’a düşüş her ay artış iddiasını bozar.",
        "Bu geçiş 4 metreküp azalıştır.",
        "Yalnız ay sonları verilmiştir; ara günler bilinmez.",
        "Dört değer birbirine eşit değildir.",
      ],
      knowledge:
        "İlk-son fark, bütün komşu değişimlerin aynı yönde olduğunu göstermez.",
      strategy: "İlk-son çıkarma ile 63→59 komşu geçişini ayrı yap.",
      steps: [
        "Son ile ilk fark 68−56=12 metreküptür.",
        "İkinci değerden üçüncüye 63−59=4 metreküp düşüş görülür.",
        "İki bulguyu tutan adayı seç; ara günlerde ölçülmemiş değerler üretme.",
      ],
      commonError: "İlk-son artışını kesintisiz artışın kanıtı sanmak.",
      check: "63→59 geçişinin yönünü cevabınla birlikte okuyabiliyor musun?",
    },
    {
      passage:
        "Atölye kayıtları: A salonu kapasite 70 kişi, katılım 42 kişi; B salonu kapasite 50 kişi, katılım 35 kişi. Doluluk oranı katılım/kapasite×100 olarak tanımlanmıştır.",
      prompt: "Hangi karşılaştırma doğrudur?",
      options: [
        "A’da katılan kişi sayısı daha yüksek, B’de doluluk oranı daha yüksektir",
        "A hem katılım sayısı hem doluluk oranında daha yüksektir",
        "B’de hem katılım sayısı hem kapasite daha yüksektir",
        "İki salonun doluluk oranları eşittir",
        "A’nın doluluğu%70, B’nin doluluğu%50’dir",
      ],
      reasons: [
        "42>35; A 42/70=%60, B 35/50=%70 olur.",
        "A kişi sayısında yüksekken doluluğu%60 ile daha düşüktür.",
        "B katılım 35 ve kapasite 50 ile her ikisinde A’dan küçüktür.",
        "%60 ile%70 eşit değildir.",
        "Bu değerler kapasitelerin sayılarını oran sanır; gerçek oranlar%60 ve%70’tir.",
      ],
      knowledge:
        "Kişi sayısı ve kapasiteye göre doluluk farklı büyüklüklerdir.",
      strategy:
        "Her katılımı kendi kapasitesine böl; sonra sayı ve oran sırasını ayrı söyle.",
      steps: [
        "Katılım sayısında 42,35’ten büyüktür; A daha çok kişiyi ağırlamıştır.",
        "A’nın doluluğu 42/70=%60, B’nin 35/50=%70’tir.",
        "Sayıda A, oranda B sonucunu birlikte veren adayı seç.",
      ],
      commonError:
        "Kapasiteleri farklı iki grupta yüksek katılımı otomatik yüksek doluluk saymak.",
      check: "Paydanın A için 70, B için 50 olduğunu korudun mu?",
    },
    {
      passage:
        "Bir ankette A grubu 80 kişidir ve%45’i semineri seçmiştir. B grubu 150 kişidir ve%28’i semineri seçmiştir. Grupların üyeleri farklıdır; oranlar kesin verilmiştir.",
      prompt: "Semineri seçen kişi sayıları için hangisi doğrudur?",
      options: [
        "B’de seçenler A’dan 6 kişi fazladır",
        "A’da seçenler B’den 17 kişi fazladır",
        "İki grupta seçen kişi sayısı eşittir",
        "A’da 45 kişi, B’de 28 kişi seçmiştir",
        "Gruplar farklı büyüklükte olduğu için kişi sayıları hesaplanamaz",
      ],
      reasons: [
        "A 80×0,45=36; B 150×0,28=42; fark 6 kişidir.",
        "17 iki yüzde sayısının farkıdır; kişi farkı değildir.",
        "36 ile 42 eşit değildir.",
        "Yüzdeleri doğrudan kişi sayısı olarak okur.",
        "Toplamlar ve oranlar açık olduğundan her kişi sayısı hesaplanır.",
      ],
      knowledge:
        "Farklı büyüklükteki bütünlerin yüzdeleri önce kendi toplamlarıyla çarpılır.",
      strategy:
        "İki yüzdeyi doğrudan değil,36 ve 42 kişi sonuçlarını karşılaştır.",
      steps: [
        "A’nın seçen sayısı 80×45/100=36 kişidir.",
        "B’nin seçen sayısı 150×28/100=42 kişidir.",
        "42−36=6 olduğundan B’nin 6 kişi fazla olduğunu söyleyen adayı seç.",
      ],
      commonError:
        "Daha yüksek yüzdeyi farklı toplamda da mutlaka daha fazla kişi sanmak.",
      check: "36/80 ve 42/150 oranları verilen yüzdeleri geri veriyor mu?",
    },
    {
      passage:
        "Bir hafta sonu üç gün süren kampanyada toplanan oyuncak sayıları: Cuma 14, Cumartesi bilinmiyor, Pazar 22. Sayılar negatif olmayan tam sayıdır. Başka gün kampanya yapılmamıştır.",
      prompt: "Bu kampanya için hangisi kesindir?",
      options: [
        "Toplanan oyuncak sayısı en az 36’dır",
        "Toplam tam 36’dır",
        "Cumartesi 14 oyuncak toplanmıştır",
        "Her gün en az 14 oyuncak toplanmıştır",
        "Cumartesi pazar gününden daha çok oyuncak toplanmıştır",
      ],
      reasons: [
        "14+22=36 bilinir; bilinmeyen sayı negatif olamayacağı için toplam en az 36’dır.",
        "Cumartesi sıfırdan büyük de olabilir; tam toplam bilinmez.",
        "Cumartesi için belirli değer verilmez.",
        "Cumartesi 0 olabilir; her gün 14 alt sınırı kurulamaz.",
        "Bilinmeyen sayı 22’den küçük, eşit veya büyük olabilir.",
      ],
      knowledge:
        "Bilinmeyen negatif olmayan sayım kesin toplamı engellese de bilinen toplamdan bir alt sınır kurdurabilir.",
      strategy:
        "İki bilinen günü topla ve bilinmeyenin yalnız negatif olmama koşulunu kullan.",
      steps: [
        "Toplanan oyuncak sayıları 14 ve 22 olup toplamları 36’dır.",
        "Cumartesi sayısı 0 veya daha büyük olabilir; bu nedenle toplam 36’nın altına inmez.",
        "En az 36 ifadesini seç; bilinmeyene belirli değer veren veya her gün sınırı koyanları ele.",
      ],
      commonError: "Bilinmeyen günün değerini sıfıra sabitlemek.",
      check:
        "Cumartesi 0 ve cumartesi 9 seçildiğinde sonucun ikisinde de geçerli mi?",
    },
    {
      passage:
        "Bir resimli kayıt açıklaması: Her tam kitap simgesi 14 kitap, her yarım kitap simgesi 7 kitap anlamındadır. K okulunun satırında 3 tam ve 1 yarım simge vardır. Simgeler kitap sayısını gösterir, öğrenci sayısını göstermez.",
      prompt: "K okulunun temsil edilen kitap sayısı kaçtır?",
      options: ["49", "4", "42", "56", "21"],
      reasons: [
        "3×14+7=49 kitaptır.",
        "Bu yalnız çizilmiş simge adedidir; her simge bir kitap değildir.",
        "42 üç tam simgedir; yarım simgenin 7 kitabını eksiltir.",
        "Yarım simgeyi de tam sayarak 4×14 yapar.",
        "Bir tam ve bir yarım simgeyi sayıp iki tam simgeyi eksiltir.",
      ],
      knowledge:
        "Bir resimli gösterimde simge açıklaması bütün ve yarım simgenin gerçek değerini belirler.",
      strategy: "Üç tam ile bir yarımı ayrı hesaplayıp aynı birimde topla.",
      steps: [
        "Üç tam simge 3×14=42 kitabı gösterir.",
        "Bir yarım simge ayrıca 7 kitaptır.",
        "42+7=49 sonucunu seç; simge adedini kitap sayısıyla eşitleme.",
      ],
      commonError: "Lejantı okumadan her görseli bir gerçek kitap saymak.",
      check: "49 sayısını 3 tam ve 1 yarım simgeye geri ayırabiliyor musun?",
    },
    {
      passage:
        "Bir daire gösteriminde bütün 175 kişiyi temsil eder. T kategorisinin dilim açısı 144 derecedir; tam daire 360 derecedir. Bütün kişiler tek bir kategoriye sayılmıştır.",
      prompt: "T kategorisinde kaç kişi vardır?",
      options: ["70", "144", "40", "31", "105"],
      reasons: [
        "144/360=0,4;175×0,4=70 kişidir.",
        "Açı ölçüsünü kişi sayısı sanır.",
        "Bu payın yüzde sayısıdır; kişi sayısı değildir.",
        "144’ü 175’ten çıkarmak farklı birimleri çıkarır.",
        "Bu bütünün%60’ıdır; T’nin payı%40’tır.",
      ],
      knowledge:
        "Dilim açısı aynı bütün içindeki payı verir; kişi sayısı için bu pay toplamla çarpılır.",
      strategy: "Önce 144/360 payını, sonra 175 kişi içindeki karşılığını bul.",
      steps: [
        "Dilim 144/360=2/5=%40 pay taşır.",
        "Toplam 175 kişinin 2/5’i 70 kişidir.",
        "70 seç; açı ve yüzde değerini doğrudan kişi diye kullanma.",
      ],
      commonError:
        "Dilim derecesini veya yüzde sayısını doğrudan kişi adedi yapmak.",
      check: "70/175 oranı 144/360’a eşit mi?",
    },
    {
      passage:
        "Bir sütun çiziminin metin eşdeğeri: Düşey eksen 200’den başlamaktadır. A değeri 215 birim, B değeri 230 birimdir. Bu yüzden çizimde A’nın başlangıç çizgisi üstündeki boyu 15, B’nin boyu 30 ölçü birimidir.",
      prompt: "Hangi yorum doğrudur?",
      options: [
        "Görünen boylar iki kat olsa da B’nin gerçek değeri A’nın iki katı değildir",
        "B’nin gerçek değeri A’nın tam iki katıdır",
        "A ile B’nin gerçek değerleri eşittir",
        "B’nin gerçek değeri 30 birimdir",
        "Eksen başlangıcı gerçek oranı hiç etkilemediği için boy oranı daima değer oranıdır",
      ],
      reasons: [
        "Gerçek oran 230/215’tir; iki kat için 430 gerekirdi.",
        "230,215’in iki katı olan 430 değildir.",
        "215 ile 230 farklıdır.",
        "30 başlangıç üstündeki boydur; gerçek etiket 230’dur.",
        "Sıfırdan başlamayan eksende görünen boylar gerçek oranı vermez.",
      ],
      knowledge:
        "Kesilmiş eksende başlangıç üstündeki çizim boyları gerçek niceliklerin oranıyla aynı olmayabilir.",
      strategy: "Boy 15/30 yerine gerçek 215/230 etiketlerini karşılaştır.",
      steps: [
        "Çizim boyları 215−200=15 ve 230−200=30’dur.",
        "Gerçek iki kat karşılaştırmasında 215×2=430 gerekir; B 230’dur.",
        "Boy oranının iki kat olmasını gerçek oran saymayan adayı seç.",
      ],
      commonError:
        "Eksenin 200 başlangıcını unutup yalnız 15 ve 30 boylarını karşılaştırmak.",
      check: "B 215’in iki katı olsaydı etiketinde hangi sayı yazardı?",
    },
    {
      passage:
        "Bir oylamada destek oranı önce%24, sonra%36’dır. Soru yalnız oran değişimiyle ilgilidir; toplam kişi sayıları verilmemiştir.",
      prompt: "Değişim nasıl doğru ifade edilir?",
      options: [
        "12 yüzde puanı; başlangıç oranına göre%50 artış",
        "12 kişi; başlangıca göre%12 artış",
        "50 yüzde puanı; başlangıca göre%12 artış",
        "36 yüzde puanı; başlangıca göre%24 artış",
        "Kişi sayısı verilmediğinden yüzde puanı farkı da bulunamaz",
      ],
      reasons: [
        "36−24=12 puan;12/24=%50 göreli artıştır.",
        "Kişi farkı verilmez ve 12 puan göreli%12 değildir.",
        "Puan farkı 50 değil 12’dir; göreli artış%50’dir.",
        "36 son oran olup fark değildir.",
        "Oranlar verildiğinden puan farkı bulunur; kişi toplamı gerekmez.",
      ],
      knowledge:
        "İki yüzde arasındaki puan farkı ile başlangıç yüzdesine göre göreli artış ayrı işlemlerdir.",
      strategy: "36−24 farkını hesapla; göreli artış için 24’e böl.",
      steps: [
        "Oranların farkı 12 yüzde puanıdır.",
        "Başlangıca göre artış 12/24=0,5 yani%50’dir.",
        "İki ölçüyü doğru adlandıran adayı seç; kişi birimi ekleme.",
      ],
      commonError:
        "Yüzde puanını kişi adedi veya aynı sayıda göreli yüzdeyle eşitlemek.",
      check: "24’ü 1,5 ile çarptığında 36 elde ediyor musun?",
    },
    {
      passage:
        "Bir sergide ilk gün 48 farklı kişi, ikinci gün 54 farklı kişi ziyaret etmiştir. Her günün kendi sayımında tekrarlar ayıklanmıştır; iki gün arasında aynı kişilerin gelip gelmediği bilinmemektedir. Başka ziyaret günü yoktur.",
      prompt:
        "İki günde ziyaret eden farklı kişi sayısı için hangi aralık kesindir?",
      options: [
        "En az 54, en çok 102",
        "Tam 102",
        "En az 48, en çok 54",
        "Tam 6",
        "En az 102, en çok 150",
      ],
      reasons: [
        "Tam örtüşmede 48 ilk gün kişisi ikinci 54’ün içinde olabilir; alt sınır 54, ayrıkta üst sınır 48+54=102’dir.",
        "Günler arasında tekrar olabilir; toplam farklı kişi 102 olmak zorunda değildir.",
        "Günler tamamen ayrık olabilir ve 102 kişi eder; üst sınır 54 olamaz.",
        "6 günlük sayı farkıdır, toplam farklı kişi değildir.",
        "102 üst sınırdır; en az değeri olamaz ve 150 verilen toplamı aşar.",
      ],
      knowledge:
        "Gün içi tekillik, günler arası aynı kişi bulunmadığını göstermez; birleşim için çakışma sınırları gerekir.",
      strategy: "Tam örtüşme ve hiç örtüşmeme uç durumlarını kur.",
      steps: [
        "İlk günün 48 kişisinin hepsi ikinci günün 54 kişisi içinde olabilir; farklı kişi sayısı 54 olur.",
        "İki günün listeleri tamamen ayrı da olabilir;48+54=102 kişi olur.",
        "Bu iki uç arasını kapsayan aralığı seç; günlük sayı farkını toplam yapma.",
      ],
      commonError:
        "Her gün ayrı tekil sayım yapılmasını iki günün listelerinin de ayrık olması sanmak.",
      check:
        "Alt ve üst uç için koşullara uyan iki ziyaretçi düzeni kurabildin mi?",
    },
    {
      passage:
        "Afişin tam metni: “Çarşamba 16.00–18.00 arasında kâğıt tasarım atölyesi.16 yaşını doldurmuş ve ön kayıt yaptırmış herkes katılabilir. Etkinliğe giriş ücretsizdir. Malzeme bedeli hakkında bilgi bu afişte verilmemiştir.”",
      prompt: "Bu afişten hangi sonuç kesin çıkarılır?",
      options: [
        "16 yaşını dolduran ve ön kayıt yaptıran biri belirtilen saatlerde katılabilir",
        "16 yaşını dolduran herkes kayıt olmadan katılabilir",
        "Ücretsiz giriş malzemenin de ücretsiz olduğunu kanıtlar",
        "Etkinlik çarşamba gününün her saatinde açıktır",
        "Ön kayıt yapan 15 yaşındaki biri yaş koşulunu otomatik sağlar",
      ],
      reasons: [
        "Yaş ve kayıt iki koşul birlikte katılım hakkı olarak verilmiştir.",
        "Kayıt zorunlu koşuldur; yalnız yaş yetmez.",
        "Malzeme bedeli açıkça bilinmiyor diye belirtilmiştir.",
        "Saat aralığı 16.00–18.00 ile sınırlıdır.",
        "15 yaş 16 yaşını doldurma koşulunu sağlamaz.",
      ],
      knowledge:
        "Afişin yaş, kayıt, saat ve ücret alanları ayrı koşullardır; birinin sağlanması ötekini silmez.",
      strategy: "İki katılım koşulunu birlikte ve saat aralığında uygula.",
      steps: [
        "Katılım için 16 yaşını doldurmak ve ön kayıt yaptırmak birlikte istenir.",
        "Bu koşulları sağlayan kişi çarşamba 16.00–18.00 arasında katılabilir.",
        "İki koşulu tutan adayı seç; ücretsiz girişi malzemeye veya saate genişletme.",
      ],
      commonError:
        "Ücretsiz giriş bilgisini bütün hizmetlerin ücretsizliği saymak.",
      check: "Cevabında yaş ve kayıt koşullarının ikisi de korunuyor mu?",
    },
    {
      passage:
        "İş akışının tam metni: Başvuru önce belge kontrolüne gider. Belgeler tam ise görüşmeye, eksik ise tamamlama bölümüne yönelir. Tamamlama bittiğinde başvuru yeniden belge kontrolüne döner. “Tamamlama bitti” demek kontrolün geçildiği anlamına gelmez.",
      prompt:
        "Tamamlama bölümünden çıkan bir başvuru için hemen sonraki adım hangisidir?",
      options: [
        "Yeniden belge kontrolüne gitmek",
        "Kontrol yapılmadan kesin kabul edilmek",
        "Doğrudan görüşmeyi geçmiş sayılmak",
        "Süreçteki bütün koşulların ortadan kalkması",
        "Başvurunun zorunlu iptal edilmesi",
      ],
      reasons: [
        "Akış, tamamlama sonrasında yeniden kontrolü açıkça verir.",
        "Tamamlanma kontrol geçme garantisi değildir.",
        "Görüşme aşaması ve başarı sonucu henüz verilmez.",
        "Kontrol koşulu yürürlükte kalır.",
        "İptal kuralı bulunmaz.",
      ],
      knowledge:
        "Bir süreçte tamamlanan alt adım sonraki kontrolün yerini almaz; açık geçiş sırası izlenir.",
      strategy: "Tamamlama sonrasındaki dönüş cümlesini önce oku.",
      steps: [
        "Verilen başlangıç durumu tamamlama bölümünden çıkıştır.",
        "Kural bu durumdan yeniden belge kontrolüne dönüldüğünü söyler.",
        "Hemen sonraki adımı seç; kabul, görüşme başarısı veya iptal sonucu ekleme.",
      ],
      commonError:
        "Bir eksik giderildiğinde bütün sonraki kontrollerin de otomatik geçilmiş olduğunu varsaymak.",
      check: "Başvurunun bir sonraki adımıyla nihai kabulünü ayrı tuttun mu?",
    },
    {
      passage:
        "Yönlü yol şemasının eksiksiz metni: P’den Q’ya 3 km, Q’dan R’ye 2 km, P’den R’ye 6 km yol vardır. Oklar yalnız belirtilen yönde geçişe izin verir. Başka yol yoktur.",
      prompt: "P’den R’ye gidilebilen en kısa yolun uzunluğu kaç kilometredir?",
      options: ["5", "2", "3", "6", "11"],
      reasons: [
        "P→Q→R yolu 3+2=5 km olup doğrudan 6 km’den kısadır.",
        "2 km yalnız Q→R parçasıdır; P’den başlama koşulunu karşılamaz.",
        "3 km yalnız P→Q parçasıdır; R’ye varmaz.",
        "6 km geçerli doğrudan yoldur ama 5 km seçeneği daha kısadır.",
        "Var olan yolların hepsini toplamak tek yolculuğun uzunluğu değildir.",
      ],
      knowledge:
        "Yönlü şemada başlangıç ve varış korunarak izin verilen yollar karşılaştırılır.",
      strategy: "P→R doğrudan yolu ile P→Q→R iki parçalı yolu karşılaştır.",
      steps: [
        "Doğrudan P→R yolu 6 km’dir.",
        "Q üzerinden giden yol 3+2=5 km olur ve ok yönlerine uyar.",
        "İki geçerli yolun küçüğü 5 km’yi seç; tek parça veya bütün yolların toplamını alma.",
      ],
      commonError:
        "Şemadaki bütün çizgileri bir yolculukta gidilmiş gibi toplamak.",
      check:
        "Bulduğun yol P’den başlayıp R’de bitiyor ve her okun yönüne uyuyor mu?",
    },
    {
      passage:
        "Bir çizelge yalnız pazartesi-cuma günlerini kapsar:18,21,16,20,17 kg kumaş toplanmıştır. Metin cumartesi ve pazar da toplama yapıldığını, bu iki günün miktarlarının henüz açıklanmadığını belirtir. Miktarlar negatif değildir.",
      prompt: "Tam haftaya ilişkin hangi yargı doğrudur?",
      options: [
        "Toplam en az 92 kg’dır; kesin toplam için hafta sonu miktarları gerekir",
        "Haftanın tam toplamı 92 kg’dır",
        "Hafta sonu kesin 0 kg toplanmıştır",
        "Her hafta aynı miktar toplanacağı kesindir",
        "Tam haftanın toplamı 92 kg’dan küçük olabilir",
      ],
      reasons: [
        "Hafta içi 18+21+16+20+17=92 kg; negatif olmayan hafta sonu bunu azaltmaz ama artırabilir.",
        "Hafta sonu miktarları bilinmediğinden tam toplam 92’ye sabitlenmez.",
        "Açıklanmamış miktar sıfır demek değildir.",
        "Başka haftalar için süreklilik verisi yoktur.",
        "Negatif olmayan ek miktarlar toplamı 92’nin altına düşürmez.",
      ],
      knowledge:
        "Kaynakların zaman kapsamı farklıysa bilinen bölümün toplamı tam bütüne yalnız uygun sınırla taşınır.",
      strategy:
        "Önce beş günü topla; iki açıklanmayan günü negatif olmayan ek miktar olarak bırak.",
      steps: [
        "Hafta içi toplam 18+21+16+20+17=92 kg’dır.",
        "Hafta sonu miktarları bilinmiyor fakat negatif değil; tam hafta en az 92 kg olur.",
        "Alt sınır ve eksik iki gün bilgisini birlikte veren adayı seç.",
      ],
      commonError:
        "Beş günlük çizelge toplamını tam haftanın kesin toplamı yapmak.",
      check: "92 sonucunu “en az” mı “tam” mı diye adlandırdığını kontrol et.",
    },
    {
      passage:
        "Bir kursun eşit aralıklı dört dönemindeki kayıt sayıları 9,12,12,15’tir. “Arttı” ifadesi bu soruda önceki dönemden kesin büyük olmayı; “azalmadı” ise büyük veya eşit olmayı anlatır.",
      prompt: "Hangi yargı doğrudur?",
      options: [
        "Kayıt sayısı hiçbir geçişte azalmamış, fakat her geçişte artmamıştır",
        "Kayıt sayısı her geçişte kesin artmıştır",
        "İkinci dönemden üçüncüye kesin düşüş vardır",
        "İlk ve son dönem kayıtları eşittir",
        "Üçüncü dönemden dördüncüye değişim 0’dır",
      ],
      reasons: [
        "9→12 artış,12→12 eşitlik,12→15 artış; azalış yok ama her geçişte artış yoktur.",
        "12→12 kesin artış değildir.",
        "12→12 eşitliktir; düşüş değildir.",
        "9 ile 15 eşit değildir.",
        "12→15 değişimi+3’tür.",
      ],
      knowledge:
        "Azalmama ile kesin artma aynı koşul değildir; eşit değerler bu ayrımı görünür kılar.",
      strategy:
        "Kökte verilen artış ve azalmama tanımlarını bütün komşu çiftlere uygula.",
      steps: [
        "İlk geçiş 9→12 artış, ikinci 12→12 eşitlik, üçüncü 12→15 artıştır.",
        "Üç geçişin hiçbirinde düşüş yoktur; bir eşitlik kesin artış şartını bozar.",
        "Hem azalmamayı hem her geçişte artmama sonucunu veren adayı seç.",
      ],
      commonError:
        "Eşitliği kesin artış saymak veya azalmama ifadesini mutlaka artış sanmak.",
      check: "12=12 geçişini hangi iki sözcükten hangisi doğru anlatır?",
    },
    {
      passage:
        "Üç şubenin günlük bilet sayısı: X 18, Y 25, Z bilinmiyor. Z’nin değeri negatif olmayan tam sayıdır. Başka şube yoktur.",
      prompt: "Hangi yargı kesin olarak savunulabilir?",
      options: [
        "Bilinen iki kayıt içinde en küçük sayı 18’dir",
        "Bütün şubeler arasında en küçük sayı kesin 18’dir",
        "Z şubesinin sayısı kesin 0’dır",
        "Y bütün şubeler arasında kesin tek en büyüktür",
        "Z’nin sayısı kesin 18 ile 25 arasındadır",
      ],
      reasons: [
        "Bilinen X ve Y arasında 18<25 olduğundan bu sınırlı yargı doğrudur.",
        "Z 0 da olabilir; bütünün en küçüğü 18 olmak zorunda değildir.",
        "Bilinmeyen değer sıfıra sabitlenmez.",
        "Z 25 veya daha büyük olabilir; Y’nin tek liderliği kesin değildir.",
        "Z için bu aralık koşulu verilmemiştir.",
      ],
      knowledge:
        "Bilinen kayıtlar içindeki sıralamayla tüm kayıtların sıralaması aynı kesinlikte olmayabilir.",
      strategy:
        "Bilinen iki satırın sınırını açıkça koru ve Z için farklı olasılık düşün.",
      steps: [
        "X 18 veY 25 içinde en küçük bilinen değer 18’dir.",
        "Z 0 seçilirse bütünün en küçüğü değişir; Z 30 seçilirse en büyük de değişir.",
        "Yalnız bilinen kayıtlar sınırındaki adayı seç; bilinmeyeni aralığa zorlamadan bırak.",
      ],
      commonError:
        "Bilinenler içindeki en küçüğü açıklanmamış satır dâhil bütünün en küçüğü saymak.",
      check: "Z=0 ve Z=30 olasılıkları seçeneğini bozuyor mu?",
    },
    {
      passage:
        "İki ayrı daire dağılımı için tam veriler: M grubunun toplamı 72 kişi, T kategorisi payı%25; N grubunun toplamı 180 kişi, T kategorisi payı%20’dir. Her kişi kendi grubunda bir kez sayılmıştır.",
      prompt: "T kategorisindeki kişi sayıları nasıl karşılaştırılır?",
      options: [
        "N’de 36, M’de 18 kişi vardır; N’deki sayı M’nin iki katıdır",
        "M’deki pay daha büyük olduğu için kişi sayısı da kesin daha büyüktür",
        "M’de 25, N’de 20 kişi vardır",
        "İki grupta da aynı kişi sayısı vardır",
        "Toplamlar verildiği hâlde kişi sayıları bulunamaz",
      ],
      reasons: [
        "M 72×0,25=18; N 180×0,20=36 ve 36=2×18’dir.",
        "Farklı toplamlar yüzünden büyük pay daha büyük kişi sayısı demek değildir.",
        "Yüzde sayıları doğrudan kişi adedine çevrilmiştir.",
        "18 ve 36 eşit değildir.",
        "Toplam ve pay birlikte verildiğinden iki sayı da hesaplanır.",
      ],
      knowledge:
        "Farklı daire bütünlerinin payları kişi sayısına dönüştürülmeden karşılaştırılmaz.",
      strategy: "Her dağılımın toplamını kendi T payıyla çarp.",
      steps: [
        "M’de T sayısı 72/4=18 kişidir.",
        "N’de T sayısı 180/5=36 kişidir.",
        "36’nın 18’in iki katı olduğunu belirten adayı seç; yüzde sırasını kişi sırası yapma.",
      ],
      commonError:
        "Daha büyük dilim yüzdesini farklı bütünlerde daha çok kişi sanmak.",
      check: "18/72=%25 ve 36/180=%20 dönüşlerini doğruladın mı?",
    },
    {
      passage:
        "Bir yarışmaya iki okuldan öğrenci gelmiştir. A okulu 50 öğrencisinin%10’unu, B okulu 150 öğrencisinin%30’unu göndermiştir. Okulların öğrenci kümeleri ayrıdır.",
      prompt:
        "İki okulun toplam 200 öğrencisinin yüzde kaçı yarışmaya gelmiştir?",
      options: ["%25", "%20", "%40", "%10", "%30"],
      reasons: [
        "A 5 ve B 45 kişi; toplam 50/200=%25’tir.",
        "Bu%10 ve%30’un ağırlıksız ortalamasıdır; gruplar eşit değildir.",
        "İki yüzdeyi toplamak birleşik oran vermez.",
        "Bu yalnız A’nın oranıdır.",
        "Bu yalnız B’nin oranıdır.",
      ],
      knowledge:
        "Farklı büyüklükte grupların birleşik oranı kişi toplamlarının oranından bulunur.",
      strategy: "Önce 5 ve 45 kişiyi, sonra 200 kişideki ortak payı hesapla.",
      steps: [
        "A 50×0,10=5, B 150×0,30=45 öğrenci göndermiştir.",
        "Gönderilen toplam 50, tüm öğrenci toplam 200’dür.",
        "50/200=1/4=%25’i seç; eşit olmayan grupların yüzdelerini doğrudan ortalama.",
      ],
      commonError:
        "Farklı büyüklükteki grupların yüzdelerine eşit ağırlık vererek ortalama almak.",
      check: "Bulduğun%25, toplam 200 kişide 50 kişiye karşılık geliyor mu?",
    },
    {
      passage:
        "Bir ölçüm raporunun iki satırı: A numunesi 2,4 kg, B numunesi 1800 g. Bu soruda 1 kg=1000 g kabul edilir. Her iki ölçüm aynı nicelik olan kütleyi verir.",
      prompt: "Hangi yargı doğrudur?",
      options: [
        "A, B’den 600 g daha ağırdır",
        "B, A’dan 1797,6 g daha ağırdır",
        "A ile B’nin kütleleri eşittir",
        "A’nın kütlesi 240 g’dır",
        "Farklı birim yazıldığı için karşılaştırma yapılamaz",
      ],
      reasons: [
        "A 2400 g olur;2400−1800=600 g’dır.",
        "2,4 kg’ı gramla eşitlemeden çıkarır.",
        "2400 ile 1800 eşit değildir.",
        "2,4 kg=2400 g olup 240 g değildir.",
        "Dönüşüm kuralı verildiğinden aynı birime çevrilerek karşılaştırılır.",
      ],
      knowledge:
        "Farklı birimle yazılmış aynı nicelikler ortak birime çevrilmeden çıkarılamaz.",
      strategy: "A’yı verilen 1000 çarpanıyla grama çevir.",
      steps: [
        "2,4 kg×1000=2400 g’dır.",
        "A 2400 g ve B 1800 g olduğundan fark 600 g’dır.",
        "A’nın 600 g daha ağır olduğunu seç; ham 2,4 ile 1800 sayılarını doğrudan kıyaslama.",
      ],
      commonError:
        "Birim dönüşümü yapmadan sayıların görünüşüne göre büyüklük seçmek.",
      check: "1800 g+600 g=2400 g geri kontrolünü yaptın mı?",
    },
    {
      passage:
        "Bir merkezin aylık giriş kayıtları: Nisan 72 giriş, Mayıs 90 giriş. Mayısta yeni duyuru panosu açılmış, ayrıca merkezin açık kaldığı gün sayısı da artmıştır. Girişler farklı kişi sayısı olarak ayıklanmamıştır.",
      prompt: "Bu verilere göre hangisi kesin söylenebilir?",
      options: [
        "Mayısta kayıtlı giriş sayısı nisandan 18 fazladır",
        "Duyuru panosu artışın tek nedenidir",
        "Mayısta tam 90 farklı kişi gelmiştir",
        "Açık gün başına ortalama girişin kesin arttığı bilinmektedir",
        "Yeni pano olmasaydı hiç giriş olmazdı",
      ],
      reasons: [
        "90−72=18 giriş farkıdır.",
        "Aynı dönemde açık gün sayısı da değişmiştir; tek neden kanıtı yoktur.",
        "Tekrarlar ayıklanmadığı için 90 giriş 90 farklı kişi olmayabilir.",
        "Açık gün sayılarının kesin değerleri verilmediğinden günlük ortalama bulunmaz.",
        "Panosuz durumda sıfır giriş olacağına ilişkin karşılaştırma yoktur.",
      ],
      knowledge:
        "Bir toplam değişimi, nedenini, tekil kişi sayısını veya süreye göre ortalamasını kendiliğinden vermez.",
      strategy:
        "Ölçülen niceliği giriş olarak tut ve yalnız doğrudan çıkarılabilen farkı hesapla.",
      steps: [
        "İki kaydın ölçüsü aylık toplam giriştir; farklı kişi değildir.",
        "90−72=18 giriş artışı hesaplanabilir.",
        "18 giriş farkını seç; neden, tekil kişi ve günlük ortalama için eksik bilgileri ayrı bırak.",
      ],
      commonError:
        "Toplam giriş artışından tek neden ve günlük ortalama artışını birlikte çıkarmak.",
      check: "Hesabının birimi giriş mi, kişi veya gün başına giriş mi?",
    },
  ],
];

export const forge024TurkishTopics: Record<string, string> = {
  "paragrafta-coklu-sorular": "detail-280",
  "paragrafta-konu": "detail-281",
  "metin-tablo-gorsel-yorumlama": "detail-282",
};
export const forge024TurkishGuides: LessonGuide[] = guideSpecs024.map(
  ({ title: _title, ...g }) => g,
);
const positions024 = [
  [3, 0, 4, 1, 1, 3, 2, 4, 0, 2, 4, 2, 0, 1, 3, 2, 1, 4, 3, 0],
  [1, 4, 0, 2, 3, 3, 1, 0, 4, 2, 0, 3, 2, 4, 1, 4, 2, 1, 0, 3],
  [4, 2, 0, 3, 1, 0, 3, 3, 2, 4, 1, 4, 2, 0, 1, 2, 1, 0, 4, 3],
];
export const forge024TurkishLessons: Lesson[] = guideSpecs024.map(
  (g, pack) => ({
    id: g.id,
    subjectId: "tyt-turkce",
    title: txt(g.title),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: questionRows024[pack].map((q, i): Question => {
      const answer = positions024[pack][i];
      const rotate = <T>(values: T[]) =>
        values.map((_, n) => values[(n - answer + 5) % 5]);
      return {
        id: `${g.id}-024-${i + 1}`,
        passage: txt(q.passage),
        prompt: txt(q.prompt),
        options: rotate(q.options).map(txt),
        answer,
        hint: txt(q.strategy),
        explanation: txt(q.steps.join(" ") + " " + q.reasons[0]),
        skill: g.id,
        guidance: {
          knowledge: [q.knowledge],
          strategy: q.strategy,
          steps: q.steps,
          optionReasons: rotate(q.reasons),
          commonError: q.commonError,
          check: q.check,
        },
      };
    }),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
  }),
);
export const turkishDefaults024 = {
  caseId: "greenhouse",
  question: 0,
  candidate: 0,
  selected: 0,
  metric: 0,
  period: 0,
  claim: 0,
  guess: "",
  reason: "",
  show: false,
};
function index024(value: number, max: number): number {
  if (!Number.isInteger(value) || value < 0 || value >= max)
    throw new RangeError("Seçim geçerli aralığın dışında.");
  return value;
}
type MultiCase024 = {
  id: string;
  label: string;
  sentences: string[];
  asks: {
    text: string;
    focus: string;
    answer: string;
    references: number[];
    explanation: string;
  }[];
};
const multiCases024: readonly MultiCase024[] = [
  {
    id: "greenhouse",
    label: "Serada gölge denemesi",
    sentences: [
      "Botanik kulübü seranın bir bölümüne ayarlı gölgelik kurdu.",
      "Amaç, sıcak günlerde fidanların aldığı ışığı gerekirse azaltmaktı.",
      "İlk denemede yalnız gölgelik altındaki ışık düzeyi ölçüldü.",
      "Fidanların büyüme hızı bu çalışmada ölçülmedi.",
      "Kulüp, büyüme üzerindeki etki için ayrı bir izleme planlıyor.",
    ],
    asks: [
      {
        text: "Gölgelik hangi amaçla kuruldu?",
        focus: "Amaç",
        answer: "Sıcak günlerde fidanların aldığı ışığı gerekirse azaltmak.",
        references: [1],
        explanation:
          "İkinci cümle hedefi açıkça söyler; ilk denemenin ölçülen sonucuyla aynı sayılmaz.",
      },
      {
        text: "İlk denemede hangi nicelik ölçüldü?",
        focus: "Açık ayrıntı",
        answer: "Gölgelik altındaki ışık düzeyi.",
        references: [2],
        explanation:
          "Üçüncü cümle yalnız ışık düzeyini ölçüm olarak verir; büyüme hızı ölçülmedi.",
      },
      {
        text: "Gölgelik fidanların büyüme hızını kesin hızlandırdı mı?",
        focus: "Kanıtın sınırı",
        answer: "Bu verilerle kesin bir sonuç yok.",
        references: [3, 4],
        explanation:
          "Dördüncü cümlede büyüme ölçümü yoktur. Beşinci cümle ayrı izleme planını verir; amaç, ölçülmüş etki değildir.",
      },
    ],
  },
  {
    id: "cinema",
    label: "Gezici sinemada altyazı",
    sentences: [
      "Gezici sinema ekibi aynı kısa filmi iki ayrı gösterimde sundu.",
      "İlk gösterimde yalnız ses, ikinci gösterimde sesle birlikte altyazı vardı.",
      "Ekip, altyazıyı işitme desteği isteyen izleyicilere erişim sağlamak için ekledi.",
      "İzleyiciler iki gösterimde aynı kişiler değildi.",
      "İki grubun filmi anlama puanları ölçülmedi.",
    ],
    asks: [
      {
        text: "Altyazı hangi amaçla eklendi?",
        focus: "Amaç",
        answer: "İşitme desteği isteyen izleyicilere erişim sağlamak.",
        references: [2],
        explanation:
          "Üçüncü cümle altyazının amacını verir; filmin anlama başarısı hakkında ölçüm değildir.",
      },
      {
        text: "İki gösterimin sunuş farkı nedir?",
        focus: "Karşılaştırma",
        answer: "İkincide sese altyazı da eşlik etmiştir.",
        references: [1],
        explanation:
          "İkinci cümle iki sunuşu aynı ölçütle kıyas eder: sesin yanında altyazı bulunması.",
      },
      {
        text: "Altyazı bütün izleyicilerin anlama puanını artırdı mı?",
        focus: "Kanıtın sınırı",
        answer: "Bu verilerle kesin bir sonuç yok.",
        references: [3, 4],
        explanation:
          "Gruplar farklıdır ve anlama puanı ölçülmedi; bütün izleyicilere başarı hükmü kurulamaz.",
      },
    ],
  },
  {
    id: "map",
    label: "Sözlü yer tarifinden rota",
    sentences: [
      "Bir harita atölyesi kasaba halkından eski çeşmelere giden yolları tarif etmelerini istedi.",
      "Amaç, resmî haritada adı olmayan patikaları görünür kılmaktı.",
      "İki anlatıcı aynı patikaya farklı adlar verdi.",
      "Ekip bu adları hemen tek ad saymadı; yerinde kontrol için not aldı.",
      "Patikaların kesin uzunlukları henüz ölçülmedi.",
    ],
    asks: [
      {
        text: "Çalışmanın amacı nedir?",
        focus: "Amaç",
        answer: "Resmî haritada adı olmayan patikaları görünür kılmak.",
        references: [1],
        explanation:
          "İkinci cümle çalışmanın hedefini söyler; bu hedef kesin mesafe ölçümü değildir.",
      },
      {
        text: "Ekip ad farkını görünce ne yaptı?",
        focus: "Açık ayrıntı",
        answer: "Hemen tek ad saymak yerine yerinde kontrol için not aldı.",
        references: [2, 3],
        explanation:
          "Üçüncü cümle ad farkını, dördüncü cümle bu duruma verilen kontrol yanıtını gösterir.",
      },
      {
        text: "Bu veriden patikaların kesin uzunlukları bulunur mu?",
        focus: "Kanıtın sınırı",
        answer: "Bu verilerle kesin bir sonuç yok.",
        references: [4],
        explanation:
          "Son cümle kesin uzunluk ölçümü olmadığını belirtir; sözlü yol tarifi eksik sayıyı doldurmaz.",
      },
    ],
  },
];
function multiCase024(id: string) {
  const c = multiCases024.find((c) => c.id === id);
  if (!c) throw new RangeError("Metin bulunamadı.");
  return c;
}
export function multiContexts024() {
  return multiCases024.map((c) => ({ id: c.id, label: c.label }));
}
export function multiScene024(id = "greenhouse", question = 0, selected = 0) {
  const c = multiCase024(id),
    ask = c.asks[index024(question, c.asks.length)];
  index024(selected, c.sentences.length);
  return {
    id: c.id,
    label: c.label,
    sentences: [...c.sentences],
    questionLabels: c.asks.map((a) => a.text),
    ask: { ...ask, references: [...ask.references] },
    selected,
    valid: ask.references.includes(selected),
    covered: ask.references.length,
    result: ask.answer,
    explanation: ask.explanation,
    decision: ask.references.includes(selected)
      ? "Seçili cümle kanıt sağlar"
      : "Seçili cümle doğrudan kanıt sağlamaz",
  };
}

type TopicKind024 = "uygun" | "geniş" | "dar" | "dışarıda" | "yargı";
type TopicCase024 = {
  id: string;
  label: string;
  sentences: string[];
  candidates: {
    text: string;
    kind: TopicKind024;
    references: number[];
    explanation: string;
  }[];
};
const topicCases024: readonly TopicCase024[] = [
  {
    id: "weaving",
    label: "Dokuma deseninin aktarılması",
    sentences: [
      "Dokuma ustası, çırağa desenin sırasını küçük renk kartlarıyla anlatıyor.",
      "Çırak, karıştırdığı bölümü kartları yeniden dizerek deniyor.",
      "Usta, yalnız bitmiş deseni değil, bir rengin niçin o sıraya girdiğini de açıklıyor.",
      "Atölyede kartlar ezber sınavı için değil, desen kararlarını konuşmak için kullanılıyor.",
    ],
    candidates: [
      {
        text: "Dokuma bilgisinin kart ve gerekçeyle aktarılması",
        kind: "uygun",
        references: [0, 1, 2, 3],
        explanation:
          "Dört cümle de desenin nasıl öğrenildiği ve kararların nasıl açıklandığı çevresinde birleşir.",
      },
      {
        text: "El sanatı tarihi",
        kind: "geniş",
        references: [0, 1, 2, 3],
        explanation:
          "Genel alanla ilişkilidir ama metin bütün el sanatlarını veya tarihini anlatmaz; özel aktarım yönünü kaybeder.",
      },
      {
        text: "Çırağın karıştırdığı tek kart",
        kind: "dar",
        references: [1],
        explanation:
          "Yalnız ikinci cümlenin bir ayrıntısını karşılar; ustanın açıklaması ve kartların ortak amacı dışarıda kalır.",
      },
      {
        text: "Dokuma ürünlerinin satış fiyatı",
        kind: "dışarıda",
        references: [],
        explanation:
          "Metinde fiyat veya satış değişimi yoktur; aynı nesneyle ilgili olması bu adayı konu yapmaz.",
      },
      {
        text: "Gerekçe konuşmak öğrenmeye yardım edebilir",
        kind: "yargı",
        references: [0, 1, 2, 3],
        explanation:
          "Metne uygun bir ana yargı adayıdır; konu alanına ad vermekten çok onun hakkında bir sav kurar.",
      },
    ],
  },
  {
    id: "letters",
    label: "Yazı karakteri denemesi",
    sentences: [
      "Bir tasarım ekibi küçük ekranlarda aynı kısa metni farklı yazı tipleriyle deniyor.",
      "Katılımcılar kolay ve zor ayırdıkları harf çiftlerini işaretliyor.",
      "Ekip yalnız beğeniyi değil, harf ayırt etme güçlüğünü de seçimde kullanıyor.",
      "Deneme bir haber yazılımına ait; bütün okuma durumları için tek karakter ilan edilmiyor.",
    ],
    candidates: [
      {
        text: "Küçük ekranda yazı karakterini ayırt etme ölçütüyle seçme",
        kind: "uygun",
        references: [0, 1, 2, 3],
        explanation:
          "Deneme, harf ayırma verisi, seçim ölçütü ve haber yazılımı sınırı aynı odağı kurar.",
      },
      {
        text: "İnsanlığın bütün yazı sistemleri",
        kind: "geniş",
        references: [0, 1, 2, 3],
        explanation:
          "Bu genel alanın tümünü anlatmaz; yalnız bu alanda yazı karakteri seçimini inceler.",
      },
      {
        text: "Tek bir katılımcının karıştırdığı harf",
        kind: "dar",
        references: [1],
        explanation:
          "Bir gözlem ayrıntısını alır; ekip kararı, farklı karakterler ve kullanım sınırını kapsamaz.",
      },
      {
        text: "Telefon pilinin az tüketilmesi",
        kind: "dışarıda",
        references: [],
        explanation:
          "Pil tüketimi ölçülmez; küçük ekran ifadesi enerji sonucunu sağlamaz.",
      },
      {
        text: "Beğeni tek başına yeterli seçim ölçütü değildir",
        kind: "yargı",
        references: [0, 1, 2, 3],
        explanation:
          "Ölçüt hakkında bir düşünce kurar; konunun kendisi bu alanda karakter seçimi ve harf ayırt etmedir.",
      },
    ],
  },
  {
    id: "market",
    label: "Pazar seslerinin anlatımı",
    sentences: [
      "Bir radyo programı mahalle pazarının seslerini yerinde kayda alıyor.",
      "Anlatıcı, satıcı çağrılarıyla alışveriş sözlerini ayrı bölümlerde dinletiyor.",
      "Aralara eklenen kısa notlar seslerin hangi duruma ait olduğunu açıklıyor.",
      "Program pazar fiyatlarını kıyaslamak yerine mekânın işitsel deneyimini aktarıyor.",
    ],
    candidates: [
      {
        text: "Mahalle pazarında duyulan seslerin radyoda anlatımı",
        kind: "uygun",
        references: [0, 1, 2, 3],
        explanation:
          "Yerinde ses kaydı, bölümlere ayırma, bağlam notu ve fiyat kıyasını dışlama aynı deneyim aktarımını açıklar.",
      },
      {
        text: "Dünyadaki bütün ticaret biçimleri",
        kind: "geniş",
        references: [0, 1, 2, 3],
        explanation:
          "Pazar ticaretle ilişkilidir ama metin bütün dünya ticaretini incelemez; radyo ve ses yönü önemlidir.",
      },
      {
        text: "Bir satıcının tek çağrısı",
        kind: "dar",
        references: [1],
        explanation:
          "Yalnız bir ses örneğidir; programın bütün sunuş ve bağlamı verme işini kapsamaz.",
      },
      {
        text: "Ürün fiyatlarının mevsimsel kıyası",
        kind: "dışarıda",
        references: [],
        explanation: "Son cümle fiyat kıyasını özellikle dışarıda bırakır.",
      },
      {
        text: "Sesler de bir mekânın deneyimini aktarabilir",
        kind: "yargı",
        references: [0, 1, 2, 3],
        explanation:
          "Odağa ilişkin genel bir yargıdır; konu adı programın bu deneyimi nasıl taşıdığıdır.",
      },
    ],
  },
  {
    id: "diary",
    label: "Sahne günlüğü kullanımı",
    sentences: [
      "Bir oyuncu prova sonlarında hangi sahnede durduğunu günlüğe yazıyor.",
      "Ertesi provada eski notuyla yeni denemesini kıyas ediyor.",
      "Yönetmen bu notlarla oyuncunun bütün kişiliğine puan vermiyor.",
      "Günlük, belirli sahne kararının değişimini ele almaya yardım ediyor.",
    ],
    candidates: [
      {
        text: "Prova günlüğüyle sahne kararı değişimini izleme",
        kind: "uygun",
        references: [0, 1, 2, 3],
        explanation:
          "Not, eski-yeni kıyas, kişilik puanını dışlama ve sahne kararı konuşması aynı kullanım odağına bağlıdır.",
      },
      {
        text: "Tiyatronun bütün tarihi",
        kind: "geniş",
        references: [0, 1, 2, 3],
        explanation:
          "Genel alan tiyatrodur ama tarih anlatısı yoktur; belirli günlük kullanımını ayırt etmez.",
      },
      {
        text: "Oyuncunun bir kez durması",
        kind: "dar",
        references: [0],
        explanation:
          "Girişteki bir veriyi alır; sonraki denemeler ve karar değişimi dışarıda kalır.",
      },
      {
        text: "Oyuncunun bütün kişiliğinin ölçülmesi",
        kind: "dışarıda",
        references: [],
        explanation:
          "Üçüncü cümle bunu açıkça dışlar; günlük kişilik ölçümü diye sunulamaz.",
      },
      {
        text: "Notlar karar değişimini ele almayı destekler",
        kind: "yargı",
        references: [0, 1, 2, 3],
        explanation:
          "Günlüğün işlevi hakkında temel yargı kurar; konu günlüğün provadaki işlevidir.",
      },
    ],
  },
];
export const topicKindLabels024: Record<TopicKind024, string> = {
  uygun: "Kapsamı uygun konu",
  geniş: "Çok geniş konu",
  dar: "Çok dar konu",
  dışarıda: "Metnin dışında",
  yargı: "Konu hakkında yargı",
};
export function topicContexts024() {
  return topicCases024.map((c) => ({ id: c.id, label: c.label }));
}
export function topicScene024(id = "weaving", candidate = 0, selected = 0) {
  const c = topicCases024.find((c) => c.id === id);
  if (!c) throw new RangeError("Metin bulunamadı.");
  const x = c.candidates[index024(candidate, 5)];
  index024(selected, 4);
  return {
    id: c.id,
    label: c.label,
    sentences: [...c.sentences],
    candidates: c.candidates.map((x) => x.text),
    candidate: { ...x, references: [...x.references] },
    selected,
    valid: x.references.includes(selected),
    covered: x.references.length,
    result: topicKindLabels024[x.kind],
    decision: topicKindLabels024[x.kind],
    explanation: x.explanation,
  };
}

type VisualCase024 = {
  id: string;
  label: string;
  periods: [string, string];
  rows: {
    code: string;
    label: string;
    capacity: [number, number];
    attendance: [number, number];
  }[];
};
const visualCases024: readonly VisualCase024[] = [
  {
    id: "studio",
    label: "Kent stüdyosu oturumları",
    periods: ["İlk oturum", "İkinci oturum"],
    rows: [
      {
        code: "A",
        label: "Ses tasarımı",
        capacity: [48, 48],
        attendance: [24, 36],
      },
      {
        code: "B",
        label: "Kısa film",
        capacity: [96, 96],
        attendance: [48, 24],
      },
      { code: "C", label: "Kukla", capacity: [64, 64], attendance: [32, 48] },
    ],
  },
  {
    id: "night",
    label: "Akşam bilim oturumları",
    periods: ["Birinci akşam", "İkinci akşam"],
    rows: [
      {
        code: "A",
        label: "Gökyüzü çizimi",
        capacity: [30, 30],
        attendance: [12, 24],
      },
      {
        code: "B",
        label: "Harita okuma",
        capacity: [60, 60],
        attendance: [30, 42],
      },
      {
        code: "C",
        label: "Taş tanıma",
        capacity: [40, 40],
        attendance: [28, 16],
      },
    ],
  },
  {
    id: "print",
    label: "Baskı atölyesi günleri",
    periods: ["Birinci gün", "İkinci gün"],
    rows: [
      { code: "A", label: "Linol", capacity: [36, 72], attendance: [27, 36] },
      { code: "B", label: "Şablon", capacity: [54, 54], attendance: [27, 27] },
      { code: "C", label: "Monotip", capacity: [72, 36], attendance: [36, 27] },
    ],
  },
];
export function visualContexts024() {
  return visualCases024.map((c) => ({ id: c.id, label: c.label }));
}
export function visualScene024(
  id = "studio",
  metric = 0,
  period = 0,
  claim = 0,
) {
  const c = visualCases024.find((c) => c.id === id);
  if (!c) throw new RangeError("Kayıt kümesi bulunamadı.");
  index024(metric, 2);
  index024(period, 3);
  index024(claim, 3);
  const rows = c.rows.map((r) => {
    const capacity =
        period === 2 ? r.capacity[0] + r.capacity[1] : r.capacity[period],
      attendance =
        period === 2 ? r.attendance[0] + r.attendance[1] : r.attendance[period];
    return {
      ...r,
      capacity,
      attendance,
      ratio: attendance / capacity,
      value: metric === 0 ? attendance : (100 * attendance) / capacity,
    };
  });
  const max = Math.max(...rows.map((r) => r.value)),
    leaders = rows.filter((r) => r.value === max).map((r) => r.code),
    allEqual = rows.every((r) => r.value === rows[0].value);
  const decision =
    claim === 0
      ? leaders.length === 1
        ? "Tek lider var"
        : "Eşit liderler var"
      : claim === 1
        ? allEqual
          ? "Üç değer eşit"
          : "Üç değer eşit değil"
        : "Kesin neden verilmemiş";
  const explanation =
    claim === 0
      ? `${metric === 0 ? "Katılım kayıtları" : "Kapasiteye göre doluluklar"} kıyas edilince en büyük değeri ${leaders.join(" ve ")} taşır. Eşitlik varsa tek lider denemez.`
      : claim === 1
        ? `Üç satırın ${metric === 0 ? "katılım sayıları" : "kendi yer sayısına göre oranları"} ayrı hesaplanır. ${allEqual ? "Değerler eşittir." : "En az bir değer farklıdır; üçünün eşit olduğu denemez."}`
        : "Kayıtlar miktarı ve kapasiteyi gösterir; katılımın neden bu düzeyde olduğuna ilişkin kontrollü bir kıyas sunmaz.";
  return {
    id: c.id,
    label: c.label,
    periods: [...c.periods, "İki dönem birlikte"],
    period: period === 2 ? "İki dönem birlikte" : c.periods[period],
    metric: metric === 0 ? "Katılım kaydı" : "Doluluk (%)",
    unit: metric === 0 ? "kayıt" : "%",
    rows,
    max,
    leaders,
    allEqual,
    decision,
    result: decision,
    explanation,
    statement: [
      "Seçili ölçüde tek lider var mı?",
      "Seçili ölçüde üç değer eşit mi?",
      "Sayıların kesin nedeni biliniyor mu?",
    ][claim],
    assumptions:
      "Veriler özgün öğretim verisidir. Katılım her oturum için kayıttır; iki dönemde aynı kişi yeniden bulunabilir. Birleşik doluluk, toplam katılım / toplam yer sayısıdır; kişi kimliği veya neden ölçümü değildir.",
  };
}
