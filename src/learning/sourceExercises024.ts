import { txt, type Lesson } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type {
  SourceMathNode,
  SourceQuestionFigureSpec,
} from "./SourceQuestionFigure";
import ogmData from "./originalOgmExercises024.json";
import question01 from "./sourceExerciseAssets024/ogm-uslu-ifadeler-soru-01.png";
import question02 from "./sourceExerciseAssets024/ogm-uslu-ifadeler-soru-02.png";
import question03 from "./sourceExerciseAssets024/ogm-uslu-ifadeler-soru-03.png";
import question04 from "./sourceExerciseAssets024/ogm-uslu-ifadeler-soru-04.png";
import question05 from "./sourceExerciseAssets024/ogm-uslu-ifadeler-soru-05.png";
import question06 from "./sourceExerciseAssets024/ogm-uslu-ifadeler-soru-06.png";
import { extraOriginalSourceExercises024 } from "./extraOriginalSourceExercises024";
import { source012RevisionExercises } from "./source012RevisionExercises";
import { questionFigures043 } from "./questionFigures043";

export interface SourceAttribution {
  shortLabel: string;
  title: string;
  pageLabel: string;
  itemLabel: string;
  publicUrl?: string;
}
export interface OriginalSourceExercise {
  id: string;
  lessonId: string;
  source: SourceAttribution;
  prompt: string;
  options: readonly string[];
  answer: string;
  steps: readonly string[];
  clarification?: string;
  erratum?: string;
  figure?: SourceQuestionFigureSpec;
  hintFigure?: SourceQuestionFigureSpec;
  explanationFigure?: SourceQuestionFigureSpec;
  scoredLessonId?: string;
  sourceContext?: string;
}
export const originalOgmLesson024Id =
  "tyt-mat-uslu-ifadeler-ogm-kaynak-sorulari-024";
const absoluteLessonId = "tyt-mat-mutlak-deger-kaynak-038";
const powersLessonId = "tyt-mat-uslu-sayilar-kaynak-039";
const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const row = (...items: SourceMathNode[]): SourceMathNode => ({
  kind: "row",
  items,
});
const abs = (value: string): SourceMathNode => ({
  kind: "absolute",
  value: text(value),
});
const power = (
  base: string | SourceMathNode,
  exponent: string | SourceMathNode,
): SourceMathNode => ({
  kind: "power",
  base: typeof base === "string" ? text(base) : base,
  exponent: typeof exponent === "string" ? text(exponent) : exponent,
});
const fraction = (
  numerator: string | SourceMathNode,
  denominator: string | SourceMathNode,
): SourceMathNode => ({
  kind: "fraction",
  numerator: typeof numerator === "string" ? text(numerator) : numerator,
  denominator:
    typeof denominator === "string" ? text(denominator) : denominator,
});
const math = (
  title: string,
  alt: string,
  expression: SourceMathNode,
  caption?: string,
): SourceQuestionFigureSpec => ({
  kind: "math",
  title,
  alt,
  expression,
  caption,
});
const solutionMath = (alt: string, expression: SourceMathNode) =>
  math(
    "Çözümün matematik görünümü",
    alt,
    expression,
    "Uygulama için hazırlanmış açıklayıcı çözüm görseli.",
  );
const absoluteSource = (number: number): SourceAttribution => ({
  shortLabel: "Mutlak Değer · kaynak alıştırması",
  title: "Mutlak Değer",
  pageLabel: "Kaynak PDF v1.3.0, soru s. 14, çözüm s. 16 (v1.0.0 s. 11)",
  itemLabel: `Alıştırma ${number}`,
});
const powersSource = (number: number): SourceAttribution => ({
  shortLabel: "Üslü Sayılar · kaynak alıştırması",
  title: "Üslü Sayılar",
  pageLabel: "Kaynak PDF, fiziksel sayfa 10",
  itemLabel: `Alıştırma ${number}`,
});
const item = (
  lessonId: string,
  source: SourceAttribution,
  number: number,
  prompt: string,
  answer: string,
  steps: readonly string[],
  expression: SourceMathNode,
  extra: Partial<OriginalSourceExercise> = {},
): OriginalSourceExercise => ({
  id: `${lessonId}-original-${number}`,
  lessonId,
  source,
  prompt,
  answer,
  steps,
  options: [],
  figure: math(
    "Kaynaktaki matematik ifadesi",
    prompt,
    expression,
    "Kaynağın matematik yazımı; metin ve verilenler korunmuştur.",
  ),
  ...extra,
});

