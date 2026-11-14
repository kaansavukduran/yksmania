import type { LessonGuide, WorkedExample } from "./types";
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: WorkedExample["steps"],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps,
  answer,
  check,
  pitfall,
});

export const dnaDepthGuide: LessonGuide = {
  id: "dna-eslenmesi",
  minutes: 50,
  objectives: [
    "Eski zincirlerin korunmasını, yeni nükleotit eklenmesini ve yeni DNA molekülü oluşmasını ayrı say.",
    "Tamamlayıcı baz dizisini antiparalel yön etiketleriyle yaz.",
    "Helikaz, polimeraz, primer ve ligazı işlevlerine göre ayır; iki yeni zincirde de 5′→3′ sentezi koru.",
    "Orijin, kabarcık ve çatalı karşılaştır; nesillerde eski zincir ve melez DNA oranını varsayımlarıyla hesapla.",
  ],
  sections: [
    {
      title: "Kopyalanan bilgi: molekül artar, hücre hemen bölünmez",
      paragraphs: [
        "DNA replikasyonu, bir DNA molekülünün kalıp olarak kullanılıp iki DNA molekülüne ulaşılmasıdır. Hücre bölünmesinde kalıtsal bilginin yeni hücrelere aktarılabilmesi için DNA önceden eşlenir. Ökaryotik hücre döngüsünde bu işlem interfazın S evresindedir; DNA miktarının artmasıyla hücrenin fiilen ikiye bölünmesini aynı an sayma. Bakterilerin döngüsünü ise aynı ökaryotik evre adlarıyla zorunlu olarak tanımlama.",
        "Eşlenmenin bilgi bakımından benzer kopyalar oluşturması amaçlanır; polimeraz ve onarım işlevleri hata olasılığını azaltır. ‘Hata olasılığı azalır’ ile ‘hiç hata oluşamaz’ farklı önermelerdir. Eşlenme, DNA bilgisinden RNA yapılması olan transkripsiyon veya RNA’dan protein yapılması olan translasyonla karıştırılmaz.",
      ],
    },
    {
      title: "Yarı korunum: her eski zincir ayrı bir kalıptır",
      paragraphs: [
        "Başlangıçtaki iki zincir birbirinden ayrılır; her birinin karşısına tamamlayıcı yeni zincir yapılır. Sonuçtaki iki DNA’nın her birinde bir atasal ve bir yeni zincir vardır. Başlangıç molekülünün bir yavruya bütünüyle verilmesi ve ötekinin bütünüyle yeni yapılması, yarı korunumlu model değildir. Eski zincirler parçalanıp yeniden kurulmuş gibi de sayılmaz.",
        "Etkileşimde mavi eski zincirleri, mercan yeni zincirleri gösterir. Önce ayrılma adımına, sonra eklenen her bazın karşısındaki kalıba bak. Renk kimyasal bir molekül farkı değildir; zincirin hangi aşamada sentezlendiğini izlemek için öğretim işaretidir. İki yeni molekülün toplamındaki nükleotit sayısı artarken ilk iki zincirin nükleotitleri korunur.",
      ],
    },
    {
      title: "Tamamlayıcılık yalnız harf eşleme değildir",
      paragraphs: [
        "DNA’da adenin karşısına timin, guanin karşısına sitozin gelir. Karşılıklı zincirler antiparaleldir: birinin 5′ ucu karşısında ötekinin 3′ ucu bulunur. Üst zincir soldan sağa 5′–ATGC–3′ ise aynı hizadaki alt zincir 3′–TACG–5′ yazılır. Alt zincirin ayrıca 5′→3′ dizisi istenirse yönü tersinden okuyup 5′–GCAT–3′ yazman gerekir.",
        "Yeni zincir nükleotitlerin 3′ ucuna eklenmesiyle 5′→3′ yönünde uzar; kalıp karşı yönde okunur. Sayfada bir ok sağa, diğeri sola bakabilir; bu görsel yerleşim yeni zincirlerden birinin 3′→5′ sentezlendiğini göstermez. A–T ve G–C arasındaki hidrojen bağlarını, aynı zincirin şeker-fosfat omurgasındaki fosfodiester bağlarından ayır.",
      ],
    },
    {
      title: "Gerekenler ve enzimlerin farklı işleri",
      paragraphs: [
        "Uygun bir DNA kalıbı, dört çeşit deoksiribonükleotit, gerekli enzimler, enerji ve polimeraz işlevi için uygun iyon koşulları gerekir; kaynak bu bağlamda Mg iyonlarını da belirtir. Nükleotitler önceden bulunan uygun yapı taşlarıdır; DNA polimerazın her organik bileşeni yoktan ürettiğini düşünme. Uygun başlangıç ve reaksiyon koşulları olmadan yalnız baz eşleşmesi kuralı DNA sentezini tek başına yürütmez.",
        "Helikaz replikasyon çatalında atasal zincirlerin ayrılmasını sağlar; bazlar arasındaki hidrojen bağlarının açılmasına katkı verir. DNA polimeraz hazır başlangıcı uzatır; sıfırdan zincir başlatamaz. Kısa RNA primeri bu başlangıcı sağlar. Polimeraz uygun nükleotitleri ekleyerek yeni zincirin omurgasını uzatır, bazı hataların düzeltilmesinde görev alır. DNA ligaz ise oluşmuş parçaların omurgadaki aralarını fosfodiester bağıyla birleştirir; karşılıklı bazları hidrojen bağıyla yapıştıran enzim diye adlandırılmaz.",
      ],
      table: {
        headers: ["Bileşen", "İşlev", "Karıştırma"],
        rows: [
          [
            "Helikaz",
            "Eski zincirlerin ayrılmasını sağlar",
            "Yeni baz dizisini kendisi yazmaz",
          ],
          [
            "RNA primeri",
            "Uzatılabilen başlangıç sağlar",
            "Bütün yeni DNA kalıcı olarak RNA değildir",
          ],
          [
            "DNA polimeraz",
            "Yeni nükleotit ekler, zinciri uzatır",
            "Yeni zinciri 3′→5′ yapmaz",
          ],
          [
            "DNA ligaz",
            "Parçaların omurgasını birleştirir",
            "İki ayrı DNA molekülünü tek molekül yapma görevi değildir",
          ],
        ],
      },
    },
    {
      title: "Neden biri kesintisiz, öteki parçalı?",
      paragraphs: [
        "İki kalıp antiparalelken replikasyon çatalı belirli yönde açılır. Yeni zincirin sentez yönü her zaman 5′→3′ olduğundan, bir kalıpta çatalın ilerleyişiyle uyumlu kesintisiz uzama, diğerinde kısa parçalar hâlinde sentez oluşur. Kesintili sentezin kısa DNA parçaları Okazaki parçalarıdır; bunların birleştirilmesi gerekir.",
        "Kesintisiz ve kesintili ayrımı yeni zincirin kimyasal sentez yönünü değiştirmez. Çizim çevrilirse sağdaki veya soldaki zincirin adı da sayfadaki konuma göre ezberlenemez; kalıp uçlarını ve çatalın yönünü birlikte oku. Mevcut altı baz çiftlik etkileşim, eski/yeni zincir dağılımını öğretir; gerçek bir çatalın bütün primer, parça boyu ve enzim hareketlerini ölçekli göstermediği için orada gösterilmeyen ayrıntıyı çizimden çıkarmaya çalışma.",
      ],
    },
    {
      title: "Orijin, kabarcık ve çatal: başlangıçla ilerleyen sınırı ayır",
      paragraphs: [
        "Replikasyon orijini başlangıcın tanındığı özel bölgedir. Açılan bölüm kabarcık, kabarcığın iki yanındaki ilerleyen sınırlar çatallardır. Kaynakta incelenen tipik halkasal bakteriyel modelde bir orijinden iki yöne ilerleme gösterilir. Ökaryotik DNA’larda çok sayıda orijin bulunabilir; her kabarcığın iki ucunda çatal vardır.",
        "Çok orijin bulunması, her orijinin bağımsız bir genom kopyası üretip DNA miktarını orijin sayısı kadar katlaması değildir; aynı uzun DNA’nın farklı bölgeleri iş bölümüyle kopyalanır. Başlangıç noktası, çatal sayısı ve oluşan nihai molekül sayısı farklı sayımlardır. Tipik bakteriyel örneği tüm prokaryot canlıların istisnasız tek orijin taşıdığı iddiasına genişletme.",
      ],
    },
    {
      title: "Meselson–Stahl düzeni: banttan modele, modelden hesaba",
      paragraphs: [
        "Ağır azotlu ortamda uzun süre çoğalan bakterilerin DNA’sı iki ağır zincirli hâle getirildikten sonra hafif azotlu ortama aktarılır. Bir tam eşlenmeden sonra her molekül bir ağır, bir hafif zincir içerir; ara yoğunlukta melez bant beklenir. İkinci eşlenmede iki melez ve iki tamamen hafif DNA oluşur; ara ve hafif bant birlikte görülür. Ağır azot izotopunu burada otomatik olarak radyoaktif işaretleme sayma; gözlenen ayrım yoğunluktur.",
        "Kayıp, yeniden ağır yapı taşı alımı ve farklı çoğalma sayıları olmadığı varsayılırsa n tur sonunda tek başlangıç DNA’dan 2ⁿ molekül oluşur. İlk iki zincir korunur; toplam zincir sayısı 2×2ⁿ’dir. n≥1 için başlangıç zincirini taşıyan iki molekül bulunur; melez oranı 2/2ⁿ olur. ‘Son turda sentezlenen’, ‘başlangıçtan beri yeni olan’ ve ‘başlangıçtaki eski’ tanımlarını açık seç; aynı sayı değiller.",
      ],
    },
  ],
  examples: [
    example(
      "Hizadaki tamamlayıcıyı ve yönünü yaz",
      "Üst zincir soldan sağa 5′–ATGC–3′. Alt zinciri aynı hizayla, sonra kendi 5′→3′ yönüyle yaz.",
      "Önce baz eşini, sonra uç etiketlerini yerleştir.",
      [
        {
          label: "Eşleşme",
          explanation:
            "A–T, T–A, G–C, C–G olduğundan aynı sütunlarda TACG gerekir.",
        },
        {
          label: "Antiparalellik",
          explanation:
            "Alt zincirin soldaki ucu 3′ olur:3′–TACG–5′. Bu zincirin 5′ ucu sağda olduğu için ters okuyunca GCAT çıkar.",
        },
      ],
      "Aynı hiza 3′–TACG–5′; kendi yönüyle 5′–GCAT–3′.",
      "Harfleri olduğu gibi bırakıp yalnız uç etiketlerini değiştirmek aynı zinciri tarif etmez.",
      "5′→3′ istenmesi baz eşini ve okumayı ayrı kontrol etmeyi gerektirir.",
    ),
    example(
      "Baz çifti ile yeni nükleotiti ayır",
      "6 baz çiftli tek DNA, kayıpsız bir kez tamamen eşleniyor. Yeni eklenen nükleotit, yeni zincir ve sonuç DNA sayıları nedir?",
      "Her kalıbı ayrı say; sonuçtaki eski parçaları yeniden yeni sayma.",
      [
        {
          label: "Başlangıç",
          explanation: "6 baz çifti iki zincirde toplam 12 eski nükleotittir.",
        },
        {
          label: "Yeni sentez",
          explanation:
            "İki kalıbın her biri 6’şar nükleotitlik yeni zincir kurar:2×6=12 yeni nükleotit.",
        },
        {
          label: "Sonuç",
          explanation:
            "Toplam 4 zincir ikişerli eşlenir:2 DNA. Her birinde bir eski ve bir yeni zincir vardır.",
        },
      ],
      "12 yeni nükleotit;2 yeni zincir;2 sonuç DNA.",
      "Son durumda 12 eski+12 yeni=24 nükleotit; iki 6 baz çiftli DNA’nın toplamına uyar.",
      "Sonuçtaki toplam 24 nükleotitin hepsini yeni diye sayma.",
    ),
    example(
      "İki turda eskiyi yeniden tanımlama",
      "Bir DNA, kayıp olmadan iki tam tur eşleniyor. Yalnız en baştaki iki zincir eski sayılırsa kaç eski ve yeni zincir bulunur?",
      "Önce DNA sayısını, sonra toplam zinciri bul.",
      [
        { label: "Molekül", explanation: "1→2→4 DNA olur." },
        {
          label: "Zincir",
          explanation:
            "4 çift zincirli DNA toplam 8 zincirdir; ilk iki zincir korunur.",
        },
        {
          label: "Yeni sınıfı",
          explanation:
            "Başlangıçtan sonra oluşanların hepsi yeni sayıldığı için 8−2=6 yeni zincir vardır.",
        },
      ],
      "2 eski+6 yeni zincir.",
      "Başlangıç zincirlerini taşıyan moleküller 2 tanedir; kalan 2 DNA iki yeni zincirlidir.",
      "Her turda bir önceki turu yeniden eski sayarsan sorunun eski tanımını değiştirmiş olursun.",
    ),
    example(
      "Üçüncü nesilde melez oranı",
      "İki zinciri ağır azotlu tek DNA, yalnız hafif azotlu ortamda üç kayıpsız tam tur eşleniyor. Melez DNA oranı nedir?",
      "Ağır zincirlerin sayısı ile toplam molekül sayısını ayrı izle.",
      [
        {
          label: "Korunan işaret",
          explanation:
            "Başlangıçtaki 2 ağır zincir iki ayrı DNA’da kalır; yeni ağır yapı taşı gelmiyor.",
        },
        { label: "Toplam", explanation: "Üç tur sonunda 2³=8 DNA vardır." },
        {
          label: "Oran",
          explanation:
            "İki melez DNA / sekiz DNA=1/4=%25. Kalan 6 molekül tamamen hafiftir.",
        },
      ],
      "%25 melez, %75 tamamen hafif DNA.",
      "İlk turda%100, ikinci turda%50 melez örüntüsüyle tutarlıdır.",
      "Başlangıç ağır zincirlerinin korunmasını bütün molekülün ağır kalması sanma.",
    ),
  ],
  recall: [
    {
      prompt:
        "Ligazın kurduğu bağ ile helikazın açılmasına katkı verdiği bağ aynı mı?",
      answer:
        "Hayır. Ligaz omurgadaki parçaları fosfodiester bağıyla birleştirir; helikaz karşılıklı bazlar arasındaki hidrojen bağlarının açılmasına katkı sağlar.",
    },
    {
      prompt: "Kesintili yeni zincir 3′→5′ mi sentezlenir?",
      answer:
        "Hayır; yeni parçaların her biri de 5′→3′ sentezlenir. Kesintili oluşum çatal yönü ve antiparalel kalıplarla ilişkilidir.",
    },
    {
      prompt: "Çok orijin her birinin ayrı bir genom üretmesi mi demektir?",
      answer:
        "Hayır. Uzun DNA’nın farklı bölgeleri kopyalanır; orijin, çatal ve sonuç molekül sayıları ayrı sayımlardır.",
    },
  ],
  source:
    "MEBİ AYT Biyoloji Konu Özeti Bölüm 2 dosyasında PDF s.38–40, basılı s.158–160 doğrudan okundu. Bölüm dosyası tam kitabın PDF 123–244 kesitidir. Özgün açıklamalar ve örnek hesaplar; resmî sınav sorusu değildir. Mevcut etkileşim molekül düzeyindeki eski/yeni zincirleri gösterir; bütün replikasyon çatalını ölçekli göstermez.",
};

