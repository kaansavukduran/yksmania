import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const source =
  "MEBİ TYT Fizik Konu Özetleri, Isı ve Sıcaklık s.59–66 ve Isıl Denge s.70–71; Aurelia TYT Fizik Isı ve Sıcaklık kopya kağıdı ile karşılaştırılarak hazırlanmış özgün anlatım ve alıştırmalar. Hâl değişimi yalnız Q=mcΔT bağıntısının sınırını açıklayan köprüdür; ayrı hâl değişimi ünitesinin tamamı değildir. Sorular resmî ÖSYM sorusu değildir.";

export const heatTemperatureGuide: LessonGuide = {
  id: "isi-ve-sicaklik",
  minutes: 48,
  objectives: [
    "Isı, sıcaklık ve iç enerjiyi örnek, birim ve ölçüm yöntemiyle ayır.",
    "Öz ısı, ısı sığası ve sıcaklık değişimini birimleriyle ilişkilendir.",
    "Yalıtılmış sistemde enerji hesabıyla ısıl dengeyi bul; modelin koşullarını sınayarak kullan.",
    "Sıcaklık ölçeklerini ve grafik eğimlerini doğru yorumla; hâl değişimi sınırını fark et.",
  ],
  sections: [
    {
      title: "Aynı hikâyede üç farklı nicelik",
      paragraphs: [
        "Elindeki kupayı bir sistem olarak seç. Kupanın içindeki taneciklerin mikroskobik hareket ve etkileşim enerjilerinin toplamı iç enerjidir: U ile gösterilir, birimi joule (J) olur. Sıcaklık T ise okul düzeyindeki tanecik modelinde ortalama kinetik enerjiyle ilişkilidir; toplam tanecik sayısının veya toplam iç enerjinin adı değildir. Aynı sıcaklıktaki küçük ve büyük su örnekleri aynı miktarda madde içermez. Sıcaklığın eşit olması iç enerjilerinin eşit olduğunu göstermez.",
        "Isı Q, sıcaklık farkı nedeniyle sistemler arasında aktarılan enerjiyi adlandırır. Madde ‘ısı depolamaz’; iç enerjisi vardır, temas sırasında enerji alabilir veya verebilir. Isı ve iç enerjinin birimi J, sıcaklığın SI birimi kelvindir (K). Bir termometre T’yi gösterir; Q’yu veya U’yu doğrudan göstermez. Mekanik iş ve başka enerji aktarımları ihmal edildiğinde alınan ısı, iç enerji değişimini açıklar; bütün enerji değişimlerini koşulsuz olarak ısı diye adlandırma.",
      ],
      table: {
        headers: ["Nicelik", "Anlam", "Birim / araç"],
        rows: [
          ["T: sıcaklık", "Isıl durumu belirten büyüklük", "K; termometre"],
          [
            "Q: ısı",
            "Sıcaklık farkıyla aktarılan enerji",
            "J; kalorimetreyle enerji hesabı",
          ],
          [
            "U: iç enerji",
            "Mikroskobik kinetik ve potansiyel enerjilerin toplamı",
            "J; termometreden tek başına bulunmaz",
          ],
        ],
      },
    },
    {
      title: "Isı nereye akar, denge ne zaman oluşur?",
      paragraphs: [
        "80 °C’lik bir örnek ile 20 °C’lik bir örnek arasında ısıl temas kurulunca kendiliğinden net enerji aktarımı yüksek sıcaklıktan düşük sıcaklığa olur. ‘Soğukluk sıcak cisme aktı’ yerine ‘sıcak cisim enerji verdi, soğuk cisim enerji aldı’ de. Her örneğin kendi içinde yaklaşık aynı sıcaklıkta olduğunu kabul ettiğimiz iki cisim modelinde sıcaklık farkı azaldıkça dengeye yaklaşılır. Denge, örneklerin sıcaklıklarının eşit olduğu durumdur; iç enerjilerinin veya kütlelerinin eşit olması gerekmez.",
        "Yalnız ‘dokundular’ demek dengeye ulaşıldığını kanıtlamaz; yeterli süre ve uygun temas gerekir. Yalıtılmış bir sistemde dış çevreyle enerji alışverişi yoktur. Kap enerji alıyorsa onu da hesaba katmalısın. Aralarında başka etki bulunmayan eşit sıcaklıktaki cisimler arasında net ısı aktarımı olmaz. Soğutucu gibi dışarıdan iş alan düzenekler ise kendiliğinden sıcak–soğuk temasının basit modeli değildir.",
      ],
    },
    {
      title: "Dokunma hissi yerine ölçüm kullan",
      paragraphs: [
        "Aynı odada uzun süre duran metal ve ahşap yaklaşık aynı sıcaklıkta olabilir. Metal ele daha soğuk gelebilir; çünkü elden enerji aktarımının hızı farklıdır. Dokunma hissi cismin tek başına sıcaklığını ölçmez. Termometreyi ölçülecek sistemle uygun biçimde temas ettirir, okumayı dengeye geldikten sonra yaparsın. Çok küçük bir örneğe büyük bir termometre sokmak örneğin sıcaklığını değiştirebilir; ölçme aracının etkisini ihmal etmek de bir varsayımdır.",
        "Sıvılı termometre sıvının hacim değişimini, metal termometre metalin genleşmesini, uygun gazlı termometre basınç veya hacim değişimini kullanabilir. Kızılötesi termometre temas kurmadan ışınımdan sıcaklık tahmini yapar; yüzey özellikleri ölçümü etkileyebilir. Aynı hazne ve sıvı için daha dar kılcal boru, aynı hacim değişiminde daha büyük seviye değişimi sağlar: Δh=ΔV/A. Ölçüm aralığı, duyarlılık ve okuma hassasiyeti aynı özellik değildir; kullanılan sıvı o aralıkta uygun hâlde kalmalıdır.",
      ],
    },
    {
      title: "Ölçeği dönüştür, sıcaklık farkını ayrı tut",
      paragraphs: [
        "Celsius ve kelvin aralıklarının büyüklüğü aynıdır, sıfır noktaları farklıdır: T(K)=t(°C)+273,15. Soruda okul yaklaşımı 273 verilirse o değeri kullan ve yaklaşımı belirt. Mutlak sıfır 0 K=−273,15 °C’dir; kelvinde derece işareti kullanılmaz. Mutlak sıfırı bütün mikroskobik hareketin kesinlikle yok olduğu klasik bir resimle açıklamak ileri fizik açısından doğru değildir. Günlük Celsius oranlarını da enerji veya mutlak sıcaklık oranı sanma: 40 °C, 20 °C’nin mutlak sıcaklığının iki katı değildir.",
        "Fahrenheit dönüşümü tF=(9/5)tC+32’dir. Saf suyun normal atmosfer basıncındaki yaklaşık donma ve kaynama noktaları Celsius’ta 0 ve 100, Fahrenheit’ta 32 ve 212’dir. Dönüşümde iki ölçekteki aralık oranı 180/100 olur. Değişim sorulunca sabit başlangıçlar çıkar: ΔTK=ΔTC ve ΔTF=(9/5)ΔTC. Örneğin 15 °C’den 25 °C’ye artış 10 K veya 18 °F’lik değişimdir; 283,15 K’lik değişim değildir.",
      ],
    },
    {
      title: "Öz ısı malzemeyi, ısı sığası bütün örneği anlatır",
      paragraphs: [
        "Öz ısı c, belirli koşullarda birim kütlenin sıcaklığını bir derece değiştirmek için gereken enerjiyle ilişkilidir. Birimi J/(kg·K), J/(kg·°C) veya uygun gram birimi olabilir. Aynı maddenin aynı hâl ve koşullarındaki iki farklı kütlesinin öz ısıları aynıdır; madde türü, hâli ve sıcaklık aralığı değiştiğinde c değişebilir. Bu derste verilen aralıklarda c’nin yaklaşık sabit olduğu kabul edilir. Suyun c=4200 J/(kg·°C) alınması, her koşul için değişmez kesin bir sabit iddiası değildir.",
        "Isı sığası C=m·c, örneğin tamamının bir derecelik değişim için gerektirdiği enerjiyi gösterir; birimi J/K veya J/°C’dir. Aynı suyun kütlesini iki katına çıkarırsan c aynı kalır, C iki katına çıkar. Eşit Q verilen örneklerde ΔT=Q/C olur; büyük C daha küçük sıcaklık değişimi demektir. ‘Büyük c yavaş ısınır’ cümlesinde aynı kütle, aynı net güç ve uygun diğer koşullar gizlidir. Yalnız c’ye bakarak gerçek bir kabın ısınma süresini kesin söyleyemezsin.",
      ],
    },
    {
      title: "Q=mcΔT bir koşullu enerji hesabıdır",
      paragraphs: [
        "Hâl değişimi yoksa, c yaklaşık sabitse ve örnek için tek bir sıcaklık tanımlayabiliyorsan Q=m·c·(Tson−Tilk) bağıntısını kullan. Alınan enerji için Q pozitif, verilen enerji için Q negatif seçilir. ‘Verdiği ısı kaç J?’ sorusu çoğunlukla pozitif büyüklük |Q| ister. Önce işaretli Q’yu bul, sonra istenenin büyüklük mü değişim mi olduğunu söyle. Yalnız hedef sıcaklığı c ile çarpmak başlangıç sıcaklığını yok sayar.",
        "c’nin paydasındaki kütle birimi neyse m’yi ona dönüştür. 150 g ve 900 J/(kg·°C) birlikte verildiyse m=0,150 kg kullan; böylece kg ve °C sadeleşir, sonuç J kalır. 1 cal≈4,184 J’dir; soru 4,2 yaklaşımını veriyorsa onu uygula. Isıtıcının nominal enerjisinin tümü örneğe geçmeyebilir: örneğe geçen Q verilmemişse verim, kap ve çevre kayıpları önemlidir. Q=P·t yalnız sabit net güç ve uygun enerji aktarımı koşulunda kullanılır.",
      ],
    },
    {
      title: "Grafiğin eğimini eksenlerden çıkar",
      paragraphs: [
        "Düşey eksen Q, yatay eksen ΔT ise aynı hâldeki örneğin doğrusu Q=C·ΔT olur ve eğim C=m·c’dir. Düşey T, yatay alınan Q ise eğim ΔT/ΔQ=1/C olur. İkinci çizimde daha dik doğru daha küçük ısı sığası demektir. Eksen adını okumadan ‘dikse c büyüktür’ diye ezber yapmak aynı ilişki için iki zıt sonuca götürür.",
        "C–m grafiğinin eğimi ise c’dir; çünkü C=c·m. Burada da madde hâlinin ve c’nin sabit kabul edildiğini kontrol et. Sıcaklık–zaman grafiğinden c karşılaştırmak için yalnız kütleleri değil, örneklere geçen net güçleri de bilmek gerekir. Daha hızlı sıcaklık artışı daha küçük C’den veya daha yüksek güçten kaynaklanabilir. Laboratuvardaki sıcaklık–enerji grafiği bu nedenle zaman ekseni kullanmaz.",
      ],
    },
    {
      title: "Denge sıcaklığını enerji korunumu kurar",
      paragraphs: [
        "Yalıtılmış, tepkime ve hâl değişimi olmayan iki örnek; ihmal edilen kap ve mekanik iş varsayımlarıyla birlikte ele alınsın. İşaretli enerji bilançosu C1(Td−T1)+C2(Td−T2)=0 olur. Buradan Td=(C1T1+C2T2)/(C1+C2) çıkar. Sonuç bir ısı sığası ağırlıklı ortalamadır. T1<T2 ise pozitif ısı sığaları için T1<Td<T2 olmalıdır; bunun dışındaki sonuç enerji modelinde veya aritmetikte hata gösterir.",
        "Denge sıcaklığı daha büyük C’ye sahip örneğin ilk sıcaklığına daha yakındır. Aritmetik ortalama yalnız C1=C2 iken kullanılabilir; eşit kütle ama farklı madde yeterli değildir. Aynı madde ve aynı c için kütle ağırlıklı ortalamaya geçilebilir. Kap ihmal edilmiyorsa Ckap(Td−Tkap) terimi de eklenir. Dışarıdan enerji verilirse sağ taraf artık sıfır olmaz; buz eriyorsa ayrı enerji basamakları gerekir. Formülün görünüşünden önce sistemin sınırını seç.",
      ],
    },
    {
      title: "Sıcaklık sabitse enerji aktarımı durmuş olmak zorunda değil",
      paragraphs: [
        "Sabit basınçta saf bir maddenin iki hâli birlikte bulunurken erime gibi bir geçiş boyunca sıcaklık sabit kalabilir. Enerji taneciklerin düzeni ve etkileşimleriyle ilgili iç enerjiye katkı yapar. 0 °C’deki saf buz-su karışımına enerji vermek, buz tamamen eriyene kadar sıcaklığı artırmak yerine eriyen miktarı artırabilir. Bu olaya Q=mcΔT uygularsan ΔT=0 diye yanlışlıkla Q=0 bulursun.",
        "Geçiş sıcaklığındaki hâl değişimi için Q=mdeğişen·L kullanılır; L’nin birimi J/kg veya J/g olur. Eksi sıcaklıktaki buzu suya dönüştürmek gerekirse önce buzu ısıtma, sonra eritme, sonra suyu ısıtma ayrı basamaklardır. Bu bölüm yalnız bağıntının nerede değiştiğini gösterir. Buharlaşma–kaynama ayrımı, bütün hâl değişimleri, basınç etkisi ve çok basamaklı buz-su karışımları ayrı Hâl Değişimi konusunda ayrıntılandırılır; o konu bu derste tamamlanmış sayılmaz.",
      ],
    },
    {
      title: "Önce tahmin et, sonra hesapla, en son sınırla denetle",
      paragraphs: [
        "Çözüm sırası: sistemi seç; ilk sıcaklıkları ve kütleleri birimleriyle yaz; enerji alışverişi, kap ve hâl değişimi koşullarını kontrol et; işaretli denklemi kur; sonucu verilen iki sıcaklık arasına ve birim kontrolüne yerleştir. Önceden ‘hangi örnek daha çok sıcaklık değiştirir?’ diye tahmin etmek, hesapla kavramın birbirini denetlemesini sağlar. Sonuç yanlışsa önce birimi, sonra ΔT’yi, sonra ısı sığası ağırlığını kontrol et.",
        "Günlük örneklerde sıcaklık ile aktarım hızını ayrı sor. Aynı odadaki metalin farklı hissedilmesi bir hız olayıdır; suyun aynı enerjide daha az ısınması bir ısı sığası karşılaştırması olabilir. Bir kaptaki suyun başka kaptakinden sıcak olması toplam iç enerjisinin mutlaka daha büyük olduğunu göstermez. Modelde ilerleme çubuğu enerji hesabındaki ara durumları seçer; gerçek dakika veya ölçülmüş iletim yasası değildir. Bir tahmini gerekçeyle düzeltmek, düğmelere dokunmaktan daha değerlidir.",
      ],
    },
  ],
  examples: [
    {
      title: "Gramı düzelt, sıcaklık artışını kullan",
      prompt:
        "150 g alüminyum parça 20 °C’den 60 °C’ye ısıtılıyor. c=900 J/(kg·°C) sabit, hâl değişimi ve kayıp yok. Parçanın aldığı enerji kaç J?",
      strategy:
        "Kütleyi öz ısının birimine uydur, sonra sıcaklık farkını hesapla.",
      steps: [
        {
          label: "Birimi eşleştir",
          explanation: "c kilogram başına verilmiştir; 150 g=0,150 kg.",
          expression: "m=0,150 kg",
        },
        {
          label: "Değişimi bul",
          explanation:
            "Son sıcaklıktan ilk sıcaklığı çıkar; 60 tek başına ΔT değildir.",
          expression: "ΔT=60−20=40 °C",
        },
        {
          label: "Enerjiyi hesapla",
          explanation:
            "Tek hâl ve sabit c koşulları sağlandığından Q=mcΔT kullanılır.",
          expression: "Q=0,150·900·40=5400 J",
        },
      ],
      answer: "Parça 5400 J enerji alır; Q=+5400 J.",
      check:
        "Isı sığası 135 J/°C; 40 derecelik artış için 135·40=5400 J. Birimler J olur.",
      pitfall:
        "150’yi kilogram gibi kullanmak sonucu bin kat artırır; 60’ı sıcaklık değişimi sanmak da yanlıştır.",
    },
    {
      title: "Verilen enerji ile işaretli değişim",
      prompt:
        "0,25 kg’lık bir örnek 80 °C’den 40 °C’ye soğuyor. c=500 J/(kg·°C) sabit, hâl değişimi yok. İşaretli Q ve verdiği enerjinin büyüklüğü nedir?",
      strategy: "Sistemi soğuyan örnek seç; ΔT ve Q’nun işaretini koru.",
      steps: [
        {
          label: "Değişimin yönü",
          explanation:
            "Son sıcaklık daha düşüktür, bu yüzden sıcaklık değişimi negatiftir.",
          expression: "ΔT=40−80=−40 °C",
        },
        {
          label: "İşaretli hesap",
          explanation: "Pozitif m ve c ile çarpılınca Q negatif çıkar.",
          expression: "Q=0,25·500·(−40)=−5000 J",
        },
        {
          label: "Sorunun dilini karşıla",
          explanation:
            "Eksi, örneğin enerji verdiğini bildirir; verilen enerjinin büyüklüğü pozitiftir.",
          expression: "|Q|=5000 J",
        },
      ],
      answer: "Q=−5000 J; verdiği enerji 5000 J büyüklüğündedir.",
      check: "125 J/°C’lik ısı sığası 40 derece soğuyunca 5000 J verir.",
      pitfall:
        "‘−5000 J enerji aldı’ diyerek işaret ile süreç yönünü çeliştirme.",
    },
    {
      title: "Eşit olmayan iki su kütlesi",
      prompt:
        "Yalıtılmış düzende 0,20 kg 70 °C su ve 0,30 kg 20 °C su dengeye getiriliyor. İki örnekte c=4200 J/(kg·°C), kap ihmal ediliyor; kayıp, tepkime ve hâl değişimi yok. Denge sıcaklığı nedir?",
      strategy:
        "Sıcak suyun verdiğini soğuk suyun aldığına eşitle; aynı c sadeleşir.",
      steps: [
        {
          label: "Bilanço kur",
          explanation:
            "İki örneğin işaretli enerji değişimlerinin toplamı sıfırdır.",
          expression: "0,20c(Td−70)+0,30c(Td−20)=0",
        },
        {
          label: "Ortak katsayıyı sadeleştir",
          explanation: "c her iki terimde aynı ve sıfırdan farklıdır.",
          expression: "0,50Td=0,20·70+0,30·20=20",
        },
        {
          label: "Dengeyi kontrol et",
          explanation:
            "Denge 20 ile 70 arasındadır ve daha büyük kütleli soğuk suyun ilk sıcaklığına daha yakındır.",
          expression: "Td=40 °C",
        },
      ],
      answer: "Denge sıcaklığı 40 °C’dir.",
      check:
        "Sıcak su 0,20·4200·30=25200 J verir; soğuk su 0,30·4200·20=25200 J alır.",
      pitfall: "(70+20)/2=45 °C yalnız ısı sığaları eşit olsaydı doğru olurdu.",
    },
    {
      title: "Farklı malzemelerde kütle tek başına yetmez",
      prompt:
        "Yalıtılmış düzende 0,40 kg alüminyum (c=900 J/(kg·°C)) 70 °C’de; 0,20 kg su (c=4200 J/(kg·°C)) 10 °C’dedir. Kap, kayıp, iş, tepkime ve hâl değişimi ihmal ediliyor. Denge sıcaklığını bul.",
      strategy:
        "Önce her örneğin ısı sığasını hesapla; ağırlığı kütle değil C belirler.",
      steps: [
        {
          label: "Isı sığalarını hesapla",
          explanation:
            "Daha hafif suyun öz ısısı büyük olduğu için toplam ısı sığası daha büyüktür.",
          expression: "CAl=0,40·900=360; Csu=0,20·4200=840 J/°C",
        },
        {
          label: "Enerjiyi koru",
          explanation:
            "Isı sığası ağırlıklı ortalama, iki enerji teriminin toplamını sıfır yapar.",
          expression: "Td=(360·70+840·10)/(360+840)=33600/1200",
        },
        {
          label: "Yön ve büyüklük denetimi",
          explanation:
            "Sonuç 10 ile 70 arasındadır ve büyük C’li suyun ilk sıcaklığına daha yakındır.",
          expression: "Td=28 °C",
        },
      ],
      answer: "Denge sıcaklığı 28 °C’dir.",
      check: "Alüminyum 360·42=15120 J verir; su 840·18=15120 J alır.",
      pitfall:
        "Farklı maddelerde yalnız kütle ağırlıklı ortalama almak öz ısı farkını yok sayar.",
    },
    {
      title: "Sıcaklık ve sıcaklık farkını ayrı dönüştür",
      prompt:
        "Bir örnek −10 °C’den 30 °C’ye çıkıyor. T(K)=t(°C)+273,15 ve tF=(9/5)tC+32 veriliyor. İlk ve son kelvin sıcaklıkları, kelvin ve Fahrenheit değişimleri nedir?",
      strategy:
        "Tek tek sıcaklıklarda sıfır kaymasını kullan; fark alırken bu kaymanın yok olduğunu göster.",
      steps: [
        {
          label: "Sıcaklıkları dönüştür",
          explanation: "Her sıcaklığa aynı 273,15 eklenir.",
          expression: "Tilk=263,15 K; Tson=303,15 K",
        },
        {
          label: "Kelvin farkını al",
          explanation: "İki toplamın farkında 273,15’ler sadeleşir.",
          expression: "ΔTK=303,15−263,15=40 K",
        },
        {
          label: "Fahrenheit aralığını bul",
          explanation:
            "Celsius aralığının 9/5 katı alınır; 32 fark hesabına eklenmez.",
          expression: "ΔTF=(9/5)·40=72 °F",
        },
      ],
      answer: "263,15 K → 303,15 K; artış 40 K veya 72 °F’dir.",
      check: "İlk değer 14 °F, son değer 86 °F; fark gerçekten 72 °F olur.",
      pitfall: "40 derecelik farka 273,15 veya 32 ekleme.",
    },
    {
      title: "Yatay grafik enerji yok demek değildir",
      prompt:
        "Normal atmosfer basıncında 0 °C’deki 50 g saf buza 8000 J aktarılıyor. Erime ısısı L=334 J/g, kap ve çevre kaybı ihmal ediliyor. Buzun tümü erir mi; son sıcaklık ve eriyen kütle ne olur?",
      strategy:
        "Önce tüm buzu eritme ihtiyacını verilen enerjiyle karşılaştır; sıcaklık artışına hemen geçme.",
      steps: [
        {
          label: "Tam erimeyi sına",
          explanation:
            "Başlangıç zaten erime sıcaklığında; buzu ısıtma basamağı yoktur.",
          expression: "Qtam=50·334=16700 J > 8000 J",
        },
        {
          label: "Eriyen miktarı bul",
          explanation: "Yalnız faz değiştiren kütle için Q=mL kullanılır.",
          expression: "meriyen=8000/334≈23,95 g",
        },
        {
          label: "Son hâli söyle",
          explanation:
            "Buz kaldığı için iki hâl birlikte bulunur; bu koşullarda sıcaklık 0 °C kalır.",
          expression: "mbuz≈26,05 g; Tson=0 °C",
        },
      ],
      answer:
        "Tümü erimez. Yaklaşık 23,95 g erir, 26,05 g buz kalır; son sıcaklık 0 °C’dir.",
      check:
        "23,95 g yaklaşık 8000 J’lik erimeye karşılık gelir; kalan buz sıfırdan büyüktür.",
      pitfall:
        "ΔT=0’dan Q=0 çıkarma; bu basamakta mcΔT modeli geçerli değildir.",
    },
  ],
  recall: [
    {
      prompt:
        "Aynı sıcaklık, aynı iç enerji demek midir? Termometre hangisini ölçer?",
      answer:
        "Hayır; kütle, madde ve hâl de önemlidir. Termometre sıcaklığı ölçer, toplam iç enerjiyi veya aktarılan ısıyı doğrudan ölçmez.",
    },
    {
      prompt: "Suyun kütlesi üç katına çıkınca c ve C ne olur?",
      answer:
        "Aynı hâl ve koşullarda c aynı kalır. C=mc üç katına çıkar; eşit enerji verilirse sıcaklık değişimi üçte bir olur.",
    },
    {
      prompt: "30 °C’den 50 °C’ye artış kaç K’dir; hangi sayıyı eklemezsin?",
      answer:
        "20 K’dir. Sıcaklık farkına 273,15 eklenmez; yalnız tek sıcaklık dönüşümünde kullanılır.",
    },
    {
      prompt:
        "Denge sıcaklığını aritmetik ortalama almanın koşulu ve hâl değişimi istisnası nedir?",
      answer:
        "İki örneğin ısı sığaları eşit olmalı; sistem yalıtılmış, kap ihmal edilebilir, hâl değişimi/tepkime olmamalıdır. Hâl değişiminde enerjiyi önce mcΔT ve mL basamaklarına ayırırsın.",
    },
    {
      prompt:
        "T–Q grafiğinde daha dik doğru neyi gösterir; yatay parça ne olabilir?",
      answer:
        "Aynı hâl ve sabit c modelinde eğim 1/(mc), dolayısıyla daha küçük C’dir. Sabit basınçta saf maddenin hâl değişiminde yatay parça sırasında enerji aktarımı sürebilir.",
    },
  ],
  source,
};

