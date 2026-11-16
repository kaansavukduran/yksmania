import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const guideSpecs021: (LessonGuide & { title: string })[] = [
  {
    "id": "din-felsefesi",
    "title": "Din felsefesi: kavram, inanç ve gerekçe",
    "minutes": 100,
    "objectives": [
      "Tanrı’nın varlığı, nitelikleri, evrenle ilişkisi ve inancın gerekçesi sorularını ayır.",
      "Ontolojik, kozmolojik ve teleolojik argümanların başlangıç ve köprü öncüllerini göster.",
      "Teizm, deizm, panteizm, panenteizm, ateizm ve agnostisizmi verilen tanımlarıyla karşılaştır.",
      "Kötülük, sonluluk ve ruh-beden tartışmalarında görüş ile kanıtlanmış olguyu karıştırmadan oku."
    ],
    "sections": [
      {
        "title": "Aynı sözcük, farklı felsefi sorular",
        "paragraphs": [
          "“Tanrı var mıdır?” sorusu bir varlık iddiasını; “Tanrı ile evren aynı mıdır?” sorusu iki kavram arasındaki ilişkiyi araştırır. “Böyle bir inanç hangi gerekçeyle kabul edilir?” sorusu ise kabulün dayanağına yönelir. Üçünde de Tanrı sözcüğü geçebilir, fakat istenen cevap türleri aynı değildir. Din felsefesine başlarken önce sorunun tam olarak neyi istediğini belirlemek gerekir.",
          "Din felsefesi dinle ilgili kavram, sav ve gerekçeleri felsefi yöntemle inceler. Bir görüşü doğru anlamak için öncüllerini ve sonucunu açıklaştırır, alternatif açıklama ve itirazları araştırır. Bu inceleme kişinin inancını tahmin etmeyi veya ona bir kimlik notu vermeyi amaçlamaz. Öğrenilecek olan, farklı savların ne söylediği ve hangi dayanağa başvurduğudur."
        ]
      },
      {
        "title": "Din felsefesi ve teolojinin odakları",
        "paragraphs": [
          "Teoloji, çoğu kez belirli bir dinî geleneğin metin, inanç ve öğretilerini o gelenekle ilişki içinde anlama ve açıklama çalışmasıdır. Din felsefesi ise dinî kavram ve argümanları, belirli bir inancı baştan kabul etme zorunluluğu olmadan da tartışabilir. Aynı yaratma veya vahiy kavramı iki çalışmada farklı yöntem ve sorularla incelenebilir.",
          "Bu farkı teoloji yapan hiç kimse soru soramaz veya akıl yürütemez biçiminde genelleme. Tarihsel ve çağdaş teolojiler içinde de yöntem tartışmaları vardır; kimi düşünür hem teoloji hem felsefe alanında çalışır. Dersin temel ayrımı kişinin etiketinden çok araştırmanın hangi kabullerden başladığı ve neyi gerekçelendirmeye çalıştığıdır. Bir pasajı bu işleviyle oku."
        ]
      },
      {
        "title": "İnanç, iman ve gerekçeyi ayır",
        "paragraphs": [
          "İnanç genel anlamıyla bir şeyi doğru veya gerçek kabul etme durumuyla ilişkilidir. Dinî iman ise bir geleneğe göre güven, bağlılık ve yaşantısal yönler de taşıyabilir; yalnız bir önermeyi uzaktan doğru işaretlemekten daha kapsamlı kullanılabilir. Bu sözcüklerin anlamı ele alınan düşünür ve gelenekte açık tutulmalıdır.",
          "Bir kişinin bir inancı benimsemesi ile o inanç için sunduğu gerekçe aynı şey değildir. Kabulün nasıl oluştuğu, hangi deneyim veya akıl yürütmeye dayandığı ve bu dayanağın yeterliliği ayrı sorulardır. İnançtan söz edilen her paragrafı Tanrı’nın varlığına ilişkin tek tür kanıt diye sınıflama. Önce kabul edilen savı ve onu desteklemek için ne verildiğini yaz."
        ]
      },
      {
        "title": "Argümanın öncülünü ve sonucunu görünür yap",
        "paragraphs": [
          "Bir argüman yalnız güçlü bir cümle veya düşünür adı değildir. Öncüller belirli bir sonuca dayanak olur; aradaki geçişin hangi varsayıma bağlı olduğu incelenir. Evrenin bir başlangıcı olduğunu ileri süren bir pasaj, sonradan olanın bir neden gerektirdiği ek öncülle neden sorusuna geçebilir. Bu ek ilke söylenmeden sonucun nasıl çıkarıldığı tam görünmez.",
          "Argümanı çözümlemek, öncüllerin tartışmasız doğru olduğunu ilan etmek değildir. Önce görüşün yapısını doğru kurar, sonra her öncülün ne kadar destekli olduğunu ve sonucun kapsamını araştırırsın. Bir ilk neden bulunduğu varsayılsa bile bu nedenin tek, kişisel veya mutlak iyi olduğuna geçmek ayrı dayanaklar isteyebilir. Yapıyı tanımak ile bütün sonucu kanıtlamak farklı düzeylerdir."
        ]
      },
      {
        "title": "Ontolojik yaklaşım kavramdan hareket eder",
        "paragraphs": [
          "Ontolojik Tanrı argümanlarının bilinen örneklerinden biri Anselmus ile ilişkilidir. Başlangıç noktası gözlenen bir olay dizisi değil, kendisinden daha yetkini düşünülemeyen varlık kavramıdır. Argüman bu kavramın nasıl anlaşılacağı ve yalnız zihinde bulunma ile gerçek varoluşun ilişkisi üzerinden bir sonuca ulaşmayı amaçlar.",
          "Bu başlangıcı tanımak için pasajın neyi veri kabul ettiğini göster. Düzenli bir organı veya evrenin başlangıcını gözlem olarak kullanıyorsa yalnız Tanrı sözcüğünden dolayı ontolojik dememelisin. Ayrıca bir kavramın tanımından varoluşa geçilip geçilemeyeceği felsefi itirazların konusudur. Anselmus’un girişimini doğru aktarmak, tartışmanın bütün taraflarının bu geçişi kabul ettiği anlamına gelmez."
        ]
      },
      {
        "title": "Kozmolojik yaklaşım var olan dünyadan başlar",
        "paragraphs": [
          "Kozmolojik argümanlar evrenin varlığı, değişim, nedensellik veya bağımlı varlıklar gibi olgulardan hareket eden farklı biçimlere sahiptir. Bir pasaj sonradan olanın nedenini, başka bir pasaj varlığını kendinden almayanın zorunlu bir temelle ilişkisini sorabilir. Ortak yön, yalnız bir kavram tanımında kalmayıp var olan dünyaya ilişkin bir başlangıç kullanmalarıdır.",
          "Bütün kozmolojik argümanları aynı sonsuz neden zinciri cümlesine indirgeme. Başlangıç, bağımlılık ve hareket birbirinden farklı dayanaklardır; sonsuz geriye gidişe ilişkin savlar da ayrıca açıklanmalıdır. Sonucun ilk neden, zorunlu varlık veya hareketin ilkesi diye nasıl kurulduğunu oku. Sonra bunun hangi ek öncülle belirli bir Tanrı anlayışına bağlandığını araştır."
        ]
      },
      {
        "title": "Düzen ve amaç argümanını ayırt et",
        "paragraphs": [
          "Teleolojik yaklaşım, evrendeki düzen, uyum veya amaçlılık gibi özellikleri açıklama gereğinden hareket eder. Bir yapının parçalarının belirli bir işleve katkısı, bir tasarım düşüncesine dayanak olarak kullanılabilir. Böyle bir pasajda ana soru yalnız ilk olayın ne olduğu değil, görülen düzenin nasıl açıklanacağıdır.",
          "Argümanın kuvvetini araştırırken düzen için ileri sürülen açıklamanın hangi alternatiflerle karşılaştırıldığını ve amaç sözcüğünün ne anlama geldiğini sor. Gözlenen bir işlevden bütün evrenin tek bir bilinçli amaçla kurulduğuna geçiş ek varsayımlar içerir. Bu itirazı anlamak görüşün ne dediğini silmez; başlangıç, köprü ve sonuç arasındaki ilişkileri görünür kılar."
        ]
      },
      {
        "title": "Tanrı’nın niteliği ve evrenle ilişkisi ayrı eksenlerdir",
        "paragraphs": [
          "Bir görüş Tanrı’nın tekliğini tartışabilir; başka biri evrene müdahalesini veya evrenle özdeşliğini konu edinebilir. Bunlar birbirine bağlı olsa da aynı sınıflama sorusu değildir. Tek Tanrı kabulü, tek başına o görüşün müdahale, vahiy veya doğa anlayışının bütün ayrıntılarını belirlemez.",
          "Sınav pasajında hangi eksenin açıklandığını yaz: varlık kabulü, Tanrı sayısı, bilgi imkânı veya evrenle ilişki. Aynı görüş bu eksenlerin birden fazlasında tanımlanabilir. Bu yüzden bütün terimleri her koşulda birbirini dışlayan tek bir seçenek listesi gibi düşünme; sorunun sunduğu ayırt edici tanımı kullan."
        ]
      },
      {
        "title": "Klasik teizm ve deizmi bağlamıyla karşılaştır",
        "paragraphs": [
          "Klasik teizmde Tanrı evrenin yaratıcısı ve onun varlığını sürdürmesinin temeli olarak düşünülür; bilgi, güç ve iyilik gibi nitelikler Tanrı anlayışında önem taşır. Dinî geleneklerin birçok yorumunda vahiy ve Tanrı’nın evrenle etkin ilişkisi de kabul edilir. Bütün teist düşünürlerin bu ilişkiyi aynı ayrıntıyla açıkladığı söylenemez.",
          "Deizm dersin temel çerçevesinde yaratıcıyı kabul ederken vahye dayalı dinî otoriteye ve olağanüstü müdahale düşüncesine mesafeli, akıl ve doğa düzenine dayanan yaklaşımlarla tanıtılır. Tarihte farklı biçimleri vardır. Yaratıcı kabulünü tek başına deizme özgü sayma; ayrımı, metnin müdahale ve vahiy konusundaki ek bilgisinden çıkar."
        ]
      },
      {
        "title": "Birlik, çokluk ve düalizm adlarını karıştırma",
        "paragraphs": [
          "Monoteizm tek Tanrı, politeizm birden fazla tanrı kabulüyle ilişkilidir. Bunlar tanrı sayısı bakımından yapılan nitelemelerdir. Bir düşüncede Tanrı ile insanın iki ayrı sözcükle anılması onu politeist yapmaz; sayılan varlıkların hangi statüde kabul edildiği önemlidir.",
          "Düalizm ise farklı alanlarda iki temel ilke veya varlık kabulü için kullanılabilir. Dinler tarihinde iki karşıt ilke bağlamı bulunabilir; zihin-madde tartışmasındaki ontolojik düalizm aynı şey değildir. Her kullanımın mutlaka iki eşit güçte tanrı anlamına geldiğini varsayma. Önce hangi iki temelin ne bakımdan ayrıldığı metinde açıkça gösterilmelidir."
        ]
      },
      {
        "title": "Panteizm ve panenteizmde ilişkiyi çiz",
        "paragraphs": [
          "Panteizm, Tanrı ile doğa veya bütün varlık alanı arasında özdeşlik kuran yaklaşımlarla ilişkilidir. Burada Tanrı, evrenin dışında duran ayrı bir nesne gibi düşünülmez. Spinoza’nın Tanrı veya doğa ifadesi bu tartışmada sık anılır; onun töz anlayışının kendine özgü ayrıntıları da vardır.",
          "Panenteizmde evrenin Tanrı’da içerildiği, fakat Tanrı’nın evrene indirgenemeyeceği düşüncesi öne çıkar. İçkinlik, varlıkla ilişkide oluşu; aşkınlık, onunla tükenmeyen yönü açıklar. Bu kavramları fiziksel bir kutunun içine eşya koymakla özdeşleştirme. İlişki çizimi kavramsal bağı anlatır; uzayda Tanrı’nın yerini ölçen bir harita değildir."
        ]
      },
      {
        "title": "Ateizm ve agnostisizmin sorduğu şeyi ayır",
        "paragraphs": [
          "Ateizm okul pasajlarında çoğunlukla Tanrı’nın var olmadığını savunan görüş olarak tanıtılır. Daha geniş tartışmalarda tanrı inancına sahip olmama anlamı da kullanılır. Bir soruda hangisinin kastedildiği tanım ve sav üzerinden belirlenmelidir; kişinin yalnız bir soruya kuşku duyması onun bütün inançlarını kendiliğinden göstermez.",
          "Agnostisizm bilgi ve kesin yargı imkânına yönelir: Tanrı’nın varlığı veya yokluğunun bilinip bilinemeyeceğini tartışır. İnanç ile bilgi iddiası ayrı eksenler olduğundan tarihsel kullanımlar her zaman tek bir dışlayıcı tabloya sığmaz. Öğrenmede amaç insanlara etiket yapıştırmak değil, pasajdaki kabul veya bilgi sınırı savını doğru okumaktır."
        ]
      },
      {
        "title": "Kötülük problemi hangi ilişkiyi sorar?",
        "paragraphs": [
          "Kötülük problemi, dünyadaki acı ve kötülük ile Tanrı’ya yüklenen mutlak iyilik, bilgi ve güç gibi niteliklerin nasıl birlikte anlaşılacağını sorar. İnsan eyleminden doğan zarar ahlaki kötülük; deprem veya hastalık gibi insan iradesine doğrudan bağlanmayan acılar doğal kötülük başlığında tartışılabilir. Bu sınıflama olayın bilimsel nedenini tek başına açıklamaz.",
          "Bir pasaj kötülüğü Tanrı anlayışına itiraz için kullanabilir; başka biri bu ikisinin bağdaşabileceğini savunabilir. Önce hangi nitelikler ve hangi kötülük türü verildiğini çıkar. Her acı örneği tek başına bütün din felsefesi sorularını çözmez. Tartışılan, belirli kabullerin birlikte savunulabilirliği veya bu kabullere karşı kanıtın gücüdür."
        ]
      },
      {
        "title": "Kötülük tartışmasındaki cevapları koşullarıyla oku",
        "paragraphs": [
          "Özgür irade savunması, bazı ahlaki kötülüklerin özgür seçim olanağıyla ilişkisini açıklamaya çalışır. Augustinus’un kötülüğü bağımsız bir iyi karşıtı töz değil, iyiliğin eksilmesi ve iradenin yönelişiyle ilişkilendirmesi başka bir önemli yaklaşımdır. Bu cevaplar aynı soruya aynı kelimelerle verilmiş tek yanıt değildir.",
          "Bir cevabın hangi itirazı karşıladığını araştır. İnsan seçimine dayanan açıklama, doğal acıların bütün çeşitlerini ayrıca ele almak zorunda kalabilir. Mantıksal bağdaşmazlık iddiasını yanıtlamak ile dünyadaki acının miktarını olasılıksal kanıt olarak tartışmak da farklıdır. Görüşü anlamak için onu güçlü biçimde kur; sonra kapsamını ve açık kalan sorusunu belirt."
        ]
      },
      {
        "title": "Evrenin başlangıcı, sonu ve bağımlılığı",
        "paragraphs": [
          "Evrenin bir başlangıcı olduğu, varlığının başka bir temele bağlı olduğu ve gelecekte sona ereceği üç ayrı iddiadır. Birinin kabulü diğer ikisini tanım gereği kanıtlamaz. El Kindî’nin hudûs yaklaşımında sonradan var olma düşüncesi önemlidir; Thomas ile ilişkilendirilen nedensellik ve bağımlılık tartışmaları da kendi öncülleriyle incelenir.",
          "Fizikten alınan bir yasa bütün metafizik sonuçları tek başına kesinleştiren bir cümle gibi kullanılmamalıdır. Entropi belirli sistem ve koşullarla tanımlanır; ısı aktarımı ve evrenin geleceğine ilişkin bilimsel modeller ayrıca varsayımlar taşır. Bir fizik terimini söylemek, evrenin her anlamda sonluluğunu veya belirli bir dinî sonucu otomatik ispatlamaz. Bilimsel veri ile ona eklenen felsefi yorumun sınırını koru."
        ]
      },
      {
        "title": "Ruh, beden ve ölüm sonrası yaşam",
        "paragraphs": [
          "Ölüm sonrası yaşam sorusu, insanın ne olduğu ve ruh-beden ilişkisinin nasıl kurulduğuyla bağlantılıdır. Platon’da ruhun bedenden önce ve sonra varlığına ilişkin görüşler önemli yer tutar. Aristoteles’te ruh canlının formu olarak düşünülür; özellikle aklın statüsü ve yorumları, onu basit bir bedenden ayrı hayalet nesneye indirgememeyi gerektirir.",
          "Farklı düşünürler bedenin ölümüyle neyin sürüp sürmeyeceğine farklı cevaplar verir. Kuşkucu bir yaklaşım kesin hükmün sınırlarını tartışabilir; materyalist açıklamalar da kendi insan anlayışlarıyla ilişki kurar. Burada her görüşün dayanağını ve kullandığı ruh kavramını aç. Düşünürün bir alandaki iki kelimelik etiketi, ölüm sonrası yaşama dair bütün görüşünü kendiliğinden vermez."
        ]
      },
      {
        "title": "Ben kimim sorusuna farklı alanlardan bak",
        "paragraphs": [
          "Bilim insanın bedensel, psikolojik veya toplumsal özelliklerini araştırırken gözlem, ölçüm ve açıklama modelleri kullanabilir. Dinî bir yaklaşım insanın anlamı ve amacını inanç geleneğiyle ilişkilendirebilir. Felsefe ise benlik, kişisel kimlik, değer ve varoluş gibi kavramları gerekçeleriyle sorgular. Aynı insan birden fazla soru türünün konusu olabilir.",
          "Bu yaklaşımları tek bir sorunun her anlamda aynı cevabıymış gibi yarıştırma. Bir biyolojik özellik, yaşama hangi değeri vereceğini tek başına belirlemez; bir değer savı da tıbbi ölçümün yerini almaz. Hangi soru, hangi yöntem ve hangi iddia düzeyi kullanılıyor, bunu belirlemek alanların katkısını ve sınırını daha açık görmeyi sağlar."
        ]
      },
      {
        "title": "Bir din felsefesi pasajını adım adım çöz",
        "paragraphs": [
          "Önce metnin sorusunu belirle: varlık, nitelik, ilişki veya kabulün gerekçesi mi? Sonra başlangıç öncülünü ve sonuca geçişte kullanılan ek ilkeyi ayrı yaz. Düzen, nedensellik ve kavramsal tanım farklı başlangıçlardır; ortak Tanrı sözcüğü bunları aynı argüman türü yapmaz.",
          "Son adımda yalnız istenen kadar sonuç kur. Bir görüşü ontolojik diye adlandırmak onun sonucunun tartışmasız doğru olduğunu söylemek değildir. Aynı şekilde bir öncüle itiraz, bütün olası inanç veya düşüncelerin çürütüldüğünü göstermez. Metnin dayanağını doğru aktarmak ve kapsamını korumak, gerekçeli felsefi okumaya temel olur."
        ]
      }
    ],
    "examples": [
      {
        "title": "Argüman nereden başlıyor?",
        "prompt": "Bir düşünür, doğadaki parçaların belirli işlevleri birlikte yerine getirdiğini söylüyor. Bu düzenin amaçlı bir kaynağa işaret ettiğini savunuyor. Başlangıç noktası ve argüman türü nedir?",
        "strategy": "Sonuçtaki Tanrı sözcüğünden önce kullanılan dayanağı bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Verilen ilk dayanak doğada gözlenen düzen ve parçaların işlev uyumudur; yalnız bir kavramın tanımı değildir."
          },
          {
            "label": "2. adım",
            "explanation": "Düşünür düzen ile amaçlı kaynak arasında bir köprü kurmaktadır; bu köprünün ayrıca tartışılabileceğini fark et."
          },
          {
            "label": "3. adım",
            "explanation": "Düzen ve amaçtan hareket eden teleolojik yaklaşımı seç; argümanı tanımakla sonucunu tartışmasız kabul etmeyi ayır."
          }
        ],
        "answer": "Başlangıç doğadaki düzen; tür teleolojik argümandır.",
        "check": "Kavramdan başlayan ontolojik ve bağımlılıktan başlayan kozmolojik açıklamalarla karşılaştır.",
        "pitfall": "Tanrı’dan söz edilen her metni aynı argüman türü sayma."
      },
      {
        "title": "Neden sonucunun kapsamı",
        "prompt": "Kurgu bir argümanda “Sonradan olanın nedeni vardır; evren sonradan olmuştur; evrenin nedeni vardır.” deniyor. Bu öncüller tek başına nedenin mutlak iyi olduğunu da gösterir mi?",
        "strategy": "Öncüllerin taşıdığı niteliklerle sonucun eklediği niteliği karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk öncül sonradan olma ile neden gereksinimi arasında ilişki kuruyor; iyilik hakkında bir şey söylemiyor."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci öncül evreni bu koşula yerleştiriyor; verilen sonucun kapsamı evren için neden bulunmasıdır."
          },
          {
            "label": "3. adım",
            "explanation": "Mutlak iyilik yeni bir niteliktir; onu çıkarmak için ayrıca bir dayanak gerekir. Mevcut argümanın öncüllerini eleştirmek başka bir iştir."
          }
        ],
        "answer": "Hayır; mutlak iyilik için ek gerekçe gerekir.",
        "check": "Bir neden bulunması ile o nedenin bütün nitelikleri aynı sonuç değildir.",
        "pitfall": "Eksik niteliği kendi inancından veya karşıt inancından metne ekleme."
      },
      {
        "title": "İki farklı eksen",
        "prompt": "Bir kişi “Tanrı’nın varlığını bildiğimi söylemiyorum; bu konuda kesin bilgiye ulaşamayacağımızı düşünüyorum.” diyor. Bu cümle öncelikle neyi belirler?",
        "strategy": "İnancın nesnesi ile bilgi iddiasının düzeyini ayrı oku.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Kişi kesin bilgiye ulaşılıp ulaşılamayacağı konusunda bir sınır savunuyor."
          },
          {
            "label": "2. adım",
            "explanation": "Cümle tek başına kişinin günlük dinî uygulamalarının veya bütün inançlarının listesini vermiyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bilginin imkânına ilişkin agnostik tutumu belirle; bütün diğer eksenleri otomatik doldurma."
          }
        ],
        "answer": "Öncelikle agnostik bilgi tutumunu belirler.",
        "check": "Kesin bilgi yokluğu iddiası ile varlığın kesin reddi aynı cümle değildir.",
        "pitfall": "Agnostisizm ile ateizmi her tanımda birbirini dışlayan tek eksen gibi kurma."
      },
      {
        "title": "Kötülük sorusunu sınırla",
        "prompt": "Bir tartışmada insanın bilerek zarar vermesi ele alınıyor. Cevap olarak özgür seçimin yanlış kullanılabileceği söyleniyor. Bu cevap hangi soruna yöneliktir?",
        "strategy": "Cevabın doğrudan açıkladığı olayı belirle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Verilen olay insanın seçiminden doğan ahlaki kötülük örneğidir; deprem gibi doğal olay anlatılmıyor."
          },
          {
            "label": "2. adım",
            "explanation": "Özgür irade cevabı, seçimin imkânı ile onun yanlış kullanımı arasında ilişki kuruyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu cevabın bütün doğal acı türlerini tek başına açıkladığını ileri sürmeden hedeflediği ahlaki kötülük problemini belirt."
          }
        ],
        "answer": "İnsan seçimiyle ilişkili ahlaki kötülük sorununa yöneliktir.",
        "check": "Soruda doğal ve ahlaki kötülük ayrımını olayın kaynağıyla kontrol et.",
        "pitfall": "Bir probleme verilen cevabı bütün problemleri kesin kapatan sonuç diye büyütme."
      }
    ],
    "recall": [
      {
        "prompt": "Üç Tanrı argümanını başlangıçlarıyla ayır.",
        "answer": "Ontolojik: kavram; kozmolojik: varlık, neden veya bağımlılık; teleolojik: düzen ve amaç."
      },
      {
        "prompt": "Agnostik tutum öncelikle hangi ekseni belirtir?",
        "answer": "Kesin bilgiye ulaşılıp ulaşılamayacağı eksenini; bütün inanç ve uygulamaları tek başına belirlemez."
      },
      {
        "prompt": "Panteizm ile panenteizm nasıl ayrılır?",
        "answer": "İlki Tanrı-evren özdeşliğini; ikincisi evrenin Tanrı’da yer alıp onu tüketmemesini vurgular."
      },
      {
        "prompt": "Özgür irade cevabının ilk hedefi nedir?",
        "answer": "İnsan seçimiyle ilişkili ahlaki kötülüğün açıklanmasıdır; bütün doğal acı sorularını otomatik kapatmaz."
      }
    ],
    "source": "Aurelia TYT Felsefe 007–012 kopya kâğıtları; MEBİ TYT-AYT Felsefe ilgili konu özetleri; OGM siyaset-sanat-din, Orta Çağ, Sokrates-Sofistler/Platon-Aristoteles ve felsefi metin analizi kaynaklarıyla karşılaştırılarak yazılmış özgün anlatım. Kavramlar, görüşlerin dayanakları ve sınırları birlikte açıklanır; uygulama soruları resmî sınav sorusu değildir."
  },
  {
    "id": "siyaset-felsefesi",
    "title": "Siyaset felsefesi: güç, hak ve ortak düzen",
    "minutes": 110,
    "objectives": [
      "İktidar, egemenlik, yasallık ve meşruiyeti aynı olayda ayrı sorularla incele.",
      "Birey-toplum-devlet ilişkisini hak, özgürlük ve adalet kavramlarıyla gerekçelendir.",
      "Doğal toplumsallık, sözleşme ve farklı ideal düzen yaklaşımlarının dayanaklarını karşılaştır.",
      "Ütopya, otorite ve güncel ortak yaşam sorunlarını koşulları ve kapsamıyla değerlendir."
    ],
    "sections": [
      {
        "title": "Siyaseti üç farklı soruyla incele",
        "paragraphs": [
          "Siyaset ortak yaşamı, yönetimi ve toplumdaki karar yetkilerini ilgilendirir. Bir kurumun kararını kimlerin uyguladığını gözlemek bir olgu araştırmasıdır; hangi yetkinin hangi gerekçeyle haklı sayılacağını sormak felsefi incelemeye açılır. Aynı olayda hem nasıl işlediği hem nasıl işlemesi gerektiği sorulabilir.",
          "Siyaset bilimi siyasal olguları farklı bilimsel yöntemlerle araştırır; siyaset felsefesi siyasal kavramları, ilkeleri ve gerekçeleri tartışır. İki alan birbirinin bulgularından yararlanabilir. Bir pasaj yalnız insanların kaçının oy kullandığını veriyorsa bunu otomatik adalet ölçütü sayma; hangi veri ile hangi değer sorusunun ilişkilendirildiğini açık tut."
        ]
      },
      {
        "title": "Birey, toplum ve devlet aynı şey değildir",
        "paragraphs": [
          "Birey belirli ilişkiler içinde yaşayan kişidir; toplum insanların süreklilik taşıyan ortak ilişkileri ve kurumlarıyla oluşur. Devlet ise belirli bir siyasal örgütlenme ve kamu yetkileri bütünüdür. Bir topluluktaki bütün yardımlaşmalar devlet işi değildir; devlet de yalnız o an yönetimde bulunan tek kişiden ibaret sayılmaz.",
          "Bir örneği çözerken kararı kimin verdiğini, kimleri etkilediğini ve hangi kurumun yetkili olduğunu ayır. Bireyin hakları, toplumsal gereksinimler ve kamusal kararlar arasında ilişki bulunur. İlişki kurmak üçünü özdeşleştirmek değildir; bir grubun isteğiyle bütün toplumun ortak yararı aynı şey olmak zorunda değildir."
        ]
      },
      {
        "title": "İktidar, yönetim ve egemenliği ayır",
        "paragraphs": [
          "İktidar karar alabilme ve bunları uygulayabilme gücüyle ilişkilidir. Yönetim bu gücün hangi kurum ve işlemlerle kullanıldığını; egemenlik ise siyasal düzende en yüksek yetkinin kaynağı ve sınırlarını konu edinebilir. Bir yasağın fiilen uygulanması güce ilişkin bilgi verir, fakat bu yasağın haklılığı sorusunu kendiliğinden cevaplamaz.",
          "Egemenlik sınırsız ve hiçbir hakla bağlı olmama anlamına gelmek zorunda değildir. Farklı siyaset anlayışları en yüksek yetkiyi anayasa, hukuk, insan hakları ve karşılıklı denetimle birlikte tartışır. Soruda kaynağın kimde olduğu, kullanımın nasıl düzenlendiği veya sınırın ne olduğu ayrımını yap; aynı güç sözcüğü bütün sorulara tek cevap olmaz."
        ]
      },
      {
        "title": "Hukuk, yasa ve bürokrasi nasıl ilişkilidir?",
        "paragraphs": [
          "Hukuk toplumsal ilişkileri düzenleyen kurallar, ilkeler ve kurumlarla ilişkilidir; yasa belirli usullerle konmuş yazılı düzenlemelerden biridir. Bürokrasi ise kamusal işlerin görev, yetki ve usullerle yürütüldüğü örgütlenmeyi anlatır. Bir kararın bir memur tarafından uygulanması, o memurun bütün siyasal yetkinin sahibi olduğunu göstermez.",
          "Kurala uygun işlem ile kuralın kendisinin haklılığını araştırmak farklı sorulardır. Ayrıca uygulamanın açık, öngörülebilir ve denetlenebilir olması hukuki güvenlik açısından önem taşır. Yalnız yazılı bir kural bulunmasını, her kişinin o kuralı aynı koşulda kullanabildiğinin veya kuralın adil olduğunun otomatik kanıtı sayma."
        ]
      },
      {
        "title": "Sivil toplum kamusal tartışmaya katılabilir",
        "paragraphs": [
          "Dernek, gönüllü topluluk veya meslek örgütü gibi sivil oluşumlar ortak bir sorun hakkında görüş açıklayabilir, hak talep edebilir ve kamusal kararı izleyebilir. Bu katılım devlet kurumuyla bütünüyle aynı görevde olmak değildir. Bir arada hareket eden insanların hangi amaç ve yöntemle örgütlendiğini görmek gerekir.",
          "Sivil toplum sözü de her devlet dışı davranışın tanım gereği adil olduğunu göstermez. Bir örgütün iç yapısı, başkalarının haklarına etkisi ve sunduğu gerekçe ayrıca değerlendirilebilir. Kavramı anlamak, belirli bir örgüte otomatik iyi-kötü puanı vermek yerine birey, kurum ve ortak yaşam arasındaki ilişkileri görünür kılar."
        ]
      },
      {
        "title": "Hak, tanınmış yetki ve temel talep",
        "paragraphs": [
          "Hak, kişinin bir şeyi yapabilmesi, bir şeyden korunması veya başkasından belirli bir yükümlülüğü yerine getirmesini istemesiyle ilişkili olabilir. Yürürlükteki hukukla tanınmış haklar ile insan olmaktan doğduğu savunulan temel hakların gerekçesi aynı soru değildir. Bir hakkın henüz yasada yazılmaması onun ahlaki savunusunun hiç yapılamayacağını göstermez.",
          "Kişisel haklar bireyi koruma; sosyal ve ekonomik haklar eğitim, sağlık ve çalışma gibi gereksinimleri; siyasal haklar yönetime katılımı konu edinebilir. Bu gruplar bütün kullanımda bütünüyle kopuk değildir. Bir örnekte kimden ne talep edildiğini, kimin hangi yükümlülüğü taşıdığını ve hangi özgürlüğün korunduğunu açık yaz."
        ]
      },
      {
        "title": "Meşruiyet, yasallık ve kabulü farklı oku",
        "paragraphs": [
          "Yasallık bir işlemin yürürlükteki hukuki kurallara uygunluğunu sorar. Meşruiyetin normatif anlamı ise yönetme yetkisinin hangi gerekçeyle haklı sayılacağını tartışır. Sosyolojik bir inceleme insanların o yetkiyi fiilen kabul edip etmediğine de bakabilir. Bu üç soru ilişkilidir, fakat tek bir evet cevabıyla hepsi çözülmüş olmaz.",
          "Bir yönetim güçlü olup hakkı tartışmalı olabilir; yürürlükteki bir kural adalet bakımından eleştirilebilir. Çok kişinin kabul etmesi de bütün normatif itirazları otomatik ortadan kaldırmaz. Pasaj hangi meşruiyet ölçütünü savunuyorsa önce onu doğru aktar; kişinin gerçekten kabulüyle filozofun haklılık gerekçesini birbirine karıştırma."
        ]
      },
      {
        "title": "Doğal toplumsallık ve ortak ihtiyaçlar",
        "paragraphs": [
          "Platon ve Aristoteles gibi düşünürlerde insanların gereksinimleri, iş bölümü ve iyi yaşamı ortak düzende araması siyasal topluluğun açıklanmasında önemlidir. Aristoteles insanı siyasal toplulukla ilişkili bir varlık olarak ele alır. Burada devlet, yalnız dışarıdan sonradan eklenen bir araç değil, insanın ortak yaşamıyla bağlantılı görülür.",
          "Bu açıklama her var olan devletin her kararının doğal olduğu için adil sayılmasını gerektirmez. Bir topluluğun nasıl ortaya çıktığı ile nasıl yönetilmesi gerektiği ayrı incelemelerdir. İhtiyaç vurgusunu okuyup kişinin bütün haklarını sınırsız biçimde kuruma bıraktığı sonucunu kendin ekleme; düşünürün kurduğu gerekçe ve sınırı koru."
        ]
      },
      {
        "title": "Dinî temellendirmeyi tarihsel bağlamıyla anla",
        "paragraphs": [
          "Orta Çağ siyaset düşüncesinin bazı biçimlerinde siyasal yetki dinî düzen ve Tanrı anlayışıyla gerekçelendirilir. Augustinus ile ilişkilendirilen tartışmalarda dünyevi düzen, insanın kusurları ve daha yüksek iyi anlayışı arasında ilişkiler bulunur. Bu çerçevenin dayanağı modern bir oy sayımı veya yalnız teknik yönetim verisi değildir.",
          "Dinî gerekçeye başvuran bütün düşünürleri aynı devlet modeliyle özdeşleştirmek doğru olmaz. Yöneticinin sorumluluğu, adalet ve dünyevi yetkinin sınırları hakkında farklı açıklamalar vardır. Bir pasajın dayanağını dinî diye tanımak, o savı herkes için kanıtlanmış haklılık olarak kabul etmek veya bütün tarihsel ayrıntıları tek cümlede tüketmek değildir."
        ]
      },
      {
        "title": "Toplum sözleşmesi bir gerekçe modelidir",
        "paragraphs": [
          "Toplum sözleşmesi yaklaşımları, siyasal düzenin bireyler açısından hangi koşullarda kabul edilebilir olduğunu araştırır. Doğa durumu veya sözleşme tasarımı, mutlaka bütün insanların belirli bir tarihte gerçek bir kâğıdı imzaladığı iddiası değildir. Bir düşünce deneyiyle yetkinin, güvenliğin ve hakların dayanağı açıklanabilir.",
          "Hobbes, Locke ve Rousseau bu başlıkta anılır; ancak aynı doğa durumunu, aynı yetki devrini veya aynı sınırı savunmazlar. Bir metinde sözleşme görünce bütün bireysel haklar istisnasız terk edilir sonucuna gitme. Sözleşmeye niçin ihtiyaç duyulduğunu, hangi yetkinin kime verildiğini ve hangi amacın korunduğunu ayrı ayrı oku."
        ]
      },
      {
        "title": "Hobbes: güvenlik ve ortak güç sorusu",
        "paragraphs": [
          "Hobbes’un doğa durumu tasarımında ortak bir güvencenin yokluğu çatışma ve güvensizlik sorununu öne çıkarır. Ortak siyasal güç, bu tehlikeden çıkma amacıyla açıklanır. Yetkinin güçlü bir elde toplanması ve sözleşmenin bağlayıcılığı onun düşüncesinde önemli yer tutar.",
          "Bu öğretimi insanların gerçekten bir zamanlar bütünüyle toplum dışı tek tek yaşadığının tarihsel raporu sayma. Düşünce deneyi siyasal itaatin gerekçesini araştırır. Ayrıca Hobbes’u yalnız hiçbir insan hiçbir hak taşımaz sloganıyla özetlemek de doğru değildir; örneğin kendini koruma meselesi kuramın tartışmalarından biridir. Pasajın verdiği amaç ve yetki ilişkisini izlemelisin."
        ]
      },
      {
        "title": "Locke: hakların korunması ve sınırlı yönetim",
        "paragraphs": [
          "Locke’ta yaşam, özgürlük ve mülkiyet gibi doğal hakların korunması siyasal düzenin gerekçesinde önemlidir. Siyasal yetki bu koruma amacıyla ilişkilendirilir; yönetimin var olması hakların tamamen yöneticinin keyfine bağlı olduğu anlamına gelmez. Rıza, güven ve yetkinin sınırlandırılması bu çerçevede tartışılır.",
          "Aynı sözleşme başlığı altında Locke’u Hobbes’un bütün vurgularıyla özdeşleştirme. Birinde güvenlik için güçlü ortak yetki, diğerinde hakların korunması ve yönetimin sınırları belirgin olabilir. Soruda hangi unsurun ayırt edici verildiğini göster; sadece sözleşme sözcüğüne göre düşünür seçmek, gerekçeyi okumayı eksiltir."
        ]
      },
      {
        "title": "Rousseau: ortak irade ve genel irade",
        "paragraphs": [
          "Rousseau’nun genel irade kavramı, siyasal topluluğun ortak yararına ilişkin iradeyi araştırır. Her kişinin tek tek özel isteğinin sayısal toplamı ile genel iradenin ne olması gerektiği aynı tartışma değildir. Özgürlük, ortak yasa ve yurttaşlık bağı bu yaklaşımda birlikte düşünülür.",
          "Bir oylamada çoğunluğun çıkması bütün koşullarda genel yararın tartışmasız gerçekleştiği anlamına gelmez. Özel çıkarların etkisi ve ortak iradenin nasıl oluşacağı ayrıca sorulmalıdır. Metin genel iradeyi konu ediniyorsa onu yalnız herkesin istediği her şeyi sınırsız yapması biçiminde açıklama. Ortak yasa ile bireysel özgürlük arasındaki gerekçe bağını görünür tut."
        ]
      },
      {
        "title": "Özgürlüğün müdahale ve olanak boyutu",
        "paragraphs": [
          "Bir eylemin yasaklanmaması ile kişinin o eylemi fiilen yapabilecek araçlara sahip olması farklıdır. Bir kursa herkes başvurabilir denirken ulaşım veya erişilebilirlik engeli bazı kişilerin katılmasını zorlaştırabilir. Müdahaleden uzaklık ve etkili olanak, özgürlük tartışmasının farklı yönlerini açar.",
          "Bu ayrım bir boyutun bütün durumlarda önemsiz olduğu anlamına gelmez. Hangi engelin kimin için nasıl kaldırılacağı başka hakları ve kaynakları da ilgilendirebilir. Önce metnin sorduğu özgürlük anlamını belirle; bir izin cümlesini bütün fiilî fırsatların zaten eşit olduğu sonucuna dönüştürme."
        ]
      },
      {
        "title": "Adalet ve eşitliğin farklı soruları",
        "paragraphs": [
          "Adalet hakkın gözetilmesi, payın nasıl belirleneceği ve haksızlığın nasıl düzeltileceği gibi soruları kapsar. Aristoteles’te dağıtıcı ve düzeltici adalet ayrımları farklı ilişkileri açar. Herkese aynı sayıyı vermek, aynı hakkı tanımak ve eşit fırsat oluşturmak birbirinden farklı eşitlik talepleridir.",
          "Bir metin eşitliğe başvuruyorsa neyin eşitlendiğini yaz. Kaynak miktarı mı, başlangıç koşulu mu, temel özgürlük mü? Farklı ihtiyaçlarda aynı ilke farklı miktarlar gerektirebilir. Bu yüzden salt sonuçların farklılığından keyfîlik veya salt aynı kuraldan tam adalet hükmü çıkarma; kullanılan ölçüt ve koşullar birlikte açıklanmalıdır."
        ]
      },
      {
        "title": "Rawls: özgürlük, fırsat ve fark ilkesi",
        "paragraphs": [
          "Rawls’un adalet yaklaşımında eşit temel özgürlükler önceliklidir; sosyal ve ekonomik eşitsizlikler de adil fırsat koşulları ve en az avantajlıların en büyük yararıyla birlikte tartışılır. Fark ilkesi yalnız bir kişinin az da olsa yarar görmesini yeterli sayan bağımsız bir slogan değildir. Diğer ilkelerle kurduğu düzen ve öncelik önem taşır.",
          "Kurgu bir dağılım örneğinde seçenekleri karşılaştırırken önce hangi temel özgürlük ve fırsat koşullarının sabit verildiğini belirt. En az avantajlı grubun durumunu bu koşullarda karşılaştırabilirsin; tek bir sayı bütün gerçek toplumların adaletini otomatik ölçmez. Doğuştan farkları kurumların nasıl düzenlediği sorusu, farklılıkların kaçınılmaz siyasal ayrıcalık olması iddiasından ayrılır."
        ]
      },
      {
        "title": "İdeal düzenin imkânını tartış",
        "paragraphs": [
          "İdeal düzen sorusu, ortak yaşam için haklı ve sürdürülebilir ilkelerin kurulup kurulamayacağını araştırır. Bazı görüşler farklı değerler ve değişen koşullar nedeniyle herkes için tek bir düzen fikrini eleştirir. Başka yaklaşımlar özgürlük, eşitlik veya adalet odağında ideal ilkeler geliştirmeye çalışır.",
          "Liberal düşüncenin bütün biçimleri sınırsız bir serbestliği, sosyalist düşüncenin bütün biçimleri her kişisel eşyanın yok edilmesini savunuyor diye genelleme. Gelenekler kendi içlerinde çeşitlidir. Nihilizm ile otorite eleştirisi yapan anarşizm de özdeş değildir. Bir sınav pasajında verilen belirli ölçütü anlamak, geniş tarihsel başlığı tek bir karikatürle açıklamaktan daha güvenilirdir."
        ]
      },
      {
        "title": "Ütopya ve distopya neyi görünür kılar?",
        "paragraphs": [
          "Ütopyalar ortak yaşamın kurgusal tasarımlarıyla mevcut düzenin sorunlarını ve olası alternatifleri düşünmeye açar. Platon’un Devlet’i, Fârâbî’nin Erdemli Şehir’i, More’un Ütopya’sı, Campanella’nın Güneş Ülkesi ve Bacon’ın Yeni Atlantis’i bu tartışmada anılan örneklerdir. Metinlerin tarihsel koşulları ve temel ilkeleri aynı değildir.",
          "Distopya, istenmeyen bir geleceğin veya düzenin kurgusuyla tehlikeleri eleştirel biçimde gösterir; Huxley’in Cesur Yeni Dünya’sı ve Orwell’ın 1984’ü bilinen örneklerdir. Hayalî tasarım, mantıksal olarak her ayrıntısı kesinlikle imkânsız demek değildir. Ütopyayı okurken önerilen düzenin değişime, özgürlüğe ve insan çeşitliliğine nasıl yer verdiğini de sor."
        ]
      },
      {
        "title": "Kuvvetler ayrılığı ve denetim",
        "paragraphs": [
          "Yasama, yürütme ve yargı işlevlerinin tek elde toplanması ile birbirini denetleyen biçimde örgütlenmesi farklı siyasal düzenlemelerdir. Montesquieu ile ilişkilendirilen kuvvetler ayrılığı yaklaşımı özgürlüğün korunması ve gücün sınırlanması problemine cevap arar. Amaç yalnız kurum adlarını üç kutuya yazmak değildir.",
          "Somut örnekte hangi kurumun hangi kararı aldığına ve başkasının hatasını hangi yolla denetleyebildiğine bak. Yetki paylaşımı kağıt üzerinde bulunup uygulamada etkisiz olabilir; kurumların bağımsızlığı ve işleyen usuller ayrıca önemlidir. Bir şemada üç ad bulunması bütün hakların kendiliğinden korunduğunu kanıtlamaz."
        ]
      },
      {
        "title": "Weber: itaat hangi dayanağa bağlanıyor?",
        "paragraphs": [
          "Weber’in ideal tiplerinde geleneksel otorite yerleşik geleneğin, karizmatik otorite kişiye atfedilen olağanüstü niteliğin, rasyonel-yasal otorite ise kişiden bağımsız kural ve makam düzeninin kabulüne dayanır. Burada incelenen insanların itaatini nasıl anlamlandırdığıdır; bütün örneklerin normatif olarak adil ilan edilmesi değildir.",
          "Gerçek düzenler bu özellikleri karışık taşıyabilir. Rasyonel-yasal otoriteyi tanım gereği demokrasiyle, geleneksel otoriteyi de yalnız tek bir miras örneğiyle sınırlama. Bir yasal-bürokratik yapı demokratik olmayan bir düzende de bulunabilir. Soruda kişinin mi, geleneğin mi yoksa makam ve kuralların mı dayanak yapıldığını açıkça göster."
        ]
      },
      {
        "title": "Mahremiyet ve ortak yaşam sorununa uygula",
        "paragraphs": [
          "Yeni iletişim araçları erişimi kolaylaştırırken kişisel verinin korunması, gözetim ve ifade özgürlüğü gibi sorunlar da doğurabilir. Bir kurumun daha çok bilgi toplaması teknik olarak mümkün olabilir; bunun hangi amaç, sınır ve denetimle haklı görülebileceği ayrıca sorulmalıdır. Yapılabilirlik ile haklılık farklı düzeylerdir.",
          "Bir sorunu felsefi tartışmaya açarken etkilenen kişileri, hak taleplerini, kamusal amacı ve önerilen yöntemi ayrı yaz. Yalnız kendi tercihine uygun olduğu için bir kararı haklı sayma; itirazın hangi öncüle dayandığını açıkla. Böylece siyaset felsefesi gerçek insanları puanlayan bir yarıştan çok ortak düzenin gerekçelerini anlamaya yarar."
        ]
      },
      {
        "title": "Platon ve Hobbes: adaletin farklı dayanakları",
        "paragraphs": [
          "Platon’un ideal devlet tasarımında üreticiler geçim ve üretim işlerini, koruyucular güvenliği, yöneticiler ise ortak düzenin yönetimini üstlenir. Adalet bu üç işlevin kendi görevini yerine getirmesi ve bütünün uyumuyla bağlantılıdır. Bu tasarım yalnız herkese aynı sayıda nesne dağıtma ölçütü değildir; toplumun parçaları ile bütününün nasıl düzenlendiği sorusuna dayanır. Tarihsel görüşü anlamak, bu görev dağılımını çağdaş toplum için zorunlu ve eleştirilemez saymak değildir.",
          "Hobbes’ta adaletin merkezinde yapılan anlaşmalara uyma bulunur; sözleşmelere güvenilir ortak yaptırım sağlayan siyasal güç bu bakımdan önemlidir. Ortak otoritenin bulunmadığı doğa durumunda güvenceli sözleşme ve adalet düzeninin nasıl kurulacağı problem olur. Bu yüzden kaynakta adaletin devlet yaşamıyla ortaya çıkması vurgulanır. Bunu insanların hiçbir ahlaki düşüncesi olamaz diye genişletmeden, Platon’daki görevlerin uyumu ile Hobbes’taki anlaşma ve ortak yaptırım dayanağını karşılaştır."
        ]
      }
    ],
    "examples": [
      {
        "title": "Yapabilir, yasaldır, haklıdır",
        "prompt": "Kurgu bir kurulun bir kuralı uygulayacak gücü vardır ve kural gerekli usulle kabul edilmiştir. Bir üye, kuralın temel haklara neden uygun olduğunu soruyor. Bu son soru ne ister?",
        "strategy": "Güç, usul ve haklılık düzeylerini ayrı yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Uygulama gücü bir kararı fiilen yaptırabilmeyle ilgilidir; tek başına haklılık gerekçesi değildir."
          },
          {
            "label": "2. adım",
            "explanation": "Usule uygun kabul, yasal süreç hakkında bilgi verir; temel haklara uygunluk başka bir ölçüttür."
          },
          {
            "label": "3. adım",
            "explanation": "Üyenin sorusu meşruluğun normatif gerekçesine yönelir; yalnız güç veya usul bilgisini tekrar etmek cevap olmaz."
          }
        ],
        "answer": "Kuralın haklı görülebilirliği için gerekçe ister.",
        "check": "Kurulun gücü ve kuralın usulü değişmeden bu soru sorulabilir.",
        "pitfall": "Yasal olanın her koşulda bütün ahlaki itirazlardan bağışık olduğunu varsayma."
      },
      {
        "title": "Sözleşmeleri aynılaştırma",
        "prompt": "A görüşü güvenlik için güçlü ortak otoriteyi, B görüşü yaşam ve özgürlük haklarını koruyan sınırlı yönetimi vurguluyor. Hobbes ve Locke bu vurgularla nasıl eşleştirilir?",
        "strategy": "İki görüşün ortak sözleşme dilinden sonra amaç farkını bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A yaklaşımında güvenlik ve çatışmanın sona ermesi öncelikle öne çıkarılıyor."
          },
          {
            "label": "2. adım",
            "explanation": "B yaklaşımında yönetimin sınırı ve önceden var kabul edilen temel hakların korunması belirleyici."
          },
          {
            "label": "3. adım",
            "explanation": "A’yı Hobbes, B’yi Locke ile ilişkilendir; her ikisini bütün hakları aynı biçimde devretme görüşü sayma."
          }
        ],
        "answer": "A: Hobbes; B: Locke.",
        "check": "Her eşleştirmeyi adıyla değil metindeki güvenlik ve sınırlı yönetim gerekçesiyle denetle.",
        "pitfall": "Toplum sözleşmesini herkesin tarihte aynı belgeyi imzaladığı olgu sanma."
      },
      {
        "title": "Rawls için koşulları sabit tut",
        "prompt": "İki kurgu düzende eşit temel özgürlükler ve adil fırsat koşulları aynı biçimde sağlanmış kabul ediliyor. A’da en az avantajlı grubun payı 4, B’de 7 birimdir. Yalnız bu verilen karşılaştırmada fark ilkesi hangi seçeneği destekler?",
        "strategy": "Öncelikli koşulları ve karşılaştırılan grubu açıkça sabit tut.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Soru temel özgürlük ve adil fırsat koşullarını iki seçenek için de sağlanmış veriyor."
          },
          {
            "label": "2. adım",
            "explanation": "Karşılaştırma en zengin kişinin toplam kazancına değil en az avantajlı grubun durumuna yöneliyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu sınırlı iki seçenek arasında 7 birim, 4 birimden fazla yarar sağladığı için B tercih edilir; bu sayı bütün toplumlara tek başına adalet notu vermez."
          }
        ],
        "answer": "Verilen koşullar altında B.",
        "check": "Başka öncelikli koşulun bozulduğu yeni bir örneğe aynı kısa hesabı otomatik taşıma.",
        "pitfall": "Fark ilkesini birine çok küçük yarar varsa her eşitsizlik haklıdır diye özetleme."
      },
      {
        "title": "Otoritenin dayanağı",
        "prompt": "Bir kurgu kurumda görevlinin kararına onun soyundan veya kişisel çekiciliğinden dolayı değil, tanımlanmış makam ve kurallara dayanması nedeniyle uyuluyor. Weber’in hangi ideal tipi öne çıkar?",
        "strategy": "İtaatin dayanağını üç tipin tanımıyla karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Metin soya ve yerleşik geleneğe dayanmayı dışarıda bırakıyor; geleneksel tip belirleyici değil."
          },
          {
            "label": "2. adım",
            "explanation": "Kişisel olağanüstü niteliğe bağlılık da verilmemiş; karizmatik tip için bu kanıt yok."
          },
          {
            "label": "3. adım",
            "explanation": "Makam ve kişiden bağımsız kurallara dayanan rasyonel-yasal tipi seç; buradan yönetimin mutlaka demokratik olduğu çıkmaz."
          }
        ],
        "answer": "Rasyonel-yasal otorite.",
        "check": "Kural ve makam vurgusu, kişiye bağlılık vurgusundan farklıdır.",
        "pitfall": "Rasyonel-yasal otoriteyi demokrasi sözcüğünün değişmez eş anlamı sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Güç ve normatif meşruluk aynı mıdır?",
        "answer": "Hayır. İlki fiilen uygulayabilme, ikincisi haklı görülebilirlik için gerekçe sorusudur."
      },
      {
        "prompt": "Hobbes ve Locke’ta öne çıkan farkı söyle.",
        "answer": "Hobbes güvenlik ve güçlü ortak otoriteyi; Locke temel hakları koruyan sınırlı yönetimi öne çıkarır."
      },
      {
        "prompt": "Weber’in üç otorite tipinin dayanağı nedir?",
        "answer": "Geleneksel: gelenek; karizmatik: kişiye atfedilen olağanüstü nitelik; rasyonel-yasal: kural ve makam."
      },
      {
        "prompt": "Rawls’ta fark ilkesi neyle birlikte okunur?",
        "answer": "Eşit temel özgürlükler ve adil fırsat koşullarının önceliğiyle; her küçük yarar her eşitsizliği haklı kılmaz."
      }
    ],
    "source": "Aurelia TYT Felsefe 007–012 kopya kâğıtları; MEBİ TYT-AYT Felsefe ilgili konu özetleri; OGM siyaset-sanat-din, Orta Çağ, Sokrates-Sofistler/Platon-Aristoteles ve felsefi metin analizi kaynaklarıyla karşılaştırılarak yazılmış özgün anlatım. Kavramlar, görüşlerin dayanakları ve sınırları birlikte açıklanır; uygulama soruları resmî sınav sorusu değildir."
  },
  {
    "id": "sanat-felsefesi",
    "title": "Sanat felsefesi: eser, yorum ve estetik deneyim",
    "minutes": 90,
    "objectives": [
      "Estetik ile sanat felsefesinin sorularını örneklerle ayır.",
      "Taklit, yaratım, ifade ve oyun yaklaşımlarının eseri nasıl açıkladığını göster.",
      "Güzellik ölçütlerini düşünürlerin gerekçeleriyle karşılaştır.",
      "Bir eseri yorumlama ile beğeni bildirmeyi ayır."
    ],
    "sections": [
      {
        "title": "Bir eserden hangi soruya geçiyoruz?",
        "paragraphs": [
          "Bir resmin yapıldığı yılı öğrenmek tarihsel bir olguyu araştırır. Resmi sanat eseri yapanın ne olduğunu sormak ise sanat kavramını tartışmaya açar. “Bu resmi sevdim.” ifadesi bir beğeni bildirebilir; “Niçin değerli sayılmalı?” sorusu ise gerekçe ister. Aynı nesneye yönelen bu üç cümle farklı zihinsel işler yapar.",
          "Sanat felsefesi sanatın ne olduğu, nasıl üretildiği, nasıl yorumlandığı ve değeri üzerine düşünür. Eserin maddesini, sanatçıyı ve izleyiciyi tek başına yeterli tanım saymadan aralarındaki ilişkileri inceler. Bir görüşü okurken onun hangi soruyu cevapladığını önce belirle; yalnız bir sanatçı adını tanımak argümanı anlamaya yetmez."
        ]
      },
      {
        "title": "Estetik ve sanat felsefesinin kesişimi",
        "paragraphs": [
          "Estetik, duyusal deneyim ve estetik değer sorunlarını araştırır; güzelin yanı sıra yüce, çirkin veya etkileyici gibi deneyimler de tartışılabilir. Doğadaki bir manzarayı estetik bakımdan değerlendirmek mümkündür. Sanat felsefesi ise sanatın statüsü, üretimi ve yorumuna odaklanarak estetikle geniş bir ortak alan oluşturur.",
          "Bu nedenle iki alanı her kullanımda bütünüyle aynı sayma. Her güzel nesne insanın yaptığı bir sanat eseri değildir; her sanat eseri de yalnız hoş bir duygu uyandırmak zorunda değildir. Acıyı veya huzursuzluğu işleyen bir eser, konusunun rahatsız edici oluşu nedeniyle kendiliğinden sanat dışına çıkmaz."
        ]
      },
      {
        "title": "Sanatçı, eser ve izleyici",
        "paragraphs": [
          "Sanatçı belirli malzeme ve tekniklerle bir eser ortaya koyar; eser biçimi, içeriği ve düzeniyle incelenebilir. İzleyici ise bu düzenle belirli bir bağlam içinde karşılaşır ve onu yorumlar. Üretim niyeti, eserin yapısı ve alımlama süreci ilişkili olduğu hâlde birbirinin yerine geçmez.",
          "Bir sanatçının ne anlatmak istediğini bilmek yorum için değerli olabilir; fakat eserde hangi ayrıntıların bu yorumu desteklediğini de göstermek gerekir. İzleyicinin kişisel çağrışımı da eserin tek zorunlu anlamı değildir. Yorum yaparken gözlediğin biçimsel ayrıntıyı, tarihsel bilgiyi ve kendi çağrışımını açıkça ayır."
        ]
      },
      {
        "title": "Sanat türleri ve malzeme",
        "paragraphs": [
          "Mimarlık, heykel, resim, müzik, edebiyat, tiyatro ve sinema ders kaynaklarında sık kullanılan bir sınıflamadır. Bu alanlar mekân, ses, dil, beden veya hareketli görüntü gibi farklı araçlara başvurur. Bir şiirde sözcüklerin seçimiyle kurulan etki, bir yapıda boşluk ve kütlenin düzenlenmesiyle kurulabilir.",
          "Bu liste bütün çağlarda değişmez ve birbirini dışlayan kutular gibi görülmemelidir. Sinema görüntü, ses ve anlatıyı; tiyatro beden, dil ve mekânı bir araya getirebilir. Ortak estetik soruları öğrenirken her aracın kendine özgü imkânını da incele. Bir türü diğerinin teknik ölçütüyle doğrudan yargılamak yanıltıcı olabilir."
        ]
      },
      {
        "title": "Taklit yaklaşımının temel sorusu",
        "paragraphs": [
          "Taklit veya mimesis yaklaşımı sanatın dünya ile kurduğu temsil ilişkisini öne çıkarır. Bir ressamın gündelik bir nesneyi çizmesi, dünyanın resimde nasıl yeniden sunulduğunu sormaya yol açar. Temsil, nesnenin kendisi değildir; belirli özelliklerin bir araçla seçilmesi ve düzenlenmesidir.",
          "Sanatı taklit olarak açıklamak her eserin fotoğraf gibi bire bir benzemesi gerektiğini söylemekle aynı değildir. Bir anlatı eylemi seçebilir, bazı ayrıntıları öne çıkarabilir ve olayları yeniden kurabilir. Soruda dış gerçekliğin yansıtılması vurgulanıyorsa bu yaklaşımı düşün; yalnız eserin güzel olduğunun söylenmesi taklit için yeterli kanıt değildir."
        ]
      },
      {
        "title": "Platon: görünüşün yeniden temsili",
        "paragraphs": [
          "Platon’un idealar öğretisiyle bağlantılı sanat eleştirisinde duyusal nesne ile onun resmi aynı varlık düzeyinde değildir. Duyusal nesne değişmeyen ideal örnekle ilişkili görülürken resim görünüşün yeniden temsili olarak tartışılır. Böylece sanatın hakikate ve bilgiye ne kadar yaklaştırdığı sorulur.",
          "Bu çerçevede temel mesele resimde kaç renk bulunduğu değildir. Görünüşe bağlanan bir temsilin bilgiyi ve ruhu nasıl etkilediği araştırılır. Platon’un farklı metin ve sanat türlerine ilişkin değerlendirmelerini tek bir sloganla tüketmeden, verilen pasajdaki hakikat ve temsil ilişkisini açıkça kur."
        ]
      },
      {
        "title": "Aristoteles: taklit ve olasılık",
        "paragraphs": [
          "Aristoteles insanın taklit ederek öğrenmesi ve taklitten haz duyması üzerinde durur. Sanatsal anlatı tek bir olayın belgelenmesine indirgenmez; olabilecek eylemleri belirli bir düzen içinde gösterebilir. Bu bakımdan temsil, dünyanın edilgin kopyası olmaktan daha kapsamlı bir kurma etkinliğidir.",
          "Bir öykünün gündelik yaşamda tam aynısının yaşanmamış olması tek başına onu anlamsız kılmaz. Eylemlerin nasıl bağlandığı, olasılık ve zorunluluk ilişkisi incelenebilir. Platon ile Aristoteles’i karşılaştırırken ikisinin de taklit kavramını kullanmasını görüşlerinin bütünüyle aynı olduğu şeklinde yorumlama."
        ]
      },
      {
        "title": "Yaratım ve ifade yaklaşımı",
        "paragraphs": [
          "Yaratım yaklaşımı sanatçının doğada hazır bulunanı yalnız tekrar etmediğini, seçip dönüştürerek özgün bir düzen kurduğunu vurgular. İfade yaklaşımı ise duygu veya iç yaşantının belirli bir biçimde dışa vurulmasına odaklanabilir. Aynı eser bu iki açıdan da tartışılabilir, fakat vurgulanan ilişki farklıdır.",
          "Croce ile ilişkilendirilen sezgi ve ifade anlayışında sanat, sezgisel yaşantının ifadeye kavuşmasıyla düşünülür. Bu, sanatçı aklına gelen her şeyi düşünmeden bırakır demek değildir. Soruda hazır doğa görünümünün yeniden üretilmesi mi, yoksa yaşantının özgün bir biçime dönüşmesi mi öne çıkıyor, bunu metindeki gerekçeyle göster."
        ]
      },
      {
        "title": "Schiller ve oyun",
        "paragraphs": [
          "Schiller’in oyunla ilgili yaklaşımı insanın duyusal yönü ile biçim ve akıl yönünün özgür bir etkinlikte ilişki kurmasıyla bağlantılıdır. Buradaki oyun yalnız zamanı geçirmek veya rekabet kazanmak anlamında kullanılmaz. Sanatsal etkinliğin zorunlu gündelik yarar hesabından uzaklaşabilmesi önem taşır.",
          "Bir eserin satış fiyatı veya pratik yararı açıklanıyorsa bunlar oyun yaklaşımının kendisi değildir. Verilen pasajda özgürlük, zorunluluktan uzak etkinlik ve insanın yönlerinin uyumu vurgulanıyorsa oyun düşüncesiyle bağlantı kurulabilir. Kavramı gündelik oyalanma sözcüğüyle eşitlemeden felsefi işlevini anla."
        ]
      },
      {
        "title": "Güzel ile yararlı aynı ölçüt değildir",
        "paragraphs": [
          "Bir aracın işini iyi yapması onun yararlılığına ilişkin olabilir; biçiminin estetik etkisi ise başka bir değerlendirmedir. Aynı nesne hem yararlı hem güzel bulunabilir, fakat bu iki yargı aynı gerekçeye dayanmak zorunda değildir. Bir sandalyenin sağlamlığı ile çizgilerinin uyumu farklı sorulara cevap verir.",
          "Güzel ile iyi de her kullanımda aynı kavram değildir. Ahlaki iyilik eylem ve niyetleri, estetik değerlendirme ise başka özellikleri konu alabilir. Bir tasarımın zararlı bir amaca hizmet etmesi ciddi bir etik sorun yaratır; bu sorun, biçimsel özelliklerini tartışmayı mantıken imkânsız kılmaz. Değerlendirmenin eksenini açık tut."
        ]
      },
      {
        "title": "Güzelliğin düşünürlere göre açıklanması",
        "paragraphs": [
          "Platon güzelliği değişmeyen ideal olanla ilişkilendirirken Aristoteles düzen, oran ve uygun büyüklük gibi özellikleri tartışır. Plotinos’ta duyusal güzellik daha yüksek bir birliğe yönelişle açıklanabilir. Bu yaklaşımlar aynı güzel sözcüğünü farklı varlık ve bilgi anlayışları içinde kullanır.",
          "Düşünür adı ezberlemek yerine güzelliğin kaynağını sor: nesnenin düzeni mi, ideal örnek mi, daha yüksek birlikle ilişki mi öne çıkarılıyor? Aynı simetri örneği farklı bir kuram içinde başka gerekçeyle kullanılabilir. Bir tek biçim özelliğinden düşünürün bütün öğretisini çıkarmamaya dikkat et."
        ]
      },
      {
        "title": "Kant: çıkar gözetmeyen beğeni",
        "paragraphs": [
          "Kant’ın güzellik yargısında çıkar gözetmeme, nesneyi sahip olma veya ondan pratik kazanç elde etme isteğine indirgemeden değerlendirmeyle ilişkilidir. Bir şeyi yalnız fiyatı yükselecek diye istemek ile onu güzel bulmak aynı tür yargı değildir. Bu ayrım beğeninin gerekçesini araştırmaya yarar.",
          "Kant’ın evrensel geçerlilik talebi herkesin fiilen aynı oyu vermesi demek değildir. Yargı kişisel bir duyguya dayansa da başkalarının da katılmasını bekleyen bir tarzda ileri sürülebilir. Bu düşünceyi anket çoğunluğu güzelliği kesin olarak ispatlar biçiminde dönüştürme. Fiilî uzlaşma ile geçerlilik iddiası farklıdır."
        ]
      },
      {
        "title": "Hegel ve düşüncenin duyusal görünüşü",
        "paragraphs": [
          "Hegel sanatın düşünsel içeriğin duyusal biçimde görünmesiyle ilişkisini tartışır. Eser yalnız bir madde yığını değildir; düşünce ve anlam belirli bir biçimde görünür hâle gelir. Taşın heykel, sesin müzik veya sözün şiir olarak düzenlenmesi bu içerik-biçim ilişkisinin örnekleri olabilir.",
          "Bu açıklama her eserin tek bir ders cümlesine çevrilebileceği anlamına gelmez. Eserin düşünsel içeriği onun duyusal kuruluşundan bütünüyle koparılarak ele alındığında sanatın kendine özgü yönü gözden kaçabilir. Pasajda düşüncenin duyusal biçim kazanması vurgulanıyorsa yalnız sanatçının özel duygusuna indirgeyen seçeneği ele."
        ]
      },
      {
        "title": "Bir yorumu gerekçeli kur",
        "paragraphs": [
          "Önce eserde gerçekten görülen özellikleri betimle: çizgilerin yönü, ritim, tekrar, malzeme veya anlatıcı seçimi. Sonra bu ayrıntıların hangi yorumu desteklediğini açıkla. Son aşamada alternatif bir yorumu ve onun dayanağını düşün. Böylece beğeni cümlesi, tartışılabilir bir yoruma dönüşür.",
          "Bu uygulamadaki özgün çizimde biçim, temsil, ifade ve izleyici ilişkisini ayrı ayrı inceleyebilirsin. Bir düğmenin seçilmesi eserin güzelliğini ölçmez; yalnız belirli bir yaklaşımın neyi öne çıkardığını görünür kılar. Felsefi öğrenme, hangi ölçütün kullanıldığını ve onun hangi soruya cevap verdiğini açıklamakla ilerler."
        ]
      },
      {
        "title": "Baumgarten ve estetik kavramı",
        "paragraphs": [
          "Estetik sözcüğü duyum ve algılamayla ilgili Yunanca kökle bağlantılıdır; kavramın modern bir disiplin adı olarak kullanımında Baumgarten önemli bir isimdir. Buradaki tarihsel bilgi estetiğin duyusal deneyime yönelen boyutunu anlamaya yardım eder. Adını öğrenmenin yanında alanın hangi soruları sorduğunu da kurmak gerekir.",
          "Duyusal olanı incelemek yalnız duyu organlarının biyolojik yapısını ölçmek değildir. Bir çizginin, sesin veya mekânın bizde nasıl anlam ve değer kazandığı tartışılabilir. Estetik soruyu bir renk ölçümüne veya yalnız beğendim cümlesine indirmeden, duyum ile değerlendirme arasındaki ilişkiyi araştır."
        ]
      },
      {
        "title": "Sanat ve zanaat ilişkisi",
        "paragraphs": [
          "Zanaat çoğu sınıflamada belirli bir ihtiyaca yönelik becerili üretimi; sanat ise estetik ve ifade yönü öne çıkan yaratıcı etkinliği belirtir. Bir kapta işlevin, bir heykelde ifade ve biçimin öncelenmesi bu ayrımı somutlaştırabilir. Tarihsel olarak iki alanın sınırları ve adları değişmiştir.",
          "Bu ayrımı zanaatta hiçbir yaratıcılık yoktur veya sanatta hiçbir yarar bulunamaz gibi mutlaklaştırma. Bir nesne hem kullanışlı hem estetik açıdan değerli olabilir. Soruda belirleyici olan üretimin hangi amaç ve ölçütle ele alındığıdır. Teknik beceri, estetik amaç ve özgün yorumun ilişkisini birlikte düşün."
        ]
      },
      {
        "title": "Öznel ve nesnel güzellik ölçütleri",
        "paragraphs": [
          "Öznelci yaklaşım beğeninin kişiye, yaşantıya ve değerlendiren özneye bağlılığını öne çıkarır. Nesnelci yaklaşım ise estetik değerin eserin özellikleriyle ve kişiden bağımsız ölçütlerle açıklanabileceğini savunur. Aynı çizimin birinde izleyicinin duygusuyla, diğerinde oran ve düzeniyle değerlendirilmesi bu farkı gösterir.",
          "Bir görüşün ölçütünü anlamak onu tartışmasız doğru saymak değildir. Oran gibi nesne özelliğinin bulunduğu gözlenebilir; bu özelliğin bütün eserleri güzel yapmaya yeterli olduğu ayrıca savunulmalıdır. Kişilerin beğenisinin farklı olması da estetik üzerine hiç gerekçeli tartışma yapılamayacağını tek başına göstermez."
        ]
      },
      {
        "title": "Özgünlük, biriciklik ve kalıcılık",
        "paragraphs": [
          "Özgünlük eserin hazır kalıbı yalnız tekrarlamayan yorum ve kuruluşuyla; biriciklik onun kendine özgü kimliğiyle ilişkilendirilebilir. Kalıcılık ise eserin farklı zamanlarda anlam ve değer taşımayı sürdürmesi bakımından tartışılır. Bu kavramlar sanat eserinin niçin sıradan bir üretim dizisinden ayrı görülebildiğini açıklamaya yardım eder.",
          "Bütün eserlerin tek fiziksel nüshası olmak veya sonsuza kadar bozulmadan kalmak zorunda olduğu sonucu çıkmaz. Baskı, müzik icrası ve dijital üretimde eser ile onun örnekleri arasındaki ilişki ayrıca incelenir. Bir metinde biriciklik geçiyorsa bunun özgün kimlik mi tek maddi kopya mı anlamında kullanıldığını açıklaştır."
        ]
      },
      {
        "title": "Kent, mimari ve duyarlılık",
        "paragraphs": [
          "Mimari yalnız barınma ihtiyacını karşılamakla sınırlı değildir; mekânın oranı, dengesi, ışığı ve ortak kullanım biçimi yaşantıyı etkileyebilir. Yeşil alan, yapı ve yollar bir arada kentin duyusal ve kültürel çevresini kurar. Bir tasarım hem işlev hem estetik deneyim bakımından farklı sorulara açılır.",
          "Sanat ve kültür bir toplumun yaşantılarını görünür kılabilir; bu, her eserin bütün toplumu tek başına temsil ettiği anlamına gelmez. Bir çizimi veya yapıyı incelerken hangi ayrıntının hangi yorumu desteklediğini göster. Duyarlılık geliştirmek otomatik olarak her kişinin bütün ahlaki sorunlarını çözen mekanik bir sonuç değildir; fark etme ve yorumlama imkânını genişletir."
        ]
      },
      {
        "title": "Sanat sınıflarını malzeme ve eylemle bağla",
        "paragraphs": [
          "Dramatik sanatlar sahnelenen eylem ve anlatımla ilişkilidir; tiyatro, sinema ve opera örnek verilebilir. Yüzey sanatları düzlemdeki çizgi ve renk düzenine yönelir; resim, grafik ve hat bu grupta anılır. Hareket sanatları bedensel devinimi öne çıkarır; halk dansları, bale ve pandomim örnektir. Hacim sanatları ise üç boyutlu kütleyle çalışır; heykel, seramik ve kabartma bu ilişkiyi somutlaştırır.",
          "Mekân sanatlarında yapı ve çevrenin düzenlenmesi belirleyicidir; mimari, iç mimari ve peyzaj mimarisi örnektir. Dil sanatları roman, hikâye ve şiirde sözü; ses sanatları caz, klasik müzik ve halk müziğinde sesin düzenini öne çıkarır. Bu öğretici sınıfları kapalı ve değişmez sınırlar sanma: opera ses, hareket ve dramatik eylemi birlikte kullanabilir. Bir eserin hangi araç ve ilişkinin öne çıktığına göre birkaç grupta tartışılması mümkündür."
        ]
      }
    ],
    "examples": [
      {
        "title": "Dört ilişkiyi ayır",
        "prompt": "Aynı özgün çizim için dört yorum yapılır: doğadaki bir ağacı temsil eder; sanatçının kaygısını dışa vurur; çizgi ve boşlukları düzenler; izleyicide huzur uyandırır. Bu yorumlar niçin aynı şey değildir?",
        "strategy": "Her yorumun hangi iki öğe arasında ilişki kurduğunu bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk yorum dünya ile eser arasındaki temsil ilişkisini, ikinci yorum sanatçı ile eser arasındaki ifade ilişkisini öne çıkarır."
          },
          {
            "label": "2. adım",
            "explanation": "Üçüncü yorum eserin kendi biçimsel düzenine, dördüncü yorum eser ile izleyicinin karşılaşmasına yönelir."
          },
          {
            "label": "3. adım",
            "explanation": "Aynı eser değişmeden soru ekseninin değişebildiğini göster; yorumlar birbirini zorunlu olarak dışlamaz."
          }
        ],
        "answer": "Temsil, ifade, biçim ve alımlama farklı ilişkiler kurar.",
        "check": "Dört yorumda kullanılan dünya, sanatçı, eser ve izleyici öğelerini tek tek işaretle.",
        "pitfall": "Bir eseri yalnız tek bir ilişkinin bütün anlamı olarak daraltma."
      },
      {
        "title": "Platon ile Aristoteles",
        "prompt": "Bir metin sanatın görünüşü yeniden temsil etmesi nedeniyle hakikatten uzaklaşmasını; diğeri ise eylemi olasılık ve bütünlük içinde kurmasının öğretici yönünü vurguluyor. Hangi karşılaştırma uygundur?",
        "strategy": "Taklit sözcüğünü görmekle yetinmeden ona verilen değeri oku.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk metin görünüşün yeniden temsili ile hakikate uzaklık arasında ilişki kurar; Platoncu eleştiriye yakındır."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci metin sanatsal kurmanın seçici ve öğretici yönünü vurgular; Aristotelesçi yaklaşımı öne çıkarır."
          },
          {
            "label": "3. adım",
            "explanation": "İki düşünürün taklit kavramını kullanmasının aynı değerlendirme yaptıkları anlamına gelmediğini açıkla."
          }
        ],
        "answer": "İlk metin Platon; ikinci metin Aristoteles ile ilişkilidir.",
        "check": "Sonucu her metindeki temsil ve bilgi gerekçesine geri bağla.",
        "pitfall": "Her taklit yaklaşımının yalnız fotoğraf gibi kopya istediğini varsayma."
      },
      {
        "title": "Güzel, yararlı ve pahalı",
        "prompt": "Ece bir vazoyu çiçekleri iyi taşıdığı için yararlı, çizgi uyumunu sevdiği için güzel, yeniden satılabileceği için kazançlı buluyor. Hangi ayrım yapılmalıdır?",
        "strategy": "Üç yargının gerekçesini ayrı yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Çiçek taşıma işlevi yarar ölçütüdür; nesnenin yaptığı işe ilişkindir."
          },
          {
            "label": "2. adım",
            "explanation": "Çizgi uyumu estetik değerlendirmeye, satış beklentisi ekonomik çıkara yönelir."
          },
          {
            "label": "3. adım",
            "explanation": "Aynı nesnede üç yargının bulunabileceğini, fakat birinin diğerini tanım gereği kanıtlamadığını göster."
          }
        ],
        "answer": "İşlev, estetik etki ve ekonomik çıkar farklı gerekçelerdir.",
        "check": "Bir özellik değiştiğinde diğer iki yargının zorunlu olarak değişip değişmediğini sor.",
        "pitfall": "Pahalı olan her nesnenin zorunlu güzel veya güzel olanın zorunlu yararlı olduğunu çıkarma."
      },
      {
        "title": "Kant’ta geçerlilik talebi",
        "prompt": "Bir yorumcu “Bu yapıtı satmak veya kullanmak için değil, biçimini güzel bulduğum için beğeniyorum; başkalarının da bu beğeniye katılmasını bekliyorum.” diyor. Hangi iki vurgu öne çıkar?",
        "strategy": "Yarar beklentisi ile başkalarına yönelen beğeni iddiasını ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Yorumcu sahip olma, kullanım veya kazanç beklentisini beğenisinin temeli olarak vermiyor."
          },
          {
            "label": "2. adım",
            "explanation": "Başkasının da katılmasını beklemesi bir geçerlilik talebidir; herkesin fiilen aynı oyu verdiği bilgisi değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Çıkar gözetmeme ile evrensel geçerlilik talebini birlikte belirt; bunu anketle kanıtlanmış nesnel sayı sanma."
          }
        ],
        "answer": "Çıkar gözetmeyen beğeni ve evrensel geçerlilik talebi.",
        "check": "Metin herkes zaten aynı şeyi beğendi demiyor; bir beklentiyi ifade ediyor.",
        "pitfall": "Evrensellik talebini fiilî oy birliği veya kazanç hesabıyla karıştırma."
      }
    ],
    "recall": [
      {
        "prompt": "Her güzel nesne sanat eseri midir?",
        "answer": "Hayır; doğal manzara estetik değer taşıyabilir, ama bu tek başına insan ürünü eser olduğu anlamına gelmez."
      },
      {
        "prompt": "Taklit, ifade ve alımlama hangi ilişkilere yönelir?",
        "answer": "Dünya-eser, sanatçı-eser ve eser-izleyici ilişkilerine."
      },
      {
        "prompt": "Kant’ta evrensellik fiilî oy birliği midir?",
        "answer": "Hayır; beğeni yargısının başkalarının da katılmasını bekleyen geçerlilik talebidir."
      },
      {
        "prompt": "Schiller’de oyun yalnız oyalanma mıdır?",
        "answer": "Hayır; duyusal ve akli yönlerin özgür etkinlikte ilişki kurmasıyla bağlantılıdır."
      }
    ],
    "source": "Aurelia TYT Felsefe 007–012 kopya kâğıtları; MEBİ TYT-AYT Felsefe ilgili konu özetleri; OGM siyaset-sanat-din, Orta Çağ, Sokrates-Sofistler/Platon-Aristoteles ve felsefi metin analizi kaynaklarıyla karşılaştırılarak yazılmış özgün anlatım. Kavramlar, görüşlerin dayanakları ve sınırları birlikte açıklanır; uygulama soruları resmî sınav sorusu değildir."
  },
  {
    "id": "felsefi-okuma-ve-yazma",
    "title": "Felsefi okuma ve yazma: savdan gerekçeli metne",
    "minutes": 90,
    "objectives": [
      "Sorunu, kavramı, savı ve gerekçeyi tam metinde ayır.",
      "Açık ve örtük öncülleri sonuçla ilişkilendir.",
      "Karşı görüşü çarpıtmadan yeniden kur ve eleştir.",
      "Planlama, taslak ve düzeltmeyle gerekçeli bir metin oluştur."
    ],
    "sections": [
      {
        "title": "Okumadan önce soruyu kur",
        "paragraphs": [
          "Felsefi metin yalnız bilgi toplamak için okunmaz; yazarın hangi problemi ele aldığını ve hangi cevabı savunduğunu anlamak da gerekir. Başlığa ve metnin açılışına bakarak soru hakkında geçici bir tahmin kurabilirsin. Bu tahmin, metni kendi beklentine uydurmak için değil okuma sırasında denetlemek içindir.",
          "Bir metinde özgürlük sözcüğü geçmesi yazarın özgürlüğü savunduğunu tek başına göstermez; yazar onun sınırını veya imkânını tartışıyor olabilir. İlk okumada metnin genel yönünü, ikinci okumada dayanak ve itirazları izle. Kısa bir metni birkaç amaçla yeniden okumak, her cümleyi aynı anda ezberlemeye çalışmaktan daha açıklayıcıdır."
        ]
      },
      {
        "title": "Problemi ve kavramı ayır",
        "paragraphs": [
          "Problem cevap aranılan sorundur; kavram ise bu soruyu kurmak ve cevaplamak için kullanılan anlam birimidir. “Bir eylem hangi koşulda özgür sayılır?” probleminde özgürlük, eylem ve koşul kavramları iş görür. Kavramların anlamı değişirse problemin kendisi de farklı anlaşılabilir.",
          "Okurken temel kavramları belirle ve metindeki anlamlarını kendi cümlenle açıkla. Sözlükteki her anlamı aynı anda metne taşıma; yazarın hangi ayrımı yaptığına bak. Bir kavramın yalnız örneğini vermek tanımını tamamlamayabilir. Örneğin bir seçim anlatmak, seçimin niçin özgür olduğunu henüz açıklamaz."
        ]
      },
      {
        "title": "Sav, görüşün açık cevabıdır",
        "paragraphs": [
          "Sav veya tez, yazarın problem hakkında savunduğu temel yargıdır. Bir metin birkaç ara sonuç kullanabilir; temel sav bunları belirli bir cevap çevresinde birleştirir. “Her seçimin bir nedeni vardır.” ile “Hiçbir seçim özgür değildir.” aynı yargı değildir; biri diğerine dayanak yapılmışsa aradaki geçiş ayrıca incelenir.",
          "Temel savı bulmak için bütün ayrıntıları kopyalamak yerine yazarın hangi cevabı kabul ettirmeye çalıştığını sor. Son cümle her zaman temel sav değildir; bazen bir itiraz veya örnekle biter. Kendi yazdığın özet, yazarın söylemediği bütün veya asla gibi kapsam ifadeleri eklememelidir."
        ]
      },
      {
        "title": "Argüman öncül ve sonuç ilişkisidir",
        "paragraphs": [
          "Öncül, bir sonuca dayanak olarak sunulan yargıdır; sonuç ise bu dayanaklardan çıkarılmak istenen yargıdır. Argüman bu ilişkiyi içerir, yalnız sonuç cümlesinin adı değildir. “Bütün öğrenciler kaydoldu; Ece öğrencidir; öyleyse Ece kaydoldu.” örneğinde ilk iki yargı sonuca dayanak olur.",
          "Çünkü ve dolayısıyla gibi ifadeler bu işlevi görünür kılabilir; fakat her argümanda bulunmaları gerekmez. Bir cümle bir argümanda sonuç, daha ileri bir argümanda öncül olabilir. Metni oklarla yeniden kurarken cümlenin uzunluğunu değil, hangi yargının hangisine dayanak yapıldığını esas al."
        ]
      },
      {
        "title": "Örtük öncülü görünür kıl",
        "paragraphs": [
          "“Bu karar çoğunlukça seçildi; öyleyse mutlaka adildir.” ifadesinde çoğunluk kararı ile adalet arasında söylenmemiş bir geçiş vardır. Sonucun zorunlu çıkması için bütün çoğunluk kararlarının adil olduğu gibi güçlü bir köprü gerekir. Bu köprüyü yazmak, düşüncenin nerede tartışmaya açık olduğunu gösterir.",
          "Örtük öncül bulmak yazar adına istediğin her varsayımı eklemek değildir. Verilen geçişi en makul biçimde tamamlayan dayanağı öner ve onun metinde açıkça söylenmediğini belirt. Ardından bu dayanağın savunulup savunulamayacağını incele. Böylece bir boşluk tespitini kişiye yönelik yargıya dönüştürmeden tartışabilirsin."
        ]
      },
      {
        "title": "Örnek ile kanıtın işlevi",
        "paragraphs": [
          "Örnek bir kavramı somutlaştırabilir veya genel bir yargıya destek sunabilir. Ancak tek bir olay, bütün durumları kapsayan bir sonuca her zaman yetmez. Bir öğrencinin sessizlikte iyi çalışması, bütün öğrencilerin yalnız sessizlikte öğrenebileceğini göstermeye yeterli değildir.",
          "Karşı örnek ise bütün diye kurulan bir yargının sınırını gösterebilir. “Bütün kuşlar uçar.” yargısına uçmayan bir kuş örneği vermek, bu kapsamın korunamayacağını gösterir. Burada bir karşı örneğin etkisi ile tek olumlu örneğin etkisi aynı değildir. Sonucun kapsamını ve örneğin işlevini birlikte oku."
        ]
      },
      {
        "title": "Tutarlılık ve doğruluğu ayrı denetle",
        "paragraphs": [
          "Bir metnin tutarlı olması, aynı koşulda birbirini dışlayan yargıları birlikte savunmamasıyla ilişkilidir. Doğruluk ise yargının konu aldığı şeye veya benimsenen doğruluk ölçütüne uygunluğuyla tartışılır. Bir görüş kendi içinde tutarlı olduğu hâlde yanlış öncüllerden başlayabilir.",
          "Tersine, bazı doğru cümleleri yan yana yazmak onların birlikte iyi bir argüman oluşturduğunu göstermez. Önce yargılar arasında çelişki olup olmadığını, sonra öncüllerin dayanağını ve çıkarımın geçerliliğini ayrı sor. Ünlü bir düşünürün görüşü olması bu denetimlere gerek bırakmaz; felsefi okuma otoriteyi anlamanın yanında gerekçeyi de inceler."
        ]
      },
      {
        "title": "Karşı görüşü en güçlü biçimiyle anla",
        "paragraphs": [
          "Eleştirmeden önce karşı görüşü, onu savunan kişinin tanıyabileceği biçimde yeniden kur. Söylediğini abartmak veya zayıf bir örneğe indirgemek gerçek tezi çürütmez. “Bazı koşullarda sınırlama gerekir.” diyen kişiye “Hiç kimsenin özgür olmasını istemiyorsun.” demek kapsamı değiştirir.",
          "İyi bir eleştiri belirli bir öncüle, çıkarıma veya kapsama yönelir. Yazarın kişiliği hakkında yorum yapmak, savın yanlışlığını göstermez. Karşı görüşün güçlü gerekçesini açıkça göstermek, kendi düşünceni bırakmak anlamına gelmez; anlaşmazlığın tam yerini bulmayı sağlar."
        ]
      },
      {
        "title": "Çözümleme ve sentez",
        "paragraphs": [
          "Çözümleme, bir metni problem, kavram, sav, gerekçe ve itiraz gibi işlevlerine ayırarak incelemektir. Sentez ise bu parçalar arasında ilişki kurup bütünün anlamını yeniden oluşturmaktır. Yalnız parçaları listelemek, yazarın görüşünün nasıl geliştiğini göstermeye yetmeyebilir.",
          "Metin sonunda kısa bir argüman haritası çıkar: hangi soru soruldu, hangi cevap verildi, cevap hangi dayanağa bağlandı ve neye itiraz edildi? Haritadaki oklar metnin yapısını açıklar; cümlelerin her zaman aynı sırayla yazılacağını dayatmaz. Sonucu başta verip gerekçeyi sonra açıklayan metin de kurulabilir."
        ]
      },
      {
        "title": "Yazma planını problemden çıkar",
        "paragraphs": [
          "Yazmaya başlamadan önce cevaplamaya çalıştığın soruyu sınırlı ve açık biçimde yaz. Ardından savını bir cümleyle kur ve onu destekleyecek gerekçeleri seç. Konuyla ilgili bütün bilgileri sıralamak yerine her paragrafın savla nasıl ilişki kuracağını belirlemek gerekir.",
          "Giriş problem ve yaklaşımı tanıtabilir; gelişme gerekçe, örnek ve karşı görüşü işler; sonuç ise tartışmadan çıkan cevabı açıklaştırır. Bu düzen düşünmeyi kolaylaştıran bir plandır, her felsefi metnin değişmez cümle kalıbı değildir. Önemli olan okurun sorudan sonuca giden bağı takip edebilmesidir."
        ]
      },
      {
        "title": "Taslağı karşı görüşle geliştir",
        "paragraphs": [
          "İlk taslakta savını ve dayanaklarını kurduktan sonra güçlü bir itiraz seç. Bu itiraz savın bir öncülüne mi, kapsamına mı, çıkarımına mı yöneliyor? Soruyu böyle sınırlandırmak, sırf metin uzasın diye zayıf bir karşı görüş eklemeyi önler.",
          "Cevap verirken itirazın haklı yanını kabul edip savın kapsamını daraltabilirsin. Bu, başarısızlık değil daha savunulabilir bir görüş geliştirme olabilir. Karşı görüşe cevap vermeden onu yok saymak ise tartışmayı eksik bırakır. Son metinde hangi değişikliğin niçin yapıldığını açıkça göster."
        ]
      },
      {
        "title": "Düzeltme, kaynak ve açık dil",
        "paragraphs": [
          "Düzeltmede önce düşünce yapısını, sonra ifade ve yazımı denetle. Her paragrafın bir işi var mı, kavramlar aynı anlamda mı kullanılıyor, sonuç dayanakların taşıyabileceğinden daha geniş mi? Uzun ve anlaşılmaz cümleler bir görüşü kendiliğinden derin yapmaz; açık anlatım akıl yürütmeyi görünür kılar.",
          "Başkasının görüşünü aktarırken ona ait olanla kendi yorumunu ayır; doğrudan alıntı ve özetin kaynağını doğru göster. Uygulamadaki özgün örnekleri resmî sınav metni veya tarihsel alıntı diye sunma. Bu bölümün etkileşimli modeli de serbest yazıyı otomatik notlandırmaz; belirli bir metindeki gerekçe bağlarını birlikte inceletir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Savı ve gerekçeyi haritala",
        "prompt": "Kurgu metin: “Kütüphanenin açık saatleri uzatılmalıdır; çünkü akşam çalışan öğrenciler mevcut saatlerde buraya ulaşamıyor.” Metnin savı ve gerekçesi nedir?",
        "strategy": "Kabul ettirilmek istenen yargıyı ona sunulan dayanaktan ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Sav açık saatlerin uzatılması gerektiği yargısıdır; yazarın cevap olarak savunduğu öneridir."
          },
          {
            "label": "2. adım",
            "explanation": "Gerekçe akşam çalışan öğrencilerin mevcut saatlerde erişememesidir; öneriye destek olarak sunulur."
          },
          {
            "label": "3. adım",
            "explanation": "Erişim ihtiyacının saat düzenlemesinde dikkate alınması gerektiği örtük köprüyü de fark et."
          }
        ],
        "answer": "Sav: saatler uzatılsın. Gerekçe: bazı öğrenciler mevcut saatlerde erişemiyor.",
        "check": "Çünkü ifadesinden sonraki yargının hangi önermeye dayanak olduğunu göster.",
        "pitfall": "Sonuç ile gerekçeyi sadece metindeki sıralarına göre ters eşleştirme."
      },
      {
        "title": "Örtük köprüyü bul",
        "prompt": "“Bu öneri çoğunluğun oyunu aldı; öyleyse adildir.” çıkarımının kesin olması için hangi köprü varsayılır?",
        "strategy": "Öncülde olanla sonuçta yeni gelen kavramı karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Açık öncül oyların dağılımına ilişkindir; adalet kavramını henüz tanımlamaz."
          },
          {
            "label": "2. adım",
            "explanation": "Sonuç önerinin adil olduğunu ileri sürer; çoğunluk ile adalet arasında bir kural gerekir."
          },
          {
            "label": "3. adım",
            "explanation": "Gerekli güçlü köprü, çoğunluğun seçtiği bütün önerilerin adil olduğudur; bu köprünün kendisi de eleştirilebilir."
          }
        ],
        "answer": "Çoğunluğun seçtiği her öneri adildir varsayımı.",
        "check": "Bu köprü reddedildiğinde açık öncül doğru kalsa da sonuç zorunlu çıkmaz.",
        "pitfall": "Örtük öncülü saptamayı o öncülü tartışmasız kabul etmekle karıştırma."
      },
      {
        "title": "Kapsamı değiştiren eleştiri",
        "prompt": "Bir yazar “Bazı koşullarda veri toplanması sınırlanmalıdır.” diyor. Eleştirmen “Hiçbir koşulda hiçbir veri toplanmasın istiyor.” diye cevap veriyor. Sorun nedir?",
        "strategy": "İki cümlenin kapsam sözcüklerini yan yana koy.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Asıl sav yalnız bazı koşullar ve sınırlama hakkında konuşur; bütün veri toplamayı reddetmez."
          },
          {
            "label": "2. adım",
            "explanation": "Eleştirmen hiçbir koşulda diyerek kapsamı bütün durumlara genişletir ve sınırlamayı tam yasağa dönüştürür."
          },
          {
            "label": "3. adım",
            "explanation": "Önce savı doğru biçimde yeniden kurmak gerekir; değiştirilen savı eleştirmek asıl savı çürütmez."
          }
        ],
        "answer": "Asıl sav çarpıtılmış; daha güçlü ve farklı bir görüşe cevap verilmiştir.",
        "check": "Bazı ve hiçbir ifadeleri aynı kapsamı taşımaz.",
        "pitfall": "Kişinin kimliğine veya ses tonuna bakarak argümanın geçerliliğini belirleme."
      },
      {
        "title": "Karşı örneğin gücü",
        "prompt": "“Bu sınıftaki bütün öğrenciler yalnız sessizlikte çalışabilir.” deniyor. Sınıftaki Deniz’in müzikle çalışabildiği güvenilir biçimde gösteriliyor. Hangi sonuç çıkar?",
        "strategy": "Evrensel yargının kapsamı ile karşı örneği aynı grupta kontrol et.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk sav sınıftaki her öğrenciyi kapsar ve başka çalışma koşulunu dışlar."
          },
          {
            "label": "2. adım",
            "explanation": "Deniz o sınıftadır ve müzikle çalışabilmektedir; savın dışladığı bir örnek bulunmuştur."
          },
          {
            "label": "3. adım",
            "explanation": "Bütün öğrenciler için yalnız sessizlik şartı korunamaz; fakat bundan herkesin müzikle daha iyi çalıştığı sonucu çıkmaz."
          }
        ],
        "answer": "Evrensel sav bu kapsamıyla reddedilir.",
        "check": "Karşı örneğin gerçekten aynı sınıfa ve aynı çalışma anlamına ilişkin olduğunu denetle.",
        "pitfall": "Bir evrensel savın çürütülmesini onun tam tersinin evrensel doğrulanması sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Argüman yalnız sonuç cümlesi midir?",
        "answer": "Hayır; öncüllerin sonuca dayanak olarak sunulduğu ilişkiyi içerir."
      },
      {
        "prompt": "Örtük öncül ne işe yarar?",
        "answer": "Açık dayanak ile sonuç arasındaki söylenmemiş köprüyü görünür kılar; kendisi ayrıca denetlenir."
      },
      {
        "prompt": "Tutarlılık ile doğruluk neden ayrılır?",
        "answer": "Tutarlılık yargıların çelişmemesiyle ilgilidir; tutarlı bir metin yanlış öncüller içerebilir."
      },
      {
        "prompt": "İyi eleştiri önce ne yapar?",
        "answer": "Karşı görüşü kapsamını değiştirmeden makul biçimde yeniden kurar; sonra öncül veya çıkarımı hedefler."
      }
    ],
    "source": "Aurelia TYT Felsefe 007–012 kopya kâğıtları; MEBİ TYT-AYT Felsefe ilgili konu özetleri; OGM siyaset-sanat-din, Orta Çağ, Sokrates-Sofistler/Platon-Aristoteles ve felsefi metin analizi kaynaklarıyla karşılaştırılarak yazılmış özgün anlatım. Kavramlar, görüşlerin dayanakları ve sınırları birlikte açıklanır; uygulama soruları resmî sınav sorusu değildir."
  },
  {
    "id": "ilk-cag-felsefesi",
    "title": "İlk Çağ felsefesi: doğa, bilgi ve iyi yaşam",
    "minutes": 110,
    "objectives": [
      "Arkhe, değişim ve bilginin imkânı sorularını düşünürlerin gerekçeleriyle açıkla.",
      "Sofistlerin farklı savlarını Sokrates’in sorgulama yöntemiyle karşılaştır.",
      "Platon ve Aristoteles’in varlık, bilgi, ahlak ve siyaset ilişkilerini kur.",
      "Tarihsel görüşleri günümüz bilimsel bilgisiyle karıştırmadan yorumla."
    ],
    "sections": [
      {
        "title": "Tarihsel soruyu kendi koşulunda oku",
        "paragraphs": [
          "İlk Çağ felsefesi başlığı doğa, insan ve toplum hakkında farklı dönemlerde geliştirilmiş çok sayıda görüşü kapsar. Yunan düşüncesi kendisinden önceki ve çevresindeki uygarlıkların matematik, gözlem ve anlatı birikimiyle ilişki kurmuştur. Felsefenin sistemli gelişimini incelemek, başka hiçbir toplumda düşünce bulunmadığını söylemek değildir.",
          "Tarihsel bir görüşü öğrenirken önce hangi soruna cevap aradığını belirle. Suyun temel olduğunu ileri süren bir açıklama bugünkü kimya kitabı gibi okunmaz; çokluğun gerisindeki ortak ilkeyi arar. Görüşün tarihsel değerini anlamak, bugün bilimsel olarak doğrulanmış olduğunu ilan etmekle aynı değildir."
        ]
      },
      {
        "title": "Arkhe: çokluğun ortak ilkesi",
        "paragraphs": [
          "Arkhe, var olanların temelinde bulunan ilk ilke veya kaynak sorusuyla ilişkilidir. Birbirinden farklı görünen nesnelerin hangi ortak temelle açıklanabileceği araştırılır. Böylece tek tek olayları ayrı anlatılarla açıklamak yerine doğayı bir bütün olarak düşünme çabası öne çıkar.",
          "Arkhe sorusunun cevapları aynı türden değildir; kimi düşünür belirli bir maddeyi, kimi sınırı olmayan bir temeli önerir. Pasajı yalnız düşünür adına bakarak değil, çokluğun nasıl ortaya çıktığını açıklayan ilkeye bakarak oku. Bu ilke bugünkü deneysel element listesiyle doğrudan özdeş değildir."
        ]
      },
      {
        "title": "Thales, Anaksimandros ve Anaksimenes",
        "paragraphs": [
          "Thales arkheyi suyla ilişkilendirir. Anaksimandros belirli bir karşıtın diğerlerini açıklamakta sınırlı kalacağını düşünerek apeiron denen sınırsız-belirsiz ilkeye yönelir. Anaksimenes ise havayı ve yoğunlaşma-seyrekleşme gibi dönüşümleri öne çıkarır. Üçü doğanın çokluğunu temel bir ilkeyle açıklamaya çalışır.",
          "Bu karşılaştırmada yalnız su, apeiron ve hava eşleştirmesini ezberleme. Belirli bir madde ile belirlenmemiş temel arasındaki farkı ve dönüşümün nasıl açıklandığını sor. Açıklamaların ortak yönü doğa için akla dayalı bütünlüklü bir ilke aramalarıdır; birbirinin bütün ayrıntılarını kabul etmeleri değildir."
        ]
      },
      {
        "title": "Çokçu açıklamalar",
        "paragraphs": [
          "Empedokles ateş, hava, su ve toprağı kökler olarak ele alır; birleşme ve ayrılmayı sevgi ile nefret güçleri üzerinden açıklar. Anaksagoras çok sayıdaki öğenin düzenlenmesinde nous kavramını kullanır. Bu yaklaşımlar görülen çeşitliliği tek bir belirli maddeye indirgemeden açıklamaya yönelir.",
          "Köklerin kendisi ile onları birleştiren veya düzenleyen ilkeyi ayrı tut. Sevgi sözcüğü burada yalnız iki kişinin duygusu değildir; doğadaki birleşmenin açıklamasında iş görür. Nous da yalnız bir insanın günlük düşüncesi diye okunmamalıdır. Kavramın öğretideki açıklama görevini belirlemek doğru karşılaştırmayı sağlar."
        ]
      },
      {
        "title": "Demokritos: atom ve boşluk",
        "paragraphs": [
          "Demokritos’un atomcu açıklamasında bölünmez temel parçalar ve onların hareket edebildiği boşluk önem taşır. Görülen değişim parçaların düzen ve birleşimlerindeki farklarla açıklanır. Bu görüş, çokluğu açıklarken temel parçaların korunması ile bileşimlerin değişmesini birlikte düşünür.",
          "Buradaki atom, modern laboratuvarlarla geliştirilmiş atom kuramının bütün ayrıntıları değildir. Aynı sözcüğün tarihsel kullanımını bugünkü deneysel modele eşitleme. Pasajda parçaların konumu, biçimi ve birleşimi açıklamanın temeliyse atomcu yaklaşımı tanıyabilirsin; bu, düşünürün modern fiziği deneyle kurduğu anlamına gelmez."
        ]
      },
      {
        "title": "Herakleitos: değişim ve logos",
        "paragraphs": [
          "Herakleitos değişimi ve karşıtların ilişkisini vurgular. Ateş değişimin simgesi ve temel açıklama öğesi olarak ele alınır; logos ise bu değişimin başıboş bir karmaşa olmadığını düşünmeye yardım eder. Değişim ile düzenin aynı görüşte birlikte bulunabileceğini görmek önemlidir.",
          "“Her şey değişir.” ifadesini hiçbir ilişki veya düzen düşünülemez diye genişletme. Bir ırmak örneği süreklilik içinde değişmeyi düşündürebilir; karşıtlıklar da dünyanın işleyişinde ilişki kurar. Soruda değişim ile akla uygun düzen birlikte veriliyorsa yalnız düzensizlik diyen seçenek metni karşılamaz."
        ]
      },
      {
        "title": "Parmenides: varlık ve düşünme",
        "paragraphs": [
          "Parmenides varlığın birliği ve değişmezliği üzerinde durur; yokluktan varlık çıkması veya varlığın yok olması düşüncesini sorgular. Duyuların gösterdiği oluş ile aklın zorunlu gördüğü varlık arasında gerilim belirir. Problem yalnız gözlenen hareketi saymak değil, değişimin nasıl düşünülebileceğidir.",
          "Herakleitos ile karşılaştırırken değişimin temel gerçeklik oluşu ile değişmez varlığın akılla kavranışı ayrımını kur. Kaynakların karşıt görüşler olarak yan yana vermesi, mutlaka birinin tarihsel olarak diğerine cevap yazdığını kanıtlamaz. Mantıksal karşılaştırma ile belgeli etkileşim iddiası farklıdır."
        ]
      },
      {
        "title": "Lao Tzu ve Tao",
        "paragraphs": [
          "Lao Tzu ile ilişkilendirilen Tao düşüncesi varlığın ve yaşamın akışını anlamada yol kavramını öne çıkarır. Zorlama ve yapay müdahale yerine doğal akışla uyum düşüncesi önemlidir. Buradaki kavramları yalnız Batı felsefesindeki bir başlığın eksik karşılığı gibi okumamak gerekir.",
          "Tao’yu mutlak anlamda hiçbir şey yoktur savına indirgemek yanıltıcıdır. Söylenebilir olanın sınırı, adlandırma ve doğal düzenle ilişki gibi sorunları kendi bağlamında düşün. Farklı gelenekleri karşılaştırmak yararlıdır; fakat kelimeleri tek bir etiket altında eşitlemek görüşün olumlu içeriğini kaybettirebilir."
        ]
      },
      {
        "title": "Sofistler ve insana yöneliş",
        "paragraphs": [
          "Sofistler insan, dil, eğitim, hukuk ve toplumsal yaşam üzerine tartışmalarıyla öne çıkar. İkna etme ve yurttaşlık yaşamındaki beceriler önemli bir bağlam oluşturur. Sofist başlığı birden çok düşünürü kapsar; hepsinin aynı savı aynı güçte savunduğunu baştan kabul etmemek gerekir.",
          "Doğa için ortak bir ilke arayan sorudan insanın yargı ve ölçülerine yönelen soruya geçişi fark et. Bu değişim doğa hakkında artık hiç düşünülmediği anlamına gelmez. Bir pasajın hangi problemi merkeze aldığı, tarihsel başlığı ezberlemekten daha açıklayıcıdır."
        ]
      },
      {
        "title": "Protagoras ve Gorgias’ın ayrı savları",
        "paragraphs": [
          "Protagoras’ın insanı ölçü sayan yaklaşımı yargıların insana ve koşullara göre değişmesi bağlamında tartışılır. Gorgias’a atfedilen varlık, bilme ve bildirme üzerine üçlü sav ise bu üç düzeyi birbirinden ayırarak radikal sorular yöneltir. İki düşünürün adı aynı başlıkta geçse de savlarının işlevi farklıdır.",
          "Bir görüşün bilinebilirlik hakkında olması onun mutlaka varlığı reddettiğini göstermez. Gorgias’ın atfedilen savını okurken var mı, bilinir mi, başkasına aktarılır mı sorularını sırayla ayır. Protagoras’ın göreceli ölçü vurgusunu da bütün sofistler hiçbir şeye inanmaz diye genişletme."
        ]
      },
      {
        "title": "Sokrates: tanım ve sorgulama",
        "paragraphs": [
          "Sokrates adalet, cesaret ve erdem gibi kavramların ne olduğunu soru-cevap yoluyla araştırır. Tek bir örnek vermenin genel tanımı tamamlamayacağını gösterir; önerilen tanımı başka durumlarda sınar. Sorgulama kişinin yalnız ezberlediği cevabı değil, onu hangi gerekçeyle savunduğunu görünür kılar.",
          "Sokratik ironi, karşıdakinin bildiğini sandığı şeydeki güçlüğü fark etmesine yardım edebilir; doğurtma ise düşüncenin sorularla açığa çıkmasıyla ilişkilidir. Bu yöntem alay ederek kişiyi küçük düşürme olarak anlaşılmamalıdır. Amaç, kavram ve gerekçeyi daha tutarlı kurmaktır."
        ]
      },
      {
        "title": "Sokrates: bilgi ve erdem",
        "paragraphs": [
          "Sokrates’in ahlak anlayışında iyiyi bilmek ile iyi eylem arasındaki ilişki belirgindir. Kötülük bilgisizlikle açıklanabilir; kişinin neyin gerçekten iyi olduğunu anlaması yaşamını dönüştürecek bir iş olarak görülür. Buradaki bilgi yalnız birkaç cümleyi ezberlemek değildir.",
          "Bu görüşü anlamak, bütün çağdaş ahlak psikolojisi tartışmalarının çözüldüğünü söylemek değildir. Dersin görevi bilgi-erdem bağının Sokrates’te hangi rolü oynadığını göstermek ve başka açıklamalarla karşılaştırmaktır. Platon’un bütün ayrıntılı idealar öğretisini de doğrudan Sokrates’in kesin sözü diye aktarma."
        ]
      },
      {
        "title": "Platon: idea ve duyusal nesne",
        "paragraphs": [
          "Platon’da değişen duyusal nesneler ile değişmeyen idealar arasında ayrım kurulur. İdea yalnız kişinin zihnine anlık gelen bir düşünce değildir; bilginin değişmez nesnesi olarak ele alınır. Duyusal bir güzel nesne değişse de güzelliğin ne olduğu sorusu tek nesnenin ömrüyle sınırlanmaz.",
          "Bu ayrım bilgi problemine de bağlanır: değişen görünüşe ilişkin kanaat ile akılla kavranan değişmeze ilişkin bilgi aynı düzeyde görülmez. Bir nesnenin yok olması, ideal olanın da aynı biçimde yok olması diye düşünülmez. Varlık görüşüyle bilgi görüşü arasındaki bu bağı birlikte kur."
        ]
      },
      {
        "title": "Mağara benzetmesini adım adım oku",
        "paragraphs": [
          "Mağaradaki insanlar önlerindeki gölgeleri gerçekliğin bütünü sanabilir. Zincirden kurtulup gölgenin kaynağına ve sonra dışarıya yönelmek, alışılmış görünüşten daha kapsamlı kavrayışa geçişi anlatır. Güneş ve aydınlanma, iyi ideası ve bilginin koşullarıyla ilişkili olarak yorumlanır.",
          "Benzetme fiziksel bir deneyin idealar dünyasını ispatlaması değildir. Şekilde gölge, taşınan nesne ve dışarıdaki görünümü ayrı görmek, Platon’un bilgi düzeylerini anlamaya yardım eder. Modelin çizgilerini metafizik bir ölçüm gibi okumadan, benzetmenin hangi düşünsel ayrımı görünür kıldığını açıkla."
        ]
      },
      {
        "title": "Platon: iyi yaşam ve düzen",
        "paragraphs": [
          "Platon bireyin ruhundaki düzen ile toplumdaki düzen arasında ilişkiler kurar. Bilgelik ve iyiye ilişkin bilgi, yönetime ilişkin düşüncesinde önemli yer tutar. Adalet, parçaların görevleri ve bütünün uyumuyla bağlantılı olarak tartışılır; yalnız aynı nesneden herkese eşit sayıda vermeye indirgenmez.",
          "Bu görüşün tarihsel çözümünü anlamak, çağdaş bir düzen için otomatik onay vermek değildir. Önerinin dayandığı insan ve bilgi anlayışını kurduktan sonra eleştirilebilir yönlerini tartışabilirsin. Sanat, eğitim, bilgi ve siyaset konularının aynı sistemde neden ilişkilendirildiğini görmek temel öğrenme hedefidir."
        ]
      },
      {
        "title": "Aristoteles: madde, form ve oluş",
        "paragraphs": [
          "Aristoteles duyusal tekil varlıkların madde ve form birlikteliğiyle anlaşılmasını savunur. Form yalnız nesnenin dış çizgisi değil, onu o tür varlık yapan düzen ve belirlenimle ilişkilidir. Potansiyel ile aktüel ayrımı da oluşu, mümkün olanın belirli koşullarda gerçekleşmesi olarak düşünmeye yardım eder.",
          "Tohumun ağaç olma imkânı ile yetişmiş ağaç aynı durum değildir. Ancak her imkânın her koşulda gerçekleşeceği sonucu çıkmaz; uygun süreç ve koşullar gerekir. Platon’dan farkı yalnız duyuları kullanmak değildir; formun tekil nesneyle ilişkisini nasıl kurduğunu açıklamak gerekir."
        ]
      },
      {
        "title": "Dört neden ve bilme",
        "paragraphs": [
          "Aristoteles’in dört neden açıklamasında maddi, formel, fail ve ereksel neden ayrılır. Bir heykelde kullanılan malzeme, biçim, yapan kişi ve yapılma amacı farklı sorulara cevap verir. Neden sözcüğü burada yalnız zamanda önce gelen itici olay anlamında kullanılmaz.",
          "Bir örnekte hangi sorunun sorulduğunu belirle: Neyden yapıldı, onu bu eser yapan düzen nedir, kim yaptı, ne için yapıldı? Duyusal gözlem tekilleri tanımaya, akıl ise onların ilişkilerini ve genel olanı kavramaya katkı sunar. Aristoteles’i yalnız duyular doğrudur ve akıl gereksizdir diye özetleme."
        ]
      },
      {
        "title": "Erdem, orta ve ortak yaşam",
        "paragraphs": [
          "Aristoteles’te erdem alışkanlık ve akıllı seçimle ilişkilidir; orta, koşula ve kişiye uygun olanı belirlemekle anlaşılır. Cesaret korkaklıkla ölçüsüz atılganlık arasında düşünülebilir. Bu orta her durumda iki sayıyı toplayıp ikiye bölmek değildir; bazı eylemler için böyle bir orta aramak da uygun değildir.",
          "İnsan toplumsal-siyasal bir varlık olarak ortak yaşam içinde gelişir. Konfüçyüs’ün kendini yetiştirme ve ilişkilerde erdem vurgusu ile Epiktetos’un denetimimizde olanla olmayanı ayırması da iyi yaşam sorusuna başka yaklaşımlar sunar. Bu görüşleri aynılaştırmadan, insanın eylemini hangi ölçüte göre düzenlediğini göster."
        ]
      },
      {
        "title": "Platon: episteme, doxa ve hatırlama",
        "paragraphs": [
          "Platon’da doxa değişen duyusal görünüşe bağlı kanaat, episteme ise değişmeyen olana ilişkin bilgiyle bağlantılıdır. Bu ayrım hangi nesnenin hangi yolla bilinebileceği sorusuna dayanır. Bir görünüşe alışmış olmak, onun hakkında değişmez ve gerekçeli bilgiye sahip olmakla aynı tutulmaz.",
          "Hatırlama öğretisi ruhun bilgiyle ilişkisini açıklayan felsefi bir görüştür; sıradan bir sınav bilgisini önceki gün okuduğunu anımsamaktan farklıdır. İdeaların akılla kavranmasıyla ilişkilendirilir. Öğretiyi öğrenmek, onun modern psikolojide deneyle doğrulanmış bir hafıza modeli olduğunu ileri sürmek değildir."
        ]
      },
      {
        "title": "Konfüçyüs: kendini yetiştirme ve ilişkiler",
        "paragraphs": [
          "Konfüçyüs’ün erdem anlayışında kişinin kendini geliştirmesi ile toplumsal ilişkilerdeki davranışları birbirine bağlıdır. Saygı, içtenlik, bağlılık ve ölçülü davranma yalnız başkasının görmesi için sergilenen dış görünüşler olarak ele alınmaz. İyi yaşam, ilişkiler içinde sürdürülen bir yetişme süreciyle düşünülür.",
          "Bir kişi saygılı görünürken bütünüyle başka niyet taşıyorsa dış hareket ile içtenlik arasındaki fark tartışılabilir. Bu yaklaşımı her ilişki ve tarihsel koşul için tek bir davranış listesine indirgeme. Öğretideki temel soruyu, insanın kendisini hangi erdemlerle ve hangi ilişkiler içinde geliştireceğini açık tut."
        ]
      },
      {
        "title": "Epiktetos: denetim alanını ayır",
        "paragraphs": [
          "Epiktetos’un Stoa çizgisinde kendi yargı ve tutumlarımızla doğrudan denetimimizde olmayan dış koşullar arasında ayrım önemlidir. Bir olayın meydana gelmesini her zaman seçemeyebiliriz; fakat ona ilişkin değerlendirmemiz üzerine düşünmek mümkündür. Bu ayrım iyi yaşamı dış başarıların tamamına bağımlı kılmamaya yönelir.",
          "Denetim ayrımı hiçbir eylemde bulunma veya hiçbir sorunu değiştirmeye çalışma buyruğu değildir. Önce hangi şeyin hangi ölçüde seçimine bağlı olduğunu araştırmayı sağlar. Bir başkasının davranışını tamamen yönetememek ile kendi kararını gözden geçirememek aynı durum değildir. Metindeki sorumluluk alanını bu farkla belirle."
        ]
      }
    ],
    "examples": [
      {
        "title": "Arkhenin niteliği",
        "prompt": "A düşünürü suyu temel kabul ediyor; B düşünürü belirli bir madde yerine sınırsız-belirsiz ilkeyi öneriyor; C düşünürü hava ve yoğunlaşmayı vurguluyor. Kimlerle eşleştirilir?",
        "strategy": "Üç görüşün aynı soruya farklı türden cevap verdiğini belirle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Su vurgusu Thales ile, sınırsız-belirsiz apeiron vurgusu Anaksimandros ile ilişkilidir."
          },
          {
            "label": "2. adım",
            "explanation": "Hava ve yoğunlaşma-seyrekleşme açıklaması Anaksimenes’i öne çıkarır."
          },
          {
            "label": "3. adım",
            "explanation": "Üç adın ortaklığını arkhe arayışı, farkını temel ilkenin niteliği olarak açıkla."
          }
        ],
        "answer": "A: Thales; B: Anaksimandros; C: Anaksimenes.",
        "check": "Özellikle apeironu belirli bir gözlenebilir maddeyle eşitlemediğini kontrol et.",
        "pitfall": "Bu görüşleri modern kimyanın deneyle doğrulanmış element kuramı diye sunma."
      },
      {
        "title": "Sokratik tanımı sınama",
        "prompt": "Bir kişi cesareti her tehlikeye düşünmeden atılmak diye tanımlıyor. Sokratesçi sorgulamada, düşüncesizce girilen bir tehlikenin bazen gereksiz zarar verdiği örneği sunuluyor. Bu örnek ne işe yarar?",
        "strategy": "Örneğin tanımın hangi parçasını zorladığını bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Tanım bütün düşüncesiz tehlikeye atılmaları cesaret sayıyor."
          },
          {
            "label": "2. adım",
            "explanation": "Verilen örnek bu kapsam içinde ama erdem olarak cesaret diye kabul edilmesi güç bir durum gösteriyor."
          },
          {
            "label": "3. adım",
            "explanation": "Tanımın kapsamı ve akıllı seçimle ilişkisi yeniden düşünülmelidir; amaç yalnız kişinin adını ezberletmek değildir."
          }
        ],
        "answer": "Tanımı karşı örnekle sınar ve geliştirme ihtiyacını gösterir.",
        "check": "Örnek aynı kavramı ve tanımın kapsadığı bir durumu hedefliyor mu diye denetle.",
        "pitfall": "Sorgulamayı karşıdakini küçük düşürmenin tekniği olarak yorumlama."
      },
      {
        "title": "Dört nedeni ayır",
        "prompt": "Bir heykel bronzdan, bir sanatçının çalışmasıyla, belirli bir figür biçiminde ve anma amacıyla yapılmıştır. Dört neden nasıl eşleştirilir?",
        "strategy": "Neyden, hangi biçimle, kim tarafından ve ne için sorularını ayrı sor.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Bronz maddi nedendir; figürün belirli düzeni formel neden olarak açıklanır."
          },
          {
            "label": "2. adım",
            "explanation": "Heykeltıraş fail neden, anma amacı ise ereksel neden olarak iş görür."
          },
          {
            "label": "3. adım",
            "explanation": "Neden sözcüğünü yalnız önce gelen olay anlamına daraltmadan dört farklı açıklama sorusunu göster."
          }
        ],
        "answer": "Madde: bronz; form: figür; fail: sanatçı; erek: anma.",
        "check": "Anma amacını kullanılan malzemeyle karıştırmadığını kontrol et.",
        "pitfall": "Formu her bağlamda yalnız dış çizgiye indirgeyerek varlık öğretisini basitleştirme."
      },
      {
        "title": "Mağaranın yorumunu kur",
        "prompt": "Platon’un benzetmesinde kişi önce gölgeleri, sonra onları oluşturan taşınan nesneleri, ardından dışarıdaki dünyayı fark eder. Bu sıra neyi öğretmek için kullanılır?",
        "strategy": "Fiziksel görünen sırayı felsefi yorumundan ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Gölgeyi gerçekliğin bütünü sanmak alışılmış görünüşe bağlılığı temsil eder."
          },
          {
            "label": "2. adım",
            "explanation": "Kaynağa ve dışarıya yönelmek daha kapsamlı kavrayışa geçiş olarak yorumlanır."
          },
          {
            "label": "3. adım",
            "explanation": "Bu benzetmeyi bilginin eğitimle dönüşümünü açıklayan bir temsil olarak oku; çizimin metafiziği deneyle ispatladığını söyleme."
          }
        ],
        "answer": "Görünüşe bağlı kanaatten daha kapsamlı kavrayışa yönelişi temsil eder.",
        "check": "Modelde nesne ve gölgenin farklı kutular olması hangi ayrımı görünür kılıyor, açıkla.",
        "pitfall": "Fiziksel çizimin tek başına idealar öğretisini bilimsel olarak doğruladığını iddia etme."
      }
    ],
    "recall": [
      {
        "prompt": "Arkhe sorusu hangi ortak arayışa yönelir?",
        "answer": "Çokluk ve değişimin temelindeki ilk ilke veya kaynağı açıklamaya."
      },
      {
        "prompt": "Sokrates’in tanım sorgulamasında örnek ne yapabilir?",
        "answer": "Önerilen tanımın kapsamını karşı örnekle sınayıp daha tutarlı bir tanım aramayı sağlar."
      },
      {
        "prompt": "Platon’da idea anlık özel düşünce midir?",
        "answer": "Hayır; değişmeyen, bilginin nesnesi olarak ele alınan ideal olandır."
      },
      {
        "prompt": "Aristoteles’in dört nedenini say.",
        "answer": "Maddi, formel, fail ve ereksel neden; neyden, hangi düzenle, kim tarafından, ne için sorularına karşılık gelir."
      }
    ],
    "source": "Aurelia TYT Felsefe 007–012 kopya kâğıtları; MEBİ TYT-AYT Felsefe ilgili konu özetleri; OGM siyaset-sanat-din, Orta Çağ, Sokrates-Sofistler/Platon-Aristoteles ve felsefi metin analizi kaynaklarıyla karşılaştırılarak yazılmış özgün anlatım. Kavramlar, görüşlerin dayanakları ve sınırları birlikte açıklanır; uygulama soruları resmî sınav sorusu değildir."
  },
  {
    "id": "orta-cag-felsefesi",
    "title": "Orta Çağ felsefesi: inanç, akıl ve tümeller",
    "minutes": 110,
    "objectives": [
      "Hristiyan ve İslam düşüncesindeki farklı problem ve yöntemleri ayır.",
      "İnanç-akıl ilişkisini tek bir tarihsel kalıba indirgemeden karşılaştır.",
      "Tümeller, kötülük, yaratılış ve irade problemlerinde argümanları kur.",
      "Çeviri ve kültürler arası etkileşimin düşüncenin gelişimindeki rolünü açıkla."
    ],
    "sections": [
      {
        "title": "Dönem adının sınırları",
        "paragraphs": [
          "Ders kaynaklarında MS 2–15. yüzyıl düşüncesi genel bir dönem başlığıyla incelenir. Bu yaklaşık sınır bütün coğrafyalarda aynı anda aynı görüşün egemen olduğu anlamına gelmez. Hristiyan ve İslam düşünce gelenekleri, farklı diller ve kültürlerle etkileşim içinde kendi tartışmalarını geliştirmiştir.",
          "Dönemi yalnız aklın hiç kullanılmadığı çağ diye açıklamak, mantık, çeviri, varlık ve bilgi tartışmalarını görünmez kılar. İnanç önemli bir bağlamdır; fakat düşünürlerin akla verdiği rol aynı değildir. Önce belirli düşünürün hangi problemi nasıl ele aldığını öğren, sonra tarihsel ortaklıkları karşılaştır."
        ]
      },
      {
        "title": "Patristik ve skolastik ayrımı",
        "paragraphs": [
          "Patristik dönem erken Hristiyan düşüncesinin savunulması, açıklanması ve kavramsal kuruluşuyla ilişkilidir; kaynaklarda yaklaşık 2–8. yüzyıllar olarak verilir. Skolastik dönem ise okul geleneği içinde inanç ile aklın daha sistemli ele alınışıyla ilişkilendirilir; yaklaşık 8–15. yüzyıl sınırı kullanılır. Bu erken dönemin savunma çalışmalarında apoloji terimi kullanılır: genel olarak savunma amaçlı konuşmayı, bu bağlamda ise Hristiyan inancının belirli suçlamalara karşı savunulmasını ifade eder.",
          "Bunlar öğretimi kolaylaştıran dönemlemelerdir; bütün metinlerin tek bir tarihte birden değiştiğini göstermez. Erken dönemde Platoncu, sonraki tartışmalarda Aristotelesçi etkiler önem kazanabilir; fakat her düşünürü yalnız bir etki etiketiyle açıklamak yetersizdir. Soruda hangi görüş ve yöntemin verildiğine bak."
        ]
      },
      {
        "title": "İnanç ve aklın farklı ilişkileri",
        "paragraphs": [
          "Bazı yaklaşımlar inancı anlamanın ön koşulu olarak öne çıkarır; bazıları akılla inancın uyumunu kurmaya çalışır; bazıları ise aklın ulaşabileceği alanı sınırlar. Aynı Tanrı veya yaratılış konusu bu farklı yöntemlerle ele alınabilir. İnanç-akıl problemi yalnız iki sözcüğün hangisinin önce yazıldığı değildir.",
          "Tertullianus’a bağlanan kısa sloganların tarihsel aktarımı tartışmalı olabilir; bunları kesin ve bütün görüşünü tüketen alıntılar gibi kullanma. Augustinus, Anselmus ve Aquinolu Thomas gibi isimlerdeki gerekçelendirme tarzlarını ayrı incele. Bir düşünürün inanca önem vermesi, hiçbir mantıksal tartışma yapmadığı sonucunu vermez."
        ]
      },
      {
        "title": "Augustinus: aydınlanma ve içe yöneliş",
        "paragraphs": [
          "Augustinus’un bilgi anlayışında insanın kendine yönelişi, değişmeyen doğrular ve tanrısal aydınlanma önem taşır. Duyuların değişkenliği karşısında kesinliğin hangi temele dayanacağı sorulur. Bilme, yalnız dışarıdaki nesneleri toplamak değil hakikate yönelmenin koşullarını düşünmektir.",
          "Bu görüşü bilimsel bir ışık kaynağının sinir sistemine yaptığı etki gibi fiziksel modele indirgeme. Aydınlanma kavramı bilgi ile Tanrı arasındaki ilişkiyi açıklayan düşünsel bir işlev taşır. Pasajda kesinliğin kaynağı soruluyorsa onu yalnız evrenin maddi başlangıcı tartışmasıyla karıştırma."
        ]
      },
      {
        "title": "Kötülük ve eksiklik",
        "paragraphs": [
          "Augustinusçu yaklaşımda kötülük iyilikle eş düzeyde bağımsız bir töz olarak değil, iyinin eksilmesi veya bozulmasıyla açıklanır. Körlük örneğinde görme yetisinin yoksunluğu düşünülür; gözün yanında körlük maddesi bulunması gerekmez. Bu açıklama kötülüğün varlık statüsünü tartışır.",
          "Özgür irade de ahlaki kötülüğün açıklanmasında rol oynar. Bunun bütün doğal acı sorunlarını tek başına çözdüğünü varsayma. Önce verilen cevabın hangi kötülük türünü ve hangi soruyu hedeflediğini belirle. Mantıksal bağdaşabilirlik sorusu ile yaşanan acının ağırlığına ilişkin itiraz aynı düzeyde değildir."
        ]
      },
      {
        "title": "Anselmus ve kavramdan varlığa",
        "paragraphs": [
          "Anselmus’un ontolojik argümanı kendisinden daha yetkini düşünülemeyen varlık kavramından hareket eder. Bu kavramın yalnız zihinde bulunmasının yeterli olup olmadığı sorgulanır. Başlangıçta gözlenen evrenin bir olay dizisi değil kavramın nasıl düşünüldüğü öne çıkar.",
          "Bu yüzden argümanı kozmolojik diye adlandırmak başlangıç noktasını kaçırır. Yapıyı doğru tanımak, eleştirilerin bittiğini veya sonucun herkesçe kabul edildiğini söylemek değildir. Bir kavramın düşünülmesi ile o kavramın dış dünyada örneğinin bulunması arasındaki geçiş özellikle tartışmaya açıktır."
        ]
      },
      {
        "title": "Thomas: aklın alanı ve sınırı",
        "paragraphs": [
          "Aquinolu Thomas, akıl ile inancı birbirine bütünüyle düşman iki alan olarak kurmaz. Bazı Tanrı bilgilerine aklın ulaşabileceğini savunurken bazı inanç sırlarının vahiy ile kabul edildiğini düşünür. Bu ayrımda aynı hakikatin çelişmezliği ve yöntemlerin farklılığı birlikte ele alınır.",
          "Hareket, neden ve mümkün varlık gibi başlangıçlar Tanrı’nın varlığına ilişkin akıl yürütmelerde kullanılır. Varlıkların bağımlılığı hakkında bir argümanı, evrenin geçmişte belirli bir tarihte başladığının bilimsel ispatı diye sunma. Zamansal başlangıç ile varlığın ontolojik dayanağı farklı sorunlardır."
        ]
      },
      {
        "title": "Tümel nedir?",
        "paragraphs": [
          "Birbirinden farklı iki insan için insan sözcüğünü kullanabiliriz. Tekil olan belirli kişi, tümel ise birçok tekil için söylenebilen genel olandır. Tümeller probleminde bu ortaklığın nasıl bir varlık veya düşünce statüsüne sahip olduğu araştırılır; bütün evrenin maddesi sorulmuyor olabilir.",
          "Önce aynı türden tekilleri ve onlar için kullanılan genel kavramı ayır. Ardından ortak olan tekillerden bağımsız mı, onların içinde bir yapı olarak mı, zihinsel bir kavram olarak mı yoksa ortak ad olarak mı düşünülüyor diye sor. Tanım farkını somut iki örnek üzerinden kurmak soyut etiket ezberinden daha açıklayıcıdır."
        ]
      },
      {
        "title": "Gerçekçilik ve ılımlı gerçekçilik",
        "paragraphs": [
          "Tümellerin tekillerden bağımsız bir gerçekliğe sahip olduğunu savunan güçlü gerçekçilik, Platoncu örnekle ilişkilendirilebilir. Ilımlı gerçekçilikte ise ortak form veya doğa tekil varlıklarla ilişkili olarak ele alınır; tümel tekil şeylerden tamamen ayrı bir yerde duran nesne sayılmaz. Ders kaynakları Augustinus ve Anselmus’u güçlü gerçekçi çizgiyle, Aquinolu Thomas’ı ise tekilde ortak doğa vurgusuyla ilişkilendirir; ad eşleştirmesini bu tanım farkıyla birlikte öğren.",
          "Bu iki yaklaşımın ikisi de ortaklığı yalnız rastgele ses olarak açıklamaz; fakat ortak olanın tekillerle ilişkisini farklı kurar. Aynı iki ağacı gösteren bir şemada bağımsız tür kutusu ile her ağaçta örneklenen yapı farklı oklarla gösterilebilir. Şema felsefi görüşü temsil eder, görüşün doğruluğunu ölçmez."
        ]
      },
      {
        "title": "Kavramcılık ve adcılık",
        "paragraphs": [
          "Kavramcılıkta tümelin zihinsel kavram olarak statüsü öne çıkar. Adcılıkta tekiller dışında ayrı bir tümel varlık kabul etmeden ortak ad veya dil kullanımına vurgu yapılır. Bu iki yaklaşım da bağımsız idealar görüşünden ayrılabilir; fakat zihin içeriği ile adın işlevi aynı açıklama değildir. Ockhamlı William, tekillerden ayrı evrensel varlıkları reddeden adcı çizginin bilinen örneğidir. Bu, genel kavram ve göstergelerin kullanılabildiğini inkâr ettiği anlamına gelmez.",
          "Bazı ders tabloları tekil varlıklarda bulunan ortak doğa görüşünü kavramcılık adı altında verebilir. Öğrenirken etiketten önce açık tanımı oku: tekilde form vurgusu ılımlı gerçekçilik, zihinsel kavram vurgusu kavramcılık ayrımıyla daha kesin gösterilebilir. Soruda verilen tanımı esas al; yanlış bir eşleştirmeyi bütün tartışmanın özü diye ezberleme."
        ]
      },
      {
        "title": "Çeviri ve kültürler arası etkileşim",
        "paragraphs": [
          "Yunanca, Süryanice, Arapça ve Latince arasında gerçekleşen çeviriler düşünce mirasının farklı merkezlerde okunmasına katkı sağladı. Özellikle 8–12. yüzyıllardaki çalışmalar mantık, doğa, tıp ve metafizik tartışmalarını geliştirdi. Çeviri yalnız kelime aktarma değil kavramları yeni bağlamda yorumlama süreciydi.",
          "Bu hareketi tek bir kişinin tek bir tarihte bütün felsefeyi taşıdığı efsanesine indirgeme. Daha erken ve daha geç aktarımlar da vardır; farklı din ve dillerden bilginler katkı sundu. Etkileşim, yeni düşünürlerin yalnız kopyacı olduğu anlamına gelmez; alınan metinler eleştirildi, dönüştürüldü ve yeni problemlerle ilişkilendirildi."
        ]
      },
      {
        "title": "El Kindî ve hudûs",
        "paragraphs": [
          "El Kindî ile ilişkilendirilen hudûs yaklaşımı evrenin sonradan oluşu üzerinden bir var ediciye ulaşmayı amaçlar. Argümanda başlangıç, sonradan olan ve neden arasındaki geçiş önemlidir. Bu görüşün hangi öncüllerle kurulduğunu göstermek yalnız düşünür adı söylemekten daha kapsamlıdır.",
          "Argümanı tanımak, modern kozmolojinin bütün modellerinin onu kesin biçimde doğruladığı anlamına gelmez. Zamansal sonluluk için sunulan dayanak ile sonuçta varılan yaratıcı kavramının niteliklerini ayrı incele. Evrenin başlangıcı olduğunu varsaymak, onun zorunlu olarak belli bir gün sona ereceğini tek başına göstermez."
        ]
      },
      {
        "title": "Fârâbî: varlık düzeni ve erdemli şehir",
        "paragraphs": [
          "Fârâbî’nin varlık anlayışında ilk neden ve ondan çıkan varlık düzeni, siyaset anlayışında ise insanların yetkinlik ve mutluluk için bir arada oluşu önemlidir. Erdemli şehir, ortak yaşamın hangi amaç doğrultusunda düzenlenmesi gerektiği sorusuna cevap arar. Bilgi ile siyaset birbirinden kopuk iki liste değildir.",
          "Sudûr öğretisini zamanda sırayla üretilen basit fabrika parçaları gibi okumamak gerekir. Erdemli şehir de yalnız fiziksel binaların temizliği anlamına gelmez; yöneticinin bilgisi ve ortak amaç tartışılır. Bir pasajda hangi düzeyin, varlık düzeninin mi yoksa toplumsal amacın mı anlatıldığını belirle."
        ]
      },
      {
        "title": "İbn Sînâ: mümkün ve zorunlu varlık",
        "paragraphs": [
          "İbn Sînâ mümkün varlığın var olmak için bir dayanağa ihtiyaç duyması ile zorunlu varlığın kendisi bakımından var olmaması düşünülemeyen statüsünü ayırır. Bir şeyin bugün var olması, onun kendi özü gereği zorunlu olduğu anlamına gelmez. Problem varlığın hangi temelle açıklanacağıdır.",
          "Bu ayrımı yalnız geçmişteki ilk ana ilişkin bir takvim sorusuna indirgeme. Mümkün varlık şu anda da kendi başına zorunlu değildir. İbn Sînâ’nın Hayy bin Yakzan adlı sembolik metni ile İbn Tufeyl’in aynı adla bilinen ayrı eserini de birbirinin yerine kullanma; ad benzerliği yazar ve içeriği eşitlemez."
        ]
      },
      {
        "title": "Gazzâlî ve İbn Rüşd",
        "paragraphs": [
          "Gazzâlî bazı filozofların metafizik savlarını eleştirerek aklın sınırları, nedensellik ve kesinlik sorunlarını tartışır. Bu eleştiriyi bütün mantık veya bilim çalışmalarının her biçimini reddetme diye genellemek yanıltıcıdır. Hangi savın hangi gerekçeyle eleştirildiğini ayrı göstermek gerekir.",
          "İbn Rüşd felsefi akıl yürütme ile vahyin doğru anlaşılması arasında uyum kurmaya çalışır; yorum ve yeterli bilgi önem taşır. İki karşıt yargı aynı anlamda aynı anda doğrudur diye basit bir çifte doğruluk öğretisi atfetme. Tartışmanın merkezinde hangi yöntemin hangi koşulda kullanılacağı bulunur."
        ]
      },
      {
        "title": "Özgür irade tartışmasının çeşitliliği",
        "paragraphs": [
          "İnsanın sorumluluğu ile tanrısal kudretin ilişkisi kelam ekollerinde farklı açıklanır. Bu ders düzeyindeki karşılaştırmada Mu‘tezile, insana verilen özgür iradeyi ve eyleminden sorumlu oluşunu güçlü biçimde öne çıkarır. Cebriyye ise insanın özgür iradesini kabul etmeyen zorunluluk çizgisidir. Eş‘arî yaklaşım insanın seçimi ve kesbi, yani fiili kazanması ile fiilin ilahi yaratılışını ayrı ele alır; insanın iradesi mutlak ve bağımsız sayılmaz.",
          "Mâtürîdî yaklaşımda insanın seçiminde aklın ve iradenin rolü vurgulanır; insan iradesi tanrısal iradeden bağımsız sınırsız bir yaratma gücü olarak düşünülmez. Fârâbî de akıl ve irade sahibi insanın seçme ve eyleme özgürlüğünü, bununla birlikte sorumluluğunu öne çıkarır. Aynı sorumluluk sözcüğünü kullanan bütün görüşleri özdeşleştirme: seçimin rolünü ve fiilin nasıl açıklandığını ayrı yaz. Bu özetler ekollerin bütün iç tartışmalarını tek cümlede bitirdiği iddiası değildir."
        ]
      },
      {
        "title": "İbn Haldun: toplumsal yaşam ve devlet",
        "paragraphs": [
          "İbn Haldun insanın ihtiyaçlarını karşılamak için toplumsal yaşama yönelişini, dayanışma ve asabiyet bağlarını, devletin kuruluş ve dönüşümünü inceler. Asabiyet yalnız tek kişinin öfkesi değildir; bir grubun birlikte hareket etme gücüyle ilişkilidir. Toplumsal düzenin tarihsel koşulları araştırılır.",
          "Devletin gelişimini canlıya benzetmek açıklayıcı bir analoji olabilir; bütün devletlerin değişmez biyolojik takvimle aynı gün çökeceğini kanıtlamaz. Bir analojinin hangi benzerliği aydınlattığını ve nerede sınırlı kaldığını göster. İbn Haldun’u yalnız bir isim-dönem eşleştirmesi yerine toplum sorusuna verdiği cevapla öğren."
        ]
      },
      {
        "title": "Sembolik anlatı ve etik dönüşüm",
        "paragraphs": [
          "Mevlânâ, Yunus Emre ve Hacı Bektaş Veli ile ilişkili metinlerde sevgi, insanın kendini tanıması, birlik ve içsel dönüşüm gibi temalar öne çıkar. Semboller doğrudan fiziksel tarif gibi okunmadığında öğretinin insana ve yaşamına yönelen sorusu daha açık görülür. Bir mecazın anlamı bütün sözcüklerin ilk anlamlarının toplamı olmayabilir.",
          "Dört unsurdan söz eden bir etik anlatıyı çağdaş kimyanın element listesi sanma; içe yönelişi de bütün insanların her durumda toplumdan uzaklaşması gereken tek reçete diye genelleme. Metnin amacı, kavramları ve gerekçeleriyle birlikte yorumla. Böylece tarihsel görüşü anlamakla onu bağlamsız bir emir olarak almak ayrılır."
        ]
      },
      {
        "title": "İnanma ve anlama arasındaki yön",
        "paragraphs": [
          "Clemens ve Augustinus gibi düşünürlerde inanç, anlamaya yönelişin başlangıcı olarak önem taşıyabilir; bu, aklın her işlevini ortadan kaldırmaz. Anselmus’ta da inanılanı anlamaya çalışma belirgin bir yönelimdir. Önce inanmak ifadesi yalnız zaman sırası değil düşünsel başlangıç ve yöntem ilişkisi kurabilir.",
          "Bu görüşleri yalnız ezberlenmiş bir sözün kime ait olduğu sorusuna daraltma. İnanç hangi soruyu açıyor, akıl hangi açıklamayı yapabiliyor ve nerede sınır kabul ediliyor diye sor. Tertullianus’un akıl ile inanç arasındaki gerilimi daha güçlü vurgulayan tutumunu da tartışmalı bir sloganı kesin alıntı saymadan bu yöntem farkıyla karşılaştır."
        ]
      },
      {
        "title": "Gazzâlî: kuşku, kesinlik ve içsel kavrayış",
        "paragraphs": [
          "Gazzâlî bilgiye ulaşmada duyu ve aklın güvenilirlik sınırlarını sorgular; kesinliğin neye dayanacağını araştırır. Manevi hakikatin kavranmasında kalp ve sezgiyle ilişkilendirilen içsel kavrayışın önemini vurgular. Bu bilgi anlayışı, maddi bir nesneyi ölçmenin yönteminden farklı bir problem bağlamındadır.",
          "Kalp kavramını burada yalnız kan pompalayan organın teknik ölçümü gibi yorumlama; düşünürün bilme ve manevi yaşantı açıklamasındaki işlevine bak. Aklın sınırını tartışmak ile hiçbir mantıksal yöntemin hiçbir alanda kullanılamayacağını söylemek farklıdır. Eleştiri hangi savı ve hangi kesinlik iddiasını hedefliyorsa kapsamı orada koru."
        ]
      },
      {
        "title": "Eş‘arî örneği: değişimden dayanak sorusuna",
        "paragraphs": [
          "MEBİ’de Eş‘arî ile ilişkilendirilen örnek, insanın doğumdan olgunluğa uzanan değişimini başlangıç yapar. Ardından bu sürecin kendi başına yeterli olmadığı ve bir yaratıcıya muhtaç olduğu ileri sürülür. Akıl yürütmenin gözlenen kısmı insanın değişmesidir; onu yaratıcı sonucuna bağlayan kısım ise değişim ve varlığın dayanağı hakkında ek bir kabuldür. Önce başlangıç gözlemini, sonra bu geçiş ilkesini ve son olarak sonucu ayrı yaz.",
          "Bu örneği öğrenmek, biyolojik büyümenin tek başına bütün yaratıcı niteliklerini bilimsel deneyle ispatladığını söylemek değildir. Düşünürün kullandığı bağımlılık veya neden kabulü ayrıca tartışılabilir. Eş‘arî’nin adı yalnız irade özgürlüğü tartışmasında geçmez; burada farklı bir problem için kullanılır. Aynı düşünürün iki pasajını karşılaştırırken önce birinin eylem ve sorumluluk, diğerinin varlığın dayanağı hakkında olduğunu belirle."
        ]
      }
    ],
    "examples": [
      {
        "title": "Tümelin yerini sor",
        "prompt": "İki tekil ağaç için ortak ağaç kavramı kullanılıyor. A görüşü ortak formu ağaçların içinde, B görüşü genel kavramı zihinde, C görüşü yalnız ortak adı dilde öne çıkarıyor. Ayrım nedir?",
        "strategy": "Tekilleri sabit tutup genel olanın statüsünü karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A görüşünde ortak yapı tekil varlıklarda örneklenir; bu ılımlı gerçekçi vurgudur."
          },
          {
            "label": "2. adım",
            "explanation": "B zihinsel kavramı, C ortak adın işlevini öne çıkarır; kavramcılık ve adcılık farklı dayanaklar sunar."
          },
          {
            "label": "3. adım",
            "explanation": "Ağaçların sayısını değil tümelin hangi statüde kabul edildiğini cevapla."
          }
        ],
        "answer": "A: ılımlı gerçekçilik; B: kavramcılık; C: adcılık.",
        "check": "Zihindeki kavram ile tekildeki formu aynı kutuya koymadığını kontrol et.",
        "pitfall": "Tanım açıkken yalnız kaynak tablosunun karışık etiketine dayanarak yanlış ayrım öğretme."
      },
      {
        "title": "Eksiklik açıklaması",
        "prompt": "Bir düşünür körlüğü gözün yanında bulunan ayrı bir madde değil görme yetisinin yokluğu olarak açıklıyor; kötülüğü de iyinin yoksunluğu diye düşünüyor. Hangi yaklaşım öne çıkar?",
        "strategy": "Benzetmenin bağımsız töz ile yoksunluk ayrımını gösterdiğini bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Körlük burada görme yetisine bağlı bir eksiklik olarak tanımlanır."
          },
          {
            "label": "2. adım",
            "explanation": "Kötülük de iyilikle eş düzeyde bağımsız bir madde veya töz diye kurulmaz."
          },
          {
            "label": "3. adım",
            "explanation": "Bu açıklamayı Augustinusçu yoksunluk yaklaşımıyla ilişkilendir; bütün acı problemlerinin kapanması sonucu ekleme."
          }
        ],
        "answer": "Kötülüğün iyinin eksikliği olarak açıklanması.",
        "check": "Örnekte ayrı bir kötülük maddesi varsayılmadığını kontrol et.",
        "pitfall": "Varlık statüsü açıklamasını her yaşanmış acının önemsizliği diye yorumlama."
      },
      {
        "title": "Mümkün ile zorunlu",
        "prompt": "Bir varlık şu anda vardır; fakat kendi özü bakımından var olmaması da düşünülebilir ve varlığı başka bir dayanağa bağlıdır. İbn Sînâ’nın ayrımında nasıl adlandırılır?",
        "strategy": "Fiilen var olmak ile özü gereği zorunlu olmak arasındaki farkı kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Soruda varlığın bugün bulunduğu verilmiştir; bu tek başına zorunlu varlık demek değildir."
          },
          {
            "label": "2. adım",
            "explanation": "Kendi özü bakımından var olmaması düşünülebilir ve başka dayanağa bağlıdır."
          },
          {
            "label": "3. adım",
            "explanation": "Bu statü mümkün varlıktır; zorunlu varlık ayrımı yalnız geçmişte bir ilk gün bulma sorusuna indirgenmez."
          }
        ],
        "answer": "Mümkün varlık.",
        "check": "Şu anda vardır cümlesini kendi başına varlığı zorunludur cümlesine dönüştürme.",
        "pitfall": "Zamansal başlangıç ile ontolojik dayanak sorusunu tek soru sayma."
      },
      {
        "title": "Akıl eleştirisinin kapsamı",
        "prompt": "Bir metin Gazzâlî’nin bazı metafizik savları eleştirdiğini; İbn Rüşd’ün doğru akıl yürütme ile vahyin doğru yorumunu uzlaştırmaya çalıştığını söylüyor. Hangi genellemeden kaçınmak gerekir?",
        "strategy": "İki görüşün hedeflediği sav ve yöntemi ayrı oku.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Bazı metafizik savların eleştirisi bütün mantık ve bilim etkinliklerinin her biçiminin reddi değildir."
          },
          {
            "label": "2. adım",
            "explanation": "Uyum arayışı da aynı anlamda iki çelişik yargının birlikte doğru sayılması değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Düşünürlerin hangi konuda hangi sınır ve yöntemi savunduğunu belirt; hepsini tek bir akıl karşıtlığına indirme."
          }
        ],
        "answer": "İkisini de bütün aklı reddeden tek bir görüş gibi sunmaktan kaçınılır.",
        "check": "Bazı savlar ifadesinin kapsamını bütün bilim diye büyütmediğini kontrol et.",
        "pitfall": "Tarihsel dinî bağlamı her düşünür için aynı yöntem sonucu olarak kullanma."
      }
    ],
    "recall": [
      {
        "prompt": "Tümeller problemi bütün evrenin maddesini mi sorar?",
        "answer": "Hayır; birçok tekil için söylenen genel olanın varlık ve düşünce statüsünü araştırır."
      },
      {
        "prompt": "Ilımlı gerçekçilik ile kavramcılığın ayrımı nedir?",
        "answer": "İlki tekillerde ortak formu; ikincisi tümelin zihinsel kavram statüsünü öne çıkarır."
      },
      {
        "prompt": "İbn Sînâ’da fiilen var olan her şey zorunlu mudur?",
        "answer": "Hayır; özü bakımından var olmaması düşünülebilen, dayanağa bağlı varlık mümkündür."
      },
      {
        "prompt": "Dönemi tek bir akıl karşıtlığıyla açıklamak niçin yetersizdir?",
        "answer": "İnanç-akıl ilişkisi, yöntem ve sınırlar düşünürler arasında farklı biçimde kurulmuştur."
      }
    ],
    "source": "Aurelia TYT Felsefe 007–012 kopya kâğıtları; MEBİ TYT-AYT Felsefe ilgili konu özetleri; OGM siyaset-sanat-din, Orta Çağ, Sokrates-Sofistler/Platon-Aristoteles ve felsefi metin analizi kaynaklarıyla karşılaştırılarak yazılmış özgün anlatım. Kavramlar, görüşlerin dayanakları ve sınırları birlikte açıklanır; uygulama soruları resmî sınav sorusu değildir."
  }
];

