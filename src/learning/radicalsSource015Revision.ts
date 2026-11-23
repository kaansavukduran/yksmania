import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const radicalsSource015Summary =
  "Aurelia 015 Köklü Sayılar, içerik 1.1 (19 Kasım 2026), PDF s. 1–10. MEBİ TYT Matematik Konu Özeti, basılı s. 42–44 (PDF s. 44–46). Son prova özgün alıştırmalardan oluşur. Geçmiş sınavlardan öğren bölümünde 2023 TYT Temel Matematik 4 kaynak kaydına ulaşabilirsin.";

const methodHeaders = ["İlk hamle", "Burada çalışır", "Benzer görünen hata", "Başka bir durumda"];

export const radicalsSource015Sections: GuideSection[] = [
  {
    title: "Kök işareti ile kuvvet denklemini ayrı oku",
    paragraphs: [
      "n, en az 2 olan bir tam sayı, a gerçek sayı olsun. Çift n için ⁿ√a yalnız a≥0 iken gerçektir ve n’inci kuvveti a olan negatif olmayan değeri gösterir. Örneğin ∜81=3. x⁴=81 denkleminde −3 ve 3 ayrı çözümlerdir, çünkü ikisinin de dördüncü kuvveti 81’dir. Çift derecede a=0 için tek çözüm x=0, a<0 için gerçek çözüm yoktur.",
      "Tek n için xⁿ gerçek sayılarda sürekli artar ve tüm gerçek değerleri alır. Her a için yalnız bir x vardır. ∛(−64)=−4 ve x³=−64 denkleminin tek çözümü −4’tür. Pozitif a için a^(m/n)=(ⁿ√a)ᵐ, m bir tam sayıdır. Örneğin 27^(−2/3)=(∛27)⁻²=3⁻²=1/9. Negatif üs, sıfıra bölmeme koşulu getirir.",
    ],
  },
  {
    title: "Kök derecelerini eşitlemeden önce işareti gör",
    paragraphs: [
      "Küpkök içindeki tam küp dışarı çıkar. ∛128+∛54=4∛2+3∛2=7∛2. 128=64·2 ve 54=27·2 olduğu için her iki terimde de ortak birim ∛2’dir. Bir terim karekök, öbürü küpkök olsaydı benzer terim kuralı bu biçimde çalışmazdı.",
      "Pozitif kök içleri için farklı dereceleri ortak dereceye taşı. √3·∛3=3^(1/2+1/3)=3^(5/6)=⁶√243. Ortak derece 6, 2 ile 3’ün en küçük ortak katıdır. Eşdeğer yazım √3=⁶√27 ve ∛3=⁶√9 verir. Negatif bir küpkökü bu yolla çift dereceye çevirirsen işaret kaybolur: ∛(−8)=−2 iken ⁶√64=2. Önce ∛(−8)=−∛8 biçiminde işareti dışarı alabilirsin.",
    ],
  },
  {
    title: "Kareye tamamlayıp adayı özgün denklemde denetle",
    paragraphs: [
      "√(x+6)=x−2 için kök içi x≥−6, negatif olmayan sağ taraf x≥2 ister. Birlikte x≥2 gerekir. Kare alıp düzenleyince x²−5x=2 kalır. (2x−5)²=4x²−20x+25 olduğundan iki tarafı 4 ile çarp ve ikisine 25 ekle. Böylece (2x−5)²=33 elde edilir.",
      "2x−5=±√33 ve x=(5±√33)/2. √33>1 olduğu için eksi aday x≥2 şartını sağlamaz. Artı adayda x−2=(1+√33)/2>0 ve (x−2)²=(17+√33)/2=x+6 olur. Dolayısıyla esas karekök gerçekten x−2’dir. Genel olarak √f(x)=g(x) için g(x)≥0 ile f(x)=g(x)² birlikte özgün eşitliği sağlar. Bu iki koşul sağlandığında f(x)≥0 kendiliğinden gelir.",
    ],
  },
  {
    title: "İşlem seçimi için kısa kontrol",
    paragraphs: [
      "Sadeleştirmede en büyük tam kuvvet çarpanını ara. Toplama ve çıkarmada önce kökleri sadeleştir. Hem derece hem kalan kök içi aynıysa katsayıları birleştir. Pozitif köklü bir sayıyı konumlandırmak için komşu tam kareleri kullan. 49<58<64 olduğu için 7<√58<8.",
      "Kök paydadaysa önce tanım ve sıfır kontrolü yap. Tek kök için aynı kökle, iki terim için sıfırdan farklı eşlenikle payı ve paydayı çarp. Sıralamada önce işaretleri belirle. Köklü denklemde kökü yalnız bırak, işaret koşulunu yaz, uygun kuvveti al ve sonucu özgün eşitliğe koy. A√B biçiminde pozitif kenar ve alan verilirse A²B=alan eşitliğinden başla.",
    ],
  },
  {
    title: "Kök çıkarma, benzer terim, derece ve bölüm",
    paragraphs: [
      "Her satırdaki ilk işlemi seçmeden önce veriyi oku. Yanındaki örnek aynı kuralın dayandığı koşulu görünür kılar.",
    ],
    table: {
      headers: methodHeaders,
      rows: [
        ["Tam kuvveti kökten çıkar", "√80=4√5, çünkü 80=16·5.", "x=−7 için √(x²)=7. Burada dışarı |x| çıkar.", "80 cm² karede kenar 4√5 cm, çevre 16√5 cm."],
        ["Benzer kökü oluştur", "√28+√63=2√7+3√7=5√7.", "√28+√63 ifadesinin karesi 175 olur. √91’in karesi 91’dir.", "2√7 m ve 3√7 m uzunluğundaki iki şeridi uç uca koyunca 5√7 m elde edilir."],
        ["Ortak dereceye geç", "√5·∛5=⁶√(5⁵). İki iç değer pozitiftir.", "√5·∛5 için √25 yazmak küpkökü karekök sayar.", "Kenarları √5 cm ve ∛5 cm olan dikdörtgenin alanı ⁶√(5⁵) cm²’dir."],
        ["Bölüm ve tek köklü payda", "√63/√7=3. 2/√7=(2√7)/7.", "b=−7 iken b≠0 sağlanır ama √b gerçek değildir. √a/√b için b>0 gerekir.", "4 L sıvının √7 L’lik kapa oranı 4√7/7’dir. √7<4<2√7 olduğundan bir kap tam dolar."],
      ],
    },
  },
  {
    title: "Sıralama, eşlenik, denklem ve alan",
    paragraphs: [
      "Sonucu hızlandıran işlem, ancak dayandığı koşulu sağladığında geçerlidir. Özellikle sıfır, negatif işaret ve doğal sayı kısıtlarına bak.",
    ],
    table: {
      headers: methodHeaders,
      rows: [
        ["Sıralamada işareti ayır", "3√6 ve 4√3 pozitiftir. Kareleri 54>48, dolayısıyla 3√6>4√3.", "−3√6 ile 4√3 zıt işaretlidir. Karelere bakmadan −3√6<4√3 sonucuna ulaşılır.", "54 cm² alanlı karenin kenarı 48 cm² alanlı kareninkinden uzundur."],
        ["Asıl paydayı ve eşleniği denetle", "1/(5+√6)=(5−√6)/19. İki çarpan da sıfırdan farklıdır.", "1/(4+√16)=1/8. Eşlenik sıfırdır, bu yüzden 0/0 ile genişletme yapılamaz.", "Kenarları √13−√5 ve √13+√5 olan dikdörtgenin alanı 13−5=8 birim²’dir."],
        ["Kare al ve geri dön", "√(x+20)=x için x≥0. Kareli denklem (x−5)(x+4)=0 verir. Yalnız 5 ilk eşitliği sağlar.", "−4 karesi alınmış eşitliği sağlar. Özgün denklemde √16=4≠−4 olduğu için elenir.", "Pozitif bir uzunluğun sayısal değeri L=√(L+20) modelini sağlıyorsa uzunluk 5 birimdir."],
        ["Alanı veren kare bölenleri tara", "A²B=252=2²·3²·7 için A=1, 2, 3, 6 ve B=252, 63, 28, 7 sırasıyla eşleşir.", "B’yi baştan kare çarpansız seçmek üç geçerli gösterimi atlar.", "Alanı 252 birim² olan bir karenin kenarı √252, 2√63, 3√28 veya 6√7 olarak yazılabilir."],
      ],
    },
  },
];

