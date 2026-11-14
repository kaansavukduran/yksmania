import { node as n, type NarrativePack } from "./types";
export const mathematicsNarratives: NarrativePack[] = [
  {
    id: "sayi-basamaklari",
    topicId: "detail-199",
    subjectId: "tyt-matematik",
    title: "Sayı basamakları: rakamdan koşullu denkleme",
    minutes: 30,
    source:
      "Aurelia TYT Matematik Sayı Basamakları kopya kağıdı, PDF s.1–5. Atıf yapılan özgün ders kitabının tamamı ayrıca okunmuş sayılmaz.",
    objectives: [
      "Sayı, rakam, sayı değeri ve basamak değerini ayır.",
      "Harfli sayı yazımını çözümleyip denkleme dönüştür.",
      "Baştaki sıfır, farklı rakam ve elde koşullarını kontrol et.",
    ],
    body: [
      {
        title: "Rakam yer değiştirirse değer de değişebilir",
        text: "Onluk sistemde rakamlar 0’dan 9’a kadar sembollerdir; 407 bir sayıdır ve üç rakamla yazılır. Burada 4’ün sayı değeri 4, basamak değeri 4×100=400’dür. 407=4×100+0×10+7×1 olur. Ortadaki sıfır boş bir onluk konumunu korur; onu silmek 47’ye geçmek, yani sayıyı değiştirmektir. Sağdan sola basamak ağırlıkları 1, 10, 100, 1000 diye on kat artar. Rakam toplamı 4+0+7=11, sayının kendisi 407 ve basamak adedi 3 farklı niceliklerdir.",
      },
      {
        title: "Harfli yazım çarpım değildir",
        text: "Bu anlatımda [ab] iki basamaklı sayı ise 10a+b, [abc] üç basamaklı sayı ise 100a+10b+c anlamına gelir. a×b ayrı bir çarpımdır. İlk rakam sıfır olamaz; diğer rakamlar için aksi söylenmedikçe 0–9 aralığı geçerlidir. Aynı harf aynı rakamı gösterir, farklı harflerin mutlaka farklı rakam olması ise ayrıca verilen bir koşuldur. Örneğin [aab] yazımı b’nin a’dan farklı olduğunu tek başına söylemez.",
      },
      {
        title: "Ters yazımı aç, kısa yolu türet",
        text: "[ab]−[ba]=(10a+b)−(10b+a)=9(a−b) olur. Toplamları 11(a+b)’dir. Üç basamakta [abc]−[cba]=99(a−c); ortadaki rakam iptal olur. Bu bağıntılar tanımı açmaktan çıkar, ezbere bir sayı yerleştirmekten değil. Eğer ters yazılan sayının da iki basamaklı olduğu söyleniyorsa b≠0 koşulu gerekir. 40’ın ters yazımı 04, sayı olarak 4’tür; ikinci sayı iki basamaklı diye verilmedikçe bu durum kendiliğinden yasaklanmaz. Pozitif fark istenirse işaret veya mutlak değer ayrıca ele alınır.",
      },
      {
        title: "Sola eklemek ve sağa eklemek farklıdır",
        text: "N sayısının sağına d rakamını eklemek 10N+d, k basamaklı N’nin soluna d eklemek d×10^k+N verir. Örneğin 36’nın sağına 2 yazmak 362, soluna 2 yazmak 236’dır. Bir basamaktaki rakam x’ten y’ye değişirse fark (y−x)×basamak ağırlığıdır. 100’ler basamağında 2 yerine 7 yazmak sayıyı 500 artırır. Önce metindeki basamağı gerçek sayı üzerinde kontrol et; tutarsız bir koşulu sırf formül uysun diye zorla çözme.",
      },
      {
        title: "Elde ve sıfır kısıtlarını son aşamaya bırakma",
        text: "Toplamada bir sütun 10’u geçerse birler rakamı o sütunda kalır, tam onluklar sonraki sütuna taşınır. 47+68’de 7+8=15; 5 yazılır ve 1 taşınır, onlar 4+6+1=11 olur. Üç toplananda elde 2 de olabilir. Rakamları farklı bir sayı kurulacaksa kullanılan rakamları her adımda ele. 0, 3 ve 7 ile her biri bir kez kullanılarak en küçük üç basamaklı sayı 307’dir; 037 üç basamaklı sayı değildir.",
      },
      {
        title: "Numara sayısı ile yazılan rakam sayısı",
        text: "1–9 arasında 9 tek basamaklı, 10–99 arasında 90 iki basamaklı sayı vardır. Bir kitabın sayfaları 1’den 120’ye kadar numaralanıyorsa 9+90×2+21×3=252 rakam yazılır. 100–120 aralığında uçlar dahil 120−100+1=21 sayı bulunduğunu unutma. Üç basamaklı bütün sayıları sayarken 9×10×10=900; rakamları farklı olanlarda 9×9×8=648 kullanılır. İlk basamaktaki sıfır yasağı diğer basamakların seçim sayılarıyla aynı değildir.",
      },
    ],
    pitfalls: [
      {
        label: "[ab], a×b değildir",
        reason:
          "İki basamaklı yazım 10a+b olarak açılır; sorunun kullandığı gösterimi önce tanımla.",
      },
      {
        label: "Farklı harfler otomatik farklı rakam değildir",
        reason:
          "Bu kısıt açıkça söylenmelidir. Aynı harfler ise aynı rakamı temsil eder.",
      },
      {
        label: "Basamak adedi ile rakam toplamını karıştırma",
        reason:
          "5072 dört basamaklıdır; rakam toplamı 14’tür. Konum, toplam ve sayının kendisi ayrı bilgiler verir.",
      },
    ],
    cases: [
      {
        name: "Ortadaki sıfır",
        question: "407 ile 47 neden aynı sayı değildir?",
        conclusion:
          "407’de 4 yüzlüğü gösterir, 47’de dört onluğu. Sıfır konumu korur; yalnız ‘değeri sıfır’ diye yazımdan silinemez.",
        nodes: [
          n("Rakam 4", "Sayı değeri 4’tür.", "number", "4"),
          n("Yüzler konumu", "Ağırlık 100’dür.", "number", "100"),
          n("400 katkısı", "4×100=400 basamak değeridir.", "number", "400"),
          n("407 sayısı", "400+0+7 olarak yeniden kurulur.", "number", "407"),
        ],
      },
      {
        name: "Ters sayı farkı",
        question: "[ab]−[ba] farkının 9 ile ilişkisi nereden gelir?",
        conclusion:
          "Basamakları aç: 10a+b−10b−a=9a−9b=9(a−b). Rakam koşulları bu özdeşliğin yanında ayrıca kontrol edilir.",
        nodes: [
          n("[ab] = 10a+b", "Harfli sayı çözümlemesidir.", "document"),
          n("[ba] = 10b+a", "Ters yazımı ayrı aç.", "document"),
          n("Benzerleri çıkar", "10a−a ve b−10b hesaplanır.", "number"),
          n(
            "9(a−b)",
            "Farkın işareti a−b’nin işaretiyle belirlenir.",
            "number",
          ),
        ],
      },
      {
        name: "Rakam sayımı",
        question: "1’den 120’ye numaralama için neden yalnız 120×3 yapılamaz?",
        conclusion:
          "İlk sayfalar tek ve iki basamaklıdır. Basamak sayısına göre 9×1+90×2+21×3=252 olarak blokları ayrı saymak gerekir.",
        nodes: [
          n("1–9", "9 sayı, her biri bir rakam.", "number", "9"),
          n("10–99", "90 sayı, her biri iki rakam.", "number", "180"),
          n("100–120", "21 sayı, her biri üç rakam.", "number", "63"),
          n("Toplam", "9+180+63=252 rakam.", "number", "252"),
        ],
      },
    ],
    recall: [
      {
        prompt: "İki basamaklı N’nin sağına 5 eklenmesi neden N+5 değildir?",
        answer:
          "Eski rakamlar bir basamak sola kaydığı için N önce 10 ile çarpılır; yeni birler rakamı eklenir. Sonuç 10N+5’tir.",
      },
      {
        prompt:
          "0, 4 ve 8 ile her biri bir kez kullanılarak en küçük üç basamaklı sayıyı kur.",
        answer:
          "İlk basamakta sıfır kullanılamaz; en küçük sıfır olmayan 4’ü başa, sonra 0 ve 8’i yerleştir: 408.",
      },
    ],
    modelLimit:
      "Onluk doğal sayılar ve basamak koşulları anlatılır. Kutular fiziksel miktarı değil konumu gösterir; farklı taban soruları ayrıca tanımlanmalıdır.",
  },
];
