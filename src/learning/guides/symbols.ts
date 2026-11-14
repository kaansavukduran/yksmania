import type { LessonGuide } from "./types";
export const symbolsGuide: LessonGuide = {
  id: "sembolik-dil",
  minutes: 40,
  objectives: [
    "Atom, element, molekül, bileşik ve karışımı karşı örnekleriyle ayır.",
    "Element adını doğru sembolle, yaygın bileşik adını doğru formülle eşleştir.",
    "Alt indis, parantez ve katsayıyı kapsamına göre okuyup atomları say.",
    "Formülden çıkarılabilecek bilgiyle ek ölçüm gerektiren bilgiyi ayır.",
  ],
  sections: [
    {
      title: "Görünenden tanecik modeline geç",
      paragraphs: [
        "Kimyanın sembolik dili, gözle gördüğümüz maddeleri atom ve tanecik düzeyinde ortak bir gösterimle anlatır. Atom, elementin kimyasal kimliğini taşıyan birimdir; hangi element olduğu proton sayısıyla belirlenir. Bir element örneği aynı proton sayılı atomlardan oluşur. Aynı elementin atomlarının nötron sayıları farklı olabilir; bu ayrıntı atomun yapısı konusunda incelenir.",
        "Element, bileşik ve karışım ayrı sınıflardır. Element tek element türü içerir; bileşik farklı elementlerin sabit oranlı kimyasal birleşimidir. Karışımda maddeler değişebilir oranlarda bir aradadır. Bileşikler saf maddedir; karışımlar saf madde değildir. Saf sözcüğü ‘zararsız’, ‘doğal’ veya ‘içilebilir’ anlamına gelmez.",
      ],
    },
    {
      title: "Molekül olmak ile bileşik olmak aynı şey değil",
      paragraphs: [
        "Molekül, belirli sayıda atomun bağlanmasıyla oluşan ayrı bir taneciktir. O₂ iki oksijen atomlu bir molekül olduğu halde tek element türü taşıdığı için elementtir. H₂O molekülünde hem hidrojen hem oksijen bulunduğundan bileşiktir. He tek atomlu element örneğidir; her element molekül halinde bulunmaz.",
        "NaCl katısında ayrı NaCl molekülleri yerine iyonlardan oluşan geniş bir örgü bulunur. Formül birimi Na⁺ ile Cl⁻ sayılarının 1:1 oranını gösterir. Bu nedenle ‘bütün bileşikler moleküllerden oluşur’ ifadesi doğru değildir. İyon elektrik yükü taşıyan atom veya atom grubudur. Bağın ayrıntısını sonraki konuya bıraksan da molekül ve formül birimini ayırabilirsin.",
      ],
    },
    {
      title: "Sembolü harf harf doğru oku",
      paragraphs: [
        "Sembolde ilk harf büyük, varsa ikinci harf küçüktür. Co kobalt elementinin sembolüdür; CO ise karbon ve oksijen içeren karbonmonoksitin formülüdür. Al içindeki ikinci karakter küçük l’dir. İki harfli bir sembol iki element veya iki atom anlamına gelmez. Sembolü Türkçe adın ilk harfinden tahmin etme; sodyum Na, potasyum K, azot N ile gösterilir.",
        "Bir formülde büyük harf yeni sembolün başlangıcını belirtir. CaCO₃, Ca–C–O olarak ayrılır; C–a–C–O diye değil. Sembollerin yazımını değiştirmek aynı maddeyi farklı biçimde yazmak değildir; bazen başka bir maddeye, bazen geçersiz bir gösterime geçmektir.",
      ],
      table: {
        headers: ["Element", "Sembol", "Element", "Sembol"],
        rows: [
          ["Hidrojen", "H", "Sodyum", "Na"],
          ["Helyum", "He", "Magnezyum", "Mg"],
          ["Lityum", "Li", "Alüminyum", "Al"],
          ["Berilyum", "Be", "Silisyum", "Si"],
          ["Bor", "B", "Fosfor", "P"],
          ["Karbon", "C", "Kükürt", "S"],
          ["Azot", "N", "Klor", "Cl"],
          ["Oksijen", "O", "Argon", "Ar"],
          ["Flor", "F", "Potasyum", "K"],
          ["Neon", "Ne", "Kalsiyum", "Ca"],
        ],
      },
    },
    {
      title: "Yakın sembolleri karşılaştırarak öğren",
      paragraphs: [
        "Mg magnezyum, Mn mangandır; Ca kalsiyum, Cu bakırdır; S kükürt, Sn kalaydır; P fosfor, Pb kurşundur. Tek bir benzer harfe bakmak yerine iki harfi birlikte eşleştir. Fe demir, Ag gümüş, Au altın ve Hg cıvadır. Bir sembolün atom numarasını bilmek ayrı bilgidir; semboldeki harf sayısından atom numarası bulunmaz.",
        "Sembolü gördüğünde önce adı söyle, adı gördüğünde sembolü yaz; sonra karşılaştır. Yalnız tabloyu tanımakla geri çağırabilmek aynı şey değildir. Aşağıdaki formül modelinde katsayıyı değiştirip element türlerinin değişmediğini gözle.",
      ],
    },
    {
      title: "Alt indis, parantez ve katsayının görevi",
      paragraphs: [
        "Alt indis, hemen önündeki sembolün bir tanecikteki atom sayısını belirtir. H₂O’da iki H ve bir O vardır; yazılmayan indis 1’dir. Parantezden sonraki indis parantezin içindeki her atoma uygulanır. Ca(OH)₂ içinde Ca=1, O=2 ve H=2 bulunur; toplam 5 atom, 3 element türü vardır.",
        "Formülün önündeki katsayı bütün formülü çarpar. 3H₂O üç su molekülüdür: H=6, O=3, toplam 9 atom. Element türü sayısı yine 2’dir. 3H₂O ile H₂O₃ aynı gösterim değildir. Bir tepkimeyi denkleştirirken katsayıyı değiştirebilirsin; alt indisi değiştirmek maddenin kimliğini değiştirir.",
        "(NH₄)₂SO₄ için önce parantez: N=2 ve H=8. Ardından dışarıdaki S=1 ve O=4 eklenir. Toplam 15 atom, 4 element türü vardır. Öndeki bir 2 katsayısı bu sayıların her birini ikiye katlar, tür sayısını değiştirmez.",
      ],
    },
    {
      title: "Yaygın adları formülle birlikte hatırla",
      paragraphs: [
        "Sistematik ad, bileşiğin türü veya bileşimi hakkında düzenli bilgi verir; yaygın ad ise tarihsel veya günlük kullanımdan gelebilir. Azot trihidrür adı NH₃’e ve yaygın adı amonyağa karşılık gelir. Bu tek örneği bütün iyonik ve moleküler bileşiklere uygulanabilen bir adlandırma kuralı sanma; ayrıntılı adlandırma sonraki konudur.",
        "Günlük ürün ile ideal saf bileşiği ayır. Tuz ruhu ticari kullanımda HCl’nin sulu çözeltisidir; çözeltinin tamamı saf HCl değildir. Sirke, asetik asit içeren bir karışımdır; saf asetik asit CH₃COOH ile gösterilir. Kolonya ve hava gibi karışımların bütününe ait tek bir sabit kimyasal formül yoktur.",
      ],
      table: {
        headers: ["Formül", "Yaygın ad"],
        rows: [
          ["H₂O", "Su"],
          ["HCl", "Tuz ruhu (sulu çözelti adı)"],
          ["H₂SO₄", "Zaç yağı"],
          ["HNO₃", "Kezzap"],
          ["CH₃COOH", "Sirke asidi / asetik asit"],
          ["CaCO₃", "Kireç taşı"],
          ["NaHCO₃", "Yemek sodası"],
          ["NH₃", "Amonyak"],
          ["Ca(OH)₂", "Sönmüş kireç"],
          ["NaOH", "Sud kostik"],
          ["KOH", "Potas kostik"],
          ["CaO", "Sönmemiş kireç"],
          ["NaCl", "Yemek tuzu"],
        ],
      },
    },
    {
      title: "Formül neyi söyler, neyi söylemez?",
      paragraphs: [
        "Bir bileşik formülü element türlerini ve oranlarını gösterir. H₂O’daki atom sayısı oranı H:O=2:1’dir. Bu oran kütle oranı değildir. Kütle bulmak için atom kütleleri de gerekir; H≈1 ve O≈16 kullanılırsa H:O kütle oranı 2:16=1:8 olur. Sayı ile kütleyi karıştırmak farklı büyüklükleri eşit sanmaktır.",
        "Formül tek başına bir örnekte kaç gram madde olduğunu, bütün fiziksel özellikleri veya ticari ürünün saflığını vermez. Alt indis görerek örneğin toplam atom sayısını hesaplayabilmek için kaç tanecik bulunduğu da bilinmelidir. İleride mol kavramı bu bağı kurar. İyon yükü üstte sağda, atom sayısı altta sağda gösterilir; Ca²⁺, +2 yüklü bir kalsiyum iyonunu, CaCl₂ ise başka bir bileşiğin formülünü anlatır.",
      ],
    },
    {
      title: "Soru çözümünde dört kontrol",
      paragraphs: [
        "Önce ne istendiğini belirle: element adı, element türü sayısı, bir tanecikteki atom sayısı veya bütün örnekteki atom sayısı mı? Sonra büyük harflerden sembolleri ayır. Parantez ve alt indisleri bir birime uygula. En son katsayıyla bütün birimleri çarp. Türleri sayarken aynı sembolü bir kez; atomları sayarken bütün tekrarları hesaba kat.",
        "Sonucu küçük bir örnekle geri denetle. 2CO₂ için C=2 ve O=4, toplam 6 atom ama yalnız 2 tür vardır. Üç kez O yazıldığını görüp üç element var deme; aynı sembol her yerde aynı elementtir. Tepkimenin iki tarafında atom sayısı korunurken molekül sayısı her zaman korunmak zorunda değildir.",
      ],
    },
  ],
  examples: [
    {
      title: "Co ile CO’yu ayır",
      prompt: "Co ve CO gösterimlerinde element türü ve madde sınıfı aynı mı?",
      strategy: "Önce büyük ve küçük harfleri oku; sonra sembolleri ayır.",
      steps: [
        {
          label: "Co",
          explanation:
            "Büyük C’yi küçük o izliyor; birlikte tek sembol, kobalttır.",
          expression: "Co → tek element türü",
        },
        {
          label: "CO",
          explanation:
            "C ve O iki ayrı büyük harfle başlar; karbon ve oksijen içerir.",
          expression: "CO → C₁O₁ → iki element türü",
        },
        {
          label: "Sınıflandır",
          explanation:
            "Co element; CO farklı elementleri sabit oranla içerdiği için bileşiktir.",
        },
      ],
      answer: "Aynı değiller: Co element, CO bileşiktir.",
      check:
        "İki gösterimde de iki harf bulunması aynı tanecik anlamına gelmez.",
      pitfall:
        "Büyük–küçük harfi görsel ayrıntı sanma; bu ayrım kimyasal kimliği belirler.",
    },
    {
      title: "Katsayı parantezin tamamına uygulanır",
      prompt:
        "2Al₂(SO₄)₃ gösteriminde Al, S ve O atom sayılarını ve element türü sayısını bul.",
      strategy: "Önce bir formül birimini çözümle, en son katsayıyı uygula.",
      steps: [
        {
          label: "Bir formül birimi",
          explanation: "Al’nin indisi 2. SO₄ grubunun tamamı üç kez bulunur.",
          expression: "Al=2; S=1×3=3; O=4×3=12",
        },
        {
          label: "İki formül birimi",
          explanation: "Öndeki 2 bütün atom sayılarını çarpar.",
          expression: "Al=4; S=6; O=24",
        },
        {
          label: "Toplam ve tür",
          explanation:
            "Atomları topla, birbirinden farklı sembolleri ayrı say.",
          expression: "4+6+24=34 atom; {Al,S,O} → 3 tür",
        },
      ],
      answer: "Al=4, S=6, O=24; toplam 34 atom, 3 element türü.",
      check: "Bir birimde 17 atom vardı; iki birimde 34 olması gerekir.",
      pitfall:
        "Katsayıyı yalnız Al’ye veya parantez indisini yalnız O’ya uygulama.",
    },
    {
      title: "Ürün ile saf maddeyi ayır",
      prompt:
        "Bir şişe sirkenin etiketinde asetik asit ve su yazıyor. Şişenin tüm içeriği CH₃COOH formülüyle saf bileşik diye gösterilebilir mi?",
      strategy: "Bileşenin kimliği ile örneğin tamamını ayır.",
      steps: [
        {
          label: "Bileşeni tanı",
          explanation: "CH₃COOH, asetik asidin formülüdür; C, H ve O içerir.",
        },
        {
          label: "Bütün örneğe bak",
          explanation:
            "Şişede su da vardır. Birden çok madde bulunduğundan örnek karışımdır.",
        },
        {
          label: "Gösterimin sınırını kur",
          explanation:
            "Karışımın değişen oranları tek bir saf madde formülüyle anlatılmaz.",
        },
      ],
      answer:
        "Hayır. Formül asetik asit bileşenini gösterir; sirkenin tamamı karışımdır.",
      check:
        "Saf asetik asit ile asetik asit içeren çözelti aynı örnek değildir.",
      pitfall: "Günlük ürün adını duyunca bütün içeriği tek bileşik sanma.",
    },
    {
      title: "Atom oranından kütle oranına",
      prompt:
        "H≈1 ve O≈16 atom kütleleriyle, H₂O’daki hidrojenin oksijene atom sayısı ve kütle oranını karşılaştır.",
      strategy: "Her atomun sayısı ile kendi kütlesini ayrı çarp.",
      steps: [
        {
          label: "Sayı oranı",
          explanation: "Bir su molekülünde 2 H ve 1 O atomu vardır.",
          expression: "H:O atom sayısı = 2:1",
        },
        {
          label: "Kütle katkıları",
          explanation:
            "Her türün atom sayısını verilen bağıl atom kütlesiyle çarp.",
          expression: "H katkısı 2×1=2; O katkısı 1×16=16",
        },
        {
          label: "Oranı sadeleştir",
          explanation: "2:16 oranı ortak 2’ye bölünür.",
          expression: "H:O kütle oranı = 1:8",
        },
      ],
      answer: "Sayı oranı 2:1, kütle oranı 1:8.",
      check:
        "Tek O atomu iki H atomundan daha ağırdır; sayı çoğunluğu kütle çoğunluğu değildir.",
      pitfall: "Alt indisleri doğrudan gram veya kütle oranı diye yorumlama.",
    },
  ],
  recall: [
    {
      prompt: "O₂ neden molekül ama bileşik değil?",
      answer:
        "Bağlı iki atomla ayrı molekül oluşturur; ikisi de oksijen olduğundan tek element türü vardır. Bileşik farklı element türleri gerektirir.",
    },
    {
      prompt: "3Ca(OH)₂ için toplam atom ve tür sayısı kaç?",
      answer:
        "Bir birimde Ca₁O₂H₂: 5 atom, 3 tür. Katsayıyla 15 atom olur; tür sayısı 3 kalır.",
    },
    {
      prompt: "NaCl formülü neden zorunlu olarak bir molekül göstermez?",
      answer:
        "İyonik katıda iyon örgüsü vardır; NaCl formül birimi iyon sayılarının en sade 1:1 oranını gösterir.",
    },
    {
      prompt: "Bir karışımın tek bir sabit formülü neden yok?",
      answer:
        "Bileşenler farklı oranlarda bulunabilir. Bir bileşenin formülü karışımın tamamını tanımlamaz.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, PDF s.16–17 / basılı s.14–15; Aurelia Kimyanın Sembolik Dili kopya kağıdı, PDF s.1–9. Molekül–formül birimi ve saf bileşik–ticari çözelti ayrımları açık tutuldu. Örnekler ve çözümler özgündür.",
};
