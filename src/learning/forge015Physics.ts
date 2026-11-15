import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const packs = [
  {
    id: "vektorler",
    topic: "detail-358",
    title: "Vektörler: yönü koru, bileşenlerle düşün",
    minutes: 75,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 9–15; OGM 11. sınıf Vektörler sunusu ve Vektörler Özeti ile karşılaştırılmış özgün öğretim. Sayısal örnekler ve sorular özgündür; resmî ÖSYM sorusu değildir.",
    objectives: [
      "Büyüklük, yön ve doğrultuyu; skaler ve vektörel sınıflamayı ayır.",
      "Vektörleri bileşenlerle topla, çıkar ve gerçek sayıyla çarp.",
      "Sıfır bileşke, dengeleyici ve üç boyutlu normu koşullarıyla yorumla.",
    ],
    sections: [
      {
        title: "Bir sayı hangi bilgiyi taşımaz?",
        paragraphs: [
          "Kütle, süre, enerji ve sıcaklık skaler niceliklerdir; sayı ve birimle belirtilirler. Yer değiştirme, hız ve kuvvet için yön bilgisi de gerekir. 5 N doğuya kuvvet ile 5 N batıya kuvvet aynı büyüklükte olsa da aynı vektör değildir. Temel–türetilmiş ayrımı farklı bir sınıflamadır: kuvvet hem türetilmiş hem vektöreldir.",
          "Doğrultu iki yönü kapsayan hattır; doğu–batı aynı doğrultu, doğu ve batı zıt yönlerdir. Negatif sıcaklık görmek onu vektör yapmaz. Bir eksende eksi hız, seçilen pozitif yönün tersini gösterir; hızın büyüklüğü negatif olmaz. Önce niceliği, sonra birimini ve referans yönünü yaz.",
        ],
      },
      {
        title: "Oku taşı, etkisini düşün",
        paragraphs: [
          "Yönlendirilmiş doğru parçasında okun uzunluğu büyüklüğü, ucu yönü gösterir. Serbest vektör cebirinde aynı yön ve uzunluktaki oklar farklı başlangıç noktalarında da eşittir. Vektörü paralel kaydırarak uç uca ekleyebilirsin; fakat kaydırırken döndürmek veya uzatmak eşitliği bozar.",
          "Bir kuvvetin fiziksel uygulama noktası ayrıca önem taşıyabilir. Rijit cisimde kuvveti keyfî başka yere taşımak torku değiştirebilir. Bu ünitenin bileşen cebiri serbest vektörleri veya noktasal cisme etki eden kuvvetleri karşılaştırır; her çizim ötelemesinin gerçek cisimde aynı dönme etkisini yarattığı iddia edilmez.",
        ],
      },
      {
        title: "Bileşen işaretini bölgeden bul",
        paragraphs: [
          "A=(Ax,Ay) yazımı, x ve y doğrultularındaki işaretli bileşenleri verir. +x doğu ve +y kuzey seçilirse A=(−3,4) batıya 3, kuzeye 4 birim içerir. Dik bileşenler için |A|=√(Ax²+Ay²) olur; bu örnekte büyüklük 5 birimdir. Bileşenlerin mutlak toplamı 7, vektörün normu değildir.",
          "Açı +x ekseninden saat yönünün tersine ölçülüyorsa Ax=|A| cosθ, Ay=|A| sinθ kullanılır. Açıyı +y’den ölçmek sinüs ve kosinüs rollerini değiştirir. Yönü bulurken yalnız Ay/Ax oranına bakmak bölgeyi kaybettirebilir; iki bileşenin işareti birlikte denetlenmelidir. Sıfır vektörün belirli yön açısı yoktur.",
        ],
      },
      {
        title: "Toplamı uçlarla ve sayılarla kur",
        paragraphs: [
          "A+B için B’nin başlangıcını yönünü koruyarak A’nın ucuna taşı. İlk başlangıçtan son uca çizilen ok bileşkedir. Aynı sonuç, ortak başlangıçlı iki okun oluşturduğu paralelkenarın köşegeniyle bulunur. Bileşen yöntemi R=(Ax+Bx,Ay+By) verir; grafik ve tablo aynı ucu göstermelidir.",
          "Toplamda sıra değişirse ara çizim değişebilir ama son uç değişmez: A+B=B+A. Üç veya daha fazla vektörde de her eksendeki işaretli bileşenler toplanır. Uç uca ekleme kapalı bir çokgen oluşturursa bileşke sıfırdır; bu durum her okun ayrı ayrı sıfır olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Çıkarma, ters vektörü eklemektir",
        paragraphs: [
          "−B, B ile eşit büyüklükte ve zıt yönlüdür. A−B=A+(−B) olduğundan B’nin her bileşeninin işareti değişir. Ortak başlangıçlı çizimde B’nin ucundan A’nın ucuna giden ok A−B’dir. Başlangıç sırasını ters çevirmek B−A’yı verir; norm aynı kalırken yön ters döner.",
          "A=(2,−3), B=(−1,4) ise A−B=(3,−7) olur. Bileşenlerdeki çıkarma işaretini yalnız ilk koordinata uygulama. Fark vektörünün büyüklüğü genel olarak |A|−|B| değildir; aynı doğrultu gibi ek koşullar olmadan bu kısa yol kullanılamaz. Bağıl hız hesabında da tam bu vektörel fark gerekir.",
        ],
      },
      {
        title: "Çarpan negatif veya sıfır olduğunda",
        paragraphs: [
          "cA=(cAx,cAy) ve |cA|=|c||A| olur. Pozitif c yönü korur; negatif c, sıfır olmayan vektörün yönünü tersine çevirir. Örneğin A=(−2,5) ve c=−2 için sonuç (4,−10)’dur. Büyüklük iki katına çıkar; yön değişimini yalnız büyüklük satırına bakarak göremezsin.",
          "c=0 ise sonuç sıfır vektördür ve yönü tanımsızdır. c=1 aynı, c=−1 ters vektörü verir. c’ye bölmek ancak c≠0 için tanımlıdır. Bu gerçek sayıyla çarpma işlemi, iki vektörün skaler veya vektörel çarpımı değildir; bu ünitede o farklı işlemler yerine bileşen ölçeklemesi yapılır.",
        ],
      },
      {
        title: "Açı, bileşkenin mümkün aralığını belirler",
        paragraphs: [
          "Büyüklükleri a,b ve aralarındaki açı α olan iki vektörde R²=a²+b²+2 ab cosα’dır. Açı ortak başlangıçtaki iki ok arasında ölçülür. 0° aynı yönde a+b, 180° zıt yönde |a−b| verir. Böylece |a−b|≤R≤a+b; normu bu aralığın dışında bulmak işlem veya açı hatasıdır.",
          "İki sıfır olmayan vektör arasındaki açı 0° ile 180° arasında ve büyüklükler farklıysa bileşke yönü büyük vektörle daha küçük açı yapar. Eş büyüklük F için 60°’de F√3, 90°’de F√2, 120°’de F elde edilir. Bileşke sıfır değilse eş büyüklüklerin açıortayındadır; eşit zıt vektörlerde sıfırın açıortayı diye bir yön atanmaz. Üç vektörün en küçük bileşkesi, en büyük norm diğer ikisinin toplamını aşmıyorsa sıfır olabilir; iki vektör kuralını üçüne doğrudan kopyalama.",
        ],
      },
      {
        title: "Dengeleyici ve üçüncü eksen",
        paragraphs: [
          "Noktasal cisme etki eden F₁ ve F₂ toplamı R ise dengeleyici −R’dir. Örneğin (6,0) N ile (0,8) N kuvvetlerini (−6,−8) N dengeler. Net kuvvet sıfır, Newton modelinde ivmenin sıfır olduğunu söyler; başlangıç hızı bilinmeden cismin durduğunu söylemez. Rijit cisim dönme dengesi için tork da incelenmelidir.",
          "Üç boyutta A=(Ax,Ay,Az) için aynı eksenler toplanır ve |A|=√(Ax²+Ay²+Az²) olur. (2,−1,2) normu 3 birimdir; z’yi atıp iki boyutlu norm hesaplamak farklı bir soruyu çözer. Atölyenin düzlem çizimi x-y bileşenlerini gösterir; üç boyutlu örnek ayrıca tanımlanır. Her sonuçta birim, işaret ve geometrik sınır denetimi yap.",
        ],
      },
    ],
    examples: [
      {
        title: "Toplam ve fark aynı ok değildir",
        prompt: "A=(3,4), B=(−1,2). A+B ve A−B’nin normları?",
        strategy: "Önce işaretli bileşenleri bul.",
        steps: [
          {
            label: "Toplam",
            explanation: "Aynı eksenleri topla.",
            expression: "R=(2,6)",
          },
          {
            label: "Fark",
            explanation: "B’nin iki işaretini ters çevir.",
            expression: "D=(4,2)",
          },
          {
            label: "Norm",
            explanation: "Her sonuca ayrı Pisagor uygula.",
            expression: "|R|=2√10; |D|=2√5",
          },
        ],
        answer: "A+B=(2,6), norm 2√10; A−B=(4,2), norm 2√5.",
        check: "Toplamın x bileşeni pozitif, farkın y bileşeni 2’dir.",
        pitfall: "Normları doğrudan toplamak veya çıkarmak.",
      },
      {
        title: "120 derecenin etkisi",
        prompt:
          "Aralarında 120° bulunan iki 10 N kuvvetin bileşke normu? cos 120°=−1/2.",
        strategy: "Ortak başlangıç açısını kullan.",
        steps: [
          {
            label: "Kareler",
            explanation: "İki norm karesi bulunur.",
            expression: "100+100=200",
          },
          {
            label: "Açı katkısı",
            explanation: "Kosinüs terimi negatiftir.",
            expression: "2·10·10·(−1/2)=−100",
          },
          {
            label: "Kök",
            explanation: "Toplam karesinden normu bul.",
            expression: "R=√100=10 N",
          },
        ],
        answer: "10 N; sıfır olmayan bileşke açıortay yönündedir.",
        check: "Sonuç 0 ile 20 N arasındadır.",
        pitfall:
          "120° yerine üçgenin tamamlayıcı açısını aynı işaretle kullanmak.",
      },
      {
        title: "Negatif ölçek",
        prompt: "C=(−2,5), c=−2. Sonuç ve norm?",
        strategy: "Çarpanı iki bileşene dağıt.",
        steps: [
          {
            label: "Bileşen",
            explanation: "İki eksi x’i pozitif yapar.",
            expression: "cC=(4,−10)",
          },
          {
            label: "Norm",
            explanation: "İşaretler normda karelenir.",
            expression: "√(16+100)=2√29",
          },
          {
            label: "Yön",
            explanation: "c<0 yönü tersine çevirir.",
            expression: "|cC|=2|C|",
          },
        ],
        answer: "(4,−10), norm 2√29.",
        check: "C ikinci, yeni ok dördüncü bölgededir.",
        pitfall: "Negatif çarpanın normu da negatif yaptığını sanmak.",
      },
      {
        title: "Dengeleyici kuvvet",
        prompt:
          "F₁=(6,0) N ve F₂=(0,8) N noktasal cisme etki ediyor. Net kuvveti sıfırlayan üçüncü kuvvet?",
        strategy: "Toplamın tersini seç.",
        steps: [
          {
            label: "Toplam",
            explanation: "İki ekseni birleştir.",
            expression: "R=(6,8) N",
          },
          {
            label: "Ters",
            explanation: "Her bileşeni sıfıra tamamla.",
            expression: "F₃=(−6,−8) N",
          },
          {
            label: "Kontrol",
            explanation: "Normu ve toplamı denetle.",
            expression: "|F₃|=10 N; R+F₃=(0,0)",
          },
        ],
        answer: "(−6,−8) N; büyüklüğü 10 N.",
        check: "İvme sıfırdır; bu tek başına durgunluk kanıtı değildir.",
        pitfall: "Dengeleyiciyi bileşkeyle aynı yöne çizmek.",
      },
    ],
    recall: [
      {
        prompt: "Yön ve doğrultu nasıl ayrılır?",
        answer: "Doğu–batı bir doğrultu, doğu ve batı bu hattın iki yönüdür.",
      },
      {
        prompt: "A−B oku ortak başlangıçta nereye gider?",
        answer: "B’nin ucundan A’nın ucuna; ters sıra B−A’yı verir.",
      },
      {
        prompt: "0 A’nın yönü nedir?",
        answer: "Sıfır vektörün belirli yön açısı yoktur.",
      },
      {
        prompt: "Net kuvvet sıfırsa cisim durur mu?",
        answer:
          "Zorunlu değil; noktasal Newton modelinde ivme sıfırdır, başlangıç hızı korunabilir.",
      },
    ],
    questions: [
      {
        prompt: "A=(3,4) vektörünün Öklid normu kaç birimdir?",
        correct: "5",
        distractors: ["7", "1", "25", "√7"],
        hint: "Dik bileşenlerin karelerini topla.",
        explanation: "|A|=√(3²+4²)=5; bileşenlerin toplamı norm değildir.",
      },
      {
        prompt: "A=(3,4), B=(−1,2) aynı birimdedir. A+B hangisidir?",
        correct: "(2,6)",
        distractors: ["(4,2)", "(2,2)", "(−2,6)", "(4,6)"],
        hint: "Aynı konumdaki bileşenleri topla.",
        explanation: "x=3−1=2, y=4+2=6; sonuç (2,6).",
      },
      {
        prompt: "A=(2,−3), B=(−1,4). A−B hangisidir?",
        correct: "(3,−7)",
        distractors: ["(1,1)", "(−3,7)", "(3,1)", "(1,−7)"],
        hint: "B’nin her bileşenini çıkar.",
        explanation: "2−(−1)=3 ve −3−4=−7; B−A ise bunun tersidir.",
      },
      {
        prompt: "C=(−2,5) ve c=−2. cC hangisidir?",
        correct: "(4,−10)",
        distractors: ["(−4,10)", "(4,10)", "(−4,−10)", "(0,3)"],
        hint: "Çarpanı iki bileşene de uygula.",
        explanation:
          "(−2)(−2)=4 ve (−2)5=−10; negatif çarpan yönü ters çevirir.",
      },
      {
        prompt:
          "Sıfır olmayan A vektörü 0 ile çarpılıyor. Sonucun normu ve yönü için doğru ifade?",
        correct: "Norm 0; yön tanımsız",
        distractors: [
          "Norm 0; yön kesin doğu",
          "Norm 1; yön aynı",
          "Norm negatif; yön ters",
          "Norm |A|; yön ters",
        ],
        hint: "Sıfır sonuçta bir ok ucu seçilemez.",
        explanation:
          "0 A sıfır vektördür. Norm 0 olur; bir yön açısı belirlenmez.",
      },
      {
        prompt:
          "Aralarında 120° bulunan iki 6 N kuvvetin bileşke normu? cos 120°=−1/2.",
        correct: "6 N",
        distractors: ["12 N", "0 N", "6√2 N", "6√3 N"],
        hint: "R²=a²+b²+2 ab cosα.",
        explanation:
          "R²=36+36−36=36, R=6 N; verilen ortak başlangıç açısı kullanılır.",
      },
      {
        prompt:
          "Normları 7 ve 3 birim olan iki serbest vektörün arasındaki açı değişebiliyor. Bileşke normunun en küçük ve en büyük değerleri?",
        correct: "4 ve 10",
        distractors: ["0 ve 10", "4 ve 21", "3 ve 7", "10 ve 21"],
        hint: "Zıt ve aynı yön uç durumlarını düşün.",
        explanation:
          "Minimum |7−3|=4, maksimum 7+3=10; aradaki açılar bu aralıkta normlar verir.",
      },
      {
        prompt: "A=(4,0), B=(0,3), C=(−4,−3). A+B+C normu?",
        correct: "0",
        distractors: ["3", "4", "5", "7"],
        hint: "Her ekseni ayrı topla.",
        explanation:
          "x=4+0−4=0, y=0+3−3=0; kapalı uç uca yol sıfır bileşke verir.",
      },
      {
        prompt:
          "Noktasal cisme uygulanan kuvvetlerin bileşkesi (6,−8) N. Neti sıfırlayan dengeleyici hangisidir?",
        correct: "(−6,8) N",
        distractors: ["(6,−8) N", "(−6,−8) N", "(6,8) N", "(8,−6) N"],
        hint: "Bileşkenin her bileşenini sıfıra tamamla.",
        explanation:
          "Dengeleyici −R=(−6,8) N’dir. Bu net kuvveti sıfırlar; cismin başlangıç hızı hakkında bilgi vermez.",
      },
      {
        prompt: "Üç boyutlu A=(2,−1,2) vektörünün normu kaç birimdir?",
        correct: "3",
        distractors: ["5", "√5", "9", "1"],
        hint: "Üç bileşenin de karesini kullan.",
        explanation: "|A|=√(4+1+4)=3; üçüncü bileşen atılamaz.",
      },
    ],
  },
  {
    id: "bagil-hareket",
    topic: "detail-359",
    title: "Bağıl hareket: kimin gözünden baktığını seç",
    minutes: 75,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 16–20; OGM Vektörler–Bağıl Hız sunusunun bağıl hız örnekleriyle karşılaştırılmış özgün öğretim. Klasik sabit hızlı referans modeli; sorular özgündür.",
    objectives: [
      "Gözlenen ve gözlemcinin hızlarını aynı referansta çıkar.",
      "İki boyutta bağıl konum, hız ve karşılaşmayı ayrı hesapla.",
      "Ortak hız eklenmesi, referans değişimi ve yaklaşma kavramlarının sınırlarını denetle.",
    ],
    sections: [
      {
        title: "Hareketin referansını söyle",
        paragraphs: [
          "Otobüste oturan kişi otobüse göre durgun, yol kenarına göre hareketli olabilir. İki yargı aynı referans için söylenmediğinden çelişmez. Bir hızın yanına kime göre ölçüldüğünü yaz: vA/yer ile vA/B farklı niceliklerdir. Gözlemciyi değiştirmek cisme yeni bir kuvvet uygulamaz.",
          "Bu ders aynı yönlenmiş eksenler ve ortak zaman kullanan düşük hızlı klasik modeli ele alır. Işık hızına yakın özel görelilik hesabı değildir. Çizimde Dünya ve hareketli gözlemci aynı fiziksel anı gösterir; ekranda gözlemciyi sabit tutmak onun Dünya’ya göre sıfır hıza sahip olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Gözlenen eksi gözlemci",
        paragraphs: [
          "A’nın B’ye göre hızı vA/B=vA/yer−vB/yer’dir. Önce iki hızın da aynı referansta olduğundan emin ol, sonra işaretli bileşenlerini çıkar. A doğuya 20 m/s, B doğuya 12 m/s gidiyorsa A/B doğuya 8 m/s olur; büyüklükleri koşulsuz toplama.",
          "İzleme sırası ters çevrilince vB/A=−vA/B olur. İki gözlemcinin birbirlerine atadığı sürat eşit, hız yönleri zıttır. Fark sıfırsa birbirlerine göre durgundurlar; yere göre ikisi de hareketli olabilir. İşlemde eksi işareti gözlemcinin hız vektörüne uygulanır, yalnız süratine değil.",
        ],
      },
      {
        title: "Aynı ve zıt yönü işaretle",
        paragraphs: [
          "Doğuyu pozitif seçelim. A=+15 m/s, B=−5 m/s ise A/B=15−(−5)=+20 m/s olur. Zıt yönde hareket ettikleri için bu örnekte süratler toplanmıştır. A=+15, B=+5 olsaydı fark +10 m/s olurdu; yön verilmeden iki sürat sayısı tek bir bağıl hız belirlemez.",
          "Başlangıçta kimin önde olduğu hızdan ayrı bilgidir. Daha hızlı araç öndeyse aradaki uzaklık artabilir; gerideyse azalabilir. Hızın büyüklüğünden tek başına yaklaşma veya karşılaşma sonucu çıkarma. Önce konum çizgisine iki aracı yerleştir, sonra her birinin işaretli hareketini uygula.",
        ],
      },
      {
        title: "Taşıt içindeki hareketi zincirle",
        paragraphs: [
          "A’nın B’ye göre ve B’nin yere göre hızları veriliyorsa vA/yer=vA/B+vB/yer kullanılır. Dünya’ya göre doğuya 12 m/s giden otobüste yolcu otobüse göre batıya 2 m/s yürürse yolcunun Dünya hızı doğuya 10 m/s’dir. Yolcunun otobüs hızına sahip olması, yürüyüş katkısını silmez.",
          "Bir üçüncü gözlemci için önce yolcunun Dünya hızını bul, sonra gözlemcinin Dünya hızını çıkar. Aynı otobüs katkısını iki kez ekleme. Vektör eşitliği her iki eksende de geçerlidir; uçak-rüzgâr veya motor-su örnekleri aynı referans zincirinin farklı bağlamlarıdır. Verilen hızın kaynağını her satırda koru.",
        ],
      },
      {
        title: "İki boyutta çıkarma, sürat çıkarma değildir",
        paragraphs: [
          "A=(8,0), B=(0,6) m/s ise B/A=(−8,6) m/s olur. Bağıl sürat √(8²+6²)=10 m/s’dir; 8−6 veya 8+6 sonucu değildir. Kuzeybatı yönünü iki işaret birlikte belirler. Yalnız okun uzunluğu gözlemcinin hangi yönde gördüğünü anlatmaz.",
          "Dünya hızlarının her ikisine aynı c vektörü eklenirse (vA+c)−(vB+c)=vA−vB olur. Bağıl hız değişmez; Dünya’ya göre yollar değişir. Bu ortak katkının ikisi için de gerçekten aynı olması gerekir. Farklı yerde farklı akış veya başka ivmeler verilirse ortak vektör sadeleştirmesi otomatik uygulanmaz.",
        ],
      },
      {
        title: "Konumu zamanla ilerlet",
        paragraphs: [
          "Sabit hızda rA(t)=rA₀+vA t ve rB(t)=rB₀+vB t’dir. Bağıl konum rA/B=rA−rB; bağıl konumun değişim hızı vA−vB olur. Konum metre, hız m/s ve süre saniye seçilirse çarpım doğru birimi verir. Başlangıç konumunu hız oku sanma.",
          "Konum-zaman grafiğinin eğimi hızı verir. İki hareketlinin aynı anda grafikte aynı konuma gelmesi karşılaşmadır; hız-zaman grafiğinin kesişimi ise o anda hızların eşit olduğunu söyler. Aynı hızda olup ayrı yerlerde bulunabilirler. Grafik türünü okumadan iki çizginin kesişimine tek anlam yükleme.",
        ],
      },
      {
        title: "Karşılaşma için iki koordinat uyuşmalı",
        paragraphs: [
          "r 0=(30,40) m ve bağıl hız (−3,−4) m/s ise iki bileşen de 10 s sonra sıfır olur. Aynı anda ve aynı yerde oldukları için karşılaşırlar. Bağıl hız (−3,0) olsaydı x bileşeni sıfırlansa bile y uzaklığı 40 m kalırdı; iki boyutta tek bir ekseni kontrol etmek yeterli değildir.",
          "Gelecek karşılaşma için ortak zamanın negatif olmaması gerekir. Negatif çözüm, sabit hızlı yolların geçmiş uzantısına aittir. Bağıl hız sıfırken başlangıç bağıl konumu sıfır değilse aralık sabit kalır; sıfırsa model boyunca çakışıktırlar. Bu durumda keyfî tek bir gelecekte karşılaşma anı uydurma.",
        ],
      },
      {
        title: "Yaklaşma hızını uzaklığın değişiminden ayır",
        paragraphs: [
          "Düzlemde bağıl süratin büyüklüğü her zaman aradaki uzaklığın azalma hızı değildir. r≠0 için uzaklığın anlık değişimi (r·vbağıl)/|r| ile verilir: negatifse yaklaşma, pozitifse uzaklaşma. İki nokta arasındaki doğruya dik hız, ilk anda uzaklığı değiştirmeyip daha sonra artış oluşturabilir.",
          "Atölyede zamanı durdurulmuş anlar halinde seç; Dünya konumlarıyla B’ye göre konumu aynı anda karşılaştır. Hızlar sabit tutulduğunda yollar doğru parçalarıdır. Gerçek bir viraj, hız değişimi veya ivmeli gözlemci verilirse bu sabit hız tahminini tüm zamana taşıma; anlık fark ile uzun süreli yol modeli farklı kapsam taşır.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı yol, ters bakış",
        prompt:
          "A doğuya 20 m/s, B doğuya 12 m/s. Birbirlerini nasıl görürler?",
        strategy: "Doğuyu artı seç.",
        steps: [
          {
            label: "A/B",
            explanation: "Gözlenenden gözlemciyi çıkar.",
            expression: "20−12=+8 m/s",
          },
          {
            label: "B/A",
            explanation: "Gözlem sırasını değiştir.",
            expression: "12−20=−8 m/s",
          },
          {
            label: "Yorum",
            explanation: "Normlar eşit, yönler zıttır.",
            expression: "Doğu 8; batı 8",
          },
        ],
        answer: "A, B’ye göre doğuya 8; B, A’ya göre batıya 8 m/s.",
        check:
          "İkisi de Dünya’ya göre doğuya giderken biri diğerini batıya gidiyor görebilir.",
        pitfall: "Eksi işaretini gerçek Dünya yönüyle karıştırmak.",
      },
      {
        title: "Dik yolların bağıl hızı",
        prompt: "A/yer=(8,0), B/yer=(0,6) m/s. B/A?",
        strategy: "İki bileşeni de çıkar.",
        steps: [
          {
            label: "Fark",
            explanation: "A gözlemcidir.",
            expression: "vB/A=(−8,6)",
          },
          {
            label: "Norm",
            explanation: "Bileşenler diktir.",
            expression: "√(64+36)=10 m/s",
          },
          {
            label: "Yön",
            explanation: "x eksi, y artı.",
            expression: "Kuzeybatı",
          },
        ],
        answer: "(−8,6) m/s; sürat 10 m/s.",
        check: "Ters bakış (8,−6) olur.",
        pitfall: "Yalnız süratlerin farkını almak.",
      },
      {
        title: "Üç referansı tekleştir",
        prompt:
          "Otobüs/yer=(12,0), yolcu/otobüs=(−2,0), gözlemci/yer=(4,0) m/s. Yolcu/gözlemci?",
        strategy: "Önce ortak Dünya referansını kur.",
        steps: [
          {
            label: "Dünya",
            explanation: "Taşıt ve yürüyüş katkısını topla.",
            expression: "vY/yer=(10,0)",
          },
          {
            label: "Gözlemci",
            explanation: "Onun Dünya hızını çıkar.",
            expression: "(10,0)−(4,0)=(6,0)",
          },
          {
            label: "Denetim",
            explanation: "Doğrudan zinciri karşılaştır.",
            expression: "12−2−4=6 m/s",
          },
        ],
        answer: "Doğuya 6 m/s.",
        check: "Otobüs katkısı yalnız bir kez kullanıldı.",
        pitfall: "Yolcuya otobüs hızını ikinci kez eklemek.",
      },
      {
        title: "İki bileşenli karşılaşma",
        prompt: "rA₀−rB₀=(30,40) m; vA−vB=(−3,−4) m/s. Gelecekte karşılaşma?",
        strategy: "İki sıfır koşulunun zamanını ayrı bul.",
        steps: [
          {
            label: "x",
            explanation: "30−3 t=0.",
            expression: "t=10 s",
          },
          {
            label: "y",
            explanation: "40−4 t=0.",
            expression: "t=10 s",
          },
          {
            label: "Birlikte",
            explanation: "Aynı pozitif zaman bulundu.",
            expression: "rbağıl(10)=(0,0)",
          },
        ],
        answer: "10 s sonra karşılaşırlar.",
        check: "Bağıl hız (−3,0) olsaydı y sıfırlanmazdı.",
        pitfall: "x sıfır olduğunda koşulsuz çarpışma demek.",
      },
    ],
    recall: [
      {
        prompt: "vA/B hangi sırayla çıkarılır?",
        answer:
          "A’nın Dünya hızı eksi B’nin Dünya hızı; iki hız aynı referansta olmalıdır.",
      },
      {
        prompt: "Bağıl durgunluk Dünya’ya göre durgunluk mudur?",
        answer: "Hayır; aynı Dünya hızıyla ayrı yerlerde ilerleyebilirler.",
      },
      {
        prompt: "İki boyutta karşılaşma koşulu?",
        answer:
          "Her iki bağıl konum bileşeni aynı, negatif olmayan zamanda sıfır olmalıdır.",
      },
      {
        prompt: "Ortak hız katkısı ne zaman sadeleşir?",
        answer:
          "İki hareketliye gerçekten aynı vektör eklendiğinde; farklı akışlara genellenmez.",
      },
    ],
    questions: [
      {
        prompt:
          "A ve B Dünya’ya göre doğuya sırasıyla 20 ve 12 m/s sabit hızlarla gidiyor. A’nın B’ye göre hızı?",
        correct: "Doğuya 8 m/s",
        distractors: ["Batıya 8 m/s", "Doğuya 32 m/s", "Batıya 32 m/s", "0"],
        hint: "A’nın hızından B’ninkini çıkar.",
        explanation: "Doğu + seçilirse vA/B=20−12=+8 m/s.",
      },
      {
        prompt: "A/yer doğuya 20, B/yer doğuya 12 m/s. B’nin A’ya göre hızı?",
        correct: "Batıya 8 m/s",
        distractors: [
          "Doğuya 8 m/s",
          "Doğuya 32 m/s",
          "Batıya 32 m/s",
          "Doğuya 12 m/s",
        ],
        hint: "Bu kartta gözlemci A’dır.",
        explanation:
          "vB/A=12−20=−8 m/s; eksi batıyı gösterir, Dünya’ya göre B yine doğuya gider.",
      },
      {
        prompt:
          "+x doğu, +y kuzey. A/yer=(8,0), B/yer=(0,6) m/s. B’nin A’ya göre hız vektörü?",
        correct: "(−8,6) m/s",
        distractors: ["(8,−6) m/s", "(8,6) m/s", "(−8,−6) m/s", "(0,14) m/s"],
        hint: "İlk B’den A’yı bileşen bileşen çıkar.",
        explanation: "(0−8,6−0)=(−8,6) m/s; kuzeybatı yönündedir.",
      },
      {
        prompt: "A/yer=(8,0), B/yer=(0,6) m/s. B’nin A’ya göre sürati kaç m/s?",
        correct: "10",
        distractors: ["14", "2", "6", "8"],
        hint: "Önce fark vektörünü, sonra normu bul.",
        explanation:
          "vB/A=(−8,6), norm √(64+36)=10 m/s; iki Dünya süratini doğrudan çıkaramazsın.",
      },
      {
        prompt:
          "Otobüs Dünya’ya göre doğuya 12 m/s. Yolcu otobüse göre batıya 2 m/s yürüyor. Yolcunun Dünya hızı?",
        correct: "Doğuya 10 m/s",
        distractors: [
          "Doğuya 14 m/s",
          "Batıya 10 m/s",
          "Batıya 14 m/s",
          "Doğuya 2 m/s",
        ],
        hint: "Taşıta göre hızla taşıtın Dünya hızını topla.",
        explanation: "12+(−2)=+10 m/s; Dünya’ya göre doğuya.",
      },
      {
        prompt:
          "Sabit hızlı iki cismin başlangıç bağıl konumu (30,40) m, bağıl hızı (−3,−4) m/s. Gelecekte karşılaşma zamanı?",
        correct: "10 s",
        distractors: ["5 s", "12 s", "20 s", "Hiç karşılaşmazlar"],
        hint: "İki koordinatın sıfır zamanları aynı olmalı.",
        explanation: "30−3 t=0 ve 40−4 t=0 iki denklem de t=10 s verir.",
      },
      {
        prompt:
          "Başlangıç bağıl konum (30,40) m, sabit bağıl hız (−3,0) m/s. Gelecekte karşılaşırlar mı?",
        correct: "Hayır; y farkı 40 m kalır",
        distractors: [
          "Evet, 10 s sonra",
          "Evet, 40/3 s sonra",
          "Evet, 50/3 s sonra",
          "Evet, hemen",
        ],
        hint: "Her iki koordinatı aynı anda kontrol et.",
        explanation:
          "x 10 s’de sıfır olur fakat y=40 m her an korunur; uzayda aynı yerde değillerdir.",
      },
      {
        prompt:
          "A ve B’nin Dünya hızları ikisi de (4,−2) m/s; başlangıç konumları farklı. Bağıl hareket için kesin sonuç?",
        correct: "Bağıl hız 0; aralarındaki konum farkı sabit",
        distractors: [
          "İkisi de Dünya’ya göre duruyor",
          "Kesinlikle 1 s sonra çarpışırlar",
          "Bağıl sürat √20 m/s",
          "Başlangıç konumları aynıdır",
        ],
        hint: "Eş Dünya hızlarını çıkar.",
        explanation:
          "vA−vB=(0,0); sabit hız modelinde bağıl konum değişmez. Dünya’ya göre durgunluk veya eş konum çıkmaz.",
      },
      {
        prompt:
          "A/yer=(6,1), B/yer=(2,−3) m/s. İkisine de aynı (3,4) m/s katkı ekleniyor. Yeni A/B hızı?",
        correct: "(4,4) m/s",
        distractors: ["(7,8) m/s", "(1,0) m/s", "(−4,−4) m/s", "(9,5) m/s"],
        hint: "Ortak vektör farkta sadeleşir.",
        explanation:
          "(vA+c)−(vB+c)=vA−vB=(4,4); Dünya hızları değişse de bağıl fark aynı kalır.",
      },
      {
        prompt:
          "rA₀−rB₀=(10,0) m ve sabit vA−vB=(0,3) m/s. 2 s sonra aralarındaki uzaklık?",
        correct: "2√34 m",
        distractors: ["16 m", "10 m", "6 m", "20 m"],
        hint: "Önce iki bileşenli bağıl konumu bul.",
        explanation:
          "2 s’de r=(10,6) m; uzaklık √(100+36)=2√34 m. Bağıl sürat×süre yalnız alınan bağıl yolu verir, başlangıç uzaklığını silmez.",
      },
    ],
  },
  {
    id: "nehir-problemleri",
    topic: "detail-360",
    title: "Nehir problemleri: suya göre yön, kıyıya göre yol",
    minutes: 80,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 17–20; OGM Vektörler–Bağıl Hız sunusu PDF s. 10–14 ve Vektörler Özeti nehir örneği ile karşılaştırılmış özgün öğretim. Düzgün sabit akıntı ve sabit suya göre sürat varsayılır; veriler öğretim örneğidir.",
    objectives: [
      "Suya ve kıyıya göre hız vektörlerini ayrı tanımla.",
      "Geçiş süresini karşı kıyı bileşeniyle, sürüklenmeyi kıyı bileşeniyle hesapla.",
      "En kısa süreyi tam karşıya varıştan ayır; eşit ve büyük akıntı sınırlarını açıkla.",
    ],
    sections: [
      {
        title: "Üç hızın referansı",
        paragraphs: [
          "Motorun suya göre hızı, akıntının kıyıya göre hızı ve motorun kıyıya göre hızı farklıdır. Bağlantı vMotor/kıyı=vMotor/su+vSu/kıyı’dır. Akıntıya bırakılmış, suya göre durgun tahta kıyıya göre akıntıyla gider. Motorun gösterdiği suya göre sürati doğrudan kıyı sürati sanma.",
          "Bu model düz-paralel kıyılar, sabit genişlik ve her noktada aynı sabit kıyıya paralel akıntı kullanır. Motor/yüzücü suya göre seçilen sürati korur; hızlanma, akıntı kayması ve rüzgâr ayrı modellenmez. Sayısal değerler gerçek bir nehrin ölçümü değildir. Değişen akış alanında aynı sonuçlar koşulsuz geçerli olmaz.",
        ],
      },
      {
        title: "Açıyı hangi eksenden ölçtün?",
        paragraphs: [
          "+x aşağı akış, +y karşı kıyı olsun. Atölyede θ, kıyıya dik +y yönünden +x’e doğru ölçülür. Suya göre sürat s ise hız (s sinθ,s cosθ), akıntı (a,0), kıyı hızı (a+s sinθ,s cosθ) olur. Negatif θ, motorun yukarı akışa çevrildiğini gösterir.",
          "Soruda açı kıyıyla verilirse aynı sinüs-kosinüs sırası kullanılmaz. Kıyıyla 53° yönelmede dik bileşen s sin 53°, yatay bileşen s cos 53° olur. Önce referans çizgisini işaretle; sonra üçgeni kur. Açı adı aynı sayı olsa da farklı eksenden ölçülmesi fiziksel yönü değiştirir.",
        ],
      },
      {
        title: "Genişliği dik bileşenle geç",
        paragraphs: [
          "Genişlik d ve karşı kıyıya hız bileşeni vy>0 ise geçiş süresi t=d/vy’dir. Kıyıya göre toplam süratin normuna bölmek, eğik yolu genişlik sanır. Suya dik yönelmede θ=0 ve vy=s olduğundan t=d/s olur. Akıntı bu özel durumda kıyıya varış yerini değiştirir, geçiş süresini değiştirmez.",
          "Yön ve suya göre hızın dik bileşeni sabit tutulurken bu bağımsızlık geçerlidir. Akıntı değişince otomatik yeni direksiyon açısı seçersen vy de değişebilir ve süre aynı kalmak zorunda değildir. vy=0 olduğunda karşı kıyıya sonlu varış yoktur; vy<0 motoru hedef kıyıdan uzaklaştırır. Bu sınırları sıfıra bölerek sayı uydurmadan belirt.",
        ],
      },
      {
        title: "Sürüklenme ve alınan yollar",
        paragraphs: [
          "Kıyıya göre yatay hız vx ise varış yerinin ilk tam karşı noktadan farkı x=vx t olur. x pozitif aşağı, negatif yukarı akış yönüdür. Sabit bileşke hızda kıyıya göre yol √(d²+x²), suya göre alınan yol s t’dir. Farklı referanslardaki bu iki yolun aynı olması gerekmez.",
          "Genişlik 120 m, s=5 m/s ve a=3 m/s iken dik yönelmede t=24 s, sürüklenme 72 m olur. Kıyı sürati √34 m/s ve kıyı yolu 24√34 m’dir; suya göre yol 120 m kalır. Çizimde gerçekleşmiş yol ile henüz gidilmemiş hedef doğrusu farklı çizgilerle gösterilir; tek bir oku üç hızın hepsi yerine kullanma.",
        ],
      },
      {
        title: "En kısa süre, en kısa yol değildir",
        paragraphs: [
          "Sabit s ve kıyıya paralel akıntıda karşıya hız bileşeni en fazla s olabilir. Bu nedenle en kısa süre için suya göre kıyıya dik yönel: θ=0, tmin=d/s. Akıntı varsa bu yol kıyıya göre eğiktir. Hız bileşenini akıntıya karşı ayırmak y bileşenini küçültür ve geçişi uzatır.",
          "Tam karşıya çıkmak için kıyıya göre vx=0 gerekir: s sinθ=−a. |a|<s ise bu yön seçilebilir; y hızı √(s²−a²), süre d/√(s²−a²) olur. Böylece kıyıya göre yol d’ye, iki kıyı arasındaki en kısa uzunluğa eşittir. Bu seçenek daha kısa yol verirken en kısa süreyi vermeyebilir.",
        ],
      },
      {
        title: "Akıntı motora yetiştiğinde",
        paragraphs: [
          "|a|=s ise yatay katkıyı tamamen iptal etmek için motor tüm su hızını kıyı doğrultusuna ayırır; karşı kıyı bileşeni sıfır olur. Tam karşı noktaya sonlu sürede varılamaz. |a|>s için de vx sıfırlanamaz. Bu durum karşı kıyıya hiçbir biçimde geçilemez demek değildir; dik yüzüp aşağı akışta başka noktaya çıkılabilir.",
          "Atölyedeki “Tam karşıya var” seçimi yalnız tam karşı hedefini sorar; tüm akıntı rejimlerinde genel en kısa yol çözümü iddiası taşımaz. Akıntı çok güçlüyken aşağı kıyıda başka hedeflere en kısa yol ayrı bir optimizasyon sorusudur. Uygun açı yoksa hayalî bir ok veya sonlu hedef zamanı çizilmez; en kısa süre seçimiyle geçerli sürüklenmiş yol karşılaştırılır.",
        ],
      },
      {
        title: "Akıntı boyunca gidiş ve dönüş",
        paragraphs: [
          "Kıyı boyunca suya göre sürat s ve aşağı akış a>0 ise aşağı hız s+a, yukarı hız s−a’dır. Yukarı varış için s>a gerekir. Eş uzunluktaki gidiş-dönüşün ortalama sürati, toplam yol/toplam süredir; iki yön süratinin düz ortalaması değildir. İki bacakta geçen süreler genellikle farklıdır.",
          "s=5 ve a=3 m/s için 60 m aşağı 7,5 s, yukarı 30 s sürer. 120 m toplam yol 37,5 s’de alınır; ortalama 3,2 m/s olur. Akıntı azaldığında yukarı süre azalabilir; motor süratiyle akıntı süratini birbirine karıştırma. Yukarı kıyı hızı sıfır veya ters ise sabit hız modelinde hedefe sonlu ulaşma yoktur.",
        ],
      },
      {
        title: "İki yüzücüde ortak akış",
        paragraphs: [
          "Aynı düzgün akıştaki iki yüzücünün kıyı hızları vK/su+a ve vL/su+a olduğundan K/L=vK/su−vL/su olur. Ortak akıntı farkta sadeleşir. Bu, kıyıya varış noktalarının akıntıdan etkilenmediği anlamına gelmez; bağıl hareket ile kıyı referansı farklı hedefleri ölçer.",
          "K/su=(0,4), L/su=(−3,4), akıntı=(2,0) m/s ise kıyı hızları (2,4) ve (−1,4), K/L=(3,0) m/s olur. Yüzücüler farklı akışlara maruz kalırsa akıntıların farkı kalır. Her çözümde verilen referansı, açı eksenini, pozitif y koşulunu ve süre birimini dört ayrı kontrol olarak uygula.",
        ],
      },
    ],
    examples: [
      {
        title: "Dik yönel, sürüklenmeyi bul",
        prompt:
          "Genişlik 120 m, suya göre sürat 5 m/s, aşağı akıntı 3 m/s. Motor suya göre kıyıya dik gidiyor. Süre ve sürüklenme?",
        strategy: "Karşı ve kıyı bileşenlerini ayır.",
        steps: [
          {
            label: "Hızlar",
            explanation: "Su (0,5), akıntı (3,0).",
            expression: "vkıyı=(3,5) m/s",
          },
          {
            label: "Süre",
            explanation: "Genişliği yalnız dik hızla geç.",
            expression: "t=120/5=24 s",
          },
          {
            label: "Varış",
            explanation: "Yatay hızı süreyle çarp.",
            expression: "x=3·24=72 m",
          },
        ],
        answer: "24 s; aşağı akışa 72 m sürüklenme.",
        check: "Kıyı yolu 24√34≈139,94 m, suya göre yol 120 m.",
        pitfall: "Genişliği toplam sürate bölmek.",
      },
      {
        title: "Tam karşıya yönel",
        prompt:
          "Aynı 120 m nehirde s=5 m/s, a=3 m/s. Motor tam karşıya çıkacak. Yön ve süre?",
        strategy: "Yatay bileşeni akıntıyı iptal edecek seç.",
        steps: [
          {
            label: "Yatay",
            explanation: "Suya göre yukarı 3 m/s gerekir.",
            expression: "sinθ=−3/5",
          },
          {
            label: "Dik",
            explanation: "Su sürati 5 değişmez.",
            expression: "vy=√(25−9)=4 m/s",
          },
          {
            label: "Süre",
            explanation: "Dik geçiş hesabı.",
            expression: "t=120/4=30 s",
          },
        ],
        answer: "θ≈−36,87°; 30 s; kıyı sürüklenmesi 0.",
        check: "24 s’lik en kısa süreden uzun, kıyı yolu 120 m’dir.",
        pitfall: "Hem tam karşıya hem en kısa sürede gidildiğini varsaymak.",
      },
      {
        title: "Gidiş-dönüşte payda süre",
        prompt:
          "Suya göre kıyı doğrultusunda 5 m/s motor, 3 m/s akıntıda 60 m aşağı ve 60 m geri gidiyor. Ortalama sürat?",
        strategy: "Her bacağın süresini bul.",
        steps: [
          {
            label: "Aşağı",
            explanation: "Kıyı süratleri toplanır.",
            expression: "t 1=60/8=7,5 s",
          },
          {
            label: "Yukarı",
            explanation: "Akıntı ters katkı yapar.",
            expression: "t 2=60/2=30 s",
          },
          {
            label: "Ortalama",
            explanation: "Toplam yol/toplam süre.",
            expression: "120/37,5=3,2 m/s",
          },
        ],
        answer: "3,2 m/s.",
        check:
          "Kısa süreli hızlı bölüm ile uzun süreli yavaş bölüm eş ağırlıklı değildir.",
        pitfall: "(8+2)/2=5 hesabını kullanmak.",
      },
      {
        title: "Ortak akıntı, farklı varış",
        prompt:
          "K ve L aynı anda yakın kıyının aynı noktasından başlıyor; bu başlangıç x=0 alınsın. K/su=(0,4), L/su=(−3,4), akıntı=(2,0) m/s; nehir 100 m genişlikte. Bağıl hız ve kıyı çıkışları?",
        strategy: "Önce kıyı hızlarını yaz.",
        steps: [
          {
            label: "Kıyı",
            explanation: "Akıntıyı ikisine de ekle.",
            expression: "K=(2,4), L=(−1,4)",
          },
          {
            label: "Zaman",
            explanation: "İkisinin dik bileşeni 4.",
            expression: "tK=tL=100/4=25 s",
          },
          {
            label: "Fark ve yer",
            explanation: "K−L=(3,0); x=vx t.",
            expression: "xK=50 m; xL=−25 m",
          },
        ],
        answer: "K/L=(3,0) m/s; 25 s sonra K aşağı 50 m, L yukarı 25 m.",
        check: "İki varış arası 75 m=3·25 m.",
        pitfall:
          "Bağıl hızda akıntı sadeleşti diye kıyı çıkışını sabit sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Geçiş süresi hangi hızla bulunur?",
        answer: "Karşı kıyıya dik pozitif kıyı bileşeniyle: t=d/vy.",
      },
      {
        prompt: "En kısa süre için suya göre yön?",
        answer: "Kıyıya dik; sabit süratte karşı bileşen en büyük olur.",
      },
      {
        prompt: "Tam karşıya varış ne zaman sonludur?",
        answer:
          "Bu düzgün akış modelinde |akıntı|<suya göre sürat; eşitlikte dik bileşen 0 olur.",
      },
      {
        prompt: "Ortak akıntı hangi hesapta sadeleşir?",
        answer:
          "Aynı akıştaki iki yüzücünün birbirine göre hızında; kıyı varış yerinde değil.",
      },
    ],
    questions: [
      {
        prompt:
          "Nehir 120 m genişlikte. Motor suya göre kıyıya dik 5 m/s, kıyıya paralel akıntı 3 m/s. Sabit düzgün modelde geçiş süresi?",
        correct: "24 s",
        distractors: ["20 s", "30 s", "40 s", "120/√34 s"],
        hint: "Genişliği karşı bileşene böl.",
        explanation:
          "Akıntı karşı bileşeni değiştirmez: vy=5 m/s, t=120/5=24 s.",
      },
      {
        prompt:
          "120 m geniş nehirde motor suya göre kıyıya dik 5 m/s; aşağı akıntı 3 m/s. Tam karşı noktadan sürüklenme?",
        correct: "Aşağı 72 m",
        distractors: ["Aşağı 120 m", "Yukarı 72 m", "0 m", "Aşağı 24 m"],
        hint: "Süre 24 s; kıyı bileşeni 3 m/s.",
        explanation:
          "t=120/5=24 s, x=3·24=72 m aşağı; motor suya göre dik olsa da kıyı yolu eğiktir.",
      },
      {
        prompt:
          "Motorun suya göre hızı (0,5), akıntının kıyıya göre hızı (3,0) m/s. Motorun kıyıya göre sürati?",
        correct: "√34 m/s",
        distractors: ["8 m/s", "2 m/s", "5 m/s", "3 m/s"],
        hint: "Vektörleri toplayıp norm al.",
        explanation: "Kıyı hızı (3,5) m/s; norm √(9+25)=√34 m/s.",
      },
      {
        prompt:
          "120 m nehirde motorun su sürati 5 m/s, akıntı 3 m/s. Sabit yönle tam karşıya varmak için yatay su bileşeni −3 m/s seçiliyor. Süre?",
        correct: "30 s",
        distractors: ["24 s", "40 s", "15 s", "60 s"],
        hint: "Dik bileşeni Pisagor ile bul.",
        explanation:
          "Su sürati 5 sabitken vy=√(25−9)=4 m/s; t=120/4=30 s, yatay kıyı bileşeni 0.",
      },
      {
        prompt:
          "Düzgün akıntı 3 m/s; motorun suya göre sabit sürati de 3 m/s. Tam karşı noktaya sonlu sürede varış hakkında doğru ifade?",
        correct: "Mümkün değil; tam yatay iptalde karşı bileşen 0 olur",
        distractors: [
          "Her yönde karşıya geçiş imkânsızdır",
          "Tam karşıya 3 s’de varılır",
          "Dik yönelirse sürüklenme 0 olur",
          "Kıyı sürati her yönde 0 olur",
        ],
        hint: "Akıntıyı iptal etmeye ayrılan bileşeni düşün.",
        explanation:
          "Yukarı akışa bütün 3 m/s ayrılırsa y bileşeni 0 kalır. Tam karşı hedef sonlu değildir; motor dik gidip sürüklenerek başka noktaya geçebilir.",
      },
      {
        prompt:
          "Aynı düzgün akışta K/su=(0,4), L/su=(−3,4), akıntı=(2,0) m/s. K’nin L’ye göre hızı?",
        correct: "(3,0) m/s",
        distractors: ["(1,4) m/s", "(−3,0) m/s", "(2,4) m/s", "(5,0) m/s"],
        hint: "Ortak akıntıyı iki kıyı hızında da yaz.",
        explanation:
          "K/kıyı=(2,4), L/kıyı=(−1,4); fark (3,0) m/s. Akıntı aynı olduğu için sadeleşir.",
      },
      {
        prompt:
          "Motor suya göre kıyı boyunca 5 m/s süratle gidiyor; akıntı 3 m/s. Yukarı akış yönündeki 60 m hedefe süre?",
        correct: "30 s",
        distractors: ["7,5 s", "12 s", "20 s", "60 s"],
        hint: "Yukarı kıyı sürati 5−3 olur.",
        explanation:
          "Hedefe doğru kıyı sürati 2 m/s; süre 60/2=30 s. Akıntı katkısı ters yöndedir.",
      },
      {
        prompt:
          "Su sürati 5 m/s, akıntı 3 m/s motor 60 m aşağı ve 60 m yukarı kıyı doğrultusunda gidiyor. Tüm yolun ortalama sürati?",
        correct: "3,2 m/s",
        distractors: ["5 m/s", "4 m/s", "8 m/s", "2 m/s"],
        hint: "Toplam yol/toplam süre kullan.",
        explanation:
          "Aşağı süre 7,5 s, yukarı 30 s; 120/37,5=3,2 m/s. İki süratin düz ortalaması süreleri eşit sayar.",
      },
      {
        prompt:
          "40 m nehirde motor suya göre aşağı akış tarafına, kıyıyla 53° açı yaparak 10 m/s gidiyor. Akıntı 1 m/s. sin 53°=0,8, cos 53°=0,6. Tam karşı noktadan yatay varış farkı?",
        correct: "Aşağı 35 m",
        distractors: ["Aşağı 10 m", "Aşağı 15 m", "Yukarı 25 m", "0 m"],
        hint: "Açı bu soruda kıyıdan ölçülüyor.",
        explanation:
          "Su bileşenleri yatay 6, dik 8 m/s. Kıyı yatay hızı 6+1=7 m/s, süre 40/8=5 s; sürüklenme 35 m.",
      },
      {
        prompt:
          "+x aşağı akış, +y karşı kıyı. 100 m geniş nehirde motor/su=(−3,4), akıntı=(2,0) m/s. Varışın tam karşı noktaya göre işaretli x farkı?",
        correct: "−25 m",
        distractors: ["+25 m", "+75 m", "+100 m", "0 m"],
        hint: "Kıyı yatay bileşen −1, dik bileşen 4.",
        explanation:
          "t=100/4=25 s; x=(−3+2)·25=−25 m. Eksi, yukarı akış yönünü gösterir.",
      },
    ],
  },
];
export const forge015PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge015PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge015PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "ayt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  questions: p.questions.map((q, i) => {
    const options = [q.correct, ...q.distractors],
      answer = (i * 2 + 1) % 5;
    return {
      id: `${p.id}-015-${i + 1}`,
      prompt: txt(q.prompt),
      options: options.map((_, j) => txt(options[(j - answer + 5) % 5])),
      answer,
      hint: txt(q.hint),
      explanation: txt(q.explanation),
      skill: p.id,
    };
  }),
}));

