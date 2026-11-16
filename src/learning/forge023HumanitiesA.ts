import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const guideSpecs023A: (LessonGuide & { title: string; detail: string })[] = [
  {
    id: "din-ve-islam",
    title: "Din ve İslam: kaynaktan inanç ve davranışa",
    detail: "detail-78",
    minutes: 95,
    objectives: [
      "Dinin İslamî tanımındaki kaynak, irade ve amaç ilişkisini açıkla.",
      "Fıtrat, haniflik, tevhit, tasdik, ikrar ve ameli farklı bağlamlarda ayır.",
      "Altı iman esası ile İslam’ın beş şartını doğru sınıflandır.",
      "Nisâ 136 ve ilgili öğretim metinlerinin vurgusunu kanıtıyla yorumla.",
    ],
    sections: [
      {
        title: "Din hakkında hangi soruyu soruyoruz?",
        paragraphs: [
          "Din, inançları, ibadetleri, ahlaki ilkeleri ve insanın anlam arayışıyla kurduğu ilişkileri inceleyen bir kavramdır. Bu ünitede önce İslam öğretisinin kendi din tanımını öğrenecek, ardından bu tanımın kaynak, muhatap ve amaç bakımından ne söylediğini ayıracaksın.",
          "Bir dinin kendisini nasıl açıkladığı ile bir araştırmacının onun toplumsal etkisini nasıl incelediği farklı sorulardır. Kaynağı açıklayan cümleyi işlevi açıklayan cümleye çevirmeden oku. Böylece aynı din hakkında söylenmiş her cümleyi aynı tür tanım sanmazsın.",
        ],
      },
      {
        title: "İslamî tanımın üç bağlantısı",
        paragraphs: [
          "MEB kaynaklarında İslam âlimlerinin ortak tanımı, Allah tarafından peygamberler aracılığıyla bildirilen ve akıl sahiplerini kendi iradeleriyle iyiye yönelten ilahî düzen üzerinde kurulur. Kaynak Allah, bildirim yolu peygamberlik, yönelen özne ise akıl ve irade sahibi insandır.",
          "Bu tanımdaki öğeleri bir haberin öğeleri gibi ayırabilirsin: Kimden geliyor, kime ulaşıyor ve neye yöneltiyor? Dünya ve ahiret mutluluğu amaç olarak anılır. Sadece toplumsal alışkanlığın uzun süredir tekrarlanması bu tanımın ilahî kaynak koşulunu tek başına karşılamaz.",
        ],
      },
      {
        title: "Üç âlimin tanımını karşılaştır",
        paragraphs: [
          "OGM karşılaştırmasında Tehânevî dünya iyiliği ve ahiret kurtuluşunu, Cürcânî peygamberin bildirdiği gerçeklerin benimsenmesini, Elmalılı Hamdi Yazır ise hür iradeyle iyi davranışa yönelmeyi öne çıkarır. Vurguları farklı olsa da ilahî kaynak ortak bağdır.",
          "Bu isimleri bağımsız kelime ezberleri yerine tanımdaki odaklarla ilişkilendir. Bir soru sadece ortak yönü isterse her tanımda bulunan dayanağı ara. Bir tanımda özellikle geçen ahiret vurgusunu diğer iki kısa alıntıda açıkça yazılmış gibi göstermemelisin.",
        ],
      },
      {
        title: "Din sözcüğünün bağlamları",
        paragraphs: [
          "Kur’an’daki kullanımlarda din sözcüğü itaat, kulluk, yol, hüküm ve karşılık gibi farklı anlamlarla ilişkilendirilebilir. Sözcüğün hangi anlamda kullanıldığını cümlenin yaptığı iş belirler; her kullanım yalnız bir ibadetin adı değildir.",
          "Bir metinde hesap ve karşılık anlatılıyorsa karşılık anlamı, teslim olma ve kulluk anlatılıyorsa itaat boyutu öne çıkabilir. Soruda verilen kısa cümleyi kendi Türkçenle yeniden söylemek, tek sözcüğe sabit karşılık yapıştırmaktan daha açıklayıcıdır.",
        ],
      },
      {
        title: "Ulûhiyet ve ubûdiyet",
        paragraphs: [
          "Ulûhiyet, ilahlık ve ibadet edilen varlıkla ilgili boyutu; ubûdiyet ise kulluk ve ibadet eden insanın yönelişini anlatır. Biri ilah kavramına, diğeri kulun tutum ve görevine bakar. İki terim aynı ilişkinin farklı taraflarını adlandırır.",
          "Bir şemada Allah’a yönelen insanı düşün. Kulluğu anlatan ok ubûdiyetle, ilah olma niteliği ulûhiyetle ilişkilidir. Bu ayrım bir insanı ilah yerine koymak veya iki bağımsız din tasarlamak değildir; aynı ilişkinin özne ve yöneldiği varlık bakımından okunmasıdır.",
        ],
      },
      {
        title: "Vahiy ve peygamberlik",
        paragraphs: [
          "Vahiy, İslam inancında Allah’ın peygamberlerine bildirdiği ilahî mesajdır. Peygamberler bu mesajı insanlara ulaştırır; bu bildirim görevi tebliğ kavramıyla anılır. Kaynak, ulaştırma yolu ve öğrenen topluluk aynı kavram değildir.",
          "Bir cümlede peygamberin rehberliğinden söz edildiğinde onun mesajın bağımsız ilahî kaynağı olduğu sonucu çıkarılmaz. İlahi kaynak ile elçilik görevini ayır. Bu ayrım, din tanımındaki peygamberler aracılığıyla ifadesinin neden bulunduğunu anlamana yardım eder.",
        ],
      },
      {
        title: "İslam öğretisinde ortak çağrı",
        paragraphs: [
          "MEB anlatımında Hz. Âdem’den Hz. Muhammed’e kadar peygamberlerin ortak çağrısı Allah’ın birliği, peygamberlik ve ahiret sorumluluğu etrafında açıklanır. Bu, İslam’ın peygamberlik tarihine ilişkin kendi inanç çerçevesidir.",
          "Ortak temel inanç çağrısından bütün dönemlerdeki her toplumsal uygulamanın ve her ayrıntının aynı olduğu sonucu çıkmaz. Bir soru ortak temeli soruyorsa tevhit ve sorumluluk bağını kullan; bütün tarihsel farklılıkları silen bir genelleme ekleme.",
        ],
      },
      {
        title: "Fıtrat: doğuştan gelen yatkınlık",
        paragraphs: [
          "Fıtrat, İslam öğretisinde insanın yaratılıştan taşıdığı temel yetenek ve eğilimlerle, özellikle inanma ve anlam arayışına yönelme kapasitesiyle ilişkilendirilir. Bu anlatımda insan öğrenmeye, düşünmeye ve sorumluluk almaya elverişli yaratılmıştır.",
          "Yatkınlık ile sonradan edinilmiş ayrıntılı bilgi farklıdır. Bir çocuğun öğrenebilme yeteneği, bütün kitapları okumuş olması demek değildir. Benzer biçimde fıtrat ifadesi, kişinin bütün ibadet kurallarını doğduğu anda ayrıntısıyla bilip uyguladığını göstermez.",
        ],
      },
      {
        title: "Haniflik ve Hz. İbrahim",
        paragraphs: [
          "Haniflik, İslam kaynaklarında Allah’a ortak koşmadan tevhide yönelişi anlatır. Hz. İbrahim’in tevhid çizgisiyle güçlü biçimde ilişkilendirilir. Hanif sözcüğü bu yönelişi benimseyen kişiyi ifade eder; yalnız genel bir merak duygusunun adı değildir.",
          "Fıtrat ile hanifliği ayırırken yaratılıştan eğilim ve belirli inanç yönelişi eksenlerini kullan. Aynı metinde ikisi ilişkilendirilebilir, ama bu onların her cümlede birbirinin yerine geçeceğini göstermez. İbrahim ve ortak koşmama vurgusu hanifliğe özgü kanıt sağlar.",
        ],
      },
      {
        title: "Tevhit ve şirk",
        paragraphs: [
          "Tevhit, İslam inancında Allah’ın bir, tek ve eşsiz yaratıcı olduğunu kabul etmektir. Şirk ise bu inanç çerçevesinde Allah’a ortak koşmayı ifade eder. Tevhit, peygamberlerin ortak çağrısının temelinde öğretilen merkezî kavramdır.",
          "Tek sözcükle tanım yapmadan önce önermenin ne söylediğine bak. Allah’ın tekliği hakkında bir ifade tevhit konusudur; insanların yaratılıştan taşıdığı eğilim ise fıtratla ilgilidir. İki kavram bir metinde birlikte bulunabilir, fakat sorunun istediği vurgu değişebilir.",
        ],
      },
      {
        title: "İman ve tasdik",
        paragraphs: [
          "İman, İslam öğretisinde Allah’ın birliğine, peygamberliğe ve bildirilen inanç esaslarına gönülden inanıp benimsemeyi anlatır. Tasdik ise içten onaylama boyutunu adlandırır. Kalben kabul etme vurgusu sözle söyleme veya davranışta bulunmadan ayrı okunur.",
          "Öğretim örneğinde kişinin inandığı açıkça söylenmişse metindeki bu bilgiyi kullanabilirsin. Yalnız dışarıdan görülen tek davranış verildiğinde ise iç dünyası hakkında kesin hüküm kurma. Kavramı tanımakla gerçek bir kişiye inanç kimliği atamak aynı işlem değildir.",
        ],
      },
      {
        title: "İkrar ve amel",
        paragraphs: [
          "İkrar, inandığını sözle ifade etme; amel ise davranış ve eylem boyutudur. Bir açıklamada önce içten benimseme, sonra sözle bildirme, ardından buna uygun eylem sıralanabilir. Bu sırada tasdik, ikrar ve amel farklı düzeyleri adlandırır.",
          "Birinin söz vermesi ile verdiği sözü yerine getirmesi arasında fark vardır. Sözü ikrar, eylemi amel yönünden inceleyebilirsin; fakat her gündelik söz otomatik dinî ikrar değildir. Dinî bağlamı ve metnin açıkça hangi inancı anlattığını da korumalısın.",
        ],
      },
      {
        title: "İman ve İslam ilişkisi",
        paragraphs: [
          "İslam sözcüğü teslimiyet, barış ve esenlik gibi anlamlarla ilişkilidir. Dinî kullanımında Allah’a yönelme, bildirilenleri benimseme ve bu doğrultuda yaşama çerçevesini anlatır. İman ve İslam ders anlatımında birbirini tamamlayan kavramlar olarak ele alınır.",
          "İmanı yalnız söz, İslam’ı yalnız tek bir ibadet diye daraltma. İç kabul ile dışa yansıma ayrımı öğrenmeyi kolaylaştırır; buna rağmen kavramların dinî kullanımını iki bütünüyle ilişkisiz alanmış gibi ayırmamalısın. Asıl ilişki inancın yaşantıya taşınmasıdır.",
        ],
      },
      {
        title: "Altı iman esası",
        paragraphs: [
          "Geleneksel MEB anlatımında Allah’a, meleklere, kitaplara, peygamberlere, ahirete ve kadere inanma altı iman esası olarak öğretilir. Liste inancın yöneldiği temel başlıkları düzenler; bir ibadet takvimi veya davranış puanlama ölçeği değildir.",
          "Öğeleri ezberledikten sonra hangi sınıfı temsil ettiklerini de söyle. Meleklere inanma inanç esasıyken namaz belirli bir ibadettir. Dinle ilişkili bütün terimleri tek torbaya koymak, altı esas ile beş şart sorularını birbirine karıştırır.",
        ],
      },
      {
        title: "İslam’ın beş şartı",
        paragraphs: [
          "Kelimeişehadet, namaz, Ramazan orucu, zekât ve hac İslam’ın beş şartı başlığında öğretilir. Bu liste ile altı iman esası aynı sınıflama değildir. Şehadet inancın sözle bildirilmesiyle, diğer öğeler temel uygulamalarla ilişkilidir.",
          "Zekât ve hac gibi ibadetlerin kişiye ilişkin yükümlülük şartları ayrıca vardır. Listede bir ibadetin bulunması, bütün insanların her koşulda aynı yükümlülüğe sahip olduğu anlamına gelmez. Sınıflama sorusu ile belirli kişinin şartlarını değerlendirme sorusunu ayır.",
        ],
      },
      {
        title: "Esasların kaynağı, bütünlüğü ve sürekliliği",
        paragraphs: [
          "İslam inanç esaslarının vahye dayandığı, bir bütün oluşturduğu ve temel inanç ilkelerinin zaman ya da coğrafyayla değişmediği öğretilir. Bütünlük, listedeki bir esası benimseyip başka birini keyfî olarak reddetmenin bu çerçeveyle uyuşmamasıdır.",
          "Burada bütünlükten söz etmek, insanların her ibadeti aynı düzeyde yerine getirdiğini söylemek değildir. Bir inanç esasını reddetme önermesi ile bir davranışı yerine getirmeme önermesi kavramsal olarak ayrıdır. Sınav metninin hangisini verdiğini önce belirle.",
        ],
      },
      {
        title: "Mümin ve esmayıhüsna: inancın kavram dili",
        paragraphs: [
          "Mümin, İslam öğretisinde iman eden kişi için kullanılan terimdir; iman sözcüğü inanmayı, mümin ise bu inanca sahip olan kişiyi adlandırır. Tasdik, ikrar ve amel ayrımı bu dilde farklı yönleri gösterir. Sözlük ve öğretiyi öğrenmek, bir insanın tek görünür davranışından onun bütün iç dünyasını kesin ölçebildiğimiz anlamına gelmez.",
          "Esmayıhüsna Allah’ın güzel isimleri demektir. MEBİ inanç esaslarını açıklarken bu isimlerin Allah’ın birliğini ve yüceliğini tanımaya yardım ettiğini belirtir. Örneğin Alîm bilme, Semî işitme, Basîr görme niteliğiyle ilişkilidir. İsim ve sıfat bilgisini inançla bu bağ üzerinden kur; aynı olay birden fazla niteliği düşündürebilse de soruda verilen belirleyici fiili koru.",
        ],
      },
      {
        title: "Nisâ 136: birlikte kabulü oku",
        paragraphs: [
          "MEB kaynakları Nisâ suresinin 136. ayetini inanç esaslarının birlikte kabulü çerçevesinde inceler. Allah’a, elçiye, kitaplara ve ahirete ilişkin unsurların birlikte anılması, parçalı kabul yaklaşımından farklı bir bütünlük vurgusu kurar.",
          "Ayet hakkında soru çözmek, başlığında iman geçen her seçeneği doğru saymak değildir. Seçenekteki her kilit ilişkiye metinde dayanak ara. Sadece bazı peygamberleri kabul etme fikri ile peygamberler arasında keyfî kabul-ret ayrımı yapmama fikri aynı sonucu vermez.",
        ],
      },
      {
        title: "Cibril hadisi ve ihsan",
        paragraphs: [
          "Cibril hadisi adıyla anılan öğretimde iman, İslam ve ihsan birlikte açıklanır. İman temel inançları, İslam temel uygulamaları, ihsan ise Allah’ın gözetimi bilinciyle özenli kulluğu ilişkilendirir. Üç başlık birbiriyle bağlantılı farklı odaklar taşır.",
          "İhsanı sadece bir ibadetin adı veya altı iman esasına eklenen yedinci madde sanma. Bu bağlamda eylemin bilinç ve özen boyutunu anlatır. Aynı sözcüğün başkasına iyilik yapmak gibi başka kullanımları da bulunduğundan sorunun bağlamı belirleyicidir.",
        ],
      },
      {
        title: "Metinden kavrama ve yeni örneğe",
        paragraphs: [
          "Önce cümlede verilen şeyi kendi sözlerinle söyle: yaratılış eğilimi, iç onay, sözlü ifade, eylem veya birlik inancı. Ardından buna karşılık gelen kavramı seç. Böylece anahtar kelimeyi bulup sorunun kalanını okumamayı bir yöntem sanmazsın.",
          "Kavramı seçtikten sonra en yakın başka kavramın neden uygun olmadığını açıkla. Sonraki yeni soruda kişi ve ortam değişse de aynı ayrımı kendin kurmayı dene. Modeldeki hazır örneği görmek puan veya öğrenme kaydı üretmez; bağımsız sorular ayrı bölümde çözülür.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı metinde üç farklı düzey",
        prompt:
          "Bir özgün anlatıda kişi bir inancı içten benimsediğini söylüyor, bunu sözle bildiriyor ve ardından inancına uygun davranmaya çalışıyor. İç kabul, söz ve eylem hangi kavramlarla ayrılır?",
        strategy:
          "Üç fiili sırayla kalben kabul, sözle bildirim ve uygulama olarak göster.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İçten benimseme, inancın tasdik boyutudur; henüz sadece konuşma veya gözlenen eylem değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "İnandığını sözle açıklama ikrarla ilişkilidir; açıklanan inanç ile açıklama eylemi farklı düzeylerdir.",
          },
          {
            label: "3. adım",
            explanation:
              "İnanca uygun eyleme yönelme amel boyutudur. Üçünü ilişkili ama özdeş olmayan düzeyler olarak sıralarız.",
          },
        ],
        answer: "Tasdik → ikrar → amel.",
        check:
          "Her kavramı metindeki ayrı fiile bağladığında hiçbir veri dışarıda kalmaz.",
        pitfall:
          "Söylüyor fiilini görüp sorunun içten benimseme boyutunu tamamen ikrar saymak.",
      },
      {
        title: "İki listeyi yeniden kur",
        prompt:
          "Bir kartta ahiret, kader, namaz, oruç, kitaplara inanma ve hac var. Bu altı öğeyi altı iman esası ve İslam’ın şartları bakımından ayır.",
        strategy:
          "Öğenin inancın yöneldiği başlık mı, temel uygulama mı olduğuna bak.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Ahirete, kadere ve kitaplara inanma altı iman esasının içindeki üç öğedir.",
          },
          {
            label: "2. adım",
            explanation:
              "Namaz, Ramazan orucu ve hac İslam’ın beş şartı içinde öğretilen üç öğedir; kart her listenin tamamı değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki grup dinle ilişkili olsa da farklı sınıflamalar taşır. Toplam altı kart olması altı iman esasının tam listesi olduğunu göstermez.",
          },
        ],
        answer:
          "İman: ahiret, kader, kitaplara inanma. Şartlar: namaz, Ramazan orucu, hac.",
        check:
          "Geri kalan iman esaslarını Allah, melek ve peygamber; beş şartın kalanlarını şehadet ve zekât diye tamamlayabilirsin.",
        pitfall: "Verilen kart sayısını sınıfın adıyla eşitlemek.",
      },
      {
        title: "Eğilim mi yöneliş mi?",
        prompt:
          "A metni doğuştan anlam arama kapasitesini, B metni ise Hz. İbrahim’le ilişkilendirilen ortak koşmadan tevhide yönelmeyi açıklıyor. Kavramları eşleştir.",
        strategy:
          "Doğuştan yatkınlık ile belirli inanç yönelişini ayrı ölçüt yap.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A’nın ayırt edici öğesi doğuştan gelen kapasitedir; fıtrat bu düzeyi anlatır.",
          },
          {
            label: "2. adım",
            explanation:
              "B’nin ayırt edici öğeleri İbrahim ve ortak koşmadan tevhid yönelişidir; haniflik bu bağlamı karşılar.",
          },
          {
            label: "3. adım",
            explanation:
              "İki kavram dinî anlatımda ilişkili olabilir, ancak farklı tanım koşullarını korur.",
          },
        ],
        answer: "A: fıtrat. B: haniflik.",
        check:
          "B’de yaratılış eğilimi değil yönelişin adı sorulduğunu yeniden kontrol et.",
        pitfall:
          "Her iki metinde insan ve inanç bulunduğu için aynı kavramı seçmek.",
      },
      {
        title: "Bütünlük iddiasının sınırı",
        prompt:
          "Bir açıklama inanç esaslarının birlikte kabul edildiğini söylüyor. Öğrenci bundan bütün insanların bütün ibadetleri aynı düzeyde yaptığı sonucunu çıkarıyor. Hangi geçiş yanlış?",
        strategy:
          "İnanç esasını kabul ile fiilen uygulanan davranışı iki ayrı önerme yap.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Başlangıçta verilen bilgi inanç esaslarının birlikte kabulüne ilişkindir.",
          },
          {
            label: "2. adım",
            explanation:
              "Öğrencinin sonucu ise bütün insanların fiilî davranışını ve aynı düzeyde uygulamasını anlatır; konu ve kapsam değişmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Başlangıç öncülü bu gözlem bilgisini vermediği için çıkarım kurulamaz.",
          },
        ],
        answer:
          "İnanç bütünlüğünden herkesin aynı fiilî davranışına geçiş kanıtsızdır.",
        check:
          "Sonuçtaki herkes, bütün ibadetler ve aynı düzey ifadelerinin her biri için başlangıçta kanıt var mı bak.",
        pitfall:
          "Norm veya inanç ilkesiyle ölçülmüş toplumsal davranışı aynı saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Tasdik, ikrar ve amel arasındaki farkı yeni bir örnekle açıkla.",
        answer:
          "Tasdik içten onay, ikrar inancın sözle bildirilmesi, amel davranış boyutudur. Örnekte her düzeyi ayrı fiille göster; tek davranıştan kişinin bütün iç inancını ölçme.",
      },
      {
        prompt:
          "Fıtratın bulunması bütün ibadet kurallarının doğuştan bilinmesi demek midir?",
        answer:
          "Hayır. Yatkınlık ve kapasite ayrıntılı edinilmiş bilginin aynısı değildir. Öğrenmeye elverişli olmak bütün kitapları okumuş olmak değildir.",
      },
      {
        prompt: "Kader ve zekâtı hangi iki ayrı listede tutarsın?",
        answer:
          "Kader inancı altı iman esası içinde, zekât İslam’ın beş şartı içinde öğretilir. Dinle ilgili bütün terimler aynı sınıf değildir.",
      },
      {
        prompt:
          "Nisâ 136 öğretiminde bütünlük vurgusunu hangi karşıt önerme açığa çıkarır?",
        answer:
          "Bazı peygamberleri benimseyip diğerlerini keyfî reddetme ile birlikte kabul arasındaki fark bütünlük vurgusunu açığa çıkarır. Bu öğretim ilkesinden gerçek kişiler hakkında sınırsız kimlik hükmü üretme.",
      },
    ],
    source:
      "MEBİ TYT Din Kültürü konu özeti: din ve İslam hedef metinleri; OGM Din ve İslam ders notu; Aurelia Din ve İslam kopya kâğıdı. Kaynaklardan geliştirilmiş özgün anlatım, model ve öğretim soruları; resmî sınav sorusu değildir.",
  },
  {
    id: "islam-ve-ibadet",
    title: "İslam ve ibadet: niyet, yükümlülük ve ahlak",
    detail: "detail-79",
    minutes: 115,
    objectives: [
      "İbadetin özel ve geniş kapsamını niyet ve eylem koşuluyla açıkla.",
      "Mükellef, farzıayn, farzıkifaye, vacip, sünnet ve diğer hüküm türlerini örnekle ayır.",
      "Kur’an ve sünnete uygunluk, niyet ve ihlasın farklı görevlerini ilişkilendir.",
      "Bakara 177’de iman, ibadet ve ahlakın birlikteliğini gerekçelendir.",
    ],
    sections: [
      {
        title: "Kulluk ve ibadet kavramı",
        paragraphs: [
          "İbadet, İslam öğretisinde Allah’a sevgi, saygı ve bağlılıkla yönelmeyi; emirleri yerine getirip yasaklardan kaçınmayı kapsar. Yalnız bedenle yapılan bir hareket değildir. İnanç, amaç ve davranış arasındaki bağ ibadetin anlamını kurar.",
          "Önce hangi anlamın kullanıldığını sor: Vakti ve biçimi belli bir ibadet mi anlatılıyor, yoksa günlük hayattaki iyi davranışın kullukla ilişkisi mi? Bu soru farklı örnekleri aynı torbaya atmak yerine kapsamları birbirine bağlamanı sağlar.",
        ],
      },
      {
        title: "Dar kapsam: biçimi belirli ibadetler",
        paragraphs: [
          "Namaz, oruç, zekât ve hac özel anlamda ibadet örnekleridir. Her birinin vakit, koşul, uygulama veya miktar gibi kendine özgü kuralları vardır. Bu nedenle herhangi bir güzel davranışın adını doğrudan namazın yerine koymak doğru bir sınıflama değildir.",
          "Özel kapsam geniş ibadet anlayışının dışında ayrı bir din oluşturmaz. Bir kümenin daha belirli alt alanı gibi düşünebilirsin. Oruç özel bir ibadetken verilen niyetle yapılan yardım genel kulluk çerçevesinde incelenebilir; iki örnek aynı uygulama türü değildir.",
        ],
      },
      {
        title: "Geniş kapsam ve salih amel",
        paragraphs: [
          "İslam kaynaklarında Allah rızasına yönelik iyi ve yararlı işler salih amel olarak adlandırılır. Anne babaya iyi davranma, bilgiyi paylaşma, dürüst çalışma ve çevreyi koruma bu kapsamda ele alınabilir. Amaç ve eylemin ahlaki niteliği birlikte önemlidir.",
          "Bir eylemin güzel görünmesi kişinin iç niyetini dışarıdan kesin olarak ölçmez. Öğretim metni amacı açıkça bildiriyorsa onu kullan; bildirmiyorsa niyet bilgisini eksik bırak. Bu ayrım yardımın olumlu değerini reddetmek değil, metnin neyi kanıtladığını doğru sınırlandırmaktır.",
        ],
      },
      {
        title: "Kötülükten kaçınmak da bir eylemdir",
        paragraphs: [
          "İbadetin geniş anlamı yalnız bir şeyi yapmakla sınırlı değildir. Yalan, haksızlık ve başkasına zarar verme gibi davranışlardan Allah rızası amacıyla kaçınma da kullukla ilişkilendirilir. Böylece sorumluluk hem olumlu davranma hem zararı önleme boyutu kazanır.",
          "Bir sınav örneğinde yanlış bilgiyi yaymayan kişinin ne yaptığına bak: Kaynağı araştırmak ve zararı önlemek somut davranışlardır. Sadece hareket etmedi diye hiçbir sorumluluk göstermediğini söyleme; hangi kötülükten hangi gerekçeyle kaçındığı belirleyicidir.",
        ],
      },
      {
        title: "Âbit, mabet ve mabut",
        paragraphs: [
          "Âbit ibadet eden kişiyi, mabet ibadet edilen yeri, mabut ise kendisine ibadet edileni ifade eder. Benzer sesler taşımalarına rağmen kişi, mekân ve yönelinen varlık olarak farklı öğeleri adlandırırlar.",
          "Bir cümleyi üç soruyla çözebilirsin: Kim yapıyor, nerede yapıyor, kime yöneliyor? Cami mabet örneğiyken onu kullanan kişi âbit olarak anlatılabilir. Bu sözcükleri sadece harf benzerliğiyle ezberlemek, bir cümlenin öznesini mekânla karıştırmaya yol açabilir.",
        ],
      },
      {
        title: "Temel amaç ile yardımcı sonuç",
        paragraphs: [
          "MEB anlatımında ibadetin temel amacı Allah’ın rızasıdır. İbadetlerin öz denetim, dayanışma veya zaman düzeni gibi bireysel ve toplumsal yararları da açıklanır. Amaç, eylemin niçin yapıldığını; yarar ise onunla ilişkilendirilen başka sonucu anlatır.",
          "Oruç ve paylaşma arasındaki empati bağına değinmek, ibadetin yalnız toplumsal fayda için yapıldığını söylemek değildir. Soruda temel amaç mı yoksa toplumsal işlev mi istendiğini ayır. Aynı örnekte farklı düzeyler doğru olabilir, fakat aynı sorunun cevabı olmayabilir.",
        ],
      },
      {
        title: "Mükellef ve sorumluluk koşulları",
        paragraphs: [
          "Mükellef, dinî emir ve yasaklarla sorumlu tutulan kimseyi ifade eder. Ders çerçevesinde akıl, ergenlik, irade ve güç yetirebilme koşulları ele alınır. Bazı ibadetlerde maddi imkân gibi ayrıca belirli şartlar da bulunur.",
          "Bu koşullar kişiye göre farklı uygulama ve kolaylıkları açıklamaya yarar. Bir hastalık adından bütün ibadet sorumluluğunun kaybolduğunu veya bir mazeretten her yükümlülüğün silindiğini çıkarma. Burada genel kavram öğrenilir; belirli kişi hakkında ayrıntılı fıkıh hükmü verilmez.",
        ],
      },
      {
        title: "Efâlimükellefin: davranışların hüküm dili",
        paragraphs: [
          "Efâlimükellefin, yükümlü sayılan kişinin davranışlarına ilişkin dinî hükümleri ifade eder. Yapılması istenen, yapılmaması istenen ve kişinin serbest bırakıldığı davranışlar farklı başlıklara ayrılır. Sınıflama eylemin türünü düzenler; insanın değerine puan vermez.",
          "Farz, vacip, sünnet ve mendup yapılması istenen; haram ve mekruh kaçınılması istenen; mubah ise serbestlik alanında öğretilir. Aynı listede yer almak aynı derecede yükümlülük anlamına gelmez. Her terimin ölçütünü ve kullanıldığı mezhep bağlamını da koru.",
        ],
      },
      {
        title: "Farz ve farzıayn",
        paragraphs: [
          "Farz, yapılması kesin ve bağlayıcı biçimde istenen davranışlar için kullanılır. Farzıayn, şartları oluşan her yükümlü bireyin kendisinin yerine getirmesi gereken yükümlülüktür. Beş vakit namaz ve Ramazan orucu temel örneklerdir.",
          "Zekât ve hac da farzıayn başlığında öğretilir; ancak ilgili maddi ve diğer koşullar gözetilir. Başka birinin kendi namazını kılması, koşulları bulunan başka kişinin namaz yükümlülüğünü üstlenmiş olmaz. Bireysel sorumluluğun ayırıcı özelliği budur.",
        ],
      },
      {
        title: "Farzıkifaye: ortak sorumluluk",
        paragraphs: [
          "Farzıkifaye, gerekli işi yeterli bir grubun yerine getirmesiyle diğerlerinden sorumluluğun kalktığı toplumsal yükümlülüktür. Cenaze namazı ders kaynaklarındaki belirgin örnektir. İhtiyaç hiç karşılanmazsa ortak sorumluluk devam eder.",
          "Bunu bir yarışta en hızlı kişinin kazanması gibi düşünme. Belirleyici şey işin gerekli biçimde yerine getirilmesidir. Toplum için gerekli hizmetlerin devamlılığı örneğinde de görevlerin adını ezberlemekten önce ortak ihtiyacın yeterince karşılanıp karşılanmadığını sor.",
        ],
      },
      {
        title: "Vacip ve mezhep bağlamı",
        paragraphs: [
          "Vacip, Hanefî terminolojisinde bağlayıcılığı bulunan, delil derecesi bakımından farzdan ayrı ele alınan hükümdür. Vitir, bayram namazı ve fıtır sadakası okul kaynaklarının örnekleri arasındadır. Diğer fıkıh ekollerinin terim kullanımı aynı ayrımı yapmayabilir.",
          "Bu nedenle vacip kelimesini gördüğünde hangi anlatım çerçevesinin verildiğine bak. Onu tüm mezheplerde bağımsız ve bütünüyle aynı kategori sayma. Nafile ile de karıştırma; vacip, bu çerçevede sırf isteğe bağlı ve terkinde sorumluluk bulunmayan bir davranış değildir.",
        ],
      },
      {
        title: "Sünnetin iki kullanımı",
        paragraphs: [
          "Sünnet geniş kullanımda Hz. Muhammed’in söz, davranış ve onaylarına dayanan örnekliği ve dinî kaynağı anlatır. Hüküm sınıflamasında ise farz ve vacip dışındaki belirli uygulamalar için kullanılabilir. Sözcüğün hangi anlamda geçtiği cümleye bağlıdır.",
          "Bir kaynak olarak sünnet ile listedeki hüküm derecesini tek boyuta indirme. Kur’an ve sünnet denildiğinde kaynak ilişkisi; farz, vacip ve sünnet denildiğinde davranışın hüküm türü karşılaştırılıyor olabilir. Sorunun sınıflama eksenini korumak yanlış eşleştirmeyi önler.",
        ],
      },
      {
        title: "Müekkede ve gayrimüekkede",
        paragraphs: [
          "Ders anlatımında sünnetimüekkede, Hz. Peygamber’in sürdürdüğü ve nadiren terk ettiği uygulamalarla; gayrimüekkede ise bazen yaptığı bazen yapmadığı uygulamalarla ilişkilendirilir. Sabah namazının sünneti ilk türe, ikindinin ilk sünneti ikinci türe örnek verilir.",
          "Bu ayrımı bütün kişilerin davranış sıklığını ölçen bir istatistik sanma. Burada kaynaklarda anlatılan peygamber uygulamasının sürekliliği sınıflanır. İki türün varlığı, farz ve sünnetin bütünüyle aynı yükümlülük düzeyinde olduğu sonucunu da vermez.",
        ],
      },
      {
        title: "Mendup, müstehap ve nafile",
        paragraphs: [
          "Mendup, yapılması kesin bağlayıcı olmaksızın istenen ve terk edilmesi kınanmayan davranışlar için kullanılır. Müstehap ve nafile terimleri de yakın bağlamlarda yer alır. Teheccüt ve kuşluk gibi ek namazlar temel öğretim örnekleridir.",
          "Bir davranışın gönüllü olması onu değersiz yapmaz; yalnız yükümlülük türünü açıklar. Farz olanla isteğe bağlı olanı ayırmak için kökte verilen zorunluluk koşulunu oku. Her ibadeti farz veya her güzel davranışı nafile diye tek sınıfa indirme.",
        ],
      },
      {
        title: "Mubah, helal ve caiz",
        paragraphs: [
          "Mubah, kişinin yapıp yapmamakta dinen serbest bırakıldığı davranışları anlatır. Helal ve caiz sözcükleri bazı bağlamlarda yakın anlamda kullanılır; helal daha geniş kullanımda haramın karşıtı olarak da yer alır. Bağlamı korumak terimleri doğru eşleştirmeyi sağlar.",
          "İzin verilen bir davranışın ayrıca farz olması gerekmez. Örneğin uygun koşulda dinlenmeye izin verilmesi, herkesin her an dinlenmek zorunda olduğu anlamına gelmez. Davranışın amacı, başkasının hakkı ve zarar koşulu değişirse örneğin değerlendirme çerçevesi de değişebilir.",
        ],
      },
      {
        title: "Haram ve mekruh",
        paragraphs: [
          "Haram kesin yasakla, mekruh ise yapılması hoş karşılanmayan davranışlarla ilişkilendirilir. MEB listesinde iki terim kaçınılması istenen davranışlar tarafında gösterilir. Yasak türünün ve delil değerlendirmesinin ayrıntıları fıkıh ekollerinde farklı ele alınabilir.",
          "Mekruhu sırf haram değil diye olumlu ve önerilen eylem sayma. Haram ile de bütün ayrıntıları aynı kategoriymiş gibi eşitleme. Kavram sorusunda verilen tanımın bağlayıcılık derecesini ayır; özel bir günlük olay için uygulamadan kişisel hüküm üretme.",
        ],
      },
      {
        title: "Kur’an ve sünnete uygunluk",
        paragraphs: [
          "İbadetlerde temel ilke, ilgili dinî dayanağa ve peygamberin gösterdiği uygulamaya uygunluktur. Bu, her gündelik yeniliğin yeni bir ibadet olduğu anlamına gelmez. İbadetin kendisi ile onu kolaylaştıran araç ve toplumsal düzen farklıdır.",
          "Örneğin bir duyurunun yeni iletişim aracıyla yapılması, ibadetin temel yapısının değiştirildiğini tek başına göstermez. Soruda hangi unsurun değiştiğini belirt: ibadet kuralı mı, araç mı, öğrenme yöntemi mi? Bu ayrım bidat kavramını bağlamsız genişletmeyi önler.",
        ],
      },
      {
        title: "Niyet, ihlas ve riya",
        paragraphs: [
          "Niyet eylemin yöneldiği amacı; ihlas bu amacın içtenlikle Allah rızasına yönelmesini anlatır. Riya ise gösteriş için davranmayla ilişkilendirilir. Aynı dış hareket farklı amaçlarla yapılabileceği için görünen biçim ile iç amaç iki ayrı veri olarak incelenir.",
          "Bir anlatıda gösteriş amacı açıkça verilmişse bunu kavramla eşleştirebilirsin. Ancak sadece çok kişinin gördüğü bir yardım sahnesinden otomatik riya hükmü çıkarma. Görülürlük ile gösteriş amacı aynı şey değildir; sorunun gerçekten verdiği amaç bilgisini kullan.",
        ],
      },
      {
        title: "İhsan, dua, tövbe ve şükür",
        paragraphs: [
          "İhsan bu bağlamda Allah’ın gözetimi bilinciyle özenli kulluğu; dua Allah’a yönelip dilekte bulunmayı; tövbe yanlışından dönme ve düzeltmeye yönelmeyi; şükür ise nimetin değerini bilip teşekkür etmeyi anlatır. Her biri yönelişin farklı bir boyutunu açar.",
          "Bir metin hatayla yüzleşmeyi ertelememeyi anlatıyorsa yalnız dua kelimesini seçmek bütün mesajı karşılamayabilir. Pişmanlığın davranış değişikliğiyle nasıl bağlandığını izle. Başkasının hakkı söz konusuysa düzeltme sorumluluğu yalnız güzel bir söz söylemeye indirgenmez.",
        ],
      },
      {
        title: "İbadet ve ahlak arasında bağ kur",
        paragraphs: [
          "Kaynaklar namazı zaman düzeniyle, orucu öz denetim ve empatiyle, zekâtı paylaşma ve dayanışmayla, haccı eşitlik ve ortak aidiyetle ilişkilendirir. Bunlar ibadetin öğretilen ahlaki yönlerini açıklayan bağlantılardır; kişilerin gerçek davranışını otomatik ölçen puanlar değildir.",
          "Örnekte hangi bağın gerçekten anlatıldığını göster. Malların ihtiyaç sahipleriyle paylaşılması dayanışma hakkında doğrudan kanıt taşırken namazın bütün teknik şartlarını açıklamaz. Bir ibadet adını görmek o ibadetle ilgili her bilginin aynı metinden çıkarılabileceği anlamına gelmez.",
        ],
      },
      {
        title: "Bakara 177 ve birr",
        paragraphs: [
          "Bakara suresinin 177. ayeti öğretimde birr kavramıyla, yani iyilik ve erdemin iman, ibadet ve ahlak boyutlarının birlikteliğiyle incelenir. İnanç esasları, paylaşma, namaz, zekât, sözü tutma ve güçlükler karşısında sabır aynı çerçevede ilişkilendirilir.",
          "Bu birlikte anılma yalnız dış biçimin yeterli görülmediğini gösterir; ibadetlerin bütünüyle gereksiz olduğu sonucunu vermez. Metnin iman, ibadet ve ahlak verilerini ayrı işaretle, sonra nasıl bağlandıklarını söyle. Bir alanı vurgulamak diğer ikisini metinden silmek değildir.",
        ],
      },
      {
        title: "Bağımsız soruda kullan",
        paragraphs: [
          "Bir soru için önce ne istendiğini belirle: kapsam, hüküm derecesi, niyet, ahlaki sonuç veya metnin mesajı. Sonra verilen eylemi ve koşullarını kısa cümlelerle yaz. En yakın iki kavramı ayıran ölçütü bulduğunda seçeneklerin gerçek farkı görünür olur.",
          "Birden çok şart varsa ilk bulduğun kelimeyle sonuca atlama. Niyetin belirtilmemesi, belirli maddi koşulun eksikliği veya olumsuz soru kökü cevabı değiştirebilir. Aynı yöntemi farklı kişi ve davranış üzerinden yeniden kurmak, hazır örneğin harfini hatırlamaktan daha kapsamlı bir çalışmadır.",
        ],
      },
    ],
    examples: [
      {
        title: "Eksik niyet verisi sonradan gelirse",
        prompt:
          "Özgün bir metin, bir kişinin sahildeki çöpü topladığını söylüyor. İkinci sürüm aynı eyleme “Bunu Allah rızası için yaptığını açıklıyor.” bilgisini ekliyor. İki sürümün niyet kanıtı aynı mıdır?",
        strategy:
          "Eylemi sabit tut; eklenen amaç cümlesinin hangi bilgiyi değiştirdiğini belirle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk sürümde bilinen somut fiil çöp toplama, bilinmeyen ise kişinin bu eylemi hangi iç amaçla yaptığıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci sürüm amaç beyanı ekler; eylem aynı kalır ama metindeki dinî niyet bilgisi artık açıkça bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu fark, ilk sürüme ne kesin gösteriş ne kesin dinî amaç eklemeden, ikinci sürümün verdiği yeni bilgiyi kullanmamızı sağlar.",
          },
        ],
        answer: "Hayır; ikinci sürüm yeni bir amaç beyanı ekler.",
        check:
          "Değişen veri niyet beyanıdır; toplanan çöpün miktarı ve eylemin kendisi hakkında değişiklik verilmedi.",
        pitfall:
          "İlk sürümde amaç verilmemesini ikinci sürümdeki amaçla geriye doğru kesin doldurmak.",
      },
      {
        title: "Bireysel ve ortak yükümlülük",
        prompt:
          "Bir tabloda iki yapı var: X’te görevi başka kişi yapsa da yükümlü bireyin sorumluluğu sürüyor; Y’de ise gerekli işi yeterli grubun yapmasıyla diğerlerinden sorumluluk kalkıyor.",
        strategy:
          "Görevin başkası tarafından yerine getirilmesinin etkisini karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "X’te her yükümlünün kendi görevi devam ettiği için bireysel sorumluluk yapısı vardır.",
          },
          {
            label: "2. adım",
            explanation:
              "Y’de yeterli grubun gerekli işi yapması ortak ihtiyacı karşılıyor ve diğerlerinden ilgili sorumluluğu düşürüyor.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu fark X’i farzıayn, Y’yi farzıkifaye ile eşleştirir; yalnız görevi yapan kişi sayısına bakılmaz.",
          },
        ],
        answer: "X: farzıayn. Y: farzıkifaye.",
        check:
          "Birden fazla kişinin aynı anda namaz kılması tek başına bütün bireysel görevi ortak yükümlülük yapmaz.",
        pitfall: "Çok kişi varsa mutlaka farzıkifayedir demek.",
      },
      {
        title: "Amaç ile yan yararı başka bağlamda dene",
        prompt:
          "Özgün bir depo örneğinde gönüllünün görevi yardım kutularını doğru teslim noktasına ulaştırmaktır. Bu sırada ekip içi iletişimi ve zamanı kullanmayı da öğrenir. Görevin amacı ile kazanılan yan yararlar aynı mıdır?",
        strategy:
          "Önce görevin hangi sonucu gerçekleştirmek için verildiğini, sonra süreçte başka ne kazanıldığını ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Görev tanımı kutuların doğru teslim noktasına ulaşmasını hedefliyor; işlemin başarı koşulu budur.",
          },
          {
            label: "2. adım",
            explanation:
              "İletişim ve zaman kullanma becerileri süreçte öğrenilen ek yararlardır; kutular teslim edilmeden yalnız bu becerilerin gelişmesi görevi bitirmiş sayılmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle teslim hedefi amaç, beceri gelişimi yan yarardır. Bu ayrım ibadetin temel amacıyla açıklanan yararlarını okurken de hangi sorunun sorulduğunu ayırmana yardım eder.",
          },
        ],
        answer:
          "Amaç doğru teslim; ek yararlar iletişim ve zaman kullanmayı öğrenmedir.",
        check:
          "Kutular yanlış noktaya gitseydi iletişim gelişmiş olsa bile görev amacı gerçekleşmezdi; iki ölçütü bu karşı örnek ayırır.",
        pitfall:
          "Süreçte her olumlu kazanımı görevin esas başarı koşuluyla aynı saymak.",
      },
      {
        title: "Birr notundaki eksikliği onar",
        prompt:
          "Özgün bir sınıf etkinliğinde öğrenci, Bakara 177’nin birr anlatımını yalnız yön adlarıyla özetliyor. Kaynak metinde akrabaya ve yolda kalmışa yardım ile antlaşmaya bağlılık da açıkça anılıyor. Bu özet neyi eksik bırakır?",
        strategy:
          "Özetin içerdiği bilgiyi ve verilen metinde bunun dışında kalan fiilleri karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Özet yalnız yön adları içeriyor; yardım etme ve antlaşmaya bağlı kalma fiillerini açıklayan öğe bulunmuyor.",
          },
          {
            label: "2. adım",
            explanation:
              "Akrabaya ve yolda kalmışa yardım paylaşma yönünü, antlaşmayı yerine getirme ahde vefa yönünü gösterir. Bunlar tek bir yön sözcüğünün yerine geçmez.",
          },
          {
            label: "3. adım",
            explanation:
              "Dolayısıyla özete bu somut sorumluluklar da eklenmelidir. Kaynağın erdem anlatımı, yalnız görünür yön veya biçim bilgisine indirgenemez.",
          },
        ],
        answer:
          "Özet, yardım ve ahde vefa gibi metinde açıkça verilen sorumlulukları eksik bırakır.",
        check:
          "Özeti tamamladıktan sonra verilen iki fiilin her biri için ayrı karşılık bulabiliyor muyuz diye denetle.",
        pitfall:
          "Yön ve biçim ifadesinin metindeki bütün sorumlulukları kendiliğinden anlattığını varsaymak.",
      },
    ],
    recall: [
      {
        prompt: "Niyet ile ihlası bir cümlede ayır.",
        answer:
          "Niyet eylemin yöneldiği amaçtır; ihlas bu dinî bağlamda amacın içtenlikle Allah rızasına yönelmesidir. Aynı görünür eylem iç amacı tek başına kesinleştirmez.",
      },
      {
        prompt: "Farzıayn ile farzıkifayeyi ayıran temel koşul nedir?",
        answer:
          "Başkasının gerekli işi yapmasının diğer yükümlüler üzerindeki etkisidir. Farzıaynda bireysel görev sürer; farzıkifayede yeterli yerine getirme ortak sorumluluğu düşürebilir.",
      },
      {
        prompt: "Hanefî kullanımında vacibi nafileyle neden eşitlemezsin?",
        answer:
          "Vacip bağlayıcı hüküm olarak ele alınırken nafile zorunlu olmayan ek ibadettir. Vacip terminolojisini bütün ekollerde aynı bağımsız sınıf diye genelleme.",
      },
      {
        prompt:
          "Bir ibadetin ahlaki yararı ile temel amacı neden ayrı sorulardır?",
        answer:
          "Biri eylemin niçin yapıldığını, diğeri onunla ilişkilendirilen sonucu anlatır. Aynı örnekte ikisi bulunabilir; sorunun istediği düzeye göre cevap verilir.",
      },
    ],
    source:
      "MEBİ TYT Din Kültürü ibadet hedef metinleri; OGM İslam ve İbadet ders notu ve 9.sınıf telafi etkinlikleri; Aurelia İslam ve İbadet kopya kâğıdı. Özgün öğretim içeriği; kişisel fetva veya resmî sınav sorusu değildir.",
  },
  {
    id: "ahlaki-tutum-ve-davranislar",
    title: "Ahlak ve değerler: ilkeden somut davranışa",
    detail: "detail-80",
    minutes: 105,
    objectives: [
      "Ahlaki ilke, tutum, niyet, davranış ve sonucu farklı örneklerle ayır.",
      "Dürüstlük, sabır, yardımseverlik ve adabımuaşeret ilişkilerini açıkla.",
      "Adaleti hak ve koşulla, güveni emanet ve sözle ilişkilendir.",
      "Gıpta-haset, israf-tasarruf ve mahremiyet-ilgisiz ifşa ayrımlarını gerekçelendir.",
    ],
    sections: [
      {
        title: "Ahlak neden bir ölçüt dili kurar?",
        paragraphs: [
          "Ahlak, insanın iradeli davranışlarını iyi ve kötü bakımından değerlendiren ilkeler, huylar ve sorumluluklarla ilgilidir. Bir davranışın nasıl yapıldığı kadar başkasının hakkına, verilen söze ve niyete nasıl bağlandığı da önemlidir.",
          "Bir sınıfın ortak eşyasını düşün: Eşyayı kullanabilmek, ona dilediği gibi zarar verme hakkı vermez. Özgürlük ile sorumluluk aynı olayda birlikte bulunabilir. Bu ünitede soyut değer adlarını somut davranışların dayanağına dönüştürmeyi öğreneceksin.",
        ],
      },
      {
        title: "İslam ahlakının kaynakları ve amacı",
        paragraphs: [
          "İslam ahlakının temel kaynakları Kur’an ve sünnettir. Kur’an iyilik, adalet ve ihsan gibi ilkeleri öğütler; Hz. Muhammed’in örnek yaşamı bu ilkelerin davranışa nasıl yansıtıldığını gösterir. Ahlak ilmi, iradeli davranışları iyi ve kötü bakımından değerlendirir; insanın kendisiyle, başkalarıyla ve çevreyle ilişkilerini inceler.",
          "Hasene iyi davranış, birr kapsamlı iyilik ve ihsan özenli güzel davranış bağlamlarında kullanılır. Zulüm ise hakkı çiğnemeyi anlatır. Bu sözcükleri yalnız iyi-kötü kutularına atmak yerine somut fiille bağla: bir hakkı sahibine vermek ile o hakkı engellemek aynı ilişki üzerinde farklı ahlaki sonuçlar doğurur.",
        ],
      },
      {
        title: "İlke, tutum ve davranış",
        paragraphs: [
          "İlke, farklı durumlara uygulanabilen genel ölçüttür; tutum, bir konuya yönelik görece kalıcı eğilimi; davranış ise belirli bir olayda gözlenen eylemi anlatır. Adalet bir ilke, haksızlığa duyarlılık tutum, ayrımcı karara itiraz etmek davranış olabilir.",
          "Bu üç düzey birbirine bağlanır ama özdeş değildir. Bir kişinin bir defa doğru davranması, bütün yaşamı boyunca aynı tutumu koruyacağını tek başına kanıtlamaz. Soru hangi düzeyi istiyorsa cevabını o düzeyde kur; tek olaydan kalıcı kişilik tanısı çıkarma.",
        ],
      },
      {
        title: "Niyet, eylem ve sonuç",
        paragraphs: [
          "Niyet bir eylemin neden yapıldığını, davranış ne yapıldığını, sonuç ise sonrasında ne olduğunu anlatır. Yardım etmek gözlenen eylem olabilir; dayanışma veya gösteriş amacı metinde ayrıca belirtilmelidir. Sonucun iyi olması da niyetin tek başına kesin ölçümü değildir.",
          "Özgün bir vakayı üç sütunda düzenle: amaç, hareket ve etki. Sadece ikinci sütun doluysa birinciyi zihninden tamamlama. Bu, davranışı değersiz saymak değil, bilinen bilgi ile tahmin arasındaki çizgiyi korumaktır. Sorunun kesinlik istemi özellikle burada önemlidir.",
        ],
      },
      {
        title: "Terbiye, nefis eğitimi ve irade yönetimi",
        paragraphs: [
          "Terbiye eğitme, yetiştirme ve olgunlaştırmadır; MEB öğretiminde Rab adıyla da ilişkilendirilir. Ahlak eğitimi ailede gözlem ve örnek alma ile başlar; okul, çevre ve kişinin kendi çabasıyla sürer. Nefis terbiyesi, istekleri yok saymak yerine onları ilke ve sorumlulukla yönetmeyi, iyi davranışı adım adım alışkanlığa dönüştürmeyi amaçlar.",
          "Öfkeyi hissetmekle birine zarar vermek aynı şey değildir. İrade yönetiminde kişi önce duygusunu fark eder, tepkiyi durdurur, uygun davranışı seçer ve sonucunu gözden geçirir. İfrat aşırılık, tefrit gerekli olanı eksik bırakma, itidal ölçülü dengedir. Bu denge her koşulda sayısal yarıyı seçmek değildir; hak, ihtiyaç ve sorumluluğa uygun ölçüyü gözetmektir.",
        ],
      },
      {
        title: "İslam ahlakında temel erdemler",
        paragraphs: [
          "MEB kaynakları adalet, hikmet, iffet ve şecaati temel erdemler arasında ele alır. Bunlar hak gözetme, bilgiyi yerinde kullanma, isteklerde ölçülülük ve doğru için ölçülü cesaret gibi farklı becerileri ilişkilendirir. Sabır ve cömertlik bu çerçeveyle birlikte açıklanabilir.",
          "Bu anlatım İslam ahlak geleneğinin öğretim çerçevesidir; dünyadaki bütün ahlak kuramlarının aynı dört terimi kullandığı iddiası değildir. Aynı olay birden çok erdem taşıyabilir. Soruda özellikle hangi davranışın vurgulandığını belirlemek kavramı gerekçeyle seçmeni sağlar.",
        ],
      },
      {
        title: "Dürüstlük: söz ile davranışın tutarlılığı",
        paragraphs: [
          "Dürüstlük, niyet, söz ve davranışlarda doğruluğu gözetmeyi anlatır. Ölçüyü eksiltmemek, yaptığı hatayı saklamamak, bilmediğini biliyormuş gibi sunmamak ve verdiği sözü tutmak somut örneklerdir. Kişinin yalnız kendi çıkarı için doğruyu seçmesiyle de sınırlı değildir.",
          "Bir esnafın ürünün kusurunu alıcıya bildirmesi, alıcının karar hakkını korur. Ahilik kaynaklarda dürüstlük, güven ve cömertlikle ilişkili tarihî bir esnaf geleneği olarak anılır. Bu bağlantı bütün tarihî esnafın her olayda kusursuz davrandığı anlamına gelmez.",
        ],
      },
      {
        title: "Hile: gerçeği farklı göstererek aldatma",
        paragraphs: [
          "Hile, karşı tarafı yanıltmak için gerçeği başka türlü göstermektir; sözde de davranışta da olabilir. Ölçü ve tartıyı eksik verip tam verilmiş gibi göstermek, ürünün önemli kusurunu gizlemek veya belgeyi yanıltıcı biçimde düzenlemek farklı hile örnekleridir. Doğruluk ilkesi yalnız söylenen cümleyi değil, işlemde kurulan güveni de kapsar.",
          "Mutaffifîn suresinin 1–3. ayetleri, kendisi alırken tam ölçüp verirken eksiltenleri kınar. Burada iki işlemde uygulanan farklı ölçütü fark et: kişinin kendi çıkarı için kuralı değiştirmesi adaleti ve güveni bozar. Yanlışlık fark edilince düzeltip eksiği tamamlamakla, farkında olarak eksik vermeyi sürdürmek aynı sorumluluk durumu değildir.",
        ],
      },
      {
        title: "Emanet ve güvenilirlik",
        paragraphs: [
          "Emanet yalnız ödünç alınan eşya değildir; teslim edilen görev, sır, belge ve kişisel bilgi de emanet ilişkisi doğurabilir. Güvenilirlik verilen sorumluluğu gerektiği gibi yerine getirmeyle ilişkilidir. Sadece güzel konuşmak görevi tamamlamanın yerine geçmez.",
          "Bir kurum harcama raporunu açık tutarken yardım alanların özel bilgilerini koruyabilir. Hesap açıklığı ve mahremiyet farklı bilgi türlerine uygulanır. Her şeyi gizlemek veya her şeyi herkesle paylaşmak yerine hangi bilginin kime karşı sorumluluk doğurduğunu ayır.",
        ],
      },
      {
        title: "Sabır: dayanma ve kararlı eylem",
        paragraphs: [
          "Sabır, zorluklar karşısında dayanma gücüyle ve öfke ya da istekleri denetleyerek doğru davranışta kararlı kalmayla ilişkilidir. Bir işi öğrenirken hatayı düzeltip çalışmayı sürdürmek de sabır örneği olabilir. Yalnız hiçbir şey yapmadan beklemek değildir.",
          "Haksızlık karşısında sakin biçimde hakkını aramak sabırla bağdaşabilir. Şiddetten kaçınmak, güvenlik veya yardım yollarını tamamen bırakmak anlamına gelmez. Kaynaklardaki öz denetim vurgusunu zarara sessiz kalma zorunluluğuna dönüştürmemelisin.",
        ],
      },
      {
        title: "Yardımseverlik ve onur",
        paragraphs: [
          "Yardımseverlik, başkasının ihtiyacını gözeterek maddi veya manevi destek sunma çabasıdır. Para vermenin yanında bilgi paylaşmak, ulaşımı kolaylaştırmak veya bir işi birlikte yapmak da örnek olabilir. Yardımın miktarı tek ölçüt değildir.",
          "Destek verirken kişinin onurunu korumak ve onu teşhir etmemek önemlidir. Bir yardımın görünür olmasıyla gösteriş amacı aynı şey değildir; metindeki niyet kanıtı ayrıca aranır. Örneğin ihtiyaç sahibinin adını yaymadan yardım ulaştırma, yardım ile mahremiyeti birlikte gözetebilir.",
        ],
      },
      {
        title: "Adabımuaşeret ve nezaket",
        paragraphs: [
          "Adabımuaşeret, toplum içindeki ilişkilerde saygı ve nezaketi esas alan görgü kurallarını anlatır. Söz kesmemek, konuşurken kırıcı davranmamak, ortak alanı temiz bırakmak ve uygun biçimde selamlaşmak günlük örneklerdir.",
          "Görgü kuralının biçimi farklı toplumlarda değişebilir; saygı ve hak gözetme ilkeleriyle bağlantısı ayrıca düşünülür. Sadece bir selam biçimini farklı kullanan kişiye ahlaksızlık atfetme. Önce davranışın bağlamını ve başkasının hakkını nasıl etkilediğini incele.",
        ],
      },
      {
        title: "Adalet ve eşitlik arasındaki bağ",
        paragraphs: [
          "Adalet hak sahibinin hakkını gözetmek, gerekçesiz kayırmadan kaçınmak ve ilgili koşulları dikkate almaktır. Eşit haklara sahip olmak her kişinin her durumda birebir aynı miktar destek alacağı anlamına gelmez. İhtiyaç, katkı veya anlaşma koşulu örneğe göre önem taşıyabilir.",
          "Modelimizde açıklanan ölçüt, kaçırılan ders kadar destek vermektir. İki ve altı saat eksiği olan öğrencilerin ihtiyacı farklı olduğundan dört-dört paylaşım ile iki-altı paylaşım farklı açık bırakır. Bu sınırlı örnek, bütün ahlaki sorunları tek formülle çözen evrensel adalet makinesi değildir.",
        ],
      },
      {
        title: "Hikmet ve iyi muhakeme",
        paragraphs: [
          "Hikmet, bilgiyi yerinde kullanma, olayın anlamını düşünme ve doğru eyleme yönelme boyutuyla öğretilir. MEB’in İslam ahlakı anlatımında imanla aydınlanan akıl ve ölçülü davranış bağlantısı da vurgulanır. Sadece çok sayıda bilgi cümlesi ezberlemekle sınırlı değildir.",
          "Bir duyumu hemen yaymak yerine kaynağını denetleyip ilgili kişilerin hakkını gözeten bir çözüm aramak bilgiyi amaçla ilişkilendirir. Bu örnek, tek bir kararın kişiye bütün konularda bilgelik kazandırdığını söylemez; olayda kullanılan muhakeme biçimini gösterir.",
        ],
      },
      {
        title: "İffet ve şecaat",
        paragraphs: [
          "İffet, istek ve davranışlarda ölçüyü koruyarak kişinin onurunu ve sınırlarını gözetmesini anlatır; yeme, konuşma ve harcama gibi alanlara da uzanır. Şecaat ise hakkı savunmak için ölçülü cesarettir. İki kavram farklı yönlerden öz denetimle ilişkilidir.",
          "Korkusuzca her tehlikeye atılmak şecaatin yeterli koşulu değildir. Ölçülülük de kişinin hiçbir hak talebinde bulunmaması demek değildir. Sakin, gerekçeli ve güvenli yoldan yanlış uygulamaya itiraz etmek hem cesareti hem kendini yönetmeyi birlikte gösterebilir.",
        ],
      },
      {
        title: "Merhamet ve ihsan",
        paragraphs: [
          "Merhamet, başkasının sıkıntısını fark edip zararını azaltmaya yönelmeyle ilişkilidir. İhsan, iyilik yapmak ve işi güzel, özenli biçimde yerine getirmek anlamlarında kullanılır. İbadet bağlamında ise Allah’ın gözetimi bilinciyle kulluk anlamı öne çıkabilir.",
          "Bir davranış sorusunda sadece acıdığını söylemek ile somut destek sunmak aynı veri değildir. İhsan sözcüğünü gördüğünde de bağlamı kontrol et: başkasına iyilik mi, işte özen mi, bilinçli kulluk mu? Bir kelimenin birden fazla ilgili kullanımı olabilir.",
        ],
      },
      {
        title: "Gıpta ile haset",
        paragraphs: [
          "Gıpta, başkasındaki iyi durumun yok olmasını istemeden benzer iyiliği kendisi için de istemektir. Haset ise başkasının sahip olduğu iyiliğin ortadan kalkmasını istemeyle ilişkilendirilir. İki durumda da başkasının başarısı görülebilir; ayıran şey ona yönelen istektir.",
          "Bir arkadaşının düzenli çalışmasını örnek almak tek başına haset değildir. Metinde onun başarısız olmasını isteme açıkça verildiğinde değerlendirme değişir. Yakın iki kavramı ayıran bu koşulu bulmak, yalnız başarı sözcüğünü görüp etiket seçmekten daha güvenilirdir.",
        ],
      },
      {
        title: "Gıybet, iftira ve sorumlu bildirim",
        paragraphs: [
          "Gıybet kişinin arkasından hoşlanmayacağı yönünü konuşmayla, iftira ise asılsız suçlama veya yanlış isnatla ilişkilidir. Yalan bir isnadı sırf konuşulan kişi yok diye sadece gıybet başlığında bırakmak, doğruluk sorununu görünmez kılar.",
          "Bir zararı önlemek veya hak aramak için doğru ve gerekli bilgiyi ilgili yetkiliye ölçülü biçimde iletme, amaçsız kötülemeyle aynı değildir. Kapsam ve amaç önemlidir. Gereksiz kişisel bilgileri kalabalığa yaymayı da hak aramanın zorunlu parçası sanmamak gerekir.",
        ],
      },
      {
        title: "Mahremiyet alanları ve tecessüs",
        paragraphs: [
          "Mahremiyet kişinin özel hayatı ve korunması gereken bilgi alanıdır. Beden mahremiyeti bedene ve örtüsüne; bilgi mahremiyeti kişisel kayıtlara; mekân mahremiyeti özel yaşam alanına; dijital mahremiyet çevrim içi verilere ilişkindir. Tecessüs, başkasının gizli hâl ve kusurlarını araştırmaktır; merak tek başına özel alana girme yetkisi vermez.",
          "Bir arkadaşının telefonunu izinsiz incelemek dijital ve bilgi alanını, odasına izinsiz girip özel belgesini okumak mekân ve bilgi alanını birlikte ihlal edebilir. Alanlar birbirini dışlamaz. Bir zarar veya hak ihlalini güvenli ve yetkili birime gerektiği ölçüde bildirmek ise eğlence için gizli bilgi araştırıp yaymakla aynı amaç ve kapsamda değildir.",
        ],
      },
      {
        title: "Suizan, hüsnüzan ve haberin doğrulanması",
        paragraphs: [
          "Zan kesin bilgiye dayanmayan kanaattir. Suizan yeterli kanıt olmadan bir kişi hakkında kötü kanaate yönelmeyi, hüsnüzan ise iyi niyetli değerlendirmeyi anlatır. Bir arkadaşın mesaja cevap vermediğinde bunu hemen kasıtlı saymak, olayın henüz bilinmeyen nedenini kötü niyetle doldurmaktır. Gecikmenin nedenini uygun biçimde sormak ek bilgi sağlayabilir.",
          "Hüsnüzan gözlenen bir tehlikeyi yok saymak veya her iddiayı doğru kabul etmek değildir. Bir haberin kaynağını araştırmak, kanıt ile yorumu ayırmak ve doğrulanmamış suçlamayı yaymamak birlikte yürütülür. Yanlış olduğu bilinen söz yalanla, bir kişiye asılsız kusur yükleme iftirayla, kanıtsız kötü kanaat ise suizanla ilişkilidir; sorunun verdiği fiile bak.",
        ],
      },
      {
        title: "İsraf, tasarruf ve cimrilik",
        paragraphs: [
          "İsraf gereksiz savurganlığı, tasarruf kaynağı amacına uygun ve ölçülü kullanmayı, cimrilik ise gereken uygun harcamadan kaçınmayı anlatır. Bir harcamanın az olması tek başına iyi olduğunun kanıtı değildir; ihtiyacın karşılanıp karşılanmadığına bakılır.",
          "Gereksiz yanan lambayı kapatmakla güvenli çalışma için gereken ışığı kapatmak aynı durum değildir. İlkinde fazlalık azaltılır; ikincisinde ihtiyaç ihmal edilebilir. Miktar yerine önce amaç ve ihtiyaç koşulunu yazmak bu yakın örnekleri ayırmanı sağlar.",
        ],
      },
      {
        title: "Ahlakın toplumsal ilişkileri",
        paragraphs: [
          "Dürüstlük, sabır, yardımseverlik ve nezaket güven ve dayanışmayı destekleyen ilkeler olarak açıklanır. İnsanların verdiği söze güvenebilmesi, ortak kaynakları koruması ve çatışmayı şiddetsiz çözebilmesi birlikte yaşamanın koşullarıyla ilişkilidir.",
          "Bu etkiler öğretimin açıkladığı ilişkiler ve hedeflerdir; bir okulda nezaket afişi asılınca bütün sorunların ölçülmüş biçimde bittiği iddiası değildir. Kuralla gerçek uygulamayı ayır. Metinde yalnız ilke öneriliyorsa gerçekleşmiş toplumsal sonucu kesin veri sayma.",
        ],
      },
      {
        title: "Hucurât 11–12: onur, kanaat ve gizlilik",
        paragraphs: [
          "Hucurât suresi Medine dönemindendir; MEB bu ünitede 11 ve 12. ayetleri insan onuru ve toplumsal ilişki bakımından ele alır. 11. ayet alay etmeyi, karalamayı ve incitici lakapları; 12. ayet günaha götüren zanları, gizlilikleri araştırmayı ve gıybeti eleştirir. Aynı metinde farklı fiillerin sayılması, hepsinin tek kelimeyle aynı davranış olduğu anlamına gelmez.",
          "Birini küçük düşürmek için taklit etmek alay, özel konuşmasını gizlice dinlemek tecessüs, bulunmadığı yerde incitici kusurunu konuşmak gıybet bağlamındadır. Metnin amacı kusur avcılığı ve küçük düşürmenin yerine saygılı ilişkiyi kurmaktır. Hak arama ve zararı yetkiliye bildirme de kişinin onuru ve gerekli bilgi sınırı gözetilerek yürütülür; suçun örtülmesi kuralı çıkarılmaz.",
        ],
      },
      {
        title: "Bir vakayı beş adımda çöz",
        paragraphs: [
          "Önce kişileri ve somut fiilleri belirle; sonra sorunun istediği değeri, koşulu veya çıkarımı yaz. Niyet verilmiş mi kontrol et, en yakın kavramla farkı kur ve sonunda seçeneği metindeki kanıtla eşleştir. Bu sırada yeni kişi veya sonuç ekleme.",
          "Olumsuz kökte ölçüte uyanları bulup dışarıda kalanı gerekçelendir. Kesinlik isteniyorsa olası başka açıklamayı metnin engelleyip engellemediğine bak. Farklı bir olayda aynı ilişkiyi kendin kurmak için ilk çözümü kapatıp yeni bir örnekle dene; model keşfi otomatik öğrenme puanı üretmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Hak ölçütüne göre destek",
        prompt:
          "Özgün örnekte A öğrencisinin 3, B öğrencisinin 9 saat öğrenme eksiği bulunuyor. Toplam 8 saatlik destek, eksik saatle orantılı ayrılacak. Dağılımı bul.",
        strategy:
          "Önce toplam ihtiyacı, sonra verilen kaynağın bu toplam içindeki oranını bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Toplam ihtiyaç 3 + 9 = 12 saattir. İhtiyaç oranı A:B=1:3’tür.",
          },
          {
            label: "2. adım",
            explanation:
              "Kaynak 8 saat olduğundan A için 8 × 3/12 = 2, B için 8 × 9/12 = 6 saat ayrılır.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam 8 saat korunur; kalan ihtiyaç A’da 1, B’de 3 saattir. Kaynak tüm ihtiyacı karşılamaya yetmez.",
          },
        ],
        answer: "A:2 saat, B:6 saat; kalan ihtiyaç sırasıyla 1 ve 3 saattir.",
        check:
          "2 + 6 = 8 ve karşılanan oran her iki öğrencide de 2/3. Bu örnekte ilan edilen ölçüt ihtiyaç oranıdır.",
        pitfall:
          "Kaynak yetersizken bütün ihtiyaçların bittiğini veya her dağılımın evrensel ahlak kuralı olduğunu söylemek.",
      },
      {
        title: "Açık kural ile özel alanı ayır",
        prompt:
          "Özgün bir spor salonu tüm üyelerine ortak alan kullanım kurallarını duyuruyor. Bir üyenin soyunma alanındaki görüntüsünün izinsiz paylaşılmasına ise izin vermiyor. Kuralları açıklamakla bu görüntüyü korumak çelişir mi?",
        strategy:
          "Ortak kullanım bilgisi ile kişiye ait özel görüntünün kime ve hangi amaçla ait olduğunu ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Ortak alan kuralının duyurulması üyelerin aynı kullanım bilgisini bilmesini sağlar; bu bilginin muhatabı bütün üyelerdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Soyunma alanındaki kişinin görüntüsü özel beden ve yaşam alanına ilişkindir; kuralları bilme hakkı bu görüntüyü izinsiz yayma hakkı oluşturmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "İki karar farklı bilgi türlerine ve amaçlara aittir. Ortak kuralın açıklığı korunurken kişinin özel görüntüsünün gizliliği de korunabilir.",
          },
        ],
        answer:
          "Çelişki yoktur; ortak kural açık, kişiye ait özel görüntü korunur.",
        check:
          "İzinsiz görüntü yerine üyelerin okuyacağı kullanım kuralı konursa erişim koşulu değişir; nedenini bilgi türüyle açıkla.",
        pitfall:
          "Açıklık ilkesinin her türlü kişisel içerik üzerinde sınırsız yayın izni verdiğini sanmak.",
      },
      {
        title: "Gıpta mı haset mi?",
        prompt:
          "İpek bir arkadaşının güzel çizimlerinden esinlenip ders alıyor ve onun başarısının devam etmesini diliyor. Başka biri ise aynı başarının yok olmasını istediğini söylüyor.",
        strategy:
          "Başkasının iyiliğinin sürmesini veya kaybolmasını isteme koşulunu karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İpek kendisi için gelişme isterken arkadaşının iyiliğine karşı çıkmıyor; gıpta bu yapıyla ilişkilidir.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci kişi diğerinin başarısının ortadan kalkmasını istiyor; hasedin ayırt edici koşulu budur.",
          },
          {
            label: "3. adım",
            explanation:
              "Her iki olayda başarı sözcüğü geçse de isteklerin yönü farklı olduğu için aynı etiket verilmez.",
          },
        ],
        answer: "İlk olay gıpta, ikinci olay hasetle ilişkilidir.",
        check:
          "İkinci metindeki yok olmasını isteme kaldırılırsa haset yargısı artık aynı kanıtla kurulamaz.",
        pitfall:
          "Ortak başarı kelimesini iki tutumu eşitlemek için yeterli görmek.",
      },
      {
        title: "İlk yanlış adımı bul",
        prompt:
          "Bir öğrenci, kullanılan sınıfın gerekli aydınlatmasını güvenliği bozacak biçimde kapatmayı sadece elektrik azalıyor diye tasarruf sayıyor. Hangi koşul atlanmış?",
        strategy:
          "Az tüketim ile gerekli ihtiyacın karşılanmasını birlikte denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Elektrik kullanımı azalabilir; bu miktara ilişkin bir bilgidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Ancak metin gerekli ve güvenli aydınlatmanın kaldırıldığını da bildirir. Bu, amaç ve hak koşuludur.",
          },
          {
            label: "3. adım",
            explanation:
              "İkinci veriyi silerek sadece azalmayı iyi saymak ilk hatadır; ölçülü kullanım gerekli ihtiyacı da korur.",
          },
        ],
        answer: "Gerekli ihtiyaç ve güvenlik koşulu atlanmıştır.",
        check:
          "Kullanılmayan odanın ışığı kapatılsaydı ihtiyaç koşulu farklı olur, aynı olumsuz sonuç zorunlu çıkmazdı.",
        pitfall:
          "Bir davranışı yalnız harcama sayısına bakarak ahlaken sınıflandırmak.",
      },
    ],
    recall: [
      {
        prompt: "Ahlaki ilke, tutum ve davranış için yeni bir üçlü ver.",
        answer:
          "Adalet genel ilke, haksızlığa duyarlılık tutum, benzer başvurulara aynı ölçütü uygulamak somut davranış örneğidir. Örnekleri düzeyleriyle eşleştir.",
      },
      {
        prompt: "Sabır neden yalnız hiçbir şey yapmadan beklemek değildir?",
        answer:
          "Öfkeyi yönetme, zorluğa dayanma ve doğru eylemde kararlı kalmayı da kapsar. Hakkını güvenli ve uygun biçimde aramak sabırla bağdaşabilir.",
      },
      {
        prompt: "Emanet sadece maddi eşya mıdır?",
        answer:
          "Hayır. Teslim edilmiş görev, sır, kişisel veri ve belge de emanet sorumluluğu doğurabilir. Hangi bilginin kime karşı hangi hakkı gerektirdiğini ayır.",
      },
      {
        prompt:
          "Tek olumlu fiilden neden ömür boyu kusursuz karakter çıkarılmaz?",
        answer:
          "Kanıt belirli olayla sınırlıdır; bütün gelecek davranışları kapsamaz. Doğru yorumu bu olayda diye sınırlandır; daha geniş yargı için ek veri gerekir.",
      },
      {
        prompt:
          "Suizan, tecessüs ve iftirayı aynı olayda hangi farklı kanıtlar ayırır?",
        answer:
          "Kanıtsız kötü kanaat suizan, gizli bilgiyi izinsiz araştırma tecessüs, kişiye asılsız kusur yükleme iftiradır. Aynı olayda birden fazlası bulunabilir; her fiili ayrı kanıtla eşleştir.",
      },
      {
        prompt:
          "İtidal neden her durumda sayısal olarak yarıyı seçmek değildir?",
        answer:
          "Ölçülülük hakkı, ihtiyacı ve sorumluluğu gözetir. İfrat aşırıya kaçmak, tefrit gerekli olanı eksik bırakmaktır. İhtiyacı farklı iki kişiye yarımşar vermek her durumda ihtiyacı karşılamaz.",
      },
    ],
    source:
      "MEBİ 9.sınıf Din Kültürü bireysel öğrenme etkinlikleri: Ahlaki Tutum ve Davranışlar; MEBİ TYT hedef kavramlarıyla karşılaştırılan Aurelia Ahlak ve Değerler kopya kâğıdı. Özgün açıklamalar ve sorular; kişisel ahlak puanı veya resmî sınav sorusu değildir.",
  },
  {
    id: "genclik-ve-degerler",
    title: "Gençlik ve değerler: kişilik, erdem ve kültür",
    detail: "detail-81",
    minutes: 100,
    objectives: [
      "Maddi ve manevi değerlerin aynı nesnede nasıl birleşebildiğini açıkla.",
      "Mizaç, karakter ve kişilik arasındaki kapsam ilişkisini örnekle göster.",
      "Adalet, hikmet, iffet ve şecaati ilgili davranış ve koşulla eşleştir.",
      "Din, örf, aile, okul, akran ve medyanın değer aktarımındaki rollerini ayır.",
    ],
    sections: [
      {
        title: "Değer dediğimiz şey nedir?",
        paragraphs: [
          "Değer, bir bireyin veya toplumun önemli ve anlamlı bulduğu maddi ya da manevi öğeleri anlatabilir. Doğruluk, adalet ve sorumluluk davranışa ölçüt olan değerlerdir. Bir tarihî yapı da korunması önemli görülen maddi ve kültürel bir değer taşıyabilir.",
          "Bir metinde değer sözcüğünü gördüğünde onun ekonomik fiyatı mı, kültürel anlamı mı, ahlaki ölçütü mü belirttiğini sor. Bir köprünün fiyatıyla ortak hafızadaki yeri aynı ölçüm değildir. Aynı sözcük farklı bağlamlarda birbirine bağlı ama ayrı yönler taşıyabilir.",
        ],
      },
      {
        title: "Maddi ve manevi yön birlikte",
        paragraphs: [
          "Maddi değerler somut eser, yapı veya nesne boyutuyla; manevi değerler inanç, dil, hatıra, gelenek ve ahlaki anlamlarla ilişkilendirilir. Bir cami taş ve mekân olarak maddi, taşıdığı ibadet ve tarih hafızasıyla manevi yön barındırabilir.",
          "Bu iki başlığı her zaman birbirini dışlayan kutular sanma. Tarihî bir el yazması hem fiziksel bir nesne hem dil ve bilgi birikiminin taşıyıcısıdır. Soruda hangisinin istendiğini belirle; nesnenin maddi oluşundan hiçbir manevi anlam taşıyamayacağı sonucu çıkarma.",
        ],
      },
      {
        title: "Kültür ve ortak yaşam",
        paragraphs: [
          "Kültür; dil, tarih, sanat, inanç, örf, âdet, mimari ve gündelik yaşam biçimlerini kapsayan birikimdir. İnsan bu birikimin içine doğar, onunla ilişki kurar ve kendi eylemleriyle onu değiştirip aktarabilir. Aktarım yalnız yazılı kitaplarla yapılmaz.",
          "Bir ailedeki bayramlaşma, okulda ortak çalışma ve toplumdaki yardımlaşma örnekleri kültürle değerlerin ilişkisini gösterir. Bunların bir arada bulunması her toplumun bütünüyle aynı olduğu anlamına gelmez. Ortak ilkeler farklı uygulama biçimleriyle yaşatılabilir.",
        ],
      },
      {
        title: "Değerlerin dinle ilişkisi",
        paragraphs: [
          "MEB anlatımında din, dürüstlük, adalet, sorumluluk, yardımlaşma ve merhamet gibi değerlerin oluşması ve aktarılmasında etkili bir kaynaktır. İbadetler, anlatılar, öğretim ve birlikte yaşama deneyimleri bu değerleri gündelik hayata bağlayabilir.",
          "Bir dinî metnin doğruluğu öğütlemesi ile herkesin o öğüde her zaman uyduğunun ölçülmesi aynı şey değildir. Norm ile gerçek uygulamayı ayır. Ayrıca değer aktarımında dinin rolünün bulunması, aile, eğitim, tarih ve diğer toplumsal etkenlerin hiç olmadığı anlamına gelmez.",
        ],
      },
      {
        title: "Örf ve âdet",
        paragraphs: [
          "Örf toplumda yerleşip kuşaklar arasında aktarılan değer ve davranış örüntüleriyle, âdet ise tekrar edilen toplumsal alışkanlıklarla ilişkilidir. Selamlaşma, kutlama ve ziyaret biçimleri bu alanlarda ele alınabilir. Din ve gelenek birbirini etkileyebilir.",
          "Bir davranışın eski olması dinen zorunlu olduğunun tek başına kanıtı değildir. Aynı biçimde her geleneği bütünüyle değersiz saymak da gerekmez. İslamî öğretim örneğinde bir âdetin dinin temel ilkeleriyle bağdaşıp bağdaşmadığı ayrıca incelenir; yaşını ölçmek bu soruyu yanıtlamaz.",
        ],
      },
      {
        title: "Gelenekleri ölçütle değerlendir",
        paragraphs: [
          "MEB kaynakları saygı, dayanışma ve ziyaretle ilgili geleneklerin desteklenebileceğini; haksızlık ve zarar üreten uygulamaların sırf gelenek olduğu için benimsenmeyeceğini anlatır. Bir uygulamanın yaygınlığı ile ahlaki gerekçesi farklı verilerdir.",
          "Sınav metninde geleneksel olduğu bildirilen davranışı önce somutlaştır. Kimin hangi hakkını etkiliyor, hangi amaca hizmet ediyor? Bu sorular, çoğunluğun yaptığı her şey doğrudur veya eski olan her şey yanlıştır gibi iki karşıt genellemeyi de sınırlar.",
        ],
      },
      {
        title: "Kişilik, mizaç ve karakter",
        paragraphs: [
          "Kişilik, bireyin duygu, düşünce, inanç, tutum, değer, mizaç ve davranış özelliklerini kapsayan geniş bütündür. Mizaç duygu ve davranış eğilimleriyle, karakter ise benimsenen ahlaki yönelim ve alışkanlıklarla ilişkilidir. İki kavram kişiliğin aynı yönünü adlandırmaz.",
          "Sessiz veya konuşkan olmak bir iletişim eğilimini anlatabilir; verilen sözü tutmak ahlaki davranışa ilişkin kanıt sağlar. Sessizliği güvenilmezlikle, konuşkanlığı dürüstlükle otomatik eşleştirme. Bir olay kişinin bütün kişilik yapısına ilişkin tanı vermeye de yetmez.",
        ],
      },
      {
        title: "Modelde iki koşulu ayrı değiştir",
        paragraphs: [
          "Etkileşimli örnekte konuşma biçimini ve göreve ilişkin davranışı birbirinden bağımsız seçebilirsin. Konuşma biçimi değiştiğinde görevini yerine getirdiğine ilişkin kanıt aynı kalır. Görev davranışı değiştiğinde ise o olay hakkındaki sorumluluk yorumu değişir.",
          "Bu, mizaç ve karakterin gerçek hayatta hiçbir ilişkisi olmadığı iddiası değildir. Hazırlanmış örnek yalnız bir özelliği diğerinin kesin kanıtı sanmayı sınar. Aynı ayrımı farklı bir kişiye ilişkin yeni metinde bağımsız kurmak için modeldeki hazır etiketleri kapatıp düşün.",
        ],
      },
      {
        title: "Aile ve eğitim ortamı",
        paragraphs: [
          "Aile değerlerin ilk öğrenildiği önemli ortamlardan biridir. Söylenen kurallar kadar yetişkinlerin davranışları da örnek oluşturabilir. Okul ise paylaşılmış görevler, haklar, tartışma ve iş birliği yoluyla değerlerin düşünülüp uygulanacağı başka ortamlar sağlar.",
          "Aile ve okul etkisini sıralamak bireyin bütün seçimlerinin önceden kesin belirlendiği anlamına gelmez. Bir metin iki kaynağı birlikte veriyorsa birini tek neden ilan etme. Örneğin evde öğrenilen dürüstlük ile okul projesinde geliştirilen sorumluluk aynı kişide birleşebilir.",
        ],
      },
      {
        title: "Arkadaşlık ve iletişim araçları",
        paragraphs: [
          "Akran ilişkileri, sosyal medya ve diğer iletişim araçları örnek alınan davranışları ve karşılaşılan değerleri etkileyebilir. Bilgiyi doğrulama, baskıyı fark etme ve farklı görüşü saygıyla değerlendirme bu nedenle önemlidir. Etki, zorunlu ve tek yönlü belirlenme demek değildir.",
          "Bir grupta yaygın olan davranışı benimsememek için gerekçeli düşünmek mümkündür. Kaynağı bilinmeyen bir iddiayı arkadaşların paylaşıyor diye doğru sayma. Bir soruda arkadaş etkisi verildiğinde de kişinin kendi iradesinin bütünüyle yok olduğu sonucunu eklememelisin.",
        ],
      },
      {
        title: "Adalet: hakkı gözet",
        paragraphs: [
          "Adalet hem kişiler arası hak gözetme hem karakterde aşırılıklardan uzak, dengeli davranma anlamlarında öğretilir. Bir görevi ehline vermek, tarafları dinlemek ve keyfî kayırmadan kaçınmak somut örneklerdir. Aynı miktarı dağıtmak her olayda tek ölçüt değildir.",
          "Bir sınavda hak, ihtiyaç veya katkı koşulu verildiyse önce onu yaz. Farklı çalışılmış saatler için aynı saat ücreti, farklı toplam ödemeler doğurabilir. Önemli olan örnekte hangi ölçütün açıklandığıdır; bütün durumları tek eşit miktar kuralına indirgeme.",
        ],
      },
      {
        title: "Hikmet: bilgiyi yerinde kullan",
        paragraphs: [
          "Hikmet, bilginin anlamını kavrayıp düşünce ve eylemde yerinde kullanmayı anlatır. MEB’in dinî bağlamında doğru bilgi, iman ve dengeli davranış birlikte ilişkilendirilir. Kısa bir tanımı ezbere tekrarlamak, onu farklı durumda uygulayabilmekle aynı beceri değildir.",
          "Örneğin bir temsilcinin yalnız veri biriktirmesi ile verilerden hareketle hakları koruyan çözüm üretmesi farklıdır. İkinci durumda bilgiyle eylem arasında muhakeme bağı kurulur. Soruda hikmet istendiğinde bilginin ne işe yaradığını ve nasıl kullanıldığını açıkla.",
        ],
      },
      {
        title: "İffet: isteklerde ölçü",
        paragraphs: [
          "İffet, nefsin aşırı isteklerine karşı ölçülü davranma, onuru ve sınırları koruma çerçevesinde açıklanır. Yeme, içme, harcama, konuşma ve ilişkiler bu geniş alanın örnekleri olabilir. MEB iffet sorumluluğunu kadın ve erkek için birlikte ele alır.",
          "İffeti sadece kıyafete veya tek bir cinsiyete indirgemek kapsamı daraltır. Bir kişinin görünüşünden iç niyeti ya da bütün ahlaki yaşamı çıkarılamaz. Metinde hangi öz denetim davranışının verildiğini bul ve yorumunu o veriyle sınırlandır.",
        ],
      },
      {
        title: "Şecaat: ölçülü cesaret",
        paragraphs: [
          "Şecaat, doğruyu ve hakkı savunmak için gösterilen cesaretle ilişkilidir. Ölçüsüz saldırganlık veya sonucu düşünmeden tehlikeye atılma yeterli koşul değildir. Korku duymamak yerine korkuya rağmen uygun ve güvenli biçimde doğru davranmaya odaklanır.",
          "Bir öğrencinin baskı karşısında delille ve sakinlikle konuşması şecaatle ilişkilendirilebilir. Bir tehlikede uzman yardımı istemek de cesaretsizlik sayılmaz. Davranışın amacı, ölçüsü ve koşulu önemlidir; yalnız risk sözcüğünden erdem sonucu çıkarma.",
        ],
      },
      {
        title: "İsrâ 23–29: sorumlulukları ilişkilendir",
        paragraphs: [
          "Bu ayetler MEB öğretiminde yalnız Allah’a kulluk, anne babaya iyi davranma, yakınları ve ihtiyaç sahiplerini gözetme, israf ve cimrilikten kaçınma bağlantılarıyla incelenir. Böylece inanç, aile ilişkileri ve kaynak kullanımı aynı sorumluluk çerçevesinde ele alınır.",
          "Metin yorumunda bütün mesajı tek bir sözcüğe indirgeme. Sözün yumuşak olması, yardımın onuru gözetmesi ve harcamada denge farklı ama ilişkili vurgulardır. Bu bağlantılar, soruda verilmeyen belirli bir kişinin bütün koşulları için ayrıntılı hüküm üretme yetkisi değildir.",
        ],
      },
      {
        title: "İlkeyi yeni bağlama aktar",
        paragraphs: [
          "Bir davranışı çözerken önce özelliğin mizaç mı, karaktere ilişkin eylem mi, maddi nesne mi, manevi anlam mı olduğunu belirle. Sonra birden fazla sınıfın aynı olayda birlikte bulunup bulunmadığına bak. Böylece yanlış bir ya o ya bu ayrımı kurmazsın.",
          "Yeni örnekte isim ve yer değiştiğinde aynı ayırıcı koşulu kendin yeniden bul. Kopya kâğıdı hızlı tekrar içindir; gerekçeyi öğrenmenin yerine geçmez. Tek olaydan ömür boyu değişmez karakter, tek etkenden bütün kişilik veya tek gelenekten dinî zorunluluk çıkarma.",
        ],
      },
    ],
    examples: [
      {
        title: "Duygu eğilimi ile dürüst karar",
        prompt:
          "Özgün vakada bir öğrenci heyecanlandığında hızlı konuşmaya eğilimlidir. Bir tartışmada kendi verdiği yanlış bilgiyi fark eder, kaynağını düzelterek özür diler. İki boyutu ayrı açıkla.",
        strategy:
          "Duygu ve iletişim eğilimini, olayda verilen doğruluk eyleminden ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Heyecanla hızlı konuşma, iletişim ve duygu tepkisine ilişkin eğilim verisidir; kendi başına dürüstlük hükmü değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yanlış bilgiyi açıkça düzeltip özür dileme, bu olayda doğruluğu ve sorumluluğu gözeten somut eylem kanıtıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Kişi aynı eğilimi taşırken doğru veya yanlış farklı kararlar alabilir; bu tek olay bütün kişiliğinin kusursuz ölçümü değildir.",
          },
        ],
        answer:
          "İletişim eğilimi ile bu olayda gösterilen dürüst düzeltme ayrı boyutlardır.",
        check:
          "Yanlışını düzeltme kaldırılıp onu bilerek sürdürdüğü söylenseydi eylem yorumu değişirdi; hızlı konuşma verisi aynı kalabilirdi.",
        pitfall:
          "Bir duygu tepkisini bütün ahlaki kararların kesin nedeni veya tanısı saymak.",
      },
      {
        title: "Nesne ve ortak hafıza",
        prompt:
          "Bir tarihî köprü ulaşım sağlar; aynı zamanda kentin geçmişini hatırlatan kültürel bir simgedir. Yalnız maddi değer midir?",
        strategy: "Somut işlev ile anlam taşıma yönünü ayrı göster.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Köprü yapı ve ulaşım işleviyle fiziksel, maddi bir boyut taşır.",
          },
          {
            label: "2. adım",
            explanation:
              "Kent hafızası ve kültürel simge oluşu manevi anlam boyutunu verir.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı nesnede iki yön birlikte bulunduğundan yalnız maddidir sonucu eksiktir.",
          },
        ],
        answer: "Hem maddi hem manevi yön barındırır.",
        check:
          "Manevi yönü kabul etmek köprünün taş ve ulaşım işlevini ortadan kaldırmaz.",
        pitfall:
          "İki sınıfın her zaman birbirini dışlaması gerektiğini varsaymak.",
      },
      {
        title: "İki uygulama için iki dayanak",
        prompt:
          "Özgün bir ders örneği, mahallenin her yıl yaptığı çay ikramını âdet; farz namazı ise dinî yükümlülük başlığında açıklıyor. İkramın eski olması, onu ikinciyle aynı hüküm türü yapar mı?",
        strategy:
          "Toplumsal alışkanlık dayanağı ile belirtilen dinî yükümlülük dayanağını ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İkramın her yıl tekrarlanması onun âdet yönünü açıklar; örnekte ayrıca bir bağlayıcı dinî hüküm verilmez.",
          },
          {
            label: "2. adım",
            explanation:
              "Farz namazı için ise ders açıkça başka tür bir yükümlülük bilgisi verir; iki fiilin dayanakları farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "İkramın dayanışma değeri bulunabilir, fakat sadece eski oluşundan onu farz namazıyla aynı hükme yerleştiremeyiz.",
          },
        ],
        answer:
          "Hayır; eski ve anlamlı bir âdet olmak tek başına aynı dinî hüküm türünü vermez.",
        check:
          "İkramın toplumsal yararını kabul etmekle dinî bağlayıcılık iddiası farklı sorulardır.",
        pitfall:
          "Âdeti değersiz saymakla zorunlu dinî hüküm saymak arasında yalnız iki seçenek var sanmak.",
      },
      {
        title: "Üç erdemi tek kararda bul",
        prompt:
          "Bir temsilci veriyi anlamlandırıyor, haksızlığı fark ediyor ve baskıya rağmen ölçülü bir itirazla çözüm öneriyor. Hangi erdemler hangi fiile bağlanır?",
        strategy: "Tek etiket seçmeden önce üç fiili ayrı eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Veriyi yerinde anlamlandırma ve çözümde kullanma hikmetle ilişkilendirilebilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Hakkı gözetme adaletle, baskıya rağmen ölçülü itiraz ise şecaatle ilişkilidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı olay farklı erdemleri birlikte taşıyabilir; kök yalnız belirli fiili sorarsa o fiile dönülür.",
          },
        ],
        answer:
          "Bilgiyi yerinde kullanma:hikmet; hakkı gözetme:adalet; ölçülü cesaret:şecaat.",
        check:
          "Her erdemin metinde ayrı fiili var; sadece tek bir olumlu sıfattan üç kavram türetilmedi.",
        pitfall: "Bir olayda birden çok erdemin bulunamayacağını sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Kişilik neden mizaç veya karakterin yalnız birine eşitlenmez?",
        answer:
          "Kişilik duygu, düşünce, değer, mizaç ve karakter gibi ilişkili yönleri kapsayan geniş bütündür. Bir iletişim eğilimi onun bütününü ölçmez.",
      },
      {
        prompt:
          "İffetin kapsamını dış görünüşün ötesine taşıyan iki örnek ver.",
        answer:
          "Konuşmada hakaretten kaçınma, harcamada ve isteklerde ölçülülük örnek olabilir. Kişinin kıyafetinden bütün niyeti ve ahlakı kesin çıkarılmaz.",
      },
      {
        prompt: "Şecaat ile düşüncesiz risk alma arasındaki fark nedir?",
        answer:
          "Şecaat doğruyu ve hakkı savunan ölçülü cesarettir. Amaç, uygun yöntem ve koşullar önemlidir; riskin büyüklüğü tek başına erdem kanıtı değildir.",
      },
      {
        prompt:
          "Aile, okul ve arkadaş etkisinin birlikte bulunması neyi sınırlar?",
        answer:
          "Değer aktarımını tek nedene indirgemeyi sınırlar. Etki görmek kişinin bütün iradesinin zorunlu yokluğu anlamına da gelmez.",
      },
    ],
    source:
      "MEBİ TYT Din Kültürü Gençlik ve Değerler hedef metinleri; OGM 9.sınıf telafi etkinlikleri; Aurelia Gençlik ve Değerler kopya kâğıdı. Özgün öğretim ve durum modelleri; kişilik testi veya resmî sınav sorusu değildir.",
  },
  {
    id: "gonul-cografyamiz",
    title: "Gönül coğrafyamız: şehirler, eserler ve bilgi yolları",
    detail: "detail-82",
    minutes: 120,
    objectives: [
      "Kültür, medeniyet ve ortak gönül coğrafyası arasındaki kapsam ilişkisini açıkla.",
      "Mekke, Medine, Kudüs, Bağdat ve diğer merkezleri eser ve işlevleriyle eşleştir.",
      "Âlim, tüccar ve tasavvuf geleneğinin etkileşimdeki farklı rollerini tanı.",
      "Harita ve gezi listesi sorularını eser–şehir–bölge bağıyla çöz.",
    ],
    sections: [
      {
        title: "Kültürden medeniyete",
        paragraphs: [
          "Kültür bir toplumun dil, gelenek, sanat, inanç ve gündelik yaşam birikimini kapsar. Medeniyet ise farklı toplumların etkileşimle geliştirdiği kurum, düşünce, bilim ve sanat birikimini anlatan daha geniş bir tarihî kavram olarak kullanılabilir. İkisi tek bir somut nesne listesine indirgenmez.",
          "Türk, Arap ve Fars kültürleri birbirinin birebir kopyası değildir; ortak medeniyet havzasında etkileşebilir. Aynı medeniyetle ilişki kurmak her yerin aynı dili konuştuğu, aynı yapıyı inşa ettiği veya aynı devletin sınırlarında bulunduğu anlamına gelmez.",
        ],
      },
      {
        title: "İslam medeniyetinin kapsamı",
        paragraphs: [
          "İslam medeniyeti, Müslüman toplulukların farklı coğrafyalarda oluşturduğu maddi ve manevi birikimle ilişkilendirilir. İlim, eğitim, hukuk, siyaset, sanat, edebiyat, mimari ve musiki gibi alanlar bu birikimin farklı yönleridir. Dinî kaynakla tarihsel üretim aynı şey değildir.",
          "Bir cami mimari, bir tercüme merkezi bilim ve eğitim, bir şiir edebiyat örneği olabilir. Her örneği yalnız ibadet biçimi diye sınıflama. Toplumların tarih içinde ürettikleriyle onların temel inanç metinlerini ayırmak, medeniyetin nasıl geliştiğini daha açık görmeni sağlar.",
        ],
      },
      {
        title: "Gönül coğrafyası siyasi sınır değildir",
        paragraphs: [
          "Gönül coğrafyası ortak dinî, tarihî ve kültürel bağların hissedildiği yerler için kullanılan bir kavramdır. Günümüz devlet sınırlarının birebir eş anlamlısı değildir. Farklı ülkelerde bulunan şehir ve eserler aynı ortak hafızayla ilişkilendirilebilir.",
          "Bir haritada Kudüs, Medine ve Agra’nın birlikte ele alınması bu şehirlerin tek devlet olduğu anlamına gelmez. Konum, egemenlik ve kültürel bağ ayrı sorulardır. Hazırlanan model yalnız yaklaşık şehir konumlarını ve öğretim eşleştirmelerini gösterir; siyasi sınır çizmez.",
        ],
      },
      {
        title: "Dönemleri kronolojik ama örtüşerek oku",
        paragraphs: [
          "MEB anlatımı Asrısaadet, Dört Halife, Emevi, Abbasi, Selçuklu ve Osmanlı dönemlerini medeniyetin farklı tarihsel bağlamları olarak sıralar. Bu adlar bütün dünyada tek bir devletin kesintisiz ve aynı biçimde sürmesi demek değildir.",
          "Bazı yönetimler ve kültürel faaliyetler farklı bölgelerde aynı zamanlarda bulunabilir. Bir tarih şeridinin eşit aralıklı çizilmesi de dönemlerin eşit sürdüğünü göstermez. Kronoloji sorusunda verilen tarih veya önce-sonra ilişkisini kullan; her bilgi merkezini aynı yüzyıla yerleştirme.",
        ],
      },
      {
        title: "İslam’ın doğuş çevresi: Hicaz",
        paragraphs: [
          "Hicaz, Arap Yarımadası’nın batısında Mekke ve Medine’yle ilişkili tarihî bölgedir. İslam’ın doğuşu ve ilk toplumsal örgütlenmesi bakımından önem taşır. Kâbe Mekke’de, Mescid-i Nebevî Medine’de bulunur; iki eser aynı şehirde değildir.",
          "Bir gezi sorusunda önce yapıdan şehre git. Mescid-i Nebevî’yi görmek isteyen birinin Medine ile eşleştirilmesi gerekir. Mekke’nin aynı tarihî bölgede olması bütün eserlerin orada bulunduğunu göstermez. Bölge bilgisi şehir eşleştirmesinin yerine geçmez.",
        ],
      },
      {
        title: "Medine’de toplumsal merkez",
        paragraphs: [
          "Mescid-i Nebevî, ibadetle birlikte eğitim ve toplumsal görüşmelerin de yer aldığı bir merkez olarak anlatılır. Suffe ise eğitimle ilişkili önemli örnektir. Bu bilgiler yapının sadece dış görünüşünü değil, toplumsal ve ilmî işlevlerini de açıklar.",
          "Bir metinde bir yapının birden fazla işlevi anılıyorsa onları ayrı kaydet. Eğitim merkezi olması ibadet işlevini silmez; ibadet yeri olması da eğitimden söz etmeyi engellemez. Soru işlev soruyorsa yalnız şehrin adını ezberlemek yeterli olmayabilir.",
        ],
      },
      {
        title: "Kudüs ve Mescid-i Aksâ",
        paragraphs: [
          "Kudüs, Mescid-i Aksâ ve birçok peygamberle ilişkilendirilen dinî hafıza bakımından önemlidir. İslam öğretiminde İsrâ ve Miraç anlatıları ve ilk kıble ilişkisiyle birlikte ele alınır. Mescid-i Aksâ ile Medine’deki Mescid-i Nebevî aynı yer değildir.",
          "Birbirine benzeyen yapı adlarında kısaltmaya aşırı güvenme. Tam adı ve şehri birlikte düşünmek güvenilir eşleştirmeyi kurar. Kudüs’ün farklı dinler için de tarihî önem taşıması, incelenen İslam medeniyeti bağlantısına aykırılık oluşturmaz.",
        ],
      },
      {
        title: "Şam ve çevresi",
        paragraphs: [
          "Şam, tarihî adıyla Dımaşk, bölgesel yönetim, ilim ve kültür hayatı bakımından önemli bir merkezdir. Şam beldeleri ifadesi kaynaklarda Suriye, Filistin, Lübnan ve Ürdün çevresindeki daha geniş tarihî alanlarla da ilişkilendirilebilir.",
          "Şehir ile geniş tarihî bölgeyi ayır. Dımaşk bir şehir adıyken Şam coğrafyası daha geniş bağlamda kullanılabilir. Bir metnin iki kullanımını aynı ölçek sanmak, şehirden bütün bölgenin aynı kurum ve tarihe sahip olduğu sonucunu çıkarmaya yol açar.",
        ],
      },
      {
        title: "Bağdat: tercüme ve öğretim",
        paragraphs: [
          "Bağdat, Abbasi dönemindeki ilim ve tercüme faaliyetleriyle öne çıkar. Beytülhikme kaynaklarda çeviri ve bilgi çalışmalarıyla; Nizamiye medreseleri ise eğitim örgütlenmesiyle ilişkilendirilir. İki kurumun adını aynı işlevin rastgele iki adı sanma.",
          "Bir eserin Bağdat’ta başka dile çevrilmesi, ilk yazarının da Bağdatlı olduğunu göstermez. Tercüme, başka toplumların bilgisine erişim sağlar. Yazarın yeri, eserin dili, tercüme yeri ve eğitim kurumu ayrı değişkenlerdir; soruda hangisi veriliyorsa onu kullan.",
        ],
      },
      {
        title: "Horasan: şehirler ve tasavvuf yolları",
        paragraphs: [
          "Horasan; Nişabur, Merv, Belh ve Herat gibi şehirlerle ilişkilendirilen tarihî bir bölgedir. MEB anlatımında tasavvuf geleneği ve Anadolu’ya uzanan kültürel etkileşimlerle birlikte incelenir. Mevlana’nın Belh’ten Anadolu’ya uzanan hayatı bu çerçevede anılır.",
          "Tarihî bölge günümüz tek bir ülkesine indirgenmez. Bir kişinin bir yerde doğup başka yerde eser vermesi de mümkündür. Doğum yeri, öğretim merkezi ve etki alanını aynı kutuya koymadan okumak, bölge ve kişi sorularındaki yakın yanlışları ayırır.",
        ],
      },
      {
        title: "Türkistan ve Maveraünnehir",
        paragraphs: [
          "Maveraünnehir, Seyhun ve Ceyhun nehirleri arasındaki tarihî coğrafyayla ilişkilendirilir. Buhara ve Semerkant önemli merkezlerdir. Türkistan daha geniş tarihî ve kültürel bir bölge adıdır; bu terimler günümüz idari haritasının birebir eş anlamlısı değildir.",
          "Buhara ve Semerkant iki farklı şehirdir. Aynı coğrafyanın ilmî hayatında yer almaları onları tek şehir veya tek dönem yapmaz. Harita ve metni birlikte okurken tarihî bölge, şehir ve güncel ülke ölçeklerini birbirinden ayır.",
        ],
      },
      {
        title: "Âlimler ve farklı katkılar",
        paragraphs: [
          "Buhari ve Tirmizi hadis çalışmalarıyla, Matüridi kelamla, Farabi felsefeyle, İbni Sina tıp ve felsefeyle, Biruni çeşitli bilim alanlarıyla, Harezmi matematikle ilişkilendirilir. Ali Kuşçu astronomi ve matematik geleneğinde anılır. Hepsinin katkısı aynı bilim dalı değildir.",
          "Bir soru kişileri ortak medeniyetle ilişkilendirirken alan farkını da sorabilir. Ortak coğrafi bağdan aynı çağda yaşadıkları veya aynı kitabı yazdıkları sonucu çıkmaz. Kişi, alan ve katkıyı üç sütunda düzenlemek benzer isimleri ayrı ilişkilerle hatırlamayı kolaylaştırır.",
        ],
      },
      {
        title: "Ahmed Yesevi ve kültürel aktarım",
        paragraphs: [
          "Ahmed Yesevi Türkistan’daki tasavvuf geleneği ve Türkçe dinî-ahlaki anlatımla ilişkilendirilir. Öğrenciler, dervişler ve farklı toplumsal ağlar aracılığıyla geleneklerin başka bölgelere taşınması medeniyet etkileşiminin bir boyutudur.",
          "Bu aktarımı tek bir kişinin bütün şehirleri kurduğu veya bütün eserleri yazdığı biçiminde yorumlama. Başlangıç coğrafyası ile sonraki etki alanı ayrıdır. Bir metin öğrencilerin Anadolu’ya ulaşmasını anlatıyorsa tarihî ağın bir halkasını gösterir, bütün yayılma yollarını tüketmez.",
        ],
      },
      {
        title: "Hint Alt Kıtası ve Babürlü mirası",
        paragraphs: [
          "Hint Alt Kıtası, Hindistan ve Pakistan dâhil geniş bir tarihî coğrafyayı anlatır. Tac Mahal, Babürlü döneminde Agra’da yapılmış bir mimari eserdir. İmam Rabbani, Şah Veliyullah Dihlevi ve Muhammed İkbal bu havzanın farklı dönemlerdeki düşünce ve edebiyat isimleri arasında anılır.",
          "Tac Mahal’in yerini soran bir soruda Agra ve Hindistan eşleştirmesini kullan. Bir ülkenin güncel nüfus sırası veya bütün tarihinin aynı yönetimden oluştuğu gibi ek bilgiler gerekmez. Kişileri de aynı döneme sıkıştırmadan katkı ve bağlamlarıyla öğren.",
        ],
      },
      {
        title: "Anadolu’da edebiyat ve düşünce",
        paragraphs: [
          "Mevlana’nın Mesnevi’si, Yunus Emre’nin şiirleri, Hacı Bektaş Veli ve Hacı Bayram Veli’nin tasavvuf geleneği Anadolu’nun dinî ve kültürel birikiminde anılır. Molla Fenari, Davud Kayseri, Aziz Mahmud Hüdai ve İsmail Hakkı Bursevi farklı ilim ve tasavvuf çevrelerini temsil eder.",
          "Daha yakın dönemde Mehmet Akif Ersoy, Elmalılı Hamdi Yazır ve Nurettin Topçu farklı eser ve düşünce katkılarıyla ele alınır. Aynı coğrafya farklı zamanları ve alanları içerir. Bir metin yalnız ortak coğrafyayı veriyorsa bütün isimlerin aynı kurumda çalıştığını ekleme.",
        ],
      },
      {
        title: "Balkanlarda mimari ve ortak hafıza",
        paragraphs: [
          "Balkanlar, Osmanlı döneminde cami, medrese, han, hamam ve köprü gibi eserlerle gelişen önemli bir etkileşim alanıdır. Mostar Köprüsü Bosna-Hersek’teki Mostar’da; Selimiye Camii ise Edirne’de bulunur. Yer ve eser eşleştirmesi ortak hafızanın somut örneklerini gösterir.",
          "Bir köprünün medeniyet örneği olması onun bir camiyle aynı işlevde veya aynı şehirde olduğu anlamına gelmez. Mimar adı, yapım tarihi ve bugünkü durum ayrıca doğrulanacak farklı bilgilerdir. Bu modelde yalnız öğretilen konum ve işlev ilişkileri kullanılır.",
        ],
      },
      {
        title: "Mısır, Kahire ve Ezher",
        paragraphs: [
          "Mısır, İslam medeniyetinin ilim ve eğitim merkezlerinden biridir. Kahire’deki Ezher, ibadet ve eğitimle ilişkili önemli bir kurumdur. Kahire’deki kütüphaneler ve Darülhikme gibi merkezler de farklı alanlardaki çalışmalarla ilişkilendirilir.",
          "Bağdat’taki Beytülhikme ile Kahire’deki Darülhikme adlarını benzer seslerinden dolayı aynı bina sanma. Ortak hikmet sözcüğü farklı kurumlarda bulunabilir. Kent, kurum ve işlevi birlikte eşleştirmek bu tür yakın isimleri ayırmayı sağlar.",
        ],
      },
      {
        title: "Mağrip ve Kuzey Afrika",
        paragraphs: [
          "Mağrip, Kuzey Afrika’nın batı kesimleri için kullanılan tarihî coğrafi addır; Libya, Tunus, Cezayir, Fas ve çevresindeki farklı alanlarla ilişkilendirilir. Kayrevan, Tunus’taki önemli tarihî merkezlerdendir. Mısır ve Mağrip kaynaklarda aynı geniş başlıkta birlikte işlenebilir.",
          "Birlikte anılmaları Mısır’ın Mağripteki her şehirle aynı yer olduğu anlamına gelmez. Abdülkadir el-Cezairi, Abdülkerim el-Hattabi ve Ömer Muhtar farklı ülkelerdeki bağımsızlık mücadeleleriyle anılır. Bölge ortaklığı kişi, dönem ve ülke farklarını silmez.",
        ],
      },
      {
        title: "Endülüs: İber Yarımadası",
        paragraphs: [
          "Endülüs, İber Yarımadası’ndaki Müslüman yönetimlerin tarihî coğrafyasıdır. Kurtuba, Gırnata ve İşbiliye önemli merkezlerdir. Elhamra Sarayı Gırnata’da, Kurtuba Camii Kurtuba’da bulunur; günümüz adları Granada ve Córdoba olarak da karşına çıkabilir.",
          "İbni Rüşd, İbni Hazm ve İbnülarabi gibi isimler bu havzanın düşünce tarihinde anılır. Çeviriler aracılığıyla bilginin Avrupa’nın başka bölgelerine taşınması kültürel etkileşimi gösterir. Bir eserin farklı toplumlarca kullanılması ilk yerinin değiştiği anlamına gelmez.",
        ],
      },
      {
        title: "Yayılma yollarını çoğul düşün",
        paragraphs: [
          "MEB anlatımında askerî-siyasi gelişmelerin yanında âlimler, öğrenciler, tüccarlar ve tasavvuf gelenekleri etkileşimde rol oynar. Eserlerin çoğaltılması, çevrilmesi ve farklı dillerde anlatılması da bilgi aktarımının somut yollarıdır. Tek bir yol bütün örnekleri açıklamaz.",
          "Bir soru bilim merkezini soruyorsa yalnız savaş tarihiyle yanıt verme; tüccarların ilişkisini soruyorsa bir âlimin eserini tek açıklama sayma. Metinde gerçekten verilen rolü belirle. Bu çoğulluk, medeniyeti yalnız yapı listesi veya yalnız yönetim çizelgesi sanmayı önler.",
        ],
      },
      {
        title: "Türkçe, Arapça ve Farsça eserler",
        paragraphs: [
          "Medeniyet birikimi farklı dillerde yazılmış eserlerle gelişmiştir. Tercüme, aynı fikrin başka okuyuculara ulaşmasını sağlayabilir; özgün eser üretimi ise yeni açıklama ve düşünce katkıları getirir. Dil ortaklığı ile medeniyet ortaklığı birebir aynı değildir.",
          "Aynı medeniyet içinde farklı diller bulunabilir, bir dil de farklı toplumlarda kullanılabilir. Soruda bir eserin dili verilmişse yazarın doğum yeri veya bütün kültürel kimliği hakkında sınırsız sonuç çıkarma. Dil, yer, dönem ve katkıyı ayrı bilgiler olarak ilişkilendir.",
        ],
      },
      {
        title: "Hucurât 13: tanışma ve insan değeri",
        paragraphs: [
          "MEB öğretimi Hucurât suresinin 13. ayetini insanların farklı topluluklar hâlinde oluşu, tanışma ve insan değerini soy üstünlüğüne indirgememe mesajıyla ele alır. Takva, Allah’a karşı sorumluluk ve duyarlılık bilinciyle ilişkilendirilir.",
          "Bu mesajdan herkesin aynı dili, geleneği ve yaşam tarzını kullanması gerektiği sonucu çıkmaz. Farklılık tanışmaya engel sayılmaz; ayrımcılık gerekçesine de dönüştürülmez. Bir sınav metninde soy veya renk üstünlüğü iddiasının hangi vurguyla çatıştığını açıkça göster.",
        ],
      },
      {
        title: "Gezi listesi ve olumsuz kök",
        paragraphs: [
          "Bir eseri gezi listesiyle karşılaştırırken eser, şehir, bölge ve listede bulunma bağını kur. Selimiye–Edirne, Mescid-i Nebevî–Medine, Tac Mahal–Agra ve Elhamra–Granada ilişkileri farklı duraklar gerektirir. Aynı sanat havzası, aynı konum demek değildir.",
          "Kök görülemez veya beklenemez diyorsa eşleşenleri ayırıp dışarıda kalan eseri seç. Ölçeksiz çizimden kilometre veya tarih üretme. Yeni tur listesinde aynı eser bilgisini yeniden kullan; ezberlenen cevap harfi, yer kümesi değiştiğinde güvenilir bir çözüm değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Listede olmayan eseri bul",
        prompt:
          "Özgün gezi planı yalnız Agra, Medine ve Edirne’yi içeriyor. Tac Mahal, Mescid-i Nebevî, Selimiye ve Elhamra’dan hangisi bu şehirlerle eşleşmez?",
        strategy:
          "Önce yapıdan şehre git; sonra şehir listesi üyeliğini denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Tac Mahal–Agra, Mescid-i Nebevî–Medine ve Selimiye–Edirne eşleşmeleri listede yer alır.",
          },
          {
            label: "2. adım",
            explanation:
              "Elhamra Sarayı Granada’dadır. Granada gezi planında bulunmuyor.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle eşleşmeyen Elhamra’dır; bu, eserin ortak medeniyete ait olmadığını söylemez.",
          },
        ],
        answer: "Elhamra Sarayı.",
        check:
          "Geziye Granada eklenseydi aynı konum bilgisiyle sonuç değişirdi; değişen eser değil gezi kümesidir.",
        pitfall: "Sanat sınıfını gerçek konum yerine koymak.",
      },
      {
        title: "Birbirine benzeyen kurum adları",
        prompt:
          "Bir tablo Bağdat–Beytülhikme ve Kahire–Ezher eşleşmelerini veriyor. Öğrenci bütün ilim kurumlarının Bağdat’ta olduğu sonucunu çıkarıyor. Hangi veri bunu sınırlar?",
        strategy:
          "Her kurumu kendi kentinde tut ve evrensel iddiayı tek karşı örnekle denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Beytülhikme Bağdat’la ilişkilidir; bu verilen ilk eşleştirmedir.",
          },
          {
            label: "2. adım",
            explanation:
              "Ezher Kahire’yle ilişkilidir; ikinci eşleştirme Bağdat dışında önemli kurum örneği verir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bütün kurumlar Bağdat’tadır iddiası bu ikinci örnekle uyuşmaz; ortak ilim işlevi konumu tekleştirmez.",
          },
        ],
        answer:
          "Kahire’deki Ezher karşı örneği, bütün kurumların Bağdat’ta olduğu genellemesini sınırlar.",
        check:
          "Bir karşı örnek tümel konum iddiasını çürütmeye yeter; diğer kurumların tamamını listelemek gerekmez.",
        pitfall: "Ortak işlevden aynı fiziksel yer sonucunu çıkarmak.",
      },
      {
        title: "Doğum, çalışma ve etki alanı",
        prompt:
          "Bir öğretim metni bir kişinin Horasan çevresinde doğup Anadolu’da çalıştığını ve eserlerinin başka bölgelere ulaştığını söylüyor. Kaç ayrı yer ilişkisi vardır?",
        strategy:
          "Kişinin hayat aşamaları ile eser dolaşımını ayrı oklarla göster.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Doğum yeri ilk ilişkidir; kişinin doğduğu coğrafyayı verir.",
          },
          {
            label: "2. adım",
            explanation:
              "Çalışma yeri ikinci ilişkidir; doğumla aynı olması zorunlu değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Eserin ulaştığı etki alanı üçüncü ilişkidir. Üçünü tek yer saymak kişinin hareketini ve eser dolaşımını siler.",
          },
        ],
        answer: "Doğum yeri, çalışma yeri ve etki alanı üç ayrı ilişkidir.",
        check:
          "Aynı yer iki ilişkide bulunabilir, fakat metin farklı yer verirse onları özdeşleştirmeyiz.",
        pitfall:
          "Bir kişinin eserinin okunduğu her şehirde doğmuş olduğunu varsaymak.",
      },
      {
        title: "Üretim ve aktarım için iki açık kayıt",
        prompt:
          "Tamamen özgün bir kurgu tabloda bir kitabın Konya’da yazıldığı, ardından Kahire’de başka dile çevrildiği açıkça belirtiliyor. İlk üretim ve aktarım yeri nasıl ayrılır?",
        strategy:
          "İki açık kaydı yazım ve çeviri eylemleriyle tek tek eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kitabın yazıldığı yer Konya olarak verilmiştir; bu veri ilk üretim aşamasını karşılar.",
          },
          {
            label: "2. adım",
            explanation:
              "Başka dile çevrildiği yer Kahire’dir; bu veri sonraki dil aktarımı aşamasını karşılar.",
          },
          {
            label: "3. adım",
            explanation:
              "İki aşamanın farklı kentlerde bulunması mümkündür. Çeviri kentini ilk yerle değiştirmeyiz; burada ilk yer bilinmiyor da demeyiz çünkü açık kayıt vardır.",
          },
        ],
        answer: "Yazım:Konya; çeviri:Kahire.",
        check:
          "İlk yerin belirtilmediği başka bir metinde onu bilinmiyor bırakmak gerekir; bu örnekte ise ilk kayıt açıkça verilmiştir.",
        pitfall:
          "Her çeviri sorusunda ilk yer mutlaka bilinmiyor diye sabit cevap üretmek veya aktarma yerini ilk üretim yeri yapmak.",
      },
    ],
    recall: [
      {
        prompt:
          "Mescid-i Aksâ, Mescid-i Nebevî ve Kâbe hangi şehirlerle eşleşir?",
        answer:
          "Sırasıyla Kudüs, Medine ve Mekke. Benzer ibadet mekânı adları farklı şehirleri özdeşleştirmez.",
      },
      {
        prompt:
          "Maveraünnehir ve Endülüs için ayırt edici iki coğrafi bağ söyle.",
        answer:
          "Maveraünnehir Seyhun–Ceyhun arası ve Buhara–Semerkantla; Endülüs İber Yarımadası ve Granada–Kurtuba–İşbiliye ile ilişkilidir. Tarihî bölgeyi güncel tek devlet adı sanma.",
      },
      {
        prompt:
          "Ortak medeniyet bağı aynı yüzyıl veya aynı devlet anlamına gelir mi?",
        answer:
          "Hayır. Bilim, sanat, eğitim ve kültür ortaklığı farklı zaman, toplum ve yönetimlerde gelişebilir. Zaman ve egemenlik iddiası ayrıca kanıt ister.",
      },
      {
        prompt:
          "Elhamra, Tac Mahal, Selimiye ve Mostar için şehir veya ülke eşleştirmesi yap.",
        answer:
          "Elhamra–Granada/İspanya; Tac Mahal–Agra/Hindistan; Selimiye–Edirne; Mostar Köprüsü–Mostar/Bosna-Hersek. Gezi listesi değişse de eser konumu aynı kalır.",
      },
    ],
    source:
      "MEBİ TYT Din Kültürü Gönül Coğrafyamız hedef metinleri; OGM 9.sınıf telafi etkinlikleri; Aurelia Gönül Coğrafyamız kopya kâğıdı. Tarihî örneklerin öğretim amaçlı özgün açıklaması ve ölçeksiz konum modeli; resmî soru değildir.",
  },
  {
    id: "din-ve-hayat",
    title: "Din ve hayat: aile, sanat, çevre ve haklar",
    detail: "detail-83",
    minutes: 125,
    objectives: [
      "Dinî ilke ile toplumsal uygulama ve araç arasındaki farkı açıkla.",
      "Aile, sanat, çevre, ekonomi ve sosyal adalet örneklerini gerekçelendir.",
      "Hat, tezhip, ebru, minyatür, mimari, edebiyat ve musikiyi ayırt et.",
      "Hak eşitliği, mahremiyet, emek ve ölçülü tüketimi verilen koşullarla yorumla.",
    ],
    sections: [
      {
        title: "İnanç gündelik yaşamla nasıl ilişkilendirilir?",
        paragraphs: [
          "Din ve hayat ünitesi, inanç, ibadet ve ahlaki ilkelerin aile, kültür, sanat, çevre, ekonomi ve haklarla ilişkisini inceler. Bir örnek aynı anda birden çok alanı taşıyabilir. Tarihî çeşmenin korunması hem kültürel miras hem çevre ve ortak kullanım sorumluluğuyla bağlantılıdır.",
          "Bu ünitede önce her alanın ne anlattığını öğrenecek, sonra verilen olaydaki somut davranışı ilgili ilkeyle eşleştireceksin. Soyut başlığı tanımak yetmez; hangi hakkın, hangi kaynağın veya hangi toplumsal uygulamanın söz konusu olduğunu göstermek gerekir.",
        ],
      },
      {
        title: "Ailede karşılıklı sorumluluk",
        paragraphs: [
          "Aile, değerlerin öğrenildiği ve toplumsal ilişkilerin kurulduğu önemli bir çevredir. MEB’in dinî anlatımında sevgi, merhamet, saygı, nezaket ve karşılıklı haklar aile ilişkileriyle birlikte ele alınır. Sorumluluk yalnız çocuklara veya yalnız yetişkinlere yüklenmez.",
          "Bir metinde çocukların saygısı ile yetişkinlerin ihtiyaçları gözetmesi birlikte verilmişse iki tarafı da sonucuna kat. Saygı göstermek, her türlü zararlı davranışa koşulsuz boyun eğmek anlamına gelmez. Soruda açıklanan hak ve sorumluluk bağını koru; verilmeyen aile koşullarını uydurma.",
        ],
      },
      {
        title: "Kültür ve dinin karşılıklı etkisi",
        paragraphs: [
          "Din, edebiyatı, sanatları, mimariyi ve toplumsal alışkanlıkları etkileyebilir. Farklı toplumların tarihî birikimleri de bu alanlarda farklı üslupların ortaya çıkmasına katkı verir. Aynı dinle ilişkilendirilen eserlerin bütünüyle aynı teknikle üretilmesi gerekmez.",
          "Bir caminin yerel taş işçiliğiyle yapılması veya bir şiirin Türkçe yazılması kültürel farklılığın örnekleridir. Bunlar ortak dinî temaların bulunmasıyla birlikte var olabilir. Eseri yalnız tek nedene bağlamak yerine içerik, teknik, dil ve tarihî çevreyi ayrı boyutlarda düşün.",
        ],
      },
      {
        title: "Sanat alanlarını amaç ve malzemeyle ayır",
        paragraphs: [
          "Mimari mekân ve yapı, edebiyat dil ve anlatım, musiki ses ve ezgi, hat güzel yazı, tezhip süsleme, ebru su yüzeyindeki desenin aktarımı, minyatür ise küçük ve ayrıntılı tasvirlerle ilişkilidir. Aynı eserde birden çok sanat birlikte yer alabilir.",
          "Bir yazma kitabın yazısı hat, kenarındaki bezemesi tezhip, içindeki tasviri minyatür olabilir. Eserin kitap olması bu farklı teknikleri özdeşleştirmez. Sorunun eser bütünü mü yoksa belirli bölümdeki teknik mi istediğini önce belirle.",
        ],
      },
      {
        title: "Mimari ve çok işlevli yapılar",
        paragraphs: [
          "Mescid-i Nebevî kaynaklarda ibadet, eğitim ve toplumsal görüşmelerle ilişkili bir merkez olarak anlatılır. Daha sonraki dönemlerde cami, mescit, medrese, çeşme, han ve hamam gibi yapılar farklı toplumsal ihtiyaçlara karşılık verir. Külliye birden çok işlevi aynı çevrede birleştirebilir.",
          "Bir medresenin eğitim, bir çeşmenin su sağlama işlevi vardır; aynı medeniyet içinde bulunmaları onları aynı bina türü yapmaz. Mimar Sinan, Osmanlı mimarisindeki önemli isimlerdendir. Belirli eser ve mimar eşleştirmeleri ayrıca doğrulanmalı, ad benzerliğinden türetilmemelidir.",
        ],
      },
      {
        title: "Edebiyat: düşüncenin dilde izi",
        paragraphs: [
          "Yusuf Has Hacib’in Kutadgu Bilig’i, Edib Ahmed’in Atabetü’l-Hakayık’ı ve Ahmed Yesevi’nin Divan-ı Hikmet’i dinî-ahlaki düşüncenin Türkçe eserlerle aktarımında anılır. Mevlana’nın Mesnevi’si, Yunus Emre’nin şiirleri ve Fuzuli’nin Su Kasidesi farklı edebî bağlamlarda yer alır.",
          "Yakın dönem örneklerinden Mehmet Akif’in Safahat’ı da bu birikimle ilişkilendirilir. Bütün eserlerin aynı dilde, biçimde veya yüzyılda yazıldığını varsayma. Yazar, eser, dil ve tür farklı ilişkilerdir; sorunun verdiği eşleştirmeyi koruyarak düşün.",
        ],
      },
      {
        title: "Musiki ve tarihî uygulamalar",
        paragraphs: [
          "Musiki sesin ezgi ve ritimle düzenlenmesiyle ilgili sanat alanıdır. MEB anlatımında Kur’an’ın güzel okunması, ezan, Itri ve Dede Efendi gibi besteciler; Kindi, Farabi ve İbni Sina’nın musiki çalışmalarıyla birlikte anılır.",
          "Tarihî darüşşifalarda musikiden yararlanıldığına ilişkin örnekler, günümüzde her hastalığın aynı yöntemle tedavi edileceği anlamına gelmez. Tarihî kullanım ile güncel klinik etkililik farklı kanıtlar gerektirir. Sanat tarihi bilgisini kişisel sağlık önerisine dönüştürmemelisin.",
        ],
      },
      {
        title: "Hat ve hattat",
        paragraphs: [
          "Hat, Arap harfleri etrafında gelişmiş güzel yazı sanatıdır; bu sanatı icra eden kişiye hattat denir. Harfin biçimi, çizginin dengesi ve yazının düzeni önem taşır. Sadece bir metnin hangi konuda olduğu yazının hat olarak değerlendirilmesi için yeterli açıklama değildir.",
          "Bir sayfada anlam taşıyan harflerin estetik düzenine bakılıyorsa hat; harflerin etrafındaki bezemeye bakılıyorsa tezhip öne çıkabilir. Teknikleri ayırırken eserin bütün adını değil, soruda gösterilen bölümün ne yaptığını düşün. Yazı ile süsleme aynı sayfada birlikte bulunabilir.",
        ],
      },
      {
        title: "Tezhip ve müzehhip",
        paragraphs: [
          "Tezhip, kitap ve yazı çevrelerinde görülen özenli bezeme sanatıdır; sanatçısına müzehhip denir. Bitkisel veya geometrik motifler, tekrar ve simetri gibi düzenler kullanılabilir. Altınla süsleme geleneğiyle ilişkilidir, ama bir eserdeki her sarı renk tek başına tezhip kanıtı değildir.",
          "Bir süslü kenar ile bir harfin kendisi farklı görsel öğelerdir. Soru sayfa kenarı bezemesini anlatıyorsa bunu hatla karıştırma. Şemadaki örnek motifler öğretim çizimleridir; tarihî eserin kopyası veya belirli bir ustanın onaylı üslubu olarak sunulmaz.",
        ],
      },
      {
        title: "Ebru: desenden kâğıda",
        paragraphs: [
          "Ebru, yoğunlaştırılmış su yüzeyinde uygun boyalarla oluşturulan desenin kâğıda aktarılmasıyla ilişkilidir. Hatip Mehmet Efendi, Necmeddin Okyay ve Mustafa Düzgünman bu sanatın önemli isimleri arasında anılır. Yüzey, boya ve aktarım ilişkisi ayırıcı bilgidir.",
          "Bir metinde yalnız renkli kâğıt sözü geçmesi ebru tekniğini kesinleştirmez. Su yüzeyinde desen oluşturup kâğıda alma koşulu açıkça verildiğinde eşleştirme güçlenir. Minyatürde ise küçük tasvir ve kitap resmi; ebruda desenin üretim ve aktarım yolu öne çıkar.",
        ],
      },
      {
        title: "Minyatür ve nakkaş",
        paragraphs: [
          "Minyatür, yazma eserlerde yer alabilen küçük, ayrıntılı ve renkli tasvirlerle ilişkilidir. Sanatçı için nakkaş, çalışma yeri için nakkaşhane terimleri kullanılabilir. Belirli bir bakış açısı veya ölçek yaklaşımı sanatın tarihî örneklerinde farklı biçimlerde gelişmiştir.",
          "Küçük boyuttaki her modern fotoğraf minyatür sanatı sayılmaz. Üretim geleneği ve tasvir niteliği önemlidir. Bir kitapta yazı, kenar süsü ve olay resmi varsa hat, tezhip ve minyatür aynı eserde farklı görevlerle birlikte bulunabilir.",
        ],
      },
      {
        title: "Çevre: emanet ve kullanım",
        paragraphs: [
          "Çevre, canlı yaşamını etkileyen fiziksel, kimyasal ve biyolojik koşulları kapsar. İslam düşüncesinin öğretiminde çevre, insanın sınırsızca tüketebileceği bir mülk yerine sorumlulukla koruyacağı emanetle ilişkilendirilir. Bu yaklaşım yararlanmayı bütünüyle yasaklamaz.",
          "Su kullanırken ihtiyacı karşılamak ile gereksiz kaybı artırmak farklıdır. Bitkileri sulamada uygun yeniden kullanım veya atığı azaltma davranışı koruyarak yararlanmaya örnek olabilir. Dinî bir denge ifadesini tek başına bütün modern ekoloji kuramlarının bilimsel ispatı diye sunmamak gerekir.",
        ],
      },
      {
        title: "İsraf ile ihtiyacı ayrı ölç",
        paragraphs: [
          "Bir kaynağın toplam kullanımı, gerekli kullanım ve önlenebilir kayıp gibi bileşenlere ayrılabilir. Özgün su modelimizde miktarlar varsayımsaldır; gerekli su ile kaçak ve uygun geri kazanım ayrı değişir. Verilen koşullar altında korunum hesabı yapılır.",
          "Geri kazanımın açık olması suyun sağlık açısından her kullanım için uygun olduğunu göstermez. Model uygun teknik koşulda geri kazanılan miktarı sayar; gerçek arıtma veya içilebilirlik ölçmez. Kaybı azaltmakla gerekli temizliği bırakmak arasındaki farkı da korumalısın.",
        ],
      },
      {
        title: "Toplumsal değişim",
        paragraphs: [
          "Sosyal değişim, toplumun kurumları, alışkanlıkları ve ilişkilerindeki dönüşümü anlatır. Yeni teknoloji, göç, ekonomik koşullar ve eğitim gibi pek çok etken bu sürece katılabilir. Değişim sözcüğü tek başına mutlaka ilerleme veya mutlaka bozulma anlamına gelmez.",
          "Bir yardımın duyuru aracının kâğıttan dijital yönteme geçmesi toplumsal uygulamanın değişmesine örnek olabilir. Bu değişimden adalet veya yardımlaşma ilkesinin ortadan kalktığı sonucu otomatik çıkmaz. Önce neyin değiştiğini ve hangi ihtiyaca cevap verdiğini belirle.",
        ],
      },
      {
        title: "İlke, uygulama ve içtihat",
        paragraphs: [
          "MEB çerçevesinde temel inanç ve ibadet ilkeleriyle sosyal hayattaki uygulama ve araçlar ayırt edilir. İçtihat, yetkinliğe dayalı dinî yorumlama çabasıdır; herkesin istediği hükmü keyfî biçimde üretmesi değildir. Ayrıntılı usul bu ünitenin kavram düzeyini aşar.",
          "Bir uygulamanın yeni koşulda uyarlanması bütün temel esasların değiştiği anlamına gelmez. Aynı biçimde uygulama yorumlarının hiç farklılaşamayacağını söylemek de kaynakların açıkladığı ihtiyacı yok sayar. Metin hangi düzenlemeden ve hangi gerekçeden söz ediyorsa onu kullan.",
        ],
      },
      {
        title: "Kolaylık ve koşula uygun uygulama",
        paragraphs: [
          "Kaynaklar güç yetirme ve kolaylık ilkelerini bazı ibadetlerdeki şartlarla ilişkilendirir. Suyun bulunmaması hâlinde teyemmüm örneği, koşula göre öngörülmüş farklı uygulamayı açıklar. Bu, her bireyin bütün kuralları istediği zaman kaldırması demek değildir.",
          "Soru verilen mazereti ve ilgili uygulamayı açıkça bildiriyorsa o ilişkiyi yorumla. Bir örnekteki kolaylığı bağlamından koparıp her eylem için sınırsız istisna yapma. Temel kavramın öğrenilmesi, belirli kişi için ayrıntılı dinî danışmanlık verildiği anlamına gelmez.",
        ],
      },
      {
        title: "Ekonomi, emek ve meşru kazanç",
        paragraphs: [
          "Ekonomi sınırlı kaynakların farklı kullanımlarını, üretim, paylaşım ve seçimleri inceler. İslamî öğretimde çalışma, üretme, emeğin karşılığını alma ve meşru yolla mülk edinme hakları önemsenir. Çalışanın ücretini vermek yalnız gönüllü iyilik değil hakla ilgili bir sorumluluktur.",
          "Ölçüyü eksiltme, aldatma, rüşvet ve haksız kazanç kaynaklarda olumsuzlanır. Bu kavramları sadece para biriktirme başlığına sıkıştırma. Aynı işletme örneğinde ücret, dürüst satış ve sosyal paylaşım farklı ilişkilerle birlikte bulunabilir; her fiili ayrı dayanağıyla açıkla.",
        ],
      },
      {
        title: "İktisat, israf ve cimrilik",
        paragraphs: [
          "İktisat bu öğretim bağlamında israf ile cimrilik arasında ölçülü harcamayı anlatır. İhtiyacı aşan gereksiz tüketim israf, uygun ve gerekli harcamayı esirgemek ise cimrilikle ilişkilidir. Sadece en az harcamayı seçmek her durumda doğru ölçüt değildir.",
          "Bir okul gereksiz su kaybını azaltırken gerekli temizliği sürdürebilir. Bir kurum güvenlik için zorunlu malzemeyi almıyorsa bunu sırf daha az para harcadı diye olumlu tasarruf sayma. İhtiyaç, amaç ve hak koşullarını miktarla birlikte değerlendirmek gerekir.",
        ],
      },
      {
        title: "Zekât, sadaka ve infak",
        paragraphs: [
          "Zekât belirli şartları ve ölçüleri bulunan bir ibadet; sadaka daha geniş maddi ve manevi yardım çerçevesi; infak ise imkânlarını uygun yolda harcamayla ilişkilidir. MEB anlatımında paylaşım ve toplumsal dayanışma bu kavramlarla birlikte ele alınır.",
          "Her yardımın aynı oran ve zamanda zorunlu olduğunu varsayma. Bir metin yalnız bağış davranışını veriyorsa ilgili zekât şartlarının da gerçekleştiğini zihninden ekleme. Toplumsal dayanışma ile belirli ibadetin teknik koşulları farklı soru düzeyleridir.",
        ],
      },
      {
        title: "Sosyal adalet ve eşit hak",
        paragraphs: [
          "Sosyal adalet, hakların korunması ve imkânların hakkaniyetle gözetilmesiyle ilişkilidir. İnsanların gelir, yaş, meslek veya başka koşullarının farklı olması temel haklarının yok sayılması için gerekçe değildir. Eşit insan değeri ile birebir aynı yaşam sonucu aynı önerme değildir.",
          "Eğitim hakkının herkese tanınması bütün öğrencilerin aynı notu veya aynı mesleği seçmesini zorunlu kılmaz. Sağlanan erişim ve korunan hakla kişinin tercihini ayır. Bir soruda ayrımcılık yasağı verildiyse buradan bütün farklılıkların ortadan kaldırılması sonucunu ekleme.",
        ],
      },
      {
        title: "Yaşama, sağlık ve eğitim",
        paragraphs: [
          "Yaşama hakkı ve sağlığın korunması temel haklar arasında öğretilir. İslamî kaynaklarda hastalıkta tedaviye başvurma, zarardan korunma ve eğitim de önemsenir. Darülerkâm ve Suffe tarihî eğitim örnekleri olarak anılır.",
          "Tarihî bir örneği öğrenmek, her çağdaki bütün eğitim düzenlerinin aynı olduğu anlamına gelmez. Bir metin eğitim hakkını vurguluyorsa asıl sonuç erişim ve öğrenme imkânının gözetilmesidir. Kişinin sağlığı veya tedavisi hakkında bu dersten kişisel tıbbi karar çıkarılmaz.",
        ],
      },
      {
        title: "Düşünce, inanç ve ibadet özgürlüğü",
        paragraphs: [
          "Düşünceyi ifade etme, inanç konusunda zorlanmama ve ibadeti yerine getirebilme kaynaklarda birbiriyle ilişkili haklar olarak ele alınır. Başkasının hakkına saygı, birlikte yaşamanın önemli koşuludur. Herkesin aynı görüşü benimsemesi gerekmez.",
          "Birlik kavramını fikirlerin zorla tekleştirilmesiyle eşitleme. Farklı görüşler hakları gözeten ortak yaşam içinde bulunabilir. Soruda hangi özgürlüğün kısıtlandığını belirle: düşünce açıklama, inanç seçimi, ibadet uygulaması veya eğitim erişimi birbirine yakın ama ayrı durumlardır.",
        ],
      },
      {
        title: "Mahremiyet ve güven",
        paragraphs: [
          "Mahremiyet, kişinin özel yaşamının ve paylaşmak istemediği bilgilerinin korunmasıyla ilişkilidir. İzinsiz özel bilgi yaymak, gizli yönleri gereksiz yere araştırmak veya kişisel alana izinsiz girmek bu hakkı ihlal edebilir. Güven, verinin amacına uygun kullanılmasını da gerektirir.",
          "Kamuya hesap verme ile kişisel bilgiyi herkese açma aynı zorunluluk değildir. Bir kurum harcamalarını şeffaf raporlarken yararlanıcıların kimliğini koruyabilir. Hak aramak için gerekli bilginin uygun yetkiliye ölçülü verilmesiyle sınırsız ifşa arasındaki farkı da koru.",
        ],
      },
      {
        title: "Âl-i İmrân 103–105: ortak sorumluluk",
        paragraphs: [
          "Bu ayetler MEB öğretiminde birlik, kardeşlik, iyiliğe çağrı ve yıkıcı ayrışmadan kaçınma mesajlarıyla ele alınır. Ortak sorumluluk, insanların birbirinin hakkını ve birlikte yaşamanın koşullarını gözetmesiyle ilişkilendirilir.",
          "Bir metnin ortak iyiliğe çağırması, herkesin bütün ayrıntılarda aynı fikri taşıması gerektiği sonucu değildir. Soruda çatışma, yardımlaşma ve sorumluluk bağlantılarını ayrı işaretle. Sonra sonucu metnin sunduğu kapsamda kur; fazladan siyasi veya kişisel yargı ekleme.",
        ],
      },
      {
        title: "Birleşik soruda alanları eşleştir",
        paragraphs: [
          "Bir örnekte çeşmenin korunması, su kaybının azaltılması ve farklı kişilerin erişiminin sağlanması birlikte verilebilir. Kültürel miras, çevre ve hak boyutları farklı fiillerle temsil edilir. Yalnız tek alanı söylemek örneğin kalan verilerini açıklamaz.",
          "Önce her fiile kısa bir kavram bağla, sonra ortak üst ilişkiyi kur. Seçenek bütün verileri açıklıyor mu, birini dışarıda bırakıyor mu diye kontrol et. Yeni bağlamda aynı yöntemi kullanmak için hazır örneğin kişi veya mekânını ezberlemek yerine ilişkiyi kendi cümlenle yeniden söyle.",
        ],
      },
    ],
    examples: [
      {
        title: "Sergide üç üretim yolu",
        prompt:
          "Özgün sergi notlarında bir işte su yüzeyi deseni kâğıda aktarılıyor, bir işte harf biçimleri estetik düzene giriyor, başka işte sesler ezgi ve ritimle sıralanıyor. Teknikleri ayır.",
        strategy:
          "Her iş için üretim malzemesini ve yapılan işlemi birlikte eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Su yüzeyindeki desenin kâğıda aktarılması ebru tekniğinin ayırıcı ilişkisidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Harf düzeni hatla; ses, ezgi ve ritim ilişkisi musikiyle eşleşir. Bunlar aynı malzemeyi kullanmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Sergide birlikte bulunmaları üç eserin aynı teknikle üretildiği anlamına gelmez; her biri kendi üretim ilişkisiyle öğrenilir.",
          },
        ],
        answer: "Su deseni:ebru; harf düzeni:hat; ses düzeni:musiki.",
        check:
          "Tezhip için ince bezeme, minyatür için küçük tasvir bilgisi aranırdı; bu üç notta onlar verilmedi.",
        pitfall:
          "Ortak sergi veya ortak kültür başlığını teknik özdeşlik sanmak.",
      },
      {
        title: "Suyun muhasebesi",
        prompt:
          "Özgün modelde bir iş için gerekli kullanım 30 L, önlenebilir kayıp 20 L. Uygun koşulda kaybın %25’i aynı kullanımda dış suyun yerini alacak biçimde geri kazanılıyor. Dış su ihtiyacı nedir?",
        strategy:
          "Önce kayıptan kazanılanı bul, sonra brüt kullanım ihtiyacından çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Brüt ihtiyaç 30 + 20 = 50 L’dir. Gerekli su ile kayıp iki ayrı bileşendir.",
          },
          {
            label: "2. adım",
            explanation:
              "Geri kazanılan miktar 20 × 25/100 = 5 L olur; bu miktar dışarıdan alınacak suyun bir bölümünü karşılar.",
          },
          {
            label: "3. adım",
            explanation:
              "Net dış su 50 − 5 = 45 L’dir. Modelin varsayımları dışında içilebilirlik veya gerçek tesis verimi hesaplanmaz.",
          },
        ],
        answer: "45 L dış su;5 L yeniden kullanım.",
        check: "45 + 5 = 50 L brüt kullanımı karşılar; toplam denge korunur.",
        pitfall:
          "Geri kazanım yüzdesini gerekli 30 L’ye veya yüzdeyi litreye doğrudan uygulamak.",
      },
      {
        title: "İlke kaldı, araç değişti",
        prompt:
          "Bir vakıf ihtiyaç sahiplerine desteğini sürdürüyor; bağış toplama aracını elden teslim yerine güvenli dijital sisteme geçiriyor. Yardımlaşma ilkesi değişmiş midir?",
        strategy: "Değişen aracı ve sabit amacı ayrı cümlelerle belirt.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Verilen değişim bağışın toplanma aracındadır; destek vermenin sürdüğü açıkça söylenir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yardımlaşma amacı devam ettiği için onun ortadan kalktığı veya temel inancın değiştiği kanıtlanmış olmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Dar sonuç yeni araçla aynı toplumsal amaca hizmet edilmesidir; aracın güvenliği gibi koşullar ayrıca değerlendirilir.",
          },
        ],
        answer:
          "Verilen bilgiyle ilke değişimi çıkmaz; toplama aracı değişmiştir.",
        check:
          "Metin desteğin durduğunu söyleseydi farklı veri olurdu; burada devam ettiği belirtiliyor.",
        pitfall:
          "Her toplumsal araç değişimini temel inanç esasının değişmesi sanmak.",
      },
      {
        title: "Aynı hak, farklı ihtiyaç",
        prompt:
          "Özgün bir metin, farklı gelir gruplarındaki insanların sağlık hizmetine erişim hakkını gözetmeyi savunuyor. Bir yorumcu bundan herkese ihtiyaçtan bağımsız aynı tedavinin uygulanması gerektiğini çıkarıyor. Geçişi incele.",
        strategy:
          "Korunan erişim hakkını, kişiye özgü sağlık gereksinimi ve uygulamadan ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Başlangıç ilkesi gelir nedeniyle hizmetten dışlanmamayı, yani erişim hakkını anlatır.",
          },
          {
            label: "2. adım",
            explanation:
              "Tedavinin aynı olması hakkında bilgi yoktur; sağlık ihtiyacına göre değerlendirme ayrı uzmanlık ve veri gerektirir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle eşit erişim hakkını korurken herkese aynı müdahale sonucunu reddederiz. Bu öğretim örneği kişisel tedavi önerisi vermez.",
          },
        ],
        answer:
          "Erişim hakkı eşitliği, bütün tıbbi uygulamaların ihtiyaçtan bağımsız aynı olması demek değildir.",
        check:
          "İki kişi aynı erişim hakkını kullanıp farklı gereksinimler için farklı uzman değerlendirmesi alabilir.",
        pitfall:
          "Hak eşitliğinden ihtiyaç ve uygulamaların zorunlu özdeşliğine geçmek.",
      },
    ],
    recall: [
      {
        prompt: "Hat, tezhip, ebru ve minyatürü ayıran birer teknik ipucu ver.",
        answer:
          "Hat:harf düzeni; tezhip:ince bezeme; ebru:su yüzeyi desenini kâğıda aktarma; minyatür:küçük ayrıntılı tasvir. Bir sayfada birden çok teknik bulunabilir.",
      },
      {
        prompt:
          "İsraf, iktisat ve cimrilik neden tek bir az-çok ölçeği değildir?",
        answer:
          "İsraf gereksiz savurma, iktisat ihtiyacı koruyan ölçü, cimrilik gerekli uygun harcamayı esirgemeyle ilişkilidir. Aynı düşük miktar, ihtiyaç koşuluna göre farklı yorumlanabilir.",
      },
      {
        prompt:
          "Mahremiyet ile hesap açıklığı aynı kurumda nasıl birlikte bulunabilir?",
        answer:
          "Kurum ortak giderlerini raporlarken yararlanıcıların özel bilgilerini koruyabilir. Hangi bilginin hangi amaç ve muhatapla paylaşıldığı ayrımı belirleyicidir.",
      },
      {
        prompt:
          "Tarihî bir sanat uygulamasından güncel bütün tedavi sonuçları çıkar mı?",
        answer:
          "Hayır. Geçmişte kullanılmış olması güncel klinik etkililik veya herkes için sağlık önerisi değildir. Yeni iddia kendi kapsamına uygun bilimsel kanıt gerektirir.",
      },
    ],
    source:
      "MEBİ TYT Din Kültürü Din ve Hayat hedef metinleri; OGM 10.sınıf telafi etkinlikleri; Aurelia Din ve Hayat kopya kâğıdı. Özgün öğretim, su kullanım modeli ve sorular; kişisel dinî hüküm veya resmî sınav sorusu değildir.",
  },
];
interface Card023A {
  passage: string;
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: NonNullable<Question["guidance"]>;
}
const cards023A: Card023A[][] = [
  [
    {
      passage:
        "Bir ders tanımı, dinin Allah tarafından peygamberler aracılığıyla bildirildiğini, insanın hür iradesiyle iyiye yönelmesini amaçladığını söylüyor.",
      prompt:
        "Bu tanımda kaynak, bildirim yolu ve insanın tercihine ilişkin hangi eşleştirme doğrudur?",
      options: [
        "Toplum — deney — zorunlu davranış",
        "Allah — peygamber — insanın hür iradesi",
        "İnsan — peygamber — herkes için aynı fiil",
        "Peygamber — toplumsal alışkanlık — zorunlu taklit",
        "Allah — tarihî yapı — kişinin iradesizliği",
      ],
      answer: 1,
      hint: "Kimden geliyor, kim aracılığıyla geliyor ve kim tercih ediyor sorularını sırayla yanıtla.",
      explanation:
        "Tanımda bildirimin geldiği özne Allah olarak veriliyor; kaynak hanesine Allah yazılır. Mesajın ulaşması peygamberler aracılığıyla açıklanıyor; bildirim yolu peygamberdir. İyiye yönelen insanın hür iradesi ayrıca belirtiliyor; son öğe insanın özgür tercihidir. Kontrol: Üç öğeyi de pasajdaki ayrı ifadelerle eşleştir; birinin doğru olması bütün diziyi doğru yapmaz.",
      guidance: {
        knowledge: [
          "İslamî tanımda ilahî kaynak, peygamber aracılığı ve insanın iradesi farklı öğelerdir.",
        ],
        strategy:
          "Kimden geliyor, kim aracılığıyla geliyor ve kim tercih ediyor sorularını sırayla yanıtla.",
        steps: [
          "Tanımda bildirimin geldiği özne Allah olarak veriliyor; kaynak hanesine Allah yazılır.",
          "Mesajın ulaşması peygamberler aracılığıyla açıklanıyor; bildirim yolu peygamberdir.",
          "İyiye yönelen insanın hür iradesi ayrıca belirtiliyor; son öğe insanın özgür tercihidir.",
        ],
        optionReasons: [
          "Tanımdaki ilahî kaynağı toplumla, hür iradeyi zorunlulukla değiştiriyor.",
          "Metin kaynağı Allah, bildirim yolunu peygamber, tercihi insanın hür iradesi olarak açıkça veriyor.",
          "İnsanı kaynak yerine koyuyor; aynı fiilin zorunluluğuna ilişkin veri verilmedi.",
          "Peygamberi bağımsız ilahî kaynak yapıyor; alışkanlık ve zorunlu taklit metinde yok.",
          "Kaynak korunmuş olsa da bildirim yolu ve tercih koşulu yanlış değiştiriliyor.",
        ],
        commonError: "Kaynak ile mesajı ulaştıran aracıyı aynı özne sanmak.",
        check:
          "Üç öğeyi de pasajdaki ayrı ifadelerle eşleştir; birinin doğru olması bütün diziyi doğru yapmaz.",
      },
    },
    {
      passage:
        "Bir inceleme dinin toplumsal dayanışmadaki rolünü ele alıyor. Başka bir açıklama ise İslam’a göre dinin ilahî kaynağını anlatıyor.",
      prompt: "Bu iki açıklama için en dikkatli değerlendirme hangisidir?",
      options: [
        "Her iki metin de yalnız ibadetin saatini verir.",
        "İkisi aynı sözcükleri kullanmadığı için mutlaka çelişir.",
        "Bu açıklamalar dünyadaki bütün dinlerin aynı tanımıdır.",
        "Toplumsal işlev anlatıldığı için ilahî kaynak tartışması bitmiştir.",
        "Farklı açıklama düzeyleri oldukları için tek başına zorunlu çelişki oluşturmazlar.",
      ],
      answer: 4,
      hint: "İki cümlenin ne hakkında olduğunu ayrı ayrı adlandır.",
      explanation:
        "İlk incelemenin sorusu dinin dayanışmada ne yaptığıdır; bu, toplumsal işlev düzeyidir. İkinci açıklamanın sorusu dinin nereden geldiğidir; ilahî kaynak düzeyidir. Farklı sorulara cevap vermeleri tek başına çelişki oluşturmaz. Kontrol: Kaynak ile işlevi iki ayrı başlıkta yaz; çelişki için aynı konuda birbirini dışlayan iddia gerekir.",
      guidance: {
        knowledge: [
          "Kaynak açıklaması ile toplumsal işlev açıklaması farklı soruları yanıtlayabilir.",
        ],
        strategy: "İki cümlenin ne hakkında olduğunu ayrı ayrı adlandır.",
        steps: [
          "İlk incelemenin sorusu dinin dayanışmada ne yaptığıdır; bu, toplumsal işlev düzeyidir.",
          "İkinci açıklamanın sorusu dinin nereden geldiğidir; ilahî kaynak düzeyidir. Farklı sorulara cevap vermeleri tek başına çelişki oluşturmaz.",
        ],
        optionReasons: [
          "İki metinde de ibadet saati hakkında veri yoktur.",
          "Sözcük farkı çelişkinin yeterli koşulu değildir; aynı ilişkiyi karşıt biçimde söylemeleri gerekir.",
          "Verilen iki çerçeveden bütün dinlere ilişkin evrensel tanım çıkmaz.",
          "İşlev hakkındaki bilgi kaynakla ilgili soruyu kendiliğinden sonuçlandırmaz.",
          "Biri kaynağı, diğeri toplumsal işlevi açıklıyor; bu fark tek başına mantıksal çelişki değildir.",
        ],
        commonError:
          "İki yaklaşımın farklı sorulara yanıt vermesini doğrudan çelişki saymak.",
        check:
          "Kaynak ile işlevi iki ayrı başlıkta yaz; çelişki için aynı konuda birbirini dışlayan iddia gerekir.",
      },
    },
    {
      passage:
        "Öğretmen İslamî bağlamda insanın doğuştan inanma ve anlam aramaya yatkın oluşunu anlatıyor. Sonradan öğrenilen ayrıntılı ibadet kurallarını ise bu yatkınlıktan ayırıyor.",
      prompt: "Öncelikle hangi kavram açıklanıyor?",
      options: ["Mabet", "Fıtrat", "İkrar", "Tebliğ", "Farzıkifaye"],
      answer: 1,
      hint: "Pasajdaki doğuştan yatkınlık ifadesinin neyi anlattığını bul.",
      explanation:
        "Doğuştan gelen özellik inanma ve anlam arama yatkınlığıdır; pasaj hazır ibadet bilgisi vermiyor. Bu nedenle tanımlanan fıtrattır. Sonradan öğrenilen kuralların ayrıca ayrılması da bu eşleşmeyi destekler. Kontrol: Metinde doğuştan gelen şeyin eğilim olduğunu koru; bütün kuralları bilme eklenmiyor.",
      guidance: {
        knowledge: [
          "Fıtrat yaratılıştan gelen yetenek ve eğilimle ilişkilidir; öğrenilmiş ayrıntının aynısı değildir.",
        ],
        strategy:
          "Pasajdaki doğuştan yatkınlık ifadesinin neyi anlattığını bul.",
        steps: [
          "Doğuştan gelen özellik inanma ve anlam arama yatkınlığıdır; pasaj hazır ibadet bilgisi vermiyor.",
          "Bu nedenle tanımlanan fıtrattır. Sonradan öğrenilen kuralların ayrıca ayrılması da bu eşleşmeyi destekler.",
        ],
        optionReasons: [
          "Mabet ibadet edilen yerdir; insanın doğuştan eğilimi değildir.",
          "Doğuştan gelen inanma ve anlam arama yatkınlığı fıtratla eşleşir.",
          "İkrar inandığını sözle bildirmedir; pasaj bir sözlü beyan anlatmıyor.",
          "Tebliğ mesajın ulaştırılmasıdır; yaratılış yatkınlığıyla aynı kavram değildir.",
          "Farzıkifaye ortak yükümlülük türüdür; pasajda görev paylaşımı yoktur.",
        ],
        commonError:
          "Yaratılış eğilimini sonradan öğrenilmiş bütün dinî kuralların hazır bilgisi sanmak.",
        check:
          "Metinde doğuştan gelen şeyin eğilim olduğunu koru; bütün kuralları bilme eklenmiyor.",
      },
    },
    {
      passage:
        "Bir öğrenci, “Fıtrat doğuştan bir eğilimse herkes bütün ibadet ayrıntılarını doğduğu anda bilir.” diyor.",
      prompt: "Bu çıkarımdaki ilk sorun nedir?",
      options: [
        "Eğilimden hazır ve eksiksiz bilgiye kanıtsız geçmesidir.",
        "İkrarın sözlü olduğunu söylemesidir.",
        "İbadetlerin hiçbirinin öğrenilemeyeceğini kanıtlamasıdır.",
        "Altı iman esasını eksik saymasıdır.",
        "Peygamberliği bildirim yolu saymasıdır.",
      ],
      answer: 0,
      hint: "Yatkınlık ile ayrıntılı öğrenilmiş bilgiyi karşılaştır.",
      explanation:
        "Öncül yalnız doğuştan bir eğilim olduğunu söylüyor; sonuç ise bütün ibadet ayrıntılarının hazır bilindiğini ekliyor. Eğilimden eksiksiz bilgiye götüren ek öncül yoktur; hata, iki farklı bilgi düzeyini kanıtsız eşitlemektir. Kontrol: Öğrenme yeteneği ile okunmuş bütün kitaplar arasındaki farkı düşün; aynı mantıksal ayrım burada geçerlidir.",
      guidance: {
        knowledge: [
          "Bir şeyi öğrenmeye yatkınlık, o şeyin bütün ayrıntılarını önceden bilmek demek değildir.",
        ],
        strategy: "Yatkınlık ile ayrıntılı öğrenilmiş bilgiyi karşılaştır.",
        steps: [
          "Öncül yalnız doğuştan bir eğilim olduğunu söylüyor; sonuç ise bütün ibadet ayrıntılarının hazır bilindiğini ekliyor.",
          "Eğilimden eksiksiz bilgiye götüren ek öncül yoktur; hata, iki farklı bilgi düzeyini kanıtsız eşitlemektir.",
        ],
        optionReasons: [
          "Başlangıç öncülü eğilim verir; sonuç bütün kuralları doğuştan bilme ekleyerek kapsamı genişletir.",
          "Öğrenci ikrarın anlamını açıklamıyor; sorun bu terimde değil.",
          "Verilen cümle öğrenmenin imkânsızlığını kanıtlamıyor.",
          "Cümlede iman esasları listelenmediği için sayı hatası yoktur.",
          "Öğrenci peygamberliğe ilişkin bir sınıflama yapmıyor.",
        ],
        commonError: "Bir kavramın kapsamını bütün ayrıntılara genellemek.",
        check:
          "Öğrenme yeteneği ile okunmuş bütün kitaplar arasındaki farkı düşün; aynı mantıksal ayrım burada geçerlidir.",
      },
    },
    {
      passage:
        "Özgün bir açıklama, Hz. İbrahim’le ilişkilendirilen, Allah’a ortak koşmadan tevhide yönelişi anlatıyor.",
      prompt: "Bu yönelişin adı hangisidir?",
      options: ["Mizaç", "Nafile", "Haniflik", "İkrar", "Medeniyet"],
      answer: 2,
      hint: "Metindeki yaratılış eğilimi değil, belirli inanç yönelişi vurgusuna odaklan.",
      explanation:
        "İfadedeki ayırt edici koşul, Hz. İbrahim bağlamında ortak koşmadan tevhide yönelmektir. Bu özel yöneliş haniflikle eşleşir; doğuştan yatkınlık anlatan fıtrat burada sorulan eylemin adı değildir. Kontrol: İstenen, eğilimin doğuştan oluşu değil ortak koşmadan yönelişin adıdır.",
      guidance: {
        knowledge: [
          "Haniflik tevhid yönelişiyle ve Hz. İbrahim’le ilişkilendirilir.",
        ],
        strategy:
          "Metindeki yaratılış eğilimi değil, belirli inanç yönelişi vurgusuna odaklan.",
        steps: [
          "İfadedeki ayırt edici koşul, Hz. İbrahim bağlamında ortak koşmadan tevhide yönelmektir.",
          "Bu özel yöneliş haniflikle eşleşir; doğuştan yatkınlık anlatan fıtrat burada sorulan eylemin adı değildir.",
        ],
        optionReasons: [
          "Mizaç kişinin eğilim özellikleriyle ilgilidir; verilen tevhid yönelişini karşılamaz.",
          "Nafile isteğe bağlı ibadet türüdür; inanç yönelişinin adı değildir.",
          "İbrahim ve ortak koşmadan tevhide yönelme birlikte haniflik bağlamını verir.",
          "İkrar sözlü ifade boyutudur; pasaj sadece konuşma eylemi anlatmıyor.",
          "Medeniyet tarihî ortak birikimdir; burada temel kavram o değildir.",
        ],
        commonError:
          "İbrahim ve tevhit yönelişini görmezden gelip her dinî eğilimi fıtrat diye adlandırmak.",
        check:
          "İstenen, eğilimin doğuştan oluşu değil ortak koşmadan yönelişin adıdır.",
      },
    },
    {
      passage:
        "Bir metin İslam inancında Allah’ın bir ve eşsiz yaratıcı olduğunu kabul etmeyi açıklıyor.",
      prompt: "Açıklanan temel kavram hangisidir?",
      options: ["Şirk", "Tevhit", "Âdet", "İsraf", "Fıtrat"],
      answer: 1,
      hint: "Cümlenin doğuştan yetenek mi yoksa Allah’ın birliği mi hakkında olduğuna bak.",
      explanation:
        "Metindeki bir ve eşsiz sözleri yalnız yaratıcı olmayı değil, ortak ve denk kabul etmemeyi bildiriyor. Bu iki nitelik birlikte tevhit kavramını karşılar; ibadet mekânı veya davranış derecesi anlatılmıyor. Kontrol: Tevhit ile şirkin yönleri karşıttır; pasajda ortak bulunmadığı açık.",
      guidance: {
        knowledge: ["Tevhit Allah’ın bir ve eşsiz olduğu kabulüdür."],
        strategy:
          "Cümlenin doğuştan yetenek mi yoksa Allah’ın birliği mi hakkında olduğuna bak.",
        steps: [
          "Metindeki bir ve eşsiz sözleri yalnız yaratıcı olmayı değil, ortak ve denk kabul etmemeyi bildiriyor.",
          "Bu iki nitelik birlikte tevhit kavramını karşılar; ibadet mekânı veya davranış derecesi anlatılmıyor.",
        ],
        optionReasons: [
          "Şirk ortak koşmadır; pasaj ortaklığı değil birliği açıklıyor.",
          "Birlik ve eşsizlik kabulü doğrudan tevhit tanımıdır.",
          "Âdet tekrarlanan toplumsal alışkanlıktır; ilahî birlik kabulü değildir.",
          "İsraf kaynak savurganlığıdır; inanç önermesiyle ilgili değildir.",
          "Fıtrat yaratılış yatkınlığıdır; Allah’ın birliği önermesinin adı değildir.",
        ],
        commonError: "Birlik ve ortak koşma kavramlarını aynı yönde okumak.",
        check:
          "Tevhit ile şirkin yönleri karşıttır; pasajda ortak bulunmadığı açık.",
      },
    },
    {
      passage:
        "Hazırlanmış örnekte Selim, bir inancı gönülden benimsediğini ifade ediyor. Soru yalnız bu içten onaylama boyutunu soruyor.",
      prompt: "Hangi kavram en doğrudan uygundur?",
      options: ["İkrar", "Tebliğ", "Mabet", "Nafile", "Tasdik"],
      answer: 4,
      hint: "Sorunun iç onayı mı, bu onay hakkında söylenen sözü mü istediğini ayır.",
      explanation:
        "Sorulan yönü yalnız içten onaylama diye sınırla; Selim’in konuşuyor olması bu hedefi değiştirmez. Gönülden benimseme tasdiktir. Kök dil ile bildirmeyi isteseydi ikrar üzerinde durulurdu. Kontrol: Sorunun yalnız bu içten onaylama sözünü yeniden oku; cevap sınıfı iç kabul olmalıdır.",
      guidance: {
        knowledge: [
          "Tasdik kalben onaylamadır; ikrar ise sözle ifade boyutudur.",
        ],
        strategy:
          "Sorunun iç onayı mı, bu onay hakkında söylenen sözü mü istediğini ayır.",
        steps: [
          "Sorulan yönü yalnız içten onaylama diye sınırla; Selim’in konuşuyor olması bu hedefi değiştirmez.",
          "Gönülden benimseme tasdiktir. Kök dil ile bildirmeyi isteseydi ikrar üzerinde durulurdu.",
        ],
        optionReasons: [
          "Örnekte bir bildirim olsa da soru açıkça sözlü ifadeyi değil iç onayı istiyor.",
          "Tebliğ dinî mesajı ulaştırma görevidir; bireyin iç onayını adlandırmaz.",
          "Mabet bir mekândır; iç onay değildir.",
          "Nafile yükümlülük türüdür; tasdik boyutunu açıklamaz.",
          "Kök özellikle gönülden benimseme ve içten onaylama boyutunu istiyor.",
        ],
        commonError:
          "Pasajda ifade ediyor fiili bulunduğu için kökün özellikle istediği iç kabulü atlamak.",
        check:
          "Sorunun yalnız bu içten onaylama sözünü yeniden oku; cevap sınıfı iç kabul olmalıdır.",
      },
    },
    {
      passage:
        "Bir öğrenme kartı “Kişinin benimsediği inancı diliyle bildirmesi” ifadesini veriyor.",
      prompt: "Karttaki açıklama hangi kavrama karşılık gelir?",
      options: ["İkrar", "Amel", "Tasdik", "Fıtrat", "Ulûhiyet"],
      answer: 0,
      hint: "Dille bildirme ile davranışta bulunmayı iki ayrı eylem olarak oku.",
      explanation:
        "Kartın fiili diliyle bildirmektir; iç kabulün kendisi değil, onun sözle ifadesi soruluyor. Sözlü bildirim ikrarla eşleşir; yalnız kalben onaylama anlamındaki tasdik aynı hedef değildir. Kontrol: Cümlede dil vurgusu var; kalp veya uygulama vurgusuyla yer değiştirme.",
      guidance: {
        knowledge: [
          "İkrar inancın sözle bildirilmesi, amel ise eylem boyutudur.",
        ],
        strategy:
          "Dille bildirme ile davranışta bulunmayı iki ayrı eylem olarak oku.",
        steps: [
          "Kartın fiili diliyle bildirmektir; iç kabulün kendisi değil, onun sözle ifadesi soruluyor.",
          "Sözlü bildirim ikrarla eşleşir; yalnız kalben onaylama anlamındaki tasdik aynı hedef değildir.",
        ],
        optionReasons: [
          "Dil ile bildirme ikrarın ayırıcı öğesidir.",
          "Amel davranış boyutudur; burada özellikle sözle beyan isteniyor.",
          "Tasdik içten onaydır; sözlü bildirimle aynı düzey değildir.",
          "Fıtrat doğuştan eğilimdir; bildirim eylemi değildir.",
          "Ulûhiyet ilahlık boyutudur; kişinin sözlü beyanını anlatmaz.",
        ],
        commonError: "İç kabul, söz ve eylemi tek kavramla karşılamak.",
        check:
          "Cümlede dil vurgusu var; kalp veya uygulama vurgusuyla yer değiştirme.",
      },
    },
    {
      passage:
        "Bir öğretim listesinde melekler, kitaplar, peygamberler ve hac yer alıyor.",
      prompt: "Hangisi altı iman esasından biri olarak sınıflandırılmaz?",
      options: [
        "Ahirete inanma",
        "Meleklere inanma",
        "Peygamberlere inanma",
        "Kitaplara inanma",
        "Hac",
      ],
      answer: 4,
      hint: "Dinle ilgili olmayı değil, sorunun istediği belirli listeyi ölçüt al.",
      explanation:
        "Melekler, kitaplar ve peygamberler altı iman esasında inanılan başlıklardır; bunlar listede kalır. Hac ise ilgili şartları olan temel ibadettir; bu nedenle verilen dört öğe içinde iman esası sınıfının dışında kalır. Kontrol: Olumsuz kök, listede bulunmayan öğeyi istiyor; hac için ayrı beş şart başlığına dön.",
      guidance: {
        knowledge: [
          "Hac İslam’ın beş şartı arasında; meleklere, kitaplara ve peygamberlere inanma iman esasları arasındadır.",
        ],
        strategy:
          "Dinle ilgili olmayı değil, sorunun istediği belirli listeyi ölçüt al.",
        steps: [
          "Melekler, kitaplar ve peygamberler altı iman esasında inanılan başlıklardır; bunlar listede kalır.",
          "Hac ise ilgili şartları olan temel ibadettir; bu nedenle verilen dört öğe içinde iman esası sınıfının dışında kalır.",
        ],
        optionReasons: [
          "Ahirete inanma altı iman esası içindedir.",
          "Meleklere inanma altı iman esası içindedir.",
          "Peygamberlere inanma altı iman esası içindedir.",
          "Kitaplara inanma altı iman esası içindedir.",
          "Hac temel ibadetler ve İslam’ın şartları listesinde yer alır; altı iman esasının adı değildir.",
        ],
        commonError:
          "Dinle ilgili olan bütün terimleri iman esasları listesine koymak.",
        check:
          "Olumsuz kök, listede bulunmayan öğeyi istiyor; hac için ayrı beş şart başlığına dön.",
      },
    },
    {
      passage:
        "Bir öğrenci, kader inancı ile zekât ibadetini aynı başlık altına koymuş ve her ikisini de altı iman esası saymış.",
      prompt: "Hangi düzeltme uygundur?",
      options: [
        "Kader yalnız mekân, zekât yalnız inançtır.",
        "Zekât inanç esası, kader farzıkifayedir.",
        "Kader iman esası, zekât temel ibadetlerdendir.",
        "Her ikisi de İslam’ın beş şartının adıdır.",
        "Her ikisi de peygamber adıdır.",
      ],
      answer: 2,
      hint: "İki öğenin dinle ilişkili oluşunu değil hangi sınıfa ait olduğunu karşılaştır.",
      explanation:
        "Kader inancı bir inanma başlığıdır; altı iman esası içinde yer alır. Zekât ise yapılan ibadettir. İki öğeyi aynı inanç listesine koymak yerine kaderi iman, zekâtı uygulama başlığında tutarız. Kontrol: Altı esas ve beş şartı ayrı yazdığında kader ve zekât farklı listelerde kalır.",
      guidance: {
        knowledge: [
          "Kader inancı iman esasları, zekât İslam’ın şartları arasında öğretilir.",
        ],
        strategy:
          "İki öğenin dinle ilişkili oluşunu değil hangi sınıfa ait olduğunu karşılaştır.",
        steps: [
          "Kader inancı bir inanma başlığıdır; altı iman esası içinde yer alır.",
          "Zekât ise yapılan ibadettir. İki öğeyi aynı inanç listesine koymak yerine kaderi iman, zekâtı uygulama başlığında tutarız.",
        ],
        optionReasons: [
          "Kader mekân değildir; zekât da yalnız inanç esası diye sınıflanmaz.",
          "Zekâtın listesi ters çevrilmiş; kader bir ortak görev türü değildir.",
          "İki terim farklı sınıflara yerleştirilince iman ve uygulama ayrımı korunur.",
          "Kader inancı beş şart listesinde bulunmaz.",
          "İki terim de kişi veya peygamber adı değildir.",
        ],
        commonError:
          "İnanç esası ile ibadet adını ayırmak için yalnız din kelimesine güvenmek.",
        check:
          "Altı esas ve beş şartı ayrı yazdığında kader ve zekât farklı listelerde kalır.",
      },
    },
    {
      passage:
        "Özgün pasaj: “Bir kişi Allah’a inanmayı benimsiyor, fakat peygamberlik kurumunu inanılacak esasların dışında tutuyor.” Soru gerçek kişinin kimliğini değil, dersin inanç ilkesiyle bu önermenin ilişkisini inceliyor.",
      prompt: "Bu önerme hangi ilkeyle uyuşmaz?",
      options: [
        "Nafile ibadetlerin zorunlu oluşu",
        "Bütün insanlar aynı mesleği seçmelidir.",
        "Bütün ibadetlerin aynı sürede yapılması",
        "Her şehrin aynı yapıya sahip olması",
        "İman esaslarının bütünlüğü",
      ],
      answer: 4,
      hint: "Kabul ve reddedilen unsuru iki ayrı satıra koy.",
      explanation:
        "Pasaj Allah’a inanmayı kabul ederken peygamberliği esasların dışında bırakıyor. Dersin bütünlük ilkesi iman esaslarını birlikte ele alır; birini kabul edip diğerini dışlayan önerme bu ilkeyle uyuşmaz. Gerçek kişi hakkında hüküm verilmiyor. Kontrol: Pasajda reddedilen şey peygamberlik kurumudur; davranış sayısı veya ibadet süresi değildir.",
      guidance: {
        knowledge: [
          "MEB öğretiminde İslam inanç esasları birlikte kabul edilen bir bütündür.",
        ],
        strategy: "Kabul ve reddedilen unsuru iki ayrı satıra koy.",
        steps: [
          "Pasaj Allah’a inanmayı kabul ederken peygamberliği esasların dışında bırakıyor.",
          "Dersin bütünlük ilkesi iman esaslarını birlikte ele alır; birini kabul edip diğerini dışlayan önerme bu ilkeyle uyuşmaz. Gerçek kişi hakkında hüküm verilmiyor.",
        ],
        optionReasons: [
          "Nafile ibadetler bu pasajın konusu değildir; ayrıca zorunlu diye tanımlanmaz.",
          "Meslek seçimine ilişkin ilke verilmedi.",
          "Metin ibadet süreleri hakkında hiçbir şey söylemiyor.",
          "Şehir veya yapı bilgisi yoktur.",
          "Bir temel esası kabul edip peygamberliği dışlamak, birlikte kabul edilen esaslar bütünlüğüyle uyuşmaz.",
        ],
        commonError:
          "Bir inanç esasını dışlamayı yalnız bir ibadetin eksik yapılmasıyla aynı saymak.",
        check:
          "Pasajda reddedilen şey peygamberlik kurumudur; davranış sayısı veya ibadet süresi değildir.",
      },
    },
    {
      passage:
        "Bir ders, Nisâ 136’nın inanılacak esasları birlikte anmasını açıklıyor; başka bir kart ise yalnız bazı peygamberlerin kabul edilmesini yeterli gösteriyor.",
      prompt: "İki kartı karşılaştıran en uygun sonuç hangisidir?",
      options: [
        "İkinci kart bütünlüğü eksiksiz korur.",
        "Birlikte kabul hiçbir öğenin önem taşımadığı anlamına gelir.",
        "Ayet bütün toplumların aynı kıyafeti kullandığını kanıtlar.",
        "İkinci kart birlikte kabul vurgusunu daraltır.",
        "İki kart yalnız cami mimarisini açıklar.",
      ],
      answer: 3,
      hint: "Hepsi ile bazıları arasındaki kapsam farkını göster.",
      explanation:
        "İlk kartın ölçütü inanılacak esasların birlikte anılmasıdır; ikinci kart yalnız bazı peygamberleri yeterli görüyor. Bazı sözcüğü kabul kapsamını azaltır. İkinci kart bu nedenle ilk karttaki birlikte kabul vurgusunu daraltır. Kontrol: Seçili bazıları ifadesi bütünlük kapsamına eşit değildir; sayılan öğeyi keyfî dışlamıyor muyuz kontrol et.",
      guidance: {
        knowledge: [
          "Birlikte kabul vurgusu, keyfî kabul-ret ayrımından farklıdır.",
        ],
        strategy: "Hepsi ile bazıları arasındaki kapsam farkını göster.",
        steps: [
          "İlk kartın ölçütü inanılacak esasların birlikte anılmasıdır; ikinci kart yalnız bazı peygamberleri yeterli görüyor.",
          "Bazı sözcüğü kabul kapsamını azaltır. İkinci kart bu nedenle ilk karttaki birlikte kabul vurgusunu daraltır.",
        ],
        optionReasons: [
          "Bazılarını dışlama olanağı bıraktığı için eksiksiz aynı kapsam değildir.",
          "Bütünlük, öğelerin anlamsızlığı değil birlikte ele alınmasıdır.",
          "Kıyafet veya toplumsal davranış bilgisi verilmedi.",
          "Bazı peygamberlerle yetinme, bütünlük anlatımındaki kapsamı azaltır.",
          "Metinler inanç esaslarıyla ilgilidir, mimariyle değil.",
        ],
        commonError:
          "İman hakkında konuşan her seçeneği metnin vurgusuna bakmadan doğru saymak.",
        check:
          "Seçili bazıları ifadesi bütünlük kapsamına eşit değildir; sayılan öğeyi keyfî dışlamıyor muyuz kontrol et.",
      },
    },
    {
      passage:
        "Cibril hadisi hakkındaki öğretimde iman, İslam ve ihsan ayrı odaklarla açıklanıyor. İhsan için Allah’ın gözetimi bilinciyle kulluk vurgulanıyor.",
      prompt: "İhsan bu bağlamda hangisini anlatır?",
      options: [
        "Peygamberlerin hiçbir mesaj iletmemesi",
        "İbadet edilen binanın adı",
        "Bilinç ve özenle kulluk",
        "Her ibadetin süresinin aynı olması",
        "Altı iman esasına eklenen yedinci madde",
      ],
      answer: 2,
      hint: "Kelimenin bu bağlamda verilen açıklamasını kullan.",
      explanation:
        "İhsan açıklamasındaki belirleyici ifade Allah’ın gözetimi bilincidir; kaç iman esası olduğu sorulmuyor. Bu bilinç kulluğun özenle yaşanmasına ilişkindir. Dolayısıyla cevap yeni bir esas veya mekân değil, bilinçli kulluktur. Kontrol: İstenen şey kaç esas olduğu değil, kulluktaki farkındalık boyutudur.",
      guidance: {
        knowledge: [
          "İhsan ibadet bağlamında bilinç ve özen boyutudur; yeni bir inanç maddesi veya mekân değildir.",
        ],
        strategy: "Kelimenin bu bağlamda verilen açıklamasını kullan.",
        steps: [
          "İhsan açıklamasındaki belirleyici ifade Allah’ın gözetimi bilincidir; kaç iman esası olduğu sorulmuyor.",
          "Bu bilinç kulluğun özenle yaşanmasına ilişkindir. Dolayısıyla cevap yeni bir esas veya mekân değil, bilinçli kulluktur.",
        ],
        optionReasons: [
          "Bu ifade tebliğ ilişkisini reddeder ve pasajla ilgili değildir.",
          "Bu, mabet kavramını çağrıştırır; ihsanın açıklaması değildir.",
          "Allah’ın gözetimi bilinci, kulluğun nasıl bir farkındalıkla yaşandığına ilişkin açıklamadır.",
          "Süreye ilişkin veri yoktur.",
          "Metin ihsanı yeni bir iman esası listesi maddesi yapmıyor.",
        ],
        commonError: "İhsanı bir listeye eklenen yeni inanç esası gibi okumak.",
        check:
          "İstenen şey kaç esas olduğu değil, kulluktaki farkındalık boyutudur.",
      },
    },
    {
      passage:
        "Bir şema, ibadet eden insanı ve kendisine ibadet edileni ilişkinin iki tarafı olarak gösteriyor. İnsan tarafına kulluk, diğer tarafa ilahlık yazılıyor.",
      prompt: "Kulluk ve ilahlık hangi sırayla eşleşir?",
      options: [
        "Ubûdiyet — ulûhiyet",
        "Nafile — farzıkifaye",
        "Ulûhiyet — ubûdiyet",
        "Şecaat — israf",
        "Mabet — âdet",
      ],
      answer: 0,
      hint: "Önce insanın yaptığı işi, sonra ilişkinin yöneldiği varlığın niteliğini adlandır.",
      explanation:
        "Önce istenen sıranın kulluk, sonra ilahlık olduğunu koru: insanın kulluğu ubûdiyettir. İbadet edilen varlığın ilahlık boyutu ulûhiyettir; doğru çift ubûdiyet–ulûhiyet olur. Kontrol: İnsan kulluk eder; ibadet edilen varlıkla ilgili ilahlık boyutu karşı taraftadır.",
      guidance: {
        knowledge: ["Ubûdiyet kulluk, ulûhiyet ilahlık boyutudur."],
        strategy:
          "Önce insanın yaptığı işi, sonra ilişkinin yöneldiği varlığın niteliğini adlandır.",
        steps: [
          "Önce istenen sıranın kulluk, sonra ilahlık olduğunu koru: insanın kulluğu ubûdiyettir.",
          "İbadet edilen varlığın ilahlık boyutu ulûhiyettir; doğru çift ubûdiyet–ulûhiyet olur.",
        ],
        optionReasons: [
          "İnsan tarafındaki kulluk ubûdiyet, ilahlık boyutu ulûhiyetle eşleşir.",
          "Bunlar hüküm türleridir; kulluk ve ilahlık ayrımı değildir.",
          "İki terimin yönü ters çevrilmiştir.",
          "Cesaret ve savurganlık kavramları bu ilişkinin taraflarını adlandırmaz.",
          "Mabet mekân, âdet alışkanlıktır; iki boyutu karşılamaz.",
        ],
        commonError:
          "Yakın sesli iki terimi ilişki yönüne bakmadan yer değiştirmek.",
        check:
          "İnsan kulluk eder; ibadet edilen varlıkla ilgili ilahlık boyutu karşı taraftadır.",
      },
    },
  ],
  [
    {
      passage:
        "Duru Ramazan orucu tutuyor. Ece ise Allah rızası amacıyla mahallesindeki yaşlılara yemek ulaştırıyor.",
      prompt: "Bu iki örnek ibadet anlayışıyla nasıl ilişkilendirilir?",
      options: [
        "Yalnız oruçta herhangi bir amaç bulunabilir.",
        "Oruç özel, belirtilen niyetle yardım geniş kapsamı örnekler.",
        "İki davranış da aynı teknik uygulamadır.",
        "Yardım altıncı iman esasıdır.",
        "Geniş kapsam sadece bina inşa etmek demektir.",
      ],
      answer: 1,
      hint: "Biçimi belirli ibadet ile amaçlı yardım eylemini ayrı eşleştir.",
      explanation:
        "Duru’nun Ramazan orucu belirli biçim ve kuralları olan özel ibadettir. Ece’nin yemek ulaştırması için Allah rızası amacı açıkça verildiğinden bu yardım geniş ibadet kapsamıyla ilişkilendirilir. Kontrol: İkisi kullukla ilişkili olabilir; bu onları beş şart listesinde aynı öğe yapmaz.",
      guidance: {
        knowledge: [
          "Vakti ve biçimi belirli uygulama özel; niyetle yapılan güzel davranış geniş ibadet kapsamıyla ilişkilidir.",
        ],
        strategy:
          "Biçimi belirli ibadet ile amaçlı yardım eylemini ayrı eşleştir.",
        steps: [
          "Duru’nun Ramazan orucu belirli biçim ve kuralları olan özel ibadettir.",
          "Ece’nin yemek ulaştırması için Allah rızası amacı açıkça verildiğinden bu yardım geniş ibadet kapsamıyla ilişkilendirilir.",
        ],
        optionReasons: [
          "Yardımın amacı pasajda açıkça bildirildiği için bu ifade yanlıştır.",
          "Oruç belirli ibadet, yardım ise açıkça verilen iyi amaçla genel kulluk örneğidir.",
          "Oruç ile yemek ulaştırma aynı uygulama biçimi değildir.",
          "Yardım eylemini inanç listesine eklemek sınıf karışıklığıdır.",
          "Geniş ibadet anlayışı tek bir yapım faaliyetiyle sınırlı değildir.",
        ],
        commonError:
          "Geniş kapsamı özel ibadetin yerine geçen aynı teknik sanmak.",
        check:
          "İkisi kullukla ilişkili olabilir; bu onları beş şart listesinde aynı öğe yapmaz.",
      },
    },
    {
      passage:
        "Bir kişi komşusunun yükünü taşıdı. Pasaj neden yardım ettiğini açıklamıyor.",
      prompt: "Bu veriden hangi sonuç kesin çıkar?",
      options: [
        "Hayatı boyunca hiçbir karşılık beklememiştir.",
        "Yalnız gösteriş amacı taşımıştır.",
        "Komşusuna hiçbir faydası olmamıştır.",
        "Komşusuna somut yardım etmiştir.",
        "Yalnız Allah rızası amacı taşımıştır.",
      ],
      answer: 3,
      hint: "Metnin açık verdiği fiili, verilmemiş niyetlerden ayır.",
      explanation:
        "Yük taşıma eylemi açıkça bildirilmiş; komşuya somut yardım yapıldığını biliyoruz. Yardımın amacı verilmediği için bu eylemden kesin dinî niyet veya gösteriş sonucu çıkaramayız. Kesin olanı eylemle sınırlarız. Kontrol: Kesin olan yükün taşınmasıdır; niyet seçenekleri için ayrı amaç cümlesi gerekir.",
      guidance: {
        knowledge: ["Gözlenen eylem ile eylemin iç amacı farklı verilerdir."],
        strategy: "Metnin açık verdiği fiili, verilmemiş niyetlerden ayır.",
        steps: [
          "Yük taşıma eylemi açıkça bildirilmiş; komşuya somut yardım yapıldığını biliyoruz.",
          "Yardımın amacı verilmediği için bu eylemden kesin dinî niyet veya gösteriş sonucu çıkaramayız. Kesin olanı eylemle sınırlarız.",
        ],
        optionReasons: [
          "Tek olaydan bütün yaşamına ilişkin niyet çıkarılamaz.",
          "Gösteriş niyeti pasajda verilmedi.",
          "Yük taşıma yardımı verilirken faydasızlık sonucu desteklenmiyor.",
          "Yükünü taşıması yardım eylemini doğrudan gösterir; iç amaç eklemeye gerek yoktur.",
          "Dinî niyet de pasajda belirtilmedi.",
        ],
        commonError: "Olumlu görünen eylemden bilinmeyen niyete kesin geçmek.",
        check:
          "Kesin olan yükün taşınmasıdır; niyet seçenekleri için ayrı amaç cümlesi gerekir.",
      },
    },
    {
      passage:
        "Bir derste ibadetlerin temel amacının Allah’ın rızası olduğu, paylaşma ve öz denetimin ise ibadetlerle ilişkilendirilen yararlar olduğu açıklanıyor.",
      prompt: "Temel amaç ile yardımcı yarar nasıl ayrılır?",
      options: [
        "Dayanışma varsa Allah rızası amacı ortadan kalkar.",
        "Öz denetim bir mabet adıdır.",
        "Her yarar bütün insanlarda otomatik ölçülmüştür.",
        "Allah rızası temel amaç; dayanışma ve öz denetim açıklanan yararlardır.",
        "Temel amaç yalnız bedensel hareket sayısıdır.",
      ],
      answer: 3,
      hint: "Amaç cümlesi ile sonuç cümlesini ayrı başlıkta göster.",
      explanation:
        "Temel amaç sözcüklerinin yanında Allah’ın rızası yer alıyor; niçin ibadet edildiğinin cevabı budur. Paylaşma ve öz denetim yarar olarak ayrıca anılmıştır; bunları amaç yerine geçirmek iki ayrı ilişkiyi karıştırır. Kontrol: Sorunun amaç mı yarar mı istediğini yeniden kontrol et; ikisi aynı örnekte bulunabilir.",
      guidance: {
        knowledge: [
          "Amaç niçin yapıldığını, yarar ise onunla ilişkilendirilen sonucu belirtir.",
        ],
        strategy: "Amaç cümlesi ile sonuç cümlesini ayrı başlıkta göster.",
        steps: [
          "Temel amaç sözcüklerinin yanında Allah’ın rızası yer alıyor; niçin ibadet edildiğinin cevabı budur.",
          "Paylaşma ve öz denetim yarar olarak ayrıca anılmıştır; bunları amaç yerine geçirmek iki ayrı ilişkiyi karıştırır.",
        ],
        optionReasons: [
          "Bir yararın bulunması temel amacı silmez.",
          "Öz denetim davranış yönetimiyle ilgilidir; mekân değildir.",
          "Öğretim bağlantısı bireysel etki ölçümü demek değildir.",
          "Pasaj iki düzeyi açıkça ayırır; amaçla toplumsal ve bireysel sonuç aynı sınıflama değildir.",
          "Böyle bir amaç pasajda verilmedi.",
        ],
        commonError:
          "Bir ibadetin yararını onun tek temel amacı yerine koymak.",
        check:
          "Sorunun amaç mı yarar mı istediğini yeniden kontrol et; ikisi aynı örnekte bulunabilir.",
      },
    },
    {
      passage:
        "Öğretim kartı, dinî emir ve yasaklarla sorumlu tutulan kişiyi açıklıyor.",
      prompt: "Kart hangi kavramı tanımlar?",
      options: ["Mabet", "Farzıkifaye", "Medeniyet", "Tezhip", "Mükellef"],
      answer: 4,
      hint: "Tanımın kişiyi mi davranış sınıflarını mı anlattığını bul.",
      explanation:
        "Tanım bir eylemi veya mekânı değil, emir ve yasaklarla sorumlu tutulan kişiyi tarif ediyor. Sorumluluğu taşıyan kişi mükelleftir; farz veya vacip ise o kişinin fiiline ilişkin hüküm türüdür. Kontrol: Kişi sözcüğü belirleyicidir; tanım doğrudan bir insanın sorumluluk statüsünü adlandırıyor.",
      guidance: {
        knowledge: [
          "Mükellef yükümlü kişidir; efâlimükellefin ise bu kişinin fiillerine ilişkin hükümler alanıdır.",
        ],
        strategy: "Tanımın kişiyi mi davranış sınıflarını mı anlattığını bul.",
        steps: [
          "Tanım bir eylemi veya mekânı değil, emir ve yasaklarla sorumlu tutulan kişiyi tarif ediyor.",
          "Sorumluluğu taşıyan kişi mükelleftir; farz veya vacip ise o kişinin fiiline ilişkin hüküm türüdür.",
        ],
        optionReasons: [
          "Mabet ibadet yeri; sorumluluğun muhatabı kişi değildir.",
          "Farzıkifaye belirli ortak yükümlülük türüdür; kişinin genel adı değildir.",
          "Medeniyet ortak tarihî birikimdir; yükümlü kişi anlamına gelmez.",
          "Tezhip süsleme sanatıdır; yükümlülük kavramı değildir.",
          "Dinî sorumluluğun muhatabı olan kişi mükellef olarak adlandırılır.",
        ],
        commonError:
          "Yükümlü kişiyle onun davranışlarına ilişkin hüküm listesini özdeşleştirmek.",
        check:
          "Kişi sözcüğü belirleyicidir; tanım doğrudan bir insanın sorumluluk statüsünü adlandırıyor.",
      },
    },
    {
      passage:
        "Bir açıklamada hac yükümlülüğünün ilgili imkân ve diğer şartlarla birlikte ele alındığı söyleniyor.",
      prompt: "Yalnız bu açıklamadan hangisi çıkarılamaz?",
      options: [
        "Hac, dinî yükümlülük bağlamında anılıyor.",
        "Her koşul aynı uygulamayı gerektirmeyebilir.",
        "Belirli kişinin durumu için ek veri gerekebilir.",
        "Bütün kişiler her koşulda aynı hac yükümlülüğüne sahiptir.",
        "Yükümlülükte ilgili koşullar önemlidir.",
      ],
      answer: 3,
      hint: "İmkân ve şart ifadesini koruyarak seçenekleri denetle.",
      explanation:
        "Açıklamada hac yükümlülüğü imkân ve diğer şartlarla birlikte kuruluyor. Bütün kişiler her koşulda ifadesi bu şartları kaldırır; bu yüzden pasajdan çıkarılamayan seçenek odur. Kontrol: Olumsuz kökte koşulu silen seçeneği ara; diğerleri şartı koruyor.",
      guidance: {
        knowledge: [
          "Şartlı yükümlülük, şartları silen koşulsuz genelleme vermez.",
        ],
        strategy: "İmkân ve şart ifadesini koruyarak seçenekleri denetle.",
        steps: [
          "Açıklamada hac yükümlülüğü imkân ve diğer şartlarla birlikte kuruluyor.",
          "Bütün kişiler her koşulda ifadesi bu şartları kaldırır; bu yüzden pasajdan çıkarılamayan seçenek odur.",
        ],
        optionReasons: [
          "Pasaj açıkça hac yükümlülüğünden söz ediyor; bu seçenek verilen bağlamı aynen korur.",
          "Şartlı anlatım koşulların önem taşıdığını açıklar.",
          "Kişi verisi yokken koşulların oluşması ayrıca bilinmelidir.",
          "Bu önerme açıklamanın getirdiği koşulları kaldırır; metinden çıkmaz.",
          "İmkân ve şartların anılması bunu doğrudan destekler.",
        ],
        commonError:
          "Liste başlığındaki bir ibadeti görüp kişisel koşulları gereksiz saymak.",
        check:
          "Olumsuz kökte koşulu silen seçeneği ara; diğerleri şartı koruyor.",
      },
    },
    {
      passage:
        "Bir kaynak, belirli şartları taşıyan her yükümlünün kendi yerine getirmesi gereken farzı anlatıyor. Başkasının yapması onun yerine geçmiyor.",
      prompt: "Hangi hüküm türü açıklanıyor?",
      options: ["Mubah", "Mekruh", "Farzıkifaye", "Farzıayn", "Nafile"],
      answer: 3,
      hint: "Başkasının yapmasının sorumluluğu kaldırıp kaldırmadığına bak.",
      explanation:
        "Başkasının fiili yükümlü kişinin kendi sorumluluğunu bitirmiyor. Bu devam eden bireysel yükümlülük farzıaynla eşleşir; farzıkifayede yeterli grubun yapması diğerlerinden sorumluluğu kaldırırdı. Kontrol: Başkasının yapması yerine geçmiyor ifadesi bireysel sorumluluğu gösterir.",
      guidance: {
        knowledge: [
          "Farzıayn bireysel; farzıkifaye ise yeterli grubun yapmasıyla diğerlerinden düşen ortak sorumluluktur.",
        ],
        strategy:
          "Başkasının yapmasının sorumluluğu kaldırıp kaldırmadığına bak.",
        steps: [
          "Başkasının fiili yükümlü kişinin kendi sorumluluğunu bitirmiyor.",
          "Bu devam eden bireysel yükümlülük farzıaynla eşleşir; farzıkifayede yeterli grubun yapması diğerlerinden sorumluluğu kaldırırdı.",
        ],
        optionReasons: [
          "Mubah serbestlik alanıdır; bağlayıcı bireysel yükümlülük değildir.",
          "Mekruh kaçınılması istenen davranış türüdür; bu tanım değildir.",
          "Bu türde yeterli grubun yerine getirmesiyle diğerlerinden sorumluluk düşebilir; pasaj bunu dışlıyor.",
          "Her yükümlünün bizzat yerine getirmesi vurgusu farzıaynın ayırıcı koşuludur.",
          "Nafile zorunlu olmayan ibadettir; burada kesin görev anlatılıyor.",
        ],
        commonError:
          "Farzıayn ile farzıkifayeyi yalnız ikisinde de farz kelimesi var diye aynı saymak.",
        check:
          "Başkasının yapması yerine geçmiyor ifadesi bireysel sorumluluğu gösterir.",
      },
    },
    {
      passage:
        "Özgün örnekte, cenaze namazı gerekli biçimde bir grup tarafından yerine getiriliyor. Ders, bunun ardından diğerlerinden ilgili ortak sorumluluğun kalktığını anlatıyor.",
      prompt: "Hangi kavram bu yapıyı karşılar?",
      options: ["Farzıayn", "Farzıkifaye", "Riya", "Tevhit", "İkrar"],
      answer: 1,
      hint: "Görevin tamamlanmasının diğer kişiler üzerindeki etkisini izle.",
      explanation:
        "Cenaze görevinin gerekli biçimde bir grupça yapıldığı veriliyor. Bunun diğer kişiler üzerindeki ortak sorumluluğu kaldırması farzıkifayenin ayırt edici koşuludur; sadece çok kişi bulunması belirleyici değildir. Kontrol: Ayıran koşul yalnız grup sayısı değil, iş yapıldığında diğerlerinden sorumluluğun kalkmasıdır.",
      guidance: {
        knowledge: [
          "Farzıkifayede gerekli iş yeterince yerine getirildiğinde diğerlerinden ortak sorumluluk kalkar.",
        ],
        strategy:
          "Görevin tamamlanmasının diğer kişiler üzerindeki etkisini izle.",
        steps: [
          "Cenaze görevinin gerekli biçimde bir grupça yapıldığı veriliyor.",
          "Bunun diğer kişiler üzerindeki ortak sorumluluğu kaldırması farzıkifayenin ayırt edici koşuludur; sadece çok kişi bulunması belirleyici değildir.",
        ],
        optionReasons: [
          "Farzıaynda her yükümlünün kendi sorumluluğu devam eder; buradaki topluluk etkisini karşılamaz.",
          "Bir grubun gerekli işi yapmasıyla diğerlerinin sorumluluğunun kalkması bu yapıdır.",
          "Gösteriş amacı verilmedi; ortak sorumluluk bilgisi niyet hükmü değildir.",
          "Tevhit Allah’ın birliği inancıdır; görev paylaşımını adlandırmaz.",
          "İkrar sözlü beyan boyutudur; ortak yükümlülük türü değildir.",
        ],
        commonError:
          "Topluluğun bir işi yapmasını sırf birden çok kişi var diye her durumda farzıkifaye sanmak.",
        check:
          "Ayıran koşul yalnız grup sayısı değil, iş yapıldığında diğerlerinden sorumluluğun kalkmasıdır.",
      },
    },
    {
      passage:
        "Hanefî terminolojisini kullanan bir ders, vitir ve fıtır sadakası örneklerini farzdan farklı delil derecesiyle bağlayıcı kabul edilen hüküm başlığında inceliyor.",
      prompt: "Bu başlık hangisidir?",
      options: ["Vacip", "Mubah", "Mabet", "Âdet", "Nafile"],
      answer: 0,
      hint: "Soruda belirtilen mezhep çerçevesini ve bağlayıcılığı birlikte tut.",
      explanation:
        "Önce dersin Hanefî terminolojisi kullandığını koru; bağlayıcılık ile farzdan farklı delil derecesi birlikte veriliyor. Vitir ve fıtır sadakası bu anlatımda vacip örnekleridir. Başka terminoloji varsayarak başlığı değiştirmeyiz. Kontrol: Cevap verilen Hanefî bağlamıyla sınırlıdır; metnin belirtmediği ekollere genelleme yapma.",
      guidance: {
        knowledge: [
          "Hanefî kullanımında vacip, farzdan ayrı ele alınabilen bağlayıcı hükümdür.",
        ],
        strategy:
          "Soruda belirtilen mezhep çerçevesini ve bağlayıcılığı birlikte tut.",
        steps: [
          "Önce dersin Hanefî terminolojisi kullandığını koru; bağlayıcılık ile farzdan farklı delil derecesi birlikte veriliyor.",
          "Vitir ve fıtır sadakası bu anlatımda vacip örnekleridir. Başka terminoloji varsayarak başlığı değiştirmeyiz.",
        ],
        optionReasons: [
          "Verilen Hanefî çerçevesi ve örnekler vacip başlığıyla eşleşir.",
          "Mubah serbestlik anlatır; belirtilen bağlayıcılığı karşılamaz.",
          "Mabet mekândır; hüküm derecesi değildir.",
          "Âdet toplumsal alışkanlıktır; Hanefî hüküm derecesinin adı değildir.",
          "Nafile isteğe bağlıdır; burada aynı serbestlik söylenmiyor.",
        ],
        commonError:
          "Vacibi bütün fıkıh ekollerinde aynı bağımsız kategori sanmak veya nafileyle eşitlemek.",
        check:
          "Cevap verilen Hanefî bağlamıyla sınırlıdır; metnin belirtmediği ekollere genelleme yapma.",
      },
    },
    {
      passage:
        "Bir paragrafta “Kur’an ve sünnet” denilerek dinî rehberlik kaynakları anılıyor. Başka bir listede “farz, vacip, sünnet” sıralamasıyla davranış dereceleri karşılaştırılıyor.",
      prompt: "Bu örnekler sünnet sözcüğü için neyi gösterir?",
      options: [
        "Kur’an’ın bir nafile ibadet çeşidi olduğunu",
        "Anlamın kaynak ilişkisi veya hüküm türü bağlamıyla belirlenmesi gerektiğini",
        "İki liste bulunduğundan bütün kaynakların geçersiz olduğunu",
        "Sünnetin her bağlamda sadece bina adı olduğunu",
        "Farzın daima isteğe bağlı olduğunu",
      ],
      answer: 1,
      hint: "Birinci ve ikinci kullanımın hangi sınıflama içinde olduğuna bak.",
      explanation:
        "Kur’an ve sünnet ifadesinde sünnet, rehberlik kaynağını adlandırıyor. Farz–vacip–sünnet dizisinde ise fiilin hüküm derecesi karşılaştırılıyor; sözcüğün hangi anlamı taşıdığı çevresindeki listeyle belirleniyor. Kontrol: Listelerde yan yana hangi sözcüklerin yer aldığı anlam eksenini açıklar.",
      guidance: {
        knowledge: [
          "Sünnet kaynak ve örneklik anlamıyla da, belirli hüküm türü anlamıyla da kullanılabilir.",
        ],
        strategy:
          "Birinci ve ikinci kullanımın hangi sınıflama içinde olduğuna bak.",
        steps: [
          "Kur’an ve sünnet ifadesinde sünnet, rehberlik kaynağını adlandırıyor.",
          "Farz–vacip–sünnet dizisinde ise fiilin hüküm derecesi karşılaştırılıyor; sözcüğün hangi anlamı taşıdığı çevresindeki listeyle belirleniyor.",
        ],
        optionReasons: [
          "Kaynağı uygulama derecesiyle karıştırır.",
          "İlk örnek kaynakları, ikincisi davranış hüküm derecelerini karşılaştırır.",
          "Sözcüğün farklı bağlamlarda kullanılması kaynakları geçersiz yapmaz.",
          "İki bağlamda da mekân sınıflaması yoktur.",
          "Bu önerme farzın bağlayıcılığına aykırıdır; pasajdan çıkmaz.",
        ],
        commonError:
          "Bir terimin tek bağlamdaki anlamını bütün kullanımlarına taşımak.",
        check:
          "Listelerde yan yana hangi sözcüklerin yer aldığı anlam eksenini açıklar.",
      },
    },
    {
      passage:
        "Ders, Hz. Peygamber’in sürdürdüğü ve nadiren terk ettiği belirli uygulamalarla bazen yaptığı bazen yapmadığı uygulamaları ayırıyor.",
      prompt: "Bu ayrım sırasıyla hangi terimlerle verilir?",
      options: [
        "Haram — farzıayn",
        "Mubah — ulûhiyet",
        "Sünnetimüekkede — sünneti gayrimüekkede",
        "Sünneti gayrimüekkede — sünnetimüekkede",
        "İkrar — mabet",
      ],
      answer: 2,
      hint: "İki cümledeki uygulama sürekliliğini karşılaştır.",
      explanation:
        "İlk grupta uygulamanın sürdürülüp nadiren terk edildiği söyleniyor; bu müekkede vurgusudur. İkinci grupta bazen yapılıp bazen bırakılması gayrimüekkede ayrımını verir. İstenen sıra bu iki gruba göre korunur. Kontrol: İlk tanım daha sürekli uygulamayı, ikinci tanım daha seyrek yapılanı anlatır.",
      guidance: {
        knowledge: [
          "Sünnetimüekkede süreklilik, gayrimüekkede daha değişken uygulama örnekleriyle açıklanır.",
        ],
        strategy: "İki cümledeki uygulama sürekliliğini karşılaştır.",
        steps: [
          "İlk grupta uygulamanın sürdürülüp nadiren terk edildiği söyleniyor; bu müekkede vurgusudur.",
          "İkinci grupta bazen yapılıp bazen bırakılması gayrimüekkede ayrımını verir. İstenen sıra bu iki gruba göre korunur.",
        ],
        optionReasons: [
          "Yasak ve bireysel farz ayrımı burada verilmedi.",
          "Biri hüküm, diğeri ilahlık boyutudur; iki uygulama türünü karşılamaz.",
          "İlk açıklama devamlılık ve nadir terk; ikincisi bazen yapma ve bırakma vurgusu taşır.",
          "Verilen sıranın iki terimini ters çevirir.",
          "Sözlü beyan ve mekân süreklilik derecesi değildir.",
        ],
        commonError:
          "İki türün sırasını süreklilik koşuluna bakmadan değiştirmek.",
        check:
          "İlk tanım daha sürekli uygulamayı, ikinci tanım daha seyrek yapılanı anlatır.",
      },
    },
    {
      passage:
        "Bir öğretim örneği kuşluk ve teheccüt gibi ek namazların yapılmasını teşvik ediyor, fakat bunları terk etmeyi bağlayıcı farzı terk etmekle bir tutmuyor.",
      prompt: "Hangi kavram grubu uygundur?",
      options: ["Haram", "Farzıayn", "Mendup / nafile", "Şirk", "Mekruh"],
      answer: 2,
      hint: "Teşvik ile zorunluluk derecesini ayır.",
      explanation:
        "Kuşluk ve teheccüt örnekleri teşvik edilen ek namazlar olarak verilmiş; farzla aynı terk sorumluluğu kurulmamış. Bu açıklama mendup/nafile grubuna uygundur; bağlayıcı farz veya kesin yasak hükmü verilmez. Kontrol: Bir davranış önerilebilir ve yine de farz düzeyinde zorunlu olmayabilir.",
      guidance: {
        knowledge: [
          "Mendup ve nafile, bağlayıcı olmaksızın istenen ek ibadetlerle ilişkilidir.",
        ],
        strategy: "Teşvik ile zorunluluk derecesini ayır.",
        steps: [
          "Kuşluk ve teheccüt örnekleri teşvik edilen ek namazlar olarak verilmiş; farzla aynı terk sorumluluğu kurulmamış.",
          "Bu açıklama mendup/nafile grubuna uygundur; bağlayıcı farz veya kesin yasak hükmü verilmez.",
        ],
        optionReasons: [
          "Yasaklanma değil teşvik anlatılıyor.",
          "Pasaj bu ekleri bağlayıcı bireysel farzdan açıkça ayırıyor.",
          "Ek uygulamanın teşvik edilmesi ve farz gibi bağlayıcı olmaması bu çerçeveye uyar.",
          "Allah’a ortak koşma konusu yoktur.",
          "Hoş karşılanmama değil teşvik anlatılıyor.",
        ],
        commonError:
          "Gönüllü ibadeti değersiz saymak veya teşvik edildiği için mutlaka farz sanmak.",
        check:
          "Bir davranış önerilebilir ve yine de farz düzeyinde zorunlu olmayabilir.",
      },
    },
    {
      passage:
        "Kaynak “Mükellefin yapıp yapmamakta serbest bırakıldığı fiil” tanımını veriyor.",
      prompt: "Tanımlanan hüküm hangisidir?",
      options: ["Vacip", "Farzıkifaye", "Farz", "Haram", "Mubah"],
      answer: 4,
      hint: "Tanımdaki serbest bırakılmayı bağlayıcı emirden ayır.",
      explanation:
        "Tanımda hem yapma hem yapmama konusunda serbestlik vardır. Bu iki yönlü izin mubahı gösterir; yalnız yapılması istenen veya bırakılması yasaklanan bir fiil tanımlanmıyor. Kontrol: Serbestlik hem yapma hem yapmama seçeneğini içerir; zorunlulukta bu durum yoktur.",
      guidance: {
        knowledge: [
          "Mubah dinî serbestlik alanını anlatır; zorunluluk veya yasak değildir.",
        ],
        strategy: "Tanımdaki serbest bırakılmayı bağlayıcı emirden ayır.",
        steps: [
          "Tanımda hem yapma hem yapmama konusunda serbestlik vardır.",
          "Bu iki yönlü izin mubahı gösterir; yalnız yapılması istenen veya bırakılması yasaklanan bir fiil tanımlanmıyor.",
        ],
        optionReasons: [
          "Verilen Hanefî hüküm bağlamında vacip bağlayıcılık taşır; mubahla aynı değildir.",
          "Farzıkifaye ortak yükümlülüktür; başlangıçta serbest davranış demek değildir.",
          "Farz yapılması bağlayıcı biçimde istenendir; serbestlik değildir.",
          "Haram yasak alanıdır; yapıp yapmama serbestliği değildir.",
          "Yapma veya yapmama serbestliği doğrudan mubah tanımıdır.",
        ],
        commonError:
          "Yasak olmayan bütün davranışları her durumda zorunlu saymak.",
        check:
          "Serbestlik hem yapma hem yapmama seçeneğini içerir; zorunlulukta bu durum yoktur.",
      },
    },
    {
      passage:
        "Bir tablo, yapılması kesin yasak olan davranışları bir başlıkta, yapılması hoş karşılanmayanları başka başlıkta topluyor.",
      prompt: "İki başlık sırasıyla hangisidir?",
      options: [
        "İkrar — tasdik",
        "Mekruh — haram",
        "Nafile — farz",
        "Mubah — mendup",
        "Haram — mekruh",
      ],
      answer: 4,
      hint: "Kesin yasak ile hoş karşılanmama ayrımını koru.",
      explanation:
        "İlk sütun kesin yasak koşuluyla kurulmuş; karşılığı haramdır. İkinci sütun hoş karşılanmama derecesini anlatır; karşılığı mekruhtur. Sırayı haram–mekruh diye koruruz. Kontrol: Her iki başlık kaçınma yönünde, ancak tanımlardaki bağlayıcılık dereceleri aynı değil.",
      guidance: {
        knowledge: [
          "Haram ve mekruh, kaçınılması istenen davranışlar tarafında farklı hüküm türleri olarak öğretilir.",
        ],
        strategy: "Kesin yasak ile hoş karşılanmama ayrımını koru.",
        steps: [
          "İlk sütun kesin yasak koşuluyla kurulmuş; karşılığı haramdır.",
          "İkinci sütun hoş karşılanmama derecesini anlatır; karşılığı mekruhtur. Sırayı haram–mekruh diye koruruz.",
        ],
        optionReasons: [
          "Sözlü bildirim ve iç onay hüküm türü değildir.",
          "Verilen tanımların sırası ters çevrilmiştir.",
          "Teşvik edilen ek davranış ve bağlayıcı emir, iki yasak başlığı değildir.",
          "Serbestlik ve teşvik, kaçınılması istenen iki sınıfı karşılamaz.",
          "İlk tanım kesin yasağı, ikincisi hoş karşılanmama derecesini karşılar.",
        ],
        commonError:
          "Mekruhu haramla bütünüyle özdeşleştirmek veya sırf haram değil diye önerilen davranış saymak.",
        check:
          "Her iki başlık kaçınma yönünde, ancak tanımlardaki bağlayıcılık dereceleri aynı değil.",
      },
    },
    {
      passage:
        "Bir topluluk ibadet duyurularını yeni bir iletişim aracıyla paylaşmaya başlıyor. Metin ibadetin temel kurallarında değişiklik yapıldığını söylemiyor.",
      prompt: "Bu veriden hangisi kesin çıkar?",
      options: [
        "Toplulukta hiç kimse öğrenemez.",
        "Bütün ibadet kuralları kaldırılmıştır.",
        "Yeni bir iman esası eklenmiştir.",
        "Duyuruda kullanılan araç değişmiştir.",
        "Her yenilik ibadetin kendisini değiştirmektir.",
      ],
      answer: 3,
      hint: "Değişen unsurun ne olduğunu açıkça adlandır.",
      explanation:
        "Metnin açık değişikliği, duyurunun yeni iletişim aracıyla paylaşılmasıdır. Temel ibadet kurallarının değiştiği belirtilmediğinden kesin sonucu yalnız araç değişimiyle sınırlarız. Kontrol: Cümlede değişen iletişim aracıdır; anahtar ayrım araç ile kuraldır.",
      guidance: {
        knowledge: ["İbadetin kuralı ile duyuru aracı farklı öğelerdir."],
        strategy: "Değişen unsurun ne olduğunu açıkça adlandır.",
        steps: [
          "Metnin açık değişikliği, duyurunun yeni iletişim aracıyla paylaşılmasıdır.",
          "Temel ibadet kurallarının değiştiği belirtilmediğinden kesin sonucu yalnız araç değişimiyle sınırlarız.",
        ],
        optionReasons: [
          "Öğrenme imkânının yokluğu hakkında veri verilmedi.",
          "Araç değişiminden bütün kuralların kalkması çıkmaz.",
          "İnanç listesine ilişkin veri yoktur.",
          "Açık verilen değişim iletişim aracındadır; ibadet kuralı hakkında ek veri yoktur.",
          "Araç ile ibadet yapısını özdeşleştiren genellemedir.",
        ],
        commonError:
          "Her araç yeniliğini ibadetin temel yapısında değişiklik sanmak.",
        check:
          "Cümlede değişen iletişim aracıdır; anahtar ayrım araç ile kuraldır.",
      },
    },
    {
      passage:
        "İki kişi aynı görünür yardım eylemini yapıyor. Metin yalnız birinin yardımı Allah rızası için yaptığını belirtiyor; ikincinin amacı verilmemiş.",
      prompt: "İki niyet hakkında nasıl bir sonuç kurulabilir?",
      options: [
        "İkinci kesin birinciyle aynı niyettedir.",
        "Birincinin bütün hayatındaki niyetler ölçülmüştür.",
        "İkisi de kesinlikle hiç yardım etmemiştir.",
        "İkinci kesin gösteriş için yapmıştır.",
        "Yalnız birinci kişi için açıklanmış dinî niyet bilgisi vardır.",
      ],
      answer: 4,
      hint: "Amaç cümlesinin hangi kişi için bulunduğunu belirle.",
      explanation:
        "İlk kişinin yardım için Allah rızasını gözettiği açıkça yazılıdır; bu niyet beyanını kullanabiliriz. İkinci kişinin amacı bilinmiyor. Aynı görünür eylem, onun niyetini birincininkiyle eşitlemeye veya gösteriş saymaya yetmez. Kontrol: İkinci kişi için bilinmiyor sonucunu koru; eksik veri, aksi kanıt değildir.",
      guidance: {
        knowledge: [
          "İhlas içten amaçla ilgilidir; aynı görünen eylem niyet bilgisini eşitlemez.",
        ],
        strategy: "Amaç cümlesinin hangi kişi için bulunduğunu belirle.",
        steps: [
          "İlk kişinin yardım için Allah rızasını gözettiği açıkça yazılıdır; bu niyet beyanını kullanabiliriz.",
          "İkinci kişinin amacı bilinmiyor. Aynı görünür eylem, onun niyetini birincininkiyle eşitlemeye veya gösteriş saymaya yetmez.",
        ],
        optionReasons: [
          "Aynı eylem, aynı niyeti zorunlu kılmaz.",
          "Tek olayla bütün hayatın iç amaçları ölçülmez.",
          "İki yardım eylemi açıkça verilmiştir.",
          "Amacın bilinmemesi gösterişin kanıtı değildir.",
          "Metin birincinin amacını verir, ikinciyi açık bırakır; ikinciye yeni niyet atamak gerekmez.",
        ],
        commonError:
          "Bilinmeyen niyeti olumsuz veya olumlu kesin hükümle doldurmak.",
        check:
          "İkinci kişi için bilinmiyor sonucunu koru; eksik veri, aksi kanıt değildir.",
      },
    },
    {
      passage:
        "Hazırlanmış bir örnekte kişi yardımını özellikle alkış toplamak amacıyla yaptığını söylüyor.",
      prompt: "Bu amaç ibadette hangi kavramla eleştirilir?",
      options: ["Farzıkifaye", "Riya", "Mabet", "İhlas", "Tezhip"],
      answer: 1,
      hint: "Bu örnekte görünenlik değil açıkça bildirilen amacı kullan.",
      explanation:
        "Kişi amacını özellikle alkış toplamak olarak açıklıyor; gösteriş çıkarımı burada dış görünüşten değil bu beyanından gelir. Allah rızası yerine başkalarının beğenisini hedefleme riya kavramıyla ilişkilendirilir. Kontrol: Niyete ilişkin sonuç için metindeki alkış toplamak amacı doğrudan dayanaktır.",
      guidance: {
        knowledge: [
          "Riya gösteriş amacıyla davranmayla ilişkilidir; sırf başkalarının görmesi tek başına aynı veri değildir.",
        ],
        strategy: "Bu örnekte görünenlik değil açıkça bildirilen amacı kullan.",
        steps: [
          "Kişi amacını özellikle alkış toplamak olarak açıklıyor; gösteriş çıkarımı burada dış görünüşten değil bu beyanından gelir.",
          "Allah rızası yerine başkalarının beğenisini hedefleme riya kavramıyla ilişkilendirilir.",
        ],
        optionReasons: [
          "Ortak yükümlülüğün kalkması hakkında veri yoktur.",
          "Alkış toplama amacı açıkça verildiği için gösteriş niyetiyle ilişki kurulabilir.",
          "Mabet mekândır; niyet türü değildir.",
          "İhlas bu bağlamda Allah rızasına içten yöneliştir; pasaj başka amaç bildiriyor.",
          "Tezhip kitap süsleme sanatıdır; davranış amacı değildir.",
        ],
        commonError:
          "Her görünür yardımı riya saymak; bu örnekte ise amacı bildiren gerçek cümleyi atlamak.",
        check:
          "Niyete ilişkin sonuç için metindeki alkış toplamak amacı doğrudan dayanaktır.",
      },
    },
    {
      passage:
        "Özgün metin: “Kişi yanlışını fark eder; pişmanlığını davranışını durdurma ve zararını düzeltmeye başlama kararıyla birleştirir.”",
      prompt: "Öne çıkan yöneliş hangisidir?",
      options: [
        "İsraf",
        "Tevhit",
        "Medeniyet",
        "Tövbe",
        "Mubahın zorunlu oluşu",
      ],
      answer: 3,
      hint: "Pişmanlık ile ardından gelen davranış değişikliğini birlikte oku.",
      explanation:
        "Metinde yalnız pişmanlık sözü yok; yanlış davranışı durdurma ve zararı düzeltme kararı da var. Pişmanlıkla yön değiştirmeyi birleştiren bu yapı tövbeyi öne çıkarır; yalnız bağışlanma talebi anlatılmış olsaydı istiğfar yönü belirgin olurdu. Kontrol: Metindeki durdurma ve düzeltmeye başlama fiilleri sonucu doğrular.",
      guidance: {
        knowledge: [
          "Tövbe yanlışından dönme ve düzeltmeye yönelmeyle ilişkilidir.",
        ],
        strategy:
          "Pişmanlık ile ardından gelen davranış değişikliğini birlikte oku.",
        steps: [
          "Metinde yalnız pişmanlık sözü yok; yanlış davranışı durdurma ve zararı düzeltme kararı da var.",
          "Pişmanlıkla yön değiştirmeyi birleştiren bu yapı tövbeyi öne çıkarır; yalnız bağışlanma talebi anlatılmış olsaydı istiğfar yönü belirgin olurdu.",
        ],
        optionReasons: [
          "Gereksiz kaynak tüketimi anlatılmıyor.",
          "Allah’ın birliği önermesi değil yanlışından dönüş anlatılıyor.",
          "Ortak tarihî birikim sorulmuyor.",
          "Yanlışı bırakıp düzeltmeye yönelmek, yalnız sözlü üzüntünün ötesinde tövbe çerçevesine uyar.",
          "Serbest bir fiilin zorunlu hâle gelmesi konusu yoktur.",
        ],
        commonError:
          "Sadece pişmanım sözünü görüp eylemi bırakma ve telafi boyutunu yok saymak.",
        check:
          "Metindeki durdurma ve düzeltmeye başlama fiilleri sonucu doğrular.",
      },
    },
    {
      passage:
        "Birr hakkında hazırlanmış metin, iman esaslarını, paylaşmayı, namaz ve zekâtı, sözü tutmayı ve güçlükte sabrı birlikte anıyor.",
      prompt: "Metnin kapsamını en iyi hangi sonuç korur?",
      options: [
        "Bütün ibadetler gereksiz sayılır.",
        "Erdem yalnız biçime indirgenmeyip iman, ibadet ve ahlakla birlikte ele alınır.",
        "Bütün insanlar aynı süre dua eder.",
        "Yalnız bir kişinin mesleği açıklanır.",
        "Yalnız dışa dönük hareket yeterlidir.",
      ],
      answer: 1,
      hint: "Verilen öğeleri inanç, uygulama ve ahlaki sorumluluk diye gruplandır.",
      explanation:
        "İman esaslarını inanç, namaz ve zekâtı ibadet, sözünde durma ve sabrı ahlak başlığında grupla. Metin bu üç boyutu birlikte anıyor; erdemi yalnız biçime veya tek bir alana daraltan seçenekler kapsamı eksiltir. Kontrol: Doğru sonuç listelenen üç alanı da kapsamalı; hiçbirini metinden silmemeli.",
      guidance: {
        knowledge: [
          "Birr öğretiminde iman, ibadet ve ahlak erdemleri birlikte ilişkilendirilir.",
        ],
        strategy:
          "Verilen öğeleri inanç, uygulama ve ahlaki sorumluluk diye gruplandır.",
        steps: [
          "İman esaslarını inanç, namaz ve zekâtı ibadet, sözünde durma ve sabrı ahlak başlığında grupla.",
          "Metin bu üç boyutu birlikte anıyor; erdemi yalnız biçime veya tek bir alana daraltan seçenekler kapsamı eksiltir.",
        ],
        optionReasons: [
          "Namaz ve zekâtın olumlu anılması ibadetlerin gereksiz sayılmasını desteklemez.",
          "Üç farklı alana ait açık öğeler aynı erdem çerçevesinde toplanır.",
          "Süre veya herkesin davranışı hakkında veri bulunmaz.",
          "Meslek bilgisi yoktur.",
          "İnanç, paylaşma ve sözü tutma gibi ek boyutlar bu daraltmaya aykırıdır.",
        ],
        commonError:
          "Şekilciliğin eleştirilmesinden bütün ibadetlerin reddedildiğini çıkarmak.",
        check:
          "Doğru sonuç listelenen üç alanı da kapsamalı; hiçbirini metinden silmemeli.",
      },
    },
  ],
  [
    {
      passage:
        "Bir öğrenci “Adalet genel bir ölçüttür; haksızlığa duyarlı olmak bir eğilimdir; ayrımcı kararı gerekçeyle eleştirmek ise belirli bir eylemdir.” diyor.",
      prompt: "Bu üç düzey hangi sırayla adlandırılır?",
      options: [
        "İlke — tutum — davranış",
        "Sonuç — ilke — niyet",
        "Mizaç — yapı — bölge",
        "Davranış — sonuç — mekân",
        "İkrar — nafile — haram",
      ],
      answer: 0,
      hint: "Genel kural, eğilim ve gerçekleşen fiili sırayla ayır.",
      explanation:
        "Adalet genel ölçüt olarak veriliyor; bu ilkedir. Haksızlığa duyarlılık ise eyleme yönelten tutumdur. Belirli ayrımcı kararı gerekçeyle eleştirmek somut davranıştır; sıra ilke–tutum–davranış olur. Kontrol: Her öğeyi kendi tanımındaki ölçüt, eğilim veya eylem kelimesiyle eşleştir.",
      guidance: {
        knowledge: [
          "İlke genel ölçüt, tutum eğilim, davranış somut eylem düzeyidir.",
        ],
        strategy: "Genel kural, eğilim ve gerçekleşen fiili sırayla ayır.",
        steps: [
          "Adalet genel ölçüt olarak veriliyor; bu ilkedir. Haksızlığa duyarlılık ise eyleme yönelten tutumdur.",
          "Belirli ayrımcı kararı gerekçeyle eleştirmek somut davranıştır; sıra ilke–tutum–davranış olur.",
        ],
        optionReasons: [
          "Üç açıklama sırasıyla ölçütü, eğilimi ve somut eylemi karşılar.",
          "Metindeki düzeyler bu sırayla verilmemiştir.",
          "Mekân veya coğrafya sınıflaması yapılmıyor.",
          "İlk öğe somut fiil, son öğe mekân değildir.",
          "Dinî beyan ve hüküm dereceleri bu üç genel düzeyi adlandırmaz.",
        ],
        commonError:
          "Genel değer adıyla o değeri gösteren tek davranışı aynı düzey saymak.",
        check:
          "Her öğeyi kendi tanımındaki ölçüt, eğilim veya eylem kelimesiyle eşleştir.",
      },
    },
    {
      passage:
        "Bir esnaf ürünün görünmeyen kusurunu alıcıya bildiriyor ve fiyat kararını bu bilgiyle vermesini sağlıyor.",
      prompt: "En doğrudan hangi tutum desteklenir?",
      options: ["Haset", "İsraf", "Riya", "Cimrilik", "Dürüstlük"],
      answer: 4,
      hint: "Esnafın somut olarak neyi saklamadığını belirle.",
      explanation:
        "Esnaf, alıcının görmediği kusuru saklamak yerine bildiriyor. Fiyat kararının gerçek bilgiye dayanmasını sağlaması dürüstlüğü doğrudan destekler; bu olaydan ürünün kusursuz olduğu sonucu çıkmaz. Kontrol: Kanıt kusurun bu olayda bildirilmesidir; yorumunu bu fiille sınırla.",
      guidance: {
        knowledge: [
          "Dürüstlük, gerekli doğru bilgiyi saklamamayı ve söz-davranış tutarlılığını içerir.",
        ],
        strategy: "Esnafın somut olarak neyi saklamadığını belirle.",
        steps: [
          "Esnaf, alıcının görmediği kusuru saklamak yerine bildiriyor.",
          "Fiyat kararının gerçek bilgiye dayanmasını sağlaması dürüstlüğü doğrudan destekler; bu olaydan ürünün kusursuz olduğu sonucu çıkmaz.",
        ],
        optionReasons: [
          "Başkasındaki iyi durumun yok olmasını isteme verilmedi.",
          "Gereksiz tüketim miktarı anlatılmıyor.",
          "Gösteriş niyeti açıkça bildirilmedi.",
          "Gerekli harcamadan kaçınma örneği verilmedi.",
          "Kusuru açıkça bildirmesi alıcının doğru bilgiyle karar vermesine yardım eder.",
        ],
        commonError:
          "Bir olumlu olaydan esnafın hayatındaki bütün davranışları hakkında kusursuzluk sonucu çıkarmak.",
        check:
          "Kanıt kusurun bu olayda bildirilmesidir; yorumunu bu fiille sınırla.",
      },
    },
    {
      passage:
        "Bir dernek giderlerini topluma açık raporluyor, fakat yardım alanların kimlik ve sağlık bilgilerini herkese yayımlamıyor.",
      prompt: "Bu iki davranış nasıl ilişkilendirilir?",
      options: [
        "Kimlik saklandığından hiç yardım yapılmamıştır.",
        "Şeffaflık için bütün özel bilgiler yayılmalıdır.",
        "Hesap verebilirlik ile mahremiyet birlikte gözetilir.",
        "Her bilgiyi gizlemek zorunludur.",
        "İki davranış da haset örneğidir.",
      ],
      answer: 2,
      hint: "Mali hesap ile kişisel bilgiyi ayrı başlıklarda ele al.",
      explanation:
        "Gider raporu ortak para kullanımına ilişkin hesap verme işlevi görüyor. Kimlik ve sağlık bilgileri ise kişisel alana ait. İki veri türüne farklı erişim uygulanması hesap verebilirlik ile mahremiyetin birlikte korunabildiğini gösterir. Kontrol: Bir bilgi türü mali gider, diğeri kişisel sağlık verisidir; aynı nesne hakkında zıt hüküm verilmiyor.",
      guidance: {
        knowledge: [
          "Hesap açıklığı ile mahremiyet farklı bilgi türlerine uygulanabilir.",
        ],
        strategy: "Mali hesap ile kişisel bilgiyi ayrı başlıklarda ele al.",
        steps: [
          "Gider raporu ortak para kullanımına ilişkin hesap verme işlevi görüyor.",
          "Kimlik ve sağlık bilgileri ise kişisel alana ait. İki veri türüne farklı erişim uygulanması hesap verebilirlik ile mahremiyetin birlikte korunabildiğini gösterir.",
        ],
        optionReasons: [
          "Kimliği korumak yardımın yapılmadığına kanıt değildir.",
          "Mali açıklık kişisel bilgilerin sınırsız ifşasını gerektirmez.",
          "Gider raporu hesap açıklığını, kişisel bilgilerin korunması mahremiyeti destekler.",
          "Giderler açık raporlandığı için bütün bilgiyi gizleme sonucu yoktur.",
          "Başkasının iyiliğinin yok olması istenmiyor.",
        ],
        commonError:
          "Açıklık ve gizliliği hangi bilgiye uygulandığına bakmadan çelişkili saymak.",
        check:
          "Bir bilgi türü mali gider, diğeri kişisel sağlık verisidir; aynı nesne hakkında zıt hüküm verilmiyor.",
      },
    },
    {
      passage:
        "Bir öğrenci zorlandığı konuyu çalışırken öfkeyle arkadaşını suçlamak yerine ara veriyor, yardım istiyor ve yanlış adımını düzelterek sürdürüyor.",
      prompt: "Bu örnek sabrı hangi yönüyle gösterir?",
      options: [
        "Her haksızlığa sessiz kalma zorunluluğu",
        "Gereksiz malzeme tüketimi",
        "Başkasının başarısını yok etmeyi isteme",
        "Öz denetim ve yapıcı çabayı sürdürme",
        "Bütün sorumluluğu bırakma",
      ],
      answer: 3,
      hint: "Bekleme süresinden çok zorluk karşısındaki eylem dizisine bak.",
      explanation:
        "Öğrenci güçlük karşısında arkadaşını suçlamak yerine ara verip yardım istiyor; bu öz denetimdir. Yanlış adımı düzeltip çalışmayı sürdürmesi sabrın yapıcı çaba yönünü gösterir; yalnız hiçbir şey yapmadan beklememiştir. Kontrol: Yardım isteme, düzeltme ve sürdürme üç somut yapıcı eylemdir.",
      guidance: {
        knowledge: [
          "Sabır dayanma yanında öfkeyi yönetme ve doğru eylemde kararlı kalma boyutu taşır.",
        ],
        strategy:
          "Bekleme süresinden çok zorluk karşısındaki eylem dizisine bak.",
        steps: [
          "Öğrenci güçlük karşısında arkadaşını suçlamak yerine ara verip yardım istiyor; bu öz denetimdir.",
          "Yanlış adımı düzeltip çalışmayı sürdürmesi sabrın yapıcı çaba yönünü gösterir; yalnız hiçbir şey yapmadan beklememiştir.",
        ],
        optionReasons: [
          "Örnekte böyle bir haksızlık ve zorunluluk verilmedi.",
          "Kaynak savurganlığı anlatılmıyor.",
          "Haset koşulu bulunmuyor.",
          "Öğrenci öfkesini yönetip yardım ve düzeltmeyle çalışmayı sürdürüyor.",
          "Çalışmayı sürdürdüğü için sorumluluğu bırakmıyor.",
        ],
        commonError: "Sabrı hiçbir eylemde bulunmadan beklemekle sınırlamak.",
        check: "Yardım isteme, düzeltme ve sürdürme üç somut yapıcı eylemdir.",
      },
    },
    {
      passage:
        "Bir gönüllü yalnız para vermek yerine bir öğrencinin ulaşım başvurusunu yapmasına bilgi desteği sağlıyor.",
      prompt: "Bu olay için hangi sonuç uygundur?",
      options: [
        "Para verilmediyse hiçbir destek yoktur.",
        "Başvuru desteği zorunlu olarak hasettir.",
        "Bilgi desteği de yardımseverlikle ilişkilendirilebilir.",
        "Yardımın tek ölçütü herkesin görmesidir.",
        "Bu kişi bütün gelecekteki başvuruları mutlaka çözer.",
      ],
      answer: 2,
      hint: "Desteğin para olup olmamasını tek ölçüt yapma; karşılanan ihtiyacı bul.",
      explanation:
        "Gönüllünün sağladığı şey para değil, ulaşım başvurusunu yapabilmek için bilgidir. Bir ihtiyacın karşılanmasına bu yolla katkı sunulduğu için yardımseverlik maddi bağışla sınırlı değildir. Kontrol: Somut ihtiyaç başvuru bilgisidir; destek bu ihtiyaca yönelmiştir.",
      guidance: {
        knowledge: [
          "Yardımseverlik maddi veya manevi destekle başkasının ihtiyacını gözetebilir.",
        ],
        strategy:
          "Desteğin para olup olmamasını tek ölçüt yapma; karşılanan ihtiyacı bul.",
        steps: [
          "Gönüllünün sağladığı şey para değil, ulaşım başvurusunu yapabilmek için bilgidir.",
          "Bir ihtiyacın karşılanmasına bu yolla katkı sunulduğu için yardımseverlik maddi bağışla sınırlı değildir.",
        ],
        optionReasons: [
          "Yardım yalnız para ile sınırlı değildir.",
          "Başkasının iyiliğinin kaybını isteme yoktur.",
          "Başvuru sürecine yardım, başkasının ihtiyacına yönelik somut destek sağlar.",
          "Görünürlük yardımın tek ölçütü değildir; niyet için ayrıca veri gerekir.",
          "Tek olay gelecek bütün sonuçları garanti etmez.",
        ],
        commonError:
          "Yardımın yalnız para verme olduğu şeklinde kapsamı daraltmak.",
        check:
          "Somut ihtiyaç başvuru bilgisidir; destek bu ihtiyaca yönelmiştir.",
      },
    },
    {
      passage:
        "Bir toplantıda katılımcı diğerinin sözünü bitirmesini bekliyor, itirazını kırıcı ifadeler kullanmadan açıklıyor.",
      prompt: "En doğrudan hangi kavram örneklenir?",
      options: ["Hac", "Haset", "Maddi miras", "İftira", "Adabımuaşeret"],
      answer: 4,
      hint: "Konuşma sırası ve ifade biçimine ilişkin iki fiili birlikte kullan.",
      explanation:
        "Katılımcı önce karşısındakinin sözünü bitirmesini bekliyor, sonra kırmadan itiraz ediyor. Konuşma sırası ve ilişki üslubuna ilişkin bu davranışlar adabımuaşeretle eşleşir; itiraz etmek nezaketi kendiliğinden ortadan kaldırmaz. Kontrol: Metindeki itirazın biçimi saygılıdır; saygı her görüşü onaylamak zorunda olmak değildir.",
      guidance: {
        knowledge: [
          "Adabımuaşeret insanlar arası ilişkilerde nezaket ve saygı kurallarıdır.",
        ],
        strategy:
          "Konuşma sırası ve ifade biçimine ilişkin iki fiili birlikte kullan.",
        steps: [
          "Katılımcı önce karşısındakinin sözünü bitirmesini bekliyor, sonra kırmadan itiraz ediyor.",
          "Konuşma sırası ve ilişki üslubuna ilişkin bu davranışlar adabımuaşeretle eşleşir; itiraz etmek nezaketi kendiliğinden ortadan kaldırmaz.",
        ],
        optionReasons: [
          "Belirli hac uygulaması anlatılmıyor.",
          "Başkasının iyiliğinin yok olması istenmiyor.",
          "Miras malı bilgisi yoktur.",
          "Asılsız suçlama verilmedi.",
          "Söz kesmemek ve kırmadan itiraz etmek saygılı iletişim örnekleridir.",
        ],
        commonError: "Farklı fikir söylemeyi mutlaka nezaketsizlik saymak.",
        check:
          "Metindeki itirazın biçimi saygılıdır; saygı her görüşü onaylamak zorunda olmak değildir.",
      },
    },
    {
      passage:
        "Özgün modelde A öğrencisinin 2, B öğrencisinin 6 saat destek ihtiyacı var. Ölçüt ihtiyaç kadar destek sağlamak; toplam 8 saat ayrılabiliyor.",
      prompt: "Bu ölçüte göre ihtiyaçları tam karşılayan dağılım hangisidir?",
      options: [
        "A: 2 saat, B: 6 saat",
        "A: 2 saat, B: 8 saat",
        "A: 4 saat, B: 4 saat",
        "A: 6 saat, B: 2 saat",
        "A: 8 saat, B: 0 saat",
      ],
      answer: 0,
      hint: "Önce her öğrencinin açığını, sonra toplam 8 saat kısıtını denetle.",
      explanation:
        "İhtiyaçlar 2 ve 6 saattir; toplamları 8 saatlik kaynağa eşittir. Tam karşılama için A’ya 2, B’ye 6 saat ayrılır. Her birinin aldığı destek kendi ihtiyacına eşit, toplam da 8 saattir. Kontrol: 2+6=8 ve her iki kişide kalan ihtiyaç sıfırdır; bu örnek bütün adalet sorunlarının evrensel formülü değildir.",
      guidance: {
        knowledge: [
          "İhtiyaç ölçütü belirtildiğinde dağıtım bu ihtiyaçlarla karşılaştırılır.",
        ],
        strategy:
          "Önce her öğrencinin açığını, sonra toplam 8 saat kısıtını denetle.",
        steps: [
          "İhtiyaçlar 2 ve 6 saattir; toplamları 8 saatlik kaynağa eşittir.",
          "Tam karşılama için A’ya 2, B’ye 6 saat ayrılır. Her birinin aldığı destek kendi ihtiyacına eşit, toplam da 8 saattir.",
        ],
        optionReasons: [
          "İki miktar da ayrı ihtiyacı tam karşılar ve toplam 8 saati aşmaz.",
          "Toplam 10 saat olduğu için verilen kaynak sınırını aşar.",
          "Toplam eşit olsa da B’nin 2 saat ihtiyacı açık kalırken A ihtiyacını aşar.",
          "İhtiyaçların yönünü ters çevirir; B’nin 4 saat açığı kalır.",
          "B’nin ihtiyacını hiç karşılamaz.",
        ],
        commonError:
          "Eşit toplam payı, soruda açıkça belirtilen ihtiyaç ölçütü yerine koymak.",
        check:
          "2+6=8 ve her iki kişide kalan ihtiyaç sıfırdır; bu örnek bütün adalet sorunlarının evrensel formülü değildir.",
      },
    },
    {
      passage:
        "İki öğrencinin de destek ihtiyacı 4 saattir. Aynı koşullardaki öğrencilere 4’er saat verilmiştir.",
      prompt: "Bu örnek hangi sonucu destekler?",
      options: [
        "Eşit paylaşım her koşulda yanlıştır.",
        "Adalet daima aynı mesleği seçmektir.",
        "İhtiyaçlar hiçbir zaman dikkate alınamaz.",
        "Eşit paylaşım bazı koşullarda ihtiyaç ölçütüyle de uyumlu olabilir.",
        "Toplam destek kesinlikle 4 saattir.",
      ],
      answer: 3,
      hint: "Bu kez ihtiyaçların birbirine eşit olduğunu gözden kaçırma.",
      explanation:
        "İki öğrencinin ihtiyacı aynı: 4’er saat. Verilen destek de her biri için 4 saattir. Bu olayda eşit paylaşım aynı zamanda ihtiyacı karşılar; bu nedenle eşit payın her koşulda ihtiyaç ölçütüne aykırı olduğu söylenemez. Kontrol: Bu somut durumda her ihtiyaç 4 ve her pay 4; koşul değişince sonucun neden değiştiğini açıkla.",
      guidance: {
        knowledge: [
          "Dağıtımı değerlendirirken verilen ölçüt ve koşullar birlikte önem taşır.",
        ],
        strategy: "Bu kez ihtiyaçların birbirine eşit olduğunu gözden kaçırma.",
        steps: [
          "İki öğrencinin ihtiyacı aynı: 4’er saat. Verilen destek de her biri için 4 saattir.",
          "Bu olayda eşit paylaşım aynı zamanda ihtiyacı karşılar; bu nedenle eşit payın her koşulda ihtiyaç ölçütüne aykırı olduğu söylenemez.",
        ],
        optionReasons: [
          "Bu örnek o genellemeye karşı durumdur.",
          "Meslek bilgisi yoktur; hak değerlendirmesiyle aynı değildir.",
          "Soruda ihtiyaç ölçütü açıkça kullanılıyor.",
          "İhtiyaçlar aynı olduğunda 4’er saat hem eşit hem ihtiyaca uygun olur.",
          "İki kişiye 4’er saat toplam 8 saattir.",
        ],
        commonError:
          "Eşitlik her durumda adalet değildir uyarısını eşitlik her durumda yanlıştır kuralına dönüştürmek.",
        check:
          "Bu somut durumda her ihtiyaç 4 ve her pay 4; koşul değişince sonucun neden değiştiğini açıkla.",
      },
    },
    {
      passage:
        "Bir öğrenci arkadaşının başarısından esinleniyor, benzer çalışma düzeni kurmak istiyor ve arkadaşının başarısının sürmesini diliyor.",
      prompt: "Bu tutum hangi kavramla daha uygundur?",
      options: ["Riya", "İsraf", "Gıpta", "İftira", "Haset"],
      answer: 2,
      hint: "Başkasındaki iyi durumun kaybolmasını isteyip istemediğini kontrol et.",
      explanation:
        "Öğrenci kendi çalışma düzenini geliştirmek istiyor ve arkadaşının başarısının sürmesini diliyor. Başkasının imkânını yok etmeyi istemeden benzer iyiliğe yönelme gıptadır; hasedi ayıran yok olma isteği verilmemiştir. Kontrol: Arkadaşının başarısının sürmesini dilemesi, yok olma isteğini açıkça dışlar.",
      guidance: {
        knowledge: [
          "Gıpta başkasının iyiliğinin yok olmasını istemeden benzer iyiliği kendisi için istemektir.",
        ],
        strategy:
          "Başkasındaki iyi durumun kaybolmasını isteyip istemediğini kontrol et.",
        steps: [
          "Öğrenci kendi çalışma düzenini geliştirmek istiyor ve arkadaşının başarısının sürmesini diliyor.",
          "Başkasının imkânını yok etmeyi istemeden benzer iyiliğe yönelme gıptadır; hasedi ayıran yok olma isteği verilmemiştir.",
        ],
        optionReasons: [
          "Gösteriş amacı açıkça verilmedi.",
          "Kaynak savurganlığı anlatılmıyor.",
          "Kendi gelişimini isterken arkadaşının başarısının sürmesini dilemesi gıpta koşulunu karşılar.",
          "Asılsız isnat yapılmıyor.",
          "Başkasının başarısının yok olmasını isteme koşulu bulunmuyor.",
        ],
        commonError: "Başkasının başarısını görmenin her türünü haset saymak.",
        check:
          "Arkadaşının başarısının sürmesini dilemesi, yok olma isteğini açıkça dışlar.",
      },
    },
    {
      passage:
        "Bir kişi başkasının başarısının sona ermesini istediğini açıkça söylüyor; kendi gelişimi için de bir çaba anlatılmıyor.",
      prompt: "Bu istek hangi kavramla ilişkilendirilir?",
      options: ["Şükür", "Emanete riayet", "Gıpta", "İhlas", "Haset"],
      answer: 4,
      hint: "Başarının paylaşılması mı yoksa ortadan kalkması mı istendiğini ayır.",
      explanation:
        "İstekte belirleyici öğe başkasının başarısının sona ermesidir. Kişinin kendi benzer gelişimini istemesinden farklı olan bu çekememezlik hasetle eşleşir. Kontrol: Diğer kişinin başarısının sona ermesi isteği açık; en yakın kavramı bu koşul ayırır.",
      guidance: {
        knowledge: [
          "Haset başkasındaki iyi durumun yok olmasını istemeyle ilişkilidir.",
        ],
        strategy:
          "Başarının paylaşılması mı yoksa ortadan kalkması mı istendiğini ayır.",
        steps: [
          "İstekte belirleyici öğe başkasının başarısının sona ermesidir.",
          "Kişinin kendi benzer gelişimini istemesinden farklı olan bu çekememezlik hasetle eşleşir.",
        ],
        optionReasons: [
          "Nimetin değerini bilip teşekkür etme konusu yoktur.",
          "Teslim edilen görev veya malın korunması verilmedi.",
          "Gıpta, başkasının iyiliğinin yok olmasını istemeyi içermez.",
          "Allah rızasına yönelen içten amaç anlatılmıyor.",
          "Diğer kişinin iyiliğinin sona ermesi isteği hasedin ayırıcı koşuludur.",
        ],
        commonError:
          "Gıpta ile hasedi ortak başarı sözcüğü nedeniyle eşitlemek.",
        check:
          "Diğer kişinin başarısının sona ermesi isteği açık; en yakın kavramı bu koşul ayırır.",
      },
    },
    {
      passage:
        "Bir öğrenci, doğru olmadığını bildiği suçlamayı bir arkadaşı hakkında yayıyor.",
      prompt: "Bu olayda hangi kavram en doğrudan karşılanır?",
      options: ["Mükellefiyet şartı", "Gıpta", "İftira", "Şecaat", "Tasarruf"],
      answer: 2,
      hint: "İddianın gerçek olmadığı bilgisini merkeze al.",
      explanation:
        "Öğrenci suçlamanın doğru olmadığını biliyor, buna rağmen onu bir kişiye yüklüyor. Asılsız kusur isnadı iftiradır; kişinin yokluğunda onda gerçekten bulunan bir kusurun konuşulması anlamındaki gıybetle aynı verilere dayanmaz. Kontrol: Asılsızlık açıkça verildiği için temel ayırıcı koşul yanlış suçlamadır.",
      guidance: {
        knowledge: ["İftira asılsız suçlama veya yanlış isnatla ilişkilidir."],
        strategy: "İddianın gerçek olmadığı bilgisini merkeze al.",
        steps: [
          "Öğrenci suçlamanın doğru olmadığını biliyor, buna rağmen onu bir kişiye yüklüyor.",
          "Asılsız kusur isnadı iftiradır; kişinin yokluğunda onda gerçekten bulunan bir kusurun konuşulması anlamındaki gıybetle aynı verilere dayanmaz.",
        ],
        optionReasons: [
          "Dinî yükümlülük koşulları incelenmiyor.",
          "Başkasındaki iyiliğe özenme anlatılmıyor.",
          "Bilerek yanlış suçlama yaymak asılsız isnat niteliği taşır.",
          "Doğruyu ölçülü cesaretle savunmak yerine asılsız suçlama var.",
          "Kaynak kullanım miktarı söz konusu değil.",
        ],
        commonError:
          "Yalan isnadı yalnız kişinin arkasından konuşma olarak adlandırıp doğruluk sorununu atlamak.",
        check:
          "Asılsızlık açıkça verildiği için temel ayırıcı koşul yanlış suçlamadır.",
      },
    },
    {
      passage:
        "Bir çalışan gerçek güvenlik sorununu, gerekli bilgileri aşmadan ilgili yetkiliye bildiriyor; ilgisiz kişilere yaymıyor.",
      prompt: "En dikkatli yorum hangisidir?",
      options: [
        "Güvenlik için hiçbir sorun bildirilemez.",
        "Her doğru bilgi herkese yayılmalıdır.",
        "Bu bildirim sırf başkasıyla ilgili olduğu için otomatik gıybet sayılamaz.",
        "Yetkiliye bildirim her zaman asılsız suçlamadır.",
        "Bildirim kişinin bütün hayatındaki niyeti ölçer.",
      ],
      answer: 2,
      hint: "Bilginin doğruluğunu, muhatabını ve paylaşım sınırını birlikte denetle.",
      explanation:
        "Bildirim gerçek güvenlik sorununa, ilgili yetkiliye ve gerekli bilgi miktarına sınırlandırılmış. Bu üç koşulu koruduğumuzda sırf başka kişiyle ilgili konuşulmasından otomatik gıybet sonucu çıkmaz; metin ilgisiz yayma eylemini de dışlıyor. Kontrol: İlgili yetkili, doğru bilgi ve gereken sınır üç ayrı koşul olarak sağlanmış.",
      guidance: {
        knowledge: [
          "Hak arama ve zararı önleme amaçlı ölçülü bildirim, amaçsız kötülemeyle aynı değildir.",
        ],
        strategy:
          "Bilginin doğruluğunu, muhatabını ve paylaşım sınırını birlikte denetle.",
        steps: [
          "Bildirim gerçek güvenlik sorununa, ilgili yetkiliye ve gerekli bilgi miktarına sınırlandırılmış.",
          "Bu üç koşulu koruduğumuzda sırf başka kişiyle ilgili konuşulmasından otomatik gıybet sonucu çıkmaz; metin ilgisiz yayma eylemini de dışlıyor.",
        ],
        optionReasons: [
          "Bu ifade zararı önleme ve hak arama imkânını kanıtsız kaldırır.",
          "Doğruluk gereksiz ve sınırsız ifşayı zorunlu kılmaz.",
          "Doğru ve gerekli bilgi uygun yetkiliye sınırlı veriliyor; amaçsız ifşa koşulları aynı değildir.",
          "Sorunun gerçek olduğu verildi; iftira koşulu yoktur.",
          "Bir olaydan bütün yaşamın niyeti çıkarılamaz.",
        ],
        commonError:
          "Gerekli yetkili bildirimini her koşulda amaçsız dedikoduyla özdeşleştirmek.",
        check:
          "İlgili yetkili, doğru bilgi ve gereken sınır üç ayrı koşul olarak sağlanmış.",
      },
    },
    {
      passage:
        "Bir kurum kullanılmayan odanın ışığını kapatıyor; aynı zamanda güvenli çalışma için gerekli aydınlatmayı açık tutuyor.",
      prompt: "Hangi tutum en doğrudan örneklenir?",
      options: [
        "Ölçülü kaynak kullanımı",
        "Her türlü tüketimin yasaklanması",
        "Cimrilik",
        "Kaynakların sonsuz olduğu kabulü",
        "Haset",
      ],
      answer: 0,
      hint: "Gereksiz kullanımın azalmasıyla gerekli kullanımın sürmesini birlikte oku.",
      explanation:
        "Kullanılmayan odanın gereksiz tüketimi azaltılırken güvenli çalışma için gerekli ışık korunuyor. Hem kaybı azaltma hem ihtiyacı karşılama bulunduğundan olay ölçülü kaynak kullanımını destekler. Kontrol: Kullanılmayan oda ve güvenli çalışma alanı farklı ihtiyaç koşulları taşıyor.",
      guidance: {
        knowledge: [
          "Tasarruf gereksiz tüketimi azaltırken gerçek ihtiyacı korur.",
        ],
        strategy:
          "Gereksiz kullanımın azalmasıyla gerekli kullanımın sürmesini birlikte oku.",
        steps: [
          "Kullanılmayan odanın gereksiz tüketimi azaltılırken güvenli çalışma için gerekli ışık korunuyor.",
          "Hem kaybı azaltma hem ihtiyacı karşılama bulunduğundan olay ölçülü kaynak kullanımını destekler.",
        ],
        optionReasons: [
          "Kurum fazlalığı azaltıyor fakat ihtiyaç olan aydınlatmayı kaldırmıyor.",
          "Gerekli ışık açık tutulduğu için tüketim bütünüyle bırakılmıyor.",
          "Gerekli harcamayı esirgeme değil gereksiz kullanımın azaltılması anlatılıyor.",
          "Aksine kaynağın amaçlı kullanımına dikkat ediliyor; sonsuzluk bilgisi yok.",
          "Başkasının iyiliğinin yok olması istenmiyor.",
        ],
        commonError:
          "Az tüketmekle her gerekli kullanımı kaldırmayı aynı şey sanmak.",
        check:
          "Kullanılmayan oda ve güvenli çalışma alanı farklı ihtiyaç koşulları taşıyor.",
      },
    },
    {
      passage:
        "Bir yönetici masrafı azaltmak için zorunlu güvenlik malzemesini almıyor. Pasaj bunun çalışanların güvenliğini ihlal ettiğini bildiriyor.",
      prompt:
        "Bu kararı sırf harcama azaldı diye olumlu tasarruf saymak neden hatalıdır?",
      options: [
        "Güvenlik giderlerinin kurum bütçesini hiçbir koşulda etkilemediği için.",
        "İki tarafın aynı mesleği seçmesini ister.",
        "Her harcamanın mutlaka israf olduğunu kanıtlar.",
        "Gerekli ihtiyacın ve çalışan hakkının ihmal edildiğini görmezden gelir.",
        "İsrafın yalnız sözle yapıldığını gösterir.",
      ],
      answer: 3,
      hint: "Azalan parayı değil, karşılanmayan gerekli yükümlülüğü de kontrol et.",
      explanation:
        "Harcama azalsa da zorunlu güvenlik malzemesi alınmıyor; pasaj bunun çalışan güvenliğini ihlal ettiğini bildiriyor. Sadece parasal azalmayı iyi saymak, açık verilen ihtiyaç ve hak ihlalini atlar. Bu nedenle karar olumlu tasarruf diye savunulamaz. Kontrol: Zorunlu malzeme ve açık güvenlik ihlali, bu olayda az harcamanın yeterli iyi ölçüt olmadığını gösterir.",
      guidance: {
        knowledge: [
          "Ölçülü kullanım ihtiyaç ve hak koşullarını da gözetir; en az harcama tek ölçüt değildir.",
        ],
        strategy:
          "Azalan parayı değil, karşılanmayan gerekli yükümlülüğü de kontrol et.",
        steps: [
          "Harcama azalsa da zorunlu güvenlik malzemesi alınmıyor; pasaj bunun çalışan güvenliğini ihlal ettiğini bildiriyor.",
          "Sadece parasal azalmayı iyi saymak, açık verilen ihtiyaç ve hak ihlalini atlar. Bu nedenle karar olumlu tasarruf diye savunulamaz.",
        ],
        optionReasons: [
          "Metin güvenlik giderlerinin bütçeye hiç etkisi olmadığını söylemiyor; verilen sorun çalışanların güvenliğinin ihlalidir.",
          "Meslek seçimi kararın konusu değildir.",
          "Gerekli harcama ile gereksiz harcama aynı değildir.",
          "Güvenlik malzemesi zorunlu ve ihlal açıkça verilmiş; yalnız miktar hesabı bunu açıklamaz.",
          "Pasaj böyle bir tanım vermiyor.",
        ],
        commonError:
          "Tasarrufu yalnız bütçe küçülmesiyle ölçüp ihtiyaç ve güvenliği dışarıda bırakmak.",
        check:
          "Zorunlu malzeme ve açık güvenlik ihlali, bu olayda az harcamanın yeterli iyi ölçüt olmadığını gösterir.",
      },
    },
    {
      passage:
        "Özgün örnekte kişi bir haksızlığı verilerle fark ediyor, tehdit savurmadan uygun yoldan itiraz ediyor ve çözüm öneriyor.",
      prompt: "Hangi yorum ölçülü cesareti doğru açıklar?",
      options: [
        "Hakkı savunan, gerekçeli ve ölçülü bir itiraz vardır.",
        "Sakin itiraz hiçbir zaman cesaret gösteremez.",
        "Cesaret için mutlaka düşünmeden tehlikeye atılmak gerekir.",
        "İtiraz eden herkesin bütün niyetleri bellidir.",
        "Veri kullanmak her durumda hasettir.",
      ],
      answer: 0,
      hint: "İtirazın amacını ve yöntemini birlikte ele al.",
      explanation:
        "Kişi haksızlığı veriye dayanarak fark ediyor ve uygun yoldan itiraz ediyor. Tehdit yerine çözüm önerisinin bulunması cesaretin ölçülü ve hak gözeten biçimini gösterir; kontrolsüz saldırganlık verilmemiştir. Kontrol: Gerekçe, hak ve uygun yolun üçü de metinde var; tehlikeye düşüncesizce atılma yok.",
      guidance: {
        knowledge: [
          "Şecaat doğruyu ve hakkı savunurken ölçülü davranma cesaretidir.",
        ],
        strategy: "İtirazın amacını ve yöntemini birlikte ele al.",
        steps: [
          "Kişi haksızlığı veriye dayanarak fark ediyor ve uygun yoldan itiraz ediyor.",
          "Tehdit yerine çözüm önerisinin bulunması cesaretin ölçülü ve hak gözeten biçimini gösterir; kontrolsüz saldırganlık verilmemiştir.",
        ],
        optionReasons: [
          "Haksızlığı düzeltme amacı ile tehditsiz uygun yol birlikte şecaat bağını destekler.",
          "Baskıya karşı sakin ve doğruyu savunan eylem cesaretle bağdaşabilir.",
          "Ölçüsüz risk, şecaatin yeterli koşulu değildir.",
          "Pasaj bütün iç amaçları ve yaşamı ölçmez.",
          "Başkasının iyiliğinin yok olması isteği yoktur.",
        ],
        commonError:
          "Cesareti saldırganlıkla veya korku yokluğuyla zorunlu eşitlemek.",
        check:
          "Gerekçe, hak ve uygun yolun üçü de metinde var; tehlikeye düşüncesizce atılma yok.",
      },
    },
    {
      passage: "Bir öğrencinin tek bir olayda emaneti koruduğu biliniyor.",
      prompt: "Bu veriden hangisi çıkarılamaz?",
      options: [
        "Daha geniş kişilik değerlendirmesi için ek veri gerektiği",
        "Yaşamı boyunca hiçbir sorumluluğu ihmal etmeyeceği",
        "Emanet sorumluluğuna bu olayda uygun davranıldığı",
        "Olayın güvenilirlikle ilişkilendirilebildiği",
        "Bu olayda emaneti koruduğu",
      ],
      answer: 1,
      hint: "Cümlenin tek olay kapsamıyla seçeneklerin zaman kapsamını karşılaştır.",
      explanation:
        "Bilinen kanıt tek bir olayda emaneti korumakla sınırlıdır. Yaşamı boyunca hiçbir görev aksatmayacağı bütün geleceğe uzanan iddiadır; tek olay bu geniş sonucu desteklemez. Kontrol: Doğru seçeneğin yaşamı boyunca kapsamı, tek olaylık kanıtın dışına taşar.",
      guidance: {
        knowledge: [
          "Bir olayın kanıtı kişinin gelecekteki bütün davranışlarına yayılmaz.",
        ],
        strategy:
          "Cümlenin tek olay kapsamıyla seçeneklerin zaman kapsamını karşılaştır.",
        steps: [
          "Bilinen kanıt tek bir olayda emaneti korumakla sınırlıdır.",
          "Yaşamı boyunca hiçbir görev aksatmayacağı bütün geleceğe uzanan iddiadır; tek olay bu geniş sonucu desteklemez.",
        ],
        optionReasons: [
          "Tek olayın sınırlılığı daha geniş yargıda ek veriyi gerekli kılar.",
          "Tek gözlemden bütün gelecek hakkında kesin yargı çıkarılamaz.",
          "Yorum açıkça sadece verilen olayla sınırlıdır.",
          "Emanetin korunması güvenilirlik için bu olaya ilişkin kanıttır.",
          "Bu fiil doğrudan verilmiştir.",
        ],
        commonError:
          "Bir olumlu fiilden değişmez ve ömür boyu kusursuz karakter sonucu çıkarmak.",
        check:
          "Doğru seçeneğin yaşamı boyunca kapsamı, tek olaylık kanıtın dışına taşar.",
      },
    },
  ],
  [
    {
      passage:
        "Tarihî bir el yazması hem kâğıt ve mürekkep olarak korunuyor hem dil ve düşünce mirasının taşıyıcısı sayılıyor.",
      prompt: "Bu eserin değer yönleri nasıl sınıflandırılır?",
      options: [
        "Yalnız maddidir; anlam taşıyamaz.",
        "Hem maddi hem manevi yön taşır.",
        "Maddi ve manevi değerler her zaman birbirini dışlar.",
        "Yalnız manevidir; fiziksel taşıyıcı yoktur.",
        "Somut olduğu için kültürle hiçbir bağı yoktur.",
      ],
      answer: 1,
      hint: "Fiziksel taşıyıcıyı ve kültürel anlamı ayrı işaretle.",
      explanation:
        "Kâğıt ve mürekkep, eserin somut ve korunabilir maddi bileşenleridir. Dil ve düşünceyi sonraki kuşaklara taşıması manevi miras yönüdür. Pasaj ikisini birlikte verdiği için tek yönlü sınıflandırma eksik kalır. Kontrol: Doğru cevap hem somut taşıyıcıyı hem miras vurgusunu aynı anda açıklamalıdır.",
      guidance: {
        knowledge: [
          "Maddi nesne ile taşıdığı manevi anlam aynı eserde birlikte bulunabilir.",
        ],
        strategy: "Fiziksel taşıyıcıyı ve kültürel anlamı ayrı işaretle.",
        steps: [
          "Kâğıt ve mürekkep, eserin somut ve korunabilir maddi bileşenleridir.",
          "Dil ve düşünceyi sonraki kuşaklara taşıması manevi miras yönüdür. Pasaj ikisini birlikte verdiği için tek yönlü sınıflandırma eksik kalır.",
        ],
        optionReasons: [
          "Metinde dil ve düşünce mirası açıkça anıldığı için manevi yönü siler.",
          "Kâğıt ve mürekkep somut, dil ve düşünce mirası anlam boyutudur; ikisi birlikte verilmiştir.",
          "Bu örnek iki yönün aynı nesnede birlikte bulunabildiğini gösterir.",
          "Kâğıt ve mürekkep verisi fiziksel taşıyıcının bulunduğunu gösterir.",
          "Kültürün somut eserleri de olabilir; metnin miras vurgusuna aykırıdır.",
        ],
        commonError:
          "Maddi ve manevi sınıfları her durumda birbirini dışlayan iki kutu sanmak.",
        check:
          "Doğru cevap hem somut taşıyıcıyı hem miras vurgusunu aynı anda açıklamalıdır.",
      },
    },
    {
      passage:
        "Arda kalabalıkta az konuşuyor. Bir grup projesinde ise verdiği sözü zamanında yerine getiriyor.",
      prompt: "İki veri hangi düzeylerle daha yakından ilişkilidir?",
      options: [
        "İlki güvenilmezliğin, ikincisi sürekli kusursuzluğun kesin tanısıdır.",
        "İki veri de yalnız kişinin gelirini açıklar.",
        "İlki mizaç eğilimi, ikincisi o olaydaki ahlaki sorumluluk kanıtıdır.",
        "Sessizlik sözün tutulmadığını kesin kanıtlar.",
        "Konuşma biçimi ile ahlaki eylem her bağlamda aynı özelliktir.",
      ],
      answer: 2,
      hint: "Az konuşma ile sözü yerine getirmeyi ayrı fiiller olarak değerlendir.",
      explanation:
        "Arda’nın kalabalıkta az konuşması iletişim ve mizaç eğilimine ilişkin veridir. Sözünü zamanında yerine getirmesi bu olayın sorumluluk davranışıdır; ilk eğilimden ikincisi otomatik olarak türetilmez. Kontrol: Tek olayın kapsamını koru; birinci veriyle ikinci veriyi değiştirmeden açıklayabiliyor musun?",
      guidance: {
        knowledge: [
          "İletişim eğilimi mizaçla, sorumluluğa uygun somut eylem karakterin ahlaki yönüyle ilişkilendirilebilir.",
        ],
        strategy:
          "Az konuşma ile sözü yerine getirmeyi ayrı fiiller olarak değerlendir.",
        steps: [
          "Arda’nın kalabalıkta az konuşması iletişim ve mizaç eğilimine ilişkin veridir.",
          "Sözünü zamanında yerine getirmesi bu olayın sorumluluk davranışıdır; ilk eğilimden ikincisi otomatik olarak türetilmez.",
        ],
        optionReasons: [
          "İki veri de bu kadar geniş kişilik tanısı vermez.",
          "Gelir hakkında bilgi yoktur.",
          "Sessizlik iletişim eğilimidir; sözünü tutma ise verilen görevde güvenilir davranış gösterir.",
          "Pasaj sözün tutulduğunu açıkça verir; sessizlik bunun karşıtı değildir.",
          "Biri iletişim eğilimi, diğeri sorumluluk davranışıdır; özdeş değildir.",
        ],
        commonError:
          "Sessizlikten olumsuz karakter veya tek doğru davranıştan ömür boyu kusursuzluk çıkarmak.",
        check:
          "Tek olayın kapsamını koru; birinci veriyle ikinci veriyi değiştirmeden açıklayabiliyor musun?",
      },
    },
    {
      passage:
        "Hazırlanmış iki örnekte görev zamanında tamamlanmıştır. Birinde kişi sessiz, diğerinde konuşkandır.",
      prompt: "Yalnız konuşma biçimi değişince hangi sonuç korunur?",
      options: [
        "Her iki örnekte de verilen görev zamanında yapılmıştır.",
        "Konuşkan kişi hayatında hiç hata yapmaz.",
        "İki kişinin iç niyeti zorunlu olarak aynıdır.",
        "İletişim eğilimi bütün ahlaki davranışların kesin ölçüsüdür.",
        "Sessiz kişi kesinlikle görev yapmamıştır.",
      ],
      answer: 0,
      hint: "İki metinde değişmeyen fiili bul.",
      explanation:
        "İki örnekte ortak kalan bilgi, görevin zamanında tamamlanmış olmasıdır. Sessizlik yerine konuşkanlık konduğunda bu görev kaydı değişmediğinden, korunan sonuç ikisinde de görevin yapılmış olmasıdır. Kontrol: İki metindeki tamamlanmıştır cümlesi aynı kalıyor; sonuç bu ortak veriyi korumalıdır.",
      guidance: {
        knowledge: [
          "Göreve ilişkin aynı somut kanıt, iletişim biçimi farklı diye kendiliğinden kaybolmaz.",
        ],
        strategy: "İki metinde değişmeyen fiili bul.",
        steps: [
          "İki örnekte ortak kalan bilgi, görevin zamanında tamamlanmış olmasıdır.",
          "Sessizlik yerine konuşkanlık konduğunda bu görev kaydı değişmediğinden, korunan sonuç ikisinde de görevin yapılmış olmasıdır.",
        ],
        optionReasons: [
          "Ortak ve açık veri görevin tamamlanmasıdır; konuşma biçimi bunu değiştirmez.",
          "Tek görevden bütün yaşama genelleme yapılamaz.",
          "Aynı görev sonucu niyetlerin aynı olduğunu kanıtlamaz.",
          "Örnekler böyle bir belirlenim ilişkisi vermez.",
          "Bu, ilk örneğin açık fiiline aykırıdır.",
        ],
        commonError:
          "Değişen yüzey özelliğinin sabit tutulan görev kanıtını da değiştirdiğini varsaymak.",
        check:
          "İki metindeki tamamlanmıştır cümlesi aynı kalıyor; sonuç bu ortak veriyi korumalıdır.",
      },
    },
    {
      passage:
        "Bir paragraf, kişilik içinde mizaç, karakter, duygu, düşünce ve değerlerin birlikte yer aldığını söylüyor.",
      prompt: "Buna göre kişilik hakkında en uygun sonuç hangisidir?",
      options: [
        "Karakterle hiçbir bağlantısı yoktur.",
        "Yalnız fiziksel boy uzunluğudur.",
        "Bir olay kişinin bütün yönlerini eksiksiz ölçer.",
        "Yalnız tek bir iletişim eğilimine indirgenemez.",
        "Mizaç kişilikten bütünüyle ayrı ve ilgisizdir.",
      ],
      answer: 3,
      hint: "Parçalar ile onları kapsayan bütünü ayır.",
      explanation:
        "Kişilik listesinde iletişimden başka karakter, duygu, düşünce ve değerler de bulunuyor. Kişiliği tek bir iletişim eğilimine eşitleyen açıklama bu diğer bileşenleri dışarıda bırakır; bütün listeyi kapsayan yorumu seçeriz. Kontrol: Cevap listelenen duygu, düşünce ve değer boyutlarını da kapsamalıdır.",
      guidance: {
        knowledge: [
          "Kişilik ilişkili pek çok yönü kapsayan geniş bir bütündür.",
        ],
        strategy: "Parçalar ile onları kapsayan bütünü ayır.",
        steps: [
          "Kişilik listesinde iletişimden başka karakter, duygu, düşünce ve değerler de bulunuyor.",
          "Kişiliği tek bir iletişim eğilimine eşitleyen açıklama bu diğer bileşenleri dışarıda bırakır; bütün listeyi kapsayan yorumu seçeriz.",
        ],
        optionReasons: [
          "Karakter paragrafta kişilikle ilişkili yönlerden biri olarak veriliyor.",
          "Duygu, değer ve düşünce boyutlarını dışlar.",
          "Geniş kapsam tek olayın eksiksiz ölçüm olduğunu göstermez.",
          "Birden fazla boyut açıkça sayıldığı için kişilik sadece konuşkanlık gibi tek özelliğe eşitlenmez.",
          "Metin mizaçla kişilik arasında kapsam ilişkisi kuruyor.",
        ],
        commonError: "Bütünü tek bir özelliğe indirgemek.",
        check:
          "Cevap listelenen duygu, düşünce ve değer boyutlarını da kapsamalıdır.",
      },
    },
    {
      passage:
        "Bir genç ailesinde dürüstlük örneği görüyor, okulunda görev paylaşmayı öğreniyor ve arkadaşlarıyla kaynak kontrolü yapıyor.",
      prompt: "Bu metin değer aktarımı için hangisini destekler?",
      options: [
        "Birden çok ortamın etkisi birlikte anlatılmaktadır.",
        "Arkadaşlar varsa kişinin iradesi mutlaka yoktur.",
        "Okul bulunduğu için aile hiçbir rol oynamaz.",
        "Bu üç örnek bütün gençlerde aynı sonucu ölçmüştür.",
        "Yalnız aile etkisi vardır.",
      ],
      answer: 0,
      hint: "Aile, okul ve arkadaş fiillerini ayrı kanıtlara bağla.",
      explanation:
        "Ailede dürüstlük örneği, okulda görev paylaşımı, arkadaşlar arasında kaynak kontrolü ayrı ortamlardır. Pasaj üçünü de değer aktarımında rol oynar biçimde verdiğinden yalnız tek ortamın etkisi sonucu dar kalır. Kontrol: Sonuç üç ayrı çevreyi de açıklamalı ve tek kişi örneğini bütün topluma ölçüm diye taşımamalıdır.",
      guidance: {
        knowledge: [
          "Değerlerin öğrenilmesinde birden çok toplumsal çevre rol oynayabilir.",
        ],
        strategy: "Aile, okul ve arkadaş fiillerini ayrı kanıtlara bağla.",
        steps: [
          "Ailede dürüstlük örneği, okulda görev paylaşımı, arkadaşlar arasında kaynak kontrolü ayrı ortamlardır.",
          "Pasaj üçünü de değer aktarımında rol oynar biçimde verdiğinden yalnız tek ortamın etkisi sonucu dar kalır.",
        ],
        optionReasons: [
          "Üç ayrı çevrede farklı öğrenme örnekleri açıkça verilir.",
          "Etki, zorunlu iradesizlik anlamına gelmez.",
          "Ailede dürüstlük örneği metinde açıkça verilmiştir.",
          "Özgün bir vaka bütün gençlere ilişkin deneysel ölçüm değildir.",
          "Okul ve arkadaş ilişkisi verilerini dışlar.",
        ],
        commonError: "Bir etkenin varlığını diğer etkilerin yokluğu saymak.",
        check:
          "Sonuç üç ayrı çevreyi de açıklamalı ve tek kişi örneğini bütün topluma ölçüm diye taşımamalıdır.",
      },
    },
    {
      passage:
        "Bir törenin uzun zamandır tekrarlandığı biliniyor; dinî dayanağı hakkında başka bilgi verilmemiş.",
      prompt: "Yalnız bu veriden hangisi çıkmaz?",
      options: [
        "Törenin tekrar edilen bir uygulama olduğu",
        "Uygulamanın toplumsal alışkanlık yönü bulunduğu",
        "Törenin dinen zorunlu olduğu",
        "Dinî zorunluluk için ek dayanak aranması gerektiği",
        "Törenin yaşı ile dinî hükmünün ayrı sorular olduğu",
      ],
      answer: 2,
      hint: "Gelenek bilgisiyle dinî hüküm bilgisini ayır.",
      explanation:
        "Uzun süredir tekrar bilgisi, törenin yerleşmiş bir uygulama olduğunu gösterir. Dinî dayanak verilmediği için bu süreden zorunlu dinî hüküm çıkarılamaz; süre ile bağlayıcılık ayrı kanıt ister. Kontrol: Olumsuz kökte yalnız mevcut bilgiyi aşan zorunluluk yargısını ayır.",
      guidance: {
        knowledge: [
          "Âdetin eski ve yaygın olması dinî zorunluluğun tek başına delili değildir.",
        ],
        strategy: "Gelenek bilgisiyle dinî hüküm bilgisini ayır.",
        steps: [
          "Uzun süredir tekrar bilgisi, törenin yerleşmiş bir uygulama olduğunu gösterir.",
          "Dinî dayanak verilmediği için bu süreden zorunlu dinî hüküm çıkarılamaz; süre ile bağlayıcılık ayrı kanıt ister.",
        ],
        optionReasons: [
          "Bu doğrudan başlangıç verisidir.",
          "Tekrar ve devamlılık bu yönü destekler.",
          "Süreklilik bilgisi verilir; bağlayıcı dinî dayanak verilmez.",
          "İlgili dayanak verilmediğinden böyle bir hüküm için ek veri gerekir.",
          "İki bilgi türünün farklı olması çıkarım sınırını açıklar.",
        ],
        commonError:
          "Eskiden beri yapılıyor sözünü dinî zorunluluk kanıtı yerine koymak.",
        check:
          "Olumsuz kökte yalnız mevcut bilgiyi aşan zorunluluk yargısını ayır.",
      },
    },
    {
      passage:
        "Bir topluluk, insanlara zarar veren bir uygulamayı yalnız “atalarımız da yapardı” gerekçesiyle savunuyor.",
      prompt: "MEB’in değer ve gelenek ayrımına uygun eleştiri hangisidir?",
      options: [
        "Haklar ancak yeni geleneklerde gözetilebilir.",
        "Gelenek oluşu, zarar ve hak sorununu kendiliğinden haklı çıkarmaz.",
        "Yaygın olan her davranış zorunlu olarak doğrudur.",
        "Eski olan her şey kesinlikle zararlıdır.",
        "Bir davranışta zarar varsa onun hiçbir geçmişi olamaz.",
      ],
      answer: 1,
      hint: "Yaşını değil etkilediği hakkı ve zararı da ölçüt al.",
      explanation:
        "Savunmanın tek gerekçesi uygulamanın atalarca yapılmış olmasıdır; pasaj ayrıca zarar verdiğini bildiriyor. Geçmişte yapılmış olmak bu zararı ve hak sorununu ortadan kaldırmadığından gelenek gerekçesi tek başına yeterli savunma değildir. Kontrol: Doğru eleştiri tek örnekten bütün gelenekler hakkında karşıt bir genellemeye de kaçmamalıdır.",
      guidance: {
        knowledge: [
          "Bir uygulamanın geleneksel oluşu hak ve zarar koşullarını değerlendirme ihtiyacını ortadan kaldırmaz.",
        ],
        strategy: "Yaşını değil etkilediği hakkı ve zararı da ölçüt al.",
        steps: [
          "Savunmanın tek gerekçesi uygulamanın atalarca yapılmış olmasıdır; pasaj ayrıca zarar verdiğini bildiriyor.",
          "Geçmişte yapılmış olmak bu zararı ve hak sorununu ortadan kaldırmadığından gelenek gerekçesi tek başına yeterli savunma değildir.",
        ],
        optionReasons: [
          "Yenilik ile hak gözetme arasında böyle zorunlu bağ verilmedi.",
          "Süreklilik ile ahlaki uygunluk ayrı sorulardır; belirtilen zarar ayrıca değerlendirilir.",
          "Yaygınlık uygunluğun yeterli kanıtı değildir.",
          "Tek bir zararlı örnek bütün gelenekleri olumsuz yapmaz.",
          "Zarar ile geçmişte tekrarlanma birbirini dışlamaz.",
        ],
        commonError: "Geleneksel olmakla ahlaken uygun olmayı özdeşleştirmek.",
        check:
          "Doğru eleştiri tek örnekten bütün gelenekler hakkında karşıt bir genellemeye de kaçmamalıdır.",
      },
    },
    {
      passage:
        "Bir öğrenci arkadaş baskısına rağmen haksızlık gördüğü uygulamayı delille ve güvenli bir yoldan dile getiriyor.",
      prompt: "Hangi erdem özellikle vurgulanır?",
      options: ["Haset", "Maddi değer", "Riya", "İsraf", "Şecaat"],
      answer: 4,
      hint: "Baskı karşısındaki hak odaklı ve ölçülü tavrı bul.",
      explanation:
        "Öğrenci baskıya rağmen haksızlığı dile getiriyor; geri durmak yerine sorumluluk alıyor. Delil ve güvenli yol koşulları cesaretin ölçülü biçimini destekler; bu vurguyla şecaat öne çıkar. Kontrol: Hak, baskıya direnme ve ölçülü yol birlikte mevcut; amaçsız risk alma yoktur.",
      guidance: {
        knowledge: ["Şecaat, hakkı savunurken ölçülü cesaretle davranmadır."],
        strategy: "Baskı karşısındaki hak odaklı ve ölçülü tavrı bul.",
        steps: [
          "Öğrenci baskıya rağmen haksızlığı dile getiriyor; geri durmak yerine sorumluluk alıyor.",
          "Delil ve güvenli yol koşulları cesaretin ölçülü biçimini destekler; bu vurguyla şecaat öne çıkar.",
        ],
        optionReasons: [
          "Başkasındaki iyi durumun yok olması istenmiyor.",
          "Somut eser veya nesnenin korunması sorulmuyor.",
          "Gösteriş amacı açıkça bildirilmedi.",
          "Kaynak savurganlığı verilmedi.",
          "Baskıya rağmen uygun yoldan hakkı savunması ölçülü cesaretle ilişkilidir.",
        ],
        commonError:
          "Cesareti yalnız fiziki tehlike veya saldırganlık üzerinden tanımak.",
        check:
          "Hak, baskıya direnme ve ölçülü yol birlikte mevcut; amaçsız risk alma yoktur.",
      },
    },
    {
      passage:
        "Bir öğrenci öğrendiği verileri yalnız tekrarlamıyor; onların ne anlama geldiğini tartışıp uygun bir çözümde kullanıyor.",
      prompt: "Hikmetle kurulan ilişkiyi hangi ifade doğru açıklar?",
      options: [
        "Hikmet yalnız konuşma sesinin yüksekliğidir.",
        "Bütün yanlış olasılığı kesin sıfırlanmıştır.",
        "Bilgiye gerek kalmadığı kanıtlanır.",
        "Ezberlenen sözcük sayısı tek yeterli ölçüttür.",
        "Bilgiyi anlamlandırma ve yerinde kullanma vardır.",
      ],
      answer: 4,
      hint: "Bilgi miktarından çok bilginin kullanım biçimine odaklan.",
      explanation:
        "Öğrenci verileri aynen tekrarlamak yerine anlamlarını tartışıyor. Bu anlayışı uygun çözümde kullanması, hikmetin bilgiyi yerinde değerlendirme yönünü somutlaştırır. Kontrol: Doğru seçenek anlamlandırma ve çözümde kullanma fiillerini birlikte karşılar.",
      guidance: {
        knowledge: [
          "Hikmet, bilgiyi yerinde ve anlamlı biçimde düşünce ve eylemle ilişkilendirir.",
        ],
        strategy: "Bilgi miktarından çok bilginin kullanım biçimine odaklan.",
        steps: [
          "Öğrenci verileri aynen tekrarlamak yerine anlamlarını tartışıyor.",
          "Bu anlayışı uygun çözümde kullanması, hikmetin bilgiyi yerinde değerlendirme yönünü somutlaştırır.",
        ],
        optionReasons: [
          "Ses yüksekliği hikmet tanımı değildir.",
          "Yerinde kullanma örneği bütün gelecek kararların hatasızlığını garanti etmez.",
          "Bilgi çözümün dayanağıdır; gereksiz sayılmıyor.",
          "Pasaj kullanım ve anlamlandırma vurgusunu bunun ötesinde kurar.",
          "Öğrenci bilgiyi çözümle ilişkilendiriyor; sadece depolayıp tekrar etmiyor.",
        ],
        commonError:
          "Çok bilgi taşımayı bilginin yerinde kullanımının otomatik eş anlamlısı saymak.",
        check:
          "Doğru seçenek anlamlandırma ve çözümde kullanma fiillerini birlikte karşılar.",
      },
    },
    {
      passage:
        "Bir ders iffet kavramını konuşmada, harcamada ve bedensel isteklerde ölçülülük; onuru ve sınırları gözetme çerçevesinde açıklıyor.",
      prompt: "Bu açıklamayla hangisi uyuşmaz?",
      options: [
        "İffet yalnız kişinin kıyafetinden kesin olarak ölçülür.",
        "Harcama isteğini yönetme boyutu olabilir.",
        "Sınırları koruma ile bağlantı kurulabilir.",
        "Konuşmada ölçülülükle ilişkilendirilebilir.",
        "Onuru gözetme bu açıklamanın parçasıdır.",
      ],
      answer: 0,
      hint: "Seçeneğin kavramı tek dış belirtiye indirip indirmediğini denetle.",
      explanation:
        "Ders iffeti konuşma, harcama ve bedensel istekler olmak üzere birden fazla alanda açıklıyor. Yalnız kıyafetten kesin ölçüm iddiası hem bu alanları daraltır hem dış görünüşten ek kanıtsız yargı üretir; bu yüzden açıklamayla uyuşmaz. Kontrol: Olumsuz kökte metnin kapsamını kaldıran veya desteklemediği kesinlik ekleyen ifadeyi seç.",
      guidance: {
        knowledge: ["İffet verilen çerçevede geniş öz denetim alanını kapsar."],
        strategy:
          "Seçeneğin kavramı tek dış belirtiye indirip indirmediğini denetle.",
        steps: [
          "Ders iffeti konuşma, harcama ve bedensel istekler olmak üzere birden fazla alanda açıklıyor.",
          "Yalnız kıyafetten kesin ölçüm iddiası hem bu alanları daraltır hem dış görünüşten ek kanıtsız yargı üretir; bu yüzden açıklamayla uyuşmaz.",
        ],
        optionReasons: [
          "Tek dış görünüşe indirgeme konuşma, harcama ve irade boyutlarını siler; kesin kişi hükmü de çıkarılamaz.",
          "Harcama metinde sayılan alanlardan biridir.",
          "Sınırları gözetme tanımın içindedir.",
          "Konuşma açıkça kapsamda verilmiştir.",
          "Onur açıkça anılmıştır.",
        ],
        commonError:
          "Geniş erdemi tek görünüş özelliği ve kesin kişi yargısına daraltmak.",
        check:
          "Olumsuz kökte metnin kapsamını kaldıran veya desteklemediği kesinlik ekleyen ifadeyi seç.",
      },
    },
    {
      passage:
        "Bir komisyon benzer başvuruları aynı kuralla değerlendiriyor ve yakınlarına gerekçesiz ayrıcalık tanımıyor.",
      prompt: "Hangi değer en doğrudan gösterilir?",
      options: ["Gıybet", "İsraf", "Cimrilik", "Adalet", "Haset"],
      answer: 3,
      hint: "Yakınlık değil aynı kuralın uygulanması verisine bak.",
      explanation:
        "Komisyon benzer başvurulara aynı kuralı uyguluyor ve yakınlarına gerekçesiz ayrıcalık vermiyor. Kararı akrabalık yerine ortak hak ölçütüne bağlaması adaleti doğrudan gösterir. Kontrol: Benzer koşullar ve aynı ölçüt, burada kararın açık iki dayanağıdır.",
      guidance: {
        knowledge: [
          "Adalet tarafsız ve hakka uygun ölçütleri gerektirir; keyfî kayırmaya karşıdır.",
        ],
        strategy: "Yakınlık değil aynı kuralın uygulanması verisine bak.",
        steps: [
          "Komisyon benzer başvurulara aynı kuralı uyguluyor ve yakınlarına gerekçesiz ayrıcalık vermiyor.",
          "Kararı akrabalık yerine ortak hak ölçütüne bağlaması adaleti doğrudan gösterir.",
        ],
        optionReasons: [
          "Kişinin arkasından kötüleme anlatılmıyor.",
          "Savurganlık bilgisi yoktur.",
          "Gerekli harcamayı esirgeme verilmedi.",
          "Benzer koşullara aynı ölçüt uygulanması ve kayırmadan kaçınma adalet bağı taşır.",
          "Başkasının iyiliğinin kaybı istenmiyor.",
        ],
        commonError:
          "Akrabalık veya yakınlığın kendiliğinden ayrıcalık gerekçesi olduğunu kabul etmek.",
        check:
          "Benzer koşullar ve aynı ölçüt, burada kararın açık iki dayanağıdır.",
      },
    },
    {
      passage:
        "İsrâ 23–29 hakkında hazırlanan açıklama, anne babaya iyi davranmayı, ihtiyaç sahibini gözetmeyi ve israf ile cimrilikten kaçınmayı birlikte anıyor.",
      prompt: "Bu metin için hangi sonuç uygundur?",
      options: [
        "Yalnız aile dışındaki bütün sorumluluklar reddedilir.",
        "Hiç harcama yapmamak tek amaçtır.",
        "Her ihtiyaç aynı miktarda parayla karşılanır.",
        "Bütün gençlerin kişilik özellikleri ölçülmüştür.",
        "Aile, yardımlaşma ve harcamada denge birlikte ilişkilendirilir.",
      ],
      answer: 4,
      hint: "Her öğeyi ait olduğu ilişkiyle eşleştir; tek alana daraltma.",
      explanation:
        "Anne babaya iyi davranma aile ilişkisine, ihtiyaç sahibini gözetme yardımlaşmaya karşılık gelir. İsraf ve cimrilikten kaçınma harcamada dengeyi ekler. Uygun sonuç metnin bu üç alanını da korumalıdır. Kontrol: Aile, ihtiyaç ve ölçülü harcama verilerinin üçü de doğru sonucun içinde kalmalıdır.",
      guidance: {
        knowledge: [
          "Bir metinde aile ilişkileri ve kaynak sorumluluğu birlikte ele alınabilir.",
        ],
        strategy:
          "Her öğeyi ait olduğu ilişkiyle eşleştir; tek alana daraltma.",
        steps: [
          "Anne babaya iyi davranma aile ilişkisine, ihtiyaç sahibini gözetme yardımlaşmaya karşılık gelir.",
          "İsraf ve cimrilikten kaçınma harcamada dengeyi ekler. Uygun sonuç metnin bu üç alanını da korumalıdır.",
        ],
        optionReasons: [
          "İhtiyaç sahibini gözetme ve harcama dengesi verileri buna aykırıdır.",
          "Cimrilikten de kaçınma vurgusu hiç harcamama sonucunu desteklemez.",
          "Miktar veya bütün ihtiyaçların özdeşliği verilmedi.",
          "Ayet mesajı kişilik ölçümü değildir.",
          "Üç açık vurgu aynı sorumluluk çerçevesinde yer alır.",
        ],
        commonError:
          "Birden çok sorumluluk taşıyan metni tek alana indirgemek.",
        check:
          "Aile, ihtiyaç ve ölçülü harcama verilerinin üçü de doğru sonucun içinde kalmalıdır.",
      },
    },
    {
      passage:
        "Bir öğretmen, kişiye saygı göstermenin onun her davranışını onaylamakla aynı olmadığını anlatıyor. Öğrenci bir yanlış iddiaya kırmadan itiraz ediyor.",
      prompt: "Hangi sonuç desteklenir?",
      options: [
        "Farklı görüş varsa birlikte öğrenilemez.",
        "Saygı için bütün iddiaları doğru saymak gerekir.",
        "Her itiraz mutlaka hakarettir.",
        "Saygılı davranırken bir iddiaya katılmamak mümkündür.",
        "Kırmadan konuşan kişinin bütün niyetleri bilinir.",
      ],
      answer: 3,
      hint: "Kişiye yönelik tutumla iddiaya yönelik değerlendirmeyi ayır.",
      explanation:
        "Öğretmenin ölçütü saygı ile her davranışı onaylamayı ayırıyor. Öğrencinin kırmadan itirazı bu ayrımın somut örneği olduğundan saygı sürerken iddiaya katılmamak mümkündür. Kontrol: İtiraz edilen iddia ve gözetilen kişi onuru ayrı; metinde ikisi de korunmuş.",
      guidance: {
        knowledge: ["Saygı ile gerekçeli görüş ayrılığı birlikte bulunabilir."],
        strategy:
          "Kişiye yönelik tutumla iddiaya yönelik değerlendirmeyi ayır.",
        steps: [
          "Öğretmenin ölçütü saygı ile her davranışı onaylamayı ayırıyor.",
          "Öğrencinin kırmadan itirazı bu ayrımın somut örneği olduğundan saygı sürerken iddiaya katılmamak mümkündür.",
        ],
        optionReasons: [
          "Böyle bir imkânsızlık verilmedi.",
          "Kişiye saygı iddianın doğruluğuna zorunlu onay değildir.",
          "Metin itirazın kırıcı olmadığını açıkça bildiriyor.",
          "Örnekte kırmadan itiraz bu iki yönü birlikte gösterir.",
          "İletişim biçimi bütün iç amaçları ölçmez.",
        ],
        commonError:
          "Kişi ile düşünceyi tek nesne sayıp saygıyı zorunlu onaya çevirmek.",
        check:
          "İtiraz edilen iddia ve gözetilen kişi onuru ayrı; metinde ikisi de korunmuş.",
      },
    },
    {
      passage:
        "Bir öğrenci bir gün gönüllü yardım yaptı. Başka davranışları ve başka günleri hakkında veri yok.",
      prompt: "Bu veriden hangi değerlendirme güvenle yapılır?",
      options: [
        "O gün yardım davranışına ilişkin kanıt vardır.",
        "Hayatı boyunca hiç bencillik göstermez.",
        "Hiçbir arkadaşından etkilenmez.",
        "Gelecekte bütün görevlerini kesin tamamlar.",
        "Mizacı artık değişmez biçimde tanılanmıştır.",
      ],
      answer: 0,
      hint: "Yardım yapılan gün ile geniş yaşam iddialarının kapsamını ayır.",
      explanation:
        "Pasaj yalnız bir günde yapılan gönüllü yardımı kaydediyor. O günkü yardım için kanıt vardır; diğer günlere veya bütün kişiliğe uzanan sonuçlar için ek veri yoktur. Kontrol: Cevabı o gün kapsamıyla sınırladığında eldeki veri yeterli; diğerleri ek kanıt ister.",
      guidance: {
        knowledge: [
          "Tek olayın olumlu kanıtı, bütün karakter ve geleceği eksiksiz ölçmez.",
        ],
        strategy:
          "Yardım yapılan gün ile geniş yaşam iddialarının kapsamını ayır.",
        steps: [
          "Pasaj yalnız bir günde yapılan gönüllü yardımı kaydediyor.",
          "O günkü yardım için kanıt vardır; diğer günlere veya bütün kişiliğe uzanan sonuçlar için ek veri yoktur.",
        ],
        optionReasons: [
          "Açık verilen olayla sınırlı sonuç budur.",
          "Bütün yaşam için veri yoktur.",
          "Akran etkisinin yokluğu verilmedi.",
          "Gelecek görevlere ilişkin bilgi yoktur.",
          "Bir yardım olayı mizaç tanısı değildir.",
        ],
        commonError:
          "Tek olumlu davranıştan değişmez karakter ve bütün gelecek için kesinlik çıkarmak.",
        check:
          "Cevabı o gün kapsamıyla sınırladığında eldeki veri yeterli; diğerleri ek kanıt ister.",
      },
    },
  ],
  [
    {
      passage:
        "Bir paragraf, farklı toplumların dil, sanat, bilim ve kurum birikimlerinin etkileşerek ortak bir tarihî havza oluşturduğunu anlatıyor.",
      prompt: "Bu paragraf hangi kavramı özellikle öne çıkarır?",
      options: [
        "Yalnız tek ailenin alışkanlığı",
        "Güncel tek devletin zorunlu sınırı",
        "Medeniyet",
        "Tek bir kişinin mizacı",
        "Yalnız bir binanın maliyeti",
      ],
      answer: 2,
      hint: "Tek bir yerel âdetten daha geniş etkileşimin verildiğini belirle.",
      explanation:
        "Paragraf tek bir topluluğun eşyasını değil, toplumlar arasında etkileşen dil, sanat, bilim ve kurumları anlatıyor. Ortak tarihî havza vurgusu bu birikimlerin medeniyet düzeyinde ele alındığını gösterir. Kontrol: Cevap bilim, sanat ve kurumların toplumlar arası etkileşimini birlikte kapsamalıdır.",
      guidance: {
        knowledge: [
          "Medeniyet farklı toplumların tarihsel ortak birikimini kapsayan geniş bir kavramdır.",
        ],
        strategy:
          "Tek bir yerel âdetten daha geniş etkileşimin verildiğini belirle.",
        steps: [
          "Paragraf tek bir topluluğun eşyasını değil, toplumlar arasında etkileşen dil, sanat, bilim ve kurumları anlatıyor.",
          "Ortak tarihî havza vurgusu bu birikimlerin medeniyet düzeyinde ele alındığını gösterir.",
        ],
        optionReasons: [
          "Verilen kapsam farklı toplumlar ve kurumlar olduğu için bu daraltma yetersizdir.",
          "Ortak birikim güncel tek devlet sınırı demek değildir.",
          "Farklı toplumların bilim, sanat ve kurum etkileşimi daha geniş medeniyet birikimiyle eşleşir.",
          "Bireysel eğilim değil toplumsal tarihî birikim anlatılıyor.",
          "Maliyet bilgisi verilmedi; kapsam sadece bina da değildir.",
        ],
        commonError:
          "Medeniyet ortaklığını yerel tek âdet veya tek siyasi sınırla özdeşleştirmek.",
        check:
          "Cevap bilim, sanat ve kurumların toplumlar arası etkileşimini birlikte kapsamalıdır.",
      },
    },
    {
      passage:
        "Bir ders Mekke, Kudüs, Agra ve Granada’yı ortak tarihî ve kültürel bağlar bakımından birlikte ele alıyor.",
      prompt: "Bu birliktelikten hangisi çıkarılamaz?",
      options: [
        "Yer ve eser eşleştirmelerinin ayrıca öğrenilmesi gerektiği",
        "Farklı coğrafyalardaki örneklerin birlikte incelenebildiği",
        "Kültürel bağın şehir konumundan ayrı bir ilişki olduğu",
        "Medeniyet bağının birden fazla bölgede görülebildiği",
        "Bu şehirlerin günümüzde tek devletin sınırında bulunduğu",
      ],
      answer: 4,
      hint: "Kültürel bağ ile siyasi egemenliği ayrı bilgi türleri olarak değerlendir.",
      explanation:
        "Dört şehir ortak tarih ve kültür bağlarıyla bir araya getirilmiş; güncel yönetim sınırı verilmemiş. Kültürel bağdan tek devlet sonucu üretmek ayrı iki ilişkiyi eşitler. Bu nedenle günümüzde aynı devlet sınırındalar iddiası çıkarılamaz. Kontrol: Olumsuz kökte kültürel bilgiye yeni egemenlik koşulu ekleyen seçeneği ayır.",
      guidance: {
        knowledge: [
          "Gönül coğrafyası kültürel bağları anlatır; tek güncel devletin sınırlarıyla aynı değildir.",
        ],
        strategy:
          "Kültürel bağ ile siyasi egemenliği ayrı bilgi türleri olarak değerlendir.",
        steps: [
          "Dört şehir ortak tarih ve kültür bağlarıyla bir araya getirilmiş; güncel yönetim sınırı verilmemiş.",
          "Kültürel bağdan tek devlet sonucu üretmek ayrı iki ilişkiyi eşitler. Bu nedenle günümüzde aynı devlet sınırındalar iddiası çıkarılamaz.",
        ],
        optionReasons: [
          "Şehirlerin ortak başlıkta olması her eserin yerini otomatik vermez.",
          "Şehirlerin birlikte ele alınması bunu doğrudan gösterir.",
          "Aynı incelemede farklı konumlar ortak bağla ele alınmıştır.",
          "Verilen farklı şehirler bu kapsamı örnekler.",
          "Ortak kültürel inceleme güncel tek devlet bilgisi vermez.",
        ],
        commonError:
          "Ortak tarih ve değer bağından modern siyasi sınır birliği çıkarmak.",
        check:
          "Olumsuz kökte kültürel bilgiye yeni egemenlik koşulu ekleyen seçeneği ayır.",
      },
    },
    {
      passage:
        "Bir gezi grubu Kâbe ile Mescid-i Nebevî’yi bulundukları şehirlerde görmek istiyor.",
      prompt: "Doğru şehir sırası hangisidir?",
      options: [
        "Agra — Granada",
        "Kudüs — Bağdat",
        "Mekke — Medine",
        "Medine — Mekke",
        "Semerkant — Kahire",
      ],
      answer: 2,
      hint: "Her yapıyı önce kendi şehriyle eşleştir.",
      explanation:
        "İlk yapı Kâbe’dir ve Mekke’de bulunur. İkinci yapı Mescid-i Nebevî’dir ve Medine’dedir. Gezi listesindeki sırayı koruyunca Mekke–Medine çifti elde edilir. Kontrol: Kâbe–Mekke ve Nebevî–Medine bağlarını iki ayrı çift olarak kontrol et.",
      guidance: {
        knowledge: ["Kâbe Mekke’de, Mescid-i Nebevî Medine’dedir."],
        strategy: "Her yapıyı önce kendi şehriyle eşleştir.",
        steps: [
          "İlk yapı Kâbe’dir ve Mekke’de bulunur.",
          "İkinci yapı Mescid-i Nebevî’dir ve Medine’dedir. Gezi listesindeki sırayı koruyunca Mekke–Medine çifti elde edilir.",
        ],
        optionReasons: [
          "Bunlar başka mimari örneklerle ilişkili şehirlerdir.",
          "Kudüs ve Bağdat bu iki yapının şehirleri değildir.",
          "İki yapı kendi şehirleriyle verilen sırada eşleşir.",
          "İki şehrin yeri ters çevrilmiştir.",
          "Bu iki ilim merkezi verilen yapı eşleşmesini karşılamaz.",
        ],
        commonError:
          "Aynı Hicaz bölgesindeki şehirlerin bütün eserlerini aynı yerde sanmak.",
        check:
          "Kâbe–Mekke ve Nebevî–Medine bağlarını iki ayrı çift olarak kontrol et.",
      },
    },
    {
      passage:
        "Bir öğrenci Mescid-i Aksâ ile Mescid-i Nebevî’yi aynı kentte gösteriyor.",
      prompt: "Hangi düzeltme doğrudur?",
      options: [
        "Aksâ Mekke’de, Nebevî Kahire’dedir.",
        "İkisi de Granada’dadır.",
        "Aksâ Kudüs’te, Nebevî Medine’dedir.",
        "İkisi de Agra’dadır.",
        "Nebevî Bağdat’ta, Aksâ Semerkant’tadır.",
      ],
      answer: 2,
      hint: "Benzer adlara değil tam yapı adı ve şehir çiftine bak.",
      explanation:
        "Aksâ’nın kenti Kudüs, Nebevî’nin kenti Medine’dir. İki farklı yapı-kent eşleşmesi aynı şehir iddiasını düzeltir; ortak dinî bağ fiziksel konumu aynı yapmaz. Kontrol: Tam adın ikinci bölümünü ve karşılık gelen şehri birlikte hatırla.",
      guidance: {
        knowledge: [
          "Mescid-i Aksâ Kudüs’le, Mescid-i Nebevî Medine’yle ilişkilidir.",
        ],
        strategy: "Benzer adlara değil tam yapı adı ve şehir çiftine bak.",
        steps: [
          "Aksâ’nın kenti Kudüs, Nebevî’nin kenti Medine’dir.",
          "İki farklı yapı-kent eşleşmesi aynı şehir iddiasını düzeltir; ortak dinî bağ fiziksel konumu aynı yapmaz.",
        ],
        optionReasons: [
          "İki şehir eşleşmesi de verilen eserler için yanlıştır.",
          "Granada Elhamra ile ilişkilidir.",
          "İki yapı farklı şehirlerle doğru eşleştirilir.",
          "Agra Tac Mahal’le ilişkilidir; verilen iki yapının kenti değildir.",
          "Her iki eşleştirme de şehirleri yanlış yerleştirir.",
        ],
        commonError:
          "Mescid sözcüğünün ortaklığından bütün adların aynı yapıyı anlattığını çıkarmak.",
        check:
          "Tam adın ikinci bölümünü ve karşılık gelen şehri birlikte hatırla.",
      },
    },
    {
      passage:
        "Bir kaynak Bağdat’ı Abbasi döneminde tercüme ve ilim çalışmalarıyla, ayrıca Nizamiye medreseleriyle ilişkilendiriyor.",
      prompt:
        "Bu kapsamda tercüme ve bilgi çalışmalarının önemli merkezi hangisidir?",
      options: [
        "Tac Mahal",
        "Beytülhikme",
        "Mostar Köprüsü",
        "Elhamra Sarayı",
        "Selimiye Camii",
      ],
      answer: 1,
      hint: "Kurumun işleviyle şehrini birlikte kontrol et.",
      explanation:
        "İstenen işlev tercüme ve bilgi çalışmalarıdır; yalnız genel eğitim kurumu sorulmuyor. Bağdat’ta bu işlevle anılan Beytülhikme seçilir. Pasajda ayrıca Nizamiye bulunması iki kurumun aynı kurum olduğu anlamına gelmez. Kontrol: Doğru cevap hem Bağdat konumunu hem tercüme işlevini birlikte karşılamalıdır.",
      guidance: {
        knowledge: [
          "Beytülhikme Bağdat’ın ilim ve tercüme geleneğiyle ilişkilidir.",
        ],
        strategy: "Kurumun işleviyle şehrini birlikte kontrol et.",
        steps: [
          "İstenen işlev tercüme ve bilgi çalışmalarıdır; yalnız genel eğitim kurumu sorulmuyor.",
          "Bağdat’ta bu işlevle anılan Beytülhikme seçilir. Pasajda ayrıca Nizamiye bulunması iki kurumun aynı kurum olduğu anlamına gelmez.",
        ],
        optionReasons: [
          "Agra’daki yapıdır; tercüme kurumu değildir.",
          "Bağdat ve tercüme çalışmaları bu kurumla eşleşir.",
          "Balkanlardaki köprüdür; ilim akademisinin adı değildir.",
          "Elhamra Granada’daki mimari eserdir; Bağdat tercüme merkezi değildir.",
          "Edirne’deki camidir; burada istenen kurum değildir.",
        ],
        commonError:
          "Şehir, kurum ve işlevi tek başına benzer görünen eser adlarıyla karıştırmak.",
        check:
          "Doğru cevap hem Bağdat konumunu hem tercüme işlevini birlikte karşılamalıdır.",
      },
    },
    {
      passage:
        "Bir kitap Bağdat’ta başka dile çevrilmiş. İlk yazıldığı yer hakkında metinde bilgi yok.",
      prompt: "Hangi sonuç kanıtı aşar?",
      options: [
        "Kitap kesinlikle ilk kez Bağdat’ta yazılmıştır.",
        "Yazım ve çeviri iki farklı aşama olabilir.",
        "Kitap başka dile aktarılmıştır.",
        "İlk yazım yeri için ek bilgi gerekir.",
        "Bağdat’ta bir çeviri faaliyeti yapılmıştır.",
      ],
      answer: 0,
      hint: "Çevirinin yapıldığı yer ile ilk üretim yerini ayır.",
      explanation:
        "Bildiğimiz yer, kitabın çevrildiği Bağdat’tır; yazıldığı yer belirtilmemiştir. Çeviri yerini ilk yazım yeri saymak verilmeyen bir aşama ekler. Bu yüzden kesinlikle ilk Bağdat’ta yazıldı sonucu kanıtı aşar. Kontrol: Kesin ilk yer iddiasını destekleyen ayrı bir cümle verilmediğini kontrol et.",
      guidance: {
        knowledge: [
          "Tercüme yeri ile özgün yazım yeri aynı olmak zorunda değildir.",
        ],
        strategy: "Çevirinin yapıldığı yer ile ilk üretim yerini ayır.",
        steps: [
          "Bildiğimiz yer, kitabın çevrildiği Bağdat’tır; yazıldığı yer belirtilmemiştir.",
          "Çeviri yerini ilk yazım yeri saymak verilmeyen bir aşama ekler. Bu yüzden kesinlikle ilk Bağdat’ta yazıldı sonucu kanıtı aşar.",
        ],
        optionReasons: [
          "Çeviri yeri özgün yazım yerini kanıtlamaz; metin ilk yer hakkında sessizdir.",
          "Bir metin yazıldıktan sonra başka yerde çevrilebilir; veri buna aykırı değildir.",
          "Çevrilme bilgisi dil aktarımını açıkça içerir.",
          "İlk yer verilmediği için bu sınırlı değerlendirme uygundur.",
          "Bu doğrudan verilen bilgidir.",
        ],
        commonError:
          "Bir eserin kullanıldığı veya çevrildiği yeri ilk yazıldığı yer sanmak.",
        check:
          "Kesin ilk yer iddiasını destekleyen ayrı bir cümle verilmediğini kontrol et.",
      },
    },
    {
      passage:
        "Bir öğretim haritası Maveraünnehir’i Seyhun ve Ceyhun arasındaki tarihî bölge olarak tanıtıyor.",
      prompt: "Hangi ikili bu bölgenin önemli şehirleri arasında öğretilir?",
      options: [
        "Mekke — Medine",
        "Agra — Delhi",
        "Kahire — Kayrevan",
        "Buhara — Semerkant",
        "Granada — Kurtuba",
      ],
      answer: 3,
      hint: "Sorunun tarihî bölge istediğini, güncel tek devlet adı istemediğini koru.",
      explanation:
        "Harita Seyhun ve Ceyhun arasındaki Maveraünnehir’i soruyor. Buhara ile Semerkant bu tarihî bölgenin öğretilen kent çiftidir; farklı geniş havzalardan adları birlikte seçmek bölge koşulunu karşılamaz. Kontrol: Maveraünnehir için Seyhun–Ceyhun ve Buhara–Semerkant bağını birlikte kullan.",
      guidance: {
        knowledge: [
          "Buhara ve Semerkant Maveraünnehir’in tarihî merkezleridir.",
        ],
        strategy:
          "Sorunun tarihî bölge istediğini, güncel tek devlet adı istemediğini koru.",
        steps: [
          "Harita Seyhun ve Ceyhun arasındaki Maveraünnehir’i soruyor.",
          "Buhara ile Semerkant bu tarihî bölgenin öğretilen kent çiftidir; farklı geniş havzalardan adları birlikte seçmek bölge koşulunu karşılamaz.",
        ],
        optionReasons: [
          "Bu ikili Hicaz ile ilişkilidir.",
          "Bu ikili Hint Alt Kıtası bağlamında yer alır.",
          "Bu şehirler Mısır ve Kuzey Afrika bağlamındadır.",
          "Bu iki ayrı şehir Maveraünnehir ile ilişkilidir.",
          "Bu şehirler Endülüs bağlamındadır.",
        ],
        commonError:
          "Aynı medeniyetle ilişkili bütün şehirleri aynı tarihî bölgeye yerleştirmek.",
        check:
          "Maveraünnehir için Seyhun–Ceyhun ve Buhara–Semerkant bağını birlikte kullan.",
      },
    },
    {
      passage:
        "Bir öğrenci “Buhara ile Semerkant aynı bölgededir; öyleyse aynı şehrin iki adıdır.” diyor.",
      prompt: "Bu çıkarımın hatası nedir?",
      options: [
        "Medeniyetin yalnız ibadet olduğunu kanıtlaması",
        "Her şehrin sadece tek eseri olduğunu söylemesi",
        "İki şehrin aynı bölgede bulunmasını mantıken imkânsız sayması",
        "Şehirlerin farklı dillerde hiç anılamayacağını kanıtlaması",
        "Ortak bölgeyi şehirlerin özdeşliği sanması",
      ],
      answer: 4,
      hint: "Bölge üyeliği ile şehir kimliğini karşılaştır.",
      explanation:
        "Öncül iki kentin aynı bölgede olduğunu söylüyor; sonuç ikisinin aynı kent olduğunu iddia ediyor. Aynı bölge, birden çok şehir içerebilir. Dolayısıyla bölge üyeliğinden şehir özdeşliğine geçiş yanlıştır. Kontrol: Mekke ve Medine’nin Hicaz’da bulunması onları aynı şehir yapmaz; ilişkiyi bu karşı örnekle denetle.",
      guidance: {
        knowledge: [
          "Aynı bölgede bulunma iki şehrin özdeş olması anlamına gelmez.",
        ],
        strategy: "Bölge üyeliği ile şehir kimliğini karşılaştır.",
        steps: [
          "Öncül iki kentin aynı bölgede olduğunu söylüyor; sonuç ikisinin aynı kent olduğunu iddia ediyor.",
          "Aynı bölge, birden çok şehir içerebilir. Dolayısıyla bölge üyeliğinden şehir özdeşliğine geçiş yanlıştır.",
        ],
        optionReasons: [
          "Şehir özdeşliği tartışması böyle bir sonucu vermez.",
          "Bu iddia öğrencinin cümlesinde yoktur.",
          "Başlangıçta ortak bölge verisi doğru olabilir; sorun özdeşlik sonucundadır.",
          "Farklı dillerde adlandırma konusunda böyle bir kanıt yoktur.",
          "İki ayrı şehir aynı geniş coğrafyada bulunabilir; ortak üyelik ad birliği vermez.",
        ],
        commonError: "Aynı üst sınıfa üye olan iki öğeyi aynı öğe saymak.",
        check:
          "Mekke ve Medine’nin Hicaz’da bulunması onları aynı şehir yapmaz; ilişkiyi bu karşı örnekle denetle.",
      },
    },
    {
      passage:
        "Ahmed Yesevi’nin dinî-ahlaki anlatımları ve yetiştirdiği çevrelerin Anadolu’ya uzanan etkisi inceleniyor.",
      prompt: "Başlangıç geleneği hangi tarihî coğrafyayla ilişkilendirilir?",
      options: ["Granada", "Kahire", "Türkistan", "Agra", "Endülüs"],
      answer: 2,
      hint: "Başlangıç coğrafyası ile daha sonraki etki alanını ayır.",
      explanation:
        "İncelenen zincir Ahmed Yesevi’nin geleneğinden başlayıp Anadolu’ya uzanan etkidir. Başlangıç Türkistan’la ilişkilidir; etkinin ulaştığı Anadolu’yu başlangıç yeriyle karıştırmayız. Kontrol: Anadolu’ya uzandı ifadesi, başlangıç yerini Anadolu yapmaz; başlangıç ve etkiyi iki ayrı okla düşün.",
      guidance: {
        knowledge: ["Ahmed Yesevi Türkistan tasavvuf geleneğiyle ilişkilidir."],
        strategy: "Başlangıç coğrafyası ile daha sonraki etki alanını ayır.",
        steps: [
          "İncelenen zincir Ahmed Yesevi’nin geleneğinden başlayıp Anadolu’ya uzanan etkidir.",
          "Başlangıç Türkistan’la ilişkilidir; etkinin ulaştığı Anadolu’yu başlangıç yeriyle karıştırmayız.",
        ],
        optionReasons: [
          "Granada Endülüs kentidir; Yesevi başlangıç coğrafyası değildir.",
          "Kahire önemli bir ilim merkezi olsa da verilen başlangıç eşleştirmesi değildir.",
          "Yesevi geleneğinin başlangıç odağı Türkistan’dır; Anadolu’ya uzanan etki ayrı halkadır.",
          "Agra Hint Alt Kıtası’nda bir kenttir; bu geleneğin başlangıç odağı değildir.",
          "Yesevi geleneğinin başlangıç coğrafyası olarak öğretilen bölge değildir.",
        ],
        commonError:
          "Bir geleneğin ulaştığı son bölgeyi zorunlu olarak doğduğu yer sanmak.",
        check:
          "Anadolu’ya uzandı ifadesi, başlangıç yerini Anadolu yapmaz; başlangıç ve etkiyi iki ayrı okla düşün.",
      },
    },
    {
      passage:
        "Bir gezi yalnız Medine, Edirne ve Granada şehirlerini içeriyor.",
      prompt: "Hangi eser bu üç duraktan biriyle eşleşmez?",
      options: [
        "Granada’daki Elhamra avlusu",
        "Tac Mahal",
        "Elhamra Sarayı",
        "Mescid-i Nebevî",
        "Selimiye Camii",
      ],
      answer: 1,
      hint: "Önce her eserin şehrini yaz, sonra verilen şehir kümesini kontrol et.",
      explanation:
        "Gezi kümesi Medine, Edirne ve Granada’dır; bu kentlerde Nebevî, Selimiye ve Elhamra eşleşmeleri kurulabilir. Tac Mahal Agra’dadır. Agra kümede bulunmadığı için listede eşleşmeyen yapı Tac Mahal olur. Kontrol: Olumsuz kökte sanat niteliğini değil, şehir listesi dışında kalmayı denetle.",
      guidance: {
        knowledge: [
          "Tac Mahal Agra’da; Nebevî Medine’de, Selimiye Edirne’de, Elhamra Granada’dadır.",
        ],
        strategy:
          "Önce her eserin şehrini yaz, sonra verilen şehir kümesini kontrol et.",
        steps: [
          "Gezi kümesi Medine, Edirne ve Granada’dır; bu kentlerde Nebevî, Selimiye ve Elhamra eşleşmeleri kurulabilir.",
          "Tac Mahal Agra’dadır. Agra kümede bulunmadığı için listede eşleşmeyen yapı Tac Mahal olur.",
        ],
        optionReasons: [
          "Yapının Granada’daki bölümü listede yer alan aynı kente karşılık gelir.",
          "Agra gezi listesinde yoktur; bu nedenle verilen duraklarla eşleşmez.",
          "Granada listede bulunduğu için eşleşir.",
          "Medine listede bulunduğu için bu eser eşleşir.",
          "Edirne listede bulunduğu için eşleşir.",
        ],
        commonError: "Ortak medeniyet sınıfını gerçek konum yerine kullanmak.",
        check:
          "Olumsuz kökte sanat niteliğini değil, şehir listesi dışında kalmayı denetle.",
      },
    },
    {
      passage:
        "Bir araştırmacı Babürlü döneminin Agra’daki mimari eserini yerinde incelemek istiyor.",
      prompt: "Hangi eser ve güncel ülke eşleştirmesi uygundur?",
      options: [
        "Selimiye — Mısır",
        "Tac Mahal — Hindistan",
        "Mescid-i Nebevî — Bosna-Hersek",
        "Elhamra — Pakistan",
        "Mostar Köprüsü — Fas",
      ],
      answer: 1,
      hint: "Tarihî yönetim ile güncel konumu iki aşamada ilişkilendir.",
      explanation:
        "Araştırmanın iki koşulu Babürlü dönemi ve Agra’daki mimaridir; Tac Mahal ikisini birlikte karşılar. Agra günümüzde Hindistan’dadır; eser–güncel ülke eşleştirmesi Tac Mahal–Hindistan olur. Kontrol: Agra konumunu koru; Babürlü adı güncel ülke adı olarak kullanılmıyor.",
      guidance: {
        knowledge: ["Tac Mahal Agra’da ve günümüz Hindistan’ındadır."],
        strategy: "Tarihî yönetim ile güncel konumu iki aşamada ilişkilendir.",
        steps: [
          "Araştırmanın iki koşulu Babürlü dönemi ve Agra’daki mimaridir; Tac Mahal ikisini birlikte karşılar.",
          "Agra günümüzde Hindistan’dadır; eser–güncel ülke eşleştirmesi Tac Mahal–Hindistan olur.",
        ],
        optionReasons: [
          "Selimiye Edirne’dedir; Mısır’da değildir.",
          "Agra’daki Babürlü eseri Tac Mahal’dir; Agra günümüz Hindistan’ındadır.",
          "Nebevî Medine’dedir; Bosna-Hersek eşleştirmesi yanlıştır.",
          "Elhamra Granada’da, günümüz İspanya’sındadır.",
          "Mostar Köprüsü Bosna-Hersek’tedir; Fas’ta değildir.",
        ],
        commonError:
          "Eserin tarihî yönetimi ile güncel ülkesini aynı kavram sanmak.",
        check:
          "Agra konumunu koru; Babürlü adı güncel ülke adı olarak kullanılmıyor.",
      },
    },
    {
      passage:
        "Bir kartta “Ezher”, “Kahire” ve “ibadet-eğitim ilişkisi” birlikte veriliyor.",
      prompt: "Kart hangi geniş coğrafi havzayla eşleşir?",
      options: [
        "Maveraünnehir",
        "Endülüs",
        "Hicaz",
        "Mısır",
        "Hint Alt Kıtası",
      ],
      answer: 3,
      hint: "Kurumdan şehre, şehirden bölgeye git.",
      explanation:
        "Karttaki Ezher’in kenti Kahire’dir; eğitim-ibadet işlevi bu kurum bağıyla verilmiştir. Kahire’nin içinde bulunduğu geniş coğrafya Mısır’dır; aynı işlevde başka kurumlar bulunması bu konumu değiştirmez. Kontrol: Ezher–Kahire–Mısır üçlüsünü aynı zincirde kontrol et.",
      guidance: {
        knowledge: [
          "Kahire ve Ezher Mısır’daki ilim ve kültür hayatıyla ilişkilidir.",
        ],
        strategy: "Kurumdan şehre, şehirden bölgeye git.",
        steps: [
          "Karttaki Ezher’in kenti Kahire’dir; eğitim-ibadet işlevi bu kurum bağıyla verilmiştir.",
          "Kahire’nin içinde bulunduğu geniş coğrafya Mısır’dır; aynı işlevde başka kurumlar bulunması bu konumu değiştirmez.",
        ],
        optionReasons: [
          "Seyhun–Ceyhun arasını anlatır; Kahire’yi kapsamaz.",
          "İber Yarımadası’ndaki tarihî coğrafyadır; Kahire orada değildir.",
          "Mekke ve Medine ile ilişkili bölgedir; Kahire’yi karşılamaz.",
          "Kahire Mısır’dadır; Ezher bu kentin önemli eğitim ve ibadet kurumudur.",
          "Kahire bu coğrafyanın şehri değildir.",
        ],
        commonError:
          "Önemli ilim merkezlerinin hepsini Bağdat veya tek bölgede toplamak.",
        check: "Ezher–Kahire–Mısır üçlüsünü aynı zincirde kontrol et.",
      },
    },
    {
      passage:
        "Elhamra Sarayı ve Kurtuba Camii hakkında yer eşleştirmesi yapılacak.",
      prompt: "Hangi coğrafi bağ doğrudur?",
      options: [
        "Mostar ve Edirne — Hint Alt Kıtası",
        "Granada ve Córdoba — Endülüs",
        "Agra ve Delhi — Hicaz",
        "Buhara ve Semerkant — Mısır",
        "Mekke ve Medine — Mağrip",
      ],
      answer: 1,
      hint: "İki eseri önce kendi şehrine, sonra ortak tarihî bölgeye bağla.",
      explanation:
        "Elhamra Sarayı Granada’da, Kurtuba Camii ise Córdoba’da bulunur. İki kent tarihî Endülüs havzasıyla ilişkilidir. Eser, kent ve geniş bölgeyi bu sırayla ayrı tutarız. Kontrol: Tam eser–şehir çiftlerini kurduktan sonra Endülüs ortaklığını göster.",
      guidance: {
        knowledge: [
          "Elhamra Gırnata/Granada, Kurtuba Camii Kurtuba/Córdoba ile ve Endülüs havzasıyla ilişkilidir.",
        ],
        strategy:
          "İki eseri önce kendi şehrine, sonra ortak tarihî bölgeye bağla.",
        steps: [
          "Elhamra Sarayı Granada’da, Kurtuba Camii ise Córdoba’da bulunur.",
          "İki kent tarihî Endülüs havzasıyla ilişkilidir. Eser, kent ve geniş bölgeyi bu sırayla ayrı tutarız.",
        ],
        optionReasons: [
          "Verilen iki şehir de Hint Alt Kıtası eşleştirmesi değildir.",
          "İki şehir İber Yarımadası’ndaki Endülüs havzasıyla eşleşir.",
          "Agra ve Delhi Hicaz’da değildir ve verilen eserlerin şehirleri değildir.",
          "Bu iki şehir Maveraünnehir bağlamındadır, Mısır’da değildir.",
          "Mekke–Medine Hicaz’dadır; ayrıca verilen eserler bu kentlerde değildir.",
        ],
        commonError:
          "Ortak mimari sınıfından bütün eserler için tek coğrafi konum çıkarmak.",
        check:
          "Tam eser–şehir çiftlerini kurduktan sonra Endülüs ortaklığını göster.",
      },
    },
    {
      passage:
        "Mostar Köprüsü ile Selimiye Camii aynı ortak medeniyet incelemesinde anılıyor.",
      prompt: "Hangisi doğru konum eşleştirmesidir?",
      options: [
        "Mostar — Granada; Selimiye — Agra",
        "Mostar — Bosna-Hersek; Selimiye — Edirne",
        "İki eser de Bağdat’taki aynı binadır.",
        "Mostar — Mekke; Selimiye — Semerkant",
        "Mostar — Kahire; Selimiye — Medine",
      ],
      answer: 1,
      hint: "Ortak inceleme başlığından bağımsız iki ayrı yapı konumu kur.",
      explanation:
        "Mostar Köprüsü bugünkü Bosna-Hersek’in Mostar kentindedir. Selimiye Camii Edirne’dedir. Ortak medeniyet bağını korurken bu iki farklı konum eşleştirmesini de koruruz. Kontrol: Köprü ve caminin hem işlevleri hem yerleri farklı; iki çiftin ikisi de korunmalı.",
      guidance: {
        knowledge: [
          "Mostar Köprüsü Mostar/Bosna-Hersek, Selimiye Camii Edirne ile ilişkilidir.",
        ],
        strategy:
          "Ortak inceleme başlığından bağımsız iki ayrı yapı konumu kur.",
        steps: [
          "Mostar Köprüsü bugünkü Bosna-Hersek’in Mostar kentindedir.",
          "Selimiye Camii Edirne’dedir. Ortak medeniyet bağını korurken bu iki farklı konum eşleştirmesini de koruruz.",
        ],
        optionReasons: [
          "Her iki yapının konumu başka eserlerin şehirleriyle değiştirilmiştir.",
          "İki yapı kendi şehir ve bölge bilgisiyle doğru eşleştirilir.",
          "Biri köprü, diğeri cami ve konumları farklıdır; tek bina değildir.",
          "İki eşleştirme de yanlıştır.",
          "Bu kentler iki yapının konumları değildir.",
        ],
        commonError:
          "Medeniyet ortaklığını aynı şehir veya aynı bina olmakla eşitlemek.",
        check:
          "Köprü ve caminin hem işlevleri hem yerleri farklı; iki çiftin ikisi de korunmalı.",
      },
    },
    {
      passage:
        "Bir öğrenci Farabi, İbni Sina ve Ali Kuşçu’yu ortak medeniyet birikimi içinde görüyor.",
      prompt: "Bu ortaklıktan tek başına hangisi çıkmaz?",
      options: [
        "Tarih bilgisi için ek kaynak gerekebileceği",
        "Farklı katkıların ortak birikim içinde incelenebildiği",
        "Kişi ve katkı alanının ayrıca eşleştirilmesi gerektiği",
        "Aynı havzada farklı ilim alanlarının bulunabildiği",
        "Üçünün de aynı yüzyılda aynı kurumda çalıştığı",
      ],
      answer: 4,
      hint: "Ortak üst başlık ile zaman ve alan bilgilerini ayrı tut.",
      explanation:
        "Verilen ortaklık Farabi, İbni Sina ve Ali Kuşçu’nun medeniyet birikimine katkısıdır. Aynı yüzyıl veya kurumda bulunmaları hakkında veri yoktur; ortak katkıdan zamansal ve kurumsal özdeşlik çıkarılamaz. Kontrol: Aynı yüzyıl ve kurum iddiasındaki iki öğenin de ayrıca kanıtlanması gerektiğini kontrol et.",
      guidance: {
        knowledge: [
          "Ortak medeniyet bağı aynı dönem, kurum veya uzmanlık anlamına gelmez.",
        ],
        strategy: "Ortak üst başlık ile zaman ve alan bilgilerini ayrı tut.",
        steps: [
          "Verilen ortaklık Farabi, İbni Sina ve Ali Kuşçu’nun medeniyet birikimine katkısıdır.",
          "Aynı yüzyıl veya kurumda bulunmaları hakkında veri yoktur; ortak katkıdan zamansal ve kurumsal özdeşlik çıkarılamaz.",
        ],
        optionReasons: [
          "Aynı dönem iddiası için ayrıca tarih verisi gerekir.",
          "Ortak başlık bu tür incelemeye uygundur.",
          "Ortak başlık her kişinin alanını tek başına vermez.",
          "Medeniyet birikimi farklı alanları kapsayabilir.",
          "Ortak medeniyet üyeliği aynı çağ ve kurum için kanıt değildir.",
        ],
        commonError:
          "Ortak coğrafi veya kültürel bağdan aynı çağda birlikte çalışma çıkarmak.",
        check:
          "Aynı yüzyıl ve kurum iddiasındaki iki öğenin de ayrıca kanıtlanması gerektiğini kontrol et.",
      },
    },
    {
      passage:
        "Bir pasaj âlimlerin eserlerini, öğrencilerin başka merkezlere gidişini ve tüccarların toplumsal ilişkilerini birlikte anıyor.",
      prompt: "Medeniyet etkileşimi için hangi sonuç daha uygundur?",
      options: [
        "Birden çok aktarım yolu anlatılmaktadır.",
        "Bütün aktarım aynı gün gerçekleşmiştir.",
        "Tercüme varsa eser ilk kez çevrildiği şehirde yazılmıştır.",
        "Farklı dillerde eser bulunması ortak birikimi imkânsız yapar.",
        "Yalnız askerî faaliyet bütün aktarımı açıklar.",
      ],
      answer: 0,
      hint: "Pasajda sayılan farklı rol ve yolları tek tek koru.",
      explanation:
        "Pasajda eserler dolaşıyor, öğrenciler başka merkezlere gidiyor ve tüccarlar ilişki kuruyor. Üç ayrı aktarım yolu birlikte verildiğinden etkileşimi yalnız tek kişi veya tek araçla açıklamak kapsamı daraltır. Kontrol: Sonuç, pasajda anılan üç yolu da dışlamadan açıklamalıdır.",
      guidance: {
        knowledge: [
          "Bilgi ve kültür aktarımı birden çok toplumsal ağ üzerinden gerçekleşebilir.",
        ],
        strategy: "Pasajda sayılan farklı rol ve yolları tek tek koru.",
        steps: [
          "Pasajda eserler dolaşıyor, öğrenciler başka merkezlere gidiyor ve tüccarlar ilişki kuruyor.",
          "Üç ayrı aktarım yolu birlikte verildiğinden etkileşimi yalnız tek kişi veya tek araçla açıklamak kapsamı daraltır.",
        ],
        optionReasons: [
          "Eser, öğrenci dolaşımı ve ticari ilişki farklı ama birlikte etkili olabilecek ağlardır.",
          "Zaman birliği hakkında veri yoktur.",
          "Aktarım yeri ile ilk yazım yeri özdeş değildir.",
          "Farklı diller aktarımı ve ortak birikimi imkânsız kılmaz.",
          "Pasajın verdiği ilim, öğrenci ve tüccar yollarını siler.",
        ],
        commonError:
          "Bir tarihsel yayılma biçimini bütün örneklerin tek nedeni saymak.",
        check: "Sonuç, pasajda anılan üç yolu da dışlamadan açıklamalıdır.",
      },
    },
    {
      passage:
        "Hucurât 13 hakkında hazırlanan metin, farklı toplulukların tanışmasını ve insan değerinin soy veya renk üstünlüğüne indirgenmemesini vurguluyor.",
      prompt: "Hangi yorum bu kapsamla uyuşur?",
      options: [
        "Farklı toplumlar hiçbir ilişki kuramaz.",
        "Soy, insan değerinin tek ölçüsüdür.",
        "Bütün kültürel eserler aynı şehirde olmalıdır.",
        "Topluluk farklılıkları insanları küçümsemenin gerekçesi değildir.",
        "Herkesin aynı dili kullanması zorunludur.",
      ],
      answer: 3,
      hint: "Farklılığın tanışma amacıyla mı üstünlük gerekçesiyle mi kullanıldığına bak.",
      explanation:
        "Metin farklı toplulukların tanışmasını olumlu bir ilişki olarak sunuyor. İnsan değerini soy ve renk üstünlüğüne bağlamadığı için farklılıklar küçümsemenin gerekçesi yapılamaz. Kontrol: Tanışma ile üstünlük taslama aynı amaç değil; doğru seçenek bu farkı korur.",
      guidance: {
        knowledge: [
          "Tanışma ve farklılık vurgusu, soyla üstünlük iddiasından ayrılır.",
        ],
        strategy:
          "Farklılığın tanışma amacıyla mı üstünlük gerekçesiyle mi kullanıldığına bak.",
        steps: [
          "Metin farklı toplulukların tanışmasını olumlu bir ilişki olarak sunuyor.",
          "İnsan değerini soy ve renk üstünlüğüne bağlamadığı için farklılıklar küçümsemenin gerekçesi yapılamaz.",
        ],
        optionReasons: [
          "Tanışma vurgusu ilişki imkânını açıkça içerir.",
          "Bu, pasajın karşı çıktığı indirgemedir.",
          "Eser konumları hakkında böyle bir sonuç yoktur.",
          "Metin farklılıkları tanışmayla ilişkilendirirken soy ve renk üstünlüğünü dışlar.",
          "Dilin zorunlu tekleştirilmesi metinde verilmez.",
        ],
        commonError:
          "Farklı toplulukların varlığını zorunlu üstünlük veya düşmanlık gerekçesi yapmak.",
        check:
          "Tanışma ile üstünlük taslama aynı amaç değil; doğru seçenek bu farkı korur.",
      },
    },
    {
      passage:
        "Özgün öğretim çizimi, kilometre ölçeği verilmeden etiketli konum noktalarını gösteriyor: Mekke, Medine ve Agra. Yan notta “Seçili şehir Agra; Tac Mahal bu kenttedir.” yazıyor. Gezi listesi yalnız Mekke ve Medine’yi içeriyor. Nokta konumları kilometre uzaklığına bağlanmamış.",
      prompt: "Bu çizimden doğrudan hangisi bulunamaz?",
      options: [
        "En az iki ayrı şehir işaretinin bulunduğu",
        "İşaretin hangi şehir adıyla eşleştirildiği",
        "İki şehir arasındaki kesin kilometre uzaklığı",
        "Seçilen şehirle ilişkili öğretim notu",
        "Bir gezi listesinde belirtilen şehir adının yer alıp almadığı",
      ],
      answer: 2,
      hint: "Şehir eşleştirmesiyle kilometre ölçümünü ayrı işler olarak düşün.",
      explanation:
        "Etiketler üç kenti, yan not Agra–Tac Mahal bağını, gezi listesi Mekke ve Medine üyeliğini veriyor; bu bilgiler karttan okunabilir. Noktalar için kilometreye dönüşüm sağlayan ölçek yoktur. Bu yüzden iki kent arasındaki kesin kilometre uzaklığı bu verilerden hesaplanamaz. Kontrol: Kesin kilometre iddiası için çizimde ayrıca mesafe ölçeği bulunmadığını doğrula.",
      guidance: {
        knowledge: [
          "Ölçeksiz konum çizimi kesin fiziksel mesafe hesabı vermez.",
        ],
        strategy:
          "Şehir eşleştirmesiyle kilometre ölçümünü ayrı işler olarak düşün.",
        steps: [
          "Etiketler üç kenti, yan not Agra–Tac Mahal bağını, gezi listesi Mekke ve Medine üyeliğini veriyor; bu bilgiler karttan okunabilir.",
          "Noktalar için kilometreye dönüşüm sağlayan ölçek yoktur. Bu yüzden iki kent arasındaki kesin kilometre uzaklığı bu verilerden hesaplanamaz.",
        ],
        optionReasons: [
          "Üç farklı şehir etiketi verildiği için en az iki ayrı şehir işaretinin bulunduğu okunabilir.",
          "Etiketli noktanın adı çizimin verdiği bilgidir.",
          "Uzaklık için uygun ölçek ve yöntem gerekir; çizimde bu bilgi yoktur.",
          "Seçili şehir notu Agra ile Tac Mahal bağını açıkça bildiriyor; bu not kartta vardır.",
          "Gezi listesi Mekke ve Medine’yi açıkça sayıyor; bu listedeki şehir üyeliği okunabilir.",
        ],
        commonError:
          "Konum modelinin görünüşünden ölçülmemiş kesin mesafe üretmek.",
        check:
          "Kesin kilometre iddiası için çizimde ayrıca mesafe ölçeği bulunmadığını doğrula.",
      },
    },
  ],
  [
    {
      passage:
        "Bir aile örneğinde yetişkinlerin çocukların ihtiyaçlarını gözetmesi, çocukların da saygılı ve yapıcı davranması birlikte anlatılıyor.",
      prompt: "Metnin vurgusu hangisidir?",
      options: [
        "Yalnız çocuklar sorumludur.",
        "Saygı varsa hiçbir görüş ayrılığı olamaz.",
        "Ailede hiçbir davranış öğrenilemez.",
        "Karşılıklı sorumluluk",
        "Yalnız yetişkinlerin hakları vardır.",
      ],
      answer: 3,
      hint: "İki tarafa yüklenen ayrı fiilleri birlikte sonuca kat.",
      explanation:
        "Yetişkinlere çocukların ihtiyaçlarını gözetme, çocuklara saygılı ve yapıcı davranma görevi veriliyor. Sorumluluk yalnız bir tarafa yüklenmediği için aile içindeki karşılıklılık metnin ortak vurgusudur. Kontrol: Sonuç hem ihtiyaç gözetme hem saygılı davranma fiilini açıklamalıdır.",
      guidance: {
        knowledge: [
          "Aile ilişkilerinde karşılıklı hak ve sorumluluklar birlikte ele alınabilir.",
        ],
        strategy: "İki tarafa yüklenen ayrı fiilleri birlikte sonuca kat.",
        steps: [
          "Yetişkinlere çocukların ihtiyaçlarını gözetme, çocuklara saygılı ve yapıcı davranma görevi veriliyor.",
          "Sorumluluk yalnız bir tarafa yüklenmediği için aile içindeki karşılıklılık metnin ortak vurgusudur.",
        ],
        optionReasons: [
          "Yetişkinlerin açıkça verilen görevini dışlar.",
          "Metin bütün görüşlerin aynı olmasını söylemez.",
          "Bu sonuç verilen karşılıklı ilişkiyle desteklenmez.",
          "İhtiyaç gözetme yetişkinlere, saygılı yapıcı davranma çocuklara ilişkin sorumluluk verir.",
          "Çocukların ihtiyaçlarını gözetme verisini yok sayar.",
        ],
        commonError:
          "Bir tarafın görevini görünür kılıp diğer tarafın hakkını silmek.",
        check:
          "Sonuç hem ihtiyaç gözetme hem saygılı davranma fiilini açıklamalıdır.",
      },
    },
    {
      passage:
        "Bir şehirdeki cami yerel taş işçiliğini, başka bir cami farklı bir bölgenin bezeme üslubunu taşıyor. İkisi ortak dinî temalarla da ilişkilendiriliyor.",
      prompt: "Hangi yorum daha uygundur?",
      options: [
        "İki yapının aynı yılda tamamlandığı kesindir.",
        "Aynı dinle ilişkili her yapı bütün ayrıntılarıyla aynı olmalıdır.",
        "Teknik fark varsa ortak tema hiçbir zaman bulunamaz.",
        "Ortak bağ bulunurken üsluplar farklılaşabilir.",
        "Taş işçiliği bir müzik makamıdır.",
      ],
      answer: 3,
      hint: "İçerik ortaklığı ile üretim biçimi farkını ayrı eksenlerde düşün.",
      explanation:
        "Camilere ait ortak bağ dinî temadır; taş işçiliği ve bezeme üslupları ise farklıdır. Hem ortaklık hem fark açıkça verildiğinden ortak dinî bağın bütün yerel üslupları aynılaştırdığı sonucu kurulamaz. Kontrol: Her iki cümlenin de doğru kalabilmesi için ortak içerik ve farklı biçimi birlikte koru.",
      guidance: {
        knowledge: [
          "Ortak dinî bağ ile kültürel ve teknik çeşitlilik birlikte bulunabilir.",
        ],
        strategy:
          "İçerik ortaklığı ile üretim biçimi farkını ayrı eksenlerde düşün.",
        steps: [
          "Camilere ait ortak bağ dinî temadır; taş işçiliği ve bezeme üslupları ise farklıdır.",
          "Hem ortaklık hem fark açıkça verildiğinden ortak dinî bağın bütün yerel üslupları aynılaştırdığı sonucu kurulamaz.",
        ],
        optionReasons: [
          "Yapım yılı hakkında veri yoktur.",
          "Verilen iki farklı üslup bu genellemeye aykırıdır.",
          "Metin ortak temanın bulunduğunu bildirir.",
          "İki örnekte ortak tema ve farklı işçilik aynı anda açıkça verilir.",
          "Taş işçiliği yapı tekniğidir, ses düzeni değildir.",
        ],
        commonError: "Ortak dinî temayı zorunlu teknik özdeşlik sanmak.",
        check:
          "Her iki cümlenin de doğru kalabilmesi için ortak içerik ve farklı biçimi birlikte koru.",
      },
    },
    {
      passage:
        "Bir yazma kitapta harflerin estetik biçimi, sayfa kenarı bezemesi ve küçük bir olay tasviri ayrı ayrı gösteriliyor.",
      prompt: "Bu üç bölüm hangi sırayla eşleşir?",
      options: [
        "Hat — tezhip — minyatür",
        "Tezhip — minyatür — hat",
        "Minyatür — hat — tezhip",
        "Musiki — mimari — ebru",
        "Ebru — musiki — mimari",
      ],
      answer: 0,
      hint: "Gösterilen bölümün işini yazı, süs ve resim olarak ayır.",
      explanation:
        "Harf biçimlerinin estetik düzeni hatla, kenar bezemesi tezhiple eşleşir. Küçük olay tasviri minyatürdür. Kökün verdiği sırayı koruyunca hat–tezhip–minyatür dizisi elde edilir. Kontrol: Her bölümün yaptığı işi ayrı eşleştir; üç çiftin hepsi doğru olmalı.",
      guidance: {
        knowledge: [
          "Hat yazı, tezhip bezeme, minyatür küçük ayrıntılı tasvir sanatıdır.",
        ],
        strategy: "Gösterilen bölümün işini yazı, süs ve resim olarak ayır.",
        steps: [
          "Harf biçimlerinin estetik düzeni hatla, kenar bezemesi tezhiple eşleşir.",
          "Küçük olay tasviri minyatürdür. Kökün verdiği sırayı koruyunca hat–tezhip–minyatür dizisi elde edilir.",
        ],
        optionReasons: [
          "Harf, kenar bezemesi ve olay tasviri üç farklı teknikle verilen sırada eşleşir.",
          "Harfleri bezeme, tasviri yazı yaparak görevleri değiştirir.",
          "İlk ve son görevler ters sınıflanır; kenar bezemesi de yazı değildir.",
          "Ses, yapı ve su deseni burada verilen bölümleri karşılamaz.",
          "Üçünün malzeme ve görevleri bu kitap bölümleriyle uyuşmaz.",
        ],
        commonError:
          "Kitabın tek nesne olmasını içindeki bütün sanatların aynı teknik olması sanmak.",
        check:
          "Her bölümün yaptığı işi ayrı eşleştir; üç çiftin hepsi doğru olmalı.",
      },
    },
    {
      passage:
        "Bir sanatçı Arap harflerinin biçim ve düzenini estetik amaçla çalışıyor.",
      prompt: "Sanat ve sanatçı adı hangisidir?",
      options: [
        "Tezhip — nakkaş",
        "Hat — hattat",
        "Minyatür — müzehhip",
        "Ebru — mimar",
        "Musiki — müzehhip",
      ],
      answer: 1,
      hint: "Harf düzeni ile çevresindeki bezemeyi ayır.",
      explanation:
        "Çalışmanın malzemesi estetik biçimde düzenlenen Arap harfleridir; alan hat sanatıdır. Bu alanın sanatçısı hattat olarak adlandırılır; bezeme yapan müzehhiple görevini karıştırmayız. Kontrol: Harflerin kendisine odaklanılıyorsa hat; sanatçısı hattattır, çevre bezemesi değil.",
      guidance: {
        knowledge: [
          "Hat güzel yazı sanatı, hattat bu sanatı uygulayan kişidir.",
        ],
        strategy: "Harf düzeni ile çevresindeki bezemeyi ayır.",
        steps: [
          "Çalışmanın malzemesi estetik biçimde düzenlenen Arap harfleridir; alan hat sanatıdır.",
          "Bu alanın sanatçısı hattat olarak adlandırılır; bezeme yapan müzehhiple görevini karıştırmayız.",
        ],
        optionReasons: [
          "Tezhip bezeme sanatıdır; nakkaş minyatür ve tasvir geleneğinde anılır.",
          "Harflerin estetik düzenine yönelik çalışma hatla ve hattatla ilişkilidir.",
          "Minyatür tasvir, müzehhip tezhip sanatçısıdır; iki eşleştirme de kayar.",
          "Ebru su yüzeyi deseni, mimar yapı tasarımcısıdır.",
          "Musiki ses alanı, müzehhip bezeme sanatçısıdır.",
        ],
        commonError:
          "Benzer geleneksel sanat adlarında sanatla sanatçısını çapraz eşleştirmek.",
        check:
          "Harflerin kendisine odaklanılıyorsa hat; sanatçısı hattattır, çevre bezemesi değil.",
      },
    },
    {
      passage:
        "Bir sayfanın yazı çevresine bitkisel ve geometrik motiflerle ince bezemeler yapılıyor.",
      prompt: "Hangi sanat ve sanatçı adı uygundur?",
      options: [
        "Hat — hattat",
        "Tezhip — müzehhip",
        "Ebru — nakkaşhane",
        "Minyatür — mimar",
        "Musiki — hattat",
      ],
      answer: 1,
      hint: "Yazının anlamından çok etrafında yapılan süsleme işine bak.",
      explanation:
        "İnce bezeme yazının çevresine bitkisel ve geometrik motiflerle yapılıyor; bu tezhiptir. Tezhip sanatçısının adı müzehhiptir. Harfin kendisini biçimlendirme bilgisi verilmediği için hattat çifti seçilmez. Kontrol: Sayfada sorulan şey harf değil çevresindeki motiftir; bu görev farkı anahtardır.",
      guidance: {
        knowledge: [
          "Tezhip bezeme, müzehhip ise bu bezemeyi uygulayan sanatçıyla ilişkilidir.",
        ],
        strategy: "Yazının anlamından çok etrafında yapılan süsleme işine bak.",
        steps: [
          "İnce bezeme yazının çevresine bitkisel ve geometrik motiflerle yapılıyor; bu tezhiptir.",
          "Tezhip sanatçısının adı müzehhiptir. Harfin kendisini biçimlendirme bilgisi verilmediği için hattat çifti seçilmez.",
        ],
        optionReasons: [
          "Harflerin yazılışı değil yazı çevresindeki bezeme soruluyor.",
          "Sayfa çevresi motif bezemesi tezhiptir; sanatçısı müzehhip olarak adlandırılır.",
          "Su yüzeyinde desen aktarımı yok; nakkaşhane de sanatçı adı değil atölyedir.",
          "Olay tasviri veya yapı tasarımı verilmedi.",
          "Ses düzenlemesi veya yazı üretimi değil bezeme anlatılıyor.",
        ],
        commonError:
          "Yazı bulunan her sayfanın bütün görsel öğelerini hat sanmak.",
        check:
          "Sayfada sorulan şey harf değil çevresindeki motiftir; bu görev farkı anahtardır.",
      },
    },
    {
      passage:
        "Boyalar yoğunlaştırılmış su yüzeyinde desen oluşturacak şekilde düzenleniyor ve ardından desen kâğıda aktarılıyor.",
      prompt: "Açıklanan teknik hangisidir?",
      options: ["Ebru", "Hat", "Mimari", "Minyatür", "Musiki"],
      answer: 0,
      hint: "Üretim yüzeyi ve aktarım aşamasını birlikte kontrol et.",
      explanation:
        "Önce su yüzeyinde boya deseni oluşuyor, sonra bu desen kâğıda aktarılıyor. Bu üretim sırası ebru tekniğinin ayırt edici bağıdır; yalnız kâğıt kullanılması hat veya minyatür sonucunu vermez. Kontrol: Su yüzeyi ve kâğıda aktarım iki koşul olarak birlikte var.",
      guidance: {
        knowledge: [
          "Ebru su yüzeyinde oluşturulan desenin kâğıda aktarılmasıyla ilişkilidir.",
        ],
        strategy: "Üretim yüzeyi ve aktarım aşamasını birlikte kontrol et.",
        steps: [
          "Önce su yüzeyinde boya deseni oluşuyor, sonra bu desen kâğıda aktarılıyor.",
          "Bu üretim sırası ebru tekniğinin ayırt edici bağıdır; yalnız kâğıt kullanılması hat veya minyatür sonucunu vermez.",
        ],
        optionReasons: [
          "Su yüzeyinde desen kurup kâğıda aktarma bu tekniğin ayırıcı ilişkisidir.",
          "Harflerin estetik yazımı verilmedi.",
          "Yapı ve mekân tasarımı yoktur.",
          "Küçük olay tasviri veya yazma resim tekniği anlatılmıyor.",
          "Ses veya ezgi üretimi anlatılmıyor.",
        ],
        commonError:
          "Renkli her sayfayı üretim yoluna bakmadan aynı sanat sanmak.",
        check: "Su yüzeyi ve kâğıda aktarım iki koşul olarak birlikte var.",
      },
    },
    {
      passage:
        "Bir yazma eserde küçük, ayrıntılı ve renkli olay tasvirleri yer alıyor. Bu tasvirleri yapan sanatçı nakkaş diye anılıyor.",
      prompt: "Hangi sanat söz konusudur?",
      options: ["Minyatür", "Ebru", "Tezhip", "Hat", "Musiki"],
      answer: 0,
      hint: "Kitabın yazısı veya kenarı değil olay tasvirini odağa al.",
      explanation:
        "Eser küçük, renkli olay tasviri olarak anlatılıyor; harf düzeni ya da kenar süsü değil. Bu tasvir minyatürdür; sanatçıya nakkaş denmesi de aynı eşleşmeyi doğrular. Kontrol: Nakkaş ve olay tasviri birlikte, yalnız renk veya kitap sözcüğünden daha ayırt edicidir.",
      guidance: {
        knowledge: [
          "Minyatür yazma eserlerde görülebilen küçük ve ayrıntılı tasvirlerle ilişkilidir.",
        ],
        strategy: "Kitabın yazısı veya kenarı değil olay tasvirini odağa al.",
        steps: [
          "Eser küçük, renkli olay tasviri olarak anlatılıyor; harf düzeni ya da kenar süsü değil.",
          "Bu tasvir minyatürdür; sanatçıya nakkaş denmesi de aynı eşleşmeyi doğrular.",
        ],
        optionReasons: [
          "Küçük olay tasviri ve nakkaş terimi minyatür geleneğiyle eşleşir.",
          "Su yüzeyi deseni ve aktarım aşaması verilmedi.",
          "Tezhip bezemedir; burada olay tasviri soruluyor.",
          "Hat harflerin estetik düzenidir; olay tasvirinin adı değildir.",
          "Sesli düzenleme anlatılmıyor.",
        ],
        commonError:
          "Küçük tasviri sırf kitapta diye yazı veya kenar süslemesiyle özdeşleştirmek.",
        check:
          "Nakkaş ve olay tasviri birlikte, yalnız renk veya kitap sözcüğünden daha ayırt edicidir.",
      },
    },
    {
      passage:
        "Bir araştırmada tarihî darüşşifalarda musikiden yararlanıldığı anlatılıyor.",
      prompt: "Bu tarih bilgisinden hangisi doğrudan çıkarılamaz?",
      options: [
        "Tarih bilgisiyle kişisel sağlık önerisinin farklı işler olduğu",
        "Güncel tedavi iddiası için ayrıca bilimsel kanıt gerektiği",
        "Musikinin bugün bütün hastalıkları kesin iyileştirdiği",
        "Musikinin sanat tarihi içinde incelenebildiği",
        "Geçmişte bu tür uygulama örnekleri bulunduğu",
      ],
      answer: 2,
      hint: "Geçmişte kullanıldı ifadesini bugün kesin tedavi eder iddiasıyla karşılaştır.",
      explanation:
        "Bilgi, musikinin tarihî darüşşifalarda kullanılmış olmasıyla sınırlıdır. Bugün bütün hastalıkları kesin iyileştirme iddiası dönem, hastalık ve etki açısından bu kaydı aşar; tarihî kullanım güncel genel tedavi kanıtı değildir. Kontrol: Bütün hastalıkları ve kesin sözcükleri, başlangıçtaki sınırlı tarih verisini aşar.",
      guidance: {
        knowledge: [
          "Tarihî kullanım ile güncel klinik etkililik farklı kanıtlar gerektirir.",
        ],
        strategy:
          "Geçmişte kullanıldı ifadesini bugün kesin tedavi eder iddiasıyla karşılaştır.",
        steps: [
          "Bilgi, musikinin tarihî darüşşifalarda kullanılmış olmasıyla sınırlıdır.",
          "Bugün bütün hastalıkları kesin iyileştirme iddiası dönem, hastalık ve etki açısından bu kaydı aşar; tarihî kullanım güncel genel tedavi kanıtı değildir.",
        ],
        optionReasons: [
          "Bu ayrım bilginin kapsamını korur.",
          "Tarihî örnek tek başına güncel kapsamlı tedavi etkisini vermez.",
          "Tarihî kullanım bilgisi bütün hastalıklarda güncel etkililik kanıtı değildir.",
          "Tarihî kullanım ve sanat ilişkisi buna uygundur.",
          "Bu doğrudan verilen tarihsel bilgidir.",
        ],
        commonError:
          "Tarihî sanat uygulamasını doğrulanmamış kişisel tedavi önerisine dönüştürmek.",
        check:
          "Bütün hastalıkları ve kesin sözcükleri, başlangıçtaki sınırlı tarih verisini aşar.",
      },
    },
    {
      passage:
        "Bir okul bahçe sulamasında uygun teknik koşullarla yeniden kazanılmış su kullanıyor ve gerekli sulamayı sürdürüyor.",
      prompt: "Bu davranış için en dar, destekli yorum hangisidir?",
      options: [
        "Kaynak yeniden kullanılarak yararlanma sürdürülüyor.",
        "Gerekli sulama tamamen kaldırılmıştır.",
        "Bütün su artık her durumda içilebilir.",
        "Okulun bütün çevre sorunları kesin bitmiştir.",
        "Doğadan hiç yararlanılmıyor.",
      ],
      answer: 0,
      hint: "Suyun kullanıldığını ve yeniden değerlendirildiğini birlikte oku.",
      explanation:
        "Okul uygun koşulla kazanılmış suyu yeniden kullanırken gerekli sulamayı da sürdürüyor. Açık desteklenen sonuç kaynaktan yeniden yararlanmadır; suyun her kullanım için içilebilirliği veya sulamanın gereksiz olduğu söylenmiyor. Kontrol: Doğru yorum yalnız verilen yeniden kullanım ve sulamayı sürdürme fiillerini kapsar.",
      guidance: {
        knowledge: [
          "Kaynağı koruyarak yararlanma, doğadan hiç yararlanmamakla aynı değildir.",
        ],
        strategy:
          "Suyun kullanıldığını ve yeniden değerlendirildiğini birlikte oku.",
        steps: [
          "Okul uygun koşulla kazanılmış suyu yeniden kullanırken gerekli sulamayı da sürdürüyor.",
          "Açık desteklenen sonuç kaynaktan yeniden yararlanmadır; suyun her kullanım için içilebilirliği veya sulamanın gereksiz olduğu söylenmiyor.",
        ],
        optionReasons: [
          "Metin hem suyun kullanımını hem yeniden kazanımı açıkça bildirir.",
          "Metin gerekli sulamanın sürdüğünü açıkça söyler.",
          "İçilebilirlik ve tüm kullanım koşulları hakkında veri verilmedi.",
          "Tek uygulama bütün sorunların bittiğini ölçmez.",
          "Sulama için su kullanıldığı için bu ifade yanlıştır.",
        ],
        commonError:
          "Geri kazanımı sınırsız sağlık güvenliği veya doğadan hiç yararlanmama sanmak.",
        check:
          "Doğru yorum yalnız verilen yeniden kullanım ve sulamayı sürdürme fiillerini kapsar.",
      },
    },
    {
      passage:
        "Özgün su hesabında gerekli kullanım 40 L, önlenebilir kayıp 20 L. Uygun süreçle kaybın yarısı yeniden kazanılıp aynı işte dışarıdan alınacak suyun yerine kullanılıyor.",
      prompt: "Dışarıdan alınması gereken su kaç litredir?",
      options: ["30 L", "50 L", "60 L", "10 L", "80 L"],
      answer: 1,
      hint: "Önce 20 L’nin yarısını bul, sonra 40+20 toplamından çıkar.",
      explanation:
        "Brüt su ihtiyacı, gerekli 40 L ile kayıp 20 L toplamı olan 60 L’dir. Geri kazanılan miktar kaybın yarısıdır: 20 × 1/2 = 10 L. Aynı işte bu 10 L dış suyun yerini aldığı için dışarıdan 60 − 10 = 50 L gerekir. Kontrol: 50 L dış su +10 L yeniden kullanım, 60 L brüt kullanım ihtiyacını karşılar; model gerçek tesis verisi değildir.",
      guidance: {
        knowledge: [
          "Dış su ihtiyacı, gerekli kullanım ve kaybın toplamından geri kazanılan miktar çıkarılarak bulunur.",
        ],
        strategy: "Önce 20 L’nin yarısını bul, sonra 40+20 toplamından çıkar.",
        steps: [
          "Brüt su ihtiyacı, gerekli 40 L ile kayıp 20 L toplamı olan 60 L’dir.",
          "Geri kazanılan miktar kaybın yarısıdır: 20 × 1/2 = 10 L.",
          "Aynı işte bu 10 L dış suyun yerini aldığı için dışarıdan 60 − 10 = 50 L gerekir.",
        ],
        optionReasons: [
          "Geri kazanımı yanlış miktarda çıkarır; verilen toplam ve 10 L ile uyuşmaz.",
          "20×1/2=10 L geri kazanılır; 40+20−10=50 L dış su gerekir.",
          "Geri kazanılan 10 L’yi hesaba katmadan başlangıç toplamını verir.",
          "Bu geri kazanılan miktardır, toplam dış su ihtiyacı değildir.",
          "Kaybı azaltmak yerine yanlışlıkla ekler; verilen dengeyi karşılamaz.",
        ],
        commonError:
          "Geri kazanılan miktarı dışarıdan gereken suyun kendisi sanmak.",
        check:
          "50 L dış su +10 L yeniden kullanım, 60 L brüt kullanım ihtiyacını karşılar; model gerçek tesis verisi değildir.",
      },
    },
    {
      passage:
        "Özgün su hesabında gerekli kullanım 40 L, önlenebilir kayıp 0 L. Yeniden kazanım yüzdesi 100 seçiliyor.",
      prompt: "Dışarıdan su ihtiyacı kaç litredir?",
      options: ["40 L", "4000 L", "0 L", "100 L", "−40 L"],
      answer: 0,
      hint: "Yüzdeyi hangi miktara uyguladığını açıkça belirle.",
      explanation:
        "Gerekli kullanım 40 L, geri kazanılacak kayıp ise 0 L’dir. Kayıp sıfır olduğundan yüzde 100 geri kazanım da 0 L verir. Bu nedenle dışarıdan alınan miktar 40 − 0 = 40 L kalır. Kontrol: 0×100/100=0; geri kazanımın tabanı sıfır kayıptır, gerekli kullanım değil.",
      guidance: {
        knowledge: [
          "Geri kazanılabilir kayıp yoksa yüzde artışı gerekli temel kullanımı sıfırlamaz.",
        ],
        strategy: "Yüzdeyi hangi miktara uyguladığını açıkça belirle.",
        steps: [
          "Gerekli kullanım 40 L, geri kazanılacak kayıp ise 0 L’dir.",
          "Kayıp sıfır olduğundan yüzde 100 geri kazanım da 0 L verir. Bu nedenle dışarıdan alınan miktar 40 − 0 = 40 L kalır.",
        ],
        optionReasons: [
          "Kayıp sıfır olduğu için geri kazanılan miktar da sıfırdır; gerekli 40 L kalır.",
          "Yüzdeyi yanlış çarpar ve su dengesiyle uyuşmaz.",
          "Yüzde100 bütün gerekli suyu yok etmez; yalnız sıfır kayba uygulanır.",
          "Yüzdeyi litre miktarı gibi okur.",
          "Negatif dış su bu modelin dengesine aykırıdır.",
        ],
        commonError:
          "Yüzde100 geri kazanımı sistemde gerekli suyun hiç kalmaması sanmak.",
        check:
          "0×100/100=0; geri kazanımın tabanı sıfır kayıptır, gerekli kullanım değil.",
      },
    },
    {
      passage:
        "Bir yardım kuruluşu ihtiyacın artması üzerine dağıtım saatlerini değiştiriyor. Yardımlaşma amacı aynı kalıyor.",
      prompt: "Ne değişmiştir?",
      options: [
        "Yardımlaşmanın değeri zorunlu olarak yok olmuştur.",
        "Toplumsal uygulama düzeni",
        "Hak kavramının anlamı tamamen silinmiştir.",
        "Bütün temel inanç esasları",
        "Bütün gelenekler aynı anda sona ermiştir.",
      ],
      answer: 1,
      hint: "Amaç cümlesi ve saat düzenini iki sütuna yaz.",
      explanation:
        "Değiştirilen unsur dağıtım saatleridir; ihtiyaç artışına bağlı uygulama düzeni yenileniyor. Yardımlaşma amacının aynı kaldığı açıkça verildiğinden temel amaç değişmiş sonucuna geçmeyiz. Kontrol: Değişti denilen şey saat; aynı kaldı denilen şey yardım amacı. İkisini karıştırma.",
      guidance: {
        knowledge: [
          "İlke ile onu gerçekleştirmeye yarayan uygulama farklı öğelerdir.",
        ],
        strategy: "Amaç cümlesi ve saat düzenini iki sütuna yaz.",
        steps: [
          "Değiştirilen unsur dağıtım saatleridir; ihtiyaç artışına bağlı uygulama düzeni yenileniyor.",
          "Yardımlaşma amacının aynı kaldığı açıkça verildiğinden temel amaç değişmiş sonucuna geçmeyiz.",
        ],
        optionReasons: [
          "Metin amacın aynı kaldığını açıkça bildiriyor.",
          "Saatler değişmiş, yardımlaşma amacı korunmuştur; uygulama uyarlanmıştır.",
          "Böyle bir kavramsal değişim yoktur.",
          "İnanç esaslarına ilişkin değişim verilmedi.",
          "Tek saat düzenlemesi bütün geleneklere ilişkin sonuç vermez.",
        ],
        commonError:
          "Değişen aracın veya düzenin temel ilkenin de değiştiğini kanıtladığını varsaymak.",
        check:
          "Değişti denilen şey saat; aynı kaldı denilen şey yardım amacı. İkisini karıştırma.",
      },
    },
    {
      passage:
        "Bir ders içtihadı, yetkinliğe dayanarak yeni durumlara ilişkin dinî yorumlama çabası diye açıklıyor.",
      prompt: "Bu açıklamadan hangisi çıkarılamaz?",
      options: [
        "Yeni durumların değerlendirilmesi söz konusudur.",
        "Yetkinlik kavramda önem taşır.",
        "Yorumlama bir çaba olarak ele alınır.",
        "Kişisel istek ile usullü yorum aynı şey değildir.",
        "Herkes istediği hükmü hiçbir dayanak olmadan üretebilir.",
      ],
      answer: 4,
      hint: "Tanımdaki yetkinlik koşulunu seçeneklerde koru.",
      explanation:
        "İçtihat açıklamasında yeni duruma ilişkin yorum için yetkinlik koşulu konuyor. Herkesin dayanaksız hüküm üretebileceği iddiası bu koşulu siler; açıklamadan çıkarılamayan sonuç odur. Kontrol: Olumsuz kökte tanımdaki yetkinlik ve dayanak koşulunu kaldıran ifadeyi ayır.",
      guidance: {
        knowledge: [
          "İçtihat kavramı uzmanlık ve usulle ilişkilidir; keyfî kişisel istekle aynı değildir.",
        ],
        strategy: "Tanımdaki yetkinlik koşulunu seçeneklerde koru.",
        steps: [
          "İçtihat açıklamasında yeni duruma ilişkin yorum için yetkinlik koşulu konuyor.",
          "Herkesin dayanaksız hüküm üretebileceği iddiası bu koşulu siler; açıklamadan çıkarılamayan sonuç odur.",
        ],
        optionReasons: [
          "Yeni durum açıklamanın doğrudan parçasıdır.",
          "Başlangıçta yetkinliğe dayanma koşulu verilmiştir.",
          "Tanım bunu açıkça bildirir.",
          "Koşullu tanım keyfî istekten bu farkla ayrılır.",
          "Bu seçenek yetkinlik ve gerekçeli yorum koşulunu silerek tanımı keyfîliğe çevirir.",
        ],
        commonError:
          "İçtihadı sınırsız ve gerekçesiz kişisel hüküm verme yetkisi sanmak.",
        check:
          "Olumsuz kökte tanımdaki yetkinlik ve dayanak koşulunu kaldıran ifadeyi ayır.",
      },
    },
    {
      passage:
        "Bir işletme çalışanların ücretlerini zamanında ödüyor, ürün ölçüsünü eksiltmiyor ve elde ettiği imkânın bir bölümünü ihtiyaç sahipleriyle paylaşıyor.",
      prompt: "Üç davranışı birlikte en iyi hangi çerçeve açıklar?",
      options: [
        "Hiç harcama yapılmaması",
        "Ölçüyü eksiltmenin teşvik edilmesi",
        "Bütün çalışanların aynı mesleği bırakması",
        "Yalnız en çok para biriktirme",
        "Ekonomik hayatta hak gözetme ve toplumsal sorumluluk",
      ],
      answer: 4,
      hint: "Üç fiili ayrı hak ve sorumlulukla eşleştir; yalnız biriktirmeye indirgeme.",
      explanation:
        "Ücretin zamanında ödenmesi çalışan hakkını, ölçünün korunması alışverişte dürüstlüğü gözetir. İhtiyaç sahipleriyle paylaşma toplumsal desteği ekler; üçünü birlikte ekonomik hayatta hak ve sorumluluk çerçevesi kapsar. Kontrol: Seçenek üç davranışın üçünü de anlamlandırmalı; yalnız birinin doğru adı yeterli değil.",
      guidance: {
        knowledge: [
          "Emek hakkı, dürüst alışveriş ve paylaşma ekonomik hayatta farklı sorumluluk ilişkileridir.",
        ],
        strategy:
          "Üç fiili ayrı hak ve sorumlulukla eşleştir; yalnız biriktirmeye indirgeme.",
        steps: [
          "Ücretin zamanında ödenmesi çalışan hakkını, ölçünün korunması alışverişte dürüstlüğü gözetir.",
          "İhtiyaç sahipleriyle paylaşma toplumsal desteği ekler; üçünü birlikte ekonomik hayatta hak ve sorumluluk çerçevesi kapsar.",
        ],
        optionReasons: [
          "Ücret ve paylaşım açık harcama örnekleridir.",
          "Metin ölçünün eksiltilmediğini söylüyor; bu ters yorumdur.",
          "Meslek bırakmaya ilişkin veri yoktur.",
          "Paylaşım ve ücret hakkı verilerini yeterince açıklamaz.",
          "Ücret, doğru ölçü ve paylaşımın üçü de bu geniş çerçevede açıklanır.",
        ],
        commonError:
          "Birden fazla ekonomik sorumluluğu tek para biriktirme amacına sıkıştırmak.",
        check:
          "Seçenek üç davranışın üçünü de anlamlandırmalı; yalnız birinin doğru adı yeterli değil.",
      },
    },
    {
      passage:
        "Bir kurum, kişilerin inancı nedeniyle eğitimden dışlanmaması gerektiğini savunuyor.",
      prompt: "Bu ifadeden hangi sonuç desteklenir?",
      options: [
        "Farklı inançlı kişiler hiçbir ortak alana giremez.",
        "Eğitim yalnız bir grubun ayrıcalığıdır.",
        "Bütün öğrenciler aynı notu almalıdır.",
        "Herkes aynı mesleği seçmek zorundadır.",
        "Eğitime erişim hakkı inanç ayrımıyla engellenmemelidir.",
      ],
      answer: 4,
      hint: "Korunan erişim hakkını zorunlu sonuç eşitliğinden ayır.",
      explanation:
        "Kurumun reddettiği işlem, kişiyi inancı nedeniyle eğitimden dışlamaktır. Bunun karşılığı eğitime erişimi inanç ayrımıyla engellememektir; herkesin aynı mesleği veya sonucu elde etmesi iddiası verilmemiştir. Kontrol: Cevap eğitim erişimi ve inanç ayrımı sınırında kalmalı; not veya meslek eklememeli.",
      guidance: {
        knowledge: [
          "Eğitim hakkı ve ayrımcılıktan korunma, herkesin aynı not veya mesleğe zorlanması demek değildir.",
        ],
        strategy: "Korunan erişim hakkını zorunlu sonuç eşitliğinden ayır.",
        steps: [
          "Kurumun reddettiği işlem, kişiyi inancı nedeniyle eğitimden dışlamaktır.",
          "Bunun karşılığı eğitime erişimi inanç ayrımıyla engellememektir; herkesin aynı mesleği veya sonucu elde etmesi iddiası verilmemiştir.",
        ],
        optionReasons: [
          "Bu, dışlamama ilkesinin tersidir.",
          "Metnin engellememe ve hak vurgusuna aykırıdır.",
          "Notların aynı olması hakkında bilgi verilmedi.",
          "Meslek tercihiyle ilgili zorunluluk yoktur.",
          "Bu sonuç cümlenin eğitim ve ayrımcılık kapsamını doğrudan korur.",
        ],
        commonError:
          "Eşit erişim hakkını sonuç ve tercihlerin zorla özdeşleştirilmesi sanmak.",
        check:
          "Cevap eğitim erişimi ve inanç ayrımı sınırında kalmalı; not veya meslek eklememeli.",
      },
    },
    {
      passage:
        "Bir kişi, komşusunun özel yazışmalarını izinsiz biçimde yayıyor. Kamu yararına gerekli bir bildirim veya izin koşulu verilmemiş.",
      prompt: "Öncelikle hangi hakla sorun vardır?",
      options: [
        "Özel yaşamın gizliliği",
        "Zorunlu tek meslek seçimi",
        "Herkesin aynı gelir hakkı",
        "Mimari eserlerin eşit boyda olması",
        "Bütün sanatların aynı malzemeyle yapılması",
      ],
      answer: 0,
      hint: "İzinsiz yayılan nesnenin kişisel yazışma olduğunu belirle.",
      explanation:
        "Yayılan içerik komşunun özel yazışmasıdır; izin veya gerekli kamu bildirimi koşulu yoktur. İzinsiz yayma öncelikle özel yaşamın gizliliğiyle çatışır. Başka biri hakkında her konuşma değil, bu özel içerik ve erişim koşulu belirleyicidir. Kontrol: İzin ve ilgili zorunlu bildirim koşulu verilmedi; gizlilik hakkı doğrudan etkileniyor.",
      guidance: {
        knowledge: [
          "Özel yaşamın ve paylaşılmak istenmeyen bilgilerin korunması mahremiyetle ilişkilidir.",
        ],
        strategy: "İzinsiz yayılan nesnenin kişisel yazışma olduğunu belirle.",
        steps: [
          "Yayılan içerik komşunun özel yazışmasıdır; izin veya gerekli kamu bildirimi koşulu yoktur.",
          "İzinsiz yayma öncelikle özel yaşamın gizliliğiyle çatışır. Başka biri hakkında her konuşma değil, bu özel içerik ve erişim koşulu belirleyicidir.",
        ],
        optionReasons: [
          "Kişisel yazışmaların izinsiz yayılması doğrudan mahremiyet alanına müdahaledir.",
          "Meslek seçimi konusu yoktur.",
          "Gelir eşitliği olayı açıklamaz.",
          "Eser boyutu ve mimariyle ilgili veri yoktur.",
          "Sanat malzemesi bu olayın hakkı değildir.",
        ],
        commonError:
          "Kişisel veriyi sadece bilgi olduğu için herkese açık saymak.",
        check:
          "İzin ve ilgili zorunlu bildirim koşulu verilmedi; gizlilik hakkı doğrudan etkileniyor.",
      },
    },
    {
      passage:
        "Bir metin, kişilerin düşüncelerini başkalarının haklarını gözeterek açıklayabilmesini vurguluyor.",
      prompt: "Hangi hak ön plandadır?",
      options: [
        "Herkesin aynı görüşü benimseme yükümlülüğü",
        "Özel veriyi izinsiz yayma zorunluluğu",
        "Belirli bir gelir düzeyinin garantisi",
        "Düşünce ve ifade özgürlüğü",
        "Her iddianın doğru sayılma hakkı",
      ],
      answer: 3,
      hint: "İstenen fiilin düşünce açıklama olduğuna bak; başka hakkın yerine koyma.",
      explanation:
        "Pasaj kişilerin düşüncelerini açıklayabilmesine odaklanıyor. Bu açıklamayı başkalarının haklarıyla birlikte ele alması düşünce ve ifade özgürlüğünü gösterir; sınırsız zarar verme yetkisi anlatılmıyor. Kontrol: Metin açıklama fiilini ve başkasının hakkı sınırını birlikte koruyor.",
      guidance: {
        knowledge: [
          "Düşünce ve ifade özgürlüğü, düşüncenin haklara saygı çerçevesinde açıklanmasıyla ilgilidir.",
        ],
        strategy:
          "İstenen fiilin düşünce açıklama olduğuna bak; başka hakkın yerine koyma.",
        steps: [
          "Pasaj kişilerin düşüncelerini açıklayabilmesine odaklanıyor.",
          "Bu açıklamayı başkalarının haklarıyla birlikte ele alması düşünce ve ifade özgürlüğünü gösterir; sınırsız zarar verme yetkisi anlatılmıyor.",
        ],
        optionReasons: [
          "Özgürce açıklama tek görüşe zorlama değildir.",
          "Haklara saygı koşulu izinsiz ifşayı zorunlu yapmaz.",
          "Gelir hakkında veri yoktur.",
          "Metin düşüncelerin açıklanmasını doğrudan koruyor.",
          "Düşünceyi ifade edebilmek iddianın doğruluğunu otomatik kanıtlamaz.",
        ],
        commonError:
          "İfade özgürlüğünü her iddianın doğru kabul edilmesiyle veya başkasının hakkını silmekle eşitlemek.",
        check:
          "Metin açıklama fiilini ve başkasının hakkı sınırını birlikte koruyor.",
      },
    },
    {
      passage:
        "Bir dayanışma çağrısı farklı görüşteki insanların ortak hakları korumasını ve ihtiyaç sahiplerine birlikte destek vermesini istiyor.",
      prompt: "Bu çağrıdan hangisi zorunlu olarak çıkmaz?",
      options: [
        "Ortak hakların korunması istenmektedir.",
        "Görüş farklılığı ile ortak iş birlikte bulunabilir.",
        "Herkes bütün konularda aynı düşünceyi zorla benimsemelidir.",
        "Dayanışma bir toplumsal sorumluluk olarak ele alınmaktadır.",
        "İhtiyaç sahiplerine birlikte destek önerilmektedir.",
      ],
      answer: 2,
      hint: "Birlikte yapılan işi, herkesin bütün düşüncelerinin özdeş olmasından ayır.",
      explanation:
        "Çağrı farklı görüştekilerin ortak haklar ve yardım amacıyla birlikte davranmasını istiyor. Herkesi bütün konularda aynı düşünceye zorlamak verilen farklı görüş koşulunu kaldırır; dayanışmadan zorunlu fikir özdeşliği çıkmaz. Kontrol: Metindeki farklı görüşteki ifadesi korunurken ortak yardım önerisi anlaşılabiliyor.",
      guidance: {
        knowledge: [
          "Ortak sorumluluk fikirlerin zorla tekleştirilmesiyle aynı şey değildir.",
        ],
        strategy:
          "Birlikte yapılan işi, herkesin bütün düşüncelerinin özdeş olmasından ayır.",
        steps: [
          "Çağrı farklı görüştekilerin ortak haklar ve yardım amacıyla birlikte davranmasını istiyor.",
          "Herkesi bütün konularda aynı düşünceye zorlamak verilen farklı görüş koşulunu kaldırır; dayanışmadan zorunlu fikir özdeşliği çıkmaz.",
        ],
        optionReasons: [
          "Bu doğrudan çağrının içeriğidir.",
          "Çağrı farklı görüşleri ve birlikte eylemi aynı örnekte birleştiriyor.",
          "Ortak hak ve yardım amacı, bütün düşüncelerin zorunlu özdeşliğini gerektirmez.",
          "Ortak hak ve yardım vurgusu bu sınırlı yoruma uygundur.",
          "Metin bu eylemi açıkça ister.",
        ],
        commonError:
          "Toplumsal birliği düşüncelerin zorla aynılaştırılması şeklinde yorumlamak.",
        check:
          "Metindeki farklı görüşteki ifadesi korunurken ortak yardım önerisi anlaşılabiliyor.",
      },
    },
    {
      passage:
        "Bir mahalle tarihî çeşmesini koruyor, gereksiz su kaybını azaltıyor ve engelli kişilerin ortak alana erişimini iyileştiriyor.",
      prompt: "Hangi alanlar birlikte ele alınmıştır?",
      options: [
        "Bütün insanların aynı mesleği seçmesi",
        "Yalnız musiki",
        "Yalnız bireyin iç inancı",
        "Kültürel miras, çevre ve haklar",
        "Yalnız para biriktirme",
      ],
      answer: 3,
      hint: "Her fiile bir alan yaz, sonra bütün alanları kapsayan seçeneği bul.",
      explanation:
        "Tarihî çeşmenin korunması kültürel miras, su kaybının azaltılması çevre alanıdır. Engelli kişilerin erişiminin iyileştirilmesi hak boyutunu ekler; uygun cevap bu üç alanı birlikte korur. Kontrol: Üç ayrı fiilin her biri sonucun içinde yer almalı; eksik alan varsa seçenek yetersizdir.",
      guidance: {
        knowledge: [
          "Mirası koruma, çevre kullanımı ve erişim hakkı farklı fiillerle temsil edilebilir.",
        ],
        strategy:
          "Her fiile bir alan yaz, sonra bütün alanları kapsayan seçeneği bul.",
        steps: [
          "Tarihî çeşmenin korunması kültürel miras, su kaybının azaltılması çevre alanıdır.",
          "Engelli kişilerin erişiminin iyileştirilmesi hak boyutunu ekler; uygun cevap bu üç alanı birlikte korur.",
        ],
        optionReasons: [
          "Meslek hakkında hiçbir veri yoktur.",
          "Hiçbir fiil ses veya ezgi üretimini anlatmıyor.",
          "Somut toplumsal düzenlemeler veriliyor; iç inanç tek konu değildir.",
          "Çeşmenin korunması mirasa, su kaybının azalması çevreye, erişim düzeni haklara karşılık gelir.",
          "Kültür ve erişim verileri bu dar çerçevede açıklanmaz.",
        ],
        commonError:
          "Birleşik örnekte yalnız bir fiili görüp diğer iki veriyi dışlamak.",
        check:
          "Üç ayrı fiilin her biri sonucun içinde yer almalı; eksik alan varsa seçenek yetersizdir.",
      },
    },
    {
      passage:
        "Bir metin, bazı toplumsal araç ve uygulamaların koşullara göre değişebildiğini söylüyor.",
      prompt: "Bu cümlenin kapsamını aşan yorum hangisidir?",
      options: [
        "En azından belirli uygulamalarda değişim mümkün görülür.",
        "Değişen nesnenin araç mı ilke mi olduğuna bakmak gerekir.",
        "Bütün temel inanç esasları her koşulda değişir.",
        "Bir araç değişimi tek başına bütün ilkeleri kaldırmaz.",
        "Koşul bilgisi uygulamanın değerlendirilmesinde önemlidir.",
      ],
      answer: 2,
      hint: "Bazı sözcüğünün öznesini ve kapsamını koru.",
      explanation:
        "Öncül yalnız bazı toplumsal araç ve uygulamaların koşula bağlı değişimini söylüyor. Bütün temel inanç esasları ifadesi hem bazı kapsamını büyütür hem toplumsal araçtan inanç esasına geçer; bu iki ekleme metni aşar. Kontrol: Yanlış yorumda hem bütün hem temel inanç esasları eklenmiştir; başlangıçta ikisi de söylenmiyor.",
      guidance: {
        knowledge: [
          "Bazı uygulamalar ifadesi bütün temel inanç kurallarını kapsayan evrensel iddia vermez.",
        ],
        strategy: "Bazı sözcüğünün öznesini ve kapsamını koru.",
        steps: [
          "Öncül yalnız bazı toplumsal araç ve uygulamaların koşula bağlı değişimini söylüyor.",
          "Bütün temel inanç esasları ifadesi hem bazı kapsamını büyütür hem toplumsal araçtan inanç esasına geçer; bu iki ekleme metni aşar.",
        ],
        optionReasons: [
          "Bazı uygulamalar değişebilir ifadesinin sınırlı anlamını korur.",
          "Özne ve kapsamı ayırmak cümleyi doğru yorumlamaya yardım eder.",
          "Bazı toplumsal uygulamalardan bütün temel esaslara geçerek hem özneyi hem kapsamı genişletir.",
          "Verilen sınırlı değişim bütün ilkeler hakkında kaldırma kanıtı değildir.",
          "Cümle koşullara göre değişim bağlantısını açıkça kurar.",
        ],
        commonError:
          "Bazıdan bütüne, uygulamadan temel esasa iki ayrı kanıtsız sıçrama yapmak.",
        check:
          "Yanlış yorumda hem bütün hem temel inanç esasları eklenmiştir; başlangıçta ikisi de söylenmiyor.",
      },
    },
  ],
];
export const forge023HumanitiesATopics: Record<string, string> =
  Object.fromEntries(guideSpecs023A.map((g) => [g.id, g.detail]));
export const forge023HumanitiesAGuides: LessonGuide[] = guideSpecs023A.map(
  ({ title: _title, detail: _detail, ...g }) => g,
);
export const forge023HumanitiesALessons: Lesson[] = guideSpecs023A.map(
  (g, p) => ({
    id: g.id,
    subjectId: "tyt-din",
    title: txt(g.title),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: cards023A[p].map((q, i) => ({
      id: `f023a-${g.id}-q${i + 1}`,
      skill: g.id,
      passage: txt(q.passage),
      prompt: txt(q.prompt),
      options: q.options.map(txt),
      answer: q.answer,
      hint: txt(q.hint),
      explanation: txt(q.explanation),
      guidance: q.guidance,
    })),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
  }),
);

function choice023A<T extends string>(
  value: unknown,
  choices: readonly T[],
): asserts value is T {
  if (typeof value !== "string" || !choices.includes(value as T))
    throw new RangeError("HUMANITIES023A_CHOICE");
}
function integer023A(
  value: unknown,
  min: number,
  max: number,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < min ||
    value > max
  )
    throw new RangeError("HUMANITIES023A_INTEGER");
}
function boolean023A(value: unknown): asserts value is boolean {
  if (typeof value !== "boolean")
    throw new RangeError("HUMANITIES023A_BOOLEAN");
}
export const conceptCases023A = {
  fitra: {
    label: "Fıtrat",
    context:
      "İslamî örnek, insanın doğuştan anlam arama ve inanmaya yatkın oluşunu anlatır. Henüz tüm ibadet kurallarını öğrendiği söylenmez.",
    evidence: "Doğuştan yatkınlık",
    kind: "Eğilim",
    detail:
      "Fıtrat yaratılış eğilimiyle ilişkilidir. Yatkınlık, ayrıntılı kuralların doğuştan eksiksiz bilinmesi demek değildir.",
    nodes: ["Yaratılış", "Eğilim", "Öğrenme"],
  },
  hanif: {
    label: "Haniflik",
    context:
      "Örnek metin Hz. İbrahim’le birlikte anılan, Allah’a ortak koşmadan tevhid yönelişini açıklar. Vurgu belirli inanç yönelişinin adındadır.",
    evidence: "İbrahim ve tevhid yönelişi",
    kind: "Yöneliş",
    detail:
      "Haniflik ortak koşmadan tevhide yönelişi anlatır. Genel yaratılış eğilimiyle aynı tanım değildir.",
    nodes: ["İbrahim", "Tevhit", "Yöneliş"],
  },
  tawhid: {
    label: "Tevhit",
    context:
      "Metin İslam inancında Allah’ın bir ve eşsiz yaratıcı olduğu kabulünü açıklar. Kişinin belirli bir ibadeti kaç defa yaptığı hakkında veri yoktur.",
    evidence: "Bir ve eşsiz yaratıcı",
    kind: "Birlik inancı",
    detail:
      "Tevhit birlik ve eşsizlik kabulüdür. Verilen önerme ibadet sayısı veya toplumsal alışkanlık hakkında değildir.",
    nodes: ["İnanç", "Birlik", "Eşsizlik"],
  },
  assent: {
    label: "Tasdik",
    context:
      "Özgün anlatıda kişi bir inancı gönülden kabul eder. Bu odakta, sözden ayrı olarak içten onay incelenir.",
    evidence: "İçten kabul",
    kind: "İç onay",
    detail:
      "Tasdik kalben onaylama boyutudur. Dışarıdan görülen tek eylem, kişinin bütün iç inancını kesin ölçmez.",
    nodes: ["İç kabul", "Tasdik", "Benimseme"],
  },
  declaration: {
    label: "İkrar",
    context:
      "Metin bir kişinin inancını sözle açıkladığı anı verir. Sorulan şey, kalpteki onaydan farklı olarak sözlü bildirimin adıdır.",
    evidence: "İnancı sözle bildirme",
    kind: "Sözlü ifade",
    detail:
      "İkrar inancın sözle ifade boyutudur. Söz ve ardından gelen fiil ayrı biçimde ele alınır.",
    nodes: ["İnanç", "Söz", "İkrar"],
  },
  action: {
    label: "Amel",
    context:
      "Özgün anlatıda kişi inancına bağlı eylemi yapmaya çalışır. Metin, sırf sözden farklı olarak eyleme yönelmeyi öne çıkarır.",
    evidence: "Davranışa yönelme",
    kind: "Eylem",
    detail:
      "Amel davranış ve uygulama boyutudur. Bir eylem, tüm gelecek eylemlerin aynı olacağı garantisi değildir.",
    nodes: ["Amaç", "Davranış", "Amel"],
  },
} as const;
export function concept023A(key: string) {
  choice023A(key, Object.keys(conceptCases023A));
  return conceptCases023A[key as keyof typeof conceptCases023A];
}
export const beliefTerms023A = {
  allah: { label: "Allah’a iman", group: "İman esası" },
  angels: { label: "Meleklere iman", group: "İman esası" },
  books: { label: "Kitaplara iman", group: "İman esası" },
  prophets: { label: "Elçilere iman", group: "İman esası" },
  afterlife: { label: "Ahirete iman", group: "İman esası" },
  destiny: { label: "Kadere iman", group: "İman esası" },
  shahada: { label: "Şehadet", group: "İslam’ın şartı" },
  prayer: { label: "Namaz", group: "İslam’ın şartı" },
  fast: { label: "Ramazan orucu", group: "İslam’ın şartı" },
  zakat: { label: "Zekât", group: "İslam’ın şartı" },
  hajj: { label: "Hac", group: "İslam’ın şartı" },
} as const;
export function beliefGroup023A(term: string) {
  choice023A(term, Object.keys(beliefTerms023A));
  return beliefTerms023A[term as keyof typeof beliefTerms023A];
}
export const worshipActions023A = {
  prayer: {
    label: "Beş vakit namaz",
    category: "Farzıayn",
    scope: "Özel kapsam",
    conditional: false,
    note: "Dersin genel görev koşulları saklıdır; bu örnek namazın bireysel sorumluluk yapısını açıklar.",
  },
  fasting: {
    label: "Ramazan orucu",
    category: "Farzıayn",
    scope: "Özel kapsam",
    conditional: false,
    note: "İlgili mazeret ve kolaylıklar saklıdır; uygulama kişisel sağlık veya dinî hüküm vermez.",
  },
  zakat: {
    label: "Zekât",
    category: "Farzıayn",
    scope: "Özel kapsam",
    conditional: true,
    note: "Maddi ve diğer görev şartları ayrıca gözetilir. Bir eylemin adı, o kişide şartların varlığına tek başına kanıt olmaz.",
  },
  hajj: {
    label: "Hac",
    category: "Farzıayn",
    scope: "Özel kapsam",
    conditional: true,
    note: "İmkân ve ilgili diğer koşullar önemlidir. Model tek bir öğretim koşulunu değiştirir; gerçek kişi hakkında hüküm vermez.",
  },
  funeral: {
    label: "Cenaze namazı",
    category: "Farzıkifaye",
    scope: "Özel kapsam",
    conditional: false,
    note: "Gerekli işin yeterince yapılması ortak görevin devamını belirler.",
  },
  witr: {
    label: "Vitir namazı",
    category: "Vacip (Hanefî)",
    scope: "Özel kapsam",
    conditional: false,
    note: "Vacip burada Hanefî terimiyle kullanılır. Her ekolde aynı ayrı sınıf olduğu söylenmez.",
  },
  extra: {
    label: "Kuşluk namazı",
    category: "Nafile / mendup",
    scope: "Özel kapsam",
    conditional: false,
    note: "Teşvik edilen ek ibadet, farz gibi zorunlu değildir; gönüllü oluşu değersiz olduğu anlamına gelmez.",
  },
  help: {
    label: "Komşuya yardım",
    category: "İyi davranış örneği",
    scope: "Geniş kapsam",
    conditional: false,
    note: "Yardım eylemi ve niyet ayrı veridir; görünen fiilden gizli amaç çıkmaz.",
  },
  rest: {
    label: "Uygun dinlenme",
    category: "Mubah örneği",
    scope: "Gündelik eylem",
    conditional: false,
    note: "Hak ihlali ve zarar olmayan örnek dinlenme serbestlik alanında ele alınır. Amaç ve koşul değişirse inceleme de değişebilir.",
  },
} as const;
export function worship023A(
  action: string,
  intent: string,
  conditions: boolean,
  done: boolean,
) {
  choice023A(action, Object.keys(worshipActions023A));
  choice023A(intent, ["devotion", "unknown", "display"]);
  boolean023A(conditions);
  boolean023A(done);
  const a = worshipActions023A[action as keyof typeof worshipActions023A];
  const intention =
    intent === "devotion"
      ? "Allah rızası amacı metinde açık."
      : intent === "display"
        ? "Gösteriş amacı metinde açık."
        : "Amaç bilgisi yok; niyet kesin değildir.";
  const condition = a.conditional
    ? conditions
      ? "Bu örnekte ilgili şartlar var."
      : "Bu örnekte ilgili şartlar yok."
    : action === "funeral"
      ? done
        ? "Gerekli görev yeterince yapılmış; bu ortak görev öteki kişilerden düşer."
        : "Gerekli görev henüz yapılmadı; ortak ihtiyaç sürer."
      : "Kişiye ilişkin genel sorumluluk şartları saklıdır.";
  return {
    ...a,
    action,
    intent,
    conditions,
    done,
    intention,
    condition,
    decision:
      a.scope === "Geniş kapsam" || a.scope === "Gündelik eylem"
        ? intent === "devotion"
          ? "Verilen amaçla kulluk bağı kurulur"
          : intent === "display"
            ? "Gösteriş amacı var"
            : "Niyet için veri eksik"
        : a.category,
    details: a.note + " " + intention + " " + condition,
  };
}
export function allocation023A(
  needA: number,
  needB: number,
  resource: number,
  method: string,
) {
  integer023A(needA, 0, 12);
  integer023A(needB, 0, 12);
  integer023A(resource, 0, 24);
  choice023A(method, ["need", "equal"]);
  const total = needA + needB,
    available =
      total === 0
        ? 0
        : method === "equal"
          ? resource
          : Math.min(resource, total);
  const a =
    total === 0
      ? 0
      : method === "equal"
        ? available / 2
        : available === total
          ? needA
          : (available * needA) / total;
  const b =
    total === 0
      ? 0
      : method === "equal"
        ? available / 2
        : available === total
          ? needB
          : (available * needB) / total;
  const unmetA = Math.max(0, needA - a),
    unmetB = Math.max(0, needB - b),
    overA = Math.max(0, a - needA),
    overB = Math.max(0, b - needB),
    unused = resource - available;
  const complete =
    total === 0 ||
    (method === "need"
      ? resource >= total
      : available / 2 >= Math.max(needA, needB));
  return {
    needA,
    needB,
    resource,
    method,
    total,
    a,
    b,
    unmetA,
    unmetB,
    overA,
    overB,
    unused,
    available,
    complete,
    decision:
      total === 0
        ? "İhtiyaç sıfır"
        : complete
          ? "İki ihtiyaç da karşılanır"
          : "Açık ihtiyaç kalır",
    limit:
      "Özgün saat modeli. Eşit payda ayrılan kaynak ikiye bölünür; ihtiyaç üstü pay olabilir. Oranda önce toplam ihtiyaç kadar kaynak kullanılır. İhtiyaç yoksa kaynak tutulur. Bu hesap her ahlaki olay için tek adalet kuralı değildir.",
  };
}
export function youth023A(talk: string, task: string) {
  choice023A(talk, ["quiet", "social"]);
  choice023A(task, ["kept", "missed", "unknown"]);
  const temperament =
    talk === "quiet" ? "Örnekte az konuşuyor." : "Örnekte çok konuşuyor.";
  const evidence =
    task === "kept"
      ? "Söz verdiği işi süresinde bitirmiş."
      : task === "missed"
        ? "Bu olayda söz verdiği işi yapmamış. Başka mazeret veya amaç bilgisi yok."
        : "Verilen görevi yapıp yapmadığı hakkında kayıt yok.";
  return {
    talk,
    task,
    temperament,
    evidence,
    context:
      "Özgün tek olay örneği: Deniz " +
      (talk === "quiet"
        ? "toplantıda az konuşuyor. "
        : "toplantıda çok konuşuyor. ") +
      evidence,
    decision:
      task === "kept"
        ? "Bu olayda görev bitti"
        : task === "missed"
          ? "Bu olayda görev aksadı"
          : "Görev için veri yok",
    explanation:
      "Konuşma biçimi iletişim eğilimi, görev fiili bu olay için veri sağlar. Biri, öteki boyutu veya kişinin tüm yaşamını kesin olarak vermez.",
  };
}
export const heritagePlaces023A = {
  mecca: {
    label: "Mekke",
    region: "Hicaz",
    lat: 21.42,
    lon: 39.83,
    trace: "Kâbe",
    role: "İbadet ve İslam’ın doğuş çevresi",
    note: "Kâbe için kent Mekke. Hicaz bölgesinde Medine’de yer alan Nebevî ile aynı yer değildir.",
  },
  medina: {
    label: "Medine",
    region: "Hicaz",
    lat: 24.47,
    lon: 39.61,
    trace: "Mescid-i Nebevî",
    role: "İbadet, eğitim ve toplumsal merkez",
    note: "Mescid-i Nebevî ve eğitimle ilişkili Suffe Medine için ele alınır. Birden fazla işlev tek binayı farklı şehirlerde yapmaz.",
  },
  jerusalem: {
    label: "Kudüs",
    region: "Kudüs ve çevresi",
    lat: 31.78,
    lon: 35.23,
    trace: "Mescid-i Aksâ",
    role: "Dinî ve tarihî hafıza",
    note: "Mescid-i Aksâ Kudüs ile ilişkilidir; Mescid-i Nebevî için kent Medine. Benzer mescit adları aynı konumu vermez.",
  },
  baghdad: {
    label: "Bağdat",
    region: "Şam ve Bağdat havzası",
    lat: 33.32,
    lon: 44.37,
    trace: "Hikmet Evi",
    role: "İlim, tercüme ve eğitim",
    note: "Hikmet Evi ilim ve çeviri, Nizamiye ise eğitimle ilişkilidir. Çeviri yeri ilk yazım yeri olmak zorunda değildir.",
  },
  samarkand: {
    label: "Semerkant",
    region: "Seyhun ve Ceyhun arası",
    lat: 39.65,
    lon: 66.96,
    trace: "İlim merkezleri",
    role: "İlim ve kültürel aktarım",
    note: "Semerkant ve Buhara ayrı şehirlerdir; Seyhun ve Ceyhun arası tarihî bölgeye bağlıdır. Aynı bölge, aynı çağ veya tek şehir demek değildir.",
  },
  agra: {
    label: "Agra",
    region: "Hint Alt Kıtası",
    lat: 27.18,
    lon: 78.01,
    trace: "Tac Mahal",
    role: "Babürlü mimarisi",
    note: "Tac Mahal için kent Agra; Agra bugün Hindistan içinde yer alır. Tarihî yönetim ile güncel ülke adı farklı bilgi türleridir.",
  },
  konya: {
    label: "Konya",
    region: "Anadolu",
    lat: 37.87,
    lon: 32.49,
    trace: "Mevlana ve Mesnevi",
    role: "Tasavvuf ve edebiyat",
    note: "Bu model Mevlana için iki ayrı yer bağı kurar: Anadolu hayatı ve Belh yöresinde doğum. Bir eserin etki alanı doğum yeriyle aynı olmak zorunda değildir.",
  },
  mostar: {
    label: "Mostar",
    region: "Balkanlar",
    lat: 43.34,
    lon: 17.81,
    trace: "Mostar Köprüsü",
    role: "Mimari ve ortak hafıza",
    note: "Köprü için kent Mostar; ülke Bosna ve Hersek. Ortak medeniyet başlığı bütün eserlerin aynı şehirde bulunduğu anlamına gelmez.",
  },
  edirne: {
    label: "Edirne",
    region: "Anadolu ve Balkanlar arası",
    lat: 41.68,
    lon: 26.56,
    trace: "Selimiye Camii",
    role: "Osmanlı mimarisi",
    note: "Selimiye için kent Edirne. Eser ve kent bağı gezi sorusunda durak listesiyle ayrıca kıyaslanır.",
  },
  cairo: {
    label: "Kahire",
    region: "Mısır",
    lat: 30.04,
    lon: 31.24,
    trace: "Ezher",
    role: "İbadet ve eğitim",
    note: "Ezher Kahire’yle ilişkilidir. Bağdat Hikmet Evi ile ortak ilim başlığı altında anılmaları aynı kurum veya aynı şehir olduklarını vermez.",
  },
  kairouan: {
    label: "Kayrevan",
    region: "Kuzey Afrika",
    lat: 35.68,
    lon: 10.1,
    trace: "Tarihî ilim ve kültür merkezi",
    role: "Dinî ve ilmî hayat",
    note: "Kayrevan Tunus’ta yer alır. Mısır ile Kuzey Afrika’nın aynı geniş başlıkta anılması bütün şehirlerin aynı yer olması demek değildir.",
  },
  granada: {
    label: "Granada",
    region: "Endülüs",
    lat: 37.18,
    lon: -3.6,
    trace: "Elhamra Sarayı",
    role: "Mimari ve sanat",
    note: "Granada için Türkçe tarihî ad Gırnata olarak verilir; Elhamra burada bulunur. Ortak sanat havzasına ait olmak, Agra veya Mostar’da bulunmak anlamına gelmez.",
  },
} as const;
export function heritage023A(place: string, route: string) {
  choice023A(place, Object.keys(heritagePlaces023A));
  choice023A(route, ["east", "west", "mixed"]);
  const p = heritagePlaces023A[place as keyof typeof heritagePlaces023A];
  const routes = {
    east: ["mecca", "medina", "agra", "samarkand"],
    west: ["granada", "mostar", "cairo", "kairouan"],
    mixed: ["medina", "edirne", "granada"],
  } as const;
  const stops = routes[route as keyof typeof routes] as readonly string[],
    included = stops.includes(place);
  return {
    ...p,
    place,
    route,
    stops: [...stops],
    included,
    x: 20 + (p.lon + 20) * 2.9,
    y: 20 + (55 - p.lat) * 4.5,
    decision: included ? "Durak listesinde var" : "Durak listesinde yok",
    limit:
      "Yaklaşık şehir yerleri enlem ve boylam ağına konur. Çizim siyasi sınır, ulaşım rotası veya kilometre ölçeği değildir. Listeler özgün öğretim turlarıdır; şehirdeki bütün eserlerin güncel erişimi hakkında garanti vermez.",
  };
}
export const arts023A = {
  architecture: {
    label: "Mimari",
    material: "Yapı ve mekân",
    clue: "Mekân kurma",
    steps: [
      "İhtiyaç ve mekân ilişkisini düşün.",
      "Taşıyıcı ve kullanım alanını ayır.",
      "Eseri kendi kültürü içinde incele.",
    ],
    note: "Şema özgün bir kemer çizimidir; belirli tarihî eserin veya mimarın planı değildir.",
  },
  literature: {
    label: "Edebiyat",
    material: "Dil ve anlatım",
    clue: "Dille anlam kurma",
    steps: [
      "Sözcük ve cümle düzenini oku.",
      "Duygu, düşünce veya olayı belirle.",
      "Yazar ve eser ilişkisini ayrıca öğren.",
    ],
    note: "Şema anlamın satırlar arasında aktarımını gösterir; tarihî şiir veya telifli eser aktarımı değildir.",
  },
  music: {
    label: "Musiki",
    material: "Ses ve ezgi",
    clue: "Ses düzeni",
    steps: [
      "Seslerin zaman içinde sırasını düşün.",
      "Ezgi ve ritim görevini ayır.",
      "Tarihî kullanım ile güncel sağlık iddiasını karıştırma.",
    ],
    note: "Çizim örnek ses dizisini temsil eder; tıbbi etki veya belirli makamın tam notası değildir.",
  },
  calligraphy: {
    label: "Hat",
    material: "Harf ve yazı",
    clue: "Güzel yazı",
    steps: [
      "Harf biçimi ve çizgisini ayır.",
      "Harflerin estetik düzenini incele.",
      "Yazı ile çevre süsünü ayrı tut.",
    ],
    note: "Şema yalnız kalemin değişen izini gösterir; gerçek Arap harfi, dinî metin veya tarihî üslup taklidi değildir.",
  },
  illumination: {
    label: "Tezhip",
    material: "Motif ve bezeme",
    clue: "İnce süsleme",
    steps: [
      "Sayfanın yazı ve kenarını ayır.",
      "Motifin tekrarı ve simetrisini izle.",
      "Bezeme görevini yazıdan ayrı adlandır.",
    ],
    note: "Motifler özgün öğretim çizimidir; belirli bir eserin aynısı değildir.",
  },
  marbling: {
    label: "Ebru",
    material: "Su, boya ve kâğıt",
    clue: "Yüzeyden aktarım",
    steps: [
      "Uygun su yüzeyinde boyayı düzenle.",
      "Deseni yüzeyde oluştur.",
      "Deseni kâğıda aktar.",
    ],
    note: "Vektörlü yüzey deseni süreç şemasıdır; gerçek sıvı fiziği modeli değildir.",
  },
  miniature: {
    label: "Minyatür",
    material: "Küçük ayrıntılı tasvir",
    clue: "Kitap resmi",
    steps: [
      "Olay veya ortam tasvirini belirle.",
      "Şekillerin düzenini incele.",
      "Tasviri yazı ve kenar süsünden ayır.",
    ],
    note: "Özgün küçük bahçe tasviri belirli tarihî resmin kopyası değildir.",
  },
} as const;
export function art023A(kind: string, stage: number) {
  choice023A(kind, Object.keys(arts023A));
  integer023A(stage, 0, 2);
  const a = arts023A[kind as keyof typeof arts023A];
  return {
    ...a,
    kind,
    stage,
    visible: a.steps.slice(0, stage + 1),
    decision: a.label,
  };
}
export function water023A(needed: number, waste: number, recovery: number) {
  integer023A(needed, 0, 60);
  integer023A(waste, 0, 40);
  integer023A(recovery, 0, 100);
  const gross = needed + waste,
    reused = (waste * recovery) / 100,
    fresh = gross - reused,
    remaining = 100 - fresh;
  return {
    needed,
    waste,
    recovery,
    gross,
    reused,
    fresh,
    remaining,
    decision:
      waste === 0
        ? "Önlenebilir kayıp yok"
        : recovery === 0
          ? "Kayıp geri alınmıyor"
          : recovery === 100
            ? "Kaybın tamamı geri alınıyor"
            : "Kaybın bir bölümü geri alınıyor",
    limit:
      "Başta 100L su vardır. Girdiler tam sayı litre ve yüzdedir; bu özgün bir öğretim hesabıdır. Geri kazanılan önlenebilir kayıp uygun teknik koşulda aynı işte dış suyun yerini alıyor. Gerçek arıtma ve suyun sağlığa uygun oluşu bu veriden çıkmaz.",
  };
}
export const humanitiesADefaults023 = {
  concept: "fitra",
  term: "destiny",
  action: "prayer",
  intent: "unknown",
  conditions: true,
  done: false,
  needA: 2,
  needB: 6,
  resource: 8,
  method: "equal",
  talk: "quiet",
  task: "kept",
  place: "medina",
  route: "mixed",
  art: "illumination",
  stage: 0,
  needed: 40,
  waste: 20,
  recovery: 0,
  selected: 0,
  guess: "",
  reason: "",
  compared: false,
  show: false,
};
