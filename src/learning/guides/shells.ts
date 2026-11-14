import type { LessonGuide } from "./types";
export const shellsGuide: LessonGuide = {
  id: "katman-elektron-dizilimi",
  minutes: 40,
  objectives: [
    "Atom numarası, iyon yükü ve toplam elektron sayısını ilişkilendir.",
    "İlk 20 nötr atomun temel hâl katman dağılımını yazıp toplamla denetle.",
    "Katman kapasitesiyle dolma sırasını, iyon dağılımıyla nötr atomun adresini ayır.",
  ],
  sections: [
    {
      title: "Önce taneciğin elektron sayısını bul",
      paragraphs: [
        "Z atom numarası proton sayısıdır. Nötr atomda elektron sayısı e=Z; iyon için q=Z−e olduğundan e=Z−q. Buradaki q işaretli yüktür: +2 gerçekten +2, −1 gerçekten −1 olarak yerine yazılır. Pozitif iyon elektron vermiştir, negatif iyon elektron almıştır. Proton sayısı değişmez; elektron almak başka bir element oluşturmaz.",
        "Örneğin Mg²⁺ için Z=12 ve e=12−2=10; Cl⁻ için Z=17 ve e=17−(−1)=18’dir. İyonun dağılımı verilmişse önce katmanları topla; taneciğin nötr olduğunu bilmeden toplamı doğrudan Z sanma. X²⁺ için toplam 18 elektron bulunması Z=20 demektir, Z=18 değil.",
      ],
    },
    {
      title: "Katmanlar enerji düzeyidir; çizilen çember gerçek yol değildir",
      paragraphs: [
        "Katmanlar temel enerji düzeylerini basitleştirilmiş biçimde anlatır; n=1,2,3,4 için K,L,M,N adları kullanılır. Çizimdeki noktalar elektronları saymayı kolaylaştırır. Modern atomda elektronların kesin dairesel yörüngelerde dolandığı söylenmez; orbitaller olasılık dağılımlarıyla betimlenir. Bu derste ayrıntılı orbital dizilimine girmeden ilk 20 nötr atomun temel hâlini inceliyoruz.",
        "Modelde Na ile Na⁺ veya Ca ile Ca²⁺ arasında geçiş yap. Nötr atomdaki dış elektronlar verilince katman sayısı azalabilir; çekirdekteki proton sayısı aynı kalır. Bir iyonun dağılımının soy gazınkine benzemesi, o iyonun artık soy gaz elementi olduğu anlamına gelmez.",
      ],
    },
    {
      title:
        "2n² kapasiteyi verir; her katman dolmadan sonrakine geçilmez kuralı değildir",
      paragraphs: [
        "Bir katmanın kuramsal kapasitesi 2n²’dir: K için 2, L için 8, M için 18, N için 32. Bu sayılar orbital enerji sırasının tamamı değildir. Potasyum Z=19 için 2,8,9 yazmak temel hâli doğru vermez; doğru katman dağılımı 2,8,8,1’dir. Kalsiyum Z=20 için 2,8,8,2 olur.",
        "İlk 20 nötr temel hâl atomunda 2,8,8,2 örüntüsü güvenli bir çalışma sınırıdır. Daha ağır atomlara bunu mekanik biçimde uzatma; 4s ve 3d gibi orbital enerjileri ayrı modern atom kapsamında ele alınır. ‘Bir katmana en çok kaç elektron sığar?’ ile ‘bu atomun temel hâlinde bu katmanda kaç elektron vardır?’ farklı sorulardır.",
      ],
      table: {
        headers: ["Katman", "Kapasite", "Bu derste önemli ayrım"],
        rows: [
          ["K, n=1", "2", "He’nin ilk katmanı 2 ile dolar."],
          ["L, n=2", "8", "İlk 20 nötr atomda en çok 8."],
          ["M, n=3", "18", "K ve Ca’da 8 iken N katmanı kullanılır."],
          ["N, n=4", "32", "K’de 1, Ca’da 2 elektron vardır."],
        ],
      },
    },
    {
      title: "Dağılımı yaz, sonra toplamı geri denetle",
      paragraphs: [
        "Nötr Al için 13 elektronu sırayla say: K’ye 2, L’ye 8, M’ye kalan 3; sonuç 2,8,3. Toplam 13 olmalıdır. S için 2,8,6; Ar için 2,8,8; Ca için 2,8,8,2 yazılır. Her satırda toplam denetimi yapmak eksik veya fazla elektron çizimini yakalar.",
        "İyon oluştururken bu örneklerde en dış dolu katmandan elektron verilir veya dış katmana elektron eklenir. Ca²⁺’ta dıştaki iki elektron gider: 2,8,8. O²⁻’ta toplam 10 elektron olur: 2,8. Geçiş metallerinin iyonlarını bu basit yöntemle genelleme; bu dersin sınırlı örneklerini daha geniş orbital kuramının yerine koyma.",
      ],
    },
    {
      title: "Periyot ve grup nötr atomun temel hâlinden okunur",
      paragraphs: [
        "İlk 20 ana grup elementinde nötr temel hâlde dolu katman sayısı periyodu verir. Değerlik elektronu son dolu katmandaki elektron sayısıdır; 1 ve 2 elektron 1. ve 2. gruplarla, 3…8 elektron 13…18. gruplarla ilişkilidir. He iki elektronuna rağmen 18. gruptadır; ilk katmanı tam doludur.",
        "Mg²⁺ iki dolu katmana sahip olsa da Mg elementi 3. periyottadır; periyodu iyonun görünümünden yeniden belirleme. Aynı elektron sayısına sahip türler izoelektronik olabilir fakat proton sayıları farklı olabilir: Ne, Na⁺ ve Mg²⁺ 10’ar elektron taşır. Element kimliğini belirlemek için yük bilgisini de kullan.",
      ],
    },
    {
      title: "Uyarılmış hâl ve kesinlik sözcükleri",
      paragraphs: [
        "Temel hâl en düşük enerjili düzenle ilişkilidir. Enerji alan atomda bir elektron daha yüksek enerji düzeyine geçebilir; elektron sayısı değişmeden uyarılma olabilir. Örneğin nötr atom için 2,8,1 temel hâli ile 2,7,2 gibi uyarılmış bir dağılım aynı toplamı verebilir. Uyarılmış dağılımdan doğrudan periyot/grup çıkarmak güvenli değildir; nötr temel hâli veya Z’yi kullan.",
        "Soruda ‘nötr’, ‘temel hâl’, ‘ilk 20’, ‘kesinlikle’ sözcüklerini işaretle. Bir dağılımın toplamı doğru olsa da temel hâl şartını sağlamayabilir. İşlemi üç denetimle bitir: toplam e doğru mu, yükün yönü doğru mu, sorunun istediği temel hâl/iyon koşulu sağlanıyor mu?",
      ],
    },
  ],
  examples: [
    {
      title: "Yükten dağılıma",
      prompt:
        "Z=16 olan S²⁻ iyonunun elektron sayısını ve katman dağılımını bul.",
      strategy: "Negatif yükü işaretiyle formüle koy; sonra toplamı denetle.",
      steps: [
        {
          label: "Elektron sayısı",
          expression: "e=16−(−2)=18",
          explanation: "İki elektron alınmıştır.",
        },
        {
          label: "Dağılım",
          expression: "2,8,8; toplam 18",
          explanation: "İlk 20 elektron sınırı içindeki basit iyon örneğidir.",
        },
      ],
      answer: "18 elektron; 2,8,8.",
      check: "Proton sayısı hâlâ 16’dır; tür argon elementi olmadı.",
      pitfall: "Negatif yüklü diye elektron sayısından 2 çıkarma.",
    },
    {
      title: "İyondan elemente geri dön",
      prompt:
        "X²⁺ iyonunun katman dağılımı 2,8,8. X nötr atomunun dağılımı ve periyodu nedir?",
      strategy: "İyondaki elektronları say, sonra Z’yi yükle geri kur.",
      steps: [
        {
          label: "Kimlik",
          expression: "e=18; Z=18+2=20",
          explanation: "X kalsiyumdur.",
        },
        {
          label: "Nötr temel hâl",
          expression: "Ca:2,8,8,2",
          explanation: "Dört dolu katman nedeniyle 4. periyottadır.",
        },
      ],
      answer: "2,8,8,2; 4. periyot.",
      check: "Nötr Ca iki elektron verince sorudaki 18 elektrona iner.",
      pitfall: "İyonun üç katmanından 3. periyot sonucu çıkarma.",
    },
    {
      title: "Kapasite dolma sırası değildir",
      prompt:
        "Z=19 olan nötr temel hâl atomuna 2,8,9 dağılımı öneriliyor. Toplamın 19 olması bunu doğrular mı?",
      strategy: "Toplam kontrolünü temel hâl kontrolünden ayır.",
      steps: [
        {
          label: "Toplam",
          expression: "2+8+9=19",
          explanation: "Elektron adedi doğrudur ama bu yeterli değildir.",
        },
        {
          label: "Temel hâl",
          expression: "K:2,8,8,1",
          explanation:
            "İlk 20 atomda potasyumun 19. elektronu dördüncü katmandadır.",
        },
      ],
      answer: "Hayır; temel hâl 2,8,8,1’dir.",
      check:
        "M katmanının kapasitesi 18 olsa da burada tamamen dolması beklenmez.",
      pitfall:
        "Yalnız toplamı veya 2n² kapasitesini denetleyip temel hâli atlama.",
    },
  ],
  recall: [
    {
      prompt: "Katman toplamı her zaman Z’yi verir mi?",
      answer: "Yalnız nötr atomda. İyonda toplam e’dir ve Z=e+q kullanılır.",
    },
    {
      prompt: "He’nin iki elektronu onu 2. gruba yerleştirir mi?",
      answer:
        "Hayır. He 1. periyot 18. gruptadır; dolu ilk katman istisnasını koru.",
    },
    {
      prompt: "İzoelektronik olmak aynı element olmak mıdır?",
      answer: "Hayır. Elektron sayıları aynı, proton sayıları farklı olabilir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri PDF s.30–31; Aurelia Katman elektron dizilimi PDF s.1–5. İlk 20 nötr temel hâl ve seçilmiş basit iyon kapsamındaki özgün açıklama, model ve örnekler; resmî soru değildir.",
};
