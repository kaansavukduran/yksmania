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
  "2024-TYT-MAT-3": {
    "prompt": "Özgün örnek: ilk katmanda 1 parça var ve her yeni katmanda bir öncekinin iki katı kadar yeni parça ekleniyor. İlk 7 katmandaki toplam ile ilk 5 katmandaki toplamın farkı kaçtır? Kural her adımda aynen sürer.",
    "steps": [
      "İlk beş katmanın ortak parçaları farkta silinir. Yalnız 6. ve 7. katmanları say.",
      "6. katmanda 2⁵=32, 7. katmanda 2⁶=64 yeni parça bulunur.",
      "Fark 32+64=96’dır. Bu veriler özgün öğretim örneğidir; resmî sorunun 12. ve 10. adımlarıyla aynı örnek değildir."
    ],
    "answer": "96 parça.",
    "pitfall": "Katlanmayı sabit artış sanma; adım toplamı ile yalnız o katmandaki yeni parça sayısını karıştırma."
  },
  "2024-TYT-MAT-17": {
    prompt: "Özgün örnek. Bir kişi 20 gün egzersiz yapıyor. 2. günden 10. güne kadar her gün bir öncekinden 1 dakika daha uzun çalışıyor. 11. günden başlayarak her gün 1 dakika daha kısa çalışıyor. 20 günlük toplam 640 dakikaysa ilk gün kaç dakika çalıştı?",
    steps: [
      "İlk gün x dakika. 10. gün x+9 ve 11. gün x+8 sürer. 20. gün x−1 dakikadır.",
      "İlk 10 günün toplamı 10x+45, son 10 günün toplamı 10x+35. 20x+80=640 ve x=28.",
      "İlk dizinin uçları 28 ve 37, toplamı 325. İkinci dizinin uçları 36 ve 27, toplamı 315. Birlikte 640 dakika eder.",
    ],
    answer: "28 dakika.",
    pitfall: "11. güne 10. günün süresini kopyalarsan en uzun günü iki kez saymış olursun.",
  },
  "2024-TYT-MAT-8": {
    "prompt": "Özgün örnek: maliyetleri 12.000 TL, 18.000 TL ve b TL olan üç ürün birlikte satılıyor. Takım 2b+20.000 TL’ye satılırsa kâr, 3b−10.000 TL’ye satılırsa zarar ediliyor. b TL cinsindendir. İki koşulu sağlayan bütün b değerlerini bul.",
    "steps": [
      "Toplam maliyet 30.000+b TL. Kâr: 2b+20.000>30.000+b, dolayısıyla b>10.000.",
      "Zarar: 3b−10.000<30.000+b, dolayısıyla 2b<40.000 ve b<20.000.",
      "Ortak çözüm 10.000<b<20.000 TL. b=15.000 için maliyet 45.000, ilk satış 50.000, ikinci satış 35.000 TL’dir; iki koşul da sağlanır. Sınırlar başa baş olduğundan alınmaz."
    ],
    "answer": "10.000<b<20.000 TL; u=b/1000 ise 10<u<20.",
    "pitfall": "Bu özgün örneğin verilerini ve sonucunu resmî soruyla eşitleme. TL ile bin TL değişkenini ayrı adlandır."
  },
  "2021-TYT-MAT-3": {
    prompt: "Bir tarayıcı, 2,4×10⁻³ mm genişliğindeki bir çizginin görüntüsünü 8 katına çıkarıyor. Düzenleyici, taranan görüntüyü 25 katına çıkarıyor. Son görüntüde çizgi kaç milimetre genişliğindedir?",
    steps: [
      "Her oran kendisinden önceki görüntüye uygulanır. Birleşik oran 8·25=200’dür.",
      "2,4×10⁻³ mm ile 200’ü çarp. 200=2×10² olduğundan 4,8×10⁻¹ mm elde edilir.",
      "Sırayla kontrol et. İlk aşama 0,0192 mm, ikinci aşama 0,48 mm verir.",
    ],
    answer: "0,48 mm.",
    pitfall: "8+25 toplarsan ikinci oranı ilk büyümüş görüntüye uygulamazsın.",
  },
  "2023-TYT-MAT-4": {
    prompt: "Alanı 675 cm² olan kare bir panonun kenarı A√B cm olarak kaydediliyor. A ve B pozitif tam sayıdır. Boya kodu A+B olarak üretiliyor. Hangi kodlar üretilebilir?",
    steps: [
      "Alan kenarın karesi olduğundan A²B=675. B tam sayı ise A² alanı kalansız böler.",
      "675=3³·5². A’nın karesindeki 3 ve 5’in üsleri çifttir. 675’te bu üsler 3 ve 2 olduğundan her biri A’da en çok bir kez yer alır. Bu yüzden A, 1, 3, 5 veya 15’tir.",
      "B=675/A² formülüyle A sırasına göre B=675, 75, 27 ve 3 buluruz. Toplamlar 676, 78, 32 ve 18’dir. Örneğin (5√27)²=25·27=675.",
    ],
    answer: "Olası kodlar 18, 32, 78 ve 676’dır.",
    pitfall: "Kenar yazımında B’ye kare çarpansız olma koşulu eklemek. Bu soruda A ve B’nin pozitif tam sayı olması yeterlidir.",
  },
  "2026-TYT-MAT-2": {
    prompt:
      "Bir eğitim kanalının ardışık dört bölümünde izleyici sayısı bir önceki bölüme göre aynı katsayıyla artıyor. İkinci bölüm 120, dördüncü bölüm 270 izleyiciye ulaştı. İlk bölüm kaç izleyiciye ulaştı?",
    steps: [
      "İkiden dörde iki geçiş vardır, dolayısıyla r²=270/120=9/4. Pozitif katsayı r=3/2’dir.",
      "İkinci bölümden ilkine yalnız bir geçiş geri gidilir. 120÷(3/2)=80.",
      "Kontrol: 80, 120, 180 ve 270 sıralamasında ardışık bölüm her seferinde 3/2’dir.",
    ],
    answer: "İlk bölüm 80 izleyiciye ulaştı.",
    pitfall:
      "270/120 oranını tek geçiş katsayısı saymak, 2→3→4 aralığında iki geçiş olduğunu gözden kaçırır.",
  },
  "2026-TYT-MAT-18": {
    prompt:
      "Bir sergide toplam N kodlu kart var. Kartların 1/5’i bir kez taranıyor. Geriye kalanların 1/4’ü iki kez, önceki iki gruba girmeyen bazı kartlar da üç kez taranıyor. 39 farklı kart için toplam 72 tarama yapılmış. Kaç kart hiç taranmadı?",
    steps: [
      "Bir kez taranan N/5 kart, iki kez taranan (4N/5)·(1/4)=N/5 karttır. Üç kez taranan kart sayısı c olsun.",
      "Farklı kart sayısı 2N/5+c=39. Tarama sayısı 3N/5+3c=72. İlk eşitliğin üç katından ikincisini çıkarınca 3N/5=45 ve N=75 olur.",
      "15, 15 ve 9 kart, 39 farklı kart ve 15+30+27=72 tarama verir. Geriye 75−39=36 kart kalır.",
    ],
    answer: "36 kart hiç taranmadı.",
    pitfall:
      "İkinci kesri başlangıca uygulamak veya bir kartı her taramada yeniden farklı kart saymak.",
  },
  "2023-TYT-MAT-3": {
    prompt:
      "400 birim sıvıya ilk iki işlemde her defasında kapta bulunan miktarın 1/5’i ekleniyor. Sonraki iki işlemde her defasında o anda bulunan miktarın 1/4’ü boşaltılıyor. Son durumda kaç birim sıvı kalır?",
    steps: [
      "İlk iki işlemde o anda bulunan miktarın 6/5’i, son iki işlemde 3/4’ü elde edilir.",
      "Hesap 400·(6/5)²·(3/4)²=400·(9/10)²=324’tür.",
      "Adımları ayrı yaparak denetle. Miktarlar 400→480→576→432→324 olur.",
    ],
    answer: "324 birim sıvı kalır.",
    pitfall:
      "Her artış ve azalışı başlangıçtaki 400’e göre hesaplamak. İşlem her aşamada değişmiş miktara uygulanır.",
  },
  "2023-TYT-MAT-26": {
    prompt:
      "Bir gözlemevi 1996’da açıldığında rehber 19 yaşındaydı. Stajyer, gözlemevinin 18. açılış yıldönümünün olduğu yılda doğdu. Tam yıl farkı modelinde 2030’da yaşları toplamı kaçtır?",
    steps: [
      "Rehberin doğum yılı 1996−19=1977’dir. Stajyerin doğum yılı 1996+18=2014’tür.",
      "2030’da rehber 2030−1977=53, stajyer 2030−2014=16 yaşındadır.",
      "İki kişinin aynı hedef yıldaki yaşları toplamı 53+16=69’dur.",
    ],
    answer: "Yaş toplamı 69.",
    pitfall:
      "Açılış yılında 19 yaşında olmayı, açılıştan 19 yıl sonra doğmuş olmakla karıştırmak.",
  },
  "2026-TYT-MAT-21": {
    prompt:
      "Yıl modelinde 2027’de Salih ve yeğeni Ekin’in yaşları bilinmiyor. 2016’daki yaş toplamları Salih’in 2027’deki yaşına eşit. Salih’in 1998’deki yaşı, Ekin’in 2027’deki yaşına eşit. 2027 toplamını bul.",
    steps: [
      "Bugünkü yaşları s ve e yaz. 2016, 11 yıl önce olduğundan (s−11)+(e−11)=s. Dolayısıyla e=22.",
      "1998, 29 yıl önce. O tarihte yalnız Salih’in yaşı gerekir. s−29=22, yani s=51.",
      "2027 toplamı 73’tür. 2016’da 40+11=51. Ekin 2005’te doğduğu için 1998’de Ekin’in yaşı bir koşul olarak kullanılmaz.",
    ],
    answer: "2027’de yaş toplamı 73.",
    pitfall:
      "2016 ve 1998 için tek zaman kayması seçmek veya her koşulda iki kişiyi de geçmiş sütununa koymak.",
  },
  "2026-TYT-MAT-19": {
    prompt:
      "Eşit kapasiteli iki akvaryumdan ilki başlangıçta %75 dolu. İlk akvaryumun mevcut suyunun %20’si, ikincinin mevcut suyunun %25’i boşaltılıyor. İki akvaryumda eşit miktarda su kaldığına göre ikinci akvaryum başlangıçta yüzde kaç doluydu?",
    steps: [
      "Ortak kapasite C, ikinci akvaryumun başlangıç doluluk kesri x olsun. İlk akvaryumda 0,75C·0,80=0,60C, ikincide xC·0,75 kalır.",
      "Kalanları eşitle. 0,60C=0,75xC. C pozitif olduğundan 0,60=0,75x ve x=0,80.",
      "İkinci akvaryum %80 doluysa kalan miktar 0,80C·0,75=0,60C olur. İlk akvaryumda kalanla eşleşir.",
    ],
    answer: "İkinci akvaryum başlangıçta %80 doluydu.",
    pitfall:
      "Tüketim oranını kapasiteden çıkarmak veya eşit kalanlardan başlangıç doluluklarının eşit olduğunu varsaymak.",
  },
};