export const radicalsSource015Examples: WorkedExample[] = [
  {
    title: "Önce iki boşluğu kendin doldur",
    prompt: "√245−√80 ifadesini √(□·5)−√(□·5) biçiminde yaz ve sadeleştir. Kutulara hangi tam kareler gelir?",
    strategy: "Her kök içini 5’e böl. Elde ettiğin sayıların tam kare olup olmadığına bak.",
    steps: [
      { label: "Çarpanlar", explanation: "245 ve 80’i ayrı ayır.", expression: "245=49·5, 80=16·5" },
      { label: "Ortak kök", explanation: "Katsayıları çıkar ve ortak √5’i bırak.", expression: "7√5−4√5=3√5" },
    ],
    answer: "Kutular 49 ve 16, sonuç 3√5.",
    check: "İlk kök daha büyüktür. Sonucu küçük terime ekleyince 3√5+4√5=7√5=√245 elde edilir.",
    pitfall: "İki kök içini çıkarıp farkın karekökünü almak.",
  },
  {
    title: "Sıfır olan çarpanı doğru yerde bul",
    prompt: "6/(2+√4) ile 6/(2−√4) ifadelerini değerlendir. İlk ifadenin eşleniği sıfır olursa ne değişir?",
    strategy: "√4’ü hesapla ve her ifadenin kendi paydasını kontrol et.",
    steps: [
      { label: "Artılı payda", explanation: "Esas kök √4=2 ve 2+2=4.", expression: "6/(2+√4)=6/4=3/2" },
      { label: "Eksili payda", explanation: "2−2=0 olduğundan ikinci kesir gerçek sayı olarak tanımsızdır." },
      { label: "Genişletme", explanation: "İlk kesrin eşleniği sıfırdır. 0/0, 1 değerini vermediğinden bu genişletme yapılamaz." },
    ],
    answer: "İlk kesir 3/2’dir. İkinci kesir tanımsızdır.",
    check: "İlk değeri 4 ile çarptığında pay 6 geri gelir.",
    pitfall: "Asıl payda yerine eşleniği denetleyip ilk kesri tanımsız saymak.",
  },
];

