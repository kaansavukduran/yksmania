import type { OriginalSourceExercise } from "./sourceExercises024";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

const lessonId = "tyt-mat-mutlak-deger-kaynak-038";

function exercise(
  itemId: string,
  itemLabel: string,
  pages: string,
  prompt: string,
  answer: string,
  steps: readonly string[],
  explanationFigure: SourceQuestionFigureSpec,
  clarification?: string,
): OriginalSourceExercise {
  return {
    id: `s012-${itemId}-v130`,
    lessonId,
    source: {
      shortLabel: "Mutlak Değer · kaynak uyarlaması",
      title: "Mutlak Değer",
      pageLabel: `Kaynak PDF v1.3.0, ${pages}`,
      itemLabel,
    },
    prompt,
    options: [],
    answer,
    steps,
    explanationFigure,
    clarification,
  };
}

const repairPages = "soru s. 15, çözüm s. 17";
const solutionStep = (title: string, expression: string): SourceQuestionFigureSpec => ({
  kind: "math",
  title,
  alt: expression,
  expression: { kind: "text", text: expression },
});

const targetTenths = 120;
const toleranceTenths = 4;
const thicknessPosition = (tenths: number) => 180 + 25 * (tenths - targetTenths);
const thicknessLimits = [targetTenths - toleranceTenths, targetTenths + toleranceTenths];
const thicknessFigure: SourceQuestionFigureSpec = {
  kind: "geometry",
  title: "Hedef kalınlık ve kabul edilen ölçüler",
  alt: "12 mm hedefin iki yanında 0,4 mm bulunur. 11,6 mm ve 12,4 mm dahil aralık boyalıdır.",
  viewBox: [0, 0, 360, 104],
  segments: [
    { from: [24, 50], to: [336, 50] },
    {
      from: [thicknessPosition(thicknessLimits[0]), 50],
      to: [thicknessPosition(thicknessLimits[1]), 50],
      emphasis: true,
    },
  ],
  points: [thicknessLimits[0], targetTenths, thicknessLimits[1]].map((tenths) => ({
    at: [thicknessPosition(tenths), 50],
    label: `${(tenths / 10).toLocaleString("tr-TR")} mm`,
    emphasis: tenths !== targetTenths,
  })),
};

