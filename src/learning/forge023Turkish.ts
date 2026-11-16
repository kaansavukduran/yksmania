import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const guideSpecs023: (LessonGuide & { title: string })[] = [
  {
    id: "paragrafta-soru-cevap",
    title: "Paragrafta soru–cevap: yanıtın odağından doğru soruya",
    minutes: 110,
    objectives: [
      "Yanıtı doğrudan karşılayan soruyu konu, odak ve kapsamıyla kur.",
      "Tanım, neden, amaç, yöntem, ölçüt, koşul ve veri sorularını ayır.",
      "Olumsuz kökte eksik bilgiyi dış varsayım olmadan bul.",
      "İki parçalı sorunun bütün alanlarını ayrı ayrı denetle.",
    ],
    sections: [
      {
        title: "Yanıtın içinden soruyu bulmak",
        paragraphs: [
          "Bir soruya verilen yanıt, yalnız bir konudan söz etmez; o konunun belirli bir yönünü açıklar. Aynı kitaplık hakkında kuruluş zamanı, çalışma yöntemi, amaç, yarar veya eksik kaynaklar anlatılabilir. “Kitaplık” sözcüğünü görmek hangi sorunun sorulduğunu belirlemez. İlk işin, yanıtın neyi açıklığa kavuşturduğunu kendi cümlenle söylemektir.",
          "“Önce kayıtları yıllara ayırdık, sonra aynı yıla ait bilgileri karşılaştırdık.” yanıtı yapılan işlemi gösterir. “Bu kayıtları niçin tuttunuz?” ise kayıt tutmanın gerekçesini ister. İki cümle aynı konuyla ilgili olsa da birbirini karşılamaz. Soru ile yanıtı eşlerken konuya ek olarak istenen ilişkiyi ve kapsamı da korumalısın.",
        ],
      },
      {
        title: "Konu, ana düşünce ve yanıt odağı",
        paragraphs: [
          "Konu, üzerinde konuşulan şeydir; ana düşünce, onun hakkında iletilen temel yargıdır. Yanıt odağı ise belirli sorunun aydınlatılmasını istediği yönü gösterir. Konusu arşiv olan bir paragraf “Belgeler nasıl düzenlendi?” sorusunu cevaplayabilir; ana düşüncesi de düzenli sınıflamanın erişimi kolaylaştırması olabilir. Bu üç tanım aynı görevi yapmaz.",
          "Okurken üç ayrı kısa not tutabilirsin: konu=belgelerin düzeni; odak=işlem sırası; temel yargı=düzenli sınıflama erişimi kolaylaştırır. Sorunun “hangi soruya yanıt” olduğunu görürsen özellikle odak notunu kullan. “Asıl anlatılmak istenen” kökünde ise ana savı bir yargı olarak ararsın. Soru kökü, aynı metinde hangi işlemi yapacağını belirler.",
        ],
      },
      {
        title: "Soru kökünün yönünü belirle",
        paragraphs: [
          "“Hangisinin cevabıdır?” ile “Hangisinin cevabı yoktur?” aynı yönde çalışmaz. İlkinde yanıtın doğrudan karşıladığı soruyu bulursun. İkincisinde aday soruları tek tek metne yöneltir, hangisi için yeterli bilgi verilmediğini araştırırsın. Cevabı olmayan seçenek, mutlaka yanlış bir olay anlatmak zorunda değildir; yalnız bilgisi eksik de olabilir.",
          "Kökü önce kendi sözlerinle yeniden söyle: “Bu metnin anlattığı yönü soracağım.” veya “Metinde eksik kalan bilgi alanını bulacağım.” Sonra seçeneklerin tamamına aynı ölçütü uygula. Olumsuz kökte bir seçeneğin açıkça cevaplanması onu doğru yanıt yapmaz; elenmesi gerektiğini gösterir. Son kontrolde bulduğun kanıtı kökün istediği yönle birlikte oku.",
        ],
      },
      {
        title: "Kişi ve kavramı tanıtan yanıt",
        paragraphs: [
          "Tanımlayıcı yanıt bir kavramın ne olduğunu, hangi temel özelliğiyle ayırt edildiğini veya bir kişinin hangi niteliğiyle tanıtıldığını anlatır. “Ses arşivi, kayıtların kaynak ve tarih bilgileriyle korunduğu bütündür.” cümlesi bir tanım kurar. “Ses arşivi nedir?” sorusu bu açıklamayı doğrudan ister; arşivin kaç yılda kurulduğunu sormaz.",
          "“Nedir?” sorusunun karşılığı yalnız cümlenin -dır eki taşımasıyla bulunmaz. Bir cümle o eki kullanmadan da tanımlama yapabilir; -dır kullanan başka bir cümle yalnız bir özellik bildirebilir. Açıklamanın kavramı ne olarak sunduğunu göster. Tanımın yerine tarih, gerekçe veya işlem basamağı isteyen bir soruyu koyduğunda hangi veri alanının eksik kaldığını denetle.",
        ],
      },
      {
        title: "Gerçekleşmiş nedeni yakala",
        paragraphs: [
          "Neden sorusu, bir olayın hangi etken veya gerekçeyle meydana geldiğini araştırır. “Toplantıyı erteledik; salonun güvenlik kontrolü bitmemişti.” yanıtında ertelemenin gerekçesi verilmiştir. Bağlaç olmasa da iki cümle bu ilişkiyi açıkça kurabilir. “Niçin ertelediniz?” sorusunu güvenlik kontrolünün tamamlanmamasıyla cevaplayabilirsin.",
          "Nedeni belirlerken olayın ne olduğunu da koru. Salonun neden denetlendiği ile toplantının neden ertelendiği ayrı sorulardır. Yanıtta birden çok olay varsa birinin gerekçesini ötekinin yerine taşıma. “Çünkü” sözcüğünü işaretlemek yardımcıdır; asıl kanıt, hangi olayın hangi gerekçeyle açıklandığını tam bir cümle olarak kurabilmendir.",
        ],
      },
      {
        title: "Amaç, beklenen sonuca yönelir",
        paragraphs: [
          "Amaç, yapılan işin ulaşmak istediği sonuçtur. “Etiketleri büyüttük ki ziyaretçiler uzaktan da okuyabilsin.” cümlesinde büyütme gerçekleşen iştir; uzaktan okunabilmesi hedeflenen sonuçtur. “Etiketleri hangi amaçla büyüttünüz?” sorusu bu hedefi ister. Bu cümle, her ziyaretçinin artık bütün etiketleri kesinlikle okuyabildiğini tek başına kanıtlamaz.",
          "“Neden?” günlük dilde hem gerekçeyi hem amacı sorabilir; bu yüzden tek sözcükten mekanik karar verme. Bir soruda özellikle neden–amaç ayrımı isteniyorsa gerçekleşmiş etken ile ulaşılmak istenen sonucu ayrı yaz. “Yağmur yağdığı için içeri girdik.” ve “Islanmamak için içeri girdik.” aynı olay çevresinde iki farklı ilişkiyi öne çıkarır.",
        ],
      },
      {
        title: "Yöntemi eylem sırasıyla kur",
        paragraphs: [
          "Bir yöntem yanıtı işin hangi araç, işlem veya basamaklarla yürütüldüğünü anlatır. “Örnekleri tarttık, aynı koşulda kuruttuk ve yeniden tartarak farkı kaydettik.” dizisi bir inceleme yoludur. “İncelemeyi hangi aşamalarla yaptınız?” sorusuna üç işlemi sırayla söyleyebilirsin. İşlem sırası, bu işi seçmenin gerekçesini ayrıca vermez.",
          "“Nasıl?” her bağlamda sıra istemez. “Nasıl bir ortam?” özellik, “Nasıl hissettiniz?” durum sorabilir. Aday sorunun tam biçimini oku. Yanıtta adım, araç veya özellikten hangisi varsa ona uygun soruyu ara. Yalnız “önce” sözcüğünü görerek tarih veya başlangıç saati bulduğunu düşünme; göreli sıra ile takvim bilgisi farklıdır.",
        ],
      },
      {
        title: "Ölçüt ile araç birbirinden ayrılır",
        paragraphs: [
          "Ölçüt, seçenekler arasında karar verirken esas alınan özelliktir. “Onarılacak kitapları hasarın ilerleme riskine göre seçtik.” ifadesinde ölçüt risk düzeyidir. Bir büyüteç kullanılması ise inceleme aracıdır; seçim ölçütünün büyüteç olduğu söylenemez. “Neye göre seçtiniz?” sorusunu kararın dayandığı özellikle yanıtla.",
          "Araç, yöntem ve ölçüt aynı yanıtta birlikte bulunabilir: “Büyüteçle inceledik; sayfaları durumlarına göre grupladık; riski yüksek olanı önce aldık.” Bu cümlede inceleme aracı, sınıflama yöntemi ve öncelik ölçütü ayrı ayrı görünür. Soru bunlardan hangisini istiyorsa karşılığını o alandan seç. Bir alanın cevabı diğer alanı kendiliğinden doldurmaz.",
        ],
      },
      {
        title: "Zaman, süre, yer ve sayı",
        paragraphs: [
          "“Salı günü okulda başlayan çalışma dört hafta sürdü ve on iki kişiyle yürütüldü.” cümlesi gün, yer, süre ve kişi sayısını verir. Buna rağmen başlangıç saatini veya takvim yılını belirtmez. Salı bir gün adıdır; dört hafta bir süredir; bu ikisini birbirinin yerine kullanamazsın. Her soru için uygun ayrıntı düzeyini koru.",
          "Bir etkinliğin kapanış toplantısının yapıldığı yer, bütün çalışmanın her aşamasının orada yapıldığını kanıtlamaz. Aynı şekilde projenin duyurulduğu tarih ile başladığı tarih farklı olabilir. Bir zaman veya yer cevabını bulduğunda hangi olaya ait olduğunu kontrol et. Yanıtı tam kurmak için yeni bir olay veya tarih eklemen gerekiyorsa metin yeterli değildir.",
        ],
      },
      {
        title: "Koşulun yönünü koru",
        paragraphs: [
          "“Yalnız izin verilen kayıtlar yayımlanabilir.” sözü, yayımlanma için iznin gerekli olduğunu bildirir. İzin verilmeyen bir kayıt bu kurala göre yayımlanamaz. Fakat bu ifade, izin verilen her kaydın mutlaka yayımlanacağını söylemez; başka seçim koşulları bulunabilir. Gerekli koşulu tek başına yeterli koşula çevirmek, yanıta yeni bilgi ekler.",
          "“İzni olan ve teknik kontrolü geçen her kayıt yayımlanır.” denirse yeterli koşul iki parçayla açıkça kurulmuştur. İzin var ama teknik kontrol yok durumunu ayrı düşün. Uygun soruyu bulurken hem gerekli koşulu hem verilen diğer sınırlamaları koru. Koşulu değiştirdiğinde sonuç değişiyorsa hangi sözün değiştiğini ve bunun neden önemli olduğunu gösterebilmelisin.",
        ],
      },
      {
        title: "Kapsamı daraltmadan veya büyütmeden eşle",
        paragraphs: [
          "Yanıt bazı katılımcıların bir yöntemi tercih ettiğini söyleyebilir; soru ise bütün katılımcıların onu neden seçtiğini sorabilir. Böyle bir soru metne verilmemiş bir genellik yükler. “Bazı” sözü tek başına diğerlerinin kesinlikle seçmediğini de göstermez. Açıkça “tamamı değil” denmediyse bu dışlamayı metne eklememelisin.",
          "Bir başka kapsam hatası, yanıtın iki ayrı yönünden yalnız birini soru yerine koymaktır. “Yöntem hangi koşullarda işe yarar ve hangi sınıra sahiptir?” sorusuna verilen uzun açıklamayı yalnız “Yöntem yararlı mıdır?” biçiminde daraltabilirsin; fakat bu, bütün yanıtın odağını karşılamayabilir. Kök “parçanın bütünü” diyorsa her ana bölümün soruda bir karşılığını ara.",
        ],
      },
      {
        title: "Birden çok soru parçasını ayrı denetle",
        paragraphs: [
          "Bir seçenekte “Nerede ve ne zaman?” gibi iki bilgi bir arada istenebilir. Yanıt yer bilgisini veriyor ama zamanı vermiyorsa seçenek bütünüyle cevaplanmış sayılmaz. Önce her alt soruyu ayrı bir satıra ayır, sonra her satırın karşısına metindeki cevabı yaz. Bileşik soru ancak bütün gerekli parçaları karşılanıyorsa tam eşleşir.",
          "İki boşluklu eşleştirmede de aynı ilke geçerlidir. İlk yanıt yöntem, ikinci yanıt bu yöntemin sınırını anlatıyorsa aday çiftin iki üyesini de doğrula. İlk sorunun çok iyi uyması ikinci sorunun eksik kalmasını gidermez. Sırayı değiştirmek de eşleşmeyi bozabilir; hangi yanıtın hangi boşluğa ait olduğunu görünür tut.",
        ],
      },
      {
        title: "Cevabı olmayan soru için kanıt çizelgesi",
        paragraphs: [
          "“Gönüllüler cumartesi müzede toplandı, kırk nesneyi kaydetti ve çalışmayı üç günde bitirdi.” yanıtını düşün. Kim, hangi gün, nerede, kaç nesne ve ne kadar süre soruları belirli cevaplar alır. “Kayıtları hangi yazılımla tuttular?” için ise araç bilgisi yoktur. Dijital kayıt alışkanlığından bir uygulama adı tahmin edilemez.",
          "Bu tipte bir çizelge kur: soru, istenen alan, metindeki karşılık ve durum. Karşılık bulamadığında yakın anlamlı başka bir ifade olup olmadığını kontrol et. Gerçekten yoksa “belirtilmemiş” yaz; bunun yerine “hiç yazılım kullanmadılar” deme. Bilginin verilmemesi ile olayın gerçekleşmediğinin bildirilmesi farklı sonuçlardır.",
        ],
      },
      {
        title: "Görüş, gerekçe ve örnek",
        paragraphs: [
          "Bir kişi önce bir olayı anlatıp sonra bu olaydan vardığı görüşü açıklayabilir. “Bir fiş kaydında çevrim içi listede olmayan bir not buldum. Bu yüzden iki arşiv türünü birlikte koruyorum.” yanıtında ilk cümle örnek, ikinci cümle gerekçeli karardır. Uygun soru, örneğin yalnız nerede bulunduğuna odaklanmak yerine birlikte koruma kararını sorabilir.",
          "Buna karşılık soru özellikle ilk cümleyi soruyorsa onun ayrıntı sınırına dönersin. Son cümle her metinde otomatik ana düşünce değildir; hangi bölümlerin hangi yargıyı geliştirdiğini incele. “Ne düşünüyorsunuz?” görüşü, “Niçin böyle düşünüyorsunuz?” onun dayanağını ister. Yanıtta hem görüş hem dayanak bulunması bu iki hedefi aynılaştırmaz.",
        ],
      },
      {
        title: "Göndermelerin öncülünü bul",
        paragraphs: [
          "“Bunu yalnız son aşamada yapıyorum.” gibi bir yanıt tek başına okunduğunda eksik kalabilir. “Bunu” sözcüğünün neye gönderdiği önceki soruda veya önceki cümlede açıklanmış olmalıdır. Metnin tamamı verilmişse gerekli öncülü bul ve yanıtı onunla birlikte aç. Gönderme sözcüğünü istediğin başka bir eyleme bağlayamazsın.",
          "Seçenekleri denemek burada işe yarar: Her aday sorunun ardından yanıtı sesli ya da içinden oku. “Bunu”nun karşılığı doğal ve tek bir eylem olarak kuruluyor mu? Bu yöntem yalnız kulağa hoş gelme testi değildir; kişi, zaman, nesne ve yüklem uyumunun anlam düzeyinde korunmasını gerektirir. İki aday gerçekten aynı işi yapıyorsa olmayan bir ayrımla soru kurtarılmaz.",
        ],
      },
      {
        title: "Sözcük benzerliğini anlam eşleşmesine çevir",
        paragraphs: [
          "Aday sorunun sözcükleri yanıttan farklı olabilir. “Kaynağını doğrulayabildiğimiz kayıtları öne aldık.” yanıtı “Hangi ölçütü esas aldınız?” sorusuna uygundur; soruda doğrulama sözcüğü geçmez. Buna karşılık içinde kayıt sözcüğü bulunan bir soru yıl, maliyet veya personel sayısını soruyorsa aynı derecede uygun değildir.",
          "Her eşleşmeyi küçük bir gerekçeyle açıkla: “Soru ölçüt istiyor; yanıtta kaynak doğrulama ölçütü var.” Bu açıklama hem yakın anlamı tanımayı hem alakasız çağrışımı elemeni sağlar. Seçeneklerin uzunluğu, soru sözcüğünün tek başına görünüşü veya tanıdık bir kelime güvenilir seçim ölçütleri değildir; belirleyici olan metindeki gerçek karşılıktır.",
        ],
      },
      {
        title: "İki aday kaldığında ilk bozulan bağı bul",
        paragraphs: [
          "Bir soru yöntem, diğeri yöntem ve gerekçeyi birlikte isteyebilir. Yanıtta gerekçe açıkça yoksa ikinci soru fazladan bilgi ister. Bir başka durumda iki sorunun da metinle gerçekten yanıtlandığını fark edebilirsin. O zaman yalnız “daha kısa olanı” veya “daha dar olanı” seçmek, tek doğruyu kanıtlayan bir yöntem değildir.",
          "Önce kökün bütün yanıtı mı, belirli bir cümleyi mi, yoksa cevaplanabilen herhangi bir soruyu mu istediğine dön. Ardından her adayın gerekli parçalarını aynı çizelgede karşılaştır. Soru hâlâ birden çok doğruya açıksa içerik kusurunu not etmek gerekir; çözüm için metinde olmayan vurgu veya koşul icat edilmez. Geçerli çözüm, açık öncüllerle tek sonuca ulaşır.",
        ],
      },
      {
        title: "Yeni bağlamda bağımsız uygulama",
        paragraphs: [
          "Öğrendiğin yöntemi yalnız aynı arşiv örneğinde tekrar etmek yerine bir deney, konser hazırlığı veya ulaşım kararı üzerinde dene. Önce soru kökünü belirle, sonra yanıtın odağını kendi sözlerinle yaz ve aday soruların her parçasını metne bağla. Sonunda seçtiğin soruyu gerçekten cevaplayacak kısa yanıtı söyle; buna ek bilgi katmadığını kontrol et.",
          "Etkileşimli alanda metin, soru ve kanıt cümlesi seçimini ayrı ayrı değiştirebilirsin. Yeni seçim kanıt bağlarını değiştirir; buna göre eski gerekçeni yeniden değerlendirmelisin. Bu keşif puan veya konu tamamlama kaydı üretmez. Ardından çözümlü örneklerde desteği kademeli açıp bağımsız sorularda tam pasaj üzerinden aynı işlemi kendin yürüt.",
        ],
      },
    ],
    examples: [
      {
        title: "Tanımı yeni nesnede tanı",
        prompt:
          "Bir seyir defteri, yolculuk sırasında tutulan yer, zaman ve olay notlarının düzenli biçimde bir araya getirildiği kayıttır. Yalnız bir rota çizimi değil, yol boyunca yaşananlara ilişkin yazılı notları da içerir.\nBu yanıtın doğrudan karşılığı hangi sorudur?\nA) Seyir defteri nedir ve neleri içerir? B) İlk seyir defterini kim yazdı? C) Yolculuk hangi yıl yapıldı? D) Defter hangi mağazadan alındı? E) Rotanın uzunluğu kaç kilometredir?",
        strategy:
          "Kavramın tanımını, nesneyle ilgili verilmemiş tarih ve ölçülerden ayır.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "İlk cümle seyir defterinin ne olduğunu yer, zaman ve olay notlarını içeren kayıt olarak tanımlar.",
          },
          {
            label: "Bağı kur",
            explanation:
              "İkinci cümle içerik sınırını açar: yalnız rota değil, yolculukta yaşanan olayların notları da vardır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Nedir ve neleri içerir sorusunun iki parçası da yanıtlanır; yazar, yıl, mağaza ve kilometre verileri yoktur.",
          },
        ],
        answer: "Seyir defteri nedir ve neleri içerir?",
        check:
          "Cevapta hem tanımın hem iki içerik türünün karşılığını gösterebildiğini kontrol et.",
        pitfall:
          "Metinde zaman notları bulunmasını yolculuğun belirli takvim yılının verilmesi sanmak.",
      },
      {
        title: "Hedef gerçekleşmiş sonuç değildir",
        prompt:
          "Eski fotoğrafların altına çekim mevsimini yazdık ki farklı dönemlere ait görüntüler birbirine karışmasın. Bu etiketlerin karışıklığı ne ölçüde azalttığını daha sonra ayrı bir denemede ölçeceğiz.\nYalnız etiket ekleme işinin amacını soran seçenek hangisidir?\nA) Mevsim etiketini hangi hedefle eklediniz? B) Karışıklığı tam olarak yüzde kaç azalttınız? C) Fotoğrafları hangi saatte çektiniz? D) Etiketleri basmak için hangi cihazı seçtiniz? E) Bütün fotoğraflar neden aynı mevsimde çekildi?",
        strategy:
          "Yapılan iş, hedeflenen sonuç ve henüz ölçülmemiş etkiyi üç ayrı alanda tut.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Yapılan iş, fotoğrafların altına çekim mevsimini yazmaktır.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Ki ile bağlanan hedef, farklı dönemlerin görüntülerinin karışmasını önlemektir; bu hedefin etki ölçümü henüz yapılmamıştır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Amacı soran seçeneği seç; yüzde, saat ve cihaz isteyen adaylar metinde bulunmayan ek veri gerektirir.",
          },
        ],
        answer: "Mevsim etiketini hangi hedefle eklediniz?",
        check:
          "Cevabın karışmayı önleme hedefi olduğunu söyle; gerçekleşmiş başarı yüzdesi ekleme.",
        pitfall:
          "Bir hedefin söylenmesini o hedefin her fotoğrafta kesin gerçekleştiği biçiminde okumak.",
      },
      {
        title: "Araç ile seçim ölçütünü ayır",
        prompt:
          "Yürüyüş kulübü rotaları sayısal haritada açtı. Yeni başlayanlar için seçilecek rotaları toplam yükselti farkına göre sıraladı; aynı yükselti grubunda daha kısa olanı önce aldı.\nTemel öncelik ölçütünü isteyen soru hangisidir?\nA) Rotaların önceliğini hangi özelliğe göre belirlediniz? B) Rotaları hangi tür haritada açtınız? C) Kulübün kuruluş tarihi nedir? D) Harita uygulamasının fiyatı kaç liradır? E) Bütün rotaları kim aynı uzunlukta yaptı?",
        strategy:
          "Haritayı inceleme aracı, yükselti farkını kararın dayanağı olarak ayır.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Sayısal harita rotaların gösterildiği araçtır; tek başına hangi rotanın seçileceğini belirlemez.",
          },
          {
            label: "Bağı kur",
            explanation:
              "İlk sıralama yükselti farkıyla yapılır, aynı gruptaki ikincil sıra ise uzunluğa göre kurulur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Öncelik özelliğini soran soru temel ölçütü karşılar; diğerleri araç, tarih veya verilmemiş varsayım ister.",
          },
        ],
        answer: "Rotaların önceliğini hangi özelliğe göre belirlediniz?",
        check:
          "Sorunun cevabını toplam yükselti farkı diye verebildiğini, harita adıyla yetinmediğini denetle.",
        pitfall:
          "İncelemede kullanılan haritanın adını karar ölçütünün yerine koymak.",
      },
      {
        title: "Eksik bilgiye dışarıdan sayı ekleme",
        prompt:
          "Gökyüzü kulübü cuma akşamı okulun bahçesinde buluştu. Yirmi öğrenci gözlem yaptı ve çizimlerini ertesi gün panoya astı. Gözlemde kullanılan teleskobun modeli açıklanmadı.\nBu parçadan hangi soru cevaplanamaz?\nA) Hangi model teleskop kullanıldı? B) Buluşma hangi gün yapıldı? C) Buluşma nerede yapıldı? D) Kaç öğrenci gözlem yaptı? E) Çizimler ne zaman panoya asıldı?",
        strategy:
          "Gün, yer, kişi ve paylaşım zamanına ayrı kanıt bul; cihaz modelini boş bırak.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Cuma akşamı, okulun bahçesi, yirmi öğrenci ve ertesi gün ifadeleri dört ayrı veri alanını doldurur.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Teleskop modelinin açıklanmadığı açıkça söylenir; okul gözlemlerinde sık kullanılan bir modeli bilmek bu metne kanıt eklemez.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Cevaplanamayan soru cihaz modelini ister; buradan teleskop kullanılmadığı sonucu çıkarılmaz.",
          },
        ],
        answer: "Hangi model teleskop kullanıldı?",
        check:
          "Diğer dört seçeneğin her biri için ayrı ifade gösterebildiğini kontrol et.",
        pitfall:
          "Bilmediğin model alanını kendi gözlem alışkanlığın veya tanıdık bir marka ile tamamlamak.",
      },
      {
        title: "İki yanıtta iki bilgi türünü koru",
        prompt:
          "I. Yanıt: “Başvuruları önce tarihe göre ayırır, sonra bilgileri eksik olanları not ederim.” II. Yanıt: “Yalnız katılım izni imzalı başvurular değerlendirmeye alınabilir; imza bulunması kabul sonucunu tek başına belirlemez.”\nİki yanıtı sırasıyla karşılayan soru çifti hangisidir?\nA) Başvuruları hangi adımlarla incelersiniz? / Değerlendirmeye giriş için hangi izin şartı vardır? B) Hangi amaçla başvuru toplarsınız? / Kaç başvuru kesin kabul edildi? C) Hangi izin şartı vardır? / Hangi adımlarla incelersiniz? D) Başvurular hangi ülkeden geldi? / Her başvuru neden mutlaka kabul edilir? E) İnceleyen kaç yaşındadır? / İzin belgesini kim basmıştır?",
        strategy:
          "İlk yanıtı yöntem, ikinci yanıtı gerekli koşul olarak etiketle; sırayı ters çevirme.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "İlk yanıt tarihe ayırma ve eksik bilgiyi not etme işlemlerini sırayla gösterir.",
          },
          {
            label: "Bağı kur",
            explanation:
              "İkinci yanıt değerlendirmeye girebilmek için izin imzasını gerekli kılar; bunun kesin kabul garantisi olmadığını da açıklar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Yöntem sorusunu önce, izin şartını sonra soran çift iki yanıtla doğru sırada ve gerekli koşul sınırıyla eşleşir.",
          },
        ],
        answer:
          "Başvuruları hangi adımlarla incelersiniz? / Değerlendirmeye giriş için hangi izin şartı vardır?",
        check:
          "Her sorunun karşısına yalnız kendi yanıtından bir cevap koy; imzadan kesin kabul üretme.",
        pitfall:
          "İki soru ilgili göründüğü için sırasını atlamak veya gerekli izni tek başına kabul garantisi saymak.",
      },
      {
        title: "İkinci adımı amaçtan ayır",
        prompt:
          "Maket ekibi, parçaları karıştırmamak için önce her parçaya bir renk etiketi yapıştırdı; ardından aynı renkte olanları ayrı kutulara yerleştirdi. Son aşamada her kutunun içindekileri saydı.\nBu açıklamada ikinci işlem hangisidir?\nA) Aynı renk etiketini taşıyan parçaları ayrı kutulara yerleştirmek B) Parçaların karışmasını önlemeyi istemek C) Her parçaya renk etiketi yapıştırmak D) Kutulardaki parçaları saymak E) Bütün parçaları tek renge boyamak",
        strategy:
          "Amaç cümleciğini ayır ve önce, ardından, son aşamada sözleriyle üç işlemi sırala.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Parçaları karıştırmamak için ifadesi amaçtır; tek başına uygulanan ikinci işlem değildir.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Etiketleme ilk, aynı renkleri kutulara ayırma ikinci, her kutudakileri sayma üçüncü adımdır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İkinci basamağı seçerken hedefi, ilk adımı veya son sayımı onun yerine koyma; boyama işlemi hiç verilmemiştir.",
          },
        ],
        answer:
          "Aynı renk etiketini taşıyan parçaları ayrı kutulara yerleştirmek",
        check:
          "Ardından sözünün hemen sonrasında seçtiğin işlem yer alıyor mu diye denetle.",
        pitfall:
          "Önleme amacını yöntem basamağı saymak veya ilk görünen eylemi ikinci adım diye seçmek.",
      },
    ],
    recall: [
      {
        prompt: "Yanıttaki konu ile soru odağının farkını örnekle anlat.",
        answer:
          "Konu arşiv olabilir; odak arşivin tanımı, kuruluş zamanı veya kayıt yöntemidir. Aynı konu sözcüğü bu farklı soruları birbirinin cevabı yapmaz.",
      },
      {
        prompt: "Gerekli izin varsa yayın kesin midir?",
        answer:
          "Hayır. Yalnız izinliler yayımlanabilir kuralı izni gerekli kılar; ayrıca teknik inceleme gibi başka koşullar olabilir. İzin varlığından zorunlu yayın çıkmaz.",
      },
      {
        prompt:
          "Bir bileşik sorunun ilk parçası yanıtlanıyorsa tamamı cevaplanmış mıdır?",
        answer:
          "Hayır. Her gerekli alt isteğe ayrı metin karşılığı gerekir. Sayı verilmiş ama yaş verilmemişse kaç kişi ve hangi yaşta sorusu tamamlanamaz.",
      },
      {
        prompt: "Olumsuz kökte bilgi yok ile olay yok nasıl ayrılır?",
        answer:
          "Araç adı verilmemişse hangi araç sorusu cevaplanamaz; bundan araç kullanılmadığı sonucu çıkmaz. Yalnız eksik bilgi alanını belirtiriz.",
      },
      {
        prompt: "Neden, amaç ve yöntem ilişkilerini aynı eylem üzerinden ayır.",
        answer:
          "Yağmur nedeniyle içeri girmek gerçekleşmiş nedeni; ıslanmamak için girmek amacı; eşyaları toplayıp kapıdan girmek adımları yöntemi anlatır.",
      },
      {
        prompt: "İki seçenek de gerçekten cevaplanıyorsa ne yapmalısın?",
        answer:
          "Kökün bütün metin veya belirli cümle sınırını yeniden denetle. Ayrım yine yoksa olmayan öncül uydurup soru kurtarmak yerine çoklu doğru kusurunu belirle.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri: Paragrafta Anlam 1–3 ve Paragrafın Yapısı, basılı22–35; OGM11.Sınıf Mülakat/Röportaj Soru Çözümü ilgili öğretim örnekleri; Aurelia Paragrafta Soru Cevap ve Paragrafta Röportaj kağıtlarının16sayfasıyla karşılaştırılan özgün öğretim. Kişisel kaynak dosyaları ürüne taşınmaz. Kartlar özgün öğretim sorularıdır; resmî ÖSYM sorusu değildir.",
  },
  {
    id: "paragrafta-roportaj",
    title: "Paragrafta röportaj: iki sesi ve takip sorusunu izle",
    minutes: 120,
    objectives: [
      "Görüşmeci varsayımını görüşülen kişinin gerçek tutumundan ayır.",
      "İki yanıtı iki soruyla doğru sırada eşleştir.",
      "Önceki yanıta dayanan takip sorusunun yeni bilgi isteğini bul.",
      "Röportajın araştırma–gözlem alanını mülakatın soru–cevap odağından ayır.",
    ],
    sections: [
      {
        title: "Görüşmeyi iki ses olarak oku",
        paragraphs: [
          "Bir görüşmede soruyu yönelten kişiyle yanıtlayan kişi farklı rollerdedir. Görüşmeci bir konu açar, açıklama ister veya bir varsayım öne sürer. Görüşülen kişi bunu kabul edebilir, sınırlayabilir ya da reddedebilir. Sorudaki bir iddiayı yanıtta onay aramadan görüşülen kişinin düşüncesi saymak, sözün sahibini değiştiren bir okuma hatasıdır.",
          "Önce her konuşma sırasına rol etiketi koy: görüşmeci ve görüşülen kişi. Sonra soru ne istiyor, yanıt neyi kabul ediyor, neyi düzeltiyor diye ayrı notlar al. “Hep aynı yöntemi kullanıyorsunuz, değil mi?” sorusundan bir alışkanlık kesinleşmez. Yanıt “Hayır, projeye göre değişir.” diyorsa esas alınacak tutum açık ret ve değişken yöntemdir.",
        ],
      },
      {
        title: "Röportaj ile mülakatın kapsamı",
        paragraphs: [
          "Mülakat, bir kişinin görüşlerini planlı sorular ve yanıtlarla ortaya koyan görüşme biçimidir. Edebî öğretimde röportaj ise bir kişi, yer, olay veya sorun üzerine araştırma, gözlem, tanıklık ve gerektiğinde görüşme malzemesi içeren daha geniş bir metin olarak ele alınabilir. Bu nedenle her röportajın yalnız soru–cevap satırlarından oluşması gerekmez.",
          "Bu ünitenin çalışma başlığı paragrafta röportajdır; odak, verilen görüşme parçasını anlamak ve soruları yanıtlarla eşlemektir. Türün geniş anlamıyla soru tipinin dar becerisini ayır. Bir metinde soru–cevap bulunması onun bütün özelliklerinin tek başına belirlendiğini göstermez. Tür bilgisi soruluyorsa açık yapı özelliklerini, okuma soruluyorsa parçadaki gerçek sözleri kullan.",
        ],
      },
      {
        title: "Görüşmeye hazırlanmak",
        paragraphs: [
          "Planlı bir görüşme önceden konu ve kişi araştırması, amaca uygun sorular ve uygun bir görüşme düzeni gerektirir. Açık ve yalın bir soru, görüşülen kişinin hangi konuyu açıklayacağını anlamasına yardım eder. Önceden hazırlık yapılması, yeni yanıtlara göre takip sorusu sorulamayacağı anlamına gelmez; hazırlık ve esneklik birlikte yürüyebilir.",
          "Randevu, zamanına uyma, doğru hitap ve yanıtı çarpıtmama iletişimin koşullarıdır. Bunların varlığı bütün cevapların otomatik doğru olduğunu kanıtlamaz. Bir bilgi iddiası ayrıca kaynak ve bağlam denetimi gerektirebilir. Tür özelliklerini incelerken iletişimi kolaylaştıran davranış ile iddianın doğruluğunu garanti etme arasında geçersiz bir bağ kurma.",
        ],
      },
      {
        title: "Soru, yanıt ve dayanak",
        paragraphs: [
          "“Onarımda önce neye bakarsınız?” sorusu bir başlangıç adımı ister. “Önce çatlağın yerini kaydederim.” yanıtı o adımı verir. Ardından “Bu kaydı neden tutarsınız?” diye sorulduğunda hedef değişir; artık aynı eylemin gerekçesi istenir. Görüşme boyunca konu aynı kalsa da her turun bilgi isteği farklı olabilir.",
          "Bir yanıtı değerlendirirken konu, istenen yön ve dayanağı ayır. “Önce” sıra kurar; “çünkü” gerekçe gösterebilir; “ama” ise bir sınırlama veya karşı görüş getirebilir. Bu işaretler yol gösterir fakat tek başına karar değildir. Tam cümlede hangi eylemin hangi açıklamaya bağlandığını sözlü olarak kurabildiğinde eşleşme belirginleşir.",
        ],
      },
      {
        title: "Yanıttan eksik soruyu geri kur",
        paragraphs: [
          "Sorusu boş bırakılmış bir görüşmede önce yanıtı bir cümleyle özetle. “Eski defterleri önce tarar, sonra tarih ve kaynaklarını karşılaştırırım.” yanıtı bir malzeme inceleme yöntemini anlatır. Uygun soru bu yöntemi istemelidir. “Defterler niçin önemlidir?” aynı nesneyi taşısa da önem gerekçesini sorar; yanıtta o gerekçe verilmemiştir.",
          "Kendi aday sorunu seçeneklerden önce kurmak, anahtar sözcük çağrışımını azaltabilir. Fakat yazdığın ilk soruya körü körüne bağlanma; seçeneklerden biri yanıtın kapsamını daha doğru karşılayabilir. Soruyu geri kurarken görüşülen kişinin kişi eklerini ve zamanını da koru. Geçmişte yapılan bir iş ile sürekli uygulanan bir alışkanlığı kendiliğinden aynılaştırma.",
        ],
      },
      {
        title: "İki boşluk iki ayrı eşleşmedir",
        paragraphs: [
          "Birinci yanıt veri toplama yolunu, ikinci yanıt kısa anlatı tercihinin gerekçesini anlatabilir. Böyle bir parçada iki boşluğu aynı anahtar kelimeyle dolduramazsın. İlk yanıt için yöntem, ikinci için tercih ve neden etiketi kur. Sonra her aday soru çiftinin iki üyesini de kendi yanıtıyla karşılaştır.",
          "Birinci soru doğru, ikinci soru yanlışsa çift bütünüyle uygun değildir. Soru sırası da anlamlıdır; yöntem sorusunu gerekçe yanıtına taşımak eşleşmeyi bozabilir. İki yanıtı tek bir genel konu başlığında eritmek yerine iki bağı ayrı tut. Böylece bir seçeneği elerken hangi eşleşmenin ilk kez bozulduğunu açıkça gösterebilirsin.",
        ],
      },
      {
        title: "Takip sorusu önceki söze dayanır",
        paragraphs: [
          "Takip sorusu, yeni verilmiş bir yanıttaki açıklanmamış noktayı açar. Görüşülen kişi “Son aşamada iki farklı okur grubuyla deniyorum.” dediğinde “Bu iki grubu hangi ölçütle seçiyorsunuz?” doğal bir takip sorusudur. Grupların seçildiği bilgisi önceki yanıttan gelir; seçim ölçütü henüz açıklanmadığı için yeni bilgi istenir.",
          "Yanıtta zaten tam verilmiş bilgiyi aynen yeniden sormak başka bir iş yapar; açıklama isteği olabilir ama bilgi açığını kapatmaz. Gerçekte söylenmemiş bir eylemi yapılmış sayan soru ise yanlış öncül taşıyabilir. Takip sorusunun uygunluğunu yalnız konuşmanın akıcı duyulmasıyla değil, önceki yanıta dayanan öncülü ve yeni bilgi isteğiyle gerekçelendir.",
        ],
      },
      {
        title: "Yönlendiren soruyu fark et",
        paragraphs: [
          "“Her eleştiriyi reddettiğinize göre neden görüş alıyorsunuz?” sorusu, kişinin her eleştiriyi reddettiğini peşinen kabul eder. Yanıt “Hepsini reddetmiyorum; gerekçeli olanlarla metni yeniden inceliyorum.” diyorsa bu öncül düzeltilmiştir. Görüşülen kişiye ait olan görüş, sorunun varsayımı değil bu sınırlayıcı açıklamadır.",
          "Yönlendiren bir soru metin içinde bulunabilir; onu okuyunca varsayımı otomatik doğru saymamalısın. Kabul, ret ve düzeltme sözcüklerini yanıtın devamıyla birlikte ele al. “Hayır”dan sonra gelen cümle hangi kısmın reddedildiğini belirler. Kişinin bir soruya cevap vermesi, o sorudaki bütün iddiaları onaylaması anlamına gelmez.",
        ],
      },
      {
        title: "Görüş ile gözlemi ayır",
        paragraphs: [
          "“Atölye kapısı kırmızıydı.” gözleme dayalı bir nitelik bildirir. “Bu rengin mekânı daha sıcak gösterdiğini düşünüyorum.” ise yorum ve değerlendirmedir. Bir görüşme parçasında ikisi birlikte yer alabilir. Soruda konuşmacının görüşü istendiğinde yalnız olay, tarih veya nesne bilgisini tekrarlamak yeterli olmayabilir.",
          "Öznel bir görüş, metinde gerçekten dile getirildiğinde o kişinin tutumuna ilişkin doğru çıkarımın dayanağı olabilir. Bu, görüşün herkes için evrensel gerçek hâline geldiğini göstermez. “Bana göre” sözünü metinden silerek kişisel beğeniyi genel yasa gibi kurma. Hangi yargının kime ait olduğunu ve hangi kapsamla verildiğini koru.",
        ],
      },
      {
        title: "Anıdan temel görüşe geçmek",
        paragraphs: [
          "Bir sanatçı önce yaşadığı bir karışıklığı anlatıp sonra ortak üretimin değerini vurgulayabilir. Olay, yalnız ilginç bir ayrıntı olmak için değil temel görüşe dayanak oluşturmak için kullanılmış olabilir. Yanıtın bütününü soran bir soruda olayın niçin anlatıldığını, sonradan kurulan yargıyla bağlayarak incele.",
          "Buna rağmen son cümlenin her zaman asıl vurgu olduğunu varsayma. Metindeki gerekçe ve örnek ilişkisini izleyerek ana yönü belirle. Bir tek karşılaşmadan bütün okurların aynı davrandığı sonucu çıkarılamaz. Olayın katılımcıları, zamanı ve sonucu sınırlıdır; görüş ise bu olayla nasıl ilişkilendirildiği açık olduğu ölçüde yorumlanır.",
        ],
      },
      {
        title: "Zaman içindeki değişimi izle",
        paragraphs: [
          "“Önceleri notlarımı yalnız defterde tutardım; şimdi ses kaydı da alıyorum.” yanıtında eski ve yeni uygulama karşılaştırılır. Güncel uygulamaya ses kaydı eklenmiştir; defterin tamamen terk edildiği söylenmemiştir. “Artık defter kullanmıyorsunuz.” sonucu, ekleme bilgisini yerine geçme bilgisine dönüştürür.",
          "Önce, sonra, artık, hâlâ ve eskiden gibi zaman işaretlerini olaylarıyla birlikte yaz. Aynı kişinin iki dönemdeki tercihleri farklı olabilir; bu, aynı anda birbirini dışlayan iki iddia kurduğu anlamına gelmez. Bir soruda tutarlılık inceliyorsan önce zaman ve koşulların gerçekten aynı olup olmadığını kontrol et. Değişim ile çelişkiyi birbirine karıştırma.",
        ],
      },
      {
        title: "Sıklık ve kesinlik sınırları",
        paragraphs: [
          "“Bazen okurlarımla taslak paylaşırım.” ifadesi böyle bir paylaşımın bazı zamanlarda olduğunu bildirir; her taslağın paylaşıldığını göstermez. Tek başına bu cümleden hiçbir taslağın diğer koşullarda paylaşılmadığı da kesinleştirilemez. Kesin dışlama için “her birini değil” gibi ek sınırın açıkça verilmesi gerekir.",
          "Görüşmeci “Her taslağı mı?” diye sorar ve yanıt “Hayır, yalnız son kontrolü bitenleri.” olursa kapsam sınırı belirginleşir. Bu, kontrolü biten her taslağın kesin yayımlandığı anlamına gelmez; paylaşma ile yayımlama farklı eylemlerdir. Sıklık, grup kapsamı ve eylem türünü ayrı denetleyerek benzer görünen seçenekleri ayırabilirsin.",
        ],
      },
      {
        title: "Etkilenmek ile taklit etmek",
        paragraphs: [
          "Bir sanatçının başka yapıtları izlemesi, onları aynen kopyalamasıyla özdeş değildir. “Eski kayıtları dinlerim, ama melodilerini olduğu gibi kullanmam.” yanıtında haberdar olma ve birebir kullanmama birlikte bulunur. Buradan hiçbir biçimde etkilenmediği sonucu da çıkmaz; yanıt etkilenmenin bütün yollarını dışlamamaktadır.",
          "Bir kavramın şiddetini değiştirerek kurulan seçeneklere dikkat et: izlemek→taklit etmek, yararlanmak→tamamını almak, eleştirmek→tümden reddetmek. Bu fiiller farklı iddialar taşır. Doğru çıkarımı seçerken metindeki ilişkiyi aynı güçte yeniden söyle. Daha kesin, daha geniş veya daha sert bir yargı kuruyorsan ek kanıtın nerede olduğunu göstermelisin.",
        ],
      },
      {
        title: "Doğrudan söz ve aktarılmış söz",
        paragraphs: [
          "Görüşülen kişinin sözü konuşma sırası içinde aynen verilebilir; bir anlatıcı da onun söylediğini kendi cümlesiyle aktarabilir. “Ada, yöntemi değiştirdiğini söyledi.” aktarılmış bir bildiridir. “Ada: Yöntemi değiştirdim.” ise kişiye açıkça verilen doğrudan sözdür. İkisi anlamı aktarabilir ama kuruluş biçimleri aynı değildir.",
          "Bir tür sorusunda soru cümlesi, birinci kişi anlatımı veya doğrudan konuşma gibi özellikleri görünür metinle kanıtla. Metinde var olmayan bir anlatıcı yorumu üretme. Kişinin sözünün doğrudan verilmesi, söylediği bütün bilgilerin doğrulandığını da garanti etmez. Sunuş biçimi ile iddianın gerçek dünyadaki doğruluğu ayrı denetimlerdir.",
        ],
      },
      {
        title: "Gözlemli röportajın anlatım araçları",
        paragraphs: [
          "Röportajda yerin, nesnenin veya ortamın betimlenmesi; bir olayın sırasıyla anlatılması; araştırma bulgularının açıklanması birlikte kullanılabilir. Bu çeşitlilik, metnin tek bir kelimeyle sınıflanmasını zorlaştırabilir. Belirli bir paragrafta baskın işlevi soran soruyu, bütün röportajın tür özellikleri sorusundan ayırmak gerekir.",
          "Gözleme dayalı bir yer anlatısında mutlaka soru–cevap satırları aramak doğru değildir. Bir kişiyle yapılan mülakat parçasında da her cümlenin yalnız kişisel görüş olduğunu varsayma; olgusal bilgi verilebilir. Metnin içindeki anlatım işlevini gerçek cümlelerle göster. Tür etiketi, bağlam ve kanıt yerine geçmez; onların nasıl okunacağını düzenler.",
        ],
      },
      {
        title: "Aynı yanıtta iki ayrı ilişki",
        paragraphs: [
          "“Önce karakterin kararını belirlerim; çünkü olayların yönü o karara bağlıdır.” yanıtı hem çalışma adımı hem gerekçe içerir. “Nasıl başlarsınız?” ilk kısmı, “Neden o adımla başlarsınız?” ikinci kısmı öne çıkarır. Kök yanıtın yalnız bir bölümünü soruyorsa o sınırı koru; bütün yanıta ilişkin bir soruda iki ilişkiyi birlikte denetle.",
          "Bir yanıtın iki soruyu da cevaplayabilmesi doğal dilde mümkündür. Hazırlanmış sorunun tek doğruyu hedeflemesi, iki uygun sorudan birini keyfî biçimde yanlış saymanı haklı çıkarmaz. Burada belirleyici olan kökün isteneni açıkça sınırlaması ve seçeneklerin gerçekten ayrışmasıdır. Çözümde ilk cümle, ikinci cümle veya tüm yanıt gibi sınırları mutlaka belirt.",
        ],
      },
      {
        title: "Eksik bilgi ile ret farklıdır",
        paragraphs: [
          "Görüşülen kişi çalışma yerini anlatmış ama bütçeden hiç söz etmemiş olabilir. Bu durumda bütçenin bilinmediğini söyleyebilirsin; projenin bütçesiz olduğunu veya destek alınmadığını kesinleştiremezsin. “Söylenemez” kökünde metne aykırı yargı ile yeterli kanıtı olmayan yargı farklı gerekçelerle elenir.",
          "Olumlu kökte desteklenen bir iddia için hangi sözün dayanak olduğunu bul. Olumsuz kökte diğer dört seçeneğin de neden desteklendiğini göster. Görüşmecinin soru biçiminde kullandığı bir iddiaya dayanarak eksik alanı doldurma. Bilgi açıkça görüşülen kişinin yanıtından veya verilen güvenilir anlatıcı bağlamından gelmelidir.",
        ],
      },
      {
        title: "Bir röportajı soru haritasına dönüştür",
        paragraphs: [
          "Çok turlu görüşmede her soru ve yanıtı yan yana yerleştir: ilk soru başlangıç adımını, ikincisi onun gerekçesini, üçüncüsü istisna durumunu sorabilir. Aynı nesnenin sürekli geçmesi üç turun da aynı bilgiye sahip olduğunu göstermez. Haritada her turun yeni eklediği bilgiyi ayrı bir etiketle yaz.",
          "“Bu yöntemi” gibi bir gönderme bir önceki yanıttaki eyleme bağlanıyorsa oku öncülünden başlat. Önceki yanıt değiştiğinde takip sorusunun neye gönderdiği de değişebilir veya soru artık uygunsuz kalabilir. Etkileşimli görüşmede bu bağı gerçekten değiştirebilir, verilen yeni yanıtın önceki sözle tutarlı olup olmadığını inceleyebilirsin. Keşif, puanlı bir sınav sonucu değildir.",
        ],
      },
      {
        title: "Destekleri kademeli azalt",
        paragraphs: [
          "İlk örnekte rol, konu ve odak etiketleriyle çalış. Sonraki örnekte bu etiketleri kendin üret; açıklamayı yalnız takıldığın adımda aç. Daha sonra yeni bir görüşme parçasını yardımsız çöz ve gerekçeni görünür cümlelere bağla. Cevabı daha önce görmüş olmakla yeni bağlamda aynı işlemi yapabilmek birbirinden farklıdır.",
          "Yanlış yaptığında yalnız doğru seçeneği yeniden okumak yerine ilk bozulan bağı belirle: kişi mi değişti, bir varsayım mı onay sayıldı, yöntem mi neden sanıldı, yoksa kapsam mı büyüdü? Aynı beceriyi farklı konuşmacı ve içerikle yeniden dene. Bunu açık bir kontrol cümlesiyle bitir: “Şu sorunun şu kısmı, yanıttaki şu ifadeyle karşılanıyor.”",
        ],
      },
      {
        title: "Tür ve temsilcileri bağlamıyla öğren",
        paragraphs: [
          "Edebiyat öğretiminde Ruşen Eşref Ünaydın’ın Diyorlar ki adlı yapıtı mülakatın önemli örnekleri arasındadır. Röportajda ise Yaşar Kemal gibi yazarların araştırma ve tanıklığa dayalı metinleri anılır. Bu örnekler, mülakatın kişiye yönelen soru–cevap odağı ile röportajın daha geniş gözlem ve araştırma alanını somutlaştırır.",
          "Bir yapıt–yazar bilgisini, verilen paragrafın yanıt odağını bulmanın yerine koyma. Kişinin tanınmış olması da her cümlesinin doğru olmasını sağlamaz. Tür bilgisi sorusunda ad ve eser eşleşmesini kullanırsın; metin çözümünde ise yine görünür söz, bağlam ve kapsam gerekir. Bir türün tek bir örneğinden bütün örneklerinin aynı düzenle yazıldığı sonucu çıkarılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Yönlendiren soruyu yanıttan ayır",
        prompt:
          "Görüşmeci: “Fotoğraflarınızın hepsi renkli olduğuna göre siyah beyaz çekimleri değersiz mi buluyorsunuz?” Fotoğrafçı: “Hayır; bazı işlerimde siyah beyazı seçiyorum. Rengi de gri tonları da anlatmak istediğim şeye göre kullanıyorum.”\nFotoğrafçının kendi tutumu hangisidir?\nA) Renkli ve siyah beyaz çekimi anlatım amacına göre seçmektedir. B) Bütün işlerinin renkli olduğu varsayımını onaylamaktadır. C) Siyah beyaz bütün fotoğrafları değersiz saymaktadır. D) Fotoğrafta anlatım amacının hiçbir rolü olmadığını savunmaktadır. E) Bütün fotoğrafçıların aynı tekniği kullanmasını zorunlu görmektedir.",
        strategy:
          "Sorudaki varsayımla yanıtın ret ve tercih açıklamasını ayrı konuşmacılara bağla.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Görüşmeci, bütün fotoğrafların renkli olduğu ve siyah beyazın değersiz sayıldığı varsayımını getirir.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Fotoğrafçı hayır diyerek bu çerçeveyi reddeder; bazı işlerinde siyah beyazı kullandığını ve amaca göre seçim yaptığını açıklar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Görüşülen kişinin tutumu iki tekniği amaca göre seçmektir; sorudaki bütünlük ve değersizlik yargıları ona yüklenemez.",
          },
        ],
        answer:
          "Renkli ve siyah beyaz çekimi anlatım amacına göre seçmektedir.",
        check:
          "Seçeneğin hayır yanıtını ve iki tekniğin amaçla ilişkisini birlikte koruduğunu kontrol et.",
        pitfall:
          "Görüşmecinin iddiasını yalnız soru olarak yer aldığı için fotoğrafçının kabul ettiği gerçek saymak.",
      },
      {
        title: "İki cevapta yöntem ve tercih nedeni",
        prompt:
          "I. Yanıt: “Heykel taslağından önce meydanı farklı saatlerde gezer, geçiş yollarını çizime aktarırım.” II. Yanıt: “Küçük ölçekli modeli seçiyorum; çünkü farklı bakış açılarından yeniden denemeyi kolaylaştırıyor.”\nBu yanıtların sırasıyla karşılığı olan soru çifti hangisidir?\nA) Çalışmanız için gözlem malzemesini nasıl toplarsınız? / Küçük modeli niçin seçiyorsunuz? B) İlk heykelinizi kaç yaşında yaptınız? / Modelin ağırlığı nedir? C) Küçük modeli niçin seçiyorsunuz? / Gözlemi nasıl yaparsınız? D) Meydanı kim inşa etti? / Bütün büyük heykeller neden değersizdir? E) Kaç ödül kazandınız? / Hangi malzeme en pahalıdır?",
        strategy:
          "Birinci yanıtın uygulama yolunu, ikincinin gerekçeli model tercihini ayrı eşleştir.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Farklı saatlerde gezme ve geçiş yollarını çizme ilk yanıtın gözlem toplama yöntemidir.",
          },
          {
            label: "Bağı kur",
            explanation:
              "İkinci yanıtta küçük modelin farklı açılardan denemeyi kolaylaştırması tercih gerekçesi olarak verilmiştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Yöntemi önce ve tercih nedenini sonra soran çift iki bağı tamamlar; ters sıralı çift aynı yanıtları karşılamaz.",
          },
        ],
        answer:
          "Çalışmanız için gözlem malzemesini nasıl toplarsınız? / Küçük modeli niçin seçiyorsunuz?",
        check:
          "İki soruyu doğru sırada okuyup her birini yalnız karşısındaki yanıtla cevapla.",
        pitfall:
          "Tek eşleşme iyi çalıştığı için soru çiftinin diğer yarısını veya sırasını kontrol etmemek.",
      },
      {
        title: "Yeni araç eskisini zorunlu silmez",
        prompt:
          "Öğretmen: “Önceleri dersi yalnız tahtada çizerek anlatırdım. Şimdi öğrencilerin eline alınabilen modeller de kullanıyorum; tahtadaki çizimlerden vazgeçmedim. İki biçim farklı soruları görmemizi sağlıyor.”\nKonuşmacının zaman içindeki değişimini doğru anlatan yargı hangisidir?\nA) Tahta çizimini korurken uygulamasına elle incelenen modelleri eklemiştir. B) Çizim yapmayı tamamen bırakmıştır. C) Geçmişte de her zaman iki biçimi birlikte kullanmıştır. D) Bütün derslerde yalnız model kullanımını zorunlu kılmıştır. E) Modellerde öğrencilerin hiçbir soru sormadığını söylemiştir.",
        strategy:
          "Eski ve güncel uygulamayı iki dönemde yaz; ekleme ile yerine geçme arasını ayır.",
        steps: [
          {
            label: "Verileni ayır",
            explanation: "Eski dönemde yalnız tahtadaki çizim kullanılır.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Güncel dönemde modeller de eklenmiştir; vazgeçmedim sözü çizimin sürdüğünü açıkça verir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Çizimin devamı ile yeni model eklenmesini birlikte anlatan yargı doğrudur; geçmişe bu birliktelik taşınamaz.",
          },
        ],
        answer:
          "Tahta çizimini korurken uygulamasına elle incelenen modelleri eklemiştir.",
        check:
          "Seçenek hem yeni modeli hem sürdürülen çizimi aynı güncel düzen içinde tutuyor mu diye bak.",
        pitfall:
          "Yeni aracın kullanıldığını görünce eski aracın otomatik olarak bırakıldığı sonucunu çıkarmak.",
      },
      {
        title: "Gözlemden kişisel yorumu ayır",
        prompt:
          "Bir çevirmen: “İlk taslakta beş uzun cümle vardı. Ben bu cümleleri bölünce konuşmanın daha canlı duyulduğunu düşündüm. Başka bir çevirmen aynı ritmi uzun cümlelerle de kurabilir.”\nÇevirmenin kişisel değerlendirmesini bildiren ifade hangisidir?\nA) Cümleleri bölmenin kendi metnindeki konuşmayı daha canlı duyurduğu düşüncesi B) İlk taslakta beş uzun cümle bulunması C) Bütün çevirilerin aynı sayıda cümle taşıması gerektiği D) Başka çevirmenlerin uzun cümle kuramadığı E) Uzun cümlenin her durumda dil bilgisi hatası olduğu",
        strategy:
          "Sayılabilir taslak bilgisini, konuşmanın etkisine ilişkin yorumdan ayır.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "İlk taslaktaki beş uzun cümle sayısal bir metin bilgisidir.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Daha canlı duyulduğunu düşündüm ifadesi çevirmenin yaptığı değişikliğin etkisine dair yorumudur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Doğru seçenek bu kişisel değerlendirmeyi korur; son cümle başkalarının farklı biçimde aynı etkiyi kurabileceğini açık tutar.",
          },
        ],
        answer:
          "Cümleleri bölmenin kendi metnindeki konuşmayı daha canlı duyurduğu düşüncesi",
        check:
          "Cevabını düşündüm sözüne bağlayabildiğini ve bütün çevirilere kural yüklemediğini denetle.",
        pitfall:
          "Bir çevirmenin kendi taslak yorumunu bütün uzun cümlelerin yanlış olduğu genellemesine dönüştürmek.",
      },
      {
        title: "Görüşme satırlarının ötesindeki röportaj",
        prompt:
          "Bir muhabir eski bir istasyonun kullanımını araştırırken binayı gezer, mekânın görünüşünü anlatır, eski çalışanlarla görüşür ve arşivdeki kayıtlarla bugünkü durumu karşılaştırır. Yazısında bu malzemeleri birlikte kullanır.\nBu metin için en uygun açıklama hangisidir?\nA) Röportaj, gözlem, görüşme ve araştırma verilerini birlikte işleyebilir. B) Soru–cevap dışındaki bütün bölümler röportajı geçersiz kılar. C) Bir istasyon adı geçtiği için metin zorunlu olarak romandır. D) Görüşme yapılması kaynak karşılaştırmasını gereksiz kılar. E) Bir yerin betimlenmesi hiçbir öğretici metinde kullanılamaz.",
        strategy:
          "Tek bir tür işaretine kapanmak yerine verilen bilgi toplama yollarını birlikte say.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Binayı gezme gözlem, çalışanlarla konuşma görüşme, arşive başvurma araştırma malzemesidir.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Muhabir bunları görünür bir yer anlatısıyla birlikte kullanır; yalnız konuşma dökümü oluşturduğu söylenmez.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Röportajın geniş kapsamını bu yolları dışlamadan açıklayan seçeneği seç; tek işaretten zorunlu roman veya tek biçim kuralı çıkarma.",
          },
        ],
        answer:
          "Röportaj, gözlem, görüşme ve araştırma verilerini birlikte işleyebilir.",
        check:
          "Seçtiğin açıklama gezme, görüşme ve arşiv karşılaştırmasının üçünü de kapsıyor mu diye kontrol et.",
        pitfall:
          "Bir görüşme parçasının kuruluşunu bütün röportajlar için tek zorunlu biçim saymak.",
      },
      {
        title: "Hazırlık ve takip bir arada",
        prompt:
          "Öğrenci muhabir, belediyenin yeni parkını anlatan görüşmeden önce planları okudu ve üç soru hazırladı. Mimarın yağmur suyunu toplama sistemini anlatması üzerine bu sistemin bakımını nasıl yaptıklarını sordu. Verilen teknik bilgileri daha sonra planla karşılaştıracağını not etti.\nBu süreç hangi değerlendirmeyi destekler?\nA) Ön hazırlık, yanıta bağlı yeni soru ve ayrı bilgi denetimi birlikte yürütülebilir. B) Önceden üç soru hazırlamak bütün ek soruları yasaklar. C) Mimarın konuşması planın okunmasını otomatik olarak gereksiz kılar. D) Bir takip sorusu sorulması hiç hazırlık yapılmadığını kanıtlar. E) İddianın kontrol edilmesi konuşmacının mutlaka yalan söylediği anlamına gelir.",
        strategy:
          "Hazırlık, görüşme içindeki yeni bilgi isteği ve sonradan denetimi üç ayrı işlem olarak kur.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Planları önceden okuma ve üç soru hazırlama görüşmeye hazırlık aşamasıdır.",
          },
          {
            label: "Bağı kur",
            explanation:
              "Mimarın yeni açtığı su sistemi konusu, bakımına ilişkin uygun bir takip sorusuna yol açar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Planla sonradan karşılaştırma ayrı denetimdir; bu üç işlemin birlikte bulunması tutarlıdır ve tek başına yalan sonucu üretmez.",
          },
        ],
        answer:
          "Ön hazırlık, yanıta bağlı yeni soru ve ayrı bilgi denetimi birlikte yürütülebilir.",
        check:
          "Doğru açıklamanın metindeki hazırlığı da yeni soruyu da kontrol notunu da koruduğunu denetle.",
        pitfall:
          "Bir bilgiyi denetlemeyi otomatik olarak konuşmacının yalanını bulmuş olmakla veya saygısızlıkla eşitlemek.",
      },
    ],
    recall: [
      {
        prompt:
          "Görüşmeci sorusundaki iddia hangi koşulda konuşmacının görüşü sayılır?",
        answer:
          "Sorulmuş olması yetmez. Yanıtın onu gerçekten onaylaması gerekir; hayır, yalnız bazıları gibi düzeltmeler rol ve kapsamı değiştirir.",
      },
      {
        prompt: "İyi takip sorusunun iki parçasını söyle.",
        answer:
          "Önceki yanıtta gerçekten bulunan bir öncül ve henüz açıklanmamış yeni bilgi isteği. Yapılmadığı söylenen bir eylemi yapılmış kabul etmez.",
      },
      {
        prompt:
          "Eski yöntemime yeni araç da ekledim ifadesinden eskisini terk ettim çıkar mı?",
        answer:
          "Çıkmaz. Da ekleme ilişkisi kurar; eski aracın sürüp sürmediği ayrıca verilir. Ekleme ile yerine geçmeyi ayırmalıyız.",
      },
      {
        prompt: "Bir olayı anlatan uzun yanıtta ana yön nasıl bulunur?",
        answer:
          "Olayın sonraki görüşe nasıl dayanak olduğunu inceleyerek bulunur. Yalnız ilk ilginç ayrıntı veya otomatik son cümle kuralı kullanılmaz.",
      },
      {
        prompt: "İzlemek ile taklit etmek neden aynı değildir?",
        answer:
          "Başka kayıtları dinlemek onların biçimini aynen kopyalamak değildir. Birebir kopyalamamadan hiçbir etkilenme olmadığı da çıkarılamaz.",
      },
      {
        prompt: "Mülakat ve geniş röportaj kapsamını karşılaştır.",
        answer:
          "Mülakat kişinin görüşlerini planlı soru–cevapla açar. Röportaj bir kişi, yer veya sorunu araştırma, gözlem ve tanıklıkla da işleyebilir; yalnız konuşma dökümü olmak zorunda değildir.",
      },
    ],
    source:
      "MEBİ TYT Türkçe Konu Özetleri: Paragrafta Anlam 1–3 ve Paragrafın Yapısı, basılı22–35; OGM11.Sınıf Mülakat/Röportaj Soru Çözümü ilgili öğretim örnekleri; Aurelia Paragrafta Soru Cevap ve Paragrafta Röportaj kağıtlarının16sayfasıyla karşılaştırılan özgün öğretim. Kişisel kaynak dosyaları ürüne taşınmaz. Kartlar özgün öğretim sorularıdır; resmî ÖSYM sorusu değildir.",
  },
];
const questionRows023 = [
  [
    {
      passage:
        "Ses arşivi, kayıtların tarih, yer ve kaynak bilgileriyle birlikte korunduğu bir bütündür. Böyle bir arşiv yalnız ses dosyalarından değil, her kaydı tanımamıza yarayan bilgilerden de oluşur.",
      prompt: "Bu yanıtın doğrudan açıkladığı soru hangisidir?",
      options: [
        "Ses arşivi nedir ve hangi bileşenleri içerir?",
        "Ses arşivi hangi yılda kuruldu?",
        "Kayıtların teknik temizliği hangi adımlarla yapılır?",
        "Arşiv kurmanın maliyeti neden arttı?",
        "Arşive hangi koşulla ziyaretçi alınır?",
      ],
      reasons: [
        "Kavramın tanımı ve kayıtla birlikte tutulan bilgiler iki cümlede açıkça verilir.",
        "Kuruluş yılı verilmedi; tarih bilgisi kavramın bileşeni olarak anılıyor.",
        "Kayıt temizleme işlemlerinin sırası anlatılmıyor.",
        "Maliyet veya maliyet artışının nedeni metinde yok.",
        "Ziyaretçi kabulüne ilişkin bir koşul belirtilmiyor.",
      ],
      knowledge: [
        "Tanım sorusu, kavramın ne olduğunu ve ayırt edici yapısını ister.",
        "Bir kaydın tarih bilgisini içermesi, arşivin kuruluş tarihinin verildiği anlamına gelmez.",
      ],
      strategy:
        "Kavramı açıklayan yargıyla, metinde bulunmayan tarih ve yöntem alanlarını ayır.",
      steps: [
        "İlk cümle ses arşivini kayıt ve tanıtıcı bilgilerden oluşan bütün olarak tanımlar.",
        "İkinci cümle yalnız dosya değil, onu tanımaya yarayan bilgilerin de bulunduğunu açıklar.",
        "Tanım ve bileşenleri soran seçenek iki cümleyi birlikte karşılar; diğer sorular için yeni bilgi gerekir.",
      ],
      commonError:
        "Tarih sözcüğünü görüp bunun arşivin kuruluş yılı olduğunu varsaymak.",
      check:
        "Seçtiğin soruya hem kayıtlar hem onların tarih, yer ve kaynak bilgileriyle cevap verebildiğini denetle.",
    },
    {
      passage:
        "Toplantıyı erteledik; salonun güvenlik denetimi henüz tamamlanmamıştı. Yeni tarihte katılımcıların güvenle çalışabileceği bir ortam sunmak istiyoruz.",
      prompt:
        "Yalnız ilk cümledeki ilişkiyi doğrudan soran seçenek hangisidir?",
      options: [
        "Toplantıyı niçin ertelediniz?",
        "Yeni toplantıda neyi amaçlıyorsunuz?",
        "Toplantıyı hangi saat için planladınız?",
        "Güvenlik denetimini hangi araçlarla yaptınız?",
        "Katılımcılara yeni tarihi nasıl duyurdunuz?",
      ],
      reasons: [
        "İlk cümle erteleme ile tamamlanmamış güvenlik denetimi arasında neden bağı kurar.",
        "Güvenli ortam sunma amacı ikinci cümlede; kök yalnız ilkini istiyor.",
        "Saat veya takvim ayrıntısı verilmemiştir.",
        "Denetimin araçları değil, tamamlanmadığı söylenir.",
        "Duyurma işlemi ve yöntemi anlatılmıyor.",
      ],
      knowledge: [
        "Neden sorusu gerçekleşmiş olayın gerekçesini ister.",
        "Kökün ilk cümle sınırı, sonraki amaç cümlesini seçim dayanağı yapmayı engeller.",
      ],
      strategy:
        "İlk cümledeki olayı ve onu doğuran etkeni eşleştir; ikinci cümlenin hedefini ayır.",
      steps: [
        "Açıklanan olay toplantının ertelenmesidir.",
        "Denetimin bitmemesi, bu olayı gerekçelendiren gerçekleşmiş durumdur.",
        "Niçin ertelediniz sorusunu denetimin tamamlanmamasıyla cevapla; gelecek hedefi ayrı tut.",
      ],
      commonError:
        "Güvenlik sözcüğü iki cümlede de geçtiği için nedeni gelecekteki amaçla aynı saymak.",
      check:
        "Cevabındaki gerekçenin ilk cümlede bulunduğunu, ikinci cümlenin hedefine dayanmadığını kontrol et.",
    },
    {
      passage:
        "Etiketleri daha büyük yazdık ki ziyaretçiler bilgileri uzaktan da okuyabilsin. Okuma mesafesini herkes için aynı kabul etmedik; etiketleri farklı uzaklıklardan yeniden deneyeceğiz.",
      prompt:
        "Bu yanıt, etiketlerin büyütülmesine ilişkin hangi soruyu doğrudan karşılar?",
      options: [
        "Etiketleri büyütmekle neyi amaçladınız?",
        "Etiketleri kaç santimetre büyüttünüz?",
        "Bütün ziyaretçilerin okuduğunu nasıl kanıtladınız?",
        "Etiketler hangi gün basıldı?",
        "Ziyaretçilerin yaşlarını hangi yöntemle ölçtünüz?",
      ],
      reasons: [
        "Uzaktan okunabilme hedefi açık; büyütme işlemi bu amaçla ilişkilendiriliyor.",
        "Büyüklüğe ilişkin santimetre ölçüsü verilmemiştir.",
        "Herkesin okuduğu kanıtlanmıyor; farklı uzaklıklarda yeniden deneme planı var.",
        "Basım günü bulunmuyor; büyütmenin amacı açıklanıyor.",
        "Yaş ölçümü hakkında hiçbir veri yok.",
      ],
      knowledge: [
        "Amaç gerçekleşmesi hedeflenen sonucu gösterir.",
        "Hedefin söylenmesi, sonucun bütün kişiler için gerçekleştiğini kanıtlamaz.",
      ],
      strategy: "Yapılan işlem ile ulaşılmak istenen sonucu ayrı yaz.",
      steps: [
        "Yapılan işlem etiketlerin büyütülmesidir.",
        "Ki ile bağlanan ifade ziyaretçinin uzaktan okuyabilmesini hedef olarak verir.",
        "Amaç sorusu bu ilişkiyi doğrudan karşılar; ölçü ve kesin başarı isteyen seçenekler yeni veri gerektirir.",
      ],
      commonError:
        "Uzaktan okunması hedeflendiği için herkesin artık kesin okuduğunu çıkarmak.",
      check:
        "Seçtiğin soru bir hedef mi istiyor, yoksa ölçülmüş evrensel sonuç mu; metin yalnız ilkini sağlıyor.",
    },
    {
      passage:
        "Önce örnekleri aynı terazide tarttık. Sonra hepsini aynı sıcaklıkta kurutup yeniden tarttık; iki ölçüm arasındaki farkı her örneğin kaydına yazdık.",
      prompt: "Bu açıklama hangi sorunun yanıtı olabilir?",
      options: [
        "Örnekleri incelemek için hangi işlem sırasını izlediniz?",
        "İncelemeyi hangi yılda başlattınız?",
        "İncelemenin bütçesini kim karşıladı?",
        "Örneklerin birbirinden farklı çıkmasının nedeni nedir?",
        "Bu incelemeyi yapmanın toplumsal gereği nedir?",
      ],
      reasons: [
        "Tartma, kurutma, yeniden tartma ve farkı yazma eylemleri sıralı bir inceleme yöntemi oluşturur.",
        "Önce ve sonra göreli sıra verir, takvim yılı vermez.",
        "Bütçeyi karşılayan kişi veya kurum anılmaz.",
        "Örnek sonuçlarının farklı çıktığı bile söylenmiyor; farkın kaydı anlatılıyor.",
        "İncelemeyi seçme gerekçesi değil, uygulama adımları açıklanıyor.",
      ],
      knowledge: [
        "Yöntem sorusu işin hangi işlemlerle yürütüldüğünü ister.",
        "İşlem sırası ile takvim zamanı aynı bilgi alanı değildir.",
      ],
      strategy:
        "Fiilleri sırayla listele ve bu dizinin hangi bilgi isteğini karşıladığını bul.",
      steps: [
        "Eylemleri tartma → kurutma → yeniden tartma → farkı kaydetme olarak çıkar.",
        "Bu sıra bir uygulama yolunu açıklar; seçimin nedeni veya bütçesi belirtilmez.",
        "İşlem sırasını soran soruya bütün basamaklarla cevap verilebildiği için eşleşme tamdır.",
      ],
      commonError:
        "Önce sözcüğünü başlangıç yılının verildiği sanısına dönüştürmek.",
      check:
        "Yanıtın dört eylemini seçtiğin sorunun cevabı olarak sırasını bozmadan söyle.",
    },
    {
      passage:
        "Kitapları büyüteçle inceledik. Onarılacakları, hasarın ilerleme riskine göre önceliklendirdik; aynı risk grubundakileri geliş sırasıyla ele aldık.",
      prompt:
        "Yalnız öncelik kararının temel ölçütünü soran seçenek hangisidir?",
      options: [
        "Kitapların onarım önceliğini neye göre belirlediniz?",
        "Kitapları hangi araçla incelediniz?",
        "Kitaplar hangi tarihte getirildi?",
        "Büyüteci hangi yöntemle ürettiniz?",
        "Onarım neden bütün kitaplarda aynı sürede bitti?",
      ],
      reasons: [
        "Önceliğin temelinde hasarın ilerleme riski olduğu açık; eşit riskte sıra ayrıca belirtilir.",
        "Büyüteç araçtır; bu soru karar ölçütünün yerine inceleme aracını sorar.",
        "Geliş sırası anılır ama takvim tarihi verilmez.",
        "Büyütecin üretimi konu edilmemiştir.",
        "Onarımların aynı sürede bittiği yönünde bir öncül yoktur.",
      ],
      knowledge: [
        "Ölçüt kararın dayanağı, araç ise işlemi yapmada kullanılan nesnedir.",
        "Eşitlik durumundaki ikinci kural temel ölçütü ortadan kaldırmaz.",
      ],
      strategy:
        "İnceleme aracını ve sıralama kararının iki kademeli ölçütünü ayrı alanlara yerleştir.",
      steps: [
        "Büyüteç, kitabın yüzeyini görmeye yarayan inceleme aracıdır; kararın dayanağı ayrı bir bilgidir.",
        "İlk öncelik risk düzeyine, eşit riskteki sıra ise geliş sırasına dayanıyor.",
        "Temel ölçüt sorusunu riskle cevapla; araç sorusu aynı konuda olsa da istenen odağı karşılamaz.",
      ],
      commonError:
        "Büyüteç metinde somut göründüğü için onu karar ölçütü sanmak.",
      check:
        "Seçilen soruya büyüteç diye değil, hasarın ilerleme riski diye cevap verdiğini denetle.",
    },
    {
      passage:
        "Atölye salı günü okulun küçük salonunda başladı. On iki gönüllü, dört hafta boyunca ses kayıtlarını düzenledi. Başlangıç saati duyuruda yazılmadı.",
      prompt: "Bu parçadan aşağıdaki sorulardan hangisi cevaplanamaz?",
      options: [
        "Atölye saat kaçta başladı?",
        "Atölye hangi gün başladı?",
        "Atölye nerede başladı?",
        "Kayıtları kaç gönüllü düzenledi?",
        "Çalışma ne kadar sürdü?",
      ],
      reasons: [
        "Başlangıç saatinin yazılmadığı açık; gün ve süre saat bilgisini tamamlamaz.",
        "Salı günü ifadesi başlama gününü verir.",
        "Okulun küçük salonu başlangıç yeridir.",
        "On iki gönüllü kişi sayısını açıkça karşılar.",
        "Dört hafta boyunca ifadesi çalışma süresini verir.",
      ],
      knowledge: [
        "Gün, saat ve süre farklı ayrıntı düzeyleridir.",
        "Cevaplanamaz kökünde diğer dört sorunun metin karşılığı ayrı ayrı bulunmalıdır.",
      ],
      strategy: "Gün, yer, kişi, süre ve saat için beş ayrı bilgi alanı kur.",
      steps: [
        "Gün=salı, yer=okulun küçük salonu, kişi=on iki, süre=dört hafta biçiminde verileri eşleştir.",
        "Saat alanında veri yok; son cümle bu eksikliği ayrıca açıklar.",
        "Cevaplanamayan soru saati sorandır; salı veya dört hafta ile bu alan doldurulamaz.",
      ],
      commonError:
        "Dört hafta veya salı ifadesini saat sorusuna cevap diye kullanmak.",
      check:
        "Diğer dört seçenek için tam ifade gösterebildiğini, yalnız saat alanının boş kaldığını kontrol et.",
    },
    {
      passage:
        "Kurala göre yalnız konuşanın izin verdiği kayıtlar yayımlanabilir. İzin verilenler ayrıca teknik incelemeden geçirilir; bu incelemeyi geçmeyenler yayımlanmaz.",
      prompt:
        "Parçada yayımlama için verilen koşulları doğrudan soran seçenek hangisidir?",
      options: [
        "Bir kaydın yayımlanabilmesi için hangi koşullar aranır?",
        "İzin verilen her kayıt neden mutlaka yayımlanır?",
        "İzin vermeyenlerin kayıtları hangi gün yayımlanır?",
        "Teknik incelemeyi kaç kişi yapar?",
        "Bütün kayıtların saklanma süresi kaç yıldır?",
      ],
      reasons: [
        "İzin ve teknik inceleme koşulları birlikte verilmiştir; yayımlanabilme bunlarla sınırlandırılır.",
        "İzin tek başına yeterli değildir; incelemeyi geçmeyenler yayımlanmaz.",
        "İzinsiz kayıtların yayımlandığı öncülü izin kuralıyla çelişir.",
        "İnceleyen kişi sayısı verilmemiştir.",
        "Saklama süresi hakkında yıl bilgisi yoktur.",
      ],
      knowledge: [
        "Gerekli koşulun bulunması, diğer koşulların da sağlandığını göstermez.",
        "Yayımlanabilir ile mutlaka yayımlanır aynı kesinlikte değildir.",
      ],
      strategy:
        "İzin kapısını ve teknik kontrol kapısını ayrı tut; tek kapıyı bütün süreç yerine koyma.",
      steps: [
        "İlk cümle yayımlama için iznin gerekli olduğunu kurar.",
        "İkinci cümle teknik incelemenin ayrıca gerekli olduğunu ve başarısız kaydın yayımlanmadığını söyler.",
        "Koşulları soran seçenek iki sınırı korur; izin varsa kesin yayımlanır diyen seçenek yeni bir yeterlilik uydurur.",
      ],
      commonError:
        "Yalnız izinliler ifadesini izin verilenlerin hepsi mutlaka yayımlanır diye tersine çevirmek.",
      check:
        "İzin var ama teknik inceleme başarısız durumunda seçtiğin sorunun cevabının yayımlama zorunluluğu üretmediğini dene.",
    },
    {
      passage:
        "Gönüllüler bir cumartesi müzede buluştu. Kırk nesneyi fotoğrafladılar ve üç gün içinde bir liste hazırladılar. Listeyi hazırlarken kullandıkları yazılımın adı açıklanmadı.",
      prompt: "Aşağıdaki sorulardan hangisinin yanıtı bu parçada yoktur?",
      options: [
        "Liste hazırlanırken hangi yazılım kullanıldı?",
        "Gönüllüler nerede buluştu?",
        "Kaç nesne fotoğraflandı?",
        "Buluşma haftanın hangi günüydü?",
        "Liste kaç gün içinde hazırlandı?",
      ],
      reasons: [
        "Yazılımın adının açıklanmadığı belirtilir; fotoğraf çekilmesi program adını vermez.",
        "Müze buluşma yerini açıkça karşılar.",
        "Kırk nesne sayıyı açıkça verir.",
        "Cumartesi ifadesi haftanın günüdür.",
        "Üç gün içinde ifadesi hazırlanma süresini bildirir.",
      ],
      knowledge: [
        "Araç bilgisi bir işlemin yapılmış olmasından otomatik çıkarılamaz.",
        "Bir adın açıklanmaması o aracın hiç kullanılmadığını göstermez.",
      ],
      strategy:
        "Her adayın metindeki karşılığını bul; eksik aracı dış bilgiyle tamamlama.",
      steps: [
        "Yer, sayı, gün ve süre için sırasıyla müze, kırk, cumartesi ve üç gün verilerini bul.",
        "Yazılım alanı açık bırakılmıştır; olası program adlarından herhangi birini seçmek varsayım olur.",
        "Bu nedenle yalnız yazılım sorusu cevaplanamaz; bunun anlamı yazılım kullanılmadığı değildir.",
      ],
      commonError:
        "Fotoğraflama veya liste hazırlama alışkanlığından tanıdık bir yazılım adı tahmin etmek.",
      check:
        "Cevap yok sonucunu hiçbir yazılım kullanılmadı cümlesine dönüştürmediğini kontrol et.",
    },
    {
      passage:
        "Sayısal katalogda görünmeyen bir notu eski bir fişte buldum. Bu deneyimden sonra hem fişleri hem sayısal kayıtları birlikte koruyorum; iki kaynak birbirini tamamlayabiliyor.",
      prompt: "Parçanın bütününe en uygun soru hangisidir?",
      options: [
        "İki katalog türünü birlikte korumayı neden tercih ediyorsunuz?",
        "Fişlerin tamamı hangi yılda basıldı?",
        "Sayısal kataloğu ilk kim geliştirdi?",
        "Eski fişleri hangi boyutlarda kesiyorsunuz?",
        "Bütün sayısal kayıtlar neden hatalıdır?",
      ],
      reasons: [
        "Eski fişte ek bilgi bulunması, iki kaynağı birlikte koruma kararının gerekçesi olarak kurulmuştur.",
        "Fişlerin basım yılı anlatılmıyor.",
        "Kataloğun geliştiricisi veya ilkliği hakkında bilgi yok.",
        "Fişlerin kesim boyutu metne eklenmiş bir işlem alanıdır.",
        "Bir notun eksikliği bütün sayısal kayıtları hatalı yapmaz; metin tamamlayıcılıktan söz ediyor.",
      ],
      knowledge: [
        "Bir örnek, sonraki kararın gerekçesi olabilir.",
        "Tek eksikten bütün kayıtları kapsayan hata genellemesi çıkmaz.",
      ],
      strategy:
        "Olayı, kararını ve aralarındaki gerekçe bağını birlikte özetle.",
      steps: [
        "Olay, sayısal katalogda olmayan notun fişte bulunmasıdır.",
        "Karar, iki kaynak türünü birlikte korumaktır; son cümle tamamlayıcı olabilmelerini açıklar.",
        "Birlikte koruma nedenini soran seçenek bu üç parçayı kapsar; bütün sayısal kayıtları suçlayan seçenek kapsamı aşar.",
      ],
      commonError:
        "Tek bir eksik not örneğini bütün sayısal kayıtların değersiz olduğu sonucuna büyütmek.",
      check:
        "Seçtiğin sorunun hem fişte bulunan ek bilgiyi hem birlikte koruma kararını cevap içinde birleştirdiğini denetle.",
    },
    {
      passage:
        "Bazı katılımcılar süreç çizimlerini yararlı buluyor. Ancak aynı çizim her metne uymuyor; aşama anlatan yazılarda işe yararken belirsiz duygulara dayanan yazılarda metnin kendisi daha belirleyici olabiliyor.",
      prompt: "Bu yanıtın tamamını karşılayan soru hangisidir?",
      options: [
        "Süreç çizimleri hangi durumlarda yararlı olabilir ve hangi sınıra sahiptir?",
        "Bütün katılımcılar çizimleri niçin aynı derecede sever?",
        "Çizim kullanmak bütün metinlerde neden zorunludur?",
        "Çizim alışkanlığı hangi yaşta kazanılır?",
        "Duygu anlatan bütün metinler neden anlaşılmazdır?",
      ],
      reasons: [
        "Yanıt hem belirli yazılardaki yararı hem her metne uygun olmama sınırını açıklıyor.",
        "Bazı katılımcılar deniyor; bütün ve aynı derece bilgileri yok.",
        "Her metne uymuyor cümlesi evrensel zorunluluk öncülünü dışlar.",
        "Yaş ve kazanım zamanı belirtilmiyor.",
        "Metnin daha belirleyici olması bütün duygu metinlerinin anlaşılmaz olduğunu söylemez.",
      ],
      knowledge: [
        "Bütün yanıtı karşılayan bileşik soru, ana bölümlerin ikisini de istemelidir.",
        "Bazı ve olabilir sözleri evrensel kesinlik sağlamaz.",
      ],
      strategy:
        "Olumlu kullanım örneğini ve onu sınırlayan karşı durumu aynı soru içinde koru.",
      steps: [
        "İlk bilgi bazı kişilerin yarar gördüğüdür; bu herkes hakkında verilmez.",
        "İkinci bilgi etkililiğin metnin yapısına göre değişebilmesidir.",
        "Kullanım durumu ve sınırını birlikte soran seçenek bütünü kapsar; diğerleri nicelik veya zorunluluk ekler.",
      ],
      commonError:
        "İlk olumlu cümleyi seçip ancakla başlayan sınırı görmezden gelmek.",
      check:
        "Soru hem yararı hem sınırı istiyor mu ve cevapta bazı/her metin değil kapsamı korunuyor mu diye bak.",
    },
    {
      passage:
        "İlk yanıt: “Konuşmaları önce ses kaydına alır, sonra duraklamaları da göstererek yazıya geçiririm.” İkinci yanıt: “Yalnız yayımlama izni verilen bölümleri paylaşırım; izin verilmeyenler arşivde kalır.”",
      prompt: "İki yanıtı sırasıyla karşılayan soru çifti hangisidir?",
      options: [
        "Konuşmayı yazıya hangi adımlarla geçirirsiniz? / Paylaşımda hangi izin sınırını uygularsınız?",
        "Konuşmayı niçin kaydedersiniz? / Arşiv kaç yıllıktır?",
        "Kayıt hangi ülkede yapıldı? / Bütün konuşmaları neden yayımlarsınız?",
        "Paylaşımda hangi izin sınırı var? / Yazıya hangi adımlarla geçirirsiniz?",
        "Kayıt cihazı kaç liradır? / Konuşmacılar hangi yaştadır?",
      ],
      reasons: [
        "Birinci yöntem, ikinci izin koşulu odağıdır; doğru çift bunları aynı sırayla sorar.",
        "İlk yanıtta amaç, ikinci yanıtta arşiv yaşı verilmez.",
        "Ülke yoktur ve bütününü yayımlama öncülü açık izin sınırına aykırıdır.",
        "İki soru kendi başına uygun konuları taşısa da sıraları yanıtlarla ters düşer.",
        "Fiyat ve yaş için iki yanıtta da veri yok.",
      ],
      knowledge: [
        "İki boşluklu eşleştirmede iki bağı ayrı ayrı ve doğru sırayla denetlemek gerekir.",
        "Yöntem bilgisi ile yayımlama koşulu aynı bilgi alanı değildir.",
      ],
      strategy:
        "İlk yanıta yöntem, ikinciye koşul etiketi koy; soru çiftinin sırasını koru.",
      steps: [
        "Ses kaydı → duraklamalarıyla yazıya geçirme ilk yanıtın işlem zinciridir.",
        "İkinci yanıtta izin, paylaşılabilecek bölümleri sınırlar.",
        "Yöntemi önce ve izni sonra soran çift iki bağı da tamamlar; ters sıralı çift uygun değildir.",
      ],
      commonError:
        "İki sorunun konu olarak uygun görünmesini yeterli sayıp sıralarını denetlememek.",
      check:
        "Birinci sorunun cevabını yalnız ilk yanıttan, ikincinin cevabını yalnız ikinci yanıttan kurabildiğini dene.",
    },
    {
      passage:
        "Çalışmayı 2022 yılında başlattık. İlk sonuçlar ertesi yıl çevrim içi bir toplantıda paylaşıldı. Toplantıyı otuz kişi izledi; çalışmanın yapıldığı kentin adı verilmedi.",
      prompt:
        "Hangi bileşik soru parçadaki bilgilerle bütünüyle cevaplanabilir?",
      options: [
        "Çalışma ne zaman başladı ve ilk sonuçlar hangi yolla paylaşıldı?",
        "Çalışma hangi kentte ve hangi gün başladı?",
        "Toplantıyı kim yönetti ve hangi yazılım kullanıldı?",
        "Çalışmanın bütçesi nedir ve kim ödedi?",
        "Kaç kişi izledi ve izleyicilerin yaşları nedir?",
      ],
      reasons: [
        "2022 yılı başlangıcı, çevrim içi toplantı ise paylaşım yolunu açıkça verir.",
        "Kent ve gün bilgileri verilmez; yıl bunların yerine geçmez.",
        "Yönetici veya kullanılan yazılımın adı belirtilmiyor.",
        "Bütçe ve ödeyen hakkında veri yoktur.",
        "Otuz kişi sayı kısmını karşılar ama yaş kısmı eksik kalır.",
      ],
      knowledge: [
        "Bileşik soruda yalnız bir alt sorunun cevaplanması tam eşleşme sayılmaz.",
        "Yıl, gün, kent ve paylaşım yolu farklı bilgi alanlarıdır.",
      ],
      strategy: "Her seçenekteki iki isteği ayrı ayrı cevaplamayı dene.",
      steps: [
        "Doğru adayın ilk parçasına 2022, ikinci parçasına çevrim içi toplantı cevabını yerleştir.",
        "Otuz kişi ifadesi izleyici sayısını verir fakat aynı seçenekteki yaş isteğini karşılamaz.",
        "İki parçası da metinle tamamlanan tek bileşik soruyu seç; bir doğru parça eksik parçayı gidermez.",
      ],
      commonError:
        "Otuz sayısını bulduktan sonra aynı seçenekteki yaş isteğini atlamak.",
      check:
        "Seçtiğin seçeneğin iki bölümünün karşısında da açık bir metin cevabı olduğundan emin ol.",
    },
    {
      passage:
        "Soru: “Düzenlemeyi her sayfada mı yapıyorsunuz?” Yanıt: “Hayır, bunu yalnız okuyucu denemesinde karışan sayfalarda yapıyorum. Diğer sayfaların düzenini aynı bırakıyorum.”",
      prompt:
        "Yanıttaki “bunu” sözcüğü verilen bağlamda hangi işlemi karşılar?",
      options: [
        "Sayfa düzenini değiştirmeyi",
        "Okuyucu sayısını artırmayı",
        "Bütün sayfaları yeniden basmayı",
        "Okuyucuların yaşını ölçmeyi",
        "Her sayfaya aynı soruyu eklemeyi",
      ],
      reasons: [
        "Önceki soru düzenleme eylemini açar; bunu sözü aynı eyleme gönderir.",
        "Okuyucu sayısında bir artış eylemi verilmemiştir.",
        "Yeniden basma değil, belirli sayfalardaki düzenleme söz konusudur.",
        "Yaş ölçümü metinde bulunmuyor; konu, sayfa düzeninin hangi sayfalarda değiştirildiğidir.",
        "Aynı soru ekleme veya bütün sayfaları değiştirme bilgisi yoktur.",
      ],
      knowledge: [
        "Gönderme sözcüğü, önceki bağlamda açık olan bir eyleme bağlanır.",
        "Yanıttaki ret, düzenlemenin her sayfada yapılmadığını belirtir.",
      ],
      strategy:
        "Bunu sözcüğünün yerine önceki sorudaki eylemi koyarak tam yanıtı yeniden oku.",
      steps: [
        "Soruda gündeme gelen eylem sayfada düzenleme yapmaktır.",
        "Bunu yerine sayfa düzenini değiştirmeyi koyduğunda yanıtın iki cümlesi de anlamlı kalır.",
        "Diğer adaylar bağlama yeni işlem eklediği için gönderme karşılığı olamaz.",
      ],
      commonError:
        "Yanıtın içinde geçen okuyucu sözcüğünü görünce göndermeyi okuyucu sayısına bağlamak.",
      check:
        "Bunu yerine seçtiğin işlemi koyunca yalnız karışan sayfalar ve diğerlerinin aynı kalması ilişkisi korunuyor mu diye oku.",
    },
    {
      passage:
        "Soru: “Ders kayıtlarını nasıl inceliyorsunuz?” Yanıt: “Sonuçları karşılaştırabilmek için önce her kaydın kaynak bilgisini doğruluyorum; sonra aynı koşullarda alınan kayıtları bir araya getiriyorum.”",
      prompt: "Yanıtın son bölümünde anlatılan ikinci işlem hangisidir?",
      options: [
        "Aynı koşullarda alınan kayıtları gruplamak",
        "Kayıtların kaynak bilgisini doğrulamak",
        "Karşılaştırma sonuçlarını yayımlamak",
        "Bütün koşulları eşit sonuç verecek biçimde değiştirmek",
        "Kayıtları oluşturuldukları yıllara göre silmek",
      ],
      reasons: [
        "Sonra ile başlayan kısım aynı koşullarda alınmış kayıtların bir araya getirilmesidir.",
        "Bu işlem önce ile ilk sırada verilmiştir; ikinci değildir.",
        "Yayımlama hakkında bilgi verilmez.",
        "Koşulların değiştirilmesi değil, mevcut koşula göre gruplama anlatılır.",
        "Silme veya yıllara göre işlem metinde yoktur.",
      ],
      knowledge: [
        "Amaç ifadesi ile sıralı işlem basamakları ayrı işlevler taşır.",
        "Önce ve sonra bağları verilen iki eylemin sırasını belirler.",
      ],
      strategy:
        "Amaç bölümünü paranteze al; önce ve sonra ile bağlanan iki işlemi ayır.",
      steps: [
        "Karşılaştırabilmek için ifadesi genel hedefi açıklar.",
        "Önce kaynak doğrulama, sonra koşula göre bir araya getirme adımları verilir.",
        "Kök ikinci işlemi istediği için aynı koşullardaki kayıtları gruplama yanıtını seç.",
      ],
      commonError:
        "İlk yapılan doğrulamayı yanıttaki en somut eylem diye ikinci işlem yerine seçmek.",
      check:
        "Sonra bağının hemen ardından seçtiğin işlemin geldiğini kontrol et.",
    },
    {
      passage:
        "Yeni düzen, kitaplıkların birbirine ödünç kitap göndermesine imkân veriyor. Ancak bütün kitaplıklar henüz bu düzene katılmadı. Katılanların sayısı ve katılım takvimi açıklanmadı.",
      prompt:
        "Yanıtın sağladığı olanak ile katılım sınırını birlikte soran seçenek hangisidir?",
      options: [
        "Düzen hangi olanağı sunar ve bütün kitaplıklar buna katılmış mıdır?",
        "Katılan kitaplıkların tam sayısı ve her birinin katılım tarihi nedir?",
        "Bütün kitaplıklar hangi gün aynı anda katıldı?",
        "Ödünç kitapların hepsi ne kadar sürede geri döndü?",
        "Bu düzen neden bütün kitaplıkların tek gelir kaynağıdır?",
      ],
      reasons: [
        "Kitap gönderme olanağı ile bütününün henüz katılmaması iki ayrı cümlede açıkça verilir.",
        "Sayı ve takvimin açıklanmadığı özellikle belirtilir.",
        "Herkesin katılması öncülü henüz bütününün katılmadığı bilgisine aykırıdır.",
        "Geri dönüş süresi veya bütün kitapların dönüşü anlatılmaz.",
        "Gelir kaynağına ilişkin herhangi bir veri yoktur.",
      ],
      knowledge: [
        "Bir yanıt hem yararı hem kapsam sınırını belirtebilir.",
        "İmkân vermek, olanağın her kurumca fiilen kullanıldığını göstermez.",
      ],
      strategy:
        "Olanağı ve katılımı iki ayrı alan olarak tut; sorunun ikisini de istemesini sağla.",
      steps: [
        "Olanağı kitaplıklar arası ödünç gönderme olarak belirle.",
        "Katılım sınırı bütün kitaplıkların henüz katılmamış olmasıdır.",
        "İki alanı birlikte soran seçenek tam cevap alır; sayı, tarih ve gelir isteyenler metinde yoktur.",
      ],
      commonError:
        "Bir düzene imkân tanınmasını bütün kitaplıkların fiilen katıldığı şeklinde okumak.",
      check:
        "Cevabında yarar için kitap gönderme, kapsam için henüz hepsi değil bilgilerini ayrı ayrı söyle.",
    },
  ],
  [
    {
      passage:
        "Görüşmeci: “Eski taslaklarınızı artık bütünüyle reddediyorsunuz, değil mi?” Yazar: “Hayır. Zayıf yanlarını görüyorum ama her taslağın bir sonraki denememde neyi değiştirmem gerektiğini öğrettiğini düşünüyorum.”",
      prompt: "Yazarın kendi tutumunu doğru veren seçenek hangisidir?",
      options: [
        "Eski taslakların eksiklerini görürken onlardan öğrendiğini kabul eder.",
        "Görüşmecinin bütün taslakları reddetme varsayımını onaylar.",
        "Eski taslakların hiçbirinde zayıflık bulunmadığını savunur.",
        "Bir sonraki denemeye artık gerek olmadığını söyler.",
        "Bütün yazarların aynı taslaklarla geliştiğini ileri sürer.",
      ],
      reasons: [
        "Hayır varsayımı reddeder; devamı eksik görme ve öğrenme tutumunu birlikte açıklar.",
        "Hayır sözü varsayımı onaylamak yerine açıkça reddeder.",
        "Yazar zayıf yanlarını gördüğünü söyler; kusursuzluk savunmaz.",
        "Sonraki denemede değişiklikten söz etmesi denemenin gereksiz olduğu sonucunu vermez.",
        "Konuşmacı kendi taslakları hakkında konuşur; bütün yazarları kapsamaz.",
      ],
      knowledge: [
        "Görüşmecinin sorusundaki varsayım, yanıtın onayı olmadan görüşülene yüklenemez.",
        "Bir metnin eksiklerini görmek onu bütünüyle reddetmek değildir.",
      ],
      strategy:
        "Önce konuşmacıları ayır, ardından hayır ve ama sözlerinin düzelttiği kapsamı bul.",
      steps: [
        "Görüşmeci bütünüyle reddetme varsayımını getiriyor.",
        "Yazar hayır diyerek bunu reddediyor ve zayıflıkları görmesinin öğrenmeye eşlik ettiğini ekliyor.",
        "Yazara ait tutum eksik görme ile yararlanmayı birlikte içeren seçenektir.",
      ],
      commonError:
        "Soru sahibinin bütünüyle reddetme iddiasını yazara ait görüş diye aktarmak.",
      check:
        "Seçtiğin tutumun hem hayır yanıtıyla hem öğrenme açıklamasıyla uyuştuğunu denetle.",
    },
    {
      passage:
        "Görüşülen kişi: “Önce çatlağın yerini kaydederim, sonra yüzeyi temizlerim. Henüz parça eklemeye karar vermem.” Görüşmeci, bundan sonra çatlağın kayda alınmasının gerekçesini öğrenmek istiyor.",
      prompt: "Görüşmecinin belirtilen hedefe uygun takip sorusu hangisidir?",
      options: [
        "Çatlağın yerini neden kayda alıyorsunuz?",
        "İlk yaptığınız işlem nedir?",
        "Her çatlağın üstünü neden boyarsınız?",
        "Yüzeyi hangi tarihte temizlediniz?",
        "Parça eklediğinize göre hangi yapıştırıcıyı kullandınız?",
      ],
      reasons: [
        "Önceki yanıtta verilen kayıt eylemine dayanır ve henüz açıklanmamış gerekçesini ister.",
        "Başlangıç işlemi zaten verilmiştir; hedef kayıt gerekçesidir.",
        "Her çatlağın üstünün boyandığı öncülü yanıtta yoktur.",
        "Takip hedefi tarih değil gerekçedir; tarih ayrıca verilmemiştir.",
        "Parça eklemeye henüz karar verilmediği söylenirken yapıştırıcı kullanıldığını varsayar.",
      ],
      knowledge: [
        "Takip sorusu önceki yanıta dayanan bir öncülle yeni bilgi ister.",
        "Yöntemin anlatılması o yöntemin neden seçildiğini otomatik açıklamaz.",
      ],
      strategy:
        "Hedeflenen bilgi açığını bul; önceki yanıtta gerçekten var olan eylem hakkında sor.",
      steps: [
        "Kayda alma eylemi ilk yanıtta açıkça vardır.",
        "Bu eylemin neden yapıldığı açıklanmamıştır ve görüşmecinin hedefi tam bu gerekçedir.",
        "Neden kayda alıyorsunuz sorusu yeni bilgiyi ister; parça eklediniz gibi öncüller uydurmaz.",
      ],
      commonError:
        "Takip sorusunda konuşmacının henüz yapmadığını söylediği bir işi yapılmış kabul etmek.",
      check:
        "Sorunun öncülü olan kayıt eylemi metinde var mı ve istenen yeni bilgi gerekçe mi diye kontrol et.",
    },
    {
      passage:
        "Yazar: “Gündelik konuşmalardan ve gözlemlerimden kısa notlar çıkarırım.” İkinci yanıt: “Kısa öyküde tek çatışmaya yoğunlaşabildiğim için bu türü seçiyorum.” İki yanıtın soruları çıkarılmıştır.",
      prompt: "Yanıtları sırayla karşılayan soru çifti hangisidir?",
      options: [
        "Yazı malzemenizi nasıl toplarsınız? / Kısa öyküyü neden seçiyorsunuz?",
        "Hangi yaşta yazmaya başladınız? / Son kitabınız kaç sayfadır?",
        "Kısa öyküyü neden seçiyorsunuz? / Yazı malzemenizi nasıl toplarsınız?",
        "Notlarınızı kime satarsınız? / Bütün türleri neden reddediyorsunuz?",
        "Gözlemin toplumsal maliyeti nedir? / Çatışma sayısı her yapıtınızda kaçtır?",
      ],
      reasons: [
        "İlk yanıt malzeme toplama, ikincisi tercih gerekçesi; çift sırayla ikisini karşılar.",
        "Yaş ve sayfa sayısı iki yanıtta da verilmemiştir.",
        "İlgili soruların yerleri ters; her soru kendi karşısındaki yanıtla eşleşmelidir.",
        "Satış yoktur; bir türü seçmek bütün diğer türleri reddetmek anlamına gelmez.",
        "Toplumsal maliyet ve her yapıttaki kesin çatışma sayısı açıklanmıyor.",
      ],
      knowledge: [
        "İki yanıtın farklı odakları ve sırası ayrı ayrı korunmalıdır.",
        "Bir tercih gerekçesi, bütün başka tercihleri dışlayan genelleme değildir.",
      ],
      strategy:
        "Yanıtların üstüne yöntem ve tercih nedeni etiketlerini sırayla koy.",
      steps: [
        "Kısa not çıkarma ilk yanıtın malzeme edinme yöntemidir.",
        "Tek çatışmaya yoğunlaşabilme ikinci yanıtın tür seçme gerekçesidir.",
        "Yöntem sorusunu önce, gerekçe sorusunu sonra veren çift iki bağı tamamlar.",
      ],
      commonError:
        "Soruların ikisi de konuya ilgili diye ters sıradaki çifti kabul etmek.",
      check:
        "Her soruyu yalnız karşısındaki yanıtla okuyunca doğal ve tam cevap oluştuğunu dene.",
    },
    {
      passage:
        "Bir seramik sanatçısı: “İlk sergimde iki ziyaretçi işlerimizi birbirine karıştırdı. Aynı atölyede çalışsak da farklı biçimler geliştirdiğimizi onlara anlattım. Birlikte üretmek, kendi çizgimizden vazgeçmemizi gerektirmiyor.”",
      prompt: "Yanıtın bütününü doğuran en uygun soru hangisidir?",
      options: [
        "Aynı atölyede çalışmakla kişisel üslup arasında nasıl bir ilişki görüyorsunuz?",
        "İlk serginin açılış saati kaçtı?",
        "Bütün ziyaretçiler eserleri neden hep karıştırır?",
        "Atölyeyi hangi tarihte satın aldınız?",
        "Birlikte çalışan herkes neden aynı biçimi üretmek zorundadır?",
      ],
      reasons: [
        "Olay ortak çalışma ile kişisel farklılığın birlikte bulunabileceği görüşüne bağlanır.",
        "Açılış saati metinde verilmez; olay, ortak çalışma ve kişisel üslup ilişkisini açıklamak için anlatılır.",
        "İki ziyaretçinin olayı bütün ziyaretçilere ve her zamana genişletilemez.",
        "Satın alma veya tarih hakkında bilgi yoktur.",
        "Son cümle ortak çalışmanın tek üslup zorunluluğu olmadığını açıklar; soru ters öncül kurar.",
      ],
      knowledge: [
        "Anlatılan olayın işlevi, ardından kurulan temel görüşle birlikte okunur.",
        "Tek bir olayı bütün kişiler ve zamanlar için genelleştirmek kapsam hatasıdır.",
      ],
      strategy:
        "İlk olayı örnek, son iki cümleyi açıklanan ilişki olarak bağla.",
      steps: [
        "Karıştırılma olayı iki ziyaretçiyle sınırlı bir örnektir.",
        "Sanatçı farklı biçimlerini ve birlikte üretirken kendi çizgilerini korumalarını açıklar.",
        "Bu nedenle soru ortak çalışma ile kişisel üslubun ilişkisini istemelidir.",
      ],
      commonError:
        "İlginç karıştırılma olayına takılıp yanıtın asıl ortak üretim–farklılık görüşünü kaçırmak.",
      check:
        "Seçtiğin sorunun yalnız ilk olayı değil son iki cümlenin yargısını da karşılayabildiğini kontrol et.",
    },
    {
      passage:
        "Araştırmacı: “Önceleri notlarımı yalnız deftere alırdım. Şimdi ses kaydı da tutuyorum; defterdeki çizimlerimi kullanmayı sürdürüyorum. İki kayıt biçimi farklı ayrıntıları yakalamama yardım ediyor.”",
      prompt:
        "Aşağıdaki yargılardan hangisi konuşmacının sözleriyle desteklenir?",
      options: [
        "Güncel yöntemine ses kaydını eklerken defter kullanımını sürdürmektedir.",
        "Defteri tamamen bırakmış ve yalnız ses kaydı kullanmaktadır.",
        "Geçmişte de her zaman iki kayıt biçimini birlikte kullanmıştır.",
        "Ses kaydı bütün araştırmacılar için tek geçerli yöntemdir.",
        "Defterin hiçbir yararını artık görmemektedir.",
      ],
      reasons: [
        "Şimdi ses kaydı da ve defterdeki çizimleri kullanmayı sürdürüyorum sözleri ekleme ile devamı birlikte verir.",
        "Defteri sürdürme açıkça söylendiği için tamamen bırakma iddiası çelişir.",
        "Önceleri yalnız defter kullandığını söyler; geçmişte hep ikisini kullanma iddiası yanlıştır.",
        "Konuşma kendi yöntemiyle sınırlıdır, bütün araştırmacılara tek yol koymaz.",
        "İki biçimin farklı ayrıntı yakaladığı söylenir; defterin yararsız olduğu sonucu çıkmaz.",
      ],
      knowledge: [
        "Yeni bir yöntemin eklenmesi eski yöntemin terk edildiğini göstermez.",
        "Zaman değişimi aynı anda çelişik iki tutum sayılmamalıdır.",
      ],
      strategy:
        "Eski ve güncel dönemi iki sütuna ayır, eklenen ve devam eden aracı belirle.",
      steps: [
        "Eski dönemin aracı yalnız defterdir; ses kaydının o dönemde kullanıldığı söylenmemiştir.",
        "Güncel dönemde ses kaydı eklenmiş, defter ise açıkça korunmuştur.",
        "Ekleme ve devamı birlikte söyleyen seçenek metindeki iki zaman bilgisini doğru birleştirir.",
      ],
      commonError:
        "Da ekini yerine geçme gibi okuyup yeni aracın eskisini ortadan kaldırdığını sanmak.",
      check:
        "Seçenek güncel iki aracı da koruyor mu ve geçmişe bu birlikteliği taşımıyor mu diye bak.",
    },
    {
      passage:
        "Görüşmeci: “Taslakların hepsini önce okurlarla mı paylaşırsınız?” Yazar: “Hayır, her birini değil. Önce editörümle çalışırım; yalnız son kontrolü biten bazı taslakları daha sonra gönüllü okurlarla denerim.”",
      prompt: "Bu konuşmadan hangisi çıkarılabilir?",
      options: [
        "Bütün taslaklar okurlarla paylaşılmaz; okur denemesi editör çalışmasından sonra gelebilir.",
        "Her taslak önce okura, sonra editöre gider.",
        "Editörün görevi okurların gelmesiyle bütünüyle sona ermiştir.",
        "Okur denemesine alınan bütün taslaklar kesin yayımlanır.",
        "Yazar hiçbir taslağını başka biriyle paylaşmaz.",
      ],
      reasons: [
        "Her birini değil kapsamı sınırlar; önce editör ve daha sonra okur sırasını kurar.",
        "Bu sıra açıkça ters verilmiştir ve bütün taslak iddiası reddedilir.",
        "Editör görevinin tümden sona erdiği söylenmez; çalışma sırası açıklanır.",
        "Denemeye almak yayımlama garantisi değildir; yayın sonucu verilmemiştir.",
        "Editör ve bazı okurlarla paylaşma açıkça vardır; hiçbirini paylaşmaz iddiası çelişir.",
      ],
      knowledge: [
        "Soru sahibinin hepsi varsayımı yanıtla reddedilebilir.",
        "Deneme, paylaşım ve yayımlama ayrı eylemlerdir.",
      ],
      strategy: "Kapsamı ve işlem sırasını ayrı kanıtlarla belirle.",
      steps: [
        "Hayır ve her birini değil sözleri bütün taslaklar genellemesini reddeder.",
        "Önce editör, daha sonra bazı gönüllü okurlar biçiminde açık sıra verilir.",
        "Bu iki kanıtı birlikte taşıyan seçenek çıkarılabilir; yayımlama gibi yeni sonuç eklenmez.",
      ],
      commonError:
        "Okurlarla denemeye açılan bir taslağın kesin yayımlandığını varsaymak.",
      check:
        "Cevabında hem bazı taslak sınırının hem editör→okur sırasının korunduğunu denetle.",
    },
    {
      passage:
        "Müzisyen: “Eski kayıtları düzenli dinlerim. Ancak melodileri olduğu gibi almam; farklı bir ritim ve yeni bir bağlam içinde kendi düzenlememi kurarım.”",
      prompt: "Konuşmacıya ilişkin hangi yargı desteklenir?",
      options: [
        "Başka kayıtları izleme ile birebir kopyalamama tutumunu birlikte taşır.",
        "Hiçbir eski kaydı izlemez.",
        "Dinlediği her melodiyi olduğu gibi kullanır.",
        "Başka müziklerden hiçbir biçimde etkilenmesi mümkün değildir.",
        "Bütün müzisyenlerin aynı ritimde çalmasını zorunlu görür.",
      ],
      reasons: [
        "Dinlediğini ve olduğu gibi almadığını ayrı cümlelerle açıklar.",
        "Düzenli dinlerim ifadesi hiç izlemez yargısıyla çelişir.",
        "Melodileri olduğu gibi almam sözü birebir kullanma iddiasını reddeder.",
        "Kopyalamamak bütün etkilenme yollarını dışlamaz; böyle evrensel ret verilmez.",
        "Diğer müzisyenler için ritim zorunluluğu koymaz; kendi düzenlemesini anlatır.",
      ],
      knowledge: [
        "Haberdar olma, etkilenme ve birebir taklit farklı ilişkilerdir.",
        "Bir eylemin reddi, ondan daha geniş bütün ilişkilerin reddi değildir.",
      ],
      strategy:
        "Dinleme ve kopyalamama fiillerini ayrı tut; daha güçlü retler ekleme.",
      steps: [
        "Eski kayıtları dinleme metinde olumlu olarak verilir.",
        "Olduğu gibi almama doğrudan kopyalama sınırıdır.",
        "İki tutumu birlikte söyleyen seçenek doğrudur; hiçbir etkilenme yoktur yargısı kanıtı aşar.",
      ],
      commonError:
        "Birebir kopyalamamayı hiçbir biçimde etkilenmeme ile eşitlemek.",
      check:
        "Seçeneğin izleme eylemini koruduğunu ve yalnız metnin reddettiği birebir kullanımı dışladığını kontrol et.",
    },
    {
      passage:
        "Ressam: “Atölyenin kuzey penceresi avluya bakıyor. Ben o pencereden gelen yumuşak ışığın portrelerimi daha sakin gösterdiğini düşünüyorum. Başka ressamlar aynı ışığı farklı değerlendirebilir.”",
      prompt: "Ressamın değerlendirmesini bildiren ifade hangisidir?",
      options: [
        "Pencereden gelen ışığın kendi portrelerini daha sakin gösterdiği düşüncesi",
        "Pencerenin avluya baktığı yer bilgisi",
        "Bütün ressamların aynı ışığı zorunlu olarak beğenmesi",
        "Portrelerin her birinin aynı tarihte yapılmış olması",
        "Avlunun atölyeden daha büyük olması",
      ],
      reasons: [
        "Düşünüyorum sözüyle kişisel bir etki değerlendirmesi verilir ve son cümle genellemeyi sınırlar.",
        "Avluya bakma ifadesi yer ve yön hakkında gözlemsel bilgidir; istenen kişisel değerlendirme değildir.",
        "Başka değerlendirmeler olabileceği açık; zorunlu ortak beğeni söylenmez.",
        "Portrelerin yapım tarihleri metinde yoktur.",
        "Avlu ve atölye büyüklükleri karşılaştırılmaz.",
      ],
      knowledge: [
        "Gözlemsel bilgi ile kişisel değerlendirme bir görüşmede birlikte bulunabilir.",
        "Kişiye atfedilen görüş, bütün kişiler için bir zorunluluk değildir.",
      ],
      strategy:
        "Yer bilgisini ayır ve konuşmacının düşündüğünü söylediği yargıyı bul.",
      steps: [
        "İlk cümle pencerenin avluya baktığını, yani gözleme dayalı bir yer bilgisini verir.",
        "İkinci cümle bu ışığın kendi resimleri üzerindeki etkisine dair değerlendirmedir.",
        "Üçüncü cümle başkalarının farklı değerlendirebileceğini ekler; doğru seçenek kişisel etki yargısını korur.",
      ],
      commonError:
        "Somut pencere bilgisiyle, ressamın ışığın etkisine ilişkin yorumunu aynı tür yargı saymak.",
      check:
        "Doğru adayın düşünüyorum ifadesiyle doğrudan bağlandığını ve herkes için beğeni eklemediğini denetle.",
    },
    {
      passage:
        "Muhabir: “Yazmaya hangi adımla başlarsınız?” Yazar: “Önce karakterin kararını tasarlarım; çünkü olayların yönünü bu karar belirler.”",
      prompt:
        "Yalnız yanıtın çünküden sonraki bölümünü açan takip sorusu hangisidir?",
      options: [
        "Karakterin kararını ilk sıraya koymanızın gerekçesi nedir?",
        "İlk yaptığınız işlem nedir?",
        "Kitabın yayımlanma yılı nedir?",
        "Her okurun hangi karakteri sevdiğini nasıl ölçtünüz?",
        "Karakterlerin sayısı kaçtır?",
      ],
      reasons: [
        "Çünküden sonraki bölüm ilk adım tercihinin gerekçesini verir.",
        "Bu soru önceki yöntemi yeniden ister; kök yalnız gerekçe bölümünü açmayı hedefler.",
        "Yayımlanma yılı hakkında bilgi yoktur.",
        "Okur ölçümü veya her okur iddiası metne eklenmiştir.",
        "Karakter sayısı gerekçe değildir ve verilmez.",
      ],
      knowledge: [
        "Bir yanıt hem yöntem hem gerekçe içerebilir; kökün bölüm sınırı belirleyicidir.",
        "Takip sorusu hedeflenen bilgi ilişkisini açıkça istemelidir.",
      ],
      strategy:
        "Yanıtı noktalı virgülden ayır; çünkü ile bağlanan ilişkinin hangi soruyu yanıtladığını bul.",
      steps: [
        "Önce karakterin kararını tasarlarım ilk adımı bildirir.",
        "Olayların yönünün karara bağlı olması, neden bu adımla başlandığını açıklar.",
        "İlk sıraya koymanın gerekçesini soran takip cümlesi hedef bölümü doğrudan açar.",
      ],
      commonError:
        "Yöntem sorusunun daha önce yanıtlandığını unutup onu gerekçe isteği yerine tekrar seçmek.",
      check:
        "Seçtiğin soruya yalnız çünküden sonraki sözlerle gerekçeli cevap verebildiğini dene.",
    },
    {
      passage:
        "Görüşmeci: “Kaynakları nasıl seçiyorsunuz?” Araştırmacı: “Önce belgenin kimden geldiğini araştırırım. Sonra tarih ve kaynak bilgisini başka kayıtlarla karşılaştırırım.” Görüşmenin devamında bu adımların neden gerekli görüldüğü sorulacaktır.",
      prompt: "Devamda istenen yeni bilgiyi soran cümle hangisidir?",
      options: [
        "Belgenin kaynağını başka kayıtlarla karşılaştırmayı neden gerekli buluyorsunuz?",
        "Belgenin kimden geldiğini ilk aşamada mı araştırırsınız?",
        "Önce ve sonra yaptığınız işlemler nelerdir?",
        "Kaynak araştırmasını hangi adımlarla yaparsınız?",
        "Bütün belgeleri doğru kabul ettiğinize göre neden karşılaştırırsınız?",
      ],
      reasons: [
        "Önceki yanıtta yöntem verilmiş, gereklilik gerekçesi henüz açıklanmamıştır; doğru soru o açığı ister.",
        "Bu soru ilk adımın doğrulanmasını ister; hedeflenen yeni gerekçe alanını açmaz.",
        "Adımlar zaten açıklanmıştır; yeni gerekçe isteğini karşılamaz.",
        "Bu da mevcut yöntem bilgisini yeniden sorar.",
        "Bütün belgeleri doğru kabul etme öncülü verilmemiştir; karşılaştırma böyle bir kabule dayanmak zorunda değildir.",
      ],
      knowledge: [
        "Verilmiş yöntemi yeniden istemek ile açıklanmamış gerekçeyi istemek farklıdır.",
        "Takip sorusunda metnin vermediği bir kabul öncül yapılamaz.",
      ],
      strategy:
        "Önceki yanıtta dolu olan yöntem alanıyla boş kalan neden alanını ayır.",
      steps: [
        "Kaynak araştırma ve başka kayıtlarla karşılaştırma yöntem olarak anlatılıyor.",
        "Bunların neden gerekli görüldüğü açıklanmıyor; devamın hedefi bu gerekçedir.",
        "Karşılaştırmanın nedenini açıkça soran seçenek yeni bilgi alanına yönelir ve yanlış öncül eklemez.",
      ],
      commonError: "Mevcut adımların tekrarını yeni açıklama isteği sanmak.",
      check:
        "Sorunun cevabı önceki yanıtı aynen yinelemek yerine yeni bir gerekçe gerektiriyor mu diye kontrol et.",
    },
    {
      passage:
        "Bir yazıda muhabir, kıyıdaki atölyeleri gezdiğini anlatır; ortamların görünüşünü betimler, ustalarla yaptığı görüşmelerden söz eder ve yaptığı araştırmanın bulgularını açıklar. Metin yalnız soru ve yanıt satırlarından oluşmaz.",
      prompt:
        "Bu metnin röportaj niteliğini anlamak için hangi yaklaşım uygundur?",
      options: [
        "Araştırma, gözlem ve görüşme malzemesinin birlikte kullanılabileceğini dikkate almak",
        "Soru–cevap satırı yoksa hiçbir biçimde röportaj sayılamayacağını kabul etmek",
        "Betimleme bulunan her metni yalnız roman saymak",
        "Bir kişiden söz eden her yazıyı zorunlu olarak mülakat saymak",
        "Anlatıcının gördüğünü söylediği her şeyi ayrıca kanıt aramadan kesin doğru saymak",
      ],
      reasons: [
        "Röportajın geniş öğretim kapsamı araştırma, gözlem ve görüşmeleri birlikte içerebilir.",
        "Sadece soru–cevap kuruluşunu zorunlu tutmak röportajı mülakat düzeniyle daraltır.",
        "Betimleme birçok türde kullanılabilir; tek başına roman belirlemez.",
        "Bir kişinin anılması planlı soru–cevap görüşmesinin varlığını kanıtlamaz.",
        "Sunuş biçimi iddiaların otomatik doğruluk garantisi değildir.",
      ],
      knowledge: [
        "Metin türü ile anlatım biçimi farklı sınıflamalardır.",
        "Röportaj yalnız görüşme dökümüyle sınırlı olmayabilir.",
      ],
      strategy:
        "Görünür araştırma, gözlem ve görüşme işlevlerini birlikte değerlendir.",
      steps: [
        "Atölyeleri gezme gözlem, ortam anlatısı betimleme, bulgular ise araştırma aktarımıdır.",
        "Ustalarla görüşme bunlara ek bir malzemedir; metnin yalnız konuşma satırlarından oluşması gerekmiyor.",
        "Bu araçları birlikte gören seçenek uygundur; tek özellikten türü zorunlu kılanlar aşırı genellemedir.",
      ],
      commonError:
        "Röportajı yalnız Soru/Yanıt yazan bir dökümle özdeş tutmak.",
      check:
        "Seçtiğin yaklaşımın metindeki en az üç somut işlemi dışlamadan açıklayabildiğini denetle.",
    },
    {
      passage:
        "Muhabir: “Önceki kitabınıza göre neyi değiştirdiniz?” Yazar: “Önceki kitapta üç anlatıcı vardı. Yeni kitapta tek anlatıcı kullandım; böylece olayları aynı kişinin bildikleriyle sınırlı tutmayı amaçladım.”",
      prompt: "Görüşme parçasında hangi iki bilgi birlikte bulunur?",
      options: [
        "Anlatıcı sayısındaki değişim ve bu seçimin amacı",
        "Yeni kitabın satış sayısı ve basım yeri",
        "Eski kitabın bütün okurlarca reddedilmesi ve yeni kitabın ödülü",
        "Yazarın doğum yeri ve yazarlığa başlama yılı",
        "Her romanda tek anlatıcı kullanma zorunluluğu ve istisnasız başarı",
      ],
      reasons: [
        "Üçten teke geçiş açık; aynı kişinin bilgisiyle sınırlama da amaç olarak belirtilir.",
        "Satış veya basım yeri bulunmaz.",
        "Okurların tümden reddi ve ödül bilgisi metne eklenmiştir.",
        "Doğum ve başlangıç yılı verilmez.",
        "Kendi iki kitabındaki tercih bütün romanlara kural ve başarı garantisi kurmaz.",
      ],
      knowledge: [
        "Önceki–yeni karşılaştırması değişen unsuru gösterir.",
        "Amaç, sonucun bütün okurlarda gerçekleştiği veya bütün türde zorunlu olduğu iddiası değildir.",
      ],
      strategy:
        "Eski ve yeni yapıyı karşılaştır; böylece ile bağlanan hedefi ayrı yaz.",
      steps: [
        "Önceki anlatıcı sayısı üç, yeni anlatıcı sayısı birdir.",
        "Amaç olay bilgisini aynı kişinin bildikleriyle sınırlı tutmaktır.",
        "Sayı değişimi ve amaç birlikte verilen iki alandır; diğer seçenekler görünmeyen veri ekler.",
      ],
      commonError:
        "Tek anlatıcı tercihini bütün romanlar için zorunlu kurala dönüştürmek.",
      check:
        "Cevabının yalnız konuşulan iki kitapla sınırlı kaldığını ve amacı garanti edilmiş başarı diye sunmadığını kontrol et.",
    },
    {
      passage:
        "Görüşmeci: “Taslağı herkesle paylaştığınız doğru mu?” Yazar: “Hayır, onu yalnız editörüme gönderdim. Editörüm geri dönünce ikinci bölümü yeniden yazdım.”",
      prompt:
        "Yanıttaki “onu” sözcüğünün karşılığı ve ilk soruya verilen tutum hangi seçenekte doğrudur?",
      options: [
        "Taslak; herkesle paylaşma varsayımını reddetme",
        "Editör; herkesle paylaşmayı onaylama",
        "İkinci bölüm; taslağın hiç yazılmadığını kabul etme",
        "Görüşmeci; editörün bütün önerilerini reddetme",
        "Yeni kitap; bütün okurların görüşünü alma",
      ],
      reasons: [
        "Soru taslağı konu eder; onu taslağa döner ve hayır yalnız editör kapsamıyla herkesi reddeder.",
        "Onu kişi olarak editöre dönmez; ayrıca hayır onay değil rettir.",
        "İkinci bölüm sonradan açılır; taslağın hiç olmadığı söylenmez.",
        "Görüşmeci gönderilen nesne değildir; bütün önerileri reddetme bilgisi yoktur.",
        "Yeni kitap veya bütün okurlar hakkında veri yoktur; yalnız editör denir.",
      ],
      knowledge: [
        "Gönderme sözcüğü uygun öncüle bağlanır; sonraki bir nesneye keyfî taşınmaz.",
        "Hayır yanıtının düzelttiği kapsam, ardından gelen yalnız ifadesiyle anlaşılır.",
      ],
      strategy:
        "Önce gönderilen nesnenin öncülünü bul, sonra herkes–yalnız editör karşıtlığını kur.",
      steps: [
        "Soruda gönderilmesi tartışılan nesne taslaktır; onu aynı nesneyi karşılar.",
        "Hayır ve yalnız editörüme sözleri herkese gönderme varsayımını dışlar.",
        "İkinci bölümü yeniden yazmak ayrı sonuçtur; gönderme öncülünü veya ret tutumunu değiştirmez.",
      ],
      commonError:
        "Yanıtın sonundaki ikinci bölüm sözünü görünce onu göndermesini geriye dönük o bölüme bağlamak.",
      check:
        "Onu yerine taslağı koyup iki cümleyi oku; herkesle paylaşma iddiasının hâlâ reddedildiğini kontrol et.",
    },
    {
      passage:
        "Gazeteci, usta ile görüşmeden önce onun çalışmalarını araştırdı ve sorularını hazırladı. Görüşmede gelen yanıta dayanarak ek bir açıklama sorusu sordu. Ustanın iddialarını ayrıca kaynaklarla karşılaştırmak üzere not aldı.",
      prompt: "Bu süreçle ilgili hangi değerlendirme uygundur?",
      options: [
        "Ön hazırlık ile yanıta dayalı takip sorusu birlikte kullanılabilir; iddialar ayrıca denetlenebilir.",
        "Sorular önceden hazırlandıysa hiçbir takip sorusu sorulamaz.",
        "Randevuya uyulması bütün yanıtları kendiliğinden doğru kılar.",
        "Ek soru sorulması, önce hiç araştırma yapılmadığını kanıtlar.",
        "Konuşmacı usta olduğu için kaynak karşılaştırması her durumda gereksizdir.",
      ],
      reasons: [
        "Parça hem hazırlığı hem ek soruyu hem de ayrı doğrulama planını açıkça gösterir.",
        "Metinde ön hazırlık ve ek soru birlikte gerçekleşir; yasak ilişkisi kurulmamıştır.",
        "İletişim kurallarına uyma, içerik doğruluğunun mantıksal garantisi değildir.",
        "Hazırlık açıkça verilmiştir; ek sorudan yokluğu çıkarılamaz.",
        "Tanınmışlık veya ustalık her iddianın bağımsız denetimini gereksiz kılmaz.",
      ],
      knowledge: [
        "Planlı görüşmede hazırlanmış sorular yanıta göre geliştirilebilir.",
        "Kaynağın niteliği ile her tekil iddianın doğruluğu ayrı denetimlerdir.",
      ],
      strategy: "Metindeki üç işlemi birbirini dışlamadan sırayla yerleştir.",
      steps: [
        "Görüşme öncesinde araştırma ve soru hazırlığı vardır.",
        "Görüşme sırasında önceki yanıta dayanarak ek soru yöneltilir.",
        "İddiaları ayrıca karşılaştırma planı doğruluk denetimini ayrı tutar; üçü birbiriyle bağdaşır.",
      ],
      commonError:
        "Önceden soru hazırlamayı görüşme sırasında yeni soru sormayı yasaklayan bir koşul saymak.",
      check:
        "Doğru seçeneğin metinde gerçekten yapılan hazırlık, takip ve karşılaştırmanın üçünü de koruduğunu denetle.",
    },
    {
      passage:
        "Öğretmen, “Diyorlar ki, Ruşen Eşref Ünaydın’ın sanatçılarla yaptığı görüşmeleri bir araya getiren mülakat örneğidir.” diyor. Ardından “Bir kıyı sorununun gözlem, araştırma ve tanıklıklarla işlendiği yazı ise daha geniş röportaj kapsamını gösterebilir.” diye ekliyor.",
      prompt: "Bu açıklamaların birlikte vurguladığı ayrım hangisidir?",
      options: [
        "Kişiye yönelen planlı görüşme odağı ile araştırma ve gözleme açılan daha geniş röportaj kapsamı",
        "Her röportajın yalnız soru–cevap satırlarından oluşması zorunluluğu",
        "Bir kişiye ait söz verilen her metnin tarihsel roman sayılması",
        "Mülakatlarda hiçbir sorunun önceden hazırlanamayacağı",
        "Röportajda araştırma ve gözlemin kullanılamayacağı",
      ],
      reasons: [
        "Birinci örnek kişilerin görüşmesine, ikinci örnek gözlem ve araştırmayla genişleyen alana dayanır.",
        "İkinci örnek bu zorunluluğu kurmaz; farklı malzemeleri birlikte işleyen geniş kapsamı gösterir.",
        "Kişinin sözünün bulunması roman türünü zorunlu kılmaz.",
        "Planlı görüşme ve soru hazırlığı bu mutlak yasağı desteklemez.",
        "İkinci cümlede araştırma ve gözlem açıkça kullanılır; yasak iddiasıyla çelişir.",
      ],
      knowledge: [
        "Mülakat ve röportajın öğretim kapsamları örtüşebilir ama bütünüyle özdeş değildir.",
        "Tür adı, her örneğe tek biçimli kuruluş zorunluluğu yüklemez.",
      ],
      strategy: "İki örneğin bilgi toplama ve sunma odağını karşılaştır.",
      steps: [
        "Diyorlar ki örneğinde sanatçıların görüşmeleri öne çıkarılır.",
        "İkinci örnekte bir sorun gözlem, araştırma ve tanıklıkla işlenir.",
        "Bu iki odağı ayıran seçenek açıklamanın tamamını karşılar; mutlak kuruluş yasakları çıkarılamaz.",
      ],
      commonError:
        "İlk görüşme örneğinin kuruluşunu bütün röportajlar için tek zorunlu kalıp yapmak.",
      check:
        "Seçtiğin ayrımın hem Diyorlar ki örneğini hem kıyı sorunu örneğini ayrı ayrı açıklayabildiğini kontrol et.",
    },
  ],
];

