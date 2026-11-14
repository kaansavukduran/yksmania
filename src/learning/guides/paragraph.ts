import type { LessonGuide } from "./types";
import { paragraphPassage } from "../../data/reading";
export const paragraphGuide: LessonGuide = {
  id: "paragraf",
  minutes: 40,
  objectives: [
    "Konu, ana düşünce, yardımcı düşünce ve başlığı ayrı sorularla belirle.",
    "Cümleler arasındaki karşıtlık, gerekçe, örnek ve sonuç ilişkisini izle.",
    "Seçeneğin kapsamını, kesinliğini ve metindeki dayanağını kontrol et; dış bilgiyi metne ekleme.",
  ],
  sections: [
    {
      title: "Konu ne anlatıldığını, ana düşünce ne savunulduğunu söyler",
      paragraphs: [
        "Konu için ‘Bu metin ne hakkında?’ diye sorulur; yanıt çoğu zaman bir kavram veya durumdur. Ana düşünce için ‘Yazar bunun hakkında hangi asıl yargıyı benimsetmek istiyor?’ diye sorulur; yanıt bir yargı cümlesidir. Kitap okuma konudur; okumanın değerinin yalnız kitap bitirmekle ölçülemeyeceği ana düşünce olabilir. Aynı konu hakkında karşıt görüşlü iki paragraf yazılabilir.",
        "Başlık, metnin odağını kısa biçimde temsil eder; yalnız bir ayrıntıyı değil genel kapsamı karşılamalıdır. Yardımcı düşünceler ise ana yargıyı açıklar, örnekler veya gerekçelendirir. Metinde doğru olan bir ayrıntı, sırf doğru diye ana düşünce olmaz. Ana düşüncenin yeri her zaman son cümle değildir; girişte, gelişmede açıkça söylenebilir veya bütün metinden çıkarılabilir.",
      ],
    },
    {
      title: "Metni oku; cümlelerin görevini bul",
      paragraphs: [
        paragraphPassage,
        "Bu özgün metinde ilk cümle bitirmek ile anlamak arasında ayrım kurar. İkinci cümle okurun durup soru sormasını örnekleyerek ilişkiyi açıklar. Son cümle ‘yalnız … değil’ yapısıyla ölçütü genişletir. ‘Bazen’ sözcüğü bütün kitapların mutlaka yavaş okunması gerektiğini söylemez. Aşağıdaki modelde her cümleyi seçip görevini karşılaştır.",
      ],
    },
    {
      title: "Bağlaçlar düşüncenin yönünü gösterir",
      paragraphs: [
        "‘Ama’, ‘oysa’, ‘ne var ki’ çoğunlukla bir karşıtlığı veya beklentinin değişmesini bildirir. ‘Çünkü’ gerekçe, ‘bu nedenle’ sonuç, ‘örneğin’ somutlaştırma, ‘yani’ açıklama veya yeniden ifade ilişkisi kurabilir. Sözcüğe bakıp bütün paragrafı atlama; bağlacın hangi iki düşünceyi birbirine bağladığını göster.",
        "Bir örneğin konusu ile paragrafın temel savı aynı olmak zorunda değildir. Yazar teknoloji üzerine yargısını anlatmak için pusula örneği veriyorsa ana konu pusula tarihi olmayabilir. Örneği zihninde çıkarıp ana yargının hâlâ hangi düşünce olduğunu sormak, ayrıntıya takılmayı azaltır. Örneğin metindeki kanıt görevini kaybetmeden genelleme düzeyini bul.",
      ],
    },
    {
      title: "Kapsamı daraltma, kesinliği büyütme",
      paragraphs: [
        "Seçeneği metinle üç yönden karşılaştır: kim/ne hakkında, hangi koşulda ve ne kadar kesin? ‘Bazı okurlar’ ifadesini ‘bütün okurlar’, ‘etkileyebilir’ ifadesini ‘mutlaka belirler’, ‘önemli bir neden’ ifadesini ‘tek neden’ yapan seçenek metnin kapsamını değiştirir. Kesin sözcükler otomatik yanlış değildir; metin gerçekten o kesinliği taşıyorsa doğru olabilir.",
        "Metinden daha dar bir seçenek yalnız örneği tekrar edebilir; daha geniş bir seçenek hiç ele alınmamış insanları veya durumları ekleyebilir. Metindeki görüşe katılıp katılmaman çözüm ölçütü değildir. Gerçek dünyada doğru olan bir bilgi, bu parçada savunulmadığı için doğru seçenek olmayabilir. Kanıtı metnin içinde aramak dış bilgiyle boşluk doldurmaktan farklıdır.",
      ],
    },
    {
      title: "Olumsuz soru kökünde seçme görevini tersine çevir",
      paragraphs: [
        "‘Çıkarılamaz’, ‘değinilmemiştir’, ‘söylenemez’ ve ‘yakınılan değildir’ aynı olumlu görev değildir. Önce kökün senden ne istediğini kendi cümlenle söyle. Yardımcı düşünce sorusunda dört seçeneğin metindeki dayanağını bulup dayanağı olmayanı seçmek kullanılabilir; fakat işaretleyeceğin seçeneğin görevi unutulmamalıdır.",
        "Bir seçeneğin metinde kelimesi kelimesine geçmesi gerekmez; anlamı aynı başka sözlerle ifade edilebilir. Buna karşılık metindeki sözcükleri kullanıp ilişkiyi ters çeviren seçenek yanlış olabilir. ‘Düzenli tekrar hatırlamayı destekler’ cümlesinden ‘hatırlayan herkes düzenli tekrar yapmıştır’ zorunlu sonucu çıkmaz. Koşulun yönünü ve özneyi koru.",
      ],
    },
    {
      title: "Yapı sorusunda cümlelerin bağını denetle",
      paragraphs: [
        "Paragrafın giriş cümlesi, kendinden önceki belirsiz bir düşünceye açıklamasız bağımlı olmamalıdır. ‘Bu nedenle’ ile başlayan bir cümle çoğunlukla önce bir neden gerektirir; ancak yalnız bağlaç ezberiyle karar verilmez, verilen bütün bağlam okunur. Cümle sıralamada zamirlerin neye gönderme yaptığını ve olay/düşünce sırasını izle.",
        "Akışı bozan cümle aynı sözcüğü içerdiği hâlde farklı bir alt konuya geçebilir. Parçayı ikiye bölmede ikinci paragrafın yeni odağı aranır. Tamamlama sorusunda eklenen cümle önceki yargıyı açıklamalı veya uygun biçimde sonuçlandırmalı; metinde hazırlanmamış yeni bir konu açmamalıdır. Her soru türünün görevini ayrı tanı; tek bir hız tekniğini hepsine zorla uygulama.",
      ],
    },
    {
      title: "Uygulanabilir bir çözüm yolu ve geri kontrol",
      paragraphs: [
        "Soru kökünü tanı, paragrafı anlam ilişkileriyle oku, kısa bir ana yargı kur, seçenekleri kapsam ve kanıt bakımından karşılaştır. Uzun metinde her cümlenin altını çizmek yerine kilit karşıtlığı, neden-sonuç bağını veya sınırlandıran sözcüğü belirlemek daha kullanışlı olabilir. Okuma hızını artırmak uğruna olumsuz kökü veya ‘bazı’ koşulunu atlama.",
        "İki seçenek kalırsa ‘hangisi daha hoş?’ yerine ‘hangi metin parçası bu seçeneği zorunlu kılıyor?’ diye sor. Hatalı cevaptan sonra yalnız doğru harfi ezberleme: kök mü kaçtı, kapsam mı büyüdü, örnek ana yargı mı sanıldı, dış bilgi mi eklendi? Nedeni kendi notuna bir cümleyle yazıp sonraki bağımsız soruda aynı ayrımı yeniden dene.",
      ],
    },
  ],
  examples: [
    {
      title: "Konu ile yargıyı ayır",
      prompt:
        "Metin: ‘Bir şehri tanımak, yalnız tarihî yapılarını gezmek değildir. Pazarındaki konuşmalar ve günlük ulaşım alışkanlıkları da o şehrin yaşamını anlatır.’ Bu metnin konusu ve ana düşüncesi nedir?",
      strategy: "‘Ne hakkında?’ ve ‘Ne savunuyor?’ sorularına ayrı cevap ver.",
      steps: [
        {
          label: "Konu",
          explanation:
            "Şehri tanıma yolları anlatılıyor; bu bir kavram grubudur.",
        },
        {
          label: "Ana yargı",
          explanation:
            "Şehri anlamak için tarihî yapılarla birlikte gündelik yaşama da bakmak gerekir.",
        },
      ],
      answer:
        "Konu: şehri tanıma; ana düşünce: tanımayı gündelik yaşamı da kapsayacak biçimde genişletmek.",
      check: "Yazar tarihî yapıların gereksiz olduğunu söylemiyor.",
      pitfall:
        "‘Yalnız … değildir’ yapısını ilk öğeyi bütünüyle reddetmek gibi okuma.",
    },
    {
      title: "Bazen sözcüğünü koru",
      prompt: `Metin: ‘${paragraphPassage}’ ‘Bütün kitaplar mutlaka çok yavaş okunmalıdır’ sonucu çıkar mı?`,
      strategy:
        "Sonuçtaki bütünlük ve zorunluluğu metindeki koşullarla karşılaştır.",
      steps: [
        {
          label: "Dayanak",
          explanation:
            "Metin ‘bazen’ durup soru kurmaktan ve değeri yalnız sayfa sayısına bağlamamaktan söz eder.",
        },
        {
          label: "Aşırı genelleme",
          explanation:
            "‘Bütün’, ‘mutlaka’ ve ‘çok yavaş’ koşulları metinde bu kapsamda kurulmamıştır.",
        },
      ],
      answer: "Hayır; bu sonuç metnin kapsamını ve kesinliğini büyütür.",
      check:
        "Okumanın düşünsel etkileşimine önem verilmesi her kitabın aynı hızda okunmasını gerektirmez.",
      pitfall:
        "Doğru bir öneriyi metnin söylemediği zorunlu kurala dönüştürme.",
    },
    {
      title: "Olumsuz kökte kanıtı olmayanı seç",
      prompt:
        "Metin: ‘Mahalle bahçesi atıl alanı değerlendirdi. Birlikte çalışan komşular tanıştı; yetiştirilen ürünler ortak sofralarda paylaşıldı.’ Hangisi çıkarılamaz: A) Bir alan kullanıma açılmıştır. B) Sosyal ilişkilere katkı olmuştur. C) Mahalledeki bütün ekonomik sorunlar çözülmüştür.",
      strategy: "Her seçeneği metindeki belirli bir ifadeyle eşleştir.",
      steps: [
        {
          label: "Kanıtlı seçenekler",
          explanation:
            "‘Atıl alanı değerlendirdi’ A’yı, komşuların tanışması B’yi destekler.",
        },
        {
          label: "Kanıtsız kapsam",
          explanation:
            "Ürün paylaşılması bütün ekonomik sorunların çözüldüğünü söylemez.",
        },
      ],
      answer: "C çıkarılamaz.",
      check:
        "‘Çıkarılamaz’ istendiği için dayanağı bulunan A veya B işaretlenmez.",
      pitfall: "Genel olarak olumlu bir sonucu bütün sorunların çözümü sanma.",
    },
    {
      title: "Başlık ayrıntıyı değil bütünü kapsar",
      prompt:
        "Metin: ‘Müzede bir eşyanın adını okumak başlangıçtır. O eşyanın kimler tarafından hangi ihtiyaçla kullanıldığını düşünmek, geçmişteki yaşamı anlamayı sağlar.’ ‘Eşyanın Ötesindeki Yaşam’ başlığı neden ‘Eşya Adları Listesi’nden uygundur?",
      strategy: "Başlığın metnin asıl yönelişini kapsamasını denetle.",
      steps: [
        {
          label: "Ayrıntı",
          explanation: "Eşyanın adı yalnız başlangıç bilgisi olarak veriliyor.",
        },
        {
          label: "Bütünün odağı",
          explanation:
            "Yazar eşyanın kullanımından insanların yaşamına geçmeyi önemsiyor.",
        },
      ],
      answer:
        "İlk başlık nesneyi yaşam bağlamıyla birlikte kapsar; ikincisi başlangıç ayrıntısına daralır.",
      check: "Metin eşya adlarının hiç işe yaramadığını söylemiyor.",
      pitfall: "Parçada geçen en somut sözcüğü otomatik başlık seçme.",
    },
  ],
  recall: [
    {
      prompt: "Konu ile ana düşünceyi hangi iki soruyla ayırırsın?",
      answer: "Ne hakkında? / Bunun hakkında hangi asıl yargı savunuluyor?",
    },
    {
      prompt: "Kesin sözcükler her zaman yanlış seçenek mi yapar?",
      answer:
        "Hayır. Yanlışlık, metnin taşımadığı kesinliği eklemekten doğar; metin gerçekten genelliyorsa korunur.",
    },
    {
      prompt:
        "Bir seçenek neden metinde aynı kelimelerle geçmese de doğru olabilir?",
      answer:
        "Anlam ve ilişki aynı kalacak biçimde yeniden ifade edilmiş olabilir; kelime eşleştirmek tek başına ölçüt değildir.",
    },
  ],
  source:
    "OGM 12. Sınıf Paragrafta Anlam I ders notunun konu, başlık, ana düşünce ve yardımcı düşünce bölümleriyle karşılaştırılmış özgün öğretim anlatımı. Buradaki bütün örnek metin ve çözümler uygulama için yazılmıştır; resmî sınav sorusu değildir.",
};