export const source012RevisionExercises: OriginalSourceExercise[] = [
  exercise(
    "p6-q9",
    "Karışık prova 9",
    "soru s. 14, çözüm s. 16",
    "Bir parçanın hedef kalınlığı 12 mm. Hedeften sapması en çok 0,4 mm olabilir. Kabul edilen kalınlık aralığını ve sınırların dahil olup olmadığını bul.",
    "11,6 mm ≤ ölçülen kalınlık ≤ 12,4 mm. İki sınır da dahil.",
    [
      "Ölçülen kalınlık m olsun. Hedeften sapma |m−12| mm’dir. “En çok 0,4 mm” dendiği için |m−12|≤0,4 yaz.",
      "−0,4≤m−12≤0,4 olur. Sol ve sağ sınır ile orta ifadeye 12 ekle. 11,6≤m≤12,4 çıkar.",
      "11,6 ve 12,4 mm’nin her biri hedeften tam 0,4 mm uzakta olduğu için kabul edilir. 12,5 mm’nin sapması 0,5 mm’dir ve izin verilen aralığın üzerindedir.",
    ],
    thicknessFigure,
  ),
  exercise(
    "p6-h1",
    "Hata onarımı 1",
    repairPages,
    "|2x−1|=−3?",
    "Çözüm kümesi ∅.",
    [
      "Sağ taraf −3’tür. Uzaklık sıfır veya pozitiftir.",
      "Bu nedenle hiçbir 2x−1 değeri koşulu sağlayamaz. İki doğrusal dal yazmadan dur.",
    ],
    solutionStep("Uzaklığın alt sınırı", "|2x−1| ≥ 0"),
    "Gerçek x değerleri için çözüm kümesini bul.",
  ),
  exercise(
    "p6-h2",
    "Hata onarımı 2",
    repairPages,
    "|x+2|<4?",
    "−6<x<2. İki sınır da hariç.",
    [
      "Merkez −2’dir. <4 ilişkisi merkeze 4 birimden yakın konumları seçer.",
      "−4<x+2<4 yaz. Üç ifadeden 2 çıkarınca −6<x<2 elde edilir.",
      "x=−2 uygun, x=−6 ve x=2’de uzaklık 4 olduğundan iki sınır da hariçtir.",
    ],
    solutionStep("İç aralığı kur", "−4 < x + 2 < 4"),
    "Gerçek x değerleri için çözüm kümesini bul.",
  ),
  exercise(
    "p6-h3",
    "Hata onarımı 3",
    repairPages,
    "|x−1|≥2?",
    "x≤−1 veya x≥3. İki sınır da dahil.",
    [
      "≥2, merkez 1’den en az 2 birim uzakta olmayı söyler.",
      "x−1≤−2 veya x−1≥2 yaz. İki kola ayrı ayrı 1 ekleyince x≤−1 veya x≥3 elde edilir.",
      "x=−1 ve x=3 için uzaklık 2 olduğundan sınırlar alınır. x=1 için uzaklık 0 olduğu için merkez alınmaz.",
    ],
    solutionStep("Merkezin dışındaki iki bölge", "x − 1 ≤ −2 veya x − 1 ≥ 2"),
    "Gerçek x değerleri için çözüm kümesini bul.",
  ),
  exercise(
    "p6-h4",
    "Hata onarımı 4",
    repairPages,
    "y=|x+3|−1 tepe?",
    "Tepe (−3, −1).",
    [
      "x+3=0 eşitliğinden x=−3 çıkar. Bu noktada mutlak değer en küçük değeri olan 0’ı alır.",
      "y=0−1=−1. Tepe düzlemde (−3, −1) konumundadır.",
      "x=3 seçilseydi y=|6|−1=5 çıkardı. İçteki +3, grafiği 3 birim sola taşır.",
    ],
    solutionStep("Tepeye ulaşan değer", "x + 3 = 0 → x = −3 → y = 0 − 1"),
    "Fonksiyon grafiğinin tepe noktasının iki koordinatını bul.",
  ),
  exercise(
    "p6-h5",
    "Hata onarımı 5",
    repairPages,
    "a=2, b=−5?",
    "|a+b|=3 ve |a|+|b|=7. Bu değerler eşit değildir.",
    [
      "Önce a+b=2+(−5)=−3 bulunur. Mutlak değer |−3|=3’tür.",
      "Terimlerin ayrı ayrı mutlak değerlerini toplarsan 2+5=7 bulursun.",
      "3≠7 olduğu için bu örnek koşulsuz eşitliği çürütür. Doğru genel ilişki |a+b|≤|a|+|b| biçimindedir.",
    ],
    solutionStep("İki işlemi ayrı karşılaştır", "|2 + (−5)| = 3 < 7 = |2| + |−5|"),
    "Verilen değerlerle |a+b| ve |a|+|b| hesapla. Eşitlik her a ve b için geçerli mi, karar ver.",
  ),
  exercise(
    "p6-h6",
    "Hata onarımı 6",
    repairPages,
    "|x−2|+|x−5|=7?",
    "Çözüm kümesi {0, 7}.",
    [
      "Eşikler 2 ve 5’tir. x<2 için iki iç ifade de negatiftir. (2−x)+(5−x)=7 eşitliği x=0’ı verir. 0<2 olduğundan aday geçerlidir.",
      "2≤x≤5 için toplam (x−2)+(5−x)=3 olur. Bu aralıkta hedef 7’ye ulaşılamaz.",
      "x>5 için toplam (x−2)+(x−5)=2x−7 olur. 2x−7=7 eşitliği x=7’yi verir ve bu değer 5’ten büyüktür.",
      "Özgün ifadede x=0 için 2+5=7, x=7 için 5+2=7. Her iki aday da doğrulandı.",
    ],
    solutionStep("Eşikler arasındaki sabit parça", "2 ≤ x ≤ 5 için (x − 2) + (5 − x) = 3"),
    "Gerçek x için her adayı bulunduğu aralıkta denetle.",
  ),
];
