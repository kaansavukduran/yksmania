import { node as n, type NarrativePack } from "./types";
export const chemistryNarratives: NarrativePack[] = [
  {
    id: "atomun-temel-tanecikleri",
    topicId: "detail-144",
    subjectId: "tyt-kimya",
    title: "Atomun temel tanecikleri: kimlik, kütle ve yük",
    minutes: 30,
    source:
      "OGM Dersler Cepte 9. Sınıf Kimya Uygulamalarında İş Sağlığı ve Güvenliği – Atom ve Periyodik Sistem – Atomun Yapısı, PDF s.20–21. Çekirdek, yük ve tanecik sayma çizimleri özgündür; elektronlar gerçek dairesel yollar olarak gösterilmez.",
    objectives: [
      "Z, A, proton, nötron ve elektron sayılarını ilişkilendir.",
      "İyon oluşurken değişen ve korunan nicelikleri ayır.",
      "Atom altı tanecik sayılarını yük ve kütle numarasıyla denetle.",
    ],
    body: [
      {
        title: "Üç taneciği iki bölgeyle ilişkilendir",
        text: "Çekirdekte pozitif yüklü protonlar ve yüksüz nötronlar, çekirdek çevresindeki kuantum durumlarında negatif yüklü elektronlar bulunur. Proton yükü +1, elektron yükü −1 temel yük birimiyle ifade edilir; nötronun net elektrik yükü sıfırdır. Proton ve nötronun kütleleri birbirine yakın, elektronunki çok daha küçüktür. Elektronun kütlesinin bazı hesaplarda ihmal edilmesi gerçekten sıfır olduğu anlamına gelmez. Elektronları sabit gezegen yörüngelerinde dolanan noktalar olarak düşünmek modern atomun tam bir modeli değildir.",
      },
      {
        title: "Atom numarası elementin kimliğidir",
        text: "Z atom numarasıdır ve proton sayısına eşittir. Proton sayısı 6 olan her çekirdek karbon elementine aittir. Elektron sayısı değişirse iyon, nötron sayısı değişirse başka izotop elde edilebilir; elementin kimliği proton sayısıyla belirlenmeye devam eder. Proton sayısı değişiyorsa aynı elementin basit iyonlaşması değildir; çekirdekle ilgili bir dönüşüm söz konusudur. Periyodik tabloda yer artan Z’ye göre belirlenir. ‘Kimlik değişmedi’ demek elektrik yükü ve bütün özellikler aynı kaldı demek değildir.",
      },
      {
        title: "Kütle numarası ile gerçek atom kütlesini ayır",
        text: "A kütle numarası proton ve nötron sayılarının toplamıdır: A=Z+n. Bu bir nükleon sayısıdır ve tam sayıdır. Nötron sayısını bulmak için n=A−Z kullanılır. Kütle numarası, bir izotopun hassas ölçülmüş kütlesi veya periyodik tablodaki ortalama atom kütlesiyle aynı kavram değildir. Çekirdek bağlanması ve izotopların doğal bollukları gibi nedenlerle bu değerler farklı olabilir. TYT’de yalnız tanecik sayarken ‘A=23’ ifadesini ‘çekirdekte 23 proton var’ biçiminde okuma.",
      },
      {
        title: "Yük hesabını tanımdan kur",
        text: "Tek atomlu tanecikte net yük q=p−e=Z−e olur. Buna göre e=Z−q. Yüksüz atomda p=e’dir; nötron sayısının da bunlara eşit olması gerekmez. 11 protonlu tanecik 10 elektron taşıyorsa q=+1, 9 protonlu tanecik 10 elektron taşıyorsa q=−1 olur. Pozitif iyon katyon, negatif iyon anyondur. Elektron negatif olduğu için elektron vermek taneciği daha pozitif, elektron almak daha negatif yapar. İşlem işaretini ezberlemeden önce yüklerin toplamını yaz.",
      },
      {
        title: "İyonlaşmada çekirdek korunur",
        text: "Sıradan kimyasal iyonlaşmada elektron alınır veya verilir; proton, nötron ve kütle numarası değişmez. Örneğin ²³₁₁Na için p=11, n=12, e=11; ²³₁₁Na⁺ için p=11, n=12, e=10’dur. Na⁺ hâlâ sodyumdur, fakat nötr sodyum atomuyla aynı elektron yapısında ve kimyasal davranışta değildir. Birden fazla elektron verildiyse yük de sayıya göre değişir: 12 proton ve 10 elektron +2 yük verir. ‘Artı yüklü oldu’ ifadesi çekirdeğe yeni proton eklendiğini söylemez.",
      },
      {
        title: "Üç eşitlikle eksik bilgiyi denetle",
        text: "Önce Z=p, sonra n=A−Z, en son e=Z−q yaz. Özgün örnek olarak A=27, Z=13, q=+3 için p=13, n=14, e=10 bulunur. Hesabı geri kontrol et: p+n=27 ve p−e=+3 olmalı. ‘Toplam atom altı tanecik sayısı’ p+n+e anlamında sorulursa A+e kullanılır; bu, kütle numarası değildir. Tanecik sayıları negatif olamaz. Sayı modelinde farklı değerler girebilmen, her birleşimin doğada kararlı ve bağlanmış bir atom veya iyon olduğu anlamına gelmez.",
      },
    ],
    pitfalls: [
      {
        label: "Nötr, nötronsuz demek değildir",
        reason:
          "Nötrlük p=e koşuludur; nötronun bulunup bulunmaması ayrı bilgidir.",
      },
      {
        label: "A, proton sayısı değildir",
        reason: "A=p+n; Z=p. İki sembol farklı nicelikleri ifade eder.",
      },
      {
        label: "Elektron verince proton artmaz",
        reason:
          "Pozitif yük, negatif yüklerin azalmasından doğabilir. Kimyasal iyonlaşmada çekirdek korunur.",
      },
    ],
    cases: [
      {
        name: "Bir elektron ver",
        question: "²³₁₁Na, Na⁺ olunca hangi sayılar korunur?",
        conclusion:
          "p=11, n=12, A=23 korunur; elektron 11’den 10’a iner ve yük +1 olur. Elementin periyodik tablodaki kimliği değişmez.",
        nodes: [
          n("Nötr Na", "11 proton, 12 nötron, 11 elektron.", "nucleus"),
          n(
            "Bir elektron dışarı",
            "Yalnız elektron sayısı değişir.",
            "number",
            "e⁻",
          ),
          n("Na⁺", "11−10=+1.", "number", "+1"),
          n("Aynı çekirdek", "Z ve A korunur.", "nucleus"),
        ],
      },
      {
        name: "Verilenlerden sayılara",
        question: "A=27, Z=13 ve yük +3 ise kaç elektron vardır?",
        conclusion:
          "p=13, n=27−13=14, e=13−3=10. Yük hesabı 13−10=+3 ile geri kontrol edilir.",
        nodes: [
          n("Z = 13", "Proton sayısı doğrudan verildi.", "number", "13"),
          n("A = 27", "Proton+nötron toplamı.", "number", "27"),
          n("n = 14", "27−13.", "number", "14"),
          n("e = 10", "13−(+3).", "number", "10"),
        ],
      },
      {
        name: "Elektron alan tanecik",
        question: "9 proton ve 10 elektron hangi yükü verir?",
        conclusion:
          "9−10=−1 olduğundan anyondur. Elektron alımı elementin 9 protonla belirlenen kimliğini değiştirmez.",
        nodes: [
          n("9 proton", "Toplam +9 temel yük.", "nucleus"),
          n("10 elektron", "Toplam −10 temel yük.", "molecule"),
          n("Net yük", "+9−10=−1.", "number", "−1"),
          n("Anyon", "Negatif yüklü tek atomlu tanecik.", "sample"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Nötr bir atomda proton, nötron ve elektron sayıları mutlaka eşit midir?",
        answer:
          "Hayır. Nötrlük proton ve elektron sayısının eşitliğini gerektirir. Nötron sayısı kütle numarasına ve izotopa bağlıdır.",
      },
      {
        prompt:
          "A=40, Z=20 olan bir tanecik iki elektron verirse p, n, e ve yükü bul.",
        answer:
          "p=20, n=40−20=20, e=18 ve q=20−18=+2. İyonlaşmada A ve çekirdek tanecik sayıları değişmez.",
      },
    ],
    modelLimit:
      "Tanecik çizimi sayma ve yük muhasebesi içindir; gerçek boyut, orbital veya kararlı izotop/iyon öngörüsü değildir. Kütle numarası hassas atom kütlesi sayılmaz.",
  },
  {
    id: "izotop-izoton-izobar",
    topicId: "detail-145",
    subjectId: "tyt-kimya",
    title: "İzotop, izoton, izobar: hangi sayı aynı?",
    minutes: 30,
    source:
      "OGM Dersler Cepte 9. Sınıf Kimya Uygulamalarında İş Sağlığı ve Güvenliği – Atom ve Periyodik Sistem – Atomun Yapısı, PDF s.20–21. Örnek tanecik çiftleri özgün karşılaştırmalarla açıklanmıştır.",
    objectives: [
      "Her adlandırmayı doğru eşitlik koşuluyla kur.",
      "Aynı element, aynı nükleon sayısı ve aynı elektron düzenini ayır.",
      "İzotopların özellikleri ve ortalama atom kütlesi hakkında sınırlandırılmış çıkarım yap.",
    ],
    body: [
      {
        title: "İsimden önce tablo kur",
        text: "Her taneciğe Z, A, n=A−Z, e=Z−q sütunları aç. Karşılaştırma bu niceliklerin hangisinin aynı olduğuna dayanır. Harfler veya kütle numaraları benziyor diye ilişki seçme. Aynı sembol proton sayısının aynı olduğunu gösterir; üstte yazan A ise nötron sayısını tek başına vermez. Örneğin ¹²₆C için n=6, ¹⁴₆C için n=8 bulunur. Yük verilmediyse ve nötr atom olduğu belirtilmişse elektron sayısı Z’ye eşittir; iyonlarda yük mutlaka hesaba katılır.",
      },
      {
        title: "İzotop: aynı kimlik, farklı nötron",
        text: "Proton sayıları aynı, nötron sayıları farklı atomlar aynı elementin izotoplarıdır. ¹²₆C ve ¹⁴₆C karbon izotoplarıdır; kütle numaraları farklıdır. Nötr izotop atomların elektron sayıları ve temel hâl elektron dizilimleri aynıdır; TYT düzeyinde kimyasal özellikleri benzer kabul edilir, fiziksel ve nükleer özellikleri farklılaşabilir. Gerçekte izotop etkilerinin hiç bulunmadığı gibi mutlak bir sonuç kurulmaz. Proton sayısı aynı iki iyonun elektron sayısı farklıysa ‘aynı kimyasal özellik’ yargısını yalnız çekirdeğe bakarak verme.",
      },
      {
        title: "İzoton ve izobar aynı element değildir",
        text: "Nötron sayıları aynı, proton sayıları farklı tanecikler izotondur: ¹³₆C ve ¹⁴₇N için n=7’dir. Kütle numaraları aynı, proton sayıları farklı olanlar izobardır: ¹⁴₆C ve ¹⁴₇N için A=14 olur. Birinde n, diğerinde p+n eşittir. Her iki ilişkide de protonlar farklı olduğu için elementler farklıdır. Aynı A, aynı gerçek atom kütlesi veya aynı kimyasal davranış demek değildir. Bir çift hem aynı proton hem aynı nötron sayısındaysa farklı izotoplar diye adlandırılmaz; aynı çekirdek türüdür.",
      },
      {
        title: "İzoelektroniklikte elektron düzenini de kontrol et",
        text: "İzoelektronik tanecikler aynı elektron sayısı ve elektron dizilimine sahiptir. TYT’de temel hâl örnekleri olarak Ne, Na⁺, Mg²⁺ ve F⁻ on elektronla karşılaştırılabilir. Proton sayıları farklı olduğundan aynı element değildirler. Yalnız e sayısının eşit olduğunu görmek, özellikle farklı uyarılma durumları veya ileri düzey atomlarda bütün elektron düzeninin aynı olduğunu kanıtlamaz. Aynı elektron sayılı yaygın kapalı kabuklu iyonlarda proton sayısı arttıkça elektronları çekme etkisi artar; bu karşılaştırmayı farklı katman sayılı her atom dizisine koşulsuz yayma.",
      },
      {
        title: "Elektron değiştirmek ile izotop değiştirmek ayrı işlemdir",
        text: "Na atomunun Na⁺ olması elektron değişimidir; kütle numarası korunur. ¹²C ile ¹³C arasındaki fark ise çekirdekteki nötron sayısıdır. Elektron vermek bir izotopu başka izotopa dönüştürmez. Bir izotopun radyoaktif olması diğer bütün izotoplarının da radyoaktif olduğunu söylemez. Çekirdek tepkimelerini sıradan kimyasal iyonlaşma gibi okuma. Sorudaki olayın hangi taneciği değiştirdiği belirlenmeden fiziksel, kimyasal ve nükleer özellikler hakkında toptan karar verme.",
      },
      {
        title: "Periyodik tablodaki ondalık değer nereden gelir?",
        text: "Doğal bir element birden çok izotop içeriyorsa ortalama atom kütlesi izotop kütleleri ve bağıl bolluklarla ağırlıklandırılır. Özgün ve yaklaşık bir modelde kütleleri 20 ve 22 birim olan izotopların bollukları %75 ve %25 ise ortalama 20×0,75+22×0,25=20,5 olur. Bu ortalama tek bir atomun 20,5 nükleon taşıdığı anlamına gelmez. Hassas hesapta kütle numaraları yerine gerçek izotop kütleleri kullanılır. Oranlar toplamı %100 olmalı; basit aritmetik ortalama yalnız bolluklar eşitse uygundur.",
      },
    ],
    pitfalls: [
      {
        label: "İzoton için A’yı değil A−Z’yi karşılaştır",
        reason:
          "Farklı kütle numaraları aynı nötron sayısını verebilir; örneğin 13−6=14−7=7.",
      },
      {
        label: "Aynı elektron sayısı aynı element demek değildir",
        reason:
          "Elementin kimliği proton sayısıyla belirlenir; izoelektronik iyonların Z değerleri farklı olabilir.",
      },
      {
        label: "Ortalama kütle tek atomun nükleon sayısı değildir",
        reason:
          "Ondalıklı değer farklı izotopların ağırlıklı ortalamasından gelebilir; A tam sayılı tanecik sayısıdır.",
      },
    ],
    cases: [
      {
        name: "Karbonun iki izotopu",
        question: "¹²C ve ¹⁴C arasında hangi sayı korunur?",
        conclusion:
          "İkisinde de Z=6; nötronlar 6 ve 8’dir. Aynı element, farklı nötron sayısı izotop ilişkisini verir.",
        nodes: [
          n("¹²₆C", "p=6, n=6.", "nucleus"),
          n("¹⁴₆C", "p=6, n=8.", "nucleus"),
          n("Z aynı", "Element kimliği korunur.", "number", "6"),
          n("n farklı", "İzotop koşulu tamamlanır.", "chart"),
        ],
      },
      {
        name: "İzoton mu izobar mı?",
        question: "¹³₆C ve ¹⁴₇N için önce hangi çıkarma yapılmalı?",
        conclusion:
          "n değerleri 13−6=7 ve 14−7=7’dir. Nötronlar aynı, protonlar farklı olduğundan izotondurlar; A değerleri eşit olmadığından izobar değildirler.",
        nodes: [
          n("13−6", "Birinci taneciğin nötron sayısı 7.", "number", "7"),
          n("14−7", "İkinci taneciğin nötron sayısı 7.", "number", "7"),
          n("A değerleri farklı", "13 ve 14.", "document"),
          n("İzoton", "Eşitlik nötron sayısındadır.", "chart"),
        ],
      },
      {
        name: "On elektronlu aile",
        question: "Ne ve Na⁺ neden aynı element değildir?",
        conclusion:
          "İkisinde de temel hâlde 10 elektron bulunur; fakat proton sayıları Ne için 10, Na⁺ için 11’dir. Elektron düzeni benzerliği çekirdek kimliğini eşitlemez.",
        nodes: [
          n("Ne", "Z=10, e=10.", "nucleus"),
          n("Na⁺", "Z=11, e=11−1=10.", "nucleus"),
          n("Elektron düzeni aynı", "Bu temel hâl örneklerinde 2,8.", "chart"),
          n("Z farklı", "İzoelektronik, aynı element değil.", "document"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "A değerleri eşit iki taneciğin aynı element olduğunu söyleyebilir misin?",
        answer:
          "Hayır. Aynı A, p+n toplamının aynı olmasıdır. Z farklıysa elementler farklıdır ve izobar ilişkisi olabilir.",
      },
      {
        prompt:
          "İki izotopun ortalama kütlesini hesaplarken neden bolluk gerekir?",
        answer:
          "Her izotop ortalamaya örnekte bulunma oranı kadar katkı yapar. Bolluklar eşit değilse basit aritmetik ortalama doğru değildir.",
      },
    ],
    modelLimit:
      "Karşılaştırmalar seçili temel hâl atom ve iyon örnekleridir. Tanecik sayısı aracı her girdinin kararlı doğa örneği olduğunu veya izoelektronikliğin yalnız sayıyla her koşulda kanıtlanacağını iddia etmez.",
  },
];
