export interface ExamTeachingCase {
  prompt: string;
  steps: string[];
  answer: string;
  pitfall: string;
}
// Original teaching variants. The source references are verified separately;
// these bodies are not advertised as verbatim official examination questions.
export const examTeachingCases: Record<string, ExamTeachingCase> = {
  "2021-TYT-MAT-1": {
    prompt:
      "Boş bir kap 280 g, suyla tamamen doluyken 400 g geliyor. Aynı kap kısmen suyla doluyken 355 g geldiğine göre kapasitesinin kaçta kaçı suyla doludur? Kap her ölçümde aynıdır; suyun yoğunluğu değişmiyor.",
    steps: [
      "Tam dolu suyun kütlesi 400−280=120 g'dır. Kap kütlesi su miktarına dahil edilmez.",
      "Kısmi suyun kütlesi 355−280=75 g. Dolulukta karşılaştırılan aynı maddeden iki su miktarıdır.",
      "75/120=5/8. Kontrol: 120×5/8=75 ve 75+280=355 g.",
    ],
    answer: "Kabın 5/8'i doludur.",
    pitfall: "355/400 oranı, her iki ölçümdeki kap kütlesini de su gibi sayar.",
  },
  "2021-TYT-FEN-8": {
    prompt:
      "Bir bileşiğin bir molekülünde bir azot ve üç hidrojen atomu vardır. Formülünü, atom sayısı oranını ve yaygın adını yaz. Azotun sembolü N, hidrojeninki H'dir.",
    steps: [
      "Bir azot için N yazılır; bir sayısı alt indis olarak gösterilmez.",
      "Üç hidrojen H₃ ile gösterilir. Formül NH₃, N:H atom sayısı oranı 1:3'tür.",
      "NH₃'ün yaygın adı amonyaktır. Alt indis atom adedini belirtir; molekülün iyon yükü değildir.",
    ],
    answer: "NH₃; 1:3; amonyak.",
    pitfall:
      "3NH, üç ayrı NH birimi anlamına gelir; NH₃ ile aynı yapı değildir.",
  },
  "2021-TYT-FEN-9": {
    prompt:
      "Nötr temel hâl atomlarının katman dağılımları He: (2); N: (2, 5); Mg: (2, 8, 2) olarak verilmiştir. En dış dolu katmandaki elektron sayılarını karşılaştır.",
    steps: [
      "He'nin tek katmanında 2 elektron vardır. 18. grupta olması bu katmanda 8 elektron bulunduğu anlamına gelmez.",
      "N'nin dış katmanında 5, Mg'ninkinde 2 elektron vardır.",
      "5>2=2 olduğundan N>Mg=He. Karşılaştırılan toplam elektron sayısı değil, dış katmandaki sayıdır.",
    ],
    answer: "N>Mg=He.",
    pitfall: "Helyumun dolu ilk katmanını sekiz elektronlu sayma.",
  },
  "2018-TYT-FEN-1": {
    prompt:
      "Bir araştırmacı bitkilerin büyümesini incelerken boyları ölçüyor, ışık miktarını kontrollü değiştiriyor ve bulgularından bir açıklama kuruyor. Bu çalışmada gözlem, deney ve akıl yürütmenin işlevlerini ayrı açıkla.",
    steps: [
      "Boy ölçümleri gözlemsel veri sağlar; veri toplama tek başına nedenin kesin kanıtı değildir.",
      "Işığın kontrollü değiştirilmesi bir değişkenin etkisini sınayan deney düzenidir. Diğer koşulların karşılaştırılabilir olması gerekir.",
      "Verileri ilişkilendirip açıklama kurmak akıl yürütmedir. Bilim bu yolları bir arada kullanabilir; her araştırmanın tek ve değişmez bir sıraya uyması gerekmez.",
    ],
    answer:
      "Ölçüm veri sağlar, deney koşulu sınar, akıl yürütme gerekçeli ilişki kurar.",
    pitfall:
      "Bir yöntemin kullanılabilmesini, her araştırmada zorunlu ve aynı sırada kullanılmasıyla karıştırma.",
  },
  "2018-TYT-FEN-12": {
    prompt:
      "Bir yazı mürekkebi renk veren madde, uçucu sıvı ve bağlayıcı içeriyor. Bu üç bileşeni renk, kuruma ve yüzeye tutunma işlevleriyle eşleştir; uçucu sıvının buharlaşmasıyla rengin neden bütünüyle kaybolması gerekmediğini açıkla.",
    steps: [
      "Boya veya pigment renk verir; bu görev çözücünün uçuculuğuyla aynı özellik değildir.",
      "Uygun uçucu sıvı ortamı sağlar ve buharlaşması kurumaya katkı yapar. Renk maddesinin onunla birlikte tamamen buharlaşması gerekmez.",
      "Bağlayıcı renk maddesinin yüzeye tutunmasına yardımcı olur. Ürün, bileşenlerin farklı görevlerinin birlikte çalışmasıyla işlev kazanır.",
    ],
    answer: "Renk: boya/pigment; kuruma: uçucu sıvı; tutunma: bağlayıcı.",
    pitfall:
      "Bütün bileşenlerin aynı fiziksel özelliğe veya tek göreve sahip olduğunu varsayma.",
  },
  "2026-ALES2-SAY-4": {
    prompt:
      "(2,5÷0,25)−(0,02÷0,2) işlemini yap. Virgülü kaldırırken bölünenle böleni neden aynı katsayıyla çarpmak gerektiğini açıkla.",
    steps: [
      "2,5/0,25=(2,5×100)/(0,25×100)=250/25=10.",
      "0,02/0,2=(0,02×10)/(0,2×10)=0,2/2=0,1.",
      "10−0,1=9,9. Bir kesrin payını ve paydasını aynı sıfırdan farklı sayıyla çarpmak oranı korur.",
    ],
    answer: "9,9.",
    pitfall: "Yalnız bölenin virgülünü kaldırmak oranı değiştirir.",
  },
  "2026-DGS-SAY-1": {
    prompt:
      "(1/2+5)÷(1/2+3/5) ifadesinin değerini bul. Parantezler üst ve alt grupları ayrı toplar; işlem tek tek terimlere dağıtılan bir bölme değildir.",
    steps: [
      "İlk parantez 1/2+10/2=11/2.",
      "İkinci parantez 5/10+6/10=11/10.",
      "(11/2)÷(11/10)=(11/2)×(10/11)=5. Kontrol: 5×11/10=11/2.",
    ],
    answer: "5.",
    pitfall:
      "Bölme yaparken ikinci kesrin tamamını ters çevir; toplamın yalnız bir terimini ters çevirme.",
  },
  "2026-KPSS-GY-33": {
    prompt:
      "(√96×⁴√4)/(√75−√27) ifadesini sadeleştir. Köklü sayılar gerçek sayılarda esas pozitif kökleri gösteriyor; paydanın sıfır olmadığını da denetle.",
    steps: [
      "√96=4√6 ve ⁴√4=√2. Pay 4√6×√2=4√12=8√3.",
      "Payda 5√3−3√3=2√3; sıfır değildir.",
      "8√3/(2√3)=4. Ortak çarpan √3 sıfırdan farklı olduğu için sadeleşir.",
    ],
    answer: "4.",
    pitfall:
      "Dördüncü kökü karekökle karıştırma; toplam veya farkın içinden keyfî terim sadeleştirme.",
  },
  "2021-TYT-MAT-5": {
    prompt:
      "Bir sayma modelinde 11 bölgenin her birinde 12 birim, her birimde 13 merkez, her merkezde 2 kat ve her katta 7 salon vardır. Katmanlardaki bu adetler dışında ek kısıt yoktur. Toplam salon sayısını ardışık çarpım ve bir faktöriyel oranıyla yaz; neden her adede ayrı ünlem koymadığını açıkla.",
    steps: [
      "Adetler 11·12·13·2·7 ile çarpılır. Bölge, birim, merkez ve kat başına sayımlar sırayla birleşince sonuç salon adedidir; bu bir nesne sıralama sorusu değildir.",
      "2·7=14. Çarpım 11·12·13·14 olur. 14!=14·13·12·11·10! olduğu için ortak 10!’a bölünür ve 14!/10! kalır.",
      "11·12=132, 13·14=182 ve 132·182=24.024 salon. 13!/10! bir 14 çarpanını kaybeder; 14!/9! fazladan 10 taşır. Sonuç bir seçenek harfiyle değil bu matematiksel değerle değerlendirilir.",
    ],
    answer: "14!/10! = 24.024 salon.",
    pitfall:
      "Katman adetlerini ayrı faktöriyellere çevirme. Zincirin ilk çarpanı 11 olduğundan paydaya 10! gelir; kaynak sorunun C anahtarı bu özgün öğretim örneğinin seçenek harfi değildir.",
  },
  "2021-TYT-MAT-15": {
    prompt:
      "Bir sayı atölyesinde A, 200 ile 250 arasında (sınırlar dahil) olup hem 9’a hem 5’e tam bölünen bir doğal sayıdır. B, 240 ile 270 arasında (sınırlar dahil) olup hem 9’a hem 12’ye tam bölünen bir doğal sayıdır. A ve B’yi ortak katlarla bulup toplamlarını hesapla. Burada A ve B birer sayıdır; rakam olarak kullanılmıyor.",
    steps: [
      "A için iki koşulu EKOK(9,5)=45 birleştirir. 45’in verilen aralıktaki tek katı 45×5=225’tir; A=225.",
      "B için EKOK(9,12)=36 gerekir. 9×12=108 ortak kattır, fakat en küçük ortak kat değildir. 36’nın verilen aralıktaki tek katı 36×7=252’dir; B=252.",
      "225+252=477. Denetim: 225/9=25, 225/5=45, 252/9=28 ve 252/12=21; sayılar belirtilen aralıklardadır. Bu özgün örneğin sonucu 477’dir; resmî kaydın A harfi/rakam toplamı 7 ile puanlanmaz.",
    ],
    answer: "A=225, B=252; toplam 477.",
    pitfall:
      "Birden fazla sayıya tam bölünme koşulunu sayıların çarpımıyla değil en küçük ortak katlarıyla birleştir. Bir sembolün rakam mı, sayı mı olduğunu bulunduğu sorunun tanımı belirler.",
  },
};