const questionRows021 = [
  [
    {
      "passage": "Bir düşünür “Kendisinden daha yetkini düşünülemeyen varlık kavramını çözümleyerek onun varlığının gerekip gerekmediğini araştırıyorum.” diyor. Başlangıçta evrendeki olayların sırasını gözlemlemiyor.",
      "prompt": "Bu yaklaşım hangi argüman türünün başlangıcını kullanır?",
      "options": [
        "Kozmolojik",
        "Teleolojik",
        "Ontolojik",
        "Ahlaki kötülük argümanı",
        "Tarihsel belge argümanı"
      ],
      "answer": 2,
      "hint": "Düşünürün kavramdan mı olaydan mı başladığını sor.",
      "explanation": "Başlangıç yetkin varlık kavramının çözümlemesidir; bu ontolojik argümanların tipik yönüdür. Evrenin nedeni veya doğadaki düzen burada açık başlangıç olarak verilmemiştir."
    },
    {
      "passage": "Kurgu argüman şöyle kuruluyor: “Sonradan meydana gelen her şey bir nedene ihtiyaç duyar. Evren sonradan meydana gelmiştir. Öyleyse evrenin bir nedeni vardır.”",
      "prompt": "Argümanın yapısı hakkında hangisi doğrudur?",
      "options": [
        "Sonuç nedenin bütün niteliklerini zaten tek tek kanıtlamıştır.",
        "Başlangıç yalnız en yetkin varlık kavramıdır.",
        "Öncüllerdeki sonradan olma ifadesi iyilik tanımıdır.",
        "Argüman doğal kötülüğün hiçbir türü bulunmadığını söyler.",
        "Sonuç neden hakkındadır; nedenin mutlak iyi olduğu için ayrıca gerekçe gerekir."
      ],
      "answer": 4,
      "hint": "Öncüllerde bulunmayan yeni niteliği belirle.",
      "explanation": "Öncüller sonradan olma ile neden arasında ilişki kurar. Verilen sonuç nedenin varlığıyla sınırlıdır; mutlak iyilik gibi yeni bir nitelik bu öncüllerden tek başına çıkmaz."
    },
    {
      "passage": "Bir kişi doğadaki organların belirli işlevlere uygunluğunu örnek gösteriyor. Bu uyumun amaçlı bir kaynağa işaret ettiğini savunuyor; kavramdan değil gözlenen düzenden başlıyor.",
      "prompt": "Bu kişi hangi argüman tarzını kullanıyor?",
      "options": [
        "Ontolojik",
        "Teleolojik",
        "Yalnız agnostik bilgi sınırı",
        "Yalnız adcılık",
        "Yalnız ahlaki görecilik"
      ],
      "answer": 1,
      "hint": "Düzen ve amaç arasındaki geçişi izle.",
      "explanation": "Gözlenen işlev uyumundan amaçlı kaynağa geçiş teleolojik tarzdır. Bu türü belirlemek, argümanın bütün öncüllerinin tartışmasız doğru veya sonucunun herkesçe kabul edilmiş olduğu iddiası değildir."
    },
    {
      "passage": "A kişisi “Yaratıcı vardır ve evrene müdahale eder.”, B kişisi “Yaratıcı vardır, fakat evrenin işleyişine müdahale etmez.” diyor. Soru yalnız bu açık tanımları karşılaştırıyor.",
      "prompt": "A ve B için hangi eşleştirme uygundur?",
      "options": [
        "A ateizm; B teizm",
        "A deizm; B ateizm",
        "A agnostisizm; B panteizm",
        "A teizm; B deizm",
        "A adcılık; B düalizm"
      ],
      "answer": 3,
      "hint": "Ortak yaratıcı kabulünden sonra müdahale farkını bul.",
      "explanation": "Verilen tanımlarda A müdahale eden yaratıcı anlayışıyla teizmi, B müdahaleyi kabul etmeyen yaratıcı anlayışıyla deizmi örnekler. İki kişinin bütün diğer görüşleri metinde belirtilmemiştir."
    },
    {
      "passage": "X görüşü Tanrı ile evreni özdeş sayıyor. Y görüşü ise evrenin Tanrı’da bulunduğunu, fakat Tanrı’nın evrenden ibaret olmadığını savunuyor. Burada yer sözcüğü fiziksel bir kap anlamında kullanılmıyor.",
      "prompt": "Hangi eşleştirme doğrudur?",
      "options": [
        "X panteizm; Y panenteizm",
        "X panenteizm; Y ateizm",
        "X deizm; Y panteizm",
        "X çoktanrıcılık; Y deizm",
        "X agnostisizm; Y ontolojik kanıt"
      ],
      "answer": 0,
      "hint": "Özdeş olmak ile onu tüketmeden içermek ayrımını kullan.",
      "explanation": "X’te Tanrı-evren özdeşliği panteist vurgudur. Y’de evren Tanrı’yla ilişkili olmakla birlikte onu tüketmez; bu panenteist ayrımdır. İfade fiziksel kutu çizimi olarak anlaşılmamalıdır."
    },
    {
      "passage": "Bir kişi “Tanrı’nın varlığı ya da yokluğu konusunda kesin bilgiye ulaşabileceğimizi düşünmüyorum.” diyor. Kişinin başka inançları ve uygulamaları hakkında bilgi verilmiyor.",
      "prompt": "Bu cümlenin doğrudan belirlediği tutum hangisidir?",
      "options": [
        "Tanrı’nın yokluğunu kesin bildiği iddiası",
        "Evrenin Tanrı ile özdeş olduğu iddiası",
        "Birden çok tanrının varlığını bildiği iddiası",
        "Agnostik bilgi tutumu",
        "Doğadaki düzenin amaçlı kaynağı ispatladığı iddiası"
      ],
      "answer": 3,
      "hint": "Cümlenin bilgiye ilişkin kapsamını koru.",
      "explanation": "Kesin bilgiye ulaşılamayacağı ifadesi agnostik tutumdur. Bu cümle tek başına kişinin bütün inançlarını veya uygulamalarını doldurmaz; varlığın kesin reddiyle de aynı iddia değildir."
    },
    {
      "passage": "Bir tartışmada bir insanın bilerek başkasına zarar vermesi ele alınıyor. Cevap olarak insanın özgür seçiminin yanlış kullanılabileceği ileri sürülüyor; doğal afetler hakkında henüz konuşulmuyor.",
      "prompt": "Bu cevap öncelikle hangi problem alanına yönelir?",
      "options": [
        "Bütün doğal acıların tek tek ölçümü",
        "Ahlaki kötülük",
        "Tümellerin zihinsel statüsü",
        "Sanatta temsilin oranı",
        "Bilginin yalnız duyularla edinilmesi"
      ],
      "answer": 1,
      "hint": "Verilen kötülüğün kaynağını belirle.",
      "explanation": "Bilerek zarar verme insan seçimiyle ilişkili ahlaki kötülük örneğidir. Özgür irade cevabı burada bu alana yönelir; bütün doğal acı sorunlarının da aynı cümleyle çözüldüğü metinde söylenmez."
    },
    {
      "passage": "Bir düşünür “Kötülük, iyilikle aynı düzeyde ayrı bir madde değildir; iyinin eksilmesi gibi anlaşılmalıdır.” diyor. Körlüğü görme yetisinin yoksunluğuna benzetiyor.",
      "prompt": "Bu yaklaşım kötülüğü nasıl açıklar?",
      "options": [
        "Bir iyiliğin yoksunluğu veya bozulması olarak",
        "İyilikten tamamen bağımsız ikinci bir maddi töz olarak",
        "Her acının yalnız hoş bir duygu olduğunu söyleyerek",
        "Evrenin mutlaka gelecek yıl biteceğini göstererek",
        "İnsanların hiç seçim yapmadığını deneyle ölçerek"
      ],
      "answer": 0,
      "hint": "Benzetmede ayrı madde mi eksiklik mi verildiğine bak.",
      "explanation": "Körlük örneği ayrı bir madde yerine bir yetinin eksikliğini düşündürür. Metnin kötülük açıklaması da yoksunluk yönündedir; bu, her yaşanmış acının önemsiz olduğunu ileri sürmek değildir."
    },
    {
      "passage": "Bir öğrenci “Bir şeyin bir başlangıcı olduğu kabul edildiğinde, hiçbir ek öncül olmadan o şeyin mutlaka bir sonu olduğu da çıkar.” diyor. Tartışma bu çıkarımın biçimiyle sınırlıdır.",
      "prompt": "Öğrencinin çıkarımı için hangi değerlendirme doğrudur?",
      "options": [
        "Başlangıç sözcüğü tanım gereği kesin bitiş tarihini içerir.",
        "Bir ilk an kabul etmek bütün fizik yasalarını tek başına kanıtlar.",
        "Sonlu geçmiş ile sınırsız gelecek aynı anda düşünülemez.",
        "Başlangıç kabulü bir varlığın bütün ahlaki niteliklerini belirler.",
        "Başlangıç ve son farklı iddialardır; zorunlu geçiş için ek dayanak gerekir."
      ],
      "answer": 4,
      "hint": "Geçmişe ve geleceğe ilişkin iki kapsamı ayrı tut.",
      "explanation": "Bir başlangıç kabulü geçmiş yönündeki sınırı belirtir. Gelecekte sona erme başka bir iddiadır; arada ek dayanak olmadan mantıksal zorunluluk kurulmaz. Soru belirli bir kozmoloji modelini doğrulamaz."
    },
    {
      "passage": "Bir araştırmacı belirli bir dinin vahiy ve öğretilerini o geleneğin kabulleriyle açıklıyor. Diğeri dinî bir argümanı, o inancı baştan kabul etmeksizin öncül ve itirazlarıyla inceliyor.",
      "prompt": "İki çalışma için en uygun ayrım hangisidir?",
      "options": [
        "İlkinde hiçbir akıl yürütme asla bulunamaz.",
        "İkincisi tanım gereği mutlaka ateizm sonucuna varmalıdır.",
        "İlkinde teolojik bağlam; ikincisinde din felsefesine özgü bağımsız argüman incelemesi öne çıkar.",
        "Her ikisi yalnız fiziksel ölçüm yapmaktadır.",
        "Aralarında sorulan soru ve başlangıç kabulü bakımından hiçbir fark olamaz."
      ],
      "answer": 2,
      "hint": "Çalışmanın yöntemine ve başlangıç kabulüne odaklan.",
      "explanation": "İlk çalışma geleneğin öğretilerini kendi bağlamında açıklarken ikincisi başlangıç kabulü olmadan argümanı tartışır. Bu ayrım teolojide hiçbir eleştiri olamayacağı veya felsefenin zorunlu tek sonucu bulunduğu anlamına gelmez."
    }
  ],
  [
    {
      "passage": "Bir kurumun kararı uygulatacak araçları vardır. Karar ayrıca yürürlükteki usulle alınmıştır. Bir yurttaş “Bu karar haklara saygı bakımından niçin haklıdır?” diye soruyor.",
      "prompt": "Yurttaşın sorusu doğrudan hangi düzeye yönelir?",
      "options": [
        "Yalnız fiilî uygulama gücü",
        "Yalnız kâğıdın fiziksel boyu",
        "Normatif meşruluk gerekçesi",
        "Yalnız oylamanın kaç dakika sürdüğü",
        "Yalnız memurun soy ağacı"
      ],
      "answer": 2,
      "hint": "Yapabilme, usul ve haklılık sorularını ayır.",
      "explanation": "Haklara saygı bakımından haklılık istemek normatif meşruluk sorusudur. Uygulama gücü ve usule uygunluk verilmiş olsa da bunlar bu ek gerekçeyi tek başına cevaplamaz."
    },
    {
      "passage": "Bir metin insanların çatışma ve güvensizlikten kurtulmak için güçlü ortak otoriteyi kabul etmesini vurguluyor. Toplum sözleşmesi güvenliğin sağlanması amacıyla açıklanıyor.",
      "prompt": "Bu vurgu hangi düşünürle en yakından ilişkilidir?",
      "options": [
        "Locke’un yönetimin sınırlılığı vurgusu",
        "Kant’ın çıkar gözetmeyen beğenisi",
        "Croce’nin sezgi ve ifadesi",
        "Demokritos’un atom ve boşluğu",
        "Hobbes"
      ],
      "answer": 4,
      "hint": "Güvenlik ve güçlü ortak otorite vurgusunu izle.",
      "explanation": "Verilen vurgu Hobbes’un güvenlik için ortak güç anlayışına uygundur. Sözleşme yaklaşımı her düşünürde aynı amaç ve hak devrini içermez; diğer seçenekler verilen güvenlik gerekçesini karşılamaz."
    },
    {
      "passage": "Bir düşünür, yönetimin yaşam ve özgürlük gibi temel hakları korumak için kurulduğunu ve bu haklarla sınırlı olması gerektiğini savunuyor. Yönetim amaç değil, hakların korunması için araçtır.",
      "prompt": "Bu yaklaşım hangi düşünürün vurgusuyla örtüşür?",
      "options": [
        "Hobbes’un sınırsız güç diye basitleştirilen yorumu",
        "Locke",
        "Schiller’in oyun yaklaşımı",
        "Anaksimenes’in hava öğretisi",
        "Gorgias’a atfedilen bilginin aktarımı sorusu"
      ],
      "answer": 1,
      "hint": "Yönetimin sınırını hangi hakların çizdiğine bak.",
      "explanation": "Hakların korunması ve yönetimin bunlarla sınırlanması Locke’un yaklaşımındaki belirgin vurgudur. Burada sözleşmenin imzalandığı tarih sorulmamakta, siyasal düzenin gerekçesi karşılaştırılmaktadır."
    },
    {
      "passage": "Rousseau’nun genel irade düşüncesini açıklayan bir metin, ortak yararı hedefleyen irade ile kişilerin özel çıkarlarının basit toplamını ayırıyor. Soru yalnız bu ayrımı kullanıyor.",
      "prompt": "Hangi yargı metne uygundur?",
      "options": [
        "Her anket sonucu tanım gereği genel iradedir.",
        "Genel irade yalnız en zengin kişinin isteğidir.",
        "Bütün bireysel tercihler her koşulda aynıdır.",
        "Genel irade özel çıkarların yalnız aritmetik toplamına indirgenmez.",
        "Ortak yarar sorusu siyasetle hiçbir ilişki taşımaz."
      ],
      "answer": 3,
      "hint": "Ortak yarar ve özel çıkar toplamı ayrımını koru.",
      "explanation": "Metin genel iradeyi ortak yarara yönelimle açıklar ve özel çıkar toplamından ayırır. Bu nedenle herhangi bir sayısal çoğunluğu başka hiçbir koşul olmadan genel iradeyle özdeşleştirmek verilen ayrımı siler."
    },
    {
      "passage": "Kurgu bir düzende görevliye kişisel hayranlıktan değil, görevinin tanımlı yetkisi ve genel kuralları nedeniyle uyuluyor. Kurumun demokratik olup olmadığı hakkında başka bilgi verilmiyor.",
      "prompt": "Weber’in hangi otorite tipi öne çıkar?",
      "options": [
        "Rasyonel-yasal",
        "Karizmatik",
        "Yalnız geleneksel",
        "Yalnız dinî aidiyet",
        "Yalnız sanatsal beğeni"
      ],
      "answer": 0,
      "hint": "İtaatin kişiye mi kurala mı bağlandığını bul.",
      "explanation": "Makam ve kişiden bağımsız kurallara dayanma rasyonel-yasal ideal tipi öne çıkarır. Bu bilgi tek başına kurumun mutlaka demokratik olduğunu kanıtlamaz; demokratik nitelik için başka koşullar gerekir."
    },
    {
      "passage": "İki kurgu seçenek eşit temel özgürlükleri ve adil fırsat koşullarını aynı ölçüde sağlıyor. A’da en az avantajlı grubun durumu 5, B’de 8 birim olarak veriliyor. Başka değişken yok.",
      "prompt": "Yalnız bu karşılaştırmada Rawls’un fark ilkesi hangi tercihi destekler?",
      "options": [
        "A; çünkü en az avantajlıya daha az verilmesi tanım gereği adildir.",
        "Her durumda yalnız en yüksek geliri olan kişi seçilmelidir.",
        "Temel özgürlükler bozulsa da tek sayı bütün adaleti belirler.",
        "B; çünkü en az avantajlı grubun durumu daha iyidir.",
        "İki seçenek hakkında hiçbir karşılaştırma yapılamaz."
      ],
      "answer": 3,
      "hint": "Öncelikli koşulların soruda sabit verildiğini kullan.",
      "explanation": "Eşit temel özgürlük ve adil fırsat koşulları aynı verildiğinde fark ilkesi en az avantajlı grubun daha iyi durumunu destekler. Burada 8, 5’ten yüksektir; sonuç bütün toplumları tek sayıyla puanlama iddiası değildir."
    },
    {
      "passage": "Bir yazar bireyin doğrudan engellenmemesini, bir diğeri ise kişinin kendisini yönetebilmesi ve amaçlarını gerçekleştirebilmesi koşullarını özgürlük açısından inceliyor.",
      "prompt": "Hangi ayrım öne çıkar?",
      "options": [
        "Maddi ve formel neden",
        "Negatif ve pozitif özgürlük vurguları",
        "Ontolojik ve teleolojik kanıt",
        "İdea ve atom",
        "Taklit ve yalnız satış fiyatı"
      ],
      "answer": 1,
      "hint": "Engel yokluğu ile kendi yaşamını yönlendirme koşulunu ayır.",
      "explanation": "İlk vurgu dış müdahale ve engelin yokluğuyla negatif özgürlüğe, ikinci vurgu öz yönetim ve imkânlarla pozitif özgürlüğe ilişkilidir. Bu ayrım bütün düşünürlerin her ayrıntıda aynı tanımı kullandığı anlamına gelmez."
    },
    {
      "passage": "Bir kurgu toplumda yasama, yürütme ve yargı farklı görevler üstleniyor; birbirlerinin yetki aşımını denetleyebilecek usuller kuruluyor. Amaç gücün tek elde sınırsızlaşmasını önlemek.",
      "prompt": "Bu düzenlemenin temel felsefi amacı hangisidir?",
      "options": [
        "Gücü sınırlandırmak ve özgürlüğü koruyacak denetim oluşturmak",
        "Yalnız kurum isimlerini üç farklı renkte yazmak",
        "Her görevliyi kişisel karizması nedeniyle dokunulmaz kılmak",
        "Bütün siyasal soruları fiziksel ağırlıkla çözmek",
        "Hiçbir kurumun hiçbir karar alamamasını tanım gereği sağlamak"
      ],
      "answer": 0,
      "hint": "Görev ayrımının hangi soruna cevap verdiğini sor.",
      "explanation": "Kuvvetler ayrılığı yetkinin sınırlanması ve karşılıklı denetimle özgürlüğün korunmasına yönelir. Üç kurum adı yazmak tek başına yeterli değildir; soruda denetimi işleten usuller de verilmiştir."
    },
    {
      "passage": "Bir romanda gözetimin ve düşünce denetiminin yaygınlaştığı istenmeyen bir düzen anlatılıyor. Kurgu gelecekteki bir tehlikeyi görünür kılarak bugünkü uygulamaları sorgulatıyor.",
      "prompt": "Bu anlatının işlevi hangi kavramla açıklanır?",
      "options": [
        "Salt maddi neden",
        "Doğrudan tarihsel olay tutanağı",
        "Ontolojik Tanrı argümanı",
        "Her tasarımın mantıken imkânsız olduğu ispatı",
        "Distopya"
      ],
      "answer": 4,
      "hint": "Kurgu düzenin uyarıcı ve olumsuz yönünü belirle.",
      "explanation": "İstenmeyen bir düzenle tehlikeleri eleştirel biçimde gösterme distopyanın işlevine uygundur. Kurgusal olması gerçek tarih tutanağı olduğu veya her ayrıntısının mantıken imkânsız bulunduğu anlamına gelmez."
    },
    {
      "passage": "Bir kişi “Bir hakkın mevcut yasa metninde tanınmaması, onun ahlaki veya doğal hak olarak savunulmasını mantıken imkânsız kılmaz.” diyor. Yasal düzenin eleştirilebilmesini vurguluyor.",
      "prompt": "Bu sav hangi ayrımı gerektirir?",
      "options": [
        "Bütün hakları yalnız fiilî güçle özdeşleştirmeyi",
        "Mevcut her yasayı eleştiriden bağışık saymayı",
        "Yasal tanınma ile haklı hak talebini ayırmayı",
        "İnsanların hiçbir ortak kurala ihtiyaç duymadığını kanıtlamayı",
        "Hak kavramını yalnız nesnenin ağırlığına indirgemeyi"
      ],
      "answer": 2,
      "hint": "Mevcut metin ile o metne yönelen normatif talebi ayır.",
      "explanation": "Sav, yürürlükteki hukukun durumuyla onun haklılığına yönelik talebin farklı düzeyler olduğunu söyler. Bir hak talebi mevcut yasa eleştirisinin gerekçesi olabilir; mevcut tanınma tek ölçüt yapılmamıştır."
    }
  ],
  [
    {
      "passage": "Bir kişi doğal bir gün batımını güzel buluyor. Başka biri insan eliyle yapılmış bir eserin rahatsızlık veren etkisini tartışıyor. İki durumda da estetik ve sanat kavramları karşılaştırılıyor.",
      "prompt": "Hangi değerlendirme uygundur?",
      "options": [
        "Doğadaki her güzel görünüm zorunlu olarak insan yapımıdır.",
        "Rahatsızlık veren hiçbir eser sanat olarak tartışılamaz.",
        "Her güzel nesne sanat eseri değildir; her eser yalnız hoşluk vermek zorunda değildir.",
        "Estetik yalnız satış fiyatını ölçer.",
        "Sanat felsefesi hiçbir eser hakkında soru soramaz."
      ],
      "answer": 2,
      "hint": "Doğa ürünü ve insan ürünü ayrımını hoşluk ölçütünden ayır.",
      "explanation": "Doğal manzara estetik deneyim konusu olabilir ama bu tek başına insan ürünü eser değildir. Sanat da yalnız hoş duygulara indirgenmez; rahatsızlık veren bir eserin statüsü ve değeri tartışılabilir."
    },
    {
      "passage": "Bir yorumcu bir tablodaki doğa görünümünün nasıl temsil edildiğini inceliyor. Eserin dış dünyadaki nesneyle ilişkisini öne çıkarıyor; sanatçının özel yaşantısını henüz tartışmıyor.",
      "prompt": "Yorumun odağı hangi yaklaşımla ilişkilidir?",
      "options": [
        "Yalnız ekonomik kazanç",
        "Yalnız ontolojik kanıt",
        "Yalnız pozitif hukuk",
        "Yalnız evrenin atomları",
        "Taklit veya temsil"
      ],
      "answer": 4,
      "hint": "İlişkinin dünya ile eser arasında kurulduğunu gör.",
      "explanation": "Dış dünyadaki nesnenin eserde nasıl yeniden sunulduğuna yönelmek temsil veya taklit odağıdır. Bu, her taklit kuramının fotoğraf gibi bire bir kopya istediği şeklinde genişletilemez."
    },
    {
      "passage": "Bir metin sanatın duyusal görünüşü yeniden temsil etmesi nedeniyle hakikatten uzaklaşabileceğini savunuyor. Görünüş, ideal olanla aynı düzeyde kabul edilmiyor.",
      "prompt": "Bu vurgu hangi düşünürün sanat eleştirisine yakındır?",
      "options": [
        "Schiller’in özgür oyununa",
        "Platon",
        "Croce’nin sezgi-ifadesine",
        "Locke’un sınırlı yönetimine",
        "Weber’in yasal otoritesine"
      ],
      "answer": 1,
      "hint": "İdeal olan, görünüş ve görünüşün temsili sırasını izle.",
      "explanation": "Duyusal görünüşün yeniden taklidi ile hakikate uzaklık arasında bağ kurmak Platoncu sanat eleştirisinin belirgin yönüdür. Diğer seçeneklerin vurguları burada kullanılan varlık ve temsil ayrımını karşılamaz."
    },
    {
      "passage": "Bir düşünür sanatsal anlatının yalnız yaşanmış tek bir olayı kopyalamadığını, olabilecek eylemleri olasılık ve bütünlük içinde kurabildiğini söylüyor. Taklidin öğrenmeyle ilişkisini de öne çıkarıyor.",
      "prompt": "Bu açıklama hangi yaklaşıma uygundur?",
      "options": [
        "Sanatın yalnız mekanik fotoğraf olduğu savına",
        "Bütün sanatın hiçbir bilgiyle ilişkisi olamayacağı savına",
        "Tanrı-evren özdeşliğine",
        "Aristoteles’in mimesis anlayışına",
        "Yalnız rasyonel-yasal otoriteye"
      ],
      "answer": 3,
      "hint": "Temsilin seçici ve kurucu yönünü vurgulayan seçeneği bul.",
      "explanation": "Aristotelesçi yaklaşım taklidi insanın öğrenmesi ve eylemlerin düzenli kuruluşuyla ilişkilendirir. Verilen metin onu yalnız mekanik kopya saymaz; olasılık ve bütünlüğü açıkça vurgular."
    },
    {
      "passage": "Bir açıklamada eser, sanatçının sezgisel yaşantısının özgün bir ifadeye dönüşmesi olarak ele alınıyor. Dış görünüşün kopyasından çok sezgi ile ifade arasındaki birlik vurgulanıyor.",
      "prompt": "Bu vurgu hangi düşünürle ilişkilidir?",
      "options": [
        "Croce",
        "Hobbes",
        "Anaksimenes",
        "Demokritos",
        "Aquinolu Thomas’ın hareket argümanı"
      ],
      "answer": 0,
      "hint": "Sezgi ve ifade terimlerinin birlikte işlevine bak.",
      "explanation": "Croce ile ilişkilendirilen anlayış sezgi ve ifadeyi sanatın kuruluşunda öne çıkarır. Bu, düşünmeden yapılan her hareketin zorunlu sanat olduğu veya eserin yalnız fiyatıyla tanımlandığı iddiası değildir."
    },
    {
      "passage": "Bir yazar sanat etkinliğinde insanın duyusal yönü ile akli-biçimsel yönünün özgürce ilişki kurduğunu söylüyor. Oyun sözcüğünü yalnız oyalanma veya yarış kazanma anlamında kullanmıyor.",
      "prompt": "Bu açıklama hangi yaklaşımı öne çıkarır?",
      "options": [
        "Yalnız kâr hesabı",
        "Yalnız doğal hak öğretisi",
        "Hudûs argümanı",
        "Schiller’in oyun anlayışı",
        "Tümellerde adcılık"
      ],
      "answer": 3,
      "hint": "Oyun sözcüğünün burada hangi özgürlük ilişkisini anlattığını sor.",
      "explanation": "Schiller’in oyun anlayışı duyusal ve biçimsel yönlerin özgür etkinlikte ilişkisine yönelir. Bu kavramı yalnız gündelik oyalanmaya veya rekabet puanına indirgemek metindeki felsefi işlevi kaybettirir."
    },
    {
      "passage": "Bir kişi bir resmi yeniden satmak veya işe yarar bulduğu için değil, biçimini güzel bulduğu için beğeniyor. Beğenisinin temelini kazanç beklentisine bağlamıyor.",
      "prompt": "Kant’la ilgili hangi vurgu bu örnekte öne çıkar?",
      "options": [
        "Yalnız ekonomik yarar",
        "Çıkar gözetmeme",
        "Güzelliğin oy çokluğuyla fiziksel ölçümü",
        "Bütün insanların fiilen aynı duyguyu yaşaması",
        "Sanatın zorunlu propaganda olması"
      ],
      "answer": 1,
      "hint": "Beğeninin gerekçesi ile sahip olma isteğini ayır.",
      "explanation": "Metin kazanç ve kullanım beklentisini beğeninin temeli yapmıyor; Kant’ın çıkar gözetmeme vurgusuna uygundur. Bu tek örnek bütün insanların aynı yargıyı fiilen verdiğini göstermez."
    },
    {
      "passage": "Bir yorumcu “Bu yapıtı güzel bulduğumda başkalarının da bu yargıya katılmasını beklerim.” diyor. Herkesin yapılmış bir ankette aynı cevabı verdiğini söylemiyor.",
      "prompt": "Bu vurgu için hangi yorum doğrudur?",
      "options": [
        "Evrensel geçerlilik talebi ile fiilî oy birliği farklıdır.",
        "Metin bütün insanların zaten aynı oyu verdiğini bildirir.",
        "Beklenti tek başına eser için piyasa fiyatı belirler.",
        "Beğeni yargısı yalnız yasal yaptırımdır.",
        "Her farklı beğeni fiziksel imkânsızlıktır."
      ],
      "answer": 0,
      "hint": "Talep ile gerçekleşmiş ortaklığı ayrı tut.",
      "explanation": "Başkasının katılmasını beklemek geçerlilik talebidir; herkesin fiilen aynı yargıyı verdiği veri değildir. Kant bağlamındaki bu ayrım, beğeniyi anket sayısına indirgememeyi sağlar."
    },
    {
      "passage": "Bir açıklamada sanat eseri düşünsel içeriğin duyusal biçimde görünmesi olarak ele alınıyor. Taş veya ses yalnız ham madde olarak değil anlamın görünürleştiği düzen içinde inceleniyor.",
      "prompt": "Bu vurgu hangi düşünürle ilişkilidir?",
      "options": [
        "Protagoras’ın insan ölçüsü",
        "Locke’un hakların korunması",
        "Thales’in suyu",
        "İbn Haldun’un asabiyeti",
        "Hegel"
      ],
      "answer": 4,
      "hint": "Düşünsel içerik ve duyusal biçim ilişkisini bul.",
      "explanation": "Hegel’le ilişkilendirilen sanat anlayışında düşünsel içeriğin duyusal biçimde görünmesi önemlidir. Bu, her eserin duyusal kuruluşu atılarak tek bir kısa ders cümlesine indirgenebileceği anlamına gelmez."
    },
    {
      "passage": "Ece “Bu sandalye sağlam olduğu için kullanışlı, çizgilerini uyumlu bulduğum için güzel, satabileceğim için kazançlıdır.” diyor. Üç yargısını ayrı gerekçelerle kuruyor.",
      "prompt": "Hangi sonuç doğrudan desteklenir?",
      "options": [
        "Sağlam olan her nesne tanım gereği güzeldir.",
        "Satılabilen hiçbir nesne güzel olamaz.",
        "Aynı nesne için yarar, estetik değer ve çıkar farklı gerekçelerle değerlendirilebilir.",
        "Güzel olan her nesne bütün işler için kullanışlıdır.",
        "Üç yargının dayanağı zorunlu olarak tek ve aynıdır."
      ],
      "answer": 2,
      "hint": "Her yargının çünkü bölümünü ayrı oku.",
      "explanation": "Sağlamlık işlev, çizgi uyumu estetik etki, satış beklentisi ekonomik çıkar gerekçesidir. Aynı nesnede birlikte bulunmaları üç kavramı özdeşleştirmez veya her biri için evrensel geçiş kurmaz."
    }
  ],
  [
    {
      "passage": "Kurgu metin şöyledir: “Atölyenin saatleri uzatılmalıdır; çünkü akşam çalışan katılımcılar mevcut saatlerde gelemiyor.” Metin bir öneriyi bir erişim sorunuyla destekliyor.",
      "prompt": "Bu metnin savı hangisidir?",
      "options": [
        "Akşam çalışan katılımcılar mevcut saatlerde gelemiyor.",
        "Atölyenin saatleri uzatılmalıdır.",
        "Bütün atölyeler mutlaka aynı yerde bulunur.",
        "Hiçbir katılımcı akşam çalışmaz.",
        "Mevcut saatler tanım gereği sonsuzdur."
      ],
      "answer": 1,
      "hint": "Yazarın kabul ettirmek istediği öneriyi bul.",
      "explanation": "Sav saatlerin uzatılması önerisidir; akşam çalışanların erişememesi bu sava dayanak yapılmıştır. Gerekçeyi savla karıştırmak metnin argüman yönünü ters okumaya neden olur."
    },
    {
      "passage": "Bir araştırmacı “Bir eylemi özgür yapan nedir?” sorusunu inceliyor. Metinde özgürlük, eylem ve sorumluluk kavramlarının anlamlarını ayrı ayrı açıklıyor.",
      "prompt": "Bu çalışmada problem ile kavram arasındaki ilişki nasıl kurulmuştur?",
      "options": [
        "Problem yalnız bir kişi adıdır; kavramlar yalnız tarihtir.",
        "Kavram tanımlamak sorunun cevabını her durumda tartışmasız ispatlar.",
        "Özgürlük sözcüğünü yazmak bütün sorumluluk problemlerini çözer.",
        "Problem cevap aranan sorudur; kavramlar bu soruyu kurmada ve açıklamada iş görür.",
        "Bir metinde problem ile kavram arasında hiçbir ilişki kurulamaz."
      ],
      "answer": 3,
      "hint": "Soru ile sorunun kullandığı anlam birimlerini ayır.",
      "explanation": "Özgür eylemin ne olduğu problem olarak sorulmaktadır; özgürlük ve sorumluluk gibi kavramlar bu sorunun kuruluşunda kullanılır. Kavramları açıklamak gereklidir ama her tartışmayı tek başına kapatmaz."
    },
    {
      "passage": "“Bu karar çoğunluğun oyunu aldı; öyleyse adildir.” deniyor. Çıkarımın zorunlu olması için çoğunluk ile adalet arasında söylenmemiş bir kural gerekiyor.",
      "prompt": "Hangi örtük öncül bu geçişi tamamlar?",
      "options": [
        "Çoğunluğun seçtiği her karar adildir.",
        "Bazı kararların kâğıdı beyazdır.",
        "Oylama salonunun iki penceresi vardır.",
        "Bazı çoğunluk kararları adil değildir.",
        "Adalet sözcüğü metinde hiç geçmemiştir."
      ],
      "answer": 0,
      "hint": "Oy bilgisi ile haklılık sonucunu bağlayan genel kuralı ara.",
      "explanation": "Çoğunluğun seçtiği her karar adildir öncülü eklenirse verilen karar bu genel kurala yerleştirilir. Bu köprüyü saptamak onu doğru kabul etmek değildir; köprünün kendisi eleştirinin hedefi olabilir."
    },
    {
      "passage": "“Bu gruptaki bütün kişiler yalnız sabah çalışabilir.” savına karşı, aynı gruptaki Deniz’in akşam da çalışabildiği güvenilir biçimde gösteriliyor. Çalışmak sözcüğü iki kullanımda aynı anlamdadır.",
      "prompt": "Hangi sonuç çıkar?",
      "options": [
        "Gruptaki herkes yalnız akşam çalışabilir.",
        "Hiç kimse sabah çalışamaz.",
        "Deniz grupta değildir.",
        "Bütün evrensel savlar her konuda yanlıştır.",
        "Evrensel sav verilen kapsamıyla korunamaz."
      ],
      "answer": 4,
      "hint": "Karşı örneğin aynı gruba ait olduğunu ve yalnız ifadesini kullan.",
      "explanation": "Deniz aynı grupta olduğu ve akşam da çalışabildiği için herkesi yalnız sabahla sınırlayan savı çürütür. Bundan herkesin akşam çalıştığı veya bütün genel yargıların yanlış olduğu sonucu çıkmaz."
    },
    {
      "passage": "Bir metin kendi içinde hiçbir çelişki taşımıyor; fakat kullandığı temel olgu öncülünün yanlış olduğu ayrıca gösteriliyor. Metnin iç düzeni ile olgusal dayanağı ayrı denetleniyor.",
      "prompt": "Bu durum hangi ayrımı gösterir?",
      "options": [
        "Tutarlı olan her metnin bütün öncülleri zorunlu doğrudur.",
        "Yanlış bir öncül bulunan metinde hiçbir cümle kurulamaz.",
        "Tutarlılık tek başına bütün öncüllerin doğruluğunu garanti etmez.",
        "Doğruluk ile tutarlılık her bağlamda tam aynı kavramdır.",
        "Ünlü bir yazarın adı bütün incelemelerin yerini alır."
      ],
      "answer": 2,
      "hint": "İç çelişki yokluğu ile olguya uygunluğu ayır.",
      "explanation": "Bir metin öncülleri arasında çelişki olmadan yanlış bir olguya dayanabilir. Tutarlılık önemli bir denetimdir fakat öncüllerin doğruluğu ve çıkarımın geçerliliği için ayrı inceleme gerekir."
    },
    {
      "passage": "Yazar “Bazı durumlarda konuşma sırası için süre sınırı yararlı olabilir.” diyor. Eleştirmen “Yazar hiç kimsenin hiçbir koşulda konuşmasını istemiyor.” diye cevap veriyor.",
      "prompt": "Bu eleştirinin ilk sorunu nedir?",
      "options": [
        "Asıl savın kapsamını ve içeriğini değiştirerek başka bir sava yönelmesi",
        "Yazarın gerçek cümlesini aynı kapsamla yeniden kurması",
        "Bütün gerekçeleri tek tek başarıyla çürütmesi",
        "Yalnız doğru bir tarih bilgisi vermesi",
        "Süre ile konuşma arasında hiç kelime bulunmaması"
      ],
      "answer": 0,
      "hint": "Bazı durumlar ile hiçbir koşulda ifadelerini karşılaştır.",
      "explanation": "Asıl sav belirli durumlarda süre düzenlemesini tartışır. Eleştirmen bunu bütün konuşmaların yasaklanmasına dönüştürür; bu farklı savı eleştirmek asıl görüşün gerekçelerini henüz karşılamaz."
    },
    {
      "passage": "Bir öğrenci metni okuduktan sonra problem, temel sav, iki gerekçe ve bir itirazı ayrı kutulara yerleştiriyor. Ardından bunların ilişkilerini göstererek metnin bütün anlamını yeniden açıklıyor.",
      "prompt": "Öğrenci hangi iki işlemi birlikte yapıyor?",
      "options": [
        "Yalnız belge yakma ve kopyalama",
        "Yalnız piyasa hesabı",
        "Yalnız fiziksel hız ölçümü",
        "Yalnız ad değiştirip gerekçeyi gizleme",
        "Çözümleme ve sentez"
      ],
      "answer": 4,
      "hint": "Parçalara ayırma ve bütünü yeniden kurma işlemlerini ayır.",
      "explanation": "İşlevlere ayırma çözümleme, aralarındaki bağı yeniden kurarak bütünü açıklama sentezdir. Yalnız kutu saymak yetmez; öğrenci ilişkileri de gösterdiği için iki işlemi birlikte yapmaktadır."
    },
    {
      "passage": "Bir öğrenci önce cevaplamak istediği soruyu daraltıyor, sonra savını ve dayanaklarını planlıyor. Taslağında güçlü bir itirazı ele alıp savının kapsamını gerekçeyle düzeltiyor.",
      "prompt": "Bu yazma süreci için hangisi doğrudur?",
      "options": [
        "Her itiraz yazarın bütün düşünmeyi bırakmasını zorunlu kılar.",
        "Taslak düzeltmek mantıken her zaman başarısızlık demektir.",
        "İtiraz, savı daha savunulabilir biçimde geliştirmeye katkı sağlamıştır.",
        "Konuya ait bütün sözcükleri sıralamak gerekçenin yerini tutar.",
        "Karşı görüşe cevap vermek için onu mutlaka çarpıtmak gerekir."
      ],
      "answer": 2,
      "hint": "Düzeltmenin neyi ve niçin değiştirdiğine bak.",
      "explanation": "Öğrenci itirazın etkisini inceleyerek savın kapsamını gerekçeli biçimde düzenler. Felsefi yazmada bu gelişim olabilir; her değişiklik düşünmenin başarısız olduğu veya bütün görüşün çöktüğü anlamına gelmez."
    },
    {
      "passage": "Bir metin “Bütün kayıtlı öğrenciler kart aldı. Ece kayıtlı öğrencidir. O hâlde Ece kart aldı.” diyor. İlk iki cümle son cümleye dayanak olarak sunuluyor.",
      "prompt": "Bu üçlü yapı nasıl adlandırılır?",
      "options": [
        "Yalnız sonuç cümlesinin eş anlamı",
        "Sadece düşünürün kişisel öz geçmişi",
        "Hiç yargı içermeyen bir ses dizisi",
        "Öncüller ile sonucu ilişkilendiren argüman",
        "Yalnız bir mimari malzeme listesi"
      ],
      "answer": 3,
      "hint": "Argümanı tek bir yargıya değil ilişkiye bağla.",
      "explanation": "Argüman, öncüllerin sonuca dayanak olmasıyla kurulur. İlk iki yargı Ece’nin kart aldığı sonucuna destek sunmaktadır; yalnız son cümleyi argümanın tamamı saymak yapıyı eksiltir."
    },
    {
      "passage": "Bir öğrenci başka yazarın görüşünü kendi sözcükleriyle özetliyor, kaynağını belirtiyor ve ardından ona yönelik kendi itirazını ayrı paragrafta yazıyor. Doğrudan alıntı yaptığında bunu ayrıca işaretliyor.",
      "prompt": "Bu tutumun temel yararı nedir?",
      "options": [
        "Başkasının görüşünü kaynak belirtmeden kendisininmiş gibi sunması",
        "Aktarılan görüş ile öğrencinin yorumunu ayırıp düşünsel izlenebilirliği sağlaması",
        "Her alıntının gerekçesini incelemeyi gereksiz kılması",
        "Özet yazanın mutlaka yazarla aynı görüşte olduğunu kanıtlaması",
        "Bütün tarihsel iddiaları kendiliğinden doğrulaması"
      ],
      "answer": 1,
      "hint": "Kimin söylediği ile neye itiraz edildiğinin ayrılmasını düşün.",
      "explanation": "Kaynak ve aktarım biçimi açık olduğunda okur özgün görüş ile öğrencinin yorumunu ayırabilir. Bu şeffaflık değerlendirmeyi kolaylaştırır; alıntılanan görüşün doğru olduğu veya öğrencinin onunla aynı fikirde bulunduğu sonucu çıkmaz."
    }
  ],
  [
    {
      "passage": "Üç düşünür doğadaki çokluğun temelini araştırıyor. A suyu, B sınırsız-belirsiz apeironu, C ise hava ve onun yoğunlaşma-seyrekleşmesini öne çıkarıyor.",
      "prompt": "Hangi eşleştirme doğrudur?",
      "options": [
        "A Anaksimenes; B Thales; C Anaksimandros",
        "A Thales; B Anaksimandros; C Anaksimenes",
        "A Platon; B Aristoteles; C Sokrates",
        "A Gorgias; B Protagoras; C Schiller",
        "A Hobbes; B Locke; C Rousseau"
      ],
      "answer": 1,
      "hint": "Apeironun belirli bir madde olmayışını kullan.",
      "explanation": "Su Thales’le, apeiron Anaksimandros’la, hava ve yoğunlaşma-seyrekleşme Anaksimenes’le ilişkilidir. Ortak problem arkhedir; cevapların niteliği farklıdır ve modern deneysel element kuramıyla eşitlenmez."
    },
    {
      "passage": "Bir düşünür doğada ateş, hava, su ve toprağı kökler olarak kabul ediyor. Birleşme ve ayrılmayı sevgi ile nefret güçleriyle açıklıyor; bunları yalnız kişiler arası duygu olarak kullanmıyor.",
      "prompt": "Bu görüş hangi düşünürle ilişkilidir?",
      "options": [
        "Thales’in yalnız su ilkesi",
        "Anaksimenes’in yalnız hava ilkesi",
        "Sokrates’in ironi yöntemi",
        "Empedokles",
        "Weber’in otorite tipleri"
      ],
      "answer": 3,
      "hint": "Dört kök ile birleşme-ayrılma güçlerini birlikte düşün.",
      "explanation": "Dört kök ve sevgi-nefret açıklaması Empedokles’in yaklaşımına uygundur. Sorudaki güçler doğadaki birleşme ve ayrılmayı açıklamak için kullanılır; gündelik duygu anlamına indirgenmemelidir."
    },
    {
      "passage": "A görüşü değişim ve karşıtların ilişkisini logosla birlikte vurguluyor. B görüşü aklın varlığı bir ve değişmez düşünmesi gerektiğini, yokluktan varlık çıkmasının sorunlu olduğunu savunuyor.",
      "prompt": "Hangi eşleştirme uygundur?",
      "options": [
        "A Herakleitos; B Parmenides",
        "A Parmenides; B Herakleitos",
        "A Locke; B Croce",
        "A Schiller; B Hobbes",
        "A Kant’ın estetiği; B Weber’in otoritesi"
      ],
      "answer": 0,
      "hint": "Değişim ve değişmez varlık ayrımını takip et.",
      "explanation": "Herakleitos değişim ve logosu, Parmenides akılla kavranan değişmez varlığı öne çıkarır. Karşılaştırma iki görüşün mantıksal farkını gösterir; tek başına belgeli bir doğrudan tarihsel cevaplaşma iddiası kurmaz."
    },
    {
      "passage": "Bir metin görülen değişimi, temel parçaların ve boşluğun varlığıyla; parçaların farklı birleşim ve düzenleri üzerinden açıklıyor. Metin antik bir düşünceyi anlatıyor.",
      "prompt": "Bu görüş için hangisi doğrudur?",
      "options": [
        "Modern laboratuvar deneylerinin tamamı Demokritos tarafından yapılmıştır.",
        "Boşluk sözcüğü burada hiçbir varlık sorusu bulunmadığını gösterir.",
        "Metin yalnız Kant’ın beğeni yargısını anlatır.",
        "Parçaların birleşimi fikri atomcu açıklamayla hiçbir ilişki taşımaz.",
        "Demokritosçu atomculukla ilişkilidir; modern atom fiziğinin bütün ayrıntılarıyla özdeş değildir."
      ],
      "answer": 4,
      "hint": "Tarihsel kavram ile günümüz bilimsel modelini ayır.",
      "explanation": "Atom ve boşlukla, birleşim düzenlerini kullanarak açıklama Demokritosçu yaklaşıma uygundur. Aynı atom sözcüğü, antik savın modern deneysel fiziğin bütün doğrulanmış ayrıntıları olduğu sonucunu vermez."
    },
    {
      "passage": "Bir düşünür “İnsan ölçüdür.” vurgusuyla yargıların kişiye ve koşullara göre değişmesini tartışıyor. Başka bir düşünürün varlık, bilme ve bildirme üzerine üç ayrı savı ise ayrıca ele alınıyor.",
      "prompt": "İlk vurgu hangi düşünürle ilişkilidir?",
      "options": [
        "Gorgias’ın üçlü savının tamamıyla zorunlu özdeşlik",
        "Anaksimandros",
        "Protagoras",
        "Aquinolu Thomas",
        "İbn Haldun"
      ],
      "answer": 2,
      "hint": "İnsan ölçüsü vurgusunu üçlü savdan ayır.",
      "explanation": "İnsan ölçüsü ve yargıların insana göre değişmesi Protagoras’la ilişkilidir. Gorgias’a atfedilen varlık-bilme-bildirme savlarını aynı düşünür ve aynı sav gibi birleştirmek sofistler arasındaki farkları siler."
    },
    {
      "passage": "Bir kişi adaleti “Güçlü olanın her istediğini yapmasıdır.” diye tanımlıyor. Sokratesçi bir sorgulamada tanımın farklı durumlarda doğurduğu sonuçlar ve karşı örnekler soruluyor.",
      "prompt": "Bu yöntemin temel amacı nedir?",
      "options": [
        "Tanımın gerekçesini ve kapsamını sınayarak daha tutarlı kavrayış geliştirmek",
        "Kişinin adını öğrenip bütün cevapları doğru saymak",
        "Her soruyu yalnız satış fiyatıyla çözmek",
        "Karşıdakini küçük düşürmeyi tek amaç yapmak",
        "Her örneği tanımın yerine değişmez biçimde koymak"
      ],
      "answer": 0,
      "hint": "Soruların kavrama ve gerekçeye ne yaptığını düşün.",
      "explanation": "Sokratik sorgulama tanımın kapsadığı durumları ve gerekçesini araştırır. Karşı örnekler düşünceyi geliştirmeye hizmet edebilir; yöntem yalnız alay veya kişi adını ezberleme olarak anlaşılmaz."
    },
    {
      "passage": "Bir görüş değişen güzel nesneleri, değişmeyen güzelin kendisinden ayırıyor. Değişmeyen olanı yalnız kişinin aklına anlık gelen özel düşünce değil, bilginin nesnesi olarak ele alıyor.",
      "prompt": "Bu görüş hangi anlayışa uygundur?",
      "options": [
        "Demokritos’un yalnız atomların düzenine",
        "Locke’un sınırlı yönetimine",
        "Weber’in karizmasına",
        "Schiller’in gündelik yarış puanına",
        "Platon’un idealar ayrımına"
      ],
      "answer": 4,
      "hint": "İdeanın özel anlık fikirden farklı statüsünü belirle.",
      "explanation": "Değişen duyusal nesne ile değişmeyen ideal olanın ayrımı Platoncu öğretinin temelidir. İdea burada sıradan anlamda kişinin anlık fikri değildir; varlık anlayışı bilgi ayrımıyla birlikte kurulmaktadır."
    },
    {
      "passage": "Bir heykel bronzdan, bir heykeltıraş tarafından, belirli bir figür biçiminde ve anma amacıyla yapılmıştır. Aristoteles’in dört neden ayrımı uygulanıyor.",
      "prompt": "Ereksel neden hangisidir?",
      "options": [
        "Bronz",
        "Heykeltıraş",
        "Anma amacı",
        "Figürün düzeni",
        "Bronzun kütlesi"
      ],
      "answer": 2,
      "hint": "Erek için ne için sorusunu sor.",
      "explanation": "Ereksel neden yapılma amacını açıklar; burada anma amacıdır. Bronz maddi, figürün düzeni formel, heykeltıraş fail nedenle ilişkilidir. Aynı nesneye yönelen dört soru farklı açıklamalar ister."
    },
    {
      "passage": "Bir düşünür cesareti korkaklık ile ölçüsüz atılganlık arasında, koşula ve kişiye uygun akıllı seçimle ilişkilendiriyor. Ortayı iki sayının aritmetik ortalaması olarak tanımlamıyor.",
      "prompt": "Bu açıklama hangi görüşle örtüşür?",
      "options": [
        "Her durumda her eylemin sayısal ortasını alma zorunluluğuyla",
        "Bütün ahlaki seçimi yok sayan tek bir atom hesabıyla",
        "Güzelin satış fiyatıyla ölçülmesiyle",
        "Aristoteles’in erdemde orta anlayışıyla",
        "Hiçbir koşulun önem taşımadığı savıyla"
      ],
      "answer": 3,
      "hint": "Uygunluk ve akıllı seçim vurgusunu koru.",
      "explanation": "Aristoteles’te erdemli orta koşul ve akıllı seçimle ilişkilidir. Aritmetik ortalama değildir; bütün eylemler için iki uç arasında sayısal değer bulma reçetesine dönüştürülemez."
    },
    {
      "passage": "Bir okur Tao düşüncesini incelerken doğal akışla uyum ve zorlamadan kaçınma vurgusunu görüyor. Bunu “Mutlak olarak hiçbir şey yoktur.” savıyla eşitlememesi gerektiği belirtiliyor.",
      "prompt": "Bu uyarının gerekçesi hangisidir?",
      "options": [
        "Farklı gelenekler arasında hiçbir karşılaştırma yapılamaz.",
        "Tao’nun anlamını tek bir mutlak yokluk etiketine indirgemek görüşün olumlu içeriğini kaybettirir.",
        "Tao yalnız modern atomun ölçülmüş kütlesidir.",
        "Doğal akış sözcükleri hiçbir felsefi soru taşıyamaz.",
        "Bütün tarihsel görüşler aynı cümleyi savunur."
      ],
      "answer": 1,
      "hint": "Karşılaştırma ile anlamı silen özdeşleştirmeyi ayır.",
      "explanation": "Tao’nun yol, akış ve uyumla ilişkili düşünsel içeriği mutlak yokluk sloganına indirgenmez. Bu, gelenekleri karşılaştırmayı yasaklamaz; karşılaştırmada tanımları ve bağlamları korumayı gerektirir."
    }
  ],
  [
    {
      "passage": "Bir ders notu MS 2–15. yüzyılı genel dönem başlığı olarak veriyor. Aynı dönemde farklı dillerde ve geleneklerde inanç, akıl, varlık ve bilgi üzerine farklı görüşlerin bulunduğunu da belirtiyor.",
      "prompt": "Hangi yorum uygundur?",
      "options": [
        "Bu çağda hiçbir mantıksal tartışma yapılmamıştır.",
        "Dönem adı bütün coğrafyalarda tek bir görüşün aynı biçimde egemen olduğu anlamına gelmez.",
        "Bütün düşünürler akla tam olarak aynı rolü vermiştir.",
        "Tek tarih etiketi bütün görüş farklarını ortadan kaldırır.",
        "Dönemleme her insanın doğum gününü aynı yapar."
      ],
      "answer": 1,
      "hint": "Tarihsel sınıflama ile bütün görüşlerin özdeşliğini ayır.",
      "explanation": "Yaklaşık dönem sınırı öğretimi düzenler; farklı gelenek ve düşünürler arasındaki yöntem farklarını silmez. Kaynakta mantık ve bilgi tartışmalarının bulunduğu da açıkça verildiği için aklın hiç kullanılmadığı sonucu çıkarılamaz."
    },
    {
      "passage": "Bir açıklama, erken Hristiyan düşüncesinin savunulması ve kavramsal kuruluşuyla ilişkili dönemi; ardından okul geleneğinde sistemli inanç-akıl tartışmalarıyla öne çıkan dönemi ayırıyor.",
      "prompt": "Hangi sıra uygundur?",
      "options": [
        "Skolastik, ardından yalnız modern atom fiziği",
        "Yalnız Rönesans, ardından yalnız İlk Çağ",
        "Yalnız karizmatik, ardından yalnız yasal otorite",
        "Patristik, ardından skolastik",
        "Yalnız distopya, ardından ütopya"
      ],
      "answer": 3,
      "hint": "Savunma-kuruluş ile okul geleneği ayrımını dönemlerle ilişkilendir.",
      "explanation": "Patristik başlığı erken kuruluş ve savunmayı, skolastik başlığı okul geleneğinde sistemli tartışmayı öne çıkarır. Bunlar yaklaşık dönemlemelerdir; bütün metinlerin tek bir günde birden değiştiği anlamına gelmez."
    },
    {
      "passage": "Bir düşünür kötülüğü bağımsız ikinci bir töz değil iyiliğin eksilmesi olarak açıklıyor. Körlüğü gözün yanında duran bir madde değil görme yetisinin yoksunluğu gibi ele alıyor.",
      "prompt": "Bu açıklama hangi düşünürle ilişkilidir?",
      "options": [
        "Augustinus",
        "Anaksimenes’in yoğunlaşması",
        "Weber’in makam düzeni",
        "Croce’nin ifade öğretisi",
        "Hobbes’un sözleşmesi"
      ],
      "answer": 0,
      "hint": "Eksiklik ile bağımsız madde arasındaki ayrımı bul.",
      "explanation": "Kötülüğün iyinin yoksunluğu olarak açıklanması Augustinusçu yaklaşımla ilişkilidir. Bu varlık statüsü açıklaması, her acının önemsiz olduğunu veya bütün kötülük itirazlarının tek cümleyle çözüldüğünü söylemez."
    },
    {
      "passage": "Bir düşünür bazı Tanrı bilgilerine akılla ulaşılabileceğini, bazı inanç sırlarının ise vahiy yoluyla kabul edildiğini savunuyor. Akıl ile inancı bütünüyle düşman iki alan saymıyor.",
      "prompt": "Bu yaklaşım hangi düşünürün vurgusuna uygundur?",
      "options": [
        "Bütün mantığı her koşulda reddeden tek görüş",
        "Demokritos’un yalnız atom dizilişi",
        "Protagoras’ın insan ölçüsü",
        "Schiller’in oyun anlayışı",
        "Aquinolu Thomas"
      ],
      "answer": 4,
      "hint": "Akla verilen alan ile aklın sınırını birlikte oku.",
      "explanation": "Aquinolu Thomas akıl ile inanç arasında uyum ararken bazı bilgilerin akılla, bazılarının vahiy bağlamında ele alınmasını ayırır. Bu, her inanç ayrıntısının bilimsel ölçümle doğrulandığı veya aklın tamamen gereksiz olduğu iddiası değildir."
    },
    {
      "passage": "İki tekil ağacın ortak doğasının o ağaçlarda örneklendiği savunuluyor. Bu ortaklık tekillerden bağımsız ayrı bir nesne gibi değil, tekillerle ilişkili form olarak açıklanıyor.",
      "prompt": "Verilen tanıma en uygun adlandırma hangisidir?",
      "options": [
        "Yalnız bağımsız idealar gerçekçiliği",
        "Ortaklığın yalnız keyfî ses olduğunu savunan adcılık",
        "Ilımlı gerçekçilik",
        "Tanrı’nın yokluğuna ilişkin ateizm",
        "Düzen ve amaçtan teleolojik argüman"
      ],
      "answer": 2,
      "hint": "Etiketten önce tanımın ortaklığı nereye yerleştirdiğini oku.",
      "explanation": "Tekillerde örneklenen ortak doğa veya form ılımlı gerçekçi vurgudur. Zihinsel kavram statüsünü öne çıkaran kavramcılık ve yalnız ortak ad vurgusu bundan ayrılır; karışık tablo etiketleri yerine açık tanım esas alınır."
    },
    {
      "passage": "A yaklaşımı tümeli zihinsel bir kavram olarak açıklıyor. B yaklaşımı ise tekiller dışında ayrı tümel varlık kabul etmeden ortak adın kullanımını öne çıkarıyor. Aynı iki tekil nesne tartışılıyor.",
      "prompt": "Hangi eşleştirme uygundur?",
      "options": [
        "A kavramcılık; B adcılık",
        "A adcılık; B bağımsız idealar gerçekçiliği",
        "A teleoloji; B kozmoloji",
        "A negatif özgürlük; B ereksel neden",
        "A karizma; B patristik dönem"
      ],
      "answer": 0,
      "hint": "Zihinsel içerik ile ortak adın işlevini ayır.",
      "explanation": "A zihinsel kavram statüsüyle kavramcılığı, B ortak ad işleviyle adcılığı öne çıkarır. İki görüş bağımsız tümel varlık anlayışından ayrılabilir; bu ortak ayrılık açıklamalarını bütünüyle aynı yapmaz."
    },
    {
      "passage": "Bir varlık fiilen vardır; fakat kendi özü bakımından var olmaması düşünülebilir ve varlığı başka bir dayanağa bağlıdır. Soru İbn Sînâ’nın mümkün-zorunlu ayrımına göredir.",
      "prompt": "Bu varlığın statüsü nedir?",
      "options": [
        "Kendi özü gereği zorunlu varlık",
        "Hiçbir biçimde var olamayacak imkânsızlık",
        "Yalnız genel adın ses biçimi",
        "Sadece estetik beğeni yargısı",
        "Mümkün varlık"
      ],
      "answer": 4,
      "hint": "Şimdi var olmak ile özü gereği zorunlu olmayı ayır.",
      "explanation": "Kendi özü bakımından var olmaması düşünülebilen ve dayanağa bağlı varlık mümkündür. Şu anda var olması onu zorunlu varlığa dönüştürmez; soru yalnız geçmişte bir ilk anın tarihi değildir."
    },
    {
      "passage": "Bir metin Gazzâlî’nin bazı metafizik savları eleştirdiğini bildiriyor. Öğrenci bundan “Gazzâlî her tür mantığı ve bütün bilim çalışmalarını her koşulda reddetmiştir.” sonucunu çıkarıyor.",
      "prompt": "Öğrencinin yorumundaki sorun nedir?",
      "options": [
        "Metnin kapsamını hiç değiştirmeden tekrar etmesi",
        "Bütün tarihsel kanıtları tek tek doğrulaması",
        "Bazı savlara yönelen eleştiriyi bütün yöntem ve alanlara sınırsız genişletmesi",
        "Metinde verilen eleştiriyi olduğundan daha dar tutması",
        "Yalnız mümkün varlığı doğru tanımlaması"
      ],
      "answer": 2,
      "hint": "Bazı metafizik savlar ile her tür bilim arasındaki farkı koru.",
      "explanation": "Verilen bilgi belirli metafizik savların eleştirisidir. Buradan her tür mantık ve bilimin tümden reddi çıkmaz; eleştirilen savın konusu ve gerekçesi ayrı incelenmelidir."
    },
    {
      "passage": "Bir tarihsel açıklama, Yunanca, Süryanice, Arapça ve Latince arasında yapılan çevirilerin düşünce alışverişini geliştirdiğini; farklı geleneklerden kişilerin katkı sunduğunu söylüyor.",
      "prompt": "Hangi sonuç metinle uyumludur?",
      "options": [
        "Bütün felsefe tek kişi tarafından tek günde çevrilmiştir.",
        "Çeviri yapan herkes zorunlu olarak hiç özgün düşünmemiştir.",
        "Diller arası geçiş düşüncenin gelişimiyle hiçbir ilişki taşımaz.",
        "Çeviri hareketi çok merkezli etkileşim ve yorumlama süreci olarak anlaşılabilir.",
        "Hiçbir metin çeviriden önce var olmamıştır."
      ],
      "answer": 3,
      "hint": "Birden çok dil, kişi ve yorum katkısını birlikte düşün.",
      "explanation": "Metin çeviriyi farklı merkez ve geleneklerin etkileşimi olarak verir. Birikimin aktarılması eleştiri ve yeni yorumları dışlamaz; tek kişilik bir olay veya yalnız edilgin kopyalama sonucuna indirgenemez."
    },
    {
      "passage": "İbn Haldun’un devletin dönüşümünü canlıların gelişimine benzetmesi tartışılıyor. Bir öğrenci bu benzetmeden bütün devletlerin aynı değişmez biyolojik takvimde çökeceğini çıkarıyor.",
      "prompt": "Benzetme için hangi değerlendirme uygundur?",
      "options": [
        "Bir benzetme bütün tarihsel koşulları gereksiz kılar.",
        "Açıklayıcı benzerlik, her ayrıntıda aynı zorunlu takvimi tek başına kanıtlamaz.",
        "Her devletin biyolojik doğum belgesi aynı tarihtedir.",
        "Toplum incelemesinde hiçbir ilişki kurulamaz.",
        "Asabiyet yalnız kişisel kızgınlığın eş anlamıdır."
      ],
      "answer": 1,
      "hint": "Analoji ile bire bir özdeşlik arasındaki farkı kullan.",
      "explanation": "Canlı benzetmesi kuruluş ve dönüşümü düşünmeye yardım edebilir; bütün devletlere sabit biyolojik takvim dayatmaz. İbn Haldun’un toplumsal koşul ve dayanışma açıklamaları bu ayrımı gerektirir."
    }
  ]
];
export const forge021HumanitiesTopics: Record<string, string> = {
 "din-felsefesi": "detail-103", "siyaset-felsefesi": "detail-104", "sanat-felsefesi": "detail-105",
 "felsefi-okuma-ve-yazma": "detail-106", "ilk-cag-felsefesi": "detail-107", "orta-cag-felsefesi": "detail-108",
};
export const forge021HumanitiesGuides: LessonGuide[] = guideSpecs021.map(({ title: _title, ...guide }) => guide);
export const forge021HumanitiesLessons: Lesson[] = guideSpecs021.map((guide, pack) => ({
 id: guide.id, subjectId: "tyt-felsefe", title: txt(guide.title), minutes: guide.minutes,
 objectives: guide.objectives.map(txt), body: guide.sections.map(s => ({ title: txt(s.title), text: txt(s.paragraphs.join("\n\n")) })),
 questions: questionRows021[pack].map((q, i): Question => ({ id: `${guide.id}-021-${i + 1}`, skill: guide.id,
  passage: txt(q.passage), prompt: txt(q.prompt), options: q.options.map(txt), answer: q.answer, hint: txt(q.hint), explanation: txt(q.explanation) })),
 source: txt(guide.source), tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
}));

