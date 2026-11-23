import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
interface Powers039Item extends QuestionGuidance {
  code: string;
  prompt: string;
  options: string[];
}
interface Powers039Pack {
  id: string;
  title: string;
  minutes: number;
  source: string;
  sections: (GuideSection & { code: string })[];
  examples: (WorkedExample & { code: string })[];
  recall: { prompt: string; answer: string }[];
  items: Powers039Item[];
  sheet: CheatSection[];
}
// Private author proposal. Application registration and normal-entry acceptance are separate gates.
export const powersSource039Pack: Powers039Pack = {
  id: "tyt-mat-uslu-sayilar-kaynak-039",
  title: "Üslü sayılar: çarpan, koşul ve ölçeğin mantığı",
  minutes: 180,
  sections: [
    {
      code: "S01",
      title: "Çarpan sayısını sıkıştıran bir yazım",
      paragraphs: [
        "3+3+3+3=4·3, eşit terimlerin toplamını kısaltır. 3·3·3·3=3^4 ise eşit çarpanların çarpımını kısaltır. Bu iki işlem farklıdır: 4·3=12, 3^4=81. a^n yazımında a taban, n üstür. Pozitif tam sayı n, a’nın kaç kez çarpan olduğunu söyler. 2^5 beş tane 2’nin çarpımıdır; 2 ile 5’in çarpımı değildir.",
        "Bu ünitede tam sayı üsler negatif, sıfır ve pozitif tam sayıları; rasyonel üsler tam sayıların paydası sıfır olmayan oranlarını anlatır. Gerçek sayılar sayı doğrusundaki değerlerdir. Önce kesir işlemlerini ve işlem sırasını hatırla: çarpma/bölme, toplama/çıkarmadan önce yapılır. Kesrin paydası 0 olamaz. Her yeni kuvvet kuralında hangi ifadelerin tanımlı olduğunu ayrıca denetle.",
      ],
    },
    {
      code: "S02",
      title: "Parantez tabanın sınırını belirler",
      paragraphs: [
        "(-2)^4 ifadesinde taban bütünüyle-2’dir: (-2)(-2)(-2)(-2)=16. -2^4 yazımında üs yalnız 2’ye aittir; baştaki eksi dışarıdadır: -(2^4)=-16. İşlem sırası, önce kuvvet sonra dış eksi biçimindedir. Üs çiftken bu ayrım sonucu değiştirir.",
        "(-2)^3=-8 ve -2^3=-8 bu kez aynı değeri verir. Tek bir eşit örnek iki yazımın her koşulda aynı olduğunu kanıtlamaz. Parantez, bir kesrin tamamına da gerekebilir: (2/3)^2=4/9. 2/3^2 ise işlem sınırına göre 2/9’dur. Laboratuvarda dış eksi ile negatif tabanı ayrı ayrı karşılaştır; yalnız rengin değişmesini değil çarpanların hangi ifadeden geldiğini izle.",
      ],
    },
    {
      code: "S03",
      title: "Negatif tabanda tek ve çift üs",
      paragraphs: [
        "İki negatif çarpanın çarpımı pozitiftir. Negatif tabanın çift pozitif tam sayı kuvvetinde bütün eksi işaretleri çiftlenir ve sonuç pozitif olur. Tek pozitif tam sayı kuvvetinde bir eksi açıkta kalır ve sonuç negatiftir. (-3)^2=9, (-3)^3=-27.",
        "Bu çiftlik kuralı tam sayı üsler içindir. (-1)^n, n çift tam sayıysa 1, tek tam sayıysa-1 olur; negatif tam sayılarda da karşılık alma işareti değiştirmediği için aynı çiftlik düzeni sürer. (-1)^-3=-1. Kesirli üste “tek mi çift mi” sorusu yöneltilmez; önce rasyonel üssün sadeleşmiş paydasına ve gerçek tanım koşuluna bakılır.",
      ],
    },
    {
      code: "S04",
      title: "Birinci kuvvet, sıfır tabanı ve 1 tabanı",
      paragraphs: [
        "a^1=a bir tek çarpanı gösterir. 0^n=0, n pozitif tam sayı olduğunda geçerlidir; en az bir 0 çarpanı bütün çarpımı 0 yapar. 1’in tanımlı bütün gerçek kuvvetleri 1’dir. 1^100=1 ile 100^1=100 farklıdır; taban ve üs yer değiştirmez.",
        "Sıfır tabanını bütün kurallara sınırsız taşıma. 0^0 bu okul matematiği kapsamında tanımsız alınır. 0^-2 ise 1/0^2 gerektirdiği için tanımsızdır. “Sıfırın her kuvveti 0” önermesi bu iki durumu kaybeder. Bir süreçte 0. adım ayrıca başlangıç olarak tanımlanabilir; bu, 0^0’a genel bir sayı değeri atamak değildir.",
      ],
    },
    {
      code: "S05",
      title: "Sıfırıncı kuvvet neden 1?",
      paragraphs: [
        "a≠0 iken a^3/a^3=1. Aynı tabanlı bölüm kuralının devamı a^(3-3)=a^0 olmalıdır; bu nedenle a^0=1 tanımı kurallarla uyumludur. Benzer biçimde kuvvetleri birer azaltırken her adımda a’ya bölersin: a²→a¹→a⁰, yani a²→a→1.",
        "Gerekçede a’ya bölündüğü için a≠0 koşulu zorunludur. (7/3)^0=1, (-9)^0=1; fakat 0^0 için aynı gerekçe kullanılamaz. Sıfır üs sonucu 0 yapmaz; kaç kez toplama yapılacağıyla ilgili değildir. “Bütün sayıların sıfırıncı kuvveti 1” yerine “sıfırdan farklı tabanın sıfırıncı kuvveti 1” de.",
      ],
    },
    {
      code: "S06",
      title: "Negatif üs: karşılık, eksi sonuç değil",
      paragraphs: [
        "a≠0 ve n pozitif tam sayı için a^-n=1/a^n. Kuvveti bir azaltırken a’ya bölme düzeni 0’ın altına sürer: a^0=1, a^-1=1/a, a^-2=1/a². 5^-2=1/25 pozitiftir. Üsteki eksi, tabanın başına eksi ekleme komutu değildir.",
        "Negatif tabanın işareti ayrıca korunur: (-2)^-3=1/(-2)^3=-1/8; (-2)^-4=1/16. Tersine çevirirken bütün tabanı çevir: (3/4)^-2=(4/3)^2=16/9. Pay veya paydası 0 olan biçimlerde tanım alanını önce denetle; sıfırın çarpmaya göre tersi yoktur.",
      ],
    },
    {
      code: "S07",
      title: "Aynı tabanla çarpma: çarpanları say",
      paragraphs: [
        "a^m·a^n=a^(m+n), ifadeler tanımlı olduğunda geçerlidir. Pozitif tam sayı üslerde gerekçe doğrudan çarpan sayısıdır: a²·a³, toplam beş tane a çarpanı içerir. a≠0 koşuluyla negatif ve sıfır tam sayı üsler de aynı düzene katılır. 2^-3·2^5=2²=4.",
        "Tabanların aynı olması gerekir. 2³·3⁴ ifadesinde 3+4 yaparak tek bir tabanda yazamazsın. Tabanlar farklı ama üsler aynıysa başka bir özellik kullanılır. Tabanların ortaklaştırılabildiği durumlarda önce onları yaz: 4³·8²=(2²)³·(2³)². Kuralı işlemin çarpma olduğunu gördükten sonra seç; toplamada üsler toplanmaz.",
      ],
    },
    {
      code: "S08",
      title: "Aynı tabanla bölme: kalan çarpanlar",
      paragraphs: [
        "a≠0 için a^m/a^n=a^(m-n). Örneğin a⁵/a²’de iki ortak çarpan sadeleşir ve a³ kalır. Payın üssü daha küçükse sonuç negatif üs taşır: 2³/2⁵=2^-2=1/4. m/n yazmak, üsleri bölmek demektir ve genel kural değildir.",
        "Payda a^n olduğu için sıfır tabanı dışlanır;0⁵/0² bir sadeleştirme sorusu değil 0/0 tanımsızlığıdır. Çıkarma sırasına dikkat et: payın üssü eksi paydanın üssü. 3^-2/3^4=3^-6’dır; -2-4=-6. Üs işaretlerini parantezle yazmak, eksi bir üssü çıkarırken hata yapmayı azaltır.",
      ],
    },
    {
      code: "S09",
      title: "İç içe kuvvet: çarpım nerede ortaya çıkar?",
      paragraphs: [
        "((a^m)^n)=a^(m·n), tam sayı üslerde iki taraf tanımlıyken geçerlidir. (a²)³=(a²)(a²)(a²), altı a çarpanı içerir. Bu işlem, a²·a³ ile aynı değildir: orada beş çarpan vardır. Parantez ve dış üs, hangi kuralın seçileceğini belirler.",
        "Negatif tam sayı dış üs varsa önce tanımı kontrol et: (2³)^-2=1/(2³)²=2^-6. Bu bölümdeki tam sayı kuralını bütün rasyonel üslere negatif tabanda koşulsuz genelleme. ((-1)²)^(1/2)=1 iken(-1)^(2·1/2)=-1 olur. Genel rasyonel üs özdeşlikleri için pozitif taban koşulu güvenlidir; ayrı kök durumları kendi tanım koşuluyla ele alınır.",
      ],
    },
    {
      code: "S10",
      title: "Çarpımın ve bölümün kuvveti",
      paragraphs: [
        "(ab)^n=a^n b^n, tam sayı n ve tanımlı ifadeler için geçerlidir. (2·5)³=2³·5³=1000. Burada üs her çarpana uygulanır. (a/b)^n=a^n/b^n için b≠0; n≤0 olduğunda a da 0 olamaz. (3/4)^-2=3^-2/4^-2=(1/9)/(1/16)=16/9.",
        "Aynı dış üs bir toplamın terimlerine bu şekilde dağıtılamaz. (a+b)²=a²+2 ab+b²’dir; genel olarak a²+b² değildir. a=1, b=2 ile sol 9, önerilen toplam 5 çıkar. Bir kuraldaki çarpı işaretini artıya çevirmek yeni bir doğru kural üretmez.",
      ],
    },
    {
      code: "S11",
      title: "Aynı üs: farklı tabanları birleştirmek",
      paragraphs: [
        "a^n b^n=(ab)^n ve b≠0 iken a^n/b^n=(a/b)^n, tam sayı üslerde tanımlı ifadeler için kullanılabilir. 2⁵·5⁵=(2·5)⁵=10⁵. 12³/4³=(12/4)³=3³. Üsler eşit olduğu için tabanlar çarpılır veya bölünür.",
        "“Aynı taban” kuralıyla karıştırma: 2⁵·2³ aynı tabanlıdır ve 2⁸ olur; 2⁵·5⁵ aynı üslüdür ve 10⁵ olur. İkisinde de üsleri çarpmak doğru değildir. (a/b)^n biçiminde paydayı 0 yapan değerleri birleştirme işlemi gizleyemez; tanım alanı bütün dönüşümlerde korunur.",
      ],
    },
    {
      code: "S12",
      title: "Asal tabana geçmek neden işe yarar?",
      paragraphs: [
        "4; 8; 16 sayıları 2’nin; 9; 27; 81 sayıları 3’ün kuvvetleridir. Bu ortak yapı, büyük çarpımları açmadan üs hesaplaması yapmanı sağlar. (4³·8²)/2⁵ için 4³=2⁶,8²=2⁶; sonuç 2^(6+6-5)=2⁷=128 olur.",
        "Önce her tabanın dönüşümünü açık yaz, sonra dış üsleri çarp, en son çarpım/bölümde üsleri topla/çıkar. 12=2²·3 gibi bir taban tek bir asalın kuvveti değildir; çarpanlara ayırma özelliğiyle iki asalın kuvvetlerini ayrı izlersin. Her sayı çifti aynı pozitif tam sayı tabanının kuvveti olmak zorunda değildir;3⁵ ile 5³ gibi küçük karşılaştırmada doğrudan değer hesaplanabilir.",
      ],
    },
    {
      code: "S13",
      title: "Toplam ve farkta ortak çarpan",
      paragraphs: [
        "c·a^n+d·a^n=(c+d)a^n. Toplanan şey üsler değil, aynı a^n çarpanının katsayılarıdır. 3·2⁵+5·2⁵=(3+5)2⁵=8·32=256. a^n+a^(n+1)=a^n(1+a), tanımlı ifadeler için geçerlidir.",
        "Farklı üsleri ortaklaştırmak için ortak küçük kuvveti dışarı alabilirsin. 5^(n+3)-2·5^(n+2)=5^(n+2)(5-2)=3·5^(n+2). Üstteki+3’ü katsayı 3 sanma;5^(n+3)=5^(n+2)·5’tir. Ortak çarpanı açarak başlangıç ifadesini geri üretmen, dönüşümü denetler.",
      ],
    },
    {
      code: "S14",
      title: "Kural uydurmamak için küçük karşı örnek",
      paragraphs: [
        "2³+2⁴=8+16=24;2⁷=128. Aynı taban, toplamada üsleri birleştirmeye yetmez. (1+2)²=9;1²+2²=5. Üs, toplam üzerine genel olarak dağıtılmaz. 2^3 ile 3^2 bile 8 ve 9’dur; tabanla üssün yer değiştirmesi bir özdeşlik değildir.",
        "Yanlış olduğu düşünülen genel bir önermeyi sınarken tanımlı küçük sayılar seç ve iki tarafı ayrı hesapla. Bir tek farklılık, “her zaman” iddiasını çürütür. Birkaç eşit sonuç ise genel kanıt değildir. (-2)³ ve-2³’ün aynı çıkması, çift üsteki parantez farkını ortadan kaldırmaz. Bu yaklaşım, benzer görünen ama işlemi değişen sorularda doğru yöntemi seçmene yardım eder.",
      ],
    },
    {
      code: "S15",
      title: "Verilen kuvveti bir bütün olarak kullan",
      paragraphs: [
        "2^x=A,3^x=B veriliyorsa 6^x=(2·3)^x=AB, çünkü tabanlar pozitiftir. 2^x=5 iken 8^x=(2³)^x=(2^x)³=125. x’in kendisini bulmak çoğu zaman gereksizdir; sorunun verdiği bütün kuvveti yerine koy.",
        "75^x için 75=3·5²;3^x=A,5^x=B verilirse sonuç AB² olur. 0,18^x için 0,18=9/50=3²/(2·5²);2^x=A,3^x=B,5^x=C ile B²/(AC²) elde edilir. Negatif asal kuvvetler kesrin paydasında karşılık olarak görünür. Ortak üs gerçek de olsa burada kullanılan asal tabanlar pozitif olduğundan bu ayrıştırmalar geçerlidir.",
      ],
    },
    {
      code: "S16",
      title: "Üslü denklemde ortak taban ve farklı üsleri ayırt etmek",
      paragraphs: [
        "a>0 ve a≠1 iken a^u=a^v ancak u=v olduğunda olur. Taban 1’den büyükken kuvvet fonksiyonu artar;0<a<1 iken azalır; her iki durumda da farklı üs aynı değeri vermez. 8^(x-1)=4^(x+2) için ortak taban 2 olur:3(x-1)=2(x+2).",
        "Sonra doğrusal denklemi çöz:3 x-3=2 x+4 →x=7. Bulduğun değeri özgün üslü ifadede denetle:8⁶=4⁹=2¹⁸. Üsleri eşitlemeden önce tabanın koşulunu yaz; yalnız iki tarafta benzer bir a görmek yeterli değildir. Bu modelde üsler ax+b biçimindedir; genel bütün üslü denklemler için tek bir yöntem iddiası yoktur.",
      ],
    },
    {
      code: "S17",
      title: "Denklem bazen bir, hiç veya sonsuz çözüm verir",
      paragraphs: [
        "9^(x-1)=27 için 2 x-2=3 →x=5/2. Çözümün tam sayı olması gerekmez; x’in kümesi soruda verilene göre belirlenir. 3^(2 x+1)=3^(2 x+4) ise 1=4 çelişkisine gider ve gerçek çözümü yoktur.",
        "1^(2 x+3)=1^(x-4), bütün gerçek x’lerde 1=1’dir; üsleri eşitleyip tek kök üretmek yanlıştır. Negatif tabanlarda ayrıca tanım alanı ve çiftlik devreye girer: x tam sayı koşuluyla(-1)^x=1’in çift tam sayı çözümleri vardır. Bu, “negatif tabanlı hiçbir denklem çözülmez” demenin de yanlış olduğunu gösterir. 0 tabanında negatif/sıfır üsler ayrı tanım kontrolü ister.",
      ],
    },
    {
      code: "S18",
      title: "Aynı pozitif tabanda karşılaştırma",
      paragraphs: [
        "a>1 ise üs arttıkça a^x artar. 5⁴>5²; çünkü aralarındaki oran 5²=25>1. 0<a<1 ise üs arttıkça değer azalır. (1/3)⁷<(1/3)⁴; daha fazla 1/3 çarpanı, pozitif değeri küçültür.",
        "a=1’de bütün kuvvetler eşittir. Negatif tabanda bu tek yönlü sıralama kuralı kullanılmaz; tam sayı üslerde işaret tek/çiftliğe göre değişebilir. Karşılaştırma laboratuvarı önce ortak pozitif taban koşulunu gösterir, sonra iki gerçek değeri ve oranı üretir. Koşul sağlanmadığında “büyük üs büyük” ya da tersi bir etiket vermek yerine değerleri ayrı hesapla.",
      ],
    },
    {
      code: "S19",
      title: "Ortak üs, farklı taban ve sıralama",
      paragraphs: [
        "Pozitif tabanlar ve pozitif tam sayı n için a>b>0 ise a^n>b^n olur. Negatif n’de karşılık alma sıralamayı tersine çevirir; n=0’da iki değer 1 olur. Bu yüzden yalnız üslerin eşit olması yönü belirlemeye yetmez; üssün işareti de önemlidir.",
        "2¹⁸ ile 8⁶ aynı tabana çevrilince eşittir. 3⁵ ile 5³ için yalnız 3<5 veya 5>3 bilgisi yeterli değildir;243>125 doğrudan hesaplanır. Ortak taban/üs yoksa değerleri hesaplamak, oran kullanmak veya uygun sınırlar bulmak gerekebilir. İki pozitif sayının oranı 1’den büyükse pay büyüktür; eşitse eşittir; küçükse pay küçüktür.",
      ],
    },
    {
      code: "S20",
      title: "Kesirli üs: kök ile kuvvetin bağlantısı",
      paragraphs: [
        "a>0, m tam sayı ve n pozitif tam sayı için a^(m/n)=(ⁿ√a)^m=ⁿ√(a^m). Payda kökün derecesini, pay alınan kuvveti söyler. 8^(2/3)=(∛8)²=2²=4. 27^(-2/3)=1/(∛27)²=1/9.",
        "Üssü önce sadeleştir:4/6=2/3 aynı rasyonel sayıdır. Negatif pay karşılık aldırır; tabanı negatif yapmaz. Bazı sonuçlar tam kesir olmaz:2^(1/2)=√2 köklü biçimde kalır. Model bu durumda “irrasyonel, köklü biçim” diye ayırır; yuvarlanmış ondalığı tam eşitlik olarak sunmaz. Genel köklü sayılar ünitesinin kurallarını burada kullanılan pozitif taban koşuluyla ilişkilendir.",
      ],
    },
    {
      code: "S21",
      title: "Negatif tabanda rasyonel üssün gerçek olması",
      paragraphs: [
        "m/n en sade biçimde ve n>0 olsun. Negatif tabanda n tekse gerçek tek dereceli kök kullanılabilir: (-8)^(1/3)=-2. n çiftse gerçek kök yoktur: (-16)^(1/2), gerçek sayılarda tanımlı değildir. Bu nedenle “negatif tabanın bütün kesirli kuvvetleri tanımsız” önermesi de eksiktir.",
        "Sadeleştirme zorunludur: (-8)^(2/6)=(-8)^(1/3)=-2, rasyonel üs en sade biçiminden yorumlanır. Bunu koşulsuz⁶√((-8)²)=+2 diye dönüştürmek eşitliği bozar. Pozitif tabanda güvenle kullandığın kök-kuvvet dönüşümünü negatif tabana aynen kopyalama. Sıfır tabanda pozitif rasyonel üs 0, sıfır veya negatif üs ise bu kapsamda tanımsızdır.",
      ],
    },
    {
      code: "S22",
      title: "İç içe rasyonel üslerde koşulu geri getir",
      paragraphs: [
        "a>0 için(a^r)^s=a^(rs), r ve s rasyonel olduğunda tanımlı pozitif kuvvetlerle kullanılabilir. Negatif a için iki tarafın ayrı ayrı tanımlı olması bu özdeşliğe yetmez. ((-1)²)^(1/2)=√1=1; (-1)^(2·1/2)=(-1)¹=-1. İki taraf da gerçek ama farklıdır.",
        "Doğru akış: önce ilk parantezin değerini hesapla; sonra dış kuvvetin tanımını denetle. Bir kısa yolun koşulunu sağlamıyorsan onu kullanma. Laboratuvardaki iki ayrı işlem yolu aynı girdiden bağımsız hesaplanır ve değerleri yan yana gösterilir. Farklılık bir çizim hatası değil, genellemenin sınırını öğretir. Tam sayı üsler için daha önce kurulmuş kuralla rasyonel genişletmeyi ayrı tut.",
      ],
    },
    {
      code: "S23",
      title: "Onun kuvvetleri ve ondalık basamak",
      paragraphs: [
        "10³=1000,10²=100,10¹=10,10⁰=1. Üs her 1 azaldığında 10’a bölersin:10^-1=0,1;10^-2=0,01;10^-3=0,001. Büyük sayıyı küçük katsayıyla, çok küçük sayıyı da okunur bir katsayıyla yazmak bu düzen sayesinde mümkün olur.",
        "Ondalık virgülü bir basamak sağa taşımak katsayıyı 10 kat büyütür; eşitliği korumak için dış 10 kuvveti 1 azalmalıdır. Sola taşımak katsayıyı 10’a böler; dış üs 1 artmalıdır. Dönüşümü yalnız “sağa artı, sola eksi” ezberiyle değil değeri sabit tutarak denetle. 7,2×10⁶ ile 72×10⁵ aynı değerdir.",
      ],
    },
    {
      code: "S24",
      title: "Bilimsel gösterim: değer ve standart iki ayrı kontrol",
      paragraphs: [
        "Sıfırdan farklı gerçek bir sayı a×10^n biçiminde bilimsel gösterilir: n tam sayı,1≤|a|<10. Negatif sayıda katsayı da negatif olabilir: -30000=-3×10⁴. |a| koşulu işareti değil büyüklüğü denetler. Sıfır için bu normalleştirme aralığı uygulanmaz;0 ayrı yazılır.",
        "810000000=8,1×10⁸ ve 0,00042=4,2×10^-4. 810×10⁶ ilk sayıya eşittir ama katsayı 810 standart değildir. Soruda “bilimsel gösterim” istendiğinde yalnız eşit değeri bulmak yetmez; katsayı aralığını da doğrula. Bu standart, pozitif sayılarda basamak karşılaştırmasını kolaylaştırır.",
      ],
    },
    {
      code: "S25",
      title: "Normalleştirirken miktarı korumak",
      paragraphs: [
        "72×10⁵=7,2×10×10⁵=7,2×10⁶. Katsayı÷10, dış kuvvet×10 olduğundan toplam değer aynıdır. 0,36×10⁸=3,6×10^-1×10⁸=3,6×10⁷. Katsayı×10 olunca dış üs 1 azalır.",
        "Katsayı tam 10 olduğunda üst sınırın dahil olmadığını unutma:10×10³=1×10⁴. Katsayı 0 ise başka üs seçerek 1≤|a| koşuluna getirilemez; sayı sıfırdır. Laboratuvar kesirle tam değer saklar ve normalleştirilmiş katsayı ile üssü aynı sayının üzerinden üretir; kayan virgül yuvarlaması normalleştirme anahtarı değildir.",
      ],
    },
    {
      code: "S26",
      title: "Bilimsel çarpma ve bölme",
      paragraphs: [
        "(a×10^m)(b×10^n)=(ab)×10^(m+n). (6×10⁷)(4×10^-3)=24×10⁴=2,4×10⁵. Önce katsayı işlemi ve üs işlemi ayrı yapılır; sonra katsayı standart aralığa getirilir. Son normalleştirme,10’un üssünü değiştirebilir.",
        "Bölmede b≠0 için(a×10^m)/(b×10^n)=(a/b)×10^(m-n). (9×10⁵)/(3×10²)=3×10³. Üslerde pay eksi payda sırasını koru; negatif üssü çıkarırken parantez kullan. Bilimsel çarpma veya bölme için kullanılan üs kuralları, iki sayının toplamına aynen uygulanmaz.",
      ],
    },
    {
      code: "S27",
      title: "Bilimsel toplama ve çıkarma",
      paragraphs: [
        "Toplama ve çıkarmada önce aynı 10 kuvvetini ortak yap. 6×10⁵+4×10⁶=0,6×10⁶+4×10⁶=4,6×10⁶. İstersen 10⁵ tabanında(6+40)×10⁵=46×10⁵=4,6×10⁶ de yazabilirsin. İki yol aynı değeri vermelidir.",
        "2×10⁴-7×10³=(20-7)×10³=13×10³=1,3×10⁴. Sonuç 0 veya negatif de olabilir; katsayıyı işaretli değerlendir. 10’un üslerini toplamak yalnız çarpmanın kuralıdır. Toplamdaki terimler farklı basamak büyüklüklerinde duruyorsa katsayıları doğrudan toplama.",
      ],
    },
    {
      code: "S28",
      title: "Bilimsel gösterimde karşılaştırma ve işaret",
      paragraphs: [
        "Normalleştirilmiş iki pozitif sayıda önce 10’un üssü, eşitse katsayı karşılaştırılır. 7,2×10⁶ >9,1×10⁵; ilk sayı milyon, ikincisi yüz bin büyüklüğündedir. Aynı üs varsa 4,2×10³<8,1×10³.",
        "Negatif iki sayıda mutlak değerler arasındaki sıra ters döner: -2×10⁵=-200000, -9×10⁴=-90000; ilki daha küçüktür. Pozitif sayının negatiften büyük olması işaretle belirlenir. “Büyük üs daima büyük sayı” ifadesini işaretten ve normalleştirmeden bağımsız bir kural gibi kullanma. Karşılaştırma modeli tam kesirleri kıyaslar; bilimsel etiket sonucu açıklayan temsildir.",
      ],
    },
    {
      code: "S29",
      title: "Çizginin ölçeğini oku: doğrusal ve logaritmik",
      paragraphs: [
        "Doğrusal sayı doğrusunda eşit aralıklar eşit farkları gösterir. Logaritmik doğruda 10¹,10²,10³ eşit uzaklıkta durur; her adımda değer 10 katına çıkar. Bu yüzden 100 ile 1000 arasındaki orta nokta 550 değildir; logaritmik ortası 10^2,5≈316,23’tür.",
        "8,1×10⁸ değeri 10⁸ ile 10⁹ arasındadır;10⁹ noktasının tam üstünde değildir. log₁₀ konumu 8 + log₁₀(8,1) ≈ 8,9085’tir. log₁₀(X),10’un hangi üssünün X olduğunu belirtir. Bu ondalık yalnız çizimde yaklaşık konum içindir; sayı değeri tam kesirle korunur. Model, eksenin türünü ve görünür aralığı yazar. Negatif ve sıfır değerler gerçek logaritmik eksene yerleştirilmez; çizim için onları sessizce pozitife dönüştürmek yanlıştır.",
      ],
    },
    {
      code: "S30",
      title: "Üstel süreçte başlangıç 0. adımdır",
      paragraphs: [
        "Başlangıç miktarı N, her tamamlanan adımın çarpanı q olsun. Pozitif q ve tam sayı t≥0 için miktar N·q^t olur. Başlangıç 200, q=2, t=6 için 200·2⁶=12800. Başlangıcı 0. adım diye göster:0’da 200,1’de 400,2’de 800. Böylece ilk değeri bir katlama sanıp bir çarpan eksiltmezsin.",
        "q>1 ve N>0 büyüme,0<q<1 azalma, q=1 sabit değer verir. N=0 ise bütün değerler 0’dır. Yarılanmada q=1/2, üç katına çıkmada q=3 seçilir. Her adımda sabit sayı ekleniyorsa model üstel değil doğrusaldır; “iki artıyor” ile “iki katına çıkıyor” farklıdır.",
      ],
    },
    {
      code: "S31",
      title: "Sıfır çarpanı ve modelin sınırları",
      paragraphs: [
        "q=0 sürecinde başlangıç ayrı tanımdır: t=0’da N, ilk tamamlanan adımdan sonra 0, sonraki adımlarda 0. Bunu N·0⁰ hesaplayarak gerekçelendirme;0. adım başlangıç verisidir ve 0⁰ bu okul kapsamındaki tanımsızlığını korur. Laboratuvarda “başlangıç değeri” etiketi bu ayrımı görünür yapar.",
        "Hücre veya bakteri sayısı gibi gerçek bir bağlamda kesirli sonuç modelin uygunluğunu sorgulatabilir; burada çizilen seri idealize edilmiş sabit çarpan modelidir. Grafik her seçili adımın tam değerinden hesaplanır; son noktayı bağımsız formülle uydurmaz. Değer büyüdükçe eksen aralığı da yeniden hesaplanır; çizimdeki yükseklik ile sayı aynı veri kaynağını kullanır.",
      ],
    },
    {
      code: "S32",
      title: "Yöntemi işlemin yapısına göre seç",
      paragraphs: [
        "Önce parantez ve tanım alanı, sonra işlem türü: çarpma/bölmede ortak taban; aynı üste taban çarpımı/bölümü; iç içe kuvvette koşullu üs çarpımı; toplam/farkta ortak çarpan; denklemde uygun ortak taban ve tek değer; karşılaştırmada tabanın 1’e göre yeri; bilimsel toplamda ortak 10 kuvveti; süreçte başlangıç ve adım çarpanı.",
        "Çözümü bitirince yalnız seçeneği değil gerekçeyi kontrol et. Negatif üs karşılık mı aldırdı? Sıfır payda doğdu mu? Bilimsel katsayı 1≤|a|<10 aralığında mı? Bulunan x özgün ifadede eşitlik veriyor mu? Sonuç işareti ve yaklaşık büyüklük makul mü? Küçük farklı bir örnekte yöntemin hangi koşulla değiştiğini anlat; sadece aynı sayıları tekrar etmek aktarımı göstermez.",
      ],
      table: {
        headers: ["Yapı", "İlk düşünce", "Koşul/hata kontrolü"],
        rows: [
          [
            "a^m·a^n / a^m÷a^n",
            "Üsleri topla / çıkar",
            "Aynı taban; bölümde a≠0",
          ],
          [
            "(a^m)^n",
            "Tam sayı üslerde çarpım",
            "Rasyonel genişletmede pozitif taban",
          ],
          ["c a^n+d a^n", "Ortak çarpan", "Üsleri toplama"],
          ["a^u=a^v", "Uygun tabanda u=v", "a>0, a≠1"],
          [
            "N, q, adım",
            "Başlangıç 0; tekrarlı çarpım",
            "q=0’da başlangıç ayrıca tanımlı",
          ],
        ],
      },
    },
    {
      code: "S33",
      title: "Seçili OGM örneklerinde kuralları zincirlemek",
      paragraphs: [
        "Bir ifade aynı anda negatif üs, negatif taban ve ortak asal taban içerebilir. Önce tanımlı olmasını sağla; a^-6 gibi terimler varsa a≠0 yaz. Sonra işaretleri ve üsleri ayrı izle. (-a)^4 pozitif işaretli a⁴, (-a)^5 ise-a⁵ olur. İki negatif bölüm çarpanı işareti yeniden değiştirebilir; bütün ifadeye tek bir eksi yakıştırma.",
        "Verilen kuvvetle kurulan sorularda ara taban verilmiş olabilir. 15^x=A ve 3^x=B ile 75=15²/3 olduğundan 75^(2 x)=(15^x)^4/(3^x)^2=A⁴/B². 5^x=2 iken 25^(2 x+1)=5^(4 x+2)=(5^x)^4·25=400. Önemli olan sorunun biçimini görmek, her seferinde x’i bulmak değildir. Aşağıdaki seçili altı OGM çözümü doğrudan incelenen tek sayfanın işlemlerini adım adım açıklar.",
      ],
    },
    {
      code: "S34",
      title: "Kendi kendine hatırlama ve kaynak sınırı",
      paragraphs: [
        "Not kapalıyken önce tanımı söyle, sonra iki farklı örnek çöz ve bir yanlış yönteme karşı örnek üret. İlk çalışma 1. gün, tekrarlar 3., 7. ve 21. gündür; tekrar sırasında yalnız okumak yerine yöntemi neden seçtiğini söyleyip yeni soruyu kendi başına çöz. Bir yanlışta önce tanım mı, işaret mi, koşul mu, işlem mi kaçtı onu belirle ve kısa bir düzeltme notu yaz.",
        "Bu ders güncel 16 sayfalık Üslü Sayılar kâğıdından ve daha önce doğrudan incelenen bir OGM özet sayfasından uyarlanmıştır. ÖSYM 2019 MSÜ Temel Matematik 2 için birim başına hesap ve sonuç resmî kitapçık görseliyle doğrulandı. Ders, çözüm yolunu kendi ifadeleriyle açıklar. 55 soru kartı özgün öğretim sorusudur. Sınav arşivi kısmen incelenmiştir. Ustalık ve XP için bağımsız soru yanıtları değerlendirilir.",
      ],
    },
    {
      code: "S35",
      title: "Ortak kuvvetle toplamdan denkleme geç",
      paragraphs: [
        "2^(x+1)+2^x=24 denkleminde x gerçek sayı olsun. 2^(x+1)=2·2^x olduğundan sol tarafın iki terimi de 2^x çarpanı taşır. Dağıtma özelliğini ters yönde uygula: 2^x(2+1)=24. Buradan 2^x=8=2³ çıkar. Pozitif ve 1’den farklı taban 2’de eşit değerler aynı üsten gelir. Böylece x=3.",
        "Özgün denkleme dön: 2⁴+2³=16+8=24. 2^(2x+1), soldaki iki kuvvetin çarpımını temsil eder. Toplamı bu ifadeye dönüştürürsen başka bir denklem kurarsın. 0, 1 ve negatif tabanları ayrıca incele. Örneğin 0²=0⁵=0 ve (-1)²=(-1)⁴=1; üslerin eşitliği iki örnekte de çıkmaz.",
      ],
    },
    {
      code: "S36",
      title: "Kök, kuvvet, karşılık sırasıyla hesapla",
      paragraphs: [
        "16^(-3/4) için dördüncü dereceden pozitif kök 2’dir, çünkü 2⁴=16. Üs payının mutlak değeri 3 olduğu için kökü üçüncü kuvvete çıkar: 2³=8. Pay negatif olduğu için karşılığını al: 1/8. Üsteki eksi sonuç işaretini belirlemez. Kontrol olarak sonucun dördüncü kuvvetini al: (1/8)⁴=1/4096=16^-3.",
        "a>0 iken sadeleşmiş m/n üssünde n pozitif kök derecesi, m kökün kuvvetidir. Negatif tabanda sadeleşmiş payda tekse gerçek kök vardır. (-8)^(2/6)=(-8)^(1/3)=-2, (-8)^(-1/3)=-1/2. Sadeleşmiş payda çiftse gerçek sayı sonucu yoktur. Kök tam rasyonel çıkmayabilir: 2^(1/2)=√2, yaklaşık bir ondalık yazılsa da tam sonuç köklü biçimde kalır.",
      ],
    },
    {
      code: "S37",
      title: "Yüzde azalmadan kalan çarpana geç",
      paragraphs: [
        "Bir stokta her tur mevcut miktarın %p’si kayboluyorsa kalan pay p/100 değil, 1−p/100 olur. Örneğin her tur %50 azalan 800 birim stokta çarpan 1/2’dir. Başlangıçtan itibaren 800 → 400 → 200 → 100 izlenir. Dört konum, üç tamamlanan turdur. Her tur ilk stok yerine bir önceki miktarın yarısını al.",
        "Yüzde azalma modeli 0≤p≤100 koşuluyla kullanılır. %0 için değer sabit kalır. %100’de başlangıç miktarı 0. adımda korunur ve ilk turdan itibaren miktar sıfırdır. Son durum 0^0 hesaplamasını gerektirmez. Bir miktarın her tur dörtte biri kalıyorsa azalma %75, çarpan 1/4’tür. 400 birimin üç tur sonraki değeri 400/64=25/4=6,25 birimdir.",
      ],
    },
    {
      code: "S38",
      title: "Günlük veriyi birim başına ölçekle",
      paragraphs: [
        "2019 MSÜ Temel Matematik 2. sorudaki verilerle çözüm kurgusu: günlük 6 milyon ekmek üzerinden üç günde 18 milyon ekmek eder. Üç günlük eşdeğer iki okula karşılık geldiğinden okul başına 9 milyon ekmek bulunur. 81 okul için 81·9·10⁶=729·10⁶ gerekir. Önce günlük toplamı üç güne çıkar, sonra iki okula böl, ardından okul sayısıyla çarp.",
        "81=3⁴ ve 9=3² olduğundan 81·9·10⁶=3⁶·10⁶=(3·10)⁶=30⁶=729 000 000. Standart bilimsel yazım 7,29×10⁸’dir. Kontrol için toplamı okul başına 9 milyona böl; 81 okul elde edersin. Resmî kitapçık PDF 24. sayfa, basılı 22’de E sonucunu gösterir. 8,1×10⁸ ise bu derste ayrı bir normalleştirme ve sayı doğrusu örneğidir.",
      ],
    },
    {
      code: "S39",
      title: "İşlemin yapısına göre yöntemi seç",
      paragraphs: [
        "İlk sütundaki işlemi tanı, ardından kuralın hangi koşulla çalıştığını söyle. Aynı aritmetik yapıyı yeni bir bağlamda bulduğunda giriş değerlerini ve birimleri yeniden belirle. Sonucun doğru biçimde olduğunu başlangıç ifadesine dönerek denetle.",
      ],
      table: {
        headers: ["Yapı", "İlk hamle ve denetim", "Başka bağlam"],
        rows: [
          [
            "Aynı tabanlı çarpım ve bölüm",
            "2³·2⁵/2²=2⁶=64. 2³+2⁵=40; toplama bu kuralı kullanmaz.",
            "8 rafta 32’şer kutu 4 eş gruba ayrılırsa grup başına 64 kutu.",
          ],
          [
            "İç içe kuvvet",
            "(3²)⁴=3⁸; 3²·3⁴=3⁶. Parantez dışındaki üs grupla çarpımı değiştirir.",
            "4 adım art arda 9 kat: 9⁴=(3²)⁴.",
          ],
          [
            "Toplamda ortak çarpan",
            "5^n+5^(n+1)=6·5^n. İşaret çarpım olursa 5^(2n+1) elde edilir.",
            "25 ve 125 parçalık partilerin toplamı 25(1+5).",
          ],
          [
            "Eşit değerli kuvvetler",
            "8^(x−1)=4^(x+2) taban 2’ye iner, x=7. Taban 1’de üs eşitleme zorunlu değildir.",
            "Kapasite 1’den başlayarak iki katına çıkıyorsa 256 için 2^t=2⁸.",
          ],
          [
            "0 ile 1 arası taban",
            "(1/3)⁴>(1/3)⁷, fakat 3⁴<3⁷. Aynı üs çiftini taban değiştirdiğinde tekrar denetle.",
            "Dört tur sonra kalan 1/81 pay, yedi turdaki 1/2187 paydan büyüktür.",
          ],
          [
            "Bilimsel gösterim",
            "81·10⁷=8,1·10⁸; 81·10⁸=8,1·10⁹. Birliği ve aralığı geri açarak doğrula.",
            "9 kutuda 2’şer milyon parça: 1,8·10⁷.",
          ],
          [
            "Başlangıç ve tamamlanan adımlar",
            "60·2⁵=1920. 60·2⁴=960 yalnız dört tamamlanan turu sayar.",
            "400 birim her tur dörtte bire inerse üç tur sonunda 25/4 kalır.",
          ],
          [
            "Aynı üslü çarpım",
            "2⁵·5⁵=10⁵, 2⁵+5⁵=3157. İşlem işaretini koru.",
            "32 kolinin her birinde 3125 parçanın toplamı 100 000.",
          ],
          [
            "Rasyonel ve negatif üs",
            "16^(-3/4)=1/8. Kök derecesini, kuvveti ve karşılığı ayrı izle.",
            "Üç kez yarıya inen 8 cm uzunluk 8·2^-3=1 cm.",
          ],
        ],
      },
    },
    {
      code: "S40",
      title: "Önce dene, ardından hatanın başladığı adımı bul",
      paragraphs: [
        "(9²·27)/3⁴ ifadesinde 9=3^□ ve 27=3^□. Payın toplam üssünü □ kutusuna yaz. Paydanın 4 üssünü çıkardıktan sonra sonucu bul. Kutuları doldurduğunda “Ortak tabana çevirirken boşlukları doldur” başlıklı örnekte çözümü adım adım aç.",
        "Şimdi dört kısa işlem dene: 3²+3³’ü ortak çarpanla bul. (5²)³’ü tek kuvvet ve sayı olarak yaz. 5^-2’nin değerini ve işaretini gerekçelendir. 0,0009’u bilimsel gösterime çevirip geri aç. Sonuçları “Dört yanlışın ilk bozulduğu adım” örneğini açarak karşılaştır; ilk hatalı geçişi düzelt ve farklı sayılarla yeniden dene.",
      ],
    },
  ],
  examples: [
    {
      code: "E01",
      title: "Çarpma mı kuvvet mi?",
      prompt: "3^4 ile 4·3 ifadelerinin değerlerini hesaplayıp karşılaştır.",
      strategy: "Tekrarlı çarpanları görünür yaz.",
      steps: [
        {
          label: "Adım 1",
          explanation: "3^4=3·3·3·3=81.",
        },
        {
          label: "Adım 2",
          explanation: "4·3=12.",
        },
        {
          label: "Adım 3",
          explanation:
            "Üs 4 çarpan sayısı, katsayı 4 ise toplamda eşit terim sayısıdır.",
        },
      ],
      answer: "81 ve 12; farklı işlemlerdir.",
      check: "81/3=27; bir çarpanı geri almış oluruz.",
      pitfall: "Üssü tabanla çarpma sayısı sanmak.",
    },
    {
      code: "E02",
      title: "Dış eksi ile negatif taban",
      prompt: "-2^4 ve(-2)^4 değerlerini bul.",
      strategy: "Taban sınırlarını işaretle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "-2^4=-(2·2·2·2)=-16.",
        },
        {
          label: "Adım 2",
          explanation: "(-2)^4=(-2)(-2)(-2)(-2)=16.",
        },
      ],
      answer: "-16 ve 16.",
      check: "Tek üs 3’te ikisi de-8 verir; bu çift üsteki farkı silmez.",
      pitfall: "Parantezi süs saymak.",
    },
    {
      code: "E03",
      title: "Sıfırıncı kuvvetin koşulu",
      prompt: "(7/3)^0; 0^5; 0^0 ve 0^-2’yi sınıflandır.",
      strategy: "Sıfır taban ile sıfır üssü ayrı denetle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "7/3≠0 olduğundan ilk değer 1.",
        },
        {
          label: "Adım 2",
          explanation: "0^5, beş 0 çarpanıyla 0.",
        },
        {
          label: "Adım 3",
          explanation:
            "0^0 okul kapsamında tanımsız;0^-2 sıfıra bölme gerektirir.",
        },
      ],
      answer: "1;0; tanımsız; tanımsız.",
      check: "0^-2 için 1/0² yazımı sorunu görünür kılar.",
      pitfall: "“Bütün sıfır üsler 1” genellemesi.",
    },
    {
      code: "E04",
      title: "Negatif tam sayı üs",
      prompt: "(-2)^-3 değerini bul.",
      strategy: "Önce karşılık al, sonra işareti hesapla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "(-2)^-3=1/(-2)^3.",
        },
        {
          label: "Adım 2",
          explanation: "(-2)^3=-8.",
        },
        {
          label: "Adım 3",
          explanation: "Sonuç-1/8.",
        },
      ],
      answer: "-1/8.",
      check: "(-1/8)·(-8)=1.",
      pitfall: "Üsteki eksiyle tabanın eksisini birbirine karıştırmak.",
    },
    {
      code: "E05",
      title: "Kesirli tabanı ters çevirmek",
      prompt: "(3/4)^-2 değerini bul.",
      strategy: "Negatif üs bütün kesrin karşılığını aldırır.",
      steps: [
        {
          label: "Adım 1",
          explanation: "(3/4)^-2=(4/3)^2.",
        },
        {
          label: "Adım 2",
          explanation: "Payın karesi 16, paydanın karesi 9.",
        },
      ],
      answer: "16/9.",
      check: "(9/16)·(16/9)=1.",
      pitfall: "Yalnız payın veya paydanın yerini değiştirmek.",
    },
    {
      code: "E06",
      title: "Üslerde işaretli çıkarma",
      prompt: "3^-2/3^4 değerini bul.",
      strategy: "Payın üssü eksi paydanın üssünü yaz.",
      steps: [
        {
          label: "Adım 1",
          explanation: "3^(-2-4)=3^-6.",
        },
        {
          label: "Adım 2",
          explanation: "3^6=729; sonuç 1/729.",
        },
      ],
      answer: "1/729.",
      check: "(1/9)/81=1/729.",
      pitfall: "Üsleri bölmek veya-2-4’ü+2 sanmak.",
    },
    {
      code: "E07",
      title: "İki farklı kuvvet yapısı",
      prompt: "(2^3)^4 ile 2^3·2^4’ü karşılaştır.",
      strategy: "Dış üs ile çarpma işaretini ayır.",
      steps: [
        {
          label: "Adım 1",
          explanation: "İlk ifade 2^(3·4)=2^12=4096.",
        },
        {
          label: "Adım 2",
          explanation: "İkinci ifade 2^(3+4)=2^7=128.",
        },
      ],
      answer: "4096 ve 128.",
      check: "Birinde 4 grup üçlü, diğerinde 3+4 çarpan vardır.",
      pitfall: "Üsleri her yerde çarpmak.",
    },
    {
      code: "E08",
      title: "Aynı üsleri birleştirmek",
      prompt: "2^5·5^5 değerini bul.",
      strategy: "Ortak üs 5’i koru, tabanları çarp.",
      steps: [
        {
          label: "Adım 1",
          explanation: "(2·5)^5=10^5.",
        },
        {
          label: "Adım 2",
          explanation: "10^5=100000.",
        },
      ],
      answer: "100000.",
      check: "32·3125=100000.",
      pitfall: "Tabanları toplamak veya üssü 25 yapmak.",
    },
    {
      code: "E09",
      title: "Asal tabanlı bölüm",
      prompt: "(4^3·8^2)/2^5 değerini bul.",
      strategy: "Bütün tabanları 2’nin kuvveti yaz.",
      steps: [
        {
          label: "Adım 1",
          explanation: "4^3=(2^2)^3=2^6.",
        },
        {
          label: "Adım 2",
          explanation: "8^2=(2^3)^2=2^6.",
        },
        {
          label: "Adım 3",
          explanation: "2^(6+6-5)=2^7=128.",
        },
      ],
      answer: "128.",
      check: "64·64/32=128.",
      pitfall: "Dönüşümde iç ve dış üsleri toplamaya çalışmak.",
    },
    {
      code: "E10",
      title: "Aynı yöntemi farklı tabana aktarmak",
      prompt: "(9^2·27)/3^4 değerini bul.",
      strategy: "3 tabanında topla ve çıkar.",
      steps: [
        {
          label: "Adım 1",
          explanation: "9^2=(3^2)^2=3^4;27=3^3.",
        },
        {
          label: "Adım 2",
          explanation: "3^(4+3-4)=3^3.",
        },
      ],
      answer: "27.",
      check: "81·27/81=27.",
      pitfall: "Bütün üsleri çarpıp büyük bir sayı üretmek.",
    },
    {
      code: "E11",
      title: "Katsayılar toplanır",
      prompt: "3·2^5+5·2^5 değerini bul.",
      strategy: "Ortak 2^5’i dışarı al.",
      steps: [
        {
          label: "Adım 1",
          explanation: "(3+5)2^5=8·32.",
        },
        {
          label: "Adım 2",
          explanation: "8·32=256.",
        },
      ],
      answer: "256.",
      check: "96+160=256.",
      pitfall: "Toplamda 2^(5+5) yazmak.",
    },
    {
      code: "E12",
      title: "Bir basamak farklı kuvvetlerde ortak çarpan",
      prompt: "5^(n+3)-2·5^(n+2), n≥0 tam sayı.",
      strategy: "Küçük kuvvet 5^(n+2)’yi dışarı al.",
      steps: [
        {
          label: "Adım 1",
          explanation: "5^(n+3)=5^(n+2)·5.",
        },
        {
          label: "Adım 2",
          explanation: "5^(n+2)(5-2)=3·5^(n+2).",
        },
      ],
      answer: "3·5^(n+2).",
      check: "n=0 için 125-50=75 ve 3·25=75.",
      pitfall: "Üsteki+3’ü katsayı 3 gibi görmek.",
    },
    {
      code: "E13",
      title: "Toplam kuralına karşı örnek",
      prompt: "2^3+2^4 neden 2^7 değildir?",
      strategy: "İki tarafı ayrı hesapla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Sol 8+16=24.",
        },
        {
          label: "Adım 2",
          explanation: "Sağ 128.",
        },
        {
          label: "Adım 3",
          explanation: "24≠128; çarpma kuralı toplamada kullanılmaz.",
        },
      ],
      answer: "Önerilen eşitlik yanlıştır.",
      check: "Doğru çarpım 2^3·2^4=128’dir.",
      pitfall: "Aynı tabanın tek başına yeterli olduğunu sanmak.",
    },
    {
      code: "E14",
      title: "Verilen kuvveti yerine koymak",
      prompt: "2^x=5 ise 8^x kaçtır?",
      strategy: "8’i 2³ yap ve verilen bütünü koru.",
      steps: [
        {
          label: "Adım 1",
          explanation: "8^x=(2^3)^x=(2^x)^3.",
        },
        {
          label: "Adım 2",
          explanation: "5^3=125.",
        },
      ],
      answer: "125.",
      check: "2^x’in kendisi 5; üç kez çarpılır.",
      pitfall: "x’i bulmak için gereksiz logaritma aramak.",
    },
    {
      code: "E15",
      title: "Seçili OGM yönteminden özgün uyarlama",
      prompt: "3^x=A,5^x=B ise 75^x’i yaz.",
      strategy: "75=3·5² biçimini kullan.",
      steps: [
        {
          label: "Adım 1",
          explanation: "75^x=3^x·5^(2 x).",
        },
        {
          label: "Adım 2",
          explanation: "5^(2 x)=(5^x)^2=B².",
        },
      ],
      answer: "AB².",
      check: "x=1 için 3·25=75.",
      pitfall: "Her sembolü bir kez yazıp asal çarpan çokluğunu unutmak.",
    },
    {
      code: "E16",
      title: "Ondalık tabanın asal çarpanları",
      prompt: "2^x=A,3^x=B,5^x=C ise 0,18^x’i yaz.",
      strategy: "Önce kesre sonra asal çarpanlara geç.",
      steps: [
        {
          label: "Adım 1",
          explanation: "0,18=9/50=3²/(2·5²).",
        },
        {
          label: "Adım 2",
          explanation: "Kuvveti her pozitif asal çarpana uygula.",
        },
        {
          label: "Adım 3",
          explanation: "Sonuç B²/(AC²).",
        },
      ],
      answer: "B²/(AC²).",
      check: "x=1 için 9/(2·25)=0,18.",
      pitfall: "Paydaki ve paydadaki asal çarpanları karıştırmak.",
    },
    {
      code: "E17",
      title: "Denklem ve özgün ifadede kontrol",
      prompt: "8^(x-1)=4^(x+2) denklemini çöz.",
      strategy: "Ortak pozitif 2 tabanı uygundur.",
      steps: [
        {
          label: "Adım 1",
          explanation: "2^(3 x-3)=2^(2 x+4).",
        },
        {
          label: "Adım 2",
          explanation: "3 x-3=2 x+4→x=7.",
        },
      ],
      answer: "x=7.",
      check: "8⁶=4⁹=2¹⁸.",
      pitfall: "Parantezdeki sabitleri yanlış dağıtmak.",
    },
    {
      code: "E18",
      title: "Kesirli denklem çözümü",
      prompt: "9^(x-1)=27 denklemini çöz.",
      strategy: "3 tabanına çevir.",
      steps: [
        {
          label: "Adım 1",
          explanation: "3^(2 x-2)=3³.",
        },
        {
          label: "Adım 2",
          explanation: "2 x=5→x=5/2.",
        },
      ],
      answer: "x=5/2.",
      check: "x-1=3/2;9^(3/2)=27.",
      pitfall: "Çözüm mutlaka tam sayı olmalı sanmak.",
    },
    {
      code: "E19",
      title: "Taban 1’in özel durumu",
      prompt: "1^(2 x+3)=1^(x-4) denklemini çöz.",
      strategy: "Üs eşitleme koşulunu önce denetle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Taban 1 olduğundan farklı üsler aynı 1 değerini verir.",
        },
        {
          label: "Adım 2",
          explanation: "İki taraf her gerçek x’te 1 olur.",
        },
      ],
      answer: "Bütün gerçek sayılar.",
      check: "x=0,1,2 de sağlar.",
      pitfall: "Koşulsuz üs eşitleyip yalnız-7’yi seçmek.",
    },
    {
      code: "E20",
      title: "Çelişki veren üs eşitliği",
      prompt: "3^(2 x+1)=3^(2 x+4) denklemini çöz.",
      strategy: "Uygun tabanda üsleri eşitle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "2 x+1=2 x+4.",
        },
        {
          label: "Adım 2",
          explanation: "1=4 çelişkisi vardır.",
        },
      ],
      answer: "Çözüm kümesi∅.",
      check: "Sağ taraf sol tarafın 27 katıdır.",
      pitfall: "x’ler yok olunca otomatik bütün x’leri çözüm sanmak.",
    },
    {
      code: "E21",
      title: "Birden küçük tabanla karşılaştırma",
      prompt: "(1/3)^4 ve(1/3)^7’yi sırala.",
      strategy: "Ek üç 1/3 çarpanını izle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "İkinci değer ilkinin 1/27’sidir.",
        },
        {
          label: "Adım 2",
          explanation: "Pozitif bir sayıyı 1/27 ile çarpmak küçültür.",
        },
      ],
      answer: "(1/3)^4>(1/3)^7.",
      check: "1/81>1/2187.",
      pitfall: "Büyük üs daima büyük sayı demek.",
    },
    {
      code: "E22",
      title: "Ortak tabanla eşitlik",
      prompt: "2^18 ve 8^6’yı karşılaştır.",
      strategy: "8=2³ dönüşümünü yap.",
      steps: [
        {
          label: "Adım 1",
          explanation: "8^6=(2³)^6=2^18.",
        },
      ],
      answer: "Eşittir.",
      check: "Büyük değerleri tek tek açmak gerekmez.",
      pitfall: "Görünen üs 18’i 6’dan büyük diye ilkini büyük seçmek.",
    },
    {
      code: "E23",
      title: "Kesirli üs ve karşılık",
      prompt: "27^(-2/3) değerini bul.",
      strategy: "Önce kök sonra kuvvet ve karşılık.",
      steps: [
        {
          label: "Adım 1",
          explanation: "∛27=3.",
        },
        {
          label: "Adım 2",
          explanation: "3²=9.",
        },
        {
          label: "Adım 3",
          explanation: "Negatif üs nedeniyle 1/9.",
        },
      ],
      answer: "1/9.",
      check: "9·1/9=1.",
      pitfall: "Negatif üssü negatif sonuç sanmak.",
    },
    {
      code: "E24",
      title: "Negatif taban ve sade payda",
      prompt: "(-8)^(2/6) ifadesini gerçek sayılarda yorumla.",
      strategy: "Üssü önce sadeleştir.",
      steps: [
        {
          label: "Adım 1",
          explanation: "2/6=1/3.",
        },
        {
          label: "Adım 2",
          explanation: "Tek dereceli küpkök(-8)=-2.",
        },
      ],
      answer: "-2.",
      check: "(-2)³=-8.",
      pitfall: "Koşulsuz altıncı kök((-8)²)=+2 yapmak.",
    },
    {
      code: "E25",
      title: "İç içe rasyonel kuvvette yanlış genelleme",
      prompt: "((−1)^2)^(1/2) ile(−1)^(2·1/2) aynı mı?",
      strategy: "Parantez içini önce hesapla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "İlkinde(-1)²=1 ve√1=1.",
        },
        {
          label: "Adım 2",
          explanation: "İkincide üs 1 ve(-1)¹=-1.",
        },
      ],
      answer: "Aynı değildir:1 ve-1.",
      check:
        "Her iki ifade de gerçektir; tanımlı olmak tek başına yasa koşulu değildir.",
      pitfall:
        "Negatif tabanda genel rasyonel kuvvet yasasını koşulsuz uygulamak.",
    },
    {
      code: "E26",
      title: "Büyük ve küçük sayı",
      prompt: "810000000 ile 0,00042’yi bilimsel yaz.",
      strategy: "Katsayıyı 1≤|a|<10 aralığına getir.",
      steps: [
        {
          label: "Adım 1",
          explanation: "İlk sayı 8,1×10⁸.",
        },
        {
          label: "Adım 2",
          explanation: "İkinci sayı 4,2×10^-4.",
        },
      ],
      answer: "8,1×10⁸;4,2×10^-4.",
      check: "Tekrar aç:8,1·100000000 ve 4,2/10000.",
      pitfall: "Virgül kaydırma yönünü değer korunmadan ezberlemek.",
    },
    {
      code: "E27",
      title: "Normalleştirme iki yönde",
      prompt: "72×10⁵ ve 0,36×10⁸’i normalleştir.",
      strategy: "Katsayı değişimini kuvvetle dengele.",
      steps: [
        {
          label: "Adım 1",
          explanation: "72=7,2·10→7,2×10⁶.",
        },
        {
          label: "Adım 2",
          explanation: "0,36=3,6·10^-1→3,6×10⁷.",
        },
      ],
      answer: "7,2×10⁶;3,6×10⁷.",
      check: "Değerler 7200000 ve 36000000 olarak korunur.",
      pitfall: "Katsayı ve dış üssü aynı yönde değiştirmek.",
    },
    {
      code: "E28",
      title: "Bilimsel çarpma ve bölüm",
      prompt: "(6×10⁷)(4×10^-3) ve(9×10⁵)/(3×10²).",
      strategy: "Katsayı ve 10 kuvvetini ayrı işle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "İlkinde 24×10⁴=2,4×10⁵.",
        },
        {
          label: "Adım 2",
          explanation: "İkincide 3×10^(5-2)=3×10³.",
        },
      ],
      answer: "2,4×10⁵;3×10³.",
      check: "240000 ve 3000.",
      pitfall: "Çarpımda normalleştirme adımını unutmak.",
    },
    {
      code: "E29",
      title: "Toplamada ortak kuvvet",
      prompt: "6×10⁵+4×10⁶ değerini bilimsel yaz.",
      strategy: "İlk terimi 10⁶ cinsine çevir.",
      steps: [
        {
          label: "Adım 1",
          explanation: "6×10⁵=0,6×10⁶.",
        },
        {
          label: "Adım 2",
          explanation: "(0,6+4)×10⁶=4,6×10⁶.",
        },
      ],
      answer: "4,6×10⁶.",
      check: "600000+4000000=4600000.",
      pitfall: "Toplamda üsleri 11 yapmaya çalışmak.",
    },
    {
      code: "E30",
      title: "Gerçek logaritmik konum",
      prompt: "8,1×10⁸,10⁸–10⁹ logaritmik ekseninde nerede?",
      strategy: "Sayıyı 10 üzerindeki konuma dönüştür.",
      steps: [
        {
          label: "Adım 1",
          explanation: "log₁₀(8,1×10⁸) = 8 + log₁₀(8,1).",
        },
        {
          label: "Adım 2",
          explanation:
            "Yaklaşık 8,9085;8 ile 9 arasındaki aralığın yaklaşık%90,85’i.",
        },
      ],
      answer: "10⁹’dan biraz önce; tam uçta değil.",
      check:
        "8,1×10⁸<10⁹. Bu yaklaşık koordinat, tam sayı değerini değiştirmez.",
      pitfall: "Kaynak şemasındaki uç nokta yerleşimini ölçülü çizim sanmak.",
    },
    {
      code: "E31",
      title: "Büyümede başlangıç ve adım",
      prompt: "200 hücre 6 kez ikiye katlanırsa?",
      strategy: "Başlangıcı adım 0 kabul et.",
      steps: [
        {
          label: "Adım 1",
          explanation: "200→400→800→1600→3200→6400→12800.",
        },
        {
          label: "Adım 2",
          explanation: "200·2⁶=12800.",
        },
      ],
      answer: "12800.",
      check: "Altı ok, altı çarpan 2 vardır.",
      pitfall: "Başlangıcı katlama 1 sayıp beş çarpan kullanmak.",
    },
    {
      code: "E32",
      title: "Azalma ve sıfır çarpanlı süreç",
      prompt:
        "80 miktar 4 kez yarılanırsa? Ayrıca 50 başlangıçlı q=0 sürecinin 0. adımı?",
      strategy: "Her sürecin başlangıcını ve çarpanını ayır.",
      steps: [
        {
          label: "Adım 1",
          explanation: "80·(1/2)⁴=80/16=5.",
        },
        {
          label: "Adım 2",
          explanation:
            "q=0 sürecinde 0. adım başlangıç 50’dir;1. adımdan sonra 0 olur.",
        },
      ],
      answer: "5; ayrı süreçte başlangıç 50.",
      check: "5·16=80. Başlangıç tanımı 0⁰’a değer atamaz.",
      pitfall:
        "Azalmayı negatif miktar sanmak veya adım 0’da 0 çarpanını uygulamak.",
    },
    {
      code: "E33",
      title: "Seçili OGM: negatif üsleri ortak tabana taşımak",
      prompt: "(4^-7·16·32³)/(2⁶·8³·64^-2) değerini bul.",
      strategy: "Bütün tabanları 2’nin kuvveti yaz.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Payın toplam üssü 2·(-7)+4+5·3=-14+4+15=5.",
        },
        {
          label: "Adım 2",
          explanation: "Paydanın toplam üssü 6+3·3+6·(-2)=6+9-12=3.",
        },
        {
          label: "Adım 3",
          explanation: "Bölüm 2^(5-3)=2²=4.",
        },
      ],
      answer: "4.",
      check: "Pay 32, payda 8;32/8=4.",
      pitfall:
        "Negatif üsleri sırf eksi işareti gibi almak veya paydanın toplam üssünü çıkarmayı unutmak.",
    },
    {
      code: "E34",
      title: "Seçili OGM: işaretleri ve üsleri ayrı izlemek",
      prompt: "a≠0 için a^-6·(-a)⁴·(-a)⁵ / [(-a)^-3·(-a)^-2] sadeleştir.",
      strategy: "Tek/çift üs işaretlerini önce belirle.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Pay: a^-6·a⁴·(-a⁵)=-a³.",
        },
        {
          label: "Adım 2",
          explanation: "Payda: (-a^-3)·a^-2=-a^-5.",
        },
        {
          label: "Adım 3",
          explanation: "İki eksi gider; a^(3-(-5))=a⁸.",
        },
      ],
      answer: "a⁸.",
      check: "a=2 için pay-8, payda-1/32; bölüm 256=2⁸.",
      pitfall: "Paydadaki negatif üs çıkarılırken eksi işaretini kaybetmek.",
    },
    {
      code: "E35",
      title: "Seçili OGM: verilen 5 kuvvetinden sonuca",
      prompt: "5^x=2 ise 25^(2 x+1) kaçtır?",
      strategy: "25=5² yap;5^x bütününü koru.",
      steps: [
        {
          label: "Adım 1",
          explanation: "25^(2 x+1)=5^(4 x+2).",
        },
        {
          label: "Adım 2",
          explanation: "5^(4 x+2)=(5^x)^4·5².",
        },
        {
          label: "Adım 3",
          explanation: "2⁴·25=16·25=400.",
        },
      ],
      answer: "400.",
      check: "5^(4 x)=(5^x)^4=16.",
      pitfall: "Ek+1 üssünün 25 çarpanını unutmak.",
    },
    {
      code: "E36",
      title: "Seçili OGM: ara tabanı verilen kuvvetler",
      prompt: "15^x=A,3^x=B ise 75^(2 x) hangi ifadedir?",
      strategy: "75=15²/3 eşitliğini kur.",
      steps: [
        {
          label: "Adım 1",
          explanation: "75^(2 x)=(15²/3)^(2 x).",
        },
        {
          label: "Adım 2",
          explanation: "Pozitif tabanlarla 15^(4 x)/3^(2 x).",
        },
        {
          label: "Adım 3",
          explanation: "Sonuç A⁴/B².",
        },
      ],
      answer: "A⁴/B².",
      check: "x=1 için 15⁴/3²=5625=75².",
      pitfall: "Dış 2 x’i yalnız paya uygulamak veya 75’i 15·3 sanmak.",
    },
    {
      code: "E37",
      title: "Seçili OGM:0,72’nin asal çarpanları",
      prompt: "2^x=A,3^x=B,5^x=C ile 0,72^x’i yaz.",
      strategy: "0,72=72/100=18/25 olarak başla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "18/25=2·3²·5^-2.",
        },
        {
          label: "Adım 2",
          explanation: "Ortakx kuvveti: A·B²·C^-2.",
        },
      ],
      answer: "A·B²/C².",
      check: "x=1 için 2·9/25=18/25=0,72.",
      pitfall: "5’in negatif ikinci kuvvetini paya pozitif taşımak.",
    },
    {
      code: "E38",
      title: "Seçili OGM: ortak çarpanı bölüme tamamlamak",
      prompt: "[5^(n+3)-2·5^(n+2)]/5^(n+1) değerini bul; n tam sayı.",
      strategy: "Payda sıfır değildir; payı ortaklaştır.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Pay 5^(n+2)(5-2)=3·5^(n+2).",
        },
        {
          label: "Adım 2",
          explanation: "Bölüm 3·5^((n+2)-(n+1))=3·5.",
        },
      ],
      answer: "15.",
      check: "n=0 için(125-50)/5=15.",
      pitfall:
        "Farkta üsleri çıkarmak yerine bütün terimleri ortaklaştırmamak.",
    },
    {
      code: "E39",
      title: "Kaynak alıştırması: üç ortak taban",
      prompt: "(2⁵·4³)/8² değerini bul.",
      strategy: "2 tabanında bütün üsleri birleştir.",
      steps: [
        {
          label: "Adım 1",
          explanation: "4³=2⁶,8²=2⁶.",
        },
        {
          label: "Adım 2",
          explanation: "2^(5+6-6)=2⁵.",
        },
      ],
      answer: "32.",
      check: "32·64/64=32.",
      pitfall: "Bölümde üsleri çarpmak.",
    },
    {
      code: "E40",
      title: "Kaynak alıştırması: aynı terimleri toplamak",
      prompt: "3^n+3^(n+1) ifadesini sadeleştir; n tam sayı.",
      strategy: "3^n ortak çarpanını dışarı al.",
      steps: [
        {
          label: "Adım 1",
          explanation: "3^(n+1)=3^n·3.",
        },
        {
          label: "Adım 2",
          explanation: "3^n(1+3)=4·3^n.",
        },
      ],
      answer: "4·3^n.",
      check: "n=0 için 1+3=4.",
      pitfall: "Toplamın üssünü 2 n+1 yapmak.",
    },
    {
      code: "E41",
      title: "Kaynak alıştırması: çok küçük ondalık",
      prompt: "0,0000072 sayısını bilimsel göster.",
      strategy: "Katsayı 7,2 olacak biçimde altı basamağı say.",
      steps: [
        {
          label: "Adım 1",
          explanation: "0,0000072=7,2/1000000.",
        },
        {
          label: "Adım 2",
          explanation: "1/1000000=10^-6.",
        },
      ],
      answer: "7,2×10^-6.",
      check: "7,2×0,000001=0,0000072.",
      pitfall: "Üssü-5 seçip değeri on kat büyütmek.",
    },
    {
      code: "E42",
      title: "Kaynak alıştırması: birden küçük tabanda iki kuvvet",
      prompt: "(1/2)^9 ile(1/2)^6 değerlerini karşılaştır.",
      strategy: "Ortak taban 0 ile 1 arasında.",
      steps: [
        {
          label: "Adım 1",
          explanation: "İlk değer 1/512, ikinci 1/64.",
        },
        {
          label: "Adım 2",
          explanation: "İlk, ikincinin 1/8’idir.",
        },
      ],
      answer: "(1/2)^9<(1/2)^6.",
      check: "1/512<1/64.",
      pitfall: "Büyük üssü otomatik büyük değer saymak.",
    },
    {
      code: "E43",
      title: "Kaynak alıştırması: karşılık ve çarpma",
      prompt: "4^-2·8 değerini bul.",
      strategy: "4^-2=1/16 dönüşümünü yap.",
      steps: [
        {
          label: "Adım 1",
          explanation: "(1/16)·8=8/16.",
        },
        {
          label: "Adım 2",
          explanation: "Kesri sadeleştir:1/2.",
        },
      ],
      answer: "1/2.",
      check: "2^-4·2³=2^-1.",
      pitfall: "Negatif üssü-16 sanmak.",
    },
    {
      code: "E44",
      title: "Kaynak alıştırması: rasyonel pozitif kuvvet",
      prompt: "27^(2/3) değerini bul.",
      strategy: "Küpkök ile karesini sıralı hesapla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "∛27=3.",
        },
        {
          label: "Adım 2",
          explanation: "3²=9.",
        },
      ],
      answer: "9.",
      check: "9³=729=27².",
      pitfall: "Üssü 27·2/3 diye okumak.",
    },
    {
      code: "E45",
      title: "Kaynak alıştırması: geçerli genel özdeşlik",
      prompt:
        "a≠0 gerçek sayı, m ve n tam sayı iken(a^m)^n hangi kuvvete eşittir?",
      strategy: "Dış kuvveti çarpan grubu veya karşılık olarak yorumla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Pozitif dış n’de her grupta m kuvveti bulunur.",
        },
        {
          label: "Adım 2",
          explanation:
            "Sıfır/negatif tam sayı üslerde a≠0 karşılıkları tanımlı tutar.",
        },
        {
          label: "Adım 3",
          explanation: "Sonuç a^(m·n).",
        },
      ],
      answer: "a^(m·n).",
      check:
        "a=2, m=3, n=2 için 64=2⁶. Rasyonel dış üssü negatif tabana koşulsuz genişletme.",
      pitfall: "Üsleri m+n yapmak veya koşulu silmek.",
    },
    {
      code: "E46",
      title: "Kaynak alıştırması: dört üçe katlama",
      prompt:
        "50 başlangıçlı bir miktar dört adımın her birinde üç katına çıkıyor. Son miktar kaçtır?",
      strategy: "Başlangıç 0. adım; dört çarpan 3 yaz.",
      steps: [
        {
          label: "Adım 1",
          explanation: "50·3⁴=50·81.",
        },
        {
          label: "Adım 2",
          explanation: "Son miktar 4050.",
        },
      ],
      answer: "4050.",
      check: "50→150→450→1350→4050; dört ok vardır.",
      pitfall: "Adım sayısını çarpanla doğrusal çarpmak.",
    },
    {
      code: "E47",
      title: "Kaynak yanlış onarımı: dört ayrı yapı",
      prompt: "3²+3³; (5²)³;5^-2;0,0009 ifadelerini doğru biçimde hesapla/yaz.",
      strategy: "Her birinde işlem türünü yeniden seç.",
      steps: [
        {
          label: "Adım 1",
          explanation: "3²+3³=9+27=36; toplamda üsler toplanmaz.",
        },
        {
          label: "Adım 2",
          explanation: "(5²)³=5⁶=15625; dış kuvvette üsler çarpılır.",
        },
        {
          label: "Adım 3",
          explanation: "5^-2=1/25; negatif üs karşılıktır.",
        },
        {
          label: "Adım 4",
          explanation: "0,0009=9×10^-4; bilimsel katsayı 9 standarttır.",
        },
      ],
      answer: "36;15625;1/25;9×10^-4.",
      check:
        "Her sonucu özgün ifadeden yeniden aç; dört işlem dört ayrı gerekçe ister.",
      pitfall: "Bir yapı için geçerli kuralı diğer yapıya kopyalamak.",
    },
    {
      code: "E48",
      title: "Ortak tabana çevirirken boşlukları doldur",
      prompt:
        "(9²·27)/3⁴ için 9=3^□, 27=3^□ ve payın toplam üssü □. Boşlukları ve sonucu önce kendin bul.",
      strategy:
        "Tabanı 3 yap. Paydaki iç içe kuvveti, aynı tabanlı çarpımdan önce hesapla.",
      steps: [
        {
          label: "Adım 1",
          explanation: "9=3² ve 27=3³; ilk iki boşluk 2 ve 3.",
        },
        {
          label: "Adım 2",
          explanation: "9²=(3²)²=3⁴. Pay 3⁴·3³=3⁷; üçüncü boşluk 7.",
        },
        {
          label: "Adım 3",
          explanation: "Paydadaki 4 çıkar: 3^(7−4)=3³=27.",
        },
      ],
      answer: "Boşluklar 2, 3 ve 7. Sonuç 27.",
      check: "9²=3⁴ olduğundan pay ve paydada 81 sadeleşir.",
      pitfall: "Paydaki 9’un dıştaki 2 üssünü atlama.",
    },
    {
      code: "E49",
      title: "Toplamdaki ortak kuvvetten bilinmeyeni bul",
      prompt: "x gerçek sayı iken 2^(x+1)+2^x=24 denklemini çöz.",
      strategy: "Her terimde görülen 2^x çarpanını dışarı al.",
      steps: [
        {
          label: "Adım 1",
          explanation: "2^(x+1)=2·2^x; toplam (2+1)·2^x biçimini alır.",
        },
        {
          label: "Adım 2",
          explanation: "Her iki tarafı 3’e böl: 2^x=8=2³.",
        },
        {
          label: "Adım 3",
          explanation: "Taban 2 pozitif ve 1’den farklı olduğu için x=3.",
        },
      ],
      answer: "x=3.",
      check: "2⁴+2³=16+8=24.",
      pitfall: "2^(2x+1) çarpımın ifadesidir.",
    },
    {
      code: "E50",
      title: "Dördüncü kökten başlayıp karşılık al",
      prompt: "16^(-3/4) sayısını tam değerle hesapla.",
      strategy: "Önce pozitif dördüncü kökü, sonra üçüncü kuvveti düşün.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Dördüncü kök 16=2.",
        },
        {
          label: "Adım 2",
          explanation: "2³=8.",
        },
        {
          label: "Adım 3",
          explanation: "Negatif üs bu değerin karşılığını verir: 1/8.",
        },
      ],
      answer: "1/8.",
      check: "(1/8)⁴=1/4096 ve 16^-3=1/4096.",
      pitfall: "Negatif üs nedeniyle sonucun başına eksi getirme.",
    },
    {
      code: "E51",
      title: "Kalan yüzdeyi üç tura uygula",
      prompt:
        "Başlangıçta 512 birim su bulunan bir tank, modelde her tur mevcut suyun %75’ini kaybediyor. Üç tamamlanan turdan sonra kaç birim kalır?",
      strategy: "Kalan %25’i 1/4 olarak yaz ve her tur önceki miktara uygula.",
      steps: [
        {
          label: "Adım 1",
          explanation: "Adım 0’da 512 birim var.",
        },
        {
          label: "Adım 2",
          explanation: "512 → 128 → 32 → 8. Üç ok, üç tur.",
        },
        {
          label: "Adım 3",
          explanation: "Tek ifadeyle 512·(1/4)³=512/64=8.",
        },
      ],
      answer: "8 birim.",
      check: "8·4³=512 başlangıcını geri verir.",
      pitfall:
        "%75 kayıp, %75 kalış demek değildir. Her adımda başlangıç miktarını yeniden kullanma.",
    },
    {
      code: "E52",
      title: "Üç farklı sayıyı bir birim üzerinden ilişkilendir",
      prompt:
        "Özgün örnek. Bir atölye günde 8 milyon parçayı geri kazanıyor. Altı günlük geri kazanım üç eşit projenin gereksinimini karşılıyor. Aynı gereksinimde 64 proje için kaç parça gerekir? Sonucu hem tek kuvvet hem bilimsel gösterimle yaz.",
      strategy:
        "Önce bir proje için gerekeni, sonra 64 proje için toplamı bul.",
      steps: [
        {
          label: "Adım 1",
          explanation:
            "Altı günlük toplam 6·8·10⁶=48·10⁶ parça. Bir proje 48·10⁶/3=16·10⁶ parça ister.",
        },
        {
          label: "Adım 2",
          explanation:
            "64 proje 64·16·10⁶=2⁶·2⁴·10⁶=2^10·10⁶ parça ister. Tek kuvvet için 2^10·10⁶=2^16·5⁶=(2⁸·5³)²=32000².",
        },
        {
          label: "Adım 3",
          explanation: "Toplam 1 024 000 000 parça. Bilimsel yazımı 1,024×10⁹.",
        },
      ],
      answer: "32000²=1,024×10⁹ parça.",
      check: "1 024 000 000 / 16 000 000=64 proje.",
      pitfall:
        "Günlük geri kazanım ile proje başına gereksinimi birbirine karıştırma.",
    },
    {
      code: "E53",
      title: "Dört yanlışın ilk bozulduğu adım",
      prompt:
        "3²+3³’ü ortak çarpanla hesapla. (5²)³’ü tek kuvvet ve sayı olarak yaz. 5^-2’nin değerini ve işaretini açıkla. 0,0009’u bilimsel gösterime çevirip geri aç.",
      strategy:
        "Sonuçları görmeden dört işlem için ayrı kural ve bir kontrol yaz.",
      steps: [
        {
          label: "Adım 1",
          explanation:
            "3²+3³=3²(1+3)=9·4=36. Çarpım kuralını toplamda kullanma.",
        },
        {
          label: "Adım 2",
          explanation:
            "(5²)³=5^(2·3)=5⁶=15625. İç içe kuvvette 2 ve 3 çarpılır.",
        },
        {
          label: "Adım 3",
          explanation:
            "5^-2=1/5²=1/25>0. Karşılık alınır ve pozitiflik korunur.",
        },
        {
          label: "Adım 4",
          explanation: "0,0009=9×10^-4. Geri aç: 9/10000=0,0009.",
        },
      ],
      answer: "36, 5⁶=15625, 1/25 ve 9×10^-4.",
      check:
        "İlk hatalı ara adımı “işlem türü”, “gösterim” veya “tanım koşulu” diye adlandır ve kendin düzelt.",
      pitfall: "Aynı hata açıklamasını dört farklı işleme uygulama.",
    },
  ],
  recall: [
    {
      prompt: "a^n yazımında taban ve üs neyi belirtir?",
      answer:
        "a taban; pozitif tam sayı n, a’nın kaç kez çarpan olduğunu belirtir.",
    },
    {
      prompt: "-2⁴ ile(-2)⁴ neden farklı?",
      answer:
        "Dış eksi ilkinde kuvvetten sonra uygulanır: -16; ikincide negatif taban dört kez çarpılır: +16.",
    },
    {
      prompt: "a⁰=1 kuralının koşulu nedir?",
      answer: "a≠0. 0⁰ bu okul kapsamı içinde tanımsızdır.",
    },
    {
      prompt: "Negatif üs sonuç işaretini mi değiştirir?",
      answer: "Hayır; karşılık aldırır: a^-n=1/a^n, a≠0.",
    },
    {
      prompt: "0^-2 neden tanımsız?",
      answer: "1/0² sıfıra bölme gerektirir.",
    },
    {
      prompt: "Aynı tabanlı çarpma ve bölümde ne yapılır?",
      answer:
        "Çarpmada üsler toplanır, bölümde payın üssünden paydanınki çıkarılır; tanım alanı korunur.",
    },
    {
      prompt: "(a²)³ ile a²·a³ aynı mı?",
      answer: "İlki a⁶, ikincisi a⁵; dış kuvvet ile çarpma farklıdır.",
    },
    {
      prompt: "Aynı üslü farklı tabanlarda örnek bir doğru kural?",
      answer: "2⁵·5⁵=(2·5)⁵=10⁵.",
    },
    {
      prompt: "2³+2⁴ neden 2⁷ değil?",
      answer: "Toplam 24’tür;2⁷=128’dir; üs toplama çarpım kuralıdır.",
    },
    {
      prompt: "(a+b)²=a²+b² önermesine karşı örnek?",
      answer: "a=1, b=2:9≠5.",
    },
    {
      prompt: "5^(n+3)-2·5^(n+2) nasıl sadeleşir?",
      answer: "5^(n+2)(5-2)=3·5^(n+2).",
    },
    {
      prompt: "3^x=A,5^x=B için 75^x?",
      answer: "75=3·5² olduğundan AB².",
    },
    {
      prompt: "Üslü denklemde üsleri ne zaman eşitlersin?",
      answer: "Ortak taban a>0, a≠1 iken; a^u=a^v→u=v.",
    },
    {
      prompt: "1 tabanlı denklemde neden dikkat gerekir?",
      answer:
        "Her gerçek üs 1 sonucunu verir; farklı üsler aynı kuvvet değerini verebilir; bu yüzden üsler zorunlu eşitlenmez.",
    },
    {
      prompt: "0<a<1 iken üs arttığında ne olur?",
      answer: "Pozitif değer küçülür; eklenen her a çarpanı 1’den küçüktür.",
    },
    {
      prompt: "27^(-2/3) değerini gerekçelendir.",
      answer: "Küpkök 27=3, karesi 9, karşılığı 1/9.",
    },
    {
      prompt: "(-8)^(2/6) neden+2 değil?",
      answer:
        "Üs 1/3’e sadeleşir ve küpkök(-8)=-2; pozitif taban kök yasası koşulsuz kopyalanmaz.",
    },
    {
      prompt: "İç içe rasyonel üs kuralının negatif taban karşı örneği?",
      answer: "((-1)²)^(1/2)=1 fakat(-1)^(2·1/2)=-1.",
    },
    {
      prompt: "Bilimsel gösterimde iki koşul nedir?",
      answer: "n tam sayı ve 1≤|a|<10; sıfır ayrı durumdur.",
    },
    {
      prompt: "72×10⁵ neden 7,2×10⁶ olur?",
      answer: "Katsayı 10’a bölününce dış 10 kuvveti 1 artar; değer korunur.",
    },
    {
      prompt: "6×10⁵+4×10⁶ nasıl toplanır?",
      answer: "Ortak 10⁶ ile(0,6+4)×10⁶=4,6×10⁶.",
    },
    {
      prompt: "Logaritmik eksende eşit aralık neyi anlatır?",
      answer: "Eşit çarpan oranı;10,100,1000 araları 10 kat değişimdir.",
    },
    {
      prompt: "200 başlangıçlı altı ikiye katlamanın modeli?",
      answer: "Adım 0’da 200; altı adımda 200·2⁶=12800.",
    },
    {
      prompt: "q=0 sürecinde 0. adımı nasıl yorumlarsın?",
      answer:
        "İşlem öncesi verilen başlangıç;0⁰’a sayı değeri atamadan ayrı tanımlanır.",
    },
    {
      prompt: "16^(-3/4) için kök, kuvvet ve karşılık adımları ne sonuç verir?",
      answer: "Dördüncü kök 2, üçüncü kuvvet 8, karşılık 1/8.",
    },
    {
      prompt: "2^(x+1)+2^x=24 denkleminde ortak kuvveti ayırınca ne kalır?",
      answer: "(2+1)·2^x=24. Böylece 2^x=8 ve x=3.",
    },
    {
      prompt:
        "Başlangıcı 0. adım alırsan, üç tur sonunda kaç gözlem noktası oluşur?",
      answer:
        "0, 1, 2 ve 3. adımlar olmak üzere dört nokta. Yalnızca üç çarpan uygulanır.",
    },
    {
      prompt:
        "Her tur %25 azalan bir miktar ile her tur dörtte biri kalan miktarın çarpanları nedir?",
      answer: "İlkinde kalan pay 3/4. İkincisinde kalan pay 1/4, azalma %75.",
    },
    {
      prompt: "0²=0⁵ örneği üs eşitleme konusunda ne gösterir?",
      answer:
        "Sıfır tabanında farklı pozitif üsler aynı değeri verebilir. Üs eşitleme için pozitif ve 1’den farklı taban koşulunu kontrol et.",
    },
  ],
  items: [
    {
      code: "Q01",
      prompt: "3^4 ifadesinin değeri kaçtır?",
      options: ["81", "12", "64", "27", "243"],
      knowledge: [
        "Pozitif tam sayı üs, tabanın kaç kez çarpan olduğunu belirtir.",
      ],
      strategy: "Dört tane 3 çarpanını yaz.",
      steps: [
        "3^4=3·3·3·3.",
        "Önce 3·3=9; sonra 9·3=27.",
        "Son çarpanla 27·3=81.",
      ],
      optionReasons: [
        "Dört 3 çarpanı 81 verir.",
        "12, 3 ile 4’ü çarpmaktır; kuvvetin tanımı bu değildir.",
        "64, 4^3 değeridir; taban ile üs yer değiştirmiştir.",
        "27, yalnız üç 3 çarpanı içerir.",
        "243, beş 3 çarpanı içerir.",
      ],
      commonError: "Üssü tabanla çarpılacak sayı sanmak.",
      check: "4 çarpan say: 3, 3, 3, 3.",
    },
    {
      code: "Q02",
      prompt: "(-2)^6 kaçtır?",
      options: ["64", "-64", "-12", "12", "32"],
      knowledge: ["Negatif bir tabanın çift tam sayı kuvveti pozitiftir."],
      strategy: "İkişer negatif çarpanı birlikte düşün.",
      steps: [
        "(-2)^6 altı tane -2 çarpanıdır.",
        "Her iki negatif çarpanın çarpımı 4’tür.",
        "Üç çiftin sonucu 4·4·4=64.",
      ],
      optionReasons: [
        "Üç negatif çifti 64 verir.",
        "Çift sayıda negatif çarpan negatif sonuç vermez.",
        "-12, tabanla üssü çarpmaktır.",
        "12 hem kuvvet yerine çarpma yapar hem büyüklüğü yanlış bulur.",
        "32, 2^5’tir; bir çarpan eksiktir.",
      ],
      commonError:
        "Parantezli negatif tabanın bütün kuvvetlerini negatif sanmak.",
      check: "(-2)^2=4; 4^3=64.",
    },
    {
      code: "Q03",
      prompt: "Parantez bulunmayan -3^4 yazımının değeri kaçtır?",
      options: ["-81", "81", "-12", "12", "-64"],
      knowledge: [
        "Parantez yoksa üs yalnız 3’e aittir; baştaki eksi daha sonra uygulanır.",
      ],
      strategy: "İfadeyi -(3^4) biçiminde açık yaz.",
      steps: [
        "-3^4=-(3^4).",
        "3^4=81.",
        "Dışarıdaki eksi uygulanınca sonuç -81 olur.",
      ],
      optionReasons: [
        "Önce 3^4 hesaplanır, ardından eksi gelir.",
        "81, (-3)^4 değeridir; burada böyle bir parantez yok.",
        "-12, -3 ile 4’ü çarpmaktır.",
        "12 kuvvet yerine çarpma yapar ve dış eksiyi kaybeder.",
        "-64, 4^3’ün eksisidir; taban ve üs yer değiştirmiştir.",
      ],
      commonError: "-3^4 ile (-3)^4 yazımlarını aynı görmek.",
      check: "-(3·3·3·3)=-81.",
    },
    {
      code: "Q04",
      prompt: "(-5)^3 ifadesinin sonucu nedir?",
      options: ["-125", "125", "-15", "15", "-625"],
      knowledge: ["Negatif tabanın tek kuvveti negatiftir."],
      strategy: "Üç negatif çarpanı sırayla çarp.",
      steps: [
        "(-5)·(-5)=25.",
        "25·(-5)=-125.",
        "Tek sayıda negatif çarpan kaldığından sonuç negatiftir.",
      ],
      optionReasons: [
        "Üç çarpan -125 verir.",
        "125, işaretin tek kuvvette negatif olmasını atlar.",
        "-15, tabanla üssü çarpmaktır.",
        "15 hem kuvveti çarpma sanır hem işareti kaybeder.",
        "-625’in büyüklüğü dört tane 5 çarpanıdır, üç değil.",
      ],
      commonError: "Üs tek/çift kontrolünü yapmadan işareti seçmek.",
      check: "|(-5)^3|=5^3=125 ve işaret negatiftir.",
    },
    {
      code: "Q05",
      prompt: "(7/3)^0 kaçtır?",
      options: ["1", "0", "7/3", "3/7", "7"],
      knowledge: ["Sıfırdan farklı bir tabanın sıfırıncı kuvveti 1’dir."],
      strategy: "Önce tabanın sıfır olup olmadığını kontrol et.",
      steps: [
        "7/3 sıfırdan farklıdır.",
        "a≠0 için a^0=1 kuralı uygulanabilir.",
        "Sonuç 1’dir.",
      ],
      optionReasons: [
        "Taban sıfır değildir; sıfırıncı kuvvet 1 olur.",
        "Sıfır üs, sonucu sıfır yapmaz.",
        "7/3, birinci kuvvetin değeridir.",
        "3/7, negatif birinci kuvvetin değeridir.",
        "7, paydanın da kuvvete dahil olduğunu unutur.",
      ],
      commonError: "a^0 kuralını a·0 gibi yorumlamak.",
      check: "(7/3)^2 ÷ (7/3)^2=1 ve üs farkı 0’dır.",
    },
    {
      code: "Q06",
      prompt: "4^(-2) kaçtır?",
      options: ["1/16", "-16", "16", "1/8", "-1/16"],
      knowledge: [
        "Negatif üs, sıfır olmayan tabanın pozitif kuvvetinin tersini aldırır.",
      ],
      strategy: "4^(-2)=1/4^2 yaz.",
      steps: [
        "4^2=16.",
        "Negatif üs nedeniyle 1/16 alınır.",
        "Pozitif tabanın bu kuvveti pozitiftir.",
      ],
      optionReasons: [
        "1/4^2=1/16.",
        "Negatif üs sonuca eksi işareti eklemez.",
        "16, ters alma adımını atlar.",
        "1/8, üssü 4 ile çarpmış olur.",
        "Pozitif taban için sonuç negatif olamaz.",
      ],
      commonError: "Negatif üssü negatif sonuçla karıştırmak.",
      check: "4^(-2)·4^2=1.",
    },
    {
      code: "Q07",
      prompt: "Bu ünitenin gerçek sayı tanımında 0^(-2) için hangisi doğrudur?",
      options: [
        "Tanımlı değildir; 1/0 gerektirir.",
        "0’dır.",
        "1’dir.",
        "-1’dir.",
        "Sonsuz bir gerçek sayıdır.",
      ],
      knowledge: ["Sıfırın negatif kuvveti gerçek sayılarda tanımlı değildir."],
      strategy: "Negatif üs tanımını yaz ve paydayı denetle.",
      steps: [
        "0^(-2) için 1/(0^2) yazılması gerekir.",
        "0^2=0 olduğundan 1/0 ortaya çıkar.",
        "Sıfıra bölme gerçek sayılarda tanımlı değildir.",
      ],
      optionReasons: [
        "Tanım doğrudan sıfıra bölme gerektirir.",
        "0^n=0 kuralının n>0 koşulu burada sağlanmaz.",
        "a^0=1 kuralı hem başka üs hem sıfır olmayan taban ister.",
        "Negatif üs -1 sonucu demek değildir.",
        "Sonsuz, bu işlemin sonucu olan bir gerçek sayı değildir.",
      ],
      commonError:
        "Sıfır tabanındaki pozitif üs kuralını negatif üslere taşımak.",
      check: "Bir sonuç seçmeden önce 1/0 engelini fark et.",
    },
    {
      code: "Q08",
      prompt: "0^5 ifadesinin değeri kaçtır?",
      options: ["0", "1", "5", "-5", "Tanımsız"],
      knowledge: ["Sıfırın pozitif tam sayı kuvveti sıfırdır."],
      strategy: "Beş sıfır çarpanı düşün.",
      steps: ["0^5=0·0·0·0·0.", "Çarpımda sıfır bulunduğundan sonuç 0’dır."],
      optionReasons: [
        "Pozitif üs altında sıfır tabanı 0 verir.",
        "1, sıfır olmayan tabanın sıfırıncı kuvvetidir.",
        "5 üs değeridir; işlemin sonucu değildir.",
        "Burada negatif çarpan yoktur.",
        "0^0 veya negatif üs yok; ifade tanımlıdır.",
      ],
      commonError: "Sıfırla ilgili bütün kuvvetleri tanımsız saymak.",
      check: "Üs 5>0, tanım koşulu uygundur.",
    },
    {
      code: "Q09",
      prompt: "(-1)^41 kaçtır?",
      options: ["-1", "1", "-41", "41", "0"],
      knowledge: ["(-1)’in tek tam sayı kuvveti -1, çift kuvveti 1’dir."],
      strategy: "41’in tek olduğunu belirle.",
      steps: [
        "40 tane -1, yirmi çift oluşturur ve çarpımları 1’dir.",
        "Bir tane -1 artar.",
        "1·(-1)=-1.",
      ],
      optionReasons: [
        "Tek sayıda -1 çarpanı -1 verir.",
        "1, çift kuvvet için doğrudur.",
        "Üs tabanla çarpılmaz.",
        "41 çarpan sayısıdır, sonuç değildir.",
        "Hiçbir çarpan sıfır değildir.",
      ],
      commonError: "Büyük üslerde çarpanları tek tek hesaplamaya çalışmak.",
      check: "41=2·20+1.",
    },
    {
      code: "Q10",
      prompt: "(-2)^(-3) kaçtır?",
      options: ["-1/8", "1/8", "-8", "8", "-1/6"],
      knowledge: [
        "Negatif üs ters aldırır; negatif tabanın tek kuvvetinin işareti korunur.",
      ],
      strategy: "Önce (-2)^3, sonra tersini hesapla.",
      steps: ["(-2)^3=-8.", "(-2)^(-3)=1/(-8).", "Sonuç -1/8."],
      optionReasons: [
        "Ters alınan -8, -1/8 verir.",
        "Ters almak tek negatif kuvvetin işaretini pozitif yapmaz.",
        "-8, negatif üs için gerekli ters alma adımını atlar.",
        "8 hem ters alma hem işaret koşulunu kaybeder.",
        "6, 2 ile 3’ün çarpımıdır; 2^3 değildir.",
      ],
      commonError:
        "Negatif taban ile negatif üssün farklı görevlerini birleştirmek.",
      check: "(-1/8)·(-8)=1.",
    },
    {
      code: "Q11",
      prompt: "2^4·2^7 ifadesi hangisine eşittir?",
      options: ["2^11", "2^28", "2^3", "4^11", "2^12"],
      knowledge: ["Aynı tabanla çarpmada üsler toplanır."],
      strategy: "Tabanı 2 olarak koru; 4+7’yi yaz.",
      steps: [
        "Dört 2 çarpanı ile yedi 2 çarpanı bir araya gelir.",
        "Toplam on bir 2 çarpanı vardır.",
        "Sonuç 2^(4+7)=2^11.",
      ],
      optionReasons: [
        "Aynı taban çarpımında 4+7=11.",
        "Üsleri çarpmak üssün üssü kuralıdır.",
        "Üsleri çıkarmak bölmede kullanılır.",
        "Tabanlar toplanarak 4 yapılmaz.",
        "Çarpan sayısı 4+7=11’dir, 12 değil.",
      ],
      commonError: "Çarpma işleminde üsleri çarpmak.",
      check: "2^4=16, 2^7=128; 16·128=2048=2^11.",
    },
    {
      code: "Q12",
      prompt: "7^6/7^2 ifadesi hangisine eşittir?",
      options: ["7^4", "7^3", "7^8", "1^4", "7^12"],
      knowledge: ["Sıfır olmayan ortak tabanda bölmede üsler çıkarılır."],
      strategy: "Tabanı koru; paydaki üsten paydadaki üssü çıkar.",
      steps: ["Taban 7 sıfırdan farklıdır.", "7^6/7^2=7^(6−2).", "Sonuç 7^4."],
      optionReasons: [
        "6−2=4 olduğundan 7^4.",
        "6/2 yapmak üs kuralı değildir.",
        "6+2, çarpma kuralına aittir.",
        "Tabanları bölüp üs farkını da uygulamak aynı sadeleşmeyi iki kez sayar.",
        "6·2, üssün üssü kuralını yanlış yerde uygular.",
      ],
      commonError: "Bölmede üsleri bölmek.",
      check: "7^4·7^2=7^6.",
    },
    {
      code: "Q13",
      prompt: "(3^2)^4 ifadesi hangisine eşittir?",
      options: ["3^8", "3^6", "3^16", "9^8", "12^2"],
      knowledge: ["Bir kuvvetin tam sayı kuvvetinde üsler çarpılır."],
      strategy: "Dört tane 3^2 çarpanını düşün.",
      steps: [
        "(3^2)^4=(3^2)(3^2)(3^2)(3^2).",
        "Aynı tabanın üs toplamı 2+2+2+2=8.",
        "Sonuç 3^8.",
      ],
      optionReasons: [
        "2·4=8.",
        "2+4 yapmak aynı tabanların çarpımıyla karıştırmaktır.",
        "2^4=16, üslerin çarpımı değildir.",
        "9 tabanını kullanırsan dış üs 4 kalmalıdır, 8 değil.",
        "Taban ile dış üs çarpılmaz.",
      ],
      commonError: "Üssün üssünde toplama yapmak.",
      check: "9^4=6561 ve 3^8=6561.",
    },
    {
      code: "Q14",
      prompt: "(2·5)^3 işleminin sonucu kaçtır?",
      options: ["1000", "30", "250", "125", "100"],
      knowledge: ["Bir çarpımın tam sayı kuvveti her çarpana uygulanabilir."],
      strategy: "Önce çarpımı bul veya her iki çarpanı küple.",
      steps: [
        "2·5=10.",
        "10^3=10·10·10=1000.",
        "Ayrı yoldan 2^3·5^3=8·125=1000.",
      ],
      optionReasons: [
        "İki yöntem de 1000 verir.",
        "30, 10 ile 3’ün çarpımıdır.",
        "250, yalnız 5’i küpleyip 2’yi birinci kuvvette bırakır.",
        "125, 2 çarpanını bütünüyle atlar.",
        "100, üçüncü yerine ikinci kuvvettir.",
      ],
      commonError: "Üssü çarpımın yalnız bir çarpanına uygulamak.",
      check: "8·125=1000.",
    },
    {
      code: "Q15",
      prompt: "(3/4)^(-2) kaçtır?",
      options: ["16/9", "9/16", "-9/16", "4/3", "-16/9"],
      knowledge: ["Negatif üs kesrin tersinin pozitif kuvvetini aldırır."],
      strategy: "Önce 3/4’ü 4/3’e çevir, sonra karesini al.",
      steps: [
        "(3/4)^(-2)=(4/3)^2.",
        "Payın ve paydanın karesini al: 4^2/3^2.",
        "Sonuç 16/9.",
      ],
      optionReasons: [
        "Ters alma ve kare birlikte 16/9 verir.",
        "9/16, pozitif ikinci kuvvettir.",
        "Negatif üs sonuca eksi işareti eklemez.",
        "4/3, yalnız tersini alır; kareyi unutur.",
        "Pozitif tabanın karesi ve tersi pozitiftir.",
      ],
      commonError: "Kesri ters çevirip üssü uygulamayı unutmak.",
      check: "(16/9)·(9/16)=1.",
    },
    {
      code: "Q16",
      prompt: "2^5·5^5 ifadesi hangisine eşittir?",
      options: ["10^5", "7^5", "10^10", "2^25", "25^5"],
      knowledge: ["Üs ortak olduğunda tabanlar çarpılabilir."],
      strategy: "Aynı beşli çarpan çiftlerini grupla.",
      steps: ["2^5·5^5=(2·5)^5.", "2·5=10.", "Sonuç 10^5."],
      optionReasons: [
        "Ortak üs 5 korunur, taban çarpımı 10 olur.",
        "Tabanlar toplanmaz.",
        "Üs zaten ortak olduğu için 5+5 yapılmaz.",
        "Farklı tabanları yok sayıp üsleri çarpmak geçersizdir.",
        "5·5 değil, 2·5 taban çarpımı gerekir.",
      ],
      commonError: "Aynı üs kuralını aynı taban kuralıyla karıştırmak.",
      check: "32·3125=100000=10^5.",
    },
    {
      code: "Q17",
      prompt: "(4^3·8^2)/2^5 işleminin sonucu kaçtır?",
      options: ["128", "64", "32", "256", "1024"],
      knowledge: ["Farklı tabanlar ortak asal tabana çevrilebilir."],
      strategy: "4=2^2 ve 8=2^3 yaz.",
      steps: [
        "4^3=(2^2)^3=2^6.",
        "8^2=(2^3)^2=2^6.",
        "2^6·2^6/2^5=2^(6+6−5)=2^7=128.",
      ],
      optionReasons: [
        "Net üs 7’dir.",
        "64, çarpım-bölümde net bir 2 çarpanını eksiltir.",
        "32, 8^2 çarpanının etkisini yanlış sadeleştirir.",
        "256 için net üs 8 gerekir; gerçek net üs 7’dir.",
        "1024 için net üs 10 gerekir; payda 2^5 ayrıca çıkarılmalıdır.",
      ],
      commonError: "Üssün üssünde toplamak veya paydadaki üssü çıkarmamak.",
      check: "64·64/32=128.",
    },
    {
      code: "Q18",
      prompt: "(9^2·27)/3^4 işleminin sonucu kaçtır?",
      options: ["27", "3", "9", "81", "243"],
      knowledge: ["9 ve 27, 3’ün kuvvetleridir."],
      strategy: "Her terimi 3 tabanında yaz.",
      steps: [
        "9^2=(3^2)^2=3^4 ve 27=3^3.",
        "Üstteki toplam üs 4+3=7.",
        "Paydadaki 4 çıkar: 3^(7−4)=3^3=27.",
      ],
      optionReasons: [
        "Net üs 3’tür ve 3^3=27.",
        "3 sonucu için net üs 1 gerekir; 9^2’nin kuvveti eksik hesaplanmıştır.",
        "9, net üssü 2 sanmaktır.",
        "81, paydadaki sadeleşmeyi eksik yapar.",
        "243, net üssü 5 sanır.",
      ],
      commonError: "9^2’yi 3^2 yazıp üssün üssünü atlamak.",
      check: "81·27/81=27.",
    },
    {
      code: "Q19",
      prompt: "3·2^5+5·2^5 kaçtır?",
      options: ["256", "2^15", "2^25", "16", "64"],
      knowledge: [
        "Aynı üslü terimlerin toplamında ortak çarpan dışarı alınır.",
      ],
      strategy: "2^5’i ortak çarpan al.",
      steps: ["3·2^5+5·2^5=(3+5)·2^5.", "8·2^5=2^3·2^5=2^8.", "2^8=256."],
      optionReasons: [
        "Katsayılar 8 yapar, ortak kuvvet 32’dir.",
        "Üsleri rastgele toplamak toplamın yapısını korumaz.",
        "5·5 yapmak üslü toplam kuralı değildir.",
        "16, ortak kuvvet 32’nin değerini kaybeder.",
        "64, toplam katsayı 8 yerine 2 kullanır.",
      ],
      commonError: "Toplamda üsleri birleştirmek.",
      check: "96+160=256.",
    },
    {
      code: "Q20",
      prompt:
        "n negatif olmayan bir tam sayı olsun. 5^(n+3)−2·5^(n+2) ifadesinin eşiti hangisidir?",
      options: ["3·5^(n+2)", "3·5^(2 n+5)", "5^(n+1)", "5^(n+2)", "-5^(n+2)"],
      knowledge: [
        "Ortak en küçük kuvvet dışarı alınır; çıkarma üsleri çıkarma işlemi değildir.",
      ],
      strategy: "5^(n+2) çarpanını görünür yaz.",
      steps: [
        "5^(n+3)=5^(n+2)·5.",
        "İfade 5^(n+2)(5−2) olur.",
        "Sonuç 3·5^(n+2).",
      ],
      optionReasons: [
        "Ortak kuvvetten sonra katsayı farkı 3 kalır.",
        "2 n+5, toplamdaki üsleri birleştirmekten gelir; burada çıkarma vardır.",
        "n+1 sonucu bölüm kuralının yanlış uygulanmasıdır.",
        "Katsayı farkı 3 atlanmıştır.",
        "5−2=3, -1 değildir.",
      ],
      commonError: "Toplam veya farkın üslerini doğrudan toplamak/çıkarmak.",
      check: "n=0 için 125−50=75=3·25.",
    },
    {
      code: "Q21",
      prompt: "2^3+2^4 işleminin sonucu kaçtır?",
      options: ["24", "128", "16", "32", "64"],
      knowledge: [
        "Üs toplama kuralı aynı tabanların çarpımı içindir; toplam için değildir.",
      ],
      strategy: "Terimleri ayrı hesapla veya ortak çarpan al.",
      steps: ["2^3=8 ve 2^4=16.", "8+16=24.", "Eşdeğer yol: 2^3(1+2)=8·3=24."],
      optionReasons: [
        "Gerçek toplam 8+16’dır.",
        "128=2^7, fakat burada terimler çarpılmıyor.",
        "16, ilk terimi atlar.",
        "32, iki terimi aynı 16 değeri sanır.",
        "64=8·8; verilen toplam değildir.",
      ],
      commonError: "a^m+a^n=a^(m+n) sanmak.",
      check: "24’ün 2’nin bir kuvveti olması gerekmiyor.",
    },
    {
      code: "Q22",
      prompt: "(1+2)^2−(1^2+2^2) işleminin sonucu kaçtır?",
      options: ["4", "0", "9", "5", "-4"],
      knowledge: [
        "Bir toplamın karesi, karelerin toplamından genellikle farklıdır.",
      ],
      strategy: "İki parantezli kısmı ayrı hesapla.",
      steps: ["(1+2)^2=3^2=9.", "1^2+2^2=1+4=5.", "Fark 9−5=4."],
      optionReasons: [
        "İki değer 9 ve 5’tir; fark 4.",
        "Üssü toplama üzerine yanlış dağıtmak farkı sıfır sanmaya yol açar.",
        "9, ikinci kısmı çıkarmayı atlar.",
        "5 yalnız ikinci kısmın değeridir.",
        "-4 çıkarma sırasını ters çevirir.",
      ],
      commonError: "(a+b)^2=a^2+b^2 kuralı var sanmak.",
      check: "Eksik kalan çapraz terim 2·1·2=4’tür.",
    },
    {
      code: "Q23",
      prompt:
        "a sıfırdan farklı bir gerçek sayı; m ve n tam sayılardır. Hangisi bütün bu değerler için doğrudur?",
      options: [
        "(a^m)^n=a^(m·n)",
        "a^m+a^n=a^(m+n)",
        "a^(-n)=−a^n",
        "a^m/a^n=a^(m/n)",
        "(a+a)^n=a^n+a^n",
      ],
      knowledge: ["Tam sayı üs kuralları tanımlılık koşullarıyla uygulanır."],
      strategy: "Her önerinin hangi işleme ait olduğunu kontrol et.",
      steps: [
        "a≠0 olduğu için verilen tam sayı kuvvetleri ve bölümler tanımlıdır.",
        "Üssün üssünde üsler çarpılır.",
        "Diğer öneriler birer genel kural değildir; küçük karşı örnekle elenir.",
      ],
      optionReasons: [
        "Tam sayı üslerde bu eşitlik tanımlı ifadeler için geçerlidir.",
        "a=2, m=1, n=2 için 2+4=6, 2^3=8.",
        "a=2, n=1 için 1/2 ile -2 eşit değildir.",
        "a=2, m=6, n=2 için gerçek bölüm 2^4=16; öneri 2^3=8 olur.",
        "a=1, n=2 için sol 4, sağ 2 olur.",
      ],
      commonError: "Bir tek örnekte doğru çıkmayı genel kuralın kanıtı sanmak.",
      check:
        "Doğru öneri yalnız üslerin tam sayı ve ifadelerin tanımlı olduğu kapsamda kullanılıyor.",
    },
    {
      code: "Q24",
      prompt:
        "x gerçek sayıdır. 2^x=A ve 3^x=B veriliyor. 6^x her gerçek x için daima hangisine eşittir?",
      options: ["A·B", "A+B", "A^B", "A/B", "A^2+B^2"],
      knowledge: [
        "Pozitif tabanlarda ortak gerçek üs için çarpım kuralı geçerlidir.",
      ],
      strategy: "6 tabanını 2·3 olarak yaz.",
      steps: [
        "6^x=(2·3)^x.",
        "Pozitif tabanlarla bu ifade 2^x·3^x olur.",
        "Verilenleri yerine koyunca A·B bulunur.",
      ],
      optionReasons: [
        "2^x ve 3^x çarpılır.",
        "Taban çarpımı, kuvvetlerin toplamına dönüşmez.",
        "B bir üs olarak verilmedi; 3^x’in değeridir.",
        "A/B, (2/3)^x’e karşılık gelir.",
        "Kareleri toplamak 6^x’in yapısını temsil etmez.",
      ],
      commonError: "Verilen A ve B’yi taban veya üs sanmak.",
      check: "x=1 için A=2, B=3 ve A·B=6.",
    },
    {
      code: "Q25",
      prompt:
        "x gerçek sayıdır. 3^x=A ve 5^x=B ise 75^x her gerçek x için daima hangisine eşittir?",
      options: ["A·B^2", "A^2·B", "A+B^2", "(A·B)^2", "A·B"],
      knowledge: [
        "Pozitif tabanı asal çarpanlarıyla yazarak ortak üs dağıtılır.",
      ],
      strategy: "75=3·5^2 yaz.",
      steps: ["75^x=(3·5^2)^x.", "3^x·(5^x)^2 elde edilir.", "Sonuç A·B^2."],
      optionReasons: [
        "3 çarpanı bir, 5 çarpanı iki kez bulunur.",
        "A^2·B, 45^x olur.",
        "Tabandaki çarpım toplam oluşturmaz.",
        "(A·B)^2, 225^x olur; 3’ün de karesini almıştır.",
        "A·B, yalnız 15^x’i temsil eder.",
      ],
      commonError:
        "Tabanın asal çarpanlarındaki üsleri verilen sembollerin üzerindeki üslerde unutmak.",
      check: "x=1 için 3·25=75.",
    },
    {
      code: "Q26",
      prompt:
        "x gerçek sayıdır. 2^x=A, 3^x=B, 5^x=C veriliyor. 0,18^x her gerçek x için daima hangisine eşittir?",
      options: [
        "B^2/(A·C^2)",
        "A·B^2/C^2",
        "B/(A·C)",
        "A·B/C^2",
        "B^2/(A^2·C)",
      ],
      knowledge: ["Ondalık taban kesre, sonra asal çarpanlara ayrılabilir."],
      strategy: "0,18=18/100=9/50 yaz.",
      steps: [
        "9/50=3^2/(2·5^2).",
        "Pozitif tabanların kuvvetlerini ayır: (3^x)^2/((2^x)(5^x)^2).",
        "Sonuç B^2/(A·C^2).",
      ],
      optionReasons: [
        "Pay 9’dur; payda 50=2·25’tir.",
        "A·B^2/C^2, 0,72^x’in yapısıdır; 2 çarpanı yanlış tarafa alınmıştır.",
        "3’ün ve 5’in ikinci kuvvetleri kaybolmuştur.",
        "3 çarpanının karesi eksik, 2 çarpanı yanlış taraftadır.",
        "Bu ifade 9/20 tabanının x’inci kuvvetidir; 9/50 değildir.",
      ],
      commonError: "Ondalığı kesre dönüştürmeden sembolleri tahmin etmek.",
      check: "x=1 için 9/(2·25)=9/50=0,18.",
    },
    {
      code: "Q27",
      prompt: "x gerçek sayı ve 2^x=5 olduğuna göre 8^x kaçtır?",
      options: ["125", "15", "25", "40", "625"],
      knowledge: ["8=2^3 olduğundan 8^x=(2^x)^3 olur."],
      strategy: "Verilen bütün kuvveti tek bir sembol gibi yerine koy.",
      steps: [
        "8^x=(2^3)^x=2^(3 x).",
        "Pozitif tabanda 2^(3 x)=(2^x)^3.",
        "5^3=125.",
      ],
      optionReasons: [
        "Verilen 5 değeri küp alınır.",
        "5 ile 3’ü çarpmak kuvvet değildir.",
        "25 ikinci kuvvettir; üçüncü kuvvet gerekir.",
        "8 ile 5’i çarpmak verilen denklemi kullanmaz.",
        "625 dördüncü kuvvettir.",
      ],
      commonError: "Verilen kuvvetin değerini dış üs ile çarpmak.",
      check: "5·5·5=125.",
    },
    {
      code: "Q28",
      prompt: "x gerçek sayı ve 2^x=3 ise 4^(x+1) kaçtır?",
      options: ["36", "12", "18", "9", "81"],
      knowledge: ["4^x=(2^x)^2 ve 4^(x+1)=4^x·4."],
      strategy: "Önce verilen kuvvetin karesini, sonra ek çarpanı bul.",
      steps: [
        "4^x=(2^x)^2=3^2=9.",
        "Üsteki +1, bir tane daha 4 çarpanı getirir.",
        "4^(x+1)=9·4=36.",
      ],
      optionReasons: [
        "9 ile 4 çarpılır.",
        "12, 3 ile 4’ü çarpar; 4^x=9 adımı eksiktir.",
        "18, ek çarpanı 4 yerine 2 alır.",
        "9 yalnız 4^x’tir; üsteki +1 unutulmuştur.",
        "81, 4^x değerini yeniden karesini alır; istenen bu değildir.",
      ],
      commonError: "Üsteki +1’i sonuca +1 eklemek veya çarpanı unutmak.",
      check: "4^(x+1)/4^x=4 olmalı.",
    },
    {
      code: "Q29",
      prompt: "x gerçek sayıdır. 8^(x-1)=4^(x+2) denkleminin çözümü kaçtır?",
      options: ["7", "5", "-7", "2", "1"],
      knowledge: [
        "Pozitif ve 1’den farklı ortak tabanda eşit kuvvetlerin üsleri eşittir.",
      ],
      strategy: "Her iki tabanı 2’nin kuvveti yaz.",
      steps: [
        "8=2^3, 4=2^2.",
        "2^(3 x-3)=2^(2 x+4), dolayısıyla 3 x-3=2 x+4.",
        "x=7.",
      ],
      optionReasons: [
        "3 x-3=2 x+4 eşitliği x=7 verir.",
        "5, parantez açarken sabitleri yanlış toplar.",
        "-7, terimleri karşıya geçirirken işareti ters alır.",
        "2 yalnız sağ tabanın 2 üzerindeki üssüdür; x değildir.",
        "1 konulursa sol 1, sağ 64 olur.",
      ],
      commonError: "3(x-1) veya 2(x+2) parantezini yanlış açmak.",
      check: "x=7 için iki taraf da 2^18 olur.",
    },
    {
      code: "Q30",
      prompt: "9^(x-1)=27 ve x gerçek sayı ise x kaçtır?",
      options: ["5/2", "3/2", "2", "3", "1/2"],
      knowledge: ["9=3^2 ve 27=3^3 ortak taban sağlar."],
      strategy: "Önce x-1’i bul; sonra 1 ekle.",
      steps: ["3^(2 x-2)=3^3.", "2 x-2=3; 2 x=5.", "x=5/2."],
      optionReasons: [
        "Üs eşitliği 2 x=5 olur.",
        "3/2, x-1’in değeridir; 1 eklenmemiştir.",
        "x=2 için sol 9 olur, 27 olmaz.",
        "x=3 için sol 81 olur.",
        "x=1/2 için sol 1/3 olur.",
      ],
      commonError: "x-1’i bulup x diye sunmak.",
      check: "9^(3/2)=(√9)^3=27.",
    },
    {
      code: "Q31",
      prompt:
        "x gerçek sayıdır. 1^(2 x+3)=1^(x-4) denkleminin çözüm kümesi nedir?",
      options: [
        "Bütün gerçek sayılar",
        "Yalnız -7",
        "Yalnız 0",
        "Boş küme",
        "Yalnız 1",
      ],
      knowledge: [
        "1’in her gerçek kuvveti 1’dir; bu tabanda üsler eşitlenmez.",
      ],
      strategy: "Denklemde iki tarafın değerine bak.",
      steps: [
        "Her x için sol taraf 1’dir.",
        "Her x için sağ taraf da 1’dir.",
        "Denklem bütün gerçek sayılarda sağlanır.",
      ],
      optionReasons: [
        "Taban 1 olduğundan iki taraf her zaman eşittir.",
        "-7, geçersiz üs eşitlemesinden çıkar; başka x’ler de çözümdür.",
        "x=2 gibi sıfır dışındaki değerler de sağlar.",
        "x=0 için bile eşitlik 1=1 olduğundan küme boş değildir.",
        "x=3 de sağlar; yalnız 1 olamaz.",
      ],
      commonError:
        "Ortak taban var diye 1 tabanında da üsleri zorunlu eşitlemek.",
      check: "x=0 ve x=2 ile dene; ikisi de sağlar.",
    },
    {
      code: "Q32",
      prompt:
        "x gerçek sayıdır. 3^(2 x+1)=3^(2 x+4) denklemi için hangisi doğrudur?",
      options: [
        "Gerçek çözümü yoktur",
        "x=1",
        "x=3",
        "x=-3/2",
        "Bütün gerçek sayılar çözümdür",
      ],
      knowledge: [
        "3 pozitif ve 1’den farklıdır; eşit kuvvetler eşit üs gerektirir.",
      ],
      strategy: "Üs eşitliğinde x’ler yok olduğunda kalan ifadeyi incele.",
      steps: [
        "2 x+1=2 x+4 olmalı.",
        "İki taraftan 2 x çıkarılınca 1=4 kalır.",
        "Bu yanlış olduğundan çözüm yoktur.",
      ],
      optionReasons: [
        "Hiçbir x, 1=4 çelişkisini gideremez.",
        "x=1 için 3^3 ile 3^6 eşit değildir.",
        "x=3 için üsler 7 ve 10 olur.",
        "x=-3/2 için üsler-2 ve 1 olur.",
        "Sağ taraf her x için solun 27 katıdır; eşit olamaz.",
      ],
      commonError: "x’ler yok olunca kalan sabit çelişkiyi görmemek.",
      check: "Sağ/sol=3^3=27; oran 1 değildir.",
    },
    {
      code: "Q33",
      prompt: "(1/2)^8 ile (1/2)^5 arasındaki ilişki nedir?",
      options: [
        "(1/2)^8 < (1/2)^5",
        "(1/2)^8 > (1/2)^5",
        "İkisi eşittir",
        "İkisi de negatiftir",
        "Karşılaştırmak için değerler yetersizdir",
      ],
      knowledge: [
        "0 ile 1 arasındaki pozitif tabanda üs arttıkça değer küçülür.",
      ],
      strategy: "Fazladan üç yarımla çarpmayı düşün.",
      steps: [
        "(1/2)^8=(1/2)^5·(1/2)^3.",
        "Ek çarpan 1/8, 0 ile 1 arasındadır.",
        "Bu nedenle sekizinci kuvvet daha küçüktür.",
      ],
      optionReasons: [
        "Ek 1/8 çarpanı değeri küçültür.",
        "Bu yön, taban 1’den büyük olduğunda geçerli olur.",
        "Oran 1/8 olduğundan eşit değiller.",
        "Pozitif tabanın kuvvetleri pozitiftir.",
        "Taban ve üsler tamamen verilmiştir.",
      ],
      commonError: "Büyük üssün her tabanda büyük değer verdiğini sanmak.",
      check: "1/256 < 1/32.",
    },
    {
      code: "Q34",
      prompt: "2^18 ile 8^6 arasındaki ilişki nedir?",
      options: [
        "Eşittir",
        "2^18 daha büyüktür",
        "8^6 daha büyüktür",
        "İkisi de 2^24’e eşittir",
        "İkisi de 16^6’ya eşittir",
      ],
      knowledge: ["8=2^3 olduğundan (2^3)^6=2^18."],
      strategy: "Tabanları ortaklaştır.",
      steps: [
        "8^6=(2^3)^6.",
        "İç içe tam sayı üsler çarpılır: 3·6=18.",
        "İki ifade de 2^18’dir.",
      ],
      optionReasons: [
        "Aynı taban ve aynı üs elde edilir.",
        "Üsleri yalnız görünen 18 ve 6 olarak karşılaştırmak taban farkını unutur.",
        "Büyük taban tek başına sonucu belirlemez.",
        "24,18 ile 6’nın toplamıdır; bu işlem yoktur.",
        "16^6=2^24 olduğundan farklıdır.",
      ],
      commonError: "Tabanları değiştirmeden yalnız üsleri karşılaştırmak.",
      check: "Her ikisi 262144’tür; büyük çarpımı açmak gerekmez.",
    },
    {
      code: "Q35",
      prompt: "5^4 ile 5^2 nasıl sıralanır?",
      options: [
        "5^4 > 5^2",
        "5^4 < 5^2",
        "Eşittir",
        "Toplamları 5^6’dır",
        "Bölümleri 5^8’dir",
      ],
      knowledge: ["Taban 5, 1’den büyüktür; büyük üs büyük değer verir."],
      strategy: "Bölümün 1’den büyük olup olmadığına bak.",
      steps: [
        "5^4/5^2=5^(4-2)=25.",
        "Oran 25>1 olduğundan ilk ifade büyüktür.",
      ],
      optionReasons: [
        "İlk değer ikinci değerin 25 katıdır.",
        "0<taban<1 kuralı burada uygulanmaz.",
        "Aralarındaki oran 25’tir,1 değil.",
        "625+25=650;5^6=15625.",
        "Bölümde üsler çıkarılır; sonuç 5^2’dir.",
      ],
      commonError: "Çarpma ve toplama kurallarını karıştırmak.",
      check: "625>25.",
    },
    {
      code: "Q36",
      prompt: "3^5 ile 5^3 karşılaştırıldığında hangisi doğrudur?",
      options: [
        "3^5 > 5^3",
        "3^5 < 5^3",
        "Eşittir",
        "İkisi de 15^8’dir",
        "İkisi de 15’tir",
      ],
      knowledge: [
        "Taban ve üs birlikte değiştiğinde yalnız birini karşılaştırmak yetmez.",
      ],
      strategy: "Bu küçük kuvvetlerin değerlerini hesapla.",
      steps: ["3^5=3·3·3·3·3=243.", "5^3=125.", "243>125."],
      optionReasons: [
        "İki gerçek değer 243 ve 125’tir.",
        "Taban 5’in büyük olması tek başına üstünlük sağlamaz.",
        "243 ve 125 farklıdır.",
        "Tabanları çarpıp üsleri toplamak bu karşılaştırma için bir kural değildir.",
        "15 sayısı, 3 ile 5’in çarpımıdır; iki kuvvetten biri değildir.",
      ],
      commonError: "Büyük tabanı veya büyük üssü tek başına kazanan saymak.",
      check: "Fark 243-125=118>0.",
    },
    {
      code: "Q37",
      prompt: "8^(2/3) gerçek sayılarda kaçtır?",
      options: ["4", "2", "16", "64/3", "-4"],
      knowledge: [
        "Pozitif tabanda payda kökün derecesi, pay kuvvetin üssüdür.",
      ],
      strategy: "Önce küpkök 8’i bul; sonra karesini al.",
      steps: ["∛8=2.", "8^(2/3)=(∛8)^2=2^2=4."],
      optionReasons: [
        "Küpkökten sonra ikinci kuvvet alınır.",
        "2 yalnız 8^(1/3)’tür; pay 2 unutulmuştur.",
        "16, yanlışlıkla dördüncü kuvvet alır.",
        "Üs kesri sonuca bölme komutu değildir.",
        "Pozitif tabanın gerçek kuvveti negatife dönüşmez.",
      ],
      commonError: "Kesirli üssün payını veya paydasını işlem dışı bırakmak.",
      check: "4^3=64=8^2.",
    },
    {
      code: "Q38",
      prompt: "27^(-2/3) kaçtır?",
      options: ["1/9", "9", "-9", "1/3", "-1/9"],
      knowledge: ["Negatif üs karşılık aldırır; işareti negatife çevirmez."],
      strategy: "Önce pozitif 2/3 kuvvetini bul.",
      steps: ["∛27=3;27^(2/3)=3^2=9.", "Negatif üs nedeniyle 27^(-2/3)=1/9."],
      optionReasons: [
        "Pozitif kuvvet 9’un çarpmaya göre tersi 1/9’dur.",
        "9, negatif üs unutulursa çıkar.",
        "Negatif üs negatif sonuç demek değildir.",
        "1/3, paydaki 2’yi unutmuştur.",
        "Sonuç pozitif olmalıdır.",
      ],
      commonError: "Negatif üssü negatif işaret gibi okumak.",
      check: "(1/9)·9=1.",
    },
    {
      code: "Q39",
      prompt: "Gerçek sayılarda (-8)^(1/3) kaçtır?",
      options: ["-2", "2", "-4", "4", "Gerçek sayılarda tanımsızdır"],
      knowledge: ["Tek dereceli kökler negatif sayılarda da gerçektir."],
      strategy: "Küpü-8 olan sayıyı ara.",
      steps: ["(-2)·(-2)·(-2)=-8.", "Bu yüzden∛(-8)=-2."],
      optionReasons: [
        "Küpü-8 olan gerçek sayı-2’dir.",
        "2’nin küpü+8’dir.",
        "(-4)^3=-64 olduğundan uymaz.",
        "4’ün küpü 64’tür.",
        "Negatif taban bütün rasyonel üslerde tanımsız değildir; sade payda 3 tektir.",
      ],
      commonError: "Negatif tabanlı bütün kesirli üsleri gerçek dışı saymak.",
      check: "(-2)^3=-8.",
    },
    {
      code: "Q40",
      prompt: "Gerçek sayılarda (-16)^(1/2) için hangisi doğrudur?",
      options: ["Gerçek sayılarda tanımlı değildir", "-4", "4", "-8", "0"],
      knowledge: ["Bir gerçek sayının karesi negatif olamaz."],
      strategy: "Karesi-16 olan gerçek sayı bulunup bulunmadığını sor.",
      steps: [
        "Her gerçek y için y^2≥0.",
        "Bu nedenle y^2=-16 sağlayan gerçek y yoktur.",
        "İfade gerçek sayılar kümesinde tanımlı değildir.",
      ],
      optionReasons: [
        "Çift dereceli kök negatif tabanda gerçek değildir.",
        "(-4)^2=+16’dır.",
        "4^2=+16’dır.",
        "(-8)^2=64’tür.",
        "0^2=0’dır, -16 değil.",
      ],
      commonError: "Eksi işaretini kökün dışına koşulsuz çıkarmak.",
      check: "Önerilen değerin karesini al; -16 elde edilemez.",
    },
    {
      code: "Q41",
      prompt:
        "A=((−1)^2)^(1/2), B=(−1)^(2·1/2) olarak tanımlanıyor. Gerçek sayılarda A ve B nedir?",
      options: [
        "A=1, B=-1",
        "A=-1, B=-1",
        "A=1, B=1",
        "A=-1, B=1",
        "İki ifade de tanımsızdır",
      ],
      knowledge: [
        "Negatif tabanda rasyonel üslerle iç içe kuvvet kuralı koşulsuz uygulanmaz.",
      ],
      strategy: "Parantezli işlemleri ayrı ayrı hesapla.",
      steps: [
        "A’da önce(-1)^2=1; sonra√1=1.",
        "B’de üs 2·1/2=1; (-1)^1=-1.",
        "A ve B farklıdır.",
      ],
      optionReasons: [
        "İki tanımlı ifade farklı değer verir.",
        "A’da kareden sonra taban+1 olmuştur.",
        "B’nin üssü 1’dir; taban-1 kalır.",
        "Her iki işaret de ters yorumlanmıştır.",
        "A=√1 ve B=(-1)^1 gerçek sayılardır.",
      ],
      commonError:
        "İki taraf tanımlıysa üslerin her zaman çarpılabileceğini sanmak.",
      check: "Genel rasyonel üs yasaları için pozitif taban koşulunu koru.",
    },
    {
      code: "Q42",
      prompt: "810 000 000 sayısının bilimsel gösterimi hangisidir?",
      options: ["8,1×10^8", "81×10^8", "8,1×10^9", "0,81×10^8", "810×10^6"],
      knowledge: ["Bilimsel gösterimde 1≤|katsayı|<10 olmalı."],
      strategy: "Ondalık ayıracı 8’in sağına getir ve basamakları say.",
      steps: [
        "810000000=8,1·100000000.",
        "100000000=10^8.",
        "8,1×10^8 normalleştirilmiştir.",
      ],
      optionReasons: [
        "Katsayı 8,1 aralıkta, değer doğrudur.",
        "81×10^8 değeri on kat büyütür ve katsayıyı normalleştirmez.",
        "Üs 9 değeri on kat büyütür.",
        "0,81×10^8 değeri on kat küçültür; katsayı da 1’den küçüktür.",
        "Değer aynıdır ama katsayı 810 standart aralıkta değildir.",
      ],
      commonError:
        "Eşit değerde olan her onlu kuvvet yazımını bilimsel standart sanmak.",
      check: "8,1·100000000=810000000.",
    },
    {
      code: "Q43",
      prompt: "0,00042 sayısının bilimsel gösterimi nedir?",
      options: ["4,2×10^-4", "4,2×10^4", "42×10^-4", "4,2×10^-5", "0,42×10^-3"],
      knowledge: ["Küçük pozitif sayıda 10’un negatif kuvveti gerekir."],
      strategy: "4,2 elde etmek için ayıracı dört basamak sağa kaydır.",
      steps: ["0,00042=4,2/10000.", "1/10000=10^-4.", "Sonuç 4,2×10^-4."],
      optionReasons: [
        "Hem değer hem katsayı aralığı doğrudur.",
        "Pozitif 4 üssü 42000 verir.",
        "42×10^-4=0,0042 ve katsayı 42 aralık dışıdır.",
        "10^-5 bir basamak fazla küçültür.",
        "Değer eşittir fakat 0,42 katsayısı standart aralık dışıdır.",
      ],
      commonError: "Ayıracı sağa kaydırınca üssü de pozitif yapmak.",
      check: "4,2/10000=0,00042.",
    },
    {
      code: "Q44",
      prompt:
        "72×10^5 ifadesinin normalleştirilmiş bilimsel gösterimi hangisidir?",
      options: ["7,2×10^6", "7,2×10^4", "7,2×10^5", "72×10^6", "0,72×10^7"],
      knowledge: [
        "Katsayı on kat küçültülürse toplam değer için 10’un üssü 1 artar.",
      ],
      strategy: "72=7,2·10 yaz.",
      steps: ["72×10^5=7,2×10×10^5.", "10×10^5=10^6.", "Sonuç 7,2×10^6."],
      optionReasons: [
        "Katsayı÷10, kuvvet×10 ile değer korunur.",
        "Üssü azaltmak değeri yüz kat küçültür.",
        "Üssü sabit tutmak on kat küçültür.",
        "Katsayı 72 normalleşmemiştir ve değer on kat büyür.",
        "Değer aynı olsa da katsayı 0,72 aralık dışıdır.",
      ],
      commonError: "Katsayı ile üs dönüşümlerini aynı yönde yapmak.",
      check: "İki yazım da 7200000 olmalı.",
    },
    {
      code: "Q45",
      prompt: "0,36×10^8 ifadesi bilimsel standartta nasıl yazılır?",
      options: ["3,6×10^7", "3,6×10^9", "3,6×10^8", "36×10^6", "0,036×10^9"],
      knowledge: ["Katsayı on kat büyütülürse 10’un üssü 1 azalır."],
      strategy: "0,36=3,6/10 yaz.",
      steps: ["0,36×10^8=3,6×10^-1×10^8.", "Üsler-1+8=7.", "Sonuç 3,6×10^7."],
      optionReasons: [
        "Katsayı aralığı ve değer doğrudur.",
        "Üssü artırmak değeri yüz kat büyütür.",
        "Katsayı on kat artarken üssü sabit tutmak değeri değiştirir.",
        "Değer aynı fakat 36 katsayısı standart değildir.",
        "Değer aynı fakat 0,036 katsayısı standart değildir.",
      ],
      commonError:
        "Sayıyı eşit tutmakla normalleştirme koşulunu ayrı denetlememek.",
      check: "3,6×10000000=36000000.",
    },
    {
      code: "Q46",
      prompt: "(6×10^7)·(4×10^-3) çarpımının bilimsel gösterimi nedir?",
      options: ["2,4×10^5", "24×10^4", "2,4×10^4", "10×10^4", "2,4×10^10"],
      knowledge: [
        "Katsayılar çarpılır, aynı taban 10’un üsleri toplanır; sonra normalleştirilir.",
      ],
      strategy: "Önce 24×10^4 elde et.",
      steps: [
        "6·4=24;7+(-3)=4.",
        "Çarpım 24×10^4.",
        "24=2,4·10 olduğu için 2,4×10^5.",
      ],
      optionReasons: [
        "Son normalleştirme üsse 1 ekler.",
        "Değer doğru fakat katsayı 24 bilimsel standartta değildir.",
        "24’ü 2,4 yaparken üs artırılmamıştır.",
        "Katsayılar toplanmaz; çarpılır.",
        "7-(-3)=10 yapmak negatif üssün işaretini yanlış işler.",
      ],
      commonError: "Çarpımdan sonra katsayıyı standart aralığa getirmemek.",
      check: "60000000·0,004=240000.",
    },
    {
      code: "Q47",
      prompt: "6×10^5 + 4×10^6 toplamının bilimsel gösterimi nedir?",
      options: ["4,6×10^6", "10×10^11", "10×10^6", "4,6×10^5", "2,4×10^12"],
      knowledge: [
        "Toplamada 10’un üsleri toplanmaz; önce ortak basamak seçilir.",
      ],
      strategy: "6×10^5=0,6×10^6 dönüştür.",
      steps: ["0,6×10^6+4×10^6=(0,6+4)×10^6.", "Sonuç 4,6×10^6."],
      optionReasons: [
        "Katsayılar aynı 10 kuvveti yanında toplanmıştır.",
        "Üs toplama çarpma kuralıdır; bu işlem toplamadır.",
        "6 katsayısını doğrudan 4’e eklemek bir basamak farkını unutur.",
        "Üs 5 alınırsa katsayı 46 olmalıdır;4,6 değil.",
        "Bu, iki terimin çarpımına karşılık gelir.",
      ],
      commonError:
        "Farklı basamak büyüklüklerini katsayılar aynıymış gibi toplamak.",
      check: "600000+4000000=4600000.",
    },
    {
      code: "Q48",
      prompt: "7,2×10^6 ile 9,1×10^5 pozitif sayıları nasıl sıralanır?",
      options: [
        "7,2×10^6 > 9,1×10^5",
        "7,2×10^6 < 9,1×10^5",
        "Eşittir",
        "Katsayısı büyük olan her zaman büyüktür",
        "Karşılaştırılamaz",
      ],
      knowledge: [
        "Normalleşmiş pozitif bilimsel sayılarda önce 10’un üssü karşılaştırılır.",
      ],
      strategy: "İkinci sayıyı 10^6 cinsinden de görebilirsin.",
      steps: ["9,1×10^5=0,91×10^6.", "7,2>0,91 olduğundan ilk sayı büyüktür."],
      optionReasons: [
        "Milyon basamağı yüz bin basamağından büyüktür.",
        "9,1 katsayısı tek başına sayı büyüklüğünü belirlemez.",
        "Katsayılar aynı basamağa getirilince farklıdır.",
        "Üsler farklıyken bu genel önerme yanlıştır.",
        "İki sayı da tamamen verilmiştir.",
      ],
      commonError: "Sayıyı yalnız katsayısıyla karşılaştırmak.",
      check: "7200000>910000.",
    },
    {
      code: "Q49",
      prompt: "-2×10^5 ile -9×10^4 nasıl sıralanır?",
      options: [
        "-2×10^5 < -9×10^4",
        "-2×10^5 > -9×10^4",
        "Eşittir",
        "İkisi de pozitiftir",
        "Büyük üs her işarette büyük sayı demektir",
      ],
      knowledge: ["Negatif sayılarda mutlak değer büyüdükçe sayı küçülür."],
      strategy: "Önce sayıları-200000 ve-90000 olarak oku.",
      steps: [
        "200000>90000.",
        "Sayı doğrusunda-200000 daha soldadır.",
        "Bu yüzden-2×10^5 < -9×10^4.",
      ],
      optionReasons: [
        "İşaret nedeniyle büyüklük sırası ters döner.",
        "Pozitif bilimsel karşılaştırma kuralı işaret unutularak uygulanmıştır.",
        "-200000 ile-90000 eşit değildir.",
        "Baştaki eksi işaretleri sayıları negatife çevirir.",
        "Bu kural yalnız uygun pozitif normalleştirilmiş sayılarda kullanılabilir.",
      ],
      commonError:
        "Pozitif sayılara ait üs önceliğini negatiflere koşulsuz taşımak.",
      check: "-200000+200000=0; -90000 daha sağdadır.",
    },
    {
      code: "Q50",
      prompt:
        "Aşağıdakilerden hangisi sıfırdan farklı bir sayının normalleştirilmiş bilimsel gösterimidir?",
      options: ["-3×10^4", "31×10^4", "0,3×10^4", "10×10^-2", "0×10^5"],
      knowledge: [
        "Katsayının mutlak değeri 1 dahil 10 hariç aralıkta olmalı; üs tam sayı olmalı.",
      ],
      strategy: "İşareti değil katsayının mutlak değerini denetle.",
      steps: [
        "|-3|=3 ve 1≤3<10.",
        "Diğer katsayılar 31; 0,3; 10 ve 0’dır; hiçbiri aralıkta değildir.",
      ],
      optionReasons: [
        "Negatif katsayı mümkündür; mutlak değeri 3 uygundur.",
        "31≥10 olduğundan normalleştirilmelidir.",
        "0,3<1 olduğundan normalleştirilmelidir.",
        "10 üst sınırdır ve dahil değildir.",
        "Bu yazım sıfırı verir; soru sıfırdan farklı sayı ister.",
      ],
      commonError:
        "Bilimsel gösterimde katsayının mutlaka pozitif olması gerektiğini sanmak.",
      check: "-3×10^4=-30000; koşul 1≤|a|<10’dur.",
    },
    {
      code: "Q51",
      prompt:
        "Logaritmik ölçekli bir eksende 10, 100 ve 1000 eşit aralıklarla işaretleniyor. Her bir aralık hangi değişimi gösterir?",
      options: [
        "Değerin 10 katına çıkmasını",
        "Değere 90 eklenmesini",
        "Değere 900 eklenmesini",
        "Değerin karesinin alınmasını",
        "Değerin yarıya inmesini",
      ],
      knowledge: [
        "Logaritmik eksende eşit uzaklıklar eşit çarpan oranlarını gösterir.",
      ],
      strategy: "Ardışık sayıların oranlarını karşılaştır.",
      steps: [
        "100/10=10.",
        "1000/100=10.",
        "İki aralıkta da 10 kat artış vardır.",
      ],
      optionReasons: [
        "Oran iki aralıkta da 10’dur.",
        "İlk fark 90, ikinci fark 900’dür; sabit ekleme yoktur.",
        "İlk aralıkta 900 eklenmez.",
        "10’un karesi 100 olsa da 100’ün karesi 10000’dir; üçüncü işaret 1000’dir.",
        "Değerler azalmak yerine artmaktadır.",
      ],
      commonError: "Eşit çizim aralığını her eksende eşit sayı farkı sanmak.",
      check:
        "10 tabanındaki logaritma değerleri 1, 2 ve 3 eşit aralıklarla ilerler.",
    },
    {
      code: "Q52",
      prompt:
        "Başlangıçta 200 hücre vardır. Her tamamlanan saatte sayı iki katına çıkıyor. Altı saat sonunda kaç hücre vardır?",
      options: ["12800", "1200", "6400", "25600", "202"],
      knowledge: [
        "Başlangıç anı 0. adımdır; altı saat altı çarpan 2 demektir.",
      ],
      strategy: "200·2^6 modelini kur.",
      steps: [
        "Saat 0:200; saat 1:400.",
        "Altı saatte 200·2^6.",
        "2^6=64;200·64=12800.",
      ],
      optionReasons: [
        "Başlangıçtan sonra altı ikiye katlama vardır.",
        "200·6 doğrusal artış varsayar.",
        "6400 yalnız beş katlama içerir.",
        "25600 yedi katlama içerir.",
        "200’e 2 eklemek iki katına çıkmak değildir.",
      ],
      commonError: "Başlangıcı ilk katlama sayıp bir adım eksiltmek.",
      check: "Son saatte 6400’den 12800’e çıkar.",
    },
    {
      code: "Q53",
      prompt:
        "Başlangıç miktarı 80 birim olan bir madde her adım sonunda yarıya düşüyor. Dört adım sonunda kaç birim kalır?",
      options: ["5", "20", "10", "40", "-5"],
      knowledge: ["Yarıya inme çarpanı 1/2’dir; adım sayısı üs olur."],
      strategy: "80·(1/2)^4 hesapla.",
      steps: ["Dört yarılanma 80→40→20→10→5.", "80/16=5."],
      optionReasons: [
        "Dört kez yarıya bölünmüştür.",
        "20 iki adım sonundaki değerdir.",
        "10 üç adım sonundaki değerdir.",
        "40 bir adım sonundaki değerdir.",
        "Pozitif miktarı pozitif yarımla çarpmak negatif yapmaz.",
      ],
      commonError: "Azalışı negatif çarpanla modellemek.",
      check: "5·2^4=80 başlangıcı geri verir.",
    },
    {
      code: "Q54",
      prompt:
        "Başlangıçta 50 puan olan bir dizide her adım sonunda puan üç katına çıkıyor. Dört adım sonunda kaç puan olur?",
      options: ["4050", "600", "1350", "12150", "200"],
      knowledge: [
        "Üstel artışta her adım aynı sayıyı eklemek yerine aynı çarpanı uygular.",
      ],
      strategy: "50·3^4 yaz.",
      steps: ["3^4=81.", "50·81=4050."],
      optionReasons: [
        "Dört çarpan 3 başlangıçla çarpılır.",
        "50·3·4, tekrarlı katlanmayı doğrusal sayar.",
        "1350 üç adımın sonucudur.",
        "12150 beş adımın sonucudur.",
        "200,50 ile 4’ü çarpar; üç katına çıkmayı kullanmaz.",
      ],
      commonError: "Adım çarpanı ile adım sayısını doğrudan çarpmak.",
      check: "50→150→450→1350→4050.",
    },
    {
      code: "Q55",
      prompt:
        "Bir süreç başlangıçta 50 birimdir; her tamamlanan adımda miktar 0 ile çarpılıyor. Henüz hiçbir adım tamamlanmadığı 0. adımda miktar kaçtır?",
      options: ["50", "0", "1", "Tanımsız", "-50"],
      knowledge: ["Sıfırıncı adım, işlem yapılmamış başlangıç değeridir."],
      strategy: "Henüz 0 çarpanının uygulanmadığını fark et.",
      steps: [
        "0. adım tanım gereği başlangıçtır:50.",
        "İlk adım tamamlanınca 50·0=0 olur.",
        "Bu başlangıç tanımı 0^0 ifadesine değer atamaz.",
      ],
      optionReasons: [
        "İşlem başlamadan miktar 50’dir.",
        "0 ilk adım ve sonraki adımlar için geçerlidir.",
        "1, başlangıç miktarını göz ardı eder.",
        "Süreç başlangıcı ayrıca tanımlıdır;0^0 hesaplamak gerekmez.",
        "Negatif işaret üreten bir işlem yoktur.",
      ],
      commonError: "Süreçte adım 0 tanımını 0^0’ı 1 saymaya gerekçe göstermek.",
      check: "Dizi 50 →0 →0 →… şeklinde başlar.",
    },
  ],
  sheet: [
    {
      title: "Tanım ve parantez",
      text: [
        "a^n, n pozitif tam sayıysa n tane a çarpanıdır. 3⁴=81;4·3=12.",
        "-2⁴=-16; (-2)⁴=16. Tek üslerde değerlerin çakışması genel eşitlik değildir.",
      ],
    },
    {
      title: "Sıfır, bir ve negatif taban",
      text: [
        "a¹=a; a≠0 iken a⁰=1. 0ⁿ=0 yalnız pozitif üslerde. 0⁰ ve 0’ın negatif kuvvetleri bu kapsamda tanımsız.",
        "Negatif tabanda tam sayı üs çiftse pozitif, tekse negatif; (-1)^çift=1, (-1)^tek=-1.",
      ],
    },
    {
      title: "Negatif üs",
      text: [
        "a≠0 için a^-n=1/aⁿ. Negatif üs sonuç işareti demek değildir.",
        "(3/4)^-2=16/9; (-2)^-3=-1/8.",
      ],
    },
    {
      title: "Çarpım, bölüm, iç içe kuvvet",
      text: [
        "Aynı tabanda a^m a^n=a^(m+n); a≠0 için a^m/a^n=a^(m-n).",
        "Tam sayı üslerde tanımlı ifadeler için(a^m)^n=a^(mn). Rasyonel genel özdeşlikte pozitif taban koşulunu koru.",
      ],
    },
    {
      title: "Ortak üs ve işlem türü",
      text: [
        "(ab)^n=a^n b^n; (a/b)^n=a^n/b^n; payda 0 olamaz. Sıfır veya negatif üslerde sıfır tabanı da dışlanır.",
        "2⁵·5⁵=10⁵. Fakat 2³+2⁴=24;2⁷ değil. (1+2)²=9;1²+2²=5.",
      ],
    },
    {
      title: "Ortak asal ve ortak çarpan",
      text: [
        "4=2²,8=2³,9=3²,27=3³. (4³·8²)/2⁵=2⁷=128.",
        "c a^n+d a^n=(c+d)a^n. 5^(n+3)-2·5^(n+2)=3·5^(n+2).",
      ],
    },
    {
      title: "Verilen kuvvetten yararlan",
      text: [
        "2^x=A,3^x=B→6^x=AB. 3^x=A,5^x=B→75^x=AB².",
        "2^x=A,3^x=B,5^x=C için 0,18^x=B²/(AC²); asal çarpanların pay/payda yerini koru.",
      ],
    },
    {
      title: "Denklem",
      text: [
        "a>0, a≠1 iken a^u=a^v⇔u=v. 8^(x-1)=4^(x+2)→x=7. 9^(x-1)=27→x=5/2.",
        "Taban 1’de üs eşitliği zorunlu değildir; her x çözüm olabilir. Üsler çelişkiye giderse çözüm yoktur. Negatif tabanda tanım alanı/çiftlik ayrı incelenir.",
      ],
    },
    {
      title: "Karşılaştırma",
      text: [
        "Aynı pozitif tabanda a>1 ise büyük üs büyük;0<a<1 ise büyük üs küçük değer verir. a=1’de eşit.",
        "2¹⁸=8⁶;3⁵=243>5³=125. Ortak üs pozitif tam sayıysa pozitif taban sırası korunur; negatif üste ters döner.",
      ],
    },
    {
      title: "Rasyonel üs ve sınırlar",
      text: [
        "a>0 için a^(m/n)=(ⁿ√a)^m, n>0; üssü sadeleştir. 27^(-2/3)=1/9.",
        "Negatif tabanda en sade payda tekse gerçek kök olabilir: (-8)^(1/3)=-2; çiftse gerçek değil. (-8)^(2/6)=-2.",
        "((-1)²)^(1/2)=1 ama(-1)^(2·1/2)=-1; negatif tabanda iç içe rasyonel kural koşulsuz değildir.",
      ],
    },
    {
      title: "Bilimsel standart",
      text: [
        "Sıfırdan farklı sayıda a×10^n, n tam sayı,1≤|a|<10. -3×10⁴ de geçerlidir. Sıfır ayrı yazılır.",
        "810000000=8,1×10⁸;0,00042=4,2×10^-4. 72×10⁵=7,2×10⁶;0,36×10⁸=3,6×10⁷.",
      ],
    },
    {
      title: "Bilimsel işlemler ve karşılaştırma",
      text: [
        "Çarpımda katsayılar çarpılır, üsler toplanır; bölümde katsayılar bölünür, üsler çıkarılır; sonra normalleştirilir.",
        "Toplam/farkta ortak 10 kuvveti gerekir:6×10⁵+4×10⁶=4,6×10⁶. Pozitif normalleşmiş sayıda önce üs; negatiflerde mutlak değer sırası ters döner.",
      ],
    },
    {
      title: "Eksen ve süreç",
      text: [
        "Logaritmik eksende eşit aralık eşit oran demektir;8,1×10⁸,10⁹’un tam üstünde değildir. Yaklaşık konumu 8,9085’tir.",
        "Başlangıç N adım 0’dadır. Pozitif q için adım t: Nq^t. 200·2⁶=12800;80·(1/2)⁴=5.",
        "q=0’da 0. adım başlangıç,1. adımdan sonra 0’dır; bu 0⁰’a değer atamaz.",
      ],
    },
    {
      title: "Yöntem, denetim ve hatırlama",
      text: [
        "Önce parantez/tanım alanı; sonra işlem türü ve kuralın koşulu; sonra özgün ifadede kontrol.",
        "İlk gün 1; tekrar 3., 7., 21. gün. Not kapalıyken yeni örneği gerekçelendir. Görsel keşif, okuma, süre veya manuel onay ustalık/XP kanıtı değildir.",
        "Bu özet kaynaklı özgün uyarlamadır; resmî soru veya bütün arşiv tamamlandı iddiası taşımaz.",
      ],
    },
    {
      title: "Toplam, kesirli üs ve yüzde azalma",
      text: [
        "2^(x+1)+2^x=(2+1)·2^x. 24’e eşitse 2^x=8 ve x=3. Kontrolü ilk denklemde yap.",
        "16^(-3/4): dördüncü kök 2 → üçüncü kuvvet 8 → karşılık 1/8. Sadeleşmiş payda negatif tabanda tanım koşulunu belirler.",
        "Her tur %p azalışta kalan çarpan 1−p/100. %100’de 0. adım başlangıçtır, ilk turdan sonra miktar sıfırdır.",
      ],
    },
    {
      title: "Birim başına ölçekleme ve geri kontrol",
      text: [
        "Önce gün sayısıyla toplamı bul, sonra karşılık gelen birim sayısına böl. Bulduğun birim başı değeri hedef birim sayısıyla çarp.",
        "Okul başına 9 milyon ve 81 okul için 81·9·10⁶=30⁶=7,29×10⁸. Kontrol: toplam / okul başına miktar = 81 okul.",
        "10’un kuvvetindeki değişimi katsayıyla dengele. 81·10⁷=8,1·10⁸ ve 81·10⁸=8,1·10⁹.",
      ],
    },
  ],
  source:
    "TYT Üslü Sayılar çalışma kâğıdının 19.11.2026 tarihli 1.3.0 sürümünün 16 sayfası metin ve görselleriyle incelendi. Öğretimde doğrudan incelenen bir MEB OGM özet sayfasından da yararlanıldı. ÖSYM 2019 MSÜ Temel Matematik 2. sorunun özgün görseli, verileri ve E anahtarı resmî kitapçığın 24. PDF sayfasında (basılı 22) karşılaştırıldı. Öğretici açıklamalar ve alıştırmalar özgün uyarlamadır. 2006–2026 sınav arşivi kısmen incelendi.",
};
const pack = powersSource039Pack;
const objectives = [
  "Kuvveti çarpan sayısı ve karşılıkla açıkla;parantez,işaret,sıfır ve tanım alanı koşullarını koru.",
  "İşlem türüne göre doğru üs kuralını seç;denklem ve karşılaştırmada koşulu ve özgün ifadede denetimi göster.",
  "Rasyonel üs,bilimsel gösterim,logaritmik ölçek ve adımlı süreçleri değişen değerlerle ilişkilendir;yakın yanlış yöntemlere karşı örnek üret.",
];
export const powersSource039Guides: LessonGuide[] = [
  {
    id: pack.id,
    minutes: pack.minutes,
    source: pack.source,
    objectives,
    sections: pack.sections,
    examples: pack.examples,
    recall: pack.recall,
  },
];
export const powersSource039Lessons: Lesson[] = [
  {
    id: pack.id,
    title: txt(pack.title),
    subjectId: "tyt-matematik",
    minutes: pack.minutes,
    objectives: objectives.map(txt),
    source: txt(pack.source),
    tags: ["kaynakli-anlatim", "Özgün öğretim soruları"],
    body: pack.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: pack.items.map((item, index): Question => {
      const order = item.options.map((_, i) => (i + ((2 * index + 1) % 5)) % 5);
      return {
        id: `f039-${pack.id}-${index + 1}`,
        prompt: txt(item.prompt),
        options: order.map((i) => txt(item.options[i])),
        answer: order.indexOf(0),
        hint: txt(item.strategy),
        explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
        skill: pack.id,
        guidance: {
          knowledge: item.knowledge,
          strategy: item.strategy,
          steps: item.steps,
          optionReasons: order.map((i) => item.optionReasons[i]),
          commonError: item.commonError,
          check: item.check,
        },
      };
    }),
  },
];
export const powersSource039Sheets: CheatSheet[] = [
  {
    topicId: `topic-${pack.id}`,
    lessonId: pack.id,
    title: pack.title,
    subjectId: "tyt-matematik",
    sections: pack.sheet,
    cautions: [
      "Parantez,tanım alanı ve sıfır koşulunu koru;negatif üs karşılık aldırır.",
      "İşlem türünü değiştiren ezberden kaçın;rasyonel üs yasasını negatif tabana koşulsuz taşıma.",
      "Bilimsel sayıda değer ile standart aralığı,üstel süreçte başlangıç ile tamamlanan adımı ayrı denetle.",
    ],
    examples: [pack.examples[8], pack.examples[16], pack.examples[28]].map(
      (e) => ({
        title: e.title,
        prompt: e.prompt,
        steps: e.steps.map((s) => s.explanation),
        answer: e.answer,
      }),
    ),
    recall: pack.recall.slice(0, 4),
    source: pack.source,
  },
];
