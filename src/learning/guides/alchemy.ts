import type { LessonGuide } from "./types";
export const alchemyGuide: LessonGuide = {
  id: "simyadan-kimyaya",
  minutes: 40,
  objectives: [
    "Tarihsel amaç, kullanılan araç, teknik ve elde edilen ürünü ayrı değerlendir.",
    "Simyadan modern kimyaya geçişi ölçüm, sınanabilir açıklama ve tekrarlanabilirlikle açıkla.",
    "Başlıca düşünür ve bilim insanlarını katkılarıyla ilişkilendir.",
    "Ayırma tekniğini hedeflenen maddeye ve özelliğe göre seç; bilimsel deneyde değişkenleri ayır.",
  ],
  sections: [
    {
      title: "İhtiyaçtan maddeyi değiştirmeye",
      paragraphs: [
        "İnsanlar yiyecek saklamak, hastalıkları hafifletmek, metalleri işlemek, boya ve kap yapmak için çok eski dönemlerden beri maddelerle uğraştı. Öğütme, ısıtma, çözme ve süzme gibi işlemler yararlı sonuçlar verdi. Bir işlemin işe yaraması, o işlemin nedenini açıklayan bilimsel bir kuramın da kurulmuş olduğu anlamına gelmez.",
        "Bu konuda dört soruyu ayrı sor: kişi ne amaçladı, hangi aracı kullandı, hangi işlemi yaptı, ne elde etti? ‘İmbikle sıvı topladı’ araç ve işlem bilgisidir; ‘ölümsüzlük aradı’ amaç bilgisidir; ‘esans elde etti’ ürün bilgisidir. Sorunun bu farklı katmanları birbirinin yerine kullanması en sık karışıklık kaynağıdır.",
      ],
    },
    {
      title: "Simyanın amaçları ve yöntem sınırı",
      paragraphs: [
        "Simyadaki tipik arayışlar değersiz metali altına çevirmek ve ölümsüzlük iksirini bulmaktır. Tarihsel simya; pratik denemeleri, felsefi görüşleri ve döneminin çeşitli inançlarını birlikte içerir. Ders bağlamında bilimsel bir disiplin sayılmaz; bütün bulguları açıklayan, sistematik biçimde sınanan bir kuramsal yapıya dayanmaz.",
        "Bu değerlendirme ‘simyacılar hiçbir şey yapmadı’ veya ‘hiç gözlem yapmadı’ demek değildir. Sınama-yanılma ve zanaat bilgisiyle araçlar, teknikler ve ürünler gelişti. Soruda ‘tamamı bilimsel yöntemdir’ ile ‘hiç yararlı katkısı yoktur’ gibi iki uç yargıyı da sorgula. Bir dönemin bütün kişilerini bugünkü bilim anlayışıyla tek cümlede özdeşleştirmek yerine verilen kanıta bak.",
      ],
    },
    {
      title: "Araç, teknik ve ürün birbirinin yerine geçmez",
      paragraphs: [
        "İmbik damıtmayla, kroze yüksek sıcaklıkta küçük örnekleri ısıtmayla, fırın ısı vermeyle ilişkilidir. Terazi kütleyi ölçer; su banyosu sıcaklığı daha kontrollü aktarmaya yardım eder. Araçların bir kısmı hem eski dönemlerde hem modern laboratuvarlarda bulunabilir. Sadece bir terazi resmi görerek modern kimya veya simya kararı verilemez.",
        "Cam, seramik, mürekkep, boya, bazı alaşımlar ve esanslar tarihsel madde işleme çalışmalarının ürünlerindendir. Bunların günümüzde kullanılması tarihsel bağlantıyı silmez. Buna karşılık modern sentetik polimer üretimi, elektroliz ve pil teknolojisini tarihsel simyaya doğrudan mal etmemeliyiz. ‘Madde eski zamanlarda doğada vardı’ ile ‘belirli bir modern ürün o dönemde üretildi’ farklı iddialardır.",
      ],
    },
    {
      title: "Ayırma tekniğini hedeften seç",
      paragraphs: [
        "Süzme, sıvı içinde çözünmeyen uygun büyüklükteki katıyı filtreyle ayırabilir. Kumlu suda kum tutulabilir; çözünmüş sofra tuzu sıradan filtrede tutulmaz. Buharlaştırma sıvının uzaklaşmasıyla geride çözünmüş katıyı bırakabilir. İstenen suyu da toplamaksa buharın ayrıca soğutulup yoğunlaştırılması ve başka kapta biriktirilmesi gerekir; bu damıtmadır.",
        "Özütleme, bir bileşenin uygun çözücüye geçmesinden yararlanır; çayın bazı bileşenlerinin suya geçmesi öğretici bir örnektir. Kristallendirme, çözünürlük koşulları değiştirilerek çözünmüş maddenin kristal halde ayrılmasıdır. Çözme, her zaman yeni kimyasal madde oluşması anlamına gelmez. Mayalama ise biyokimyasal dönüşümler içerir; bütün eski işlemleri ‘fiziksel ayırma’ diye tek sınıfa koyma.",
      ],
      table: {
        headers: ["Verilen durum", "İstenen", "İlk uygun düşünce"],
        rows: [
          ["Kumlu su", "Kumu ayırmak", "Süzme: çözünmeyen katı tutulabilir."],
          [
            "Tuzlu su",
            "Katı tuzu elde etmek",
            "Buharlaştırma veya uygun kristallendirme koşulları.",
          ],
          [
            "Tuzlu su",
            "Suyu başka kapta toplamak",
            "Damıtma: buharlaşma + yoğunlaşma + toplama.",
          ],
          [
            "Bitkideki çözünebilen bileşen",
            "Çözücüye geçirmek",
            "Özütleme; hangi bileşenin çözünebildiği önemlidir.",
          ],
        ],
      },
    },
    {
      title: "Dört element düşüncesini tarihsel model olarak oku",
      paragraphs: [
        "Empedokles maddeyi toprak, su, hava ve ateşle açıklayan tarihsel düşünceyle; Aristo bu dört unsuru sıcak–soğuk ve kuru–ıslak nitelikleriyle ilişkilendiren modelle anılır. Bu modelde ateş sıcak-kuru, hava sıcak-ıslak, su soğuk-ıslak, toprak soğuk-kuru kabul edilir. Bunlar modern periyodik tablonun elementleri değildir. Bugünkü su bir bileşik, hava karışımdır; ateş de modern anlamda element değildir.",
        "Demokritos’un atom düşüncesi maddenin bölünemeyen küçük birimlerden oluştuğuna ilişkin felsefi bir yaklaşımdır. Deneysel veriye dayalı modern atom modelleriyle aynı kanıt düzeyinde sunulmaz. Soruda bir görüşün kendi döneminde ne söylediği ile güncel bilimsel açıklamanın ne olduğu ayrılmalıdır.",
      ],
    },
    {
      title: "Bilim insanlarını katkısıyla ilişkilendir",
      paragraphs: [
        "Câbir bin Hayyan tarihsel deney araçları, imbik, damıtma ve asitlerle yürütülen çalışmalarla; Ebû Bekir er-Râzî tıbbi uygulamalar, maddelerin sınıflandırılması ve laboratuvar araçlarıyla ilişkilendirilir. Bunları tek bir ezber listesi yerine ‘hangi sorun, hangi işlem, hangi kanıt’ sorularıyla öğren. Tarihsel öncülük atıfları ile güncel bir kimyasal keşfin deneysel ispatı aynı ifade değildir.",
        "Robert Boyle, Kuşkucu Kimyager adlı eseri ve element anlayışına getirdiği yaklaşım açısından önemlidir. Ders bağlamında, daha basit maddelere ayrılamayan saf madde düşüncesiyle anılır. Boyle’un tarihsel tanımı modern proton sayısına dayalı tanımın aynısı değildir. Lavoisier’nin nicel ölçümleri ve yanmada oksijenin rolünü açıklaması modern kimyaya geçişte önemli bir adımdır.",
      ],
    },
    {
      title: "Kimyayı bilim yapan yalnız araç değil kanıt düzenidir",
      paragraphs: [
        "Modern kimyada gözlem, ölçüm, deney ve akıl yürütme açıklamaları sınamak için birlikte kullanılabilir. Nicel veri sayı ve birim içerir; nitel gözlem renk değişimi gibi bir özelliği anlatabilir. Aynı koşullarda tekrarlanabilen ölçümler, açıklamanın başka kişilerce de sınanabilmesini sağlar. Sonuca uymayan veriyi saklamak veya tek bir olumlu örnekle genel yasa ilan etmek bu düzeni bozar.",
        "Hipotez sınanabilir bir açıklama önerisidir; deney onu destekleyebilir veya revizyon gerektirebilir. Kuram, desteklenmiş açıklamalar bütünüdür; yasa ise belirli koşullardaki ilişkiyi betimler. ‘Hipotez yeterince tekrar edilince kurama, kuram da yasaya dönüşür’ biçiminde zorunlu bir merdiven yoktur. Her araştırmanın tek ve değişmez sırayla ilerlemesi gerektiği de söylenemez.",
      ],
    },
    {
      title: "Değişkenleri ayır, karşılaştırmayı adil kur",
      paragraphs: [
        "Bir deneyde etkisini araştırdığın etken bağımsız değişken, ölçtüğün sonuç bağımlı değişkendir. Diğer ilgili koşulların aynı tutulması karşılaştırmanın yorumunu güçlendirir. Örneğin sıcaklığın çözünme süresine etkisi araştırılırken madde türü, miktarı, su miktarı ve karıştırma koşulu da aynı tutulmalıdır. Hem sıcaklığı hem madde miktarını değiştirirsen farkın hangi etkenden kaynaklandığını tek başına ayıramazsın.",
        "Bir kontrol grubu veya karşılaştırma koşulu gözlenen farkı değerlendirmeye yardım eder; kontrol sözcüğü sadece ‘hiçbir işlem yapmamak’ demek değildir. Modelde bir koşulu değiştir, hangi ölçümün bunu sınayacağını söyle ve sonuca göre açıklamanı gözden geçir. Laboratuvar çalışmaları öğretmen gözetiminde ve ilgili güvenlik yönergesiyle yürütülür.",
      ],
    },
    {
      title: "Kütleyi hangi sistemde ölçtüğünü belirle",
      paragraphs: [
        "Kütlenin korunumu, kimyasal değişimde hesaba katılan bütün giren ve ürünlerin toplam kütlesiyle ilgilidir. Dışarıyla madde alışverişi yapmayan kapalı bir sistemde toplam kütle sabit kalır. Açık kapta gaz çıkarsa terazide okunan kap içeriği azalabilir; bu, maddenin yok olduğu anlamına gelmez, sınırın dışına geçen gaz da hesaba katılmalıdır.",
        "Bu konu mol hesabına veya atomun ayrıntılı yapısına geçmeden önce ölçümün ve sınırın önemini öğretir. Soruda önce kapalı mı açık mı, hangi parçalar tartılıyor ve madde alışverişi var mı sorularını cevapla. Aynı araçla yapılan iki çalışmayı bilimsel açıdan ayıran fark, ölçümün açıklamayı nasıl sınadığıdır.",
      ],
    },
  ],
  examples: [
    {
      title: "İmbikten döneme atlama",
      prompt:
        "Bir metinde bir kişinin ölümsüzlük aradığı, imbik kullandığı ve kokulu bir sıvı topladığı belirtiliyor. Hangi bilgi amaç, hangisi araç, hangisi üründür?",
      strategy: "Her ifadeyi neyi anlattığına göre sınıflandır.",
      steps: [
        {
          label: "Amaç",
          explanation:
            "Ölümsüzlük aramak, tarihsel simya arayışlarından biridir.",
        },
        {
          label: "Araç ve işlem",
          explanation:
            "İmbik araçtır. Buhar yoğunlaştırılıp sıvı toplanıyorsa damıtma işlemi anlatılır.",
        },
        {
          label: "Ürün ve kanıt sınırı",
          explanation:
            "Kokulu sıvı ürün bilgisidir. Onu elde etmek ölümsüzlüğün kanıtı veya tek başına bilimsel kuram değildir.",
        },
      ],
      answer: "Amaç: ölümsüzlük; araç: imbik; ürün: kokulu sıvı.",
      check:
        "Aynı imbik modern çalışmada da kullanılabilir; aracı görmek tek başına yöntem sınıfını belirlemez.",
      pitfall:
        "Amaç, araç ve sonucu tek bir ‘bilimsel’ etiketiyle birbirine karıştırma.",
    },
    {
      title: "Suyu toplamakla tuzu toplamak",
      prompt:
        "Tuzlu sudan ayrı bir kapta su elde edilmek isteniyor. Süzme, yalnız buharlaştırma ve damıtma seçeneklerinden hangisi hedefi karşılar?",
      strategy: "İstenen ürünün yolunu her işlemde izle.",
      steps: [
        {
          label: "Süzmeyi ele",
          explanation:
            "Çözünmüş tuz sıradan filtrede tutulmaz; su ve tuz birlikte filtrata geçebilir.",
        },
        {
          label: "Yalnız buharlaştırmayı incele",
          explanation:
            "Su uzaklaşır, tuz geride kalabilir. Suyu başka kapta toplama adımı yoktur.",
        },
        {
          label: "Buharı geri topla",
          explanation:
            "Buhar soğutulup yoğunlaştırılarak ayrı kapta biriktirilirse damıtma yapılır.",
        },
      ],
      answer: "Damıtma.",
      check:
        "İstenen tuz olsaydı buharlaştırma uygun bir ilk düşünce olabilirdi. Teknik hedefe göre seçilir.",
      pitfall: "‘İçinde katı var’ diyerek her karışımda süzmeyi seçme.",
    },
    {
      title: "İki değişkeni birden değiştirme",
      prompt:
        "A kabında 5 g bitki 40 °C’de, B kabında 12 g aynı bitki 80 °C’de eşit su ve sürede bekliyor. Renk farkı yalnız sıcaklığa bağlanabilir mi?",
      strategy: "Eşit tutulanlarla değiştirilenleri ayrı yaz.",
      steps: [
        {
          label: "Değişenler",
          explanation: "Sıcaklık ve bitki miktarı birlikte değişiyor.",
        },
        {
          label: "Sonuç ölçümü",
          explanation:
            "Renk farkı ölçülen sonuç olabilir; iki etken de bu sonucu etkileyebilir.",
        },
        {
          label: "Yeni karşılaştırma kur",
          explanation:
            "Sıcaklığı araştırmak için bitki türü ve miktarı, su ve süreyi aynı tutup yalnız sıcaklığı değiştir.",
        },
      ],
      answer: "Hayır; bu karşılaştırma sıcaklığın etkisini tek başına ayırmaz.",
      check:
        "Bir etkeni aynı tuttuğunda diğerinin etkisini yorumlamak daha mümkün olur.",
      pitfall:
        "İki kap kullanılmış olmasını otomatik olarak kontrollü deney sayma.",
    },
    {
      title: "Açık kapta azalan tartım",
      prompt:
        "Açık bir kaptaki tepkimede gaz çıkıyor ve kapla içeriğinin tartımı azalıyor. Bu gözlem kütlenin korunmadığını gösterir mi?",
      strategy: "Tartılan sistemin sınırını ve sınırdan geçen maddeyi belirle.",
      steps: [
        {
          label: "Ölçümün kapsamı",
          explanation: "Terazi yalnız kap ve içinde kalanları tartıyor.",
        },
        {
          label: "Dışarı çıkan madde",
          explanation: "Gaz sistemin dışına geçiyor; son tartıma dahil değil.",
        },
        {
          label: "Bütün kütleyi hesapla",
          explanation:
            "Çıkan gaz da ürünlere eklenmelidir. Kapalı düzende sistemin toplamı korunur.",
        },
      ],
      answer:
        "Hayır. Azalma, gazın tartılan açık sistemden çıkmasıyla açıklanabilir.",
      check:
        "Başlangıç kütlesini kapta kalan ürünler ve dışarı çıkan gazın toplamıyla karşılaştır.",
      pitfall: "Ölçüm alanından çıkan maddeyi yok olmuş sayma.",
    },
  ],
  recall: [
    {
      prompt: "Simya bilim sayılmıyorsa katkısı da yok mudur?",
      answer:
        "Hayır. Araç, ürün ve teknik katkıları vardır. Bunlar bütünlüklü sınanabilir bir bilimsel açıklama düzeniyle aynı şey değildir.",
    },
    {
      prompt: "Aristo’nun modelindeki ‘su’, modern anlamda element midir?",
      answer:
        "Hayır. Dört unsur modeli tarihsel bir açıklamadır; modern kimyada su H₂O bileşiğidir.",
    },
    {
      prompt: "Bir terazi resmi bilimsel yöntem kullanıldığını kanıtlar mı?",
      answer:
        "Hayır. Ölçümlerin sistematik oluşu, koşulların kaydı ve açıklamanın nasıl sınandığı değerlendirilmelidir.",
    },
    {
      prompt: "Bağımsız ve bağımlı değişkeni nasıl ayırırsın?",
      answer:
        "Etkisini araştırmak için değiştirdiğim bağımsız, onun etkisini görmek için ölçtüğüm sonuç bağımlı değişkendir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, PDF s.11–13 / basılı s.9–11; OGM Dersler Cepte Kimya 9, 1. sayı s.10; Aurelia Simyadan Kimyaya kopya kağıdı, PDF s.1–9. Kaynaklardaki tarihsel modeller güncel element tanımıyla karıştırılmadan açıklandı. Metin ve çözümlü örnekler özgündür.",
};
