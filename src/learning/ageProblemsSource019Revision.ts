import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const ageProblemsSource019Summary =
  "Aurelia 019 Yaş Problemleri, içerik 1.1 (19 Kasım 2026), PDF s. 1–14. MEBİ TYT Matematik Konu Özeti, basılı s. 49 (PDF s. 51). MEBİ TYT Matematik Tarama Testi 9, basılı s. 50–51 kaynaklı özgün çalışma örnekleri. Geçmiş sınavlardan öğren bölümünde 2023 TYT Temel Matematik 26 ve 2026 TYT Temel Matematik 21 bulunur.";

const titles = {
  calendar: "Takvimde girilen yaş ile tamamlanan yaşı ayır",
  group: "Kişi listesi değişince eksik bilgiyi göster",
  target: "Bugünkü hedefi ve her tarih sütununu sabitle",
  birth: "İki doğum yılı değişikliğini ayrı uygula",
  bounds: "Yaş sırasını iki kesin eşitsizlikle kur",
  firstMethods: "Fark, toplam ve ortalama için aynı zamanı kullan",
  lastMethods: "Oranı, hedef yaşı ve takvim sınırını denetle",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Yöntemin durduğu yer",
  "Başka bir kullanım",
];

export const ageProblemsSource019Sections: GuideSection[] = [
  {
    title: titles.calendar,
    paragraphs: [
      "Doğum yılı D ve bakılan yıl Y ise Y−D o yıl girilen yaştır. Bakılan tarih doğumdan önceyse yaş henüz tanımlı değildir. Sonraki bir gün için tamamlanan yaş sorulduğunda ay ve güne de bak. O yıl doğum gününden önce Y−D−1, doğum günü geldiğinde veya geçince Y−D tamamlanmıştır.",
      "18 Ağustos 2011 doğumlu biri 2 Şubat 2026’da 14 yaşındadır. 18 Ağustos 2026’da 15 yaşını tamamlar. Soruda yalnız 2011 doğum yılı verilseydi 2026’da 15 yaşına gireceği söylenebilirdi. 2 Şubat’taki yaşını kesinleştirmek için doğum günü bilgisi gerekirdi.",
    ],
  },
  {
    title: titles.group,
    paragraphs: [
      "Bugünkü toplamı S olan n kişinin t yıl sonraki kendi toplamı S+nt olur. Bu tarihte yaşı z olan bir kişi katılırsa yeni ortalama (S+nt+z)/(n+1) olur. Yaşı verilmeden yalnız kişinin katıldığını bilmek, ortalamayı tek değer olarak belirlemez.",
      "Üç kişinin bugünkü yaş toplamı 51 ise iki yıl sonra kendi toplamları 57’dir. Katılanın o andaki yaşı 15 ise yeni ortalama 18, 23 ise 20 olur. İki değer de mevcut bilgilerle uyumludur. Kişi ayrılıyorsa da o tarihteki yaşını toplamdan çıkar ve kişi sayısını güncelle.",
    ],
  },
  {
    title: titles.target,
    paragraphs: [
      "Birinin bugünkü yaşı başka bir tarihin hedefi olarak verildiyse o değeri değişmeden yaz. Sonra her ifadede hangi kişilerin gerektiğini kontrol et. Bir eski sütunda yalnız A’nın yaşını soran bir koşul varsa B’nin o tarihte henüz doğmamış olması, bu koşulu bozmaz.",
      "Örneğin 9 yıl önce A ve B’nin yaş toplamı A’nın bugünkü yaşına, 22 yıl önce A’nın yaşı B’nin bugünkü yaşına eşit olsun. Bugünkü yaşlar a ve b için (a−9)+(b−9)=a ve a−22=b. İlk denklem b=18, ikincisi a=40 verir. Dokuz yıl önce 31+9=40. Yirmi iki yıl önce A 18 yaşındadır ve bu koşul B’nin geçmiş yaşını kullanmaz.",
    ],
    table: {
      headers: ["Kişi", "Bugün", "9 yıl önce", "22 yıl önce"],
      rows: [
        ["A", "40", "31", "18"],
        [
          "B",
          "18",
          "9",
          "Henüz doğmamış. Bu koşulda B’nin geçmiş yaşı kullanılmaz.",
        ],
      ],
    },
  },
  {
    title: titles.birth,
    paragraphs: [
      "Birinin doğum yılı değişseydi sorusunda bakılan tarihi sabit tut. Doğum yılı d yıl erkene çekilirse kişi bugüne d yıl daha yaşlı ulaşır. Doğum yılı d yıl sonraya alınırsa d yıl daha genç olur. İki kişinin varsayımları ters yöndeyse işaretleri ayrı yaz.",
      "Bugün yaşlar 2k ve 3k ise ilk kişinin 4 yıl erken, ikinci kişinin 1 yıl geç doğması aynı bugünde 2k+4 ve 3k−1 yaşlarını verir. Varsayımsal oranı bu iki ifadeyle kur. Bugünkü yaşlar sorulursa k’yı bulduktan sonra 2k ve 3k’ya dön. Varsayımsal yaşların negatif olmamasını ve oran paydasının sıfır olmamasını denetle.",
    ],
  },
  {
    title: titles.bounds,
    paragraphs: [
      "Bir yaşın ikinci yaşın altında ve üçüncü yaşın üstünde olduğu söyleniyorsa iki ayrı kesin eşitsizlik yaz. Örneğin yaşlar 3y+1, y+7 ve y+4 olsun. İkinci birinciden büyükse y<3. Birinci üçüncüden büyükse 2y>3.",
      "y pozitif tam sayıysa iki koşulun kesişimindeki tek değer 2’dir. Yaşlar 7, 9 ve 6 olur. 9>7>6 kontrolü her iki ilişkiyi de sağlar. Sınır değer eşitlik yapıyorsa ‘büyük’ veya ‘küçük’ koşulunda kabul edilmez. Negatif yaş ya da tek bir koşulu sağlayan aday da elenir.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "Önce yaşların aynı tarihe ait olup olmadığını ve toplamda kimlerin bulunduğunu yaz. Sonra farkı, toplamı veya ortalamayı seç.",
    ],
    table: {
      headers,
      rows: [
        [
          "Yaş farkını aynı tarihte kullan",
          "25 ve 19 yaş arasındaki fark 6. Dört yıl sonra 29−23 yine 6.",
          "25’e 4, 19’a 2 eklenirse farklı tarihler arasındaki fark 8 çıkar.",
          "15 ve 8 yıllık iki tesis aynı 3 yıl sonra 18 ve 11 yıllıktır, fark yine 7.",
        ],
        [
          "Üyelik sabitse toplamı kaydır",
          "3 kişi bugün toplam 63. Dört yıl sonra toplam 75, ortalama 25.",
          "O tarihte yaşı z olan biri katılırsa yeni ortalama (75+z)/4 olur.",
          "Sabit dört cihazın kullanım yılı toplamı 36 ise iki yıl sonra 44 olur.",
        ],
        [
          "Toplam ve farkı aynı tarihe taşı",
          "Aynı tarihte toplam 63 ve fark 9 ise yaşlar 36 ve 27’dir.",
          "Bugünkü toplam 63, büyük yaş üç yıl önce 36 ise bugünkü yaşlar 39 ve 24’tür.",
          "İki yıl önce iki makinenin süre toplamı 42, fark 8 ise o gün 25 ve 17, bugün 27 ve 19’dur.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Oranı kurarken kişi ve tarihi, hedefi izlerken o yaşın sabit değerini, aday bulurken sınırın dahil olup olmadığını belirt.",
    ],
    table: {
      headers,
      rows: [
        [
          "Oranın iki hücresini belirt",
          "Bugün 15 ve 35 yaşın oranı 3:7. Beş yıl sonra 20:40=1:2.",
          "Bugünkü 15 ile gelecekteki 40 karşılaştırılıyorsa oran 3:8 olur.",
          "9 ve 15 yıllık iki bitkinin süre oranı 3:5, üç yıl sonra 12:18=2:3.",
        ],
        [
          "Hedef yaşı sabit tut",
          "A=26, B=19. A, B’nin bugünkü yaşında 7 yıl önceydi. O tarihte B=12.",
          "İkisine aynı süreyi ekleyince fark 7 kalır. Aynı anda eşit yaşa gelemezler.",
          "6 ve 10 yıllık iki cihazdan genç olan 10 yıllık olduğunda eski cihaz 14 yıllıktır.",
        ],
        [
          "Takvim gününü ve tam sayı sınırını denetle",
          "11 Ekim 2010 doğumlu biri 2025’te 15 yaşına girer. 5<n<7 için tek tam sayı 6’dır.",
          "1 Ocak 2025’te bu kişi 14 yaşında. Eşitsizliğin uçları 5 ve 7 alınmaz.",
          "2010’da açılan tesis 2025 açılış yıldönümünde 15 yılı tamamlar.",
        ],
      ],
    },
  },
];

export const ageProblemsSource019SheetText = new Map<string, string[]>([
  [
    titles.calendar,
    [
      "Y−D o yıl girilen yaştır. Tamamlanan yaş için doğum gününden önce 1 çıkar. Doğum günü gelmişse çıkarma.",
    ],
  ],
  [
    titles.group,
    [
      "Sabit grup ortalaması t yıl artar. O tarihte z yaşında biri katılırsa (S+nt+z)/(n+1) kullan. z bilinmeden tek ortalama çıkmaz.",
    ],
  ],
  [
    titles.target,
    [
      "Bugünkü hedef yaş değişmez. Her tarihe ayrı t yaz. Yalnız bir kişinin yaşına ihtiyaç varsa o sütunda ikinci kişinin doğmuş olması gerekmez.",
    ],
  ],
  [
    titles.birth,
    [
      "Bakılan gün sabitken doğum daha erken ise yaş artar, daha geç ise azalır. İki varsayımı ayrı yaz. Sorulan bugünkü yaşa geri dön.",
    ],
  ],
  [
    titles.bounds,
    [
      "En büyük > orta > en küçük. İki kesin eşitsizliği çöz. Kesişimde yalnız uygun tam sayıları kullan ve yerine koy.",
    ],
  ],
  [
    titles.firstMethods,
    ["Fark, toplam ve ortalama için tarih ve kişi listesini önce yaz."],
  ],
  [
    titles.lastMethods,
    [
      "Oran sırası, sabit hedef yaşı, doğum günü ve sınır işareti sonucu değiştirir.",
    ],
  ],
]);

export const ageProblemsSource019Examples: WorkedExample[] = [
  {
    title: "MEBİ ile çalışma · Aynı günde iki doğum varsayımı",
    prompt:
      "Bugünkü yaşları 2:3 oranındaki iki kişiden ilk kişi dört yıl daha erken doğmuş olsaydı, ikincisi ise bir yıl daha geç doğmuş olsaydı bugünkü yaş oranları 3:4 olurdu. İlk kişinin gerçek bugünkü yaşı kaçtır?",
    strategy:
      "Bugünkü oran için ortak k kullan. Doğum yılı kaymalarını ayrı işaretle ve bugünkü tarihi değiştirme.",
    steps: [
      {
        label: "Bugünkü yaşlar",
        explanation: "2:3 oranından 2k ve 3k yazılır.",
      },
      {
        label: "Doğum varsayımları",
        explanation:
          "İlk doğum dört yıl erkene, ikinci doğum bir yıl sonraya gider.",
        expression: "2k+4 ve 3k−1",
      },
      {
        label: "Yeni oran",
        explanation: "İki varsayımsal yaşı karşılaştır.",
        expression: "4(2k+4)=3(3k−1) ⇒ k=19",
      },
      {
        label: "Gerçek yaş",
        explanation: "Sorulan gerçek yaşa dön.",
        expression: "2k=38",
      },
    ],
    answer: "İlk kişinin gerçek bugünkü yaşı 38.",
    check: "Bugünkü yaşlar 38 ve 57. Varsayımsal yaşlar 42 ve 56, oran 3:4.",
    pitfall:
      "İki kişinin yaşını da aynı yönde kaydırmak veya varsayımsal 42’yi gerçek yaş saymak.",
  },
  {
    title: "MEBİ ile çalışma · Yaş sırasının iki sınırı",
    prompt:
      "Üç kişinin yaşı sırasıyla 3y+1, y+7 ve y+4. İkinci kişi birinciden, birinci de üçüncüden büyüktür. y pozitif tam sayı olduğuna göre yaşların toplamı nedir?",
    strategy:
      "İki komşu yaş ilişkisinden y’nin alabileceği tam sayıları çıkar.",
    steps: [
      {
        label: "İlk karşılaştırma",
        explanation: "İkinci yaş birinciden büyüktür.",
        expression: "y+7>3y+1 ⇒ y<3",
      },
      {
        label: "İkinci karşılaştırma",
        explanation: "Birinci yaş üçüncüden büyüktür.",
        expression: "3y+1>y+4 ⇒ y>3/2",
      },
      {
        label: "Birlikte denetle",
        explanation: "Tek tam sayı 2. Üç yaş 7, 9 ve 6’dır.",
        expression: "7+9+6=22",
      },
    ],
    answer: "Yaşların toplamı 22.",
    check:
      "9>7>6. y=1, birinci ile üçüncünün sırasını bozar. y=3 ikincide eşitlik oluşturur.",
    pitfall:
      "Yalnız en büyük yaşı karşılaştırıp birinci ile üçüncünün sırasını atlamak.",
  },
];

export const ageProblemsSource019Recall = [
  {
    prompt:
      "Üç kişinin gelecekteki toplamı 57 ve o gün yaşı z olan biri katılıyor. Neden sabit ortalama çıkmaz?",
    answer: "Yeni ortalama (57+z)/4’tür. z belirtilmeden tek değer bulunamaz.",
  },
  {
    prompt:
      "A’nın geçmiş yaşını kullanan bir koşulda B henüz doğmamışsa neyi kontrol edersin?",
    answer:
      "Koşul yalnız A’nın o tarihteki yaşını istiyorsa B’nin geçmiş yaşı gerekmez. İki kişinin toplamı isteniyorsa ikisi de o tarihte doğmuş olmalıdır.",
  },
  {
    prompt: "x>7 ile x≥7 için ilk izinli tam sayı nedir?",
    answer: "x>7 için 8, x≥7 için 7. Eşitlik işaretinin olup olmadığına bak.",
  },
];

type PracticeInput = {
  key: string;
  prompt: string;
  options: [string, string, string, string, string];
  answer: number;
  hint: string;
  guidance: QuestionGuidance;
};

function practice({
  key,
  prompt,
  options,
  answer,
  hint,
  guidance,
}: PracticeInput): Question {
  return {
    id: `yas-problemleri-019-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Yaş Problemleri",
    guidance,
  };
}

export const ageProblemsSource019Practice = [
  practice({
    key: "tamamlanan-ve-girilen-yas",
    prompt:
      "21 Eylül 2012’de doğan birinin 5 Haziran 2027’de tamamladığı yaşı ve 2027’de gireceği yaşı sırasıyla kaçtır?",
    options: ["15 ve 15", "15 ve 16", "14 ve 15", "14 ve 14", "13 ve 15"],
    answer: 2,
    hint: "Önce yıl farkını bul. Sonra 5 Haziran’ın yıl içindeki doğum gününden önce mi sonra mı olduğuna bak.",
    guidance: {
      knowledge: [
        "Yıl farkı o yıl girilen yaştır. Yıl içindeki doğum gününden önce tamamlanan yaş bir küçüktür.",
      ],
      strategy: "Yıl farkını ve Haziran/Eylül sırasını ayrı kontrol et.",
      steps: [
        "2027−2012=15. Kişi 2027’de 15 yaşına girer.",
        "5 Haziran, 21 Eylül’den öncedir. Bu tarihte 14 yaşı tamamlamıştır.",
      ],
      optionReasons: [
        "Doğum günü Haziran’da henüz gelmemiştir.",
        "16 yaşına 2028’de girer.",
        "Haziran’da 14, Eylül’de 15 yaşını tamamlar.",
        "2027’deki doğum günü gelince yaş 15 olacaktır.",
        "2026 doğum gününde 14 yaşını zaten tamamlamıştır.",
      ],
      commonError: "Yılları çıkardıktan sonra ay ve günü kontrol etmemek.",
      check:
        "21 Eylül 2026’da 14, 21 Eylül 2027’de 15. 5 Haziran 2027 bu iki tarih arasındadır.",
    },
  }),
  practice({
    key: "yeni-uye-yetersiz-veri",
    prompt:
      "Dört kişilik bir ekibin bugünkü yaş toplamı 76. Üç yıl sonra beşinci bir kişi ekibe katılacak. Katılanın o tarihteki yaşı verilmemiştir. Yeni ekibin yaş ortalaması için hangi ifade doğrudur?",
    options: [
      "22’dir, çünkü herkes üç yıl yaşlanır.",
      "88/5’tir.",
      "19’dur, çünkü aynı ekipten söz ediliyor.",
      "23’tür, çünkü bir kişi daha var.",
      "Katılan z yaşındaysa (88+z)/5’tir. Tek değer bulunamaz.",
    ],
    answer: 4,
    hint: "Eski dört kişiyi önce üç yıl ilerlet. Beşinci kişinin yaşına ayrı bir harf ver.",
    guidance: {
      knowledge: [
        "Sabit grupta yaş toplamı kişi sayısı ile geçen yılın çarpımı kadar artar. Üye eklendiğinde yeni üyenin yaşı toplamı etkiler.",
      ],
      strategy:
        "Dört kişinin gelecekteki toplamını bul, katılanın yaşını ekle ve beşe böl.",
      steps: [
        "Eski dört kişi üç yıl sonra 76+4·3=88 yaş toplamına ulaşır.",
        "Yeni kişi z yaşındaysa yeni ortalama (88+z)/5’tir.",
        "Yaş belirtilmediği için sonuç tek değer değildir.",
      ],
      optionReasons: [
        "22 sadece gelecekteki eski dört kişinin ortalamasıdır.",
        "Beşe böler ama yeni kişinin yaşını toplamda saymaz.",
        "19 eski ekibin bugünkü ortalamasıdır.",
        "Bir üye eklemek ortalamayı otomatik olarak bir artırmaz.",
        "Yeni pay ve payda doğru tanımlanmıştır. Eksik veri z’dir.",
      ],
      commonError:
        "Üye değişse bile sabit grup ortalamasına sadece geçen süreyi eklemek.",
      check:
        "z=12 olursa 100/5=20, z=22 olursa 110/5=22 elde edilir. İkisi de verilenlerle uyumludur.",
    },
  }),
  practice({
    key: "iki-tarih-tek-kisi-kosulu",
    prompt:
      "Yıl modelinde 2028’de bir anne ile çocuğu konuşuyor. 2014’te ikisinin yaş toplamı annenin 2028’deki yaşına eşitti. Annenin 1995’teki yaşı çocuğun 2028’deki yaşına eşitti. 2028’deki yaş toplamı ve çocuğun 1995’teki durumu hangisidir?",
    options: [
      "75 ve çocuk doğmuştu.",
      "89 ve çocuk henüz doğmamıştı.",
      "89 ve çocuk 0 yaşındaydı.",
      "61 ve çocuk henüz doğmamıştı.",
      "Veriler çelişir, çünkü çocuk 1995’te doğmamıştı.",
    ],
    answer: 1,
    hint: "2014 ve 1995 için 2028’den kaç yıl geri gittiğini ayrı yaz. İkinci koşulda hangi kişinin geçmiş yaşı var?",
    guidance: {
      knowledge: [
        "Bugünkü hedef yaş sabit kalır. Bir kişinin geçmiş yaşını kullanan bir koşul diğer kişiyi o tarihteki gruba katmaz.",
      ],
      strategy:
        "Annenin bugünkü yaşını A, çocuğunkini Ç seç. 2014 ve 1995 için iki ayrı koşul kur.",
      steps: [
        "2014, 2028’den 14 yıl öncedir. (A−14)+(Ç−14)=A, dolayısıyla Ç=28.",
        "1995, 2028’den 33 yıl öncedir. A−33=28, dolayısıyla A=61.",
        "Toplam 89. Çocuğun doğum yılı 2028−28=2000 olduğundan çocuk 1995’te henüz doğmamıştır.",
      ],
      optionReasons: [
        "2014 toplamındaki iki kişiye ayrı ayrı 14 yıl uygulanmalıdır.",
        "2028’de 61+28=89. 1995 koşulu yalnız annenin o tarihteki yaşını kullanır.",
        "Çocuk 2000 yılında doğar. Doğum öncesi yaş 0 olarak yazılmaz.",
        "61 yalnız annenin 2028’deki yaşıdır.",
        "1995’te çocuğun yaşına ihtiyaç yoktur, dolayısıyla çelişki oluşmaz.",
      ],
      commonError:
        "Her koşulu aynı geçmiş tarihe yazmak veya 1995’te çocuğu da yaş toplamına katmak.",
      check:
        "2014’te 47+14=61. 1995’te anne 28 yaşındadır. İki koşul da ayrı ayrı sağlanır.",
    },
  }),
  practice({
    key: "iki-kesin-yas-siniri",
    prompt:
      "A’nın yaşı 2k+1, B’nin yaşı k+7 ve C’nin yaşı 5’tir. B, A’dan büyüktür. A da C’den büyüktür. Pozitif tam sayı k hangi değerleri alabilir?",
    options: [
      "3, 4, 5",
      "2, 3, 4, 5",
      "3, 4, 5, 6",
      "2, 3, 4, 5, 6",
      "Yalnız 4",
    ],
    answer: 0,
    hint: "B>A ve A>C koşullarını ayrı çöz. Bir sınır değerde eşitlik çıkarsa onu alma.",
    guidance: {
      knowledge: [
        "Kesin büyüklükte eşitlik kabul edilmez. İki koşulu birden sağlayan tam sayılar alınır.",
      ],
      strategy: "İlk eşitsizlik üst sınırı, ikincisi alt sınırı verir.",
      steps: [
        "B>A için k+7>2k+1, yani k<6.",
        "A>C için 2k+1>5, yani k>2.",
        "2<k<6 aralığındaki pozitif tam sayılar 3, 4 ve 5’tir.",
      ],
      optionReasons: [
        "Üçü de kesin alt ve üst sınırın arasındadır.",
        "k=2 iken A ve C’nin yaşları eşittir.",
        "k=6 iken B ve A’nın yaşları eşittir.",
        "Her iki sınırda da bir kesin koşul bozulur.",
        "4 uygundur, ancak 3 ve 5 de iki eşitsizliği sağlar.",
      ],
      commonError: "Kesin aralığın uçlarını aday listesine katmak.",
      check: "k=3 için 10>7>5, k=5 için 12>11>5. k=2 veya 6’da eşitlik olur.",
    },
  }),
  practice({
    key: "iki-dogum-yonu",
    prompt:
      "İki kişinin gerçek bugünkü yaş oranı 4:7’dir. İlk kişi bir yıl daha erken, ikinci kişi iki yıl daha geç doğmuş olsaydı aynı bugünkü tarih için oran 3:5 olurdu. İkinci kişinin gerçek bugünkü yaşı kaçtır?",
    options: ["11", "44", "75", "77", "79"],
    answer: 3,
    hint: "Bugünkü yaşı ayrı, doğum yılı değişseydi bugünkü yaşı ayrı yaz. Bakılan gün ilerlemiyor.",
    guidance: {
      knowledge: [
        "Bakılan gün sabitken doğum yılını erkene almak yaşı artırır. Geçe almak yaşı azaltır.",
      ],
      strategy:
        "Gerçek yaşları 4k, 7k yaz. Varsayımsal oranı 4k+1 ve 7k−2 ile kur.",
      steps: [
        "Varsayımsal oran (4k+1)/(7k−2)=3/5.",
        "5(4k+1)=3(7k−2), yani 20k+5=21k−6. Buradan k=11.",
        "İstenen gerçek yaş 7k=77.",
      ],
      optionReasons: [
        "11 ortak katsayıdır, yaş değildir.",
        "44 ilk kişinin gerçek yaşını verir.",
        "75 ikinci kişinin varsayımsal yaşıdır.",
        "İkinci kişinin gerçek yaşı doğum kayması uygulanmadan 7·11’dir.",
        "İkinci kişinin daha geç doğması yaşı 77’den 79’a çıkarmaz.",
      ],
      commonError: "Varsayımsal yaşı gerçek yaş gibi cevaplamak.",
      check: "44:77=4:7 ve 45:75=3:5. İkinci oranın paydası pozitiftir.",
    },
  }),
  practice({
    key: "hizmet-yili-parantez-onar",
    prompt:
      "İki arşiv biriminden eski olan bugün yenisinden 15 yıl daha uzun süredir açık. Üç yıl sonra eskinin hizmet süresi yeninin dört katı olacak. Yeni birimin bugünkü hizmet süresini x seçen biri x+18=4x+3 yazıyor. Doğru çözüm hangisidir?",
    options: [
      "x+18=4x+3, x=5",
      "x+15=4(x+3), x=1",
      "x+18=4(x+3), x=2",
      "x+12=4(x+3), x=0",
      "x+18=4x, x=6",
    ],
    answer: 2,
    hint: "Dört katı alınan şey, yeni birimin üç yıl sonraki bütün hizmet süresidir.",
    guidance: {
      knowledge: [
        "Aynı tarihe kadar iki birim de aynı sayıda yıl ilerler. “Dört katı”, gelecekteki sürenin tamamına uygulanır.",
      ],
      strategy:
        "İki gelecekteki süreyi ayrı yaz ve yeni birimin süresini parantez içinde dörtle çarp.",
      steps: [
        "Bugün yeni x, eski x+15 yıllıktır. Üç yıl sonra süreler x+3 ve x+18 olur.",
        "Doğru eşitlik x+18=4(x+3). Açınca x+18=4x+12.",
        "6=3x ve x=2.",
      ],
      optionReasons: [
        "Yalnız x dörtle çarpılmış. Üç yıllık artış da çarpılmalıdır.",
        "Eski birimin üç yıl sonraki süresi x+18 olmalıdır.",
        "İki süre üç yıl kaydırılmış, yeni sürenin tamamı dörtle çarpılmıştır.",
        "Eski birimi gelecekteki tarih yerine üç yıl geri götürür.",
        "Yeni birimin üç yıl sonraki süresi x+3’tür, x değildir.",
      ],
      commonError: "4(x+3) ifadesinde 4’ü yalnız ilk terime dağıtmak.",
      check: "Bugün süreler 2 ve 17. Üç yıl sonra 5 ve 20 olur, 20=4·5.",
    },
  }),
];
