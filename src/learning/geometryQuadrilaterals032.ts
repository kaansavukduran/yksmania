import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSection, CheatSheet } from "./cheatsheetContent";
interface QuadrilateralItem032 extends QuestionGuidance {
  prompt: string;
  options: string[];
}
interface QuadrilateralPack032 {
  id: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: QuadrilateralItem032[];
  source: string;
}
// Additional source-based units use separate progress IDs. Exercises are original.
const packs: QuadrilateralPack032[] = [
  {
    id: "tyt-geo-yamuk-deltoid-032",
    title: "Yamuk ve deltoid: taban, yükseklik ve simetri",
    minutes: 48,
    objectives: [
      "Paralel tabanı ve ona dik yüksekliği bul; yamuk tanımının kapsadığı şekilleri ayır.",
      "Orta tabanı, alanı ve köşegen alan ilişkilerini koşullarıyla gerekçelendir.",
      "İkizkenar ve dik yamukta yardımcı dik üçgen kur.",
      "Deltoidde hangi köşegenin diğerini ortaladığını belirle; uzunluk, çevre ve alanı ilişkilendir.",
    ],
    sections: [
      {
        title: "İsimden önce verilen dörtgeni oku",
        paragraphs: [
          "Bu ünitede A, B, C, D köşeleri sınır boyunca sıralanmış, kenarları kesişmeyen dışbükey dörtgenler kullanılır. AB∥CD demek, AB ile CD doğrularının paralel olmasıdır. Bu iki kenara taban, AD ve BC’ye yan kenar denir. Köşegenler ise komşu olmayan köşeleri birleştiren AC ve BD’dir; bir köşegen, yan kenar değildir.",
          "Burada MEBİ’nin kapsayıcı tanımı kullanılır: en az bir çift karşı kenarı paralel olan dörtgen yamuktur. Bu yüzden paralelkenar da bir yamuk çeşididir. Yamuğun iki tabanını seçtikten sonra hangi bağıntının genel yamuğa, hangisinin ek simetri koşuluna dayandığını ayır. Çizimin düzgün görünmesi yeni bir eşitlik vermez.",
        ],
      },
      {
        title: "Paralellik açıları, yükseklik ise alanı belirler",
        paragraphs: [
          "AD doğrusu paralel AB ve CD’yi keser. Bu nedenle A ile D’deki iç açıların toplamı 180°dir; B ile C için de aynı sonuç geçerlidir. A=72° verilirse D=108° bulunur. A ile B’nin eşit olması genel yamuk özelliği değildir.",
          "Yükseklik h, iki paralel taban doğrusu arasındaki dik uzaklıktır. Yan kenar eğikse uzunluğu h’den büyüktür; alan formülündeki h yerine onu yazamazsın. Dikmenin ayağı taban parçasının dışında kalsa bile doğrular arasındaki uzaklık aynıdır. Önce diklik işaretini bul, sonra uzunluğu kullan.",
        ],
      },
      {
        title: "Orta tabanı ortalama olarak kur",
        paragraphs: [
          "E, AD’nin; F, BC’nin orta noktası olsun. EF tabanlara paraleldir ve |EF|=(|AB|+|CD|)/2 olur. Bu doğru parçası yamuğun yüksekliğinin yarısında yer alır. Köşegenle iki üçgene ayırıp üçgenin orta tabanlarını kullanmak, iki yarım tabanın neden toplandığını gösterir.",
          "Uzun taban a, kısa taban c ve a>c olsun. EF üzerindeki köşegen kesişimlerini soldan sağa K ve L diye adlandırırsan |EK|=|LF|=c/2, |KL|=(a−c)/2 olur. Dolayısıyla EF=c/2+(a−c)/2+c/2=(a+c)/2 çıkar. Köşegenlerin kendi orta noktaları arasındaki uzaklık da |a−c|/2’dir; bu uzunluğu orta tabanın tamamıyla karıştırma.",
        ],
      },
      {
        title: "Alan formülünü iki üçgenden çıkar",
        paragraphs: [
          "AC köşegenini çiz. ABC ve ACD üçgenlerinin, sırasıyla AB ve CD tabanlarına ait yükseklikleri aynı h’dir. Alanları ah/2 ve ch/2 olduğundan toplam alan S=(a+c)h/2’dir. Orta taban m=(a+c)/2 ise aynı sonuç S=m·h diye yazılır. Birim uzunluk değil, birimkaredir.",
          "AB∥CD ve E, AD’nin orta noktası ise BEC üçgeninin alanı yamuğun yarısıdır. Bunu üçgen ABD ve BCD’de eş yüksekliğe sahip parçalarla gösterebilirsin. Alt taban üzerindeki bir E noktası için AED ve EBC üçgenlerinin alanları sırasıyla |AE|h/2 ve |EB|h/2’dir. Paylaşılan yüksekliği çizmek, alan oranını şeklin görünüşünden tahmin etmekten güvenlidir.",
        ],
      },
      {
        title: "İkizkenar yamukta simetriyi gerçekten doğrula",
        paragraphs: [
          "Taban uzunlukları farklı olan bir yamukta iki yan kenar eşitse, tabanların orta dikmesi simetri eksenidir. Aynı tabana komşu iki iç açı, köşegenler ve köşegenlerin eksene göre eş parçaları eşittir. Karşı açılar bütünlerdir; bu yamuk çemberseldir. Kapsayıcı yamuk tanımında tabanları eşit paralelkenarda yalnız yan kenar eşliği bu simetriyi kanıtlamaz; böyle bir durumda ayrıca simetri veya taban açı eşliği gerekir.",
          "İki dikme, uzun taban b ile kısa taban a’nın farkını d=(b−a)/2 uzunluğunda iki parçaya böler. Yan kenar ℓ hipotenüstür. ℓ>d ise Pisagor’dan h=√(ℓ²−d²) çıkar. İlk çizimde tabanlar 20 ve 8, yan kenar 10, d=6 ve h=8’dir. İkinci çizimde tabanlar 18 ve 8, yan kenar 13, d=5 ve h=12’dir. Alan (18+8)·12/2=156 birim². Eğik yan kenarı yükseklik kabul edersen 169 bulursun.",
        ],
      },
      {
        title: "Dik yamuk ve dik köşegen koşulunu ayır",
        paragraphs: [
          "Dik yamukta bir yan kenar tabanlara diktir ve yüksekliğe eşittir. Diğer yan kenar, h ve |a−c| dik kenarlı bir üçgenin hipotenüsüdür. Tabanlar 14 ve 5, yükseklik 12 ise eğik kenar √(9²+12²)=15’tir. Bir açının dik olması, köşegenlerin de dik olduğu anlamına gelmez.",
          "AB=a, CD=c, AD=h olan dik yamukta A=(0,0), B=(a,0), D=(0,h), C=(c,h) seç. AC ve BD vektörlerinin skaler çarpımı −ac+h²’dir. Köşegenler ayrıca dikse h²=ac bulunur. Simetrik ikizkenar yamukta dik köşegen koşulu ise h=(a+c)/2 verir; bunun alanı h² olur. İki özel şeklin bağıntılarını birbirinin yerine kullanma.",
        ],
      },
      {
        title: "Köşegen kesişiminden oran ve alan çıkar",
        paragraphs: [
          "AB∥CD, |AB|=a, |CD|=c ve köşegenlerin kesişimi O olsun. AOB ile COD üçgenleri ters ve iç ters açılardan benzerdir. Buna göre AO/OC=BO/OD=a/c, alanlarının oranı ise a²/c² olur. Uzunluk oranını doğrudan alan oranı olarak kullanma.",
          "COD’nin alanına S₁, COB’ninkine S₂, AOB’ninkine S₃, AOD’ninkine S₄ de. Aynı taban ve yükseklik ilişkilerinden S₂=S₄ ve S₂·S₄=S₁·S₃ bulunur. S₁=9 ve S₃=25 ise iki yan alan √(9·25)=15, toplam alan 64’tür. Buradaki harfler köşe sırasına ve tanımlanan üçgenlere bağlıdır; şekilsiz bir soruda önce hangi bölgenin adlandırıldığını oku.",
        ],
      },
      {
        title: "Deltoidin simetri köşegenini eş kenarlardan bul",
        paragraphs: [
          "AB=AD ve CB=CD olan dışbükey ABCD dörtgeninde A ile C, B ve D’ye eşit uzaklıktadır. Bu nedenle AC doğrusu BD’nin orta dikmesidir. AC ile BD dik kesişir; kesişim K ise BK=DK olur. ABC ve ADC eş üçgenlerinden AC’nin A ve C açılarını ortaladığı, B ve D açılarının eşit olduğu da çıkar.",
          "Genel deltoidde AC’nin BD’yi ortalaması, BD’nin de AC’yi ortaladığı anlamına gelmez. AK ile KC farklı olabilir. İki köşegenin birbirini ortalaması ek olarak varsa şekil eşkenar dörtgene dönüşür. Deltoidin bütün kenarları ya da köşegenleri eşit diye varsayma; hangi komşu kenar çiftinin eş olduğunu işaretle.",
        ],
      },
      {
        title: "Deltoidde alanı dört dik üçgenle tamamla",
        paragraphs: [
          "AC=e, BD=f ve köşegenler dik olduğundan dört küçük üçgenin alanları toplamı S=ef/2’dir. AB=AD=u, BC=CD=v ise çevre 2(u+v)’dir. Alan için iki köşegenin tamamı gerekir; sadece yarım BD’yi kullanırsan sonucu yarıya düşürürsün.",
          "BK=DK=f/2 olduğunda ABK ile CBK dik üçgenlerinde AK²=u²−(f/2)² ve CK²=v²−(f/2)² yazılır. Dışbükeylikte K iki köşegenin içindedir; AC=AK+KC olur. u=13, v=15, f=24 için AK=5, KC=9 ve AC=14 bulunur. Alan 168, çevre 56’dır; AK=KC dayatmak iki ayrı kenar verisini bozar.",
        ],
      },
      {
        title: "Soruda işe yarayan yardımcı çizgiyi seç",
        paragraphs: [
          "Yamukta önce tabanları işaretle. Açı aranıyorsa paralellik, uzunluk aranıyorsa uygun dikmeler veya orta taban, alan aranıyorsa ortak taban/yükseklik genellikle hesabı kısaltır. Deltoidde ise simetri köşegeniyle başla; yarım köşegen ve bir kenar dik üçgen kuruyorsa Pisagor kullan. Yardımcı çizginin neden çizildiğini bir cümleyle söyle.",
          "Sonucu bulduğunda bütün başlangıç koşullarına geri dön: bir kenar hipotenüsten uzun mu, karekök içi pozitif mi, alan birimi doğru mu, özel bağıntı için gerekli diklik veya simetri verilmiş mi? Denetim başka bir formülle de yapılabiliyorsa yap. Bir ezber formülü seçmekten çok, formülün hangi koşulda çalıştığını bilmek benzer sorulara aktarımı sağlar.",
        ],
      },
    ],
    examples: [
      {
        title: "Orta taban ile alanı birlikte kullan",
        prompt:
          "Tabanları 8 ve 14 birim, yüksekliği 5 birim olan yamuğun orta tabanı ve alanı nedir?",
        strategy: "Önce ortalama tabanı bul, sonra bunu yükseklikle çarp.",
        steps: [
          {
            label: "Tabanları eşleştir",
            explanation: "İki paralel kenarın toplamı 8+14=22’dir.",
          },
          {
            label: "Ortalama al",
            explanation: "Orta taban m=22/2=11 birimdir.",
          },
          {
            label: "Alanı denetle",
            explanation: "S=m·h=11·5=55 birimkaredir; ayrıca 8·5/2+14·5/2=55.",
          },
        ],
        answer: "Orta taban 11 birim; alan 55 birimkare.",
        check:
          "Alan, tabanı 11 ve yüksekliği 5 olan dikdörtgenin alanıyla aynıdır.",
        pitfall: "Tabanların toplamını ikiye bölmeden yükseklikle çarpma.",
      },
      {
        title: "İkizkenar yamukta yükseklik",
        prompt:
          "Tabanları 8 ve 20, eş yan kenarları 10 birim olan ikizkenar yamuğun alanı kaçtır?",
        strategy:
          "Simetriden yatay farkı ikiye böl; yüksekliği Pisagor’la bul.",
        steps: [
          {
            label: "Dikme indir",
            explanation:
              "Taban farkı 20−8=12, bir yandaki yatay parça 12/2=6’dır.",
          },
          {
            label: "Yüksekliği bul",
            explanation: "h²=10²−6²=64; h=8 birimdir.",
          },
          {
            label: "Alanı hesapla",
            explanation: "Orta taban 14 olduğundan S=14·8=112 birimkaredir.",
          },
        ],
        answer: "112 birimkare.",
        check: "h=8 yan kenar 10’dan küçüktür; 6²+8²=10².",
        pitfall: "Taban farkının tamamını bir dik üçgenin kenarı alma.",
      },
      {
        title: "Köşegenlerin dört alanı",
        prompt:
          "AB∥CD olan ABCD yamuğunda AC ve BD, O’da kesişiyor. COD’nin alanı 9, AOB’nin alanı 25 birimkaredir. Toplam alan kaçtır?",
        strategy: "Önce eş iki yan alanı, sonra toplamı bul.",
        steps: [
          {
            label: "Benzerliği kur",
            explanation:
              "AOB ve COD üçgenleri benzerdir; alan oranı 25/9, uzunluk oranı 5/3’tür.",
          },
          {
            label: "Yan alanı belirle",
            explanation:
              "COB ve AOD alanları eşittir; her biri √(9·25)=15 olur.",
          },
          {
            label: "Bölgeleri topla",
            explanation: "9+15+25+15=64 birimkare bulunur.",
          },
        ],
        answer: "64 birimkare.",
        check:
          "İki yan alanın çarpımı 225, diğer iki alanın çarpımı da 225’tir.",
        pitfall:
          "9 ile 25’in aritmetik ortalaması olan 17’yi kullanma; gereken geometrik ortalamadır.",
      },
      {
        title: "Deltoidde yarım köşegenle çöz",
        prompt:
          "Dışbükey ABCD deltoidinde AB=AD=13, CB=CD=15 ve BD=24 birimdir. Alan kaçtır?",
        strategy: "AC’nin BD’yi dik ortalamasından iki dik üçgen kur.",
        steps: [
          {
            label: "Simetriyi kullan",
            explanation: "K=AC∩BD için BK=DK=12 olur.",
          },
          {
            label: "İki yüksekliği bul",
            explanation: "AK=√(13²−12²)=5; CK=√(15²−12²)=9. AC=14 olur.",
          },
          {
            label: "Alanı hesapla",
            explanation: "S=AC·BD/2=14·24/2=168 birimkaredir.",
          },
        ],
        answer: "168 birimkare.",
        check: "5²+12²=13² ve 9²+12²=15² sağlanır; çevre ayrıca 56’dır.",
        pitfall: "K’nin AC’yi de ortaladığını varsayma.",
      },
    ],
    recall: [
      {
        prompt:
          "Yan kenar uzunluğu neden genel yamuk alanında yükseklik yerine kullanılamaz?",
        answer:
          "Yükseklik paralel taban doğruları arasındaki dik uzaklıktır. Eğik yan kenar bu dik uzaklık değildir.",
      },
      {
        prompt: "Kapsayıcı yamuk tanımında her paralelkenar yamuk mudur?",
        answer:
          "Evet. En az bir çift karşı kenarın paralel olması yeterlidir; paralelkenarda iki çift de paraleldir.",
      },
      {
        prompt:
          "AC simetri köşegenli genel deltoidde hangi orta nokta bilgisi zorunludur?",
        answer:
          "AC, BD’yi ortalar: BK=DK. BD’nin AC’yi ortalaması zorunlu değildir.",
      },
      {
        prompt:
          "Yamuğun taban uzunlukları oranı 3/2 ise tabanlara komşu benzer köşegen üçgenlerinin alan oranı nedir?",
        answer: "Alan oranı uzunluk oranının karesidir: 9/4.",
      },
      {
        prompt:
          "İkizkenar yamukta taban farkını yüksekliği bulurken neden ikiye bölersin?",
        answer:
          "Tabanlar farklıyken eş yan kenarların simetrisi, dikmelerin ayırdığı iki yatay parçayı eşit yapar.",
      },
    ],
    items: [
      {
        prompt:
          "Paralel tabanları 8 ve 14 birim, yüksekliği 5 birim olan yamuğun alanı kaç birimkaredir?",
        options: ["55", "110", "35", "20", "27,5"],
        knowledge: [
          "Yamuk alanı iki paralel tabanın toplamı ile dik yüksekliğin çarpımının yarısıdır.",
        ],
        strategy: "Önce iki tabanı topla, sonra yükseklikle çarpıp ikiye böl.",
        steps: [
          "Taban toplamı 8+14=22.",
          "S=22·5/2 yazılır.",
          "S=55 birimkare; iki üçgen alanı 20+35 ile doğrulanır.",
        ],
        optionReasons: [
          "22·5/2=55 olduğu için doğrudur.",
          "110, toplam tabanı yükseklikle çarpıp ikiye bölmemektir.",
          "35 yalnız 14 tabanlı üçgenin alanıdır.",
          "20 yalnız 8 tabanlı üçgenin alanıdır.",
          "27,5 doğru alanı bir kez daha ikiye bölmektir.",
        ],
        commonError:
          "Eğik kenarı yükseklik sanma; soruda yükseklik açık verilmiştir.",
        check: "8·5/2+14·5/2=55.",
      },
      {
        prompt:
          "Bir yamuğun paralel tabanları 5 ve 13 birimdir. Yan kenarlarının orta noktalarını birleştiren parçanın uzunluğu kaç birimdir?",
        options: ["9", "18", "8", "4", "6,5"],
        knowledge: ["Yamuğun orta tabanı iki tabanın aritmetik ortalamasıdır."],
        strategy: "Orta noktaları birleştiren parçayı orta taban olarak tanı.",
        steps: [
          "Taban toplamı 5+13=18.",
          "Orta taban 18/2’dir.",
          "Sonuç 9 birimdir; 5 ile 13 arasında bulunur.",
        ],
        optionReasons: [
          "(5+13)/2=9, iki tabanın aritmetik ortalamasıdır.",
          "18, ortalama almadan tabanları toplamaktır.",
          "8 yalnız iki tabanın farkıdır; orta tabanın uzunluğu değildir.",
          "4, köşegen orta noktaları arasındaki uzaklıktır; orta tabanın tamamı değildir.",
          "6,5 yalnız uzun tabanın yarısıdır.",
        ],
        commonError: "Orta taban ile taban farkının yarısını karıştırma.",
        check: "9, iki tabanın arasında ve ikisine eşit uzaklıktadır.",
      },
      {
        prompt:
          "Dışbükey ABCD yamuğunda AB∥CD ve A köşesindeki iç açı 78°dir. D köşesindeki iç açı kaç derecedir?",
        options: ["102°", "78°", "12°", "156°", "180°"],
        knowledge: [
          "Bir yan kenar üzerinde paraleller arasındaki iki iç açı bütünlerdir.",
        ],
        strategy: "AD kesenini ve A ile D arasındaki iç açı çiftini belirle.",
        steps: [
          "AD doğrusu AB ve CD paralellerini keser.",
          "A+D=180° olduğundan D=180°−78°.",
          "D=102°; 78°+102°=180° sağlanır.",
        ],
        optionReasons: [
          "102°, aynı yan kenardaki iç açıları 180°ye tamamlar.",
          "78° A’nın açısıdır; D de 78° olsaydı aynı yan kenardaki toplam 156° olur ve paralellik koşulu bozulurdu.",
          "12°, yanlışlıkla 90°ye tamamlamaktır.",
          "156°, verilen açıyı ikiyle çarpmaktır.",
          "180° tek köşenin açısı olursa dörtgen bozulur.",
        ],
        commonError: "A ile D’yi ters açı sanıp eşitleme.",
        check: "Dışbükey köşenin açısı 0° ile 180° arasındadır.",
      },
      {
        prompt:
          "Taban uzunlukları 8 ve 20, eş yan kenarları 10 birim olan ikizkenar yamuğun yüksekliği kaç birimdir?",
        options: ["8", "6", "12", "16", "4"],
        knowledge: [
          "Farklı tabanlı ikizkenar yamukta yatay taşmalar taban farkının yarısıdır.",
        ],
        strategy: "Kısa tabanın uçlarından uzun tabana dik indir.",
        steps: [
          "Her yatay parça (20−8)/2=6.",
          "Dik üçgende h²=10²−6²=64.",
          "Pozitif yükseklik h=8 bulunur.",
        ],
        optionReasons: [
          "8; 6²+8²=10² koşulunu sağlar.",
          "6 yatay taşmadır, yükseklik değildir.",
          "12 taban farkının tamamıdır; hipotenüs 10’dan da büyüktür.",
          "16, h²=64 denkleminden hatalı kök almaktır.",
          "4, yarım taban 8/2 ile yüksekliği karıştırmaktır.",
        ],
        commonError: "12’lik farkı tek tarafa yerleştirme.",
        check: "Yükseklik 10’dan küçük, alan 14·8=112 olmalıdır.",
      },
      {
        prompt:
          "Dik yamuğun paralel tabanları 5 ve 14 birim, tabanlara dik yan kenarı 12 birimdir. Diğer yan kenar kaç birimdir?",
        options: ["15", "9", "12", "21", "√193"],
        knowledge: [
          "Dik yamukta eğik yan kenar; yükseklik ve taban farkının oluşturduğu dik üçgenin hipotenüsüdür.",
        ],
        strategy: "Taban farkını yatay, yüksekliği düşey dik kenar al.",
        steps: [
          "Yatay fark 14−5=9.",
          "Eğik kenarın karesi 9²+12²=225.",
          "Pozitif uzunluk √225=15 birimdir.",
        ],
        optionReasons: [
          "15, 9–12–15 dik üçgeninin hipotenüsüdür.",
          "9 yalnız taban farkıdır; eğik kenarın uzunluğu değildir.",
          "12 dik yan kenardır, diğer kenar daha uzundur.",
          "21 dik kenarları toplamaktır; hipotenüs bu toplamdan küçüktür.",
          "√193, 12²+7² hesabıdır; yatay fark 7 değil 9’dur.",
        ],
        commonError:
          "İkizkenar yamuğa ait farkı ikiye bölme adımını dik yamuğa aktarma.",
        check: "15²=9²+12²=225.",
      },
      {
        prompt:
          "AB∥CD, AD⊥AB, |AB|=4 ve |CD|=9 olan dışbükey ABCD dik yamuğunda AC⊥BD de veriliyor. Yükseklik kaç birimdir?",
        options: ["6", "13", "√13", "18", "3"],
        knowledge: ["Dik yamukta köşegenler ayrıca dikse h²=|AB|·|CD| olur."],
        strategy:
          "Taban uzunluklarının çarpımını yükseklik karesiyle ilişkilendir.",
        steps: [
          "A=(0,0), B=(4,0), D=(0,h), C=(9,h) seçilebilir.",
          "AC·BD=9·(−4)+h²=0 olduğundan h²=36.",
          "Yükseklik pozitif olduğundan h=6.",
        ],
        optionReasons: [
          "6 doğrudur; 6²=4·9=36 ile diklik koşulunu sağlar.",
          "13 tabanların toplamıdır, yükseklik bağıntısı değildir.",
          "√13, çarpım yerine toplamın kökünü almaktır.",
          "18, 36’yı karekök yerine ikiye bölmektir.",
          "3 yalnız bir tabanın kareköküdür.",
        ],
        commonError:
          "Yalnız dik yamuk olması h²=ac için yetmez; köşegenlerin dikliği de gereklidir.",
        check: "Skaler çarpım −36+36=0 olur.",
      },
      {
        prompt:
          "Tabanları 6 ve 14 birim olan simetrik ikizkenar yamuğun köşegenleri diktir. Alanı kaç birimkaredir?",
        options: ["100", "50", "84", "200", "64"],
        knowledge: [
          "Simetrik ikizkenar yamukta dik köşegenler varsa yükseklik tabanların yarı toplamına eşittir.",
        ],
        strategy: "Orta tabanı ve yüksekliği aynı değer olarak bul.",
        steps: [
          "Orta taban m=(6+14)/2=10.",
          "Dik köşegen koşulundan h=10.",
          "Alan S=m·h=100 birimkaredir.",
        ],
        optionReasons: [
          "100, m=h=10 ile bulunan alandır.",
          "50, orta tabanı bulduktan sonra alanı gereksiz yere ikiye bölmektir.",
          "84 yalnız iki tabanın çarpımıdır.",
          "200 taban toplamını yükseklikle çarpıp ikiye bölmemektir.",
          "64 taban farkının karesidir.",
        ],
        commonError:
          "Dik yamuğun h²=ac bağıntısını simetrik ikizkenar şekle uygulama.",
        check: "Aynı sonuç (6+14)·10/2=100 ile elde edilir.",
      },
      {
        prompt:
          "AB∥CD olan dışbükey ABCD yamuğunda |AB|=15, |CD|=9 ve AC ile BD’nin kesişimi O’dur. |AO|=10 ise |OC| kaç birimdir?",
        options: ["6", "15", "5,4", "16", "24"],
        knowledge: ["AOB ve COD benzer üçgenlerdir; AO/OC=AB/CD olur."],
        strategy:
          "Aynı köşegende uzun tabana komşu parçayı doğru orana yerleştir.",
        steps: [
          "AO/OC=15/9=5/3.",
          "10/OC=5/3 denklemi 5·OC=30 verir.",
          "OC=6; AC toplamı 16 olur.",
        ],
        optionReasons: [
          "6; 10/6=15/9 oranını sağlar.",
          "15 taban uzunluğudur; köşegen parçası değildir.",
          "5,4, yanlışlıkla 9²/15 hesabından elde edilir; 10 verisini kullanmaz.",
          "16 köşegenin tamamıdır, OC değildir.",
          "24 uzunluk oranını ters kurmakla da elde edilmez; 10/24 taban oranına eşit değildir.",
        ],
        commonError: "AO ile AC’nin tamamını aynı şey sanma.",
        check: "10/6=5/3 ve 15/9=5/3.",
      },
      {
        prompt:
          "AB∥CD olan dışbükey ABCD yamuğunda köşegenler O’da kesişiyor. COD üçgeninin alanı 9, AOB üçgeninin alanı 25 birimkaredir. Yamuğun alanı kaç birimkaredir?",
        options: ["64", "34", "68", "49", "225"],
        knowledge: [
          "Yamuk köşegenlerinin oluşturduğu yan iki üçgenin alanları eşit ve çarpımları tabanlara komşu iki üçgenin alanları çarpımına eşittir.",
        ],
        strategy: "İki yan alanın ortak değerini geometrik ortalamayla bul.",
        steps: [
          "Yan alanın karesi 9·25=225.",
          "Alan pozitif olduğundan her yan bölge 15.",
          "Toplam 9+15+25+15=64 birimkare.",
        ],
        optionReasons: [
          "64, dört bölgenin toplamıdır.",
          "34 yalnız verilen iki bölgeyi toplamaktır.",
          "68, yan bölgelerin her birini yanlışlıkla (9+25)/2=17 almaktır.",
          "49 verilenlere yalnız bir yan bölge eklemektir.",
          "225 alanların çarpımıdır, toplam alan değildir.",
        ],
        commonError:
          "Uzunluk oranının karesini alan oranında kullan; aritmetik ortalama alma.",
        check: "15·15=9·25; bütün dört alan pozitiftir.",
      },
      {
        prompt:
          "Dışbükey ABCD deltoidinde AB=AD, CB=CD, |AC|=12 ve |BD|=10 birimdir. Alan kaç birimkaredir?",
        options: ["60", "120", "30", "22", "44"],
        knowledge: [
          "Eş komşu kenar çiftlerini birleştiren AC, BD’ye diktir. Dik köşegenli dörtgende S=AC·BD/2 olur.",
        ],
        strategy: "Köşegenlerin tamamını çarpıp ikiye böl.",
        steps: [
          "AC simetri köşegenidir; AC⊥BD.",
          "S=12·10/2 yazılır.",
          "S=60 birimkare bulunur.",
        ],
        optionReasons: [
          "60, dik köşegen alan bağıntısını sağlar.",
          "120 çarpımı ikiye bölmemektir.",
          "30 köşegenlerden birini ayrıca yarıya indirip alanı bir daha yarılamaktır.",
          "22 köşegen toplamıdır ve alan birimi vermez.",
          "44 köşegen toplamının iki katıdır; deltoid çevresi de bu verilerden böyle bulunmaz.",
        ],
        commonError: "Köşegenleri kenar sanıp çevre formülü kullanma.",
        check: "Dört küçük dik üçgenin alanları toplamı da 12·10/2’dir.",
      },
      {
        prompt:
          "Dışbükey ABCD deltoidinde AB=AD=13, CB=CD=15 ve BD=24 birimdir. Alan kaç birimkaredir?",
        options: ["168", "336", "156", "180", "56"],
        knowledge: [
          "AC, BD’yi dik ortalar; iki kenarla kurulan dik üçgenler AC’nin farklı parçalarını verir.",
        ],
        strategy: "Yarım BD ile iki ayrı Pisagor hesabı yap.",
        steps: [
          "K=AC∩BD için BK=DK=12.",
          "AK=√(169−144)=5 ve CK=√(225−144)=9; AC=14.",
          "S=14·24/2=168 birimkare.",
        ],
        optionReasons: [
          "168, gerçek iki köşegenin yarı çarpımıdır.",
          "336, köşegen çarpımını ikiye bölmemektir.",
          "156, AC yerine 13 kenarını kullanmaktır.",
          "180, AC yerine 15 kenarını kullanmaktır.",
          "56 çevredir: 2(13+15); alan değildir.",
        ],
        commonError:
          "BD’nin AC’yi de ortaladığı varsayımıyla iki yüksekliği eşitleme.",
        check: "5–12–13 ve 9–12–15 üçgenleri bütün verilen kenarları sağlar.",
      },
      {
        prompt:
          "Dışbükey ABCD deltoidinde AB=AD, CB=CD ve AC ile BD, K’da kesişiyor. Ek koşul verilmeden hangisi kesinlikle doğrudur?",
        options: [
          "BK=DK",
          "AK=CK",
          "AC=BD",
          "AB=BC",
          "A ve B iç açıları eşittir",
        ],
        knowledge: [
          "AC, B ve D’ye eşit uzaklıktaki A ve C’den geçtiği için BD’nin orta dikmesidir.",
        ],
        strategy: "Eş komşu kenar çiftlerinin ortak köşelerini birleştir.",
        steps: [
          "AB=AD nedeniyle A, BD’nin orta dikmesindedir.",
          "CB=CD nedeniyle C de aynı orta dikmededir.",
          "AC doğrusu BD’yi K’da dik ortalar; BK=DK kesin olur.",
        ],
        optionReasons: [
          "BK=DK, AC’nin simetri köşegeni olmasının sonucudur.",
          "AK=CK genel deltoidde zorunlu değildir; bu ek koşul eşkenar dörtgene götürür.",
          "Köşegenler genel deltoidde eşit olmak zorunda değildir.",
          "AB ile BC iki farklı eş kenar çiftine aittir; eşitlik verilmemiştir.",
          "Zorunlu eş açı çifti B ile D’dir; A ile B değildir.",
        ],
        commonError:
          "Bir köşegenin diğerini ortalamasını karşılıklı ortalama sanma.",
        check:
          "AB=AD=13, CB=CD=15, BD=24 örneğinde AK=5, CK=9 olup yalnız BK=DK zorunludur.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri: basılı 141–143 ve 151; Aurelia TYT Geometri Tüm Konular ve Formüller: yamuk/deltoid özeti ile Yamuk PDF fiziksel 2 ve 5 (G1) karşılaştırılmış özgün anlatım ve sorular. Kaynağın bütün PDF kapsamı değildir.",
  },
  {
    id: "tyt-geo-paralelkenar-ozel-dortgenler-032",
    title: "Paralelkenar ailesi: yükseklik, köşegen ve alan",
    minutes: 52,
    objectives: [
      "Paralelkenarın zorunlu özelliklerini özel dörtgenlerin ek koşullarından ayır.",
      "Taban ve ona ait yüksekliği eşleştir; alan parçalamalarını gerekçelendir.",
      "Dikdörtgen, eşkenar dörtgen ve karede köşegenlerden uzunluk ve alan bul.",
      "Çevre, alan, iç ve çevrel yarıçapın farklı nicelikler olduğunu denetle.",
    ],
    sections: [
      {
        title: "Paralelkenarı iki çift paralellikle tanı",
        paragraphs: [
          "Dışbükey ABCD dörtgeninde AB∥DC ve AD∥BC ise şekil paralelkenardır. AC köşegenini çizince iç ters açılar ve ortak kenar iki eş üçgen oluşturur. Böylece karşı kenarların uzunlukları ve karşı köşelerin açıları eşittir. Bir çift karşı kenarın yalnız eşit olması tek başına yeterli değildir; aynı çift ayrıca paralelse paralelkenar sonucu çıkarılabilir.",
          "Bir köşenin açısı α ise komşusu 180°−α, karşısı yine α’dır. Ardışık açılar bütünlerdir; dört açının toplamı 360° olur. Bu eşitlikler bütün açıların 90° olduğunu söylemez. Çizimi döndürmek veya paralel doğrular boyunca kaydırmak, verilen koşulları değiştirmez.",
        ],
      },
      {
        title: "Köşegenlerin kesişimi ile orta noktayı ayır",
        paragraphs: [
          "Paralelkenarda köşegenlerin kesişimi O ise AO=OC ve BO=OD olur. İki köşegen birbirini ortalar; ancak AO ile BO’nun eşit olması gerekmez. Ters yönde de dışbükey bir dörtgende köşegenler birbirini ortalıyorsa dörtgen paralelkenardır. Nokta adları köşegen parçalarının hangi bütüne ait olduğunu belirler.",
          "Genel paralelkenarın köşegenleri eşit, dik veya açıortay olmak zorunda değildir. Eş köşegen ek koşulu dikdörtgene, dik köşegen ek koşulu eşkenar dörtgene götürür. İki koşul birlikte varsa kare elde edilir. Sadece bir resimde çizgiler dik görünüyorsa bu çıkarımları yapamazsın; diklik işareti ya da yazılı koşul gerekir.",
        ],
      },
      {
        title: "Açıortaylar neden dik olur?",
        paragraphs: [
          "Komşu A ve B iç açılarının toplamı 180°dir. İç açıortayların ilgili açı parçaları α/2 ve (180°−α)/2 olup toplamları 90°dir. Açıortayların kesiştiği üçgende kalan açı da 90° olduğundan iki açıortay diktir. Bu sonuç köşegenlerin dikliği değildir; hangi doğru parçalarının açıortay olduğuna dikkat et.",
          "Paralelkenarda bir köşenin açıortayı karşı kenarı kesiyorsa, paralellerle taşınan eş açılardan ikizkenar bir üçgen oluşabilir. Önce eş açıların yerini göster, sonra karşılarındaki kenarları eşitle. Açıortay uzunluğu veya kestiği nokta için yalnız şeklin ortasında görünmesine dayanma; orta nokta ayrıca kanıtlanır.",
        ],
      },
      {
        title: "Alanı taban ve dik uzaklıkla kur",
        paragraphs: [
          "AB=a ve DC doğrusunun AB’ye dik uzaklığı hₐ ise S=a·hₐ’dır. Eğik bir köşeden yükseklik indirip kenardaki dik üçgeni öteki tarafa taşıdığında aynı taban ve yüksekliğe sahip bir dikdörtgen oluşur. Bu parçalama alanın neden taban çarpı yükseklik olduğunu açıklar. Kenar b eğikse b yerine yüksekliği bulmak gerekir.",
          "Komşu kenarlar a ve b, aralarındaki açı α ise hₐ=b·sinα, S=ab·sinα ve a·hₐ=b·hᵦ olur. 30° için hₐ=b/2’dir. Koordinat adımında A(1; 1), B(7; 1) ve D(3; 5) verilir. AB ile DC aynı yönlü olduğundan C=B+D−A=(9; 5). AB=6 ve dik yükseklik 4 olduğundan alan 24 birim²; köşegenler (5; 3) noktasında birbirini ortalar.",
        ],
      },
      {
        title: "Üçgenlere bölmek alanı görünür kılar",
        paragraphs: [
          "Bir köşegen paralelkenarı eş alanlı iki üçgene ayırır. Her iki köşegen çizildiğinde oluşan dört küçük üçgenin alanları eşittir; köşegenlerin yarıları eş olduğundan aynı dik uzaklığa sahip üçgen çiftleri karşılaştırılabilir. Köşegenler eşit uzunlukta olmasa da bu alan eşitlikleri geçerlidir.",
          "İçeride herhangi bir P noktası seç. PAB ile PCD üçgenlerinin alanları toplamı S/2’dir; çünkü eş uzunluktaki paralel AB ve CD tabanlarına ait iki yüksekliğin toplamı paralelkenarın yüksekliğidir. Benzer biçimde PAD ile PBC’nin toplamı da S/2 olur. P’nin merkez olması gerekmez. DC üzerindeki herhangi bir E için ABE’nin alanı yine S/2’dir; ortak yükseklik değişmez.",
        ],
      },
      {
        title: "Dikdörtgende eş köşegenin kaynağı",
        paragraphs: [
          "Bir paralelkenarın bir açısı 90° ise komşu açılar ve karşı açı eşitliklerinden bütün açıları 90°dir; bu şekil dikdörtgendir. Komşu kenarları a ve b ise çevre 2(a+b), alan ab’dir. Köşegen bir dik üçgenin hipotenüsü olduğundan d²=a²+b² çıkar.",
          "İki köşegen eş uzunluktadır ve birbirini ortalar. Bu nedenle kesişim O’dan dört köşeye uzaklık d/2’dir; dört köşe aynı çemberdedir ve çevrel yarıçap R=d/2 olur. Kare olmayan dikdörtgende köşegenler genel olarak dik veya açıortay değildir. Köşegen uzunluğunu bir kenar yerine kullanmak alanı yanlış büyütür.",
        ],
      },
      {
        title: "Eşkenar dörtgende diklik ve yarım köşegen",
        paragraphs: [
          "Dört kenarı da a olan paralelkenar eşkenar dörtgendir. Köşegenler birbirini ortalar; ayrıca bir köşegenin iki yanındaki eş üçgenler köşe açısını ikiye böler. Komşu bütünler açıların yarılarından köşegenlerin dik kesiştiği de görülür. Dört köşenin dik olması zorunlu değildir; bu ek koşul kareyi verir.",
          "Köşegenler e ve f ise yarımlarıyla kenar bir dik üçgen kurar: (e/2)²+(f/2)²=a². Alan S=ef/2=a·h=a²sinα, çevre 4a’dır. Çemberin çapı karşı kenarlar arasındaki h uzaklığıdır. 16 ve 12 köşegenlerinden 8 ve 6 yarıları, kenar 10, alan 96 ve yarı çevre 20 çıkar. Yarıçap r=S/(2a)=96/20=4,8 birimdir. Alanı kenara bölünce bulunan 9,6 yüksekliğinin yarısı da 4,8’dir.",
        ],
      },
      {
        title: "Kare iki ailenin özelliklerini birlikte taşır",
        paragraphs: [
          "Dört eş kenarı ve dört dik açısı olan kare hem dikdörtgen hem eşkenar dörtgendir. Bu yüzden köşegenleri eş, dik, birbirini ortalayan ve köşe açılarını ikiye bölen parçalardır. Her köşegenin ayırdığı köşe açıları 45° ve 45°dir. Kenar a ise d=a√2, alan a²=d²/2, çevre 4a’dır.",
          "İç teğet çemberin yarıçapı r=a/2, çevrel çemberinki R=d/2=a√2/2’dir. Bunlar farklı çemberlerdir; çevrel çember köşelerden geçer, iç çember kenarlara teğettir. Köşegen 12 ise alan 72’dir; 144 köşegeni kenar sayma hatasıdır. Karede köşegen kullanırken hangi uzunluğun tamam, hangisinin yarım olduğunu işaretle.",
        ],
      },
      {
        title: "Köşegenlerle genel alan ve uzunluk denetimi",
        paragraphs: [
          "Paralelkenarın köşegenleri d₁,d₂, aralarındaki açı θ ise alan S=d₁d₂sinθ/2’dir. Bu formül dışbükey dörtgenlerde de geçerlidir; dört küçük üçgenin alanlarını toplamaktan çıkar. Köşegenler dik değilse sinθ çarpanı atılamaz. Eşkenar dörtgende θ=90° olduğu için tanıdık ef/2 biçimine iner.",
          "Komşu kenarlar a,b olan paralelkenarda d₁²+d₂²=2(a²+b²) bağıntısı vardır. Köşegen vektörleri u+v ve u−v’nin karelerini toplayınca skaler çarpımlar birbirini götürür; geriye 2|u|²+2|v|² kalır. Bu bağıntı iki köşegen eşit demek değildir. Örneğin a=5,b=7,d₁=6 ise d₂²=2(25+49)−36=112 bulunur.",
        ],
      },
      {
        title: "Koşulu en kısa yöntemle sonuca bağla",
        paragraphs: [
          "İlk adım hangi ailede olduğunu belirlemektir: yalnız karşı kenarlar paralelse genel özelliklerle başla; dik açı, eş kenar veya köşegen koşulu varsa ilgili alt aileye geç. Alan sorusunda taban/yükseklik veya dik köşegen; uzunluk sorusunda Pisagor, orta nokta ya da eş üçgen; açı sorusunda paralellik ve açıortay çoğu zaman yeterlidir.",
          "Bir parçalama sorusunda adı verilen her bölgenin köşelerini belirle. Aynı taban, aynı yükseklik veya yarım taban sonucu veren eş alanı gerekçelendir; renkten dolayı eşit sanma. Sonuçta uzunluk birimini, alanın kare birimini ve hangi ek koşulu kullandığını denetle. İkinci bir hesap veya uygun karşı örnek, ezberin sınırını kontrol etmeye yardım eder.",
        ],
      },
    ],
    examples: [
      {
        title: "Taban ile ona ait yüksekliği eşleştir",
        prompt:
          "ABCD paralelkenarında AB=12, BC=10 ve AB’ye ait yükseklik 7 birimdir. Alan ve BC’ye ait yükseklik nedir?",
        strategy: "Aynı alanı iki ayrı tabanla yaz.",
        steps: [
          {
            label: "İlk alanı bul",
            explanation: "AB tabanı için S=12·7=84 birimkaredir.",
          },
          {
            label: "İkinci tabanı seç",
            explanation: "BC=10 için 10·hᵦ=84 yazılır.",
          },
          {
            label: "Yüksekliği denetle",
            explanation: "hᵦ=8,4 birim olur; 10·8,4=84 ile aynı alan bulunur.",
          },
        ],
        answer: "Alan 84 birimkare; BC’ye ait yükseklik 8,4 birim.",
        check: "İki taban-yükseklik çifti de 84 verir.",
        pitfall: "BC=10 kenarını AB’nin yüksekliği yerine koyma.",
      },
      {
        title: "Dikdörtgende köşegenden çembere",
        prompt:
          "Kenarları 6 ve 8 birim olan dikdörtgenin köşelerinden geçen çemberin yarıçapı kaçtır?",
        strategy:
          "Köşegeni Pisagor’la bul; kesişimin köşelere uzaklığını kullan.",
        steps: [
          {
            label: "Dik üçgen kur",
            explanation: "Köşegen d için d²=6²+8²=100.",
          },
          {
            label: "Köşegeni bul",
            explanation: "Pozitif uzunluk d=10 birimdir.",
          },
          {
            label: "Yarıçapa dön",
            explanation:
              "Köşegenlerin kesişimi her köşeye 10/2=5 birim uzaktadır.",
          },
        ],
        answer: "5 birim.",
        check: "Alan 48, çevre 28 ve yarıçap 5 farklı niceliklerdir.",
        pitfall: "Köşegeni yarıçap değil çap olarak kullan.",
      },
      {
        title: "Eşkenar dörtgende kenarı alanla karıştırma",
        prompt:
          "Köşegenleri 10 ve 24 birim olan eşkenar dörtgenin bir kenarı ve alanı nedir?",
        strategy: "Yarım köşegenlerle Pisagor; tam köşegenlerle alan kullan.",
        steps: [
          {
            label: "Yarımları ayır",
            explanation:
              "Dik köşegenler birbirini ortalar; yarımlar 5 ve 12’dir.",
          },
          {
            label: "Kenarı bul",
            explanation: "a²=5²+12²=169; a=13.",
          },
          {
            label: "Alanı bul",
            explanation: "S=10·24/2=120 birimkaredir.",
          },
        ],
        answer: "Kenar 13 birim; alan 120 birimkare.",
        check: "Yükseklik 120/13’tür ve kenardan küçüktür.",
        pitfall:
          "Alan hesabında 5 ve 12 yarımlarını kullanıp sonucu dörtte bire düşürme.",
      },
      {
        title: "Paralelkenarın içinde değişmeyen toplam",
        prompt:
          "Alanı 72 birimkare olan ABCD paralelkenarının içindeki herhangi bir P için PAB üçgeninin alanı 13’tür. PCD’nin alanı kaçtır?",
        strategy: "Paralel eş tabanlara ait iki yüksekliğin toplamını kullan.",
        steps: [
          {
            label: "Aynı taban uzunluğunu gör",
            explanation: "AB=CD ve iki taban paraleldir.",
          },
          {
            label: "Alan toplamını kur",
            explanation:
              "P’den bu iki tabana uzaklıklar toplamı tam yüksekliktir; S(PAB)+S(PCD)=72/2=36.",
          },
          {
            label: "Bilineni çıkar",
            explanation: "S(PCD)=36−13=23 birimkaredir.",
          },
        ],
        answer: "23 birimkare.",
        check:
          "Karşı iki üçgenin toplamı 13+23=36’dır; P’nin merkez olması gerekmez.",
        pitfall: "P rastgele iç noktaysa dört üçgeni eş alanlı sayma.",
      },
    ],
    recall: [
      {
        prompt:
          "Genel paralelkenarda köşegenlerin hangi özelliği her zaman doğrudur?",
        answer:
          "Birbirlerini ortalarlar. Eş uzunluk, diklik ve açıortaylık ek koşul gerektirir.",
      },
      {
        prompt:
          "Eşkenar dörtgenin köşegenlerinden kenara geçerken neden yarıları kullanılır?",
        answer:
          "Köşegenler dik kesişip birbirini ortalar; bir kenarla dik üçgen kuran parçalar e/2 ve f/2’dir.",
      },
      {
        prompt:
          "Köşegenleri çizilmiş bir paralelkenardaki dört küçük üçgenin alanları neden eşittir?",
        answer:
          "Köşegen yarıları eş olduğundan ortak yükseklikle karşılaştırılan komşu üçgenler eş alanlıdır; bu bütün dört bölgeye taşınır.",
      },
      {
        prompt: "Karede köşegen d verilirse alan nasıl bulunur?",
        answer: "d=a√2 olduğundan a²=d²/2; alan d²/2’dir.",
      },
      {
        prompt: "Dikdörtgenin çevrel çember yarıçapı kenarın yarısı mıdır?",
        answer:
          "Genelde hayır. Çevrel çemberin çapı köşegendir; R=√(a²+b²)/2 olur.",
      },
    ],
    items: [
      {
        prompt:
          "ABCD paralelkenarında A iç açısı 65°dir. B iç açısı kaç derecedir?",
        options: ["115°", "65°", "25°", "130°", "90°"],
        knowledge: ["Paralelkenarda komşu iç açıların toplamı 180°dir."],
        strategy:
          "A ile B’yi aynı kenarın uçlarındaki komşu açı çifti olarak seç.",
        steps: [
          "A+B=180° yazılır.",
          "B=180°−65°.",
          "B=115°; karşı açılar da 65° ve 115° olur.",
        ],
        optionReasons: [
          "115° bütünler açı bağıntısını sağlar.",
          "65° karşı açı C’ye aittir; B’ye değil.",
          "25°, 90°ye tamamlamaktır.",
          "130°, A açısını ikiyle çarpmaktır.",
          "90° dikdörtgende zorunludur; genel paralelkenarda değildir.",
        ],
        commonError: "Karşı ve komşu köşeleri karıştırma.",
        check: "65+115+65+115=360°.",
      },
      {
        prompt:
          "ABCD paralelkenarında AC ve BD, O’da kesişiyor. |AO|=7 birimdir. |AC| kaç birimdir?",
        options: ["14", "7", "3,5", "21", "28"],
        knowledge: ["Paralelkenarın köşegenleri birbirini ortalar."],
        strategy: "AO ile OC’nin aynı köşegenin eş yarıları olduğunu kullan.",
        steps: ["AO=OC=7.", "AC=AO+OC.", "AC=7+7=14 birim."],
        optionReasons: [
          "14 iki eş parçanın toplamıdır.",
          "7 yalnız yarım köşegendir.",
          "3,5 verilen yarımı tekrar yarılamaktır.",
          "21, iki parça yerine üç parça toplamaktır.",
          "28, yarımı dört katına çıkarmaktır.",
        ],
        commonError: "AO’dan BD’nin tamamını çıkaramazsın; veri AC’ye aittir.",
        check: "AC/2=14/2=7 verilen AO’yu geri verir.",
      },
      {
        prompt:
          "Bir paralelkenarın tabanı 12 birim, bu tabana ait yüksekliği 7 birimdir. Alanı kaç birimkaredir?",
        options: ["84", "42", "19", "38", "168"],
        knowledge: [
          "Paralelkenarın alanı taban ile ona ait dik yüksekliğin çarpımıdır.",
        ],
        strategy: "İki uzunluğu doğrudan çarp; üçgen alanıyla karıştırma.",
        steps: [
          "Taban 12 ve ona ait yükseklik 7’dir.",
          "S=12·7 yazılır.",
          "S=84 birimkare; köşegenin ayırdığı iki üçgenin her biri 42’dir.",
        ],
        optionReasons: [
          "84 taban-yükseklik çarpımıdır.",
          "42 paralelkenarın yarısı olan bir üçgenin alanıdır.",
          "19 iki uzunluğun toplamıdır.",
          "38 toplamın iki katıdır; çevre için de yan kenar bilgisi gerekir.",
          "168 doğru alanı ikiye katlamaktır.",
        ],
        commonError: "Paralelkenarı üçgen sanıp ikiye bölme.",
        check: "İki 42’lik üçgen birleşince 84 olur.",
      },
      {
        prompt:
          "Komşu kenarları 8 ve 10 birim, bu kenarlar arasındaki iç açısı 30° olan paralelkenarın alanı kaç birimkaredir?",
        options: ["40", "80", "20", "18", "160"],
        knowledge: ["S=ab·sinα; 30°nin sinüsü 1/2’dir."],
        strategy: "10 birimlik kenarın 8 birimlik tabana dik bileşenini bul.",
        steps: ["h=10·sin30°=5.", "S=8·5.", "S=40 birimkare."],
        optionReasons: [
          "40; dik yükseklik 5 ile doğru alan bulunur.",
          "80 eğik 10 kenarını yükseklik saymaktır.",
          "20 doğru paralelkenar alanını bir de ikiye bölmektir.",
          "18 kenarları toplamaktır.",
          "160 kenar çarpımını ikiye katlamaktır.",
        ],
        commonError: "Dik açı verilmedikçe iki komşu kenarı doğrudan çarpma.",
        check: "Alan 8·10=80’den küçüktür; sin30°=1/2 oranında azalır.",
      },
      {
        prompt:
          "Dışbükey ABCD paralelkenarının içinde P noktası var. PAB ve PCD üçgenlerinin alanları toplamı 36 birimkaredir. Paralelkenarın alanı kaçtır?",
        options: ["72", "36", "18", "144", "54"],
        knowledge: [
          "İç noktadan eş paralel tabanlara ait iki yüksekliğin toplamı tam yüksekliktir; iki karşı üçgen alanı toplamı paralelkenarın yarısıdır.",
        ],
        strategy: "Verilen toplamı bütün alanın yarısı olarak yaz.",
        steps: [
          "S(PAB)+S(PCD)=S(ABCD)/2.",
          "36=S/2 denkleminde iki tarafı 2 ile çarp.",
          "S=72 birimkare.",
        ],
        optionReasons: [
          "72 verilen iki karşı alanın toplamının iki katıdır.",
          "36 yalnız iki üçgenin toplamıdır, bütün dörtgen değildir.",
          "18 verilen yarıyı tekrar yarılamaktır.",
          "144, yarı alanı dörtle çarpmaktır.",
          "54, verilmemiş bir 18’lik bölge eklemektir.",
        ],
        commonError:
          "P merkezde verilmediği için her bir küçük üçgeni eş alanlı sayma.",
        check: "S/2=72/2=36 başlangıçtaki toplamdır.",
      },
      {
        prompt:
          "Kenarları 6 ve 8 birim olan dikdörtgenin dört köşesinden geçen çemberin yarıçapı kaç birimdir?",
        options: ["5", "10", "7", "4", "24"],
        knowledge: ["Dikdörtgenin çevrel çemberinin çapı köşegendir."],
        strategy: "Pisagor ile köşegeni, sonra yarısını bul.",
        steps: ["d²=6²+8²=100.", "d=10.", "R=d/2=5 birim."],
        optionReasons: [
          "5 köşegenin yarısıdır ve merkezden her köşeye uzaklıktır.",
          "10 çapı yarıçap sanmaktır.",
          "7 iki kenarın ortalamasıdır; çember yarıçapı değildir.",
          "4 yalnız uzun kenarın yarısıdır.",
          "24 alanın yarısıdır ve uzunluk olarak yarıçap vermez.",
        ],
        commonError:
          "Çemberin köşelerden geçtiğini, kenarlara teğet olmadığını ayır.",
        check: "Merkezden köşeye uzaklık √(3²+4²)=5’tir.",
      },
      {
        prompt:
          "Köşegenleri 10 ve 24 birim olan eşkenar dörtgenin bir kenarı kaç birimdir?",
        options: ["13", "26", "17", "12", "14"],
        knowledge: ["Eşkenar dörtgenin köşegenleri birbirini dik ortalar."],
        strategy: "Yarım köşegenlerle kenarı hipotenüs olan dik üçgen kur.",
        steps: [
          "Köşegen yarıları 5 ve 12’dir.",
          "a²=5²+12²=169.",
          "a=13 birim.",
        ],
        optionReasons: [
          "13, 5–12–13 üçgeninin hipotenüsüdür.",
          "26 tam köşegenleri dik kenar gibi kullanmaktır.",
          "17 yarım köşegenleri toplamaktır.",
          "12 büyük yarım köşegendir, hipotenüs daha büyüktür.",
          "14, köşegen farkıdır; kenar bağıntısı değildir.",
        ],
        commonError: "Dik üçgenin kenarlarına tam köşegenleri yazma.",
        check: "4a=52 çevredir; a²=169 iki yarımın kareleri toplamıdır.",
      },
      {
        prompt:
          "Köşegenleri 12 ve 16 birim olan eşkenar dörtgenin kenarlarına teğet iç çemberin yarıçapı kaç birimdir?",
        options: ["24/5", "12/5", "6", "8", "48/5"],
        knowledge: ["S=ef/2, a²=(e/2)²+(f/2)² ve r=S/(2a) olur."],
        strategy:
          "Önce alanı ve kenarı bul; yarı çevreyle yarıçapı ilişkilendir.",
        steps: [
          "S=12·16/2=96 ve a=√(6²+8²)=10.",
          "Yarı çevre 2a=20’dir; S=r·20.",
          "r=96/20=24/5=4,8 birimdir.",
        ],
        optionReasons: [
          "24/5=4,8 doğrudur; 20·4,8=96 sağlar.",
          "12/5, doğru yarıçapı bir kez daha ikiye bölmektir.",
          "6 kısa köşegenin yarısıdır; iç yarıçap değildir.",
          "8 uzun köşegenin yarısıdır; iç yarıçap değildir.",
          "48/5=9,6 yüksekliktir; yarıçap yüksekliğin yarısıdır.",
        ],
        commonError: "İç yarıçapı yükseklikle eşitleme; r=h/2’dir.",
        check: "h=96/10=9,6; r=4,8.",
      },
      {
        prompt: "Bir karenin köşegeni 12 birimdir. Alanı kaç birimkaredir?",
        options: ["72", "144", "36", "24", "288"],
        knowledge: ["Karede köşegen d=a√2; alan a²=d²/2’dir."],
        strategy: "Köşegenden alanı doğrudan hesapla.",
        steps: ["d²=12²=144.", "a²=d²/2=144/2.", "Alan 72 birimkaredir."],
        optionReasons: [
          "72, köşegen karesinin yarısıdır.",
          "144 köşegeni kenar sanmaktır.",
          "36 yarım köşegeni kenar sanmaktır.",
          "24 köşegenin iki katıdır; alan değildir.",
          "288 köşegen karesini yanlışlıkla ikiye katlamaktır.",
        ],
        commonError: "Kenar ve köşegen farklı uzunluklardır.",
        check: "Kenar 6√2 olduğundan karesi 72 olur.",
      },
      {
        prompt:
          "Bir paralelkenarın komşu kenarları 5 ve 7 birim, köşegenlerinden biri 6 birimdir. Diğer köşegen kaç birimdir?",
        options: ["4√7", "√74", "2√7", "√184", "12"],
        knowledge: ["Paralelkenar yasası: d₁²+d₂²=2(a²+b²)."],
        strategy: "Önce köşegen kareleri toplamını, sonra eksik kareyi bul.",
        steps: [
          "2(5²+7²)=2·74=148.",
          "d₂²=148−6²=112.",
          "d₂=√112=4√7 birimdir.",
        ],
        optionReasons: [
          "4√7; karesi 112 ve 112+36=148 olur.",
          "√74, kenar karelerini toplamış ama iki köşegeni ayırmamıştır.",
          "2√7, 112’nin kökünü yanlış sadeleştirmektir; karesi 28’dir.",
          "√184, bilinen köşegen karesini çıkarmak yerine eklemektir.",
          "12 kenarların toplamıdır; köşegen dejenere olmayan şeklin bu toplamından küçüktür.",
        ],
        commonError:
          "Paralelkenarın köşegenlerini eş varsayma; şekil dikdörtgen olmayabilir.",
        check:
          "112+36=148 ve diğer köşegen yaklaşık 10,58; 2 ile 12 arasındaki üçgen eşitsizliği sınırlarını sağlar.",
      },
      {
        prompt:
          "Dikdörtgen ABCD’de B’den AC köşegenine indirilen dikmenin ayağı E’dir. E, AC üzerinde; AE=9 ve EC=16 birimdir. AB kaç birimdir?",
        options: ["15", "20", "25", "12", "5"],
        knowledge: [
          "ABC dik üçgeninde BE hipotenüse ait yüksekliktir; AB²=AE·AC.",
        ],
        strategy: "AC’yi topla ve AB’ye komşu hipotenüs parçasını kullan.",
        steps: [
          "AC=9+16=25.",
          "AB²=AE·AC=9·25=225.",
          "AB=15 birim; BC=√(16·25)=20 olur.",
        ],
        optionReasons: [
          "15, Öklid’in 9·25 bağıntısının pozitif köküdür.",
          "20 diğer dik kenar BC’dir.",
          "25 hipotenüs AC’nin tamamıdır.",
          "12, yüksekliğin √(9·16) değeridir; AB değildir.",
          "5, hipotenüsün kareköküdür; AB² için 9 çarpanı eksiktir.",
        ],
        commonError:
          "Öklid bağıntısında AB’ye ait izdüşümü EC değil AE olarak seç.",
        check: "15²+20²=25²; BE²=9·16=144.",
      },
      {
        prompt:
          "Dışbükey ABCD yalnızca paralelkenar olarak veriliyor. Aşağıdaki özelliklerden hangisi ek koşul olmadan zorunlu değildir?",
        options: [
          "AC⊥BD",
          "AB=CD",
          "AD=BC",
          "A ve C iç açıları eşittir",
          "Köşegenler birbirini ortalar",
        ],
        knowledge: [
          "Genel paralelkenarda karşı kenarlar ve açılar eş, köşegenler birbirini ortalar; diklik özel koşuldur.",
        ],
        strategy:
          "Zorunlu özellikleri bir kare resminden değil paralelkenar tanımından ayır.",
        steps: [
          "İki paralel kenar çifti karşı kenar ve açı eşitliklerini verir.",
          "Köşegenler eş üçgenlerden birbirlerini ortalar.",
          "Kenarları 6 ve 8 olan kare olmayan dikdörtgen de paralelkenardır; köşegenleri dik değildir.",
        ],
        optionReasons: [
          "AC⊥BD her paralelkenarda zorunlu değildir; eşkenar dörtgen için geçerlidir.",
          "AB=CD karşı kenar eşitliğidir ve zorunludur.",
          "AD=BC öteki karşı kenar çiftidir ve zorunludur.",
          "Karşı köşe açıları paralellikten eşittir.",
          "Köşegenlerin birbirini ortalaması genel paralelkenar özelliğidir.",
        ],
        commonError:
          "Kareye ait diklik ve açıortay özelliklerini genel aileye taşıma.",
        check:
          "6×8 dikdörtgende köşegen vektörlerinin skaler çarpımı 64−36=28 olup sıfır değildir.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri: basılı 144–150; Aurelia TYT Geometri Tüm Konular ve Formüller: paralelkenar ailesi özetiyle karşılaştırılmış özgün anlatım ve sorular. Kaynağın bütün PDF kapsamı değildir.",
  },
];
export const geometryQuadrilaterals032Guides: LessonGuide[] = packs.map(
  ({ items, title, ...guide }) => guide,
);
export const geometryQuadrilaterals032Lessons: Lesson[] = packs.map(
  (p, family) => ({
    id: p.id,
    subjectId: "tyt-geometri",
    title: txt(p.title),
    minutes: p.minutes,
    objectives: p.objectives.map(txt),
    source: txt(p.source),
    tags: ["temel-geometri", "kaynakli-anlatim", "Özgün öğretim soruları"],
    body: p.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: p.items.map((item, i): Question => {
      const shift = (2 * i + family + 1) % 5;
      const order = item.options.map((_, j) => (j + shift) % 5);
      const guidance: QuestionGuidance = {
        knowledge: item.knowledge,
        strategy: item.strategy,
        steps: item.steps,
        optionReasons: order.map((j) => item.optionReasons[j]),
        commonError: item.commonError,
        check: item.check,
      };
      return {
        id: `f032-${p.id}-${i + 1}`,
        prompt: txt(item.prompt),
        options: order.map((j) => txt(item.options[j])),
        answer: order.indexOf(0),
        hint: txt(item.strategy),
        explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
        skill: p.id,
        guidance,
      };
    }),
  }),
);
const summaries: Record<string, CheatSection[]> = {
  "tyt-geo-yamuk-deltoid-032": [
    {
      title: "Taban ve açı",
      text: [
        "AB∥CD tabanları seç. Aynı yan kenardaki iki iç açı toplamı 180°dir.",
        "Kapsayıcı tanımda paralelkenar da yamuktur.",
      ],
    },
    {
      title: "Orta taban ve alan",
      text: [
        "m=(a+c)/2; S=m·h=(a+c)h/2. h tabanlara dik uzaklıktır.",
        "Köşegen orta noktaları arası |a−c|/2; orta tabanın tamamı değildir.",
      ],
    },
    {
      title: "Özel yamuk koşulları",
      figureTitle: "İkizkenar yamukta simetriyi gerçekten doğrula",
      text: [
        "Farklı tabanlı ikizkenar yamuk: h²=ℓ²−((b−a)/2)².",
        "Dik yamukta eğik kenar²=h²+(a−c)². Dik köşegen de varsa h²=ac.",
        "Simetrik ikizkenar yamukta dik köşegenler varsa h=(a+c)/2.",
      ],
    },
    {
      title: "Köşegen kesişimi",
      text: [
        "AO/OC=BO/OD=a/c. Benzer taban üçgenleri alan oranı a²/c².",
        "İki yan üçgen alanı eş; her biri diğer iki alanın çarpımının pozitif kareköküdür.",
      ],
    },
    {
      title: "Deltoid",
      text: [
        "AB=AD ve CB=CD ise AC, BD’nin orta dikmesidir. BD, AC’yi genelde ortalamaz.",
        "S=AC·BD/2; Ç=2(AB+BC). Yarım BD ve kenarla Pisagor kur.",
      ],
    },
  ],
  "tyt-geo-paralelkenar-ozel-dortgenler-032": [
    {
      title: "Paralelkenar",
      text: [
        "Karşı kenarlar/açılar eş; komşu açılar bütünler. Köşegenler birbirini ortalar.",
        "Eş köşegen, dik köşegen veya açıortaylık genel özellik değildir.",
      ],
    },
    {
      title: "Alan ve parçalama",
      figureTitle: "Alanı taban ve dik uzaklıkla kur",
      text: [
        "S=a·hₐ=b·hᵦ=ab·sinα. Kenarla yüksekliği eşleştir.",
        "Köşegen alanı yarılar; iki köşegenin dört üçgeni eş alanlıdır.",
        "Rastgele iç P için S(PAB)+S(PCD)=S/2; tek tek eşlik gerekmez.",
      ],
    },
    {
      title: "Dikdörtgen",
      text: [
        "S=ab; Ç=2(a+b); d²=a²+b². Köşegenler eş ve birbirini ortalar.",
        "Çevrel çember yarıçapı R=d/2; kare olmadıkça diklik/açıortaylık zorunlu değildir.",
      ],
    },
    {
      title: "Eşkenar dörtgen",
      figureTitle: "Eşkenar dörtgende diklik ve yarım köşegen",
      text: [
        "S=ef/2=a·h; Ç=4a. Köşegenler dik, birbirini ortalayan ve açıortay parçalardır.",
        "(e/2)²+(f/2)²=a²; iç yarıçap r=S/(2a)=h/2.",
      ],
    },
    {
      title: "Kare ve genel köşegen denetimi",
      text: [
        "Kare: S=a²=d²/2, d=a√2, r=a/2, R=d/2.",
        "Paralelkenar: d₁²+d₂²=2(a²+b²).",
        "Dışbükey dörtgende köşegen açısı θ ise S=d₁d₂sinθ/2.",
      ],
    },
  ],
};
export const geometryQuadrilaterals032Sheets: CheatSheet[] = packs.map((p) => ({
  topicId: `topic-${p.id}`,
  lessonId: p.id,
  title: p.title,
  subjectId: "tyt-geometri",
  sections: summaries[p.id],
  examples: p.examples.slice(0, 2).map((e) => ({
    title: e.title,
    prompt: e.prompt,
    steps: e.steps.map((s) => s.label + ": " + s.explanation),
    answer: e.answer,
  })),
  cautions: p.id.includes("yamuk")
    ? [
        "İkizkenar yamukta farklı taban veya açık simetri koşulunu denetle.",
        "Deltoidde yalnız simetri köşegeni diğer köşegeni ortalamak zorundadır.",
      ]
    : [
        "Eğik kenarı yükseklik yerine yazma.",
        "Eş/dik köşegen ve açıortay koşullarını bütün paralelkenarlara taşıma.",
      ],
  recall: p.recall.slice(0, 3),
  source: p.source,
}));
