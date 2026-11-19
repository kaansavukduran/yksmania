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
  tags: ["çember", "Özgün öğretim soruları"],
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
