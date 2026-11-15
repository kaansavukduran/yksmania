import type { Question } from "../domain/model";

// Original practice for three existing source-led narratives; no earlier question records are replaced.
export const foundationQuestionSets: {
  lessonId: string;
  topicId: string;
  subjectId: string;
  questions: Question[];
}[] = [
  {
    lessonId: "karbohidratlar",
    topicId: "detail-5",
    subjectId: "tyt-biyoloji",
    questions: [
      {
        id: "f012-foundation-karbohidratlar-1",
        prompt: {
          tr: "İki maltoz ve bir laktoz molekülü tamamen hidroliz ediliyor. Maltoz iki glikozdan; laktoz bir glikoz ve bir galaktozdan oluşur. Sonuç hangi seçenektir?",
        },
        options: [
          {
            tr: "5 glikoz ve 1 galaktoz",
          },
          {
            tr: "4 glikoz ve 2 galaktoz",
          },
          {
            tr: "3 glikoz ve 3 galaktoz",
          },
          {
            tr: "6 glikoz",
          },
          {
            tr: "2 glikoz ve 1 galaktoz",
          },
        ],
        answer: 0,
        hint: {
          tr: "Her disakkaritin birimlerini ayrı satıra yaz.",
        },
        explanation: {
          tr: "İki maltozdan 2×2=4 glikoz, bir laktozdan 1 glikoz ve 1 galaktoz çıkar; toplam 5 glikoz+1 galaktozdur. Üç disakkaritin her birinde bir bağ hidroliz edildiğinden üç su kullanılır. Birim sayısını molekül türünden ayrı say.",
        },
        skill: "foundation-karbohidratlar-1",
      },
      {
        id: "f012-foundation-karbohidratlar-2",
        prompt: {
          tr: "Toplam 12 monosakkarit, birbirinden ayrı üç halkasız zincir hâlinde bağlanıyor. Çapraz veya halka bağı yok. Toplam glikozit bağı ve TYT dehidrasyon sayımında açığa çıkan su kaçtır?",
        },
        options: [
          {
            tr: "11 bağ ve 11 su",
          },
          {
            tr: "9 bağ ve 9 su",
          },
          {
            tr: "12 bağ ve 12 su",
          },
          {
            tr: "3 bağ ve 3 su",
          },
          {
            tr: "9 bağ ve 12 su",
          },
        ],
        answer: 1,
        hint: {
          tr: "Toplam birimden ayrı zincir adedini çıkar.",
        },
        explanation: {
          tr: "Her ayrı halkasız zincirin bağ sayısı kendi birim sayısından bir eksiktir. Bütün zincirlerde toplam B=N−k=12−3=9 bulunur; bir bağ başına bir su kabul edilen TYT sayımında 9 su açığa çıkar. Tek zincir için 11 kuralı burada geçmez.",
        },
        skill: "foundation-karbohidratlar-2",
      },
      {
        id: "f012-foundation-karbohidratlar-3",
        prompt: {
          tr: "Nişasta ve selülozun ikisi de glikoz türevli birimlerden oluştuğu hâlde insanın sindirim enzimleri nişastayı parçalayabilir, selülozu parçalayamaz. En uygun açıklama hangisidir?",
        },
        options: [
          {
            tr: "Aynı monomerden oluşan her polimer aynı yapıdadır.",
          },
          {
            tr: "Selülozda hiç kovalent bağ yoktur.",
          },
          {
            tr: "Birimlerin bağlanma düzeni ve enzimin bağa özgüllüğü farklıdır.",
          },
          {
            tr: "Nişasta zorunlu bir proteindir.",
          },
          {
            tr: "Sindirim yalnız polimerin adındaki harflere bağlıdır.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yapı birimi ile bağlanma biçimini ayır.",
        },
        explanation: {
          tr: "Ortak glikoz birimi bütün polimerlerin bağ düzenini aynı yapmaz. Bağların geometrisi ve enzimin ilgili bağa etkisi sindirilebilirliği belirler. İnsanın kendi enzimleriyle selülozu sindirememesi, selülozun yapısal veya lif işlevlerinin olmadığı anlamına gelmez.",
        },
        skill: "foundation-karbohidratlar-3",
      },
      {
        id: "f012-foundation-karbohidratlar-4",
        prompt: {
          tr: "DNA, RNA ve ATP için pentoz eşleştirmesi hangi seçenekte doğrudur?",
        },
        options: [
          {
            tr: "DNA ve RNA: deoksiriboz; ATP: glikoz",
          },
          {
            tr: "DNA: riboz; RNA: deoksiriboz; ATP: fruktoz",
          },
          {
            tr: "Üçünde de galaktoz",
          },
          {
            tr: "DNA: deoksiriboz; RNA ve ATP: riboz",
          },
          {
            tr: "DNA: glikoz; RNA ve ATP: laktoz",
          },
        ],
        answer: 3,
        hint: {
          tr: "Önce beş karbonlu şekerleri diğerlerinden ayır.",
        },
        explanation: {
          tr: "DNA nükleotitlerinde deoksiriboz, RNA nükleotitleri ve ATP’nin adenosin bölümünde riboz bulunur. Bu şekerler beş karbonludur; glikoz, fruktoz ve galaktoz ise altı karbonlu örneklerdir. Şekerin varlığı bütün yapının yalnız yakıt olduğunu göstermez.",
        },
        skill: "foundation-karbohidratlar-4",
      },
      {
        id: "f012-foundation-karbohidratlar-5",
        prompt: {
          tr: "Glikoz, fruktoz ve galaktozun kapalı formülü C₆H₁₂O₆ olarak veriliyor; molekül yapıları ve uzaysal düzenlenişleri farklı. Hangi çıkarım doğrudur?",
        },
        options: [
          {
            tr: "Üç ad kesin aynı molekülü belirtir.",
          },
          {
            tr: "Üçü de beş karbonludur.",
          },
          {
            tr: "Üçünde de iki monosakkarit bağı vardır.",
          },
          {
            tr: "Aynı kapalı formülde tüm biyolojik işlevler zorunlu aynıdır.",
          },
          {
            tr: "Aynı atom sayıları moleküllerin aynı yapı ve enzim etkileşimine sahip olmasını zorunlu kılmaz.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Kapalı formülle atomların dizilişini aynı bilgi sayma.",
        },
        explanation: {
          tr: "Aynı molekül formülünün farklı molekül yapılarına karşılık gelmesi izomerlik bağlamında incelenir. Glikoz ve galaktozun farklılığı uzaysal düzenleniştedir; hepsini yalnız yapısal izomer sınıfına koymak doğru değildir. Kapalı formül tek başına açık yapı, enzimle etkileşim veya görev eşitliği kurmaz. Verilen formül altı karbon gösterir; üç molekül de bu bağlamda monosakkarit örneğidir.",
        },
        skill: "foundation-karbohidratlar-5",
      },
      {
        id: "f012-foundation-karbohidratlar-6",
        prompt: {
          tr: "İyot çözeltisinin nişasta varsa mavi renk verdiği biliniyor. Eşit başlangıçlı iki tüpte biri uygun nişasta hidroliz enzimiyle, diğeri enzimsiz tutuluyor. İlk tüpte mavi renk kaybolurken ikincide kalıyor. Hangi sonuç en uygundur?",
        },
        options: [
          {
            tr: "İlk tüpte nişastanın parçalanmasıyla uyumlu veri vardır; bütün organik maddelerin yok olduğu söylenemez.",
          },
          {
            tr: "İlk tüpte hiçbir şeker bulunamaz.",
          },
          {
            tr: "İyot enzimsiz tüpte nişasta üretmiştir.",
          },
          {
            tr: "Her iki tüpte de bütün proteinler yok olmuştur.",
          },
          {
            tr: "Enzim nişastayı kesin selüloza dönüştürmüştür.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Ayıracın hedef maddesinin kapsamını koru.",
        },
        explanation: {
          tr: "Ayıracın neyi gösterdiği kökte belirtilmiştir: mavi renk nişastayla ilişkilidir. Rengin kaybolması nişasta miktarının azalmasıyla uyumludur; daha küçük hidroliz ürünlerinin veya başka organik moleküllerin yokluğunu kanıtlamaz. Kontrol tüpü bu karşılaştırmayı anlamlı kılar.",
        },
        skill: "foundation-karbohidratlar-6",
      },
      {
        id: "f012-foundation-karbohidratlar-7",
        prompt: {
          tr: "Nişasta içeren besinle beslenen bir insanın sindirim kanalı boşluğunda nişasta bulunuyor. Hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "İnsan hücreleri nişastayı zorunlu depo polisakkariti olarak sentezler.",
          },
          {
            tr: "Besin kökenli nişastanın sindirim kanalında bulunması, insan hücrelerinin nişasta deposu yaptığı anlamına gelmez.",
          },
          {
            tr: "Sindirim kanalı boşluğu ile hücre sitoplazması aynı bölmedir.",
          },
          {
            tr: "Nişasta görülmesi kişinin bitki olduğunu gösterir.",
          },
          {
            tr: "Besinle alınan bütün polimerler değişmeden hücre içine geçer.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Maddenin hangi bölmede ve hangi kaynaktan bulunduğunu sor.",
        },
        explanation: {
          tr: "Bir besinin bağırsak boşluğunda bulunması onun insan hücresinde sentezlendiği veya depolandığı kanıtı değildir. Hayvanlarda başlıca depo polisakkarit glikojendir; nişasta uygun sindirimle küçük ürünlere ayrılır. Bölme ve molekül kaynağı ayrı okunmalıdır.",
        },
        skill: "foundation-karbohidratlar-7",
      },
      {
        id: "f012-foundation-karbohidratlar-8",
        prompt: {
          tr: "Bir polisakkarit mantar hücre duvarında veya eklembacaklı dış iskeletinde görev alıyor ve azot içeren değiştirilmiş şeker birimleri taşıyor. Hangi molekülle uyumludur?",
        },
        options: [
          {
            tr: "Nişasta",
          },
          {
            tr: "Glikojen",
          },
          {
            tr: "Kitin",
          },
          {
            tr: "Sakkaroz",
          },
          {
            tr: "Deoksiriboz",
          },
        ],
        answer: 2,
        hint: {
          tr: "Görev ve azot bilgilerini birlikte kullan.",
        },
        explanation: {
          tr: "Kitin yapısal bir polisakkarittir; mantar duvarı ve eklembacaklı dış iskeleti bağlamıyla uyumludur ve azot içerir. Nişasta/glikojen depo örnekleri, sakkaroz disakkarit, deoksiriboz monosakkarittir. “Bütün polisakkaritler yalnız C,H,O taşır” genellemesi burada bozulur.",
        },
        skill: "foundation-karbohidratlar-8",
      },
      {
        id: "f012-foundation-karbohidratlar-9",
        prompt: {
          tr: "Bir mantar hücresinde fazla glikoz başlıca hangi depo polisakkaritine dönüştürülebilir?",
        },
        options: [
          {
            tr: "Selüloz",
          },
          {
            tr: "Nişasta",
          },
          {
            tr: "Laktoz",
          },
          {
            tr: "Glikojen",
          },
          {
            tr: "Riboz",
          },
        ],
        answer: 3,
        hint: {
          tr: "Canlı grubu ile depo/yapı işlevini birlikte değerlendir.",
        },
        explanation: {
          tr: "Glikojen hayvan ve mantarlarda yaygın depo polisakkaritidir; bazı prokaryotlarda da bulunur. Selüloz yapısal, nişasta bitki deposu, laktoz iki şekerli ve riboz tek şekerlidir. Mantarın bitki olmaması depo maddesi eşleştirmesinde önemlidir.",
        },
        skill: "foundation-karbohidratlar-9",
      },
      {
        id: "f012-foundation-karbohidratlar-10",
        prompt: {
          tr: "Üç disakkarit molekülü başlangıçta serbest monosakkarit içermiyor. Her disakkarit iki birimli ve tek glikozit bağlı; hepsi tamamen hidroliz ediliyor. Son serbest monosakkarit sayısı ve tüketilen su kaçtır?",
        },
        options: [
          {
            tr: "3 monosakkarit ve 6 su",
          },
          {
            tr: "6 monosakkarit ve 6 su",
          },
          {
            tr: "9 monosakkarit ve 3 su",
          },
          {
            tr: "3 monosakkarit ve 3 su",
          },
          {
            tr: "6 monosakkarit ve 3 su",
          },
        ],
        answer: 4,
        hint: {
          tr: "Bir moleküldeki bağ ve ürün sayılarını bulup üçle çarp.",
        },
        explanation: {
          tr: "Her iki birimli molekülde tek bağ ayrılır; bir su kullanılıp iki monosakkarit çıkar. Üç molekülde toplam 3 su ve 6 birim bulunur. Ürün sayısı ile kırılan bağ sayısı farklıdır; başlangıçta zaten bağlı olan birimlerin her biri için su eklenmez.",
        },
        skill: "foundation-karbohidratlar-10",
      },
    ],
  },
  {
    lessonId: "lipitler",
    topicId: "detail-6",
    subjectId: "tyt-biyoloji",
    questions: [
      {
        id: "f012-foundation-lipitler-1",
        prompt: {
          tr: "Dört trigliserit tamamen hidroliz ediliyor. Her biri bir gliserol ve üç yağ asidinden oluşuyor. Ürünler ve kullanılan su hangisidir?",
        },
        options: [
          {
            tr: "4 gliserol, 12 yağ asidi ve 12 su",
          },
          {
            tr: "12 gliserol, 4 yağ asidi ve 4 su",
          },
          {
            tr: "4 gliserol, 4 yağ asidi ve 12 su",
          },
          {
            tr: "4 gliserol, 12 yağ asidi ve 4 su",
          },
          {
            tr: "16 gliserol ve 16 su",
          },
        ],
        answer: 0,
        hint: {
          tr: "Tek trigliseritin hesabını önce ayrı kur.",
        },
        explanation: {
          tr: "Bir trigliseritte üç ester bağı ayrılırken üç su kullanılır ve bir gliserol ile üç yağ asidi çıkar. Dört molekülün hesabı bu değerlerin dörder katıdır. Yağ asidi, gliserol ve ester bağı sayıları birbirinin yerine kullanılamaz.",
        },
        skill: "foundation-lipitler-1",
      },
      {
        id: "f012-foundation-lipitler-2",
        prompt: {
          tr: "Üç trigliseritte toplam dokuz ester bağı var. Bunlardan yedisi hidroliz ediliyor; her kopan ester bağı bir yağ asidi serbestleştiriyor. Hangi bilgi kesindir?",
        },
        options: [
          {
            tr: "Kesinlikle 3 gliserol serbestleşir.",
          },
          {
            tr: "7 yağ asidi serbestleşir; serbest gliserol sayısı bağların moleküllere dağılımına bağlıdır.",
          },
          {
            tr: "Hiç yağ asidi serbestleşmez.",
          },
          {
            tr: "Kesinlikle 9 ester bağı kalır.",
          },
          {
            tr: "Her molekülde kesin aynı sayıda bağ kopmuştur.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Bir gliserolün serbestleşmesi için üç bağlantısının da ayrılması gerekir.",
        },
        explanation: {
          tr: "Yedi kopma yedi yağ asidi ve yedi su tüketimi verir. Kalan iki ester bağı tek bir gliserolde veya iki ayrı gliserolde bulunabilir; tamamen serbest gliserol sayısı aynı olmak zorunda değildir. Toplam kopma sayısından moleküller arasındaki dağılım uydurulmaz.",
        },
        skill: "foundation-lipitler-2",
      },
      {
        id: "f012-foundation-lipitler-3",
        prompt: {
          tr: "Nötral yağ için hangi bileşen eşleştirmesi doğrudur?",
        },
        options: [
          {
            tr: "3 gliserol + 1 yağ asidi",
          },
          {
            tr: "1 amino asit + 3 glikoz",
          },
          {
            tr: "1 gliserol + 3 yağ asidi",
          },
          {
            tr: "2 gliserol + 1 nükleotit",
          },
          {
            tr: "1 fosfat + 3 amino asit",
          },
        ],
        answer: 2,
        hint: {
          tr: "Trigliserit ile bütün lipit ailesini ayrı tut.",
        },
        explanation: {
          tr: "Trigliserit bir gliserolün üç yağ asidiyle esterleşmesidir. Bu model bütün lipitlere ait değildir: fosfolipit ve steroidler farklı yapı düzenleri taşır. Molekül adına göre ortak bir “yağ monomeri” varsaymak doğru olmaz.",
        },
        skill: "foundation-lipitler-3",
      },
      {
        id: "f012-foundation-lipitler-4",
        prompt: {
          tr: "Yaygın gliserofosfolipit modelinde iki yağ asidi ve fosfat içeren kutuplu baş bulunuyor. Sulu ortamda çift tabakada hangi yerleşim beklenir?",
        },
        options: [
          {
            tr: "Kuyruklar yalnız sulu yüzeylere, başlar birbirine yönelir.",
          },
          {
            tr: "Bütün baş ve kuyruklar tek yönde aynı yüzeye bakar.",
          },
          {
            tr: "Fosfat başı DNA gibi kromozom oluşturur.",
          },
          {
            tr: "Başlar iki sulu yüzeye, kuyruklar birbirine bakan iç bölgeye yönelir.",
          },
          {
            tr: "İki tabaka iki farklı organelin zarı olmak zorundadır.",
          },
        ],
        answer: 3,
        hint: {
          tr: "İki taraftaki sulu ortamı işaretle.",
        },
        explanation: {
          tr: "Kutuplu baş suyla etkileşebilir; apolar kuyrukların sulu yüzeyden uzak iç bölgede bulunması çift tabaka düzenini açıklar. Bu bir zarın temel düzenidir, iki organel zarı demek değildir. Yönelimi görselin üst-alt ezberinden değil sulu bölgeden belirle.",
        },
        skill: "foundation-lipitler-4",
      },
      {
        id: "f012-foundation-lipitler-5",
        prompt: {
          tr: "Eşit uzunluklu iki yağ asidinden birinde C=C yok, diğerinde bir cis C=C var. Doymuş–doymamış ayrımı için hangisi doğrudur?",
        },
        options: [
          {
            tr: "İlk doymamış, ikincisi doymuştur.",
          },
          {
            tr: "İkisi de zorunlu proteindir.",
          },
          {
            tr: "Doymuşluk gliserol molekülü sayısıdır.",
          },
          {
            tr: "Çift bağın varlığı karbon zincirine ait olamaz.",
          },
          {
            tr: "İlk doymuş, ikincisi doymamıştır.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Sınıflama için karbon–karbon bağlarını oku.",
        },
        explanation: {
          tr: "Doymuş yağ asidinin karbon zincirinde C=C bulunmaz; doymamışta en az bir C=C vardır. Bu yapı paketlenme ve erime eğilimini etkileyebilir, ancak yalnız çift bağ sayısından her karışımın kesin oda sıcaklığı hâli çıkarılmaz. Verilen soru sınıflamayı istemektedir.",
        },
        skill: "foundation-lipitler-5",
      },
      {
        id: "f012-foundation-lipitler-6",
        prompt: {
          tr: "İnsan tarafından yeterli miktarda sentezlenemediği için besinle alınması gereken temel yağ asitleri bulunuyor. Hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Bazı yağ asitlerinin dışarıdan gerekliliği, insanın hiçbir lipidi sentezleyemediği anlamına gelmez.",
          },
          {
            tr: "İnsan bütün lipitlerini dışarıdan değişmeden almak zorundadır.",
          },
          {
            tr: "Bütün yağ asitleri aynı görevle birbirinin yerini alır.",
          },
          {
            tr: "Temel yağ asidi sözü protein monomeri demektir.",
          },
          {
            tr: "Temel yağ asidi hiç enerji metabolizmasına katılamaz.",
          },
        ],
        answer: 0,
        hint: {
          tr: "“Bazı” koşulunu bütün aileye genişletme.",
        },
        explanation: {
          tr: "Temel/esansiyel nitelemesi belirli yağ asitlerinin gereksinimini karşılayan sentezin yetersizliğiyle ilişkilidir. Bütün lipit sentezine yasak getirmez; insan başka lipitler sentezleyebilir. Bu kavramsal sonuç kişiye takviye dozu önerisi değildir.",
        },
        skill: "foundation-lipitler-6",
      },
      {
        id: "f012-foundation-lipitler-7",
        prompt: {
          tr: "Kolesterol hayvan hücre zarında bulunuyor ve steroid ürünlerin senteziyle ilişkili. Hangi genelleme bu bilgilerle çelişir?",
        },
        options: [
          {
            tr: "Lipit ailesinde farklı yapı türleri vardır.",
          },
          {
            tr: "Kolesterolün vücutta hiçbir işlevi yoktur.",
          },
          {
            tr: "Bir lipit hücre zarında görev alabilir.",
          },
          {
            tr: "Bütün lipitler trigliserit değildir.",
          },
          {
            tr: "Steroidler halka içeren bir yapıyla incelenebilir.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Verilen iki görevi yok sayan mutlak seçeneği bul.",
        },
        explanation: {
          tr: "Verilen zar ve sentez rolleri işlev bulunduğunu doğrudan gösterir. Bu, miktar ve dağılımdan bağımsız olarak her durumda yararlı olacağı anlamına gelmez. İşlev varlığıyla sınırsız alımın uygunluğu farklı sorulardır; koşulsuz yoktur genellemesi yanlıştır.",
        },
        skill: "foundation-lipitler-7",
      },
      {
        id: "f012-foundation-lipitler-8",
        prompt: {
          tr: "Aynı kütledeki yağ ve karbonhidratın oksijenli yıkımı karşılaştırılıyor. Kökte yağ için 9, karbonhidrat için 4 birim enerji/g verilmiş. 2 g yağ ile aynı enerji için kaç g karbonhidrat gerekir?",
        },
        options: [
          {
            tr: "2 g",
          },
          {
            tr: "8 g",
          },
          {
            tr: "4,5 g",
          },
          {
            tr: "9 g",
          },
          {
            tr: "18 g",
          },
        ],
        answer: 2,
        hint: {
          tr: "Önce enerjiyi, sonra eşdeğer kütleyi bul.",
        },
        explanation: {
          tr: "Önce yağ enerjisi 2×9=18 birim bulunur. Aynı enerji için karbonhidrat miktarı 18/4=4,5 g’dır. Burada katsayılar kökte verilmiştir; gram ile enerji birimi karıştırılmaz. Farklı metabolik koşullarda koşulsuz bir kişisel enerji hesabı yapılmıyor.",
        },
        skill: "foundation-lipitler-8",
      },
      {
        id: "f012-foundation-lipitler-9",
        prompt: {
          tr: "Bir yağ örneği suda az, kullanılan uygun organik çözücüde daha çok çözünüyor. Bu gözlem tek başına hangisini kanıtlamaz?",
        },
        options: [
          {
            tr: "İki çözücüde davranışın farklı olduğunu",
          },
          {
            tr: "Çözünürlüğün seçilen ortama bağlı olduğunu",
          },
          {
            tr: "Suyla iyi karışmayan bileşenler bulunduğuyla uyumlu olduğunu",
          },
          {
            tr: "Örnekteki bütün moleküllerin trigliserit olduğunu",
          },
          {
            tr: "Çözücü seçiminin ayırmada etkili olabileceğini",
          },
        ],
        answer: 3,
        hint: {
          tr: "Genel çözünürlükten kesin yapı sayısına atlama.",
        },
        explanation: {
          tr: "Çözünürlük gözlemi lipit benzeri davranışla uyumlu olabilir; fosfolipit, steroid veya karışım olasılıklarını tek başına elemez. Verilen veri bütün moleküllerin aynı bileşene sahip olduğunu göstermez. Molekül kimliği için daha özgül kanıt gerekir.",
        },
        skill: "foundation-lipitler-9",
      },
      {
        id: "f012-foundation-lipitler-10",
        prompt: {
          tr: "Bir göçmen kuşun depo yağları oksijenli solunumla yıkılıyor. Verilen biyolojik bağlamda hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Yağ yıkımında hiç oksijen kullanılmaz.",
          },
          {
            tr: "Depo yağın bütün işlevi DNA dizisini doğrudan yazmaktır.",
          },
          {
            tr: "Yağlar mutlaka aynı sayıda peptit bağı taşır.",
          },
          {
            tr: "Metabolik su oluşması kuşun bütün koşullarda suya gereksinimi olmadığını kanıtlar.",
          },
          {
            tr: "Yağlar enerji aktarımına ve metabolik su oluşumuna katkı sağlayabilir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Enerji ve su katkısını koşulsuz gereksinim yokluğuna dönüştürme.",
        },
        explanation: {
          tr: "Depo yağın oksijenli yıkımı enerji ve metabolik su kaynağı olabilir. Bu yarar bütün çevrelerde su gereksiniminin sıfırlanacağı anlamına gelmez; oksijen ve diğer koşullar önemlidir. Peptit bağları protein bağlamıdır ve trigliserit esterleriyle eşitlenmez.",
        },
        skill: "foundation-lipitler-10",
      },
    ],
  },
  {
    lessonId: "vitaminler",
    topicId: "detail-9",
    subjectId: "tyt-biyoloji",
    questions: [
      {
        id: "f012-foundation-vitaminler-1",
        prompt: {
          tr: "Aşağıdaki gruplardan hangisinin bütün üyeleri yağda çözünen vitaminlerdir?",
        },
        options: [
          {
            tr: "A, D, E, K",
          },
          {
            tr: "B1, B2, C, K",
          },
          {
            tr: "A, B12, C, D",
          },
          {
            tr: "B1, B6, B12, C",
          },
          {
            tr: "C, D, E, B12",
          },
        ],
        answer: 0,
        hint: {
          tr: "ADEK ile B/C gruplarını ayrı tut.",
        },
        explanation: {
          tr: "Temel çözünürlük sınıflamasında A,D,E,K yağda; B grubu ve C suda çözünen vitaminlerdir. Çözünürlük, enerji sağlayan yakıt olmak veya bütün moleküllerin aynı görevde olması anlamına gelmez. B grubu da tek bir molekül değil farklı vitaminler kümesidir.",
        },
        skill: "foundation-vitaminler-1",
      },
      {
        id: "f012-foundation-vitaminler-2",
        prompt: {
          tr: "B12 suda çözünen bir vitamin olmasına rağmen vücutta anlamlı depoları bulunabilir. Bu bilgi hangi iddiayı çürütür?",
        },
        options: [
          {
            tr: "B12 vitamin sınıfındadır.",
          },
          {
            tr: "Suda çözünen hiçbir vitamin hiçbir koşulda depolanamaz.",
          },
          {
            tr: "Genel kuralın istisnaları olabilir.",
          },
          {
            tr: "Çözünürlük ve depo miktarı farklı özelliklerdir.",
          },
          {
            tr: "A,D,E,K yağda çözünen gruptadır.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Bir karşı örnek evrensel iddiayı nasıl etkiler?",
        },
        explanation: {
          tr: "B12 açık bir karşı örnektir; hiçbir ve hiçbir koşulda biçimindeki evrensel depo yasağını bozar. Genel emilim/atılım eğilimleri her vitaminin aynı depo davranışını göstereceği anlamına gelmez. Bu örnek belirli bir kişideki depo miktarını hesaplamaz.",
        },
        skill: "foundation-vitaminler-2",
      },
      {
        id: "f012-foundation-vitaminler-3",
        prompt: {
          tr: "Bir B vitamininden oluşan koenzim enzimli tepkimeye yardımcı oluyor. Vitaminin rolü için hangi ifade uygundur?",
        },
        options: [
          {
            tr: "Her organik molekül zorunlu enerji yakıtıdır.",
          },
          {
            tr: "Koenzim vitaminin inorganik mineral olduğunu kanıtlar.",
          },
          {
            tr: "Tepkimeye yardımcı olması, vitaminin glikoz gibi kalori veren yakıt olduğu anlamına gelmez.",
          },
          {
            tr: "Vitamin enzimin yerine her koşulda tek başına geçer.",
          },
          {
            tr: "Vitaminin az miktarda gerekmesi hiç gerekmediğini gösterir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yardımcı parça ile enerji hammaddesini ayır.",
        },
        explanation: {
          tr: "Bir yardımcı grubun metabolik tepkimede görev alması ile enerji hammaddesi olarak parçalanması farklı rollerdir. Vitaminler insan beslenmesinde karbonhidrat veya yağ gibi enerji yakıtı kabul edilmez. Vitaminin organik sınıfta olması bu ayrımı ortadan kaldırmaz.",
        },
        skill: "foundation-vitaminler-3",
      },
      {
        id: "f012-foundation-vitaminler-4",
        prompt: {
          tr: "Kökte C vitamininin kolajen yapımını desteklediği belirtiliyor. Hangi görevle ilişki kurmak en uygundur?",
        },
        options: [
          {
            tr: "DNA’nın tek fosfat kaynağı olmak",
          },
          {
            tr: "Trigliseritte üçüncü yağ asidinin yerini almak",
          },
          {
            tr: "Kemiklerdeki tüm kalsiyum atomlarını sentezlemek",
          },
          {
            tr: "Bağ dokusunun uygun yapı kazanmasına katkı",
          },
          {
            tr: "Bütün hormonların aynı steroid yapısını oluşturmak",
          },
        ],
        answer: 3,
        hint: {
          tr: "Kökteki yapının hangi doku görevine ait olduğunu bul.",
        },
        explanation: {
          tr: "Kolajen bağ dokusunun önemli proteinlerindendir; kökteki yapım desteği bu dokunun uygun yapısına katkıyla ilişkilidir. Bir vitamin elementleri yoktan oluşturmaz, yağ asidi veya fosfatın rastgele yerine geçmez. Bu soru bir kişide tanı koyma amacı taşımaz.",
        },
        skill: "foundation-vitaminler-4",
      },
      {
        id: "f012-foundation-vitaminler-5",
        prompt: {
          tr: "D vitamininin kalsiyum ve fosforun bağırsaktan emilmesi ve kemik mineralizasyonuyla ilişkisi veriliyor. Hangi çıkarım doğrudur?",
        },
        options: [
          {
            tr: "D vitamini kalsiyumun başka adıdır.",
          },
          {
            tr: "Kalsiyum organik vitamin hâline dönüşür.",
          },
          {
            tr: "D vitamini yalnız enerji depolayan trigliserittir.",
          },
          {
            tr: "Aynı süreçte görev alan tüm maddeler aynı moleküldür.",
          },
          {
            tr: "D vitamini ile kalsiyum farklı bileşenler olarak aynı süreçte rol alabilir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "İlişki kurmak ile aynı madde saymayı ayır.",
        },
        explanation: {
          tr: "D vitamini organik düzenleyici, kalsiyum mineral elementtir. Bir süreçte birlikte gerekli olmak kimyasal özdeşlik göstermez. Bu örnek vitamin-mineral ilişkisini kurar; dışarıdan alınacak miktar veya kişisel tedavi önerisi üretmez.",
        },
        skill: "foundation-vitaminler-5",
      },
      {
        id: "f012-foundation-vitaminler-6",
        prompt: {
          tr: "K vitamini kanın pıhtılaşmasında görevli bazı proteinlerin uygun işleviyle ilişkilidir. Hangi eşleştirme doğrudur?",
        },
        options: [
          {
            tr: "K vitamini — pıhtılaşma süreçleri",
          },
          {
            tr: "K vitamini — glikojenin tek monomeri",
          },
          {
            tr: "K vitamini — DNA’nın pentoz şekeri",
          },
          {
            tr: "K vitamini — bütün sinir uyarılarının elektrik yükü",
          },
          {
            tr: "K vitamini — alyuvarın tek demir elementi",
          },
        ],
        answer: 0,
        hint: {
          tr: "Vitaminin görevini yapı birimiyle karıştırma.",
        },
        explanation: {
          tr: "K vitamininin pıhtılaşma proteinleriyle ilişkisi temel okul eşleştirmesidir. Glikojenin monomeri glikoz, DNA şekeri deoksiribozdur; vitamin bunların veya demir elementinin yerini almaz. Bir süreçteki rol tüm süreçleri tek başına gerçekleştirmek anlamına gelmez.",
        },
        skill: "foundation-vitaminler-6",
      },
      {
        id: "f012-foundation-vitaminler-7",
        prompt: {
          tr: "Bir tabloda A vitamininin görme ve epitel, E vitamininin antioksidan savunma ile ilişkili olduğu veriliyor. Hangi sonuç bu kapsamı korur?",
        },
        options: [
          {
            tr: "Bütün vitaminler aynı tek moleküldür.",
          },
          {
            tr: "Vitaminler farklı işlevlerle ilişkilidir; birinin adı diğerinin bütün görevlerini üstlenmez.",
          },
          {
            tr: "A ve E aynı çözünürlükteyse aynı işlevleri zorunlu yapar.",
          },
          {
            tr: "E vitamini her kişide bütün hastalıkları kesin önler.",
          },
          {
            tr: "A vitamini görmeyle ilişkiliyse yalnız gözde bulunabilir.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ortak grup ile farklı görevleri birlikte koru.",
        },
        explanation: {
          tr: "Tablo iki farklı görev bağlamı verir. Çözünürlük grubunun ortak olması bütün işlevlerin özdeşliği veya hastalık önleme garantisi oluşturmaz. Özellikle E vitaminine ilişkin koşulsuz kanser/Alzheimer önleme iddiası bu veriden çıkarılamaz.",
        },
        skill: "foundation-vitaminler-7",
      },
      {
        id: "f012-foundation-vitaminler-8",
        prompt: {
          tr: "Eşit başlangıçlı sebzeler aynı ısı ve sürede suda pişiriliyor. C vitamini suda çözünüyor. Bir grupta su dökülüp yalnız sebze ölçülüyor; diğerinde ölçüme sebze ve pişirme suyu birlikte alınıyor. Sonuçları karşılaştırırken hangisine dikkat edilmelidir?",
        },
        options: [
          {
            tr: "Suya geçen vitamin kesin yoktan üretilmiştir.",
          },
          {
            tr: "Daha az kalan miktarın tek olası nedeni genetik mutasyondur.",
          },
          {
            tr: "Suda çözünme ile suya geçen miktar, yalnız ısıl parçalanmadan ayrı değerlendirilmelidir.",
          },
          {
            tr: "Ölçülen bölümün değişmesi karşılaştırmayı etkilemez.",
          },
          {
            tr: "C vitamini yağda çözündüğü için suya geçiş imkânsızdır.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Hangi kısmın ölçüldüğünü ve çözünenin nereye gidebileceğini oku.",
        },
        explanation: {
          tr: "Kalan sebze ile sebze+su toplamı aynı ölçüm bölmesi değildir. Suda çözünen vitaminin bir bölümü suya geçebilir; ölçülen azalmayı tek başına tümünün ısıyla kimyasal olarak parçalanması saymak gerekçesizdir. Başlangıç, bölme ve yöntem aynı tutulmalıdır.",
        },
        skill: "foundation-vitaminler-8",
      },
      {
        id: "f012-foundation-vitaminler-9",
        prompt: {
          tr: "İnsan bazı provitaminleri belirli koşullarda etkin ürünlere dönüştürebiliyor; D vitamini oluşumunda deride başlayan bir yol bulunuyor. Hangi çıkarım güvenlidir?",
        },
        options: [
          {
            tr: "İnsan bütün vitaminleri yeterince sentezler.",
          },
          {
            tr: "Vitaminlerin hiçbirinde dönüşüm basamağı olamaz.",
          },
          {
            tr: "Bütün vitaminler yalnız mineral atomlarına dönüşür.",
          },
          {
            tr: "Bazı dönüşüm yollarının varlığı bütün vitamin gereksiniminin her koşulda karşılandığını göstermez.",
          },
          {
            tr: "Bir dönüşüm varsa çevre ve beslenmenin hiç rolü yoktur.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Bazı koşulunu bütün vitaminlere genişletme.",
        },
        explanation: {
          tr: "Belirli bir öncülden ürün oluşması vitaminlerin tümü ve bütün koşullar hakkında sentez yeterliliği kanıtı değildir. Hangi vitaminin, hangi öncül ve koşulla ele alındığı önemlidir. Sentez, öncül dönüşümü ve dışarıdan gereksinim ayrı sorulardır.",
        },
        skill: "foundation-vitaminler-9",
      },
      {
        id: "f012-foundation-vitaminler-10",
        prompt: {
          tr: "Bir ders notunda uzun süreli A vitamini yetersizliğinin gece görme güçlüğüyle ilişkili olabildiği yazıyor. Bir kişi yalnız bu belirtiyi bildiriyor. Verilen bilgi ve tek belirti birlikte değerlendirildiğinde hangisine kesin olarak ulaşılamaz?",
        },
        options: [
          {
            tr: "A vitamininin görmeyle ilişkili olduğu öğretim bilgisini",
          },
          {
            tr: "Ders notundaki örneğin belirli bir vitaminle eşleştirildiğini",
          },
          {
            tr: "Tek belirtinin farklı nedenlerle görülebileceğini değerlendirme gereğini",
          },
          {
            tr: "Kavramsal eşleştirme ile kişisel tıbbi değerlendirmenin farklı olduğunu",
          },
          {
            tr: "Kesin tanı ve alınması gereken takviye dozu",
          },
        ],
        answer: 4,
        hint: {
          tr: "Okul eşleştirmesi ile kişisel kesin tanıyı ayır.",
        },
        explanation: {
          tr: "Bu ders notu kavramsal vitamin-görev ilişkisini öğretir; tek kişideki tek belirti tüm alternatif nedenleri elemez. Tanı ve doz için klinik değerlendirme gerekir. Bu sınır, A vitamininin görmedeki biyolojik rolünü reddetmez; çıkarımın kapsamını korur.",
        },
        skill: "foundation-vitaminler-10",
      },
    ],
  },
];

export const foundationQuestionsByLesson: Record<string, Question[]> =
  Object.fromEntries(
    foundationQuestionSets.map((pack) => [pack.lessonId, pack.questions]),
  );
