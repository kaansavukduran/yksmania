import { particleCoordinatesSource006 } from "./particleCoordinatesSource006";
import { glucoseSource005 } from "./glucoseSource005";
import { germinationSource002, germinationTotal } from "./germinationSource002";
import type { GuideSection, WorkedExample } from "./guides/types";
import { numberDepth202Supplements } from "./numberDepth202";
import { geometryDepth203Supplements, sectorSupplement203 } from "./geometryDepth203";
import {
  circleAngleSupplement206, geometryDepth206Supplements, prismSupplement206, pyramidSupplement206, solidSupplement206,
} from "./geometryDepth206";
import { geometryDepth205Supplements, quadSupplement205, trapezoidSupplement205 } from "./geometryDepth205";
import { depth207Supplements } from "./depth207";
import { chainSupplement208, depth208Supplements, placeValueSupplement208, wordSupplement208 } from "./depth208";
import { depth215Supplements } from "./depth215";
import { signedBinomial035 } from "./signedBinomialSource035Model";
import { statisticsSource037Classes } from "./statisticsSource037Revision";

interface TheorySupplement {
  title: string;
  figureTitle?: string;
  paragraphs: string[];
  summary?: string;
  appendSection?: true;
  sheetTitle?: string;
  tableLayout?: "table";
  table?: GuideSection["table"];
  workedStep?: { title: string; index: number };
  /** Extra worked examples appended after the accepted guide examples (display only). */
  examples?: readonly WorkedExample[];
}

const binomialExample035 = signedBinomial035(3, { multiplier: 1, exponent: 1 }, { multiplier: 2, exponent: 0 });

