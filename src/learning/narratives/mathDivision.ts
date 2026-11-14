import { node as n, type NarrativePack } from "./types";
export const divisionNarratives: NarrativePack[] = [
  {
    id: "bolme-bolunebilme",
    topicId: "detail-200",
    subjectId: "tyt-matematik",
    title: "Bölme ve bölünebilme: gruplar, kalanlar ve koşullar",
    minutes: 35,
    source:
      "OGM 9. Sınıf Matematik Kalanlı Bölme – Bölünebilme Kuralları I ve Bölünebilme Kuralları II konu özetleri, her biri PDF s.1, görsel olarak okundu; Aurelia Bölme Bölünebilme Kuralları kopya kağıdı, PDF s.1–4.",
    objectives: [
      "Bölme eşitliğini kalan aralığıyla birlikte kullan.",
      "Basamak kurallarını nedenleriyle uygula.",
      "Birden fazla bölünebilme şartında ortak çarpanları iki kez sayma.",
    ],
    body: [
      {
        title: "Eşitlik tek başına bölme işlemi değildir",
        text: "A bölünen, b>0 tam sayı bölen, q tam bölüm, r kalan olmak üzere A=bq+r ve 0≤r<b birlikte gerekir. 29=6×4+5 geçerli bir bölmedir. 29=6×3+11 doğru eşitlik olsa da kalan bölenin altında olmadığından bitmiş bölme değildir. Tam bölünme r=0 demektir; 0 her pozitif tam sayıya bölünür, fakat sıfıra bölme tanımsızdır. Bu anlatımdaki negatif tam sayılarda da kalan negatif seçilmez: −13=5×(−3)+2. Ondalık bölüm ile tam bölüm aynı bilgi değildir: 29/6=4+5/6.",
      },
      {
        title: "Son basamak kuralları onluk yapıdan gelir",
        text: "Bir sayı 100a+10b+c biçiminde açılabilir. 2 ve 5 için 10’un katları tam bölündüğünden son rakam yeterlidir; 2’de çift rakam, 5’te 0 veya 5 aranır. 4 için 100 tam bölündüğünden son iki basamak, 8 için 1000 tam bölündüğünden son üç basamak yeterlidir. 10 için son rakam 0’dır. Son blok 00 veya 000 ise değeri 0 alınır; sayının tamamının başına sıfır yazılarak basamak sayısı artırılmaz. Bu kurallar bütün sayıyı yeniden uzun bölmek yerine gereksiz katları ayıklamanın yoludur.",
      },
      {
        title: "Rakam toplamı ve dönüşümlü toplam",
        text: "3 ve 9 için 10’un her kuvveti 1 kalanını taşıdığından rakam toplamı aynı kalanı verir. 3’e bölünen her sayı 9’a bölünmez: 12 karşı örnektir. 11 için sağdan başlayarak +,−,+,− işaretleriyle rakamları topla; sonuç 11’in katıysa sayı tam bölünür. Farkın yalnız sıfır olması gerekmez. 2728 için 8−2+7−2=11 olduğundan tam bölünür. Kalan isteniyorsa dönüşümlü toplamın işaretini koru ve 0–10 aralığına indir; negatif sonucu son kalan diye bırakma.",
      },
      {
        title: "Ayrı şartlar çarpılır mı?",
        text: "Bir sayı aralarında asal a ve b’ye tam bölünüyorsa ab’ye de bölünür. 3 ve 4 koşulları 12’yi verir; 2 ve 4 koşulları ise 8’i garanti etmez: 12 her ikisine bölünür ama 8’e bölünmez. Genel ortak şart en küçük ortak katla ifade edilir. 6 için 2 ve 3; 12 için 3 ve 4; 18 için 2 ve 9; 24 için 3 ve 8 birlikte sınanabilir. Ortak asal çarpanı iki kere sayma. 25’e bölünebilmede son iki basamağın 00, 25, 50 veya 75 olması gerekir.",
      },
      {
        title: "Kalanlarla işlem yap, yeniden küçült",
        text: "Aynı b böleninde sayıların toplamı ve çarpımı için küçük kalanlarla çalışılabilir. a’nın 7’ye kalanı 5, c’nin 7’ye kalanı 6 ise toplamın kalanı 11 değil 4, çarpımın kalanı 30 değil 2 olur. Çıkarmada 5−6=−1, aynı kalan sınıfında 6 olarak yazılır. Üslerde kalan döngüsü aranabilir; her soruda otomatik 4’lü döngü varsayma. Kalan eşitliklerini normal kesirler gibi her sayı ile sadeleştirme: 2a’nın 6’ya kalanı 2 ise a yalnız 1 kalanını taşımak zorunda değildir; a=4 de koşulu sağlar.",
      },
      {
        title: "Rakam ve kalan sorularında iki filtre kullan",
        text: "Önce ilk rakamın sıfır olmaması ve diğer rakamların 0–9 aralığı gibi sayı koşullarını yaz; sonra bölünebilme filtrelerini uygula. ‘Farklı rakamlar’ açıkça verilmedikçe farklı harflerin mutlaka farklı rakam olduğunu varsayma. Özgün örnekte 4a2 sayısı 3’e bölünüyorsa 6+a, 3’ün katı olmalı; a=0,3,6,9 mümkündür. Ayrıca 4’e bölünmesi istenirse son iki basamak a2 için 12,32,52,72,92 seçenekleri arasından ilk koşulla ortak olanlar seçilir: a=3 veya 9. Sonucu gerçek sayıyı bölerek kontrol et.",
      },
    ],
    pitfalls: [
      {
        label: "Kalan bölen kadar olamaz",
        reason:
          "r=b ise bir tam grup daha çıkarılır. Her zaman 0≤r<b kontrolü yapılır.",
      },
      {
        label: "İki şartın çarpımı her zaman geçerli değildir",
        reason:
          "Ortak çarpanlar varsa çarpım fazla kuvvet ister. 2 ve 4’e bölünen 12, 8’e bölünmez.",
      },
      {
        label: "Kalan toplamını son kalan sanma",
        reason:
          "Toplam veya çarpım böleni aşarsa yeniden bölünür; son kalan aralık içine indirilir.",
      },
    ],
    cases: [
      {
        name: "Grupları tamamla",
        question: "29 nesneyi altılı gruplara ayırınca neden kalan 11 olamaz?",
        conclusion:
          "11 artan içinde bir altılı grup daha vardır. Tam gruplar 4, kalan 5 olur; 29=6×4+5 ve 5<6 birlikte sağlanır.",
        nodes: [
          n("29 nesne", "Bölünen toplam.", "number", "29"),
          n("6’lı gruplar", "Pozitif bölen.", "number", "6"),
          n("4 tam grup", "24 nesne kullanılır.", "chart"),
          n("5 artan", "Bölenin altında kaldı.", "number", "5"),
        ],
      },
      {
        name: "Yetersiz çarpan",
        question: "12 hem 2’ye hem 4’e bölündüğü hâlde neden 8’e bölünmez?",
        conclusion:
          "2 şartı zaten 4 şartının içinde bulunur; iki bağımsız asal çarpan gereği oluşturmaz. Ortak kat şartı 4’tür, 2×4 değildir.",
        nodes: [
          n("2’ye bölünür", "12=2×6.", "number"),
          n("4’e bölünür", "12=4×3.", "number"),
          n("8’e bölünmez", "12=8×1+4.", "number"),
          n("Ortak çarpan", "Aralarında asal koşulu eksik.", "document"),
        ],
      },
      {
        name: "Kalanı indir",
        question:
          "Kalanlar 5 ve 6 iken çarpımın 7’ye kalanı neden 30 değildir?",
        conclusion:
          "Kalanların çarpımı aynı kalan sınıfına götürür ama son aralık kontrolü gerekir. 30=7×4+2; son kalan 2’dir.",
        nodes: [
          n("Küçük kalanlar", "5 ve 6.", "number"),
          n("Çarpım 30", "Ara sonuç.", "number", "30"),
          n("Dört grup çıkar", "7×4=28.", "chart"),
          n("Son kalan 2", "0≤2<7.", "number", "2"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Neden 17=5×2+7 bir eşitlik olsa da geçerli bitmiş bölme değildir?",
        answer:
          "Kalan 7, bölen 5’ten küçülmemiştir. Bir grup daha çıkarılır: 17=5×3+2. Son kalan 2’dir.",
      },
      {
        prompt: "Bir sayı 4’e ve 6’ya bölünüyorsa 24’e bölünmek zorunda mı?",
        answer:
          "Hayır. Ortak gereken kat 12’dir; 12 hem 4’e hem 6’ya bölünür ama 24’e bölünmez. Ortak çarpanlar iki kez sayılmamalıdır.",
      },
    ],
    modelLimit:
      "Gruplama modeli doğal bölünen ve pozitif tam sayı bölen kullanır. Nokta sayısı gerçek nesne adedidir; ileri modüler bölme kuralları otomatik uygulanmaz.",
  },
  {
    id: "ebob-ekok",
    topicId: "detail-201",
    subjectId: "tyt-matematik",
    title: "EBOB ve EKOK: ortak parça mı, ortak tekrar mı?",
    minutes: 35,
    source:
      "OGM 9. Sınıf Matematik EBOB–EKOK konu özeti, PDF s.1, görsel olarak okundu; Aurelia TYT Matematik Ebob Ekok kopya kağıdı, PDF s.1–3.",
    objectives: [
      "Bölen ile kat sorularını ayır.",
      "Asal üsler ve Öklid yöntemiyle sonucu gerekçelendir.",
      "Parça, periyot ve kalan koşullarında modele uygun denklem kur.",
    ],
    body: [
      {
        title: "İki sorunun yönü farklıdır",
        text: "Pozitif tam sayılar için EBOB ortak bölenlerin en büyüğü, EKOK ortak pozitif katların en küçüğüdür. 18 ve 24’ün ortak bölenleri 1,2,3,6; en büyüğü 6’dır. 12 ve 18’in ortak pozitif katları 36,72,108…; en küçüğü 36’dır. Ortak parça verilenlerin içine tam sığar; ortak tekrar ise verilenlerin tam katına ulaşır. Küçük sayıyı görünce otomatik EBOB, büyük sayıyı görünce EKOK seçme; problemin neyin bölüneceğini söylediğini belirle. Bu anlatım başlangıç sayılarını pozitif tam sayılarla sınırlar.",
      },
      {
        title: "Küçük ve büyük üslerin gerekçesi",
        text: "72=2³×3² ve 120=2³×3×5 olsun. Ortak bölen her iki sayıdan da alınabilecek asal kuvvetleri içerir: küçük üslerle EBOB=2³×3=24. Ortak kat iki sayının gerektirdiği bütün asal kuvvetleri karşılamalıdır: büyük üslerle EKOK=2³×3²×5=360. Bir sayıda bulunmayan asalın üssü sıfırdır. Kontrol için 72/24 ve 120/24 tam sayı; 360/72 ve 360/120 tam sayı olmalıdır. Sonuç tanımı sağlamıyorsa kısa yol hesabına geri dön.",
      },
      {
        title: "İki sayı için çarpım bağı",
        text: "a ve b pozitif tam sayı ise a×b=EBOB(a,b)×EKOK(a,b). Her asal için küçük ve büyük üslerin toplamı başlangıç üslerinin toplamına eşittir. Dolayısıyla EKOK=(a/EBOB)×b hesaplanabilir. Üç sayı için aynı çarpım bağı doğrudan geçerli değildir: 2×4×8=64 ama EBOB(2,4,8)×EKOK(2,4,8)=2×8=16. Aralarında asal sayılarda EBOB=1, EKOK=a×b; iki sayının da asal olması gerekmez, 8 ve 9 örnektir. Biri diğerini bölüyorsa EBOB küçük, EKOK büyük sayıdır.",
      },
      {
        title: "Eş parça ile ortak buluşmayı ayır",
        text: "24 cm ve 36 cm uzunluklar artıksız eş parçalara ayrılacaksa parça boyu ikisini de bölmelidir. En büyük parça 12 cm, toplam parça sayısı 24/12+36/12=5’tir. İki döngü aynı anda başlayıp 12 ve 18 dakikada tekrarlanıyorsa sonraki ortak tekrar 36 dakika sonradır. Başlangıç anı ile ilk sonraki buluşmayı ayır. Başlangıçları farklıysa yalnız EKOK yazmak yeterli değildir; faz farkı için koşul kurulur. Dikdörtgeni karelerle kaplamada kenar uzunluğu, kare sayısı ve birimlerin ne olduğu ayrı yazılmalıdır.",
      },
      {
        title: "Kalanlı koşulda farkı ortak kata dönüştür",
        text: "N sayısı hem a hem b’ye bölündüğünde aynı r kalanını veriyorsa N−r, iki bölenin ortak katıdır: N=EKOK(a,b)×k+r. Ayrıca 0≤r<a ve r<b gerekir. N’nin istenen aralığı ve bölümün sıfır olup olamayacağı denetlenir. ‘En küçük doğal sayı’ sorusunda k=0 mümkünse N=r de geçerli olabilir; soruda verilmemiş N>b koşulunu kendiliğinden ekleme. Farklı kalanlar verilirse her bir eşitlik ayrı kurulur. EBOB d ile a=dx,b=dy yazıldığında x ve y’nin aralarında asal olması gerekir; yalnız çarpımları koşulu tamamlamaz.",
      },
      {
        title: "Öklid yöntemi büyük hesabı küçültür",
        text: "a=bq+r ise EBOB(a,b)=EBOB(b,r). Çünkü a ve b’nin ortak böleni r=a−bq’yu da böler; b ve r’nin ortak böleni de a=bq+r’yi böler. Özgün örnekte 84=30×2+24, 30=24×1+6, 24=6×4+0; son sıfır olmayan kalan 6’dır. EKOK=(84/6)×30=420. Aracın ortak parça görünümünde 6’lık parçaları, tekrar görünümünde 420’deki ilk ortak pozitif anı inceleyebilirsin. Algoritmanın bitişindeki sıfır kalan, başlangıç sayılarını sıfır seçmekle aynı durum değildir.",
      },
    ],
    pitfalls: [
      {
        label: "Aralarında asal olmak ikisinin de asal olması değildir",
        reason: "8 ve 9 bileşiktir ama ortak pozitif bölenleri yalnız 1’dir.",
      },
      {
        label: "Çarpım eşitliğini üç sayıya kopyalama",
        reason:
          "İki sayıya ait EBOB×EKOK bağı üç veya daha fazla sayının çarpımına genellenemez.",
      },
      {
        label: "Başlangıç anını sonraki buluşma sanma",
        reason:
          "t=0 ortak başlangıç olabilir; ilk pozitif ortak tekrar EKOK’tur. Farklı başlangıçlarda faz ayrıca hesaplanır.",
      },
    ],
    cases: [
      {
        name: "Parçaları kes",
        question:
          "24 ve 36 cm şeritlerin en büyük eş parçası neden 72 cm olamaz?",
        conclusion:
          "Parça her şeridin içine tam sığmalıdır. 12 cm ikisini böler; 72 ikisinin ortak katı olsa da şeritlerin içine sığan parça değildir.",
        nodes: [
          n("24 cm", "Birinci şerit.", "number", "24"),
          n("36 cm", "İkinci şerit.", "number", "36"),
          n("Ortak bölen 12", "İkisine de artıksız sığar.", "chart"),
          n("2 + 3 parça", "Toplam beş parça.", "number", "5"),
        ],
      },
      {
        name: "Aynı ana dön",
        question:
          "12 ve 18 dakikalık döngüler birlikte başladıysa sonraki ortak an nedir?",
        conclusion:
          "Pozitif ortak katların en küçüğü 36’dır. Bu an birinci döngünün üçüncü, ikinci döngünün ikinci tekrarıdır; t=0 başlangıçtır.",
        nodes: [
          n("Birinci döngü", "12,24,36…", "number"),
          n("İkinci döngü", "18,36,54…", "number"),
          n("İlk ortak pozitif an", "36 dakika.", "number", "36"),
          n("Sonraki ortaklar", "72,108… aynı faz kabulüyle.", "chart"),
        ],
      },
      {
        name: "Öklid adımları",
        question: "84 ve 30’un ortak bölenini neden kalanlarla arayabiliriz?",
        conclusion:
          "Ortak bölenler çıkarma işleminde korunur. 84,30 → 30,24 → 24,6 → 6,0; son sıfır olmayan kalan 6’dır.",
        nodes: [
          n("84 = 30×2+24", "Yeni çift 30 ve 24.", "document"),
          n("30 = 24×1+6", "Yeni çift 24 ve 6.", "document"),
          n("24 = 6×4+0", "Bölme sona erdi.", "document"),
          n("EBOB = 6", "EKOK=84×30/6=420.", "number", "6"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "18 ve 24 cm ipleri artıksız en büyük eş parçalara ayırırsan parça boyu ve toplam adedi nedir?",
        answer:
          "EBOB=6 cm. 18/6=3 ve 24/6=4 olduğundan toplam 7 parça olur. EBOB uzunluk, toplam ise parça adedidir.",
      },
      {
        prompt:
          "N, 4 ve 6 ile bölününce 1 kalanını veriyor. N=12k+1 yazınca neyi ayrıca kontrol edersin?",
        answer:
          "Kalan sınırı 1<4 ve 1<6 sağlanır. N’nin doğal/pozitif olması, istenen aralık ve k=0’ın izinli olup olmadığı ayrıca kontrol edilir; otomatik olarak ilk aday 13 denmez.",
      },
    ],
    modelLimit:
      "Ortak tekrar modeli aynı anda başlayan tam sayılı periyotları kullanır; farklı faz veya rastgele gecikme içermez. Şeritler yalnız uzunlukları karşılaştırır; gerçek kesme kaybı yoktur.",
  },
];
