import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

type HumanitiesGuide020 = LessonGuide & { title: string };
const guideSpecs020: HumanitiesGuide020[] = [
  {
    "id": "felsefeyi-tanima",
    "minutes": 85,
    "objectives": [
      "Felsefi soruyu yalnız kalıbıyla değil istediği kavram ve gerekçeyle belirle.",
      "Merak, eleştiri, tutarlılık, sistemlilik ve refleksiyonu gerçek düşünme işlemlerinde ayır.",
      "Bir görüşü varsayım, gerekçe ve karşı örnekle incele.",
      "Felsefenin bireysel ve toplumsal işlevlerini açık örneklerle anlat."
    ],
    "sections": [
      {
        "title": "Gündelik bir olaydan düşünmeye başla",
        "paragraphs": [
          "İki kişi arasında malzeme paylaştırılacağını düşün. “Toplam kaç parça var?” sorusu sayılabilir bir olguyu araştırır. “Herkese aynı sayıda vermek her durumda adil midir?” sorusu ise adalet için bir ölçüt ister. İkinci soruda bir sayı öğrenmek yetmez; eşitlik, ihtiyaç ve hak gibi kavramların ne anlama geldiğini ve hangi gerekçeyle kullanılacağını tartışmak gerekir.",
          "Felsefe böyle bir soruyu tek bir kişinin hoşuna giden yanıtla kapatmaz. Önce kavramı açıklar, sonra verilen yanıtın dayanaklarını ve başka durumlarda doğuracağı sonuçları inceler. Gündelik bir olay felsefi düşünmeye başlangıç olabilir. Önemli olan olayın sıradan ya da ilginç olması değil, hangi sorunun sorulduğu ve cevabın nasıl temellendirildiğidir."
        ]
      },
      {
        "title": "Bilgelik sevgisi ve devam eden arayış",
        "paragraphs": [
          "Felsefe sözü Yunanca sevgi ve bilgelik anlamındaki sözcüklerle ilişkilidir; geleneksel karşılığı bilgelik sevgisidir. Filozof kendisini bütün cevapların tartışmasız sahibi olarak değil, bilme ve anlama arayışını sürdüren kişi olarak görebilir. Bir kavramı öğrenmek, o kavramla ilgili bütün soruların sonsuza dek çözüldüğünü kabul etmek değildir.",
          "Bilgi bir yargıyı bilmekle, bilgelik ise bilginin anlamını ve yaşamla ilişkisini düşünmekle bağlantılıdır. Bu iki kavramı bütünüyle karşıt sayma; bilgelik bilgisizliği övmek değildir. Farklı düşünürler felsefeyi ilk nedenleri inceleme, kendini tanıma veya yolda olma gibi yönlerle tanımlamıştır. Bu tanımlar, aynı arayışın değişik odaklarını görünür kılar."
        ]
      },
      {
        "title": "Filozof bir görüşü nasıl geliştirir?",
        "paragraphs": [
          "Bir kişi “Adalet aynı paydır.” diyebilir. Filozofça düşünmek için bu görüşü açıklaştırırız: aynı pay hangi kişiler, hangi ihtiyaçlar ve hangi koşullar için adil sayılıyor? Ardından bir gerekçe isteriz. Görüşün dile getirilmesi ilk adımdır; hangi durumda savunulabileceğini göstermek onu tartışılabilir bir sav hâline getirir.",
          "Karşı örnek bu savı geliştirebilir. Birinin ihtiyacı diğerinin iki katıysa aynı payın neyi koruduğu ve neyi karşılamadığı sorulabilir. Bu örnek tek başına bütün adalet sorunlarını çözmez; ilk tanımın kapsamını araştırır. Kendi görüşünü de bu denetime açmak, yalnız başkasında hata aramaktan daha kapsamlı bir düşünme tutumudur."
        ]
      },
      {
        "title": "Felsefi soru ile olgu sorusunu ayır",
        "paragraphs": [
          "“Bu resim hangi yılda yapıldı?” sorusu belirli bir olayın tarihini ister. “Bir resmi güzel yapan nedir?” sorusu ise güzellik için bir ölçüt araştırır. Olgu sorusunda belge incelemek yeterli olabilir; ikinci soruda güzellik, beğeni ve sanat kavramlarını tartışmak gerekir. İki soru aynı resimle ilgili olsa da istedikleri cevap türü farklıdır.",
          "Felsefi soruların hepsi nedir sözcüğüyle bitmez. “Doğru bildiğimizden neden emin olalım?” veya “Aynı kural farklı kişilere nasıl uygulanmalı?” soruları da gerekçe ve ölçüt ister. Buna karşılık “Bu binanın adı nedir?” soru kalıbını taşısa bile yalnız bir ad öğrenmeyi amaçlayabilir. Soru ekini değil, sorunun açtığı araştırmayı izle."
        ]
      },
      {
        "title": "Konu ile yapılan işlemi farklı oku",
        "paragraphs": [
          "Bir metin adalet, bilgi veya toplumdan söz edebilir. Bu konu adını görmek, sorunun istediği zihinsel işlemi tek başına belirlemez. Bir yazar adalet kavramının sınırlarını araştırıyorsa kavramsal çözümleme yapıyor; kendi adalet ölçütünü niçin seçtiğini soruyorsa düşüncesinin dayanaklarına geri dönüyor olabilir.",
          "Önce “Ne hakkında konuşuluyor?”, sonra “Yazar bu konuda ne yapıyor?” diye iki ayrı soru sor. Kavram tanımlama, gerekçe isteme, iki savı karşılaştırma ve kendi yöntemini inceleme farklı işlemlerdir. Soru kökü hangi özelliği istiyorsa tam cümledeki eylemi kanıt göster. Metinde toplum geçiyor diye her durumda yalnız sosyal bilim cevabı verilmez."
        ]
      },
      {
        "title": "Merak ve hayret düşünmeyi başlatır",
        "paragraphs": [
          "Merak, bilmediğin bir şeyi öğrenme ve anlamlandırma isteğidir. Hayret ise alıştığın bir olayın bile şaşırtıcı yanını fark ederek üzerinde durmanı sağlayabilir. Her gün gördüğün bir gölgenin neden yer değiştirdiğini merak edebilirsin; bu olay bilimsel bir ölçüme de, değişim kavramına ilişkin felsefi soruya da başlangıç olabilir.",
          "Bu duygular tek başına bir açıklamanın doğruluğunu kanıtlamaz. Merakı araştırılabilir soruya dönüştürmek, hangi kavramların ve hangi dayanakların gerektiğini belirlemek gerekir. Şaşırtıcı bir iddiaya inanmakla onu şaşırtıcı bulup gerekçesini araştırmak aynı tutum değildir. Felsefi düşünce hayreti soru, çözümleme ve temellendirmeyle sürdürür."
        ]
      },
      {
        "title": "Kuşku ve sorgulama ne işe yarar?",
        "paragraphs": [
          "Kuşku, doğru kabul ettiğin bir yargının yeterli dayanağı olup olmadığını yeniden sormana yol açabilir. Sorgulama, kavramı, varsayımı ve gerekçeyi açıkça inceleme sürecidir. Bir görüşü sırf alışılmış olduğu için kabul etmeyebilirsin; fakat sırf alışılmış olduğu için reddetmek de aynı derecede gerekçesiz kalabilir.",
          "Kuşku her durumda hiçbir bilginin mümkün olmadığını savunmak demek değildir. Bir düşünür güvenilir bir sonuca ulaşmak için kuşkuyu yöntem olarak kullanabilir. Bir başka düşünür kesin bilgi iddiasının kendisine itiraz edebilir. Hangisinin yapıldığını anlamak için kuşkunun araç mı sonuç mu olduğunu ve metnin sonunda hangi savın korunduğunu oku."
        ]
      },
      {
        "title": "Eleştiri bir gerekçe denetimidir",
        "paragraphs": [
          "Felsefi eleştiri, bir kişiye hakaret etmek veya onun bütün görüşlerini değersiz saymak değildir. Savın ne dediğini doğru anladıktan sonra dayanağın sonucu gerçekten destekleyip desteklemediğini araştırmaktır. Güçlü bir eleştiri, görüşün hangi öncülüne itiraz ettiğini ve bu itirazın sonuç üzerindeki etkisini açıklar.",
          "“Bu yazar ünlü değil, o hâlde savı yanlış.” demek görüşün içeriğini incelemez. Buna karşılık “Bu sav yalnız eşit ihtiyaçlarda çalışıyor; farklı ihtiyaçta şu sonucu açıklamıyor.” eleştirisi belirli bir sınır gösterir. Görüşü düzeltme veya yeniden kurma da eleştirinin olumlu devamı olabilir; amaç yalnız her şeye karşı çıkmak değildir."
        ]
      },
      {
        "title": "Rasyonellik: gerekçe ile sonucun bağı",
        "paragraphs": [
          "Rasyonel düşünme, akla dayalı nedenler kurma ve bunların birbirini nasıl desteklediğini denetleme çabasıdır. Bir görüşün çok kişiye çekici gelmesi veya güçlü bir duyguyla söylenmesi, dayanağının sağlam olduğunu tek başına göstermez. “Neden bu sonuca varıyorsun?” sorusu bizi sonuçtan gerekçeye götürür.",
          "Duyguların bir sorunu fark etmede rolü olabilir; rasyonellik insanın hiçbir duygu yaşamaması demek değildir. Önemli olan ileri sürülen sonucun açık ve tartışılabilir dayanaklarla savunulmasıdır. Örneğin bir haksızlığa üzülmek soruşturmayı başlatabilir; hangi ilkenin ihlal edildiğini ve neden haksız olduğunu ayrıca açıklamak gerekir."
        ]
      },
      {
        "title": "Kavramları örnekleriyle ve sınırlarıyla aç",
        "paragraphs": [
          "Cesaret ile gözü karalık benzer davranışlar gibi görünebilir. İkisinde de bir tehlikeye yaklaşma vardır; ancak riskin bilinmesi, amacın değeri ve ölçülü karar verme gibi ayrımlar farklı değerlendirmelere yol açabilir. Kavramsal çözümleme, bir terimin hangi koşulda hangi anlamı taşıdığını örneklerle araştırır.",
          "Bir tanımın yalnız bir örneğe uyması yeterli olmayabilir. “Cesaret her riski almaktır.” tanımını düşün; anlamsız bir tehlikeye düşünmeden atılmak da bu tanıma girer. Tanımı örnek ve karşı örnekle incelemek daha açık bir kavrama götürür. Kavramın sınırını açmak, sözcüğün yalnız sözlük karşılığını tekrarlamaktan daha etkin bir işlemdir."
        ]
      },
      {
        "title": "Tutarlılığı aynı koşullar altında denetle",
        "paragraphs": [
          "Bir görüşün parçaları aynı anda ve aynı anlamda birlikte savunulabiliyorsa tutarlılıktan söz edilir. “Bu kararın bütün kişilere aynı koşulda uygulanması gerekir.” deyip aynı koşuldaki belirli bir kişiye gerekçesiz istisna tanımak görüş içinde sorun doğurabilir. Çelişkiyi göstermek için özne, zaman, anlam ve koşullar eşlenmelidir.",
          "İki kişinin farklı görüş savunması tek başına ikisinin de tutarsız olduğunu göstermez. Bir kişi yağmurda şemsiye gerekir, güneşte gerekmez diyorsa koşullar farklıdır; sözler otomatik çelişmez. Önce iki yargının neyi, hangi durumda söylediğini açık yaz. Tutarlılık tek başına bütün öncüllerin gerçek dünyada doğru olduğunu da garanti etmez."
        ]
      },
      {
        "title": "Sistemlilik: açıklamaları bir yapı içinde bağla",
        "paragraphs": [
          "Sistemli düşünce, dağınık cümlelerin rastgele yan yana gelmesi değil, kavramların ve yargıların birbirine bağlı biçimde kurulmasıdır. Bir düşünür önce özgürlüğü nasıl anladığını açıklar, ardından sorumluluğun bu anlayışta hangi koşullara bağlı olduğunu gösterir. Böylece tek bir cevap, daha geniş bir görüşün içinde yer alır.",
          "Sistem kurmak bütün sorulara aynı ezber sözcüğü vermek değildir. Kavramlardan sonuçlara geçişte hangi dayanakların kullanıldığını açık tutmak gerekir. Bir varsayım değiştiğinde ona bağlı sonuçların da yeniden incelenmesi, sistemli düşünmenin parçasıdır. Düzenli başlıklar yalnız sunum kolaylığı sağlar; asıl sistemlilik düşünceler arasındaki gerçek ilişkidedir."
        ]
      },
      {
        "title": "Refleksiyon: kendi düşüncene geri dön",
        "paragraphs": [
          "Bir olay hakkında düşünmek ile o olayı değerlendirirken kullandığın ölçüt hakkında düşünmek farklı düzeylerdir. “Bu paylaştırma eşit mi?” ilk düzeyde bir soru olabilir. “Eşitliği adalet ölçütü olarak niçin seçtim?” sorusu ise düşüncenin kendi dayanağına yönelir. Bu geri dönüş refleksif düşünme olarak adlandırılır.",
          "Refleksiyon yalnız kendinle ilgili herhangi bir anıyı anlatmak değildir. Kendi yöntemin, varsayımın veya değerlendirme biçimin incelenmelidir. Bir okur önce yazarın sonucunu eleştirip sonra kendi itirazının hangi öncüle dayandığını sorabilir. Böylece düşünmeyi de düşünme konusu yapar; bu, eleştirel tutumun kendisine uygulanmasıdır."
        ]
      },
      {
        "title": "Evrensellik ve yığılımlı gelişme",
        "paragraphs": [
          "Felsefi sorular belirli bir kişinin hayatından doğsa bile başkalarının da tartışabileceği kavram ve gerekçelere açılır. Adalet, bilgi veya varlık sorularının farklı toplumları ilgilendirmesi bu anlamda evrenselliğe örnektir. Evrensellik bütün insanların aynı cevabı verdiği veya bütün düşünürlerin tarihsel koşullarından bağımsız olduğu anlamına gelmez.",
          "Felsefe eski sorulara getirilen yeni yanıtlarla zenginleşir; buna yığılımlı gelişme denir. Yeni bir düşünür önceki görüşü tartışabilir, değiştirebilir veya ona başka bir soru ekleyebilir. Eski bir görüşün hâlâ tartışılması hiç yeni düşünce oluşmadığını göstermez. Bu gelişmeyi bilimle tek bir yarış sırasına koymak yerine farklı alanların nasıl birikim oluşturduğunu incele."
        ]
      },
      {
        "title": "Tarihsel birikimi ve sistemleşmeyi birlikte gör",
        "paragraphs": [
          "Felsefenin Antik Yunan’da, özellikle MÖ 6. yüzyıl çevresinde sistemli bir tartışma geleneği hâline gelişi dersin tarihsel çerçevesidir. Ticaret, farklı kültürlerle karşılaşma, belirli toplumsal gruplar için boş zaman ve tartışma ortamı bu gelişmeyi etkileyen koşullardandır. Tek bir kişinin merakı kadar çevresindeki düşünsel birikim de önemlidir.",
          "Bu çerçeve Mısır, Mezopotamya, Hint veya Çin uygarlıklarında düşünce, bilgi ya da sorgulama bulunmadığı anlamına gelmez. Kültürler arasında matematik, astronomi ve başka bilgi alışverişleri vardı. Bir geleneğin belirli yerde sistemleşmesini açıklamakla bütün düşüncenin yalnız o toplumda ortaya çıktığını ileri sürmek farklı iddialardır; kapsamı doğru kurmak gerekir."
        ]
      },
      {
        "title": "Bireysel ve toplumsal işlevleri uygula",
        "paragraphs": [
          "Felsefi düşünme kendi değerlerini sorgulamana, bir görüşü gerekçesiyle savunmana, başka bir bakış açısını anlamana ve ön yargılarını fark etmene yardımcı olabilir. Bu katkılar bütün tartışmalarda otomatik anlaşma sağlandığı anlamına gelmez. Görüş ayrılığı sürse bile anlaşmazlığın hangi kavram veya öncülden doğduğunu daha açık görebilirsin.",
          "Toplumsal düzeyde hak, özgürlük, adalet ve ortak yaşam ilkelerini gerekçeleriyle tartışmak önemlidir. Felsefe, bilim ve sanatın varsayımlarını da araştırabilir. Bu üniteden sonra bir konuşmayı incelerken şu yolu dene: soruyu belirle, kavramı açıkla, savı ve gerekçeyi ayır, karşı örnek ara, sonucu yeniden değerlendir. Uyarılar bu olumlu düşünme yolunu destekler; onun yerine geçmez."
        ]
      },
      {
        "title": "Bilinç ile öz bilinci ayır",
        "paragraphs": [
          "Bilinç, kendinin veya çevrendeki bir durumun farkında olma ile ilgilidir. Masanın üzerindeki kitabı fark etmen, bir ses duyman veya üzüldüğünü bilmen bu başlıkta incelenebilir. Öz bilinçte ise kendi varlığın, düşüncen veya davranışın üzerinde durursun. Kitabı okurken hangi varsayımla yorum yaptığını incelemek, odağı kendi düşünme etkinliğine çevirir.",
          "Bu ayrım bir insanın yalnız iki ayrı anında ortaya çıkan bütünüyle kopuk yetenekler değildir. Aynı okumada hem metnin farkında olabilir hem kendi yorumunu denetleyebilirsin. Soruda yalnız ben sözcüğünün geçmesi öz bilinç için yeterli kanıt olmaz; kişinin kendi farkındalığına, değerlendirmesine veya düşünmesine yönelip yönelmediğini tam cümlede ara."
        ]
      },
      {
        "title": "Felsefenin alanlarını sorularıyla tanı",
        "paragraphs": [
          "Varlık felsefesi neyin var olduğunu ve temelini, bilgi felsefesi bilmenin imkânını ve dayanağını, ahlak felsefesi iyi eylemi ve sorumluluğu sorar. Sanat felsefesi sanatın ve estetik değerin ne olduğunu, siyaset felsefesi ortak yaşamın meşruiyetini araştırır. Din felsefesi dinin temel kavramlarını, bilim felsefesi bilimsel bilginin yöntem ve yapısını tartışır.",
          "Aynı konu farklı alan sorularına açılabilir. Bir laboratuvar araştırmasında deneyin nasıl açıklama sağladığı bilim felsefesine, katılımcıya zarar verme sorumluluğu ahlak felsefesine yönelir. Laboratuvar sözcüğünü görünce her soruyu otomatik bilim felsefesi sayma. Alanı belirleyen, yalnız olayın geçtiği yer değil araştırılan sorunun kendisidir."
        ]
      },
      {
        "title": "Felsefe tanımlarının farklı odakları",
        "paragraphs": [
          "Felsefenin tek bir kısa tanımında anlaşılmaması, hiçbir ortak araştırma olmadığı anlamına gelmez. El Kindî’nin insanın kendini tanımasına ve gücü ölçüsünde hakikatleri bilmesine yönelen açıklaması ile Fârâbî’nin var olmaları bakımından varlıkları bilme vurgusu farklı odaklar açar. İbn Sînâ’da insanın imkânı ölçüsünde nesnelerin hakikatini bilme uğraşı öne çıkar. Bunları yalnız üç eş anlamlı cümle gibi değil, hangi soruya yöneldiklerini gösteren tanımlar olarak oku.",
          "Kant’ın kavramlarla kurulan akılsal bilgi vurgusu yönteme, Jaspers’ın yolda olma açıklaması devam eden arayışa dikkat çeker. Mengüşoğlu felsefenin var olanları ve onların bilgisini birçok disiplin içinde ele alan kapsamını öne çıkarır. Platon’da değişmeyen öz gerçeğe yöneliş, Aristoteles’te varlık olmak bakımından varlığı araştırma odağı belirgindir. Bir tanımı düşünür adıyla eşleştirirken o tanımın olumlu içeriğini de kendi sözlerinle açıklayabilmelisin."
        ]
      },
      {
        "title": "Hikmet ve hakikat hangi soruları açar?",
        "paragraphs": [
          "Hikmet, bilgelikle ilişkili olarak olup bitenin esasını kavrama ve bilineni yaşama uygulama anlamları taşıyabilir. Örneğin adalet hakkında bir ilkeyi öğrenmek ile o ilkeyi gerçek bir kararın koşullarını düşünerek kullanmak farklı aşamalardır. Hikmet vurgusu, ezberlenmiş cümleden düşünülmüş yaşama geçişi görünür kılar; bilgi ile bilgelik birbirini bütünüyle dışlayan iki alan değildir.",
          "Hakikat sözü ise bağlama göre gerçeklik veya doğruluk anlamında kullanılabilir. Birinde neyin gerçekten var olduğunu, diğerinde bir yargının nesnesine uygun olup olmadığını sorarız. “Hakikati arıyorum.” cümlesini her soruda aynı ezber etikete çevirmek yerine hangi anlamın kastedildiğini belirle. Bu ayrım, varlığın kendisi ile onun hakkındaki yargıyı birbirine karıştırmadan tartışmayı sürdürmeyi sağlar."
        ]
      }
    ],
    "examples": [
      {
        "title": "Bir paylaşımın ölçütünü araştır",
        "prompt": "On iki parça malzeme iki kişiye verilecek. Birinci kişinin ihtiyacı sekiz, ikinci kişinin ihtiyacı dört parça. Deniz “Herkese altı parça verelim.” diyor. Ece “Aynı miktar her ihtiyaçta adil midir?” diye soruyor. Ece’nin yaptığı düşünme işlemini açıkla.",
        "strategy": "Verilen sayılar ile sayılara hangi değerin uygulanacağı sorusunu ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Önce olguyu çıkar: toplam on iki parça, ihtiyaçlar sekiz ve dört; eşit paylaşım altı ve altıdır. Bu bilgiler hesaplanabilir miktarlardır."
          },
          {
            "label": "2. adım",
            "explanation": "Ece miktarı yeniden saymıyor; eşitliğin adalet ölçütü olarak hangi koşulda yeterli olduğunu soruyor. Böylece adalet kavramı ve kullanılan dayanak incelemeye açılıyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bir karşı durum veriyor: farklı ihtiyaçta aynı pay bir ihtiyacı karşılamazken ötekini aşabilir. Bu, bütün adalet sorunlarının çözüldüğünü değil ilk ölçütün kapsamının araştırıldığını gösterir."
          }
        ],
        "answer": "Ece, adaletin ölçütünü kavramsal ve gerekçeli biçimde sorguluyor.",
        "check": "Gerekçede aynı miktarın niçin seçildiği soruluyor; yalnız toplam sayıyı öğrenmek istenmiyor.",
        "pitfall": "Ece’nin sorusunu yalnız matematik hesabı veya bütün durumlarda tek doğru dağıtımın kanıtı sayma."
      },
      {
        "title": "Refleksif dönüşü bul",
        "prompt": "Bir okur önce “Yazarın adalet savı hangi örneğe dayanıyor?” diyor. Sonra “Ben bu savı değerlendirirken neden yalnız eşitliği ölçüt aldım?” diye soruyor. İkinci soruda ne değişti?",
        "strategy": "Düşünülen nesneyi ve düşünme yöntemini ayrı satırlara yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk soruda okur başkasının görüşünün dayanağını inceler. Bu eleştirel değerlendirme olabilir."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci soruda kendi değerlendirme ölçütüne geri döner; eşitliği niçin esas aldığını sorar. Düşünmenin kendisi yeni inceleme konusu olur."
          },
          {
            "label": "3. adım",
            "explanation": "Bu geri dönüş refleksiyondur. Yalnız ben demesi değil kendi yöntemini ve varsayımını incelemesi belirleyicidir."
          }
        ],
        "answer": "İkinci soruda okur kendi düşüncesinin dayanağına yönelerek refleksif düşünür.",
        "check": "Kendisi hakkında bir anı anlatmıyor; nasıl yargıladığını sorguluyor.",
        "pitfall": "İlk eleştiriyle ikinci refleksiyonu bütünüyle ilişkisiz veya birbirini dışlayan özellikler sayma."
      },
      {
        "title": "Çelişki için koşulları eşleştir",
        "prompt": "Ada “Kütüphane hafta içi saat dokuzda açılır.” ve “Kütüphane pazar günü saat onda açılır.” diyor. Bu iki sözden Ada’nın tutarsız olduğu çıkar mı?",
        "strategy": "Aynı yüklemin farklı zaman ve koşullara bağlanıp bağlanmadığını kontrol et.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Birinci yargının koşulu hafta içidir. İkinci yargının koşulu pazardır; aynı gün kümesi değildir."
          },
          {
            "label": "2. adım",
            "explanation": "Aynı kurum farklı günlerde farklı saatlerde açılabilir. İki söz aynı anda aynı koşul için karşıt bir açılış saati ileri sürmüyor."
          },
          {
            "label": "3. adım",
            "explanation": "Dolayısıyla bu iki yargıdan çelişki gösterilemez. Gerçek saatlerin doğru olup olmadığı ise ayrıca belge veya gözlem gerektirir."
          }
        ],
        "answer": "Verilen iki söz birlikte savunulabilir; buradan tutarsızlık çıkarılamaz.",
        "check": "Koşullar eşitlenmediği için çelişki yoktur; bu, her iki olgusal iddianın doğrulandığı anlamına gelmez.",
        "pitfall": "Farklı günlerdeki bütün farklı sayıları otomatik çelişki kabul etme."
      },
      {
        "title": "Aynı laboratuvara farklı soru sor",
        "prompt": "Bir araştırma için üç soru yazılıyor: “Ölçüm cihazı nasıl çalışıyor?”, “Bir deneyi bilimsel yapan nedir?”, “Katılımcıdan habersiz örnek almak doğru mudur?” Son iki sorunun alanlarını ayır.",
        "strategy": "Sorunun geçtiği mekâna değil araştırılan ilişkiye odaklan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İkinci soru bilimsel araştırmanın niteliğini ve yöntemini sorar. İncelenen nesne bilimin kendisidir."
          },
          {
            "label": "2. adım",
            "explanation": "Üçüncü soru rıza ve eylemin ahlaki gerekçesini sorar. Bilim ortamında ortaya çıksa da değerlendirme odağı ahlakidir."
          },
          {
            "label": "3. adım",
            "explanation": "Bu nedenle ikinci soru bilim felsefesine, üçüncü soru ahlak felsefesine açılır. Bir olay birden fazla felsefi alana konu olabilir."
          }
        ],
        "answer": "Bilimsel olma ölçütü bilim felsefesinin; rıza ve doğru eylem ahlak felsefesinin sorusudur.",
        "check": "İki sorunun nesne ve dayanakları farklıdır; yalnız laboratuvar sözcüğü ikisini aynı alan yapmaz.",
        "pitfall": "Cihazın teknik işleyişini sormayı doğrudan felsefi yöntem sorusuyla karıştırma."
      }
    ],
    "recall": [
      {
        "prompt": "Bir soruyu felsefi yapan yalnız nedir kalıbı mıdır?",
        "answer": "Hayır. İstediği kavram, ölçüt ve gerekçe belirleyicidir; bir binanın adını soran nedir cümlesi yalnız olgusal bilgi isteyebilir."
      },
      {
        "prompt": "Refleksiyonu yalnız bir konuda düşünmekten nasıl ayırırsın?",
        "answer": "Kendi düşünme yöntemi, ölçütü veya varsayımı yeniden inceleme konusu olur; düşünce kendisine yönelir."
      },
      {
        "prompt": "Tutarlılık ile olgusal doğruluk neden eş anlamlı değildir?",
        "answer": "Yargılar aynı koşulda birbiriyle çelişmeden savunulabilir, fakat öncülleri gerçek dünyada yine yanlış olabilir."
      },
      {
        "prompt": "Felsefenin evrensel sorular taşıması herkesin aynı cevabı vermesi midir?",
        "answer": "Hayır. Sorular başkalarının da gerekçeli tartışmasına açılır; tarihsel bağlam ve yanıt farklılıkları sürebilir."
      }
    ],
    "source": "Aurelia TYT Felsefe 001–006 kopya kâğıtları; MEBİ TYT-AYT Felsefe konu özetlerinin ilgili bölümleri ve OGM Felsefe video ders notları karşılaştırılarak hazırlanmış özgün anlatım ve uygulamalar. Kaynaklardaki kavram ve bilimsel yöntem genellemeleri koşullarıyla açıklanmıştır; sorular resmî sınav sorusu değildir.",
    "title": "Felsefeyi tanıma: sorudan gerekçeye"
  },
  {
    "id": "felsefe-ile-dusunme",
    "minutes": 95,
    "objectives": [
      "Kavramı, önermeyi ve argümanı tam konuşmada ayır.",
      "Öncüllerle sonucu metindeki yerlerinden bağımsız belirle.",
      "Tümdengelim, tümevarım ve analojinin dayanaklarını karşılaştır.",
      "Geçerlilik, öncül doğruluğu, sağlamlık ve tutarlılığı ayrı denetle."
    ],
    "sections": [
      {
        "title": "Bir konuşmanın dayanağını görünür yap",
        "paragraphs": [
          "“Bu yol kapalı, çünkü girişine geçiş engeli konmuş.” cümlesinde savunulan sonuç yolun kapalı olması, verilen dayanak girişteki engeldir. Sonuç önce söylense de bu rolü değişmez. Bir konuşmayı çözümlemeye başlarken önce neyin kabul ettirilmek istendiğini, sonra bunun hangi gerekçeyle desteklendiğini kendi sözlerinle açıkla.",
          "Aynı cümledeki her bilgi ayrı bir sonuç değildir. Bir örnek görüşü desteklemek için, bir itiraz da desteğin yeterli olmadığını göstermek için kullanılabilir. Öncül ve sonucu ayrı satırlara yazmak ilişkileri görünür kılar. Bu işlem sonunda yalnız kişinin ne düşündüğünü değil, o düşünceye hangi yoldan ulaştığını inceleyebilirsin."
        ]
      },
      {
        "title": "Kavram, terim ve görüş",
        "paragraphs": [
          "Bir kavram belirli bir nesne, özellik veya ilişkiye ilişkin genel düşünsel tasarımla; terim ise bu kavramı dilde ifade eden sözle ilişkilidir. Ağaç kavramı tek bir bahçe ağacına indirgenmez. Aynı kavram farklı dillerde farklı sözlerle, bir söz de farklı bağlamlarda farklı kavramlarla ilişkili olabilir.",
          "Görüş, kişinin bir olay veya sorun hakkında geliştirdiği anlayıştır. “Ortak çalışma taslakları iyileştirebilir.” bir görüştür. Bu görüşe nedenler ekleyerek onu tartışılabilir bir argüman içinde sunabiliriz. Görüşün bir kişiye ait olması, onun mutlaka yanlış veya doğru olduğunu göstermez; belirleyici olan hangi içeriği ve gerekçeleri taşıdığıdır."
        ]
      },
      {
        "title": "Önerme ve doğruluk değeri",
        "paragraphs": [
          "“Kapı kapalıdır.” bir duruma ilişkin yargı bildirir; doğru veya yanlış olabilir. “Kapıyı kapat!” bir emirdir, “Kapı kapalı mı?” ise bir sorudur. Bu son iki cümle aynı biçimde doğru veya yanlış yargı olarak değerlendirilmez. Dersin temel ayrımı, bir bildirimde bulunmakla bir eylem istemek veya bilgi sormak arasındadır.",
          "Bir yargının henüz doğru mu yanlış mı olduğunu bilmemek, onun önerme olmasını engellemez. Uzak bir şehirde o anda yağmur yağıp yağmadığını bilmeyebilirsin; uygun bağlamda “Orada yağmur yağıyor.” yine bir doğruluk değeri taşıyan yargıdır. Doğruluk değeri bulunması ile senin o değeri bilmen iki farklı meseledir."
        ]
      },
      {
        "title": "Bağlamı ve anlamı sabit tut",
        "paragraphs": [
          "“Burada hava soğuk.” yargısını değerlendirmek için burada sözünün hangi yeri ve ifadenin hangi zamanı gösterdiğini bilmek gerekir. Bir tartışmada kişiler aynı sözü farklı anlamlarda kullanıyorsa görünürde anlaşmış veya çelişmiş olabilirler. Açık bir argümanda temel kavramların ilgili kullanım boyunca hangi anlamı taşıdığı belli olmalıdır.",
          "Örneğin ağır sözcüğü bir cümlede kütleyi, diğerinde davranıştaki yavaşlığı anlatabilir. Bu iki kullanımın sonuçlarını doğrudan birbirine bağlamak anlam kaymasına yol açabilir. Tartışmaya başlamadan önce gerekli yer, zaman, grup ve kavram tanımlarını belirlemek yalnız dil bilgisi işi değildir; çıkarımın gerçekten aynı konu üzerinde yürümesini sağlar."
        ]
      },
      {
        "title": "Argüman öncül ve sonuç ilişkisidir",
        "paragraphs": [
          "Argüman, bir sonucu desteklemek amacıyla kullanılan öncüllerle o sonucun oluşturduğu ilişkili yapıdır. “Bütün katılımcılar taslak verdi. Ece katılımcı. Öyleyse Ece taslak verdi.” örneğinde ilk iki yargı öncül, üçüncü yargı sonuçtur. Yalnız son cümleye argüman demek yapının dayanak bölümünü görünmez kılar.",
          "Bir argümanın sunuluşu ikna edici olabilir ama dayanaklarının gerçekten yeterli olup olmadığı ayrıca denetlenir. Güçlü bir ses, güzel bir tasarım veya konuşmacının ünü bu ilişkinin yerini tutmaz. Önce argümanı kişinin söyleyişinden ayırıp açık yargılar hâlinde yaz; sonra öncüllerin sonuçla bağını ve öncüllerin doğruluğunu ayrı incele."
        ]
      },
      {
        "title": "Çünkü ve o hâlde işaretlerini izle",
        "paragraphs": [
          "Çünkü sözü çoğunlukla bir dayanağı, o hâlde ve dolayısıyla ise sonucu tanıtır. “Ece taslak verdi, çünkü atölyedeki her katılımcı taslak verdi ve Ece de katıldı.” cümlesinde sonuç baştadır. Bir metni yalnız son cümlesinden çözmek yerine bu destek ilişkisini hangi sözün kurduğunu izle.",
          "Bu işaretler faydalıdır ama zorunlu değildir. Bazı kısa metinlerde bağlaç kullanılmadan da öncül ve sonuç verilebilir. “Bütün defterler etiketli. Bu nesne bir defter. Bu da etiketli.” dizisini aynı ilişkiyle okuyabilirsin. Bir cümlenin rolü sadece yanındaki bağlaçtan değil, yazarın onunla hangi iddiayı desteklediğinden anlaşılır."
        ]
      },
      {
        "title": "Tümdengelimde zorunlu geçiş",
        "paragraphs": [
          "Geçerli bir tümdengelimde öncüller birlikte doğruyken sonucun yanlış olduğu bir durum bulunamaz. “Bütün A’lar B’dir. X bir A’dır. Öyleyse X bir B’dir.” bu yapıya örnektir. X’i A grubuna yerleştirip bütün grubun B içinde olduğunu kabul ettiğinde X’i B dışında tutamazsın.",
          "Temel örneklerde tümel bir yargıdan tekil sonuca geçilir; fakat tümdengelimin asıl ölçütü yalnız cümlelerin genel veya özel görünmesi değil, zorunlu sonuç ilişkisidir. Koşullu öncüllerle kurulan geçerli çıkarımlar da vardır. Önce sonucun öncüllerden zorunlu gelip gelmediğini araştır; çıkarım türünü yalnız kişi adı veya bütün sözcüğünü sayarak belirleme."
        ]
      },
      {
        "title": "Geçerlilik ile doğruluğu ayır",
        "paragraphs": [
          "Doğruluk, bir önermenin bildirdiği içeriğe ilişkin değerlendirmedir. Geçerlilik ise tümdengelimde öncüllerle sonucun biçimsel ilişkisine yönelir. “Bütün kuşlar uçar. Penguen kuştur. Öyleyse penguen uçar.” çıkarımı geçerli biçimde kurulmuştur; buna rağmen ilk öncül gerçekte yanlıştır. Geçerli biçim yanlış öncülü doğruya dönüştürmez.",
          "Sağlam bir tümdengelim için hem geçerli ilişki hem de doğru öncüller gerekir. Bir sonuç tesadüfen doğru olsa bile ona geçersiz bir yolla ulaşılmış olabilir. Bu nedenle iki ayrı kontrol yap: öncülleri doğru kabul etsem sonuç zorunlu mu, öncüller gerçekten doğru mu? Birini ötekinin yerine kullanmak, ikna edici görünen hataları fark etmeyi güçleştirir."
        ]
      },
      {
        "title": "Karşı model geçersizliği gösterir",
        "paragraphs": [
          "“Yağmur yağarsa zemin ıslanır. Zemin ıslaktır. Öyleyse yağmur yağmıştır.” dizisini düşün. Zemin fıskiye nedeniyle ıslanmış olabilir. Yağmur yokken fıskiye varsa ilk koşullu önerme ve ıslaklık bilgisi doğru kalabilir; sonuç ise yanlış olur. Böyle bir durum, çıkarımın verilen öncüllerden zorunlu olmadığını gösterir.",
          "Bu denetimde gerçek hayatta o gün fıskiyenin çalıştığını kanıtlaman gerekmez. Önermelerle bağdaşan olası bir karşı durum kurman yeterlidir. Karşı model hayalî olsa da verilen varsayımları ihlal etmemelidir. Yağmur varsa zemin kuru diye bir durum seçmek ilk öncülü bozacağı için geçersizliği göstermek amacıyla kullanılamaz."
        ]
      },
      {
        "title": "Bir gerekçeyi çürütmenin sınırı",
        "paragraphs": [
          "Bir savın belirli bir dayanağının yetersiz olduğunu göstermek, savın tersini otomatik kanıtlamaz. “Bu sokak ıslak, demek ki yağmur yağdı.” çıkarımını fıskiye olasılığıyla eleştirebilirsin. Bu eleştiri yağmurun kesinlikle yağmadığını söylemez; yalnız verilen gözlemin tek başına yağmuru zorunlu kılmadığını gösterir.",
          "Aynı ayrım bilimsel ve gündelik tartışmalarda da önemlidir. Bir ölçümün iki ayrı açıklamayla bağdaşması, açıklamalardan birinin tersini hemen doğrulamaz. İtirazın hedefini açık yaz: öncül yanlış mı, öncül-sonuç ilişkisi yetersiz mi, yoksa sonuçla çelişen ayrı bir kanıt mı var? Eleştirinin kapsamını korumak yeni bir gerekçesiz sonuca sıçramanı önler."
        ]
      },
      {
        "title": "Tümevarım örneklerden daha ötesine geçer",
        "paragraphs": [
          "Tümevarım, gözlenen örneklerden daha genel bir yargıya veya henüz gözlenmeyen bir olaya ilişkin sonuca geçebilir. Birkaç okulda bir yöntemin katılımı artırdığını gözlemek, başka okullarda da işe yarayabileceğini düşündürebilir. Sonuç öncüllerin ötesine geçtiği için yeni örneklerle değişebilir; genellikle olasılıklı destek taşır.",
          "Örneklerin sayısı kadar çeşitliliği ve temsil gücü de önemlidir. Aynı özellikteki üç okul bütün kentteki okulları temsil etmeyebilir. Kapalı bir kümedeki bütün dört kutuyu tek tek açıp aynı içeriği görmekle sınırsız kutular hakkında genelleme yapmak farklıdır. Tümünü incelediğin sonlu grubun dışına çıkıp çıkmadığını sonucun kapsamından kontrol et."
        ]
      },
      {
        "title": "Analoji ilgili benzerlik ister",
        "paragraphs": [
          "Analoji, iki durumun ortak özelliklerinden hareketle birinde bulunan başka bir özelliğin ötekinde de bulunabileceğini düşünmektir. Benzerlik yeni sonuçla ilgiliyse destek daha güçlü olur. İki ürünün etiketinin aynı renkte olması, içeriklerinin aynı olduğunu göstermeye yetmez; renk içerik bakımından ilgisiz olabilir.",
          "Buna karşılık aynı malzeme ve üretim süreci bilgisi, bazı özelliklerin benzerliği için daha ilgili dayanak sağlayabilir; yine de her sonucu kesinleştirmez. Analoji sorusunda ortak özellikleri ve aktarılan yeni özelliği ayrı yaz. Ardından ortak özelliklerin bu yeni sonuçla nasıl ilişkili olduğunu açıkla. Sadece ikisi de benziyor demek gerekçeyi eksik bırakır."
        ]
      },
      {
        "title": "Karşı örnek ve niceliğin kapsamı",
        "paragraphs": [
          "“Bütün kuşlar uçar.” yargısına kuş olduğu ve uçmadığı açık olan tek bir örnek yeterli karşı örnek olabilir. Çünkü bütün sözü istisna bırakmaz. Ancak “Bazı kuşlar uçar.” yargısını tek bir uçamayan kuşla çürütemezsin; bu yargı en az bir uçan kuşun varlığını söyler. İddianın niceliği karşı örneğin görevini belirler.",
          "Karşı örnek aynı sınıfa ve aynı ölçüte ait olmalıdır. Uçamayan bir balık bütün kuşlara ilişkin yargıyı sınamaz; örnek kuş değildir. Bir durumu farklı anlamda uçmak sözüyle anlatmak da konu değişikliğine yol açabilir. Evrensel iddiada istisnayı ararken kapsamı sabit tut, ardından iddiayı daha dar veya koşullu biçimde yeniden kurmayı dene."
        ]
      },
      {
        "title": "Tutarlılık ve temel akıl ilkeleri",
        "paragraphs": [
          "Klasik mantıktaki özdeşlik ilkesi bir şeyin aynı bağlamda kendisi olarak ele alınmasını, çelişmezlik aynı önermenin aynı anlam ve koşulda hem doğru hem yanlış kabul edilmemesini vurgular. Üçüncü hâlin imkânsızlığı, klasik iki değerli çerçevede bir önerme ile onun değillemesi arasında üçüncü doğruluk durumu bulunmadığını söyler.",
          "Bu ilkeleri bir nesnenin hiçbir zaman değişemeyeceği veya herkesin iki görüşten yalnız birini seçmek zorunda olduğu iddiasına dönüştürme. “Sabah kapalı, öğleden sonra açık” farklı zamanlar yüzünden çelişki olmayabilir. Bir tartışmada iki seçenek dışında gerçek bir üçüncü seçenek varsa onu yok saymak da mantık ilkesi değildir; önce önermelerin tam yapısını belirlemek gerekir."
        ]
      },
      {
        "title": "Gerçeklik, doğruluk ve temellendirme",
        "paragraphs": [
          "Bir ağaç nesne olarak vardır; “Bu ağaç bir çamdır.” sözü ise ağaç hakkında bir yargıdır. Yargı yanlışsa bu durum ağacı yok etmez. Gerçeklik ile bu gerçeklik üzerine kurulan sözün doğruluğu bu temel örnekte ayrılır. Bir nesneyi doğru sözcüğüyle, bir önermeyi de yalnız var sözcüğüyle değerlendirmek aynı soru değildir.",
          "Temellendirme, bir görüşün hangi dayanaklarla savunulduğunu açığa koymaktır. Felsefi bir sav akla dayalı gerekçeler, kavramsal ayrımlar ve karşı örneklerle tartışılabilir. Gerekçenin var olması onun mutlaka yeterli olduğunu göstermez. Temellendirmeyi incelediğinde hem düşünce içindeki ilişkileri hem de gereken yerde öncüllerin olgusal desteğini kontrol et."
        ]
      },
      {
        "title": "Tam bir argümanı yeniden kur",
        "paragraphs": [
          "Bir metni çözerken önce temel sorunu ve görüşü bul. Sonra sonucu destekleyen yargıları ayır; kullanılan kavramların anlamını sabit tut. Çıkarım tümdengelimse karşı model arayarak geçerliliği, tümevarımsa örneklem ile genellemenin kapsamını, analojiyse benzerliğin sonuçla ilgisini denetle. Her adım farklı bir ilişkiyi görünür kılar.",
          "Son aşamada itirazın hangi öncülü hedeflediğini ve görüşü nasıl daha iyi kurabileceğini açıkla. “Bu görüş yanlış.” demek yerine “Bu örnekler bu kadar geniş sonucu desteklemiyor; şu koşulla daraltılabilir.” diyebilirsin. Bu ünitenin hazır örnekleri bu işlemleri birlikte gösterir. Bağımsız sorularda aynı yöntemi yeni tam bağlamlara taşıman hedeflenir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Doğru sonucu yanlış gerekçeden ayır",
        "prompt": "Bir bahçede yağmur varsa zemin ıslaktır. Zemin ıslaktır. O hâlde yağmur yağmıştır. Ayrıca fıskiyenin de zemini ıslatabildiği bilinmektedir. Çıkarımı denetle.",
        "strategy": "Öncüllerin doğru, sonucun yanlış olabildiği tek durum aramak yeterlidir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Birinci öncül yağmuru ıslaklık için yeterli koşul sayar; ıslaklığın yalnız yağmurdan olacağını söylemez."
          },
          {
            "label": "2. adım",
            "explanation": "Yağmur yokken fıskiye çalışırsa zemin ıslaktır. Yağmur varsa ıslaktır öncülü de bu durumda yanlış olmaz."
          },
          {
            "label": "3. adım",
            "explanation": "Öncüller doğruyken yağmur sonucu yanlış olabildiğinden çıkarım geçersizdir. Bazı gerçek olayda yağmur yağmış olması biçimi geçerli yapmaz."
          }
        ],
        "answer": "Islaklıktan tek başına yağmur zorunlu olarak çıkarılamaz.",
        "check": "Karşı modelde yağmur yok, fıskiye var, zemin ıslaktır; öncüller korunur.",
        "pitfall": "Sonucun gerçek dünyada doğru çıkmasıyla çıkarımın zorunluluğunu aynı sanma."
      },
      {
        "title": "Öncül ile sonucu yerinden bağımsız bul",
        "prompt": "“Bu örneği kapalı kutuda tutmalıyız; çünkü ışığa duyarlı bütün örnekler karanlıkta saklanmalı ve bu örnek de ışığa duyarlıdır.” ifadesindeki argümanı düzenle. Kapalı kutunun ışık geçirmediği ve karanlık koşulu sağladığı verilmiştir.",
        "strategy": "Çünkü sözcüğünün bağladığı dayanağı bul; ilk cümleyi otomatik öncül sayma.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Genel öncül: ışığa duyarlı bütün örnekler karanlıkta saklanmalıdır. İkinci öncül: bu örnek ışığa duyarlıdır."
          },
          {
            "label": "2. adım",
            "explanation": "Sonuç: bu örneği karanlık koşul sağlayan kapalı kutuda tutmalıyız. Sonuç günlük ifadede önce söylenmiştir."
          },
          {
            "label": "3. adım",
            "explanation": "Sonucun öncüllerden çıkışını, kutunun gerçekten karanlık koşulu sağladığı verilen bağlam altında değerlendiririz. Öncülün doğru olup olmadığını araştırmak ayrı bir iştir."
          }
        ],
        "answer": "Sonuç başta; gerekçeyi oluşturan genel kural ve tekil durum sonra verilmiştir.",
        "check": "Sonuç ile gerekçe sırası tersine yazılsa da dayanak ilişkisi değişmez.",
        "pitfall": "Metindeki ilk yargıyı her durumda öncül kabul etme."
      },
      {
        "title": "Tümevarımın kapsamını kur",
        "prompt": "Bir araştırmacı farklı mahallelerden seçtiği yüz ağacın yaprak döktüğünü gözledi. “Bu türün bütün ağaçları aynı mevsimde yaprak döker.” sonucunu önerdi. Bu geçişi nasıl okumalı?",
        "strategy": "Gözlenen örnekler ile sonucun kapsadığı kümenin büyüklüğünü karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Gözlem yüz ağaçla sınırlı; sonuç ise türün bütün üyelerini kapsıyor. Sonuç gözlemlerden daha geniştir."
          },
          {
            "label": "2. adım",
            "explanation": "Bu, tümevarımsal bir genellemedir. Çeşitli ve temsil gücü yüksek örnekler desteği artırabilir; ancak açık evrendeki her durum tek tek sayılmış değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Mevsim, iklim ve tür tanımının aynı tutulması gerekir. Sonucun desteklenmesiyle mantıksal kesinliği aynı iddia olarak yazmayız."
          }
        ],
        "answer": "Örneklerden daha geniş bir gruba geçilen, kanıt gücü örneklemin niteliğine bağlı bir genellemedir.",
        "check": "Yüz sayısı tek başına bütün olası ağaç ve koşulların kapsandığını göstermez.",
        "pitfall": "Tümevarımın kesin olmamasını hiçbir bilgi sağlamaması diye yorumlama."
      },
      {
        "title": "Analojiye ilgili benzerlik ara",
        "prompt": "İki telefon aynı renktedir. Birincisinin pili iki gün dayandığı için ikincisinin de iki gün dayanacağı ileri sürülüyor. Her iki telefonun pil kapasitesi, işlemcisi ve kullanımı bilinmiyor. Gerekçeyi değerlendir.",
        "strategy": "Sonuçla ilgili özelliklerin gerçekten karşılaştırılıp karşılaştırılmadığını denetle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Benzerlik yalnız renktir. Sonuç ise pil kullanım süresine ilişkindir."
          },
          {
            "label": "2. adım",
            "explanation": "Rengin pil ömrünü belirlediği veya onunla güvenilir bağ taşıdığı gösterilmemiştir; ilgili teknik koşullar bilinmiyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu nedenle analoji zayıftır. Bu itiraz ikinci pilin kesin kısa dayanacağını söylemez; verilen gerekçenin sonucu desteklemediğini gösterir."
          }
        ],
        "answer": "Renk benzerliği, verilen koşullarda pil süresi için yeterli ilgili dayanak değildir.",
        "check": "Sonucun kesin yanlışlığını değil bu dayanağın yetersizliğini saptadık.",
        "pitfall": "Her benzerliği aynı derecede güçlü analojik gerekçe sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Bir argümanın sonucu her zaman son cümle midir?",
        "answer": "Hayır. Sonuç önce de söylenebilir; hangi yargının diğerleriyle desteklendiğini bulmalıyız."
      },
      {
        "prompt": "Geçersizliği bir karşı modelle nasıl gösterirsin?",
        "answer": "Öncüllerin hepsinin doğru, sonucun yanlış olduğu bir mümkün durum kurarım. Sonucun bazı olayda doğru olması biçimi kurtarmaz."
      },
      {
        "prompt": "Zayıf bir analojinin eleştirisi sonucunun kesin yanlışlığı mıdır?",
        "answer": "Hayır. Benzerliğin sonuçla ilgili bir dayanak sağlamadığını göstermek, sonucun tersini kanıtlamak değildir."
      },
      {
        "prompt": "Tümevarımın desteğini yalnız örnek sayısı mı belirler?",
        "answer": "Hayır. Örneklerin çeşitliliği, seçimi, temsil gücü ve koşulların kapsamla uyuşması da önemlidir."
      }
    ],
    "source": "Aurelia TYT Felsefe 001–006 kopya kâğıtları; MEBİ TYT-AYT Felsefe konu özetlerinin ilgili bölümleri ve OGM Felsefe video ders notları karşılaştırılarak hazırlanmış özgün anlatım ve uygulamalar. Kaynaklardaki kavram ve bilimsel yöntem genellemeleri koşullarıyla açıklanmıştır; sorular resmî sınav sorusu değildir.",
    "title": "Felsefe ile düşünme: öncül, sonuç ve karşı örnek"
  },
  {
    "id": "varlik-felsefesi",
    "minutes": 105,
    "objectives": [
      "Varlığın imkânını, niceliğini ve niteliğini ayrı sorularla incele.",
      "Tek temel, iki temel ve çok temel görüşlerini nesne sayısıyla karıştırma.",
      "Oluş, idea, madde, madde-zihin ve çağdaş yaklaşımları tam görüşlerle karşılaştır.",
      "Varlık sorusunu bilginin gerekçesi sorusundan ayır."
    ],
    "sections": [
      {
        "title": "Varlık sorusunu gündelik nesneden aç",
        "paragraphs": [
          "Bir ağacı gördüğünde türünü, boyunu veya yaşını sorabilirsin. Varlık felsefesi ise daha temel sorulara yönelir: bu nesnenin var olması ne demektir, zihnimden bağımsız bir gerçeklik var mıdır, var olanların temel yapısı nedir? Aynı ağaç farklı soruların konusu olabilir; alanı nesnenin adı değil sorunun yönü belirler.",
          "Ontoloji, varlık felsefesinin diğer adıdır. Tek tek var olanları saymakla sınırlı kalmaz; onları var olan olarak ele almanın ilkelerini araştırır. Bir sayının, bir bedenin ve bir düşüncenin aynı biçimde var olup olmadığı sorusu buna örnektir. Başlangıçta neyin araştırıldığını açıklaştırmak, sonraki görüş ayrımlarını yalnız filozof adı ezberi olmaktan çıkarır."
        ]
      },
      {
        "title": "Nesne ile onun hakkındaki yargıyı ayır",
        "paragraphs": [
          "Bahçedeki ağacı çam sanıp sonra sedir olduğunu öğrenebilirsin. Yanlış olan ilk tür yargındır; ağacın varlığı bu yanlışla ortadan kalkmış olmaz. Bir nesneye ilişkin yargının doğru olup olmadığı ile o nesnenin var olup olmadığı farklı sorulardır. Bu ayrım varlık ve bilgi tartışmalarının nerede kesişip nerede ayrıldığını gösterir.",
          "“Zihnimden bağımsız bir ağaç var mı?” sorusu ontolojik bir odağa sahiptir. “Ağacın türünü hangi kanıtla biliyorum?” sorusu ise bilme yolunu araştırır. Bir metinde ikisi birlikte bulunabilir; sorunun hangi ilişkiyi istediğini belirlemek gerekir. Bir görüşü sınıflandırırken nesne, yargı ve yargının dayanağını ayrı satırlarda tutmak yararlıdır."
        ]
      },
      {
        "title": "Bilim ile felsefe varlığa nasıl yaklaşır?",
        "paragraphs": [
          "Biyoloji ağacın canlı yapısını, kimya belirli maddelerini, fizik bazı süreçlerini inceleyebilir. Bilim dalları araştırma sorularına göre varlığın belirli yönlerini seçer. Ontolojik soru ise varlığın ne olduğu ve bu açıklamaların hangi temel kabullere dayandığı gibi daha genel bir çerçeve açar. Bu yaklaşım farkı iki alanın birbirinden hiçbir şey öğrenmediği anlamına gelmez.",
          "Bilimsel sonuçlar felsefi tartışmaları etkileyebilir; felsefe de bilimlerin kullandığı madde, neden veya nesne gibi kavramları inceleyebilir. “Bilim varlıkla hiç ilgilenmez.” demek yanlış olur. Fark, var olan bir nesneyi belirli yöntemle açıklamak ile var olmanın ve temel gerçekliğin anlamını sorgulamak arasındadır; hangi işlem yapıldığını tam örnekten izle."
        ]
      },
      {
        "title": "Ontoloji ve metafizik",
        "paragraphs": [
          "Metafizik, varlığın en temel yapısı ve ilkeleri gibi geniş soruları ele alır; ruh, Tanrı, neden, zaman veya zorunluluk gibi konular bu alanda tartışılabilir. Ontoloji ise neyin var olduğunu ve var olanların türlerini, yapısını, ilişkilerini araştırır. İki alan tarih boyunca iç içe kullanılmıştır; aralarında her düşünürde aynı katı sınır bulunduğunu varsayma.",
          "Metafizik sözcüğünü günlük dildeki gizemli veya akıl dışı sözleriyle eşitlemek doğru değildir. Bir görüş deneyle doğrudan sınanamasa da kavram ve argümanları bakımından tartışılabilir. Aynı şekilde ontolojiyi yalnız elle tutulan nesnelerin listesi sayma; sayılar ve zihinsel durumların varlık statüsü de ontolojik soru olabilir. Görüşün hangi temel problemi açtığını belirle."
        ]
      },
      {
        "title": "Varlığın imkânı ile bilgisi farklıdır",
        "paragraphs": [
          "“Gerçekten bir şey var mı?” varlığın imkânına, “Var olanı bilebilir miyiz?” bilginin imkânına yönelir. Gorgias’a atfedilen hiçbir şeyin var olmadığı, olsa da bilinemeyeceği, bilinse de aktarılamayacağı biçimindeki üç sav bu farklı aşamaları görünür kılar. Üçünü aynı tek soruya indirgemek, tartışmadaki kapsamı kaybettirir.",
          "Hiççilik veya nihilizm farklı alanlarda varlığı, bilgiyi ya da değerleri reddeden görüşler için kullanılabilir; hangi reddin savunulduğu açık okunmalıdır. Görünüşlerin nihai gerçek olmadığını söylemek de her şeyin hiçliğini ileri sürmekle aynı değildir. Taocu düşüncede Tao’nun temel kabul edilmesi, aldatıcı görünüş eleştirisiyle mutlak yokluk iddiasını ayırmanın önemini gösterir."
        ]
      },
      {
        "title": "Gerçekçilik ve varlık türleri",
        "paragraphs": [
          "Gerçekçilik genel anlamda zihnimizden bağımsız bir gerçeklik bulunduğunu savunan yaklaşımlarla ilişkilidir. Ancak hangi varlıkların bu bağımsızlığa sahip olduğu konusunda görüşler ayrılabilir. Duyulur nesneleri gerçek kabul etmekle sayılar veya tümellerin de bağımsız gerçekliğini kabul etmek aynı ayrıntılı görüş değildir.",
          "Giriş sınıflamasında reel varlıklar zaman ve mekânda karşılaşılan nesnelerle, ideal varlıklar düşünsel olarak kavranan nesnelerle örneklenir. Bu pratik ayrım, bütün düşünürlerin ideal varlığın yalnız insan zihnine bağlı olduğunu savunduğu anlamına gelmez. Platon’un ideaları buna önemli bir karşı örnektir; hangi çerçevede sınıflama yaptığını ve hangi düşünürün savını okuduğunu belirt."
        ]
      },
      {
        "title": "Nicelik sorusu: kaç temel ilke?",
        "paragraphs": [
          "Monizm varlığı tek temel ilke veya türle açıklayan yaklaşımdır. Bu, dünyada yalnız tek sıradan nesne bulunduğu demek değildir. Thales’in çeşitli varlıkların temelini suyla açıklaması örneğinde birçok görünür nesne tek dayanakla ilişkilendirilir. Sorulan sayı ağaçların veya taşların değil, açıklamadaki bağımsız temellerin sayısıdır.",
          "Düalizm iki temel türü, plüralizm ise ikiden fazla temel unsuru kabul eder. Empedokles’in su, toprak, hava ve ateşi birlikte temel alması çokçuluğa örnektir. Bir metnin iki örnek vermesi onu düalist yapmaz; bu örneklerin birbirine indirgenemez iki temel tür sayılması gerekir. Modelde düğüm sayısını değil hangi düğümün bağımsız temel kabul edildiğini izle."
        ]
      },
      {
        "title": "Nitelik sorusu: temel olan nedir?",
        "paragraphs": [
          "Varlığın niceliği kaç temel ilke olduğunu, niteliği ise bu temelin ne tür olduğunu sorar. Tekçi bir görüş maddi olanı temel alabilir; başka bir tekçi görüş düşünsel olanı temel alabilir. Bu nedenle monizm sözcüğü tek başına materyalizm demek değildir. Nicelik ve nitelik iki ayrı sınıflama ekseni olarak birlikte kullanılabilir.",
          "Bir pasajda önce hangi unsurun açıklamanın sonunda temel kaldığını bul. Zihinsel olaylar yalnız maddi süreçlerin görünümü olarak açıklanıyorsa bir indirgeme ilişkisi kurulmuştur. Zihin ve beden ayrı, birbirine indirgenemez türler olarak sunuluyorsa başka bir yapı vardır. Yalnız madde veya zihin kelimesinin geçmesine değil, kabul edilen ilişkiye dayanarak karar ver."
        ]
      },
      {
        "title": "Oluş ve kalıcılık problemi",
        "paragraphs": [
          "Bir nehrin suyu değişirken ona aynı nehir demeyi sürdürebiliriz. Burada değişimin ve kimliğin nasıl birlikte düşünülebileceği sorusu açılır. Oluşu öne çıkaran yaklaşımlarda gerçeklik yalnız durağan parçalar değil, süreçler ve ilişkiler olarak anlaşılır. Herakleitos’ta sürekli değişim, karşıtların ilişkisi ve bu değişimin düzeni önemli kavramlardır.",
          "Ateş ve logos gibi kavramlar onun açıklamasında belirli felsefi roller taşır; bunları günümüz deneysel fiziğinin doğrulanmış formülleri gibi okumak doğru değildir. Whitehead de varlığı süreç, yenilenme, süreklilik ve yaratıcılık yönleriyle ele alır. Ortak oluş vurgusu bu düşünürlerin bütün görüşlerinin aynı olduğu anlamına gelmez; metnin hangi ilişkiyi savunduğunu açıkla."
        ]
      },
      {
        "title": "Platon: idealar ve duyulur nesneler",
        "paragraphs": [
          "Platon’un yaklaşımında duyularla karşılaşılan nesneler değişir; idealar ise değişmez ve akılla kavranan asıl gerçeklikle ilişkilidir. Birçok güzel nesne düşünülebilir, fakat güzelliğin ne olduğunu açıklamak yalnız bu nesnelerden birini göstermekle bitmez. İdea, o an kişinin aklına gelen geçici bir fikir anlamında kullanılmaz.",
          "Duyulur nesne ile idea arasındaki ayrımı temel ve ona bağlı görünüm ilişkisi olarak oku. Platon’da ideaların gerçekliği yalnız tek kişinin düşünmesine bağlı sayılmaz. Dolayısıyla zihinde tasarlanan herhangi bir hayali nesneyle ideayı aynı şey kabul etmek yanıltıcıdır. Pasaj hangi varlığı değişmez temel olarak gösteriyor ve onu hangi yolla kavrıyor sorularını birlikte cevapla."
        ]
      },
      {
        "title": "Aristoteles: madde, form ve nedenler",
        "paragraphs": [
          "Aristoteles, formu duyulur varlığın dışında ayrı bir örnekler dünyası gibi değil, varlığın içinde onu belirleyen ilke olarak ele alır. Bir heykeli düşünürken yapıldığı madde ile belirli biçimde heykel olmasını sağlayan form ayrılabilir. Madde ve formun birlikte açıklanması, onun yaklaşımını Platon’un ayrı idealar görüşüyle özdeş saymamayı gerektirir.",
          "Dört neden açıklaması bir şeyin neyden yapıldığını, hangi biçimi taşıdığını, onu neyin meydana getirdiğini ve hangi amaçla var olduğunu farklı sorularla inceler. Heykelde malzeme maddi, biçim formel, yapan kişi fail ve amaç ereksel neden için örnek olabilir. Neden sözcüğü burada yalnız önce gelen fiziksel olay demek değildir; açıklamanın farklı yönleri ayrılır."
        ]
      },
      {
        "title": "Fârâbî ve Hegel: farklı düşünsel temeller",
        "paragraphs": [
          "Fârâbî’nin varlık anlayışında zorunlu varlık kendi varlığını başka bir varlığa borçlu değildir; mümkün varlıklar ise var olmak için başka bir dayanağa ihtiyaç duyar. Bu ayrım sıradan güçlü ve güçsüz nesneler sıralaması değildir. Varlığın zorunluluğu ve bağımlılığı hakkında metafizik bir açıklama kurulmaktadır.",
          "Hegel’de varlık mutlak akıl veya tin kavramıyla, gelişme ve diyalektik ilişki içinde ele alınır. Onun sistemindeki değişim, sırf iki kişinin tartışıp ortada anlaşması demek değildir. Bu düşünürler farklı çerçeveler kurar; ortak düşünsel temel vurgusu ayrıntılarını silmez. Verilen pasajda bağımsız temel, gelişme ve bağımlılık ilişkilerinin ne olduğunu kendi sözlerinle açıkla."
        ]
      },
      {
        "title": "Materyalist açıklamaların ortak ve farklı yanları",
        "paragraphs": [
          "Materyalizm maddi gerçekliği temel alan yaklaşımlarla ilişkilidir. Demokritos varlığı atomlar ve onların birleşme-ayrılma hareketleriyle, Hobbes cisim ve hareketle açıklamaya yönelir. Bu açıklamalarda doğaüstü veya bağımsız düşünsel bir ilke yerine maddi yapı öne çıkar; ortak yön bu temeldedir.",
          "Bütün materyalist görüşler maddenin aynı biçimde durağan veya mekanik olduğunu savunmaz. Marx’ın diyalektik materyalizminde maddi gerçeklik değişim ve karşıtlık ilişkileriyle ele alınır. Bir zihinsel olayın bedensel koşullardan etkilenmesi ise tek başına bütün varlığın yalnız maddeye indirgenmiş olduğunu göstermez. Sınıflama için pasajın temel kabulünü ve kapsamını açık bulmalısın."
        ]
      },
      {
        "title": "Descartes: madde ve zihnin ayrımı",
        "paragraphs": [
          "Descartes’ın yaratılmış varlık alanına ilişkin düalizminde madde ile zihin birbirine indirgenemez iki tür olarak ele alınır. Maddenin belirgin niteliği yer kaplama, zihnin niteliği düşünmedir. İki türün birlikte anılması yalnız iki örnek saymak değildir; her birinin farklı temel özelliğe sahip olduğu savunulur.",
          "Bu temel ayrımı onun bütün metafizik sistemini yalnız iki sıradan nesneye indirgemeden oku; Tanrı anlayışı ayrı bir düzlemde yer alır. “Bedenimde olan her şey zihnimi etkiler.” demekle “Zihin ile beden iki ayrı tözdür.” demek aynı ontolojik iddia değildir. İlk söz bir etkileşim bildirir; ikincisi varlığın temel türleri hakkında bir ayrım kurar."
        ]
      },
      {
        "title": "Fenomenoloji ve yeni ontoloji",
        "paragraphs": [
          "Husserl’in fenomenolojisi, deneyimde bilince nasıl göründüklerini inceleyerek şeylerin özünü araştıran bir yöntemle ilişkilidir. Ön yargı ve alışılmış kabulleri paranteze almak, bu incelemenin yöntemlerinden biridir. Bu tutum dış dünyayı kesin olarak yok ilan etmek veya istenen hayali nesneyi gerçek yapmak demek değildir.",
          "Hartmann’ın yeni ontolojisinde varlığın farklı tabakaları incelenir: inorganik, organik, ruhsal ve tinsel düzeyler. Bu sınıflama insanın kültürel ürünlerini de varlık araştırmasına katma çabasıdır. Tabakalar bir değer yarışı veya her alanda aynı basit nedensellik zinciri gibi okunmamalıdır. Bir düzeyin özelliklerini öteki düzeye indirgemeden ilişkilerini incelemek burada önem taşır."
        ]
      },
      {
        "title": "Pragmatik ve varoluşçu yaklaşımları ayır",
        "paragraphs": [
          "Pragmatik yaklaşımlar düşüncelerin ve açıklamaların deneyimdeki işleyişini, sorun çözme ve sonuç üretme yönünü öne çıkarabilir. Bu vurgu tek bir kişinin anlık çıkarının bütün gerçekliği yarattığı iddiasına indirgenemez. Pragmatizmin bilgi, doğruluk ve varlık üzerine farklı tartışmaları bulunduğunu, hangi sorunun ele alındığını belirleyerek okumak gerekir.",
          "Sartre’ın varoluşçu çerçevesinde insanın önce var olup sonra seçimleri ve eylemleriyle kendisini belirlemesi öne çıkar; varoluş özden önce gelir ifadesi bu odağı taşır. Bu görüşü bir taşın biçiminin nasıl oluştuğunu anlatan doğa açıklamasıyla eşitleme. İnsanın hazır bir öz tarafından bütünüyle tanımlanması ile kendini eylemleriyle kurması arasındaki fark tartışılmaktadır."
        ]
      },
      {
        "title": "Evrende amaç ve düzen sorusu",
        "paragraphs": [
          "Bir süreçte düzen bulunmasıyla o sürecin bir amaç için gerçekleştiğini savunmak aynı iddia değildir. Saatin parçaları arasındaki ilişkiyi açıklamak, doğadaki bütün süreçlerin bilinçli bir amaç taşıdığını tek başına kanıtlamaz. Amaçlılık sorusu, varoluşun ve değişimin bir ereğe yönelik olup olmadığını araştırır.",
          "Aristoteles’te ereksel açıklama, Hegel’de tinin gelişimi veya materyalist bir pasajda mekanik nedenler farklı yanıt örnekleri olabilir. Uygulama bu metafizik görüşlerden birini deneyle kesin kanıtlanmış gerçek diye sunmaz. Öğrenci hangi görüşün amaç, neden veya zorunluluk ilişkisini nasıl kurduğunu verilen metinden belirler; düzen sözcüğüne bakarak otomatik hüküm vermez."
        ]
      },
      {
        "title": "Bir kimlik örneğine görüşleri uygula",
        "paragraphs": [
          "Bir geminin tahtaları yıllar içinde değiştiğinde hâlâ aynı gemi olup olmadığını sorabiliriz. Cevap, maddi parçaların aynılığını mı, işlevi mi, biçimi mi, tarihsel sürekliliği mi kimlik ölçütü aldığımıza göre değişebilir. Bu örnek değişim ve kalıcılığın soyut bir başlık değil, farklı ölçütler gerektiren bir problem olduğunu gösterir.",
          "Önce soruyu ve kabul edilen ölçütü açık yaz; sonra parça değişiminin o ölçüt bakımından ne sonuç verdiğini incele. Farklı bir ölçüt seçtiğinde başka sonuca ulaşmak otomatik tutarsızlık değildir; gerekçen değişmiştir. Bu ünitedeki modeller sınırlı ve açık görüşleri karşılaştırır. Amaç bütün metafizik sorunları kapatmak değil, bir varlık savını kavram ve gerekçeleriyle anlayabilmektir."
        ]
      },
      {
        "title": "Amaç, zorunluluk ve yaratıcı oluşu karşılaştır",
        "paragraphs": [
          "Spinoza evreni zorunlu nedensel düzen içinde düşünür; doğaya insanın amaçlarını veya kişisel beklentilerini yansıtmayı eleştirir. Bu yaklaşımda düzen bulunması, doğanın insan için tasarlanmış hedeflerle işlediğini otomatik göstermez. Schopenhauer ise varlığı kör istenç ve bitmeyen yönelim üzerinden yorumlar; bu istenç insan aklının planladığı bilinçli bir amaçla eş anlamlı değildir.",
          "Bergson’da yaratıcı atılım ve oluş, yaşamın önceden tamamlanmış bir programın yalnız mekanik açılması gibi görülmesine karşı bir odak sağlar. Bu üç görüşü amaç var veya yok tablosunda gerekçelerini silerek ezberleme. Spinoza’nın zorunlu düzenini, Schopenhauer’in akılcı plan sayılmayan istencini ve Bergson’un yaratıcı yeniliğini ayrı sorularla aç. Aristoteles’in erek vurgusuyla karşılaştırırken de aynı amaç sözcüğünün her sistemde aynı rolü taşımadığını koru."
        ]
      }
    ],
    "examples": [
      {
        "title": "Nesne sayısı ile temel ilke sayısını ayır",
        "prompt": "Bir düşünür taşın, ağacın ve insan bedeninin aynı maddi temelden açıklanabileceğini savunuyor. Örnekte üç tür nesne geçmesi görüşü üççü yapar mı?",
        "strategy": "Kaç nesne anıldığını değil kaç indirgenemez temel kabul edildiğini say.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Taş, ağaç ve beden açıklanacak varlıklardır; düşünür bunların üçünü aynı maddi temele bağlıyor."
          },
          {
            "label": "2. adım",
            "explanation": "Bu çerçevede tek temel kabul edildiği için nicelik bakımından monist bir yaklaşım vardır. Nesne çeşitliliği ilke çoğulluğu değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Temelin madde olarak belirlenmesi nitelik sorusuna cevap verir; bu yönüyle materyalist açıklamadır. Nicelik ve nitelik eksenlerini ayrı yazabiliriz."
          }
        ],
        "answer": "Görüş, nicelik bakımından monist; temelinin niteliği bakımından materyalisttir.",
        "check": "Üç nesne tek temele indirgeniyor; üç bağımsız ilke kabul edilmiyor.",
        "pitfall": "Monizmi yalnız bir nesnenin var olduğunu savunmak diye tanımlama."
      },
      {
        "title": "Madde ve formu aynı nesnede göster",
        "prompt": "Bir heykel bronzdan yapılmış, belirli insan biçimi verilmiş, bir heykeltıraşça hazırlanmış ve bir kişiyi anmak için dikilmiş. Aristoteles’in neden ayrımlarını örneğe uygula.",
        "strategy": "Neden sözcüğünü yalnız önce gerçekleşen olay anlamına sıkıştırma.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Bronz, heykelin maddi nedenidir; verilen insan biçimi formel nedeni gösterir. Aynı madde farklı biçim alabilirdi."
          },
          {
            "label": "2. adım",
            "explanation": "Heykeltıraşın yapma etkinliği fail nedenle; anma amacı ereksel nedenle ilişkilidir. Bunlar aynı soruya verilmiş dört eş anlamlı cevap değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Bu dört bakış nesnenin neyle, hangi biçimde, hangi etkinlikle ve ne için oluştuğunu ayırır. Her örnekte amaç verilmiyorsa kendimiz icat etmeyiz."
          }
        ],
        "answer": "Bronz madde; insan biçimi form; yapma etkinliği fail; anma amacı ereksel nedendir.",
        "check": "Verilen dört bilgi dört farklı açıklama sorusuna karşılık gelir.",
        "pitfall": "Formu yalnız dış görünüşün önemsiz süsü veya amacı fiziksel madde sanma."
      },
      {
        "title": "Aynı kalan gemi sorusunun ölçütünü aç",
        "prompt": "Bir geminin bütün tahtaları yıllar içinde değiştirilmiş, fakat kullanımı ve kaydı kesintisiz sürmüş. Bir görüş aynı maddi parçaları, başka görüş kesintisiz işleyiş ve örgütlenmeyi kimlik için esas alıyor. Niçin farklı sonuca varabilirler?",
        "strategy": "Ölçüt değiştiğinde hangi olgunun belirleyici olduğunu göster.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Maddi parça ölçütü eski tahtaların kalıp kalmadığını sorar; örnekte bütün parçalar değişmiştir."
          },
          {
            "label": "2. adım",
            "explanation": "Süreklilik ölçütü kullanım ve örgütlenme bağının kopup kopmadığını sorar; örnekte bu bağın sürdüğü verilmiştir."
          },
          {
            "label": "3. adım",
            "explanation": "Farklı sonuç, olayların farklı aktarılmasından değil kimliğin hangi koşula bağlandığından doğabilir. Örnek tek bir kimlik kuramını bütün durumlar için kanıtlamaz."
          }
        ],
        "answer": "Kimlik için seçilen ölçütler farklı olduğundan aynı olgular farklı yorumlanabilir.",
        "check": "Parça değişimi ile işleyişin sürekliliği aynı özellik değildir.",
        "pitfall": "Bu sınırlı örneğin bütün varlık sorunlarını kesin çözdüğünü ileri sürme."
      },
      {
        "title": "Fenomenolojinin odağını belirle",
        "prompt": "Bir araştırmacı ağacın gerçekten zihinden bağımsız var olup olmadığını geçici olarak paranteze alıp, ağacın bilinçte nasıl göründüğünü betimlemeyi seçiyor. Burada ne araştırılıyor?",
        "strategy": "Varlığı inkâr etmek ile bir soruyu yöntemde askıya almak arasındaki farkı koru.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Araştırmacı bu aşamada dış dünyayı yok saydığını söylemiyor; varoluşa ilişkin hükmü çalışma boyunca askıya alıyor."
          },
          {
            "label": "2. adım",
            "explanation": "Dikkatini ağacın bilinçte verilişine ve deneyimin yapısına çeviriyor. Bu yön fenomenolojik betimlemeyle ilişkilidir."
          },
          {
            "label": "3. adım",
            "explanation": "Bu yöntemi yalnız duyuların aldatıcılığı veya hiçbir varlık yoktur sonucu olarak okumak metne ek iddia katmak olur."
          }
        ],
        "answer": "Bilince verili olan deneyimin yapısı araştırılıyor; dış varlığın yokluğu ilan edilmiyor.",
        "check": "Paranteze alma yöntemsel odak değişimidir; otomatik inkâr değildir.",
        "pitfall": "Fenomenoloji ile kaynakta karışabilen fenomenalizm adını aynı öğreti sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Bir örnekte birçok nesne saymak neden çoğulcu ontoloji kanıtı değildir?",
        "answer": "Birçok nesne aynı tek temel ilkeyle açıklanabilir; belirleyici olan indirgenemez temel sayısıdır."
      },
      {
        "prompt": "Bir varlık görüşünün nicelik ve nitelik soruları nasıl ayrılır?",
        "answer": "Kaç temel kabul edildiği nicelik; bu temelin madde, düşünce veya başka bir yapı oluşu nitelik sorusudur."
      },
      {
        "prompt": "Fenomenolojide paranteze alma otomatik varlık inkârı mıdır?",
        "answer": "Hayır. Belirli hükümleri yöntem gereği askıya alıp bilince verili deneyimin yapısına yönelme söz konusudur."
      },
      {
        "prompt": "Bir nesne hakkındaki yargının yanlış çıkması nesneyi yok eder mi?",
        "answer": "Hayır. Yanlış yargı ile varlığın bulunup bulunmadığı ayrı sorulardır; türü yanlış tanınan ağaç yine var olabilir."
      }
    ],
    "source": "Aurelia TYT Felsefe 001–006 kopya kâğıtları; MEBİ TYT-AYT Felsefe konu özetlerinin ilgili bölümleri ve OGM Felsefe video ders notları karşılaştırılarak hazırlanmış özgün anlatım ve uygulamalar. Kaynaklardaki kavram ve bilimsel yöntem genellemeleri koşullarıyla açıklanmıştır; sorular resmî sınav sorusu değildir.",
    "title": "Varlık felsefesi: ne var, neye dayanıyor?"
  },
  {
    "id": "bilgi-felsefesi",
    "minutes": 105,
    "objectives": [
      "Bilginin imkânı, kaynağı, ölçütü ve sınırını farklı sorularla belirle.",
      "Akıl, deney, sezgi ve bunların birleşimine verilen rolleri karşılaştır.",
      "Doğruluk ölçütünü tanımakla onu kesin garanti saymayı ayır.",
      "Bir bilginin güvenini, gerekçesini ve kullanım amacını incele."
    ],
    "sections": [
      {
        "title": "Özne, nesne ve bilgi ilişkisi",
        "paragraphs": [
          "Bir kişi masadaki cismin rengini incelerken bilen kişi özne, araştırdığı cisim nesne, onun hakkında oluşturduğu yargı ise bilme ilişkisinin ürünüdür. “Bu cisim kırmızıdır.” sözü nesnenin kendisi değil, nesneye ilişkin bir belirlemedir. Bilgi felsefesi bu ilişkinin nasıl kurulabildiğini ve ne ölçüde güvenilir olduğunu araştırır.",
          "Bir sözü duymak, ona inanmak ve onu yeterli gerekçeyle bilmek aynı işlem değildir. Doğru bir tahmin bazen tesadüfen de çıkabilir; bu durum tahmini yapanın sağlam dayanağı olduğunu göstermez. İlk adımda neye inanıldığını, hangi nesnenin araştırıldığını ve inanmanın gerekçesini ayrı yazmak, bilgi tartışmasının yapısını görünür kılar."
        ]
      },
      {
        "title": "Dört temel soruyu aynı örnekte ayır",
        "paragraphs": [
          "“Nesne hakkında güvenilir bilgi edinebilir miyiz?” imkân sorusudur. “Bu bilgiyi deneyimle mi akılla mı edindim?” kaynağı sorar. “Yargının doğru olduğunu neye göre kabul ettim?” ölçüte yönelir. “Nesnenin hangi yönünü bilebilirim?” ise sınır sorusudur. Aynı nesne üzerinden dört farklı ilişki araştırılabilir.",
          "Bir kişi “Kapıyı açıp Ece’yi gördüm.” dediğinde nasıl öğrendiğine bakıyorsan deneyimin kaynak rolünü incelersin. “Kapıdaki kişi Ece’ydi.” yargısını görülen kişiyle karşılaştırıyorsan uygunluk ölçütünü kullanıyor olabilir. Aynı gözlem iki işte de yer alabildiği için yalnız görme sözcüğünü seçmek yetmez; soru hangi rolü araştırıyor, onu belirle."
        ]
      },
      {
        "title": "İmkân problemi ve kuşkucu tavır",
        "paragraphs": [
          "Doğru bilginin mümkün olup olmadığı, bilgi felsefesinin temel sorularındandır. Kuşkucu yaklaşımlar duyuların yanılması, kişiden kişiye değişen görünümler veya kanıtların sınırlılığı üzerinden kesin bilgi iddialarını sorgular. Su içindeki çubuğun kırık görünmesi, algının nasıl yorumlanması gerektiğini tartışmak için bir örnek olabilir.",
          "Bu örnekten hangi sonucun çıkarıldığı ayrıca okunmalıdır. Bazı algıların yanılması, her yargının her koşulda yanlış olduğunun tek başına kanıtı değildir. Bir düşünür kesinliği askıya alabilir, başka biri yalnız belirli kaynağa itiraz edebilir. Kuşkunun kapsamını ve savunulan sonucu açık belirle; her itirazı bütün bilginin reddi sayma."
        ]
      },
      {
        "title": "Yöntemsel kuşku ile sonuç olarak kuşku",
        "paragraphs": [
          "Bir araştırmacı güvenilir bulduğu bir yargıya ulaşmak için önce kabullerini sınayabilir. Burada kuşku bir araştırma aracıdır. Descartes’ın kuşkudan hareketle düşünme etkinliğinin kesinliğine yönelmesi, bu ayrımı gösteren felsefi bir örnektir. Kuşkuyla başlaması, sonunda hiçbir bilgi kabul etmediği anlamına gelmez.",
          "Bir metinde “Emin olmak için önce sorguluyorum.” ifadesi ile “Hiçbir konuda kesin bilgiye ulaşılamaz.” yargısı aynı sonuca sahip değildir. Önce yöntemi, sonra varılan görüşü ayrı oku. Bu ayrım yalnız filozof adıyla değil, verilen tam cümlelerin hangi işlevi yerine getirdiğiyle belirlenmelidir; yöntemden sonuca otomatik atlama yapma."
        ]
      },
      {
        "title": "Bilgiyi mümkün sayan yaklaşımlar",
        "paragraphs": [
          "Bu dersin temel karşılaştırmasında doğru bilginin mümkün olduğunu kabul eden farklı yaklaşımlar, kuşkucu yaklaşımların karşısında incelenir. Bu kabul hangi bilginin, hangi yolla ve hangi sınırda mümkün olduğu sorularını ortadan kaldırmaz. Aynı imkân yanıtını veren düşünürler bilginin kaynağında birbirinden ayrılabilir.",
          "Dogmatizm teriminin felsefe tarihindeki belirli kullanımları ile gündelik dildeki inatçılık anlamını eşitleme. Bir yaklaşımı incelerken onun gerçek savını açık yaz: doğru bilgiye ulaşılabilir mi, hangi kaynağa dayanır ve eleştiriyi nasıl ele alır? Sırf bilgiyi mümkün görüyor diye bir düşünürün bütün yöntemlerini ve bütün görüşlerini aynı sayamazsın."
        ]
      },
      {
        "title": "Akılcılık ve deneyden bağımsız ilkeler",
        "paragraphs": [
          "Rasyonalizm aklın ilke ve çıkarımlarına, en azından bazı bilgilerin deneyden bağımsız olarak bilinebilmesine önem verir. Matematiksel bir çıkarım, tek tek bütün örnekleri ölçmeden zorunlu bir ilişkiyi göstermeye örnek olabilir. A priori, bu bağlamda yargının gerekçesinin deneyden bağımsız oluşunu anlatır; kişinin onu yaşamında mutlaka ilk öğrendiği bilgi olması demek değildir.",
          "Sokrates, Platon, Descartes ve Hegel gibi düşünürler akla verdikleri farklı rollerle bu başlıkta incelenebilir; bütün ayrıntıları aynı değildir. Aklı öne çıkarmak her rasyonalistin günlük yaşamda duyuları hiç kullanmadığı anlamına gelmez. Pasajda hangi tür bilginin hangi güvenilirlik gerekçesiyle akla bağlandığını belirle; tek bir matematik sözcüğüyle bütün görüşü çözme."
        ]
      },
      {
        "title": "Deneyimcilik ve öğrenilen içerik",
        "paragraphs": [
          "Empirizm, bilginin oluşumunda deneyime ve duyular yoluyla edinilen içeriğe öncelik verir. Locke’un boş levha benzetmesi, zihinde hazır içerik bulunduğu anlayışına karşı deneyimin rolünü vurgular. Bir meyvenin tadını veya belirli bir rengin nasıl göründüğünü öğrenmek, deneyimden alınan içeriğe basit örneklerdir.",
          "A posteriori sözü deneyime dayanan bilgiyle ilişkilidir. Deneyimci yaklaşımı kişinin akıl yürütemediği veya bütün düşüncelerin yalnız doğrudan görme olduğu iddiasına indirgeme. Deneyimden gelen içerik daha sonra karşılaştırılır, birleştirilir ve düşünülür. Locke ile Hume gibi düşünürlerin deneyime verdikleri rollerin ayrıntıları da farklı olabilir; açık pasajın savını izle."
        ]
      },
      {
        "title": "Kant: deney malzemesi ve zihnin düzeni",
        "paragraphs": [
          "Kant’ın eleştirel yaklaşımında bilgi için deneyim ve akıl tek başına yeterli sayılmaz. Deneyim bilgiye malzeme sağlar; zihnin formları bu malzemenin anlamlı biçimde düzenlenmesinde rol oynar. Bu nedenle bütün bilginin deneyimle başlaması, onun yalnız deneyimden türediği sonucunu zorunlu kılmaz.",
          "Bu görüşü akıl ile duyuyu rastgele yarı yarıya karıştıran bir tarif gibi düşünme. İki kaynağa farklı görevler verilmektedir. Bir modelde görülen noktalarla bu noktaları belirli bir ilişki içinde kavrama ayrı aşamalar olarak gösterilebilir. Dersin amacı hangi ilişkinin deneyime, hangisinin zihinsel yapıya bağlandığını açıklamak ve iki rolün birbirinin yerine geçmediğini görmektir."
        ]
      },
      {
        "title": "Sezgi: aracısız kavrama iddiası",
        "paragraphs": [
          "Sezgici yaklaşımlar bazı bilgilerin yalnız adım adım akıl yürütme veya dış gözlemle değil, aracısız bir kavrayışla edinilebildiğini savunur. Bergson’un yaşanan süreyi kesintisiz akış olarak düşünmesi, bu başlıkta verilen örneklerdendir. Bu yaklaşım günlük dildeki her tahminin doğru olduğu veya geleceği bilme yetisi bulunduğu iddiasıyla aynı değildir.",
          "Gazâlî ve Bergson gibi düşünürlerin sezgiye verdikleri yerler de aynı ayrıntılara sahip değildir. Birinin aklın sınırını tartışması, akıl ve deneyimden gelen bütün bilgileri hiçbir bağlamda kabul etmediğini tek başına göstermez. Önce sezgiye hangi tür bilgi için hangi üstünlük verildiğini oku; genel bir etiketi bütün bilme alanlarına koşulsuz yayma."
        ]
      },
      {
        "title": "Pozitivizm: olguya yönelme",
        "paragraphs": [
          "Pozitivizm, gözlenebilir olgulara ve bilimsel incelemeye verdiği ağırlıkla bilinir. Comte’un yaklaşımında olayları doğaüstü nedenler veya soyut özlerle açıklamak yerine olgular arasındaki ilişkileri araştırma öne çıkar. Bu, belirli bir bilgi anlayışıdır; uygulamanın tartışmasız benimsediği tek doğruluk tanımı olarak sunulmaz.",
          "Teolojik, metafizik ve pozitif evreler onun düşüncesinde tarihsel bir açıklama çerçevesi oluşturur. Bu çerçeveyi bütün toplumların her ayrıntısında kesin ölçülmüş tek çizgi gibi kullanmamak gerekir. Bir soru pozitivist vurguyu istiyorsa metnin hangi bilgiyi olgusal saydığını, metafiziğe neden itiraz ettiğini ve bilimsel yönteme hangi rolü verdiğini açıklamalısın."
        ]
      },
      {
        "title": "Dil çözümlemesi ve mantıkçı pozitivizm",
        "paragraphs": [
          "Analitik yaklaşımlar felsefi sorunları kavramların, dilin ve argümanların çözümlemesiyle inceleyebilir. Mantıkçı pozitivizm, bu geniş gelenek içinde anlamı doğrulanabilirlikle ilişkilendiren belirli bir yaklaşım olarak ele alınır. Bütün analitik filozofların her dönemde aynı görüşü savunduğunu söylemek kapsamı gereksiz genişletir.",
          "Bir pasaj “Bir önermenin anlamlı olması için nasıl doğrulanacağını gösterebilmeliyiz.” diyorsa belirli bir ölçüt ileri sürmektedir. Bu savı anlamakla onun bütün sorunları çözdüğünü kabul etmek aynı şey değildir. Wittgenstein’ın farklı dönemlerdeki düşüncelerini de tek sloganla birleştirmek yerine verilen dil-gerçeklik ilişkisinin hangi iddiayı taşıdığını incele."
        ]
      },
      {
        "title": "Fenomenolojik betimleme",
        "paragraphs": [
          "Fenomenoloji, şeylerin deneyimde bilince nasıl göründüğünü ve bu deneyimin yapısını inceleyen yöntemlerle ilişkilidir. Husserl’de ön yargıları ve alışılmış kabulleri paranteze almak, fenomeni daha dikkatli betimleme amacına hizmet eder. Burada paranteze almak her şeyi yok saymak veya rastgele bir kurgu üretmek anlamına gelmez.",
          "Bir nesneyi görürken yalnız renk yaması değil, belli bir nesne olarak deneyimleriz. Bu deneyimin nasıl kurulduğunu araştırmakla nesnenin laboratuvar ölçümünü yapmak aynı görev değildir. Fenomenoloji ile fenomenalizm adları da benzer görünse bile eş anlamlı sayılmaz. Düşünürün adı, yöntem ve temel savı birlikte okunmalıdır."
        ]
      },
      {
        "title": "Bilginin sınırı: kısmi bilgi de bilgidir",
        "paragraphs": [
          "Bilginin sınırı sorusu neyi ne kadar bilebileceğimizi araştırır. Bir yaklaşım nesnenin bize görünen niteliklerini bilebildiğimizi, onun kendinde özüne aynı yolla erişemediğimizi savunabilir. Bu görüşten hiçbir niteliğin veya hiçbir olayın bilinemeyeceği sonucu otomatik çıkmaz; bilinen ile erişilemeyen alan ayrılır.",
          "Kant’ın görünüş ile kendinde şey ayrımı veya bir metnin nesnenin nitelikleriyle özünü ayırması bu problem için örnek olabilir. Her düşünür aynı sınırı çizmez. Soruda verilen yargıyı “bütün bilgi imkânsız” gibi daha güçlü bir reddedişe dönüştürme. Hangi nesne, hangi özellik ve hangi bilme yolu için sınır konduğunu açıkça söyle."
        ]
      },
      {
        "title": "Kaynak ile doğruluk ölçütünü ayır",
        "paragraphs": [
          "Kaynak sorusu bilginin oluşumuna, ölçüt sorusu bir yargıyı neden doğru kabul ettiğimize yönelir. Bir kapıyı açıp birini görmek bilgi edinme yolu olarak duyu deneyimidir. Aynı gözlemi “Kapıdaki kişi Ece’ydi.” yargısıyla karşılaştırmak ise uygunluk denetimine hizmet edebilir. Aynı araç farklı görevlerde kullanılabilir.",
          "Kararı görmek, düşünmek veya yarar gibi tek sözcüklerden çıkarma. “Nereden öğrendi?” ve “Doğru olduğunu neye göre kabul etti?” sorularını sırayla sor. Metin hangisini vurguluyorsa o ilişkiyi göster. Bir kaynağın varlığı, o kaynaktan gelen her yargının otomatik doğru olduğunu da garanti etmez; ölçüm ve yorum yanılabilir."
        ]
      },
      {
        "title": "Uygunluk: yargıyı olguyla karşılaştır",
        "paragraphs": [
          "Uygunluk ölçütünde bir yargının bildirdiği durumla nesnel durumun örtüşmesi aranır. “Bugün burada yağmur yağıyor.” yargısını uygun yer ve zamanda yapılan gözlemle karşılaştırmak bu işlemi gösterir. Yalnız kişinin bu sözü içtenlikle söylemesi veya birçok kişinin tekrarlaması aynı tür kanıt değildir.",
          "Karşılaştırılan yer, zaman ve anlam eşleşmelidir. Başka şehirdeki yağmur, buradaki yağmur yargısını doğrulamaz. Bir nesneye ilişkin yanlış önerme de nesneyi ortadan kaldırmaz: yanlış olan açıklama olabilir. Uygunluk, gerçeklik ile onun hakkındaki söz arasındaki bağı öne çıkarır; nesneye doğru veya yanlış demek yerine yargıyı değerlendiririz."
        ]
      },
      {
        "title": "Tutarlılık: bir düşünce sistemiyle bağdaşma",
        "paragraphs": [
          "Tutarlılık ölçütünde yargının kabul edilen diğer yargılarla çelişmemesi ve ilişkili bir bütün içinde yer alması önemlidir. Matematikte bir sonucun tanımlar ve kabul edilen öncüllerle geçerli biçimde çıkarılması buna örnek gösterilebilir. Burada denetim bir dış nesneyi yeniden ölçmekle aynı iş değildir.",
          "Bütünlüklü görünen bir düşünce sistemi dış dünya hakkında mutlaka doğru olmak zorunda değildir. Bu nedenle tutarlılığı tanımakla onun her olgusal iddiaya tek başına kesin garanti verdiğini söylemek farklıdır. Bir pasaj hangi doğruluk anlayışını savunuyorsa onu belirle; başka bir ölçütün sorusunu bu pasajın yerine getiriyormuş gibi değerlendirme."
        ]
      },
      {
        "title": "Uzlaşım ve apaçıklık ölçütleri",
        "paragraphs": [
          "Tümel uzlaşım ölçütü, bir yargının başkalarınca ortak kabul edilmesini doğruluk için önemli sayan yaklaşımla ilişkilidir. Sınav pasajında kişinin hangi ölçütü kullandığı sorulduğunda bu kabul ilişkisini tanırsın. Çok kişinin inanması, uygulamanın olgusal bir iddiayı otomatik kanıtlaması anlamına gelmez; çoğunluk da yanılabilir.",
          "Apaçıklık veya açık-seçik kavrayışta yargının kuşkuya yer bırakmadan kavrandığı ileri sürülür. Descartes’ın düşünme etkinliği üzerine kesinlik arayışı bu başlıkta örneklenir. Bir cümlenin kolay okunur veya büyük harfle yazılı olması apaçıklık ölçütü değildir. Hangi gerekçeyle kuşkusuz sayıldığını ve savunulan düşünür bağlamını incele."
        ]
      },
      {
        "title": "Yarar ölçütü ve pratik sonuç",
        "paragraphs": [
          "Pragmatik doğruluk yaklaşımında bir düşüncenin deneyimde işe yaraması, sorun çözmesi veya uygulamada sonuç vermesi önem taşır. Bir yöntemle aranan sonuca ulaşılmasının yargıya nasıl destek verdiği sorulabilir. Buradaki pratik sonuç vurgusunu kişinin kısa süreli çıkarını her konuda tek doğru sayan bir sloganla eşitleme.",
          "Bilgi felsefesindeki bu tartışma ile ahlakta toplam faydaya göre eylem seçmek aynı soru değildir. Birinde yargının doğruluk anlayışı, diğerinde eylemin ahlaki ölçütü incelenir. Ayrıca bir sonucun işe yaraması, hangi mekanizmanın tek gerçek açıklama olduğunu her durumda kanıtlamaz. Kaynağı, iddiayı, ölçütü ve sonuç kapsamını birlikte koru."
        ]
      },
      {
        "title": "Gerçeklik ve doğruluğun ilişkisinde dikkatli ol",
        "paragraphs": [
          "Dünya, ağaç veya nehir birer varlık örneğidir; bunlar hakkında kurduğumuz önermeler ise doğru veya yanlış olabilir. “Bu ağaç çamdır.” önermesinin yanlış çıkması ağacın yokluğu demek değildir. Bu temel ayrımda gerçeklik araştırılan var olana, doğruluk onun hakkındaki yargının niteliğine yönelir.",
          "Farklı felsefi yaklaşımlar gerçekliğin kapsamını ve doğruluğun ölçütünü farklı açıklayabilir. Bu yüzden bir düşünürün ideal gerçeklik savını girişteki somut nesne örneğiyle hemen çelişik sayma; kavramın o bağlamdaki anlamını oku. Soruda hangi ilişkinin istendiğini belirlemek, benzer sözcüklerin farklı görevlerini ayırmanı sağlar."
        ]
      },
      {
        "title": "Bilginin değeri ve güvenilirliği",
        "paragraphs": [
          "Bir şeyi günlük işini kolaylaştırmak için öğrenebilirsin; bazen de yalnız merak ettiğin için bilmek istersin. Bilginin pratik ve kendisi için değerini ayırmak bu iki amacı görünür kılar. Aynı bilgi bir kişi için ekonomik yarar, başka biri için düşünsel ilgi taşıyabilir. Amaç farklılığı yargının doğruluğunu kendiliğinden değiştirmez.",
          "Güvenilirliği araştırırken kaynağın uzmanlığını, hangi yöntem ve verilere dayandığını, bağımsız denetimi ve hata ihtimalini incele. Bir kişinin unvanı veya bir kurumun adı her sözünü kesin doğru yapmaz. Bilgiyi kimin söylediği kadar nasıl elde edildiği de önemlidir. Bu denetim, kaynağı körü körüne kabul etmek ile bütün kaynakları gerekçesiz reddetmek arasında düşünceli bir yol sunar."
        ]
      },
      {
        "title": "Deney ve pratik düşüncenin ad bağlantıları",
        "paragraphs": [
          "Francis Bacon gözlem ve deneyin düzenli kullanımıyla doğayı araştırmayı, acele genellemeleri ve düşünceyi yanıltan ön kabulleri eleştirmeyi öne çıkarır. Locke’un deneyden edinilen içerik vurgusu ve Hume’un izlenimlerle kavramlar arasındaki ilişkileri incelemesi de deneyimcilik başlığında ele alınır. Bu ortak başlık, üç düşünürün bütün yöntem ve sonuçlarının aynı olduğu anlamına gelmez.",
          "William James ve John Dewey pragmatizmle ilişkilendirilen düşünürlerdendir. Düşüncenin deneyimdeki sonuçları, problem çözme ve araştırma süreci bu bağlantıda önemlidir. Bir yöntemin işe yaraması ile kişinin kısa vadeli çıkarına hoş gelmesi aynı şey değildir. Bir pasajda yalnız isim tanımakla yetinme; deneyin kaynak mı, araştırma yöntemi mi veya pratik sonucun doğruluk ölçütü mü yapıldığını göster."
        ]
      }
    ],
    "examples": [
      {
        "title": "Bilginin kaynağı ve sınaması",
        "prompt": "Ece kapıya bakıp “Kapı açık.” yargısına ulaşıyor. Öğretmeni önce “Bu yargıya nasıl ulaştı?”, sonra “Yargı olguyla örtüşüyor mu?” diye soruyor. İki odak arasındaki farkı açıkla.",
        "strategy": "Aynı gözlem eyleminin sorudaki işlevini ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk soru bilginin nasıl elde edildiğini sorar. Verilen örnekte Ece kapıyı görerek deneyimden yararlanmıştır."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci soru yargıyı kapının gerçekten açık olma durumuyla karşılaştırır. Burada uygunluk ölçütü kullanılır."
          },
          {
            "label": "3. adım",
            "explanation": "Deneysel kaynak ile uygunluk ölçütü ilişkilidir, fakat eş anlamlı değildir. Birinin adı bütün bilgi felsefesi sorularına otomatik cevap olmaz."
          }
        ],
        "answer": "İlkinde bilgi kaynağı, ikincisinde doğruluk için yargı-olgu uygunluğu araştırılır.",
        "check": "Kapıya bakmak aynı kalsa da sorulan ilişki değişmiştir.",
        "pitfall": "Empirizm adını her doğruluk ölçütü sorusuna veya uygunluğu her kaynak sorusuna taşıma."
      },
      {
        "title": "Deney malzemesi ile zihnin katkısı",
        "prompt": "Bir yaklaşım “Bilgi deneyimle başlar, ancak deneyimden gelen malzemeyi zihnin düzenleyici yapıları biçimlendirir.” diyor. Bu görüşü yalnız deneycilikle neden eşitlemeyiz?",
        "strategy": "İki ayrı katkının birlikte kabul edildiği cümleleri açık yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Deneyim, bilgi için malzeme sağlıyor; bu nedenle duyusal içeriğin rolü reddedilmiyor."
          },
          {
            "label": "2. adım",
            "explanation": "Zihnin düzenleyici yapıları da bilginin oluşmasında kurucu rol alıyor; zihin bütünüyle boş ve edilgin bir kayıt yüzeyi sayılmıyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu birlik, Kant ile ilişkilendirilen eleştirel yaklaşımın temel öğretim çerçevesidir. Sadece deneyim sözcüğünü seçip diğer öncülü silmek anlamı bozar."
          }
        ],
        "answer": "Görüş hem deney malzemesini hem zihnin düzenini bilgi oluşumunda gerekli görüyor.",
        "check": "Metinde iki katkı açıkça birlikte var; yalnız birini almak eksiltmedir.",
        "pitfall": "Bu açıklamayı Kant’ın bütün ayrıntılarını kapsayan tek formül gibi görme."
      },
      {
        "title": "Çoğunluk ölçütünün rolü ve sınırı",
        "prompt": "Bir kişi “Bir yargıyı herkes kabul ediyorsa doğru sayarım.” diyor. Bu kişinin ölçütünü belirle; bunun uygulamanın bütün olgusal yargılar için doğruluk garantisi olup olmadığını da açıkla.",
        "strategy": "Bir kişinin savunduğu ölçütü tanımak ile o ölçütü doğrulamak farklıdır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Kişi yargının olguyla doğrudan karşılaştırılmasını değil ortak kabulü belirleyici sayıyor. Bu, tümel uzlaşım ölçütüne işaret eder."
          },
          {
            "label": "2. adım",
            "explanation": "Sorunun bu kısmında kişinin ne savunduğunu doğru okumamız gerekir; kendi görüşümüzle değiştirmeyiz."
          },
          {
            "label": "3. adım",
            "explanation": "Bununla birlikte insanların ortak yanılması mümkündür. O hâlde kişinin ölçütünü tanımak, çoğunluğun her olgusal iddiayı kesin kanıtladığını kabul etmek değildir."
          }
        ],
        "answer": "Kişinin ölçütü tümel uzlaşımdır; ortak kabul tek başına her olgusal iddia için yanılmaz garanti değildir.",
        "check": "Cevap iki düzeyi birlikte korur: metindeki ölçüt ve ölçütün sınırı.",
        "pitfall": "Bir görüşü doğru tanımlamanın onu eleştirisiz benimsemek anlamına geldiğini sanma."
      },
      {
        "title": "Yanlış yargı nesneyi yok etmez",
        "prompt": "Bahçede bir ağaç var. Deniz onun çam olduğunu söylüyor; inceleme ağacın servi olduğunu gösteriyor. Yanlış çıkan nedir?",
        "strategy": "Varlık ile varlık hakkındaki önerme farklı türdendir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ağacın bahçede bulunması verilen olgudur; inceleme onun türünü belirler."
          },
          {
            "label": "2. adım",
            "explanation": "“Bu ağaç çamdır.” önermesi olguyla örtüşmediği için yanlış çıkmıştır. Bu, bahçede hiç ağaç bulunmadığı anlamına gelmez."
          },
          {
            "label": "3. adım",
            "explanation": "Gerçeklik araştırılan varlıkla, doğruluk ise onun hakkındaki yargıyla ilişkilendirilen kavramlardır. Örnek bu temel ayrımı gösterir."
          }
        ],
        "answer": "Yanlış olan çam yargısıdır; ağacın varlığı bu yanlışlık yüzünden ortadan kalkmaz.",
        "check": "Tür yanlış tanımlanmış; nesnenin yokluğu ileri sürülmemiştir.",
        "pitfall": "Doğru-yanlış nitelemesini ağacın fiziksel varlığına yapıştırma."
      }
    ],
    "recall": [
      {
        "prompt": "Bilgi kaynağı sorusu ile doğruluk ölçütü sorusu nasıl ayrılır?",
        "answer": "İlki yargının nasıl elde edildiğini; ikincisi hangi dayanakla doğru sayılacağını araştırır."
      },
      {
        "prompt": "Yöntemsel kuşku ile kesin bilgiyi reddetmek aynı mıdır?",
        "answer": "Hayır. Kuşku güvenilir sonuca ulaşma aracı olabilir; başka yaklaşımda ulaşılabilen kesinlik iddiasının kendisi reddedilir."
      },
      {
        "prompt": "Uygunluk ölçütünde hangi ilişki denetlenir?",
        "answer": "Yargı ile onun söz ettiği olgu, aynı yer, zaman ve anlam koşullarında karşılaştırılır."
      },
      {
        "prompt": "Bir metnin tümel uzlaşımı savunduğunu tanımak onu yanılmaz kabul etmek midir?",
        "answer": "Hayır. Metnin kullandığı ölçütü saptamak ayrıdır; çoğunluğun yanılabilmesi bu ölçütün ayrıca tartışılmasını gerektirir."
      }
    ],
    "source": "Aurelia TYT Felsefe 001–006 kopya kâğıtları; MEBİ TYT-AYT Felsefe konu özetlerinin ilgili bölümleri ve OGM Felsefe video ders notları karşılaştırılarak hazırlanmış özgün anlatım ve uygulamalar. Kaynaklardaki kavram ve bilimsel yöntem genellemeleri koşullarıyla açıklanmıştır; sorular resmî sınav sorusu değildir.",
    "title": "Bilgi felsefesi: kaynak, ölçüt ve sınır"
  },
  {
    "id": "bilim-felsefesi",
    "minutes": 100,
    "objectives": [
      "Bilimsel araştırmada sorun, hipotez, öndeyi, veri, kuram ve yasa rollerini ayır.",
      "Değişkenleri kontrollü karşılaştırarak bir hipotezin neyi açıklayabildiğini göster.",
      "Doğrulama, yanlışlanabilirlik, paradigma ve bilimsel değişme yaklaşımlarını koşullarıyla tartış.",
      "Bilimsel değeri, etik sorumluluğu ve teknolojinin sonuçlarını gerekçeyle değerlendir."
    ],
    "sections": [
      {
        "title": "Bilimi incelemek ile bilim yapmak",
        "paragraphs": [
          "Bir araştırmacı bitkinin hangi ışıkta daha hızlı büyüdüğünü ölçebilir. Bilim felsefesi ise bu araştırmayı bilimsel yapan yöntemin ne olduğunu, ölçümün hangi açıklamaya dayanak olabileceğini ve bir varsayımın nasıl sınandığını sorar. Araştırmanın kendisiyle onun bilgi üretme biçimini incelemek ilişkilidir, fakat aynı soruyu sormaz.",
          "Bir metindeki deney veya laboratuvar sözcüğü tek başına bilim felsefesi sonucunu vermez. Bitkinin boyunu hesaplama biyolojik bir araştırmanın parçası olabilir; yalnız doğrulayıcı örnek aramanın yeterli olup olmadığını tartışmak bilimin yöntemini konu edinir. Önce bilimsel nesnenin mi yoksa bilimin yöntem, yapı veya değerinin mi incelendiğini belirle."
        ]
      },
      {
        "title": "Bilimsel soruyu açık ve sınanabilir kur",
        "paragraphs": [
          "Bir araştırma sorusu neyin, hangi koşulda inceleneceğini açığa çıkarır. “Bu fide daha iyi mi?” yerine “Aynı tür fideler dört haftada farklı ışık sürelerinde ne kadar uzar?” demek ölçütü ve süreyi belirtir. Sorunun açık olması, ona verilecek cevabın doğru olduğunu henüz göstermez; yalnız araştırmayı yönlendirmeyi kolaylaştırır.",
          "Bir kavramın nasıl ölçüleceği de belirtilmelidir. Büyüme için boy, yaprak sayısı veya kütle seçilebilir; bunlar aynı şeyi bütünüyle ölçmeyebilir. Seçilen göstergeyi araştırma sonucunun kapsamıyla eşleştir. Yalnız boy ölçülmüşken bitkinin her bakımdan daha sağlıklı olduğunu söylemek, eldeki verinin ötesine geçebilir."
        ]
      },
      {
        "title": "Gözlem ve ölçümün dayanağı",
        "paragraphs": [
          "Gözlem, araştırılan olaya ilişkin düzenli bilgi toplamayı; ölçüm, belirlenen bir büyüklüğü birim ve araçla ifade etmeyi içerir. Aynı olayın farklı araçlarla kaydı farklı hata payları taşıyabilir. Ölçümün zamanı, aralığı ve aracın nasıl kullanıldığı açıklanırsa başka kişiler yöntemi denetleyebilir.",
          "Veri kendi başına hiçbir kavram olmadan konuşan bir son söz değildir. Araştırmacı neyi sayacağını, hangi farkı önemli bulacağını ve ölçümü nasıl yorumlayacağını belirler. Bu durum gözlemi değersiz yapmaz; kullanılan kavram ve varsayımların açık olmasını gerektirir. Ölçüm belirsizliğini bildirmek, araştırmanın başarısızlığını değil sınırlarının dürüstçe gösterilmesini sağlayabilir."
        ]
      },
      {
        "title": "Hipotez bir sınama önerisidir",
        "paragraphs": [
          "Hipotez, gözlenen durum veya ilişki için ileri sürülen sınanabilir bir varsayımdır. “Diğer koşullar aynıyken ışık süresi arttığında bu fideler daha fazla uzar.” savı belirli bir karşılaştırma bekler. Beklenen farkın çıkması hipoteze destek sağlayabilir; çıkmaması ise savın veya sınama düzeninin yeniden incelenmesini gerektirir.",
          "Bir iddiaya hipotez demek onu keyfî bir tahmin veya kanıtlanmış yasa yapmaz. Savın hangi veriye dayandığı ve hangi bulgunun onunla uyuşmayacağı açıklanmalıdır. Her sonuca sonradan bir gerekçe ekleyip varsayımı değişmeden korumak gerçek sınamayı güçleştirir. Öngörülen koşulları sonuca bakmadan önce açık tutmak gerekir."
        ]
      },
      {
        "title": "Değişkenleri bir örnekte ayır",
        "paragraphs": [
          "Araştırmacının etkisini incelemek için değiştirdiği etken bağımsız değişken, ölçtüğü sonuç bağımlı değişken olarak adlandırılır. Işık süresini değiştirip fide boyunu ölçen deneyde ışık süresi ve boy bu rolleri alır. Tür, başlangıç boyu, su ve toprak gibi diğer etkenleri olabildiğince aynı tutmak karşılaştırmayı güçlendirir.",
          "Aynı anda hem ışığı hem suyu değiştirirsen boy farkını tek başına ışığa bağlayamazsın. Bu, hiçbir şey öğrenilemediği anlamına gelmez; yalnız eldeki düzenek iki olası açıklamayı ayırmada yetersiz olabilir. Bir kontrol grubu veya çapraz karşılaştırma ekleyerek rakip açıklamaların farklı öngörüler üretmesini sağlayabilirsin."
        ]
      },
      {
        "title": "Birlikte değişme ile nedeni ayır",
        "paragraphs": [
          "Birlikte görülen iki özellik arasında ilişki bulunabilir; ancak ilişki tek başına nedenin yönünü veya başka etkenlerin yokluğunu kanıtlamaz. Sıcak günlerde hem dondurma satışı hem su tüketimi artabilir. Birinin diğerini doğrudan oluşturduğu sonucundan önce ortak koşul olan sıcaklığı düşünmek gerekir.",
          "Nedensel iddiayı desteklemek için zaman sırası, alternatif açıklamalar ve uygun araştırma düzeni birlikte değerlendirilir. Kontrollü deney güçlü bir yöntem olabilir; bazı alanlarda etik veya pratik nedenlerle deney yerine farklı gözlemsel yöntemler kullanılır. Her bilim dalını tek bir laboratuvar biçimine indirgemek, yöntemlerin çeşitliliğini gözden kaçırır."
        ]
      },
      {
        "title": "Öndeyi ile açıklama farklı görevlerdir",
        "paragraphs": [
          "Bir hipotez belirli koşullarda ne görmeyi beklediğini söyleyebilir; bu öndeyidir. Beklenen bulguyu elde etmek, hipotezin veriye uyduğunu gösteren bir sınama sonucu olabilir. Açıklama ise olayın hangi ilişki veya mekanizmayla ortaya çıktığını anlamlandırmayı amaçlar. Doğru tahmin ile bütün nedenlerin bilindiği iddiası aynı değildir.",
          "Aynı veriyle uyuşan iki açıklama farklı yeni koşullarda farklı öndeyiler üretebilir. Bu yüzden hipotezleri yalnız geçmişe uyumuna göre değil ayırt edici yeni sınamalara göre de karşılaştırırız. Uygulamadaki küçük veri tablosu, önceden yazılmış örnek hipotezlerin öngörülerini karşılaştırır; gerçek dünyada sınırsız bilimsel teori keşfeden bir araç değildir."
        ]
      },
      {
        "title": "Kuram ve yasa bir yükselme merdiveni değildir",
        "paragraphs": [
          "Bilimsel yasa belirli koşullarda gözlenen düzenliliği veya nicel ilişkiyi ifade edebilir; bilimsel kuram geniş bir olgu alanını kavramlar, ilkeler ve açıklamalarla ilişkilendiren yapıdır. İkisinin görevleri ilişkilidir, fakat farklıdır. Kuram yeterince doğrulanınca zorunlu olarak yasaya dönüşür demek bu rol farkını siler.",
          "Bir kuram, içinde yasalar ve sınanabilir öngörüler barındırabilir; bir yasa da kuramsal çerçevede yorumlanabilir. Bir sonucun güçlü kanıtlarla desteklenmesi ona hangi görevi yaptığına bakılmadan daha yüksek bir ad verilmesini gerektirmez. Soruda ilişkiyi betimleme mi yoksa açıklama çerçevesi mi istendiğini ayır; kesinlik basamağı ezberi kullanma."
        ]
      },
      {
        "title": "Bilimsel bilginin başlıca özellikleri",
        "paragraphs": [
          "Bilimsel bilgi gerekçeli, sistemli, eleştiriye açık ve denetlenebilir olmayı amaçlar. Yöntemin ve verinin paylaşılması, başka araştırmacıların aynı iddiayı incelemesini kolaylaştırır. Nesnellik, araştırmacının kişisel beğenisinden bağımsız denetim arayışını anlatır; araştırmacıların hiçbir varsayımı veya tarihsel koşulu olmadığı anlamına gelmez.",
          "Bazı bilimsel sonuçlar çok güçlü biçimde desteklenir, bazıları daha geçicidir. Bilginin düzeltilebilir olması bütün sonuçların eşit derecede belirsiz veya rastgele olduğunu göstermez. Hata bulma ve düzeltme olanağı araştırmanın gücüdür. Kesinlik kelimesini her bilimsel iddiaya değişmezlik anlamında uygulamak yerine kanıtın gücünü ve kullanım koşullarını belirt."
        ]
      },
      {
        "title": "Tümevarımın gücü ve sınırı",
        "paragraphs": [
          "Birçok gözlemden daha geniş bir örüntüye ulaşmak bilimde önemli olabilir. Farklı zamanlarda ve uygun koşullarda yapılan benzer ölçümler bir genellemeye destek sağlar. Ancak açık bir evrendeki gözlemlerin sonlu olması, bütün olası durumların mantıksal olarak tek tek kapsandığı anlamına gelmez.",
          "Bir beyaz kuğu gözlemi bütün kuğular beyazdır savına uyar; çok sayıda böyle gözlem de savı mantıksal kesinliğe tek başına dönüştürmez. Savın kapsamındaki tek bir siyah kuğu karşı örneği evrensel savla bağdaşmaz. Bu asimetri, bilim felsefesinde tümevarım ve sınama problemlerini anlamak için temel bir örnektir."
        ]
      },
      {
        "title": "Doğrulanabilirlik yaklaşımını tanı",
        "paragraphs": [
          "Mantıkçı pozitivizmin belirli yorumlarında anlamlı olgusal önermelerin deneyimle nasıl ilişkilendirileceği öne çıkar. Bu yaklaşımda önermenin hangi gözlem koşulunda doğrulanabileceğini sormak önemlidir. Mantıksal ve matematiksel önermelerin görevi de olgusal önermelerden ayrı ele alınabilir.",
          "Bu yaklaşımı bütün felsefenin tek geçerli yöntemi veya bütün bilim insanlarının tartışmasız ortak görüşü olarak sunma. Doğrulama ilkesinin kendisi ve evrensel önermelerin sonlu gözlemle durumu tartışma konusudur. Soruda bir düşünürün kullandığı ölçütü tanımak ile o ölçütün her itirazı çözdüğünü iddia etmek farklıdır."
        ]
      },
      {
        "title": "Yanlışlanabilirlik ve riskli sınama",
        "paragraphs": [
          "Popper ile ilişkilendirilen yanlışlanabilirlik, bir iddianın hangi olası bulguyla uyuşmayacağının gösterilebilmesini öne çıkarır. “Bu koşuldaki bütün örnekler şu sonucu verir.” savı, koşul sağlandığında farklı sonuç bulunursa güçlük yaşar. Her olası sonucu kendisiyle uyumlu sayan bir savın deneysel sınanabilirliği zayıflar.",
          "Yanlışlanabilir olmak savın zaten yanlış olduğu anlamına gelmez. Bir uyuşmazlık görüldüğünde ölçüm aracını, yardımcı varsayımları ve koşulların gerçekten sağlanıp sağlanmadığını da inceleriz. Fakat bu inceleme savı hiçbir koşulda sınanamaz yapacak keyfî kurtarma çabasına dönüşmemelidir. Kuramın verdiği açık öngörü ile gerçek bulguyu karşılaştır."
        ]
      },
      {
        "title": "Bilimsel değişmeyi paradigma ile oku",
        "paragraphs": [
          "Kuhn, bilimsel toplulukların paylaştığı problem çözme çerçevesini paradigma kavramıyla inceler. Olağan bilimde araştırmacılar kabul edilen çerçevede bilmeceler çözer; önemli aykırılıklar ve krizler bilimsel değişim tartışmalarına yol açabilir. Bu, bilim tarihindeki bütün değişimlerin yalnız yeni bir veri eklenmesi olmadığını gösteren bir yaklaşımdır.",
          "Paradigma kavramı, her araştırmacının istediği sonuca inanabileceği anlamına gelmez. Topluluk, yöntem, örnek problem ve değerlendirme ölçütleri arasındaki ilişkileri araştırır. Popper ve Kuhn aynı sorulara bütünüyle aynı cevapları vermez; birini ötekine indirgemeden hangi metinde sınama ölçütünün, hangisinde bilimsel pratiğin tarihinin vurgulandığını oku."
        ]
      },
      {
        "title": "Ürün ve etkinlik olarak bilimi ayır",
        "paragraphs": [
          "Ürün olarak bilim yaklaşımında bilimsel önermelerin, kuramların ve bunlar arasındaki mantıksal ilişkilerin çözümlemesi öne çıkar. Etkinlik olarak bilimde araştırmacıların, toplulukların, tarihsel ortamın ve problem çözme pratiğinin rolü incelenir. Bu ayrım, bilimsel metnin yapısıyla bilim yapma sürecinin farklı odaklarını gösterir.",
          "İki odak birbirini tümüyle dışlayan gündelik işler olmak zorunda değildir. Bir araştırmanın sonuç raporundaki çıkarımı incelerken ürün yönüne, laboratuvarda hangi sorunun değerli sayıldığını araştırırken etkinlik yönüne bakabilirsin. Bir isim ezberinden önce pasajda hangi ilişkinin çözülmeye çalışıldığını göstermek daha güvenilir bir yöntemdir."
        ]
      },
      {
        "title": "Matematik ve olgusal bilimlerin yöntemi",
        "paragraphs": [
          "Matematikte tanım ve aksiyomlardan kanıt kurma, olgusal bilimlerde ise doğa veya topluma ilişkin iddiaları verilerle sınama önemli rollere sahiptir. Bir geometrik teorem ile bir toplumdaki davranış genellemesini aynı tür gözlemle kanıtlama beklentisi kuramayız. Alanın nesnesi ve soru türü yöntem seçimini etkiler.",
          "Bilimlerin bütün işlemleri tek bir ayrım tablosuna sığmaz; fizik de matematiksel çıkarım yapar, matematikçi de örneklerden bir sanı geliştirebilir. Fakat sanının bulunması ile kanıtlanması farklıdır. Örneğin birkaç üçgende ölçüm yapmak bir teoremin genel ispatının yerine geçmez; bir olgusal sav da sırf mantıksal olarak mümkün diye doğrulanmış olmaz."
        ]
      },
      {
        "title": "Bilim ile teknoloji ilişkisi",
        "paragraphs": [
          "Bilim açıklama ve anlama amaçlarıyla, teknoloji ise belirli gereksinimleri karşılayan araç ve süreç tasarımlarıyla ilişkilendirilebilir. Aynı çalışma her ikisine katkı sağlayabilir: yeni bir ölçüm aracı bilimsel araştırmayı geliştirirken, bilimsel bilgi de yeni bir aygıtın tasarlanmasını mümkün kılabilir. İlişki tek yönlü olmak zorunda değildir.",
          "Bir buluşun yararlı olması kullanılan açıklamanın bütün sınırlarının bilindiğini göstermez. Teknolojik seçimlerde maliyet, erişim, çevresel etki ve güvenlik gibi değerler de rol oynar. Araç çalışıyor sorusuyla hangi koşulda kime yarar veya zarar veriyor sorusunu birlikte sor; teknik başarı etik değerlendirmeyi kendiliğinden tamamlamaz."
        ]
      },
      {
        "title": "Etik sorumluluk araştırmanın parçasıdır",
        "paragraphs": [
          "Bilimsel araştırmada veri uydurmamak, yöntemi dürüstçe bildirmek ve başkalarının emeğini doğru belirtmek bilgi üretiminin güvenilirliğini korur. İnsan veya canlı katılımcılar söz konusu olduğunda zarar, rıza ve uygun denetim gibi sorumluluklar önem kazanır. Bir sonuç ilgi çekici diye her elde etme yolu kendiliğinden uygun olmaz.",
          "Araştırmanın değerini yalnız anlık yararla ölçmek temel bilgi arayışını gözden kaçırabilir; yalnız merakla açıklamak da toplumsal etkileri yok sayabilir. Bilimin değeri ve sorumluluğu tartışılırken soruyu açık kur: bilgi için yöntemsel güvenilirlik mi, eylem için etik uygunluk mu, yoksa uygulama için toplumsal sonuç mu değerlendiriliyor?"
        ]
      },
      {
        "title": "Tam bir araştırma tartışmasını çöz",
        "paragraphs": [
          "Önce soruyu, incelenen değişkenleri, hipotezi ve öngörülen sonucu ayrı yaz. Sonra verinin hangi koşulda toplandığını ve rakip açıklamaların hangi farklı öngörüleri verdiğini incele. Veri yalnız iki koşulda ayrım sağlamıyorsa ayırt edici yeni bir karşılaştırma öner; kanıt yetersizliği ile savın kesin yanlışlığını karıştırma.",
          "Son adımda sonucunu kapsamıyla ifade et: bu veri şu öngörüyle uyumlu, şu rakibi bu koşulda dışlıyor veya ikisini henüz ayırmıyor olabilir. Bir hipotezin başarılı öngörüsü onu sonsuza dek değişmez yasa yapmaz. Yöntem, veri ve açıklama bağını açık tutmak, bilim felsefesini yalnız düşünür adı ve slogan ezberinden çıkarır."
        ]
      },
      {
        "title": "Formel, doğa ve sosyal bilimleri örnekle tanı",
        "paragraphs": [
          "Matematik ve mantık formel bilimlerin temel örnekleridir; tanım, aksiyom ve çıkarım ilişkileri önemli yer tutar. Fizik, kimya, biyoloji ve astronomi doğa bilimleri başlığında doğadaki süreç ve ilişkileri araştırır. Sosyoloji, tarih, antropoloji, psikoloji ve siyaset bilimi ise insan, toplum ve tarihsel süreçleri farklı yöntemlerle inceleyen sosyal bilim örnekleridir. Sınıflama araştırma sorusunu ve nesneyi tanımayı kolaylaştırır.",
          "Bu sınırlar her çalışmayı tek kapalı kutuya hapsetmez. Örneğin psikolojinin biyolojik yöntem kullanan alanları olabilir; sosyal araştırmalar sayısal modellerden yararlanabilir. Matematiksel bağıntı kullanılması bir araştırmanın olgusal veriye ihtiyacını ortadan kaldırmaz. Bir alanı tanırken yalnız kullandığı aracı değil, iddiasının ne hakkında olduğunu ve hangi yolla gerekçelendirildiğini birlikte incele."
        ]
      },
      {
        "title": "Ürün ve etkinlik yaklaşımlarının düşünürleri",
        "paragraphs": [
          "Reichenbach, Carnap ve Hempel, bilimsel açıklama ve önermelerin mantıksal yapısını inceleyen çalışmalarla ürün olarak bilim başlığında ilişkilendirilir. Bu odakta raporda ne söylendiği, kavramların nasıl çözümlendiği ve kanıtın sonucu nasıl desteklediği araştırılır. Ders kaynaklarının indirgemeci diye adlandırdığı vurgu, bilimleri ortak bir dil veya yöntem içinde açıklama arayışıyla bağlantı kurar.",
          "Kuhn ve Toulmin ise bilimin tarihsel gelişimini, toplulukların problem çözmesini ve insani etkinlik bağlamını öne çıkaran çalışmalarla etkinlik olarak bilim başlığında anılır. Bütüncül vurgu bilimsel pratiği daha geniş ilişkiler içinde anlamaya yönelir. Bu gruplama, anılan düşünürlerin her konuda aynı görüşe sahip oldukları veya ürün ile etkinliğin günlük araştırmada bütünüyle ayrı işler olduğu anlamına gelmez; pasajın hangi bağı çözümlediğini yine açıkça göster."
        ]
      }
    ],
    "examples": [
      {
        "title": "İki hipotezi ayıran karşılaştırma",
        "prompt": "Kurgu veri tablosunda sıcak-kuru ortamda sonuç 4, sıcak-nemli ortamda sonuç 10; soğuk-kuru ortamda 4, soğuk-nemli ortamda 10 birimdir. H1 yalnız sıcaklığın, H2 yalnız nemin sonucu artırdığını öngörüyor. Bu tablo hangi farkı gösterir?",
        "strategy": "Öteki değişken aynıyken tek etkenin değiştiği çiftleri karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Kuru koşulda sıcak-soğuk farkı yok: iki değer de 4. Nemli koşulda da ikisi 10. Bu veri H1’in sıcaklık artışı öngörüsünü desteklemiyor."
          },
          {
            "label": "2. adım",
            "explanation": "Aynı sıcaklıkta nemli koşul 10, kuru koşul 4. Aynı fark soğuk ortamda da var; verilen tabloda nem değişimiyle sonuç artıyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu tablo H2’nin belirtilen öngörüsüyle uyumludur ve iki hipotezi bu koşullarda ayırır. Örnek, kurgu veriye ait sınırlı karşılaştırmadır; gerçek dünyada tek nedeni evrensel kanıtlamaz."
          }
        ],
        "answer": "Verilen koşullarda sıcaklık değil nem farkı sonucu ayırıyor; H2’nin öngörüsü veriyle uyumludur.",
        "check": "Sıcaklık sabitken nemi, nem sabitken sıcaklığı ayrı karşılaştırdık.",
        "pitfall": "Tabloyu gerçek bir canlıya ait evrensel yasa veya bütün olası açıklamaların dışlanması sayma."
      },
      {
        "title": "Birlikte değişen iki etkene dikkat",
        "prompt": "Bir gruba sıcak ve nemli, öteki gruba soğuk ve kuru ortam uygulanıyor. Sonuçlar farklı çıkıyor. Araştırmacı farkı kesin olarak yalnız sıcaklığa bağlıyor. Bu sonuç neden erken?",
        "strategy": "Bir defada kaç değişkenin değiştiğini say.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İki grup arasında hem sıcaklık hem nem farklıdır. Dolayısıyla gözlenen sonuç farkına iki ayrı etken eşlik ediyor."
          },
          {
            "label": "2. adım",
            "explanation": "Yalnız sıcaklığın mı, yalnız nemin mi veya ikisinin ortak etkisinin mi belirleyici olduğu bu iki gruptan tek başına ayrılmaz."
          },
          {
            "label": "3. adım",
            "explanation": "Nem aynıyken sıcaklığı değiştiren veya sıcaklık aynıyken nemi değiştiren yeni karşılaştırmalar gerekir. Bu bir yöntem önerisidir; ilk verinin bütünüyle anlamsız olduğu iddiası değildir."
          }
        ],
        "answer": "İki etken birlikte değiştiği için farkı yalnız sıcaklığa kesin bağlayan dayanak yetersizdir.",
        "check": "Ayırt edici kontrol çiftleri eksiktir; mevcut sonuç farklı açıklamalara açıktır.",
        "pitfall": "Kanıt yetersizliğini hipotezin kesin yanlış olduğuna dönüştürme."
      },
      {
        "title": "Kuramın görevini adından ayır",
        "prompt": "Bir metin, çok sayıda gözlemi ortak ilkelerle açıklayan ve yeni koşullar için öndeyi veren bir yapıdan söz ediyor. “Daha çok deney geçince bu yapı mutlaka yasa adını alır.” sonucunu değerlendir.",
        "strategy": "Betimleme ile açıklama işlevini kesinlik basamağı yerine kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Verilen yapı, geniş bir olgu alanını açıklayan ve öndeyi üreten kuramsal çerçevedir."
          },
          {
            "label": "2. adım",
            "explanation": "Bilimsel yasa ise belirli düzenlilikleri veya ilişkileri ifade edebilir. Kuram ve yasa farklı görevler üstlenir; ikisi aynı merdivenin zorunlu basamakları değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Yeni kanıt bir kuramı güçlendirebilir, sınırlandırabilir veya değiştirebilir. Bu süreç zorunlu ad değişimini gerektirmez."
          }
        ],
        "answer": "Kuramın güçlü destek bulması zorunlu olarak yasaya dönüşmesi demek değildir.",
        "check": "Görev farkı korunuyor; destek derecesi ile kavramın rolü aynılaştırılmıyor.",
        "pitfall": "Kuram sözcüğünü gündelik dildeki temelsiz tahmin anlamına indirgeme."
      },
      {
        "title": "Yanlışlanabilir savı belirle",
        "prompt": "A savı “Bu koşuldaki her örnek ısınınca genleşir.” diyor. B savı “Örnek hangi sonucu verirse versin görünmez etki hep tam o sonucu ister.” diyor; B hiçbir olası bulguyu dışlamıyor. Sınama bakımından fark nedir?",
        "strategy": "Savın hangi mümkün bulguyla uyuşmayacağını sor.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A, koşullar sağlandığında genleşmeme bulgusuyla güçlük yaşar; hangi sonuç beklediği açıktır."
          },
          {
            "label": "2. adım",
            "explanation": "B her sonucu kendisiyle uyumlu saydığı için verilmiş biçiminde deneysel bir karşı bulgu tanımlamaz."
          },
          {
            "label": "3. adım",
            "explanation": "Yanlışlanabilirlik bakımından A riskli ve sınanabilir bir öngörü sunar. Bu, A’nın zaten yanlış olduğunu veya tek deneyde her koşulun tartışmasız bilindiğini göstermez."
          }
        ],
        "answer": "A olası karşı bulguyu dışlar; B verilen biçimiyle her bulguyu kendine uydurur.",
        "check": "Yanlışlanabilir olmak ile fiilen yanlışlanmış olmak ayrı niteliklerdir.",
        "pitfall": "Ölçüm ve yardımcı koşulları inceleme gereğini bütün sınamaları anlamsız yapacak bahaneye çevirme."
      }
    ],
    "recall": [
      {
        "prompt": "Kuram çok desteklenirse zorunlu yasa olur mu?",
        "answer": "Hayır. Kuram açıklama çerçevesi, yasa düzenlilik veya ilişki ifade etme gibi farklı rollere sahiptir; tek bir kesinlik merdiveni değildir."
      },
      {
        "prompt": "İki grupta hem sıcaklık hem nem değiştiğinde tek neden nasıl belirlenir?",
        "answer": "Bu iki gruptan yalnız bir nedeni kesin ayıramayız; öteki etken sabitken karşılaştırma gibi ayırt edici sınama gerekir."
      },
      {
        "prompt": "Yanlışlanabilir olmak zaten yanlış olmak mıdır?",
        "answer": "Hayır. Hangi olası bulgunun savla uyuşmayacağı gösterilebilir; o bulgunun fiilen elde edildiği ayrıca belirtilmelidir."
      },
      {
        "prompt": "Bilimsel bilginin değişebilirliği bütün sonuçları eşit güvensiz yapar mı?",
        "answer": "Hayır. Kanıt gücü ve kullanım koşulları farklıdır; düzeltme olanağı güvenilir denetimin bir parçasıdır."
      }
    ],
    "source": "Aurelia TYT Felsefe 001–006 kopya kâğıtları; MEBİ TYT-AYT Felsefe konu özetlerinin ilgili bölümleri ve OGM Felsefe video ders notları karşılaştırılarak hazırlanmış özgün anlatım ve uygulamalar. Kaynaklardaki kavram ve bilimsel yöntem genellemeleri koşullarıyla açıklanmıştır; sorular resmî sınav sorusu değildir.",
    "title": "Bilim felsefesi: veri, açıklama ve sınama"
  },
  {
    "id": "ahlak-felsefesi",
    "minutes": 105,
    "objectives": [
      "Ahlak, etik ve hukuk sorularını aynı eylemde farklı odaklarla incele.",
      "İyi, özgürlük, irade, sorumluluk, erdem ve vicdanı somut koşullarla ilişkilendir.",
      "Sonuç, ödev ve erdem temelli yaklaşımların neyi ölçüt yaptığını gerekçesiyle ayır.",
      "Özgürlük ve evrensel ahlak tartışmalarını varsayımlarını koruyarak karşılaştır."
    ],
    "sections": [
      {
        "title": "Bir eylemi farklı sorularla incele",
        "paragraphs": [
          "Ece yerde bulduğu cüzdanı sahibine ulaştırıyor. “Ne yaptı?” sorusu eylemi betimler; “Niçin yaptı?” sorusu gerekçesini araştırır; “Bu eylem neden iyi sayılabilir?” sorusu ahlaki ölçüt ister. Aynı görünür davranış farklı gerekçelerle yapılabileceğinden yalnız sonuca bakarak kişinin bütün niyetini kesin olarak bilemeyiz.",
          "Ahlak felsefesi bu örnekte iyi, doğru eylem, niyet, sonuç ve sorumluluk kavramlarını açar. Başlangıçta tek bir yaklaşımı bütün ahlak tartışmasının tartışmasız sonucu saymayacağız. Önce her yaklaşımın hangi soruyu sorduğunu ve hangi gerekçeyi belirleyici gördüğünü anlayacağız; sonra aynı olayda farklı değerlendirmelerin nasıl oluştuğunu karşılaştıracağız."
        ]
      },
      {
        "title": "Ahlak ile etiğin odağını ayır",
        "paragraphs": [
          "Ahlak, kişilerin ve toplulukların yaşamında iyi-kötü veya doğru-yanlış sayılan davranışlar ve kurallarla ilişkilidir. Etik ya da ahlak felsefesi, bu yargı ve kuralların dayanaklarını, kapsamını ve kavramlarını eleştirel biçimde araştırır. Bir toplumda sözünde durmanın beklenmesi ile bu beklentinin niçin haklı olduğunu tartışmak farklı düzeylerdir.",
          "Bu ayrım etik ile ahlak arasında hiçbir ilişki bulunmadığı anlamına gelmez. Etik inceleme gerçek yaşamın sorunlarından başlayabilir ve davranışları düşünme biçimimizi etkileyebilir. Günlük dilde sözcüklerin kullanımı örtüşse de ders sorusunda odak önemlidir: bir kuralı betimlemek mi, kuralın gerekçesini ve evrenselliğini tartışmak mı yapılıyor?"
        ]
      },
      {
        "title": "Betimleyici yargı ile normatif yargı",
        "paragraphs": [
          "“Bu toplulukta yaşlılara sıra veriliyor.” sözü bir davranış örüntüsünü betimler. “Bu durumda sıra vermek gerekir.” sözü ise ne yapılması gerektiğini ileri sürer. İlk yargıdan ikinciye geçmek için gerekçe gerekir; bir uygulamanın var olması onun her koşulda doğru olduğuna tek başına karar vermez.",
          "Normatif yargı kişinin hiçbir gerekçe vermeden beğenisini söylemesiyle eşit değildir. Hangi değerin, hak veya yükümlülüğün dayanak yapıldığını araştırabiliriz. Aynı biçimde bir kuralın geçmişte yaygın olmaması onun yanlış olduğunu otomatik göstermez. Olguyu ve ona ilişkin değerlendirmeyi ayrı yazmak, aradaki gizli değer öncülünü görmeni sağlar."
        ]
      },
      {
        "title": "İyi ve kötü bir ölçüt tartışması açar",
        "paragraphs": [
          "Ahlaki iyi, eylem ve kişilik hakkında değer yargısı kurarken kullanılan temel kavramlardandır. Bir görüş iyiyi mutluluk, bir başkası ödeve uygun niyet veya erdemli karakter üzerinden açıklayabilir. Aynı iyi sözcüğünün geçmesi bu görüşlerin bütün eylemlere aynı ölçütü uyguladığı anlamına gelmez.",
          "İyi bir bıçak keskin olabilir; bu kullanım aracın işlevine ilişkindir. İyi eylem dediğimizde ise ahlaki değerlendirme yaparız. Sözcüğün bağlamdaki görevini ayırmadan araç başarısını ahlaki değerle eşitleme. Bir davranışın planı etkili biçimde gerçekleştirmesi, planın başkalarının haklarına uygun olduğunu kendiliğinden kanıtlamaz."
        ]
      },
      {
        "title": "Özgürlük, irade ve seçenekler",
        "paragraphs": [
          "İrade, bir eylemi isteme ve karar verme ile; özgürlük ise eylemin hangi anlamda kişinin kendisine ait veya seçeneklere açık sayılacağıyla ilişkilidir. Kapıyı istemeden çarpması ile bilerek kapatması aynı görünür sonuca yol açabilir. Fakat amaç, bilgi ve karar süreci farklı olduğu için sorumluluk tartışması da değişir.",
          "Seçenek bulunması tek başına kişinin her bakımdan sınırsız özgür olduğunu göstermez. Bilgi eksikliği, baskı, alışkanlık ve toplumsal koşullar karar üzerinde rol oynayabilir. Bir modelde yalnız bildiği seçenekler arasında baskı olmadan seçim yapması verilmişse bunun ötesinde bütün metafizik özgürlük sorunlarının çözüldüğünü söylemeyiz; koşulları açıkça sınırlarız."
        ]
      },
      {
        "title": "Sorumluluğu bilgi ve denetimle birlikte oku",
        "paragraphs": [
          "Sorumluluk tartışmasında kişinin ne bildiği, neyi amaçladığı, hangi seçeneklere sahip olduğu ve eylem üzerindeki denetimi önemlidir. Bilerek zarar vermek ile eldeki makul bilgiye rağmen öngörülemeyen bir kazaya karışmak aynı değerlendirmeyi gerektirmeyebilir. Önce olayda hangi bilgi ve denetim koşullarının verildiğini çıkar.",
          "Baskı veya bilgisizlik her durumda sorumluluğu otomatik sıfırlar demek de aşırıdır. Baskının derecesi, bilgiye ulaşma olanağı ve ihmal gibi ayrımlar gerekebilir. Uygulamadaki örnekler belirli koşulları görünür kılar; bir insanın bütün ahlaki ya da hukuki sorumluluğunu yalnız iki düğmeden hesaplayan genel bir yargıç değildir."
        ]
      },
      {
        "title": "Vicdan ve ahlaki farkındalık",
        "paragraphs": [
          "Vicdan, kişinin davranışını kendi içinde iyi-kötü açısından değerlendirmesi ve kendisini bir yükümlülük karşısında hissetmesiyle ilişkilidir. Sözünü tutmadığında bundan rahatsız olan kişi eylemine geri dönüp kendisini sorgulayabilir. Bu iç denetim, dışarıdan ödül veya ceza beklemekten farklı bir gerekçe olabilir.",
          "Vicdanın nasıl oluştuğu ve ne kadar güvenilir olduğu da felsefi tartışmalara açıktır. Bir kişinin içtenlikle doğru bulması, davranışın bütün kişiler için tartışmasız doğru olduğunu tek başına kanıtlamaz. İç değerlendirmeyi anlamakla onu eleştiriden bütünüyle muaf tutmak farklıdır; vicdanın kullandığı ölçüt ve öğrendiği değerler de incelenebilir."
        ]
      },
      {
        "title": "Erdem, karakter ve alışkanlık",
        "paragraphs": [
          "Erdem, iyi yaşam ve iyi eylemle ilişkili karakter özelliklerini düşünme biçimidir. Dürüstlük, adalet veya cesaret gibi nitelikler tek bir davranıştan daha kalıcı bir yönelimi ifade edebilir. Bir kez doğruyu söylemek, kişinin her durumda dürüst bir karakter geliştirdiğini hemen kanıtlamaz; davranışın sürekliliği ve gerekçesi önemlidir.",
          "Erdemli alışkanlık düşünmeden aynı hareketi tekrarlamak değildir. Farklı koşullarda uygun eylemi kavrama ve seçme becerisi gerektirebilir. Cesaret tehlikeyi hiç fark etmemek, ölçülülük bütün istekleri yok etmek demek değildir. Karakter yaklaşımını anlamak için yalnız ne yapıldığına değil nasıl bir kişi olmanın amaçlandığına da bak."
        ]
      },
      {
        "title": "Niyet, eylem ve sonucu ayrı yaz",
        "paragraphs": [
          "Bir kişi yardım etmek isterken yanlış bilgiyle zarara yol açabilir; başka biri yalnız ödül almak için yararlı bir iş yapabilir. Niyet, yapılan eylem ve ortaya çıkan sonuç bu örneklerde aynı yönde gitmez. Ahlaki yaklaşımlar bu ögelerden hangisine neden öncelik verdikleri bakımından ayrılabilir.",
          "İyi niyet her zararı önemsiz yapmaz; yararlı sonuç da her yöntemi otomatik haklı kılmaz. Değerlendirmede kullanılan ölçütü açık tut. Bir pasaj kişinin yaptığı iyiliği sırf kazanç için seçtiğini eleştiriyorsa niyeti öne çıkarabilir; toplam yararı karşılaştırıyorsa sonuçları ölçüt yapıyor olabilir. Eylemin adını değil gerekçenin rolünü izle."
        ]
      },
      {
        "title": "Sokrates: bilgi ve iyi yaşam",
        "paragraphs": [
          "Sokrates ile ilişkilendirilen ahlak anlayışında erdem ve bilgi arasındaki bağ önemlidir. Kişinin iyi olanı gerçekten kavraması ile iyi yaşaması arasında güçlü bir ilişki kurulur; kendini ve savunduğu değerleri sorgulama temel yöntemlerden biridir. Bu yaklaşımı yalnız çok bilgi ezberleyen herkesin ahlaken kusursuz olduğu biçiminde basitleştirme.",
          "Burada iyiye ilişkin kavrayış, yaşamı sorgulama ve eylemin dayanağı söz konusudur. Diyalogda bir kişinin cesareti önce her tehlikeye atılmak sayıp sonra bu tanımı incelemesi, bilme ile davranma ilişkisini görünür kılabilir. Düşünürün görüşünü tanımak ile bütün çağdaş ahlak problemlerinin tek bir formülle çözüldüğünü savunmak farklıdır."
        ]
      },
      {
        "title": "Aristoteles: erdem ve ölçülü seçim",
        "paragraphs": [
          "Aristoteles için iyi yaşam ve mutluluk, insanın işlevi ve erdemli etkinliğiyle ilişkilidir. Karakter erdemleri alışkanlıkla gelişir; uygun eylem koşula, kişiye ve akla uygun seçime bağlıdır. Cesaretin korkaklık ile gözü karalık arasında düşünülmesi, iki uçtan kaçınan bir karakter tutumunu örnekler.",
          "Orta, her olayda iki miktarın aritmetik ortalamasını almak demek değildir. Her eylemin bir erdemli orta biçimi olduğu da söylenmez; örneğin haksızlığın yarısını yapmak onu erdemli kılmaz. Ölçü, eylemin ne zaman, kime, hangi nedenle ve nasıl yapıldığına göre anlaşılır. Bu koşulları silmek erdem öğretisini basit bir sayı kuralına çevirir."
        ]
      },
      {
        "title": "Haz ve mutluluk yaklaşımları",
        "paragraphs": [
          "Hedonist yaklaşımlar hazla iyi yaşam arasında ilişki kurar; ancak hazzın niteliği ve nasıl yaşanacağı konusunda bütün düşünürler aynı şeyi söylemez. Aristippos ile Epikuros aynı başlıkta anılsa da Epikuros’un ölçülülük, gereksiz kaygılardan uzaklaşma ve ruh dinginliği vurgusu sınırsız tüketim sloganıyla eşit değildir.",
          "Mutluluğu anlık yoğun heyecandan ibaret saymak farklı ahlak anlayışlarının hedeflerini karıştırabilir. Bir yaklaşım uzun vadeli dinginliği, başka biri erdemli etkinliği veya ortak yararı öne çıkarabilir. Soruda haz, mutluluk ve yarar sözcüklerinden birini görünce bütün görüşleri tek etikete bağlama; hangisinin ne için iyi sayıldığını tam cümlede incele."
        ]
      },
      {
        "title": "Kant: ödev ile ödeve uygunluk",
        "paragraphs": [
          "Kant ile ilişkilendirilen ödev ahlakında eylemin ahlaki değeri yalnız dışarıdan görünen yarara değil, ödevden dolayı yapılmasına bağlanır. Birinin doğruyu yalnız itibarını korumak için söylemesi ile doğru söylemeyi yükümlülük bildiği için seçmesi aynı görünür davranışta farklı niyetlerdir. Bu ayrım, davranışın dış uygunluğu ile gerekçesini ayırır.",
          "Ödevden yapılmayan her davranışı otomatik kötü saymak bu ayrımı bozar. Bir eylem ödeve uygun olabilir, ancak belirleyici nedeni çıkar veya eğilimse Kant’ın özel anlamında ahlaki değer farklı değerlendirilir. Bir kuralın evrensel olmasını isteyebilme ve insanı yalnız araç olarak görmeme ilkeleri, bu yaklaşımın gerekçe incelemesinde önemlidir."
        ]
      },
      {
        "title": "Sonuççu ve faydacı değerlendirme",
        "paragraphs": [
          "Faydacı yaklaşımlarda eylem veya kuralın etkilediği kişiler açısından yarar ve zararlarını değerlendirmek önemlidir. Yalnız eylemi yapanın kazancı değil daha geniş sonuçlar hesaba katılır. Bentham ve Mill bu gelenekte anılır; hazzın niteliği ve yararın nasıl değerlendirileceği konusunda farklı vurgular taşıyabilirler.",
          "Sonuçları ölçüt yapmak her durumda istediğin kişiyi feda etmenin tartışmasız doğru olduğu anlamına gelmez; haklar, hesap belirsizliği ve kuralların uzun vadeli etkileri ciddi tartışmalardır. Bir örnekte toplam yarar veriliyorsa hangi kişilerin ve hangi sonuçların dahil edildiğini belirt. Eksik veriden bütün ahlaki sorunları çözen kesin bir puan üretme."
        ]
      },
      {
        "title": "Egoizm, nihilizm ve anarşizmi karıştırma",
        "paragraphs": [
          "Etik egoizm ahlaki değerlendirmede kişinin kendi çıkarını öne çıkaran normatif görüşlerle ilişkilidir. Bu, insanların fiilen her zaman bencil davrandığını ileri süren psikolojik bir betimlemeyle aynı değildir. Bir görüşün nasıl davranıldığını mı yoksa nasıl davranılması gerektiğini mi savunduğunu ayırmak gerekir.",
          "Nihilizm belirli ahlaki değer veya bağlayıcı temellerin reddiyle, anarşizm ise siyasal otoritenin meşruiyetine yönelen farklı eleştirilerle ilişkilendirilebilir. Anarşizmi yalnız düzensizlik isteği veya bütün yardımlaşmayı reddetmek diye sunmak doğru değildir. Kaynak sınıflamasındaki başlıkları bağlamıyla oku; ayrı görüşleri tek kötü insan etiketi altında toplama."
        ]
      },
      {
        "title": "Evrensel ilke ile farklı uygulama",
        "paragraphs": [
          "Evrensel ahlak yasası tartışmasında herkes için bağlayıcı bir ahlaki ilkenin mümkün olup olmadığı sorulur. Bazı yaklaşımlar akıl, insan doğası veya ortak değer üzerinden böyle bir temel savunur; başka görüşler değişen koşul ve değerlere dikkat çeker. Bir görüşün bu tartışmadaki dayanağını görmek, yalnız evet-hayır cevabını ezberlemekten önemlidir.",
          "Aynı ilkenin farklı ihtiyaçlarda farklı eylemler gerektirmesi otomatik çelişki değildir. İhtiyaca uygun yardım ilkesi, farklı gereksinimlere farklı miktar verilmesini destekleyebilir. Tersine farklı toplumlarda farklı uygulama bulunması da tek başına hiçbir evrensel ilkenin savunulamayacağını mantıksal olarak kanıtlamaz. Betimlenen fark ile çıkarılan felsefi sonucu ayır."
        ]
      },
      {
        "title": "Özgürlük yaklaşımlarının sorusunu açık tut",
        "paragraphs": [
          "Belirlenimcilik, ilgili yasalar ve tam önceki koşullar verildiğinde sonucun bu koşullarca belirlendiğini savunur; yalnız herhangi bir nedensel ilişki bulunduğunu söylemekle sınırlı değildir. Katı belirlenimci yorumlar özgür iradeye karşı çıkabilir; bağdaşırcı yorumlar ise nedensel belirlenim ile belirli bir özgürlük anlayışını birlikte savunabilir. Bu yüzden her belirlenimci görüşü tek cümleyle bütün sorumluluğu reddeden görüş saymak aşırıdır.",
          "Belirlenimsizlik rastlantı olasılığına yer açar; fakat bir kararın rastgele olması onun kişi tarafından özgürce denetlendiğini tek başına kanıtlamaz. Otodeterminizm kişinin kendisini akılla belirlemesiyle, kadercilik ise sonucun kaçınılmazlığına ilişkin farklı bir vurguyla ele alınır. Metafizik özgür irade savı ile siyasal özgürlük öğretisinin ad benzerliğini de birbirine karıştırma."
        ]
      },
      {
        "title": "Ahlak ve hukuk aynı ölçüt değildir",
        "paragraphs": [
          "Bir davranışın yürürlükteki hukuka uygunluğu ile ahlaki bakımdan gerekçelendirilmesi farklı sorulardır. Hukuki düzen belirli kurumlar ve yaptırımlarla işler; ahlaki değerlendirme vicdan, değer ve yükümlülükler üzerinden daha geniş sorular sorabilir. Yasaların kendisinin adil olup olmadığı da tartışılabilir.",
          "Bu ayrım hukuku önemsiz veya her ahlaki itirazı kendiliğinden haklı yapmaz. Somut olayda hangi kuralın yürürlükte olduğu, hangi değerin ileri sürüldüğü ve itirazın neye dayandığı açıkça incelenmelidir. Uygulamadaki kavram örnekleri hukuki danışmanlık değildir; öğrenciye yasal durum ile ahlaki dayanağın farklı tür sorular olduğunu öğretir."
        ]
      },
      {
        "title": "Türk-İslam düşüncesinde ahlaki yönelimler",
        "paragraphs": [
          "Fârâbî’de mutluluk, akıl ve erdemli yaşamın toplumsal boyutu; Ahmet Yesevî, Mevlânâ, Yunus Emre ve Hacı Bektaş Velî ile ilişkilendirilen öğretimlerde insan sevgisi, kendini tanıma ve davranış sorumluluğu dersin önemli örneklerindendir. Bu adları tek bir cümlede aynı felsefi sistemin bütünüymüş gibi birleştirmek yerine verilen pasajdaki vurguyu araştır.",
          "Bir şiir veya öğütte sevgi, ölçülülük veya nefsini denetleme öne çıkabilir. Soruda istenen ilkeyi metnin açık kanıtıyla ilişkilendir; kişiye atfedilen popüler bir sözü doğrulamadan kaynak gibi kullanma. Tarihsel bir öğretinin güncel bir örneğe nasıl ışık tuttuğunu göstermek, yalnız düşünür adını davranışa yapıştırmaktan daha öğreticidir."
        ]
      },
      {
        "title": "Bir ahlaki tartışmayı adım adım çöz",
        "paragraphs": [
          "Önce eylemi, kişilerin bilgisini, niyetini, seçeneklerini ve verilen sonuçları ayrı yaz. Sonra pasajın kullandığı ölçütü belirle: doğru kuralı ödev bilmek, geniş sonuçları tartmak veya erdemli karakter geliştirmek mi vurgulanıyor? Aynı eylemin bu ölçütlerde farklı yönlerden incelenebileceğini göster.",
          "Sonucun kapsamını sınırlı kur. Yalnız cüzdanı geri verdiği bilinen kişiye bütün yaşamı boyunca erdemli veya bütünüyle çıkarcı etiketi konulamaz. Modelde gerekçe değiştiğinde değişen şey, metinde verilen değerlendirme odağıdır; uygulama insanlara ahlaki puan dağıtmaz. Öğrenci kendi savını dayanak, itiraz ve cevapla geliştirmeyi öğrenir."
        ]
      },
      {
        "title": "Bergson ve etik sezginin odağı",
        "paragraphs": [
          "Bergson ile ilişkilendirilen etik sezgi vurgusunda iyiye yöneliş yalnız dışarıdan mekanik bir kuralı tekrarlamakla açıklanmaz. Ahlaki kavrayış, yaratıcı kişilikler ve başkalarına açılan daha geniş bir insanlık duygusuyla birlikte düşünülebilir. Kaynağın sezgicilik başlığı bu aracısız kavrayış yönünü tanıtır; bunu herhangi bir anda hoşuna gelen her şeyin yanılmaz ahlak kuralı olması biçiminde okumamalısın.",
          "Bergson’da kapalı toplumun alışkanlık ve baskı yönü ile açık ahlakın yaratıcı yönelimi arasında ayrım bulunur. Burada sezgi bir sınavda gerekçe vermeyi gereksiz sayan sihirli cevap değildir; düşünürün ahlaki kavrayışı nasıl açıkladığı sorusudur. Bilgi felsefesindeki sezgi tartışmasıyla ilişki kurulabilir, fakat iyi eylemin dayanağını araştırmak ile bir yargının bilgi kaynağını sormak aynı problem değildir."
        ]
      },
      {
        "title": "Spinoza ve Nietzsche farklı sorular açar",
        "paragraphs": [
          "Spinoza’da insan doğanın zorunlu düzeninin dışında yer alan bağımsız bir krallık değildir. Duyguların nedenlerini anlamak ve akla uygun kavrayışı geliştirmek, edilgin yaşama karşı özgürleşme düşüncesiyle ilişkilidir. Bu çerçeveyi kişisel bir hükümdarın keyfî buyruklarına itaat etmekle eşitleme; Tanrı veya doğa anlayışıyla zorunluluk ve anlama ilişkisi birlikte düşünülür.",
          "Nietzsche, yerleşik ahlaki değerlerin nereden geldiğini, hangi yaşam biçimini desteklediğini ve kişinin değer oluşturma gücünü sorgular. Onun eleştirisini hiçbir değerin hiçbir biçimde olamayacağı veya her başıboş isteğin eşit değerli olduğu sloganına indirgemek doğru değildir. Bu iki düşünürü aynı tutum etiketiyle birleştirmek yerine birinde zorunluluğun anlaşılması, diğerinde değerlerin kökeni ve yeniden değerlendirilmesi sorusunu takip et."
        ]
      },
      {
        "title": "İyilik ve mutluluğun farklı dayanakları",
        "paragraphs": [
          "Demokritos’ta ruh dinginliği ve aşırılıklardan uzak durma, mutluluk düşüncesinin önemli bir yönüdür. Platon’da iyi ideasıyla ilişki ve erdemli yaşam; Fârâbî’de kendi başına amaç olan mutluluk ile akıl ve erdem bağı öne çıkar. Bu öğretilerde mutluluk her an yoğun haz yaşamakla özdeş değildir. Aynı mutluluk sözcüğünün arkasında farklı insan ve iyi yaşam anlayışları bulunabilir.",
          "Descartes, yapılan iyiliğin içsel memnuniyetle, kötülüğün pişmanlıkla ilişkisini ele alır. Bu ilişkiyi sırf memnun hissettiğim her şey iyidir sonucuna çevirmemek gerekir; kişinin iyi yaşamı ve aklını kullanması daha geniş bir bağlam taşır. Önce düşünürün iyi, erdem, niyet ve mutluluğu nasıl bağladığını göster; sonra aynı eylemi bu ölçütlere göre karşılaştır. Böylece isimleri yalnız kısa sloganlarla eşlemek yerine gerekçelerini öğrenirsin."
        ]
      }
    ],
    "examples": [
      {
        "title": "Aynı iade, farklı gerekçe",
        "prompt": "Ece cüzdanı sahibine veriyor. Bir anlatımda bunu ödül almak için, başka anlatımda başkasının hakkına saygıyı yükümlülük bildiği için yaptığı açıkça veriliyor. Kant açısından farkı açıkla.",
        "strategy": "Dış davranış ile eylemin belirleyici niyetini ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İki anlatımda da cüzdan iade edilmiştir; dış davranış aynı kalır. Ödül gerekçesinde kişisel kazanç belirleyicidir."
          },
          {
            "label": "2. adım",
            "explanation": "Diğer anlatımda eylem ödev bildiği için seçilir. Kant’ın ahlaki değer tartışmasında bu niyet farkı önemlidir."
          },
          {
            "label": "3. adım",
            "explanation": "Ödül amacıyla iadenin dışarıdan ödeve uygun olması mümkündür. Bu eylemi yalnız niyet ayrımı nedeniyle otomatik hırsızlık veya kötü davranış diye adlandıramayız."
          }
        ],
        "answer": "Kant açısından ödevden dolayı eylemek ile çıkar için ödeve uygun davranmak farklıdır.",
        "check": "Eylemin sonucu sabit; farklılaşan niyet ve değerlendirme ölçütüdür.",
        "pitfall": "Ödevden yapılmayan her davranışı otomatik ahlaken kötü sayma."
      },
      {
        "title": "Sonuç ile karakter odağını ayır",
        "prompt": "Bir kişi yardım seçeneğini daha çok kişinin zararını azalttığı için seçiyor. Başka kişi aynı yardımı adaletli ve cömert bir karakter geliştirmek amacıyla seçiyor. Hangi odaklar ayrılıyor?",
        "strategy": "Eylemi aynı tutup gerekçede değerlendirilen şeyi bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk gerekçede eylemin etkilenenler üzerindeki sonuçları karşılaştırılıyor; toplam zarar ve yarar öne çıkıyor."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci gerekçede nasıl bir kişi olunacağı ve hangi karakter özelliklerinin geliştirileceği inceleniyor; erdem odağı belirginleşiyor."
          },
          {
            "label": "3. adım",
            "explanation": "Aynı eylem farklı gerekçelerle seçilebilir. Bu örnek, bütün sonuççu veya erdemci kuramların her olayda karşıt karar vereceği iddiası değildir."
          }
        ],
        "answer": "İlkinde sonuç değerlendirmesi, ikincisinde erdem ve karakter odağı öne çıkıyor.",
        "check": "Yardım etme fiili aynı olduğu hâlde gerekçe cümleleri farklıdır.",
        "pitfall": "Görünür eylemi okuyup bütün niyeti kendiliğinden bildiğini varsayma."
      },
      {
        "title": "Bilgi ve denetim koşulunu görünür yap",
        "prompt": "Bir kişi bir ilacın zararlı olduğunu biliyor ve özgürce kullanmamayı seçebiliyor. İkinci anlatımda kutunun içeriği kendisinden gizlenmiş ve farklı bir madde verildiği makul biçimde sanılıyor. Sorumluluk sorusunda ne yeniden incelenir?",
        "strategy": "Görünür sonuçtan önce kişinin bilgi ve denetim koşullarını çıkar.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk anlatımda riskin bilindiği ve seçeneğin bulunduğu açıkça verilmiştir. İkinci anlatımda eylemin dayandığı bilgi koşulu değişmiştir."
          },
          {
            "label": "2. adım",
            "explanation": "Bu fark, niyet ve öngörülebilirlik değerlendirmesini etkileyebilir. Kişiye doğru bilginin ulaşma olanağı ve ihmal olup olmadığı ayrıca sorulabilir."
          },
          {
            "label": "3. adım",
            "explanation": "Veri eksikse otomatik tam sorumlu veya hiç sorumsuz kararı vermeyiz. Açıklanan şey, hangi koşulun ahlaki incelemede önem kazandığıdır."
          }
        ],
        "answer": "Bilgi, öngörülebilirlik ve denetim koşulları yeniden değerlendirilmelidir.",
        "check": "Aynı dış sonuç kişinin aynı şeyi bildiğini göstermez.",
        "pitfall": "Bilgisizlik kelimesini her durumda sorumluluğu sıfırlayan bir düğme gibi kullanma."
      },
      {
        "title": "İhtiyaca göre farklı pay ve evrensel ilke",
        "prompt": "Bir yardım ilkesi “Aynı temel ihtiyacı karşılamak için gereksinimi fazla olana daha fazla destek ver.” diyor. A’nın gereksinimi sekiz, B’nin gereksinimi dört birim. İlkeyle A’ya sekiz, B’ye dört verilmesi yalnız miktarlar farklı diye tutarsız mıdır?",
        "strategy": "İlkenin aynı koşulda ne istediğini, miktarla neyi amaçladığını ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlke eşit miktar dağıtmayı değil gereksinime uygun destek vermeyi amaçlıyor. İhtiyaçlar örnekte farklıdır."
          },
          {
            "label": "2. adım",
            "explanation": "Her iki kişi için aynı gerekçe uygulanır: gereksinimi kadar temel desteği sağlamak. Farklı miktar, bu ilke altında farklı keyfî ölçüt demek değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Bu nedenle yalnız sekiz ve dört sayılarının farklı oluşundan çelişki çıkarılamaz. İlkenin kendisinin en iyi adalet anlayışı olup olmadığı ayrı tartışmadır."
          }
        ],
        "answer": "Aynı ilke farklı ihtiyaçlarda farklı miktar gerektirebilir; salt miktar farkı tutarsızlık değildir.",
        "check": "Koşul ve ilke eşleşmesi sağlandı; kişi adına göre gerekçesiz ayrıcalık konmadı.",
        "pitfall": "Evrensel ilkeyi her durumda sonuçların sayısal olarak özdeş olmasıyla eşitleme."
      }
    ],
    "recall": [
      {
        "prompt": "Aynı dış eylem aynı ahlaki gerekçeyi kesin gösterir mi?",
        "answer": "Hayır. Niyet, bilgi, seçenek ve hedeflenen sonuçlar farklı olabilir; verilen bağlamı ayrı incelemek gerekir."
      },
      {
        "prompt": "Kant açısından ödevden yapılmayan her eylem otomatik kötü müdür?",
        "answer": "Hayır. Eylem ödeve uygun olabilir; ödevden dolayı yapılma ile dış uygunluk ahlaki değer incelemesinde ayrılır."
      },
      {
        "prompt": "Aristoteles’in ortası her durumda aritmetik ortalama mıdır?",
        "answer": "Hayır. Uygun kişi, zaman, neden ve biçime göre akla uygun ölçü söz konusudur; her davranışın erdemli yarısı yoktur."
      },
      {
        "prompt": "Belirlenimcilik ile kadercilik aynı iddia mıdır?",
        "answer": "Hayır. Nedensel koşullanma, sonuçların eylemden bağımsız kaçınılmazlığı ve özgürlükle bağdaşma ayrı sorunlardır."
      }
    ],
    "source": "Aurelia TYT Felsefe 001–006 kopya kâğıtları; MEBİ TYT-AYT Felsefe konu özetlerinin ilgili bölümleri ve OGM Felsefe video ders notları karşılaştırılarak hazırlanmış özgün anlatım ve uygulamalar. Kaynaklardaki kavram ve bilimsel yöntem genellemeleri koşullarıyla açıklanmıştır; sorular resmî sınav sorusu değildir.",
    "title": "Ahlak felsefesi: eylem, gerekçe ve sorumluluk"
  }
];

