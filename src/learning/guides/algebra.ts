import type { LessonGuide } from "./types";
export const equationGuide: LessonGuide = {
  id: "birinci-dereceden-denklemler",
  minutes: 45,
  objectives: [
    "Birinci dereceden denklemi tanı; bilinmeyen, katsayı, kök ve çözüm kümesini ayır.",
    "Eşdeğer dönüşümlerle çöz; sıfıra bölmeden özel durumları sınıflandır.",
    "Kesirli ve parantezli denklemlerde başlangıç koşullarını koru.",
    "Sözel durumu modele çevir ve çözümü ilk denklemde doğrula.",
  ],
  sections: [
    {
      title: "Denklem bir koşuldur; kök o koşulu sağlayan değerdir",
      paragraphs: [
        "2x+5 bir cebirsel ifadedir; 2x+5=13 ise bir denklemdir. x’in hangi değeriyle iki tarafın eşit olacağını ararız. x=4 yazınca 13=13 olduğundan 4 bir köktür. Çözüm kümesi, başlangıçta izin verilen değerler arasındaki bütün kökleri içerir. Bilinmeyen mutlaka x harfi olmak zorunda değildir.",
        "a≠0 olmak üzere ax+b=0 biçimine indirgenen denklem birinci dereceden bir bilinmeyenli denklemdir. a sıfırsa artık birinci dereceden değildir; sabit eşitlik kalır. x² içeren denklem bu başlığın doğrudan biçimi değildir. Denklem bir gerçek yaşam modeliyse bilinmeyenin yaş, uzunluk veya nesne sayısı oluşu ek koşullar getirebilir; cebirsel kökü bağlamda da denetlemek gerekir.",
      ],
    },
    {
      title: "İki tarafa aynı işlemi yapmak neyi korur?",
      paragraphs: [
        "İki tarafa aynı gerçek sayıyı eklemek veya çıkarmak geri alınabilir; çözüm kümesini korur. Sıfırdan farklı aynı sayıyla çarpmak veya bölmek de geri alınabilir. ‘Karşıya atınca işaret değişir’ sözü aslında iki taraftan aynı terimi çıkarma işleminin kısaltmasıdır. Kısaltmayı unutursan tam işlemi yaz: 3x+4=16 → 3x+4−4=16−4.",
        "İki tarafı sıfırla çarpmak doğru bir eşitlikten yine doğru eşitlik üretir; fakat tersine döndürülemez ve çözüm kümesini korumaz. x=2’yi 0 ile çarpınca 0=0 elde edilir; bu son eşitlik bütün x’ler için doğrudur. Bu yüzden çözüm üretirken sıfırla çarpıp koşulu kaybedemez, sıfıra bölemezsin. Modelde a=0 seçerek neden bölme adımı bulunmadığını gör.",
      ],
    },
    {
      title: "Çözüm rutini: aç, topla, ayır, böl, kontrol et",
      paragraphs: [
        "Parantezleri dağıt, benzer terimleri birleştir, bilinmeyenli terimleri bir tarafta ve sabitleri diğer tarafta topla. −2(x−3)=−2x+6; eksi işareti parantezin tamamını etkiler. İki tarafta da x varsa ikisini sıfırlamaya çalışma; aynı x’li terimi iki taraftan çıkararak tek katsayı elde et.",
        "ax+b=c biçiminde a≠0 ise x=(c−b)/a. Sonuç tam sayı olmak zorunda değildir. Hesabı en kısa yapan yol değişebilir: ortak bir katsayı varsa başta ona bölmek parantez açmaktan daha az satır gerektirebilir. Ancak kısalık, geçerlilik koşullarını atlamak anlamına gelmez. Son değeri ilk denklemin hem soluna hem sağına ayrı koy.",
      ],
    },
    {
      title: "Tek çözüm, özdeşlik ve çelişki",
      paragraphs: [
        "Sadeleşmiş 4x=12 tek çözüm verir: x=3. 0x=0 ise her izinli x eşitliği sağlar; başlangıç alanı ℝ ise çözüm kümesi ℝ’dir. 0x=5 ise hiçbir x sağlamaz; çözüm kümesi ∅’dir. x’in katsayısını bilmeden bölmek bu iki durumu saklar.",
        "Parametre içeren (k−2)x=6 denkleminde k≠2 ise x=6/(k−2), k=2 ise 0x=6 ve çözüm yoktur. (k−2)x=0 içinse k≠2 olduğunda x=0, k=2 olduğunda her gerçek x çözümdür. Parametre için yaptığın bölümün sıfır olduğu değeri ayrı durum olarak yaz; sonucu tek bir formülle kapatma.",
      ],
      table: {
        headers: ["Son biçim", "Yorum", "Çözüm"],
        rows: [
          ["a≠0, ax=d", "Geri alınabilir bölme", "x=d/a"],
          ["0x=0", "Özdeşlik", "Başlangıç alanındaki bütün değerler"],
          ["0x=d, d≠0", "Çelişki", "∅"],
        ],
      },
    },
    {
      title: "Kesirli denklemde her terimi ve yasak değeri koru",
      paragraphs: [
        "Sabit paydalı bir denklemde ortak paydayla iki tarafın tamamını çarpmak kesirleri kaldırır. (x+1)/2+(x−2)/3=4 için 6 ile çarpınca 3(x+1)+2(x−2)=24 olur. Sağdaki 4 de 6 ile çarpılır; yalnız sol taraftaki paydaları silmek geçerli işlem değildir.",
        "Paydada x varsa ilk adım tanım koşuludur. (x+2)/(x−1)=3 için x≠1; iki tarafı x−1 ile çarpmak yalnız bu alan içinde yapılır. Son bulunan kökü ilk ifadede denetle. Bir sadeleşme sonucu 0=0 çıksa bile başlangıçta dışlanan değer geri gelmez: (x−1)/(x−1)=1’in çözümü ℝ∖{1}’dir, bütün ℝ değildir.",
      ],
    },
    {
      title: "Sözel durumu bilinmeyenle kur",
      paragraphs: [
        "Bilinmeyenin ne olduğunu ve birimini önce yaz. ‘Bir sayının üç katının 5 fazlası 26’ ifadesi 3x+5=26 demektir. ‘Üç katı’ ile ‘3 fazlası’nın sırasını koru. Bir alışverişte toplam ücret sabit ücret+birim ücret×adet olabilir; birimleri aynı satırda tutmak denklemin anlamını denetler.",
        "Cebirsel sonuç x=7,5 çıkarsa bilinmeyen litre olduğunda uygun olabilir; öğrenci sayısıysa tam sayı koşulunu sağlamaz. Bulduğun sayıyı yalnız son sadeleştirmeye değil, sorunun cümlesine geri koy. Olumsuz veya kesirli sonuç otomatik hata değildir; bağlamdaki koşullar karar verir.",
      ],
    },
  ],
  examples: [
    {
      title: "Parantez ve iki tarafta bilinmeyen",
      prompt: "3(x−2)=x+8 denklemini çöz.",
      strategy: "Parantezi aç, sonra aynı x terimini iki taraftan çıkar.",
      steps: [
        {
          label: "Dağıt",
          expression: "3x−6=x+8",
          explanation: "3 her iki terimle çarpılır.",
        },
        {
          label: "Bilinmeyeni yalnızlaştır",
          expression: "2x=14 → x=7",
          explanation:
            "İki taraftan x çıkarıp 6 ekler ve sıfır olmayan 2’ye böleriz.",
        },
      ],
      answer: "ÇK={7}.",
      check: "3(7−2)=15 ve 7+8=15.",
      pitfall: "3(x−2)’yi 3x−2 yazmak başlangıç koşulunu değiştirir.",
    },
    {
      title: "Sabit paydaları birlikte kaldır",
      prompt: "(x+1)/2+(x−2)/3=4 denklemini çöz.",
      strategy: "İki tarafın tamamını ortak payda 6 ile çarp.",
      steps: [
        {
          label: "Paydaları kaldır",
          expression: "3(x+1)+2(x−2)=24",
          explanation: "Her terim çarpımdan payını alır.",
        },
        {
          label: "Topla ve böl",
          expression: "5x−1=24 → x=5",
          explanation: "5x=25; 5 sıfır değildir.",
        },
      ],
      answer: "x=5.",
      check: "6/2+3/3=3+1=4.",
      pitfall: "Sağdaki 4’ü çarpmayı unutma.",
    },
    {
      title: "Paydadaki bilinmeyen",
      prompt: "(x+2)/(x−1)=3 denklemini çöz.",
      strategy: "Yasak değeri başta belirle ve son adayda yeniden denetle.",
      steps: [
        {
          label: "Tanım koşulu",
          expression: "x≠1",
          explanation: "Başlangıç paydası sıfır olamaz.",
        },
        {
          label: "İzinli alanda çarp",
          expression: "x+2=3(x−1) → 2x=5 → x=5/2",
          explanation:
            "Paydanın sıfır olmadığı alanda dönüşüm geri alınabilir.",
        },
      ],
      answer: "ÇK={5/2}.",
      check: "(5/2+2)/(5/2−1)=(9/2)/(3/2)=3; aday 1 değildir.",
      pitfall: "Yasak değerleri sadeleştirilmiş ifadeden yeniden belirleme.",
    },
    {
      title: "Parametrede sıfıra bölme tuzağı",
      prompt: "(k−3)x=k−3 denklemini gerçek k değerlerine göre incele.",
      strategy: "k−3’e bölmeden önce onun sıfır olduğu durumu ayır.",
      steps: [
        {
          label: "k≠3",
          expression: "x=1",
          explanation: "k−3 sıfırdan farklı olduğunda iki taraf bölünebilir.",
        },
        {
          label: "k=3",
          expression: "0x=0",
          explanation:
            "Her gerçek x eşitliği sağlar; artık birinci dereceden denklem değildir.",
        },
      ],
      answer: "k≠3 için {1}; k=3 için ℝ.",
      check: "k=3 ve x=8 yazınca 0=0 hâlâ doğrudur.",
      pitfall: "Koşulsuz bölüp her k için yalnız x=1 yazma.",
    },
    {
      title: "Ücretten adede",
      prompt:
        "Bir atölye 40 TL sabit ücret ve kullanılan her parça için 15 TL alıyor. Toplam 145 TL ödenmişse kaç parça kullanılmıştır?",
      strategy: "x parça sayısı olsun; ücretleri TL biriminde eşitle.",
      steps: [
        {
          label: "Model",
          expression: "40+15x=145",
          explanation: "Sabit tutar yalnız bir kez, parça ücreti x kez alınır.",
        },
        {
          label: "Çözüm",
          expression: "15x=105 → x=7",
          explanation:
            "Sonuç pozitif tam sayı olduğundan parça bağlamına uyar.",
        },
      ],
      answer: "7 parça.",
      check: "40+15×7=145 TL.",
      pitfall: "Sabit ücreti her parçaya yeniden uygulama.",
    },
  ],
  recall: [
    {
      prompt: "İki tarafı 0 ile çarpmak neden çözüm yöntemi değildir?",
      answer:
        "Eşitliği doğru tutabilir ama geri alınamaz; ilk denklemin çözüm koşulunu kaybettirir.",
    },
    {
      prompt: "0x=0 ve 0x=4 nasıl ayrılır?",
      answer:
        "İlki bütün izinli x’ler için doğrudur; ikincisi hiçbir x için doğru değildir.",
    },
    {
      prompt: "Kökü neden ilk denklemde denemelisin?",
      answer:
        "Yanlış parantez açmayı, kaybolan tanım koşulunu veya eşdeğer olmayan işlemi son sade satır gizleyebilir.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.33 (basılı 31); Aurelia Birinci Dereceden Denklemler s.1–4. Sıfırla çarpmanın eşitliği koruması ile çözüm eşdeğerliğini koruması ayrılmıştır. Anlatım, model ve örnekler özgündür; resmî soru değildir.",
};

export const inequalityGuide: LessonGuide = {
  id: "basit-esitsizlikler",
  minutes: 45,
  objectives: [
    "<,≤,>,≥ işaretlerini aralık ve sayı doğrusuyla ilişkilendir.",
    "Negatif sayıyla çarpma/bölmede yönü değiştir; işareti bilinmeyen ifadeyle koşulsuz bölme.",
    "Bileşik eşitsizliklerde kesişim ve birleşimi ayır; tam sayı ve uç koşullarını koru.",
    "Sözel sınırları doğru sembole çevirip iç/dış değerlerle kontrol et.",
  ],
  sections: [
    {
      title: "Tek bir kök değil, bir çözüm kümesi arıyoruz",
      paragraphs: [
        "x<3, 3’ten küçük bütün gerçek sayıları anlatır; 3’ü içermez. x≤3 aynı aralığa sınırı da ekler. Sıkı eşitsizlik < veya >, eşitliğe izin veren ≤ veya ≥ ile karıştırılmaz. Sayı doğrusunda dışlanan uç açık, dahil edilen uç dolu noktadır.",
        "x<3 aralığı (−∞,3), x≥−2 aralığı [−2,∞) yazılır. Parantez ucu dışlar, köşeli parantez dahil eder. ∞ bir gerçek sayı veya ulaşılacak son değer değildir; sonsuzluk yanında her zaman normal parantez kullanılır. Bu anlatımın temel alanı ℝ’dir; soru tam sayı istiyorsa son aralıktan yalnız tam sayılar seçilir.",
      ],
    },
    {
      title: "Yön yalnız negatifle çarpma ve bölmede neden döner?",
      paragraphs: [
        "İki tarafa aynı sayıyı eklemek/çıkarmak sayı doğrusunda birlikte ötelemeye benzer; sıralama korunur. Pozitif sayıyla çarpma/bölme de yönü korur. Negatif sayıyla çarpma ise sıfıra göre yansımayı da içerir: −2<5 iken −1 ile çarpınca 2>−5 olur. Bu yüzden negatif bölen kullanıldığında < ile >, ≤ ile ≥ yer değiştirir.",
        "İki taraftan 7 çıkarmak negatif sayıyla çarpmak değildir; yön dönmez. −3x<12 çözülürken iki tarafı −3’e bölmek x>−4 verir. İşareti bilinmeyen x−1 ifadesine bölmek ise tek bir yönle yapılamaz: x>1, x<1 ve x=1 durumları farklıdır. Modelde a’yı pozitif, negatif ve sıfır yaparak bu üç durumu karşılaştır.",
      ],
    },
    {
      title: "Doğrusal eşitsizliği çöz ve sınırı açık tut",
      paragraphs: [
        "Parantezleri dağıtıp benzer terimleri topla; ax+b<c biçimine gel. Önce b’yi çıkar; sonra a’nın işaretine göre böl. a>0 ise x<(c−b)/a, a<0 ise x>(c−b)/a olur. a=0 ise bilinmeyen kaybolur; b<c doğruysa bütün gerçekler, yanlışsa boş küme çözümdür. ≤,>,≥ için aynı mantık uygun işaretle yürür.",
        "Sınır değeri eşitliği sağlar ama sıkı eşitsizliği sağlamaz. Çözümü gösterirken bir iç değer ve bir dış değer seçip ilk ifadede dene. Bu kontrol yön hatasını yakalar: −2x<6 için x=0 doğrudur, x=−4 yanlıştır; dolayısıyla çözüm −3’ün sağı olmalıdır.",
      ],
    },
    {
      title: "Bileşik eşitsizlikte bütün taraflara işlem uygula",
      paragraphs: [
        "−2<3x+1≤10 iki koşulun birlikte sağlanmasını ister. Üç taraftan da 1 çıkarılır: −3<3x≤9. Pozitif 3’e bölünce −1<x≤3; aralık (−1,3] olur. Sol ucun açık ve sağ ucun kapalı oluşu baştaki işaretlerden gelir.",
        "Negatif katsayıyla üç tarafı bölersen her iki yön de döner. Örneğin −4≤−2x<6 → 2≥x>−3; küçükten büyüğe yazınca −3<x≤2. Zinciri yeniden sıralarken hangi ucun eşitliği içerdiğini koru. Aralık genişliğini tam sayı adedi sanma; (−3,2] için tam sayılar −2,−1,0,1,2 olmak üzere beş tanedir.",
      ],
    },
    {
      title: "‘Ve’ kesişim, ‘veya’ birleşimdir",
      paragraphs: [
        "x>1 ve x≤4 denince ikisi aynı anda sağlanır; ortak bölge (1,4]’tür. x<−2 veya x≥3 denince iki taraftan herhangi biri yeterlidir; sonuç (−∞,−2)∪[3,∞) olur. ‘Veya’ burada en az birini sağlamak demektir, ikisini sağlamayı yasaklayan özel bir bağlaç değildir.",
        "x<1 ve x>4 için ortak değer yoktur; çözüm ∅. Aynı koşullar ‘veya’ ile bağlanırsa iki ayrı aralık vardır. x<4 veya x≥1 ise bütün gerçekler kapsanır. Karmaşık bir cümlede koşulları ayrı sayı doğrularında düşünmek ve sonra ortak/birleşik bölgeyi almak, işaret ezberinden daha güvenilirdir.",
      ],
    },
    {
      title: "Ters alma, kare alma ve aralık işlemlerinde koşul",
      paragraphs: [
        "0<a<b için 1/a>1/b; aynı pozitif aralıkta ters alma sıralamayı değiştirir. İki sayı negatifken de sıfırı geçmeyen aynı tarafta ters alma yönü değiştirir; fakat a<0<b iken 1/a<0<1/b olduğundan ilk sıra korunur. Sıfırın çarpmaya göre tersi yoktur. Bir aralık sıfırı içeriyorsa terslerini tek bir kesintisiz aralık gibi yazma.",
        "Kare alma bütün gerçeklerde sıralamayı korumaz. −5<2 doğruyken 25<4 yanlıştır. 0≤a<b için a²<b² kullanılabilir; tamamen negatif aralıkta büyüklük mutlak değerle değişir. Aynı yönlü eşitsizlikler taraf tarafa toplanabilir; çıkarma ve çarpma için aynı serbestlik yoktur. İşlem yapmadan önce işaretleri ve sıfırı denetle.",
      ],
    },
    {
      title: "Sözel sınırı sembole çevir",
      paragraphs: [
        "‘En az 5’ x≥5, ‘en fazla 5’ x≤5, ‘5’ten fazla’ x>5 demektir. Gelir maliyetten büyükse kâr vardır; gelir maliyete eşitse kâr yoktur ama zarar da yoktur. ‘Zarar etmemek’ eşitliği kabul eder. Küçük bir sözcük farkı uç noktanın dahil olup olmadığını değiştirir.",
        "Bütçe, kapasite veya süre probleminde bilinmeyenin birimini yaz. Sonuç x≤7,4 ve x bilet adediyse en büyük izinli tam sayı 7’dir; 7,4 bilet alınamaz. Negatif sınırda da yuvarlamayı düşünmeden yapma: x>−2,5 için en küçük tam sayı −2’dir. Son adayı ilk koşulda dene; aralıktaki bütün gerçek sayılar ile uygun tam sayıları ayır.",
      ],
    },
  ],
  examples: [
    {
      title: "Negatif katsayı yönü değiştirir",
      prompt: "−3x+4≤13 eşitsizliğini çöz.",
      strategy:
        "Önce sabiti çıkar, sonra negatif katsayıya bölerken yönü ters çevir.",
      steps: [
        {
          label: "Sabit terim",
          expression: "−3x≤9",
          explanation: "İki taraftan 4 çıkarınca yön korunur.",
        },
        {
          label: "Negatife böl",
          expression: "x≥−3",
          explanation: "−3’e bölme nedeniyle ≤ işareti ≥ olur.",
        },
      ],
      answer: "[−3,∞)",
      check: "x=−3 eşitlik sağlar; x=0 sağlar; x=−4 sağlamaz.",
      pitfall:
        "Negatif bir sayı çıkarmak ile negatif sayıya bölmeyi karıştırma.",
    },
    {
      title: "İki farklı uç",
      prompt: "1≤(x−2)/3<4 eşitsizliğini çöz ve kaç tam sayı içerdiğini bul.",
      strategy: "Üç tarafı pozitif 3 ile çarp, sonra üç tarafa 2 ekle.",
      steps: [
        {
          label: "Kesri kaldır",
          expression: "3≤x−2<12",
          explanation: "Bölen pozitif; iki yön de korunur.",
        },
        {
          label: "Aralığı bul",
          expression: "5≤x<14 → [5,14)",
          explanation: "5 dahil, 14 hariçtir.",
        },
        {
          label: "Tam sayıları say",
          expression: "5,6,…,13 → 13−5+1=9",
          explanation: "Aralık uzunluğuyla sayma mantığını birlikte denetle.",
        },
      ],
      answer: "[5,14); dokuz tam sayı.",
      check: "x=5 ilk ifadede 1 verir; x=14 ise 4 verir ve dışlanır.",
      pitfall: "Açık uç 14’ü sayıya dahil etme.",
    },
    {
      title: "Ve ile veya farklı küme verir",
      prompt:
        "x>−1 koşuluyla x≤3 koşulunu önce ‘ve’, sonra ‘veya’ ile birleştir.",
      strategy: "Ortak bölgeyi ve en az birinin sağlandığı bölgeyi ayrı bul.",
      steps: [
        {
          label: "Kesişim",
          expression: "x>−1 ve x≤3 → (−1,3]",
          explanation: "Her iki koşulun sağlandığı ortak bölüm alınır.",
        },
        {
          label: "Birleşim",
          expression: "x>−1 veya x≤3 → ℝ",
          explanation:
            "Her gerçek sayı en az birini sağlar; arada boşluk yoktur.",
        },
      ],
      answer: "‘Ve’: (−1,3]; ‘veya’: ℝ.",
      check:
        "x=100 yalnız ilkini, x=−100 yalnız ikincisini sağlar; ikisi de birleşimdedir.",
      pitfall: "‘Veya’ denince yalnız aradaki küçük bölgeyi alma.",
    },
    {
      title: "Sıfır katsayı sınırı",
      prompt: "a=0 iken ax+2<5 ve ax+2≥5 eşitsizliklerinin çözümü nedir?",
      strategy: "Sıfıra bölmeye çalışma; kalan sabit cümleyi değerlendir.",
      steps: [
        {
          label: "Birinci koşul",
          expression: "2<5 doğru → ℝ",
          explanation: "x’in değeri sonucu değiştirmez.",
        },
        {
          label: "İkinci koşul",
          expression: "2≥5 yanlış → ∅",
          explanation: "Hiçbir x bu yanlış sabit cümleyi düzeltemez.",
        },
      ],
      answer: "Sırasıyla ℝ ve ∅.",
      check: "İki örnekte de a=0 nedeniyle bilinmeyen kaybolur.",
      pitfall: "a=0 durumunu x<(5−2)/a formülüne koyma.",
    },
    {
      title: "Bütçeden en büyük tam sayı",
      prompt:
        "Bir etkinliğin 30 TL sabit ücreti ve her atölye için 18 TL ücreti var. 160 TL bütçeyle en çok kaç atölye seçilebilir?",
      strategy:
        "Bütçeyi aşmama koşulu eşitliği kabul eder; atölye sayısı negatif olmayan tam sayıdır.",
      steps: [
        {
          label: "Model",
          expression: "30+18x≤160",
          explanation: "Toplam gider bütçeden büyük olamaz.",
        },
        {
          label: "Sınır ve tam sayı",
          expression: "x≤130/18=65/9 → x en çok 7",
          explanation:
            "8, izin verilen gerçek sınırı aşar; tam sayı seçimi gerekir.",
        },
      ],
      answer: "7 atölye.",
      check: "7 için 156 TL, 8 için 174 TL gerekir.",
      pitfall:
        "Üst sınıra en yakın tam sayıya sıradan yuvarlama yapma; eşitsizliği sağlayan yönü koru.",
    },
  ],
  recall: [
    {
      prompt: "İki tarafa −4 ekleyince yön değişir mi?",
      answer: "Hayır. Yönü çeviren işlem negatif sayıyla çarpma veya bölmedir.",
    },
    {
      prompt: "∞ neden köşeli parantezle yazılmaz?",
      answer:
        "Sonsuzluk bir gerçek sayı veya dahil edilebilecek bir uç değer değildir.",
    },
    {
      prompt: "x’in katsayısına bölmeden önce neye bakarsın?",
      answer:
        "Pozitif, negatif veya sıfır olmasına; bunlar yön ve çözüm kümesini değiştirir.",
    },
    {
      prompt: "Tam sayı cevabında son kontrol nedir?",
      answer:
        "Seçtiğim uç tam sayıyı ve komşusunu ilk koşulda denemek; en büyük/en küçük olduğunu doğrulamak.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.34 (basılı 32); Aurelia Basit Eşitsizlikler s.1–4; negatif çarpma/bölme, sıfır, açık/kapalı uç ve bağlaç koşulları korunmuştur. Özgün model ve çözümler; resmî sınav sorusu değildir.",
};
