import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet } from "./cheatsheetContent";

/*
 * Forge040: TYT geometri konuları, resmî konu listesinde olup uygulamada dersi
 * bulunmayan çember başlığı. Anlatım ve sorular özgündür; resmî ÖSYM sorusu
 * değildir. Var olan ders kimlikleri, sorular ve kayıtlı ilerleme değişmez.
 */

interface Item040 extends QuestionGuidance {
  prompt: string;
  /** options[0] is the correct answer; display order is rotated. */
  options: string[];
}
interface Pack040 {
  id: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item040[];
  source: string;
  sheet: { sections: CheatSheet["sections"]; cautions: string[] };
}

const packs040: Pack040[] = [
  {
    id: "tyt-geo-cember-aci-040",
    title: "Çemberde açı, kiriş ve teğet",
    minutes: 60,
    objectives: [
      "Merkez, yarıçap, çap, kiriş, yay, teğet ve keseni şekil üzerinde ayır.",
      "Merkez açı, çevre açı, teğet–kiriş açısı, iç ve dış açıyı gördükleri yaylarla hesapla.",
      "Teğetin yarıçapa dikliğini, dıştan çizilen teğetlerin eşitliğini ve kiriş–merkez uzaklığını kullan.",
      "Kesişen kirişlerde ve teğet–kesende kuvvet bağıntılarını kur; kirişler dörtgeninde karşı açıları kullan.",
    ],
    sections: [
      {
        title: "Çemberin elemanlarını adlandır",
        paragraphs: [
          "Düzlemde sabit bir O noktasına aynı r uzaklığındaki bütün noktaların oluşturduğu eğriye çember denir. O merkez, r yarıçaptır. Çemberin içindeki bölge daire adını alır; çember yalnız sınır çizgisidir. Merkezden geçen ve iki ucu çemberde olan doğru parçası çaptır, uzunluğu 2r olur.",
          "Çemberin iki noktasını birleştiren doğru parçası kiriştir; çap en uzun kiriştir. Kirişin uçları arasında kalan çember parçası yaydır. Çemberi iki noktada kesen doğru kesen, yalnız bir noktada değen doğru teğettir; değme noktasına teğet noktası denir. Yaylar derece cinsinden de ölçülür: bütün çember 360°'dir.",
        ],
      },
      {
        title: "Merkez açı gördüğü yaya eşittir",
        paragraphs: [
          "Köşesi merkezde, kolları yarıçap olan açıya merkez açı denir. Merkez açının kolları arasında kalan yay, açının gördüğü yaydır. Yayın derece ölçüsü bu merkez açıyla tanımlanır: merkez açı 70° ise gördüğü yay da 70°'dir.",
          "Yayın derece ölçüsü ile yay uzunluğu farklı şeylerdir. Aynı 70°'lik yay, büyük çemberde daha uzun bir eğri parçasıdır. Uzunluk gerekiyorsa daire konusundaki 2πr·(α/360) bağıntısı kullanılır; açı sorularında yalnız derece ölçüsü yeterlidir.",
        ],
      },
      {
        title: "Çevre açı yayın yarısıdır",
        paragraphs: [
          "Köşesi çember üzerinde, kolları kiriş olan açıya çevre açı denir. Çevre açı, gördüğü yayın derece ölçüsünün yarısıdır. Aynı AB yayını gören merkez açı 80° ise çevre açı 40° olur.",
          "Neden yarı? Köşeden merkezden geçen bir çap çizersen iki ikizkenar üçgen oluşur; her ikizkenar üçgenin dış açısı, eşit iki taban açısının toplamıdır. Bu yüzden merkezdeki açı, çevredeki açının iki katı çıkar. Sonuç: aynı yayı gören bütün çevre açılar eşittir; köşeyi çember üzerinde gezdirmek açıyı değiştirmez (köşe yayın aynı tarafında kaldığı sürece).",
        ],
      },
      {
        title: "Çapı gören çevre açı dik açıdır",
        paragraphs: [
          "Çap, çemberi iki 180°'lik yaya böler. Çapı gören çevre açı 180°/2 = 90° olur. Bu yüzden bir üçgenin bir kenarı çevrel çemberin çapı ise o kenarın karşısındaki açı diktir.",
          "Tersi de kullanılır: dik üçgenin hipotenüsü, çevrel çemberin çapıdır ve hipotenüsün orta noktası çevrel çemberin merkezidir. Hipotenüsü 10 olan dik üçgenin çevrel çember yarıçapı 5'tir.",
        ],
      },
      {
        title: "Teğet yarıçapa diktir",
        paragraphs: [
          "Teğet noktasında merkeze çizilen yarıçap teğet doğrusuna diktir. Bu dik açı, teğet sorularında Pisagor bağıntısını açar: merkezden d uzaklıktaki P noktasından çizilen teğetin uzunluğu t ise t² + r² = d² olur.",
          "Dıştaki bir P noktasından çembere iki teğet çizilirse teğet parçaları eşittir: PA = PB. İki dik üçgen (OAP ve OBP) ortak hipotenüs OP ve eşit yarıçaplar sayesinde eştir. Ayrıca OP, APB açısını ve AOB açısını iki eşit parçaya böler.",
        ],
      },
      {
        title: "Teğet–kiriş açısı da yayın yarısıdır",
        paragraphs: [
          "Köşesi teğet noktasında, bir kolu teğet, öbür kolu kiriş olan açıya teğet–kiriş açısı denir. Bu açı da aradaki yayın yarısıdır. Teğet ile AB kirişi arasındaki açı 35° ise AB yayı 70°'dir.",
          "Bu kural, çevre açının özel bir durumudur: çevre açının bir kolunu çember üzerinde kaydırıp köşeye yaklaştırdığında kiriş teğete dönüşür, açı yine yayın yarısında kalır. Aynı yayı gören çevre açı ile teğet–kiriş açısı eşittir.",
        ],
      },
      {
        title: "İç açı ve dış açı yayları birleştirir",
        paragraphs: [
          "İki kiriş çemberin içinde kesişirse oluşan açı, kendisinin ve ters açısının gördüğü iki yayın ortalamasıdır: iç açı = (yay₁ + yay₂)/2. Yaylar 100° ve 40° ise açı 70°'dir.",
          "Köşesi çemberin dışında olan açı (iki kesen, kesen–teğet ya da iki teğet) iki yayın farkının yarısıdır: dış açı = (büyük yay − küçük yay)/2. Dıştaki P noktasından çizilen iki teğet arasındaki açı için küçük yay x ise büyük yay 360° − x olur ve açı 180° − x çıkar.",
        ],
      },
      {
        title: "Merkezden kirişe inen dikme kirişi ortalar",
        paragraphs: [
          "Merkezden bir kirişe çizilen dikme kirişi iki eşit parçaya böler. Kiriş uzunluğu c, merkezin kirişe uzaklığı d ise r² = d² + (c/2)² olur. Yarıçapı 5, kirişi 8 olan çemberde merkez–kiriş uzaklığı √(25 − 16) = 3'tür.",
          "Eşit kirişler merkezden eşit uzaklıktadır ve eşit yaylar görür; merkeze yakın kiriş daha uzundur. Kiriş merkezden geçerse d = 0 ve kiriş çapa eşit olur.",
        ],
      },
      {
        title: "Kuvvet bağıntıları: çarpımlar eşittir",
        paragraphs: [
          "İki kiriş içeride bir P noktasında kesişirse parçaların çarpımları eşittir: PA·PB = PC·PD. Bir kirişin parçaları 4 ve 6, diğerinin bir parçası 3 ise öbür parçası 4·6/3 = 8'dir.",
          "Dıştaki P'den çizilen teğet uzunluğu t ve aynı noktadan çizilen kesenin çembere yakın ve uzak kesim noktaları A ve B ise t² = PA·PB olur. Kesende PB parçası PA'yı da içerir; dış parçayla bütün kesen çarpılır. İki kesen için PA·PB = PC·PD aynı biçimde kurulur.",
        ],
      },
      {
        title: "Kirişler dörtgeninde karşı açılar 180°",
        paragraphs: [
          "Dört köşesi de bir çember üzerinde olan dörtgene kirişler dörtgeni denir. Karşı açılar, çemberin tamamını oluşturan iki yayı görür; her biri kendi yayının yarısı olduğundan toplamları 360°/2 = 180° olur.",
          "Bir dörtgende karşı açıların toplamı 180° ise köşeleri bir çember üzerindedir. Kirişler dörtgeninde bir dış açı, komşu olmayan iç açıya eşittir; bu, karşı açılar toplamının başka bir yazılışıdır.",
        ],
      },
      {
        title: "Çember sorusunu adım adım çöz",
        paragraphs: [
          "1) Merkezi bul ve yarıçapları çiz: her yarıçap aynı uzunluktadır, ikizkenar üçgenler doğar. 2) Açının köşesi nerede? Merkezde (yay = açı), çemberde (açı = yay/2), içeride (yayların ortalaması), dışarıda (farkın yarısı). 3) Teğet varsa teğet noktasına yarıçap çiz ve 90°'yi işaretle.",
          "4) Uzunluk soruluyorsa dik üçgen (teğet–yarıçap, kiriş–dikme) ya da kuvvet bağıntısı ara. 5) Bütün yayların toplamının 360° olduğunu ve bulduğun açının 0° ile 180° arasında kaldığını denetle. Şekil ölçekli değildir; göz kararı yerine bağıntı kullan.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı yayı gören açılar",
        prompt:
          "O merkezli çemberde A, B, C çember üzerinde ve C, AB yayının dışında kalan yaydadır. AOB merkez açısı 110° olduğuna göre ACB çevre açısı kaç derecedir?",
        strategy: "Önce AB yayını merkez açıdan oku, sonra çevre açıyı yayın yarısı olarak hesapla.",
        steps: [
          { label: "Yayı bul", explanation: "Merkez açı gördüğü yaya eşittir: AB yayı 110°." },
          { label: "Çevre açıyı hesapla", explanation: "ACB, AB yayını görür: 110°/2 = 55°." },
        ],
        answer: "55°",
        check: "Merkez açı çevre açının iki katıdır: 2·55 = 110.",
        pitfall: "Çevre açıyı merkez açıya eşit sanma; çevre açı yarıdır.",
      },
      {
        title: "Teğet ve Pisagor",
        prompt:
          "Yarıçapı 6 cm olan O merkezli çembere dıştaki P noktasından PT teğeti çiziliyor (T teğet noktası). OP = 10 cm ise PT kaç cm'dir?",
        strategy: "Teğet noktasına yarıçap çiz; OTP dik üçgenidir.",
        steps: [
          { label: "Dik açıyı yerleştir", explanation: "OT ⟂ PT olduğundan OTP üçgeninde T açısı 90°." },
          { label: "Pisagor", explanation: "PT² = OP² − OT² = 100 − 36 = 64, PT = 8 cm." },
        ],
        answer: "8 cm",
        check: "6–8–10 bir Pisagor üçlüsüdür.",
        pitfall: "OP'yi teğet uzunluğu sanma; OP hipotenüstür.",
      },
      {
        title: "Kesişen kirişler",
        prompt:
          "Bir çemberde AB ve CD kirişleri içeride P noktasında kesişiyor. PA = 4, PB = 9 ve PC = 6 ise CD kirişinin uzunluğu kaçtır?",
        strategy: "Kesişen kirişlerde parça çarpımları eşittir.",
        steps: [
          { label: "Bağıntıyı yaz", explanation: "PA·PB = PC·PD → 4·9 = 6·PD." },
          { label: "Çöz", explanation: "PD = 36/6 = 6." },
          { label: "Kirişi topla", explanation: "CD = PC + PD = 6 + 6 = 12." },
        ],
        answer: "12",
        check: "Kontrol: 6·6 = 36 = 4·9.",
        pitfall: "Soru kirişin tamamını istiyor; yalnız PD'yi yazma.",
      },
    ],
    recall: [
      { prompt: "Çevre açı ile aynı yayı gören merkez açı arasındaki ilişki nedir?", answer: "Merkez açı çevre açının iki katıdır; çevre açı yayın yarısıdır." },
      { prompt: "Çapı gören çevre açı kaç derecedir, neden?", answer: "90°. Çap 180°'lik yay ayırır; çevre açı bunun yarısıdır." },
      { prompt: "Dıştan çizilen iki teğet arasındaki açı ile küçük yay x arasındaki ilişki nedir?", answer: "Açı = 180° − x. Dış açı (büyük − küçük)/2 = ((360 − x) − x)/2." },
      { prompt: "Teğet–kesen bağıntısında hangi parçalar çarpılır?", answer: "t² = dış parça · bütün kesen (PA·PB); iç parça tek başına kullanılmaz." },
    ],
    items: [
      {
        prompt: "O merkezli çemberde A ve B çember üzerinde, AOB merkez açısı 76°'dir. AB yayını gören bir ACB çevre açısı kaç derecedir? (C, AB yayının dışındaki yayda)",
        options: ["38", "76", "152", "19", "104"],
        knowledge: ["Merkez açı gördüğü yaya eşittir.", "Çevre açı gördüğü yayın yarısıdır."],
        strategy: "Merkez açıdan yayı, yaydan çevre açıyı bul.",
        steps: ["AB yayı = 76°.", "ACB = 76/2 = 38°."],
        optionReasons: [
          "Doğru: çevre açı yayın yarısıdır.",
          "76 merkez açıdır; çevre açı ona eşit değildir.",
          "152 yarıya bölmek yerine ikiyle çarpar.",
          "19 iki kez yarıya böler.",
          "104 = 180 − 76; bu, kirişler dörtgeninde karşı açı ilişkisidir, burada yoktur.",
        ],
        commonError: "Merkez açı ile çevre açıyı eşit sanmak.",
        check: "2·38 = 76.",
      },
      {
        prompt: "Bir üçgenin AB kenarı, çevrel çemberinin çapıdır. AC = 6 ve BC = 8 ise çevrel çemberin yarıçapı kaçtır?",
        options: ["5", "10", "7", "4", "14"],
        knowledge: ["Çapı gören çevre açı 90°'dir.", "Dik üçgenin hipotenüsü çevrel çemberin çapıdır."],
        strategy: "C açısının dik olduğunu gör, hipotenüsü Pisagor ile bul, yarısını al.",
        steps: ["AB çap olduğundan C = 90°.", "AB² = 36 + 64 = 100, AB = 10.", "r = 10/2 = 5."],
        optionReasons: [
          "Doğru: r = AB/2 = 5.",
          "10 çaptır; yarıçap yarısıdır.",
          "7 iki dik kenarın ortalamasıdır; geometrik anlamı yok.",
          "4 dik kenarlardan birinin yarısıdır.",
          "14 iki dik kenarın toplamıdır.",
        ],
        commonError: "Çapı yarıçap olarak bırakmak.",
        check: "6–8–10 üçlüsü; merkez hipotenüsün orta noktasında.",
      },
      {
        prompt: "Yarıçapı 5 cm olan O merkezli çembere dıştaki P noktasından PT teğeti çiziliyor (T teğet noktası). PT = 12 cm ise OP kaç cm'dir?",
        options: ["13", "17", "7", "√119", "12"],
        knowledge: ["Teğet, teğet noktasındaki yarıçapa diktir."],
        strategy: "OTP dik üçgeninde OP hipotenüstür.",
        steps: ["OT = 5, PT = 12, T = 90°.", "OP² = 25 + 144 = 169, OP = 13."],
        optionReasons: [
          "Doğru: 5–12–13 dik üçgeni.",
          "17 kenarları toplar; Pisagor kareleri toplar.",
          "7 = 12 − 5; uzunluklar çıkarılmaz.",
          "√119 = √(144 − 25); OP hipotenüstür, büyük kenar odur.",
          "12 teğet uzunluğudur, OP değil.",
        ],
        commonError: "Teğet ile OP'yi karıştırmak.",
        check: "Hipotenüs (13) en uzun kenar olmalı.",
      },
      {
        prompt: "Dıştaki P noktasından O merkezli çembere PA ve PB teğetleri çiziliyor (A, B teğet noktaları). APB açısı 50° ise AOB açısı kaç derecedir?",
        options: ["130", "50", "100", "65", "25"],
        knowledge: ["OAPB dörtgeninde A ve B açıları 90°'dir.", "Dörtgenin iç açıları toplamı 360°'dir."],
        strategy: "Dörtgenin açı toplamından AOB'yi bul.",
        steps: ["OA ⟂ PA ve OB ⟂ PB: A = B = 90°.", "AOB = 360 − 90 − 90 − 50 = 130°."],
        optionReasons: [
          "Doğru: AOB = 180 − 50 = 130°.",
          "50, P'deki açıdır; merkez açı ona eşit değildir.",
          "100 iki katını alır; ilişki 180 − P'dir.",
          "65 = 130/2; bu, küçük yayı gören çevre açıdır.",
          "25 = 50/2; teğetler arasındaki açıyı yarıya böler.",
        ],
        commonError: "Teğet noktalarındaki 90°'leri unutmak.",
        check: "Dış açı formülü: küçük yay 130°, büyük yay 230°; (230 − 130)/2 = 50 ✓.",
      },
      {
        prompt: "Bir çemberin dışındaki P noktasından PA ve PB teğetleri çiziliyor. PA = 3x − 2 ve PB = x + 8 ise PA kaçtır?",
        options: ["13", "5", "10", "8", "26"],
        knowledge: ["Dıştaki bir noktadan çizilen iki teğet parçası eşittir."],
        strategy: "PA = PB eşitliğinden x'i bul, PA'yı hesapla.",
        steps: ["3x − 2 = x + 8 → 2x = 10 → x = 5.", "PA = 3·5 − 2 = 13."],
        optionReasons: [
          "Doğru: PA = PB = 13.",
          "5, x'in değeridir; istenen PA'dır.",
          "10 = 2x; denklemin ara adımıdır.",
          "8, x + 8 ifadesindeki sabittir.",
          "26 = PA + PB toplamıdır.",
        ],
        commonError: "x'i bulup cevap sanmak.",
        check: "PB = 5 + 8 = 13 = PA.",
      },
      {
        prompt: "Bir çembere A noktasında teğet olan d doğrusu ile AB kirişi arasındaki açı 42°'dir. Bu açının içinde kalan AB yayı kaç derecedir?",
        options: ["84", "42", "21", "138", "96"],
        knowledge: ["Teğet–kiriş açısı aradaki yayın yarısıdır."],
        strategy: "Yay = 2 · teğet–kiriş açısı.",
        steps: ["AB yayı = 2 · 42 = 84°."],
        optionReasons: [
          "Doğru: yay açının iki katıdır.",
          "42 açının kendisidir; yay iki katıdır.",
          "21 yarıya böler; ters yönde işlem yapar.",
          "138 = 180 − 42; teğet ile kiriş arasındaki öbür açıdır, o da başka yayı görür.",
          "96 = 2·(90 − 42); dik açıyla ilgisiz bir işlemdir.",
        ],
        commonError: "Teğet–kiriş açısını yaya eşit sanmak.",
        check: "Aynı yayı gören çevre açı da 42° olur.",
      },
      {
        prompt: "Bir çemberde AB ve CD kirişleri içeride P noktasında kesişiyor. APC açısının gördüğü AC yayı 100°, BPD açısının gördüğü BD yayı 40° ise APC açısı kaç derecedir?",
        options: ["70", "30", "140", "60", "50"],
        knowledge: ["İç açı, kendisinin ve ters açısının gördüğü yayların ortalamasıdır."],
        strategy: "(yay₁ + yay₂)/2 yaz.",
        steps: ["APC = (100 + 40)/2 = 70°."],
        optionReasons: [
          "Doğru: yayların toplamının yarısı.",
          "30 farkın yarısıdır; o dış açı formülüdür.",
          "140 yayları toplar ama yarıya bölmez.",
          "60 = 120/2; yanlış toplamdan gelir.",
          "50, yalnız 100° yayın yarısıdır; ikinci yay eksik.",
        ],
        commonError: "İç açıda fark, dış açıda toplam kullanmak (tersini karıştırmak).",
        check: "Sonuç 40 ile 100 arasındadır, ortalama mantıklı.",
      },
      {
        prompt: "Dıştaki P noktasından çizilen iki kesen çemberi keser; bu açının içinde kalan büyük yay 130°, küçük yay 30°'dir. P açısı kaç derecedir?",
        options: ["50", "80", "100", "65", "160"],
        knowledge: ["Köşesi dışarıda olan açı = (büyük yay − küçük yay)/2."],
        strategy: "Farkın yarısını al.",
        steps: ["P = (130 − 30)/2 = 50°."],
        optionReasons: [
          "Doğru: farkın yarısı.",
          "80 toplamın yarısıdır; o iç açı formülüdür.",
          "100 farkı yarıya bölmez.",
          "65, yalnız büyük yayın yarısıdır.",
          "160 iki yayı toplar.",
        ],
        commonError: "Dış açıda yayları toplamak.",
        check: "Dış açı, büyük yayın yarısından (65°) küçük olmalı.",
      },
      {
        prompt: "Yarıçapı 10 cm olan bir çemberde, merkezden 6 cm uzaklıktaki kirişin uzunluğu kaç cm'dir?",
        options: ["16", "8", "12", "√136", "20"],
        knowledge: ["Merkezden kirişe inen dikme kirişi ortalar.", "r² = d² + (c/2)²."],
        strategy: "Yarım kirişi Pisagor ile bul, iki katını al.",
        steps: ["(c/2)² = 100 − 36 = 64 → c/2 = 8.", "c = 16 cm."],
        optionReasons: [
          "Doğru: kiriş 2·8 = 16.",
          "8 kirişin yarısıdır.",
          "12, 6'nın iki katıdır; uzaklıkla kirişi karıştırır.",
          "√136 = √(100 + 36); kareleri toplar, çıkarmak gerekir.",
          "20 çaptır; yalnız merkezden geçen kiriş çaptır.",
        ],
        commonError: "Pisagorda yarım kirişi tam kiriş sanmak.",
        check: "16 < 20: kiriş çaptan kısa olmalı.",
      },
      {
        prompt: "Bir çemberde AB ve CD kirişleri içeride P noktasında kesişiyor. PA = 3, PB = 8, PC = 4 ise PD kaçtır?",
        options: ["6", "7", "2", "32/3", "12"],
        knowledge: ["Kesişen kirişlerde PA·PB = PC·PD."],
        strategy: "Çarpımları eşitle.",
        steps: ["3·8 = 4·PD → PD = 24/4 = 6."],
        optionReasons: [
          "Doğru: 24/4 = 6.",
          "7, 3 + 8 − 4; toplama–çıkarma bağıntısı yoktur.",
          "2 = 8/4; PA'yı hesaba katmaz.",
          "32/3 = 4·8/3; parçaları yanlış eşler.",
          "12 = 3·4; karşılıklı parçaları çarpar.",
        ],
        commonError: "Aynı kirişin parçalarını çarpmak yerine karşılıklı parçaları çarpmak.",
        check: "4·6 = 24 = 3·8.",
      },
      {
        prompt: "Dıştaki P noktasından çizilen PT teğeti T'de değiyor. Aynı noktadan çizilen kesen çemberi önce A, sonra B'de kesiyor. PA = 4 ve AB = 5 ise PT kaçtır?",
        options: ["6", "√20", "20", "9", "36"],
        knowledge: ["Teğet–kesen bağıntısı: PT² = PA·PB.", "PB = PA + AB bütün kesendir."],
        strategy: "Önce bütün keseni bul, sonra çarpımı karekökle.",
        steps: ["PB = 4 + 5 = 9.", "PT² = 4·9 = 36 → PT = 6."],
        optionReasons: [
          "Doğru: √36 = 6.",
          "√20 = √(4·5); bütün kesen yerine iç parça AB kullanılmış.",
          "20 = 4·5 hem yanlış parçayı çarpar hem karekök almaz.",
          "9 bütün kesen PB'dir; teğet uzunluğu değildir.",
          "36, PT²'dir; karekök alınmamış.",
        ],
        commonError: "PA·AB yazmak; dış parça bütün kesenle çarpılır.",
        check: "6² = 36 = 4·9.",
      },
      {
        prompt: "ABCD kirişler dörtgeninde A açısı 3x, C açısı x + 40 derecedir. A açısı kaç derecedir?",
        options: ["105", "35", "75", "120", "60"],
        knowledge: ["Kirişler dörtgeninde karşı açıların toplamı 180°'dir."],
        strategy: "A + C = 180 denklemini kur.",
        steps: ["3x + x + 40 = 180 → 4x = 140 → x = 35.", "A = 3·35 = 105°."],
        optionReasons: [
          "Doğru: A = 105°, C = 75°.",
          "35, x'tir; istenen A'dır.",
          "75, C açısıdır.",
          "120 karşı açıların eşit olduğu sanılarak bulunur.",
          "60, A + C = 360 sanılıp yanlış çözümden gelir.",
        ],
        commonError: "Karşı açıları eşit sanmak (o paralelkenarda geçerlidir).",
        check: "105 + 75 = 180.",
      },
    ],
    source:
      "Resmî konu listesi TYT-GEO-13 (çemberde açı, kiriş ve teğet) ve MEB ortaöğretim geometri kazanımlarından kavramlar. Anlatım, örnekler ve sorular özgündür; resmî ÖSYM sorusu değildir.",
    sheet: {
      sections: [
        { title: "Açının köşesi nerede?", text: ["Merkezde: açı = yay. Çember üzerinde (çevre açı, teğet–kiriş): açı = yay/2. İçeride: (yay₁ + yay₂)/2. Dışarıda: (büyük − küçük)/2."] },
        { title: "Dik açı veren durumlar", text: ["Çapı gören çevre açı 90°. Teğet ⟂ teğet noktasındaki yarıçap. Merkezden kirişe dikme kirişi ortalar."] },
        { title: "Uzunluk bağıntıları", text: ["Teğet: t² + r² = d². Kiriş: r² = d² + (c/2)². Dıştan iki teğet eşit: PA = PB.", "Kesişen kirişler: PA·PB = PC·PD. Teğet–kesen: PT² = PA·PB (dış parça · bütün kesen)."] },
        { title: "Dörtgen ve teğetler", text: ["Kirişler dörtgeni: karşı açılar toplamı 180°. İki teğet arası açı = 180° − küçük yay."] },
      ],
      cautions: ["Çevre açı merkez açının yarısıdır, eşiti değil.", "İç açıda yaylar toplanır, dış açıda çıkarılır.", "Teğet–kesende iç parça değil bütün kesen çarpılır."],
    },
  },
  {
    id: "tyt-geo-daire-040",
    title: "Daire, daire dilimi, çevre ve alan",
    minutes: 55,
    objectives: [
      "Çemberin uzunluğunu (çevre) dairenin alanından ayır; π sayısının neyi oranladığını açıkla.",
      "Yay uzunluğunu ve daire dilimi alanını merkez açının 360°'ye oranıyla hesapla.",
      "Halka ve daire parçası gibi bölgeleri ekleme–çıkarma ile bul.",
      "Yarıçap k katına çıkınca çevrenin k, alanın k² katına çıktığını kullan.",
    ],
    sections: [
      {
        title: "Çember bir çizgi, daire bir bölgedir",
        paragraphs: [
          "Çember, merkezden r uzaklıktaki noktaların oluşturduğu kapalı eğridir; uzunluğu vardır ve bu uzunluğa çemberin çevresi denir (birimi cm, m). Daire ise çemberin sınırladığı iç bölgedir; kapladığı yer alanıdır (birimi cm², m²).",
          "Soru “çevre” veya “uzunluk” diyorsa bir boyutlu, “alan” diyorsa iki boyutlu bir büyüklük istenir. Bir telin çember biçiminde bükülmesi çevre, bir pizzanın üstüne sürülen sos alan sorusudur.",
        ],
      },
      {
        title: "π, çevrenin çapa oranıdır",
        paragraphs: [
          "Hangi büyüklükte olursa olsun her çemberin çevresini çapına böldüğünde aynı sayıyı bulursun: π ≈ 3,14. Bu yüzden Ç = π·2r = 2πr olur. Yarıçapı 5 olan çemberin çevresi 10π ≈ 31,4'tür.",
          "YKS soruları çoğunlukla π'yi sembol olarak bırakır (10π gibi) ya da π = 3 almanı söyler. Soruda verilmeyen bir yaklaşık değeri kendin seçme; şıklarda π görünüyorsa sonucu π'li bırak.",
        ],
      },
      {
        title: "Daire alanını dilimlerden kur",
        paragraphs: [
          "Daireyi pasta gibi çok sayıda eş dilime böl ve dilimleri bir yukarı bir aşağı bakacak biçimde yan yana diz. Dilim sayısı arttıkça şekil, bir kenarı yarım çevre (πr), yüksekliği yarıçap (r) olan bir dikdörtgene yaklaşır. Alanı: πr · r = πr².",
          "Yarıçapı 4 olan dairenin alanı 16π'dir. Çap verildiyse önce yarıya böl: çapı 10 olan dairenin alanı 25π'dir, 100π değil.",
        ],
      },
      {
        title: "Yay uzunluğu açıyla orantılıdır",
        paragraphs: [
          "Merkez açı α olan yay, çemberin α/360'lık kısmıdır. Bu yüzden yay uzunluğu ℓ = 2πr · α/360 olur. Yarıçapı 6, merkez açısı 60° olan yayın uzunluğu 2π·6·(60/360) = 2π'dir.",
          "Yayın derece ölçüsü (60°) ile uzunluğu (2π) farklı büyüklüklerdir. Aynı 60°'lik yay, yarıçap büyüdükçe uzar.",
        ],
      },
      {
        title: "Daire dilimi alanı da aynı oranla bulunur",
        paragraphs: [
          "İki yarıçap ile aradaki yayın sınırladığı bölge daire dilimidir. Alanı, daire alanının α/360'lık kısmıdır: A = πr² · α/360. Yarıçapı 6, açısı 60° olan dilimin alanı 36π/6 = 6π'dir.",
          "Kısa yol: dilim alanı = yay uzunluğu × yarıçap / 2. Yukarıdaki dilimde ℓ = 2π, r = 6 olduğundan A = 2π·6/2 = 6π. Dilim çevresi ise iki yarıçap ve yaydan oluşur: 6 + 6 + 2π.",
        ],
      },
      {
        title: "Halka: büyükten küçüğü çıkar",
        paragraphs: [
          "Aynı merkezli iki çember arasında kalan bölgeye daire halkası denir. Alanı büyük dairenin alanından küçüğünün alanını çıkararak bulunur: π(R² − r²). R = 5, r = 3 ise halka alanı π(25 − 9) = 16π'dir.",
          "Halka alanı π(R − r)² değildir; önce kareleri al, sonra çıkar. Büyük çemberin, küçük çembere teğet olan kirişinin yarısı t ise t² = R² − r² olduğundan halka alanı πt² olarak da yazılır.",
        ],
      },
      {
        title: "Daire parçası: dilimden üçgeni çıkar",
        paragraphs: [
          "Bir kiriş ile yayın sınırladığı bölge daire parçasıdır. Alanı = dilim alanı − iki yarıçap ve kirişin oluşturduğu üçgenin alanı. Yarıçapı 6, açısı 90° olan dilim 9π, üçgen 6·6/2 = 18 olduğundan parça alanı 9π − 18 olur.",
          "Açı 60° ise üçgen eşkenardır ve alanı r²√3/4 olur. Açı 90° ise üçgen dik ikizkenardır. Üçgenin türünü merkez açıdan tanı.",
        ],
      },
      {
        title: "Yarıçap k katına çıkınca",
        paragraphs: [
          "Bütün uzunluklar gibi çevre de yarıçapla aynı oranda büyür: yarıçap 3 katına çıkarsa çevre 3 katına çıkar. Alan ise iki boyutlu olduğu için k² katına çıkar: yarıçap 3 katı → alan 9 katı.",
          "Aynı açılı iki dilimde de bu kural geçerlidir. Bir dairenin alanı 4 katına çıkmışsa yarıçapı 2 katına, çevresi 2 katına çıkmıştır.",
        ],
      },
      {
        title: "Boyalı alan sorusunu ekle–çıkar ile çöz",
        paragraphs: [
          "Karmaşık görünen boyalı bölgeleri bildiğin parçalara ayır: kare, üçgen, dilim, yarım daire. İstenen bölge = bütün şekil − boyasız parçalar ya da bir dilim + bir üçgen gibi toplamlar.",
          "Örnek: kenarı 4 olan karenin içine, bir köşesi merkez olan çeyrek daire (r = 4) çizilirse kare içinde çeyrek dairenin dışında kalan alan 16 − 4π olur. Simetri varsa bir parçayı bulup kaç kez tekrar ettiğini say.",
        ],
      },
      {
        title: "Daire sorusunu adım adım çöz",
        paragraphs: [
          "1) Çevre mi alan mı soruluyor? 2) Yarıçapı bul (çap verildiyse yarıya böl). 3) Bölgenin bütün dairenin kaçta kaçı olduğunu merkez açıdan oku (α/360). 4) Gerekirse üçgen, kare gibi parçaları ekle veya çıkar.",
          "5) Birim ve π kontrolü: alan cm², çevre cm olmalı; şıklarda π varsa π'li bırak. 6) Mantık kontrolü: dilim alanı bütün daireden küçük, halka alanı büyük daireden küçük olmalı.",
        ],
      },
    ],
    examples: [
      {
        title: "Dilim alanı ve çevresi",
        prompt: "Yarıçapı 6 cm, merkez açısı 120° olan bir daire diliminin alanı ve çevresi nedir? (Sonuçları π'li bırak.)",
        strategy: "Önce dilimin bütün dairenin kaçta kaçı olduğunu bul.",
        steps: [
          { label: "Oran", explanation: "120/360 = 1/3." },
          { label: "Alan", explanation: "A = π·6²·(1/3) = 36π/3 = 12π cm²." },
          { label: "Çevre", explanation: "Yay = 2π·6·(1/3) = 4π; dilim çevresi = 6 + 6 + 4π = 12 + 4π cm." },
        ],
        answer: "Alan 12π cm², çevre 12 + 4π cm.",
        check: "Kısa yol: ℓ·r/2 = 4π·6/2 = 12π ✓.",
        pitfall: "Dilim çevresine iki yarıçapı eklemeyi unutma.",
      },
      {
        title: "Halka alanı",
        prompt: "Aynı merkezli iki çemberin yarıçapları 7 ve 3'tür. Aralarındaki halkanın alanı kaç π'dir?",
        strategy: "Büyük daire alanından küçüğünü çıkar.",
        steps: [
          { label: "Kareler", explanation: "7² = 49, 3² = 9." },
          { label: "Fark", explanation: "π(49 − 9) = 40π." },
        ],
        answer: "40π",
        check: "π(7 − 3)² = 16π olurdu; bu yanlış yol halka alanını küçük gösterir.",
        pitfall: "Yarıçapları çıkarıp sonra kare alma.",
      },
      {
        title: "Kare içinde çeyrek daire",
        prompt: "Kenarı 4 cm olan ABCD karesinde, merkezi A ve yarıçapı 4 cm olan çeyrek daire çiziliyor. Karenin, çeyrek dairenin dışında kalan bölgesinin alanı nedir?",
        strategy: "Kare alanından çeyrek daire alanını çıkar.",
        steps: [
          { label: "Kare", explanation: "4·4 = 16 cm²." },
          { label: "Çeyrek daire", explanation: "π·4²/4 = 4π cm²." },
          { label: "Fark", explanation: "16 − 4π cm²." },
        ],
        answer: "16 − 4π cm²",
        check: "π ≈ 3,14 ile 16 − 12,56 ≈ 3,44: karenin küçük bir köşe parçası, mantıklı.",
        pitfall: "Çeyrek daire yerine tam daire alanını (16π) çıkarmak negatif sonuç verir.",
      },
    ],
    recall: [
      { prompt: "Çevre ile alanın formüllerini ve birimlerini söyle.", answer: "Çevre 2πr (cm), alan πr² (cm²)." },
      { prompt: "Merkez açısı α olan dilimin alanı neye eşittir?", answer: "πr²·α/360; ya da yay uzunluğu × r / 2." },
      { prompt: "Halka alanı neden π(R − r)² değildir?", answer: "Alanlar çıkarılır: πR² − πr² = π(R² − r²); önce kareler alınır." },
      { prompt: "Yarıçap 3 katına çıkınca çevre ve alan kaç katına çıkar?", answer: "Çevre 3, alan 9 katına." },
    ],
    items: [
      {
        prompt: "Yarıçapı 5 cm olan bir çemberin çevresi kaç cm'dir?",
        options: ["10π", "25π", "5π", "20π", "100π"],
        knowledge: ["Çevre = 2πr."],
        strategy: "Yarıçapı formüle yaz.",
        steps: ["Ç = 2·π·5 = 10π cm."],
        optionReasons: ["Doğru: 2πr.", "25π alandır (πr²).", "5π, 2 çarpanını unutur.", "20π, çapı yarıçap yerine koyup 2 ile çarpar.", "100π, çapın karesini alır."],
        commonError: "Çevre ile alanı karıştırmak.",
        check: "Birim cm, π katsayısı çap kadar (10).",
      },
      {
        prompt: "Çapı 12 cm olan bir dairenin alanı kaç cm²'dir?",
        options: ["36π", "144π", "12π", "24π", "6π"],
        knowledge: ["Alan = πr².", "Yarıçap = çap/2."],
        strategy: "Önce yarıçapı bul.",
        steps: ["r = 12/2 = 6.", "A = π·6² = 36π."],
        optionReasons: ["Doğru: r = 6.", "144π, çapı yarıçap sanır.", "12π, çevredir (2πr).", "24π, çapın iki katını alır.", "6π, kare almayı unutur."],
        commonError: "Çapı yarıçap yerine koymak.",
        check: "36π ≈ 113 cm²; 12×12 karenin (144) içinde kalır.",
      },
      {
        prompt: "Yarıçapı 9 cm olan bir çemberde merkez açısı 40° olan yayın uzunluğu kaç cm'dir?",
        options: ["2π", "9π", "4π", "18π", "π"],
        knowledge: ["Yay = 2πr·α/360."],
        strategy: "Oranı sadeleştir: 40/360 = 1/9.",
        steps: ["2π·9 = 18π (tam çevre).", "18π·(1/9) = 2π."],
        optionReasons: ["Doğru: 18π/9.", "9π, dilim alanının (81π/9) değeridir.", "4π, 40'ı 10'a bölüp kullanır.", "18π, tam çevredir.", "π, oranı iki kez uygular."],
        commonError: "Yay uzunluğu yerine dilim alanını hesaplamak.",
        check: "40° çemberin 1/9'u; yay da çevrenin 1/9'u.",
      },
      {
        prompt: "Yarıçapı 6 cm, merkez açısı 90° olan daire diliminin alanı kaç cm²'dir?",
        options: ["9π", "3π", "36π", "18π", "12π"],
        knowledge: ["Dilim alanı = πr²·α/360."],
        strategy: "90° dairenin dörtte biri.",
        steps: ["π·36·(1/4) = 9π."],
        optionReasons: ["Doğru.", "3π, çeyrek yayın uzunluğudur (12π/4).", "36π, bütün dairedir.", "18π, yarım dairedir.", "12π, tam çevredir."],
        commonError: "Yay uzunluğu ile dilim alanını karıştırmak.",
        check: "ℓ·r/2 = 3π·6/2 = 9π ✓.",
      },
      {
        prompt: "Bir daire diliminin yay uzunluğu 5π cm ve yarıçapı 8 cm'dir. Dilimin alanı kaç cm²'dir?",
        options: ["20π", "40π", "64π", "10π", "13π"],
        knowledge: ["Dilim alanı = yay uzunluğu × yarıçap / 2."],
        strategy: "Açıyı bulmadan kısa yolu kullan.",
        steps: ["A = 5π·8/2 = 20π."],
        optionReasons: ["Doğru.", "40π, 2'ye bölmeyi unutur.", "64π, bütün dairenin alanıdır.", "10π, yarıçapı iki kez bölmekten gelir.", "13π, 5 ile 8'i toplar."],
        commonError: "Kısa yolda /2'yi unutmak.",
        check: "Açı: 5π = 16π·α/360 → α = 112,5°; alan 64π·112,5/360 = 20π ✓.",
      },
      {
        prompt: "Aynı merkezli iki çemberin yarıçapları 6 cm ve 4 cm'dir. Aralarındaki halkanın alanı kaç cm²'dir?",
        options: ["20π", "4π", "52π", "10π", "2π"],
        knowledge: ["Halka alanı = π(R² − r²)."],
        strategy: "Önce kareleri al, sonra çıkar.",
        steps: ["π(36 − 16) = 20π."],
        optionReasons: ["Doğru.", "4π = π(6 − 4)²; önce çıkarıp sonra kare alır.", "52π, alanları toplar.", "10π, R + r ile çarpıp yarıya böler.", "2π, yarıçap farkıdır."],
        commonError: "(R − r)² yazmak.",
        check: "20π, büyük daireden (36π) küçük olmalı ✓.",
      },
      {
        prompt: "Bir çemberin yarıçapı 3 katına çıkarılırsa dairenin alanı kaç katına çıkar?",
        options: ["9", "3", "6", "27", "1,5"],
        knowledge: ["Alan yarıçapın karesiyle orantılıdır."],
        strategy: "k katı → alan k² katı.",
        steps: ["3² = 9."],
        optionReasons: ["Doğru.", "3, çevrenin artışıdır.", "6, 3'ü 2 ile çarpar.", "27, hacim (k³) mantığıdır.", "1,5, yarıçapı yarıya böler."],
        commonError: "Alanı da yarıçapla aynı oranda artırmak.",
        check: "r = 1 → π; r = 3 → 9π.",
      },
      {
        prompt: "Kenarı 6 cm olan ABCD karesinde, merkezi A ve yarıçapı 6 cm olan çeyrek daire çiziliyor. Karenin, çeyrek dairenin dışında kalan bölgesinin alanı kaç cm²'dir?",
        options: ["36 − 9π", "36 − 36π", "9π", "36 − 6π", "9π − 36"],
        knowledge: ["Çeyrek daire alanı = πr²/4."],
        strategy: "Kare alanından çeyrek daireyi çıkar.",
        steps: ["Kare = 36.", "Çeyrek daire = 36π/4 = 9π.", "36 − 9π."],
        optionReasons: ["Doğru.", "36 − 36π, tam daireyi çıkarır; negatif çıkar.", "9π, çeyrek dairenin kendisidir.", "36 − 6π, çeyrek yayın uzunluğunu (3π) iki katıyla karıştırır.", "9π − 36 negatif bir değerdir (π ≈ 3,14)."],
        commonError: "Tam daire alanını çıkarmak.",
        check: "36 − 28,26 ≈ 7,7 > 0 ✓.",
      },
      {
        prompt: "Yarıçapı 4 cm olan bir çemberde AOB merkez açısı 90°'dir. AB kirişi ile küçük AB yayı arasında kalan daire parçasının alanı kaç cm²'dir?",
        options: ["4π − 8", "4π", "8", "16π − 8", "4π − 16"],
        knowledge: ["Daire parçası = dilim − üçgen.", "90° dilimde AOB dik ikizkenar üçgendir."],
        strategy: "Dilim alanından üçgen alanını çıkar.",
        steps: ["Dilim = 16π/4 = 4π.", "Üçgen = 4·4/2 = 8.", "Parça = 4π − 8."],
        optionReasons: ["Doğru.", "4π, üçgeni çıkarmaz.", "8, yalnız üçgendir.", "16π − 8, bütün daireden çıkarır.", "4π − 16, üçgen alanında 1/2'yi unutur."],
        commonError: "Üçgen alanını tam kare gibi almak.",
        check: "4·3,14 − 8 ≈ 4,56 > 0 ✓.",
      },
      {
        prompt: "Çevresi 14π cm olan bir dairenin alanı kaç cm²'dir?",
        options: ["49π", "14π", "196π", "28π", "7π"],
        knowledge: ["2πr = çevre.", "Alan = πr²."],
        strategy: "Çevreden yarıçapı bul.",
        steps: ["2πr = 14π → r = 7.", "A = 49π."],
        optionReasons: ["Doğru.", "14π, çevrenin kendisidir.", "196π, 14'ü yarıçap sanır.", "28π, çevreyi iki katına çıkarır.", "7π, yarıçapın π katıdır."],
        commonError: "Çevre değerini yarıçap sanmak.",
        check: "r = 7 → çevre 14π ✓.",
      },
      {
        prompt: "Yarıçapları 2 cm ve 6 cm olan iki dairenin alanları oranı (küçük/büyük) kaçtır?",
        options: ["1/9", "1/3", "1/6", "1/27", "1/4"],
        knowledge: ["Alanlar oranı yarıçaplar oranının karesidir."],
        strategy: "(2/6)² hesapla.",
        steps: ["2/6 = 1/3.", "(1/3)² = 1/9."],
        optionReasons: ["Doğru.", "1/3, çevreler oranıdır.", "1/6, 2'yi 12'ye böler.", "1/27, küp alır.", "1/4, yanlış sadeleştirmedir."],
        commonError: "Alan oranını uzunluk oranıyla aynı sanmak.",
        check: "4π / 36π = 1/9 ✓.",
      },
      {
        prompt: "Yarıçapı 10 cm olan bir dairenin 72°'lik diliminin çevresi kaç cm'dir?",
        options: ["20 + 4π", "4π", "20π", "10 + 4π", "20 + 20π"],
        knowledge: ["Dilim çevresi = iki yarıçap + yay."],
        strategy: "Yayı bul, iki yarıçapı ekle.",
        steps: ["Yay = 2π·10·(72/360) = 20π/5 = 4π.", "Çevre = 10 + 10 + 4π = 20 + 4π."],
        optionReasons: ["Doğru.", "4π, yalnız yaydır.", "20π, tam çevredir.", "10 + 4π, tek yarıçap ekler.", "20 + 20π, tam çevreyi ekler."],
        commonError: "Dilim çevresinde yarıçapları unutmak.",
        check: "72° = 1/5 tur; yay çevrenin (20π) 1/5'i.",
      },
    ],
    source:
      "Resmî konu listesi TYT-GEO-14 (daire, daire dilimi, çevre ve alan) ve MEB ortaöğretim geometri kazanımlarından kavramlar. Anlatım, örnekler ve sorular özgündür; resmî ÖSYM sorusu değildir.",
    sheet: {
      sections: [
        { title: "Temel", text: ["Çevre = 2πr (uzunluk), alan = πr² (alan birimi). Çap verildiyse önce yarıya böl."] },
        { title: "Dilim ve yay", text: ["Yay = 2πr·α/360; dilim alanı = πr²·α/360 = yay·r/2; dilim çevresi = 2r + yay."] },
        { title: "Halka ve parça", text: ["Halka = π(R² − r²). Daire parçası = dilim − üçgen (90°: r²/2; 60°: r²√3/4)."] },
        { title: "Benzerlik", text: ["Yarıçap k katına çıkınca çevre ve yay uzunluğu k katına, alan ve dilim alanı k² katına çıkar."] },
      ],
      cautions: ["Halka alanı π(R − r)² değildir.", "Dilim çevresine iki yarıçap eklenir.", "Şıklarda π varsa yaklaşık değer kullanma."],
    },
  },
  {
    id: "tyt-geo-silindir-koni-kure-040",
    title: "Silindir, koni ve küre",
    minutes: 60,
    objectives: [
      "Silindir, koni ve kürenin hacim ve yüzey alanını açınım ve taban alanı fikrinden kur.",
      "Koninin yüksekliği, taban yarıçapı ve ana doğrusu arasındaki dik üçgeni kullan; açınımdaki dilim açısını bul.",
      "Aynı yarıçap ve yükseklikte silindir, küre ve koni hacimlerinin 3 : 2 : 1 oranını yorumla.",
      "Batırılan cisim ve su seviyesi, paralel kesit ve benzer cisim sorularını hacim eşitliğiyle çöz.",
    ],
    sections: [
      {
        title: "Silindir: daire tabanlı dik prizma gibi",
        paragraphs: [
          "Dik silindir, yarıçapı r olan iki eş ve paralel daire taban ile bunları birleştiren eğri yan yüzeyden oluşur; tabanlar arasındaki dik uzaklık h yüksekliktir. Prizmadaki gibi hacim taban alanı çarpı yüksekliktir: V = πr²h.",
          "r = 3, h = 5 ise V = π·9·5 = 45π. Yarıçap yerine çap verilirse önce yarıya böl; çap 6 ise r = 3'tür.",
        ],
      },
      {
        title: "Silindirin açınımı bir dikdörtgen ve iki dairedir",
        paragraphs: [
          "Yan yüzeyi bir dikişten kesip düzleştirirsen eni taban çevresi 2πr, boyu h olan bir dikdörtgen elde edersin. Yanal alan = 2πrh. İki taban daireyi de eklersen toplam alan S = 2πr² + 2πrh = 2πr(r + h).",
          "Kapaksız bir bardakta yalnız bir taban vardır: πr² + 2πrh. Bir etiketin alanı yanal alandır; kutunun sacı ise toplam alandır.",
        ],
      },
      {
        title: "Koni: hacim silindirin üçte biri",
        paragraphs: [
          "Dik koni, daire taban ile tabanın merkezinin tam üstündeki tepe noktasından oluşur. Aynı taban ve yükseklikteki silindirin içine üç koni dolusu su sığar: V = πr²h/3.",
          "r = 3, h = 4 olan koninin hacmi π·9·4/3 = 12π'dir. 1/3 çarpanı yalnız sivri cisimlerde (koni, piramit) vardır; silindir ve prizmada yoktur.",
        ],
      },
      {
        title: "Ana doğru, yanal alan ve açınım açısı",
        paragraphs: [
          "Tepeyi taban çemberindeki bir noktaya bağlayan doğru parçası ana doğrudur (ℓ). Yükseklik, taban yarıçapı ve ana doğru dik üçgen oluşturur: ℓ² = r² + h². r = 3, h = 4 ise ℓ = 5.",
          "Koninin yan yüzü açıldığında yarıçapı ℓ olan bir daire dilimi olur. Dilimin yay uzunluğu taban çevresine (2πr) eşittir; bu yüzden yanal alan πrℓ ve dilim açısı α = 360°·r/ℓ olur. r = 3, ℓ = 5 için yanal alan 15π, açı 216°'dir. Toplam alan πr² + πrℓ.",
        ],
      },
      {
        title: "Küre: hacim 4πr³/3, alan 4πr²",
        paragraphs: [
          "Küre, merkezden r uzaklıktaki bütün uzay noktalarının oluşturduğu yüzeydir; içi kürenin hacmidir. Hacim V = 4πr³/3, yüzey alanı S = 4πr² olur. r = 3 için V = 36π, S = 36π (sayısal eşitlik yalnız r = 3'e özgüdür; birimleri farklıdır).",
          "Kürenin yüzey alanı, aynı yarıçaplı dört dairenin alanına eşittir. Yarım kürede hacim 2πr³/3; kapalı yarım kürenin toplam alanı eğri yüzey 2πr² ile taban dairesi πr²'nin toplamı, 3πr²'dir.",
        ],
      },
      {
        title: "Silindir : küre : koni = 3 : 2 : 1",
        paragraphs: [
          "Yarıçapı r ve yüksekliği 2r olan bir silindir düşün. İçine tam sığan kürenin hacmi 4πr³/3, aynı taban ve yükseklikteki koninin hacmi πr²·2r/3 = 2πr³/3, silindirin hacmi πr²·2r = 2πr³'tür. Oran 2πr³ : 4πr³/3 : 2πr³/3 = 3 : 2 : 1.",
          "Bu oran Arşimet'e atfedilir ve yalnız h = 2r koşulunda geçerlidir. Soru farklı bir yükseklik veriyorsa formüllerle ayrı ayrı hesapla.",
        ],
      },
      {
        title: "Batırılan cisim suyu yükseltir",
        paragraphs: [
          "Silindir biçimli, yarıçapı R olan kapta suya tamamen batırılan cismin hacmi, suyun yükselmesiyle oluşan silindir dilimin hacmine eşittir: V_cisim = πR²·Δh. Yarıçapı 3 olan küre, yarıçapı 6 olan kaba atılırsa 36π = 36π·Δh, Δh = 1 birim.",
          "Kap taşarsa ya da cisim yüzerse bu eşitlik doğrudan kullanılamaz; yalnız batan kısmın hacmi yer değiştirir. Soruda “tamamen batıyor” ve “taşmıyor” koşullarını ara.",
        ],
      },
      {
        title: "Paralel kesit ve benzer cisimler",
        paragraphs: [
          "Koniyi tabanına paralel bir düzlemle kesersen tepedeki küçük koni büyüğüne benzerdir. Yükseklik oranı k ise yarıçap oranı da k, taban alanı oranı k², hacim oranı k³ olur. Yüksekliğin yarısından kesilen küçük koninin hacmi büyüğün 1/8'idir; alttaki kesik koni 7/8'dir.",
          "Benzer iki silindir, iki küre veya iki koni için aynı kural geçerlidir: uzunluk k → alan k² → hacim k³. Yarıçapı 2 katına çıkan kürenin hacmi 8 katına çıkar.",
        ],
      },
      {
        title: "Dönel cisimleri şekilden tanı",
        paragraphs: [
          "Bir dikdörtgen bir kenarı etrafında döndürülürse silindir, dik üçgen bir dik kenarı etrafında döndürülürse koni, yarım daire çapı etrafında döndürülürse küre oluşur. Dönme ekseni olan kenar yükseklik, öbür kenar yarıçap olur.",
          "Dik kenarları 3 ve 4 olan dik üçgen, 4 birimlik kenar etrafında döndürülürse r = 3, h = 4 konisi (12π) oluşur; 3 birimlik kenar etrafında döndürülürse r = 4, h = 3 konisi (16π) oluşur. Ekseni yanlış seçmek farklı bir hacim verir.",
        ],
      },
      {
        title: "Katı cisim sorusunu adım adım çöz",
        paragraphs: [
          "1) Cismi ve ölçülerini tanı: r mi çap mı, h mi ana doğru mu? 2) Hacim mi, yanal alan mı, toplam alan mı isteniyor? 3) Gerekirse dik üçgenle eksik uzunluğu bul (ℓ² = r² + h²). 4) Formülü yaz, π'yi sembol olarak tut.",
          "5) Su, eritme, doldurma sorularında “hacim korunur” eşitliğini kur. 6) Benzerlikte k, k², k³ ayrımını kontrol et. 7) Birim kontrolü: hacim cm³, alan cm².",
        ],
      },
    ],
    examples: [
      {
        title: "Koninin bütün ölçüleri",
        prompt: "Taban yarıçapı 6 cm, yüksekliği 8 cm olan dik koninin ana doğrusu, hacmi, yanal alanı ve açınımındaki dilimin merkez açısı nedir?",
        strategy: "Önce dik üçgenden ana doğruyu bul; sonra formülleri sırayla uygula.",
        steps: [
          { label: "Ana doğru", explanation: "ℓ² = 6² + 8² = 100, ℓ = 10 cm." },
          { label: "Hacim", explanation: "V = π·36·8/3 = 96π cm³." },
          { label: "Yanal alan", explanation: "πrℓ = π·6·10 = 60π cm²." },
          { label: "Açınım açısı", explanation: "α = 360·r/ℓ = 360·6/10 = 216°." },
        ],
        answer: "ℓ = 10 cm, V = 96π cm³, yanal alan 60π cm², açı 216°.",
        check: "Dilim alanı πℓ²·α/360 = 100π·0,6 = 60π ✓.",
        pitfall: "Yanal alanda yükseklik (8) değil ana doğru (10) kullanılır.",
      },
      {
        title: "Batan küre",
        prompt: "Taban yarıçapı 4 cm olan silindir biçimli kapta su vardır. Yarıçapı 3 cm olan demir bilye suya tamamen batırılıyor ve su taşmıyor. Su seviyesi kaç cm yükselir?",
        strategy: "Kürenin hacmini, yükselen su silindirinin hacmine eşitle.",
        steps: [
          { label: "Küre hacmi", explanation: "4π·27/3 = 36π cm³." },
          { label: "Eşitlik", explanation: "π·4²·Δh = 36π → 16Δh = 36." },
          { label: "Çöz", explanation: "Δh = 36/16 = 2,25 cm." },
        ],
        answer: "2,25 cm",
        check: "16π·2,25 = 36π ✓.",
        pitfall: "Kabın yarıçapını değil bilyenin yarıçapını kullanmak.",
      },
      {
        title: "Döndürme ekseni",
        prompt: "Dik kenarları 5 cm ve 12 cm olan dik üçgen, 12 cm'lik dik kenarı etrafında 360° döndürülüyor. Oluşan cismin hacmi ve yanal alanı nedir?",
        strategy: "Dönme ekseni yüksekliktir; öbür dik kenar yarıçap.",
        steps: [
          { label: "Ölçüler", explanation: "h = 12, r = 5, ℓ = hipotenüs = 13." },
          { label: "Hacim", explanation: "π·25·12/3 = 100π cm³." },
          { label: "Yanal alan", explanation: "π·5·13 = 65π cm²." },
        ],
        answer: "V = 100π cm³, yanal alan 65π cm².",
        check: "Ana doğru, üçgenin hipotenüsüdür: 5–12–13.",
        pitfall: "Ekseni 5 cm sanırsan r = 12 olur ve hacim 240π çıkar.",
      },
    ],
    recall: [
      { prompt: "Silindir, koni ve kürenin hacim formüllerini söyle.", answer: "Silindir πr²h, koni πr²h/3, küre 4πr³/3." },
      { prompt: "Koninin yanal alanında hangi uzunluk kullanılır?", answer: "Ana doğru ℓ: yanal alan πrℓ; ℓ² = r² + h²." },
      { prompt: "Yüksekliğin yarısından paralel kesilen küçük koni, büyüğün hacminin kaçta kaçıdır?", answer: "(1/2)³ = 1/8." },
      { prompt: "Suya batan cismin hacmini nasıl bulursun?", answer: "Kap taban alanı × su seviyesindeki yükselme (tam batma ve taşmama koşuluyla)." },
    ],
    items: [
      {
        prompt: "Taban yarıçapı 3 cm, yüksekliği 10 cm olan dik silindirin hacmi kaç cm³'tür?",
        options: ["90π", "30π", "60π", "300π", "9π"],
        knowledge: ["Silindir hacmi = πr²h."],
        strategy: "Taban alanını yükseklikle çarp.",
        steps: ["Taban alanı π·3² = 9π.", "V = 9π·10 = 90π."],
        optionReasons: ["Doğru: πr²h.", "30π, koni hacmidir (1/3 çarpanı eklenmiş).", "60π, yanal alandır (2πrh).", "300π, yarıçapı karesi yerine 10 ile çarpar.", "9π, yalnız taban alanıdır."],
        commonError: "Silindir hacmine koninin 1/3 çarpanını eklemek.",
        check: "Birim cm³; taban alanı × yükseklik.",
      },
      {
        prompt: "Taban yarıçapı 4 cm, yüksekliği 5 cm olan kapalı dik silindirin toplam yüzey alanı kaç cm²'dir?",
        options: ["72π", "40π", "80π", "56π", "36π"],
        knowledge: ["Toplam alan = 2πr² + 2πrh."],
        strategy: "İki taban ve yanal alanı topla.",
        steps: ["İki taban: 2·16π = 32π.", "Yanal: 2π·4·5 = 40π.", "Toplam 72π."],
        optionReasons: ["Doğru.", "40π, yalnız yanal alandır.", "80π, hacimdir (16π·5).", "56π, tek taban ekler (16π + 40π), kapalı kutuda iki taban vardır.", "36π, tabanların alanı yerine 4 + 5'i π ile çarpıp 4 ile çarpar; anlamsız işlem."],
        commonError: "Kapalı silindirde tabanlardan birini unutmak.",
        check: "2πr(r + h) = 8π·9 = 72π ✓.",
      },
      {
        prompt: "Taban yarıçapı 6 cm, yüksekliği 8 cm olan dik koninin yanal alanı kaç cm²'dir?",
        options: ["60π", "48π", "96π", "36π", "80π"],
        knowledge: ["Yanal alan = πrℓ.", "ℓ² = r² + h²."],
        strategy: "Önce ana doğruyu bul.",
        steps: ["ℓ = √(36 + 64) = 10.", "πrℓ = π·6·10 = 60π."],
        optionReasons: ["Doğru.", "48π, ana doğru yerine yüksekliği (8) kullanır.", "96π, koninin hacmidir.", "36π, taban alanıdır.", "80π, ℓ yerine h ile ve r yerine ℓ ile çarpar (π·8·10)."],
        commonError: "Yanal alanda yüksekliği kullanmak.",
        check: "6–8–10 dik üçgeni; ℓ > h.",
      },
      {
        prompt: "Yarıçapı 3 cm olan bir kürenin hacmi kaç cm³'tür?",
        options: ["36π", "12π", "108π", "27π", "9π"],
        knowledge: ["Küre hacmi = 4πr³/3."],
        strategy: "r³'ü hesapla, 4/3 ile çarp.",
        steps: ["r³ = 27.", "4π·27/3 = 36π."],
        optionReasons: ["Doğru.", "12π, r² ile hesaplar (4π·9/3).", "108π, 3'e bölmeyi unutur.", "27π, 4/3 çarpanını unutur.", "9π, daire alanıdır."],
        commonError: "4/3 çarpanını eksik uygulamak.",
        check: "r = 3'te hacim ve alan sayısal olarak 36π çıkar; birimleri farklıdır.",
      },
      {
        prompt: "Taban yarıçapı 5 cm olan silindir biçimli kapta su vardır. Hacmi 100π cm³ olan bir taş suya tamamen batırılıyor ve su taşmıyor. Su seviyesi kaç cm yükselir?",
        options: ["4", "20", "10", "2", "5"],
        knowledge: ["Batan cismin hacmi = kap taban alanı × yükselme."],
        strategy: "100π = π·5²·Δh eşitliğini kur.",
        steps: ["25π·Δh = 100π.", "Δh = 4 cm."],
        optionReasons: ["Doğru.", "20, taban alanı yerine 5 ile böler.", "10, çapı (10) kullanır.", "2, taban alanını 50 sanır.", "5, yarıçapı cevap sanır."],
        commonError: "Taban alanı yerine yarıçap veya çapla bölmek.",
        check: "25π·4 = 100π ✓.",
      },
      {
        prompt: "Dik kenarları 3 cm ve 4 cm olan dik üçgen, 3 cm'lik dik kenarı etrafında 360° döndürülüyor. Oluşan cismin hacmi kaç cm³'tür?",
        options: ["16π", "12π", "48π", "36π", "25π"],
        knowledge: ["Dik üçgen bir dik kenarı etrafında dönünce koni oluşur.", "Dönme ekseni yüksekliktir."],
        strategy: "h = 3, r = 4 al.",
        steps: ["V = π·4²·3/3 = 16π."],
        optionReasons: ["Doğru: r = 4, h = 3.", "12π, ekseni 4 cm sanır (r = 3, h = 4).", "48π, 1/3 çarpanını unutur (silindir).", "36π, r = 3 alıp 1/3'ü unutur.", "25π, hipotenüsün karesini kullanır."],
        commonError: "Dönme eksenini yarıçap sanmak.",
        check: "Eksen 3 cm → yükseklik 3; öbür kenar yarıçap.",
      },
      {
        prompt: "Bir dik koni, yüksekliğinin tam ortasından tabanına paralel bir düzlemle kesiliyor. Tepedeki küçük koninin hacmi 5 cm³ ise kesik koninin (alt parçanın) hacmi kaç cm³'tür?",
        options: ["35", "5", "15", "40", "20"],
        knowledge: ["Benzer cisimlerde hacim oranı k³."],
        strategy: "k = 1/2 → küçük koni büyüğün 1/8'i.",
        steps: ["Büyük koni = 5·8 = 40.", "Kesik koni = 40 − 5 = 35."],
        optionReasons: ["Doğru.", "5, iki parçayı eşit sanır.", "15, hacim oranını k² (1/4) alır: 20 − 5.", "40, bütün koninin hacmidir.", "20, oranı k² alıp büyük koniyi bulur."],
        commonError: "Hacimde k² kullanmak.",
        check: "5/40 = 1/8 = (1/2)³ ✓.",
      },
      {
        prompt: "Yarıçapı r ve yüksekliği 2r olan bir silindirin içine tam sığan bir küre ve aynı taban ile yükseklikte bir koni düşünülüyor.\nI. Kürenin hacmi silindirin hacminin 2/3'üdür.\nII. Koninin hacmi kürenin hacminin yarısıdır.\nIII. Silindirin hacmi koninin hacminin 2 katıdır.\nifadelerinden hangileri doğrudur?",
        options: ["I ve II", "Yalnız I", "I ve III", "II ve III", "I, II ve III"],
        knowledge: ["Bu koşulda silindir : küre : koni = 3 : 2 : 1."],
        strategy: "Hacimleri 3k, 2k, k olarak yaz ve her öncülü sına.",
        steps: ["Silindir 2πr³, küre 4πr³/3, koni 2πr³/3.", "I: (4/3)/2 = 2/3 ✓.", "II: (2/3)/(4/3) = 1/2 ✓.", "III: 2/(2/3) = 3 kat; 2 kat değil ✗."],
        optionReasons: ["Doğru: I ve II sağlanır, III'te oran 3'tür.", "Yalnız I, II'nin de sağlandığını gözden kaçırır.", "I ve III, silindir–koni oranını 2 sanır.", "II ve III, I'i reddeder; oysa 2/3 doğrudur.", "I, II ve III, III'teki 3 kat oranını 2 sanır."],
        commonError: "Silindirin koninin 2 katı olduğunu sanmak; doğru oran 3'tür.",
        check: "3 : 2 : 1 oranından üç öncül de okunur.",
      },
      {
        prompt: "Taban yarıçapı 4 cm, ana doğrusu 12 cm olan dik koninin yan yüzü açılıyor. Açınımdaki daire diliminin merkez açısı kaç derecedir?",
        options: ["120", "30", "240", "90", "60"],
        knowledge: ["Dilimin yay uzunluğu = taban çevresi.", "α = 360·r/ℓ."],
        strategy: "r/ℓ oranını 360 ile çarp.",
        steps: ["α = 360·4/12 = 120°."],
        optionReasons: ["Doğru.", "30, 360'ı 12'ye böler; r'yi kullanmaz.", "240, oranı tersinden tamamlar (360 − 120).", "90, 4'ü 360'a oranlamak yerine çeyrek sanır.", "60, oranı yarıya böler."],
        commonError: "Oranı ℓ/r almak.",
        check: "Yay = 2π·12·(120/360) = 8π = 2π·4 ✓.",
      },
      {
        prompt: "Bir kürenin yarıçapı 2 katına çıkarılırsa yüzey alanı ve hacmi sırasıyla kaç katına çıkar?",
        options: ["4 ve 8", "2 ve 4", "2 ve 8", "4 ve 4", "8 ve 16"],
        knowledge: ["Benzerlikte alan k², hacim k³ katına çıkar."],
        strategy: "k = 2 için k² ve k³.",
        steps: ["Alan: 2² = 4.", "Hacim: 2³ = 8."],
        optionReasons: ["Doğru.", "2 ve 4, uzunluk ve alanı karıştırır.", "2 ve 8, alanı uzunluk gibi artırır.", "4 ve 4, hacmi de karesel sanır.", "8 ve 16, kuvvetleri bir derece kaydırır."],
        commonError: "Alan ile hacmin büyüme oranını karıştırmak.",
        check: "r = 1 → S = 4π, V = 4π/3; r = 2 → 16π, 32π/3.",
      },
      {
        prompt: "Yarıçapı 6 cm olan metal bir küre eritilip taban yarıçapı 6 cm olan dik silindir biçiminde döküm yapılıyor. Silindirin yüksekliği kaç cm olur? (Kayıp yok.)",
        options: ["8", "6", "24", "4", "12"],
        knowledge: ["Eritme–dökümde hacim korunur."],
        strategy: "Küre hacmini silindir hacmine eşitle.",
        steps: ["Küre: 4π·216/3 = 288π.", "Silindir: π·36·h = 288π → h = 8."],
        optionReasons: ["Doğru.", "6, yüksekliği yarıçapa eşit sanır.", "24, 3'e bölmeyi unutur.", "4, küre hacmini yanlışlıkla r² ile hesaplar.", "12, çapı yükseklik sanır."],
        commonError: "Hacim korunumunu kurmadan şekle bakıp tahmin etmek.",
        check: "36π·8 = 288π ✓.",
      },
      {
        prompt: "Kapaksız silindir biçimli bir bardağın taban yarıçapı 3 cm, yüksekliği 10 cm'dir. Bardağın dış yüzeyini (taban dahil) kaplamak için kaç cm² malzeme gerekir?",
        options: ["69π", "78π", "60π", "90π", "9π"],
        knowledge: ["Kapaksız silindirde bir taban vardır."],
        strategy: "Tek taban + yanal alan.",
        steps: ["Taban 9π.", "Yanal 2π·3·10 = 60π.", "Toplam 69π."],
        optionReasons: ["Doğru.", "78π, iki taban sayar; bardağın kapağı yok.", "60π, tabanı unutur.", "90π, hacimdir.", "9π, yalnız tabandır."],
        commonError: "Kapaksız kapta iki taban saymak.",
        check: "Günlük yaşam: bardakta ağız açık, taban kapalı.",
      },
    ],
    source:
      "Resmî konu listesi TYT-GEO-15 (prizma, piramit, silindir, koni ve küre) ve MEB ortaöğretim geometri kazanımlarından kavramlar. Anlatım, örnekler ve sorular özgündür; resmî ÖSYM sorusu değildir.",
    sheet: {
      sections: [
        { title: "Silindir", text: ["V = πr²h; yanal alan 2πrh (açınımda 2πr × h dikdörtgen); toplam 2πr² + 2πrh; kapaksız kapta tek taban."] },
        { title: "Koni", text: ["V = πr²h/3; ℓ² = r² + h²; yanal alan πrℓ; açınım dilim açısı 360°·r/ℓ; toplam πr² + πrℓ."] },
        { title: "Küre ve yarım küre", text: ["Küre V = 4πr³/3, S = 4πr². Yarım küre V = 2πr³/3, kapalı toplam alan 3πr²."] },
        { title: "Oran, kesit, su", text: ["h = 2r'de silindir : küre : koni = 3 : 2 : 1. Benzerlikte uzunluk k, alan k², hacim k³. Batan cisim hacmi = πR²·Δh (tam batma, taşma yok)."] },
      ],
      cautions: ["Koni yanal alanında yükseklik değil ana doğru kullanılır.", "Dönme ekseni yüksekliktir.", "Hacim oranında k³; alan oranında k²."],
    },
  },
  {
    id: "tyt-geo-trigonometrik-oranlar-040",
    title: "Dik üçgende trigonometrik oranlar",
    minutes: 50,
    objectives: [
      "Dik üçgende bir dar açıya göre karşı dik kenarı, komşu dik kenarı ve hipotenüsü ayır.",
      "sin, cos, tan ve cot oranlarını tanımla; oranların üçgenin büyüklüğüne değil açıya bağlı olduğunu açıkla.",
      "30°, 45° ve 60° özel açılarının oranlarını özel üçgenlerden türet.",
      "Tümler açı ilişkisini, sin²x + cos²x = 1 eşitliğini ve verilen bir orandan üçgen kurmayı kullan.",
    ],
    sections: [
      {
        title: "Kenarları açıya göre adlandır",
        paragraphs: [
          "Dik üçgende dik açının karşısındaki en uzun kenar hipotenüstür. Bir dar açı x seçtiğinde, x'in karşısındaki dik kenar “karşı”, x'in kolu olan dik kenar “komşu” kenardır.",
          "Aynı üçgende öbür dar açıya geçersen karşı ve komşu kenarlar yer değiştirir; hipotenüs değişmez. Bu yüzden oranı yazmadan önce hangi açıya baktığını işaretle.",
        ],
      },
      {
        title: "sin, cos, tan ve cot birer orandır",
        paragraphs: [
          "sin x = karşı / hipotenüs, cos x = komşu / hipotenüs, tan x = karşı / komşu, cot x = komşu / karşı. Kenarları 3, 4, 5 olan dik üçgende 3'ün karşısındaki x açısı için sin x = 3/5, cos x = 4/5, tan x = 3/4, cot x = 4/3.",
          "Hipotenüs en uzun kenar olduğundan dar açılarda sin ve cos 0 ile 1 arasındadır. tan ise 1'den büyük de olabilir. tan x · cot x = 1 ve tan x = sin x / cos x eşitlikleri tanımlardan doğrudan çıkar.",
        ],
      },
      {
        title: "Oran üçgenin boyutuna bağlı değildir",
        paragraphs: [
          "Aynı x açısına sahip bütün dik üçgenler benzerdir; kenarları aynı oranda büyür. Bu yüzden 3–4–5 üçgeninde sin x = 3/5 ise 6–8–10 üçgeninde de 6/10 = 3/5'tir.",
          "Trigonometrik oran, açının bir özelliğidir. Bu fikir, ölçemediğin bir yüksekliği bir açı ve bir uzunluk yardımıyla hesaplamanı sağlar.",
        ],
      },
      {
        title: "Özel açılar: 30°, 45°, 60°",
        paragraphs: [
          "İkizkenar dik üçgende dik kenarlar 1, hipotenüs √2'dir; bu yüzden sin 45° = cos 45° = √2/2 ve tan 45° = 1. Kenarı 2 olan eşkenar üçgeni yükseklikle ikiye bölünce kenarları 1, √3, 2 olan 30°–60°–90° üçgeni oluşur: sin 30° = 1/2, cos 30° = √3/2, tan 30° = √3/3; sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3.",
          "Ezberlemek yerine bu iki üçgeni çizebilmek yeterlidir. 30°'nin karşısındaki kenar hipotenüsün yarısıdır.",
        ],
        table: {
          headers: ["Açı", "sin", "cos", "tan"],
          rows: [
            ["30°", "1/2", "√3/2", "√3/3"],
            ["45°", "√2/2", "√2/2", "1"],
            ["60°", "√3/2", "1/2", "√3"],
          ],
        },
      },
      {
        title: "Tümler açılarda oranlar yer değiştirir",
        paragraphs: [
          "Dik üçgende iki dar açının toplamı 90°'dir. x'in karşı kenarı, (90° − x)'in komşu kenarıdır. Bu yüzden sin x = cos(90° − x) ve tan x = cot(90° − x) olur.",
          "Örnek: sin 20° = cos 70°, tan 35° = cot 55°. sin 20° / cos 70° gibi bir ifade doğrudan 1'dir; hesap makinesine gerek yoktur.",
        ],
      },
      {
        title: "sin²x + cos²x = 1",
        paragraphs: [
          "Hipotenüsü 1 alınan dik üçgende karşı kenar sin x, komşu kenar cos x olur. Pisagor bağıntısından sin²x + cos²x = 1 çıkar. Bu eşitlik bütün açılarda geçerlidir.",
          "sin x = 3/5 verilirse cos²x = 1 − 9/25 = 16/25, dar açı için cos x = 4/5. sin²x ifadesi (sin x)² demektir, sin(x²) değildir.",
        ],
      },
      {
        title: "Verilen bir orandan üçgeni kur",
        paragraphs: [
          "tan x = 5/12 verilirse karşı kenara 5k, komşu kenara 12k de; hipotenüs Pisagor ile 13k olur. Böylece sin x = 5/13, cos x = 12/13. k sadeleştiği için k = 1 almak yeterlidir.",
          "Bir oranı kesir gibi görüp pay ve paydayı doğrudan kenar uzunluğu sanma; yalnız oran bellidir. Gerçek uzunluk gerekiyorsa soruda verilen bir kenardan k'yi bul.",
        ],
      },
      {
        title: "Yükseklik ve uzaklık problemleri",
        paragraphs: [
          "Bir ağacın tepesine yerden x açısıyla bakılıyor ve ağaca uzaklık d ise ağacın yüksekliği h = d·tan x olur. Açının köşesi gözlemcidir; karşı kenar yükseklik, komşu kenar yerdeki uzaklıktır.",
          "Gözlemcinin göz yüksekliği verilirse bulduğun h'ye eklenir. Açının yere göre mi yoksa düşey doğrultuya göre mi ölçüldüğünü oku; tümler açıyla karıştırma.",
        ],
      },
      {
        title: "Trigonometri sorusunu adım adım çöz",
        paragraphs: [
          "1) Dik açıyı ve istenen açıyı işaretle. 2) Karşı, komşu ve hipotenüsü o açıya göre adlandır. 3) Verilen oranı kenarlara k ile yerleştir, eksik kenarı Pisagor ile bul. 4) İstenen oranı yaz.",
          "5) Özel açı varsa 30–60–90 veya 45–45–90 üçgenini çiz. 6) Denetim: sin ve cos 1'den küçük olmalı, sin²x + cos²x = 1 sağlanmalı.",
        ],
      },
    ],
    examples: [
      {
        title: "Bir orandan diğerlerine",
        prompt: "x dar açı olmak üzere cos x = 8/17 ise sin x ve tan x kaçtır?",
        strategy: "Komşu 8k, hipotenüs 17k al; karşı kenarı Pisagor ile bul.",
        steps: [
          { label: "Üçgeni kur", explanation: "Karşı² = 17² − 8² = 289 − 64 = 225, karşı = 15." },
          { label: "Oranlar", explanation: "sin x = 15/17, tan x = 15/8." },
        ],
        answer: "sin x = 15/17, tan x = 15/8",
        check: "(15/17)² + (8/17)² = (225 + 64)/289 = 1 ✓.",
        pitfall: "tan x'i karşı/hipotenüs sanma; tan = karşı/komşu.",
      },
      {
        title: "Ağacın yüksekliği",
        prompt: "Bir ağaca 20 m uzaklıktaki bir gözlemci, ağacın tepesine yerle 30° açı yaparak bakıyor (göz yüksekliği ihmal). Ağacın yüksekliği kaç m'dir? (tan 30° = √3/3)",
        strategy: "Yükseklik karşı, uzaklık komşu kenar: tan kullan.",
        steps: [
          { label: "Oran", explanation: "tan 30° = h / 20." },
          { label: "Çöz", explanation: "h = 20·√3/3 = 20√3/3 m (≈ 11,5 m)." },
        ],
        answer: "20√3/3 m",
        check: "30° küçük bir açı; yükseklik uzaklıktan kısa olmalı ✓.",
        pitfall: "sin 30° kullanmak uzaklığı hipotenüs saymak olur.",
      },
      {
        title: "Tümler açı",
        prompt: "sin 25° · tan 40° / (cos 65° · cot 50°) ifadesinin değeri kaçtır?",
        strategy: "Tümler açıları eşleştir.",
        steps: [
          { label: "Eşleme", explanation: "cos 65° = sin 25°, cot 50° = tan 40° (25 + 65 = 90, 40 + 50 = 90)." },
          { label: "Sadeleştir", explanation: "Pay ve payda aynıdır: değer 1." },
        ],
        answer: "1",
        check: "Her eşlemede açıların toplamı 90° ✓.",
        pitfall: "Değerleri hesap makinesiyle bulmaya çalışmak gereksiz ve hataya açık.",
      },
    ],
    recall: [
      { prompt: "sin, cos, tan tanımlarını söyle.", answer: "sin = karşı/hipotenüs, cos = komşu/hipotenüs, tan = karşı/komşu." },
      { prompt: "sin 30°, cos 60° ve tan 45° kaçtır?", answer: "1/2, 1/2 ve 1." },
      { prompt: "sin x ile cos(90° − x) neden eşittir?", answer: "x'in karşı kenarı, tümler açının komşu kenarıdır." },
      { prompt: "sin x = 3/5 ise cos x nasıl bulunur?", answer: "sin²x + cos²x = 1'den cos x = 4/5 (dar açı)." },
    ],
    items: [
      {
        prompt: "Dik kenarları 5 ve 12 olan bir dik üçgende, 5 birimlik kenarın karşısındaki x açısı için sin x kaçtır?",
        options: ["5/13", "12/13", "5/12", "12/5", "13/5"],
        knowledge: ["sin = karşı / hipotenüs.", "Hipotenüs Pisagor ile bulunur."],
        strategy: "Hipotenüsü bul, karşı kenara böl.",
        steps: ["Hipotenüs = √(25 + 144) = 13.", "sin x = 5/13."],
        optionReasons: ["Doğru.", "12/13, cos x'tir (komşu/hipotenüs).", "5/12, tan x'tir.", "12/5, cot x'tir.", "13/5, sin x'in tersidir; 1'den büyük olamaz."],
        commonError: "Karşı ile komşuyu karıştırmak.",
        check: "sin < 1 olmalı ✓.",
      },
      {
        prompt: "x dar açı ve tan x = 3/4 ise cos x kaçtır?",
        options: ["4/5", "3/5", "3/4", "5/4", "4/3"],
        knowledge: ["tan = karşı/komşu; cos = komşu/hipotenüs."],
        strategy: "Karşı 3k, komşu 4k, hipotenüs 5k.",
        steps: ["Hipotenüs 5k.", "cos x = 4k/5k = 4/5."],
        optionReasons: ["Doğru.", "3/5, sin x'tir.", "3/4, tan x'in kendisidir.", "5/4, cos x'in tersidir; 1'den büyük olamaz.", "4/3, cot x'tir."],
        commonError: "Oranı doğrudan kenar sanmak yerine k ile kurmamak.",
        check: "(3/5)² + (4/5)² = 1 ✓.",
      },
      {
        prompt: "sin 30° + cos 60° + tan 45° toplamı kaçtır?",
        options: ["2", "3/2", "5/2", "1", "√3"],
        knowledge: ["sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1."],
        strategy: "Özel üçgenlerden değerleri oku.",
        steps: ["1/2 + 1/2 + 1 = 2."],
        optionReasons: ["Doğru.", "3/2, tan 45°'i 1/2 alır.", "5/2, cos 60°'ı 3/2 sanır.", "1, iki terimi toplar, tan 45°'i unutur.", "√3, tan 60° ile karıştırır."],
        commonError: "30° ile 60° değerlerini karıştırmak.",
        check: "30–60–90 üçgeni: 1, √3, 2.",
      },
      {
        prompt: "Hipotenüsü 10 cm olan bir dik üçgende dar açılardan biri 30°'dir. Bu açının karşısındaki dik kenar kaç cm'dir?",
        options: ["5", "5√3", "10√3", "20", "5√2"],
        knowledge: ["30°'nin karşısındaki kenar hipotenüsün yarısıdır (sin 30° = 1/2)."],
        strategy: "Karşı = hipotenüs · sin 30°.",
        steps: ["10 · 1/2 = 5 cm."],
        optionReasons: ["Doğru.", "5√3, 60°'nin karşısındaki kenardır.", "10√3, hipotenüsten uzun olamaz.", "20, yarıya bölmek yerine ikiyle çarpar.", "5√2, 45° üçgeniyle karıştırır."],
        commonError: "30° ve 60° karşısındaki kenarları karıştırmak.",
        check: "Dik kenar hipotenüsten kısa ✓.",
      },
      {
        prompt: "sin 20° / cos 70° ifadesinin değeri kaçtır?",
        options: ["1", "0", "2", "tan 20°", "sin 50°"],
        knowledge: ["sin x = cos(90° − x)."],
        strategy: "20 + 70 = 90 olduğunu gör.",
        steps: ["cos 70° = sin 20°.", "Oran 1."],
        optionReasons: ["Doğru.", "0, farkla karıştırır.", "2, toplama gibi düşünür.", "tan 20° = sin 20°/cos 20°; payda cos 70°'tir.", "sin 50°, açıları çıkarır; oranla ilgisi yok."],
        commonError: "Tümler açı ilişkisini görmemek.",
        check: "Toplam 90° ✓.",
      },
      {
        prompt: "x dar açı ve sin x = 0,6 ise cos x kaçtır?",
        options: ["0,8", "0,4", "0,36", "0,64", "1,6"],
        knowledge: ["sin²x + cos²x = 1."],
        strategy: "cos²x = 1 − 0,36.",
        steps: ["cos²x = 0,64.", "Dar açıda cos x = 0,8."],
        optionReasons: ["Doğru.", "0,4 = 1 − 0,6; kareleri almadan çıkarır.", "0,36 = sin²x'tir.", "0,64 = cos²x'tir; karekök alınmamış.", "1,6 = 1 + 0,6; anlamsızdır, 1'den büyük olamaz."],
        commonError: "sin + cos = 1 sanmak.",
        check: "0,36 + 0,64 = 1 ✓.",
      },
      {
        prompt: "Bir merdiven duvara dayanmıştır. Merdivenin boyu 6 m ve yerle yaptığı açı 60°'dir. Merdivenin üst ucu yerden kaç m yüksektedir? (sin 60° = √3/2)",
        options: ["3√3", "3", "6√3", "2√3", "12"],
        knowledge: ["Yükseklik merdivenin (hipotenüs) karşı kenarıdır."],
        strategy: "h = 6 · sin 60°.",
        steps: ["h = 6·√3/2 = 3√3 m."],
        optionReasons: ["Doğru.", "3, cos 60° ile yerdeki uzaklığı bulur.", "6√3, 2'ye bölmeyi unutur; merdivenden uzun olamaz.", "2√3, tan 30° ile yanlış oran kurar.", "12, hipotenüsü iki katına çıkarır."],
        commonError: "Yüksekliği bulurken cos kullanmak.",
        check: "3√3 ≈ 5,2 < 6 ✓.",
      },
      {
        prompt: "Bir dik üçgende dar açılar x ve y'dir.\nI. sin x = cos y\nII. tan x · tan y = 1\nIII. sin x + cos x = 1\nifadelerinden hangileri her zaman doğrudur?",
        options: ["I ve II", "Yalnız I", "Yalnız III", "I ve III", "I, II ve III"],
        knowledge: ["x + y = 90°.", "tan x = cot y."],
        strategy: "Her öncülü tümler açı ve Pisagor ile sına.",
        steps: ["I: x + y = 90° → sin x = cos y ✓.", "II: tan y = cot x → tan x·cot x = 1 ✓.", "III: 3–4–5 üçgeninde 3/5 + 4/5 = 7/5 ≠ 1 ✗; doğru olan sin² + cos² = 1."],
        optionReasons: ["Doğru: I ve II sağlanır, III yanlış.", "Yalnız I, II'nin de tümler açıdan çıktığını gözden kaçırır.", "Yalnız III, karelerle olan eşitliği karelersiz sanır.", "I ve III, III'ü doğru sanır.", "I, II ve III, III'teki kare eksikliğini görmez."],
        commonError: "sin²x + cos²x = 1 yerine sin x + cos x = 1 yazmak.",
        check: "III için tek bir karşı örnek yeter.",
      },
      {
        prompt: "ABC dik üçgeninde A açısı 90°, AB = 6 ve tan C = 3/4'tür. BC kaçtır?",
        options: ["10", "8", "12", "7,5", "14"],
        knowledge: ["C açısına göre AB karşı, AC komşu kenardır."],
        strategy: "tan C = AB/AC'den AC'yi, sonra Pisagor ile BC'yi bul.",
        steps: ["6/AC = 3/4 → AC = 8.", "BC = √(36 + 64) = 10."],
        optionReasons: ["Doğru.", "8, AC'dir; istenen hipotenüs.", "12, AC'yi yanlış orantıdan (6·2) bulur.", "7,5, tan C'yi AC/AB sanıp AC = 4,5 bulur ve hipotenüsü buna göre hesaplar.", "14, kenarları toplar."],
        commonError: "C açısına göre karşı ve komşu kenarı ters seçmek.",
        check: "6–8–10 ✓.",
      },
      {
        prompt: "Bir kulenin tepesine, kuleye 30 m uzaklıktan yerle 45° açı yaparak bakılıyor. Kulenin yüksekliği kaç m'dir? (Göz yüksekliği ihmal.)",
        options: ["30", "15", "30√2", "30√3", "15√2"],
        knowledge: ["tan 45° = 1."],
        strategy: "h = 30 · tan 45°.",
        steps: ["h = 30·1 = 30 m."],
        optionReasons: ["Doğru.", "15, yarıya böler.", "30√2, bakış doğrusunun uzunluğudur (hipotenüs).", "30√3, tan 60° kullanır.", "15√2, sin 45° ile yarım uzunluğu karıştırır."],
        commonError: "Hipotenüsü yükseklik sanmak.",
        check: "45°'de yükseklik = uzaklık ✓.",
      },
      {
        prompt: "x dar açı ve cot x = 2 ise sin x kaçtır?",
        options: ["√5/5", "2√5/5", "1/2", "2", "√5"],
        knowledge: ["cot = komşu/karşı."],
        strategy: "Komşu 2k, karşı k; hipotenüs √5·k.",
        steps: ["Hipotenüs = √(4 + 1)k = √5k.", "sin x = k/(√5k) = 1/√5 = √5/5."],
        optionReasons: ["Doğru.", "2√5/5, cos x'tir.", "1/2, tan x'tir.", "2, cot x'in kendisidir.", "√5, hipotenüsün k katsayısıdır."],
        commonError: "cot ile tan'ı karıştırmak.",
        check: "(1/5) + (4/5) = 1 ✓.",
      },
      {
        prompt: "tan 10° · tan 20° · tan 70° · tan 80° çarpımı kaçtır?",
        options: ["1", "0", "1/2", "√3", "2"],
        knowledge: ["tan x · tan(90° − x) = 1."],
        strategy: "Tümler açıları eşleştir.",
        steps: ["tan 10°·tan 80° = 1.", "tan 20°·tan 70° = 1.", "Çarpım 1."],
        optionReasons: ["Doğru.", "0, çarpanlardan biri sıfırmış gibi düşünür.", "1/2, bir çift eşlemeyi 1, öbürünü 1/2 sanır; iki çift de 1 verir.", "√3, tan 60° ile karıştırır.", "2, çarpımları toplar."],
        commonError: "Tümler açıları eşleştirmeden hesaplamaya çalışmak.",
        check: "10 + 80 = 20 + 70 = 90 ✓.",
      },
    ],
    source:
      "Resmî konu listesi TYT-GEO-09 (dik üçgende trigonometrik oranlar) ve MEB ortaöğretim matematik kazanımlarından kavramlar. Anlatım, örnekler ve sorular özgündür; resmî ÖSYM sorusu değildir.",
    sheet: {
      sections: [
        { title: "Tanımlar", text: ["sin = karşı/hipotenüs, cos = komşu/hipotenüs, tan = karşı/komşu, cot = komşu/karşı; tan·cot = 1, tan = sin/cos."] },
        { title: "Özel açılar", text: ["30°: 1/2, √3/2, √3/3. 45°: √2/2, √2/2, 1. 60°: √3/2, 1/2, √3 (sin, cos, tan sırasıyla)."] },
        { title: "İlişkiler", text: ["sin x = cos(90° − x), tan x = cot(90° − x); sin²x + cos²x = 1; oran verilince kenarları k ile kur."] },
        { title: "Uygulama", text: ["Yükseklik = uzaklık · tan(bakış açısı); merdiven yüksekliği = boy · sin(yerle açı)."] },
      ],
      cautions: ["Oranı yazmadan önce açıyı işaretle.", "sin + cos = 1 değildir; kareleri toplanır.", "Hipotenüs en uzun kenardır: sin ve cos 1'den büyük olamaz."],
    },
  },
];

export const geometryCircle040Ids = packs040.map((p) => p.id);
export const geometryCircle040Guides: LessonGuide[] = packs040.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({ id, minutes, objectives, sections, examples, recall, source }),
);
export const geometryCircle040Lessons: Lesson[] = packs040.map((p, family) => ({
  id: p.id,
  subjectId: "tyt-geometri",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  source: txt(p.source),
  tags: [p.id.includes("daire") ? "daire" : p.id.includes("kure") ? "katı-cisimler" : p.id.includes("trigonometri") ? "trigonometri" : "çember", "Özgün öğretim soruları"],
  body: p.sections.map((s) => ({ title: txt(s.title), text: txt(s.paragraphs.join("\n\n")) })),
  questions: p.items.map((item, index): Question => {
    const shift = (index + 2 * family + 1) % 5;
    const order = item.options.map((_, j) => (j + shift) % 5);
    const guidance: QuestionGuidance = {
      knowledge: item.knowledge,
      strategy: item.strategy,
      steps: item.steps,
      optionReasons: order.map((j) => item.optionReasons[j]),
      commonError: item.commonError,
      check: item.check,
    };
    return {
      id: `f040-${p.id}-${index + 1}`,
      prompt: txt(item.prompt),
      options: order.map((j) => txt(item.options[j])),
      answer: order.indexOf(0),
      hint: txt(item.strategy),
      explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
      skill: p.id,
      guidance,
    };
  }),
}));
export const geometryCircle040Sheets: CheatSheet[] = packs040.map((p) => ({
  topicId: `topic-${p.id}`,
  lessonId: p.id,
  subjectId: "tyt-geometri",
  title: p.title,
  sections: p.sheet.sections,
  cautions: p.sheet.cautions,
  examples: p.examples.map((e) => ({ title: e.title, prompt: e.prompt, steps: e.steps.map((s) => s.explanation), answer: e.answer })),
  recall: p.recall,
  source: p.source,
}));
export const supplementalTopics040 = packs040.map((p) => ({ id: `topic-${p.id}`, subjectId: "tyt-geometri", title: p.title }));
export const geometryCircle040TopicMap: Record<string, string> = Object.fromEntries(packs040.map((p) => [p.id, `topic-${p.id}`]));
