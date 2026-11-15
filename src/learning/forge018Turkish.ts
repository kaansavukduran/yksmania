import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
type GuideSpec018 = LessonGuide & { title: string };
const guideSpecs018: GuideSpec018[] = [
  {
    id: "deyimler-ve-atasozleri",
    title: "Deyimler ve atasözleri: sözü olaya bağla",
    minutes: 75,
    objectives: [
      "Kalıplaşmış sözün anlamını tam olay içinde açıkla.",
      "Deyimin durumunu, atasözünün genel yargısını ve öğüdünü ayır.",
      "Gerçek anlam, mecaz, çekim ve söz kalıbını birbirine karıştırma.",
      "Yakın deyimleri ve atasözlerini sonuçlarıyla karşılaştır.",
    ],
    sections: [
      {
        title: "Tek sözcük yerine sözün bütününü oku",
        paragraphs: [
          "“Komşumuz biz yokken çiçeklere göz kulak oldu.” cümlesinde anlatılan, çiçeklere organ vermek değildir; onlarla ilgilenip onları gözetmektir. Deyim çoğunlukla bir durumu, duyguyu veya eylemi kısa bir kalıpla anlatır. Sözcüklerin sözlükteki ilk anlamlarını toplamak, kalıbın yerleşik anlamını her zaman vermez. Önce olayın ne olduğunu belirle, ardından deyimi açık bir karşılıkla yeniden söyle.",
          "Kalıplaşmışlık da gereklidir. Bir yazarın yeni kurduğu “düşüncelerim mor bir bulut oldu” benzetmesi mecazlı olabilir ama sırf mecaz olduğu için yerleşik deyim sayılmaz. Bu ünitede hazırlanmış ve anlamı açık bağlamlar kullanılır. Yeni bir sözle karşılaşırsan yalnız ilginç görünmesine dayanma; yerleşik kullanımı ve olay içindeki işlevini birlikte araştırmak gerekir.",
        ],
      },
      {
        title: "Deyim belirli bir durumu nasıl anlatır?",
        paragraphs: [
          "Deyim, bir olayın sonucunu veya kişinin durumunu adlandırabilir. “Telaşlanınca eli ayağına dolaştı.” ifadesi, kişinin ne yapacağını şaşırdığını gösterir. “Dili tutuldu.” korku veya şaşkınlık nedeniyle konuşamaz duruma gelmeyi anlatabilir. İkisi aynı duyguyla ilişkili görünse de birinde davranışların karışması, diğerinde konuşamama öne çıkar.",
          "Deyimi seçerken olayın başlangıcını değil, ayırt edici sonucunu karşılaştır. Bir kişi korkmuş fakat konuşmaya devam etmişse sırf korku var diye dili tutuldu demek verilen durumu tam karşılamaz. Soruda hangi davranış açıkça anlatılmışsa ona uyan kalıp aranır. Cevabını “Bu kişi ... olduğu için bu söz uygundur.” biçiminde gerekçelendirmek, benzer deyimleri ayırmanı sağlar.",
        ],
      },
      {
        title: "Atasözünde olaydan genel yargıya geç",
        paragraphs: [
          "Atasözleri toplumsal deneyim ve gözlemlerle yerleşmiş genel yargılar taşır. “Damlaya damlaya göl olur.” küçük katkıların zamanla birikerek büyümesini anlatır. Bu söz belirli bir kişinin o gün kaç damla su topladığını bildirmez; farklı birikim durumlarına uygulanabilen bir düşünce sunar. Olayı bu genel düşünceye bağlayan ilişkiyi açıkça kurmalısın.",
          "Genel yargı, bilimsel ve istisnasız bir doğa yasası demek değildir. Atasözü kültürel bir gözlem veya yol gösterme biçimidir; hangi olaya uygun olduğunu bağlam belirler. Birikim atasözünü yalnız para için düşünme: düzenli küçük çalışmalar da aynı ilişkiyi örnekleyebilir. Buna karşılık tek seferlik büyük bir kazanç, küçük katkıların zaman içinde büyümesiyle aynı olay örgüsü değildir.",
        ],
      },
      {
        title: "Öğüt veren söz ile gözlemi ayır",
        paragraphs: [
          "Bazı atasözleri doğrudan davranış önerir. “Ayağını yorganına göre uzat.” harcamayı imkâna göre düzenleme öğüdü taşır. Örtünün fiziksel uzunluğu, günlük ekonomik davranışa taşınmıştır. Başka atasözleri ise emir kurmadan bir ilişkiyi gözlem olarak ifade eder. Öğüt cümlesi biçiminde olmaması, yerleşik genel yargıyı atasözü olmaktan çıkarmaz.",
          "Bir kişi herhangi bir öğüt verdiğinde otomatik olarak atasözü söylemiş olmaz. “Bugün dosyanı yedekle.” anlaşılır bir öneridir; fakat bu yeni cümle tek başına toplumda yerleşmiş bir atasözü değildir. Aynı şekilde bir deyim emir içinde kullanılabilir: “Biraz kulak ver!” sözünün öğüt tonunda söylenmesi onu atasözüne dönüştürmez. Biçim, yerleşiklik ve temel işlev birlikte değerlendirilir.",
        ],
      },
      {
        title: "Gerçek anlamlı kalıplar da vardır",
        paragraphs: [
          "Deyimlerin çoğunda mecaz dikkat çeker; bununla birlikte gerçek anlamını büyük ölçüde koruyan yerleşik deyimler de bulunur. Bu yüzden “mecaz yoksa deyim de yoktur” kuralı kullanılamaz. Atasözleri de gerçek, mecaz veya iki okumanın birlikte düşünülebildiği biçimlerde kurulabilir. Anlam türüyle sözün deyim ya da atasözü olması farklı sınıflama sorularıdır.",
          "Önce kalıbın ne anlattığını, sonra bunu nasıl anlattığını sor. “Acele işe şeytan karışır.” acele davranışın hataya yol açabilmesini mecazlı bir genel yargıyla anlatır. Sözün içinde doğrudan gerçek varlık adlarının geçmesi, bütün iletinin gerçek anlamda olduğunu göstermez. Öte yandan her organ adı mutlaka mecaz değildir; gerçek organ hareketi verilen cümlede deyim okumasını zorla dayatma.",
        ],
      },
      {
        title: "Aynı söz, iki farklı bağlam",
        paragraphs: [
          "“Çocuğun eli ayağı birbirine dolaştı.” sözü bir koşu oyunundaki gerçek hareketi de anlatabilir; “Soruları görünce eli ayağına dolaştı.” bağlamında ise telaşla ne yapacağını şaşırma anlamı öne çıkar. Kararı yalnız el veya ayak sözcüğüne bakarak verme. Hangi olayın gerçekleştiği, neyin gözlendiği ve sözün hangi karşılıkla açıklanabildiği birlikte okunmalıdır.",
          "Etkileşimde bağlamı değiştirdiğinde kelimeler benzer kalsa bile anlam grubu ve sonuç bağı değişir. Gerçek anlamda organlara ayrı roller verilebilir; deyim kullanımında sözün bütünü tek durumun karşılığı olur. Bu, her Türkçe cümleyi otomatik çözme iddiası değildir; hazırlanmış iki açık sahneyi karşılaştırarak bağlamın nasıl kanıt sağladığını görmeni amaçlar.",
        ],
      },
      {
        title: "Kalıp sözcükleri ile çekim ekleri farklıdır",
        paragraphs: [
          "“Gözden düşmek” sözündeki düşmek fiili cümleye göre çekimlenebilir: gözden düştü, gözümden düştü veya gözden düşmüş biçimleri uygun bağlamda aynı temel deyimi taşır. Kişi, zaman ve ilgili kişinin bakışı değişebilir. Deyimin sözlükte mastar biçiminde verilmesi, cümledeki düştü biçiminin de mastar olduğu anlamına gelmez; gerçek örnekte fiil çekimlidir.",
          "Buna karşılık kalıbın sözcüklerini rastgele eş anlamlılarla değiştirerek aynı deyimi koruyamazsın. Göz kulak olmak yerine göz işitme organı olmak demek aynı yerleşik sözü vermez. Çekim uyarlamasıyla sözlük kalıbını bozmayı ayır. Bazı sözlerin yerleşik varyantları bulunabilir; bunları da “her kelime her biçimde değişebilir” serbestliği gibi yorumlama.",
        ],
      },
      {
        title: "Tam cümle olmak atasözü ölçütü değildir",
        paragraphs: [
          "Deyimlerin bir bölümü söz öbeği, bir bölümü cümle biçimindedir. “Atı alan Üsküdar’ı geçti.” çoğu kullanımda fırsatın kaçtığını veya artık iş işten geçtiğini anlatan cümle biçimli bir deyimdir. Bir yargı taşıması, onu kendiliğinden atasözü yapmaz. Deyimin belirli durumu anlatmasıyla atasözünün genellenmiş deneyim veya öğüt sunması ayrılır.",
          "Atasözü de yeni olay anlatılırken o olaya uygulanabilir; bu kullanım onun genel yargısını silmez. Tür sorusunda yalnız sözcük sayısını, nokta işaretini veya fiil çekimini saymak yerine kalıbın yerleşik işlevini düşün. “Bu söz bize hangi durumu adlandırıyor, yoksa farklı durumlar için hangi genel ilişkiyi öneriyor?” sorusu daha sağlam bir başlangıçtır.",
        ],
      },
      {
        title: "Gözden düşmek ile gözden kaçmak",
        paragraphs: [
          "“Verdiği sözü tutmayınca ekip arkadaşlarının gözünden düştü.” bir kişinin önceki değerini veya itibarını kaybetmesini anlatır. “Raporun son satırındaki yanlış gözden kaçtı.” ise ayrıntının fark edilmemesini bildirir. İkisinde de göz ve uzaklaşma çağrışımı vardır; buna rağmen değişen şey biri için saygınlık, diğeri için fark edilme durumudur.",
          "Yakın kalıplarda karşılaştırmayı ortak sözcüğe değil, sonuç sütununa göre yap. Kim ya da ne etkileniyor? Bir kişinin değerinden mi, dikkat dışı kalan bir ayrıntıdan mı söz ediliyor? Yanlış deyim açıklamasını düzeltirken yalnız doğru adı söyleme; yanlış karşılığın hangi öteki deyime ait olduğunu da belirt. Böylece bir sonraki farklı olayda aynı karışıklığı daha kolay fark edersin.",
        ],
      },
      {
        title: "Deyim, ikileme ve özdeyiş",
        paragraphs: [
          "İkileme, tekrar veya anlam/ses ilişkisiyle yan yana gelen sözcüklerle anlamı güçlendirebilir: ağır ağır, iyi kötü, şırıl şırıl gibi. Her iki sözcüklü yapı deyim değildir. “Ağır ağır yürüdü.” sözünde yürümenin yavaşlığı güçlendirilir; bu yapı için yeni bir kalıplaşmış durum anlamı aramak zorunlu değildir. Bir ikilemenin daha uzun deyim içinde yer alması da iki düzeyi ayırmayı gerektirir.",
          "Özdeyiş ya da vecize, söyleyeni bilinen özlü bir yargı olarak atasözünden ayrılır. Yerleşik atasözünün söyleyeni genellikle bilinmez; toplumun ortak dilinde yaşar. Fakat bir sözü ünlü biri de söylemiş diye o sözü mutlaka ilk onun kurduğunu varsayma. Tür ayrımı için kaynak ve yerleşiklik bilgisi gerekir; bu ünitenin soruları gereken bağlamı açık verir.",
        ],
      },
      {
        title: "Benzer olaylarda atasözü seçimi",
        paragraphs: [
          "Bir atasözünü olaya eşlerken olayın temel ilişkisini bir cümleye indir. Düzenli küçük birikim mi var, imkânı aşan harcama mı, aceleden doğan hata mı? “Her gün beş sayfa okudu, sonunda uzun kitabı bitirdi.” küçük katkıların zamanla büyümesine uyar. Aynı olayda yalnız çok çalıştı demek doğru olsa da atasözünün ayırt edici birikim yönünü yeterince açıklamaz.",
          "Farklı atasözleri farklı koşullarda karşıt görünen tavsiyeler verebilir. Bu, hepsini aynı anda her olaya uygulanacak zorunlu kurallar yapmaz. Soru kökündeki amaç ve sonucu koruyan sözü seç. Elde olmayan bilgi ekleyerek olayı değiştirme; tutumluluk anlatılan bir örneği sırf para sözcüğü geçtiği için cömertlik veya ortaklaşma örneğine çevirmemelisin.",
        ],
      },
      {
        title: "Kendi sözünle açıklama ve yeni olaya aktarım",
        paragraphs: [
          "Çalışma sonunda kalıbı kapat ve iki iş yap: anlamını sade bir cümleyle söyle, sonra o anlamı taşıyan yeni bir olay yaz. Göz kulak olmak için “Arkadaşım ben dönene kadar kedimi besleyip gözetti.” gibi bir bağlam kurulabilir. Ardından yakın ama farklı bir örnekle sınırını dene; ayrıntıyı fark etmemek gözetmekle aynı sonuç değildir.",
          "Hızlı tekrar sırasında her sözün yanına “durum/genel yargı”, “anlam”, “ayırt edici sonuç” ve “yakın karışıklık” notlarını düşün. Uzun bir ezber listesi tek başına olayla eşleme becerisini kurmaz. Bir sözün anlamını bildiğini, onu yeni bir bağlamda doğru açıklayıp benzer sözden ayırabildiğinde daha sağlam gösterirsin. Keşif ve not okumak puan kanıtı değildir; bağımsız sorularda kendi kararını üret.",
        ],
      },
    ],
    examples: [
      {
        title: "İtibar mı, fark edilme mi?",
        prompt:
          "“Ece verdiği sözleri tutmayınca ekibin gözünden düştü. Rapordaki bir tarih yanlışı ise gözden kaçtı.” İki kalıbın sonuçlarını ayır.",
        strategy: "Etkilenen varlığı ve değişen durumu her cümlede ayrı bul.",
        steps: [
          {
            label: "İlk olay",
            explanation:
              "Ece’nin davranışı, ekibin ona duyduğu önceki değer veya güveni azaltıyor; burada bir kişinin itibarı değişiyor.",
          },
          {
            label: "İkinci olay",
            explanation:
              "Tarih yanlışı var olduğu hâlde fark edilmemiştir; yanlışın itibar kaybettiği söylenmiyor.",
          },
          {
            label: "Eşleme",
            explanation:
              "Gözden düşmek itibar yitirmeye, gözden kaçmak fark edilmemeye karşılık gelir. İki kalıp yer değiştirilirse anlatılan sonuç değişir.",
          },
        ],
        answer: "İlk kalıp itibar kaybı, ikincisi fark edilmeme.",
        check: "Kişi ile ayrıntı farklı sonuçlara bağlandı.",
        pitfall:
          "Ortak göz sözcüğü, deyimlerin aynı anlama geldiğini kanıtlamaz.",
      },
      {
        title: "Birikim olayını genelle",
        prompt:
          "Bir öğrenci her gün küçük bir miktar ayırıp aylar sonra bisiklet alıyor. “Damlaya damlaya göl olur.” sözü olaya hangi ilişkiyle uyar?",
        strategy: "Tek tek katkıyı, zamanı ve biriken sonucu ilişkilendir.",
        steps: [
          {
            label: "Küçük katkı",
            explanation:
              "Her gün ayrılan miktar tek başına hedef için yeterli değildir; olayda düzenli küçük katkılar bulunur.",
          },
          {
            label: "Süreç",
            explanation:
              "Bu katkılar zaman boyunca eklenir. Sonuç tek seferlik beklenmedik bir kazançla açıklanmıyor.",
          },
          {
            label: "Genel yargı",
            explanation:
              "Küçük birikimlerin zamanla büyük sonuç vermesi, atasözünün bu olaya taşınan genel ilişkisidir; yalnız fiziksel su anlatılmıyor.",
          },
        ],
        answer: "Düzenli küçük katkılar zamanla büyük birikim oluşturur.",
        check:
          "Verilen olayda küçük katkı, tekrar ve büyüyen toplam birlikte var.",
        pitfall:
          "Bu sözü istisnasız bilim yasası veya yalnız para birikimine özgü kural sayma.",
      },
      {
        title: "Çekim değişir, temel anlam korunur",
        prompt:
          "“Gözden düşmek” sözünü geçmişte olmuş ve konuşanın değerlendirmesine göre anlatılan bir cümlede kullan: “Yaptıklarıyla gözümden düştü.” Söz kalıbı ile çekimi ayır.",
        strategy:
          "Sözlük biçimini, fiil çekimini ve değerlendiren kişiyi ayrı göster.",
        steps: [
          {
            label: "Kalıp",
            explanation:
              "Sözlükte verilen gözden düşmek, birinin değer veya itibar yitirmesini anlatır; düşmek mastar biçimidir.",
          },
          {
            label: "Çekim",
            explanation:
              "Düştü fiili görülen geçmiş zamanla çekimlidir. Cümlede mastar değil, tamamlanmış bir yargı vardır.",
          },
          {
            label: "Bakış",
            explanation:
              "Gözümden biçimi değeri kimin gözünde yitirdiğini konuşana bağlar. Bu kişi uyarlaması, kalıbın temel anlamını rastgele başka sözcükle değiştirmek değildir.",
          },
        ],
        answer:
          "Gözden düşmek kalıptır; düştü çekimli fiildir, gözümden konuşanın bakışını verir.",
        check: "Aynı itibar yitirme ilişkisi korunur.",
        pitfall:
          "Gözümden düştü ifadesini sırf kaynakta mastar başlığı var diye mastar sayma.",
      },
      {
        title: "Cümle biçimli deyimi tanı",
        prompt:
          "Arkadaşı son başvuru gününü kaçıran Ece’ye “Atı alan Üsküdar’ı geçti.” diyor. Bu sözün cümle olması onu atasözü yapar mı?",
        strategy: "Biçimle yerleşik işlevi ayrı değerlendir.",
        steps: [
          {
            label: "Yargı biçimi",
            explanation:
              "Geçti çekimli fiiliyle tamamlanmış bir cümle vardır; biçim bilgisi tek başına türü belirlemez.",
          },
          {
            label: "Bağlam",
            explanation:
              "Söz, başvuru fırsatının artık kaçmış olduğu özel durumu anlatmak için kullanılıyor; gerçek atlı yolculuk haber verilmiyor.",
          },
          {
            label: "Tür",
            explanation:
              "Bu yerleşik kalıp cümle biçimli deyimdir. Her tam cümleyi atasözü sayan ölçüt bu örnekte çalışmaz.",
          },
        ],
        answer: "Hayır; bu kullanım cümle biçimli deyimdir.",
        check: "Tür kararı yalnız nokta veya çekimli fiile dayanmadı.",
        pitfall:
          "Genel öğüt ile belirli durumun kalıpla anlatılmasını birbirine karıştırma.",
      },
    ],
    recall: [
      {
        prompt: "Mecazlı bir söz mutlaka deyim midir?",
        answer:
          "Hayır. Kalıplaşmışlık ve yerleşik anlam da gerekir; özgün benzetme tek başına deyim olmaz.",
      },
      {
        prompt:
          "Deyimde çekim eki değişmesiyle kalıp sözcüğünü değiştirmek aynı mıdır?",
        answer:
          "Hayır. Kişi/zaman uygun biçimde uyarlanabilir; yerleşik sözcükler keyfî eş anlamlılarla değiştirilemez.",
      },
      {
        prompt: "Gözden düşmek ile gözden kaçmak hangi sonuçlarla ayrılır?",
        answer: "İlki değer veya itibar yitirme; ikincisi fark edilmeme.",
      },
      {
        prompt: "Her tamamlanmış cümle biçimli kalıp atasözü müdür?",
        answer:
          "Hayır. Cümle biçimli deyimler de vardır; kalıbın işlevi ve yerleşik türü birlikte okunur.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri: Söz Öbekleri; Aurelia Deyimler ve Atasözleri kâğıdıyla karşılaştırılan özgün anlatım ve sorular. Yeni kartlar resmî sınav sorusu değildir.",
  },
  {
    id: "cumlede-anlam",
    title: "Cümlede anlam: ilişkiyi ve kapsamı izle",
    minutes: 105,
    objectives: [
      "Neden, amaç, koşul ve çıkarımın yönünü tam yargılardan belirle.",
      "Kesinlik, nicelik ve konuşanın tutumunu koruyarak yorum yap.",
      "Yakın anlam, anlatım biçimi ve duygu sınıflarını kanıtlarıyla ayır.",
      "Tek ek veya bağlaca göre karar vermeden karşı örneği denetle.",
    ],
    sections: [
      {
        title: "Önce iki yargıyı açık yaz",
        paragraphs: [
          "Cümlede anlam sorularında sözcük ezberinden önce kim hakkında hangi yargının kurulduğunu belirle. “Yağmur arttığı için yol kapandı.” sözünde yağmurun artması ve yolun kapanması iki ayrı durumdur. Sonra aralarındaki bağı sor: biri diğerinin nedeni mi, hedefi mi, gerçekleşme koşulu mu? Aynı bağlaç farklı içerikle başka ilişki kurabileceğinden iki yargının anlamı birlikte okunur.",
          "Yorumu cümlenin verdiği sınırda tut. Yargının öznesi, zamanı, olumlu veya olumsuz oluşu ve kesinliği değişirse aynı anlam kalmayabilir. Önce doğrudan söyleneni sadeleştir; sonra gerekiyorsa bundan zorunlu çıkan sonucu yaz. Uygulamadaki hazırlanmış örnekler bu ayrımı çizgilerle görünür kılar; sınırlı örnekleri serbest yazılmış her cümleyi anlayan genel bir dil çözümleyicisi gibi kullanma.",
        ],
      },
      {
        title: "Neden ile sonucu ters çevirme",
        paragraphs: [
          "Neden-sonuç ilişkisinde bir durumun meydana gelmesini açıklayan etken verilir. “Otobüs arızalandığı için yolcular bekledi.” cümlesinde arıza neden, bekleme sonuçtur. Metindeki sözcük sırası değişebilir: “Yolcular bekledi çünkü otobüs arızalandı.” aynı nedenin sonradan söylenmesidir. Neden oku arızadan beklemeye gider; sırada önce gelen her yargı neden değildir.",
          "Bu ilişki bir olay açıklamasıdır; yalnız art arda gerçekleşme otomatik neden kanıtı olmaz. “Saat çaldı, pencere açıldı.” tek başına ikinci olayın birinciden kaynaklandığını kesinleştirmez. Soruda neden bağı açık verildiğinde onu izle; yalnız zaman ilişkisi verildiğinde gizli neden ekleme. Neden ve sonucu kendi sözcüklerinle ayrı yazmak ters yönlü çıkarımları önler.",
        ],
      },
      {
        title: "Amaç niyettir, başarı haberi değildir",
        paragraphs: [
          "Amaç, bir eylemle ulaşılmak istenen hedeftir. “Kaydı bulmak için arşive gitti.” sözünde gitmek yapılan eylem, kaydı bulmak hedeftir. Bu cümle kişinin arşive gittiğini ve hedefini bildirir; kaydı bulduğunu tek başına kesin söylemez. Amaç hedefini gerçekleşmiş bir neden gibi okumamak gerekir.",
          "Amaç anlatılması, hedefin hiçbir zaman gerçekleşmediği anlamına da gelmez. Sonraki cümle “Aradığı kaydı orada buldu.” derse başarı ayrıca doğrulanır. “İçin” sözcüğü hem amaçta hem nedende bulunabilir; “bulduğu için sevindi” gerçekleşmiş bulmayı neden yaparken “bulmak için gitti” hedefi gösterir. Eke veya sözcüğe bakmanın ardından mutlaka yargıların ilişkisini denetle.",
        ],
      },
      {
        title: "Koşul ve gerçekleşme bilgisi",
        paragraphs: [
          "Koşul cümlesi bir yargının gerçekleşmesini başka bir duruma bağlar: “Bilet bulursa geziye katılacak.” Katılma, bilet bulma şartıyla sunulur. Bu söz ne biletin bulunduğunu ne de katılmanın gerçekleştiğini tek başına bildirir. Koşulu açık yazmak, henüz doğrulanmamış bir ihtimali olmuş gibi yorumlamanı engeller.",
          "Her -sa eki koşul değildir: “Keşke yağmur yağsa.” dilek bildirir. Her -ınca eki de yalnız koşul değildir; “Eve gelince dinlendi.” gerçekleşmiş olayların zamanını anlatabilir. “Yeter ki”, “ancak”, “ama” gibi sözler de farklı bağlamlarda koşul kurabilir. Hazır işaret listesi yerine “Hangi şartla?” sorusunun gerçekten bu cümlenin anlamına uyup uymadığını sınamalısın.",
        ],
      },
      {
        title: "Karşıtlık ve beklenti kırılması",
        paragraphs: [
          "“Çok çalıştı ama işi bitiremedi.” ikinci yargı, çalışmanın işi bitirmeye götürmesi beklentisini bozar. “Hava soğuktu fakat yürüyüşe çıktık.” örneğinde de beklenen davranışla gerçekleşen davranış arasında karşıtlık vardır. Karşıtlık mutlaka iki sözlük karşıtının yan yana gelmesi değildir; iki durumun bağlamdaki ilişkisi önemlidir.",
          "Ama, fakat, oysa, ne var ki gibi bağlaçların her biri bulunduğu yargıyla birlikte okunur. “Kitabı al, ama geri getir.” sözünde ama bir koşul veya sınırlama da kurabilir. Aynı işaretin bütün kullanımlarını tek kategoriye zorlamak yanlış olur. Soru iki cümlenin ilişkisini istiyorsa önce ne beklendiğini, ardından gerçekte ne söylendiğini açıkça göster.",
        ],
      },
      {
        title: "Gerekçe ile çıkarım farklı yönlerdir",
        paragraphs: [
          "“Kütüphane kapalıydı çünkü bakım yapılıyordu.” bakım, kapanmanın gerekçesidir. “Kapıda bakım levhası var; demek ki içeride çalışma yapılıyor.” ise görülen işaretten bir sonuca gitmektir. Levha, çalışmanın fiziksel nedeni değildir; çıkarımın dayanağıdır. Okun yönünü “neden oldu?” ve “hangi kanıttan bunu düşündü?” sorularını ayırarak belirle.",
          "Açıklama, bir yargıyı daha anlaşılır kılabilir; yalnız sonuçtan sonra neden yazılmasıyla sınırlı değildir. “Yani” yeniden anlatma, “çünkü” gerekçe, “öyleyse” çıkarım işleviyle kullanılabilir. Bunlar bazen aynı metinde birlikte yer alır. Bir işaretten çıkarım yapmak da her zaman kesin doğru olmak değildir; eldeki kanıtın hangi sonucu ne ölçüde desteklediğini koru.",
        ],
      },
      {
        title: "Yakın, eş ve karşıt yargılar",
        paragraphs: [
          "Yakın anlamlı cümleler aynı konuya benzer yönden yaklaşabilir; her kelimenin eş anlamlı olması gerekmez. “Plan ancak uygulandığında değer kazanır.” ile “Uygulamaya dönüşmeyen tasarı tek başına yeterli değildir.” aynı temel düşünceyi farklı kurar. Yakınlığı bulurken konu kadar yargının yönünü ve sınırını da karşılaştır.",
          "Aynı konudan söz eden iki cümle karşıt da olabilir: biri planlamayı gereksiz, diğeri zorunlu sayabilir. “Her zaman”, “yalnızca”, “bazen” gibi sözcükleri silerek cümleleri zorla eşitleme. Bir cümle ayrıntı ekliyorsa tamamen eş değer değil, kısmen örtüşen olabilir. Seçenekler arasında en yakın olanı ararken verilen yargının amaç ve kapsamını en çok koruyanı seç.",
        ],
      },
      {
        title: "Nicelik sözcüklerinin sınırı",
        paragraphs: [
          "Bazı, çoğu, hepsi, hiçbiri, en az ve en çok farklı kapsamlar kurar. “En az üç öğrenci geldi.” iki öğrenciyi dışlar; dört veya beş öğrenciyi dışlamaz. “Çoğu geldi.” verilen grubun yarısından fazlasının geldiğini söyler. “Bütün öğrenciler geldi.” ise grubun tamamını kapsar. Birini diğerine çevirirsen aynı bilgi korunmaz.",
          "“Bazı öğrenciler yürüdü.” en az bir bölümün yürüdüğünü bildirir. Tek başına geri kalanların kesinlikle yürümediğini kanıtlamaz; günlük dilde oluşabilen çağrışımı zorunlu mantıksal sonuçla karıştırma. Benzer biçimde bir sınır değeriyle kesin sayıyı ayır. Çıkarım sorusunda doğru seçenek, hem verilenlerle uyuşmalı hem de ek varsayım gerektirmeden çıkmalıdır.",
        ],
      },
      {
        title: "Kesinlik, olasılık ve tahmin",
        paragraphs: [
          "“Yarın yağmur yağabilir.” olasılığı ifade eder; “Yarın kesin yağmur yağacak.” daha güçlü bir kesinlik iddiasıdır. Olasılığı kesin olaya dönüştürmek ya da bir ihtimali imkânsız saymak metni aşar. Tahminde ise gözlem veya ipuçlarından hareketle bir durumun nasıl olacağı hakkında fikir yürütülür: kararan bulutlara bakıp yağışı öngörmek gibi.",
          "Tahmin ve olasılık bazı örneklerde birlikte bulunabilir; bunlar her zaman birbirini dışlayan kutular değildir. “Sanırım” sözü tek başına kanıtın ne olduğunu söylemez. Soru özellikle tahmin–ön yargı ayrımı istiyorsa kişi hangi bilgiye bakıyor, deneyim var mı, peşin karar mı veriyor diye bağlamı oku. Uygulamadaki kartlar gereken ipucunu açıkça verir; gelecekle ilgili her yargıyı peşin hüküm saymaz.",
        ],
      },
      {
        title: "Varsayım, ön yargı ve saptama",
        paragraphs: [
          "Varsayım, düşünmek için bir durumu geçici olarak olmuş veya olmamış kabul etmektir: “Diyelim ki otobüsü kaçırdın; başka nasıl gidersin?” otobüsün gerçekten kaçtığını haber vermez. Ön yargı ise yeterli inceleme olmadan önceden verilmiş olumlu veya olumsuz hükümdür. “Kitabı açmadım ama kesin kötü.” bağlamı peşin değerlendirmeyi açıkça gösterir.",
          "Saptama bir durumun belirlenip ortaya konmasıdır: “Listede üç isim eksik.” bir tespittir. Bunun doğru olup olmadığı listeyle ayrıca denetlenebilir. Saptama, öneri veya beğeniyle aynı şey değildir. Aynı cümlede birden çok işlev bulunabilir; soru hangi kısmı veya baskın tutumu istiyorsa onu kanıtıyla göster. Etiketi yalnızca bir sözcüğün görünmesine bağlama.",
        ],
      },
      {
        title: "Öznel ve nesnel anlatım",
        paragraphs: [
          "Öznel yargı kişisel beğeni, duygu veya değerlendirme taşır: “Bu öykünün sonu çok etkileyici.” herkesçe aynı biçimde ölçülmek zorunda değildir. Nesnel türdeki yargı ise kişisel beğeniye dayanmadan denetlenebilir: “Öykü üç bölümden oluşuyor.” genel kanı veya çoğunluğun hoşuna gitme, nesnelliğin ölçütü değildir.",
          "Bir iddianın nesnel türde olması, onun gerçekte doğrulandığı anlamına gelmez. Bölüm sayısı yanlış söylenmiş olabilir ama sayı yine kişisel zevk konusu değildir. Bir cümlede nesnel bilgiyle öznel yorum birlikte de bulunabilir: “Üç bölümlük bu öykü çok etkileyici.” İki katkıyı ayrı göster. Yalnız rakam bulunduğu için bütün cümleyi nesnel sayma.",
        ],
      },
      {
        title: "Tanım, içerik ve biçem",
        paragraphs: [
          "Tanım “Nedir, kimdir?” sorusuna cevap vererek kavramın ne olduğunu açıklar. Tanımlar nesnel kurulabileceği gibi kişisel yorum içerebilir; “Şiir, insanın iç yolculuğudur.” öznel bir tanımlamadır. Sonunda -dır bulunması tek başına tanım ölçütü değildir. “Bu masa eskidir.” bir nitelik bildirir, masanın ne olduğunu tanımlamaz.",
          "İçerik, eserin ne anlattığıyla; biçem veya üslup, bunu nasıl anlattığıyla ilgilidir. “Göç eden bir ailenin yaşamını anlatır.” içerik; “Kısa cümlelerle ve gündelik konuşmayla anlatır.” biçem bilgisidir. Bir cümle ikisini birlikte verebilir. Konu ve söyleyiş unsurlarını ayrı işaretle; sade dil kullanımını konu, aile yaşamını anlatım tekniği diye adlandırma.",
        ],
      },
      {
        title: "Doğrudan ve dolaylı aktarım",
        paragraphs: [
          "Doğrudan anlatımda başka kişinin sözü, onun söylediği biçimiyle aktarılır: Ece “Yarın geleceğim.” dedi. Dolaylı anlatımda söz yeni cümleye uyarlanır: Ece ertesi gün geleceğini söyledi. Kişi, zaman veya gösterme sözcükleri aktarım bağlamına göre değişebilir. Tırnak işareti tek başına bütün anlam ilişkisini çözmez; kimin hangi sözü aktardığını izle.",
          "Aktarımı değiştirirken asıl kişinin tutumunu koru. “Gelebilirim.” olasılığını “geleceğini kesin söyledi” diye aktarmak anlamı güçlendirir. Yarın sözü de anlatımın zamanına göre ertesi gün olabilir; bağlam bilinmeden tarih uydurulmaz. Başkasının sözünü aktarmak, aktaran kişinin o düşünceyi onayladığı anlamına gelmez. Söyleyen, aktaran ve yargının kesinliği ayrı tutulmalıdır.",
        ],
      },
      {
        title: "Karşılaştırma, eşitlik ve aşama",
        paragraphs: [
          "Karşılaştırma varlık veya durumları aynı ölçüt üzerinden ilişkilendirir: daha hızlı, kadar geniş, en kısa gibi. Eşitlik için hangi niceliğin eşit olduğu açık olmalıdır; bir elmayı yalnız ikiye bölmek parçaların eşit büyüklükte olduğunu garanti etmez. “İki eşit yarıya ayırdı.” bu bilgiyi açık verir. Sayı ve ölçütün belirsiz olduğu yerde eşitlik ekleme.",
          "Aşamalı durum, değişimin süreç içinde dereceli ilerlemesidir: “Ses giderek azaldı.” bir anda olan değişmeden ayrılır. Gün geçtikçe, gittikçe, yavaş yavaş gibi sözler ipucu olabilir; fakat yine gerçekleşen değişime bak. Bir cümle hem karşılaştırma hem aşama içerebilir. Farklı eksenlerdeki etiketleri tek birinin mutlaka ötekini dışladığı düşüncesiyle karıştırma.",
        ],
      },
      {
        title: "Sitem ile yakınma",
        paragraphs: [
          "Sitemde konuşan, birine davranışı nedeniyle kırıldığını veya gücendiğini hissettirir: “Bunca zaman bir kez bile aramadın.” sözünde muhataba yönelen bir beklenti ve incinme vardır. Yakınma ise bir durumdan şikâyet etmedir: “Otobüsler yine çok geç geliyor.” İkisi benzer olumsuz duygular taşısa da birinde kişisel ilişkiye yönelen kırgınlık daha belirgindir.",
          "Soru işareti sitemi dışlamaz; “Beni aramak hiç aklına gelmedi mi?” biçimce sorarken sitem edebilir. Her olumsuz cümle de yakınma değildir; yalnız bir olayı bildirebilir. Konuşanın kime, ne sebeple ve hangi beklentiyle seslendiğini incele. Gerekli bağlam verilmeden ton icat ederek tek cümledeki her olumsuz bilgiyi şikâyet saymamalısın.",
        ],
      },
      {
        title: "Pişmanlık ve hayıflanma",
        paragraphs: [
          "Pişmanlık, yapılan bir iş veya söylenen söz nedeniyle üzüntüdür: “Keşke ona o kırıcı sözü söylemeseydim.” Hayıflanma ise çoğu okul örneğinde yapılmamış veya değerlendirilememiş fırsat için üzülmeyi anlatır: “Keşke gençken yüzme öğrenseydim.” İkisinde de keşke bulunabilir; ayrımı yalnız bu sözcük değil, yapılan veya yapılamayan davranış kurar.",
          "Önce olayın gerçekleşme durumunu yaz. Konuşan yaptığı bir davranışın sonucundan mı üzülüyor, yoksa yapmadığı şeyin eksikliğini mi hissediyor? Bir cümle öz eleştiri de içerebilir; kişi kendi davranışını olumsuz değerlendiriyorsa bu başka bir eksendir. Etiketleri ezberden yarışa sokmak yerine sorunun istediği ayrımı ve cümledeki kanıtı eşleştir.",
        ],
      },
      {
        title: "Tasarı, öneri ve dilek",
        paragraphs: [
          "Tasarı gelecekte yapılması düşünülen planı bildirir: “Yazın öykülerimi kitaplaştırmayı planlıyorum.” Öneri bir davranış için yol gösterir: “Taslağını önce kısa bölümlerle gözden geçirsen iyi olur.” Dilek ise gerçekleşmesi istenen durumu ifade eder: “Keşke bütün ekip gelebilse.” Plan, tavsiye ve istek aynı cümle işlevi değildir.",
          "Gelecek zaman eki görmek tek başına tasarıyı kanıtlamaz; hava tahmini de gelecekten söz edebilir. Öneride de emir eki bulunması şart değildir; soru veya koşul görünümünde tavsiye verilebilir. Dilekteki istek, olayın gerçekleştiği haberi değildir. Hazırlanmış örnekte kimin plan kurduğunu, kime öneri verildiğini veya hangi durumun arzulandığını açıkça belirle.",
        ],
      },
      {
        title: "Beklenti ve kanıksama",
        paragraphs: [
          "Beklenti, olması umulan veya öngörülen durumdur. Gerçekleşmemiş beklenti için umulanla gerçek sonucun farklı olduğu açık olmalıdır: “Toplantının kısa süreceğini sanmıştım ama üç saat sürdü.” Yalnız sanmıştım sözcüğü bulunan her bağlamdan sonuç kesin çıkarılmamalıdır; devamı veya durum bilgisi yorumu belirginleştirir.",
          "Kanıksama, tekrarlanan bir duruma alışıp eskisi gibi tepki vermemektir: “Her günkü gürültüyü artık fark etmiyordu.” Bu, gürültüyü beğendiğini veya onayladığını zorunlu kılmaz. Alışma ile kabullenilmiş beğeniyi ayır. Bir olayı çok kez yaşamış olmak tek başına kanıksama değildir; tepkinin azaldığı veya sıradanlaştığı bilgisi de gerekir.",
        ],
      },
      {
        title: "Küçümseme, azımsama ve öz eleştiri",
        paragraphs: [
          "Küçümsemede kişi, eser veya davranış değersiz ya da önemsiz görülür: “Bu işi çocuk oyuncağı sanıyor.” Azımsamada bir miktar beklenenden az bulunur: “Bu kadar emeğe yalnız iki puan mı?” Kişiyi veya işin değerini küçük görmekle sayı, para veya süreyi yetersiz bulmak aynı şey değildir. Nesneyi ve değerlendirme ölçütünü ayrı göster.",
          "Öz eleştiride konuşan kendi tutumunu olumsuz değerlendirir: “Hazırlık yapmadan konuşmam yanlıştı.” Bu cümle yapılan iş için pişmanlık da taşıyabilir; öz eleştiri kişinin kendine yönelttiği değerlendirme eksenidir. Aynı ifadenin birden fazla uygun özelliği olabileceğini unutma. Soru seçenekleri arasında bağlamı açık verilen ayrımı kullan; miktar olmayan yerde sırf küçük sözü var diye azımsama seçme.",
        ],
      },
      {
        title: "Alay ve tersini kastetme",
        paragraphs: [
          "“Ne kadar dakiksin, yine yarım saat geç kaldın!” sözünde övgü sözcüğü gerçek övgü niyetiyle kullanılmaz; ikinci yargı tersini kastetmeyi ve alayı açık eder. Burada görünen anlamla amaçlanan tutum ayrılır. Bunu anlamak için konuşanın gözlemlediği davranışı ve sözün bu davranışla uyuşup uyuşmadığını incele.",
          "Alay, her mecazla veya kinayenin bütün tanımlarıyla aynı şey değildir. Bir sözün hem gerçek hem mecaz okunabilmesi başka bir özellik; tersini söyleyerek eleştirmek başka bir işlevdir. Kaynaklar kinayeli anlatım başlığını farklı genişlikte kullanabilir. Bu ünitede sözün işlevi açık olayla açıklanır; bağlam olmadan yalnız güzel veya çalışkan sıfatı görerek alay hükmü verilmez.",
        ],
      },
      {
        title: "Çıkarımı metnin sınırında tut",
        paragraphs: [
          "Son denetimde yorumu doğrudan cümleye geri götür. Kimin eylemi, hangi zaman, hangi nicelik ve hangi kesinlik var? “Çoğu yetişti.” sözünden hiç kimsenin yetişmediği çıkmaz; “Bazı ürünler pahalı.” bütün ürünlerin pahalı olduğunu zorunlu kılmaz. Bir seçeneğin mümkün olması, cümleden kesin çıkarılmasıyla aynı şey değildir.",
          "Çözümünü etiket artı kanıt biçiminde kur: “Amaç; çünkü eylemin hedefi verilmiş, hedefe ulaşıldığı ayrıca söylenmemiş.” Ardından yakın hatayı açıkla: neden değil, zira hedef gerçekleşmiş sebep olarak sunulmuyor. Bu kısa gerekçe, aynı bağlacın başka işlevde olduğu yeni bir örneğe aktarımı kolaylaştırır. Etkileşimde tahminini yazman düşünceni görünür kılar; otomatik ustalık veya XP oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı için, iki ayrı ilişki",
        prompt:
          "“Dosya açıldığı için kayıt göründü.” ve “Kaydı görmek için dosyayı açtı.” cümlelerinde ilişkinin yönünü ayır.",
        strategy:
          "Yapılan olayla gerçekleşmiş etkeni veya istenen hedefi açık yaz.",
        steps: [
          {
            label: "İlk cümle",
            explanation:
              "Dosyanın açılması gerçekleşmiş etken olarak kaydın görünmesini açıklar; açılma → görünme yönünde neden-sonuç kurulur.",
          },
          {
            label: "İkinci cümle",
            explanation:
              "Dosyayı açmak yapılan eylem, kaydı görmek bu eylemin hedefidir. Hedefe ulaşıldığı ayrıca haber verilmiyor.",
          },
          {
            label: "Sınır",
            explanation:
              "İçin iki cümlede de bulunduğundan tek başına etiket değildir. İkinciden kaydın kesin görülmediği de çıkmaz; başarı bilgisi ek bağlam ister.",
          },
        ],
        answer: "İlki neden-sonuç, ikincisi amaç ilişkisidir.",
        check: "Aynı sözcük kullanıldı; yargıların anlam ilişkisi değişti.",
        pitfall: "Amaç söylenince hedefin kesin başarısız olduğunu varsayma.",
      },
      {
        title: "Kanıt oku ile neden okunu ayır",
        prompt:
          "“Kapıda bakım levhası var; demek ki içeride çalışma yapılıyor.” sözünde levha, çalışmanın nedeni midir?",
        strategy: "Görülen veri ile çıkarılan yargıyı ayrı belirt.",
        steps: [
          {
            label: "Veri",
            explanation:
              "Konuşan kapıdaki levhayı görüyor. Bu, onun çıkarımına dayanak oluşturuyor.",
          },
          {
            label: "Çıkarım",
            explanation:
              "Levhadaki bilgiden içeride çalışma olduğu sonucuna varıyor; sözün düşünme yönü veriden sonuca gidiyor.",
          },
          {
            label: "Neden sınırı",
            explanation:
              "Levhanın bulunması çalışmayı fiziksel olarak başlatan neden değildir. Bir işaretle onun gösterdiği olay arasındaki bağı neden-sonuçla eşitleme.",
          },
        ],
        answer: "Hayır; levha çıkarımın dayanağıdır.",
        check:
          "Demek ki ile kurulan sonuç, işaretin hangi olayı düşündürdüğünü gösterir.",
        pitfall:
          "Kanıt → sonuç yönünü gerçek olay nedeni diye ters veya farklı sınıfa taşıma.",
      },
      {
        title: "Bazı ve en az: kesin olanı koru",
        prompt:
          "“En az üç öğrenci yürüyerek geldi; bazı öğrenciler de bisiklet kullandı.” Yürüyenler tam üç müdür? Herkesin yürüdüğü çıkar mı?",
        strategy:
          "Alt sınır ile kesin sayı ve varlık bildirimiyle tümel yargıyı ayır.",
        steps: [
          {
            label: "Alt sınır",
            explanation:
              "En az üç, üç veya daha fazla demektir. Tam üç sonucunu tek başına vermez; iki kişiyi dışlar.",
          },
          {
            label: "Alt küme",
            explanation:
              "Bazı öğrencilerin bisiklet kullandığı bildirilir. Bu cümle bütün grupta kimlerin başka gün veya başka aşamada yürüdüğünü söylemez.",
          },
          {
            label: "Kesin sonuç",
            explanation:
              "En az üç yürüyen vardır. Herkesin yürüdüğü veya tam üç kişinin yürüdüğü zorunlu sonuç değildir; mümkün sonuçla kesin çıkarımı ayır.",
          },
        ],
        answer:
          "Tam üç veya herkes sonucu çıkmaz; en az üç yürüyen olduğu çıkar.",
        check: "Verilen sayı sınırı ve nicelik sözcükleri aynen korundu.",
        pitfall:
          "Bazı sözcüğünü kalanların her durumda kesin olumsuzluğu gibi yorumlama.",
      },
      {
        title: "Yapılan iş mi, kaçırılan fırsat mı?",
        prompt:
          "“Keşke o kırıcı sözü söylemeseydim.” ile “Keşke gençken yüzme öğrenseydim.” ifadelerinde üzüntünün kaynağını ayır.",
        strategy:
          "Önce ilgili davranışın gerçekleşip gerçekleşmediğini belirle.",
        steps: [
          {
            label: "İlk davranış",
            explanation:
              "Kırıcı söz söylenmiştir; konuşan yaptığı davranıştan üzülür. Bu, pişmanlık örneğidir.",
          },
          {
            label: "İkinci fırsat",
            explanation:
              "Gençken yüzme öğrenilmemiştir; konuşan gerçekleştirmediği veya değerlendirmediği fırsat için üzülür. Bu, hayıflanma örneğidir.",
          },
          {
            label: "İşaret sınırı",
            explanation:
              "Keşke her ikisinde bulunur. Ayrımı sözcük tek başına değil, yapılan davranış ile yapılmamış fırsatın açık bağlamı kurar.",
          },
        ],
        answer: "İlki pişmanlık, ikincisi hayıflanma.",
        check: "Duygu ortak; gerçekleşme durumları farklı.",
        pitfall: "Bütün keşke cümlelerini tek duygu etiketiyle çözme.",
      },
    ],
    recall: [
      {
        prompt: "Amaç bildirilen bir cümle hedefin sonucunu kesin gösterir mi?",
        answer:
          "Hayır. Niyet verilir; başarı veya başarısızlık için ayrıca bilgi gerekir.",
      },
      {
        prompt: "Geleceğe ait her yargı ön yargı mıdır?",
        answer:
          "Hayır. Tahmin, plan veya olasılık olabilir; ön yargı için incelemeden verilmiş peşin hüküm bağlamı aranır.",
      },
      {
        prompt: "Nesnel türde bir iddia mutlaka doğrulanmış doğru mudur?",
        answer:
          "Hayır. Denetlenebilir olmasıyla gerçekten doğru olması ayrı sorulardır.",
      },
      {
        prompt: "Sitem–yakınma ve azımsama–küçümseme nasıl ayrılır?",
        answer:
          "Sitem kişisel kırgınlığı, yakınma şikâyeti öne çıkarır. Azımsama miktarı yetersiz, küçümseme kişiyi/işi değersiz görür.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri: Cümlede Anlam 1–3; Aurelia Cümlede Anlam kâğıdıyla karşılaştırılan özgün anlatım ve sorular. Etiketler gerçek bağlam ve istisnalarıyla açıklanmıştır.",
  },
  {
    id: "paragrafa-giris",
    title: "Paragrafa giriş: cümleleri bir bütüne bağla",
    minutes: 85,
    objectives: [
      "Konuyu, ana düşünceyi ve ayrıntıyı tam paragraftan ayır.",
      "Girişin bağımsızlığını gerçek gönderme ve devam cümleleriyle denetle.",
      "Cümleler arasında kavram, zaman ve gerekçe bağlarını kur.",
      "Sıralama, ekleme ve bölmede iki komşu bağı da doğrula.",
    ],
    sections: [
      {
        title: "Paragraf bir cümle yığını değildir",
        paragraphs: [
          "Paragraf, bir konu veya düşünce çevresinde birbirine bağlanan cümlelerle bir bütün kurar. Aynı sözcüğü tekrar etmek tek başına bütünlük sağlamaz; cümlelerin neyi açıkladığı, neye örnek verdiği ve hangi yargıyı ilerlettiği önemlidir. Bir arşiv metninde bütün cümleler kayıt sözcüğünü taşısa bile biri kayıtların korunmasını, diğeri ilgisiz bir müzik kaydını anlatıyorsa bağ kopabilir.",
          "İlk okumada her cümleye kısa bir işlev notu ver: konuyu açma, örnek, neden, karşıtlık, sonuç gibi. Sonra komşu cümlelerin birbirine nasıl bağlandığını söyle. Bu notlar değişmez bir şablon değildir; bir cümle birden fazla iş yapabilir. Amaç, bütünün neden bu sırada anlamlı olduğunu görmek; yalnız uzun metin okumak veya bir anahtar sözcük saymak değildir.",
        ],
      },
      {
        title: "Konu ile ana düşünceyi ayır",
        paragraphs: [
          "Konu, neyin anlatıldığını; ana düşünce ise o konuda iletilen temel yargıyı verir. “Kent arşivleri” konu olabilir; “Arşivlerin işe yaraması, kayıtların erişilebilir biçimde düzenlenmesine bağlıdır.” bu konuda bir temel yargıdır. Sırf en çok geçen adı bulmak ana düşünceyi vermeyebilir. Bütün paragrafın hangi mesaj için kurulduğunu sor.",
          "Ana düşünce her zaman son cümlede birebir yazılı değildir; başta verilip açıklanabilir veya bütün ilişkiden çıkarılabilir. Ayrıntı ise bu temel yargının bir parçasını destekler. Konuyu çok geniş “kültür” diye vermek, arşivlerin erişimi üzerine kurulmuş metnin özgül yönünü kaybettirebilir. Çok dar bir belge örneğini bütün konu gibi sunmak da diğer cümleleri dışarıda bırakır.",
        ],
      },
      {
        title: "Giriş konuyu veya sahneyi açar",
        paragraphs: [
          "Giriş, okuyucuya bu paragrafta neyin konuşulacağını başlatır. Bir tanım, soru, gözlem, genel yargı veya kişisel olay giriş işlevi görebilir. “Sabah arşivin kapısında uzun bir sıra vardı.” kişisel gözleme dayalı bir anlatıyı başlatabilir; her girişin soyut bir tanım olması gerekmez. Uygunluğu, ardından gelen cümlelerin neyi geliştirdiği belirler.",
          "Giriş adayını kendi başına oku: açıklanmamış kişi, nesne veya önceki yargıya bağımlı mı? Sonra devamındaki iki cümleyle birlikte oku. Bağımsız ve güzel görünen bir cümle, verilen devam farklı konudaysa bu paragrafın girişi olmayabilir. En genel cümleyi otomatik ilk sıraya koymak yerine, tam metnin açtığı konu ve bakışı koru.",
        ],
      },
      {
        title: "Gönderme sözü öncülünü arar",
        paragraphs: [
          "“Bu nedenle kayıtlar tarandı.” sözü, taramaya yol açan nedeni aratır. “O da aynı yöntemi kullandı.” ise kişinin kim olduğunu ve yöntemin ne olduğunu bilmemizi gerektirebilir. Bu tür açık öncül bağı çoğu sıralama sorusunda bir cümlenin daha önce gelmesi gerektiğini gösterir. Öncülü tam cümlede veya önceki cümlede bulmadan yalnız zamir etiketini sayma.",
          "Gönderme her zaman önceki ayrı cümleye gitmez. “Eski belgelerin dağınık oluşu, bu belgeleri bulmayı güçleştiriyor.” ifadesinde bu belgeler, aynı cümledeki eski belgelere döner. Dolayısıyla bu, o, aynı veya de görülmesi otomatik giriş yasağı değildir. Tam cümledeki gerçek referansı ve paragrafın başlangıç bağlamını birlikte denetle.",
        ],
      },
      {
        title: "Gelişme yargıyı ilerletir",
        paragraphs: [
          "Gelişme cümleleri konuyu açıklayabilir, örneklendirebilir, gerekçelendirebilir veya karşı görüşle derinleştirebilir. “Bazı belgelerin tarih etiketi yoktu.” ayrıntısı, kayıtların bulunmasının neden güçleştiğini somutlaştırabilir. Bir örneğin işlevini belirlemek için “Hangi daha geniş yargıyı gösteriyor?” diye sor. Salt ayrıntı olması cümleyi gereksiz yapmaz.",
          "Tanımlama, karşılaştırma, örnekleme, sayısal bilgi veya tanık sözü farklı düşünce geliştirme yollarıdır. Bunları paragrafın ana amacıyla karıştırma: bir örnek içeren metin bütün olarak açıklayıcı veya tartışmacı olabilir. Gelişme bölümünü yalnız ortadaki sıra numarasıyla adlandırmak yerine, cümlenin bütüne yaptığı katkıyı açıklamalısın.",
        ],
      },
      {
        title: "Kapanış her zaman kesin bir sonuç sözü değildir",
        paragraphs: [
          "Kapanış, paragrafın düşüncesini bağlayabilir, özetleyebilir veya anlatılan sahneyi sonlandırabilir. “Böylece aradığımız kayda birkaç dakikada ulaştık.” önceki işlemlerin sonucunu verebilir. Fakat her son cümlede sonuç olarak gibi bir işaret bulunmaz. Bir olay anlatımı kapının kapanmasıyla bitebilir; temel düşünce ayrıca kalıp bir sonuç cümlesinde yazılmayabilir.",
          "Giriş, gelişme ve sonuç işlevleri yararlı bir okuma çerçevesidir; her kısa paragrafın üç ayrı cümleden oluşması zorunlu değildir. “Çünkü” ile başlayan bir cümle de tam bağlamda gerekçeyi son sırada verebilir; sırf bağlacından dolayı sonuç etiketi kazanmaz. Yeri belirlerken önceki ve sonraki bağları, ana düşünceye katkısını ve bitiş etkisini birlikte değerlendir.",
        ],
      },
      {
        title: "Kavram zinciri ve zamir bağlantısı",
        paragraphs: [
          "Bir paragrafta aynı varlık adı tekrarlanabilir veya zamirle karşılanabilir. “Ece eski defteri buldu. Onun sayfalarını dikkatle çevirdi.” örneğinde onun sözü deftere gider. Kayıt, belge, defter gibi yakın kavramlar da bağ kurabilir; fakat her yakın sözcüğün aynı nesne olduğuna karar verme. Cümlede değişen kişi veya nesne varsa bunu açıkça izle.",
          "Sıralama sırasında her gönderme için bir ok düşün: sözü edilen şey nerede tanıtıldı? Ok önceki bir tanıtıma gidiyorsa yerel bağ desteklenir; henüz açıklanmamış bir işaret varsa eksik halka olabilir. Bazı edebî metinler bilerek geç tanıtır; bu ünitenin hazır örneklerinde ise amaçlanan öncül bağı açık verilir. Genel dilde her zamirin zorunlu en yakın ada gittiğini iddia etme.",
        ],
      },
      {
        title: "Zaman sırası ile neden sırası",
        paragraphs: [
          "Olaya dayalı bir paragrafta önce hazırlık, sonra uygulama, sonra sonuç sırası sık görülür: tohum ekme, filizlenmeyi izleme, ölçümleri karşılaştırma gibi. Ama anlatıcı geriye dönüş yapabilir; her geçmiş zamanlı cümle otomatik ilk olay değildir. Önce, sonra, o gün ve ertesi sabah gibi işaretlerin gerçekten hangi olaya bağlandığını sor.",
          "Zaman sırasıyla neden-sonuç da farklıdır. Bir olayın diğerinden önce olması onu tek başına neden yapmaz. Sıralama sorusunda gerekli neden verilmişse sonuçtan önce anlaşılır olması beklenebilir; yoksa gizli sebep ekleme. Cümlelerin zamanı, kişi odağı ve açıklanan olay aynı çerçevede mi diye kontrol ederek hem kronolojiyi hem düşünce yönünü korumalısın.",
        ],
      },
      {
        title: "Cümleleri sıralarken iki bağı da denetle",
        paragraphs: [
          "Bir cümleyi yerine koymak için yalnız öncekiyle uyumuna bakmak yetmez. Ardından gelen cümlenin zamiri, örneği veya sonucu da yeni sırada anlamlı olmalıdır. “Bu etiketler aramayı kolaylaştırdı.” cümlesinin önünde etiketlerin tanıtılması, ardından da nasıl kullanıldıklarının açıklanması gerekebilir. İki yönlü denetim, ilk uygun görünen boşluğa atlamanı önler.",
          "Önce güçlü ikilileri kur: tanıtım→gönderme, genel yargı→örnek, neden→sonuç veya hazırlık→uygulama gibi. Sonra bu küçük zincirleri bütünün amacıyla birleştir. Birden fazla mantıklı sıra mümkünken tek sıra istediğini iddia etme; soruların bağlayıcıları ve seçenekleri ayırt edici olmalıdır. Hazır etkileşim, yalnız kendi açık ilişkileri için hangi bağın koptuğunu gösterir.",
        ],
      },
      {
        title: "Paragrafa cümle ekleme",
        paragraphs: [
          "Eklenecek cümledeki yeni bilgiyi ve gönderme sözlerini önce belirle. “Bu ayrım, aranan yılı seçmemizi sağladı.” ifadesi hangi ayrımdan söz edildiğini bilmek ister. Sonra aday yerin iki yanını oku: önceki cümle bu ayrımı tanıtıyor mu, sonraki cümle bunun sonucunu sürdürüyor mu? Yalnız ortak bir sözcük bulmak doğru yeri garanti etmez.",
          "Cümleyi yerleştirdikten sonra metni baştan sona yeniden oku. Konunun yönü bozuldu mu, gereksiz bir tekrar mı oluştu, henüz tanıtılmamış bir kişi mi çıktı? Gereken bilgi tek başına doğru olsa bile yanlış yerde bütünlüğü bozabilir. Ekleme sorularında dış dünyada doğru olmayı değil, bu metindeki anlam ve dil bağlarının birlikte korunmasını aramalısın.",
        ],
      },
      {
        title: "Akışı bozan cümle ve yeni paragraf",
        paragraphs: [
          "Akışı bozan cümle, paragrafın işlediği yönü açıklamadan başka yöne götürebilir. Arşiv kayıtlarının bulunabilirliği anlatılırken bina cephesinin boyasıyla ilgili bağımsız ayrıntı, mevcut düşünce zincirine hizmet etmeyebilir. Ancak ayrıntı, boyanın kayıtları korumaya etkisini açıklıyorsa bağ yeniden kurulabilir. Konu dışı kararı yalnız bir sözcüğün farklı görünmesine dayanmaz.",
          "İkiye bölmede ise iki anlamlı küçük bütün aranır. Yeni konuya veya konunun başka yönüne geçilen cümle, ardından gelenlerle ayrı bir zincir kurmalıdır. Her zaman veya kişi değişimi otomatik yeni paragraf değildir; önceki düşünceyi örnekliyor da olabilir. Bölme noktasının solunu ve sağını ayrı okuyup her ikisinin kendi odağını koruduğunu doğrula.",
        ],
      },
      {
        title: "Başlık bütünün sınırını taşır",
        paragraphs: [
          "Başlık, konuyu ve gerekiyorsa metnin bakışını kısa biçimde yansıtır. Kayıtları erişilebilir kılma üzerine kurulu bir paragraf için yalnız “Defter” çok dar, “İnsanlık” gereğinden geniş olabilir. Başlık seçerken metinde geçmesi yeterli değildir; diğer cümleleri de dışlamadan kapsaması gerekir. Dikkat çekici olması, konuyla bağının yerine geçmez.",
          "Konu, başlık ve ana düşünce aynı uzunlukta cevaplar olmak zorunda değildir. Konu bir söz öbeği, ana düşünce tam bir yargı olarak kurulabilir. Başlıkta yer almayan bir ayrıntının metinde bulunması hata değildir; her ayrıntıyı başlığa sığdırmaya çalışma. Kendi başlığını seçtikten sonra “Metnin yalnız bir örneğini mi adlandırdım, yoksa ortak odağı mı?” diye sınamalısın.",
        ],
      },
      {
        title: "Örnek ile asıl düşünceyi karıştırma",
        paragraphs: [
          "Bir paragraf, daha geniş bir yargıyı tek örnekle görünür kılabilir. Tek bir öğrencinin kayıtlarını etiketleyerek aramasını hızlandırması, düzenlemenin erişime katkısını gösterebilir. Ana düşünceyi yalnız o öğrencinin adı veya defter rengiyle sınırlamak örneği bütüne dönüştürür. Örneğin hangi iddiayı desteklediğini ayrı söyle.",
          "Benzer biçimde tanık sözü, karşılaştırma ve sayı verisi destek işlevi görür. Bir sayı bulunması onun metnin en önemli düşüncesi olduğu anlamına gelmez. Örneği çıkardığında kalan genel yargıyı, ardından o yargının örnekle nasıl somutlaştığını düşün. Tüm destekleri kapsayan ama metinde bulunmayan aşırı bir sonuç da eklememelisin.",
        ],
      },
      {
        title: "Anlatımın amacı ve açıklığı",
        paragraphs: [
          "Paragraf bilgi vermeyi, bir görüşü savunmayı, olay anlatmayı veya bir görünümü canlandırmayı amaçlayabilir. Aynı metinde farklı anlatım yolları birlikte bulunabilir; bir betimleme ayrıntısı, bütünün olay anlatma yönünü silmez. Önce “Okuyucuda hangi anlayış veya etki kurulmak isteniyor?” sorusunu cevapla, sonra kullanılan araçları belirle.",
          "Açıklık, duruluk, yalınlık ve akıcılık da farklı özelliklerdir. Belirsiz gönderme açıklığı; işlevsiz tekrar duruluğu; aşırı süslü söyleyiş yalınlığı etkileyebilir. Her tekrar kusur, her duygu değişimi tutarsızlık değildir; bilinçli vurgu ve zamanla değişen bakış anlamlı olabilir. Metnin kendi amacıyla çelişen somut noktayı bulmadan genel bir olumsuz etiket kullanma.",
        ],
      },
      {
        title: "Çıkarımda kapsamı koru",
        paragraphs: [
          "Paragrafta ulaşılamaz veya değinilmemiştir soruları, bildiğin konuyla değil verilen metinle çözülür. “Bazı belgeler sayısallaştırıldı.” cümlesi bütün belgelerin çevrim içi olduğu bilgisini vermez. Bir çıkarımın mümkün görünmesi, bu metinden zorunlu çıkmasıyla aynı şey değildir. Her seçeneğin kişi, zaman, nicelik ve kesinlik sınırını metindeki kanıtla karşılaştır.",
          "Olumsuz soru kökünü de işaretle: uygun olanı mı, uygun olmayanı mı arıyorsun? Önce diğer seçeneklerin hangi cümleyle desteklendiğini göster, sonra desteklenmeyene karar ver. Metni eksik bırakılmış bir kartın ana düşüncesi sorulamaz; bu ünitede yorum gerektiren her kartın tam paragrafı kendi içinde bulunur. Önceki ders sayfasına dönüp metin aramak gerekmez.",
        ],
      },
      {
        title: "Kısa bir okuma yolu oluştur",
        paragraphs: [
          "İlk turda konuyu ve yazarın bakışını bir cümleyle yaz. İkinci turda cümleler arasındaki iki veya üç güçlü bağı seç; üçüncü turda aday cevabı bu kanıtlarla denetle. Her soruda bütün metni satır satır aynı sayıda okumak şart değildir; ama zorlandığın gönderme veya kapsam noktasını atlayıp hız kazandığını sanma. Hız, ilişkilerin daha kolay görülmesiyle gelişir.",
          "Tekrar sırasında farklı bir kısa paragrafla aynı işlemi yap: giriş neden bağımsız, hangi cümle örnek, son yargı neyi bağlıyor? Hazır düzenleme modelinde sırayı değiştirdikten sonra kopan bağı kendi sözlerinle açıkla. Bir paragraftaki beş sorunun metni paylaşması gerektiğinde her kart yine tam metni göstermelidir; metni hatırlamayı ölçmeden okuduğunu anlamayı sınamak gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Tanıtım, gönderme ve sonuç zinciri",
        prompt:
          "A: “Bu etiketler aramayı hızlandırdı.” B: “Arşiv görevlisi her deftere yıl etiketi ekledi.” C: “Böylece aradığımız yılı birkaç dakikada bulduk.” Üç cümleyi verilen tanıtım ve sonuç bağına göre sırala.",
        strategy:
          "Önce bu etiketlerin öncülünü, ardından böylecenin sonucunu bul.",
        steps: [
          {
            label: "Öncül",
            explanation:
              "A’daki bu etiketler sözü için etiketlerin tanıtılması gerekir. B yıl etiketlerini ve ekleme işlemini açıkça verir; B, A’dan önce gelmelidir.",
          },
          {
            label: "Gelişme",
            explanation:
              "A eklenen etiketlerin aramayı nasıl etkilediğini açıklar. Bu bilgi B’deki uygulamayı sonuçla ilişkilendirir.",
          },
          {
            label: "Kapanış",
            explanation:
              "C böylece ile hızlı aramanın somut sonucunu verir. B → A → C sırası iki komşu bağı birlikte korur.",
          },
        ],
        answer: "B → A → C.",
        check:
          "Bu etiketler B’ye, böylece önceki uygulama ve hızlanmaya bağlanır.",
        pitfall: "Yalnız en kısa veya en genel cümleyi ilk sıraya koyma.",
      },
      {
        title: "Kişisel gözlem de giriş olabilir",
        prompt:
          "Devamı şöyledir: “İçeride bekleyenler ellerindeki eski fotoğrafları birbirine gösteriyordu. Ben de dedemin fotoğrafını çantamdan çıkardım.” Başına “Sabah arşiv kapısında sıraya girdim.” getirilebilir mi?",
        strategy:
          "Girişin sahneyi açıp devamındaki kişi ve yeri hazırladığına bak.",
        steps: [
          {
            label: "Yeni sahne",
            explanation:
              "Sabah, arşiv kapısı ve sıraya giren anlatıcı ilk cümlede tanıtılır. Önceki açıklamaya bağımlı bir bu nedenle ifadesi yoktur.",
          },
          {
            label: "Devam",
            explanation:
              "İçeride bekleyenler aynı sahneyi sürdürür. Ben de ifadesi fotoğraf gösteren öteki kişilere ve girişteki anlatıcıya bağlanır.",
          },
          {
            label: "Son kontrol",
            explanation:
              "Kişisel olaydan başlayan bu sıra anlamlıdır; girişin mutlaka soyut bir tanım olması gerekmez. Üç cümlenin kişi ve yer çerçevesi uyumludur.",
          },
        ],
        answer: "Evet; verilen devamla uyumlu kişisel bir giriş olur.",
        check:
          "Girişin uygunluğu yalnız kendinden değil devamla ilişkiden de doğrulandı.",
        pitfall: "Her girişe tanım veya evrensel yargı zorunluluğu yükleme.",
      },
      {
        title: "Konu ile temel yargı",
        prompt:
          "“Kent arşivleri yalnız belgeleri saklamakla görevini tamamlamaz. Yıllara göre etiketlenen ve arama kaydı tutulan belgeler daha kolay bulunur. Korunan bilgiye ulaşılabilmesi için düzenli erişim de gerekir.” Konuyu ve temel düşünceyi ayır.",
        strategy:
          "Önce ortak nesneyi, sonra bütünün bu nesne hakkındaki iddiasını yaz.",
        steps: [
          {
            label: "Konu",
            explanation:
              "Üç cümlede kent arşivlerindeki belgelerin korunması ve erişilebilirliği ele alınıyor. Tek bir yıl etiketi ayrıntısı bütün konu değildir.",
          },
          {
            label: "Destek",
            explanation:
              "Yıl etiketi ve arama kaydı örnekleri, saklamanın yanında düzenli erişimin nasıl sağlandığını somutlaştırıyor.",
          },
          {
            label: "Temel yargı",
            explanation:
              "Arşivin işlevini yerine getirmesi için yalnız saklama değil, bilgiye düzenli erişim de gereklidir. Bu yargı üç cümleyi birlikte kapsar.",
          },
        ],
        answer:
          "Konu arşivlerde erişilebilirlik; ana düşünce saklamanın erişim düzeniyle tamamlanması gereğidir.",
        check: "Başlangıçtaki yalnız ve sondaki de anlamı korundu.",
        pitfall:
          "Metnin yalnız belge saklamayı gereksiz bulduğunu söyleme; ek gereklilik anlatılıyor.",
      },
      {
        title: "Yeni paragrafın odağı",
        prompt:
          "I: “Fidelerin büyümesini her sabah ölçtük.” II: “Bu ölçümleri aynı çizelgeye yazdık.” III: “Dönem sonunda grafiklerden büyüme hızını karşılaştırdık.” IV: “Okul bahçesinin oturma alanı ise gölge düşünülerek tasarlandı.” V: “Banklar bu yüzden ağaçların yanına yerleştirildi.” İki paragraf için en uygun sınırı bul.",
        strategy:
          "Her tarafta kendi konusu ve gönderme bağı olan iki zincir ara.",
        steps: [
          {
            label: "İlk zincir",
            explanation:
              "I–III fidelerin ölçülmesi, kaydı ve grafikle karşılaştırılmasını sürdürür. II’deki bu ölçümler I’e gider.",
          },
          {
            label: "Yeni yön",
            explanation:
              "IV bahçede oturma alanının tasarımına geçer. Bu yön, fide büyüme ölçümlerini açıklamıyor; ardından gelen cümlenin yeni odağını açıyor.",
          },
          {
            label: "İkinci zincir",
            explanation:
              "V’teki bu yüzden IV’teki gölge düşüncesine bağlanır. IV’ten önce bölmek her iki tarafta anlamlı bir bütün bırakır.",
          },
        ],
        answer: "İkinci paragraf IV ile başlar.",
        check: "I–III ölçüm, IV–V oturma alanı tasarımıdır.",
        pitfall:
          "Bahçe sözcüğü ortak diye bütün cümlelerin aynı yönü işlediğini varsayma.",
      },
    ],
    recall: [
      {
        prompt: "Her giriş cümlesi genel tanım olmak zorunda mıdır?",
        answer:
          "Hayır. Soru, gözlem veya kişisel olay da giriş olabilir; devamla kurduğu bağı denetle.",
      },
      {
        prompt: "Bu veya o bulunması kesin giriş yasağı mıdır?",
        answer:
          "Hayır. Önce gerçek öncülü ara; tanıtım aynı cümle içinde kurulmuş olabilir.",
      },
      {
        prompt: "Bir cümleyi boşluğa koyunca neden iki yanını da okursun?",
        answer:
          "Önceki cümlenin verdiği bilgiyle yeni cümle, yeni cümleyle sonraki gönderme veya sonuç birlikte uyumlu olmalıdır.",
      },
      {
        prompt: "Konu, ana düşünce ve ayrıntı nasıl ayrılır?",
        answer:
          "Konu neyin anlatıldığı, ana düşünce bu konudaki temel yargı, ayrıntı ise onu açıklayan veya destekleyen parçadır.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri: Paragrafta Anlam ve Paragrafın Yapısı; OGM Paragrafta Anlam 1–2/Paragrafta Yapı ve Anlam sunuları ve Aurelia Paragrafa Giriş kâğıdıyla karşılaştırılan özgün öğretim. Yeni kartlar resmî sınav sorusu değildir.",
  },
];
type QuestionRow018 = {
  prompt: string;
  correct: string;
  distractors: [string, string, string, string];
  hint: string;
  explanation: string;
  passage?: string;
};
const questionRows018: Record<string, QuestionRow018[]> = {
  "deyimler-ve-atasozleri": [
    {
      prompt: "Bu bağlamdaki “göz kulak olmak” sözü hangi anlama gelir?",
      correct: "Gözetmek ve ilgilenmek.",
      distractors: [
        "Bir şeyi fark etmeden geçmek.",
        "Birinin değerini yitirmesi.",
        "Görme ve işitme organı yapmak.",
        "Bir fırsatı son anda kaçırmak.",
      ],
      hint: "Komşunun bitkilere ne yaptığını ve verilen bakım ayrıntılarını birlikte oku.",
      explanation:
        "Komşu bitkileri sulayıp gözetmiştir; göz kulak olmak burada ilgilenmek anlamında bütünüyle kullanılır. Fark edilmeme gözden kaçmak, değer yitirme gözden düşmekle ilişkilidir; organ sözcükleri tek tek toplanmaz.",
      passage:
        "Aile bir haftalığına şehir dışına çıktı. Komşuları saksıları suladı, toprağı denetledi ve çiçeklere göz kulak oldu.",
    },
    {
      prompt:
        "“Raporu birkaç kez okuduk ama son satırdaki tarih yanlışı gözden kaçtı.” cümlesinde deyimin anlamı hangisidir?",
      correct: "Fark edilmedi.",
      distractors: [
        "Saygınlığını yitirdi.",
        "Dikkatle gözetildi.",
        "Telaşla konuşamadı.",
        "Önceden ayrıntılı planlandı.",
      ],
      hint: "Etkilenenin bir kişinin itibarı mı, görülmeyen bir ayrıntı mı olduğunu sor.",
      explanation:
        "Gözden kaçan şey bir tarih yanlışıdır ve okumalara rağmen fark edilmemiştir. Kişinin değer yitirmesi anlatılmadığından gözden düşmek açıklaması uygun değildir. Deyimi ortak göz sözcüğüne göre değil olayın sonucuna göre çöz.",
    },
    {
      prompt:
        "Aşağıdaki olaylardan hangisi “Damlaya damlaya göl olur.” atasözündeki ilişkiyi en iyi örnekler?",
      correct:
        "Her gün ayırdığı küçük miktarlarla aylar sonra bisiklet alması.",
      distractors: [
        "Piyangodan bir defada büyük para kazanması.",
        "Aceleden yanlış otobüse binmesi.",
        "İmkânını aşan harcama nedeniyle borçlanması.",
        "Bir ayrıntıyı görmediği için raporu geri alması.",
      ],
      hint: "Tek seferlik sonuçla küçük katkıların zaman içinde birikmesini ayır.",
      explanation:
        "Atasözü küçük katkıların zaman boyunca birikerek büyük sonuç oluşturmasını anlatır. Günlük küçük miktarlar ve aylar sonra oluşan toplam bu ilişkiyi açıkça kurar. Tek seferlik kazançta ise düzenli küçük katkı ve birikim süreci yoktur.",
    },
    {
      prompt:
        "Bütçesi sınırlı olduğu hâlde pahalı alışverişler yapıp borçlanan kişiye “Ayağını yorganına göre uzat.” deniyor. Verilen öğüt hangisidir?",
      correct: "Harcamalarını imkânına göre düzenlemesi.",
      distractors: [
        "Her gün küçük miktar biriktirmenin her durumda yeterli olması.",
        "Bir fırsat kaçınca onu yeniden aramaması.",
        "Herkesin sözünü hiç denetlemeden kabul etmesi.",
        "Hızlı yapılan her işi mutlaka bırakması.",
      ],
      hint: "Öğüdün olayda hangi davranışı değiştirmesinin beklendiğini bul.",
      explanation:
        "Borçlanma, imkânı aşan harcamayla ilişkilendirilmiştir. Ayağını yorganına göre uzatmak bu bağlamda harcamayı sahip olunan imkâna uydurmayı öğütler; fiziksel örtü uzunluğuna dair bir talimat olarak okunmaz.",
    },
    {
      prompt:
        "“Gözden düşmek” sözünün cümledeki “Yaptıklarıyla gözümden düştü.” biçimi için hangisi doğrudur?",
      correct: "Düştü çekimli fiildir; temel deyim anlamı korunmuştur.",
      distractors: [
        "Düştü sözcüğü bu cümlede mastardır.",
        "Kişi ilişkisi belirtildiği için deyim bütünüyle yok olmuştur.",
        "Deyimler hiçbir zaman çekim eki alamaz.",
        "Gözümden sözü mutlaka fiziksel organın yere düşmesidir.",
      ],
      hint: "Sözlükteki -mek biçimiyle gerçek cümledeki geçmiş zaman biçimini ayrı incele.",
      explanation:
        "Sözlük kalıbındaki düşmek mastarken, gerçek cümledeki düştü geçmiş zamanla çekimlenmiştir. Gözümden ifadesi konuşanın değerlendirmesini ekler; itibar/değer yitirme ilişkisi korunur. Çekimi değişmeyen mutlak bir kalıp kuralı yoktur.",
    },
    {
      prompt:
        "Bir arkadaş, son başvuru günü geçtikten sonra “Atı alan Üsküdar’ı geçti.” diyor. Bu yerleşik sözle ilgili doğru değerlendirme hangisidir?",
      correct: "Tam cümle biçiminde kullanılan bir deyimdir.",
      distractors: [
        "Tam cümle olduğu için zorunlu olarak atasözüdür.",
        "İçinde yer adı olduğu için yalnız tarih bilgisidir.",
        "Herhangi bir çekimli fiil deyim içinde bulunamaz.",
        "Mutlaka gerçek atlı yolculuk anlatır.",
      ],
      hint: "Biçimce yargı kurmakla kalıbın yerleşik türünü aynı ölçüt sanma.",
      explanation:
        "Atı alan Üsküdar’ı geçti kalıbı bu bağlamda fırsatın kaçtığını anlatan cümle biçimli deyimdir. Çekimli fiil taşıması tek başına atasözü olmasını sağlamaz. Tür, yalnız cümle uzunluğundan değil yerleşik anlam ve işlevden belirlenir.",
    },
    {
      prompt:
        "Bir yazar o anda “Umutlarım mor bir bulut oldu.” cümlesini ilk kez kendi benzetmesi olarak kuruyor. Yalnız bu bilgiyle hangi sonuca varılabilir?",
      correct:
        "Mecazlı olabilir; yerleşik deyim olduğu tek başına gösterilmemiştir.",
      distractors: [
        "Her yeni benzetme otomatik atasözüdür.",
        "Mecaz varsa deyimin kalıplaşmışlığı ayrıca aranmaz.",
        "Bu cümle hiçbir anlam taşıyamaz.",
        "Bir sözün deyim olması için mutlaka organ adı gerekir.",
      ],
      hint: "Mecazlı anlatımla toplumda yerleşmiş kalıbı ayrı denetle.",
      explanation:
        "Verilen bilgi sözün o anda oluşturulan bir benzetme olduğunu söyler. Mecazlı oluş, kendi başına kalıplaşmış deyim olduğunu kanıtlamaz. Deyim tanısında yerleşiklik ve temel anlam gerekir; organ adı veya tam cümle ölçütü yeterli değildir.",
    },
    {
      prompt:
        "“Ağır ağır yürüdü.” cümlesindeki ağır ağır yapısı için en uygun açıklama hangisidir?",
      correct:
        "Aynı sözcüğün tekrarıyla oluşan, yavaşlığı güçlendiren ikilemedir.",
      distractors: [
        "Söyleyeni mutlaka bilinen bir özdeyiştir.",
        "Her iki sözcüklü sözün atasözü olduğunu gösterir.",
        "Bir kişinin itibar yitirmesini anlatır.",
        "Geçmişteki bir fırsatın kaçtığını bildiren deyimdir.",
      ],
      hint: "Tekrar biçimini ve yürüme eylemine yaptığı katkıyı birlikte düşün.",
      explanation:
        "Ağır ağır, aynı sözcüğün tekrarıyla oluşan ikilemedir ve burada yürümenin yavaşlığını güçlendirir. İki sözcük bulunması onu kendiliğinden deyim veya atasözü yapmaz; bu cümlede itibar ya da kaçan fırsat anlamı yoktur.",
    },
    {
      prompt:
        "Sunum sırasında telaşlanan biri ne yapacağını şaşırıyor, kâğıtları karıştırıyor ama konuşmaya devam ediyor. Hangi deyim bu davranışı en doğrudan karşılar?",
      correct: "Eli ayağına dolaşmak.",
      distractors: [
        "Dili tutulmak.",
        "Gözden düşmek.",
        "Kulak vermek.",
        "Gözden kaçmak.",
      ],
      hint: "Telaşın sonucunda konuşamama mı, davranışların karışması mı var?",
      explanation:
        "Verilen kişi konuşmayı sürdürüyor fakat ne yapacağını şaşırıp kâğıtları karıştırıyor. Eli ayağına dolaşmak bu telaşlı davranış sonucunu doğrudan anlatır. Dili tutulmak ise konuşamaz hâle gelmeyi öne çıkarır; bu bilgi kökte açıkça dışlanmıştır.",
    },
    {
      prompt:
        "Kalıplaşmış bir deyimin cümleye uyarlanması hakkında hangisi doğrudur?",
      correct:
        "Uygun kişi ve zaman çekimi yapılabilir; kalıp sözcükleri keyfî eş anlamlılarla değiştirilemez.",
      distractors: [
        "Bütün sözcükler herhangi bir eş anlamlıyla serbestçe değiştirilebilir.",
        "Bir deyim mutlaka yalnız mastar hâlinde kullanılabilir.",
        "Deyim içindeki her sözcük her kullanımda yalnız ilk anlamıyla okunur.",
        "Deyim emir cümlesinde kullanılırsa zorunlu olarak atasözü olur.",
      ],
      hint: "Dil bilgisel uyarlamayla yerleşik söz varlığını değiştirmeyi ayır.",
      explanation:
        "Bir deyim uygun bağlamda kişi/zaman çekimi alabilir; gözden düşmek ile gözümden düştü bu ayrımı gösterir. Yerleşik sözcükleri rastgele eş anlamlılarla değiştirmekse aynı kalıbı korumayabilir. Emir veya mastar biçimi tek başına tür ölçütü değildir.",
    },
  ],
  "cumlede-anlam": [
    {
      prompt:
        "Bu cümlede dosyayı açma ile kaydı bulma arasındaki ilişki için hangisi kesin söylenebilir?",
      correct:
        "Dosya hedefi gerçekleştirmek amacıyla açılmıştır; kaydın bulunduğu ayrıca bildirilmemiştir.",
      distractors: [
        "Kaydın bulunduğu kesin olarak söylenmiştir.",
        "Kaydın hiçbir zaman bulunamayacağı kanıtlanmıştır.",
        "Kaydı bulmak, daha önce gerçekleşmiş açma nedenidir.",
        "Hiçbir amaç veya hedef belirtilmemiştir.",
      ],
      hint: "Amaç ile amaca ulaşmanın sonucunu ayrı yaz.",
      explanation:
        "Kaydı bulmak için ifadesi hedefi, dosyayı açmak yapılan eylemi verir. Cümle aramayı başlatmayı bildirir; bulunma veya bulunamama sonucu ayrıca söylenmez. Amaçtan başarı da zorunlu başarısızlık da çıkarılmamalıdır.",
      passage: "Ece eski kaydı bulmak için arşiv dosyasını açtı.",
    },
    {
      prompt:
        "“Otobüs arızalandığı için yolcular bekledi.” cümlesinde neden → sonuç yönü hangisidir?",
      correct: "Otobüsün arızalanması → yolcuların beklemesi.",
      distractors: [
        "Yolcuların beklemesi → otobüsün arızalanması.",
        "Yolcuların beklemesi → bilet almayı amaçlaması.",
        "Otobüsün arızalanması → yolcuların kesin gelmemesi.",
        "Bilet bulunması → yolun kapanması.",
      ],
      hint: "Hangi durumun diğerinin gerçekleşmesini açıkladığını sor.",
      explanation:
        "Arızalanma, beklemenin gerçekleşmiş nedeni olarak verilir. Bu nedenle ok arızadan beklemeye gider. İki yargıyı ters çevirmek aynı ilişkiyi korumaz; kökte bilet veya yolun kapanmasıyla ilgili ek bilgi bulunmaz.",
    },
    {
      prompt:
        "“Bilet bulursa geziye katılacak.” cümlesinden hangi sonuç çıkar?",
      correct: "Katılma, bilet bulma koşuluna bağlanmıştır.",
      distractors: [
        "Biletin bulunduğu kesin bildirilmiştir.",
        "Geziye katılma kesin gerçekleşmiştir.",
        "Bilet aramaktan vazgeçmiştir.",
        "Bilet olmadan katılacağı bildirilmiştir.",
      ],
      hint: "Şartın verilmesiyle şartın gerçekten yerine gelmesini karıştırma.",
      explanation:
        "Cümle katılmayı bilet bulma şartıyla sunar. Koşul ilişkisi açıkça vardır; ancak biletin bulunup bulunmadığı veya katılmanın gerçekleştiği söylenmez. Geleceğe ait koşullu yargıyı tamamlanmış olay haberi gibi okumamak gerekir.",
    },
    {
      prompt:
        "“Kapıda bakım levhası var; demek ki içeride çalışma yapılıyor.” sözünde levhanın işlevi hangisidir?",
      correct: "İçeride çalışma olduğu çıkarımına dayanak oluşturan işarettir.",
      distractors: [
        "Çalışmanın fiziksel olarak başlamasının kesin nedenidir.",
        "Henüz verilmemiş bir kişisel planın adıdır.",
        "Konuşanın gelecekte asmak istediği hedeftir.",
        "İki eşit miktarın karşılaştırılmasıdır.",
      ],
      hint: "Görülen veriden hangi yargıya gidildiğini izle.",
      explanation:
        "Konuşan levhayı görüp içeride çalışma olduğu sonucuna varır. Levha çıkarımın kanıtı veya işaretidir; çalışmayı başlatan fiziksel neden olarak verilmemiştir. Demek ki ile kurulan düşünme yönünü gerçek olay nedeni diye yorumlama.",
    },
    {
      prompt:
        "“En az üç öğrenci yürüyerek geldi.” cümlesi yalnız kendi bilgisiyle hangi seçeneği zorunlu kılar?",
      correct: "Yürüyerek gelen öğrenci sayısı üçten az değildir.",
      distractors: [
        "Tam üç öğrenci yürüyerek gelmiştir.",
        "Bütün öğrenciler yürüyerek gelmiştir.",
        "Hiçbir öğrenci bisiklet kullanmamıştır.",
        "Üçten fazla öğrenci gelmesi imkânsızdır.",
      ],
      hint: "Alt sınırı kesin sayıya veya grubun tamamına genişletme.",
      explanation:
        "En az üç ifadesi üç veya daha fazla öğrenci demektir; yalnızca üçü söylemez. Grubun toplam sayısı ve başkalarının geliş biçimi verilmediği için hepsi veya hiçbiri gibi sonuçlar eklenemez. Zorunlu bilgi alt sınırın korunmasıdır.",
    },
    {
      prompt:
        "Aşağıdaki cümlelerden hangisi kişisel beğeniye dayanmayan, denetlenebilir bir yargıdır?",
      correct: "Öykü üç bölümden oluşuyor.",
      distractors: [
        "Öykünün sonu olağanüstü etkileyici.",
        "Bu kahraman en sevimli kişidir.",
        "Yazarın dili herkesten daha güzel.",
        "Bana göre kitap çok sıkıcı.",
      ],
      hint: "İddianın doğru olup olmadığının zevkten bağımsız denetlenip denetlenemeyeceğine bak.",
      explanation:
        "Bölüm sayısı metin üzerinden denetlenebilir ve kişisel beğeniye dayanmaz. Diğer seçenekler etki, sevimlilik, güzellik veya sıkıcılık değerlendirmesi içerir. Nesnel türde yargı olması, bölüm sayısının gerçekten kontrol edilmeden doğrulanmış olduğu anlamına gelmez.",
    },
    {
      prompt:
        "“Roman, göç eden bir ailenin yaşamını kısa cümlelerle anlatıyor.” cümlesindeki içerik ve biçem bilgisi hangi seçenekte doğru ayrılmıştır?",
      correct:
        "İçerik göç eden ailenin yaşamı; biçem kısa cümleler kullanımıdır.",
      distractors: [
        "İçerik kısa cümleler; biçem ailenin göç etmesidir.",
        "Her iki bilgi yalnız bölüm sayısını verir.",
        "Cümlede eserin ne anlattığı belirtilmemiştir.",
        "Cümle yalnız eserin yayımlandığı tarihi verir.",
      ],
      hint: "Ne anlatılıyor ve nasıl anlatılıyor sorularına ayrı cevap ver.",
      explanation:
        "Ailenin göçle ilgili yaşamı anlatılan konudur, dolayısıyla içeriktir. Kısa cümle kullanımı ise söyleyişin nasıl kurulduğuyla ilgilidir ve biçemdir. Aynı cümle iki ekseni birlikte verebilir; bunları zorunlu tek kategori gibi düşünme.",
    },
    {
      prompt:
        "Bir kişi “O kitabın tek sayfasını okumadım ama kesin başarısız bir eser.” diyor. Verilen bağlamdaki belirgin tutum hangisidir?",
      correct: "Yeterince incelemeden verilmiş ön yargı.",
      distractors: [
        "Eseri ayrıntılı karşılaştırmaya dayanan saptama.",
        "Kendi davranışını düzeltmeye yönelik öz eleştiri.",
        "Geçmişte kaçırılan fırsat için hayıflanma.",
        "Tekrarlanan gürültüye alışma.",
      ],
      hint: "Karardan önce hangi incelemenin yapıldığı kökte açıkça söyleniyor.",
      explanation:
        "Konuşan kitabı okumadığını söylediği hâlde kesin olumsuz değer yargısı veriyor. Bu açık bağlam yeterli inceleme olmadan peşin hükmü, yani ön yargıyı gösterir. Her kesin veya geleceğe ait yargı otomatik ön yargı değildir; burada inceleme yokluğu verilmiştir.",
    },
    {
      prompt:
        "Aşağıdaki cümlelerden hangisi yapılan bir davranıştan pişmanlığı en açık biçimde anlatır?",
      correct: "Keşke ona o kırıcı sözü söylemeseydim.",
      distractors: [
        "Keşke gençken yüzme öğrenseydim.",
        "Yarın taslağımı tamamlamayı planlıyorum.",
        "İstersen önce kısa metni okuyabilirsin.",
        "Yol giderek daralıyor.",
      ],
      hint: "Yapılmış iş için üzülmeyle yapılmamış fırsatı ayır.",
      explanation:
        "Kırıcı söz söyleme gerçekleşmiştir ve konuşan bunu yapmış olmaktan üzülür; bu pişmanlıktır. Yüzme öğrenmeme örneği değerlendirilmeyen fırsata hayıflanmayı, diğerleri tasarı, öneri ve aşamalı durumu gösterir. Keşke tek başına ayrım için yeterli değildir.",
    },
    {
      prompt:
        "Toplantıya yarım saat geç gelen kişiye “Ne kadar dakiksin, yine herkesi beklettin!” deniyor. Bu bağlamda sözün işlevi hangisidir?",
      correct: "Görünen övgünün tersini kastederek alaylı eleştiri yapmak.",
      distractors: [
        "Zamanında gelmeyi içtenlikle övmek.",
        "İki kişinin eşit süre yürüdüğünü bildirmek.",
        "Gelecekteki toplantı için kesin saat vermek.",
        "Konuşanın kitabın içeriğini özetlemesi.",
      ],
      hint: "Dakik sözcüğüyle verilen gerçek davranışın uyuşup uyuşmadığını denetle.",
      explanation:
        "Kök, kişinin yarım saat geciktiğini açıkça verir. Bu nedenle dakiksin sözü içten övgü değil, tersini kasteden alaylı eleştiridir. Bağlam verilmeden her olumlu sıfatı alay sayamayız; burada söz ile davranışın karşıtlığı kanıt sağlar.",
    },
  ],
  "paragrafa-giris": [
    {
      prompt:
        "Bu metnin başına, konuyu ve anlatıcıyı en uygun biçimde açan cümle hangisidir?",
      correct: "Sabah arşiv kapısında sıraya girdim.",
      distractors: [
        "Böylece onu bir daha görmedim.",
        "Bu yüzden hepsini kabul etmedik.",
        "O da aynı şeyi tekrar yaptı.",
        "Sonuç olarak bu görüş yanlıştır.",
      ],
      hint: "Devamın yerini, kişilerini ve anlatıcısını hazırlayan bağımsız sahneyi ara.",
      explanation:
        "Arşiv kapısında sıraya girme, devamındaki bekleyenleri, fotoğrafları ve ben de sözünü hazırlayan bağımsız sahnedir. Diğer seçeneklerde bu, o veya böylece için açıklanmamış öncül bulunur ve verilen sahneye uygun konu açılmaz.",
      passage:
        "İçeride bekleyenler ellerindeki eski fotoğrafları birbirine gösteriyordu. Ben de dedemin fotoğrafını çantamdan çıkardım.",
    },
    {
      prompt:
        "Verilen tanıtım ve sonuç bağına göre uygun cümle sırası hangisidir?",
      correct: "B → A → C.",
      distractors: ["A → B → C.", "C → A → B.", "A → C → B.", "C → B → A."],
      hint: "Bu etiketlerin tanıtımını ve böylecenin bağlandığı sonucu bul.",
      explanation:
        "B etiketleri ve ekleme işlemini tanıtır; A’daki bu etiketler buna gider. C, aramanın hızlanmasını birkaç dakikada bulma sonucuyla bağlar. B–A–C iki komşu bağı birlikte kurar; öteki seçeneklerde gönderme tanıtımdan önce kalır veya sonuç zinciri bozulur.",
      passage:
        "A: “Bu etiketler aramayı hızlandırdı.” B: “Arşiv görevlisi her deftere yıl etiketi ekledi.” C: “Böylece aradığımız yılı birkaç dakikada bulduk.”",
    },
    {
      prompt:
        "Aşağıdaki paragrafın konusu hangi seçenekte en uygun kapsamla verilmiştir?",
      correct: "Arşiv belgelerinin erişilebilir biçimde düzenlenmesi.",
      distractors: [
        "Yalnız bir defterin kapağının rengi.",
        "İnsanlık tarihinin bütün sorunları.",
        "Bahçede fide yetiştirmenin maliyeti.",
        "Arşiv binasının boyanma tekniği.",
      ],
      hint: "Üç cümlede ortak kalan yönü bul; tek örneğe daraltma veya bütün tarihe genişletme.",
      explanation:
        "Paragraf belgeleri saklamanın yanında etiketleme ve arama yoluyla erişimi ele alır. Erişilebilir düzenleme bu ortak yönü kapsar. Kapak rengi, bahçe ve boya bilgisi yoktur; bütün insanlık tarihi ise metnin odağını gereksiz genişletir.",
      passage:
        "Kent arşivleri yalnız belgeleri saklamakla görevini tamamlamaz. Yıllara göre etiketlenen ve arama kaydı tutulan belgeler daha kolay bulunur. Korunan bilgiye ulaşılabilmesi için düzenli erişim de gerekir.",
    },
    {
      prompt: "Bu paragrafın ana düşüncesi hangi seçenekte verilmiştir?",
      correct:
        "Arşivlerde belgeyi saklamak, düzenli erişim imkânıyla tamamlanmalıdır.",
      distractors: [
        "Bütün belgeler mutlaka aynı yıl yazılmıştır.",
        "Belge saklamak gereksizdir.",
        "Her arşiv yalnız tek bir defterden oluşur.",
        "Arşivler yalnız bina tasarımıyla ilgilenmelidir.",
      ],
      hint: "Yalnız değil anlamını ve son cümlenin eklediği gerekliliği birlikte koru.",
      explanation:
        "Metin saklamayı reddetmez; yalnız saklamanın yeterli olmadığını ve erişim düzeninin de gerektiğini savunur. Bu ana düşünce etiketleme örneğini ve kapanış yargısını birlikte kapsar. Diğer seçenekler metinde olmayan kesinlikler ekler veya savın yönünü ters çevirir.",
      passage:
        "Kent arşivleri yalnız belgeleri saklamakla görevini tamamlamaz. Yıllara göre etiketlenen ve arama kaydı tutulan belgeler daha kolay bulunur. Korunan bilgiye ulaşılabilmesi için düzenli erişim de gerekir.",
    },
    {
      prompt:
        "Metin iki paragrafa ayrılırsa ikinci paragraf hangi cümleyle başlar?",
      correct: "IV.",
      distractors: ["II.", "III.", "V.", "I."],
      hint: "Yeni odakla onun devamında kurulan ayrı zinciri birlikte bul.",
      explanation:
        "I–III ölçme, kayıt ve büyüme karşılaştırmasını sürdürür. IV oturma alanının tasarımına geçer; V’teki bu yüzden de gölge düşüncesine bağlanır. IV’ten önce bölmek, ölçüm ile oturma tasarımı için iki anlamlı küçük bütün bırakır.",
      passage:
        "I: “Fidelerin büyümesini her sabah ölçtük.” II: “Bu ölçümleri çizelgeye yazdık.” III: “Grafiklerden büyüme hızını karşılaştırdık.” IV: “Bahçenin oturma alanı ise gölge düşünülerek tasarlandı.” V: “Banklar bu yüzden ağaçların yanına yerleştirildi.”",
    },
    {
      prompt:
        "“Eski belgelerin dağınık oluşu, bu belgeleri bulmayı güçleştiriyor.” cümlesi hakkında hangisi doğrudur?",
      correct:
        "Bu belgeler ifadesinin ilişkili olduğu belgeler aynı cümlede tanıtılmıştır; yalnız bu sözcüğü nedeniyle giriş yasaklanamaz.",
      distractors: [
        "Bu sözcüğü görülen her cümle zorunlu olarak paragrafın sonundadır.",
        "Cümlede hiçbir varlık tanıtılmamıştır.",
        "Her giriş mutlaka soru biçiminde olmak zorundadır.",
        "Bu cümle yalnız fiziksel boya rengini açıklar.",
      ],
      hint: "Göndermenin mutlaka önceki ayrı cümleye gitmek zorunda olup olmadığını denetle.",
      explanation:
        "Belgeler aynı cümlede tanıtıldığı için bu belgeler ifadesinin bağ kurabileceği içerik vardır. Devamla uygunluğu ayrıca okunur; sırf bu sözcüğü bulunması otomatik giriş yasağı değildir. Sözcük listesi yerine gerçek öncülü aramak gerekir.",
    },
    {
      prompt:
        "“Bu etiketler hangi grupta hangi yılın bulunduğunu gösteriyordu.” cümlesinin en uygun yeri hangisidir?",
      correct: "II’den sonra, III’ten önce.",
      distractors: [
        "I’den önce.",
        "I ile II arasına.",
        "III’ten sonra, bulma sonucundan bağımsız yeni konu olarak.",
        "Etiket sözcüğü geçtiği için hiçbir yere eklenemez.",
      ],
      hint: "Etiketin önce tanıtılması ve ardından arama sonucuna bağlanması gerekir.",
      explanation:
        "II etiketleri tanıtır; eklenecek cümledeki bu etiketler buna gönderme yapar ve işlevini açıklar. III de bu açıklamanın aramaya katkısını sonuçlandırır. İki yönlü uyum II–ek cümle–III zincirinde sağlanır; tanıtımdan önceki yerlerde öncül eksik kalır.",
      passage:
        "I. Eski defterleri yıllara göre ayırdık. II. Her grubun üstüne ayrı bir etiket koyduk. III. Aradığımız yılı hemen seçebildik.",
    },
    {
      prompt: "Mevcut erişim düzeni odağında akışı bozan cümle hangisidir?",
      correct: "III.",
      distractors: [
        "I.",
        "II.",
        "IV.",
        "Hiçbiri; ortak bina adı her bağı garanti eder.",
      ],
      hint: "Metnin odak yönünün arama ve erişim olduğunu unutma.",
      explanation:
        "I, II ve IV kayıtların düzenlenmesi ve bulunmasıyla bağlantılıdır. III yalnız cephenin rengini bildirir; kökte bu rengin erişime etkisi kurulmamıştır. Aynı bina çevresinde geçmesi, cümlenin mevcut düşünce zincirine katkı verdiğini tek başına göstermez.",
      passage:
        "I. Defterleri yıllara göre ayırdık. II. Böylece belirli yıla ait kaydı daha kolay bulduk. III. Binanın dış cephesi geçen ay maviye boyandı. IV. Arama çizelgesi de aynı kayda yeniden ulaşmayı hızlandırdı.",
    },
    {
      prompt: "Bu metinden hangisi kesin çıkar?",
      correct: "En azından bazı belgeler sayısallaştırılmıştır.",
      distractors: [
        "Arşivdeki bütün belgeler internetten açılmaktadır.",
        "Hiçbir belge okuma salonunda görülemez.",
        "Bütün eski belgeler yok edilmiştir.",
        "Sayısallaşan her belge evden indirilebilir.",
      ],
      hint: "Bazı, bir bölüm ve erişim yeri sınırlarını koru.",
      explanation:
        "Metin bazı belgelerin sayısallaştığını ve bunların bir kısmının salondaki bilgisayarlardan incelenebildiğini bildirir. Bütün arşiv, internet veya evden indirme bilgisi eklenemez. Mümkün görünenle metinden zorunlu çıkan sonucu ayırmak gerekir.",
      passage:
        "Bazı eski belgeler sayısallaştırıldı. Bunların bir bölümü okuma salonundaki bilgisayarlardan incelenebiliyor.",
    },
    {
      prompt: "Bu metin için en uygun başlık hangisidir?",
      correct: "Arşivde Erişimi Kolaylaştırmak.",
      distractors: [
        "Bütün Uygarlıkların Tarihi.",
        "Yalnız Defter Kapaklarının Rengi.",
        "Bahçede Fide Hastalıkları.",
        "Bir Kitabın Son Cümlesi.",
      ],
      hint: "Başlığın ortak konuyu kapsamasını, ilgisiz alanlara taşmamasını denetle.",
      explanation:
        "İki cümle arşiv kayıtlarının yerini bulmayı ve erişimi kolaylaştıran düzenlemeleri anlatır. Arşivde Erişimi Kolaylaştırmak bu ortak odağı kapsar. Uygarlık tarihi aşırı geniş; diğerleri ise metinde bulunmayan ayrıntılara veya başka konuya yönelir.",
      passage:
        "Arşivde kayıt bulmak, belgenin nerede tutulduğunu bilmekle kolaylaşır. Yıl etiketleri ve arama çizelgeleri bu nedenle yararlıdır.",
    },
  ],
};
const answerPositions018 = [
  [1, 4, 0, 2, 3, 0, 3, 1, 4, 2],
  [4, 1, 3, 0, 2, 2, 0, 4, 1, 3],
  [2, 0, 4, 1, 3, 1, 4, 0, 3, 2],
];
export const forge018TurkishTopics: Record<string, string> = {
  "deyimler-ve-atasozleri": "detail-267",
  "cumlede-anlam": "detail-268",
  "paragrafa-giris": "detail-269",
};
export const forge018TurkishGuides: LessonGuide[] = guideSpecs018.map(
  ({ title: _title, ...guide }) => guide,
);
export const forge018TurkishLessons: Lesson[] = guideSpecs018.map(
  (guide, pack) => ({
    id: guide.id,
    subjectId: "tyt-turkce",
    title: txt(guide.title),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((section) => ({
      title: txt(section.title),
      text: txt(section.paragraphs.join("\n\n")),
    })),
    questions: questionRows018[guide.id].map((row, index): Question => {
      const answer = answerPositions018[pack][index],
        raw = [row.correct, ...row.distractors];
      return {
        id: `${guide.id}-018-${index + 1}`,
        prompt: txt(row.prompt),
        options: raw.map((_, i) => txt(raw[(i - answer + 5) % 5])),
        answer,
        hint: txt(row.hint),
        explanation: txt(row.explanation),
        skill: guide.id,
        ...(row.passage ? { passage: txt(row.passage) } : {}),
      };
    }),
    source: txt(guide.source),
    tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
  }),
);
export interface TurkishNode018 {
  label: string;
  text: string;
}
export interface TurkishFrame018 {
  sentence: string;
  context: string;
  nodes: TurkishNode018[];
  relations: {
    source: number;
    target: number;
    label: string;
    valid: boolean;
  }[];
  focus: number;
  decision: string;
  reason: string;
  evidence: string[];
}
export interface TurkishCase018 {
  id: string;
  label: string;
  frames: [TurkishFrame018, TurkishFrame018];
}
// A bounded authored corpus with full contexts; this is not an arbitrary-language parser.
const authoredCases018: Record<string, TurkishCase018[]> = {
  "deyimler-ve-atasozleri": [
    {
      id: "goz",
      label: "Göz: değer mi, fark edilme mi?",
      frames: [
        {
          sentence: "Sözünü tutmayınca ekibin gözünden düştü.",
          context:
            "Ekibin kişiye duyduğu değer azalıyor; fiziksel görme olayı anlatılmıyor.",
          nodes: [
            {
              label: "Davranış",
              text: "Kişi verdiği sözü tutmadı.",
            },
            {
              label: "Yerleşik söz",
              text: "Ekibin gözünden düştü.",
            },
            {
              label: "Sonuç",
              text: "Kişi, ekibin gözünde değer yitirdi.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Bu olayda söylenen",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "İtibar kaybı",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Değer yitirme",
          reason:
            "Gözden düşmek, bu kişinin önceki değerini yitirmesini anlatır. Bir ayrıntının gözden kaçtığı söylenmez.",
          evidence: [
            "Değişen, kişinin değeridir.",
            "Yakın söz gözden kaçmak, fark edilmemeyi anlatır.",
          ],
        },
        {
          sentence: "Raporda son satırdaki tarih yanlışı gözden kaçtı.",
          context:
            "Yanlış var ama okuyanlar onu fark etmedi; bir kişinin değeri anlatılmıyor.",
          nodes: [
            {
              label: "Ayrıntı",
              text: "Son satırda tarih yanlışı vardı.",
            },
            {
              label: "Yerleşik söz",
              text: "Tarih yanlışı gözden kaçtı.",
            },
            {
              label: "Sonuç",
              text: "Okuyanlar yanlışı fark etmedi.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Bu olayda söylenen",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Fark edilmeme",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Fark edilmeme",
          reason:
            "Gözden kaçan yanlış fark edilmez. Bu, kişinin değer yitirme olayıyla aynı sonuç değildir.",
          evidence: [
            "Değişen, ayrıntının fark edilme durumudur.",
            "Ortak göz sözü iki kalıbı eş anlamlı yapmaz.",
          ],
        },
      ],
    },
    {
      id: "cekim",
      label: "Kalıp ile fiil çekimi",
      frames: [
        {
          sentence:
            "Gözden düşmek, değer yitirmeyi anlatan bir sözlük kalıbıdır.",
          context:
            "İncelenen fiil düşmek sözüdür; bu, sözlükteki mastar biçimidir.",
          nodes: [
            {
              label: "Fiil biçimi",
              text: "Düşmek sözü -mek eki taşır.",
            },
            {
              label: "Kalıp",
              text: "Gözden düşmek.",
            },
            {
              label: "Anlam",
              text: "Birinin önceki değerini yitirmesi.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Sözlük biçimi",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Yerleşik anlam",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Mastar biçimi",
          reason:
            "Düşmek mastardır. Bu söz cümlede uygun kişi ve zamanla çekim alabilir.",
          evidence: [
            "-mek sözlükte fiilin adını verir.",
            "Kalıp uygun kişi ve zamanla cümleye girebilir.",
          ],
        },
        {
          sentence: "Bu işiyle gözümden düştü.",
          context:
            "İncelenen fiil düştü sözüdür; olay geçmişte olmuş, bakış konuşana aittir.",
          nodes: [
            {
              label: "Fiil biçimi",
              text: "Düştü görülen geçmiş zamanla çekimlidir.",
            },
            {
              label: "Kalıp",
              text: "Gözümden düştü.",
            },
            {
              label: "Anlam",
              text: "Konuşanın gözünde değer yitirdi.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Cümleye uyum",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Yerleşik anlam",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Çekimli fiil",
          reason:
            "Düştü çekimli fiildir, mastar değildir. Gözümden sözü, değer yitirmeyi konuşanın bakışına bağlar.",
          evidence: [
            "Temel anlam korunur, kişi ve zaman uyarlanır.",
            "Çekim ekiyle kalıp sözcüğünü keyfî değiştirmek ayrı şeydir.",
          ],
        },
      ],
    },
    {
      id: "birikim",
      label: "Atasözünü olaya uygula",
      frames: [
        {
          sentence:
            "Her gün küçük bir miktar ayırdı; aylar sonra bisiklet aldı.",
          context:
            "Denenen söz: Damlaya damlaya göl olur. Bu örnekte ilişkiyi destekleyen olaylar açık veriliyor.",
          nodes: [
            {
              label: "Katkı",
              text: "Her gün küçük miktar ayırdı.",
            },
            {
              label: "Süreç",
              text: "Küçük paylar aylar boyunca birikti.",
            },
            {
              label: "Sonuç",
              text: "Birikimi bisiklet için yeterli oldu.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Düzenli ekleme",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Büyüyen birikim",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Birikim ilişkisi var",
          reason:
            "Düzenli küçük paylar zamanla büyük tutara dönüşür. Bu olay atasözünün birikim yönünü örnekler.",
          evidence: [
            "Küçük katkı, zaman ve büyüyen toplam birlikte verilmiş.",
            "Atasözü yalnız su veya yalnız para için değildir.",
          ],
        },
        {
          sentence:
            "Bir çekilişte bir defada büyük para kazandı ve bisiklet aldı.",
          context:
            "Aynı atasözü bu olaya uyuyor mu? Ek bir birikim bilgisi yok.",
          nodes: [
            {
              label: "Kazanç",
              text: "Büyük tutarı bir defada kazandı.",
            },
            {
              label: "Aranan bağ",
              text: "Düzenli küçük katkı bilgisi yok.",
            },
            {
              label: "Sonuç",
              text: "Bisiklet aldı.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 2,
              label: "Tek seferlik kaynak",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Birikim kanıtı yok",
              valid: false,
            },
          ],
          focus: 0,
          decision: "Birikim kanıtı yok",
          reason:
            "Bisiklet almak tek başına küçük payların birikme kanıtı olmaz. Bu olayda para tek defada geldi.",
          evidence: [
            "Sonuç benzer, süreç farklıdır.",
            "Kesik ok bu olayda aranan birikim bağı için kanıt olmadığını gösterir.",
          ],
        },
      ],
    },
    {
      id: "islev",
      label: "Deyim ve genel öğüt",
      frames: [
        {
          sentence: "Telaşlanınca eli ayağına dolaştı.",
          context:
            "Söz, o kişinin telaşlı hâlini anlatır; genel harcama ilkesi sunmaz.",
          nodes: [
            {
              label: "Durum",
              text: "Kişi telaşlanıp ne yapacağını şaşırdı.",
            },
            {
              label: "Kalıp",
              text: "Eli ayağına dolaştı.",
            },
            {
              label: "İşlev",
              text: "Belirli durumu özlü biçimde anlatır.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Duruma uygun kalıp",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Deyim işlevi",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Belirli durum",
          reason:
            "Kalıp, telaşla ne yapacağını şaşırma hâlini anlatır. Deyim bu özel duruma ad olur.",
          evidence: [
            "Konuşma yitimi bilgisi yok.",
            "Dili tutulmak farklı sonuç taşır.",
          ],
        },
        {
          sentence:
            "Bütçesini aşarak borçlanana “Ayağını yorganına göre uzat.” denir.",
          context:
            "Yerleşik söz, imkâna göre harcama yapma yönünde genel bir öğüt için kullanılıyor.",
          nodes: [
            {
              label: "Olay",
              text: "Kişi imkânını aşan harcama yaptı.",
            },
            {
              label: "Kalıp",
              text: "Ayağını yorganına göre uzat.",
            },
            {
              label: "İşlev",
              text: "Harcamayı imkâna uydurmayı öğütler.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Olaya uygulama",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Genel öğüt",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Genel öğüt",
          reason:
            "Atasözü bu olayda da harcama ve imkân bağını korur. Gerçek örtü boyu söz konusu değil.",
          evidence: [
            "Yerleşik söz ve genel yargı birlikte var.",
            "Her yeni öğüt cümlesi otomatik atasözü değildir.",
          ],
        },
      ],
    },
  ],
  "cumlede-anlam": [
    {
      id: "icin",
      label: "İçin: neden mi, hedef mi?",
      frames: [
        {
          sentence: "Dosya açıldığı için kayıt göründü.",
          context:
            "İki olay olmuş: dosya açılmış, bunun sonucunda kayıt görünmüş.",
          nodes: [
            {
              label: "Yargı A",
              text: "Dosya açıldı.",
            },
            {
              label: "Yargı B",
              text: "Kayıt göründü.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Neden → sonuç",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Neden-sonuç",
          reason:
            "Açılma olmuş etken, görünme sonuçtur. Ok dosyanın açılma olayından kaydın görünme olayına gider.",
          evidence: [
            "İçin burada olmuş sebebi bağlıyor.",
            "Sözcük sırası tek başına ilişki türü değildir.",
          ],
        },
        {
          sentence: "Kaydı görmek için dosyayı açtı.",
          context:
            "Dosyayı açma yapılmış eylemdir; kaydı görme ise hedeftir. Sonuç ayrıca söylenmez.",
          nodes: [
            {
              label: "Eylem",
              text: "Dosyayı açtı.",
            },
            {
              label: "Hedef",
              text: "Kaydı görmek istiyor.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Eylem → hedef",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Amaç",
          reason:
            "Kaydı görmek eylemin hedefidir. Başarı veya başarısız sonuç bu cümlede ayrıca verilmez.",
          evidence: [
            "Aynı için sözü başka ilişki kurdu.",
            "Amaç, hedefin kesin sonucu değildir.",
          ],
        },
      ],
    },
    {
      id: "yon",
      label: "Olay nedeni ve çıkarım dayanağı",
      frames: [
        {
          sentence: "Bakım yapıldığı için kütüphane kapalıydı.",
          context: "Bakım, kapalı olma nedeni olarak verilir.",
          nodes: [
            {
              label: "Etken",
              text: "İçeride bakım yapılıyor.",
            },
            {
              label: "Durum",
              text: "Kütüphane kapalı.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Olay nedeni",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Nedenden sonuca",
          reason:
            "Bakım yapılması, kapalı olma durumunu açıklayan olay nedenidir. Ok bu gerçek olay ilişkisini gösterir.",
          evidence: [
            "Neden bakım, sonuç kapalı olmadır.",
            "Söylenen olaylar arasında sebep bağı açık.",
          ],
        },
        {
          sentence:
            "Kapıda bakım levhası var; demek ki içeride çalışma yapılıyor.",
          context:
            "Konuşan içeriyi görmüyor; levhadaki bilgiyi kullanıp çalışma olduğunu düşünüyor.",
          nodes: [
            {
              label: "İşaret",
              text: "Kapıda bakım levhası var.",
            },
            {
              label: "Çıkarım",
              text: "İçeride çalışma olduğu sonucu çıkarılır.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Veri → çıkarım",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Veriden çıkarıma",
          reason:
            "Levha çıkarıma dayanak olur. Levhanın kendisi çalışmayı başlatan fiziksel neden diye verilmez.",
          evidence: [
            "Görülen işaret ile olayın nedeni farklıdır.",
            "Çıkarım, dayanağın sunduğu kesinlik kadar güçlüdür.",
          ],
        },
      ],
    },
    {
      id: "kosul",
      label: "Şart ve olmuş olay",
      frames: [
        {
          sentence: "Bilet bulursa geziye katılacak.",
          context:
            "Bilet bulundu mu, geziye katıldı mı? Bu bilgi ayrıca verilmez.",
          nodes: [
            {
              label: "Şart",
              text: "Bilet bulması gerekiyor.",
            },
            {
              label: "Bağlı yargı",
              text: "Bu koşulla geziye katılacak.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Koşul bağı",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Koşul var",
          reason:
            "Katılma bilet bulma şartıyla sunulur. Şartın verilmesi, yerine geldiği anlamına gelmez.",
          evidence: [
            "Bulursa ifadesi bu cümlede şart kurar.",
            "Her -sa eki aynı işlevi taşımaz.",
          ],
        },
        {
          sentence: "Bilet bulduğu için geziye katıldı.",
          context: "Bilet bulunduğu ve geziye katıldığı açıkça veriliyor.",
          nodes: [
            {
              label: "Gerçek etken",
              text: "Bilet buldu.",
            },
            {
              label: "Gerçek sonuç",
              text: "Geziye katıldı.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Neden → sonuç",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Gerçek neden",
          reason:
            "Bilet bulma olmuş sebep; geziye katılma ise olmuş sonuç olarak verilir.",
          evidence: [
            "İki yargının olma durumu değişti.",
            "Sadece eki değil bütün cümleyi oku.",
          ],
        },
      ],
    },
    {
      id: "kapsam",
      label: "Bazı ile bütünün kapsamı",
      frames: [
        {
          sentence: "Bazı öğrenciler yürüyerek geldi.",
          context:
            "Bu cümleden zorunlu çıkan bilgi sınanıyor; grubun kalanları için başka bilgi yok.",
          nodes: [
            {
              label: "Grup",
              text: "Bir öğrenci grubu var.",
            },
            {
              label: "Verilen",
              text: "En az bir bölümü yürüyerek geldi.",
            },
            {
              label: "Sınır",
              text: "Bütün grup hakkında sonuç verilmez.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Alt küme",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Kesinlik sınırı",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Alt küme bilgisi",
          reason:
            "Bazı, en az bir bölümün varlığını bildirir. Herkesin yürüdüğü de kalanların kesin yürümediği de tek başına çıkmaz.",
          evidence: [
            "Mümkün sonuç ile zorunlu sonuç farklıdır.",
            "Metne bütün sözcüğü ekleme.",
          ],
        },
        {
          sentence: "Bütün öğrenciler yürüyerek geldi.",
          context: "Bu kez grubun tamamını kapsayan ifade açıkça veriliyor.",
          nodes: [
            {
              label: "Grup",
              text: "İlgili grubun tamamı.",
            },
            {
              label: "Verilen",
              text: "Hepsi yürüyerek geldi.",
            },
            {
              label: "Sınır",
              text: "Bu grupta yürümeyen öğrenci yok.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Tam kapsam",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Grup içi sonuç",
              valid: true,
            },
          ],
          focus: 1,
          decision: "Bütün grup bilgisi",
          reason:
            "Bütün ifadesi ilgili grubun tamamını kapsar. Bu grubun dışında kalan kişiler için yeni bilgi üretmez.",
          evidence: [
            "Tamam ifadesinin hangi gruba ait olduğunu koru.",
            "Bir başka gün veya grup hakkında sonuç verilmez.",
          ],
        },
      ],
    },
  ],
  "paragrafa-giris": [
    {
      id: "etiket",
      label: "Tanıtım ve gönderme sırası",
      frames: [
        {
          sentence:
            "Bu etiketler aramayı daha hızlı kıldı. Arşiv görevlisi her deftere yıl etiketi ekledi. Böylece aradığımız yılı birkaç dakikada bulduk.",
          context:
            "Amaç önce etiketleri tanıtıp arama hızına, sonra bulunan kayda geçmektir.",
          nodes: [
            {
              label: "Cümle A",
              text: "Bu etiketler aramayı daha hızlı kıldı.",
            },
            {
              label: "Cümle B",
              text: "Arşiv görevlisi her deftere yıl etiketi ekledi.",
            },
            {
              label: "Cümle C",
              text: "Böylece aradığımız yılı birkaç dakikada bulduk.",
            },
          ],
          relations: [
            {
              source: 1,
              target: 0,
              label: "Etiketlerin öncülü",
              valid: false,
            },
            {
              source: 0,
              target: 2,
              label: "Hızlanmanın sonucu",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Öncül sonra geliyor",
          reason:
            "A’daki bu etiketler henüz tanıtılmadı; B daha sonra geldiği için bu hazır zincirde ilk bağ kopuyor.",
          evidence: [
            "Sıra: A → B → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Kesik ok bu hazır sırada öncülün geç kaldığını gösterir.",
          ],
        },
        {
          sentence:
            "Arşiv görevlisi her deftere yıl etiketi ekledi. Bu etiketler aramayı daha hızlı kıldı. Böylece aradığımız yılı birkaç dakikada bulduk.",
          context:
            "Amaç önce etiketleri tanıtıp arama hızına, sonra bulunan kayda geçmektir.",
          nodes: [
            {
              label: "Cümle B",
              text: "Arşiv görevlisi her deftere yıl etiketi ekledi.",
            },
            {
              label: "Cümle A",
              text: "Bu etiketler aramayı daha hızlı kıldı.",
            },
            {
              label: "Cümle C",
              text: "Böylece aradığımız yılı birkaç dakikada bulduk.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Etiketlerin öncülü",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Hızlanmanın sonucu",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Öncül önce geliyor",
          reason:
            "B etiketleri tanıtır, A bunların etkisini açıklar ve C hızlı aramanın sonucunu verir.",
          evidence: [
            "Sıra: B → A → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Her iki komşu bağ tam metinde birlikte korunur.",
          ],
        },
      ],
    },
    {
      id: "fide",
      label: "Olay ve kayıt sırası",
      frames: [
        {
          sentence:
            "Bu ölçümleri çizelgeye yazdık. Fidelerin boyunu her sabah ölçtük. Dönem sonunda bu çizelgeyle büyüme hızını kıyasladık.",
          context:
            "Bu hazır metinde önce ölçme, sonra ölçümleri yazma ve çizelgeyi kullanma var; geriye dönüş işareti yok.",
          nodes: [
            {
              label: "Cümle A",
              text: "Bu ölçümleri çizelgeye yazdık.",
            },
            {
              label: "Cümle B",
              text: "Fidelerin boyunu her sabah ölçtük.",
            },
            {
              label: "Cümle C",
              text: "Dönem sonunda bu çizelgeyle büyüme hızını kıyasladık.",
            },
          ],
          relations: [
            {
              source: 1,
              target: 0,
              label: "Ölçümlerin öncülü",
              valid: false,
            },
            {
              source: 0,
              target: 2,
              label: "Çizelgenin öncülü",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Ölçüm bağı kopuk",
          reason:
            "A’daki bu ölçümler için ilk sırada öncül yok. B ölçmeyi tanıtınca A’nın kaydı anlaşılır.",
          evidence: [
            "Sıra: A → B → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Kesik ok bu hazır sırada öncülün geç kaldığını gösterir.",
          ],
        },
        {
          sentence:
            "Fidelerin boyunu her sabah ölçtük. Bu ölçümleri çizelgeye yazdık. Dönem sonunda bu çizelgeyle büyüme hızını kıyasladık.",
          context:
            "Bu hazır metinde önce ölçme, sonra ölçümleri yazma ve çizelgeyi kullanma var; geriye dönüş işareti yok.",
          nodes: [
            {
              label: "Cümle B",
              text: "Fidelerin boyunu her sabah ölçtük.",
            },
            {
              label: "Cümle A",
              text: "Bu ölçümleri çizelgeye yazdık.",
            },
            {
              label: "Cümle C",
              text: "Dönem sonunda bu çizelgeyle büyüme hızını kıyasladık.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Ölçümlerin öncülü",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Çizelgenin öncülü",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Ölçüm zinciri bağlı",
          reason:
            "B ölçme, A çizelgeye yazma ve C bu çizelgeyle kıyas yapma işini verir.",
          evidence: [
            "Sıra: B → A → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Her iki komşu bağ tam metinde birlikte korunur.",
          ],
        },
      ],
    },
    {
      id: "ornek",
      label: "Genel yargı ile örnek",
      frames: [
        {
          sentence:
            "Örneğin yıl etiketleri, eski defterleri hızlı bulmamızı sağlar. Düzenli kayıtlar, aranan bilgiye ulaşmayı daha kolay kılar. Bu yüzden yalnız saklamak değil, erişime de düzen vermek gerekir.",
          context:
            "Amaç önce erişim düzenini tanıtmak, sonra örnek verip sonuca varmaktır.",
          nodes: [
            {
              label: "Cümle A",
              text: "Örneğin yıl etiketleri, eski defterleri hızlı bulmamızı sağlar.",
            },
            {
              label: "Cümle B",
              text: "Düzenli kayıtlar, aranan bilgiye ulaşmayı daha kolay kılar.",
            },
            {
              label: "Cümle C",
              text: "Bu yüzden yalnız saklamak değil, erişime de düzen vermek gerekir.",
            },
          ],
          relations: [
            {
              source: 1,
              target: 0,
              label: "Örneğin genel yargısı",
              valid: false,
            },
            {
              source: 0,
              target: 2,
              label: "Örnekten kapanış",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Örnek önce kalmış",
          reason:
            "Örneğin sözü bir önceki düşünceyi aratır. Bu hazır sırada düşünce B’de sonra geliyor.",
          evidence: [
            "Sıra: A → B → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Kesik ok bu hazır sırada öncülün geç kaldığını gösterir.",
          ],
        },
        {
          sentence:
            "Düzenli kayıtlar, aranan bilgiye ulaşmayı daha kolay kılar. Örneğin yıl etiketleri, eski defterleri hızlı bulmamızı sağlar. Bu yüzden yalnız saklamak değil, erişime de düzen vermek gerekir.",
          context:
            "Amaç önce erişim düzenini tanıtmak, sonra örnek verip sonuca varmaktır.",
          nodes: [
            {
              label: "Cümle B",
              text: "Düzenli kayıtlar, aranan bilgiye ulaşmayı daha kolay kılar.",
            },
            {
              label: "Cümle A",
              text: "Örneğin yıl etiketleri, eski defterleri hızlı bulmamızı sağlar.",
            },
            {
              label: "Cümle C",
              text: "Bu yüzden yalnız saklamak değil, erişime de düzen vermek gerekir.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Örneğin genel yargısı",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Örnekten kapanış",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Genel yargı açılmış",
          reason:
            "B düşünceyi açar; A yıl etiketini örnek verir; C erişim düzeninin gereğini bağlar.",
          evidence: [
            "Sıra: B → A → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Her iki komşu bağ tam metinde birlikte korunur.",
          ],
        },
      ],
    },
    {
      id: "kisi",
      label: "Giriş bir kişisel sahne olabilir",
      frames: [
        {
          sentence:
            "Ben de dedemin resmini çantamdan çıkardım. Sabah arşiv kapısında sıraya girdim. İçeride sıra bekleyen kişiler eski resimlerini birbirine gösterdi.",
          context:
            "Bu olay anlatımı kişisel bir sahneyi açar. Ben de ifadesi, resim gösteren öteki kişilerin önce verilmesini ister.",
          nodes: [
            {
              label: "Cümle A",
              text: "Ben de dedemin resmini çantamdan çıkardım.",
            },
            {
              label: "Cümle B",
              text: "Sabah arşiv kapısında sıraya girdim.",
            },
            {
              label: "Cümle C",
              text: "İçeride sıra bekleyen kişiler eski resimlerini birbirine gösterdi.",
            },
          ],
          relations: [
            {
              source: 1,
              target: 2,
              label: "Sahne ve bekleyenler",
              valid: true,
            },
            {
              source: 2,
              target: 0,
              label: "Ben de için karşılık",
              valid: false,
            },
          ],
          focus: 0,
          decision: "Ekleme önce kalmış",
          reason:
            "A ilk sıradayken ben de ifadesinin eklendiği kişiler belli değil; olayın sahnesi de sonra geliyor.",
          evidence: [
            "Sıra: A → B → C.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Kesik ok bu hazır sırada öncülün geç kaldığını gösterir.",
          ],
        },
        {
          sentence:
            "Sabah arşiv kapısında sıraya girdim. İçeride sıra bekleyen kişiler eski resimlerini birbirine gösterdi. Ben de dedemin resmini çantamdan çıkardım.",
          context:
            "Bu olay anlatımı kişisel bir sahneyi açar. Ben de ifadesi, resim gösteren öteki kişilerin önce verilmesini ister.",
          nodes: [
            {
              label: "Cümle B",
              text: "Sabah arşiv kapısında sıraya girdim.",
            },
            {
              label: "Cümle C",
              text: "İçeride sıra bekleyen kişiler eski resimlerini birbirine gösterdi.",
            },
            {
              label: "Cümle A",
              text: "Ben de dedemin resmini çantamdan çıkardım.",
            },
          ],
          relations: [
            {
              source: 0,
              target: 1,
              label: "Sahne ve bekleyenler",
              valid: true,
            },
            {
              source: 1,
              target: 2,
              label: "Ben de için karşılık",
              valid: true,
            },
          ],
          focus: 0,
          decision: "Sahne önce açılmış",
          reason:
            "B anlatıcıyı ve yeri açar, C resim gösteren kişileri tanıtır, A ise onlara katılma olayını verir.",
          evidence: [
            "Sıra: B → C → A.",
            "Ok, tanıtımdan ona gönderme yapan cümleye gider.",
            "Her iki komşu bağ tam metinde birlikte korunur.",
          ],
        },
      ],
    },
  ],
};
export function turkishCases018(lessonId: string): readonly TurkishCase018[] {
  const cases = authoredCases018[lessonId];
  if (!cases)
    throw new RangeError("Bu keşif için hazırlanmış bir ünite seçilmeli.");
  return cases;
}
export function buildTurkishScene018(
  lessonId: string,
  caseId: string,
  changed: boolean,
  selected?: number,
) {
  const pair = turkishCases018(lessonId).find((item) => item.id === caseId);
  if (!pair)
    throw new RangeError("Bu ünitede hazırlanmış bir örnek seçilmeli.");
  if (typeof changed !== "boolean")
    throw new RangeError("Dönüşüm açık veya kapalı olmalı.");
  const frame = pair.frames[changed ? 1 : 0],
    index = selected ?? frame.focus;
  if (!Number.isInteger(index) || index < 0 || index >= frame.nodes.length)
    throw new RangeError("Şemada bulunan bir düğüm seçilmeli.");
  return {
    ...frame,
    selected: index,
    target: frame.nodes[index],
    options: [...new Set(pair.frames.map((item) => item.decision))],
  };
}
export const turkishExplorationDefaults018 = {
  pair: "goz",
  changed: false,
  selected: -1,
  guess: "",
  reason: "",
  compared: false,
  show: false,
};