type Item = [string, string[], number, string, string, string];
const items: Item[] = [
  [
    "Bir metal parça, daha soğuk bir sıvıya temas ederek ona 600 J enerji aktarıyor. Bu 600 J ve parçanın taneciklerinin mikroskobik kinetik–potansiyel enerji toplamı sırasıyla hangi kavramlardır?",
    [
      "Sıcaklık — ısı",
      "Isı — iç enerji",
      "İç enerji — sıcaklık",
      "Isı — sıcaklık",
      "Sıcaklık — iç enerji",
    ],
    1,
    "Aktarımın nedeni sıcaklık farkıdır; toplam mikroskobik enerji ise sistemin bir özelliğidir.",
    "Sıcaklık farkı nedeniyle aktarılan 600 J ısıdır (Q). Parçanın taneciklerinin mikroskobik kinetik ve potansiyel enerji toplamı iç enerjidir (U). İkisinin birimi J olsa da biri aktarımı, diğeri sistemin enerji durumunu anlatır. Sıcaklığın birimi kelvindir; aktarılan enerji sıcaklık değildir.",
    "kavram-ayrimi",
  ],
  [
    "Aynı odada uzun süre kalan metal ve ahşap yüzeyler 22 °C ölçülüyor. Metal ele daha soğuk geliyor. Bu gözlemlerle uyumlu açıklama hangisidir?",
    [
      "Metal mutlaka 22 °C’den soğuktur.",
      "Ahşabın öz ısısı mutlaka sıfırdır.",
      "Metal elden enerjiyi daha hızlı çekebilir; his, sıcaklığın doğrudan ölçümü değildir.",
      "Eşit sıcaklık tüm örneklerin iç enerjisinin eşit olduğunu kanıtlar.",
      "Enerji 22 °C’lik yüzeyden daha sıcak ele kendiliğinden akar.",
    ],
    2,
    "Sıcaklık ile elden enerji aktarım hızını ayrı değerlendir.",
    "Termometre iki yüzeyi aynı sıcaklıkta ölçmüştür. Metalin elden enerjiyi daha hızlı iletmesi daha soğuk hissedilmesini açıklayabilir. Bu his farklı sıcaklığı veya eşit iç enerjiyi kanıtlamaz. Daha sıcak elden 22 °C’lik yüzeye net ısı aktarımı beklenir; ters yön kendiliğinden olmaz. Ahşabın öz ısısının sıfır olduğu sonucu da yoktur.",
    "olcum-ve-his",
  ],
  [
    "Bir örnek 10 °C’den 35 °C’ye ısınıyor. T(K)=t(°C)+273,15 verilirse sıcaklık değişimi kaç K olur?",
    ["248,15 K", "25 K", "35 K", "283,15 K", "308,15 K"],
    1,
    "Son kelvin sıcaklığından ilk kelvin sıcaklığını çıkar; eklenen sabitler sadeleşir.",
    "İlk sıcaklık 283,15 K, son sıcaklık 308,15 K’dir. Değişim 308,15−283,15=25 K olur. Celsius ve kelvin aralıkları eşittir; 273,15 tek bir sıcaklığın sıfır noktasını dönüştürür, sıcaklık farkına eklenmez. 308,15 K son sıcaklıktır, değişim değildir.",
    "sicaklik-olcekleri",
  ],
  [
    "200 g’lık bir katı, hâl değiştirmeden 15 °C’den 45 °C’ye ısınıyor. c=600 J/(kg·°C) sabit kabul ediliyor. Katının aldığı enerji kaç J’dir?",
    ["360 J", "1800 J", "3600 J", "5400 J", "3600000 J"],
    2,
    "200 g’ı kg’a çevir ve 45−15 farkını kullan.",
    "Kütle 0,200 kg, sıcaklık değişimi 30 °C’dir. Q=mcΔT=0,200·600·30=3600 J. 600’ün birimindeki kg ile kütlenin kg birimi uyumludur. 45’i ΔT sanmak 5400 J, gramı kg gibi kullanmak 3600000 J verir; ikisi de uygun enerji hesabı değildir.",
    "isi-hesabi-birim",
  ],
  [
    "Isı alan örnek için Q pozitif seçiliyor. 0,40 kg bir örnek, c=500 J/(kg·°C) sabitken 60 °C’den 20 °C’ye soğuyor; hâl değişimi yok. Örneğin işaretli Q değeri nedir?",
    ["+8000 J", "−8000 J", "−4000 J", "+4000 J", "0 J"],
    1,
    "Soğuyan sistem için Tson−Tilk negatiftir.",
    "ΔT=20−60=−40 °C. Q=0,40·500·(−40)=−8000 J bulunur. Eksi işaret örneğin ısı verdiğini gösterir; verdiği enerjinin büyüklüğü 8000 J’dir. İşaretli Q sorulduğu için +8000 J cevap olmaz. Sıcaklık değiştiğinden Q da bu modelde sıfır değildir.",
    "isi-isareti",
  ],
  [
    "Aynı madde ve aynı hâlden alınan X ve Y örneklerinde mY=3mX, öz ısı c sabittir. Isı sığası C=mc olduğuna göre hangi ilişki doğrudur?",
    [
      "cY=3cX; CY=CX",
      "cY=cX; CY=3CX",
      "cY=cX/3; CY=CX",
      "cY=3cX; CY=9CX",
      "cY=cX; CY=CX/3",
    ],
    1,
    "Maddeye ait birim kütle özelliği ile örneğin toplam kapasitesini ayır.",
    "Aynı madde, hâl ve koşullarda c kütleye bağlı değildir: cY=cX. Isı sığası C=mc olduğundan üç kat kütle üç kat C verir: CY=3CX. Öz ısıyı da üçle çarpmak aynı kütle etkisini iki kez sayar; kapasiteyi azaltmaksa C=mc ile çelişir.",
    "oz-isi-isi-sigasi",
  ],
  [
    "0,10 kg 80 °C su ile 0,30 kg 20 °C su yalıtılmış düzende ısıl dengeye geliyor. Her ikisi için c aynı ve sabit; kap, iş, hâl değişimi ve kayıp ihmal ediliyor. Denge sıcaklığı kaç °C olur?",
    ["25", "35", "50", "65", "80"],
    1,
    "Ağırlıkların eşit olup olmadığını kontrol et; ortak c sadeleşir.",
    "Enerji bilançosu 0,10c(Td−80)+0,30c(Td−20)=0’dır. Buradan Td=(0,10·80+0,30·20)/0,40=14/0,40=35 °C çıkar. Soğuk suyun ısı sığası üç kat büyük olduğundan sonuç 20 °C’ye daha yakındır. 50 °C aritmetik ortalama, yalnız ısı sığaları eşitse geçerli olurdu.",
    "isil-denge",
  ],
  [
    "Yalıtılmış iki örnekten X’in ısı sığası 200 J/°C ve ilk sıcaklığı 80 °C; Y’nin ısı sığası 600 J/°C ve ilk sıcaklığı 20 °C’dir. Kap, iş, tepkime ve hâl değişimi ihmal edilerek ısıl denge sağlanıyor. Denge sıcaklığı kaç °C’dir?",
    ["20", "35", "50", "65", "80"],
    1,
    "Verilenler zaten toplam ısı sığasıdır; bir daha kütleyle çarpma.",
    "Td=(CXTX+CYTY)/(CX+CY)=(200·80+600·20)/800=28000/800=35 °C. Kontrol: X 200·45=9000 J verir, Y 600·15=9000 J alır. Eşit sıcaklık değişimi beklenmez; kapasitesi üç kat büyük Y’nin değişimi üçte birdir. 65 °C, ağırlıkları yanlış örneğe vermekten doğar.",
    "denge-isi-sigasi",
  ],
  [
    "Hâl değiştirmeyen ve öz ısıları sabit iki örneğin düşey ekseni sıcaklık T, yatay ekseni alınan enerji Q olan doğrusal grafiklerinde eğimler sırasıyla 0,020 °C/J ve 0,010 °C/J’dir. Isı sığaları CX ve CY için CX/CY oranı nedir?",
    ["1/4", "1/2", "1", "2", "4"],
    1,
    "Bu eksenlerde eğim ΔT/Q=1/C’dir.",
    "T–Q grafiğinin eğimi 1/C olduğundan CX=1/0,020=50 J/°C, CY=1/0,010=100 J/°C bulunur. CX/CY=1/2’dir. Eğimi doğrudan C sanıp 2 demek eksenleri ters okumaktır. Kütleler verilmediği için öz ısı oranı değil, yalnız ısı sığası oranı çıkarılabilir.",
    "grafik-egimi",
  ],
  [
    "Normal atmosfer basıncında 0 °C’deki 100 g saf buz-su karışımına, buzun bir bölümü hâlâ kalacak kadar enerji veriliyor. Kap ve çevre kaybı ihmal ediliyor. Bu süreçte hangisi doğrudur?",
    [
      "ΔT=0 olduğundan aktarılan enerji sıfırdır.",
      "Sıcaklık artmadan buzun bir kısmı eriyebilir; iç enerji artar.",
      "Buz ve su birlikteyken sıcaklık zorunlu olarak 100 °C’ye çıkar.",
      "Verilen enerji yalnız suyun kütlesini yok eder.",
      "Q=mcΔT bütün erime enerjisini tek başına verir.",
    ],
    1,
    "İki hâl birlikteyken sabit sıcaklık, iç enerjinin sabit olduğu anlamına gelmez.",
    "Saf suyun normal basınçtaki erime geçişinde buz ve su birlikte kaldığı sürece sıcaklık 0 °C kalabilir; verilen enerji eriyen miktarı ve iç enerjiyi artırır. Erime enerjisi Q=meriyenL ile hesaplanır. Q=mcΔT tek hâldeki sıcaklık değişimine aittir, bu sabit sıcaklıktaki erimeyi açıklamaz. Kütle yok olmaz; katıdan sıvıya geçer.",
    "hal-degisimi-model-siniri",
  ],
];

