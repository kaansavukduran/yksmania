import type { LessonGuide } from "./types";
export const atomsGuide: LessonGuide = {
  id: "atom-modelleri",
  minutes: 40,
  objectives: [
    "Dalton, Thomson, Rutherford, Bohr ve modern model sırasını kanıtlarıyla açıkla.",
    "Deneyde gözlenen sonucu, modelin yorumunu ve açıklayamadığı durumu ayır.",
    "Soğurma–yayma ve enerji düzeyi ilişkisini kur; Bohr modelinin sınırını belirt.",
    "Yörünge ile orbital kavramlarını karıştırmadan atom çizimlerini yorumla.",
  ],
  sections: [
    {
      title: "Model, atomun büyütülmüş fotoğrafı değildir",
      paragraphs: [
        "Atom modeli, gözlenen sonuçları açıklamak ve yeni sonuçlar öngörmek için kurulan bir temsildir. Bilim insanları atomun içini bir fotoğraf gibi görüp çizmedi; deneysel etkilerden yapıya ilişkin çıkarımlar yaptı. Yeni bir modelin ortaya çıkması eski modeldeki her bilginin değersiz olduğu anlamına gelmez; yeni model daha geniş kanıtları açıklamalıdır.",
        "Bu konuyu bir isim sırası olarak ezberlemek yerine üç soruyla öğren: hangi gözlem vardı, bu gözlemden hangi yapı çıkarıldı, hangi olay açıklanamadı? Aşağıdaki modelde her atom çizimini değiştirirken kanıt ve sınır bilgisini birlikte oku. Daireler ve küreler öğretim amaçlıdır; boyutları gerçek ölçekte değildir.",
      ],
    },
    {
      title: "Demokritos’tan Dalton’a: düşünce ve deneysel açıklama",
      paragraphs: [
        "Demokritos maddenin bölünemeyen küçük birimlerden oluştuğunu ileri süren tarihsel atom düşüncesiyle anılır. Bu felsefi görüş, deneylerle sınanmış ayrıntılı modern atom yapısı değildir. Dalton ise kimyasal birleşmelerdeki nicel ilişkileri atom fikriyle açıklayan bilimsel model kurdu.",
        "Dalton modelinde atom içi dolu, bölünemez küre gibi düşünülür. Aynı elementin atomlarının özdeş olduğu, farklı element atomlarının farklı olduğu ve bileşiklerin atomların belirli oranlarda birleşmesiyle oluştuğu kabul edilir. Kimyasal tepkimede atomların yeniden düzenlenmesi, tür ve sayı korunumu açısından anlamlıdır. Fakat elektron gibi atom altı tanecikler ve aynı elementin farklı kütleli izotopları bu modelin bütün varsayımlarının doğru olmadığını gösterir.",
      ],
    },
    {
      title: "Thomson: atomun içinde negatif yük var",
      paragraphs: [
        "Katot ışınlarıyla yapılan çalışmalar negatif yüklü elektronların varlığına ilişkin kanıt sağladı. Atomun daha küçük bileşenleri bulunması, atomu yapısız ve bölünemez küre olarak düşünmenin yetersizliğini gösterdi. Thomson modelinde negatif elektronlar, pozitif yükün yayıldığı bir yapı içine yerleştirilir; bu yüzden üzümlü kek benzetmesi kullanılır.",
        "Bu modelde nötr atomun pozitif ve negatif yükleri birbirini dengeler. Ancak pozitif yükü küçük ve yoğun bir çekirdekte toplamaz. Nötr olmak ‘içinde hiç yük yok’ demek değildir; toplam yüklerin birbirini dengelemesidir. Elektronun bulunmasıyla çekirdeğin bulunması ayrı deneysel adımlardır.",
      ],
    },
    {
      title: "Rutherford: çoğu geçer, azı güçlü sapar",
      paragraphs: [
        "Rutherford’un saçılma düzeninde pozitif yüklü alfa tanecikleri ince altın levhaya gönderilir. Çoğunun levhadan büyük sapma olmadan geçmesi, atomun hacminin büyük bölümünün boşluklu olduğu yorumunu destekler. Çok azının büyük açıyla sapması veya geri dönmesi ise pozitif yük ve kütlenin büyük bölümünün küçük, yoğun bir bölgede toplandığına işaret eder: çekirdek.",
        "Gözlemi çıkarımdan ayır. ‘Çoğu alfa geçti’ deney sonucudur; ‘atom büyük ölçüde boşluklu’ onun açıklamasıdır. ‘Az sayıda alfa geri döndü’ sonucundan atomun tamamının dolu olduğu çıkarılmaz. Elektronların çekirdek çevresinde bulunması düşünülür; fakat klasik model elektronların neden enerji kaybedip çekirdeğe düşmediğini ve atomların çizgi spektrumlarını yeterince açıklamaz.",
      ],
    },
    {
      title: "Bohr: yalnız belirli enerji düzeyleri",
      paragraphs: [
        "Bohr modelinde elektronun izinli enerji düzeyleri vardır. Temel hal, elektronların en düşük uygun enerji düzeninde bulunduğu durumdur. Elektron uygun enerjiyi soğurunca daha yüksek düzeye geçebilir; bu uyarılmış haldir. Üst düzeyden alt düzeye geçerken iki düzey arasındaki enerji farkına eşit enerjili ışık yayılır. Her enerji miktarı her geçişi yaptıramaz.",
        "Çizgi spektrumu, yayılan veya soğurulan ışığın yalnız belirli enerjilerde olmasıyla ilişkilidir. Düzey farkı arttıkça yayılan fotonun enerjisi ve frekansı artar; dalga boyu azalır. E=hf bağıntısında h Planck sabiti, f frekanstır. Sayısal enerji hesabı gerekmedikçe bu konudaki temel iş, geçiş yönü ve enerji farkını doğru yorumlamaktır.",
        "Elektronun uyarılmasıyla iyonlaşması aynı değildir. Uyarılmada elektron hâlâ atomla bağlı bir düzeydedir; iyonlaşmada elektron atomdan kopar. Yalnız uyarılma elektron sayısını veya elementin proton sayısını değiştirmez. Bohr modeli H, He⁺ ve Li²⁺ gibi tek elektronlu türlerin bazı özelliklerini açıklar; çok elektronlu atomları tam olarak açıklamaz.",
      ],
    },
    {
      title: "Modern yaklaşım: kesin yol yerine orbital",
      paragraphs: [
        "Modern atom yaklaşımında elektronun çekirdek çevresinde izlediği kesin bir çember yolu verilmez. Orbital, elektronun bulunmasına ilişkin olasılık dağılımıyla tanımlanır. Yörünge belirli bir yol fikridir; orbital aynı yolun daha kalın çizilmiş hali değildir. Orbitallerin biçimleri ve enerji düzenleri sonraki atom–periyodik sistem konularında ayrıntılandırılır.",
        "Bir çizimde elektronların çekirdek çevresindeki halkalarda gösterilmesi, modern teoride hepsinin gezegen gibi kesin dairesel yollarda döndüğünü kanıtlamaz. Şemayı hangi modelin ve hangi öğrenme amacının kullandığını sor. Sayma şeması, enerji düzeyi şeması ve olasılık dağılımı aynı gösterim değildir.",
      ],
    },
    {
      title: "Modelleri buldukları bilgiyle karşılaştır",
      paragraphs: [
        "Dalton atomların belirli oranlarla birleşmesini; Thomson atom içindeki elektronları; Rutherford küçük, yoğun çekirdeği; Bohr belirli enerji düzeylerini öne çıkarır. Modern model kesin yörünge yerine olasılığa dayalı orbital yaklaşımını kullanır. Nötronun daha sonra Chadwick tarafından ortaya konması da ayrı bir tarihsel adımdır; onu Thomson’un deneyinin sonucu gibi yazma.",
        "Bir modelin soruda doğru temsil edilmesiyle bugün bütün ayrıntılarıyla doğru olması farklıdır. ‘Dalton’a göre bütün aynı element atomları özdeştir’ tarihsel modelin ifadesi olabilir; güncel izotop bilgisine göre aynı element atomlarının kütleleri farklı olabilir. Sorunun ‘modele göre’ mi ‘günümüzde’ mi dediğini kontrol et.",
      ],
    },
  ],
  examples: [
    {
      title: "Aynı deneyde iki gözlem, iki çıkarım",
      prompt:
        "İnce altın levhaya gönderilen alfa taneciklerinin çoğu doğrultusunu pek değiştirmeden geçiyor; çok azı geri dönüyor. Bu iki gözlem neyi destekler?",
      strategy: "Her gözlemi açıklaması gereken yapıyla eşleştir.",
      steps: [
        {
          label: "Çoğunluğun geçmesi",
          explanation:
            "Atomun bütün hacmi katı bir engel gibi davranmaz; büyük ölçüde boşluklu yapı düşüncesi desteklenir.",
        },
        {
          label: "Az sayıda güçlü sapma",
          explanation:
            "Pozitif yükün ve kütlenin büyük kısmının küçük yoğun çekirdekte toplanmasıyla açıklanır.",
        },
        {
          label: "Sınırı koru",
          explanation:
            "Bu sonuçlar tek başına elektronun kesin yörüngesini veya nötronun keşfini vermez.",
        },
      ],
      answer: "Boşluklu atom ve küçük, yoğun çekirdek.",
      check:
        "‘Çoğu geçiyor’ ile ‘azı geri dönüyor’ birbiriyle çelişmez; atom içindeki farklı ölçekleri açıklar.",
      pitfall:
        "Geri dönen az sayıdaki tanecikten atomun tamamının dolu olduğunu çıkarma.",
    },
    {
      title: "Uyarılmada element değişir mi?",
      prompt:
        "Bağlı bir elektron enerji alıp daha yüksek bir enerji düzeyine geçiyor; elektron atomdan kopmuyor. Bu olay iyonlaşma veya element değişimi midir?",
      strategy: "Değişen niceliği, değişmeyen tanecik sayılarından ayır.",
      steps: [
        {
          label: "Değişen",
          explanation:
            "Elektronun bulunduğu enerji düzeyi yükselir; bu uyarılmadır.",
        },
        {
          label: "Değişmeyen",
          explanation:
            "Elektron kopmadığı için toplam elektron sayısı değişmez. Proton sayısı da değişmez.",
        },
        {
          label: "Sınıflandır",
          explanation:
            "İyonlaşma yoktur; elementin kimliği proton sayısıyla ilişkili olduğundan element de değişmez.",
        },
      ],
      answer: "Uyarılmadır; iyonlaşma veya element değişimi değildir.",
      check:
        "Alt düzeye dönüşte enerji yayılabilir; bu, elektronun mutlaka atomdan ayrıldığı anlamına gelmez.",
      pitfall: "Enerji almakla atomdan elektron kaybetmeyi aynı olay sayma.",
    },
    {
      title: "Bohr’un sınırını elektron sayısıyla denetle",
      prompt:
        "H, He⁺ ve nötr He türlerinden hangileri tek elektronlu model kapsamında değerlendirilebilir? Atom numaraları H için 1, He için 2’dir.",
      strategy: "Önce elektron sayılarını hesapla; isimden karar verme.",
      steps: [
        {
          label: "H",
          explanation: "Nötr hidrojenin bir protonu ve bir elektronu vardır.",
          expression: "e=1",
        },
        {
          label: "He⁺",
          explanation:
            "Helyum iki protonlu; +1 yük bir elektron eksik olduğunu gösterir.",
          expression: "e=2−1=1",
        },
        {
          label: "Nötr He",
          explanation: "İki protonu iki elektron dengeler; çok elektronludur.",
          expression: "e=2",
        },
      ],
      answer: "H ve He⁺ tek elektronludur; nötr He değildir.",
      check:
        "Katyon olmak kendi başına tek elektronlu olmak demek değildir; atom numarasıyla birlikte sayılır.",
      pitfall:
        "Helyum adı aynı diye nötr He ile He⁺’ı aynı modele koşulsuz bağlama.",
    },
  ],
  recall: [
    {
      prompt: "Thomson ile Rutherford’un pozitif yük dağılımı nasıl farklı?",
      answer:
        "Thomson’da pozitif yük yayılmış bir yapıdadır. Rutherford’da küçük ve yoğun çekirdekte toplanır.",
    },
    {
      prompt:
        "Bir elektron üst düzeyden alt düzeye geçerken enerji alır mı verir mi?",
      answer:
        "İki düzey arasındaki fark kadar enerji yayar. Ters yönde uygun enerjiyi soğurması gerekir.",
    },
    {
      prompt: "Orbital neden yörüngeyle aynı değil?",
      answer:
        "Orbital olasılık dağılımıyla ilişkilidir; elektronun izlediği kesin bir çember yolu değildir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, PDF s.25–26 / basılı s.23–24; OGM Dersler Cepte atom modelleri notlarıyla önceki karşılaştırma. Gözlem–çıkarım, uyarılma–iyonlaşma ve model sınırları özgün örneklerle genişletildi.",
};
