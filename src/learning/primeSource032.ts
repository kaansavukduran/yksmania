import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
interface PrimeItem032 extends QuestionGuidance {
  code: string;
  prompt: string;
  options: string[];
}
interface PrimePack032 {
  id: string;
  title: string;
  minutes: number;
  source: string;
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: PrimeItem032[];
  sheet: CheatSection[];
}
const divisorsOf72 = {
  layout: "table" as const,
  headers: ["3 kuvveti", "2⁰", "2¹", "2²", "2³"],
  rows: ["3⁰","3¹","3²"].map((label, exponent) => [
    label,
    ...[0, 1, 2, 3].map((power) => String(3 ** exponent * 2 ** power)),
  ]),
};

const pack: PrimePack032 = {
  title: "Asal sayılar: sıfırdan kanıta ve problem çözümüne",
  sections: [
    {
      title: "Tam bölen, pozitif tam sayı ve asalın ön bilgisi",
      paragraphs: [
        "Tam sayılar …,−2,−1,0,1,2,…; pozitif tam sayılar 1,2,3,… biçimindedir. a=b·k olacak bir tam sayı k varsa b, a’yı tam böler. Örneğin 15=3·5 olduğundan 3 ve 5,15’in pozitif bölenleridir. Bölen ile kat aynı ilişkinin iki yönüdür:15,3’ün katıdır.",
        "Asal sayı 1’den büyük ve tam iki farklı pozitif böleni olan tam sayıdır:1 ve kendisi. 7’nin bölenleri 1 ve 7’dir. 9’un 1,3,9 olmak üzere üç böleni vardır;9 bileşiktir. 1’den büyük olup asal olmayan tam sayıya bileşik denir. Sayının hangi kümeden seçildiğini yazmadan asal çarpım kısayoluna geçme.",
      ],
    },
    {
      title: "1, 2 ve asal rakamlar: üç ayrı tuzak",
      paragraphs: [
        "1’in yalnız bir pozitif böleni vardır; ne asal ne bileşiktir. 0 ve negatif sayılar burada kullanılan asal tanımına girmez. En küçük asal 2’dir ve tek çift asal da 2’dir. 2’den büyük bir çift sayının 1 ve kendisi dışında 2 böleni bulunur.",
        "Tek olmak asal olmak değildir:9,15,21 bileşiktir. Asal rakamlar 2,3,5,7’dir; fakat yalnız bu rakamları kullanmak bütün sayıyı asal yapmaz. 32=2⁵ bileşikken 23 asaldır. Aynı rakamları farklı sıraya koymak sayının bölenlerini değiştirebilir.",
      ],
    },
    {
      title: "Asallık denemesini neden karekökte bitirirsin?",
      paragraphs: [
        "Bir sayının karesi kendisiyle çarpımıdır: 7²=7·7=49. √n, karesi n olan negatif olmayan sayıdır; √49=7. n>1 bileşikse n=a·b, a,b>1 yazılır. İki çarpan da √n’den büyük olsaydı çarpımları n’den büyük olurdu. Küçük çarpan √n’yi aşmaz; onun da bu sınırı aşmayan bir asal böleni vardır. Bu nedenle p²≤n sağlayan asal p’leri denemek yeterlidir. Karekökü ondalık hesaplamak yerine adayın karesini karşılaştırabilirsin.",
        "Eşitliği unutma:49 için 7,121 için 11 denenir. 97 için 2,3,5,7 yeterlidir;11²>97. 97 tek, rakam toplamı 16, son rakamı 7 ve 97=7·13+6 olduğu için bu adaylar elenir. 91=7·13 ise bileşiktir. Bir uygun bölen bileşikliği kanıtlar; asal demek için gerekli bütün adayların elenmesi gerekir.",
      ],
    },
    {
      title: "Birden çok sayıyı birlikte ele: 1–50 eleği",
      paragraphs: [
        "Bir aralıkta birçok sayıyı aynı anda sınıflandırmak için 1’i dışla. 2’yi asal bırakıp kendisi dışındaki katlarını ele. Sonra 3,5,7 için aynı işlemi yap. 7²=49≤50 ve 11²>50 olduğundan 50’ye kadar gereken son asal aday 7’dir; elenmeden kalan 2 ve üzeri sayılar asaldır.",
        "Birleşik sayının birden fazla yoldan elenmesi yeni bir sayı üretmez. Yalnız çiftleri silmek,9,25,49 gibi tek bileşikleri bırakır. Her renk değişimini nedenine bağla: örneğin 49,7’nin katı olduğu için elenir. Şekil üzerinden elemek bir öğretim etkinliğidir; bağımsız soruda sonucu gerekçelendirmek ayrı bir iştir.",
      ],
    },
    {
      title: "Asal çarpımda üç farklı şeyi sayarsın",
      paragraphs: [
        "1’den büyük her tam sayının asal çarpımı, çarpanların sırası dışında tektir. Üs, tabanın tekrar sayısıdır: 2²=2·2. 60÷2=30, 30÷2=15, 15÷3=5, 5÷5=1 adımları 60=2²·3·5 ayrılışını verir. Farklı asal bölen türleri 2,3,5 olmak üzere 3 tane; tekrarlı asal çarpan adedi 2+1+1=4’tür.",
        "72=2³·3² için tür sayısı 2, tekrar sayısı 5, pozitif bölen sayısı 12’dir. 84=2²·3·7’nin farklı asal bölenlerinin toplamı ise 2+3+7=12’dir. Türlerin sayısı, türlerin toplamı, üslerin toplamı ve bütün bölenlerin sayısı farklı sorulardır. Önce istenen sayacın adını yaz.",
      ],
    },
    {
      title: "Bütün pozitif bölenleri bağımsız seçimle say",
      paragraphs: [
        "N=pᵃ qᵇ, p ve q farklı asal, a, b pozitif tam sayı olsun. Her bölen p’nin 0…a, q’nun 0…b kuvvetlerini bağımsız seçer. Böylece(a+1)(b+1) pozitif bölen bulunur. 12=2²·3 için 3·2=6 bölen vardır:1,2,3,4,6,12.",
        "Asal p’nin karesi p² yalnız 1, p, p² olmak üzere 3 pozitif bölen taşır. 1’in yalnız 1 böleni vardır. Bileşik tabanla formülü uygulama:36=4·9 diye 4 bölen sayılmaz;36=2²·3² olduğundan 9 bölen vardır. 180=2²·3²·5 için tür 3, bütün pozitif bölen 3·3·2=18’dir.",
        "Tabloda bir 2 kuvveti ve bir 3 kuvveti seç. Örneğin 2² ile 3¹ kesişiminde 4×3=12 vardır. Üs 0 seçmek, o asalın bölenin içinde bulunmadığı anlamına gelir. Her hücre başka bir bölen verir. 72 için 4 sütun ve 3 veri satırı 12 bölen oluşturur.",
      ],
      table: divisorsOf72,
    },
    {
      title: "Asal çıkan çarpımın birim çarpan koşulu",
      paragraphs: [
        "a, b pozitif tam sayı ve ab=p asal ise çarpanlardan biri 1, öteki p’dir; ikisi de 1’den büyük olsaydı ürünün ek böleni olurdu. k>1 sabit tam sayı için kt asal ve t pozitif tam sayıysa t=1 ve k da asal olmalıdır. k=6 bileşik olduğu için hiçbir pozitif t bu çarpımı asal yapamaz.",
        "Bu sonuç gerçel çarpanlara taşınmaz:2,5·2,8=7 asaldır ama iki çarpan da 1 değildir. Negatif tam sayılara izin verilirse(−1)·(−p)=p de mümkündür. Önce sayının kümesini, ardından her çarpanın işaretini belirle. Pozitif n koşulundan çıkan 0 adayı da otomatik kabul edilmez.",
      ],
    },
    {
      title: "Kare farkından aday bul, sonra gerçekten asal mı bak",
      paragraphs: [
        "x²−y²=(x−y)(x+y) eşitliği iki kare farkıdır; çarpımı açınca orta terimler birbirini götürür. n pozitif ve n²−9 asal ise sonuç pozitifliğinden n>3 olur. İki pozitif çarpan için n−3=1 gerekir; n=4 ve öteki çarpan 7 asaldır.",
        "Aday üretmek çözümü doğrulamak değildir. n²−16 için aynı yol n=5 üretir ama sonuç 9 bileşiktir; çözüm yoktur. n²−25 için n=6 ve sonuç 11 uygundur. n’nin bütün tam sayılardan seçilmesine izin verilirse−6 da aynı kareyi verir; negatif dal ayrıca değerlendirilir.",
      ],
    },
    {
      title: "Toplam tekse 2’yi ayır; farklılığı kendin ekleme",
      paragraphs: [
        "İki tek sayının toplamı çifttir. Bu yüzden iki asalın toplamı tekse biri tek çift asal 2 olmalıdır. Toplam 25 ise öteki 23; çarpım 46’dır. 23 için 2,3 denemeleri yeterlidir. Toplam 19 ise 2 ve 17; toplam 15 ise 2 ve 13 bulunur.",
        "Toplam çiftse 2 zorunlu değildir:12 için 5+7 uygundur;24 için 5+19,7+17,11+13;20 için 3+17 ve 7+13 örnekleri vardır. p+q=4 için 2+2 uygundur; “birbirinden farklı” denirse bu çözüm kalkar. Farkı 1 olan iki asal yalnız 2 ve 3’tür. Ardışık asal ise arada başka asal bulunmamasıdır:7 ve 11 ardışık asal ama farkları 4’tür; ikiz asalların farkı 2’dir;3 ve 5 böyle bir çifttir.",
      ],
    },
    {
      title: "Toplam ve fark birlikte asalsa neden yalnız 2 ile 5?",
      paragraphs: [
        "p<q farklı asal; hem p+q hem q−p asal olsun. İkisi de tek olsaydı toplam çift ve en az 8 olurdu; bu asal olamaz. O halde p=2. q=3 için fark 1 asal değildir; q>3 olmalıdır.",
        "q−2, q, q+2 sayısının 3’e göre kalanları farklıdır; biri 3’e bölünür. q>3 asal olduğundan 3’e bölünen kendisi olamaz. Öteki iki sayı da asal kalacaksa 3’e bölünen sayı 3’ün kendisi olmalıdır. q−2=3, q=5 verir; q+2=3 ise q=1 asal değildir. Sonuç p=2, q=5; toplam 7, fark 3. Küçük örnek bulmakla tek çözüm olduğunu kanıtlamak ayrı adımlardır.",
      ],
    },
    {
      title: "Aralarında asal, her birinin asal olması değildir",
      paragraphs: [
        "İki pozitif tam sayının tek ortak pozitif böleni 1 ise aralarında asaldırlar. EBOB, en büyük ortak bölen demektir; bu durumda EBOB’ları 1’dir. 8’in pozitif bölenleri 1,2,4,8; 9’unkiler 1,3,9’dur. Ortak yalnız 1 olduğundan ikisi de bileşik olsa bile aralarında asaldırlar. 5 ve 15’in ortak 5 böleni vardır; aralarında asal değildirler. 1 her pozitif tam sayıyla aralarında asaldır ama kendisi asal değildir. Farklı asallar aralarında asaldır; aynı asalın kendisiyle EBOB’u o asal olur.",
        "Ardışık pozitif tam sayılarda ortak bölen farkları 1’i de böler; dolayısıyla aralarında asaldırlar. Üç sayının bütününe ait ortak bölen 1 olması, her ikilinin aralarında asal olmasını gerektirmez. 6,10,15’in ortak böleni 1 ama 6 ile 10’un ortak 2 böleni vardır. Buna karşılık 4,9,25 ikişer ikişer aralarında asaldır ve üçünün hiçbiri asal değildir.",
      ],
    },
    {
      title: "En sade oranı sayıya çevirmenin koşulu",
      paragraphs: [
        "a,b pozitif ve aralarında asal tam sayı; a/b=42/70 olsun. Pay üstteki, payda alttaki sayıdır. Sadeleştirme, pay ve paydayı aynı sıfırdan farklı sayıya bölmektir. İkisini 14’e bölünce 3/5 bulunur. Genel eşit oran a=3t, b=5t, t pozitif tam sayı verir. Aralarında asallık için t=1 olmalıdır; a+b=8. 18/30 oranı da aynı 3/5’e iner.",
        "Aralarında asal koşulu yoksa t serbesttir:3,5 de 6,10 da aynı oranı verir ve toplam 8 t olur. 24/54=4/9 için aralarında asal a=4, b=9, toplam 13’tür;4’ün bileşik olması engel değildir. 28/45 oranında koşul yoksa toplam 73 t olur; bir tek sayı söyleyemezsin. Her adayı hem oran hem ortak bölen koşuluyla kontrol et.",
      ],
    },
    {
      title: "Bölen sayısından en küçük sayıyı tersine kur",
      paragraphs: [
        "Tam 6 pozitif böleni ve iki farklı asal böleni bulunan en küçük sayı aransın. N=pᵃ qᵇ, p<q farklı asal, a, b≥1 yazılır. Bölen sayısı(a+1)(b+1)=6 olduğundan üsler 1 ve 2’dir. En küçük asal tabanlar 2 ve 3 seçilir.",
        "İki aday 2²·3=12 ve 2·3²=18’dir; küçük olan 12’dir. Bölenleri 1,2,3,4,6,12 ile sayı doğrulanır. p⁵ de 6 bölen verir fakat yalnız bir asal tür taşır; kaynak koşuluna uymaz. Yalnız 12’nin bölenlerini göstermek, daha küçük uygun sayı bulunmadığının gerekçesinin yerine geçmez.",
      ],
    },
    {
      title: "İki basamaklı yazımı ve bölünebilmeyi hazırla",
      paragraphs: [
        "İki basamaklı AB yazımı A·B değil 10A+B’dir; tersi BA=10B+A’dır. İkisi de iki basamaklıysa A, B 1…9 rakamlarıdır. 2’ye bölünme son rakamın çiftliğine;5’e bölünme son rakamın 0 veya 5 olmasına bağlıdır. 10A+B=9 A+(A+B) olduğundan 3’e bölünme A+B’nin 3’e bölünmesine eşdeğerdir.",
        "Bir asal p bir tam sayı çarpımını bölüyorsa çarpanlardan en az birini böler; asal çarpan ayrılışında p’nin bir yerde bulunması gerekir. 30=2·3·5 ile bölünebilmek için bu üç asalın gereği birlikte karşılanır. Yalnız son rakam 5 koşuluyla bitirme. Basamak değerini, pariteyi ve rakam toplamını aynı aday üzerinde kontrol et.",
      ],
    },
    {
      title: "Birleşik basamak probleminde aday listesini küçült",
      paragraphs: [
        "İki basamaklı AB ve BA sayılarının çarpımı 30’a bölünsün. 5 çarpanı için A, B’den biri 5 olmalıdır; ikisi de 5 olamaz çünkü çarpım çift olmalıdır. Diğer rakam 2,4,6,8 arasındadır. İki sayının rakam toplamı A+B aynı olduğu için 3 koşulu toplamın 3’ün katı olmasını gerektirir.",
        "Aday toplamlar 7,9,11,13’tür; yalnız 9 uygundur. Basamaklar 4 ve 5, sayılar 45 ve 54 olur;45·54=2430=30·81 ile kontrol edilir. 8,12,15,16 gibi toplamlar uygun basamak çiftlerinden çıkmaz. Örneğin 15 toplamı 5’in yanında 10 rakamını gerektirir;10 bir rakam değildir. Bu bölüm koşulları öğretir; öğretici açıklama resmî kurum çözümü olarak sunulmaz.",
      ],
    },
    {
      title: "Yöntem seç: karar ile kontrolü birlikte yaz",
      paragraphs: [
        "Sayı asal mı sorusunda karekök sınırındaki asal bölenleri dene; çok sayıyı sınıflandırıyorsan elek seç. Örneğin 47 için 2,3,5 yeterlidir;49’da 7’yi atlamak hatadır. 31 nesne yalnız 1’li ve 31’li eş gruplara ayrılıyorsa 31 asaldır. Çarpım asal sorusunda önce çarpanlara ayır ve pozitifliği belirle:7(x−1) asal, x>1 tam ise x=2;6(x−1) için çözüm yoktur.",
        "Asal toplamında tekliği; sade oranda ortak çarpanı; sayma sorusunda hangi sayacın istendiğini işaretle. 18=2·3² için farklı tür 2, tekrarlı çarpan 3, bütün pozitif bölen 6’dır. Üç kartın üzerine sırasıyla 2, 3 ve 3 yaz. İki farklı etiket görürsün ama üç kart sayarsın. Asal çarpan türü ile tekrar adedi arasında da aynı fark vardır. 8/9 karışım oranındaki aralarında asal parça sayıları 8 ve 9 olabilir; ikisi de asal değildir. Kısa yol gereksiz adayları kaldırır; ölçülmüş saniye veya başarı yüzdesi iddiası değildir.",
      ],
    },
    {
      title: "Bir örnek, bütün durumların ispatı değildir",
      paragraphs: [
        "Bir iddianın yanlışlığını tek geçerli karşı örnek çürütebilir; doğru bir örnek bütün durumları ispatlamaz. n²+n+41, n=0 için asal 41 verir; n=41 için 41·43 bileşik olur. Bu ifade bütün n’lerde asal üreten bir formül değildir. “Olabilir” bir uygun örnek ister; “kesin” bütün izinli durumlarda geçerli gerekçe ister.",
        "“Farklı iki asalın farkı daima çifttir” iddiası 3−2=1 ile çürür. İkisi de 2 dışındaki tek asallarsa fark çift olur. “Asal rakamla yazılan her sayı asaldır” iddiasını 32 çürütür. Bir hesapta bulduğun adayı ilk ifadeye geri koymak, o adayın geçerli olup olmadığını denetler; başka aday olmadığını ayrıca açıklamalısın.",
      ],
    },
    {
      title: "Destek azalt: eksik adımı ve kaybolan koşulu bul",
      paragraphs: [
        "n pozitif tam sayı ve 3(n+1) asal olsun. n+1’in alması gereken değeri ve gerekçeni yaz. Ardından bulduğun n’nin pozitif tam sayı koşuluna uyup uymadığını denetle. Çözümlü örnekler bölümündeki “Eksik adımı tamamla, sonra koşula dön” kartında adımları açabilirsin.",
        "Not açıkken yöntemi öğren; ardından yalnız ilk hamleyle yeni soruyu çözmeyi dene. 143’ü 2,3,5,7’ye bölünmedi diye asal ilan eden çözüm 11 adayı eksik bırakır. Oran 8/15 en sadedir diye 8 ve 15’i tek tek asal ilan etmek de farklı bir hatadır. n²−16 için n=5 adayını sonuç 9 olduğu halde kabul etmek üçüncü bir hatadır. Her hatada bozulan ilk gerekçeyi bul; yalnız son cevabı değiştirme.",
      ],
    },
    {
      title: "Koşul değişince hangi adım değişir?",
      paragraphs: [
        "Asal toplam 31 yerine 30 olursa tek toplam gerekçesi kalkar;7+23 ve 11+19 gibi farklı çiftler mümkündür. 24/54 oranında aralarında asallık kalkarsa a=4 t, b=9 t ve toplam 13 t serbest kalır. n²−25 sorusunda n pozitif yerine bütün tam sayılardan seçilirse 6 yanına−6 da katılır.",
        "Yalnız bileşikliği göstermek isteniyorsa 143=11·13 çarpımı yeterlidir; diğer bütün bölenleri taramak gerekmez. Asallık içinse adayların tamamı elenmelidir. Soruları çözerken doğruluk, yöntem, koşul gerekçesi ve kontrolü ayrı düşün. Bir soruyu açmak veya şekli değiştirmek öğrenme puanı değildir; bağımsız çözüm ve gecikmeli farklı soru performansı ayrı kaydedilir.",
      ],
    },
    {
      title: "Son denetim: sayıdan koşula geri dön",
      paragraphs: [
        "Pozitif/tam/farklı/en küçük/kaç farklı sözcüklerini işlemden önce işaretle. Asal sonuç bir çarpım mı toplam mı? Çarpımsa uygun çarpanlara ayır; toplamsa pariteyi kullan. Ortak bölen mi bireysel asallık mı? Tür sayısı mı tür toplamı mı bütün bölenler mi? Her adımda hangi bilginin kullanıldığını bir cümleyle söyle.",
        "Küçük asallıkta çarpımı geri yaz; oran sorusunda en sadeliği; bölen sayısında asal tabanları; basamak sorusunda bütün rakam ve bölünme koşullarını kontrol et. Resmî sınav arşivinin bütün yılları bu tek üniteyle taranmış sayılmaz. Kaynağın öğretim içeriği ile kişisel sınav başarısı ve öğrenilmişlik ayrı ölçülerdir.",
      ],
    },
  ],
  examples: [
    {
      title: "119 ile 113: aynı adaylar, farklı karar",
      prompt: "119 ve 113 sayılarının asallığını gerekçelendir.",
      strategy: "Her sayı için karesi sayıyı aşmayan asal adayları yaz.",
      steps: [
        {
          label: "1. adım",
          explanation:
            "Her ikisi için 2,3,5,7 denenir;11²=121 iki sayıdan da büyüktür.",
        },
        {
          label: "2. adım",
          explanation:
            "119=7·17 olduğundan bileşiktir; bir çarpan çifti yeterlidir.",
        },
        {
          label: "3. adım",
          explanation:
            "113 tek, rakam toplamı 5, sonu 3;113=7·16+1. 2,3,5,7 bölmez ve 113 asaldır.",
        },
      ],
      answer: "119 bileşik,113 asal.",
      check: "119 çarpımıyla;113 bütün gerekli adaylarla doğrulanır.",
      pitfall: "Bileşik için tek bölen yeterken asal için yarıda durma.",
    },
    {
      title: "84’te istenen farklı asal türlerin toplamı",
      prompt: "84’ün farklı asal bölenlerinin toplamını bul.",
      strategy: "Önce asal ayrılışı yaz, tekrarları bir kez al.",
      steps: [
        {
          label: "1. adım",
          explanation: "84=2²·3·7.",
        },
        {
          label: "2. adım",
          explanation: "Farklı asal bölenler 2,3,7’dir.",
        },
        {
          label: "3. adım",
          explanation: "Toplam 2+3+7=12’dir.",
        },
      ],
      answer: "12.",
      check:
        "4·3·7=84 ve 2 yalnız bir kez toplandı. Alternatif olarak 84’ün bütün pozitif bölenlerini listeleyip yalnız asal olan 2,3,7’yi birer kez seçerek toplayabilirsin; bu yol daha çok kayıt gerektirir.",
      pitfall: "Üsleri toplamak farklı asal türlerin toplamını vermez.",
    },
    {
      title: "Pozitif tam çarpım neden birim çarpan ister?",
      prompt: "x pozitif tam sayı;5(x−2) asal. x kaçtır?",
      strategy: "Çıktının pozitifliğinden çarpanların kümesini belirle.",
      steps: [
        {
          label: "1. adım",
          explanation: "5 pozitif olduğundan x−2>0 olmalıdır.",
        },
        {
          label: "2. adım",
          explanation:
            "5 asal ve 1’den büyük; öteki pozitif tam çarpan x−2=1 olur.",
        },
        {
          label: "3. adım",
          explanation: "x=3 ve 5(3−2)=5 asal bulunur.",
        },
      ],
      answer: "x=3.",
      check: "x=1 çıktı−5 verir; kaynak asal tanımına uymaz.",
      pitfall:
        "Sabit 5 yerine 6 olsaydı birim çarpan da bileşik tabanı kurtaramazdı.",
    },
    {
      title: "Kare farkı ve aday denetimi",
      prompt: "n pozitif tam sayı; n²−9 asal. Bütün n’leri bul.",
      strategy: "Pozitif çarpanları ayır ve çıkan adayın ürününü denetle.",
      steps: [
        {
          label: "1. adım",
          explanation: "n²−9=(n−3)(n+3); pozitif çıktı için n>3.",
        },
        {
          label: "2. adım",
          explanation: "Küçük çarpan n−3=1 olmalı; n=4.",
        },
        {
          label: "3. adım",
          explanation:
            "Öteki çarpan 7 asaldır;4²−9=7. n>3 olan diğer tam sayılarda iki çarpan da 1’den büyüktür.",
        },
      ],
      answer: "Yalnız n=4.",
      check: "Kare farkını yeniden açmak ilk ifadeyi verir.",
      pitfall:
        "n²−16 benzer görünür ama n=5 çıktısı 9 bileşik olduğu için çözüm vermez.",
    },
    {
      title: "Tek toplamda aday listesi yerine gerekçe",
      prompt: "p, q farklı asal ve p+q=25. pq kaçtır?",
      strategy: "Tek toplamın zorunlu çift asalını kullan.",
      steps: [
        {
          label: "1. adım",
          explanation: "İki tek asal çift toplam verirdi; asallardan biri 2.",
        },
        {
          label: "2. adım",
          explanation:
            "Öteki 25−2=23. 2 ve 3 denemeleri 23’ün asallığına yeter.",
        },
        {
          label: "3. adım",
          explanation: "Çarpım 2·23=46 olur.",
        },
      ],
      answer: "46.",
      check: "Toplam 25, farklılık ve iki asallık birlikte sağlanır.",
      pitfall: "Çift toplamda 2 zorunlu değildir;24 için 5+19 da uygundur.",
    },
    {
      title: "Toplam ve fark için tek çözümü kanıtla",
      prompt: "p<q farklı asal; hem p+q hem q−p asal. p, q nedir?",
      strategy:
        "Tek-çift ayrımıyla p=2 bul; ardından 3’e göre kalanlarla q’yu sınırla.",
      steps: [
        {
          label: "1. adım",
          explanation:
            "İkisi de tekse toplam çift ve 8 ve üstünde olur; asal değildir. p=2.",
        },
        {
          label: "2. adım",
          explanation:
            "q=3 fark 1 verdiğinden olmaz. q>3 için q−2, q, q+2’den biri 3’ün katıdır.",
        },
        {
          label: "3. adım",
          explanation:
            "Asal kalması için o sayı 3 olmalı: q−2=3, q=5. q+2=3 ise q=1 asal değil.",
        },
      ],
      answer: "p=2, q=5.",
      check: "Toplam 7, fark 3 asal; başka uygun q kalmaz.",
      pitfall: "2 ve 3’ü toplam 5 asal diye kabul etme; fark da isteniyor.",
    },
    {
      title: "Aralarında asal oranı sadeleştir",
      prompt:
        "a, b pozitif ve aralarında asal tam sayı; a/b=42/70. a+b kaçtır?",
      strategy: "En sade pay ve paydaya dön.",
      steps: [
        {
          label: "1. adım",
          explanation: "42/70 ortak 14 ile 3/5 olur.",
        },
        {
          label: "2. adım",
          explanation: "a=3 t, b=5 t ve ortak çarpan t pozitif tam sayıdır.",
        },
        {
          label: "3. adım",
          explanation: "Aralarında asal oldukları için t=1; toplam 8.",
        },
      ],
      answer: "8.",
      check: "3 ve 5 ortak bölen 1 taşır; oran 42/70 ile aynıdır.",
      pitfall: "Koşul yoksa 6,10 da uygundur; toplam tek değerli olmaz.",
    },
    {
      title: "Bölen sayısından en küçük sayıyı kur",
      prompt:
        "Tam 6 pozitif böleni ve iki farklı asal böleni olan en küçük sayı nedir?",
      strategy: "Üs seçim sayılarının çarpımını 6 yap.",
      steps: [
        {
          label: "1. adım",
          explanation: "N=pᵃ qᵇ için (a+1)(b+1)=6.",
        },
        {
          label: "2. adım",
          explanation: "Üsler 1 ve 2 olmalı; en küçük asal tabanlar 2 ve 3.",
        },
        {
          label: "3. adım",
          explanation: "2²·3=12 ve 2·3²=18 karşılaştırılır;12 küçüktür.",
        },
      ],
      answer: "12.",
      check:
        "Bölenleri 1,2,3,4,6,12. Tek asal tabanlı p⁵ iki tür koşuluna uymaz.",
      pitfall: "Bir uygun sayı bulmak tek başına en küçüklük kanıtı değildir.",
    },
    {
      title: "Eksik adımı tamamla, sonra koşula dön",
      prompt: "n pozitif tam sayı;3(n+1) asal. n+1=…; n=… adımlarını tamamla.",
      strategy: "Önce pozitif çarpımda birim çarpanı bul.",
      steps: [
        {
          label: "1. adım",
          explanation:
            "3 ve n+1 pozitif tam çarpanlardır. 3>1 olduğundan n+1=1.",
        },
        {
          label: "2. adım",
          explanation: "Buradan n=0 çıkar.",
        },
        {
          label: "3. adım",
          explanation: "0 pozitif değildir; bu koşullarla çözüm yoktur.",
        },
      ],
      answer: "Pozitif tam n çözümü yok.",
      check: "0 dahil doğal sayılarda n=0 çıktı 3 verirdi.",
      pitfall: "Cebirsel adayı sayı kümesi kontrolünden geçirmeden kabul etme.",
    },
    {
      title: "Kaynak incelemesi:2022 TYT Temel Matematik 14",
      prompt:
        "2022 TYT Temel Matematik 14 koşullarının kısa anlatımı: İki basamaklı AB ve BA sayılarının çarpımı 30 a tam bölünüyor. A+B kaçtır? Açıklama bize aittir; resmî çözüm iddiası değildir.",
      strategy: "5,2 ve 3 gereğini ayrı filtrele.",
      steps: [
        {
          label: "1. adım",
          explanation:
            "İki sayı da iki basamaklı olduğundan A, B sıfır değildir. 5 çarpanı için biri 5; çift ürün için diğeri 2,4,6,8.",
        },
        {
          label: "2. adım",
          explanation:
            "İki rakam toplamı A+B aynı olduğundan 3 koşulu 7,9,11,13 adaylarını süzer; yalnız 9 uyar.",
        },
        {
          label: "3. adım",
          explanation: "45 ve 54 kontrol edilir:45·54=2430=30·81.",
        },
      ],
      answer: "9.",
      check: "Basamaklar 4 ve 5 ile bütün başlangıç koşulları sağlanır.",
      pitfall: "AB’yi A·B sanma; yalnız 5 koşuluyla durma.",
    },
    {
      title: "Oran koşulu değişirse toplam neden serbest kalır?",
      prompt:
        "a/b=28/45; a,b pozitif tam sayı. Aralarında asallık verilmedi. a+b tek bir değer midir?",
      strategy: "Eş oranı ortak pozitif tam çarpanla yaz.",
      steps: [
        {
          label: "1. adım",
          explanation: "28 ve 45 aralarında asaldır.",
        },
        {
          label: "2. adım",
          explanation: "Genel çözümler a=28 t, b=45 t, t pozitif tam sayıdır.",
        },
        {
          label: "3. adım",
          explanation: "Toplam 73t olur; t=1 ve t=2 için 73 ve 146 farklıdır.",
        },
      ],
      answer: "Tek değerli değildir.",
      check: "Aralarında asal koşulu eklenirse t=1 ve 73 kalır.",
      pitfall: "Kaynakta verilmeyen aralarında asal şartını kendin ekleme.",
    },
    {
      title: "Aday taraması tüm sayılar hakkında hüküm vermez",
      prompt:
        "n pozitif tam sayı;2 n+1 ve n+4 asal olsun. Yalnız n=1,2,3 adaylarını değerlendir.",
      strategy: "Her adayı iki ifadeye ayrı koy.",
      steps: [
        {
          label: "1. adım",
          explanation: "n=1 için 3 ve 5 asal.",
        },
        {
          label: "2. adım",
          explanation: "n=2 için 5 asal ama 6 bileşik; uymaz.",
        },
        {
          label: "3. adım",
          explanation:
            "n=3 için 7 ve 7 asal; farklılık verilmediği için uygundur.",
        },
      ],
      answer: "İncelenen adaylardan n=1 ve 3 uygundur.",
      check: "Bu tarama diğer n’ler hakkında hüküm vermez.",
      pitfall: "Aynı iki asal değeri farklılık koşulu yokken reddetme.",
    },
  ],
  recall: [
    {
      prompt: "1,2 ve tek sayılar hakkında üç ayrı sınırı açıkla.",
      answer: "1 asal/bileşik değil;2 tek çift asal; her tek sayı asal değil.",
    },
    {
      prompt: "Asallık denemesi neden p²≤n koşulunda biter?",
      answer:
        "Bileşik sayının küçük çarpanı√n değerini aşmaz; onun asal böleni de sınırın içindedir. Eşitlik dahildir.",
    },
    {
      prompt: "72 için üç sayacı bul.",
      answer:
        "72=2³·3²: iki farklı asal tür, beş tekrarlı asal çarpan, on iki pozitif bölen.",
    },
    {
      prompt:
        "Pozitif tam çarpım asal kuralını gerçel ve negatif koşullardan ayır.",
      answer:
        "Pozitif tam çarpanlarda biri 1 olmalı;2,5·2,8=7 gerçel karşı örneği,(−1)·(−p)=p negatif dalı ayrıdır.",
    },
    {
      prompt: "Aralarında asallık yoksa sade oran neyi belirlemez?",
      answer:
        "Ortak pozitif tam çarpan t serbest kalır; a=mt, b=nt aynı oranı verir ve toplam(m+n) t tek değerli olmaz.",
    },
    {
      prompt:
        "Bir adayın geçerli olması ve tek/en küçük çözüm olması neden farklı?",
      answer:
        "Yerine koyma adayın koşulları sağladığını denetler; başka aday olmadığını veya daha küçüğün bulunmadığını ayrıca gerekçelendirmek gerekir.",
    },
    {
      prompt:
        "İki basamaklı AB ve BA’nın çarpımı 30’a bölünürken neden 2,3,5 koşulları birlikte gerekir?",
      answer:
        "Biri 5 rakamını taşımalı, öteki çift olmalı, ikisinin de aynı rakam toplamı 3’ün katı olmalı; bu veriler 4 ve 5 rakamlarına ve 9 toplamına götürür.",
    },
    {
      prompt: "157 için gerekli asal adaylarının listesini kapalı notla yaz.",
      answer: "2,3,5,7,11;13²>157. Her aday elenir ve 157 asaldır.",
    },
  ],
  items: [
    {
      code: "K1",
      prompt: "1 sayısı asal ve bileşik sınıflarında nasıl değerlendirilir?",
      options: [
        "Ne asal ne bileşiktir.",
        "Asaldır.",
        "Bileşiktir.",
        "Hem asal hem bileşiktir.",
        "En küçük çift asaldır.",
      ],
      knowledge: [
        "Asal tam iki farklı pozitif bölen ister; bileşik de 1’den büyük olmalıdır.",
      ],
      strategy: "Önce 1’in pozitif bölenlerini say.",
      steps: [
        "1’in yalnız 1 pozitif böleni vardır.",
        "İki farklı bölen koşulu sağlanmaz.",
        "Bileşik tanımı da 1’den büyük ister; iki sınıfa da girmez.",
      ],
      optionReasons: [
        "İki tanımın da koşulu sağlanmaz.",
        "Bir bölen, iki farklı bölen değildir.",
        "Bileşikler 1’den büyük olmalıdır.",
        "Birbiriyle ayrık iki tanımı aynı anda sağlamaz.",
        "Çift asal 2’dir;1 çift değildir.",
      ],
      check: "Bölen kümesi {1} tek elemanlıdır.",
      commonError: "1’in her sayıyla çarpımda nötr olmasını asallık sanma.",
    },
    {
      code: "K2-U1",
      prompt:
        "49 için asallık denemesinde 2,3,5 elenmiştir. Hangi asal aday mutlaka denenmelidir?",
      options: ["7", "11", "13", "17", "19"],
      knowledge: ["p²≤n koşulundaki asal adayların tamamı denenmelidir."],
      strategy: "Sınırdaki eşitliği kontrol et.",
      steps: [
        "7²=49 olduğu için 7 adaylara dahildir.",
        "49=7·7 tam bölünür.",
        "Bu nedenle 49 bileşiktir.",
      ],
      optionReasons: [
        "Karesi tam 49 olan 7 denenmelidir.",
        "11²=121 sınırı aşar.",
        "13²=169 sınırı aşar.",
        "17²=289 sınırı aşar.",
        "19²=361 sınırı aşar.",
      ],
      check: "7, sayının 1 ve49 dışındaki pozitif bölenidir.",
      commonError: "p²<n ile p²≤n koşulunu karıştırma; eşitlik dahildir.",
    },
    {
      code: "K2-97",
      prompt:
        "97 için karesi 97’yi aşmayan asal adayların TAM listesi hangisidir?",
      options: ["2,3,5,7", "2,3,5", "2,3,5,7,11", "3,5,7", "2,3,7"],
      knowledge: ["p²≤97 koşulunu sağlayan bütün asal p’ler gerekir."],
      strategy: "7² ve 11² değerlerini 97 ile karşılaştır.",
      steps: [
        "7²=49≤97;11²=121>97.",
        "Aradaki gereken asal adaylar 2,3,5,7’dir.",
        "97 bu dördüne bölünmez; asaldır.",
      ],
      optionReasons: [
        "Gerekli ve yeterli listedir.",
        "7 adayı atlanmıştır.",
        "11 gerekli sınırı aşar; istenen gerekli listeye fazlalık ekler.",
        "Çift asal 2 atlanmıştır.",
        "5 atlanmıştır.",
      ],
      check: "11’den sonraki asalın karesi de 97’den büyüktür.",
      commonError: "Sadece birkaç bölenin elenmesini asallık kanıtı sayma.",
    },
    {
      code: "E2",
      prompt: "84=2²·3·7 veriliyor. Farklı asal bölenlerinin toplamı kaçtır?",
      options: ["12", "3", "4", "16", "84"],
      knowledge: ["Farklı asal türler birer kez alınır."],
      strategy: "Tekrarlanan 2’yi toplamda bir kez kullan.",
      steps: [
        "Farklı tabanlar 2,3,7’dir.",
        "İstenen tür sayısı değil, türlerin toplamıdır.",
        "2+3+7=12 bulunur.",
      ],
      optionReasons: [
        "Üç farklı asal tabanın toplamı 12.",
        "3 tür sayısıdır; türlerin toplamı değildir.",
        "4 tekrarlı asal çarpan adedidir.",
        "84’ün pozitif bölen sayısı da 3·2·2=12’dir; 16 bu sayacın sonucu değildir.",
        "84 sayının kendisidir, asal taban toplamı değil.",
      ],
      check: "4·3·7=84 ayrılışı doğru.",
      commonError: "İstenen sayacın adını işlemden önce yaz.",
    },
    {
      code: "E3",
      prompt: "x pozitif tam sayı ve 5(x−2) asal. x kaçtır?",
      options: ["3", "1", "2", "4", "5"],
      knowledge: ["Pozitif tam çarpım asal ise bir çarpan 1 olur."],
      strategy: "Pozitif çıktı için x−2>0 yaz.",
      steps: [
        "5 pozitif olduğundan x>2.",
        "5 zaten 1’den büyük asal; öteki çarpan x−2=1.",
        "x=3 ve çıktı 5 asaldır.",
      ],
      optionReasons: [
        "5·1=5 asal.",
        "x=1 için çıktı −5 olur; pozitif asal tanımına uymaz.",
        "x=2 için çıktı 0 olur; 0 asal değildir.",
        "x=4 için çıktı 10 olur; 10 bileşiktir.",
        "x=5 için çıktı 15 olur; 15 bileşiktir.",
      ],
      check: "x=3 pozitif tam sayı koşulunu sağlar.",
      commonError: "Negatif veya 0 çıktıyı asal kabul etme.",
    },
    {
      code: "E4",
      prompt: "n pozitif tam sayı ve n²−9 asal. Bütün n değerleri hangisidir?",
      options: ["Yalnız 4", "Yalnız 3", "Yalnız 5", "3 ve 4", "4 ve 5"],
      knowledge: [
        "n²−9=(n−3)(n+3); pozitif tam çarpımda küçük çarpan 1 olmalı.",
      ],
      strategy: "Önce n>3 koşulunu çıkar.",
      steps: [
        "n−3 ve n+3 pozitif tam sayıdır.",
        "n−3=1→n=4.",
        "4²−9=7 asal; n>3 olan diğer tam sayılarda küçük çarpan en az 2 olur.",
      ],
      optionReasons: [
        "4 tek adaydır ve çıktı 7 asaldır.",
        "n=3 çıktı 0 verir; 0 asal değildir.",
        "n=5 çıktı 16 verir; 16 bileşiktir.",
        "3 geçersiz adaydır.",
        "5 geçersiz adaydır.",
      ],
      check: "(4−3)(4+3)=1·7.",
      commonError: "Bulduğun adayı tekrar ilk ifadeye koy.",
    },
    {
      code: "U8",
      prompt:
        "n pozitif tam sayı ve n²−16 asal olsun. Çözüm kümesi hangisidir?",
      options: ["Boş küme", "{4}", "{5}", "{6}", "{4,5}"],
      knowledge: [
        "Küçük çarpanın 1 olması yalnız aday üretir; öteki çarpan da asal olmalıdır.",
      ],
      strategy: "n²−16=(n−4)(n+4) yaz.",
      steps: [
        "Pozitif çıktıdan n>4.",
        "Küçük çarpan 1 için n=5 adayı çıkar.",
        "5²−16=9 bileşik; aday reddedilir ve başka aday yoktur.",
      ],
      optionReasons: [
        "Hiçbir pozitif tam n uymaz.",
        "n=4 için çıktı 0 olur; 0 asal değildir.",
        "n=5 için çıktı 9 olur; 9 bileşiktir.",
        "n=6 için çıktı 20 olur; 20 bileşiktir.",
        "İki adayın ikisi de geçersiz.",
      ],
      check: "n≥6 için iki çarpan da 1’den büyük.",
      commonError: "Aday üretmeyi bitmiş çözüm sanma.",
    },
    {
      code: "E5",
      prompt: "p ve q farklı asal sayılar; p+q=25. pq kaçtır?",
      options: ["46", "23", "25", "50", "120"],
      knowledge: ["İki asalın tek toplamında biri 2’dir."],
      strategy: "Öteki asalı 25−2 ile bul.",
      steps: ["Asallardan biri 2.", "Diğeri 23 ve asaldır.", "2·23=46."],
      optionReasons: [
        "Toplam 25 olan 2 ve 23 çarpımı 46.",
        "23 yalnız büyük asal.",
        "25 toplamdır, çarpım değil.",
        "50 için 2 ve 25 asal çifti olmaz.",
        "120 için 5 ve 24 çifti toplam 29 verir; ayrıca 24 asal değildir.",
      ],
      check: "2+23=25 ve 2≠23.",
      commonError: "Tek toplam koşulunu çift toplama genelleme.",
    },
    {
      code: "E6",
      prompt: "p<q farklı asal; hem p+q hem q−p asaldır. Hangi çift uygundur?",
      options: ["(2,5)", "(2,3)", "(3,5)", "(3,7)", "(5,7)"],
      knowledge: [
        "Tek-çift ayrımı p=2 sonucunu, 3’e göre kalanlar q=5 sonucunu zorunlu kılar.",
      ],
      strategy: "Her çiftte hem toplam hem farkı kontrol et.",
      steps: [
        "İkisi de tekse toplam çift ve 2’den büyük olur.",
        "p=2 ve q=3 denenirse fark 1 olduğundan bu çift reddedilir.",
        "p=2 ve q=5 için toplam 7, fark 3 asaldır; iki koşul da sağlanır.",
      ],
      optionReasons: [
        "7 ve 3 iki koşulu da sağlar.",
        "Fark 1 asal değildir.",
        "Toplam 8 bileşik.",
        "Toplam 10 bileşik.",
        "Toplam 12 bileşik.",
      ],
      check: "q−2, q, q+2’den biri 3’ün katı olur; uygun olan q−2=3’tür.",
      commonError: "Yalnız toplamın asallığına bakarak karar verme.",
    },
    {
      code: "E7",
      prompt:
        "a, b aralarında asal pozitif tam sayılar; a/b=42/70. a+b kaçtır?",
      options: ["8", "112", "16", "14", "3"],
      knowledge: ["En sade pay/payda aralarında asal sayıları verir."],
      strategy: "42 ve 70’i ortak bölenleri 14’e böl.",
      steps: [
        "42/70=3/5.",
        "Genel çözüm a=3 t, b=5 t. Aralarında asallık t=1 olmasını gerektirir.",
        "a+b=3+5=8.",
      ],
      optionReasons: [
        "3 ve 5 asıl koşulları sağlar.",
        "112 sadeleştirmeden 42+70 toplamı.",
        "16 için 6,10 ortak 2 böleni taşır.",
        "14 ortak sadeleştirme çarpanıdır.",
        "3 yalnız paydır, toplam değil.",
      ],
      check: "3/5=42/70 ve EBOB(3,5)=1.",
      commonError: "Oran koşuluyla aralarında asal koşulunu birlikte kullan.",
    },
    {
      code: "E8",
      prompt:
        "Tam 6 pozitif böleni ve iki farklı asal böleni olan en küçük pozitif tam sayı kaçtır?",
      options: ["12", "18", "8", "32", "6"],
      knowledge: ["İki asal taban N=pᵃ qᵇ için (a+1)(b+1)=6."],
      strategy: "Üsleri 1 ve 2 olarak bul, en küçük tabanlarla karşılaştır.",
      steps: [
        "Üsler 1 ve 2 olmalıdır.",
        "En küçük tabanlar 2,3 için adaylar 12 ve 18.",
        "12 daha küçüktür ve bölenleri 1,2,3,4,6,12.",
      ],
      optionReasons: [
        "Altı bölen ve iki asal tür koşulunu sağlayan en küçük sayıdır.",
        "18 uygun ama 12’den daha büyük.",
        "8 yalnız asal 2 türünü taşır ve 4 böleni vardır.",
        "32 altı bölenlidir ama yalnız bir asal tür taşır.",
        "6’nın dört pozitif böleni vardır.",
      ],
      check: "p⁵ biçimi iki asal tür koşulunu sağlamaz.",
      commonError: "En küçüklük için adayları karşılaştırmayı atlama.",
    },
    {
      code: "E9",
      prompt: "n pozitif tam sayı ve 3(n+1) asal. Hangi sonuç doğrudur?",
      options: [
        "Çözüm yoktur.",
        "n=0",
        "n=1",
        "n=2",
        "Bütün pozitif n değerleri uygundur.",
      ],
      knowledge: [
        "Bir çarpan 3 olduğundan öteki pozitif tam çarpan 1 olmalıdır.",
      ],
      strategy: "Cebirsel adayı pozitiflikle kontrol et.",
      steps: [
        "n+1=1 gerekir.",
        "n=0 çıkar.",
        "0 pozitif değildir; çözüm kümesi boştur.",
      ],
      optionReasons: [
        "Tek cebirsel aday tanım kümesi dışındadır.",
        "0 çıktı 3 verir ama n pozitif koşuluna uymaz.",
        "n=1 için çıktı 6 olur; 6 bileşiktir.",
        "n=2 için çıktı 9 olur; 9 bileşiktir.",
        "n pozitifken hem 3 hem n+1, 1’den büyüktür; çarpım asal olamaz.",
      ],
      check: "0 dahil doğal sayı koşulunda farklı sonuç olurdu.",
      commonError: "Kaynakta 0 dahil olmadığı halde dahil etme.",
    },
    {
      code: "P1",
      prompt: "143 asal mıdır? Hangi gerekçe doğrudur?",
      options: [
        "Bileşiktir;143=11·13.",
        "Asaldır;2,3,5,7 bölmez.",
        "Bileşiktir;143=7·20.",
        "Asaldır; sonu 3’tür.",
        "Ne asal ne bileşiktir.",
      ],
      knowledge: ["11²=121≤143 olduğundan 11 adayının atlanmaması gerekir."],
      strategy: "Karekök sınırını 11 dahil kontrol et.",
      steps: [
        "13²=169>143.",
        "11 denenir ve 143/11=13 tam sayıdır.",
        "1 ve 143 dışında bölen bulundu; bileşik.",
      ],
      optionReasons: [
        "11·13=143 doğru çarpım.",
        "11 adayı dahil bütün tarama henüz bitmemiştir.",
        "7·20=140;143 değil.",
        "Sonu 3 olan bileşik sayılar da vardır; 143 bunlardan biridir.",
        "143 sayısı 1’den büyüktür ve 11·13 çarpımı onu bileşik sınıfına yerleştirir.",
      ],
      check: "143’ün bileşikliği için başka bölen taramaya gerek yok.",
      commonError: "Bölen taramasını erken kesme.",
    },
    {
      code: "P2",
      prompt: "p, q farklı asal ve p+q=31. pq kaçtır?",
      options: ["58", "60", "62", "77", "93"],
      knowledge: ["Tek toplam bir asalın 2 olmasını gerektirir."],
      strategy: "Öteki asalı ve çarpımını belirle.",
      steps: ["Bir asal sayı 2.", "Diğeri 31−2=29, asal.", "Çarpım 2·29=58."],
      optionReasons: [
        "2 ve 29 toplam 31 çarpım 58.",
        "2 ve 30 çiftinde 30 bileşik.",
        "2 ve 31 toplam 33 eder.",
        "7 ve 11 toplam 18 eder.",
        "3 ve 31 toplam 34 eder.",
      ],
      check: "29 için 2,3,5 adayları bölmez;7²>29.",
      commonError: "Toplamı verilenle geri kontrol et.",
    },
    {
      code: "P3",
      prompt: "a, b aralarında asal pozitif tam sayı; a/b=24/54. a+b kaçtır?",
      options: ["13", "78", "26", "9", "4"],
      knowledge: [
        "En sade oran 4/9’dur; ikisinin bileşik olması engel değildir.",
      ],
      strategy: "24 ve 54’ü ortak bölenleri 6’ya bölerek sadeleştir.",
      steps: [
        "24/54=4/9.",
        "4 ve 9’un ortak pozitif böleni yalnız 1.",
        "a=4, b=9 ve a+b=13 bulunur.",
      ],
      optionReasons: [
        "4+9=13.",
        "78 sadeleştirilmemiş 24+54 toplamı.",
        "26 için 8,18 ortak 2 böleni vardır.",
        "9 yalnız payda.",
        "4 yalnız pay.",
      ],
      check: "4/9=24/54.",
      commonError: "Aralarında asal ile tek tek asalı karıştırma.",
    },
    {
      code: "P4",
      prompt: "n pozitif tam sayı ve n²−25 asal. Bütün n değerleri hangisidir?",
      options: ["{6}", "{5}", "{7}", "{−6,6}", "Boş küme"],
      knowledge: ["Pozitif çarpımda küçük çarpan 1 olmalı."],
      strategy: "(n−5)(n+5) ayrılışını kullan.",
      steps: [
        "Pozitif sonuç n>5 gerektirir.",
        "n−5=1, n=6 adayını verir.",
        "6²−25=11 asal.",
      ],
      optionReasons: [
        "6 tek pozitif çözüm.",
        "n=5 için çıktı 0 olur; 0 asal değildir.",
        "n=7 için çıktı 24 olur; 24 bileşiktir.",
        "−6 pozitif koşuluna uymaz.",
        "n=6 geçerli çözüm olduğundan çözüm kümesi boş değildir.",
      ],
      check:
        "n≥7 için iki pozitif çarpan da 1’den büyüktür; n≤5 için çıktı asal olamaz.",
      commonError: "Sayı kümesindeki pozitifliği unutma.",
    },
    {
      code: "P5",
      prompt:
        "180=2²·3²·5. Farklı asal bölen sayısı ve bütün pozitif bölen sayısı sırasıyla nedir?",
      options: ["3 ve 18", "5 ve 18", "3 ve 5", "18 ve 3", "2 ve 12"],
      knowledge: ["Asal tür sayısı ile bütün bölen sayısı farklıdır."],
      strategy: "Tabanları say, sonra üslerin bir fazlalarını çarp.",
      steps: [
        "Tabanlar 2,3,5 üç farklı türdür.",
        "Bölen sayısı (2+1)(2+1)(1+1).",
        "3·3·2=18 bölen bulunur.",
      ],
      optionReasons: [
        "Üç farklı asal tür ve on sekiz pozitif bölen vardır.",
        "5 üslerin toplamı olup tekrarlı çarpan sayısıdır.",
        "5 bütün bölen sayısı değil, üslerin toplamı.",
        "İki sayacı ters yazar.",
        "2 tür ve 12 bölen bilgisi 72’ye aittir; 180’in tür sayısı 3 ve bölen sayısı 18’dir.",
      ],
      check: "4·9·5=180 ayrılışı doğru.",
      commonError: "Tür sayısı, tekrar sayısı ve bölen sayısını ayrı etiketle.",
    },
    {
      code: "P6",
      prompt:
        "“Birbirinden farklı iki asal sayının farkı daima çifttir.” yargısı için doğru değerlendirme hangisidir?",
      options: [
        "Yanlıştır; 3−2=1 karşı örnektir.",
        "Doğrudur; asalların hepsi tektir.",
        "Doğrudur;2 asal değildir.",
        "Yanlıştır;5−3=2 tek bir sayıdır.",
        "Yargı tek bir örnekle doğrulanır.",
      ],
      knowledge: ["2 tek çift asaldır; her asal tek değildir."],
      strategy: "Evrensel yargıyı karşı örnekle sına.",
      steps: [
        "2 ve 3 farklı asallardır.",
        "3−2=1 tektir.",
        "Daima çifttir iddiası yanlıştır.",
      ],
      optionReasons: [
        "Geçerli bir karşı örnek genel yargıyı çürütür.",
        "2 çift ve asaldır; öncül hatalı.",
        "2 asaldır.",
        "2 tek değil çifttir; bu gerekçe yanlış.",
        "Bir doğru örnek tüm durumları kanıtlamaz.",
      ],
      check: "İki asal da 2 dışındaysa ikisi de tek olur; farkları çifttir.",
      commonError: "Koşulu verilmeden ikisini de tek varsayma.",
    },
    {
      code: "P7",
      prompt: "4,9,25 sayıları için hangisi doğrudur?",
      options: [
        "İkişer ikişer aralarında asaldır; üçü de bileşiktir.",
        "Üçü de asaldır.",
        "4 ve 9’un aralarında asallığı yoktur.",
        "Üçünün ortak böleni 3’tür.",
        "25 ile 4’ün ortak böleni 5’tir.",
      ],
      knowledge: [
        "Asal türleri ayrı olan gruplar arasında ortak asal bölen bulunmaz.",
      ],
      strategy: "4=2²,9=3²,25=5² yaz.",
      steps: [
        "Üç asal tür 2,3,5 birbirinden farklıdır.",
        "Her ikilinin türleri ayrı; EBOB 1.",
        "Her biri kare bileşik sayıdır.",
      ],
      optionReasons: [
        "Her ikili aralarında asal ama hiçbir sayı asal değildir.",
        "4’ün böleni 2,9’un 3,25’in 5 bulunur.",
        "4 ve 9’un tek ortak pozitif böleni 1.",
        "3 sayısı 4’ü ve 25’i bölmez; üçünün ortak böleni olamaz.",
        "5 sayısı 4’ü bölmez; 25 ile 4’ün ortak böleni olamaz.",
      ],
      check: "EBOB(4,9)=EBOB(4,25)=EBOB(9,25)=1.",
      commonError: "Aralarında asallığı bireysel asallık sanma.",
    },
    {
      code: "P8",
      prompt:
        "Yalnız asal rakamlarla yazılmış ama bileşik olan sayı hangisidir?",
      options: ["32", "23", "37", "53", "73"],
      knowledge: ["Rakamın asallığı bütün sayının asallığını belirlemez."],
      strategy: "Her adayın asallığını gerekli adaylarla kontrol et.",
      steps: [
        "32’nin rakamları 3 ve 2 asaldır.",
        "32=2⁵ olduğundan bileşik.",
        "Öteki seçenekler gerekli asal bölenlere sahip olmayan asal sayılardır.",
      ],
      optionReasons: [
        "Rakamları asal,32 bileşik.",
        "23 asal.",
        "37 asal.",
        "53 asal.",
        "73 asal.",
      ],
      check: "32 tek çift asal 2’den daha büyük bir çifttir.",
      commonError: "Rakamlarla oluşturulan sayıyı bir kavram gibi sayma.",
    },
    {
      code: "T1",
      prompt:
        "157 için karekök sınırına kadar gereken asal adayların tam listesi hangisidir?",
      options: [
        "2,3,5,7,11",
        "2,3,5,7",
        "2,3,5,7,11,13",
        "3,5,7,11",
        "2,3,7,11",
      ],
      knowledge: ["11²≤157<13² olduğundan 11 dahil 13 hariç."],
      strategy: "Son iki asal karesini karşılaştır.",
      steps: [
        "11²=121≤157 ve 13²=169>157.",
        "Gerekli liste 2,3,5,7,11.",
        "157=7·22+3=11·14+3; diğerleri de bölmez ve asal.",
      ],
      optionReasons: [
        "Bütün ve gerekli adaylar verilmiştir.",
        "11 atlanmıştır.",
        "13 gerekli sınırı aşar.",
        "2 atlanmıştır.",
        "5 atlanmıştır.",
      ],
      check: "157 tek, rakam toplamı 13, son rakam 7.",
      commonError: "Gereken adayı atlayarak asal kararı verme.",
    },
    {
      code: "T2",
      prompt:
        "a, b pozitif tam sayılar; a/b=28/45. Aralarında asal olma koşulu yok. Toplam hakkında hangisi doğrudur?",
      options: [
        "a+b=73 t, t pozitif tam sayı; tek değer değildir.",
        "a+b kesin 73’tür.",
        "a+b kesin 146’dır.",
        "a+b kesin 45’tir.",
        "Hiç uygun çift yoktur.",
      ],
      knowledge: ["Sade oran ortak pozitif tam çarpanı bırakır."],
      strategy:
        "a=28t, b=45t yaz; t’nin hangi değerleri alabileceğini kontrol et.",
      steps: [
        "28 ve 45 aralarında asaldır.",
        "a=28 t, b=45 t, t≥1 tam sayı.",
        "Toplam 73t olur; t=1 ve t=2 farklı toplamlar verir.",
      ],
      optionReasons: [
        "Oran koşulunu tümüyle taşır, tek bir sonuç zorlamaz.",
        "73 yalnız t=1 durumunda elde edilir; zorunlu toplam değildir.",
        "146 yalnız t=2 durumunda elde edilir; zorunlu toplam değildir.",
        "45 yalnız sade paydadır.",
        "28,45 geçerli bir çifttir.",
      ],
      check: "Oran her pozitif t için 28/45 kalır.",
      commonError: "Kökün vermediği aralarında asal şartını ekleme.",
    },
    {
      code: "T3",
      prompt:
        "n pozitif tam sayı;2 n+1 ve n+4 asal olacak. Yalnız n=1,2,3 adaylarından hangileri uygundur?",
      options: ["1 ve 3", "Yalnız 1", "Yalnız 2", "2 ve 3", "1,2,3"],
      knowledge: [
        "Her aday iki sayının asallığını sağlamalı; farklılık verilmediyse aynı asal olabilir.",
      ],
      strategy: "Üç adayı iki ifadeye ayrı yerleştir.",
      steps: [
        "n=1 için 3 ve 5 uygundur.",
        "n=2 için 5 ve 6 bulunur; 6 bileşiktir.",
        "n=3 için 7 ve 7 bulunur; ikisi de asaldır ve eşitlik yasaklanmamıştır.",
      ],
      optionReasons: [
        "1 ve 3 verilen adaylarda uygundur.",
        "n=3 de uygundur; ifadelerin farklı asal olması koşulu verilmemiştir.",
        "n=2 için ikinci ifade 6 olur; 6 bileşiktir.",
        "n=2 uygun değildir; n=2 ve3 kümesi yanlış adayı içerir.",
        "n=2 uygun değildir; üç adayın hepsi birden kabul edilemez.",
      ],
      check:
        "Yalnız sorulan üç aday değerlendirildi; diğer n değerleri için sonuç çıkarılmadı.",
      commonError: "Kaynakta olmayan farklılık koşulunu varsayma.",
    },
    {
      code: "H1",
      prompt:
        "121’in asallığını denetlerken karekök sınırındaki son asal aday hangisidir?",
      options: ["11", "7", "13", "5", "2"],
      knowledge: ["p²=n olan sınırdaki asal aday da denemeye dahildir."],
      strategy: "121 sayısının karekökünü bul.",
      steps: [
        "11²=121.",
        "11 adayı sınırda olduğu için atlanmamalıdır.",
        "121=11·11 bileşik.",
      ],
      optionReasons: [
        "11 sınırdaki asal adaydır; 11²=121 olduğundan sayıyı tam böler.",
        "7’de durmak 11 adayını atlar.",
        "13²>121 sınır dışı.",
        "5 sınıra kadar taramayı bitirmez.",
        "2 yalnız ilk adaydır.",
      ],
      check: "11 hem 1’den büyük hem 121’den küçüktür.",
      commonError: "Sınırı açık aralık olarak alma.",
    },
    {
      code: "H2",
      prompt: "14 ve 25 için hangi değerlendirme doğrudur?",
      options: [
        "Aralarında asaldırlar; ikisi de bileşiktir.",
        "İkisi de asaldır.",
        "Ortak bölenleri 7’dir.",
        "Ortak bölenleri 5’tir.",
        "Aralarında asal olmaları için ikisinin de asal olması gerekir.",
      ],
      knowledge: ["14=2·7,25=5² ve ortak asal tür bulunmaz."],
      strategy: "Bireysel asallık ve ortak böleni ayrı kontrol et.",
      steps: [
        "14 bileşik,25 bileşik.",
        "Asal türleri 2,7 ve 5 ayrıdır.",
        "EBOB 1, aralarında asal.",
      ],
      optionReasons: [
        "Bireysel ve ortak özellikler doğru ayrılmıştır.",
        "14’ün 2 ve 25’in 5 bölenleri vardır.",
        "7,25 sayısını bölmez.",
        "5 sayısı 14’ü bölmez; iki sayının ortak böleni olamaz.",
        "8 ve 9 gibi bireysel bileşikler de aralarında asal olabilir.",
      ],
      check: "Ortak bölen tek 1.",
      commonError: "En sade oranı tek tek asal sayı demek sanma.",
    },
    {
      code: "H3",
      prompt: "n pozitif tam sayı ve n²−1 asal. n ve çıktı sırasıyla nedir?",
      options: ["2 ve 3", "1 ve 0", "3 ve 8", "4 ve 15", "5 ve 24"],
      knowledge: ["(n−1)(n+1) pozitif tam çarpımı birim çarpan ister."],
      strategy: "Pozitif çıktıdan n>1 çıkar; ardından n−1=1 yaz.",
      steps: [
        "n>1 gerekir.",
        "n−1=1 eşitliği n=2 adayını verir.",
        "2²−1=3 asal.",
      ],
      optionReasons: [
        "2 koşulu sağlar ve çıktı 3.",
        "0 asal değildir.",
        "8 bileşik.",
        "15 bileşik.",
        "24 bileşik.",
      ],
      check: "İki çarpan 1 ve 3.",
      commonError: "Çarpım asal adayının sonucunu incelemeden bitirme.",
    },
    {
      code: "CHANGE-P2",
      prompt: "p, q farklı asal ve p+q=30. Çarpım için hangisi doğrudur?",
      options: [
        "Tek değer belirlenmez;7·23 ile 11·19 farklı uygun sonuçlardır.",
        "Çarpım kesin 56’dır.",
        "Biri 2 olmak zorundadır.",
        "Hiç uygun çift yoktur.",
        "Çarpım kesin 30’dur.",
      ],
      knowledge: [
        "Toplam 30 çift olduğundan tek toplam için kurulan gerekçe kullanılamaz.",
      ],
      strategy: "İki farklı asal çiftini koşula koy.",
      steps: [
        "7+23=30 ve 7,23 asal.",
        "11+19=30 ve 11,19 asal.",
        "Çarpımlar 161 ve 209 farklı; tek sonuç yok.",
      ],
      optionReasons: [
        "İki farklı geçerli çift tek değer iddiasını çürütür.",
        "2 ve 28 asal çifti değildir.",
        "2 dışındaki iki tek asal da çift toplam verir.",
        "7,23 geçerli bir çifttir.",
        "Geçerli örnekte çarpım 161;30 değil.",
      ],
      check: "Farklılık koşulu iki geçerli çiftte de sağlanır.",
      commonError:
        "Toplamı tek olsaydı geçerli gerekçeyi çifte aynen uygulama.",
    },
    {
      code: "CHANGE-P3",
      prompt:
        "a/b=24/54 ve a, b pozitif tam sayı. Aralarında asallık koşulu kaldırılırsa toplamın genel biçimi nedir?",
      options: ["13 t, t pozitif tam sayı", "13", "78", "4 t", "9 t"],
      knowledge: ["Oran 4/9 oranına sadeleşir; ortak çarpan t serbesttir."],
      strategy: "a=4t, b=9t yaz; ortak çarpan t’yi koru.",
      steps: ["24/54=4/9.", "a=4 t, b=9 t, pozitif tam t.", "Toplam 13 t."],
      optionReasons: [
        "Oran kısıtını ve ortak çarpanı doğru taşır.",
        "13 yalnız t=1 için bulunur; bütün izinli toplamları göstermez.",
        "78 yalnız t=6 için bulunur; bütün izinli toplamları göstermez.",
        "4 t paydır, toplam değil.",
        "9 t paydadır, toplam değil.",
      ],
      check:
        "t=1 ve t=2 için toplamlar 13 ve 26 olur; aynı oran farklı toplamlar verir.",
      commonError: "Koşul kalktığında önceki sabit cevabı koruma.",
    },
    {
      code: "CHANGE-P4",
      prompt:
        "n bu kez bütün tam sayılardan seçiliyor ve n²−25 asal. Bütün çözümler hangisidir?",
      options: ["{−6,6}", "{6}", "{−6}", "{−5,5}", "Boş küme"],
      knowledge: [
        "Kare işarete bağlı olmadığından negatif dal ayrıca denetlenir.",
      ],
      strategy:
        "Pozitif çıktıdan |n|>5 çıkar ve pozitif çarpanlarda birim çarpan koşulunu uygula.",
      steps: [
        "Asal çıktı pozitif olduğundan n²>25; dolayısıyla |n|>5.",
        "(|n|−5)(|n|+5) pozitif tam çarpanları için |n|−5=1, yani |n|=6 olmalıdır.",
        "n=6 ve n=−6 için çıktı 11 asaldır; başka tam sayı çözümü yoktur.",
      ],
      optionReasons: [
        "n=−6 ve n=6 adaylarının ikisi de asal çıktı 11’i verir.",
        "n=−6 da artık izinlidir; yalnız pozitif çözümü almak eksiktir.",
        "n=6 da geçerlidir; yalnız negatif çözümü almak eksiktir.",
        "±5 çıktı 0 verir.",
        "±6 uygundur.",
      ],
      check: "(−6)²−25=36−25=11.",
      commonError:
        "Önceki sorunun pozitiflik koşulunu bu soruya kendiliğinden taşıma.",
    },
    {
      code: "CHANGE-P1",
      prompt:
        "Yalnız 143’ün bileşikliğini kanıtlamak isteniyor. Hangi tek bulgu yeterlidir?",
      options: [
        "143=11·13",
        "143 tektir.",
        "143’ün son rakamı 3’tür.",
        "143,2’ye bölünmez.",
        "143,3 ile bölünmez.",
      ],
      knowledge: [
        "Asal olmadığını göstermek için 1 ve kendisi dışında bir pozitif bölen yeterlidir.",
      ],
      strategy: "Bir geçerli çarpan çifti ara.",
      steps: [
        "11·13=143 doğrudur.",
        "11 ve 13 ikisi de 1’den büyük.",
        "143 bileşiktir; diğer adayları taramaya gerekmez.",
      ],
      optionReasons: [
        "İki uygun çarpan bileşikliği kanıtlar.",
        "Teklik asallık veya bileşiklik kararı vermez.",
        "Son rakam 3 asallığı belirlemez.",
        "2’ye bölünmemesi tek başına yetersiz.",
        "3 ile bölünmemesi tek başına yetersiz.",
      ],
      check: "Doğru çarpım bütün sayıyı geri üretir.",
      commonError: "Bileşiklik için bütün bölenleri bulmayı gerekli sanma.",
    },
    {
      code: "M1-valid",
      prompt:
        "47 sayısı için gerekli asal adayları 2,3,5 denenmiş ve hiçbiri tam bölmemiştir. Doğru sonuç hangisidir?",
      options: [
        "47 asaldır.",
        "47 bileşiktir.",
        "7 denenmeden karar verilemez.",
        "11 denenmeden karar verilemez.",
        "Her tek sayı asal olduğundan asaldır.",
      ],
      knowledge: [
        "Bir asal adayın karesi sayıyı aştığında sonraki adayları denemek gerekmez.",
      ],
      strategy: "5²≤47<7² sınırını kullan.",
      steps: [
        "5²=25,7²=49.",
        "Gerekli adaylar 2,3,5 olup tamamı elenmiştir.",
        "47 asaldır; gerekçe yalnız tekliği değildir.",
      ],
      optionReasons: [
        "Gerekli adaylar bittiği için doğru sonuçtur.",
        "Gerekli hiçbir asal bölen yoktur.",
        "7²>47 olduğu için 7 gerekmez.",
        "11²>47 olduğu için 11 gerekmez.",
        "Sonuç doğru olsa da gerekçe yanlıştır;9 tek ve bileşiktir.",
      ],
      check: "47’nin 1 ve kendisi dışında pozitif böleni yoktur.",
      commonError: "Doğru sonuçla yanlış gerekçeyi karıştırma.",
    },
    {
      code: "M1-transfer",
      prompt:
        "31 nesne yalnız 1’li veya 31’li eş ve artıksız gruplara ayrılabiliyor. 31 için hangi yargı doğrudur?",
      options: [
        "Asaldır; pozitif bölenleri yalnız 1 ve 31’dir.",
        "Bileşiktir; iki böleni vardır.",
        "Asaldır; tek olduğu için.",
        "Asal değildir;3 rakamını içerir.",
        "1 de aynı nedenle asaldır.",
      ],
      knowledge: ["Eş artıksız grup boyları pozitif bölenleri temsil eder."],
      strategy: "Grup bilgisini bölen tanımına çevir.",
      steps: [
        "Uygun pozitif grup boyları 1 ve 31.",
        "31 sayısı 1’den büyük ve iki farklı pozitif bölenlidir.",
        "Tanıma göre asaldır.",
      ],
      optionReasons: [
        "Kaynak verisi doğrudan asal tanımını sağlar.",
        "Asalların tam iki farklı pozitif böleni vardır; iki bölen bulunması bileşiklik gerekçesi değildir.",
        "Teklik tek başına yeterli değildir.",
        "Sayıda 3 rakamının bulunması, sayının 3’e bölünmesi anlamına gelmez.",
        "1’in yalnız bir böleni vardır, iki farklı böleni yoktur.",
      ],
      check: "31 için 2,3,5 asal adayları da tam bölmez.",
      commonError: "Nesne sayısı ile grup boyunu ayır.",
    },
    {
      code: "M2-transfer",
      prompt: "n>2 tam sayı ve n²−4 asal. n ve çıktı hangi çifttir?",
      options: ["3 ve 5", "2 ve 0", "4 ve 12", "5 ve 21", "6 ve 32"],
      knowledge: [
        "n²−4=(n−2)(n+2); n>2 olduğundan iki çarpan da pozitif tam sayıdır.",
      ],
      strategy: "Küçük çarpanı 1 yap.",
      steps: ["n−2=1 gerekir.", "n=3 bulunur.", "3²−4=5 asaldır."],
      optionReasons: [
        "3 ve 5 koşulu sağlar.",
        "n>2 koşuluna uymaz ve 0 asal değil.",
        "12 bileşiktir.",
        "21 bileşiktir.",
        "32 bileşiktir.",
      ],
      check: "(3−2)(3+2)=1·5.",
      commonError: "Sadece ilk çarpanı değil, çıktıyı da denetle.",
    },
    {
      code: "M2-boundary",
      prompt:
        "x>1 tam sayı için 7(x−1) ve 6(x−1) ifadelerinin asal olması ayrı ayrı inceleniyor. Doğru karşılaştırma hangisidir?",
      options: [
        "İlki yalnız x=2 için asaldır; ikincisi hiçbir x>1 tam sayı için asal değildir.",
        "İkisi de yalnız x=2 için asaldır.",
        "İkisi de her x değerinde asal.",
        "İlki hiçbir x>1 tam sayı için asal değildir; ikincisi x=2 için asaldır.",
        "İlki x=1 için; ikincisi x=0 için asaldır.",
      ],
      knowledge: [
        "Sabit çarpan bileşikse birim çarpan seçmek ürünü asal yapamaz.",
      ],
      strategy: "Her ifadede x−1 pozitif tam sayı çarpanını ayır.",
      steps: [
        "7 asal olduğundan x−1=1, x=2 uygundur.",
        "6 bileşiktir; t pozitif tam sayıysa 6t de bileşiktir.",
        "İki ifadenin çözüm kümeleri farklıdır.",
      ],
      optionReasons: [
        "7·1 asal,6·1 bileşik; diğer t değerlerinde ürünler bileşik.",
        "6 asal değildir.",
        "x=3 için çıktılar 14 ve 12’dir; ikisi de bileşiktir.",
        "7·1=7 asaldır;6 hiçbir pozitif çarpanla asal olmaz.",
        "x=1 ve x=0 değerleri verilen x>1 koşulunu sağlamaz; ayrıca çıktıları asal değildir.",
      ],
      check: "Bir sonraki x=3 her ikisini bileşik yapar.",
      commonError: "Sabit çarpanın asallığını atlama.",
    },
    {
      code: "M3-transfer",
      prompt:
        "İki biletin numarası farklı asal sayılardır ve numaraların toplamı 15’tir. Numaralar hangisidir?",
      options: ["2 ve 13", "3 ve 12", "5 ve 10", "7 ve 8", "11 ve 4"],
      knowledge: ["İki asalın tek toplamında biri 2 olmalıdır."],
      strategy: "15−2’yi denetle.",
      steps: [
        "Bir numara 2.",
        "Diğer numara 13 ve asaldır.",
        "Toplam 2+13=15.",
      ],
      optionReasons: [
        "İki farklı asal koşulunu sağlar.",
        "12 bileşik.",
        "10 bileşik.",
        "8 bileşik.",
        "4 bileşik.",
      ],
      check: "13 için 2,3 adayları tam bölmez.",
      commonError: "Toplamı sağlayan her sayı çiftini asal çift sanma.",
    },
    {
      code: "M4-valid",
      prompt:
        "a, b aralarında asal pozitif tam sayılar; a/b=18/30. a ve b hangisidir?",
      options: ["3 ve 5", "6 ve 10", "9 ve 15", "18 ve 30", "1 ve 5"],
      knowledge: ["En sade oran aralarında asal çifti belirler."],
      strategy: "18 ve 30’u ortak bölenleri 6’ya bölerek sadeleştir.",
      steps: [
        "18/30=3/5.",
        "Genel çift 3 t,5 t; ortak bölen t.",
        "Aralarında asallık t=1 ister.",
      ],
      optionReasons: [
        "3 ve 5 ortak bölen 1 taşır.",
        "Oran doğru ama ortak bölen 2.",
        "Oran doğru ama ortak bölen 3.",
        "Oran doğru ama ortak bölen 6.",
        "1/5 oranı 18/30’a eşit değildir.",
      ],
      check: "3·30=5·18.",
      commonError: "Oran eşitliği tek başına aralarında asallık sağlamaz.",
    },
    {
      code: "M5",
      prompt:
        "18=2·3² için farklı asal tür sayısı, tekrarlı asal çarpan sayısı ve bütün pozitif bölen sayısı sırasıyla nedir?",
      options: ["2,3,6", "2,6,3", "3,2,6", "6,3,2", "2,2,4"],
      knowledge: [
        "Tür tabanları; tekrar üsleri; bölen bağımsız üs seçimlerini sayar.",
      ],
      strategy: "Üç sayacı ayrı hesapla.",
      steps: [
        "Asal tabanlar 2 ve 3: iki tür.",
        "Üsler 1+2=3 tekrar.",
        "Bölen sayısı (1+1)(2+1)=6.",
      ],
      optionReasons: [
        "Üç sayaç doğru sırada.",
        "Tekrar ile bölen sayısı yer değiştirmiştir.",
        "Tür ile tekrar sayısı yer değiştirmiştir.",
        "Bölen sayısını tür sanır.",
        "3’ün ikinci kopyasını ve üs seçimlerini eksik sayar.",
      ],
      check: "Bölen listesi 1,2,3,6,9,18.",
      commonError:
        "Asal etiket türü ile etiketin kaç kez tekrarlandığını ayır.",
    },
    {
      code: "K5-pairwise",
      prompt: "6,10,15 sayıları için hangisi doğrudur?",
      options: [
        "Üçünün ortak pozitif böleni yalnız 1’dir; ama her ikili aralarında asal değildir.",
        "Her ikili aralarında asaldır.",
        "Üçünün ortak böleni 2’dir.",
        "Üçünün ortak böleni 3’tür.",
        "Üçünün ortak böleni 5’tir.",
      ],
      knowledge: [
        "Bütün grubun ortak böleni ile ikili ortak bölen farklı koşullardır.",
      ],
      strategy: "İkili ortak bölenleri ayrı bul.",
      steps: [
        "EBOB(6,10)=2, EBOB(6,15)=3, EBOB(10,15)=5.",
        "2 sayısı 15’i, 3 sayısı 10’u, 5 sayısı 6’yı bölmez.",
        "Üçünün birlikte tek ortak pozitif böleni 1’dir.",
      ],
      optionReasons: [
        "İki düzeydeki koşulu doğru ayırır.",
        "6 ve 10 ortak 2 taşır.",
        "2, sayılardan 15’i bölmez; üçünün ortak böleni olamaz.",
        "3, sayılardan 10’u bölmez; üçünün ortak böleni olamaz.",
        "5,6’yı bölmez.",
      ],
      check: "EBOB(EBOB(6,10),15)=EBOB(2,15)=1.",
      commonError: "Üçlü EBOB 1 sonucunu ikişer ikişer EBOB 1 sanma.",
    },
    {
      code: "K4-different",
      prompt:
        "p, q birbirinden farklı asal sayılar ve p+q=4. Çözüm hakkında hangisi doğrudur?",
      options: [
        "Çözüm yoktur.",
        "p=q=2 çözümdür.",
        "p=1, q=3 çözümdür.",
        "p=0, q=4 çözümdür.",
        "p=−1, q=5 çözümdür.",
      ],
      knowledge: [
        "En küçük asal 2’dir; toplam 4 ancak 2+2 olur ama farklılık bunu dışlar.",
      ],
      strategy: "Asallık ve farklılığı aynı çiftte kontrol et.",
      steps: [
        "Her asal en az 2.",
        "Toplam 4 için ikisi de 2 olmalı.",
        "Birbirinden farklı şartı sağlanmaz.",
      ],
      optionReasons: [
        "Asallık ve farklılık birlikte hiçbir çift bırakmaz.",
        "2 ve 2 farklı değildir.",
        "1 asal değildir.",
        "0 ve 4 asal değildir.",
        "−1 bu asal tanımında değildir.",
      ],
      check: "Farklılık kaldırılırsa 2,2 uygundur.",
      commonError:
        "Verilen farklılığı unutma veya verilmediğinde kendin ekleme.",
    },
    {
      code: "K6-square",
      prompt: "p asal sayıdır. p²’nin farklı pozitif bölen sayısı kaçtır?",
      options: ["3", "2", "4", "p", "p+1"],
      knowledge: ["Bölenler p’nin 0,1,2 kuvvetlerinden oluşur."],
      strategy: "Asal tabanın izinli üslerini say.",
      steps: [
        "p²’nin asal çarpan ayrılışında tek asal taban p ve üs 2’dir.",
        "Üsler 0,1,2 seçilir.",
        "Bölenler 1, p, p²; üç farklı değer.",
      ],
      optionReasons: [
        "Üç üs seçimi üç bölen verir.",
        "2 yalnız üssü sayar; sıfırıncı kuvvetten gelen bölen 1’i dışlar.",
        "4 iki farklı asal taban varmış gibi sayar.",
        "p’nin büyüklüğü değil üs sayısı belirleyicidir.",
        "p+1 bütün p değerleri için doğru değildir; p=3 için 4 çıkar ama 9’un 3 pozitif böleni vardır.",
      ],
      check: "p=2 için 4 sayısının bölenleri 1,2,4.",
      commonError: "Asal tabanın üs sayısına 1 eklemeyi unutma.",
    },
  ],
  sheet: [
    {
      title: "Asal, 1 ve 2",
      text: [
        "Asal sayı 1’den büyük tam sayıdır ve tam iki farklı pozitif böleni vardır. 1 ne asal ne bileşik; 0 ve negatifler tanımın dışında. 2 tek çift asal; tek olmak yeterli değil. Asal rakamlar: 2,3,5,7.",
      ],
    },
    {
      title: "Bölen sınırı ve elek",
      text: [
        "Asallık için p²≤n koşulundaki asal adayların tamamını dene. Tek uygun bölen bileşikliği kanıtlar. 1–50 eleğinde 1’i dışla; 2,3,5,7’nin kendisi dışındaki katlarını ele. Eşitlik dahildir. 49 için 7’yi de dene.",
      ],
    },
    {
      title: "Çarpım, toplam ve koşul",
      text: [
        "Pozitif tam sayı çarpımı asal ise çarpanlardan biri 1’dir. Kare farkı: x²−y²=(x−y)(x+y); ardından işaret ve çıktının asallığını kontrol et. İki asalın toplamı tekse biri 2’dir; çift toplamda 2 zorunlu değil. Farklılık verilirse 2+2 dışlanır.",
      ],
    },
    {
      title: "Aralarında asal ve üç sayaç",
      table: divisorsOf72,
      text: [
        "a,b pozitif tam sayı olsun. EBOB(a,b)=1 aralarında asallıktır; iki sayı da bileşik olabilir. a/b=m/n en sade biçimde ve a,b aralarında asalsa a=m, b=n; koşul yoksa a=mt, b=nt, t pozitif tam sayıdır. N=pᵃqᵇ, p,q farklı asal ve a,b≥1: tür 2, tekrarlı çarpan a+b, pozitif bölen (a+1)(b+1).",
        "18=2·3² için üç kartın etiketleri 2, 3 ve 3 olsun. İki farklı etiket ve üç kart vardır. Pozitif bölen sayısı üs seçimlerinden (1+1)(2+1)=6 çıkar.",
      ],
    },
    {
      title: "Basamak, asal çarpan ve son kontrol",
      text: [
        "AB=10A+B, BA=10B+A; ikisi iki basamaklıysa A,B 1…9’dur. AB·BA çarpımı 30’a bölünüyorsa 2,3,5 koşullarını birlikte uygula: biri 5 rakamını, öteki çift rakamı taşır; rakam toplamı 3’ün katıdır. Adayı başlangıç koşuluna koy; tek örnek genel ispat değildir.",
      ],
    },
  ],
  source:
    "Aurelia TYT Asal Sayılar kopya kağıdı, 19.11.2026, içerik 1.2. PDF’nin 14 sayfasından öğretim uyarlaması. Kaynak sayfaları: MEB Temel Düzey Matematik 11/Ünite 1/çevrimiçi 50; MEB Hazırlık Matematik/Ünite 1/çevrimiçi 33 (basılı 45); Matematik 10 Sayılar teması. ÖSYM 2022 TYT Temel Matematik 14: PDF 28 (basılı 26), anahtar PDF 45, B=9. Çözüm açıklaması bize aittir. Pratik kartlar resmî sınav kartı değildir. Kaynak bağlantıları: https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematiktemelduzey/11/unite1/files/basic-html/page50.html ; https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/hzr/unite1/files/basic-html/page33.html ; https://tymm.meb.gov.tr/matematik-dersi/unite/244 ; https://dokuman.osym.gov.tr/pdfdokuman/2022/YKS/TSK/yks_2022_tyt.pdf#page=28 ; anahtar: https://dokuman.osym.gov.tr/pdfdokuman/2022/YKS/TSK/yks_2022_tyt.pdf#page=45 .",
  id: "tyt-mat-asal-kaynak-032",
  minutes: 90,
};
export const primeSource032Guides: LessonGuide[] = [
  {
    id: pack.id,
    minutes: pack.minutes,
    source: pack.source,
    objectives: [
      "Asallığı tanım ve yeterli bölen denemesiyle gerekçelendir.",
      "İşaret,sayı kümesi ve farklılık koşullarını her adımda koru.",
      "Asal çarpan,oran,bölen ve basamak problemlerini bağımsız çöz.",
    ],
    sections: pack.sections,
    examples: pack.examples,
    recall: pack.recall,
  },
];
export const primeSource032Lessons: Lesson[] = [
  {
    id: pack.id,
    title: txt(pack.title),
    subjectId: "tyt-matematik",
    minutes: pack.minutes,
    objectives: primeSource032Guides[0].objectives.map(txt),
    source: txt(pack.source),
    tags: ["kaynakli-anlatim", "Özgün öğretim soruları"],
    body: pack.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: pack.items.map((item, index): Question => {
      const order = item.options.map((_, i) => (i + ((2 * index + 1) % 5)) % 5);
      const guidance: QuestionGuidance = {
        knowledge: item.knowledge,
        strategy: item.strategy,
        steps: item.steps,
        optionReasons: order.map((i) => item.optionReasons[i]),
        commonError: item.commonError,
        check: item.check,
      };
      return {
        id: `f032-${pack.id}-${index + 1}`,
        prompt: txt(item.prompt),
        options: order.map((i) => txt(item.options[i])),
        answer: order.indexOf(0),
        hint: txt(item.strategy),
        explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
        skill: pack.id,
        guidance,
      };
    }),
  },
];
const repairItems = pack.items.filter(({ code }) =>
  ["H1", "H2", "H3"].includes(code),
);