export const forge023TurkishTopics: Record<string, string> = {
  "paragrafta-soru-cevap": "detail-278",
  "paragrafta-roportaj": "detail-279",
};
export const forge023TurkishGuides: LessonGuide[] = guideSpecs023.map(
  ({ title: _title, ...guide }) => guide,
);
const positions023 = [
  [2, 0, 4, 1, 1, 3, 0, 4, 2, 3, 4, 2, 3, 0, 1],
  [3, 1, 1, 4, 2, 0, 4, 3, 0, 2, 2, 4, 0, 1, 3],
];
export const forge023TurkishLessons: Lesson[] = guideSpecs023.map(
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
    questions: questionRows023[pack].map((q, i): Question => {
      const answer = positions023[pack][i];
      const rotate = <T>(values: T[]) =>
        values.map((_, n) => values[(n - answer + 5) % 5]);
      return {
        id: `${g.id}-023-${i + 1}`,
        passage: txt(q.passage),
        prompt: txt(q.prompt),
        options: rotate(q.options).map(txt),
        answer,
        hint: txt(q.strategy),
        explanation: txt(q.steps.join(" ") + " " + q.reasons[0]),
        skill: g.id,
        guidance: {
          knowledge: q.knowledge,
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
export type AnswerCase023 = {
  id: string;
  label: string;
  sentences: string[];
  questions: {
    text: string;
    focus: string;
    answer: string;
    references: number[];
  }[];
};
const answerCases023: readonly AnswerCase023[] = [
  {
    id: "archive",
    label: "Arşiv",
    sentences: [
      "Ekip 2021 yılında arşivi taramaya başladı.",
      "Amaç, kaynağı belli kayıtları kolay bulmaktı.",
      "Önce tarihleri sıraladı; sonra kaynakları teyit etti.",
      "Altı hafta içinde kırk kaydı inceledi.",
      "Kullanılan yazılımın adı metinde verilmedi.",
    ],
    questions: [
      {
        text: "Arşivi taramaya hangi yıl başladılar?",
        focus: "Zaman",
        answer: "2021 yılında.",
        references: [0],
      },
      {
        text: "Çalışmanın hedefi neydi?",
        focus: "Amaç",
        answer: "Kaynağı belli kayıtları kolay bulmayı.",
        references: [1],
      },
      {
        text: "Kayıtları hangi adımlarla incelediler?",
        focus: "Yöntem",
        answer: "Önce tarihleri sıralayıp sonra kaynakları teyit ederek.",
        references: [2],
      },
      {
        text: "Kaç kaydı, ne kadar sürede incelediler?",
        focus: "Sayı ve süre",
        answer: "Kırk kaydı altı haftada.",
        references: [3],
      },
      {
        text: "Hangi yazılımı seçtiler?",
        focus: "Araç",
        answer: "Yazılım adı verilmedi; bu metinden belli değil.",
        references: [],
      },
    ],
  },
  {
    id: "exhibit",
    label: "Sergi",
    sentences: [
      "Sergi cuma günü kent müzesinde açıldı.",
      "Açılış ertelendi; salonun denetimi bitmemişti.",
      "Ekip, eserleri hasar riskine göre sıraya koydu.",
      "Önce fotoğraf çekti, sonra durum fişini yazdı.",
      "Gelenlerin tam sayısı metinde verilmedi.",
    ],
    questions: [
      {
        text: "Sergi hangi gün, nerede açıldı?",
        focus: "Gün ve yer",
        answer: "Cuma günü kent müzesinde.",
        references: [0],
      },
      {
        text: "Açılışı niçin ertelediler?",
        focus: "Neden",
        answer: "Salonun denetimi bitmediği için.",
        references: [1],
      },
      {
        text: "Eser sırasını hangi ölçütle kurdular?",
        focus: "Ölçüt",
        answer: "Hasar riskine göre.",
        references: [2],
      },
      {
        text: "Kayıt için hangi adımları izlediler?",
        focus: "Yöntem",
        answer: "Önce fotoğraf, sonra durum fişi.",
        references: [3],
      },
      {
        text: "Sergiye tam kaç kişi katıldı?",
        focus: "Sayı",
        answer: "Tam sayı verilmedi; bu metinden belli değil.",
        references: [],
      },
    ],
  },
  {
    id: "sound",
    label: "Ses kaydı",
    sentences: [
      "Çalışma pazar günü okulda başladı.",
      "Bir söz ancak söyleyen kişi izin verirse paylaşılır.",
      "Ekip önce sesi aldı, sonra durakları da yazıya geçirdi.",
      "Kayıtlar orada yer almayan kişilerin de metni okuması için tutuldu.",
      "Başlama saati metinde verilmedi.",
    ],
    questions: [
      {
        text: "Çalışma nerede, hangi gün başladı?",
        focus: "Yer ve gün",
        answer: "Okulda, pazar günü.",
        references: [0],
      },
      {
        text: "Paylaşım için hangi izin sınırı var?",
        focus: "Koşul",
        answer:
          "Konuşan kişinin izni gerekli; izin tek başına kesin paylaşım değildir.",
        references: [1],
      },
      {
        text: "Sözleri hangi yolla metne çevirdiler?",
        focus: "Yöntem",
        answer: "Ses alıp durakları da yazıya geçirerek.",
        references: [2],
      },
      {
        text: "Kayıtlar hangi amaçla tutuldu?",
        focus: "Amaç",
        answer: "Orada yer almayan kişilerin de okuması için.",
        references: [3],
      },
      {
        text: "Çalışma saat kaçta başladı?",
        focus: "Saat",
        answer: "Başlama saati yok; bu metinden belli değil.",
        references: [],
      },
    ],
  },
];
export function answerContexts023() {
  return answerCases023.map(({ id, label }) => ({ id, label }));
}
export function answerScene023(caseId: string, question = 0, selected = 0) {
  const item = answerCases023.find((c) => c.id === caseId);
  if (!item) throw new RangeError("Görünen bir metin seçilmeli.");
  if (
    !Number.isInteger(question) ||
    question < 0 ||
    question >= item.questions.length
  )
    throw new RangeError("Görünen bir soru seçilmeli.");
  if (
    !Number.isInteger(selected) ||
    selected < 0 ||
    selected >= item.sentences.length
  )
    throw new RangeError("Görünen bir kanıt cümlesi seçilmeli.");
  const ask = item.questions[question];
  return {
    kind: "answer" as const,
    caseId,
    label: item.label,
    context:
      "Bu veriler özgün bir okuma örneğidir. Soru değişince aynı tam metindeki gereken kanıt bağı da değişir.",
    sentences: [...item.sentences],
    questionLabels: item.questions.map((q) => q.text),
    question,
    selected,
    ask: { ...ask, references: [...ask.references] },
    decision: ask.references.length ? "Yanıt var" : "Bilgi yok",
    options: ["Yanıt var", "Bilgi yok"],
    selectedSupports: ask.references.includes(selected),
    reason: ask.references.length
      ? `Soru ${ask.focus.toLocaleLowerCase("tr-TR")} istiyor. ${ask.references.map((i) => `${i + 1}. cümle`).join(" ve ")} bu alanı doğrudan karşılıyor: ${ask.answer}`
      : `Soru ${ask.focus.toLocaleLowerCase("tr-TR")} istiyor; bu alan tam metinde verilmedi. Başka alana ait veri bu açığı kapatmaz. ${ask.answer}`,
    evidence: ask.references.map((i) => ({
      index: i,
      text: item.sentences[i],
    })),
  };
}
export type InterviewBranch023 = {
  question: string;
  answer: string;
  lastQuestion: string;
  lastAnswer: string;
  decision: string;
  reason: string;
};
const interviewCases023 = [
  {
    id: "repair",
    label: "Onarım",
    goal: "Kaydın nedenini sor",
    firstQuestion: "Onarımda önce ne yaparsınız?",
    firstAnswer:
      "Önce çatlağın yerini kaydeder, sonra yüzeyi temizlerim. Henüz parça eklemeye karar vermem.",
    branches: [
      {
        question: "İlk yaptığınız işlem nedir?",
        answer: "Çatlağın yerini yazmak; bunu ilk yanıtta söyledim.",
        lastQuestion: "Yeni bir gerekçe öğrenmiş olduk mu?",
        lastAnswer:
          "Hayır. Aynı ilk adımı yineledik; kaydı neden tuttuğumu henüz açmadık.",
        decision: "Verilen bilgi",
        reason:
          "İlk adım zaten açık. Hedef kaydın nedenini açmaktı; bu soru aynı bilgiye geri dönüyor.",
      },
      {
        question: "Çatlağın yerini neden kayda alırsınız?",
        answer:
          "Sonraki değişimi eski durumla kıyaslamak için; izleri silmeden önce ilk durumu tutmak isterim.",
        lastQuestion: "Bu kayıt parça eklemeyi zorunlu kılar mı?",
        lastAnswer:
          "Hayır. Kayıt, eski durum için veri tutar; parça ekleme kararı başka kontrol gerektirir.",
        decision: "Yeni gerekçe",
        reason:
          "Kayda alma önceki yanıtta var; nedeni henüz yoktu. Bu takip sorusu öncülü koruyup o bilgi açığını doldurur.",
      },
      {
        question: "Her çatlağı neden boyarsınız?",
        answer:
          "Her çatlağı boyadığımı demedim. Kayıt almak, üstünü boyamakla aynı iş değildir.",
        lastQuestion: "Kayıt almak ile boyamak aynı işlem mi?",
        lastAnswer:
          "Değil. Kayıt, mevcut izi not eder; boya ise yüzeye etki eder.",
        decision: "Yanlış öncül",
        reason:
          "Önceki yanıt kayıt ve temizlikten söz ediyor. Her çatlağı boyama iddiası, sorunun eklediği ve kişinin reddettiği bir öncül.",
      },
    ],
  },
  {
    id: "music",
    label: "Müzik",
    goal: "Tercihin nedenini sor",
    firstQuestion: "Provaları nasıl dinlersiniz?",
    firstAnswer:
      "Önce bütün kaydı dinler, sonra seçtiğim kısa bölümü birkaç kez dinlerim. Kısa bölümün neden seçildiğini henüz açmadım.",
    branches: [
      {
        question: "Önce bütün kaydı mı dinlersiniz?",
        answer: "Evet. Bütün kaydı önce dinlediğimi ilk yanıtımda söyledim.",
        lastQuestion: "Bu tekrar seçim nedenini verir mi?",
        lastAnswer:
          "Hayır; sıra bilgisini yineledik. Kısa bölümü seçme nedenim hâlâ ayrı bir bilgi.",
        decision: "Verilen bilgi",
        reason:
          "İlk dinleme sırası zaten vardı. Hedef kısa bölüm seçiminin nedeni; bu soru mevcut sırayı yeniden yineliyor.",
      },
      {
        question: "Kısa bölümü neden seçersiniz?",
        answer:
          "İki sesin aynı anda nasıl değiştiğini yakın dinlemek için o bölümü ayırırım.",
        lastQuestion: "Bu, başka bölümlerin önemsiz olduğu anlamına gelir mi?",
        lastAnswer:
          "Hayır. Bu kez belirli bir ilişkiyi incelemek istiyorum; diğer kısımlara önemsiz demek değil.",
        decision: "Yeni gerekçe",
        reason:
          "Kısa bölümü ayırma önceden verilmişti; iki sesin değişimini yakından inceleme amacı bu yanıtla yeni açılıyor.",
      },
      {
        question: "Eski kayıtların tümünü neden yok sayarsınız?",
        answer:
          "Eski kayıtları tümden yok saydığımı demedim. Seçilmiş bir bölümü dinlemek böyle bir ret değildir.",
        lastQuestion: "Bölüm seçmek bütün kaydı reddetmek midir?",
        lastAnswer:
          "Değil. Belirli bir kesite bakmak, kaydın tamamını değersiz saymakla aynı anlama gelmez.",
        decision: "Yanlış öncül",
        reason:
          "Bütün eski kayıtları reddetme iddiası ilk yanıtta yok. Hedefe bu yanlış öncülle varılamaz.",
      },
    ],
  },
  {
    id: "research",
    label: "Araştırma",
    goal: "Ölçütün nedenini sor",
    firstQuestion: "Belgeleri nasıl seçersiniz?",
    firstAnswer:
      "Kaynağı belli ve tarihi başka kayıtla uyuşan belgeleri önce incelerim. Bu ölçütün nedenini henüz açmadım.",
    branches: [
      {
        question: "Hangi belgeleri önce ele alırsınız?",
        answer:
          "Kaynağı belli, tarihi başka kayıtla uyuşanları; bu ölçütü ilk yanıtta verdim.",
        lastQuestion: "Ölçütü yinelemek gerekçe verdi mi?",
        lastAnswer:
          "Hayır. Neyi seçtiğimi söyledik; niçin bu ölçütü seçtiğim henüz verilmedi.",
        decision: "Verilen bilgi",
        reason:
          "Öncelik ölçütü zaten açıkça verilmişti. Hedef o ölçütün gerekçesi; aynı soruyu yinelemek yeni neden bilgisi vermiyor.",
      },
      {
        question: "Bu kaynak ölçütünü neden seçersiniz?",
        answer:
          "Yanlış kişi veya tarih atamayı azaltmak için. İki kaydın uyuşması yararlı bir kontroldür; tek başına tüm içeriği kesin kılmaz.",
        lastQuestion: "İki kayıt uyuşunca bütün içerik kesin doğru mudur?",
        lastAnswer:
          "Hayır. Uyum bir kontroldür; kayıtlar ortak hataya da dayalı olabilir. İçerik için başka kanıt gerekebilir.",
        decision: "Yeni gerekçe",
        reason:
          "Ölçüt önceki yanıtta vardı. Yanlış kişi veya tarih atamayı azaltma amacı bu takip sorusuyla açıldı; kesin doğruluk sözü eklenmedi.",
      },
      {
        question: "Ünlü kaynağı neden hep doğru sayarsınız?",
        answer:
          "Ünü ölçüt diye vermedim; hiçbir kaynağı hep doğru sayarım demedim.",
        lastQuestion: "Ün, kaynak için tek başına kanıt mı?",
        lastAnswer:
          "Hayır. Bu örnekte denetlenen şey kaynak ve tarih bilgisi; ün, içerik için tek başına kanıt değildir.",
        decision: "Yanlış öncül",
        reason:
          "Ün ve daima doğru sayma bu sorunun getirdiği ön kabuller. İlk yanıt bunları değil, kaynak ile tarih denetimini açıyordu.",
      },
    ],
  },
];
export function interviewContexts023() {
  return interviewCases023.map(({ id, label }) => ({ id, label }));
}
export function interviewScene023(caseId: string, branch = 0, turn = 0) {
  const item = interviewCases023.find((c) => c.id === caseId);
  if (!item) throw new RangeError("Görünen bir görüşme seçilmeli.");
  if (!Number.isInteger(branch) || branch < 0 || branch >= item.branches.length)
    throw new RangeError("Görünen bir takip sorusu seçilmeli.");
  if (!Number.isInteger(turn) || turn < 0 || turn > 2)
    throw new RangeError("Görüşme adımı0–2 olmalı.");
  const selected = item.branches[branch];
  const dialogue = [
    { speaker: "Görüşmeci", text: item.firstQuestion },
    { speaker: "Görüşülen kişi", text: item.firstAnswer },
  ];
  if (turn >= 1)
    dialogue.push(
      { speaker: "Görüşmeci", text: selected.question },
      { speaker: "Görüşülen kişi", text: selected.answer },
    );
  if (turn >= 2)
    dialogue.push(
      { speaker: "Görüşmeci", text: selected.lastQuestion },
      { speaker: "Görüşülen kişi", text: selected.lastAnswer },
    );
  return {
    kind: "interview" as const,
    caseId,
    label: item.label,
    goal: item.goal,
    branch,
    turn,
    questionLabels: item.branches.map((b) => b.question),
    dialogue,
    decision: selected.decision,
    reason: selected.reason,
    options: ["Verilen bilgi", "Yeni gerekçe", "Yanlış öncül"],
    nodes: [
      { label: "İlk yanıt", active: true },
      { label: "Takip", active: turn >= 1 },
      { label: "Açıklama", active: turn >= 2 },
    ],
    relations: [
      { from: 0, to: 1, active: turn >= 1, valid: branch !== 2 },
      { from: 1, to: 2, active: turn >= 2, valid: true },
    ],
    evidence:
      turn === 2
        ? selected.lastAnswer
        : turn === 1
          ? selected.answer
          : "Yeni yanıtı okumak için görüşmeyi bir adım ilerlet.",
  };
}
export const turkishDefaults023 = {
  caseId: "",
  choice: 0,
  selected: 0,
  turn: 0,
  guess: "",
  reason: "",
  compared: false,
  show: false,
};