export const atpDepthGuide: LessonGuide = {
  id: "atp-metabolizma",
  minutes: 50,
  objectives: [
    "ATP/ADP/AMP yapısını baz, şeker ve fosfat sayısıyla kur.",
    "Hidroliz ile sentezin net enerji yönlerini ve hücresel enerji eşlemesini açıkla.",
    "Yapım-yıkım, tepkime hızı ve enerji yönünü birbirine karıştırma.",
    "Substrat düzeyi, oksidatif ve foto fosforilasyonu koşullarıyla karşılaştır; kemiozmozdaki gradyan yönünü izle.",
  ],
  sections: [
    {
      title: "ATP’nin parçalarını say, besinle rolünü karıştırma",
      paragraphs: [
        "ATP, adenozin trifosfattır. Adenin azotlu bazı ile beş karbonlu riboz şekeri birlikte adenozini kurar; buna üç fosfat grubu bağlıdır. Bir fosfatlı AMP, iki fosfatlı ADP, üç fosfatlı ATP adlarını fosfat sayısı ayırır. Şeker ribozdur; DNA’daki deoksiriboz ile karıştırma. ATP bu açıdan bir ribonükleotit yapısındadır.",
        "ATP hücresel enerji aktarımında kısa süreli, sürekli yenilenen bir taşıyıcıdır. Uzun süreli besin deposu veya bütün vücuda besin gibi dağıtılan enerji paketi olarak öğrenilmez. Hücrede kullanılırken yeniden sentezlenmesi gerekir. Besinlerdeki enerji bir metabolik yol ve uygun moleküler düzenek üzerinden ATP sentezine bağlanabilir; ATP enerjiyi yoktan yaratmaz.",
        "Adenin ile riboz arasında glikozit, riboz ile fosfat arasında ester bağı bulunur; fosfatlar arasında da bağlar vardır. Şemadaki fosfat daireleri sayıyı ve uç fosfatın ayrılmasını gösteren öğretim işaretleridir; gerçek bağ uzunluğu, atom sayısı ve molekül geometrisi ölçümü değildir. Enzim, su ve iyonların tamamının çizilmemesi tepkimede bulunmadıkları anlamına gelmez.",
      ],
    },
    {
      title: "Hidroliz ve sentez: net tepkimeyi ve enerji yönünü birlikte oku",
      paragraphs: [
        "Basitleştirilmiş hidroliz gösterimi ATP+H₂O→ADP+Pi’dir; Pi serbest inorganik fosfatı belirtir. Hücresel koşullarda bu net dönüşüm ekzergonik olabilir; serbest enerji başka bir olaya eşlenebilir. ADP+Pi+enerji→ATP+H₂O ise fosforilasyon, yani ATP sentezi yönünü gösteren okul düzeyi özetidir. ATP sentezlemek için enerji gerekir.",
        "‘Bağ kırılınca enerji çıkar’ ifadesini tek bir bağı mekanik koparmakla açıklama: bağı koparmak enerji ister; net hidroliz tepkimesindeki ürün oluşumu ve bütün değişim sonucunda serbest enerji açığa çıkabilir. Kaynakların ‘yüksek enerjili fosfat bağı’ adı, bu net aktarım bağlamında kullanılır. Eşitlikte su, enerji ve fosfatın hangi tarafta olduğunu okuyarak yönü denetle.",
      ],
      table: {
        headers: ["Dönüşüm", "Net yön", "Karıştırma"],
        rows: [
          [
            "ATP+su→ADP+Pi",
            "Hidroliz; uygun koşullarda net serbest enerji açığa çıkar",
            "Tek bağı kırmanın kendisi enerji kaynağı değildir",
          ],
          [
            "ADP+Pi+enerji→ATP+su",
            "Fosforilasyon; enerji girdisi gerekir",
            "ATP yoktan enerji üretmez",
          ],
          [
            "AMP,ADP,ATP",
            "1,2,3 fosfat",
            "Baz ve şeker her birinde adenozin yapısını korur",
          ],
        ],
      },
    },
    {
      title: "Enerji eşlemesi: tepkimeyi işe bağlayan mekanizma gerekir",
      paragraphs: [
        "Enerji isteyen bir olayın yanına ATP yazmak tek başına onu yürütmez. Enzimler ve moleküler etkileşimler, ATP hidroliziyle hedef olayın birlikte gerçekleşmesini sağlayan bir eşleme kurar. Örneğin bir taşıma proteininin fosforillenmesi biçimini değiştirerek yoğunluk farkına karşı madde taşınmasına katkı verebilir. Taşıma ile ATP hidrolizi ayrı ama eşlenmiş dönüşümlerdir.",
        "Ekzergonik olmak bir tepkimenin hızlı olduğunu söylemez; hızda aktivasyon enerjisi ve enzimler ayrıca önemlidir. Açığa çıkan enerjinin tamamının işe dönüştüğünü de varsayma; ısıya dönüşen bölüm bulunabilir. Hücrede belirli bir basamağın doğrudan hangi enerji taşıyıcısıyla yürüdüğü soru verisinden anlaşılır; ‘bütün yapımın her adımı doğrudan bir ATP harcar’ genellemesi kurulmaz.",
      ],
    },
    {
      title: "Metabolizma bir yönlü liste değil, bağlı yapım ve yıkımdır",
      paragraphs: [
        "Metabolizma hücredeki kimyasal tepkimelerin bütünüdür. Basit birimlerden daha karmaşık molekül kurulması anabolizma/yapım; büyük moleküllerin daha küçük birimlere ayrılması katabolizma/yıkımdır. Amino asitlerden protein yapımı, glikojen sentezi yapım örnekleridir. Solunum, glikojen yıkımı ve sindirimdeki hidrolizler yıkım örnekleri olabilir.",
        "Yapım genel olarak net enerji ister; yıkım yollarının açığa çıkan enerjisi ve yapı taşları başka yolları besleyebilir. Ancak her yıkım olayında doğrudan ATP sentezlendiği sonucu çıkmaz. Büyüyen hücrede yapımın baskın olması bütün yıkımın durması değildir. Solunum yalnız yıkımın bir örneği, fotosentez de yapımın tek örneği değildir.",
      ],
    },
    {
      title: "Substrat düzeyinde fosforilasyon: fosfat doğrudan aktarılır",
      paragraphs: [
        "Fosfatlı organik bir ara üründeki fosfat, uygun enzimle doğrudan ADP’ye aktarılır ve ATP oluşur. Bu yol için elektron taşıma sistemi, zar boyunca proton gradyanı veya ATP sentaz zorunlu değildir. Glikolizdeki belirli basamaklar bu örneği taşır; Krebs döngüsündeki belirli basamaklarda da substrat düzeyi enerji aktarımı incelenir.",
        "Glikoliz oksijeni doğrudan kullanmadan substrat düzeyinde ATP sağlayabilir. Bu, ‘oksijen yoksa ATP üretilemez’ iddiasına karşı örnektir. Fermantasyon bağlamındaki net ATP kazanımı glikolize bağlanır; fermantasyonun sonraki basamaklarını başlı başına ek bir oksidatif fosforilasyon kaynağı sanma. ‘Oksijensiz koşul’ her hücrede bütün metabolik ayrıntıların aynı olduğu anlamına gelmez.",
      ],
    },
    {
      title: "Oksidatif fosforilasyon: elektron akışından gradyana",
      paragraphs: [
        "Elektron taşıma sistemi boyunca yükseltgenme/indirgenme dönüşümleri, bir zarın iki tarafında protonların elektrokimyasal gradyanının kurulmasına katkı verir. ATP sentazdan gradyan yönünde proton akışı ATP sentezine bağlanır; bu kemiozmotik eşlemedir. Ökaryotik oksijenli solunumda ilgili zar mitokondrinin iç zarıdır; prokaryotlarda hücre zarı üzerindeki düzenekler görev yapabilir.",
        "Oksijenli solunumda son elektron alıcısı O₂’dir. Bununla birlikte oksidatif fosforilasyonu yalnız kelimedeki oksijen görünüşüne göre tanımlama; bazı prokaryotik oksijensiz solunumlarda başka son alıcılarla da ETS çalışabilir. Kemosentez bağlamında inorganik maddelerin oksidasyonu da elektron/enerji kaynağı olabilir. Son alıcı, elektron kaynağı, zar ve ATP sentaz görevini ayrı sorgula.",
      ],
    },
    {
      title:
        "Fotofosforilasyon: ilk enerji kaynağı ışık, ortak mekanizma kemiozmoz",
      paragraphs: [
        "Fotosentetik pigmentlerin ışığı soğurmasıyla uyarılan elektron akışı, uygun zar düzeninde proton gradyanı ve ATP sentazla ATP sentezine bağlanabilir. Ökaryotik fotosentezde tilakoit zarı bu düzeni taşır; fotosentetik prokaryotların da kendilerine özgü fotosentetik zar düzenleri vardır. Prokaryotta kloroplast organeli arama.",
        "Oksidatif ve foto fosforilasyonda ETS, proton gradyanı ve ATP sentaz üzerinden kemiozmoz ortak olabilir; enerji ve elektron kaynakları, yerleri ve tüm süreçlerin toplam ürünleri aynı değildir. Kloroplastta ışığa bağlı basamaklarda üretilen ATP, fotosentetik organik madde sentezindeki olaylarda kullanılır. Model düzeyinde kloroplastı yalnız üretip hiç tüketmeyen, mitokondriyi de yalnız tüketen organel diye sınıflandırma.",
        "Fosforilasyon türünü seçerken üç soru sor: Fosfat organik ara üründen doğrudan mı aktarılıyor? Elektron taşıma ve zar gradyanı mı var? Elektronları uyaran ilk enerji kaynağı ışık mı? Bu sırayla koşulları okumak yalnız organel adını veya yalnız oksijenin bulunmasını ezberlemekten daha güvenlidir.",
      ],
    },
  ],
  examples: [
    example(
      "Fosfatı ve suyu say",
      "ADP+Pi+enerji→X+H₂O özetinde X nedir ve net enerji yönü nasıl yorumlanır?",
      "Fosfat sayısını ve enerji girdisini aynı anda denetle.",
      [
        {
          label: "Yapı",
          explanation:
            "ADP iki fosfat taşır; bir inorganik fosfat eklenince üç fosfatlı ATP oluşur.",
        },
        {
          label: "Yön",
          explanation:
            "Enerji sol tarafta girdidir; bu sentez/fosforilasyon yönü enerji ister.",
        },
      ],
      "X=ATP; fosforilasyon, net enerji girdisi.",
      "Adenin ve riboz korunur, fosfat sayısı 2’den 3’e çıkar.",
      "ATP oluşmasını hücrenin enerjiyi yoktan üretmesi sanma.",
    ),
    example(
      "Oksijensiz de ATP olabilir",
      "Bir hücrede fosfatlı organik ara ürün fosfatını doğrudan ADP’ye veriyor; bu basamakta ETS kullanılmıyor. ATP sentez türü nedir?",
      "Fosfatın doğrudan kaynağını belirle.",
      [
        {
          label: "Gözlem",
          explanation:
            "Fosfat organik substrattan ADP’ye aktarılıyor; zar gradyanı verilmiyor.",
        },
        {
          label: "Yöntem",
          explanation:
            "Bu, substrat düzeyinde fosforilasyon tanımıdır. ETS zorunlu olmadığı için basamağı oksidatif diye adlandırmayız.",
        },
      ],
      "Substrat düzeyinde fosforilasyon.",
      "Glikolizdeki ATP üreten basamaklarla aynı temel aktarım ilkesidir.",
      "Ortamda oksijen bulunması her ATP molekülünün oksidatif yolla yapıldığını göstermez.",
    ),
    example(
      "Yapımın yanında yıkım da sürer",
      "Büyüyen bir hücrede protein sentezi artıyor. Bu gözlemden hücresel yıkımın durduğu sonucu çıkar mı?",
      "Baskın net sonuç ile eş zamanlı tepkimeleri ayır.",
      [
        {
          label: "Verilen",
          explanation:
            "Protein sentezi küçük amino asitlerden büyük molekül kurar; anaboliktir.",
        },
        {
          label: "Gereksinim",
          explanation:
            "Sentez için enerji ve öncüller gerekir; bunları sağlayan yıkım/dönüşüm yolları da aynı hücrede sürebilir.",
        },
      ],
      "Hayır; yapımın artması bütün yıkımın durması değildir.",
      "Büyüme, aynı hücrede sürekli ATP sentezi ve tüketimiyle bağdaşır.",
      "Tek bir gözlemden bütün metabolizmaya ‘yalnız yapım’ sonucu çıkarma.",
    ),
    example(
      "İki süreçte ortak mekanizmayı bul",
      "Oksijenli solunum ve fotosentez için ETS kullanma, proton gradyanı kurma, ATP sentazla ATP sentezleme ve oksijeni son elektron alıcısı yapma özelliklerinden hangileri ortak olabilir?",
      "Her özelliği ilgili basamakta iki ayrı sütunda denetle.",
      [
        {
          label: "Ortak eşleme",
          explanation:
            "İlgili zarlarda ETS, proton gradyanı ve ATP sentazla kemiozmotik ATP sentezi iki süreçte de bulunabilir.",
        },
        {
          label: "Ayrılan koşul",
          explanation:
            "O₂’nin son elektron alıcısı olması oksijenli solunumun özelliğidir; fotosentezde aynı son alıcı varsayılmaz.",
        },
      ],
      "İlk üç özellik ortak olabilir; O₂’yi son alıcı yapma ortak diye alınmaz.",
      "Bir ortak mekanizma bulunması, enerji kaynağını ve toplam ürünleri eşitlemez.",
      "Süreçlerin bir basamağını bütün tepkimelerinin aynı olduğu sonucuna genişletme.",
    ),
  ],
  recall: [
    {
      prompt: "ATP’deki şeker nedir, adenozin hangi iki parçadır?",
      answer:
        "Şeker ribozdur; adenozin adenin+ribozdur. ATP’de buna üç fosfat bağlıdır.",
    },
    {
      prompt:
        "Bir yıkım olayının bulunması doğrudan ATP sentezini garanti eder mi?",
      answer:
        "Hayır; enerji dönüşümü ve senteze bağlayan mekanizma verilmelidir. Her hidroliz doğrudan ATP üretmez.",
    },
    {
      prompt: "ATP sentazdan proton akışı gradyana karşı mıdır?",
      answer:
        "ATP sentezine bağlanan akış elektrokimyasal gradyan yönündedir. Gradyanı kurmak ve onu kullanmak ayrı aşamalardır.",
    },
    {
      prompt: "Foto ve oksidatif fosforilasyonun temel ortaklığı nedir?",
      answer:
        "Uygun zar, elektron akışı, proton gradyanı ve ATP sentazla kemiozmotik eşleme; başlangıç enerji/elektron kaynakları aynı değildir.",
    },
  ],
  source:
    "MEBİ AYT Biyoloji Konu Özeti Bölüm 2 dosyasında PDF s.52–54, basılı s.172–174 doğrudan okundu; Aurelia ATP ve Metabolizma kopya kağıdının PDF s.1–5 yapısı, enerji eşlemesi, fosforilasyon ve yöntem bölümleriyle karşılaştırıldı. Özgün açıklama ve öğretim örnekleri; kaynaklardaki ÖSYM atıfları burada yeni resmî soru doğrulaması sayılmaz. Molekül şeması gerçek geometri veya bütün metabolik yolları göstermez.",
};
