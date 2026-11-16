import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
export interface Guidance022 { knowledge: string[]; strategy: string; steps: string[]; optionReasons: string[]; commonError: string; check: string; }
export interface GuidedQuestion022 extends Question { guidance: Guidance022; }
const guideSpecs022: (LessonGuide & { title: string; subjectId: string })[] = [
  {
    "id": "paragrafta-anlatim-bicimleri",
    "subjectId": "tyt-turkce",
    "title": "Paragrafta anlatım biçimleri",
    "minutes": 100,
    "objectives": [
      "Konu ile anlatımın amacını ve kuruluş biçimini ayır.",
      "Öyküleme, betimleme, açıklama ve tartışmayı tam metnin işleviyle belirle.",
      "Aynı paragrafta kullanılan biçimleri baskın amaçtan ayır.",
      "Tanımlama, örnek ve verinin destek işlevini biçimin yerine koymadan değerlendir."
    ],
    "sections": [
      {
        "title": "Ne anlatılıyor, nasıl anlatılıyor?",
        "paragraphs": [
          "Konu, metnin üzerinde durduğu şeydir; anlatım biçimi ise bunun hangi amaç ve örgüyle sunulduğudur. Aynı atölye bir olayın geçtiği yer olarak anlatılabilir, görünüşü betimlenebilir, çalışma düzeni açıklanabilir veya korunması gerektiği savunulabilir. Atölye sözcüğünün değişmemesi, dört metnin aynı işi yaptığını göstermez.",
          "İlk okumada konuyu bir söz grubuyla, amacı ise bir cümleyle söyle. Yazar bir olayın değişimini mi izletiyor, bir görünüşü mü canlandırıyor, bir işleyişi mi öğretiyor, yoksa bir görüşü mü savunuyor? Bu sorular biçimleri ayırmanın başlangıcıdır. Sonucu tek bir kelime yerine metindeki gerçek işlevle destekle."
        ]
      },
      {
        "title": "Öyküleme: başlangıçtan yeni duruma",
        "paragraphs": [
          "Öyküleyici anlatımda kişi, olay, zaman ve mekân unsurları bir değişim örgüsü içinde ilişki kurar. “Ece kutuyu açtı, eksik parçayı buldu ve modeli tamamladı.” dizisinde son durum ilk durumdan farklıdır. Eylemleri yalnız listelemek yerine onların birbirini nasıl ilerlettiğini görmek gerekir.",
          "Her öyküde olayların kronolojik sırayla sunulması zorunlu değildir; geriye dönüş veya önden bilgi verme de bulunabilir. Önemli olan anlatılan bir olay örgüsünün kurulmasıdır. Öğrenme aşamasında olayları gerçekleşme sırasıyla kısa oklar hâline getirmek, anlatımın değişimini fark etmeyi kolaylaştırır."
        ]
      },
      {
        "title": "Kişi, zaman ve mekânın görevi",
        "paragraphs": [
          "Kişi eylemi yapan veya yaşayanı, zaman olayın hangi koşul ve sırada geçtiğini, mekân ise olayın alanını belirler. Bazen kişi açıkça adlandırılmaz veya zaman yalnız sabah gibi bir işaretle verilir. Unsurların varlığı, adlarının mutlaka ayrı birer cümlede yazılmasını gerektirmez.",
          "Bir portrede kişi, tarih kitabında zaman, katalogda mekân bulunabilir. Bunların tek tek bulunması öykülemeyi kesinleştirmez. Kişi ve ortam bilgilerini olayın ilerlemesine bağlayan yapıyı ara. “Ada kısa saçlıydı.” kişi tanıtır; “Ada kapıyı açıp bahçeye çıktı.” gerçekleşen değişimi anlatır."
        ]
      },
      {
        "title": "Açıklayıcı ve sanatsal öyküleme",
        "paragraphs": [
          "Açıklayıcı öyküleme bir olayın nasıl gerçekleştiğini bilgi vermek amacıyla aktarabilir; sanatsal öyküleme ise yaşantı, duygu ve kurmaca etkiyi öne çıkarabilir. Bir haberin olay sırasıyla bir öykünün olay sırası arasında ortak örgü bulunabilir. Metin türü ile anlatım biçimi aynı sınıflama değildir.",
          "Bu nedenle yalnız roman yazdığı için her cümleyi öyküleme, yalnız haber olduğu için bütün metni açıklama sayma. Bir romanda uzun betimleme; bir haberde olay zinciri bulunabilir. Soru belirli paragrafı soruyorsa o paragrafın nasıl kurulduğunu göster, kitabın türünü cevap yerine koyma."
        ]
      },
      {
        "title": "Betimleme: aynı anın özellikleri",
        "paragraphs": [
          "Betimleyici anlatım kişi, nesne veya yerin niteliklerini okurun zihninde canlandırır. “Kutunun kapağı mat, köşeleri yuvarlak, yüzeyi çizikliydi.” ifadesinde bir nesnenin aynı anda görülen özellikleri verilir. Bir olay zinciri kurmak yerine nesnenin görünüşü veya duyusal etkisi öne çıkar.",
          "Betimlemede görme önemli olabilir; ses, koku, dokunma ve tat ayrıntıları da kullanılabilir. Ancak bütün duyuların aynı paragrafta bulunması zorunlu değildir. İki görsel özellik verilmişken bütün duyulara seslenildiği sonucu ekleme. Hangi ayrıntının hangi duyuya karşılık geldiğini metinden tek tek göster."
        ]
      },
      {
        "title": "Nesnel ve izlenimsel betimleme",
        "paragraphs": [
          "Nesnel betimleme gözlenebilir özellikleri kişisel duygu yorumunu azaltarak aktarabilir. “Üç raf, dar bir pencere ve beyaz bir masa vardı.” örneği görünüşü bilgiyle kurar. İzlenimsel veya sanatsal betimleme ise yazarın seçimi, benzetmesi ve duygusal izlenimiyle aynı ortamı farklı bir etkiye açabilir.",
          "Nesnel dil kullanılması betimlemeyi kendiliğinden açıklamaya dönüştürmez. İkisini ayırırken öznel mi sorusundan önce ne yapılıyor sorusunu sor. Laboratuvarın rengini ve yerleşimini göstermek betimlemedir; cihazın hangi ilkeyle ölçtüğünü öğretmek açıklamadır. Aynı konu farklı işlevler taşıyabilir."
        ]
      },
      {
        "title": "Portre: kişinin dışı ve iç dünyası",
        "paragraphs": [
          "Bir kişinin fiziksel veya ruhsal özelliklerinin betimlenmesi portre olarak adlandırılır. Boy, yüz ve kıyafet dış görünüşü; çekingenlik, sabır veya duygusal eğilimler ise ruhsal yönü gösterebilir. Bazı metinler ikisini birlikte işleyebilir, fakat birinin bulunması diğerini zorunlu kılmaz.",
          "Kişinin bir davranışını anlatmak bazen ruhsal niteliğini sezdirebilir; bu durumda doğrudan verilenle yorum yoluyla çıkarılanı ayır. “Kapıyı açtı.” tek başına kalıcı kişilik tanımı değildir. Portre sorusunda hangi özelliklerin metinde gerçekten yer aldığını belirle; her eylemi değişmez ruhsal sıfat yapma."
        ]
      },
      {
        "title": "Açıklama: kavramı veya işleyişi öğret",
        "paragraphs": [
          "Açıklayıcı anlatım bir konuyu anlamamızı sağlayacak bilgi sunar. Bir kavramın tanımı, bir sürecin aşamaları veya bir ilişkinin gerekçesi açıklamanın parçası olabilir. “Filtre, sıvıdaki belirli parçacıkları ayırır; gözenek boyu hangi parçaların tutulacağını etkiler.” ifadesi işleyiş öğretir.",
          "Açıklayıcı metin genellikle açık ve anlaşılır olmayı amaçlar; fakat tek bir süslü sözcük bulunması bu amacı otomatik değiştirmez. Sayısal veri de zorunlu değildir. Metni okuyunca hangi kavramı veya nasıl işleyen bir ilişkiyi öğrendiğini söyleyebiliyorsan açıklamanın somut işlevini göstermiş olursun."
        ]
      },
      {
        "title": "Süreç anlatımı ile yaşanan olay",
        "paragraphs": [
          "Bir sürecin zaman içinde aşamalarının bulunması onu her kullanımda öyküleme yapmaz. “Su ısı alınca buharlaşır.” ifadesi belirli bir kişinin başından geçen olayı anlatmaktan çok genel bir oluşu öğretir. Buna karşılık “Kabı ısıttım; bir süre sonra kapak açıldı ve su masaya döküldü.” belirli bir olay dizisi kurabilir.",
          "Kararı yalnız önce ve sonra sözcüklerine bağlama. Soruda genel işleyiş mi yoksa yaşanan olayın gelişimi mi öne çıkıyor? İki metnin eylemleri benzer görünse bile anlatım amacı farklı olabilir. Açıklamanın ne öğrettiğini, öykülemenin hangi durumu değiştirdiğini ayrı cümlelerle göster."
        ]
      },
      {
        "title": "Tartışma: bir görüşü gerekçeyle savun",
        "paragraphs": [
          "Tartışmacı anlatım bir görüşü benimsetmeye, itirazı karşılamaya veya başka görüşün yetersizliğini göstermeye yönelir. “Bu alan yalnız süs değildir; çocukların birlikte üretmesine de imkân verir, bu yüzden korunmalıdır.” ifadesi bir değerlendirmeyi gerekçelendirir. Metnin omurgası bir tezi savunmadır.",
          "Karşı görüş açıkça alıntılanabilir veya bağlamdan sezdirilebilir; her zaman oysa sözcüğüyle başlaması gerekmez. Ancak yalnız öznel bir beğeni veya soru cümlesi görmek tartışmayı kesinleştirmez. Savunulan yargıyı ve onu taşıyan gerekçeyi bul; varsa karşıt yargıyla hangi noktada çatıştığını göster."
        ]
      },
      {
        "title": "Açıklama ile tartışmayı karşılaştır",
        "paragraphs": [
          "Bir yazar iki yöntemin nasıl işlediğini taraf tutmadan öğretirse açıklayıcı bir karşılaştırma kurabilir. Aynı bilgileri yöntemlerden birinin mutlaka seçilmesi gerektiğini savunmak için kullanırsa tartışmacı örgü öne çıkabilir. Bilgi vermek ile görüş savunmak aynı paragrafta birlikte de bulunabilir.",
          "Bu durumda bilgi cümlelerinin metinde hangi görevi yaptığına bak. Bir savın dayanağı mı oluyor, yoksa asıl amaç o bilgiyi öğretmek mi? Sadece paragrafın son cümlesinde bir öneri bulunması bütün metni otomatik tek biçim yapmaz; önerinin diğer cümlelerle kurduğu düzeni ve soru kökünün istediğini birlikte değerlendir."
        ]
      },
      {
        "title": "Biçim ve düşünceyi geliştirme yolu",
        "paragraphs": [
          "Anlatım biçimi metnin genel kuruluş ve iletişim amacını; düşünceyi geliştirme yolu ise bu amacı destekleyen aracı belirtir. Tanım, örnek, karşılaştırma, tanık sözü, sayısal veri veya benzetme açıklayıcı bir metinde de tartışmacı bir metinde de kullanılabilir. Araç, amaçla aynı sınıflama değildir.",
          "Bir kavram tanımlanıyorsa tanımlama kullanıldığını söyleyebilirsin; fakat baskın anlatım biçimi sorulduğunda tanımın hangi bütüne hizmet ettiğine bak. Sayı görüldüğünde açıklama, alıntı görüldüğünde tartışma diye otomatik seçim yapma. Önce amaç, ardından onu destekleyen yöntem sırasını kullan."
        ]
      },
      {
        "title": "Metin türü ile anlatıcıyı karıştırma",
        "paragraphs": [
          "Deneme, makale, hikâye ve gezi yazısı gibi metin türleri farklı bir sınıflamadır. Kahraman anlatıcı, gözlemci anlatıcı veya başka bakış açıları da anlatım biçiminden ayrı sorulardır. Birinci kişiyle anlatılan bir paragrafın mutlaka öyküleme olması gerekmez; kişi kendi görüşünü tartışabilir.",
          "Soru kökünde hangi eksenin istendiğini önce belirle. “Kim anlatıyor?” ile “Hangi amaçla ve nasıl örgülenmiş?” sorularını aynı cevaba sıkıştırma. Bu ayrım bir paragrafta kişi, zaman veya görüş kelimelerini tek başına etiket sanmayı önler. Cevabını istenen sınıflamanın terimleriyle ver."
        ]
      },
      {
        "title": "Kullanılanlar ile baskın olan",
        "paragraphs": [
          "Bir paragraf önce ortamı betimleyip sonra olayları ilerletebilir. Böyle bir metinde betimleme ve öyküleme birlikte bulunur; soru kullanılan biçimleri istiyorsa ikisi de dikkate alınır. Ağır basan veya baskın biçim sorusu ise metnin ana işlevini ve örgüleyici yönünü ister.",
          "Baskınlığı yalnız cümle sayısına indirgeme. Kısa bir sav, önceki bilgi ve örneklerin hangi amaçla verildiğini belirleyebilir. Cümlelere olay, nitelik, bilgi ve sav işlevleri yazmak yardımcı bir öğrenme aracıdır; otomatik oy sayma yöntemi değildir. Bütünün hangi işi yaptığına geri dön."
        ]
      },
      {
        "title": "Bir eylemi bildirmek o bilgiyi öğretmek değildir",
        "paragraphs": [
          "“Rehber arşivin nasıl korunduğunu açıkladı.” cümlesi açıklama eyleminin gerçekleştiğini söyler; koruma yönteminin kendisini okura öğretmez. Bu cümle olay dizisinde yer alabilir. Buna karşılık “Nem sabit tutulur; belgeler ışıktan korunur.” gibi ilişkiler gerçekten açıklandığında okur yöntem bilgisi edinir.",
          "Açıkladı, anlattı veya betimledi fiilini anlatım biçiminin kesin anahtarı sayma. Metinde yapılan işi, metnin başka bir kişinin yaptığı işi haber vermesinden ayır. Kontrol sorusu şudur: Okur, bu paragraftan sözü edilen bilgi veya özellikleri gerçekten öğreniyor mu, yoksa yalnız bir konuşmanın yapıldığını mı öğreniyor?"
        ]
      },
      {
        "title": "Yan yana kanıtlarla ele",
        "paragraphs": [
          "Bir paragrafı sınıflandırırken iki ayırt edici kanıt seç. Öyküleme için başlangıç-sonuç değişimi ve olay bağı; betimleme için aynı an nitelikleri ve canlandırma; açıklama için öğrenilen kavram ve ilişki; tartışma için sav ve dayanak birlikte düşünülebilir. İkinci kanıt tek sözcüğe aşırı güvenmeyi azaltır.",
          "Kanıtı seçtikten sonra en yakın başka biçimin neden yeterli olmadığını açıkla. Bir kişinin geçmesi portre de olabilir; bir bilgi cümlesi savın desteği de olabilir. Cevap kontrolünde kendi seçeneğini tekrar etmek yerine iki metin ayrıntısını göster. Böylece biçim adını ezberden değil gerekçeyle kullanırsın."
        ]
      },
      {
        "title": "Olumsuz kök ve kapsam",
        "paragraphs": [
          "Kullanılmamıştır, yoktur veya söylenemez gibi kökler metinde dayanağı bulunmayan özelliği aratır. Ağır basan ile kullanılan aynı soru değildir. Önce kökün istediğini görünür kıl, sonra her seçeneği kendi kanıtıyla denetle. Doğru bir bilgiyi tanımak tek başına doğru seçeneği işaretlediğini göstermez.",
          "Metinde bir duyunun ayrıntısını bulduğunda bütün duyulara seslenildiğini, bir nitelik bulduğunda bütün metnin betimleme olduğunu ekleme. Bazı ve bütün kapsamları farklıdır. İstenen özellik gerçekten desteklenmiyorsa bunu metinden çıkarılamaz diye ayır; her koşulda yanlış olduğunu ileri sürme."
        ]
      },
      {
        "title": "Yeni metne aktar",
        "paragraphs": [
          "Öğretim modelinde aynı atölye konusu dört farklı amaçla anlatılır. Bir seçimde olayın aşamaları, diğerinde aynı an özellikleri, başka birinde işleyiş veya sav-gerekçe haritası görünür olur. Bu model hazırlanmış tam metinleri inceler; her Türkçe paragrafı kendiliğinden çözen genel bir dil çözümleyicisi değildir.",
          "Örneği anladıktan sonra yeni bir nesne veya yer seçip iki farklı biçimde kısa paragraf yaz. Ardından metinlerin konusunu aynı, örgüleyici işlevini farklı cümlelerle açıkla. Aynı metnin cevabını hatırlamakla yeni metni gerekçeyle çözmek farklıdır; aktarımı gerçekten farklı bağlamda denemek gerekir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Aynı yerde değişen olay",
        "prompt": "“Ada anahtarı buldu, atölyenin kapısını açtı ve içeride kalan kediyi dışarı çıkardı.” Metnin kuruluşunda hangi işlev öne çıkar?",
        "strategy": "Kişinin bulunmasıyla yetinme; başlangıç ve sonucu karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Başta kapı kapalı ve kedi içeride; sonda kapı açılmış ve kedi dışarı çıkmıştır."
          },
          {
            "label": "2. adım",
            "explanation": "Bulma, açma ve çıkarma birbirini ilerleten belirli eylemler olarak bağlanır."
          },
          {
            "label": "3. adım",
            "explanation": "Anlatımın omurgası durumun zaman içinde değişmesi olduğundan öyküleme öne çıkar."
          }
        ],
        "answer": "Öyküleyici anlatım.",
        "check": "Eylem sırası değişirse olayın anlamı da değişiyor mu, yeniden oku.",
        "pitfall": "Tek fiil görmeyi her metin için yeterli ölçüt sayma."
      },
      {
        "title": "Hareket bildiren durum",
        "prompt": "“Masanın üstündeki lamba sarı ışık veriyor, dar pencere bahçeye bakıyordu.” Burada olay zinciri mi, görünüş mü kuruluyor?",
        "strategy": "Fiillerin olay ilerletip ilerletmediğini denetle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İki yüklem aynı ortamın eşzamanlı özelliklerini anlatıyor; yeni bir sonuç durumu kurulmamış."
          },
          {
            "label": "2. adım",
            "explanation": "Işık ve pencere yönü, okurun zihninde ortamı canlandıran ayrıntılardır."
          },
          {
            "label": "3. adım",
            "explanation": "Veriyor ve bakıyordu sözcüklerine rağmen ana işlev görünüşü kurmadır; betimleme seçilir."
          }
        ],
        "answer": "Betimleyici anlatım.",
        "check": "İki özelliği aynı sahnede gösterebildiğini kontrol et.",
        "pitfall": "Fiilin varlığını zaman içinde olay gelişimiyle özdeşleştirme."
      },
      {
        "title": "Bilgi savın dayanağı olabilir",
        "prompt": "“Bahçenin yalnız süs olduğu söyleniyor. Oysa burada çocuklar sebze yetiştirip paylaşmayı öğreniyor; bu alan korunmalıdır.” Ana amaç nedir?",
        "strategy": "Karşı görüşü ve yazarın kendi savını ayrı yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Karşı görüş bahçenin yalnız süs olduğudur; yazar bu değerlendirmenin eksik olduğunu ileri sürer."
          },
          {
            "label": "2. adım",
            "explanation": "Sebze yetiştirme ve paylaşma bilgisi korunma önerisine gerekçe olarak sunulmuştur."
          },
          {
            "label": "3. adım",
            "explanation": "Bilgi cümlesi bulunmasına rağmen örgü görüş savunmaya yöneliktir; tartışma öne çıkar."
          }
        ],
        "answer": "Tartışmacı anlatım.",
        "check": "Gerekçenin hangi savı desteklediğini tam cümleyle belirt.",
        "pitfall": "Bir bilgi cümlesi bulundu diye bütün paragrafı otomatik açıklama sayma."
      },
      {
        "title": "Açıkladı sözcüğünün sınırı",
        "prompt": "“Rehber içeri girdi, haritayı açtı ve yolların nasıl çizildiğini açıkladı.” Okur yolların çizim yöntemini bu metinden öğrenmiş midir?",
        "strategy": "Bir açıklama eylemini bildirmekle bilgiyi açıklamayı ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Metin rehberin art arda yaptığı işleri anlatıyor; çizim yönteminin kendisi verilmemiş."
          },
          {
            "label": "2. adım",
            "explanation": "Okur yalnız açıklama yapıldığını biliyor; hangi ilkeyle yol çizildiğini öğrenmiyor."
          },
          {
            "label": "3. adım",
            "explanation": "Belirli eylemlerin ilerleyişi öyküleyici örgüyü taşır; açıkladı fiili tek başına açıklama biçimini kanıtlamaz."
          }
        ],
        "answer": "Hayır; verilen metin esas olarak olay dizisidir.",
        "check": "Paragraftan gerçek çizim kuralı yazabiliyor musun, denetle.",
        "pitfall": "Bir fiilin adını anlatım biçiminin kesin etiketi gibi kullanma."
      }
    ],
    "recall": [
      {
        "prompt": "Anlatım biçimi ile konu nasıl ayrılır?",
        "answer": "Konu ne anlatıldığını; biçim, hangi amaç ve örgüyle anlatıldığını belirtir."
      },
      {
        "prompt": "Bir sıfat neden tek başına betimleme kanıtı değildir?",
        "answer": "Açıklama ve tartışma da sıfat kullanabilir; bütünün canlandırma işlevine bakılır."
      },
      {
        "prompt": "Açıkladı fiili açıklama biçimini garanti eder mi?",
        "answer": "Hayır; yalnız bir konuşma eylemini haber verebilir, yöntem bilgisi okura sunulmamış olabilir."
      },
      {
        "prompt": "Baskınlık yalnız cümle sayısı mıdır?",
        "answer": "Hayır; metnin örgüleyici amacı ve gerekçe bağları belirleyicidir."
      }
    ],
    "source": "Aurelia YKS Türkçe ilgili kopya kâğıdı, OGM paragrafta anlam ders notları ve MEBİ Türkçe konu özetiyle karşılaştırılmış özgün anlatım ve örnekler. Sorular bu uygulama için yazılmıştır; resmî sınav sorusu değildir."
  },
  {
    "id": "ronesans-felsefesi",
    "subjectId": "tyt-felsefe",
    "title": "Rönesans felsefesi",
    "minutes": 100,
    "objectives": [
      "Yeniden doğuşun tarihsel bağlamını çoklu etkenlerle açıkla.",
      "Hümanizmi insanın eğitimi ve klasik metin okumasıyla ilişkilendir.",
      "Filolojik inceleme ile kaynağa koşulsuz itaati ayır.",
      "Süreklilik ve dönüşümü dönemlerin bütün insanlarını özdeşleştirmeden karşılaştır."
    ],
    "sections": [
      {
        "title": "Yeniden doğuş neyi anlatır?",
        "paragraphs": [
          "Rönesans sözü yeniden doğuş anlamıyla Antik Yunan ve Roma kültürüne artan ilgiyi ifade eder. Avrupa’da özellikle 14–16. yüzyıllarda güçlenen sanat, eğitim ve düşünce dönüşümleriyle ilişkilidir. Tek bir günde başlayan, bütün coğrafyada aynı hızla ilerleyen olay değil; farklı alanlarda gelişen uzun bir süreçtir.",
          "Bu ders sürecin kültürel zemini ve metinlerle ilişkisini öğretir. Sonraki 15–17. yüzyıl başlığı bilimsel yöntem, Descartes ve hukuk tartışmalarını ayrıca ayrıntılandırır. Aralarında bağ bulunması ikisini aynı kısa ders yapmaz. Önce yeniden yorumlama ve insanın eğitimi sorusunu kurmak, sonraki yöntem tartışmalarını anlamayı kolaylaştırır."
        ]
      },
      {
        "title": "İtalya’dan farklı merkezlere",
        "paragraphs": [
          "İtalya’daki kent yaşamı, ekonomik hareketlilik, sanat koruyuculuğu ve klasik mirasa ilgi dönüşümün önemli koşulları arasındadır. Zamanla Avrupa’nın farklı bölgelerinde değişik biçimler kazanır. Bir bölgenin öncülüğü, başka bölgelerde hiç üretim veya düşünce olmadığı anlamına gelmez.",
          "Tarihsel bir haritada merkez ve aktarım yolları göstermek ilişkiyi anlamaya yardım edebilir; gösterilmeyen her yerin etkisiz olduğunu kanıtlamaz. Dönüşümün farklı hızını ve yerel koşullarını dikkate al. Tek bir ülke veya bir sanatçı adı bütün sürecin tek nedeni yerine kullanılamaz."
        ]
      },
      {
        "title": "Çeviri metne erişimi değiştirir",
        "paragraphs": [
          "Antik ve Orta Çağ metinleri Yunanca, Süryanice, Arapça ve Latince gibi diller arasında aktarılmıştır. Toledo, Sicilya ve Salerno gibi merkezler farklı bilgi alanlarının dolaşımında önemlidir. Çeviri sayesinde daha önce doğrudan okuyamayan insanlar başka birikimlere ulaşabilir.",
          "Bu hareketleri yalnız 12. yüzyılda bir kişinin başlattığı tek olay diye sınırlama. Daha önceki ve sonraki aktarımlar da vardır; çeviri yeni kavramları ve yorum sorunlarını beraberinde getirir. Erişim sağlanması ile metindeki her görüşün doğru kabul edilmesi farklı aşamalardır. Öğrenci bu iki aşamanın nasıl bağlandığını açıkça göstermelidir."
        ]
      },
      {
        "title": "Antik mirasın yeni yorumları",
        "paragraphs": [
          "Rönesans’ta klasik kaynaklara yönelmek Platon veya Aristoteles’in bütün görüşlerini değiştirmeden tekrarlamak değildir. Aynı metin yeni sorularla okunabilir, farklı yorumlarla karşılaştırılabilir ve eleştirilebilir. Böylece geçmiş birikim yeni düşüncenin malzemesi hâline gelir.",
          "Bir eski kavramın yeniden kullanılması onun eski bağlamının bütünüyle korunduğunu göstermez. Metin hangi yeni probleme cevap vermek için okunuyor? Hangi görüş kabul ediliyor, hangisi değiştiriliyor? Bu sorular süreklilik ile özgün katkının aynı anda nasıl bulunabileceğini açıklar."
        ]
      },
      {
        "title": "Filoloji: dil, nüsha ve bağlam",
        "paragraphs": [
          "Filolojik inceleme metnin dilini, sözcüklerinin tarihsel anlamını ve farklı nüshalarını karşılaştırmayı içerir. İki nüshada bir kelimenin farklı olması, yazarın ne söylediği konusunda yeni bir soru doğurabilir. Yalnız bir metnin eski oluşu onun güvenilir biçimde okunmuş olduğunu göstermez.",
          "Özgün bir örnekte iki eski kayıttan biri koşul bildiren bir sözcük içeriyor, diğeri içermiyorsa sonuçların kapsamı farklılaşır. Önce hangi okumanın hangi nüshada bulunduğunu, sonra hangi yorumun onu desteklediğini belirt. Nüsha karşılaştırması görüşe otomatik doğruluk kazandırmaz; görüşün gerçekten ne olduğunu belirlemeye yardım eder."
        ]
      },
      {
        "title": "Hümanizm ve insanın değeri",
        "paragraphs": [
          "Rönesans bağlamında hümanizm insanın yetilerine, eğitimine ve klasik kültüre yönelen bir bakışı öne çıkarır. İnsan yalnız dışarıdan emir alan edilgin bir varlık olarak değil, kendini geliştirebilen ve yorum yapabilen özne olarak düşünülür. Eğitim ve dil çalışmaları bu yönelimin önemli araçlarıdır.",
          "İnsanı konu alan her metin tek başına hümanist sayılmaz. Bir anatomi ölçümü insanla ilgili olabilir ama onun yaptığı iş bilimsel yöntem sorusudur. Hümanizmi belirlerken insanın değeri ve eğitimiyle kültürel yeniden yorumlamanın nasıl ilişkilendirildiğini göster. Tek sözcük yerine iki dayanak kullan."
        ]
      },
      {
        "title": "İnsan eğitiminin etkin yönü",
        "paragraphs": [
          "Bir metni ezberlemek ile onun gerekçelerini araştırarak kendi yargını geliştirmek aynı öğrenme işi değildir. Hümanist eğitimde dil, tarih, edebiyat ve ahlak üzerine çalışmalar insanın ifade ve değerlendirme yetilerini geliştirmeye katkı sunabilir. Eski kaynaklar bu etkin okumanın bir parçasıdır.",
          "Bu yönelimi bütün insanlarda aynı yeteneğin aynı hızla gelişeceği iddiasına dönüştürme. Öğrenme koşulları ve fırsatları farklı olabilir. Felsefi vurgu insanın eğitimle gelişebilmesi ve düşünsel etkinliğinin değeridir; kişileri doğuştan daha değerli veya değersiz sayan puanlama değildir."
        ]
      },
      {
        "title": "Hümanizm ve dinî düşünce",
        "paragraphs": [
          "İnsan değerini ve klasik yazını öne çıkarmak dinî inancın her biçimini mantıken dışlamaz. Petrarca gibi dindar hümanistler, insan ve klasik kültüre ilgiyi dinî bağlılıkla birlikte taşıyabilir. Dönemin bütün düşünürlerinin aynı inanç tutumuna sahip olduğu varsayımı bu çeşitliliği siler.",
          "Bir pasaj belirli kişinin dinî inancı reddettiğini açıkça söylüyorsa o kişi için verilen bilgi kullanılabilir. Fakat insanı merkeze aldı cümlesinden bu reddi kendi başına üretme. Metindeki kişinin tutumuyla bütün döneme ilişkin genellemeyi ayrı tut. Karşı örnek tek bir evrensel iddiayı çürütebilir; onun tersini herkese yaymaz."
        ]
      },
      {
        "title": "Otoriteyi değerlendirmek",
        "paragraphs": [
          "Bir görüşün ünlü bir kişi tarafından savunulması onu incelemeye değer kılabilir; fakat ün, görüşün gerekçesinin yerine geçmez. Rönesans’taki yeniden değerlendirme eğilimi kaynakların ne söylediğini ve neden savunulduğunu araştırmaya alan açar. Bu, bütün eski düşünürlerin zorunlu yanlış olduğunu söylemek değildir.",
          "Kaynaktan yararlanırken onun iddiasını, kanıtını ve yeni soruyla ilişkisini ayrı yaz. Bir görüşü yalnız eski diye reddetmek de yalnız eski diye kabul etmek kadar gerekçesiz kalabilir. Düşünsel bağımsızlık kaynaksız konuşmak değil, kaynağı açık ve eleştirel biçimde kullanabilmektir."
        ]
      },
      {
        "title": "Matbaa ve fikirlerin dolaşımı",
        "paragraphs": [
          "Metinlerin daha çok nüshayla dolaşması yeni okurlar ve tartışma ortamları oluşturabilir. Matbaa bu bakımdan fikirlerin paylaşılması ve farklı yorumların karşılaştırılması için önemli bir koşuldur. Bir metnin daha çok kişiye ulaşması, onun daha fazla kişi tarafından yeniden ele alınmasına imkân verir.",
          "Yine de çok basılan her metin doğru veya bütün okurlarca aynı anlaşılmış değildir. Matbaanın katkısıyla tek başına zorunlu ve yeterli neden olmasını ayır. Dil, eğitim, ekonomik koşullar ve siyasal ortam da dolaşımın etkisini değiştirebilir. Tarihsel açıklama bu etkenlerin ilişkisini araştırır."
        ]
      },
      {
        "title": "Ekonomi, himaye ve toplumsal değişim",
        "paragraphs": [
          "Kent ekonomisi, ticaret ve siyasal himaye bazı sanat ve düşünce çalışmalarına kaynak sağlayabilir. Bir eser için zaman, malzeme, eğitim ve okur çevresi gerekir; bunların toplumsal koşulları düşüncenin üretiminde etkili olabilir. Felsefi yeniliği yalnız bir kişinin zihninde olup biten kopuk bir olay gibi görmemek gerekir.",
          "Bu ilişki her eserin tek tek bütün ayrıntılarının ekonomik kazançla açıklandığı anlamına gelmez. Koşul sağlamak ile düşüncenin içeriğini bütünüyle belirlemek farklı iddialardır. Örnekte hangi katkının gerçekten verildiğine bak; diğer bütün etkenlerin etkisiz olduğu sonucunu kendin ekleme."
        ]
      },
      {
        "title": "Doğaya yöneliş ve yeni sorular",
        "paragraphs": [
          "Dünyevi yaşamın, insan bedeninin ve doğanın incelenmesi dönemin önemli yönelimleri arasındadır. Sanat, gözlem ve bilgi arayışı birbirini etkileyebilir. Doğayı anlamaya yönelik bu ilgi, sonraki bilimsel yöntem tartışmalarının kültürel ortamıyla ilişkilidir.",
          "Rönesans başlar başlamaz bugünkü bütün bilimsel yöntemlerin tamamlandığını düşünme. Gözlem, deney ve matematik farklı çalışmalarla gelişmiştir. Bir gözlem veya düşünce deneyi belirli bir itirazı sınayabilir; rakip dünya görüşünün bütün ayrıntılarını tek başına ispatlamak zorunda değildir. Sonucun kapsamını kullanılan dayanakla sınırla."
        ]
      },
      {
        "title": "Sanat ve edebiyatın katkısı",
        "paragraphs": [
          "Leonardo da Vinci ve Michelangelo gibi isimler resim ve heykelde; Brunelleschi mimaride; Cervantes ve Shakespeare gibi yazarlar edebiyat ve tiyatroda anılır. Bu eserler insan, mekân, duygu ve anlatım üzerine yeni imkânları görünür kılar. Dönemin farklı alanlarını örneklemek, tek bir sanatın bütün değişimi yarattığını söylemek değildir.",
          "Dante gibi isimler dönemler arasındaki geçiş ve sürekliliği anlamada da kullanılabilir; keskin tarih çizgileri her eseri tek bir kutuya sığdırmaz. Bir eserin tarihsel yerini, kullanılan yeni anlatım veya yorumla birlikte düşün. Klasik kültürden esinlenmek özgün yaratımı mantıken dışlamaz."
        ]
      },
      {
        "title": "Skolastik ve moderni karşılaştır",
        "paragraphs": [
          "Ders tabloları inanç merkezli çerçeve ile insan-doğa ve akla verilen yeni ağırlığı karşılaştırarak eğilimleri açıklar. Bu karşılaştırma öğretici olabilir; fakat Orta Çağ’da hiç akıl yürütülmediği veya modern dönemde herkesin her türlü baskıdan kurtulduğu sonucunu vermez. Tarihsel dönemler kendi içlerinde çeşitlidir.",
          "Karşılaştırmayı iki soruyla kur: hangi problem öne çıkıyor ve kabul edilen otorite hangi biçimde sınanıyor? Ardından bir süreklilik örneği ekle. Böylece hem değişimi görür hem mutlak kopuşu uydurmazsın. Dönem adı tek tek bütün kişilerin inancı, özgürlüğü ve yöntemini önceden belirlemez."
        ]
      },
      {
        "title": "Tarihsel nedeni çoklu kur",
        "paragraphs": [
          "Çeviri, klasik kaynak ilgisi, matbaa, ticaret, siyasal hareketlilik ve sanat üretimi birbirini etkileyebilir. Bir tarihçi bunları birlikte saydığında her biri açıklamanın farklı parçası olabilir. Etki etti ifadesi, tek başına bütün diğer koşulları gereksiz kıldı ifadesi değildir.",
          "Bir nedensellik sorusunda hangi olayın hangi imkânı artırdığını açık bir cümleyle yaz. Örneğin çeviri erişimi, basım dolaşımı, eğitim yorumlama becerisini destekleyebilir. Bu yolları tek bir zorunlu otomatik zincir saymadan aralarındaki ilişkileri göster. Eksik veri varsa neyin henüz belirlenmediğini de açık tut."
        ]
      },
      {
        "title": "Kaynak karşılaştırmasını uygula",
        "paragraphs": [
          "Etkileşimli örnekte aynı özgün savın iki nüshası ve iki yorumunu göreceksin. Kaynak kartlarını açınca koşul belirten sözcükler görünür olacak; yorumun bunlara uyup uymadığı gerçek metin kanıtıyla değişecek. Bu küçük çalışma Rönesans’taki filolojik okumanın işlevini somutlaştırır.",
          "Model herhangi bir gerçek tarihsel el yazmasının otomatik doğrulanması değildir; hazırlanmış örneklerde kaynak ve yorum bağını öğretir. Sonra yeni bir paragrafta yazar adı olmadan da hangi yorumun hangi sözcüğe dayandığını açıkla. Kaynağı tanımak ile savı eleştirel okumak farklı ama birlikte gelişen becerilerdir."
        ]
      }
    ],
    "examples": [
      {
        "title": "Nüshadan yoruma",
        "prompt": "Kurgu eski bir savın A nüshası “Bazı durumlarda ortak kural yararlıdır.”, B nüshası “Her durumda ortak kural yararlıdır.” diyor. İki okuma aynı kapsamda mıdır?",
        "strategy": "Önce metindeki farklı sözcüğü, sonra yorumun kapsamını bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A nüshasında bazı, B nüshasında her denilerek iki farklı niceleme kurulmuştur."
          },
          {
            "label": "2. adım",
            "explanation": "Yalnız eski bir kaynağın adı verilmesi hangisinin özgün olduğunu belirlemeye yetmez."
          },
          {
            "label": "3. adım",
            "explanation": "Nüsha karşılaştırması farkı görünür kılar; doğru okuma için ek dil ve kaynak incelemesi gerekir."
          }
        ],
        "answer": "Aynı kapsamda değildir; nüsha ve yorum kanıtı ayrı araştırılır.",
        "check": "Bazıdan her sonucunu ek gerekçe olmadan çıkarmadığını kontrol et.",
        "pitfall": "Metni yeniden okumayı eski savı koşulsuz kabul etmek sanma."
      },
      {
        "title": "Hümanizm ve inanç",
        "prompt": "Bir düşünür klasik şiirleri yeniden okuyup insanın eğitimle gelişmesini savunuyor; dinî inancını da koruduğu açıkça belirtiliyor. Bu iki durum zorunlu çelişir mi?",
        "strategy": "İnsan eğitimi vurgusuyla kişinin inanç tutumunu ayrı eksenlerde oku.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk bilgi insanın gelişebilirliği ve klasik kültür ilgisini veriyor."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci bilgi kişinin kendi dinî kabulünü açıkça belirtiyor; ilkini mantıken dışlamıyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu örnek bütün hümanistler inancı reddeder genellemesine karşı durum oluşturur; ters genelleme de kurulmaz."
          }
        ],
        "answer": "Zorunlu çelişki yoktur.",
        "check": "Örneği yalnız verilen kişiyle ve belirtilen iki tutumla sınırla.",
        "pitfall": "Bir odak değişikliğinden bütün inançların reddini otomatik çıkarma."
      },
      {
        "title": "Çok etkenli dönüşüm",
        "prompt": "Bir tarihçi çeviri, matbaa, kent ekonomisi ve sanat himayesinin etkileşimini anlatıyor. Bundan çevirinin tek başına bütün dönüşümü zorunlu yarattığı çıkar mı?",
        "strategy": "Katkı ifadesi ile tek yeterli neden iddiasını ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Metin birden fazla etkeni ve aralarındaki etkileşimi açıkça veriyor."
          },
          {
            "label": "2. adım",
            "explanation": "Çeviri erişim sağlayabilir; diğer koşulların etkisizliği henüz kanıtlanmış değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Tek neden sonucunu reddederken çevirinin katkısını da inkâr etmemek gerekir."
          }
        ],
        "answer": "Hayır; verilen açıklama çok etkenlidir.",
        "check": "Hangi etkenin hangi imkânı artırdığını ayrı bir cümleyle yaz.",
        "pitfall": "Bir nedene itirazın bütün tarihsel katkıyı sıfırladığını sanma."
      },
      {
        "title": "Kaynak ve otorite",
        "prompt": "İki öğrenci aynı antik savı okuyor: biri yalnız ünlü yazar söyledi diye doğru sayıyor, diğeri metnin dilini ve gerekçelerini karşılaştırıyor. Hangi fark vardır?",
        "strategy": "Savın içeriği aynıyken kabulün dayanağını karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk öğrenci kişinin ününü görüşün doğruluk gerekçesi yerine koymaktadır."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci öğrenci ne söylendiğini ve neye dayandığını araştırmaya açmaktadır."
          },
          {
            "label": "3. adım",
            "explanation": "İkinci yol eleştirel kaynak kullanımını örnekler; yazarın kesin yanlış olduğu sonucu eklenmez."
          }
        ],
        "answer": "Koşulsuz otorite kabulü ile gerekçeli inceleme farkı vardır.",
        "check": "İki öğrencinin aynı sonucu söylemesinin yöntemi eşitlemediğini göster.",
        "pitfall": "Eski veya ünlü olmayı tek başına doğruluk ya da yanlışlık garantisi sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Yeniden doğuş eskiyi aynen tekrarlamak mıdır?",
        "answer": "Hayır; klasik kaynakların yeni soru ve yorumlarla değerlendirilmesini içerir."
      },
      {
        "prompt": "Filoloji hangi kanıtları inceler?",
        "answer": "Dil, nüsha farkları ve tarihsel bağlam gibi metnin doğru okunmasını etkileyen dayanakları."
      },
      {
        "prompt": "Hümanizm kişinin dinini tek başına belirler mi?",
        "answer": "Hayır; insan ve eğitim odağı, bütün dinî kabulleri zorunlu olarak reddetmez."
      },
      {
        "prompt": "Bir tarihsel etkenin katkısı tek neden midir?",
        "answer": "Hayır; başka koşullarla ilişkisi ve gerekli-yeterli neden iddiası ayrıca araştırılır."
      }
    ],
    "source": "Aurelia YKS ilgili kopya kâğıtları, OGM ders notları ve MEBİ konu özetleriyle karşılaştırılarak hazırlanmış özgün öğretim. Tarihsel görüşlerin dayanakları ve sınırları birlikte açıklanır. Uygulama soruları özgündür; resmî sınav sorusu değildir."
  },
  {
    "id": "15-17-yuzyil-felsefesi",
    "subjectId": "tyt-felsefe",
    "title": "15–17. yüzyıl: insan, yöntem, kesinlik ve hukuk",
    "minutes": 120,
    "objectives": [
      "Hümanizm, bilimsel yöntem, Kartezyen düşünce ve hukukun ayrı sorularını belirle.",
      "Gözlem, hipotez, kontrollü deney ve matematiksel açıklamanın görevlerini ayır.",
      "Descartes ve Spinoza’nın bilgi-varlık ilişkilerini gerekçeleriyle kur.",
      "Machiavelli, Hobbes ve ütopyaları devletin amacı ve gerekçesiyle karşılaştır."
    ],
    "sections": [
      {
        "title": "Bir dönemde dört ayrı soru",
        "paragraphs": [
          "Erken modern dönemde insanın değeri, doğanın nasıl araştırılacağı, kesin bilginin dayanağı ve siyasal düzenin gerekçesi birlikte tartışılır. Aynı yüzyılda bulunmaları bu soruları özdeş yapmaz. Bir metinde insan eğitimi, başka metinde deneyin kontrolü, üçüncüsünde kuşkunun sınırı veya egemenlik öne çıkabilir.",
          "Önce pasajın hangi probleme cevap verdiğini belirle: insan ve kültür, doğa olayı, kesin bilgi ya da ortak yönetim. Ardından dayanağı ara. Bu sıra düşünür adı ezberinden daha güvenilirdir. Tek bir kuşku, bilim veya özgürlük kelimesi bütün görüşü kesin tanıtmaya yetmez."
        ]
      },
      {
        "title": "Hümanist miras ve yeni yöntem",
        "paragraphs": [
          "Klasik metinlerin yeniden okunması insanın eğitim ve yorumlama yetilerini öne çıkarırken, doğaya yöneliş gözlem ve hesaplama sorularını güçlendirir. Bir araştırmacı eski kaynağı inceleyebilir ve onun belirli doğa açıklamasını ölçümlerle sınayabilir. Kaynak kullanmakla kaynağa koşulsuz itaat farklıdır.",
          "Bu dönemdeki her düşünürü bütün alanlarda tek bir yöntem kullanmış sayma. Metin yorumunda dil ve nüsha, fizik probleminde ölçüm, kesinlik arayışında akılsal dayanak farklı görevler taşır. İnsan aklının etkinliği ortak bir tema olabilir; fakat her etkinliği aynı akım adıyla açıklamak yöntem farkını kaybettirir."
        ]
      },
      {
        "title": "Olgu, hipotez ve sınama",
        "paragraphs": [
          "Olgu araştırmada açıklanmaya çalışılan veya gözlenen duruma; hipotez ise onun için önerilen sınanabilir açıklamaya işaret edebilir. Bir cismin ısınınca uzaması gözlem verisi, uzamanın hangi koşula bağlı olduğuna ilişkin sav ise açıklama adaydır. İkisini ayırmak araştırmanın neyi sınadığını gösterir.",
          "Bir hipotezin bilinen bazı verilerle uyumlu olması başka bütün olası açıklamaları ortadan kaldırmaz. Yeni bir karşılaştırma iki adayı ayırabilir. Önce her adayın aynı koşulda ne öngördüğünü yaz; sonra gözlemle karşılaştır. Sonucun hangi iddiayı desteklediğini, hangisini henüz ayırmadığını açık tut."
        ]
      },
      {
        "title": "Kontrollü karşılaştırmanın mantığı",
        "paragraphs": [
          "Bir etkenin sonuçla ilişkisini incelemek için karşılaştırılan durumların diğer ilgili koşullarını aynı tutmak yararlı olur. İki eş metal çubuk aynı ortamda tutulup yalnız biri ısıtıldığında uzunluk farkı ısıtmayla ilişkilendirilebilir. Malzeme ve ilk boy da değişirse farkın kaynağını ayırmak güçleşir.",
          "Bu küçük düzenek gerçek dünyadaki bütün etkilerin eksiksiz bilindiğini garanti etmez. Denetlenen koşulları ve ölçülen büyüklüğü açıkça söylemek gerekir. Sonuç belirli malzeme ve aralık için verilmişse bütün maddeler ve bütün sıcaklıklar için aynı sayıyı kendin ekleme. Model sınırı açıklamanın bir parçasıdır."
        ]
      },
      {
        "title": "Matematik neyi görünür kılar?",
        "paragraphs": [
          "Matematiksel anlatım büyüklüklerin nasıl ilişkilendiğini, bir açıklamanın hangi sonucu öngördüğünü ve ölçümle neyin karşılaştırılacağını açıklaştırabilir. Galileo’nun çalışmalarında gözlem ve deneyin matematikle birlikte ele alınması önemlidir. Bir sayıyı yazmak değil, sayının hangi ilişkiyi temsil ettiğini göstermek gerekir.",
          "Denklem tek başına dayandığı varsayımları kanıtlamaz. Aynı veri birkaç modelle uyumluysa yeni sınama gerekebilir. Felsefi soruda matematiksel açıklamanın işlevini tanımakla bütün bir fizik kuramını kesin olarak doğrulamak farklıdır. Önce modelin ne söylediğini, sonra verilen verinin neyi sınadığını belirle."
        ]
      },
      {
        "title": "Bacon ve idoller",
        "paragraphs": [
          "Bacon doğru araştırma için zihnin yerleşmiş önyargılarının sorgulanmasını vurgular. İdoller, araştırmayı yanıltabilecek alışkanlık ve kabulleri ifade eder. Bir açıklamayı yalnız alışılmış olduğu için korumak, yeni olguların gerçekten değerlendirilmesini engelleyebilir.",
          "Önyargıyı fark etmek hiçbir ön bilgi kullanmamak demek değildir. Hangi kabulün hangi gerekçeye dayandığını ve ters veri karşısında değişip değişmediğini araştırmak gerekir. Bacon’ın doğayı düzenli gözlemleme vurgusu, üç rastgele örneğin bütün evreni kesin ispatladığı iddiasıyla karıştırılmamalıdır."
        ]
      },
      {
        "title": "Tümevarım ve örnek sınırı",
        "paragraphs": [
          "Tümevarım tekil durumlar üzerinden daha genel bir yargıya yönelir. Birkaç cismin benzer koşulda aynı davranışı göstermesi genel açıklamaya destek olabilir; fakat gözlenmeyen bütün durumlar henüz bu örneklerin içinde değildir. Örneklerin seçimi ve hangi koşulları kapsadığı önemlidir.",
          "Bir karşı örnek evrensel bir savı sınayabilir. “Bu malzemeden bütün parçalar aynı koşulda uzar.” iddiası için aynı kapsamda farklı davranan doğrulanmış bir parça önem taşır. Ancak bu bulgudan bütün parçalar hiç uzamaz sonucuna atlama. Eleştirinin hangi kapsamı bozduğunu açıkça belirt."
        ]
      },
      {
        "title": "Kopernik: merkez sorusunu değiştir",
        "paragraphs": [
          "Kopernik Dünya merkezli modele karşı Güneş merkezli açıklamayı savunur; Dünya’nın kendi ekseni ve Güneş çevresindeki hareketini ele alır. Böylece kabul edilen astronomi çerçevesi yeni biçimde tartışmaya açılır. Buradaki merkez sözcüğü kozmolojik yerleşim sorusuna aittir.",
          "Bu değişimi ruh ile maddenin tek töz olup olmaması sorusuyla karıştırma. Güneş merkezli model tek başına ontolojik monizmi veya bütün insan değerleri hakkındaki bir görüşü kanıtlamaz. Sonraki gök ve yer fiziğinin bütün ayrıntılarını da yalnız Kopernik’in çalışmasına yükleme. Katkıların konusu ve tarihsel gelişimi ayrıdır."
        ]
      },
      {
        "title": "Galileo: düşünce deneyi ve karşı itiraz",
        "paragraphs": [
          "Bir düşünce deneyi belirli model koşullarını zihinde açık tutarak bir iddianın sonucunu araştırabilir. Düzenli hareket eden araçla ortak yatay hareketi paylaşan cismin bırakılması, cismin mutlaka geride kalacağı itirazını sorgulamaya yardım eder. Hava etkisi ve ivme gibi koşulların ideal örnekte nasıl ele alındığı belirtilmelidir.",
          "Böyle bir örnek eski itirazın zorunlu olmadığını gösterebilir; Dünya’nın hareketiyle ilgili bütün bağımsız kanıtların yerine geçmez. Bir delili etkisizleştirmek ile karşıt görüşü bütün yönleriyle ispatlamak farklı işlemlerdir. Soru hangi dar sonucu istiyorsa açıklamanı o kapsamda tut."
        ]
      },
      {
        "title": "Newton: düzenli doğa ve yasa",
        "paragraphs": [
          "Newton’un hareket yasaları ve evrensel kütle çekimi, farklı olayların ortak matematiksel ilişkilerle açıklanmasına güçlü örneklerdir. Yeryüzündeki düşüş ile göksel hareketin aynı araştırma çerçevesinde ele alınması doğa anlayışını etkilemiştir. Yasaların öngörü ve hesaplama gücü felsefi tartışmalara da yeni sorular taşır.",
          "Bu tarihsel etkiyi bütün doğa bilgisinin artık değişmez ve eksiksiz olduğu sonucuna dönüştürme. Bilimsel modeller belirli koşullarda kullanılır, yeni araştırmalarla sınanır ve kapsamları açıklaştırılır. Felsefe sorusunda önemli olan doğanın gerekçeli ve matematiksel araştırmaya açılmasının düşüncedeki rolünü anlayabilmektir."
        ]
      },
      {
        "title": "Descartes: kuşkunun amacı",
        "paragraphs": [
          "Descartes kesin bir bilgi dayanağı aramak için yanılma ihtimali bulunan kabulleri yöntemli olarak sorgular. Burada kuşku aranan sonucun kendisi değil araştırma aracıdır. Duyuların bazen yanıltması, onların her bildirdiğinin kesin yanlış olduğu sonucuyla aynı değildir.",
          "Bir pasajda kuşku görünce kalıcı şüpheciliği otomatik seçme. Yazar sonunda kesin bir temel mi arıyor, yoksa kesin bilginin ilkece imkânsızlığını mı savunuyor? Yöntemin hedefini oku. Descartes’ın kuramsal araştırma kuşkusunu bütün gündelik işlerde hiçbir karar vermeme buyruğuna dönüştürme."
        ]
      },
      {
        "title": "Cogito: düşünme sırasında özne",
        "paragraphs": [
          "Kuşku duymak da bir düşünme etkinliğidir. Descartes düşünme sırasında bu etkinliğin taşıyıcısı olan öznenin varlığını yadsımanın güçlüğünden hareket eder. “Düşünüyorum, öyleyse varım.” ifadesi bu ilk kesinlik arayışının bilinen anlatımıdır.",
          "Çıkan sonuç düşünülen her nesnenin dış dünyada var olduğu değildir. Bir ejderha düşünmek ejderhanın varlığını kanıtlamaz; burada tartışılan düşünme etkinliği sırasında düşünen öznenin varlığıdır. Modelde özne ve düşünülen nesneyi ayrı kutularda tutmak bu kapsam hatasını görünür kılar."
        ]
      },
      {
        "title": "Açıklık, seçiklik ve yöntem",
        "paragraphs": [
          "Descartes’ın yönteminde açık ve seçik kavrayış arayışı, güçlüğü parçalara ayırma, basitten karmaşığa ilerleme ve eksikleri denetleyen sayım gibi ilkeler önem taşır. Bir problemi küçük parçalara ayırmak, her parçanın nasıl bilindiğini ve aralarında hangi sıranın kurulacağını araştırmayı kolaylaştırabilir.",
          "Bu ilkeler yalnız uzun bir işi kısa başlıklara bölmekten ibaret değildir. Parçalar doğru anlaşılmadan sıra kurmak veya denetim yapmadan tamamlandı demek yöntem amacını karşılamaz. Öğretim örneğinde her adımın gerekçesini belirt; kuralları yalnız dört isimlik ezber listesi olarak bırakma."
        ]
      },
      {
        "title": "Bilgi görüşü ile töz görüşü",
        "paragraphs": [
          "Descartes’ın akla dayalı kesinlik arayışı bilgi kaynağı problemidir. Ruh ve maddeyi birbirine indirgenemeyen yaratılmış tözler olarak ayırması ise varlık problemidir. Ruh düşünmeyle, madde uzamda yer kaplamayla ilişkilendirilir; yaratıcı töz olarak Tanrı ayrıca ele alınır.",
          "Rasyonalizm ile düalizm aynı sorunun iki eş anlamlı cevabı değildir. Bir görüşte aklın önceliğini belirlemek, töz sayısını kendiliğinden buldurmaz. Karşılaştırma yaparken önce hangi alanın sorulduğunu söyle, sonra o alandaki belirleyici savı göster. Aynı düşünür farklı problemlere farklı kavramlarla cevap verir."
        ]
      },
      {
        "title": "Leibniz: basit töz olarak monad",
        "paragraphs": [
          "Leibniz varlığın temelini monad adı verilen basit tözlerle açıklar. Basit burada bir cismin daha küçük maddi parçaları gibi bölünmeyen birlik anlamındadır. Bu yüzden monadı Demokritos’un maddi atomuyla otomatik özdeşleştirmemelisin. Leibniz’in çoklu töz görüşü, Descartes’ın düşünme ve uzam ayrımıyla da Spinoza’nın tek töz kabulüyle de aynı değildir.",
          "Üç görüşü aynı soru çevresinde karşılaştır: Varlığın temelinde kaç töz var ve bunlar hangi nitelikte? Descartes için ruh-madde ayrımı, Spinoza için tek sonsuz töz, Leibniz için çok sayıda basit töz öne çıkar. Bu karşılaştırma yalnız isim saymak değildir; ortak töz problemini farklı çözümlerle eşleştirmeyi öğretir. Monad sözcüğünü gördüğünde önce pasajın basit töz tanımını kontrol et."
        ]
      },
      {
        "title": "Spinoza: tek töz ve doğa",
        "paragraphs": [
          "Spinoza’da Tanrı veya Doğa ifadesi tek töz anlayışıyla ilişkilidir. Zihin ve beden iki bağımsız yaratılmış töz olarak kurulmaz; tek gerçekliğin farklı nitelikleri ve varoluş tarzları çerçevesinde düşünülür. Bu bakımdan Descartes’ın ruh-madde ayrımıyla belirgin bir karşılaştırma sunar.",
          "Burada doğa yalnız yürüyüş yapılan yeşil alan demek değildir; bütün varlık düzeni söz konusudur. Tek töz kabulü dünyadaki nesnelerin sayısının bir olması anlamına da gelmez. Çok sayıda tekil varlık bulunabilir; soru onların hangi temel gerçeklikle açıklandığıdır. Nesne sayısı ile temel sayısını ayır."
        ]
      },
      {
        "title": "Spinoza: zorunluluk ve özgürlük",
        "paragraphs": [
          "Spinoza insanı doğanın dışında nedensiz davranan bir ayrıcalık olarak ele almaz. İnsan duygu ve eylemleri de nedenler içinde anlaşılır. Özgürlük bu nedenleri daha iyi kavrama ve kendi doğasına uygun etkinlik geliştirmeyle bağlantılıdır; rastgele ve nedensiz bir karar gücü diye açıklanmaz.",
          "Bir tutkuyla sürüklenmek ile o tutkunun nedenlerini anlayarak etkinliğini artırmak aynı durum değildir. Bu yaklaşımı öğrenirken zorunluluğun her kullanımda bütün etik tartışmayı gereksiz kıldığı sonucunu ekleme. Düşünürün bağımlılık, anlama ve etkinlik arasında kurduğu ilişkiyi açıkça kur."
        ]
      },
      {
        "title": "Akıl, mutluluk ve ortak yarar",
        "paragraphs": [
          "Spinoza’nın etik tartışmasında anlama yetisinin gelişmesi, varlığını sürdürme çabası ve uygun ilişkiler önem taşır. Bir şeyin insanın etkinliğine yardımcı veya engel oluşu iyi-kötü değerlendirmesinde rol oynayabilir. Mutluluk yalnız dışarıdan gelen ödül değil, daha yeterli kavrayışla ilişkili bir yaşantı olarak düşünülür.",
          "Kaynakta geçen dostluk ve akılla yaşama vurgusunu bazı gerçek kişilere değersizlik etiketi yapma. Dersin amacı görüşün hangi gerekçeyle kurulduğunu açıklamaktır. Bir felsefi savı anlamak ile kullanıcıya belirli insanlardan uzak durma buyruğu vermek ayrı şeylerdir. Metni kendi problem ve ölçütüyle oku."
        ]
      },
      {
        "title": "Machiavelli: birlik ve siyasal etkililik",
        "paragraphs": [
          "Machiavelli siyasal birlik, yöneticinin davranışı ve yönetimin sürdürülmesi koşulları üzerine düşünür. Prens adlı eseri bu tartışmada anılır. Burada soru yalnız yöneticinin kişisel olarak iyi niyetli olup olmadığı değil, siyasal eylemin hangi koşullarda etkili olduğu ve düzenin nasıl korunduğudur.",
          "Güçlü yönetici vurgusunu görür görmez Hobbes adını seçme. İkisini ayırmak için metinde doğal durum, karşılıklı güvenlik sorunu ve sözleşme gerekçesinin bulunup bulunmadığını sor. Aynı güçlü sözcüğü farklı argümanlarda farklı görev yapabilir. Yazarın gerekçesini terimle birlikte göster."
        ]
      },
      {
        "title": "Hobbes: doğal durum bir düşünsel model",
        "paragraphs": [
          "Hobbes ortak güvenilir siyasal gücün bulunmadığı durumda rekabet, güvensizlik ve itibar arzusunun çatışma yaratabileceğini tartışır. Doğal durum bu açıklamada kullanılan düşünsel çerçevedir; bütün insanların tarihte aynı gün aynı sözleşmeyi imzaladığı bir tutanak değildir. Başlangıç problemi güvenliktir.",
          "Herkesin güç ve zarar görme ihtimali, başkasının davranışına güvenmeyi güçleştirebilir. Ortak yaptırım yoksa iyi niyetin tek başına sürdürülebilir güven sağlaması sorun olur. Bir pasajda çatışmadan ortak güce geçişi soran bağ kuruluyorsa Hobbes’un sözleşme açıklaması öne çıkar; yalnız kavga kelimesi yeterli değildir."
        ]
      },
      {
        "title": "Sözleşme ve egemenlik",
        "paragraphs": [
          "Hobbes’un sözleşme ile kurulan devlet açıklamasında insanlar birbirleriyle anlaşarak ortak bir egemen yetkilendirir. Amaç kişisel güvenliğin sağlanması ve anlaşmaların uygulanabilmesidir. Devlet bu bakımdan doğal bir organın büyümesi gibi değil, insan eylemiyle kurulmuş yapay siyasal birlik olarak açıklanır.",
          "Güçlü egemenlik savının kapsamını metindeki gerekçeyle birlikte incele. Düşünürü yalnız özgürlüğe ilişkin tek bir sloganla bütün dönemlerden koparma; güvenlik, sözleşme ve yaptırım ilişkisinin nasıl kurulduğunu açıkla. Görüşü öğrenmek, onu bugün herkesin benimsemesi gereken siyasal tercih olarak sunmak değildir."
        ]
      },
      {
        "title": "Kuruluş ve edinim yoluyla egemenlik",
        "paragraphs": [
          "Hobbes egemenliğin sözleşmeyle kurulması ile edinim yoluyla oluşması arasında ayrım yapar. Kuruluş açıklamasında insanlar birbirleriyle anlaşarak bir kişi veya kurulu yetkilendirir; egemen, her biriyle aynı düzeyde sözleşme imzalayan sıradan bir taraf gibi düşünülmez. Edinimde ise üstün güce sahip olanın karşısında yaşamını koruma amacıyla boyun eğme ve yükümlülük ilişkisi tartışılır.",
          "Düşünürün tarihsel görüşünde egemenin yasa koyma, yargılama, savaş-barış ve kamu öğretimi gibi geniş yetkileri savunulur. Bu yetkileri öğrenmek, onları bugünün her yönetimi için koşulsuz doğru ilan etmek değildir. Sınav pasajında önce egemenliğin hangi yolla kurulduğunu, sonra ona hangi hakların verildiğini göster. Güvenlik gerekçesi ile çağdaş haklar bakımından yapılacak değerlendirmeyi ayrı sorular olarak tut."
        ]
      },
      {
        "title": "Ütopya ve eleştirel tasarım",
        "paragraphs": [
          "Ütopya hayal edilen toplum düzeniyle ortak yaşamın nasıl kurulabileceğini tartışmaya açar. More’un Ütopya’sı, Campanella’nın Güneş Ülkesi ve Bacon’ın Yeni Atlantis’i farklı ideal tasarımlardır. İdeal düzen kurmak, o düzenin gelecekte zorunlu olarak gerçekleşeceğinin deneysel tahmini değildir.",
          "Distopya veya ters ütopya ise istenmeyen düzeni uyarıcı biçimde gösterebilir; Huxley’in Cesur Yeni Dünya’sı ve Orwell’ın 1984’ü sonraki örneklerdir. Bu eserlerin hepsini aynı yüzyılda yazılmış sanma. Kavramsal karşılaştırma yapmak, eserlerin tarihsel zamanını eşitlemeyi gerektirmez."
        ]
      },
      {
        "title": "İdeal devlet örneklerini karşılaştır",
        "paragraphs": [
          "İdeal düzen tartışması Rönesans’ta sıfırdan başlamaz. Platon’un Devlet’inde üreticiler, koruyucular ve yöneticiler arasındaki görev ve erdem ilişkisi; Fârâbî’nin el-Medînetü’l-Fâzıla’sında ortak mutluluğa yönelen yardımlaşma ve erdemli yönetim öne çıkar. İki metin aynı soru ailesine katkı sunar, fakat bütün kurum ve inanç ayrıntılarının aynı olduğu söylenemez.",
          "More, Campanella ve Bacon’ın tasarımlarını bu önceki örneklerle karşılaştırırken herkes eşit yaşam kuralları öneriyor gibi tek kalıp kurma. Her eserde eğitim, yönetim, mülkiyet veya bilim için hangi düzen önerildiğini ayrı araştır. Hayal edilen toplum, mevcut düzene yöneltilen bir eleştiri taşıyabilir; bu eleştiriyi anlamak düzenin her ayrıntısını benimsemeyi veya geleceği kesin tahmin saymayı gerektirmez."
        ]
      },
      {
        "title": "Felsefi soruyu edebî deneyimde izle",
        "paragraphs": [
          "Dönemlerin dil ve edebiyat ilişkisi yalnız filozofların eserlerinden oluşmaz. Cervantes’in Don Kişot’u, Shakespeare’in tiyatroları ve başka edebî eserler kişinin gerçeklikle, tutkularla ve toplumsal kabullerle ilişkisini görünür kılabilir. Bir romanı felsefi bakımdan okumak onun her cümlesini mantıksal ispat veya yazarın doğrudan kişisel savı saymak değildir; anlatılan durumun açtığı soruyu araştırmaktır.",
          "Defoe’nun Robinson Crusoe’sunda insanın emek, doğa ve yaşamı düzenleme ilişkileri; Goethe’nin Genç Werther’in Acıları’nda duygu, birey ve toplumsal koşul ilişkileri tartışmaya açılabilir. Bu iki eser 18. yüzyıldandır; 15–17. yüzyıla ait aynı tarih aralığında yazılmış gibi ezberlenmemelidir. Kaynaktaki geniş kültür karşılaştırmasını tarihsel eş zamanlılık iddiasına çevirmeden, her örneğin hangi insan sorununa alan açtığını düşün."
        ]
      },
      {
        "title": "Bir itirazın çürütülmesi",
        "paragraphs": [
          "Bir savın dayanağında belirli bir yanlış varsayım bulunduğu gösterilebilir. Bu, o dayanağı zayıflatır; fakat karşıt görüşün bütün öncüllerini kendiliğinden sağlamaz. Hareketli araç örneğinde ortak yatay hareketin korunması, mutlaka geride kalma varsayımına yönelik bir karşı durum olabilir.",
          "Aynı mantıksal ayrım bilim, metin yorumu ve siyaset tartışmasında da kullanılabilir. Bir gerekçeyi eleştirirken tam olarak hangi adımın bozulduğunu söyle. Bir yazarın bir konuda yanılmış olması bütün diğer görüşlerinin yanlışlığını veya rakibinin her iddiasının doğruluğunu kanıtlamaz. Sonuç kapsamını koru."
        ]
      },
      {
        "title": "Dört problem için çözüm yolu",
        "paragraphs": [
          "İnsan eğitimi ve klasik metinler verildiğinde hümanizmin kültürel odağını; ölçüm ve karşılaştırma verildiğinde sınama yöntemini; kuşkuya rağmen kesin temel arandığında Kartezyen soruyu; güvenlik ve ortak yetki verildiğinde hukuk-siyaset gerekçesini araştır. Bunlar ayrı ama ilişkili sorulardır.",
          "Birleşik bir paragrafta bu dört problem birlikte bulunabilir. Her cümleyi bir soruya ve gerekçeye bağlayıp sonra bütünün hangi karşılaştırmayı kurduğunu açıkla. Metin tek bir düşünürün eseri olduğunu söylemedikçe bütün görüşleri aynı kişiye zorla yükleme. Adı değil problemi önce bulmak daha sağlamdır."
        ]
      },
      {
        "title": "Kuşku modelinde kapsamı koru",
        "paragraphs": [
          "Etkileşimli model, hazırlanmış bir kuşku senaryosunda duyusal nesne hakkında hüküm ile kuşku duyma etkinliğini ayrı gösterir. Bazı kabuller askıya alındığında hangi sonuç yolunun hâlâ açık kaldığını izleyebilirsin. Bir öncül değişikliği gerçekten şemadaki destek yolunu değiştirir.",
          "Bu model bütün bir Kartezyen sistemi bilimsel olarak kanıtlamaz; belirli bir argümanın kapsamını öğretir. Öznenin düşünmesiyle düşünülen nesnenin dış dünyada bulunmasını ayırarak kendi açıklamanı yaz. Ardından yeni bir düşünce örneğinde aynı farkı yardım almadan kurmayı dene. Bu keşif inanç veya kişilik notu üretmez."
        ]
      }
    ],
    "examples": [
      {
        "title": "Düşünülen nesne ve düşünen özne",
        "prompt": "Bir kişi gerçek bir ejderha bulunup bulunmadığından kuşku duyuyor. Bu kuşkuyu yaşarken düşündüğünün farkında. Cogito hangi varlığı öncelikle temellendirir?",
        "strategy": "Düşünmenin taşıyıcısıyla düşüncede geçen nesneyi ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ejderha, düşüncenin içeriğidir; düşünülmesi dış dünyada bulunmasını henüz göstermez."
          },
          {
            "label": "2. adım",
            "explanation": "Kuşku eylemi gerçekleşirken bir düşünme etkinliğinin bulunduğu yadsınamaz dayanak olarak ele alınır."
          },
          {
            "label": "3. adım",
            "explanation": "Kartezyen çıkarımın ilk kapsamı düşünen öznedir; ejderhaya veya bütün dış nesnelere genişletilmez."
          }
        ],
        "answer": "Düşünme sırasında düşünen özneyi.",
        "check": "Ejderha varsayımını değiştirince özneye ilişkin argüman aynı mı, kontrol et.",
        "pitfall": "Düşündüğüm her şey vardır cümlesini cogitonun sonucu sanma."
      },
      {
        "title": "Kontrol edilen etken",
        "prompt": "Aynı malzeme ve boydaki iki çubuk aynı ortamda tutuluyor; yalnız biri ısıtılıyor ve boy değişimi ölçülüyor. Neyin etkisi ayrıştırılmaya çalışılıyor?",
        "strategy": "Sabit koşulları, değiştirilen etkeni ve ölçülen sonucu ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Malzeme, ilk boy ve ortam ortak; bunlar karşılaştırmada sabit tutulmuş koşullardır."
          },
          {
            "label": "2. adım",
            "explanation": "Isıtma değiştirilen etken, uzunluk farkı ise ölçülen sonuçtur."
          },
          {
            "label": "3. adım",
            "explanation": "Bu sınırlı düzenekte ısıtmayla boy değişimi ilişkisi sınanır; bütün maddelerin bütün koşulları genellenmez."
          }
        ],
        "answer": "Isıtmanın uzunluk değişimiyle ilişkisi.",
        "check": "Çubukların malzemesi de değişseydi tek etkiyi ayırmanın neden güçleşeceğini açıkla.",
        "pitfall": "Bir deneyin sonucunu hiçbir model sınırı olmadan evrensel sayma."
      },
      {
        "title": "Bacon ve genelleme",
        "prompt": "Bir araştırmacı üç beyaz örnek gördükten sonra bu türün bütün üyeleri beyazdır diyor. Örneklem dışındaki üyeler hakkında veri yok. Sonuç zorunlu mudur?",
        "strategy": "Gözlenenlerin kapsamıyla savın kapsamını karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Veri yalnız üç üyeyi kapsar; sav ise türün bütün gözlenmemiş üyelerine de uzanır."
          },
          {
            "label": "2. adım",
            "explanation": "Yeni bir farklı renkli üye mümkün olduğundan verilen üç gözlem onu mantıken dışlamaz."
          },
          {
            "label": "3. adım",
            "explanation": "Tümevarımsal destek olabilir ama sonuç zorunlu ispat değildir; aynı kapsamda karşı örnek araştırılabilir."
          }
        ],
        "answer": "Zorunlu değildir.",
        "check": "Üç örneği reddetmeden bunların neyi henüz kapsamadığını söyle.",
        "pitfall": "Gözlem sayısını büyütmenin otomatik olarak sonsuz kapsamı kesinleştirdiğini sanma."
      },
      {
        "title": "Spinoza ve özgürlük",
        "prompt": "Bir metin insanı doğanın parçası sayıyor; tutkuların nedenlerini anlayarak daha etkin yaşamasını özgürlükle ilişkilendiriyor. Bu, nedensiz rastgele seçim midir?",
        "strategy": "Verilen özgürlük tanımını gündelik keyfîlikten ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Metin insanı nedenler düzeninin dışına çıkarmıyor; doğanın parçası olarak kuruyor."
          },
          {
            "label": "2. adım",
            "explanation": "Anlama ve etkinlik artışı tutkunun edilgin sürükleyişinden farklı bir ilişki kuruyor."
          },
          {
            "label": "3. adım",
            "explanation": "Spinozacı vurgu zorunluluğu kavramayla bağlantılıdır; nedensiz karar gücü metinde yoktur."
          }
        ],
        "answer": "Hayır; nedenleri anlama ve etkinlikle ilişkili özgürlüktür.",
        "check": "Özgürlük sözcüğünü hangi dayanağın açıkladığını tam metinden göster.",
        "pitfall": "Her özgürlük görüşünün aynı nedensiz irade tanımını kullandığını varsayma."
      },
      {
        "title": "Güvenlik ve sözleşme",
        "prompt": "Bir metin ortak otorite yokken güvensizliğin arttığını, insanların birbirleriyle anlaşarak ortak güç yetkilendirdiğini söylüyor. Hangi gerekçe Hobbes’u ayırt eder?",
        "strategy": "Güçlü yönetici sözünün yanındaki başlangıç ve geçişi bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Başlangıç doğal durumdaki güvenlik sorunudur; yalnız yönetici kişiliği tartışılmıyor."
          },
          {
            "label": "2. adım",
            "explanation": "Geçiş karşılıklı anlaşma ve ortak egemenin yetkilendirilmesiyle açıklanır."
          },
          {
            "label": "3. adım",
            "explanation": "Güvenlik-sözleşme-egemenlik bağı Hobbes’u öne çıkarır; sadece güçlü prens sözü yeterli olmaz."
          }
        ],
        "answer": "Ortak güvenlik için sözleşmeyle egemen yetkilendirilmesi.",
        "check": "Machiavelli’ye yakın yüzey sözcüğü yerine gerçek sözleşme dayanağını kontrol et.",
        "pitfall": "Aynı çağda güçlü yönetim tartışan herkesi aynı argüman sahibi sayma."
      },
      {
        "title": "Bir itirazdan bütün modele",
        "prompt": "İdeal düzenli araç örneği, bırakılan cismin mutlaka geride kalacağı savına karşı durum veriyor. Bundan bütün bir astronomi kuramı tek başına kesinleşir mi?",
        "strategy": "Çürütülen belirli gerekçeyle ispatlanması istenen bütünü ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Örnek ortak yatay hareket koşuluyla mutlaka geride kalma sonucunun zorunlu olmadığını gösterir."
          },
          {
            "label": "2. adım",
            "explanation": "Bu sonuç belirli itiraza yöneliktir; astronomi modelinin bütün başka iddiaları henüz sınanmamıştır."
          },
          {
            "label": "3. adım",
            "explanation": "İtirazın çürütülmesiyle rakip kuramın bütün ayrıntılarının ispatını ayrı sonuçlar olarak tut."
          }
        ],
        "answer": "Hayır; yalnız belirli itiraz etkisizleştirilir.",
        "check": "Karşı durumun gerçekten hangi öncülü hedeflediğini açıkça yaz.",
        "pitfall": "Bir argüman zayıfladı diye rakibin bütün savlarını doğru ilan etme."
      }
    ],
    "recall": [
      {
        "prompt": "Yöntemli kuşkuda hedef nedir?",
        "answer": "Kuşkuyu kalıcı sonuca çevirmek değil, güvenilir kesin dayanak aramak."
      },
      {
        "prompt": "Cogito düşünülen her nesneyi kanıtlar mı?",
        "answer": "Hayır; ilk kapsam düşünme sırasındaki düşünen öznenin varlığıdır."
      },
      {
        "prompt": "Kontrollü deneyde ilk kontrol nedir?",
        "answer": "Hangi etken değişti, hangi ilgili koşullar sabit ve hangi sonuç ölçüldü soruları."
      },
      {
        "prompt": "Rasyonalizm ile düalizm aynı soruya mı cevap verir?",
        "answer": "Hayır; ilki bilgi kaynağı, ikincisi varlığın bağımsız temelleriyle ilgilidir."
      },
      {
        "prompt": "Spinoza’da özgürlük nedensiz keyif midir?",
        "answer": "Hayır; nedenleri anlama ve daha etkin yaşama ilişkisi içinde düşünülür."
      },
      {
        "prompt": "Hobbes’u yalnız güçlü sözünden nasıl ayırırsın?",
        "answer": "Güvensizlik, karşılıklı sözleşme ve ortak egemen yetkilendirme bağını ararım."
      }
    ],
    "source": "Aurelia YKS ilgili kopya kâğıtları, OGM ders notları ve MEBİ konu özetleriyle karşılaştırılarak hazırlanmış özgün öğretim. Tarihsel görüşlerin dayanakları ve sınırları birlikte açıklanır. Uygulama soruları özgündür; resmî sınav sorusu değildir."
  },
  {
    "id": "aydinlanma-felsefesi",
    "subjectId": "tyt-felsefe",
    "title": "Aydınlanma felsefesi",
    "minutes": 120,
    "objectives": [
      "Özerk akıl kullanımıyla gerekçesiz otoriteye bağlılığı ayır.",
      "Fikirlerin eğitim, yayın ve kamusal tartışmayla dolaşımını açıkla.",
      "Hak, hoşgörü ve yönetimin gerekçesini ayrı problem olarak kur.",
      "Dönemin çeşitliliğini akılcılıkla tekleştirmeden ve tarihe tek neden yüklemeden oku."
    ],
    "sections": [
      {
        "title": "Aydınlanma hangi soruyu açar?",
        "paragraphs": [
          "Aydınlanma insanın kendi aklını kullanması, kabul ettiği görüşlerin gerekçelerini araştırması ve otorite karşısında düşünsel bağımsızlık geliştirmesiyle ilişkilidir. Başkasının yerine düşünmesini beklemekle onun bilgisinden yararlanmak aynı şey değildir. Kişi öğretmen veya kitap kullanırken de gerekçeyi kendisi değerlendirebilir.",
          "Bu ders düşünsel özerklik, kamuya açıklanabilir nedenler, eğitim ve fikir dolaşımını öne çıkarır. Bilginin akıl-deney ilişkisi ve devlet kuramlarının ayrıntıları sonraki ayrı başlıkta da işlenecektir. Ortak temalar bulunması, burada yalnız o dersin kısa kopyasını vermeyi gerektirmez."
        ]
      },
      {
        "title": "Kant ve ergin olmayış",
        "paragraphs": [
          "Kant’ın Aydınlanma tartışmasında ergin olmayış, kişinin başkasının kılavuzluğu olmadan kendi anlama yetisini kullanamamasıyla ilişkilidir. Sorun yalnız bilgi eksikliği değil, bağımsız düşünme sorumluluğunu üstlenmeme de olabilir. Aklını kullanma çağrısı bu düşünsel etkinliği teşvik eder.",
          "Bu tarihsel ifadeyi öğrencinin yaşını, engelini veya öğrenme güçlüğünü ahlaki kusur diye yargılamaya dönüştürme. Kavramsal soru kişinin bir yargıyı hangi gerekçeyle kabul ettiğidir. Destek almak özerkliğin karşıtı olmak zorunda değildir; destek, gerekçeyi anlamaya ve kendi kararını kurmaya yardımcı olabilir."
        ]
      },
      {
        "title": "Özerklik ve keyfîlik",
        "paragraphs": [
          "Özerklik kişinin kendi yargısını ve eylem ilkesini akılsal gerekçeyle kurmasıyla ilişkilidir. Yalnız istediğim için yaptım demek her durumda özerk bir gerekçe sunmaz. Bir kararın nedenini başkalarının da değerlendirebileceği biçimde açıklamak, keyfî tercihle gerekçeli düşünceyi ayırır.",
          "Bu nedenle özgür düşünceyi bütün kuralların gereksizliği veya başkalarının haklarının yokluğu diye okumamak gerekir. Bir kuralı eleştirebilmek, hiçbir ortak düzen olmayacağını savunmakla aynı değildir. Hangi kuralın hangi gerekçeyle kabul veya reddedildiğini göster; sadece isyan edildi sözcüğünü yeterli ölçüt sayma."
        ]
      },
      {
        "title": "Otorite ve uzmanlık",
        "paragraphs": [
          "Bir uzman konuyu öğrenmede önemli kaynak olabilir. Aydınlanmacı eleştiri, uzmanı hiç dinlememek değil onun sunduğu bilginin dayanağını sorgulanamaz kişi otoritesinden ayırmakla ilişkilendirilebilir. Kim söyledi sorusu, neye dayanıyor sorusunun yerine tek başına geçmez.",
          "Bir görüşü yalnız sevdiğin kişi söylediği için kabul etmekle onu delilleri için kabul etmek farklı gerekçelerdir. Tersine, bir kurumun otorite olması her iddiasının yanlışlığını da kanıtlamaz. Eleştirellik hem kabulünü hem reddini gerekçelendirmeye açık tutmaktır; refleks olarak karşı çıkmak değildir."
        ]
      },
      {
        "title": "Aklın kamusal kullanımı",
        "paragraphs": [
          "Bir kararın gerekçesinin tartışmaya açılması, başkalarının da savı inceleyebilmesini sağlar. Kamusal akıl kullanımı yalnız içinden düşünmekle sınırlı değildir; görüşlerin erişilebilir biçimde ifade edilmesi ve itirazlara cevap verebilmesi önem taşır. Böylece ortak mesele yalnız kişisel buyruğa dayanmaz.",
          "Bir kurumun emir vermesi ile o emrin haklılığını açıklaması farklı işlerdir. Gerekçe isteği her durumda bütün kararları iptal etmek anlamına gelmez. Etkileşimli örnekte hangi kaynağın ve itiraz yolunun açıldığını görerek kararın değerlendirmeye elverişli olup olmadığını araştıracaksın. Bu, belirli kişi veya kuruma otomatik not vermek değildir."
        ]
      },
      {
        "title": "Eğitim ve erişim",
        "paragraphs": [
          "Kişinin düşüncesini geliştirmesi okuma, soru sorma ve farklı gerekçelere erişme imkânlarıyla desteklenir. Eğitim bu bakımdan yalnız bilgi yığmak değil, yargı kurma ve değerlendirme yetilerini geliştirmekle de ilişkilidir. Anlaşılır dil, düşüncenin daha çok kişi tarafından tartışılmasını kolaylaştırır.",
          "Bununla birlikte bir metnin basitleştirilmesi bütün gerekli ayrımların silinmesi olmamalıdır. Akıl ve deney, hak ve yasa, çoğunluk ve ortak yarar farklı kavramlar olarak açıklanmalıdır. İlk kez öğrenen biri için kavramı tanım, örnek ve karşılaştırmayla kurmak; sonra zor örneğe geçmek daha tutarlı bir öğretim sırasıdır."
        ]
      },
      {
        "title": "Yayın, ansiklopedi ve tartışma",
        "paragraphs": [
          "Kitap, broşür, gazete ve ansiklopedi gibi araçlar bilgilerin düzenlenmesine ve geniş çevrelerde dolaşmasına katkı sağlar. Farklı görüşlerin karşılaştırılabilir olması eleştirinin toplumsal koşullarından biridir. Yayın aracı ile o araçta savunulan görüşün içeriği farklı şeylerdir.",
          "Bir metnin roman olması bütün siyasal veya felsefi savlarını tek başına belirlemez. Aynı tür farklı görüşlere araç olabilir. Metnin ne söylediğini ve nasıl gerekçelendirdiğini ayrıca okumak gerekir. Dolaşımın artması, bütün yorumların eşit derecede doğru veya herkesin aynı fikirde olması anlamına gelmez."
        ]
      },
      {
        "title": "Felsefe ve edebiyat",
        "paragraphs": [
          "Voltaire’in Candide’i, Swift’in Gulliver’in Gezileri ve Rousseau’nun Emile’i gibi eserler insan ve toplum sorularını farklı yazınsal araçlarla açar. Karakter, kurgu veya yergi bir düşünceyi okurun deneyimine yaklaştırabilir. Felsefi görüş yalnız maddeler hâlinde yazılan tanımlarda bulunmaz.",
          "Bir eseri felsefi bakımdan okurken hangi savın hangi olay veya karşılaştırmayla görünür kılındığını sor. Edebi etkilenme tarihsel bir olayın bütün nedenlerini tek bir kitaba indirgemek değildir. Metin bir tartışmaya katkı verebilir; bu katkının kapsamı ayrıca araştırılır. Eser adını bilgi yerine gerekçeyle bağla."
        ]
      },
      {
        "title": "Haklar ve eşitlik",
        "paragraphs": [
          "Aydınlanma bağlamındaki tartışmalarda insan hakları, özgürlük, yurttaşlık ve eşitlik önemli sorular hâline gelir. Haklı yönetimin hangi sınırlara uyması ve bireyin hangi taleplerinin korunması gerektiği araştırılır. Hakların gerekçesi yalnız o anda güçlü olanın tercihiyle özdeşleştirilmez.",
          "Bütün dönem düşünürlerinin eşitliği aynı kapsamda ve aynı kurumlarla savunduğunu varsayma. Tarihsel metinlerdeki dışlamalar ve görüş farkları ayrıca eleştirilebilir. Ortak bir ilginin bulunması görüşlerin bütünüyle aynı olduğu anlamına gelmez. Pasajın hangi hakkı ve hangi ilkeyi gerekçelendirdiğini açıkça göster."
        ]
      },
      {
        "title": "Hoşgörü ve gerekçeli anlaşmazlık",
        "paragraphs": [
          "Bir görüşe katılmamak ile o görüş sahibinin her türlü ifade ve tartışma imkânını ortadan kaldırmak farklı tutumlardır. Hoşgörü tartışmaları farklı inanç ve düşüncelerin ortak yaşamda hangi koşullarda yer alabileceğini sorar. Bu, bütün iddiaları aynı derecede gerekçeli bulmak anlamına gelmez.",
          "Bir kişinin görüşünü yanlış bulabilir ve yine de onun haklarının korunmasını savunabilirsin. Hak tanımakla iddiayı doğru saymak arasındaki bu ayrım önemlidir. Somut bir durumda sınır tartışılıyorsa zarar, özgürlük ve karşılıklı haklar hakkında hangi gerekçenin verildiğine bak; yalnız aynı düşünmeme durumunu yeterli yasak nedeni sanma."
        ]
      },
      {
        "title": "Akıl Çağı tek bir bilgi öğretisi değildir",
        "paragraphs": [
          "Dönemin akla önem vermesi bütün düşünürlerin deneyimi gereksiz gördüğünü göstermez. Deneyci ve eleştirici görüşler de akıl yürütür; aralarındaki anlaşmazlık bilginin kaynağı ve oluşum koşulları hakkındadır. Rasyonalizm terimi bu özel problemdeki yaklaşım adıdır, bütün bir yüzyılın bütün insanlarının değişmez etiketi değildir.",
          "Bir metinde duyusal veri ile zihnin düzenleyici rolü birlikte veriliyorsa ikisini de hesaba kat. Yalnız deney veya yalnız akıl cevabı metnin bir parçasını atlayabilir. Bu ders farkı tanıtır; sonraki başlıkta Locke ve Kant’ın olumlu bilgi açıklamaları ayrıntılı örneklerle karşılaştırılır."
        ]
      },
      {
        "title": "Kant: etkin zihin ve ortak koşullar",
        "paragraphs": [
          "Kant’ın eleştiriciliğinde deneyim malzeme sağlar; zihin bu malzemeyi ortak düzenleyici biçimlerle anlamlandırır. Bu yaklaşım zihni yalnız dışarıdaki şeylerin edilgin kopyasını alan yapı saymaz. Fakat düzenleyicilik herkesin keyfine göre bütünüyle ayrı evren yaratması anlamına da gelmez.",
          "Bir nesneye farklı açılardan bakılması ile nesne deneyiminin ortak koşulları farklı düzeylerdir. Kişisel yorumların farklılığı ortak kavramsal yapının kendiliğinden yokluğu değildir. Pasajın insan türüne ilişkin koşulu mu yoksa bir kişinin rastgele beğenisini mi anlattığını ayır. Aynı zihin sözcüğü iki farklı iddiada bulunabilir."
        ]
      },
      {
        "title": "Toplumsal dönüşüm ve düşünce",
        "paragraphs": [
          "Fransız Devrimi ve Sanayi Devrimi gibi olaylar ortak yaşamın, emeğin ve hakların tartışılma koşullarını etkiler. Bilimsel ve teknik değişimler de insanın doğaya ve topluma bakışını dönüştürebilir. Felsefi görüşlerle siyasal-ekonomik süreçler arasındaki ilişki tek yönlü ve tek nedenli olmak zorunda değildir.",
          "Bir düşünce olayları etkileyebilir ve olaylardan etkilenebilir. Bir kitaba katkı rolü vermek, o kitap olmadan hiçbir dönüşümün mümkün olmadığını kanıtlamaz. Verilen tarihsel bağın yönünü ve kapsamını söyle; metinde belirtilmeyen bütün koşulları gereksiz ilan etme. Çoklu neden düşüncesi olumsuz uyarı değil daha iyi açıklama kurma yöntemidir."
        ]
      },
      {
        "title": "Romantizm ve realizmle ilişki",
        "paragraphs": [
          "Romantizm duygu, hayal gücü ve bireysel yaşantıyı; edebi realizm ise insan ve toplum gerçeğinin gözleme dayalı temsillerini farklı biçimlerde öne çıkarabilir. İkisi de 18–19. yüzyılın düşünsel ve yazınsal ortamıyla ilişki içindedir. Her metnin dili ve amacı kendi bağlamında değerlendirilir.",
          "Edebiyattaki realizm ile varlık felsefesindeki gerçekçilik aynı sorunun cevabı değildir. Ayrıca Tolstoy ve Dostoyevski’nin burada anılan eserleri 19. yüzyıla aittir; geniş dönem listesinde yer almaları onları 18. yüzyıl eseri yapmaz. Kavram benzerliğini ve tarihsel sınıflamayı birbirine karıştırma."
        ]
      },
      {
        "title": "Düşünsel ilerleme ve yanılabilirlik",
        "paragraphs": [
          "İnsan aklına güvenmek her akıl yürütmenin yanılmaz olduğunu iddia etmek zorunda değildir. Bir savın öncüllerini açmak, karşı örneğe bakmak ve eleştiriye cevap vermek bu güveni işleyen bir araştırmaya dönüştürebilir. Hata ihtimali sorgulamayı anlamsız değil gerekli kılar.",
          "Bu nedenle aklını kullan ifadesini her bildiğin kesin doğrudur diye çevirmemelisin. Kendi yargını kurarken hangi veriyi kullandığını ve hangi çıkarımı yaptığını açıkla. Yeni gerekçe karşısında kapsamını düzeltebilmek düşünsel sorumluluğun parçasıdır. Yalnız ilk cevabını savunmakla öğrenme aynı şey değildir."
        ]
      },
      {
        "title": "Yasallık ve kamusal haklılık",
        "paragraphs": [
          "Bir kararın mevcut usulle alınmış olması yasal süreç hakkında bilgi verir. Kararın etkilenen kişilere hangi gerekçeyle savunulabileceği ise farklı bir sorudur. Aydınlanma bağlamında otoritenin kendisini açıklamaya açılması bu ayrımı görünür kılabilir. Güç, usul ve haklılık birbirini otomatik tamamlamaz.",
          "Bir kurgu örnekte gerekçe yayımlanmış fakat kaynağı gizliyse kişi savı bütünüyle denetleyemeyebilir. İtiraz yolu açıldığında yeni değerlendirme imkânı doğar. Bu koşulları tek bir adalet yüzdesine dönüştürmeden hangi bilginin var olduğunu ve hangisinin eksik kaldığını göster. Model bu işlevi öğretmek için hazırlanmıştır."
        ]
      },
      {
        "title": "Dönemi metin kanıtıyla tanı",
        "paragraphs": [
          "Kendi yargısını gerekçelendiren özne, kamuya açılan tartışma, eğitim ve hakların savunulması Aydınlanma bağlamıyla ilişkilendirilebilir. Fakat bunlardan bir tek kelimenin bulunması belirli düşünürü kesin seçtirmez. Pasajın neyi savunduğunu ve karşı çıktığı görüşü kendi cümlenle ifade et.",
          "Olumsuz soru kökünde desteklenmeyen veya karşıt yargıyı ara. Bütün düşünürler aynıdır, bütün deneyler gereksizdir, bütün dinî görüşler ortadan kalkmıştır gibi kapsamlı iddialar için ayrıca kanıt gerekir. Bir görüş farkı görmek dönemin ortak sorularını inkâr etmek değildir; ortaklığı ve farkı birlikte anlatabilmektir."
        ]
      },
      {
        "title": "Gerekçe yolunu kendin aç",
        "paragraphs": [
          "Etkileşimli örnekte kurgu bir kararın emir, açık gerekçe, erişilebilir kaynak ve itiraz aşamalarını ayrı göreceksin. Açılan her yol kişinin hangi değerlendirmeyi yapabildiğini gerçekten değiştirecek. Model, bütün Aydınlanmayı dört düğmeye sığdıran bir başarı testi değil belirli kavram bağını inceleme aracıdır.",
          "Seçiminden sonra hangi yeni imkânın doğduğunu ve hangi sonucun hâlâ çıkmadığını yaz. Bir kaynağın açılması görüşün kesin doğruluğu değildir; savın denetlenebilir olmasıdır. Ardından aynı yapıyı farklı bir ortak yaşam kararında, gerçek kişilere değer notu vermeden kendi cümlelerinle kurmayı dene."
        ]
      }
    ],
    "examples": [
      {
        "title": "Özerklik ve destek",
        "prompt": "Bir öğrenci öğretmeninden açıklama istiyor, ardından gerekçeleri karşılaştırıp kendi yargısını kuruyor. Destek alması düşünsel özerkliği zorunlu ortadan kaldırır mı?",
        "strategy": "Kaynak kullanmayla kendi değerlendirmesini başkasına bırakmayı ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Öğrenci öğretmeni yalnız emir veren sorgulanamaz otorite olarak kabul etmiyor."
          },
          {
            "label": "2. adım",
            "explanation": "Verilen gerekçeleri kendisi karşılaştırarak kararını kurduğu açıkça belirtiliyor."
          },
          {
            "label": "3. adım",
            "explanation": "Destek bu durumda bağımsız değerlendirmeye yardımcıdır; her destek bağımlılık sonucu vermez."
          }
        ],
        "answer": "Hayır; gerekçeli kendi değerlendirmesi korunuyor.",
        "check": "Kararın dayanağı öğretmenin adı mı yoksa açıklanan nedenler mi, denetle.",
        "pitfall": "Özerkliği hiçbir kitaba veya kişiye başvurmama zorunluluğu sanma."
      },
      {
        "title": "Kamusal gerekçe",
        "prompt": "Kurgu bir yönetici “Ben emrettim.” diyor. Başka bir düzenlemede kararın nedeni, kullanılan kaynak ve itiraz yolu herkesçe erişilebilir. Hangi değerlendirme imkânı değişir?",
        "strategy": "Kararı duyurmakla dayanaklarını incelemeyi ayrı tut.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk açıklama yalnız yetkilinin buyruğunu bildirir; gerekçenin kendisi açık değildir."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci düzenlemede neden ve kaynak görülebilir, itirazla denetim olanağı vardır."
          },
          {
            "label": "3. adım",
            "explanation": "Bu, savın değerlendirmeye açıldığını gösterir; kararın kesin doğru veya kusursuz adil olduğunu kanıtlamaz."
          }
        ],
        "answer": "Gerekçeyi inceleme ve itiraz etme imkânı artar.",
        "check": "Açık kaynak bulunmasının tek başına bütün sonucu ispatlayıp ispatlamadığını sor.",
        "pitfall": "Denetlenebilirlik ile yanılmazlığı aynı özellik sayma."
      },
      {
        "title": "Ortak zihin ve keyif",
        "prompt": "Bir pasaj duyusal verilerin insanın ortak zihinsel biçimleriyle düzenlendiğini söylüyor. Öğrenci bunu herkes istediği evreni yaratır diye yorumluyor. Nerede hata var?",
        "strategy": "Ortak koşulla kişisel keyfîliği karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Pasaj düzenleyici katkıyı insan bilmesinin ortak yapısıyla ilişkilendiriyor."
          },
          {
            "label": "2. adım",
            "explanation": "Öğrenci bu ortak koşulu her bireyin sınırsız tercihine dönüştürerek yeni bir sav ekliyor."
          },
          {
            "label": "3. adım",
            "explanation": "Kantçı etkin zihin vurgusu kişisel keyfî dünya üretimi değildir; pasajın kapsamı korunmalıdır."
          }
        ],
        "answer": "Ortak zihinsel koşul bireysel keyfî kurala çevrilmiştir.",
        "check": "Duyusal malzemenin de pasajda korunduğunu kontrol et.",
        "pitfall": "Zihin katkısı varsa dış verinin hiçbir rolü yok sonucunu ekleme."
      },
      {
        "title": "Fikir ve tarihsel değişim",
        "prompt": "Bir yazarın kitabının hak tartışmalarını yaydığı, ekonomik ve siyasal koşulların da toplumsal dönüşümde etkili olduğu anlatılıyor. Kitap tek zorunlu neden midir?",
        "strategy": "Verilen katkı ile iddia edilen zorunlu tek nedeni ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Metin kitabın fikir dolaşımına katkısını açıkça belirtir; bu katkıyı inkâr etmiyoruz."
          },
          {
            "label": "2. adım",
            "explanation": "Aynı metin başka etkenleri de verir; onların etkisizliği kanıtlanmış değildir."
          },
          {
            "label": "3. adım",
            "explanation": "Bir eserin önemli olması tek başına bütün dönüşümün zorunlu ve yeterli nedeni olduğunu göstermez."
          }
        ],
        "answer": "Hayır; çok etkenli süreçte bir katkıdır.",
        "check": "Kitabın etkisini kabul ederken tek neden iddiasını reddedebildiğini göster.",
        "pitfall": "Bir düşünürün katkısını bütün olayların tam açıklamasıyla özdeşleştirme."
      }
    ],
    "recall": [
      {
        "prompt": "Özerklik destek almamak demek midir?",
        "answer": "Hayır; kaynaklardan yararlanırken kendi yargısını gerekçeyle kurabilmek önemlidir."
      },
      {
        "prompt": "Kamusal gerekçe yanılmazlık mı sağlar?",
        "answer": "Hayır; savın incelenmesine ve itirazla denetlenmesine imkân verir."
      },
      {
        "prompt": "Akıl Çağı bütün düşünürler yalnız akılcıdır demek midir?",
        "answer": "Hayır; deneyci ve eleştirici açıklamalar da dönemin farklı görüşleridir."
      },
      {
        "prompt": "Düşüncenin yayılması ile doğruluğu aynı mıdır?",
        "answer": "Hayır; dolaşım, görüşün ele alınmasını kolaylaştırır, doğruluğunu kendiliğinden kanıtlamaz."
      }
    ],
    "source": "Aurelia YKS ilgili kopya kâğıtları, OGM ders notları ve MEBİ konu özetleriyle karşılaştırılarak hazırlanmış özgün öğretim. Tarihsel görüşlerin dayanakları ve sınırları birlikte açıklanır. Uygulama soruları özgündür; resmî sınav sorusu değildir."
  },
  {
    "id": "18-19-yuzyil-felsefesi",
    "subjectId": "tyt-felsefe",
    "title": "18–19. yüzyıl: akıl, deney, birey ve devlet",
    "minutes": 130,
    "objectives": [
      "Locke ve Kant’ta bilginin kaynağı ve oluşumunu olumlu örneklerle açıkla.",
      "Birey-devlet ilişkisini hak, sözleşme, denetim ve ortak yararla karşılaştır.",
      "Kant’ın ahlaki gerekçesini Bentham’ın sonuç ölçütünden ayır.",
      "Hegel’de bütünlük, oluş ve diyalektiğin işlevini mekanik kalıba indirgemeden anlat."
    ],
    "sections": [
      {
        "title": "Dört problem alanını ayır",
        "paragraphs": [
          "Bu dönemde bilginin kaynağı, birey-devlet ilişkisi, ahlakın ilkesi ve varlığın oluşu gibi problemler öne çıkar. Bir düşünür birkaç alanda görüş geliştirebilir; aynı adın geçmesi iki pasajın aynı soruya cevap verdiğini göstermez. Önce neyin bilinmek veya gerekçelendirilmek istendiğini belirlemek gerekir.",
          "Bilgi nasıl oluşur sorusunda deney ve akıl; yönetim niçin haklıdır sorusunda hak ve ortak irade; eylem niçin iyidir sorusunda niyet ve sonuç; değişim nasıl açıklanır sorusunda tin ve diyalektik iş görür. Bu kavramları tek bir çağ etiketi altında eritmek yerine her soruya uygun dayanağı kur."
        ]
      },
      {
        "title": "Akılcılık ve deneycilik",
        "paragraphs": [
          "Akılcı yaklaşımlar güvenilir bilgide aklın ilke ve çıkarımlarına öncelik tanırken deneyci yaklaşımlar bilgi malzemesinin deneyimden gelişini öne çıkarır. İkisi de akıl yürütebilir; ayrım yalnız birinin düşündüğü, ötekinin hiç düşünmediği değildir. Tartışılan, bilginin kaynağı ve gerekçesidir.",
          "Bir metnin gözlemden söz etmesi her durumda yalnız deneycilik savunduğunu göstermez. Kant da deneyimden söz eder ama onunla yetinmez. Önce metinde deneyin kaynak mı, sınama aracı mı veya zihnin düzenlediği malzeme mi olarak kullanıldığını açıkla. Aynı terimin farklı işlevlerini ayırmak gerekir."
        ]
      },
      {
        "title": "Locke ve boş levha",
        "paragraphs": [
          "Locke doğuştan hazır ide ve ilkelerle dolu bir zihin anlayışına itiraz eder. Tabula rasa, boş levha benzetmesiyle idelerin deneyim yoluyla kazanılmasını açıklar. Daha önce tadılmamış bir meyvenin tadını öğrenmek veya yeni bir sesi tanımak, duyusal yaşantının bilgi malzemesindeki rolünü somutlaştırır.",
          "Bu benzetme insanın hiçbir düşünme yetisi olmadığı veya zihnin gelen her şeyi aynı biçimde kaydettiği anlamına gelmez. İdelerin edinilmesiyle onların zihinde karşılaştırılması ve birleştirilmesi farklı işlerdir. Boş levha ifadesinden bütün sonraki düşüncenin edilgin ve işlemsiz olduğu sonucu çıkarılmamalıdır."
        ]
      },
      {
        "title": "Dış deney: duyulur nitelikler",
        "paragraphs": [
          "Locke’un dış deney açıklamasında duyu organları yoluyla dış dünyadaki şeylerin nitelikleriyle karşılaşırız. Renk, ses, sıcaklık veya tat gibi içerikler bu edinim yoluna örnek olabilir. Burada soru belirli deneyimin zihne hangi malzemeyi sağladığıdır.",
          "Bir duyusal niteliğe ilişkin idenin edinimi ile bu nitelik hakkında genel yargı kurmak aynı adım değildir. Kırmızı bir yüzey görmekten bütün yüzeyler kırmızıdır sonucuna geçmek ek bir genellemedir. Kaynak sorusunu cevapladıktan sonra bu ek çıkarımın hangi kapsamı kullandığını ayrıca denetle."
        ]
      },
      {
        "title": "İç deney: zihnin kendi işlemleri",
        "paragraphs": [
          "İç deney veya refleksiyon, zihnin düşünme, isteme, kuşku duyma ve karşılaştırma gibi kendi işlemlerini fark etmesiyle ilişkilidir. Locke yalnız dışarıdaki nesneye bakmayı değil, bu zihinsel etkinliklerin yaşantısını da deneyimin bir yolu olarak ele alır. Bu içerikler dış nesnenin rengi gibi doğrudan aynı tür değildir.",
          "Kişinin kuşku duymasıyla kuşku duyduğunu fark etmesi arasındaki farkı düşün. Zihnin kendi faaliyetine yönelmesi iç deney açıklamasını somutlaştırır. Bunu Descartes’ın bütün kesinlik argümanıyla özdeşleştirme; iki düşünür aynı zihinsel sözcüğü farklı bilgi kuramlarında kullanabilir. Önce sorunun edinim mi kesin temel mi olduğunu bul."
        ]
      },
      {
        "title": "Basit ve bileşik ideler",
        "paragraphs": [
          "Locke’ta deneyimden gelen basit içeriklerle zihnin birleştirme, karşılaştırma ve soyutlama işlemleriyle kurduğu daha karmaşık içerikler ayrılır. Yeni bir nesne tasarlamak, deneyimle edinilen malzemenin farklı biçimde birleştirilmesini içerebilir. Kaynağın deney olması zihnin bütün üretici işlemlerini dışlamaz.",
          "Bir örnekte hangi malzemenin edinildiğini ve onunla hangi işlemin yapıldığını ayrı yaz. Renk ile biçimi yeni bir tasarımda birleştirmek, bütün tasarımın duyularda hazır bulunduğunu söylemek değildir. Bu ayrım deneyciliği pasif kopya makinesi benzetmesine indirgememeyi sağlar."
        ]
      },
      {
        "title": "Hume: izlenim, fikir ve nedensellik",
        "paragraphs": [
          "Hume deneyimci bilgi tartışmasında daha canlı edinimler olan izlenimlerle, bunların hatırlama veya tasarım içindeki fikirlerini ayırır. Sıcaklığı doğrudan hissetmekle daha sonra o yaşantıyı düşünmek aynı canlılıkta olmayabilir. Bu görüş zihnin işlemlerini sınıflandırır; izlenim ve fikri yalnız iki farklı sözcüğün rastgele eşleştirilmesi gibi görmemelisin.",
          "Nedensellik sorununda tekrar tekrar birlikte veya art arda gözlediğimiz olaylardan zorunlu bağlantıya nasıl geçtiğimizi sorar. Bir olayın ardından ötekini bekleme alışkanlığı ile zorunlu bağın kendisini duyuyla görmek ayrı iddialardır. Ateşten sonra ısı beklemek örneğinde kayıtlı tekrarları ve eklenen zorunluluk yargısını ayrı yaz. Bu felsefi sorgulamayı doğada hiçbir olay gerçekleşmez veya neden araştırılamaz biçiminde genelleme."
        ]
      },
      {
        "title": "A priori ve a posteriori",
        "paragraphs": [
          "A priori, belirli deneyimlerden bağımsız gerekçelendirmeyle; a posteriori ise deneyime dayalı gerekçelendirmeyle ilişkilidir. Ayrım bir bilgiyi takvimde önce veya sonra öğrenmekten ibaret değildir. Bir öğrenci matematiksel bir ilişkiyi geç öğrenmiş olsa da onun ispatı belirli nesneleri tek tek saymaya dayanmak zorunda değildir.",
          "Bir örnek verirken kullanılan modelin koşullarını açık tut. Öklid geometrisindeki ideal üçgen ilişkisiyle gerçek bir tarlanın ölçümü aynı gerekçelendirme işi değildir. Her önce kelimesini doğuştan hazır bütün bilgi, her deney kelimesini akılsızlık diye çevirmeden hangi dayanağın gerekli olduğunu sor."
        ]
      },
      {
        "title": "Kant: deneyimle başlamak",
        "paragraphs": [
          "Kant bilginin deneyimle başladığını fakat tümünün deneyimden çıktığının söylenemeyeceğini savunur. Duyular malzeme sağlar; zihnin bu malzemeyi düzenleyen yapıları da gerekir. Böylece yalnız dış girdinin veya yalnız boş kavramın yeterli olmadığı bir bilgi açıklaması kurulur.",
          "Bu yaklaşımı akılcılık ve deneyciliğin yüzdelerini toplayan aritmetik ortalama gibi düşünme. Kant bilginin hangi koşullarda mümkün olduğunu sorar. Verilen pasajda duyusal içerik ve düzenleyici katkıyı ayrı işaretle, sonra aralarındaki zorunlu işlev bağını açıkla. Etiket, bu olumlu açıklamanın sonrasında gelir."
        ]
      },
      {
        "title": "Duyarlık ve anlama yetisi",
        "paragraphs": [
          "Kant’ın kuramsal açıklamasında duyarlık nesnelerin bize verilişinde, anlama yetisi ise kavramsal düzenlemede rol oynar. Zaman ve mekân duyarlığın biçimleri olarak; kategoriler ise nesne deneyiminin düşünülmesinde iş gören yapılar olarak ele alınır. Hepsi rastgele seçilmiş kişisel beğeni değildir.",
          "Bu kavramları fiziksel beynin resimde ölçülen bölümleri gibi sunma. Burada deneyimin imkân koşullarına ilişkin felsefi çözümleme yapılır. Bir kişinin farklı renk tercihleriyle insan bilmesinin ortak koşulları farklı düzeylerdir. Etkin zihin ifadesi herkes istediği gerçekliği keyfince üretir sonucuna çevrilmemelidir."
        ]
      },
      {
        "title": "Fenomen ve kendinde şey",
        "paragraphs": [
          "Kant’ta fenomen, insanın bilme koşulları içinde deneyimlenen nesneyle ilişkilidir. Kendinde şey ise nesneyi bu koşullardan bağımsız ele alma sınır sorusunu açar. Ayrım yalnız görünüşler yalandır veya dış dünyada hiçbir şey yoktur diye kurulmaz.",
          "Deneyim bilgisinin sınırını kabul etmek, her iddianın aynı derecede geçerli olduğu anlamına gelmez. Kuramsal bilgi için hangi duyusal ve kavramsal koşulların gerektiğini sor. Deneyim alanının dışına aynı kuramsal yöntemi sınırsız taşımak problem doğurabilir. Bilginin sınırı ile bütün düşünmenin yasaklanması aynı şey değildir."
        ]
      },
      {
        "title": "Teorik ve pratik akıl",
        "paragraphs": [
          "Teorik akıl doğaya ilişkin bilginin koşul ve sınırlarını; pratik akıl eylem ve ahlak yasasını tartışmada farklı işlevler taşır. Kant’ın ahlak bağlamındaki özgürlük ve postulat düşünceleri, aynı nesnenin laboratuvarda ölçülmesi gibi bir kanıt türü değildir. Alanların işlevleri ayrı tutulmalıdır.",
          "Bir pasajda aklın kuramsal sınırı verilmişse bundan ahlak hakkında hiç düşünemeyeceği sonucunu çıkarma. Tersine, ahlak için kullanılan bir kabulü de duyular üstü nesnenin doğa bilgisiyle aynı biçimde kanıtlanması sayma. Önce istenen bilginin veya gerekçenin türünü belirle; metnin sınırını koru."
        ]
      },
      {
        "title": "Locke: haklar ve tarafsız kurum",
        "paragraphs": [
          "Locke’un siyaset anlayışında yaşam, özgürlük ve mülkiyet gibi doğal hakların korunması yönetimin gerekçesinde önemlidir. İnsanların kendi anlaşmazlıklarında tarafsız davranamaması, ortak yasa ve tarafsız yargı ihtiyacını doğurabilir. Yönetim bu hakların amacı değil, onları güvenceye almanın aracıdır.",
          "Bu nedenle hakları koruyan sözleşmeyi bütün hakların sınırsızca silinmesine izin veren açıklamayla özdeşleştirme. Aynı sözleşme terimi farklı düşünürlerde başka amaç ve sınırlarla kullanılır. Metinde korunacak hak, devredilen yetki ve yönetimin sınırı hangi gerekçeyle verilmişse onları açıkça göster."
        ]
      },
      {
        "title": "Montesquieu: üç işlev",
        "paragraphs": [
          "Yasama yasa koyma, yürütme uygulama, yargı uyuşmazlık hakkında hüküm verme işlevleriyle ayrılır. Montesquieu ile ilişkilendirilen kuvvetler ayrılığı, yetkilerin tek elde sınırsız biçimde toplanmasını önleyecek düzenlemeyi düşünür. Amaç yalnız üç kurum adı üretmek değildir.",
          "Bir kurumda üç ayrı tabela bulunup bütün kararları aynı kişi belirliyorsa fiilî yetki ayrılığı hakkında yeterli kanıt yoktur. Kim karar veriyor, kim denetliyor, hangi itiraz yolu var sorularını somutlaştır. Etkileşimli modelde kutu adları aynı kalırken gerçek bağlantıların değişmesi bu farkı görünür kılacaktır."
        ]
      },
      {
        "title": "Üç hukuk alanı, üç erkten farklıdır",
        "paragraphs": [
          "Montesquieu ile ilişkilendirilen hukuk ayrımında devletler hukuku toplumlar veya siyasal birlikler arasındaki ilişkilere; siyasal hukuk yönetimle yönetilenlerin devlet içindeki ilişkisine; medeni hukuk ise kişilerin birbirleriyle ilişkilerine yönelir. Üçünde de hukuk sözcüğü geçmesi aynı ilişki taraflarını inceledikleri anlamına gelmez.",
          "Bir pasajı çözerken ilişkinin taraflarını önce yaz: farklı devletler mi, yönetim ile yönetilen mi, kişiler mi? Ardından ilgili alanı seç. Bu alan ayrımı yasama-yürütme-yargı işlevlerinin ayrılığıyla aynı tablo değildir. Medeni hukuk yargının eş anlamı, devletler hukuku da yalnız yasamanın adı değildir; birinde düzenlenen ilişki, ötekinde siyasal görev sorulmaktadır."
        ]
      },
      {
        "title": "Denetim ve özgürlük ilişkisi",
        "paragraphs": [
          "Yetkinin sınırlandırılması, karardan etkilenen kişilerin keyfî uygulamaya karşı başvurabileceği yollarla ilişkilidir. Bağımsız bir yargı organının varlığı yalnız adla değil, karar verebilme koşullarıyla değerlendirilir. Bir işlevin diğerini denetlemesi ortak düzenin kendi gücünü sınırlandırabilmesini sağlar.",
          "Bu kavramsal koşulları gerçek bir ülkeye otomatik demokratiklik yüzdesi veren algoritma sanma. Kurumların tarihsel ve hukuki ayrıntıları çok daha kapsamlıdır. Hazırlanmış örnekte yalnız hangi işlevin hangi yetkiye bağlı olduğunu ve seçili şartın neyi gösterdiğini değerlendir. Adaletin bütününü üç okla ölçtüğünü söyleme."
        ]
      },
      {
        "title": "Rousseau: doğa ve toplumsallaşma",
        "paragraphs": [
          "Rousseau insanın doğal özgürlüğüyle toplumsal eşitsizlik ve bağımlılıkların gelişimi arasındaki gerilimi tartışır. İş bölümü, mülkiyet ve toplumsal düzenin hangi ilişkileri doğurduğu bu sorunun parçasıdır. Doğa durumu açıklaması yalnız bütün insanlığın belgelenmiş tek başlangıç gününü anlatmaz.",
          "Özgür doğmak ile toplumsal yaşamda bağımlı hâle gelmek arasındaki sorunu kurduktan sonra çözümün ne olduğunu sor. Her ortak kurumun mutlaka aynı biçimde köleleştirdiğini veya doğaya bütünüyle geri dönmenin önerildiğini varsayma. Tarihsel yozlaşma eleştirisiyle haklı ortak düzenin normatif tasarımı ayrı düzeylerdir."
        ]
      },
      {
        "title": "Genel irade ve meşru sözleşme",
        "paragraphs": [
          "Rousseau’nun meşru ortak yaşam arayışında genel irade ortak yararı hedefleyen yurttaş iradesiyle ilişkilidir. Özel çıkarların toplamı veya herhangi bir anketin çıplak çoğunluğu onun otomatik eş anlamı değildir. İnsanların ortak kurallara katılmasıyla özgürlük ve siyasal birlik arasındaki bağ araştırılır.",
          "Bu yüzden bir çoğunluğun dar grup çıkarını seçtiği örneği sadece sayı üstünlüğüyle genel irade sayma. Aynı zamanda genel irade denildiğinde önerilen her gerçek politikanın kusursuzluğu kanıtlanmış değildir. Metnin hangi ortak yarar ölçütünü kullandığını ve iradenin nasıl gerekçelendirildiğini göster."
        ]
      },
      {
        "title": "Aynı düşünürün farklı görüşleri",
        "paragraphs": [
          "Locke’un deneyci bilgi anlayışıyla hakları koruyan yönetim anlayışı aynı kişinin farklı problemlerdeki görüşleridir. Birini ötekinden hiçbir ek dayanak olmadan zorunlu çıkaramazsın. Benzer biçimde Kant’ın bilgi kuramıyla ahlak öğretisi arasında ilişki vardır ama aynı soru ve aynı cevap değildir.",
          "Soru iki pasaj veriyorsa önce her birinin alanını belirle. İlkinde bilginin kaynağı, ikincisinde yönetimin meşruluğu sorulabilir. Metin birkaç düşünürün görüşünü birleştirmişse tek ad seçmeye çalışmak da yanlış olabilir. Her eşleştirmenin kendi gerekçesini ayrı tutmak birleştirilmiş soruları anlaşılır kılar."
        ]
      },
      {
        "title": "Kant: iyi isteme ve ödev",
        "paragraphs": [
          "Kant eylemin ahlaki değerini yalnız ortaya çıkan yararla ölçmez; eylemin hangi ilke ve niyetle yapıldığını araştırır. İyi isteme, ahlak yasasına saygıdan kaynaklanan iradeyle ilişkilidir. Sonucun iyi olması, onu doğuran her niyetin aynı ahlaki değeri taşıdığını göstermez.",
          "Bir kişi borcunu yalnız ceza korkusuyla ödeyebilir; başka biri doğru olanı yapma gereğini esas alabilir. Dış eylem benzer olsa da gerekçe farklıdır. Burada öğrenci kişinin içini tahmin etmeye çalışmaz; kurgu örnekte açıkça verilen niyeti kullanır. Verilmeyen niyet hakkında kesin hüküm kurulmaz."
        ]
      },
      {
        "title": "Ödeve uygun ve ödevden dolayı",
        "paragraphs": [
          "Ödeve uygun eylem dışarıdan ahlak kuralıyla uyumludur. Ödevden dolayı eylem ise bu uygunluğun yanında eylemin gerekçesini ahlak yasasına saygıda bulur. Ödül elde etmek için doğru söylemekle doğruyu sırf ödev olduğu için söylemek bu ayrımı somutlaştırabilir.",
          "Kaynaklarda bazen yalnız ödeve uygunluk denilip niyet ayrımı atlanabilir; bu iki kavramı eşitleme. Aynı doğru cevabı bilmek ve aynı dış davranışı yapmak niyeti kendiliğinden belirlemez. Soruda eylem ve verilen gerekçeyi iki ayrı satıra yaz. Böylece ahlaki değer tartışmasının nerede kurulduğunu açık görürsün."
        ]
      },
      {
        "title": "Maksim ve koşulsuz buyruk",
        "paragraphs": [
          "Maksim kişinin eylemini yöneten öznel ilkedir; örneğin çıkarım olduğunda sözümü tutmayacağım bir maksim olabilir. Kant bu ilkenin herkes için geçerli yasa olarak istenip istenemeyeceğini sorar. Evrenselleştirme testi kişisel rahatlığı evrensel ilkeyle karşılaştırmaya yönelir.",
          "Koşulsuz buyruk yalnız belirli kazancı elde etmek istiyorsan şu aracı kullan biçiminde değildir. Ahlaki ilkenin bağlayıcılığı rastgele arzuya bağlanmaz. Maksimi baştan zaten evrensel yasa diye tanımlamak testi gereksiz kılar; önce öznel ilkeyi yaz, sonra hangi çelişki veya sorun doğurduğunu gerekçelendir."
        ]
      },
      {
        "title": "İnsanlığı yalnız araç saymamak",
        "paragraphs": [
          "Kant’ın insanlık formülünde kişinin kendisindeki ve başkasındaki insanlık yalnız araç değil aynı zamanda amaç olarak ele alınır. Bu, insanlar arasında hiçbir işbirliği ve araçsal ilişki kurulamaz demek değildir. Başkasını rızası ve amaçları hiçe sayılan bir nesneye indirgememek belirleyici farktır.",
          "Bir hizmet karşılıklı rıza ve haklarla yürütülebilir; aldatma veya zorlamayla kişinin iradesini devre dışı bırakmak başka bir ilişkidir. Soruda hangi koşulun verildiğini açıkça göster. Sadece birinin başka birine yardım etmesinden ahlaki ihlal sonucu çıkarma; yalnız araç olma iddiası için ilgili dayanak gerekir."
        ]
      },
      {
        "title": "Bentham: sonuç ve toplam yarar",
        "paragraphs": [
          "Bentham’ın faydacı yaklaşımında eylemin sonuçlarının ilgili insanların haz ve acıları bakımından değerlendirilmesi önemlidir. Kimin etkilendiği ve toplam yarar-zararın nasıl dağıldığı hesaba katılır. Ölçüt yalnız eylemi yapan kişinin kazancı veya oylamada en çok el kaldıranların sayısı değildir.",
          "Bir öğretim örneğinde fayda birimleri açıkça varsayılabilir; bunlar gerçek bütün insan mutluluğunu kesin ölçen sayı sanılmamalıdır. Çoğunluğun oyunu alan her kararın kendiliğinden en yüksek toplam yararı sağladığı da çıkmaz. Kant’la karşılaştırırken biri hangi niyetin, diğeri hangi sonucun ölçütünü öne çıkarıyor sorusunu kullan."
        ]
      },
      {
        "title": "Mill: fayda içinde hazların niteliği",
        "paragraphs": [
          "John Stuart Mill faydacı çizgide mutluluk ve acıdan kaçınma sorununu bütün etkilenenlerle ilişkilendirir. Bunun yanında hazların yalnız miktarını değil niteliklerini de karşılaştırır. Düşünsel ve insani yetilerin kullanıldığı yaşantıların değeri, yalnız daha uzun sürme veya daha çok kez tekrarlanma sayısıyla tüketilemez. Bu, Mill’in yaklaşımını salt nicelik hesabından ayıran önemli bir yöndür.",
          "Mill bu karşılaştırmada iki haz türünü de tanımış olanların değerlendirmesine başvurur. Buradaki nitelik farkını yalnız toplumun çok beğendiği şey iyidir diye oy sayımına dönüştürme. Bir örnekte yalnız hazların süresi verilmişse nitelik ölçütünün de verilmiş olduğunu varsayamazsın. Önce hangi yaşantı türlerinin, hangi deneyim ve değerlendirme dayanağıyla karşılaştırıldığını göster."
        ]
      },
      {
        "title": "Hegel: idealizm ve bütün",
        "paragraphs": [
          "Hegel’de gerçeklik, tin veya Geist kavramıyla ilişkili gelişen bir bütün olarak ele alınır. Tek bir parçayı süreç ve ilişkilerinden koparmak bütünün ne olduğunu anlamaya yetmeyebilir. İdealizm burada kişinin günlük hayatta iyi niyetli ideal sahibi olmasının adı değildir; varlık ve düşüncenin ilişkisine dair felsefi görüştür.",
          "Bir palamudu göstermek gelişmiş meşenin bütün özelliklerini henüz göstermeyebilir; kaynak metindeki benzetme başlangıç ile gerçekleşmiş bütün ayrımını açıklar. Benzetmeyi bütün toplumsal süreçlerin biyolojik ağaç takvimine uyması sanma. Hegel’in süreç ve gerçekleşme fikrini önce kendi sorusuyla kur."
        ]
      },
      {
        "title": "Diyalektik ve dönüşüm",
        "paragraphs": [
          "Diyalektik, bir belirlenimin kendi sınır ve karşıtlığıyla ilişkisi içinde dönüşmesini düşünmeye yönelir. Ders özetlerinde tez-antitez-sentez üçlüsü bu süreci tanıtmak için kullanılabilir; fakat her olaya mekanik olarak üç etiket yapıştırmak Hegel’in bütün çözümlemesini vermez. Karşıtların nasıl doğduğu ve dönüşümde neyin korunduğu önemlidir.",
          "Hegel’de tin, doğa ve insanın kültürel dünyası arasındaki ilişki süreç içinde ele alınır. Bu anlatım her fiziksel nesnenin sırayla üç kutuda üretildiği deney modeli değildir. Yeni aşamada yalnız öncekini silmek değil, sınırlarını aşarken kimi belirlenimlerini korumak da tartışılır. Üçlü adı değil gerçek dönüşüm ilişkisini açıkla."
        ]
      },
      {
        "title": "Comte: açıklama tarzlarının üç hâli",
        "paragraphs": [
          "Comte’un üç hâl öğretisi, insan düşüncesinin açıklama yollarına ilişkin tarihsel bir tasvirdir. Teolojik hâlde olaylar tanrısal güç ve iradelerle; metafizik hâlde soyut öz veya güçlerle; pozitif hâlde gözlenebilir olgular arasındaki düzenli ilişkilerle açıklanır. Burada aynı üç olaya farklı ad koymaktan çok açıklamanın hangi dayanağa başvurduğu değişir.",
          "Bir örneği önce neyi açıklıyor, sonra hangi dayanakla açıklıyor diye oku. Olgusal ilişki araştırması ile ilk veya mutlak neden arayışı arasındaki farkı göster. Comte’un bu sıralamayı savunmuş olması her kişinin bugün tek bir aşamadan oluştuğunu veya tarihteki her toplumun tartışmasız aynı çizgiyi izlediğinin kanıtlandığını göstermez. Öğrenilecek ilk şey görüşün olumlu yapısı, ardından tarihsel kapsamının sınırıdır."
        ]
      },
      {
        "title": "Görüşleri gerekçeyle karşılaştır",
        "paragraphs": [
          "Deneyden malzeme edinme Locke’u, deneyim ve ortak zihin koşulları Kant’ı, hakları koruyan sınırlı yönetim Locke’un siyasetini, işlevlerin bağımsız denetimi Montesquieu’yü, ortak yarar ve genel irade Rousseau’yu öne çıkarabilir. Her eşleştirme kendi açık koşuluna bağlıdır.",
          "Aynı paragrafta bu görüşler birlikte bulunabilir; bir düşünür adı görünmediğinde metnin alanını ve gerekçesini belirlemek yine mümkündür. Modelde yetki oklarını değiştirirken isimler aynı kalabilir. Bu, adların değil ilişkilerin kavramı taşıdığını öğretir. Son açıklamanda hangi koşul değişti ve hangi sonuç artık kurulamaz sorularına cevap ver."
        ]
      }
    ],
    "examples": [
      {
        "title": "Locke’ta iç deney",
        "prompt": "Ece önce yeni bir ses duyuyor, sonra o sesten kuşku duyduğunu fark ediyor. Locke’un edinim ayrımında iki aşama nasıl düşünülür?",
        "strategy": "Dış nesneden gelen içerikle zihnin kendi faaliyetine yönelişi ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ses duyusal karşılaşmanın malzemesidir; dış deney yönü öne çıkar."
          },
          {
            "label": "2. adım",
            "explanation": "Kuşku duyduğunu fark etmesi zihnin kendi işlemini yaşamasıyla ilişkilidir; refleksiyon yönü vardır."
          },
          {
            "label": "3. adım",
            "explanation": "Bu ayrım zihnin bütün işlemlerini pasif saymayı önler; iki aşama aynı sözcükle eritilmez."
          }
        ],
        "answer": "Dış deney, ardından iç deney.",
        "check": "Kuşku işleminin kendisiyle ona ilişkin farkındalığı ayrı ifade et.",
        "pitfall": "Boş levhayı hiçbir zihinsel yeti veya işlem yokluğu sanma."
      },
      {
        "title": "A priori zaman sırası değildir",
        "prompt": "Bir öğrenci ideal geometrik bağıntının ispatını 17 yaşında öğreniyor; başka bir öğrenci sabah havanın serinliğini gözlemliyor. Gerekçelerin farkı yaş sırasıyla mı belirlenir?",
        "strategy": "Öğrenme tarihiyle yargının dayandığı yöntemi ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Geometrik ilişki verilen ideal modelde bir ispatla gerekçelendiriliyor; öğrenme yaşı bunu değiştirmez."
          },
          {
            "label": "2. adım",
            "explanation": "Havanın belirli andaki serinliği ise o ana ilişkin deneysel veriye dayanır."
          },
          {
            "label": "3. adım",
            "explanation": "A priori-a posteriori ayrımı gerekçeyle ilgilidir; kişinin hangisini önce duyduğuna indirgenmez."
          }
        ],
        "answer": "Hayır; gerekçenin deneyime bağımlılığı belirleyicidir.",
        "check": "İdeal geometri koşulunu gerçek arazi ölçümünden ayırdığını kontrol et.",
        "pitfall": "Deneyden önce ifadesini yalnız takvimde erken öğrenmek diye yorumlama."
      },
      {
        "title": "Üç tabela ve tek karar",
        "prompt": "Kurgu kurumda yasa birimi, uygulama birimi ve yargı birimi var; üçünün bütün kararlarını aynı başkan sınırsız belirliyor. Kuvvetler ayrılığı kesin sağlanmış mıdır?",
        "strategy": "Kurum adlarıyla gerçek yetki yollarını karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Üç işlevin adı ayrı verilmiş; bu işlevsel kavramları tanımayı sağlar."
          },
          {
            "label": "2. adım",
            "explanation": "Ancak bütün karar gücü aynı kişiye bağlanmış; bağımsız sınırlama veya itiraz yetkisi verilmemiş."
          },
          {
            "label": "3. adım",
            "explanation": "Bu nedenle isim ayrımı Montesquieu’nün karşılıklı denetim koşulunun gerçekleştiğini tek başına göstermez."
          }
        ],
        "answer": "Hayır; fiilî bağımsız denetim koşulu desteklenmemiştir.",
        "check": "Okları görev adlarına değil gerçek karar verene çiz.",
        "pitfall": "Üç ayrı kurum adı görmeyi bütün özgürlüklerin güvenceye alınması sayma."
      },
      {
        "title": "Genel irade ve dar çıkar",
        "prompt": "Çoğunluk bir mahalleye yarar sağlarken başka yurttaşların haklarını gerekçesiz dışlayan karar istiyor. Yalnız oy sayısı genel iradeyi kesin gösterir mi?",
        "strategy": "Sayı çoğunluğuyla ortak yarar koşulunu ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Verilen kararda dar grubun çıkarı ve dışlama açıkça belirtilmiş; bütün ortak yarar henüz gerekçelenmemiş."
          },
          {
            "label": "2. adım",
            "explanation": "Rousseau’da genel irade özel çıkarların basit toplamı olarak tanımlanmaz."
          },
          {
            "label": "3. adım",
            "explanation": "Çoğunluk bilgisi tek başına genel iradeyi kurmaya yetmez; ortak yarara ilişkin ek değerlendirme gerekir."
          }
        ],
        "answer": "Hayır; oy sayısı tek yeterli kanıt değildir.",
        "check": "Sonucu bütün çoğunluk kararları yanlıştır diye ters genellemeye dönüştürme.",
        "pitfall": "Genel iradeyi her anketin değişmez eş anlamı yapma."
      },
      {
        "title": "Aynı eylem, farklı niyet",
        "prompt": "A kişi ödül almak için, B kişi ahlak yasasına saygı duyduğu için borcunu geri ödüyor. Verilen niyetler açıkça belirtilmişse Kant hangi ayrımı yapar?",
        "strategy": "Dış eylemle onu yapanın gerekçesini iki ayrı satıra yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İki kişi de borç öder; dışarıdan eylem kuralla uyumlu olabilir."
          },
          {
            "label": "2. adım",
            "explanation": "A’nın gerekçesi ödüle, B’nin gerekçesi ödevin kendisine bağlanmıştır."
          },
          {
            "label": "3. adım",
            "explanation": "B ödevden dolayı eylem vurgusunu taşır; A’nın uygun davranışı niyetini aynı yapmaz."
          }
        ],
        "answer": "Ödeve uygunluk ile ödevden dolayı yapma ayrımı.",
        "check": "Soruda niyetin açık verilmiş olmasına dayan; gerçek kişinin içini tahmin etme.",
        "pitfall": "İyi bir sonuç görüldüğünde bütün niyetleri aynı ahlaki değerde sayma."
      },
      {
        "title": "Başlangıç ve gerçekleşmiş bütün",
        "prompt": "Hegel’den hareketle bir metin yeni düzenin ilk belirmesinin onun bütün imkânlarının tamamlandığı anlamına gelmediğini söylüyor. Tohum-ağaç benzetmesi neyi açıklar?",
        "strategy": "Benzetmenin aydınlattığı ilişkiyi takvim özdeşliğinden ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Tohum gelişmiş ağacın bütün görünen özelliklerini henüz taşımayan başlangıcı örnekler."
          },
          {
            "label": "2. adım",
            "explanation": "Metin süreç ve gerçekleşme arasındaki farkı düşünmeye çağırmaktadır."
          },
          {
            "label": "3. adım",
            "explanation": "Bu, bütün tarihsel düzenlerin aynı biyolojik sürede geliştiğinin ispatı değildir; benzetmenin kapsamı sınırlıdır."
          }
        ],
        "answer": "Başlangıç ile süreç içinde gerçekleşen bütün ayrımını.",
        "check": "Ağacın büyüme gününü toplumsal değişimin kesin tarihi yerine koymadığını denetle.",
        "pitfall": "Diyalektiği her olaya mekanik üç kutu ve sabit süre uygulayan algoritma sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Locke’ta iç deney neyi fark eder?",
        "answer": "Zihnin düşünme, isteme veya kuşku duyma gibi kendi işlemlerini."
      },
      {
        "prompt": "A priori erken öğrenilmiş demek midir?",
        "answer": "Hayır; belirli deneyimden bağımsız gerekçelendirmeyle ilgilidir."
      },
      {
        "prompt": "Kant’ta etkin zihin keyfî dünya üretimi midir?",
        "answer": "Hayır; ortak bilme koşulları ile duyusal malzeme birlikte ele alınır."
      },
      {
        "prompt": "Üç tabela kuvvetler ayrılığı için yeterli midir?",
        "answer": "Hayır; gerçek yetki ve bağımsız karşılıklı denetim gerekir."
      },
      {
        "prompt": "Genel irade her çıplak çoğunluk kararı mıdır?",
        "answer": "Hayır; ortak yarar ve özgür yurttaş iradesiyle ilgili normatif koşullar önemlidir."
      },
      {
        "prompt": "Ödeve uygun ve ödevden dolayı nasıl ayrılır?",
        "answer": "İlki dış eylemin kuralla uyumunu, ikincisi ahlak yasasına saygıyı eylem gerekçesi yapmayı belirtir."
      }
    ],
    "source": "Aurelia YKS ilgili kopya kâğıtları, OGM ders notları ve MEBİ konu özetleriyle karşılaştırılarak hazırlanmış özgün öğretim. Tarihsel görüşlerin dayanakları ve sınırları birlikte açıklanır. Uygulama soruları özgündür; resmî sınav sorusu değildir. Mill’in haz niteliği ayrımı, Faydacılık adlı eserinin ikinci bölümündeki açıklamayla ayrıca karşılaştırılmıştır."
  },
  {
    "id": "cagdas-felsefe",
    "subjectId": "tyt-felsefe",
    "title": "Çağdaş felsefe: yöntem, insan, bilim ve değer",
    "minutes": 160,
    "objectives": [
      "Fenomenoloji, hermeneutik ve varoluşçu soruları yöntem ve kapsamlarıyla ayır.",
      "İdealist ve maddi açıklamaları, doğrulama-yanlışlama ve paradigma sorunlarını karşılaştır.",
      "Hartmann’ın varlık ayrımlarını ve Türkiye’deki düşünürlerin olumlu katkılarını açıkla.",
      "Tam metindeki sav, dayanak ve niceleyiciyi kullanarak görüşleri gerekçeyle tanı."
    ],
    "sections": [
      {
        "title": "Çağdaş felsefe tek bir görüş değildir",
        "paragraphs": [
          "Çağdaş felsefe, modern düşüncenin sorunlarını devralan ve yeni yöntemlerle yeniden kuran farklı akımları kapsar. Bilgi, dil, varlık, insan, değer ve bilim üzerine çalışmalar aynı cevapta birleşmez. Ortak bir dönemde bulunmak, düşünürlerin bütün problemleri aynı biçimde ele aldığını göstermez.",
          "Bu ders akımları yalnız adlarıyla değil, neyi açıkladıkları ve hangi yöntemi kullandıklarıyla öğretir. Bir metni okurken önce problemi belirle; sonra sav ve gerekçeyi göster. Özgürlük, yorum veya bilim gibi tek kelimeler birden çok görüşte bulunabilir. Ayırıcı olan onların metinde üstlendiği işlevdir."
        ]
      },
      {
        "title": "On dokuzuncu yüzyıldan gelen sorular",
        "paragraphs": [
          "Hegel’in idealizmi, Comte’un pozitivizmi, Marx’ın tarihsel materyalizmi ve Kierkegaard’ın bireysel varoluş vurgusu sonraki tartışmalar için farklı başlangıçlar oluşturur. Bir görüşü çağdaş ders başlığında incelemek, onu savunan kişinin mutlaka yirminci yüzyılda doğduğu anlamına gelmez. Etki tarihi ile yaşam tarihi ayrı tutulur.",
          "Bir düşünür önceki görüşü eleştirerek de ondan etkilenebilir. Hegel’in bütünlük ve süreç düşüncesi başka bir açıklama temeline taşınabilir; bireysel varoluş da sistemin her şeyi kapsama iddiasına karşı vurgulanabilir. Eleştiri ile etkileşim birbirini dışlamaz. Hangi unsurun korunduğunu ve hangisinin değiştiğini belirt."
        ]
      },
      {
        "title": "Toplumsal ve bilimsel ortam",
        "paragraphs": [
          "Sanayi, sınıf ilişkileri, bilimsel değişimler ve dünya savaşları insanın güven, özgürlük ve değer sorularını farklı koşullarda yaşamasına yol açar. Bu olaylar düşünürlerin problemlerini etkileyebilir. Ancak hiçbir tek olay bütün çağdaş akımların zorunlu ve yeterli nedeni olarak verilmemelidir.",
          "İnsanların yıkım ve belirsizlik karşısında neyi sorumluluk saydığı, bilimin nasıl geliştiği veya dilin düşünceyi nasıl taşıdığı farklı sorulardır. Aynı toplumsal koşula verilen cevaplar da çeşitlenebilir. Dönemi anlamak için koşulları ve argümanları birlikte öğren; tarihsel etkiyi mantıksal ispat yerine kullanma."
        ]
      },
      {
        "title": "Dil ve mantıksal çözümleme",
        "paragraphs": [
          "Sembolik mantık ve dil çözümlemeleri, bir önermenin yapısını ve çıkarımın nerede kurulduğunu daha açık göstermeyi amaçlayabilir. Frege, Russell, Moore ve Wittgenstein gibi isimler farklı katkılarıyla bu geniş tartışmada anılır. Bir cümlenin dil bilgisel görünüşü onun mantıksal yapısını her durumda doğrudan vermeyebilir.",
          "Bir sorunda belirsiz sözcüğü veya örtük kapsamı açıklaştırmak, gerçek anlaşmazlığı bulmaya yardım eder. Fakat bütün felsefeyi yalnız sözlük karşılığı değiştirmeye indirgemek de doğru değildir. Aynı adı taşıyan analitik yaklaşımlar kendi içlerinde farklıdır. Verilen pasajın dilde tam olarak hangi sorunu çözmeye çalıştığına bak."
        ]
      },
      {
        "title": "Husserl ve yönelimsellik",
        "paragraphs": [
          "Husserl’in fenomenolojisinde bilincin bir şeyin bilinci oluşu, yani yönelimsellik önemlidir. Algılamak, anımsamak veya istemek belirli bir nesneye ya da içeriğe yönelir. İnceleme yalnız nesnenin dışarıdaki maddi özelliklerini saymak değil, onun deneyimde nasıl belirdiğini araştırmaktır.",
          "Bir ağacı görmekle onu anımsamak aynı yönelme biçimi değildir; her ikisinde de bir şeyin deneyimi vardır. Bu fark nesnenin hiç var olmadığını göstermez. Fenomenolojiye başlarken deneyimin biçimini ve yöneldiği içeriği ayır. Bilinç ile nesne arasındaki ilişkiyi tek bir fiziksel ölçüye indirme."
        ]
      },
      {
        "title": "Epoché: varlık hükmünü askıya al",
        "paragraphs": [
          "Paranteze alma veya epoché, doğal tutumda kabul edilen varlık hükümlerini incelemenin belirli aşamasında askıya almaktır. Nesnenin nasıl deneyimlendiğini araştırmak için onun dış dünyadaki varlığını hemen onaylama veya reddetme işini geçici olarak ayırır. Bu, dünyanın yokluğunun kanıtlanması değildir.",
          "Bir resme ilişkin kişisel beğeniyi geçici bırakmak öğretici bir başlangıç benzetmesi olabilir ama fenomenolojik yöntemin bütününü tüketmez. Temel soru deneyimin kuruluşunu incelemektir. Hüküm vermemekle yoktur demeyi aynı işlem sayma. Bir seçeneğin bu ikisini karıştırdığını fark edersen gerekçesini açıkla."
        ]
      },
      {
        "title": "Öz incelemesi ve değişen özellikler",
        "paragraphs": [
          "Fenomenolojide öz araştırmasını nesnenin rengini, kokusunu veya biçimini fiziksel olarak silince geriye görünmez bir parça kalır diye anlamamak gerekir. Öze yönelen inceleme hangi belirlenimler değiştiğinde şeyin o tür deneyim olarak düşünülebildiğini sorgulayabilir. Bu düşünsel iş, duyusal özellikleri kazımak değildir.",
          "Örneğin algı ile anımsama arasındaki farkı düşünürken aynı nesneyi farklı yönelme biçimlerinde ele alabilirsin. Amaç deneyimi belirleyen ilişkileri kavramaktır. Kaynak çizimlerindeki sadeleştirmeleri genel bir fizik deneyi sanma. Bir yöntemin kavramsal hedefi ile şeklin görsel kolaylığı farklıdır."
        ]
      },
      {
        "title": "Dilthey: anlam ve tarih",
        "paragraphs": [
          "Dilthey insanın tarihsel yaşam ürünlerini anlamakla doğa olaylarını açıklamak arasında yöntem farkları üzerinde durur. Bir mektup veya eylemin anlamı, onu oluşturan yaşam ve dil bağlamıyla ilişkilidir. Sadece görünen harfleri saymak, o metnin tarihsel anlamını her zaman açıklamaz.",
          "Bir sözcük farklı dönemlerde başka siyasi veya kültürel bağlar taşıyabilir. Bu nedenle yazarın amacı, dönemin kullanımı ve metnin bütünü birlikte değerlendirilir. Bağlamın önemini kabul etmek her yorumun keyfî biçimde eşit olduğu anlamına gelmez. Yorumun metin ve tarihsel kanıtla nasıl desteklendiğini göster."
        ]
      },
      {
        "title": "Gadamer ve ufukların kaynaşması",
        "paragraphs": [
          "Gadamer anlamayı yalnız hazır bir yöntemin dışarıdan uygulanması değil, tarihsel olarak konumlanmış insanın bir karşılaşması olarak düşünür. Yorumcunun ufku ile anlamaya çalıştığı metnin ufku ilişki kurar. Anlama bu süreçte soruların ve önceki kabullerin de dönüşmesine imkân verebilir.",
          "Ufukların kaynaşması herkesin aynı fikre zorunlu varması veya metne istediği her anlamı eklemesi değildir. Yorumcunun kendi kabulünü fark etmesi ve metnin ona yönelttiği soruya açık olması önemlidir. Metin hangi iddiaya gerçekten dayanak oluyor, hangi anlamı okuyucu ekliyor sorularını ayrı tut."
        ]
      },
      {
        "title": "Parça ve bütün arasında okuma",
        "paragraphs": [
          "Bir cümlenin anlamı paragrafın bütünüyle, paragrafın anlamı da cümleleriyle ilişkili olabilir. Hermeneutik döngü bu karşılıklı hareketi görünür kılar. Önceki yorum bütüne bakıldığında değişebilir; yeni ayrıntı da bütünü yeniden düşünmeye yol açabilir.",
          "Bu döngü istenen cevabı baştan doğru kabul ederek kendisini tekrar etmek değildir. Okuma her dönüşte yeni bir gerekçe veya düzeltme üretmelidir. Bir kelimenin sözlük anlamı ilk ipucu olabilir; fakat metnin tarihsel işlevini ve bağını tek başına kapatmaz. Parça ve bütünü birbirinin kanıtı olarak gerçekten denetle."
        ]
      },
      {
        "title": "Kierkegaard: tekil varoluş",
        "paragraphs": [
          "Kierkegaard genel sistemin içinde kaybolan tekil kişinin seçimi, kaygısı ve yaşamını neye adayacağı sorusunu öne çıkarır. Varoluş tartışmasının erken kaynaklarından biri olarak anılır. Kişinin yaşadığı bağlılık ve kararın ağırlığı, bütün insanları aynı soyut formüle yerleştirmekten farklı bir problem açar.",
          "Kierkegaard’ın dinî yönelimi ile Sartre’ın yaklaşımı aynı değildir. Varoluş sorusuyla ilgilenen herkesin Tanrı, özgürlük veya insanın anlamı hakkında tek görüşte birleştiğini varsayma. Önce verilen düşünürün hangi savı ve gerekçeyi kullandığını öğren. Ortak problem alanı görüşlerin özdeşliği değildir."
        ]
      },
      {
        "title": "Sartre: varoluş ve öz",
        "paragraphs": [
          "Sartre’ın insan için varoluşun özden önce geldiği savı, kişinin önceden tamamlanmış bir yaşam planının edilgin uygulayıcısı olmadığı fikrini taşır. İnsan eylem ve seçimleriyle nasıl biri olacağını kurar. Üretilen bir aracın tasarımının önceden yapılmasıyla insanın yaşamı aynı türden örnek değildir.",
          "Bu savı bütün nesnelerin hiçbir belirlenimi yoktur veya insan fiziksel koşulları istediği gibi yok eder diye genişletme. Dersin sorusu insanın kendisini kurması ve bunun sorumluluğudur. Bir pasajda masa planı ile insanın seçimleri karşılaştırılıyorsa sonucun özellikle insan hakkında hangi kapsamda kurulduğunu göster."
        ]
      },
      {
        "title": "Özgürlük, durum ve sorumluluk",
        "paragraphs": [
          "Varoluşçu özgürlük tartışması insanı yalnız seyirci değil eylemde bulunan özne olarak düşünür. Seçimin sonuçlarını üstlenmek ve kendi bahanesini sorgulamak önemlidir. Bununla birlikte kişinin içinde bulunduğu tarihsel, bedensel ve toplumsal durumlar gözden çıkarılamaz; her dış sonucu sınırsızca kontrol etmek özgürlükle aynı değildir.",
          "Beauvoir gibi düşünürlerde özgürlük, somut durumlar ve başkalarının özgürlüğüyle ilişkisi içinde ele alınır. Gerçek kişileri her savaşın otomatik hukuki suçlusu sayan bir puanlama buradan çıkmaz. Ders, düşünürün sorumluluk iddiasını anlamayı öğretir; her kişinin bütün yaşamına bağlamsız hüküm vermez."
        ]
      },
      {
        "title": "Jaspers ve Camus: aynı başlıkta farklı sorular",
        "paragraphs": [
          "Jaspers insanın varoluşunu yalnız nesneleştirici bilimsel tanımlarla tüketmenin güçlüğünü tartışır; felsefi açıklamanın farklı işlevini öne çıkarır. Camus ise insanın anlam arayışıyla dünyanın buna hazır cevap vermemesi arasındaki uyumsuzluk ve başkaldırı gibi sorunlarla anılır. İkisi aynı cümleyi tekrar etmez.",
          "Camus varoluşçuluk etiketiyle arasına mesafe koymuştur; yakın sorunları tartışması onu bütün varoluşçu savların savunucusu yapmaz. Sınıflandırmayı soruları tanımaya yardımcı araç olarak kullan. Özgürlük sözcüğünü görünce bütün düşünürlerin görüşünü aynı saymak yerine metinde hangi değer ve amaç ilişkisi kurulduğuna bak."
        ]
      },
      {
        "title": "Nietzsche: değerleri sorgulamak",
        "paragraphs": [
          "Nietzsche yerleşik iyi-kötü ölçütlerinin kökenini ve insanın kendini aşma imkânını sorgular. Güç istenci ve üstinsan kavramları bu değer eleştirisiyle ilişkilidir. Yeni değer yaratımı yalnız başkasına kaba kuvvet uygulamak veya hazır başarı sıralamasında öne geçmek anlamına indirgenmez.",
          "Bu kavramları biyolojik ırk üstünlüğü veya şiddet buyruğu diye öğretme. Düşünürün değerleri yeniden değerlendirme ve kendini aşma sorusunu önce kendi gerekçeleriyle kur. Tarihsel görüşü anlamak onu kullanıcıya kesin yaşam talimatı yapmak değildir. Bir kelimenin gündelik güç anlamı felsefi kavramın bütününü vermez."
        ]
      },
      {
        "title": "Bergson: süre ve sezgi",
        "paragraphs": [
          "Bergson yaşantının kesintisiz akışını süre kavramıyla tartışır. Saatin eş parçalara ayırdığı ölçülen zaman ile iç içe geçen yaşantının niteliksel akışı farklı açıdan ele alınır. Sezgi bu akışı aracısız kavrama iddiasıyla, zekâ ise pratik düzenleme ve maddeyi çözümleme işlevleriyle karşılaştırılır.",
          "Bu ayrımı her içime doğdu cümlesinin kesin doğru olduğu şeklinde yorumlama. Kaynak şemalarında sezgiyi zekâ ve içgüdüyle ilişkilendiren anlatım sayısal toplama eşitliği değildir. Bergson’un görüşünü tanımak bilimsel ölçümlerin hiçbir işe yaramadığını söylemek de değildir. Hangi bilme amacının karşılaştırıldığını açık tut."
        ]
      },
      {
        "title": "Materyalizm ve değişim",
        "paragraphs": [
          "Materyalizm varlığın temelini maddi gerçeklikle açıklayan yaklaşımlar için kullanılır. Diyalektik materyalizmde değişim, hareket ve ilişkiler önemlidir; madde yalnız değişmez küçük parçalar toplamı gibi düşünülmez. Marx ve Engels bu geniş tartışmanın farklı yönleriyle ilişkilendirilir.",
          "Diyalektik sözcüğü geçmesi Hegel ile aynı açıklama temelinin korunduğunu göstermez. Hegel’de idealist, Marx ve Engels’te maddi temele yönelen açıklama vurgusu ayrılır. Önce hangi varlık veya toplumsal sürecin hangi temelle açıklandığını göster. Aynı yöntem adı bütün düşünceyi özdeş yapmaz."
        ]
      },
      {
        "title": "Marx: üretim ve toplumsal ilişki",
        "paragraphs": [
          "Marx’ın tarihsel materyalizminde insanın üretimi, iş bölümü, mülkiyet ve sınıf ilişkileri toplumsal dönüşümü açıklamada önem taşır. Altyapı ekonomik ilişkiler, üstyapı hukuk, siyaset ve kültür gibi alanlarla ilişkilendirilir. Bir üretim biçiminin değişimi bu kurumların nasıl şekillendiği sorusunu açabilir.",
          "Bu ilişkiyi tek bir ekonomik sayının her insanın bütün düşüncelerini mekanik ve anında belirlemesi sanma. Tarihsel koşullar, çelişkiler ve karşılıklı etkiler araştırılır. Dersin amacı belirli açıklama yönelimini tanımaktır; kullanıcının hangi siyasal görüşü benimsemesi gerektiğini söylemek değildir. Metnin kurduğu bağı somut öncüllerle oku."
        ]
      },
      {
        "title": "Engels ve doğa-düşünce ilişkisi",
        "paragraphs": [
          "Engels diyalektik yaklaşımı doğa ve düşüncenin hareket ve değişimini ele alırken kullanır. Düşünmenin doğadan tümüyle kopuk bağımsız bir alan değil, maddi varlık düzeniyle ilişkili olması vurgulanır. Bu, felsefi açıklamanın temel yönünü gösterir.",
          "Bir doğa olayı anlatımında diyalektik adı kullanılması, o olayın bütün sayısal sonuçlarının deney yapmadan elde edildiği anlamına gelmez. Felsefi çerçeve ile belirli bilimsel modelin kanıtını ayır. Aynı değişim kelimesini gördüğünde ekonomik tarih, mantıksal tartışma ve fiziksel hareket sorularını birbirine otomatik çevirmemelisin."
        ]
      },
      {
        "title": "Mantıkçı pozitivizm",
        "paragraphs": [
          "Mantıkçı pozitivistler bilimsel önermelerin mantıksal yapısını ve deneysel doğrulama ile ilişkisini inceler. Schlick ve Carnap gibi isimler bu bağlamda anılır. Metafizik önermelerin deneysel anlam ölçütünü karşılayıp karşılamadığı önemli bir tartışmadır; bu görüşün ölçütünü tanımak bütün felsefede son söz olduğunu kabul etmek değildir.",
          "Whitehead mantık ve matematik çalışmalarına katkı sunmuş olsa da Viyana Çevresi mantıkçı pozitivisti diye sınıflandırılmamalıdır. Birlikte anılan her düşünürün aynı okula ait olduğunu düşünme. İsim eşleştirmesini kişinin temel yaklaşımıyla kur; benzer alanlarda çalışma yapmak bütün görüşlerin ortaklığı değildir."
        ]
      },
      {
        "title": "Analitik önerme ve deneysel önerme",
        "paragraphs": [
          "Mantıksal ve matematiksel ilişkiler ile deneysel olgulara ilişkin önermeler aynı denetim biçimine dayanmaz. Mantıkçı pozitivist tartışmada analitik önermeleri görmezden gelip anlamlı her cümle laboratuvarda tek tek ölçülür demek yanıltıcıdır. Deneysel bir iddianın hangi gözlem koşuluyla ilişkilendirildiği ayrıca sorulur.",
          "Bir metafizik iddianın belirli anlam ölçütüne göre eleştirilmesi, onun gündelik dilde hiçbir işlev taşıyamadığına dair bütün yaklaşımlar üstü kesin sonuç değildir. Önce düşünürün kullandığı ölçütü doğru kur. Ardından o ölçüte yönelik itirazın hangi noktaya yöneldiğini açıkla. Görüşü tanımlamak ile onu onaylamak farklıdır."
        ]
      },
      {
        "title": "Popper: yanlışlanabilirlik",
        "paragraphs": [
          "Yanlışlanabilirlik bir iddianın hangi olası gözlem karşısında başarısız sayılacağının belirlenebilmesidir. İddianın zaten yanlış olduğunu söylemez. Bilimsel sınama, açıklamayı eleştiriye ve olası karşı duruma açar. Bir sav bu koşulu taşıyıp henüz çürütülmemiş olabilir.",
          "Olumlu örnekler evrensel bir kuramı kesin doğrulamaz; henüz karşı örnek bulunmaması da kesin doğruluk kanıtı değildir. Popper’ın yanılabilirlik vurgusu tartışmaya ve yeni sınamaya açık kalmayı gerektirir. Kaynaklardaki geçerli sözcüğünü burada tartışmasız son doğruluk diye yorumlama. Desteklenme ve kesin ispat ayrı düzeylerdir."
        ]
      },
      {
        "title": "Bütün ve bazı önermeler",
        "paragraphs": [
          "“Bu türdeki bütün parçalar ısınınca uzar.” evrensel savı, aynı koşul ve kapsamdaki uzamayan tek gerçek parçayla çelişir. “Bu türde bazı parçalar uzar.” savı ise en az bir uzayan örnek gerektirir; tek uzamayan örnek onu otomatik çürütmez. Niceleyici veri rolünü değiştirir.",
          "Etkileşimli model bu mantığı kapalı bir örnek grubunda açıkça gösterecek. Önce iddianın kapsamını, sonra gözlemin gerçekten hangi parçaya ve koşula ait olduğunu belirle. Bir karşı örneğin aynı gruptan olmaması veya model koşulunun değişmesi farklı bir durumdur. İddiayı sınamadan önce ne söylediğini doğru yazmak gerekir."
        ]
      },
      {
        "title": "Kuhn: paradigma ve olağan bilim",
        "paragraphs": [
          "Paradigma bir bilim topluluğunun paylaştığı problem, yöntem, örnek çözüm ve temel kabullerin çerçevesiyle ilişkilidir. Olağan bilim bu çerçeve içinde sorun çözmeye yönelir. Bilim yalnız soyut önermeler listesi değil tarihsel bir topluluğun etkinliği olarak da incelenir.",
          "Paradigmayı yalnız kişinin beğendiği renk veya bireysel ruh hâli gibi düşünme. Paylaşılan araştırma standartları ve neyin açıklanacak sorun sayıldığı önem taşır. Yeni bir ölçüm aracı alınması aynı çerçevede daha iyi ölçüm yapılmasını sağlayabilir; tek başına bütün paradigmanın değiştiğini göstermez."
        ]
      },
      {
        "title": "Aykırılık, bunalım ve devrim",
        "paragraphs": [
          "Mevcut beklentilerle uyuşmayan bir bulgu aykırılık olarak araştırılabilir. Her aykırılık anında çerçevenin terk edilmesini gerektirmez; topluluk onu mevcut yöntemlerle çözmeye çalışabilir. Temel sorun ve açıklama standartlarının daha kapsamlı dönüşmesi paradigma değişimi ve bilimsel devrim bağlamında tartışılır.",
          "Bu süreci bütün bilim tarihinin her anına aynı takvimle uygulanan mekanik döngü sanma. Kuhn’un amacı bilimi tarihsel ve toplumsal bağlamında anlamaktır. Bir soruda yalnız tek beklenmedik ölçüm verilmişse devrim kesinleşti sonucunu ekleme. Hangi düzeyde değişim bulunduğunu ve hangi ek bilginin gerektiğini göster."
        ]
      },
      {
        "title": "Hartmann: ideal ve reel varlık",
        "paragraphs": [
          "Hartmann’ın yeni ontolojisi varlığı kendi yapıları ve ilişkileriyle incelemeyi öne çıkarır. İdeal ve reel varlık ayrımıyla, bilginin temas ettiği varlığın türünü açıklaştırmak ister. İdeal varlık örneği ile tarihsel olarak gerçekleşen kültürel yaşam aynı kategoriye aceleyle yerleştirilmez.",
          "Reel varlığın katmanlarını sıralarken tinsel alanı ideal varlığın basit eş anlamı sayma. Dil, kültür ve tarihsel toplumsal yaşamın tinsel yönü reel katmanlar içinde ele alınır. Kaynak tablolarındaki bu ayrımı bozan kısa etiket yerine, varlığın hangi statüde ve hangi ilişkilerle anlatıldığını öğren."
        ]
      },
      {
        "title": "Reelin dört katmanı",
        "paragraphs": [
          "İnorganik katman fiziksel-cansız varlıkla, organik katman canlılıkla, ruhsal katman bilinçli yaşantıyla, tinsel katman ise dil, kültür ve anlam dünyasıyla ilişkilidir. Katmanlar birbirinden kopuk dört evren değildir; alt koşullara dayanma ve üst düzeyin yeni özellikleri birlikte tartışılır.",
          "Bu sınıflamayı her bilimin yalnız tek katmana bakabildiği değişmez sınır gibi görme. Bir insan bedeni, yaşantısı ve kültürel eylemleriyle birden çok açıdan araştırılabilir. Şemadaki yükseklik değer veya insan üstünlüğü puanı değildir. Bir alanın başka alana indirgenemeyen özellikleri hangi gerekçeyle savunuluyor, bunu sor."
        ]
      },
      {
        "title": "Türkiye’de kurumsal ve düşünsel çalışmalar",
        "paragraphs": [
          "Türkiye’de felsefe çeviri, öğretim, üniversite çalışmaları ve özgün problem araştırmalarıyla gelişmiştir.1933 üniversite reformu önemli bir kurumsal dönüm noktasıdır; daha önce hiçbir felsefe öğretimi bulunmadığı anlamına gelmez. Tarihsel gelişimi tek bir başlangıç tarihine indirgememek gerekir.",
          "Düşünürlerin katkıları farklı alanlarda görülür: bilgi ve mantık, varlık ve insan, değer ve etik, dil ve felsefe tarihi. Bir listeyi ezberlemek yerine her ismin hangi problemle ve çalışmayla ilişkilendirildiğini öğren. Yerel katkı yalnız dışarıdaki görüşlerin kopyası değildir; eleştiri, çeviri ve yeni düşünce birlikte gelişebilir."
        ]
      },
      {
        "title": "Hasan Âli Yücel ve Macit Gökberk",
        "paragraphs": [
          "Hasan Âli Yücel’in eğitim, insan değeri ve çeviri çalışmaları kültürel erişimin genişlemesiyle ilişkilidir. Çeviri bürosu aracılığıyla farklı birikimlerin Türkçeye kazandırılması yeni okuma imkânları oluşturur. Bu katkı yalnız bir yabancı sözcüğü değiştirmekten daha geniş bir eğitim ve kültür projesidir.",
          "Macit Gökberk felsefe tarihi, dil ve düşünce ilişkisiyle öne çıkar; felsefenin anlaşılır Türkçeyle ifade edilmesine önem verir. Felsefenin yaşam ve aydınlanmayla ilişkisini düşünür. İki ismi yalnız aynı ülkede çalıştıkları için özdeşleştirme; ortak erişim ilgisi içinde farklı çalışma odaklarını da göster."
        ]
      },
      {
        "title": "Nusret Hızır ve Hilmi Ziya Ülken",
        "paragraphs": [
          "Nusret Hızır mantık ve bilim felsefesi çalışmalarıyla, analitik yaklaşımın öğretim ve tartışmalarıyla anılır. Bir savın yapısını incelemek ve bilimin yöntemini açıklaştırmak onunla ilişkilendirilen katkılar arasındadır. Hangi alanın sorulduğunu bilmek ad eşleştirmesini anlamlı kılar.",
          "Hilmi Ziya Ülken Türk ve İslam düşüncesi, varlık, toplum ve kültür üzerine geniş çalışmalar yapmıştır. Sonlu insanın sonsuz olanı düşünmesi gibi sorular da görüşlerinde yer bulur. İki düşünürün geniş birikimini tek bir etiketle bitirmek yerine metinde verilen problem ve yönteme göre karşılaştır."
        ]
      },
      {
        "title": "Mengüşoğlu ve Topçu",
        "paragraphs": [
          "Takiyettin Mengüşoğlu insanı yalnız tek bir özelliğe indirgemeden, bütün yapıp etmeleri ve varlık yapısıyla ele alır. Bilme, değer duyma, çalışma ve inanma gibi eylemler somut insanın bütünlüğü içinde düşünülür. Ontolojik temelli insan felsefesi bu yaklaşımın önemli yönüdür.",
          "Nurettin Topçu’nun hareket ve isyan ahlakında insanın irade ve sorumluluğu, sonsuz olan Allah’a ulaşma amacıyla ilişkilidir. İsyan, bu ahlaki yönelişi engelleyen bencillik, çıkar ve miskinliğe karşı direnme anlamı taşır; her kurala nedensiz karşı çıkmak değildir. Bu, düşünürün dinî-ahlaki savı olarak aktarılır. Görüşü doğru açıklamak öğrencinin aynı inancı veya yaşam tercihini benimsemesini gerektirmez."
        ]
      },
      {
        "title": "Sayılı ve Türker Küyel",
        "paragraphs": [
          "Aydın Sayılı bilim tarihi çalışmalarıyla bilimsel düşüncenin farklı dönem ve kültürlerde gelişimini araştırmıştır. Bu tarihsel çalışma bilimsel bilgiyi yalnız bugünkü sonuç listesi olarak görmemeyi sağlar. Katkısını anlatmak için doğrulanmamış mutlak ilk kişi sıralamalarını soru anahtarı yapmaya gerek yoktur.",
          "Mübahat Türker Küyel kültürler arası etkileşim ve Türk düşüncesinin dünya birikimine katkısı üzerinde durur. Felsefe tarihini yalnız tek uygarlığın yalıtılmış ürünü olarak anlatan anlayışları sorgulamaya katkı sunar. İki ismin ortak tarihi ilgisi içinde bilim ve düşünce-kültür odağını ayırmak gerekir."
        ]
      },
      {
        "title": "Kuçuradi ve Nutku",
        "paragraphs": [
          "İoanna Kuçuradi değer, etik, insan hakları ve özgürlük sorunlarına yönelik çalışmalarıyla öne çıkar. Bir eylemi hazır değer yargısıyla etiketlemek ile somut durumun değerini doğru değerlendirmek farklı işler olabilir. Özgürlüğün gerçekleşmesi sorusu, insanın temel değerini bazı kişilerden esirgemek demek değildir.",
          "Uluğ Nutku insan felsefesi ve felsefenin toplumsal işlevi üzerine çalışmalarıyla anılır. Gelenekleri geliştirici ve engelleyici yönleriyle ayırma ihtiyacı eleştirel düşünceyle ilişkilidir. Her iki katkıyı yalnız isim listesinde bırakmadan hangi gerçek değerlendirme sorusunu açtıklarını göster. Farklı görüşleri öğrenmek, gerçek kişilere değer notu vermek değildir."
        ]
      },
      {
        "title": "Aynı sözcük farklı yöntem",
        "paragraphs": [
          "Yorum bir metnin tarihsel anlamını, paranteze alma deneyimin kuruluşunu, yanlışlama bilimsel savın sınanabilirliğini, seçim insanın kendini kurmasını tartışıyor olabilir. Aynı çağdaş başlık altında bulunmaları bu yöntemleri birbirinin yerine kullanmayı gerektirmez. Metnin sorusu ve dayanağı önce gelir.",
          "Bir sentez sorusunda her cümleyi ayrı problem olarak yazıp hangi kanıtla eşleştiğini göster. Bilinmeyen yazar veya tarih bilgisi varsa onu uydurma. Görüşü tanımakla görüşün doğru olduğunu kanıtlamak arasındaki farkı koru. Açık öncüller ve kapsam sınırı bütün bu okumalarda kullanılabilecek temel araçlardır."
        ]
      },
      {
        "title": "Karşı örneğin rolünü uygula",
        "paragraphs": [
          "Etkileşimli model aynı hazırlanmış grupta bütün ve bazı savlarının hangi gözlemle desteklenip hangisiyle çeliştiğini gösterecek. Önce olası test koşulunu, sonra gerçekten açılan veriyi ayrı göreceksin. Böylece yanlışlanabilir olmakla fiilen yanlışlanmış olmak aynı kutuya konmayacak.",
          "Bu küçük mantıksal örnek bütün bilimsel kuramların tek gözlemle kolayca yıkıldığı iddiası değildir; gerçek sınamalarda ölçüm ve yardımcı varsayımlar da araştırılır. Modelin açık koşulları içinde hangi sonucun çıktığını kendi gerekçenle yaz. Sonra başka kapsamlı bir cümlede aynı ayrımı yardım almadan kurmayı dene."
        ]
      }
    ],
    "examples": [
      {
        "title": "Hükmü askıya almak",
        "prompt": "Bir araştırmacı nesnenin dış dünyada var olup olmadığına karar vermeyi geçici ayırıp onun deneyimde nasıl belirdiğini inceliyor. Bu, nesnenin yokluğunu kanıtlar mı?",
        "strategy": "Yöntemsel askıya almayla ontolojik ret arasındaki farkı kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Verilen işlem varlık hükmünü inceleme sırasında askıya almaktır."
          },
          {
            "label": "2. adım",
            "explanation": "Araştırmacı yoktur sonucunu kanıtlamış veya kabul etmiş olarak tanıtılmıyor."
          },
          {
            "label": "3. adım",
            "explanation": "Bu nedenle epoché ile dünyanın inkârı aynı şey değildir; odak deneyimin nasıl kurulduğudur."
          }
        ],
        "answer": "Hayır; hüküm askıda, ret sonucu kurulmamış.",
        "check": "Nesneyi fiziksel özelliklerinden kazıma işlemi verilmediğini kontrol et.",
        "pitfall": "Paranteze almayı nesneyi silmek veya yok saymakla eşitleme."
      },
      {
        "title": "Parça ve tarihsel bütün",
        "prompt": "Aynı sözcük iki farklı yüzyılın mektubunda geçiyor; kelimenin politik bağlamları farklı. Yalnız sözlük karşılığı aynı savı kanıtlar mı?",
        "strategy": "Sözcük anlamını metnin bütünü ve çağındaki işlevle birlikte oku.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Bir kelimenin aynı yazılması iki yazarın aynı iddiayı savunduğunu tek başına göstermez."
          },
          {
            "label": "2. adım",
            "explanation": "Mektupların amacı, cümle bağları ve tarihsel kullanımı anlamı etkileyebilir."
          },
          {
            "label": "3. adım",
            "explanation": "Hermeneutik okuma bu bağları araştırır; bilinmeyen tarihsel ayrıntıyı uydurmaz."
          }
        ],
        "answer": "Hayır; bağlam ve metin kanıtı gerekir.",
        "check": "Her yorumun hangi kelime ve ilişkiye dayandığını açıkça göster.",
        "pitfall": "Bağlamın önemli oluşunu bütün yorumların eşit doğruluğu diye genişletme."
      },
      {
        "title": "Ürün ve insan",
        "prompt": "Bir araç üretimden önce planlanıyor; bir kişi ise yaşamındaki seçimlerle nasıl biri olacağını kuruyor. Sartre bakımından hangi fark önemlidir?",
        "strategy": "Üretilmiş nesnenin tasarımıyla insanın varoluş alanını ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Araçta amaç ve biçim üretimden önce tasarlanmış olarak verilmiştir."
          },
          {
            "label": "2. adım",
            "explanation": "İnsan için pasaj seçim ve sorumlulukla kendini kurmayı vurgulamaktadır."
          },
          {
            "label": "3. adım",
            "explanation": "Varoluşun özden önce gelişi özellikle insan için kurulan savdır; bütün nesnelere otomatik taşınmaz."
          }
        ],
        "answer": "İnsanın önceden tamamlanmış yaşam planına indirgenmemesi.",
        "check": "Özgürlüğün bütün dış koşulları sınırsızca kontrol etmek olmadığını belirt.",
        "pitfall": "Aracın planından insanın bütün yaşamının belirlenmiş olduğu sonucunu çıkarma."
      },
      {
        "title": "Karşı örneğin kapsamı",
        "prompt": "Kapalı gruptaki bütün parçaların aynı koşulda uzadığı ileri sürülüyor. Gruptaki bir parçanın aynı koşulda uzamadığı doğrulanıyor. Sav ne olur?",
        "strategy": "Evrensel niceliği, grup üyeliğini ve koşulu birlikte kontrol et.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk sav gruptaki her üyeyi kapsar; gözlenen parça gerçekten bu grubun üyesidir."
          },
          {
            "label": "2. adım",
            "explanation": "Koşul aynı ve sonuç savın istediğinin tersidir; bu yüzden gerçek karşı örnek oluşur."
          },
          {
            "label": "3. adım",
            "explanation": "Evrensel sav bu kapsamıyla çürür; her parçanın uzamadığı sonucu ise çıkmaz."
          }
        ],
        "answer": "Bütün savı verilen kapsamıyla yanlışlanır.",
        "check": "Aynı veri bazı parçalar uzar savını da otomatik çürütür mü, ayrıca dene.",
        "pitfall": "Bir karşı örnekten ters evrensel yargı üretme."
      },
      {
        "title": "Test imkânı ve gerçekleşen sonuç",
        "prompt": "Bir sav için hangi olası gözlemin onu çürüteceği belirtilmiş; o gözlem henüz gerçekleşmemiştir. Sav yanlışlanmış sayılır mı?",
        "strategy": "Olası test koşuluyla yapılmış gözlemi ayrı yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Savın başarısız sayılacağı olası durum açık olduğu için sınanabilirlik yönü vardır."
          },
          {
            "label": "2. adım",
            "explanation": "Bu durumun gerçekten gözlendiği henüz verilmemiştir; test sonucu uydurulamaz."
          },
          {
            "label": "3. adım",
            "explanation": "Yanlışlanabilir olmak fiilen yanlışlanmış olmak değildir; henüz çürümemek de kesin doğruluk olmaz."
          }
        ],
        "answer": "Hayır; yalnız yanlışlanabilirlik koşulu belirlenmiştir.",
        "check": "Savın doğru veya yanlış olduğuna ilişkin yeni veri eklemediğini kontrol et.",
        "pitfall": "Bilimsel sayılmayı zaten yanlış olduğu biliniyor diye yorumlama."
      },
      {
        "title": "Yeni araç ve paradigma",
        "prompt": "Bir ekip daha duyarlı bir ölçüm cihazı alıyor; temel açıklama ve sorun çözme standartlarının aynı kaldığı belirtiliyor. Kuhn’a göre bilimsel devrim kesin midir?",
        "strategy": "Teknoloji yeniliğiyle paylaşılan çerçevenin değişimini ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Yeni cihazın ölçüm kapasitesi değişmiştir; bunun kendisi bir teknik gelişmedir."
          },
          {
            "label": "2. adım",
            "explanation": "Metin temel kuram ve standartların korunduğunu açıkça söylüyor."
          },
          {
            "label": "3. adım",
            "explanation": "Paradigma değişimi verilmediği için yalnız bu bilgiyle bilimsel devrim sonucu kurulamaz."
          }
        ],
        "answer": "Hayır; teknik yenilik tek başına paradigma değişimi değildir.",
        "check": "Hangi ek bilginin ortak çerçevenin değişimini göstereceğini söyle.",
        "pitfall": "Her yeni veri veya cihazı bütün bilim anlayışının devrimi sayma."
      },
      {
        "title": "Tinsel ile ideal",
        "prompt": "Bir metin tarihsel bir dilin ve kültürel kurumun tinsel yönünü ele alıyor. Hartmann’da bunun ideal varlıkla otomatik özdeş sayılması uygun mudur?",
        "strategy": "İdeal-reel ayrımını reelin katmanlarından ayrı kontrol et.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Reel varlık içindeki katmanlar inorganik, organik, ruhsal ve tinsel olarak ayrılır."
          },
          {
            "label": "2. adım",
            "explanation": "Tarihsel dil ve kültürün tinsel oluşu onu kendiliğinden ideal varlıkla aynı kategori yapmaz."
          },
          {
            "label": "3. adım",
            "explanation": "Kaynak tablosunun kısaltmasını değil açık statü ayrımını kullanarak otomatik özdeşliği reddet."
          }
        ],
        "answer": "Uygun değildir; tinsel katman reel katmanlar içinde ele alınır.",
        "check": "Bir kişinin hem bedensel hem kültürel açıdan incelenebildiğini düşün.",
        "pitfall": "Şemadaki yüksekliği insanlara üstünlük veya değersizlik puanı veren sıra sanma."
      },
      {
        "title": "Maddi açıklama ve yorum",
        "prompt": "Bir metin üretim ilişkilerinin hukuk ve kültür dönüşümünü etkilediğini araştırıyor. Başka metin eski bir mektubun anlamını çağ bağlamında yorumluyor. Aynı yöntem midir?",
        "strategy": "İlk açıklamanın konusu ve ikinci yorumun hedefini ayrı yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Birinci metin toplumsal dönüşümü maddi üretim ilişkileriyle açıklama yönelimi taşır."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci metin insan ürününün anlamını dil ve tarihsel bağlamıyla kavramaya yönelir."
          },
          {
            "label": "3. adım",
            "explanation": "Tarihsel materyalizm ile hermeneutik bu örnekte farklı sorulara cevap verir; tarih sözcüğü onları aynı yapmaz."
          }
        ],
        "answer": "Hayır; açıklama temeli ve araştırılan problem farklıdır.",
        "check": "Her metindeki sonucu hangi dayanağın taşıdığını bir cümleyle göster.",
        "pitfall": "Aynı tarih veya kültür kelimesinden tek düşünür ve tek yöntem çıkarma."
      }
    ],
    "recall": [
      {
        "prompt": "Epoché dünyanın yokluğunu kanıtlar mı?",
        "answer": "Hayır; belirli inceleme için varlık hükmünü askıya alır."
      },
      {
        "prompt": "Hermeneutikte iki ana kanıt alanı nedir?",
        "answer": "Metnin kendi parça-bütün ilişkileri ve tarihsel-dilsel bağlamı."
      },
      {
        "prompt": "Yanlışlanabilir ile yanlışlandı aynı mıdır?",
        "answer": "Hayır; biri olası test koşulu, öteki gerçekleşmiş çürütücü sonuca ilişkindir."
      },
      {
        "prompt": "Tek siyah örnek bazı kuğular beyazdır savını çürütür mü?",
        "answer": "Hayır; en az bir beyaz örnek bulunmasıyla bağdaşabilir."
      },
      {
        "prompt": "Yeni cihaz paradigma değişimi midir?",
        "answer": "Tek başına değil; ortak kuramsal ve yöntemsel çerçeve değişimi aranır."
      },
      {
        "prompt": "Hartmann’da tinsel ideal ile aynı mıdır?",
        "answer": "Hayır; tinsel reelin katmanlarından biridir, ideal-reel ayrımı ayrıca yapılır."
      },
      {
        "prompt": "Sartre’ın insan savı bütün nesnelere genişletilir mi?",
        "answer": "Hayır; insanın seçimle kendini kurması özellikle belirtilen kapsamdır."
      },
      {
        "prompt": "Türkiye’deki katkıları öğrenirken ad dışında ne gerekir?",
        "answer": "Düşünürün uğraştığı problem, yöntem ve olumlu katkıyı örnekle açıklamak gerekir."
      }
    ],
    "source": "Aurelia YKS ilgili kopya kâğıtları, OGM ders notları ve MEBİ konu özetleriyle karşılaştırılarak hazırlanmış özgün öğretim. Tarihsel görüşlerin dayanakları ve sınırları birlikte açıklanır. Uygulama soruları özgündür; resmî sınav sorusu değildir."
  },
  {
    "id": "bilgi-ve-inanc",
    "subjectId": "tyt-din",
    "title": "Bilgi ve inanç",
    "minutes": 130,
    "objectives": [
      "İslam düşüncesindeki duyu, akıl ve doğru haber yollarını bağlamlarıyla ayır.",
      "Bilginin doğruluğu, faydası ve etik kullanımını ayrı değerlendir.",
      "İman, bilgi, tasdik, ikrar ve amel ilişkisini kaynakta esas alınan çerçevede açıkla.",
      "Taklidî-tahkikî edinimi ve ayet mesajlarını tam metin dayanağıyla yorumla."
    ],
    "sections": [
      {
        "title": "Dersin sorusu ve çerçevesi",
        "paragraphs": [
          "Bu konu İslam düşüncesinde bilginin kaynakları ve imanla ilişkisi üzerine kullanılan kavramları öğretir. Öğrenci bir görüşün tanımını ve gerekçesini öğrenebilir; bunu öğrenmesi o görüşü kişisel olarak benimsediği anlamına gelmez. Uygulama kişinin inancını sorgulayan veya puanlayan bir sistem değildir.",
          "Önce nasıl biliyoruz sorusuyla bilgiyi, ardından neyi kabul ediyoruz sorusuyla inanç tutumunu ayır. Bir dinin öğretisini açıklayabilmek ile onu kendi inancı olarak tasdik etmek farklı işlerdir. Sorularda yalnız verilen kişinin açık davranış ve gerekçeleri kullanılır; gerçek kullanıcıya dinî etiket üretilmez."
        ]
      },
      {
        "title": "Bilgi, ilim ve marifet",
        "paragraphs": [
          "Bilgi bir konuya ilişkin tanıma, anlama ve açıklama çabasının ürünü olarak ele alınabilir. İslam düşüncesinde ilim ve marifet terimleri bu çabanın farklı kullanımlarında görülür. İlim gerçeğe uygun bilme, marifet ise düşünerek daha derin kavrayış ve tanıma vurgusuyla kullanılabilir; bağlamları her metinde aynı değildir.",
          "El-Alîm adı İslam inancında Allah’ın bilgisinin kapsamını anlatır. Bu dinî kabul ile insanın sınırlı araştırma ve öğrenme süreçleri aynı ölçüm türü değildir. Dersin amacı terimin öğreti içindeki yerini anlamaktır. İnsanın bir iddiayı doğru kabul ederken hangi veriye veya aktarım kaynağına dayandığını ayrıca araştırması gerekir."
        ]
      },
      {
        "title": "Üç kaynak birlikte iş görebilir",
        "paragraphs": [
          "Ders kaynaklarında salim duyular, selim akıl ve sadık haber üç temel bilgi yolu olarak verilir. Duyular veri sağlayabilir, akıl verileri değerlendirip sonuç çıkarabilir, haber ise kişinin doğrudan yaşamadığı bir içeriği aktarabilir. Aynı olayda bu yolların birkaçının birlikte bulunması mümkündür.",
          "Bu üçlüyü biri ötekini bütünüyle içine alan katı kümeler veya birbirinden tamamen kopuk kutular sanma. Bir söz kulağa duyuyla ulaşır ama sözün güvenilir aktarım olup olmaması ayrı sorudur. Soru ilk veri mi, çıkarım mı yoksa temel aktarım kaynağı mı istiyor, önce onu belirle. Kaynağın işlevini bağlamla göster."
        ]
      },
      {
        "title": "Salim duyular ve doğrudan veri",
        "paragraphs": [
          "Sağlıklı işleyen görme, işitme, koklama, tatma ve dokunma dış çevreye ilişkin veri edinmede kullanılır. Zilin sesini doğrudan işitmek veya termometredeki göstergeyi görmek duyusal veri örnekleridir. Bu verinin ne anlama geldiğini açıklamak ise ayrıca kavram ve akıl yürütme gerektirebilir.",
          "Duyunun sağlıklı olması bütün olası yanılma koşullarının ortadan kalktığını göstermez. Işık, mesafe ve ölçüm düzeni algıyı etkileyebilir. Her duyusal veri her akılsal çıkarımdan zorunlu daha kesindir gibi genel sıralama kurma. Somut soruda hangi verinin doğrudan edinildiğini ve hangi yorumun sonradan eklendiğini ayır."
        ]
      },
      {
        "title": "İşitme ile haberin doğruluğu",
        "paragraphs": [
          "Bir sesi duymak işitme duyusuyla gerçekleşir. Fakat duyulan cümlenin kaynağı, içeriği ve güvenilirliği başka bir inceleme konusudur. Bir zilin çaldığını işitmekle, uzaktaki bir olay hakkında başkasının anlattığı habere dayanmak aynı tür dayanak değildir.",
          "Bir iletinin çok kişi tarafından paylaşılması da tek başına doğruluk garantisi olmaz; aynı ilk söylenti defalarca aktarılmış olabilir. Soru doğrudan duyusal veriyi soruyorsa işitmeyi, güvenilir mesajın dayanağını soruyorsa haberin koşullarını değerlendir. Sadece duydum sözcüğünden sadık haber sonucu üretme."
        ]
      },
      {
        "title": "Selim akıl: veriden gerekçeli sonuca",
        "paragraphs": [
          "Akıl, veriler arasında ilişki kurma, karşılaştırma ve sonuç çıkarma işlevleri taşır. Selim akıl din eğitimi bağlamında doğru ve tutarlı değerlendirmeye yönelen aklı ifade eder. Sayısal işlem yapılması şart değildir; bir ahlaki olayın neden-sonuç bağını düşünmek de akıl yürütme içerebilir.",
          "Çıkarımın biçimi ve öncüllerin dayanağı ayrı denetlenmelidir. Yanlış veya eksik öncüllerle kurulan bir sonucun kesin olduğunu söylemek uygun değildir. Bir kişi sonucu aklımla buldum dediğinde bütün gerekçeler kendiliğinden doğrulanmış olmaz. Verilenleri ve sonuca geçiş ilkesini açıkça göster."
        ]
      },
      {
        "title": "Akıl, irade ve sorumluluk",
        "paragraphs": [
          "Dersin İslam düşüncesi çerçevesinde akıl ve irade dinî sorumlulukla ilişkilidir. Kişinin değerlendirme ve seçim yapabilmesi, davranışının gerekçesi üzerine düşünmesini sağlar. Buradaki kavramsal ilişki insanları yalnız bir sınav sonucuna göre sorumlu veya sorumsuz ilan etme aracı değildir.",
          "İnsanın aklı önyargı, istek ve yanlış bilgiyle etkilenebilir. Bu nedenle araştırma ve eleştirel denetim önemlidir. Bir seçimin neye dayandığını anlamak için bilgiye erişimi ve verilen koşulları oku. Metinde olmayan korku, umut veya baskı gibi etkenleri yalnız çağrışımla kişinin davranışına ekleme."
        ]
      },
      {
        "title": "Sadık haber ve dinî aktarım",
        "paragraphs": [
          "Sadık haber doğru veya güvenilir haber anlamıyla İslam bilgi anlayışındaki bir kaynak başlığıdır. Vahiy ve peygamberden gelen haber bu çerçevede temel örneklerdir. Ders kaynakları sadık haberi mütevatir haber ile peygamberden gelen haber başlıkları altında açıklar.",
          "Bu tanımı her kaynağı belirsiz internet iletisine otomatik uygulama. Kaynakta dinî aktarımın hangi kabul ve güvenilirlik koşuluyla verildiğine bak. Kişinin mesajı yorumlarken akıl kullanması da temel haber kaynağını ortadan kaldırmaz. Aynı olayın iletişim aracıyla içerik dayanağını ayrı yaz."
        ]
      },
      {
        "title": "Mütevatir haber",
        "paragraphs": [
          "Mütevatir haber, aktarım şartları bakımından yalan üzerinde birleşmeleri aklen mümkün görülmeyen toplulukların kesintisiz iletimi olarak dinî bilgi geleneğinde tanımlanır. Burada yalnız büyük paylaşım sayısı değil, aktarımın niteliği ve sürekliliği önemlidir. Kur’an’ın aktarımı ders çerçevesinde bu başlıkla ilişkilendirilir.",
          "Bir sosyal medya iletisinin bin kez kopyalanması bağımsız ve güvenilir bin kaynak bulunduğunu göstermez. Hepsi aynı belirsiz ilk iddiaya dönüyor olabilir. Tanımı öğrenirken çokluk, kaynak bağımsızlığı ve aktarım koşulunu birlikte düşün. Hazır kurgu örneğin hangi şartı açık verdiğine bak; bilinmeyen şartı tamamlanmış sayma."
        ]
      },
      {
        "title": "Peygamberden gelen haber",
        "paragraphs": [
          "Dersin inanç çerçevesinde vahiy ilahi bildirimi ve bunun peygamber aracılığıyla insanlara ulaşmasını anlatır. Kur’an ve sünnet Müslümanlar için temel başvuru kaynaklarıdır. Sünnet peygamberin söz, fiil ve örnekliğiyle ilişkilidir; yalnız herhangi birinin günlük sözünün eş anlamı değildir.",
          "Bu sınıflama öğreti içindeki haberin dayanağını gösterir. Öğrencinin onu öğrenmesi veya bir soruda doğru adlandırması kendi inancını açıklamış olması değildir. Bir aktarımı incelerken hangi kaynak türünün açıkça verildiğini belirt. Duyusal erişim, akılsal yorum ve kaynak kabulü aynı örnekte farklı roller üstlenebilir."
        ]
      },
      {
        "title": "Öznel yaşantının genel sınırı",
        "paragraphs": [
          "Sezgi, rüya, keşif ve ilham gibi kişisel yaşantılar ders kaynaklarında herkes için bağlayıcı olmayan öznel kaynaklar olarak ayrılır. Bir kişinin bir şeyi hissetmesi onun bütün insanlarca aynı gerekçeyle kabul edilmesini zorunlu kılmaz. Yaşantının kişisel önemi ile genel kanıt gücü aynı ölçüt değildir.",
          "Bu ayrım her kişisel yaşantının değersiz olduğu anlamına gelmez. Bir karar başkalarının haklarını etkiliyorsa kamuya sunulan iddianın hangi denetlenebilir dayanağa sahip olduğu ayrıca sorulur. Tahmin ile doğrulanmış bilgi arasındaki kapsamı koru. Kaynak belli değilse kesin yalandır demek de en az kesin doğrudur demek kadar ek gerekçe ister."
        ]
      },
      {
        "title": "Doğru ve faydalı bilgi",
        "paragraphs": [
          "Bir bilginin doğru olması içeriğinin gerçeklikle uygunluğuyla; faydalı olması ise belirli amaç ve kişiler açısından olumlu işleviyle değerlendirilir. İki özellik ilişkili olabilir ama eş anlamlı değildir. Hoşa giden veya işe yarıyor gibi görünen bir haber sırf bu nedenle doğru olmaz.",
          "İslam din eğitimi bilgi sevgisini ve doğru kaynağı araştırmayı vurgular. Doğru bilgi iyi karar için önemli bir imkân sunar; fakat onu bilen herkesin her durumda doğru davranacağını tek başına garanti etmez. Bilginin edinimi, kabulü ve davranışa dönüşmesi farklı aşamalardır. Örneklerde bu aşamaların hangi verilerle desteklendiğini ayrı göster."
        ]
      },
      {
        "title": "Bilgi ahlakı ve paylaşma",
        "paragraphs": [
          "Bilgi ahlakı bilginin nasıl edinildiği, korunduğu, uygulandığı ve paylaşıldığı konularındaki sorumluluğu içerir. Bir iddiayı denetlemek kadar başkasının hakkını ihlal etmeden kullanmak da önem taşır. Bilgiyi yalnız kişisel çıkar için bozmak veya kaynağını gizlemek bu tartışmada sorun oluşturur.",
          "Paylaşmayı değerli görmek herkesin bütün özel bilgilerini izinsiz yayımlamak demek değildir. Öğretici bir bilgiyi aktarmakla kişisel mahremiyeti açığa çıkarmak farklıdır. Somut durumda neyin kimin bilgisi olduğunu, paylaşımın amacını ve rızayı açıkça düşün. Doğru olması bir içeriğin her yerde yayımlanmasını kendiliğinden haklı kılmaz."
        ]
      },
      {
        "title": "Bilginin korunması ve kullanım sonucu",
        "paragraphs": [
          "Kitaplar, kütüphaneler ve güvenilir kayıtlar birikimin sonraki insanlara aktarılmasına katkı sağlar. Koruma yalnız dosyayı saklamak değil, içeriğin bozulmadan ve kaynağıyla birlikte anlaşılabilir kalmasını da gerektirir. Bilgi üretmek kadar onu doğru kullanmak öğrenme sorumluluğunun parçasıdır.",
          "Teknik bilgi zarar verici amaçlarla da kullanılabilir. Bundan bütün teknik araştırmaların kötü olduğu sonucu çıkmaz; kullanım amacı, sonuçları ve haklarla ilişkisi değerlendirilir. Dersin örnekleri bu etik ayrımı öğretir. Bir konuyu biliyor olmayı bütün kullanım kararlarının zaten doğru olduğu varsayımına dönüştürme."
        ]
      },
      {
        "title": "Akaid ve iman",
        "paragraphs": [
          "Akaid İslam inancının temel esaslarını; akait ilmi bu esasları konu edinen çalışma alanını ifade eder. İman sözlükte güvenle tasdik ve bağlanma anlamları taşır. Dersin kullandığı dinî tanımda Allah’ın varlığı ve birliği, peygamberlik ve ahiret gibi iman esaslarının kalben kabulü öne çıkar.",
          "Mümin, Müslüman ve inkâr gibi terimler burada dinî kavramların tanımları olarak öğrenilir; uygulama bunları gerçek kullanıcılar hakkında hüküm vermek için kullanmaz. Bir soruda kişiyle ilgili belirli kabul veya ifade verildiyse o kavramsal ayrım incelenir. Başka bilinmeyen tutum ve davranışlar kendiliğinden doldurulmaz."
        ]
      },
      {
        "title": "Tasdik ve ikrar",
        "paragraphs": [
          "Tasdik içten onaylama, ikrar ise bu kabulü sözle ifade etme boyutudur. MEBİ’nin esas aldığı tasdik merkezli anlatımda imanın özü kalpteki kabuldür; dış ifade kişinin toplumsal olarak tanınmasında rol taşır. Dışarıdan aynı cümleyi söyleyen iki kişinin iç tutumunun mutlaka aynı olduğu çıkarılamaz.",
          "Ders kaynakları konuşamama veya baskı altında ifade edememe gibi durumları ayrıca belirtir. Bu koşullarda dış ifadenin yokluğu iç kabulün bulunmadığını kanıtlamaz. Hazır örnekte hangi şeyin açıkça verildiğini ayır: konuşma davranışı mı, kişinin kendi beyanıyla içten kabulü mü? Gerçek insanın zihnini uygulama tahmin etmez."
        ]
      },
      {
        "title": "Bilmek ve benimsemek",
        "paragraphs": [
          "Bir araştırmacı bir dinin görüşlerini ayrıntılı açıklayabilir ama bunları kendi inancı olarak kabul etmeyebilir. Açıklayabilmek bilgiye, kalben benimsemek tasdike ilişkin farklı verilerdir. Bilgi imanı anlamada araç olabilir; onun yerine aynı kavram olarak konulmaz.",
          "Tersine, bir inancı kabul ettiğini söylemek o konunun bütün ayrıntılarını bildiğini göstermez. Bilgi ve kabulün ilişkisi tek bir otomatik okla bütün durumları kapsamaz. Sorudaki açık bilgiyi kullan, verilmeyen niyet ve bağlılığı üretme. Bu ayrım din öğretisini öğrenmenin kişisel inanç kabulü sayılmamasını da açıklar."
        ]
      },
      {
        "title": "İman ve amel",
        "paragraphs": [
          "Amel iradeye dayanan iş ve davranış, salih amel ise dinî-ahlaki çerçevede iyi kabul edilen eylemdir. MEBİ’nin burada esas aldığı tasdik merkezli yorumda amel imanın özüyle aynı kavram sayılmaz; bununla birlikte iman ile yaşayış arasında güçlü bir ilişki kurulur. İnanılanın davranışa yansıması beklenir.",
          "Bu anlatımı bütün tarihsel mezhep tartışmalarının tek ve değişmez ifadesi diye genelleme. Aynı şekilde bir iyi davranıştan kişinin bütün inançlarını veya bir eksik davranıştan iç kabulünün kesin yokluğunu çıkarma. Kavram ilişkisini öğrenmekle gerçek kişi hakkında hüküm vermek farklı işlerdir. Sorunun açık verisini aşmadan düşün."
        ]
      },
      {
        "title": "Taklidî ve tahkikî edinim",
        "paragraphs": [
          "Taklidî iman araştırma ve delil incelemesinden çok çevreyi izleme yoluyla edinimi; tahkikî iman ise bilgi, araştırma ve gerekçeyle temellendirmeyi vurgular. Aynı kabul cümlesinin arkasında farklı öğrenme ve gerekçelendirme süreçleri bulunabilir. Belirleyici veri yalnız söylenen sonuç değil onun nasıl edinildiğidir.",
          "Bir kişi aileden öğrenmiş ve sonradan gerekçelerini araştırmışsa yalnız ilk çevre etkisine bakıp bütün süreci tek etikete daraltma. Hazır örnekte verilen araştırma ve delil vurgusunu açıkça göster. Bu sınıflama kişilerin değerine not verme aracı değildir; dersin bilgi ve temellendirme ilişkisini anlamak içindir."
        ]
      },
      {
        "title": "İsra 36: bilginin sorumluluğu",
        "paragraphs": [
          "İsra suresi 36. ayetin ders kaynaklarında öne çıkarılan mesajı, bilgi sahibi olunmayan şeyin peşine düşünmeden gitmemek ve duyu-akıl imkânlarını sorumlu kullanmaktır. Bir haber hakkında hüküm vermeden önce araştırma yapmak bu mesajla ilişkilendirilir. Öğrenilen kavram somut karar sürecine bağlanır.",
          "Ayet yorumunda metindeki dayanağı kullanmak önemlidir. Araştırma ve sorumluluk vurgusundan metinde olmayan her başka inanç niteliğini otomatik çıkarma. Bir yorumun desteklenmemesi onun her koşulda yanlış olduğunu göstermez; yalnız bu metnin o sonuca yetmediğini belirtir. Kavram bilgisiyle metin kanıtını birlikte ama ayrı kullan."
        ]
      },
      {
        "title": "Mülk 23: nimet ve şükür",
        "paragraphs": [
          "Mülk suresi 23. ayet ders çerçevesinde insanın işitme, görme ve düşünme imkânlarını nimet olarak görmesi ve şükürle karşılık vermesi mesajıyla ele alınır. Bilgi araçlarını uygun amaçla kullanmak bu ilişkiyi somutlaştırabilir. Şükür yalnız bir kelimeyi tekrar etmekle sınırlı bir davranış olarak sunulmaz.",
          "Bir nimeti kendi alanında doğru kullanmaya örnek verirken aradaki bağı açıkla: bilgiyi öğretmek veya aklı düşünmede kullanmak gibi. Metaforik dinî anlatımlarda geçen görememe veya duymama ifadelerini gerçek görme-işitme engelli insanlara ahlaki değersizlik atfetmek için kullanma. Öğrenilecek olan bilinçli yöneliş ve sorumluluk mesajıdır."
        ]
      },
      {
        "title": "Kanıt yollarını modelde ayır",
        "paragraphs": [
          "Etkileşimli örnekte doğrudan bir sesin işitilmesi, bir kaynağın haber aktarması ve iki veriden sonuç çıkarılması ayrı düğüm ve yollarla gösterilir. Aynı kulağın kullanılması haberin kaynağını doğrulamaz; bir çıkarımın bulunması da her öncülün doğru olduğunu kanıtlamaz. Değişen koşullar bu ayrımları görünür kılar.",
          "Model hazırlanmış tam örnekler üzerinde çalışır; kişinin inancını veya bütün gerçek haberlerin doğruluğunu otomatik çözen bir sistem değildir. Tahmininden sonra hangi veri, hangi çıkarım ve hangi kaynak kabulünün bulunduğunu kendi cümlelerinle yaz. Ardından farklı bir örnekte aynı ayrımı bağımsız olarak kurmayı dene."
        ]
      }
    ],
    "examples": [
      {
        "title": "İşitilen ses ve aktarılan iddia",
        "prompt": "Ece bir zil sesi işitiyor; Can uzaktaki bir olay hakkında kaynağı henüz denetlenmemiş ileti okuyor. İkisinin de otomatik sadık haber kullandığı söylenebilir mi?",
        "strategy": "Doğrudan algıyla aktarımın güvenilirliğini ayrı tut.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ece’nin dayanağı doğrudan ses algısıdır; bu duyusal veri örneğidir."
          },
          {
            "label": "2. adım",
            "explanation": "Can aktarılmış bir iddiaya erişmiştir ama güvenilirlik koşulu henüz verilmemiştir."
          },
          {
            "label": "3. adım",
            "explanation": "Dolayısıyla iki olayı aynı kesin sadık haber sınıfına koymak uygun değildir."
          }
        ],
        "answer": "Hayır; doğrudan işitme ile güvenilir haber ayrı sorulardır.",
        "check": "Kaynağı denetlenmemiş olmayı kesin yanlışlık diye de doldurma.",
        "pitfall": "Duydum sözcüğünü tek başına haberin doğruluğunun kanıtı sayma."
      },
      {
        "title": "İki aşamalı bilme",
        "prompt": "Bir öğrenci göstergeyi görüp 18 değerini kaydediyor, ardından iki kayıt arasındaki farkın nedenini verilen koşullarla açıklıyor. İlk veri ile ikinci işlem nasıl ayrılır?",
        "strategy": "Gözlem ve yorumun metindeki ayrı eylemlerini bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Göstergenin görülüp kaydedilmesi duyusal veri edinimine dayanır."
          },
          {
            "label": "2. adım",
            "explanation": "Kayıtları karşılaştırıp nedensel açıklama kurmak akıl yürütme içerir."
          },
          {
            "label": "3. adım",
            "explanation": "Bir örnekte iki yolun birlikte bulunması mümkündür; sorunun ilk veya ikinci aşamayı istemesine göre cevap verilir."
          }
        ],
        "answer": "Salim duyu, ardından selim akılla değerlendirme.",
        "check": "İlk sayının nedenini görmekle doğrudan gözlemlediğini varsaymadığını kontrol et.",
        "pitfall": "Bütün bir olayı zorla tek bilgi kaynağına indirgeme."
      },
      {
        "title": "Bilgi ve kabul",
        "prompt": "Bir araştırmacı dinin kavramlarını doğru açıklıyor fakat bunları kendi inancı olarak benimsemediğini açıkça söylüyor. Bilmekten tasdik zorunlu çıkar mı?",
        "strategy": "Açıklama yetisiyle içten kabul bilgisini ayrı değerlendir.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Kavramları açıklayabilmesi konu bilgisine ilişkin olumlu kanıttır."
          },
          {
            "label": "2. adım",
            "explanation": "Benimsemediği ayrıca açıkça verilmiştir; bilgi ile kabulün aynı kavram olmadığı görülür."
          },
          {
            "label": "3. adım",
            "explanation": "Bu örnekten bilmek her durumda inanmak demek değildir sonucu çıkar; kişinin bütün davranışları hakkında veri yoktur."
          }
        ],
        "answer": "Hayır; bilgi ve tasdik ayrı boyutlardır.",
        "check": "Araştırmacının bilinmeyen başka tutumlarını eklemediğini kontrol et.",
        "pitfall": "Bir din dersini öğrenmiş kullanıcıyı o inancı kabul etmiş sayma."
      },
      {
        "title": "İfade edememe istisnası",
        "prompt": "Ders kaynağının tasdik merkezli çerçevesinde kişi içten kabulünü belirtiyor, fakat baskı altında bunu açıkça söyleyemiyor. Dış ifadenin yokluğu tek başına iç kabulün yokluğunu gösterir mi?",
        "strategy": "Tasdik ile ikrarı, ayrıca verilen baskı koşulunu ayrı yaz.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İç kabul açıkça verilmiş; bu tasdik boyutuna ilişkin bilgidir."
          },
          {
            "label": "2. adım",
            "explanation": "Sözel ifade engellenmiş; bu durum ikrarın dış koşuluyla ilgilidir."
          },
          {
            "label": "3. adım",
            "explanation": "Kaynak bu istisnayı ayırdığı için yalnız dış ifade yokluğundan iç kabul yokluğu çıkarılamaz."
          }
        ],
        "answer": "Hayır; ifade engeli ile iç kabul aynı veri değildir.",
        "check": "Örneğin gerçek kullanıcının inancını tahmin etmediğini açık tut.",
        "pitfall": "Bir davranışın görünmemesinden zihindeki kabulün kesin yokluğunu otomatik üretme."
      }
    ],
    "recall": [
      {
        "prompt": "İşitme ile sadık haber neden ayrılır?",
        "answer": "İşitme erişim duyusudur; haberin kaynağı ve güvenilirliği başka bir koşuldur."
      },
      {
        "prompt": "Bilgi tasdikle aynı mıdır?",
        "answer": "Hayır; bir görüşü açıklamak onu içten benimsemeyi zorunlu kılmaz."
      },
      {
        "prompt": "Tasdik ile ikrar nasıl ayrılır?",
        "answer": "Tasdik içten kabul, ikrar bu kabulün ifade edilmesidir; ifade engeli ayrı değerlendirilir."
      },
      {
        "prompt": "Taklidî ve tahkikî edinimde hangi veri önemlidir?",
        "answer": "Sonuç cümlesi kadar kabulün çevreyi izleme veya araştırma-gerekçeyle nasıl edinildiği."
      }
    ],
    "source": "Aurelia YKS Din Kültürü ilgili kopya kâğıdı, OGM bilgi ve inanç ders notları ve MEBİ ilgili konu özetiyle karşılaştırılmış özgün öğretim. Dinî görüşlerin kaynak çerçevesi belirtilir. Sorular özgündür; resmî sınav sorusu değildir."
  }
];
const questionRows022: { passage: string; prompt: string; options: string[]; answer: number; hint: string; explanation: string; guidance: Guidance022 }[][] = [
  [
    {
      "passage": "Ada zarfı masadan aldı, üzerindeki adresi okudu ve yanlış odaya geldiğini anlayınca koridora döndü. Bir süre sonra doğru kapıyı bulup zarfı görevliye teslim etti.",
      "prompt": "Bu metinde ağır basan anlatım biçimi hangisidir?",
      "options": [
        "Öyküleme",
        "Betimleme",
        "Açıklama",
        "Tartışma",
        "Tanımlama"
      ],
      "answer": 0,
      "hint": "Başlangıç ile son durumu ve aradaki olay bağlarını göster.",
      "explanation": "Zarf başlangıçta masadadır; okuma ve arama sonunda görevliye ulaşır. Bu değişimi birbirine bağlı eylemler kurduğu için öyküleme baskındır. Sıralanan olayları ters çevirince anlatının gelişiminin bozulduğunu denetle.",
      "guidance": {
        "knowledge": [
          "Öykülemede eylemler belirli kişi ve zaman içinde yeni bir duruma ilerler."
        ],
        "strategy": "Başlangıç ile son durumu ve aradaki olay bağlarını göster.",
        "steps": [
          "Zarf başlangıçta masadadır; okuma ve arama sonunda görevliye ulaşır.",
          "Bu değişimi birbirine bağlı eylemler kurduğu için öyküleme baskındır."
        ],
        "optionReasons": [
          "Alma, okuma, dönme ve teslim etme yeni duruma ilerleyen olay zinciridir.",
          "Ortamın eşzamanlı duyusal nitelikleri metnin temel işi değildir.",
          "Genel bir kavram veya işleyiş öğretimi yapılmıyor.",
          "Bir karşı görüşe yönelik sav ve gerekçe kurulmamış.",
          "Bir kavramın ne olduğu tanımlanmıyor; ayrıca bu bir destek yoludur."
        ],
        "commonError": "Bir nesne adı görmeyi betimlemenin yeterli kanıtı sayma.",
        "check": "Sıralanan olayları ters çevirince anlatının gelişiminin bozulduğunu denetle."
      }
    },
    {
      "passage": "Kutunun yüzeyi mattı; kapağın iki yanında ince çizikler, köşelerinde solmuş etiketler vardı. İçteki kumaş sert, kenardaki metal tutamak soğuktu.",
      "prompt": "Bu metinde betimlemeyi en güçlü destekleyen özellik hangisidir?",
      "options": [
        "Aynı nesnenin eşzamanlı görünüş ve dokunma niteliklerinin canlandırılması",
        "Bir kişiye ait kararın sonuçla değişmesi",
        "Karşı görüşün gerekçeyle çürütülmesi",
        "Bir cihazın genel çalışma ilkesinin öğretilmesi",
        "Olayların kronolojik tarih çizelgesine bağlanması"
      ],
      "answer": 0,
      "hint": "Özellikleri tek bir sahnede birlikte gösterebilir misin, denetle.",
      "explanation": "Matlık ve çizikler görünüşü, sertlik ve soğukluk dokunma etkisini verir. Bu ayrıntılar yeni olay başlatmadan aynı nesneyi canlandırdığı için betimleme kanıtıdır. Metinde hem görme hem dokunma ayrıntısını ayrı işaretle; bütün duyular eklendi dememelisin.",
      "guidance": {
        "knowledge": [
          "Betimleme nesne veya ortamın niteliklerini zihinde canlandırmaya yönelir; farklı duyular kullanılabilir."
        ],
        "strategy": "Özellikleri tek bir sahnede birlikte gösterebilir misin, denetle.",
        "steps": [
          "Matlık ve çizikler görünüşü, sertlik ve soğukluk dokunma etkisini verir.",
          "Bu ayrıntılar yeni olay başlatmadan aynı nesneyi canlandırdığı için betimleme kanıtıdır."
        ],
        "optionReasons": [
          "Matlık, çizik, sertlik ve soğukluk aynı kutuyu zihinde kurar.",
          "Metinde belirli kişinin karar ve sonuç zinciri yoktur.",
          "Hiçbir karşı sav ele alınmıyor.",
          "Kutuya ait nitelikler verilmiş, mekanizma öğretilmemiştir.",
          "Bir tarih veya zaman içinde ilerleyen olay örgüsü yoktur."
        ],
        "commonError": "Vardı yüklemini tek başına olay ilerlemesi sanma.",
        "check": "Metinde hem görme hem dokunma ayrıntısını ayrı işaretle; bütün duyular eklendi dememelisin."
      }
    },
    {
      "passage": "Filtre, bir karışımın içindeki belirli parçacıkları ayırmaya yarar. Gözeneklerin boyu hangi parçaların tutulacağını etkiler; gözenekten küçük bazı parçalar sıvıyla birlikte geçebilir.",
      "prompt": "Bu paragrafın temel anlatım amacı hangisidir?",
      "options": [
        "Bir kahramanın yaşadığı olayı sonuçlandırmak",
        "Bir aracın işlevini ve ilişkili koşulu öğretmek",
        "Filtrenin rengini izlenimci biçimde canlandırmak",
        "Rakip bir görüşün yanlışlığını savunmak",
        "Bir yazarın sözünü tanık göstererek benimsetmek"
      ],
      "answer": 1,
      "hint": "Okurun metinden gerçekten hangi işleyiş ilişkisini öğrendiğini söyle.",
      "explanation": "Filtrenin parçacık ayırdığı ve boyun geçişi etkilediği bilgileri verilir. Bu iki bilgi çalışma ilişkisini öğrettiği için açıklayıcı amaç öne çıkar. Paragraftaki koşulu bütün parçacıklar kesin tutulur diye genişletmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Açıklayıcı anlatım kavram, olgu veya işleyiş hakkında anlaşılır bilgi vermeyi amaçlar."
        ],
        "strategy": "Okurun metinden gerçekten hangi işleyiş ilişkisini öğrendiğini söyle.",
        "steps": [
          "Filtrenin parçacık ayırdığı ve boyun geçişi etkilediği bilgileri verilir.",
          "Bu iki bilgi çalışma ilişkisini öğrettiği için açıklayıcı amaç öne çıkar."
        ],
        "optionReasons": [
          "Belirli kahraman ve olay zinciri yoktur.",
          "Filtrenin ne yaptığı ve gözenek boyunun etkisi açıklanmıştır.",
          "Renk ve kişisel duyusal izlenim ana amaç değildir.",
          "Paragrafta karşı sav ve onu çürütme örgüsü verilmemiştir.",
          "Alıntı ve tanık kişi bulunmuyor."
        ],
        "commonError": "Sayısal değer yoksa açıklama olamaz diye düşünme.",
        "check": "Paragraftaki koşulu bütün parçacıklar kesin tutulur diye genişletmediğini kontrol et."
      }
    },
    {
      "passage": "Bazıları okul bahçesinin yalnız boş alan olduğunu söylüyor. Oysa bu alan çocukların birlikte üretip oyun kurmasına imkân verir. Bu yüzden bahçeyi bütünüyle kaldırmak doğru bir karar değildir.",
      "prompt": "Bu metnin tartışmacı örgüsünü hangi ilişki kurar?",
      "options": [
        "Yalnız eşzamanlı renklerin sıralanması",
        "Karşı sav ile ona cevap veren gerekçe ve sonuç",
        "Bir olayın yalnız önce-sonra aşamaları",
        "Terimin sözlük anlamının tek başına verilmesi",
        "Sayısal verinin kaynaksız aktarılması"
      ],
      "answer": 1,
      "hint": "Yazarın karşı çıktığı savı ve kendi sonucunu iki satıra ayır.",
      "explanation": "Karşı sav bahçenin yalnız boş alan olduğu; cevap üretim ve oyun işlevinin bulunduğudur. Bu gerekçe kaldırma kararına itirazı taşıdığı için tartışmacı örgü kurulmuştur. Gerekçeyi kaldırdığında savın destek yolunun eksildiğini gör.",
      "guidance": {
        "knowledge": [
          "Tartışma bir görüşü gerekçeyle savunur; karşı görüş açık veya örtük biçimde ele alınabilir."
        ],
        "strategy": "Yazarın karşı çıktığı savı ve kendi sonucunu iki satıra ayır.",
        "steps": [
          "Karşı sav bahçenin yalnız boş alan olduğu; cevap üretim ve oyun işlevinin bulunduğudur.",
          "Bu gerekçe kaldırma kararına itirazı taşıdığı için tartışmacı örgü kurulmuştur."
        ],
        "optionReasons": [
          "Renk sıralaması bulunmuyor.",
          "Boş alan görüşüne üretim ve oyun gerekçesiyle karşı çıkılıyor.",
          "Belirli olay zinciri değil bir kararın haklılığı tartışılıyor.",
          "Bahçe için yalnız tanım yapılmamış; kaldırma kararına itiraz var.",
          "Metinde sayısal veri yoktur."
        ],
        "commonError": "Bilgi cümlesi görmekle ana amacın mutlaka açıklama olduğunu sanma.",
        "check": "Gerekçeyi kaldırdığında savın destek yolunun eksildiğini gör."
      }
    },
    {
      "passage": "Koridorun soluk ışığı duvarlardaki izleri belli ediyordu. Ece kapıyı açtı, içeri girdi ve kayıp dosyayı masanın altında buldu. Sonra dosyayı sorumluya götürdü.",
      "prompt": "Kullanılan biçimler ile ağır basan biçim için hangi eşleştirme doğrudur?",
      "options": [
        "Yalnız betimleme kullanılmıştır.",
        "Yalnız açıklama kullanılmıştır.",
        "Tartışma ve tanımlama kullanılmış; tartışma ağır basmıştır.",
        "Betimleme ve açıklama kullanılmış; açıklama ağır basmıştır.",
        "Betimleme ve öyküleme kullanılmış; öyküleme ağır basmıştır."
      ],
      "answer": 4,
      "hint": "Önce ortam cümlesini, sonra değişen olayları ayrı oku.",
      "explanation": "İlk cümle görünüşü canlandırır; sonraki cümleler dosyanın bulunup teslimine ilerler. Bu yüzden iki biçim birlikte vardır ve olay örgüsü baskındır. Kullanılmıştır sorusuyla ağır basar sorusunun cevabını ayrı kurabildiğini denetle.",
      "guidance": {
        "knowledge": [
          "Bir paragrafta birden çok biçim bulunabilir; baskınlık bütünü örgütleyen işleve bağlıdır."
        ],
        "strategy": "Önce ortam cümlesini, sonra değişen olayları ayrı oku.",
        "steps": [
          "İlk cümle görünüşü canlandırır; sonraki cümleler dosyanın bulunup teslimine ilerler.",
          "Bu yüzden iki biçim birlikte vardır ve olay örgüsü baskındır."
        ],
        "optionReasons": [
          "Belirgin olay zinciri gözden kaçırılmıştır.",
          "Genel bir kavram veya yöntem öğretilmemiştir.",
          "Karşı sav ve kavram tanımı bulunmaz.",
          "Verilen eylemler yöntem öğretimi değil belirli bir yaşantıdır.",
          "Ortam özelliğini olayların dosyayı bulup götürme akışı izler."
        ],
        "commonError": "Tek çarpıcı nitelemeyi bütün metnin tek biçimi sayma.",
        "check": "Kullanılmıştır sorusuyla ağır basar sorusunun cevabını ayrı kurabildiğini denetle."
      }
    },
    {
      "passage": "Rehber salona girdi, haritayı masaya serdi ve ziyaretçilere eski yolların nasıl çizildiğini açıkladı. Ziyaretçiler sorularını sorunca haritayı toplayıp dolaba kaldırdı.",
      "prompt": "Bu parçadan neden yalnız açıkladı fiiline dayanılarak açıklayıcı anlatım sonucu çıkarılamaz?",
      "options": [
        "Metinde hiç eylem bulunmadığı için",
        "Açıklayıcı anlatımda hiçbir insan adı geçemeyeceği için",
        "Çizim yöntemi okura öğretilmemiş, açıklama eylemi olay dizisi içinde bildirilmiştir.",
        "Harita sözcüğü her zaman tartışma gerektirdiği için",
        "Geçmiş zaman eki açıklamayı her koşulda yasakladığı için"
      ],
      "answer": 2,
      "hint": "Bu paragraftan yolların çizim kuralını yazıp yazamadığını sor.",
      "explanation": "Okur rehberin açıklama yaptığını öğrenir, fakat hangi çizim kuralının anlatıldığını öğrenmez. Bu nedenle tek fiil yerine metnin sunduğu içerik ve olay örgüsü esas alınır. Açıklamanın içeriğine ait tek bir gerçek kural bulunup bulunmadığını kontrol et.",
      "guidance": {
        "knowledge": [
          "Bir işin yapıldığını haber vermekle o işi veya bilgiyi okura gerçekten açıklamak farklıdır."
        ],
        "strategy": "Bu paragraftan yolların çizim kuralını yazıp yazamadığını sor.",
        "steps": [
          "Okur rehberin açıklama yaptığını öğrenir, fakat hangi çizim kuralının anlatıldığını öğrenmez.",
          "Bu nedenle tek fiil yerine metnin sunduğu içerik ve olay örgüsü esas alınır."
        ],
        "optionReasons": [
          "Girdi, serdi, açıkladı ve kaldırdı eylemleri vardır.",
          "İnsan adı açıklayıcı metinde de geçebilir.",
          "Fiil bir konuşmanın yapıldığını anlatır; yöntemin kendisini vermez.",
          "Nesne adı anlatım biçimini tek başına belirlemez.",
          "Zaman eki böyle değişmez bir yasak koymaz."
        ],
        "commonError": "Yüklemin adını anlatım biçimi etiketiyle otomatik eşleştirme.",
        "check": "Açıklamanın içeriğine ait tek bir gerçek kural bulunup bulunmadığını kontrol et."
      }
    },
    {
      "passage": "Kütüphanenin masaları beyaz, raf aralıkları genişti. Cam duvarın yanında aynı yükseklikte üç dolap ve iki uzun sıra bulunuyordu; zeminde koyu renk çizgiler vardı.",
      "prompt": "Nesnel dil kullanılmasına rağmen betimlemenin öne çıkması neyle açıklanır?",
      "options": [
        "Bütün metnin bir kavramın nedenini ispatlamasıyla",
        "Bir karşıt görüşün reddedilmesiyle",
        "Bir mekânın görünüş ve yerleşiminin canlandırılmasıyla",
        "Bir karakterin zaman içinde karar değiştirmesiyle",
        "Yazarın kaynak kişiden doğrudan alıntı yapmasıyla"
      ],
      "answer": 2,
      "hint": "Hangi özelliklerin tek sahnede birlikte gösterildiğini bul.",
      "explanation": "Masa rengi, raf aralığı ve dolapların yerleşimi ortamın eşzamanlı özellikleridir. Bunlar bir mekanizmayı öğretmekten çok mekânı canlandırdığı için betimleme öne çıkar. Metinde öğrenilen bir işleyiş kuralı mı yoksa yerleşim görünüşü mü olduğunu ayır.",
      "guidance": {
        "knowledge": [
          "Nesnel betimleme de gözlenebilir niteliklerle görünüş kurabilir; öznel duygu zorunlu değildir."
        ],
        "strategy": "Hangi özelliklerin tek sahnede birlikte gösterildiğini bul.",
        "steps": [
          "Masa rengi, raf aralığı ve dolapların yerleşimi ortamın eşzamanlı özellikleridir.",
          "Bunlar bir mekanizmayı öğretmekten çok mekânı canlandırdığı için betimleme öne çıkar."
        ],
        "optionReasons": [
          "Genel neden veya işleyiş bağı öğretilmemiştir.",
          "Metinde karşı sav yoktur.",
          "Nesnel nitelikler aynı ortamı zihinde kurar.",
          "Belirli olay değişimi anlatılmamıştır.",
          "Tanık sözü veya alıntı bulunmaz."
        ],
        "commonError": "Nesnel olan her paragrafı otomatik açıklama sayma.",
        "check": "Metinde öğrenilen bir işleyiş kuralı mı yoksa yerleşim görünüşü mü olduğunu ayır."
      }
    },
    {
      "passage": "“Bu iki kap aynı maddeden yapılmıştır. İlki daha geniş, ikincisi daha derindir; bu özellikler sıvının yayılma alanını değiştirir.” Yazar yalnız iki biçimin farkını öğretiyor, seçim önermiyor.",
      "prompt": "Bu karşılaştırma için hangi değerlendirme uygundur?",
      "options": [
        "İki unsur geçtiği her metin zorunlu tartışmadır.",
        "Geniş sözcüğü bütün paragrafı zorunlu öykü yapar.",
        "Bilgi vermek için mutlaka sayısal değer bulunmalıdır.",
        "Karşılaştırma ile anlatım biçimi her koşulda aynı sınıflamadır.",
        "Karşılaştırma kullanılması tek başına tartışmacı anlatımı kanıtlamaz."
      ],
      "answer": 4,
      "hint": "Metnin hangi görüşü benimsetmek istediğini değil neyi öğretmekte olduğunu kontrol et.",
      "explanation": "Paragraf iki kabın nitelik ve sonuç farkını öğretir; bir rakip görüşü çürütmez. Dolayısıyla karşılaştırma varlığı tek başına tartışma sonucu vermez. Soruya eklenmeyen seçim ve karşı savı kendi varsayımınla üretmediğini denetle.",
      "guidance": {
        "knowledge": [
          "Karşılaştırma düşünceyi geliştirme yoludur; açıklama veya tartışmaya hizmet edebilir."
        ],
        "strategy": "Metnin hangi görüşü benimsetmek istediğini değil neyi öğretmekte olduğunu kontrol et.",
        "steps": [
          "Paragraf iki kabın nitelik ve sonuç farkını öğretir; bir rakip görüşü çürütmez.",
          "Dolayısıyla karşılaştırma varlığı tek başına tartışma sonucu vermez."
        ],
        "optionReasons": [
          "Karşı sav veya ikna amacı ayrıca aranmalıdır.",
          "Nitelik sözcüğü olay zinciri oluşturmaz.",
          "İlişki sözle de açıklanabilir.",
          "Biri destek yolu, öteki genel örgü ve amaçtır.",
          "İki özellik öğretici amaçla yan yana getirilebilir."
        ],
        "commonError": "Bir yöntemi iletişim amacının yerine koyma.",
        "check": "Soruya eklenmeyen seçim ve karşı savı kendi varsayımınla üretmediğini denetle."
      }
    },
    {
      "passage": "İdil dar omuzlu, kısa saçlı bir çocuktu. Kalabalıkta konuşurken çekingenleşir, yeni biriyle tanışmadan önce bir süre sessizce beklerdi. Yazar onun görünüşü ve genel eğilimlerini tanıtıyor.",
      "prompt": "Bu parçada portreyi gösteren temel özellik hangisidir?",
      "options": [
        "Belirli bir günün olayının kronolojik sonuçlandırılması",
        "Bir bilimsel sürecin formülle ispatlanması",
        "Yazarın rakip sanat görüşünü çürütmesi",
        "Kişinin fiziksel ve ruhsal niteliklerinin birlikte verilmesi",
        "Bütün duyuların tek tek aynı anda kullanılması"
      ],
      "answer": 3,
      "hint": "Dış görünüş ayrıntısını genel kişilik niteliğinden ayır.",
      "explanation": "Dar omuz ve kısa saç fiziksel; çekingenlik ve bekleme eğilimi ruhsal yönü tanıtır. Bu tanıtım portredir; her yüklem belirli olay zinciri değildir. Yalnız verilen iki yönü kullan; metne bütün duyular veya bilinmeyen niyet ekleme.",
      "guidance": {
        "knowledge": [
          "Portre bir kişinin fiziksel veya ruhsal özelliklerinin betimlenmesidir."
        ],
        "strategy": "Dış görünüş ayrıntısını genel kişilik niteliğinden ayır.",
        "steps": [
          "Dar omuz ve kısa saç fiziksel; çekingenlik ve bekleme eğilimi ruhsal yönü tanıtır.",
          "Bu tanıtım portredir; her yüklem belirli olay zinciri değildir."
        ],
        "optionReasons": [
          "Genel nitelik ve alışkanlıklar verilmiştir.",
          "Süreç ve formül bulunmuyor.",
          "Bir karşı sav tartışılmıyor.",
          "Omuz ve saç dış görünüşe, çekingenlik genel ruhsal eğilime yönelir.",
          "Tat, koku ve başka bütün duyular verilmemiştir."
        ],
        "commonError": "Bir eylem kipini tek başına öyküleme sayma.",
        "check": "Yalnız verilen iki yönü kullan; metne bütün duyular veya bilinmeyen niyet ekleme."
      }
    },
    {
      "passage": "Buharlaşma sıvı yüzeyinden gaz hâline geçiştir. Sıcaklık ve yüzey alanı gibi koşullar bu süreçte etkili olabilir. Metinde belirli bir kişinin yaşadığı tekil olay anlatılmıyor.",
      "prompt": "Zaman içinde gerçekleşen süreçten söz edilmesi neden burada zorunlu öyküleme değildir?",
      "options": [
        "Öyküleme hiçbir zaman zaman içeremez.",
        "Açıklama yalnız insan dışı nesneleri anlatabilir.",
        "Gaz sözcüğü her metni betimleme yapar.",
        "Her süreç anlatımı mutlaka bir kahraman macerasıdır.",
        "Amaç genel bir oluşu ve koşullarını öğretmektir."
      ],
      "answer": 4,
      "hint": "Paragrafın genel kural mı belirli yaşantı mı verdiğini sor.",
      "explanation": "Metin buharlaşmanın ne olduğunu ve hangi koşullarla ilişkili olduğunu öğretir. Bir kahramanın belirli zamanda yaşadığı olay örgüsü kurulmadığı için süreç sözcüğü tek başına öyküleme gerektirmez. Öğrenilen tanım ve koşulları metinden ayrı ayrı göster.",
      "guidance": {
        "knowledge": [
          "Zamana bağlı oluş bilgisi açıklayıcı amaçla da sunulabilir."
        ],
        "strategy": "Paragrafın genel kural mı belirli yaşantı mı verdiğini sor.",
        "steps": [
          "Metin buharlaşmanın ne olduğunu ve hangi koşullarla ilişkili olduğunu öğretir.",
          "Bir kahramanın belirli zamanda yaşadığı olay örgüsü kurulmadığı için süreç sözcüğü tek başına öyküleme gerektirmez."
        ],
        "optionReasons": [
          "Zaman öykülemenin unsurlarından olabilir.",
          "Açıklama insanla ilgili konularda da kullanılabilir.",
          "Tek nesne veya madde adı biçimi belirlemez.",
          "Genel süreç bilgisi ile tekil olay örgüsü ayrıdır.",
          "İşleyiş bilgisi açıklayıcı amaca hizmet eder."
        ],
        "commonError": "Önce ve sonra düşüncesini her bağlamda aynı anlatım biçimi sanma.",
        "check": "Öğrenilen tanım ve koşulları metinden ayrı ayrı göster."
      }
    },
    {
      "passage": "Bir paragraf cihazın çalışma ilkesini öğretirken örnek veriyor; başka paragraf aynı örneği cihazın yasaklanması gerektiği savını desteklemek için kullanıyor. İki metinde örnek ortak.",
      "prompt": "Bu durum hangi ayrımı gösterir?",
      "options": [
        "Örnek geçen her metin zorunlu öykülemedir.",
        "Anlatım amacı yalnız ortak cihaz adıyla belirlenir.",
        "Bilgi ve sav her koşulda aynı şeydir.",
        "Aynı düşünceyi geliştirme yolu farklı anlatım amaçlarına hizmet edebilir.",
        "Bir örnek varsa başka hiçbir biçim bulunamaz."
      ],
      "answer": 3,
      "hint": "İki paragrafta örneğin hangi bütünü desteklediğini karşılaştır.",
      "explanation": "İlk metinde örnek işleyişin anlaşılmasını, ikincide yasak önerisinin benimsenmesini destekler. Ortak araç amaç farkını ortadan kaldırmaz. Konu adını kapatıp iki metnin yaptığı işi kendi cümlenle anlat.",
      "guidance": {
        "knowledge": [
          "Araç ile amaç aynı kategori değildir; örnek bir destek yöntemidir."
        ],
        "strategy": "İki paragrafta örneğin hangi bütünü desteklediğini karşılaştır.",
        "steps": [
          "İlk metinde örnek işleyişin anlaşılmasını, ikincide yasak önerisinin benimsenmesini destekler.",
          "Ortak araç amaç farkını ortadan kaldırmaz."
        ],
        "optionReasons": [
          "Örneğin işlevi bütün olay anlatımını gerektirmez.",
          "Konu aynı kalırken amaç değişebilir.",
          "Öğretme ile benimsetme işlevleri ayrıdır.",
          "Örneklendirme hem açıklayıcı hem tartışmacı örgüde kullanılabilir.",
          "Birlikte kullanım mümkündür."
        ],
        "commonError": "Yöntemi görünce bütün metnin biçimini tek adımda seçme.",
        "check": "Konu adını kapatıp iki metnin yaptığı işi kendi cümlenle anlat."
      }
    },
    {
      "passage": "“Yalnız pahalı kitapların değerli olduğu düşüncesine katılmıyorum. Eski bir halk öyküsü de insan deneyimini güçlü biçimde anlatabilir; değeri yalnız fiyatla ölçemeyiz.”",
      "prompt": "Bu metinde hangi amaç öne çıkar?",
      "options": [
        "Yalnız kitap kapağının görünüşünü canlandırmak",
        "Bir ölçüte itiraz edip başka değerlendirmeyi gerekçelendirmek",
        "Geçmiş bir yolculuğu olay sırasıyla anlatmak",
        "Sadece değer sözcüğünün sözlük tanımını vermek",
        "Bir sayısal sayımın ham sonuçlarını bildirmek"
      ],
      "answer": 1,
      "hint": "Yalnız fiyat ölçütü ile yazarın örneği arasındaki çatışmayı göster.",
      "explanation": "Yazar fiyatı tek belirleyici sayan görüşe karşı halk öyküsünün anlatım gücünü örnek verir. Bu örnek alternatif değer ölçütünü desteklediği için tartışma amacı öne çıkar. Karşı çıkılan savı ve önerilen ölçütü iki ayrı cümleyle yaz.",
      "guidance": {
        "knowledge": [
          "Tartışmacı amaç karşı görüşü sınırlayan ve kendi savına gerekçe sunan örgüyle anlaşılır."
        ],
        "strategy": "Yalnız fiyat ölçütü ile yazarın örneği arasındaki çatışmayı göster.",
        "steps": [
          "Yazar fiyatı tek belirleyici sayan görüşe karşı halk öyküsünün anlatım gücünü örnek verir.",
          "Bu örnek alternatif değer ölçütünü desteklediği için tartışma amacı öne çıkar."
        ],
        "optionReasons": [
          "Görünüş nitelikleri ana işlev değildir.",
          "Fiyatı tek ölçüt sayan görüşe karşı çıkılmıştır.",
          "Belirli olay dizisi verilmemiştir.",
          "Tanım yerine bir ölçüte yönelik savunma vardır.",
          "Sayısal sayım yoktur."
        ],
        "commonError": "Her örnek cümlesini sırf örnek olduğu için açıklamanın kesin kanıtı sayma.",
        "check": "Karşı çıkılan savı ve önerilen ölçütü iki ayrı cümleyle yaz."
      }
    },
    {
      "passage": "“Su nasıl arıtılır? Önce askıdaki bazı parçalar uygun filtrelerle ayrılır; uygulanan diğer aşamalar suyun niteliğine göre değişir.” Yazar okura bir süreci tanıtıyor.",
      "prompt": "Soru cümlesinin bulunması anlatımı neden tek başına tartışmacı yapmaz?",
      "options": [
        "Her soru cümlesi zorunlu karşı sav içerir.",
        "Soru burada öğretilecek işleyişi açmak için kullanılmıştır.",
        "Soru bulunan hiçbir metin bilgi veremez.",
        "Önce sözcüğü her durumda bir kahraman zorunlu kılar.",
        "Filtre sözcüğü kendi başına sanatlı betimleme kanıtıdır."
      ],
      "answer": 1,
      "hint": "Sorunun ardından ne yapıldığını, bir görüşle çatışma olup olmadığını oku.",
      "explanation": "Açılış sorusu arıtma işleyişini tanıtmaya hizmet eder; devamında karşı sav çürütülmez. Bu nedenle yalnız soru işareti tartışma için yeterli değildir. Süreçteki sınır ifadesini bütün sular aynı yöntemle arıtılır diye genişletme.",
      "guidance": {
        "knowledge": [
          "Anlatım biçimi noktalama işaretiyle değil metnin amacı ve örgüsüyle belirlenir."
        ],
        "strategy": "Sorunun ardından ne yapıldığını, bir görüşle çatışma olup olmadığını oku.",
        "steps": [
          "Açılış sorusu arıtma işleyişini tanıtmaya hizmet eder; devamında karşı sav çürütülmez.",
          "Bu nedenle yalnız soru işareti tartışma için yeterli değildir."
        ],
        "optionReasons": [
          "Karşı görüş metinde verilmemiştir.",
          "Retorik veya doğrudan soru farklı amaçlara hizmet edebilir.",
          "Verilen devam bilgiyi açıklamaktadır.",
          "Süreç açıklaması da aşama kullanabilir.",
          "Tek nesne adı biçimi belirlemez."
        ],
        "commonError": "Bir noktalama işaretini bütün iletişim amacının yerine kullanma.",
        "check": "Süreçteki sınır ifadesini bütün sular aynı yöntemle arıtılır diye genişletme."
      }
    },
    {
      "passage": "Bir metin önce bir salonun duvar ve ışık özelliklerini verir; sonra burada gerçekleşen töreni olay sırasıyla anlatır. Soru yalnız “hangi anlatım biçimleri kullanılmıştır?” diyor.",
      "prompt": "Cevaplamada hangi işlem gerekir?",
      "options": [
        "Sadece en çok cümlesi olan biçimi yazıp diğerini yok saymak",
        "Her biçim için metindeki ayrı dayanağı gösterip birlikte kullanılanları belirlemek",
        "Salon sözcüğünden yalnız betimleme seçmek",
        "Tören kelimesi geçince mutlaka tartışma demek",
        "Bütün metinlerde sadece tek biçim bulunabileceğini kabul etmek"
      ],
      "answer": 1,
      "hint": "Kökte istenenin birlikte kullanılanları saymak olduğunu önce belirle.",
      "explanation": "İlk bölümde eşzamanlı nitelikler betimleme, ikinci bölümde olay ilerleyişi öyküleme dayanağıdır. Kullanılmıştır sorusu ikisini birlikte hesaba katmayı gerektirir. İki yanıtın da hangi metin parçasına dayandığını göster.",
      "guidance": {
        "knowledge": [
          "Kullanılan biçimler ile ağır basan biçim ayrı soru görevleridir."
        ],
        "strategy": "Kökte istenenin birlikte kullanılanları saymak olduğunu önce belirle.",
        "steps": [
          "İlk bölümde eşzamanlı nitelikler betimleme, ikinci bölümde olay ilerleyişi öyküleme dayanağıdır.",
          "Kullanılmıştır sorusu ikisini birlikte hesaba katmayı gerektirir."
        ],
        "optionReasons": [
          "Bu işlem kullanılanlar sorusunu eksik cevaplar.",
          "Kök bütün kullanılan biçimleri istiyor, yalnız baskını değil.",
          "Sonraki olay dizisi de hesaba katılmalıdır.",
          "Konu adı sav-gerekçe örgüsünü garanti etmez.",
          "Birlikte kullanım açıkça mümkündür."
        ],
        "commonError": "Baskınlık sorusunu kullanılanların sayımı yerine gizlice koyma.",
        "check": "İki yanıtın da hangi metin parçasına dayandığını göster."
      }
    },
    {
      "passage": "“Lambalar loş, perdeler kalın ve kapı ağırdı. Görevli koştu, anahtarı çevirdi, kapıyı açtı; içeride kalan çocuğu çıkarınca herkes rahatladı.”",
      "prompt": "Bu metinde aşağıdakilerden hangisi için açık dayanak yoktur?",
      "options": [
        "Betimleyici özelliklerin bulunması",
        "Bütün duyulara ait ayrıntıların tek tek verilmesi",
        "Bir olayın ilerlemesi",
        "Başlangıç ile sonuç durumunun farklı olması",
        "Bir kişinin eylemde bulunması"
      ],
      "answer": 1,
      "hint": "Her seçeneğin istediği kapsam için ayrı metin kanıtı bul.",
      "explanation": "Metin nitelikler ve olay zinciri verir; bu özellikler için açık dayanak vardır. Ancak bütün duyuların tek tek kullanıldığı sonucu metnin verdiğinden daha geniştir. Tat ve koku gibi verilmeyen ayrıntıları zihninden eklemediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Olumsuz kökte bulunmayan özellik aranır; birkaç duyusal ayrıntı bütün duyular demek değildir."
        ],
        "strategy": "Her seçeneğin istediği kapsam için ayrı metin kanıtı bul.",
        "steps": [
          "Metin nitelikler ve olay zinciri verir; bu özellikler için açık dayanak vardır.",
          "Ancak bütün duyuların tek tek kullanıldığı sonucu metnin verdiğinden daha geniştir."
        ],
        "optionReasons": [
          "Loş lamba, kalın perde ve ağır kapı nitelik verir.",
          "Tat ve koku gibi bütün duyuların örnekleri metinde bulunmaz.",
          "Koşma, açma ve çıkarma yeni sonuca gider.",
          "Çocuk önce içeridedir, sonra çıkarılmıştır.",
          "Görevlinin eylemleri açıkça anlatılır."
        ],
        "commonError": "Bulunmayan özelliği ararken metindeki doğru bir özelliği işaretleme.",
        "check": "Tat ve koku gibi verilmeyen ayrıntıları zihninden eklemediğini kontrol et."
      }
    }
  ],
  [
    {
      "passage": "Bir okul antik metinleri yalnız ezberlemiyor; farklı nüshaları ve yorumları karşılaştırarak insanın eğitimle gelişmesini tartışıyor. Metin etkin okuma ve insanın yetilerini birlikte vurguluyor.",
      "prompt": "Bu etkinlik Rönesans’ın hangi yönelimiyle en yakından ilişkilidir?",
      "options": [
        "Bütün eski yorumları değişmez biçimde kabul etme",
        "Her türlü dinî kabulün zorunlu reddi",
        "Tek bir deneyin bütün evreni kesin açıklaması",
        "Klasik kültür ve insan eğitimini öne çıkaran hümanizm",
        "Bütün kaynakların kullanılmasının yasaklanması"
      ],
      "answer": 3,
      "hint": "İnsan sözcüğüyle yetinmeden eğitim ve klasik metin bağını birlikte göster.",
      "explanation": "Metin nüsha ve yorum karşılaştırmasını insanın gelişimi sorusuyla birleştirir. Bu birliktelik hümanist yönelimi destekler, bütün inançları reddetme sonucu ise verilmez. Seçilen görüşü metindeki iki ayrı ayrıntıyla gerekçelendir.",
      "guidance": {
        "knowledge": [
          "Hümanizm Rönesans bağlamında insanın değeri, eğitimi ve klasik kültüre yönelişle ilişkilidir."
        ],
        "strategy": "İnsan sözcüğüyle yetinmeden eğitim ve klasik metin bağını birlikte göster.",
        "steps": [
          "Metin nüsha ve yorum karşılaştırmasını insanın gelişimi sorusuyla birleştirir.",
          "Bu birliktelik hümanist yönelimi destekler, bütün inançları reddetme sonucu ise verilmez."
        ],
        "optionReasons": [
          "Metin yeniden yorumlamayı açıkça söyler.",
          "İnsan eğitimi bu sonucu tek başına içermez.",
          "Deneysel model tartışılmıyor.",
          "İki belirleyici vurgu birlikte verilmiştir.",
          "Eski kaynaklar etkin biçimde kullanılmaktadır."
        ],
        "commonError": "İnsanı konu alan her metni tek başına aynı akım sayma.",
        "check": "Seçilen görüşü metindeki iki ayrı ayrıntıyla gerekçelendir."
      }
    },
    {
      "passage": "Kurgu bir eski metnin A nüshasında bazı, B nüshasında bütün sözcüğü geçiyor. Okur yazarın hangi kapsamı savunduğunu anlamak için nüshaların dil ve aktarımını inceliyor.",
      "prompt": "Bu çalışmada hangi yöntemsel odak öne çıkar?",
      "options": [
        "Kaynak adına koşulsuz itaat",
        "Bir toplumun güvenlik sözleşmesi",
        "Bir fiziksel etkenin deneysel kontrolü",
        "Filolojik kaynak incelemesi",
        "Doğa olayının matematiksel hareket hesabı"
      ],
      "answer": 3,
      "hint": "Hangi farkın yorumun kapsamını değiştirdiğini belirt.",
      "explanation": "Bazı ve bütün farklı nicelemeler kurduğu için nüsha farkı görüşün ne dediğini etkiler. Bunun dil ve aktarım yoluyla araştırılması filolojik inceleme odağıdır. Metnin ne söylediğini saptamakla savının doğru oluşunu ayrı denetle.",
      "guidance": {
        "knowledge": [
          "Filoloji metnin dili, nüshaları ve tarihsel bağlamıyla doğru okunmasını araştırabilir."
        ],
        "strategy": "Hangi farkın yorumun kapsamını değiştirdiğini belirt.",
        "steps": [
          "Bazı ve bütün farklı nicelemeler kurduğu için nüsha farkı görüşün ne dediğini etkiler.",
          "Bunun dil ve aktarım yoluyla araştırılması filolojik inceleme odağıdır."
        ],
        "optionReasons": [
          "Okur metni sorgulanamaz kabul etmiyor.",
          "Siyasal kurumun kökeni tartışılmıyor.",
          "Nüshalar fizik deneyi değildir.",
          "Dil, nüsha ve aktarım farkı araştırılıyor.",
          "Böyle bir ölçüm ve hesap verilmemiştir."
        ],
        "commonError": "Eski metni bulmayı onun doğru ve tek yorumunu zaten kanıtlamak sanma.",
        "check": "Metnin ne söylediğini saptamakla savının doğru oluşunu ayrı denetle."
      }
    },
    {
      "passage": "Bir düşünür klasik kültüre ve insan eğitimine önem veriyor; aynı zamanda dinî inancını koruduğu açıkça belirtiliyor. İki tutum aynı kişide birlikte veriliyor.",
      "prompt": "Bu örnek hangi genellemeyi çürütür?",
      "options": [
        "Bazı hümanistler klasik metinleri okumuştur.",
        "İnsan eğitimi Rönesans’ta tartışılmıştır.",
        "Bir kişi hem eski metin okuyup hem yeni yorum geliştirebilir.",
        "Kültürel ilgi ile kişisel inanç ayrı veriler olabilir.",
        "Bütün Rönesans hümanistleri zorunlu olarak dini reddeder."
      ],
      "answer": 4,
      "hint": "Bütün ve zorunlu sözcüklerinin istediği kapsamı kontrol et.",
      "explanation": "Örnek kişi hümanist ilgiyi ve dinî kabulü birlikte taşıyor. Dolayısıyla her hümanistin dini reddetmesi gerektiği savı korunamaz; ters evrensel sav da buradan çıkmaz. Verilen kişiyi bütün tarihsel çeşitliliğin tek kalıbı yapmadığını kontrol et.",
      "guidance": {
        "knowledge": [
          "Evrensel bir iddia aynı kapsamdaki tek açık karşı durumla çelişir."
        ],
        "strategy": "Bütün ve zorunlu sözcüklerinin istediği kapsamı kontrol et.",
        "steps": [
          "Örnek kişi hümanist ilgiyi ve dinî kabulü birlikte taşıyor.",
          "Dolayısıyla her hümanistin dini reddetmesi gerektiği savı korunamaz; ters evrensel sav da buradan çıkmaz."
        ],
        "optionReasons": [
          "Örnek bu yargıyla çelişmez.",
          "Metin bu tartışmayı doğrular.",
          "Örnek bunu dışlamaz.",
          "Örnek bu ayrımı destekler.",
          "Verilen birlikte tutum bu evrensel savın karşı örneğidir."
        ],
        "commonError": "Karşı örnekten bütün hümanistler dindardır diye yeni genelleme üretme.",
        "check": "Verilen kişiyi bütün tarihsel çeşitliliğin tek kalıbı yapmadığını kontrol et."
      }
    },
    {
      "passage": "Bir tarihçi çeviri hareketleri, kent ekonomisi, matbaa ve siyasal himayenin Rönesans’taki dönüşümde birbirini etkilediğini söylüyor. Metin tek bir etkeni yeterli ilan etmiyor.",
      "prompt": "Hangi sonuç metnin kapsamını aşar?",
      "options": [
        "Matbaa tek başına bütün dönüşümün zorunlu ve yeterli nedenidir.",
        "Farklı etkenler birlikte ele alınabilir.",
        "Çeviriler kaynaklara erişimi artırabilir.",
        "Ekonomik koşullar düşünce üretimini etkileyebilir.",
        "Bir tarihsel sonuca birkaç süreç katkı sağlayabilir."
      ],
      "answer": 0,
      "hint": "Sayılan etkenleri koruyup hangisinin kanıtsız biçimde tekleştirildiğini bul.",
      "explanation": "Metin karşılıklı etkileşim anlatır; matbaayı tek başına yeterli sayan yeni bir dayanak sunmaz. Bu nedenle tek neden sonucu metnin söylediğinden daha güçlüdür. Bir etkenin önemini reddetmeden tekel iddiasını eleştirebilmelisin.",
      "guidance": {
        "knowledge": [
          "Katkı ve tek yeterli neden farklı iddialardır."
        ],
        "strategy": "Sayılan etkenleri koruyup hangisinin kanıtsız biçimde tekleştirildiğini bul.",
        "steps": [
          "Metin karşılıklı etkileşim anlatır; matbaayı tek başına yeterli sayan yeni bir dayanak sunmaz.",
          "Bu nedenle tek neden sonucu metnin söylediğinden daha güçlüdür."
        ],
        "optionReasons": [
          "Bir katkı diğer bütün koşulları gereksiz kılan tek neden yapılmıştır.",
          "Metin etkileşimi açıkça verir.",
          "Bu katkı çoklu etken açıklamasıyla bağdaşır.",
          "Metinde bu ilişki verilmiştir.",
          "Bu metnin temel açıklamasıdır."
        ],
        "commonError": "Önemli olmayı tek başına bütün sonucu zorunlu üretmekle özdeşleştirme.",
        "check": "Bir etkenin önemini reddetmeden tekel iddiasını eleştirebilmelisin."
      }
    },
    {
      "passage": "Bir akademi Aristoteles’in metnini yeni sorularla okuyup kimi görüşlerini kabul ediyor, kimilerine itiraz ediyor. Eski kaynaktan yararlanma ile yeni düşünce birlikte bulunuyor.",
      "prompt": "Bu örnek neyi gösterir?",
      "options": [
        "Geçmişe yönelmek özgün eleştiri ve yeniden yorumu dışlamaz.",
        "Klasik metin okumak bütün savları koşulsuz kabul etmektir.",
        "Yeni bir soru sormak hiçbir eski kaynak kullanmamayı gerektirir.",
        "Bir metin sadece tek çağda anlaşılabilir.",
        "Kaynağın adı her savın doğruluğunu garanti eder."
      ],
      "answer": 0,
      "hint": "Kaynakta neyin korunduğunu ve neyin değiştiğini ayrı yaz.",
      "explanation": "Akademi bazı savları kabul edip bazılarına itiraz ettiği için mekanik tekrar yapmıyor. Geçmiş birikim yeni soruya malzeme olabiliyor; özgün katkı bununla çelişmiyor. Metindeki kabul ve itirazın ikisini de açıklamana kat.",
      "guidance": {
        "knowledge": [
          "Yeniden değerlendirme kabul, karşılaştırma ve eleştiriyi birlikte içerebilir."
        ],
        "strategy": "Kaynakta neyin korunduğunu ve neyin değiştiğini ayrı yaz.",
        "steps": [
          "Akademi bazı savları kabul edip bazılarına itiraz ettiği için mekanik tekrar yapmıyor.",
          "Geçmiş birikim yeni soruya malzeme olabiliyor; özgün katkı bununla çelişmiyor."
        ],
        "optionReasons": [
          "Akademi kaynağı kullanırken bazı savları değiştirebiliyor.",
          "Verilen itirazlar bunu açıkça çürütür.",
          "Metinde ikisi birlikte bulunur.",
          "Örnek yeni sorularla okuma verir.",
          "Akademi gerekçeleri ayrıca incelemektedir."
        ],
        "commonError": "Süreklilik varsa hiçbir değişim yok diye düşünme.",
        "check": "Metindeki kabul ve itirazın ikisini de açıklamana kat."
      }
    },
    {
      "passage": "Bir okur bir savı yalnız ünlü bir antik yazarın söylediği için doğru sayıyor. Başka okur yazarın gerekçesini ve metnin farklı okumalarını inceliyor.",
      "prompt": "İkinci okurun ayırt edici tutumu hangisidir?",
      "options": [
        "Kaynak otoritesini gerekçe ve yorum denetimine açmak",
        "Eski bütün metinleri mutlaka yanlış saymak",
        "Her yorumu aynı derecede kanıtlı kabul etmek",
        "Bütün tarihsel bağlamı araştırmadan dışlamak",
        "Ünlü yazarın adını savın yerine koymak"
      ],
      "answer": 0,
      "hint": "İki okurun aynı savı hangi nedenle kabul etmeye açık olduğunu karşılaştır.",
      "explanation": "Birinci yol ünü yeterli gerekçe yapar; ikinci yol metin ve dayanağa yönelir. İkinci tutum kaynakları kullanırken bağımsız değerlendirmeye alan açar. Görüşün kabulü veya reddinin hangi somut gerekçeye bağlı olduğunu sor.",
      "guidance": {
        "knowledge": [
          "Eleştirel kaynak kullanımı adın yerine savı ve dayanağını inceler."
        ],
        "strategy": "İki okurun aynı savı hangi nedenle kabul etmeye açık olduğunu karşılaştır.",
        "steps": [
          "Birinci yol ünü yeterli gerekçe yapar; ikinci yol metin ve dayanağa yönelir.",
          "İkinci tutum kaynakları kullanırken bağımsız değerlendirmeye alan açar."
        ],
        "optionReasons": [
          "İddianın dayanağı kişiden ayrı incelenir.",
          "İnceleme kesin ret demek değildir.",
          "Kanıt karşılaştırması bunun tersine ayrım yapabilir.",
          "Metin farklı okumaları incelemektedir.",
          "Bu birinci okurun tutumudur."
        ],
        "commonError": "Otoriteyi sorgulamayı o kişinin her görüşünü reddetme zorunluluğu sanma.",
        "check": "Görüşün kabulü veya reddinin hangi somut gerekçeye bağlı olduğunu sor."
      }
    },
    {
      "passage": "Bir açıklamada Rönesans’ta insan ve doğa ilgisinin güçlendiği söyleniyor; Orta Çağ’daki bazı mantık ve din tartışmalarının etkisinin de sürdüğü belirtiliyor.",
      "prompt": "Hangi yorum uygundur?",
      "options": [
        "Düşünsel dönüşüm ile bazı süreklilikler birlikte bulunabilir.",
        "Bir çağ bittiğinde önceki bütün fikirler aynı gün yok olur.",
        "Orta Çağ’da hiçbir akıl yürütme yapılamaz.",
        "Modern dönemde herkes her baskıdan bütünüyle kurtulmuştur.",
        "Rönesans’ta hiçbir yeni soru sorulmamıştır."
      ],
      "answer": 0,
      "hint": "Değişen odağı ve devam eden etkiyi ayrı cümlelerde koru.",
      "explanation": "İnsan-doğa ilgisindeki artış dönüşümü, eski tartışmaların etkisi sürekliliği gösterir. Bunların birlikte bulunması mantıksal çelişki değildir; tam kopuş varsayımı eklenmemelidir. İki yönün de metinde açık kanıtını göster.",
      "guidance": {
        "knowledge": [
          "Dönem karşılaştırması eğilimleri gösterir; bütün insanları tek kalıp yapmaz."
        ],
        "strategy": "Değişen odağı ve devam eden etkiyi ayrı cümlelerde koru.",
        "steps": [
          "İnsan-doğa ilgisindeki artış dönüşümü, eski tartışmaların etkisi sürekliliği gösterir.",
          "Bunların birlikte bulunması mantıksal çelişki değildir; tam kopuş varsayımı eklenmemelidir."
        ],
        "optionReasons": [
          "Metin iki yönü açıkça birlikte vermektedir.",
          "Metindeki süreklilik bilgisiyle çelişir.",
          "Mantık tartışmalarının varlığı bunu dışlar.",
          "Metin tek tek insanların koşulları hakkında böyle bilgi vermez.",
          "Metinde yeni ilgi ve dönüşüm açıkça verilmiştir."
        ],
        "commonError": "Dönem adını her kişinin bütün inanç ve yönteminin kesin özeti sayma.",
        "check": "İki yönün de metinde açık kanıtını göster."
      }
    },
    {
      "passage": "Eski bir kitabın daha çok nüshası basılıyor; yeni okurlar farklı yorumları karşılaştırabiliyor. Kitaptaki her savın doğru olduğu veya herkesin aynı yoruma vardığı belirtilmiyor.",
      "prompt": "Basımın bu örnekteki doğrudan katkısı nedir?",
      "options": [
        "Kitaptaki bütün savları kendiliğinden ispatlaması",
        "Bütün okurları zorunlu aynı inanca bağlaması",
        "Metne erişim ve yorumların dolaşım imkânını artırması",
        "Geçmiş bütün kaynakların yok olması",
        "Yorumların kanıt gerektirmemesini sağlaması"
      ],
      "answer": 2,
      "hint": "Doğrudan verilen yeni imkânı daha güçlü sonuçlardan ayır.",
      "explanation": "Daha çok nüsha yeni okurların metni incelemesini ve yorumları karşılaştırmasını sağlar. Bu erişim artışı savların doğruluğunu veya tek ortak yorumu otomatik kanıtlamaz. Cevabında erişim ile içerik doğruluğunu ayrı tuttuğunu denetle.",
      "guidance": {
        "knowledge": [
          "Dolaşımın artması erişim koşulunu değiştirir; doğruluk ve uzlaşma ayrıca incelenir."
        ],
        "strategy": "Doğrudan verilen yeni imkânı daha güçlü sonuçlardan ayır.",
        "steps": [
          "Daha çok nüsha yeni okurların metni incelemesini ve yorumları karşılaştırmasını sağlar.",
          "Bu erişim artışı savların doğruluğunu veya tek ortak yorumu otomatik kanıtlamaz."
        ],
        "optionReasons": [
          "Basılma sayısı doğruluk ispatı değildir.",
          "Böyle bir birlik verilmemiştir.",
          "Metin yeni okur ve karşılaştırma olanağını açık verir.",
          "Kitabın çoğalması bunun tersidir.",
          "Karşılaştırma kanıt denetimine imkân verir, onu kaldırmaz."
        ],
        "commonError": "Çok yayılmayı doğru olmanın eş anlamı yapma.",
        "check": "Cevabında erişim ile içerik doğruluğunu ayrı tuttuğunu denetle."
      }
    },
    {
      "passage": "Bir ressam klasik biçimlerden esinlenip kendi çağındaki insan deneyimini yeni bir düzenle anlatıyor. Eser eski malzemeyi kullanırken özgün bir yorum da içeriyor.",
      "prompt": "Bu durum için hangi değerlendirme desteklenir?",
      "options": [
        "Esinlenen her eser zorunlu bire bir kopyadır.",
        "Klasik esin ile bireysel yaratıcılık birlikte bulunabilir.",
        "Yeni yorum varsa geçmişle hiçbir ilişki bulunamaz.",
        "Sanat eseri tek başına bütün inanç tutumlarını belirler.",
        "Bir çağın bütün eserleri aynı düzende üretilir."
      ],
      "answer": 1,
      "hint": "Esin alınan malzemeyle yeni kurulan ilişkiyi ayır.",
      "explanation": "Metin klasik biçimi başlangıç malzemesi, çağın deneyimine ilişkin düzeni yeni yorum olarak verir. İkisi birlikte bulunabildiği için ne mekanik kopya ne tam ilişkisizlik sonucu doğar. Hem geçmiş ilişkiyi hem yeni katkıyı açıklamanda koru.",
      "guidance": {
        "knowledge": [
          "Özgünlük ile hiçbir kaynaktan etkilenmemeyi özdeşleştirmemek gerekir."
        ],
        "strategy": "Esin alınan malzemeyle yeni kurulan ilişkiyi ayır.",
        "steps": [
          "Metin klasik biçimi başlangıç malzemesi, çağın deneyimine ilişkin düzeni yeni yorum olarak verir.",
          "İkisi birlikte bulunabildiği için ne mekanik kopya ne tam ilişkisizlik sonucu doğar."
        ],
        "optionReasons": [
          "Özgün düzen bilgisi bunu karşılamaz.",
          "Kaynak kullanımı yeni kuruluşu mantıken dışlamaz.",
          "Klasik esin açıkça verilmiştir.",
          "Bu konuda veri yoktur.",
          "Tek örnek böyle evrensel sav kurmaz."
        ],
        "commonError": "Bir tek eserden bütün dönemin bütün eserlerine hüküm yayma.",
        "check": "Hem geçmiş ilişkiyi hem yeni katkıyı açıklamanda koru."
      }
    },
    {
      "passage": "Bir metin doğaya ilişkin gözlemi, klasik metinlerin dil incelemesini ve insanın eğitimini üç farklı etkinlik olarak anlatıyor. Soru özellikle filolojik çalışmayı istiyor.",
      "prompt": "Hangi etkinlik sorunun istediğini doğrudan karşılar?",
      "options": [
        "Bir cismin düşme süresini kontrollü ölçmek",
        "Bir yöneticinin güvenlik yetkisini sözleşmeyle açıklamak",
        "Bir eserin güzel olup olmadığını beğeni ölçütüyle tartışmak",
        "Nüsha farkları ve tarihsel sözcük anlamlarını incelemek",
        "Bir astronomi modelinin matematiksel öngörüsünü hesaplamak"
      ],
      "answer": 3,
      "hint": "Etkinliğin hangi nesneyi hangi yöntemle incelediğini eşleştir.",
      "explanation": "Nüsha ve sözcük anlamı araştırması doğrudan metnin nasıl okunacağına ilişkindir. Diğer etkinlikler önemli olsa da başka problem ve yöntemleri temsil eder; aynı dönemde olmaları eş anlamlılık yaratmaz. Cevabı metin-dil-nüsha üçlüsüne bağlayan gerçek işlevi göster.",
      "guidance": {
        "knowledge": [
          "Filoloji belirli metnin dili, nüshası ve tarihsel anlamına yönelir."
        ],
        "strategy": "Etkinliğin hangi nesneyi hangi yöntemle incelediğini eşleştir.",
        "steps": [
          "Nüsha ve sözcük anlamı araştırması doğrudan metnin nasıl okunacağına ilişkindir.",
          "Diğer etkinlikler önemli olsa da başka problem ve yöntemleri temsil eder; aynı dönemde olmaları eş anlamlılık yaratmaz."
        ],
        "optionReasons": [
          "Bilimsel sınama etkinliğidir, dilsel nüsha çalışması değildir.",
          "Hukuk-siyaset problemidir.",
          "Bu estetik değerlendirmedir; metin dili ve nüsha farkını incelemek değildir.",
          "Metnin doğru okunmasıyla ilgili dilsel kaynak incelemesidir.",
          "Doğa açıklamasının hesabıdır."
        ],
        "commonError": "Rönesans’a ait her çalışmayı tek yöntem adıyla etiketleme.",
        "check": "Cevabı metin-dil-nüsha üçlüsüne bağlayan gerçek işlevi göster."
      }
    }
  ],
  [
    {
      "passage": "Bir araştırmacı ağır cisimlerin daha hızlı düştüğünü söyleyen eski savı yalnız yazarının ünü nedeniyle kabul etmiyor. Ölçüm yapıp savın öngörüsüyle sonuçları karşılaştırıyor.",
      "prompt": "Araştırmacının belirleyici yöntemsel tutumu hangisidir?",
      "options": [
        "Ünlü olan her düşünürü zorunlu yanlış saymak",
        "Her ölçümü bütün doğanın kesin ispatı saymak",
        "Bütün kavramları deneyden önce reddetmek",
        "Gözlem yerine sadece metnin yaşını kullanmak",
        "Otoritenin savını gözlem ve sınamaya açmak"
      ],
      "answer": 4,
      "hint": "Kabul ölçütünün isimden hangi denetim yoluna geçtiğini göster.",
      "explanation": "Araştırmacı eski savı sırf eski olduğu için reddetmiyor; öngörüsünü ölçüme açıyor. Bu değişim otorite yerine sınama dayanağını öne çıkarır. Ölçülen düşme sonucunun hangi eski öngörüyle karşılaştırıldığını bul; yazarın ününü bu karşılaştırmanın yerine koyma.",
      "guidance": {
        "knowledge": [
          "Modern bilimde savın sınanabilir sonucu ve gözlem ilişkisi önemlidir."
        ],
        "strategy": "Kabul ölçütünün isimden hangi denetim yoluna geçtiğini göster.",
        "steps": [
          "Araştırmacı eski savı sırf eski olduğu için reddetmiyor; öngörüsünü ölçüme açıyor.",
          "Bu değişim otorite yerine sınama dayanağını öne çıkarır."
        ],
        "optionReasons": [
          "Kişi değil sav sınanıyor.",
          "Tek çalışma böyle kapsam vermiyor.",
          "Ölçüm belirli bir savı inceliyor.",
          "Verilen tutum bunun tersidir.",
          "Savın dayanağı kişiden ayrılarak denetleniyor."
        ],
        "commonError": "Eski savı sınamayı bütün eski düşünürleri peşinen reddetmek sanma.",
        "check": "Ölçülen düşme sonucunun hangi eski öngörüyle karşılaştırıldığını bul; yazarın ününü bu karşılaştırmanın yerine koyma."
      }
    },
    {
      "passage": "Bacon ile ilişkilendirilen bir yöntem tasviri, az sayıdaki gözlemi hemen bütün doğaya yaymak yerine düzenli gözlem ve olumsuz örneklerin araştırılmasını ister.",
      "prompt": "Bu tasvirin temel amacı nedir?",
      "options": [
        "Bir örnekten her koşula kesin hüküm vermek",
        "Tümdengelimin hiçbir düşünmede kullanılamayacağını kanıtlamak",
        "Acele genellemenin yerine düzenli deneyim araştırması koymak",
        "Kaynak kişinin ününü gözlemden üstün tutmak",
        "Hiçbir yöntem kullanmadan tesadüfen karar vermek"
      ],
      "answer": 2,
      "hint": "Genellemeye karşı örnek aramanın neyi sınırladığını sor.",
      "explanation": "Az gözlemden geniş sonuç çıkarmak hatalı olabilir; olumsuz örnek bu geçişi denetler. Tasvir deneyimi düzenler, her tek gözlemi kesin evrensel kanıt yapmaz. Az gözlemden bütün doğaya geçişte hangi koşulların incelenmediğini ve olumsuz örneğin hangi savı sınırladığını göster.",
      "guidance": {
        "knowledge": [
          "Bacon deneyimci araştırma ve tümevarım tartışmasıyla ilişkilidir."
        ],
        "strategy": "Genellemeye karşı örnek aramanın neyi sınırladığını sor.",
        "steps": [
          "Az gözlemden geniş sonuç çıkarmak hatalı olabilir; olumsuz örnek bu geçişi denetler.",
          "Tasvir deneyimi düzenler, her tek gözlemi kesin evrensel kanıt yapmaz."
        ],
        "optionReasons": [
          "Metin bu aceleciliğe karşıdır.",
          "Böyle evrensel yasak verilmemiştir.",
          "Olumsuz durumlar genellemenin kapsamını denetler.",
          "Tasvir gözleme yönelir.",
          "Düzenli inceleme açıkça istenmiştir."
        ],
        "commonError": "Bir olumsuz örnek aramayı her türlü akıl yürütmenin yasaklanması sayma.",
        "check": "Az gözlemden bütün doğaya geçişte hangi koşulların incelenmediğini ve olumsuz örneğin hangi savı sınırladığını göster."
      }
    },
    {
      "passage": "Bir kişi her yeni bulguyu kendi grubunun eskiden benimsediği açıklamaya uyduruyor. Bacon’ın putlar eleştirisiyle okunan bu örnekte alışılmış kabuller araştırmayı yönlendiriyor.",
      "prompt": "En uygun değerlendirme hangisidir?",
      "options": [
        "Bütün duyular her durumda işe yaramaz.",
        "Ön yargılar araştırmanın yorumunu etkileyebilir.",
        "Bir gruba ait olmak her savı doğru yapar.",
        "Deneyim her türlü zihinsel etkiden zaten bağımsızdır.",
        "Her gözlem mutlaka aynı sonuçla biter."
      ],
      "answer": 1,
      "hint": "Bulguyla eski kabul arasındaki ilişkinin yönünü incele.",
      "explanation": "Kişi kabulünü veriye göre denetlemek yerine veriyi kabulüne uyduruyor. Bu durum zihinsel kalıbın araştırmayı bozabileceği eleştirisini örnekler. Bulgular eski kabulü değiştirebiliyor mu, yoksa her bulgu baştan aynı kabule mi uyduruluyor, metinden denetle.",
      "guidance": {
        "knowledge": [
          "Bacon’ın putlar eleştirisi bilmeye karışan alışkanlık ve ön yargıları sorgular."
        ],
        "strategy": "Bulguyla eski kabul arasındaki ilişkinin yönünü incele.",
        "steps": [
          "Kişi kabulünü veriye göre denetlemek yerine veriyi kabulüne uyduruyor.",
          "Bu durum zihinsel kalıbın araştırmayı bozabileceği eleştirisini örnekler."
        ],
        "optionReasons": [
          "Örnek böyle genel ret gerektirmez.",
          "Veri eski kabulün kalıbına zorla yerleştirilmektedir.",
          "Eleştirilen tam da koşulsuz kalıptır.",
          "Örnek yorum etkisini gösterir.",
          "Böyle bir zorunluluk verilmemiştir."
        ],
        "commonError": "Kendi grubunun kabulünü her yeni veriyi zorla içine yerleştiren değişmez ölçüt yapma.",
        "check": "Bulgular eski kabulü değiştirebiliyor mu, yoksa her bulgu baştan aynı kabule mi uyduruluyor, metinden denetle."
      }
    },
    {
      "passage": "Descartes’ın yöntemsel kuşkusu anlatılırken duyuların bazen yanıltabildiği ve matematiksel kabullerin bile geçici olarak sorgulandığı söyleniyor. Amaç kuşkuda sonsuza dek kalmak değil sağlam başlangıç aramaktır.",
      "prompt": "Bu kuşkunun işlevi hangisidir?",
      "options": [
        "Her türlü bilginin imkânsız olduğunu nihai sonuç ilan etmek",
        "Kesinliğe ulaşmak için kabulleri yöntemli biçimde denetlemek",
        "Gündelik yaşamda hiçbir karar verilemeyeceğini emretmek",
        "Duyusal her savın mutlaka yanlış olduğunu kanıtlamak",
        "Bir otoritenin bütün savlarını incelemeden almak"
      ],
      "answer": 1,
      "hint": "Kuşkunun amaç mı araç mı olduğunu metinden belirle.",
      "explanation": "Kabuller geçici olarak sorgulanır; amaç dayanıklı bir temel bulmaktır. Bu nedenle verilen tutum nihai bilgisizlik hükmü değil yöntemli denetimdir. Kuşkunun sonunda aranan şeyin sağlam başlangıç olduğunu açık cümleden bul; yöntemi nihai sonuç diye yazma.",
      "guidance": {
        "knowledge": [
          "Yöntemsel kuşku ile bilginin imkânsızlığını savunan nihai kuşkuculuk aynı değildir."
        ],
        "strategy": "Kuşkunun amaç mı araç mı olduğunu metinden belirle.",
        "steps": [
          "Kabuller geçici olarak sorgulanır; amaç dayanıklı bir temel bulmaktır.",
          "Bu nedenle verilen tutum nihai bilgisizlik hükmü değil yöntemli denetimdir."
        ],
        "optionReasons": [
          "Metin sağlam başlangıç arayışını açıkça verir.",
          "Kuşku araştırmada araç olarak kullanılıyor.",
          "Yöntem tasviri böyle hayat buyruğu değildir.",
          "Bazen yanılma ile her zaman yanlış farklıdır.",
          "Bu tutum sorgulamanın tersidir."
        ],
        "commonError": "Geçici yöntemsel kuşkuyu bilginin imkânsızlığına ilişkin son hükümle karıştırma.",
        "check": "Kuşkunun sonunda aranan şeyin sağlam başlangıç olduğunu açık cümleden bul; yöntemi nihai sonuç diye yazma."
      }
    },
    {
      "passage": "Bir kişi şu anda bir ağaç düşündüğünden kuşku duyamıyor; ağacın dış dünyada gerçekten bulunup bulunmadığı ise henüz gösterilmemiştir.",
      "prompt": "Cogito çizgisinde hangi ilk sonuç bu bağlamla uyumludur?",
      "options": [
        "Düşünülen ağacın dış dünyada kesin varlığı",
        "Şu anda düşünen öznenin varlığı",
        "Düşünülen her nesnenin kusursuz oluşu",
        "Bütün duyusal ayrıntıların kesin doğruluğu",
        "Düşüncenin hiçbir özneyle ilişkili olmaması"
      ],
      "answer": 1,
      "hint": "Edimi yapan ile edimin içeriğindeki nesneyi ayır.",
      "explanation": "Verilen kesinlik şu an düşünmenin gerçekleşmesidir. Bundan öznenin varlığına geçilir; dış ağacın varlığı aynı adımda kanıtlanmaz. Düşünme edimini yapan özne için dayanağı göster; ağacın dış varlığı için ayrıca kayıt verilmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Düşünüyorum geçişinde ilk güvence düşünülen her nesneye değil düşünen özneye yönelir."
        ],
        "strategy": "Edimi yapan ile edimin içeriğindeki nesneyi ayır.",
        "steps": [
          "Verilen kesinlik şu an düşünmenin gerçekleşmesidir.",
          "Bundan öznenin varlığına geçilir; dış ağacın varlığı aynı adımda kanıtlanmaz."
        ],
        "optionReasons": [
          "Nesnenin dış varlığı ek gerekçe ister.",
          "Düşünme edimi onu yapan öznenin varlığına dayanak olur.",
          "Böyle nitelik düşünme ediminden çıkmaz.",
          "Bu ayrıntılar sorgulanabilir.",
          "Cogito’nun geçişi özneyle ilişki kurar."
        ],
        "commonError": "Şu anda düşünmenin kesinliğini düşünülen her nesnenin dış varlığına yayma.",
        "check": "Düşünme edimini yapan özne için dayanağı göster; ağacın dış varlığı için ayrıca kayıt verilmediğini kontrol et."
      }
    },
    {
      "passage": "Bir düşünür bir problemin karmaşık bütününü küçük parçalara ayırıp basit olanlardan başlayarak sırayla ilerlemeyi ve son olarak hiçbir adımı atlamadığını kontrol etmeyi öneriyor.",
      "prompt": "Bu öneride hangi yöntemsel düzen öne çıkar?",
      "options": [
        "Çözümleme, sıralı ilerleme ve sayıp denetleme",
        "Sadece çoğunluğun kararını tekrar etme",
        "Karmaşık sonucun bütün basit adımlardan önce kabulü",
        "Gerekçeleri kontrol etmeyi yasaklama",
        "Her farklı görüşü aynı anda doğru sayma"
      ],
      "answer": 0,
      "hint": "Metindeki işlemleri sırasıyla kendi çözüm yoluna eşleştir.",
      "explanation": "Bölme karmaşıklığı azaltır; basitten ilerleme geçişleri kurar; sayma eksik adımı arar. Bu düzen sonuç yerine sürecin açıkça denetlenmesini sağlar. Metindeki bölme, sıra ve son kontrol işlemlerini tek tek eşleştir; her adımın hangi işi yaptığını açıkla.",
      "guidance": {
        "knowledge": [
          "Descartes’ın yöntem tasviri açıklık, çözümleme, sıra ve sayma denetimiyle ilişkilidir."
        ],
        "strategy": "Metindeki işlemleri sırasıyla kendi çözüm yoluna eşleştir.",
        "steps": [
          "Bölme karmaşıklığı azaltır; basitten ilerleme geçişleri kurar; sayma eksik adımı arar.",
          "Bu düzen sonuç yerine sürecin açıkça denetlenmesini sağlar."
        ],
        "optionReasons": [
          "Parçalara ayırma ve son kontrol birlikte verilmiştir.",
          "Toplumsal oy ölçütü yoktur.",
          "Basitten başlama bunun tersidir.",
          "Son denetim açıkça istenmiştir.",
          "Böyle doğruluk ilkesi verilmez."
        ],
        "commonError": "Basitten ilerleme yöntemini karmaşık sonucu baştan doğru kabul etme gibi okuma.",
        "check": "Metindeki bölme, sıra ve son kontrol işlemlerini tek tek eşleştir; her adımın hangi işi yaptığını açıkla."
      }
    },
    {
      "passage": "Descartes’la ilişkilendirilen bir pasaj, düşünen töz ile uzamlı tözü iki farklı temel nitelikle ele alır. İnsan örneğinde zihin ve bedenin ilişkisi ayrıca sorun olarak ortaya çıkar.",
      "prompt": "Bu pasaj hangi yaklaşımı tanıtır?",
      "options": [
        "Zihin ve maddeyi ayıran töz düalizmi",
        "Tek tözün sonsuz nitelikleri",
        "Zihin ve bedenin tek maddi temele indirgenmesi",
        "Birbirinden bağımsız çok sayıda basit töz kabulü",
        "Evrenin zorunlu iki tanrı tarafından yönetilmesi"
      ],
      "answer": 0,
      "hint": "Düşünen ve uzamlı niteliklerinin neyi ayırdığını sor.",
      "explanation": "Pasaj düşünme ve uzamı iki temel töz niteliği olarak ayırır. Bu zihin-madde düalizmidir; tanrı sayısına ilişkin yeni hüküm kurulmaz. Düşünme ile uzamın hangi iki temel niteliği verdiğini belirt; monizm ve monadların neden aynı ayrım olmadığını denetle.",
      "guidance": {
        "knowledge": [
          "Düalizmin hangi alanda hangi iki temeli ayırdığı pasajdan belirlenir."
        ],
        "strategy": "Düşünen ve uzamlı niteliklerinin neyi ayırdığını sor.",
        "steps": [
          "Pasaj düşünme ve uzamı iki temel töz niteliği olarak ayırır.",
          "Bu zihin-madde düalizmidir; tanrı sayısına ilişkin yeni hüküm kurulmaz."
        ],
        "optionReasons": [
          "İki farklı temel nitelik ve töz vurgulanıyor.",
          "Bu Spinozacı çizgiye yakındır, burada iki töz ayrımı var.",
          "Bu maddeci tek temel yorumudur; metindeki iki töz ayrımını karşılamaz.",
          "Bu çoklu töz yaklaşımıdır; düşünme ve uzamı iki temel olarak ayıran pasaj değildir.",
          "İki töz otomatik iki tanrı demek değildir."
        ],
        "commonError": "İki töz ayrımını tanrı sayısı veya çok sayıda basit töz öğretisiyle karıştırma.",
        "check": "Düşünme ile uzamın hangi iki temel niteliği verdiğini belirt; monizm ve monadların neden aynı ayrım olmadığını denetle."
      }
    },
    {
      "passage": "Spinoza’yı tanıtan metin, bütün var olanları tek sonsuz tözün görünüşleri olarak ele alıyor. Tanrı veya doğa ifadesi bu birliğe bağlanıyor.",
      "prompt": "Metnin temel varlık kabulü hangisidir?",
      "options": [
        "Sonsuz sayıda birbirinden bağımsız töz",
        "Zihin ve bedenin iki bağımsız temel töz oluşu",
        "Hiçbir varlığın bulunmayışı",
        "Tözün birliği",
        "Var olanların yalnız zihindeki algı içerikleri sayılması"
      ],
      "answer": 3,
      "hint": "Tek ve bağımsız töz ifadelerinin kapsamını denetle.",
      "explanation": "Çeşitli var olanlar ayrı bağımsız tözler değil aynı temel içindeki görünüşlerdir. Bu nedenle metin tözün birliğini savunur; çeşitliliği yok sayması gerekmez. Tek sonsuz töz ifadesini bul; çeşitli görünüşlerin ayrı bağımsız tözler olarak verilmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Spinoza’nın töz monizmi varlığı tek bir temel üzerinden düşünür."
        ],
        "strategy": "Tek ve bağımsız töz ifadelerinin kapsamını denetle.",
        "steps": [
          "Çeşitli var olanlar ayrı bağımsız tözler değil aynı temel içindeki görünüşlerdir.",
          "Bu nedenle metin tözün birliğini savunur; çeşitliliği yok sayması gerekmez."
        ],
        "optionReasons": [
          "Tek töz vurgusuyla çelişir.",
          "Bu pasaj iki tözü savunmaz.",
          "Tek töz kabulü yokluk değildir.",
          "Ayrı bağımsız tözler yerine tek töz temeli veriliyor.",
          "Bu farklı bir ontolojik yönelimdir; metin tek sonsuz tözü savunur."
        ],
        "commonError": "Var olanların çeşitliliğini birbirinden bağımsız çok sayıda töz kabulü sanma.",
        "check": "Tek sonsuz töz ifadesini bul; çeşitli görünüşlerin ayrı bağımsız tözler olarak verilmediğini kontrol et."
      }
    },
    {
      "passage": "Spinoza’yla ilişkilendirilen bir açıklama, insanın etkileyen nedenleri anlamasıyla daha etkin olabileceğini; doğadaki zorunlu bağların ise ortadan kalkmayacağını belirtir.",
      "prompt": "Bu açıklamaya uygun özgürlük yorumu hangisidir?",
      "options": [
        "Hiçbir neden olmadan rastgele karar vermek",
        "Doğadaki bütün ilişkileri iradeyle yok etmek",
        "Zorunluluğu anlayıp kendi doğasıyla daha etkin davranmak",
        "Her arzuya edilgin biçimde kapılmak",
        "Özgürlüğü sadece dış engel yokluğuyla açıklamak"
      ],
      "answer": 2,
      "hint": "Nedenlerin sürdüğü bilgisini koruyarak insanın hangi yönünün değiştiğini bul.",
      "explanation": "Değişen, kişinin nedenleri kavrayıp daha etkin oluşudur. Zorunlu bağların kalktığı veya keyfî nedensizlik sonucu verilmez. Metinde zorunlu bağlar sürerken değişenin nedenleri anlama ve etkinlik olduğunu iki ayrı ayrıntıyla göster.",
      "guidance": {
        "knowledge": [
          "Spinoza’da özgürlük doğanın zorunluluğunu silmekle özdeş değildir."
        ],
        "strategy": "Nedenlerin sürdüğü bilgisini koruyarak insanın hangi yönünün değiştiğini bul.",
        "steps": [
          "Değişen, kişinin nedenleri kavrayıp daha etkin oluşudur.",
          "Zorunlu bağların kalktığı veya keyfî nedensizlik sonucu verilmez."
        ],
        "optionReasons": [
          "Metin nedensiz keyfîliği savunmaz.",
          "Zorunluluğun sürdüğü açıkça belirtilir.",
          "Anlama ve etkinlik zorunluluk içinde ele alınır.",
          "Etkin olma vurgusunu tersine çevirir.",
          "Pasaj iç nedenleri anlama ve etkinliği de içerir; yalnız dış engel ölçütü bunu karşılamaz."
        ],
        "commonError": "Özgürlüğü doğadaki bütün nedenleri silen keyfîlik olarak tanımlama.",
        "check": "Metinde zorunlu bağlar sürerken değişenin nedenleri anlama ve etkinlik olduğunu iki ayrı ayrıntıyla göster."
      }
    },
    {
      "passage": "Leibniz’i tanıtan bir metin, gerçekliği birbirinden farklı basit tözler üzerinden açıklar; bunları maddi cismin parçaları gibi bölünebilir şeyler saymaz.",
      "prompt": "Bu basit tözlerin adı nedir?",
      "options": [
        "Tabula rasa",
        "Monad",
        "İdola",
        "Cogito",
        "Kategorik buyruk"
      ],
      "answer": 1,
      "hint": "Adı tek başına değil basit töz tanımıyla eşleştir.",
      "explanation": "Pasaj bölünemez basit tözleri Leibniz’e bağlamaktadır. Bu tanım monadı karşılar; diğer terimler farklı problemleri adlandırır. Basit, bölünemez töz tanımını seçtiğin adla eşleştir; diğer adların hangi farklı problemleri temsil ettiğini denetle.",
      "guidance": {
        "knowledge": [
          "Monad kavramı Leibniz’in çoklu basit töz anlayışında kullanılır."
        ],
        "strategy": "Adı tek başına değil basit töz tanımıyla eşleştir.",
        "steps": [
          "Pasaj bölünemez basit tözleri Leibniz’e bağlamaktadır.",
          "Bu tanım monadı karşılar; diğer terimler farklı problemleri adlandırır."
        ],
        "optionReasons": [
          "Locke’un doğuştan fikir eleştirisiyle ilişkilidir.",
          "Leibniz’in basit töz kavramıdır.",
          "Bacon’ın ön yargı eleştirisinde kullanılır.",
          "Düşünme kesinliğiyle ilişkilidir.",
          "Kant’ın ahlak düşüncesiyle ilişkilidir."
        ],
        "commonError": "Leibniz’in kavramını yalnız tanıdık terimin sesine göre seçme.",
        "check": "Basit, bölünemez töz tanımını seçtiğin adla eşleştir; diğer adların hangi farklı problemleri temsil ettiğini denetle."
      }
    },
    {
      "passage": "Locke’u tanıtan pasaj, zihnin temel içeriklerinin deneyimden geldiğini; duyum ve zihnin kendi işlemlerine yönelmesinin iki kaynak olduğunu söyler.",
      "prompt": "İki kaynak hangi eşleştirmeyle verilir?",
      "options": [
        "Yalnız doğuştan gelen hazır bütün fikirler",
        "Sadece hiçbir işlem yapmayan pasif kayıt",
        "Dış duyum ve iç deneyim",
        "Bütün fikirlerin sadece otorite tarafından yüklenmesi",
        "İç deneyimi duyumlardan tamamen kopuk doğuştan fikir kaynağı sayma"
      ],
      "answer": 2,
      "hint": "Dış nesneye yönelen kaynak ile zihnin işlemini konu alan kaynağı ayır.",
      "explanation": "Duyum dış deneyime, düşünüm zihinsel işlemlerin iç deneyimine karşılık gelir. Deneyimcilik zihnin her bakımdan işlemsiz veya pasif olduğu anlamına gelmez. Dış nesneye ilişkin duyumla zihnin kendi işlemine ilişkin düşünümü ayrı örnekleyerek iki deneyim yolunu kontrol et.",
      "guidance": {
        "knowledge": [
          "Locke deneyimciliğinde duyum ve düşünüm ayrımı vardır."
        ],
        "strategy": "Dış nesneye yönelen kaynak ile zihnin işlemini konu alan kaynağı ayır.",
        "steps": [
          "Duyum dış deneyime, düşünüm zihinsel işlemlerin iç deneyimine karşılık gelir.",
          "Deneyimcilik zihnin her bakımdan işlemsiz veya pasif olduğu anlamına gelmez."
        ],
        "optionReasons": [
          "Pasaj deneyim kaynaklarını savunur.",
          "İç işlemler açıkça anılmıştır.",
          "Dış nesnelerle temas ve zihinsel işlemlere yöneliş ayrılır.",
          "Böyle tek kaynak verilmez.",
          "Düşünüm deneyim yoludur; içte oluşu bütün fikirlerin hazır doğuştan geldiği anlamına gelmez."
        ],
        "commonError": "İç deneyim sözcüğündeki iç oluşu hazır doğuştan fikir kaynağı diye yorumlama.",
        "check": "Dış nesneye ilişkin duyumla zihnin kendi işlemine ilişkin düşünümü ayrı örnekleyerek iki deneyim yolunu kontrol et."
      }
    },
    {
      "passage": "Locke’u ele alan bir örnekte çocuk renk ve tat gibi basit içerikleri deneyimle edinir; daha sonra bunları birleştirip karmaşık bir nesne tasarımı kurar.",
      "prompt": "Örnek hangi noktayı vurgular?",
      "options": [
        "Zihnin bütün fikirleri hazır doğuştan bulduğunu",
        "Deneyim kökenli içerik üzerinde zihinsel birleştirme yapılabildiğini",
        "Deneyimciliğin hiçbir zihinsel işleme izin vermediğini",
        "Birleşen her tasarımın dış dünyada zorunlu bulunduğunu",
        "Basit içerik ile bileşik tasarımın aynı işlemle hazır edinildiğini"
      ],
      "answer": 1,
      "hint": "Örnekte hangi içeriğin edinildiğini, hangi işlemin yapıldığını belirt.",
      "explanation": "Renk ve tat deneyimle edinilir; zihin bunları bir tasarımda birleştirir. Bu ayrım deneyimcilik ile etkin zihinsel işlemin birlikte bulunmasını açıklar. Renk ve tadın edinilmesini, bunların daha sonra bir tasarımda birleştirilmesinden ayrı göster.",
      "guidance": {
        "knowledge": [
          "İçeriğin kaynağı ile onun üzerinde yapılan işlem farklı sorulardır."
        ],
        "strategy": "Örnekte hangi içeriğin edinildiğini, hangi işlemin yapıldığını belirt.",
        "steps": [
          "Renk ve tat deneyimle edinilir; zihin bunları bir tasarımda birleştirir.",
          "Bu ayrım deneyimcilik ile etkin zihinsel işlemin birlikte bulunmasını açıklar."
        ],
        "optionReasons": [
          "Örnek edinme ve birleştirme süreci verir.",
          "Kaynak deneyimdir, işlem de vardır.",
          "Birleştirme açıkça anlatılmıştır.",
          "Kurma işlemi dış varlık ispatı değildir.",
          "Örnekte temel içeriğin edinilmesi ve sonra birleştirme işlemi ayrılmıştır."
        ],
        "commonError": "Deneyimden gelen içeriği zihnin hiçbir işlem yapamadığı pasif kayıtla özdeşleştirme.",
        "check": "Renk ve tadın edinilmesini, bunların daha sonra bir tasarımda birleştirilmesinden ayrı göster."
      }
    },
    {
      "passage": "Hobbes’u tanıtan bir açıklamada, insanların güvenliğini sağlayacak ortak yaptırım gücü olmadığında anlaşmalara güvenin zayıfladığı; egemen gücün barış için gerekli görüldüğü belirtilir.",
      "prompt": "Burada hangi problem ele alınır?",
      "options": [
        "Yönetimin yetkisini bireyin devredilemez haklarıyla sınırlama",
        "Devletin adaletini her sınıfın kendi görevini yapmasıyla açıklama",
        "Siyasal otoritenin güvenlik ve sözleşmeyle gerekçelendirilmesi",
        "Ortak yarara yönelen genel iradeyi bireysel istek toplamından ayırma",
        "Bütün egemenlerin hiçbir gerekçe olmadan doğuştan haklı sayılması"
      ],
      "answer": 2,
      "hint": "Hangi sorun için hangi kurumun çözüm olarak sunulduğunu bul.",
      "explanation": "Sorun güvenlik ve sözleşmeye güven; sunulan çözüm ortak egemen güçtür. Bu siyasal otoritenin gerekçesidir; önerinin her ayrıntısının eleştiriden muaf olduğu sonucu çıkmaz. Sorunu güvenlik ve anlaşmaya güven, çözümü ortak yaptırım olarak yaz; hak sınırı ve genel irade seçenekleriyle farkını denetle.",
      "guidance": {
        "knowledge": [
          "Hobbes’un siyaset düşüncesinde doğa durumu, sözleşme ve ortak yaptırım önemli kavramlardır."
        ],
        "strategy": "Hangi sorun için hangi kurumun çözüm olarak sunulduğunu bul.",
        "steps": [
          "Sorun güvenlik ve sözleşmeye güven; sunulan çözüm ortak egemen güçtür.",
          "Bu siyasal otoritenin gerekçesidir; önerinin her ayrıntısının eleştiriden muaf olduğu sonucu çıkmaz."
        ],
        "optionReasons": [
          "Bu başka bir siyasal gerekçe odağıdır; pasaj ortak yaptırımın barış işlevine yönelir.",
          "Bu Platon’la ilişkilendirilen farklı bir adalet açıklamasıdır; pasajdaki sözleşme-güvenlik problemi değildir.",
          "Ortak güç ile barışın ilişkisi kuruluyor.",
          "Bu genel irade tartışmasının odağıdır; pasaj egemen yaptırımla güvenliğe yönelir.",
          "Metin bir gerekçelendirme sunmaktadır."
        ],
        "commonError": "Sözleşme sözcüğünden hareketle Hobbes’u bütün diğer sözleşme görüşleriyle aynı savda birleştirme.",
        "check": "Sorunu güvenlik ve anlaşmaya güven, çözümü ortak yaptırım olarak yaz; hak sınırı ve genel irade seçenekleriyle farkını denetle."
      }
    },
    {
      "passage": "Locke’la ilişkilendirilen siyasal bir pasaj, yönetimin bireylerin haklarını korumak için kurulduğunu ve yetkisinin sınırsız olmadığını belirtir.",
      "prompt": "Bu pasaj hangi yorumu destekler?",
      "options": [
        "Yönetimin amacı ve haklar yetkiye sınır getirir.",
        "Yönetimin her kararı sadece güçlü olduğu için haklıdır.",
        "Bireylerin hiçbir hakkı olamaz.",
        "Halkın yönetimin dayanağıyla hiçbir ilişkisi bulunmaz.",
        "Yönetim kararları, kuruluş amacından bağımsız olarak haklıdır."
      ],
      "answer": 0,
      "hint": "Gücün varlığıyla haklı kullanımının ölçütünü ayır.",
      "explanation": "Pasaj yönetimi hakları koruma göreviyle ilişkilendirir. Bu amaç yetkiyi sınırlar; her fiilî gücü haklı sayma sonucunu vermez. Yönetimin hakları koruma amacını bul; kararın bu amaçtan bağımsız ve sınırsız haklı sayılmadığını denetle.",
      "guidance": {
        "knowledge": [
          "Sınırlı yönetim yetkinin amaç ve haklarla denetlenebilmesini ifade eder."
        ],
        "strategy": "Gücün varlığıyla haklı kullanımının ölçütünü ayır.",
        "steps": [
          "Pasaj yönetimi hakları koruma göreviyle ilişkilendirir.",
          "Bu amaç yetkiyi sınırlar; her fiilî gücü haklı sayma sonucunu vermez."
        ],
        "optionReasons": [
          "Yetkinin gerekçesi korunacak haklara bağlanmıştır.",
          "Güç tek ölçüt yapılmamıştır.",
          "Hakların korunması amaçtır.",
          "Sınırlı meşruiyet fikri bu mutlak kopuşu desteklemez.",
          "Hakları koruma amacı metinde yetkinin sınırıdır; amaçtan bağımsızlık buna aykırıdır."
        ],
        "commonError": "Fiilî güç sahibi olmayı her kararın haklılığı için tek ölçüt yapma.",
        "check": "Yönetimin hakları koruma amacını bul; kararın bu amaçtan bağımsız ve sınırsız haklı sayılmadığını denetle."
      }
    },
    {
      "passage": "Bir özet aynı dönemde Bacon’ın düzenli deneyim araştırmasını, Descartes’ın yöntemsel kuşkusunu ve Locke’un deneyim kökenli fikir açıklamasını birbirinden ayırıyor.",
      "prompt": "Bu farklılık için en doğru değerlendirme hangisidir?",
      "options": [
        "Aynı dönem farklı problem ve yöntem önerilerini barındırabilir.",
        "Dönemdeki herkes aynı bilgi kaynağını aynı biçimde savunmuştur.",
        "Bir düşünürün adı diğer bütün savları gereksiz kılar.",
        "Yöntemler farklıysa düşünürlerin aynı dönemde yaşaması imkânsızdır.",
        "Bütün görüşler tek örnekle kesin ispatlanmıştır."
      ],
      "answer": 0,
      "hint": "Her düşünürün çözmeye yöneldiği soru ve başlangıç dayanağını ayrı tut.",
      "explanation": "Özet üç farklı yöntemsel odağı aynı tarihsel çerçevede verir. Dolayısıyla dönem sınıflaması görüşleri tekleştirmeden karşılaştırmaya yarar. Bacon, Descartes ve Locke için ayrı başlangıç ve yöntem cümlesi kur; üçüne aynı gerekçeyi kopyalamadığını denetle.",
      "guidance": {
        "knowledge": [
          "Dönem adı eğilimleri toplar; düşünürler arasında gerçek görüş ayrımları kalır."
        ],
        "strategy": "Her düşünürün çözmeye yöneldiği soru ve başlangıç dayanağını ayrı tut.",
        "steps": [
          "Özet üç farklı yöntemsel odağı aynı tarihsel çerçevede verir.",
          "Dolayısıyla dönem sınıflaması görüşleri tekleştirmeden karşılaştırmaya yarar."
        ],
        "optionReasons": [
          "Tarih aralığı tek bir yöntemi zorunlu kılmaz.",
          "Verilen farklılıklar bunu çürütür.",
          "Karşılaştırma farklı dayanakları incelemeyi ister.",
          "Kronoloji ile yöntem özdeş değildir.",
          "Özet böyle kanıt sunmaz."
        ],
        "commonError": "Aynı tarih aralığını bütün düşünürlerin aynı yöntem ve bilgi kaynağını savunduğu anlamında okuma.",
        "check": "Bacon, Descartes ve Locke için ayrı başlangıç ve yöntem cümlesi kur; üçüne aynı gerekçeyi kopyalamadığını denetle."
      }
    }
  ],
  [
    {
      "passage": "Bir düşünür Aydınlanma’yı, kişinin kendi aklını başkasının sürekli vesayeti altında tutmadan kullanma cesaretiyle açıklıyor. Bu tutum her kişinin tek başına yanılmaz olduğunu söylemiyor.",
      "prompt": "Bu açıklamanın temel yönelimi hangisidir?",
      "options": [
        "Her alışılmış savı incelemeden kabul etme",
        "Gerekçe arayarak bağımsız düşünme",
        "Her bireysel düşünceyi otomatik doğru sayma",
        "Başkalarının gerekçelerini dinlemeyi yasaklama",
        "Aklı hiçbir koşulda kullanmama"
      ],
      "answer": 1,
      "hint": "Cesaret ile doğruluk güvencesinin aynı iddia olmadığını göster.",
      "explanation": "Metin kararın dayanağını otoritenin yerine sorgulayan akla açar. Ancak bağımsızlık her sonucun kesin doğru olmasını sağlamaz. Metindeki vesayetten çıkma çağrısını bul; yanılmazlık ve başkasının gerekçesini dinlememe sonuçlarının eklenmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Kendi aklını kullanma, gerekçe denetimini gerektirir; yanılmazlık demek değildir."
        ],
        "strategy": "Cesaret ile doğruluk güvencesinin aynı iddia olmadığını göster.",
        "steps": [
          "Metin kararın dayanağını otoritenin yerine sorgulayan akla açar.",
          "Ancak bağımsızlık her sonucun kesin doğru olmasını sağlamaz."
        ],
        "optionReasons": [
          "Bu bağımsız düşünmenin tersidir.",
          "Vesayete karşı aklın kullanılması vurgulanıyor.",
          "Yanılmazlık açıkça verilmemiştir.",
          "Bağımsız düşünme diyalogu dışlamaz.",
          "Metin bunun tersini ister."
        ],
        "commonError": "Kendi aklını kullanmayı kişinin her düşüncesinin zaten doğru oluşu sanma.",
        "check": "Metindeki vesayetten çıkma çağrısını bul; yanılmazlık ve başkasının gerekçesini dinlememe sonuçlarının eklenmediğini kontrol et."
      }
    },
    {
      "passage": "Bir yönetici, bir kararın açıklamasını ve eleştirilmesini yasaklıyor; başka bir yönetim gerekçeleri erişime açıp itirazları dinliyor. İkincinin her kararı doğru olduğu söylenmiyor.",
      "prompt": "İkinci durumda hangi imkân daha açıktır?",
      "options": [
        "Kamusal gerekçe incelemesi",
        "Hiç gerekçe olmadan kesin uzlaşma",
        "Her itirazın zorunlu yanlış oluşu",
        "Her karara itiraz edildiği anda kararın zorunlu iptal olması",
        "Yönetimin kararına ulaşılamaması"
      ],
      "answer": 0,
      "hint": "Erişim, itiraz ve doğruluğu ayrı koşullar olarak ele al.",
      "explanation": "İkinci yönetim kararın dayanağını denetime açar. Bu daha açık inceleme sağlar; her kararın doğruluğu ayrıca değerlendirilir. İkinci durumda gerekçe okunabiliyor ve itiraz duyulabiliyor mu, göster; bu iki imkânı kesin doğru karar sonucundan ayır.",
      "guidance": {
        "knowledge": [
          "Kamusal akıl kullanımı gerekçelerin başkalarınca da incelenebilmesine dayanabilir."
        ],
        "strategy": "Erişim, itiraz ve doğruluğu ayrı koşullar olarak ele al.",
        "steps": [
          "İkinci yönetim kararın dayanağını denetime açar.",
          "Bu daha açık inceleme sağlar; her kararın doğruluğu ayrıca değerlendirilir."
        ],
        "optionReasons": [
          "Gerekçeye erişim ve itiraz olanağı vardır.",
          "Metin otomatik uzlaşma vermez.",
          "İtirazlar dinlenmektedir.",
          "İtiraz olanağı inceleme sağlar; her itiraz otomatik iptal değildir.",
          "Açıklama erişime açılmıştır."
        ],
        "commonError": "Karşı gerekçe sunma imkânını her itirazın kararı otomatik iptal etmesiyle özdeşleştirme.",
        "check": "İkinci durumda gerekçe okunabiliyor ve itiraz duyulabiliyor mu, göster; bu iki imkânı kesin doğru karar sonucundan ayır."
      }
    },
    {
      "passage": "Aydınlanma’yı anlatan metin, eğitim ve bilimin toplumsal koşulları iyileştirebileceğini söyler; tarihteki her sonraki olayın mutlaka daha iyi olduğunu iddia etmez.",
      "prompt": "Hangi yorum metne uygundur?",
      "options": [
        "Sonra gelen her uygulama zorunlu daha adildir.",
        "Bilimsel bilgi hiçbir toplumsal etkide bulunamaz.",
        "Eğitim sadece eski sözleri sorgusuz ezberlemektir.",
        "Geçmişteki bütün bilgiler değersizdir.",
        "İlerleme düşüncesi koşullu bir iyileşme umudu içerebilir."
      ],
      "answer": 4,
      "hint": "Olabilir ifadesini mutlaka olur iddiasına çevirmeden oku.",
      "explanation": "Eğitim ve bilime koşulları değiştirme imkânı tanınır. Metinde sonraki her olayın üstünlüğünü güvenceye alan bir zorunluluk yoktur. Eğitim ve bilimin katkısı için kullanılan olabilir kapsamını koru; metinde otomatik tarih yasası olmadığını kontrol et.",
      "guidance": {
        "knowledge": [
          "İlerleme beklentisi ile her tarihsel olayın zorunlu iyiliği ayrı savlardır."
        ],
        "strategy": "Olabilir ifadesini mutlaka olur iddiasına çevirmeden oku.",
        "steps": [
          "Eğitim ve bilime koşulları değiştirme imkânı tanınır.",
          "Metinde sonraki her olayın üstünlüğünü güvenceye alan bir zorunluluk yoktur."
        ],
        "optionReasons": [
          "Bu evrensel sonuç verilmez.",
          "Metin iyileştirme olanağını tanır.",
          "Bu tanım verilmemiştir.",
          "İyileşme umudu toplu ret gerektirmez.",
          "Metin imkânı savunur, otomatik zorunluluğu değil."
        ],
        "commonError": "İyileşme imkânını sonra gerçekleşen her olayın zorunlu daha adil oluşuna genişletme.",
        "check": "Eğitim ve bilimin katkısı için kullanılan olabilir kapsamını koru; metinde otomatik tarih yasası olmadığını kontrol et."
      }
    },
    {
      "passage": "Bir ansiklopedi projesi farklı bilgi alanlarını düzenleyip daha çok okurun erişimine açmayı hedefliyor. Her maddesinin sonsuza dek hatasız kalacağı ileri sürülmüyor.",
      "prompt": "Bu projenin Aydınlanma’yla ilişkili yönü hangisidir?",
      "options": [
        "Bilgiyi yalnız dar bir grubun gizli mülkü yapmak",
        "Bütün yorumları incelemeden eşit kanıtlı saymak",
        "Bilginin düzenlenmesi ve yaygın erişimi",
        "Her maddenin değişmezliğini kesin ispatlamak",
        "Bilimsel araştırmayı bütünüyle durdurmak"
      ],
      "answer": 2,
      "hint": "Projenin hedefini içeriğin yanılmazlığı iddiasından ayır.",
      "explanation": "Metin düzenli bilgiye daha çok kişinin ulaşmasını hedefler. Bu hedef öğrenme koşulunu değiştirir; bütün maddelerin sonsuz doğruluğunu garanti etmez. Ansiklopedinin düzenleme ve erişim amaçlarını ayrı göster; değişmez doğruluk için ek kanıt verilmediğini denetle.",
      "guidance": {
        "knowledge": [
          "Ansiklopedicilik bilgi birikimini derleme ve dolaşıma açmayla ilişkilidir."
        ],
        "strategy": "Projenin hedefini içeriğin yanılmazlığı iddiasından ayır.",
        "steps": [
          "Metin düzenli bilgiye daha çok kişinin ulaşmasını hedefler.",
          "Bu hedef öğrenme koşulunu değiştirir; bütün maddelerin sonsuz doğruluğunu garanti etmez."
        ],
        "optionReasons": [
          "Proje erişimi artırmayı ister.",
          "Düzenleme böyle bir kabul değildir.",
          "Erişim ile sistemli paylaşım açık amaçtır.",
          "Metin bunu özellikle ayırmıştır.",
          "Bilgi yayma amacı araştırma yasağı değildir."
        ],
        "commonError": "Bilginin daha çok okura yayılmasını her maddenin sonsuza dek hatasızlığıyla karıştırma.",
        "check": "Ansiklopedinin düzenleme ve erişim amaçlarını ayrı göster; değişmez doğruluk için ek kanıt verilmediğini denetle."
      }
    },
    {
      "passage": "Bir metin Locke’u deneyim kaynakları, Hume’u nedensellik ve alışkanlık, Kant’ı bilmenin deneyimle başlayıp yalnız ondan türememesi görüşleriyle anıyor.",
      "prompt": "Bu metin neden bütün Aydınlanmacıları tek bir bilgi öğretisiyle tanımlamayı engeller?",
      "options": [
        "Deneyimden söz eden bütün görüşler aynı bilgi öğretisidir.",
        "Aydınlanma adı bütün düşünürlerin aynı gerekçeyi savunduğunu gösterir.",
        "Bir görüşte zihnin koşulları varsa deneyimin her rolü reddedilmiş olur.",
        "Hiçbir düşünür akıl yürütme kullanmamıştır.",
        "Aynı tarihsel çerçevede bilginin temeline ilişkin farklı gerekçeler vardır."
      ],
      "answer": 4,
      "hint": "Her düşünürün verdiği ayrı bilgi açıklamasını koru.",
      "explanation": "Metin deneyim, alışkanlık ve zihnin koşulları arasında farklı vurgu kurar. Bu nedenle dönem adı hepsini tek bir savın tekrarına indirgemez. Üç düşünürün bilgi açıklamalarını ayrı yaz; dönem adının bu açıklamaları tekleştirmediğini örneklerden kontrol et.",
      "guidance": {
        "knowledge": [
          "Dönem ortak sorunlar taşısa da çözüm önerilerini özdeş yapmaz."
        ],
        "strategy": "Her düşünürün verdiği ayrı bilgi açıklamasını koru.",
        "steps": [
          "Metin deneyim, alışkanlık ve zihnin koşulları arasında farklı vurgu kurar.",
          "Bu nedenle dönem adı hepsini tek bir savın tekrarına indirgemez."
        ],
        "optionReasons": [
          "Deneyim sözcüğü ortak olsa bile alışkanlık ve zihnin koşullarına ilişkin açıklamalar farklıdır.",
          "Dönem adı metinde verilen gerçek gerekçe farklarını ortadan kaldırmaz.",
          "Kant’la ilgili özet deneyimle başlama ve yalnız ondan türememe ayrımını korur.",
          "Farklı gerekçeler akıl yürütmeyi dışlamaz.",
          "Üç ayrı açıklama verilmiştir."
        ],
        "commonError": "Ortak deneyim sözcüğü geçtiğinde alışkanlık ve zihnin koşulları arasındaki farkı silme.",
        "check": "Üç düşünürün bilgi açıklamalarını ayrı yaz; dönem adının bu açıklamaları tekleştirmediğini örneklerden kontrol et."
      }
    },
    {
      "passage": "Montesquieu’yla ilişkilendirilen bir açıklama, yasa yapma, yürütme ve yargı görevlerinin aynı elde toplanmasının keyfîliği artırabileceğini belirtir.",
      "prompt": "Önerilen kurum düzeninin amacı nedir?",
      "options": [
        "Bütün yetkileri yalnız adı farklı tek kişide toplamak",
        "Her yurttaşın bütün mahkeme kararını tek başına vermesi",
        "Yetkiyi ayırıp karşılıklı denetim imkânı oluşturmak",
        "Yasaları hiç gerekçe aramadan yok saymak",
        "Yönetimin sınırlanmasını yalnız yöneticinin iyi niyetine bırakmak"
      ],
      "answer": 2,
      "hint": "Üç görevin kimde toplandığını ve neyi sınırladığını incele.",
      "explanation": "Metin güç yoğunlaşmasının keyfîlik riskine dikkat çeker. Görev ayrımı denetim olanağı için önerilir; sırf adları ayırmak yetmez. Yasa, yürütme ve yargının hangi elde toplandığına bak; kurumsal ayrımı yalnız yöneticinin iyi niyetine indirgeme.",
      "guidance": {
        "knowledge": [
          "Güçler ayrılığında görev adından çok gerçek yetki ve denetim ilişkisi önemlidir."
        ],
        "strategy": "Üç görevin kimde toplandığını ve neyi sınırladığını incele.",
        "steps": [
          "Metin güç yoğunlaşmasının keyfîlik riskine dikkat çeker.",
          "Görev ayrımı denetim olanağı için önerilir; sırf adları ayırmak yetmez."
        ],
        "optionReasons": [
          "Bu eleştirilen yoğunlaşmayı sürdürür.",
          "İşlev ayrımı böyle anlatılmamıştır.",
          "Farklı işlevler ve sınırlandırma birlikte ele alınır.",
          "Kurumsal ayrım yasa yokluğu değildir.",
          "Metin kişisel iyi niyetten çok görev ayrımını ve kurumsal sınırlandırmayı önerir."
        ],
        "commonError": "Üç görev adı sayılmasını üç ayrı ve denetlenebilir yetki bulunmasının yeterli kanıtı sayma.",
        "check": "Yasa, yürütme ve yargının hangi elde toplandığına bak; kurumsal ayrımı yalnız yöneticinin iyi niyetine indirgeme."
      }
    },
    {
      "passage": "Rousseau’yu tanıtan pasaj, ortak düzenin yalnız bireysel çıkarların toplamına değil ortak yarar sorununa da yöneldiğini söyler.",
      "prompt": "Genel irade kavramını bu pasajda hangi yorum daha iyi karşılar?",
      "options": [
        "Her fiilî çoğunluğun her kararının zorunlu adaleti",
        "Tek kişinin her kişisel arzusunun yasa sayılması",
        "Ortak yarara yönelen irade",
        "Bütün bireylerin aynı zevke sahip olması",
        "Bireylerin özel isteklerinin aritmetik toplamı"
      ],
      "answer": 2,
      "hint": "Ortak yarar ölçütünü oy veya arzu sayısıyla karıştırma.",
      "explanation": "Pasaj ortak düzenin amacını ortak yararla ilişkilendirir. Bu nedenle her çoğunluk sonucunu kendiliğinden haklı sayan yorum aşırı genellemedir. Seçtiğin tanımda ortak yarar ölçütü kaldığını, yalnız oy ya da istek sayısına dönüşmediğini denetle.",
      "guidance": {
        "knowledge": [
          "Genel irade ile bütün tekil isteklerin aritmetik toplamı aynı kavram değildir."
        ],
        "strategy": "Ortak yarar ölçütünü oy veya arzu sayısıyla karıştırma.",
        "steps": [
          "Pasaj ortak düzenin amacını ortak yararla ilişkilendirir.",
          "Bu nedenle her çoğunluk sonucunu kendiliğinden haklı sayan yorum aşırı genellemedir."
        ],
        "optionReasons": [
          "Ortak yarar sırf oy sayısıyla özdeş değildir.",
          "Bu ortak yararı karşılamaz.",
          "Metin ortak düzeni bu ölçütle düşünür.",
          "Zevk birliği şartı verilmemiştir.",
          "Pasaj ortak yararı tekil çıkar toplamından ayrıca ayırmıştır."
        ],
        "commonError": "Genel iradeyi özel isteklerin toplamı veya her çoğunluk kararının zorunlu adaleti sayma.",
        "check": "Seçtiğin tanımda ortak yarar ölçütü kaldığını, yalnız oy ya da istek sayısına dönüşmediğini denetle."
      }
    },
    {
      "passage": "Bir düşünür başkasının inancını zorla değiştirmeye çalışmak yerine düşüncenin eleştirilmesini, kişinin ise baskıdan korunmasını savunuyor.",
      "prompt": "Bu tutuma en uygun kavram hangisidir?",
      "options": [
        "Her görüşü kanıtlanmış sayma",
        "Bütün eleştiriyi yasaklama",
        "Zorla tek inanç dayatma",
        "Her eylemi sonuçlarından bağımsız sınırsız bırakma",
        "Hoşgörü"
      ],
      "answer": 4,
      "hint": "Görüşün eleştirisiyle kişiye zorlama arasındaki farkı göster.",
      "explanation": "Metin bir fikre katılmayı zorunlu tutmaz; baskıyı reddeder. Eleştiri ve kişinin korunması bu çerçevede birlikte bulunabilir. Metinde düşüncenin eleştirisinin açık, kişiye baskının reddedilmiş olduğunu birlikte göster.",
      "guidance": {
        "knowledge": [
          "Hoşgörü kabul etmediğin düşüncenin taşıyıcısına baskı uygulamamakla ilişkilidir."
        ],
        "strategy": "Görüşün eleştirisiyle kişiye zorlama arasındaki farkı göster.",
        "steps": [
          "Metin bir fikre katılmayı zorunlu tutmaz; baskıyı reddeder.",
          "Eleştiri ve kişinin korunması bu çerçevede birlikte bulunabilir."
        ],
        "optionReasons": [
          "Hoşgörü doğrulukta eşitleme değildir.",
          "Metin düşüncenin eleştirisini korur.",
          "Bu reddedilen tutumdur.",
          "Metin böyle genel eylem izni vermez.",
          "İtiraz hakkıyla kişiye yönelik baskıyı ayırır."
        ],
        "commonError": "Hoşgörüyü her fikre katılma veya hiçbir eleştiri yapamama biçiminde tanımlama.",
        "check": "Metinde düşüncenin eleştirisinin açık, kişiye baskının reddedilmiş olduğunu birlikte göster."
      }
    },
    {
      "passage": "Bir reformcu eğitim önermekle birlikte devletin gerçek uygulamalarını ve kimlerin eğitime erişebildiğini de inceliyor. Dönemin ideal söylemi ile gerçekleşen durum arasında fark olabileceğini söylüyor.",
      "prompt": "Hangi okuma yöntemi uygundur?",
      "options": [
        "İdeal açıklandığında herkesin zaten yararlandığını varsaymak",
        "Tek bir dışlanma örneğiyle bütün ilkelerin hiçbir anlamı olmadığını kanıtlamak",
        "İlke, uygulama ve erişim koşullarını ayrı denetlemek",
        "Her tarihsel kişiyi aynı görüşte saymak",
        "Kaynağın bütün iddialarını tarihi olduğu için doğru almak"
      ],
      "answer": 2,
      "hint": "Ne öneriliyor, ne gerçekleşiyor ve kim erişiyor sorularını ayır.",
      "explanation": "Reformcu eğitim ilkesini gerçek erişimden ayırarak inceler. Bu ayrım hem olumlu amacı hem uygulama sınırını birlikte görmeyi sağlar. Önerilen ilke ile gerçek erişim koşullarını ayrı çıkar; metnin uygulama farkını koruduğunu kontrol et.",
      "guidance": {
        "knowledge": [
          "İlkenin savunulması ile o ilkenin tam uygulanması farklı olgulardır."
        ],
        "strategy": "Ne öneriliyor, ne gerçekleşiyor ve kim erişiyor sorularını ayır.",
        "steps": [
          "Reformcu eğitim ilkesini gerçek erişimden ayırarak inceler.",
          "Bu ayrım hem olumlu amacı hem uygulama sınırını birlikte görmeyi sağlar."
        ],
        "optionReasons": [
          "Erişim ayrıca incelenmektedir.",
          "Uygulama farkı otomatik bu sonucu vermez.",
          "Metnin kurduğu ayrım korunur.",
          "Böyle birlik verilmemiştir.",
          "Tarihsel oluş doğruluk garantisi değildir."
        ],
        "commonError": "Bir eğitim idealinin savunulduğunu okuyunca herkesin fiilen eşit eriştiğini varsayma.",
        "check": "Önerilen ilke ile gerçek erişim koşullarını ayrı çıkar; metnin uygulama farkını koruduğunu kontrol et."
      }
    },
    {
      "passage": "Bir kamu kararını inceleyen öğrencinin elinde açıklama metni vardır; fakat veriye ulaşması ve eleştiri sunması yasaktır. Yalnız açıklamanın yayımlanması yeterli denetim sayılıyor.",
      "prompt": "Bu yeterlilik iddiasının temel eksiği nedir?",
      "options": [
        "Kararın gerekçesinin hiç yayımlanmamış olması",
        "Açıklamanın dayanaklarını sınama ve itiraz etme imkânı eksiktir.",
        "Verinin zaten herkesçe sınanmış olması",
        "Her eleştirinin kararı otomatik çürütecek olması",
        "İtirazların karar verici tarafından zaten cevaplanmış olması"
      ],
      "answer": 1,
      "hint": "Hangi denetim adımının fiilen kapalı kaldığını göster.",
      "explanation": "Öğrenci açıklamayı okuyabilir ama veriyi sınayamaz ve itiraz sunamaz. Bu yüzden yayım, tek başına tam kamusal gerekçe denetimi yerine geçmez. Öğrencinin okuyabildiği açıklamayı, yapamadığı veri denetimi ve eleştiri sunumundan tek tek ayır.",
      "guidance": {
        "knowledge": [
          "Kamusal gerekçe yalnız sonucun duyurulması değil dayanağın incelenebilmesini de gerektirebilir."
        ],
        "strategy": "Hangi denetim adımının fiilen kapalı kaldığını göster.",
        "steps": [
          "Öğrenci açıklamayı okuyabilir ama veriyi sınayamaz ve itiraz sunamaz.",
          "Bu yüzden yayım, tek başına tam kamusal gerekçe denetimi yerine geçmez."
        ],
        "optionReasons": [
          "Açıklama yayımlanmıştır; eksik olan dayanak veriyi sınama ve itiraz yoludur.",
          "Metin erişim ile eleştiriyi ayrı koşullar olarak vermektedir.",
          "Bu durum verilmemiştir.",
          "İtiraz imkânı kesin ret değildir.",
          "Verilen durumda eleştiri sunmak yasaktır; cevaplanmış itiraz bilgisi yoktur."
        ],
        "commonError": "Yalnız açıklama metninin yayımlanmasını veriye erişim ve itirazın da açık oluşu sayma.",
        "check": "Öğrencinin okuyabildiği açıklamayı, yapamadığı veri denetimi ve eleştiri sunumundan tek tek ayır."
      }
    }
  ],
  [
    {
      "passage": "Kant’ı tanıtan pasaj, bilmenin deneyimle başladığını fakat bütün bilginin yalnız deneyimden türemediğini; zihnin deneyimi belirli biçimlerde düzenlediğini belirtir.",
      "prompt": "Bu pasaj hangi yaklaşımı destekler?",
      "options": [
        "Her bilginin hazır doğuştan içerik olarak verilmesi",
        "Zihnin hiçbir düzenleyici katkısının bulunmaması",
        "Deneyim ile zihnin kurucu koşullarını birlikte incelemek",
        "Deneyimin hiçbir rolünün olmaması",
        "Bütün bilginin yalnız otoriteye dayanması"
      ],
      "answer": 2,
      "hint": "Deneyimle başlamak ile yalnız deneyimden türemeyi ayır.",
      "explanation": "Pasaj deneyimin gerekli rolünü ve zihnin düzenleyici koşullarını birlikte verir. Bu nedenle iki unsurdan birini tümüyle silen seçenekler uygun değildir. Pasajda deneyimin rolünü ve zihnin katkısını ayrı işaretle; birini seçerken ötekini silmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Kant deneyimden gelen içerikle bilmenin a priori koşullarını birlikte tartışır."
        ],
        "strategy": "Deneyimle başlamak ile yalnız deneyimden türemeyi ayır.",
        "steps": [
          "Pasaj deneyimin gerekli rolünü ve zihnin düzenleyici koşullarını birlikte verir.",
          "Bu nedenle iki unsurdan birini tümüyle silen seçenekler uygun değildir."
        ],
        "optionReasons": [
          "Pasaj bunu söylemez.",
          "Açıkça verilen katkıyı reddeder.",
          "İçerik ve düzenleme ilişkisi korunur.",
          "Başlama koşulu deneyime bağlanmıştır.",
          "Otorite ölçütü verilmez."
        ],
        "commonError": "Bilginin deneyimle başlamasını zihnin düzenleyici koşullarının tamamen reddi sayma.",
        "check": "Pasajda deneyimin rolünü ve zihnin katkısını ayrı işaretle; birini seçerken ötekini silmediğini kontrol et."
      }
    },
    {
      "passage": "Bir öğrenci a priori bilgiyi çocukken ilk öğrenilen, a posteriori bilgiyi daha sonra öğrenilen bilgi diye ayırıyor. Öğretmeni ayrımın öğrenme yaşı değil gerekçelendirme dayanağı olduğunu söylüyor.",
      "prompt": "Öğretmenin düzeltmesi hangisidir?",
      "options": [
        "A priori gerekçelendirme deneyden bağımsızlıkla ilişkilidir.",
        "Çocuklukta öğrenilen her şey zorunlu a prioridir.",
        "Geç öğrenilen hiçbir önerme a priori olamaz.",
        "A posteriori her koşulda yanlış demektir.",
        "A priori her insanda aynı anda bilinçli hazır bulunan bütün içeriktir."
      ],
      "answer": 0,
      "hint": "Öğrenme olayını doğrulama dayanağından ayrı sor.",
      "explanation": "Öğrenci zaman sırasını ölçüt yapmıştır; öğretmen bu ölçütü reddeder. Gerekçenin deneyimden bağımsız olup olmadığı esas alınmalıdır. Bir önermenin ne zaman öğrenildiğini değil, gerekçesinin deneyden bağımsız olup olmadığını sorduğunu denetle.",
      "guidance": {
        "knowledge": [
          "A priori ve a posteriori ayrımı bilginin gerekçesinin deneyimle ilişkisine yönelir."
        ],
        "strategy": "Öğrenme olayını doğrulama dayanağından ayrı sor.",
        "steps": [
          "Öğrenci zaman sırasını ölçüt yapmıştır; öğretmen bu ölçütü reddeder.",
          "Gerekçenin deneyimden bağımsız olup olmadığı esas alınmalıdır."
        ],
        "optionReasons": [
          "Ayrım kronolojik öğrenme sırası değildir.",
          "Öğrenme zamanı yeterli ölçüt değildir.",
          "Yaş böyle bir engel oluşturmaz.",
          "Deneyim dayanağı yanlışlıkla özdeş değildir.",
          "Gerekçelendirme ayrımı bu psikolojik iddiayı zorunlu kılmaz."
        ],
        "commonError": "A priori ayrımını çocuklukta veya daha erken öğrenilmiş olma ölçütüne bağlama.",
        "check": "Bir önermenin ne zaman öğrenildiğini değil, gerekçesinin deneyden bağımsız olup olmadığını sorduğunu denetle."
      }
    },
    {
      "passage": "Hume’la ilişkilendirilen bir pasajda insanın iki olayın tekrar tekrar art arda gelişini gözlediği, zorunlu bağın kendisini aynı biçimde duyu nesnesi olarak görmediği söylenir.",
      "prompt": "Pasajın sorunu nedir?",
      "options": [
        "Bütün olayların hiçbir sırayla gerçekleşmediğini kanıtlama",
        "Her nedensel savın otomatik matematiksel teorem olması",
        "Nedenselliğin deneyimden bağımsız hazır fikir sayılması",
        "Duyuların her ayrıntısının kesin doğru oluşu",
        "Nedensel beklentinin deneyim ve alışkanlıkla ilişkisi"
      ],
      "answer": 4,
      "hint": "Gözlenen tekrar ile eklenen zorunluluk yargısını ayır.",
      "explanation": "Metinde gözlenen art arda geliş, sorulan ise zorunlu bağdır. Alışkanlık bu beklentinin oluşumunda tartışılır; bu inceleme olayların hiç olmadığını söylemez. Tekrar gözlemini ve zorunluluk yargısını ayrı yaz; Hume’un sorguladığı geçişin hangisi olduğunu göster.",
      "guidance": {
        "knowledge": [
          "Hume zorunlu nedensellik fikriyle tekrarlanan birliktelik arasındaki geçişi sorgular."
        ],
        "strategy": "Gözlenen tekrar ile eklenen zorunluluk yargısını ayır.",
        "steps": [
          "Metinde gözlenen art arda geliş, sorulan ise zorunlu bağdır.",
          "Alışkanlık bu beklentinin oluşumunda tartışılır; bu inceleme olayların hiç olmadığını söylemez."
        ],
        "optionReasons": [
          "Tekrar gözlemi açıkça verilmiştir.",
          "Metin böyle güvence vermez.",
          "Pasaj tekrar ve alışkanlığı sorgular; doğuştan hazır fikir açıklaması sunmaz.",
          "Pasaj böyle evrensel iddia kurmaz.",
          "Tekrar ile zorunluluk iddiası ayrılır."
        ],
        "commonError": "Gözlenen art ardalığı zorunlu bağın kendisini doğrudan görme ile özdeşleştirme.",
        "check": "Tekrar gözlemini ve zorunluluk yargısını ayrı yaz; Hume’un sorguladığı geçişin hangisi olduğunu göster."
      }
    },
    {
      "passage": "Kant’la ilişkilendirilen bir açıklamada insanın deneyim alanında nesneleri bilme koşulları inceleniyor; şeylerin bu koşullardan bağımsız kendinde durumunu aynı bilgiyle tüketemeyeceği belirtiliyor.",
      "prompt": "Bu ayrım hangi kavramlarla ilişkilidir?",
      "options": [
        "Analitik ve sentetik önermeler",
        "A priori ve a posteriori gerekçelendirme",
        "Basit ve bileşik ide",
        "Fenomen ve kendinde şey",
        "Duyum ve düşünüm"
      ],
      "answer": 3,
      "hint": "Koşullar altında bilinen ile koşullardan bağımsız düşünüleni ayır.",
      "explanation": "Pasaj bilmenin kapsamını araştırır, nesneleri sadece kişisel keyfe indirgemez. Fenomen ve kendinde şey ayrımı bu sınır sorusuyla ilişkilidir. Seçtiğin kavram çiftinin bilme koşulları altındaki görünüş ile koşullardan bağımsız düşünüleni ayırdığını kontrol et.",
      "guidance": {
        "knowledge": [
          "Kant’ta fenomen bilgisi bilmenin koşulları altında nesnelere yönelir."
        ],
        "strategy": "Koşullar altında bilinen ile koşullardan bağımsız düşünüleni ayır.",
        "steps": [
          "Pasaj bilmenin kapsamını araştırır, nesneleri sadece kişisel keyfe indirgemez.",
          "Fenomen ve kendinde şey ayrımı bu sınır sorusuyla ilişkilidir."
        ],
        "optionReasons": [
          "Bu yargının içeriğine ilişkin ayrı sınıflamadır; görünüş ile kendinde şey ayrımı değildir.",
          "Bu deneyimle gerekçe ilişkisine yönelir; nesnenin bilme koşulları altındaki statüsüyle aynı ayrım değildir.",
          "Bu fikir içeriklerinin kuruluşuyla ilgilidir; Kant’ın fenomen sınırı değildir.",
          "Bilinebilir görünüş alanı ile koşullardan bağımsızlık ayrılır.",
          "Bu Locke’taki deneyim kaynaklarının ayrımıdır; pasajdaki fenomen-kendinde şey ayrımı değildir."
        ],
        "commonError": "Fenomen-kendinde şey ayrımını yargı türleri veya fikirlerin basit-bileşik ayrımıyla değiştirerek okuma.",
        "check": "Seçtiğin kavram çiftinin bilme koşulları altındaki görünüş ile koşullardan bağımsız düşünüleni ayırdığını kontrol et."
      }
    },
    {
      "passage": "Bir kişi yardım ederken yalnız çevresinin övgüsünü kazanmayı amaçlıyor; başka kişi aynı davranışı doğru bulduğu ilkeye saygı nedeniyle yapıyor. Örnek Kant’ın ahlak görüşüyle okunuyor.",
      "prompt": "İkinci kişinin ayırt edici yönü hangisidir?",
      "options": [
        "Yalnız dış görünüşte ödeve uygun davranma",
        "Ödevden hareket etme",
        "Yalnız haz miktarını hesaplama",
        "Hiçbir ilke benimsememe",
        "Çoğunluk istediği için her şeyi doğru sayma"
      ],
      "answer": 1,
      "hint": "Davranışın dış biçimini onu belirleyen gerekçeden ayır.",
      "explanation": "İki kişi aynı yardımı yapabilir; ayırt edici bilgi niçin yaptıklarıdır. İkinci kişi ilkeye saygıyı belirleyici tuttuğu için ödevden hareket etmeyi örnekler. İkinci kişiyi belirleyen nedenin ilkeye saygı olduğunu bul; yalnız yardım sonucunu seçmekle yetinme.",
      "guidance": {
        "knowledge": [
          "Kant’ta ödeve uygun sonuç ile ödevden kaynaklanan güdü farklıdır."
        ],
        "strategy": "Davranışın dış biçimini onu belirleyen gerekçeden ayır.",
        "steps": [
          "İki kişi aynı yardımı yapabilir; ayırt edici bilgi niçin yaptıklarıdır.",
          "İkinci kişi ilkeye saygıyı belirleyici tuttuğu için ödevden hareket etmeyi örnekler."
        ],
        "optionReasons": [
          "İkinci örneğin belirtilen güdüsünü eksik bırakır.",
          "Belirleyici güdü ilkeye saygıdır.",
          "Metinde bu güdü verilmemiştir.",
          "İlkeye saygı açıkça vardır.",
          "Bu ölçüt verilmez."
        ],
        "commonError": "Dışarıdan aynı görünen yardımların mutlaka aynı güdüyle yapıldığını varsayma.",
        "check": "İkinci kişiyi belirleyen nedenin ilkeye saygı olduğunu bul; yalnız yardım sonucunu seçmekle yetinme."
      }
    },
    {
      "passage": "Bir kişi ancak çıkarına uygunsa sözünü tutmayı ilke ediniyor. Kant’ın evrenselleştirme sorgusu, bu ilkenin herkes için geçerli yasa olarak istenip istenemeyeceğini araştırıyor.",
      "prompt": "Burada sınanan şey nedir?",
      "options": [
        "Davranışın kaç kişi tarafından beğenildiği",
        "Eylemin yalnız beklenen yararı sağlaması",
        "Her kişinin aynı özel isteği taşıması",
        "İlkenin hiçbir gerekçe olmadan zaten evrensel yasa sayılması",
        "Kişinin eylem ilkesinin evrenselleştirilebilirliği"
      ],
      "answer": 4,
      "hint": "Önce kişinin ilkesini, sonra onun genel kural oluşunu düşün.",
      "explanation": "İlke çıkar uygunluğuna göre söz tutmaktır. Soru bu ilkenin herkes için yasa olarak tutarlı biçimde istenmesini araştırır; oy sayısını değil. Kişinin koşullu söz tutma maksimi ile herkes için yasa olarak istenme sorusunu ayrı yaz.",
      "guidance": {
        "knowledge": [
          "Maksim öznel eylem ilkesidir; kategorik buyrukla evrenselleştirme sınamasına açılır."
        ],
        "strategy": "Önce kişinin ilkesini, sonra onun genel kural oluşunu düşün.",
        "steps": [
          "İlke çıkar uygunluğuna göre söz tutmaktır.",
          "Soru bu ilkenin herkes için yasa olarak tutarlı biçimde istenmesini araştırır; oy sayısını değil."
        ],
        "optionReasons": [
          "Popülerlik ölçütü değildir.",
          "Kant’ın burada verilen sınaması yarar sonucunu değil maksimin yasa olarak istenmesini araştırır.",
          "İstek birliği gerekmez.",
          "Sınama tam da bu kabulü araştırır.",
          "Maksimin genel yasa olarak düşünülebilmesi soruluyor."
        ],
        "commonError": "Evrenselleştirme sınamasını beğeni sayısı veya beklenen yararın hesabına çevirme.",
        "check": "Kişinin koşullu söz tutma maksimi ile herkes için yasa olarak istenme sorusunu ayrı yaz."
      }
    },
    {
      "passage": "İki kişi eşit koşullarda anlaşarak birlikte çalışıyor ve birbirlerinin rızasını, amaçlarını dikkate alıyor. Bir üçüncü kişi ise arkadaşını gerçek amacı gizleyerek kullanıyor. Kant’ın yalnız araç olarak kullanmama ilkesi ele alınıyor.",
      "prompt": "Bu ilkeye uygun yorum hangisidir?",
      "options": [
        "İnsanların birbirine yardım etmesi her koşulda yasaktır.",
        "Bir kişi işe yarıyorsa onu aldatmak her zaman doğrudur.",
        "Birlikte çalışmak kişinin amaçlarını zorunlu yok eder.",
        "İş birliği yasak değildir; kişinin yalnız araç durumuna indirgenmesi sorgulanır.",
        "Rıza olsa da başkasından herhangi bir işlev için yararlanmak mutlaka yanlıştır."
      ],
      "answer": 3,
      "hint": "İşlevden yararlanma ile kişiyi araçtan ibaret saymayı ayır.",
      "explanation": "İlk iki kişi birbirinin rıza ve amaçlarını korurken birlikte çalışır. Üçüncünün aldatması ise diğerini kendi amacı için yalnız araçlaştırma sorununu doğurur. İlk iki kişinin birbirlerinin rıza ve amaçlarını dikkate aldığını, üçüncünün aldatmasını ise ayrı denetle.",
      "guidance": {
        "knowledge": [
          "Kant’ın formülünde yalnız araç sözcüğü ahlaki ayrımı taşır."
        ],
        "strategy": "İşlevden yararlanma ile kişiyi araçtan ibaret saymayı ayır.",
        "steps": [
          "İlk iki kişi birbirinin rıza ve amaçlarını korurken birlikte çalışır.",
          "Üçüncünün aldatması ise diğerini kendi amacı için yalnız araçlaştırma sorununu doğurur."
        ],
        "optionReasons": [
          "Yalnız araç koşulu silinmiştir.",
          "Kişiyi yalnız araç yapmayı meşrulaştırır.",
          "Örnekte amaçlar dikkate alınır.",
          "Rıza ve kişinin amaçları dikkate alınır.",
          "Yalnız araç olmama ilkesi karşılıklı ve saygılı iş birliğini topluca yasaklamaz."
        ],
        "commonError": "Yalnız araç olarak kullanmama ilkesinden bütün iş birliğinin yasak olduğu sonucunu çıkarma.",
        "check": "İlk iki kişinin birbirlerinin rıza ve amaçlarını dikkate aldığını, üçüncünün aldatmasını ise ayrı denetle."
      }
    },
    {
      "passage": "Bentham’la ilişkilendirilen bir karar değerlendirmesinde bir politikanın bütün etkilenenler için oluşturduğu haz ve acı sonuçları hesaba katılıyor.",
      "prompt": "Bu değerlendirme hangi ilkeye yönelir?",
      "options": [
        "Yalnız karar vericinin kişisel çıkarı",
        "Her çoğunluk kararının sonuçtan bağımsız doğruluğu",
        "Sonuçları hiç dikkate almayan yalnız biçimsel alışkanlık",
        "Sonucun yalnız karar vericinin alışkanlığına uyması",
        "Toplam fayda"
      ],
      "answer": 4,
      "hint": "Hesaba kimlerin hangi sonuçlarının katıldığını sor.",
      "explanation": "Pasaj yalnız karar vericiyi değil bütün etkilenenleri kapsar. Bu toplam fayda yaklaşımıdır; her çoğunluk oyunu otomatik haklı saymaz. Haz ve acı hesabına bütün etkilenenlerin katıldığını kontrol et; metne dışlanan bir azınlık varsayımı ekleme.",
      "guidance": {
        "knowledge": [
          "Faydacılık sonuçların iyilik veya refahla ilişkisini temel alır; salt çoğunluk oyu değildir."
        ],
        "strategy": "Hesaba kimlerin hangi sonuçlarının katıldığını sor.",
        "steps": [
          "Pasaj yalnız karar vericiyi değil bütün etkilenenleri kapsar.",
          "Bu toplam fayda yaklaşımıdır; her çoğunluk oyunu otomatik haklı saymaz."
        ],
        "optionReasons": [
          "Bütün etkilenenler kapsamı silinir.",
          "Fayda salt oy sayısı değildir.",
          "Metin sonuçları esas alır.",
          "Bütün etkilenenlerin faydası yerine tek kişinin alışkanlığı ölçüt yapılmıştır.",
          "Bütün etkilenenlerin sonuçları birlikte incelenir."
        ],
        "commonError": "Toplam faydayı yalnız yöneticiye yarar veya çoğunluğun oy sayısı olarak daraltma.",
        "check": "Haz ve acı hesabına bütün etkilenenlerin katıldığını kontrol et; metne dışlanan bir azınlık varsayımı ekleme."
      }
    },
    {
      "passage": "Mill’i tanıtan açıklama hazları yalnız miktar bakımından değil nitelikleri bakımından da karşılaştırır; düşünsel yetilerin kullanılmasına ilişkin yaşantıların önemini vurgular.",
      "prompt": "Burada hangi fark öne çıkar?",
      "options": [
        "Hiçbir hazzın değerlendirilemeyeceği",
        "Hazların nitelik bakımından ayrılması",
        "Bütün hazların zorunlu aynı nitelikte olması",
        "Yalnız yöneticinin keyfinin önemsenmesi",
        "Hazların yalnız süre ve miktar bakımından karşılaştırılması"
      ],
      "answer": 1,
      "hint": "Miktar sözcüğünün yanına hangi yeni karşılaştırma ekseninin eklendiğini bul.",
      "explanation": "Metin düşünsel yaşantıların niteliğini önemser. Bu, hazları sadece daha çok veya daha az diye saymaktan farklıdır. Metinde miktara eklenen karşılaştırma eksenini bul; düşünsel yaşantı örneğinin nitelikle bağını göster.",
      "guidance": {
        "knowledge": [
          "Mill’in faydacılığında hazların niteliği tartışmanın önemli bir unsurudur."
        ],
        "strategy": "Miktar sözcüğünün yanına hangi yeni karşılaştırma ekseninin eklendiğini bul.",
        "steps": [
          "Metin düşünsel yaşantıların niteliğini önemser.",
          "Bu, hazları sadece daha çok veya daha az diye saymaktan farklıdır."
        ],
        "optionReasons": [
          "Metin değerlendirme yapar.",
          "Yalnız nicelik hesabı aşılır.",
          "Ayrım açıkça verilmiştir.",
          "Böyle dar kapsam yoktur.",
          "Metnin ayırıcı vurgusu miktarın yanına nitelik eksenini eklemesidir."
        ],
        "commonError": "Mill’in nitelik vurgusunu yalnız hazların süre ve miktar hesabına indirgeme.",
        "check": "Metinde miktara eklenen karşılaştırma eksenini bul; düşünsel yaşantı örneğinin nitelikle bağını göster."
      }
    },
    {
      "passage": "Hegel’i anlatan pasajda bir düşünce kendi gerilimleriyle dönüşüyor; önceki içeriğin bazı yönleri eleştirilirken bazı yönleri yeni bütün içinde korunuyor.",
      "prompt": "Hangi yorum daha uygundur?",
      "options": [
        "Her olayın üç sözcük ezberlenince mekanik hesaplanması",
        "Bütün değişimlerin öncekinin her izini silmesi",
        "Gerilimin hiçbir düşünceyle ilişkili olmaması",
        "Gelişimin birbirinden kopuk, hiçbir içerik bağı olmayan olaylar sayılması",
        "Olumsuzlama ile korumayı içeren gelişim"
      ],
      "answer": 4,
      "hint": "Dönüşümde neyin aşıldığını ve neyin korunduğunu ayrı göster.",
      "explanation": "Önceki içeriğe itiraz edilirken bazı yönleri yeni ilişkide korunur. Bu nedenle süreç ne aynen tekrar ne de her şeyi izsiz yok etmedir. Dönüşümde eleştirilen ve yeni bütünde korunan yönleri ayrı göster; bağın tamamen kesilmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Diyalektik gelişim salt üç etiket veya her olaya aynı mekanik şema değildir."
        ],
        "strategy": "Dönüşümde neyin aşıldığını ve neyin korunduğunu ayrı göster.",
        "steps": [
          "Önceki içeriğe itiraz edilirken bazı yönleri yeni ilişkide korunur.",
          "Bu nedenle süreç ne aynen tekrar ne de her şeyi izsiz yok etmedir."
        ],
        "optionReasons": [
          "Metin böyle algoritma sunmaz.",
          "Koruma yönünü dışlar.",
          "Metin gerilim üzerinden dönüşüm anlatır.",
          "Önceki içeriğin bazı yönlerinin yeni bütünde korunması bağlantıyı gösterir.",
          "Dönüşümde hem fark hem süreklilik vardır."
        ],
        "commonError": "Diyalektiği her olaya mekanik üç sözcük uygulamak veya önceki içeriği izsiz silmek sanma.",
        "check": "Dönüşümde eleştirilen ve yeni bütünde korunan yönleri ayrı göster; bağın tamamen kesilmediğini kontrol et."
      }
    },
    {
      "passage": "Hegel’i tanıtan metin, tek bir anı bütünden koparmak yerine düşünce ve tarihteki süreç ilişkisini araştırır. Her güncel olayın ahlaken iyi olduğu söylenmiyor.",
      "prompt": "Hangi sonuç desteklenir?",
      "options": [
        "Gerçekleşen her haksızlık zorunlu ahlaken iyidir.",
        "Tarih hiçbir değişim içermez.",
        "Bir kelime bütün tarihsel nedeni tek başına kanıtlar.",
        "Bütün düşünürler aynı idealist savı taşır.",
        "Parçanın süreç ve bütünle ilişkisi incelenir."
      ],
      "answer": 4,
      "hint": "Açıklama ve değerlendirme iddialarını ayrı tut.",
      "explanation": "Pasaj bütün ve süreç ilişkisini öne çıkarır. Bu yöntemsel vurgu gerçekleşen her duruma koşulsuz ahlaki onay olarak genişletilemez. Pasajın parça-süreç-bütün ilişkisine yöneldiğini bul; açıkça verilmemiş ahlaki onayı eklemediğini denetle.",
      "guidance": {
        "knowledge": [
          "Bir süreci açıklama girişimi tek başına her sonucu ahlaken onaylamak değildir."
        ],
        "strategy": "Açıklama ve değerlendirme iddialarını ayrı tut.",
        "steps": [
          "Pasaj bütün ve süreç ilişkisini öne çıkarır.",
          "Bu yöntemsel vurgu gerçekleşen her duruma koşulsuz ahlaki onay olarak genişletilemez."
        ],
        "optionReasons": [
          "Metin böyle onay vermemiştir.",
          "Süreç incelemesi bunun tersine açıktır.",
          "Böyle ispat yoktur.",
          "Tek görüşten evrensel tarih yazılmaz.",
          "Metnin yöntemi bu bağı kurar."
        ],
        "commonError": "Bir tarihsel süreci açıklamayı gerçekleşen her haksızlığı ahlaken onaylamak sayma.",
        "check": "Pasajın parça-süreç-bütün ilişkisine yöneldiğini bul; açıkça verilmemiş ahlaki onayı eklemediğini denetle."
      }
    },
    {
      "passage": "Marx’ı tanıtan bir açıklama, toplumsal ilişkileri üretim biçimi, emek ve maddi yaşam koşullarıyla birlikte ele alıyor. İnsanların düşüncelerini bu ilişkilerden tamamen kopuk saymıyor.",
      "prompt": "Pasajın temel yönelimi hangisidir?",
      "options": [
        "Toplumsal yaşamı maddi ilişkilerle birlikte açıklamak",
        "Her düşünceyi yalnız tek kişinin rüyasına indirgemek",
        "Tarihin yalnız düşüncenin kendi iç hareketiyle açıklanması",
        "Emek ve üretimin hiçbir etkisinin bulunmaması",
        "Her bireysel olayın tek sayısal formülle eksiksiz hesaplanması"
      ],
      "answer": 0,
      "hint": "İncelenen olgunun hangi yaşam ilişkilerine bağlandığını göster.",
      "explanation": "Metin düşünce ve toplumu emek ile üretim koşullarından koparmamayı önerir. Bu maddi ilişkiler odağını gösterir; her olayı basit tek değişkene indirgeyen ek sav kurulmaz. Üretim biçimi, emek ve yaşam koşullarının açıklamadaki yerini göster; bunları silen seçeneği ele.",
      "guidance": {
        "knowledge": [
          "Marx’ın tarih ve toplum açıklamasında maddi üretim ilişkileri merkezi yer tutar."
        ],
        "strategy": "İncelenen olgunun hangi yaşam ilişkilerine bağlandığını göster.",
        "steps": [
          "Metin düşünce ve toplumu emek ile üretim koşullarından koparmamayı önerir.",
          "Bu maddi ilişkiler odağını gösterir; her olayı basit tek değişkene indirgeyen ek sav kurulmaz."
        ],
        "optionReasons": [
          "Üretim ve emek bağları öne çıkarılır.",
          "Toplumsal ilişkiler bunun tersidir.",
          "Metin maddi üretim ve toplumsal ilişkileri de temele alır; yalnız düşünce içi açıklama değildir.",
          "Metin bu etkiyi inceler.",
          "Böyle sınırsız model iddiası yoktur."
        ],
        "commonError": "Maddi ilişkiler odağını yalnız düşüncenin kendi iç hareketi veya tek kişinin rüyasıyla açıklama gibi okuma.",
        "check": "Üretim biçimi, emek ve yaşam koşullarının açıklamadaki yerini göster; bunları silen seçeneği ele."
      }
    },
    {
      "passage": "Comte’u tanıtan bir pasaj, olgular arasındaki ilişkilerin gözlenebilir düzenlerle incelenmesini öne çıkarıyor; aynı olayı tanrısal irade, soyut öz ve olgusal ilişkiyle açıklayan tarihsel evrelerden söz ediyor.",
      "prompt": "Bu evreler hangi sıralamayla ilişkilidir?",
      "options": [
        "Metafizik, teolojik, pozitif",
        "Teolojik, metafizik, pozitif",
        "Teolojik, pozitif, metafizik",
        "Pozitif, metafizik, teolojik",
        "Üç evre arasında hiçbir açıklama farkı bulunmaması"
      ],
      "answer": 1,
      "hint": "Her evreyi başvurduğu açıklama dayanağıyla eşleştir.",
      "explanation": "Tanrısal açıklama teolojik, soyut öz metafizik, olgusal ilişki pozitif evreye karşılık gelir. Bu tasvirin tarihsel bir görüş olduğu, her insanı bugün tek evreyle etiketlemediği korunmalıdır. Tanrısal irade, soyut öz ve olgusal ilişkiyi sırayla eşleştir; ardından seçeneğin sırasını yeniden oku.",
      "guidance": {
        "knowledge": [
          "Comte’un üç hâl öğretisi açıklama biçimlerinin tarihsel dönüşümüne ilişkin bir tasvirdir."
        ],
        "strategy": "Her evreyi başvurduğu açıklama dayanağıyla eşleştir.",
        "steps": [
          "Tanrısal açıklama teolojik, soyut öz metafizik, olgusal ilişki pozitif evreye karşılık gelir.",
          "Bu tasvirin tarihsel bir görüş olduğu, her insanı bugün tek evreyle etiketlemediği korunmalıdır."
        ],
        "optionReasons": [
          "İlk iki evre ters çevrilmiştir; pasaj tanrısal açıklamadan soyut öze, oradan olgusal ilişkiye gider.",
          "Comte’un üç hâl tasvirinin sırasıdır.",
          "Son iki evre ters çevrilmiştir; pozitif evre metindeki sırada sonuncudur.",
          "Sıra bütünüyle ters kurulmuştur; kavram adlarını bilmek sıralamayı tek başına sağlamaz.",
          "Metin her evreyi farklı açıklama dayanağıyla tanıtır."
        ],
        "commonError": "Üç hâlin adlarını hatırlayıp dayanaklarını ve sırasını birbirine karıştırma.",
        "check": "Tanrısal irade, soyut öz ve olgusal ilişkiyi sırayla eşleştir; ardından seçeneğin sırasını yeniden oku."
      }
    },
    {
      "passage": "Bir bölümde Kant’ın güdü ve ilke, Bentham’ın sonuçlar, Hegel’in süreç, Marx’ın maddi toplumsal ilişkiler üzerinde durduğu açıklanıyor.",
      "prompt": "Bu farklılıklar nasıl çalışılmalıdır?",
      "options": [
        "Hepsinin aynı ahlak formülünü kullandığını varsayarak",
        "Her görüşün sorusunu ve dayanağını ayrı eşleştirerek",
        "Sadece düşünür adlarını sayıp öncülleri okumayarak",
        "Tek düşünür doğruysa diğerlerinin metnini hiç anlamaya çalışmayarak",
        "Her terimi rastgele diğer adlarla değiştirerek"
      ],
      "answer": 1,
      "hint": "Dört açıklamanın her birinde incelenen şeyi açıkça yaz.",
      "explanation": "Güdü, sonuç, süreç ve üretim ilişkileri farklı inceleme eksenleridir. Adı ezberlemek yerine bu ilişkileri kurmak yeni bir pasajı anlamayı sağlar. Güdü, sonuç, süreç ve maddi ilişkiyi ilgili düşünürle eşleştir; her eşleştirme için pasajdan dayanak göster.",
      "guidance": {
        "knowledge": [
          "Karşılaştırma ortak dönem içinde soru, yöntem ve sonuç farkını korumalıdır."
        ],
        "strategy": "Dört açıklamanın her birinde incelenen şeyi açıkça yaz.",
        "steps": [
          "Güdü, sonuç, süreç ve üretim ilişkileri farklı inceleme eksenleridir.",
          "Adı ezberlemek yerine bu ilişkileri kurmak yeni bir pasajı anlamayı sağlar."
        ],
        "optionReasons": [
          "Ayrı odaklar açıkça verilmiştir.",
          "Terimler çözmeye yöneldikleri problemle anlam kazanır.",
          "Gerekçe ilişkisi kaybolur.",
          "Önce doğru anlama gerekir.",
          "Kaynak görüşleri karışır."
        ],
        "commonError": "Düşünür adlarını öğrenmeyi problemlerinin ve ölçütlerinin farkını öğrenmenin yerine koyma.",
        "check": "Güdü, sonuç, süreç ve maddi ilişkiyi ilgili düşünürle eşleştir; her eşleştirme için pasajdan dayanak göster."
      }
    },
    {
      "passage": "Bir öğrenci bir eylemin kurala uygun sonucunu görüp kişinin kesinlikle ödevden davrandığını söylüyor. Kişinin güdüsü hakkında hiçbir bilgi verilmiyor.",
      "prompt": "Kant ayrımı bakımından öğrencinin çıkarımı neden eksiktir?",
      "options": [
        "Dış uygunluk tek başına eylemin belirleyici güdüsünü göstermez.",
        "Kant hiçbir eylemin dış görünüşünü tanımaz.",
        "Her uygun davranışın zorunlu kötü niyetli olması",
        "Kişinin eyleminin başkalarına yarar sağladığının bile bilinememesi",
        "Güdünün mutlaka sadece maddi çıkar olması"
      ],
      "answer": 0,
      "hint": "Eylem hakkında bilinen ve bilinmeyen bilgiyi ayır.",
      "explanation": "Öğrenci davranışın uygunluğunu bilir, ama neden yapıldığını bilmez. Bu yüzden ödevdenlik sonucunu kesinleştirmek için güdüye ilişkin ek bağlam gerekir. Bilinen dış uygunluğu ve bilinmeyen güdüyü iki satıra ayır; ödevdenlik için gereken ek bilgiyi adlandır.",
      "guidance": {
        "knowledge": [
          "Ödeve uygunluk ile ödevdenlik aynı veriyle her zaman saptanamaz."
        ],
        "strategy": "Eylem hakkında bilinen ve bilinmeyen bilgiyi ayır.",
        "steps": [
          "Öğrenci davranışın uygunluğunu bilir, ama neden yapıldığını bilmez.",
          "Bu yüzden ödevdenlik sonucunu kesinleştirmek için güdüye ilişkin ek bağlam gerekir."
        ],
        "optionReasons": [
          "Güdüye ilişkin veri eksiktir.",
          "Böyle genel yasak yoktur.",
          "Ters evrensel genelleme de kurulamaz.",
          "Verilen eksik bilgi belirleyici güdüdür; sorunun Kant ayrımı bu eksene yönelir.",
          "Veri yokluğundan böyle kesin sonuç çıkmaz."
        ],
        "commonError": "Kurala uygun görünen eylemden hakkında veri bulunmayan belirleyici güdüyü kesin çıkarma.",
        "check": "Bilinen dış uygunluğu ve bilinmeyen güdüyü iki satıra ayır; ödevdenlik için gereken ek bilgiyi adlandır."
      }
    }
  ],
  [
    {
      "passage": "Bir bilim anlayışı kuramları soyut mantıksal ürünler olarak incelemenin yanında araştırmacıların ortak uygulamalarını ve tarihsel değişimini de inceliyor.",
      "prompt": "İkinci odak neyi öne çıkarır?",
      "options": [
        "Bilimde hiçbir gerekçenin bulunmadığını",
        "Bilimsel etkinlik ve topluluk bağlamı",
        "Bütün kuramların sadece aynı dil oyunu olduğunu",
        "Bilimin yalnız değişmez önermeler toplamı olduğunu",
        "Bir kuramın yalnız biçimsel çelişkisizliğini"
      ],
      "answer": 1,
      "hint": "Araştırmanın nesnesinin önerme mi pratik mi olduğunu ayır.",
      "explanation": "İkinci odak bilim insanlarının yaptığı işleri ve zaman içindeki dönüşümü ele alır. Bu, ürünün mantıksal incelemesini değersiz ilan etmeden başka bir eksen açar. İkinci odakta araştırmacıların ortak uygulaması ve tarihsel değişimi bulunduğunu göster; önermenin mantıksal biçimiyle farkını koru.",
      "guidance": {
        "knowledge": [
          "Bilimi ürün olarak incelemek ile etkinlik ve tarih bağlamıyla incelemek ayrı odaklardır."
        ],
        "strategy": "Araştırmanın nesnesinin önerme mi pratik mi olduğunu ayır.",
        "steps": [
          "İkinci odak bilim insanlarının yaptığı işleri ve zaman içindeki dönüşümü ele alır.",
          "Bu, ürünün mantıksal incelemesini değersiz ilan etmeden başka bir eksen açar."
        ],
        "optionReasons": [
          "Bağlam incelemesi gerekçeyi silmez.",
          "Araştırma pratiği ve tarihsel değişim incelenmektedir.",
          "Böyle sınırsız özdeşlik kurulmamıştır.",
          "İkinci odak topluluk pratiği ve tarihsel değişimi de incelemektedir.",
          "Bu ürünün mantıksal incelemesinin odağıdır; sorulan pratik ve topluluk bağlamıdır."
        ],
        "commonError": "Bilimi etkinlik olarak incelemeyi gerekçesizleştirme veya yalnız kitap satışıyla açıklama sanma.",
        "check": "İkinci odakta araştırmacıların ortak uygulaması ve tarihsel değişimi bulunduğunu göster; önermenin mantıksal biçimiyle farkını koru."
      }
    },
    {
      "passage": "Husserl’i tanıtan pasajda kişi bir nesnenin dış varlığı hakkında alışılmış hükmünü geçici olarak askıya alıp deneyimin kendisinde nasıl verildiğini inceliyor.",
      "prompt": "Bu yöntemsel tutum hangisidir?",
      "options": [
        "Nesnenin bütün fiziksel renklerini sökme",
        "Paranteze alma",
        "Dünyanın kesinlikle var olmadığını kanıtlama",
        "Gözlenen her ayrıntıyı değişmez öz sayma",
        "Dış varlık hükmünü inceleme öncesinde kesin kabul etme"
      ],
      "answer": 1,
      "hint": "Yargının askıya alınmasıyla yargının tersini kesin söylemeyi ayır.",
      "explanation": "Pasaj inceleme için alışılmış varlık hükmünü geçici durdurur. Bu, dünyanın yokluğunu kanıtladığı veya nesneyi fiziksel değiştirdiği anlamına gelmez. Askıya alınan şeyin alışılmış varlık hükmü olduğunu denetle; onun tersinin kesin ilan edilmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Fenomenolojik paranteze alma dış varlık yargısını yöntemli askıya alır; inkâr etmez."
        ],
        "strategy": "Yargının askıya alınmasıyla yargının tersini kesin söylemeyi ayır.",
        "steps": [
          "Pasaj inceleme için alışılmış varlık hükmünü geçici durdurur.",
          "Bu, dünyanın yokluğunu kanıtladığı veya nesneyi fiziksel değiştirdiği anlamına gelmez."
        ],
        "optionReasons": [
          "Yöntem fiziksel işlem değildir.",
          "Alışılmış varlık hükmü askıya alınmaktadır.",
          "Askıya alma inkâr değildir.",
          "Öz araştırması bu otomatik özdeşlik değildir.",
          "Yöntem alışılmış hükmü kesinleştirmek değil geçici askıya almaktır."
        ],
        "commonError": "Paranteze almayı dünyanın yokluğunu ispatlamak veya nesneyi fiziksel olarak değiştirmek sayma.",
        "check": "Askıya alınan şeyin alışılmış varlık hükmü olduğunu denetle; onun tersinin kesin ilan edilmediğini kontrol et."
      }
    },
    {
      "passage": "Bir kişi hiç var olmayan bir masal yaratığını düşünüyor. Fenomenolojik yönelimsellik örneğinde bilinç yaşantısının bir şeye ilişkin oluşu vurgulanıyor.",
      "prompt": "Hangi sonuç uygundur?",
      "options": [
        "Bilincin bir içeriğe yönelmesi o içeriğin dış dünyada varlığını tek başına kanıtlamaz.",
        "Düşünülen her şey dış dünyada mutlaka vardır.",
        "Bilinç yaşantısının hiçbir içeriği olamaz.",
        "Hayal kurulduğunda düşünme ortadan kalkar.",
        "Her zihinsel içerik zorunlu ölçülebilir cisimdir."
      ],
      "answer": 0,
      "hint": "Yaşantının nesnesi ile nesnenin dış varlık statüsünü ayır.",
      "explanation": "Bilinç masal yaratığına ilişkin bir içerik taşır. İlişkin olma bilgisi yaratığın dış dünyada cisim olarak bulunduğunu kanıtlamaz. Bilinç yaşantısının masal yaratığına ilişkin oluşunu, yaratığın dış varlığı hakkında ayrı sorudan ayır.",
      "guidance": {
        "knowledge": [
          "Yönelimsellik bilinç yaşantısının bir şeye ilişkin oluşuyla ilgilidir."
        ],
        "strategy": "Yaşantının nesnesi ile nesnenin dış varlık statüsünü ayır.",
        "steps": [
          "Bilinç masal yaratığına ilişkin bir içerik taşır.",
          "İlişkin olma bilgisi yaratığın dış dünyada cisim olarak bulunduğunu kanıtlamaz."
        ],
        "optionReasons": [
          "Yönelme ve dış varlık ayrı sorulardır.",
          "Örnek bunu garanti etmez.",
          "Yaratığa yönelme açıkça verilmiştir.",
          "Düşünme yaşantısı sürer.",
          "Böyle varlık türü sonucu çıkmaz."
        ],
        "commonError": "Bir şeyi düşünme içeriği olarak vermeyi onun dış dünyada mutlaka bulunmasına dönüştürme.",
        "check": "Bilinç yaşantısının masal yaratığına ilişkin oluşunu, yaratığın dış varlığı hakkında ayrı sorudan ayır."
      }
    },
    {
      "passage": "Hartmann’ı tanıtan bir açıklama inorganik, organik, ruhsal ve tinsel katmanları gerçek varlık alanında ayırıyor; matematiksel ideal nesneleri ayrıca ele alıyor.",
      "prompt": "Hangi sınıflama bu açıklamayla uyumludur?",
      "options": [
        "Tinsel katman yalnız ideal matematiksel nesne demektir.",
        "Tinsel katman gerçek alan içindedir; ideal alanla özdeş değildir.",
        "Organik katman inorganik hiçbir koşula dayanmaz.",
        "Bütün katmanlar yalnız bir sözcüğün eş anlamıdır.",
        "İdeal nesneler zorunlu canlı hücrelerdir."
      ],
      "answer": 1,
      "hint": "Önce hangi alan, sonra o alanda hangi katman sorusunu sor.",
      "explanation": "Dört katman gerçek varlık alanında sayılmıştır; ideal nesneler ayrıca anılır. Bu nedenle tinsel ile ideal otomatik eş anlamlı yapılamaz. Önce gerçek-ideal alan ayrımını, sonra gerçek alandaki dört katmanı yaz; tinsel katmanın yerini denetle.",
      "guidance": {
        "knowledge": [
          "Hartmann’da gerçek varlığın katmanları ile ideal-gerçek ayrımı aynı eksen değildir."
        ],
        "strategy": "Önce hangi alan, sonra o alanda hangi katman sorusunu sor.",
        "steps": [
          "Dört katman gerçek varlık alanında sayılmıştır; ideal nesneler ayrıca anılır.",
          "Bu nedenle tinsel ile ideal otomatik eş anlamlı yapılamaz."
        ],
        "optionReasons": [
          "Verilen ayrımı siler.",
          "İki sınıflama ekseni korunur.",
          "Böyle bağımsızlık iddiası verilmez.",
          "Katman farkı açıkça kurulmuştur.",
          "Alanları karıştırır."
        ],
        "commonError": "Hartmann’ın tinsel katmanını ideal matematiksel varlık alanıyla özdeşleştirme.",
        "check": "Önce gerçek-ideal alan ayrımını, sonra gerçek alandaki dört katmanı yaz; tinsel katmanın yerini denetle."
      }
    },
    {
      "passage": "Bir dil incelemesi bir cümlenin anlamının yalnız sözlükteki tek sözcük karşılıklarıyla değil, kullanıldığı etkinlik ve kurallarla da ilişkili olduğunu söylüyor.",
      "prompt": "Geç dönem Wittgenstein’la ilişkilendirilen hangi odak burada öne çıkar?",
      "options": [
        "Her sözcüğün her bağlamda tek fiziksel nesneye zorunlu işaret etmesi",
        "Dilin hiçbir kurala sahip olamaması",
        "Bütün cümlelerin sadece laboratuvar ölçümü olması",
        "Dil kullanımı ve dil oyunları",
        "Anlamı kullanımından bağımsız tek bir nesne eşlemesine indirgeme"
      ],
      "answer": 3,
      "hint": "Aynı ifadenin hangi iş içinde nasıl kullanıldığına bak.",
      "explanation": "Pasaj sözlük karşılığının yanına kullanım etkinliği ve kuralı ekler. Bu yönelim anlamı dil oyunları bağlamıyla düşünmeye uygundur. Pasajdaki aynı sözün hangi iş içinde nasıl kullanıldığına bak; sözlük karşılığının tek ölçüt olmadığını kontrol et.",
      "guidance": {
        "knowledge": [
          "Dil oyunları farklı yaşam etkinlikleri içindeki kullanım ve kuralları düşünmeye yardımcı olur."
        ],
        "strategy": "Aynı ifadenin hangi iş içinde nasıl kullanıldığına bak.",
        "steps": [
          "Pasaj sözlük karşılığının yanına kullanım etkinliği ve kuralı ekler.",
          "Bu yönelim anlamı dil oyunları bağlamıyla düşünmeye uygundur."
        ],
        "optionReasons": [
          "Metin farklı kullanım kurallarını vurgular.",
          "Kurallar açıkça vardır.",
          "Kullanımlar bu kadar dar değildir.",
          "Anlamın kullanım bağlamı ele alınır.",
          "Metin aynı sözün farklı etkinlik ve kurallardaki kullanımını da dikkate alır."
        ],
        "commonError": "Anlamı yalnız sabit nesne eşlemesine indirgeyerek kullanım etkinliğini ve kuralını dışlama.",
        "check": "Pasajdaki aynı sözün hangi iş içinde nasıl kullanıldığına bak; sözlük karşılığının tek ölçüt olmadığını kontrol et."
      }
    },
    {
      "passage": "Bir görüşün erken döneminde dil ile dünya arasındaki mantıksal resmetme ilişkisi; sonraki döneminde ise kullanım çeşitliliği öne çıkıyor.",
      "prompt": "Bu bilgi nasıl okunmalıdır?",
      "options": [
        "Her iki dönem her cümlede bütünüyle aynı savı kurar.",
        "Sonraki dönem dilin hiç kullanılmadığını kanıtlar.",
        "Aynı düşünürün dönemleri arasında gerçek vurgu farkı vardır.",
        "Erken mantıksal resim yaklaşımının bütün sonraki kullanımları zaten aynı biçimde açıkladığı",
        "Dönemler varsa aralarında hiçbir tarihsel ilişki olamaz."
      ],
      "answer": 2,
      "hint": "İki dönemi ayrı soru ve yöntemle özetle.",
      "explanation": "İlk odak mantıksal resim, ikinci odak kullanımdaki çeşitliliktir. Bu fark korunursa ad ezberi görüşlerin birbirine karışmasını önler. Erken dönemin mantıksal resim odağı ile sonraki kullanım çeşitliliğini ayrı cümlelerde kur.",
      "guidance": {
        "knowledge": [
          "Bir düşünürün görüşünün zaman içindeki değişimi kavramların bağlamını etkiler."
        ],
        "strategy": "İki dönemi ayrı soru ve yöntemle özetle.",
        "steps": [
          "İlk odak mantıksal resim, ikinci odak kullanımdaki çeşitliliktir.",
          "Bu fark korunursa ad ezberi görüşlerin birbirine karışmasını önler."
        ],
        "optionReasons": [
          "Verilen fark silinir.",
          "Kullanım çeşitliliği bunun tersidir.",
          "İki odağı tek değişmez öğretiye indirmez.",
          "Metin sonraki dönemde kullanım çeşitliliğine gerçek vurgu değişimi verir.",
          "Değişim ilişkisizlik demek değildir."
        ],
        "commonError": "Bir düşünürün iki dönemini aynı ad geçtiği için tek değişmez sav gibi okuma.",
        "check": "Erken dönemin mantıksal resim odağı ile sonraki kullanım çeşitliliğini ayrı cümlelerde kur."
      }
    },
    {
      "passage": "Mantıkçı pozitivizmi tanıtan bir pasaj, deneyimsel anlam denetimini önemserken mantık ve matematiğin analitik önermelerini aynı türden doğa gözlemi saymaz.",
      "prompt": "Hangi yorum uygundur?",
      "options": [
        "Her anlamlı cümle mutlaka tek laboratuvar ölçüm raporudur.",
        "Anlam incelemesinde analitik ve deneyimsel önerme ayrımı önemlidir.",
        "Bütün metafizik savlar aynı yöntemle kanıtlanmıştır.",
        "Mantık ve matematik zorunlu anlamsız gürültüdür.",
        "Deneyim sözcüğü hiç incelenemez."
      ],
      "answer": 1,
      "hint": "Denetimin hangi önerme türüne nasıl uygulandığını sor.",
      "explanation": "Pasaj doğa savlarını deneyimle ilişkilendirir; mantıksal analitik alanı ayrıca tutar. Bu nedenle anlamlı her cümleyi bir ölçüm raporuna indirgemez. Analitik mantık ve matematik önermelerinin ayrıca anıldığını bul; önerme türlerini tek kategoriye indirmediğini denetle.",
      "guidance": {
        "knowledge": [
          "Mantıkçı pozitivizmde analitik önermelerle deneyime ilişkin savların statüsü ayrılır."
        ],
        "strategy": "Denetimin hangi önerme türüne nasıl uygulandığını sor.",
        "steps": [
          "Pasaj doğa savlarını deneyimle ilişkilendirir; mantıksal analitik alanı ayrıca tutar.",
          "Bu nedenle anlamlı her cümleyi bir ölçüm raporuna indirgemez."
        ],
        "optionReasons": [
          "Analitik önermeler bu daraltmaya karşıdır.",
          "Pasaj iki türün işlevini ayırır.",
          "Metin böyle sonuç vermez.",
          "Analitik alanın ayrı statüsü gözden kaçırılır.",
          "Pasaj deneyimsel denetimi önemser."
        ],
        "commonError": "Deneyimsel anlam denetiminden her anlamlı cümlenin tek ölçüm raporu olması sonucuna geçme.",
        "check": "Analitik mantık ve matematik önermelerinin ayrıca anıldığını bul; önerme türlerini tek kategoriye indirmediğini denetle."
      }
    },
    {
      "passage": "Bir kuramın belirli koşullarda hangi gözlemin kendisiyle çelişeceği açıkça söylenebiliyor. Henüz böyle bir gözlem yapılmamış.",
      "prompt": "Popper’ın ayrımı bakımından hangi sonuç uygundur?",
      "options": [
        "Yanlışlanabilir olduğu için zaten kesin yanlıştır.",
        "Kuram yanlışlanabilir olabilir; fiilen yanlışlandığı henüz söylenemez.",
        "Henüz çürütülmediği için sonsuza dek kesin doğrudur.",
        "Hiçbir gözlemle ilişkisi yoktur.",
        "Her doğru sav zorunlu bilimsel kuramdır."
      ],
      "answer": 1,
      "hint": "Olası karşı durumu gerçek gözlem kaydından ayır.",
      "explanation": "Kuram hangi bulguyla zorlanacağını açıklar ama o bulgu henüz kaydedilmemiştir. Bu nedenle test edilebilirlikten fiilî yanlışlığa veya kesin doğruluğa geçilemez. Olası çelişen koşulu ve gerçekten yapılmış gözlem kaydını iki ayrı sütun olarak düşün; hangisinin verildiğini denetle.",
      "guidance": {
        "knowledge": [
          "Yanlışlanabilirlik olası çelişen sınama koşuludur; yanlışlanmışlık gerçekleşen sonuçtur."
        ],
        "strategy": "Olası karşı durumu gerçek gözlem kaydından ayır.",
        "steps": [
          "Kuram hangi bulguyla zorlanacağını açıklar ama o bulgu henüz kaydedilmemiştir.",
          "Bu nedenle test edilebilirlikten fiilî yanlışlığa veya kesin doğruluğa geçilemez."
        ],
        "optionReasons": [
          "İmkân ile fiilî sonuç karıştırılır.",
          "Sınanabilirlik ve gerçekleşmiş sonuç ayrılır.",
          "Sınama böyle nihai güvence vermez.",
          "Çelişecek koşul açıkça verilmiştir.",
          "Doğruluk ve bilimsellik ölçütü özdeş değildir."
        ],
        "commonError": "Yanlışlanabilir olmayı zaten yanlışlanmış sayma; henüz çürütülmemeyi de kesin doğruluk yapma.",
        "check": "Olası çelişen koşulu ve gerçekten yapılmış gözlem kaydını iki ayrı sütun olarak düşün; hangisinin verildiğini denetle."
      }
    },
    {
      "passage": "Beş örneğin tamamı kırmızı görülüyor; yirmi örneklik grubun geri kalan on beşi incelenmemiştir. Sınanan sav grubun bütün üyelerinin kırmızı olduğudur.",
      "prompt": "Veriler neye yeter?",
      "options": [
        "Yirmi üyenin tümünün kesin kırmızı olduğunu kanıtlamaya",
        "İncelenen beş üyenin kırmızı olduğunu desteklemeye",
        "Savın fiilen yanlışlandığını söylemeye",
        "İncelenmeyen her üyenin kesin mavi olduğuna",
        "Bütün grubun kırmızı olmasının mantıken imkânsızlığına"
      ],
      "answer": 1,
      "hint": "Savın kapsadığı üyelerle gerçekten gözlenenleri sayısal olarak ayır.",
      "explanation": "Beş kırmızı kayıt elde edilmiştir; kalan on beşinin rengi bilinmez. Bu veri ne evrensel kesin doğrulama ne gerçek karşı örnek sunar. Beş olumlu kayıt ve on beş bilinmeyeni ayrı say; ne kesin doğrulama ne karşı örnek verilmiş olduğunu kontrol et.",
      "guidance": {
        "knowledge": [
          "Sınırlı doğrulayıcı örnekler evrensel savın bütün kapsamını tek başına tüketmez."
        ],
        "strategy": "Savın kapsadığı üyelerle gerçekten gözlenenleri sayısal olarak ayır.",
        "steps": [
          "Beş kırmızı kayıt elde edilmiştir; kalan on beşinin rengi bilinmez.",
          "Bu veri ne evrensel kesin doğrulama ne gerçek karşı örnek sunar."
        ],
        "optionReasons": [
          "On beş üye bilinmiyor.",
          "Gözlemin kapsadığı üyeler budur.",
          "Karşı örnek kaydedilmemiştir.",
          "Bilinmeyene özellik atanamaz.",
          "Böyle çelişki verilmez."
        ],
        "commonError": "İncelenmemiş üyeleri sessizce kırmızı veya mavi kabul ederek kanıt kapsamını tamamlama.",
        "check": "Beş olumlu kayıt ve on beş bilinmeyeni ayrı say; ne kesin doğrulama ne karşı örnek verilmiş olduğunu kontrol et."
      }
    },
    {
      "passage": "Bir deneyde kuramın beklediği sonuca aykırı ölçüm çıkıyor. Ölçüm aracının ayarı ve yardımcı kabuller de sonucun elde edilmesinde kullanılmıştır.",
      "prompt": "Bilimsel değerlendirmede hangi adım uygundur?",
      "options": [
        "Tek sayıyı görür görmez bütün bilimi kesin yanlış ilan etmek",
        "Aykırılığı kuram, araç ve yardımcı kabullerle birlikte incelemek",
        "Aykırı veriyi gerekçesiz gizlemek",
        "Kuramın asla hiçbir koşulda sorgulanamayacağını söylemek",
        "Aracın mutlaka kusursuz olduğunu önceden kabul etmek"
      ],
      "answer": 1,
      "hint": "Hangi kabul zincirinin ölçüm sonucuna katkı verdiğini aç.",
      "explanation": "Aykırılık ciddiye alınır ama kaynağının nerede olduğu ayrıca araştırılır. Bu tutum ne kuramı dokunulmaz yapar ne tek kaydı bütün bilimin çöküşü sayar. Ölçüm aracı, yardımcı kabul ve kuramı hangi ayrı adımlarla inceleyebileceğini metindeki koşullardan çıkar.",
      "guidance": {
        "knowledge": [
          "Gerçek kuram sınamaları ölçüm ve yardımcı varsayımları da içerir."
        ],
        "strategy": "Hangi kabul zincirinin ölçüm sonucuna katkı verdiğini aç.",
        "steps": [
          "Aykırılık ciddiye alınır ama kaynağının nerede olduğu ayrıca araştırılır.",
          "Bu tutum ne kuramı dokunulmaz yapar ne tek kaydı bütün bilimin çöküşü sayar."
        ],
        "optionReasons": [
          "Sonucun kapsamı aşırı genişletilir.",
          "Sınama bir kabuller ağı içinde yapılmıştır.",
          "Bu sınamayı engeller.",
          "Bilimsel denetim kapanır.",
          "Ayara ilişkin inceleme gereği verilmiştir."
        ],
        "commonError": "Bir aykırı ölçümü ya gizleme ya da bütün bilimin çöküşü sayma ikilemine sıkışma.",
        "check": "Ölçüm aracı, yardımcı kabul ve kuramı hangi ayrı adımlarla inceleyebileceğini metindeki koşullardan çıkar."
      }
    },
    {
      "passage": "Kuhn’u tanıtan bir metin, araştırmacı topluluğunun ortak örnekler, problem çözme yolları ve ölçütler içinde olağan araştırma yapabildiğini söylüyor.",
      "prompt": "Bu ortak çerçeve hangi kavramla ilişkilidir?",
      "options": [
        "Doğrulanabilirlik ilkesi",
        "Yanlışlanabilirlik",
        "Paradigma",
        "Paranteze alma",
        "Yönelimsellik"
      ],
      "answer": 2,
      "hint": "Ortaklığı sağlayan örnek, yöntem ve ölçütleri birlikte oku.",
      "explanation": "Topluluk belirli problemleri paylaşılan yollarla çözmektedir. Bu olağan araştırmanın paradigma çerçevesiyle anlaşılmasını sağlar. Ortak örnek, problem çözme yolu ve ölçütlerin aynı araştırma topluluğunu nasıl bağladığını göster.",
      "guidance": {
        "knowledge": [
          "Kuhn’un paradigma kavramı yalnız tek önerme değil araştırma topluluğunun paylaştığı çerçeveyi de anlatır."
        ],
        "strategy": "Ortaklığı sağlayan örnek, yöntem ve ölçütleri birlikte oku.",
        "steps": [
          "Topluluk belirli problemleri paylaşılan yollarla çözmektedir.",
          "Bu olağan araştırmanın paradigma çerçevesiyle anlaşılmasını sağlar."
        ],
        "optionReasons": [
          "Bu önerme ve deneyim ilişkisinde anlam ölçütü tartışmasıdır; ortak araştırma çerçevesi kavramı değildir.",
          "Bu olası karşı sınama koşuluna yönelir; ortak örnek ve yöntemlerin bütününü adlandırmaz.",
          "Ortak örnek ve problem çözme çerçevesidir.",
          "Bu fenomenolojik yargı askısına yönelir; Kuhn’un araştırma çerçevesi değildir.",
          "Bu bilincin bir şeye ilişkin oluşuyla ilgilidir; topluluğun bilimsel çerçevesi değildir."
        ],
        "commonError": "Paradigmayı tek bir savın yanlışlanabilirliği veya bilincin yönelimselliğiyle karıştırma.",
        "check": "Ortak örnek, problem çözme yolu ve ölçütlerin aynı araştırma topluluğunu nasıl bağladığını göster."
      }
    },
    {
      "passage": "Kuhn’u anlatan pasajda çözülemeyen aykırılıkların birikmesi ve alternatif çerçevelerle kriz yaşanması ele alınıyor. Her küçük hata anında devrim sayılmıyor.",
      "prompt": "Hangi yorum uygundur?",
      "options": [
        "Bilimsel değişim kimi durumlarda çerçeve dönüşümünü içerebilir.",
        "Her tek hatalı ölçüm otomatik bilimsel devrimdir.",
        "Bilim tarihinde hiçbir ortak çalışma yapılamaz.",
        "Bütün dönemlerde bütün ölçütler zorunlu aynıdır.",
        "Her yeni sav sırf yeni olduğu için üstündür."
      ],
      "answer": 0,
      "hint": "Aykırı kayıt ile çerçevenin dönüşmesini ayrı aşamalar olarak düşün.",
      "explanation": "Pasaj kimi krizlerde paylaşılan çerçevenin değişmesini inceler. Bu, her küçük yanlışlığı anında devrim saymak değildir. Metindeki biriken aykırılık, kriz ve alternatif çerçeve unsurlarını ayrı bul; tek kayıtla otomatik devrim varsayma.",
      "guidance": {
        "knowledge": [
          "Kuhn’un olağan bilim, aykırılık, kriz ve devrim kavramları aynı tek olay etiketi değildir."
        ],
        "strategy": "Aykırı kayıt ile çerçevenin dönüşmesini ayrı aşamalar olarak düşün.",
        "steps": [
          "Pasaj kimi krizlerde paylaşılan çerçevenin değişmesini inceler.",
          "Bu, her küçük yanlışlığı anında devrim saymak değildir."
        ],
        "optionReasons": [
          "Kriz ve alternatif çerçeve bilgisi korunur.",
          "Metin bunu açıkça reddeder.",
          "Olağan araştırma imkânı dışlanmamıştır.",
          "Çerçeve dönüşümü bu genellemeyi desteklemez.",
          "Böyle doğruluk ölçütü verilmez."
        ],
        "commonError": "Her küçük hatalı kayda bilimsel devrim adını vererek kriz ve çerçeve dönüşümünü silme.",
        "check": "Metindeki biriken aykırılık, kriz ve alternatif çerçeve unsurlarını ayrı bul; tek kayıtla otomatik devrim varsayma."
      }
    },
    {
      "passage": "Bergson’u tanıtan metin saatle eşit parçalara bölünen ölçülebilir zamanla, yaşanan deneyimin nitelikçe birbirine geçen süresini ayırıyor.",
      "prompt": "Hangi kavram ikinci odağı karşılar?",
      "options": [
        "Yalnız aynı uzunlukta fiziksel cetvel parçaları",
        "Yaşanan zamanın her durumda saat aralıklarıyla aynı nitelikte olması",
        "Hiçbir deneyimin yaşanmaması",
        "Süre",
        "Her sezginin otomatik bilimsel ölçüm oluşu"
      ],
      "answer": 3,
      "hint": "Sayısal ölçümle niteliksel yaşantının sorularını ayır.",
      "explanation": "Saat parçaları nicel ölçüme, birbirine geçen yaşantı süreye örnektir. Bu ayrım saati geçersiz kılmaz; inceleme odağının farkını gösterir. Saatin nicel parçaları ile yaşantının iç içe geçen niteliklerini karşılaştır; ayrımın saati kullanmayı yasaklamadığını denetle.",
      "guidance": {
        "knowledge": [
          "Bergson’un süre kavramı yaşanan zamanı sadece homojen parça toplamı saymaz."
        ],
        "strategy": "Sayısal ölçümle niteliksel yaşantının sorularını ayır.",
        "steps": [
          "Saat parçaları nicel ölçüme, birbirine geçen yaşantı süreye örnektir.",
          "Bu ayrım saati geçersiz kılmaz; inceleme odağının farkını gösterir."
        ],
        "optionReasons": [
          "Bu ölçülebilir bölümlenme tarafıdır.",
          "Bu niteliksel süre ile homojen ölçüm ayrımını siler.",
          "Yaşantı açıkça ele alınır.",
          "Yaşanan niteliksel devamlılık vurgulanır.",
          "İki yöntem aynılaştırılmamıştır."
        ],
        "commonError": "Niteliksel süreyi yalnız saat aralıklarının aynı nitelikte toplamı olarak okuma.",
        "check": "Saatin nicel parçaları ile yaşantının iç içe geçen niteliklerini karşılaştır; ayrımın saati kullanmayı yasaklamadığını denetle."
      }
    },
    {
      "passage": "Sartre’ı tanıtan bir açıklama insanın seçimleriyle kendini kurmasını vurguluyor; kişinin bedenini, geçmişini ve her dış olayı istediği gibi yaratabildiğini söylemiyor.",
      "prompt": "Özgürlük hangi yorumla daha doğru aktarılır?",
      "options": [
        "Verili durum içinde seçim ve sorumluluk",
        "Bütün fiziksel olguları iradeyle değiştirebilme",
        "Hiçbir seçimin hiçbir öneminin olmaması",
        "Herkesin her olaydan aynı hukuki suçla sorumlu olması",
        "İnsanların doğuştan tek sabit mesleğe mahkûm olması"
      ],
      "answer": 0,
      "hint": "Kişinin seçtiği ile verili olanı ayrı yaz.",
      "explanation": "Pasaj insanın durumuna verdiği yönü ve sorumluluğunu öne çıkarır. Bu, kişinin her dış olayı sınırsız kontrol etmesi anlamına gelmez. Metindeki verili koşulları ve kişinin bu koşullar içinde verdiği yönü ayrı yaz; hukuki suç genellemesi ekleme.",
      "guidance": {
        "knowledge": [
          "Varoluşçu özgürlük öğretiminde seçim ve sorumluluk, verili koşullar inkâr edilmeden tartışılır."
        ],
        "strategy": "Kişinin seçtiği ile verili olanı ayrı yaz.",
        "steps": [
          "Pasaj insanın durumuna verdiği yönü ve sorumluluğunu öne çıkarır.",
          "Bu, kişinin her dış olayı sınırsız kontrol etmesi anlamına gelmez."
        ],
        "optionReasons": [
          "Koşullar ile seçme ilişkisi birlikte korunur.",
          "Metin bunu dışlar.",
          "Kendini kurma vurgusuyla çelişir.",
          "Böyle sınırsız hukuk sonucu verilmez.",
          "Seçim vurgusunu tersine çevirir."
        ],
        "commonError": "Seçim özgürlüğünü beden, geçmiş ve bütün dış olayları sınırsız yaratma gücü sanma.",
        "check": "Metindeki verili koşulları ve kişinin bu koşullar içinde verdiği yönü ayrı yaz; hukuki suç genellemesi ekleme."
      }
    },
    {
      "passage": "Beauvoir’ı tanıtan metin, kişinin özgürlük imkânlarının toplumsal ilişkiler ve başkalarının durumuyla bağlantısını inceliyor.",
      "prompt": "Bu açıklamanın vurgusu hangisidir?",
      "options": [
        "Özgürlüğün somut durum ve başkalarıyla ilişkisi",
        "Her bireyin toplumdan tamamen kopuk oluşu",
        "Hiçbir kişinin eylemde bulunamaması",
        "Toplumsal koşul varsa bütün kişisel sorumluluğun otomatik yokluğu",
        "Bütün kişilerin koşulları ne olursa olsun aynı somut imkânlara sahip olması"
      ],
      "answer": 0,
      "hint": "Özgürlük imkânını etkileyen bağları metinden çıkar.",
      "explanation": "Metin toplumsal koşullar ve başkalarıyla bağlantıyı görünür kılar. Bu, ne bütün seçimi yok eder ne de koşulları yok sayan sınırsız güç iddiasıdır. İmkânları etkileyen bağları göster; bu bağların metinde sorumluluğu ve eylemi kesin sıfırlamadığını kontrol et.",
      "guidance": {
        "knowledge": [
          "Durumsal özgürlük tartışması seçimi gerçek imkân ve ilişkiler içinde düşünür."
        ],
        "strategy": "Özgürlük imkânını etkileyen bağları metinden çıkar.",
        "steps": [
          "Metin toplumsal koşullar ve başkalarıyla bağlantıyı görünür kılar.",
          "Bu, ne bütün seçimi yok eder ne de koşulları yok sayan sınırsız güç iddiasıdır."
        ],
        "optionReasons": [
          "Yalıtılmış soyut kişi yerine koşullar ele alınır.",
          "Metin bağlantıyı açıkça kurar.",
          "Böyle kesin edilginlik söylenmez.",
          "Bu sonuç verilmemiştir.",
          "Toplumsal ilişkilerin imkânları etkilediği bilgisi bu koşulsuz eşitliği desteklemez."
        ],
        "commonError": "Durumsal özgürlükte toplumsal koşulları ya tamamen silme ya da bütün seçimi otomatik yok sayma.",
        "check": "İmkânları etkileyen bağları göster; bu bağların metinde sorumluluğu ve eylemi kesin sıfırlamadığını kontrol et."
      }
    },
    {
      "passage": "Bir metin Nietzsche’nin değerlerin kökenini ve yaşama etkisini sorguladığını anlatıyor; bunu bir ırkın üstünlüğü veya şiddet buyruğu diye sunmuyor.",
      "prompt": "En uygun okuma hangisidir?",
      "options": [
        "Her türlü şiddetin koşulsuz doğrulanması",
        "Değer eleştirisi ve kendini aşma problemi",
        "Biyolojik bir ırkın kesin üstünlüğünün ölçülmesi",
        "Bütün değerlerin kaynak araştırmasının yasaklanması",
        "Yerleşik bütün değerlerin kökeninin eleştiriden muaf olması"
      ],
      "answer": 1,
      "hint": "Değer sözcüğünün hangi problem içinde kullanıldığını belirle.",
      "explanation": "Metin ahlaki ve kültürel değerlerin kökenini sorguluyor. Bu felsefi eleştiriye verilmeyen biyolojik üstünlük veya şiddet buyruğu eklenmemelidir. Pasajın değerlerin kökeni ve yaşama etkisini sorguladığını göster; verilmeyen ırk ölçütünü cevabına katma.",
      "guidance": {
        "knowledge": [
          "Nietzsche’nin değer eleştirisi kaynak, güç ve yaşam ilişkileriyle incelenir; ırksal üstünlük formülüne indirgenmez."
        ],
        "strategy": "Değer sözcüğünün hangi problem içinde kullanıldığını belirle.",
        "steps": [
          "Metin ahlaki ve kültürel değerlerin kökenini sorguluyor.",
          "Bu felsefi eleştiriye verilmeyen biyolojik üstünlük veya şiddet buyruğu eklenmemelidir."
        ],
        "optionReasons": [
          "Metinde böyle buyruk yoktur.",
          "Verilen felsefi soru bu odağa yönelir.",
          "Böyle bilimsel iddia verilmez.",
          "Metin kaynakları sorgular.",
          "Metin tam da değerlerin köken ve etkisini sorgular."
        ],
        "commonError": "Nietzsche’nin değer eleştirisini biyolojik üstünlük veya koşulsuz şiddet buyruğuna dönüştürme.",
        "check": "Pasajın değerlerin kökeni ve yaşama etkisini sorguladığını göster; verilmeyen ırk ölçütünü cevabına katma."
      }
    },
    {
      "passage": "Whitehead’i ele alan bir tarih notu onu matematik ve süreç düşüncesiyle ilişkilendiriyor; bir başka listede sırf matematik çalıştığı için Viyana Çevresi’nin mantıkçı pozitivisti sayılıyor.",
      "prompt": "İkinci sınıflamanın sorunu nedir?",
      "options": [
        "Whitehead’in hiçbir matematik çalışması yapmadığının kanıtlanması",
        "Bir düşünürün matematik ve felsefeyle birlikte ilgilenememesi",
        "Tarihsel kişilerin hiçbir görüşünün incelenememesi",
        "Süreç düşüncesinin mantıkçı pozitivizmle tanım gereği özdeş olması",
        "Tek ortak çalışma alanından farklı felsefi üyelik sonucu çıkarılıyor."
      ],
      "answer": 4,
      "hint": "Kişinin çalışma alanıyla felsefi öğretisini ayrı gerekçelendir.",
      "explanation": "İlk not matematik ve süreç odağını verir; ikinci liste yalnız matematikten okul üyeliğine geçer. Bu geçiş için görüş ve tarihsel ilişki kanıtı eksiktir. Whitehead’in verilen süreç odağını koru; okul üyeliği için görüş ve tarihsel ilişki dayanağının eksikliğini göster.",
      "guidance": {
        "knowledge": [
          "Ortak bir konuya ilgi duymak aynı okulun bütün savlarını paylaşmak değildir."
        ],
        "strategy": "Kişinin çalışma alanıyla felsefi öğretisini ayrı gerekçelendir.",
        "steps": [
          "İlk not matematik ve süreç odağını verir; ikinci liste yalnız matematikten okul üyeliğine geçer.",
          "Bu geçiş için görüş ve tarihsel ilişki kanıtı eksiktir."
        ],
        "optionReasons": [
          "Metin bunun tersini belirtir.",
          "İlk not iki katkıyı birlikte verir; birlikte çalışma imkânsızlığı öne sürmez.",
          "Kaynak karşılaştırması mümkündür.",
          "İki yönelim sırf aynı kişinin matematik çalışması nedeniyle özdeşleştirilemez.",
          "Matematik çalışmak o akımı benimsemeyi tek başına göstermez."
        ],
        "commonError": "Matematik çalışmayı tek başına mantıkçı pozitivizm üyeliğinin kanıtı sayma.",
        "check": "Whitehead’in verilen süreç odağını koru; okul üyeliği için görüş ve tarihsel ilişki dayanağının eksikliğini göster."
      }
    },
    {
      "passage": "Bir Türkiye felsefe tarihi metni Gökberk’in felsefe tarihi ve Aydınlanma çalışmalarıyla, Kuçuradi’nin insan hakları ve doğru değerlendirme çalışmalarıyla katkı verdiğini anlatıyor.",
      "prompt": "Bu bilgiyi hangi yöntem korur?",
      "options": [
        "Yalnız adları aynı oldukları için tek kişiye indirmek",
        "Birinin katkısını bütün diğerlerine aynen yüklemek",
        "Türkiye’de daha önce hiç düşünce üretilmediğini söylemek",
        "Düşünürleri somut problem ve katkılarıyla eşleştirmek",
        "Bir kişinin varlığıyla bütün görüşlerini kesin doğru saymak"
      ],
      "answer": 3,
      "hint": "Her adın yanında hangi somut incelemenin verildiğini tut.",
      "explanation": "Gökberk ve Kuçuradi için farklı problem odakları belirtilir. Bu bilgi ad ezberi yerine düşünsel katkı ilişkisi kurmayı sağlar. Gökberk’in tarih ve Aydınlanma, Kuçuradi’nin insan hakları ve değerlendirme odağını ayrı eşleştir.",
      "guidance": {
        "knowledge": [
          "Felsefe tarihi çalışırken ad, problem, eser veya katkı bağını kurmak gerekir."
        ],
        "strategy": "Her adın yanında hangi somut incelemenin verildiğini tut.",
        "steps": [
          "Gökberk ve Kuçuradi için farklı problem odakları belirtilir.",
          "Bu bilgi ad ezberi yerine düşünsel katkı ilişkisi kurmayı sağlar."
        ],
        "optionReasons": [
          "İki farklı düşünür vardır.",
          "Somut alan eşleştirmeleri karışır.",
          "Metin böyle tarihsel yokluk iddiası taşımaz.",
          "İki katkının farkı korunur.",
          "Katkıyı tanımak doğruluk garantisi değildir."
        ],
        "commonError": "İki farklı düşünürün somut katkılarını ad benzerliği veya dönem nedeniyle birbirine aktarma.",
        "check": "Gökberk’in tarih ve Aydınlanma, Kuçuradi’nin insan hakları ve değerlendirme odağını ayrı eşleştir."
      }
    },
    {
      "passage": "Bir araştırmada bir kadın filozofun adının geleneksel listelerde az görünmesinin düşünsel katkısının yokluğu anlamına gelmediği; gerçek eser ve koşullara bakılması gerektiği söyleniyor.",
      "prompt": "Bu yaklaşımın dayanağı hangisidir?",
      "options": [
        "Listede olmayan herkesin bütün savlarının kesin doğru olması",
        "Listede görünürlük ile katkının varlığını ayrı araştırmak",
        "Bütün tarihsel eserlerin otomatik aynı görüşte olması",
        "Hiçbir kaynağa bakmadan adları rastgele eklemek",
        "Her eksikliğin tek kişi tarafından kasıtlı yapıldığını kanıtlamak"
      ],
      "answer": 1,
      "hint": "Yokluk iddiasının hangi kanıta dayandığını kontrol et.",
      "explanation": "Metin geleneksel listenin kapsamının sınırlı olabileceğini gösterir. Katkı, gerçek eser ve tarihsel koşullarla araştırılmalıdır; varsayımla onay veya inkâr edilmez. İddianı gerçek eser ve tarihsel koşullarla sınayacak bilgiyi sor; listenin kapsamını tüm üretimle eşitleme.",
      "guidance": {
        "knowledge": [
          "Kaynak listesi kapsamı ile tarihsel üretimin tamamı aynı şey değildir."
        ],
        "strategy": "Yokluk iddiasının hangi kanıta dayandığını kontrol et.",
        "steps": [
          "Metin geleneksel listenin kapsamının sınırlı olabileceğini gösterir.",
          "Katkı, gerçek eser ve tarihsel koşullarla araştırılmalıdır; varsayımla onay veya inkâr edilmez."
        ],
        "optionReasons": [
          "Görünmezlik doğruluk güvencesi değildir.",
          "Eksik temsil otomatik yokluk kanıtı değildir.",
          "Metin gerçek farkların araştırılmasını ister.",
          "Gerçek eser incelemesi açıkça istenir.",
          "Niyet hakkında böyle veri yoktur."
        ],
        "commonError": "Bir listede az görünmeyi katkı yokluğu sayma; görünmeme durumunu da bütün savların doğruluğu yapma.",
        "check": "İddianı gerçek eser ve tarihsel koşullarla sınayacak bilgiyi sor; listenin kapsamını tüm üretimle eşitleme."
      }
    },
    {
      "passage": "Yirmi üyelik bir grubun incelenen kayıtlarında yalnız Ece’nin koşulu sağladığı görülüyor; diğer üyeler hakkında veri yok. Sav en az bir üyenin koşulu sağladığıdır.",
      "prompt": "Bu sınırlı sav için hangi karar uygundur?",
      "options": [
        "Bütün üyelerin incelenmesi mutlaka şarttır.",
        "İncelenmeyenlerin hepsinin olumsuz olduğu kanıtlanmıştır.",
        "Ece olumluysa bütün üyeler zorunlu olumludur.",
        "Hiçbir sonuca ulaşılamaz.",
        "Bir açık olumlu örnek yeterlidir."
      ],
      "answer": 4,
      "hint": "Savdaki niceleyiciyi gerçek kaydın kapsamıyla eşleştir.",
      "explanation": "Ece’nin kaydı en az bir olumlu üye bulunduğunu gösterir. Diğerleri bilinmiyor olsa da verilen sınırlı sav için bu tanık yeterlidir. Ece’nin olumlu kaydını sınırlı savın tanığı olarak göster; diğer üyelerin bilinmeyen durumunu değiştirmediğini denetle.",
      "guidance": {
        "knowledge": [
          "En az bir ile bütün nicelemeleri farklı kanıt kapsamı ister."
        ],
        "strategy": "Savdaki niceleyiciyi gerçek kaydın kapsamıyla eşleştir.",
        "steps": [
          "Ece’nin kaydı en az bir olumlu üye bulunduğunu gösterir.",
          "Diğerleri bilinmiyor olsa da verilen sınırlı sav için bu tanık yeterlidir."
        ],
        "optionReasons": [
          "Bu evrensel savın gereğiyle karışır.",
          "Bilinmeyene değer atanamaz.",
          "Tek örnek evrensellik vermez.",
          "En az bir koşulunun açık tanığı vardır.",
          "Varoluşsal sav bir tanıkla karşılanır."
        ],
        "commonError": "En az bir savı için gereken tanığı bütün grubun incelenmesi koşuluyla karıştırma.",
        "check": "Ece’nin olumlu kaydını sınırlı savın tanığı olarak göster; diğer üyelerin bilinmeyen durumunu değiştirmediğini denetle."
      }
    }
  ],
  [
    {
      "passage": "Ece bir zil sesini doğrudan işitiyor. Sesin kaynağının kapıdaki düzenek olduğu sonucuna ise daha sonra ses yönü ve başka bilgilerle ulaşıyor.",
      "prompt": "İlk edinim ile sonraki işlem nasıl ayrılır?",
      "options": [
        "İkisi de yalnız başka kişinin haberidir.",
        "İlk işitme bütün kaynak ihtimallerini tek başına kesin dışlar.",
        "Akıl yürütme hiçbir veriye dayanamaz.",
        "Duyusal veri her koşulda yanlış olmak zorundadır.",
        "İşitme duyusal veri, kaynağı belirleme akıl yürütmedir."
      ],
      "answer": 4,
      "hint": "Doğrudan ne edinildiğini ve sonradan ne çıkarıldığını ayır.",
      "explanation": "Ece sesi doğrudan işitir; düzenek sonucunu yön ve ek bilgiyle kurar. Bu nedenle kaynak yargısı yalnız çıplak işitmenin aynısı değildir. Ece’nin işittiği sesi, yön ve ek bilgiyle ulaştığı düzenek sonucundan ayrı göster.",
      "guidance": {
        "knowledge": [
          "Duyu edinimi ile o veriden kurulan yargı aynı aşama değildir."
        ],
        "strategy": "Doğrudan ne edinildiğini ve sonradan ne çıkarıldığını ayır.",
        "steps": [
          "Ece sesi doğrudan işitir; düzenek sonucunu yön ve ek bilgiyle kurar.",
          "Bu nedenle kaynak yargısı yalnız çıplak işitmenin aynısı değildir."
        ],
        "optionReasons": [
          "İlk veri doğrudan işitilmiştir.",
          "Kaynak ayrıca belirlenmektedir.",
          "Sonraki işlem veri kullanır.",
          "Böyle evrensel ret verilmemiştir.",
          "Veri ve ona dayanan çıkarım ayrı gösterilir."
        ],
        "commonError": "Sesi doğrudan işitmenin kaynağın kimliği ve bütün anlamını da hazır verdiğini sanma.",
        "check": "Ece’nin işittiği sesi, yön ve ek bilgiyle ulaştığı düzenek sonucundan ayrı göster."
      }
    },
    {
      "passage": "Bir öğrenci uzaktaki gözleme katılmamış; raporu kimin yazdığını, ölçüm yöntemini ve başka kayıtlarla uyumunu inceliyor.",
      "prompt": "Öğrencinin yaptığı hangi incelemedir?",
      "options": [
        "Doğrudan kendi duyusuyla aynı olayı görme",
        "Her aktarılan bilginin zorunlu yalan olduğunu ispatlama",
        "Haberin güvenilirliğini kaynak ve kanıtla değerlendirme",
        "Yalnız çoğaltılma sayısını doğruluğa eşitleme",
        "Aktarımı kendi doğrudan hatırası olarak kabul etme"
      ],
      "answer": 2,
      "hint": "Olayın kendisini görme ile raporun dayanağını incelemeyi ayır.",
      "explanation": "Öğrenci doğrudan gözlemci değildir; raporu kaynak ve yöntem bakımından denetler. Bu, haberin güvenilirlik araştırmasıdır, otomatik kabul veya ret değildir. Öğrencinin olaya katılmadığı bilgisini koru; yazar kimliği, yöntem ve kayıt uyumunun neden incelendiğini göster.",
      "guidance": {
        "knowledge": [
          "Haber yoluyla edinimde kaynak, aktarım ve doğrulama koşulları önemlidir."
        ],
        "strategy": "Olayın kendisini görme ile raporun dayanağını incelemeyi ayır.",
        "steps": [
          "Öğrenci doğrudan gözlemci değildir; raporu kaynak ve yöntem bakımından denetler.",
          "Bu, haberin güvenilirlik araştırmasıdır, otomatik kabul veya ret değildir."
        ],
        "optionReasons": [
          "Öğrenci gözleme katılmamıştır.",
          "Güven denetimi toplu ret değildir.",
          "Aktarımın kimliği ve dayanağı sorgulanır.",
          "Kaynak ve yöntem ayrıca incelenmektedir.",
          "Öğrenci olaya katılmadığını bilir; başkasının kaydını kaynak bakımından inceler."
        ],
        "commonError": "Başkasının raporunu denetlemeyi olayı kendi gözüyle görmüş olmak gibi sunma.",
        "check": "Öğrencinin olaya katılmadığı bilgisini koru; yazar kimliği, yöntem ve kayıt uyumunun neden incelendiğini göster."
      }
    },
    {
      "passage": "Bir haber aynı ilk paylaşımın binlerce kez kopyalanmasıyla yayılıyor. Bağımsız kaynak veya aktarım zinciri hakkında bilgi yok.",
      "prompt": "Dinî bilgi öğretimindeki mütevatir haber kavramı bakımından hangi değerlendirme uygundur?",
      "options": [
        "Kopya sayısı tek başına ilgili güvenilirlik koşullarını göstermez.",
        "Çok paylaşım her durumda kesin mütevatirliktir.",
        "Birden çok kişi konuşursa her haber zorunlu yanlıştır.",
        "Kaynak zinciri hiçbir incelemede önemli değildir.",
        "Haberi okuyan herkesin aynı inancı taşıdığı kanıtlanmıştır."
      ],
      "answer": 0,
      "hint": "Kaç kopya var sorusuyla kaç bağımsız aktarım var sorusunu ayır.",
      "explanation": "Veri binlerce kopyanın tek ilk paylaşımdan çıktığını söyler. Bu sayı ilgili bağımsızlık ve güvenilirlik koşullarını tek başına sağlamaz. Binlerce kopyanın aynı ilk kaynağa döndüğünü bul; bağımsız zincir hakkında veri verilmediğini denetle.",
      "guidance": {
        "knowledge": [
          "Mütevatir haber sırf aynı kaydın çok kopyalanması anlamına gelmez; aktarım koşulları incelenir."
        ],
        "strategy": "Kaç kopya var sorusuyla kaç bağımsız aktarım var sorusunu ayır.",
        "steps": [
          "Veri binlerce kopyanın tek ilk paylaşımdan çıktığını söyler.",
          "Bu sayı ilgili bağımsızlık ve güvenilirlik koşullarını tek başına sağlamaz."
        ],
        "optionReasons": [
          "Çokluk ile bağımsız aktarım koşulları aynı değildir.",
          "Kaynak koşulları eksiktir.",
          "Ters genelleme de dayanaksızdır.",
          "Güvenilirlikte önem taşıyabilir.",
          "Okumak benimsemek değildir."
        ],
        "commonError": "Tek ilk paylaşımın çok kopyasını bağımsız aktarım çoğunluğuyla eşitleme.",
        "check": "Binlerce kopyanın aynı ilk kaynağa döndüğünü bul; bağımsız zincir hakkında veri verilmediğini denetle."
      }
    },
    {
      "passage": "MEBİ’nin İslam düşüncesi çerçevesini anlatan bir bölüm, doğru bilgi yollarını selim akıl, doğru haber ve sağlıklı duyular olarak ele alıyor.",
      "prompt": "Bu sınıflama nasıl okunmalıdır?",
      "options": [
        "Bilgi edinmenin farklı dayanakları ayırt edilmektedir.",
        "Duyular fiziksel olarak haber cümlesinin içinde bulunur.",
        "Her duyusal veri tek başına bütün inanç hükümlerini kanıtlar.",
        "Bu yolların her kullanımı otomatik hatasızdır.",
        "Akıl hiçbir duyusal veriyi kullanamaz."
      ],
      "answer": 0,
      "hint": "Her yolun hangi tür edinime dayandığını örnekle.",
      "explanation": "Akıl yürütme, aktarım ve duyusal edinim farklı dayanaklar sunar. Birlikte kullanılabilseler de tek bir değişmez iç içe kutu kuralına indirgenmezler. Akıl, haber ve duyu için ayrı edinim işlevi yaz; birlikte kullanılmalarının ayrımı silmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Bilgi yollarının ayrılması aralarında hiç ilişki olmaması veya birinin ötekini fiziksel içermesi demek değildir."
        ],
        "strategy": "Her yolun hangi tür edinime dayandığını örnekle.",
        "steps": [
          "Akıl yürütme, aktarım ve duyusal edinim farklı dayanaklar sunar.",
          "Birlikte kullanılabilseler de tek bir değişmez iç içe kutu kuralına indirgenmezler."
        ],
        "optionReasons": [
          "Kaynak yolları işlevleriyle karşılaştırılır.",
          "Kavramsal ilişki fiziksel içerme değildir.",
          "Kaynak kapasitesi aşırı genişletilir.",
          "Sağlıklı ve doğru koşulları denetim gerektirir.",
          "Yolların birlikte işlemesi mümkündür."
        ],
        "commonError": "Üç bilgi yolunu birbirinin fiziksel içine giren katı kutular veya her kullanımda hatasız kaynaklar sayma.",
        "check": "Akıl, haber ve duyu için ayrı edinim işlevi yaz; birlikte kullanılmalarının ayrımı silmediğini kontrol et."
      }
    },
    {
      "passage": "Bir kişi bir konuda doğru bilgiye sahip olduğu hâlde o bilgiye uygun davranmıyor. Örnekte bilme ile uygulama ayrı veriliyor.",
      "prompt": "Hangi çıkarım doğrudur?",
      "options": [
        "Uygun davranmayan hiç kimse hiçbir doğru bilgi bilemez.",
        "Bilme ile uygun eylemin her durumda aynı olay olması",
        "Bütün davranışlar yalnız bilgi eksikliğinden kaynaklanır.",
        "Bilgi ile eylem hakkında hiçbir ilişki kurulamaz.",
        "Bilmek tek başına uygun davranışı zorunlu kılmaz."
      ],
      "answer": 4,
      "hint": "Örnekte hangi unsurun bulunduğunu, hangisinin gerçekleşmediğini ayır.",
      "explanation": "Doğru bilgi mevcutken uygun eylem yoktur. Bu açık durum bilginin eylemi otomatik zorunlu kıldığını savunan genellemeyi engeller. Örnekte doğru bilgi mevcutken uygun eylemin gerçekleşmediğini açıkça göster; otomatik zorunluluğu bu durumla sına.",
      "guidance": {
        "knowledge": [
          "Bilgi, benimseme ve davranış ilişkili olsa da aynı durum değildir."
        ],
        "strategy": "Örnekte hangi unsurun bulunduğunu, hangisinin gerçekleşmediğini ayır.",
        "steps": [
          "Doğru bilgi mevcutken uygun eylem yoktur.",
          "Bu açık durum bilginin eylemi otomatik zorunlu kıldığını savunan genellemeyi engeller."
        ],
        "optionReasons": [
          "Örnek bunu çürütür.",
          "Örnekte bilgi var, uygun eylem yok; iki durum özdeş değildir.",
          "Örnek farklı duruma işaret eder.",
          "Ayrı olmaları ilişkisizlik demek değildir.",
          "Örnek bilgi ile davranış arasında otomatik özdeşlik olmadığını gösterir."
        ],
        "commonError": "Bilmek ile bilinen bilgiye uygun davranmayı her durumda aynı olay sayma.",
        "check": "Örnekte doğru bilgi mevcutken uygun eylemin gerçekleşmediğini açıkça göster; otomatik zorunluluğu bu durumla sına."
      }
    },
    {
      "passage": "Bir metni okuyan öğrenci, bir iddianın ne söylediğini doğru anlıyor; fakat bu iddiayı benimsediği hakkında bilgi verilmiyor.",
      "prompt": "Hangi sonuç metni aşar?",
      "options": [
        "Öğrenci iddianın anlamını kavramıştır.",
        "Öğrenci iddiayı kesinlikle kendi inancı olarak benimsemiştir.",
        "Anlama ve benimseme ayrı sorular olabilir.",
        "Kişisel kabul için ek bağlam gerekir.",
        "Bir görüşü açıklamak o görüşe katılmayı her zaman gerektirmez."
      ],
      "answer": 1,
      "hint": "Metindeki anlama fiiline kabul anlamını ekleyip eklemediğini denetle.",
      "explanation": "Veri yalnız iddianın anlamının kavrandığını gösterir. Öğrencinin onu kendi inancı yaptığı sonucuna geçmek için ek bilgi gerekir. Verilen anlama bilgisini ve verilmeyen tasdiki ayrı tut; kabul sonucunun ek bağlam istediğini göster.",
      "guidance": {
        "knowledge": [
          "Bir görüşü bilmek veya doğru aktarmak onun kişisel kabulüyle aynı şey değildir."
        ],
        "strategy": "Metindeki anlama fiiline kabul anlamını ekleyip eklemediğini denetle.",
        "steps": [
          "Veri yalnız iddianın anlamının kavrandığını gösterir.",
          "Öğrencinin onu kendi inancı yaptığı sonucuna geçmek için ek bilgi gerekir."
        ],
        "optionReasons": [
          "Bu açıkça verilmiştir.",
          "Anlama bilgisi kişisel tasdiki tek başına göstermez.",
          "Örnek bu ayrımı kurar.",
          "Mevcut veri kabulü belirtmez.",
          "Verilen ayrımla uyumludur."
        ],
        "commonError": "Bir görüşün anlamını doğru kavramaktan kişinin onu kendi inancı yaptığına geçme.",
        "check": "Verilen anlama bilgisini ve verilmeyen tasdiki ayrı tut; kabul sonucunun ek bağlam istediğini göster."
      }
    },
    {
      "passage": "MEBİ’nin benimsediği öğretim çerçevesinde iman konusunda kalbin tasdiki merkezi görülür; dil ile açıklama toplumsal bildirim yönüyle ele alınır. Konuşamama veya zorlama gibi durumların ayrıca dikkate alınacağı belirtilir.",
      "prompt": "Bu çerçevenin doğru aktarımı hangisidir?",
      "options": [
        "Konuşamayan kişinin iç kabulünün bulunamayacağı kesinleşir.",
        "Tasdik ile sözlü bildirimin işlevleri ayrılır; istisna bağlamları korunur.",
        "Söz söyleyen herkesin iç kabulü otomatik kesin bilinir.",
        "Tarihteki bütün dinî ekoller aynı ayrıntıyı savunmuştur.",
        "Tasdik sözcüğünün yalnız toplum önünde sesli tekrar anlamında kullanılması"
      ],
      "answer": 1,
      "hint": "Genel tanımı ve belirtilen istisna koşullarını birlikte oku.",
      "explanation": "Metin tasdiki merkezi, ikrarı bildirim yönüyle tanıtır. Bu aktarım konuşamama ve zorlama istisnalarını silmeden, tüm ekollere zorunlu genellenmeden yapılır. İç kabulün merkez oluşunu ve sözlü bildirimin ayrı işlevini bul; iki istisnayı seçeneğinde koruduğunu denetle.",
      "guidance": {
        "knowledge": [
          "Tasdik ve ikrar farklı işlevlerle açıklanır; görüşün hangi çerçevede verildiği korunmalıdır."
        ],
        "strategy": "Genel tanımı ve belirtilen istisna koşullarını birlikte oku.",
        "steps": [
          "Metin tasdiki merkezi, ikrarı bildirim yönüyle tanıtır.",
          "Bu aktarım konuşamama ve zorlama istisnalarını silmeden, tüm ekollere zorunlu genellenmeden yapılır."
        ],
        "optionReasons": [
          "İstisna koşulu silinir.",
          "Metindeki merkez ve koşullar birlikte tutulur.",
          "İç durum dış sözle koşulsuz özdeşleştirilmez.",
          "Metin belirli öğretim çerçevesini anlatır.",
          "Metin tasdiki iç kabul, sözlü açıklamayı ayrı bildirim yönüyle ele alır."
        ],
        "commonError": "Tasdik ile ikrarı eşitleyip konuşamama veya zorlama bağlamını yok sayma.",
        "check": "İç kabulün merkez oluşunu ve sözlü bildirimin ayrı işlevini bul; iki istisnayı seçeneğinde koruduğunu denetle."
      }
    },
    {
      "passage": "Bir ders notu tarihsel kelam ekollerinin iman ve amel ilişkisini farklı biçimlerde açıkladığını, burada ise MEBİ’nin öğretim çerçevesinin tanıtıldığını söylüyor.",
      "prompt": "Hangi yaklaşım bu nota uygundur?",
      "options": [
        "Bütün ekollerin hiçbir farkı olmadığını söylemek",
        "Bir görüşü anlatan herkesi o görüşün takipçisi saymak",
        "Ekoller varsa hiçbir kavramın açıklanamayacağını savunmak",
        "Belirli öğretim yorumunu tarihsel görüşlerin tamamıyla özdeşleştirmek",
        "Aktarılan görüşü kaynak çerçevesiyle belirtmek"
      ],
      "answer": 4,
      "hint": "Kaynağın benimsediği açıklamayla bütün tarihsel görüşleri ayır.",
      "explanation": "Not belirli öğretim çerçevesini aktardığını açıklar. Bunun bütün tarihsel ekollerin değişmez ortak görüşü gibi sunulması doğru aktarım değildir. Notun hangi çerçeveyi aktardığını ve ekoller arasında fark bulunduğunu iki ayrı cümleden göster.",
      "guidance": {
        "knowledge": [
          "Dinî düşünce tarihi anlatılırken görüşün aidiyeti ve kapsamı açık tutulmalıdır."
        ],
        "strategy": "Kaynağın benimsediği açıklamayla bütün tarihsel görüşleri ayır.",
        "steps": [
          "Not belirli öğretim çerçevesini aktardığını açıklar.",
          "Bunun bütün tarihsel ekollerin değişmez ortak görüşü gibi sunulması doğru aktarım değildir."
        ],
        "optionReasons": [
          "Not farkların varlığını açıkça verir.",
          "Aktarma ile kişisel bağlılık karışır.",
          "Çeşitlilik açıklamayı engellemez.",
          "Not tarihsel farklılıkları ve burada hangi yorumun aktarıldığını ayırmıştır.",
          "Tarihsel çeşitlilik korunur."
        ],
        "commonError": "Tek öğretim çerçevesini bütün tarihsel ekollerin hiçbir fark taşımayan ortak görüşü sayma.",
        "check": "Notun hangi çerçeveyi aktardığını ve ekoller arasında fark bulunduğunu iki ayrı cümleden göster."
      }
    },
    {
      "passage": "İsra suresinin 36. ayetinin ders içi anlam özeti, hakkında bilgi bulunmayan şeyin peşine düşmemeyi ve kişinin işitme, görme ve düşünme sorumluluğunu vurguluyor. Bu metin doğrudan alıntı değil anlam özetidir.",
      "prompt": "Bu özetten hangi mesaj çıkarılabilir?",
      "options": [
        "Duyusal engeli olan herkesin ahlaken kusurlu olduğu",
        "Bilgiye dayanmayan hüküm ve davranış konusunda dikkat",
        "Her duyulan haberin incelemeden doğru sayılması",
        "Düşünmenin hiçbir sorumluluk taşımadığı",
        "Her bilimsel sorunun cevabının bu tek özette sayısal olarak bulunduğu"
      ],
      "answer": 1,
      "hint": "Özetteki sorumluluğu belirtilmeyen kişi veya bilim hükmüne genişletme.",
      "explanation": "Özet bilgiye dayanmayan izlemeye karşı dikkat ve edinimlerin sorumluluğunu verir. Buradan engellilere ahlaki hüküm veya tüm bilimlerin ayrıntılı cevabı çıkarılamaz. Anlam özetinde bilgi olmadan izleme ve edinim sorumluluğunu bul; özetin söylemediği kişisel hükümleri ele.",
      "guidance": {
        "knowledge": [
          "Bir ayetin anlam özeti verilen mesajın sınırında yorumlanmalıdır."
        ],
        "strategy": "Özetteki sorumluluğu belirtilmeyen kişi veya bilim hükmüne genişletme.",
        "steps": [
          "Özet bilgiye dayanmayan izlemeye karşı dikkat ve edinimlerin sorumluluğunu verir.",
          "Buradan engellilere ahlaki hüküm veya tüm bilimlerin ayrıntılı cevabı çıkarılamaz."
        ],
        "optionReasons": [
          "Böyle kişi hükmü verilmez.",
          "Özetin bilgi ve sorumluluk vurgusudur.",
          "Bilgi sorumluluğuna aykırıdır.",
          "Özet sorumluluğu vurgular.",
          "Metnin kapsamı bu değildir."
        ],
        "commonError": "Ayetin bilgi sorumluluğu mesajından engelli kişilere ahlaki yargı veya bütün bilimlere sayısal cevap üretme.",
        "check": "Anlam özetinde bilgi olmadan izleme ve edinim sorumluluğunu bul; özetin söylemediği kişisel hükümleri ele."
      }
    },
    {
      "passage": "Mülk suresinin 23. ayetinin ders içi anlam özetinde işitme, görme ve gönül yetilerine dikkat çekiliyor; şükür ilişkisi anılıyor. Bu bir anlam özeti olarak sunuluyor.",
      "prompt": "Bu metin hangi öğrenme odağına uygundur?",
      "options": [
        "Hiçbir duyunun bilgi edinmede rolü olmadığı",
        "Her insanın bütün duyusal kapasitesinin aynı olduğu",
        "Bir yetersizliğin otomatik ahlaki eksiklik sayılması",
        "Bütün insan davranışının tek bir ölçümle tahmin edilmesi",
        "Bilgi yetileriyle sorumluluk ve şükür arasında verilen ilişki"
      ],
      "answer": 4,
      "hint": "Özette sayılan yetileri ve kurulan ilişkiyi ayrı göster.",
      "explanation": "İşitme, görme ve gönül yetileri şükür bağlamıyla anılmıştır. Bu ilişki her insanın kapasitesinin aynı olduğu veya engelin ahlaki kusur olduğu sonucunu taşımaz. Özetteki işitme-görme-gönül ve şükür ilişkisini koru; verilmeyen fizyolojik eşitlik savını ekleme.",
      "guidance": {
        "knowledge": [
          "Anlam aktarımında metinde verilen kavram ilişkisi korunmalı, verilmeyen biyolojik veya ahlaki sınıflama eklenmemelidir."
        ],
        "strategy": "Özette sayılan yetileri ve kurulan ilişkiyi ayrı göster.",
        "steps": [
          "İşitme, görme ve gönül yetileri şükür bağlamıyla anılmıştır.",
          "Bu ilişki her insanın kapasitesinin aynı olduğu veya engelin ahlaki kusur olduğu sonucunu taşımaz."
        ],
        "optionReasons": [
          "Yetilere dikkat çekilmesiyle çelişir.",
          "Böyle fizyolojik genelleme yoktur.",
          "Metin bunu belirtmez.",
          "Böyle bilimsel model verilmez.",
          "Özetin açık unsurları bunlardır."
        ],
        "commonError": "Yetilere dikkat çekilmesini herkesin kapasitesinin aynı olduğu veya bir engelin ahlaki kusur sayıldığı biçimde okuma.",
        "check": "Özetteki işitme-görme-gönül ve şükür ilişkisini koru; verilmeyen fizyolojik eşitlik savını ekleme."
      }
    },
    {
      "passage": "Bir öğrencinin önünde deney raporu, başka kişinin aktardığı haber ve iki öncülden kurduğu çıkarım var. Her birini kendi dayanağına göre inceliyor.",
      "prompt": "Bu tutumun ortak ilkesi nedir?",
      "options": [
        "Her iddiayı yalnız tekrar sayısıyla doğrulamak",
        "Doğru öncüller olmadan her çıkarımı doğru saymak",
        "İddianın dayanağına uygun denetim kullanmak",
        "Bütün duyuları baştan yalan ilan etmek",
        "Haberin kimden geldiğini hiçbir koşulda sormamak"
      ],
      "answer": 2,
      "hint": "Her iddia için neyin sınanabileceğini açıkça eşleştir.",
      "explanation": "Deneyde yöntem, haberde kaynak, çıkarımda öncül ve geçiş incelenebilir. Ortak amaç dayanak denetimidir; bütün yolları aynı tek ölçüte indirgemek değildir. Deneyde yöntem, haberde kaynak, çıkarımda öncül ve geçiş denetimini ayrı eşleştir.",
      "guidance": {
        "knowledge": [
          "Bilgi değerlendirmesinde veri, aktarım ve çıkarımın ilgili güvenilirlik koşulları ayrı incelenir."
        ],
        "strategy": "Her iddia için neyin sınanabileceğini açıkça eşleştir.",
        "steps": [
          "Deneyde yöntem, haberde kaynak, çıkarımda öncül ve geçiş incelenebilir.",
          "Ortak amaç dayanak denetimidir; bütün yolları aynı tek ölçüte indirgemek değildir."
        ],
        "optionReasons": [
          "Farklı dayanakları tek sayıya indirger.",
          "Gerekçe koşulları silinir.",
          "Kaynak türlerinin farklı inceleme gereği korunur.",
          "Genel ret verilmemiştir.",
          "Aktarım denetimini engeller."
        ],
        "commonError": "Deney, haber ve çıkarımın tümünü yalnız tekrar sayısı gibi tek denetim ölçütüne indirgeme.",
        "check": "Deneyde yöntem, haberde kaynak, çıkarımda öncül ve geçiş denetimini ayrı eşleştir."
      }
    },
    {
      "passage": "Bir paylaşımda yorum ile gözlem kaydı karışmış. Kayıt yalnız lambanın sönük olduğunu söylüyor; yorum ise bunun kesin bir elektrik kesintisi olduğunu ekliyor. Başka nedenler araştırılmamış.",
      "prompt": "En doğru değerlendirme hangisidir?",
      "options": [
        "Gözlem kaydı kesinlikle hiç yapılmamıştır.",
        "Her sönük lamba mutlaka aynı nedene sahiptir.",
        "Yorum ve gözlem her zaman aynı cümledir.",
        "Hiçbir neden araştırılamaz.",
        "Gözlemden tek neden sonucuna geçiş için ek inceleme gerekir."
      ],
      "answer": 4,
      "hint": "Doğrudan kaydedilen durumu ona eklenen açıklamadan ayır.",
      "explanation": "Kayıt lambanın sönük olduğunu, yorum tek nedenin kesinti olduğunu söyler. Bu tekleştirme için alternatifleri dışlayan ek kanıt gerekir. Kayıt yalnız neyi söylüyor, yorum ne ekliyor, iki satıra ayır; diğer nedenlerin dışlanmadığını kontrol et.",
      "guidance": {
        "knowledge": [
          "Gözlem verisiyle bu veriye getirilen neden açıklaması farklı iddialardır."
        ],
        "strategy": "Doğrudan kaydedilen durumu ona eklenen açıklamadan ayır.",
        "steps": [
          "Kayıt lambanın sönük olduğunu, yorum tek nedenin kesinti olduğunu söyler.",
          "Bu tekleştirme için alternatifleri dışlayan ek kanıt gerekir."
        ],
        "optionReasons": [
          "Metin kayıt bulunduğunu açıkça verir.",
          "Verilmeyen zorunluluk eklenir.",
          "Örnek iki içeriği ayırır.",
          "Ek araştırma imkânı dışlanmamıştır.",
          "Sönük lamba tek başına bütün diğer nedenleri dışlamaz."
        ],
        "commonError": "Sönük lamba gözleminden alternatifleri incelemeden tek kesin neden çıkarma.",
        "check": "Kayıt yalnız neyi söylüyor, yorum ne ekliyor, iki satıra ayır; diğer nedenlerin dışlanmadığını kontrol et."
      }
    },
    {
      "passage": "Bir derste vahiy, ilgili dinî gelenekte peygambere bildirilen ilahi bilgiyle ilişkilendiriliyor; gündelik bir söylentiyle aynı kaynak statüsünde tanıtılmıyor.",
      "prompt": "Bu anlatım nasıl aktarılmalıdır?",
      "options": [
        "Her duyulan söylentiyi otomatik vahiy sayarak",
        "Kavramı açıklayan öğrencinin kişisel inancını kesin ilan ederek",
        "Kavramın ilgili dinî çerçevedeki anlamı belirtilerek",
        "Vahiy sözcüğünü yalnız fiziksel ses şiddeti diye tanımlayarak",
        "İlgili bütün tarihsel yorumların ayrıntıda zorunlu aynı olduğunu söyleyerek"
      ],
      "answer": 2,
      "hint": "Kavramın tanımını ve iddianın kime ait olduğunu birlikte koru.",
      "explanation": "Metin vahyin ilgili gelenekteki kaynak statüsünü açıklar. Bu, gündelik bütün haberleri aynı saymak veya öğrencinin inancını ölçmek değildir. Vahyin ilgili gelenekteki tanımını koru; sıradan söylentiyle kaynak statüsünün aynı olmadığını göster.",
      "guidance": {
        "knowledge": [
          "Dinî kavram tanımı hangi gelenek ve işlev içinde verildiğiyle öğrenilir."
        ],
        "strategy": "Kavramın tanımını ve iddianın kime ait olduğunu birlikte koru.",
        "steps": [
          "Metin vahyin ilgili gelenekteki kaynak statüsünü açıklar.",
          "Bu, gündelik bütün haberleri aynı saymak veya öğrencinin inancını ölçmek değildir."
        ],
        "optionReasons": [
          "Kaynak statüleri karışır.",
          "Tanımı bilmek kişisel kabulü göstermez.",
          "Tanım ve kaynak aidiyeti korunur.",
          "Dinî kavramın anlamı kaybolur.",
          "Tanım bu evrenselliği kanıtlamaz."
        ],
        "commonError": "Dinî kavramın anlamını aktarmayı öğrencinin kişisel bağlılığını ölçmekle karıştırma.",
        "check": "Vahyin ilgili gelenekteki tanımını koru; sıradan söylentiyle kaynak statüsünün aynı olmadığını göster."
      }
    },
    {
      "passage": "Bir araştırmacı bir bilginin aktarıldığı kişiyi güvenilir buluyor; yine de tarih, bağlam ve kaydın değişip değişmediğini denetliyor.",
      "prompt": "Bu tutum hangi ilkeye uygundur?",
      "options": [
        "Güvenilen herkesin her cümlesinin sonsuza dek kesin doğru olması",
        "Güvenilen kişiden gelen her bilginin zorunlu yanlış olması",
        "Güven ile somut aktarım denetimini birlikte kullanmak",
        "Hiçbir bağlamın anlamı etkilememesi",
        "Tarihin yalnız süs bilgisi sayılması"
      ],
      "answer": 2,
      "hint": "Kişi hakkındaki güven ile tek haberin denetimini ayır.",
      "explanation": "Araştırmacı kaynağı güvenilir bulsa da bu kaydın koşullarını ayrıca kontrol eder. Bu, gerekçeli güvenin denetimle birlikte yürüyebileceğini gösterir. Araştırmacının güven duyduğu kişiyle yine de kontrol ettiği tarih, bağlam ve kayıt farkını ayrı göster.",
      "guidance": {
        "knowledge": [
          "Kaynağa genel güven belirli haberin tarih, bağlam ve aktarımını inceleme gereğini ortadan kaldırmaz."
        ],
        "strategy": "Kişi hakkındaki güven ile tek haberin denetimini ayır.",
        "steps": [
          "Araştırmacı kaynağı güvenilir bulsa da bu kaydın koşullarını ayrıca kontrol eder.",
          "Bu, gerekçeli güvenin denetimle birlikte yürüyebileceğini gösterir."
        ],
        "optionReasons": [
          "Bu sınırsız garanti verilmez.",
          "Ters mutlaklık da desteklenmez.",
          "Kişiye güven kayıt kontrolünü gereksiz yapmamıştır.",
          "Bağlam denetlenmektedir.",
          "Aktarım değerlendirmesinde kullanılmaktadır."
        ],
        "commonError": "Kaynağa genel güveni belirli haberin tarih ve aktarım denetimine gerek kalmaması sayma.",
        "check": "Araştırmacının güven duyduğu kişiyle yine de kontrol ettiği tarih, bağlam ve kayıt farkını ayrı göster."
      }
    },
    {
      "passage": "Bir öğrenci bilgi yollarını duyular yalnız veriyi sağlar, akıl bu veriler arasında ilişki kurabilir, doğru haber de doğrudan yaşamadığımız olaya erişim sağlayabilir diye açıklıyor.",
      "prompt": "Bu açıklamadan hangi sonuç çıkarılamaz?",
      "options": [
        "Farklı yollar aynı araştırmada birlikte kullanılabilir.",
        "Üç yolun her kullanımı her koşulda otomatik kesin doğrudur.",
        "Doğrudan yaşanmayan olay haberle öğrenilebilir.",
        "Akıl duyusal veriler arasında ilişki kurabilir.",
        "Kaynak yollarını ayırmak bilgi edinimini anlamaya yardımcı olabilir."
      ],
      "answer": 1,
      "hint": "Olumlu kaynak işlevini koşulsuz doğruluk iddiasından ayır.",
      "explanation": "Metin farklı yolların neye katkı verebildiğini açıklar. Bütün kullanımların otomatik kesinliğine geçmek belirtilmeyen daha güçlü bir sonuçtur. Metinde verilen duyu, akıl ve haber işlevlerini bul; koşulsuz hatasızlık iddiasının bunlara eklenmediğini kontrol et.",
      "guidance": {
        "knowledge": [
          "Bir bilgi yolunun mümkün katkısı onun her kullanımının hatasızlığıyla aynı değildir."
        ],
        "strategy": "Olumlu kaynak işlevini koşulsuz doğruluk iddiasından ayır.",
        "steps": [
          "Metin farklı yolların neye katkı verebildiğini açıklar.",
          "Bütün kullanımların otomatik kesinliğine geçmek belirtilmeyen daha güçlü bir sonuçtur."
        ],
        "optionReasons": [
          "Açıklama bunu dışlamaz.",
          "Sağlıklı işleyiş ve güvenilirlik koşulları ayrıca gerekir.",
          "Metin bunu açıkça söyler.",
          "Bu doğrudan verilmiştir.",
          "Açıklamanın işlevi budur."
        ],
        "commonError": "Bir bilgi yolunun mümkün katkısını her kullanımın otomatik kesin doğruluğu gibi genişletme.",
        "check": "Metinde verilen duyu, akıl ve haber işlevlerini bul; koşulsuz hatasızlık iddiasının bunlara eklenmediğini kontrol et."
      }
    }
  ]
];
export const forge022HumanitiesTopics: Record<string, string> = {
  "paragrafta-anlatim-bicimleri": "detail-277",
  "ronesans-felsefesi": "detail-109",
  "15-17-yuzyil-felsefesi": "detail-110",
  "aydinlanma-felsefesi": "detail-111",
  "18-19-yuzyil-felsefesi": "detail-112",
  "cagdas-felsefe": "detail-113",
  "bilgi-ve-inanc": "detail-77"
};
export const forge022HumanitiesGuides: LessonGuide[] = guideSpecs022.map(({ title: _title, subjectId: _subject, ...guide }) => guide);
export const forge022HumanitiesLessons: Lesson[] = guideSpecs022.map((guide, pack) => ({
 id: guide.id, subjectId: guide.subjectId, title: txt(guide.title), minutes: guide.minutes,
 objectives: guide.objectives.map(txt), body: guide.sections.map(s => ({ title: txt(s.title), text: txt(s.paragraphs.join("\n\n")) })),
 questions: questionRows022[pack].map((q, i): GuidedQuestion022 => ({ id: `f022-${guide.id}-q${i + 1}`, skill: guide.id,
  passage: txt(q.passage), prompt: txt(q.prompt), options: q.options.map(txt), answer: q.answer,
  hint: txt(q.hint), explanation: txt(q.explanation), guidance: q.guidance })),
 source: txt(guide.source), tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
}));
export const humanitiesDefaults022 = {
 mode: "story", stage: 0, manuscript: "some", reading: "all", authority: true,
 thinking: true, outside: false, access: true, data: false, objection: false,
 powers: "separate", review: false, quantifier: "all", record: "one",
 route: "sense", reliable: false,
 selected: 0, guess: "", reason: "", compared: false, show: false,
};
export type HumanitiesState022 = typeof humanitiesDefaults022;
export interface HumanitiesNode022 { label: string; text: string; active?: boolean; }
export interface HumanitiesLink022 { from: number; to: number; label: string; active?: boolean; }
export interface HumanitiesScene022 {
 kind: "narrative" | "renaissance" | "reason" | "enlightenment" | "power" | "science" | "faith";
 title: string; context: string; question: string; nodes: HumanitiesNode022[]; links: HumanitiesLink022[];
 decision: string; options: string[]; reason: string; evidence: string[];
 story?: { mode: string; stage: number };
 documents?: { label: string; text: string; selected: boolean }[];
 thinking?: { image: boolean; outside: boolean };
 gates?: { label: string; open: boolean }[];
 powers?: { role: string; holder: string }[];
 sample?: { name: string; status: "yes" | "no" | "unknown" }[];
 route?: string;
}
function choice022(value: unknown, choices: string[]): asserts value is string {
 if (typeof value !== "string" || !choices.includes(value)) throw new RangeError("HUMANITIES022_CHOICE");
}
function bool022(value: unknown) { if (typeof value !== "boolean") throw new RangeError("HUMANITIES022_BOOLEAN"); }
export function sampleSupport022(quantifier: string, record: string) {
 choice022(quantifier, ["all", "some"]); choice022(record, ["one", "counter", "all"]);
 const rows = ["A", "B", "C", "D", "E"].map((name, i) => ({ name, status: (record === "all" || i === 0 ? "yes" : record === "counter" && i === 1 ? "no" : "unknown") as "yes" | "no" | "unknown" }));
 const yes = rows.filter(r => r.status === "yes").length, no = rows.filter(r => r.status === "no").length;
 return { rows, yes, no, unknown: rows.length - yes - no, decision: quantifier === "some" ? "Tanık var" : no > 0 ? "Karşı örnek var" : yes === rows.length ? "Bu grupta sağlanır" : "Kapsam eksik" };
}
export function buildHumanitiesScene022(lessonId: string, input: Partial<HumanitiesState022> = {}): HumanitiesScene022 {
 if (!Object.hasOwn(forge022HumanitiesTopics, lessonId)) throw new RangeError("HUMANITIES022_LESSON");
 if (!input || typeof input !== "object" || Array.isArray(input)) throw new RangeError("HUMANITIES022_INPUT");
 const s = { ...humanitiesDefaults022, ...input };
 if (lessonId === "paragrafta-anlatim-bicimleri") {
  choice022(s.mode, ["story", "portrait", "explain", "argue"]);
  if (!Number.isInteger(s.stage) || s.stage < 0 || s.stage > 2) throw new RangeError("HUMANITIES022_STAGE");
  const texts = {
   story: "Ada anahtarı masada buldu. Sonra atölyenin kapısını açtı ve içeride kalan kediyi dışarı çıkardı. Kapı artık açık, kedi dışarıdaydı.",
   portrait: "Atölyenin dar kapısı koyu maviydi. Camın altında ince bir çizik, eşiğin yanında küçük bir pas lekesi vardı. Soğuk metal tutamak pürüzlüydü.",
   explain: "Atölyedeki hava yenileme düzeneği içerdeki havayı dışarı taşır. Açık girişten gelen hava bu akışın yerini alır. Girişin tıkanması hava akışını azaltabilir.",
   argue: "Atölyeyi işe yaramaz bir boşluk sayanlara karşıyım. Çocuklar burada birlikte üretip bir işi paylaşmayı öğreniyor. Bu nedenle atölyeyi kaldırmak yerine güvenli biçimde daha iyi hâle getirmek gerekir.",
  };
  const labels: Record<string, string[]> = { story: ["Anahtar", "Kapı", "Kedi"], portrait: ["Renk", "Çizik", "Doku"], explain: ["Çıkış", "Giriş", "Akış"], argue: ["Karşı sav", "Gerekçe", "Sonuç"] };
  const parts: Record<string, string[]> = {
   story: ["Ada anahtarı bulur; kapı henüz kapalı ve kedi içeridedir.", "Ada kapıyı açar; içerisi ile dışarısı arasında geçiş yolu artık açıktır.", "Ada kediyi dışarı çıkarır; ilk durum değişmiştir."],
   portrait: ["Kapının koyu mavi rengi aynı sahneyi zihinde kurar.", "İnce çizik ve pas lekesi aynı kapının aynı andaki küçük izleridir.", "Soğuk ve pürüzlü tutamak dokunma niteliğini canlandırır."],
   explain: ["Düzenek içerideki havayı dışarı taşır.", "Açık girişten yeni hava gelir; akış için geçiş yolu vardır.", "Giriş tıkanırsa akış azalabilir; koşul ile işleyiş arasında bağ kurulur."],
   argue: ["Karşı görüş atölyeyi işe yaramaz boşluk sayar.", "Birlikte üretim ve iş paylaşımı, bu görüşe karşı sunulan gerekçedir.", "Gerekçe atölyeyi kaldırmak yerine geliştirme önerisini destekler."],
  };
  const decisions: Record<string, string> = { story: "Öyküleme", portrait: "Betimleme", explain: "Açıklama", argue: "Tartışma" };
  const chains = s.mode !== "portrait";
  return { kind: "narrative", title: "Aynı konu, dört anlatım işi", context: texts[s.mode as keyof typeof texts], question: "Bu tam metin hangi işi yapıyor? Seçili parça bütünün neresinde?",
   nodes: parts[s.mode].map((text, i) => ({ label: labels[s.mode][i], text, active: s.mode !== "story" || i <= s.stage })),
   links: chains ? [{ from: 0, to: 1, label: s.mode === "story" ? "Olay sırası" : s.mode === "explain" ? "Havanın yolu" : "Cevap", active: s.mode !== "story" || s.stage >= 1 }, { from: 1, to: 2, label: s.mode === "story" ? "Yeni durum" : s.mode === "explain" ? "Koşulun etkisi" : "Destek", active: s.mode !== "story" || s.stage >= 2 }] : [],
   decision: decisions[s.mode], options: Object.values(decisions), reason: s.mode === "portrait" ? "Nitelikler aynı kapıyı canlandırır; yeni bir olay dizisi kurmaz." : s.mode === "story" ? "Eylemler başlangıcı değiştirir. Aşama düğmesi bu sıra içinde ilerler." : s.mode === "explain" ? "Metin havanın yolunu ve tıkanmanın etkisini öğretir." : "Karşı sava gerekçe ve öneriyle cevap verilir.",
   evidence: ["Konu atölyedir; değişen, metnin yaptığı iştir.", "Biçimi tek nesne adı veya ek değil, metnin bütünü gösterir.", "Aşama seçimi tam metni aynı tutar; öykünün olay yolunu açar."], story: { mode: s.mode, stage: s.stage } };
 }
 if (lessonId === "ronesans-felsefesi") {
  choice022(s.manuscript, ["some", "all"]); choice022(s.reading, ["some", "all"]); bool022(s.authority);
  const match = s.manuscript === s.reading;
  return { kind: "renaissance", title: "Nüsha ve yorumun kapsamı", context: "Bu iki kısa metin tarihsel alıntı değildir; nüsha farkını incelemek için yazılmıştır. A nüshası: Bazı öğrenciler klasik metni yeni bir soruyla yorumlar. B nüshası: Bütün öğrenciler klasik metni yeni bir soruyla yorumlar. Bu kurgu grupta en az bir öğrenci var. Hangi nüshanın özgün olduğu hakkında veri yok.", question: "Seçili yorum hangi nüshanın söylediği kapsamı tam karşılıyor? Yazarın ünü bu farkı kapatır mı?",
   nodes: [{ label: "A nüshası", text: "Bazı öğrenciler klasik metni yeni bir soruyla yorumlar.", active: s.manuscript === "some" }, { label: "B nüshası", text: "Bütün öğrenciler klasik metni yeni bir soruyla yorumlar.", active: s.manuscript === "all" }, { label: "Yorum", text: s.reading === "some" ? "En az bir öğrenci için yorum yapıldığı söyleniyor." : "Gruptaki her öğrenci için yorum yapıldığı söyleniyor." }, { label: "Ün", text: s.authority ? "Yazarın ünlü olduğu bildiriliyor; bu bilgi iki nüshadan hangisinin özgün olduğunu belirlemez." : "Yazarın ünü hakkında bilgi yok; dil ve aktarım incelemesi yine gerekir." }],
   links: [{ from: s.manuscript === "some" ? 0 : 1, to: 2, label: "Tam kapsam", active: match }, { from: 3, to: 2, label: "Kapsam kanıtı", active: false }],
   decision: match ? "Tam kapsam eşleşir" : s.manuscript === "some" ? "Yorum genişletir" : "Yorum daraltır", options: ["Tam kapsam eşleşir", "Yorum genişletir", "Yorum daraltır"], reason: match ? "Nüsha ve yorum aynı niceleme kapsamını verir." : s.manuscript === "some" ? "Bazı ifadesinden bütün grubun yorum yaptığı çıkmaz." : "Bütün gruba ilişkin metin, en az bir kişiyle sınırlı aktarılırsa tam kapsam korunmaz; sınırlı sonuç yine metinden çıkar.",
   evidence: ["Nüsha seçimi özgün nüshayı bulma anlamına gelmez.", "Dar bir sonucun çıkması ile metnin bütün kapsamını aktarmak farklı sorulardır.", "Ün, dil ve aktarım denetiminin yerini tutmaz."], documents: [{ label: "A", text: "Bazı öğrenciler klasik metni yeni bir soruyla yorumlar.", selected: s.manuscript === "some" }, { label: "B", text: "Bütün öğrenciler klasik metni yeni bir soruyla yorumlar.", selected: s.manuscript === "all" }] };
 }
 if (lessonId === "15-17-yuzyil-felsefesi") {
  bool022(s.thinking); bool022(s.outside);
  return { kind: "reason", title: "Düşünen ile düşünülen", context: (s.thinking ? "Şu anda bir ağaç üzerine düşünme edimimi fark ediyorum. " : "Şu anda kendi düşünme edimime ilişkin bir kayıt yok. Bu veri yokluğu düşünen bir öznenin yokluğunu kanıtlamaz. ") + (s.outside ? "Bağımsız gözlem kaydı, dış dünyadaki ağacın varlığına dayanak sunuyor. " : "Dış dünyada ağaca ilişkin bağımsız bir kayıt ise henüz yok. ") + "Bu örnek düşünme edimini, özneyi ve dış nesneyi ayırır.", question: "Hangi bağa gerçekten dayanak verildi? Bağımsız ağaç kaydını açınca hangi sonuç değişir?",
   nodes: [{ label: "Düşünme", text: s.thinking ? "Şu anda düşünme edimi var." : "Şu anki düşünme edimi hakkında veri yok.", active: s.thinking }, { label: "Özne", text: s.thinking ? "Şu anki düşünme için düşünen özne sonucu kurulabilir." : "Bu yoldan özne sonucuna geçmek için mevcut düşünme kaydı eksik." }, { label: "Ağaç", text: s.outside ? "Bağımsız gözlem kaydında dışarıdaki ağaç verilmiştir." : "Ağaç düşünce içeriği olabilir; dış varlığına bağımsız kayıt verilmedi.", active: s.outside }],
   links: [{ from: 0, to: 1, label: "Cogito geçişi", active: s.thinking }, { from: 0, to: 2, label: "Tek başına yeter mi?", active: false }], decision: s.thinking ? s.outside ? "İki ayrı dayanak" : "Özne için dayanak" : s.outside ? "Yalnız dış kayıt" : "Bu yolda veri yok", options: ["İki ayrı dayanak", "Özne için dayanak", "Yalnız dış kayıt", "Bu yolda veri yok"],
   reason: "Şu an düşünme edimi özneye; dış ağaç kaydı nesneye ilişkin ayrı dayanak verir. Cogito okunu nesneye çevirmek bu ayrımı bozar.", evidence: ["Veri yokluğu, o varlığın kesin yokluğu değildir.", "Bu kontrollü örnek zihin felsefesinin bütün sorunlarını tek başına çözmez.", "Bağımsız kayıt açılınca yeni dayanak eklenir; cogito’nun kapsamı genişlemez."], thinking: { image: s.thinking, outside: s.outside } };
 }
 if (lessonId === "aydinlanma-felsefesi") {
  bool022(s.access); bool022(s.data); bool022(s.objection);
  const complete = s.access && s.data && s.objection;
  return { kind: "enlightenment", title: "Kararın dayanağını aç", context: "Kurgu bir okul yeni çalışma saatini duyuruyor. Açıklama belgesinin okunması, dayanak verinin incelenmesi ve itirazın iletilmesi ayrı imkânlar. Burada kararın doğru olup olmadığına oy vermiyoruz; hangi inceleme adımlarının açık olduğunu izliyoruz.", question: "Duyuru, veriyi denetleme ve karşı gerekçe sunma yollarının hangileri gerçekten açık?",
   nodes: [{ label: "Açıklama", text: s.access ? "Kararın gerekçesi okumaya açık." : "Gerekçe belgesine erişim yok.", active: s.access }, { label: "Veri", text: s.data ? "Kararda kullanılan kayıtlar incelemeye açık." : "Dayanak kayıtları inceleme yolu kapalı.", active: s.data }, { label: "İtiraz", text: s.objection ? "Karşı gerekçe karar merciine sunuluyor." : "Karşı gerekçeyi iletme yolu kapalı.", active: s.objection }, { label: "İnceleme", text: complete ? "Bu üç inceleme imkânı birlikte açık; kararın doğruluğu yine ayrıca araştırılır." : "En az bir denetim imkânı eksik; açık olan yollar yine işe yarar." }],
   links: [{ from: 0, to: 3, label: "Gerekçeyi oku", active: s.access }, { from: 1, to: 3, label: "Dayanağı denetle", active: s.data }, { from: 2, to: 3, label: "Karşı savı sun", active: s.objection }], decision: complete ? "Üç yol da açık" : "En az bir yol kapalı", options: ["Üç yol da açık", "En az bir yol kapalı"], reason: "Açıklama, veri ve itiraz farklı işler yapar. Tek duyuru hepsinin yerine geçmez; açık yollar da doğruluğu otomatik garanti etmez.", evidence: ["Açık yol sayısı: " + [s.access, s.data, s.objection].filter(Boolean).length + " / 3.", "Sıra, her kurum için tek zorunlu prosedür iddiası değildir; üç imkânı ayırt eder.", "Burada kişiye veya yönetime ahlak puanı verilmez."], gates: [{ label: "Açıklama", open: s.access }, { label: "Veri", open: s.data }, { label: "İtiraz", open: s.objection }] };
 }
 if (lessonId === "18-19-yuzyil-felsefesi") {
  choice022(s.powers, ["single", "separate"]); bool022(s.review);
  const separated = s.powers === "separate";
  const holders = separated ? ["Meclis", "Yönetim", "Mahkeme"] : ["Tek makam", "Tek makam", "Tek makam"];
  return { kind: "power", title: "Yetki adından gerçek göreve", context: "Bu sade kurum modeli yasa yapma, uygulama ve uyuşmazlık için karar verme görevlerini ayırır. Üç görev tek makamda toplanabilir veya ayrı kurumlara verilebilir. Ayrı kurumların kararlarını denetleme yolu ayrıca açılıp kapatılır. Bu çizim her anayasa düzeni için eksiksiz bir model değildir.", question: "Görevler kimde? Ayrı adlar dışında gerçek ayrım ve ayrıca bir denetim yolu var mı?",
   nodes: [{ label: "Yasa", text: "Yasa yapma görevi: " + holders[0] + "." }, { label: "Uygulama", text: "Yasayı uygulama görevi: " + holders[1] + "." }, { label: "Yargı", text: "Uyuşmazlık için karar görevi: " + holders[2] + "." }, { label: "Denetim", text: s.review ? "Modelde uygulama kararı için yargısal inceleme yolu var; tek makamda ise bağımsızlık ayrıca eksik kalır." : "Modelde uygulama kararının ayrıca inceleme yolu verilmedi.", active: s.review }],
   links: [{ from: 0, to: 1, label: "Kuralı uygula" }, { from: 1, to: 2, label: "Uyuşmazlık" }, { from: 2, to: 3, label: "Karar incelemesi", active: s.review }], decision: separated ? s.review ? "Ayrım ve denetim var" : "Ayrım var, yol eksik" : "Yetki tek makamda", options: ["Ayrım ve denetim var", "Ayrım var, yol eksik", "Yetki tek makamda"], reason: separated ? "Görevleri ayrı kurumlar yapıyor. Denetim seçimi ayrıca bir inceleme yolu ekler; başka hak koşulları bu modelde ölçülmez." : "Üç görev adı farklı olsa da aynı makam yapıyor. Denetim çizgisinin varlığı tek başına bağımsız kurum yaratmaz.", evidence: ["Görev sayısı üç; yetki sahibi kurum sayısı " + (separated ? "üç" : "bir") + ".", "Güçler ayrılığı ile bir ülkenin bütün demokratik niteliği aynı ölçüm değildir.", "Bu kurum fikri keyfî gücü sınırlama sorusuyla ilişkilidir."], powers: ["Yasa", "Uygulama", "Yargı"].map((role, i) => ({ role, holder: holders[i] })) };
 }
 if (lessonId === "cagdas-felsefe") {
  const summary = sampleSupport022(s.quantifier, s.record);
  return { kind: "science", title: "Savın kapsamını sınamayla karşılaştır", context: "Yalnız A, B, C, D ve E’den oluşan kurgu örnek grubunu inceliyoruz. Her örneğin kırmızı olup olmadığına bakıyoruz. Kayıt seçenekleri: yalnız A kırmızı; A kırmızı ve B mavi; beş örneğin tamamı kırmızı. Diğer örnekler hakkında kayıt yoksa renklerini bilmiyoruz. Bu basit model gerçek kuramların tüm ek kabullerini içermez.", question: s.quantifier === "all" ? "Bu grubun bütün üyeleri kırmızı savına kayıtlar ne yapıyor?" : "Bu grupta en az bir kırmızı üye var savına kayıtlar ne yapıyor?",
   nodes: [{ label: "Sav", text: s.quantifier === "all" ? "Bu beş örneğin tümü kırmızıdır." : "Bu beş örnek içinde en az bir kırmızı vardır." }, ...summary.rows.map(r => ({ label: r.name, text: r.name + ": " + (r.status === "yes" ? "Kırmızı kaydı var." : r.status === "no" ? "Mavi kaydı var; kırmızı değil." : "Henüz kayıt yok; rengi bilinmiyor."), active: r.status !== "unknown" }))],
   links: summary.rows.flatMap((r, i) => r.status === "unknown" ? [] : [{ from: i + 1, to: 0, label: r.status === "no" && s.quantifier === "all" ? "Karşı örnek" : r.status === "yes" ? "Olumlu kayıt" : "Bu savı çürütmez" }]), decision: summary.decision, options: ["Tanık var", "Karşı örnek var", "Bu grupta sağlanır", "Kapsam eksik"], reason: s.quantifier === "some" ? "A’nın olumlu kaydı en az bir savı için tanıktır. B’nin mavi olması bu sınırlı savı çürütmez." : summary.no > 0 ? "B’nin mavi kaydı bütün üyeler kırmızıdır savıyla çelişir." : summary.unknown > 0 ? "Olumlu örnek var; diğer üyelerin bilinmeyen rengi evrensel savı kesin kılmaz." : "Tanımlı sonlu grubun beş üyesi de olumlu kaydedildi. Bu, bütün evrendeki her örnek hakkında sınırsız ispat değildir.", evidence: ["Olumlu: " + summary.yes + "; olumsuz: " + summary.no + "; bilinmeyen: " + summary.unknown + ".", "Evrensel sav için mavi bir örneğin mümkün oluşu sınama olanağını gösterir; fiilen mavi kayıt gelmesi ayrı olaydır.", "Popper’ın ölçütü zaten yanlış olma koşulu değildir; gerçek kuramlarda ölçüm ve yardımcı kabuller de incelenir."], sample: summary.rows };
 }
 choice022(s.route, ["sense", "report", "inference"]); bool022(s.reliable);
 const direct = s.route === "sense", report = s.route === "report";
 return { kind: "faith", title: "İşitme, aktarım ve çıkarım", context: direct ? "Ece bir zil sesi işitti. Bu doğrudan edinimde ses var; zilin kim tarafından çalındığı veya hangi mesajı taşıdığı henüz ortaya konmadı." : report ? "Ece avluda zil çaldığını görmedi ve işitmedi. Olayı Ada’nın yazılı mesajından öğreniyor. Aktarımın kaynağına ilişkin denetim ayrı seçenekte veriliyor." : "Ece, sesin ve kapıdaki zilin aynı anda kayda geçtiğini görüyor. Bu kayıtlardan sesin zilden gelmiş olması olası sonucuna ulaşıyor; tek nedenin kesinliği henüz ortaya konmadı.", question: "Verilen bilgi yolu hangisi? Hangi basamak doğrudan edinim, hangisi aktarım veya çıkarımdır?",
  nodes: direct ? [{ label: "Ses", text: "Zil sesi doğrudan işitildi." }, { label: "Duyu", text: "İşitme verisi elde edildi." }, { label: "Kaynak", text: "Kimin, niçin çaldığı hakkında ek bilgi yok." }] : report ? [{ label: "Ada", text: s.reliable ? "Mesajın Ada’dan geldiği ve Ada’nın olayı gördüğü bağımsız kayıtla doğrulandı." : "Mesaj Ada’ya atfediliyor; kaynağın kimliği ve görgüsü henüz kontrol edilmedi.", active: s.reliable }, { label: "Mesaj", text: "Mesaj avluda zil çaldığını bildiriyor." }, { label: "Ece", text: "Ece olaya doğrudan katılmadan aktarımı okuyor." }] : [{ label: "Kayıt", text: "Ses ve düzenek için iki eşzamanlı kayıt verildi." }, { label: "Çıkarım", text: "Düzeneğin kaynak olması olası görülüyor." }, { label: "Sınır", text: "Aynı anda olma tek başına bütün başka nedenleri dışlamaz." }],
  links: direct ? [{ from: 0, to: 1, label: "Doğrudan edinim" }, { from: 1, to: 2, label: "Ek bilgi gerekir", active: false }] : report ? [{ from: 0, to: 1, label: "Kaynak denetimi", active: s.reliable }, { from: 1, to: 2, label: "Aktarım" }] : [{ from: 0, to: 1, label: "Akıl yürütme" }, { from: 2, to: 1, label: "Sonucun kapsamı" }], decision: direct ? "Duyusal veri" : report ? s.reliable ? "Denetlenen aktarım" : "Kaynağı açık değil" : "Akıl yürütme", options: ["Duyusal veri", "Denetlenen aktarım", "Kaynağı açık değil", "Akıl yürütme"], reason: direct ? "Sesi doğrudan işitmek duyusal edinimdir; bütün mesaj ve nedenler bunun içinde hazır bulunmaz." : report ? "Ece’nin yolu her iki durumda da haberdir. Kaynak denetimi dayanağı güçlendirir; her ayrıntının kesinliğini otomatik garanti etmez." : "Verilerden ilişki kurulması çıkarımdır. Olası nedeni bütün başka nedenleri dışlayan kesin sonuca genişletme.", evidence: ["Bunlar uygulama için yazılmış bilgi yolu örnekleri olarak yazıldı.", "Doğru bilgiyi öğrenmek, onu kabul etmek ve ona göre davranmak ayrı durumlar olarak ele alınır.", "Bu etkinlik kişinin imanını veya değerini ölçmez."], route: s.route };
}