export const theorySupplements: Readonly<Record<string, readonly TheorySupplement[] | undefined>> = {
  ...numberDepth202Supplements,
  ...geometryDepth203Supplements,
  ...geometryDepth206Supplements,
  ...geometryDepth205Supplements,
  ...depth207Supplements,
  ...depth208Supplements,
  ...depth215Supplements,
  "genetik-cesitlilik": [{
    title: "Tek mayozun ürünleriyle olası türleri ayır",
    figureTitle: "Tek mayozun ürünleriyle olası türleri ayır",
    paragraphs: [
      "AaBb’de A/a ve B/b ayrı kromozom çiftlerinde olsun, parça değişimi olmasın. A ve B aynı kutba giderse tek mayozun dört ürünü AB, AB, ab, ab olur. Dört hücre vardır ve genotipleri iki türdür.",
      "A ile b aynı kutba yönelirse Ab, Ab, aB, aB oluşur. İki olası yönelimin havuzunda AB, Ab, aB, ab olmak üzere dört tür vardır. Tek mayozdaki hücre sayısını, o mayozdaki tür sayısını ve bütün mayozların olası türlerini ayrı say.",
      "AABbCc’de ilk çift yalnız A verir. Diğer iki çift bağımsız ayrılırsa 1·2·2=4 olasılık çıkar: ABC, ABc, AbC, Abc. 2ᵏ sayımında k, bağımsız ayrılan heterozigot çiftlerin sayısıdır.",
    ],
    summary: "Bağımsız AaBb ve parça değişimsiz örnekte bir mayoz dört ürün ve iki tür verir. İki yönelimin olasılık havuzu dört türdür.",
    appendSection: true,
  }],
  "ayt-kuantum-sayilari": [{
    title: "Katmanda orbital ve spin koşulunu birlikte say",
    figureTitle: "Katmanda orbital ve spin koşulunu birlikte say",
    paragraphs: [
      "n=3 katmanındaki 3s, 3p ve 3d alt kabuklarında 1, 3 ve 5 orbital vardır. Toplam 9 orbital. İki spin durumu da serbestse en fazla 18 elektron sığar. Argonun temel hâlinde bu katmanda 3s²3p⁶ vardır: gerçek doluluk 8 elektrondur.",
      "Yalnız mℓ=0 dendiğinde her alt kabuktan bir kutu kalır. Üç kutuda iki zıt spinle kapasite 6. Yalnız mₛ=+½ dendiğinde dokuz kutu da kalır, her kutuda bir okla kapasite 9. İki koşul aynı anda verilirse üç kutunun her birinde bir spin, toplam 3.",
      "n=4’e geçtiğinde 4s, 4p, 4d ve 4f satırlarını say. mℓ=0 için dört kutu kalır. Spin serbestse 8, spin +½ ile sınırlıysa 4 elektron sığar.",
    ],
    summary: "n=3 için 1+3+5=9 orbital ve en çok 18 elektron. mℓ=0 ile 6, yalnız +½ spinle 9, iki koşulla 3 elektron kapasitesi.",
    appendSection: true,
  }],
  "bagil-hareket": [{
    title: "Yollar kesişse de zamanı karşılaştır",
    figureTitle: "Yollar kesişse de zamanı karşılaştır",
    paragraphs: [
      "Yere göre A, (0; 0) m noktasından (3; 1) m/s ile gider. B, (12; 8) m noktasından (0; −1) m/s ile iner. t saniyede A(3t; t), B(12; 8−t) olur. Buluşmak için iki koordinatı aynı t’de eşitle.",
      "Yatayda 3t=12, düşeyde t=8−t. Her ikisi t=4 s verir ve ortak konum (12; 4) m olur. B’nin ilk y’si 9 m olursa yatay eşitlik yine 4 s, düşey eşitlik 4,5 s ister. 4 s’de A(12; 4), B(12; 5) konumundadır.",
      "İkinci durumda iki yol (12; 4) noktasından geçer. A t=4 s’de, B t=5 s’de oradadır. Aynı nokta ve aynı an koşullarını ayrı kontrol et.",
    ],
    summary: "A(3t; t), B(12; 8−t) için iki eşitlik de t=4 s ve (12; 4) m verir. B(12; 9−t) olursa eşitlikler 4 s ve 4,5 s ister, buluşma olmaz.",
    appendSection: true,
  }],
  "ayt-polinomlar": [{
    title: "İkinci derece bölenin iki köküyle kalanı kur",
    figureTitle: "İkinci derece bölenin iki köküyle kalanı kur",
    paragraphs: [
      "P(x)=x³+2x+1, D(x)=(x−1)(x−2). P=D·Q+R eşitliğinde kalanın derecesi 2’den küçük olmalı. Bu yüzden R(x)=ux+v yazabiliriz. D’nin kökünde D·Q sıfır olur ve P(x)=R(x) kalır.",
      "P(1)=4, P(2)=13. Böylece u+v=4 ve 2u+v=13. İkinci denklemden ilkini çıkarınca u=9, ardından v=−5 çıkar. Kalan 9x−5 ve bölüm x+3. Kontrol için (x²−3x+2)(x+3)+(9x−5) ifadesini aç, x³+2x+1 elde et.",
      "Grafikte 1 ve 2’de yükseklikler eşit. 0’da P(0)=1 ve R(0)=−5, dolayısıyla iki grafik farklı. Tek kökü iki kez kullanmak iki bağımsız denklem vermez. İkinci derece bölenin çift katlı kökünde polinom bölmesi yapabilirsin.",
    ],
    summary: "D’nin iki farklı kökünde P=R. P(1)=4 ve P(2)=13, u+v=4 ve 2u+v=13 verir. Kalan 9x−5. Kalanın derecesi 1 ve böleninki 2.",
    appendSection: true,
  }],
  "atp-metabolizma": [{
    title: "ATP’nin parçalarını say, besinle rolünü karıştırma",
    figureTitle: "ATP’nin parçalarını say, besinle rolünü karıştırma",
    paragraphs: [],
    summary: "ATP; adenin, riboz ve üç fosfat taşır. Hidrolizde uç fosfat ayrılır ve ADP ile serbest fosfat (Pi) oluşur.",
  }, {
    title: "ATP miktarını sentez ve hidrolizle hesapla",
    figureTitle: "ATP miktarını sentez ve hidrolizle hesapla",
    paragraphs: [
      "Başlangıçta 100 ATP molekülü var. Modelde aynı zaman aralığında 20 ATP sentezleniyor ve 35’i hidrolizleniyor. Tepkimeler için yeterli başlangıç ADP ve fosfatı var. Son ATP 100+20−35=85.",
      "Her sentez bir ADP ve bir serbest fosfatı kullanır. Her hidroliz birer ADP ve serbest fosfat oluşturur. İkisinin de net artışı 15. Bu iki tepkimeyle sınırlı modelde ATP ve ADP moleküllerinin toplamı korunur.",
    ],
    summary: "Son ATP = başlangıç + sentez − hidroliz. 100+20−35=85. ADP ve serbest fosfatın her biri net 15 artar.",
    appendSection: true,
  }],
  "ayt-modern-atom-elektron-dizilimi": [{
    title: "2p kutularında önce tek elektronları yerleştir",
    figureTitle: "2p kutularında önce tek elektronları yerleştir",
    paragraphs: [
      "Her kutu bir orbital, her ok bir elektrondur. 2p alt kabuğunda mₗ değerleri −1, 0 ve +1 olan üç orbital bulunur. Hund kuralına göre eş enerjili kutular önce aynı spinli birer elektron alır.",
      "Azot: 1s² 2s² 2p³, üç eşleşmemiş elektron. Oksijen: 1s² 2s² 2p⁴, ilk üçü ayrı kutularda, dördüncü elektron bir kutuda zıt spinle eşleşir. İki eşleşmemiş elektron kalır. Eş enerjili kutularda çiftin gösterildiği yer çizim tercihidir.",
    ],
    summary: "N: 2p³ kutu dolulukları 1,1,1 ve üç eşleşmemiş elektron. O: 2p⁴ doluluklar 2,1,1 ve iki eşleşmemiş elektron. Bir kutudaki eşleşmede spinler zıttır.",
    appendSection: true,
  }],
  "vektorler": [{
    title: "Bileşen işaretini bölgeden bul",
    figureTitle: "Bileşen işaretini bölgeden bul",
    paragraphs: [],
    summary: "+x yönünde 3 N ve +y yönünde 4 N bileşke 5 N verir. +x’ten ölçülen açı yaklaşık 53,1°.",
  }, {
    title: "Üç kuvveti ekle ve dengeleyiciyi çiz",
    figureTitle: "Üç kuvveti ekle ve dengeleyiciyi çiz",
    paragraphs: [
      "A=(6;0) N. B, +x ekseninden saat yönünün tersine 120° ve büyüklüğü 4 N. B’nin yatay bileşeni 4·cos120°=−2 N, düşey bileşeni 4·sin120°=2√3 N. C=(0;−2√3) N.",
      "A, B ve C’yi uç uca ekle. Yatay toplam 6−2=4 N, düşey toplam 2√3−2√3=0 N. R=(4;0) N. Dengeleyici D=(−4;0) N. C değişirse R ve D’yi yeni düşey toplamdan çıkar.",
    ],
    summary: "A=(6;0), B=(−2;2√3), C=(0;−2√3). R=(4;0) ve D=(−4;0) N. Her iki eksende R+D=0.",
    appendSection: true,
  }],
  "dogrunun-analitigi": [{
    title: "Paralel doğruların dik uzaklığını bul",
    figureTitle: "Paralel doğruların dik uzaklığını bul",
    paragraphs: [
      "2x−y+3=0 ve 2x−y−3=0 doğruları aynı x ve y katsayılarına sahip. İkinci denkleme birinci doğru üzerindeki P(0;3) noktasını yazınca −6 elde edilir. Mutlak değeri 6, normal vektörü (2;−1) ve uzunluğu √5. Dik uzaklık 6/√5 birim.",
      "P’den ikinci doğruya inen dik ayağı işaretle: H(2,4;1,8). 2·2,4−1,8−3=0 olduğu için H ikinci doğru üzerindedir. Sabitleri eşitlersen iki doğru çakışır. Katsayılar farklı ölçekte yazılmışsa uzaklık hesabından önce denklemleri aynı ölçeğe getir.",
    ],
    summary: "2x−y±3=0 doğrularının dik uzaklığı |3−(−3)|/√(2²+(−1)²)=6/√5. Dik ayak H(2,4;1,8). Sabitler eşitse uzaklık sıfır.",
    appendSection: true,
  }],
  "ayt-fonksiyonlar": [{
    title: "Parçalı fonksiyonda açık ve dolu ucu ayır",
    figureTitle: "Parçalı fonksiyonda açık ve dolu ucu ayır",
    paragraphs: [
      "Girdinin hangi aralığa ait olduğunu belirle. −2≤x<1 için g(x)=x+2. 1≤x≤3 için g(x)=2x+2. Birinci kuraldan hesaplanan (1,3), x=1 bu aralığın dışında kaldığından açık işaretlenir.",
      "İkinci aralık x=1’i içerir. g(1)=2·1+2=4 ve (1,4) doludur. Aynı düşey doğru sınırda tek dolu noktaya denk gelir. Diğer örnekler: g(0)=2, g(2)=6. Tanım kümesi [−2,3].",
    ],
    summary: "−2≤x<1 için x+2, 1≤x≤3 için 2x+2. x=1 sınırında (1,3) açık, (1,4) dolu, g(1)=4.",
    appendSection: true,
  }],
  "doga-insan-cografya": [{
    title: "Aynı akarsuyu üç farklı soruyla incele",
    figureTitle: "Aynı akarsuyu üç farklı soruyla incele",
    paragraphs: [
      "Önce araştırmacının neyi ölçtüğünü sor. Aylık akım değişimi suya, kıyı bitkilerinin dağılışı canlılara, tarım parsellerinin konumu ekonomik yaşama ilişkin veri ister.",
      "Hepsi aynı akarsuda araştırılabilir. Su akımı için hidrografyayı, bitki dağılışı için biyocoğrafyayı, tarımsal etkinliğin konumu için ekonomik coğrafyayı seç.",
    ],
    summary: "Aynı akarsuda akım → hidrografya, bitki dağılışı → biyocoğrafya, kıyıdaki tarımsal kullanım → ekonomik coğrafya. Alt dalı ölçülecek ilişki belirler.",
    appendSection: true,
  }],
  "felsefeyi-tanima": [{
    title: "Aynı toplamı iki dağıtım ilkesiyle karşılaştır",
    figureTitle: "Aynı toplamı iki dağıtım ilkesiyle karşılaştır",
    paragraphs: [
      "Dört birimi eşit miktarda bölünce iki kişi de ikişer birim alır. İhtiyaçlar 1 ve 3 birim kabul edilip pay buna göre dağıtıldığında A bir, B üç birim alır. İki toplam da 4.",
      "Hangi ölçütün adil sayılacağını tartışırken gerekçe kur. Herkese aynı miktarı vermeyi savunan biri eşit muameleyi, ihtiyaca göre vermeyi savunan biri de ihtiyacın karşılanmasını öne çıkarabilir. Verilen ihtiyaç varsayımı değişirse ikinci dağıtım da değişir.",
    ],
    summary: "Eşit miktar 2+2, varsayılan ihtiyaca göre 1+3. Toplam eşit kaldığı hâlde paylar değişebilir. Ölçütün gerekçesini söyle.",
    appendSection: true,
  }],
  "bilgi-ve-inanc": [{
    title: "Üç kaynak birlikte iş görebilir",
    figureTitle: "Üç kaynak birlikte iş görebilir",
    paragraphs: [],
    summary: "İslam din eğitimi bağlamında salim duyular doğrudan algılama, selim akıl gerekçeli çıkarım, sadık haber güvenilir aktarım sağlar. Metinde sorulan bilginin hangi yolla edinildiğini ara.",
    table: {
      headers: ["Bilgi yolu", "Göstergesi", "Örnek"],
      rows: [
        ["Salim duyular", "Doğrudan gözlem", "Ezan sesini işitmek"],
        ["Selim akıl", "Karşılaştırma ve çıkarım", "İki gözlemi karşılaştırıp ilişki kurmak"],
        ["Sadık haber", "Vahiy veya güvenilir aktarım", "İslam din eğitimi bağlamında vahiy bilgisi"],
      ],
      layout: "table",
    },
  }],
  "ses-bilgisi": [{
    title: "Ünlü düşmesi ile daralma: eksildi mi, değişti mi?",
    figureTitle: "Ünlü düşmesi ile daralma: eksildi mi, değişti mi?",
    paragraphs: [],
    summary: "Başlangıç biçimiyle karşılaştır. Kökte ses eksilirse düşme, a/e dar ünlüye dönerse daralma. Evi sözcüğündeki i ekin kendi sesidir.",
    table: {
      headers: ["Önce", "Sonra", "Kanıt"],
      rows: [
        ["burun + u", "burnu", "Kökteki ikinci u düşer"],
        ["bekle + yor", "bekliyor", "Kökün sonundaki e, i olur"],
        ["ev + i", "evi", "i, ekin kendi ünlüsüdür"],
        ["ben + e", "bana", "Geniş e, geniş a olur"],
      ],
      layout: "table",
    },
  }],
  "tarih-zaman": [{
    title: "Yıl etiketleri ile geçen süreyi ayır",
    figureTitle: "Yıl etiketleri ile geçen süreyi ayır",
    paragraphs: [
      "Geleneksel tarihsel numaralandırmada MÖ 1’in ardından MS 1 gelir. Aynı ay ve gün için MÖ 2’den MS 3’e sırasıyla dört aralık geçilir. Başlangıç ve bitiş etiketlerini birlikte sayınca beş yıl adı yazılır.",
      "Miladın iki tarafında aynı günler arasındaki süre a+b−1 yıl. Aynı tarafta iki yıl numarasının farkı kullanılır. Ay ve gün bilgisi verilmedikçe kesin gün sayısı bulunmaz.",
    ],
    summary: "MÖ 2 → MÖ 1 → MS 1 → MS 2 → MS 3 dizisinde dört aralık, beş etiket var. Süreyi ve iki uç dahil etiket sayısını ayrı hesapla.",
    appendSection: true,
  }],
  "isi-ve-sicaklik": [{
    title: "Isı sığasını enerji grafiğinin eğiminden oku",
    figureTitle: "Isı sığasını enerji grafiğinin eğiminden oku",
    paragraphs: [
      "Isı sığası C=m·c, örneğin tamamını 1 °C ısıtmak için gereken enerjidir. Suyun öz ısısı yaklaşık 4200 J/(kg·°C). 0,2 kg su için C=840 J/°C, 0,3 kg su için C=1260 J/°C.",
      "Düşey Q, yatay ΔT ise eğim Q/ΔT birimi J/°C. 5 °C artış için daha küçük örnek 4200 J, daha büyük örnek 6300 J alır. İki çizgide de aynı madde ve hâl değişimi olmayan aralık kullanılıyor.",
    ],
    summary: "Q–ΔT grafiğinin eğimi C=m·c. 0,2 ve 0,3 kg suda eğimler 840 ve 1260 J/°C. 5 °C için Q=4200 ve 6300 J.",
    appendSection: true,
  }],
  "atomun-temel-tanecikleri": [{
    title: "Grafikte önce eksenleri tabloya çevir",
    figureTitle: "Grafikte önce eksenleri tabloya çevir",
    paragraphs: [
      "Üç noktada elektron sayısı 10. U’da proton sayısı 11, V’de 8, W’de 10. Her satırda yükü proton eksi elektron sayısıyla bul. W eşitlik çizgisinde olduğu için nötrdür.",
      "Nötron sayısı veya kütle numarası için ek veri gerekir. Grafiğin ilk üç adımı aynı koordinat sırasını kullanır. Son adımda eksen adlarının değişmesi U’nun yorumunu değiştirir.",
    ],
    summary: "Yatay p, düşey e iken U(11,10) → +1, V(8,10) → −2, W(10,10) → 0. Aynı e sayısı yüklerin eşit olmasını gerektirmez.",
    table: {
      headers: ["Nokta", "Proton", "Elektron", "Yük"],
      rows: particleCoordinatesSource006.map(({name, p, e}) => [name, String(p), String(e), p > e ? `+${p - e}` : String(p - e).replace("-", "−")]),
      layout: "table",
    },
  }],
  "lipitler": [{
    title: "Fosfolipitte iki farklı uç",
    figureTitle: "Fosfolipitte iki farklı uç",
    paragraphs: [
      "Çizimin son adımında hücrenin iki sulu yüzünü karşılaştır. Üst başlar dış ortama, alt başlar sitoplazmaya bakar. İki yağ asidi kuyruğu ortadaki bölgeye yönelir.",
      "Model tipik gliserofosfolipiti sadeleştirerek gösterir. Baş grupları değişebilir. Çizimdeki molekül adedi ve uzaklıklar temsili.",
    ],
    summary: "Kutuplu başlar iki sulu yüze bakar. Kuyruklar zarın ortasında birbirine döner. İlk adım tek fosfolipit, son adım iki sulu ortamı gösterir.",
  }],
  "enerji-ve-hareket": [{
    title: "Net kuvvet grafiğinden son kinetik enerjiyi bul",
    figureTitle: "Net kuvvet grafiğinden son kinetik enerjiyi bul",
    paragraphs: [
      "Yatay eksen konumu metre, düşey eksen net kuvveti newton cinsinden gösterir. 0–2 m arasında 6 N ile iş 12 J. 2–4 m arasında kuvvet doğrusal olarak sıfıra düştüğünde üçgen alanı 6 J.",
      "4–5 m arasında kuvvet −2 N, iş −2 J. Net iş 12+6−2=16 J ve kinetik enerjideki değişime eşit. Başlangıç 10 J ise son değer 26 J. Eksen altındaki alanı pozitif almak 30 J sonucuna götürür.",
    ],
    summary: "Kuvvet–konum grafiğinde işaretli alanlar 12, 6 ve −2 J. Net iş 16 J. Başlangıç 10 J ise son kinetik enerji 26 J.",
    appendSection: true,
  }],
  "atom-modelleri": [{
    title: "Aynı enerji farkını iki geçiş yolunda karşılaştır",
    figureTitle: "Aynı enerji farkını iki geçiş yolunda karşılaştır",
    paragraphs: [
      "Bu çizimde A=0, B=4 ve C=8 göreli enerji birimi. C’den A’ya tek geçişte 8 birim salınır. C’den B’ye 4, B’den A’ya 4 birim salınır. Ara düzey iki çıkarma işleminde birbirini götürür: (8−4)+(4−0)=8.",
      "Aynı başlangıç ve bitiş toplam enerji farkını belirler. Tek aşamalı ve iki aşamalı geçiş farklı sayıda ışık paketiyle gerçekleşir. Merdiven aralıkları bu öğretim modeline ait. Gerçek bir atoma aynı sayıları atama.",
    ],
    summary: "C→A: bir geçiş, 8 birim. C→B→A: iki geçiş, 4+4=8 birim. Yolu değiştirince geçiş sayısı değişir, toplam fark aynı kalır.",
    appendSection: true,
  }],
  "karbohidratlar": [{
    title: "Glikozun toplam miktarı ile artışını ayır",
    figureTitle: "Glikozun toplam miktarı ile artışını ayır",
    paragraphs: [
      "Bu veriler varsayımsal. Başlangıçta 3 birim glikoz vardı. Dördüncü dakikada toplam 11 birim olduğunda net artış 11−3=8 birim, ortalama hız 8/4=2 birim/dakika.",
      "Dört ile altıncı dakika arasında net değişim 0. Bunun nedeni yalnız bu grafikten belirlenemez. Enzim etkinliği, substrat miktarı ve ölçüm koşulları gibi ek bilgilere ihtiyaç vardır.",
    ],
    summary: "İlk dört dakikada son toplam 11, yeni oluşan net miktar 8, ortalama hız 2 birim/dakika. Son iki dakikada net artış 0.",
    table: {
      headers: ["Zaman (dk)", "Glikoz (birim)"],
      rows: glucoseSource005.map(({ minute, amount }) => [String(minute), String(amount)]),
      layout: "table",
    },
    appendSection: true,
  }],
  "newton": [{
    title: "Yatay ve düşey kuvvetleri ayrı topla",
    figureTitle: "Yatay ve düşey kuvvetleri ayrı topla",
    paragraphs: [
      "Önce hedefi tek seç: 4 kg kutu. İp 18 N sağa, sürtünme 6 N sola, yüzey 40 N yukarı, Dünya 40 N aşağı kuvvet uygular. Sağ ve yukarı pozitif. Hız ve ivme kuvvet oku değildir.",
      "Yatay toplam 18−6=12 N sağa, düşey toplam 40−40=0. Düşey ivme sıfır, yatay ivme 12/4=3 m/s² sağa. Ağırlık ile normal aynı kutuya etki ettiği için bir etki-tepki çifti oluşturmaz.",
    ],
    summary: "Yatay kuvvet 12 N sağa, düşey kuvvet toplamı 0 N. İvme 3 m/s² sağa. Bileşkeyi kuvvet listesine ikinci kez ekleme.",
    appendSection: true,
  }],
  "kimya-guvenlik": [{
    title: "İlk ve son büret okumasının farkını al",
    figureTitle: "İlk ve son büret okumasının farkını al",
    paragraphs: [
      "Bu bürette sayılar yukarıdan aşağıya artar. İki okuma aynı aletten ve aynı ölçekten gelirse 7,5−2,0=5,5 mL verilmiş olur. Son okuma tek başına aktarılan hacmi göstermez.",
      "Su gibi camı ıslatan sıvının yüzeyi çukur görünebilir. Göz hizasını ölçü çizgisiyle eşleştir ve uygun durumda çukurun alt noktasını oku. Sıvı değiştiğinde aynı yüzey biçimini varsayma.",
    ],
    summary: "İlk okuma 2,0 mL ve son okuma 7,5 mL ise fark 5,5 mL. Aynı aletten okunmuş iki ölçek değeri gerekir.",
    appendSection: true,
  }],
  "su-asit-baz-tuz": [{
    title: "Eşit enerjide iki sıvının sıcaklık artışını karşılaştır",
    figureTitle: "Eşit enerjide iki sıvının sıcaklık artışını karşılaştır",
    paragraphs: [
      "Öz ısı, bir gram maddenin sıcaklığını 1 °C değiştirmek için gereken enerjidir. Her sıvı 100 g. A’nın öz ısısı 4, B’ninki 2 J/(g·°C). Isı kaybı ve hâl değişimi yok.",
      "Her birine 800 J verildiğinde ΔT=Q/(m·c). A’da 800/400=2 °C, B’de 800/200=4 °C. Daha büyük öz ısı, aynı kütle ve enerjide daha küçük sıcaklık artışı demektir.",
    ],
    summary: "100 g ve 800 J için A 2 °C, B 4 °C ısınır. Hâl değişimi yoksa ΔT=Q/(m·c). Sıcaklık artışı ile verilen enerjiyi ayır.",
    appendSection: true,
  }],
  "dogrusal-hareket": [{
    title: "Hız sıfırı geçince alanı ayrı hesapla",
    figureTitle: "Hız sıfırı geçince alanı ayrı hesapla",
    paragraphs: [
      "Hız 0–2 s boyunca +4 m/s. Sonraki 3 saniyede hız −2 m/s’ye iniyor. Bu bölümün ivmesi (−2−4)/(5−2)=−2 m/s². Hızın +4’ten sıfıra düşmesi 2 saniye sürer ve yön değişimi t=4 s anındadır.",
      "Yer değiştirmede 0–2, 2–4, 4–5 ve 5–7 saniye alanları sırayla +8, +4, −1 ve −4 m. Toplam +7 m. Yol için alanların büyüklüklerini topla: 17 m. Süre 7 s. Ortalama hız +1 m/s, ortalama sürat yaklaşık 2,43 m/s.",
    ],
    summary: "Dönüş t=4 s. Yer değiştirme +8+4−1−4=+7 m. Yol 8+4+1+4=17 m. Ortalama için ikisini ayrı ayrı 7 saniyeye böl.",
    appendSection: true,
  }],
  "sembolik-dil": [{
    title: "Alt indis, parantez ve katsayının görevi",
    figureTitle: "Alt indis, parantez ve katsayının görevi",
    paragraphs: [
      "Al₂(SO₄)₃ içinde üç sülfat grubu vardır. Her grupta 1 S ve 4 O. Bir formül biriminde 2 Al, 3 S, 12 O bulunur. Baştaki 3 katsayısı bütün bu sayıları üç katına çıkarır. Toplam 51 atom sayılır, element türü sayısı üç kalır.",
    ],
    summary: "Al₂(SO₄)₃: 2 Al, 3 S, 12 O. 3Al₂(SO₄)₃: 6 Al, 9 S, 36 O. Parantez içini çoğalt, sonra dış katsayıyı bütün birime uygula.",
    table: {
      headers: ["Element", "Bir formül birimi", "Üç formül birimi"],
      rows: [["Al", "2", "6"], ["S", "3", "9"], ["O", "12", "36"], ["Toplam", "17", "51"]],
      layout: "table",
    },
  }],
  "mineraller": [{
    title: "Ham miktarı değil, karşılanan gereksinimi karşılaştır",
    figureTitle: "Ham miktarı değil, karşılanan gereksinimi karşılaştır",
    paragraphs: [
      "X gereksinimi 10 mg ve elde 5 mg varsa yarısı karşılanır. Y gereksinimi 1 mg ve elde 0,8 mg varsa %80’i karşılanır. Y’nin ham miktarı daha küçük olsa da bu örnekte X daha yetersizdir.",
      "Y’nin karşılanma yüzdesini değiştir. %50’de iki gereksinim eşit oranda karşılanır. Bu karşılaştırmada diğer etkenler uygun ve model gereksinimleri sabittir.",
    ],
    summary: "5/10=%50 ve 0,8/1=%80. Ham miktarı daha az olanı seçmek yanlış sonuç verir. Karşılanan gereksinim en az olan X sınırlayıcıdır.",
    appendSection: true,
  }],
  "madde-ozkutle": [{
    title: "Eksenler değişince eğimin birimi değişir",
    figureTitle: "Eksenler değişince eğimin birimi değişir",
    paragraphs: [
      "Sabit sıcaklık ve basınçta hacim 10, 20, 30 cm³ iken kütle 20, 40, 60 g. Kütle düşeyse eğim (60−20)/(30−10)=2 g/cm³ olur. Hacim düşeyse eğim (30−10)/(60−20)=0,5 cm³/g. Grafiğin eksenlerini değiştirdin. Maddenin özkütlesi 2 g/cm³ kaldı.",
      "Kap kütlesi ölçüme eklenirse doğru orijinden geçmeyebilir. O durumda bir noktanın değerlerini doğrudan bölmek kabı da hesaba katar. İki nokta arasındaki farkla eğim yine bulunur.",
    ],
    summary: "Kütle düşeydeyse eğim 2 g/cm³. Hacim düşeydeyse 0,5 cm³/g, yani özkütlenin tersi. Doğrunun görünüşü yerine birimi ve iki koordinat farkını oku.",
    appendSection: true,
  }],
  "kimya-disiplinleri": [{
    title: "Bir projede yapılan işi okuyup alanı seç",
    paragraphs: [
      "Aynı ilaç projesi birden çok kimya alanı içerebilir. Her aşamada yapılan işi ayrı oku. Maddenin adından çok incelenen hedef, ölçüm veya karara bak.",
      "Bir enzimin canlıdaki etkisini araştırmak biyokimyaya bağlıdır. Üretilen maddenin saflığını ölçmek analitik kimyaya, sıcaklıkla tepki hızının ilişkisini araştırmak fizikokimyaya bağlıdır.",
    ],
    summary: "Disiplini seçmek için cümledeki işe bak. Sentez, canlı süreç, saflık ölçümü, hıza etki ve üretim ölçeği ayrı görevlerdir.",
    table: {
      headers: ["Aşama", "İş", "Kimya alanı"],
      rows: [
        ["1", "Organik molekül oluşturma", "Organik kimya"],
        ["2", "Enzim etkisini inceleme", "Biyokimya"],
        ["3", "Saflığı ölçme", "Analitik kimya"],
        ["4", "Sıcaklık ile hız ilişkisini inceleme", "Fizikokimya"],
        ["5", "Fabrika ölçeğinde üretim", "Endüstriyel kimya"],
      ],
      layout: "table",
    },
    appendSection: true,
  }],
  "bilimsel-yontem": [{
    title: "Ölçülen en yüksek değer ile veri dışı tahmini ayır",
    figureTitle: "Ölçülen en yüksek değer ile veri dışı tahmini ayır",
    paragraphs: [
      "Bu sayılar varsayımsal öğretim verisidir. Her sıcaklıkta aynı türden 20 tohum için yedinci gün çimlenenler sayılmıştır. Ölçülen en yüksek sayı 25 °C’de 16, oran %80. Sıcaklık artarken 25 °C’den sonra sayı azalır.",
      "40 °C ölçülmediği için kesin bir çimlenme sayısı yazılamaz. Çizginin iki ölçümü birleştirmesi aradaki her sıcaklıkta deney yapıldığı anlamına gelmez. Türün kesin optimumu için daha sık sıcaklıklar ve bağımsız tekrarlar gerekir.",
    ],
    summary: "25 °C’de 16/20 (%80) ölçülen en yüksek değerdir. 40 °C’de sayı bilinmez. Noktalar ölçümü gösterir, onları bağlayan çizgi yeni ölçüm değildir.",
    table: {
      headers: ["Sıcaklık (°C)", "Çimlenen tohum", "Oran"],
      rows: germinationSource002.map(({ temperature, germinated }) =>
        [String(temperature), `${germinated}/${germinationTotal}`, `%${100 * germinated / germinationTotal}`]),
      layout: "table",
    },
    appendSection: true,
  }],
  "fizik-bilimine-giris": [{
    title: "Geri dönüşte yolu ve yer değiştirmeyi ayır",
    figureTitle: "Geri dönüşte yolu ve yer değiştirmeyi ayır",
    paragraphs: [
      "Konum, seçilen başlangıca göre nerede olduğunu söyler. 0’dan 3 m doğuya gidip 3 m batıya dönersen yine 0’dasın. Yol, iki parça uzunluğunun toplamıdır: 6 m. Yer değiştirme, son konum eksi başlangıç konumudur: 0 m.",
      "Doğuyu pozitif seçtiğinde 4 m batıya dönersen son konum −1 m olur ve toplam yol 7 m olur. Ortalamaları çıkarmak için toplam süreyi ayrıca bilmen gerekir. Aynı m/s birimi kullanılsa da ortalama süratin payı yol, ortalama hızın payı yer değiştirmedir.",
    ],
    summary: "3 m doğu, 3 m batı. Alınan yol 6 m. Başlangıca dönüldüğü için yer değiştirme 0 m.",
    appendSection: true,
  }],
  "simyadan-kimyaya": [{
    title: "Kütleyi hangi sistemde ölçtüğünü belirle",
    figureTitle: "Kütleyi hangi sistemde ölçtüğünü belirle",
    paragraphs: [
      "Kapalı kaptaki 12 g A ve 8 g B tek bir ürüne tamamen dönüşüyorsa ürün 20 g olur. Her iki tartımda aynı kabın darası çıkarılır. Çizimde başka bir başlangıç kütlesiyle aynı sistem sınırı kuralını denetle.",
    ],
    summary: "Dara sabitken ve madde çıkışı yokken 12 g + 8 g = 20 g. Gaz çıkarsa yalnız kapta kalan kütle daha az ölçülebilir.",
    table: {
      headers: ["Sistem", "Terazinin kapsadığı", "Çıkarım"],
      rows: [
        ["Kapalı", "Bütün 12 g A ve 8 g B", "Kap hariç ürün 20 g"],
        ["Açık, gaz çıkıyor", "Yalnız içeride kalanlar", "Çıkan gaz dahil toplam madde kütlesi 20 g"],
      ],
      layout: "table",
    },
  }],
  "canli-ozellikleri": [{
    title: "İki farklı sınıflama ekseni",
    figureTitle: "İki farklı sınıflama ekseni",
    paragraphs: [
      "Şema tipik hücre planını gösterir. İnsan alyuvarının olgunlaşırken çekirdeğini ve ribozomlarını kaybetmesi onu prokaryot yapmaz. Örnek hücrenin yapısı ile canlının genel hücre planını ayrı düşün.",
    ],
    summary: "Çekirdek zarının bulunmaması ribozomun yokluğu demek değildir. Ribozom zarsızdır. Maya tek hücreli bir ökaryottur.",
    table: {
      headers: ["Yapı", "Tipik prokaryot", "Tipik ökaryot"],
      rows: [
        ["DNA’nın yeri", "Sitoplazmadaki DNA bölgesi", "Zarla çevrili çekirdek"],
        ["Ribozom", "Var, zarsız", "Var, zarsız"],
        ["Mitokondri", "Yok", "Bu hücre planında bulunabilir"],
      ],
      layout: "table",
    },
  }],
  "temel-kavramlar": [{
    title: "Sayı kümelerinde önce değeri hesapla",
    figureTitle: "Sayı kümelerinde önce değeri hesapla",
    paragraphs: [],
    summary: "ℕ doğallar 0’dan başlar. Bir sayı daha dar bir kümeye giriyorsa onu kapsayan bütün dış kümelere de girer.",
    table: {
      headers: ["İfade", "Değer", "Üye olduğu kümeler"],
      rows: [
        ["0", "0", "ℕ, ℤ, ℚ, ℝ"],
        ["12/3", "4", "ℕ, ℤ, ℚ, ℝ"],
        ["−7/2", "−3,5", "ℚ, ℝ"],
        ["0,333…", "1/3", "ℚ, ℝ"],
        ["√9", "3", "ℕ, ℤ, ℚ, ℝ"],
        ["√2", "İrrasyonel", "ℝ"],
        ["√(−1)", "Gerçek sayı yok", "Hiçbiri"],
        ["1/0", "Tanımsız", "Hiçbiri"],
      ],
      layout: "table",
    },
  }, placeValueSupplement208],
  "tyt-geo-acilar-kaynak-pekitirme-032": [{
    title: "Karşı kenarı ve ona ait yüksekliği eşleştir",
    figureTitle: "Karşı kenarı ve ona ait yüksekliği eşleştir",
    paragraphs: [
      "A açısının karşı kenarı BC ve uzunluğu a’dır. Aynı şekilde b=|CA| ve c=|AB|. A’dan BC’ye inen yükseklik BC’ye diktir. Taban CA seçilirse B’den CA’ya dik inilir.",
      "Bu üçgende BC=4 cm ve ona ait yükseklik 4 cm. CA=5 cm ve ona ait yükseklik 3,2 cm. İki hesaptan da 8 cm² çıkar. Taban ve yükseklik birimleri önce eşitlenir. 1 m=100 cm ise 1 m²=10.000 cm² ve 1 m³=1.000.000 cm³ olur.",
    ],
    summary: "a=|BC|, b=|CA|, c=|AB|. Taban değişince ona dik yüksekliği seç. Aynı üçgende 4·4/2=5·3,2/2=8 cm².",
    appendSection: true,
  }],
  "tyt-mat-permutasyon-kaynak-032": [{
    title: "Birbirinden ayrı kişilere ayrı boşluklar ver",
    figureTitle: "Birbirinden ayrı kişilere ayrı boşluklar ver",
    sheetTitle: "Boşluklar",
    paragraphs: [],
    summary: "Dört sıradan kişi için beş boşluğun üçü seçilir. Her seçimde farklı A, B ve C altı sırada yerleşir. 4!·C(5,3)·3!=1.440.",
  }],
  "tyt-mat-tekrarli-permutasyon-kaynak-033": [{
    title: "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul",
    figureTitle: "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul",
    sheetTitle: "Zorunlu durak",
    paragraphs: [],
    summary: "(0,0) → P(2,1) → (4,3) için 3·6=18 geçen yol. Bütün 35 yoldan bunları çıkarınca 17 yol kalır.",
  }],
  "tyt-mat-kombinasyon-kaynak-034": [{
    title: "Bir üçlü alanla, bir doğru bütün noktalarıyla belirlenir",
    figureTitle: "Bir üçlü alanla, bir doğru bütün noktalarıyla belirlenir",
    sheetTitle: "Üçgen, doğru ve köşegen",
    paragraphs: [],
    summary: "Yalnız dört tanesi doğrusal sekiz nokta için 56−4=52 üçgen, 28−6+1=23 doğru. Aynı doğruyu veren altı çift bir doğruya karşılık gelir.",
  }],
  "tyt-mat-binom-kaynak-035": [{
    title: "Seçim sayısıyla sayısal çarpanı birbirinden ayır",
    sheetTitle: "Pascal ve işaret",
    paragraphs: ["(x+2)³ tablosunda r, 2’yi kaç kez seçtiğini söyler. Katsayıyı bulmak için seçim sayısını 2ʳ ile çarp. Örneğin r=2 için 3·4=12 ve üs 1’dir."],
    summary: "(x+2)³ açılımında seçim sayısı C(3,r), katsayı C(3,r)·2ʳ.",
    table: {
      headers: ["2’yi seçme sayısı r", "Seçim adedi", "x’in üssü", "Katsayı"],
      rows: binomialExample035.terms.map(({ r, choose, exponent, coefficient }) =>
        [String(r), String(choose), String(exponent), String(coefficient)]),
      layout: "table",
    },
  }, {
    title: "Hedef üssü bir denklemle bul",
    figureTitle: "Hedef üssü bir denklemle bul",
    sheetTitle: "Hedef üs",
    paragraphs: [],
  }],
  "tyt-mat-olasilik-kaynak-036": [{
    title: "Yeni bilgi geldiğinde paydayı değiştir",
    figureTitle: "Yeni bilgi geldiğinde paydayı değiştir",
    sheetTitle: "Koşul",
    paragraphs: [],
    summary: "Toplam en az 9 ise 10 eş olasılıklı çift kalır. Bunların dördünde ilk zar 6’dır. Koşullu olasılık 4/10=2/5. Birlikte gerçekleşme 4/36.",
  }],
  "veri-analizi": [{
    title: "Ham ölçümleri eş genişlikli sınıflara ayır",
    figureTitle: "Ham ölçümleri eş genişlikli sınıflara ayır",
    paragraphs: [],
    table: {
      headers: ["Sınıf", "Gözlemler", "Frekans"],
      rows: statisticsSource037Classes.map(({ lower, upper, values }) =>
        [`[${lower}, ${upper})`, values.join(", "), String(values.length)]),
      layout: "table",
    },
  }],
  "koklu-sayilar": [{
    title: "Köklü denklemde önce koşul, sonra kare",
    figureTitle: "Köklü denklemde önce koşul, sonra kare",
    paragraphs: [
      "İkinci çizimde √(x+12)=x için önce x≥0 yaz. Kare alınca x²−x−12=(x−4)(x+3)=0 olur. 4 için √16=4 sağlanır. −3 için √9=3 çıkar ve 3, −3’e eşit değildir.",
    ],
    summary: "√(x+12)=x için x≥0 gerekir. Adaylardan 4 eşitliği sağlar. −3 için √9=3, sağ taraf −3’tür.",
  }],
  "oran-oranti": [{
    title: "Pompa sayısını değiştir, sabit işi koru",
    figureTitle: "Pompa sayısını değiştir, sabit işi koru",
    paragraphs: [
      "Aynı debideki 8 pompa bir işi 15 saatte bitirirse iş 8·15=120 pompa-saattir. 12 pompa için süre 120/12=10 saattir. Pompa sayısı artınca şekildeki genişlik artar, süre kısalır ve alan sabit kalır.",
      "İş de iki katına çıkarsa 240 pompa-saat gerekir. 12 pompa 20 saat çalışır. İlk 10 saatlik sonuç yalnız iş miktarı aynı kaldığında geçerlidir.",
    ],
    summary: "120 pompa-saatlik iş, 12 özdeş pompayla 10 saat sürer. İş iki katına çıkarsa süre 20 saat olur.",
    appendSection: true,
  }],
  "sayi-problemleri": [{
    title: "Kapasite eşitliği birimlerin oranını buldurur",
    figureTitle: "Kapasite eşitliği birimlerin oranını buldurur",
    paragraphs: [
      "Son çizimde 10a+4b=4a+7b olur. İki toplamdan da ortak 4a ve 4b çıkarınca 6a=3b kalır. Bir büyük kutu iki küçük kutu kadar yer kaplar. İki düzeni de denetle. 10+4·2=18 ve 4+7·2=18 küçük kutu yeri.",
    ],
    summary: "10a+4b=4a+7b eşitliğinde ortak terimleri çıkar. 6a=3b ve b=2a. İki düzenin kapasitesi 18 küçük kutu yeridir.",
  }, wordSupplement208],
  "yas-problemleri": [{
    title: "Aynı anda herkes aynı süre yaşlanır",
    figureTitle: "Aynı anda herkes aynı süre yaşlanır",
    paragraphs: [
      "İkinci çizimde Deniz bugün 30 ve Işıl 16 yaşında. Dört yıl sonra 34 ve 20 yaşındalar. Aynı tarihte düşey uzaklık hep 14 yıldır. Yaş oranını hesaplamak için iki yaşı da aynı tarihten oku.",
    ],
    summary: "30−16=14. Dört yıl sonra 34−20=14. Yaş farkı sabit kalırken oran değişir.",
  }],
  "yuzde-problemleri": [{
    title: "Paket fiyatıyla birim fiyat aynı değişken değildir",
    figureTitle: "Paket fiyatıyla birim fiyat aynı değişken değildir",
    paragraphs: [
      "480 g için 240 TL, 400 g için 280 TL ödendiğinde gram fiyatları 0,50 ve 0,70 TL olur. Artış 0,20 TL/g’yi eski 0,50 TL/g’ye bölünce %40 çıkar. 280/240 oranı sadece paket ücretini karşılaştırır. Aynı sonucu kilogram fiyatlarında 500 TL’den 700 TL’ye çıkışla denetle.",
    ],
    summary: "240/480=0,50 ve 280/400=0,70 TL/g. Ölçü birimini eşitle. Birim fiyat artışı %40.",
  }],
  "tyt-geo-paralelkenar-ozel-dortgenler-032": [{
    title: "Orta noktalarla iç kareyi kur",
    figureTitle: "Orta noktalarla iç kareyi kur",
    paragraphs: [
      "Kenarları 8 birim olan karenin ardışık kenar orta noktaları arasındaki yatay ve düşey farklar 4 ve 4’tür. İç karenin kenarı √(4²+4²)=4√2 ve alanı 32 birim² olur. Dış alan 64 birim². Arada kalan dört dik üçgenin her biri 8 birim² olduğundan toplamları da 32’dir.",
      "Bu sonuç, seçilen noktaların kenar orta noktaları olmasına bağlıdır. Çizimde kenarı değiştir ve her yeni ölçüde dış alanın nasıl iki eş yarıya ayrıldığını denetle.",
    ],
    summary: "Dış kenar a ise iç kenar (a/2)√2, iç alan a²/2. Dıştaki dört eş üçgenin toplam alanı da a²/2.",
    appendSection: true,
  }, quadSupplement205],
  "kar-zarar-problemleri": [{
    title: "Sabit gider ve birim katkı başabaşı belirler",
    figureTitle: "Sabit gider ve birim katkı başabaşı belirler",
    paragraphs: [
      "Sabit gider 700 TL, birim maliyet 25 TL ve satış 45 TL ise her ürün 20 TL katkı sağlar. 35 adette başabaş, 36 adette 20 TL kâr olur. En az 100 TL kâr için 20n−700≥100 yaz. İlk uygun tam sayı 40’tır.",
    ],
    summary: "20n−700 için 35 başabaş, 36 ilk kâr. 20n−700≥100 için en az 40 adet.",
  }],
  "tyt-geo-yamuk-deltoid-032": [{
    title: "Deltoidde alanı dört dik üçgenle tamamla",
    figureTitle: "Deltoidde alanı dört dik üçgenle tamamla",
    paragraphs: [
      "BD=24 olduğunda iki yarı da 12’dir. Komşu eş kenar çiftleri 13 ve 20 iken simetri köşegeni 5 ve 16 birimlik parçalara ayrılır. AC=21, alan 21·24/2=252 ve çevre 66 olur. İki üçgenin 60 ve 192 birim² alanlarını toplayarak denetle.",
    ],
    summary: "13 ve 20 yan kenarlar, BD=24. Yarım BD=12’den diğer köşegen parçaları 5 ve 16 çıkar. Alan 252, çevre 66.",
    sheetTitle: "Deltoid",
  }, trapezoidSupplement205],
  "faiz-problemleri": [{
    title: "Ayı ve günü oranla aynı döneme çevir",
    figureTitle: "Ayı ve günü oranla aynı döneme çevir",
    paragraphs: [
      "2.400 TL için yıllık %15 basit faiz 360 TL, aylık faiz 30 TL olur. Sekiz ay 8/12 yıl olduğundan faiz 360·8/12=240 TL ve son tutar 2.640 TL. On iki aydaki 360 TL ile karşılaştırarak faiz ile son tutarı ayır.",
    ],
    summary: "2.400 TL ve yıllık %15. 8 ay = 8/12 yıl. Faiz 240 TL, son tutar 2.640 TL. Yatırılan 2.400 TL faiz hesabına temel tutardır.",
  }],
  "tyt-geo-cember-aci-040": [{
    title: "Kirişin iki tarafında görülen yay değişir",
    figureTitle: "Kirişin iki tarafında görülen yay değişir",
    paragraphs: [
      "Küçük AB yayı 100° iken C büyük yaydaysa C’yi içermeyen 100°’lik yay açı hesabına girer. ACB=50°. D küçük yaydaysa gördüğü yay 360°−100°=260° olur. ADB=130° ve iki açı toplamı 180°.",
    ],
    summary: "Aynı AB kirişinin farklı tarafındaki C ve D için 100° ve 260° görülür. Çevre açılar 50° ve 130°.",
    appendSection: true,
  }, {
    title: "Kiriş ve teğette hipotenüsü ayır",
    figureTitle: "Kiriş ve teğette hipotenüsü ayır",
    paragraphs: [
      "Yarıçap 13, kirişin merkeze uzaklığı 5 ise yarım kiriş √(169−25)=12, tam kiriş 24 olur. Dış nokta merkezden 17 birim uzaktaysa teğet √(289−169)=√120=2√30 olur.",
      "İlk dik üçgende 13 birimlik yarıçap hipotenüstür. İkincide 17 birimlik merkez-dış nokta uzaklığı hipotenüstür. Çizimde dik açının karşısındaki kenarı bul.",
    ],
    summary: "r=13, d=5 için kiriş 24. OP=17 için teğet √120=2√30. Dik açı hipotenüsü belirler.",
    appendSection: true,
  }, circleAngleSupplement206],
  "karisim-problemleri": [{
    title: "Karışırken şeker ve su kütlesini ayrı topla",
    figureTitle: "Karışırken şeker ve su kütlesini ayrı topla",
    paragraphs: [
      "120 g ve %20 için şeker 24 g, su 96 g. 80 g ve %40 için şeker 32 g, su 48 g. Şeker toplamı 56 g, karışım toplamı 200 g. Son oran 56/200=%28. Suyu ayrı toplarsan 144 g bulursun ve 56+144=200 ile toplamı denetlersin.",
    ],
    summary: "120 g %20 ile 80 g %40 birleşirse 56 g şeker ve 144 g su olur. Oran 56/200=%28.",
    appendSection: true,
  }],
  "isci-problemleri": [{
    title: "İş payı grafiğinde eğimleri topla",
    figureTitle: "İş payı grafiğinde eğimleri topla",
    paragraphs: [
      "A tek 12, B tek 18 saatte bitiriyorsa bir saatte sırasıyla 3/36 ve 2/36 iş yaparlar. Birlikte eğim 5/36 iş/saat. Bir iş için 36/5=7,2 saat gerekir. Onluk kesir 0,2 saati 60 ile çarpınca 12 dakika. A %60, B %40 iş yapar.",
    ],
    summary: "1/12+1/18=5/36 iş/saat. Bir iş 7 saat 12 dakika. Grafiğin düşey ekseni biten işin payı.",
    appendSection: true,
  }],
  "tyt-geo-daire-040": [{
    title: "Daire parçası: dilimden üçgeni çıkar",
    figureTitle: "Daire parçası: dilimden üçgeni çıkar",
    paragraphs: [
      "Yarıçap 6 ve merkez açı 60° ise dilim 36π·60/360=6π birim². İki yarıçap ve kirişin kurduğu üçgen eşkenar olduğundan alanı 6²√3/4=9√3 birim². Aradaki küçük parça 6π−9√3≈3,26 birim².",
      "Sınır çizgileri kiriş ve yaydır. Büyük parçayı istiyorsan küçük parçayı bütün dairenin alanından çıkar.",
    ],
    summary: "r=6 ve α=60° için dilim 6π, üçgen 9√3, küçük parça 6π−9√3 birim².",
    sheetTitle: "Halka ve parça",
  }, sectorSupplement203],
  "havuz-problemleri": [{
    title: "Gecikmiş açılış yeni evre başlatır",
    figureTitle: "Gecikmiş açılış yeni evre başlatır",
    paragraphs: [
      "A tek başına bir tankı 10 saatte doldurur. B 15 saatte doldurur ve iki saat sonra açılır. İlk iki saatte A 1/5 doldurur. Kalan 4/5, birlikte hız 1/6 ile 4,8 saatte dolar. Baştan sona 6,8 saat, yani 6 saat 48 dakika geçer.",
    ],
    summary: "İlk 2 saatte A 1/5 tank doldurur. Sonraki 4,8 saatte birlikte 4/5 tank doldurulur. Toplam 6,8 saat.",
    workedStep: { title: "Gecikmeli giriş", index: 2 },
  }],
  "noktanin-analitigi": [{
    title: "Oranla bölünen noktanın yönünü denetle",
    figureTitle: "Oranla bölünen noktanın yönünü denetle",
    paragraphs: [
      "A(−2; 1), B(7; 7) ve AP:PB=1:2. A’dan B’ye değişim (9; 6). P’ye ulaşmak için bunun üçte birini, (3; 2)’yi al. A’ya ekleyince P(1; 3) çıkar. P’den B’ye (6; 4) kaldığı için oran 1:2.",
      "P, A’ya daha yakınsa ağırlıklı ortalamada A’nın katsayısı daha büyük çıkar. Çizimi değiştirip bu yönü denetle.",
    ],
    summary: "AP:PB=1:2 için P=A+(B−A)/3. (−2; 1)+(3; 2)=(1; 3).",
    appendSection: true,
  }],
  "hiz-problemleri": [{
    title: "Grafik ile çözümü geri denetle",
    figureTitle: "Grafik ile çözümü geri denetle",
    paragraphs: [
      "A, 20 km’den +40 km/sa ile, B, 140 km’den −20 km/sa işaretli hızla ilerliyor. 20+40t=140−20t olduğunda 60t=120 ve t=2 saat. Her iki denklem 100 km verir. Grafikte eğim yönü, kesişim aynı konumu ve zamanı gösterir.",
    ],
    summary: "20+40t=140−20t, t=2 saat ve konum 100 km. Bir konumun azalması negatif yönü gösterir.",
  }],
  "tyt-geo-dik-prizmalar-032": [{
    title: "Altıgen tabandan prizmanın en uzun köşegenine",
    figureTitle: "Altıgen tabandan prizmanın en uzun köşegenine",
    paragraphs: [
      "Taban kenarı 4 cm ve dik yükseklik 9 cm. Taban alanı 24√3 cm², yan alan 6·4·9=216 cm², iki tabanla toplam 216+48√3 cm². Hacim 216√3 cm³.",
      "Düzgün altıgenin karşıt köşeleri arasındaki uzaklık 8 cm. Bu uzunlukla 9 cm dik yüksekliği Pisagor’da birleştir. En uzun cisim köşegeni √(64+81)=√145 cm.",
    ],
    summary: "a=4 ve h=9 için taban 24√3, yan alan 216, hacim 216√3. Cisim köşegeni √145 cm.",
    appendSection: true,
  }, {
    title: "Küp bölünürken toplam yüzey nasıl değişir?",
    figureTitle: "Küp bölünürken toplam yüzey nasıl değişir?",
    paragraphs: [
      "Kayıpsız eritmede 6 cm’lik küpün hacmi 216 cm³ kalır. 2 cm’lik küçük küplerin her biri 8 cm³ olduğundan 27 küp çıkar. Eski yüzey 216 cm², küçüklerin yüzeyleri toplamı 27·24=648 cm². Küçük küpler ayrılınca aradaki temas yüzleri açığa çıkar.",
      "Her ayrıt n eş parçaya ayrılıyorsa n³ küp çıkar. Her küçük küpün yüzeyi 1/n² kadar olduğu için toplam yüzey n katına çıkar.",
    ],
    summary: "6 cm’den 2 cm’ye. Hacim 216 cm³ kalır. 27 küçük küpün yüzeyleri toplamı 648 cm².",
    appendSection: true,
  }, prismSupplement206],
  "grafik-problemleri": [{
    title: "Çizgi grafiğinde değişim ile değişim hızı ayrıdır",
    figureTitle: "Çizgi grafiğinde değişim ile değişim hızı ayrıdır",
    paragraphs: [
      "Depo 0, 2, 5. saatlerde 20, 32, 26 L. İlk eğim 12/2=6 L/saat. İkinci eğim −6/3=−2 L/saat. 4. saatte ikinci aralıkta 2 saat geçtiği için 32−4=28 L.",
      "Bütün aralığı başlangıç ve son noktadan ölç. (26−20)/5=1,2 L/saat. Aynı değeri eğimleri kendi süreleriyle ağırlıklandırarak (2·6+3·(−2))/5 ile denetle.",
    ],
    summary: "İlk eğim +6, ikinci −2 L/saat. 4. saatte 28 L. Bütün aralık 6/5=1,2 L/saat.",
  }],
  "carpanlara-ayirma": [{
    title: "x² yerine u yazarak dört kökü bul",
    figureTitle: "x² yerine u yazarak dört kökü bul",
    paragraphs: [
      "x⁴−5x²+4 ifadesinde u=x² yazınca (u−1)(u−4) elde edilir. u=1 veya u=4. x²=1 iki işaretli kök −1 ve 1, x²=4 ise −2 ve 2 verir. Grafiğin yatay ekseni bu dört noktada kesilir.",
      "u bir gerçek sayının karesiyse u≥0 olmalıdır. Yerine koyma adımı, negatif u değerini gerçek x kökü diye yazmayı önler.",
    ],
    summary: "u=x² için (u−1)(u−4)=0. x²=1 veya x²=4. Kökler −2, −1, 1 ve 2.",
    appendSection: true,
  }],
  "tyt-geo-silindir-koni-kure-040": [{
    title: "Kâğıdı iki yönde sar ve hacimleri karşılaştır",
    figureTitle: "Kâğıdı iki yönde sar ve hacimleri karşılaştır",
    paragraphs: [
      "12π×8 dikdörtgende uzun kenar çevre olursa r=6 ve h=8. Hacim π·36·8=288π. Kısa kenar çevre olursa r=4/π ve h=12π. Hacim 192. Oran 288π/192=3π/2.",
      "Her iki durumda yan alan 96π olur. Tabanların yarıçapı değiştiği için hacim ve kapalı yüzey alanı farklı çıkar. Tabanlar ayrıca eklenir.",
    ],
    summary: "12π×8 dikdörtgenin iki sarımı 288π ve 192 cm³ verir. Oran 3π/2, yan alan her ikisinde 96π cm².",
    appendSection: true,
  }, {
    title: "Daire diliminden koninin tabanını bul",
    figureTitle: "Daire diliminden koninin tabanını bul",
    paragraphs: [
      "Yarıçapı 10 cm olan 216° daire diliminin yayı 12π cm. Birleştirildiğinde o yay koninin taban çevresidir. 2πr=12π ile r=6 cm. 10 cm anadoğru ve 6 cm yarıçap için dik yükseklik √(100−36)=8 cm. Hacim 96π cm³.",
    ],
    summary: "216° dilimin yayı 12π. Koni r=6, h=8, anadoğru 10 ve hacim 96π cm³.",
    appendSection: true,
  }, {
    title: "Kürenin yarıçapını kesitten geri kur",
    figureTitle: "Kürenin yarıçapını kesitten geri kur",
    paragraphs: [
      "Kesit alanı 144π ise kesit dairesinin yarıçapı a=12 birim. Düzlemin merkeze uzaklığı d=5. R²=a²+d²=144+25=169 ile kürenin yarıçapı 13'tür. Hacim 4π·13³/3=8788π/3 birim³.",
    ],
    summary: "Kesit alanı 144π ve uzaklık 5 ise a=12 ve R=13. Küre hacmi 8788π/3 birim³.",
    appendSection: true,
  }, solidSupplement206],
  "kartezyen-carpim": [{
    title: "Koordinat gösterimi ayrık noktaların kümesidir",
    figureTitle: "Koordinat gösterimi ayrık noktaların kümesidir",
    paragraphs: [
      "A={1,2}, B={1,2,3} için altı ikili vardır. C={2}, D={2,3} için yalnız (2;2) ve (2;3) çıkar. (2;1) kalır, çünkü ikinci bileşen 1, D’de bulunmaz. Bir ikiliyi çıkarmak için iki üyelik birlikte sağlanmalıdır.",
    ],
    summary: "Altı A×B ikilisinden (2;2) ve (2;3) çıkar. Dört ikili kalır. (2;1) kalır.",
  }],
  "mantik-onerme": [{
    title: "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır",
    figureTitle: "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır",
    paragraphs: [],
  }, {
    title: "Koşullu önermenin dört biçimini ayır",
    tableLayout: "table",
    paragraphs: [],
  }],
  "kumeler": [{
    title: "Üç kümenin ayrık bölgelerini içten dışa doldur",
    figureTitle: "Üç kümenin ayrık bölgelerini içten dışa doldur",
    paragraphs: [
      "50 kişinin A, B, C gruplarında 25, 20, 18 kayıt var. İkili kesişimler 10, 8, 7 ve üçlü kesişim 3. Üçlüdeki 3 kişiyi ikililerden birer kez çıkar. Tam iki grupta 7+5+4=16 kişi kalır.",
      "Yalnız A 10, yalnız B 6, yalnız C 6. Birleşim 10+6+6+16+3=41. Hiçbir grupta 50−41=9 kişi. Venn’de bölge boyu yerine içindeki sayıyı oku.",
    ],
    summary: "Üçlü 3. Tam iki 16. Yalnız A, B, C sırasıyla 10, 6 ve 6. Birleşim 41, dışarıda 9.",
    appendSection: true,
  }],
  "tyt-geo-piramitler-032": [{
    title: "Altıgen piramitte üç uzunluğun uçlarını karşılaştır",
    figureTitle: "Altıgen piramitte üç uzunluğun uçlarını karşılaştır",
    paragraphs: [
      "Düzgün altıgende kenar 2 cm, iç yarıçap √3 cm ve merkezin bir köşeye uzaklığı 2 cm. Tepe taban merkezinin 3 cm üzerindedir. Taban kenarının ortasına giden yüz yüksekliği √(9+3)=2√3 cm. Bir köşeye giden yan ayrıt √(9+4)=√13 cm.",
      "Taban alanı 6√3 cm². Altı yan üçgen toplam 12√3 cm², kapalı toplam 18√3 cm². Hacim için dik yükseklik kullanılır: 6√3·3/3=6√3 cm³.",
    ],
    summary: "a=2 ve h=3 için iç yarıçap √3, yüz yüksekliği 2√3, yan ayrıt √13. Toplam alan 18√3 cm², hacim 6√3 cm³.",
    appendSection: true,
  }, pyramidSupplement206],
  "kesir-problemleri": [{
    title: "Kalanın kesri yeni bir taban kullanır",
    figureTitle: "Kalanın kesri yeni bir taban kullanır",
    paragraphs: [
      "120 birimde önce 30 kullan ve 90 bırak. Kalanın 1/3’ü 30 birimdir ve 60 kalır. İkinci kesir ilk bütünün 1/3’ü olsaydı 40 kullanılır, 50 kalırdı. İki şeritte aynı sayıda eş parça var. İkinci kullanımın hangi bütüne ait olduğuna bak.",
    ],
    summary: "120’den önce 1/4, sonra ara kalanın 1/3’ü alınırsa 60 kalır. İki kesir de ilk bütüne aitse 50 kalır.",
  }, chainSupplement208],
};
