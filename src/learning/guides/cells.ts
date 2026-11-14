import type { LessonGuide } from "./types";
export const cellsGuide: LessonGuide = {
  id: "hucre-organelleri",
  minutes: 55,
  objectives: [
    "Hücre tipini, yapının zar sayısını ve görevini birlikte değerlendir.",
    "Salgı proteininin ribozom–ER–Golgi–vezikül yolunu gerekçelendir.",
    "Enerji dönüşümü, sindirim, depo ve hücre iskeleti görevlerini birbirinden ayır.",
    "Tipik hücre şemasından bütün hücrelere koşulsuz genelleme yapma.",
  ],
  sections: [
    {
      title: "Hücreyi parça listesi olarak değil, iş bölümü olarak oku",
      paragraphs: [
        "Bir hücrenin madde alışverişi yapması, protein üretmesi, enerji dönüştürmesi ve yapısını koruması gerekir. Ökaryot hücrelerde bu işlerin bir kısmı zarlarla ayrılmış bölmelerde gerçekleşir. Bakteri ve arkeler prokaryottur: zarla çevrili çekirdekleri ve zarlı organelleri bulunmaz; buna rağmen DNA, hücre zarı ve protein sentezleyen ribozomları vardır. Zarlı organel yokluğu ‘yaşamsal olay yokluğu’ değildir.",
        "Hücre zarı dış sınırdır. Ökaryotta çekirdeğin dışındaki hücre içeriği sitoplazma; onun sıvı kısmı sitozoldür. Organeller ve hücre iskeleti de sitoplazmanın bileşenleridir. Hücre duvarı zarın dışında destek sağlar; bitkide selülozlu, mantarda kitinli, çoğu bakteride peptidoglikanlıdır. Hücre duvarı ve hücre zarı organel olarak sınıflandırılmaz.",
      ],
    },
    {
      title: "Zar sayısı ile lipit katmanı sayısını karıştırma",
      paragraphs: [
        "Bir biyolojik zarın temelinde çift katlı fosfolipit tabakası vardır. Bu yapı tek bir zar sayılır. Çift zarlı organelde iki ayrı biyolojik zar bulunur. Ribozom, sentrozom ve hücre iskeleti zarsızdır. ER, Golgi, lizozom, peroksizom ve koful tek zarlı; çekirdek, mitokondri ve plastitler çift zarlı gruptadır.",
        "Aşağıdaki şemada bitki ve hayvan hücresini değiştir; yapıya dokunarak görevini oku. Şema tipik hücreleri gösterir; her özel hücreyi veya gerçek boyut oranlarını temsil etmez. Ribozom çok küçükken çizimde büyük görünmesi onun çekirdekle aynı boyutta olduğu anlamına gelmez. Yapıyı seçerken hem zar sınıfını hem hücre tipini söylemeyi dene.",
      ],
      table: {
        headers: ["Sınıf", "Örnekler", "Ayırt edici fikir"],
        rows: [
          [
            "Zarsız",
            "Ribozom, sentrozom, iskelet",
            "Zarsızlık, işlevsiz olmak değildir.",
          ],
          [
            "Tek zarlı",
            "ER, Golgi, lizozom, koful, peroksizom",
            "Bir zarın kendi lipit çift tabakası vardır.",
          ],
          [
            "Çift zarlı",
            "Çekirdek, mitokondri, plastitler",
            "İki ayrı sınır zarı bulunur.",
          ],
        ],
      },
    },
    {
      title: "Çekirdek ve ribozom: bilgi ile üretim ayrı yerlerdir",
      paragraphs: [
        "Çekirdekteki DNA kalıtsal bilgiyi taşır; bu bilginin bir bölümü RNA’ya aktarılır. Çekirdek porları çekirdek-sitoplazma alışverişini düzenler. Çekirdekçik zarlı bir organel değildir; rRNA üretimi ve ribozom alt birimlerinin hazırlanmasıyla ilişkilidir. ‘Çekirdekte protein sentezi yapılır’ demek yerine bilginin aktarılması ile protein üretimini ayır.",
        "Ribozom rRNA ve proteinlerden oluşur; mRNA bilgisine göre amino asitleri birleştirerek protein sentezler. Serbest ribozomlar, granüllü ER’ye bağlı ribozomlar ve mitokondri/kloroplast ribozomları bulunabilir. Ribozom prokaryot ve ökaryot hücre tiplerinin ortak yapısıdır; fakat olgun memeli alyuvarı gibi özelleşmiş hücreler ribozomlarını da kaybetmiştir. ‘Her hücre şu anda protein sentezler’ genellemesi bu istisnayı kaçırır.",
      ],
    },
    {
      title: "Salgı yolu: ribozom, granüllü ER, Golgi, vezikül",
      paragraphs: [
        "Salgılanacak birçok proteinin sentezi ER’ye bağlanan ribozomlarda sürer; ürün ER’de katlanma ve ilk işlenme basamaklarından geçer. Taşıma vezikülü ürünü Golgi’ye götürür; Golgi değiştirir, sınıflandırır ve uygun hedefe paketler. Salgı vezikülü hücre zarıyla birleştiğinde içerik ekzositozla dışarı verilebilir. Şemadaki ‘Salgı proteininin yolunu izle’ düğmesi bu sırayı adımlandırır.",
        "Golgi proteinin amino asit zincirini sentezleyen yer değildir; o işi ribozom yapar. Bütün proteinler de Golgi yolundan geçmez: sitozolde kullanılacak pek çok protein serbest ribozomlarda sentezlenir. Granülsüz ER ise lipit/steroid sentezi, bazı maddelerin dönüştürülmesi ve kas hücresinde Ca²⁺ depolanması gibi işlerle ilişkilidir. Aynı ‘salgı’ sözcüğü her molekül için aynı üretim yolunu zorunlu kılmaz.",
      ],
    },
    {
      title: "Lizozom, peroksizom ve koful aynı işi yapmaz",
      paragraphs: [
        "Lizozomun hidrolitik enzimleri hücre içi sindirimde ve eskimiş yapıların geri dönüşümünde görev alır; kendi zarı bu ortamı sitoplazmadan ayırır. Bitkilerde benzer parçalayıcı görevler büyük ölçüde litik kofullarda yürütülür. Hücrede organellerin geri dönüştürülmesi otofajiyle ilişkilidir; bütün hücre ölümlerini yalnız ‘lizozom patladı’ açıklamasına indirme.",
        "Peroksizom oksidatif tepkimeler ve hidrojen peroksidin yönetimiyle ilişkilidir. Katalaz H₂O₂’yi su ve oksijene dönüştürebilir. Bu organeli ATP üreten mitokondri veya sindirim yapan lizozomla eşitleme. Düz ER de bazı detoks süreçlerine katıldığı için bir görev birden fazla yapıyla ilişkili olabilir; sorudaki enzim ve molekül ipucu belirleyicidir.",
        "Kofulların işi tek değildir: depolama, parçalama ve su dengesi gibi farklı görevler görülür. Bitkinin merkezî kofulu su ve çözünmüş maddeleri depolar; turgor desteğine katkı yapar. Tatlı suda yaşayan bazı protistlerin kontraktil kofulu fazla suyu ATP harcayarak uzaklaştırır. ‘Koful’ sözcüğünü görünce her hücre için aynı büyüklük ve görevi varsayma.",
      ],
    },
    {
      title: "Mitokondri ile kloroplast enerjiyi dönüştürür",
      paragraphs: [
        "Mitokondride oksijenli solunumun önemli basamakları gerçekleşir; ATP senteziyle kullanılabilir enerji aktarımı sağlanır. İç zar kıvrımları krista, iç sıvı bölge matrikstir. Kloroplastta fotosentezle ışık enerjisinin kimyasal enerjiye dönüşümü ve organik madde üretimi gerçekleşir; klorofil, tilakoit, granum ve stroma bu yapı bağlamında düşünülür. Her ikisinin kendi DNA, RNA ve ribozomları vardır ama bütün proteinlerini bağımsız üretemezler.",
        "Bitkiler de solunum yapar. Fotosentetik bir bitki hücresi hem kloroplast hem mitokondri taşıyabilir; kökteki birçok hücre kloroplast taşımaz ama mitokondri taşır. ATP yalnız mitokondride üretilmez: glikolizde sitozolde, fotosentezde kloroplastta da ATP sentezi vardır. Hücre enerji yaratmaz; dönüşüm ve aktarım yapar.",
        "Plastitler yalnız kloroplasttan ibaret değildir: kromoplastlar bazı renk pigmentleriyle, lökoplastlar depo göreviyle ilişkilidir. Her bitki rengi klorofil veya kromoplasttan gelmez; koful pigmentleri de olabilir. Bir yapının varlığına veya yokluğuna karar verirken canlı grubu, doku ve hücrenin özelleşmesini birlikte kullan.",
      ],
    },
    {
      title: "İskelet ve sentrozom: hareketin hücre içindeki düzeni",
      paragraphs: [
        "Hücre iskeleti mikrotübül, mikrofilament ve ara filament gibi protein yapıları kapsar. Şeklin korunması, hücre içi taşıma, hareket ve bölünmede farklı roller üstlenir. Mikrofilamentler aktinle, mikrotübüller tübülinle ilişkilidir. Bunlar kemik gibi sabit bir çerçeve değildir; hücre gereksinimine göre yeniden düzenlenebilir.",
        "Sentrozom birçok hayvan hücresinde mikrotübül düzenleme merkezidir; tipik olarak birbirine dik iki sentriyolle gösterilir. Gelişmiş bitki hücresinde tipik sentrozom olmaması iğ iplikleri veya hücre iskeleti olmadığı anlamına gelmez. Hücre iskeleti yaygın ağ, sentrozom bu ağın organizasyonuyla ilişkili özel bir bölgedir.",
      ],
    },
    {
      title: "Organel sorusunda kanıt zinciri kur",
      paragraphs: [
        "Sorudaki üç bilgiyi eşleştir: yapı hangi hücrede olabilir, zar sınıfı nedir, verilen olayı hangi mekanizmayla yapar? ‘Çift zar+DNA+ATP’ mitokondri ve kloroplast için ortak olabilir; ‘klorofil+fotosentez’ kloroplastı ayırır. ‘Tek zar+enzim’ tek başına lizozom demez; H₂O₂ ve katalaz peroksizomu düşündürür.",
        "Organel çokluğunu göreve göre yorumlamak yararlıdır: protein salgılayan hücrede granüllü ER ve Golgi, yoğun ATP ihtiyacında mitokondri gelişmiş olabilir. Ancak tek bir yapı çiziminden bütün hücrelerin sayısını veya zorunlu organel listesini çıkarma. Özelleşmiş olgun alyuvar gibi istisnaları tipik ökaryot planından ayrı düşün.",
      ],
    },
  ],
  examples: [
    {
      title: "Salgı proteininin iki durağı karıştırılmış",
      prompt:
        "Bir hücre protein yapılı enzimi dışarı salgılıyor. Ribozom, granüllü ER, Golgi, salgı vezikülü ve hücre zarını doğru ilişkilendir.",
      strategy: "Sentez, işleme, paketleme ve dışarı verme aşamalarını ayır.",
      steps: [
        {
          label: "Üretim ve ilk işleme",
          expression: "Ribozom → granüllü ER",
          explanation:
            "Zinciri ribozom sentezler; ürün ER’nin işleme/taşıma sistemine girer.",
        },
        {
          label: "Hedefe hazırlama",
          expression: "Taşıma vezikülü → Golgi → salgı vezikülü",
          explanation: "Golgi sınıflandırır ve uygun pakete yönlendirir.",
        },
        {
          label: "Hücre dışına verme",
          expression: "Vezikül + hücre zarı → ekzositoz",
          explanation: "Zarlar birleşir, içerik dışarı verilir.",
        },
      ],
      answer: "Ribozom–ER–Golgi–vezikül–zar sırası.",
      check: "Golgi’yi zinciri sentezleyen yer olarak göstermedik.",
      pitfall: "Bütün hücre proteinlerinin bu yolu kullandığını genelleme.",
    },
    {
      title: "Kök hücresi fotosentez yapmıyorsa",
      prompt:
        "Toprak altındaki tipik bitki kök hücresinde kloroplast görülmüyor. Bu hücrede mitokondri de bulunmaz mı?",
      strategy: "Fotosentez ile solunumun görevlerini ayır.",
      steps: [
        {
          label: "Kloroplastın yokluğu",
          explanation:
            "Her bitki hücresi fotosentetik değildir; birçok kök hücresi kloroplast taşımaz.",
        },
        {
          label: "ATP gereksinimi",
          explanation:
            "Canlı kök hücresi ATP kullanır; mitokondride solunum basamakları yürütülebilir.",
        },
      ],
      answer:
        "Mitokondri bulunabilir; kloroplastın yokluğu mitokondri yokluğu değildir.",
      check:
        "Bitki olmak, fotosentez yapan bir hücre olmak ve solunum yapmak ayrı kararlardır.",
      pitfall: "Bitkiler yalnız fotosentez yapar diye düşünme.",
    },
    {
      title: "Katalaz hangi yapıyı ayırt ettirir?",
      prompt:
        "Tek zarlı bir organelde H₂O₂’nin su ve oksijene dönüştürülmesi inceleniyor. En uygun organel hangisidir?",
      strategy: "Zar sayısının yanına verilen molekül ve enzimi koy.",
      steps: [
        {
          label: "Ortak özelliği daralt",
          explanation:
            "Tek zar; lizozom, peroksizom ve koful için ortak olabilir, tek başına yeterli değildir.",
        },
        {
          label: "Özgül kanıt",
          expression: "2H₂O₂ → 2H₂O + O₂",
          explanation:
            "Katalazla ilişkilendirilen bu dönüşüm peroksizom için ayırt edici ipucudur.",
        },
      ],
      answer: "Peroksizom.",
      check: "Soru hidrolitik sindirim veya ATP sentezinden söz etmiyor.",
      pitfall: "Bütün parçalama olaylarını lizozoma bağlama.",
    },
    {
      title: "Çift tabaka mı, çift zar mı?",
      prompt:
        "Hücre zarı iki fosfolipit katmanı içeriyor. Bu bilgi onu çekirdek gibi çift zarlı yapar mı?",
      strategy: "Aynı zarın katmanlarını, iki ayrı sınır zarından ayır.",
      steps: [
        {
          label: "Tek biyolojik zar",
          explanation:
            "Fosfolipitlerin iki katmanı bir biyolojik zarın temel yapısıdır.",
        },
        {
          label: "Çift zarlı organel",
          explanation: "Çekirdekte iç ve dış olmak üzere iki ayrı zar bulunur.",
        },
      ],
      answer:
        "Hayır. Hücre zarı bir biyolojik zardır; iki lipit katmanı içerir.",
      check:
        "Aynı ayrım tek zarlı lizozom ve çift zarlı mitokondri için de geçerlidir.",
      pitfall: "Katman sayısını organelin zar sayısı sanma.",
    },
  ],
  recall: [
    {
      prompt: "Çekirdeksiz hücre protein üretebilir mi?",
      answer:
        "Prokaryot hücre ribozomuyla üretir; olgun memeli alyuvarı gibi ribozomunu da kaybeden özel hücreyi bundan ayrı düşünmek gerekir.",
    },
    {
      prompt: "Golgi hangi işi ribozomdan devralmaz?",
      answer:
        "Amino asit zincirinin sentezini yapmaz; ürünlerin değiştirilmesi, sınıflanması ve paketlenmesiyle ilişkilidir.",
    },
    {
      prompt: "Gelişmiş bitkide tipik sentrozom yoksa iğ ipliği de yok mudur?",
      answer:
        "Hayır. Mikrotübüller başka biçimlerde düzenlenebilir; bitki hücrelerinde de bölünmede iğ iplikleri oluşur.",
    },
    {
      prompt: "Mitokondri hücrenin tek ATP üretim yeri midir?",
      answer:
        "Hayır; glikolizde sitozolde, fotosentezde kloroplastta da ATP sentezi olabilir. Mitokondri önemli bir dönüşüm merkezidir.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri PDF s.55–65 (basılı 53–63); Aurelia Hücre Organelleri s.1–4 ile karşılaştırılmış özgün açıklamalar, şema ve çözümler. Tipik hücre modeli ölçekli değildir; özelleşmiş hücre istisnaları ayrıca belirtilmiştir. Alıştırmalar resmî sınav sorusu değildir.",
};
