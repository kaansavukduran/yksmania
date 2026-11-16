import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
type TurkishGuide021 = LessonGuide & { title: string };
const guideSpecs021: TurkishGuide021[] = [
  {
    "id": "paragrafta-siralama",
    "title": "Paragrafta sıralama: cümlelerden düşünce yoluna",
    "minutes": 80,
    "objectives": [
      "Tam cümleleri anlam görevlerine ve açık göndermelerine göre sırala.",
      "Zaman, neden ve karşıtlık bağlarını birbirine karıştırmadan izle.",
      "Zorunlu çiftleri kurup yeni sıradaki bütün komşulukları denetle.",
      "İlk-son cümle ve yer değiştirme sorularında istenen numarayı doğru seç."
    ],
    "sections": [
      {
        "title": "Sıralamak, düşüncenin yolunu kurmaktır",
        "paragraphs": [
          "Bir paragraf yalnız aynı konuda kelimeler taşıyan bir cümle yığını değildir. “Görevli her deftere bir numara verdi.” cümlesi bir bilgiyi tanıtır; “Bu numara aranan defteri bulmayı kolaylaştırdı.” cümlesi o bilgiyi kullanır. İkinci cümledeki gönderme, ilk cümlede verilen bir dayanak ister. Sıralama sorusunda bu tür ilişkileri kurarak okurun düşünceyi izleyebileceği bir bütün oluşturursun.",
          "İlk okumada her cümleyi kısaca kendi sözlerinle adlandır: defterleri numaralama, numaranın işlevi, aramanın sonucu gibi. Sonra hangi bilginin hangi bilgiye ihtiyaç duyduğunu sor. Sadece cümlelerin uzunluğu veya aynı sözcüğün sayısı sıra vermez. Sıralama, cümlenin ne söylediği ile metinde hangi işi yaptığı birlikte okunduğunda anlam kazanır."
        ]
      },
      {
        "title": "Önce her cümlenin görevini gör",
        "paragraphs": [
          "Bir cümle kavramı tanıtır, bir başkası onu açıklar, üçüncüsü örnek verir veya bir sonuca ulaşır. Bu görevleri kısa notlara çevirmek çok sayıda ayrıntıyı aynı anda akılda tutma yükünü azaltır. “Eski kayıtları korumanın farklı yolları vardır.” genel bir alan açar; belirli bir arşivde uygulanan yöntemi anlatmak bu alanı somutlaştırabilir.",
          "Görevler her paragrafta tek bir zorunlu şablon oluşturmaz. Yazar örnekten genele gidebilir, sonucu önce söyleyip nedenini sonra açıklayabilir. Bu nedenle tanım her zaman birinci, örnek her zaman ikinci gibi bir sıra ezberleme. Hangi görevden hangisine geçildiğini metindeki açık ilişkiyle göster; hazır şablonu cümlelere zorla giydirme."
        ]
      },
      {
        "title": "Giriş adayının kendi dayanağı var mı?",
        "paragraphs": [
          "Bağımsız bir paragrafın girişi, konuyu okura ilk kez açabilmelidir. Tanımı verilen bir araç, tanıtılan bir kişi veya tartışmaya açılan genel bir yargı giriş adayı olabilir. “Bu işlem sonucu hızlandırdı.” gibi bir cümle ise işlem dışarıda bırakılmışsa okuru açıklanmamış bir bilgiyle karşı karşıya bırakır. Önce bu bilginin nerede tanıtıldığını ara.",
          "Bunu belirli sözcükler için değişmez bir yasak listesi yapma. “Yeni bir tarama yöntemi geliştirildi; bu yöntem silik yazıları belirginleştiriyor.” cümlesinde bu yöntem aynı cümlenin içindeki tanıtıma döner. Sorun sözcüğün varlığı değil, gereken öncülün okura verilmiş olup olmamasıdır. Adayın bütün cümlesini ve sorunun sunduğu bağlamı birlikte oku."
        ]
      },
      {
        "title": "Gönderme zincirini aynı nesneye bağla",
        "paragraphs": [
          "Bu yöntem, söz konusu belge, aynı süreç, o ve bunlar gibi ifadeler okuru daha önce tanıtılmış bir şeye götürebilir. Önce gönderme ifadesinin hangi nesne, düşünce veya olaya döndüğünü açık yaz. Bir numaradan söz edildikten sonra bu numara denmesi, yalnız kelime tekrarından daha belirli bir bağ kurar.",
          "En yakın kelimeyi otomatik öncül sayma. Bir cümlede kitap ve kitaplık birlikte geçiyorsa bu düzen sözünün hangisine döndüğünü yüklemin anlamı belirleyebilir. Ayrıca aynı ad başka bir kişi veya nesne için yeniden kullanılabilir. İki cümleyi birleştirdiğinde göndermenin hem dilbilgisel hem anlamsal olarak aynı şeyi işaret ettiğini kontrol et."
        ]
      },
      {
        "title": "Genel yargı ve örnek ilişkisini kur",
        "paragraphs": [
          "Bir genel yargı belirli bir özellik veya ilişkiyi kapsar; örnek bu yargıyı tek bir olayda görünür kılar. “Bazı müzeler erişimi çevrimiçi sunumla artırır.” yargısından sonra bir müzenin uzak ziyaretçiler için açtığı sayfa anlatılabilir. Örneğin sözü bu işlevi açıkça işaretleyebilir, fakat ilişki yalnız bağlaçtan ibaret değildir.",
          "Örnek olarak getirilen olayın genel yargının hangi yanını gösterdiğini bir cümlede açıkla. Konu ortak olsa bile bağımsız bir müze tarihçesi erişim savına örnek olmayabilir. Sıra kurarken örneğin dayanağını, örnekten sonra çıkarılan sonucun da kapsamını denetle. Tek bir örnekten bütün müzeler hakkında kesin yargı üretildiğini kendin ekleme."
        ]
      },
      {
        "title": "Tanımı açıklama ve ayrıntıdan ayır",
        "paragraphs": [
          "Tanım bir kavramın ne olduğunu belirler; açıklama onun nasıl işlediğini veya niçin önemli olduğunu açar. “Katalog, kayıtların düzenli listesidir.” cümlesi tanıtım sağlayabilir. Ardından listedeki başlıkların aramayı nasıl kolaylaştırdığı anlatılırsa ilk kavramın işlevi geliştirilmiş olur. Ayrıntılar bu temel ilişkiden kopmadan eklenmelidir.",
          "Bir metin tanımı sonradan da verebilir; bu durumda önceki cümlenin tanımsız kalıp kalmadığını ve yazarın gerçekten bir soruyu açıklayıp açıklamadığını oku. Sadece isim cümlesi gördüğün için onu başlangıca koyma. Kısa bir ayrıntı tanım gibi görünebilir; cümlenin kavramın sınırını mı çizdiğini yoksa tek özelliğini mi anlattığını ayır."
        ]
      },
      {
        "title": "Neden ile sonuç her zaman aynı yönde sunulmaz",
        "paragraphs": [
          "“Elektrik kesildi. Bu yüzden ölçüm yarıda kaldı.” dizisinde neden önce, sonuç sonra gelir. “Ölçüm yarıda kaldı; çünkü elektrik kesildi.” ifadesinde ise sonuç önce söylenir, ardından gerekçe verilir. İki anlatımda da temel ilişki elektrik kesintisi ile ölçümün durması arasındadır; yalnız sunuş sırası farklıdır.",
          "Sıralama yaparken olayın hangi sırada gerçekleştiği ile yazarın onu hangi sırada anlattığını ayrı tut. Çünkü, bu nedenle ve dolayısıyla gibi bağların hangi yargıyı desteklediğini belirle. Her nedeni zorla sonuçtan önce taşımak, çünkü ile kurulmuş bir açıklamayı bozabilir. Metnin bağını ve cümle biçimini koruyarak ilerle."
        ]
      },
      {
        "title": "Karşıtlık, önce bir beklenti kurar",
        "paragraphs": [
          "“Salon küçüktü. Buna rağmen katılım yüksekti.” dizisinde ilk durumun düşündürdüğü beklenti ile ikinci durum arasında terslik vardır. Buna rağmen ifadesini anlamak için hangi engel veya beklenen sonucun aşıldığını bul. Oysa, ancak ve fakat da bağlama göre karşıtlık, düzeltme veya sınırlama ilişkileri kurabilir.",
          "Bağlaç adını söylemek sıra için tek başına yetmez. Aynı paragrafta birden fazla engel veya görüş olabilir; karşıtlığın hangi yargıya yöneldiği açık olmalıdır. Ayrıca ancak sözü yalnız anlamında da kullanılabilir. Cümlenin tamamını kendi sözlerinle yeniden söyleyip hangi beklentinin değiştiğini göster; etiket yerine ilişkiyi kanıtla."
        ]
      },
      {
        "title": "Ek bilgi, gerekçeyi pekiştirebilir",
        "paragraphs": [
          "Ayrıca, üstelik, dahası gibi ifadeler çoğu kez aynı düşünce yönünde yeni bir bilgi getirir. “Yöntem daha hızlıdır. Üstelik daha az malzeme kullanır.” dizisinde iki özellik yöntemi değerlendirmede birlikte rol oynar. İkinci cümle birincinin tersini değil, ona ek bir dayanağı sunar.",
          "Yine de aynı yöntemin anlatıldığını ve yeni bilginin ana konuya bağlı kaldığını denetle. Üstelik sözcüğünün bulunması her cümlenin herhangi bir öncekinin yanına konabileceğini göstermez. Yeni özellik hangi değerlendirmeyi destekliyor? Bu soruya açık cevap verebiliyorsan eklemenin düşünce akışındaki yerini de daha güvenilir belirleyebilirsin."
        ]
      },
      {
        "title": "Zaman işaretlerini anlatımın yönüyle oku",
        "paragraphs": [
          "Bir olay dizisinde önce, ertesi gün, üç saat sonra gibi ifadeler önemli bağlar kurar. İlk taslak tamamlanmadan bu taslağın ertesi gün denenmesi anlatılamaz; gönderme ve zaman birlikte çalışır. Tarihler veya aşama adları verildiğinde bunları kısa bir olay çizelgesine dönüştürmek cümleleri bağlamayı kolaylaştırır.",
          "Her metni yalnız küçük tarihten büyüğe sıralama. Yazar bugün gördüğü bir sonuçtan geçmişteki hazırlığa dönebilir; yıllar önce veya geriye bakınca gibi işaretler bu dönüşü açıklar. Burada doğru sıra, takvim sayılarının kendisi değil anlatımın kurduğu yöndür. Açık dönüş işaretini atlayarak bütün geçmiş cümleleri başa almak anlam bağını koparabilir."
        ]
      },
      {
        "title": "Kişi, kip ve anlatıcı bağını koru",
        "paragraphs": [
          "Aynı olayın anlatımında ben, biz ve o gibi kişi işaretleri kimin konuştuğunu ve eylemi kimin yaptığını belirler. Birinci cümlede görevlilerin yaptığı iş, sonraki cümlede onların sonucu olarak anlatılabilir. Aynı özneye dönen ifadeleri izlemek, yanlış kişiyle kurulmuş geçici eşleşmeleri elemeye yardım eder.",
          "Kip uyumu bütün yüklemlerin aynı eki taşıması değildir. Yazar geçmişte yapılan işi, bugün görülen etkisini ve yarın planlanan adımı birlikte anlatabilir. Önemli olan bu geçişlerin zaman işaretleri ve anlamla açıklanmasıdır. Nedensiz kişi veya zaman sıçramasını fark et; anlamlı geçişi de sırf ekler farklı diye bozuk sayma."
        ]
      },
      {
        "title": "Zorunlu çiftlerden küçük bloklar kur",
        "paragraphs": [
          "Cümlenin ihtiyaç duyduğu belirli bir öncül varsa iki cümleyi geçici bir blok olarak düşünebilirsin. Önce yöntemin tanıtıldığı, sonra bu yöntem diye işlevinin açıklandığı çift böyle bir adaydır. Ardından bu bloğun önüne ve arkasına hangi görevlerin bağlandığını araştırırsın. Bu yöntem çok seçenekli soruda deneme sayısını azaltabilir.",
          "Blok kesinliğini kanıta göre kur. Her gönderme mutlaka bir önceki cümleye dönmez; arada anlamı bozmayan bir açıklama bulunabilir. Bu yüzden sadece aynı kelimeyi gördüğün için iki cümleyi ayrılmaz ilan etme. Kurduğun çiftin neden zorunlu veya kuvvetli olduğunu belirt, sonra bütün sıra içinde gerçekten çalışıp çalışmadığını yeniden denetle."
        ]
      },
      {
        "title": "Yer değiştirme sorusunda kalan bağları da denetle",
        "paragraphs": [
          "Bazı sorular bütün sırayı kurmanı değil, yerleri değişen iki cümleyi bulmanı ister. Önce mevcut dizide kopan bağı saptarsın, sonra olası değişikliği yapıp her yeni komşuluğu okursun. Bir çifti düzeltirken başka bir gönderme veya neden ilişkisini bozmuşsan çözüm tamamlanmış değildir.",
          "İstenen cevabın biçimine dikkat et: ilk cümle, son cümle, üçüncü sıradaki cümle veya yer değiştiren iki numara farklı görevlerdir. Doğru paragrafı zihninde kurup yanlış sıradaki numarayı işaretlemek bilgi hatası değil görev okuma hatası olabilir. Son adımda kurduğun sırayla soru kökünü yeniden eşleştir."
        ]
      },
      {
        "title": "Son denetim bütün metni kapsar",
        "paragraphs": [
          "Aday sırayı bulduğunda cümleleri baştan sona bir kez kesintisiz oku. Her gönderme açık bir öncül buluyor mu, her örnek ilgili yargıyı destekliyor mu, neden ve sonuç aynı olayda mı kalıyor? Önceki küçük eşleşmelerin toplamı, ancak bu bütünsel denetimle tutarlı bir paragraf hâline gelir.",
          "İki aday kalırsa ayrıldıkları ilk bağı bul ve somut farkı açıkla. Birinde tanıtılmamış bir nesne, diğerinde doğru karşılanan gönderme varsa güçlü ayırt edici kanıt budur. Kararı yalnız kulağa hoş gelmeye bırakma. Sonucun neden uygun olduğunu söyleyebilmek, benzer görünen yeni bir metinde de aynı yöntemi kullanmanı sağlar."
        ]
      }
    ],
    "examples": [
      {
        "title": "Öncülü bul, sonucu bağla",
        "prompt": "A: Bu dizine her kaydın tarihi ve konuşmacısı yazıldı. B: Ekip eski ses kayıtları için bir dizin hazırladı. C: Böylece tarihini bilen dinleyici ilgili konuşmayı bulabildi. Bu üç cümleyi sırala.",
        "strategy": "Önce hangi cümlenin tanıtım yaptığını, sonra gönderme ve sonuç ilişkisini bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "B dizini ilk kez tanıtır. A’daki bu dizin sözü bu tanıtıma döner; bu yüzden B, A’dan önce gelmelidir."
          },
          {
            "label": "2. adım",
            "explanation": "A tarih ve konuşmacı bilgisinin eklenmesini anlatır. C’de tarihi bilen kişinin kaydı bulması, bu eklenen bilgiyle açıklanır."
          },
          {
            "label": "3. adım",
            "explanation": "B → A → C sırasını tam oku: dizin hazırlanır, ilgili bilgiler yazılır, arama kolaylaşır. Her iki bağ aynı nesne ve amaç içinde kalır."
          }
        ],
        "answer": "Doğru sıra B → A → C.",
        "check": "Tanıtım-gönderme ve eklenen bilgi-sonuç bağları birlikte kuruldu.",
        "pitfall": "Yalnız eski ses kaydı sözcüklerine bakıp sonucunu tanıtımdan önce koyma."
      },
      {
        "title": "Çünkü ile sunulan nedeni izle",
        "prompt": "A: Onarım bitince yeni açılış günü duyuruldu. B: Müzenin açılışı ertelendi. C: Çünkü giriş kapısı onarımdaydı. Metni uygun sıraya koy.",
        "strategy": "Olay zamanı ile cümlede gerekçenin sunuluş sırasını ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "B bir durum bildirir: açılış ertelenmiştir. C çünkü ile bu ertelemenin nedenini verir."
          },
          {
            "label": "2. adım",
            "explanation": "A’daki onarım, C’de tanıtılan kapı onarımına döner; bittiği zaman yeni tarih duyurulur. Bu yüzden A, C’den sonra gelmelidir."
          },
          {
            "label": "3. adım",
            "explanation": "B → C → A dizisi önce ertelemeyi söyler, ardından gerekçeyi açıklar, sonra sorunun bitişini anlatır. Nedeni ilk cümleye zorla taşımaya gerek yoktur."
          }
        ],
        "answer": "Doğru sıra B → C → A.",
        "check": "Çünkü kendinden önceki erteleme yargısını açıklar; onarım bitişi bundan sonraki adımdır.",
        "pitfall": "Her nedeni anlatımda mutlaka en başa taşıyan takvim sırası kullanma."
      },
      {
        "title": "Açık geçmişe dönüşü koru",
        "prompt": "A: Bugün geçen kış hazırladığım taslağı yeniden açıyorum. B: O kış ilk deneme iyi gitmemiş, düzeltme notlarını sayfanın kenarına yazmıştım. C: Bu eski notlar, şimdi hangi adımı değiştirmem gerektiğini gösteriyor. Bu metnin sırası nedir?",
        "strategy": "Geçmişteki olayın tarihinden önce onun anlatıda nasıl açıldığını incele.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A şimdiki eylemi ve geçen kış bilgisini tanıtır. B’deki o kış ifadesi bu bilgiye döner; ayrıca notların nasıl oluştuğunu açıklar."
          },
          {
            "label": "2. adım",
            "explanation": "C’deki bu eski notlar sözü B’ye bağlanır; şimdi ifadesi okuru yeniden bugünkü karara getirir."
          },
          {
            "label": "3. adım",
            "explanation": "A → B → C sırası bugün-geçmiş-bugün yönünü açık işaretlerle kurar. B’yi sırf daha eski olduğu için başa almak o kış göndermesini dayanıksız bırakır."
          }
        ],
        "answer": "Doğru sıra A → B → C.",
        "check": "Metnin zaman sıçramaları açıkça işaretlidir; kronolojik olmayan anlatım yine tutarlıdır.",
        "pitfall": "Bütün metinleri yalnız en eski olaydan en yeniye doğru sırala."
      },
      {
        "title": "Yer değiştirmede bütün komşuları denetle",
        "prompt": "I: Ekip küçük bir sözlük hazırlamaya başladı. II: Listedeki her madde için bir kullanım örneği eklendi. III: Bu anlamlar daha sonra alfabetik listeye yazıldı. IV: İlk olarak açıklanacak sözcüklerin anlamları belirlendi. V: Sonunda sözlüğün ilk deneme sürümü tamamlandı. Hangi iki cümle yer değiştirmeli?",
        "strategy": "Anlamları belirleme, listeleme, örnek ekleme ve bitirme zincirini kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "IV ilk adımı ve anlam bilgisini verir. III’teki bu anlamlar ifadesi onun ardından gelir."
          },
          {
            "label": "2. adım",
            "explanation": "II listedeki maddeye döner; bu liste III’te oluşur. Son cümle hazırlanan sürümün tamamlanmasıdır."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni sıra I → IV → III → II → V olmalıdır. Mevcut II ve IV yer değiştirince bu sıra oluşur; bütün yeni komşular birlikte doğrulanır."
          }
        ],
        "answer": "II ile IV yer değiştirmelidir.",
        "check": "IV → III anlam-gönderme; III → II liste-gönderme; V kapanış bağını korur.",
        "pitfall": "Bir çifti düzeltirken listedeki sözünün yeni sırada hâlâ tanıtılmış olup olmadığını unutma."
      }
    ],
    "recall": [
      {
        "prompt": "Gönderme sözcüğü gördüğünde önce hangi soruyu sorarsın?",
        "answer": "Bu söz hangi nesne, düşünce veya olaya dönüyor ve o bilgi metinde nerede tanıtılıyor? En yakın sözcük otomatik doğru öncül değildir."
      },
      {
        "prompt": "Neden her zaman anlatımın başında mı bulunur?",
        "answer": "Hayır. Sonuç önce söylenip çünkü ile neden sonra açıklanabilir; olay sırası ile sunuş sırası farklıdır."
      },
      {
        "prompt": "Tarih sırasına uymayan her paragraf bozuk mudur?",
        "answer": "Hayır. Açık bir geriye dönüş veya zaman geçişi varsa bugün-geçmiş-bugün gibi tutarlı bir anlatım kurulabilir."
      },
      {
        "prompt": "Bir zorunlu çift bulunca iş tamamlanır mı?",
        "answer": "Hayır. Yeni sıradaki bütün komşulukları, göndermeleri ve kapanışı tam metin içinde denetlemek gerekir."
      }
    ],
    "source": "Aurelia TYT Türkçe 025–027 kopya kâğıtları, MEBİ TYT Türkçe Paragrafın Yapısı bölümü ve OGM Paragrafta Yapı ve Anlam sunusuyla karşılaştırılarak hazırlanmış özgün anlatım ve sorular. Metin bağları, kapsam ve soru kökü birlikte incelenir; alıştırmalar resmî sınav sorusu değildir."
  },
  {
    "id": "paragrafta-cumle-ekleme",
    "title": "Paragrafta cümle ekleme: iki yana köprü kur",
    "minutes": 80,
    "objectives": [
      "Eklenecek cümlenin görevini ve gerekli öncülünü açıkla.",
      "Her aday yerde sol ve sağ bağlantıyı birlikte denetle.",
      "Gönderme, karşıtlık, zaman ve kapsam bağlarını tam metinden göster.",
      "Cümleden önce-sonra ve boşluk numarası ayrımını doğru uygula."
    ],
    "sections": [
      {
        "title": "Yeni cümle bütünde ne yapacak?",
        "paragraphs": [
          "Cümle ekleme sorusunda var olan metne yeni bir yargı yerleştirirsin. Önce bu yargının işini belirle: bir kavram mı tanıtıyor, örnek mi veriyor, önceki olaya neden mi açıklıyor? Görevini anladığında nerede gerekli olabileceğini de araştırabilirsin. Cümlenin yalnız bir sözcüğünü değil bütünüyle ne söylediğini oku.",
          "Örneğin “Bu numara ilk kaydın yanına yazıldı.” cümlesi hem bir numaraya hem bir kayda dayanır. Metinde sadece kayıt sözcüğünün geçmesi yeterli değildir; numaranın hangi cümlede üretildiğini ve ardından ne anlatıldığını da incelemelisin. İyi bir yerleştirme, yeni cümleyi komşularıyla birlikte anlaşılır kılar."
        ]
      },
      {
        "title": "Soru kökü konumu nasıl adlandırıyor?",
        "paragraphs": [
          "“Hangi cümleden sonra?” sorusunda işaretlediğin numara eklenen cümleden önceki eski cümleyi gösterir. “Hangi boşluğa?” sorusunda ise doğrudan konum istenir. Yer zihninde doğru olsa bile bu iki gösterimi birbirine karıştırabilirsin. Başlangıçta neyi numaralandıracağını kısa bir notla belirle.",
          "Yeni cümle II ile III arasına gelecekse II’den sonra ve III’ten önce aynı konumu anlatır. Ancak cevap seçenekleri bunlardan yalnız bir biçimi soruyor olabilir. Önce konumu çiz, sonra soru kökünün istediği adı ver. Böylece dil bağı çözümünü numara hatasıyla kaybetmezsin."
        ]
      },
      {
        "title": "Sol bağlantıda gereken bilgiyi ara",
        "paragraphs": [
          "Eklenecek cümle bu araç, aynı işlem, onun veya böylece gibi sözler taşıyorsa önce hangi bilgiyi gerektirdiğini sor. “Bu araç ışığı kaydediyor.” ifadesinde aracın tanıtılması beklenir. Tanıtım bazen hemen önce, bazen daha eski bir cümlede bulunabilir; gerçek öncülün kim olduğunu anlam belirler.",
          "En yakın isim her zaman doğru dayanak değildir. Aynı metinde iki araç varsa bu aracın hangisinin görevini sürdürdüğünü yüklemden çıkar. İlk geçici yerleştirmeyi bu bilgiyle kur, fakat burada durma. Yeni cümlenin ardından gelen yargı, bu seçimin neden yeterli olmadığını gösterebilir."
        ]
      },
      {
        "title": "Sağ bağlantı yeni cümleden ne bekliyor?",
        "paragraphs": [
          "Sonraki cümlede “Bu değer tabloya yazıldı.” deniyorsa önce bir değerin elde edilmesi gerekir. Eklenecek cümle sensörün belirli bir sonuç gösterdiğini söylüyorsa bu gereği karşılayabilir. Burada sağ komşu, yeni cümledeki bilginin niçin bu konumda gerekli olduğunu gösterir.",
          "Aynı sonuç başka bir yerde de geçebilir; bu nedenle yalnız değer sözcüğünün yakınlığına bakma. Değerin hangi ölçüme ait olduğunu, zamanını ve kullanılan nesneyi eşleştir. Eklenecek cümle yeni bilgi üretirken ardından gelen cümlenin o bilgiyle ne yaptığını izlemek, tek taraflı eşleşmeden daha güçlü bir kanıttır."
        ]
      },
      {
        "title": "İki bağı aynı anda sınayan üçlü kur",
        "paragraphs": [
          "Aday yeri bulduğunda önceki cümle, eklenen cümle ve sonraki cümleyi tek bir küçük metin olarak oku. İlk bağlantı yeni yargıyı hazırlar; ikinci bağlantı onun devamda nasıl kullanıldığını gösterir. Bu üçlü denetim, bir tarafı uygun olduğu için erken verilen kararları azaltır.",
          "Bir cümle öncekiyle konu bakımından uyabilir ama sonrakinin zamirini karşılamayabilir. Başka bir konumda ise sonrakiyle güzel bir bağ kurarken kendisi tanıtılmamış bir nesneye dayanabilir. Doğru yer, iki gereği birlikte sağlamalı ve metnin kalanını da bozmamalıdır. Her iki yönde açık kanıt aramayı alışkanlık hâline getir."
        ]
      },
      {
        "title": "Tanım ve örneğin ilişkisini yerleştir",
        "paragraphs": [
          "Tanım veya genel yargıdan sonra verilen örnek, kavramın belirli bir durumda nasıl göründüğünü açabilir. Eklenecek cümle “Örneğin...” diye başlıyorsa neyi örneklediğini göster. Metinde aynı konu adı bulunması, cümlenin her yere örnek olarak eklenebileceği anlamına gelmez.",
          "Örneğin ardından gelen bir açıklama da yeni örneğe dönüyor olabilir. O zaman yeni cümlenin solunda genel dayanak, sağında örneğin açılımı bulunur. Bu yapıyı kurarken örneği metnin ana savı yerine geçirme. Bir tek olayı gösteren cümleyi bütün durumların kesin kanıtı gibi okumak kapsamı genişletir."
        ]
      },
      {
        "title": "Karşıtlıkta hangi beklenti değişiyor?",
        "paragraphs": [
          "“Ancak bu yöntem her belgede işe yaramadı.” cümlesi daha önce yöntemin yararını veya beklentisini düşündüren bir bilgi ister. Sonraki cümle de bu sınırın nedenini açıklayabilir. Yeni yargı, iki olumlu cümlenin arasına rastgele yerleştirilmiş karşıtlık etiketi değil, belirli bir beklentiye cevaptır.",
          "Ancak, oysa ve buna rağmen sözlerinin hangi düşünceye yöneldiğini kendi cümlenle belirt. Birden fazla yöntem varsa karşıtlığın aynı yöntemi sürdürmesi gerekir. Ayrıca ancak sözcüğü kimi bağlamda yalnız anlamındadır. Konumu bağlacın adına göre değil, tam cümlede üstlendiği işleve göre seç."
        ]
      },
      {
        "title": "Neden, sonuç ve aracı adımı ayır",
        "paragraphs": [
          "Bir yol kapanıyor, ulaşım daha sonra normale dönüyor. Bu iki olay arasında geçici yan yolun açılması gibi bir aracı adım anlatılabilir. Eklenecek cümle, ilk olayın doğurduğu güçlüğe karşı ne yapıldığını açıkladığında sonraki sonuca geçiş anlaşılır hâle gelir.",
          "Bu bağı kurarken yalnız olayların ortak yerde geçmesine bakma. Aracı işlem gerçekten aynı sorunu çözüyor mu, önce yapılması gereken bir adımı atlıyor mu? Yazar sonucu önce verip çünkü ile nedeni de açıklayabilir. Anlatımın seçtiği yönü ve zaman işaretlerini koruyarak yeni cümlenin köprü görevini belirle."
        ]
      },
      {
        "title": "Paralel bilgilerin dengesini koru",
        "paragraphs": [
          "Bir metin iki yöntemi karşılaştırıyorsa birinci yöntem ve ikinci yöntem cümleleri birbirini hazırlar. “İlk yöntem kısa sürede sonuç verdi.” cümlesi, “İkinci yöntem ise daha az malzeme gerektirdi.” cümlesinden önce belirli bir işlev üstlenebilir. Önce iki yöntemin ne olduğunun tanıtılması da gerekebilir.",
          "Birinci ve ikinci sözleri yalnız sayısal etiket değildir; karşılaştırmanın hangi sırada açıldığını gösterir. Yeni cümleyi ekledikten sonra aynı yöntem iki farklı kişiyle karışıyor mu veya ikinci bilgi birinci tanıtılmadan mı geliyor, kontrol et. Karşılaştırılan özelliğin zaman, maliyet veya sonuç olduğuna da dikkat ederek paralelliği koru."
        ]
      },
      {
        "title": "Kişi ve nesne göndermesini birlikte izle",
        "paragraphs": [
          "Bir görevlinin hazırladığı taslağı bir ekip daha sonra sınayabilir. Yeni cümlede onlar, onun taslağı veya bu ekip gibi ifadeler varsa kimin hangi işi yaptığını açık tutman gerekir. Aynı eylem fiilinin tekrarı, öznenin de aynı olduğunu tek başına göstermez.",
          "Yerleştirdiğin cümlenin kişisi bir önceki yargıdan anlaşılabilir görünse bile sağ komşunun başka bir kişiye dönüp dönmediğini oku. Eksik özne günlük dilde bağlamdan tamamlanabilir; fakat soruda bu bağlam verilmiş olmalıdır. Anlatıcıyı sebepsiz değiştiren bir adayla metni açıklamak yerine metne yeni bilgi katmış olabilirsin."
        ]
      },
      {
        "title": "Zaman ve kip geçişini anlamla denetle",
        "paragraphs": [
          "Eklenecek cümle yapılan bir denemeden söz ediyorsa o denemenin hazırlığı ve sonucuyla zaman bakımından bağdaşmalıdır. İlk gün toplanan veriye ertesi gün dönülmesi mümkündür; yarın yapılacağı söylenen işlemin dün tamamlanmış sonucu gibi sunulması ise ek açıklama ister. Zaman sözlerini işaretleyerek olayı yeniden kur.",
          "Bütün yüklemlerin aynı kipte olması zorunlu değildir. Geçmişteki bir değişikliğin bugünkü etkisi veya gelecekte yapılacak kontrolü anlatılabilir. Burada uyum, eklerin görsel benzerliği değil anlatının açıklanabilir oluşudur. Anlamlı zaman geçişini bozuk sayma; açıklamasız sıçramayı da yalnız konu aynı diye kabul etme."
        ]
      },
      {
        "title": "Kapsamı yeni cümleyle büyütme",
        "paragraphs": [
          "Metin yalnız bazı belgelerin taranmasını anlatıyorsa “Bütün belgeler artık erişime açıldı.” cümlesi ek bir iddia getirir. Aynı sözcükleri taşıdığı için uygun görünse bile belirtilen kapsamı aşar. Kişi, yer, zaman ve nicelik sınırlarını yeni cümlenin kendi yargısıyla karşılaştır.",
          "Bir aday gerçek dünyada doğru olabilir; yine de bu paragraftaki eksik bağı kurmayabilir. Cümle ekleme sorusu dışarıdan en ilginç bilgiyi seçmek değildir. Metin hangi yargıyı kuruyor ve yeni cümle bu yargının neresinde işe yarıyor, bunu kanıtla. Doğru bilgi ile doğru konum aynı kavram değildir."
        ]
      },
      {
        "title": "İki aday kalınca ayrıldıkları bağı bul",
        "paragraphs": [
          "Bir yöntem metinde iki kez anılmış olabilir; bu yüzden sol bağlantı iki yerde de mümkün görünebilir. Bu durumda her adayın sağ komşusunu ayrı oku. Birinde sonraki yargı yeni cümlede üretilen sonucu kullanıyor, diğerinde ise başka bir olaya geçiyorsa ayırt edici fark görünür olur.",
          "Geçici uygunlukla kesin yerleştirmeyi ayır. Adayları neden elediğini kısa bir gerekçeyle söyle: burada numara henüz yok, burada karşıtlığın hedefi farklı gibi. Böylece sezgiyle rastgele seçim yapmak yerine iki konumun somut farkına dayanırsın. Son kararın ardından paragrafın tamamını da bir kez oku."
        ]
      },
      {
        "title": "Son çözümde cümle ve konumu birlikte göster",
        "paragraphs": [
          "Tam çözüm yalnız II gibi bir numara değildir. “Yeni cümle numarayı üretir; önce alet hazırlanır, sonra bu numara tabloya kaydedilir. Bu yüzden II’den sonra gelir.” biçiminde iki yönlü gerekçe kurabilmelisin. Sayısal cevap bu anlam ilişkisini özetler.",
          "İşaretlemeden önce soru kökünü son kez oku: hangi cümleden sonra mı, önce mi, hangi konuma mı? Metni doğru tamamlayıp ters komşunun numarasını seçme. Yöntemini anlatabilmek, farklı sözcüklerle yazılmış yeni bir soruda da cümlelerin gerçek görevini izlemeni sağlar; yalnız önceki sorunun cevabını ezberlemiş olmazsın."
        ]
      }
    ],
    "examples": [
      {
        "title": "Ölçülen değeri sağ komşuya hazırla",
        "prompt": "I: Ekip yeni bir sensörü denemeye aldı. II: Ölçümden önce aletin ayarı yapıldı. III: Bu değer ilk günün tablosuna işlendi. IV: Tablo gün sonunda ekiple paylaşıldı. Eklenecek cümle: “İlk ölçümde sensör 22 °C gösterdi.” Hangi cümleden sonra eklenmeli?",
        "strategy": "Ayar → ölçüm → değeri yazma sırasını ve bu değer göndermesini birlikte kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ölçümün önceki hazırlığı II’de verilir. Yeni cümle ayarı yapılmış sensörün ölçtüğü sonucu tanıtır."
          },
          {
            "label": "2. adım",
            "explanation": "III’teki bu değer sözü yeni cümledeki 22 °C bilgisini gerektirir; onu henüz tanıtmadan tabloya yazma adımı eksik kalır."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni cümle II ile III arasına yerleşir. Soru sonra dediği için cevap II olur; III’ten önce de aynı yeri anlatır."
          }
        ],
        "answer": "II. cümleden sonra.",
        "check": "Sol bağ hazırlık-ölçüm; sağ bağ ölçülen değer-kayıt ilişkisidir.",
        "pitfall": "Doğru yeri bulduktan sonra III numarasını sonra sorusunun cevabı diye işaretleme."
      },
      {
        "title": "Başta gerekli tanıtımı sağla",
        "prompt": "I: Bu kayık, kıyıdaki dar iskeleye kolayca yanaştı. II: İçindeki kasalar sırayla boşaltıldı. III: Boşalan kayık yeniden denize açıldı. Eklenecek cümle: “Balıkçılar kıyıya küçük bir kayık getirdi.” Bu cümle nereye gelmeli?",
        "strategy": "İlk cümlenin hangi nesneyi dışarıdan beklediğini bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "I’deki bu kayık ifadesi önceden tanıtılmış kayığı gerektirir. Yeni cümle bu nesneyi ve onu getiren kişileri tanıtır."
          },
          {
            "label": "2. adım",
            "explanation": "II ve III kayığın yanaşmasından sonraki boşaltma ve dönüş adımlarıdır. Tanıtımı onların arasına koymak ilk gönderme sorununu çözmez."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni cümle parçanın başına, I’den önce gelmelidir. Böylece geliş-yanaşma-boşaltma-dönüş süreci açık bir bütün olur."
          }
        ],
        "answer": "Parçanın başına, I. cümleden önce.",
        "check": "Önce kayık tanıtılır; ardından bu kayık sözü ve sonraki olaylar dayanağını bulur.",
        "pitfall": "Aynı kayık sözcüğü geçtiği için cümleyi herhangi bir komşuluğa uygun sayma."
      },
      {
        "title": "Karşıtlığı iki yöne bağla",
        "prompt": "I: Ekip görüntüyü netleştiren yeni bir filtre tasarladı. II: İlk denemede birçok ayrıntı daha kolay görüldü. III: Bu sınırlama nedeniyle güçlü ışık için ayrı bir ayar hazırlandı. IV: İki ayar son denemede birlikte karşılaştırıldı. Eklenecek cümle: “Ancak güneş çok güçlü olduğunda filtre bazı ayrıntıları sildi.” Yeri nedir?",
        "strategy": "Olumlu beklentinin sınırını ve ardından o sınıra verilen cevabı ara.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "II filtrenin yararını gösterir. Yeni cümledeki ancak, bu olumlu beklentiyi belirli bir ışık koşuluyla sınırlar."
          },
          {
            "label": "2. adım",
            "explanation": "III’teki bu sınırlama sözü güçlü ışıkta ayrıntı kaybına döner. Yeni cümle başka yere konursa bu açık öncül eksik kalır."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni cümle II’den sonra, III’ten önce gelmelidir. Üçlüde yarar-sınır-çözüm yönü birlikte kurulur."
          }
        ],
        "answer": "II. cümleden sonra.",
        "check": "Sağ komşunun sınırlama sözü, sol komşunun yararıyla kurulan karşıtlığı doğrular.",
        "pitfall": "Filtre adı metnin başında var diye yalnız ilk tanıtımın yanına yerleştirme."
      },
      {
        "title": "İki yöntemi paralel sun",
        "prompt": "I: Araştırma için iki yöntem belirlendi. II: İkinci yöntem ise daha az malzeme gerektiriyordu. III: Ekip bu iki özelliği işin gereğiyle karşılaştırdı. IV: Son seçim deneme süresine göre yapıldı. Eklenecek cümle: “İlk yöntem daha kısa sürede sonuç veriyordu.” Nereye gelmeli?",
        "strategy": "Birinci-ikinci karşılaştırmasının hangi bilgiyi beklediğini göster.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "I iki yöntemi tanıtır. Yeni cümle birinci yöntemin hız özelliğini sunar; bu tanıtımdan sonra anlaşılır."
          },
          {
            "label": "2. adım",
            "explanation": "II ikinci yöntemi ise ile karşılaştırır. III’teki iki özellik hız ve az malzeme bilgisidir; ikisinin de önceden verilmesi gerekir."
          },
          {
            "label": "3. adım",
            "explanation": "Bu yüzden cümle I’den sonra eklenir. Yeni üçlüde iki yöntem açılır, ilkinin özelliği ve ikincinin farklı üstünlüğü söylenir."
          }
        ],
        "answer": "I. cümleden sonra.",
        "check": "Karşılaştırma ve iki özellik göndermesi aynı yerleştirmeyi destekler.",
        "pitfall": "İkinci yöntem daha önce söylenebilir diye bu bağlamdaki ise ve iki özellik ilişkisini yok sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Eklenecek cümle öncekiyle uyuyorsa neden yeterli değildir?",
        "answer": "Sonraki cümlenin gerektirdiği bilgi veya göndermeyi de karşılamalıdır; doğru konum iki bağı birlikte kurar."
      },
      {
        "prompt": "II ile III arasına gelen cümle için II’den sonra ve III’ten önce aynı yer midir?",
        "answer": "Evet. Fakat cevapta hangi numaranın isteneceğini soru kökü belirler; konum ile işaretlenecek komşu ayrılmalıdır."
      },
      {
        "prompt": "Aynı ad iki konumda geçiyorsa ne yaparsın?",
        "answer": "Hangi nesne veya yöntemin sürdüğünü ve sağ komşunun ne istediğini araştırırım; ortak kelime tek kanıt değildir."
      },
      {
        "prompt": "Gerçek dünyada doğru bir cümle bu parçaya uygun olmayabilir mi?",
        "answer": "Evet. Verilen bağlamdaki eksik işi yapmalı, kişi-zaman-kapsamı ve düşünce yönünü korumalıdır."
      }
    ],
    "source": "Aurelia TYT Türkçe 025–027 kopya kâğıtları, MEBİ TYT Türkçe Paragrafın Yapısı bölümü ve OGM Paragrafta Yapı ve Anlam sunusuyla karşılaştırılarak hazırlanmış özgün anlatım ve sorular. Metin bağları, kapsam ve soru kökü birlikte incelenir; alıştırmalar resmî sınav sorusu değildir."
  },
  {
    "id": "paragrafta-bosluk-doldurma",
    "title": "Paragrafta boşluk doldurma: eksik düşünceyi tamamla",
    "minutes": 80,
    "objectives": [
      "Boşluğun metindeki görevini seçeneklerden önce kendi sözlerinle kur.",
      "Gerekçe, sonuç, örnek ve karşıtlık ilişkilerini iki yöne bakarak ayır.",
      "Kişi, zaman, kip ve kapsamı koruyan tamamlamayı seç.",
      "Doğru bilgiyi değil metindeki eksik bağı sağlayan cümleyi gerekçeyle belirle."
    ],
    "sections": [
      {
        "title": "Eksik olan kelimeyi değil düşünceyi ara",
        "paragraphs": [
          "Paragraftaki boşluk, metnin belirli bir işini üstlenecek cümle veya söz grubunu bekler. Önce bütün parçayı okuyup neyin anlatıldığını ve hangi ilişkinin eksik kaldığını belirle. “Yalnız ilk sınıfa sorduk. Bu nedenle ...” dizisi bir sınırlı araştırmadan hangi sonuca gidilebileceğini tartışmaya açar.",
          "Boşluğu gördüğün anda seçeneklere koşmak yerine kısa bir ön tahmin kur: sonuç bütün okula genişletilemez gibi. Bu ön tahmin son cevap olmak zorunda değildir; beklenen görevi görünür kılar. Ardından seçeneklerden aynı görevi, verilen kapsamı koruyarak yerine getireni ara. Böylece çekici fakat metin dışı bir bilgiye kapılma olasılığın azalır."
        ]
      },
      {
        "title": "Önce konuyu ve yazarın yönünü belirle",
        "paragraphs": [
          "Bir metin bir yöntem, sanatçı veya araştırma hakkında olabilir; fakat boşluğun görevi yalnız bu konu adından çıkmaz. Yazar yöntemi övüyor, sınırını gösteriyor veya farklı koşullardaki etkisini karşılaştırıyor olabilir. Önce ne hakkında konuşulduğunu, sonra bu konuda hangi düşünce yönünün kurulduğunu ayır.",
          "Anahtar sözcüklerin tekrarına yardımcı ipucu olarak bak. Bir seçenek aynı yöntemi anarken metnin eleştirdiği sınırı yok sayıyorsa konu ortaklığı yeterli değildir. Eksik cümle yazarın kurduğu açıklamayı sürdürmeli veya açık karşıtlığı tamamlamalıdır. Parçanın genel düşüncesiyle komşu cümlelerin özel görevi birlikte çalışır."
        ]
      },
      {
        "title": "Başlangıç boşluğunda sonrakini hazırlayan yargıyı kur",
        "paragraphs": [
          "Boşluk baştaysa sonraki cümlelerin hangi kavramı açıklayacağını veya hangi yargıya gerekçe vereceğini ara. Ardından çünkü geliyorsa sonraki cümle gerekçe olabilir; boşlukta o gerekçeyle desteklenen bir iddia beklenir. “... Çünkü kapının menteşesi kırılmış.” ifadesi önce bir durum veya öneriyi hazırlayabilir.",
          "Başlangıç her zaman geniş bir evrensel slogan istemez. Belirli bir olayın tanıtımı da sonraki cümlelere dayanak olabilir. Adayın sunduğu kişi, nesne ve kapsam sonraki metinde gerçekten kullanılıyor mu, kontrol et. Hiç anılmayan yeni bir sorun açan cümle, genel görünse bile uygun başlangıç olmayabilir."
        ]
      },
      {
        "title": "Ortadaki boşluk iki yana aynı anda bağlanır",
        "paragraphs": [
          "Orta konumdaki cümle, kendinden önce kurulan bilgiyi alır ve kendinden sonraki yargıyı hazırlar. Bir metin önce yöntemin yararını anlatıp sonra “Bu sınırlama yüzünden...” diyorsa aradaki boşlukta yöntemin belirli bir sınırı açıklanabilir. Sol bağ yarar bilgisiyle ilişkiyi, sağ bağ sınırlamanın dayanağını denetler.",
          "Yalnız önceki cümleyle uyuşan adayı hemen seçme. Sonraki cümlenin bu, aynı veya dolayısıyla gibi sözleri neyi gerektiriyor? Adayı araya yerleştirip üç cümleyi birlikte oku. İki yönlü denetim, bir cümle tek başına makul olsa bile metinde neden uygun olmadığını göstermeni sağlar."
        ]
      },
      {
        "title": "Son boşluk her zaman özet değildir",
        "paragraphs": [
          "Bir paragraf son cümlede önceki düşünceyi toparlayabilir, bir sonuç verebilir veya son iddianın nedenini açıklayabilir. Örneğin “Bu öneri beklenen etkiyi yaratmadı; çünkü ...” biçiminde biten metin özet değil gerekçe bekler. Cümlenin sonda olması onun işini tek başına belirlemez.",
          "Bu nedenle başta dayanak, ortada köprü, sonda mutlaka özet gibi katı eşlemeler kullanma. Konum ipucu verir, fakat anlam görevini bağlaçlar, yargılar ve düşüncenin yönü belirler. Son cümleyi seçtikten sonra onun neyi tamamladığını açıkça söyle: burada sonucu çıkarıyor, burada savı açıklıyor gibi somut bir işlev göster."
        ]
      },
      {
        "title": "Çünkü ile gerekçenin yönünü çöz",
        "paragraphs": [
          "Çünkü ile başlayan bölüm çoğu kez önceki iddianın nedenini veya dayanağını verir. “Aleti yeniden ayarlamalıyız; çünkü ölçüm her denemede farklı çıkıyor.” örneğinde öneri önce, gerekçe sonra gelir. Boşluk ilk bölümdeyse verilen gerekçenin hangi yargıyı destekleyebileceğini sorarsın.",
          "Her neden ilişkisi aynı kesinlikte değildir. Bir kişinin bir görüşe inanma nedeni ile doğadaki fiziksel olayın nedeni farklı bağlar olabilir. Metin yalnız kendi kararının gerekçesini açıklıyorsa bunu bütün olaylar için zorunlu bilimsel yasa sayma. Cümlenin hangi yargıyı hangi düzeyde desteklediğini koru."
        ]
      },
      {
        "title": "Sonuç için eldeki dayanağın kapsamını koru",
        "paragraphs": [
          "Bu nedenle, dolayısıyla ve böylece ifadeleri önceki bilgilerden bir sonuca geçişi işaret edebilir. Sonuç, verilen dayanakların izin verdiği kadar geniş olmalıdır. Yalnız bazı kayıtlarda tarih eksikliği bulunmuşsa bütün arşivin hiçbir işe yaramadığı sonucu eldeki bilgiyi aşar.",
          "Daha dar ama destekli bir cümle, kulağa güçlü gelen sınırsız yargıdan daha uygundur. Sonucu hangi özne, yer ve zaman için kurduğunu yaz. Dayanak yeterli değilse “bu kayıtlar için ek denetim gerekir” gibi sınırlı bir tamamlamayı, dışarıdan kesinlik ekleyen cümleye tercih et. Sorunun amacı en iddialı sloganı değil uygun bağı bulmaktır."
        ]
      },
      {
        "title": "Örneğin sonrasında genel yargıyı somutlaştır",
        "paragraphs": [
          "Örnek, daha önce söylenen bir özelliği belirli bir olayda görünür kılar. “Bazı küçük düzenlemeler erişimi artırabilir. Örneğin ...” ifadesinde beklenen, bu özelliği gösteren somut bir düzenlemedir. Erişimi artırma fikrini yalnız başka sözcüklerle tekrar etmek, örnek verme göreviyle aynı değildir.",
          "Örnekten önce boşluk varsa işlemi ters yönde kurarsın: verilen somut olay hangi genel yargıyı açıyor? Tek bir olayı bütün durumların kesin kanıtına çevirmeden uygun genellik düzeyini seç. Örnek ile ana düşünce ilişkisini doğru kurmak, metne yalnız konu yakınlığı olan ama işlev taşımayan cümleleri elemeni sağlar."
        ]
      },
      {
        "title": "Karşıtlıkta beklentiyi ve tersini birlikte oku",
        "paragraphs": [
          "“Çok ayrıntılı hazırlandık. Oysa ...” ifadesi hazırlığın akla getirdiği beklentiden farklı bir durumu bekler. Başarısızlık, beklenmedik engel veya hazırlığın her sorunu çözmediğini gösteren bir durum bu bağı kurabilir. Hangi beklentinin kırıldığını metnin verdiği koşullardan çıkar.",
          "Her olumsuz cümle karşıtlık için uygun değildir. Başka bir olay hakkında kötü bir bilgi, önceki yargının beklentisini değiştirmeyebilir. İki cümlenin aynı kişi, işlem ve zaman çerçevesini sürdürüp sürdürmediğini denetle. Ayrıca karşıtlık bağının kurduğu sınırı, ilk yargının tümüyle yanlışlığını kanıtlama sanma."
        ]
      },
      {
        "title": "Gönderme yalnız kelime tekrarından güçlüdür",
        "paragraphs": [
          "Adayda bu plan, o kişi veya aynı sonuç gibi bir söz varsa metinde gerçekten neye döndüğünü bul. Aday cümle bir nesneyi tanıtıyorsa ardından gelen göndermeye dayanak da olabilir. Boşluğu doldurunca metinde öncülsüz bir bu veya hangisi olduğu belirsiz bir o bırakmamalısın.",
          "Aynı sözcüğün iki farklı anlamda kullanılması yanıltabilir. Bir cümlede dil iletişim aracı, diğerinde ağızdaki organ anlamındaysa sözcük tekrarı düşünce bağını tek başına sağlamaz. Cümleyi kendi sözlerinle açıp gönderdiği nesne veya kavramı adlandır; yalnız yüzeydeki eşleşmeye dayanma."
        ]
      },
      {
        "title": "Kişi, kip ve anlatıcı sürekliliğini koru",
        "paragraphs": [
          "Bir günlük anlatısında ben ile başlayan deneyim, sebepsiz biçimde başka bir kişinin yaşantısına dönüşmemelidir. Aynı şekilde planlanan bir iş ile bitmiş iş arasında zaman bağının kurulması gerekir. Boşluğa gelen cümle bu çerçeveyi açıklayarak sürdürebilir; rastgele yeni özne veya zaman getirerek sürdürmüş sayılmaz.",
          "Kiplerin aynı görünmesi ise tek başına uygunluk garantisi değildir. Aynı geçmiş zaman ekiyle yazılmış iki cümle bütünüyle ayrı olayları anlatabilir. Tersine geçmiş deneyimin bugünkü etkisi farklı kiplerle tutarlı kurulabilir. Dil biçimini anlamın yerine koymadan, kimin neyi hangi zamanda yaptığına bak."
        ]
      },
      {
        "title": "Dışarıdan doğru bilgi metinde işlevsiz kalabilir",
        "paragraphs": [
          "Bir seçenek gerçek bir kişi veya yer hakkında doğru bilgi verebilir. Ancak paragraf o bilginin açıklayacağı soruyu açmıyorsa boşluğun görevi tamamlanmaz. Bir müzenin dijital erişimini anlatan metne binanın yapım tarihi, ancak kurulan açıklamada rolü varsa uygun ek olabilir.",
          "Bu tür soruda genel kültürünü yok sayman gerekmez; fakat son karar metnin kendi kanıtına dayanmalıdır. Seçeneğin ne kadar ilginç olduğundan önce eksik ilişkiyi kurup kurmadığını sor. Gerçek hayatta doğru olma ile bu paragrafta gerekli ve uygun olma farklı değerlendirmelerdir."
        ]
      },
      {
        "title": "Kapsam, nicelik ve kesinlik sözlerini karşılaştır",
        "paragraphs": [
          "Bazı, çoğu, bu koşulda ve zaman zaman gibi sınırlamalar paragrafın iddiasını belirler. Seçenek herkes, hiçbir zaman veya bütün durumlarda diyorsa kapsamın değişip değişmediğini denetle. Bu sözcükler kendiliğinden yanlış değildir; ancak daha geniş iddia daha geniş dayanak ister.",
          "Örneğin tek sınıfın yanıtladığı ankette bütün okulun kesin görüşünü ilan etmek desteklenmez. Doğru tamamlamayı yalnız daha yumuşak olduğu için değil, dayanağın sınırlı kümesini koruduğu için seçersin. Metin gerçekten tüm üyeleri kapsayan bilgi vermişse evrensel söz de uygun olabilir; ezber bir kesinlik yasağı koyma."
        ]
      },
      {
        "title": "Kendi cümlenle dene ve bütün parçayı doğrula",
        "paragraphs": [
          "Ön tahminini yaptıktan sonra seçenekleri onun yaptığı işe göre karşılaştır. Gerekçe bekliyorsan hangi adayın açıklama verdiğini, örnek bekliyorsan hangisinin genel yargıyı somutlaştırdığını göster. Böylece seçeneklerin benzer kelimeleri arasında yalnız görünüşe göre karar vermemiş olursun.",
          "Son olarak seçtiğin cümleyi boşluğa yerleştir ve tüm paragrafı baştan sona oku. Göndermeler, kişi, zaman, kapsam ve düşünce yönü korunuyor mu? Gerekçeni tek cümlede özetle: aday soldaki savı şu nedenle sürdürüyor ve sağdaki sonucu şu bilgiyle hazırlıyor. Bu açıklama, öğrenmeyi yalnız doğru şıkkı görmenin ötesine taşır."
        ]
      }
    ],
    "examples": [
      {
        "title": "Başlangıçta gerekçenin desteklediği iddiayı kur",
        "prompt": "“[Boşluk] Çünkü yeni dosya henüz sıraya alınmadı. Listeden bulunabilmesi için önce kayıt oluşturulması gerekiyor.” Boşluğa nasıl bir yargı uygun olur?",
        "strategy": "Çünkü sonrasının hangi durumu açıkladığını ve kapsamın hangi dosya olduğunu bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Gerekçe yeni dosyanın listeye kaydedilmemiş olmasıdır. Sonraki cümle bu eksikliği gidermeyi önerir."
          },
          {
            "label": "2. adım",
            "explanation": "Boşluk, dosyanın bu listede henüz bulunamaması gibi bu gerekçeyle açıklanan bir durumu bildirmelidir. Bütün dosyaların silindiği sonucu verilmemiştir."
          },
          {
            "label": "3. adım",
            "explanation": "“Bu yeni dosyayı listede aramak henüz sonuç vermiyor.” cümlesi gerekçe ve kayıt önerisiyle birlikte tutarlı bir metin kurar."
          }
        ],
        "answer": "Uygun yargı: Bu yeni dosyayı listede aramak henüz sonuç vermiyor.",
        "check": "Sonraki çünkü cümlesi bu durumu açıklar; son öneri aynı eksikliği hedefler.",
        "pitfall": "Tek dosyanın kayıt eksikliğinden bütün sistemin hiçbir işe yaramadığını çıkarma."
      },
      {
        "title": "Ortadaki boşluk engeli tanıtsın",
        "prompt": "“Kurulan sayfa uzak ziyaretçilerin belgelere erişmesini sağladı. [Boşluk] Bu engeli aşmak için düşük hızlı bağlantılara uygun ikinci bir sürüm hazırlandı.” Boşluğun görevi nedir?",
        "strategy": "Önceki olumlu bilgi ile sonraki çözümün gerektirdiği güçlüğü bağla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk cümle erişim yararını söyler. Son cümle bir engel olduğunu ve bu engelin düşük hızlı bağlantıyla ilgili olduğunu gösterir."
          },
          {
            "label": "2. adım",
            "explanation": "Boşluk bu belirli engeli tanıtmalıdır. “Ancak büyük dosyalar düşük hızlı bağlantılarda zor açılıyordu.” cümlesi bunu yapar."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni cümle hem ilk yararı belirli koşulda sınırlar hem bu engel göndermesine dayanak sağlar. Sadece sayfanın yapım tarihini söylemek aynı görevi yapmaz."
          }
        ],
        "answer": "Boşluk, düşük bağlantı hızında erişimi sınırlayan güçlüğü tanıtmalıdır.",
        "check": "Sol bağ yarar-sınırlama, sağ bağ engel-çözüm ilişkisidir.",
        "pitfall": "İlk cümle olumlu diye boşluğa yalnız başka bir olumlu özelliğin gelebileceğini sanma."
      },
      {
        "title": "Son konumda gerekçe bulunabilir",
        "prompt": "“Aletin ayarını yeniden yapmamız gerekiyor; çünkü [Boşluk]” deniyor. Bağlamda ayar düğmesinin işlem sırasında yanlışlıkla değiştiği belirtiliyor. Nasıl tamamlanmalı?",
        "strategy": "Konuma değil çünkü ile beklenen anlam görevine bak.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk bölüm yeniden ayarlama önerisini verir. Çünkü sonrasına bu öneriyi destekleyen bir gerekçe gelmelidir."
          },
          {
            "label": "2. adım",
            "explanation": "Ayar düğmesinin yanlışlıkla değişmesi, önerinin doğrudan dayanağıdır. “İşlem sırasında ayar düğmesi yanlışlıkla değiştirildi.” cümlesi verilen bağlamı korur."
          },
          {
            "label": "3. adım",
            "explanation": "Cümle sonda olsa da yaptığı iş özet değil gerekçelendirmedir. İlgisiz bir kapanış veya bütün aletlerin bozukluğu iddiası eklemeye gerek yoktur."
          }
        ],
        "answer": "Uygun tamamlanış: işlem sırasında ayar düğmesi yanlışlıkla değiştirildi.",
        "check": "Öneri ile gerekçe aynı ayar sorununa bağlıdır; konum görevle karıştırılmadı.",
        "pitfall": "Sondaki her boşluğa sonuç olarak başlayan özet cümlesi arama."
      },
      {
        "title": "Sınırlı örneklemden sınırlı sonuç çıkar",
        "prompt": "“Anketi yalnız A sınıfından on beş kişi yanıtladı. Bu yüzden [Boşluk]” ifadesi veriliyor. Okuldaki diğer sınıflara ilişkin başka bilgi yoktur. Uygun sonuç nasıl kurulmalı?",
        "strategy": "Yanıtlayan küme ile sonucu genellemek istediğin kümeyi karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Veri yalnız belirli bir sınıftan on beş kişiye aittir. Bütün okulun görüşü doğrudan ölçülmüş değildir."
          },
          {
            "label": "2. adım",
            "explanation": "Sonuçların tüm okulu temsil ettiğini söylemek için ek dayanak gerekir. Bu, anketin hiçbir bilgi taşımadığı veya bütün yanıtların yanlış olduğu anlamına gelmez."
          },
          {
            "label": "3. adım",
            "explanation": "“Sonuçların bütün okulu temsil ettiği ek dayanak olmadan söylenemez.” cümlesi kapsamı korur ve bu yüzden bağının gereğini yerine getirir."
          }
        ],
        "answer": "Uygun sonuç: Sonuçların bütün okulu temsil ettiği ek dayanak olmadan söylenemez.",
        "check": "Sınırlı veri ile sınırlı güvence ayrıldı; karşıt bir kesinlik eklenmedi.",
        "pitfall": "Örneklem yetersizliğini anketteki herkesin kesin yanıldığı sonucuna dönüştürme."
      }
    ],
    "recall": [
      {
        "prompt": "Seçeneklere bakmadan önce ne kurabilirsin?",
        "answer": "Boşluğun görevini adlandıran kısa bir ön cümle kurarım: gerekçe, sonuç, örnek veya karşıtlık gibi; sonra adayların aynı işi yapıp yapmadığını sınarım."
      },
      {
        "prompt": "Sondaki boşluk her zaman özet midir?",
        "answer": "Hayır. Cümlenin konumu değil tam anlam ilişkisi belirleyicidir; çünkü sonrasında gerekçe de beklenebilir."
      },
      {
        "prompt": "Bazı sözcüğü bulunan metne herkes sözü hiçbir zaman gelemez mi?",
        "answer": "Mutlak yasak değildir; fakat daha geniş sonuç ek dayanak ister. Metnin verdiği kapsam gerçekten karşılanmalıdır."
      },
      {
        "prompt": "Ortadaki boşluğu nasıl denetlersin?",
        "answer": "Önceki, aday ve sonraki cümleyi birlikte okurum; iki yöndeki gönderme, işlev, zaman ve kapsam bağını açıkça gösteririm."
      }
    ],
    "source": "Aurelia TYT Türkçe 025–027 kopya kâğıtları, MEBİ TYT Türkçe Paragrafın Yapısı bölümü ve OGM Paragrafta Yapı ve Anlam sunusuyla karşılaştırılarak hazırlanmış özgün anlatım ve sorular. Metin bağları, kapsam ve soru kökü birlikte incelenir; alıştırmalar resmî sınav sorusu değildir."
  }
];
interface QuestionRow021 { passage: string; prompt: string; correct: string; distractors: string[]; hint: string; explanation: string; }
const questionRows021: Record<string, QuestionRow021[]> = {
  "paragrafta-siralama": [
    {
      "passage": "I. Bu başlıklar daha sonra alfabetik bir listede toplandı. II. Görevli her dosya için kısa bir başlık yazdı. III. Okurlar bu alfabetik listeyi kullanarak dosyaları daha kolay buldu.",
      "prompt": "Bu cümlelerin anlamlı bir bütün oluşturacak sırası hangi seçenekte verilmiştir?",
      "correct": "II → I → III",
      "distractors": [
        "I → II → III",
        "III → I → II",
        "I → III → II",
        "II → III → I"
      ],
      "hint": "Başlıkların oluşması ve alfabetik listenin kullanılması için gereken öncülleri bul.",
      "explanation": "II başlıkları üretir. I’deki bu başlıklar ona döner ve alfabetik listeyi kurar. III bu listeyi kullandığı için I’den sonra gelir. Diğer seçeneklerde başlık veya liste henüz tanıtılmadan kullanılır."
    },
    {
      "passage": "A. Bu yüzden gezi için yeni bir gün seçildi. B. Gezinin yapılacağı sabah yolun kapalı olduğu öğrenildi. C. Çünkü geceki taşkın geçişi engellemişti.",
      "prompt": "Cümleler hangi sırayla tutarlı bir açıklama oluşturur?",
      "correct": "B → C → A",
      "distractors": [
        "A → B → C",
        "C → A → B",
        "A → C → B",
        "C → B → A"
      ],
      "hint": "Çünkü cümlesi hangi durumu açıklar, bu yüzden hangi karara geçer?",
      "explanation": "B yolun kapalı olduğunun öğrenilmesini tanıtır. C bu kapalılığın nedenini açıklar. A’daki bu yüzden, açıklanan geçiş engeline bağlı yeni gün seçimini getirir. Yanlış seçenekler bu yüzden veya çünkü göndermesini kendisini hazırlayan yargıdan önceye koyar."
    },
    {
      "passage": "I. Örneğin kent müzesi, eski haritaların büyütülebilen görüntülerini internette yayımladı. II. Bu görüntüleri inceleyen uzak ziyaretçiler de haritadaki ayrıntıları görebildi. III. Bazı müzeler, uzakta yaşayanların erişimini dijital sunumlarla artırır.",
      "prompt": "Hangi sıra genel yargı, onu açan örnek ve örneğin sonucunu birlikte korur?",
      "correct": "III → I → II",
      "distractors": [
        "I → III → II",
        "II → I → III",
        "III → II → I",
        "I → II → III"
      ],
      "hint": "Soru kökünde istenen genel-örnek-sonuç yönünü izle.",
      "explanation": "III genel ilişkiyi verir. I örneğin sözüyle kent müzesinin bu ilişkiyi nasıl gerçekleştirdiğini açar. II’deki bu görüntüler, I’de tanıtılan görüntülere döner. Soru özellikle genel yargıdan örnek ve sonucuna geçişi istemektedir."
    },
    {
      "passage": "A. Buna rağmen son gün etkinliğe beklenenden çok kişi katıldı. B. Etkinlik için küçük bir salon ayrıldı. C. Bu salonun kapasitesi beklenen katılımın altındaydı.",
      "prompt": "Tanıtım, engel ve beklentinin aşılması sırasını hangi seçenek kurar?",
      "correct": "B → C → A",
      "distractors": [
        "A → B → C",
        "C → B → A",
        "B → A → C",
        "C → A → B"
      ],
      "hint": "Buna rağmen ifadesinin hangi engeli aştığını bul.",
      "explanation": "B salonu tanıtır. C bu salon sözünü kullanır ve kapasite engelini belirtir. A buna rağmen ile bu engelin düşündürdüğü düşük katılım beklentisine ters sonucu verir. Soru kökündeki işlev sırası da B → C → A’yı destekler."
    },
    {
      "passage": "I. O yaz, ilk denemeyi bitirince sonuçları bir deftere yazmıştım. II. Bugün geçen yazdan kalan çalışma defterimi yeniden açıyorum. III. Bu eski sonuçlar, şimdi yeni denemede neyi değiştireceğimi gösteriyor.",
      "prompt": "Bu anlatımın uygun sırası hangisidir?",
      "correct": "II → I → III",
      "distractors": [
        "I → II → III",
        "III → II → I",
        "I → III → II",
        "II → III → I"
      ],
      "hint": "O yaz göndermesi ile bu eski sonuçlar göndermesini birlikte denetle.",
      "explanation": "II bugünkü eylemi ve geçen yaz çerçevesini açar. I’deki o yaz buna döner ve sonuçların nasıl yazıldığını anlatır. III bu sonuçlardan bugüne döner. Geçmiş olayın tarihi daha eski diye I’yi başa almak onun açık göndermesini dayanıksız bırakır."
    },
    {
      "passage": "I. Gönüllüler kıyıdaki atıkları kaydetmek için bir plan yaptı. II. Listedeki her bölge için ayrı bir gözlem saati seçildi. III. Bu bölgeler ortak bir çizelgeye yazıldı. IV. İlk olarak gözlenecek bölgeler belirlendi. V. Sonunda saatleri de içeren çizelge bütün gruba gönderildi.",
      "prompt": "Hangi iki cümle yer değiştirirse tanıtım ve hazırlık sırası düzelir?",
      "correct": "II ile IV",
      "distractors": [
        "I ile II",
        "II ile III",
        "III ile V",
        "IV ile V"
      ],
      "hint": "Bölgenin belirlenmesi, listeye yazılması ve listedeki bölgeye saat seçilmesi hangi sırayı ister?",
      "explanation": "IV bölgeleri belirler; III’teki bu bölgeler buna döner ve çizelgeyi kurar. II listedeki bölgelere saat atar. Bu yüzden sıra I → IV → III → II → V olmalıdır; mevcut II ve IV değişince bütün bağlar tamamlanır."
    },
    {
      "passage": "Bir bağımsız paragraf için aşağıdaki cümlelerden birinin giriş olarak seçilmesi isteniyor. Öncesinde başka metin veya ortak olay bağlamı verilmemiştir.",
      "prompt": "Hangi cümle kendi tanıtımını içerdiği için girişe en uygundur?",
      "correct": "Yeni bir tarama yöntemi geliştirildi; bu yöntem silik yazıları daha görünür kılıyor.",
      "distractors": [
        "Bu yöntem bütün belgelerde aynı sonucu vermedi.",
        "Böylece önceki denemede görülen engel aşıldı.",
        "Söz konusu sonuçlar ertesi gün tabloya işlendi.",
        "Onun bu kararı ekipte yeni bir tartışma başlattı."
      ],
      "hint": "Gönderme varsa öncülü aynı cümlenin içinde de bulunabilir.",
      "explanation": "Doğru seçenekte yöntem önce aynı cümlede tanıtılmış, ardından bu yöntem sözüyle açıklanmıştır. Diğer cümlelerdeki yöntem, önceki deneme, sonuçlar veya kişi dışarıda kalır. Bu sözcüğü taşıması tek başına giriş yasağı değildir."
    },
    {
      "passage": "A. Böylece bütün denemelerin ortak özeti hazırlandı. B. Bu son kontrolün ardından her kaydın doğrulandığı işaretlendi. C. Ekip önce farklı günlerde tuttuğu kayıtları tek dosyada topladı. D. Dosyadaki her kayıt, son kez asıl defterle karşılaştırıldı. E. Doğrulandığı işaretlenen kayıtların tümü özet tablosuna aktarıldı.",
      "prompt": "Hazırlık, son kontrol, işaretleme, tabloya aktarma ve tamamlanış sırasıyla kurulduğunda son cümle hangisidir?",
      "correct": "A",
      "distractors": [
        "B",
        "C",
        "D",
        "E"
      ],
      "hint": "Soru, genel bir kapanış zevkini değil verilen işlev zincirinin sonunu soruyor.",
      "explanation": "C dosyayı toplar; D dosyayı denetler; B bu son kontrolü izler; E işaretlenen kayıtları tabloya aktarır. A böylece ile bu işlerin sonucunu tamamlar. Tam sıra C → D → B → E → A olduğundan son cümle A’dır."
    },
    {
      "passage": "A. Bu çizim, parçaların hangi sırayla birleşeceğini gösteriyordu. B. Ekip ilk kez yeni düzeneğin ayrıntılı çizimini hazırladı. C. Çizimdeki bu sıraya göre parçalar birleştirildi. D. Birleştirilen düzenek son adımda çalıştırıldı.",
      "prompt": "Tanıtım ve gönderme ilişkileri korunarak hangi sıra kurulabilir?",
      "correct": "B → A → C → D",
      "distractors": [
        "A → B → C → D",
        "C → B → A → D",
        "D → B → A → C",
        "B → A → D → C"
      ],
      "hint": "Bu çizim, bu sıra ve birleştirilen düzenek sözlerinin her birine öncül bul.",
      "explanation": "B çizimi tanıtır. A çizimin gösterdiği birleşme sırasını açıklar; C bu sırayı uygular. D’deki birleştirilen düzenek ancak C’den sonra çalıştırılır. Yanlış seçenekler tanıtılmamış çizim veya sırayla başlar ya da düzeneği birleştirmeden önce çalıştırır."
    },
    {
      "passage": "I. Bu iki ölçüm arasındaki fark, cihazın ayarının yeniden incelenmesine yol açtı. II. Ekip bir cihazı aynı koşullarda iki kez ölçüm yapmak için hazırladı. III. İlk ölçümün sonucu kayıt defterine yazıldı. IV. Ardından yapılan ikinci ölçüm de aynı deftere kaydedildi. V. Ayar kontrolünden sonra yeni bir deneme planlandı.",
      "prompt": "Cümlelerin uygun sırası hangisidir?",
      "correct": "II → III → IV → I → V",
      "distractors": [
        "II → I → III → IV → V",
        "III → II → IV → I → V",
        "II → III → I → V → IV",
        "V → II → III → IV → I"
      ],
      "hint": "İki ölçümün karşılaştırılabilmesi için hangi bilgilerin tamamlanması gerekir?",
      "explanation": "II hazırlığı, III ilk ölçümü, IV ardından gelen ikinci ölçümü tanıtır. I bu iki ölçümü karşılaştırıp ayar incelemesini açar. V bu kontrolün sonrasına geçer. Diğer seçeneklerde iki ölçüm tamamlanmadan fark veya kontrol sonucu kullanılmıştır."
    }
  ],
  "paragrafta-cumle-ekleme": [
    {
      "passage": "I. Ekip yeni bir ölçüm düzeneği hazırladı. II. İlk denemeden önce düzeneğin ayarı yapıldı. III. Bu değer, ilk günün tablosuna yazıldı. IV. Tablo daha sonra ekiple paylaşıldı.\n\nEklenecek cümle: İlk deneme tamamlandığında ekranda 18 birim sonucu görüldü.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "II. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "I. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Ayarın yapılması ile bu değer göndermesinin arasındaki ölçümü bul.",
      "explanation": "II’de ayar yapılır; eklenen cümle ilk denemenin ölçüm değerini üretir. III’teki bu değer 18 birim sonucuna döner. Doğru üçlü ayar-ölçüm-kayıt olduğundan cümle II’den sonra gelir."
    },
    {
      "passage": "I. Bu küçük sözlük, yörede kullanılan araç adlarını açıklıyordu. II. Her maddede bir kullanım örneği bulunuyordu. III. Örnekler yörede çalışan kişilerden derlendi. IV. Sözlük okulun okuma köşesine kondu.\n\nEklenecek cümle: Öğrenciler, yöredeki araç adlarını toplayarak küçük bir sözlük hazırladı.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "Parçanın başına",
      "distractors": [
        "I. cümleden sonra",
        "II. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "İlk cümledeki bu küçük sözlük sözünün öncülünü ara.",
      "explanation": "I’deki sözlük başka yerde tanıtılmadan kullanılır. Eklenecek cümle sözlüğü ilk kez tanıtır; sonraki maddeler, örnekler ve yerleştirme bu nesneyi sürdürür. Tanıtım ancak parçanın başına konursa ilk göndermenin dayanağı sağlanır."
    },
    {
      "passage": "I. Kayıt masasında başvurular sırayla alındı. II. İlk iki başvuru eski numaralarıyla listeye yazıldı. III. Üçüncü başvuru için yeni bir numara verilmesi istendi. IV. Bu yeni numara, üçüncü kişinin kartına da basıldı.\n\nEklenecek cümle: Bu istek üzerine üçüncü başvuruya 103 numarası verildi.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "III. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "I. cümleden sonra",
        "II. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Bu istek ve bu yeni numara göndermelerinin iki ucunu belirle.",
      "explanation": "Yeni cümledeki bu istek III’teki numara verme isteğine döner. IV’ün bu yeni numara sözü ise yeni cümlede verilen 103 bilgisini kullanır. İki bağ birlikte ancak III ile IV arasında kurulur."
    },
    {
      "passage": "I. Aynı işi yapabilen iki yöntem karşılaştırıldı. II. Bu hız üstünlüğüne karşılık ikinci yöntem daha az malzeme tüketiyordu. III. Ekip hız ve malzeme miktarını işin koşullarıyla birlikte değerlendirdi. IV. Deneme sonunda rapor hazırlandı.\n\nEklenecek cümle: İlk yöntem, ikincisinden iki gün daha kısa sürede sonuç veriyordu.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "I. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "II. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Bu hız üstünlüğü ifadesine açık dayanak verecek bilgiyi bul.",
      "explanation": "I iki yöntemi tanıtır. Yeni cümle ilk yöntemin hız üstünlüğünü açıklar; II’deki bu hız üstünlüğüne karşılık sözü tam bu bilgiye bağlanır. Ardından III her iki özelliği birlikte tartar. Bu yüzden I’den sonra eklenmelidir."
    },
    {
      "passage": "I. Ekip iki önemli özelliği sırayla sınadı. II. İlk testte cihazın az enerji kullandığı görüldü. III. Ardından ikinci özelliği belirlemek için başka bir test yapıldı. IV. Bu ikinci test, cihazın sessiz çalıştığını gösterdi.\n\nEklenecek cümle: Bu iki özelliğin de sağlandığı görülünce inceleme tamamlandı.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "IV. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "I. cümleden sonra",
        "II. cümleden sonra",
        "III. cümleden sonra"
      ],
      "hint": "İki özelliğin birden bilinmesi için hangi testin sonucu da açıklanmış olmalı?",
      "explanation": "II düşük enerji bilgisini, IV sessiz çalışma bilgisini verir. Yeni cümle iki özelliğin birlikte sağlandığına dayanarak incelemeyi kapatır; ikinci sonuçtan önce bu kapanışın dayanağı tamamlanmaz. Bu nedenle IV’ten sonra gelir."
    },
    {
      "passage": "I. Toplantıda önce hazırlık raporu okundu. II. Daha sonra etkinliğin yeri üzerinde uzlaşıldı. III. Bunun ardından koordinatör Aslı’dan etkinliğin tarihini açıklaması istendi. IV. Açıklanan bu tarih, tutanağın sonuna yazıldı.\n\nEklenecek cümle: Bu istek üzerine Aslı, etkinliğin 15 Mayıs günü yapılacağını söyledi.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "III. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "I. cümleden sonra",
        "II. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Yeni cümlenin bu istek sözü ile sonraki bu tarih sözünü bağla.",
      "explanation": "III Aslı’dan tarih açıklamasını ister. Yeni cümle bu isteğe cevap verir ve tarihi üretir. IV açıklanan bu tarihi tutanağa taşır. Dolayısıyla yeni cümle III’ten sonra yerleşir."
    },
    {
      "passage": "I. Okul duyuruları için çevrimiçi bir sayfa açıldı. II. Birçok öğrenci duyurulara evinden ulaşabildi. III. Bu erişim sınırını aşmak için giriş kapısına bir duyuru panosu da yerleştirildi. IV. Böylece iki kanal birlikte kullanılmaya başlandı.\n\nEklenecek cümle: Ancak evinde interneti olmayan öğrenciler sayfayı düzenli izleyemiyordu.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "II. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "I. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Sonraki cümlenin bu erişim sınırı sözünün hangi sınırlamayı beklediğini bul.",
      "explanation": "II sayfanın sağladığı yararı söyler. Yeni cümle ancak ile bu yararın interneti olmayanlar için sınırını tanıtır. III aynı sınıra pano çözümünü getirir. Sol ve sağ bağlantı birlikte II’den sonrayı gösterir."
    },
    {
      "passage": "I. Bu köprünün ahşap korkulukları ilk incelemede hasarlı bulundu. II. Korkuluklar onarılana kadar köprüden geçiş durduruldu. III. Onarım bitince güvenlik kontrolü yapıldı. IV. Köprü kontrolden sonra yeniden açıldı.\n\nEklenecek cümle: Ekip, dere üzerindeki eski bir yaya köprüsünü incelemeye başladı.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "Parçanın başına",
      "distractors": [
        "I. cümleden sonra",
        "II. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Bu köprü ifadesini ilk kez hangi cümle tanıtabilir?",
      "explanation": "I’in bu köprü sözü bir öncül ister. Yeni cümle incelenen köprüyü ilk kez açar; ardından hasar, kapatma, onarım ve yeniden açma adımları sürer. Tanıtım parçanın başına gelmelidir."
    },
    {
      "passage": "I. Küçük arşivler, basit önlemlerle belgelere erişimi kolaylaştırabilir. II. Bu örnekteki renk ayrımı, tarihler yakın olsa da kutuların karışmasını önledi. III. Arşiv görevlisi aynı uygulamayı sonraki yıl da sürdürdü. IV. Kutuların sırası hazırlanan plana göre korundu.\n\nEklenecek cümle: Örneğin bir okul arşivinde her yıla ait kutular farklı renkte etiketlendi.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "I. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "II. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Bu örnekteki renk ayrımı sözü hangi somut uygulamayı gerektiriyor?",
      "explanation": "I genel yargıyı açar. Yeni cümle bir okulun renkli etiket uygulamasını örnekler. II bu örnekteki renk ayrımı diye tam bu uygulamayı açıklar. Bu nedenle cümle I ile II arasına yerleştirilir."
    },
    {
      "passage": "I. Ekip ses kaydındaki sorunu bulmak için iki parçayı sırayla denedi. II. İlk parça çıkarıldığında ses değişmedi. III. Bu ikinci denemenin sonucu, sorunun hangi parçada olduğunu gösterdi. IV. Sorunlu parça değiştirilince kayıt temizlendi.\n\nEklenecek cümle: Ardından ikinci parça çıkarıldı ve bu kez istenmeyen ses kesildi.",
      "prompt": "Verilen cümle parçanın hangi konumuna getirilmelidir?",
      "correct": "II. cümleden sonra",
      "distractors": [
        "Parçanın başına",
        "I. cümleden sonra",
        "III. cümleden sonra",
        "IV. cümleden sonra"
      ],
      "hint": "Bu ikinci deneme sözünden önce denemenin kendisi nerede verilmelidir?",
      "explanation": "II ilk denemeyi ve etkisiz sonucunu anlatır. Yeni cümle ardından ikinci denemeyi yapar. III bu ikinci denemenin sonucunu kullanır; IV de bulunan sorunu giderir. Doğru konum II’den sonradır."
    }
  ],
  "paragrafta-bosluk-doldurma": [
    {
      "passage": "Yeni basılan haritaların hepsi önce depoya kondu. Henüz okuma salonuna taşınmadıkları için ----.",
      "prompt": "Boşluğu metindeki nedene uygun tamamlayan seçenek hangisidir?",
      "correct": "okurlar bu haritaları okuma salonunda inceleyemiyor",
      "distractors": [
        "bütün eski haritaların tarihlerinin yanlış olduğu anlaşılıyor",
        "haritaların hiçbirinin basılmadığı kesinleşiyor",
        "depodaki bütün nesnelerin harita olduğu kanıtlanıyor",
        "salondaki her okur haritaların tamamını çoktan incelemiş oluyor"
      ],
      "hint": "Sonucun yalnız yeni haritalar ve belirtilen salon için kurulduğuna bak.",
      "explanation": "Yeni haritalar salona henüz gelmediği için o salonda incelenememeleri verilen nedene bağlıdır. Diğer seçenekler basımın yokluğu, tarihler veya bütün nesneler hakkında verilmemiş sonuçlar ekler; son seçenek de parçayla çelişir."
    },
    {
      "passage": "----. Çünkü bu dosya henüz kataloğa kaydedilmedi. Onu katalogdan bulabilmek için önce kayıt oluşturmak gerekiyor.",
      "prompt": "Boşluğa hangi cümle getirilmelidir?",
      "correct": "Bu dosyayı katalogda aramak henüz sonuç vermiyor.",
      "distractors": [
        "Bu dosya katalogdaki bütün kayıtların daha eski olduğunu kanıtlıyor.",
        "Katalogda aranan bütün dosyalar her zaman bulunur.",
        "Dosyanın bütün kopyaları dün katalogda listelendi.",
        "Kataloğa hiçbir dosyanın hiçbir zaman eklenmesi gerekmiyor."
      ],
      "hint": "Çünkü cümlesi bir sonraki cümlenin de ele aldığı hangi eksikliği açıklıyor?",
      "explanation": "Dosyanın kayıtsızlığı, onu katalogda aramanın neden sonuç vermediğini açıklar. Kayıt oluşturma önerisi de aynı sorunu hedefler. Bütün dosyalar için kesin yargı veya kaydedilmiş olma iddiası metnin bilgisini korumaz."
    },
    {
      "passage": "Yeni sayfa, çok sayıda belgeyi uzaktaki okurlara açtı. ----. Bu engeli azaltmak için düşük hızlı bağlantılarda da açılabilen ikinci bir sürüm hazırlandı.",
      "prompt": "İki komşuyla birlikte uygun bağ kuran cümle hangisidir?",
      "correct": "Ancak büyük dosyalar yavaş bağlantılarda zor açılıyordu.",
      "distractors": [
        "Sayfanın başlığında okulun kuruluş tarihi yazılıydı.",
        "Bütün okurların bütün belgelere her koşulda aynı hızla ulaştığı görüldü.",
        "Sayfa daha önce hiç söz edilmeyen bir spor yarışmasının sonuçlarını içeriyordu.",
        "Belgelere erişimde hiçbir engel olmadığı kesin biçimde gösterildi."
      ],
      "hint": "Sağdaki bu engel ifadesine öncül, soldaki yarara belirli bir sınır ara.",
      "explanation": "Yavaş bağlantıda büyük dosya açma güçlüğü, erişim yararını belirli koşulda sınırlar ve ikinci sürümün gidermeye çalıştığı engeli açıklar. Diğerleri bu engeli tanıtmaz veya engel olmadığını söyleyerek sonraki cümleyle çatışır."
    },
    {
      "passage": "Anketi yalnız bir sınıftan on iki öğrenci yanıtladı. Okulun diğer sınıflarından veri toplanmadı. Bu nedenle ----.",
      "prompt": "Boşluğa getirilebilecek en uygun sonuç hangisidir?",
      "correct": "bu sonuçların bütün okulun görüşünü temsil ettiği ek dayanak olmadan söylenemez",
      "distractors": [
        "okuldaki bütün öğrencilerin aynı görüşte olduğu kesinleşmiştir",
        "yanıtlayan on iki öğrencinin hepsinin yanlış söylediği kanıtlanmıştır",
        "anketin hiçbir konuda hiçbir bilgi veremeyeceği zorunludur",
        "bütün sınıfların görüşleri aynı yöntemle ölçülmüş sayılır"
      ],
      "hint": "Örneklemin sınırı hangi güvenceyi vermiyor; hangi karşıt kesinliği de vermiyor?",
      "explanation": "Veri yalnız bir sınıftaki on iki kişiye aittir. Bütün okula genelleme ek dayanak ister. Bu sınırlılık, yanıtların hepsinin yanlışlığını veya anketin bütünüyle bilgisizliğini kanıtlamaz; kapsamlı ölçüm de yapılmamıştır."
    },
    {
      "passage": "Küçük düzenlemeler, bir odanın kullanımını kolaylaştırabilir. Örneğin ----.",
      "prompt": "Boşluğu somut örnek göreviyle tamamlayan seçenek hangisidir?",
      "correct": "bir sınıfta kapı önündeki dolap yana alınınca geçiş alanı genişledi",
      "distractors": [
        "kullanışlılık üzerine birçok farklı genel tanım yapılabilir",
        "küçük değişiklikler bazı durumlarda yararlı olabilir",
        "bir odayı kullanmayı kolaylaştırmak çeşitli biçimlerde açıklanabilir",
        "odaların kullanımını kolaylaştıran işlemler önemlidir"
      ],
      "hint": "Örneğin sonrasında genel düşünceyi yeniden adlandıran değil tek olayda gösteren bilgi ara.",
      "explanation": "Dolabın yana alınması ve geçiş alanının genişlemesi belirli bir olaydır; genel yararı somutlaştırır. Diğer seçenekler aynı konuyu genel ifadelerle sürdürür, fakat verilen örnekleme görevini yerine getirmez."
    },
    {
      "passage": "----. Örneğin arşivdeki kutulara farklı renkte etiket konması, okurların hangi kutuyu aradığını daha çabuk anlamasını sağladı.",
      "prompt": "Verilen örneğe uygun genel yargı hangisidir?",
      "correct": "Basit görsel işaretler, aranan nesneyi ayırt etmeyi kolaylaştırabilir.",
      "distractors": [
        "Her arşivde bütün belgeler renkli mürekkeple yazılmak zorundadır.",
        "Arşivlerdeki bütün kutular aynı yıl hazırlanmıştır.",
        "Her renkli nesnenin maddi değeri renksizlerden büyüktür.",
        "Okurların hiçbir biçimde görsel bilgi kullanması mümkün değildir."
      ],
      "hint": "Renkli etiket hangi işi yapıyor; örneğin kapsamı ne kadar genişletilebilir?",
      "explanation": "Örnek renkli işaretin kutuyu ayırt etmeyi kolaylaştırmasını gösterir. Doğru genel yargı bu ilişkiyi sınırlı olabilir ifadesiyle kapsar. Bütün belgelerin yazım biçimi, yaşı veya maddi değeri hakkında veri yoktur."
    },
    {
      "passage": "Aletin ayarını yeniden yapmak gerekiyor; çünkü ----. İşleme başlamadan önce doğru ayarın geri getirildiği de denetlenecek.",
      "prompt": "Boşluğa hangi gerekçe getirilmelidir?",
      "correct": "ayar düğmesi işlem sırasında yanlışlıkla çevrildi",
      "distractors": [
        "aynı konu hakkında artık yalnız bir özet yazmak istiyoruz",
        "bütün aletlerin çalışma biçimleri birbirinin aynıdır",
        "ölçüm salonunun rengi bize güzel geliyor",
        "ayarın değişmediği ve hiçbir sorun olmadığı biliniyor"
      ],
      "hint": "Cümlenin sonunda olmasına değil çünkü ile istenen dayanağa bak.",
      "explanation": "Düğmenin yanlışlıkla çevrilmesi yeniden ayar yapma gereğini açıklar; sonraki denetim de aynı ayarla ilgilidir. Renk, genel özet veya bütün aletlere ilişkin yeni iddia gerekçe olmaz; hiç sorun olmadığı sözü ise önerinin bağını kurmaz."
    },
    {
      "passage": "Dün ilk taslağı bitirdim. Bugün bu taslağı yeniden okuyup kenarına notlar aldım. Yarın ise ----.",
      "prompt": "Kişi ve açık zaman çizgisini koruyan tamamlanış hangisidir?",
      "correct": "bu notlara göre taslağımı yeniden düzenleyeceğim",
      "distractors": [
        "henüz bitirmediğim taslağı dün yazmıştım",
        "bütün çalışmalarını tamamladığını söyledi",
        "benim yerime başka birinin dün ne yaptığını kesin biliyordu",
        "yarınki düzenlemeyi geçen hafta zaten yapmıştım"
      ],
      "hint": "Anlatıcı ben olarak kalıyor; yarın için planlanan işi bugün alınan notlara bağla.",
      "explanation": "Doğru cümle aynı anlatıcının bugün aldığı notları yarın kullanmasını söyler. Diğer seçenekler açık zamanla çatışır, kişiyi sebepsiz değiştirir veya aynı yarınki işlemi daha önce bitmiş gösterir."
    },
    {
      "passage": "Yazar burada dil derken ağızdaki organı değil, insanların anlaşmak için kullandığı iletişim sistemini kastediyor. Bu yüzden metindeki dilin gelişmesi sözü ----.",
      "prompt": "Boşluğu belirtilen kavram anlamını koruyarak tamamlayan seçenek hangisidir?",
      "correct": "iletişim sisteminin kullanım ve anlatım olanaklarının gelişmesiyle ilgilidir",
      "distractors": [
        "yalnız ağızdaki organın santimetre cinsinden uzamasını anlatır",
        "insanların hiçbir iletişim aracı kullanmadığını gösterir",
        "bütün organların aynı hızla büyüdüğünü kanıtlar",
        "metinde tanıtılmamış bir kişinin doğum tarihini verir"
      ],
      "hint": "Aynı sözcüğün hangi anlamının özellikle seçildiğini oku.",
      "explanation": "Pasaj dilin iletişim sistemi anlamını açıkça belirler. Doğru tamamlanış o kavramı sürdürür; organ büyümesi sözcüğün başka anlamına kayar. Diğer seçenekler de verilen açıklamayla ilgili bağı kurmaz."
    },
    {
      "passage": "Yeni yöntem bazı eski kayıtların okunmasını kolaylaştırdı; ancak bütün kayıtlarda aynı sonuç alınmadı. Bu nedenle yöntem hakkında ----.",
      "prompt": "Parçanın olumlu bilgisini ve sınırını birlikte koruyan yargı hangisidir?",
      "correct": "belirli kayıtlarda yararlı olduğu, fakat her kayıtta aynı etkiyi garanti etmediği söylenebilir",
      "distractors": [
        "hiçbir kayıtta hiçbir yarar sağlamadığı kesin olarak söylenmelidir",
        "bütün kayıtlarda aynı başarıyı sağladığı kanıtlanmıştır",
        "yararlı sonuç görüldüğü için kayıtların yaşının önemsiz olduğu her durumda kesindir",
        "bütün arşivlerin aynı yöntemi zaten kullandığı sonucuna varılmalıdır"
      ],
      "hint": "Bazı kayıtlar için başarı verilmiş; bütün kayıtlar için garanti verilmemiştir.",
      "explanation": "Doğru cümle hem verilen yararı hem tüm kayıtlara genelleme yapılamayacağını korur. Hiç yarar yok veya her yerde kesin başarı seçenekleri metnin iki ayrı bilgisinden birini siler. Yaş ve bütün arşivler hakkında ek veri de yoktur."
    }
  ]
};
const answerPositions021 = [
 [3, 0, 4, 1, 2, 4, 2, 0, 1, 3],
 [1, 4, 2, 3, 0, 3, 0, 1, 4, 2],
 [2, 3, 0, 4, 1, 0, 1, 2, 3, 4],
];
export const forge021TurkishTopics: Record<string, string> = {
 "paragrafta-siralama": "detail-274",
 "paragrafta-cumle-ekleme": "detail-275",
 "paragrafta-bosluk-doldurma": "detail-276",
};
export const forge021TurkishGuides: LessonGuide[] = guideSpecs021.map(({ title: _title, ...guide }) => guide);
export const forge021TurkishLessons: Lesson[] = guideSpecs021.map((guide, pack) => ({
 id: guide.id, subjectId: "tyt-turkce", title: txt(guide.title), minutes: guide.minutes, objectives: guide.objectives.map(txt),
 body: guide.sections.map(section => ({ title: txt(section.title), text: txt(section.paragraphs.join("\n\n")) })),
 questions: questionRows021[guide.id].map((row, index): Question => {
  const answer = answerPositions021[pack][index], raw = [row.correct, ...row.distractors];
  return { id: `${guide.id}-021-${index + 1}`, skill: guide.id, passage: txt(row.passage), prompt: txt(row.prompt),
   options: raw.map((_, position) => txt(raw[(position - answer + 5) % 5])), answer, hint: txt(row.hint), explanation: txt(row.explanation) };
 }), source: txt(guide.source), tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
}));

export interface Sentence021 { id: string; label: string; text: string; }
interface Edge021 { source: string; target: string; label: string; }
interface BaseCase021 { id: string; label: string; context: string; edges: Edge021[]; }
interface SequenceCase021 extends BaseCase021 { kind: "sequence"; sentences: Sentence021[]; initial: string; }
interface InsertionCase021 extends BaseCase021 { kind: "insertion"; sentences: Sentence021[]; inserted: Sentence021; }
interface BlankCase021 extends BaseCase021 { kind: "blank"; before: Sentence021[]; after: Sentence021[]; role: string; candidates: { text: string; valid: boolean[]; reason: string }[]; }
export type TurkishCase021 = SequenceCase021 | InsertionCase021 | BlankCase021;
const sequenceCases021: SequenceCase021[] = [
 { id: "arsiv", label: "Fotoğraf arşivi", kind: "sequence", context: "Bu tam metinde plan, yıl grubu, klasör, liste ve arama ekranı sırayla birbirini hazırlar. Cümleleri gerçekten taşı; her gönderme için gereken öncülü izle.", initial: "CADBE", sentences: [
  { id: "A", label: "Cümle A", text: "Ekip, eski fotoğraflar için bir tarama planı hazırladı." },
  { id: "B", label: "Cümle B", text: "Bu planın ilk adımında fotoğraflar çekim yıllarına göre ayrıldı." },
  { id: "C", label: "Cümle C", text: "Yılları belirlenen bu gruplar ayrı klasörlere kondu." },
  { id: "D", label: "Cümle D", text: "Bu klasörlerin adları ortak bir listeye yazıldı." },
  { id: "E", label: "Cümle E", text: "Son adımda bu liste arama ekranına aktarıldı." },
 ], edges: [{ source: "A", target: "B", label: "Plan → bu plan" }, { source: "B", target: "C", label: "Yıl grubu → bu gruplar" }, { source: "C", target: "D", label: "Klasör → bu klasörler" }, { source: "D", target: "E", label: "Liste → bu liste" }] },
 { id: "yol", label: "Yol tasarımı", kind: "sequence", context: "Bu hazır olayda tasarımın iki ucu, aradaki duraklar ve kroki birbirine bağlı. Yeni sıra, bütün bağları etkiler; yalnız bir çifti düzeltmek yetmez.", initial: "DBAEC", sentences: [
  { id: "A", label: "Cümle A", text: "Ekip, işaretli bir yürüyüş yolu tasarladı." },
  { id: "B", label: "Cümle B", text: "Bu tasarım için önce yolun başlangıcı ile sonu belirlendi." },
  { id: "C", label: "Cümle C", text: "Belirlenen bu iki nokta arasında güvenli duraklar seçildi." },
  { id: "D", label: "Cümle D", text: "Bu durakların yerleri ayrıntılı bir krokiye işlendi." },
  { id: "E", label: "Cümle E", text: "Kroki bitince son kez yol üzerinde denendi." },
 ], edges: [{ source: "A", target: "B", label: "Tasarım → bu tasarım" }, { source: "B", target: "C", label: "İki nokta → bu iki nokta" }, { source: "C", target: "D", label: "Durak → bu duraklar" }, { source: "D", target: "E", label: "Kroki → deneme" }] },
];
const insertionCases021: InsertionCase021[] = [
 { id: "olcum", label: "Ölçüm ve kayıt", kind: "insertion", context: "Yeni cümle, ölçüm ayarı ile sonucun kayda geçmesi arasındaki adımı kurar. Onu beş farklı konuma koyup iki yönü birlikte oku.", sentences: [
  { id: "A", label: "Cümle I", text: "Ekip yeni bir ölçüm aleti kurdu." },
  { id: "B", label: "Cümle II", text: "İlk ölçümden önce aletin ayarı yapıldı." },
  { id: "C", label: "Cümle III", text: "Bu değer ilk günün tablosuna yazıldı." },
  { id: "D", label: "Cümle IV", text: "Tablo gün sonunda ekiple paylaşıldı." },
 ], inserted: { id: "X", label: "Ek cümle", text: "Ayarın ardından yapılan ilk ölçümde ekranda 18 birim görüldü." }, edges: [{ source: "A", target: "B", label: "Alet → ayar" }, { source: "B", target: "X", label: "Ayar → ölçüm" }, { source: "X", target: "C", label: "Değer → bu değer" }, { source: "C", target: "D", label: "Tablo → paylaşım" }] },
 { id: "yontem", label: "İki yolun farkı", kind: "insertion", context: "İki saklama yolunun hız ve yer farkına bakılıyor. Yeni cümle, sonraki bu hız sözü için açık dayanak vermeli.", sentences: [
  { id: "A", label: "Cümle I", text: "Arşivde belgeler için iki saklama yolu belirlendi." },
  { id: "B", label: "Cümle II", text: "İlk yolun bu hızına karşın ikinci yol daha az yer kaplıyordu." },
  { id: "C", label: "Cümle III", text: "Ekip bu iki özelliği birlikte tarttı." },
  { id: "D", label: "Cümle IV", text: "Sonunda kullanım amacına göre bir yol seçildi." },
 ], inserted: { id: "X", label: "Ek cümle", text: "İlk yol, belgeyi ötekinden daha kısa sürede bulmayı sağlıyordu." }, edges: [{ source: "A", target: "X", label: "İki yol → ilk yol" }, { source: "X", target: "B", label: "Hız → bu hız" }, { source: "B", target: "C", label: "İki özellik → birlikte tartma" }, { source: "C", target: "D", label: "Tartma → seçim" }] },
];
const blankCases021: BlankCase021[] = [
 { id: "neden", label: "Başta uyarı", kind: "blank", context: "İncelenen yaya köprüsü için güvenli yürüyüş uyarısı yazılıyor. Başta eksik olan yargı, sonraki gerekçe ve pano bilgisiyle sınanır.", before: [], after: [
  { id: "A", label: "Gerekçe", text: "Çünkü yağmurdan sonra köprünün yüzeyi kaygan oluyor." },
  { id: "B", label: "Devam", text: "Görevli bu uyarıyı girişteki panoya da astı." },
 ], role: "Uyarı yargısı", edges: [{ source: "A", target: "X", label: "Kayganlık → uyarı" }, { source: "X", target: "B", label: "Uyarı → bu uyarı" }], candidates: [
  { text: "Yağmurdan sonra bu köprüde dikkatli yürümek gerekir.", valid: [true, true], reason: "Kayganlık, bu uyarıya dayanak olur. Panodaki bu uyarı sözü de açık öncülünü bulur." },
  { text: "Bu köprü hiçbir koşulda kaygan olmaz.", valid: [false, false], reason: "Aday, verilen kayganlık bilgisini reddeder. Ayrıca pano cümlesinin aradığı uyarıyı kurmaz." },
  { text: "Köprünün yapım yılı geçen hafta kayda geçti.", valid: [false, false], reason: "Yapım yılı, kayganlık için gereken uyarı yargısını kurmaz. Bu uyarı sözü öncülsüz kalır." },
 ] },
 { id: "engel", label: "Ortada sınır", kind: "blank", context: "Olumlu erişim bilgisi ile belirli bir güçlüğü giderme adımı arasında boşluk var. Adayın yalnız bir yana uyması yeterli değildir.", before: [
  { id: "A", label: "Önceki", text: "Yeni sayfa, uzaktaki okurlara belge sundu." },
 ], after: [{ id: "B", label: "Sonraki", text: "Bu güçlük için küçük dosyalı ikinci bir sürüm hazırlandı." }], role: "Karşıtlık ve sınır", edges: [{ source: "A", target: "X", label: "Erişim → ek bilgi veya sınır" }, { source: "X", target: "B", label: "Güçlük → bu güçlük" }], candidates: [
  { text: "Ancak büyük dosyalar yavaş bağlantıda zor açılıyordu.", valid: [true, true], reason: "Aday, erişimin belirli bir sınırını söyler. Sonraki bu güçlük sözü, bu sınırı kullanır." },
  { text: "Üstelik bütün dosyalar her bağlantıda sorunsuz açılıyordu.", valid: [true, false], reason: "Soldaki olumlu bilgiye ek yapar; ama sağdaki güçlük sözü için bir engel tanıtmaz. İki bağ birlikte kurulmaz." },
  { text: "Sayfanın başlığı iki sözcükten oluşuyordu.", valid: [false, false], reason: "Sayfa adı aynı kalsa da aday erişimle ilgili eksik işi yapmaz. Sonraki güçlüğü de açıklamaz." },
 ] },
 { id: "kapsam", label: "Sonda sonuç", kind: "blank", context: "Son boşlukta bir sonuç kurulacak. Sağda yeni komşu yok; sonuç, soldaki iki bilginin kapsamıyla sınanır.", before: [
  { id: "A", label: "Veri A", text: "Anketi yalnız bir sınıftan on iki kişi yanıtladı." },
  { id: "B", label: "Veri B", text: "Okulun öteki sınıfları için veri yok." },
 ], after: [], role: "Sınırlı sonuç", edges: [{ source: "A", target: "X", label: "Sınırlı grup → sonuç" }, { source: "B", target: "X", label: "Eksik veri → sonuç" }], candidates: [
  { text: "Bu nedenle sonuçları bütün okula genellemek ek dayanak ister.", valid: [true, true], reason: "Sonuç, yalnız verilen sınıftan okulun tümüne geçmek için ek dayanak gerektiğini korur." },
  { text: "Bu nedenle bütün okulun kesin görüşü artık biliniyor.", valid: [false, false], reason: "Aday, sınırlı veriden bütün okul için kesin sonuç çıkarır. İki veri de bu genişlik için yeterli değil." },
  { text: "Böylece anketi yanıtlayan herkesin yanıldığı kanıtlandı.", valid: [false, false], reason: "Sınırlı örneklem, yanıtların hepsinin yanlış olduğunu göstermez. Aday ayrı bir kesinlik ekler." },
 ] },
];
const corpus021: Record<string, readonly TurkishCase021[]> = {
 "paragrafta-siralama": sequenceCases021,
 "paragrafta-cumle-ekleme": insertionCases021,
 "paragrafta-bosluk-doldurma": blankCases021,
};
export function turkishCases021(lessonId: string): readonly TurkishCase021[] {
 if (!Object.hasOwn(corpus021, lessonId)) throw new RangeError("TURKISH021_LESSON");
 return corpus021[lessonId];
}
export function validateOrder021(order: string) {
 if (typeof order !== "string" || order.length !== 5 || new Set(order).size !== order.length || [...order].sort().join("") !== "ABCDE") throw new RangeError("TURKISH021_ORDER");
 return order;
}
export function moveSentence021(order: string, index: number, direction: number) {
 validateOrder021(order);
 if (!Number.isInteger(index) || index < 0 || index >= order.length || ![-1, 1].includes(direction)) throw new RangeError("TURKISH021_MOVE");
 const target = index + direction;
 if (target < 0 || target >= order.length) return order;
 const letters = [...order]; [letters[index], letters[target]] = [letters[target], letters[index]];
 return letters.join("");
}
export function insertionPosition021(slot: number, count = 4) {
 if (!Number.isInteger(count) || count < 1 || count > 4 || !Number.isInteger(slot) || slot < 0 || slot > count) throw new RangeError("TURKISH021_SLOT");
 return slot === 0 ? "Parçanın başına" : `${["I", "II", "III", "IV"][slot - 1]}. cümleden sonra`;
}
export interface TurkishScene021 {
 kind: TurkishCase021["kind"]; caseId: string; context: string; sentence: string; nodes: Sentence021[];
 links: { source: number; target: number; sourceId: string; targetId: string; label: string; valid: boolean }[];
 order: string; slot?: number; candidate?: number; role: string;
 decision: string; options: string[]; reason: string; evidence: string[];
}
export function buildTurkishScene021(lessonId: string, caseId: string, input: { order?: string; slot?: number; candidate?: number } = {}): TurkishScene021 {
 if (typeof input !== "object" || input === null || Array.isArray(input)) throw new RangeError("TURKISH021_INPUT");
 const item = turkishCases021(lessonId).find(c => c.id === caseId);
 if (!item) throw new RangeError("TURKISH021_CASE");
 let nodes: Sentence021[], role: string, order: string, slot: number | undefined, candidate: number | undefined;
 if (item.kind === "sequence") {
  order = validateOrder021(input.order ?? item.initial);
  nodes = [...order].map(id => item.sentences.find(s => s.id === id)!); role = "Gönderme ve sıra";
 } else if (item.kind === "insertion") {
  slot = input.slot ?? 0; insertionPosition021(slot, item.sentences.length);
  nodes = [...item.sentences]; nodes.splice(slot, 0, item.inserted); order = nodes.map(n => n.id).join(""); role = "İki yönlü bağ";
 } else {
  candidate = input.candidate ?? 0;
  if (!Number.isInteger(candidate) || candidate < 0 || candidate >= item.candidates.length) throw new RangeError("TURKISH021_CANDIDATE");
  nodes = [...item.before, { id: "X", label: "Aday cümle", text: item.candidates[candidate].text }, ...item.after]; order = nodes.map(n => n.id).join(""); role = item.role;
 }
 const links = item.edges.map((edge, index) => ({ source: nodes.findIndex(n => n.id === edge.source), target: nodes.findIndex(n => n.id === edge.target), sourceId: edge.source, targetId: edge.target, label: edge.label,
  valid: item.kind === "blank" ? item.candidates[candidate!].valid[index] : order.indexOf(edge.source) < order.indexOf(edge.target) }));
 const good = links.every(link => link.valid), validCount = links.filter(link => link.valid).length;
 const reason = item.kind === "blank" ? item.candidates[candidate!].reason : item.kind === "sequence" ? good ? "Her gönderme kendi öncülünden sonra geliyor. Bu hazır metinde bütün bağlar kuruldu." : "En az bir gönderme, gereken bilgiden önce geldi. Yer değişince her yeni bağı yeniden oku." : good ? "Yeni cümle soldaki bilgiyi alıyor ve sağdaki gönderme için öncül veriyor. İki yön de uygun." : "Yeni cümle bu konumda en az bir öncül bağını bozuyor. Önceki ve sonraki cümleyi birlikte oku.";
 const evidence = [`Kurulan bağ: ${validCount} / ${links.length}.`, item.kind === "sequence" ? `Şu anki sıra: ${[...order].join(" → ")}.` : item.kind === "insertion" ? `Seçili yer: ${insertionPosition021(slot!, item.sentences.length)}.` : `Beklenen görev: ${role}.`,
  ...links.filter(link => !link.valid).map(link => `${nodes[link.source].label} → ${nodes[link.target].label}: bu bağ eksik.`),
  "Bu sonuç yalnız hazırlanmış tam örneğin dil ve anlam bağlarına dayanır."];
 return { kind: item.kind, caseId: item.id, context: item.context, nodes, sentence: nodes.map(n => n.text).join(" "), links, order, slot, candidate, role,
  decision: good ? "Bağlar tam" : "Bağ eksik", options: ["Bağlar tam", "Bağ eksik"], reason, evidence };
}
export const turkishDefaults021 = { case: "", order: "", slot: 0, candidate: 0, selected: 0, guess: "", reason: "", compared: false, show: false };
