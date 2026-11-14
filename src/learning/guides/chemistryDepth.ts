import type { LessonGuide } from "./types";

export const molGuide: LessonGuide = {
  id: "mol",
  minutes: 45,
  objectives: [
    "Madde miktarını, tanecik türünü ve tanecik sayısını birbirinden ayır.",
    "Kütle–mol–tanecik dönüşümünü birimlerle kurup ters işlemle doğrula.",
    "Molekül, toplam atom, iyon ve formül birimi sayısını uygun katsayıyla hesapla.",
    "Bağıl kütle, bir taneciğin kütlesi ve molar kütleyi karıştırma; gaz hacminde koşulları denetle.",
  ],
  sections: [
    {
      title: "Mol, neyin sayıldığını söyleyen bir miktar birimidir",
      paragraphs: [
        "Bir düzine, neyin düzinesi olduğu belirtilirse anlam kazanır: bir düzine kalemle bir düzine kutunun sayısı aynı olsa da içerdikleri kalem sayısı farklı olabilir. Mol de madde miktarının SI birimidir. Güncel SI tanımında 1 mol, tam olarak 6,02214076×10²³ belirtilmiş temel varlık içerir. Ders hesaplarında soru farklı değer vermiyorsa Nₐ≈6,02×10²³ mol⁻¹ yaklaşımı kullanılır. Bu sayı bir gram veya bir litre değil, mol başına tanecik sayısıdır.",
        "‘1 mol oksijen’ ifadesinde atom mu molekül mü sayıldığı açık olmalıdır. 1 mol O atomu Nₐ tane atom, 1 mol O₂ molekülü Nₐ tane molekül ve 2Nₐ tane O atomu içerir. Eski kaynaklardaki karbon-12 temelli tanım tarihsel bağı gösterir; bugünkü tanım sabit Avogadro sayısına dayanır. Bir atomun gram cinsinden kütlesi çok küçüktür; çok büyük bir gram değeri bulduğunda üs işaretini ve mol/tanecik ayrımını yeniden kontrol et.",
      ],
    },
    {
      title: "Atom, molekül, iyon ve formül birimini ayır",
      paragraphs: [
        "He gibi tek atomlu bir örnekte sayılan temel varlık atomdur. H₂O veya CO₂ için moleküldür. NaCl gibi iyonik kristaller bağımsız NaCl moleküllerinden oluşuyormuş gibi anlatılmaz; en basit iyon oranını veren formül birimi kullanılır. ‘1 mol NaCl formül birimi’ ile ‘1 mol Na⁺ iyonu’ farklı ifadeler olsa da ideal formül oranı üzerinden ilişkilendirilebilir.",
        "Bir formül birimi NaCl’de bir Na⁺ ve bir Cl⁻ iyon oranını gösterir. Bu nedenle 1 mol formül biriminde toplam 2 mol iyon bulunur; bunu ‘1 mol NaCl iki mol NaCl’ diye söyleme. H₂O’da ise 1 mol molekül, 2 mol H atomu ve 1 mol O atomu içerir. Atomların moleküle bağlı bulunması, onları tek tek serbest atom hâline dönüştürdüğümüz anlamına gelmez. Sayma hesabı ile kimyasal türün gerçek bağlanma durumunu ayır.",
      ],
      table: {
        headers: [
          "Örnek",
          "1 molünde sayılan varlık",
          "İçerdiği toplam atom/iyon",
        ],
        rows: [
          ["He", "Nₐ atom", "1 mol He atomu"],
          ["O₂", "Nₐ molekül", "2 mol O atomu"],
          ["H₂O", "Nₐ molekül", "3 mol toplam atom"],
          ["NaCl", "Nₐ formül birimi", "1 mol Na⁺ + 1 mol Cl⁻ iyonu"],
        ],
      },
    },
    {
      title: "Molar kütleyi formülden oluştur",
      paragraphs: [
        "Molar kütle M, bir mol belirtilmiş maddenin kütlesidir ve burada g/mol ile kullanılır. Soru verilen atom kütleleriyle çözülür. H=1 ve O=16 g/mol alındığında M(H₂O)=2×1+16=18 g/mol; C=12 ve O=16 alındığında M(CO₂)=12+2×16=44 g/mol olur. Alt indis, ilgili atomun sayısını çarpar; 2CO₂ ifadesindeki dış katsayı ise molekül veya mol miktarını çarpar, bir CO₂’nin molar kütlesini değiştirmez.",
        "Parantez varsa dış alt indis parantezin içindeki bütün atomlara uygulanır. Örneğin Ca(OH)₂ için Ca=40, O=16, H=1 g/mol verildiğinde 40+2×(16+1)=74 g/mol hesaplanır. Çözerken önce formüldeki atom adetlerini aç, sonra kütleleri topla. Sonucun bir molün kütlesi mi, örneğin tamamının kütlesi mi olduğunu en son yeniden söyle; M ile m aynı nicelik değildir.",
      ],
    },
    {
      title: "Kütle, mol ve tanecik arasında birim köprüsü kur",
      paragraphs: [
        "Temel köprüler n=m/M ve N=nNₐ’dır. n mol miktarı, m gram cinsinden kütle, M g/mol cinsinden molar kütle, N ise belirtilmiş tanecik sayısıdır. Gramı g/mol’e bölmek mol verir; molü Nₐ ile çarpmak tanecik sayısını verir. Ters yönde n=N/Nₐ ve m=nM kullanılır. Tek bir uzun formülü ezberlemek yerine hangi niceliğin verildiğini ve hangisinin istendiğini yaz.",
        "36 g H₂O için n=36/(18 g/mol)=2 mol bulunur. Buradan molekül sayısı 2Nₐ’dır. Soru H atomu istiyorsa bir ek adım vardır: 2 mol molekül×2=4 mol H atomu, yani 4Nₐ H atomu. ‘Tanecik sayısı’ sözcüğünün neyi gösterdiğini atlamak, doğru hesap yapıp yanlış varlığı saymana neden olur. Sonucu geriye kontrol et: 2 mol×18 g/mol=36 g olmalıdır.",
      ],
    },
    {
      title: "Alt indisle miktarı çarp, yükle kimliği karıştırma",
      paragraphs: [
        "n mol XₐYᵦ molekülü için X atomu miktarı a·n mol, Y atomu miktarı b·n mol, toplam atom miktarı (a+b)n moldür. Örneğin 0,5 mol CO₂, 0,5 mol C ve 1 mol O atomu; toplam 1,5 mol atom içerir. Bu ifadede 0,5 mol CO₂ miktarı değişmez; molekülün içindeki atomlar farklı bir sayım düzeyinde sayılır.",
        "İyonun yükü, iyon adedini çarpan bir katsayı değildir. 1 mol Ca²⁺, Nₐ tane Ca²⁺ iyonudur; ‘2Nₐ tane iyon’ değildir. Elektron hesabı sorulursa yük, her iyon başına elektron farkını belirler ve ayrıca atom numarası bilgisi gerekir. İyonların tanecik sayısı, elementlerin atom sayısı ve elektron sayısı ayrı sorulardır. Soru hangi varlığı istediğini belirtmiyorsa belirsizliği gidermeden sayı üretme.",
      ],
    },
    {
      title: "Bağıl kütle ve tek taneciğin kütlesi",
      paragraphs: [
        "Bağıl atom kütlesi, atom kütlesinin karbon-12 atomunun kütlesinin 1/12’sine oranıdır; birimsizdir. Atomik kütle birimi u veya Da ise çok küçük gerçek kütleleri belirtmek için kullanılır; 1 u≈1,66×10⁻²⁴ g’dır. Bir taneciğin g cinsinden yaklaşık kütlesi, M/Nₐ ile bulunur. M=18 g/mol için bir H₂O molekülünün kütlesi yaklaşık 18/Nₐ gramdır; 18 gram değildir.",
        "Kütle numarası proton+nötron sayısıdır ve tam sayıdır; bağıl atom kütlesiyle aynı kavram değildir. İzotopların proton sayıları aynı, nötron ve kütle numaraları farklıdır. Doğal veya verilmiş bir örneğin ortalama atom kütlesi, izotop kütleleri ile bulunma oranlarının ağırlıklı ortalamasından gelir. Sonuç izotop kütleleri arasında ve daha bol olana yakın olmalıdır. Soru varsayımsal yüzdeler verirse onları gerçek doğal bolluk diye ezberleme.",
      ],
    },
    {
      title: "Gaz hacminde önce sıcaklık ve basıncı oku",
      paragraphs: [
        "Gazlar için molar hacim sıcaklık ve basınca bağlıdır. Bu derste ideal gaz yaklaşımıyla 0 °C ve 1 atm’de yaklaşık 22,4 L/mol; 25 °C ve 1 atm’de yaklaşık 24,5 L/mol kullanılır. Bazı kaynakların ‘normal’, ‘standart’ veya ‘oda’ adlandırmaları farklı olabilir; sayısal T ve P bilgisi esas alınır. Koşullar verilmeden her gaza ve her sıcaklığa 22,4 L/mol uygulama.",
        "Bu yaklaşım gaz hâli içindir. Aynı koşulda 1 mol buzun veya demirin hacmini 22,4 L sayamazsın; madde o koşulda gaz değildir. Aynı T ve P’de eşit hacimli ideal gazlar eşit mol ve eşit sayıda molekül/temel gaz taneciği içerir; kütlelerinin veya toplam atom sayılarının eşit olması gerekmez. Eşit hacimdeki He ve H₂ için tanecik sayısı aynı, toplam atom sayısı farklıdır.",
      ],
    },
    {
      title: "Oranı koru ve sonucu bağımsız yoldan kontrol et",
      paragraphs: [
        "Aynı madde için m ve n doğru orantılıdır; M sabittir. Aynı mol sayısı farklı maddelerde aynı kütleyi zorunlu kılmaz, çünkü M farklıdır. Karışımda toplam mol, bileşen mol miktarlarının toplamıdır; tanecik türü değişince her bileşenin atom içeriği ayrıca sayılmalıdır. Gereksiz yere Nₐ’nın bütün basamaklarını yazarak işlem uzatma: soru ‘Nₐ tane’ biçiminde cevap istiyorsa oranı sembolik tutmak daha nettir.",
        "Son kontrolde dört adım kullan: verilen kütleyle M uyumlu mu; birimler sadeleşince istenen birim kaldı mı; alt indis doğru atomu mu çarptı; hacim hesabında gaz hâli ve T/P koşulu uygun mu? Yanlış cevabın ardından sadece formülü tekrar yazmak yerine ilk bozulan bu adımı bul. Sonra aynı sayıları ezberlemeden başka maddeyle yeniden kur. Etkileşimli modelde tanecik türünü değiştirirken eşit molün hangi sayıyı sabit tuttuğunu gözle.",
      ],
    },
  ],
  examples: [
    {
      title: "36 gram suda neyi sayıyoruz?",
      prompt:
        "H=1 ve O=16 g/mol kabul ediliyor. 36 g H₂O kaç mol su molekülü ve kaç tane H atomu içerir? Nₐ’yı sembolik bırak.",
      strategy:
        "Önce örneğin molünü, sonra formül başına H sayısıyla atom miktarını bul.",
      steps: [
        {
          label: "Molar kütle",
          expression: "M(H₂O)=2×1+16=18 g/mol",
          explanation: "Alt indis her moleküldeki atom sayısına uygulanır.",
        },
        {
          label: "Örnek miktarı",
          expression: "n=36/18=2 mol H₂O",
          explanation: "Bu miktar 2Nₐ su molekülüdür.",
        },
        {
          label: "H atomu",
          expression: "n(H)=2×2=4 mol; N(H)=4Nₐ",
          explanation: "Her su molekülünde iki H atomu vardır.",
        },
      ],
      answer: "2 mol H₂O molekülü; 4Nₐ tane H atomu.",
      check: "2 mol×18 g/mol=36 g; toplam atom istenseydi 6Nₐ olurdu.",
      pitfall: "Molekül sayısını doğrudan H atomu sayısı diye yazma.",
    },
    {
      title: "Parantez içindeki bütün atomları çarp",
      prompt:
        "Ca=40, O=16 ve H=1 g/mol veriliyor. 0,5 mol Ca(OH)₂ kaç gramdır ve kaç mol O atomu içerir?",
      strategy:
        "Önce parantezi aç, sonra molar kütle ve atom hesabını ayrı yap.",
      steps: [
        {
          label: "Formül sayımı",
          expression: "Ca₁O₂H₂",
          explanation: "Parantezin dışındaki 2 hem O’ya hem H’ye uygulanır.",
        },
        {
          label: "Kütle",
          expression: "M=40+2×16+2×1=74 g/mol; m=0,5×74=37 g",
          explanation: "Örneğin kütlesi molar kütleyle aynı sayı değildir.",
        },
        {
          label: "O atomu",
          expression: "n(O)=0,5×2=1 mol",
          explanation: "İstenen yalnız O’dur; H ve Ca bu miktara eklenmez.",
        },
      ],
      answer: "37 g; 1 mol O atomu.",
      check: "37/74=0,5 mol formül birimi bulunarak geri dönülür.",
      pitfall: "Parantez dışındaki indisi sadece son H’ye uygulama.",
    },
    {
      title: "Gaz hacmini koşulla bağla",
      prompt:
        "0 °C ve 1 atm’de ideal gaz kabul edilen 11,2 L NH₃ örneği var. N=14 ve H=1 g/mol. Örneğin kütlesi ve içerdiği H atomu miktarı nedir?",
      strategy:
        "Verilen koşulda molar hacimden mol bul; sonra kütle ve H sayımına dallan.",
      steps: [
        {
          label: "Mol",
          expression: "n=11,2/22,4=0,5 mol",
          explanation: "22,4 L/mol burada belirtilmiş koşulla uyumludur.",
        },
        {
          label: "Kütle",
          expression: "M(NH₃)=17 g/mol; m=0,5×17=8,5 g",
          explanation: "Hacimden bulunan miktar, kütleye M ile çevrilir.",
        },
        {
          label: "H atomu",
          expression: "n(H)=3×0,5=1,5 mol",
          explanation: "Her molekül üç H atomu içerir.",
        },
      ],
      answer: "8,5 g NH₃; 1,5 mol H atomu.",
      check:
        "0,5 mol×22,4 L/mol=11,2 L. Aynı hacim 25 °C’de verilseydi bu ilk adımın değeri değişirdi.",
      pitfall: "Hacim formülünü sıcaklık ve basıncı okumadan kullanma.",
    },
    {
      title: "Varsayımsal izotop karışımının ortalaması",
      prompt:
        "Bir elementin varsayımsal örneğinde kütleleri 63 u ve 65 u kabul edilen izotoplar sırasıyla %80 ve %20 oranında bulunuyor. Ortalama atom kütlesi nedir?",
      strategy:
        "Yüzdeleri ağırlık olarak kullan; sonuç aralığını önceden belirle.",
      steps: [
        {
          label: "Ağırlıklı ortalama",
          expression: "63×0,80+65×0,20=63,4 u",
          explanation: "%80 ve %20’nin toplamı %100 olmalıdır.",
        },
        {
          label: "Anlam",
          explanation:
            "63,4 u örneğin ortalamasıdır; her atomun kütlesinin tam olarak 63,4 u olduğu anlamına gelmez.",
        },
      ],
      answer: "63,4 u.",
      check:
        "63 ile 65 arasında ve daha bol olan 63’e yakındır. Yüzdeler bu örneğe aittir; gerçek doğal bolluk iddiası değildir.",
      pitfall:
        "63 ve 65’in basit ortalaması olan 64’ü, oranlar eşit olmadığı hâlde kullanma.",
    },
    {
      title: "Bir molekülün kütlesi",
      prompt:
        "M(CO₂)=44 g/mol ve Nₐ≈6,02×10²³ mol⁻¹ kabul edilirse bir CO₂ molekülünün gram cinsinden kütlesi nasıl bulunur?",
      strategy: "Bir molün kütlesini bir moldeki molekül sayısına böl.",
      steps: [
        {
          label: "Tek taneciğe in",
          expression: "m(1 molekül)=44/(6,02×10²³) g",
          explanation: "44 gram bütün bir molün kütlesidir.",
        },
        {
          label: "Büyüklük",
          expression: "m≈7,31×10⁻²³ g",
          explanation:
            "Tek molekül kütlesinin çok küçük çıkması ölçek kontrolüdür.",
        },
      ],
      answer: "44/Nₐ gram, yaklaşık 7,31×10⁻²³ g.",
      check: "Bu kütleyi Nₐ ile çarpınca yeniden 44 g bulunur.",
      pitfall:
        "10²³ ile bölmeyi çarpmaya dönüştürüp makroskopik kütle elde etme.",
    },
  ],
  recall: [
    {
      prompt:
        "1 mol O atomu ile 1 mol O₂ molekülünde hangi sayı eşit, hangi atom sayısı farklıdır?",
      answer:
        "Belirtilmiş varlıkların sayısı Nₐ’dır; O₂ örneğinde toplam O atomu 2Nₐ, atom örneğinde Nₐ’dır.",
    },
    {
      prompt: "Mol hesabında M ile m’yi nasıl ayırırsın?",
      answer:
        "M bir molün kütlesi, g/mol; m belirli örneğin kütlesi, g. n=m/M bağıyla bağlanırlar.",
    },
    {
      prompt: "1 mol gaz neden her zaman 22,4 L değildir?",
      answer:
        "Molar hacim T/P koşuluna bağlıdır ve gaz/ideal gaz yaklaşımı gerekir; 22,4 L/mol burada yalnız 0 °C ve 1 atm için kullanılır.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri Mol Kavramı PDF s.63–65 / basılı s.61–63 okumasıyla karşılaştırılmış özgün açıklama ve çözümler. Eski karbon-12 tanımı güncel sabit Avogadro sayısı tanımından ayrılmış; kaynakta tek atom kütlesinin üssüne ilişkin dizgi hatası tekrarlanmamıştır. Gaz hesabında T/P açıkça belirtilir; resmî sınav sorusu değildir.",
};

export const equilibriumGuide: LessonGuide = {
  id: "kimyasal-denge",
  minutes: 55,
  objectives: [
    "Dengede eşit hız ile sabit derişimi birbirinden ayır.",
    "Net denklem ve faz bilgileriyle Kc/Kp bağıntısını yaz; Q ile yön tahmin et.",
    "Derişim, hacim/basınç, sıcaklık, inert gaz ve katalizör etkilerini koşullarıyla açıkla.",
    "Ani grafik değişimini yeni dengeye yaklaşmadan ayır; denklemi değiştirince K’nin nasıl dönüştüğünü göster.",
  ],
  sections: [
    {
      title: "Denge, olayların durması değildir",
      paragraphs: [
        "Kapalı ve koşulları sabit tutulan tersinir bir sistemde ileri ve geri dönüşümler birlikte sürebilir. Dengeye gelindiğinde iki yönün hızları eşitlenir; gözlenen makroskopik miktarlar sabit kalır. Bu, moleküler dönüşümlerin durduğu statik bir durum değildir. Kapalı kaptaki sıvı-buhar dengesi fiziksel, bağların dönüşmesiyle kurulan tersinir tepkime dengesi kimyasal örnektir.",
        "Dengede [A] ve [B] sabittir fakat eşit olmak zorunda değildir. Uygulamanın A ⇌ B modelinde kileri=0,6 ve kgeri=0,3 seçilmiştir: vileri=0,6[A], vgeri=0,3[B]. Eşit hız koşulu [B]/[A]=2 verir. Bu iki doğrusal hız yasası modelin açık varsayımıdır; her toplam tepkimede hız üslerinin katsayılara eşit olduğu genellenmez.",
      ],
    },
    {
      title: "Net denklemden Kc bağıntısını yaz",
      paragraphs: [
        "Lise düzeyindeki ideal derişim yaklaşımında aA+bB ⇌ cC+dD için Kc=[C]ᶜ[D]ᵈ/([A]ᵃ[B]ᵇ) yazılır; uygun gaz veya sulu çözeltideki türler ve denkleştirilmiş net denklem kullanılır. Örneğin N₂(g)+3H₂(g) ⇌ 2NH₃(g) için Kc=[NH₃]²/([N₂][H₂]³). Üsler türlerin molar kütlesi veya o anki mol miktarı değildir; dengeli net tepkimenin katsayılarıdır.",
        "Çok basamaklı bir mekanizmada denge bağıntısını yalnız yavaş basamağa göre yazma. Hız yasasının deneysel bulunması ile denge bağıntısının net denklemden kurulması ayrı işlerdir. Aynı zamanda belirli sıcaklık için tanımlanan K, tepkimenin yazılış biçimine bağlıdır. Daha genel termodinamik ifade etkinliklerle kurulsa da bu rehber verilen ideal derişim/kısmi basınç sorularının çerçevesinde kalır.",
      ],
    },
    {
      title: "Saf katı ve sıvıyı bağıntıda sabit say",
      paragraphs: [
        "Saf katı ve saf sıvı fazları, etkinlikleri sabit kabul edildiği için bu lise bağıntısında açık derişim terimi olarak yazılmaz. CaCO₃(k) ⇌ CaO(k)+CO₂(g) için Kc=[CO₂] olur. CaCO₃ veya CaO yazılmaması onların tepkimeye katılmadığı veya miktarlarının hiç değişmediği anlamına gelmez; yalnız denge bağıntısındaki rolleri sabittir.",
        "İlgili saf fazlar varlığını korurken yalnız katı miktarı eklemek denge bağıntısını değiştirmez. Ancak bir faz tamamen tükenirse aynı denge modelinin koşulları artık sağlanmayabilir. ‘Katı hiçbir koşulda etkisizdir’ diye genelleme yapma. Homojen denge aynı fazdaki, heterojen denge farklı fazlardaki türleri içerir; hacim etkisi için gaz türlerinin bulunması yeterli olabilir.",
      ],
    },
    {
      title: "K ile Q aynı bağıntının farklı zamanlardaki değeridir",
      paragraphs: [
        "K denge koşulundaki oranı, Q ise aynı biçimde hesaplanan herhangi bir anlık oranı belirtir. Q<K ise ürünlere doğru net dönüşüm, Q>K ise girenlere doğru net dönüşüm beklenir; Q=K denge koşuludur. K büyük olduğunda denge ürünler bakımından daha elverişli olabilir, fakat bu tepkimenin hızlı olduğunu veya tam verimle bittiğini söylemez. Hız ve denge farklı sorulardır.",
        "Karşılaştırmadan önce Q ve K’nin aynı sıcaklıkta, aynı tepkime yönü ve aynı bağıntı için verildiğini kontrol et. Ters tepkimenin K’sini ileri tepkimenin Q’siyle doğrudan karşılaştıramazsın. Net yön bilindikten sonra son miktarları bulmak için ayrıca stokiyometri, toplam miktar veya hacim bilgisi gerekir. Yön tahmini tek başına bütün yeni derişimleri vermez.",
      ],
    },
    {
      title: "Başlangıç–değişim–denge tablosu kur",
      paragraphs: [
        "Denge hesabında başlangıç değerlerini yaz, bir türdeki değişimi x ile seç ve diğer değişimleri tepkime katsayılarıyla ilişkilendir. A ⇌ B için A azalırken B aynı miktarda artabilir; 2A ⇌ B için aynı değişim oranı kullanılamaz. Elde edilen denge değerleri negatif olamaz ve verilen toplam/madde dengesiyle uyumlu olmalıdır.",
        "Uygulama modelinde toplam [A]+[B]=3 mol/L korunur ve Kc=2’dir. [B]=2[A] ile 3[A]=3, dolayısıyla [A]=1, [B]=2 mol/L bulunur. Sonucu iki ayrı koşulla denetle: toplam 3 mü ve oran 2 mi? Birini sağlamak ötekini otomatik sağlamaz. Gerçek tepkimelerde toplam mol sayısı her zaman korunmadığından bu modelin toplamını bütün denge sorularına aktarma.",
      ],
    },
    {
      title: "Derişim grafiğinde önce etki anını bul",
      paragraphs: [
        "Sabit sıcaklık ve hacimde tek bir tür eklenirse o türün derişimi etki anında aniden artar. Sonraki eğri, sistemin yeni dengeye net dönüşümle yaklaşmasıdır. Öteki türlerin derişimleri sırf tek madde eklendi diye aynı anda dikey sıçramaz; tepkime ilerledikçe değişir. Bir türün ortamdan çekilmesinde o türün ani düşüşü ile daha sonraki toparlanma ayrılır.",
        "Sıcaklık sabitse bu tür derişim müdahalesi K’yi değiştirmez; Q anlık değişir ve sistem aynı K’ye uyan yeni miktarlara yönelir. ‘Etkiyi azaltmak’, başlangıç değerinin her koşulda aynen geri gelmesi değildir. Maddelerin toplamı veya hacim de değişmiş olabilir. Grafik sorusunda dikey sıçrama, kademeli yaklaşma ve yeni yatay denge çizgisini ayrı işaretlemek yanlış eşitlikleri önler.",
      ],
    },
    {
      title: "Gaz basıncında toplam basınç ile kısmi basıncı ayır",
      paragraphs: [
        "Sabit sıcaklıkta hacim küçültülürse gazların derişimleri/kısmi basınçları etki anında artar. Denge, gaz katsayıları toplamı daha az olan tarafa yönelebilir. N₂+3H₂ ⇌ 2NH₃ örneğinde 4 mol gazdan 2 mol gaza giden ürün yönü desteklenir. İki taraftaki gaz katsayıları toplamı eşitse ideal yaklaşımda yalnız hacim değişiminin denge bileşimi üzerinde böyle bir kaydırıcı etkisi yoktur. Saf katı ve sıvı katsayıları gaz mol toplamına eklenmez.",
        "İnert gaz tepkimeye katılmaz, fakat kabın koşulu önemlidir. Sabit T ve V’de inert gaz eklemek toplam basıncı artırırken tepkime gazlarının kısmi basınçlarını değiştirmez; denge kaymaz. Sabit T ve toplam P’de pistonlu kaba eklenirse hacim artar, tepkime gazlarının kısmi basınçları azalır; uygun tepkimede daha çok gaz molü olan taraf desteklenir. ‘Basınç arttı’ sözü tek başına yeterli değildir: hangi basınç, hangi yolla ve hangi kapta?",
      ],
    },
    {
      title: "Sıcaklık hem dengeyi hem K’yi değiştirebilir",
      paragraphs: [
        "İleri yön endotermikse ısı alan, ekzotermikse ısı veren yöndür. Sıcaklık artırıldığında denge ısı alan yönü destekler: ileri yön endotermikse ürünler, ekzotermikse girenler lehine değişim beklenir. Aynı net tepkime için sıcaklık artarken K artıyorsa ileri yön endotermik; K azalıyorsa ileri yön ekzotermik olarak yorumlanır.",
        "Isı kavramını yön bulmak için giren veya ürün tarafında düşünmek yardımcıdır; fakat denge bağıntısına [ısı] diye bir derişim terimi yazılmaz. Sabit bir sıcaklıkta derişim, hacim veya katalizör K’yi değiştirmezken sıcaklık bu ayrı koşulu değiştirir. Enerjiyi azaltma ve düzensizliği artırma eğilimleri dengeyi açıklarken kullanılabilir; yalnız tanecik sayısını saymak evrensel tersinmezlik kanıtı değildir. Fazlar ve nicel termodinamik koşullar da önemlidir.",
      ],
    },
    {
      title: "Katalizör hızı değiştirir, denge oranını değil",
      paragraphs: [
        "Uygun katalizör ileri ve geri süreçlerin daha hızlı gerçekleşebileceği alternatif yol sağlar. Aynı sıcaklıkta denge sabiti ve denge bileşimini değiştirmez; dengeye ulaşmayı hızlandırır. Dengede de iki yönün hızı artabilir, fakat hızlar yine birbirine eşittir. Katalizörü yalnız ürün oluşturan yöne çalıştıran bir ‘denge kaydırıcı’ gibi kullanma.",
        "Uygulamanın basit modelinde iki hız sabiti aynı çarpanla artırılır; Kc=2 oranı ve son derişimler korunurken yaklaşma eğrisi hızlanır. Bu oran değiştirmeme, seçili modelin güvenli gözlemidir. Grafikte derişimlerin sonlu zamanlı ve yuvarlanmış değerleri tam matematiksel dengeyle karıştırılmaz. Ürüne daha çabuk ulaşmak ile denge veriminin artması farklı ifadelerdir.",
      ],
    },
    {
      title: "Tepkimeyi değiştirirsen K’yi de dönüştür",
      paragraphs: [
        "Denklem ters çevrilirse yeni K=1/Keski olur. Bütün katsayılar r ile çarpılırsa yeni K=(K_eski)^r; iki tepkime toplanarak net denklem elde edilirse uygun yön ve katsayı dönüşümleri yapıldıktan sonra denge sabitleri çarpılır. Örneğin A ⇌ B için K=4, B ⇌ C için K=3 ise A ⇌ C için K=12’dir.",
        "Bir denklemin katsayılarını değiştirmek aynı kimyasal sistemin bağıntısını farklı yazmaktır; sıcaklığı değiştirmekle aynı işlem değildir. Ara türler toplamada sadeleşmelidir. Çarpmadan önce her denklem hedef yönde mi ve katsayıları istenen kadar mı, kontrol et. K’yi tepkime katsayısıyla çarpmak yerine üs almak gerektiğini unutma.",
      ],
    },
    {
      title: "Kp ile Kc arasındaki gaz köprüsü",
      paragraphs: [
        "İdeal gaz yaklaşımında Kp=Kc(RT)^Δn kullanılır. Δn, ürünlerdeki gaz katsayıları toplamı eksi girenlerdeki gaz katsayıları toplamıdır; o andaki rastgele mol miktarları değildir. T mutlak sıcaklık yani Kelvin olmalı, R kullanılan basınç/hacim birimleriyle uyumlu seçilmelidir. Örneğin N₂(g)+3H₂(g) ⇌ 2NH₃(g) için Δn=2−4=−2, dolayısıyla Kp=Kc/(RT)² olur.",
        "Gaz katsayıları toplamları eşitse Δn=0 ve bu modelde Kp=Kc olur. Ancak Kp yalnız gaz türlerinin kısmi basınçlarını kullanırken Kc uygun gaz/çözünmüş tür derişimlerini kullanır. Denklemde bir katı bulundu diye Δn hesabına onun katsayısını katma. İşaretin ters seçilmesi RT çarpanını pay ve payda arasında yanlış taşır; son kontrolün denklemde gazları tek tek saymak olsun.",
      ],
    },
  ],
  examples: [
    {
      title: "Derişimler eşit olmadan denge",
      prompt:
        "Sabit hacimde A ⇌ B modeli için Kc=2 ve dengede [A]+[B]=3 mol/L. Denge derişimleri nedir?",
      strategy: "Oran ve toplamı iki ayrı denklem olarak kullan.",
      steps: [
        {
          label: "Oran",
          expression: "[B]/[A]=2 → [B]=2[A]",
          explanation: "K bu 1:1 denklem için yazılmıştır.",
        },
        {
          label: "Toplam",
          expression: "[A]+2[A]=3 → [A]=1 mol/L",
          explanation: "Toplamın korunduğu soruda ayrıca verilmiştir.",
        },
        {
          label: "İkinci tür",
          expression: "[B]=2 mol/L",
          explanation: "Sabit fakat farklı derişimler dengeyle uyumludur.",
        },
      ],
      answer: "[A]=1, [B]=2 mol/L.",
      check:
        "Toplam 3; oran 2. Eşit olan derişimler değil ileri/geri hızlardır.",
      pitfall: "Toplamı ikiye bölüp [A]=[B]=1,5 yazma.",
    },
    {
      title: "Q’dan yön bul, son miktarı uydurma",
      prompt:
        "N₂(g)+3H₂(g) ⇌ 2NH₃(g) için belirli sıcaklıkta Kc=2. Anlık [N₂]=1, [H₂]=2, [NH₃]=2 mol/L. Sistem hangi net yöne ilerler?",
      strategy: "Net denklemden aynı biçimde Q hesapla ve K ile karşılaştır.",
      steps: [
        {
          label: "Denge kesri",
          expression: "Q=[NH₃]²/([N₂][H₂]³)=4/8=0,5",
          explanation:
            "H₂’nin katsayısı 3 olduğundan derişimi üçüncü kuvvetle alınır.",
        },
        {
          label: "Karşılaştır",
          expression: "Q=0,5 < K=2",
          explanation: "Oran ürünlere net dönüşümle K’ye yaklaşır.",
        },
      ],
      answer: "Ürünler yani NH₃ oluşumu yönüne net ilerleme.",
      check:
        "Son [NH₃] miktarı yalnız yön bilgisinden çıkarılamaz; ayrıca değişim hesabı gerekir.",
      pitfall:
        "K>Q’yu ‘K büyür’ diye okuma; sabit sıcaklıkta değişen anlık Q’dur.",
    },
    {
      title: "Saf katıyı dışarıda bırakırken koşulu koru",
      prompt:
        "CaCO₃(k) ⇌ CaO(k)+CO₂(g) dengesinde iki katı faz da mevcut. Sabit sıcaklık ve hacimde yalnız CaCO₃ katısı ekleniyor. Kc bağıntısı ve beklenen denge etkisi nedir?",
      strategy:
        "Fazları belirle, saf katıları bağıntıya katma, faz varlığı koşulunu kontrol et.",
      steps: [
        {
          label: "Bağıntı",
          expression: "Kc=[CO₂]",
          explanation:
            "Saf katı fazların etkinlikleri bu yaklaşımda sabit kabul edilir.",
        },
        {
          label: "Müdahale",
          explanation:
            "Katı fazlar varken yalnız saf katı eklemek Q’yu ve sıcaklığı değiştirmez; yeni denge kayması beklenmez.",
        },
      ],
      answer:
        "Kc=[CO₂]; verilen koşulda yalnız katı eklenmesi dengeyi kaydırmaz.",
      check:
        "Katı tamamen tükenmiş olsaydı aynı faz varlığı koşulu sağlanmayabilirdi.",
      pitfall:
        "Bağıntıda katı yazılmamasını ‘katı tepkimeye girmez’ diye yorumlama.",
    },
    {
      title: "Üs mü, çarpım mı, ters mi?",
      prompt:
        "A ⇌ B için K₁=4 ve B ⇌ C için K₂=3, aynı sıcaklıkta veriliyor. 2C ⇌ 2A tepkimesinin denge sabiti nedir?",
      strategy: "Önce topla, sonra ters çevir, sonra katsayıları ikiyle çarp.",
      steps: [
        {
          label: "Topla",
          expression: "A ⇌ C; K=4×3=12",
          explanation: "Ara tür B sadeleşir.",
        },
        {
          label: "Ters çevir",
          expression: "C ⇌ A; K=1/12",
          explanation: "Hedef yön C’den A’ya doğrudur.",
        },
        {
          label: "Katsayıları çarp",
          expression: "2C ⇌ 2A; K=(1/12)²=1/144",
          explanation: "Katsayı çarpanı K’ye üs olur.",
        },
      ],
      answer: "1/144.",
      check: "Ters yöndeki 2A ⇌ 2C için K=144 olmalı; çarpımları 1’dir.",
      pitfall:
        "K’yi 2 ile çarpma; bütün katsayılar 2 ile çarpıldığında K’nin karesi alınır.",
    },
    {
      title: "Aynı gaz, farklı kap koşulu",
      prompt:
        "X(g) ⇌ 2Y(g) dengesi sabit sıcaklıkta. Tepkimeye girmeyen inert gaz, bir kapta sabit hacimde; başka bir kapta sabit toplam basınç altında ekleniyor. Hangi durumda kayma beklenir?",
      strategy:
        "Toplam basıncı değil, tepkime gazlarının kısmi basınçlarını izle.",
      steps: [
        {
          label: "Sabit hacim",
          explanation:
            "X ve Y’nin kısmi basınçları değişmez; denge kayması beklenmez.",
        },
        {
          label: "Sabit toplam basınç",
          explanation:
            "Piston hareketiyle hacim artar, X ve Y kısmi basınçları azalır. Daha çok gaz molü olan ürün yönü desteklenir.",
        },
      ],
      answer:
        "Sabit V’de kayma yok; sabit toplam P’de hacim artışıyla ürün yönü desteklenir.",
      check:
        "Sıcaklık aynı olduğundan iki durumda da bu net denklem için K değişmez.",
      pitfall:
        "İnert gaz her kapta aynı etkiyi yapar veya her basınç artışı dengeyi kaydırır genellemelerini kullanma.",
    },
  ],
  recall: [
    {
      prompt:
        "Dengede hangi iki hız eşittir; hangi derişimler eşit olmak zorunda değildir?",
      answer:
        "İleri ve geri tepkime hızları eşittir. Farklı türlerin denge derişimleri sabittir fakat birbirine eşit olmak zorunda değildir.",
    },
    {
      prompt:
        "Katalizör, sıcaklık ve hacimden hangisi aynı net tepkimenin K değerini değiştirebilir?",
      answer:
        "Sıcaklık. Katalizör yaklaşma hızını, hacim sabit sıcaklıkta Q ve bileşimi etkileyebilir; K’yi değiştirmez.",
    },
    {
      prompt: "Saf katı neden K’de yazılmaz ve hangi sınır unutulmamalıdır?",
      answer:
        "Saf fazın etkinliği sabit kabul edilir; tepkimeye katılmadığı anlamına gelmez ve ilgili fazların varlığını koruduğu koşulu kontrol edilir.",
    },
  ],
  source:
    "MEBİ AYT Kimya Konu Özetleri Kimyasal Denge PDF s.70–75 / basılı s.68–73 doğrudan okumasına dayalı özgün rehber. Net denklem/hız yasası, saf faz varlığı, inert gazın kap koşulu ve ideal derişim sınırları açıklanmıştır. Kaynak kavramları evrensel tersinmezlik veya bütün mekanizmalarda katsayı=hız üssü gibi aşırı genellemelere dönüştürülmez; örnekler resmî sınav sorusu değildir.",
};

export const chemistryDepthGuides = [molGuide, equilibriumGuide];