export const radicalsSource015Recall = [
  {
    prompt: "a<0 iken n çift veya tek olduğunda xⁿ=a’nın kaç gerçek çözümü vardır?",
    answer: "Çift n için sıfır, tek n için bir. Örneğin x⁴=−16’nın çözümü yoktur, x³=−8 için x=−2’dir.",
  },
  {
    prompt: "Paydanın eşleniği sıfırsa asıl kesrin değeri nasıl bulunur?",
    answer: "Asıl paydayı doğrudan hesapla. Örneğin 1/(2+√4)=1/4. Eşlenik sıfırsa onunla genişletme yapılamaz.",
  },
  {
    prompt: "A√B kenarı ve pozitif kare alanı K verildiğinde doğal A adayları nasıl bulunur?",
    answer: "A²B=K kurulur. A pozitiftir ve A², K’yi tam bölmelidir. B=K/A². Soruda özellikle istenirse kare çarpansız B aranır.",
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

function practice({ key, prompt, options, answer, hint, guidance }: PracticeInput): Question {
  return {
    id: `koklu-sayilar-015-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Köklü Sayılar",
    guidance,
  };
}

export const radicalsSource015Practice = [
  practice({
    key: "benzer-kok",
    prompt: "√192−2√27 işleminin en sade sonucu nedir?",
    options: ["√138", "5√3", "2√3", "2√6", "14√3"],
    answer: 2,
    hint: "192 ve 27’yi aynı kök içini bırakacak iki tam kare çarpanla yaz.",
    guidance: {
      knowledge: ["Toplama ve çıkarma için kök derecesi ve sadeleşmiş kök içi aynı olmalıdır."],
      strategy: "İki kökü ayrı sadeleştir, sonra ikinci terimin dışındaki 2’yi uygula.",
      steps: ["192=64·3, dolayısıyla √192=8√3.", "27=9·3, yani 2√27=6√3.", "8√3−6√3=2√3."],
      optionReasons: ["192−2·27 işlemini tek kök içine almak çıkarma kuralı değildir.", "27’nin kökü 3√3’tür. Dışarıdaki 2 hesaba katılmalıdır.", "İki katsayı 8 ve 6 olduğundan fark 2√3’tür.", "Sadeleştirme sonunda kalan kök içi 3’tür.", "14√3, iki terim toplandığında çıkar."],
      commonError: "İkinci terimin katsayısını unutmak.",
      check: "2√3+6√3=8√3 ve (8√3)²=192.",
    },
  }),
  practice({
    key: "tek-koklu-payda",
    prompt: "5/√6 ifadesinin paydası rasyonelleştirilirse hangisi elde edilir?",
    options: ["(5√6)/6", "5/6", "5√6", "(6√5)/5", "√30/6"],
    answer: 0,
    hint: "Kesri değeri 1 olan ve paydasında √6 bulunan bir çarpanla genişlet.",
    guidance: {
      knowledge: ["Pay ve payda aynı sıfırdan farklı sayıyla çarpıldığında değer korunur."],
      strategy: "√6’nın sıfır olmadığını gör ve √6/√6 ile genişlet.",
      steps: ["√6>0, bu yüzden √6/√6=1.", "Pay 5√6, payda (√6)²=6 olur."],
      optionReasons: ["Her iki tarafta aynı sıfırdan farklı kökle çarpılmıştır.", "Yalnız payda 6’ya dönüştürülmüştür.", "Yeni payda 6 atlanmıştır.", "Pay ile kök içinin rolleri değiştirilmiştir.", "5√6=√150 olur. √30, 5 katsayısını karesini almadan içeri taşır."],
      commonError: "Kökle yalnız paydayı çarpmak.",
      check: "Yeni kesri ilk payda olan √6 ile çarp. (5√6/6)·√6=5, yani ilk pay geri gelir.",
    },
  }),
  practice({
    key: "pozitif-siralama",
    prompt: "a=3√5 ve b=2√11. Bu iki pozitif sayının sıralaması hangisidir?",
    options: ["a=b", "a<b", "a=2b", "b=2a", "a>b"],
    answer: 4,
    hint: "İki sayıyı da pozitifken kareleriyle karşılaştır.",
    guidance: {
      knowledge: ["Kare alma negatif olmayan sayılarda sıralamayı korur."],
      strategy: "Katsayıyı da karele ve elde ettiğin tam sayıları karşılaştır.",
      steps: ["a²=9·5=45.", "b²=4·11=44.", "45>44 ve a,b>0 olduğu için a>b."],
      optionReasons: ["Kareler 45 ve 44 olduğundan sayılar eşit olamaz.", "Yalnız 5 ile 11’i karşılaştırmak katsayıları atlar.", "a=2b olsaydı a²=176 olurdu.", "b=2a olsaydı b²=180 olurdu.", "İki sayı da pozitif olduğundan büyük kare büyük sayıya aittir."],
      commonError: "Yalnız kök içlerini karşılaştırmak.",
      check: "a²−b²=(a−b)(a+b)=1 ve a+b>0 olduğundan a−b>0.",
    },
  }),
  practice({
    key: "koklu-denklem",
    prompt: "√(x+11)=x−1 denkleminin gerçek çözüm kümesi hangisidir?",
    options: ["{−2, 5}", "{5}", "{−2}", "{2}", "∅"],
    answer: 1,
    hint: "Sağ tarafın negatif olmaması için önce x’in hangi aralıkta bulunacağını yaz.",
    guidance: {
      knowledge: ["Esas karekök tanımlı olduğunda negatif olamaz."],
      strategy: "İşaret koşulunu yaz, iki tarafı karele, her adayı ilk eşitlikte dene.",
      steps: ["x+11≥0 ve x−1≥0 koşulları birlikte x≥1 verir.", "x+11=(x−1)², yani (x−5)(x+2)=0.", "5 için √16=4=5−1. −2 için √9=3 ama sağ taraf −3’tür."],
      optionReasons: ["İki adaydan biri işaret koşulunu bozar.", "5 işaret şartını sağlar ve ilk eşitliğin iki tarafı 4 olur.", "Negatif x, x−1≥0 koşulunu sağlamaz.", "x=2 için sol taraf √13, sağ taraf 1’dir.", "x=5 ilk eşitliği sağlar, dolayısıyla küme boş olamaz."],
      commonError: "Kareli denklemin köklerini özgün denklemi denemeden kabul etmek.",
      check: "Kabul edilen adayda iki taraf da pozitiftir ve kareleri 16’dır.",
    },
  }),
  practice({
    key: "alan-cevre",
    prompt: "Alanı 288 cm² olan bir karenin çevresi kaç santimetredir?",
    options: ["48√2", "12√2", "24√2", "48", "1152"],
    answer: 0,
    hint: "Önce bir kenarı bul. Alan ile çevre farklı niceliklerdir.",
    guidance: {
      knowledge: ["Karenin alanı kenar uzunluğunun karesi, çevresi dört kenarın uzunluk toplamıdır."],
      strategy: "Pozitif kenarı √288 olarak hesapla ve 4 ile çarp.",
      steps: ["288=144·2, bu nedenle kenar √288=12√2 cm.", "4·12√2=48√2 cm."],
      optionReasons: ["Dört eşit kenarın uzunluğu 48√2 cm eder.", "12√2 yalnız bir kenarın uzunluğudur.", "24√2 iki kenarın toplamıdır.", "√2 çarpanı düşürülmüştür.", "288·4 bir alanı çarpar ve çevreyi vermez."],
      commonError: "Alan sayısını doğrudan 4 ile çarpmak.",
      check: "48√2/4=12√2 ve (12√2)²=288.",
    },
  }),
  practice({
    key: "kenarin-gosterimi",
    prompt: "Alanı 648 cm² olan bir karenin kenarı A√B cm biçiminde yazılıyor. A ve B doğal sayıdır. A=9 verildiğinde B ve A+B sırasıyla kaçtır?",
    options: ["72 ve 81", "4 ve 13", "8 ve 17", "2 ve 11", "17 ve 8"],
    answer: 2,
    hint: "Alanı yazarken kökle birlikte A katsayısının da karesini al.",
    guidance: {
      knowledge: ["A√B kenarının karesi A²B’dir. B’nin kare çarpansız olması ancak soruda istenirse kısıttır."],
      strategy: "648=81B eşitliğini kur ve ardından A+B’yi ayrı hesapla.",
      steps: ["A²=9²=81.", "81B=648 olduğundan B=8.", "A+B=9+8=17."],
      optionReasons: ["648 sayısını A’ya bölmek A’nın karesini atlar.", "81·4=324 verilen alan değildir.", "81·8=648 ve 9+8=17.", "B=2 ancak katsayı 18’e dönüşürse çalışır. Burada A=9 sabittir.", "İstenen sıra önce B, sonra toplamdır."],
      commonError: "Kenarın en sade kök biçimi istenmiş gibi sabit A’yı değiştirmek.",
      check: "9√8=18√2 ve her ikisinin karesi 648’dir.",
    },
  }),
  practice({
    key: "isareti-degisen-denklem",
    prompt: "√(x+11)=x−1 denkleminin sağ tarafı x+1 ile değişiyor. Yeni √(x+11)=x+1 denkleminde başlangıç koşulu ve gerçek çözüm kümesi hangisidir?",
    options: [
      "x≥1, {5}",
      "x≥−11, {(−1−√41)/2, (−1+√41)/2}",
      "x≥−1, {(−1−√41)/2}",
      "x≥−1, {(−1+√41)/2}",
      "x≥−1, {1+√11}",
    ],
    answer: 3,
    hint: "Sağ tarafın yeni işaret koşulunu yaz. Sonra (2x+1)² kalıbına ulaş.",
    guidance: {
      knowledge: ["Sağ taraf değiştiğinde kök içi ve sağ tarafın işaret koşulu yeniden birlikte değerlendirilir."],
      strategy: "Tam kareyi oluştur, iki adayı yeni koşulda ve özgün denklemde denetle.",
      steps: ["x+11≥0 ve x+1≥0 birlikte x≥−1 verir.", "x+11=x²+2x+1, dolayısıyla x²+x=10.", "Dörtle çarpıp iki tarafa 1 ekle. (2x+1)²=41, bu yüzden x=(−1±√41)/2.", "Eksi aday −1’den küçüktür. Artı adayda x+1>0 ve (x+1)²=x+11 olduğundan kök eşitliği sağlanır."],
      optionReasons: ["Bu, önceki x−1 denklemine aittir. x=5 yeni denklemde 4=6 verirdi.", "Kök içinin koşulu doğru fakat eksi adayda sağ taraf negatiftir.", "Eksi aday başlangıç koşulunu bozar.", "Yeni koşul x≥−1’dir ve yalnız artı aday ilk eşitliği sağlar.", "x=1+√11 için x²+x=13+3√11 olur, 10 olmaz."],
      commonError: "İşaret değiştiğinde eski denklemdeki koşulu ve çözümü taşımak.",
      check: "Artı adayda (x+1)²=(21+√41)/2=x+11 ve x+1=(1+√41)/2>0.",
    },
  }),
  practice({
    key: "sahte-adayi-onar",
    prompt: "Bir öğrenci √(3x+28)=x denklemini kareleyip −4 ve 7’yi çözüm listesine yazıyor. Doğru onarım hangisidir?",
    options: [
      "İki aday da kalır. İkisi de kareli denklemi sağlar.",
      "Yalnız 7 kalır. −4 için sağ taraf negatiftir.",
      "Yalnız −4 kalır. Sol tarafın karesi 16’dır.",
      "İkisi de elenir. Sağ taraf x>7 ister.",
      "7 yerine −7 yazılır. Karekök her iki işareti verir.",
    ],
    answer: 1,
    hint: "Kareli denklemi bir yana bırak. Her sayıyı ilk eşitliğe ayrı yerleştir.",
    guidance: {
      knowledge: ["√u negatif olamaz. Kare alma karşıt işaretlerin farkını siler."],
      strategy: "Sağ taraf koşulunu denetle ve her adayı özgün denklemle sına.",
      steps: ["Özgün eşitlik x≥0 gerektirir.", "x=7 için √49=7. x=−4 için √16=4≠−4.", "Yalnız 7 çözüm olarak kalır."],
      optionReasons: ["Kareli eşitlik (x−7)(x+4)=0 verir ama özgün denklem −4’ü kabul etmez.", "7 özgün denkleme uyar. −4 sağ tarafta negatif kalır.", "Kare 16 olsa da esas kök +4’tür.", "Sağ tarafın negatif olmaması x≥0 demektir.", "Kök işareti iki değer vermez."],
      commonError: "Son kareli denklemi özgün denklemin yerine geçirmek.",
      check: "7 için kök içi 3·7+28=49 ve sağ taraf pozitiftir.",
    },
  }),
  practice({
    key: "sifir-eslenigi-onar",
    prompt: "Bir öğrenci “3/(5+√25) tanımsız, çünkü eşleniği sıfır” diyor. Hangisi doğru değerlendirmedir?",
    options: [
      "Tanımsızdır, çünkü her sıfır eşlenik asıl paydayı sıfır yapar.",
      "Değeri 3/5’tir, çünkü paydadaki eşlenik atılır.",
      "Değeri 0’dır, çünkü pay ile payda sıfırla çarpılır.",
      "Değeri 3/10’dur, çünkü kök 5 ve asıl payda 10’dur.",
      "Değeri 1’dir, çünkü 0/0 ile genişletilebilir.",
    ],
    answer: 3,
    hint: "Eşleniği hiç kullanmadan önce asıl paydayı hesapla.",
    guidance: {
      knowledge: ["Bir kesrin tanımı asıl paydaya bağlıdır. Sıfırla genişletme yapılamaz."],
      strategy: "Asıl paydayı ve önerilen çarpanı ayrı ayrı hesapla.",
      steps: ["√25=5 olduğundan 5+√25=10’dur.", "3/(5+√25)=3/10. Eşlenik 5−√25=0 ile genişletme yapılamaz."],
      optionReasons: ["Asıl payda 10 ve eşlenik 0’dır. Bu iki koşul ayrıdır.", "Paydadaki 5 ile √25 toplanmalıdır.", "0/0 tanımsızdır ve ilk kesrin değerini koruyamaz.", "3/10 hem doğrudan bölümün değeri hem sade biçimidir.", "0/0 bir genişletme çarpanı veya 1 olarak kullanılamaz."],
      commonError: "Bir çözüm yolunun geçersizliğini başlangıç ifadesinin tanımsızlığı sanmak.",
      check: "3/10 ile asıl payda 10 çarpılınca 3 elde edilir.",
    },
  }),
];
