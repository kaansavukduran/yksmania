import type { LessonGuide } from "./types";
export const derivativeDepthGuide: LessonGuide = {
  id: "turev-teget",
  minutes: 75,
  objectives: [
    "Ortalama değişimden iki yanlı anlık değişime geç; değer ile eğimi ayır.",
    "Türev kurallarını tanım koşullarıyla uygula; teğet, değişim ve ekstremum problemlerinde kontrol et.",
    "Süreklilik, türevlenebilirlik ve ekstremumun birbirinin yerine geçmediğini karşı örnekle açıkla.",
  ],
  sections: [
    {
      title: "Önce iki ölçüm: neyin değişimini neye bölüyorsun?",
      paragraphs: [
        "Bir fonksiyonun değişim oranı, çıktıdaki farkın girdideki farka oranıdır: [f(b)−f(a)]/(b−a), a≠b. Grafikte (a,f(a)) ile (b,f(b)) arasındaki kirişin eğimidir. Konum metre, zaman saniye ise oran m/s olur; yalnızca grafikteki yüksekliği okumak hız vermez. Konum azalırken ortalama hız negatif olabilir. Negatif sonuç, hesap hatası veya negatif sürat demek değildir.",
        "Aynı ortalama hız aralık içindeki her andaki hızın aynı olduğunu kanıtlamaz. f(x)=x² üzerinde a=2, b=2,5 seçilirse oran 4,5 çıkar. b’yi değiştir; kiriş değişir fakat başlangıç noktası aynı kalır. Anlık değişimi tek bir büyük aralıkla eşitlemeden önce aralığın küçülmesini düşün.",
      ],
    },
    {
      title: "h sıfır değildir; sıfıra yaklaşır",
      paragraphs: [
        "b=a+h yazınca fark oranı [f(a+h)−f(a)]/h olur. h≠0 koşulu oranı tanımlı tutar; türev bu oranların h→0 limitidir. f(x)=x² için açılım a²+2ah+h² verir; a² çıkarılınca h(2a+h) kalır. h sıfırdan farklıyken sadeleştirip 2a+h elde ederiz. Limit 2a’dır; başlangıçtaki 0/0 ifadesini bir sayı gibi bölmedik.",
        "Modelde h’nin işaretini değiştirerek iki taraftan yaklaş. Küçük bir h ile hesaplanan kiriş eğimi yaklaşık anlık eğimdir; limitin varlığı ayrıca değerlendirilir. Sonlu ekran çözünürlüğünde iki çizginin üst üste görünmesi, bütün fonksiyonlarda türevin var olduğunu kanıtlamaz.",
      ],
    },
    {
      title: "İki taraf, tek sonlu eğim",
      paragraphs: [
        "Bir iç noktada türev için sağdan ve soldan fark oranlarının aynı sonlu değere yaklaşması gerekir. |x| fonksiyonu 0’da süreklidir; sağ eğim +1, sol eğim −1 olduğundan tek türev yoktur. Bir tarafı inceleyip ötekinin aynı olduğunu varsayma. Tanım aralığının uç noktasında iki yanlı iç nokta koşulunu aynen kullanmak yerine sorunun tek yanlı türev isteyip istemediğini oku.",
        "Türevlenebilirlik sürekliliği gerektirir; süreklilik tek başına türevlenebilirliği sağlamaz. Kopma, tanımsız nokta, köşe veya sonlu olmayan eğim ayrı nedenlerle incelenir. f(a) tanımlı değilse o noktada türev tanımlamaya çalışma. Grafiğin yalnız çizilmiş parçalarıyla verilmediği bir noktaya değer icat etme.",
      ],
    },
    {
      title: "f(a) yükseklik, f′(a) değişimdir",
      paragraphs: [
        "f(a), fonksiyonun a noktasındaki değeridir; grafikteki nokta (a, f(a)) ile belirtilir. f′(a), varsa o noktadaki teğetin eğimidir. f(x)=x² ve a=2 için f(2)=4 ve f′(2)=4 tesadüfen eşittir; a=3 için değer 9, eğim 6 olur. Eşitlik genel kural değildir. f′(a)=0 yatay teğet demektir; f(a)=0 ise nokta x eksenindedir.",
        "Konumun türevi hız, hızın türevi ivmedir. İkinci türev f″(x), f′ fonksiyonunun türevidir; f(x) değerinin karesi değildir. Birimler de bu farkı gösterir. Negatif konum, negatif hız ve negatif ivme farklı yargılardır.",
      ],
    },
    {
      title: "Sabit ve kuvvet kuralı: önce tanım alanı",
      paragraphs: [
        "Sabitin türevi 0’dır. Uygun türevlenebilirlik alanında (c·xⁿ)′=c·n·xⁿ⁻¹. Pozitif tam sayılı polinomlarda her gerçek x’te kullanılabilir. Negatif veya kesirli üslerde gerçek tanım alanını ve türevin var olduğu noktaları ayrıca denetle. Örneğin (√x)′=1/(2√x) ancak x>0 için bu biçimde tanımlıdır; x=0’da bu formüle sayı koyamazsın.",
        "Toplam ve fark terim terim türevlenir. 3x³−2x+7’nin türevi 9x²−2’dir; 7 sabit olduğu için yok olur. Önce x’e göre türev alıp sonra a noktasını yerine koy. f′(a) istenirken önce f(a)’yı sabit bir sayıya çevirip onun türevini almak yanlış işlemi çözer.",
      ],
    },
    {
      title: "Çarpım ve bölüm: sadece türevleri çarpma",
      paragraphs: [
        "(u·v)′=u′v+uv′. Bir çarpanın değişimini hesaplarken ötekinin o andaki değerini de koruruz. (x²·x³)′=2x·x³+x²·3x²=5x⁴; yalnız 2x·3x² yazmak çarpım kuralı değildir. Basitleştirmek mümkünse önce x⁵ yazıp aynı sonucu kontrol edebilirsin.",
        "(u/v)′=(u′v−uv′)/v²; v≠0 ve iki fonksiyonun ilgili noktada türevlenebilir olması gerekir. Paydaki eksi işaretinin sırası önemlidir. Bölümün türevi u′/v′ değildir. Sadeleştirme yapsan da başlangıçta yasak olan noktaları fonksiyonun tanımına geri katamazsın.",
      ],
    },
    {
      title: "Zincir kuralı: dış değişim iç değişimle birlikte",
      paragraphs: [
        "Bir bileşke f(g(x)) için türev f′(g(x))·g′(x)’tir. (3x−1)⁴ örneğinde dış fonksiyon dördüncü kuvvet, iç fonksiyon 3x−1’dir. Dış türev 4(3x−1)³; iç türev 3 olduğundan sonuç 12(3x−1)³. İçerideki ifade tek x gibi görünse bile onun değişim katsayısı unutulmaz.",
        "Karekök ve negatif kuvvetlerde de aynı ilişki uygulanır; gerçeklik ve payda koşulları korunur. √(x²+1) için iç ifade her gerçek x’te pozitiftir; türev x/√(x²+1). Benzer görünümdeki √(x−1) için ise bu türev biçimi x>1’de incelenir.",
      ],
    },
    {
      title: "Teğet ve normal: eğimin yanında nokta da gerekir",
      paragraphs: [
        "f′(a) sonlu olarak varsa teğet denklemi y−f(a)=f′(a)(x−a) olur. Sadece eğimi bulmak sonsuz paralel doğrudan doğru olanı seçmeye yetmez. f(x)=x², a=2 için y−4=4(x−2), yani y=4x−4. Teğetin mutlaka grafiğe yalnız bir noktada değeceği düşüncesi genel fonksiyonlar için güvenilir tanım değildir; yerel eğim ilişkisini kullan.",
        "Sonlu ve sıfırdan farklı teğet eğimi m için normal eğimi −1/m’dir. Yatay teğetin normali düşeydir; eğimini 0 diye yazma. Düşey doğruların sonlu eğimi yoktur. Paralellikte sonlu eğimler eşit, diklikte iki sonlu eğimin çarpımı −1 olur; düşey/yatay özel durumunu ayrıca ele al.",
      ],
    },
    {
      title: "Artma-azalma: işaret tablosu bir aralık iddiasıdır",
      paragraphs: [
        "Bir aralıkta türev pozitifse fonksiyon o aralıkta artar; negatifse azalır. Bu, fonksiyon değerinin pozitif/negatif olmasıyla aynı değildir. Türev bütün bağlantılı aralıkta 0 ise fonksiyon sabittir. Tek bir noktada türevin 0 olması, bütün aralığın sabit olduğunu söylemez.",
        "f(x)=x³ her gerçek aralıkta sıkı artandır fakat f′(0)=0’dır. Bu nedenle “artan fonksiyonun her noktada türevi mutlaka pozitiftir” genellemesi yapılmaz. Tanım dışı noktalarla ayrılan parçaları tek aralıkmış gibi birleştirme. Türev işaretini köklerin arasından seçilen deneme noktalarıyla doğrula.",
      ],
    },
    {
      title: "Ekstremum adayı, yerel sonuç ve mutlak sonuç",
      paragraphs: [
        "Bir iç noktada türevlenebilir bir fonksiyonun yerel ekstremumu varsa türevi 0 olur. Ters yön otomatik doğru değildir: x³’ün 0’da türevi 0, ama yerel en büyük veya en küçük değeri yoktur. |x|’in 0’da minimumu vardır; türevi yoktur. Önce adayları, sonra çevredeki davranışı incele.",
        "Türev işareti −’den +’ya geçerse yerel minimum; +’dan −’ye geçerse yerel maksimum elde edilir. Kapalı aralıktaki mutlak en büyük/en küçük değer için iç adaylarla uç noktaların fonksiyon değerlerini karşılaştır. Açık aralıkta yaklaşılabilen bir üst sınırın mutlaka alındığı varsayılmaz. Nokta (x,f(x)) ile değer f(x) ayrı cevap türleridir.",
      ],
    },
    {
      title: "Grafik ve model kurma: sonucu özgün soruya geri taşı",
      paragraphs: [
        "Grafik incelerken tanım kümesi, eksen kesişimleri, türevin işareti ve kritik noktaları birlikte düşün. Polinomlarda kökün tek/çift katlı oluşu ekseni kesme veya dokunma davranışını açıklar; bu cümleyi tanımsızlıkları olan her ifadeye koşulsuz uygulama. Bir tabloda f′ bilgisi varsa bunun doğrudan f’nin yüksekliğini vermediğini hatırla.",
        "En büyük/en küçük probleminde önce aranan büyüklüğü bir değişkenle yaz; fiziksel koşullar tanım aralığını belirlesin. Sıfır türev adayları bulunduktan sonra amaç fonksiyonunu değerlendir. Negatif uzunluk veya yasak payda veren matematiksel aday, probleme çözüm olmaz. Newton ve Leibniz’in 17. yüzyıldaki bağımsız çalışmaları modern türev yaklaşımının gelişiminde önemlidir; tarihsel bilgi türev koşullarını kanıtlamanın yerine geçmez.",
      ],
    },
  ],
  examples: [
    {
      title: "Tanımdan x²’nin türevine",
      prompt:
        "f(x)=x² için a=3 noktasındaki türevi fark oranıyla bul. h sıfırdan farklıdır.",
      strategy: "Önce aç, sonra h’yi sadeleştir, en son limit al.",
      steps: [
        {
          label: "Fark",
          expression: "[(3+h)²−9]/h=(6h+h²)/h",
          explanation: "Kare açılımında 2·3·h terimini koru.",
        },
        {
          label: "Koşullu sadeleştirme",
          expression: "6+h, h≠0",
          explanation: "h ile bölme limitten önce geçerlidir.",
        },
        {
          label: "Limit",
          expression: "lim h→0 (6+h)=6",
          explanation: "Sağdan ve soldan aynı sonlu değer.",
        },
      ],
      answer: "f′(3)=6.",
      check: "Kuvvet kuralı 2x, x=3 için 6 verir.",
      pitfall: "Başlangıçtaki oran içine doğrudan h=0 yazıp 0/0’ı sonuç sanma.",
    },
    {
      title: "Süreklilik yetmez",
      prompt: "f(x)=|x| fonksiyonu 0’da sürekli mi, türevli mi?",
      strategy: "İki yandaki eğimi ayrı denetle.",
      steps: [
        {
          label: "Sol",
          expression: "x<0 için f(x)=−x",
          explanation: "Sol eğim −1.",
        },
        {
          label: "Sağ",
          expression: "x>0 için f(x)=x",
          explanation: "Sağ eğim +1; değerler 0’a yaklaşır.",
        },
      ],
      answer: "Sürekli, fakat iki yanlı türev yok.",
      check: "Sağ ve sol eğimler eşit değildir.",
      pitfall: "Süreklilikten türevlenebilirlik sonucu çıkarma.",
    },
    {
      title: "Çarpımı iki yoldan kontrol et",
      prompt: "y=(x²+1)(x−2) için y′(2) kaçtır?",
      strategy: "Çarpım kuralında türevi alınmayan çarpanı yerinde tut.",
      steps: [
        {
          label: "Türev",
          expression: "y′=2x(x−2)+(x²+1)",
          explanation: "İki çarpanın katkısı toplanır.",
        },
        {
          label: "Noktada",
          expression: "y′(2)=4·0+5=5",
          explanation: "Değeri türev ifadesinde yerine koy.",
        },
      ],
      answer: "5.",
      check: "Önce açılım x³−2x²+x−2; türevi 3x²−4x+1, x=2 için 5.",
      pitfall: "2x·1 yazmak çarpımın türevini vermez.",
    },
    {
      title: "Bölümde tanım dışı nokta",
      prompt: "f(x)=(x²−1)/(x−1) için f′(2) ve f′(1) değerlerini incele.",
      strategy: "Başlangıçtaki tanımı sadeleşen ifadeden ayır.",
      steps: [
        {
          label: "Sadeleştirme",
          expression: "f(x)=x+1, x≠1",
          explanation: "Fonksiyon 1’de hâlâ tanımsızdır.",
        },
        {
          label: "Türev",
          expression: "f′(2)=1",
          explanation:
            "2 izinli noktadır; 1’de f tanımlı olmadığından f′(1) yoktur.",
        },
      ],
      answer: "f′(2)=1; f′(1) tanımlı değildir.",
      check: "Çarpan sadeleşmesi tanım kümesini genişletmez.",
      pitfall: "Türevi 1 bulduktan sonra bu değeri yasak noktaya da vermek.",
    },
    {
      title: "Zincirde iç katsayı",
      prompt: "y=(3x−1)⁴ için y′(1) kaçtır?",
      strategy: "Dış kuvvet ve iç doğrusal ifade ayrı türevlenir.",
      steps: [
        {
          label: "Zincir",
          expression: "y′=4(3x−1)³·3",
          explanation: "İç türev 3 unutulmaz.",
        },
        {
          label: "Değer",
          expression: "y′(1)=12·2³=96",
          explanation: "Önce türev, sonra nokta.",
        },
      ],
      answer: "96.",
      check: "Yakın iki x değerinde fark oranı 96’ya yaklaşır.",
      pitfall: "Sadece 4(3x−1)³ yazıp 32 bulmak.",
    },
    {
      title: "Teğet ve normal",
      prompt:
        "y=x² eğrisinin x=1 noktasındaki teğet ve normal denklemleri nedir?",
      strategy: "Noktayı ve eğimleri ayrı hesapla.",
      steps: [
        {
          label: "Nokta ve eğim",
          expression: "(1,1), m=2",
          explanation: "Türev 2x, x=1 için 2.",
        },
        {
          label: "Doğrular",
          expression: "Teğet: y−1=2(x−1); normal: y−1=−(x−1)/2",
          explanation: "Normalin eğimi −1/2.",
        },
      ],
      answer: "Teğet y=2x−1; normal y=−x/2+3/2.",
      check: "Her iki doğru (1,1)’den geçer; eğimlerin çarpımı −1.",
      pitfall: "Normalin eğimini −2 sanma.",
    },
    {
      title: "Adayları uçlarla karşılaştır",
      prompt:
        "f(x)=x³−3x, x∈[−2,2] için mutlak en büyük ve en küçük değerleri bul.",
      strategy:
        "İç kritik noktalar ve kapalı aralık uçlarının tamamını denetle.",
      steps: [
        {
          label: "Kritik noktalar",
          expression: "f′(x)=3(x−1)(x+1)=0 ⇒ x=−1,1",
          explanation: "İkisi de aralıkta.",
        },
        {
          label: "Değerler",
          expression: "f(−2)=−2, f(−1)=2, f(1)=−2, f(2)=2",
          explanation: "Uçlar unutulmaz.",
        },
      ],
      answer: "En büyük değer 2, en küçük değer −2.",
      check: "En büyük x=−1 ve 2’de; en küçük x=−2 ve 1’de alınır.",
      pitfall: "Yalnız türevin köklerini kontrol edip uçları atlama.",
    },
    {
      title: "Uzunluk kısıtıyla en büyük alan",
      prompt:
        "Çevresi 20 birim olan bir dikdörtgenin en büyük alanı nedir? Kenarlar pozitiftir.",
      strategy: "Çevre koşuluyla tek değişkenli amaç fonksiyonu kur.",
      steps: [
        {
          label: "Model",
          expression: "2x+2y=20 ⇒ y=10−x; A=x(10−x), 0<x<10",
          explanation: "Pozitif kenarlar açık aralığı belirler.",
        },
        {
          label: "Maksimum",
          expression: "A′=10−2x=0 ⇒ x=5",
          explanation: "İşaret +’dan −’ye geçer; y=5.",
        },
      ],
      answer: "25 birim².",
      check: "A=25−(x−5)² olduğundan 25 aşılmaz ve x=5’te alınır.",
      pitfall:
        "Kenarların toplamını 20 sanma veya alanı çevre birimiyle yazma.",
    },
  ],
  recall: [
    {
      prompt: "f′(a)=0 her zaman ekstremum mudur?",
      answer:
        "Hayır; x³, 0’da karşı örnektir. İşaret değişimi ve tanım aralığı incelenir.",
    },
    {
      prompt: "Bir noktada sürekli olmak neden yetmez?",
      answer: "|x|, 0’da sürekli fakat sol/sağ eğimleri farklıdır.",
    },
    {
      prompt: "Fark oranına neden önce h=0 koyulmaz?",
      answer: "Oran h≠0 için tanımlıdır; türev bu tanımlı oranların limitidir.",
    },
    {
      prompt: "Bölümün ve zincirin iki kritik koşulu nedir?",
      answer:
        "Bölümde payda sıfır olamaz; zincirde iç türevle çarpılır ve tanım/türev alanı korunur.",
    },
  ],
  source:
    "MEBİ AYT Matematik Konu Özetleri PDF s.78–89, basılı s.76–87: değişim oranı, türev kuralları, artma-azalma, ekstremum, teğet ve optimizasyon. Özgün açıklama ve örnekler; kaynakta artma/eğim ilişkisi için tek noktadaki sıfır türev karşı örneğiyle koşullar netleştirildi. Mevcut model yalnız x² ve |x| içindir; bütün fonksiyonları temsil etmez.",
};