const questions: Question[] = items.map(
  ([prompt, options, answer, hint, explanation, skill], i) => {
    // Preserve authored answer identity while distributing its position across the bank.
    const shift = (i * 2) % 5;
    const positioned = options.map(
      (_, position) => options[(position - shift + 5) % 5],
    );
    return {
      id: `isi-ve-sicaklik-q${i + 1}`,
      prompt: txt(prompt),
      options: positioned.map(txt),
      answer: (answer + shift) % 5,
      hint: txt(hint),
      explanation: txt(explanation),
      skill,
    };
  },
);

export const heatTemperatureLesson: Lesson = {
  id: heatTemperatureGuide.id,
  subjectId: "tyt-fizik",
  title: txt("Isı ve sıcaklık"),
  minutes: heatTemperatureGuide.minutes,
  objectives: heatTemperatureGuide.objectives.map(txt),
  body: heatTemperatureGuide.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions,
  source: txt(source),
  tags: ["detail-119", "ısı", "sıcaklık", "iç enerji", "ısıl denge"],
};

function finitePositive(value: number) {
  if (!Number.isFinite(value) || value <= 0)
    throw new RangeError("Pozitif ve sonlu ısı sığası gerekir.");
}

/** An energy-accounting path, not a heat-transfer-rate or time law. */
export function thermalContact(
  cA: number,
  cB: number,
  initialA: number,
  initialB: number,
  progress: number,
) {
  finitePositive(cA);
  finitePositive(cB);
  if (![initialA, initialB, progress].every(Number.isFinite))
    throw new RangeError("Sonlu sıcaklık ve ilerleme gerekir.");
  const fraction = Math.min(1, Math.max(0, progress));
  const equilibrium = (cA * initialA + cB * initialB) / (cA + cB);
  const energyA = fraction * cA * (equilibrium - initialA);
  return {
    equilibrium,
    energyA,
    energyB: -energyA,
    temperatureA: initialA + energyA / cA,
    temperatureB: initialB - energyA / cB,
  };
}

/** Pure water, normal pressure, −10 °C ice → 20 °C water; idealized fixed coefficients. */
export function waterHeating(massGrams: number, energyJoules: number) {
  finitePositive(massGrams);
  if (!Number.isFinite(energyJoules))
    throw new RangeError("Sonlu enerji gerekir.");
  const warmIce = massGrams * 2.1 * 10;
  const melt = massGrams * 334;
  const maximum = warmIce + melt + massGrams * 4.2 * 20;
  const energy = Math.min(maximum, Math.max(0, energyJoules));
  if (energy < warmIce)
    return {
      energy,
      warmIce,
      melt,
      maximum,
      temperature: -10 + energy / (massGrams * 2.1),
      liquidFraction: 0,
      phase: "Buz ısınıyor",
    };
  if (energy < warmIce + melt)
    return {
      energy,
      warmIce,
      melt,
      maximum,
      temperature: 0,
      liquidFraction: (energy - warmIce) / melt,
      phase: "Erime basamağı",
    };
  return {
    energy,
    warmIce,
    melt,
    maximum,
    temperature: (energy - warmIce - melt) / (massGrams * 4.2),
    liquidFraction: 1,
    phase: "Su ısınıyor",
  };
}
