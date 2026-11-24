import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
import { factorial033Budget } from "./factorialSource033Model";

const compositePowerTable = {
  layout: "table" as const,
  headers: ["Faktöriyel", "2 sayısı → ikili grup", "3 sayısı → tekli grup", "En büyük k"],
  rows: [10, 15].map((n) => {
    const { rows: [twos, threes], maxPower } = factorial033Budget(n, 12);
    return [
      `${n}!`,
      `${twos.available} → ${twos.possible}`,
      `${threes.available} → ${threes.possible}`,
      `min(${twos.possible}, ${threes.possible}) = ${maxPower}`,
    ];
  }),
};
interface Factorial033Item extends QuestionGuidance {
  code: string;
  prompt: string;
  options: string[];
}
interface Factorial033Pack {
  id: string;
  title: string;
  minutes: number;
  source: string;
  sections: (GuideSection & { code: string })[];
  examples: (WorkedExample & { code: string })[];
  recall: { prompt: string; answer: string }[];
  items: Factorial033Item[];
  sheet: CheatSection[];
}
// Registered source-transfer unit; PDF closure requires a separate source/UI audit.
export const factorialSource033Pack: Factorial033Pack = {
  id: "tyt-mat-faktoriyel-kaynak-033",
  title: "Faktöriyel: çarpımdan koşula ve asal bütçesine",
  minutes: 110,
  sections: [
    {
      code: "S01",
      title: "Ünlem neyi kısaltıyor?",
      paragraphs: [
        "Doğal sayılar burada 0, 1, 2, 3, …; tam sayılar …, −2, −1, 0, 1, 2, … kümesidir. Çarpma, eş grupları bir araya getirir: 3×4, dört birimlik üç grup veya üç birimlik dört gruptur. Pozitif bir tam sayı n için n!, 1’den n’ye kadar bütün tam sayıların çarpımıdır. Ünlemi “n faktöriyel” diye oku: 4!=1×2×3×4=24.",
        "Bu düzeyde ünlemin içi negatif olmayan tam sayı olmalıdır. (−2)! ve (1,5)! burada tanımlı değildir. “Sonuç büyük görünürse olur” ölçütü yoktur; önce izinli sayıyı denetle. İleri düzey gama fonksiyonu bu ünitenin konusu değildir. Faktöriyel, sayıya eklenen bir işlem işaretidir; 4! ile 4 aynı sayı değildir.",
      ],
    },
    {
      code: "S02",
      title: "0! ile 1! aynı değeri verir",
      paragraphs: [
        "0!=1 olarak tanımlanır. Boş çarpımın etkisiz elemanı 1’dir; hiç çarpan bulunmaması çarpımda 0 çarpanı bulunması değildir. 1!=1 de aynı değeri verir. Sıfır nesneyi yerleştirmenin tek boş düzeni, 0! ile sayma bağlantısını gösterir. Bu açıklama “0 tane şeyi 0 ile çarpmak” anlamına gelmez.",
        "Her n! pozitif tam sayıdır; sıfır değildir. Bu yüzden paydadaki bir faktöriyel sıfır yapmaz ve bütün bir ortak faktöriyel çarpanı bölünebilir. n≥2 olduğunda çarpımın içinde 2 vardır, dolayısıyla n! çifttir. 0! ve 1! ise 1 olduğu için tektir.",
      ],
      table: {
        headers: ["n", "0", "1", "2", "3", "4", "5", "6", "7"],
        rows: [["n!", "1", "1", "2", "6", "24", "120", "720", "5.040"]],
      },
    },
    {
      code: "S03",
      title: "Bir önceki faktöriyeli görünür bırak",
      paragraphs: [
        "n≥1 tam sayı için n!=n×(n−1)! bağıntısı geçerlidir. Çünkü ilk n−1 çarpan bir araya gelince (n−1)! eder; geriye n çarpanı kalır. 5!=5×4!=5×24=120. İleri yönde (n+1)!=(n+1)n! da n≥0 için kullanılabilir.",
        "İlk bağıntıda n=0 yazma: 0×(−1)! ortaya çıkar ve (−1)! bu tanımda yoktur. 0!=1 bir istisnayı saklayan düzeltme değil, tanımın başlangıç değeridir. İnteraktif çarpımda n=0 seçildiğinde boş çarpım gösterilir; her yeni çarpan sonucu niçin değiştirdiğiyle birlikte görünür.",
      ],
    },
    {
      code: "S04",
      title: "Büyük sayıya değil ortak çarpana kadar aç",
      paragraphs: [
        "n≥m≥0 tam sayılar için n!/m!, m+1’den n’ye kadar çarpanları bırakır. 7!=7×6×5! olduğundan 7!/5!=7×6=42. n=m ise kalan çarpım boştur ve oran 1’dir. İki büyük faktöriyel değerini baştan hesaplamak gerekli değildir.",
        "Ters oranda ortak kısım paydan gider: 3!/5!=1/(5×4)=1/20; 6!/8!=1/(8×7)=1/56. Oran her zaman tam sayı olmak zorunda değildir. Faktöriyelleri bölmek, ünlem içlerini çıkarmak değildir: 5!/3!=5×4=20, fakat (5−3)!=2!=2.",
        "Ardışık bir çarpımı geri yazarken alt sınırın bir eksiği paydaya gelir: 3×4×5×6=6!/2!, 5×6×7=7!/4!. Başlangıç ve bitiş çarpanlarını say; 6!/3! yazarsan 3 çarpanını kaybedersin.",
      ],
    },
    {
      code: "S05",
      title: "Parantez ile üssün kapsamını ayır",
      paragraphs: [
        "(n+2)!/n!=(n+2)(n+1), n≥0 tam sayı için iki yeni çarpanı bırakır. (n+2)! bütün n+2 sayısına uygulanır; n!+2 değildir. n=2 kontrolünde 4!=24, 2!+2=4 olur. Bu tek karşı örnek iki ifadenin aynı olmadığını gösterir.",
        "Üs, aynı sayıyı tekrar çarpmaktır. (3!)²=(3!)×(3!)=6×6=36. (3²)! ise önce 3²=9, sonra 9!=362.880 verir. Önce parantezin neyi topladığını, sonra ünlem ve üssün hangi ifadeye ait olduğunu işaretle. Doğru bir örnek bütün bir özdeşliği kanıtlamaz; yanlış genel iddiayı bir geçerli karşı örnek çürütebilir.",
      ],
    },
    {
      code: "S06",
      title: "Toplamda çizgi değil dağıtma kuralı kullan",
      paragraphs: [
        "a·b+a·c=a(b+c), dağıtma kuralıdır. (n+1)!+n!=n![(n+1)+1]=(n+2)n!; (n+1)!−n!=n![(n+1)−1]=n·n!. Bunlar n≥0 için geçerlidir. Toplamın içindeki tek terimi çizip atmak, çarpan sadeleştirmek değildir.",
        "(5!+4!)/4! için payı 4!(5+1) yap; oran 6’dır. Payın ikinci 4!’ü bölününce 1 katkı verir. Aynı nedenle (6!+5!)/5!=7. n!+m! ifadesi (n+m)! olmaz: 4!+3!=30, 7!=5.040. Sadeleşmeden sonra parantezi tekrar dağıtıp başlangıca dönebildiğini denetle.",
      ],
    },
    {
      code: "S07",
      title: "Tanım kümesini işlemden önce kur",
      paragraphs: [
        "(x−3)! için x−3 negatif olmayan tam sayı olmalıdır; hem x≥3 hem x’in tam sayı olması gerekir. x=3,5 eşitsizliği sağlasa da ünlemin içi 0,5 olduğundan kabul edilmez. Aynı anda (7−x)! varsa x≤7 de gerekir; ortak adaylar 3, 4, 5, 6, 7’dir.",
        "≥ “büyük veya eşit”, > “büyük”, ∈ “kümesine aittir” anlamına gelir. Kesrin paydası sıfır olamaz; faktöriyel payda zaten pozitiftir ama 6!−5! gibi bir fark varsa onu ayrıca denetlersin. Bir eşitliğin iki tarafını aynı sıfırdan farklı sayıya bölmek eşitliği korur; aday bulduğunda bütün başlangıç koşullarını yeniden denetle.",
      ],
    },
    {
      code: "S08",
      title: "Eşit faktöriyellerde 0–1 kapısını unutma",
      paragraphs: [
        "1!, 2!, 3!, … dizisi kesin artar: bir sonraki adıma geçerken 2, 3, 4, … gibi 1’den büyük bir sayıyla çarpılır. Fakat 0!=1! olduğundan bütün negatif olmayan tam sayılarda tek tek farklı sonuç üretmez. a!=b! görünce koşulsuz a=b deme; iç değerler 0 ve 1 de olabilir.",
        "n!=1 için bütün doğal çözümler 0 ve 1’dir; n≥2 için çarpımda 2 bulunur. (x−3)!=1 için x−3=0 veya 1, yani x=3 veya 4 olur. n!=24 için ise n=4’tür. Tanım kümesinde az aday varsa tabloyla yerine koymak, geçersiz bir iç değer eşitlemesinden daha güvenlidir.",
      ],
    },
    {
      code: "S09",
      title: "Denklemde aday üretmek ve adayı kabul etmek ayrıdır",
      paragraphs: [
        "(x−2)!=(5−x)! için iki iç değerin koşulları x’i 2, 3, 4, 5 adaylarına indirir. Sırasıyla 0!=3!, 1!=2!, 2!=1!, 3!=0! denenir; hiçbiri eşit değildir. İçleri doğrudan eşitleyince çıkan 3,5 sayısı tam sayı olmadığı için çözüm değildir. Çözüm kümesi boştur.",
        "(n+2)!/n!=42 için tanım n≥0 tam sayı olsun. Ortak n! gider ve (n+2)(n+1)=42 kalır. Pozitif ardışık çarpanlar 6 ve 7’dir; n=5. Cebirle (n+8)(n−5)=0 yazılırsa −8 adayı baştaki tanım kümesine uymaz. Denklem dönüştürmek, bütün cebirsel adayları koşulsuz kabul etmek değildir.",
        "Cebir yolunun ön bilgisi dağıtma kuralıdır: (a+b)(c+d)=ac+ad+bc+bd; ilk parantezin her terimi ikinci parantezin her terimiyle çarpılır. Böylece (n+2)(n+1)=n²+n+2n+2=n²+3n+2. Eşitliği 42’ye kurup iki taraftan 42 çıkarınca n²+3n−40=0 olur. Ters dağıtma ile n²+3n−40=(n+8)(n−5): orta terim −5n+8n=3n, sabit terim 8·(−5)=−40. Çarpımın sıfır olması için en az bir çarpan sıfır olmalıdır; n=−8 veya n=5 bulunur. İlk tanım n≥0 olduğu için yalnız 5 kabul edilir.",
      ],
    },
    {
      code: "S10",
      title: "Asal çarpan sayacı bir kopya sayımıdır",
      paragraphs: [
        "Asal sayı 1’den büyük, yalnız 1 ve kendisine tam bölünen tam sayıdır: 2, 3, 5, 7 gibi. vₚ(N), N’nin asal çarpan ayrılışında p’nin kaç kez bulunduğunu gösterir. Örneğin 12=2²·3 olduğundan v₂(12)=2, v₃(12)=1. Üs bir kopya sayacıdır; süre veya uzunluk birimi değildir.",
        "⌊a/b⌋ pozitif bölümün tam kısmıdır: ⌊12/5⌋=2. n! için p’nin katları birer p, p²’nin katları birer ek p, p³’ün katları birer ek p verir. Bu yüzden vₚ(n!)=⌊n/p⌋+⌊n/p²⌋+…; terim sıfır olduğunda dur. Aynı sayı ek satırda görünüyorsa yeni sayı sayılmıyor, onun ek asal kopyası sayılıyor.",
      ],
    },
    {
      code: "S11",
      title: "Bileşik böleni iki bütçeyle kur",
      paragraphs: [
        "10! içinde v₂=5+2+1=8’dir. İlk beş kopya 2,4,6,8,10’dan; ek iki kopya 4,8’den; son kopya 8’den gelir. v₅(10!)=2’dir: 5 ve 10 birer 5 verir. v₃(10!)=3+1=4’tür: 3,6,9 ve 9’un ikinci 3’ü.",
        "Bölen bileşikse asal formülüne tek parça olarak koyma. 12=2²·3 olduğundan bir 12 iki tane 2 ve bir tane 3 ister. 10! için en çok min(⌊8/2⌋,⌊4/1⌋)=4 tane 12 ayrılır. k=5, on tane 2 ve beş tane 3 ister; bütçeler yetmez. “Kaç 12 katı var?” ile “12’nin en büyük kuvveti tam böler mi?” aynı soru değildir.",
        "Tablonun ikinci satırında 15! için 2’den 11 kopya, 3’ten 6 kopya var. İkişerli 2 grupları 5 tane kurulabilir. Altıncı 12 için 6 tane 3 yeter ama 12 tane 2 gerekir. Kalan 1 tane 2 ile 1 tane 3 yeni bir 12 kuramaz.",
        "min, verilen sayılardan küçük olanını seç demektir. Örneğin min(4,4)=4 ve min(7,2)=2. İki gereksinim aynı anda karşılanmalıysa bol olan bütçe tek başına yeterli değildir; önce tükenen bütçe kaç tam grup kurulabileceğini sınırlar.",
      ],
      table: compositePowerTable,
    },
    {
      code: "S12",
      title: "Son sıfır, 2 ile 5 eşleşmesidir",
      paragraphs: [
        "Bir pozitif tam sayının sondaki her sıfırı bir 10=2·5 çarpanı ister. Genel kural min(v₂(N),v₅(N))’dir. Sayının rakamları arasındaki her 0 sayılmaz: 1002 sıfırla bitmez, son sıfır sayısı 0’dır. 1000 için üç 10 ayrılır ve son sıfır sayısı 3’tür.",
        "n! içinde 2 sayısı 5’ten az olmadığından son sıfırlar v₅(n!) ile bulunur. 25! için ⌊25/5⌋+⌊25/25⌋=5+1=6; 25 ikinci bir 5 verir. 30! için 6+1=7, 20! için 4, 50! için 10+2=12 olur. Sonraki 125 kuvveti bu değerlerin hepsinden büyük olduğundan ek katkı yoktur.",
      ],
    },
    {
      code: "S13",
      title: "Bölme 2’leri tüketirse 5 saymak yetmez",
      paragraphs: [
        "N=10!/2⁷ bir tam sayıdır; 10! içinde sekiz tane 2 olduğundan bölme yedisini götürür. Bir 2 ve iki 5 kalır; min(1,2)=1 son sıfır vardır. Doğrudan kontrol 3.628.800/128=28.350 verir. n! için kullanılan “yalnız 5 say” kuralı bu bölüme otomatik geçmez.",
        "Payda 2⁸ olursa bütün 2’ler gider; 14.175 sayısında iki 5 kopyası kalsa da hiç son sıfır yoktur. Benzer biçimde v₂(25!)=12+6+3+1=22’dir; 25!/2²² tam sayısında 2 kalmadığı için son sıfır 0’dır. Bölümde önce tam sayılık, sonra kalan asal bütçeleri denetlenir.",
      ],
    },
    {
      code: "S14",
      title: "Toplamın son sıfırını önce çarpanla",
      paragraphs: [
        "9!+10!=9!(1+10)=11·9!. v₂(9!)=7 ve v₅(9!)=1; 11 bu asal bütçelerine yeni 2 veya 5 eklemez. Dolayısıyla toplamın bir son sıfırı vardır. 10!’ın iki son sıfırı var diye toplamın cevabını iki seçemezsin.",
        "Son sıfır konusunda sayı türünü adlandır: doğrudan n! mi, faktöriyel bölümü mü, toplam mı? Toplamda ortak çarpan çıkar; bölümde çıkarılan asal kopyalarını düş. Kalan sayıda 2–5 darboğazına dön. Gereksiz büyük rakam dizisini hesaplamak yerine neden yeterli bütçe bulunduğunu göster.",
      ],
    },
    {
      code: "S15",
      title: "Faktöriyel neden sıralama sayar?",
      paragraphs: [
        "n farklı nesnenin hepsi, numaralı doğrusal n yere birer kez ve ek kısıt olmadan yerleştirilsin. İlk yer için n, ikinci için n−1, sonra n−2,…, son yer için 1 seçenek vardır. Çarpma ilkesi n(n−1)…1=n! düzen verir. Üç farklı A,B,C kitabı için ABC, ACB, BAC, BCA, CAB, CBA olmak üzere altı düzen vardır.",
        "Dört farklı dosyanın dört numaralı rafa yerleşimi 4·3·2·1=24’tür. Aynı model üç farklı koşucunun berabere kalmadan bitiriş sırası veya üç farklı ürünün üç numaralı standa yerleşiminde 3!=6 verir. Nesneler farklı mı, hepsi kullanılıyor mu, yerler doğrusal ve ayrı mı, ek kısıt var mı diye dört koşulu sor.",
      ],
    },
    {
      code: "S16",
      title: "Kısıt değişirse sayma modeli değişir",
      paragraphs: [
        "Dört farklı kişi için Deniz ilk koltukta oturmak zorundaysa onun yeri sabittir; diğer üç kişi 3!=6 şekilde yerleşir. Deniz ilk koltukta oturamazsa ilk yere başka üç kişiden biri gelir, sonra kalan üç kişiye 3·2·1 seçenek vardır: 3·3·2·1=18. Alternatif 4!−3!=24−6=18’dir.",
        "A,A,B kitaplarında iki A ayırt edilmiyorsa üç farklı sıra vardır: AAB, ABA, BAA. Üç etiketin hepsi farklıymış gibi 3!=6 demek bazı görünen sıraları iki kez sayar. Çembersel dönme eşdeğerliği, kullanılmayan nesne veya başka yasak yerler ayrıca ele alınır; burada kısıtsız doğrusal sıralama kuralını bunlara taşımıyoruz.",
      ],
    },
    {
      code: "S17",
      title: "Sözel katmanlardan ardışık çarpıma geç",
      paragraphs: [
        "Dört depo, her depoda beş raf, her rafta üç kutu, her kutuda iki paket varsa adetler çarpılır: 4 depo × 5 raf/depo × 3 kutu/raf × 2 paket/kutu. Ara birimler sadeleşir, sonuç paket olur. Çarpım 4·5·3·2=2·3·4·5=5!=120 paket. Verilen adetlerin her birine ayrı faktöriyel eklenmez.",
        "Kaynağın aktardığı başka katmanlı modelde 11 kent, kent başına 12 ilçe, ilçe başına 13 okul, okul başına 2 kat, kat başına 7 derslik vardır. 2·7=14 birleşince toplam 11·12·13·14=14!/10!=24.024 dersliktir. Bu bölüm kendi öğretim açıklamamızdır; resmî soru veya resmî kurum çözümü olarak sunulmaz. 2021 TYT Temel Matematik 5’in gerçek kitapçık 27. ve anahtar 45. sayfası ayrıca incelendi; C=14!/10! eşleşmesi doğrulandı. İncelenen resmî PDF’nin bütün soruları veya güncel düzeltme duyuruları bu doğrulamaya dahil değildir.",
        "Zincir eksikse çarpanı denetle: 13!/10! bir 14’ü kaybeder; 14!/9! fazladan 10 taşır; 15!/10! fazladan 15; 15!/9! fazladan 15·10 taşır. Normal yolda 132·182=24.024 hesaplanabilir; daha kısa yazım büyük seçenek değerleri hesaplamayı kaldırır. Ölçülmemiş saniye veya hız yüzdesi vaat edilmez.",
      ],
    },
    {
      code: "S18",
      title: "Soruyu tanı, uygun yöntemi seç",
      paragraphs: [
        "Oran veya ardışık çarpım varsa küçük faktöriyeli hedefle. Toplam/fark varsa hepsini ortak en küçük faktöriyel cinsinden yaz. Değişkenli ünlem varsa bütün iç değerleri negatif olmayan tam sayı yap ve kesiştir. Tam bölme, en büyük kuvvet veya son sıfır varsa böleni asallara ayır. Farklı nesnelerin sırası varsa her yere kalan seçenekleri yaz.",
        "Yöntemin geçersiz sınırını da söyle. 6!/4!=30 ama (6!+4!)/4!=31’dir. (4!+3!)/3!=5 ama 4!+3! için 7! yazılmaz. n!=1 için 0 ve 1 birlikte, n!=24 için yalnız 4 vardır. 25!’ta 6 tane 5 bulunması, 25!/2²² için 6 sıfır sonucu vermez. A,B,C için 6 düzen olması A,A,B için 6 düzen olduğu anlamına gelmez.",
      ],
      table: {
        headers: ["İstenen", "İlk hamle", "Son kontrol"],
        rows: [
          [
            "Oran/zincir",
            "Küçük faktöriyeli görünür bırak",
            "Başlangıç ve bitiş çarpanı",
          ],
          ["Toplam/fark", "Ortak çarpanı ayır", "Parantezi geri dağıt"],
          ["Denklem", "Tam sayı ve işaret koşulu", "İlk ifadeye yerine koy"],
          [
            "Kuvvet/sıfır",
            "Asal kopya bütçeleri",
            "Bir sonraki kuvvet niçin olmaz?",
          ],
          ["Sıralama", "Yer başına seçenek", "Koşul, eksik veya çift sayım"],
        ],
      },
    },
    {
      code: "S19",
      title: "İlk bozulan gerekçeyi onar",
      paragraphs: [
        "(5!+4!)/4! için 5 sonucu, toplamın ikinci terimini kaybetmiştir. Onarımda (4!+3!)/3!=4+1=5’i açıklarsın. (x−1)!=1 için yalnız x=2 bulmak 0!’ı dışlamıştır; doğru x=1 veya 2’dir. Aynı onarım (y−5)!=1 için y=5 veya 6 verir.",
        "25! için yalnız 25/5=5 saymak, 25’in ikinci 5’ini unutmuştur. Farklı prova 50! için 10+2=12 verir. 8!/6ᵏ için k=⌊8/6⌋ demek, bileşik 6’yı asal sayacı sanmaktır; 6=2·3 ve 8! bütçelerinden k=2 çıkar. Onarım 6!/4ᵏ sorusunda 4ᵏ=2²ᵏ, v₂(6!)=4, en büyük k=2 olur.",
        "Koşulu değiştirerek aynı cevabı ezberlemediğini denetle: n pozitif tam sayı ve n!=1 olursa 0 dışlanır, yalnız 1 kalır. İlk koltuk zorunluluğu yasağa dönerse 6 yerine 18; 10!/2⁸ yerine 10!/2⁷ gelirse 0 yerine 1 son sıfır; 20!’ta son sıfır yerine 3 çarpanı sorulursa v₃=6+2=8 kullanılır. Bunlar örnek hatalardır; gerçek kullanıcı hatası diye kaydedilmez.",
      ],
    },
    {
      code: "S20",
      title: "Destek azalırken açıklamayı koru",
      paragraphs: [
        "Önce süresiz çöz ve neden bu yöntemi seçtiğini açıkla. Sonra yalnız ilk hamleyi görüp örneğin devamını kendin tamamlamayı dene; en son yeni bağlamlı bağımsız soruya geç. [(n+2)!−(n+1)!]/(n+1)!=8 örneğinde başlangıç ortak çarpanı gösterir; kalan iki geçiş oran=n+1 ve n=7’dir. Cevabı görmek, bağımsız çözüme eşit değildir.",
        "Doğru sonuç, yöntem seçimi, sayı koşulu ve son kontrol ayrı değerlendirilir. Yeterli doğruluktan sonra süreli prova seçilebilir; evrensel saniye eşiği veya kişisel hız verisi üretilmez. Görseli değiştirmek, metni açmak ve süre geçirmek öğrenme puanı kazandırmaz. Uygulamanın ilk gün 1, tekrar günleri 3/7/21 düzeni ayrı kalır.",
        "Bu ünite Aurelia Faktöriyel Kavramı kaynağının 15 sayfalık kapsamını öğretime dönüştürmek için hazırlanmış adaydır. MEB Matematik 10 Ünite 1 atıfları bütün kitabın işlendiği veya 2027 resmî kapsamının eksiksiz doğrulandığı anlamına gelmez. Gama fonksiyonu, ayrıntılı permütasyon/kombinasyon ve son sıfırdan farklı rakam algoritmaları kapsam dışıdır. İnsanlarla öğrenme başarısı deneyi ve bütün ÖSYM yılları için tarama iddia edilmez.",
      ],
    },
  ],
  examples: [
    {
      code: "E01",
      title: "Ortak 6! görünür kalır",
      prompt: "8!/6! değerini büyük faktöriyelleri hesaplamadan bul.",
      strategy: "8!’ı ortak 6! çarpanına kadar aç.",
      steps: [
        {
          label: "1. adım",
          explanation: "8!=8·7·6! yazılır; 6! pozitiftir.",
        },
        {
          label: "2. adım",
          explanation: "(8·7·6!)/6!=8·7=56.",
        },
        {
          label: "3. adım",
          explanation: "Ters oran istenseydi 6!/8!=1/56 olurdu.",
        },
      ],
      answer: "56",
      check: "56·720=40.320=8!.",
      pitfall: "Ünlem içlerini çıkarıp 2! bulma; oran yönünü ters çevirme.",
    },
    {
      code: "E02",
      title: "İki farklı ortak çarpanı aynı tabana indir",
      prompt: "(7!+6!)/(6!−5!) kaçtır?",
      strategy: "Bütün terimleri 5! çarpanıyla yaz.",
      steps: [
        {
          label: "1. adım",
          explanation: "7!=42·5!, 6!=6·5!.",
        },
        {
          label: "2. adım",
          explanation: "Pay=5!(42+6)=48·5!; payda=5!(6−1)=5·5!.",
        },
        {
          label: "3. adım",
          explanation: "Payda sıfır değildir; ortak 5! gider, 48/5=9,6.",
        },
      ],
      answer: "48/5 = 9,6",
      check: "(5.040+720)/(720−120)=5.760/600=9,6.",
      pitfall:
        "7+6 ile 6−5’i doğrudan oranlamak, faktöriyel çarpanlarını eşitlemez.",
    },
    {
      code: "E03",
      title: "Tanım kümesi boş çözümü gösterir",
      prompt:
        "Bu ünitedeki doğal sayı faktöriyeli tanımıyla (x−2)!=(5−x)! eşitliğinin bütün gerçek x çözümlerini bul.",
      strategy: "Önce iki iç değerin koşulunu kesiştir.",
      steps: [
        {
          label: "1. adım",
          explanation: "x−2 ve 5−x negatif olmayan tam sayı olmalı; x=2,3,4,5.",
        },
        {
          label: "2. adım",
          explanation: "Bu adaylar sırasıyla 0!=3!, 1!=2!, 2!=1!, 3!=0! verir.",
        },
        {
          label: "3. adım",
          explanation: "1≠6 ve 1≠2 olduğundan dört aday da elenir.",
        },
      ],
      answer: "Çözüm yoktur.",
      check:
        "İçleri eşitleyince çıkan x=3,5 tam sayı değildir; faktöriyeller tanımsızdır.",
      pitfall:
        "0!=1! istisnasını ve tam sayı koşulunu atlayıp içleri koşulsuz eşitleme.",
    },
    {
      code: "E04",
      title: "Ardışık çarpanlar adayı sınırlar",
      prompt: "n≥0 tam sayı ve (n+2)!/n!=42 ise n kaçtır?",
      strategy: "İki yeni çarpanı ayırıp ardışık pozitif çift ara.",
      steps: [
        {
          label: "1. adım",
          explanation: "(n+2)(n+1)=42.",
        },
        {
          label: "2. adım",
          explanation:
            "42’nin pozitif çarpan çiftleri 1·42, 2·21, 3·14, 6·7; yalnız 6 ve 7 ardışık.",
        },
        {
          label: "3. adım",
          explanation:
            "n+1=6 olduğundan n=5. Cebirsel diğer kök −8 tanım dışıdır.",
        },
      ],
      answer: "5",
      check: "7!/5!=7·6=42.",
      pitfall:
        "Denklemin negatif kökünü doğal sayı koşuluna rağmen kabul etme.",
    },
    {
      code: "E05",
      title: "12’nin asal bütçesi",
      prompt:
        "10!/12ᵏ tam sayı olacak en büyük negatif olmayan tam sayı k nedir?",
      strategy: "12=2²·3 yaz; iki asal bütçesini birlikte sınırla.",
      steps: [
        {
          label: "1. adım",
          explanation: "v₂(10!)=5+2+1=8; v₃(10!)=3+1=4.",
        },
        {
          label: "2. adım",
          explanation: "12ᵏ=2²ᵏ·3ᵏ; 2k≤8 ve k≤4 olmalı.",
        },
        {
          label: "3. adım",
          explanation:
            "İki koşul k≤4 verir; k=4 uygundur, k=5 ikisini de aşar.",
        },
      ],
      answer: "4",
      check: "10!/12⁴=3.628.800/20.736=175 tam sayı.",
      pitfall:
        "Asal için olan kat sayımına bileşik 12’yi doğrudan yerleştirme.",
    },
    {
      code: "E06",
      title: "25’in ikinci 5’i",
      prompt: "30!’ın sondaki sıfır sayısını bul.",
      strategy: "10=2·5 eşleşmesinde sınırlı olan 5’leri say.",
      steps: [
        {
          label: "1. adım",
          explanation: "5’in katı ⌊30/5⌋=6 sayı birer 5 verir.",
        },
        {
          label: "2. adım",
          explanation: "25’in katı ⌊30/25⌋=1 sayı ek bir 5 verir.",
        },
        {
          label: "3. adım",
          explanation: "125>30 olduğundan dur; 6+1=7 son sıfır.",
        },
      ],
      answer: "7",
      check: "5,10,15,20,25,30 sırasıyla 1,1,1,1,2,1 kopya verir; toplam 7.",
      pitfall: "Yalnız 30/5 saymak, 25’in ikinci kopyasını kaybeder.",
    },
    {
      code: "E07",
      title: "Bölümde kalan eşleşme",
      prompt: "N=10!/2⁷ tam sayısının sondaki sıfır sayısını bul.",
      strategy: "Önce tam sayılığı, sonra kalan 2 ve 5 sayılarını hesapla.",
      steps: [
        {
          label: "1. adım",
          explanation:
            "v₂(10!)=8 olduğundan 2⁷ tam böler; kalan 2 sayısı 8−7=1.",
        },
        {
          label: "2. adım",
          explanation: "v₅(10!)=2; paydada 5 yok, iki kopya kalır.",
        },
        {
          label: "3. adım",
          explanation: "min(1,2)=1 tane 10 çarpanı ayrılabilir.",
        },
      ],
      answer: "1",
      check: "10!/128=28.350; payda 2⁸ olsa 14.175 ve 0 son sıfır olurdu.",
      pitfall:
        "10!’ın sıfır sayısını bölümün sıfır sayısı olarak doğrudan taşıma.",
    },
    {
      code: "E08",
      title: "Yasak ilk raf",
      prompt:
        "Dört farklı dosya dört numaralı rafa birer kez yerleşecek. A dosyası ilk rafta olamaz. Kaç düzen vardır?",
      strategy: "İlk yerin seçeneklerini ayrı say.",
      steps: [
        {
          label: "1. adım",
          explanation: "İlk rafa A dışındaki üç dosyadan biri gelebilir.",
        },
        {
          label: "2. adım",
          explanation: "Sonra kalan üç dosya için 3,2,1 seçenek vardır.",
        },
        {
          label: "3. adım",
          explanation: "3·3·2·1=18 düzen.",
        },
      ],
      answer: "18",
      check:
        "Bütün 4!=24 düzenden A’nın başta olduğu 3!=6 düzeni çıkar: 24−6=18.",
      pitfall:
        "Kısıt varken 4!’ı değişmeden kullanma; A’nın bütün raflardan yasak olduğunu da sanma.",
    },
    {
      code: "E09",
      title: "Birimler katmanları açıklar",
      prompt:
        "4 depoda, depo başına 5 raf, raf başına 3 kutu, kutu başına 2 paket var. Toplam paket sayısını faktöriyel ile yaz.",
      strategy:
        "Adetleri birimleriyle çarp; aynı çarpanları ardışık sıraya getir.",
      steps: [
        {
          label: "1. adım",
          explanation: "4 depo·5 raf/depo·3 kutu/raf·2 paket/kutu=120 paket.",
        },
        {
          label: "2. adım",
          explanation: "Çarpanları 2·3·4·5 olarak sırala.",
        },
        {
          label: "3. adım",
          explanation: "1 çarpanı sonucu değiştirmez; çarpım 5! olur.",
        },
      ],
      answer: "5! = 120 paket",
      check: "Normal sayım 4·5=20 raf, 20·3=60 kutu, 60·2=120 paket.",
      pitfall:
        "Katman sayısı görünce her adedin ayrı faktöriyelini alma: 4!·5! verilmiş adetleri saymaz.",
    },
    {
      code: "E10",
      title: "Son iki geçişi sen kur",
      prompt:
        "n≥0 tam sayı ve [(n+2)!−(n+1)!]/(n+1)!=8. Ortak çarpanı ayırdıktan sonra oran ve n kaç olur?",
      strategy: "Payı (n+1)![(n+2)−1] biçiminde kur.",
      steps: [
        {
          label: "1. adım",
          explanation: "(n+1)! pozitiftir; pay ve paydadaki ortak çarpanı böl.",
        },
        {
          label: "2. adım",
          explanation: "Oran (n+2)−1=n+1 olur.",
        },
        {
          label: "3. adım",
          explanation: "n+1=8, dolayısıyla n=7.",
        },
      ],
      answer: "Oran n+1; n=7.",
      check: "9!−8!=8·8!; 8!’e bölününce 8.",
      pitfall: "Sonuç n+1 iken n’yi 8 seçme; tanım koşulunu koru.",
    },
    {
      code: "E11",
      title: "Dağınık çarpımdan dört halkalı zincire",
      prompt:
        "11 bölge, bölge başına 12 birim, birim başına 13 merkez, merkez başına 2 kat, kat başına 7 salon var. Toplam salon sayısının faktöriyelli karşılığı nedir?",
      strategy: "2 ve 7’yi birleştirerek eksik 14 halkasını üret.",
      steps: [
        {
          label: "1. adım",
          explanation: "Toplam=11·12·13·2·7 salon.",
        },
        {
          label: "2. adım",
          explanation: "2·7=14; toplam=11·12·13·14.",
        },
        {
          label: "3. adım",
          explanation: "14!=14·13·12·11·10! olduğundan toplam=14!/10!.",
        },
      ],
      answer: "14!/10! = 24.024 salon",
      check:
        "11·12=132, 13·14=182, 132·182=24.024. 13!/10! bir 14’ü kaybeder; 14!/9! fazladan 10 taşır; 15!/10! fazladan 15 taşır.",
      pitfall:
        "Katmanları ayrı faktöriyeller sanma; 14!/9! fazladan 10 taşır, 13!/10! bir 14’ü eksiltir.",
    },
    {
      code: "E12",
      title: "Sayıdaki sıfır mı son sıfır mı?",
      prompt:
        "1002 sayısının son sıfır sayısı ile 25!’ın son sıfır sayısını ayrı bul.",
      strategy: "Rakamın konumunu ve 10 çarpanı sayısını ayır.",
      steps: [
        {
          label: "1. adım",
          explanation:
            "1002, 10’a bölünmez; son basamak 2’dir. İçteki iki 0, son sıfır değildir.",
        },
        {
          label: "2. adım",
          explanation:
            "25! için 5’in katlarından 5, 25’in katından ek1 kopya gelir.",
        },
        {
          label: "3. adım",
          explanation: "Sayılar sırasıyla 0 ve 6 son sıfıra sahiptir.",
        },
      ],
      answer: "1002: 0; 25!: 6.",
      check: "25’te iki5 vardır; yalnız ⌊25/5⌋=5 sayımı eksiktir.",
      pitfall: "Büyük sayının yazılışındaki bütün 0 rakamlarını sayma.",
    },
    {
      code: "E13",
      title: "Aynı nesne görünen sayımı küçültür",
      prompt:
        "A,A,B biçiminde iki ayırt edilemeyen A kitabı ve bir B kitabı üç numaralı yere konacak. Farklı görünen sıraları bul.",
      strategy: "B kitabının üç olası yerini tek tek göster.",
      steps: [
        {
          label: "1. adım",
          explanation: "B birinci yerdeyse BAA.",
        },
        {
          label: "2. adım",
          explanation: "B ikinci yerdeyse ABA; üçüncü yerdeyse AAB.",
        },
        {
          label: "3. adım",
          explanation: "İki A’nın yer değiştirmesi yeni görünen düzen üretmez.",
        },
      ],
      answer: "3 düzen: BAA, ABA, AAB.",
      check:
        "A’ları geçici A₁,A₂ diye etiketleseydin altı düzen olurdu; her görünüm iki kez sayılırdı.",
      pitfall: "Ayırt edilmeyen nesneleri farklıymış gibi n! ile sayma.",
    },
    {
      code: "E14",
      title: "Toplamda sıfırın yeniden hesabı",
      prompt: "9!+10! sayısının sondaki sıfır sayısı nedir?",
      strategy: "Önce ortak 9! çarpanını ayır.",
      steps: [
        {
          label: "1. adım",
          explanation: "9!+10!=9!(1+10)=11·9!.",
        },
        {
          label: "2. adım",
          explanation: "v₂(9!)=4+2+1=7, v₅(9!)=1; 11 yeni 2 veya 5 eklemez.",
        },
        {
          label: "3. adım",
          explanation: "min(7,1)=1 son sıfır.",
        },
      ],
      answer: "1",
      check: "9!+10!=3.991.680; yalnız sondaki bir rakam 0.",
      pitfall: "Toplamda en büyük terimin sıfır sayısını otomatik seçme.",
    },
    {
      code: "E15",
      title: "Bileşik tabana iki asal birlikte gerekir",
      prompt: "8!/6ᵏ tam sayı olacak en büyük k≥0 tam sayısını bul.",
      strategy: "6=2·3; hangi asal önce biter?",
      steps: [
        {
          label: "1. adım",
          explanation: "v₂(8!)=4+2+1=7.",
        },
        {
          label: "2. adım",
          explanation: "v₃(8!)=2; 9>8 olduğundan ek katkı yok.",
        },
        {
          label: "3. adım",
          explanation: "k≤7 ve k≤2; darboğaz 3 bütçesi olduğundan k=2.",
        },
      ],
      answer: "2",
      check:
        "8!/6²=40.320/36=1.120; 6³ için üç tane 3 gerekir ama iki tane vardır.",
      pitfall:
        "⌊8/6⌋=1 yalnız 6’nın katlarını sayar; asal çarpan kopyalarını saymaz.",
    },
    {
      code: "E16",
      title: "Kare çarpan ihtiyacı",
      prompt: "6!/4ᵏ tam sayı olacak en büyük k≥0 tam sayısını bul.",
      strategy: "4ᵏ=2²ᵏ yazarak her 4’ün iki kopya 2 istediğini gör.",
      steps: [
        {
          label: "1. adım",
          explanation: "v₂(6!)=⌊6/2⌋+⌊6/4⌋=3+1=4.",
        },
        {
          label: "2. adım",
          explanation: "2k≤4, yani k≤2.",
        },
        {
          label: "3. adım",
          explanation: "k=2 uygundur; k=3 için altı adet 2 gerekir.",
        },
      ],
      answer: "2",
      check: "6!/16=720/16=45; 720/64 tam sayı değil.",
      pitfall: "4’ü asal formülünün p tabanı gibi kullanma.",
    },
  ],
  recall: [
    {
      prompt: "0! niçin 0 değil?",
      answer:
        "Boş çarpımın başlangıç değeri 1’dir; 0 çarpanı olan bir çarpım değildir.",
    },
    {
      prompt: "n!=n(n−1)! için sınır nedir?",
      answer: "n≥1 tam sayı. n=0 ile (−1)! üretilemez.",
    },
    {
      prompt: "6!/8! sadeleşince ne kalır?",
      answer: "1/(8·7)=1/56; oranın her zaman tam sayı olması gerekmez.",
    },
    {
      prompt: "(n+1)!+n! ve farkı nasıl ayrılır?",
      answer: "Toplam (n+2)n!, fark n·n!; ortak n! çarpanı dışarı alınır.",
    },
    {
      prompt: "n!=1 denkleminin bütün doğal çözümleri?",
      answer: "0 ve 1. Pozitif tam sayı koşulunda 0 dışlanır.",
    },
    {
      prompt: "(x−3)! tanımlıysa yalnız x≥3 yeter mi?",
      answer: "Hayır, x ayrıca tam sayı olmalı.",
    },
    {
      prompt: "v₂(10!) içindeki 5+2+1 neden?",
      answer:
        "2 katları birer, 4 katları ek birer, 8 katları birer daha 2 verir.",
    },
    {
      prompt: "12ᵏ tam bölmede hangi bütçeler gerekir?",
      answer: "12=2²·3; 2k sayısı v₂’yi, k sayısı v₃’ü aşmamalı.",
    },
    {
      prompt: "n! ile n!/2ᵃ son sıfırı aynı mıdır?",
      answer:
        "Zorunlu değil; bölümde 2 azalır, min(v₂−a,v₅) yeniden hesaplanır. Önce tam sayı koşulu.",
    },
    {
      prompt: "A,A,B için neden 3! değil?",
      answer:
        "A’lar ayırt edilmiyorsa AAB, ABA, BAA olmak üzere üç görünüm vardır.",
    },
    {
      prompt: "İlk koltuk zorunluysa ne yaparsın?",
      answer:
        "O kişiyi sabitle, kalan farklı kişileri sırala. Yasaksa ilk yerin seçeneklerini ayır.",
    },
    {
      prompt: "Bir kısa yolun kontrolü nedir?",
      answer:
        "Başlangıç koşullarını ve kapsamı koru; oranı çarpımla, çarpanlamayı dağıtmayla, adayı yerine koyarak denetle.",
    },
  ],
  items: [
    {
      code: "Q01",
      prompt: "Bu ünitedeki doğal sayı faktöriyeli tanımına göre 0! kaçtır?",
      options: ["1", "0", "−1", "Tanımsızdır.", "10"],
      knowledge: ["0!, boş çarpımın değeri olarak 1 tanımlanır."],
      strategy: "0 çarpanı ile hiç çarpan bulunmamasını ayır.",
      steps: [
        "0!, 0 ile çarpılan bir çarpım değildir.",
        "Boş çarpımın başlangıç değeri 1’dir.",
        "Bu nedenle 0!=1.",
      ],
      optionReasons: [
        "Tanımlanan değerdir.",
        "Boş çarpımı, 0 çarpanı içeren çarpımla karıştırır.",
        "Negatif değer oluşmaz; bütün doğal sayı faktöriyelleri pozitiftir.",
        "Bu tanımda 0! özellikle tanımlanmıştır.",
        "10, 0! için verilen tanım değildir.",
      ],
      check: "1!=1·0!=1 bağıntısıyla tutarlıdır.",
      commonError: "n!=n(n−1)! bağıntısında n=0 yazıp tanımsız (−1)! üretme.",
    },
    {
      code: "Q02",
      prompt: "0!+1!+2! toplamı kaçtır?",
      options: ["4", "3", "2", "0", "6"],
      knowledge: ["0!=1, 1!=1, 2!=2."],
      strategy: "Her faktöriyel değerini ayrı bul, sonra topla.",
      steps: ["0!=1 ve 1!=1.", "2!=1·2=2.", "Toplam 1+1+2=4."],
      optionReasons: [
        "Üç doğru değerin toplamıdır.",
        "0!’ı 0 sayınca 0+1+2=3 çıkar; başlangıç tanımı yanlıştır.",
        "İki tane 1 katkısını dışlar.",
        "Toplamdaki pozitif değerleri yok eder.",
        "3! değeridir; verilen ifade 3! değildir.",
      ],
      check: "Toplamın bütün terimleri pozitiftir; 2’den büyük olmalı.",
      commonError: "Toplamı tek bir ünlem altında birleştirme.",
    },
    {
      code: "Q03",
      prompt:
        "Doğal sayı faktöriyeli tanımı kullanılıyor. (x−3)! ve (7−x)! aynı anda tanımlıysa bütün gerçek x değerleri hangi kümedir?",
      options: [
        "{3,4,5,6,7}",
        "[3,7] aralığındaki bütün gerçek sayılar",
        "{4,5,6}",
        "{0,1,2,3}",
        "{7,8,9,…}",
      ],
      knowledge: ["Her ünlem içi negatif olmayan tam sayı olmalıdır."],
      strategy: "İki eşitsizliği ve tam sayı koşulunu kesiştir.",
      steps: [
        "x−3≥0, yani x≥3.",
        "7−x≥0, yani x≤7.",
        "x aynı zamanda tam sayıdır; adaylar 3,4,5,6,7.",
      ],
      optionReasons: [
        "Alt/üst sınırı ve tam sayılığı birlikte sağlar.",
        "3,5 gibi tam sayı olmayan değerler ünlem içini kesirli yapar.",
        "0! tanımlı olduğu için 3 ve 7 de dahil olmalıdır.",
        "0,1,2 için x−3 negatiftir.",
        "8 ve üzeri için 7−x negatiftir.",
      ],
      check: "x=3: 0! ve 4!; x=7: 4! ve 0! tanımlı.",
      commonError: "Yalnız eşitsizliği yazıp tam sayı koşulunu unutma.",
    },
    {
      code: "Q04",
      prompt:
        "(x−1)!=1 eşitliğinde, doğal sayı faktöriyeli tanımına göre bütün gerçek x çözümleri nedir?",
      options: ["{1,2}", "{2}", "{1}", "{0,1}", "{0,2}"],
      knowledge: [
        "Bir doğal sayının faktöriyeli yalnız iç değer 0 veya 1 iken 1’dir.",
      ],
      strategy: "İç değer için iki başlangıç olasılığını ayrı çöz.",
      steps: [
        "x−1=0 olursa x=1.",
        "x−1=1 olursa x=2.",
        "Daha büyük doğal iç değerler için faktöriyel en az 2 olur.",
      ],
      optionReasons: [
        "İki geçerli çözümü de içerir.",
        "0!=1 durumunu kaybeder.",
        "1!=1 durumunu kaybeder.",
        "x=0 için (−1)! tanımsızdır.",
        "x=0 tanımsız, x=1 ise geçerlidir fakat dışlanmış.",
      ],
      check: "x=1 için 0!=1; x=2 için 1!=1.",
      commonError: "Yalnız x−1=1 yazmak bütün çözümleri vermez.",
    },
    {
      code: "Q05",
      prompt: "8!/6! oranı kaçtır?",
      options: ["56", "2", "8", "14", "40.320"],
      knowledge: ["8!=8·7·6! ve 6! sıfır değildir."],
      strategy: "Büyük faktöriyeli ortak 6!’a kadar aç.",
      steps: ["8!/6!=(8·7·6!)/6!.", "Ortak 6! bölünür.", "8·7=56."],
      optionReasons: [
        "Kalan iki çarpanın ürünüdür.",
        "(8−6)! işlemini yapar; faktöriyel oranı bu değildir.",
        "7 çarpanını kaybeder.",
        "8 ve 6’yı toplar; oran çarpımı bırakır.",
        "8!’ın tamamıdır; 6!’a bölmeyi uygulamaz.",
      ],
      check: "56·720=40.320=8!.",
      commonError: "Ünlem içlerini çıkararak oran hesaplanmaz.",
    },
    {
      code: "Q06",
      prompt: "6!/8! oranının en sade değeri nedir?",
      options: ["1/56", "56", "1/2", "1/14", "0"],
      knowledge: ["8!=8·7·6!; küçük/büyük oranı 1’den küçüktür."],
      strategy: "Ortak 6!’ı pay ve paydadan böl.",
      steps: [
        "6!/(8·7·6!) yaz.",
        "Paydaki ortak çarpım gider, payda 8·7 kalır.",
        "Sonuç 1/56.",
      ],
      optionReasons: [
        "Doğru yönde kalan orandır.",
        "Ters oranı hesaplar.",
        "İç değer farkını paydaya koyar; faktöriyel açılımı değildir.",
        "Paydada 8 ve 6’yı toplar; çarpanlar 8 ve 7 olmalı.",
        "Pozitif iki sayının oranı sıfır değildir.",
      ],
      check: "8!/6!=56 olduğundan iki oran çarpımı 1 olur.",
      commonError: "Faktöriyel oranının her zaman tam sayı olduğunu varsayma.",
    },
    {
      code: "Q07",
      prompt: "3·4·5·6 çarpımının faktöriyelli doğru yazımı hangisidir?",
      options: ["6!/2!", "6!/3!", "6!", "5!/2!", "(6−3)!"],
      knowledge: ["6!, 1·2·3·4·5·6 çarpımıdır."],
      strategy: "İstenmeyen başlangıç çarpanları 1 ve 2’yi paydayla çıkar.",
      steps: [
        "6!=1·2·3·4·5·6.",
        "1·2=2! ortak başlangıçtır.",
        "3·4·5·6=6!/2!.",
      ],
      optionReasons: [
        "Yalnız 1 ve 2’yi çıkarır.",
        "Gerekli 3 çarpanını da çıkarır.",
        "Fazladan 2 çarpanı taşır.",
        "Gerekli 6 çarpanını içermez.",
        "3!=6’dır; verilen çarpım 360’tır.",
      ],
      check: "720/2=360; 3·4·5·6=360.",
      commonError:
        "Ardışık çarpımın ilk sayısı değil, onun bir eksiği paydaya gelir.",
    },
    {
      code: "Q08",
      prompt: "(3!)² ifadesinin değeri kaçtır?",
      options: ["36", "362.880", "12", "9", "720"],
      knowledge: ["Üs, parantez içindeki sayının tekrarlı çarpımıdır."],
      strategy: "Önce parantezdeki 3!’ı hesapla.",
      steps: ["3!=1·2·3=6.", "(3!)²=6²=6·6.", "Sonuç 36."],
      optionReasons: [
        "Parantez ve üs sırasını korur.",
        "(3²)!=9!’ı hesaplar; farklı ifadedir.",
        "6’yı ikiyle çarpar; karesini almaz.",
        "3’ün karesidir; faktöriyel uygulanmamış.",
        "6!’dır; 6’nın karesi değildir.",
      ],
      check: "(3!)·(3!)=6·6.",
      commonError: "Ünlemin ve üssün kapsadığı ifadeyi değiştirme.",
    },
    {
      code: "Q09",
      prompt: "(5!+4!)/4! kaçtır?",
      options: ["6", "5", "9", "30", "120"],
      knowledge: ["Toplamda ortak çarpan ayrılır; her terim bölmeye katılır."],
      strategy: "Payı 4!(5+1) olarak yaz.",
      steps: ["5!=5·4!.", "Pay=4!(5+1).", "4!’a bölününce 5+1=6."],
      optionReasons: [
        "İkinci terimin 1 katkısını korur.",
        "İkinci 4!’ün katkısını kaybeder.",
        "Ünlem içlerini 5+4 diye toplar.",
        "30·4!=720 olur; pay 5!+4!=144 olduğundan bu oran olamaz.",
        "Yalnız 5!’ın değeridir.",
      ],
      check: "(120+24)/24=144/24=6.",
      commonError: "Toplam içinden tek bir terim çizerek sadeleştirme yapma.",
    },
    {
      code: "Q10",
      prompt: "(7!+6!)/(6!−5!) oranının değeri kaçtır?",
      options: ["48/5", "13", "48", "8/5", "6/5"],
      knowledge: ["Bütün terimler 5! çarpanıyla yazılabilir."],
      strategy: "Pay ve paydayı aynı ortak faktöriyele indir.",
      steps: [
        "7!=42·5!, 6!=6·5!.",
        "Pay=48·5!, payda=5·5!.",
        "Ortak pozitif 5! gider; sonuç 48/5.",
      ],
      optionReasons: [
        "Pay 48, payda 5 çarpanı doğru bulunmuştur.",
        "İç değerlerden (7+6)/(6−5) kurar; faktöriyel çarpanlarını eşitlemez.",
        "Paydanın 5 çarpanını kaybeder.",
        "Payın ortak 5! katsayısı 7·6+6=48 olmalı; 8 olamaz.",
        "Paydaki terimlerin gerçek ortak katsayılarını saymaz.",
      ],
      check: "5.760/600=9,6=48/5.",
      commonError:
        "Fark içeren paydada yalnız faktöriyel değerlerinin pozitifliği yetmez; farkın sıfır olmadığını kontrol et.",
    },
    {
      code: "Q11",
      prompt: "n≥0 tam sayı için (n+1)!−n! hangi ifadeye eşittir?",
      options: ["n·n!", "(n−1)!", "(n+1)·n!", "n!", "0"],
      knowledge: ["(n+1)!=(n+1)n!, dağıtma kuralıyla ortak n! ayrılır."],
      strategy: "İki terimi aynı n! çarpanıyla yaz.",
      steps: ["(n+1)n!−n!=n![(n+1)−1].", "Parantez n olur.", "Sonuç n·n!."],
      optionReasons: [
        "Dağıtma kuralının sonucudur.",
        "Ünlemlerin içini çıkarıp yeni faktöriyel kurar; n=0 için ayrıca tanımsız.",
        "İkinci n! çıkarılmamış olur.",
        "Yalnız n=1 gibi özel durumda eşleşir; n=2 için fark 4 iken 2!=2.",
        "Yalnız n=0 için doğrudur; genel ifade değildir.",
      ],
      check: "n=3 için 24−6=18=3·6.",
      commonError:
        "İki terimde ünlem var diye çıkarma iç değerleri çıkarmaya dönüşmez.",
    },
    {
      code: "Q12",
      prompt:
        "Doğal sayı faktöriyeli kullanılırken (x−2)!=(5−x)! denkleminin bütün gerçek çözümleri hangisidir?",
      options: [
        "Çözüm yoktur.",
        "Yalnız x=3,5.",
        "{3,4}",
        "{2,5}",
        "{2,3,4,5}",
      ],
      knowledge: ["Her iki ünlem içi negatif olmayan tam sayı olmalıdır."],
      strategy: "Önce dört izinli adayı bul, sonra tek tek dene.",
      steps: [
        "Koşullar x=2,3,4,5 verir.",
        "Eşitlikler 0!=3!, 1!=2!, 2!=1!, 3!=0! olur.",
        "Sırasıyla 1≠6, 1≠2, 2≠1, 6≠1; hepsi elenir.",
      ],
      optionReasons: [
        "İzinli bütün adayların karşılaştırması bunu gösterir.",
        "3,5 ondalık sayısında x−2=1,5 tam sayı değildir; faktöriyeller bu tanımda yoktur.",
        "1! ile 2! eşit değildir; iki aday da elenir.",
        "0! ile 3! eşit değildir.",
        "Bu yalnız tanım kümesidir; denklemi sağlayanlar değildir.",
      ],
      check: "İçleri eşitlemek x=3,5 verir; bu tanım dışıdır.",
      commonError:
        "Tanım kümesinde bulunmayı denklemin çözümü olmakla karıştırma.",
    },
    {
      code: "Q13",
      prompt: "n negatif olmayan tam sayı ve (n+2)!/n!=42 ise n kaçtır?",
      options: ["5", "6", "7", "−8", "42"],
      knowledge: ["Oran (n+2)(n+1) olur; iki çarpan ardışık pozitiftir."],
      strategy: "42’yi ardışık pozitif çarpanlarına ayır.",
      steps: [
        "(n+2)(n+1)=42=7·6.",
        "n+1=6 olur.",
        "n=5; negatif cebirsel kök tanım dışıdır.",
      ],
      optionReasons: [
        "7!/5!=42 eşitliğini sağlar.",
        "8!/6!=56 verir; koşulu sağlamaz.",
        "9!/7!=72 verir.",
        "Negatif olduğu için n! burada tanımlı değildir.",
        "Verilen oranı n sanır; yerine koyunca 44·43 olur.",
      ],
      check: "7·6=42.",
      commonError: "n+1=6 sonucunda n’yi 6 yazma.",
    },
    {
      code: "Q14",
      prompt: "10!’ın asal çarpan ayrılışındaki 2’nin üssü kaçtır?",
      options: ["8", "5", "10", "7", "2"],
      knowledge: [
        "2’nin katları birer, 4’ün katları ek birer, 8’in katları birer ek 2 verir.",
      ],
      strategy: "2,4,8 kuvvetlerinin katlarını say.",
      steps: ["⌊10/2⌋=5.", "⌊10/4⌋=2 ve ⌊10/8⌋=1.", "16>10; toplam 5+2+1=8."],
      optionReasons: [
        "Bütün kopyaları sayar.",
        "Yalnız çift sayıları sayar; 4 ve 8’in ek kopyaları yok.",
        "Her çarpanın çift olduğu varsayımını yapar.",
        "8’in üçüncü 2 kopyasını kaybeder.",
        "Asal tabanın kendisini üs sayar.",
      ],
      check: "2,4,6,8,10 içindeki 2 kopyaları 1+2+1+3+1=8.",
      commonError:
        "Bir sayının yeniden sayılması değil, ondaki ek asal kopya sayılıyor.",
    },
    {
      code: "Q15",
      prompt: "15!’ın asal çarpan ayrılışındaki 3’ün üssü kaçtır?",
      options: ["6", "5", "3", "9", "15"],
      knowledge: ["v₃(15!)=⌊15/3⌋+⌊15/9⌋; 27>15."],
      strategy: "9’un ikinci 3’ünü ayrıca ekle.",
      steps: [
        "3,6,9,12,15 birer 3 verir: 5 kopya.",
        "9 ek bir 3 daha verir.",
        "Toplam 6.",
      ],
      optionReasons: [
        "5+1 toplamıdır.",
        "9’un ikinci 3’ünü unutmuştur.",
        "Asal tabanı üs sayar.",
        "3² sayısını sayaçla karıştırır.",
        "15 çarpanın hepsinin 3 verdiğini varsayar.",
      ],
      check: "1+1+2+1+1=6.",
      commonError:
        "Sadece p’nin katlarını saymak, p²’nin ek kopyasını kaçırır.",
    },
    {
      code: "Q16",
      prompt: "10!/12ᵏ tam sayı olacak en büyük k≥0 tam sayısı kaçtır?",
      options: ["4", "0", "2", "5", "8"],
      knowledge: ["12=2²·3; v₂(10!)=8 ve v₃(10!)=4."],
      strategy: "Her 12 için gereken asal kopyalarını bütçelere böl.",
      steps: ["12ᵏ=2²ᵏ·3ᵏ.", "2k≤8 ve k≤4.", "İki koşulun ortak üst sınırı 4."],
      optionReasons: [
        "İki asal bütçesini de sağlar.",
        "⌊10/12⌋=0 sayımı asal kuvvet hesabı değildir; 12⁴ bile tam böler.",
        "Kuvvet ihtiyacını gereksiz daraltır; k=4 de mümkündür.",
        "5 için on tane 2 ve beş tane 3 gerekir; ikisi de yetmez.",
        "8 yalnız 2’nin üssüdür; her 12 iki 2 ister, ayrıca 3 de gerekir.",
      ],
      check: "10!/12⁴=175 tam sayı.",
      commonError: "Bileşik böleni asal gibi tek sayaçla değerlendirme.",
    },
    {
      code: "Q17",
      prompt: "25!’ın sondaki sıfır sayısı kaçtır?",
      options: ["6", "5", "25", "2", "1"],
      knowledge: [
        "Faktöriyelde son sıfır sayısı 5 ve 25 katlarının katkılarını toplar.",
      ],
      strategy: "25’te iki tane 5 bulunduğunu koru.",
      steps: ["⌊25/5⌋=5.", "⌊25/25⌋=1.", "125>25; toplam 6."],
      optionReasons: [
        "İki düzeyin toplamıdır.",
        "25’in ek 5’ini dışlar.",
        "n değerini son sıfır sayısı sanır.",
        "Yalnız 25’in içindeki 5 kopyalarını sayar; diğer katları dışlar.",
        "Yalnız 25’in katını sayar; 5,10,15,20 katkıları yok.",
      ],
      check: "5,10,15,20,25 toplam 1+1+1+1+2=6 tane 5 verir.",
      commonError: "⌊n/5⌋ tek başına n≥25 olduğunda yetmeyebilir.",
    },
    {
      code: "Q18",
      prompt: "30!’ın sondaki sıfır sayısı kaçtır?",
      options: ["7", "6", "5", "8", "30"],
      knowledge: ["v₅(30!)=⌊30/5⌋+⌊30/25⌋."],
      strategy: "5’in katları ile 25’in ek kopyasını birleştir.",
      steps: ["Altı sayı 5’in katıdır.", "25 bir ek 5 taşır.", "6+1=7."],
      optionReasons: [
        "Bütün 5 kopyalarını sayar.",
        "25’in ek kopyasını unutur.",
        "5 asal tabanıdır; kopya sayısı değildir.",
        "125 katkısı yoktur; gereksiz bir tane ekler.",
        "Faktöriyelin iç değeridir; son sıfır sayısı değildir.",
      ],
      check: "5,10,15,20,25,30 katkısı 1+1+1+1+2+1=7.",
      commonError: "Bir 25 sayısı iki adet 5 taşır.",
    },
    {
      code: "Q19",
      prompt: "20!’ın sondaki sıfır sayısı kaçtır?",
      options: ["4", "5", "2", "8", "20"],
      knowledge: ["25>20 olduğundan yalnız 5’in katları katkı verir."],
      strategy: "5,10,15,20 sayılarını say.",
      steps: [
        "⌊20/5⌋=4.",
        "⌊20/25⌋=0.",
        "Faktöriyelde yeterli 2 vardır; son sıfır sayısı 4.",
      ],
      optionReasons: [
        "Dört 5 kopyasının eşleşmesidir.",
        "20’ye kadar olmayan 25’i de ekler.",
        "5’in tüm katlarını saymaz.",
        "20!’taki 3 üssüne eşittir; istenen 2–5 eşleşmesi.",
        "20 çarpanın tümünün sonuna sıfır kattığını varsayar.",
      ],
      check: "5,10,15,20 birer 5 verir.",
      commonError: "Son sıfır sorusunu başka asal üssü sorusuyla karıştırma.",
    },
    {
      code: "Q20",
      prompt: "50!’ın sondaki sıfır sayısı kaçtır?",
      options: ["12", "10", "11", "13", "50"],
      knowledge: ["5’in katları birer, 25’in katları ek birer 5 verir."],
      strategy: "25 ve 50’deki ikinci kopyaları ayır.",
      steps: ["⌊50/5⌋=10.", "⌊50/25⌋=2.", "125>50; 10+2=12."],
      optionReasons: [
        "Bütün kopyaları korur.",
        "25 ve 50’nin ek kopyalarını kaybeder.",
        "Ek iki kopyadan yalnız birini sayar.",
        "125 katkısı olmadığı halde fazladan bir ekler.",
        "n değeridir; sıfır sayısı değildir.",
      ],
      check: "25 ve 50 iki, diğer sekiz 5 katı birer kopya: 4+8=12.",
      commonError: "25’in katlarının her biri ayrıca bir kopya verir.",
    },
    {
      code: "Q21",
      prompt: "N=10!/2⁷ tam sayısının sondaki sıfır sayısı kaçtır?",
      options: ["1", "2", "0", "7", "8"],
      knowledge: ["10! içinde sekiz 2 ve iki 5 kopyası vardır."],
      strategy: "Bölümden sonra kalan 2 ve 5’i karşılaştır.",
      steps: ["2 bütçesi 8−7=1.", "5 bütçesi 2 olarak kalır.", "min(1,2)=1."],
      optionReasons: [
        "Kalan bir 2, bir 5 ile tek 10 oluşturur.",
        "10!’ın sıfır sayısını bölümde aynen kullanır.",
        "Payda 2⁸ olsaydı sıfır olurdu; burada bir 2 kalır.",
        "Silinen 2 sayısını sonuç sanır.",
        "Başlangıç 2 bütçesidir; bölümde azalmıştır.",
      ],
      check: "10!/128=28.350.",
      commonError:
        "Faktöriyelin kendisinde yalnız 5 sayma kuralını bölüme taşıma.",
    },
    {
      code: "Q22",
      prompt: "N=10!/2⁸ tam sayısının sondaki sıfır sayısı kaçtır?",
      options: ["0", "1", "2", "5", "8"],
      knowledge: ["10!’ın sekiz 2 kopyası paydada tamamen tüketilir."],
      strategy: "Kalan asal bütçelerinden bir çift 2–5 kurulabiliyor mu bak.",
      steps: ["v₂(N)=8−8=0.", "v₅(N)=2.", "min(0,2)=0; hiç 10 ayrılmaz."],
      optionReasons: [
        "2 bulunmadığı için son sıfır yoktur.",
        "Payda 2⁷ olsaydı bir 2 kalırdı.",
        "Yalnız kalan 5’leri sayar; onların eşleşeceği 2 yok.",
        "5 tabanıdır; sıfır sayacı değildir.",
        "Başlangıç 2 üssüdür; payda onları götürmüştür.",
      ],
      check: "10!/256=14.175; son rakam 5’tir.",
      commonError: "5 ile bitmek, 0 ile bitmek değildir.",
    },
    {
      code: "Q23",
      prompt: "9!+10! sayısının sondaki sıfır sayısı kaçtır?",
      options: ["1", "2", "3", "9", "10"],
      knowledge: ["9!+10!=11·9!; 11 yeni 2 veya 5 çarpanı vermez."],
      strategy: "Toplamı ortak faktöriyelle çarpım yap.",
      steps: [
        "10!=10·9!.",
        "Toplam=(1+10)9!=11·9!.",
        "9! içinde v₅=1, v₂=7 olduğundan min=1.",
      ],
      optionReasons: [
        "Ortak çarpımdaki asal bütçelerine uyar.",
        "10!’ın sıfır sayısını toplam için otomatik seçer.",
        "Terimlerin sıfır sayılarını toplamak geçerli değildir.",
        "Küçük faktöriyelin iç değeridir.",
        "Büyük faktöriyelin iç değeridir.",
      ],
      check: "9!+10!=3.991.680; yalnız en sondaki bir rakam 0.",
      commonError:
        "Toplamın asal çarpanları terimlerin bütçelerini toplamakla bulunmaz.",
    },
    {
      code: "Q24",
      prompt:
        "Dört farklı dosyanın tamamı dört numaralı rafa birer kez konuyor; başka kısıt yok. Kaç düzen vardır?",
      options: ["24", "4", "12", "16", "6"],
      knowledge: [
        "Farklı nesnelerin kısıtsız doğrusal tam sıralaması 4! ile sayılır.",
      ],
      strategy: "Her raf için kalan dosya sayısını çarp.",
      steps: [
        "İlk rafa 4, ikinciye 3 seçenek.",
        "Sonra 2 ve 1 seçenek.",
        "4·3·2·1=24.",
      ],
      optionReasons: [
        "Dört aşamanın çarpımıdır.",
        "Yalnız ilk rafın seçimini sayar.",
        "Son iki rafın iki farklı sırasını kaybeder.",
        "İlk iki rafın 4·3=12 seçiminin her biri son iki raf için 2 sıra verir; 16 bu tam sayımı karşılamaz.",
        "Bir dosya sabitlenmiş olsaydı 3!=6 olurdu; burada sabitlenmemiş.",
      ],
      check:
        "İlk dosya için 4 seçim, her biri için kalanların 6 sırası: 4·6=24.",
      commonError:
        "Nesnelerin tekrar kullanılmadığını ve yerlerin numaralı olduğunu koru.",
    },
    {
      code: "Q25",
      prompt:
        "Dört farklı dosya dört numaralı rafa konuyor. A dosyası ilk rafta olamaz. Başka kısıt yoksa kaç düzen vardır?",
      options: ["18", "24", "6", "12", "9"],
      knowledge: [
        "İlk rafa A dışındaki 3 dosya gelebilir; sonra kalan 3 dosya sıralanır.",
      ],
      strategy: "İlk yere özel kısıtı ayrı uygula.",
      steps: [
        "İlk yere 3 seçenek.",
        "Kalan yerlere 3·2·1=6 seçenek.",
        "Toplam 3·6=18.",
      ],
      optionReasons: [
        "Kısıtlı ve serbest adımları birlikte sayar.",
        "Yasağı yok sayan 4! sayımıdır.",
        "A’nın ilk yerde sabit olduğu yasak düzenlerin sayısıdır.",
        "Kalan üç yerin bütün sıralarını saymaz.",
        "3·3’ten sonra son iki yerin sırasını unutur.",
      ],
      check: "24 toplam düzen−6 yasak düzen=18.",
      commonError: "Yasak düzen sayısı ile izinli düzen sayısını ters seçme.",
    },
    {
      code: "Q26",
      prompt:
        "Deniz ve üç farklı arkadaşı dört numaralı koltuğa oturacak. Deniz ilk koltukta olmak zorundaysa kaç düzen vardır?",
      options: ["6", "24", "18", "3", "12"],
      knowledge: ["Deniz sabitlenince kalan üç farklı kişi serbest sıralanır."],
      strategy: "Sabit kişinin yerini yeniden seçme.",
      steps: [
        "Deniz için ilk yerde 1 seçenek.",
        "Kalanlar 3·2·1 şekilde oturur.",
        "1·6=6.",
      ],
      optionReasons: [
        "Sabit koşula uygun 3! sayımıdır.",
        "Deniz’in yerini de serbest seçer.",
        "İlk yer Deniz’e yasak olsaydı 18 olurdu.",
        "Yalnız ikinci koltuğun seçimini sayar.",
        "Kısıta uymayan fazla durumları da sayar.",
      ],
      check: "Üç kişi A,B,C diye yazılırsa ABC,ACB,BAC,BCA,CAB,CBA.",
      commonError: "İlk koltuk zorunluluğunu yasakla karıştırma.",
    },
    {
      code: "Q27",
      prompt:
        "İki ayırt edilemeyen A kitabı ve bir B kitabı üç numaralı yere konuyor. Kaç farklı görünen sıra vardır?",
      options: ["3", "6", "2", "9", "1"],
      knowledge: ["İki A’nın yer değiştirmesi yeni görünen sıra değildir."],
      strategy: "B kitabının yerini seçerek listele.",
      steps: [
        "B ilk yerde: BAA.",
        "B ikinci: ABA, üçüncü: AAB.",
        "Üç farklı görünüm vardır.",
      ],
      optionReasons: [
        "Üç görünen sırayı sayar.",
        "A’ları ayırt ediyormuş gibi her görünümü iki kez sayar.",
        "B’nin üçüncü yer olasılığını dışlar.",
        "Nesneleri tekrar seçiyormuş gibi fazla sayar.",
        "B’nin yer değiştirmesini görünmez sanır; kitap türleri farklıdır.",
      ],
      check: "B’nin üç farklı yeri üç farklı diziyi belirler.",
      commonError: "n! kuralındaki “bütün nesneler farklı” koşulunu unutma.",
    },
    {
      code: "Q28",
      prompt:
        "4 depoda, her depoda 5 raf, her rafta 3 kutu, her kutuda 2 paket var. Paket sayısının doğru faktöriyelli karşılığı hangisidir?",
      options: ["5!", "4!·5!", "4!", "6!", "5!/2!"],
      knowledge: ["Katman adetleri çarpılır: 4·5·3·2."],
      strategy: "Birimleri izle, çarpanları ardışık sıraya getir.",
      steps: [
        "Depo, raf, kutu birimleri ardışık olarak sadeleşir.",
        "4·5·3·2=2·3·4·5.",
        "1 çarpanı sonucu değiştirmez; toplam 5!=120 paket.",
      ],
      optionReasons: [
        "Verilen çarpanların tam zinciridir.",
        "Katmanların her birini ayrıca sıralama sayısına çevirir; soru sıralama değildir.",
        "5 çarpanını kaybeder.",
        "Verilmeyen 6 çarpanını ekler.",
        "Gerekli 2 çarpanını çıkarır.",
      ],
      check: "4·5=20 raf, 20·3=60 kutu, 60·2=120 paket.",
      commonError:
        "Faktöriyel, her çarpımlı sözel soruda bütün adetlere ayrı ayrı uygulanmaz.",
    },
    {
      code: "Q29",
      prompt:
        "11 bölgenin her birinde 12 birim, her birimde 13 merkez, her merkezde 2 kat ve her katta 7 salon vardır. Toplam salon sayısı hangi ifadeye eşittir?",
      options: ["14!/10!", "13!/10!", "14!/9!", "15!/10!", "15!/9!"],
      knowledge: [
        "Toplam 11·12·13·2·7; 2·7=14 birleşimi ardışık zinciri tamamlar.",
      ],
      strategy: "Katmanları çarpıp 11’den 14’e zincir kur.",
      steps: [
        "11·12·13·2·7=11·12·13·14.",
        "14!=14·13·12·11·10!.",
        "Ortak başlangıç 10! ile bölününce 14!/10! kalır.",
      ],
      optionReasons: [
        "11,12,13,14 çarpanlarını tam taşır.",
        "Gerekli 14 çarpanı yoktur.",
        "Fazladan 10 çarpanı içerir.",
        "Fazladan 15 çarpanı içerir.",
        "Fazladan hem 10 hem 15 içerir.",
      ],
      check: "132·182=24.024; oran açılınca da 24.024.",
      commonError:
        "2×7=14 birleşmesini atlama; başlangıç çarpanı 11 olduğundan paydaya 10! gelir.",
    },
    {
      code: "Q30",
      prompt: "n≥0 tam sayı ve [(n+2)!−(n+1)!]/(n+1)!=8 ise n kaçtır?",
      options: ["7", "8", "6", "9", "0"],
      knowledge: ["Pay ortak (n+1)! ile (n+2−1) katsayısını bırakır."],
      strategy: "Önce oranı n+1’e indir.",
      steps: [
        "(n+2)!=(n+2)(n+1)!.",
        "Oran (n+2)−1=n+1.",
        "n+1=8 olduğundan n=7.",
      ],
      optionReasons: [
        "Koşulu sağlar.",
        "Oranı n sanıp bir eksiltmeyi unutmuştur.",
        "Yerine konunca oran 7 çıkar, 8 değil.",
        "Yerine konunca oran 10 çıkar.",
        "n=0 için oran 1 olur.",
      ],
      check: "n=7 için (9!−8!)/8!=9−1=8.",
      commonError: "n+1 ile n’yi aynı değişken değeri gibi kullanma.",
    },
    {
      code: "Q31",
      prompt: "9!/7! kaçtır?",
      options: ["72", "2", "18", "56", "362.880"],
      knowledge: ["9!=9·8·7!."],
      strategy: "Yalnız ortak 7!’a kadar aç.",
      steps: [
        "9!/7!=(9·8·7!)/7!.",
        "Ortak 7! sıfır olmadığından bölünür.",
        "9·8=72.",
      ],
      optionReasons: [
        "Kalan iki çarpanın ürünüdür.",
        "Ünlem içlerinin farkını alır.",
        "9 ile 2’yi çarpar; kalan gerçek ikinci çarpan 8’dir.",
        "8!/6! oranını hesaplar; verilen oran farklıdır.",
        "9!’ın tamamını yazıp bölmez.",
      ],
      check: "72·5.040=362.880=9!.",
      commonError: "Benzer önceki sorunun sayısını yeni oran yerine kullanma.",
    },
    {
      code: "Q32",
      prompt: "8!/6ᵏ tam sayı olacak en büyük k≥0 tam sayısı kaçtır?",
      options: ["2", "1", "3", "7", "8"],
      knowledge: ["6=2·3; 8! içinde yedi 2 ve iki 3 kopyası vardır."],
      strategy: "İki asal bütçesinin küçüğünü seç.",
      steps: [
        "v₂(8!)=4+2+1=7.",
        "v₃(8!)=2.",
        "Her 6 bir 2 ve bir 3 ister; k≤min(7,2)=2.",
      ],
      optionReasons: [
        "3 bütçesi sınırlayıcıdır.",
        "⌊8/6⌋ hesabı asal çarpan kopyalarını saymaz.",
        "Üçüncü 3 kopyası bulunmaz.",
        "Yalnız 2 bütçesini kullanır; 3 koşulunu unutmuştur.",
        "8, çarpımın iç değeridir; iki asal bütçesi bunu desteklemez.",
      ],
      check: "8!/36=1.120 tam; üçüncü 6 için bir 3 eksik.",
      commonError:
        "Bileşik tabanın bütün asal gereksinimlerini birlikte denetle.",
    },
    {
      code: "Q33",
      prompt: "n≥0 tam sayı ve (n+2)!/n!=20 ise n kaçtır?",
      options: ["3", "4", "5", "−6", "20"],
      knowledge: ["Oran (n+2)(n+1); 20’nin ardışık pozitif çarpanları 4 ve 5."],
      strategy: "Küçük çarpanı n+1 ile eşleştir.",
      steps: ["(n+2)(n+1)=20=5·4.", "n+1=4.", "n=3."],
      optionReasons: [
        "5!/3!=20 koşulunu sağlar.",
        "6!/4!=30 verir.",
        "7!/5!=42 verir.",
        "Cebirsel negatif köktür; n! burada tanımsızdır.",
        "Oran ile bilinmeyeni karıştırır.",
      ],
      check: "120/6=20.",
      commonError: "Negatif aday tanım kümesinden geçmeden çözüm olamaz.",
    },
    {
      code: "Q34",
      prompt: "(8!−7!)/7! kaçtır?",
      options: ["7", "1", "8", "0", "56"],
      knowledge: ["8!=8·7!, farkta ortak 7! ayrılır."],
      strategy: "Katsayıların farkını al.",
      steps: ["Pay=7!(8−1).", "Ortak 7! bölünür.", "8−1=7."],
      optionReasons: [
        "İkinci terimin 1 katkısını doğru çıkarır.",
        "Ünlem içlerinin farkını son cevap sanır.",
        "İkinci 7!’ü hiç çıkarmamış olur.",
        "8! ve 7! eşit değildir.",
        "8!/6! gibi farklı oranı hesaplar.",
      ],
      check: "(40.320−5.040)/5.040=7.",
      commonError: "Toplam/farkta her terimin katkısını koru.",
    },
    {
      code: "Q35",
      prompt: "(x−4)!=1 eşitliğinin bütün gerçek x çözümleri hangisidir?",
      options: ["{4,5}", "{5}", "{4}", "{3,4}", "{0,1}"],
      knowledge: ["Ünlem içi 0 veya 1 olmalıdır."],
      strategy: "İki olasılığı x için ayrı çöz.",
      steps: [
        "x−4=0 → x=4.",
        "x−4=1 → x=5.",
        "Her ikisi de faktöriyeli tanımlı ve 1 yapar.",
      ],
      optionReasons: [
        "İki geçerli çözümü içerir.",
        "0! olasılığını dışlar.",
        "1! olasılığını dışlar.",
        "x=3 için (−1)! tanımsız, x=5 ise unutulmuş.",
        "0 ve 1 iç değerlerdir; x değerleri değildir.",
      ],
      check: "4−4=0, 5−4=1.",
      commonError: "İç değerin çözümleriyle x çözümlerini karıştırma.",
    },
    {
      code: "Q36",
      prompt: "(y−5)!=1 için bütün gerçek y çözümleri hangisidir?",
      options: ["{5,6}", "{6}", "{5}", "{0,1}", "{4,5}"],
      knowledge: [
        "0!=1!=1; daha büyük doğal iç değerlerin faktöriyeli en az 2’dir.",
      ],
      strategy: "Sıfır iç değerini dahil ederek iki denklem yaz.",
      steps: [
        "y−5=0 veya y−5=1.",
        "y=5 veya y=6.",
        "İki aday da başlangıç tanımına uygundur.",
      ],
      optionReasons: [
        "İki doğru y değeridir.",
        "0!’ı dışlayınca yalnız 6 kalır; eksiktir.",
        "1!’ı dışlayınca yalnız 5 kalır; eksiktir.",
        "İç değerleri doğrudan y sanır.",
        "y=4 tanım dışı, y=6 geçerli ama unutulmuş.",
      ],
      check: "5 için 0!, 6 için 1! bulunur.",
      commonError: "Benzer örnekteki kaydırmayı ezberden taşıma; yeni 5’i çöz.",
    },
    {
      code: "Q37",
      prompt: "6!/4ᵏ tam sayı olacak en büyük k≥0 tam sayısı kaçtır?",
      options: ["2", "1", "3", "4", "6"],
      knowledge: ["4ᵏ=2²ᵏ ve v₂(6!)=⌊6/2⌋+⌊6/4⌋=4."],
      strategy: "Her 4’ün iki tane 2 tükettiğini yaz.",
      steps: [
        "6!’da dört 2 vardır.",
        "2k≤4 olduğundan k≤2.",
        "k=2 için 6!/16=45 tam sayıdır.",
      ],
      optionReasons: [
        "Mevcut dört 2’yi ikişerli kullanır.",
        "⌊6/4⌋=1 yalnız 4’ün katını sayar; 2 ve 6’nın katkısı kaybolur.",
        "Altı 2 kopyası ister; yalnız dört vardır.",
        "2’nin üssünü 4’ün üssü sanır.",
        "6, faktöriyelin iç değeridir; asal bütçeyi sağlamaz.",
      ],
      check: "k=3 için 720/64 tam sayı değildir.",
      commonError: "Bileşik tabanı asal olarak değerlendirme.",
    },
    {
      code: "Q38",
      prompt:
        "25!/2²² bir tam sayıdır. Bu sayının sondaki sıfır sayısı kaçtır?",
      options: ["0", "6", "5", "22", "1"],
      knowledge: ["v₂(25!)=12+6+3+1=22; payda bütün 2’leri tüketir."],
      strategy: "5 sayısından önce kalan 2 bütçesini bul.",
      steps: ["v₂=22−22=0.", "v₅(25!)=5+1=6 olarak kalır.", "min(0,6)=0."],
      optionReasons: [
        "Hiç 2 kalmadığı için hiçbir 10 oluşmaz.",
        "25!’ın son sıfır sayısını bölümde değişmeden kullanır.",
        "Eksik 5 sayımıdır; ayrıca 2 koşulunu da yok sayar.",
        "Başlangıç 2 bütçesini sonuç sanır.",
        "Bir 2 kalmış olsaydı olurdu; burada hiç kalmadı.",
      ],
      check: "2 içermeyen pozitif bir tam sayı 10’a bölünemez.",
      commonError: "Faktöriyel yerine bölümde çalıştığını unutma.",
    },
    {
      code: "Q39",
      prompt: "20!’ın asal çarpan ayrılışındaki 3’ün üssü kaçtır?",
      options: ["8", "6", "4", "9", "20"],
      knowledge: ["3 katları ve 9 katları sayılır; 27>20."],
      strategy: "3 sayacını, son sıfır sayacı olan 5’ten ayır.",
      steps: ["⌊20/3⌋=6.", "⌊20/9⌋=2.", "Toplam 6+2=8."],
      optionReasons: [
        "İki düzeyin toplamıdır.",
        "9 ve 18’in ek 3 kopyalarını unutmuştur.",
        "20!’ın son sıfır sayısıdır; istenen 3 üssü.",
        "9, 3² tabanıdır; sayaç değildir.",
        "Her çarpanı bir 3 sanır.",
      ],
      check: "3,6,9,12,15,18 katkısı 1+1+2+1+1+2=8.",
      commonError: "Soruda istenen asal değişince kat sayacı da değişir.",
    },
    {
      code: "Q40",
      prompt:
        "Negatif olmayan tam sayı n için n!’ın tek/çift durumu hakkında hangisi her zaman doğrudur?",
      options: [
        "n=0 veya n=1 iken tek; n≥2 iken çifttir.",
        "Bütün n değerlerinde çifttir.",
        "n tekse n! daima tektir.",
        "n çiftse n! tektir.",
        "n! hiçbir zaman tam sayı değildir.",
      ],
      knowledge: ["0!=1!=1; n≥2 için çarpımda 2 bulunur."],
      strategy: "Başlangıç değerleriyle 2 çarpanı içeren durumları ayır.",
      steps: [
        "0! ve 1! bir olduğundan tektir.",
        "n≥2 olduğunda 2, n!’ın çarpanlarından biridir.",
        "Bu durumda n! çifttir; n’nin kendisinin tekliği belirlemez.",
      ],
      optionReasons: [
        "Başlangıç istisnalarını ve genel çiftliği doğru ayırır.",
        "0! ve 1! tektir.",
        "n=3 için 3!=6 çifttir; karşı örnek yeterlidir.",
        "n=2 için 2!=2 çifttir.",
        "Tanım gereği her doğal sayı faktöriyeli pozitif tam sayıdır.",
      ],
      check: "n=0,1,2,3 tablosu 1,1,2,6 değerlerini verir.",
      commonError:
        "Faktöriyelin tekliğini yalnız ünlem içinin tekliğinden çıkarma.",
    },
    {
      code: "Q41",
      prompt: "(6!+5!)/5! ifadesi için hangi sonuç doğrudur?",
      options: ["7", "6", "11", "30", "720"],
      knowledge: ["6!=6·5!; payın ikinci terimi de bölmeye katılır."],
      strategy: "Payı ortak 5! ile çarpanlara ayır.",
      steps: [
        "Pay 5!(6+1) olur.",
        "5! pozitif olduğundan ortak çarpan bölünür.",
        "Kalan 6+1=7.",
      ],
      optionReasons: [
        "İki terimin katkısını doğru toplar.",
        "İkinci terimin 1 katkısını unutmuştur.",
        "6+5 yaparak faktöriyellerin iç değerlerini toplar.",
        "6·5 gibi bir açılım parçasını kullanır; verilen oran değildir.",
        "6!’ın değeridir; paydadaki bölme ve diğer terim dikkate alınmamıştır.",
      ],
      check: "(720+120)/120=840/120=7.",
      commonError:
        "Toplamdaki tek bir faktöriyeli silmek ortak çarpan sadeleştirmesi değildir.",
    },
    {
      code: "Q42",
      prompt:
        "(4!+3!)/3! ifadesinde ortak çarpan ayrıldıktan sonra doğru sonuç hangisidir?",
      options: ["5", "4", "7", "30", "5.040"],
      knowledge: ["4!=4·3! ve payın ikinci 3! terimi 1 katkı verir."],
      strategy: "Payı 3!(4+1) biçiminde yaz.",
      steps: [
        "(4·3!+3!)/3!=3!(4+1)/3!.",
        "Ortak pozitif 3! bölünür.",
        "Sonuç 5.",
      ],
      optionReasons: [
        "4+1 katkısını korur.",
        "Toplamın ikinci terimini düşürür.",
        "4 ve 3 iç değerlerini toplar; verilen oranla eşleşmez.",
        "4!+3! toplamıdır; 3!’a bölünmemiş.",
        "7!’ın değeridir; toplam faktöriyeller birleştirilemez.",
      ],
      check: "(24+6)/6=30/6=5.",
      commonError:
        "Bir önceki yanlış işlemi yeni sayılarla tekrar etme; ilk bozuk gerekçeyi düzelt.",
    },
    {
      code: "Q43",
      prompt:
        "Üç farklı ürünün tamamı üç numaralı standa birer kez konacak. Başka kısıt yok. Kaç farklı yerleşim vardır?",
      options: ["6", "3", "9", "1", "27"],
      knowledge: [
        "Farklı nesneler, ayrı doğrusal yerler, tam kullanım ve kısıtsızlık 3! koşullarını sağlar.",
      ],
      strategy: "Her standın kalan seçeneklerini sırayla say.",
      steps: [
        "İlk standa 3 seçenek.",
        "İkinciye 2, üçüncüye 1 seçenek.",
        "3·2·1=6 yerleşim.",
      ],
      optionReasons: [
        "Azalan seçeneklerin çarpımıdır.",
        "Yalnız ilk standı seçer.",
        "3·3 tekrar kullanım varmış gibi iki aşamayı sayar.",
        "Ürünlerin yer değiştirmesini yok sayar; ürünler farklıdır.",
        "3³ her ürünün tekrar kullanılmasına izin verir; bu soruda her biri bir kez.",
      ],
      check: "Ürünler A,B,C ise ABC,ACB,BAC,BCA,CAB,CBA listesi vardır.",
      commonError:
        "Görünüşü kitap veya koşucudan farklı olsa da aynı koşullar aynı sayma yapısını verir.",
    },
  ],
  sheet: [
    {
      title: "Tanım, başlangıç ve tek–çift",
      text: [
        "n!=1·2·…·n (n≥1 tam sayı); 0!=1!=1. Ünlem içi negatif olmayan tam sayı olmalı. 0,1,2,3,4,5,6,7 için faktöriyeller 1,1,2,6,24,120,720,5.040. n!=n(n−1)! yalnız n≥1. Bütün n! değerleri pozitif; n≥2 için çift, 0! ve 1! tek.",
      ],
    },
    {
      title: "Oran ve işlem kapsamı",
      text: [
        "n≥m≥0 için n!/m!=(m+1)…n; n=m ise 1. Ters oranda ters çarpım: 6!/8!=1/56. 3·4·5·6=6!/2!; ilk çarpanın bir eksiği paydaya gelir. (n+2)!/n!=(n+2)(n+1); n!/m! genel olarak (n−m)! değildir.",
        "(n+2)!, n!+2 değildir; (3!)²=36, (3²)!=362.880. Parantez ve işlem kapsamını koru.",
      ],
    },
    {
      title: "Toplam ve fark",
      text: [
        "(n+1)!+n!=(n+2)n!, (n+1)!−n!=n·n! (n≥0). Ortak faktöriyeli dağıtma kuralıyla ayır; tek terim çizilmez. (5!+4!)/4!=6, (6!+5!)/5!=7; (7!+6!)/(6!−5!)=48/5. 4!+3!=30, 7!=5.040.",
      ],
    },
    {
      title: "Sayı koşulu ve denklemler",
      text: [
        "Her iç değer negatif olmayan tam sayı olmalı; koşulları kesiştir. (x−3)! ve (7−x)! için x=3,4,5,6,7. 0!=1! istisnası: n!=1 için n=0,1; n pozitifse yalnız 1. (x−4)!=1 için x=4,5.",
        "(x−2)!=(5−x)! için dört aday 2,3,4,5 de elenir. (n+2)!/n!=42 için n=5; oran20 olursa n=3. [(n+2)!−(n+1)!]/(n+1)!=8 için n=7. Sonucu ilk ifadeye geri koy.",
      ],
    },
    {
      title: "Asal kuvvet bütçesi",
      table: compositePowerTable,
      text: [
        "p asal: vₚ(n!)=⌊n/p⌋+⌊n/p²⌋+…; sıfır terimde dur. 10!’ta v₂=8, v₃=4, v₅=2; 15!’ta v₃=6, 20!’ta v₃=8. Bileşik böleni önce asallara ayır.",
        "12=2²·3 için 10!/12ᵏ tam sayılık koşulları 2k≤8, k≤4; en büyük k=4. 8!/6ᵏ için k=2; 6!/4ᵏ için k=2. Her bölen için bütün asal gereksinimleri birlikte gerekir.",
      ],
    },
    {
      title: "Sondaki sıfırlar",
      text: [
        "Genel pozitif tam N için min(v₂(N),v₅(N)). Doğrudan n! için 5 sayacı yeterli: 20!→4, 25!→6, 30!→7, 50!→12. 1002’nin iç sıfırları son sıfır değildir.",
        "Bölüm ve toplamda bütçeyi yeniden kur. 10!/2⁷→1, 10!/2⁸→0, 25!/2²²→0 son sıfır. 9!+10!=11·9!→1 son sıfır; büyük terimin sıfırını otomatik taşıma.",
      ],
    },
    {
      title: "Doğrusal sıralama ve katmanlı adet",
      text: [
        "Farklı bütün n nesne, n ayrı doğrusal yer, birer kullanım, kısıt yok: n!. A,B,C için6, dört farklı nesne için24. Dört kişide ilki zorunlu sabit→6; ilki yasak→18. A,A,B ayırt edilmezse3 görünüm. Çembersel dönme ve başka kısıtlar ayrı konudur.",
        "Katman adetlerini birimlerle çarp. 4·5·3·2=5!=120. 11·12·13·2·7=11·12·13·14=14!/10!=24.024. Her adede ayrı ünlem ekleme. Kaynağın resmî soru atfı ile kendi sayısal öğretim uyarlaması ayrı tutulur.",
      ],
    },
    {
      title: "İlk hamle, onarım ve prova",
      text: [
        "Oran→ortak küçük faktöriyel; toplam/fark→ortak çarpan; denklem→tanım kümesi; kuvvet/sıfır→asal bütçe; sıralama→yer başına kalan seçenek. Oranı çarparak, çarpanlamayı dağıtarak, adayı ilk eşitliğe koyarak denetle.",
        "Örnek ilk hatalar: toplamda +1’i kaybetmek; 0!’ı dışlamak; 25’in ikinci 5’ini unutmak; 6’yı asal sanmak. Onarımlar: (4!+3!)/3!=5; (y−5)!=1→y=5,6; 50!→12 son sıfır; 6!/4ᵏ için en büyük k=2. Sonuç, yöntem, koşul ve kontrol ayrı değerlendirilir; süre veya metni açmak ustalık değildir.",
      ],
    },
  ],
  source:
    "Aurelia TYT Faktöriyel Kavramı kopya kağıdı, 19.11.2026 / içerik 1.1: Fiziksel 3 ve 10. sayfalardaki asal çarpan tablosu ve karar yolu güncellendi. Önceki öğretim uyarlaması, aşağıdaki ayrı kaynak denetimini korur. Kaynağın atıfları MEB Matematik 10 Ünite 1 basılı 20–21 / çevrimiçi 8–9; baskı yılı ve 2027 resmî kapsamı bu adayda bağımsız doğrulanmadı. 2021 TYT Temel Matematik 5, incelenen gerçek kitapçık PDF 27 / anahtar PDF 45: C=14!/10!. Bu seçili soru ve anahtar doğrulamasıdır; güncel düzeltme duyurularının yokluğu veya bütün kitapçığın incelendiği iddia edilmez. Kaynak: https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=27 ; anahtar: https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=45 . Pratikler ve sayısal model kendi öğretim uyarlamalarıdır; resmî soru veya resmî kurum çözümü değildir. Atıf yapılan bütün kitaplar, videolar ve yirmi yıllık sınav arşivi bu üniteyle tamamlanmış sayılmaz.",
};
const pack = factorialSource033Pack;
const objectives = [
  "Faktöriyel tanımını, sayı kümesini ve 0!/1! istisnasını koru.",
  "Oran, toplam ve denklemde ortak çarpanla gerekçeli işlem yap.",
  "Asal bütçesi, son sıfır ve sıralama problemlerini koşullarıyla çöz.",
];
export const factorialSource033Guides: LessonGuide[] = [
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
export const factorialSource033Lessons: Lesson[] = [
  {
    id: pack.id,
    title: txt(pack.title),
    subjectId: "tyt-matematik",
    minutes: pack.minutes,
    objectives: objectives.map(txt),
    source: txt(pack.source),
    tags: ["kaynakli-anlatim", "Öğretim uyarlaması sorular"],
    body: pack.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: pack.items.map((item, index): Question => {
      const order = item.options.map((_, i) => (i + ((2 * index + 1) % 5)) % 5);
      return {
        id: `f033-${pack.id}-${index + 1}`,
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
export const factorialSource033Sheets: CheatSheet[] = [
  {
    topicId: `topic-${pack.id}`,
    lessonId: pack.id,
    title: pack.title,
    subjectId: "tyt-matematik",
    sections: pack.sheet,
    cautions: [
      "Ünlem içleri negatif olmayan tam sayı olmalı; 0!=1! istisnası korunur.",
      "Toplamdan tek terim çizilmez; yalnız bütün ortak çarpan bölünür.",
      "Bileşik kuvvette bütün asal ihtiyaçları, son sıfırda kalan 2–5 bütçesi denetlenir.",
    ],
    examples: [pack.examples[1], pack.examples[6]].map((e) => ({
      title: e.title,
      prompt: e.prompt,
      steps: e.steps.map((s) => s.explanation),
      answer: e.answer,
    })),
    recall: pack.recall.slice(0, 3),
    source: pack.source,
  },
];
