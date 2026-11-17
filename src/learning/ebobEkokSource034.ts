import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
interface Ebob034Item extends QuestionGuidance { code:string;prompt:string;options:string[] }
interface Ebob034Pack {id:string;title:string;minutes:number;source:string;sections:(GuideSection&{code:string})[];examples:(WorkedExample&{code:string})[];recall:{prompt:string;answer:string}[];items:Ebob034Item[];sheet:CheatSection[]}
// Reviewed source034 teaching; study evidence and PDF closure are verified separately.
export const ebobEkokSource034Pack:Ebob034Pack = {
  "id": "tyt-mat-ebob-ekok-kaynak-034",
  "title": "EBOB ve EKOK: ortak birimden ortak ana",
  "minutes": 140,
  "sections": [
    {
      "code": "S01",
      "title": "Bölen ile katın yönünü ayır",
      "paragraphs": [
        "Pozitif tam sayılar 1, 2, 3, … biçimindedir; bu ünitede başlangıç sayıları sıfır veya negatif değildir. a=d×k yazılabiliyor ve k bir tam sayı oluyorsa d, a’yı kalansız böler. d|a işareti “d, a’yı böler” diye okunur. 12=3×4 olduğundan 3|12; aynı bağıntıda 12, 3’ün katıdır. Bölen sayının içine sığan ortak birim, kat ise sayının tam tekrarlarıdır.",
        "5, 12’nin böleni değildir: 12=5×2+2; kalan 2’dir. × çarpma, / bölme, = eşitlik; < küçük, ≤ küçük veya eşit, > büyük anlamına gelir. Bir uzunluğu ortak parçalara bölmekle iki düzenin aynı toplamı üretmesini ayır: ilkinde ortak bölen, ikincisinde ortak kat ararsın. “En az” sözcüğünü görüp işlem seçmek yerine aranan niceliğin neyi böldüğünü yaz."
      ]
    },
    {
      "code": "S02",
      "title": "Önce ortak küme, sonra en büyük veya en küçük",
      "paragraphs": [
        "EBOB, En Büyük Ortak Bölen; EKOK, En Küçük Ortak Kat demektir. 12’nin pozitif bölenleri 1, 2, 3, 4, 6, 12; 18’inkiler 1, 2, 3, 6, 9, 18’dir. Ortak küme 1, 2, 3, 6 olduğundan EBOB(12, 18)=6. Bir ortak bölen bulmak en büyüğü bulmak değildir: 3 de ortaktır ama 6 daha büyüktür.",
        "Pozitif katlar 12, 24, 36,… ve 18, 36, 54,… diye ilerler. İlk pozitif kesişim 36 olduğundan EKOK(12, 18)=36. 0 her iki sayının katı olsa da EKOK için pozitif kat aranır. 72 ortak kattır fakat en küçüğü değildir. Kontrol olarak EBOB başlangıç sayılarının her birini bölmeli, EKOK da her birine tam bölünmelidir; bu bölme kontrolü tek başına en büyük/en küçük olmayı kanıtlamaz."
      ]
    },
    {
      "code": "S03",
      "title": "Asal kopyaları üslerle say",
      "paragraphs": [
        "Asal sayı 1’den büyük olup yalnız 1 ve kendisine tam bölünür: 2, 3, 5, 7 gibi. 1 asal değildir. Üs, aynı çarpanın tekrarını sayar: 2³=2×2×2=8. 72’yi 2’ye üç, ardından 3’e iki kez bölerek 1’e ulaşırsın; bu yüzden 72=2³×3². Çarpanları yeniden çarparak ayrılışı denetle.",
        "120=2³×3×5. Ortak bölenin her asal kopyası iki sayıda da bulunmalı; bu nedenle her asal için küçük üs alınır. 72’de 5 yoktur; bunun üssü 0’dır ve 5⁰=1 çarpımı değiştirmez. Ortak kat ise her iki sayının bütün gereksinimini karşılamalı; her asal için büyük üs gerekir. “Küçük sayının bütün çarpanları” değil, her ayrı asalın küçük üssü seçilir."
      ],
      "table": {
        "headers": [
          "Asal",
          "72 içindeki üs",
          "120 içindeki üs",
          "EBOB / EKOK üssü"
        ],
        "rows": [
          [
            "2",
            "3",
            "3",
            "3 / 3"
          ],
          [
            "3",
            "2",
            "1",
            "1 / 2"
          ],
          [
            "5",
            "0",
            "1",
            "0 / 1"
          ]
        ]
      }
    },
    {
      "code": "S04",
      "title": "Üs kuralının neden en iyiyi verdiğini açıkla",
      "paragraphs": [
        "72 ve 120’de EBOB=2³×3=24; EKOK=2³×3²×5=360. Ortak bölenin 3 üssünü 2 yapsaydın 120’nin tek 3’ü yetmezdi. 5 ekleseydin 72’de hiç 5 bulunmadığından ortaklık bozulurdu. 24’e daha fazla asal kopyası eklenememesi en büyük oluşunun gerekçesidir.",
        "360’tan bir 3 kopyası çıkarsaydın 72’de gereken iki 3 kalmazdı; 5’i çıkarsaydın 120’nin gereksinimi eksik olurdu. Her asalın gerekli en yüksek üssünü almak ortak katı gereksiz büyütmeden kurar. Son bölme denetimi: 72/24=3, 120/24=5; 360/72=5, 360/120=3. Bütün bölümler tam sayıdır."
      ]
    },
    {
      "code": "S05",
      "title": "İki sayının çarpım bağını doğru kapsamda kullan",
      "paragraphs": [
        "a, b pozitif tam sayı, d=EBOB(a, b) ve m=EKOK(a, b) için a×b=d×m. Her asalın başlangıçtaki iki üssünün toplamı, küçük üs ile büyük üssün toplamına eşittir. Bu yüzden EKOK=(a/EBOB)×b. Önce tam bölmeyi yapmak gereksiz büyük bir ara çarpımı azaltır: (72/24)×120=360.",
        "Bu özdeşlik iki sayı içindir. Üç sayıda aynı ürün kuralını kullanma: 2×4×8=64, fakat EBOB(2, 4, 8)×EKOK(2, 4, 8)=2×8=16. Üç veya daha çok sayının EBOB/EKOK’unu her asalın küçük/büyük üssüyle bulabilir veya ikili ilerleyebilirsin: EBOB(a, b, c)=EBOB(EBOB(a, b), c); EKOK için de aynı yapı geçerlidir."
      ]
    },
    {
      "code": "S06",
      "title": "Aralarında asal, ikisi de asal demek değildir",
      "paragraphs": [
        "EBOB(a, b)=1 ise iki sayı aralarında asaldır. 8 ile 9 bileşik olsalar da ortak pozitif bölenleri yalnız 1’dir; EKOK’ları 8×9=72 olur. 6 ve 10 farklı sayılardır fakat EBOB=2; EKOK=60/2=30. “Farklı” olmak çarpımı doğrudan EKOK yapmaz.",
        "a, b’yi bölüyorsa EBOB=a ve EKOK=b’dir: 4|20 için 4 ve 20 bulunur. Ortak bölen 4’ten büyük olamaz; ortak katın en küçüğü zaten 20’dir. Aralarında asal iki sayının toplamı mutlaka asal değildir: 4 ve 5 için toplam 9’dur. Tek geçerli karşı örnek “daima” iddiasını çürütür; tek olumlu örnek ise her durumu kanıtlamaz."
      ]
    },
    {
      "code": "S07",
      "title": "Ortak böleni dışarı çıkar, kalan koşulu koru",
      "paragraphs": [
        "EBOB(a, b)=d ise a=dx, b=dy yaz. Burada x, y pozitif tam sayı ve EBOB(x, y)=1 olmalıdır; ortak bölenin hepsi dışarı çıkarılmıştır. x, y’nin ortak böleni 2 olsaydı a, b’nin ortak böleni en az 2 d olur, d’nin en büyük olduğu iddiası bozulurdu. EKOK=dxy olduğundan xy=m/d elde edilir.",
        "Önce d|m koşulunu denetle: d=3, m=20 için m/d tam sayı değildir ve uygun iki pozitif tam sayı yoktur. d=6, m=180 için xy=30; (2, 15) çifti a, b=(12, 90), (5, 6) çifti (30, 36) verir. Sadece çarpımı tutturmak yetmez; her çifti aralarında asal olma koşuluyla ele."
      ]
    },
    {
      "code": "S08",
      "title": "En küçük toplamı adayları tüketerek kanıtla",
      "paragraphs": [
        "d=4, m=48 için xy=12. Küçükten büyüğe x≤y çarpan çiftleri (1, 12),(2, 6),(3, 4) ile biter. İlk ve son çift aralarında asaldır; (2, 6) ortak 2 yüzünden geçersizdir. Gerçek sayılar (4, 48) veya (12, 16); toplamlar 52 ve 28’dir. En küçük 28, en büyük 52; ters çiftler yeni toplam üretmez.",
        "Sabit pozitif çarpımda yakın çarpanlar daha küçük toplam verir, fakat tam sayı ve aralarında asal koşullarını kaldırmaz. xy=36 için en yakın (6, 6) geçersizdir; geçerli (1, 36) ve (4, 9) çiftlerine bakılır. Bir adayı göstermek “olabilir”i kanıtlar; en küçük/en büyük için bütün daha iyi adayların neden elendiğini de açıklamak gerekir."
      ]
    },
    {
      "code": "S09",
      "title": "Öklid: büyük sayıyı aynı ortak bölenlerle küçült",
      "paragraphs": [
        "a=bq+r, 0≤r<b ise EBOB(a, b)=EBOB(b, r). a ile b’yi bölen d, a−bq=r’yi de böler. Tersine b ile r’yi bölen d, bq+r=a’yı da böler. İki çiftin ortak bölen kümeleri aynı olduğundan en büyükleri aynıdır. q bölüm, r kalan demektir.",
        "252=198×1+54; 198=54×3+36; 54=36×1+18; 36=18×2+0. Son sıfır olmayan kalan 18 EBOB’dur. Son 0, ortak bölen değil işlemin durma işaretidir. EKOK=(252/18)×198=2772; 2772/252=11 ve 2772/198=14. Küçük sayıda bölen listesi de yedektir; büyük sayıda Öklid daha az adayla sonuca götürür."
      ]
    },
    {
      "code": "S10",
      "title": "Kareyle kaplama: kenarın bölen olması gerekir",
      "paragraphs": [
        "36 cm ×24 cm dikdörtgeni eş karelerle doldururken karelerin kenarları dikdörtgene paralel, boşluk ve kesim kaybı yok olsun. Kare kenarı s ise 36/s ve 24/s pozitif tam sayı olmalı. En az kare için s olabildiğince büyük; s=EBOB(36, 24)=12 cm. Üç sütun ve iki satır, 6 kare verir.",
        "Alan kontrolü 36×24/12²=864/144=6’dır. cm uzunluğu, cm² alanı ölçer. Alanların bölünebilmesi tek başına kare kenarının her iki kenara tam uyduğunu kanıtlamaz; önce iki kenar bölümünü denetle. s=18, 36’ya uyar ama 24’e uymaz. s=6 geçerlidir fakat 24 kare gerektirir. Döndürülmüş karma kaplama, derz aralığı veya kesme kaybı farklı modeldir."
      ]
    },
    {
      "code": "S11",
      "title": "Aynı boy, üç farklı adet hesabı",
      "paragraphs": [
        "36 ve 24 cm iki ipi ayrı ayrı en uzun eş boy parçalara ayırırsan boy yine 12 cm’dir. Parça adedi 36/12+24/12=3+2=5: dikdörtgendeki satır×sütun burada toplama dönüşür. Her ip ayrı kesiliyorsa 3−1+2−1=3 kesim gerekir. Üst üste kesme izni, kesim sayısını değiştiren ayrı bir koşuldur.",
        "Aynı 36×24 dikdörtgenin kapalı çevresine, her köşeye gelecek en büyük eşit aralıklarla işaret koyarsan aralık 12 cm; çevre 2(36+24)=120 cm ve 120/12=10 işarettir. Kapalı çevrede başlangıç ve bitiş aynı noktadır; +1 ekleme. Açık doğru parçasında iki uç da dahilse nokta sayısı aralık sayısından 1 fazladır."
      ]
    },
    {
      "code": "S12",
      "title": "Periyot: ilk yeniden ortak an pozitif ortak kattır",
      "paragraphs": [
        "Başlangıçta birlikte çalışan A her 12 dakikada, B her 18 dakikada çalışsın. A’nın anları 0, 12, 24, 36,…; B’ninkiler 0, 18, 36,… olur. İlk yeniden ortak çalışma EKOK(12, 18)=36 dakika sonradır. 36/12=3 ve 36/18=2 tam döngüdür. EBOB olan 6 dakika iki cihazın döngüsünü bile tamamlamaz.",
        "Başlangıcın ortak ve aralıkların sabit olması gerekir. “Yeniden” sıfırdan sonraki ilk ortak anı ister; 0 başlangıçtır. 10’lu ve 15’li paketlerle ayrı ayrı tam paketlenebilen en küçük pozitif toplam da EKOK(10, 15)=30’dur; yüzey değişir, ortak kat yapısı kalır. Burada nesneleri kesip ortak parça üretmiyorsun."
      ]
    },
    {
      "code": "S13",
      "title": "Uçları ve saati doğru say",
      "paragraphs": [
        "12 ve 18 dakikalık ortak başlangıçlı döngülerin [0, 72] aralığındaki ortak anları 0, 36, 72: üç olay. Köşeli parantez uç dahil, yuvarlak parantez uç hariç demektir. [0, 72) aralığında 0 ve 36, başlangıç hariç (0, 72] aralığında 36 ve 72 bulunur. 72/36=2 aralık sayar; iki uç dahil olay sayısı 3’tür.",
        "Başlangıç saati 09.50 ise 36 dakika sonrası 10.26’dır. Önce 10 dakika ile 10.00’a, kalan 26 dakika ile 10.26’ya git. Saatin dakika alanı 60 tabanındadır; 09.86 yazılmaz. Her soruda olayın kaçıncı anı mı, geçen süre mi, saat gösterimi mi istendiğini ayır."
      ]
    },
    {
      "code": "S14",
      "title": "Başlangıç kayarsa iki ayrı diziyi karşılaştır",
      "paragraphs": [
        "A ilk kez 0’da, sonra her 12 dakikada; B ilk kez 6’da, sonra her 18 dakikada çalışırsa B’nin anları 6, 24, 42,… olur. A’nın 0, 12, 24,… dizisiyle ilk ortak an 24’tür. EKOK(12, 18)=36, ortak anlar bulunursa aralarındaki tekrar süresini anlatır; kaymış başlangıçtaki ilk anı tek başına vermez.",
        "Örneğin 10 dakikalık A, 0’da; 15 dakikalık B, 5’te başlarsa ilk ortak an 20’dir: A 0, 10, 20; B 5, 20. Başlangıç bilgisi hiç verilmezse periyotlar tek başına ilk ortak anı belirlemez. Verilmeyen başlangıcı 0 kabul edip kesin sonuç uydurma. Küçük örnekte ayrı kat listeleri güvenli ve görünür bir yoldur."
      ]
    },
    {
      "code": "S15",
      "title": "Bölme eşitliğinde kalan mutlaka bölenden küçüktür",
      "paragraphs": [
        "N=dq+r eşitliğinde N sayı, d pozitif bölen, q tam sayı bölüm ve 0≤r<d kalandır. 29=6×4+5 için kalan 5 geçerlidir; 6 ile bölmede kalan 6 olamaz. Kalansız bölme r=0 durumudur. Kalanı çıkarınca N−r=dq, yani d’nin tam katı kalır.",
        "N hem a hem b ile bölündüğünde aynı r kalanı veriyorsa N−r ikisinin ortak katıdır: N=EKOK(a, b)×k+r. Ayrıca r<a ve r<b gerekir. Farklı kalanlar varsa tek r çıkaramazsın: 6’ya bölünmede 1, 8’e bölünmede 3 kalanını veren 43 için 43−1=42, 8’in katı değildir; her ayrı koşulu kendi kalanı ile yaz."
      ]
    },
    {
      "code": "S16",
      "title": "Aynı kalanlı sayıda aralığın en iyi adayını bul",
      "paragraphs": [
        "8 ve 12 ile bölündüğünde 5 kalanını veren N için EKOK=24; N=24 k+5. N>100 istenirse k=3, 77 verir ve yetmez; k=4, 101 verir. Sonuç 101=8×12+5=12×8+5; 5 her iki bölenden küçüktür. Sınırdaki adayın bir öncesini elemek en küçük olduğunu açıklar.",
        "6 ve 8 ile bölündüğünde 1 kalanını veren N<200 için N=24 k+1. k=8 →193, k=9 →217 sınırı aşar; en büyük 193’tür. Bir uygun sayı bulmak optimumu kanıtlamaz. Aynı yapı, 6’lı ve 8’li gruplandırmada bir nesne artan toplamda da kullanılır. Sayı büyürken tüm sayıları denemek yerine ortak kat dizisindeki adayları dene."
      ]
    },
    {
      "code": "S17",
      "title": "Bilinmeyen bölen: her sayıdan kendi kalanını çıkar",
      "paragraphs": [
        "85 ve 133, aynı d’ye bölündüğünde 1 kalıyorsa d|84 ve d|132; ayrıca d>1. En büyük aday EBOB(84, 132)=12’dir. 85=12×7+1 ve 133=12×11+1. Kalanlar farklı olduğunda da her sayıyı kendine göre düzelt: 87’de 3, 134’te 2 kalan için yine 84 ve 132 kalır; d>3 koşuluyla 12 geçerlidir.",
        "EBOB, kalan sınırını kendiliğinden sağlamaz. 17 ve 25’te kalan 5 olsun: d, 12 ve 20’yi bölmeli, dolayısıyla d≤4; öte yandan d>5 gerekir. İki koşul çeliştiğinden çözüm yoktur. EBOB küçükse onun daha küçük bölenleri de sorunu çözemez. Artıkları modelleyen şeritlerde de kesim boyu aynı biçimde her kalansız kalanı böler."
      ]
    },
    {
      "code": "S18",
      "title": "Üç sayıda her asalın gereksinimini birlikte denetle",
      "paragraphs": [
        "18=2×3², 24=2³×3, 30=2×3×5. Her üçünün küçük üsleri EBOB=2×3=6; büyük üsleri EKOK=2³×3²×5=360 yapar. 5, ilk iki sayıda bulunmadığı için ortak bölenin içine girmez ama ortak kat için gerekir. EBOB bölümleri 3, 4, 5; EKOK bölümleri 20, 15, 12’dir.",
        "18×24×30=12.960 iken 6×360=2.160’tır; iki sayılı çarpım bağının üç sayıya taşınmadığını gör. Sayı adedi arttığında kuralı değil, her asal için karşılaştırdığın satır sayısını artırırsın. İkili hesap yaptığında da önce iki sayının sonucunu, sonra üçüncü sayıyla aynı işlemi uygula."
      ]
    },
    {
      "code": "S19",
      "title": "Bilinmeyen üçüncü sayı iki koşulu da sağlamalı",
      "paragraphs": [
        "EBOB(18, 12, x)=6 ve EKOK(18, 12, x)=360 olsun. İlk iki sayının EBOB’u 6, EKOK’u 36=2²×3². Hedef 360=2³×3²×5 olduğundan x, eksik 2³ ve 5’i taşımalıdır. EBOB(6, x)=6 koşulu ise 6|x gerektirir; dolayısıyla en az bir 3 de bulunmalıdır.",
        "En küçük x=2³×3×5=120. 40, EKOK’u 360 yapsa da 6’ya bölünmediği için EBOB’u bozar; 360 uygundur ama en küçük değildir. Çözüm sonunda EBOB(18, 12, 120)=6 ve EKOK(...)=360 diye iki ayrı yerine koyma yap. Sadece hedef EKOK’u kurmak eksik bir çözümdür."
      ]
    },
    {
      "code": "S20",
      "title": "Ortak bölenleri sayarken üs seçeneklerini çarp",
      "paragraphs": [
        "72 ve 120’nin ortak pozitif bölenleri tam olarak EBOB’ları 24’ün pozitif bölenleridir. 24=2³×3 için bölen 2ⁱ×3ʲ biçimindedir. i=0, 1, 2, 3 dört seçenek; j=0, 1 iki seçenek verir. 4×2=8 bölen: 1, 2, 3, 4, 6, 8, 12, 24. Burada i ve j sayıları değil asalın kaç kopyasını aldığını sayar.",
        "Genel olarak p, q farklı asal sayılar ve u, v negatif olmayan tam sayılar iken d=pᵘ×qᵛ için pozitif bölen sayısı (u+1)(v+1) olur; her 0 üssü de bir seçimdir. EBOB=1 için yalnız 1 ortak pozitif bölen vardır. Negatif ortak bölenler sorulursa pozitiflerin −1,−2,… biçimindeki eşleri de vardır: 24’ün 8 pozitif, 8 negatif, toplam 16 tam sayı böleni bulunur. Sıfır bölen değildir; varsayılan pozitif sayımı toplamla karıştırma."
      ]
    },
    {
      "code": "S21",
      "title": "Küp kurarken kenar oranının küpü alınır",
      "paragraphs": [
        "12 cm’lik tek renk küplerle bir dolu büyük küp; 18 cm’lik başka renk küplerle ayrı, eş büyüklükte bir dolu küp kurulsun. Küpler kesilmiyor, kenarlar paralel ve aynı büyük küp içinde iki boy karıştırılmıyor. Büyük kenar her iki küçük kenarın pozitif ortak katı; en küçüğü EKOK(12, 18)=36 cm’dir.",
        "12 cm’liklerde her eksende 3 küp; toplam 3×3×3=27. 18 cm’liklerde eksen başına 2; toplam 2³=8. 27×12³=8×18³=36³=46.656 cm³ hacim denetimini verir. Kenar cm, yüzey cm², dolu hacim cm³ birimindedir. Kenar oranını yalnız bir kez kullanmak 3 boyutlu sayımı eksiltir; keserek veya iki boyu karıştırarak doldurma farklı modeldir."
      ]
    },
    {
      "code": "S22",
      "title": "Yöntemi sözcüğe değil bölme yönüne göre seç",
      "paragraphs": [
        "Aranan boy bütün verileri kalansız bölecekse ortak bölen; aranan toplam her düzenin tam tekrarıysa ortak kat ararsın. EBOB ve EKOK birlikte verilmişse a=dx, b=dy ve aralarında asal x, y kullan. Aynı N aynı r kalanı veriyorsa N−r ortak kat; farklı sayılar bilinmeyen d’ye bölünüyorsa her sayıdan kendi kalanını çıkar, ortak bölen ara.",
        "Büyük sayılarda Öklid, küçük örnekte bölen/kat listesi ve seçeneklerde yerine koyma yedek olabilir. Modeli, koşulu, birimi ve son denetimi ayır. Çözümü açmak veya şekille oynamak bağımsız çözüm değildir. Not açık tam örnek → ilk hamle ipucu → yeni bağlamı bağımsız deneme basamakları kullanılabilir; süre için herkese aynı saniye sınırı koyulmaz."
      ]
    },
    {
      "code": "S23",
      "title": "Geçerli, yakın geçersiz ve başka yüzey",
      "paragraphs": [
        "30 ve 42 cm ipte ortak en büyük boy 6; aynı kenarlı dikdörtgende 5×7=35 kare bulunur. İpleri önce 72 cm tek ip yapmak başlangıçtaki iki ölçünün ortak bölen sorusu değildir. 10 ve 15 dakika ortak başlangıçta 30; B 5 dakika geç başlarsa ilk ortak 20. Periyotları korumak başlangıcı korumak demek değildir.",
        "d=3, m=30 için xy=10, geçerli (1, 10),(2, 5) çiftleri; en küçük kenarlar 6 ve 15 olduğundan en küçük dikdörtgen çevresi 2(6+15)=42. d=3, m=20 ise uygun sayı yoktur. Aynı kalan örneği N=24 k+1’i farklı kalanlara taşıma. Öklid’de son sıfırı değil, önceki sıfır olmayan kalanı al. Bir değişen koşulu özellikle adlandırmak ezberle model arasında bağlantı kurar."
      ]
    },
    {
      "code": "S24",
      "title": "Aralarında asal koşulundan cebirsel bilinmeyene",
      "paragraphs": [
        "Pozitif a, b aralarında asal ve EBOB(a, b)=n²−6 n+10 verilsin. Aralarında asal olma EBOB=1 demektir. n²−6 n+10=1 →n²−6 n+9=0 →(n−3)²=0 →n=3. Çünkü bir gerçek sayının karesi sıfırsa kendisi sıfırdır. (n−3)² açılımı n²−3 n−3 n+9=n²−6 n+9’dur.",
        "Ayrıca EKOK(a, b)=n⁴+9 verilirse 3⁴+9=90 ve ab=90 olur. Çarpan çiftleri (1, 90),(2, 45),(3, 30),(5, 18),(6, 15),(9, 10). Ortak böleni 1 olmayan (3, 30),(6, 15) elenir; geçerli toplamlar 91, 47, 23, 19; en küçük 19. Bu, kaynağın MEB destek örneğindeki yöntemin kendi anlatımıdır; ÖSYM sorusu veya yeni resmî doğrulama diye sunulmaz."
      ]
    },
    {
      "code": "S25",
      "title": "Rakam şartı ile ortak katı birlikte kullan",
      "paragraphs": [
        "Üç basamaklı AAB=110 A+B ve ABA=101 A+10 B için A, 1…9; B, 0…9 rakamı olsun. İkisinin de 9’a bölünmesi rakam toplamı 2 A+B’nin 9’un katı olmasını ister. Sayılardan biri 5’e, diğeri 12’ye bölünüyorsa hangi sayının hangi koşula girdiğini iki ayrı durum olarak denetlersin. 9 ve 12’ye birlikte bölünmek 108’e bölünmek değildir; EKOK(9, 12)=36, örneğin 36 karşı örnektir.",
        "AAB 5’e bölünürse B=0 veya 5. B=0 için A=9 çıkar fakat ABA=909, 12’ye bölünmez. B=5 için A=2; 225 ve 252 bütün koşulları sağlar. Ters atamada ABA 5’e bölünürse A=5; 9 koşulundan B=8; AAB=558, 12’ye bölünmez. Tek uygun rakam çifti A=2, B=5 ve toplam 7. Bu kısa matematik çözümü kaynağın seçili 2021 TYT 15 atfıyla ilişkilidir; özgün öğretim kartları resmî sınav sorusu diye etiketlenmez."
      ]
    },
    {
      "code": "S26",
      "title": "İlk yanlış adımı bul ve yeni soruya aktar",
      "paragraphs": [
        "“60 ve 84 farklı, o halde EKOK=5040” cümlesinde ilk yanlış farklılık ile aralarında asallığı eşitlemektir. Yeni 72, 90 için EBOB 18, EKOK 360 hesaplayarak kuralı yeniden dene. “20×32 dikdörtgene en az kare için EKOK 160” cümlesinde yanlış işlemden önce yanlış bölme yönü vardır; kare kenarı ölçüleri bölmeliydi. Yeni 28 ve 42 cm ipte 14 cm ve 5 parça bul.",
        "d=3, m=108 için xy=36 yazıp x=y=6 seçmek aralarında asal koşulunu kaybeder. Yeni d=2, m=72 için geçerli (x, y)=(4, 9), en küçük toplam 26’dır. [0, 72] ortak olaylarını 72/36=2 saymak başlangıcı eksiltir; yeni 6, 10 döngülerinin [0, 90) ortak anları 0, 30, 60’tır. İlgili çözümü kapatıp yeni durumu çöz; aynı cevabı hatırlamak yeni bağlama aktarımı tek başına göstermez."
      ]
    },
    {
      "code": "S27",
      "title": "İstersen çözümden önce iki ön tahmin yap",
      "paragraphs": [
        "Tahmin zorunlu değildir; henüz bilmiyorsan şekli inceleyebilirsin. 36 cm×24 cm dikdörtgene kesmeden tam uyan en büyük kare kenarı 12 cm mi 72 cm mi? İkinci soruda, 0’da birlikte başlayan 12 ve 18 dakikalık iki döngü ilk yeniden 6 dakika sonra mı 36 dakika sonra mı ortak olur?",
        "İlk durumda kare kenarı her ölçüyü bölmelidir: 12 her iki kenarı böler, 72 ise kenarlardan büyüktür. İkinci durumda geçen süre her periyodun tam katıdır: 36 uyar, 6 uymaz. Tahminini bu iki gerekçeyle karşılaştırmak yöntem seçimini açar; bir ön tahmin, bu konunun bütün alt becerilerinin öğrenildiği kaydı değildir."
      ]
    },
    {
      "code": "S28",
      "title": "Aynı fark modeli yeni kalan koşulunda bozulabilir",
      "paragraphs": [
        "65 ve 89, aynı d’ye bölündüğünde 5 kalıyorsa d, 60 ve 84’ü böler; en büyük 12 ve 12>5 olduğundan geçerlidir. Aynı sayılarda kalan 12 olsaydı farklar 53 ve 77 olurdu; EBOB 1, fakat d>12 gerekir. Bu nedenle ikinci durumun çözümü yoktur. Sayılar değişmeden kalan değişince uygun bölenin varlığı da değişebilir.",
        "6’ya bölmede 1, 8’e bölmede 3 kalan için tek N−1 ortak kat modeli kurulmaz. İki koşulu ayrı yazarak 43=6×7+1=8×5+3 örneğini denetle. N−1=42, 8’in katı değildir; N−3=40 ise 8’in katıdır. İşlem kolay görünsün diye farklı kalanları aynılaştırma.",
        "8’e bölmede 5, 12’ye bölmede 7 kalan verildiğinde de N−5, ikisinin ortak katı diye yazılmaz. N−5, 8’in katı; N−7, 12’nin katı olmalıdır. Aynı sayıyı farklı kalanlarla düzeltirken her bölüm eşitliğini ayrı korursun; tek ortak r varsayımı burada geçerli değildir."
      ]
    },
    {
      "code": "S29",
      "title": "Bir örnek ile bütün uygun durumları ayır",
      "paragraphs": [
        "EBOB(a,b)=6 olması a,b’nin mutlaka 6 ve 12 olduğu anlamına gelmez: 18 ve 24 için de en büyük ortak bölen 6’dır. EBOB bilgisi birden çok sayı çifti bırakır; EKOK veya aralık gibi ikinci bir koşul adayları daraltabilir. “Olabilir” için koşulları sağlayan tek çift yeterlidir; “kesin” demek bütün uygun çiftlerde doğru olmasını ister.",
        "En küçük/en büyük sorusunda bir uygun çift göstermek yalnız varlığını kanıtlar. Daha iyi aday bulunmadığını çarpan çiftlerini eksiksiz tüketerek veya gerekli bir sınırla açıklamalısın. Bir olumlu örnek genel doğruluk kanıtı değildir; ön koşulu sağlayıp sonucu bozan tek karşı örnek ise yanlışlığı gösterir. Gerekçeyi bu kapsam sözcükleriyle uyumlu tut."
      ]
    }
  ],
  "examples": [
    {
      "code": "E01",
      "title": "Asal tabloyla iki sayıyı karşılaştır",
      "prompt": "84 ve 126 pozitif tam sayılarının EBOB ve EKOK değerleri sırasıyla hangisidir?",
      "strategy": "Her asalın küçük ve büyük üslerini ayır.",
      "steps": [
        {
          "label": "Asal çarpanları ayır",
          "explanation": "84=2²×3×7; 126=2×3²×7."
        },
        {
          "label": "Küçük ve büyük üsleri seç",
          "explanation": "EBOB=2×3×7=42."
        },
        {
          "label": "İki sonucu kur",
          "explanation": "EKOK=2²×3²×7=252."
        }
      ],
      "answer": "42 ve 252",
      "check": "84/42=2; 126/42=3; 252/84=3; 252/126=2; 84×126=42×252.",
      "pitfall": "Bir ortak bölen bulunca en büyük olduğunu varsayma."
    },
    {
      "code": "E02",
      "title": "Kare kenarını adetten ayır",
      "prompt": "36 cm×24 cm dikdörtgen eş karelerle kaplanacak. Kareler kenarlara paralel, kesilmeden ve boşluksuz yerleşiyor. En az kaç kare gerekir?",
      "strategy": "En az adet için en büyük geçerli kare kenarını bul.",
      "steps": [
        {
          "label": "Kare kenarının bölme koşulunu yaz",
          "explanation": "Kare kenarı s, 36 ve 24’ü tam bölmeli."
        },
        {
          "label": "En büyük ortak kenarı seç",
          "explanation": "En büyük uygun kenar EBOB(36,24)=12 cm."
        },
        {
          "label": "Satır ile sütunu çarp",
          "explanation": "Sütun sayısı=36/12=3; satır sayısı=24/12=2; adet 3×2=6."
        }
      ],
      "answer": "6",
      "check": "6×12²=864 cm²=36×24.",
      "pitfall": "“En az” görünce EKOK seçme; aranan kenar verileri bölüyor."
    },
    {
      "code": "E03",
      "title": "Ayrı iplerde parça ve kesim",
      "prompt": "36 cm ve 24 cm iki ip, ayrı ayrı kesilerek kayıpsız biçimde en uzun eş boy parçalara ayrılıyor. Parça boyu, toplam parça ve toplam kesim sayısı hangisidir? Üst üste kesim yoktur.",
      "strategy": "Her ipin parça ve kesimini ayrı say.",
      "steps": [
        {
          "label": "En uzun ortak boyu bul",
          "explanation": "EBOB(36, 24)=12 cm en uzun ortak boydur."
        },
        {
          "label": "Ayrı iplerin parçalarını topla",
          "explanation": "Parçalar 3+2=5."
        },
        {
          "label": "Ayrı kesimleri say",
          "explanation": "Ayrı kesimler(3−1)+(2−1)=3."
        }
      ],
      "answer": "12 cm; 5 parça; 3 kesim",
      "check": "3×12=36; 2×12=24; iki ayrı ipte toplam kesim parça sayısından 2 eksiktir.",
      "pitfall": "İki boyutlu kaplamadaki çarpımı ip parçası sayısına taşıma."
    },
    {
      "code": "E04",
      "title": "Kapalı çevreyi say",
      "prompt": "36 cm×24 cm kapalı dikdörtgenin çevresine, her köşeye gelecek biçimde en büyük eşit aralıklarla işaretler konuyor. İşaret sayısı kaçtır?",
      "strategy": "Uzunluk ile kapalı çevredeki aralık sayısını ayır.",
      "steps": [
        {
          "label": "Köşelere uyan aralığı bul",
          "explanation": "En büyük aralık EBOB(36,24)=12 cm."
        },
        {
          "label": "Çevreyi hesapla",
          "explanation": "Çevre 2(36+24)=120 cm."
        },
        {
          "label": "Kapalı çevrede başlangıcı bir kez say",
          "explanation": "Kapalı çevrede 120/12=10 işaret."
        }
      ],
      "answer": "10",
      "check": "Her 36 cm kenarda 3, her 24 cm kenarda 2 aralık; toplam 3+2+3+2=10.",
      "pitfall": "Açık kenardaki iki uç dahil +1 kuralını kapalı çevreye ekleme."
    },
    {
      "code": "E05",
      "title": "Ortak an ile aralık sayısını ayır",
      "prompt": "A ve B başlangıçta birlikte çalışıyor; periyotları 12 ve 18 dk. [0, 72] aralığında, başlangıç ve 72.dk dahil, kaç ortak çalışma olayı vardır?",
      "strategy": "Önce ortak anları, sonra uçların dahil oluşunu denetle.",
      "steps": [
        {
          "label": "Ortak periyodu hesapla",
          "explanation": "Ortak periyot EKOK(12,18)=36 dk."
        },
        {
          "label": "Ortak anları listele",
          "explanation": "İki uç dahil ortak anlar 0, 36, 72."
        },
        {
          "label": "Dahil uçları say",
          "explanation": "Liste üç eleman içerir."
        }
      ],
      "answer": "3",
      "check": "[0, 72) veya(0, 72] istenseydi 2 olay olurdu.",
      "pitfall": "Aralık sayısını olay sayısı diye kullanma."
    },
    {
      "code": "E06",
      "title": "Dakikayı saate taşı",
      "prompt": "09.50’de birlikte başlayan iki düzenin ilk yeniden ortak çalışması 36 dakika sonradır. Saat kaç olur?",
      "strategy": "Önce tam saate ulaş, sonra kalan süreyi ekle.",
      "steps": [
        {
          "label": "Tam saate ulaş",
          "explanation": "09.50+10 dk=10.00."
        },
        {
          "label": "Kalan dakikayı ayır",
          "explanation": "36−10=26 dk kalır."
        },
        {
          "label": "Saat gösterimine ekle",
          "explanation": "10.00+26 dk=10.26."
        }
      ],
      "answer": "10.26",
      "check": "09.50’den 10.26’ya 10+26=36 dk vardır.",
      "pitfall": "Saatin dakika alanını 100 tabanlı sayı gibi toplama."
    },
    {
      "code": "E07",
      "title": "Kaymış iki diziyi karşılaştır",
      "prompt": "A ilk kez 0.dk’da ve sonra her 12 dk; B ilk kez 6.dk’da ve sonra her 18 dk çalışıyor. İlk ortak çalışma kaçıncı dakikadadır?",
      "strategy": "Başlangıçları ayrı tutup iki diziyi karşılaştır.",
      "steps": [
        {
          "label": "A olaylarını yaz",
          "explanation": "A: 0, 12, 24, 36,…"
        },
        {
          "label": "B olaylarını kaydır",
          "explanation": "B: 6, 24, 42,…"
        },
        {
          "label": "İlk kesişimi denetle",
          "explanation": "İlk kesişim 24; 24=12×2=6+18×1."
        }
      ],
      "answer": "24",
      "check": "Daha küçük A anları 0 ve 12, B dizisinde değildir.",
      "pitfall": "EKOK 36’yı kaymış başlangıçta ilk an diye seçme."
    },
    {
      "code": "E08",
      "title": "Aynı kalanla alt sınırı geç",
      "prompt": "Pozitif N sayısı 8 ve 12 ile bölününce 5 kalıyor. 100’den büyük en küçük N kaçtır?",
      "strategy": "Ortak kat dizisinde sınırdan sonraki ilk adayı bul.",
      "steps": [
        {
          "label": "Ortak kalanı çıkar",
          "explanation": "N−5, 8 ve 12’nin ortak katı; EKOK 24."
        },
        {
          "label": "Sınırın iki yanındaki adayları karşılaştır",
          "explanation": "N=24 k+5; k 3→77, k 4→101."
        },
        {
          "label": "Bölmeleri geri denetle",
          "explanation": "101=8×12+5=12×8+5."
        }
      ],
      "answer": "101",
      "check": "5<8 ve 5<12; k 3 uymaz, k 4 uyar.",
      "pitfall": "Yalnız kalanları kontrol edip 100 sınırını unutma."
    },
    {
      "code": "E09",
      "title": "Aynı kalanı veren böleni bul",
      "prompt": "85 ve 133 aynı pozitif tam sayı d’ye bölününce her ikisinde 1 kalıyor. En büyük d kaçtır?",
      "strategy": "Her sayıdan kalanını çıkarıp EBOB al.",
      "steps": [
        {
          "label": "Her sayıdan kalanını çıkar",
          "explanation": "d, 85−1=84 ve 133−1=132’yi böler."
        },
        {
          "label": "Farkların EBOB’unu hesapla",
          "explanation": "EBOB 84, 132=12."
        },
        {
          "label": "Kalan ve bölüm koşullarını denetle",
          "explanation": "12>1; 85=12×7+1; 133=12×11+1."
        }
      ],
      "answer": "12",
      "check": "12 geçerlidir ve iki farkın daha büyük ortak böleni yoktur.",
      "pitfall": "Verilen 85 ve 133’ün kendilerinin EBOB’unu alma."
    },
    {
      "code": "E10",
      "title": "Farklı kalanları ayrı çıkar",
      "prompt": "87’nin pozitif tam sayı d ile bölümünde 3, 134’ün d ile bölümünde 2 kalıyor. En büyük d kaçtır?",
      "strategy": "Farklı kalanları her sayıya ayrı uygula.",
      "steps": [
        {
          "label": "Her sayıdan kendi kalanını çıkar",
          "explanation": "87−3=84; 134−2=132."
        },
        {
          "label": "Bölen sınırını koru",
          "explanation": "d iki farkı bölmeli ve d>3 olmalı."
        },
        {
          "label": "En büyük adayı bul",
          "explanation": "EBOB 84, 132=12; iki kalan da 12’den küçük."
        }
      ],
      "answer": "12",
      "check": "87=12×7+3; 134=12×11+2.",
      "pitfall": "İkinci sayıdan da 3 çıkarmak verilen koşulu değiştirir."
    },
    {
      "code": "E11",
      "title": "Kalan sınırında imkânsızlığı göster",
      "prompt": "17 ve 25 sayısı aynı pozitif tam sayı d’ye bölündüğünde ikisinde de 5 kalacak. Bu koşulları sağlayan d var mı? Gerekçenle açıkla.",
      "strategy": "EBOB sınırını kalan sınırıyla birlikte kullan.",
      "steps": [
        {
          "label": "Ortak bölenin üst sınırını bul",
          "explanation": "d, 17−5=12 ve 25−5=20’yi böler; d≤EBOB(12, 20)=4."
        },
        {
          "label": "Kalanın alt sınırını yaz",
          "explanation": "Kalan 5 olması d>5 gerektirir."
        },
        {
          "label": "Çelişkiyi göster",
          "explanation": "d≤4 ve d>5 çelişir."
        }
      ],
      "answer": "Uygun d yoktur.",
      "check": "4’ün bütün pozitif bölenleri 1, 2, 4; hiçbiri 5’ten büyük değildir.",
      "pitfall": "EBOB’u hesaplayınca otomatik geçerli bölen sanma."
    },
    {
      "code": "E12",
      "title": "EBOB ve EKOK’tan toplamları kur",
      "prompt": "a, b pozitif tam sayı; EBOB(a, b)=4, EKOK(a, b)=48. a+b’nin en küçük ve en büyük değerleri sırasıyla hangisidir?",
      "strategy": "Çarpan çiftlerini tüketip aralarında asal olmayanı ele.",
      "steps": [
        {
          "label": "Ortak böleni dışarı çıkar",
          "explanation": "a=4 x, b=4 y; xy=48/4=12; EBOB(x, y)=1."
        },
        {
          "label": "Aralarında asal çiftleri ayır",
          "explanation": "Çiftler 1, 12 uygun; 2, 6 geçersiz; 3, 4 uygun."
        },
        {
          "label": "Asıl toplamları karşılaştır",
          "explanation": "Asıl toplamlar 4(1+12)=52 ve 4(3+4)=28."
        }
      ],
      "answer": "28 ve 52",
      "check": "(4,48) ve (12,16) çiftlerinin ikisi de EBOB=4, EKOK=48 koşullarını sağlar.",
      "pitfall": "Yakın çifti seçerken EBOB koşulunu kaybetme."
    },
    {
      "code": "E13",
      "title": "Üç sayının gereksinimini karşılaştır",
      "prompt": "18, 24, 30 için EBOB ve EKOK sırasıyla kaçtır?",
      "strategy": "Her asalın üç satırdaki üslerini karşılaştır.",
      "steps": [
        {
          "label": "Asallara ayır",
          "explanation": "18=2×3²; 24=2³×3; 30=2×3×5."
        },
        {
          "label": "Küçük üsleri seç",
          "explanation": "Küçük üsler EBOB 2×3=6."
        },
        {
          "label": "Büyük üsleri seç",
          "explanation": "Büyük üsler EKOK 2³×3²×5=360."
        }
      ],
      "answer": "6 ve 360",
      "check": "360/18=20; 360/24=15; 360/30=12.",
      "pitfall": "Üç sayının çarpımını doğrudan EKOK seçme."
    },
    {
      "code": "E14",
      "title": "Bilinmeyen üçüncü sayıyı kur",
      "prompt": "Pozitif tam sayı x için EBOB(18, 12, x)=6 ve EKOK(18, 12, x)=360. En küçük x kaçtır?",
      "strategy": "Hedef EKOK’ta eksikleri bulup EBOB koşulunu da uygula.",
      "steps": [
        {
          "label": "İlk çifti özetle",
          "explanation": "İlk çiftin EBOB’u 6, EKOK’u 36=2²×3²."
        },
        {
          "label": "EKOK’un eksik asallarını belirle",
          "explanation": "360=2³×3²×5 için x, 2³ ve 5 taşımalı."
        },
        {
          "label": "EBOB için gerekeni de ekle",
          "explanation": "EBOB 6 koşulu 6|x ister; en az bir 3 eklenir: x=120."
        }
      ],
      "answer": "120",
      "check": "EBOB(6, 120)=6; EKOK(36, 120)=360; zorunlu en küçük asal kopyaları kullanıldı.",
      "pitfall": "40 ile yalnız EKOK’u sağlayıp durma."
    },
    {
      "code": "E15",
      "title": "Pozitif ve negatif ortak bölenleri say",
      "prompt": "72 ve 120’nin pozitif ortak bölen sayısı ve bütün tam sayı ortak bölen sayısı sırasıyla kaçtır?",
      "strategy": "EBOB’un bölenlerini üs seçenekleriyle say.",
      "steps": [
        {
          "label": "Ortak böleni ayrıştır",
          "explanation": "EBOB 72, 120=24=2³×3."
        },
        {
          "label": "Pozitif üs seçeneklerini çarp",
          "explanation": "Pozitif ortak bölen sayısı(3+1)(1+1)=8."
        },
        {
          "label": "Negatif eşleri ekle",
          "explanation": "Her pozitifin bir negatifi: toplam 16."
        }
      ],
      "answer": "8 ve 16",
      "check": "Pozitifler 1, 2, 3, 4, 6, 8, 12, 24; negatifler bunların işaret değiştirmiş eşleridir.",
      "pitfall": "Bölenin sayısı ile bölenin kendi değerini ayır."
    },
    {
      "code": "E16",
      "title": "Üç eksende küp adedini kur",
      "prompt": "12 cm ve 18 cm kenarlı küpler her boy ayrı kullanılarak eş büyüklükte iki dolu küp oluşturacak. Kesme/boşluk yok, kenarlar paralel. En küçük ortak büyük kenar ve sırasıyla küçük küp adetleri nedir?",
      "strategy": "Kenar için EKOK, adet için üç boyutlu oran kullan.",
      "steps": [
        {
          "label": "Ortak büyük kenarı bul",
          "explanation": "Büyük kenar 12 ve 18’in ortak katı; EKOK 36 cm."
        },
        {
          "label": "İlk boyda üç ekseni say",
          "explanation": "12 cm küp için eksen başına 3; toplam 3³=27."
        },
        {
          "label": "İkinci boyda üç ekseni say",
          "explanation": "18 cm küp için eksen başına 2; toplam 2³=8."
        }
      ],
      "answer": "36 cm; 27 ve 8",
      "check": "27×12³=8×18³=36³=46.656 cm³.",
      "pitfall": "İki farklı küp boyunu aynı büyük küpte karıştırmaya izin verilmedi."
    },
    {
      "code": "E17",
      "title": "Destek azaltılan toplamı tamamla",
      "prompt": "a<b pozitif tam sayılar; EBOB(a, b)=6, EKOK(a, b)=180. En küçük a+b kaçtır?",
      "strategy": "Bütün çarpan çiftlerini ve aralarında asal olma koşulunu denetle.",
      "steps": [
        {
          "label": "Ortak bölen ölçeğini ayır",
          "explanation": "a=6 x, b=6 y; xy=30, EBOB(x, y)=1 ve x<y."
        },
        {
          "label": "Bütün çarpan çiftlerini yaz",
          "explanation": "Çiftler(1, 30),(2, 15),(3, 10),(5, 6); hepsi aralarında asal."
        },
        {
          "label": "En küçük toplamı geri ölçekle",
          "explanation": "En küçük x+y=11; 6×11=66."
        }
      ],
      "answer": "66",
      "check": "a=30, b=36; EBOB 6, EKOK 180 ve 30<36.",
      "pitfall": "Yalnız bir geçerli çift göstererek en küçük olduğunu söyleme."
    },
    {
      "code": "E18",
      "title": "Aynı boydan iki farklı adet",
      "prompt": "40 cm×56 cm dikdörtgen kenarlara paralel eş karelerle kayıpsız kaplanıyor. En az kare adedi ile 40 cm ve 56 cm iki ayrı ipin en uzun aynı boy parçalara kesilmesindeki toplam adet sırasıyla nedir?",
      "strategy": "Boyu ortak bul, adetleri şekle göre ayır.",
      "steps": [
        {
          "label": "Ortak boyu bul",
          "explanation": "EBOB 40, 56=8 cm."
        },
        {
          "label": "Dikdörtgende çarp",
          "explanation": "Dikdörtgende 40/8=5, 56/8=7; 5×7=35 kare."
        },
        {
          "label": "İplerde topla",
          "explanation": "İplerde 5+7=12 parça."
        }
      ],
      "answer": "35 ve 12",
      "check": "35×64=2240 cm²; 12×8=96 cm.",
      "pitfall": "Her problemin aynı EBOB’u kullanması aynı adet formülünü kullanacağı anlamına gelmez."
    },
    {
      "code": "E19",
      "title": "Üst sınırın altındaki son adayı bul",
      "prompt": "Pozitif N sayısı 6 ve 8 ile bölününce 1 kalıyor. 200’den küçük en büyük N kaçtır?",
      "strategy": "Üst sınırın altındaki son ortak kat adayını seç.",
      "steps": [
        {
          "label": "Ortak kalanı çıkar",
          "explanation": "N−1 ortak kat; EKOK 6, 8=24."
        },
        {
          "label": "Komşu sınır adaylarını dene",
          "explanation": "N=24 k+1; k 8→193, k 9→217."
        },
        {
          "label": "Kalanları denetle",
          "explanation": "193=6×32+1=8×24+1."
        }
      ],
      "answer": "193",
      "check": "Bir sonraki 217, sınırı aşar; 193 en büyük uygundur.",
      "pitfall": "Her iki kalan koşulunu ve sınırı ayrı denetle."
    },
    {
      "code": "E20",
      "title": "Park çevresi ve açık kenarı ayır",
      "prompt": "18 m×30 m kapalı dikdörtgen parkın çevresine köşeler dahil en büyük eşit aralıklarla işaret konuyor. Aralık, kapalı çevredeki işaret adedi ve yalnız 18 m’lik açık kenardaki iki uç dahil nokta adedi nedir?",
      "strategy": "Kapalı ve açık çizgide uç koşulunu ayrı uygula.",
      "steps": [
        {
          "label": "Aralığı ortak bölenle bul",
          "explanation": "En büyük aralık EBOB(18,30)=6 m."
        },
        {
          "label": "Kapalı çevrede işaretleri say",
          "explanation": "Çevre 96 m; 96/6=16 işaret."
        },
        {
          "label": "Açık kenarda iki ucu ekle",
          "explanation": "Açık 18 m kenarda 18/6+1=4 nokta."
        }
      ],
      "answer": "6 m; 16; 4",
      "check": "Kapalı 0 ve 96 m aynı nokta; açık 0 ve 18 m farklı uçlar.",
      "pitfall": "Aralık sayısı ile işaret sayısı her koşulda aynı değildir."
    },
    {
      "code": "E21",
      "title": "Yeni üçüncü sayının iki koşulu",
      "prompt": "EBOB(20, 30, x)=10 ve EKOK(20, 30, x)=420. En küçük pozitif tam sayı x kaçtır?",
      "strategy": "Eksik asal ile ortak bölen koşulunu birlikte kur.",
      "steps": [
        {
          "label": "İlk çifti özetle",
          "explanation": "İlk çiftin EBOB’u 10, EKOK’u 60=2²×3×5."
        },
        {
          "label": "Eksik asal gereksinimini belirle",
          "explanation": "Hedef 420=2²×3×5×7; x’te 7 gerekir."
        },
        {
          "label": "Ortak böleni koru",
          "explanation": "EBOB=10 için 10|x; en küçük x=70."
        }
      ],
      "answer": "70",
      "check": "EBOB 10, 70=10; EKOK 60, 70=420.",
      "pitfall": "Sadece 7’yi ekleyip EBOB koşulunu atlama."
    },
    {
      "code": "E22",
      "title": "Aralarında asal koşuluyla hatayı onar",
      "prompt": "a, b pozitif tam sayı; EBOB(a, b)=2, EKOK(a, b)=72. En küçük a+b kaçtır?",
      "strategy": "Çarpan çiftlerini aralarında asallıkla ele.",
      "steps": [
        {
          "label": "Ortak böleni dışarı çıkar",
          "explanation": "a=2 x, b=2 y; xy=36 ve EBOB(x, y)=1."
        },
        {
          "label": "Bütün çarpan çiftlerini yaz",
          "explanation": "Çiftler 1, 36; 2, 18; 3, 12; 4, 9; 6, 6."
        },
        {
          "label": "Geçerli çiftlerin toplamını karşılaştır",
          "explanation": "Yalnız 1, 36 ve 4, 9 uygun; toplamlar 74 ve 26."
        }
      ],
      "answer": "26",
      "check": "a=8, b=18; EBOB 2, EKOK 72.",
      "pitfall": "En yakın(6, 6)çifti aralarında asal değildir."
    },
    {
      "code": "E23",
      "title": "Aralarında asal koşulunu cebre bağla",
      "prompt": "a, b pozitif tam sayılar ve aralarında asal. EBOB(a, b)=n²−6 n+10, EKOK(a, b)=n⁴+9. En küçük a+b nedir?",
      "strategy": "Önce EBOB=1 koşulundan n’yi belirle; sonra aralarında asal çarpan çiftlerini tüket.",
      "steps": [
        {
          "label": "EBOB koşulunu yaz",
          "explanation": "n²−6 n+10=1; n²−6 n+9=(n−3)²=0, n=3."
        },
        {
          "label": "EKOK’tan çarpımı kur",
          "explanation": "EKOK=3⁴+9=90; EBOB 1 olduğu için ab=90."
        },
        {
          "label": "Çiftleri aralarında asallıkla ele",
          "explanation": "(1, 90),(2, 45),(3, 30),(5, 18),(6, 15),(9, 10); (3, 30) ve(6, 15) elenir."
        },
        {
          "label": "Bütün geçerli toplamları karşılaştır",
          "explanation": "91, 47, 23, 19 arasından en küçük 19; a=9, b=10."
        }
      ],
      "answer": "19.",
      "check": "EBOB(9, 10)=1; EKOK 90; iki cebirsel bağıntıda n=3 sağlanır.",
      "pitfall": "ab=90 bulmak tek başına aralarında asal olma koşulunu denetlemez; her çifti EBOB=1 koşuluyla ele."
    },
    {
      "code": "E24",
      "title": "Rakam ve ortak kat koşullarını birleştir",
      "prompt": "A, 1…9 ve B, 0…9 rakamı. AAB=110 A+B ile ABA=101 A+10 B sayılarının ikisi 9’a bölünüyor; biri 5’e, diğeri 12’ye bölünüyor. A+B nedir?",
      "strategy": "İki bölünebilme atamasını ayrı denetle; aynı rakam toplamını kullan.",
      "steps": [
        {
          "label": "Rakam toplamını kur",
          "explanation": "Her iki sayı için 2 A+B, 9’un katı olmalı; 5’e bölünenin son rakamı 0 veya 5."
        },
        {
          "label": "İlk atamayı denetle",
          "explanation": "AAB 5’e bölünürse B=0 veya 5. B=0→A=9→ABA 909, 12’ye bölünmez. B=5→A=2→225 ve 252 koşulları sağlar."
        },
        {
          "label": "Ters atamayı ele",
          "explanation": "ABA 5’e bölünürse A=5; 9 koşulundan B=8; AAB 558, 12’ye bölünmez."
        },
        {
          "label": "Tek uygun çifti kontrol et",
          "explanation": "A=2, B=5; 225=45×5, 252=36×7; A+B=7."
        }
      ],
      "answer": "7.",
      "check": "225/45=5 ve 252/36=7; 225, 5’e ve 9’a; 252, 12’ye ve 9’a tam bölünür. İki sayı da üç basamaklıdır; A=2, B=5 koşulları sağlar.",
      "pitfall": "9 ve 12’ye birlikte bölünmeyi 9×12=108’e bölünmek sanma; EKOK 36 yeterlidir."
    }
  ],
  "recall": [
    {
      "prompt": "Bir büyüklüğün ortak bölen mi ortak kat mı aradığını nasıl ayırırsın?",
      "answer": "Bilinmeyen her veriyi bölüyorsa ortak bölen; her veri bilinmeyeni bölüyorsa ortak kat aranır. “En az” sözcüğü tek başına yetmez."
    },
    {
      "prompt": "72 ve 120’de 5’in EBOB üssü neden 0?",
      "answer": "72’de 5 yok; ortak bölen 5 içeremez. 0 üs çarpanı 1 yapar."
    },
    {
      "prompt": "İki sayıda EBOB×EKOK neden çarpıma eşit?",
      "answer": "Her asalın küçük ve büyük üs toplamı iki başlangıç üssünün toplamına eşittir. Üç sayıda bu ürün bağı genel değildir."
    },
    {
      "prompt": "Aralarında asal iki bileşik sayı örneği ver.",
      "answer": "8 ve 9; EBOB 1, EKOK 72. İkisinin de asal olması gerekmez."
    },
    {
      "prompt": "a=dx, b=dy yazıldığında hangi koşul korunmalı?",
      "answer": "EBOB(x, y)=1. Aksi halde başlangıçtaki en büyük ortak bölen d’den büyük olur."
    },
    {
      "prompt": "Öklid zinciri 0 kalanla bitince EBOB hangisi?",
      "answer": "Son sıfır olmayan kalan; 0 bitiş işaretidir, başlangıç sayılarının böleni değildir."
    },
    {
      "prompt": "36×24 kaplama ile aynı boy iki ipte adet neden farklı?",
      "answer": "Karelerde 3×2=6; iki ipte 3+2=5. Ortak 12 cm boy, adet formülünü tek başına belirlemez."
    },
    {
      "prompt": "Kapalı çevrede neden+1 yok?",
      "answer": "Başlangıç ve bitiş aynı işarettir. Açık kenarda iki uç dahilse iki farklı uç bulunur ve nokta=aralık+1 olur."
    },
    {
      "prompt": "12 ve 18 dk, ortak başlangıçta ilk yeniden an ve[0, 72]sayımı?",
      "answer": "36 dk; 0, 36, 72 olmak üzere 3 olay. Uçlardan biri hariç tutulursa 2."
    },
    {
      "prompt": "B 6.dk başlayınca aynı periyotlarda ilk ortak an neden 24?",
      "answer": "A 0, 12, 24; B 6, 24, 42 dizileri ilk 24’te kesişir. Ortak başlangıç varsayımı kalkmıştır."
    },
    {
      "prompt": "Aynı N aynı r kalanını verince neyi çıkarırsın?",
      "answer": "N−r her bölenin katıdır; N=EKOK×k+r. Kalan her bölenin altında olmalı ve N’nin aralığı korunmalı."
    },
    {
      "prompt": "Farklı sayılarda farklı kalanlarla bilinmeyen d?",
      "answer": "Her sayıdan kendi kalanını çıkar; d bütün farkları bölmeli ve her kalandan büyük olmalı."
    },
    {
      "prompt": "Üçüncü sayı sorusunda yalnız eksik EKOK asallarını eklemek yeterli mi?",
      "answer": "Hayır; EBOB koşulu da ayrı korunur. 18, 12, x örneğinde 40 EKOK’u sağlar ama 6’ya bölünmez; 120 gerekir."
    },
    {
      "prompt": "24=2³×3 için pozitif ve tüm tam sayı bölen sayısı?",
      "answer": "(3+1)(1+1)=8 pozitif; 8 negatif eşiyle toplam 16; 0 bölen değildir."
    },
    {
      "prompt": "12 ve 18 cm küplerle ortak 36 cm kenarda adetler?",
      "answer": "Her boy ayrı: 3³=27 ve 2³=8. Kenar oranı üç eksende çarpılır; hacim 46.656 cm³."
    },
    {
      "prompt": "Sabit 4 cm kare kenarı verilen 40×56 kaplamada EBOB aranır mı?",
      "answer": "Hayır; kenar sabit. 40/4×56/4=140 kare. En büyük kenar istenmedi."
    },
    {
      "prompt": "Kişisel başlangıç verilmeden periyottan ilk ortak an kesin mi?",
      "answer": "Hayır. Başlangıç bilinmiyorsa 0 varsayılmaz; aynı 10/15 periyotları ortak başlangıçta 30, B 5 geç başlarsa 20 verir."
    },
    {
      "prompt": "Aynı cevabı hatırlamak yeni soruya aktarımın kanıtı mı?",
      "answer": "Değil. İlk yanlış adımı gerekçeyle onarıp yeni bağlamı ayrı çöz; görsel keşif/süre/elle onay bağımsız öğrenme puanı değildir."
    }
  ],
  "items": [
    {
      "code": "Q01",
      "prompt": "72 ve 120 pozitif tam sayılarının EBOB ve EKOK değerleri sırasıyla hangisidir?",
      "options": [
        "24 ve 360",
        "8 ve 1.080",
        "24 ve 8.640",
        "360 ve 24",
        "3 ve 360"
      ],
      "optionReasons": [
        "72/24=3; 120/24=5; 360/72=5; 360/120=3.",
        "8 ortak bölen olsa da 24 de ikisini böler; en büyük olamaz. 1.080 ortak kattır fakat 360 daha küçüktür.",
        "24 doğrudur; 8.640 başlangıç sayılarının çarpımıdır. Ortak bölen 24’ü hesaba katmadan çarpım EKOK olamaz.",
        "360 iki başlangıç sayısını bölmez; 24 de 72 ve 120’nin ortak katı değildir. Bölen ile kat ters çevrilmiş.",
        "360 en küçük ortak kattır; fakat 3 en büyük ortak bölen değildir, 24 de ortaktır."
      ],
      "knowledge": [
        "Asal çarpanlara ayırma aynı asalın kopyalarını üs olarak sayar; sayıdaki olmayan asalın üssü 0’dır.",
        "Her asalın küçük üssü ortak böleni, büyük üssü ortak katı kurar. İki sayıda EBOB×EKOK başlangıç çarpımına eşittir; üç sayıda bu ürün bağı genel değildir."
      ],
      "strategy": "Asal kopyalarını ayrı satırlarda karşılaştır.",
      "steps": [
        "72=2³×3²; 120=2³×3×5.",
        "Her asalın küçük üssüyle EBOB=2³×3=24.",
        "Büyük üslerle EKOK=2³×3²×5=360."
      ],
      "commonError": "120’deki 5’i ortak bölenin içine ekleme; 72’de yoktur.",
      "check": "72/24=3; 120/24=5; 360/72=5; 360/120=3."
    },
    {
      "code": "Q02",
      "prompt": "84 ve 126 pozitif tam sayılarının EBOB ve EKOK değerleri sırasıyla hangisidir?",
      "options": [
        "42 ve 252",
        "21 ve 504",
        "42 ve 10.584",
        "7 ve 252",
        "252 ve 42"
      ],
      "optionReasons": [
        "84/42=2; 126/42=3; 252/84=3; 252/126=2; 84×126=42×252.",
        "21 ortaktır ama 42 de ortak olduğundan en büyük değildir; 252 de 504’ten küçük ortak kattır.",
        "EBOB doğrudur; 10.584 çarpımdır, EBOB 42’ye bölünmeden EKOK bulunmaz.",
        "EKOK doğrudur; fakat ortak bölen 42, 7’den büyüktür.",
        "252 ortak kat, 42 ortak bölen rolündedir; istenen sıra tersidir."
      ],
      "knowledge": [
        "Asal çarpanlara ayırma aynı asalın kopyalarını üs olarak sayar; sayıdaki olmayan asalın üssü 0’dır.",
        "Her asalın küçük üssü ortak böleni, büyük üssü ortak katı kurar. İki sayıda EBOB×EKOK başlangıç çarpımına eşittir; üç sayıda bu ürün bağı genel değildir."
      ],
      "strategy": "Her asalın küçük ve büyük üslerini ayır.",
      "steps": [
        "84=2²×3×7; 126=2×3²×7.",
        "EBOB=2×3×7=42.",
        "EKOK=2²×3²×7=252."
      ],
      "commonError": "Bir ortak bölen bulunca en büyük olduğunu varsayma.",
      "check": "84/42=2; 126/42=3; 252/84=3; 252/126=2; 84×126=42×252."
    },
    {
      "code": "Q03",
      "prompt": "8 ve 9 sayıları için hangi ifade doğrudur?",
      "options": [
        "Aralarında asaldırlar; EKOK’ları 72’dir.",
        "İkisi de asal olduğu için EKOK 72’dir.",
        "Farklı oldukları için her farklı çift gibi aralarında asaldırlar.",
        "EBOB’ları 72’dir.",
        "EBOB’ları 0’dır."
      ],
      "optionReasons": [
        "72/8=9 ve 72/9=8.",
        "8’in 2 ve 4; 9’un 3 böleni vardır; ikisi de asal değildir.",
        "8 ve 9 aralarında asal olsa da farklılık yeterli gerekçe değildir; 6 ve 10 farklı olup ortak 2’ye sahiptir.",
        "72 büyük ortak kattır; 8 ve 9’u bölmediğinden ortak bölen değildir.",
        "Pozitif sayılar için 1 ortak bölen vardır; bu çiftte en büyük ortak bölen 1’dir."
      ],
      "knowledge": [
        "EBOB ortak pozitif bölenlerin en büyüğü; EKOK ortak pozitif katların en küçüğüdür.",
        "Önce bölme yönünü ve bütün başlangıç koşullarını yaz; sonucun birimini ve her koşulu ayrı denetle."
      ],
      "strategy": "Ortak bölen kümesini incele.",
      "steps": [
        "8’in bölenleri 1, 2, 4, 8; 9’un bölenleri 1, 3, 9.",
        "Tek ortak pozitif bölen 1; EBOB=1.",
        "İki sayıda EBOB×EKOK=çarpım; EKOK=8×9=72."
      ],
      "commonError": "Aralarında asal olmayı her sayının tek başına asal olmasıyla karıştırma.",
      "check": "72/8=9 ve 72/9=8."
    },
    {
      "code": "Q04",
      "prompt": "4, 20’yi kalansız böler. EBOB(4, 20) ve EKOK(4, 20) sırasıyla kaçtır?",
      "options": [
        "4 ve 20",
        "1 ve 80",
        "20 ve 4",
        "4 ve 80",
        "0 ve 20"
      ],
      "optionReasons": [
        "4/4=1; 20/4=5; 20/20=1.",
        "4’ün tamamı iki sayının ortak bölenidir; EBOB 1 olamaz. 80 ortak kat olsa da 20 daha küçüktür.",
        "20, 4’ü bölmez; 4, 20’nin katı değildir; roller ters.",
        "EBOB doğru; 20 zaten her ikisinin katı olduğundan 80 en küçük değildir.",
        "Sıfır bölen değildir; 4 en büyük ortak pozitif bölendir."
      ],
      "knowledge": [
        "EBOB ortak pozitif bölenlerin en büyüğü; EKOK ortak pozitif katların en küçüğüdür.",
        "Önce bölme yönünü ve bütün başlangıç koşullarını yaz; sonucun birimini ve her koşulu ayrı denetle."
      ],
      "strategy": "Bir sayının diğerini böldüğü özel durumu kullan.",
      "steps": [
        "20=4×5; 4 başlangıç sayılarının ikisini de böler.",
        "Ortak bölen 4’ü aşamaz, çünkü 4’ü de bölmelidir.",
        "20 her ikisinin en küçük pozitif ortak katıdır."
      ],
      "commonError": "Her durumda başlangıç sayılarını doğrudan çarpmak EKOK vermez.",
      "check": "4/4=1; 20/4=5; 20/20=1."
    },
    {
      "code": "Q05",
      "prompt": "2, 4, 8 için başlangıç sayılarının çarpımı ile EBOB×EKOK çarpımı hangi seçenekte doğru karşılaştırılmıştır?",
      "options": [
        "64 ve 16; eşit değildir.",
        "64 ve 64; iki sayılı kural üç sayıda da geçerlidir.",
        "16 ve 64; eşit değildir.",
        "64 ve 0; EBOB 0’dır.",
        "16 ve 16; eşittir."
      ],
      "optionReasons": [
        "2 her sayıyı böler; 8 her sayıya tam bölünür, fakat 64≠16.",
        "EBOB 2, EKOK 8 olduğundan ikinci çarpım 16’dır; 64 değildir.",
        "Başlangıç çarpımı 2×4×8=64; ikinci çarpım 2×8=16. Değerler ters.",
        "Pozitif sayıların EBOB’u 0 olamaz; en büyük ortak bölen 2’dir.",
        "Başlangıç çarpımı 16 değil 64’tür; 4 çarpanı kaybolmuş."
      ],
      "knowledge": [
        "EBOB ortak pozitif bölenlerin en büyüğü; EKOK ortak pozitif katların en küçüğüdür.",
        "Önce bölme yönünü ve bütün başlangıç koşullarını yaz; sonucun birimini ve her koşulu ayrı denetle."
      ],
      "strategy": "Üç sayıda iki çarpımı ayrı hesapla.",
      "steps": [
        "EBOB(2, 4, 8)=2; EKOK(2, 4, 8)=8.",
        "Başlangıç çarpımı 2×4×8=64.",
        "EBOB×EKOK=2×8=16."
      ],
      "commonError": "İki sayılı ürün özdeşliğini üç sayıya taşıma.",
      "check": "2 her sayıyı böler; 8 her sayıya tam bölünür, fakat 64≠16."
    },
    {
      "code": "Q06",
      "prompt": "252=198×1+54; 198=54×3+36; 54=36×1+18; 36=18×2+0. EBOB(252, 198) kaçtır?",
      "options": [
        "18",
        "0",
        "36",
        "54",
        "2"
      ],
      "optionReasons": [
        "252/18=14; 198/18=11; EKOK=14×198=2772.",
        "Son 0 bölme işleminin bittiğini söyler; başlangıç sayılarının böleni değildir.",
        "198/36 tam sayı değildir; 36 ortak bölen olamaz.",
        "198/54 tam sayı değildir; 54 ortak bölen olamaz.",
        "2 son bölümdür; ortak bölen olsa da 18 daha büyüktür."
      ],
      "knowledge": [
        "a=bq+r ve 0≤r<b iken EBOB(a, b)=EBOB(b, r). Her iki çiftin ortak bölen kümesi aynıdır.",
        "Öklid yöntemi sıfır kalanla biter; cevap son sıfır olmayan kalandır. Bölüm ile kalan farklı niceliklerdir."
      ],
      "strategy": "Öklid zincirinde son sıfır olmayan kalanı seç.",
      "steps": [
        "Her bölmede EBOB(a, b)=EBOB(b, r).",
        "Çiftler(252, 198)→(198, 54)→(54, 36)→(36, 18).",
        "Son sıfır olmayan kalan 18’dir."
      ],
      "commonError": "Son bölüm ile son kalanı karıştırma.",
      "check": "252/18=14; 198/18=11; EKOK=14×198=2772."
    },
    {
      "code": "Q07",
      "prompt": "36 cm×24 cm dikdörtgen eş karelerle kaplanacak. Kareler kenarlara paralel, kesilmeden ve boşluksuz yerleşiyor. En az kaç kare gerekir?",
      "options": [
        "6",
        "5",
        "10",
        "24",
        "1"
      ],
      "optionReasons": [
        "6×12²=864 cm²=36×24.",
        "5, aynı ölçülerdeki iki ipin 12 cm parçalara ayrılmasındaki 3+2’dir; alan kaplamada 3×2 gerekir.",
        "10, kapalı çevrede 12 cm aralıklı işaret sayısıdır; dolu kaplama adedi değildir.",
        "6 cm kare kenarı seçilirse 24 kare olur; 12 cm geçerli olduğu için en az değildir.",
        "36×24 dikdörtgen kare değildir; tek bir eş kareyle kesmeden kaplanmaz."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "En az adet için en büyük geçerli kare kenarını bul.",
      "steps": [
        "Kare kenarı s, 36 ve 24’ü tam bölmeli.",
        "En büyük uygun kenar EBOB(36,24)=12 cm.",
        "Sütun sayısı=36/12=3; satır sayısı=24/12=2; adet 3×2=6."
      ],
      "commonError": "“En az” görünce EKOK seçme; aranan kenar verileri bölüyor.",
      "check": "6×12²=864 cm²=36×24."
    },
    {
      "code": "Q08",
      "prompt": "36 cm ve 24 cm iki ip, ayrı ayrı kesilerek kayıpsız biçimde en uzun eş boy parçalara ayrılıyor. Parça boyu, toplam parça ve toplam kesim sayısı hangisidir? Üst üste kesim yoktur.",
      "options": [
        "12 cm; 5 parça; 3 kesim",
        "12 cm; 6 parça; 4 kesim",
        "12 cm; 5 parça; 5 kesim",
        "6 cm; 10 parça; 8 kesim",
        "72 cm; 1 parça; 0 kesim"
      ],
      "optionReasons": [
        "3×12=36; 2×12=24; iki ayrı ipte toplam kesim parça sayısından 2 eksiktir.",
        "12 cm için iplerde 3 ve 2 parça, toplam 5 vardır; 6, kaplama çarpımını yanlış taşır.",
        "Boy ve parça doğru; ayrı her ipte parça−1 kesim: 2+1=3.",
        "Bu kesim geçerlidir fakat 6 cm en uzun değildir; 12 cm de her iki boyu böler.",
        "72 cm iki ipin içine sığmaz; ipleri birleştirme izni verilmedi."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "Her ipin parça ve kesimini ayrı say.",
      "steps": [
        "EBOB(36, 24)=12 cm en uzun ortak boydur.",
        "Parçalar 3+2=5.",
        "Ayrı kesimler(3−1)+(2−1)=3."
      ],
      "commonError": "İki boyutlu kaplamadaki çarpımı ip parçası sayısına taşıma.",
      "check": "3×12=36; 2×12=24; iki ayrı ipte toplam kesim parça sayısından 2 eksiktir."
    },
    {
      "code": "Q09",
      "prompt": "36 cm×24 cm kapalı dikdörtgenin çevresine, her köşeye gelecek biçimde en büyük eşit aralıklarla işaretler konuyor. İşaret sayısı kaçtır?",
      "options": [
        "10",
        "11",
        "6",
        "5",
        "120"
      ],
      "optionReasons": [
        "Her 36 cm kenarda 3, her 24 cm kenarda 2 aralık; toplam 3+2+3+2=10.",
        "Kapalı çevrede başlangıç ve bitiş aynı işarettir;+1 eklemek onu iki kez sayar.",
        "6, dikdörtgeni 12 cm karelerle kaplama adedidir; çevredeki nokta sayısı değildir.",
        "5, iki ayrı ipin parça sayısıdır; çevrenin tamamı 120 cm’dir.",
        "120 cm çevre uzunluğudur; işaret sayısı için 12 cm aralığa bölünür."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "Uzunluk ile kapalı çevredeki aralık sayısını ayır.",
      "steps": [
        "En büyük aralık EBOB(36,24)=12 cm.",
        "Çevre 2(36+24)=120 cm.",
        "Kapalı çevrede 120/12=10 işaret."
      ],
      "commonError": "Açık kenardaki iki uç dahil +1 kuralını kapalı çevreye ekleme.",
      "check": "Her 36 cm kenarda 3, her 24 cm kenarda 2 aralık; toplam 3+2+3+2=10."
    },
    {
      "code": "Q10",
      "prompt": "Başlangıçta birlikte çalışan A her 12 dk, B her 18 dk çalışıyor. İlk yeniden birlikte çalışma kaç dakika sonra olur?",
      "options": [
        "36",
        "0",
        "6",
        "30",
        "216"
      ],
      "optionReasons": [
        "36/12=3; 36/18=2; daha küçük pozitif ortak kat yoktur.",
        "0 başlangıçtır;“yeniden” ilk pozitif ortak anı ister.",
        "6 EBOB’dur; 6/12 ve 6/18 tam döngü değildir.",
        "30/12 ve 30/18 tam sayı değildir; iki cihaz aynı anda çalışmaz.",
        "216 ortak kattır fakat 36 daha küçük pozitif ortak kattır."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "Ortak başlangıçtaki ilk pozitif ortak katı seç.",
      "steps": [
        "A anları 0, 12, 24, 36,…; B anları 0, 18, 36,…",
        "12=2²×3; 18=2×3².",
        "EKOK=2²×3²=36 dk."
      ],
      "commonError": "Başlangıç 0 ile sonraki ortak olayı karıştırma.",
      "check": "36/12=3; 36/18=2; daha küçük pozitif ortak kat yoktur."
    },
    {
      "code": "Q11",
      "prompt": "A ve B başlangıçta birlikte çalışıyor; periyotları 12 ve 18 dk. [0, 72] aralığında, başlangıç ve 72.dk dahil, kaç ortak çalışma olayı vardır?",
      "options": [
        "3",
        "2",
        "1",
        "5",
        "7"
      ],
      "optionReasons": [
        "[0, 72) veya(0, 72] istenseydi 2 olay olurdu.",
        "72/36=2 aralık vardır; başlangıç dahil olduğu için olaylar 3 tanedir.",
        "Yalnız 36’yı saymak 0 ve 72’deki dahil olayları eksiltir.",
        "5, 30 dk ortak periyotla[0, 120] sayımına aittir; burada ortak periyot 36 dk’dır.",
        "12 dk’lık A olayları 7 tanedir; hepsi B ile ortak değildir."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "Önce ortak anları, sonra uçların dahil oluşunu denetle.",
      "steps": [
        "Ortak periyot EKOK(12,18)=36 dk.",
        "İki uç dahil ortak anlar 0, 36, 72.",
        "Liste üç eleman içerir."
      ],
      "commonError": "Aralık sayısını olay sayısı diye kullanma.",
      "check": "[0, 72) veya(0, 72] istenseydi 2 olay olurdu."
    },
    {
      "code": "Q12",
      "prompt": "09.50’de birlikte başlayan iki düzenin ilk yeniden ortak çalışması 36 dakika sonradır. Saat kaç olur?",
      "options": [
        "10.26",
        "09.86",
        "10.36",
        "10.14",
        "09.26"
      ],
      "optionReasons": [
        "09.50’den 10.26’ya 10+26=36 dk vardır.",
        "Dakika alanı 60’a ulaşınca saate aktarılır; 86 dakikalı saat yazımı geçersizdir.",
        "10.00’a ulaşırken 10 dakika zaten kullanıldı; 36 dakikanın tamamı tekrar eklenmez.",
        "09.50’ye 36 dakika eklemek 14 dakika değil 36 dakika ilerletir; 10.14 yalnız 24 dakika sonradır.",
        "Bu saat başlangıçtan önce görünür; 36 dakika ileri gidildiğinde saat 10’a taşar."
      ],
      "knowledge": [
        "Bir saat 60 dakikadır; dakika alanı 60’a ulaşınca saat 1 artar.",
        "Önce bir sonraki tam saate kalan dakikayı bul; toplam süreden bunu çıkarıp kalan dakikayı ekle."
      ],
      "strategy": "Önce tam saate ulaş, sonra kalan süreyi ekle.",
      "steps": [
        "09.50+10 dk=10.00.",
        "36−10=26 dk kalır.",
        "10.00+26 dk=10.26."
      ],
      "commonError": "Saatin dakika alanını 100 tabanlı sayı gibi toplama.",
      "check": "09.50’den 10.26’ya 10+26=36 dk vardır."
    },
    {
      "code": "Q13",
      "prompt": "A ilk kez 0.dk’da ve sonra her 12 dk; B ilk kez 6.dk’da ve sonra her 18 dk çalışıyor. İlk ortak çalışma kaçıncı dakikadadır?",
      "options": [
        "24",
        "0",
        "6",
        "18",
        "36"
      ],
      "optionReasons": [
        "Daha küçük A anları 0 ve 12, B dizisinde değildir.",
        "B ilk kez 6’da çalışır; 0’da ortak başlangıç yoktur.",
        "B 6’da çalışır fakat A 6’da çalışmaz.",
        "A 18’de çalışmaz; B’nin ikinci anı 24’tür.",
        "A 36’da çalışır; B’nin anları 6,24,42 olduğundan 36 ortak değildir."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "Başlangıçları ayrı tutup iki diziyi karşılaştır.",
      "steps": [
        "A: 0, 12, 24, 36,…",
        "B: 6, 24, 42,…",
        "İlk kesişim 24; 24=12×2=6+18×1."
      ],
      "commonError": "EKOK 36’yı kaymış başlangıçta ilk an diye seçme.",
      "check": "Daha küçük A anları 0 ve 12, B dizisinde değildir."
    },
    {
      "code": "Q14",
      "prompt": "Pozitif N sayısı 8 ve 12 ile bölününce 5 kalıyor. 100’den büyük en küçük N kaçtır?",
      "options": [
        "101",
        "77",
        "100",
        "120",
        "125"
      ],
      "optionReasons": [
        "5<8 ve 5<12; k 3 uymaz, k 4 uyar.",
        "77 iki kalan koşulunu sağlar fakat 100’den büyük değildir.",
        "100’ün 8 ile kalanı 4, 12 ile kalanı 4’tür; 5 değildir.",
        "120 her iki sayıya tam bölünür; istenen kalan 5’tir.",
        "125 uygundur fakat 101 de uygundur ve daha küçüktür."
      ],
      "knowledge": [
        "N=dq+r eşitliğinde d pozitif bölen, q tam sayı bölüm ve r kalandır; 0≤r<d. N−r, bölenin tam katıdır.",
        "İki bölende aynı kalan varsa N−r ortak kattır; N=EKOK×k+r. Kalanlar farklıysa her bölme ayrı yazılır. İstenen alt/üst sınır ayrıca denetlenir."
      ],
      "strategy": "Ortak kat dizisinde sınırdan sonraki ilk adayı bul.",
      "steps": [
        "N−5, 8 ve 12’nin ortak katı; EKOK 24.",
        "N=24 k+5; k 3→77, k 4→101.",
        "101=8×12+5=12×8+5."
      ],
      "commonError": "Yalnız kalanları kontrol edip 100 sınırını unutma.",
      "check": "5<8 ve 5<12; k 3 uymaz, k 4 uyar."
    },
    {
      "code": "Q15",
      "prompt": "85 ve 133 aynı pozitif tam sayı d’ye bölününce her ikisinde 1 kalıyor. En büyük d kaçtır?",
      "options": [
        "12",
        "1",
        "4",
        "48",
        "84"
      ],
      "optionReasons": [
        "12 geçerlidir ve iki farkın daha büyük ortak böleni yoktur.",
        "Kalan 1, bölen 1’den küçük değildir; d 1 geçersizdir.",
        "4 farkları böler fakat 12 de böler; en büyük değildir.",
        "48, 84 ve 132 farklarının ikisini de bölmez; aralarındaki farkı almak tek başına yetmez.",
        "84, 132’yi bölmez; ikinci sayının kalanını 1 yapmaz."
      ],
      "knowledge": [
        "Aynı bilinmeyen d’ye bölünen farklı sayılarda her sayıdan kendi kalanı çıkarılır. d, farkların ortak bölenidir.",
        "d her kalandan büyük olmalıdır. Farkların EBOB’u bu sınırı sağlamıyorsa daha küçük bölenler de sağlayamaz; çözüm olmayabilir."
      ],
      "strategy": "Her sayıdan kalanını çıkarıp EBOB al.",
      "steps": [
        "d, 85−1=84 ve 133−1=132’yi böler.",
        "EBOB 84, 132=12.",
        "12>1; 85=12×7+1; 133=12×11+1."
      ],
      "commonError": "Verilen 85 ve 133’ün kendilerinin EBOB’unu alma.",
      "check": "12 geçerlidir ve iki farkın daha büyük ortak böleni yoktur."
    },
    {
      "code": "Q16",
      "prompt": "87’nin pozitif tam sayı d ile bölümünde 3, 134’ün d ile bölümünde 2 kalıyor. En büyük d kaçtır?",
      "options": [
        "12",
        "3",
        "6",
        "47",
        "84"
      ],
      "optionReasons": [
        "87=12×7+3; 134=12×11+2.",
        "Kalan 3, bölen 3’ten küçük değildir.",
        "6 geçerlidir fakat 12 de geçerli olduğundan en büyük değildir.",
        "47 verilen sayıların farkıdır; 84 ve 132’yi tam bölmez.",
        "84, 87’de 3 kalan verir; 134’te 50 kalan verir, istenen 2 değildir."
      ],
      "knowledge": [
        "Aynı bilinmeyen d’ye bölünen farklı sayılarda her sayıdan kendi kalanı çıkarılır. d, farkların ortak bölenidir.",
        "d her kalandan büyük olmalıdır. Farkların EBOB’u bu sınırı sağlamıyorsa daha küçük bölenler de sağlayamaz; çözüm olmayabilir."
      ],
      "strategy": "Farklı kalanları her sayıya ayrı uygula.",
      "steps": [
        "87−3=84; 134−2=132.",
        "d iki farkı bölmeli ve d>3 olmalı.",
        "EBOB 84, 132=12; iki kalan da 12’den küçük."
      ],
      "commonError": "İkinci sayıdan da 3 çıkarmak verilen koşulu değiştirir.",
      "check": "87=12×7+3; 134=12×11+2."
    },
    {
      "code": "Q17",
      "prompt": "17 ve 25 aynı pozitif tam sayı d’ye bölündüğünde her ikisinde 5 kaldığı söyleniyor. Hangisi doğrudur?",
      "options": [
        "Uygun d yoktur.",
        "En büyük d 4’tür.",
        "En büyük d 5’tir.",
        "En büyük d 12’dir.",
        "Her ortak bölen uygundur."
      ],
      "optionReasons": [
        "4’ün bütün pozitif bölenleri 1, 2, 4; hiçbiri 5’ten büyük değildir.",
        "4, farkların EBOB’udur fakat kalan 5, bölen 4’ten küçük değildir.",
        "5 ile bölmede kalan 5 olamaz; ayrıca 12 ve 20’nin ikisini bölmez.",
        "12, 20 farkını bölmez; 25 ile bölümde kalan 1 olur.",
        "Ortak bölen olma yanında d>5 gerekir; 12 ve 20’nin ortak bölenleri bu sınırı sağlayamaz."
      ],
      "knowledge": [
        "Aynı bilinmeyen d’ye bölünen farklı sayılarda her sayıdan kendi kalanı çıkarılır. d, farkların ortak bölenidir.",
        "d her kalandan büyük olmalıdır. Farkların EBOB’u bu sınırı sağlamıyorsa daha küçük bölenler de sağlayamaz; çözüm olmayabilir."
      ],
      "strategy": "EBOB sınırını kalan sınırıyla birlikte kullan.",
      "steps": [
        "d, 17−5=12 ve 25−5=20’yi böler; d≤EBOB(12, 20)=4.",
        "Kalan 5 olması d>5 gerektirir.",
        "d≤4 ve d>5 çelişir."
      ],
      "commonError": "EBOB’u hesaplayınca otomatik geçerli bölen sanma.",
      "check": "4’ün bütün pozitif bölenleri 1, 2, 4; hiçbiri 5’ten büyük değildir."
    },
    {
      "code": "Q18",
      "prompt": "a, b pozitif tam sayı; EBOB(a, b)=4, EKOK(a, b)=48. a+b’nin en küçük ve en büyük değerleri sırasıyla hangisidir?",
      "options": [
        "28 ve 52",
        "32 ve 52",
        "24 ve 48",
        "52 ve 28",
        "14 ve 26"
      ],
      "optionReasons": [
        "(4,48) ve (12,16) çiftlerinin ikisi de EBOB=4, EKOK=48 koşullarını sağlar.",
        "32,(a, b)=(8, 24)ile çıkar fakat bu çiftin EBOB’u 8’dir; 4 değil.",
        "24 ve 48, a+b’nin geçerli uçları değildir; geçerli çiftler 4, 48 ve 12, 16’dır.",
        "İki değer doğru olsa da en küçük/en büyük sırası ters çevrilmiş.",
        "Bunlar doğru toplamların yarısıdır; ortak bölen ölçeği 4 yerine 2 kullanılmış."
      ],
      "knowledge": [
        "EBOB(a, b)=d ise a=dx, b=dy ve EBOB(x, y)=1. EKOK=dxy olduğundan xy=m/d.",
        "x≤y çarpan çiftlerini eksiksiz yazıp aralarında asal olmayanları ele; asıl toplamı d ile ölçekle. Dikdörtgen çevresi kenar toplamının 2 katıdır. d, m’yi bölmüyorsa uygun iki pozitif sayı yoktur."
      ],
      "strategy": "Çarpan çiftlerini tüketip aralarında asal olmayanı ele.",
      "steps": [
        "a=4 x, b=4 y; xy=48/4=12; EBOB(x, y)=1.",
        "Çiftler 1, 12 uygun; 2, 6 geçersiz; 3, 4 uygun.",
        "Asıl toplamlar 4(1+12)=52 ve 4(3+4)=28."
      ],
      "commonError": "Yakın çifti seçerken EBOB koşulunu kaybetme.",
      "check": "(4,48) ve (12,16) çiftlerinin ikisi de EBOB=4, EKOK=48 koşullarını sağlar."
    },
    {
      "code": "Q19",
      "prompt": "18, 24, 30 için EBOB ve EKOK sırasıyla kaçtır?",
      "options": [
        "6 ve 360",
        "6 ve 12.960",
        "2 ve 360",
        "6 ve 120",
        "360 ve 6"
      ],
      "optionReasons": [
        "360/18=20; 360/24=15; 360/30=12.",
        "12.960 üç başlangıç sayısının çarpımıdır; en küçük ortak kat değildir.",
        "2 ortaktır fakat 6 da üç sayıyı böler; en büyük olamaz.",
        "120, 18’e tam bölünmez; ortak kat değildir.",
        "Ortak kat ve ortak bölen rolleri ters yazılmış."
      ],
      "knowledge": [
        "Asal çarpanlara ayırma aynı asalın kopyalarını üs olarak sayar; sayıdaki olmayan asalın üssü 0’dır.",
        "Her asalın küçük üssü ortak böleni, büyük üssü ortak katı kurar. İki sayıda EBOB×EKOK başlangıç çarpımına eşittir; üç sayıda bu ürün bağı genel değildir."
      ],
      "strategy": "Her asalın üç satırdaki üslerini karşılaştır.",
      "steps": [
        "18=2×3²; 24=2³×3; 30=2×3×5.",
        "Küçük üsler EBOB 2×3=6.",
        "Büyük üsler EKOK 2³×3²×5=360."
      ],
      "commonError": "Üç sayının çarpımını doğrudan EKOK seçme.",
      "check": "360/18=20; 360/24=15; 360/30=12."
    },
    {
      "code": "Q20",
      "prompt": "Pozitif tam sayı x için EBOB(18, 12, x)=6 ve EKOK(18, 12, x)=360. En küçük x kaçtır?",
      "options": [
        "120",
        "40",
        "60",
        "180",
        "360"
      ],
      "optionReasons": [
        "EBOB(6, 120)=6; EKOK(36, 120)=360; zorunlu en küçük asal kopyaları kullanıldı.",
        "40 eksik 2³ ve 5’i getirir fakat 6’ya bölünmez; EBOB koşulu bozulur.",
        "60’ta 2 üssü 2’dir; hedef 360 için gereken 2³ oluşmaz; EKOK 180 olur.",
        "180’te de 2 üssü 2 olduğundan EKOK 180’de kalır.",
        "360 her iki koşulu sağlar fakat 120 daha küçük geçerli adaydır."
      ],
      "knowledge": [
        "Üç sayının EBOB/EKOK’u ikili ilerlenerek hesaplanabilir. Önce bilinen çiftin EBOB ve EKOK’unu bul.",
        "Bilinmeyen x, hedef EKOK’un eksik asal kopyalarını taşımalı; aynı anda hedef EBOB koşulunu da sağlamalı. Bir koşulu sağlamak diğerini otomatik sağlamaz."
      ],
      "strategy": "Hedef EKOK’ta eksikleri bulup EBOB koşulunu da uygula.",
      "steps": [
        "İlk çiftin EBOB’u 6, EKOK’u 36=2²×3².",
        "360=2³×3²×5 için x, 2³ ve 5 taşımalı.",
        "EBOB 6 koşulu 6|x ister; en az bir 3 eklenir: x=120."
      ],
      "commonError": "40 ile yalnız EKOK’u sağlayıp durma.",
      "check": "EBOB(6, 120)=6; EKOK(36, 120)=360; zorunlu en küçük asal kopyaları kullanıldı."
    },
    {
      "code": "Q21",
      "prompt": "72 ve 120’nin pozitif ortak bölen sayısı ve bütün tam sayı ortak bölen sayısı sırasıyla kaçtır?",
      "options": [
        "8 ve 16",
        "8 ve 8",
        "6 ve 12",
        "24 ve 48",
        "9 ve 18"
      ],
      "optionReasons": [
        "Pozitifler 1, 2, 3, 4, 6, 8, 12, 24; negatifler bunların işaret değiştirmiş eşleridir.",
        "Pozitif sayım doğru; negatif ortak bölenlerin 8 eşi de toplamda bulunur.",
        "24=2³×3 için üs seçenekleri 4 ve 2 olduğundan 8 pozitif bölen vardır; 6 değil.",
        "24 EBOB’un değeridir; bölen sayısı değildir.",
        "Sıfır bölen değildir; pozitif listeye 0 eklenerek sayım artırılamaz."
      ],
      "knowledge": [
        "İki sayının ortak bölenleri EBOB’larının bölenleridir. p, q farklı asallar ve u, v negatif olmayan tam sayılar ise EBOB=pᵘ×qᵛ için pozitif bölen sayısı(u+1)(v+1); 0 üs de bir seçimdir.",
        "Her pozitif bölenin bir negatif eşi vardır. Bütün tam sayı bölen sayısı pozitif sayının 2 katı; 0 bölen değildir."
      ],
      "strategy": "EBOB’un bölenlerini üs seçenekleriyle say.",
      "steps": [
        "EBOB 72, 120=24=2³×3.",
        "Pozitif ortak bölen sayısı(3+1)(1+1)=8.",
        "Her pozitifin bir negatifi: toplam 16."
      ],
      "commonError": "Bölenin sayısı ile bölenin kendi değerini ayır.",
      "check": "Pozitifler 1, 2, 3, 4, 6, 8, 12, 24; negatifler bunların işaret değiştirmiş eşleridir."
    },
    {
      "code": "Q22",
      "prompt": "12 cm ve 18 cm kenarlı küpler her boy ayrı kullanılarak eş büyüklükte iki dolu küp oluşturacak. Kesme/boşluk yok, kenarlar paralel. En küçük ortak büyük kenar ve sırasıyla küçük küp adetleri nedir?",
      "options": [
        "36 cm; 27 ve 8",
        "6 cm; 27 ve 8",
        "36 cm; 3 ve 2",
        "36 cm; 9 ve 4",
        "216 cm; 5.832 ve 1.728"
      ],
      "optionReasons": [
        "27×12³=8×18³=36³=46.656 cm³.",
        "6 cm, EBOB’dur; küçük küplerden bile kısa olduğundan onları kesmeden içine alamaz.",
        "Kenar oranları 3 ve 2 doğru; dolu küpte üç eksen olduğu için küpleri alınmalıdır.",
        "9 ve 4 yüzeydeki kare sayımıdır; hacimde üçüncü eksen eksik.",
        "Bu daha büyük ortak kenar olabilir fakat 36 cm de uygundur; en küçük değildir."
      ],
      "knowledge": [
        "Her boy ayrı kullanılarak kesimsiz/boşluksuz kurulan dolu küpte büyük kenar küçük kenarın tam katı olmalı. En küçük ortak büyük kenar EKOK’tur.",
        "Her eksende L/aadet varsa dolu küpte(L/a)³parça bulunur. Kenar cm, hacimcm³ile ölçülür."
      ],
      "strategy": "Kenar için EKOK, adet için üç boyutlu oran kullan.",
      "steps": [
        "Büyük kenar 12 ve 18’in ortak katı; EKOK 36 cm.",
        "12 cm küp için eksen başına 3; toplam 3³=27.",
        "18 cm küp için eksen başına 2; toplam 2³=8."
      ],
      "commonError": "İki farklı küp boyunu aynı büyük küpte karıştırmaya izin verilmedi.",
      "check": "27×12³=8×18³=36³=46.656 cm³."
    },
    {
      "code": "Q23",
      "prompt": "a<b pozitif tam sayılar; EBOB(a, b)=6, EKOK(a, b)=180. En küçük a+b kaçtır?",
      "options": [
        "66",
        "186",
        "102",
        "78",
        "60"
      ],
      "optionReasons": [
        "a=30, b=36; EBOB 6, EKOK 180 ve 30<36.",
        "(6, 180)çifti geçerlidir fakat toplam 186 en küçük değildir; 30 ve 36 daha küçük toplam verir.",
        "(12, 90)geçerli fakat 30 ve 36 toplam 66 ile daha iyidir.",
        "(18, 60)geçerlidir; 30 ve 36 toplam 66 ile daha küçüktür.",
        "Geçerli çarpan çiftlerinin asıl toplamları 186, 102, 78, 66’dır; 60 bu listede yoktur."
      ],
      "knowledge": [
        "EBOB(a, b)=d ise a=dx, b=dy ve EBOB(x, y)=1. EKOK=dxy olduğundan xy=m/d.",
        "x≤y çarpan çiftlerini eksiksiz yazıp aralarında asal olmayanları ele; asıl toplamı d ile ölçekle. Dikdörtgen çevresi kenar toplamının 2 katıdır. d, m’yi bölmüyorsa uygun iki pozitif sayı yoktur."
      ],
      "strategy": "Bütün çarpan çiftlerini ve aralarında asal olma koşulunu denetle.",
      "steps": [
        "a=6 x, b=6 y; xy=30, EBOB(x, y)=1 ve x<y.",
        "Çiftler(1, 30),(2, 15),(3, 10),(5, 6); hepsi aralarında asal.",
        "En küçük x+y=11; 6×11=66."
      ],
      "commonError": "Yalnız bir geçerli çift göstererek en küçük olduğunu söyleme.",
      "check": "a=30, b=36; EBOB 6, EKOK 180 ve 30<36."
    },
    {
      "code": "Q24",
      "prompt": "60 ve 84 için EBOB, EKOK ve pozitif ortak bölen sayısı sırasıyla hangisidir?",
      "options": [
        "12; 420; 6",
        "12; 420; 12",
        "6; 840; 4",
        "12; 5.040; 6",
        "420; 12; 6"
      ],
      "optionReasons": [
        "Liste 1, 2, 3, 4, 6, 12; 420/60=7; 420/84=5.",
        "İlk iki değer doğru; 12 EBOB’un değeridir, pozitif bölen sayısı 6’dır.",
        "6 ortaktır fakat 12 daha büyük ortak bölen; 840 da 420’den büyük ortak kattır.",
        "5.040 çarpımdır; EBOB 12’ye bölünmeden EKOK olmaz.",
        "Bölen/kat değerleri ters yazılmış; 420, 60’ı bölmez."
      ],
      "knowledge": [
        "Asal çarpanlara ayırma aynı asalın kopyalarını üs olarak sayar; sayıdaki olmayan asalın üssü 0’dır.",
        "Her asalın küçük üssü ortak böleni, büyük üssü ortak katı kurar. İki sayıda EBOB×EKOK başlangıç çarpımına eşittir; üç sayıda bu ürün bağı genel değildir."
      ],
      "strategy": "Hesaplanan EBOB’un bölenlerini ayrıca say.",
      "steps": [
        "60=2²×3×5; 84=2²×3×7.",
        "EBOB 12=2²×3; EKOK 420=2²×3×5×7.",
        "Pozitif ortak bölenler 12’nin bölenleri; adet(2+1)(1+1)=6."
      ],
      "commonError": "EBOB’un sayısal değeri bölen adedi değildir.",
      "check": "Liste 1, 2, 3, 4, 6, 12; 420/60=7; 420/84=5."
    },
    {
      "code": "Q25",
      "prompt": "40 cm×56 cm dikdörtgen kenarlara paralel eş karelerle kayıpsız kaplanıyor. En az kare adedi ile 40 cm ve 56 cm iki ayrı ipin en uzun aynı boy parçalara kesilmesindeki toplam adet sırasıyla nedir?",
      "options": [
        "35 ve 12",
        "12 ve 35",
        "35 ve 10",
        "140 ve 24",
        "8 ve 8"
      ],
      "optionReasons": [
        "35×64=2240 cm²; 12×8=96 cm.",
        "Dikdörtgende 5×7; iplerde 5+7 kullanılır; roller ters.",
        "35 kare doğrudur; 10 iki ipin toplam kesim sayısıdır, parça sayısı 12’dir.",
        "4 cm boyla 140 kare ve 24 ip parçası olur; 8 cm geçerli olduğundan bu boy en uzun değildir.",
        "8 cm en büyük ortak boydur; iki adet sorusunun cevabı değildir."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "Boyu ortak bul, adetleri şekle göre ayır.",
      "steps": [
        "EBOB 40, 56=8 cm.",
        "Dikdörtgende 40/8=5, 56/8=7; 5×7=35 kare.",
        "İplerde 5+7=12 parça."
      ],
      "commonError": "Her problemin aynı EBOB’u kullanması aynı adet formülünü kullanacağı anlamına gelmez.",
      "check": "35×64=2240 cm²; 12×8=96 cm."
    },
    {
      "code": "Q26",
      "prompt": "0’da birlikte başlayan iki sinyal 10 ve 15 dk aralıklarla çalıyor. İlk yeniden ortak süre ve[0, 120]içindeki ortak olay adedi sırasıyla nedir?",
      "options": [
        "30 dk ve 5",
        "5 dk ve 25",
        "30 dk ve 4",
        "150 dk ve 1",
        "30 dk ve 13"
      ],
      "optionReasons": [
        "120/30=4 aralık; liste 5 eleman.",
        "5 EBOB’dur; yeniden ortak çalışma periyodu değildir.",
        "30 doğrudur; 4 aralık vardır fakat başlangıç da dahil 5 olay olur.",
        "150 ortak kattır fakat 30 daha küçüktür; 120’ye kadar 0, 30, 60, 90, 120 vardır.",
        "13, A’nın 10 dk aralıklarla tüm olaylarını sayar; hepsi B ile ortak değildir."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "İlk pozitif ortak süreyle olay sayısını ayrı hesapla.",
      "steps": [
        "EKOK 10, 15=30 dk.",
        "Ortak anlar 0, 30, 60, 90, 120.",
        "İki uç dahil 5 olay."
      ],
      "commonError": "120/30 sonucu aralık sayısıdır; başlangıç dahilse olay için 1 eklenir.",
      "check": "120/30=4 aralık; liste 5 eleman."
    },
    {
      "code": "Q27",
      "prompt": "Pozitif N sayısı 6 ve 8 ile bölününce 1 kalıyor. 200’den küçük en büyük N kaçtır?",
      "options": [
        "193",
        "169",
        "192",
        "199",
        "201"
      ],
      "optionReasons": [
        "Bir sonraki 217, sınırı aşar; 193 en büyük uygundur.",
        "169 kalan koşullarını sağlar fakat 193 daha büyük ve 200’den küçüktür.",
        "192 her ikisine tam bölünür; kalan 0 olur.",
        "199’un 6 ile kalanı 1 ama 8 ile kalanı 7’dir.",
        "201, 200 sınırını aşar; 6 ile kalanı da 3’tür."
      ],
      "knowledge": [
        "N=dq+r eşitliğinde d pozitif bölen, q tam sayı bölüm ve r kalandır; 0≤r<d. N−r, bölenin tam katıdır.",
        "İki bölende aynı kalan varsa N−r ortak kattır; N=EKOK×k+r. Kalanlar farklıysa her bölme ayrı yazılır. İstenen alt/üst sınır ayrıca denetlenir."
      ],
      "strategy": "Üst sınırın altındaki son ortak kat adayını seç.",
      "steps": [
        "N−1 ortak kat; EKOK 6, 8=24.",
        "N=24 k+1; k 8→193, k 9→217.",
        "193=6×32+1=8×24+1."
      ],
      "commonError": "Her iki kalan koşulunu ve sınırı ayrı denetle.",
      "check": "Bir sonraki 217, sınırı aşar; 193 en büyük uygundur."
    },
    {
      "code": "Q28",
      "prompt": "a, b pozitif tam sayı; EBOB(a, b)=5, EKOK(a, b)=150. En küçük a+b kaçtır?",
      "options": [
        "55",
        "155",
        "85",
        "65",
        "30"
      ],
      "optionReasons": [
        "a=25, b=30; EBOB 5, EKOK 150.",
        "5 ve 150 geçerli ama toplam 155 en küçük değildir.",
        "10 ve 75 geçerli fakat 25 ve 30 toplam 55 ile daha küçüktür.",
        "15 ve 50 geçerli fakat 25 ve 30 toplam 55 ile daha küçüktür.",
        "30, xy çarpımıdır; asıl sayıların toplamı değildir."
      ],
      "knowledge": [
        "EBOB(a, b)=d ise a=dx, b=dy ve EBOB(x, y)=1. EKOK=dxy olduğundan xy=m/d.",
        "x≤y çarpan çiftlerini eksiksiz yazıp aralarında asal olmayanları ele; asıl toplamı d ile ölçekle. Dikdörtgen çevresi kenar toplamının 2 katıdır. d, m’yi bölmüyorsa uygun iki pozitif sayı yoktur."
      ],
      "strategy": "Aralarında asal çarpan çiftlerini ölçekle.",
      "steps": [
        "a=5 x, b=5 y; xy=30; EBOB(x, y)=1.",
        "Çiftler 1, 30; 2, 15; 3, 10; 5, 6 hepsi uygundur.",
        "En küçük toplam 5(5+6)=55."
      ],
      "commonError": "xy değerini x+y veya a+b olarak kullanma.",
      "check": "a=25, b=30; EBOB 5, EKOK 150."
    },
    {
      "code": "Q29",
      "prompt": "77 ve 113 aynı pozitif tam sayı d’ye bölününce 5 kalıyor. En büyük d kaçtır?",
      "options": [
        "36",
        "5",
        "12",
        "72",
        "108"
      ],
      "optionReasons": [
        "36 her iki düzeltilmiş sayıyı böler ve en büyüktür.",
        "Kalan 5, bölen 5’ten küçük değildir.",
        "12 geçerli fakat 36 da iki farkı böler; en büyük değildir.",
        "72, 108 farkını tam bölmez; ikinci koşul bozulur.",
        "108, 72 farkını bölmez; 77’nin kalanını 5 yapmaz."
      ],
      "knowledge": [
        "Aynı bilinmeyen d’ye bölünen farklı sayılarda her sayıdan kendi kalanı çıkarılır. d, farkların ortak bölenidir.",
        "d her kalandan büyük olmalıdır. Farkların EBOB’u bu sınırı sağlamıyorsa daha küçük bölenler de sağlayamaz; çözüm olmayabilir."
      ],
      "strategy": "Artıkları çıkarıp ortak böleni kalanla karşılaştır.",
      "steps": [
        "77−5=72; 113−5=108.",
        "EBOB 72, 108=36.",
        "36>5; 77=36×2+5; 113=36×3+5."
      ],
      "commonError": "Bölenin kalandan büyük olmasını unutma.",
      "check": "36 her iki düzeltilmiş sayıyı böler ve en büyüktür."
    },
    {
      "code": "Q30",
      "prompt": "12, 18, 30 için EBOB, EKOK ve bu iki sonucun çarpımı hangisidir?",
      "options": [
        "6; 180; 1.080",
        "6; 180; 6.480",
        "6; 360; 2.160",
        "3; 180; 540",
        "180; 6; 1.080"
      ],
      "optionReasons": [
        "12×18×30=6480≠1080; 180 her üçüne tam bölünür.",
        "İlk iki sonuç doğru; çarpımları 1080’dir. 6480, üç başlangıç sayısının çarpımıdır.",
        "360 ortak kat olsa da 180 de ortaktır ve daha küçüktür.",
        "3 ortak bölen fakat 6 da her üçünü böler; en büyük değildir.",
        "Çarpım aynı kalsa da EBOB ve EKOK rolleri ters yazılmış."
      ],
      "knowledge": [
        "Asal çarpanlara ayırma aynı asalın kopyalarını üs olarak sayar; sayıdaki olmayan asalın üssü 0’dır.",
        "Her asalın küçük üssü ortak böleni, büyük üssü ortak katı kurar. İki sayıda EBOB×EKOK başlangıç çarpımına eşittir; üç sayıda bu ürün bağı genel değildir."
      ],
      "strategy": "Üç sayıda küçük/büyük asal üsleri uygula.",
      "steps": [
        "12=2²×3; 18=2×3²; 30=2×3×5.",
        "EBOB 2×3=6; EKOK 2²×3²×5=180.",
        "İki sonuç çarpımı 6×180=1080."
      ],
      "commonError": "İki sayılı ürün özdeşliğini üç başlangıç sayısıyla kullanma.",
      "check": "12×18×30=6480≠1080; 180 her üçüne tam bölünür."
    },
    {
      "code": "Q31",
      "prompt": "A 0’da başlayıp her 8 dk, B ilk kez 4.dk’da ve sonra her 12 dk çalışıyor. İlk ortak an kaçıncı dakikadadır?",
      "options": [
        "16",
        "0",
        "4",
        "24",
        "12"
      ],
      "optionReasons": [
        "Daha küçük A anları 0 ve 8, B dizisinde yoktur.",
        "B 0’da çalışmaz; başlangıç ortaktır varsayımı yanlış.",
        "A 4’te çalışmaz.",
        "24, A’nın anıdır; B’nin anları 4, 16, 28 olduğundan ortak değildir.",
        "A 12’de, B 12’de çalışmaz; iki dizide de yer almaz."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "Kaymış başlangıçları ayrı olay dizileriyle çöz.",
      "steps": [
        "A: 0, 8, 16, 24,…",
        "B: 4, 16, 28,…",
        "İlk kesişim 16; 16=8×2=4+12×1."
      ],
      "commonError": "EKOK 24, ilk ortak anı tek başına vermez.",
      "check": "Daha küçük A anları 0 ve 8, B dizisinde yoktur."
    },
    {
      "code": "Q32",
      "prompt": "Aynı pozitif toplam sayfa sayısı 14’lü ve 21’li demetlerle ayrı ayrı eksiksiz paketlenebiliyor. Kesme yok. En küçük toplam ve demet adetleri sırasıyla nedir?",
      "options": [
        "42 sayfa; 3 ve 2",
        "7 sayfa; 2 ve 3",
        "42 sayfa; 2 ve 3",
        "294 sayfa; 21 ve 14",
        "35 sayfa; 2 ve 1"
      ],
      "optionReasons": [
        "3×14=2×21=42 sayfa.",
        "7 ortak bölen olsa da 14 ve 21’lik tam demetlerin içine ulaşmaz; istenen ortak toplamdır.",
        "Toplam doğrudur; 14’lü adet 3, 21’li adet 2 olduğundan sıra ters.",
        "Bu toplam uygundur fakat 42 daha küçüktür; en küçük değil.",
        "35, 14 ve 21’in tam katı değildir; artık kalır."
      ],
      "knowledge": [
        "EBOB ortak pozitif bölenlerin en büyüğü; EKOK ortak pozitif katların en küçüğüdür.",
        "Önce bölme yönünü ve bütün başlangıç koşullarını yaz; sonucun birimini ve her koşulu ayrı denetle."
      ],
      "strategy": "Ortak toplamı parça boyundan ayır.",
      "steps": [
        "Toplam 14 ve 21’in ortak pozitif katı.",
        "EKOK 14, 21=42 sayfa.",
        "42/14=3; 42/21=2 demet."
      ],
      "commonError": "Kesme olmadığı halde EBOB 7’yi toplam seçme.",
      "check": "3×14=2×21=42 sayfa."
    },
    {
      "code": "Q33",
      "prompt": "18 m×30 m kapalı dikdörtgen parkın çevresine köşeler dahil en büyük eşit aralıklarla işaret konuyor. Aralık, kapalı çevredeki işaret adedi ve yalnız 18 m’lik açık kenardaki iki uç dahil nokta adedi nedir?",
      "options": [
        "6 m; 16; 4",
        "6 m; 17; 4",
        "6 m; 16; 3",
        "90 m; 1; 1",
        "6 m; 8; 4"
      ],
      "optionReasons": [
        "Kapalı 0 ve 96 m aynı nokta; açık 0 ve 18 m farklı uçlar.",
        "Açık kenar doğrudur fakat kapalı çevreye+1 eklemek başlangıcı iki kez sayar.",
        "Kapalı sayım doğru; 18 m açık kenarda 3 aralık ve iki uç dahil 4 nokta vardır.",
        "90 EKOK’tur; 18 m kenardan uzun aralık köşelere uymaz.",
        "Çevre 18+30 değil 2(18+30)=96 m; 48 m yarım çevreyi sayar."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "Kapalı ve açık çizgide uç koşulunu ayrı uygula.",
      "steps": [
        "En büyük aralık EBOB(18,30)=6 m.",
        "Çevre 96 m; 96/6=16 işaret.",
        "Açık 18 m kenarda 18/6+1=4 nokta."
      ],
      "commonError": "Aralık sayısı ile işaret sayısı her koşulda aynı değildir.",
      "check": "Kapalı 0 ve 96 m aynı nokta; açık 0 ve 18 m farklı uçlar."
    },
    {
      "code": "Q34",
      "prompt": "EBOB(20, 30, x)=10 ve EKOK(20, 30, x)=420. En küçük pozitif tam sayı x kaçtır?",
      "options": [
        "70",
        "7",
        "10",
        "42",
        "420"
      ],
      "optionReasons": [
        "EBOB 10, 70=10; EKOK 60, 70=420.",
        "7 eksik asalı taşır fakat 10’a bölünmediği için EBOB 10 koşulunu sağlamaz.",
        "10 EBOB koşuluna uyar fakat yeni 7 asalı getirmez; EKOK 60 kalır.",
        "42 ile EBOB(10, 42)=2 olur; hedef 10 bozulur.",
        "420 uygundur fakat 70 daha küçük uygun sayıdır."
      ],
      "knowledge": [
        "Üç sayının EBOB/EKOK’u ikili ilerlenerek hesaplanabilir. Önce bilinen çiftin EBOB ve EKOK’unu bul.",
        "Bilinmeyen x, hedef EKOK’un eksik asal kopyalarını taşımalı; aynı anda hedef EBOB koşulunu da sağlamalı. Bir koşulu sağlamak diğerini otomatik sağlamaz."
      ],
      "strategy": "Eksik asal ile ortak bölen koşulunu birlikte kur.",
      "steps": [
        "İlk çiftin EBOB’u 10, EKOK’u 60=2²×3×5.",
        "Hedef 420=2²×3×5×7; x’te 7 gerekir.",
        "EBOB=10 için 10|x; en küçük x=70."
      ],
      "commonError": "Sadece 7’yi ekleyip EBOB koşulunu atlama.",
      "check": "EBOB 10, 70=10; EKOK 60, 70=420."
    },
    {
      "code": "Q35",
      "prompt": "Bir çözüm “60 ve 84 farklı olduğundan EKOK=5040” diyor. Hatalı gerekçenin onarımı ve yeni 72, 90 çiftinin EKOK’u hangisidir?",
      "options": [
        "Farklılık aralarında asallık değildir; EKOK 360’tır.",
        "Farklılık yeterlidir; EKOK 6480’dir.",
        "Her iki sayı asal olmalıdır; EKOK 18’dir.",
        "Her farklı çiftin EBOB’u 1’dir; EKOK 360’tır.",
        "Ortak bölenleri yoktur; EKOK 720’dir."
      ],
      "optionReasons": [
        "360/72=5; 360/90=4.",
        "72×90=6480 çarpımdır; ortak bölen 18 olduğundan EKOK 360 çıkar.",
        "Aralarında asal olmak iki sayının asal olması demek değildir; 18 burada EBOB’dur.",
        "Son sayı doğru olsa da gerekçe yanlış; 72 ve 90’ın EBOB’u 18’dir.",
        "1 ve 18 dahil ortak bölenleri vardır; 360 daha küçük ortak kattır."
      ],
      "knowledge": [
        "EBOB ortak pozitif bölenlerin en büyüğü; EKOK ortak pozitif katların en küçüğüdür.",
        "Önce bölme yönünü ve bütün başlangıç koşullarını yaz; sonucun birimini ve her koşulu ayrı denetle."
      ],
      "strategy": "İlk yanlış gerekçeyi adlandırıp yeni çiftte doğru kuralı uygula.",
      "steps": [
        "60 ve 84’ün ortak böleni 12; farklı olmak ortak böleni engellemez.",
        "Yeni çiftte EBOB 72, 90=18.",
        "EKOK=(72/18)×90=360."
      ],
      "commonError": "Sadece ilk sorunun cevabını düzeltmek yeni bağlamı çözdüğünü göstermez.",
      "check": "360/72=5; 360/90=4."
    },
    {
      "code": "Q36",
      "prompt": "Bir öğrenci 20 cm×32 cm dikdörtgende en az eş kare için 160 cm EKOK’u seçiyor. Modeli onardıktan sonra 28 ve 42 cm iki ayrı ipin en uzun ortak parça boyu ve toplam parça adedi nedir?",
      "options": [
        "Kenar ölçüleri bölmeli; 14 cm ve 5 parça.",
        "Kenar ortak kat olmalı; 84 cm ve 1 parça.",
        "Kenar ortak bölen olmalı; 7 cm ve 10 parça.",
        "Kenar ölçüleri bölmeli; 14 cm ve 6 parça.",
        "Kenar ortak kat olmalı; 14 cm ve 5 parça."
      ],
      "optionReasons": [
        "2×14=28; 3×14=42.",
        "84 cm iki ipin içine sığmaz; parça boyu iki uzunluğu da bölmeli.",
        "7 cm geçerli ama 14 cm de her iki boyu böler; en uzun değildir.",
        "Boy doğru; iplerde 2+3=5 parça gerekir, 2×3=6 alan hesabıdır.",
        "Sayısal sonuç doğru olsa da ortak kat gerekçesi yanlış; 14, 28 ve 42’nin bölenidir."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "Önce bölme yönünü onar; sonra yeni ip bağlamında adedi topla.",
      "steps": [
        "160 cm, 20 cm’lik kenarın içine bile sığmaz; ortak parça boyu ölçüleri bölmeli.",
        "EBOB 28, 42=14 cm.",
        "28/14+42/14=2+3=5 parça."
      ],
      "commonError": "Yanlış modele doğru aritmetik yapmak soruyu çözmez.",
      "check": "2×14=28; 3×14=42."
    },
    {
      "code": "Q37",
      "prompt": "a, b pozitif tam sayı; EBOB(a, b)=2, EKOK(a, b)=72. En küçük a+b kaçtır?",
      "options": [
        "26",
        "24",
        "74",
        "40",
        "30"
      ],
      "optionReasons": [
        "a=8, b=18; EBOB 2, EKOK 72.",
        "x=y=6 seçilirse a=b 12 olur; EBOB 12’ye çıkar, hedef 2 bozulur.",
        "a=2, b=72 geçerli ama 8 ve 18 toplam 26 ile daha küçüktür.",
        "a=4, b=36 için EBOB 4 olur; hedef 2 değildir.",
        "a=6, b=24 için EBOB 6 olur; xy=36 olması tek başına yetmez."
      ],
      "knowledge": [
        "EBOB(a, b)=d ise a=dx, b=dy ve EBOB(x, y)=1. EKOK=dxy olduğundan xy=m/d.",
        "x≤y çarpan çiftlerini eksiksiz yazıp aralarında asal olmayanları ele; asıl toplamı d ile ölçekle. Dikdörtgen çevresi kenar toplamının 2 katıdır. d, m’yi bölmüyorsa uygun iki pozitif sayı yoktur."
      ],
      "strategy": "Çarpan çiftlerini aralarında asallıkla ele.",
      "steps": [
        "a=2 x, b=2 y; xy=36 ve EBOB(x, y)=1.",
        "Çiftler 1, 36; 2, 18; 3, 12; 4, 9; 6, 6.",
        "Yalnız 1, 36 ve 4, 9 uygun; toplamlar 74 ve 26."
      ],
      "commonError": "En yakın(6, 6)çifti aralarında asal değildir.",
      "check": "a=8, b=18; EBOB 2, EKOK 72."
    },
    {
      "code": "Q38",
      "prompt": "0’da birlikte başlayan 6 ve 10 dk periyotlu iki sinyalin[0, 90)aralığında kaç ortak olayı vardır?0 dahil, 90 hariçtir.",
      "options": [
        "3",
        "2",
        "4",
        "9",
        "15"
      ],
      "optionReasons": [
        "Aynı periyotlar[0, 90]olsaydı 4 olay olurdu.",
        "0 başlangıcı dahil olduğu halde yalnız 30 ve 60 sayılmış.",
        "90 aralığın dışında olduğundan 0, 30, 60, 90 diye sayılamaz.",
        "9, 10 dk’lık sinyalin tek başına olay sayısıdır; hepsi ortak değildir.",
        "15, 6 dk’lık sinyalin tek başına olay sayısıdır; hepsi ortak değildir."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "Ortak periyotla listeyi yazıp uçları kontrol et.",
      "steps": [
        "EKOK 6, 10=30 dk.",
        "[0, 90)ortak anları 0, 30, 60.",
        "90 hariç; liste 3 eleman."
      ],
      "commonError": "90/30 değerini hangi uçlar dahil sorusundan bağımsız bir formül gibi kullanma.",
      "check": "Aynı periyotlar[0, 90]olsaydı 4 olay olurdu."
    },
    {
      "code": "Q39",
      "prompt": "40 cm×56 cm dikdörtgen kenarlara paralel, kenarı özellikle 4 cm seçilmiş eş karelerle kesilmeden/boşluksuz kaplanıyor. Kaç kare gerekir?",
      "options": [
        "140",
        "35",
        "24",
        "8",
        "560"
      ],
      "optionReasons": [
        "140×4²=2240 cm²=40×56.",
        "35 en büyük 8 cm kenar seçilirse olur; bu soruda kenar 4 cm olarak sabit verilmiştir.",
        "24, iki ayrı ipin 4 cm parça sayısı 10+14’tür; kaplamada çarpım gerekir.",
        "8 EBOB’dur; verilen 4 cm kenarı değiştirmeye izin yoktur.",
        "2240 cm² alanı 4 cm uzunluğa bölmek alan/adet hesabı değildir; bir karenin alanı 16 cm²’dir."
      ],
      "knowledge": [
        "Kesimsiz, boşluksuz ve kenarlara paralel eş karelerde kenar her ölçüyü bölmeli. İstenen en az adet ise en büyük uygun boy EBOB’dur; boy özellikle verilmişse değiştirilmez.",
        "Dikdörtgen kaplamada satır×sütun; ayrı iplerde parça sayıları toplamı kullanılır. Kapalı çevrede+1 yok, açık doğru parçasında iki uç dahilse+1 vardır."
      ],
      "strategy": "Verilen sabit kenarla satır ve sütunu hesapla.",
      "steps": [
        "Kenar zaten 4 cm; optimum boy aranmıyor.",
        "40/4=10 sütun; 56/4=14 satır.",
        "10×14=140 kare."
      ],
      "commonError": "Her kaplamada otomatik EBOB seçmek verilen koşulu değiştirebilir.",
      "check": "140×4²=2240 cm²=40×56."
    },
    {
      "code": "Q40",
      "prompt": "İki cihazın sabit periyotları 10 ve 15 dk olarak biliniyor. İlk çalışma anları ve birlikte başlayıp başlamadıkları verilmemiş. İlk pozitif ortak çalışmanın başlangıçtan kaç dakika sonra olduğu kesin söylenebilir mi?",
      "options": [
        "Hayır; başlangıç anları da gerekir.",
        "Evet; her durumda 30 dk.",
        "Evet; her durumda 5 dk.",
        "Evet; her durumda 0 dk.",
        "Hayır; çünkü EKOK hesaplanamaz."
      ],
      "optionReasons": [
        "İki geçerli başlangıç düzeninin farklı cevapları kesin tek sonucu engeller.",
        "30 ortak periyottur; B 5 dk geç başlarsa ilk ortak 20 olabilir.",
        "5 EBOB’dur; başlangıç koşulu olmadan ilk ortak an değildir.",
        "Birlikte başlangıç verilmemiştir; 0’ı ortak kabul edemezsin.",
        "EKOK 10, 15=30 hesaplanabilir; eksik olan ilk anı belirleyen başlangıç verisidir."
      ],
      "knowledge": [
        "Sabit periyotlarla ortak başlangıç varsa ilk yeniden ortak süre pozitif ortak katların en küçüğüdür; başlangıç 0 sonraki olay değildir.",
        "Başlangıç kaymışsa iki olay dizisi ayrı yazılır. Aralık sayarken köşeli parantez dahil, yuvarlak parantez hariç uçtur. Periyotlar, verilmeyen başlangıç anını tek başına belirlemez."
      ],
      "strategy": "Eksik koşulu karşı örnek iki senaryoyla görünür yap.",
      "steps": [
        "Ortak başlangıç 0 olsa ilk yeniden ortak 30 dk olurdu.",
        "A 0’da, B 5’te başlasa ilk ortak 20 dk olurdu.",
        "Aynı periyotlar farklı ilk ortak anlar verebildiğinden veri yetersiz."
      ],
      "commonError": "Verilmeyen başlangıcı 0 kabul etme.",
      "check": "İki geçerli başlangıç düzeninin farklı cevapları kesin tek sonucu engeller."
    },
    {
      "code": "Q41",
      "prompt": "“a, b aralarında asalsa a+b daima asaldır” iddiasını hangi örnek çürütür?",
      "options": [
        "a=4, b=5; EBOB 1, toplam 9 asal değil.",
        "a=2, b=3; toplam 5 asal.",
        "a=6, b=10; toplam 16 asal değil.",
        "a=3, b=6; toplam 9 asal değil.",
        "a=1, b=2; toplam 3 asal."
      ],
      "optionReasons": [
        "1 ortak bölen; 9’un 1 ve 9 dışında 3 böleni var.",
        "Bu olumlu bir örnektir;“daima” iddiasını çürütmez.",
        "Toplam bileşik olsa da 6 ve 10 aralarında asal değil; ön koşul sağlanmadığından karşı örnek olamaz.",
        "EBOB 3 olduğu için ön koşul sağlanmıyor.",
        "Aralarında asal ve toplam asal; iddianın yanlışlığını göstermez."
      ],
      "knowledge": [
        "“Daima” bütün uygun örneklerde doğru olmalı; tek geçerli karşı örnek iddiayı çürütür.",
        "Karşı örnek, ön koşulu sağlamalı fakat sonucu bozmalıdır. Ön koşulu sağlamayan sayı çifti iddianın karşı örneği değildir."
      ],
      "strategy": "Ön koşul ile sonuç kısmını ayrı denetle.",
      "steps": [
        "Karşı örnek ön koşulu sağlamalı, sonucu bozmalı.",
        "EBOB 4, 5=1; bu çift ön koşula uyar.",
        "4+5=9=3² asal değildir."
      ],
      "commonError": "İddianın ön koşulunu sağlamayan örneği karşı örnek sayma.",
      "check": "1 ortak bölen; 9’un 1 ve 9 dışında 3 böleni var."
    },
    {
      "code": "Q42",
      "prompt": "Pozitif tam sayılar a, b için EBOB(a, b)=3 ve EKOK(a, b)=20 olabilir mi?",
      "options": [
        "Olamaz; EBOB, EKOK’u bölmelidir.",
        "Olabilir; a=3, b=20.",
        "Olabilir; a=6, b=10.",
        "Olabilir; a=3, b=60.",
        "Olamaz; çünkü EBOB her zaman 1 olur."
      ],
      "optionReasons": [
        "Her ortak kat EBOB’un da katıdır; 20, 3’ün katı değildir.",
        "EBOB 3, 20=1 ve EKOK 60; verilen iki hedef de sağlanmaz.",
        "Bu çiftte EBOB 2, EKOK 30 olur; 3 ve 20 değildir.",
        "EBOB 3 olsa da EKOK 60 olur; 20 değil.",
        "İmkânsızlık doğru fakat gerekçe yanlış; EBOB genel olarak 1 olmak zorunda değildir."
      ],
      "knowledge": [
        "EBOB(a, b)=d ise a=dx, b=dy ve EBOB(x, y)=1. EKOK=dxy olduğundan xy=m/d.",
        "x≤y çarpan çiftlerini eksiksiz yazıp aralarında asal olmayanları ele; asıl toplamı d ile ölçekle. Dikdörtgen çevresi kenar toplamının 2 katıdır. d, m’yi bölmüyorsa uygun iki pozitif sayı yoktur."
      ],
      "strategy": "Önce d|mgerekliliğini denetle.",
      "steps": [
        "a=3x, b=3y ve EBOB(x,y)=1 yazılırsa EKOK=3xy olur.",
        "20=3xy gerektiğinden xy=20/3 bir tam sayı değildir.",
        "3, 20’yi bölmediği için uygun pozitif çift yok."
      ],
      "commonError": "ab=60 çarpımını bulmak tek başına EBOB=3 ve EKOK=20 koşullarını sağlamaz.",
      "check": "Her ortak kat EBOB’un da katıdır; 20, 3’ün katı değildir."
    },
    {
      "code": "Q43",
      "prompt": "Pozitif tam sayı kenarlı dikdörtgenin kenarlarının EBOB’u 3, EKOK’u 30’dur. En küçük çevre kaç birimdir?",
      "options": [
        "42",
        "21",
        "66",
        "30",
        "36"
      ],
      "optionReasons": [
        "Kenarlar 6 ve 15; EBOB 3, EKOK 30; 2(6+15)=42.",
        "21 en küçük kenar toplamıdır; çevre için 2 ile çarpılır.",
        "3 ve 30 kenarları geçerli fakat 6 ve 15 daha küçük çevre verir.",
        "30 EKOK değeridir; çevre değildir.",
        "9 ve 9 yakın görünse de EBOB 9, EKOK 9 olur; başlangıç hedefleri sağlanmaz."
      ],
      "knowledge": [
        "EBOB(a, b)=d ise a=dx, b=dy ve EBOB(x, y)=1. EKOK=dxy olduğundan xy=m/d.",
        "x≤y çarpan çiftlerini eksiksiz yazıp aralarında asal olmayanları ele; asıl toplamı d ile ölçekle. Dikdörtgen çevresi kenar toplamının 2 katıdır. d, m’yi bölmüyorsa uygun iki pozitif sayı yoktur."
      ],
      "strategy": "EBOB/EKOK’tan en küçük toplamı kurup çevreye dönüştür.",
      "steps": [
        "Kenarlar 3 x, 3 y; xy=10; EBOB(x, y)=1.",
        "Çiftler 1, 10 ve 2, 5; toplamlar 11 ve 7.",
        "En küçük kenar toplamı 3×7=21; çevre 2×21=42."
      ],
      "commonError": "Kenar toplamını dikdörtgen çevresi sanma.",
      "check": "Kenarlar 6 ve 15; EBOB 3, EKOK 30; 2(6+15)=42."
    },
    {
      "code": "Q44",
      "prompt": "N pozitif tam sayısı 6 ile bölününce 1, 8 ile bölününce 3 kalıyor. Aşağıdakilerden hangisi uygundur?",
      "options": [
        "43",
        "25",
        "24",
        "49",
        "35"
      ],
      "optionReasons": [
        "43−1=42, 8’in katı değildir; ikinci koşulda 43−3=40 kullanılır.",
        "25’in 6 ve 8 ile kalanları 1 ve 1; ikinci kalan 3 değildir.",
        "24 her iki sayıya kalansız bölünür; 1 ve 3 kalanlarını vermez.",
        "49’un 6 ile kalanı 1 ama 8 ile kalanı 1’dir.",
        "35’in 8 ile kalanı 3 ama 6 ile kalanı 5’tir."
      ],
      "knowledge": [
        "N=dq+r eşitliğinde d pozitif bölen, q tam sayı bölüm ve r kalandır; 0≤r<d. N−r, bölenin tam katıdır.",
        "İki bölende aynı kalan varsa N−r ortak kattır; N=EKOK×k+r. Kalanlar farklıysa her bölme ayrı yazılır. İstenen alt/üst sınır ayrıca denetlenir."
      ],
      "strategy": "Her adayı iki bölme eşitliğiyle kontrol et.",
      "steps": [
        "Farklı kalanlar ayrı yazılır: N=6 q+1 ve N=8 s+3.",
        "43=6×7+1; 43=8×5+3.",
        "1<6 ve 3<8; iki koşul da geçerli."
      ],
      "commonError": "N−1’i otomatik hem 6’nın hem 8’in katı sayma.",
      "check": "43−1=42, 8’in katı değildir; ikinci koşulda 43−3=40 kullanılır."
    },
    {
      "code": "Q45",
      "prompt": "65 ve 89 aynı pozitif tam sayı d’ye bölündüğünde 5 kalıyor. En büyük d kaçtır?",
      "options": [
        "12",
        "5",
        "6",
        "24",
        "60"
      ],
      "optionReasons": [
        "12 iki farkın en büyük ortak böleni ve 5’ten büyüktür.",
        "Kalan 5 bölen 5’e eşit olamaz.",
        "6 geçerlidir fakat 12 de geçerli olduğundan en büyük değildir.",
        "24, 60 farkını tam bölmez; 65’in kalanı 17 olur.",
        "60, 84 farkını bölmez; ikinci kalan koşulu bozulur."
      ],
      "knowledge": [
        "Aynı bilinmeyen d’ye bölünen farklı sayılarda her sayıdan kendi kalanı çıkarılır. d, farkların ortak bölenidir.",
        "d her kalandan büyük olmalıdır. Farkların EBOB’u bu sınırı sağlamıyorsa daha küçük bölenler de sağlayamaz; çözüm olmayabilir."
      ],
      "strategy": "Artık çıkarma modelini yeni sayılarda kullan.",
      "steps": [
        "65−5=60; 89−5=84.",
        "EBOB 60, 84=12.",
        "12>5; 65=12×5+5; 89=12×7+5."
      ],
      "commonError": "Kalan 5’i çıkarmadan asıl sayıların EBOB’unu alma.",
      "check": "12 iki farkın en büyük ortak böleni ve 5’ten büyüktür."
    },
    {
      "code": "Q46",
      "prompt": "91=65×1+26; 65=26×2+13; 26=13×2+0. 91 ve 65 cm ölçülerine tam uyan en büyük ortak birim kaç cm’dir?",
      "options": [
        "13",
        "0",
        "26",
        "2",
        "65"
      ],
      "optionReasons": [
        "7×13=91 cm; 5×13=65 cm.",
        "Son sıfır işlemin bitişidir; pozitif ortak birim olamaz.",
        "91/26 ve 65/26 tam sayı değildir; ortak birim değildir.",
        "2 son bölümdür; 91 ve 65 tek olduğundan ikisini kalansız bile bölmez.",
        "65, 91’i tam bölmez; ortak birim değildir."
      ],
      "knowledge": [
        "a=bq+r ve 0≤r<b iken EBOB(a, b)=EBOB(b, r). Her iki çiftin ortak bölen kümesi aynıdır.",
        "Öklid yöntemi sıfır kalanla biter; cevap son sıfır olmayan kalandır. Bölüm ile kalan farklı niceliklerdir."
      ],
      "strategy": "Şerit ölçüsü bağlamını Öklid’in aynı ortak bölen yapısına bağla.",
      "steps": [
        "Ortak birim iki ölçünün ortak böleni.",
        "Öklid zincirinin son sıfır olmayan kalanı 13.",
        "91/13=7; 65/13=5 tam sayı."
      ],
      "commonError": "Son bölüm 2 ile son sıfır olmayan kalan 13’ü ayır.",
      "check": "7×13=91 cm; 5×13=65 cm."
    }
  ],
  "sheet": [
    {
      "title": "Tanım ve bölme yönü",
      "text": [
        "EBOB en büyük ortak pozitif bölen; EKOK en küçük ortak pozitif kat. Başlangıç sayıları 1, 2,…; sıfır dahil değil. Bölen: d|a, a=dk ve k tam sayı. Kat: a, d’nin tam tekrarı. “En az” tek başına yöntem seçtirmez."
      ]
    },
    {
      "title": "Asal üs ve iki sayılı çarpım",
      "text": [
        "Her asalın küçük üssü EBOB, büyük üssü EKOK; bulunmayan asalın üssü 0’dır. 72=2³×3², 120=2³×3×5→24 ve 360. İki sayıda ab=EBOB×EKOK; EKOK=(a/EBOB)b. Üçlü çarpım kuralı yok: 2, 4, 8 için 64≠16."
      ]
    },
    {
      "title": "Aralarında asal ve sayı kurma",
      "text": [
        "EBOB=1 ise aralarında asal: 8 ve 9 gibi; ikisi de asal olmak zorunda değil. 6 ve 10 farklı fakat EBOB(6,10)=2. a|b ise EBOB=a, EKOK=b. EBOB=d, EKOK=m için a=dx, b=dy, xy=m/d, EBOB(x,y)=1 ve d|m gerekir. d=4, m=48 için geçerli çiftler (4,48),(12,16); en küçük toplam 28, en büyük 52."
      ]
    },
    {
      "title": "Öklid ve ortak bölen sayısı",
      "text": [
        "a=bq+r→EBOB(a, b)=EBOB(b, r); iki çift aynı ortak bölenlere sahiptir. Son sıfır olmayan kalan EBOB. 252, 198→54, 36, 18, 0; EBOB 18, EKOK 2772. 91, 65→26, 13, 0; EBOB 13.",
        "Ortak bölenler EBOB’un bölenleridir. 24=2³×3→(3+1)(1+1)=8 pozitif; 8 negatif eşiyle toplam 16. EBOB 1 ise tek pozitif ortak bölen 1; 0 bölen değil."
      ]
    },
    {
      "title": "Kaplama, ip ve işaret",
      "text": [
        "Eş kareler kenarlara paralel, kesmeden/boşluksuz/derzsiz: kenar iki ölçüyü bölmeli. En az kare için en büyük boy EBOB. 36×24, s 12→3×2=6 kare; iki ayrı ipte 3+2=5 parça, ayrı kesimde 3 kesim.",
        "Kapalı çevrede işaret sayısı=çevre/aralık; +1 yok. Açık kenarda iki uç dahil nokta sayısı=uzunluk/aralık+1. 18 m×30 m parkta s=6 m için çevre 96 m, 16 işaret; açık 18 m kenarda 4 nokta. Alan bölmesi kenara tam uyma şartının yerine geçmez."
      ]
    },
    {
      "title": "Periyot, uçlar ve başlangıç",
      "text": [
        "Sabit periyot ve ortak başlangıçta ilk yeniden ortak süre EKOK’tur. 12 ve 18 dk için 36 dk. [0,72] aralığında 0,36,72: 3 olay; [0,72) ve (0,72] aralıklarında 2 olay. 09.50+36 dk=10.26.",
        "Başlangıç kayarsa iki ayrı dizi yaz: 12/18, B 6’da→ilk 24; 10/15, B 5’te→20; 8/12, B 4’te→16. Başlangıç bilinmiyorsa ilk ortak an kesin değil; verilmeyeni 0 varsayma."
      ]
    },
    {
      "title": "Aynı N, aynı kalan",
      "text": [
        "N=dq+r, 0≤r<d. İki bölenle aynı r kalanı veriliyorsa N−r ortak kat, N=EKOK×k+r. 8 ve 12 bölenleri, r=5, N>100 için en küçük 101. 6 ve 8 bölenleri, r=1, N<200 için en büyük 193; komşu adayı da denetle. Farklı kalanlarda tek çıkarma geçmez."
      ]
    },
    {
      "title": "Bilinmeyen bölen ve kalan sınırı",
      "text": [
        "Farklı sayılarda her sayıdan kendi kalanını çıkar; d farkların ortak böleni ve her kalandan büyük olmalı. 85 ve 133’te kalan 1 için 84 ve 132’nin EBOB’u 12. 87’de kalan 3 ve 134’te kalan 2 için yine 12. 77 ve 113’te kalan 5 için en büyük bölen 36.",
        "Farkların EBOB’u kalan sınırını aşmıyorsa çözüm yok. 17 ve 25’te kalan 5 için EBOB(12,20)=4≤5. 65 ve 89’da kalan 5 için 12 uygun; kalan 12 için EBOB(53,77)=1 ve d>12 çelişir."
      ]
    },
    {
      "title": "Üç sayı ve bilinmeyen x",
      "text": [
        "Üç veya daha çok sayıda her asalın min/max üssünü seç veya ikili ilerle. 18, 24, 30→EBOB 6, EKOK 360; 12, 18, 30→6 ve 180.",
        "EBOB(18,12,x)=6 ve EKOK(18,12,x)=360 için en küçük x=120. 40 EKOK’u sağlasa da EBOB’u sağlamaz. EBOB(20,30,x)=10 ve EKOK(20,30,x)=420 için en küçük x=70; 7 tek başına yetmez."
      ]
    },
    {
      "title": "Üç boyutta küp adedi",
      "text": [
        "Küçük küpler her boy ayrı, paralel ve kesimsiz kullanılırsa en küçük ortak büyük kenar EKOK. 12/18 cm→36 cm; adetler(36/12)³=27 ve(36/18)³=8. Her hacim 46.656 cm³; boyları aynı büyük küpte karıştırmak ayrı model."
      ]
    },
    {
      "title": "Karma prova ve koşul onarımı",
      "text": [
        "d=6, m=180 için en küçük toplam 66; d=5, m=150 için 55; d=2, m=72 için 26. Aralarında asal çarpan çiftleri eksiksiz denetlenir. EKOK(72,90)=360. 28 ve 42 cm ipler 14 cm boyda 5 parça. 6 ve 10 dk döngülerinin [0,90) aralığındaki ortak anları 0,30,60: 3 olay.",
        "40×56 kaplamada en büyük kenar 8→35 kare/ayrı iplerde 12 parça. Kenar özellikle 4 cm verilirse EBOB aranmaz; 140 kare. Model/koşul/birim/son kontrol ayrı tutulur."
      ]
    },
    {
      "title": "Rakam, cebir ve kanıt sınırı",
      "text": [
        "9 ve 12’ye birlikte bölünmek 108’e bölünmek değil; EKOK 36. Kaynağın 2021 TYT 15 seçili çözümünde A=2, B=5, 225 ve 252→toplam 7; özgün açıklama resmî soru kopyası değildir.",
        "MEB destek yönteminde aralarında asal olma EBOB=1 verir. n²−6n+10=1 için n=3; EKOK=n⁴+9=90. En küçük toplam 9+10=19. Baskı yılı doğrulanmadı; bütün kitap veya 2027 resmî kapsamı bu üniteyle doğrulanmaz."
      ]
    }
  ],
  "source": "Aurelia TYT EBOB EKOK kopya kağıdı, 06.11.2026/içerik 1.0: 22 sayfalık kaynağın öğretim uyarlaması. Güncel kaynak sürümü 17.11.2026’da yeniden okunup karşılaştırıldı. Seçili 2021 TYT Temel Matematik 15: gerçek kitapçık PDF 30/basılı 28, anahtar 45, A=7; özgün açıklama. Kaynak: https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=30 ; anahtar: https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=45 . MEB OGM Dört Dörtlük TYT Matematik Bölünebilme çözümlü 19, sayfa 70 gerçek HTML metni/çözümü okundu; baskı yılı bilinmiyor. Kaynak: https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/konu-pekistirme/tyt/matematik/files/basic-html/page70.html . Bu seçili kaynaklar bütün kitapçık, kitap, yirmi yıllık arşiv veya 2027 resmî kapsamının kapanışı değildir. Uygulama kartları özgün öğretim uyarlamalarıdır; resmî sınav sorusu diye sunulmaz."
};
const pack=ebobEkokSource034Pack;
const objectives=["Bölen/kat yönünü, asal üsleri ve Öklid yöntemini gerekçelendir.","Kaplama, ip, zaman ve kalan problemlerini bütün koşullarıyla modelle.","EBOB/EKOK’tan sayı kur; yeni bağlamı ve hatalı ilk adımı denetle."];
export const ebobEkokSource034Guides:LessonGuide[]=[{id:pack.id,minutes:pack.minutes,source:pack.source,objectives,sections:pack.sections,examples:pack.examples,recall:pack.recall}];
export const ebobEkokSource034Lessons:Lesson[]=[{id:pack.id,title:txt(pack.title),subjectId:"tyt-matematik",minutes:pack.minutes,objectives:objectives.map(txt),source:txt(pack.source),tags:["kaynakli-anlatim","Öğretim uyarlaması sorular"],body:pack.sections.map((s)=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),questions:pack.items.map((item,index):Question=>{const order=item.options.map((_,i)=>(i+((2*index+1)%5))%5);return{id:`f034-${pack.id}-${index+1}`,prompt:txt(item.prompt),options:order.map((i)=>txt(item.options[i])),answer:order.indexOf(0),hint:txt(item.strategy),explanation:txt(item.steps.join(" ")+" Denetim: "+item.check),skill:pack.id,guidance:{knowledge:item.knowledge,strategy:item.strategy,steps:item.steps,optionReasons:order.map((i)=>item.optionReasons[i]),commonError:item.commonError,check:item.check}};})}];
export const ebobEkokSource034Sheets:CheatSheet[]=[{topicId:`topic-${pack.id}`,lessonId:pack.id,title:pack.title,subjectId:"tyt-matematik",sections:pack.sheet,cautions:["En az/en büyük sözcükleri tek başına EBOB/EKOK seçtirmez; bölme yönünü yaz.","Kalan, her bölenin altında olmalı. EBOB dışarı çıkarıldıktan sonra kalan x,y çifti aralarında asal olmalı; x ve y’nin tek tek asal olması gerekmez.","Kaymış/bilinmeyen başlangıç, kesim kaybı ve karma küp boyları ayrı modellerdir."],examples:[pack.examples[1],pack.examples[11]].map((e)=>({title:e.title,prompt:e.prompt,steps:e.steps.map((s)=>s.explanation),answer:e.answer})),recall:pack.recall.slice(0,3),source:pack.source}];
