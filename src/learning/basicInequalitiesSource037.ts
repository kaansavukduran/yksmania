import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
import { source011Figure, source011PracticeItemCodes, source011Revision } from "./basicInequalitiesSource011Revision";
interface Inequality037Item extends QuestionGuidance { code:string; prompt:string; options:string[] }
interface Inequality037Pack { id:string; title:string; minutes:number; source:string; sections:(GuideSection&{code:string})[]; examples:(WorkedExample&{code:string})[]; recall:{prompt:string;answer:string}[]; items:Inequality037Item[]; sheet:CheatSection[] }
// Source037 companion teaching; application, publication and PDF-closure evidence remain separate.
const originalPack: Omit<Inequality037Pack, "source"> = {
  "id": "tyt-mat-basit-esitsizlikler-kaynak-037",
  "title": "Basit eşitsizlikler: sırayı koru, bütün çözümü gör",
  "minutes": 165,
  "sections": [
    {
      "code": "S01",
      "title": "Bir sayı değil, bütün uygun değerler",
      "paragraphs": [
        "Denklem iki ifadenin eşit olmasını, eşitsizlik ise bir sıralama ilişkisini ister. x+2=5 için tek kök 3 olabilir; x+2<5 için 3’ten küçük bütün gerçek x değerleri uygundur. Bir eşitsizliği çözmek yalnız bir örnek sayı bulmak değil, koşulu sağlayan bütün değerleri belirlemektir. Bu bütüne çözüm kümesi denir.",
        "Bu ünitede aksi yazılmadıkça x gerçek sayıdır. ℝ gerçek sayılar, ∅ boş küme, ÇK çözüm kümesi demektir. Kişi veya ders adedinde ayrıca tam sayı ve negatif olmama koşulu aranır. Mutlak değerli ve ikinci derece eşitsizliklerin genel çözümü ayrı konudur; burada seçili bir aralığın uzaklık dili yalnız sonuç gösterimi olarak açıklanır."
      ]
    },
    {
      "code": "S02",
      "title": "Dört işaret, bir sınır",
      "paragraphs": [
        "x<a, x’in a’dan küçük olduğunu söyler; a eşitliği sağlamaz. x≤a, küçük veya eşit demektir; a da çözümdür. x>a ve x≥a sağ taraftaki büyük değerlere gider. < ve > sıkı; ≤ ve ≥ eşitliği kabul eden eşitsizliklerdir. “Sıkı” sözcüğü eşit sınırın dışarıda kalması anlamına gelir.",
        "Sayı doğrusunda çözümden çıkarılan sonlu sınır açık, içi boş noktayla; dahil edilen sınır dolu noktayla gösterilir. x>2’de 2 dışarıdadır, 2,1 ve 3 içeridedir; 1 değildir. Noktanın açık olması aradaki değerlerin eksik olduğu anlamına gelmez; yalnız sınırın kendisi alınmaz."
      ],
      "table": {
        "headers": [
          "İlişki",
          "Sınır a",
          "Yön"
        ],
        "rows": [
          [
            "x<a",
            "Hariç, açık nokta",
            "Sola"
          ],
          [
            "x≤a",
            "Dahil, dolu nokta",
            "Sola"
          ],
          [
            "x>a",
            "Hariç, açık nokta",
            "Sağa"
          ],
          [
            "x≥a",
            "Dahil, dolu nokta",
            "Sağa"
          ]
        ]
      }
    },
    {
      "code": "S03",
      "title": "Aralık parantezleri uç kabulünü saklar",
      "paragraphs": [
        "(a,b), a ile b arasındaki değerleri iki ucu almadan; [a,b], iki ucu da alarak gösterir. (a,b] solda a’yı dışarıda, sağda b’yi içeride tutar. Örneğin −2<x≤5, (−2,5] aralığıdır. Virgül iki sınırı ayırır; bir ondalık basamak işareti olarak okunmaz.",
        "Sola sınırsız x<3 için (−∞,3), sağa sınırsız x≥−1 için [−1,∞) yazılır. ∞ ve −∞ gerçek sayı veya yerine koyabileceğin son bir nokta değildir; sonsuz tarafta her zaman yuvarlak parantez vardır. Köşeli parantez yalnız dahil edilebilir sonlu uç için kullanılır. Ok, çözümün o yönde sınırsız sürmesini anlatır."
      ]
    },
    {
      "code": "S04",
      "title": "Sayı doğrusunu koşuldan üret",
      "paragraphs": [
        "x>2 için önce 2 sınırını işaretle, noktayı açık bırak, 2’den büyük değerlerin yönünü sağa boya. x≤−4 veya x>1 için iki ayrı ışın vardır; aradaki −4 ile 1 arasının tamamı çözüm değildir. ∪ birleşim işareti bu iki çözüm bölgesini birlikte yazar.",
        "Görseldeki açık/dolu uç ve sayısal aralık aynı koşuldan hesaplanmalıdır. Bir sınırı veya işareti değiştirdiğinde hem şekil hem küme yazımı birlikte değişir. Şekil ekrandan taşan sınırsız bölgeyi okla sürdürür; pencerenin kenarı yeni bir matematiksel sınır değildir. Sonucu okumak için HTML metni de şeklin yanındadır."
      ]
    },
    {
      "code": "S05",
      "title": "Ekleme ve çıkarma sıralamayı kaydırır",
      "paragraphs": [
        "İki tarafa aynı gerçek sayıyı eklemek veya çıkarmak yönü değiştirmez. x−4<9’da iki tarafa 4 ekle: x−4+4<9+4, buradan x<13. Sıralama sayı doğrusunda aynı miktarda kayar; solda olan değer sağdaki değerin önüne geçmez.",
        "Eklenen sayının negatif olması da bu kuralı değiştirmez. −3<2’nin iki tarafına −5 eklenirse −8<−3 olur. “Negatif gördüm, yönü çevirdim” bir kural değildir. Hangi işlemin iki tarafa uygulandığını söyle; negatif sayı eklemekle negatif sayıya bölmek farklıdır."
      ]
    },
    {
      "code": "S06",
      "title": "Pozitif çarpan sırayı korur",
      "paragraphs": [
        "İki tarafı aynı pozitif sayıyla çarpmak veya bölmek yönü korur. 2x≤10 için iki tarafı 2’ye böl: x≤5. Pozitif bir ölçek büyütmesi veya küçültmesi soldaki değeri yine solda bırakır. Eşit sınırın kabulü de değişmez; x=5 başlangıçta 10≤10 verir.",
        "Çözerken kullanılan bölen sıfır olamaz. Sıfırla çarpma da aynı çözüm bilgisini koruyan tersinir bir dönüşüm değildir: 1<2’den 0<0 yazarsan doğru olan sıkı ilişki yanlış olur. Katsayı sıfırsa ona bölmek yerine kalan sabit koşulun her x için doğru mu yanlış mı olduğunu ayrıca belirle."
      ]
    },
    {
      "code": "S07",
      "title": "Negatif çarpan sayı doğrusunda yansıtır",
      "paragraphs": [
        "−3<2 doğrudur. İki tarafı −1 ile çarpınca değerler 3 ve −2 olur; doğru sıra 3>−2’dir. Negatif çarpma yansıma yaptığı için büyük ve küçük yönleri yer değiştirir. < ile >, ≤ ile ≥ birbirine döner; eşitlik kabulü kaybolmaz.",
        "−3x>12’de iki tarafı −3’e böl: x<−4. x=−5 için 15>12 doğru, x=0 için 0>12 yanlış, x=−4 için 12>12 yanlış olur. Bu üç deneme içeriği, dışarıyı ve açık sınırı görünür kılar; bütün çözümün gerekçesi yine işaretli, geçerli cebirsel dönüşümdür."
      ]
    },
    {
      "code": "S08",
      "title": "Negatif sabit, negatif katsayı değildir",
      "paragraphs": [
        "x−5<2’de x’in katsayısı +1’dir. İki tarafa 5 eklenir ve x<7 bulunur; yön çevrilmez. −2x<6’da ise iki taraf −2’ye bölünür ve x>−3 olur. İlk örnekte negatif görünen −5 bir sabit, ikinci örnekte −2 değişkenin çarpanıdır.",
        "Benzer görünen −3x>12 ile x−3>12’yi yan yana yaz. İlkinde negatif katsayıya bölme gerekir ve x<−4; ikincisinde yalnız 3 eklenir ve x>15. İşlem seçimini görünüşteki eksi işaretine değil, bütün terimin nasıl kurulduğuna bağla."
      ]
    },
    {
      "code": "S09",
      "title": "İşareti bilinmeyen parametreyle kör bölme",
      "paragraphs": [
        "a·x<6’da a bir gerçek parametre, x aranan değişkendir. a>0 ise pozitif a’ya bölünür ve x<6/a; a<0 ise negatif a’ya bölünür, x>6/a olur. a=0’da bölme yapılmaz: 0<6 her x için doğru olduğu için ÇK=ℝ.",
        "“Her zaman x<6/a” demek negatif ve sıfır dallarını kaybettirir. İnteraktif parametreyi sıfırın iki tarafına götür; çözüm yönünün değişmesini, a=0’da sınırın bir bölme sonucu değil sabit bir doğruluk durumu olmasını gör. Başka sabit koşul yanlış çıksaydı sıfır katsayı ∅ de verebilirdi."
      ]
    },
    {
      "code": "S10",
      "title": "Değişkenli bölenin işareti de bir koşuldur",
      "paragraphs": [
        "x−1 ifadesi x>1’de pozitif, x<1’de negatif, x=1’de sıfırdır. Bir eşitsizliği x−1’e bölmek istersen hangi bölgede olduğun bilinmelidir. Pozitif bölgede yön korunur, negatif bölgede döner, sıfırda bölme tanımsızdır.",
        "Bu, değişken paydalı her eşitsizliği bu ünitede çözdüğümüz anlamına gelmez; güvenli işlem koşulunu öğreniyoruz. Seçtiğin tek bir x değerinde işareti görmek, bütün x’ler için tek yön seçme izni vermez. İşaret bilinmiyorsa durumlara ayır veya o ifadeye bölmeden başka geçerli bir dönüşüm kullan."
      ]
    },
    {
      "code": "S11",
      "title": "Dağıt, topla, ayır, sonra katsayıya bak",
      "paragraphs": [
        "3(2x−5)≤4x+7’de 3 bütün parantez terimlerine dağılır: 6x−15≤4x+7. İki taraftan 4x çıkarıp 15 ekleyince 2x≤22, pozitif 2’ye bölünce x≤11 olur. Bir terimi atlamak veya yalnız seçilmiş bir terimi bölmek aynı eşitsizliği korumaz.",
        "Çözüm düzeni şudur: tek değişkenli doğrusal yapıyı ve sayı alanını tanı; parantezleri aç; benzer terimleri topla; değişken ve sabitleri ayır; son katsayının pozitif/negatif/sıfır türünü belirle; çözümü aralık ve sayı doğrusuyla göster. Son adımda iç, dış ve varsa uç değerini ilk ifadede denetle."
      ]
    },
    {
      "code": "S12",
      "title": "Değişken yok olunca sabit koşulu değerlendir",
      "paragraphs": [
        "5(x−2)<5x−7 açılınca 5x−10<5x−7; iki taraftan 5x çıkarınca −10<−7 kalır. Bu koşul her x için doğrudur; çözüm yalnız x=0 değil, ℝ’dir. Değişkenin kaybolması otomatik olarak “çözüm yok” demek değildir.",
        "Yakın bir öğretim karşılaştırmasında işareti > yap: 5(x−2)>5x−7, sonunda −10>−7 ister ve hiçbir x bunu düzeltemez; ÇK=∅. A·x<B biçiminde A=0 olduğunda ne 0’a böl ne yeni bir sınır uydur; 0<B ifadesinin doğru veya yanlış oluşunu değerlendir."
      ]
    },
    {
      "code": "S13",
      "title": "Bileşik eşitsizlik iki koşulun birlikte sağlanmasıdır",
      "paragraphs": [
        "−2<3x+1≤10, hem −2<3x+1 hem 3x+1≤10 demektir. Üç taraftan 1 çıkar: −3<3x≤9. Üç tarafı pozitif 3’e böl: −1<x≤3; çözüm (−1,3]. Sol uç açık, sağ uç kapalıdır.",
        "İstersen iki koşulu ayrı çöz: ilkinden x>−1, ikincisinden x≤3 gelir; ortak bölge aynı aralıktır. İki sınırı birbirinden kopuk görevler gibi görme; aynı x her ikisini de sağlamalıdır. x=−1 ilk sıkı koşulu sağlamaz, x=3 ikinci koşulu eşitlikle sağlar."
      ]
    },
    {
      "code": "S14",
      "title": "Sabit pozitif paydada üç taraf birlikte değişir",
      "paragraphs": [
        "2≤(x−1)/3<5 için payda 3 pozitif ve sıfır değildir. Üç tarafı 3 ile çarp: 6≤x−1<15. Sonra üç tarafa 1 ekle: 7≤x<16. Çözüm [7,16); x=7 alınır, x=16 alınmaz.",
        "−4≤(x+2)/2<5 için aynı yöntem −8≤x+2<10 ve −10≤x<8 verir. Payın bütününü koru; (x+2)/2 ile x+2/2 aynı ifade değildir. Pozitif payda sayesinde yönler korunur; paydanın işareti bilinmiyorsa aynı üç taraflı adımı varsayımla uygulama."
      ]
    },
    {
      "code": "S15",
      "title": "Negatif katsayıda çözüm aralığını yeniden sırala",
      "paragraphs": [
        "Ek öğretim denemesi olarak −5<−2x+1≤9’u incele. İki koşul ayrı çözüldüğünde soldan x<3, sağdan x≥−4 gelir. Ortak çözüm [−4,3) olur. Negatif sayıya bölmede yönler döner; sonucu küçük sınır solda kalacak şekilde yeniden oku.",
        "a=0 gibi bir ayarda ortada yalnız sabit kalırsa iki koşul ya bütün gerçek sayılarda birlikte doğru olur ya da en az biri yanlış olur ve kesişim boştur. Görsel model iki tek koşulu ve ortak bölgeyi aynı hesaplardan üretir. Bu ek varyantlar kaynak yönteminin uygulamasıdır; PDF’de ayrı bir soru varmış gibi sayılmaz."
      ]
    },
    {
      "code": "S16",
      "title": "Ve: ortak bölgeyi al",
      "paragraphs": [
        "“x>1 ve x≤4” iki koşulun aynı anda doğru olmasını ister; çözüm (1,4]. Kesişim işareti ∩, iki kümede birden olan değerleri seçer. x=2 ikisini sağlar; x=0 yalnız üst sınırı, x=5 yalnız alt sınırı sağlar ve bu yüzden ikisi de kesişimde değildir.",
        "“x≤−2 ve x>3” için ortak bir değer yoktur; ∅ çıkar. Ekranda iki boyalı bölgenin olması ortak çözümün var olduğunu göstermez; bölgelerin gerçekten üst üste gelmesini ara. Bir bağlaç değişimi bütün sonucu iki ışından boş kümeye çevirebilir."
      ]
    },
    {
      "code": "S17",
      "title": "Veya: en az bir koşul yeter",
      "paragraphs": [
        "“x≤−2 veya x>3” için değer koşullardan birini sağladığında çözümdür. Çözüm (−∞,−2]∪(3,∞). −2 içeride, 3 dışarıda; 0 ise iki koşulu da sağlamadığı için iki ışının arasındaki boşlukta kalır.",
        "Veya her zaman iki ayrı parça bırakmaz. Ek bir karşılaştırmada x≤3 veya x>1 bütün ℝ’yi kaplar. Bölümler üst üste geliyorsa birleşimde aynı değeri tekrar saymazsın. Renkler yardımcıdır; her bölgenin ilişki ve aralık metni de açıkça verilir."
      ]
    },
    {
      "code": "S18",
      "title": "Temas eden uçta tek nokta veya eksik nokta",
      "paragraphs": [
        "Ek öğretim karşılaştırması: x≥2 ve x≤2 yalnız x=2’yi bırakır; çözüm {2}. İki uçtan biri sıkı olsaydı aynı temas noktasını kabul etmeyecek ve kesişim ∅ olacaktı. Tek nokta ile boş küme farklıdır.",
        "x<2 veya x>2 bütün gerçek sayılar içinden yalnız 2’yi çıkarır; açık-açık temas birleşimde bu deliği doldurmaz. x≤2 veya x>2 ise ℝ’dir, çünkü ilk koşul temas noktasını alır. Bu örnekler kaynakta öğretilen açık/kapalı uç ve bağlaç kurallarının ek uygulamalarıdır."
      ]
    },
    {
      "code": "S19",
      "title": "Sözcükte eşitliği aramayı alışkanlık yap",
      "paragraphs": [
        "“En az 20” tam 20’yi kabul eder: x≥20. “20’den fazla” kabul etmez: x>20. “En çok 880 TL” ≤880; “880 TL’den az” <880 demektir. Cümledeki eşitlik iznini belirlemeden sadece “büyük/küçük” sezgisiyle işaret seçme. Aynı kural kaynak örneğindeki “en az 5” için x≥5, “5’ten fazla” için x>5 verir.",
        "x’in neyi ölçtüğünü ve birimini önce yaz. Borç miktarını pozitif x TL diye tanımladıysan “borcun 3 katı 12 TL’den büyük” →3x>12 ve x>4 olur. Hesap bakiyesi gibi negatif olabilen başka bir niceliği aynı adla tanımlamak, sözel modeli değiştirebilir; verilmemiş işareti varsayma."
      ]
    },
    {
      "code": "S20",
      "title": "Gerçek sayı çözümünü bağlamın sayı alanından geçir",
      "paragraphs": [
        "Cebirsel eşitsizlik n≤8,2 verse bile ders sayısı n pozitif veya sıfır bir tam sayıysa en büyük uygun değer 8’dir. 8,2 dersi gerçek bağlamın izin verdiği bir adet sayamazsın. Öte yandan para miktarında bir kesir sırf kesir diye reddedilmez; birim ve alt birim koşulunu oku.",
        "En büyük tam sayı için yalnız yuvarlama ezberi kullanma. n<8 olduğunda 8 sınırı dışarıdadır ve en büyük 7; n≤8 olduğunda 8 alınır. Bulduğun en büyük adedin uygunluğunu ve hemen bir sonrakinin neden uygun olmadığını toplam giderden denetle. Sabit gider bütçeyi aşarsa n=0 bile mümkün olmayabilir."
      ]
    },
    {
      "code": "S21",
      "title": "Sabit ücret ve ders başı ücret",
      "paragraphs": [
        "Kursun sabit ücreti 240 TL, ders başı ücreti 80 TL ise n dersin toplamı 240+80n TL’dir. En çok 880 TL bütçede 240+80n≤880 →80n≤640→n≤8. n tam ve negatif olmayan olduğundan en fazla 8 ders alınır.",
        "8 dersin gideri 880 TL, 9 dersin gideri 960 TL’dir; bu ikili kontrol en büyük oluşunu da gösterir. Bütçe “880 TL’den az” diye değişseydi 880 kabul edilmez ve en fazla 7 ders olurdu. Model, sabit ücretin n=0’da da uygulandığını ve ders başı ücretin pozitif olduğunu açıkça varsayar."
      ]
    },
    {
      "code": "S22",
      "title": "Aynı bütçe yapısını kişi sayısına aktar",
      "paragraphs": [
        "Konserin sabit gideri 1.200 TL, kişi başı gideri 60 TL ve bütçe en çok 4.200 TL olsun. Kişi sayısı n için 1200+60n≤4200; 60n≤3000 ve n≤50. n tam ve negatif olmayan olduğundan en fazla 50 kişi alınabilir.",
        "50 kişi tam 4.200 TL, 51 kişi 4.260 TL eder. Kaynak kurstaki “sabit + birim×adet” ilişkisi farklı bir yüzeyde aynıdır. Sayıları rastgele toplayıp bölmek yerine her terimin neyi ve hangi birimde ölçtüğünü söyle; ek bir kapasite sınırı verilmişse onu da kesişime katmak gerekir."
      ]
    },
    {
      "code": "S23",
      "title": "Kâr, zarar ve başa baş üç ayrı durum",
      "paragraphs": [
        "Toplam maliyeti C, satış gelirini G ile gösterelim. Kâr G>C, zarar G<C; başa baş G=C’dir. “Zarar etmez” G≥C anlamına gelir ve başa başı da alır. Dolayısıyla “kâr eder” ile “zarar etmez” aynı matematiksel koşul değildir.",
        "İki farklı satış senaryosu birlikte verildiğinde her geliri aynı toplam maliyetle ayrı karşılaştır. Birinde kâr, diğerinde zarar varsa aynı maliyet değişkeni iki sıkı eşitsizliği birden sağlamalıdır. Sonuç aralığının uçlarında gelir ile maliyet eşit oluyorsa o uçlar kâr/zarar koşuluna alınmaz."
      ]
    },
    {
      "code": "S24",
      "title": "Bin TL’ye geçerken değişkenin adını da açık tut",
      "paragraphs": [
        "Seçili 2024 TYT Temel Matematik 8’in resmî değişkeni b TL cinsindendir. Sabit iki ürün maliyeti 18.000+22.000=40.000 TL; toplam 40.000+b TL’dir. Aynı hesabı daha küçük sayılarla yapmak için u=b/1000 tanımlayabilirsin. O zaman u bin TL cinsinden sayısal değer, toplam maliyet 40+u bin TL olur.",
        "Bu değişken dönüşümünü yazmadan b’yi önce TL, sonra bin TL gibi kullanma. u=20, resmî b=20.000 TL demektir; b=20 TL değildir. 1000 pozitif olduğundan 10<u<30 eşitsizliği TL’ye çevrilince 10.000<b<30.000 olur; yönler ve açık uçlar değişmez. Kaynaktaki bin TL uyarlaması bu açık adlandırmayla korunur."
      ]
    },
    {
      "code": "S25",
      "title": "İki satış ilişkisini bir ortak aralığa dönüştür",
      "paragraphs": [
        "Bin TL ölçeğinde toplam maliyet 40+u olsun. İlk satış 2u+30 ve kâr koşulu 2u+30>40+u →u>10. İkinci satış 3u−20 ve zarar koşulu 3u−20<40+u →2u<60→u<30. İkisi birlikte 10<u<30 verir.",
        "u=20’de maliyet 60, satışlar 70 ve 40 bin TL’dir; birinde kâr, diğerinde zarar. u=10’da ilk satış başa baş; u=30’da ikinci satış başa baş olur. Bu yüzden iki uç da dışarıdadır. İlk sözcük “zarar etmez” olsaydı yalnız alt uç dahil olurdu; ikinci senaryo aynı kaldığında çözüm [10,30) olur."
      ]
    },
    {
      "code": "S26",
      "title": "Aralığı merkezden uzaklık diliyle oku",
      "paragraphs": [
        "10.000<b<30.000 aralığının orta noktası 20.000, orta noktadan her uca uzaklık 10.000 TL’dir. |b−20.000| ifadesi b ile 20.000 arasındaki negatif olmayan uzaklığı gösterir. Bu nedenle aynı açık aralık |b−20.000|<10.000 biçiminde de yazılır. Gerçek kitapçığın A seçeneği bu gösterimi kullanır.",
        "Bu, mutlak değerli bütün eşitsizliklerin işlendiği bir bölüm değildir; seçili aralığın gösterimini anlamak için gereken sınırlı uzaklık yorumudur. İki uç dahil olsaydı uzaklık ≤10.000 olurdu. Uçların biri dahil biri hariçse tek bir simetrik < veya ≤ uzaklık eşitsizliği aynı uç kabulünü vermez; aralık yazımını koru."
      ]
    },
    {
      "code": "S27",
      "title": "Başa başı içeren yeni bağlamı çöz",
      "paragraphs": [
        "Özgün aktarım örneğinde toplam maliyet 80+b, gelir 2b+20 olsun; bütün terimler aynı para biriminde ölçülsün. Zarar etmeme için 2b+20≥80+b →b≥60. b=60’da iki tutar 140 olur; eşitliğe izin verildiği için bu sınır kabul edilir.",
        "“Kâr” denseydi aynı cebir b>60 verirdi. Resmî örnekteki 10 ve 30’u yeni bağlama ezberden taşıma; maliyet ve gelir ifadelerinden ilişkiyi yeniden kur. Bu yeni alıştırma özgün öğretim uyarlamasıdır, resmî bir soru metninin yeniden basımı değildir."
      ]
    },
    {
      "code": "S28",
      "title": "İki geçerli çözüm yolunu aynı koşulda karşılaştır",
      "paragraphs": [
        "−4x+3>15 için bir yol 3 çıkarıp −4’e bölmek; bir başka yol önce iki tarafı −1 ile çevirip 4x−3<−15’e geçmektir. İkinci yolda 3 ekleyince 4x<−12, ardından x<−3 bulunur. İki yol da aynı küme verir; −1 ile çarpmada yönün daha önce döndüğünü unutma.",
        "2≤(x−1)/3<5 için iki koşulu ayrı çözmek ve kesiştirmek de, üç tarafı pozitif 3 ile çarpıp sonra 1 eklemek de geçerlidir. Daha az satır tek başına doğruluk veya hız kanıtı değildir. Katsayı işareti, açık/kapalı uç veya bölenin sıfır durumu gizleniyorsa kısa görünen yol güvenilir değildir; kişisel hız etkisi ölçülmedi. Ayrı yolda 2≤(x−1)/3 →6≤x−1 →x≥7; (x−1)/3<5 →x−1<15 →x<16. Ortak çözüm yine [7,16) olur."
      ]
    },
    {
      "code": "S29",
      "title": "İlk bozulan adımı onar",
      "paragraphs": [
        "−2x<8 →x<−4 zincirinde hata negatif −2’ye bölünürken yönün çevrilmemesidir; doğrusu x>−4. x−5<2 →x>7 zincirinde ise tersine gereksiz yön değişimi vardır; iki tarafa 5 eklenir ve x<7 bulunur. Hatanın son sayısına değil, ilk eşdeğer olmayan geçişe dön.",
        "x<3 için 3’ü kapalı çizmek ve “en az 20” için x>20 yazmak uç kabulü hatalarıdır. Sınır değerini başlangıç koşulunda bizzat dene. −5x≤20 onarımında x≥−4; hem −4 eşitlikle hem 0 için 0≤20 ile sağlanır. Bir tek başarılı örnek bütün çözüm kümesinin ispatı değildir."
      ]
    },
    {
      "code": "S30",
      "title": "Desteği azalt, sonra yöntem adını görmeden çöz",
      "paragraphs": [
        "Önce bütün adımlarını ve nedenlerini gördüğün örneği çalış. Sonra yalnız ilk hamleyi açıp ara satırları kendin kur; en sonunda not kapalı bir soruyu baştan çöz, çözüm kümesini çiz ve kontrol et. İçeriden, dışarıdan ve varsa sınırdan örnek denemek yanlış bir yönü veya ucu fark etmeyi kolaylaştırır.",
        "Farklı sayı ve bağlamdaki aktarım soruları, yalnız kaynak örneğinin cevabını hatırlamaktan daha fazlasını gerektirir. Yardımlı çözüm ile bağımsız çözüm ayrı tutulur. Görsel keşif, süre veya “çalıştım” işareti otomatik ustalık/XP değildir; PDF’nin üretilmiş olması da öğrenme veya ilk çalışma günü kanıtı sayılmaz."
      ]
    }
  ],
  "examples": [
    {
      "code": "E01",
      "title": "Açık sınırı ve sağ ışını oku",
      "prompt": "Gerçek x sayısı için x>2 koşulunu sayı doğrusu ve aralıkla göster.",
      "strategy": "Sınırın kendisinin kabul edilip edilmediğini önce sor.",
      "steps": [
        {
          "label": "Ucu seç",
          "expression": "x=2 için 2>2 yanlış",
          "explanation": "2 açık noktayla dışarıda kalır."
        },
        {
          "label": "Yönü seç",
          "expression": "x>2 → sağ taraf",
          "explanation": "Örneğin 3 uygundur; 1 uygun değildir."
        },
        {
          "label": "Aralığı yaz",
          "expression": "(2,∞)",
          "explanation": "∞ dahil bir son nokta değildir."
        }
      ],
      "answer": "ÇK=(2,∞)",
      "check": "2 hariç, 3 içeride; daha büyük bütün gerçek sayılar aynı kuralı sağlar.",
      "pitfall": "Açık nokta yalnız 2’yi çıkarır; tüm ışını veya 2’ye yakın değerleri çıkarmaz."
    },
    {
      "code": "E02",
      "title": "Negatif sabiti eklemeyle kaldır",
      "prompt": "x−4<9 eşitsizliğini çöz.",
      "strategy": "İki tarafa 4 ekle.",
      "steps": [
        {
          "label": "İki tarafı kaydır",
          "expression": "x−4+4<9+4",
          "explanation": "Aynı toplama yönü korur."
        },
        {
          "label": "Sadeleştir",
          "expression": "x<13",
          "explanation": "Sıkı eşitsizlikte 13 dahil değildir."
        }
      ],
      "answer": "ÇK=(−∞,13)",
      "check": "x=12 için 8<9 doğru; x=13 için 9<9 yanlış.",
      "pitfall": "−4’ün negatif oluşu yönü çevirmek için bir neden değildir."
    },
    {
      "code": "E03",
      "title": "Pozitif katsayı yönü korur",
      "prompt": "2x≤10 eşitsizliğini çöz.",
      "strategy": "İki tarafı pozitif 2’ye böl.",
      "steps": [
        {
          "label": "Katsayıyı kaldır",
          "expression": "x≤5",
          "explanation": "Pozitif bölme yönü ve eşitlik kabulünü korur."
        },
        {
          "label": "Aralığı yaz",
          "expression": "(−∞,5]",
          "explanation": "5 dahil, daha küçükler de uygundur."
        }
      ],
      "answer": "ÇK=(−∞,5]",
      "check": "x=5:10≤10; x=6:12≤10 yanlış.",
      "pitfall": "Pozitif bölmede yön çevrilmez."
    },
    {
      "code": "E04",
      "title": "Negatif katsayı yönü ters çevirir",
      "prompt": "−3x>12 eşitsizliğini çöz.",
      "strategy": "Bölen −3 negatiftir; > yönü < olur.",
      "steps": [
        {
          "label": "Negatif sayıya böl",
          "expression": "x<−4",
          "explanation": "12/(−3)=−4; karşılaştırma yönü döner."
        },
        {
          "label": "Aralığı göster",
          "expression": "(−∞,−4)",
          "explanation": "Sıkı sınır −4 alınmaz."
        }
      ],
      "answer": "ÇK=(−∞,−4)",
      "check": "x=−5:15>12; x=0:0>12 yanlış; x=−4:12>12 yanlış.",
      "pitfall": "x>−4 yazmak yönü çevirmemek olur."
    },
    {
      "code": "E05",
      "title": "Yansımada sayıların sırası değişir",
      "prompt": "−3<2 eşitsizliğinin iki tarafını −1 ile çarp.",
      "strategy": "İki sayıyı da aynı negatif sayıyla çarp.",
      "steps": [
        {
          "label": "Yeni değerler",
          "expression": "(−3)(−1)=3; 2(−1)=−2",
          "explanation": "Sayılar 0’a göre yansır."
        },
        {
          "label": "Doğru sıralama",
          "expression": "3>−2",
          "explanation": "Yansıma küçük/büyük yönünü ters çevirir."
        }
      ],
      "answer": "3>−2",
      "check": "Sayı doğrusunda 3, −2’nin sağındadır.",
      "pitfall": "Yalnız ilk sayıyı çarpmak veya < işaretini olduğu gibi bırakmak aynı dönüşüm değildir."
    },
    {
      "code": "E06",
      "title": "Hatalı yönü bir değerle yakala",
      "prompt": "Bir öğrenci −2x<6 için x<−3 yazıyor. Hatayı onar.",
      "strategy": "Negatif −2’ye bölmedeki yön kararını incele.",
      "steps": [
        {
          "label": "Doğru bölme",
          "expression": "x>−3",
          "explanation": "Negatif bölen < yönünü > yapar."
        },
        {
          "label": "Yanlış kümeye karşı örnek",
          "expression": "x=0 için 0<6 doğru",
          "explanation": "0 başlangıç koşulunu sağlar ama yanlış x<−3 kümesinde yoktur."
        }
      ],
      "answer": "ÇK=(−3,∞)",
      "check": "−3’te 6<6 yanlış; 0 uygundur.",
      "pitfall": "Kontrol hatayı bulur; bütün çözümün kanıtı geçerli negatif bölmedir."
    },
    {
      "code": "E07",
      "title": "Aynı eksi işareti, farklı işlem",
      "prompt": "x−5<2 eşitsizliğini çöz.",
      "strategy": "Bölme değil, iki tarafa 5 ekleme yapılıyor.",
      "steps": [
        {
          "label": "Sabiti kaldır",
          "expression": "x−5+5<2+5",
          "explanation": "Toplama yönü değiştirmez."
        },
        {
          "label": "Sadeleştir",
          "expression": "x<7",
          "explanation": "7 açık sınırdır."
        }
      ],
      "answer": "ÇK=(−∞,7)",
      "check": "x=6:1<2; x=7:2<2 yanlış.",
      "pitfall": "−5 görüp x>7’ye çevirmek negatif sabit ile negatif katsayıyı karıştırmaktır."
    },
    {
      "code": "E08",
      "title": "İki farklı uç kabulünü birlikte taşı",
      "prompt": "−2<3x+1≤10 eşitsizliğini çöz.",
      "strategy": "Üç tarafı aynı işlemlerle değiştir.",
      "steps": [
        {
          "label": "Biri çıkar",
          "expression": "−3<3x≤9",
          "explanation": "Alt, orta ve üst ifadeden 1 çıkarılır."
        },
        {
          "label": "Pozitif 3’e böl",
          "expression": "−1<x≤3",
          "explanation": "İki yön de korunur."
        },
        {
          "label": "Uçları yaz",
          "expression": "(−1,3]",
          "explanation": "Sol sıkı, sağ eşitliği kabul eder."
        }
      ],
      "answer": "ÇK=(−1,3]",
      "check": "x=−1 ilk koşulu sağlamaz; x=3 üst koşulu eşitlikle sağlar.",
      "pitfall": "Alt açık ve üst kapalı uçları aynı tür yapma."
    },
    {
      "code": "E09",
      "title": "Ve için ortak değerleri seç",
      "prompt": "x>1 ve x≤4 koşullarını sağlayan gerçek sayıları bul.",
      "strategy": "İki ışının kesişimini al.",
      "steps": [
        {
          "label": "İki koşulu yaz",
          "expression": "(1,∞) ve (−∞,4]",
          "explanation": "İlkinde 1 hariç, ikincisinde 4 dahil."
        },
        {
          "label": "Ortak bölge",
          "expression": "(1,4]",
          "explanation": "Aynı x iki koşulda birden olmalı."
        }
      ],
      "answer": "ÇK=(1,4]",
      "check": "2 ikisini sağlar; 0 alt koşulu, 5 üst koşulu sağlamaz.",
      "pitfall": "Bir koşulu sağlamayı yeterli sayarsan ve yerine veya kullanmış olursun."
    },
    {
      "code": "E10",
      "title": "Veya için iki ışını birlikte göster",
      "prompt": "x≤−2 veya x>3 koşulunu aralıkla yaz.",
      "strategy": "En az bir koşulu sağlayan bütün değerleri birleştir.",
      "steps": [
        {
          "label": "Birinci bölge",
          "expression": "(−∞,−2]",
          "explanation": "−2 dahildir."
        },
        {
          "label": "İkinci bölge",
          "expression": "(3,∞)",
          "explanation": "3 hariçtir."
        },
        {
          "label": "Birleşim",
          "expression": "(−∞,−2]∪(3,∞)",
          "explanation": "Aradaki −2 ile 3 arasını doldurma."
        }
      ],
      "answer": "ÇK=(−∞,−2]∪(3,∞)",
      "check": "−2 ve 4 uygundur; 0 ve 3 uygun değildir.",
      "pitfall": "Birleşimi [−2,3] gibi aradaki bölgeyle karıştırma."
    },
    {
      "code": "E11",
      "title": "Kapalı sınıra ulaşan temel eşitsizlik",
      "prompt": "5x−7≤18 eşitsizliğini çöz.",
      "strategy": "İki tarafa 7 ekle.",
      "steps": [
        {
          "label": "Yediyi ekle",
          "expression": "5x≤25",
          "explanation": "Aynı toplama yönü korur."
        },
        {
          "label": "Pozitif 5’e böl",
          "expression": "x≤5",
          "explanation": "Eşitlik kabulü korunur."
        }
      ],
      "answer": "ÇK=(−∞,5]",
      "check": "x=5:18≤18; x=6:23≤18 yanlış.",
      "pitfall": "Sınır 5’i sıkı uç gibi dışarıda bırakma."
    },
    {
      "code": "E12",
      "title": "Negatif katsayıda doğrudan yol",
      "prompt": "−4x+3>15 eşitsizliğini çöz.",
      "strategy": "Önce iki taraftan 3 çıkar.",
      "steps": [
        {
          "label": "Sabiti ayır",
          "expression": "−4x>12",
          "explanation": "15−3=12."
        },
        {
          "label": "Negatif 4’e böl",
          "expression": "x<−3",
          "explanation": "Bölen −4 olduğu için yön döner."
        }
      ],
      "answer": "ÇK=(−∞,−3)",
      "check": "x=−4 için 19>15 doğru; 0 için 3>15 yanlış; −3’te eşitlik kabul edilmez.",
      "pitfall": "−4’e bölmeyi pozitif 4’e bölüyormuş gibi yazma."
    },
    {
      "code": "E13",
      "title": "Aynı sonuca negatif katsayıyı erken kaldırarak git",
      "prompt": "−4x+3>15’i önce iki tarafı −1 ile çarparak çöz.",
      "strategy": "Yön değişimini ilk adımda kaydet.",
      "steps": [
        {
          "label": "Yansıt",
          "expression": "4x−3<−15",
          "explanation": "Hem −4x hem +3 hem 15 aynı −1 ile çarpılır; >, < olur."
        },
        {
          "label": "Üç ekle",
          "expression": "4x<−12",
          "explanation": "Toplama sırasında artık yön değişmez."
        },
        {
          "label": "Pozitif 4’e böl",
          "expression": "x<−3",
          "explanation": "Pozitif bölmede yön korunur."
        }
      ],
      "answer": "ÇK=(−∞,−3)",
      "check": "Başlangıçta x=−4 iki tarafı 19 ve 15 yapar; doğrudan yolun kümesiyle aynıdır.",
      "pitfall": "Yönü iki kez çevirmek aynı işlemi iki kez saymak olur."
    },
    {
      "code": "E14",
      "title": "Parantezde her terimi çarp",
      "prompt": "3(2x−5)≤4x+7 eşitsizliğini çöz.",
      "strategy": "3’ü 2x ve −5’e ayrı dağıt.",
      "steps": [
        {
          "label": "Dağıt",
          "expression": "6x−15≤4x+7",
          "explanation": "3×2x=6x ve 3×(−5)=−15."
        },
        {
          "label": "x’leri ayır",
          "expression": "2x−15≤7",
          "explanation": "İki taraftan 4x çıkar."
        },
        {
          "label": "Sabitleri ayır",
          "expression": "2x≤22",
          "explanation": "İki tarafa 15 ekle."
        },
        {
          "label": "Pozitif katsayıya böl",
          "expression": "x≤11",
          "explanation": "2 pozitif olduğundan yön korunur."
        }
      ],
      "answer": "ÇK=(−∞,11]",
      "check": "11’de iki taraf 51; 12’de 57≤55 yanlış.",
      "pitfall": "3(2x−5)’i 6x−5 diye açmak başlangıç eşitsizliğini değiştirir."
    },
    {
      "code": "E15",
      "title": "Sabit paydalı bileşiği üç tarafla çöz",
      "prompt": "2≤(x−1)/3<5 eşitsizliğini çöz.",
      "strategy": "Payda 3 pozitif; üç tarafı 3 ile çarp.",
      "steps": [
        {
          "label": "Paydayı kaldır",
          "expression": "6≤x−1<15",
          "explanation": "Üç taraf birlikte değişir."
        },
        {
          "label": "Biri ekle",
          "expression": "7≤x<16",
          "explanation": "Aynı 1 ekleme yönleri korur."
        }
      ],
      "answer": "ÇK=[7,16)",
      "check": "7 ilk alt koşulu eşitlikle sağlar; 16 üst sıkı koşulu sağlamaz.",
      "pitfall": "Yalnız ortadaki ifadeyi 3 ile çarpma."
    },
    {
      "code": "E16",
      "title": "Bütçede en büyük tam sayı adedi",
      "prompt": "Sabit kurs ücreti 240 TL, ders başı 80 TL. Bütçe en çok 880 TL ise en fazla kaç ders?",
      "strategy": "n tam sayı ve n≥0 olarak tanımla.",
      "steps": [
        {
          "label": "Maliyet modeli",
          "expression": "240+80n≤880",
          "explanation": "En çok eşitliği de kabul eder."
        },
        {
          "label": "Sabit gideri çıkar",
          "expression": "80n≤640",
          "explanation": "İki taraftan 240 çıkar."
        },
        {
          "label": "Pozitif 80’e böl",
          "expression": "n≤8",
          "explanation": "Adet alanıyla birlikte 0, 1, …, 8 uygundur."
        }
      ],
      "answer": "En fazla 8 ders",
      "check": "8 ders 880 TL; 9 ders 960 TL ile bütçeyi aşar.",
      "pitfall": "Sabit 240 TL’yi yok sayıp 880/80 yapmak başka bir gider modeli olur."
    },
    {
      "code": "E17",
      "title": "Parametreyi üç dala ayır",
      "prompt": "a gerçek parametre olmak üzere a·x<6 eşitsizliğini çöz.",
      "strategy": "a’ya bölmeden önce işaretini ayır.",
      "steps": [
        {
          "label": "Pozitif dal",
          "expression": "a>0 ise x<6/a",
          "explanation": "Pozitif bölmede yön aynı."
        },
        {
          "label": "Negatif dal",
          "expression": "a<0 ise x>6/a",
          "explanation": "Negatif bölmede yön ters."
        },
        {
          "label": "Sıfır dalı",
          "expression": "a=0 ise 0<6",
          "explanation": "Her gerçek x için doğru, ÇK=ℝ."
        }
      ],
      "answer": "a>0: x<6/a; a<0: x>6/a; a=0: ℝ",
      "check": "a=2’de x<3; a=−2’de x>−3; a=0’da her x çalışır.",
      "pitfall": "Sıfıra bölme veya tek bir yönle bütün parametreleri kapsama."
    },
    {
      "code": "E18",
      "title": "Eksik adımları gerekçeyle tamamla",
      "prompt": "−5<2x+1≤9 eşitsizliğini çöz.",
      "strategy": "Her üç taraftan 1 çıkar; sonra pozitif 2’ye böl.",
      "steps": [
        {
          "label": "Biri çıkar",
          "expression": "−6<2x≤8",
          "explanation": "Alt −5−1=−6, üst 9−1=8."
        },
        {
          "label": "İkiye böl",
          "expression": "−3<x≤4",
          "explanation": "Pozitif bölme yönleri korur."
        },
        {
          "label": "Aralığı yaz",
          "expression": "(−3,4]",
          "explanation": "Sol sınır hariç, sağ dahil."
        }
      ],
      "answer": "ÇK=(−3,4]",
      "check": "−3 için alt koşul −5<−5 yanlış; 4 için üst 9≤9 doğru.",
      "pitfall": "Uç kontrolünü yalnız bir tarafta yapma."
    },
    {
      "code": "E19",
      "title": "İki gelir koşulunu aynı toplam maliyetle karşılaştır",
      "prompt": "Özgün bin-TL modelinde bir ürünün maliyeti u, diğer iki ürün toplam 40 birimdir. İlk takım satışı 2u+30 ile kâr, ikinci satış 3u−20 ile zarar ettiriyor. u aralığını bul.",
      "strategy": "Toplam maliyet 40+u; iki senaryo birlikte sağlanacak.",
      "steps": [
        {
          "label": "Kâr",
          "expression": "2u+30>40+u → u>10",
          "explanation": "Gelir maliyetten büyük olmalı."
        },
        {
          "label": "Zarar",
          "expression": "3u−20<40+u →2u<60→u<30",
          "explanation": "İkinci gelir maliyetten küçük olmalı."
        },
        {
          "label": "Ortak koşul",
          "expression": "10<u<30",
          "explanation": "İki sıkı koşulun kesişimi."
        }
      ],
      "answer": "ÇK=(10,30), u bin TL ölçeğinde",
      "check": "u=20’de maliyet 60, gelirler 70 ve 40; 10 ve 30’da bir senaryo başa baş olur.",
      "pitfall": "Normalleştirilmiş u ile resmî b TL değişkenini aynı sayı sanma."
    },
    {
      "code": "E20",
      "title": "Normalleştirilmiş aralığı TL ve uzaklık diline çevir",
      "prompt": "u=b/1000 ve 10<u<30 ise TL cinsinden b aralığını ve merkezden uzaklık yazımını bul.",
      "strategy": "1000 pozitif olduğundan üç tarafı 1000 ile çarp.",
      "steps": [
        {
          "label": "Birimi dönüştür",
          "expression": "10000<b<30000",
          "explanation": "b=1000u; yönler ve sıkı uçlar korunur."
        },
        {
          "label": "Merkezi ve yarıçapı bul",
          "expression": "Orta nokta 20000; her uca uzaklık 10000",
          "explanation": "(10000+30000)/2=20000."
        },
        {
          "label": "Uzaklık dili",
          "expression": "|b−20000|<10000",
          "explanation": "b ile 20000 arasındaki uzaklık 10000’den küçük."
        }
      ],
      "answer": "(10000,30000); |b−20000|<10000",
      "check": "b=20000 arada; 10000 ve 30000 uzaklığı tam 10000 yaptığı için dışarıda.",
      "pitfall": "10<b<30 yazıp b’yi hâlâ TL ölçüsü saymak 1000 kat birim kaymasıdır."
    },
    {
      "code": "E21",
      "title": "Sıkı üst sınırı koru",
      "prompt": "7x−9<40 eşitsizliğini çöz.",
      "strategy": "İki tarafa 9 ekle.",
      "steps": [
        {
          "label": "Sabiti kaldır",
          "expression": "7x<49",
          "explanation": "Toplama yönü değiştirmez."
        },
        {
          "label": "Pozitif 7’ye böl",
          "expression": "x<7",
          "explanation": "7 açık sınırdır."
        }
      ],
      "answer": "ÇK=(−∞,7)",
      "check": "x=6:33<40; x=7:40<40 yanlış.",
      "pitfall": "Sıkı < işaretini son adımda ≤ yapma."
    },
    {
      "code": "E22",
      "title": "Negatif dağıtma ve yönü birlikte denetle",
      "prompt": "−3(2x−5)≥x+8 eşitsizliğini çöz.",
      "strategy": "−3 bütün iki terime dağılır.",
      "steps": [
        {
          "label": "Dağıt",
          "expression": "−6x+15≥x+8",
          "explanation": "−3×(−5)=+15."
        },
        {
          "label": "x ve sabitleri ayır",
          "expression": "−7x≥−7",
          "explanation": "İki taraftan x ve 15 çıkar."
        },
        {
          "label": "Negatif 7’ye böl",
          "expression": "x≤1",
          "explanation": "≥ yönü ≤ olur; sınır eşitliği hâlâ kabul edilir."
        }
      ],
      "answer": "ÇK=(−∞,1]",
      "check": "x=1 için 9≥9; x=2 için 3≥10 yanlış.",
      "pitfall": "Dağıtmada +15’i −15 yapmak veya negatif bölmede yönü korumak sonucu bozar."
    },
    {
      "code": "E23",
      "title": "Bileşik aralıkta iki farklı uç",
      "prompt": "−4≤(x+2)/2<5 eşitsizliğini çöz.",
      "strategy": "Payda 2 pozitiftir; üç tarafı 2 ile çarp.",
      "steps": [
        {
          "label": "İkiyle çarp",
          "expression": "−8≤x+2<10",
          "explanation": "Yönler korunur."
        },
        {
          "label": "İki çıkar",
          "expression": "−10≤x<8",
          "explanation": "Her üç taraftan 2 çıkarılır."
        }
      ],
      "answer": "ÇK=[−10,8)",
      "check": "−10 için orta ifade −4 ve alt eşitlik doğru; 8 için orta 5, üst 5<5 yanlış.",
      "pitfall": "Kesir çizgisinin kapsadığı x+2 bütününü unutma."
    },
    {
      "code": "E24",
      "title": "Sabit doğru koşul bütün gerçekleri verir",
      "prompt": "5(x−2)<5x−7 eşitsizliğinin çözüm kümesini bul.",
      "strategy": "x terimlerini sadeleştirdikten sonra sabit karşılaştırmayı incele.",
      "steps": [
        {
          "label": "Dağıt",
          "expression": "5x−10<5x−7",
          "explanation": "Sol parantezin her terimi 5 ile çarpılır."
        },
        {
          "label": "x’leri çıkar",
          "expression": "−10<−7",
          "explanation": "Bu karşılaştırma her x için doğrudur."
        }
      ],
      "answer": "ÇK=ℝ",
      "check": "x=0’da −10<−7, x=10’da 40<43; asıl kanıt x’ten bağımsız doğru koşuldur.",
      "pitfall": "x’ler yok oldu diye x=0 veya ∅ yazma."
    },
    {
      "code": "E25",
      "title": "Kişi sayısında tam sayı sınırı",
      "prompt": "Sabit gider 1200 TL, kişi başı 60 TL; bütçe en çok 4200 TL. En fazla kaç kişi alınabilir?",
      "strategy": "n kişi, n tam sayı ve n≥0.",
      "steps": [
        {
          "label": "Model",
          "expression": "1200+60n≤4200",
          "explanation": "Bütün gider terimleri TL cinsindedir."
        },
        {
          "label": "Sabit gideri çıkar",
          "expression": "60n≤3000",
          "explanation": "İki taraftan 1200 çıkar."
        },
        {
          "label": "Pozitif 60’a böl",
          "expression": "n≤50",
          "explanation": "En büyük uygun tam sayı 50."
        }
      ],
      "answer": "En fazla 50 kişi",
      "check": "50 kişi 4200 TL; 51 kişi 4260 TL.",
      "pitfall": "Adet ve bütçe koşulunu ayrı denetle; fazladan kapasite bilgisi verilmiş gibi varsayma."
    },
    {
      "code": "E26",
      "title": "Zarar etmeme eşitliği de alır",
      "prompt": "Toplam maliyet 80+b, gelir 2b+20 olsun; bütün terimler TL cinsinde. Zarar etmemek için b’nin koşulu nedir?",
      "strategy": "Gelir≥maliyet olarak kur.",
      "steps": [
        {
          "label": "Koşul",
          "expression": "2b+20≥80+b",
          "explanation": "Başa baş da zarar etmeme kapsamındadır."
        },
        {
          "label": "Sabit ve değişkeni ayır",
          "expression": "b≥60",
          "explanation": "İki taraftan b ve 20 çıkarılır."
        }
      ],
      "answer": "ÇK=[60,∞)",
      "check": "b=60’da gelir 140, maliyet 140; eşit sınır kabul edilir.",
      "pitfall": "Kâr koşulunun sıkı > işaretini zarar etmeme diye kopyalama."
    },
    {
      "code": "E27",
      "title": "Negatif bölmede kapalı uç kalır",
      "prompt": "−5x≤20 eşitsizliğini çöz; x=−4 ve x=0’ı denetle.",
      "strategy": "Negatif −5’e bölünürken ≤ yönü ≥ olur.",
      "steps": [
        {
          "label": "Böl ve yönü çevir",
          "expression": "x≥−4",
          "explanation": "20/(−5)=−4; eşitlik kabulü sürer."
        },
        {
          "label": "İki verilen değeri dene",
          "expression": "x=−4:20≤20; x=0:0≤20",
          "explanation": "İki değer de başlangıç eşitsizliğini sağlar."
        }
      ],
      "answer": "ÇK=[−4,∞)",
      "check": "−5 gibi bir dış değer için 25≤20 yanlış.",
      "pitfall": "Yönü çevirmek eşitlik çizgisini silmek değildir."
    },
    {
      "code": "E28",
      "title": "Katsayı pozitif olsaydı",
      "prompt": "−3x>12 örneğinde katsayı +3 yapılsın: 3x>12. Çözümü bul.",
      "strategy": "Pozitif 3’e böl, yönü koru.",
      "steps": [
        {
          "label": "Pozitif katsayıyı kaldır",
          "expression": "x>4",
          "explanation": "Bölen +3; yansıma yok."
        },
        {
          "label": "Aralığı yaz",
          "expression": "(4,∞)",
          "explanation": "Sıkı 4 ucu dışarıdadır."
        }
      ],
      "answer": "ÇK=(4,∞)",
      "check": "x=5:15>12; x=4:12>12 yanlış.",
      "pitfall": "Önceki negatif katsayılı örneğin < yönünü ezberden taşıma."
    },
    {
      "code": "E29",
      "title": "Yalnız sol ucu kapat",
      "prompt": "−2<x≤5 yerine −2≤x≤5 verilirse çözüm kümesi nasıl değişir?",
      "strategy": "Sayısal sınırlar aynı; sol eşitlik izni değişti.",
      "steps": [
        {
          "label": "Yeni sol koşul",
          "expression": "−2≤x",
          "explanation": "−2 artık kabul edilir."
        },
        {
          "label": "Sağ koşulu koru",
          "expression": "x≤5",
          "explanation": "5 zaten dahildir."
        },
        {
          "label": "Yeni aralık",
          "expression": "[−2,5]",
          "explanation": "İki uç da dolu olur."
        }
      ],
      "answer": "ÇK=[−2,5]",
      "check": "Yeni eklenen tek sınır değeri −2; aradaki değerler ve 5 değişmez.",
      "pitfall": "Sembolle oynarken sayısal sınırı veya sağ ucu gereksiz değiştirme."
    },
    {
      "code": "E30",
      "title": "Veya yerine ve gelirse",
      "prompt": "x≤−2 veya x>3 örneğinde bağlaç ve yapılsın. Çözüm nedir?",
      "strategy": "Aynı x’in iki ayrık bölgede birden olması gerekir.",
      "steps": [
        {
          "label": "İki bölge",
          "expression": "(−∞,−2] ve (3,∞)",
          "explanation": "Birinci bölgedeki her x, 3’ten küçük kalır."
        },
        {
          "label": "Kesişim",
          "expression": "∅",
          "explanation": "Aynı x hem ≤−2 hem >3 olamaz."
        }
      ],
      "answer": "ÇK=∅",
      "check": "Örneğin −2 yalnız ilkini, 4 yalnız ikincisini sağlar; çelişen sınırlar ortak değer bırakmaz.",
      "pitfall": "Ve yerine iki bölgeyi birleşim olarak boyama."
    },
    {
      "code": "E31",
      "title": "Negatif sabitli yakın örnek",
      "prompt": "x−3>12 eşitsizliğini çöz.",
      "strategy": "Negatif bir katsayıya bölme yok; 3 eklenir.",
      "steps": [
        {
          "label": "Üç ekle",
          "expression": "x>15",
          "explanation": "İki tarafa aynı 3 eklenince yön değişmez."
        },
        {
          "label": "Kontrol",
          "expression": "x=16 için 13>12",
          "explanation": "15’te eşitlik olduğu için sıkı sınır dışarıda."
        }
      ],
      "answer": "ÇK=(15,∞)",
      "check": "x=14 için 11>12 yanlış.",
      "pitfall": "−3x>12 ile x−3>12 aynı yapı değildir."
    },
    {
      "code": "E32",
      "title": "Sözel niceliğin işaretini tanımla",
      "prompt": "Ödenecek borç miktarı pozitif x TL olsun. Borcun 3 katı 12 TL’den büyükse x’in koşulu nedir?",
      "strategy": "Pozitif borç miktarını 3x>12 olarak modelle.",
      "steps": [
        {
          "label": "Dil modeli",
          "expression": "3x>12",
          "explanation": "İki taraf TL cinsindedir."
        },
        {
          "label": "Pozitif 3’e böl",
          "expression": "x>4",
          "explanation": "Verilen pozitiflik koşulu bu aralıkta zaten sağlanır."
        }
      ],
      "answer": "x>4 TL",
      "check": "5 TL borç için 15>12; 4 TL tam eşit olduğundan kabul edilmez.",
      "pitfall": "Hesap bakiyesi gibi negatif tanımlanan bir nicelikle borç miktarını aynı işaret kuralıyla karıştırma."
    },
    {
      "code": "E33",
      "title": "Ek öğretim: iki kapalı uç tek noktada buluşur",
      "prompt": "x≥2 ve x≤2 koşulunu çöz.",
      "strategy": "Kesişim yalnız ortak sınır noktasına bakar.",
      "steps": [
        {
          "label": "İlk ışın",
          "expression": "[2,∞)",
          "explanation": "2 dahildir."
        },
        {
          "label": "İkinci ışın",
          "expression": "(−∞,2]",
          "explanation": "2 yine dahildir."
        },
        {
          "label": "Ortak nokta",
          "expression": "{2}",
          "explanation": "İki tarafın diğer değerleri ortak değildir."
        }
      ],
      "answer": "ÇK={2}",
      "check": "2 iki koşulu da eşitlikle sağlar; 1 ilkini, 3 ikincisini sağlamaz.",
      "pitfall": "Tek nokta ile boş kümeyi karıştırma; uçlardan biri açık olsaydı sonuç ∅ olurdu."
    },
    {
      "code": "E34",
      "title": "Ek öğretim: negatif bileşiği iki koşulla çöz",
      "prompt": "−5<−2x+1≤9 eşitsizliğini çöz.",
      "strategy": "İki koşulu ayrı çöz, negatif bölmede iki yön kararını da yap.",
      "steps": [
        {
          "label": "Alt koşul",
          "expression": "−2x+1>−5 →−2x>−6 →x<3",
          "explanation": "Negatif −2’ye bölme > yönünü < yapar."
        },
        {
          "label": "Üst koşul",
          "expression": "−2x+1≤9 →−2x≤8 →x≥−4",
          "explanation": "Negatif −2’ye bölme ≤ yönünü ≥ yapar."
        },
        {
          "label": "Kesişim",
          "expression": "[−4,3)",
          "explanation": "Sayısal küçük sınır −4 solda, büyük 3 sağda."
        }
      ],
      "answer": "ÇK=[−4,3)",
      "check": "−4 için orta 9 kabul edilir; 3 için orta −5, sıkı alt koşul sağlanmaz.",
      "pitfall": "Negatif bölmeden sonra sınırları sıralamadan aynı soldan sağa zinciri kopyalama."
    }
  ],
  "recall": [
    {
      "prompt": "x>2’de 2 neden alınmaz; nokta nasıl çizilir?",
      "answer": "2>2 yanlış olduğu için 2 hariçtir; açık nokta ve sağa ışın çizilir."
    },
    {
      "prompt": "x≥−1’in aralığı ve sonsuz taraftaki parantezi nedir?",
      "answer": "[−1,∞). −1 kabul edilir; ∞ gerçek sayı olmadığından o taraf kapanmaz."
    },
    {
      "prompt": "İki tarafa negatif sayı eklemek yönü değiştirir mi?",
      "answer": "Hayır. −3<2’ye −5 eklemek −8<−3 verir. Negatif çarpma veya bölmeyle karıştırma."
    },
    {
      "prompt": "−3x>12’de yön neden döner?",
      "answer": "İki taraf negatif −3’e bölünür; negatif ölçek sıralamayı yansıtır ve x<−4 olur."
    },
    {
      "prompt": "0 ile çarpma neden çözme adımı olarak güvenli değildir?",
      "answer": "Geri alınabilir değildir; 1<2 doğruyken 0<0 yanlış olur. 0’a bölme ise ayrıca tanımsızdır."
    },
    {
      "prompt": "x−5<2 ile −2x<6’da hangi işlemler farklı?",
      "answer": "İlkinde +5 eklenir ve x<7; ikincisinde −2’ye bölünür ve x>−3. Negatif sabit ile katsayı ayrıdır."
    },
    {
      "prompt": "a·x<6’nın üç parametre dalı nedir?",
      "answer": "a>0: x<6/a; a<0: x>6/a; a=0: 0<6 her x için doğru, ÇK=ℝ."
    },
    {
      "prompt": "x−1’e bölmeden önce hangi üç bölgeyi düşünmelisin?",
      "answer": "x<1’de negatif, x=1’de sıfır ve bölme yasak, x>1’de pozitif. Tek bir yön her bölgeye uygulanamaz."
    },
    {
      "prompt": "−2<3x+1≤10’un çözümü ve uç kabulü nedir?",
      "answer": "−1<x≤3, yani (−1,3]. −1 dışarıda, 3 içeride."
    },
    {
      "prompt": "2≤(x−1)/3<5 çözülürken üç tarafa ne yapılır?",
      "answer": "Pozitif 3 ile çarp: 6≤x−1<15. Sonra 1 ekle: 7≤x<16; [7,16)."
    },
    {
      "prompt": "Ve ile veya hangi küme işlemleridir?",
      "answer": "Ve kesişimdir; iki koşul birden. Veya birleşimdir; en az biri yeter."
    },
    {
      "prompt": "x≤−2 ve x>3 neden iki ışın değil ∅?",
      "answer": "Hiçbir gerçek sayı aynı anda en çok −2 ve 3’ten büyük olamaz. İki ışın sonucu veya bağlacına aittir."
    },
    {
      "prompt": "x<2 veya x>2 neden ℝ değildir?",
      "answer": "2 iki sıkı koşulu da sağlamaz; açık-açık birleşimde bu nokta eksik kalır."
    },
    {
      "prompt": "En az 20 ile 20’den fazla arasındaki fark nedir?",
      "answer": "En az 20: x≥20; 20’den fazla: x>20. Eşit 20 yalnız ilkinde kabul edilir."
    },
    {
      "prompt": "240+80n≤880 için en büyük ders sayısını nasıl kanıtlarsın?",
      "answer": "n≤8 ve n negatif olmayan tam sayı. 8 ders 880 TL ile uygun; 9 ders 960 TL ile uygun değil."
    },
    {
      "prompt": "1200+60n≤4200 kişi bütçesinin sonucu nedir?",
      "answer": "n≤50; en fazla 50 kişi. 50 kişi 4200 TL, 51 kişi 4260 TL olur."
    },
    {
      "prompt": "Kâr, zarar ve zarar etmeme hangi işaretleri ister?",
      "answer": "Gelir>maliyet, gelir<maliyet ve gelir≥maliyet. Başa baş yalnız zarar etmeme koşuluna dahildir."
    },
    {
      "prompt": "40+u maliyet, 2u+30 kâr, 3u−20 zarar birlikte ne verir?",
      "answer": "u>10 ve u<30; çözüm (10,30). Uçlarda senaryolardan biri başa baş olur."
    },
    {
      "prompt": "u=b/1000 iken 10<u<30 TL cinsinden b için ne demektir?",
      "answer": "10000<b<30000. Örneğin u=20, b=20000 TL’dir; b=20 TL değildir."
    },
    {
      "prompt": "10000<b<30000 hangi merkez ve uzaklıkla yazılır?",
      "answer": "Merkez 20000, yarıçap 10000; |b−20000|<10000. Bu seçili aralığın uzaklık gösterimidir."
    },
    {
      "prompt": "5(x−2)<5x−7’de değişken kaybolunca ne yaparsın?",
      "answer": "−10<−7 doğru sabit koşul kalır; ÇK=ℝ. İşaret > olursa sabit koşul yanlış olur ve ÇK=∅."
    },
    {
      "prompt": "−5x≤20 için iç, dış ve uç değer denetimi nedir?",
      "answer": "x≥−4. −4 ve 0 uygundur; −5 uygun değildir. Kontrolü ilk eşitsizlikte yap."
    }
  ],
  "items": [
    {
      "code": "Q01",
      "prompt": "Gerçek x için 5x−7≤18 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, 5]",
        "(−∞, 5)",
        "[5, ∞)",
        "(5, ∞)",
        "{5}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki tarafa 7 ekle; sonra pozitif 5’e böl.",
      "steps": [
        "5x≤25.",
        "x≤5; 5 sınırı eşitlikle kabul edilir."
      ],
      "optionReasons": [
        "Pozitif 5’e bölme yönü korur; x≤5, 5 dahil ve üstü dışarıdadır.",
        "Bu seçenek x=5 değerini dışarıda bırakır. İlk koşulda 18 ≤ 18 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -7 ≤ 18 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -7 ≤ 18 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -7 ≤ 18 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Kapalı sınırı sıkı uç gibi çıkarma.",
      "check": "x=5 için 18≤18; x=6 için 23≤18 yanlış."
    },
    {
      "code": "Q02",
      "prompt": "Gerçek x için −4x+3>15 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, -3)",
        "(-3, ∞)",
        "(−∞, -3]",
        "(−∞, 3)",
        "{-3}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Önce 3 çıkar; negatif −4’e bölünürken yönü çevir.",
      "steps": [
        "−4x>12.",
        "x<−3; sınır açık."
      ],
      "optionReasons": [
        "Negatif −4’e bölmede >, < olur; çözüm −3’ten küçük değerlerdir.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda 19 > 15 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda 15 > 15 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda 15 > 15 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda 19 > 15 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "−4’e bölmeyi pozitif 4’e bölmeyle karıştırma.",
      "check": "−4 için 19>15; 0 için 3>15 yanlış; −3 sınırı da sağlamaz."
    },
    {
      "code": "Q03",
      "prompt": "Gerçek x için 3(2x−5)≤4x+7 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, 11]",
        "(−∞, 11)",
        "[11, ∞)",
        "(−∞, 1)",
        "{11}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "3’ü bütün paranteze dağıt; benzer terimleri ayır.",
      "steps": [
        "6x−15≤4x+7.",
        "2x≤22 → x≤11."
      ],
      "optionReasons": [
        "Son katsayı pozitif 2’dir; x≤11 ve 11 dahil olur.",
        "Bu seçenek x=11 değerini dışarıda bırakır. İlk koşulda 51 ≤ 51 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -15 ≤ 7 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=1 değerini dışarıda bırakır. İlk koşulda -9 ≤ 11 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -15 ≤ 7 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "−5’i dış katsayıyla çarpmayı unutma.",
      "check": "x=11 için iki taraf 51; x=12 için 57≤55 yanlış."
    },
    {
      "code": "Q04",
      "prompt": "Gerçek x için 2≤(x−1)/3<5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[7, 16)",
        "(7, 16)",
        "[7, 16]",
        "[6, 15)",
        "(−∞, 16)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Üç tarafı pozitif 3 ile çarp, sonra 1 ekle.",
      "steps": [
        "6≤x−1<15.",
        "7≤x<16; çözüm [7,16)."
      ],
      "optionReasons": [
        "Alt sınır 7 dahil, üst sınır 16 hariç; her iki koşul aynı anda sağlanır.",
        "Bu seçenek x=7 değerini dışarıda bırakır. İlk koşulda 2 ≤ 2 < 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=16 değerini içerir. İlk koşulda 2 ≤ 5 < 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=6 değerini içerir. İlk koşulda 2 ≤ 5/3 < 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 2 ≤ -1/3 < 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Yalnız ortayı değiştirme veya iki ucu aynı tür yapma.",
      "check": "7 alt eşitliği sağlar; 16 için üst ifade 5<5 yanlış olur."
    },
    {
      "code": "Q05",
      "prompt": "Kursun sabit ücreti 240 TL, her ders 80 TL. Bütçe en çok 880 TL ise en fazla kaç ders alınabilir? Ders sayısı negatif olmayan tam sayıdır.",
      "options": [
        "8",
        "7",
        "9",
        "10",
        "11"
      ],
      "knowledge": [
        "Toplam gider = sabit gider + birim gider × adet.",
        "Adet negatif olmayan tam sayı olmalı; en büyük adetten hemen sonrakini de denetle."
      ],
      "strategy": "n adet için 240+80n ≤ 880 kur.",
      "steps": [
        "80n ≤ 640.",
        "n ≤ 8; tam sayı alanında en büyük uygun değer 8.",
        "8 adet 880 TL; 9 adet 960 TL."
      ],
      "optionReasons": [
        "8 için toplam 880 TL sınırı sağlar; hemen sonraki 9 için 960 TL, ≤880 koşulunu sağlamaz. Bu yüzden en büyük uygun tam sayı 8 olur.",
        "7 adet için toplam 800 TL olur. Bu tutar uygun olsa da en büyük değildir; 8 adet de koşulu sağlar.",
        "9 adet için toplam 960 TL olur. Bu tutar ≤880 bütçe koşulunu sağlamaz.",
        "10 adet için toplam 1040 TL olur. Bu tutar ≤880 bütçe koşulunu sağlamaz.",
        "11 adet için toplam 1120 TL olur. Bu tutar ≤880 bütçe koşulunu sağlamaz."
      ],
      "commonError": "Gerçek sayı sınırını bağlamın tam sayı adedine dönüştür; sıkı sınırdaki eşit adedi alma.",
      "check": "8 uygundur, 9 uygun değildir; ders başı ücret 80>0 olduğu için daha sonraki adetler de sınırı geçer."
    },
    {
      "code": "Q06",
      "prompt": "Gerçek x için −5<2x+1≤9 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(-3, 4]",
        "[-3, 4]",
        "(-3, 4)",
        "(-2, 5]",
        "[4, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Üç taraftan 1 çıkar ve pozitif 2’ye böl.",
      "steps": [
        "−6<2x≤8.",
        "−3<x≤4."
      ],
      "optionReasons": [
        "Sol −3 sıkı sınır olduğu için hariç, sağ 4 eşitlikle dahil.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda -5 < -5 ≤ 9 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini dışarıda bırakır. İlk koşulda -5 < 9 ≤ 9 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-5/2 değerini dışarıda bırakır. İlk koşulda -5 < -4 ≤ 9 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-5/2 değerini dışarıda bırakır. İlk koşulda -5 < -4 ≤ 9 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Alt ve üst sınırın kabulünü ayrı denetle.",
      "check": "−3 için alt koşul −5<−5 yanlış; 4 için üst 9≤9 doğru."
    },
    {
      "code": "Q07",
      "prompt": "Özgün bin-TL modelinde maliyet 40+u, ilk satış 2u+30, ikinci satış 3u−20’dir. İlk satış kâr, ikinci satış zarar ettiriyorsa pozitif u’nun çözüm kümesi hangisidir?",
      "options": [
        "(10, 30)",
        "[10, 30]",
        "[10, 30)",
        "(10, 30]",
        "(10, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Her iki geliri aynı toplam maliyetle ayrı karşılaştır.",
      "steps": [
        "2u+30>40+u → u>10.",
        "3u−20<40+u → u<30.",
        "İki koşulun kesişimi (10,30)."
      ],
      "optionReasons": [
        "İki koşul da sıkıdır; başa baş yapan 10 ve 30 dışarıda kalır.",
        "Bu seçenek u=10 değerini içerir. İlk koşulda 50 > 50 ve 10 < 50 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek u=10 değerini içerir. İlk koşulda 50 > 50 ve 10 < 50 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek u=30 değerini içerir. İlk koşulda 90 > 70 ve 70 < 70 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek u=30 değerini içerir. İlk koşulda 90 > 70 ve 70 < 70 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "U değişkeni bin-TL ölçeğindedir; resmî b TL değeriyle aynı sayı değildir.",
      "check": "u=20’de maliyet 60, gelirler 70 ve 40; u=10/30’da bir koşul eşitliğe döner."
    },
    {
      "code": "Q08",
      "prompt": "Gerçek x için 7x−9<40 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, 7)",
        "(−∞, 7]",
        "(7, ∞)",
        "(−∞, 31/7)",
        "{7}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki tarafa 9 ekle, pozitif 7’ye böl.",
      "steps": [
        "7x<49.",
        "x<7."
      ],
      "optionReasons": [
        "7 pozitif katsayıdır; 7 sınırı sıkı olduğundan alınmaz.",
        "Bu seçenek x=7 değerini içerir. İlk koşulda 40 < 40 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -9 < 40 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=31/7 değerini dışarıda bırakır. İlk koşulda 22 < 40 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -9 < 40 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "−9 etkisini kaldırırken 40−9 yapma.",
      "check": "6 için 33<40 doğru; 7 için 40<40 yanlış."
    },
    {
      "code": "Q09",
      "prompt": "Gerçek x için −3(2x−5)≥x+8 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, 1]",
        "[1, ∞)",
        "(−∞, 1)",
        "(−∞, -1]",
        "{1}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Negatif −3’ü parantezin iki terimine dağıt.",
      "steps": [
        "−6x+15≥x+8.",
        "−7x≥−7.",
        "Negatif −7’ye böl: x≤1."
      ],
      "optionReasons": [
        "Negatif bölme ≥ yönünü ≤ yapar; 1 eşitlikle dahildir.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda 27 ≥ 6 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=1 değerini dışarıda bırakır. İlk koşulda 9 ≥ 9 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda 15 ≥ 8 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda 27 ≥ 6 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "−3×(−5)=+15 ve yön dönüşümünü ayrı denetle.",
      "check": "1 için 9≥9; 2 için 3≥10 yanlış."
    },
    {
      "code": "Q10",
      "prompt": "Gerçek x için −4≤(x+2)/2<5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[-10, 8)",
        "(-10, 8)",
        "[-10, 8]",
        "[-6, 3)",
        "(−∞, 8)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Üç tarafı pozitif 2 ile çarp, sonra 2 çıkar.",
      "steps": [
        "−8≤x+2<10.",
        "−10≤x<8."
      ],
      "optionReasons": [
        "Alt −10 dahil, üst 8 hariç; payın tamamı korunur.",
        "Bu seçenek x=-10 değerini dışarıda bırakır. İlk koşulda -4 ≤ -4 < 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=8 değerini içerir. İlk koşulda -4 ≤ 5 < 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-10 değerini dışarıda bırakır. İlk koşulda -4 ≤ -4 < 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-11 değerini içerir. İlk koşulda -4 ≤ -9/2 < 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "(x+2)/2 ifadesini x+1 gibi okuma; bütün payı önce koru. Doğru ayrım x/2+1 olur.",
      "check": "−10’da orta −4 kabul edilir; 8’de orta 5 sıkı üst sınırı sağlamaz."
    },
    {
      "code": "Q11",
      "prompt": "Gerçek x için 5(x−2)<5x−7 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "∅",
        "(−∞, 0]",
        "(0, ∞)",
        "{0}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Dağıt ve iki taraftan 5x çıkar.",
      "steps": [
        "5x−10<5x−7.",
        "−10<−7 her x için doğru."
      ],
      "optionReasons": [
        "Değişkenden bağımsız doğru koşul kaldığından bütün gerçek sayılar çözüm.",
        "Bu seçenek x=-1 değerini dışarıda bırakır. İlk koşulda -15 < -12 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=1 değerini dışarıda bırakır. İlk koşulda -5 < -2 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-1 değerini dışarıda bırakır. İlk koşulda -15 < -12 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-1 değerini dışarıda bırakır. İlk koşulda -15 < -12 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "x’ler kaybolunca otomatik x=0 veya ∅ deme.",
      "check": "−10<−7 x’ten bağımsızdır; örnekler kontrol, sabit koşul bütün alanın kanıtıdır."
    },
    {
      "code": "Q12",
      "prompt": "Bir konserin sabit gideri 1200 TL, kişi başı gideri 60 TL’dir. Bütçe en çok 4200 TL ise negatif olmayan tam sayı olarak en fazla kaç kişi alınabilir?",
      "options": [
        "50",
        "49",
        "51",
        "60",
        "70"
      ],
      "knowledge": [
        "Toplam gider = sabit gider + birim gider × adet.",
        "Adet negatif olmayan tam sayı olmalı; en büyük adetten hemen sonrakini de denetle."
      ],
      "strategy": "n adet için 1200+60n ≤ 4200 kur.",
      "steps": [
        "60n ≤ 3000.",
        "n ≤ 50; tam sayı alanında en büyük uygun değer 50.",
        "50 adet 4200 TL; 51 adet 4260 TL."
      ],
      "optionReasons": [
        "50 için toplam 4200 TL sınırı sağlar; hemen sonraki 51 için 4260 TL, ≤4200 koşulunu sağlamaz. Bu yüzden en büyük uygun tam sayı 50 olur.",
        "49 adet için toplam 4140 TL olur. Bu tutar uygun olsa da en büyük değildir; 50 adet de koşulu sağlar.",
        "51 adet için toplam 4260 TL olur. Bu tutar ≤4200 bütçe koşulunu sağlamaz.",
        "60 adet için toplam 4800 TL olur. Bu tutar ≤4200 bütçe koşulunu sağlamaz.",
        "70 adet için toplam 5400 TL olur. Bu tutar ≤4200 bütçe koşulunu sağlamaz."
      ],
      "commonError": "Gerçek sayı sınırını bağlamın tam sayı adedine dönüştür; sıkı sınırdaki eşit adedi alma.",
      "check": "50 uygundur, 51 uygun değildir; kişi başı gider 60>0 olduğu için daha sonraki adetler de sınırı geçer."
    },
    {
      "code": "Q13",
      "prompt": "Gerçek x için x≤−2 veya x>3 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, -2] ∪ (3, ∞)",
        "[-2, 3)",
        "∅",
        "ℝ",
        "(−∞, -2) ∪ [3, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Veya, koşullardan en az birinin sağlanmasını ister.",
      "steps": [
        "İlk küme (−∞,−2].",
        "İkinci küme (3,∞).",
        "Birleşim (−∞,−2]∪(3,∞)."
      ],
      "optionReasons": [
        "İki ayrı ışın birlikte alınır; −2 dahil, 3 hariç ve aradaki boşluk dışarıdadır.",
        "Bu seçenek x=-3 değerini dışarıda bırakır. İlk koşulda -3≤−2 veya -3>3 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-3 değerini dışarıda bırakır. İlk koşulda -3≤−2 veya -3>3 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0≤−2 veya 0>3 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda -2≤−2 veya -2>3 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Birleşimi iki sınırın arasını doldurmak sanma.",
      "check": "−2 ile 4 uygundur; 0 ile 3 uygun değildir."
    },
    {
      "code": "Q14",
      "prompt": "Bütün tutarlar TL cinsinde olmak üzere toplam maliyet 80+b, gelir 2b+20’dir. Satışın zarar etmemesi için b’nin çözüm kümesi hangisidir?",
      "options": [
        "[60, ∞)",
        "(60, ∞)",
        "(−∞, 60]",
        "(−∞, 60)",
        "{60}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Zarar etmeme koşulunu gelir≥maliyet olarak kur.",
      "steps": [
        "2b+20≥80+b.",
        "İki taraftan b ve 20 çıkar: b≥60."
      ],
      "optionReasons": [
        "Başa baş kabul edildiği için 60 dahildir; daha büyük maliyet parametresi de koşulu sağlar.",
        "Bu seçenek b=60 değerini dışarıda bırakır. İlk koşulda 140 ≥ 140 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek b=0 değerini içerir. İlk koşulda 20 ≥ 80 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=0 değerini içerir. İlk koşulda 20 ≥ 80 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=61 değerini dışarıda bırakır. İlk koşulda 142 ≥ 141 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Kârın sıkı > işaretini zarar etmeme ile karıştırma.",
      "check": "b=60’ta iki tutar 140 TL; b=59’da gelir 138, maliyet 139 TL olur."
    },
    {
      "code": "Q15",
      "prompt": "Bir öğrenci −2x<8 için x<−4 yazmıştır. Gerçek çözüm kümesi hangisidir?",
      "options": [
        "(-4, ∞)",
        "(−∞, -4)",
        "[-4, ∞)",
        "(4, ∞)",
        "{-4}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Negatif −2’ye bölünürken yönü ters çevir.",
      "steps": [
        "x>−4.",
        "−4 açık uçtur."
      ],
      "optionReasons": [
        "Negatif bölme < yönünü > yapar; −4’ten büyük değerler uygundur.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda 10 < 8 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-4 değerini içerir. İlk koşulda 8 < 8 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda 0 < 8 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-4 değerini içerir. İlk koşulda 8 < 8 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "İlk bozulan adım bölmede yönün çevrilmemesidir.",
      "check": "x=0 için 0<8; x=−4 için 8<8 yanlış."
    },
    {
      "code": "Q16",
      "prompt": "Gerçek x için x−5<2 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, 7)",
        "(7, ∞)",
        "(−∞, 7]",
        "(−∞, -3)",
        "{7}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Bölme yok; iki tarafa 5 ekleniyor.",
      "steps": [
        "x−5+5<2+5.",
        "x<7."
      ],
      "optionReasons": [
        "Aynı toplama yönü korur; 7 sıkı sınır olduğu için dışarıda.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda -9 < 2 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=7 değerini içerir. İlk koşulda 2 < 2 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-3 değerini dışarıda bırakır. İlk koşulda -8 < 2 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda -9 < 2 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Negatif sabit görünce gereksiz yön değiştirme.",
      "check": "6 için 1<2; 7 için 2<2 yanlış."
    },
    {
      "code": "Q17",
      "prompt": "Gerçek x için x<3 koşulunun doğru aralık gösterimi hangisidir?",
      "options": [
        "(−∞,3)",
        "(−∞,3]",
        "[−∞,3)",
        "(3,∞)",
        "[3,∞)"
      ],
      "knowledge": [
        "Sıkı eşitsizlik sonlu sınırı dışarıda tutar.",
        "∞ gerçek uç noktası değildir; sonsuz tarafta yuvarlak parantez kullanılır."
      ],
      "strategy": "Önce x=3’ün kabul edilip edilmediğini, sonra yönü denetle.",
      "steps": [
        "3<3 yanlış; 3 hariç.",
        "3’ten küçük değerler sola sınırsız sürer: (−∞,3)."
      ],
      "optionReasons": [
        "Sol ışın ve açık 3 ucu doğru; −∞ dahil edilecek bir değer değildir.",
        "3 dahil yazılmış; 3<3 yanlış olduğundan kapalı uç geçersizdir.",
        "−∞ tarafını köşeli parantezle kapatmak geçerli aralık yazımı değildir.",
        "Bu küme 3’ten büyükleri seçer; yön ters.",
        "Hem 3’ü hem daha büyükleri alır; başlangıçtaki küçük olma koşulu değil."
      ],
      "commonError": "Sonsuzluğu gerçek bir sayı gibi kapalı uç yapma.",
      "check": "2 uygundur; 3 ve 4 uygun değildir."
    },
    {
      "code": "Q18",
      "prompt": "x bir gerçek miktarı göstermek üzere “en az 20” koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[20, ∞)",
        "(20, ∞)",
        "(−∞, 20)",
        "(−∞, 20]",
        "{20}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "En az ifadesi tam 20’yi kabul eder.",
      "steps": [
        "x≥20.",
        "Kapalı 20 ucu ve sağ ışın: [20,∞)."
      ],
      "optionReasons": [
        "20 sınırı kabul edilir; 20’den büyükler de koşulu sağlar.",
        "Bu seçenek x=20 değerini dışarıda bırakır. İlk koşulda 20 ≥ 20 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0 ≥ 20 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0 ≥ 20 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=21 değerini dışarıda bırakır. İlk koşulda 21 ≥ 20 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "En az ile 20’den fazla aynı değildir.",
      "check": "20 ve 21 uygundur; 19 uygun değildir."
    },
    {
      "code": "Q19",
      "prompt": "Gerçek x için −5x≤20 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "[-4, ∞)",
        "(-4, ∞)",
        "(−∞, -4]",
        "[4, ∞)",
        "{-4}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Negatif −5’e böl ve ≤ işaretini ≥ yap.",
      "steps": [
        "x≥−4.",
        "−4 kapalı uçtur."
      ],
      "optionReasons": [
        "Negatif bölmede yön döner, eşitlik kabulü korunur.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda 20 ≤ 20 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda 25 ≤ 20 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda 20 ≤ 20 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda 0 ≤ 20 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Yön değişirken eşitlik çizgisini silme.",
      "check": "−4 için 20≤20; 0 için 0≤20; −5 için 25≤20 yanlış."
    },
    {
      "code": "Q20",
      "prompt": "Maliyet 40+u, ilk gelir 2u+30, ikinci gelir 3u−20 olsun; bütün tutarlar aynı birimde. İlk satış zarar etmezken ikinci satış zarar ediyor. Pozitif u’nun çözüm kümesi hangisidir?",
      "options": [
        "[10, 30)",
        "(10, 30)",
        "[10, 30]",
        "(10, 30]",
        "[10, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İlk koşul ≥, ikinci koşul < kullanır.",
      "steps": [
        "2u+30≥40+u → u≥10.",
        "3u−20<40+u → u<30.",
        "Kesişim [10,30)."
      ],
      "optionReasons": [
        "Alt sınırda ilk satış başa baş kabul edilir; üstte ikinci satış başa baş olacağı için 30 dışarıda.",
        "Bu seçenek u=10 değerini dışarıda bırakır. İlk koşulda 50 ≥ 50 ve 10 < 50 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek u=30 değerini içerir. İlk koşulda 90 ≥ 70 ve 70 < 70 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek u=10 değerini dışarıda bırakır. İlk koşulda 50 ≥ 50 ve 10 < 50 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek u=30 değerini içerir. İlk koşulda 90 ≥ 70 ve 70 < 70 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Bir sözcük değişince iki ucu birden gereksiz değiştirme.",
      "check": "u=10’da iki tutar 50 ve 50; ikinci satış 10<50 ile zarar; u=30’da ikinci senaryo eşitlik olup reddedilir."
    },
    {
      "code": "Q21",
      "prompt": "Gerçek x için 3x>12 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(4, ∞)",
        "(−∞, 4)",
        "[4, ∞)",
        "(−∞, -4)",
        "{4}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Katsayı pozitif 3; yönü koruyarak böl.",
      "steps": [
        "x>4.",
        "4 açık sınırdır."
      ],
      "optionReasons": [
        "Pozitif bölmede yön > kalır; eşit 4 alınmaz.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda -15 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda -15 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Negatif katsayılı önceki bir örneğin yönünü ezberden taşıma.",
      "check": "5 için 15>12 doğru; 4 için 12>12 yanlış."
    },
    {
      "code": "Q22",
      "prompt": "Gerçek x için −2≤x≤5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[-2, 5]",
        "(-2, 5]",
        "(-2, 5)",
        "[-2, 5)",
        "(−∞, 5]"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Her iki eşit sınırın da kabul edildiğini oku.",
      "steps": [
        "x≥−2 ve x≤5.",
        "Kesişim [−2,5]."
      ],
      "optionReasons": [
        "Hem −2 hem 5 eşitlikle sağlandığı için iki uç kapalıdır.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda -2 ≤ -2 ≤ 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda -2 ≤ -2 ≤ 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=5 değerini dışarıda bırakır. İlk koşulda -2 ≤ 5 ≤ 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda -2 ≤ -3 ≤ 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Önceki sıkı sol uçlu örneğin parantezini burada aynen bırakma.",
      "check": "−2 ve 5 uygun, −3 ve 6 uygun değildir."
    },
    {
      "code": "Q23",
      "prompt": "Gerçek x için x≤−2 ve x>3 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "(−∞, -2] ∪ (3, ∞)",
        "(−∞, -2]",
        "(3, ∞)",
        "[-2, 3]"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Ve, aynı değerin iki koşulu birden sağlamasını ister.",
      "steps": [
        "İlk koşul en çok −2, ikincisi 3’ten büyük ister.",
        "Bu iki bölge ayrık; ortak değer yok."
      ],
      "optionReasons": [
        "Bir x aynı anda ≤−2 ve >3 olamaz; kesişim boştur.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda -3≤−2 ve -3>3 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda -3≤−2 ve -3>3 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini içerir. İlk koşulda 4≤−2 ve 4>3 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-2 değerini içerir. İlk koşulda -2≤−2 ve -2>3 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Birleşim ile kesişimi karıştırma.",
      "check": "−2 yalnız ilk koşulu, 4 yalnız ikinciyi sağlar; hiçbir değer iki tarafta birden değildir."
    },
    {
      "code": "Q24",
      "prompt": "Gerçek x için −3x>12 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(−∞, -4)",
        "(-4, ∞)",
        "(−∞, -4]",
        "(−∞, 4)",
        "{-4}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Negatif −3’e böl ve yönü çevir.",
      "steps": [
        "x<−4.",
        "Sıkı sınır −4 hariç."
      ],
      "optionReasons": [
        "Negatif bölme > yönünü < yapar; −4’ün solu seçilir.",
        "Bu seçenek x=-5 değerini dışarıda bırakır. İlk koşulda 15 > 12 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-4 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-4 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-5 değerini dışarıda bırakır. İlk koşulda 15 > 12 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "x−3>12 ile −3x>12 aynı yapı değildir.",
      "check": "−5 için 15>12 doğru; −4 için 12>12 yanlış."
    },
    {
      "code": "Q25",
      "prompt": "Gerçek x için x−3>12 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "(15, ∞)",
        "(−∞, 15)",
        "[15, ∞)",
        "(−∞, -4)",
        "{15}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki tarafa 3 ekle; yön değişmez.",
      "steps": [
        "x−3+3>12+3.",
        "x>15."
      ],
      "optionReasons": [
        "Negatif bir katsayıya bölünmüyor; aynı toplama > yönünü korur.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda -8 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=15 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda -8 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=15 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Sabit −3’ü x katsayısı −3 sanma.",
      "check": "16 için 13>12; 15 için 12>12 yanlış."
    },
    {
      "code": "Q26",
      "prompt": "Ödenecek borç miktarı pozitif x TL’dir. Borcun 3 katı 12 TL’den büyükse x’in çözüm kümesi hangisidir?",
      "options": [
        "(4, ∞)",
        "(−∞, 4)",
        "[4, ∞)",
        "(−∞, -4)",
        "{4}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Pozitif borç miktarı için 3x>12 kur.",
      "steps": [
        "İki taraf aynı TL biriminde.",
        "Pozitif 3’e böl: x>4; pozitiflik bu aralıkta zaten sağlanır."
      ],
      "optionReasons": [
        "3x>12, x>4 verir; bu değerler verilen pozitiflik şartına da uyar.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda -15 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-5 değerini içerir. İlk koşulda -15 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini içerir. İlk koşulda 12 > 12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Borç miktarıyla negatif tanımlanabilen hesap bakiyesini aynı nicelik sanma.",
      "check": "5 TL uygundur, 4 TL sıkı büyüklük koşulunu sağlamaz."
    },
    {
      "code": "Q27",
      "prompt": "Gerçek x için x>2 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(2, ∞)",
        "[2, ∞)",
        "(−∞, 2)",
        "(−∞, 2]",
        "{2}"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "2 sınırı dışarıda ve çözüm sağa gider.",
      "steps": [
        "x=2 için 2>2 yanlış.",
        "2’den büyük bütün gerçekler: (2,∞)."
      ],
      "optionReasons": [
        "Açık 2 ucu ve sağ ışın tam koşulu anlatır.",
        "Bu seçenek x=2 değerini içerir. İlk koşulda 2 > 2 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0 > 2 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0 > 2 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=2 değerini içerir. İlk koşulda 2 > 2 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Açık noktayı bütün ışının dışarıda kalması sanma.",
      "check": "3 uygun, 1 ve 2 uygun değildir."
    },
    {
      "code": "Q28",
      "prompt": "Gerçek x için −2<3x+1≤10 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(-1, 3]",
        "[-1, 3]",
        "(-1, 3)",
        "(-3, 9]",
        "[3, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Üç taraftan 1 çıkar, pozitif 3’e böl.",
      "steps": [
        "−3<3x≤9.",
        "−1<x≤3."
      ],
      "optionReasons": [
        "Alt −1 açık, üst 3 kapalıdır; ikisi aynı x için birlikte sağlanır.",
        "Bu seçenek x=-1 değerini içerir. İlk koşulda -2 < -2 ≤ 10 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=3 değerini dışarıda bırakır. İlk koşulda -2 < 10 ≤ 10 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-2 değerini içerir. İlk koşulda -2 < -5 ≤ 10 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda -2 < 1 ≤ 10 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Üç tarafı farklı işlemlerle değiştirme.",
      "check": "−1 için alt sıkı koşul yanlış; 3 için üst eşitlik doğru."
    },
    {
      "code": "Q29",
      "prompt": "Gerçek x için x>1 ve x≤4 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(1, 4]",
        "[1, 4]",
        "(1, 4)",
        "ℝ",
        "∅"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki ışının ortak bölgesini al.",
      "steps": [
        "Alt koşul (1,∞).",
        "Üst koşul (−∞,4].",
        "Kesişim (1,4]."
      ],
      "optionReasons": [
        "1 dışarıda, 4 içeride; aradaki değerler iki koşulu da sağlar.",
        "Bu seçenek x=1 değerini içerir. İlk koşulda 1>1 ve 1≤4 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=4 değerini dışarıda bırakır. İlk koşulda 4>1 ve 4≤4 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0>1 ve 0≤4 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=5/2 değerini dışarıda bırakır. İlk koşulda 5/2>1 ve 5/2≤4 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Ve yerine veya kullanarak tüm alanı alma.",
      "check": "2 uygundur; 0 ve 5 değildir."
    },
    {
      "code": "Q30",
      "prompt": "Gerçek x için −2<x≤5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(-2, 5]",
        "[-2, 5]",
        "(-2, 5)",
        "[-2, 5)",
        "(−∞, 5]"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Alt sıkı, üst eşitliği kabul ediyor.",
      "steps": [
        "−2 hariç, 5 dahil.",
        "Aralık (−2,5]."
      ],
      "optionReasons": [
        "İki ucun kabulü farklı olduğundan sol parantez, sağ köşeli parantez gerekir.",
        "Bu seçenek x=-2 değerini içerir. İlk koşulda -2 < -2 ≤ 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=5 değerini dışarıda bırakır. İlk koşulda -2 < 5 ≤ 5 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-2 değerini içerir. İlk koşulda -2 < -2 ≤ 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-3 değerini içerir. İlk koşulda -2 < -3 ≤ 5 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "İki ucu aynı tür çizme.",
      "check": "−2 uygun değil; 5 uygun."
    },
    {
      "code": "Q31",
      "prompt": "Gerçek x için x≤−4 veya x>1 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, -4] ∪ (1, ∞)",
        "[-4, 1)",
        "∅",
        "ℝ",
        "(−∞, -4) ∪ [1, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki ayrı ışının birleşimini al.",
      "steps": [
        "İlk küme (−∞,−4].",
        "İkinci küme (1,∞).",
        "Birleşim iki parçadır."
      ],
      "optionReasons": [
        "−4 dahil, 1 hariç; aradaki değerler iki koşulun hiçbirini sağlamadığı için dışarıdadır.",
        "Bu seçenek x=-5 değerini dışarıda bırakır. İlk koşulda -5≤−4 veya -5>1 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-5 değerini dışarıda bırakır. İlk koşulda -5≤−4 veya -5>1 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-3/2 değerini içerir. İlk koşulda -3/2≤−4 veya -3/2>1 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-4 değerini dışarıda bırakır. İlk koşulda -4≤−4 veya -4>1 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "İki sınırın arasını çözüm diye doldurma.",
      "check": "−4 ve 2 uygun; 0 ve 1 uygun değil."
    },
    {
      "code": "Q32",
      "prompt": "a gerçek ve a>0 olmak üzere a·x<6 için her pozitif a’da geçerli eşdeğer çözüm biçimi hangisidir?",
      "options": [
        "x<6/a",
        "x>6/a",
        "x≤6/a",
        "x<−6/a",
        "x=6/a"
      ],
      "knowledge": [
        "Pozitif sayıya bölme yönü korur."
      ],
      "strategy": "a’nın pozitif olduğu verildiğinden iki tarafı a’ya böl.",
      "steps": [
        "a·x/a<6/a.",
        "x<6/a; eşit sınır alınmaz."
      ],
      "optionReasons": [
        "Pozitif a ile bölme sıkı < işaretini korur.",
        "a=2’de x=0 başlangıcı sağlar ama x>3 kümesine girmez.",
        "x=6/a sınırında ilk iki taraf 6 olur; sıkı 6<6 yanlış olduğundan ≤ fazla değer alır.",
        "a=2’de x=0 uygundur ama x<−3 içinde değildir.",
        "Sınır x=6/a başlangıçta eşitlik verir ve kabul edilmez."
      ],
      "commonError": "Pozitif parametrede yönü çevirmeye veya sıkılığı kaldırmaya gerek yok.",
      "check": "a=2 için x<3; x=0 uygun, 3 uygun değildir."
    },
    {
      "code": "Q33",
      "prompt": "a gerçek ve a<0 olmak üzere a·x<6 için her negatif a’da geçerli eşdeğer çözüm biçimi hangisidir?",
      "options": [
        "x>6/a",
        "x<6/a",
        "x≥6/a",
        "x>−6/a",
        "x=6/a"
      ],
      "knowledge": [
        "Negatif sayıya bölme yönü ters çevirir."
      ],
      "strategy": "Bölen a’nın negatif oluşunu yön kararına kat.",
      "steps": [
        "İki tarafı a’ya bölünce < yönü > olur.",
        "x>6/a; eşit sınır alınmaz."
      ],
      "optionReasons": [
        "Negatif bölmenin doğru dönüşümü x>6/a’dır.",
        "a=−2’de x=0 ilk koşulu sağlar ama x<−3 içinde değildir.",
        "Sınır x=6/a için ilk iki taraf 6 olur; sıkı koşul eşitliği kabul etmez.",
        "a=−2’de x=0 uygundur ama x>3 onu dışarıda bırakır.",
        "Sınır x=6/a eşitlik verdiğinden çözüm değildir."
      ],
      "commonError": "Negatif bölmede yalnız sınırın işaretini değil karşılaştırma yönünü de değiştir.",
      "check": "a=−2 için x>−3; 0 uygun, −3 uygun değildir."
    },
    {
      "code": "Q34",
      "prompt": "a=0 iken a·x<6 eşitsizliğinin gerçek çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "∅",
        "{0}",
        "x<6",
        "x>6"
      ],
      "knowledge": [
        "Sıfır katsayıya bölünmez; kalan sabit koşul değerlendirilir."
      ],
      "strategy": "Önce a yerine 0 koy.",
      "steps": [
        "0·x<6 → 0<6.",
        "Bu doğru koşul x’ten bağımsızdır; bütün gerçek sayılar çözüm."
      ],
      "optionReasons": [
        "0<6 her x için doğru olduğundan ÇK=ℝ.",
        "Çözümsüz olsaydı sabit koşul yanlış olmalıydı; 0<6 doğrudur.",
        "0 uygundur ama tek değildir; 100 de aynı 0<6 koşulunu verir.",
        "x=10 da uygundur; bu seçenek gereksiz bir üst sınır koyar.",
        "x=0 da uygundur; bu seçenek geçerli değerleri dışarıda bırakır."
      ],
      "commonError": "0’a bölüp 6/0 gibi bir sınır üretme.",
      "check": "x=−100 ve 100 için aynı 0<6 doğru kalır."
    },
    {
      "code": "Q35",
      "prompt": "−3<2 ilişkisinin iki tarafı −1 ile çarpılıyor. Aynı işleme ait doğru yeni karşılaştırma hangisidir?",
      "options": [
        "3>−2",
        "3<−2",
        "−3>2",
        "−2>3",
        "3=−2"
      ],
      "knowledge": [
        "Negatif çarpma sayı doğrusunda yansımadır ve yönü çevirir."
      ],
      "strategy": "İki yeni değeri ayrı hesapla ve sıralarını karşılaştır.",
      "steps": [
        "(−3)(−1)=3, 2(−1)=−2.",
        "Doğru sıra 3>−2."
      ],
      "optionReasons": [
        "İki çarpım 3 ve −2, negatif çarpmayla < yönü > olur.",
        "3, −2’den küçük değildir; yön çevrilmemiş.",
        "Bu değerler çarpma sonuçları olan 3 ve −2’ye uymuyor; −3>2 de yanlıştır.",
        "−2, 3’ten büyük değildir.",
        "3 ile −2 eşit değildir; çarpma sıkı ilişkiyi eşitliğe dönüştürmez."
      ],
      "commonError": "Yalnız bir tarafı çarpma veya işareti eski yönde bırakma.",
      "check": "Sayı doğrusunda 3, −2’nin sağındadır."
    },
    {
      "code": "Q36",
      "prompt": "−3<2 ilişkisinin iki tarafına −5 ekleniyor. Aynı işleme ait doğru yeni karşılaştırma hangisidir?",
      "options": [
        "−8<−3",
        "−8>−3",
        "2<−3",
        "−3>2",
        "8<3"
      ],
      "knowledge": [
        "Aynı sayıyı eklemek yönü değiştirmez; eklenen sayının negatif olması bunu bozmaz."
      ],
      "strategy": "İki tarafa ayrı ayrı −5 ekle.",
      "steps": [
        "−3+(−5)=−8; 2+(−5)=−3.",
        "Yön aynı: −8<−3."
      ],
      "optionReasons": [
        "Aynı kaydırma iki sayıyı −8 ve −3 yapar; < korunur.",
        "Negatif sayı eklemek negatifle çarpma değildir; > dönüşümü yanlış.",
        "Sol tarafta −3−5 sonucu 2 değil −8 olmalı; 2<−3 de yanlıştır.",
        "Bu, ilk ilişkinin tersidir ve ekleme sonucu değildir.",
        "8<3 yanlış; toplama değerleri ve işaretleri hatalı."
      ],
      "commonError": "Bir eksi işareti görmek her işlemde yönü çevirmek anlamına gelmez.",
      "check": "−8, −3’ten küçüktür; aradaki fark aynı 5 kalır."
    },
    {
      "code": "Q37",
      "prompt": "Bir eşitsizliği x−1 ifadesine bölmeden önce neden x’in durumları ayrılmalıdır?",
      "options": [
        "x<1’de bölen negatif, x=1’de sıfır, x>1’de pozitiftir.",
        "x−1 her gerçek x’te pozitiftir.",
        "x−1 her gerçek x’te negatiftir.",
        "x=1 iken bölen 1 olur ve bölme yapılır.",
        "İfadede çıkarma olduğu için bölmenin işareti önem taşımaz."
      ],
      "knowledge": [
        "Bölenin pozitifliği yönü korur, negatifliği yönü çevirir; sıfırda bölme tanımsızdır."
      ],
      "strategy": "x−1’in 0 olduğu değeri ve iki yanındaki işaretleri bul.",
      "steps": [
        "x−1=0 → x=1.",
        "1’in solunda negatif, sağında pozitif; sıfırda bölme yapılamaz."
      ],
      "optionReasons": [
        "Üç dalın tümünü ve gerekli yön/sıfır denetimini doğru verir.",
        "x=0 için x−1=−1; her zaman pozitif değildir.",
        "x=2 için x−1=1; her zaman negatif değildir.",
        "x=1 için 1−1=0; 1 değil ve bölme tanımsızdır.",
        "Önemli olan ifadenin işareti ve sıfır olasılığıdır; çıkarma sembolü bunu ortadan kaldırmaz."
      ],
      "commonError": "Seçilen tek x’in işaretini bütün x’lere genelleme.",
      "check": "x=0, 1, 2 sırasıyla negatif, sıfır ve pozitif örneklerdir."
    },
    {
      "code": "Q38",
      "prompt": "1<2 ilişkisinin iki tarafı 0 ile çarpılıyor. Doğru açıklama hangisidir?",
      "options": [
        "Yeni 0<0 ifadesi yanlıştır; bu işlem sıkı ilişkiyi eşdeğer biçimde korumaz.",
        "0<0 doğrudur, çünkü iki taraf aynıdır.",
        "Sıfıra bölme yapıldığı için işlem tanımsızdır.",
        "Bu işlem aslında iki tarafa 0 eklemektir.",
        "Yeni doğru ilişki 0>0 olur."
      ],
      "knowledge": [
        "0 ile çarpma tanımlıdır ama sıfır olmayan çarpma gibi tersinir bir eşdeğer dönüşüm değildir."
      ],
      "strategy": "İki çarpımı ve sıkı işareti birlikte değerlendir.",
      "steps": [
        "1×0=0 ve 2×0=0.",
        "0<0 yanlış; doğru bir sıkı eşitsizlik bu işlemle korunmadı."
      ],
      "optionReasons": [
        "İki değer de 0 ve 0 kendisinden küçük değildir; eşdeğerlik kaybolur.",
        "Aynı iki değer eşittir ama sıkı küçük değildir.",
        "Yapılan işlem 0 ile çarpma; sıfıra bölme değil, tanımlıdır.",
        "Çarpma ile toplama farklı işlemlerdir; burada değerler sıfıra dönüştü.",
        "0 kendisinden büyük de değildir; yön değiştirmek kaybı onarmaz."
      ],
      "commonError": "Sıfırla çarpma ile sıfıra bölmeyi veya sıfır eklemeyi aynı işlem sayma.",
      "check": "Başlangıç 1<2 doğru; sonuç 0<0 yanlış olduğundan aynı koşul korunmamıştır."
    },
    {
      "code": "Q39",
      "prompt": "Yeni bir kursun sabit ücreti 150 TL, ders başı ücreti 70 TL’dir. Toplam ücret 640 TL’den az olmalıdır. Negatif olmayan tam sayı olarak en fazla kaç ders alınabilir?",
      "options": [
        "6",
        "5",
        "7",
        "8",
        "9"
      ],
      "knowledge": [
        "Toplam gider = sabit gider + birim gider × adet.",
        "Adet negatif olmayan tam sayı olmalı; en büyük adetten hemen sonrakini de denetle."
      ],
      "strategy": "n adet için 150+70n < 640 kur.",
      "steps": [
        "70n < 490.",
        "n < 7; tam sayı alanında en büyük uygun değer 6.",
        "6 adet 570 TL; 7 adet 640 TL."
      ],
      "optionReasons": [
        "6 için toplam 570 TL sınırı sağlar; hemen sonraki 7 için 640 TL, <640 koşulunu sağlamaz. Bu yüzden en büyük uygun tam sayı 6 olur.",
        "5 adet için toplam 500 TL olur. Bu tutar uygun olsa da en büyük değildir; 6 adet de koşulu sağlar.",
        "7 adet için toplam 640 TL olur. Bu tutar <640 bütçe koşulunu sağlamaz.",
        "8 adet için toplam 710 TL olur. Bu tutar <640 bütçe koşulunu sağlamaz.",
        "9 adet için toplam 780 TL olur. Bu tutar <640 bütçe koşulunu sağlamaz."
      ],
      "commonError": "Gerçek sayı sınırını bağlamın tam sayı adedine dönüştür; sıkı sınırdaki eşit adedi alma.",
      "check": "6 uygundur, 7 uygun değildir; ders başı ücret 70>0 olduğu için daha sonraki adetler de sınırı geçer."
    },
    {
      "code": "Q40",
      "prompt": "Ek aktarım sorusu: gerçek x için 5(x−2)>5x−7 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "ℝ",
        "{0}",
        "(−∞, 0)",
        "(0, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Dağıt ve aynı x terimlerini çıkar.",
      "steps": [
        "5x−10>5x−7.",
        "−10>−7 yanlış; hiçbir x bunu değiştiremez."
      ],
      "optionReasons": [
        "Değişkenden bağımsız yanlış koşul kaldığından çözüm ∅.",
        "Bu seçenek x=-1 değerini içerir. İlk koşulda -15 > -12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda -10 > -7 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-1 değerini içerir. İlk koşulda -15 > -12 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=1 değerini içerir. İlk koşulda -5 > -2 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Önceki < örneği ℝ veriyordu; işaret değişince sabit koşulu yeniden değerlendir.",
      "check": "Her x için sol taraf sağdan 3 küçüktür; > olamaz."
    },
    {
      "code": "Q41",
      "prompt": "u=b/1000 ve b TL cinsinden olsun. 10<u<30 koşulunun b için çözüm kümesi hangisidir?",
      "options": [
        "(10000, 30000)",
        "(10, 30)",
        "[10000, 30000]",
        "(-30000, -10000)",
        "(10000, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Üç tarafı pozitif 1000 ile çarp.",
      "steps": [
        "10000<b<30000.",
        "Yönler ve sıkı uç kabulü korunur."
      ],
      "optionReasons": [
        "b=1000u olduğundan sınırlar 1000 ile çarpılır; iki uç açık kalır.",
        "Bu seçenek b=20 değerini içerir. İlk koşulda 10 < 1/50 < 30 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=10000 değerini içerir. İlk koşulda 10 < 10 < 30 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=-20000 değerini içerir. İlk koşulda 10 < -20 < 30 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=30000 değerini içerir. İlk koşulda 10 < 30 < 30 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "TL ile bin-TL sayısal değerlerini aynı değişken değeri sanma.",
      "check": "b=20000, u=20 uygundur; b=10000 ve 30000 uçlarda reddedilir."
    },
    {
      "code": "Q42",
      "prompt": "|b−20000|, b ile 20000 arasındaki uzaklığı göstersin. Bu uzaklık 10000 TL’den az ise b’nin çözüm kümesi hangisidir?",
      "options": [
        "(10000, 30000)",
        "[10000, 30000]",
        "(0, 10000)",
        "{20000}",
        "(−∞, 10000) ∪ (30000, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "Merkezden 10000 sola ve sağa git; sıkı uzaklıkta iki sınırı alma.",
      "steps": [
        "20000−10000=10000, 20000+10000=30000.",
        "Uzaklık 10000’den küçük: 10000<b<30000."
      ],
      "optionReasons": [
        "Merkezin iki yanındaki açık aralık uzaklık koşulunu tam karşılar.",
        "Bu seçenek b=10000 değerini içerir. İlk koşulda |10000−20000|=10000 < 10000 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=5000 değerini içerir. İlk koşulda |5000−20000|=15000 < 10000 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek b=15000 değerini dışarıda bırakır. İlk koşulda |15000−20000|=5000 < 10000 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek b=-1 değerini içerir. İlk koşulda |-1−20000|=20001 < 10000 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Mutlak değer çizgisini yalnız çıkarma işlemi veya tek kök sanma.",
      "check": "20000’in uzaklığı 0; 10000 ve 30000’in uzaklığı tam 10000 olduğundan uçlar hariç."
    },
    {
      "code": "Q43",
      "prompt": "Yeni aktarım sorusu: gerçek x için −7<−3x+2≤11 eşitsizliğinin çözüm kümesi hangisidir?",
      "options": [
        "[-3, 3)",
        "(-3, 3)",
        "[-3, 3]",
        "(-3, 3]",
        "(3, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki koşulu ayrı çöz; negatif −3’e bölmede yönler döner.",
      "steps": [
        "−3x+2>−7 → −3x>−9 → x<3.",
        "−3x+2≤11 → −3x≤9 → x≥−3.",
        "Kesişim [−3,3)."
      ],
      "optionReasons": [
        "Alt −3 dahil ve üst 3 hariç; negatif katsayı sonunda sayısal sınırlar yeniden sıralanır.",
        "Bu seçenek x=-3 değerini dışarıda bırakır. İlk koşulda -7 < 11 ≤ 11 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=3 değerini içerir. İlk koşulda -7 < -7 ≤ 11 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-3 değerini dışarıda bırakır. İlk koşulda -7 < 11 ≤ 11 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-3 değerini dışarıda bırakır. İlk koşulda -7 < 11 ≤ 11 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "Negatif bölmeden sonra eski soldan sağa sırayı aynen kopyalama.",
      "check": "−3 için orta 11 üst eşitliği sağlar; 3 için orta −7, alt sıkı koşulu sağlamaz."
    },
    {
      "code": "Q44",
      "prompt": "Yeni aktarım sorusu: gerçek x için x≥6 ve x≤6 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{6}",
        "∅",
        "ℝ",
        "[6, ∞)",
        "(−∞, 6]"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki kapalı ışının ortak sınırını al.",
      "steps": [
        "İlk koşul 6 ve üstü, ikinci 6 ve altı.",
        "Yalnız 6 ortaktır: {6}."
      ],
      "optionReasons": [
        "6 iki koşulu da eşitlikle sağlar; başka bir değer ortak değildir.",
        "Bu seçenek x=6 değerini dışarıda bırakır. İlk koşulda 6≥6 ve 6≤6 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0≥6 ve 0≤6 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=7 değerini içerir. İlk koşulda 7≥6 ve 7≤6 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda 0≥6 ve 0≤6 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur."
      ],
      "commonError": "Tek noktayı boş küme veya bütün gerçekler sanma.",
      "check": "6 uygun; 5 ilk koşulu, 7 ikinci koşulu sağlamaz."
    },
    {
      "code": "Q45",
      "prompt": "Yeni aktarım sorusu: gerçek x için x<−1 veya x>−1 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, -1) ∪ (-1, ∞)",
        "ℝ",
        "∅",
        "(−∞, -1)",
        "(-1, ∞)"
      ],
      "knowledge": [
        "Çözüm kümesi ilk koşulu sağlayan bütün izinli değerlerdir.",
        "Açık uç hariç, kapalı uç dahil; negatif çarpma veya bölme yönü ters çevirir."
      ],
      "strategy": "İki açık ışını birleştir; temas noktası iki tarafta da hariç.",
      "steps": [
        "−1’in solu veya −1’in sağı alınır.",
        "−1 alınmaz; birleşim bütün gerçeklerden bu tek noktayı çıkarır."
      ],
      "optionReasons": [
        "İki açık uç temas ettiği için −1 deliği kalır; geri kalan bütün gerçek değerler uygundur.",
        "Bu seçenek x=-1 değerini içerir. İlk koşulda -1<−1 veya -1>−1 yanlıştır; bu nedenle uygun olmayan bir değer çözüme eklenmiş olur.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda -2<−1 veya -2>−1 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda 0<−1 veya 0>−1 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur.",
        "Bu seçenek x=-2 değerini dışarıda bırakır. İlk koşulda -2<−1 veya -2>−1 doğrudur; bu nedenle geçerli bir çözüm kaybedilmiş olur."
      ],
      "commonError": "İki ışın birleşti diye arada hariç olan noktayı doldurma.",
      "check": "−2 ve 0 uygun; −1 iki sıkı koşulu da sağlamaz."
    }
  ],
  "sheet": [
    {
      "title": "İşaret ve uç kabulü",
      "text": [
        "<, >: eşit sınır hariç, açık nokta. ≤, ≥: sınır dahil, dolu nokta. Çözüm tek örnek değil, bütün uygun değerlerin kümesidir.",
        "x<3 → (−∞,3); x≥−1 → [−1,∞); −2<x≤5 → (−2,5]. Sonsuz tarafta her zaman yuvarlak parantez kullan."
      ]
    },
    {
      "title": "Eşdeğer dönüşüm",
      "text": [
        "Aynı sayıyı eklemek/çıkarmak yönü korur; aynı pozitif sayıyla çarpmak/bölmek korur; aynı negatif sayıyla çarpmak/bölmek yönü ters çevirir.",
        "Bölen sıfır olamaz. 0 ile çarpma çözüm bilgisini korumaz: 1<2 → 0<0 yanlış. İşareti bilinmeyen çarpan/bölen için pozitif, negatif, sıfır durumlarını ayır."
      ]
    },
    {
      "title": "Eksiye değil, işleme bak",
      "text": [
        "−3x>12 → x<−4; x−3>12 → x>15. İlkinde negatif katsayıya bölme, ikincisinde iki tarafa +3 ekleme var.",
        "−2x<8 → x>−4; −5x≤20 → x≥−4. Negatif bölmede yön döner ama eşitlik kabulü korunur."
      ]
    },
    {
      "title": "Altı adım",
      "text": [
        "Sayı alanını/tek değişkenli doğrusal yapıyı tanı; parantezi aç; benzer terimleri topla; değişken/sabiti ayır; son katsayının işaretine göre çöz; aralık/şekil ve ilk ifadede kontrol et.",
        "3(2x−5)≤4x+7 → 6x−15≤4x+7 → 2x≤22 → x≤11. Bütün terimleri koru."
      ]
    },
    {
      "title": "Sıfır katsayı ve parametre",
      "text": [
        "a·x<6: a>0 ise x<6/a; a<0 ise x>6/a; a=0 ise 0<6 doğru olduğundan ℝ.",
        "5(x−2)<5x−7 → −10<−7 → ℝ. Aynı ifadede > kullanılırsa ∅. Sıfıra bölerek sınır üretme."
      ]
    },
    {
      "title": "Bileşik eşitsizlik",
      "text": [
        "−2<3x+1≤10 → −3<3x≤9 → −1<x≤3, yani (−1,3].",
        "2≤(x−1)/3<5 → 6≤x−1<15 → 7≤x<16, yani [7,16). Pozitif paydada üç tarafı birlikte değiştir.",
        "−4≤(x+2)/2<5 → −10≤x<8, yani [−10,8). Ek negatif katsayı denemesinde iki koşulu ayrı çözerek yönü kontrol et."
      ]
    },
    {
      "title": "Ve, veya ve temas",
      "text": [
        "Ve: kesişim. x>1 ve x≤4 → (1,4]. x≤−2 ve x>3 → ∅.",
        "Veya: birleşim. x≤−2 veya x>3 → (−∞,−2]∪(3,∞).",
        "Ek uç denemeleri: x≥2 ve x≤2 → {2}; x<2 veya x>2, yalnız 2’yi dışarıda bırakır."
      ]
    },
    {
      "title": "Sözcük ve sayı alanı",
      "text": [
        "En az / zarar etmez eşitliği kabul eder: ≥. En çok: ≤. Daha fazla / kâr: >. Daha az / zarar: <.",
        "Adet için n∈{0,1,2,…}. n<8 en fazla 7, n≤8 en fazla 8 verir. Her zaman bulunan adedi ve hemen sonrakini ilk giderde denetle."
      ]
    },
    {
      "title": "Kurs ve konser bütçesi",
      "text": [
        "240+80n≤880 → n≤8 → en çok 8 ders; 8 için 880 TL, 9 için 960 TL.",
        "1200+60n≤4200 → n≤50 → en çok 50 kişi; 50 için 4200 TL, 51 için 4260 TL. Sabit ücret n=0’da da uygulanır, birim gider pozitiftir."
      ]
    },
    {
      "title": "Kâr/zarar aralığı",
      "text": [
        "Maliyet 40+u, ilk gelir 2u+30 ve kâr: u>10. İkinci gelir 3u−20 ve zarar: u<30. İkisi birlikte (10,30).",
        "İlk koşul zarar etmez diye değişirse [10,30) olur. Maliyet 80+b, gelir 2b+20 ve zarar etmez koşulu b≥60 verir."
      ]
    },
    {
      "title": "Birim ve seçili resmî atıf",
      "text": [
        "u=b/1000: u bin TL cinsinden sayısal değer, b TL. 10<u<30 ⇔ 10000<b<30000. b ile u’nun sayısal değerlerini karıştırma.",
        "Aralığın merkezi 20000, yarıçapı 10000 TL; |b−20000|<10000. Seçili gerçek 2024 TYT Matematik 8 ve A anahtarı doğrulandı. Genel mutlak değer konusu veya bütün ÖSYM arşivi işlenmiş sayılmaz."
      ]
    },
    {
      "title": "Hata onarma ve hatırlama",
      "text": [
        "İlk yanlış dönüşümü bul: negatif bölmede unutulan yön, toplamada gereksiz yön, sıkı uçta dolu nokta, bilinmeyen işarete kör bölme, adet yerine kesirli sonuç.",
        "Kaynağı kapatıp çözümü üret; iç/dış/uç dene; karşı örnekle nedenini söyle. Şekli kurcalamak, süre geçirmek ve elle çalıştım demek ustalık veya XP kanıtı değildir."
      ]
    }
  ]
};

const items = [...originalPack.items, ...source011Revision.items];
const promptsByCode = new Map(items.map(({ code, prompt }) => [code, prompt]));
const practiceRows = source011PracticeItemCodes.map((code, index) => {
  const prompt = promptsByCode.get(code);
  if (prompt === undefined) throw new Error(`Missing source 011 practice item: ${code}`);
  return [String(index + 1), prompt];
});

export const basicInequalitiesSource037Pack: Inequality037Pack = {
  ...originalPack,
  source: [
    source011Revision.source,
    "2024 TYT Temel Matematik 8: kitapçık fiziksel PDF s. 26, basılı s. 24 ve cevap anahtarı PDF s. 43. Resmî b, TL cinsindedir. 10000<b<30000 ve A seçeneği |b−20000|<10000. Öğretim örneğinde bin TL ölçeği u=b/1000 adıyla ayrılır.",
    ...source011Figure.referencePages,
    "https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=26",
    "https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=43",
  ].join(" "),
  sections: [
    ...originalPack.sections,
    ...source011Revision.sections.map((section) => section.code === "S40"
      ? { ...section, table: { headers: ["Sıra", "Soru"], rows: practiceRows } }
      : section),
  ],
  examples: [...originalPack.examples, ...source011Revision.examples],
  recall: [...originalPack.recall, ...source011Revision.recall],
  items,
  sheet: [...originalPack.sheet, ...source011Revision.sheet],
};

const pack=basicInequalitiesSource037Pack;
const objectives=["İşlem ve işaret koşulunu açıklayarak bütün çözüm kümesini aralık ve sayı doğrusunda göster.","Bileşik koşulları, ve/veya bağlacını, açık/kapalı sınırları ve parametrenin üç işaret dalını ayır.","Bütçe ve kâr/zararı birim, tam sayı alanı ve sınır denetimiyle modelle; her seçeneğin nedenini açıkla.", ...source011Revision.objectives];
export const basicInequalitiesSource037Guides:LessonGuide[]=[{id:pack.id,minutes:pack.minutes,source:pack.source,objectives,sections:pack.sections,examples:pack.examples,recall:pack.recall}];
export const basicInequalitiesSource037Lessons:Lesson[]=[{id:pack.id,title:txt(pack.title),subjectId:"tyt-matematik",minutes:pack.minutes,objectives:objectives.map(txt),source:txt(pack.source),tags:["kaynakli-anlatim","Özgün öğretim soruları"],body:pack.sections.map((s)=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),questions:pack.items.map((item,index):Question=>{const order=item.options.map((_,i)=>(i+((2*index+1)%5))%5);return{id:`f037-${pack.id}-${index+1}`,prompt:txt(item.prompt),options:order.map((i)=>txt(item.options[i])),answer:order.indexOf(0),hint:txt(item.strategy),explanation:txt(item.steps.join(" ")+" Denetim: "+item.check),skill:pack.id,guidance:{knowledge:item.knowledge,strategy:item.strategy,steps:item.steps,optionReasons:order.map((i)=>item.optionReasons[i]),commonError:item.commonError,check:item.check}};})}];
export const basicInequalitiesSource037Sheets: CheatSheet[] = [{
  topicId: `topic-${pack.id}`,
  lessonId: pack.id,
  title: pack.title,
  subjectId: "tyt-matematik",
  sections: pack.sheet,
  cautions: [
    "Negatif çarpma veya bölmede yön döner; aynı sayıyı eklerken dönmez.",
    "Sıfıra veya işareti bilinmeyen ifadeye koşulsuz bölme; parametrenin sıfır dalını ayır.",
    "Sıkı uç, tam sayı adedi ve TL/bin TL dönüşümünü ilk koşulda denetle.",
    ...source011Revision.sheetCautions,
  ],
  examples: [
    ...[pack.examples[7], pack.examples[15], pack.examples[18]].map((e) => ({
      title: e.title,
      prompt: e.prompt,
      steps: e.steps.map((s) => s.explanation),
      answer: e.answer,
    })),
    ...source011Revision.sheetExamples,
  ],
  recall: [...originalPack.recall.slice(0, 4), ...source011Revision.sheetRecall],
  source: pack.source,
}];