interface QuestionRow020 { passage: string; prompt: string; correct: string; distractors: string[]; hint: string; explanation: string; }
const questionRows020: Record<string, QuestionRow020[]> = {
  "felsefeyi-tanima": [
    {
      "passage": "Bir öğrenci bir resim için önce hangi yılda yapıldığını araştırıyor. Ardından hangi niteliğin bir resmi güzel saymak için yeterli olacağını tartışıyor.",
      "prompt": "İkinci araştırmanın felsefi yönünü en iyi belirten açıklama hangisidir?",
      "correct": "Güzelliğin ölçütünü kavramsal ve gerekçeli biçimde soruşturması",
      "distractors": [
        "Yalnız resmin tarihini daha kesin ölçmesi",
        "Her güzel resmin aynı yılda yapıldığını varsayması",
        "Kendi beğenisini gerekçe istemeden herkese zorunlu kılması",
        "Resmin maddi varlığını bir laboratuvar deneyiyle ölçmesi"
      ],
      "hint": "İstenen bilgi bir olayın tarihi mi, bir değerlendirme ölçütü mü?",
      "explanation": "İlk soru olgusal tarih bilgisi ister. İkinci soru güzellik kavramını ve onu değerlendirme ölçütünü açar. Belirleyici olan soru eki değil gerekçe ve kavram araştırmasıdır."
    },
    {
      "passage": "“Bu yazarın savı neden bana ikna edici geliyor? Onu değerlendirirken kendi kullandığım ölçütün dayanağını da incelemeliyim.” diyen bir okur, kendi değerlendirmesine geri dönüyor.",
      "prompt": "Metinde özellikle gösterilen düşünme özelliği hangisidir?",
      "correct": "Refleksif olma",
      "distractors": [
        "Yalnız duyusal ölçüm yapma",
        "Geçmiş düşünceleri tartışmasız ezberleme",
        "Gerekçeyi kişiden bağımsız reddetme",
        "Her soruda çoğunluğun oyunu arama"
      ],
      "hint": "Düşüncenin bu kez neyi inceleme konusu yaptığını bul.",
      "explanation": "Okur yalnız yazarın görüşüne değil kendi değerlendirme yöntemine yöneliyor. Düşüncenin kendi dayanağını incelemesi refleksiyonun ayırt edici örneğidir."
    },
    {
      "passage": "Bir düşünür “Bütün kararlar aynı koşuldaki kişilere aynı gerekçeyle uygulanmalı.” diyor; sonra aynı koşuldaki dostuna, yalnız dostu olduğu için bu kuraldan istisna tanıyor.",
      "prompt": "Bu iki tutum birlikte değerlendirildiğinde doğrudan hangi sorun görülür?",
      "correct": "Sav ile uygulama arasında tutarlılık sorunu",
      "distractors": [
        "Bir olgunun ölçüm biriminin eksikliği",
        "Bütün görüşlerin birbirinin aynısı olması",
        "Her ahlaki ilkenin tarihsel olarak ortadan kalkması",
        "Farklı koşullara farklı karar verilmesinin zorunluluğu"
      ],
      "hint": "İkinci örnekte koşulların aynı kaldığı özellikle belirtiliyor.",
      "explanation": "İlk sav aynı koşulda aynı gerekçeyi isterken ikinci tutum yalnız yakınlık nedeniyle gerekçesiz istisna koyar. Sorun koşul değişmesi değil savın kendi uygulamasıyla bağdaşmamasıdır."
    },
    {
      "passage": "Bir düşünür özgürlüğü nasıl anladığını açıklıyor, sorumluluk görüşünü bu tanıma bağlıyor ve insan anlayışını ikisiyle ilişkilendiriyor. Yargılar rastgele değil birbirini destekleyen bir yapı kuruyor.",
      "prompt": "Parçada hangi özellik doğrudan vurgulanır?",
      "correct": "Sistemlilik",
      "distractors": [
        "Bütün sonuçların deneyle kesinleşmesi",
        "Her yargının çoğunlukça onaylanması",
        "Yalnız anlık duyguyla karar verilmesi",
        "Soru sormanın bütünüyle sona ermesi"
      ],
      "hint": "Kavramların birbirine nasıl bağlandığını oku.",
      "explanation": "Özgürlük tanımı, sorumluluk ve insan anlayışı ilişkili bir bütün oluşturur. Sistemlilik başlıkların görünüşünden değil düşünceler arasındaki bu bağlantılardan doğar."
    },
    {
      "passage": "Bir öğrenci “Bir açıklamayı yıllardır duymam onu doğru saymam için tek başına yetmez. Hangi öncüllere dayandığını ve sonucu destekleyip desteklemediğini inceleyeceğim.” diyor.",
      "prompt": "Bu tutumun eleştirel olmasını sağlayan nokta hangisidir?",
      "correct": "Savın gerekçesini ve çıkarım bağını denetlemesi",
      "distractors": [
        "Eski olduğu için her düşünceyi peşinen yanlış sayması",
        "Savı söyleyen kişiye hakaret ederek cevap vermesi",
        "Bütün görüşlerin gerekçesiz eşit olduğunu ilan etmesi",
        "Yalnız kendisinin hiç yanılmayacağını ileri sürmesi"
      ],
      "hint": "Eleştiri ile gerekçesiz reddedişi ayır.",
      "explanation": "Öğrenci eskiliği tek başına doğruluk ölçütü saymıyor ve savın dayanağına yöneliyor. Eleştiri burada kişiye saldırmak veya alışılmış olanı sırf alışılmış diye reddetmek değildir."
    },
    {
      "passage": "Bir kişi “Hepimiz adaleti tartışabiliriz; ancak farklı toplumlarda farklı cevaplar verilmiş olması anlaşılırdır. Ortak soru, tek bir cevabın herkesçe zaten kabul edildiği anlamına gelmez.” diyor.",
      "prompt": "Bu açıklama hangi ayrımı korur?",
      "correct": "Felsefi soruların evrenselliği ile cevapların özdeşliği ayrımını",
      "distractors": [
        "Konuya ilişkin bütün görüşlerin tarih dışı olması gerektiğini",
        "Evrensellik için herkesin aynı sonuca varmasının zorunlu olduğunu",
        "Farklı cevaplar varsa ortak soru bulunamayacağını",
        "Sorunun yalnız tek kişiyi ilgilendirmesinin evrensellik olduğunu"
      ],
      "hint": "Bir soruya açık olmak ile aynı cevapta birleşmek farklıdır.",
      "explanation": "Adalet sorusu başkalarının da tartışmasına açılır. Bu evrensel ilgi, bütün tarihsel bağlamlarda aynı yanıtın verildiği iddiasını gerektirmez."
    },
    {
      "passage": "Bir filozof kendinden önceki görüşe yeni bir itiraz getiriyor. Başka bir filozof eski soruyu farklı bir kavramla yeniden kuruyor. Eski görüşler yeni tartışmalarda hâlâ değerlendiriliyor.",
      "prompt": "Bu süreç felsefenin hangi yönünü örnekler?",
      "correct": "Yığılımlı gelişmesini",
      "distractors": [
        "Önceki bütün görüşlerin hiçbir iz bırakmadan silinmesini",
        "Yeni bir sorunun artık hiç sorulamamasını",
        "Her kuşakta bütün cevapların özdeş kalmasını",
        "Yalnız son düşünürün geçmişsiz biçimde başlamasını"
      ],
      "hint": "Eski tartışmanın yeni görüş içinde nasıl yer aldığını incele.",
      "explanation": "Yeni itirazlar ve kavramlar önceki düşüncelerle ilişki kurar. Eski görüşün tartışılmaya devam etmesi hiç gelişme olmadığı anlamına gelmez; birikim bu konuşmanın parçasıdır."
    },
    {
      "passage": "Deniz “Gökyüzündeki değişime şaşırdım; şimdi değişim dediğimiz şeyin ne olduğunu ve aynı kalan bir şey olup olmadığını soruyorum.” diyor.",
      "prompt": "Parçadaki şaşırmanın düşünmedeki rolü hangisidir?",
      "correct": "Hayretin kavramsal sorgulamaya başlangıç sağlaması",
      "distractors": [
        "Şaşırmanın ileri sürülen her cevabı otomatik doğrulaması",
        "Gözlenen olayın artık hiç araştırılamayacağını göstermesi",
        "Her gökyüzü sorusunun yalnız takvim hesabı olması",
        "Kavram sormanın bütün duyusal bilgiyi yok etmesi"
      ],
      "hint": "Duygu düşünmeyi başlatabilir; sonucun kanıtı olmak zorunda değildir.",
      "explanation": "Deniz hayretini değişim ve kalıcılık sorusuna dönüştürüyor. Şaşırmak herhangi bir cevabın doğruluğunu kanıtlamaz; sorgulamayı başlatan rolü gösterilir."
    },
    {
      "passage": "Bir araştırma ortamı için şu soru soruluyor: “Katılımcının rızasını almadan onun örneğini kullanmak neden doğru veya yanlış sayılmalıdır?”",
      "prompt": "Bu sorunun doğrudan yöneldiği alan hangisidir?",
      "correct": "Ahlak felsefesi",
      "distractors": [
        "Varlığın kaç temel ilkeden oluştuğunu araştıran ontoloji",
        "Bir sanat eserinin güzel olma koşulunu araştıran sanat felsefesi",
        "Yalnız örneğin hacmini ölçen deney işlemi",
        "Dilbilgisinde eklerin biçimini araştıran çalışma"
      ],
      "hint": "Araştırma ortamına değil sorulan değer ve eylem ölçütüne bak.",
      "explanation": "Soru rıza, doğru eylem ve ahlaki gerekçeyi konu edinir. Laboratuvarda geçmesi onu otomatik bilimsel yöntem sorusu yapmaz; odak ahlak felsefesidir."
    },
    {
      "passage": "Bir okur önce kitabın cümlelerini fark ediyor. Sonra “Bu cümleleri niçin kendi beklentilerime göre yorumladığımın farkına vardım.” diyor.",
      "prompt": "İkinci cümlede özellikle hangi yönelim vardır?",
      "correct": "Kendi yorumlama etkinliğinin farkına varma",
      "distractors": [
        "Yalnız kitaptaki harf sayısını dışarıdan ölçme",
        "Başka hiçbir düşünceyi artık anlamanın mümkün olmaması",
        "Kendi beklentisinin her yargıyı doğru yaptığını kanıtlama",
        "Kitabın fiziksel olarak var olmadığını ilan etme"
      ],
      "hint": "Farkındalık bu kez dış nesneden hangi etkinliğe dönüyor?",
      "explanation": "Okur kendi yorumlama biçiminin farkına varmıştır. Bu, öz bilinçle ilişkili bir yönelimdir; yalnız kitabı görme veya kendi beklentisini yanılmaz sayma değildir."
    }
  ],
  "felsefe-ile-dusunme": [
    {
      "passage": "“Bu salondaki bütün pencereler kapalıdır.” ifadesi belirli bir durum hakkında doğru ya da yanlış olabilen bir yargı ileri sürüyor.",
      "prompt": "Aşağıdakilerden hangisi bu ifadenin önerme olmasının dayanağıdır?",
      "correct": "Doğruluk değeri taşıyan bir yargı bildirmesi",
      "distractors": [
        "Her koşulda mutlaka doğru olması",
        "Emir kipinde yazılmış olması",
        "Yalnız tek sözcükten oluşması",
        "Söyleyenin duygusunu hiçbir iddia olmadan açığa vurması"
      ],
      "hint": "Bir önermenin yanlış olabilmesi onun önerme olmasını engeller mi?",
      "explanation": "Önerme, belirli anlam ve bağlamda doğruluk değeri taşıyan yargıdır. Bütün pencereler kapalıdır sözü yanlış da olabilir; yanlış olma ihtimali önerme niteliğini kaldırmaz."
    },
    {
      "passage": "“Kapı kapalıdır; çünkü bu odadaki bütün kapılar kapalıdır ve söz konusu kapı da bu odadadır.” deniyor.",
      "prompt": "Argümanın sonucu aşağıdakilerden hangisidir?",
      "correct": "Söz konusu kapının kapalı olduğu",
      "distractors": [
        "Bu odadaki bütün kapıların kapalı olduğu",
        "Söz konusu kapının bu odada bulunduğu",
        "Her kapının mutlaka bu odada olduğu",
        "Kapalı kapının hiçbir zaman açılamayacağı"
      ],
      "hint": "Çünkü ile sunulan gerekçenin hangi yargıyı desteklediğini bul.",
      "explanation": "Genel durum ve kapının bu odada bulunması öncüllerdir. Desteklenen tekil yargı, başta söylenen kapının kapalı olmasıdır. Sonuç cümlenin sonunda olmak zorunda değildir."
    },
    {
      "passage": "Bir bahçede yağmur varsa yer ıslanır. Yağmur yağmaktadır. O hâlde yer ıslanır. Öncüllerin doğru olduğu kabul ediliyor.",
      "prompt": "Bu çıkarım hakkında hangisi söylenebilir?",
      "correct": "Sonuç, verilen koşullu öncül ve koşulun gerçekleşmesinden zorunlu çıkar.",
      "distractors": [
        "Sonuç yalnız yerin ıslak olduğu gözleminden yağmura dönülerek kurulmuştur.",
        "Öncüller doğruyken sonuç bu biçimde zorunlu olarak yanlış olur.",
        "Bu çıkarım yalnız iki nesnenin renk benzerliğine dayanır.",
        "Genel koşul kullanılması çıkarımı kendiliğinden geçersiz yapar."
      ],
      "hint": "Koşullu önermedeki hangi tarafın gerçekleştiği verilmiştir?",
      "explanation": "Yağmur varsa ıslaklık vardır ve yağmur vardır öncülleri birlikte ıslaklık sonucunu gerektirir. Bu, koşulun gerçekleşmesinden sonuca geçiştir; tersinden yağmuru çıkarma değildir."
    },
    {
      "passage": "Yağmur varsa bahçe ıslaktır. Bahçe ıslaktır. Ancak fıskiye de bahçeyi ıslatabilmektedir. “O hâlde kesin yağmur vardır.” sonucu ileri sürülüyor.",
      "prompt": "Bu zorunluluk iddiasını çürüten durum hangisidir?",
      "correct": "Yağmur yokken fıskiyenin çalışıp bahçeyi ıslatması",
      "distractors": [
        "Yağmurun yağdığı ve bahçenin ıslandığı bir gün",
        "Bahçede hem yağmur hem fıskiyenin bulunduğu bir gün",
        "Yağmur yağdığında bahçenin ıslandığının yeniden gözlenmesi",
        "Bahçenin farklı bir köşesinde aynı rengin görülmesi"
      ],
      "hint": "Karşı modelde öncüller doğru, sonuç yanlış kalmalı.",
      "explanation": "Yağmur yokken fıskiye bahçeyi ıslatırsa koşullu öncül ve ıslaklık öncülü doğrudur, yağmur sonucu yanlıştır. Böyle bir durumun mümkün olması çıkarımın geçersizliğini gösterir."
    },
    {
      "passage": "Bir argümanın çıkarım biçimi geçerlidir; fakat öncüllerinden biri olgusal olarak yanlıştır.",
      "prompt": "Bu bilgilerle hangisi zorunlu olarak söylenebilir?",
      "correct": "Geçerli biçim, bütün öncüllerin gerçek dünyada doğru olduğunu garanti etmez.",
      "distractors": [
        "Sonuç her olası durumda kesin yanlıştır.",
        "Biçim geçerli olduğu için yanlış öncül de otomatik doğrudur.",
        "Argüman hem doğru öncüllü hem geçerli olduğu kanıtlanmıştır.",
        "Öncülün yanlışlığı biçimin zorunlu olarak geçersiz olduğunu gösterir."
      ],
      "hint": "Biçim ilişkisi ile yargıların olgusal doğruluğunu ayır.",
      "explanation": "Geçerlilik, öncüller doğru olsaydı sonucun yanlış olamamasıdır. Gerçekte bir öncül yanlışsa biçim yine geçerli olabilir; sağlamlık için doğru öncüller de gerekir. Sonucun kesin yanlışlığı ayrıca çıkmaz."
    },
    {
      "passage": "Bir kentte seçilen otuz hanenin hepsi aynı yöntemi kullanıyor. Araştırmacı kentin bütün hanelerinin bu yöntemi kullandığını öneriyor; bütün haneler tek tek incelenmemiştir.",
      "prompt": "Bu geçiş hangi tür akıl yürütmeye örnektir?",
      "correct": "Gözlenen örneklerden daha geniş bir kümeye tümevarım",
      "distractors": [
        "Tanım gereği bütün üyeleri tek tek kapsayan tam sayım",
        "Genel bir öncülden zorunlu tekil çıkarım",
        "Yalnız sözcüklerin aynı yazılmasına dayalı özdeşlik",
        "Hiçbir yargı ileri sürmeyen emir"
      ],
      "hint": "Sonucun kümesi gözlem kümesinden geniş mi?",
      "explanation": "Otuz haneden kentteki bütün hanelere geçiliyor. Bu tümevarımsal genellemedir; örneklemin seçimi ve temsil gücü önemlidir. Bütün üyeler sayılmadığından tam sayım değildir."
    },
    {
      "passage": "A ve B telefonları aynı renktedir. A’nın pilinin iki gün dayanması nedeniyle, pil kapasitesi ve kullanımı bilinmeyen B’nin de iki gün dayanacağı söyleniyor.",
      "prompt": "Bu akıl yürütmeye yöneltilecek en uygun eleştiri hangisidir?",
      "correct": "Gösterilen benzerliğin pil süresiyle ilgili olduğu kanıtlanmamıştır.",
      "distractors": [
        "B’nin pilinin kesin olarak bir saatten az dayanacağı kanıtlanmıştır.",
        "İki telefon arasında hiçbir özellik hiçbir zaman benzer olamaz.",
        "Her analoji sonuçtan bağımsız olarak zorunlu doğrudur.",
        "Aynı renk iki cihazın bütün özelliklerini özdeş yapar."
      ],
      "hint": "Benzerliğin sonuçla ilişkisinin kurulup kurulmadığına bak.",
      "explanation": "Renk benzerliği tek başına pil süresi için ilgili teknik dayanak değildir. Bu, analojiyi zayıflatır; B pilinin kesin ne kadar dayanacağını göstermez."
    },
    {
      "passage": "“Bu kutudaki bütün taşlar beyazdır.” savı ileri sürülüyor. Kutuda gerçekten bulunduğu doğrulanan tek bir siyah taş gösteriliyor.",
      "prompt": "Bu bulgunun sav üzerindeki doğrudan etkisi hangisidir?",
      "correct": "Bütün taşları kapsayan sav için karşı örnek oluşturması",
      "distractors": [
        "Kutudaki bütün taşların siyah olduğunu kanıtlaması",
        "Beyaz hiçbir taşın dünyada var olmadığını göstermesi",
        "Bütün ifadesinin yalnız bazı anlamına geldiğini doğrulaması",
        "Taşın renginin savla ilgisiz olduğunu kanıtlaması"
      ],
      "hint": "Tek karşı örneğin evrensel savı ve karşıt evrensel savı nasıl etkilediğini ayır.",
      "explanation": "Sav bütün üyeleri beyaz sayıyor; aynı kümedeki siyah üye bu savla bağdaşmaz. Fakat tek siyah taştan bütün taşların siyah olduğu sonucu çıkmaz."
    },
    {
      "passage": "“Deniz sabah dokuzda bu odadaydı.” ve “Deniz akşam dokuzda bu odada değildi.” yargıları veriliyor. Başka bilgi yoktur.",
      "prompt": "Bu iki yargı hakkında hangisi doğrudur?",
      "correct": "Zamanları farklı olduğundan doğrudan çelişki göstermezler.",
      "distractors": [
        "Aynı kişi geçtiği için zorunlu olarak çelişirler.",
        "İkinci yargı bir soru olduğu için doğruluk değeri taşımaz.",
        "Birincinin doğru olması ikincinin kesin yanlışlığını gerektirir.",
        "İki yargının varlığı Deniz’in hiç var olmadığını kanıtlar."
      ],
      "hint": "Çelişki için zaman ve koşulların aynı olup olmadığını denetle.",
      "explanation": "Sabah ve akşam farklı zamanlardır; kişi odadan ayrılmış olabilir. Bu nedenle aynı anda aynı koşulda karşıt yüklem verilmemiştir. Gerçek durumları doğrulamak ayrı araştırmadır."
    },
    {
      "passage": "Bir kişi “Bu görüşe katılmıyorum; çünkü onu söyleyenin adı bana hoş gelmiyor.” diyor. Görüşün içeriğine ilişkin başka gerekçe vermiyor.",
      "prompt": "Bu cevapta hangi dayanak eksiktir?",
      "correct": "Görüşün öncül veya sonucuna yönelen ilgili bir gerekçe",
      "distractors": [
        "Kişinin adının daha uzun bir yazılışı",
        "Aynı ilgisiz gerekçenin daha yüksek sesle tekrarı",
        "Görüşü hiç okumadan aynı sonuca varılması",
        "Her görüşün konuşanın adından otomatik doğru çıkması"
      ],
      "hint": "Eleştiri görüşün hangi kısmını inceliyor?",
      "explanation": "Adın hoş gelmemesi savın içeriğine ilişkin bir itiraz değildir. Gerekçeli eleştiri, savın öncüllerini, anlamını veya sonucu destekleme bağını incelemelidir; kişiye yönelik beğeni bunu karşılamaz."
    }
  ],
  "varlik-felsefesi": [
    {
      "passage": "Bir kişi taş, su ve insan bedenini aynı maddi temelin farklı düzenlenişleri sayıyor; birbirine indirgenemeyen ayrı bir zihinsel töz kabul etmiyor.",
      "prompt": "Bu görüşün nicelik ve nitelik bakımından nitelemesi hangisidir?",
      "correct": "Tek temel kabul eden materyalist monizm",
      "distractors": [
        "İki bağımsız töz kabul eden düalizm",
        "Nesne sayısı üç olduğu için zorunlu üççülük",
        "Bütün maddi varlığı reddeden salt öznel idealizm",
        "Yalnız ahlaki ölçütleri araştıran görüş"
      ],
      "hint": "Açıklanan nesneleri değil bağımsız temel ilkeleri say.",
      "explanation": "Çeşitli nesneler aynı tek maddi temelle açıklanıyor. Tek temel nicelik bakımından monizm, temelin madde oluşu nitelik bakımından materyalizmdir. Nesne çeşitliliği töz çoğulluğu değildir."
    },
    {
      "passage": "Bir yaklaşım, uzamda yer kaplayan madde ile düşünen zihni birbirine indirgenemeyen iki temel olarak kabul ediyor.",
      "prompt": "Parçanın özellikle dayanak verdiği görüş hangisidir?",
      "correct": "Madde ve zihne dayalı düalist ontoloji",
      "distractors": [
        "Bütün varlığı tek maddi temele indirgeyen monizm",
        "Yalnız birçok nesnenin sayıldığını belirten envanter",
        "Zihnin hiçbir biçimde var olamayacağını savunan yaklaşım",
        "Doğruluk için yalnız çoğunluk oyu arayan ölçüt"
      ],
      "hint": "Birbirine indirgenemeyen ifadesinin işlevine dikkat et.",
      "explanation": "Madde ve zihin iki bağımsız temel olarak kabul edilir. Bu, düalizmin ilgili biçimidir. Aynı dünyada iki nesne bulunmasından değil temellerin indirgenemezliğinden söz edilir."
    },
    {
      "passage": "Bir görüş, duyulur nesnelerin değişip eksildiğini; onların bilgisinde esas alınan ideaların ise duyusal değişimden bağımsız bir gerçeklik taşıdığını savunuyor.",
      "prompt": "Bu yaklaşımı aşağıdakilerden hangisi en doğru açıklar?",
      "correct": "Platon ile ilişkilendirilen idea ve duyulur nesne ayrımı",
      "distractors": [
        "Her kişinin aklına gelen geçici tasarımı tek gerçek sayma",
        "Bütün varlığı yalnız rastgele atom hareketine indirgeme",
        "Varlık sorusunu yalnız bugünkü hava ölçümüne çevirme",
        "Hiçbir düşünsel gerçeklikten söz edilemeyeceğini ileri sürme"
      ],
      "hint": "İdeaların geçici kişisel tasarımlar mı, bağımsız temel mi sayıldığına bak.",
      "explanation": "Platon’un ideaları duyusal nesnelerin değişiminden bağımsız düşünülür. Bunları yalnız kişinin o anda aklına gelen değişken fikirlerle eşitlemek, verilen ayrımı bozar."
    },
    {
      "passage": "Bir bronz heykel için bronz, insan biçimi, heykeltıraşın yapma etkinliği ve anma amacı ayrı ayrı belirtiliyor.",
      "prompt": "Aristoteles’in neden ayrımları bakımından anma amacı hangisine karşılık gelir?",
      "correct": "Ereksel nedene",
      "distractors": [
        "Maddi nedene",
        "Formel nedene",
        "Fail nedenin yalnız araç hareketine",
        "Nesnenin renginin ölçümüne"
      ],
      "hint": "Ne için sorusunun hangi bilgiyle cevaplandığını bul.",
      "explanation": "Anma amacı heykelin ne için yapıldığını açıklar; ereksel nedendir. Bronz maddi, verilen biçim formel, yapma etkinliği fail nedenle ilişkilidir. Bu açıklama, bütün nesnelere kendimiz amaç uydurmamızı gerektirmez."
    },
    {
      "passage": "Bir düşünür tek tek değişmeyen parçalar aramak yerine, varlığı sürekli oluş ve ilişkiler süreci içinde anlamayı öne çıkarıyor.",
      "prompt": "Parçada hangi ontolojik vurgu doğrudan vardır?",
      "correct": "Oluşun ve sürecin temel alınması",
      "distractors": [
        "Hiçbir değişimin hiçbir biçimde görünemeyeceği",
        "Yalnız bütün ahlak kurallarının yazılı olması",
        "Bilginin doğruluğunun çoğunluk oyuna bağlı olması",
        "Her nesnenin sayısal miktarının aynı olması"
      ],
      "hint": "Sorunun odak noktası varlığın hangi yönü?",
      "explanation": "Metin varlığı oluş ve ilişkiler üzerinden kavrar. Bu, süreç vurgusudur; yalnız doğruluk ölçütü veya ahlak yasası tartışması değildir. Değişim vurgusunu bütün varlığın yokluğu sonucuna dönüştürmeyiz."
    },
    {
      "passage": "Bir araştırmacı gündelik varoluş kabullerini geçici olarak askıya alıyor ve bir ağacın bilinçte nasıl verildiğini betimliyor. Dış dünyanın hiç var olmadığını ilan etmiyor.",
      "prompt": "Bu yaklaşımın yöntemsel yönü hangisidir?",
      "correct": "Fenomenolojik betimleme için paranteze alma",
      "distractors": [
        "Dış dünyanın kesin yokluğunu kanıtlama",
        "Nesnenin fiziksel türünü yalnız oyla seçme",
        "Her düşünceyi maddeye indirgemeyi tamamlamış olma",
        "Ahlaki eylemlerde toplam yararı hesaplama"
      ],
      "hint": "Askıya alma ile inkârı aynı işlem sayma.",
      "explanation": "Metin varlık hükmünü geçici olarak paranteze alıp bilince verili deneyime yöneliyor. Bu fenomenolojik yöntemin öğretim örneğidir; dış dünyanın yokluğu sonucu verilmemiştir."
    },
    {
      "passage": "Bir fizikçi belirli bir cismin hangi kuvvetle hızlandığını araştırıyor. Bir filozof ise cismin ve diğer var olanların ne anlamda var olduklarını, hangi temel yapıyla açıklanacaklarını soruyor.",
      "prompt": "İkinci soruyu birinciye göre ayıran temel yön hangisidir?",
      "correct": "Varlığın genel anlam ve temelini sorgulaması",
      "distractors": [
        "Belirli cismin kütlesini daha hassas tartması",
        "Yalnız aynı fiziksel deneyin tekrar sayısını artırması",
        "Bütün bilimsel ölçümleri gereksiz ilan etmesi",
        "Bilimin hiçbir varlığı konu edinemeyeceğini savunması"
      ],
      "hint": "Bölümsel olgu araştırması ile varlığın genel sorusunu karşılaştır.",
      "explanation": "Ontolojik soru varlığın genel anlam ve temeline yönelir. Fizik de var olanları araştırır; fark, bilimin hiç varlıkla ilgilenmemesi değil sorunun ve açıklama odağının farklı oluşudur."
    },
    {
      "passage": "Bir geminin tahtaları zamanla değişiyor; kullanım kaydı ve örgütlenmesi kesintisiz sürüyor. Bir yorum maddi parçaları, diğeri sürekliliği aynı gemi saymanın ölçütü yapıyor.",
      "prompt": "İki yorumun farklı sonuca varabilmesini en iyi açıklayan nedir?",
      "correct": "Kimlik için belirleyici kabul ettikleri ölçütlerin farklı olması",
      "distractors": [
        "Verilen olayların zorunlu olarak birbirini inkâr etmesi",
        "İki yorumun da hiç ölçüt kullanmaması",
        "Tahta sayısı değişince bütün felsefi sorunların bitmesi",
        "Kimlik sorusunun yalnız geminin rengini sorması"
      ],
      "hint": "Aynı olgulara farklı önem veren dayanakları bul.",
      "explanation": "İki yorum aynı olayları farklı kimlik ölçütleriyle değerlendirir. Maddi parça devamlılığı ile kullanım ve yapı sürekliliği farklıdır. Örnek tek başına bütün kimlik kuramlarından birini evrensel olarak ispatlamaz."
    },
    {
      "passage": "“Varlık gerçekten var mıdır?” ve “Varlık hakkında doğru bilgi edinebilir miyiz?” soruları birlikte veriliyor.",
      "prompt": "Bu soruların ilişkisini en doğru açıklayan seçenek hangisidir?",
      "correct": "İlki varlığın imkânına, ikincisi bilmenin imkânına yönelir.",
      "distractors": [
        "İki soru aynı sözcükleri taşıdığı için bütünüyle özdeştir.",
        "İkisi de yalnız bir cismin hacmini ölçmeyi ister.",
        "İlkine evet cevabı, bütün bilgilerimizin doğru olduğunu kanıtlar.",
        "İkinci soru sorulduğunda varlık kendiliğinden ortadan kalkar."
      ],
      "hint": "Var olmak ile bilinmek aynı yüklem değildir.",
      "explanation": "Varlığın varlığına ilişkin ontolojik problem ile ona ilişkin bilgi edinmenin imkânı epistemolojik problemdir. İlişkili olsalar da aynı değildir; varlığı kabul etmek bütün yargıları doğru yapmaz."
    },
    {
      "passage": "Bir metin varlığı yalnız fiziksel, canlı, ruhsal ve tinsel katmanların birbirine bütünüyle indirgenemeyen özellikleri üzerinden açıklıyor; katmanlar arasındaki ilişkiyi de araştırıyor.",
      "prompt": "Bu metnin odağını aşağıdakilerden hangisi doğru gösterir?",
      "correct": "Varlığın katmanlarını ve bunların ilişkisini incelemek",
      "distractors": [
        "Bütün nesnelerin aynı tek ölçüm sonucuna sahip olduğunu ileri sürmek",
        "Yalnız bir davranışın yasal yaptırımını sormak",
        "Her katmanın yalnız kişinin geçici keyfi olduğunu söylemek",
        "Bilimin yalnız harfleri sayma yöntemi olduğunu savunmak"
      ],
      "hint": "Katman adları bir bilgi doğruluk ölçütü mü, varlık yapısı mı gösteriyor?",
      "explanation": "Metin Hartmann’ın yeni ontolojisiyle ilişkilendirilen katmanlı yapı yönünü konu eder. Hedef varlığın yapısı ve katmanların ilişkileridir; tek bir olgusal ölçüm veya yalnız ahlaki yaptırım değildir."
    }
  ],
  "bilgi-felsefesi": [
    {
      "passage": "Ece kapıya bakarak “Kapı açık.” yargısına ulaşıyor. Soru, bu yargının hangi yolla elde edildiğini araştırıyor; olguyla uygunluğunu sormuyor.",
      "prompt": "Burada doğrudan hangi problem incelenmektedir?",
      "correct": "Bilginin kaynağı",
      "distractors": [
        "Varlığın kaç temel tözden oluştuğu",
        "Eylemin ahlaki yükümlülüğü",
        "Güzelin evrensel ölçütü",
        "Yalnız yargıların sayısal yazı uzunluğu"
      ],
      "hint": "Nasıl elde edildiği ile neye göre doğru sayıldığı ayrımını koru.",
      "explanation": "Ece’nin bakarak öğrenmesi bilginin ediniliş yoluna ilişkindir. Bu kaynak sorusudur. Aynı örnek başka bir soruda uygunluk için kullanılabilirdi; burada o odak özellikle dışarıda bırakılmıştır."
    },
    {
      "passage": "Bir kişi “Bu odadaki ışık yanıyor.” yargısını, aynı odada aynı anda ışığın gerçekten yanıp yanmadığını gözleyerek değerlendiriyor.",
      "prompt": "Kullanılan doğruluk ölçütü hangisidir?",
      "correct": "Uygunluk",
      "distractors": [
        "Yalnız çoğunluğun ortak kabulü",
        "Yalnız yargının kişiye kazanç sağlaması",
        "Ahlaki ödevden eyleme",
        "İki bağımsız töz kabulü"
      ],
      "hint": "Yargı neyle karşılaştırılıyor?",
      "explanation": "Yargı ile söz ettiği olgu aynı yer ve zamanda karşılaştırılıyor; bu uygunluk ölçütüdür. Eylemin duyusal oluşu burada kaynak etiketinden önce doğruluk ilişkisindeki göreviyle okunmalıdır."
    },
    {
      "passage": "Bir yaklaşım, kesin bilgiye ulaşmak için önce kuşku duyulabilir kabulleri incelemek gerektiğini savunuyor; kuşkuyu araştırmanın son amacı saymıyor.",
      "prompt": "Bu yaklaşımda kuşkunun işlevi hangisidir?",
      "correct": "Güvenilir bilgi arayışında yöntem olması",
      "distractors": [
        "Her türlü bilginin imkânsızlığının son hüküm olarak kabulü",
        "Hiçbir öncülün incelenmemesi",
        "Yalnız insanların çoğunluk oyu vermesi",
        "Bir nesnenin fiziksel olarak yok edilmesi"
      ],
      "hint": "Kuşku araştırmanın aracı mı nihai sonucu mu?",
      "explanation": "Metin kuşkuyu kesin bilgi arayışının bir aracı yapar. Bu, güvenilir bilginin hiçbir biçimde olamayacağına nihai hüküm veren kuşkuculukla aynı konum değildir."
    },
    {
      "passage": "Bir görüş, bazı temel bilgilerin deney örneklerinin doğrulamasına gerek kalmadan akıl yoluyla bilinebileceğini ve zorunlu ilkelerin yalnız duyusal tekrardan türemediğini savunuyor.",
      "prompt": "Bu pasajda hangi yönelim öne çıkar?",
      "correct": "Rasyonalizm",
      "distractors": [
        "Bütün bilgiyi yalnız duyusal izlenimle açıklama",
        "Doğruluk için yalnız anlık kişisel kazanç arama",
        "Her yargıyı sırf çoğunluk kabul ettiği için doğru sayma",
        "Bilincin varlığını hiçbir koşulda kabul etmeme"
      ],
      "hint": "Akıl ve deneyin hangi rolü önceleniyor?",
      "explanation": "Akla ve deneyden bağımsız temel ilkelere vurgu rasyonalizmle ilişkilidir. Pasaj yalnız belirli deneylerin tekrarını veya uzlaşım ölçütünü temel almıyor."
    },
    {
      "passage": "Bir yaklaşım bilginin içeriğinin deneyimle kazanıldığını, zihnin doğuştan tamamlanmış bilgi cümleleriyle dolu kabul edilemeyeceğini vurguluyor.",
      "prompt": "Bu vurgu hangi görüşle doğrudan ilişkilidir?",
      "correct": "Empirizm",
      "distractors": [
        "Varlığı iki bağımsız töze ayıran düalizm",
        "Yalnız ödevden eylemenin ahlaki değerini araştırma",
        "Her bilginin deneyden bütünüyle bağımsız hazır bulunduğu görüşü",
        "Yargının doğru olmasını yalnız dilde uzunluğuna bağlama"
      ],
      "hint": "Metinde içerik hangi süreçten geliyor?",
      "explanation": "Deneyimden edinilen içerik vurgusu empirizmin temel öğretim çerçevesidir. Bu niteleme, deneyim sözcüğünün geçtiği her pasajın aynı soruyu sorduğu anlamına gelmez; burada kaynak özellikle konu edilmiştir."
    },
    {
      "passage": "“Bilgi deneyimle başlar; fakat deneyimden gelen malzeme zihnin düzenleyici formlarıyla bilgi hâline gelir.” görüşü veriliyor.",
      "prompt": "Bu görüşü doğru aktaran hangisidir?",
      "correct": "Deney malzemesi ile zihnin kurucu düzenini birlikte kabul eder.",
      "distractors": [
        "Deneyimin hiçbir katkısı olmadığını ileri sürer.",
        "Zihnin yalnız bütünüyle edilgin bir kayıt yüzeyi olduğunu savunur.",
        "Bilginin yalnız çoğunluk oyu toplamı olduğunu söyler.",
        "Bütün önermelerin hiçbir bağlamda sınanamayacağını söyler."
      ],
      "hint": "İki ayrı katkı cümlede birlikte yer alıyor.",
      "explanation": "Kant ile ilişkilendirilen bu çerçevede deney ve zihin birlikte rol alır. Yalnız deneycilik veya yalnız deneyden bağımsız hazır içerik iddiası olarak okumak metnin bir yarısını siler."
    },
    {
      "passage": "Bir kişi “Diğer kabul ettiğim yargılarla çelişmeyen ve onlar içinde anlamlı bir bütün oluşturan yargıyı doğru sayarım.” diyor.",
      "prompt": "Bu kişinin belirttiği doğruluk ölçütü hangisidir?",
      "correct": "Tutarlılık",
      "distractors": [
        "Nesnenin fiziksel hacmi",
        "Yalnız kısa vadeli maddi kazanç",
        "Bütün önermeleri oyla seçme",
        "Niyetin ödevden kaynaklanması"
      ],
      "hint": "Yargının hangi ilişki içinde değerlendirildiğini bul.",
      "explanation": "Yargı diğer yargılarla çelişmeme ve sistem içinde bağdaşma bakımından değerlendiriliyor; bu tutarlılık ölçütüdür. Bunun olgusal doğruluğa tek başına yanılmaz garanti verdiği ayrıca söylenemez."
    },
    {
      "passage": "Bir kişi “Herkesin ortak kabul ettiği yargıyı doğru sayarım.” diyor. Başka biri, insan gruplarının ortaklaşa yanılabileceğini hatırlatıyor.",
      "prompt": "İlk kişinin ölçütü ve itirazın hedefi hangisidir?",
      "correct": "Tümel uzlaşım; ortak kabulün yanılmaz doğruluk garantisi sayılması",
      "distractors": [
        "Uygunluk; yargı ile olgunun hiç karşılaştırılmaması",
        "Erdem; tek davranışın karakteri göstermesi",
        "Monizm; çok nesnenin tek temel taşıması",
        "Tümdengelim; bütün öncüllerin tanımlanması"
      ],
      "hint": "Metindeki kişinin ölçütü ile ona yöneltilen eleştiriyi ayrı tut.",
      "explanation": "İlk kişi ortak kabulü ölçüt yapar. İtiraz, insanların ortak yanılması olasılığı nedeniyle bunun her olgusal yargıyı kesin doğrulamayacağını söyler. Ölçütü tanımak onu otomatik benimsemek değildir."
    },
    {
      "passage": "Bir yaklaşım bir düşüncenin deneyimde işe yaramasını ve sorun çözmede sonuç vermesini doğruluğu değerlendirirken öne çıkarıyor. Soru eylemin ahlaki değerini değil bilgi yargısını konu ediniyor.",
      "prompt": "Bu yaklaşımda hangi ölçüt vurgulanır?",
      "correct": "Pratik yarar",
      "distractors": [
        "Yalnız dış görünüş simetrisi",
        "Ödevden doğan ahlaki niyet",
        "Maddenin iki ayrı töze bölünmesi",
        "Önermenin yalnız sözcük sayısı"
      ],
      "hint": "Bilgi yargısı için kullanılan iş görme vurgusunu ahlaki faydacılıkla karıştırma.",
      "explanation": "Pragmatik doğruluk yaklaşımında pratik sonuç ve iş görme önemlidir. Pasaj bilgi yargısına odaklandığı için eylemlerin ahlaki toplam faydası sorusuyla aynı değildir."
    },
    {
      "passage": "Bahçedeki bir ağaç için “Çamdır.” deniyor; inceleme ağacın servi olduğunu gösteriyor. Ağacın bahçede bulunduğu konusunda anlaşmazlık yok.",
      "prompt": "Bu örnek hangi ayrımı en iyi gösterir?",
      "correct": "Var olan nesne ile onun hakkındaki yargının doğruluğu ayrımını",
      "distractors": [
        "Yanlış yargının nesneyi fiziksel olarak yok ettiğini",
        "Bir nesneye ilişkin bütün sözlerin aynı anda doğru olduğunu",
        "Tür bilgisinin yalnız konuşanın oyuyla belirlendiğini",
        "Ağacın varlığıyla bütün ahlaki kuralların özdeşliğini"
      ],
      "hint": "Yanlış çıkan şey nesnenin varlığı mı, türünü bildiren yargı mı?",
      "explanation": "Çam yargısı yanlıştır; ağaç yine bahçede bulunmaktadır. Gerçeklik ile onun hakkındaki doğru-yanlış yargı ayrımı böylece görünür olur. Türü yanlış tanımak nesnenin yokluğunu kanıtlamaz."
    }
  ],
  "bilim-felsefesi": [
    {
      "passage": "Bir biyolog fidelerin büyümesini ölçüyor. Bir filozof ise bir açıklamanın bilimsel sayılması için hangi sınama koşullarını taşıması gerektiğini soruyor.",
      "prompt": "Filozofun sorusunu ayıran yön hangisidir?",
      "correct": "Bilimin yöntem ve sınama ölçütlerini incelemesi",
      "distractors": [
        "Fidelerin boyunu yalnız daha küçük birimle ölçmesi",
        "Aynı bitki sayısını daha yüksek sesle tekrar etmesi",
        "Bilimsel verinin hiçbir zaman gerekmediğini ilan etmesi",
        "Her deney sonucunun yalnız kişisel beğeni olduğunu savunması"
      ],
      "hint": "Sorunun nesnesi fide mi, bilimin kendisi mi?",
      "explanation": "İlk araştırma olguyu ölçer; ikinci soru bilimsel açıklamanın yöntemsel niteliğini inceler. Bu bilim felsefesinin doğrudan sorusudur. Bilimden söz etmek veriyi gereksiz saymak anlamına gelmez."
    },
    {
      "passage": "Bir deneyde aynı tür fidelerin ışık süresi değiştiriliyor; dört hafta sonundaki boy artışı ölçülüyor. Su, toprak ve başlangıç boyu aynı tutuluyor.",
      "prompt": "Bağımsız değişken ve bağımlı değişken sırasıyla hangileridir?",
      "correct": "Işık süresi ve boy artışı",
      "distractors": [
        "Boy artışı ve başlangıç boyu",
        "Su miktarı ve toprak türü",
        "Toprak türü ve sabit tutulan su",
        "Ölçüm cetvelinin rengi ve araştırmacının adı"
      ],
      "hint": "Değiştirilen etken ile ölçülen sonucu ayır.",
      "explanation": "Araştırmacı ışık süresinin etkisini görmek için onu değiştirir; bağımsız değişkendir. Ölçülen boy artışı bağımlı değişkendir. Sabit tutulan su ve toprak bu iki rolü almamıştır."
    },
    {
      "passage": "Bir grup sıcak ve nemli, öteki soğuk ve kuru ortamda tutuluyor. Sonuç farkı görülünce yalnız sıcaklığın etkili olduğu ileri sürülüyor. Başka karşılaştırma yoktur.",
      "prompt": "Bu çıkarımın dayanak sorununu hangisi gösterir?",
      "correct": "Sıcaklık ile nem birlikte değiştiği için etki tek etkene ayrılamıyor.",
      "distractors": [
        "İki grubun bulunması bütün açıklamaları otomatik kanıtlıyor.",
        "Nem verildiği için sıcaklığın hiçbir koşulda etkisi olamaz.",
        "Fark çıkması araştırmanın hiçbir bilgi taşımadığını gösterir.",
        "Sonucun sayısal ifade edilmesi deneyin gereksizliğini kanıtlar."
      ],
      "hint": "Gruplar arasında kaç etkenin aynı anda değiştiğini say.",
      "explanation": "İki etken birlikte değişmiştir. Bu düzen yalnız sıcaklık, yalnız nem veya ortak etki açıklamalarını tek başına ayıramaz. Sonuçtan sıcaklığın kesin etkisizliği de çıkarılmaz; ayırt edici yeni kontrol gerekir."
    },
    {
      "passage": "Kurgu tabloda sıcak-kuru 4, sıcak-nemli 10, soğuk-kuru 4, soğuk-nemli 10 birim sonuç veriyor. H1 yalnız sıcaklığın, H2 yalnız nemin sonucu artıracağını öngörüyor. Diğer koşullar aynı kabul ediliyor.",
      "prompt": "Verilen tabloda hangi açıklama doğrudur?",
      "correct": "Sonuç aynı nemde sıcaklıkla değişmiyor; H2’nin nem öngörüsüyle uyuşuyor.",
      "distractors": [
        "Aynı nemde her sıcaklık artışı sonucu 6 birim yükseltiyor.",
        "H1’in sıcaklık öngörüsü her çiftte doğrulanıyor.",
        "Tablo nem değişimini hiçbir koşulda karşılaştırmıyor.",
        "Bu dört sayı bütün gerçek sistemlerde tek nedenin nem olduğunu kanıtlıyor."
      ],
      "hint": "Aynı sıcaklık ve aynı nemdeki çiftleri ayrı karşılaştır.",
      "explanation": "Kuru koşulda her iki sıcaklıkta 4, nemli koşulda her iki sıcaklıkta 10 vardır. Bu sınırlı kurgu veri H2’nin öngörüsüne uyar; bütün gerçek sistemlerde tek nedene ilişkin evrensel hüküm vermez."
    },
    {
      "passage": "Bir açıklama, çok sayıda olguyu ortak ilkelerle ilişkilendiriyor ve yeni koşullara ilişkin öndeyiler sunuyor. Onun birçok başarılı sınamadan sonra zorunlu olarak yasa adını alacağı söyleniyor.",
      "prompt": "Bu son ifadeye en uygun düzeltme hangisidir?",
      "correct": "Kuram ve yasa farklı işlevlerdir; destek artışı zorunlu bir ad değiştirme basamağı değildir.",
      "distractors": [
        "Kuram sözcüğü her bilim alanında yalnız temelsiz tahmin demektir.",
        "Yasa olmak için hiçbir veri veya ilişki gerekmez.",
        "Kuramların hiçbir öndeyi üretmesi mümkün değildir.",
        "Her gözlem tek başına bir kuramı değişmez yapar."
      ],
      "hint": "Görev ayrımıyla kanıt derecesini birbirine karıştırma.",
      "explanation": "Kuram açıklama yapısı, yasa düzenlilik veya ilişki ifade etme gibi roller taşır. Bir kuramın güçlü desteklenmesi onu zorunlu yasaya dönüştürmez. Basit hipotez-kuram-yasa merdiveni yanıltıcıdır."
    },
    {
      "passage": "“Bu koşul sağlandığında bütün örnekler genleşir.” savı için, aynı koşulda genleşmeyen bir örneğin savla uyuşmayacağı belirtiliyor.",
      "prompt": "Bu bilgi öncelikle savın hangi özelliğini gösterir?",
      "correct": "Olası bir karşı bulguyla sınanabilir olmasını",
      "distractors": [
        "Fiilen şimdiden yanlışlanmış olmasını",
        "Her gözlemi sonuç ne olursa olsun kendisine uygun saymasını",
        "Yalnız oy çokluğuyla seçildiğini",
        "Hiçbir koşul ifade etmediğini"
      ],
      "hint": "Karşı bulgunun mümkün olarak tanımlanması ile elde edilmiş olmasını ayır.",
      "explanation": "Savın hangi olası bulguyla uyuşmayacağı açıktır; bu yanlışlanabilirliğe işaret eder. O bulgunun gerçekten elde edildiği söylenmediğinden savın fiilen yanlışlandığı sonucu çıkmaz."
    },
    {
      "passage": "Bir araştırmacı yüzlerce beyaz kuğu gözlüyor ve bütün kuğuların beyaz olduğunu ileri sürüyor. Savın kapsamındaki tek bir siyah kuğu güvenilir biçimde görülüyor.",
      "prompt": "Bu örnek hangi sınama farkını gösterir?",
      "correct": "Çok sayıdaki uyumlu örnek evrensel kesinlik sağlamazken tek gerçek karşı örnek savla bağdaşmaz.",
      "distractors": [
        "Bir karşı örnek bütün kuğuların siyah olduğunu kanıtlar.",
        "Her gözlem sayısı bütün olası durumları zorunlu kapsar.",
        "Siyah örnek savın kapsamına girse bile hiçbir rol oynayamaz.",
        "Sınırlı gözlemden geniş sav kurulması her zaman matematiksel ispat olur."
      ],
      "hint": "Bütün ifadesinin mantıksal kapsamını koru.",
      "explanation": "Uyumlu gözlemler destek verebilir, fakat açık evrendeki bütün durumları sonlu sayıda tüketmez. Evrensel savın gerçek bir karşı örneği ise o savı çürütür; karşıt evrensel savı otomatik kanıtlamaz."
    },
    {
      "passage": "Bir bilim topluluğu uzun süre ortak problem ve yöntem çerçevesi içinde çalışıyor. Bir metin, aykırılıkların ve krizlerin bu çerçevede büyük değişimlere yol açabilmesini inceliyor.",
      "prompt": "Parçada özellikle hangi yaklaşımın odağı görülür?",
      "correct": "Kuhn ile ilişkilendirilen paradigma ve bilimsel değişme incelemesi",
      "distractors": [
        "Bütün önermelerin yalnız kişisel adlardan türediği görüşü",
        "Bilimin hiçbir tarihsel veya toplumsal pratiği olamayacağı savı",
        "Bir kuramın adının yeterli deneyle zorunlu yasa olması",
        "Matematiksel ispatın yalnız çoğunluk oyu olması"
      ],
      "hint": "Ortak çerçeve ve tarihsel değişim sözcüklerini birlikte değerlendir.",
      "explanation": "Ortak problem çözme çerçevesi, olağan çalışma, aykırılık ve kriz ilişkisi paradigma yaklaşımının odağıdır. Bu, herkesin istediğine inanması veya bütün bilimlerin tek bir adlandırma merdiveni izlemesi demek değildir."
    },
    {
      "passage": "Bir sonuç raporunda araştırmacı verinin bir bölümünü istediği sonuca uymadığı için gizliyor ve bunu açıkça bildirmiyor.",
      "prompt": "Bu davranış doğrudan hangi ilkeyi zedeler?",
      "correct": "Araştırmada dürüstlük ve denetlenebilirlik",
      "distractors": [
        "Bir kuramın çok sayıda kavram içermesi gerektiğini",
        "Cismin kaç temel tözden oluştuğunu",
        "Bir şiirin uyak düzenini",
        "Doğruluğun yalnız sözcük sayısıyla belirlenmesini"
      ],
      "hint": "Başkaları sonuca götüren veriyi dürüstçe görebiliyor mu?",
      "explanation": "İstenmeyen veriyi gizlemek araştırmayı yeniden değerlendirmeyi engeller ve sonucu yanıltır. Sorun yalnız teknik sunum değil bilimsel dürüstlük ve denetlenebilirliğe ilişkindir."
    },
    {
      "passage": "Bir yazar “Bilimsel sonuçlar farklı güçte kanıtlarla desteklenir. Yeni veri bazılarını düzeltebilir; yöntemleri açık tutmak bu düzeltmeyi mümkün kılar.” diyor.",
      "prompt": "Bu açıklamadan hangisi çıkar?",
      "correct": "Düzeltilebilirlik, bütün bilimsel sonuçların eşit derecede rastgele olduğu anlamına gelmez.",
      "distractors": [
        "Değişim ihtimali varsa hiçbir bilgi hiçbir zaman kullanılamaz.",
        "Her bilimsel sonuç sonsuza dek aynı kapsamda değişmezdir.",
        "Kanıtın gücü bütün iddialarda zorunlu olarak özdeştir.",
        "Yöntemi gizlemek yanlışların bulunmasını her zaman kolaylaştırır."
      ],
      "hint": "Güçlü destek ile yanılmazlığı aynı kabul etme.",
      "explanation": "Metin farklı kanıt güçlerini ve hata düzeltme olanağını birlikte kabul eder. Bilimsel bilginin değişebilir oluşu bütün iddiaları aynı derecede güvensiz veya rastgele yapmaz."
    }
  ],
  "ahlak-felsefesi": [
    {
      "passage": "Bir öğrenci “Bu toplumda sözünde durmak bekleniyor.” diyor. Başka öğrenci “Sözünde durmak hangi gerekçeyle yükümlülük sayılmalıdır?” diye soruyor.",
      "prompt": "İkinci öğrencinin sorusu ilkine göre hangi yöndedir?",
      "correct": "Kuralın gerekçesini araştıran etik incelemeye yönelir.",
      "distractors": [
        "Yalnız davranışın toplumda kaç kez görüldüğünü sayar.",
        "Kuralın varlığını onun doğruluğuna otomatik kanıt yapar.",
        "Hiçbir ahlaki kavramı tartışmanın mümkün olmadığını söyler.",
        "Sözün dilbilgisel eklerini incelemekle yetinir."
      ],
      "hint": "Var olan uygulamayı bildirmek ile neden haklı olduğunu sormayı ayır.",
      "explanation": "İlk ifade ahlaki uygulamayı betimler. İkinci ifade yükümlülüğün dayanağını araştırır; etik inceleme bu kavram ve gerekçe düzeyine yönelir."
    },
    {
      "passage": "“Bu toplulukta yardımlaşma yaygındır.” yargısı veriliyor. Yalnız bu bilgiyle “O hâlde her yardım yöntemi her koşulda doğrudur.” sonucu çıkarılıyor.",
      "prompt": "Bu geçişte hangi sorun vardır?",
      "correct": "Betimlenen uygulamadan gerekçe eklemeden sınırsız normatif sonuç çıkarılması",
      "distractors": [
        "İlk yargının herhangi bir olgu bildirmemesi",
        "Her yardımın kesin olarak zararlı olduğunun kanıtlanması",
        "Yardımlaşma sözcüğünün hiçbir anlam taşımaması",
        "Bir davranışın görülmesinin bütün değer tartışmalarını bitirmesi"
      ],
      "hint": "Yapılıyor ile her koşulda yapılmalıdır aynı yargı değildir.",
      "explanation": "Bir davranışın yaygınlığı, her yöntemin her koşulda ahlaken doğru olduğunu tek başına göstermez. Normatif sonuç için değer öncülü ve koşul incelemesi gerekir; yardımın kesin kötü olduğu da çıkarılmaz."
    },
    {
      "passage": "Ece cüzdanı iade ediyor. Bunu yalnız ödül kazanmak için yaptığı açıkça belirtiliyor. Eylemin dışarıdan bir yükümlülüğe uygun olduğu da kabul ediliyor.",
      "prompt": "Kant’ın ödev ahlakı bakımından en uygun değerlendirme hangisidir?",
      "correct": "Ödeve uygunluk ile ödevden dolayı yapma ayrılmalıdır; ödül niyeti tek başına ödevden eylemek değildir.",
      "distractors": [
        "Ödeve uygun her eylem niyetten bağımsız zorunlu ödevden yapılır.",
        "Ödül niyetiyle iade etmek kendiliğinden hırsızlık eylemi olur.",
        "Niyet hiçbir ahlak görüşünde hiçbir rol taşıyamaz.",
        "Bir eylemin dışarıdan uygunluğu onun bütün sonuçlarını yok eder."
      ],
      "hint": "Davranışın görünümü ile belirleyici gerekçesini ayrı tut.",
      "explanation": "Cüzdan iade edildiği için dış uygunluk vardır; fakat belirleyici gerekçe ödüldür. Kant açısından ödevden eylemek ile ödeve uygun eylemek farklıdır. Bu ayrım eylemi otomatik kötü veya hırsızlık saymak değildir."
    },
    {
      "passage": "Bir kişi iki yardım yöntemini, etkilenen herkes açısından beklenen yarar ve zararı karşılaştırarak seçiyor. Yalnız kendi kazancını değil toplam etkileri ölçüt yapıyor.",
      "prompt": "Bu gerekçede hangi değerlendirme odağı belirgindir?",
      "correct": "Sonuçların yarar ve zarar bakımından değerlendirilmesi",
      "distractors": [
        "Yalnız eylemi yapanın adının güzel bulunması",
        "Sonuçlara hiç bakmadan bütün ölçütlerin reddi",
        "Yalnız cismin iki temel tözden oluşması",
        "Bir kuralın doğru olmasının yalnız uzun yazılmasına bağlanması"
      ],
      "hint": "Gerekçede belirleyici kılınan şey hangi öge?",
      "explanation": "Kişi etkilenenler açısından sonuçları karşılaştırır; sonuççu ve faydacı değerlendirme yönü belirgindir. Metin yalnız kişisel çıkarı veya eylemin adını ölçüt yapmaz."
    },
    {
      "passage": "Bir kişi “Bu davranışta yalnız anlık kazancı değil, dürüst ve adaletli bir karakteri nasıl geliştireceğimi önemsiyorum.” diyor.",
      "prompt": "Gerekçede doğrudan hangi kavram odağı bulunur?",
      "correct": "Erdem ve karakter gelişimi",
      "distractors": [
        "Sadece nesnelerin fiziksel kütlesi",
        "Yalnız rastlantının her kararı özgür yapması",
        "Sadece oy çokluğuyla bilgi doğrulama",
        "Bütün ahlaki değerlendirmeyi kelime sayısına indirgeme"
      ],
      "hint": "Nasıl bir kişi olmak istediği cümlede açık mı?",
      "explanation": "Dürüstlük ve adaletli karakter geliştirme erdem odağıdır. Tek eylemden kişinin bütün yaşamını kesin erdemli ilan etmeyiz; metindeki değerlendirme odağını tanırız."
    },
    {
      "passage": "Bir yorumda kişi olası zararı biliyor ve baskı altında olmadan seçim yapabiliyor. Diğer yorumda önemli bilgi kendisinden gizlenmiş. Sonucun benzer olduğu belirtiliyor.",
      "prompt": "Ahlaki sorumluluk incelenirken hangi koşul doğrudan yeniden değerlendirilmelidir?",
      "correct": "Kişinin bilgisi ve öngörü olanakları",
      "distractors": [
        "Yalnız olayın anlatıldığı cümlenin harf sayısı",
        "Sonuç aynı olduğu için hiçbir koşulun değişemeyeceği",
        "Her bilgisizliğin bütün sorumluluğu tartışmasız sıfırladığı",
        "Kişinin adının bütün ahlaki yargıyı tek başına belirlediği"
      ],
      "hint": "Benzer sonuç iki kişinin aynı bilgiye sahip olduğunu gösterir mi?",
      "explanation": "Bilginin gizlenmesi öngörü ve niyet değerlendirmesini etkileyebilir. İhmal veya bilgiye ulaşma imkânı ayrıca incelenir; buradan otomatik tam sorumluluk ya da sıfır sorumluluk kararı çıkmaz."
    },
    {
      "passage": "Bir öğrenci Aristoteles’in erdemli ortasını “Her durumda iki uçtaki sayıyı toplayıp ikiye bölmek” diye açıklıyor.",
      "prompt": "Bu açıklamaya en uygun düzeltme hangisidir?",
      "correct": "Erdemli ölçü kişi, zaman, neden ve koşula göre akla uygun seçimi gerektirir; salt aritmetik ortalama değildir.",
      "distractors": [
        "Her haksızlığın yarısı zorunlu olarak erdemlidir.",
        "Koşulların hiçbir ahlaki değerlendirmede rolü olamaz.",
        "Bütün erdemler yalnız nesnelerin ağırlıklarının ortalamasıdır.",
        "Cesaret, tehlikenin hiçbir zaman fark edilmemesidir."
      ],
      "hint": "Orta öğretisinde ölçünün bağlamını koru.",
      "explanation": "Aristoteles’in ortası her durumda sayısal ortalama değildir. Uygun eylem koşullara göre kavranır; her davranış türünün erdemli bir yarısı bulunduğu da söylenmez."
    },
    {
      "passage": "Bir görüş insanların eylemlerinin önceki nedenlerle ilişkili olduğunu savunuyor; bunun belirli bir özgürlük anlayışıyla birlikte savunulabileceğini de ileri sürüyor.",
      "prompt": "Bu metinden hangisi çıkar?",
      "correct": "Nedensel belirlenim kabulü her yorumda özgürlüğün zorunlu reddi değildir.",
      "distractors": [
        "Bütün belirlenimci görüşler aynı özgürlük tanımını reddeder.",
        "Rastgele olan her karar otomatik olarak kişi tarafından denetlenir.",
        "Kadercilik ile bütün nedensellik anlayışları tanım gereği özdeştir.",
        "Eylemin nedenini araştırmak bütün etik soruları bitirir."
      ],
      "hint": "Metin birlikte savunma olanağını özellikle veriyor.",
      "explanation": "Bağdaşırcı yorumlar belirlenim ile belirli özgürlük anlayışlarını birlikte düşünebilir. Bu nedenle belirlenimcilik adını her bağlamda bütün sorumluluğu reddetmekle eşitlemek metni aşar."
    },
    {
      "passage": "Bir yardım ilkesi ihtiyaç kadar destek vermeyi öngörüyor. A’nın ihtiyacı sekiz, B’nin ihtiyacı dört birim; ikisine sırasıyla sekiz ve dört veriliyor.",
      "prompt": "Bu örnekte aşağıdakilerden hangisi verilen bilgilerle savunulamaz?",
      "correct": "Aynı ilkenin tutarsız veya keyfî uygulandığı",
      "distractors": [
        "İhtiyaçların verilen örnekte farklı olduğu",
        "A’ya B’den daha fazla miktar verildiği",
        "Dağıtımın ihtiyaç ölçütüyle yapıldığı",
        "İlkenin destek miktarını gereksinimle ilişkilendirdiği"
      ],
      "hint": "Aynı gerekçe farklı koşulda farklı miktar gerektirebilir mi?",
      "explanation": "İhtiyaç ilkesi iki kişiye de aynı gerekçeyle uygulanmıştır. Koşullar farklı olduğu için sonuç miktarının farklı olması tek başına keyfîlik veya tutarsızlık kanıtı değildir. İlkenin en iyi ilke olup olmadığı ayrı tartışmadır."
    },
    {
      "passage": "Bir davranış yürürlükteki kurala uygundur. Bir filozof bu kuralın adil olup olmadığını ve insan hakları bakımından nasıl gerekçelendirilebileceğini tartışıyor.",
      "prompt": "Bu tartışmada hangi ayrım korunmaktadır?",
      "correct": "Hukuki uygunluk ile ahlaki gerekçelendirme ayrımı",
      "distractors": [
        "Yasal olanın hiçbir koşulda sorgulanamayacağı",
        "Bir ahlaki itirazın yalnız söylenmesinin onu otomatik doğru yapacağı",
        "Hukuk sözcüğünün hiçbir yaptırım veya kurumla ilgisi olamayacağı",
        "Eylemin gerçekleşmesiyle bütün değer sorularının sona ereceği"
      ],
      "hint": "Kurala uyma ile kuralın haklılığını araştırma aynı işlem midir?",
      "explanation": "Bir davranışın yürürlükteki hukuka uygunluğu, kuralın ahlaken nasıl savunulacağını kendiliğinden çözmez. Tartışma bunu ayırır; hukuku değersiz veya her itirazı kendiliğinden doğru ilan etmez."
    }
  ]
};
const answerPositions020 = [
 [2, 4, 0, 3, 1, 4, 1, 3, 0, 2],
 [3, 1, 4, 0, 2, 0, 2, 4, 1, 3],
 [4, 2, 1, 3, 0, 2, 0, 1, 3, 4],
 [1, 3, 2, 4, 0, 3, 0, 4, 2, 1],
 [0, 4, 3, 1, 2, 1, 2, 0, 4, 3],
 [2, 0, 4, 1, 3, 4, 3, 2, 1, 0],
];
export const forge020HumanitiesTopics: Record<string, string> = {
 "felsefeyi-tanima": "detail-97",
 "felsefe-ile-dusunme": "detail-98",
 "varlik-felsefesi": "detail-99",
 "bilgi-felsefesi": "detail-100",
 "bilim-felsefesi": "detail-101",
 "ahlak-felsefesi": "detail-102",
};
export const forge020HumanitiesGuides: LessonGuide[] = guideSpecs020.map(({ title: _title, ...guide }) => guide);
export const forge020HumanitiesLessons: Lesson[] = guideSpecs020.map((guide, pack) => ({
 id: guide.id, subjectId: "tyt-felsefe", title: txt(guide.title), minutes: guide.minutes,
 objectives: guide.objectives.map(txt),
 body: guide.sections.map(section => ({ title: txt(section.title), text: txt(section.paragraphs.join("\n\n")) })),
 questions: questionRows020[guide.id].map((row, index): Question => {
  const answer = answerPositions020[pack][index], raw = [row.correct, ...row.distractors];
  return { id: `${guide.id}-020-${index + 1}`, skill: guide.id, passage: txt(row.passage), prompt: txt(row.prompt),
    options: raw.map((_, position) => txt(raw[(position - answer + 5) % 5])), answer,
    hint: txt(row.hint), explanation: txt(row.explanation) };
 }),
 source: txt(guide.source), tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
}));