export const humanitiesDefaults021 = {
 argument: "cause", claim: "limited", bridge: false,
 power: true, law: true, rights: false, focus: "justify",
 lens: "world", form: "calm", scope: "all", evidence: "one",
 stage: "shadow", universal: "separate",
 selected: 0, guess: "", reason: "", compared: false, show: false,
};
export type HumanitiesState021 = typeof humanitiesDefaults021;
export interface HumanitiesNode021 { label: string; text: string; active?: boolean; root?: boolean; }
export interface HumanitiesLink021 { from: number; to: number; label: string; active?: boolean; focused?: boolean; }
export interface HumanitiesScene021 {
 kind: "religion" | "politics" | "art" | "reading" | "ancient" | "medieval";
 title: string; context: string; question: string; nodes: HumanitiesNode021[]; links: HumanitiesLink021[];
 decision: string; options: string[]; reason: string; evidence: string[];
 art?: { tense: boolean; lens: string }; cave?: { stage: string; target: number };
 sample?: { name: string; known: boolean; access: false }[];
}
function choice021(value: unknown, values: string[]): asserts value is string {
 if (typeof value !== "string" || !values.includes(value)) throw new RangeError("HUMANITIES021_CHOICE");
}
function bool021(value: unknown) { if (typeof value !== "boolean") throw new RangeError("HUMANITIES021_BOOLEAN"); }
export function support021(scope: string, evidence: string) {
 choice021(scope, ["some", "all"]); choice021(evidence, ["one", "all"]);
 const rows = ["Ece", "Can", "Ada", "Ali", "Oya"].map((name, i) => ({ name, known: evidence === "all" || i === 0, access: false as const }));
 return { rows, observed: rows.filter(r => r.known).length, required: scope === "all" ? 5 : 1,
  supported: scope === "some" || evidence === "all" };
}
export function buildHumanitiesScene021(lessonId: string, input: Partial<HumanitiesState021> = {}): HumanitiesScene021 {
 if (!Object.hasOwn(forge021HumanitiesTopics, lessonId)) throw new RangeError("HUMANITIES021_LESSON");
 if (!input || typeof input !== "object" || Array.isArray(input)) throw new RangeError("HUMANITIES021_INPUT");
 const s = { ...humanitiesDefaults021, ...input };
 if (lessonId === "din-felsefesi") {
  choice021(s.argument, ["concept", "cause", "order"]); choice021(s.claim, ["limited", "rich"]); bool021(s.bridge);
  const rich = s.claim === "rich", ready = !rich || s.bridge;
  const v = s.argument === "concept" ? {
   label: "Kavram", start: "Daha yetkin bir örneği akla gelmeyen varlık kavramı ele alınıyor.",
   rule: "Kurgu akıl yürütme, bu varlığın yalnız zihinde kalması mümkün değildir savını kullanıyor.",
   result: "Bu yetkin varlığın gerçekliği ileri sürülüyor.", type: "Ontolojik", extra: "Bu kurgu ek öncül, ileri sürülen varlığın kişisel ve mutlak iyi olduğunu ayrıca kabul ediyor.",
  } : s.argument === "cause" ? {
   label: "Evren", start: "Evrenin sonradan oluştuğu bu örnekte öncül olarak kabul ediliyor.",
   rule: "Sonradan olan her şeyin bir nedeni olduğu ileri sürülüyor.", result: "Evrenin bir nedeni olduğu sonucu çıkarılıyor.", type: "Kozmolojik", extra: "Bu kurgu ek öncül, evrenin bu nedeninin kişisel ve mutlak iyi olduğunu ayrıca kabul ediyor.",
  } : {
   label: "Düzen", start: "Doğadaki parçaların işlev uyumu örnek veriliyor.", rule: "Bu tür uyumun amaçlı bir kaynağa işaret ettiği ileri sürülüyor.",
   result: "Amaçlı bir kaynak olduğu sonucu ileri sürülüyor.", type: "Teleolojik", extra: "Bu kurgu ek öncül, amaçlı kaynağın kişisel ve mutlak iyi olduğunu ayrıca kabul ediyor.",
  };
  const nodes: HumanitiesNode021[] = [{ label: v.label, text: v.start }, { label: "Geçiş", text: v.rule }, { label: "Sonuç", text: v.result }];
  const links: HumanitiesLink021[] = [{ from: 0, to: 2, label: "Başlangıç öncülü" }, { from: 1, to: 2, label: "Geçiş ilkesi" }];
  if (rich) {
   nodes.push({ label: "Ek öncül", text: s.bridge ? v.extra : "Kişisellik ve mutlak iyilik için ek öncül verilmedi.", active: s.bridge }, { label: "Tam sav", text: "Sonuçta kişisel ve mutlak iyi bir kaynak veya varlık da ileri sürülüyor." });
   links.push({ from: 2, to: 4, label: "İlk sonucun kapsamı" }, { from: 3, to: 4, label: "Yeni niteliğin dayanağı", active: s.bridge });
  }
  return { kind: "religion", title: "Öncül ile sonucun sınırını izle", context: `${v.start} ${v.rule} ${v.result} Bu hazırlanmış örnek öncüllerin doğru olduğunu ölçmez; yalnız çıkarımda verilen savları gösterir.`, question: "Seçili sonucun yeni nitelikleri için açık bir ek öncül var mı?",
   nodes, links, decision: ready ? "Geçiş açık" : "Ek dayanak yok", options: ["Geçiş açık", "Ek dayanak yok"],
   reason: ready ? "Savdaki geçiş için kullanılan öncüller görünür. Bu, onların doğru oluşunu ayrıca kanıtlamaz." : "İlk sonuç neden veya varlık içindir. Kişisellik ve mutlak iyilik yeni bir dayanak ister.",
   evidence: [`Başlangıç türü: ${v.type}.`, rich ? s.bridge ? "Ek öncül eklendi; onun doğruluğu da ayrıca tartışılır." : "Ek nitelikler var, fakat onlara ayrılan öncül boş." : "Seçili sav yalnız ilk sonuçla sınırlı.", "Argümanı tanımak, kişinin inancına puan vermek değildir."] };
 }
 if (lessonId === "siyaset-felsefesi") {
  bool021(s.power); bool021(s.law); bool021(s.rights); choice021(s.focus, ["force", "law", "justify"]);
  const focus = s.focus === "force" ? 0 : s.focus === "law" ? 1 : 2;
  const nodes: HumanitiesNode021[] = [
   { label: "Güç", text: s.power ? "Kurulun karar için uygulama araçları var." : "Kurulun bu karar için uygulama araçları yok.", active: s.power },
   { label: "Usul", text: s.law ? "Karar, bu kurgu kurumun mevcut usulüyle alındı." : "Karar, bu kurgu kurumun mevcut usulüne aykırı alındı.", active: s.law },
   { label: "Hak", text: s.rights ? "Eşit dinlenme ve bağımsız itiraz yolu, karar lehine açık hak gerekçeleri olarak verildi." : "Haklara uygunluk için gerekçe verilmedi; adil veya adaletsiz sonucu burada henüz kurulamaz.", active: s.rights },
   { label: "Karar", text: "Kurul ortak salonun kullanımını düzenliyor. Bu kurgu, gerçek kişi veya siyasal grubu puanlamaz." },
  ];
  return { kind: "politics", title: "Güç, usul ve haklılık sorularını ayır", context: "Bir kurgu kurul ortak salon için kullanım kuralı alıyor. Uygulama gücü, usule uygunluk ve haklara ilişkin gerekçe birbirinden ayrı ayrı değişebilir.",
   question: focus === 0 ? "Kurulun kararı uygulama gücü var mı?" : focus === 1 ? "Karar mevcut usule uygun mu?" : "Karar için hangi haklılık gerekçesi sunulmuş?",
   nodes, links: [0, 1, 2].map(from => ({ from, to: 3, label: from === focus ? "Sorunun odağı" : "Ayrı inceleme", active: true, focused: from === focus })),
   decision: ["Güç bilgisi", "Usul bilgisi", "Hak gerekçesi"][focus], options: ["Güç bilgisi", "Usul bilgisi", "Hak gerekçesi"],
   reason: focus === 0 ? "Sorulan fiilen uygulama imkânı; usul veya haklılık onun yerine cevap olamaz." : focus === 1 ? "Sorulan kurumun mevcut usulü; bu bilgi bütün haklılık itirazlarını tek başına kapatmaz." : "Soru normatif gerekçe ister. Güçlü olmak veya kurala uymak tek başına bu gerekçe değildir.",
   evidence: [nodes[focus].text, s.rights ? "Hak gerekçeleri verildi; bütün gerçek adalet sorunları yalnız bu iki koşuldan ibaret değildir." : "Gerekçe eksikliği, tek başına karşıt hükmün kesin ispatı değildir.", "Üç veri ayrı tutulur; otomatik siyasal veya ahlaki not üretilmez."] };
 }
 if (lessonId === "sanat-felsefesi") {
  choice021(s.lens, ["world", "artist", "form", "viewer"]); choice021(s.form, ["calm", "tense"]);
  const i = ["world", "artist", "form", "viewer"].indexOf(s.lens), tense = s.form === "tense";
  const nodes: HumanitiesNode021[] = [{ label: "Dünya", text: "Çizimdeki ağaç, dış dünyadaki ağaca bir gönderme olarak okunuyor." },
   { label: "Sanatçı", text: tense ? "Kurgu sanatçı gerilimi keskin çizgilerle ifade etmek istediğini söylüyor." : "Kurgu sanatçı sakinliği yumuşak çizgilerle ifade etmek istediğini söylüyor." },
   { label: "Biçim", text: tense ? "Keskin açılar ve yakın çizgilerden oluşan özgün düzen seçili." : "Yumuşak eğriler ve geniş boşluklar içeren özgün düzen seçili." },
   { label: "İzleyici", text: "Bir kurgu izleyici bu çizimin kendisinde uyandırdığı deneyimi anlatıyor; herkes için aynı etki iddia edilmiyor." },
   { label: "Eser", text: "Uygulama için çizilmiş özgün vektör eser. Seçili yaklaşım eserin hangi ilişkisini öne çıkarıyor?" }];
  const label = ["Temsil", "İfade", "Biçim", "Alımlama"][i];
  return { kind: "art", title: "Aynı eseri dört ilişkiyle incele", context: "Bu özgün ağaç çiziminde çizgi düzeni değişebilir. Yaklaşım seçimi dünya, sanatçı, biçim veya izleyici ile eser arasındaki ilişkinin hangisinin odağa alındığını değiştirir; güzelliğe otomatik not verilmez.", question: "Seçili açıklama eserin hangi ilişkisini öne çıkarıyor?", nodes,
   links: [{ from: i === 3 ? 4 : i, to: i === 3 ? 3 : 4, label, active: true }], art: { tense, lens: s.lens },
   decision: label, options: ["Temsil", "İfade", "Biçim", "Alımlama"],
   reason: ["Dünya ile eser arasındaki temsil ilişkisi soruluyor.", "Sanatçının yaşantısının eserde ifade bulması soruluyor.", "Eserin çizgi ve boşluk düzeni kendi ilişkileriyle inceleniyor.", "Eserin izleyicide yarattığı deneyim soruluyor."][i],
   evidence: [nodes[i].text, tense ? "Çizimde keskin açılar etkin; değişim gerçek vektör yoluna uygulanır." : "Çizimde eğriler etkin; değişim gerçek vektör yoluna uygulanır.", "Aynı eser birkaç açıdan okunabilir; bir yaklaşım diğerini zorunlu olarak silmez."] };
 }
 if (lessonId === "felsefi-okuma-ve-yazma") {
  const proof = support021(s.scope, s.evidence);
  const nodes: HumanitiesNode021[] = proof.rows.map(r => ({ label: r.name, text: r.known ? `${r.name} için mevcut saatte erişememe kaydı var.` : `${r.name} için bu örnekte veri henüz verilmedi.`, active: r.known }));
  nodes.push({ label: "Sav", text: s.scope === "some" ? "Bu beş kişilik grupta en az bir kişi mevcut saatte erişemiyor." : "Bu beş kişilik gruptaki beş kişinin tümü mevcut saatte erişemiyor." });
  return { kind: "reading", title: "Kanıt arttıkça savın kapsamını denetle", context: "Kurgu bir atölyede yalnız beş kişi var: Ece, Can, Ada, Ali ve Oya. Kayıtlar seçildikçe kimin mevcut saatte erişemediği görünür olur. Kayıt yok, o kişinin erişebildiği anlamına gelmez.", question: "Verilen kayıtlar, seçili betimleyici savın kapsamı için yeterli mi?",
   nodes, links: proof.rows.flatMap((r, from) => r.known ? [{ from, to: 5, label: "Açık kayıt", active: true }] : []), sample: proof.rows,
   decision: proof.supported ? "Kapsamı destekler" : "Kapsam yetmez", options: ["Kapsamı destekler", "Kapsam yetmez"],
   reason: proof.supported ? "Verilen kayıt sayısı seçili savın gerektirdiği kapsamı karşılıyor. Grup bu beş kişiyle sınırlı." : "Bir kişiye ait kayıt, bu beş kişinin tümü için aynı sonucu tek başına kurmaz.",
   evidence: [`Bilinen kayıt: ${proof.observed} / 5. Seçili sav için gereken: ${proof.required}.`, "Veri yokluğu karşıt durumun kanıtı sayılmaz.", "Bu kayıtlar betimleyici savı sınar; saatler uzatılmalı önerisi için ayrıca normatif gerekçe gerekir."] };
 }
 if (lessonId === "ilk-cag-felsefesi") {
  choice021(s.stage, ["shadow", "object", "outside"]);
  const target = ["shadow", "object", "outside"].indexOf(s.stage) + 1;
  const nodes: HumanitiesNode021[] = [{ label: "Bakan", text: "Bu anlatıdaki kişi seçili yöne bakıyor." },
   { label: "Gölge", text: "Duvara düşen görünüş ilk başta gerçekliğin bütünü sanılıyor." },
   { label: "Nesne", text: "Gölgeyi oluşturan taşınan nesne fark ediliyor." },
   { label: "Dışarı", text: "Alışılmış görünüşün ötesine yöneliş, daha kapsamlı kavrayış biçiminde ele alınıyor." }];
  return { kind: "ancient", title: "Mağarada bakışı ve yorumu izle", context: "Platon’un mağara anlatısının bu sade çiziminde gölge, onu oluşturan nesne ve dışarıya açılan yön ayrıdır. Bakış yönünü değiştirince hem ok hem vurgulanan kaynak değişir. Bu bir fizik deneyinin ideaları ispatlaması değildir.", question: "Seçili adımda hangi kavrayış düzeyi anlatılıyor?", nodes,
   links: [{ from: 0, to: target, label: "Seçili bakış", active: true }, { from: 2, to: 1, label: "Gölgenin kaynağı" }], cave: { stage: s.stage, target },
   decision: ["Duyusal görünüş", "Kaynağı fark etme", "Daha geniş bakış"][target - 1], options: ["Duyusal görünüş", "Kaynağı fark etme", "Daha geniş bakış"],
   reason: ["Kişi gölgeyi bütün gerçeklik sanıyor; görünüşe bağlı ilk durumu görüyoruz.", "Kişi görünüşün kaynağını ayırıyor; ilk kabulünün sınırı görünür oluyor.", "Bakış alışılmış alanın dışına yöneliyor; bu anlatıda eğitimle kavrayışın dönüşümü anlatılıyor."][target - 1],
   evidence: [nodes[target].text, "Şemadaki bakış oku Bakan kutusundan gerçekten seçili hedefe gider.", "Güneş ve iyi ideası arasındaki felsefi yorum, fiziksel çizimden ayrı kanıt ve savlarla tartışılır."] };
 }
 choice021(s.universal, ["separate", "in", "mind", "name"]);
 const which = s.universal, i = ["separate", "in", "mind", "name"].indexOf(which);
 const nodes: HumanitiesNode021[] = [{ label: "A ağacı", text: "Birinci tekil ağaç sabit kalır." }, { label: "B ağacı", text: "İkinci tekil ağaç sabit kalır." },
  { label: ["Ayrı tür", "Ortak form", "Zihin", "Ad"][i], text: ["Genel olan tekillerden bağımsız gerçeklik olarak ele alınıyor.", "Ortak doğa veya form bu iki tekil ağaçta yer alıyor.", "Genel olan zihinsel kavram statüsüyle ele alınıyor.", "Tekiller için kullanılan ortak adın dildeki işlevi öne çıkarılıyor."][i], root: which === "separate" }];
 return { kind: "medieval", title: "Tekiller sabit, tümelin statüsü farklı", context: "Aynı iki tekil ağaca ağaç diyoruz. Dört hazır yaklaşımda genel olanın nerede ve hangi statüde ele alındığı değişiyor. Şema fiziksel bir tür nesnesi bulma deneyi değil, felsefi görüşleri ayırma aracıdır.", question: "Seçili görüş ortak olanı hangi statüde açıklıyor?", nodes,
  links: [0, 1].map(n => ({ from: which === "separate" || which === "in" ? 2 : n, to: which === "separate" || which === "in" ? n : 2, label: which === "separate" ? "Bağımsız örnek" : which === "in" ? "Tekilde örneklenir" : which === "mind" ? "Zihinde genelleme" : "Ortak adla anılır", active: true })),
  decision: ["Ayrı gerçeklik", "Tekilde ortak form", "Zihinsel kavram", "Ortak ad"][i], options: ["Ayrı gerçeklik", "Tekilde ortak form", "Zihinsel kavram", "Ortak ad"],
  reason: ["Genel olan tekillerden ayrı bir gerçeklik olarak ele alınır; güçlü gerçekçi vurgu seçili.", "Ortak yapı tekillerde örneklenir; ılımlı gerçekçi vurgu seçili.", "Tümel zihinsel kavram olarak ele alınır; kavramcı vurgu seçili.", "Tekillerin ortak adla anılması öne çıkar; adcı vurgu seçili."][i],
  evidence: [nodes[2].text, "A ve B tekil olarak değişmez; değişen genel olanın açıklama statüsüdür.", "Etiketten önce açık tanımı oku. Tekildeki form ile zihindeki kavram aynı açıklama değildir."] };
}
