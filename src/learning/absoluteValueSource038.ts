import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
interface Absolute038Item extends QuestionGuidance { code:string; prompt:string; options:string[] }
interface Absolute038Pack { id:string; title:string; minutes:number; source:string; sections:(GuideSection&{code:string})[]; examples:(WorkedExample&{code:string})[]; recall:{prompt:string;answer:string}[]; items:Absolute038Item[]; sheet:CheatSection[] }
// Private proposal: normal-entry app integration and runtime acceptance remain pending.
export const absoluteValueSource038Pack:Absolute038Pack = {
  "id": "tyt-mat-mutlak-deger-kaynak-038",
  "title": "Mutlak değer: uzaklık, koşul ve grafiğin mantığı",
  "minutes": 180,
  "sections": [
    {
      "code": "S01",
      "title": "Konum ile uzaklık farklı şeylerdir",
      "paragraphs": [
        "Bir sayı doğrusunda 0 başlangıç, sağ taraf pozitif, sol taraf negatiftir. −7 bir konumdur; o konumdan 0’a gidilen uzaklık 7 birimdir. |−7|=7 bu uzaklığı söyler. Aynı uzaklık sağdaki 7 için de 7’dir: |7|=7. Uzaklık yön taşımaz ve negatif olamaz.",
        "İki dik çizgi birlikte bir işlem sınırı oluşturur: |A|, içteki A ifadesinin gerçek sayı değerinin mutlak değeridir. Önce içteki işlemi hesapla, sonra uzaklığı al. |3−5|=|−2|=2; |3|−|5|=3−5=−2 olur. Çizgilerin yeri değişince yapılan işlem de değişebilir. Bu ünitede aksi verilmedikçe değişkenler gerçektir; ℝ bütün gerçek sayılar, ∅ hiç çözüm yok demektir."
      ]
    },
    {
      "code": "S02",
      "title": "Parçalı tanımın neden iki kolu var?",
      "paragraphs": [
        "x≥0 iken uzaklık zaten x olduğu için |x|=x; x<0 iken |x|=−x olur. İkinci satır “sonuç negatiftir” demek değildir. x=−5 koyarsan −x=−(−5)=5 çıkar. −x’in işareti, x’in işareti bilinmeden söylenemez.",
        "Önce iç ifadenin değerinin işaretini belirle. Negatif değilse aynı ifadeyi çıkar; negatifse ifadenin tamamını −1 ile çarp. Örneğin negatif olan 2x−4 için −(2x−4)=4−2x yazılır. Yalnız ilk terimin eksi işaretini değiştirmek, bütün ifadeyi ters işaretli yapmak değildir. x=0 sınırında iki tanım da 0 verir; bu tek nokta iki farklı çözüm sayılmaz.",
        "x<0 ise 5x negatiftir ve |5x|=−5x olur. x>0 ise −5x negatiftir ve |−5x|=5x olur. Her iki sonuç da verilen koşulda pozitiftir. Aynı harfin farklı sorularda farklı işaret koşullarıyla verilmesi, çıkarma biçimini değiştirir."
      ]
    },
    {
      "code": "S03",
      "title": "Sıfır uzaklığın anlamı",
      "paragraphs": [
        "|A|≥0 her tanımlı gerçek A için geçerlidir. |A|=0 ancak A=0 olduğunda olur. |2x−4|=0 için 2x−4=0 yaz, iki tarafa 4 ekle ve 2’ye böl: x=2. Aynı noktaya olan uzaklık sıfırdır; farklı bir konumun 0’a uzaklığı sıfır olamaz.",
        "Genel A ifadesinin sıfır olması, her zaman tek bir x bulunacağı anlamına gelmez. A=0 sabit ifadesiyse her x aynı koşulu sağlar; A=x²−1 gibi bir ifade iki farklı sıfıra sahip olabilir. Buradaki hesaplı modeller doğrusal iç ifadeleri ve ayrıca belirtilen yapıları inceler; genel ikinci derece denklemler ünitesinin yerine geçmez."
      ]
    },
    {
      "code": "S04",
      "title": "Çarpma ve bölmede kullanılabilen özellikler",
      "paragraphs": [
        "|ab|=|a||b|: çarpımın mutlak değeri, mutlak değerlerin çarpımıdır. |−3×5|=|−15|=15 ve |−3|×|5|=3×5=15. İki negatif çarpıldığında da sonuç aynıdır; özellik yalnız bir pozitif bir negatif sayıya bağlı değildir.",
        "b≠0 iken |a/b|=|a|/|b|. |−6/2|=|−3|=3, ayrıca 6/2=3. Payda sıfırsa iki tarafta da bölüm tanımlı değildir; mutlak değer sıfıra bölmeyi düzeltmez. Bu çarpım ve bölüm özelliklerini toplama için koşulsuz kopyalama; toplamın ayrı bir eşitsizlik kuralı vardır."
      ]
    },
    {
      "code": "S05",
      "title": "Toplamda üçgen eşitsizliği ve eşitlik koşulu",
      "paragraphs": [
        "|u+v|≤|u|+|v|. Sayı doğrusunda iki hareketin net uzaklığı, ayrı ayrı gidilen yolların toplamından büyük olamaz. u=3, v=−5 için |3+(−5)|=2, |3|+|−5|=8; 2≤8 doğrudur fakat eşitlik yoktur. Ters yönlü hareketler bir bölümünü birbirinden götürür.",
        "u ve v aynı yöndeyse veya en az biri sıfırsa eşitlik olur; gerçek sayılarda bunu uv ≥0 diye de yazabilirsin. u=−2, v=−5 için net uzaklık 7 ve ayrı uzaklık toplamı da 7. u=2, v=−1 için 1 ile 3 farklıdır. “Mutlak değerleri ayrı ayrı toplayabilirim” ancak eşitlik koşulunu biliyorsan geçerli olur. |u−v|’nin alt sınırı 0, eşitlik koşulu u=v’dir."
      ]
    },
    {
      "code": "S06",
      "title": "İçeride kare varsa işaret bilgisi değişir",
      "paragraphs": [
        "Gerçek x için x²≥0 olduğundan |x²|=x². Bu ifade x değildir: x=−2 için |(−2)²|=|4|=4, fakat x=−2. Önce karesini alıp sonra mutlak değeri uygulamak ile sayının kendisini yazmak farklı işlemlerdir.",
        "Aynı fikir |a²+3|=a²+3 verir; içerisi her gerçek a için en az 3’tür. |−a²−2| ise a²+2 olur, çünkü içerisi her zaman negatiftir ve tamamı −1 ile çarpılır: −(−a²−2)=a²+2. Seçili OGM örnekleri bu işaret gerekçesini kullanır. Bir ifadede eksi görmek tek başına yetmez; içte hesaplanan bütün değerin işaretine bak.",
        "Diğer seçili örneklerde |12|=12 ve |0|=0; x>0 iken |6x|=6x; a>0 iken |5a+3|=5a+3’tür. √3, karesi 3 olan pozitif sayıyı gösterir. Bu yüzden −√3 negatiftir ve |−√3|=−1×(−√3)=√3 olur. İşaret gerekçesi sayının tam veya kesirli olmasına değil, pozitif/negatif olmasına dayanır."
      ]
    },
    {
      "code": "S07",
      "title": "Merkez ve yarıçap: |x−a| ne ölçer?",
      "paragraphs": [
        "|x−a|, x ile a arasındaki uzaklıktır. |7−2|=5 ve |2−7|=5; sıranın değişmesi uzaklığı değiştirmez. |x−2|=4, x’in merkez 2’ye tam 4 birim uzakta olması demektir. Sağa gidersen x=6, sola gidersen x=−2 bulunur.",
        "|x−a|=r için r≥0 iken adaylar a−r ve a+r’dir. r=0’da bu iki yazım aynı a noktasını verir; tek çözüm vardır. r<0’da uzaklık negatif olamayacağı için çözüm yoktur. |x+1|=|x−(−1)| merkez −1’i gösterir; içteki artı işaretini görünce merkezi +1 sanma."
      ]
    },
    {
      "code": "S08",
      "title": "Denklemde iki kolu açmadan sağ tarafı kontrol et",
      "paragraphs": [
        "|A|=k’de önce k’nin işaretini yaz. k<0 ise çözüm yoktur. k=0 ise yalnız A=0 aranır. k>0 ise A=k veya A=−k olur. Bu iki olasılık, A ifadesinin 0’ın iki yanında aynı uzaklıkta bulunmasından gelir.",
        "|2x+1|=7 için ilk kol 2x+1=7 →2x=6 →x=3; ikinci kol 2x+1=−7 →2x=−8 →x=−4. Her kökü ilk ifadede dene: |7|=7 ve |−7|=7. |2x+1|=−7’de aynı iki kolu açmak ise olmayan çözümler üretir; sağ taraf baştan olanaksızdır."
      ]
    },
    {
      "code": "S09",
      "title": "İç katsayı ve çözüm sayısı",
      "paragraphs": [
        "|ax+b|=k’de a≠0 ve k>0 ise iki farklı doğrusal kol vardır. a≠0 ve k=0 için tek kök −b/a, k<0 için çözüm yoktur. a=0 olduğunda ifade |b| sabitine dönüşür; ona göre bütün x’ler çözüm olabilir veya hiçbir x çözüm olmayabilir. Sıfır katsayıya bölme yapılmaz.",
        "Örneğin |0x−3|=3, yani 3=3, bütün gerçek x’lerde doğrudur. |0x−3|=2 hiçbir x’te doğru değildir. Bu ayrım, genel sembol A için “daima iki kök” demenin neden yanlış olduğunu da gösterir. İç katsayı negatif olduğunda kökleri ve aralık uçlarını küçükten büyüğe yeniden sırala."
      ]
    },
    {
      "code": "S10",
      "title": "Küçüktür: merkez çevresindeki iç aralık",
      "paragraphs": [
        "k>0 için |A|<k, A’nın −k ile k arasında olmasıdır: −k<A<k. |3x−2|<7 için −7<3x−2<7 yaz. Üç tarafa 2 ekleyince −5<3x<9; pozitif 3’e bölünce −5/3<x<3 çıkar. İki uç sıkı koşulu sağlamadığı için aralık (−5/3,3) olur.",
        "Merkez biçiminde |x−a|<r, a−r<x<a+r demektir. Burada merkez a’nın kendisi de iç bölgededir. |A|<0 veya |A|<negatif sayı için çözüm yoktur; uzaklık sıfırdan küçük olamaz. İç bölge yöntemini > işaretine uygulamak, istenenin tersini seçer."
      ]
    },
    {
      "code": "S11",
      "title": "Küçük eşittir: sıfır sağ tarafı unutma",
      "paragraphs": [
        "|A|≤k için k≥0 olduğunda −k≤A≤k yazılır. Özellikle k=0 geçerlidir: 0≤A≤0 yalnız A=0 bırakır. |x−5|≤0 tek x=5’i verir; |x−5|<0 ise hiç çözüm vermez. Bir eşitlik çizgisi sonuç kümesini değiştirebilir.",
        "|4x−3|≤9 için −9≤4x−3≤9 →−6≤4x≤12 →−3/2≤x≤3. Sonuç [−3/2,3]; iki uç da dahil. Hızlı yöntem tablosunda < ve ≤ için aynı “pozitif sağ taraf” şartını kullanmak sıfırdaki geçerli ≤ durumunu kaybettirir. k<0 ise ≤ için de çözüm yoktur."
      ]
    },
    {
      "code": "S12",
      "title": "Büyüktür ve büyük eşittir: iki dış bölge",
      "paragraphs": [
        "k≥0 iken |A|>k, A<−k veya A>k demektir. |2x−3|>7 için 2x−3<−7 veya 2x−3>7 yaz; x<−2 veya x>5 bulunur. İki açık ışın vardır. “Veya” önemlidir: aynı x’in hem çok küçük hem çok büyük olmasını istemiyoruz; koşullardan birini sağlaması yeter.",
        "|2x−1|≥5 için 2x−1≤−5 veya 2x−1≥5; sonuç x≤−2 veya x≥3’tür. Eşitlik kabul edildiği için iki sonlu uç kapalıdır. > işaretinde uçlar dışarıda, ≥ işaretinde içeridedir. Merkez çevresini boyamak bu soruda dış bölge yerine iç bölgeyi almak olur."
      ]
    },
    {
      "code": "S13",
      "title": "Beş ilişkiyi sağ tarafın üç işaretiyle oku",
      "paragraphs": [
        "Sağ taraf negatifken mutlak değer =, < veya ≤ koşulunu sağlayamaz; buna karşılık > veya ≥ koşulunu her tanımlı gerçek iç değer sağlar. Örneğin |x−2|>−1 bütün gerçek x’lerde doğrudur. Uzaklık her zaman en az 0 olduğundan zaten −1’den büyüktür.",
        "Sağ taraf 0 olduğunda = ve ≤, iç ifadeyi 0 yapar; < boş kümedir. > yalnız iç ifadenin 0 olmadığı değerleri alır; ≥ ise bütün tanımlı değerleri alır. Bu tablo, iki kola ayırmadan önce mantıksal durumu belirler. Eğer ifadenin kendi tanım alanı varsa “bütün” sözcüğü bu izinli alan içindir."
      ],
      "table": {
        "headers": [
          "İlişki",
          "k<0",
          "k=0"
        ],
        "rows": [
          [
            "|A|=k",
            "Yok",
            "A=0"
          ],
          [
            "|A|<k",
            "Yok",
            "Yok"
          ],
          [
            "|A|≤k",
            "Yok",
            "A=0"
          ],
          [
            "|A|>k",
            "Her tanımlı A",
            "A≠0"
          ],
          [
            "|A|≥k",
            "Her tanımlı A",
            "Her tanımlı A"
          ]
        ]
      }
    },
    {
      "code": "S14",
      "title": "Aralık, açık nokta ve kapalı nokta",
      "paragraphs": [
        "(a, b) iki sınırı dışarıda tutar; [a, b] ikisini alır. (a, b] yalnız sağ sınırı alır. Küçük sınır solda yazılır. |2x−1|<5 için (−2,3), |2x−1|≥5 için (−∞,−2]∪[3,∞) yazılır. ∪ birleşimdir; en az bir parçaya ait değer alınır.",
        "∞ ve −∞ yerine konabilecek gerçek sayılar değildir; o taraflarda köşeli parantez kullanılmaz. Şekilde açık nokta hariç, dolu nokta dahil; ok o yönde sınırsız devam eder. Ekran penceresinin kenarı yeni bir matematiksel sınır değildir. Bir uç değerini başlangıç ifadesinde denemek, yanlış açık/kapalı nokta seçimini ortaya çıkarır."
      ]
    },
    {
      "code": "S15",
      "title": "Parçalı yazımda eşiği iç ifadeden bul",
      "paragraphs": [
        "|2x−4| için eşik 2x−4=0’dan x=2’dir. x≥2’de içerisi negatif değildir ve sonuç 2x−4; x<2’de içerisi negatif ve sonuç −(2x−4)=4−2x olur. x=1 için 2, x=3 için 2, sınır x=2 için 0 elde edilir.",
        "İç katsayı negatifse hangi yanda hangi ifadenin geçerli olduğu ters olabilir. |−2x+4| de aynı uzaklık değerlerini verir; fakat işaret kontrolünü yine −2x+4 üzerinde yapmalısın. Katsayı 0 ise iç ifade sabittir; sahte bir kırılma noktası veya V tepesi çizilmez. Parçalı denklemi çözerken bulunan kökü, üretildiği aralığa geri koy."
      ]
    },
    {
      "code": "S16",
      "title": "Temel grafik: V’nin iki doğrusal kolu",
      "paragraphs": [
        "y=|x| grafiğinin sağ kolu x≥0’da y=x, sol kolu x<0’da y=−x’tir. (0,0) en alttaki tepe, x=0 simetri ekseni ve aynı zamanda tek köktür. x ile −x aynı yüksekliği verir; bu, uzaklığın yönsüz olmasının grafik karşılığıdır.",
        "Grafikte bir nokta bulmak için x seç, aynı ifadede y’yi hesapla ve (x, y) koordinatını yerleştir. x=−2 ve x=2 için y=2; x=0 için y=0. Görünen pencerenin dışında kalan kollar da matematiksel grafiğin parçasıdır; pencerenin kenarı fonksiyonun bittiği nokta değildir."
      ]
    },
    {
      "code": "S17",
      "title": "Yatay ve düşey öteleme",
      "paragraphs": [
        "y=|x−a|+b’de önce içini sıfırla: x=a. O noktada mutlak değer 0 olduğundan tepe (a, b), simetri ekseni x=a olur. |x−2| sağa 2; |x+1|=|x−(−1)| sola 1 kayar. Dışarıdaki +b, bütün yüksekliklere b ekler.",
        "Kök y=0 olan x’tir: |x−a|=−b. b>0’da sağ taraf negatif, kök yok; b=0’da tek x=a; b<0’da a±(−b) iki kök vardır. y=|x−2|−1 için tepe (2,−1), kökler 1 ve 3’tür. Köklerle tepenin x koordinatını aynı şey sanma."
      ]
    },
    {
      "code": "S18",
      "title": "Dış çarpan ile dış toplama sabiti ayrı",
      "paragraphs": [
        "y=−|x−a|+b aşağı açılır; tepe yine (a, b), simetri yine x=a’dır. Kök için |x−a|=b gerekir: b<0’da kök yok, b=0’da bir, b>0’da iki kök. Aşağı açıldığı için tepe en büyük yükseklik olur.",
        "y=|x−2|−1’de dış çarpanı +1’den −1’e değiştirmek y=−|x−2|−1 verir; dış toplama sabiti −1 korunur ve tepe (2,−1) kalır. Bunun yerine bütün fonksiyonu −1 ile çarpsaydın −(|x−2|−1)=−|x−2|+1 olur, tepenin yüksekliği +1’e değişirdi. Eksi işaretinin hangi parçayı kapsadığını açık yaz."
      ]
    },
    {
      "code": "S19",
      "title": "Aynı tepe, farklı açıklık",
      "paragraphs": [
        "y=|2x−4|−1, y=2|x−2|−1 biçiminde yazılabilir. Tepe (2,−1) değişmez; fakat kolların eğimleri −2 ve +2’dir. y=|x−2|−1’in eğimleri −1 ve +1’dir. Aynı tepe, aynı grafik demek değildir.",
        "Ölçekli grafikte kök |2x−4|=1’den x=3/2 veya x=5/2’dir; diğerinde 1 ve 3’tür. Mutlak değerin içindeki katsayı sıfır olursa grafik yatay bir doğruya dönüşür. Yatay doğru sıfır yüksekliğindeyse her x kök, değilse hiçbir x kök değildir; tek bir V tepesinden söz edilmez."
      ]
    },
    {
      "code": "S20",
      "title": "İki noktaya uzaklık toplamı neden arada sabit?",
      "paragraphs": [
        "a≤b için |x−a|+|x−b|, x’in iki uca ayrı ayrı uzaklıklarını toplar. x, [a, b] içindeyken ilk uzaklık x−a, ikinci b−x; toplam b−a olur. x’li terimler birbirini götürür. Sadece orta nokta değil, iki uç dahil aralıktaki bütün x’ler aynı en küçük toplamı verir.",
        "x solda kalırsa toplam a+b−2x, sağda kalırsa 2x−a−b olur. Dışarı çıktığın mesafenin iki katı en küçük toplama eklenir. a=b özel durumunda en küçük değer 0 ve bunu alan tek x=a’dır. |x−2|+|x+1| için uçlar −1 ve 2; en küçük değer 3’tür ve bu değeri alan x kümesi [−1,2] olur."
      ]
    },
    {
      "code": "S21",
      "title": "Minimum ile bir toplam denkleminin çözümü farklı",
      "paragraphs": [
        "|x−1|+|x−4|=5 sorusunda kırılma noktalarını 1 ve 4 olarak sırala. x<1’de (1−x)+(4−x)=5 →5−2x=5 →x=0; bu, kendi aralığına uygundur. 1≤x≤4’te toplam 3 kalır ve 3=5 yanlış olduğundan o aralıktan çözüm gelmez. x>4’te 2x−5=5 →x=5; bu da kendi aralığına uygundur.",
        "Çözüm {0,5}. Eğer hedef toplam 3 olsaydı bütün [1,4] çözüm olurdu; hedef 2 olsaydı uçlar arası uzaklıktan bile küçük bir toplam istenir ve çözüm olmazdı. Parçalı yöntemle bulunan bir adayın kendi aralığına uymaması, cebirsel hesabın yanlış olması gerektirmeden o dalda reddedilmesini gerektirir."
      ]
    },
    {
      "code": "S22",
      "title": "İç içe mutlak değeri dıştan içe çöz",
      "paragraphs": [
        "||x|−3|=1’de önce dıştaki uzaklık koşulunu aç: |x|−3=1 veya |x|−3=−1. Birinciden |x|=4, ikinciden |x|=2 gelir. Sonra bu iki iç denklemi çöz: x=±4 ve x=±2. Bütün çözüm {−4,−2,2,4}.",
        "İşlem sırasını dıştan içe takip etmek, bütün çizgileri bir anda kaldırmaktan daha güvenlidir. Her aşamada sağ tarafın işaretini yeniden denetle. Çakışan kökleri tek kez say; örneğin ||x|−3|=3 için iç hedefler 6 ve 0, kökler −6,0,6’dır. Sıfır iki farklı kök değildir."
      ]
    },
    {
      "code": "S23",
      "title": "İç hedef negatifse o kol biter",
      "paragraphs": [
        "||x|−2|=3 için |x|−2=3 veya |x|−2=−3. İlk kol |x|=5’ten x=±5 verir. İkinci kol |x|=−1 ister ve çözüm vermez. Dolayısıyla dört kök değil, iki kök vardır.",
        "Dış hedef negatifse dış mutlak değer baştan olanaksızdır. Dış hedef 0 olduğunda iki dış kol aynı koşula dönüşür; sonuçları tekrar sayma. Bu kontroller yalnız cevabı azaltmak için bir taktik değil, mutlak değerin negatif olmayan uzaklık tanımının her katmanda yeniden uygulanmasıdır."
      ]
    },
    {
      "code": "S24",
      "title": "Parametreyi önce yarıçapa dönüştür",
      "paragraphs": [
        "|x−2|=m−1 için yarıçap r=m−1’dir. m<1 olduğunda r<0 ve çözüm yoktur. m=1 olduğunda r=0, tek çözüm x=2. m>1 olduğunda r>0, iki çözüm x=2−(m−1) ve x=2+(m−1) olur.",
        "Parametrenin kendisinin işaretine bakmak yeterli değildir: m=1/2 pozitiftir ama m−1 negatiftir ve çözüm yoktur. Önce sağ tarafın gerçek değerini belirle. Üç dalı çizimde sıfır noktasına yaklaşan veya oradan ayrılan iki uzaklık noktasıyla karşılaştır; çözüm sayısını dal sayısından körlemesine çıkarma."
      ]
    },
    {
      "code": "S25",
      "title": "İki tarafta da mutlak değer varsa",
      "paragraphs": [
        "|A|=|B|, A=B veya A=−B demektir. Aynı uzaklıkta olmak, aynı yönde veya ters yönde aynı büyüklükte olabilmektir. |x−1|=|2x+3| için ilk kol x−1=2x+3 →x=−4; ikinci kol x−1=−2x−3 →3x=−2 →x=−2/3 verir.",
        "x=−4’te iki taraf da 5; x=−2/3’te iki taraf da 5/3’tür. Bazı başka katsayılarda iki koldan biri özdeşlik olabilir ve sonsuz çözüm gelebilir. “İki kol açtım, mutlaka iki farklı kök vardır” deme. Aynı kök iki koldan gelirse bir kez yazılır."
      ]
    },
    {
      "code": "S26",
      "title": "Kare alma: aday üretmek ile eşdeğer çözmek",
      "paragraphs": [
        "|A|=B için önce B≥0 koşulunu koru. Bu koşulla A²=B² eşdeğerdir. Koşulu atarsan |x|=−1’in karesinden x²=1 ve ±1 adaylarını üretirsin; ikisi de özgün eşitlikte 1=−1 verdiği için geçersizdir. Karesini alma yanlış işaret bilgisini silebilir.",
        "|A|=|B|’de iki taraf zaten negatif değildir; A²=B² güvenlidir. |A|>|B| de A²>B² ile eşdeğerdir, çünkü iki taraf da ≥0. Fakat herhangi bir A>B eşitsizliğini koşulsuz karesine çevirme: negatif sayılarda sıralama bozulabilir. Modelin işaret filtresi, özgün sağ tarafı sonradan unutmaz.",
        "Sağ taraf da değişken içerebilir. |A|<B için önce B>0 gerekir; bu koşul altında −B<A<B yazılır. Örneğin |x−1|<x+2 için x+2>0, yani x>−2 korunur. Çift eşitsizlik −(x+2)<x−1<x+2 olur. Sol kol −x−2<x−1’den x>−1/2; sağ kol −1<2 olduğundan her x için doğrudur. Ortak çözüm x>−1/2’dir. x=0 için 1<2 doğru, x=−1 için 2<1 yanlıştır. Sağ tarafın pozitif olması tek başına yetmez; iki sınır da sağlanmalıdır."
      ]
    },
    {
      "code": "S27",
      "title": "Ölçüm toleransını aralığa çevir",
      "paragraphs": [
        "Bir ölçümün hedef 100’den sapması en çok 2 birim olsun. x ölçüm değeri için uzaklık |x−100|≤2’dir; çözüm [98,102]. 98 ve 102 tam sınırda kabul edilir. “Sapma 2’den az” denseydi (98,102) olurdu. Bu, kaynakta geçen tolerans yapısına farklı sayılarla yazılmış özgün bir uygulamadır.",
        "“Bir noktaya uzaklık en az r” dış bölgedir; “en çok r” iç bölgedir. Ölçümün birimini ve izinli sayı alanını baştan belirt. Uzaklığın kendisi negatif değildir; merkez değer veya ölçülen konum negatif olabilir. Birim, örneğin sıcaklık veya uzunluk, soruda verilmeden farklı sayıları aynı ölçüm sanma."
      ]
    },
    {
      "code": "S28",
      "title": "Mutlak değer çizgisi işlem kapsamını belirler",
      "paragraphs": [
        "Bir kapanış çizgisinin yeri, hangi işlemin mutlak değerin içinde yapıldığını belirler. |−20|×3−5=20×3−5=55 ve |−20×3|−5=|−60|−5=55 ikisi de doğrudur. |−20×3−5| ise |−65|=65 verir. İlk iki yazım aynı sonucu verdiği halde çizgileri farklı konumlardadır.",
        "Bu yüzden yalnız “sonuç 55, eksik çizginin tek yeri hangisi?” diye sormak bu verilerde tek cevaplı değildir. İfadeyi ve bütün aday kapsamları gerçekten hesapla. Buradaki örnek özgün bir işlem karşılaştırmasıdır; geçmiş ÖSYM sorusu diye sunulmaz. Farklı sayılı aktarımda hangi kapanışın tek doğru verdiğini yine işlem önceliğinden bulacağız."
      ]
    },
    {
      "code": "S29",
      "title": "Yöntemi seçmeden önce koşulu söyle",
      "paragraphs": [
        "Pozitif sağ taraflı denklemde iki kol; küçük eşitsizlikte iç aralık; büyük eşitsizlikte dış kollar; iki uzaklık toplamında kırılma noktaları; iç içe mutlak değerde dış katman; grafikte içi sıfırlayarak tepe; parametrede sağ tarafın üç işaret dalı. Yöntem adını, bu ayırt edici koşulla birlikte söyle.",
        "Yakın görünen bir soruda yöntem değişebilir: |x−2|<4 iç bölge, |x−2|>4 dış bölgedir. |3x|≥6 dış kollar, |3x|≤6 iç aralık ister. İkinci ifade yanlış bir soru değildir; yalnız birinciye ait dış bölge yöntemi ona uygulanamaz. Kaynak örneğine benziyor diye aynı çözümü otomatik kopyalama."
      ]
    },
    {
      "code": "S30",
      "title": "Normal yol ve kısa yol aynı koşulu korumalı",
      "paragraphs": [
        "|x−a|=r’de iki doğrusal denklemi ayrı çözmek normal yol; a±r demek aynı iki çözümü daha kısa yazmaktır ve r≥0 koşulu gerekir. |x−a|<r’de çift eşitsizlik ile merkez çevresindeki yarıçap aralığı aynı şeyi söyler. İki uzaklığın minimumunu parçalı yazmak da uçlar arası uzaklık kısayoluyla aynı sonucu verir.",
        "|A|=|B|’de kareleri eşitlemek ile A=B veya A=−B iki kolunu açmak eşdeğerdir. Kısa yazım koşulu, açık/kapalı sınırı veya tanım alanını saklamamalı. Önce doğru yöntemi gerekçesiyle uygula ve ilk ifadede denetle; süre çalışmasını doğru çözümlerden sonra yap."
      ]
    },
    {
      "code": "S31",
      "title": "İlk bozulan adımı bul",
      "paragraphs": [
        "Sağ taraf negatifken iki kol açmak, küçük eşitsizlikte dışarıyı almak, büyük eşitsizlikte içeriği almak, |a+b|’yi koşulsuz ayrı toplamak, |x²|’yi x sanmak, grafiği ters yöne kaydırmak ve parçalı aralığı kontrol etmemek ayrı hata türleridir. Son sayıyı değiştirmek yerine ilk geçersiz dönüşümü işaretle.",
        "Bir düzeltmenin neden doğru olduğunu bir karşı örnekle test et: |2+(−5)|=3 ama |2|+|−5|=7; |x−5|<0 hiçbir x’te sağlanmaz; y=|x+3|−1’in tepe x’i +3 değil −3’tür. Kontrol örneği yanlış genellemeyi çürütebilir; bütün çözümün gerekçesi geçerli cebirsel dönüşümler ve koşullardır."
      ]
    },
    {
      "code": "S32",
      "title": "Seçili OGM örneğinde koşul ve dış eksi",
      "paragraphs": [
        "x>0 iken |3x|=3x, |−2x|=2x ve |1+x|=1+x. Bu nedenle |3x|+|−2x|−|1+x| =3x+2x−(1+x)=4x−1. Dıştaki eksi bütün üçüncü ifadeye dağılır; −(1+x)=−1−x. x=2’de 6+4−3=7, ayrıca 4×2−1=7 olur.",
        "Her mutlak değer tek başına ≥0 olsa da çıkarma içeren bütün ifade negatif olabilir. x=1/8, izinli pozitif değerdir ve sonuç 4/8−1=−1/2’dir. x=0’da aynı cebirsel sonuç tesadüfen doğru çıksa da verilen x>0 koşulunun dışındadır; bu tek deneme koşulu silme izni vermez. Bu sayfa OGM görüntüleyicisinde 43, kitap üzerinde basılı 121’dir."
      ]
    },
    {
      "code": "S33",
      "title": "Destekten bağımsız çözüme geç",
      "paragraphs": [
        "Önce bütün ara satırları ve gerekçeleri gördüğün örneği çalış. Sonra yalnız ilk hamleyi açarak kalan adımları kendin üret. Not kapalı bir soruda çözüm kümesini yaz, şeklini çiz ve iç/dış/sınır değerleriyle ilk koşulda kontrol et. Son aşamada farklı sayı ve bağlamda yöntem seçimini kendin yap.",
        "Açıklamayı okumak, yardımlı çözmek, bağımsız çözmek, gecikmeli hatırlamak ve farklı bağlama aktarmak ayrı aşamalardır. Görsel keşif ve süre geçirmek tek başına bağımsız doğru çözüm değildir. İlk çalışma gününü 1 sayarak 3., 7. ve 21. günlerde not kapalı hatırlamayı yeniden dene. Takıldığında önce uygun yöntemi kendin söyle; sonra gereken kadar örnek desteği al ve yeni bir soruda yeniden sına."
      ]
    },
    {
      "code": "S34",
      "title": "Ön bilgi ve kapsam sınırını koru",
      "paragraphs": [
        "Denklem, eşitsizlik, sayı doğrusu, dağıtma, gerçek sayılar ve kesirler bu konunun araçlarıdır. Kesirli bir x gerçek sayı sorusunda sırf kesir diye reddedilmez. Paydada değişken varsa tanımsız değer baştan dışlanır; mutlak değer tanım alanını genişletmez. Katsayı sıfır olduğunda bölme yerine sabit koşulun doğruluğunu değerlendir.",
        "Bir soruda A gibi genel bir ifade gördüğünde uzaklık kuralını uygulayabilirsin; bu, A’nın içindeki bütün denklem türlerinin aynı cebirle çözüleceği anlamına gelmez. Önce iç ifadenin yapısını tanı, uygun denklem veya eşitsizlik yöntemini seç, sonra bütün adayları özgün koşulda denetle. Öğrenmenin son kontrolü, doğru cevabın yanında neden başka değerlerin alınmadığını açıklayabilmektir."
      ]
    }
  ],
  "examples": [
    {
      "code": "E01",
      "title": "İşaretli konumdan uzaklığa",
      "prompt": "|−7| ve |7| değerlerini karşılaştır.",
      "strategy": "Konumu değil 0’a uzaklığı sor.",
      "steps": [
        {
          "label": "İç değer",
          "expression": "−7 ve 7",
          "explanation": "Konumlar 0’ın iki yanında."
        },
        {
          "label": "Uzaklık",
          "expression": "|−7|=7 ve |7|=7",
          "explanation": "Yön değişir, büyüklük değişmez."
        },
        {
          "label": "Denetim",
          "expression": "7≥0",
          "explanation": "İki uzaklık da negatif değildir."
        }
      ],
      "answer": "İkisi de 7.",
      "check": "−7’den 0’a 7 birim; 7’den 0’a 7 birim.",
      "pitfall": "Mutlak değer eksi konumu sonuçta korumaz."
    },
    {
      "code": "E02",
      "title": "Negatif değişkenin önündeki eksi",
      "prompt": "x<0 iken |5x| ifadesini aç.",
      "strategy": "İçteki bütün çarpımın işaretini bul.",
      "steps": [
        {
          "label": "Koşul",
          "expression": "x<0,5>0 →5x<0",
          "explanation": "İçerisi negatif."
        },
        {
          "label": "Tanım",
          "expression": "|5x|=−(5x)=−5x",
          "explanation": "Negatif iç ifade −1 ile çarpılır."
        },
        {
          "label": "Denetim",
          "expression": "x=−2 →−5x=10",
          "explanation": "−x’in bu koşulda pozitif olabildiğini gör."
        }
      ],
      "answer": "−5x.",
      "check": "|5·(−2)|=10.",
      "pitfall": "−5x görüntüsünde eksi olmasını sonucun negatif olması sanma."
    },
    {
      "code": "E03",
      "title": "Kare içeren pozitif ifade",
      "prompt": "Her gerçek a için |a²+3| ve |−a²−2| ifadelerini aç.",
      "strategy": "İki bütün iç ifadenin işaretini ayrı belirle.",
      "steps": [
        {
          "label": "Alt sınır",
          "expression": "a²+3≥3",
          "explanation": "İlk içerik daima pozitif."
        },
        {
          "label": "Üst sınır",
          "expression": "−a²−2≤−2",
          "explanation": "İkinci içerik daima negatif."
        },
        {
          "label": "Açma",
          "expression": "a²+3 ve −(−a²−2)=a²+2",
          "explanation": "İkinci ifadede iki terimin işareti değişir."
        }
      ],
      "answer": "a²+3 ve a²+2.",
      "check": "a=0 için 3 ve 2.",
      "pitfall": "Yalnız ilk terimin işaretini değiştirme."
    },
    {
      "code": "E04",
      "title": "Toplam eşitliğini karşı örnekle denetle",
      "prompt": "u=3, v=−5 için |u+v| ve |u|+|v| hesapla.",
      "strategy": "Net uzaklık ile yolları ayır.",
      "steps": [
        {
          "label": "Net",
          "expression": "|3−5|=|−2|=2",
          "explanation": "Ters hareketler bir kısmını götürür."
        },
        {
          "label": "Ayrı",
          "expression": "3+5=8",
          "explanation": "İki yol uzunluğu toplanır."
        },
        {
          "label": "İlişki",
          "expression": "2≤8 fakat 2≠8",
          "explanation": "Üçgen eşitsizliği eşitlik demek değildir."
        }
      ],
      "answer": "2 ve 8.",
      "check": "İki sayı aynı yönde olsaydı eşitlik olabilirdi.",
      "pitfall": "Mutlak değerleri koşulsuz dağıtma."
    },
    {
      "code": "E05",
      "title": "İki nokta arası uzaklık",
      "prompt": "7 ile 2 arasındaki uzaklığı bul.",
      "strategy": "|a−b| kullan.",
      "steps": [
        {
          "label": "Fark",
          "expression": "7−2=5",
          "explanation": "İki konum aynı yanda."
        },
        {
          "label": "Uzaklık",
          "expression": "|5|=5",
          "explanation": "Farkın mutlak değeri."
        },
        {
          "label": "Ters sıra",
          "expression": "|2−7|=|−5|=5",
          "explanation": "Yön farkı uzaklığı değiştirmez."
        }
      ],
      "answer": "5 birim.",
      "check": "Sayı doğrusunda 2’den 7’ye 5 birim.",
      "pitfall": "Konumları toplama."
    },
    {
      "code": "E06",
      "title": "Merkez ve yarıçapla iki kök",
      "prompt": "|x−2|=4 denklemini çöz.",
      "strategy": "Merkez 2, uzaklık 4.",
      "steps": [
        {
          "label": "Sağ yön",
          "expression": "x=2+4=6",
          "explanation": "Merkezin 4 birim sağı."
        },
        {
          "label": "Sol yön",
          "expression": "x=2−4=−2",
          "explanation": "Merkezin 4 birim solu."
        },
        {
          "label": "Kontrol",
          "expression": "|6−2|=|−2−2|=4",
          "explanation": "İki kök aynı uzaklıkta."
        }
      ],
      "answer": "{−2,6}.",
      "check": "Merkez iki kökün ortasında 2.",
      "pitfall": "2 ve 4 verilerini doğrudan kök sanma."
    },
    {
      "code": "E07",
      "title": "İki doğrusal kolla çözüm",
      "prompt": "|2x+1|=7 denklemini çöz.",
      "strategy": "Pozitif sağ taraf iki işaretli iç değere izin verir.",
      "steps": [
        {
          "label": "Pozitif kol",
          "expression": "2x+1=7 →x=3",
          "explanation": "İç değer +7."
        },
        {
          "label": "Negatif kol",
          "expression": "2x+1=−7 →x=−4",
          "explanation": "İç değer −7."
        },
        {
          "label": "Yerine koy",
          "expression": "|7|=|−7|=7",
          "explanation": "İki kök de özgün eşitliği sağlar."
        }
      ],
      "answer": "{−4,3}.",
      "check": "İki kol eşdeğer ve her doğrusal kolda tek kök var.",
      "pitfall": "Tek kökle yetinme."
    },
    {
      "code": "E08",
      "title": "Olmayan uzaklık",
      "prompt": "|2x−1|=−3 denklemini çöz.",
      "strategy": "Dallanmadan önce hedefin işaretini kontrol et.",
      "steps": [
        {
          "label": "Tanım",
          "expression": "|2x−1|≥0",
          "explanation": "Her gerçek x için."
        },
        {
          "label": "Karşılaştır",
          "expression": "−3<0",
          "explanation": "Sağ taraf izin verilen alt sınırın altında."
        },
        {
          "label": "Sonuç",
          "expression": "ÇK =∅",
          "explanation": "İki doğrusal aday üretmeye gerek yok."
        }
      ],
      "answer": "Çözüm yok.",
      "check": "Her aday sol tarafta ≥0 verir.",
      "pitfall": "Negatif hedefte iki kol açma."
    },
    {
      "code": "E09",
      "title": "Sıfır katsayıda iki ayrı sonuç",
      "prompt": "|0x−3|=3 ve |0x−3|=2 denklemlerini karşılaştır.",
      "strategy": "Değişken yoksa sabit koşulu oku.",
      "steps": [
        {
          "label": "Sadeleşme",
          "expression": "|0x−3|=3",
          "explanation": "Her x’te aynı sol değer."
        },
        {
          "label": "Doğru sabit",
          "expression": "3=3 →ℝ",
          "explanation": "Bütün x’ler uygundur."
        },
        {
          "label": "Yanlış sabit",
          "expression": "3=2 →∅",
          "explanation": "Hiçbir x uygun değildir."
        }
      ],
      "answer": "İlkinde çözüm ℝ; ikincisinde ∅.",
      "check": "x=0 ve 100 ile karşılaştır.",
      "pitfall": "0 katsayısına bölme."
    },
    {
      "code": "E10",
      "title": "Sıkı iç aralık",
      "prompt": "|3x−2|<7 eşitsizliğini çöz.",
      "strategy": "Küçüktür, merkez çevresindeki iç değerleri al.",
      "steps": [
        {
          "label": "İki sınır",
          "expression": "−7<3x−2<7",
          "explanation": "İç ifade iki sınırın arasında."
        },
        {
          "label": "Aynı ekleme",
          "expression": "−5<3x<9",
          "explanation": "Üç tarafa 2 eklendi."
        },
        {
          "label": "Pozitif bölme",
          "expression": "−5/3<x<3",
          "explanation": "3 pozitif, yönler değişmez."
        }
      ],
      "answer": "(−5/3,3).",
      "check": "Sınırlar 7 verdiği için hariç.",
      "pitfall": "İç bölge yerine dış ışınları alma."
    },
    {
      "code": "E11",
      "title": "Azaltılmış destekle kapalı iç aralık",
      "prompt": "|4x−3|≤9 için boş bırakılan sınırları kendin kur.",
      "strategy": "Önce −9 ve 9, sonra 3 ekle.",
      "steps": [
        {
          "label": "Kur",
          "expression": "−9≤4x−3≤9",
          "explanation": "≤ ilişkisi iki sınırı da kabul eder."
        },
        {
          "label": "Topla",
          "expression": "−6≤4x≤12",
          "explanation": "Üç tarafa 3 eklendi."
        },
        {
          "label": "Böl",
          "expression": "−3/2≤x≤3",
          "explanation": "Pozitif 4’e bölündü."
        }
      ],
      "answer": "[−3/2,3].",
      "check": "İki uçta 9≤9.",
      "pitfall": "Eşitlik kabulünü yolun ortasında silme."
    },
    {
      "code": "E12",
      "title": "Kapalı dış bölgeler",
      "prompt": "|2x−1|≥5 eşitsizliğini çöz.",
      "strategy": "En az 5 uzaklık iki yandadır.",
      "steps": [
        {
          "label": "Sol kol",
          "expression": "2x−1≤−5 →x≤−2",
          "explanation": "İç ifade yeterince negatif."
        },
        {
          "label": "Sağ kol",
          "expression": "2x−1≥5 →x≥3",
          "explanation": "İç ifade yeterince pozitif."
        },
        {
          "label": "Birleştir",
          "expression": "x≤−2 veya x≥3",
          "explanation": "Tek x’in iki kolu birden sağlaması gerekmez."
        }
      ],
      "answer": "(−∞,−2]∪[3,∞).",
      "check": "0 uygun değil; −2 ve 3 uygundur.",
      "pitfall": "Veya yerine ve kullanma."
    },
    {
      "code": "E13",
      "title": "Sıkı dış bölgeler",
      "prompt": "|2x−3|>7 eşitsizliğini çöz.",
      "strategy": "Hedefin dışını al, uçlar hariç.",
      "steps": [
        {
          "label": "Sol",
          "expression": "2x−3<−7 →x<−2",
          "explanation": "Sıkı sol ışın."
        },
        {
          "label": "Sağ",
          "expression": "2x−3>7 →x>5",
          "explanation": "Sıkı sağ ışın."
        },
        {
          "label": "Uçlar",
          "expression": "−2 ve 5 dışarıda",
          "explanation": "İkisinde de uzaklık 7 eşit olur."
        }
      ],
      "answer": "(−∞,−2)∪(5,∞).",
      "check": "−3 ve 6 uygun.",
      "pitfall": "> ile ≥ aynı ilişki değildir; eşitlik kabulü farklıdır."
    },
    {
      "code": "E14",
      "title": "Sağ taraf sıfırın iki biçimi",
      "prompt": "|x−5|≤0 ve |x−5|<0 koşullarını karşılaştır.",
      "strategy": "Negatif olmayan değerin 0’a eşit olup olamayacağını sor.",
      "steps": [
        {
          "label": "Alt sınır",
          "expression": "|x−5|≥0",
          "explanation": "Tanım gereği."
        },
        {
          "label": "≤ durumu",
          "expression": "|x−5|=0 →x=5",
          "explanation": "Sıfır kabul edilir."
        },
        {
          "label": "< durumu",
          "expression": "0’dan küçük uzaklık yok",
          "explanation": "x=5 bile 0<0 sağlamaz."
        }
      ],
      "answer": "≤ için {5}; < için ∅.",
      "check": "Bir eşitlik çizgisi çözümü değiştirir.",
      "pitfall": "≤ ilişkisinde yalnız k > 0 istemek, k = 0 durumunu kaybettirir."
    },
    {
      "code": "E15",
      "title": "Negatif hedefte büyük ilişkisi",
      "prompt": "|x−2|>−1 eşitsizliğini çöz.",
      "strategy": "En küçük sol değer bile −1’den büyük.",
      "steps": [
        {
          "label": "Alt sınır",
          "expression": "|x−2|≥0",
          "explanation": "Her x."
        },
        {
          "label": "Hedef",
          "expression": "0>−1",
          "explanation": "En küçük durumda da doğru."
        },
        {
          "label": "Küme",
          "expression": "ℝ",
          "explanation": "Bütün gerçekler uygundur."
        }
      ],
      "answer": "ℝ.",
      "check": "x=2’de 0>−1.",
      "pitfall": "Negatif hedefte bütün işaretleri çözüm yok sanma."
    },
    {
      "code": "E16",
      "title": "Negatif iç katsayı",
      "prompt": "|−2x+1|<5 eşitsizliğini çöz.",
      "strategy": "İki sınırı koru, negatif bölmede yönleri değiştir.",
      "steps": [
        {
          "label": "Kur",
          "expression": "−5<−2x+1<5",
          "explanation": "İç bölge."
        },
        {
          "label": "Çıkar",
          "expression": "−6<−2x<4",
          "explanation": "Üç taraftan 1 çıkarıldı."
        },
        {
          "label": "Böl ve sırala",
          "expression": "3>x>−2 →−2<x<3",
          "explanation": "−2’ye bölme iki yönü döndürür."
        }
      ],
      "answer": "(−2,3).",
      "check": "0 uygun; −2 ve 3 hariç.",
      "pitfall": "Aralığı büyük uçtan küçüğe yazma."
    },
    {
      "code": "E17",
      "title": "Parametrede önce yarıçap",
      "prompt": "|x−2|=m−1 için çözüm sayısını bul.",
      "strategy": "r=m−1 işaretinin üç dalını ayır.",
      "steps": [
        {
          "label": "Negatif",
          "expression": "m<1 →r<0",
          "explanation": "Çözüm yok."
        },
        {
          "label": "Sıfır",
          "expression": "m=1 →r=0",
          "explanation": "Tek kök 2."
        },
        {
          "label": "Pozitif",
          "expression": "m>1 →x=2±(m−1)",
          "explanation": "İki farklı kök."
        }
      ],
      "answer": "m<1 için 0; m=1 için 1; m>1 için 2 farklı çözüm.",
      "check": "m = 1/2 pozitifken r = m−1 negatiftir.",
      "pitfall": "m’nin işaretine bakmak yetmez."
    },
    {
      "code": "E18",
      "title": "Grafikte tepe ve kök ayrı",
      "prompt": "y=|x−2|−1 grafiğinin tepe ve köklerini bul.",
      "strategy": "İç ifadeyi sıfırlama ile y = 0 koşulunu ayır.",
      "steps": [
        {
          "label": "Tepe",
          "expression": "x−2=0 →(2,−1)",
          "explanation": "Mutlak değerin en küçük iç uzaklığı 0."
        },
        {
          "label": "Kök",
          "expression": "|x−2|=1 →x=1 ve 3",
          "explanation": "y=0 istendi."
        },
        {
          "label": "Simetri",
          "expression": "(1+3)/2=2",
          "explanation": "İki kök tepe x’ine eşit uzaklıkta."
        }
      ],
      "answer": "Tepe (2,−1), kök 1 ve 3.",
      "check": "x=2 kök değil.",
      "pitfall": "Tepe koordinatını kök listesine koyma."
    },
    {
      "code": "E19",
      "title": "Aşağı açılan grafik",
      "prompt": "y=−|x−2|−1 grafiğinde tepe ve kökleri bul.",
      "strategy": "Dış çarpan −1, dış sabit −1 ayrı kalır.",
      "steps": [
        {
          "label": "Tepe",
          "expression": "(2,−1)",
          "explanation": "İç sıfır ve dış sabit."
        },
        {
          "label": "Yön",
          "expression": "−|x−2|≤0",
          "explanation": "Tepe en büyük yüksekliğe dönüşür."
        },
        {
          "label": "Kök",
          "expression": "|x−2|=−1 →∅",
          "explanation": "Negatif uzaklık istenir."
        }
      ],
      "answer": "Tepe (2,−1), kök yok.",
      "check": "Grafik daima ≤−1.",
      "pitfall": "Bütün fonksiyonu −1 ile çarpmak farklıdır."
    },
    {
      "code": "E20",
      "title": "Aynı tepe farklı açıklık",
      "prompt": "y=|2x−4|−1 grafiğinin köklerini bul.",
      "strategy": "İç katsayının ölçeğini koru.",
      "steps": [
        {
          "label": "Merkez",
          "expression": "2x−4=0 →x=2",
          "explanation": "Tepe (2,−1)."
        },
        {
          "label": "İki kol",
          "expression": "2x−4=1 veya −1",
          "explanation": "Kök için uzaklık 1."
        },
        {
          "label": "Kök",
          "expression": "x=5/2 veya 3/2",
          "explanation": "Kolların eğimleri −2 ve +2 olduğu için kökler merkezin yarım birim uzağındadır."
        }
      ],
      "answer": "{3/2,5/2}.",
      "check": "|2x−4|=2|x−2|.",
      "pitfall": "Katsayı 2’yi yok sayma."
    },
    {
      "code": "E21",
      "title": "İki uzaklığın bütün minimum noktaları",
      "prompt": "|x−2|+|x+1| en küçük ne olur?",
      "strategy": "Uçlar −1 ve 2 arasındaki parçayı incele.",
      "steps": [
        {
          "label": "Aralık",
          "expression": "−1≤x≤2",
          "explanation": "İki iç ifadenin işaretleri belirlenir."
        },
        {
          "label": "Toplam",
          "expression": "(2−x)+(x+1)=3",
          "explanation": "x terimleri götürür."
        },
        {
          "label": "Dışarısı",
          "expression": "3+2·dış uzaklık",
          "explanation": "İki yolda birlikte artış olur."
        }
      ],
      "answer": "Minimum 3, bütün [−1,2].",
      "check": "Uçlar ve orta aynı minimumu verir.",
      "pitfall": "Yalnız orta noktayı çözüm sanma."
    },
    {
      "code": "E22",
      "title": "Parçalı uzaklık denklemi",
      "prompt": "|x−1|+|x−4|=5 denklemini çöz.",
      "strategy": "1 ve 4 kırılmalarıyla üç aralık kur.",
      "steps": [
        {
          "label": "Sol",
          "expression": "x<1:5−2x=5 →x=0",
          "explanation": "Kendi aralığına uygun."
        },
        {
          "label": "Orta",
          "expression": "1≤x≤4:3=5",
          "explanation": "Bu aralıktan çözüm gelmez."
        },
        {
          "label": "Sağ",
          "expression": "x>4:2x−5=5 →x=5",
          "explanation": "Kendi aralığına uygun."
        }
      ],
      "answer": "{0,5}.",
      "check": "İkisi de toplam 5 verir.",
      "pitfall": "Her dal kökünü kendi aralığında denetle."
    },
    {
      "code": "E23",
      "title": "Hedef toplamın üç hâli",
      "prompt": "|x−1|+|x−4|=T için T=2,3,5 durumlarını karşılaştır.",
      "strategy": "Minimum toplam 3 ile hedefi karşılaştır.",
      "steps": [
        {
          "label": "Altında",
          "expression": "T=2<3 →∅",
          "explanation": "Uçlar arası uzaklıktan küçük toplam olmaz."
        },
        {
          "label": "Eşit",
          "expression": "T=3 →[1,4]",
          "explanation": "Bütün orta parça minimumu verir."
        },
        {
          "label": "Üstünde",
          "expression": "T=5 →{0,5}",
          "explanation": "İki dış dalın birer kökü."
        }
      ],
      "answer": "Sırasıyla ∅, [1, 4] ve {0, 5}.",
      "check": "Hedef minimumda iken sonsuz çözüm olabilir.",
      "pitfall": "Her hedefe iki kök kalıbını dayatma."
    },
    {
      "code": "E24",
      "title": "İç içe iki uzaklık",
      "prompt": "||x|−3|=1 denklemini çöz.",
      "strategy": "Önce dış katmanı aç.",
      "steps": [
        {
          "label": "Dış",
          "expression": "|x|−3=1 veya −1",
          "explanation": "Dış uzaklık hedef 1."
        },
        {
          "label": "İç hedefler",
          "expression": "|x|=4 veya 2",
          "explanation": "İki hedef de geçerli pozitif."
        },
        {
          "label": "Kökler",
          "expression": "−4,−2,2,4",
          "explanation": "Her iç denklem iki kök."
        }
      ],
      "answer": "{−4,−2,2,4}.",
      "check": "Her kökte ||x|−3|=1.",
      "pitfall": "İçteki mutlak değeri aynı satırda yok etme."
    },
    {
      "code": "E25",
      "title": "Negatif iç hedefin reddi",
      "prompt": "||x|−2|=3 denklemini çöz.",
      "strategy": "Dış dallardan gelen iç hedefleri tekrar denetle.",
      "steps": [
        {
          "label": "Dış",
          "expression": "|x|−2=3 veya −3",
          "explanation": "İki olasılık."
        },
        {
          "label": "Hedef",
          "expression": "|x|=5 veya −1",
          "explanation": "İkinci hedef negatif."
        },
        {
          "label": "Kök",
          "expression": "x=−5 veya 5",
          "explanation": "Negatif hedeften kök yok."
        }
      ],
      "answer": "{−5,5}.",
      "check": "±1, dış uzaklık 1 verir.",
      "pitfall": "Her dış dal iki kök vermez."
    },
    {
      "code": "E26",
      "title": "İçte sıfır ve kök sayımı",
      "prompt": "||x|−3|=3 denklemini çöz.",
      "strategy": "Sıfır hedefte kök tekrarı yapma.",
      "steps": [
        {
          "label": "Dış",
          "expression": "|x|=6 veya 0",
          "explanation": "Dıştan iki hedef."
        },
        {
          "label": "İç",
          "expression": "x=±6 veya 0",
          "explanation": "|x|=0 tek noktadır."
        },
        {
          "label": "Tekilleştir",
          "expression": "{−6,0,6}",
          "explanation": "0 iki kez yazılmaz."
        }
      ],
      "answer": "Üç farklı kök.",
      "check": "Üçü de dış uzaklık 3 verir.",
      "pitfall": "Sembolik ±0 iki farklı kök değildir."
    },
    {
      "code": "E27",
      "title": "İki tarafta mutlak değer",
      "prompt": "|x−1|=|2x+3| denklemini çöz.",
      "strategy": "A = B veya A = −B kollarını ayrı ayrı çöz.",
      "steps": [
        {
          "label": "Aynı işaret",
          "expression": "x−1=2x+3 →x=−4",
          "explanation": "Birinci doğrusal kol."
        },
        {
          "label": "Ters işaret",
          "expression": "x−1=−2x−3 →x=−2/3",
          "explanation": "İkinci doğrusal kol."
        },
        {
          "label": "Kontrol",
          "expression": "5=5 ve 5/3=5/3",
          "explanation": "Özgün iki mutlak değer karşılaştırılır."
        }
      ],
      "answer": "{−4,−2/3}.",
      "check": "Kesirli kök geçerlidir.",
      "pitfall": "İkinci kolu açarken tüm işaretleri değiştir."
    },
    {
      "code": "E28",
      "title": "Kareden gelen geçersiz aday",
      "prompt": "|x|=x−2 denklemini çöz.",
      "strategy": "Sağ tarafın işaretini sakla.",
      "steps": [
        {
          "label": "Koşul",
          "expression": "x−2≥0 →x≥2",
          "explanation": "Mutlak değer negatif olamaz."
        },
        {
          "label": "Kareler",
          "expression": "x²=(x−2)² →x=1",
          "explanation": "Bu henüz yalnız adaydır."
        },
        {
          "label": "Eleme",
          "expression": "1≥2 yanlış",
          "explanation": "Aday özgün işaret koşulunu sağlamaz."
        }
      ],
      "answer": "∅.",
      "check": "1’de sol 1, sağ −1.",
      "pitfall": "Kare alma kaybolan işaret bilgisini geri getirmez."
    },
    {
      "code": "E29",
      "title": "Kaynak provaları: iki farklı kök",
      "prompt": "|3x−4|=8 denklemini çöz.",
      "strategy": "Pozitif hedefte iki kol aç.",
      "steps": [
        {
          "label": "İlk",
          "expression": "3x−4=8 →x=4",
          "explanation": "12’yi 3’e böl."
        },
        {
          "label": "İkinci",
          "expression": "3x−4=−8 →x=−4/3",
          "explanation": "−4’ü 3’e böl."
        },
        {
          "label": "Denetim",
          "expression": "|8|=|−8|=8",
          "explanation": "İki kök de gerçek."
        }
      ],
      "answer": "{−4/3,4}.",
      "check": "Kesirli kökü sırf kesir diye reddetme.",
      "pitfall": "İkinci kolun işaretini kaybetme."
    },
    {
      "code": "E30",
      "title": "Kaynak provaları: kapalı aralık",
      "prompt": "|x+2|≤5 eşitsizliğini çöz.",
      "strategy": "İç aralıkta iki uç kabul edilir.",
      "steps": [
        {
          "label": "Kur",
          "expression": "−5≤x+2≤5",
          "explanation": "Hedef 5 pozitif."
        },
        {
          "label": "Taşı",
          "expression": "−7≤x≤3",
          "explanation": "Üç taraftan 2 çıkar."
        },
        {
          "label": "Küme",
          "expression": "[−7,3]",
          "explanation": "Eşitlikli uçlar dahil."
        }
      ],
      "answer": "[−7,3].",
      "check": "İki uçta da uzaklık 5.",
      "pitfall": "İçteki +2’yi iki uca yanlış yönde taşıma."
    },
    {
      "code": "E31",
      "title": "Kaynak provaları: minimum ve alan",
      "prompt": "|x−4|+|x+1| minimumunu bul.",
      "strategy": "Uçları −1 ve 4 olarak sırala.",
      "steps": [
        {
          "label": "Uzaklık",
          "expression": "4−(−1)=5",
          "explanation": "Alt sınır budur."
        },
        {
          "label": "Aralık",
          "expression": "−1≤x≤4",
          "explanation": "İki hareket uçlar arası yolu tamamlar."
        },
        {
          "label": "Kontrol",
          "expression": "x=0 →4+1=5",
          "explanation": "Orta nokta olmayan bir x de en küçük toplamı verir."
        }
      ],
      "answer": "Minimum 5, bütün [−1,4].",
      "check": "−1 ve 4 de minimumu verir.",
      "pitfall": "En küçük toplamı veren tek bir örnek noktayı bütün çözüm kümesi sanma."
    },
    {
      "code": "E32",
      "title": "Kaynak provaları: değişken sağda",
      "prompt": "|7−a|=3 denklemini çöz.",
      "strategy": "a ile 7 arasındaki uzaklığı oku.",
      "steps": [
        {
          "label": "İlk kol",
          "expression": "7−a=3 →a=4",
          "explanation": "İki taraftan 7 çıkarınca −a = −4; −1’e bölünce a = 4."
        },
        {
          "label": "İkinci kol",
          "expression": "7−a=−3 →a=10",
          "explanation": "−a=−10."
        },
        {
          "label": "Kontrol",
          "expression": "|3|=|−3|=3",
          "explanation": "Kökler doğru."
        }
      ],
      "answer": "{4,10}.",
      "check": "İki kökün orta noktası 7.",
      "pitfall": "a’nın önündeki −1 katsayısını unutma."
    },
    {
      "code": "E33",
      "title": "Kaynak provaları: sola öteleme",
      "prompt": "y=|x+1|−2 tepe ve köklerini bul.",
      "strategy": "İçi sıfırla, sonra y=0 yap.",
      "steps": [
        {
          "label": "Tepe",
          "expression": "x=−1 →(−1,−2)",
          "explanation": "İçteki +1 merkez −1."
        },
        {
          "label": "Kök",
          "expression": "|x+1|=2 →x=−3 ve 1",
          "explanation": "İki yön."
        },
        {
          "label": "Simetri",
          "expression": "(−3+1)/2=−1",
          "explanation": "Tepe x’ini doğrular."
        }
      ],
      "answer": "Tepe (−1,−2), kökler −3 ve 1.",
      "check": "İki kökün de −1’e uzaklığı 2 birimdir.",
      "pitfall": "İç artıyı sağa öteleme sanma."
    },
    {
      "code": "E34",
      "title": "Hata onarımı: iç ve dış sınır",
      "prompt": "|x+2|<4 ve |x−1|≥2 koşullarını çöz.",
      "strategy": "İlişkiyi görmeden yöntem seçme.",
      "steps": [
        {
          "label": "İç",
          "expression": "−4<x+2<4 →−6<x<2",
          "explanation": "Küçüktür, iki açık uç."
        },
        {
          "label": "Dış",
          "expression": "x−1≤−2 veya x−1≥2",
          "explanation": "Büyük eşit, iki dış kol."
        },
        {
          "label": "Dış küme",
          "expression": "x≤−1 veya x≥3",
          "explanation": "Uçlar dahil."
        }
      ],
      "answer": "İlki (−6,2), ikincisi (−∞,−1]∪[3,∞).",
      "check": "İlkinde 0 uygun; ikincisinde 0 uygun değil.",
      "pitfall": "Aynı iç/dış kalıbını her ilişkiye uygulama."
    },
    {
      "code": "E35",
      "title": "Seçili OGM örneğinde dış eksi",
      "prompt": "x>0 iken |3x|+|−2x|−|1+x| ifadesini sadeleştir.",
      "strategy": "Koşula göre üç iç değerin işaretini belirle.",
      "steps": [
        {
          "label": "İşaret",
          "expression": "3x > 0, −2x < 0, 1+x > 0",
          "explanation": "Her terim kendi koşuluyla açılır."
        },
        {
          "label": "Açma",
          "expression": "3x+2x−(1+x)",
          "explanation": "Dış eksi bütün son ifadeyi çıkarır."
        },
        {
          "label": "Toplama",
          "expression": "5x−1−x=4x−1",
          "explanation": "Benzer terimler toplanır."
        }
      ],
      "answer": "4x−1.",
      "check": "x=1/8’de −1/2; çıkarma bütün ifadeyi negatif yapabilir.",
      "pitfall": "Her terim mutlak değerli diye toplamın pozitif olacağını sanma."
    },
    {
      "code": "E36",
      "title": "Kapsamı belirsiz örneği düzelt",
      "prompt": "|−20×3−5=55 için üç kapanış konumunu karşılaştır.",
      "strategy": "Her adayın bütün işlemini hesapla.",
      "steps": [
        {
          "label": "20 sonrası",
          "expression": "|−20|×3−5=55",
          "explanation": "Yalnız −20 içeride."
        },
        {
          "label": "3 sonrası",
          "expression": "|−20×3|−5=55",
          "explanation": "Çarpım içeride."
        },
        {
          "label": "5 sonrası",
          "expression": "|−20×3−5|=65",
          "explanation": "Bütün fark içeride."
        }
      ],
      "answer": "İki farklı doğru konum: 20 ve 3 sonrası.",
      "check": "Bu verilerle tek cevaplı kapanış yeri sorulamaz.",
      "pitfall": "Bir konum doğru çıktı diye diğer adayları denetlemeyi bırakma."
    },
    {
      "code": "E37",
      "title": "Özgün kapsam aktarımı",
      "prompt": "|−4+7−6+8−9=2 eşitliğinde sağ çizginin yerini bul.",
      "strategy": "Beş aday kapanışın sonuçlarını denetle.",
      "steps": [
        {
          "label": "İlk ikisi",
          "expression": "4 ve −4",
          "explanation": "Hedef 2 değil."
        },
        {
          "label": "Üçüncü",
          "expression": "|−3|+8−9=2",
          "explanation": "6 sonrasında hedefe ulaşılıyor."
        },
        {
          "label": "Son ikisi",
          "expression": "−4 ve 4",
          "explanation": "Başka doğru konum yok."
        }
      ],
      "answer": "6 sayısının sağı.",
      "check": "Sonuç listesi 4,−4,2,−4,4.",
      "pitfall": "Bu özgün örneği resmî soru diye etiketleme."
    },
    {
      "code": "E38",
      "title": "Toleransın iki kapalı ucu",
      "prompt": "Hedef 100, sapma en çok 2 birim. Ölçüm x hangi aralıkta?",
      "strategy": "En çok ifadesini ≤ ilişkisiyle göster.",
      "steps": [
        {
          "label": "Uzaklık",
          "expression": "|x−100|≤2",
          "explanation": "Merkez 100, yarıçap 2."
        },
        {
          "label": "İç bölge",
          "expression": "−2≤x−100≤2",
          "explanation": "İki sınır eşitliği kabul eder."
        },
        {
          "label": "Öteleme",
          "expression": "98≤x≤102",
          "explanation": "Üç tarafa 100 ekle."
        }
      ],
      "answer": "[98,102].",
      "check": "Tam sınırlar kabul edilir.",
      "pitfall": "Sapmayı ölçümün kendisiyle karıştırma."
    }
  ],
  "recall": [
    {
      "prompt": "Mutlak değer ile konum arasındaki farkı −7 üzerinde açıkla.",
      "answer": "−7 konumdur; |−7| = 7 ise 0’a uzaklığıdır. Uzaklık yön taşımaz."
    },
    {
      "prompt": "x<0 iken −x’in işareti nedir?",
      "answer": "Pozitiftir. Örneğin x = −2 için −x = 2. |x| = −x bu koşulda pozitif sonuç verir."
    },
    {
      "prompt": "|A|=k için ilk denetim nedir?",
      "answer": "k’nin işareti: k < 0 ise çözüm yok; k = 0 ise A = 0; k > 0 ise A = k veya A = −k."
    },
    {
      "prompt": "a=0 ile |ax +b|=k denkleminde ne değişir?",
      "answer": "|b| = k sabit koşulu kalır. Doğruysa bütün gerçek x’ler çözüm; yanlışsa çözüm yoktur. Sıfıra bölünmez."
    },
    {
      "prompt": "|A|<k ve |A|≤k sağ taraf 0’da nasıl ayrılır?",
      "answer": "|A| < 0 için çözüm yoktur. |A| ≤ 0 için yalnız A = 0 geçerlidir."
    },
    {
      "prompt": "Büyük ilişkilerde iki dış bölge neden veya ile bağlanır?",
      "answer": "Tek noktanın iki tarafta birden bulunması gerekmez; iki koşuldan herhangi birini sağlaması yeterlidir."
    },
    {
      "prompt": "Negatif iç katsayıya bölünce ne yaparsın?",
      "answer": "İki eşitsizlik yönünü ters çevirir, sonuçtaki sınırları küçükten büyüğe sıralarım."
    },
    {
      "prompt": "|x−a|=r’de merkez ve yarıçap ne zaman geçerlidir?",
      "answer": "r ≥ 0 iken a merkez, r uzaklıktır. r < 0 ise çözüm yok; r = 0 ise tek nokta x = a vardır."
    },
    {
      "prompt": "Üçgen eşitsizliğinde eşitlik hangi koşulda olur?",
      "answer": "Gerçek u ve v aynı yönlü olduğunda veya en az biri 0 olduğunda; eşdeğer koşul uv ≥ 0’dır."
    },
    {
      "prompt": "|x²| neden x değildir?",
      "answer": "x² ≥ 0 olduğu için |x²| = x². Örneğin x = −2 için |x²| = 4, fakat x = −2’dir."
    },
    {
      "prompt": "|A|=B’nin karesini alırken hangi koşul saklanır?",
      "answer": "B ≥ 0 koşulu saklanır; aksi halde karelerden gelen adaylar özgün eşitlikte geçersiz olabilir."
    },
    {
      "prompt": "|A|=|B| için iki doğrusal kol nedir?",
      "answer": "A = B veya A = −B. Özdeşlik veya çakışan kök olabileceği için kök sayısı körlemesine iki kabul edilmez."
    },
    {
      "prompt": "y=|x−a|+b grafiğinin tepe ve simetrisi nedir?",
      "answer": "Tepe (a, b); simetri ekseni x = a’dır."
    },
    {
      "prompt": "Dış çarpanı −1 yapmak ile bütün fonksiyonu −1 ile çarpmak neden farklı?",
      "answer": "Yalnız dış çarpan değiştiğinde dış toplama sabiti aynı kalır. Bütün fonksiyon −1 ile çarpılırsa sabitin de işareti değişir."
    },
    {
      "prompt": "İç katsayı 2 ise aynı tepe neden aynı grafik değildir?",
      "answer": "Kolların eğimleri −2 ve +2 olur; ölçek ve köklerin merkeze uzaklığı değişir."
    },
    {
      "prompt": "İki noktaya uzaklık toplamının minimumunu kimler verir?",
      "answer": "İki uç dahil aradaki bütün x değerleri. En küçük toplam, uçlar arasındaki uzaklıktır."
    },
    {
      "prompt": "İki uç dışında minimumdan fazlalık ne kadardır?",
      "answer": "Dışarı çıkılan mesafenin iki katıdır."
    },
    {
      "prompt": "||x|−c|=r’de çözme sırası nedir?",
      "answer": "Önce dış katmanı aç, çıkan iç hedeflerin işaretini denetle, sonra iç mutlak değerleri çöz ve çakışan kökleri tek kez yaz."
    },
    {
      "prompt": "|x−2|=m−1 denkleminde m=1/2 neden çözüm vermez?",
      "answer": "m pozitif olsa da m−1 = −1/2 negatiftir; negatif uzaklık olanaksızdır."
    },
    {
      "prompt": "İşlem kapsamı sorusunda her aday çizgi yeri niçin denenir?",
      "answer": "Farklı kapsamlar aynı sonucu verebilir. Tek cevap olduğu ancak bütün aday kapsamları denetleyince anlaşılır."
    },
    {
      "prompt": "Seçili OGM örneğinde x>0 koşulu hangi üç açmayı verir?",
      "answer": "|3x| = 3x, |−2x| = 2x ve |1+x| = 1+x. Son ifadenin önündeki eksi dağıtıldığında sonuç 4x−1’dir."
    },
    {
      "prompt": "En az ve en çok hangi ilişkilerdir?",
      "answer": "En az, ≥; en çok, ≤ ilişkisidir. İkisi de sınır eşitliğini kabul eder."
    },
    {
      "prompt": "Sıfıra bölmeyi mutlak değer düzeltebilir mi?",
      "answer": "Hayır. İç ifade tanımsızsa mutlak değeri de tanımlı değildir."
    },
    {
      "prompt": "Bir çözümü hangi değerlerle denetlersin?",
      "answer": "Özgün koşulda iç, dış ve sınır değerlerini denerim; bulunan adayın kendi aralığını ve tanım alanını korurum. Örnek denemeler tam cebirsel gerekçenin yerine geçmez."
    }
  ],
  "items": [
    {
      "code": "Q01",
      "prompt": "|−7| işleminin değeri kaçtır?",
      "options": [
        "7",
        "−7",
        "0",
        "14",
        "1/7"
      ],
      "knowledge": [
        "−7 konum, |−7| ise 0’a uzaklıktır.",
        "Uzaklık negatif değildir."
      ],
      "strategy": "−7 ile 0 arasındaki birimleri say.",
      "steps": [
        "İç değer −7 negatiftir.",
        "Mutlak değer dışına −(−7)=7 olarak çıkar."
      ],
      "optionReasons": [
        "−7 ile 0 arasında 7 birim vardır.",
        "−7 konumu korur ama uzaklığı negatif yazar.",
        "Yalnız iç ifade 0 olsaydı uzaklık 0 olurdu.",
        "14, −7 ile +7 arasındaki uzaklıktır; soruda +7’ye uzaklık istenmiyor.",
        "1/7 tersini almaktır; mutlak değer bölme işlemi değildir."
      ],
      "commonError": "Eksi konumu ile uzaklığın işaretini karıştırma.",
      "check": "|7|=7 de aynı uzaklığı verir."
    },
    {
      "code": "Q02",
      "prompt": "Gerçek x<0 iken |5x| hangi ifadeye eşittir?",
      "options": [
        "−5x",
        "5x",
        "−5",
        "5",
        "0"
      ],
      "knowledge": [
        "x<0 ve 5>0 olduğundan 5x<0.",
        "Negatif iç ifadenin tamamı −1 ile çarpılır."
      ],
      "strategy": "İçteki 5x’in işaretini belirle.",
      "steps": [
        "5x negatiftir.",
        "|5x|=−(5x)=−5x."
      ],
      "optionReasons": [
        "x negatifken −5x pozitiftir; örneğin x=−2’de 10.",
        "x=−2’de 5x=−10 olur; mutlak değer 10 olmalı.",
        "−5 sabiti hem negatif hem x’e bağlı değişimi kaybeder.",
        "x=−2’de doğru değer 10’dur; 5 yalnız x=−1 için uyuşur.",
        "x<0 iken 5x sıfır değildir; uzaklık pozitif olmalı."
      ],
      "commonError": "−x her zaman negatif değildir.",
      "check": "x=−2 ve x=−3 sırasıyla 10 ve 15 verir."
    },
    {
      "code": "Q03",
      "prompt": "Gerçek x>0 iken |−5x| hangi ifadeye eşittir?",
      "options": [
        "5x",
        "−5x",
        "5",
        "−5",
        "0"
      ],
      "knowledge": [
        "−5x, x>0 koşulunda negatiftir.",
        "−(−5x)=5x."
      ],
      "strategy": "İçteki eksiyle dışarı çıkarırken gelen eksiyi birlikte işle.",
      "steps": [
        "−5x<0.",
        "|−5x|=−1·(−5x)=5x."
      ],
      "optionReasons": [
        "x=2’de |−10|=10 ve 5x=10.",
        "x=2’de −10 verir; uzaklık negatif olamaz.",
        "x=2’de 10 gerekir; 5 değişkeni düşürür.",
        "−5 negatif sabittir ve x’i düşürür.",
        "İç ifade sıfır olmadığı için sonuç 0 olamaz."
      ],
      "commonError": "Görünen eksiyi yalnız silip katsayıyı veya x’i düşürme.",
      "check": "Her izinli x>0 için 5x>0."
    },
    {
      "code": "Q04",
      "prompt": "Her gerçek a için |a²+3| hangi ifadeye eşittir?",
      "options": [
        "a²+3",
        "a²−3",
        "−a²−3",
        "|a|+3",
        "3"
      ],
      "knowledge": [
        "a²≥0 olduğu için a²+3≥3.",
        "Negatif olmayan iç ifade aynen çıkar."
      ],
      "strategy": "Önce bütün iç ifadenin işaretini bul.",
      "steps": [
        "a²+3 her zaman pozitiftir.",
        "Bu nedenle |a²+3|=a²+3."
      ],
      "optionReasons": [
        "İçerisi en az 3 olduğu için işaret değiştirme yok.",
        "a=0’da −3 verir; doğru uzaklık 3’tür.",
        "Her a’da negatif sonuç verir; doğru değer pozitiftir.",
        "a=2’de 5 verir; doğru değer |4+3|=7.",
        "a=2’de doğru değer 7; a² terimi atılamaz."
      ],
      "commonError": "Mutlak değer almak kareyi köke dönüştürmez.",
      "check": "a=−2’de de sonuç 7’dir."
    },
    {
      "code": "Q05",
      "prompt": "Gerçek u ve v için aşağıdaki ifadelerden hangisi her zaman doğrudur?",
      "options": [
        "|u+v|≤|u|+|v|",
        "|u+v|=|u|+|v|",
        "|u+v|≥|u|+|v|",
        "|u−v|=u−v",
        "|u|+|v|<0"
      ],
      "knowledge": [
        "Net uzaklık, ayrı hareketlerin uzaklık toplamından büyük olamaz.",
        "Aynı yön veya sıfır durumunda eşitlik olabilir."
      ],
      "strategy": "Ters yönlü iki sayı ile genellemeleri denetle.",
      "steps": [
        "u=2, v=−5 için |u+v|=3, |u|+|v|=7.",
        "3≤7; aynı yönde u=2, v=5 için 7=7."
      ],
      "optionReasons": [
        "Üçgen eşitsizliği hem ters hem aynı yönlü hareketlerde geçerlidir.",
        "u=2, v=−5 karşı örneğinde 3≠7.",
        "Aynı karşı örnekte 3≥7 yanlıştır.",
        "u=2, v=5 için |−3|=3 ama u−v=−3.",
        "İki negatif olmayan sayının toplamı negatif olamaz."
      ],
      "commonError": "Eşitlik koşulunu bütün toplamlar için genelleme.",
      "check": "u·v≥0 olduğunda eşitlik; u·v<0 olduğunda bu iki sayı için sıkı küçüklük vardır."
    },
    {
      "code": "Q06",
      "prompt": "|6/0| ifadesi için hangisi doğrudur?",
      "options": [
        "Tanımsızdır.",
        "0’dır.",
        "6’dır.",
        "1’dir.",
        "Gerçek sayı olarak ∞’dur."
      ],
      "knowledge": [
        "Gerçek sayılarda 0’a bölme tanımlı değildir.",
        "Mutlak değer yalnız tanımlı bir iç değere uygulanır."
      ],
      "strategy": "Mutlak değerden önce iç bölmenin tanımlı olup olmadığını kontrol et.",
      "steps": [
        "Payda 0.",
        "6/0 bir gerçek sayı belirtmediği için mutlak değeri de tanımlı değildir."
      ],
      "optionReasons": [
        "Sıfır payda iç ifadeyi tanımsız yapar.",
        "6’yı 0’la çarpmak başka işlem; 6/0=0 değildir.",
        "Paydayı yok saymak 6/1’e dönüştürür.",
        "6/6=1 olurdu; burada payda 0.",
        "∞, 0’a bölmenin gerçek sayı değeri olarak kullanılamaz."
      ],
      "commonError": "Mutlak değer tanım alanını genişletmez.",
      "check": "|−6/2| tanımlıdır ve 3; bu, sıfır paydayı geçerli yapmaz."
    },
    {
      "code": "Q07",
      "prompt": "Sayı doğrusunda 7 ile 2 arasındaki uzaklık kaç birimdir?",
      "options": [
        "5",
        "−5",
        "9",
        "14",
        "7/2"
      ],
      "knowledge": [
        "İki noktanın uzaklığı |a−b| ile bulunur.",
        "Sırayı değiştirmek uzaklığı değiştirmez."
      ],
      "strategy": "İki konumu çıkar ve mutlak değerini al.",
      "steps": [
        "|7−2|=|5|.",
        "Sonuç 5 birim."
      ],
      "optionReasons": [
        "7−2=5, dolayısıyla uzaklık 5.",
        "2−7=−5 konum farkıdır; uzaklık bunun mutlak değeri 5.",
        "9, 7+2 toplamı; aynı yöndeki konumların uzaklığı değil.",
        "14, 7’nin iki katı; ikinci konum 2 kullanılmamış.",
        "7/2 oran verir; uzunluk farkı isteniyor."
      ],
      "commonError": "Toplamı veya oranı uzaklık diye kullanma.",
      "check": "|2−7|=5."
    },
    {
      "code": "Q08",
      "prompt": "Gerçek x için |x−2|=4 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{−2, 6}",
        "{2, 4}",
        "{−6, 2}",
        "{6}",
        "∅"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−2|=4 koşulunu sağlamalıdır."
      ],
      "strategy": "Merkez 2’den iki yöne 4 git.",
      "steps": [
        "x−2=4 veya x−2=−4.",
        "x=6 veya x=−2."
      ],
      "optionReasons": [
        "Her iki kökün 2’ye uzaklığı 4; iki kol bütün çözümleri verir.",
        "Bu seçenek x=−2 değerini dışarıda bırakır. İlk koşulda |1·(−2)+(−2)|=4; 4=4; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−6 değerini içerir. İlk koşulda |1·(−6)+(−2)|=8; 8=4; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−2 değerini dışarıda bırakır. İlk koşulda |1·(−2)+(−2)|=4; 4=4; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−2 değerini dışarıda bırakır. İlk koşulda |1·(−2)+(−2)|=4; 4=4; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Merkez ile yarıçapı köklerin kendisi sanma.",
      "check": "|−2−2|=4, |6−2|=4."
    },
    {
      "code": "Q09",
      "prompt": "Gerçek x için |2x+1|=7 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{−4, 3}",
        "{3}",
        "{−4}",
        "{−3, 4}",
        "∅"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |2x+1|=7 koşulunu sağlamalıdır."
      ],
      "strategy": "Sağ taraf pozitif; iki doğrusal kol aç.",
      "steps": [
        "2x+1=7 →2x=6 →x=3.",
        "2x+1=−7 →2x=−8 →x=−4."
      ],
      "optionReasons": [
        "İki farklı kök 3 ve −4 ilk ifadeyi sağlar.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda |2·(−4)+(1)|=7; 7=7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=3 değerini dışarıda bırakır. İlk koşulda |2·(3)+(1)|=7; 7=7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda |2·(−4)+(1)|=7; 7=7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda |2·(−4)+(1)|=7; 7=7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Yalnız pozitif iç değeri veren kökü alma.",
      "check": "|2·3+1|=7 ve |2·(−4)+1|=7."
    },
    {
      "code": "Q10",
      "prompt": "Gerçek x için |2x+1|=−7 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "{−4, 3}",
        "{0}",
        "{−7, 7}",
        "ℝ"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |2x+1|=−7 koşulunu sağlamalıdır."
      ],
      "strategy": "İki kola ayırmadan önce sağ tarafı kontrol et.",
      "steps": [
        "Sol taraf her x’te ≥0.",
        "−7 negatif olduğu için eşitlik olanaksız."
      ],
      "optionReasons": [
        "Hiçbir gerçek x negatif mutlak değer üretemez.",
        "Bu seçenek x=−4 değerini içerir. İlk koşulda |2·(−4)+(1)|=7; 7=−7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda |2·(0)+(1)|=1; 1=−7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−7 değerini içerir. İlk koşulda |2·(−7)+(1)|=13; 13=−7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |2·(−60)+(1)|=119; 119=−7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Negatif sağ tarafta olmayan iki kök üretme.",
      "check": "Her adayda sol taraf ≥0, sağ taraf −7."
    },
    {
      "code": "Q11",
      "prompt": "Gerçek x için |−3|=3 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "{−3, 3}",
        "∅",
        "{3}",
        "{0}"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |−3|=3 koşulunu sağlamalıdır."
      ],
      "strategy": "x katsayısı sıfır; sabit koşulu oku.",
      "steps": [
        "|0x−3|=3, yani 3=3.",
        "Bu doğruluk her gerçek x için aynı."
      ],
      "optionReasons": [
        "x’i ne seçersen seç sol taraf 3 kalır; bütün gerçekler çözüm.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |0·(−60)+(−3)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |0·(−60)+(−3)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |0·(−60)+(−3)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |0·(−60)+(−3)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Sıfır katsayıya bölerek kök uydurma.",
      "check": "x=−100 ve x=100 aynı 3=3 eşitliğini verir."
    },
    {
      "code": "Q12",
      "prompt": "Gerçek x için |−3|=2 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "ℝ",
        "{−3}",
        "{2}",
        "{−3, 3}"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |−3|=2 koşulunu sağlamalıdır."
      ],
      "strategy": "Sabit sol değeri sağ tarafla karşılaştır.",
      "steps": [
        "Sol taraf her x için 3.",
        "3=2 yanlış olduğu için hiçbir x çözüm değil."
      ],
      "optionReasons": [
        "Değişkenin yok olması her zaman bütün gerçekler demek değildir; sabit eşitlik yanlış.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |0·(−60)+(−3)|=3; 3=2; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−3 değerini içerir. İlk koşulda |0·(−3)+(−3)|=3; 3=2; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=2 değerini içerir. İlk koşulda |0·(2)+(−3)|=3; 3=2; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−3 değerini içerir. İlk koşulda |0·(−3)+(−3)|=3; 3=2; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Yanlış sabit koşulda ℝ yazma.",
      "check": "Hiçbir x, 0x−3 değerini −3’ten başka yapamaz."
    },
    {
      "code": "Q13",
      "prompt": "Gerçek x için |3x−2|<7 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−5/3, 3)",
        "[−5/3, 3]",
        "(−∞, −5/3) ∪ (3, ∞)",
        "(−5/3, ∞)",
        "(−∞, 3)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |3x−2|<7 koşulunu sağlamalıdır."
      ],
      "strategy": "Küçüktür iç bölgeyi ister.",
      "steps": [
        "−7<3x−2<7.",
        "Üç tarafa 2 ekle: −5<3x<9.",
        "Pozitif 3’e böl: −5/3<x<3."
      ],
      "optionReasons": [
        "İki sınır sıkı koşuldan dışarıda; aradaki bütün değerler geçerli.",
        "Bu seçenek x=−5/3 değerini içerir. İlk koşulda |3·(−5/3)+(−2)|=7; 7<7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |3·(−60)+(−2)|=182; 182<7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=3 değerini içerir. İlk koşulda |3·(3)+(−2)|=7; 7<7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |3·(−60)+(−2)|=182; 182<7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Küçüktür için dış ışınları seçme.",
      "check": "x=0 uygun; x=−5/3 ve x=3 eşitlik verdiğinden hariç."
    },
    {
      "code": "Q14",
      "prompt": "Gerçek x için |4x−3|≤9 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[−3/2, 3]",
        "(−3/2, 3)",
        "[−3, 3/2]",
        "(−∞, −3/2] ∪ [3, ∞)",
        "[−3/2, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |4x−3|≤9 koşulunu sağlamalıdır."
      ],
      "strategy": "İki eşit sınırı birlikte koru.",
      "steps": [
        "−9≤4x−3≤9.",
        "3 ekle: −6≤4x≤12.",
        "4’e böl: −3/2≤x≤3."
      ],
      "optionReasons": [
        "İç bölgenin iki ucu da ≤ nedeniyle dahil.",
        "Bu seçenek x=−3/2 değerini dışarıda bırakır. İlk koşulda |4·(−3/2)+(−3)|=9; 9≤9; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−3 değerini içerir. İlk koşulda |4·(−3)+(−3)|=15; 15≤9; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |4·(−60)+(−3)|=243; 243≤9; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=301/100 değerini içerir. İlk koşulda |4·(301/100)+(−3)|=226/25; 226/25≤9; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Sabit 3’ü yanlış tarafa ekleme veya kapalı uçları açma.",
      "check": "İki uç da ilk ifadede 9; x=0’da 3≤9."
    },
    {
      "code": "Q15",
      "prompt": "Gerçek x için |2x−1|≥5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, −2] ∪ [3, ∞)",
        "[−2, 3]",
        "(−∞, −2) ∪ (3, ∞)",
        "(−∞, −2]",
        "[3, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |2x−1|≥5 koşulunu sağlamalıdır."
      ],
      "strategy": "Büyük eşit iki dış bölgeyi ister.",
      "steps": [
        "2x−1≤−5 veya 2x−1≥5.",
        "İlk koldan x≤−2, ikinciden x≥3."
      ],
      "optionReasons": [
        "İki dış ışın ve eşitliği sağlayan iki sınır birlikte alınır.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |2·(−60)+(−1)|=121; 121≥5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−2 değerini dışarıda bırakır. İlk koşulda |2·(−2)+(−1)|=5; 5≥5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=3 değerini dışarıda bırakır. İlk koşulda |2·(3)+(−1)|=5; 5≥5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |2·(−60)+(−1)|=121; 121≥5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "İki dış koşulu ve ile bağlama.",
      "check": "x=−2 ve 3 uygun, x=0 uygun değil."
    },
    {
      "code": "Q16",
      "prompt": "Gerçek x için |2x−3|>7 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, −2) ∪ (5, ∞)",
        "[−2, 5]",
        "(−∞, −2] ∪ [5, ∞)",
        "(−2, 5)",
        "(5, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |2x−3|>7 koşulunu sağlamalıdır."
      ],
      "strategy": "İki dış kolu sıkı sınırla çöz.",
      "steps": [
        "2x−3<−7 veya 2x−3>7.",
        "x<−2 veya x>5."
      ],
      "optionReasons": [
        "İki eşitlik sınırı dışarıda; uzaklığı 7’den büyük değerler dış kollar.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |2·(−60)+(−3)|=123; 123>7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−2 değerini içerir. İlk koşulda |2·(−2)+(−3)|=7; 7>7; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |2·(−60)+(−3)|=123; 123>7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |2·(−60)+(−3)|=123; 123>7; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "> ile ≥ arasındaki uç farkını silme.",
      "check": "x=−3 ve 6 uygun; −2 ve 5 uygun değil."
    },
    {
      "code": "Q17",
      "prompt": "Gerçek x için |x−5|≤0 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{5}",
        "∅",
        "ℝ",
        "(−∞, 5]",
        "[5, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−5|≤0 koşulunu sağlamalıdır."
      ],
      "strategy": "Negatif olmayan değer en çok 0 ise tam 0’dır.",
      "steps": [
        "|x−5|≤0 ancak x−5=0.",
        "x=5."
      ],
      "optionReasons": [
        "≤ için sağ tarafın 0 olması geçerlidir; yalnız sıfır uzaklık alınır.",
        "Bu seçenek x=5 değerini dışarıda bırakır. İlk koşulda |1·(5)+(−5)|=0; 0≤0; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(−5)|=65; 65≤0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(−5)|=65; 65≤0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=501/100 değerini içerir. İlk koşulda |1·(501/100)+(−5)|=1/100; 1/100≤0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "< ile ≤ sıfır durumunu aynı sanma.",
      "check": "x=5’te 0≤0 doğru; x=4’te 1≤0 yanlış."
    },
    {
      "code": "Q18",
      "prompt": "Gerçek x için |x−5|<0 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "{5}",
        "ℝ",
        "(−∞, 5)",
        "(5, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−5|<0 koşulunu sağlamalıdır."
      ],
      "strategy": "Mutlak değerin alt sınırı 0’dır.",
      "steps": [
        "Her x’te |x−5|≥0.",
        "0’dan küçük olması olanaksız."
      ],
      "optionReasons": [
        "Sıfırda bile 0<0 yanlış; hiçbir çözüm yok.",
        "Bu seçenek x=5 değerini içerir. İlk koşulda |1·(5)+(−5)|=0; 0<0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(−5)|=65; 65<0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(−5)|=65; 65<0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=501/100 değerini içerir. İlk koşulda |1·(501/100)+(−5)|=1/100; 1/100<0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "En küçük değerin 0 olmasını 0’dan küçük olmak sanma.",
      "check": "x=5 de çözüm değildir."
    },
    {
      "code": "Q19",
      "prompt": "Gerçek x için |x−2|>−1 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "∅",
        "{2}",
        "(−∞, 2)",
        "(2, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−2|>−1 koşulunu sağlamalıdır."
      ],
      "strategy": "Sağ taraf negatifse > koşulu bütün tanımlı iç değerlerde sağlanır.",
      "steps": [
        "Sol taraf ≥0.",
        "0>−1 olduğundan her gerçek x geçerli."
      ],
      "optionReasons": [
        "En küçük sol değer bile −1’den büyük.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−2)|=62; 62>−1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−2)|=62; 62>−1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=2 değerini dışarıda bırakır. İlk koşulda |1·(2)+(−2)|=0; 0>−1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−2)|=62; 62>−1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Negatif sağ taraflı bütün ilişkileri çözüm yok diye genelleme.",
      "check": "x=2’de 0>−1; diğer noktalarda sol daha da büyük."
    },
    {
      "code": "Q20",
      "prompt": "Gerçek x için |x−2|>0 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, 2) ∪ (2, ∞)",
        "ℝ",
        "{2}",
        "∅",
        "[2, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−2|>0 koşulunu sağlamalıdır."
      ],
      "strategy": "Sıfır uzaklığı veren tek noktayı çıkar.",
      "steps": [
        "|x−2|=0 yalnız x=2.",
        ">0 için bu nokta hariç bütün gerçekler."
      ],
      "optionReasons": [
        "İki açık ışın 2’de bir delik bırakır.",
        "Bu seçenek x=2 değerini içerir. İlk koşulda |1·(2)+(−2)|=0; 0>0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−2)|=62; 62>0; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−2)|=62; 62>0; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−2)|=62; 62>0; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "İki ışın var diye hariç noktayı doldurma.",
      "check": "x=1 ve 3 uygun; x=2 uygun değil."
    },
    {
      "code": "Q21",
      "prompt": "Gerçek x için |−2x+1|<5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−2, 3)",
        "[−2, 3]",
        "(−3, 2)",
        "(−∞, −2) ∪ (3, ∞)",
        "(−2, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |−2x+1|<5 koşulunu sağlamalıdır."
      ],
      "strategy": "İki koşulu ayrı çöz; negatif bölmede yönleri değiştir.",
      "steps": [
        "−5<−2x+1<5.",
        "−6<−2x<4.",
        "−2’ye bölünce 3>x>−2, küçükten büyüğe −2<x<3."
      ],
      "optionReasons": [
        "Negatif katsayı aralık uçlarını ters sıraya getirdiği için yeniden sırala.",
        "Bu seçenek x=−2 değerini içerir. İlk koşulda |−2·(−2)+(1)|=5; 5<5; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−299/100 değerini içerir. İlk koşulda |−2·(−299/100)+(1)|=349/50; 349/50<5; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |−2·(−60)+(1)|=121; 121<5; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=3 değerini içerir. İlk koşulda |−2·(3)+(1)|=5; 5<5; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Sınırları büyükten küçüğe aralık diye yazma.",
      "check": "x=0 uygun; iki uçta mutlak değer 5 olur ve hariç."
    },
    {
      "code": "Q22",
      "prompt": "Gerçek x için |x−2|=m−1 denkleminde m=1/2 verilirse kaç farklı çözüm vardır?",
      "options": [
        "0",
        "1",
        "2",
        "3",
        "Sonsuz"
      ],
      "knowledge": [
        "Çözüm sayısı m’nin değil sağ taraf m−1’in işaretine bağlıdır.",
        "Negatif uzaklık olamaz."
      ],
      "strategy": "Önce m−1’i hesapla.",
      "steps": [
        "1/2−1=−1/2.",
        "|x−2|=−1/2 olanaksız; çözüm sayısı 0."
      ],
      "optionReasons": [
        "Sağ taraf negatif olduğu için hiçbir gerçek kök yok.",
        "Tek kök ancak sağ taraf 0 olsaydı gelirdi.",
        "İki kök ancak sağ taraf pozitif olsaydı gelirdi.",
        "Doğrusal iç ifadeli bu pozitif katsayılı yapıda üç kök dalı yok.",
        "x katsayısı 1’dir; sabit özdeşlik durumu değil."
      ],
      "commonError": "Pozitif m gördüğünde sağ tarafın da pozitif olduğunu sanma.",
      "check": "m=1 için bir kök; m=2 için iki kök olur."
    },
    {
      "code": "Q23",
      "prompt": "Gerçek x için |x−2|=0 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{2}",
        "{−2, 2}",
        "∅",
        "ℝ",
        "{0}"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−2|=0 koşulunu sağlamalıdır."
      ],
      "strategy": "İki uzaklık noktası yarıçap 0’da birleşir.",
      "steps": [
        "x−2=0.",
        "Tek x=2; aynı noktayı iki kez sayma."
      ],
      "optionReasons": [
        "Sıfır yarıçap merkezde tek nokta bırakır.",
        "Bu seçenek x=−2 değerini içerir. İlk koşulda |1·(−2)+(−2)|=4; 4=0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=2 değerini dışarıda bırakır. İlk koşulda |1·(2)+(−2)|=0; 0=0; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(−2)|=62; 62=0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=0 değerini içerir. İlk koşulda |1·(0)+(−2)|=2; 2=0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "±0’dan iki farklı kök sayma.",
      "check": "|2−2|=0; |−2−2|=4."
    },
    {
      "code": "Q24",
      "prompt": "Gerçek x için |x−2|=3 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{−1, 5}",
        "{1, 5}",
        "{−3, 3}",
        "{5}",
        "∅"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−2|=3 koşulunu sağlamalıdır."
      ],
      "strategy": "Merkez 2’den iki yöne 3 birim git.",
      "steps": [
        "x−2=3 veya x−2=−3.",
        "x=5 veya x=−1."
      ],
      "optionReasons": [
        "Merkez 2, yarıçap 3; iki kök −1 ve 5.",
        "Bu seçenek x=−1 değerini dışarıda bırakır. İlk koşulda |1·(−1)+(−2)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−3 değerini içerir. İlk koşulda |1·(−3)+(−2)|=5; 5=3; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−1 değerini dışarıda bırakır. İlk koşulda |1·(−1)+(−2)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−1 değerini dışarıda bırakır. İlk koşulda |1·(−1)+(−2)|=3; 3=3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Merkez 2 ile yarıçap 3’ü birbirine karıştırma.",
      "check": "|−1−2|=3 ve |5−2|=3."
    },
    {
      "code": "Q25",
      "prompt": "Gerçek x için |x−1|=|2x+3| denkleminin çözüm kümesi hangisidir?",
      "options": [
        "{−4, −2/3}",
        "{−4}",
        "{−2/3}",
        "{−4, 2/3}",
        "{4, 2/3}"
      ],
      "knowledge": [
        "|A|=|B| için A=B veya A=−B.",
        "İki tarafta da mutlak değer olduğu için kare alma işaret bilgisini kaybettirmez."
      ],
      "strategy": "İki doğrusal kolu ayrı çöz.",
      "steps": [
        "x−1=2x+3 →x=−4.",
        "x−1=−2x−3 →3x=−2 →x=−2/3."
      ],
      "optionReasons": [
        "İki kök de uygun; kollar eşdeğer olduğu için başka kök yok.",
        "Bu seçenek x=−2/3 değerini dışarıda bırakır. İlk koşulda |x−1|=5/3, |2x+3|=5/3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda |x−1|=5, |2x+3|=5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−2/3 değerini dışarıda bırakır. İlk koşulda |x−1|=5/3, |2x+3|=5/3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda |x−1|=5, |2x+3|=5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Negatif ikinci kökün işaretini düşürme.",
      "check": "−4’te iki taraf 5; −2/3’te iki taraf 5/3."
    },
    {
      "code": "Q26",
      "prompt": "Gerçek x için |x|=−1 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "{−1, 1}",
        "{1}",
        "{−1}",
        "ℝ"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x|=−1 koşulunu sağlamalıdır."
      ],
      "strategy": "Kare almadan önce özgün sağ tarafın işaretini koru.",
      "steps": [
        "|x| negatif olamaz.",
        "x²=1’den gelen ±1 adayları ilk eşitlikte 1=−1 verir ve reddedilir."
      ],
      "optionReasons": [
        "Negatif sağ taraf özgün eşitliği olanaksız yapar.",
        "Bu seçenek x=−1 değerini içerir. İlk koşulda |1·(−1)+(0)|=1; 1=−1; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=1 değerini içerir. İlk koşulda |1·(1)+(0)|=1; 1=−1; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−1 değerini içerir. İlk koşulda |1·(−1)+(0)|=1; 1=−1; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(0)|=60; 60=−1; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Karesi eşit adayları özgün eşitliğin çözümü sayma.",
      "check": "Hem x=1 hem x=−1 ilk ifadede yanlıştır."
    },
    {
      "code": "Q27",
      "prompt": "Gerçek x için |x|=x−2 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "{1}",
        "{−1}",
        "[2, ∞)",
        "ℝ"
      ],
      "knowledge": [
        "|A|=B için B≥0 koşulu saklanır.",
        "Kare alma tek başına aday üretebilir."
      ],
      "strategy": "Önce x−2≥0 koşulunu yaz.",
      "steps": [
        "x≥2 gerekir.",
        "Karelerden x²=(x−2)² →x=1 adayı çıkar.",
        "1, x≥2 koşulunu sağlamaz; çözüm yok."
      ],
      "optionReasons": [
        "Karelerden gelen tek adayın özgün sağ tarafı −1’dir ve reddedilir.",
        "Bu seçenek x=1 değerini içerir. İlk koşulda |x|=1, x−2=−1; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−1 değerini içerir. İlk koşulda |x|=1, x−2=−3; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=2 değerini içerir. İlk koşulda |x|=2, x−2=0; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |x|=60, x−2=−62; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Sağ taraf filtresini karesini aldıktan sonra unutma.",
      "check": "x = 1 için sol taraf 1, sağ taraf −1’dir. x ≥ 2 için sol taraf x, sağ taraf x−2 olur ve eşit değillerdir."
    },
    {
      "code": "Q28",
      "prompt": "Gerçek x için |x|=|x| denkleminin çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "{0}",
        "∅",
        "{−1, 1}",
        "[0, ∞)"
      ],
      "knowledge": [
        "Aynı ifadenin kendisine eşitliği bir özdeşliktir.",
        "İki kol açılması daima iki farklı kök demek değildir."
      ],
      "strategy": "İlk doğrusal kolun özdeşlik olduğunu fark et.",
      "steps": [
        "x=x her gerçek x’te doğru.",
        "Bu tek başına bütün gerçekleri çözüme dahil eder."
      ],
      "optionReasons": [
        "Özgün iki taraf her x için aynıdır.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |−60|=|−60|; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |−60|=|−60|; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |−60|=|−60|; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |−60|=|−60|; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "İki kol yöntemini kör biçimde iki kök üretmeye zorlama.",
      "check": "−3,0,7/2 hepsi uygundur."
    },
    {
      "code": "Q29",
      "prompt": "Gerçek x için y=|x−2|−1 grafiğinin tepe noktası ve x eksenini kestiği değerler hangisidir?",
      "options": [
        "Tepe (2, −1); kökler 1 ve 3.",
        "Tepe (−2, −1); kökler −3 ve −1.",
        "Tepe (2, 1); kök yok.",
        "Tepe (2, −1); tek kök 2.",
        "Tepe (1, 2); kökler 0 ve 2."
      ],
      "knowledge": [
        "Tepe için iç ifadeyi 0 yap; kök için y=0 yaz.",
        "Yatay iç işaret ile düşey dış sabit farklı okunur."
      ],
      "strategy": "Tepeyi ve kökleri iki ayrı hesapla.",
      "steps": [
        "x−2=0 →x=2; y=−1.",
        "|x−2|=1 →x=1 veya 3."
      ],
      "optionReasons": [
        "İçi sıfırlayınca (2,−1), y=0 için iki kök 1 ve 3.",
        "İçteki −2 grafiği sağa 2 taşır; sola 2 değil.",
        "Dış sabit −1’dir; +1’e çevrilemez.",
        "x=2’de y=−1; bu tepedir, kök değildir.",
        "Koordinatlar ve kayma miktarları birbirine karışmış."
      ],
      "commonError": "Tepeyi x ekseni köküyle aynı şey sayma.",
      "check": "1 ve 3, tepenin x koordinatı olan 2’ye eşit uzaklıktadır."
    },
    {
      "code": "Q30",
      "prompt": "y=−|x−2|−1 grafiğinin kökleri hakkında hangisi doğrudur?",
      "options": [
        "Gerçek kök yoktur.",
        "1 ve 3’tür.",
        "Yalnız 2’dir.",
        "−1 ve 5’tir.",
        "Her gerçek x köktür."
      ],
      "knowledge": [
        "−|x−2|≤0; dışarıdaki −1 bütün değerleri daha da azaltır.",
        "Dış çarpanı değiştirmek dış toplama sabitini değiştirmez."
      ],
      "strategy": "y=0’da sağlanması gereken mutlak değer koşulunu yaz.",
      "steps": [
        "−|x−2|−1=0 →|x−2|=−1.",
        "Negatif uzaklık olanaksız."
      ],
      "optionReasons": [
        "En büyük yükseklik −1; x eksenine ulaşılamaz.",
        "Bunlar y=|x−2|−1’in kökleridir; dış çarpanı yanlış okur.",
        "2’de y=−1, sıfır değil.",
        "−1 ve 5’te y=−4; sıfır değil.",
        "Fonksiyon sıfır sabiti değildir; daima ≤−1."
      ],
      "commonError": "Dış çarpanı değiştirmeyi bütün fonksiyonu −1 ile çarpmak sanma.",
      "check": "Tepe (2,−1), aşağı açılır."
    },
    {
      "code": "Q31",
      "prompt": "y=|2x−4|−1 grafiğinin kökleri hangisidir?",
      "options": [
        "3/2 ve 5/2",
        "1 ve 3",
        "2 ve −1",
        "−3/2 ve −5/2",
        "Yalnız 2"
      ],
      "knowledge": [
        "İç katsayı 2, merkeze uzaklığı ikiyle ölçekler.",
        "Kök için mutlak değer 1 olmalı."
      ],
      "strategy": "2x−4=±1 iki kolunu çöz.",
      "steps": [
        "2x−4=1 →x=5/2.",
        "2x−4=−1 →x=3/2."
      ],
      "optionReasons": [
        "İki kök 2’nin yarım birim sağında/solunda.",
        "İçteki 2 katsayısı yok sayılmış; bunlar |x−2|−1’in kökleri.",
        "Bu seçenek tepe koordinatlarını kök sanıyor; x = 2 için y = −1’dir.",
        "Negatif bu değerlerde mutlak değer 1 olmaz.",
        "Tepe kök değildir; orada y = −1’dir."
      ],
      "commonError": "Aynı tepeyi aynı grafik sanma.",
      "check": "İki kök arası 1; ölçeklenmemişte 2 idi."
    },
    {
      "code": "Q32",
      "prompt": "Gerçek x için y=|0x−3|−3 fonksiyonunun kök kümesi nedir?",
      "options": [
        "ℝ",
        "{0}",
        "{3}",
        "∅",
        "{−3, 3}"
      ],
      "knowledge": [
        "x katsayısı 0 olduğunda iç ifade sabittir.",
        "|−3|−3=0."
      ],
      "strategy": "V grafiği çizmeden sabit değeri hesapla.",
      "steps": [
        "Her x için y=3−3=0.",
        "x eksenindeki bütün değerler köktür."
      ],
      "optionReasons": [
        "Fonksiyon sıfır yatay doğrusudur; her gerçek x kök.",
        "0 bir kök ama tek değil; x=8 de kök.",
        "3 bir kök ama tek değil; x=−4 de kök.",
        "Her x kök olduğu için boş küme değil.",
        "Yalnız iki nokta almak bütün yatay doğruyu kaybeder."
      ],
      "commonError": "Sıfır katsayıda sahte tepe ve iki kök üretme.",
      "check": "x=−100 ve 100’de de y=0."
    },
    {
      "code": "Q33",
      "prompt": "Gerçek x için |x−2|+|x+1| ifadesinin en küçük değeri ve bu değeri aldığı x kümesi nedir?",
      "options": [
        "3; x∈[−1, 2]",
        "3; yalnız x=1/2",
        "1; x∈[−1, 2]",
        "3; x∈(−1, 2)",
        "0; x=−1 veya 2"
      ],
      "knowledge": [
        "Uç noktalar −1 ve 2’dir.",
        "İki uzaklık toplamı aradaki bütün noktalarda uçlar arası uzaklığa eşittir."
      ],
      "strategy": "Uçları sırala ve aradaki toplamı yaz.",
      "steps": [
        "−1≤x≤2 için (2−x)+(x+1)=3.",
        "Dışarıda toplam, dışarı çıkılan mesafenin 2 katı kadar artar."
      ],
      "optionReasons": [
        "Minimum 3, iki uç dahil aralığın tamamında alınır.",
        "Orta nokta uygundur ama en küçük toplamı veren tek x değeri değildir; x=0 için de toplam 3’tür.",
        "Uçlar arası uzaklık 2−(−1)=3, 1 değil.",
        "İki uç da toplam 3 verir; açık aralık onları haksız çıkarır.",
        "Bir uçta diğer uca uzaklık 3 kaldığı için toplam 0 olmaz."
      ],
      "commonError": "Minimumu yalnız orta noktaya daraltma.",
      "check": "x=−1,0,2’de 3; x=3’te 5."
    },
    {
      "code": "Q34",
      "prompt": "Gerçek x için |x−4|+|x+1| ifadesinin en küçük değeri ve bu değerin alındığı x kümesi hangisidir?",
      "options": [
        "5; x∈[−1, 4]",
        "3; x∈[−1, 4]",
        "5; yalnız x=3/2",
        "5; x∈(−1, 4)",
        "0; x=4"
      ],
      "knowledge": [
        "Uçlar −1 ve 4, aralarındaki uzaklık 5.",
        "Arada toplam sabit, uçlar da dahildir."
      ],
      "strategy": "İki uç arasındaki uzaklığı bul.",
      "steps": [
        "4−(−1)=5.",
        "−1≤x≤4’te (4−x)+(x+1)=5."
      ],
      "optionReasons": [
        "Minimum 5 ve bütün kapalı aralıkta alınır.",
        "Uçlar arasındaki uzaklık 4−(−1) = 5’tir. 3 sayısı, verilen bu uçlara ait değildir.",
        "Orta nokta tek değil; x=0 da minimumu verir.",
        "−1 ve 4 de toplam 5 verir; dışlanamaz.",
        "x=4’te ilk uzaklık 0, ikinci 5; toplam 5."
      ],
      "commonError": "Bir uzaklığın sıfırını toplamın sıfırı sayma.",
      "check": "x=−1 ve 4 iki uç kontrolü 5 verir."
    },
    {
      "code": "Q35",
      "prompt": "Gerçek x için |x−(1)|+|x−(4)|=5 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "{0, 5}",
        "[1, 4]",
        "{0}",
        "{5}",
        "∅"
      ],
      "knowledge": [
        "İki uzaklığın toplamı uçlar arasında |a−b| sabitidir.",
        "Dış aralıklarda işaretlerine göre ayrı doğrusal ifadeler oluşur."
      ],
      "strategy": "1 ve 4 kırılmalarına göre üç aralık incele.",
      "steps": [
        "x<1: (1−x)+(4−x)=5 →x=0, aralığına uygun.",
        "1≤x≤4: toplam 3≠5, çözüm yok.",
        "x>4: (x−1)+(x−4)=5 →x=5, aralığına uygun."
      ],
      "optionReasons": [
        "İki dış dalın birer uygun kökü 0 ve 5; orta dal hedefi sağlamıyor.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 5, hedef 5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=5 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 5, hedef 5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 5, hedef 5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 5, hedef 5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Daldan çıkan kökü kendi aralığına geri koymayı unutma.",
      "check": "0’da 1+4=5; 5’te 4+1=5."
    },
    {
      "code": "Q36",
      "prompt": "Gerçek x için |x−(1)|+|x−(4)|=3 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "[1, 4]",
        "{1, 4}",
        "{5/2}",
        "(1, 4)",
        "∅"
      ],
      "knowledge": [
        "İki uzaklığın toplamı uçlar arasında |a−b| sabitidir.",
        "Dış aralıklarda işaretlerine göre ayrı doğrusal ifadeler oluşur."
      ],
      "strategy": "Hedefin uçlar arası uzaklığa eşit olduğunu gör.",
      "steps": [
        "Uçlar arası uzaklık 4−1=3.",
        "Kapalı [1,4] boyunca toplam 3; dışarıda daha büyük."
      ],
      "optionReasons": [
        "Yalnız uçlar veya orta değil bütün kapalı aralık çözüm.",
        "Bu seçenek x=101/100 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=1 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=1 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=1 değerini dışarıda bırakır. İlk koşulda iki uzaklık toplamı 3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Sabit orta parçayı iki kökle değiştirme.",
      "check": "x=2’de 1+2=3; x=0’da 1+4=5."
    },
    {
      "code": "Q37",
      "prompt": "Gerçek x için ||x|−3|=1 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "{−4, −2, 2, 4}",
        "{−4, 4}",
        "{−2, 2}",
        "{−3, 3}",
        "{0}"
      ],
      "knowledge": [
        "Önce dış mutlak değer, sonra iç uzaklık çözülür.",
        "Negatif iç hedef reddedilir; çakışan kök tek sayılır."
      ],
      "strategy": "Dış katmanı iki kola ayır.",
      "steps": [
        "|x|−3=1 veya −1.",
        "|x|=4 veya 2.",
        "x=−4,−2,2,4."
      ],
      "optionReasons": [
        "İç hedefler 4 ve 2’dir. Her pozitif hedef iki farklı kök verir; bu iki hedefin kökleri çakışmadığı için toplam dört farklı kök vardır.",
        "Bu seçenek x=−2 değerini dışarıda bırakır. İlk koşulda ||x|−3|=1, hedef 1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda ||x|−3|=1, hedef 1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda ||x|−3|=1, hedef 1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini dışarıda bırakır. İlk koşulda ||x|−3|=1, hedef 1; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Bütün çizgileri aynı anda kaldırma.",
      "check": "Her kökte dış uzaklık 1."
    },
    {
      "code": "Q38",
      "prompt": "Gerçek x için ||x|−2|=3 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "{−5, 5}",
        "{−5, −1, 1, 5}",
        "{−1, 1}",
        "{5}",
        "∅"
      ],
      "knowledge": [
        "Önce dış mutlak değer, sonra iç uzaklık çözülür.",
        "Negatif iç hedef reddedilir; çakışan kök tek sayılır."
      ],
      "strategy": "İki iç hedefin işaretini yeniden kontrol et.",
      "steps": [
        "|x|−2=3 veya −3.",
        "|x|=5 veya −1; ikinci kol olanaksız.",
        "Yalnız x=−5 veya 5."
      ],
      "optionReasons": [
        "Negatif iç hedef kök üretmez; iki kök kalır.",
        "Bu seçenek x=−1 değerini içerir. İlk koşulda ||x|−2|=1, hedef 3; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−5 değerini dışarıda bırakır. İlk koşulda ||x|−2|=3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−5 değerini dışarıda bırakır. İlk koşulda ||x|−2|=3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−5 değerini dışarıda bırakır. İlk koşulda ||x|−2|=3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Her dış kolun iki kök vereceğini sanma.",
      "check": "±1’de ||x|−2|=1; 3 değil."
    },
    {
      "code": "Q39",
      "prompt": "Gerçek x için ||x|−3|=3 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "{−6, 0, 6}",
        "{−6, 6}",
        "{−6, −3, 3, 6}",
        "{0}",
        "∅"
      ],
      "knowledge": [
        "Önce dış mutlak değer, sonra iç uzaklık çözülür.",
        "Negatif iç hedef reddedilir; çakışan kök tek sayılır."
      ],
      "strategy": "İç hedef 0’da iki adayın aynı noktaya geldiğini fark et.",
      "steps": [
        "|x|−3=3 veya −3.",
        "|x|=6 veya 0.",
        "Kökler −6,0,6; 0 iki kez sayılmaz."
      ],
      "optionReasons": [
        "Sıfır iç hedef tek kök 0 verdiği için toplam üç farklı kök vardır.",
        "Bu seçenek x=0 değerini dışarıda bırakır. İlk koşulda ||x|−3|=3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−3 değerini içerir. İlk koşulda ||x|−3|=0, hedef 3; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−6 değerini dışarıda bırakır. İlk koşulda ||x|−3|=3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−6 değerini dışarıda bırakır. İlk koşulda ||x|−3|=3, hedef 3; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Tekrarlanan 0’ı iki farklı kök sayma.",
      "check": "0’da |−3|=3; ±6’da |6−3|=3."
    },
    {
      "code": "Q40",
      "prompt": "Gerçek x için |3x−4|=8 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "{−4/3, 4}",
        "{4}",
        "{−4, 4/3}",
        "{−4/3}",
        "∅"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |3x−4|=8 koşulunu sağlamalıdır."
      ],
      "strategy": "Pozitif hedefte iki kol aç.",
      "steps": [
        "3x−4=8 →3x=12 →x=4.",
        "3x−4=−8 →3x=−4 →x=−4/3."
      ],
      "optionReasons": [
        "İki kolun kökleri ilk ifadeyi sağlar; kesirli kök de gerçek sayıdır.",
        "Bu seçenek x=−4/3 değerini dışarıda bırakır. İlk koşulda |3·(−4/3)+(−4)|=8; 8=8; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4 değerini içerir. İlk koşulda |3·(−4)+(−4)|=16; 16=8; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=4 değerini dışarıda bırakır. İlk koşulda |3·(4)+(−4)|=8; 8=8; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−4/3 değerini dışarıda bırakır. İlk koşulda |3·(−4/3)+(−4)|=8; 8=8; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Gerçek sayı sorusunda kesirli kökü reddetme.",
      "check": "3·(−4/3)−4=−8; mutlak değeri 8."
    },
    {
      "code": "Q41",
      "prompt": "Gerçek x için |x+2|≤5 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[−7, 3]",
        "(−7, 3)",
        "[−3, 7]",
        "(−∞, −7] ∪ [3, ∞)",
        "[−7, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x+2|≤5 koşulunu sağlamalıdır."
      ],
      "strategy": "İç aralığı iki eşit sınırla kur.",
      "steps": [
        "−5≤x+2≤5.",
        "2 çıkar: −7≤x≤3."
      ],
      "optionReasons": [
        "İki uçta da uzaklık 5’tir; ≤ ilişkisi nedeniyle ikisi de alınır.",
        "Bu seçenek x=−7 değerini dışarıda bırakır. İlk koşulda |1·(−7)+(2)|=5; 5≤5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−7 değerini dışarıda bırakır. İlk koşulda |1·(−7)+(2)|=5; 5≤5; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(2)|=58; 58≤5; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=301/100 değerini içerir. İlk koşulda |1·(301/100)+(2)|=501/100; 501/100≤5; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "+2’yi taşırken iki uçtan da 2 çıkarmayı unutma.",
      "check": "x=−7 ve 3 sınırları sağlar; x=4 sağlamaz."
    },
    {
      "code": "Q42",
      "prompt": "|7−a|=3 denklemini sağlayan gerçek a değerleri hangisidir?",
      "options": [
        "4 ve 10",
        "−4 ve 10",
        "4 ve −10",
        "Yalnız 4",
        "7 ve 3"
      ],
      "knowledge": [
        "|7−a|, a ile 7 arasındaki uzaklıktır.",
        "Merkez 7’ye iki yönde 3 uzaklık alınır."
      ],
      "strategy": "7−a=±3 kollarını çöz.",
      "steps": [
        "7−a=3 →a=4.",
        "7−a=−3 →a=10."
      ],
      "optionReasons": [
        "4 ve 10’un 7’ye uzaklığı 3.",
        "−4’ün 7’ye uzaklığı 11; eksi işareti yanlış.",
        "−10’un 7’ye uzaklığı 17; ikinci kolun eksi katsayısı unutulmuş.",
        "10 da geçerli köktür; tek kol yetmez.",
        "a = 7 için uzaklık 0, a = 3 için uzaklık 4’tür; ikisi de 3 değildir."
      ],
      "commonError": "−a’yı a’ya çevirirken işaretini korumayı unutma.",
      "check": "|7−4|=3 ve |7−10|=3."
    },
    {
      "code": "Q43",
      "prompt": "y=|x+1|−2 grafiğinin tepe ve kök bilgisi hangisidir?",
      "options": [
        "Tepe (−1, −2); kökler −3 ve 1.",
        "Tepe (1, −2); kökler −1 ve 3.",
        "Tepe (−1, 2); kök yok.",
        "Tepe (−1, −2); yalnız −1 kök.",
        "Tepe (−2, −1); kökler −3 ve −1."
      ],
      "knowledge": [
        "x+1=x−(−1), içi 0 yapan x=−1.",
        "Kök için |x+1|=2."
      ],
      "strategy": "İç işareti merkezden oku.",
      "steps": [
        "Tepe x=−1, y=−2.",
        "x+1=2 veya −2 →x=1 veya −3."
      ],
      "optionReasons": [
        "İçi sıfırlamak ve y=0 koşulu bu bilgiyi verir.",
        "İçteki +1 sola 1 kayar; sağa 1 değil.",
        "Dıştaki −2 yanlışlıkla +2 yapılmış.",
        "x = −1 için y = −2’dir; bu nokta kök değildir.",
        "Koordinatlar kayma miktarlarıyla karışmış."
      ],
      "commonError": "İçteki + işaretini sağa kayma diye okuma.",
      "check": "−3 ve 1 köklerinin, simetri ekseni x = −1’e uzaklıkları 2’dir."
    },
    {
      "code": "Q44",
      "prompt": "Gerçek x için |x+2|<4 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−6, 2)",
        "[−6, 2]",
        "(−2, 6)",
        "(−∞, −6) ∪ (2, ∞)",
        "(−6, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x+2|<4 koşulunu sağlamalıdır."
      ],
      "strategy": "Küçüktür iç bölge; sıkı uçlar hariç.",
      "steps": [
        "−4<x+2<4.",
        "İki taraftan 2 çıkar: −6 < x < 2."
      ],
      "optionReasons": [
        "Açık iç aralık doğru; iki sınırda uzaklık 4 olur.",
        "Bu seçenek x=−6 değerini içerir. İlk koşulda |1·(−6)+(2)|=4; 4<4; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−599/100 değerini dışarıda bırakır. İlk koşulda |1·(−599/100)+(2)|=399/100; 399/100<4; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(2)|=58; 58<4; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=2 değerini içerir. İlk koşulda |1·(2)+(2)|=4; 4<4; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir."
      ],
      "commonError": "Sınırları veya iç/dış bölgeyi ters alma.",
      "check": "x=0 uygun; −6 ve 2 hariç."
    },
    {
      "code": "Q45",
      "prompt": "Gerçek x için |x−1|≥2 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "(−∞, −1] ∪ [3, ∞)",
        "[−1, 3]",
        "(−∞, −1) ∪ (3, ∞)",
        "(−∞, −1]",
        "[3, ∞)"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−1|≥2 koşulunu sağlamalıdır."
      ],
      "strategy": "En az 2 uzaklık iki dış kolu ve uçları alır.",
      "steps": [
        "x−1≤−2 veya x−1≥2.",
        "x≤−1 veya x≥3."
      ],
      "optionReasons": [
        "İki kapalı dış ışın en az 2 uzaklığı verir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−1)|=61; 61≥2; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−1 değerini dışarıda bırakır. İlk koşulda |1·(−1)+(−1)|=2; 2≥2; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=3 değerini dışarıda bırakır. İlk koşulda |1·(3)+(−1)|=2; 2≥2; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−60 değerini dışarıda bırakır. İlk koşulda |1·(−60)+(−1)|=61; 61≥2; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "En az ifadesini sıkı > ilişkisiyle gösterme; eşitlik de kabul edilir.",
      "check": "−1 ve 3 tam sınırda 2 verir."
    },
    {
      "code": "Q46",
      "prompt": "y=|x+3|−1 grafiğinin tepe noktası nedir?",
      "options": [
        "(−3, −1)",
        "(3, −1)",
        "(−3, 1)",
        "(−1, −3)",
        "(0, −1)"
      ],
      "knowledge": [
        "Tepe için içi 0 yap.",
        "Dış sabit, tepenin y koordinatını verir."
      ],
      "strategy": "x+3=0 koşulunu çöz.",
      "steps": [
        "x=−3.",
        "Mutlak değer 0, dışarıdaki −1 ile y=−1."
      ],
      "optionReasons": [
        "−3 içi 0 yapar; yükseklik −1.",
        "İç işaret yanlış yönde okunmuş; x = 3 için |6|−1 = 5’tir.",
        "Dıştaki −1 ters çevrilmiş.",
        "x ve y koordinatları yer değiştirmiş.",
        "x = 0 için iç değer 3, yükseklik 2’dir; burası tepe değildir."
      ],
      "commonError": "İçteki artıyı merkez +3 sanma.",
      "check": "−3’ün iki yanındaki x = −4 ve x = −2 için y = 0’dır."
    },
    {
      "code": "Q47",
      "prompt": "u=2 ve v=−5 için |u+v| ile |u|+|v| sırasıyla kaçtır?",
      "options": [
        "3 ve 7",
        "7 ve 7",
        "−3 ve 7",
        "3 ve −3",
        "−3 ve −7"
      ],
      "knowledge": [
        "Önce içerideki toplam hesaplanır.",
        "Mutlak değerleri ayrı toplamak aynı işlem değildir."
      ],
      "strategy": "İki ifadeyi ayrı hesapla.",
      "steps": [
        "|2+(−5)|=|−3|=3.",
        "|2|+|−5|=2+5=7."
      ],
      "optionReasons": [
        "Ters yönlü sayıların net uzaklığı 3, ayrı uzaklık toplamı 7.",
        "İlk ifadeye yanlış toplam eşitliği uygulanmış.",
        "Mutlak değer sonrası −3 olamaz.",
        "İkinci ifade iki negatif olmayan sayının toplamı 7.",
        "İki sonuç da negatif yazılmış; uzaklık tanımı bozulmuş."
      ],
      "commonError": "|u+v| ile |u|+|v| aynı olmak zorunda değildir.",
      "check": "3≤7, üçgen eşitsizliği doğru."
    },
    {
      "code": "Q48",
      "prompt": "Gerçek x>0 için |3x|+|−2x|−|1+x| hangi ifadeye eşittir?",
      "options": [
        "4x−1",
        "6x−1",
        "4x+1",
        "6x+1",
        "x−1"
      ],
      "knowledge": [
        "x>0 koşulu üç iç ifadenin işaretini belirler.",
        "Dıştaki eksi son ifadenin tamamına dağılır."
      ],
      "strategy": "Üç mutlak değeri koşula göre ayrı aç.",
      "steps": [
        "|3x|=3x, |−2x|=2x, |1+x|=1+x.",
        "3x+2x−(1+x)=4x−1."
      ],
      "optionReasons": [
        "5x−1−x=4x−1; dış eksi iki terime de dağılır.",
        "Son parantezdeki +x terimi çıkarılmak yerine eklenmiş.",
        "Dıştaki −1 yanlışlıkla +1 yapılmış.",
        "Son parantez çıkarılırken hem x teriminin hem 1 sabitinin işareti yanlış dağıtılmış.",
        "x > 0 iken |−2x| = 2x olmalıdır; −x veya −2x olarak alınamaz."
      ],
      "commonError": "Parantez önündeki eksiyi yalnız ilk terime dağıtma.",
      "check": "x=2’de 6+4−3=7; 4·2−1=7."
    },
    {
      "code": "Q49",
      "prompt": "x=1/8 iken |3x|+|−2x|−|1+x| kaçtır?",
      "options": [
        "−1/2",
        "1/2",
        "0",
        "1",
        "3/2"
      ],
      "knowledge": [
        "Mutlak değerlerin her biri ≥0 olsa da çıkarma içeren bütün ifade negatif olabilir.",
        "Bu x, x>0 koşulunu sağlar."
      ],
      "strategy": "Doğrudan kesirlerle veya 4x−1 ile hesapla.",
      "steps": [
        "4·(1/8)−1=1/2−1.",
        "Sonuç −1/2."
      ],
      "optionReasons": [
        "Doğrudan 3/8+2/8−9/8=−4/8=−1/2.",
        "Bütün ifadenin dışına olmayan bir mutlak değer eklenmiş.",
        "1/8, sıfır sonuç veren x=1/4 değil.",
        "4x−1=1/2−1; toplama yapılmıyor.",
        "Son −1 yanlışlıkla +1 yapılırsa 3/2 çıkar."
      ],
      "commonError": "Her terim mutlak değerli diye tüm ifadenin negatif olamayacağını sanma.",
      "check": "−1/2 sonucu x>0 koşuluyla çelişmez."
    },
    {
      "code": "Q50",
      "prompt": "Eksik kapanış çizgisi olan |−20×3−5 ifadesinde sonuç 55 olsun. Çizgi hangi sayıların sağına konulduğunda eşitlik doğrudur?",
      "options": [
        "20 ve 3’ün sağına",
        "Yalnız 3’ün sağına",
        "Yalnız 20’nin sağına",
        "Yalnız 5’in sağına",
        "Hiçbir konumda"
      ],
      "knowledge": [
        "Mutlak değer çizgisinin yeri işlem kapsamını değiştirir.",
        "Verilen üç konumu ayrı hesaplamak gerekir; bu özgün karşılaştırma resmî soru değildir."
      ],
      "strategy": "Her aday kapsamı gerçekten hesapla.",
      "steps": [
        "|−20|×3−5=55.",
        "|−20×3|−5=55.",
        "|−20×3−5|=65."
      ],
      "optionReasons": [
        "İki farklı konum 55 verir; tek doğru konum yok.",
        "20 sonrası da 20×3−5=55 verdiği için yalnız 3 yanlış.",
        "3 sonrası da |−60|−5=55 verdiği için yalnız 20 yanlış.",
        "5 sonrası |−65|=65 verir; 55 değil.",
        "İlk iki konum doğru 55 verir."
      ],
      "commonError": "Tek bir doğru konum olduğunu varsayma; üç kapanışı da işlem önceliğiyle hesapla.",
      "check": "İlk ikisinin aynı sonucu vermesi farklı kapsamları aynı yazım yapmaz."
    },
    {
      "code": "Q51",
      "prompt": "Özgün bir işlem karşılaştırması: |−4+7−6+8−9=2 eşitliğindeki eksik sağ mutlak değer çizgisi hangi sayının hemen sağına konulmalıdır?",
      "options": [
        "6",
        "4",
        "7",
        "8",
        "9"
      ],
      "knowledge": [
        "İçte kalan toplam önce hesaplanır, sonra mutlak değeri alınır.",
        "Bu uygulama sorusu resmî ÖSYM metni değildir."
      ],
      "strategy": "Beş kapanışın sonuçlarını sırayla karşılaştır.",
      "steps": [
        "4 sonrası 4; 7 sonrası −4.",
        "6 sonrası |−3|+8−9=2.",
        "8 sonrası −4; 9 sonrası 4."
      ],
      "optionReasons": [
        "6 sonrasında ilk üç terim |−3| olur; 3+8−9 = 2.",
        "4 sonrası 4+7−6+8−9=4.",
        "7 sonrası |3|−6+8−9=−4.",
        "8 sonrası |5|−9=−4.",
        "9 sonrası |−4|=4."
      ],
      "commonError": "Kapanış çizgisini işlem önceliğini değiştirmeden işaret silme sanma.",
      "check": "Beş sonuç sırasıyla 4, −4, 2, −4 ve 4’tür; yalnız 6 sonrası sonucu 2 yapar."
    },
    {
      "code": "Q52",
      "prompt": "Gerçek x için |x−100|≤2 koşulunun çözüm kümesi hangisidir?",
      "options": [
        "[98, 102]",
        "(98, 102)",
        "[−2, 2]",
        "(−∞, 98] ∪ [102, ∞)",
        "{100}"
      ],
      "knowledge": [
        "Mutlak değer tanımlı gerçek iç ifadenin negatif olmayan uzaklığıdır.",
        "Bu soruda bütün çözüm kümesi |x−100|≤2 koşulunu sağlamalıdır."
      ],
      "strategy": "En çok 2 birim sapma merkez 100 çevresindeki kapalı aralıktır.",
      "steps": [
        "−2≤x−100≤2.",
        "Üç tarafa 100 ekle: 98 ≤ x ≤ 102."
      ],
      "optionReasons": [
        "Hedefe uzaklığı 2 veya daha az bütün değerler; iki sınırda kabul var.",
        "Bu seçenek x=98 değerini dışarıda bırakır. İlk koşulda |1·(98)+(−100)|=2; 2≤2; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir.",
        "Bu seçenek x=−2 değerini içerir. İlk koşulda |1·(−2)+(−100)|=102; 102≤2; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=−60 değerini içerir. İlk koşulda |1·(−60)+(−100)|=160; 160≤2; koşul yanlıştır. Bu yüzden uygun olmayan bir değer eklenir.",
        "Bu seçenek x=98 değerini dışarıda bırakır. İlk koşulda |1·(98)+(−100)|=2; 2≤2; koşul doğrudur. Bu yüzden geçerli bir çözüm kaybedilir."
      ],
      "commonError": "Sapmanın merkezini 0 sanma; en çok ifadesi eşitliği de kabul eder.",
      "check": "98 ve 102 tam sınırda 2; 103 uygun değil."
    },
    {
      "code": "Q53",
      "prompt": "İki nokta −1 ve 2, deneme konumu x=4 olsun. |x+1|+|x−2| toplamı en küçük toplamdan kaç birim büyüktür?",
      "options": [
        "4",
        "2",
        "3",
        "7",
        "0"
      ],
      "knowledge": [
        "En küçük toplam uçlar arası uzaklık 3.",
        "x=4, sağ uç 2’nin 2 birim dışında."
      ],
      "strategy": "Önce gerçek toplamı ve alt sınırı ayrı bul.",
      "steps": [
        "|4+1|+|4−2|=5+2=7.",
        "En küçük 3; fazlalık 7−3=4."
      ],
      "optionReasons": [
        "Dışarı çıkılan 2 birimin iki katı 4 eklenir.",
        "2 yalnız dışarı çıkılan mesafe; iki uzaklığın her biri artar.",
        "3 alt sınırın kendisidir, fazlalık değil.",
        "7 toplamın kendisidir, alt sınır çıkarılmamış.",
        "x=4 iki uç arasında olmadığından minimum alınmaz."
      ],
      "commonError": "Toplam, minimum ve minimumdan farkı birbirine karıştırma.",
      "check": "x=2’de 3; 4’e kadar 2 birim ilerleyince toplam 4 artar."
    },
    {
      "code": "Q54",
      "prompt": "Gerçek x için |x−2|<4 yerine |x−2|≤4 yazılırsa çözüm kümesine yeni hangi değerler eklenir?",
      "options": [
        "−2 ve 6",
        "Yalnız 2",
        "0 ve 4",
        "−4 ve 4",
        "Hiçbir değer eklenmez."
      ],
      "knowledge": [
        "< ilişkisi iç aralığın uçlarını dışlar.",
        "≤ ilişkisi aynı aralığın eşitlik veren uçlarını alır."
      ],
      "strategy": "|x−2|=4 sınırlarını bul.",
      "steps": [
        "x−2=4 veya −4 →x=6 ve −2.",
        "Bu iki değer önce hariç, sonra dahildir; diğer iç değerler zaten çözümdü."
      ],
      "optionReasons": [
        "Merkez 2’nin 4 uzaktaki iki sınırı yeni eklenir.",
        "2, iki koşulda da uzaklığı 0 olduğu için zaten uygundur.",
        "0 ve 4’ün uzaklığı 2; önceden de uygundu.",
        "−4’ün uzaklığı 6; ≤4 yine sağlamaz.",
        "Eşitlik veren iki sınır gerçekten yeni girer."
      ],
      "commonError": "Eşitlik çizgisinin sınır kabulünü değiştirdiğini unutma.",
      "check": "|−2−2|=|6−2|=4."
    },
    {
      "code": "Q55",
      "prompt": "√3 pozitif ve karesi 3 olan gerçek sayı olsun. |−√3| kaçtır?",
      "options": [
        "√3",
        "−√3",
        "3",
        "−3",
        "0"
      ],
      "knowledge": [
        "−√3 negatiftir.",
        "Negatif iç değer −1 ile çarpılarak çıkar."
      ],
      "strategy": "Mutlak değer işlemini kare alma ile karıştırma.",
      "steps": [
        "|−√3|=−1·(−√3).",
        "Sonuç √3."
      ],
      "optionReasons": [
        "Negatif işaret terslenir; büyüklük √3 kalır.",
        "Uzaklığı negatif bırakır.",
        "Mutlak değer karesini almaz; 3 başka sayıdır.",
        "Hem kare alınmış hem negatif uzaklık yazılmış.",
        "İç ifade 0 olmadığından uzaklık 0 değil."
      ],
      "commonError": "Sayı köklü diye uzaklık kuralının değiştiğini sanma.",
      "check": "√3 > 0’dır; iki karşıt konumun 0’a uzaklıkları aynıdır."
    }
  ],
  "sheet": [
    {
      "title": "Uzaklık ve işaret",
      "text": [
        "|x|, x’in 0’a uzaklığıdır: x ≥ 0 ise |x| = x; x < 0 ise |x| = −x. |−7| = 7 ve |0| = 0. −x’in işareti x’e bağlıdır.",
        "|a−b|, a ile b arasındaki uzaklıktır: |7−2| = |2−7| = 5."
      ]
    },
    {
      "title": "Özellikler ve koşulları",
      "text": [
        "|ab| = |a||b|. b ≠ 0 iken |a/b| = |a|/|b|. |u+v| ≤ |u|+|v|; eşitlik, gerçek u ve v için uv ≥ 0 olduğunda sağlanır.",
        "|x²| = x²; genel olarak x’e eşit değildir. |a²+3| = a²+3, |−a²−2| = a²+2 ve |−√3| = √3."
      ]
    },
    {
      "title": "Denklemden önce sağ taraf",
      "text": [
        "|A| = k için önce sağ tarafı denetle: k < 0 ise çözüm yok; k = 0 ise A = 0; k > 0 ise A = k veya A = −k.",
        "|2x+1| = 7 için {−4, 3}; |2x−1| = −3 için ∅. |0x−3| = 3 için ℝ; |0x−3| = 2 için ∅."
      ]
    },
    {
      "title": "İç bölge ve sıfır",
      "text": [
        "|A| < k: k > 0 iken −k < A < k; k ≤ 0 iken ∅. |A| ≤ k: k ≥ 0 iken −k ≤ A ≤ k; k < 0 iken ∅.",
        "|3x−2| < 7 için (−5/3, 3); |4x−3| ≤ 9 için [−3/2, 3]. |x−5| ≤ 0 için {5}; |x−5| < 0 için ∅."
      ]
    },
    {
      "title": "Dış bölge ve uçlar",
      "text": [
        "k ≥ 0 iken |A| > k, A < −k veya A > k demektir. |A| ≥ k, A ≤ −k veya A ≥ k demektir.",
        "k < 0 iken > ve ≥ ilişkileri bütün tanımlı gerçek iç değerlerde doğrudur. |A| > 0 yalnız A ≠ 0 iken; |A| ≥ 0 ise her tanımlı gerçek A için doğrudur.",
        "|2x−1| ≥ 5 için (−∞, −2] ∪ [3, ∞); |2x−3| > 7 için (−∞, −2) ∪ (5, ∞). Sonsuz uçlarda köşeli parantez kullanılmaz."
      ]
    },
    {
      "title": "Parçalı ifade",
      "text": [
        "İç ifadenin sıfır olduğu noktayı bul. |2x−4|, x < 2 iken 4−2x; x ≥ 2 iken 2x−4 olur.",
        "a = 0 iken |ax+b|, |b| sabitidir; değişen bir eşik veya V tepesi yoktur. Katsayı negatif olduğunda, hangi tarafta iç ifadenin negatif olduğunu yeniden denetle."
      ]
    },
    {
      "title": "Grafik, tepe ve kök",
      "text": [
        "y = |x−a|+b için tepe (a, b), simetri ekseni x = a’dır. Kökler |x−a| = −b koşulundan bulunur: b > 0 ise yok; b = 0 ise bir; b < 0 ise iki kök vardır.",
        "y = −|x−a|+b aşağı açılır. Kökler |x−a| = b koşulundan bulunur: b < 0 ise yok; b = 0 ise bir; b > 0 ise iki kök vardır.",
        "y = |x−2|−1 için tepe (2, −1), kökler 1 ve 3. y = |x+1|−2 için tepe (−1, −2), kökler −3 ve 1."
      ]
    },
    {
      "title": "Ölçek ve dış eksi",
      "text": [
        "y = |2x−4|−1 = 2|x−2|−1 için tepe (2, −1), kökler 3/2 ve 5/2; kol eğimleri −2 ve +2’dir.",
        "Yalnız dış çarpanı −1 yapmak, dış toplama sabiti −1’i +1 yapmaz. |0x−3|−3 = 0 sabit fonksiyonunda her gerçek x köktür."
      ]
    },
    {
      "title": "Uzaklık toplamı",
      "text": [
        "a ≤ b iken |x−a|+|x−b| en az b−a olur. Bu değer, iki uç dahil bütün x ∈ [a, b] için alınır. Dışarıda en küçük toplama, dışarı çıkılan mesafenin iki katı eklenir.",
        "|x−2|+|x+1| en az 3’tür ve bu değer bütün [−1, 2] aralığında alınır. |x−4|+|x+1| en az 5’tir ve bu değer bütün [−1, 4] aralığında alınır.",
        "|x−1|+|x−4| = T için: T < 3 ise ∅; T = 3 ise [1, 4]; T > 3 ise iki dış kök vardır. T = 5 için çözüm {0, 5}."
      ]
    },
    {
      "title": "İç içe değer ve parametre",
      "text": [
        "||x|−3| = 1 önce |x| = 4 veya |x| = 2 verir; çözüm {−4, −2, 2, 4}. ||x|−2| = 3 için iç hedefler 5 ve −1’dir; negatif hedef reddedilir, yalnız ±5 kalır.",
        "||x|−3| = 3 için çözüm {−6, 0, 6}; çakışan 0 bir kez sayılır. |x−2| = m−1 için m < 1 ise çözüm yok; m = 1 ise tek x = 2; m > 1 ise iki kök vardır."
      ]
    },
    {
      "title": "İki taraf ve kare koşulu",
      "text": [
        "Tanımlı gerçek A ve B için |A| = |B|, A = B veya A = −B ile eşdeğerdir. |A| > |B|, A² > B² ile eşdeğerdir; gerekçe iki mutlak değerin de negatif olmamasıdır.",
        "|A| = B için B ≥ 0 koşulunu koru. |x| = x−2 için x ≥ 2 gerekir. Karelerden x² = (x−2)², dolayısıyla x = 1 adayı gelir; 1 ≥ 2 yanlış olduğu için özgün çözüm ∅’dir.",
        "|x−1| = |2x+3| için {−4, −2/3}. İki kol yönteminde özdeşlik sonsuz çözüm verebilir; çakışan kökler ise tek kez yazılır."
      ]
    },
    {
      "title": "Tolerans ve yöntem seçimi",
      "text": [
        "Hedef 100, sapma en çok 2 ise |x−100| ≤ 2 ve çözüm [98, 102]. En az r uzaklık dış bölgeyi, en çok r uzaklık iç bölgeyi anlatır; r’nin işaretini de denetle.",
        "Sıra: sağ tarafın işareti, merkez ve yarıçap, ilişki, iç veya dış bölge, uç kabulü, tanım alanı ve özgün ifadede kontrol.",
        "Yakın görünen soruda koşul değişince yöntem de değişebilir. Kısa yolun bütün şartlarını koru."
      ]
    },
    {
      "title": "Seçili OGM işaret örneği",
      "text": [
        "x > 0 iken |3x| = 3x, |−2x| = 2x ve |1+x| = 1+x.",
        "|3x|+|−2x|−|1+x| = 3x+2x−(1+x) = 4x−1. x = 1/8 için −1/2 çıkar; çıkarma içeren bütün ifade negatif olabilir.",
        "OGM görüntüleyici 43 / basılı 121’deki seçili sayfa incelendi; bu, kitabın tamamının okunduğu anlamına gelmez."
      ]
    },
    {
      "title": "Kapsam ve hatırlama",
      "text": [
        "|−20|×3−5 ve |−20×3|−5 ikisi de 55’tir. Bu veriler tek kapanış konumu vermiyor; burada özgün karşılaştırma olarak kullanılır, resmî soru diye sunulmaz.",
        "Farklı sayılarla özgün aktarım: |−4+7−6|+8−9 = 2. Verilen beş sayıdan yalnız 6’nın ardından kapanış yapıldığında sonuç 2’dir.",
        "İlk çalışma günü 1; tekrarlar 3., 7. ve 21. gündür. Not kapalıyken yöntemi gerekçelendir ve yeni bir örneği çöz. Okuma, görsel keşif, süre ve elle onay, ustalık veya XP kanıtı değildir."
      ]
    }
  ],
  "source": "TYT Mutlak Değer kaynak kağıdının 08.11.2026 tarihli güncel 13 sayfalık sürümü 17.11.2026’da metin ve görselleriyle yeniden okundu; bu paket özgün öğretim uyarlamasıdır. Kaynaktaki seçili resmî soru atfı gerçek 2026 TYT kitapçığı fiziksel PDF 26/basılı 24 ve anahtar 45 ile karşılaştırıldı: Matematik 7 resmî anahtarı C, çizgi 5’in sonrasındadır. Kaynağın çarpma verili 55 örneği iki geçerli kapanışa sahiptir; bu örnek resmî soru diye sunulmaz. Seçili OGM görüntüleyici 43/basılı 121’de uzaklık tanımı, parçalı gösterim ve koşullu işaret örnekleri doğrudan incelendi; bütün MEB/OGM kitabı veya bütün geçmiş ÖSYM arşivi tamamlanmış sayılmaz. Resmî soru metni ve şekli yeniden basılmadı."
};
const pack=absoluteValueSource038Pack;
const objectives=["Mutlak değeri uzaklık ve parçalı tanımla açıkla; işaret, sıfır ve tanım alanı koşullarını koru.","Denklem, iç/dış eşitsizlik, parametre ve iç içe yapıda bütün çözümü gerekçelendir; özgün koşulda denetle.","Grafik, iki noktaya uzaklık toplamı ve işlem kapsamını değişen değerlerle ilişkilendir; yakın yanlış yöntemleri karşı örnekle ayır."];
export const absoluteValueSource038Guides:LessonGuide[]=[{id:pack.id,minutes:pack.minutes,source:pack.source,objectives,sections:pack.sections,examples:pack.examples,recall:pack.recall}];
export const absoluteValueSource038Lessons:Lesson[]=[{id:pack.id,title:txt(pack.title),subjectId:"tyt-matematik",minutes:pack.minutes,objectives:objectives.map(txt),source:txt(pack.source),tags:["kaynakli-anlatim","Özgün öğretim soruları"],body:pack.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),questions:pack.items.map((item,index):Question=>{const order=item.options.map((_,i)=>(i+((2*index+1)%5))%5);return{id:`f038-${pack.id}-${index+1}`,prompt:txt(item.prompt),options:order.map(i=>txt(item.options[i])),answer:order.indexOf(0),hint:txt(item.strategy),explanation:txt(item.steps.join(" ")+" Denetim: "+item.check),skill:pack.id,guidance:{knowledge:item.knowledge,strategy:item.strategy,steps:item.steps,optionReasons:order.map(i=>item.optionReasons[i]),commonError:item.commonError,check:item.check}};})}];
export const absoluteValueSource038Sheets:CheatSheet[]=[{topicId:`topic-${pack.id}`,lessonId:pack.id,title:pack.title,subjectId:"tyt-matematik",sections:pack.sheet,cautions:["Sağ tarafın işareti, sıfır katsayı ve tanım alanını iki kol açmadan önce kontrol et.","İç/dış bölgeyi, açık/kapalı sınırı ve parçalı dal koşulunu koru.","Kare alma işaret filtresini silebilir; özgün ifadede denetle ve çakışan kökleri tek say."],examples:[pack.examples[6],pack.examples[9],pack.examples[21]].map(e=>({title:e.title,prompt:e.prompt,steps:e.steps.map(s=>s.explanation),answer:e.answer})),recall:pack.recall.slice(0,4),source:pack.source}];