export const humanitiesDefaults020 = {
  criterion: "equal", angle: "apply", rule: "direct", rain: false,
  sprinkler: false, foundation: "material", question: "source", test: "world",
  data: "paired", hypothesis: "heat", motive: "duty", condition: "free",
  selected: 0, guess: "", reason: "", compared: false, show: false,
};
export type HumanitiesState020 = typeof humanitiesDefaults020;
export interface HumanitiesNode020 { label: string; text: string; root?: boolean; active?: boolean; }
export interface HumanitiesLink020 { from: number; to: number; label: string; }
export interface LogicRow020 { rain: boolean; sprinkler: boolean; wet: boolean; premises: boolean; conclusion: boolean; counter: boolean; }
export interface ScienceRow020 { heat: boolean; damp: boolean; observed: number | null; prediction: number; }
export interface HumanitiesScene020 {
  kind: "allocation" | "logic" | "ontology" | "knowledge" | "science" | "ethics";
  context: string; question: string; nodes: HumanitiesNode020[]; links: HumanitiesLink020[];
  decision: string; options: string[]; reason: string; evidence: string[];
  allocation?: { a: number; b: number; needA: number; needB: number };
  logic?: { rows: LogicRow020[]; actual: number; valid: boolean; counterCount: number };
  science?: { rows: ScienceRow020[]; matches: number; tested: number; distinguishable: boolean };
}
function choice020(value: string, values: readonly string[]) {
  if (!values.includes(value)) throw new RangeError("HUMANITIES020_CHOICE");
  return value;
}
export function allocate020(criterion: string) {
  choice020(criterion, ["equal", "need"]);
  const a = criterion === "equal" ? 6 : 8, b = 12 - a;
  return { a, b, needA: 8, needB: 4, unmetA: Math.max(0, 8 - a), surplusB: Math.max(0, b - 4) };
}
export function logic020(rule: string, rain: boolean, sprinkler: boolean) {
  choice020(rule, ["direct", "reverse"]);
  if (typeof rain !== "boolean" || typeof sprinkler !== "boolean") throw new RangeError("HUMANITIES020_WORLD");
  const rows: LogicRow020[] = [];
  for (const r of [false, true]) for (const s of [false, true]) {
    const wet = r || s, conditional = !r || wet;
    const premises = conditional && (rule === "direct" ? r : wet);
    const conclusion = rule === "direct" ? wet : r;
    rows.push({ rain: r, sprinkler: s, wet, premises, conclusion, counter: premises && !conclusion });
  }
  const counterCount = rows.filter(row => row.counter).length;
  return { rows, actual: Number(rain) * 2 + Number(sprinkler), counterCount, valid: counterCount === 0 };
}
export function science020(data: string, hypothesis: string) {
  choice020(data, ["paired", "crossed"]); choice020(hypothesis, ["heat", "damp"]);
  const rows: ScienceRow020[] = [];
  for (const heat of [false, true]) for (const damp of [false, true]) {
    const observed = data === "crossed" || heat === damp ? (damp ? 10 : 4) : null;
    rows.push({ heat, damp, observed, prediction: (hypothesis === "heat" ? heat : damp) ? 10 : 4 });
  }
  const tested = rows.filter(row => row.observed !== null).length;
  const matches = rows.filter(row => row.observed !== null && row.observed === row.prediction).length;
  return { rows, matches, tested, distinguishable: data === "crossed" };
}
const knowledgeTests020: Record<string, { label: string; claim: string; check: string; reason: string }> = {
 world: { label: "Uygunluk", claim: "Kapı açıktır.", check: "Aynı kapı aynı anda gözleniyor; kapı açık.", reason: "Yargı, söz ettiği aynı olguyla sınanır. Burada doğruluk ölçütü sorulur." },
 system: { label: "Tutarlılık", claim: "Bu yargı doğrudur.", check: "Kişi, yargının kabul ettiği öteki yargılarla uyumunu esas alıyor.", reason: "Kişinin ölçütü, yargıların birbiriyle uyumudur. Dış olguya uygunluk ayrıca sorulabilir." },
 consensus: { label: "Ortak kabul", claim: "Bu yargı doğrudur.", check: "Kişi, herkesin bu yargıyı ortak kabul etmesini esas alıyor.", reason: "Metindeki kişi tümel uzlaşımı esas alır. Ortak kabul, olguda yanılmayı tek başına önlemez." },
 clear: { label: "Apaçıklık", claim: "Bu yargı doğrudur.", check: "Kişi, yargıyı kuşku duymadan açık ve seçik kavradığını esas alıyor.", reason: "Metindeki ölçüt açık ve seçik kavrayıştır. Kolay okunan bir yazı olmakla aynı şey değildir." },
 work: { label: "Yarar", claim: "Bu yargı doğrudur.", check: "Kişi, bu düşüncenin deneyimde işe yarayıp sorun çözmesini esas alıyor.", reason: "Kişi pratik sonucu ölçüt yapar. Konu burada bilgi yargısıdır; ahlaki eylem puanı değildir." },
};
const motives020: Record<string, { label: string; text: string; reason: string }> = {
 duty: { label: "Ödev", text: "Ece, başkasının hakkına saygıyı ödev bildiği için cüzdanı geri veriyor.", reason: "Gerekçe, ödev bilincidir. Aynı dış eylem yalnız ödül için de yapılabilir; niyeti metinden okuruz." },
 outcome: { label: "Sonuç", text: "Ece, sahibinin kaybını ve aileye doğacak zararı azaltmak için cüzdanı geri veriyor.", reason: "Gerekçe, eylemin etkilediği kişiler için doğan sonuçtur. Yalnız Ece'nin kazancı sorulmuyor." },
 virtue: { label: "Erdem", text: "Ece, dürüst ve adaletli bir karakter geliştirmek için cüzdanı geri veriyor.", reason: "Gerekçe, nasıl bir kişi olmak istediğidir. Tek eylem bütün yaşamı boyunca erdemli olduğunu kanıtlamaz." },
};
const conditions020: Record<string, { info: string; choice: string; evidence: string }> = {
 free: { info: "Ece cüzdanın kime ait olduğunu biliyor.", choice: "Bilgi açık; baskı verilmemiş ve başka seçenek var.", evidence: "Bilgi ve seçim koşulları açık. Verilen gerekçe, eylemin tek başına adından çıkmaz." },
 hidden: { info: "Kime ait olduğu Ece'den gizlenmiş; aracı kişi bilgiyi yanlış veriyor.", choice: "Kararının dayandığı bilgi değişti; bilgiye erişimi ayrıca sorulmalı.", evidence: "Bilgi gizliyse sorumluluk için bu koşula da bakılır. Buradan otomatik sıfır sorumluluk çıkmaz." },
 threat: { info: "Ece cüzdanın sahibini biliyor.", choice: "Bir kişi ciddi tehditle aynı eylemi yapması için baskı kuruyor.", evidence: "Baskı, seçenek ve denetimi inceleme nedeni olur. Derecesi bilinmeden kesin sorumluluk kararı verilmez." },
};
export function buildHumanitiesScene020(lessonId: string, input: Partial<HumanitiesState020> = {}): HumanitiesScene020 {
 if (!Object.hasOwn(forge020HumanitiesTopics, lessonId)) throw new RangeError("HUMANITIES020_LESSON");
 const s = { ...humanitiesDefaults020, ...input };
 if (lessonId === "felsefeyi-tanima") {
  const allocation = allocate020(s.criterion); choice020(s.angle, ["apply", "grounds"]);
  const reflection = s.angle === "grounds";
  return { kind: "allocation", context: "On iki parça var. A'nın ihtiyacı sekiz, B'nin ihtiyacı dört. Toplam miktar değişmiyor; seçilen adalet ölçütü değişiyor.",
   question: reflection ? "Bu ölçütü adil saymak için hangi gerekçem var?" : "Seçilen ölçüt, A ve B'ye kaç parça veriyor?",
   nodes: [{ label: "Ölçüt", text: s.criterion === "equal" ? "Aynı miktar ölçütü seçildi." : "İhtiyaca göre miktar ölçütü seçildi." }, { label: "A'nın payı", text: `${allocation.a} parça verildi; ihtiyaç 8 parça.` }, { label: "B'nin payı", text: `${allocation.b} parça verildi; ihtiyaç 4 parça.` }],
   links: [{ from: 0, to: 1, label: "Payı belirler" }, { from: 0, to: 2, label: "Payı belirler" }], allocation,
   decision: reflection ? "Ölçüte geri dönüş" : "Ölçütü uygulama", options: ["Ölçütü uygulama", "Ölçüte geri dönüş"],
   reason: reflection ? "Soru, adalet ölçütümüz için gerekçe ister. Bu, refleksif bir sorudur." : "Soru, verilen ölçütün bu olaydaki paylarını bulur. Kendi ölçütünün nedenini henüz sormaz.",
   evidence: [`A'ya ${allocation.a}, B'ye ${allocation.b} parça: toplam 12.`, allocation.unmetA ? "A'nın ihtiyacında 2 parça açık kalır; B'nin payı ihtiyacını 2 parça aşar." : "Bu örnekte iki ihtiyaç da verilen miktarla karşılanır.", "Bu sayılar tek başına her durumda tek doğru adalet görüşünü kanıtlamaz."] };
 }
 if (lessonId === "felsefe-ile-dusunme") {
  const logic = logic020(s.rule, s.rain, s.sprinkler), actual = logic.rows[logic.actual];
  return { kind: "logic", context: "Bu hazır bahçe modelinde yağmur veya fıskiye varsa zemin ıslak; ikisi de yoksa kurudur. Kural bu dört mümkün durumun tümünde sınanır.",
   question: s.rule === "direct" ? "Yağmur varsa zemin ıslak. Yağmur var. O hâlde zemin ıslak mı?" : "Yağmur varsa zemin ıslak. Zemin ıslak. O hâlde yağmur var mı?",
   nodes: [{ label: "Yağmur", text: s.rain ? "Seçili durumda yağmur var." : "Seçili durumda yağmur yok.", active: s.rain }, { label: "Fıskiye", text: s.sprinkler ? "Seçili durumda fıskiye açık." : "Seçili durumda fıskiye kapalı.", active: s.sprinkler }, { label: "Zemin", text: actual.wet ? "Zemin ıslak." : "Zemin kuru.", active: actual.wet }],
   links: [{ from: 0, to: 2, label: "Islatabilir" }, { from: 1, to: 2, label: "Islatabilir" }], logic,
   decision: logic.valid ? "Geçerli" : "Geçersiz", options: ["Geçerli", "Geçersiz"],
   reason: logic.valid ? "Dört durumda öncüller doğruyken sonuç yanlış olmuyor. Verilen biçim geçerli." : "Yağmur yok, fıskiye açık olduğunda öncüller doğru ama yağmur sonucu yanlış. Biçim geçersiz.",
   evidence: [`Karşı model sayısı: ${logic.counterCount}.`, actual.premises ? `Seçili satırda öncüller doğru; sonuç ${actual.conclusion ? "doğru" : "yanlış"}.` : "Seçili satırda öncüllerin tümü doğru değil; bu satır tek başına karşı model olamaz.", "Bu kapalı örnekteki tabloyu gerçek dünyadaki bütün nedenlerin listesi sayma."] };
 }
 if (lessonId === "varlik-felsefesi") {
  choice020(s.foundation, ["material", "dual", "idea"]); const dual = s.foundation === "dual", material = s.foundation === "material";
  const nodes: HumanitiesNode020[] = dual ? [{ label: "Madde", text: "Bağımsız maddi temel.", root: true }, { label: "Zihin", text: "Ayrı ve bağımsız zihinsel temel.", root: true }, { label: "Beden", text: "Maddi temelle açıklanır." }, { label: "Düşünme", text: "Zihinsel temelle açıklanır." }] : [{ label: material ? "Madde" : "İdea", text: material ? "Tek bağımsız temel madde kabul edilir." : "Bu hazır görüşte tek temel ideal gerçeklik kabul edilir.", root: true }, { label: "Beden", text: "Seçilen tek temelle açıklanır." }, { label: "Düşünme", text: "Seçilen tek temelle açıklanır." }];
  return { kind: "ontology", context: "Şema, hazırlanmış üç görüşün açıklama yapısını karşılaştırır. Ok, kabul edilen temelden onunla açıklanan duruma gider; bir fizik deneyi göstermez.", question: "Kaç bağımsız temel kabul edildi? Temelin niteliği ne?", nodes,
   links: dual ? [{ from: 0, to: 2, label: "Maddi açıklama" }, { from: 1, to: 3, label: "Zihinsel açıklama" }] : [{ from: 0, to: 1, label: "Tek temele bağlı" }, { from: 0, to: 2, label: "Tek temele bağlı" }],
   decision: dual ? "İki temel" : "Tek temel", options: ["Tek temel", "İki temel"],
   reason: dual ? "Madde ve zihin bu görüşte iki bağımsız temeldir. İki nesne saymakla aynı iddia değildir." : "İki durum anılsa da aynı tek temelle açıklanır. Nesne sayısı temel sayısı değildir.",
   evidence: [dual ? "Nicelik: düalizm." : "Nicelik: monizm.", dual ? "Nitelik: madde ve zihin ayrımı." : material ? "Nitelik: maddi temel." : "Nitelik: ideal temel.", "Şema bu görüşleri kavramak içindir; hangi varlık görüşünün kesin doğru olduğunu puanlamaz."] };
 }
 if (lessonId === "bilgi-felsefesi") {
  choice020(s.question, ["source", "criterion"]); choice020(s.test, Object.keys(knowledgeTests020)); const source = s.question === "source", test = knowledgeTests020[s.test];
  return { kind: "knowledge", context: source ? "Ece aynı kapıya bakıp kapının açık olduğu yargısına ulaşıyor. Yargının nasıl elde edildiği soruluyor." : `${test.claim} ${test.check} Kişinin kullandığı doğruluk ölçütü soruluyor.`,
   question: source ? "Bu yargı hangi yolla elde edildi?" : "Kişi yargıyı neye göre doğru sayıyor?",
   nodes: source ? [{ label: "Gözlem", text: "Ece açık kapıyı görüyor." }, { label: "Yargı", text: "Kapı açıktır." }] : [{ label: "Yargı", text: test.claim }, { label: "Denetim", text: test.check }],
   links: [{ from: 0, to: 1, label: source ? "Edinme yolu" : "Ölçüte göre denetim" }],
   decision: source ? "Bilgi kaynağı" : "Doğruluk ölçütü", options: ["Bilgi kaynağı", "Doğruluk ölçütü"],
   reason: source ? "Görme, bu örnekte yargının duyusal kaynağıdır. Sorulan, nasıl elde edildiğidir." : test.reason,
   evidence: [source ? "Kaynak: duyusal deneyim." : `Metindeki ölçüt: ${test.label}.`, "Aynı gözlem, başka soruda yargıyı olguyla sınama işlevi görebilir.", "Bir kişinin ölçütünü tanımak, o ölçüte yanılmazlık vermek değildir."] };
 }
 if (lessonId === "bilim-felsefesi") {
  const science = science020(s.data, s.hypothesis); const matches = science.matches === science.tested;
  return { kind: "science", context: "Bu kurgu düzende sıcaklık ve nem dışında koşullar aynı tutulur. Ölçülen sonuç 4 veya 10 birimdir. Sol sayı veri, sağ sayı seçili savın öngörüsü.",
   question: s.data === "paired" ? "Yalnız soğuk-kuru ve sıcak-nemli çift, iki açıklamayı ayırır mı?" : "Dört çapraz koşulda seçili varsayımın öngörüsü veriye uyuyor mu?",
   nodes: [{ label: "Varsayım", text: s.hypothesis === "heat" ? "Yalnız sıcaklık yüksekse 10; değilse 4 öngörülür." : "Yalnız nem yüksekse 10; değilse 4 öngörülür." }, { label: "Veri", text: `${science.tested} koşulda ölçüm var; ${science.matches} öngörü bu veriye uyuyor.` }], links: [{ from: 0, to: 1, label: "Öngörü ile veriyi karşılaştır" }], science,
   decision: !science.distinguishable ? "Henüz ayrılmıyor" : matches ? "Veriyle uyumlu" : "Veriye uymuyor", options: ["Henüz ayrılmıyor", "Veriyle uyumlu", "Veriye uymuyor"],
   reason: !science.distinguishable ? "İlk iki koşulda sıcaklık ve nem birlikte değişir. İki açıklama da aynı öngörüyü verir." : matches ? "Nem farklıysa sonuç da farklı; nem sabitken sıcaklık farkında sonuç aynı. Seçili öngörü uyuyor." : "Nem sabitken sıcaklık farklı olsa da sonuç aynı. Yalnız sıcaklık savının iki öngörüsü veriye uymuyor.",
   evidence: [`Uyum: ${science.matches} / ${science.tested}.`, !science.distinguishable ? "Eksik iki koşul ölçülürse tek etken değişimi izlenebilir." : "Dört koşul, bu iki hazır açıklamayı bu örnekte ayırır.", "Veriye uymak, bütün gerçek sistemlerde tek nedenin kanıtı veya kuramın yasaya dönüşmesi değildir."] };
 }
 choice020(s.motive, Object.keys(motives020)); choice020(s.condition, Object.keys(conditions020)); const motive = motives020[s.motive], condition = conditions020[s.condition];
 return { kind: "ethics", context: `${motive.text} ${condition.info} ${condition.choice}`, question: "Bu gerekçe hangi odağı öne çıkarıyor? Bilgi ve seçim için ne verildi?",
  nodes: [{ label: "Bilgi", text: condition.info }, { label: "Seçenek", text: condition.choice }, { label: "Gerekçe", text: motive.text }, { label: "Eylem", text: "Cüzdan sahibine geri verilir." }],
  links: [{ from: 0, to: 3, label: "Bilgi koşulu" }, { from: 1, to: 3, label: "Denetim koşulu" }, { from: 2, to: 3, label: "Metindeki niyet" }],
  decision: `${motive.label} odağı`, options: ["Ödev odağı", "Sonuç odağı", "Erdem odağı"], reason: motive.reason,
  evidence: [condition.evidence, "Dış eylem aynı kalabilir; gerekçenin rolü değişir.", "Bu şema ahlaki puan veya kesin sorumluluk hükmü üretmez."] };
}
