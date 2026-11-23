import type { LessonGuide } from "./types";
import { newtonDisplacementTitle, newtonTimeExampleTitle, newtonTimeRows, newtonTimeTitle, newtonVelocityTitle } from "../newtonTimeComparison";
import { forcePairsTitle } from "../newtonForcePairs";
import { frictionThresholdExample, frictionThresholdSection } from "../newtonFrictionThreshold";
export const newtonGuide: LessonGuide = {
  id: "newton",
  minutes: 45,
  objectives: [
    "Hedef cismi ve ona etki eden gerçek kuvvetleri belirle.",
    "Hız, ivme ve net kuvvetin yönlerini karıştırmadan Newton yasalarını uygula.",
    "Normal, sürtünme ve etki–tepkiyi koşullarıyla açıkla; sonucu birim ve işaretle denetle.",
  ],
  sections: [
    {
      title: "Hareketi tarif etmek ile nedenini açıklamak",
      paragraphs: [
        "Konum cismin nerede olduğunu, hız konumun hangi yönde ve ne kadar çabuk değiştiğini, ivme ise hız vektörünün değişimini anlatır. Aynı doğrultuda a=(vson−vilk)/Δt bağıntısında yön için bir artı eksen seçilir. Sağa giden bir cisim yavaşlıyorsa ivmesi sola olabilir. Net kuvvet hızın yönünden değil, ivmenin yönünden anlaşılır.",
        "Kuvvet başka bir cisimle etkileşimdir; kilogramla ölçülen kütleyle aynı nicelik değildir. Kuvvetin SI birimi newtondur: 1 N=1 kg·m/s². Hareketi anlatan hız ve ivmeyi kuvvet diyagramına yeni etkileşim oku olarak ekleme. Fnet, çizdiğin gerçek kuvvetlerin toplamıdır; bunlara ayrıca ikinci kez eklenen bir kuvvet değildir.",
      ],
    },
    {
      title: "Önce tek hedef, sonra serbest cisim diyagramı",
      paragraphs: [
        "Sorunun hangi cisim için denklem istediğini seç. Dünya hedefe ağırlık, temas yüzeyi normal ve gerekiyorsa sürtünme, gergin ip gerilme uygular. Her oku ‘kaynak → hedef’ diye adlandır. Yalnız seçtiğin hedefe etki eden kuvvetleri o diyagramda kullan; hedefin başka cisimlere uyguladıkları kuvvetler başka diyagrama aittir.",
        "Normal kuvvet yüzeye dik, basit ip gerilmesi ip doğrultusunda çekicidir. Gevşek ip çekmez; temas kopmuş yüzey normal uygulamaz. Yüzeyden iki kuvvet gelebilir: normal ve sürtünme. Etkileşim kaynağı sayısını kuvvet oku sayısına eşitleme. Yatay ve düşey denklemleri ayrı kurmak, hangi kuvvetin hangi bileşene girdiğini görünür yapar.",
      ],
    },
    {
      title: "Birinci yasa: net sıfır olması durmak demek değildir",
      paragraphs: [
        "Eylemsiz gözlem çerçevesinde net kuvvet sıfırsa ivme sıfırdır; hız vektörü sabit kalır. Cisim başlangıçta duruyorsa durmayı, hareketliyse sabit hızlı doğrusal hareketini sürdürür. Eylemsizlik yeni bir itici kuvvet değil, cismin hareket durumunun değişmesine karşı gösterdiği özelliktir; kütleyle ilişkilidir.",
        "Sabit sürat tek başına sabit hız demek değildir: virajda yön değiştiğinden hız vektörü değişebilir. Anlık hızın sıfır olması da ivmenin sıfır olmasını gerektirmez; yukarı atılan cismin en üst noktası buna örnektir. İvmeli araçtan gözlem yapılıyorsa çerçeve seçimine dikkat edilir; burada yasaları eylemsiz çerçevede, klasik mekanik kapsamında kullanıyoruz.",
      ],
    },
    {
      title: "İkinci yasa: önce yönlü toplamı bul",
      paragraphs: [
        "Sabit ve pozitif kütle için ΣF=ma kullanılır. Tek doğrultuda sağ artı seçildiyse sağa kuvvetler artı, sola kuvvetler eksi yazılır. Net kuvvet aynı yönde artarsa sabit kütlede ivme artar; aynı net kuvvette kütle büyürse ivme küçülür. Bir kuvvetin tek başına büyüklüğünü, başka kuvvetler de varken net kuvvet sanma.",
        "Örneğin 3 kg cisme sağa 15 N, sola 6 N etkirse ΣFx=15−6=9 N ve a=9/3=3 m/s² sağadır. Sol artı seçilse a=−3 m/s² çıkar; fiziksel yön değişmez. Etkileşimli modelde karşıt kuvvetleri ve kütleyi ayrı değiştir. Sonucu önce net kuvvetle, sonra kütleyle ilişkilendir; çizimin duruyor görünmesinden ‘ivme yok’ sonucu çıkarma.",
      ],
    },
    {
      title: "Üçüncü yasa: çiftin hedefleri farklıdır",
      paragraphs: [
        "A’nın B’ye uyguladığı kuvvet ile B’nin A’ya uyguladığı kuvvet aynı etkileşimin eşit büyüklükte, zıt yönlü iki tarafıdır. Biri diğerinden sonra oluşmaz. Kuvvetler farklı cisimlerde bulunduğu için tek cismin serbest cisim diyagramında birbirini götürmez. Kütleleri farklı iki cismin bu eşit kuvvetler altındaki ivmeleri farklı olabilir.",
        "Masadaki kitaba hem Dünya’nın çekimi hem masanın normali etki eder; bu ikisi aynı hedefte olduğundan etki–tepki çifti değildir. Ağırlığın diğer tarafı kitabın Dünya’ya çekimi, normalin diğer tarafı kitabın masaya temas kuvvetidir. ‘Eşit ve zıt’ olmayı görür görmez üçüncü yasa deme; kaynak ve hedeflerin yer değiştirip değiştirmediğini kontrol et.",
      ],
    },
    {
      title: "Ağırlık ve normal: eşitlik koşula bağlıdır",
      paragraphs: [
        "Ağırlık G=mg ile bulunur ve kütleden farklıdır. Kütlenin birimi kg, ağırlığın birimi N’dir. Aynı cisim farklı g değerlerinde farklı ağırlık taşıyabilir; kütlesi bu yüzden değişmez. Yatay zeminde başka düşey etki ve düşey ivme yoksa normal ağırlığa eşit çıkar; bu sonuç bir ezber başlangıcı değil, düşey net kuvvet denkleminin sonucudur.",
        "Düşey eksende yukarı artı seçildiğinde asansördeki kişi için N−mg=ma yazılır. İvme aşağıysa a negatiftir; kişi hâlâ yukarı hareket ediyor olsa da normal mg’den küçük çıkabilir. Yukarı ek çekme kuvveti olan yatay kutuda N+Fçekme−mg=0 kullanılır. Hesap negatif normal veriyorsa yüzeyin cismi çektiğini kabul etme; temas varsayımını yeniden değerlendir.",
      ],
    },
    {
      title: "Sürtünmede önce kayma durumunu seç",
      paragraphs: [
        "Kayma yokken statik sürtünme gereken değeri, üst sınırına kadar sağlayabilir: 0≤|fs|≤μsN. Bu yüzden fs=μsN her durumda doğru değildir; eşitlik sınır durumunu gösterir. Denge için gereken sürtünmeyi önce bul, sonra üst sınırla karşılaştır. Tam üst sınırda ideal modelde statik denge hâlâ mümkündür; ‘kesin kayar’ denmez.",
        "Göreli kayma varsa basit kuru sürtünme modelinde |fk|=μkN kullanılır. Yön, temas yüzeylerinin birbirine göre kaymasına karşıdır; cismin yere göre hızına her durumda zıt olmak zorunda değildir. Başlangıçta duran kutu ile zaten kaymakta olan kutu aynı itme altında farklı davranabilir. Katsayılar boyutsuzdur; normal değişirse sürtünme sınırı da değişir.",
      ],
      table: {
        headers: ["Önce kontrol et", "Geçerli ilişki", "Yaygın hata"],
        rows: [
          ["Hedefin ivmesi sıfır mı?", "ΣF=0", "v=0 gördüğünde a=0 sanmak"],
          [
            "Yüzeyler göreli kayıyor mu?",
            "Kaymada fk=μkN",
            "Her durumda statik üst sınırı kullanmak",
          ],
          [
            "Normal hangi denklemden çıkıyor?",
            "Düşey net kuvvet denklemi",
            "Her soruda N=mg yazmak",
          ],
          [
            "Kuvvetlerin hedefleri aynı mı?",
            "Aynı hedefte vektörel toplam",
            "Etki–tepkiyi tek cisimde toplamak",
          ],
        ],
      },
    },
    {
      title: "Sistem ve grafik: son denetimi atlama",
      paragraphs: [
        "Temas hâlindeki iki cismin ortak ivmesi aranıyorsa sistemi birlikte seçmek iç etkileşimleri denklemden çıkarabilir. Ancak temas kuvveti isteniyorsa tek cisme geri dönmek gerekir. Toplam kütleyle a bulunması her iç kuvveti otomatik vermez; seçtiğin alt cismin hangi dış kuvvetleri taşıdığını yeniden çiz.",
        "Düşey ekseni Fnet, yatay ekseni a olan sabit kütle grafiğinde eğim m’dir; eksenler tersse eğim 1/m olur. Uygulanan kuvvetle net kuvvet aynı değilse grafiği ayrıca yorumla. Her çözümde N/kg=m/s² birimini, seçtiğin eksene göre işareti, temas ve sürtünme koşulunu kontrol et. Hızı sorulmadıkça başlangıç hızını bulmaya çalışmak gerekli değildir.",
      ],
    },
    {
      title: "Kuvvet–ivme grafiğinden kütleyi oku",
      paragraphs: [
        "Düşeyde net kuvveti (N), yatayda ivmeyi (m/s²) bul. Sabit kütlede net kuvvet ivmeyle doğru orantılıdır. Tabloda kuvvet 8 N, ivme 2 m/s² artar. Düşey farkı yatay farka bölünce kütle 8 / 2 = 4 kg çıkar.",
        "Sonucu ikinci satırla kontrol et: 4 kg × 4 m/s² = 16 N. Çizginin kâğıttaki açısı ölçekle değişebilir. Eksenleri yer değiştirirsen eğimin birimi kg yerine 1/kg olur ve eğim kütlenin tersini verir.",
      ],
      table: {
        headers: ["İvme (m/s²)", "Net kuvvet (N)"],
        rows: [["2", "8"], ["4", "16"]],
      },
    },
    {
      title: newtonTimeTitle,
      figureTitle: newtonTimeTitle,
      paragraphs: [
        "Biri 4 N, diğeri 8 N sabit net kuvvetle başlayan iki deneme düşün. Cisim her seferinde durgun, kütlesi 2 kg ve kuvvetin yönü aynı. Üç saniye boyunca kuvvetin değeri değişmediği için kuvvet–zaman çizgileri yataydır. a = Fnet / m ile ivmeler 2 ve 4 m/s² bulunur. İvme–zaman çizgileri de yataydır ve düşey eksenlerinin birimi m/s²’dir.",
        "Hız her saniyede ivme kadar artar. Bu yüzden hız–zaman doğruları sıfırdan yükselir ve eğimleri 2 ile 4 m/s²’dir. Hız grafiğinin altında kalan alan yer değiştirmedir. Başlangıç hızı sıfır olduğundan üçgenin alanı süre × son hız / 2 ile bulunur. Aynı kütle ve süreyle kuvvet iki katına çıkınca ivme, son hız ve yer değiştirme iki katına çıkar.",
      ],
      table: {
        headers: ["Net kuvvet (N)", "İvme (m/s²)", "3. saniyede hız (m/s)", "3 saniyede yer değiştirme (m)"],
        rows: newtonTimeRows,
      },
    },
    {
      title: forcePairsTitle,
      figureTitle: forcePairsTitle,
      paragraphs: [
        "Yatay masadaki 2 kg kutu, düşey bir iple 6 N yukarı çekiliyor. Kutu masayla temasını koruyor ve düşeyde ivmelenmiyor. g = 10 N/kg alırsak ağırlığı 20 N’dur. Kutunun düşey denklemi N + 6 − 20 = 0 olduğundan masanın kutuya uyguladığı normal 14 N’dur.",
        "Kutunun masaya uyguladığı kuvvet 14 N aşağı, masanın kutuya uyguladığı kuvvet 14 N yukarıdır. İkisi aynı temasın iki tarafıdır. Dünya’nın kutuya uyguladığı 20 N aşağı çekimin çifti kutunun Dünya’ya uyguladığı 20 N yukarı çekimdir. Kütle çekimi için temas gerekmez.",
        "Kutudaki normal ve ağırlığın ikisi de kutuya etki eder. Bu örnekte büyüklükleri de farklıdır. İp gevşek olduğunda normal 20 N olur, ama kuvvetlerin kaynakları ve hedefleri değişmediği için normal ile ağırlık yine bir etki–tepki çifti oluşturmaz.",
      ],
      table: {
        headers: ["Kuvveti uygulayan", "Kuvveti alan", "Yön ve büyüklük"],
        rows: [["Masa", "Kutu", "Yukarı 14 N"], ["Kutu", "Masa", "Aşağı 14 N"], ["Dünya", "Kutu", "Aşağı 20 N"], ["Kutu", "Dünya", "Yukarı 20 N"]],
      },
    },
    frictionThresholdSection,
  ],
  examples: [
    {
      title: "Karşıt kuvvetlerden yönlü ivmeye",
      prompt:
        "Sürtünmesiz yatay zemindeki 3 kg bloğa sağa 15 N ve sola 6 N etki ediyor. İvmenin büyüklüğü ve yönü nedir?",
      strategy:
        "Tek hedef ve artı yön seç; kuvvetleri topladıktan sonra kütleye böl.",
      steps: [
        {
          label: "Eksen ve bileşke",
          expression: "ΣFx=15−6=9 N",
          explanation: "Sağ artı seçildi; iki kuvvet aynı bloğa etki eder.",
        },
        {
          label: "İkinci yasa",
          expression: "9=3a → a=3 m/s²",
          explanation: "Pozitif sonuç sağ yönünü gösterir.",
        },
      ],
      answer: "3 m/s² sağa.",
      check:
        "3 kg × 3 m/s² =9 N; sola artı seçilse sonuç −3, fiziksel yön yine sağ olur.",
      pitfall: "15 N’yi doğrudan ma saymak karşıt kuvveti yok sayar.",
    },
    {
      title: "Statik üst sınırı gerçek değerle karşılaştır",
      prompt:
        "Başlangıçta duran 4 kg kutu yatay zeminde. g=10 m/s², μs=0,5 ve μk=0,3. Önce sağa 12 N, ayrı bir denemede sağa 26 N itiliyor. Her denemedeki ivme nedir?",
      strategy:
        "İlk olarak normal ve statik sınırı bul; her itmede hangi sürtünme modelinin geçerli olduğuna karar ver.",
      steps: [
        {
          label: "Düşey denge ve sınır",
          expression: "N=40 N; fs,max=0,5×40=20 N",
          explanation: "Başka düşey etki ve düşey ivme yok.",
        },
        {
          label: "12 N itme",
          expression: "fs=12 N; a=0",
          explanation:
            "Gereken 12 N, 20 N sınırını aşmaz; otomatik 20 N sürtünme yazılmaz.",
        },
        {
          label: "26 N itme",
          expression: "fk=12 N; a=(26−12)/4=3,5 m/s²",
          explanation:
            "Statik denge mümkün değildir; sağa kayma başlayınca kinetik model kullanılır.",
        },
      ],
      answer: "İlkinde 0; ikincisinde 3,5 m/s² sağa.",
      check:
        "İkinci durumda 4×3,5+12=26 N. Kutu baştan kayıyor olsaydı ilk denemenin yorumu değişirdi.",
      pitfall:
        "Kayma durumu verilmeden aynı sürtünme formülünü iki duruma zorla uygulama.",
    },
    {
      title: "Yukarı hareket ederken aşağı ivme",
      prompt:
        "50 kg kişi yukarı giden bir asansörde, aşağı 2 m/s² ivmeyle hareket ediyor. g=10 m/s². Tartının kişiye uyguladığı normal kuvvet kaç newtondur?",
      strategy:
        "Hızın yönü yerine verilen ivmeyi kullan; hedef kişi için düşey denklem kur.",
      steps: [
        {
          label: "Gerçek kuvvetler",
          expression: "G=50×10=500 N",
          explanation: "Dünya aşağı çekiyor, tartı yukarı normal uyguluyor.",
        },
        {
          label: "Yukarı artı",
          expression: "N−500=50×(−2)",
          explanation:
            "İvme aşağı olduğu için negatiftir; yukarı hareket etmek bu işareti değiştirmez.",
        },
        {
          label: "Bilinmeyeni yalnız bırak",
          expression: "N=400 N",
          explanation:
            "Normal ağırlıktan küçüktür; kişi yukarı giderken yavaşlamaktadır.",
        },
      ],
      answer: "400 N.",
      check: "Net 400−500=−100 N; −100/50=−2 m/s².",
      pitfall: "Asansörün yukarı gittiğini görüp ivmeyi de yukarı almak.",
    },
    {
      title: "Ortak ivmeden tek cismin temas kuvvetine",
      prompt:
        "Sürtünmesiz yatay zeminde A=2 kg ve B=3 kg temas hâlinde; A solda. A’ya sağa 15 N uygulanıyor. Ortak ivme ve A’nın B’ye temas kuvveti nedir?",
      strategy: "Önce A+B sistemini, sonra yalnız B’yi seç.",
      steps: [
        {
          label: "Sistem",
          expression: "a=15/(2+3)=3 m/s²",
          explanation:
            "Temas kuvvetleri sistemin iç etkileşimidir; yatay dış kuvvet 15 N’dir.",
        },
        {
          label: "Yalnız B",
          expression: "C=3×3=9 N",
          explanation:
            "B’nin yatayda tek kuvveti A’nın sağa doğru temas kuvvetidir.",
        },
        {
          label: "A ile geri kontrol",
          expression: "15−9=2×3",
          explanation:
            "B’nin A’ya kuvveti 9 N sola; üçüncü yasa çiftinin hedefleri farklıdır.",
        },
      ],
      answer: "Ortak ivme 3 m/s² sağa; A’nın B’ye kuvveti 9 N sağa.",
      check: "İki ayrı denklemin toplamı 15=(2+3)×3 verir.",
      pitfall:
        "15 N dış kuvveti B’ye etki ediyor sanmak veya sistemi seçince iç kuvveti de bulduğunu düşünmek.",
    },
    {
      title: newtonTimeExampleTitle,
      prompt: "Başlangıçta duran 2 kg cisme, iki ayrı denemede, 3 s boyunca aynı yönde sırasıyla 4 N ve 8 N net kuvvet uygulanıyor. Her denemenin son hızını ve yer değiştirmesini karşılaştır.",
      strategy: "Önce kuvvetten ivmeye geç. Hızın her saniye ne kadar değiştiğini bul, sonra hız grafiğinin alanını hesapla.",
      steps: [
        { label: "Net kuvvetten ivmeye", expression: "a₁ = 4/2 = 2 m/s² · a₂ = 8/2 = 4 m/s²", explanation: "Kütle ve kuvvet sabit olduğu için her denemenin ivmesi sabittir." },
        { label: "Hızın eğimini oku", expression: "v₁ = 2×3 = 6 m/s · v₂ = 4×3 = 12 m/s", explanation: "İki doğru da durgun başlangıçtan yükselir. İmleci 3. saniyeye getir ve hızları karşılaştır.", figureTitle: newtonVelocityTitle },
        { label: "Altındaki alanı hesapla", expression: "Δx₁ = 3×6/2 = 9 m · Δx₂ = 3×12/2 = 18 m", explanation: "İki üçgenin tabanı eşit, ikincisinin yüksekliği iki katıdır. Hız pozitif olduğundan yer değiştirme kuvvet yönündedir.", figureTitle: newtonDisplacementTitle },
      ],
      answer: "Son hızlar 6 ve 12 m/s, yer değiştirmeler 9 ve 18 m.",
      check: "Son hızı süreye böl, çıkan ivmeyi kütleyle çarp. Başlangıçtaki 4 N ve 8 N değerlerine geri dönersin.",
      pitfall: "Son hız × süre, hızın tüm süre boyunca son değerinde kaldığını varsayar. Burada hız sıfırdan arttığı için grafik alanı üçgendir.",
    },
    frictionThresholdExample,
  ],
  recall: [
    {
      prompt:
        "Sabit hızlı doğrusal hareket eden bir cisimde net kuvvet neden sıfırdır?",
      answer:
        "Hız vektörü değişmediği için ivme sıfırdır; eylemsiz çerçevede ΣF=ma=0.",
    },
    {
      prompt: "Ağırlıkla normal neden otomatik etki–tepki çifti değildir?",
      answer:
        "İkisi aynı hedef cisme etki eder; üçüncü yasa çiftinde kaynak ve hedef yer değiştirir.",
    },
    {
      prompt: "Bir kutuda statik sürtünmeyi nasıl seçersin?",
      answer:
        "Önce denge için gereken değeri bulup μsN üst sınırıyla karşılaştırırım; kayma bilgisi modeli değiştirir.",
    },
  ],
  source:
    "MEBİ AYT Fizik Konu Özetleri PDF s.23–24 ve 31 (basılı 21–22 ve 29) ile Aurelia TYT Fizik Newton Hareket Yasaları kopya kağıdı PDF s.1–16 doğrudan okundu. Kuvvet–ivme grafiği ve sabit kuvvetin iki katına çıktığı üç zaman grafiği için MEBİ TYT Fizik Konu Özetleri PDF s.42 (basılı 40), masa ve Dünya ile kuvvet çiftleri için s.44 (basılı 42) ve sürtünme eşiği için s.45–46 (basılı 43–44) incelendi. Kütle çekimi temas gerektirmez. Sayısal örnekler özgündür. Aurelia dosyasındaki diğer MEB Fizik 9/11 atıfları ve ÖSYM örneği ayrıca doğrulanmadı. Anlatım klasik sabit kütle ve belirtilen basit temas/sürtünme koşullarıyla sınırlıdır.",
};