export const primeSource032Sheets: CheatSheet[] = [
  {
    topicId: `topic-${pack.id}`,
    lessonId: pack.id,
    title: pack.title,
    subjectId: "tyt-matematik",
    sections: [
      ...pack.sheet,
      {
        title: "Önce üç onarım sorusunu çöz",
        text: [
          "121’i asal saymadan önce, karekök sınırında hangi asal adayı denemelisin?",
          "14 ile 25 aralarında asal mı? Her birinin asal olup olmadığını da söyle.",
          "n pozitif tam sayı ve n²−1 asal. Uygun n’yi ve elde edilen asal sayıyı bul.",
          "Üçünü de denedikten sonra aşağıdaki Onarım çözümleri bölümünü aç.",
        ],
      },
    ],
    cautions: [
      "Sayı kümesi,pozitiflik,farklılık ve en küçüklük koşullarını unutma.",
      "Asal olduğuna karar vermek için gerekli adayları bitir;bir bölen bileşikliği gösterir.",
      "Bir örnek genel ispat değildir;bulunan aday ilk koşullara geri konur.",
    ],
    examples: [
      ...pack.examples.slice(2, 4).map((e) => ({
        title: e.title,
        prompt: e.prompt,
        steps: e.steps.map((s) => s.explanation),
        answer: e.answer,
      })),
      {
        title: "Onarım çözümleri",
        prompt: "Her cevabın hangi koşula dayandığını kendi çözümünle karşılaştır.",
        steps: repairItems.map(({ steps }) => steps.join(" ")),
        answer: "Son aday 11’dir. 14 ile 25 aralarında asaldır ve ikisi de bileşiktir. Tek uygun n=2, elde edilen asal 3’tür.",
      },
    ],
    recall: pack.recall.slice(0, 3),
    source: pack.source,
  },
];