export type Vector2 = { x: number; y: number };
export type VectorOperation = "sum" | "difference" | "scale";
const epsilon = 1e-9;
const clean = (n: number) => (Math.abs(n) < 1e-12 ? 0 : n);
function finiteValues(...values: number[]) {
  if (!values.every(Number.isFinite))
    throw new RangeError("FINITE_PHYSICS_VALUES");
}
function vector(v: Vector2) {
  finiteValues(v.x, v.y);
  return v;
}
export function addVectors(a: Vector2, b: Vector2): Vector2 {
  vector(a);
  vector(b);
  const r = {
    x: a.x + b.x === 0 ? 0 : a.x + b.x,
    y: a.y + b.y === 0 ? 0 : a.y + b.y,
  };
  return vector(r);
}
export function vectorModel(
  a: Vector2,
  b: Vector2,
  scalar: number,
  operation: VectorOperation,
) {
  vector(a);
  vector(b);
  finiteValues(scalar);
  if (!["sum", "difference", "scale"].includes(operation))
    throw new RangeError("VECTOR_OPERATION");
  const factor = operation === "difference" ? -1 : 1;
  const second =
    operation === "scale"
      ? { x: 0, y: 0 }
      : { x: factor * b.x, y: factor * b.y };
  const first =
    operation === "scale" ? { x: scalar * a.x, y: scalar * a.y } : a;
  const result = addVectors(first, second),
    magnitude = Math.hypot(result.x, result.y);
  finiteValues(magnitude);
  const angle =
    magnitude === 0
      ? null
      : clean(((Math.atan2(result.y, result.x) * 180) / Math.PI + 360) % 360);
  return {
    first,
    second,
    result,
    magnitude,
    angle,
    balance: {
      x: result.x === 0 ? 0 : -result.x,
      y: result.y === 0 ? 0 : -result.y,
    },
  };
}
export function relativeModel(
  a0: Vector2,
  b0: Vector2,
  va: Vector2,
  vb: Vector2,
  time: number,
) {
  [a0, b0, va, vb].forEach(vector);
  finiteValues(time);
  if (time < 0) throw new RangeError("RELATIVE_TIME");
  const a = addVectors(a0, { x: va.x * time, y: va.y * time }),
    b = addVectors(b0, { x: vb.x * time, y: vb.y * time });
  const initial = addVectors(a0, { x: -b0.x, y: -b0.y }),
    velocity = addVectors(va, { x: -vb.x, y: -vb.y }),
    position = addVectors(a, { x: -b.x, y: -b.y });
  const speed = Math.hypot(velocity.x, velocity.y),
    distance = Math.hypot(position.x, position.y);
  const radial =
    distance > 0
      ? (position.x * velocity.x + position.y * velocity.y) / distance
      : null;
  let meetingKind: "coincident" | "future" | "past" | "never" = "never",
    meetingTime: number | null = null;
  const speedSquared = velocity.x ** 2 + velocity.y ** 2;
  finiteValues(speedSquared, initial.x * velocity.x + initial.y * velocity.y);
  if (speedSquared === 0) {
    if (initial.x === 0 && initial.y === 0) {
      meetingKind = "coincident";
      meetingTime = 0;
    }
  } else {
    const candidate =
      -(initial.x * velocity.x + initial.y * velocity.y) / speedSquared;
    const residual = Math.hypot(
      initial.x + candidate * velocity.x,
      initial.y + candidate * velocity.y,
    );
    if (residual < epsilon * Math.max(1, Math.hypot(initial.x, initial.y))) {
      meetingKind = candidate >= 0 ? "future" : "past";
      meetingTime = candidate === 0 ? 0 : candidate;
    }
  }
  [
    speed,
    distance,
    ...(radial === null ? [] : [radial]),
    ...(meetingTime === null ? [] : [meetingTime]),
  ].forEach((n) => finiteValues(n));
  return {
    a,
    b,
    initial,
    position,
    velocity,
    speed,
    distance,
    radial,
    meetingKind,
    meetingTime,
  };
}
export function riverChoices(width: number, speed: number, current: number) {
  finiteValues(width, speed, current);
  if (width <= 0 || speed <= 0) throw new RangeError("RIVER_POSITIVE");
  const possible = Math.abs(current) < speed;
  const directAngle = possible
    ? (-Math.asin(current / speed) * 180) / Math.PI
    : null;
  const directTime = possible
    ? width / (speed * Math.sqrt((1 - current / speed) * (1 + current / speed)))
    : null;
  const quickestTime = width / speed;
  finiteValues(quickestTime, ...(directTime === null ? [] : [directTime]));
  return { quickestTime, directPossible: possible, directAngle, directTime };
}
export function riverModel(
  width: number,
  speed: number,
  current: number,
  angle: number,
  time: number,
) {
  riverChoices(width, speed, current);
  finiteValues(angle, time);
  if (angle < -180 || angle > 180 || time < 0)
    throw new RangeError("RIVER_SCOPE");
  const theta = (angle * Math.PI) / 180,
    water = {
      x: speed * clean(Math.sin(theta)),
      y: speed * clean(Math.cos(theta)),
    },
    flow = { x: current, y: 0 },
    bank = addVectors(water, flow);
  const crossingTime = bank.y > 0 ? width / bank.y : null;
  const elapsed = crossingTime === null ? time : Math.min(time, crossingTime),
    position = { x: bank.x * elapsed, y: bank.y * elapsed };
  const drift = crossingTime === null ? null : clean(bank.x * crossingTime);
  const bankPath = drift === null ? null : Math.hypot(width, drift),
    waterPath = crossingTime === null ? null : speed * crossingTime;
  finiteValues(
    elapsed,
    position.x,
    position.y,
    ...[crossingTime, drift, bankPath, waterPath].filter(
      (n): n is number => n !== null,
    ),
  );
  const bankSpeed = Math.hypot(bank.x, bank.y);
  finiteValues(bankSpeed);
  return {
    water,
    flow,
    bank,
    crossingTime,
    elapsed,
    position,
    drift,
    bankPath,
    waterPath,
    bankSpeed,
    atBank: crossingTime !== null && elapsed >= crossingTime,
  };
}