export const originalAbsoluteExercises024: OriginalSourceExercise[] = [
  item(
    absoluteLessonId,
    absoluteSource(1),
    1,
    "|3x-4|=8 denklemini çöz.",
    "x=4 veya x=−4/3",
    [
      "Mutlak değeri 8 olan iç ifade 8 veya −8 olabilir: 3x−4=8 ya da 3x−4=−8.",
      "İlk dal 3x=12, x=4; ikinci dal 3x=−4, x=−4/3 verir.",
      "İki adayı başlangıçta yerine koy: iç ifadeler 8 ve −8, mutlak değerlerin ikisi de 8 olur.",
    ],
    row(abs("3x−4"), text("=8")),
    {
      explanationFigure: solutionMath(
        "İki dal: 3x−4=8 veya 3x−4=−8; x=4 veya x=−4/3.",
        row(text("3x−4=±8  ⇒  x=4 veya "), fraction("−4", "3")),
      ),
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(2),
    2,
    "|x+2|≤5 eşitsizliğini aralıkla göster.",
    "[−7, 3]",
    [
      "Uzaklık en fazla 5: −5≤x+2≤5.",
      "Üç taraftan da 2 çıkar: −7≤x≤3.",
      "≤ uçları içerir; iki uçta da mutlak değer 5 olur.",
    ],
    row(abs("x+2"), text("≤5")),
    {
      explanationFigure: {
        kind: "geometry",
        title: "Kapalı çözüm aralığı",
        alt: "Çözüm −7 ile 3 arasındaki bütün gerçek sayılardır. −7 ve 3 kapalı uçlardır; merkez −2’dir.",
        viewBox: [0, 0, 520, 150],
        segments: [
          { from: [35, 90], to: [485, 90] },
          { from: [85, 90], to: [435, 90], emphasis: true },
        ],
        points: [
          { at: [85, 90], label: "−7", emphasis: true },
          { at: [260, 90], label: "−2" },
          { at: [435, 90], label: "3", emphasis: true },
        ],
        caption: "Açıklayıcı çözüm çizimi: merkezden iki yöne 5 birim.",
      },
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(3),
    3,
    "|2x-3|>7 eşitsizliğini çöz.",
    "x<−2 veya x>5",
    [
      "7’den büyük uzaklık iç bölgenin dışındadır: 2x−3<−7 veya 2x−3>7.",
      "Soldaki dal 2x<−4, x<−2; sağdaki dal 2x>10, x>5 verir.",
      "İlişki sıkı olduğu için −2 ve 5 alınmaz. Çözüm iki dış bölgenin birleşimidir.",
    ],
    row(abs("2x−3"), text(">7")),
    {
      explanationFigure: solutionMath(
        "İki dış aralık: (−∞,−2) birleşim (5,∞).",
        text("(−∞, −2) ∪ (5, ∞)"),
      ),
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(4),
    4,
    "||x|-2|=3 denklemini çöz.",
    "x=−5 veya x=5",
    [
      "Dış mutlak değerden |x|−2=3 veya |x|−2=−3 çıkar.",
      "İlk dal |x|=5, x=±5 verir. İkinci dal |x|=−1 olur; mutlak değer negatif olamayacağı için elenir.",
      "Her dış dalı otomatik olarak iki köke dönüştürme; önce sağ tarafın işaretini denetle.",
    ],
    row({ kind: "absolute", value: row(abs("x"), text("−2")) }, text("=3")),
    {
      explanationFigure: solutionMath(
        "Geçerli dal |x|=5; geçersiz dal |x|=−1. Çözüm {−5,5}.",
        row(abs("x"), text("=5 ⇒ {−5,5};  "), abs("x"), text("=−1 ⇒ ∅")),
      ),
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(5),
    5,
    "|x-4|+|x+1| ifadesinin en küçük değeri ve x aralığı nedir?",
    "En küçük değer 5; x∈[−1,4]",
    [
      "İfade, x’in 4 ve −1 noktalarına uzaklıklarının toplamıdır.",
      "İki uç arasındaki uzaklık 4−(−1)=5’tir. x aradaysa iki uzaklık toplamı hep 5 olur.",
      "Aralığın dışında toplam artar. Dolayısıyla minimum yalnız tek orta noktada değil, [−1,4] aralığının tamamında alınır.",
    ],
    row(abs("x−4"), text("+"), abs("x+1")),
    {
      explanationFigure: solutionMath(
        "−1≤x≤4 iken (4−x)+(x+1)=5.",
        text("−1 ≤ x ≤ 4:  (4−x)+(x+1)=5"),
      ),
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(6),
    6,
    "|7-a|=3 ise a kaç olabilir?",
    "a=4 veya a=10",
    [
      "7−a=3 veya 7−a=−3 yaz.",
      "İlk dal −a=−4, a=4; ikinci dal −a=−10, a=10 verir.",
      "a’nın katsayısı −1’dir; yalnız sağ tarafın işaretini değiştirip eşitliği bozma.",
    ],
    row(abs("7−a"), text("=3")),
    {
      explanationFigure: solutionMath(
        "7−a=3 veya −3; a değerleri 4 ve10.",
        text("7−a=±3 ⇒ a=4 veya a=10"),
      ),
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(7),
    7,
    "y=|x+1|-2 grafiğinin tepe noktası ve kökleri nedir?",
    "Tepe (−1,−2); kökler x=−3 ve x=1",
    [
      "Tepeyi iç ifadenin sıfır olduğu yerde bul: x+1=0, x=−1. y=−2 olur.",
      "Köklerde y=0: |x+1|=2. x+1=±2 olduğundan x=−3 veya x=1.",
      "Grafik yukarı açılır. İçteki +1, tepeyi sola1; dıştaki −2, aşağı2 taşır.",
    ],
    row(text("y="), abs("x+1"), text("−2")),
    {
      explanationFigure: {
        kind: "geometry",
        title: "y=|x+1|−2 çözüm grafiği",
        alt: "Yatay eksen x, düşey eksen y. V grafiği yukarı açılır; tepe(−1,−2), x ekseni kesişimleri(−3,0) ve(1,0). Çizim x aralığı −5 ile3, y aralığı −3 ile3.",
        viewBox: [0, 0, 520, 300],
        segments: [
          { from: [35, 175], to: [485, 175] },
          { from: [310, 25], to: [310, 265] },
          { from: [60, 105], to: [260, 245], emphasis: true },
          { from: [260, 245], to: [460, 105], emphasis: true },
        ],
        points: [
          { at: [160, 175], label: "(−3,0)", emphasis: true },
          { at: [360, 175], label: "(1,0)", emphasis: true },
          { at: [260, 245], label: "(−1,−2)", emphasis: true },
        ],
        labels: [
          { at: [475, 160], text: "x" },
          { at: [325, 35], text: "y" },
        ],
        caption:
          "Uygulama için hesaplanmış açıklayıcı grafik; kaynak soruda hazır çizim yoktur.",
      },
    },
  ),
  item(
    absoluteLessonId,
    absoluteSource(8),
    8,
    "|x-5|<0 eşitsizliğinin çözümü var mı?",
    "Çözüm yok; ∅",
    [
      "Mutlak değer, bütün gerçek x’ler için en az0’dır.",
      "Sıfırdan küçük olma koşulu hiçbir x’te sağlanamaz. x=5 yalnız 0 verir; 0<0 yanlıştır.",
      "Çözüm kümesi boş kümedir; x=5’i çözüm diye alma.",
    ],
    row(abs("x−5"), text("<0")),
    {
      explanationFigure: solutionMath(
        "Her gerçek x için |x−5|≥0, dolayısıyla |x−5|<0 çözümü boş kümedir.",
        row(abs("x−5"), text("≥0 ⇒ ÇK=∅")),
      ),
    },
  ),
];

export const originalPowersExercises024: OriginalSourceExercise[] = [
  item(
    powersLessonId,
    powersSource(1),
    1,
    "(2^5·4^3)/8^2 işlemini hesapla.",
    "32",
    [
      "4=2²,8=2³: pay 2⁵·2⁶, payda2⁶ olur.",
      "Aynı tabanlı bölümde üsleri çıkar: 2^(5+6−6)=2⁵=32.",
    ],
    fraction(row(power("2", "5"), text("·"), power("4", "3")), power("8", "2")),
    {
      explanationFigure: solutionMath(
        "2^(5+6−6)=2^5=32.",
        row(power("2", "5+6−6"), text("="), power("2", "5"), text("=32")),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(2),
    2,
    "9^(x-1)=27 denklemini çöz.",
    "x=5/2",
    [
      "9=3²,27=3³: 3^(2x−2)=3³ olur.",
      "3 tabanı pozitif ve1’den farklı olduğundan üsler eşittir:2x−2=3,2x=5,x=5/2.",
    ],
    row(power("9", "x−1"), text("=27")),
    {
      explanationFigure: solutionMath(
        "2x−2=3; x=5/2.",
        row(text("2x−2=3 ⇒ x="), fraction("5", "2")),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(3),
    3,
    "3^n+3^(n+1) ifadesini ortak çarpanla yaz.",
    "4·3^n",
    [
      "İkinci terim 3^(n+1)=3^n·3’tür.",
      "Ortak3^n çarpanını al:3^n(1+3)=4·3^n. Toplamda üsler doğrudan toplanmaz.",
    ],
    row(power("3", "n"), text("+"), power("3", "n+1")),
    {
      explanationFigure: solutionMath(
        "3^n(1+3)=4·3^n.",
        row(power("3", "n"), text("(1+3)=4·"), power("3", "n")),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(4),
    4,
    "0,0000072 sayısını bilimsel gösterimle yaz.",
    "7,2×10^−6",
    [
      "Katsayıyı1≤a<10 aralığına getir:7,2.",
      "Virgül6 basamak sağa taşındı; sayıyı korumak için10⁻⁶ ile çarp:7,2×10⁻⁶.",
    ],
    text("0,0000072"),
    {
      explanationFigure: solutionMath(
        "0,0000072=7,2×10^−6.",
        row(text("7,2 × "), power("10", "−6")),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(5),
    5,
    "(1/2)^9 ile (1/2)^6'yı karşılaştır.",
    "(1/2)^9<(1/2)^6",
    [
      "0<1/2<1 olduğu için her yeni çarpan değeri küçültür.",
      "(1/2)^9=1/512, (1/2)^6=1/64. Aynı pozitif payda karşılaştırmasına göre1/512<1/64.",
    ],
    row(
      power(fraction("1", "2"), "9"),
      text(" ile "),
      power(fraction("1", "2"), "6"),
    ),
    {
      explanationFigure: solutionMath(
        "1/512<1/64; üs arttığında0ile1arasındaki tabanın kuvveti azalır.",
        row(fraction("1", "512"), text("<"), fraction("1", "64")),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(6),
    6,
    "4^-2·8 işlemini hesapla.",
    "1/2",
    [
      "Negatif üs karşılık aldırır:4⁻²=1/16.",
      "8·1/16=8/16=1/2. Negatif üs sonucu negatif yapmaz.",
    ],
    row(power("4", "−2"), text("·8")),
    {
      explanationFigure: solutionMath(
        "4^−2·8=8/16=1/2.",
        row(fraction("8", "16"), text("="), fraction("1", "2")),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(7),
    7,
    "Başlangıçta 50 olan bir miktar her adımda 3 katına çıkıyor. 4 adım sonra kaç olur?",
    "4050",
    [
      "Başlangıç0.adımdır;4.adıma kadar dört kez3 ile çarpılır.",
      "50·3⁴=50·81=4050. 50·3·4 doğrusal artış olur ve bu süreci modellemez.",
    ],
    row(text("50·"), power("3", "4")),
    {
      explanationFigure: solutionMath(
        "Adım0:50;1:150;2:450;3:1350;4:4050.",
        text("50 → 150 → 450 → 1350 → 4050"),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(8),
    8,
    "Aşağıdakilerden hangisi her uygun a, m, n için doğrudur?",
    "Kaynak cevap anahtarı: B",
    [
      "Kaynağın amaçladığı tam sayı üsler çerçevesinde B seçeneği kuvvetin kuvveti kuralıdır.",
      "Ancak “her uygun” koşulu üslerin kümesini açık söylemez. Gerçel üslerde her iki taraf tanımlı olsa bile kural koşulsuz uygulanmaz: a=−1,m=2,n=1/2 için sol1,sağ−1’dir.",
      "Koşulu açık güvenli sürüm: a≠0 gerçek sayı,m ve n tam sayı ise (a^m)^n=a^(mn). Bu açıklama uygulamaya aittir; kaynak seçenekleri aynen korunur.",
    ],
    text("Aşağıdaki dört kaynak seçeneğini karşılaştır."),
    {
      options: [
        "a^m+a^n=a^(m+n)",
        "(a^m)^n=a^(mn)",
        "a^-n=-a^n",
        "(a+b)^n=a^n+b^n",
      ],
      erratum:
        "Kaynakta üslerin sayı kümesi açık değil. Bu özgün alıştırma puanlı sınava alınmaz; B, kaynağın verdiği yanıttır. Koşul ve karşı örnek aşağıda ayrıca açıklanır.",
      explanationFigure: solutionMath(
        "Koşulsuz karşı örnek: ((−1)^2)^(1/2)=1; (−1)^(2·1/2)=−1.",
        text("((−1)²)^(1/2)=1 ≠ −1=(−1)^(2·1/2)"),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(9),
    9,
    "27^(2/3) değerini kök ilişkisiyle bul.",
    "9",
    [
      "Payda3,küp kökü; pay2,karesini almayı söyler.",
      "27’nin gerçek küp kökü3’tür. 3²=9 olur.",
    ],
    power("27", fraction("2", "3")),
    {
      figure: math(
        "Kaynaktaki matematik ifadesi",
        "27 üzeri2/3; kök ilişkisiyle hesapla.",
        { kind: "power", base: text("27"), exponent: fraction("2", "3") },
      ),
      explanationFigure: solutionMath(
        "27’nin küp kökü3;karesi9.",
        row(
          power({ kind: "root", value: text("27"), degree: text("3") }, "2"),
          text("=3²=9"),
        ),
      ),
    },
  ),
  item(
    powersLessonId,
    powersSource(10),
    10,
    "6×10^5 ile 4×10^6'nın toplamını bilimsel gösterimle yaz.",
    "4,6×10^6",
    [
      "Toplam için önce aynı10 kuvvetini kullan:6×10⁵=0,6×10⁶.",
      "(0,6+4)×10⁶=4,6×10⁶. Katsayı1ile10arasında olduğu için bilimsel gösterim tamamdır.",
    ],
    row(text("6×"), power("10", "5"), text(" + 4×"), power("10", "6")),
    {
      explanationFigure: solutionMath(
        "0,6×10^6+4×10^6=4,6×10^6.",
        row(
          text("(0,6+4)×"),
          power("10", "6"),
          text("=4,6×"),
          power("10", "6"),
        ),
      ),
    },
  ),
];

const sourceImages = [
  question01,
  question02,
  question03,
  question04,
  question05,
  question06,
];
const ogmHintFigures = [
  math(
    "Tabanları aynı asal tabana çevir",
    "4=2²,16=2⁴,32=2⁵,8=2³,64=2⁶. Bu eşitlikleri pay ve paydada kullan; son bölüm henüz hesaplanmadı.",
    text("4=2²; 16=2⁴; 32=2⁵; 8=2³; 64=2⁶"),
    "Uygulama için hazırlanmış yöntem ipucu; kaynak sorunun yerine geçmez.",
  ),
  math(
    "Tek ve çift kuvveti ayır",
    "(−a)⁴=a⁴ ve (−a)⁵=−a⁵. Negatif üs nedeniyle a sıfır olamaz. Pay ve paydayı ayrı sadeleştir.",
    text("a≠0: (−a)⁴=a⁴; (−a)⁵=−a⁵"),
    "İşareti ve üssü ayrı izle.",
  ),
  math(
    "Verilen tabanı kullan",
    "25=5²; 25^(2x+1)=(5²)^(2x+1). Sonra5^x=2 bağıntısını kullan.",
    row(power("25", "2x+1"), text("="), power(text("(5²)"), "2x+1")),
    "Son sayısal sonuç henüz hesaplanmadı.",
  ),
  math(
    "75’i verilen tabanlarla kur",
    "75=15²/3. Bu tabanın2x kuvvetini paya ve paydaya uygula.",
    row(text("75="), fraction(power("15", "2"), "3")),
    "Pozitif tabanlarda kuvvet kurallarını kullan.",
  ),
  math(
    "Ondalığı asal çarpanlarına ayır",
    "0,72=18/25=2·3²/5². Her verilen kuvvetin kaç kez kullanılacağını izle.",
    row(
      text("0,72="),
      fraction("18", "25"),
      text("="),
      fraction(row(text("2·"), power("3", "2")), power("5", "2")),
    ),
    "Üs x henüz uygulanmadı.",
  ),
  math(
    "Ortak kuvveti ayır",
    "5^(n+3)=5^(n+2)·5. Paydaki iki terimin ortak çarpanı5^(n+2)’dir.",
    row(power("5", "n+3"), text("="), power("5", "n+2"), text("·5")),
    "Fark içindeki üsleri doğrudan çıkarma.",
  ),
];
const ogmExplanationFigures = [
  solutionMath(
    "Pay2^5, payda2^3: sonuç2^(5−3)=4.",
    row(
      fraction(power("2", "5"), power("2", "3")),
      text("="),
      power("2", "5−3"),
      text("=4"),
    ),
  ),
  solutionMath(
    "a sıfır değilken (−a^3)/(−a^−5)=a^8.",
    row(
      fraction(
        row(text("−"), power("a", "3")),
        row(text("−"), power("a", "−5")),
      ),
      text("="),
      power("a", "3−(−5)"),
      text("="),
      power("a", "8"),
    ),
  ),
  solutionMath(
    "25^(2x+1)=25·(5^x)^4=25·16=400.",
    row(
      power("25", "2x+1"),
      text("=25·"),
      power(row(text("("), power("5", "x"), text(")")), "4"),
      text("=400"),
    ),
  ),
  solutionMath(
    "75^(2x)=15^(4x)/3^(2x)=a^4/b^2.",
    row(
      power("75", "2x"),
      text("="),
      fraction(power("15", "4x"), power("3", "2x")),
      text("="),
      fraction(power("a", "4"), power("b", "2")),
    ),
  ),
  solutionMath(
    "0,72=2·3^2/5^2; x’inci kuvvet a·b^2/c^2.",
    row(
      power("(0,72)", "x"),
      text("="),
      fraction(row(text("a·"), power("b", "2")), power("c", "2")),
    ),
  ),
  solutionMath(
    "5^(n+2)(5−2)/5^(n+1)=3·5=15.",
    row(
      fraction(row(power("5", "n+2"), text("(5−2)")), power("5", "n+1")),
      text("=3·5=15"),
    ),
  ),
];
const ogmSource = (number: number): SourceAttribution => ({
  shortLabel: "MEB OGM Materyal · kaynak sorusu",
  title: "Üslü İfadelerin Özellikleri",
  pageLabel: "Fiziksel sayfa1 · Sorular",
  itemLabel: `Soru ${number}`,
  publicUrl:
    "https://ogmmateryal.eba.gov.tr/panel/upload/fasikul/q31n2whteqp.pdf",
});
export const originalOgmExercises024: OriginalSourceExercise[] = ogmData.map(
  (q, i) => ({
    id: q.id,
    lessonId: powersLessonId,
    source: ogmSource(q.number),
    prompt: q.stem,
    options: q.options,
    answer: `${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}`,
    steps: q.teachingSolution.steps.map(
      (step) => `${step.title}: ${step.text}`,
    ),
    clarification: q.clarifications.map((c) => c.text).join(" ") || undefined,
    figure: {
      kind: "image",
      src: sourceImages[i],
      width: q.image.width,
      height: q.image.height,
      title: `OGM kaynak soru ${q.number}`,
      alt: q.image.alt,
      caption:
        "Kaynak sorunun asıl metni, matematik dizilimi ve seçenekleri. Basılı yanıt bu görselde yer almaz.",
    },
    explanationFigure: ogmExplanationFigures[i],
    hintFigure: ogmHintFigures[i],
    scoredLessonId: originalOgmLesson024Id,
  }),
);
export const originalSourceExercises024 = [
  ...originalAbsoluteExercises024,
  ...originalPowersExercises024,
  ...originalOgmExercises024,
  ...extraOriginalSourceExercises024,
];
export function originalExercisesForLesson(lessonId: string) {
  return [...originalSourceExercises024, ...source012RevisionExercises].filter((q) => q.lessonId === lessonId);
}
export function isSourceQuestionLesson(lessonId: string) {
  return lessonId === originalOgmLesson024Id;
}

export const sourceQuestionLessons024: Lesson[] = [
  {
    id: originalOgmLesson024Id,
    subjectId: "tyt-matematik",
    title: txt("Üslü ifadeler · MEB OGM kaynak soruları"),
    minutes: 18,
    objectives: [
      txt("Kaynaktaki altı özgün soruyu asıl metin ve seçenekleriyle çöz."),
      txt("Her sonuca koşul, ara işlem ve seçenek gerekçesiyle ulaş."),
    ],
    body: [],
    source: txt(
      "MEB OGM Materyal, Üslü İfadelerin Özellikleri, fiziksel sayfa1, Sorular1–6. Kaynak sorular aynen korunur; adım adım çözümler ve seçenek gerekçeleri uygulama için yazılmıştır.",
    ),
    tags: ["soru-seti", "kaynak-sorulari"],
    questions: ogmData.map((q) => ({
      id: q.id,
      prompt: txt(q.stem),
      options: q.options.map(txt),
      answer: q.correctIndex,
      hint: txt(q.teachingSolution.strategy),
      explanation: txt(q.teachingSolution.steps.map((s) => s.text).join(" ")),
      skill: "Üslü ifadeler · kaynak sorusu",
      guidance: {
        knowledge: [q.teachingSolution.knowledge],
        strategy: q.teachingSolution.strategy,
        steps: q.teachingSolution.steps.map((s) => s.text),
        optionReasons: q.teachingSolution.optionReasons.map((s) => s.text),
        commonError: q.teachingSolution.commonError,
        check: q.teachingSolution.check,
      },
    })),
  },
];

type BoundQuestion = {
  id: string;
  passage?: string;
  prompt: string;
  options: readonly string[];
  answer: number;
  explanation?: string;
  hint?: string;
  guidance?: QuestionGuidance;
};
const guidanceRevision = (g: QuestionGuidance) =>
  JSON.stringify([
    g.knowledge,
    g.strategy,
    g.steps,
    g.optionReasons,
    g.commonError,
    g.check,
  ]);
// Bind the full original revision. A changed prompt/options/key in an old frozen
// exam paper must never receive a different source figure through ID alone.
export function sourceQuestionPresentation(question: BoundQuestion):
  | {
      source: SourceAttribution;
      figure?: SourceQuestionFigureSpec;
      hintFigure?: SourceQuestionFigureSpec;
      explanationFigure?: SourceQuestionFigureSpec;
      stepFigures?: readonly SourceQuestionFigureSpec[];
      originalExerciseId: string;
    }
  | undefined {
  const index = ogmData.findIndex(
    (q) =>
      q.id === question.id &&
      question.passage === undefined &&
      q.stem === question.prompt &&
      q.correctIndex === question.answer &&
      JSON.stringify(q.options) === JSON.stringify(question.options),
  );
  if (index < 0) return questionFigures043(question);
  const exercise = originalOgmExercises024[index];
  const current = sourceQuestionLessons024[0].questions[index];
  // A frozen paper can keep the same stem while preserving a personal or older
  // explanation. Attach help visuals only to the matching help revision.
  const sameHelpRevision =
    question.explanation === current.explanation.tr &&
    question.hint === current.hint.tr &&
    question.guidance !== undefined &&
    current.guidance !== undefined &&
    guidanceRevision(question.guidance) === guidanceRevision(current.guidance);
  return {
    source: exercise.source,
    figure: exercise.figure,
    hintFigure: sameHelpRevision ? exercise.hintFigure : undefined,
    explanationFigure: sameHelpRevision
      ? exercise.explanationFigure
      : undefined,
    originalExerciseId: exercise.id,
  };
}
