import { txt as t, type Lesson, type Question } from "../domain/model";
const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
): Question => ({
  id,
  prompt: t(prompt),
  options: options.map(t),
  answer,
  hint: t(hint),
  explanation: t(explanation),
  skill: id.split("-")[0],
});
const numbersSource =
  "OGM Video Ders Notu, Temel Kavramlar–Sayılar–Basit Eşitsizlikler–Mutlak Değer";
const original =
  "Anlatım, vektör model ve alıştırmalar özgündür; resmî sınav soruları değildir.";
export const mathLessons: Lesson[] = [
  {
    id: "temel-kavramlar",
    subjectId: "tyt-matematik",
    title: t("Temel kavramlar: sayı, değer ve tanım koşulu"),
    minutes: 20,
    tags: ["sayi-kumeleri", "islem-onceligi"],
    source: t(
      `${numbersSource}, PDF s.1–2; Aurelia Temel Kavramlar kopya kağıdı s.1–4. ${original}`,
    ),
    objectives: [
      t("Rakam ile sayıyı ve sayı kümelerini ayır."),
      t("İşlem önceliğini parantezin kapsamıyla uygula."),
      t("Sadeleştirmeden önce yasak değerleri belirle."),
    ],
    body: [
      {
        title: t("Önce sayının değerini bul"),
        text: t(
          "Rakamlar 0, 1, …, 9 sembolleridir; 24 iki rakamla yazılmış bir sayıdır. Bu anlatımda doğal sayılar 0 ile başlar. Tam sayılar negatifleri de içerir; her tam sayı paydası 1 olan kesir biçiminde rasyoneldir. Rasyonel sayı a/b biçiminde yazılır: a ve b tam sayı, b ≠ 0. Gerçek sayılar rasyonel ve irrasyonelleri birlikte kapsar. √49 = 7 olduğundan kök işareti görmek sayının irrasyonel olduğunu göstermez.",
        ),
      },
      {
        title: t("Birden çok kümeye ait olabilirsin"),
        text: t(
          "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ilişkisi, örneğin 3’ün dört kümeye de ait olduğunu söyler. Ters yön doğru değildir: 3/2 rasyoneldir ama tam sayı değildir. √5 irrasyoneldir ve gerçek sayıdır. Sıfır doğal, tam, rasyonel ve gerçektir. Bir sayının hangi biçimde yazıldığı ile gerçek değeri farklı karar adımlarıdır.",
        ),
      },
      {
        title: t("İşlemin sırasını ve kapsamını koru"),
        text: t(
          "Önce parantezin içi, sonra üs/kökün kapsadığı işlem yapılır. Çarpma ile bölme aynı önceliktedir ve soldan sağa yürütülür; toplama ile çıkarma da kendi aralarında soldan sağadır. 18 ÷ 3 × 2 = 6 × 2 = 12 olur. −4² = −16 iken (−4)² = 16’dır. Karekök sembolü negatif olmayan kökü belirtir; √(x²) = |x| olduğundan x negatifken doğrudan x yazılamaz.",
        ),
      },
      {
        title: t("Sadeleştirme tanım koşulunu silmez"),
        text: t(
          "(4x + 12)/(x + 3) için önce x ≠ −3 yazılır. Pay 4(x + 3) olduğundan, izinli değerlerde ortak çarpan sadeleşir ve sonuç 4 olur. x = −3 başlangıç ifadesini 0/0 yapar; sadeleştirilmiş 4 ifadesinden bu yasak değere izin çıkarılmaz. Toplamın içinden tek terim çizilmez: (x + 1)/x genel olarak 1 değildir. Koşulu başlangıçta yaz, sonucu asıl ifadede kontrol et.",
        ),
      },
    ],
    questions: [
      q(
        "bas-1",
        "√49 sayısı için doğru sınıflama hangisidir?",
        [
          "Yalnız irrasyoneldir.",
          "Doğal, tam, rasyonel ve gerçektir.",
          "Rasyoneldir ama tam sayı değildir.",
        ],
        1,
        "Kökü hesaplamadan kümeye karar verme.",
        "√49 = 7. Bu anlatımda 7; ℕ, ℤ, ℚ ve ℝ kümelerinin hepsindedir.",
      ),
      q(
        "bas-2",
        "a ve b farklı rakamlar, a ≠ 0. İki basamaklı 10a + b en çok kaç olabilir?",
        ["99", "89", "98"],
        2,
        "Onlar basamağını büyüt, sonra farklılık koşulunu koru.",
        "a = 9 seçilir. b farklı olduğundan en çok 8’dir; sayı 98 olur. 99 farklı rakam koşulunu bozar.",
      ),
      q(
        "bas-3",
        "15 ÷ 3 × 2 işleminin sonucu nedir?",
        ["10", "2,5", "5"],
        0,
        "Çarpma ve bölme aynı önceliktedir.",
        "Soldan sağa 15 ÷ 3 = 5, sonra 5 × 2 = 10. Çarpmayı önce yapıp 15 ÷ 6 yazılmaz.",
      ),
      q(
        "bas-4",
        "(3x + 6)/(x + 2) ifadesi hangi gerçek x değerlerinde 3’e eşittir?",
        ["Bütün gerçek sayılarda", "Yalnız x ≠ 2 iken", "x ≠ −2 iken"],
        2,
        "Paydanın sıfır yaptığı değeri önce çıkar.",
        "3x + 6 = 3(x + 2). x ≠ −2 iken ortak çarpan sadeleşir. x = −2 için başlangıç ifadesi tanımsızdır.",
      ),
      q(
        "bas-5",
        "x = −7 için √(x²) kaçtır?",
        ["−7", "7", "49"],
        1,
        "Karekök sonucu negatif olamaz.",
        "x² = 49 ve √49 = 7. Genel ilişki √(x²) = |x|’tir.",
      ),
    ],
  },
  {
    id: "tek-cift-isaret",
    subjectId: "tyt-matematik",
    title: t("Tek–çift ve işaret: iki ayrı özellik"),
    minutes: 18,
    tags: ["parite", "isaret"],
    source: t(
      `${numbersSource}, PDF s.4, 8; Aurelia Tek Çift Pozitif Negatif Sayılar kopya kağıdı s.1–2. ${original}`,
    ),
    objectives: [
      t("Negatif tam sayılarda tek–çift sınıflamasını uygula."),
      t("İşaret, sıfır ve üs koşullarını ayır."),
      t("Bölümün paritesinden önce tam sayı oluşunu denetle."),
    ],
    body: [
      {
        title: t("İşaret ile parite bağımsızdır"),
        text: t(
          "Çift tam sayı 2k, tek tam sayı 2k + 1 biçimindedir; k herhangi bir tam sayıdır. −6 = 2(−3) çift, −5 = 2(−3) + 1 tektir. Pozitiflik ve negatiflik ise sıfırın hangi tarafında bulunulduğuyla ilgilidir. 1/2 pozitiftir ama tam sayı olmadığı için tek veya çift değildir. Sıfır çifttir; ne pozitif ne negatiftir.",
        ),
      },
      {
        title: t("İkişerli eşleştir, sonra genelle"),
        text: t(
          "Çift + çift çifttir; tek + tek çifttir; tek + çift tektir. Çarpımda en az bir çift tam sayı varsa sonuç çifttir; iki tek tam sayının çarpımı tektir. Gerekçe örnekten büyüktür: (2a + 1) + (2b + 1) = 2(a + b + 1) her tam sayı a, b için 2’nin katıdır. Modeldeki noktalar sayının mutlak değeri kadar birimi gösterir; eksi işareti ayrı izlenir.",
        ),
      },
      {
        title: t("Önce sıfır, sonra negatif çarpanlar"),
        text: t(
          "Çarpımda bir sıfır varsa sonuç sıfırdır. Sıfır yoksa negatif çarpan sayısı tek olduğunda çarpım negatif, çift olduğunda pozitiftir. Pozitif tam üs, tek/çift tabanın paritesini korur; fakat sıfırıncı üs bu genellemeye dahil değildir: 2⁰ = 1 tektir. −3² = −9, (−3)² = 9; parantez tabanın parçasını değiştirir.",
        ),
      },
      {
        title: t("Bölmede tek bir tabloya güvenme"),
        text: t(
          "Önce bölen sıfırdan farklı mı, sonra bölüm tam sayı mı diye bakılır. Çift/çift; 10/2 = 5 ile tek, 12/2 = 6 ile çift, 2/4 = 1/2 ile tam olmayan sonuç verebilir. Tek/çift bölüm tam sayı olamaz. Tek/tek ve çift/tek için bölüm tam sayıysa sırasıyla tek ve çift olur. İşaret denetimi ayrıdır: −1/2 negatiftir ama paritesi yoktur.",
        ),
      },
    ],
    questions: [
      q(
        "par-1",
        "−8’in işareti ve tek–çift özelliği nedir?",
        ["Negatif ve çift", "Pozitif ve çift", "Negatif ve tek"],
        0,
        "−8’i 2k biçiminde yaz.",
        "−8 = 2(−4) çifttir ve sıfırdan küçük olduğu için negatiftir.",
      ),
      q(
        "par-2",
        "−3² ve (−3)² sırasıyla kaçtır?",
        ["9 ve 9", "−9 ve 9", "−9 ve −9"],
        1,
        "Üs hangi tabanı kapsıyor?",
        "−3² = −(3²) = −9. (−3)² = (−3)(−3) = 9.",
      ),
      q(
        "par-3",
        "İki çift tam sayının bölümü için, bölen sıfır değilken hangisi doğrudur?",
        [
          "Daima tektir.",
          "Daima çifttir.",
          "Tek, çift veya tam sayı olmayan sonuç verebilir.",
        ],
        2,
        "6/2, 8/2 ve 2/4’ü karşılaştır.",
        "Çift/çift tek bir parite belirlemez: 3, 4 ve 1/2 sonuçları mümkündür.",
      ),
      q(
        "par-4",
        "(−2) × (−3) × 0 çarpımı nasıldır?",
        ["Negatif", "Pozitif", "Sıfır"],
        2,
        "İşaret saymadan önce sıfır çarpanı ara.",
        "Çarpanlardan biri sıfır olduğu için sonuç 0’dır; pozitif veya negatif değildir.",
      ),
      q(
        "par-5",
        "Sıfır için doğru ifade hangisidir?",
        [
          "Tektir ve negatif değildir.",
          "Çifttir; ne pozitif ne negatiftir.",
          "Pozitif çift sayıdır.",
        ],
        1,
        "0 = 2 × 0 eşitliğini ve pozitiflik tanımını kullan.",
        "Sıfır 2’nin tam katıdır. Pozitiflik x > 0, negatiflik x < 0 gerektirir; sıfır ikisini de sağlamaz.",
      ),
    ],
  },
  {
    id: "ardisik-sayilar",
    subjectId: "tyt-matematik",
    title: t("Ardışık sayılar: adım, terim ve toplam"),
    minutes: 20,
    tags: ["ardisik", "gauss"],
    source: t(
      `${numbersSource}, PDF s.5, 10; Aurelia Ardışık Sayılar kopya kağıdı s.1–2. ${original}`,
    ),
    objectives: [
      t("Adım sayısı ile terim sayısını ayır."),
      t("Eşit aralıklı toplamı eşleme ile gerekçelendir."),
      t("Ortalamanın her zaman listede bir terim olmadığını göster."),
    ],
    body: [
      {
        title: t("Aynı bilinmeyen, doğru artış"),
        text: t(
          "Ardışık tam sayılar a, a + 1, a + 2 biçiminde; ardışık tek veya çift sayılar a, a + 2, a + 4 biçiminde yazılır. İkinci durumda a’nın tekliği veya çiftliği belirtilir. −5, −3, −1, 1 de ardışık tek sayılardır. Genel eşit aralıklı dizi a, a + d, a + 2d, … biçimindedir. d = 3 olması, diziyi ardışık tam sayı yapmaz.",
        ),
      },
      {
        title: t("İki uç arasında bir eksik adım vardır"),
        text: t(
          "n terimli listede ilk terimden son terime n − 1 adımla gidilir: b = a + (n − 1)d. İki uç dahil ve d > 0 için n = (b − a)/d + 1. Örneğin 3, 7, …, 23 listesinde (23 − 3)/4 = 5 aralık, fakat 6 terim vardır. Bölüm tam sayı değilse seçilen son değer o adımlı listenin terimi değildir.",
        ),
      },
      {
        title: t("Formülü iki toplamı eşleyerek çıkar"),
        text: t(
          "S toplamını bir kez ileri, bir kez geri sırayla yaz. Aynı sütundaki her çift a + b eder. n sütun olduğundan 2S = n(a + b), dolayısıyla S = n(a + b)/2. 3 + 7 + … + 23 = 6 × (3 + 23)/2 = 78. Bu yöntem negatif terimlerde de çalışır; gerekli koşul eşit aralıktır. Herhangi farklı sayılara otomatik uygulanmaz.",
        ),
      },
      {
        title: t("Merkez bazen bir terim değildir"),
        text: t(
          "Ortalama (a + b)/2’dir. Tek sayıda eşit aralıklı terimde orta terime eşittir; çift sayıda terimde ortadaki iki sayının ortalamasıdır. 3, 4, 5, 6 için ortalama 4,5’tir ve listede yoktur. Üç ardışık çift sayının toplamı 54 ise ortanca 18, sayılar 16, 18, 20 olur. Önce ortancayı bulmak bilinmeyen sayısını azaltır.",
        ),
      },
    ],
    questions: [
      q(
        "seq-1",
        "−5, −3, −1, 1 biçiminde başlayan ardışık tek sayı listesinin sonraki terimi nedir?",
        ["2", "3", "5"],
        1,
        "Her adım 2 artıyor.",
        "1’den sonra 2 eklenir ve 3 gelir. Negatif başlangıç, tek sayılardaki 2 artışını değiştirmez.",
      ),
      q(
        "seq-2",
        "4, 7, 10, …, 28 listesinde kaç terim vardır?",
        ["8", "10", "9"],
        2,
        "İki uç da dahil; aralık sayısına 1 ekle.",
        "n = (28 − 4)/3 + 1 = 8 + 1 = 9. Sekiz, terim değil adım sayısıdır.",
      ),
      q(
        "seq-3",
        "6 + 10 + 14 + … + 30 toplamı kaçtır?",
        ["126", "108", "144"],
        0,
        "Önce terim sayısını, sonra ilk-son çiftini bul.",
        "n = (30 − 6)/4 + 1 = 7. S = 7(6 + 30)/2 = 126.",
      ),
      q(
        "seq-4",
        "Ardışık üç çift tam sayının toplamı 42. En küçüğü kaçtır?",
        ["14", "10", "12"],
        2,
        "Ortanca sayıyı x alıp x − 2, x, x + 2 yaz.",
        "3x = 42 olduğundan ortanca 14’tür. Sayılar 12, 14, 16; en küçük 12.",
      ),
      q(
        "seq-5",
        "3, 4, 5, 6 listesinin ortalaması için hangisi doğrudur?",
        [
          "4’tür ve listededir.",
          "4,5’tir ve listede bir terim değildir.",
          "5’tir; çift terim sayısında ortalama olmaz.",
        ],
        1,
        "Toplamı dört terime böl veya iki uç ortalamasını al.",
        "(3 + 6)/2 = 4,5. Ortalama tanımlıdır; listede yer almak zorunda değildir.",
      ),
    ],
  },
  {
    id: "asal-sayilar",
    subjectId: "tyt-matematik",
    title: t("Asal sayılar: bölen, kanıt ve çarpan"),
    minutes: 20,
    tags: ["asal", "bolen"],
    source: t(
      `Aurelia Asal Sayılar kopya kağıdı, s.1–2. Tanım, karekök sınırı ve çarpan ayrımıyla karşılaştırıldı. ${original}`,
    ),
    objectives: [
      t("Asal, bileşik ve 1 durumunu ayırt et."),
      t("Karekök sınırına kadar denemenin neden yeterli olduğunu açıkla."),
      t("Asal çarpan türü ile tekrarlı çarpan sayısını ayır."),
    ],
    body: [
      {
        title: t("İki farklı pozitif bölen"),
        text: t(
          "Asal sayı, 1’den büyük ve tam iki farklı pozitif böleni bulunan tam sayıdır: 1 ve kendisi. 1’in bir pozitif böleni vardır; asal veya bileşik değildir. 0 ve negatif tam sayılar bu tanıma girmez. En küçük asal 2, tek çift asal da 2’dir. Tek olmak asallık kanıtı değildir: 9, 15 ve 21 bileşiktir.",
        ),
      },
      {
        title: t("Bir bölen yeter; asal demek daha çok denetim ister"),
        text: t(
          "n bileşikse n = a × b, a ve b > 1 yazılabilir. İki çarpan da √n’den büyük olamaz; olsaydı çarpımları n’yi aşardı. Bu yüzden karesi n’yi aşmayan asal adaylarını denemek yeterlidir. Eşitlik dahildir: 49 için 7 mutlaka denenir. 47’de 2, 3, 5 elenir; 7² > 47 olduğundan daha büyük asal aday gerekmez. 49’da 7 × 7 bulunması tek başına bileşikliği kanıtlar.",
        ),
      },
      {
        title: t("Çarpan türü ile kopyasını karıştırma"),
        text: t(
          "84 = 2 × 2 × 3 × 7 = 2² × 3 × 7. Farklı asal bölenler 2, 3, 7 olduğundan üç tür vardır; tekrarlı asal çarpan adedi 2 + 1 + 1 = 4’tür. Bütün pozitif bölenlerin sayısı bunlardan farklı bir konudur. 1 asal olmadığı için çarpan listesine eklenmez. Asallık ile aralarında asal olma da farklıdır: 8 ve 9 bileşik olmalarına rağmen ortak pozitif bölenleri yalnız 1’dir.",
        ),
      },
      {
        title: t("Toplamda çift asalın özel rolü"),
        text: t(
          "İki asal sayının toplamı tekse biri çift, diğeri tektir. Tek çift asal 2 olduğundan sayılardan biri 2 olmak zorundadır. Örneğin toplam 25 ise diğer sayı 23 olur. Toplam çift olduğunda 2 zorunlu değildir: 5 + 13 = 18. Pozitif tam sayılarda bir çarpım asal çıkarsa çarpanlardan biri 1, diğeri o asaldır; bu sonuç koşulsuz bütün gerçek çarpanlara taşınmaz.",
        ),
      },
    ],
    questions: [
      q(
        "pri-1",
        "1 sayısı nasıl sınıflandırılır?",
        ["Asaldır.", "Ne asal ne bileşiktir.", "Bileşiktir."],
        1,
        "Asal tanımındaki 1’den büyük ve iki farklı bölen koşullarını denetle.",
        "1’in yalnız bir pozitif böleni vardır. Asal ve bileşik tanımları 1’den büyük tam sayılar içindir.",
      ),
      q(
        "pri-2",
        "Tek çift asal sayı hangisidir?",
        ["2", "1", "4"],
        0,
        "2’den büyük her çift sayının bir ek böleni vardır.",
        "2’nin bölenleri 1 ve 2’dir. Çift n > 2 için 2, kendisi ve 1 dışında bir bölen olur.",
      ),
      q(
        "pri-3",
        "49’u asallık için incelerken hangi asal aday mutlaka dahil edilmelidir?",
        ["11", "13", "7"],
        2,
        "Sınır p² ≤ n; eşitliği atlama.",
        "7² = 49 olduğundan 7 denenir. 49 = 7 × 7, bu nedenle bileşiktir.",
      ),
      q(
        "pri-4",
        "84 = 2² × 3 × 7. Farklı asal bölen türü sayısı kaçtır?",
        ["4", "3", "2"],
        1,
        "Üsleri toplamak tür sayısını vermez.",
        "Farklı asal bölenler 2, 3, 7: üç tür. Tekrarlı asal çarpan adedi ise dörttür.",
      ),
      q(
        "pri-5",
        "İki asal sayının toplamı 21. Çarpımları kaçtır?",
        ["40", "42", "38"],
        2,
        "Tek toplam için asal sayılardan biri çift olmalı.",
        "Çift asal yalnız 2’dir; diğer asal 19. Çarpım 2 × 19 = 38.",
      ),
    ],
  },
  {
    id: "faktoriyel",
    subjectId: "tyt-matematik",
    title: t("Faktöriyel: azalan seçimler ve ortak çarpım"),
    minutes: 20,
    tags: ["faktoriyel", "sayma"],
    source: t(
      `OGM Video Ders Notu, Permütasyon–Kombinasyon–Binom, PDF s.1, 5–6; Aurelia Faktöriyel Kavramı kopya kağıdı s.1–4. ${original}`,
    ),
    objectives: [
      t("0! ve 1! eşitliğini tanım koşuluyla kullan."),
      t("Oran ve toplamda doğru ortak çarpanı ayır."),
      t("Doğrusal sıralama ile sondaki sıfır sayımının koşullarını açıkla."),
    ],
    body: [
      {
        title: t("Ünlem bir toplama değil çarpma kuralıdır"),
        text: t(
          "Pozitif tam sayı n için n! = 1 × 2 × … × n. Ayrıca 0! = 1 tanımlanır. Bu konu kapsamında faktöriyel yalnız negatif olmayan tam sayılarda kullanılır; (−1)! veya (2,5)! kullanılmaz. n! = 1 eşitliği n = 0 ve n = 1 için doğrudur; eşit faktöriyellerden koşulsuz eşit iç değer çıkarılamaz.",
        ),
      },
      {
        title: t("Seçenekler her yerleştirmede azalır"),
        text: t(
          "n farklı kitabın tamamını n numaralı rafa birer kez yerleştireceksen ilk raf için n, sonra n − 1, …, son raf için 1 seçenek vardır. Toplam n! düzen elde edilir. Üç farklı kitap için 3 × 2 × 1 = 6. Aynı kitaplardan birden fazla varsa, raflar daireselse veya bir kitabın yeri yasaksa doğrudan n! kullanılmaz. Etkinlikte kurduğun tek düzen, bütün düzenlerin listesi değildir.",
        ),
      },
      {
        title: t("Ortak çarpana kadar aç"),
        text: t(
          "9!/7! = (9 × 8 × 7!)/7! = 72; büyük faktöriyelleri hesaplamak gerekmez. Toplamda önce ortak çarpan yazılır: (7! + 6!)/6! = 6!(7 + 1)/6! = 8. n!/m!, (n − m)! demek değildir. Paydadaki faktöriyel pozitiftir, fakat (x − 2)! gibi bir ifadede x − 2’nin negatif olmayan tam sayı oluşu ayrıca korunmalıdır.",
        ),
      },
      {
        title: t("Sondaki sıfır, 2 ile 5 eşleşmesidir"),
        text: t(
          "Her son sıfır bir 10 = 2 × 5 çarpanı ister. n! içinde 2’ler en az 5’ler kadar bulunduğundan 5 çarpanlarını saymak yeterlidir: ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + … . ⌊ ⌋ pozitif bölümün tam kısmıdır. 35! için 7 + 1 = 8; 25, iki tane 5 verdiği için bir ek kopya sayılır. Bu kural bir faktöriyel toplamına veya bölümüne otomatik taşınmaz; önce yeni sayının çarpanları değerlendirilir.",
        ),
      },
    ],
    questions: [
      q(
        "fac-1",
        "Üç farklı kitap, üç numaralı rafa birer kez ve ek kısıt olmadan kaç farklı düzende yerleşir?",
        ["3", "6", "9"],
        1,
        "Her yerleştirmede bir seçenek eksilir.",
        "3 × 2 × 1 = 3! = 6. Farklı kitaplar ve numaralı raflar sıralamayı belirler.",
      ),
      q(
        "fac-2",
        "9!/7! kaçtır?",
        ["2!", "9/7", "72"],
        2,
        "9!’u ortak 7!’e kadar aç.",
        "9! = 9 × 8 × 7!. Ortak 7! sadeleşince 9 × 8 = 72 kalır.",
      ),
      q(
        "fac-3",
        "(7! + 6!)/6! kaçtır?",
        ["8", "7", "13"],
        0,
        "Paydaki iki terimi de 6! cinsinden yaz.",
        "7! + 6! = 6!(7 + 1). 6!’e bölünce 8 olur. Toplamın tek terimini çizmek geçersizdir.",
      ),
      q(
        "fac-4",
        "n negatif olmayan tam sayı. n! = 1 hangi n değerlerinde sağlanır?",
        ["Yalnız 1", "Yalnız 0", "0 ve 1"],
        2,
        "Sıfır faktöriyel tanımını unutma.",
        "0! = 1 ve 1! = 1. n ≥ 2 için çarpım en az 2’dir.",
      ),
      q(
        "fac-5",
        "35! sayısının sonunda kaç sıfır vardır?",
        ["7", "8", "9"],
        1,
        "25’in sağladığı ikinci 5 çarpanını da say.",
        "⌊35/5⌋ + ⌊35/25⌋ = 7 + 1 = 8. 125 > 35 olduğundan sonraki katkılar sıfırdır.",
      ),
    ],
  },
];
