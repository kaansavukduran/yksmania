import type { LessonGuide } from "./types";
export const periodicGuide: LessonGuide = {
  id: "periyodik-sistem",
  minutes: 50,
  objectives: [
    "Artan atom numarasıyla tablo düzenini ve periyot/grup ayrımını açıkla.",
    "İlk 20 nötr atomda katmanlardan yer bul; iyonu ve He/H istisnalarını ayır.",
    "Metal, ametal, yarı metal ve soy gaz özelliklerini uygun koşullarla karşılaştır.",
    "Periyodik özellikleri gerekçeli eğilimler olarak kullan; atom ve iyon yarıçaplarını karıştırma.",
  ],
  sections: [
    {
      title: "Tablo bir isim listesi değil, düzenli değişim haritasıdır",
      paragraphs: [
        "Elementin kimliğini proton sayısı, yani atom numarası Z belirler. Modern periyodik tabloda elementler artan Z’ye göre sıralanır. Mendeleyev’in tarihsel tablosunda kütle ve benzer özelliklerle sınıflama, boş bırakılan yerler ve öngörüler önemliydi; modern yerleşimi ise atom kütlesi belirlemez. Aynı elementin izotoplarında nötron ve kütle numarası değişebilir, tablo adresi değişmez.",
        "Tabloda 7 yatay periyot, 18 düşey grup vardır. Altta ayrı çizilen lantanitler ve aktinitler fazladan 8. ve 9. periyot değildir; 6. ve 7. periyodun parçalarıdır. Aynı grupta benzer değerlik düzeni bulunan elementlerin kimyasal özellikleri benzer olabilir; fakat ‘aynıdır’ veya her özelliği eşittir denmez.",
      ],
    },
    {
      title: "Proton, elektron ve yükü ayrı izle",
      paragraphs: [
        "Nötr atomda e=Z; iyon yükü q=Z−e olduğundan e=Z−q. Na⁺ için Z=11 ve e=10; Cl⁻ için Z=17 ve e=18’dir. Elektron alıp vermek elementin proton sayısını değiştirmez. Na⁺ iyonunun elektron dağılımı neonunkiyle aynı olabilir ama sodyumun tablo yeri 3. periyot 1. grup olarak kalır.",
        "Aşağıdaki tabloda element seçip atom numarasını, periyodunu ve grubunu birlikte oku. Katman modeli ilk 20 elementin nötr temel hâli için gösterilir; daha ağır atomlarda aynı basit 2,8,8 doldurma yaklaşımı koşulsuz kullanılmaz. İyon yükünü değiştirirken değişmeyen proton sayısını sesli söyle; tablo konumu ile anlık elektron dağılımını ayır.",
      ],
    },
    {
      title: "İlk 20 atomda periyot ve ana grup nasıl bulunur?",
      paragraphs: [
        "Nötr ve temel hâlde ilk 20 element için dolu elektron katmanı sayısı periyodu verir. Al için 2,8,3 dağılımında üç dolu katman vardır; 3. periyottadır. Ana gruplarda son katmandaki elektron sayısı grup hakkında bilgi verir: 1→1. grup, 2→2. grup; 3…8 ise genellikle 13…18. gruplara karşılık gelir. Eski A grubu adları bu son gruplar için 3A…8A biçimindedir.",
        "He=2, dolu ilk katmanı nedeniyle 1. periyotta ve kimyasal davranışıyla 18. gruptadır; iki elektronu var diye 2. gruba koyma. H 1. grupta yer alsa da alkali metal değildir. Bir iyonun katman sayısını nötr atomun periyodu yerine kullanmak da hatalıdır: Mg²⁺=2,8; element Mg yine 3. periyottadır.",
      ],
      table: {
        headers: ["Nötr atom", "Katman düzeni", "Tablo adresi"],
        rows: [
          ["Li, Z=3", "2,1", "2. periyot / 1. grup"],
          ["Al, Z=13", "2,8,3", "3. periyot / 13. grup"],
          ["Cl, Z=17", "2,8,7", "3. periyot / 17. grup"],
          ["He, Z=2", "2", "1. periyot / 18. grup"],
        ],
      },
    },
    {
      title: "Sınıflar ve günlük özelliklerde genellemeyi sınırla",
      paragraphs: [
        "Metaller genellikle ısı ve elektriği iletir; tel/levha hâline getirilebilir. Oda koşullarında çoğu katıdır; cıva sıvıdır. Ametallerin katı, sıvı ve gaz örnekleri vardır; brom sıvı, klor gazdır. Grafit gibi özel yapılar ‘ametaller elektriği asla iletmez’ genellemesini bozar. Yarı metaller bazı özellikleriyle metal ve ametal arasında davranır; elektronik malzemelerde bu özellikler önemlidir.",
        "1. grupta H dışındaki alkali metaller, 2. grupta toprak alkali metaller, 17. grupta halojenler ve 18. grupta soy gazlar bulunur. Soy gazların düşük tepkime eğilimi kararlı elektron düzeniyle ilişkilidir; ‘hiçbir koşulda bileşik yapmaz’ mutlak yargısı kullanılmaz. Metallerin, ametallerin veya grupların her üyesinin yoğunluğu/erime noktası için tek bir koşulsuz sıralama yapma.",
      ],
    },
    {
      title: "Atom yarıçapı: yeni katman ve çekim birlikte",
      paragraphs: [
        "Aynı grupta aşağı doğru yeni dolu katmanlar eklendiği için atom yarıçapı genel olarak büyür. Aynı periyotta soldan sağa proton sayısı artar; benzer katmanlardaki elektronlar daha güçlü çekildiğinden yarıçap genel olarak küçülür. Bu bir eğilimdir; karşılaştırılan türün atom mu iyon mu olduğu ve ölçülen yarıçap tanımı önemlidir.",
        "Bir atom elektron vererek katyon olduğunda genellikle küçülür; elektron alarak anyon olduğunda büyür. Aynı elektron sayısındaki türlerde proton sayısı fazla olan daha küçük olma eğilimindedir: O²⁻, F⁻, Ne, Na⁺, Mg²⁺ türlerinin hepsi 10 elektrondur; bu dizide proton sayısı arttıkça çekim güçlenir ve yarıçap küçülür. Farklı sayıda katmanı olan her türü bu tek kuralla sıralama.",
      ],
    },
    {
      title: "İyonlaşma enerjisi ile elektronegatiflik farklı kavramlardır",
      paragraphs: [
        "Birinci iyonlaşma enerjisi, gaz hâlindeki nötr bir atomdan bir elektron koparmak için gereken enerjidir. Genellikle periyotta sağa doğru artar, grupta aşağı doğru azalır; fakat alt katman ve elektron eşleşmesi nedeniyle Be–B ve N–O gibi istisnalar vardır. Tek bir ok şeması bütün ikili karşılaştırmaların ispatı değildir. Ardışık iyonlaşmalarda elektron daha pozitif bir türden koparıldığı için enerji artar; büyük sıçrama değerlik elektronları hakkında bilgi verebilir.",
        "Elektronegatiflik, bağ yapan atomun ortak elektronları kendine çekme eğilimidir; bağ bağlamında düşünülür. Yaygın ölçeklerde F en yüksek değere sahiptir; soy gazların çoğuna bu düzeyde standart değer atanmaz. Elektron ilgisi ise gaz hâlindeki türe elektron eklenmesindeki enerji değişimidir. İşaret ve enerji verme/alma tanımı soruda nasıl verildiyse onu kullan; ‘sağa giderken her zaman artar’ genellemesi bu özelliğe koşulsuz uygulanmaz.",
      ],
    },
    {
      title: "Metaliklik, etkinlik ve soru çözme sırası",
      paragraphs: [
        "Metalik karakter genel olarak sola ve aşağıya, ametalik karakter sağa ve yukarıya doğru güçlenir. Metalin elektron verme eğilimi ile ametalin elektron alma eğilimi aynı olay değildir; ‘kim daha aktif’ sorusunda metal mi ametal mi karşılaştırıldığı önemlidir. Soy gazları ametal etkinlik okuna otomatik dahil etme.",
        "Tablo sorusunda önce türü tanı: nötr atom, iyon veya izotop mu? Sonra Z’yi bul; nötr temel hâl düzeniyle adresi belirle; son olarak sorulan özelliği uygun eğilim ve istisnayla değerlendir. Eş elektronlu olmak aynı element veya aynı periyot olmak değildir. İki bilgi çelişiyorsa atom numarasının değişmediği temel ilkeye geri dön.",
      ],
    },
  ],
  examples: [
    {
      title: "İyonun elektronları adresi değiştirmez",
      prompt:
        "X²⁺ iyonunda 10 elektron vardır. X’in atom numarası, nötr katman düzeni, periyodu ve grubu nedir?",
      strategy: "Önce yük denkleminden protonu bul; tabloyu nötr atomdan oku.",
      steps: [
        {
          label: "Kimliği bul",
          expression: "Z=e+q=10+2=12",
          explanation:
            "İki elektron vermiş atomun protonu 12’dir; X magnezyumdur.",
        },
        {
          label: "Nötr düzen",
          expression: "Mg:2,8,2",
          explanation: "Üç dolu katman ve iki değerlik elektronu vardır.",
        },
      ],
      answer: "Z=12; 3. periyot, 2. grup.",
      check: "Mg²⁺ dağılımı 2,8 olsa da iyonu neon elementi yapmaz.",
      pitfall: "İyonun iki katmanından 2. periyot sonucu çıkarma.",
    },
    {
      title: "Helyum istisnası",
      prompt:
        "Nötr atomunda iki elektron olan element hangi periyot ve gruptadır?",
      strategy:
        "İlk katmanın kapasitesi ve He’nin soy gaz davranışını birlikte kullan.",
      steps: [
        {
          label: "Atomu tanı",
          expression: "Z=2 → He",
          explanation: "Nötr atomda elektron ve proton sayıları eşittir.",
        },
        {
          label: "Adres",
          expression: "1. periyot / 18. grup",
          explanation: "İlk katman doludur; He 2. grup metali değildir.",
        },
      ],
      answer: "1. periyot, 18. grup.",
      check:
        "Son katmandaki iki elektron bilgisini istisnasız grup kuralı gibi kullanmadık.",
      pitfall:
        "Katman doluluğunu yalnız sekiz elektronla sınırlama; ilk katman ikiyle dolar.",
    },
    {
      title: "Eş elektronlu iyonları sırala",
      prompt:
        "O²⁻, Na⁺ ve Mg²⁺ türlerini büyük yarıçaptan küçüğe sırala. Atom numaraları sırasıyla 8,11,12.",
      strategy:
        "Elektron sayılarını eşitle; sonra proton çekimini karşılaştır.",
      steps: [
        {
          label: "Elektron sayıları",
          expression: "8+2=11−1=12−2=10",
          explanation: "Üç tür de eş elektronludur.",
        },
        {
          label: "Çekim",
          expression: "Z:8<11<12 → yarıçap:O²⁻>Na⁺>Mg²⁺",
          explanation:
            "Aynı elektron sayısında daha çok proton daha güçlü çekim oluşturur.",
        },
      ],
      answer: "O²⁻ > Na⁺ > Mg²⁺",
      check:
        "Karşılaştırmayı iyon yüküne tek başına değil, eş elektronluluk ve proton sayısına dayandırdık.",
      pitfall: "‘Periyotta sağa küçülür’ okunu türleri denetlemeden uygulama.",
    },
    {
      title: "Periyodik eğilimi gerekçelendir",
      prompt:
        "Nötr Li ve Na atomlarından hangisinin yarıçapı genellikle büyük, birinci iyonlaşma enerjisi düşüktür?",
      strategy: "Aynı grubun farklı periyotlarını karşılaştır.",
      steps: [
        {
          label: "Katman sayısı",
          expression: "Li:2,1; Na:2,8,1",
          explanation: "Na’nın değerlik elektronu daha dış bir katmandadır.",
        },
        {
          label: "İki ayrı özellik",
          explanation:
            "Na’nın yarıçapı daha büyük; dış elektronu koparmak genel olarak daha kolaydır.",
        },
      ],
      answer:
        "Na daha büyük yarıçaplı ve daha düşük birinci iyonlaşma enerjilidir.",
      check:
        "Elektron verme ile ortak bağ elektronlarını çekme kavramlarını birbirine karıştırmadık.",
      pitfall:
        "Proton sayısı büyük olan atom her koşulda küçük olur deme; yeni katmanı hesaba kat.",
    },
  ],
  recall: [
    {
      prompt: "İzotop oluşunca tablo yeri değişir mi?",
      answer:
        "Proton sayısı değişmediği için değişmez; nötron ve kütle numarası değişebilir.",
    },
    {
      prompt: "Al³⁺’ün 10 elektronu olması onu 18. gruba taşır mı?",
      answer: "Hayır. Al Z=13 olan elementtir; 3. periyot 13. grupta kalır.",
    },
    {
      prompt: "Tablonun alttaki iki sırası neden ayrı çizilir?",
      answer:
        "Tabloyu daha dar göstermek için; lantanit ve aktinitler 6. ve 7. periyodun parçalarıdır.",
    },
    {
      prompt:
        "İyonlaşma enerjisi için yön oku bütün karşılaştırmalara yeter mi?",
      answer:
        "Hayır. Genel eğilim yanında alt katman/elektron eşleşmesi istisnaları ve türün atom/iyon oluşu incelenir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri PDF s.30–36 (basılı 28–34), elementlerin yerleşimi/sınıflandırılması/periyodik özellikler; ilk 20 nötr atom modeli ve 118 element verisi uygulamanın kaynak kaydına bağlıdır. Anlatım ve çözümler özgündür; resmî sınav sorusu değildir.",
};
