import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, WorkedExample } from "./guides/types";

export type NucleicKind = "DNA" | "RNA";
export type StandardBase = "A" | "G" | "C" | "T" | "U";
export const baseNames: Record<StandardBase, string> = {
  A: "Adenin",
  G: "Guanin",
  C: "Sitozin",
  T: "Timin",
  U: "Urasil",
};
export function nucleotideIdentity(
  kind: NucleicKind,
  base: StandardBase,
  phosphate: boolean,
) {
  if ((kind === "DNA" && base === "U") || (kind === "RNA" && base === "T"))
    throw new Error("NONSTANDARD_CELLULAR_BASE");
  return {
    sugar: kind === "DNA" ? "Deoksiriboz" : "Riboz",
    group:
      base === "A" || base === "G"
        ? "Pürin · iki halka"
        : "Pirimidin · bir halka",
    unit: phosphate ? "Nükleotit" : "Nükleozit",
    identity: `${baseNames[base]} ${kind === "DNA" ? "deoksiribo" : "ribo"}${phosphate ? "nükleotidi" : "nükleozidi"}`,
  };
}
export function dnaSequenceStats(sequence: string) {
  if (!/^[ATGC]+$/.test(sequence) || sequence.length > 1000)
    throw new Error("DNA_SEQUENCE_SCOPE");
  const pair: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
  const AT = [...sequence].filter(
    (base) => base === "A" || base === "T",
  ).length;
  const GC = sequence.length - AT;
  return {
    complement: [...sequence].map((base) => pair[base]).join(""),
    pairs: sequence.length,
    totalNucleotides: 2 * sequence.length,
    AT,
    GC,
    hydrogenBonds: 2 * AT + 3 * GC,
    linearPhosphodiesterBonds: 2 * (sequence.length - 1),
    wholeBases: { A: AT, T: AT, G: GC, C: GC },
  };
}
export const rnaRoles = [
  {
    id: "mRNA",
    name: "Mesajcı RNA",
    cargo: "Genetik bilgi",
    role: "DNA’dan aktarılan bilgiyi ribozomda okunacak kalıp olarak taşır. Üçlü baz dizilerine kodon denir; amino asidi fiziksel olarak taşıyan RNA değildir.",
  },
  {
    id: "tRNA",
    name: "Taşıyıcı RNA",
    cargo: "Uygun amino asit",
    role: "Uygun amino asidi ribozoma getirir. Antikodon bölgesi mRNA kodonuyla ilişki kurar. Kendi üzerine katlanan bazı bölgelerinde hidrojen bağları bulunabilir; tek zincirli olmak hiç eşleşme kurmamak değildir.",
  },
  {
    id: "rRNA",
    name: "Ribozomal RNA",
    cargo: "Ribozomun yapı ve işlevi",
    role: "Proteinlerle birlikte ribozomun yapısına katılır; peptit bağının oluşumundaki katalitik işlevi destekler. Ribozomu yalnız proteinden veya yalnız RNA’dan oluşmuş sayma.",
  },
] as const;
const question = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
): Question => ({
  id,
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
  skill: "nukleik-asitler",
});
const worked = (
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

export const nucleicAcidsGuide: LessonGuide = {
  id: "nukleik-asitler",
  minutes: 65,
  objectives: [
    "Baz, pentoz, fosfat, nükleozit ve nükleotiti birbirinden ayırıp bir molekül kur.",
    "DNA/RNA’nın standart şeker ve bazlarını, pürin/pirimidin sınıflarını karşılaştır.",
    "Omurgadaki fosfodiesterle karşılıklı bazların hidrojen bağlarını ayrı say.",
    "Baz eşitliklerini yalnız verilen zincir koşulunda kullan; RNA görevlerini neyin taşındığına göre tanı.",
  ],
  sections: [
    {
      title: "Önce büyük molekülden yapı taşına in",
      paragraphs: [
        "Nükleik asitler, DNA ve RNA’nın ortak adıdır. Bunlar nükleotit adı verilen birimlerin belirli sırayla bağlanmasından oluşan polimerlerdir; yapılarında C, H, O, N ve P bulunur. Nükleotit monomer, çok sayıda nükleotidin bağlandığı zincir polinükleotittir. Baz harfleri bütün molekül değil, her yapı taşının bir parçasını gösterir.",
        "Hücresel çerçevede DNA kalıtsal bilginin saklanması ve aktarılmasıyla, RNA türleri bu bilginin kullanılmasındaki farklı görevlerle ilişkilidir. Aynı dört çeşit yapı taşını kullanmak bilgilerin aynı olduğu anlamına gelmez; sayı ve özellikle diziliş değişebilir. Sözcüklerde aynı harflerle farklı anlamlar kurulması bir benzetmedir; genetik kodun bütün mekanizmasının bu benzetmeyle açıklandığı sanılmamalıdır.",
      ],
    },
    {
      title: "Üç parçayı birleştir: baz, şeker, fosfat",
      paragraphs: [
        "Bir nükleotitte azotlu organik baz, beş karbonlu şeker yani pentoz ve fosfat grubu vardır. Baz + şeker birleşimine nükleozit denir; fosfat eklenince nükleotit olur. Fosfat yoksa o birime nükleotit demek eksiktir. Modelde fosfatı kaldırıp ekleyerek diğer iki parçanın aynı kaldığı hâlde birimin adının neden değiştiğini gözlemle.",
        "Baz ile şeker arasında glikozit, şeker ile fosfat arasında fosfoester bağı incelenir. Bunlar bir nükleotidin bileşenleri arasındaki bağlantılardır. Daha sonra birçok nükleotidin omurgada bağlanması başka bir sayımdır. Bir nükleotitteki bağlarla zincirdeki komşu nükleotit bağlantılarını aynı listeye yazıp iki kez sayma. Fosfat grupları nükleik asitlerin asidik özelliğine katkı verir.",
      ],
    },
    {
      title: "Aynı adenin, farklı nükleotit: şekeri kontrol et",
      paragraphs: [
        "DNA’nın pentozu deoksiriboz, RNA’nınki ribozdur. İkisi de beş karbonludur; deoksiribozda riboza göre bir oksijen daha azdır. Basitleştirilmiş çizimde 2′ konumunda DNA için H, RNA için OH gösterilmesi bu farkı görünür kılar. Çizim atomların gerçek üç boyutlu yerleşimini veya bağ uzunluklarını ölçekli vermez.",
        "Adenin bazı iki molekülde de bulunabilir; ama DNA adenin nükleotidi ile RNA adenin nükleotidi aynı bütün değildir. Birinde deoksiriboz, ötekinde riboz bulunur. Kimliği yalnız bazın adına göre seçme: fosfatı, şekeri ve bazı birlikte karşılaştır. Modelde A’yı koruyup DNA/RNA seçimini değiştirdiğinde şekerin ve birimin tam adının değişmesini bu nedenle izliyorsun.",
      ],
    },
    {
      title: "Bazları iki farklı ölçütle sınıflandır",
      paragraphs: [
        "Adenin (A) ve guanin (G) çift halkalı pürin; sitozin (C), timin (T), urasil (U) tek halkalı pirimidindir. Halka sayısı bazın sınıfını gösterir, nükleotidin DNA’ya mı RNA’ya mı ait olduğunu tek başına her zaman göstermez. A, G ve C temel hücresel DNA/RNA karşılaştırmasında ortaktır.",
        "Standart karşılaştırmada DNA A, T, G, C; RNA A, U, G, C kullanır. Bu nedenle DNA ve RNA’nın dörder standart nükleotit çeşidi vardır; baz adları toplam beş olmasına rağmen şeker farkı nedeniyle toplam sekiz ayrı standart nükleotit çeşidi kurulabilir. Kimyasal değişime uğramış bazlar veya farklı viral genomlar soruda ayrıca verilirse, bu dersin standart hücresel şemasını kör bir ‘asla’ kuralına dönüştürme.",
      ],
      table: {
        headers: ["Ölçüt", "DNA", "RNA"],
        rows: [
          ["Şeker", "Deoksiriboz", "Riboz"],
          ["Standart bazlar", "A, T, G, C", "A, U, G, C"],
          ["Pürinler", "A, G", "A, G"],
          ["Pirimidinler", "T, C", "U, C"],
          [
            "Nükleotit çeşidi",
            "4",
            "4; A/G/C taşıyanların şekeri DNA’dakinden farklı",
          ],
        ],
      },
    },
    {
      title: "Zincir omurgası ile iki zincirin arasını ayır",
      paragraphs: [
        "Bir polinükleotit zincirinde komşu nükleotitler şeker-fosfat omurgasında fosfodiester bağlarıyla bağlanır. Tamamlayıcı çift zincirli DNA’da karşılıklı bazlar arasında hidrojen bağları bulunur: A–T çiftinde iki, G–C çiftinde üç. ‘Hangi iki parça bağlanıyor?’ sorusu, bağın adını ayırt etmeyi kolaylaştırır: aynı zincirin omurgası mı, karşılıklı bazlar mı?",
        "İki zincirin uç yönleri terstir; bu düzen antiparaleldir. Bir üst zincir soldan sağa 5′→3′ yazılmışsa alt zincir aynı hizayla 3′→5′ yazılır. Üstteki her A karşısına T, T karşısına A, G karşısına C, C karşısına G gelir. Tamamlayıcı alt zincirin ayrıca 5′→3′ dizisi isteniyorsa onu ters yönde okumak gerekir; yalnız uç etiketlerini değiştirip harfleri aynı sırada bırakamazsın.",
      ],
    },
    {
      title: "A = T eşitliğini bütün moleküle ve doğru koşulla uygula",
      paragraphs: [
        "Standart, tamamlayıcı çift zincirli DNA’nın tümünde A sayısı T’ye, G sayısı C’ye eşittir. Böylece A+G = T+C ve toplam pürin = toplam pirimidin olur. Ancak dört bazın birbirine eşit olması gerekmez. Bu eşitlikler tek bir zincirin kendi içinde zorunlu değildir; dengesiz üst zinciri karşı zincir tamamlar.",
        "Tek zincirli RNA için A = U veya G = C eşitliğini kendiliğinden kurma. Yalnız A sayısı verilmişse U sayısı çoğu kez belirlenemez; dizi veya ek ilişki gerekir. Bazlar aynı miktarda bulunsa bile dizilişlerinin aynı olduğu da söylenemez. Modelde DNA’dan RNA’ya geçtiğinde karşı ikinci zincirin kaldırılması bu koşul değişimini gösterir; RNA’nın hiç katlanamadığı iddiasını göstermez.",
      ],
    },
    {
      title: "Üç sayı, üç farklı hesap: nükleotit, baz çifti, hidrojen bağı",
      paragraphs: [
        "Çift zincirli DNA’da N toplam nükleotit varsa N/2 baz çifti vardır. A–T çifti adedi x, G–C çifti adedi y ise x+y=N/2 ve toplam hidrojen bağı H=2x+3y olur. Çiftin içindeki iki bazı tekrar ayrı çift gibi sayma. Tüm moleküldeki G sayısı, G–C çifti sayısına eşittir; G ile C’yi toplayınca çift sayısını iki kez saymış olursun.",
        "Hesabı denetlemek için H’nin baz çifti sayısının iki ile üç katı arasında kalmasını bekle. Aynı baz çifti uzunluğunda G–C oranı arttıkça bu modelde H bağı artar. Buna karşılık yalnız daha çok H bağı bulunmasından bir DNA’nın kesin daha uzun olduğu çıkmaz; baz çiftlerinin türleri de etkiler. Erime davranışı gibi daha ileri yorumlarda uzunluk ve ortam koşulları da önemlidir.",
      ],
    },
    {
      title: "Fosfodiester sayısında uçları ve topolojiyi unutma",
      paragraphs: [
        "Açık uçlu doğrusal tek zincirde n nükleotit, komşuları bağlayan n−1 fosfodiester bağlantısı oluşturur. İki açık uçlu doğrusal DNA zincirinin toplam N nükleotidi varsa her zincirin bağlantısını toplarız: N−2. Bu formül karşılıklı bazların hidrojen bağlarını saymaz ve bir nükleotidin içindeki glikozit bağını da bu sayıya katmaz.",
        "Kovalent olarak tamamen kapalı halkasal bir zincirde son nükleotit ilkine de bağlandığından n bağlantı olur; iki kapalı zincirli bir DNA’da toplam N bağlantı bulunur. Soru doğrusal mı, halkasal mı, açık uç mu diyor önce bunu işaretle. Tek nükleotitlik açık zincirde komşu bağlantısı 0 olması, yapı taşının kendi içinde hiçbir bağının olmadığı anlamına gelmez.",
      ],
    },
    {
      title: "RNA türlerini neyin taşındığı ve hangi işin yapıldığıyla tanı",
      paragraphs: [
        "mRNA mesajcı RNA’dır: DNA’dan aktarılan bilgi ribozomda okunacak kalıp olarak kullanılır; üçlü baz dizilerine kodon denir. tRNA taşıyıcı RNA’dır: uygun amino asidi ribozoma getirir ve antikodonu aracılığıyla kodonla ilişki kurar. ‘Taşır’ sözü tek başına yeterli değil; taşınan şey genetik bilgi mi, amino asit mi diye sor.",
        "rRNA ribozomal RNA’dır; proteinlerle birlikte ribozomun yapı ve işlevine katılır. Peptit bağının kurulmasında katalitik katkısı vardır; ribozomu yalnız proteinden oluşan bir yapı sayma. RNA’lar çoğunlukla tek zincirli olmakla birlikte tRNA örneğinde olduğu gibi kendi üzerlerine katlanıp bazı tamamlayıcı bölgelerinde hidrojen bağları kurabilir. Böyle bir bölgenin bulunması tüm RNA boyunca A=U/G=C zorunluluğu oluşturmaz.",
        "Kaynakta verilen yaklaşık rRNA %80, tRNA %15 ve mRNA %5 dağılımı ders düzeyinde genel bir şemadır; her hücre türünün her koşulda aynı kesin oranları taşıdığı varsayılmaz. Ayrıntılı kodon tablosu, protein sentezinin bütün evreleri ve replikasyon enzimleri ayrı derslerde ilerletilir. Burada üç RNA’nın ayırt edici görevini ve birbirinin yerine geçmediğini açıklayabilmelisin.",
      ],
    },
    {
      title: "Molekülün yerini hücre türüyle birlikte düşün",
      paragraphs: [
        "Ökaryotlarda çekirdek DNA’sının yanında mitokondride ve fotosentetik hücrelerin kloroplastlarında da DNA bulunabilir. Bakteri ve arkelerde zarla çevrili çekirdek yoktur; DNA bu nedenle yok olmuş sayılmaz. Hücrenin veya organelin özelleşmesiyle organizmanın bütünü hakkında genelleme kurma; örneğin her bitki hücresinde kloroplast aranmaz.",
        "RNA, ökaryotlarda çekirdek ve sitoplazmada, ayrıca ribozom yapısında bulunabilir; prokaryotlarda da RNA ve ribozom vardır. Hücresel RNA sentezini DNA’dan bilginin kullanılması bağlamında öğreniriz. Bu çerçeveyi bütün virüslerin genomu ve çoğalma yolu hakkında ‘her zaman DNA’ veya ‘RNA hiçbir yolla çoğaltılamaz’ gibi evrensel hükümlere dönüştürme.",
      ],
    },
    {
      title: "Soruda önce koşulu, sonra kısa yolu seç",
      paragraphs: [
        "Şeker veya T/U verilmişse kimlik belirlemeye, çift zincir ve yüzde verilmişse tamamlayıcı baz sayımına, H bağı istenmişse baz çiftlerini ayrı saymaya başla. Bağ sayısı sorusunda molekülün topolojisini ve hangi bağın sorulduğunu yaz. Bir işlem kısa olabilir ama geçerlilik koşulunu atlama hakkı vermez.",
        "Yanlış bir iddiayı düzeltirken üç aşama kullan: gerçek karşı örnek göster, doğru kuralı koşuluyla söyle, başka bir duruma uygula. ‘RNA’da H bağı olmaz’ için katlanmış tRNA karşı örneği; ‘aynı A, aynı nükleotit’ için riboz/deoksiriboz farkı kullanılır. Bu bölümdeki tahmin ve etkileşimler öğretim desteğidir; bağımsız doğrular ve konu tamamlanması olarak kaydedilmez.",
      ],
    },
  ],
  examples: [
    worked(
      "A bazını koru, bütünü yeniden adlandır",
      "Fosfat ve adenin bazı aynı bırakılıyor; bir nükleotidin deoksiribozu ribozla değiştiriliyor. Birimin kimliği aynı kalır mı?",
      "Üç bileşeni ayrı karşılaştır; bir ortak parçadan bütüne atlama.",
      [
        {
          label: "Ortaklar",
          explanation: "Adenin bazı ve fosfat grubu korunur.",
        },
        {
          label: "Ayırıcı parça",
          explanation:
            "Pentoz değişir: deoksiriboz DNA, riboz RNA nükleotidini tanımlar.",
        },
        {
          label: "Bütün",
          explanation:
            "Baz ortak olsa da üç parçalı bütün aynı değildir; adenin deoksiribonükleotidinden adenin ribonükleotidine geçilir.",
        },
      ],
      "Hayır; DNA ve RNA adenin nükleotitleri şekerleri nedeniyle farklıdır.",
      "Fosfat da çıkarılırsa yeni sınıf nükleozit olur; iki bağımsız değişimi karıştırma.",
      "Sadece A harfinin aynı olması bütün nükleotidi eşitlemez.",
    ),
    worked(
      "Hizadaki eş ile ters yönde okumayı ayır",
      "Üst DNA zinciri soldan sağa 5′–ACGTTA–3′. Karşı zinciri aynı hizada ve ayrıca kendi 5′→3′ yönünde yaz.",
      "Önce her baza eşini koy, sonra uç yönlerini denetle.",
      [
        {
          label: "Eşleşme",
          explanation:
            "A→T, C→G, G→C, T→A, T→A, A→T; aynı sütunlarda TGCAAT olur.",
        },
        {
          label: "Uçlar",
          explanation:
            "Antiparalel alt zincir aynı hizayla 3′–TGCAAT–5′ yazılır.",
        },
        {
          label: "Ters okuma",
          explanation:
            "Alt zincirin 5′ ucu sağdadır; kendi 5′→3′ yönünde okuyunca TAACGT elde edilir.",
        },
      ],
      "Aynı hiza: 3′–TGCAAT–5′. Kendi yönü: 5′–TAACGT–3′.",
      "Altı sütunun her birinde A–T veya G–C bulunduğunu tekrar kontrol et.",
      "Yalnız 3′ ve 5′ etiketlerini değiştirmek, harf sırasını ters okumak değildir.",
    ),
    worked(
      "Baz sayısından hidrojen bağına",
      "Tamamlayıcı çift zincirli bir DNA toplam 1600 nükleotit taşıyor. Bunların 480’i adenin ise toplam hidrojen bağı kaçtır?",
      "A=T, G=C koşulunu bütün moleküle uygula; çiftleri tek kez say.",
      [
        {
          label: "A–T tarafı",
          expression: "A=T=480",
          explanation: "480 adenin, 480 timinle 480 A–T çifti kurar.",
        },
        {
          label: "Kalan",
          expression: "G+C=1600−960=640; G=C=320",
          explanation:
            "G ile C’nin toplamı çift sayısı değildir; G–C çift sayısı 320’dir.",
        },
        {
          label: "Bağlar",
          expression: "H=2×480+3×320=1920",
          explanation: "İki çift türünün katsayılarını ayrı uygula.",
        },
        {
          label: "Denetim",
          expression: "480+320=800 baz çifti",
          explanation:
            "Toplam nükleotit 2×800=1600 olur; H, 1600–2400 aralığındadır.",
        },
      ],
      "1920 hidrojen bağı.",
      "Dört bazın toplamı 480+480+320+320=1600; baz çiftleri yalnız 800’dür.",
      "1600’ü doğrudan 2 veya 3 ile çarpmak toplam nükleotidi çift sayısı sanmaktır.",
    ),
    worked(
      "Omurga bağlantısı ile H bağını ayrı say",
      "İki açık uçlu doğrusal DNA zincirinin her birinde 6 nükleotit var. Molekül 3 A–T ve 3 G–C çifti taşıyor. Omurgadaki komşu fosfodiester ve bazlar arası H bağı sayıları nedir?",
      "İki bağ türü için iki ayrı sayım yap.",
      [
        {
          label: "Omurga",
          expression: "2×(6−1)=10",
          explanation:
            "Her doğrusal açık zincirde altı birim arasında beş komşu bağlantı vardır.",
        },
        {
          label: "Karşı bazlar",
          expression: "2×3+3×3=15",
          explanation:
            "Altı baz çifti iki türdedir; H bağları iki zincirin arasındadır.",
        },
        {
          label: "Sınır",
          explanation:
            "İki zincir tamamen kapalı halkasal olsaydı omurga bağlantısı 12 olurdu. Topoloji verilmeden N−2 sonucu taşınmaz.",
        },
      ],
      "10 komşu fosfodiester bağlantısı ve 15 H bağı.",
      "Toplam 12 nükleotit olmasına rağmen iki bağ sayısı da 12 olmak zorunda değildir.",
      "Nükleotidin içindeki glikozit bağını omurgadaki komşu bağlantı sayısına ekleme.",
    ),
    worked(
      "Tek RNA’da eşitlik için karşı örnek",
      "Bir tek zincirli RNA’nın 8 nükleotidinden 3’ü A. Başka veri olmadan U sayısının 3 olduğu kesin midir?",
      "Aynı verilenleri sağlayan iki farklı geçerli dizi kur.",
      [
        {
          label: "İlk olasılık",
          explanation:
            "AAAUUGCC dizisinde A=3, U=2 ve toplam 8 nükleotit vardır.",
        },
        {
          label: "İkinci olasılık",
          explanation:
            "AAAUUUCG dizisinde yine A=3 ve toplam 8; fakat U=3’tür.",
        },
        {
          label: "Sonuç",
          explanation:
            "Verilenler iki farklı U sayısına izin verdiği için sonuç tek değerle belirlenemez. Çift zincirli DNA koşulu burada yoktur.",
        },
      ],
      "Kesin değildir; U sayısı için ek bilgi gerekir.",
      "Her iki örneğin A ve toplam sayısını tek tek say; farkın yalnız kuralı çürütmeye yetecek ölçüde olduğunu gör.",
      "RNA katlanabilir diye bütün bazları zorunlu eşit saymak da aynı hatayı üretir.",
    ),
    worked(
      "‘Taşıma’ sözcüğünü nesnesiyle oku",
      "Bir hücresel süreçte X, DNA’dan aktarılan bilgiyi okunacak kalıp olarak ribozoma getiriyor; Y uygun amino asidi taşıyor; Z ribozomda proteinlerle birlikte yapısal ve katalitik görev alıyor. X, Y ve Z nedir?",
      "Her birinde neyin taşındığını veya hangi yapıya katıldığını ayır.",
      [
        { label: "Bilgi", explanation: "Okunacak kalıp taşıyan X, mRNA’dır." },
        {
          label: "Yapı taşı",
          explanation:
            "Amino asit taşıyan Y, tRNA’dır; antikodonu kodonla ilişki kurar.",
        },
        {
          label: "Ribozom",
          explanation:
            "Proteinlerle birlikte ribozom yapısı ve peptit bağı oluşumu bağlamındaki Z, rRNA’dır.",
        },
      ],
      "X=mRNA, Y=tRNA, Z=rRNA.",
      "‘Amino asit’ ve ‘genetik bilgi’ yer değiştirse iki taşıyıcı RNA’nın seçimi de değişirdi.",
      "Her ‘taşıma’ ifadesini aynı RNA türüyle eşleştirme.",
    ),
  ],
  recall: [
    {
      prompt: "Fosfatı çıkarınca nükleotidin hangi sınıfı kalır?",
      answer:
        "Baz + şeker, yani nükleozit. Fosfatı olmayan bu birime nükleotit denmez.",
    },
    {
      prompt: "Neden DNA’daki A ile RNA’daki A nükleotitleri aynı değildir?",
      answer:
        "Baz ve fosfat ortak olabilir; DNA nükleotidi deoksiriboz, RNA nükleotidi riboz taşır.",
    },
    {
      prompt: "H=2x+3y denkleminde x ve y nükleotit mi sayar?",
      answer:
        "Hayır; x A–T çifti, y G–C çifti adedidir. Toplam nükleotit 2(x+y)’dir.",
    },
    {
      prompt: "Tek zincirli RNA’da hiç H bağı yok mu?",
      answer:
        "Bu genelleme yanlıştır. tRNA gibi RNA’lar kendi üzerine katlanan bazı tamamlayıcı bölgelerde H bağı kurabilir; bu, bütün RNA için A=U eşitliği de kurdurmaz.",
    },
    {
      prompt: "N−2 fosfodiester sayısı her DNA için geçerli mi?",
      answer:
        "Hayır. Toplam N nükleotitli, iki açık uçlu doğrusal zincir varsayımı gerekir; kovalent kapalı halka farklı sayılır.",
    },
  ],
  source:
    "Aurelia TYT Biyoloji Nükleik Asitler DNA ve RNA kopya kağıdı, PDF s.1–9; MEBİ AYT Biyoloji Konu Özeti Bölüm 2, PDF s.32–36 / basılı s.152–156 doğrudan okunan metinleriyle karşılaştırılan özgün öğretim. TYT kapsamı için temel birim, karşılaştırma, RNA rolleri ve koşullu bağ/baz hesabı seçildi. Kaynaklardaki ÖSYM atıfları burada yeni bir resmî soru doğrulaması sayılmaz. Ayrıntılı replikasyon ve protein sentezi ayrı derslerdir.",
};
const nucleicQuestions: Question[] = [
  question(
    "nuc-1",
    "Bir yapı adenin ve riboz içeriyor, fosfat içermiyor. Bu yapı için doğru adlandırma hangisidir?",
    [
      "DNA adenin nükleotidi",
      "Fosfolipit",
      "Nükleozit",
      "Tam bir RNA polimeri",
      "Deoksiriboz nükleotidi",
    ],
    2,
    "Nükleotit için gereken üç parçanın hepsi var mı?",
    "Baz + şeker nükleozittir. Fosfat bulunmadığından yapı nükleotit değildir. Ribozun bulunması onu tek başına uzun bir RNA polimerine de dönüştürmez.",
  ),
  question(
    "nuc-2",
    "Adenin bazı taşıyan standart DNA ve RNA nükleotitleri karşılaştırılıyor. Hangi açıklama doğrudur?",
    [
      "Bazları aynı olsa da pentozları farklıdır.",
      "İkisi de deoksiriboz taşıdığı için bütünüyle aynıdır.",
      "DNA nükleotidinde fosfat bulunmaz.",
      "RNA nükleotidinde azotlu baz bulunmaz.",
      "Ortak baz adı bütün molekül özelliklerini eşitler.",
    ],
    0,
    "Bazı değil, baz + şeker + fosfat bütününü karşılaştır.",
    "DNA adenin nükleotidi deoksiriboz, RNA adenin nükleotidi riboz taşır. Baz ve fosfat ortak olabilir; ancak şeker değiştiği için nükleotitlerin bütünü aynı değildir.",
  ),
  question(
    "nuc-3",
    "Hangi seçenekte yalnız çift halkalı pürin bazları verilmiştir?",
    [
      "Timin ve urasil",
      "Sitozin ve timin",
      "Adenin ve sitozin",
      "Guanin ve urasil",
      "Adenin ve guanin",
    ],
    4,
    "A–G ile C–T–U sınıflarını halka sayısına göre ayır.",
    "Adenin ve guanin pürindir ve çift halkalıdır. Sitozin, timin ve urasil tek halkalı pirimidinlerdir. DNA/RNA ortaklığı ile pürin/pirimidin ölçütü farklıdır.",
  ),
  question(
    "nuc-4",
    "Tamamlayıcı çift zincirli bir DNA toplam 800 nükleotit içeriyor. Bunların 160’ı timin ise toplam hidrojen bağı kaçtır?",
    ["800", "1040", "1280", "1600", "2400"],
    1,
    "Önce A=T, sonra toplamdan kalan G+C’yi ikiye böl; H hesabında çiftleri say.",
    "A=T=160. G+C=800−320=480, G=C=240. Molekülde 160 A–T ve 240 G–C çifti vardır. H=2×160+3×240=1040. Çift sayısı 400, nükleotit sayısı 800’dür.",
  ),
  question(
    "nuc-5",
    "Tek zincirli bir RNA 300 nükleotit içeriyor ve bunların 120’si A. U sayısı hakkında başka bilgi verilmiyor. Hangi sonuç zorunludur?",
    [
      "U=120",
      "U=150",
      "G=C=30",
      "U sayısı tek bir değerle belirlenemez.",
      "RNA hiç hidrojen bağı kuramaz.",
    ],
    3,
    "Tamamlayıcı ikinci zincir veya U’yu belirleyen ek ilişki verildi mi?",
    "Tek RNA’da A=U zorunluluğu yoktur. Kalan 180 nükleotidin U, G, C dağılımı verilmediğinden U tek değerle bulunamaz. RNA’nın katlanıp bazı bölgelerde H bağı kurabilmesi de bütün baz sayılarını eşitlemez.",
  ),
  question(
    "nuc-6",
    "Bir DNA zinciri aynı yatay hizada soldan sağa 5′–AGTC–3′ yazılmıştır. Tamamlayıcı alt zincir aynı hizada hangisidir?",
    ["3′–TCAG–5′", "5′–TCAG–3′", "3′–AGTC–5′", "5′–UCAG–3′", "3′–TCUG–5′"],
    0,
    "DNA’nın baz eşleşmesini ve iki zincirin ters uçlarını birlikte koru.",
    "A karşısına T, G karşısına C, T karşısına A, C karşısına G gelir: TCAG. Antiparalel alt zincirin soldaki ucu 3′ olduğundan aynı hizayla 3′–TCAG–5′ yazılır. RNA’daki U burada kullanılmaz.",
  ),
  question(
    "nuc-7",
    "Bir RNA türü uygun amino asidi ribozoma getiriyor ve antikodon bölgesi mRNA kodonuyla ilişki kuruyor. Bu RNA hangisidir?",
    [
      "mRNA; yalnız DNA bilgisini saklar",
      "rRNA; yalnız amino asit taşır",
      "DNA; şekerinin adı ribozdur",
      "mRNA; ribozomun tek yapı maddesidir",
      "tRNA; amino asit taşıma ve antikodon görevi vardır",
    ],
    4,
    "Taşınan genetik mesaj mı, amino asit mi?",
    "Uygun amino asidi taşıyan ve antikodonu bulunan molekül tRNA’dır. mRNA okunacak kalıp bilgisini taşır; rRNA proteinlerle ribozomun yapısına ve katalitik işlevine katılır.",
  ),
  question(
    "nuc-8",
    "İki açık uçlu doğrusal DNA zincirinin her biri 100 nükleotitten oluşuyor. Yalnız aynı zincirdeki komşu nükleotitleri bağlayan toplam fosfodiester bağlantısı kaçtır?",
    ["99", "100", "198", "200", "300"],
    2,
    "Her açık zincirde son birimin ardından yeni bir komşu bulunmadığını düşün.",
    "Her doğrusal zincirde n−1=99 komşu bağlantı vardır. İki zincirde toplam 2×99=198 olur. Bu sayı H bağları veya nükleotitlerin içindeki glikozit bağlarıyla toplanmaz; kapalı halkaya da aynı formül taşınmaz.",
  ),
  question(
    "nuc-9",
    "Çift zincirli bir DNA’da yalnız karşılıklı bazlar arasındaki hidrojen bağlarının ayrıldığı, omurganın kovalent bağlarının korunmuş olduğu belirtiliyor. Hangi yorum uygundur?",
    [
      "Bütün nükleotitler bileşenlerine ayrılmak zorundadır.",
      "Her iki zincirin kendi nükleotit sırası korunabilir; omurga ile karşı baz etkileşimi farklıdır.",
      "Glikozit bağlarının tümü mutlaka kopmuştur.",
      "Fosfodiester bağları hidrojen bağıyla aynı bağdır.",
      "DNA bu nedenle riboz taşımaya başlar.",
    ],
    1,
    "Değiştirildiği verilen bağ türünü, değişmediği belirtilen bağ türüyle karıştırma.",
    "Bazlar arası H bağlarının ayrılması iki zincirin eşleşmesini bozar; omurga korunuyorsa zincirlerdeki nükleotit sırası bu işlemle zorunlu olarak parçalanmaz. Şekerin riboz olması veya glikozit bağlarının kopması verilmemiştir.",
  ),
  question(
    "nuc-10",
    "Standart DNA ve RNA’nın dörder nükleotit çeşidinden birer tane kurulan bir çalışma seti hazırlanıyor. Bu sekiz birim için gereken şeker ve baz dağılımı hangisidir?",
    [
      "8 riboz; T ve U hiç yok",
      "8 deoksiriboz; A yalnız bir kez",
      "4 riboz, 4 deoksiriboz; bütün beş baz eşit sayıda",
      "4 riboz, 4 deoksiriboz; A/G/C ikişer, T/U birer",
      "2 riboz, 2 deoksiriboz; toplam 4 birim",
    ],
    3,
    "DNA’nın dört ve RNA’nın dört bazını şekerleriyle ayrı ayrı yaz.",
    "DNA için A,T,G,C taşıyan dört deoksiribozlu; RNA için A,U,G,C taşıyan dört ribozlu birim kurulur. Böylece A,G,C iki kez; T,U bir kez kullanılır. Her birimde fosfat da vardır; ortak A adı iki farklı şekeri aynı yapmaz.",
  ),
];
export const nucleicAcidsLesson: Lesson = {
  id: nucleicAcidsGuide.id,
  subjectId: "tyt-biyoloji",
  title: txt("Nükleik asitler: DNA ve RNA’yı kur ve karşılaştır"),
  minutes: nucleicAcidsGuide.minutes,
  objectives: nucleicAcidsGuide.objectives.map(txt),
  body: nucleicAcidsGuide.sections.map((section) => ({
    title: txt(section.title),
    text: txt(section.paragraphs.join("\n\n")),
  })),
  source: txt(nucleicAcidsGuide.source),
  tags: ["kaynakli-anlatim", "adim-adim", "nukleik-asitler"],
  questions: nucleicQuestions,
};