export const electricFieldGuide: LessonGuide = {
  id: "elektrik-alan",
  minutes: 45,
  objectives: [
    "Kaynak yükün oluşturduğu alanı, test yüküne etkiyen kuvvetten ayır.",
    "Noktasal yük alanını SI birimleri, uzaklığın karesi ve vektörel toplama ile hesapla.",
    "Düzgün alanda elektriksel kuvveti ve diğer kuvvetlerle bileşkesini koşullarıyla yorumla.",
  ],
  sections: [
    {
      title: "Alan bir noktaya, kuvvet bir taneciğe aittir",
      paragraphs: [
        "Elektrik alanı, belirli noktadaki elektriksel etkiyi test yükünden bağımsız olarak tanımlar. Çok küçük pozitif q0 deneme yüküne etki eden elektriksel kuvvet kullanılarak E=Felektrik/q0 düşünülür. Felektrik yalnız elektriksel etkileşimi gösterir; ağırlık gibi diğer kuvvetler net kuvvet hesabında ayrıca toplanır. Alanın SI birimi N/C’dir; V/m de eşdeğer birimdir. Noktayı incelerken önce alanı oluşturan kaynak yükleri ve gözlem noktasını seç.",
        "Test yükü, alanı araştırırken kaynak düzenini anlamlı biçimde bozmayacak kadar küçük kabul edilir. Kaynak düzeni sabitken test yükünün işaretini değiştirmek alanı ters çevirmez; o taneciğe etkiyen kuvveti ters çevirir. Burada elektrostatik, sabit kaynak ve boşluk modeli kullanılır; kaynakların hareketi veya test yükünün geri etkisi bu basit modelin kapsamı değildir.",
      ],
    },
    {
      title: "Noktasal kaynakta büyüklük ve yönü ayrı bul",
      paragraphs: [
        "Tek noktasal Q kaynağından r>0 uzaklıktaki alan büyüklüğü |E|=k|Q|/r²’dir. Boşlukta k≈9×10⁹ N·m²/C² alınır. Hesaba yükü coulomb, uzaklığı metre olarak koy: 1 μC=10⁻⁶ C, 1 cm=10⁻² m. Formülde r’nin karesi bulunduğu için santimetreyi yalnız bir kez çevirmek yeterli değildir.",
        "Alan yönü pozitif kaynaktan dışarı, negatif kaynağa doğrudur. Pozitif kaynağın sağındaki noktada alan sağa, solundaki noktada sola olur; ‘pozitif yükün alanı daima sağa’ diye ezberlenmez. Formüldeki mutlak değer büyüklüğü verir; işareti ve geometrik yönü daha sonra vektöre yerleştir. r=0’da bu noktasal kaynak modeli sonlu bir alan değeri vermez.",
      ],
    },
    {
      title: "Uzaklığın karesi: oran kur, sınırını söyle",
      paragraphs: [
        "Q sabitken r iki katına çıkarsa alan dörtte bire, üç katına çıkarsa dokuzda bire iner. r sabitken |Q| iki katına çıkarsa alan iki kat olur. Birden fazla değişken aynı anda değiştiğinde oran E2/E1=(|Q2|/|Q1|)×(r1/r2)² ile izlenebilir; kaynağın işareti değişmişse yön ayrıca yeniden değerlendirilir.",
        "Etkileşimli model, kaynağın sağındaki noktayı gösterir. Önce yalnız r’yi değiştirip alanı karşılaştır; sonra test yükü q’yu değiştirip alanla kuvvetin hangisinin değiştiğini incele. Okların uzunluğu burada ortak bir büyüklük ölçeği değildir; sayısal sonuç satırını kullan. Tek kaynakta gözlenen ters kare ilişkisini bütün çok-kaynak düzenlerinin tek bir toplam uzaklığına uygulama.",
      ],
    },
    {
      title: "Birden çok kaynak: alanları vektörel topla",
      paragraphs: [
        "Bir noktada her kaynak için alanı, diğerleri yokmuş gibi hesaplayıp yönlü olarak toplarsın: Enet=E1+E2+…. Aynı doğrultuda aynı yönlü alanlar toplanır, zıt yönlü alanların büyüklükleri çıkarılır. Bir kaynak pozitif öteki negatif diye alanları otomatik çıkarma; incelenen noktanın konumu, iki okun hangi yönde olduğunu belirler.",
        "İki eşit pozitif yükün tam orta noktasında alanlar eşit ve zıt olduğundan net alan sıfırdır. Eşit büyüklükte zıt işaretli iki yükün arasındaki orta noktada ise alanlar aynı yönlüdür. Birbirine dik E1 ve E2 için net büyüklük √(E1²+E2²) ile bulunabilir; yalnız diklik koşulunda bu kısa yolu kullan. Bu dersteki tek-kaynak etkileşimi çoklu yükleri çizmez; aşağıdaki açıklamalı örnek ayrı bir düzeni tanımlar.",
      ],
    },
    {
      title: "Alan çizgileri bir haritadır; taneciğin yolu değildir",
      paragraphs: [
        "Alan çizgisinin bir noktadaki teğeti, o noktadaki alan vektörünün yönünü verir. Çizgiler pozitif yükten dışarı, negatif yüke doğru çizilir; birbirlerini kesmezler. Kesilseler aynı noktada tek alan vektörü için iki farklı yön verilmiş olurdu. Daha sık çizgiler, aynı çizim kuralı içinde daha güçlü alanı temsil eder.",
        "Elektrostatik dengedeki iletkenin yüzeyindeki alanın yönü yüzeye diktir; bu ifade her rastgele geometrik yüzeye genellenmez. Alan çizgileri gerçek ipler veya yüklü taneciğin zorunlu hareket yolu değildir. Negatif taneciğe kuvvet çizgi yönünün tersinedir; ayrıca başlangıç hızı varsa hareketi kuvvet yönüyle aynı doğru üzerinde olmak zorunda değildir.",
      ],
    },
    {
      title: "Kuvvetin büyüklüğü, yönü ve ivme",
      paragraphs: [
        "Elektriksel kuvvet vektörel olarak Felektrik=qE’dir. q>0 ise kuvvet alanla aynı, q<0 ise ters yönlüdür; büyüklükte |F|=|q||E| kullanılır. q=0 elektriksel kuvveti sıfır yapar, kaynağın o noktadaki alanını değil. Alan sabitken test yükünün büyüklüğü iki kat olursa elektriksel kuvvet de iki kat olur.",
        "Yalnız elektriksel kuvvet varsa sabit kütleli taneciğin ivmesi a=qE/m olur. Ağırlık veya başka kuvvetler ihmal edilmiyorsa önce bütün gerçek kuvvetlerin bileşkesini bul. İvmenin yönü net kuvvetle ilişkilidir; taneciğin o andaki hızını yalnız kuvvet okundan belirleyemezsin. Özellikle negatif yük ve aşağı yönlü ağırlık aynı soruda verildiğinde her okun yönünü ayrı çiz.",
      ],
    },
    {
      title: "Düzgün alanı noktasal kaynakla karıştırma",
      paragraphs: [
        "Uygun paralel levha modelinde, kenar etkileri ihmal edilen bölgede alan yaklaşık düzgün kabul edilir ve büyüklük E=V/d bağıntısıyla bulunabilir. V levhalar arası potansiyel farkı, d levhalar arası uzaklıktır; bu bağıntı rastgele tek noktasal kaynağa doğrudan uygulanmaz. Alanın yönü pozitif levhadan negatif levhaya doğrudur.",
        "Düşey düzgün alanda elektriksel kuvvetle ağırlık aynı yöndeyse büyüklükler toplanır; zıt yöndeyse karşılaştırılır. Eşit ve zıt olduklarında net kuvvet ve ivme sıfırdır, fakat tanecik başlangıçta hareketliyse sabit hızla hareket edebilir. Alanla dik doğrultuda başlangıç hızı verilen taneciğin yolu, yatay/düşey hareket bileşenlerinin birlikte değerlendirilmesini gerektirir; çizginin üstünde gitmesi gerektiğini varsayma.",
      ],
    },
    {
      title: "Çözümü geri denetle ve koşul değişimini düşün",
      paragraphs: [
        "Önce kaynaklar ve nokta, sonra alan büyüklükleri ve yönleri, sonra gerekiyorsa test yüküne kuvvet sırasını izle. SI birimini, r²’yi ve negatif q’nun yön değişimini ayrı kontrol et. Sonucun N/C mi N mi istendiğini oku; bir alan sorusuna kuvvet, bir kuvvet sorusuna alan değeri yazma.",
        "Q değişmeden yalnız q değişirse E sabit; q sabitken r iki katına çıkarsa tek kaynakta hem E hem elektriksel kuvvet dörtte bir olur. Net alanın sıfır olduğu noktada verilen test yüküne elektriksel kuvvet de sıfırdır; başka kuvvetler ayrıca bulunabilir. Tek örnekteki dengeyi ‘bütün tanecikler durur’ kuralına dönüştürme. Her sonucu, kullandığın kaynak ve ihmal koşullarına geri bağla.",
      ],
    },
  ],
  examples: [
    {
      title: "Mikrocoulombdan SI’ye, alandan kuvvete",
      prompt:
        "Boşlukta sabit +2 μC kaynağın sağında 3 m uzakta bir nokta var. k=9×10⁹ N·m²/C². Bu noktadaki alan ve oradaki −4 μC test yüküne elektriksel kuvvet nedir? Kaynağın geri etkisi ihmal ediliyor.",
      strategy: "Önce kaynağın alanını, sonra test yükünün kuvvetini bul.",
      steps: [
        {
          label: "Alan büyüklüğü",
          expression: "E=(9×10⁹)(2×10⁻⁶)/3²=2000 N/C",
          explanation:
            "Yük coulomba çevrildi, uzaklık metre olarak karesiyle kullanıldı.",
        },
        {
          label: "Alan yönü",
          explanation: "Pozitif kaynağın sağındaki noktada alan sağadır.",
        },
        {
          label: "Test yüküne kuvvet",
          expression: "|F|=(4×10⁻⁶)×2000=0,008 N",
          explanation: "Negatif test yükü nedeniyle kuvvet sola yönelir.",
        },
      ],
      answer: "E=2000 N/C sağa; elektriksel kuvvet 0,008 N sola.",
      check:
        "F/q yönlü bölümü tekrar alanı verir; q’nun işareti kaynak alanını değiştirmez.",
      pitfall:
        "−4 μC’yi alanı oluşturan kaynak yerine koymak veya μ önekini unutmak.",
    },
    {
      title: "İki değişkeni tek oranla izle",
      prompt:
        "Tek noktasal kaynağın yük büyüklüğü iki katına, gözlem uzaklığı üç katına çıkarılıyor. Kaynağın işareti ve geometrik taraf aynı. Alan büyüklüğü ilk değerin kaç katı olur?",
      strategy: "Yük ile uzaklığın etkilerini ayrı çarpanlar olarak yaz.",
      steps: [
        {
          label: "Bağımlılık",
          expression: "E∝|Q|/r²",
          explanation: "Yük doğrusal, uzaklık ters kare etkisi yapar.",
        },
        {
          label: "Oran",
          expression: "Eson/Eilk=2/3²=2/9",
          explanation:
            "Üç kat uzaklığın etkisi dokuz kat azalmadır; yükteki iki kat artışla birleşir.",
        },
      ],
      answer: "İlk alanın 2/9’u.",
      check:
        "Yalnız uzaklık değişse 1/9 olurdu; yükü iki kat yapmak bunu 2/9’a çıkarır.",
      pitfall: "Uzaklık çarpanını 3 alıp 2/3 yazmak.",
    },
    {
      title: "Yükün işareti yerine alan oklarını topla",
      prompt:
        "Bir doğrunun A noktasında +Q, B noktasında −Q var; A solda, B sağda. Orta M noktası iki yüke d uzaklıkta. Her kaynağın M’deki alan büyüklüğü E0. Net alan hangi yönde, kaç E0’dır?",
      strategy: "M için her kaynağın alan okunu ayrı çiz.",
      steps: [
        {
          label: "Pozitif kaynak",
          explanation: "A’dan dışarı yön: M’de sağa E0.",
        },
        {
          label: "Negatif kaynak",
          explanation: "B’ye doğru yön: M’de yine sağa E0.",
        },
        {
          label: "Vektörel toplam",
          expression: "Enet=E0+E0=2E0",
          explanation: "Zıt işaretler burada zıt alan yönü üretmedi.",
        },
      ],
      answer: "Sağa 2E0.",
      check:
        "İki yük de pozitif olsaydı orta noktadaki eşit-zıt alanlar birbirini götürürdü.",
      pitfall: "Kaynakların işaretleri zıt diye alanları otomatik çıkarmak.",
    },
    {
      title: "Elektriksel denge sabit hızla da mümkündür",
      prompt:
        "Kenarlardan uzak paralel levhalar arasında 300 V potansiyel farkı ve 0,03 m uzaklık var. Alan yukarı yönlü. +2 μC yüklü, 0,002 kg tanecik alanda; g=10 m/s², başka kuvvet yok. Net kuvvet ve ivme nedir?",
      strategy:
        "Düzgün alanı hesapla, elektriksel kuvvet ile ağırlığın yönlerini karşılaştır.",
      steps: [
        {
          label: "Alan",
          expression: "E=300/0,03=10000 N/C",
          explanation:
            "Levhalar için düzgün alan ve ihmal edilen kenar etkisi koşulu verildi.",
        },
        {
          label: "Kuvvetler",
          expression: "Felektrik=2×10⁻⁶×10000=0,02 N; mg=0,02 N",
          explanation: "Elektriksel kuvvet yukarı, ağırlık aşağı yönlü.",
        },
        {
          label: "Bileşke",
          expression: "Fnet=0; a=0",
          explanation:
            "Eşit-zıt kuvvetler aynı taneciğe etki eder; bu bir denge durumudur.",
        },
      ],
      answer: "Net kuvvet 0 N, ivme 0 m/s².",
      check:
        "Tanecik durgun bırakıldıysa durur; başlangıç hızı verilmiş olsaydı aynı bölgede sabit hız da mümkün olurdu.",
      pitfall:
        "İvme sıfırdan her durumda hızın da sıfır olduğu sonucunu çıkarmak.",
    },
  ],
  recall: [
    {
      prompt: "Negatif test yükü seçmek kaynak alanını ters çevirir mi?",
      answer:
        "Hayır. Sabit kaynak düzeninde E değişmez; F=qE nedeniyle test yüküne kuvvet ters yönlü olur.",
    },
    {
      prompt:
        "Bir noktada alanları toplarken neden yalnız yük işaretlerine bakılmaz?",
      answer:
        "Her kaynağın noktayla geometrik konumu alan yönünü belirler; toplam vektöreldir.",
    },
    {
      prompt: "E=V/d ile E=k|Q|/r² hangi ayrımla kullanılır?",
      answer:
        "İlki uygun düzgün paralel-levha bölgesi için, ikincisi tek noktasal kaynağın r>0 uzaklıktaki alanı için kullanılır.",
    },
  ],
  source:
    "MEBİ AYT Fizik Konu Özetleri, PDF s.105–106 ve113 (basılı103–104 ve111) doğrudan yeniden okundu. Kaynak/test yükü ayrımı, vektörel bileşke, alan çizgileri ve düzgün alanda kuvvet koşullarıyla karşılaştırılmış özgün anlatım ve çözümler. Mevcut tek-kaynak modeli çoklu kaynak veya levha düzenini canlandırıyor sayılmaz; resmî soru aktarılmadı.",
};
