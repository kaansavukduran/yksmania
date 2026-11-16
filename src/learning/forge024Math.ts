import { txt, type Lesson } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide } from "./guides/types";

const finite024 = (n: number, max: number) => {
  if (!Number.isFinite(n) || Math.abs(n) > max)
    throw new RangeError("MATH024_INPUT_SCOPE");
  return Object.is(n, -0) ? 0 : n;
};
const output024 = (n: number) => {
  if (!Number.isFinite(n)) throw new RangeError("MATH024_OUTPUT_PRECISION");
  return Object.is(n, -0) ? 0 : n;
};
export type Quad024 = readonly [number, number, number];
export type Rule024 =
  "sum" | "difference" | "product" | "quotient" | "composition";
function quad024(coefficients: Quad024, x: number) {
  if (!Array.isArray(coefficients) || coefficients.length !== 3)
    throw new RangeError("MATH024_COEFFICIENTS");
  coefficients.forEach((n) => finite024(n, 20));
  const [a, b, c] = coefficients;
  return {
    value: output024((a * x + b) * x + c),
    derivative: output024(2 * a * x + b),
    second: 2 * a,
  };
}
/** Exact differentiation rules for real polynomial operands. A zero quotient denominator remains a domain hole. */
export function derivativeRules024(
  u: Quad024,
  v: Quad024,
  x: number,
  operation: Rule024,
) {
  x = finite024(x, 10);
  if (
    !["sum", "difference", "product", "quotient", "composition"].includes(
      operation,
    )
  )
    throw new RangeError("MATH024_RULE");
  const left = quad024(u, x),
    right = quad024(v, x);
  if (operation === "quotient" && right.value === 0)
    return {
      defined: false as const,
      reason: "payda-sifir" as const,
      left,
      right,
      value: null,
      derivative: null,
      contributions: [] as number[],
      outer: null,
    };
  const outer = operation === "composition" ? quad024(u, right.value) : null;
  let value: number, derivative: number, contributions: number[];
  if (operation === "sum") {
    value = left.value + right.value;
    contributions = [left.derivative, right.derivative];
    derivative = contributions[0] + contributions[1];
  } else if (operation === "difference") {
    value = left.value - right.value;
    contributions = [left.derivative, -right.derivative];
    derivative = contributions[0] + contributions[1];
  } else if (operation === "product") {
    value = left.value * right.value;
    contributions = [
      left.derivative * right.value,
      left.value * right.derivative,
    ];
    derivative = contributions[0] + contributions[1];
  } else if (operation === "quotient") {
    value = left.value / right.value;
    contributions = [
      left.derivative / right.value,
      -(left.value / right.value) * (right.derivative / right.value),
    ];
    derivative = contributions[0] + contributions[1];
  } else {
    value = outer!.value;
    contributions = [outer!.derivative, right.derivative];
    derivative = contributions[0] * contributions[1];
  }
  return {
    defined: true as const,
    reason: null,
    left,
    right,
    outer,
    value: output024(value),
    derivative: output024(derivative),
    contributions: contributions.map(output024),
  };
}
const gcd024 = (a: number, b: number): number => (b ? gcd024(b, a % b) : a);
const realPower024 = (x: number, numerator: number, denominator: number) => {
  const magnitude = Math.pow(Math.abs(x), numerator / denominator);
  return x < 0 && Math.abs(numerator % 2) === 1 ? -magnitude : magnitude;
};
/** Reduced rational exponent; at an even-root boundary we do not pretend to have a two-sided interior derivative. */
export function rationalPower024(
  x: number,
  numerator: number,
  denominator: number,
) {
  x = finite024(x, 10);
  if (
    !Number.isInteger(numerator) ||
    numerator === 0 ||
    Math.abs(numerator) > 8 ||
    !Number.isInteger(denominator) ||
    denominator < 1 ||
    denominator > 5
  )
    throw new RangeError("MATH024_POWER_SCOPE");
  const divisor = gcd024(Math.abs(numerator), denominator),
    p = numerator / divisor,
    q = denominator / divisor,
    exponent = p / q;
  if ((x < 0 && q % 2 === 0) || (x === 0 && p < 0))
    return {
      p,
      q,
      exponent,
      value: null,
      derivative: null,
      kind: "gercel-tanim-yok" as const,
    };
  if (x === 0) {
    if (q % 2 === 0)
      return {
        p,
        q,
        exponent,
        value: 0,
        derivative: null,
        kind: "sinir-noktasi" as const,
      };
    if (p < q)
      return {
        p,
        q,
        exponent,
        value: 0,
        derivative: null,
        kind: "sonlu-turev-yok" as const,
      };
    return {
      p,
      q,
      exponent,
      value: 0,
      derivative: exponent === 1 ? 1 : 0,
      kind: "ic-noktada-turev" as const,
    };
  }
  return {
    p,
    q,
    exponent,
    value: output024(realPower024(x, p, q)),
    derivative: output024(exponent * realPower024(x, p - q, q)),
    kind: "ic-noktada-turev" as const,
  };
}
export type Cubic024 = readonly [number, number, number, number];
/** Polynomial factorization avoids cancellation in the secant and local linearization error. */
export function tangentGeometry024(
  coefficients: Cubic024,
  at: number,
  step: number,
) {
  if (!Array.isArray(coefficients) || coefficients.length !== 4)
    throw new RangeError("MATH024_CUBIC");
  coefficients.forEach((n) => finite024(n, 10));
  at = finite024(at, 5);
  step = finite024(step, 2);
  if (step === 0) throw new RangeError("MATH024_SECANT_STEP");
  const [a, b, c, d] = coefficients,
    value = (x: number) => output024(((a * x + b) * x + c) * x + d);
  const point = { x: at, y: value(at) },
    slope = output024((3 * a * at + 2 * b) * at + c),
    intercept = output024(point.y - slope * at);
  const secantSlope = output024(
    slope + step * (3 * a * at + b) + a * step * step,
  );
  const secantPoint = { x: output024(at + step), y: value(at + step) };
  const predicted = output024(point.y + slope * step),
    error = output024(step * step * (3 * a * at + b + a * step));
  const normal =
    slope === 0
      ? { kind: "dusey" as const, x: at, slope: null, intercept: null }
      : {
          kind: "egimli" as const,
          x: null,
          slope: output024(-1 / slope),
          intercept: output024(point.y + at / slope),
        };
  const unitLength = Math.hypot(1, slope),
    angleRad =
      Math.atan(slope) < 0 ? Math.atan(slope) + Math.PI : Math.atan(slope);
  const curvature = 3 * a * at + b;
  const candidate =
    a === 0 || curvature === 0 ? null : output024(at - curvature / a);
  const otherIntersection =
    candidate === null || candidate === at
      ? null
      : { x: candidate, y: value(candidate) };
  return {
    coefficients: [...coefficients],
    at,
    step,
    point,
    slope,
    intercept,
    secantSlope,
    secantPoint,
    predicted,
    error,
    normal,
    angleRad,
    tangentUnit: { x: 1 / unitLength, y: slope / unitLength },
    normalUnit: { x: -slope / unitLength, y: 1 / unitLength },
    otherIntersection,
    contact:
      a === 0 && b === 0
        ? ("dogru-cakisik" as const)
        : curvature === 0 && a !== 0
          ? ("ucuncu-derece-temas" as const)
          : ("ikinci-derece-temas" as const),
  };
}

type Item024 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: QuestionGuidance;
};
const rules024: LessonGuide & { title: string; questions: Item024[] } = {
  id: "ayt-turev-alma-kurallari",
  title: "Türev alma kuralları: yapıyı gör, katkıyı kur",
  minutes: 105,
  objectives: [
    "Değer ile türevi, türev fonksiyonuyla noktadaki türevi ayır.",
    "Kuvvet, toplam, çarpım, bölüm ve bileşkeyi koşullarıyla türevle.",
    "Rasyonel üs ve parçalı fonksiyonda tanım alanını, birleşmeyi ve ikinci türevi denetle.",
  ],
  sections: [
    {
      title: "Türev küçük aralıktaki değişimi ölçer",
      paragraphs: [
        "Bir fonksiyon her izinli x girdisine f(x) çıktısını verir. a ile a+h girdileri farklı olduğunda ortalama değişim [f(a+h)−f(a)]/h oranıdır; h sıfır olamaz. Örneğin f(x)=x², a=2 ve h=0,5 için oran (6,25−4)/0,5=4,5 olur. Bu iki ölçümün ortalama eğimidir.",
        "h sıfıra sağdan ve soldan yaklaşırken oran aynı sonlu sayıya gidiyorsa bu sayıya f′(a), noktadaki türev denir. Aynı örnekte oran 2a+h olduğundan f′(2)=4. Kurallar bu limiti her soruda baştan açmadan hesaplamayı sağlar; türev için gerekli tanım, iç nokta ve türevlenebilirlik koşullarını kaldırmaz.",
      ],
    },
    {
      title: "Kural seçmeden önce işlemin yapısını gör",
      paragraphs: [
        "Bir ifadenin en dış işlemi hangi türev kuralıyla başlanacağını belirler. (x²+3)(2x−1) iki fonksiyonun çarpımıdır; (2x−1)³ ise iç içe kurulmuş bir bileşkedir. Görselde iki bağımsız kolun birleşmesi ile bir kutunun çıktısının öteki kutuya girmesi farklı yollar olarak gösterilir.",
        "Önce dış yapıyı adlandır, sonra iç parçalara isim ver. Aynı ifadede birkaç kural birlikte gerekebilir. Bir sonucun yalnız bir x değerinde tesadüfen doğru çıkması kuralı doğrulamaz; türev ifadesini ve en az bir başka izinli noktayı da denetle.",
      ],
    },
    {
      title: "Polinom terimlerini ve iç içe yapıyı oku",
      paragraphs: [
        "Polinomda x’in üsleri negatif olmayan tam sayılardır. 3x²−2x+5 ifadesinde 3 ve −2 katsayı, 5 sabit terimdir; 3x², 3·x·x anlamına gelir. x² ile 2x aynı işlem değildir. Türevde terimlerin katsayıları ve işaretleri korunarak her kuvvet ayrı işlenir.",
        "u(x) ve v(x) yalnız adlandırılmış iki fonksiyondur. u(x)v(x) aynı x’te üretilen iki çıktıyı çarpar; u(v(x)) önce v’yi çalıştırır, sonra çıkan sayıyı u’ya girdi yapar. Kare parantez [u(x)]² ise u çıktısının karesidir. Önce bu işlem sırasını söyleyebilmek, hangi kuralın gerekli olduğunu anlaşılır kılar.",
      ],
    },
    {
      title: "Türev bir fonksiyon da üretebilir",
      paragraphs: [
        "f′(a) bir noktadaki sayı, f′(x) ise türevin tanımlı olduğu noktalardaki yeni fonksiyondur. f(x)=2x³+x için f′(x)=6x²+1 olur; a=−1 seçilince f′(−1)=7 elde edilir. Önce f(−1) sayısını bulup o sabitin türevini almak başka bir işlemdir.",
        "d/dx, x değişkenine göre türev alma komutudur. dy/dx birinci türevi, d²y/dx² ikinci türevi belirtir. İkinci türev (dy/dx)² değildir: birinci türev fonksiyonunu bir kez daha türevlersin. Birimler de ayrıdır; konumdan hıza, sonra ivmeye geçilir.",
      ],
    },
    {
      title: "Sabitler ve değişen nicelikler",
      paragraphs: [
        "x değişirken c sabit kalıyorsa c’nin türevi sıfırdır; c·u(x) ifadesinde sabit katsayı türevin önünde kalır. Örneğin [−4x³+8]′=−12x². Burada −4 sabittir ama onunla çarpılan x³ değiştiği için bütün terim yok olmaz.",
        "Bir parametre x’e bağlı değilse türev boyunca sabit tutulur. f(x)=a x²+b için f′(x)=2ax olur. Sonradan a veya b koşulla bulunabilir; parametreyi keyfî olarak 1 seçmek verilen fonksiyon ailesini değiştirir. Hangi değişkene göre türev alındığını her adımda koru.",
      ],
    },
    {
      title: "Kuvvet kuralını tanım alanıyla uygula",
      paragraphs: [
        "Pozitif tam sayı n için (xⁿ)′=n xⁿ⁻¹ bütün gerçek noktalarda geçerlidir. Katsayı varsa onunla çarpılır; polinomun toplamındaki her terim ayrı işlenir. 4x⁵−3x²+2x−9 ifadesinin türevi 20x⁴−6x+2 olur.",
        "Negatif üs, payda şartı taşır: x⁻²=1/x² yalnız x≠0 için tanımlıdır ve türevi −2x⁻³ olur. Formülü yazmak başlangıçta yasak noktaya değer vermez. Bir polinomun türevi yine polinomdur; rasyonel ifadenin deliği ise ayrıca takip edilir.",
      ],
    },
    {
      title: "Rasyonel üslerde kökün türünü ayır",
      paragraphs: [
        "x^(p/q) ifadesinde kesri sadeleştirip q’nun tek veya çift oluşuna bak. Tek dereceli gerçek kök negatif girdide de tanımlanabilir; çift dereceli kökte girdi negatif olamaz. Örneğin x^(2/3), gerçek küpkökün karesi olarak negatif x için de anlamlıdır.",
        "İç noktada türev kuralı p/q·x^(p/q−1) biçiminde uygulanır; sıfır ve tanım aralığı sınırları ayrı incelenir. √x için formül x>0’da geçerlidir; 0 noktasına sol taraftan gerçek girdiler yoktur. Keşifte bu durum sonlu iki yanlı türev varmış gibi gösterilmez.",
      ],
    },
    {
      title: "Tek bir ara formül bütün fonksiyonun kaderi değildir",
      paragraphs: [
        "∛x fonksiyonunun 0’da sonlu türevi yoktur; fakat x²∛x fonksiyonunun 0’daki fark oranı h∛h olur ve sıfıra yaklaşır. Çarpım kuralının bir varsayımı o noktada bozulduğunda bütün ürünün türevsiz olduğunu hemen söyleyemezsin.",
        "Böyle bir noktada ilk fonksiyona dön ve fark oranını sadeleştir. Uygun bir eşdeğer ifade veya tek yanlı hesap gerçek sonucu belirler. Kurallar yeterli koşullarla çalışır; bir kuralın uygulanamaması, her zaman türevin yok olduğunun kanıtı değildir.",
      ],
    },
    {
      title: "Toplamda katkılar toplanır, farkta sıra korunur",
      paragraphs: [
        "u ve v ilgili noktada türevlenebilirse (u+v)′=u′+v′, (u−v)′=u′−v′ olur. İki kolun değerini toplamak ile türevlerini toplamak ayrı satırlarda gösterilir. Bir fonksiyon değeri büyükken türevi küçük veya negatif olabilir.",
        "f(x)=x³+2x ve g(x)=3x²−1 için (f−g)′=3x²+2−6x. Parantez açarken ikinci fonksiyonun bütün terimlerine eksi dağılır. İki fonksiyonun türevleri aynıysa farkları bağlantılı bir aralıkta sabit olabilir; bu, fonksiyonların kendilerinin eşit olmasını gerektirmez.",
      ],
    },
    {
      title: "Çarpımın iki ayrı değişim katkısı",
      paragraphs: [
        "(uv)′=u′v+uv′ kuralında ilk katkı u değişirken v’nin o andaki değerini, ikinci katkı v değişirken u’nun değerini kullanır. Küçük değişimde iki artışın çarpımı daha yüksek dereceden bir terimdir; türev limitinde iki birinci derece katkı kalır.",
        "Yalnız u′v′ çarpmak iki katkıyı da yanlış kurar. Keşifte her katkı ayrı renkte ve sayısal satırda gösterilir; son türev bu ikisinin toplamıdır. Bir çarpan o noktada sıfır olsa bile onun türevi ile diğer çarpanın değeri bir katkı verebilir; ürünü önce sayıya indirgeme.",
      ],
    },
    {
      title: "Bölümde pay sırası ve payda koşulu",
      paragraphs: [
        "v≠0 iken (u/v)′=(u′v−uv′)/v² olur. Paydaki ilk terim payın değişimini, çıkarılan terim paydanın değişiminin oran üzerindeki etkisini taşır. Payda değişimi büyüklüğü azaltabilir; türevleri doğrudan birbirine bölmek bu etkiyi temsil etmez.",
        "Önce paydanın yasak köklerini yaz. Payı ve paydayı ortak çarpanla sadeleştirsen bile ilk fonksiyonun tanım kümesini koru. Keşif, payda sıfırken yanıltıcı bir sayı veya başarı mesajı üretmez; o noktada fonksiyonun tanımsız olduğunu açıkça gösterir.",
      ],
    },
    {
      title: "Zincirde dış türev doğru girdide değerlendirilir",
      paragraphs: [
        "f(g(x)) bileşkesinin türevi f′(g(x))·g′(x) olur. Dış türevin girdisi x değil, iç fonksiyonun ürettiği g(x) değeridir. Örneğin f(t)=t³ ve g(x)=2x+3 için sonuç 3(2x+3)²·2; iki kutudan geçiş sırası korunur.",
        "Bileşke ters sırada alınırsa başka fonksiyon oluşabilir. g(f(x)) için dış fonksiyon g’dir. Bir noktada f ve g’nin yalnız gerekli değerlerini bilmek yeterli olabilir; tabloda önce g(a), sonra f′(g(a)), ayrıca g′(a) okunur. Bunları f′(a) ile keyfî değiştirme.",
      ],
    },
    {
      title: "Kök ve ters kuvvette iç türevi unutma",
      paragraphs: [
        "Uygun gerçek alanda [u(x)]ⁿ türevi n[u(x)]ⁿ⁻¹u′(x) olur. √(3x+2) için türev 3/[2√(3x+2)] ve iç nokta koşulu x>−2/3’tür. (2x²+1)⁻¹ için türev −4x/(2x²+1)², bütün gerçek x’te tanımlıdır.",
        "Birden çok iç katman varsa dıştan içe her türev çarpanı yerinde değerlendirilir. [1+(x−2)²]³ örneğinde kuvvet 3, sonra kareden 2(x−2) gelir; son iç doğrusal ifadenin türevi 1’dir. İç türevi unutmak bazen doğru işareti koruyup büyüklüğü yanlış yapar.",
      ],
    },
    {
      title: "Fonksiyon eşitliği verildiğinde doğru noktayı bul",
      paragraphs: [
        "f(3x−2)=x²+4x eşitliğinden türev alınırsa 3f′(3x−2)=2x+4 bulunur. f′(4) isteniyorsa önce 3x−2=4 çözülüp x=2 seçilir. Bu x, f’nin girdisi olan 4 ile aynı sayı olmak zorunda değildir.",
        "Değişkeni hangi tarafta yerine koyduğunu açıkça yaz. Eşitlik yalnız belirtilen bir aralıkta verildiyse türev de o kapsamda kullanılır. Bileşke türevini bulduktan sonra iç doğrusal katsayıya bölmeyi atlama; d/dx ile d/du aynı operatör değildir.",
      ],
    },
    {
      title: "İkinci türevde yeniden değişimi hesapla",
      paragraphs: [
        "f″(x), f′ fonksiyonunun türevidir. f(x)=x⁴−2x³ için f′=4x³−6x², f″=12x²−12x olur. Bir noktadaki f′ değeri sıfır olsa da f″ sıfır olmak zorunda değildir; tek bir sayıdan ikinci türevi çıkaramazsın.",
        "Bir fonksiyon bir kez türevlenebilirken iki kez türevlenmeyebilir. Parçalı ifadelerde önce birinci türevlerin birleşimini, ardından ikinci türevin iki tarafını kontrol et. Daha ileri türev sembolü, bütün noktalarda otomatik varlık garantisi değildir.",
      ],
    },
    {
      title: "Parçalı fonksiyonda önce değer sonra eğim",
      paragraphs: [
        "Bir birleşme noktasında iki yanın türevlerini eşitlemeden önce sürekliliği kur. Değerlerde sıçrama varsa, parçaların ayrı ayrı sonlu eğimleri bulunması bütün fonksiyonun o noktada türevlenmesini sağlamaz. Noktayı hangi parçanın içerdiği de f(a) değerini belirler.",
        "Doğrusal ve polinom parçalar için bu iş iki cebirsel eşitliğe dönüşebilir: önce birleşme değerleri, sonra sağ-sol türevler. Parametreleri bulunca ilk parçalı tanıma geri koy. Eşit eğim ile eşit fonksiyon değeri iki farklı koşuldur; birinin yerine öteki yazılmaz.",
      ],
    },
    {
      title: "Sadeleştir, ama eşitliğin kapsamını koru",
      paragraphs: [
        "Bazı ifadelerde açılım yapmak kural yükünü azaltır: x²·x³=x⁵ bütün gerçek x’te aynı fonksiyondur. Buna karşılık (x²−a²)/(x−a)=x+a eşitliği yalnız x≠a için geçerlidir. İlk fonksiyonun deliği sade biçimde görünmese de varlığını sürdürür.",
        "İki yöntem kullanabildiğinde türevleri izinli ortak alanda karşılaştır. Bu kontrol yeni bir tanım icat etmez; bir cebir hatasını yakalar. Sınır veya delik noktasında sürekli uzatma ayrıca tanımlanmadıkça türev sayısı ekleme.",
      ],
    },
    {
      title: "Keşifte kanıt üret ve birimini oku",
      paragraphs: [
        "Kural keşfinde iki polinomun katsayılarını, noktayı ve işlemi seç. Değer satırını türev satırından ayrı oku; çarpımda iki katkıyı, bileşkede dış ve iç türev çarpanını takip et. Bir değişkeni sabit tutarak farklı bir noktaya geç ve sonucu önce tahmin et.",
        "Rasyonel kuvvet panelinde negatif girdiyi, tek-çift kökü ve sıfırı karşılaştır. İç nokta, sınır noktası ve gerçek tanım dışı durumları aynı sonuç etiketiyle örtülmez. Bu keşif çözümü açar; bağımsız soru başarısı veya ustalık kaydı üretmez. Ardından kendi sorusuna geçip yardımsız aktarımı dene.",
      ],
    },
  ],
  examples: [
    {
      title: "Önce türev, sonra nokta",
      prompt: "f(x)=3x⁵−2x²+6 için f′(2) nedir?",
      strategy: "Her terime kuvvet kuralı uygula.",
      steps: [
        {
          label: "Türev fonksiyonu",
          explanation: "f′(x)=15x⁴−4x; 6 sabitinin türevi 0.",
        },
        {
          label: "Noktada hesap",
          explanation: "f′(2)=15·16−8=232.",
        },
        {
          label: "Anlam",
          explanation: "232, f(2) değeri değil bu noktadaki değişim oranıdır.",
        },
      ],
      answer: "232.",
      check: "f(2)=94; değer ile türev farklı nicelikler.",
      pitfall: "Önce f(2) sayısının türevini alıp 0 bulma.",
    },
    {
      title: "Kök ve payda koşulu",
      prompt: "f(x)=3√x+2/x, x>0. f′(9) kaçtır?",
      strategy: "İki terimi 3x^(1/2)+2x⁻¹ biçiminde oku.",
      steps: [
        {
          label: "Türev",
          explanation: "f′(x)=3/(2√x)−2/x², x>0.",
        },
        {
          label: "Yerine koy",
          explanation: "x=9 için 1/2−2/81=(81−4)/162=77/162.",
        },
        {
          label: "Koşul",
          explanation:
            "9 hem karekökün iç noktası hem paydanın izinli değeridir.",
        },
      ],
      answer: "77/162.",
      check:
        "Yaklaşık=0,4753; iki pozitif terimli fonksiyonun türevi terimlerden birinde negatif olabilir.",
      pitfall: "2/x türevini +2/x² yazma.",
    },
    {
      title: "Çarpımın iki katkısını say",
      prompt: "y=(x²−1)(2x+3) için y′(2) kaçtır?",
      strategy: "Bir çarpanı türevlerken ötekini yerinde tut.",
      steps: [
        {
          label: "İlk katkı",
          explanation: "u′v=2x(2x+3); x=2 için 4·7=28.",
        },
        {
          label: "İkinci katkı",
          explanation: "uv′=(x²−1)·2; x=2 için 3·2=6.",
        },
        {
          label: "Toplam",
          explanation: "y′(2)=28+6=34.",
        },
      ],
      answer: "34.",
      check: "Açılım 2x³+3x²−2x−3; türev 6x²+6x−2, x=2 için 34.",
      pitfall: "Yalnız 2x·2 çarpımını sonuç sanma.",
    },
    {
      title: "Bölümün pay sırasını koru",
      prompt: "f(x)=(x²+2)/(x+1) için f′(1) kaçtır?",
      strategy: "Payda x=−1 yasağını tut, bölüm kuralını uygula.",
      steps: [
        {
          label: "Nokta değerleri",
          explanation: "u(1)=3, u′(1)=2, v(1)=2, v′(1)=1.",
        },
        {
          label: "Bölüm kuralı",
          explanation: "f′(1)=(2·2−3·1)/2²=1/4.",
        },
        {
          label: "Tanım",
          explanation: "1 izinlidir; −1 başlangıç fonksiyonunda yasaktır.",
        },
      ],
      answer: "1/4.",
      check: "Önce x−1+3/(x+1) yazılırsa türev 1−3/(x+1)²; x=1 için 1/4.",
      pitfall: "Paydaki iki terimi ters sırada çıkarıp−1/4 bulma.",
    },
    {
      title: "Bileşkede hangi kutu dışarıda?",
      prompt: "y=(4x−3)³ için y′(1) nedir?",
      strategy: "Dış fonksiyon t³, iç fonksiyon 4x−3.",
      steps: [
        {
          label: "Dış türev",
          explanation: "3(4x−3)²; içerideki değer yerinde kalır.",
        },
        {
          label: "İç türev",
          explanation: "d(4x−3)/dx=4; toplam türev 12(4x−3)².",
        },
        {
          label: "Noktada",
          explanation: "x=1 için 12·1²=12.",
        },
      ],
      answer: "12.",
      check: "İç katsayı4 olmadan bulunan3, doğru sonucun dörtte biri olur.",
      pitfall: "Dış türevi3x² diye yanlış girdide değerlendirme.",
    },
    {
      title: "Fonksiyonun girdisi farklı bir değişkendir",
      prompt: "f(3x+2)=x²−x bütün gerçek x için veriliyor. f′(8) kaçtır?",
      strategy: "Önce türev al, sonra iç girdiyi8 yap.",
      steps: [
        {
          label: "Zincir",
          explanation: "3f′(3x+2)=2x−1.",
        },
        {
          label: "Doğru nokta",
          explanation: "3x+2=8 ⇒ x=2; sağ taraf2·2−1=3.",
        },
        {
          label: "Oranı çöz",
          explanation: "3f′(8)=3 ⇒ f′(8)=1.",
        },
      ],
      answer: "1.",
      check: "u=3x+2 yazılırsa f(u)=((u−2)/3)²−(u−2)/3; türevi u=8 için 1.",
      pitfall: "x yerine 8 koyup f′(26) hesaplama.",
    },
    {
      title: "Parçalar birleşince iki koşul gerekir",
      prompt:
        "f(x)=ax+b, x<−1; f(x)=x²+2x+3, x≥−1. −1’de türevli olması için a, b nedir?",
      strategy: "Değer eşitliği ile sağ-sol eğimi ayrı kur.",
      steps: [
        {
          label: "Sağdaki değer",
          explanation: "f(−1)=1−2+3=2; süreklilik −a+b=2 ister.",
        },
        {
          label: "Sağdaki eğim",
          explanation: "2x+2, x=−1 için 0; sol eğim a olduğundan a=0.",
        },
        {
          label: "Geri koy",
          explanation: "−0+b=2 ⇒ b=2; iki yanın değeri2, eğimi 0.",
        },
      ],
      answer: "a=0, b=2.",
      check:
        "Parçaları bu değerlerle yazıp iki taraftan fark oranının0’a gittiğini denetle.",
      pitfall: "Sadece eğimleri eşitleyip sabit terim b’yi serbest bırakma.",
    },
    {
      title: "Ara çarpanın türevsizliği bütüne taşınmaz",
      prompt:
        "F(x)=x⁴∛x bütün gerçeklerde tanımlı. F′(0) değerini tanımdan bul.",
      strategy:
        "∛x için 0’daki türev kuralını zorlamadan F’nin fark oranını kur.",
      steps: [
        {
          label: "Fark oranı",
          explanation: "F(0)=0; h≠0 için [h⁴∛h−0]/h=h³∛h.",
        },
        {
          label: "İki yön",
          explanation: "h³∛h=|h|^(10/3)→0; sağ ve sol sonuç aynı.",
        },
        {
          label: "Sonuç",
          explanation: "F′(0)=0; çarpımın doğrudan limit hesabı yeterlidir.",
        },
      ],
      answer: "0.",
      check:
        "Sonucun varlığı, ∛x tek başına=0’da sonlu türevli demek değildir.",
      pitfall:
        "Çarpım kuralının varsayımı bozulunca bütün ürün kesin türevsizdir deme.",
    },
    {
      title: "İkinci türevi sayıdan değil fonksiyondan bul",
      prompt: "f(x)=2x⁴−x³+5x için f″(−1) nedir?",
      strategy:
        "Birinci türev fonksiyonunu kur, onu yeniden türevle ve en son noktayı kullan.",
      steps: [
        {
          label: "Birinci türev",
          explanation: "f′(x)=8x³−3x²+5; 5x terimi 5 katkısı verir.",
        },
        {
          label: "İkinci türev",
          explanation: "f″(x)=24x²−6x; bir önceki sabit 5 bu kez sıfırlanır.",
        },
        {
          label: "Noktadaki sonuç",
          explanation: "f″(−1)=24+6=30. f′(−1)=−6 ayrı bir sayıdır.",
        },
      ],
      answer: "30.",
      check:
        "f′(−1+h)−f′(−1) ifadesini h’ye bölünce 30−27h+8h² çıkar; limit 30.",
      pitfall: "Birinci türev değerinin karesini alarak 36 sonucuna gitme.",
    },
    {
      title: "İç içe üç işlemin türevini izle",
      prompt: "y=[1+(3x−2)²]³ için y′(1) kaçtır?",
      strategy: "Dış küp, iç kare ve en iç doğruyu sırayla türevle.",
      steps: [
        {
          label: "Dış katman",
          explanation: "Küpün türevi 3[1+(3x−2)²]² olur; iç ifade korunur.",
        },
        {
          label: "İç katmanlar",
          explanation:
            "Köşeli parantezin türevi 2(3x−2)·3; toplam türev 18(3x−2)[1+(3x−2)²]².",
        },
        {
          label: "Noktayı değerlendir",
          explanation: "x=1 için 3x−2=1 ve köşeli parantez 2; y′(1)=18·1·4=72.",
        },
      ],
      answer: "72.",
      check:
        "En iç katsayı 3 atlanırsa 24 çıkar; üç katmanın katkısı ayrı izlenir.",
      pitfall:
        "Dış kuvveti azaltırken iç ifadeyi değiştirme veya en iç doğrusal katsayıyı atlama.",
    },
  ],
  recall: [
    {
      prompt: "Bileşkede dış türev neden iç çıktıda değerlendirilir?",
      answer:
        "Dış fonksiyonun gerçek girdisi g(a) olduğu için f′(g(a)) gerekir; sonra iç değişim g′(a) ile çarpılır.",
    },
    {
      prompt: "∛x tek başına=0’da sonlu türevli değilse x²∛x için ne söylenir?",
      answer:
        "Yokluk otomatik taşınmaz; bütün ifadenin fark oranı h∛h→0 olduğundan ürünün türevi0 olabilir.",
    },
    {
      prompt: "Sadeleşen paydanın yasak noktası ne zaman geri gelir?",
      answer:
        "Kendiliğinden gelmez; fonksiyon ayrıca o noktada tanımlanırsa yeni fonksiyonun türevi yeniden incelenir.",
    },
    {
      prompt: "İkinci türev birinci türevin karesi midir?",
      answer:
        "Hayır; birinci türev fonksiyonunun yeniden türevidir ve ayrıca varlığı gerekir.",
    },
  ],
  source:
    "MEBİ AYT Matematik Konu Özetleri, PDF 78–89 (basılı 76–87); OGM AYT Matematik Türev Video Ders Notu, 31 sayfa; Dersler Cepte 12. Sınıf Matematik Limit–Süreklilik–Türev, fiziksel sayfalar 15–18 ve 21. Tanım alanı ve türevlenebilirlik koşulları karşılaştırılarak hazırlanmış özgün öğretim. Alıştırmalar özgündür; resmî sınav soruları değildir.",
  questions: [
    {
      prompt: "f(x)=5x⁴−3x²+7 için f′(1) kaçtır?",
      hint: "Önce fonksiyonu türevle, sonra x=1 yaz.",
      explanation: "f′(x)=20x³−6x. f′(1)=20−6=14.",
      guidance: {
        knowledge: [
          "Polinomda her terim ayrı türevlenir; sabit terimin türevi sıfırdır.",
        ],
        strategy: "Önce fonksiyonu türevle, sonra x=1 yaz.",
        steps: ["f′(x)=20x³−6x.", "f′(1)=20−6=14."],
        optionReasons: [
          "9, f(1) değeridir; türev değildir.",
          "20, −3x² teriminin −6x katkısını atlar.",
          "17, ikinci kuvvetin türevindeki 2 katsayısını unutunca çıkar.",
          "Doğru: Yakın fark oranları 14’e yaklaşmalı; f(1)=9 ayrı bir değerdir.",
          "x=1 konumunu önce yerine koyup sabitin türevini almak istenen işlemi değiştirir.",
        ],
        commonError: "f′(1) ile [f(1)] sayısının türevini karıştırma.",
        check: "Yakın fark oranları 14’e yaklaşmalı; f(1)=9 ayrı bir değerdir.",
      },
      options: ["9", "20", "17", "14", "0"],
      answer: 3,
    },
    {
      prompt: "f(x)=4√x−3/x, x>0. f′(4) kaçtır?",
      hint: "Karekök ve ters kuvveti ayrı türevle.",
      explanation: "f′(x)=2/√x+3/x². x=4 için 1+3/16=19/16.",
      guidance: {
        knowledge: [
          "(√x)′=1/(2√x), (x⁻¹)′=−x⁻², ilgili gerçek iç noktalarında geçerlidir.",
        ],
        strategy: "Karekök ve ters kuvveti ayrı türevle.",
        steps: ["f′(x)=2/√x+3/x².", "x=4 için 1+3/16=19/16."],
        optionReasons: [
          "Doğru: 4 izinli iç noktadır; 2/√4=1 ve 3/4²=3/16.",
          "13/16, ters kuvvetin türevindeki negatif işareti yanlış korur.",
          "1 yalnız karekök teriminin katkısıdır.",
          "19/8 sonucunda katsayılar fazladan iki katına çıkarılmıştır.",
          "İki türev katkısı da bu noktada pozitiftir; sonuç negatif olamaz.",
        ],
        commonError: "−3 katsayısıyla −1 kuvvetin iki eksi işaretini koru.",
        check: "4 izinli iç noktadır; 2/√4=1 ve 3/4²=3/16.",
      },
      options: ["19/16", "13/16", "1", "19/8", "−19/16"],
      answer: 0,
    },
    {
      prompt:
        "F(x)=x∛x bütün gerçek sayılarda tanımlı. F′(0) için doğru sonuç hangisidir?",
      hint: "Bütün F fonksiyonunun fark oranını kur.",
      explanation:
        "F(0)=0; h≠0 için [F(h)−F(0)]/h=∛h. h sağdan veya soldan 0’a yaklaşırken ∛h→0; F′(0)=0.",
      guidance: {
        knowledge: [
          "Bir çarpanın türevinin yokluğu, bütün çarpımın türevinin yokluğunu tek başına kanıtlamaz.",
        ],
        strategy: "Bütün F fonksiyonunun fark oranını kur.",
        steps: [
          "F(0)=0; h≠0 için [F(h)−F(0)]/h=∛h.",
          "h sağdan veya soldan 0’a yaklaşırken ∛h→0; F′(0)=0.",
        ],
        optionReasons: [
          "1 sonucu ∛h limitini doğru hesaplamaz.",
          "Çarpım kuralının bir varsayımının yokluğundan bütün ürün için yanlış yokluk sonucu çıkarılmıştır.",
          "Negatif h için de ∛h→0; sol limit 1 değildir.",
          "0·∛0=0; F(0) tanımlıdır, tanımsızlık seçeneğinin dayanağı yoktur.",
          "Doğru: F(x)=|x|^(4/3); fark oranı iki yanda da sıfıra yaklaşır.",
        ],
        commonError:
          "Bir ara türev formülü uygulanamıyorsa ilk fonksiyonun limitine dön.",
        check: "F(x)=|x|^(4/3); fark oranı iki yanda da sıfıra yaklaşır.",
      },
      options: [
        "1",
        "Sonlu türev yoktur; ∛x tek başına 0’da türevsizdir.",
        "Yalnız sağ türev 0’dır, sol türev 1’dir.",
        "F(0) tanımsızdır.",
        "0",
      ],
      answer: 4,
    },
    {
      prompt:
        "f(x)=√(2x−6) için f′(x)=1/√(2x−6) formülünün geçerli olduğu gerçek açık aralık nedir?",
      hint: "Fonksiyonun gerçek tanımı ile türev formülünün payda şartını birlikte kullan.",
      explanation:
        "2x−6>0 koşulu türevdeki kök paydasını pozitif yapar. Bu eşitsizlik x>3 verir; 3 fonksiyonun sınır noktasıdır, verilen türev formülünde payda 0 olur.",
      guidance: {
        knowledge: [
          "Çift kökte gerçeklik ve türevde sonlu payda koşulları farklı sınırlar koyabilir.",
        ],
        strategy:
          "Fonksiyonun gerçek tanımı ile türev formülünün payda şartını birlikte kullan.",
        steps: [
          "2x−6>0 koşulu türevdeki kök paydasını pozitif yapar.",
          "Bu eşitsizlik x>3 verir; 3 fonksiyonun sınır noktasıdır, verilen türev formülünde payda 0 olur.",
        ],
        optionReasons: [
          "3 fonksiyon için izinli olsa da bu türev formülünde 1/0 oluşur.",
          "x<3 için kök içi negatiftir; gerçek fonksiyon değeri yoktur.",
          "Doğru: x=4 için türev 1/√2; x=3 için formül tanımsız.",
          "Negatif kök içini ve sıfır paydayı kabul eder.",
          "0<x<3 değerleri kök içini negatif yapar; alt sınır 0 değil 3.",
        ],
        commonError:
          "Fonksiyonun tanım kümesini türev formülünün alanıyla otomatik eşitleme.",
        check: "x=4 için türev 1/√2; x=3 için formül tanımsız.",
      },
      options: ["[3,∞)", "(−∞,3)", "(3,∞)", "ℝ", "(0,∞)"],
      answer: 2,
    },
    {
      prompt: "y=(x²+2)(3x−1) için y′(1) kaçtır?",
      hint: "Çarpım kuralının iki katkısını ayrı hesapla.",
      explanation: "x=1 için u=3, u′=2, v=2, v′=3. y′(1)=2·2+3·3=4+9=13.",
      guidance: {
        knowledge: ["(uv)′=u′v+uv′."],
        strategy: "Çarpım kuralının iki katkısını ayrı hesapla.",
        steps: ["x=1 için u=3, u′=2, v=2, v′=3.", "y′(1)=2·2+3·3=4+9=13."],
        optionReasons: [
          "6, yalnız u′v′=2·3 çarpımıdır; çarpım kuralı değildir.",
          "4 yalnız ilk katkıdır; uv′=9 atlanmıştır.",
          "Doğru: Açılım 3x³−x²+6x−2; türev 9x²−2x+6, x=1 için 13.",
          "9 yalnız ikinci katkıdır; u′v=4 atlanmıştır.",
          "5, türevlerin toplamı2+3; burada toplam değil çarpım fonksiyonu vardır.",
        ],
        commonError: "Türevleri çarpmakla çarpımın türevini karıştırma.",
        check: "Açılım 3x³−x²+6x−2; türev 9x²−2x+6, x=1 için 13.",
      },
      options: ["6", "4", "13", "9", "5"],
      answer: 2,
    },
    {
      prompt: "f(x)=(2x+1)/(x−3) için f′(1) kaçtır?",
      hint: "Pay ve payda değerleriyle bölüm kuralının payını kur.",
      explanation:
        "x=1 için u=3, u′=2, v=−2, v′=1. f′(1)=[2·(−2)−3·1]/(−2)²=−7/4.",
      guidance: {
        knowledge: ["(u/v)′=(u′v−uv′)/v², v≠0."],
        strategy: "Pay ve payda değerleriyle bölüm kuralının payını kur.",
        steps: [
          "x=1 için u=3, u′=2, v=−2, v′=1.",
          "f′(1)=[2·(−2)−3·1]/(−2)²=−7/4.",
        ],
        optionReasons: [
          "Paydaki çıkarma sırası ters çevrilmiştir.",
          "Doğru: f(x)=2+7/(x−3); türev −7/(x−3)² aynı sonucu verir.",
          "2, türevleri doğrudan2/1 bölerek bulunan yanlış sonuçtur.",
          "−3/2, f(1) değeridir; türev değildir.",
          "Paydanın karesi4 yerine 2 kullanılmıştır.",
        ],
        commonError:
          "Payda değerinin negatifliğini kareye de eksi olarak taşıma.",
        check: "f(x)=2+7/(x−3); türev −7/(x−3)² aynı sonucu verir.",
      },
      options: ["7/4", "−7/4", "2", "−3/2", "−7/2"],
      answer: 1,
    },
    {
      prompt: "f(t)=t²−t ve g(x)=3x+1 veriliyor. (f∘g)′(1) kaçtır?",
      hint: "Önce g(1), sonra o girdideki f′ değerini bul.",
      explanation: "g(1)=4; f′(4)=2·4−1=7 ve g′(1)=3. (f∘g)′(1)=7·3=21.",
      guidance: {
        knowledge: ["Bileşke türevi f′(g(a))g′(a) biçimindedir."],
        strategy: "Önce g(1), sonra o girdideki f′ değerini bul.",
        steps: ["g(1)=4; f′(4)=2·4−1=7 ve g′(1)=3.", "(f∘g)′(1)=7·3=21."],
        optionReasons: [
          "3 yalnız iç türevdir; dış fonksiyon etkisi atlanmıştır.",
          "7 yalnız dış türevdir; iç katsayı3 ile çarpılmamıştır.",
          "9, g′(1)=3 sayısının karesidir; dış türev f′(g(1))=7 yerine bir kez daha iç türev kullanılmıştır.",
          "Doğru: f(g(x))=9x²+3x; türevi18x+3, x=1 için 21.",
          "1, f′(1) değeridir; yanlış girdide ve zincirsiz hesap yapılmıştır.",
        ],
        commonError: "f′(g(1)) yerine f′(1) kullanma.",
        check: "f(g(x))=9x²+3x; türevi18x+3, x=1 için 21.",
      },
      options: ["3", "7", "9", "21", "1"],
      answer: 3,
    },
    {
      prompt:
        "Türevlenebilir f ve g için f(2)=3, f′(2)=−1, g(1)=2, g′(1)=4 veriliyor. (f∘g)′(1) nedir?",
      hint: "Bileşke türevinde gereken tablo değerlerini sırayla seç.",
      explanation:
        "İç çıktı g(1)=2 olduğundan dış türev f′(2)=−1 gerekir. Bunu iç türev g′(1)=4 ile çarp: (−1)·4=−4.",
      guidance: {
        knowledge: [
          "Fonksiyon değerleri ile türev değerleri birbirinin yerine geçmez.",
        ],
        strategy: "Bileşke türevinde gereken tablo değerlerini sırayla seç.",
        steps: [
          "İç çıktı g(1)=2 olduğundan dış türev f′(2)=−1 gerekir.",
          "Bunu iç türev g′(1)=4 ile çarp: (−1)·4=−4.",
        ],
        optionReasons: [
          "12=f(2)g′(1); dış türev yerine dış değer 3 kullanılmıştır.",
          "−1 dış türevdir; iç türev çarpanı eksik.",
          "4 iç türevdir; dış türevin−1 çarpanı atlanmıştır.",
          "3, f(2) fonksiyon değeridir; bileşke türevi değildir.",
          "Doğru: g′ pozitifken f′ negatif; bileşke bu noktada negatif eğimli olmalı.",
        ],
        commonError:
          "Tabloda aynı girdiyi paylaşan f ve f′ sayılarını karıştırma.",
        check:
          "g′ pozitifken f′ negatif; bileşke bu noktada negatif eğimli olmalı.",
      },
      options: ["12", "−1", "4", "3", "−4"],
      answer: 4,
    },
    {
      prompt: "f(2x−1)=x³+x bütün gerçek x için veriliyor. f′(3) kaçtır?",
      hint: "İç girdiyi3 yapan x’i bul; zincir katsayısını koru.",
      explanation: "2f′(2x−1)=3x²+1; 2x−1=3 ⇒ x=2. 2f′(3)=13 ⇒ f′(3)=13/2.",
      guidance: {
        knowledge: [
          "Bir fonksiyon eşitliği türevlenirken iç fonksiyonun türevi de çarpılır.",
        ],
        strategy: "İç girdiyi3 yapan x’i bul; zincir katsayısını koru.",
        steps: ["2f′(2x−1)=3x²+1; 2x−1=3 ⇒ x=2.", "2f′(3)=13 ⇒ f′(3)=13/2."],
        optionReasons: [
          "Doğru: f(u)=((u+1)/2)³+(u+1)/2 açılımının türevi u=3 için 13/2.",
          "13 iç katsayıya bölmeden önceki sağ taraf değeridir.",
          "7 yazılırsa 2f′(3)=14 olur; eşitliğin sağındaki 3·2²+1=13 ile uyuşmaz.",
          "5/2 yazılırsa 2f′(3)=5 olur; oysa iç girdiyi 3 yapan x=2 için sağ türev 13’tür.",
          "26, zincirdeki2 katsayısını bölmek yerine çarpar.",
        ],
        commonError:
          "İstenen f girdisi3’ü doğrudan eşitlikteki x yerine koyma.",
        check: "f(u)=((u+1)/2)³+(u+1)/2 açılımının türevi u=3 için 13/2.",
      },
      options: ["13/2", "13", "7", "5/2", "26"],
      answer: 0,
    },
    {
      prompt: "f′(x)=3x²−4x+2 olduğuna göre f″(2) kaçtır?",
      hint: "Verilen zaten birinci türev; onu bir kez daha türevle.",
      explanation: "f″(x)=6x−4. f″(2)=12−4=8.",
      guidance: {
        knowledge: [
          "İkinci türev, birinci türev fonksiyonunun türevidir; karesi değildir.",
        ],
        strategy: "Verilen zaten birinci türev; onu bir kez daha türevle.",
        steps: ["f″(x)=6x−4.", "f″(2)=12−4=8."],
        optionReasons: [
          "6, f′(2)=12−8+2 değeridir; ikinci türev değildir.",
          "Doğru: f′(2+h)−f′(2) oranı sadeleşince8+3h; limit8.",
          "64, doğru f″(2) sayısının karesidir; sorulan ikinci türev sayısı8.",
          "12 yalnız 3x² türevinin x=2 katkısıdır; −4x teriminin türevinden gelen −4’ü atlar.",
          "2, verilen birinci türevin sabit terimidir; onun türevi0.",
        ],
        commonError: "f″(x) sembolünü [f′(x)]² olarak okuma.",
        check: "f′(2+h)−f′(2) oranı sadeleşince8+3h; limit8.",
      },
      options: ["6", "8", "64", "12", "2"],
      answer: 1,
    },
    {
      prompt:
        "f(x)=(x²−9)/(x−3) başlangıç tanımıyla veriliyor. f′(3) için hangisi doğrudur?",
      hint: "Sadeleştirmeden önce paydanın yasak noktasını yaz.",
      explanation:
        "x≠3 için f(x)=x+3 ve bu alanda f′(x)=1. Başlangıç fonksiyonu=3’te0/0 olduğundan f′(3) yoktur; ayrıca uzatma verilmemiştir.",
      guidance: {
        knowledge: [
          "Bir noktada türev için ilk fonksiyonun o noktada tanımlı olması gerekir.",
        ],
        strategy: "Sadeleştirmeden önce paydanın yasak noktasını yaz.",
        steps: [
          "x≠3 için f(x)=x+3 ve bu alanda f′(x)=1.",
          "Başlangıç fonksiyonu=3’te0/0 olduğundan f′(3) yoktur; ayrıca uzatma verilmemiştir.",
        ],
        optionReasons: [
          "1 yalnız x≠3 noktalarında geçerlidir.",
          "Fonksiyon değeri tanımsızken türevi0 atanamaz.",
          "6, sürekli uzatmanın olası fonksiyon değeridir; başlangıçta türev değildir.",
          "x+3 türevi1’dir; ayrıca3 yasağı devam eder.",
          "Doğru: Fonksiyonun tanımı3’te ayrıca6 olarak tamamlansaydı farklı bir fonksiyon için türev 1 bulunabilirdi.",
        ],
        commonError: "Sadeleşen ifadenin türevini yasak noktaya geri ekleme.",
        check:
          "Fonksiyonun tanımı3’te ayrıca6 olarak tamamlansaydı farklı bir fonksiyon için türev 1 bulunabilirdi.",
      },
      options: [
        "1",
        "0",
        "6",
        "Sadeleştiği için her x’te2’dir.",
        "Tanımsızdır; f(3) tanımlı değildir.",
      ],
      answer: 4,
    },
    {
      prompt:
        "f(x)=ax+b, x<2; f(x)=x²+1, x≥2. f, x=2’de türevli ise a+b kaçtır?",
      hint: "Birleşme değerini ve iki tarafın eğimini ayrı eşitle.",
      explanation:
        "Sağ eğim 2·2=4; sol eğim a olduğundan a=4. Süreklilik=2a+b=2²+1=5 verir; b=−3 ve a+b=1.",
      guidance: {
        knowledge: [
          "Parçalı türevlenebilirlikte süreklilik ve eşit sonlu tek yanlı türev birlikte gerekir.",
        ],
        strategy: "Birleşme değerini ve iki tarafın eğimini ayrı eşitle.",
        steps: [
          "Sağ eğim 2·2=4; sol eğim a olduğundan a=4.",
          "Süreklilik=2a+b=2²+1=5 verir; b=−3 ve a+b=1.",
        ],
        optionReasons: [
          "9 sonucu, a=4 bulduktan sonra b’yi yanlışlıkla +5 alır; 2a+b=5 süreklilik eşitliğini bozarak 13 verir.",
          "4 yalnız a değeridir; b eklenmemiştir.",
          "−3 yalnız b değeridir; a eklenmemiştir.",
          "Doğru: 2·4−3=5; hem sağ hem sol eğim 4.",
          "5 birleşme noktası f(2) değeridir; a+b değildir.",
        ],
        commonError:
          "Eşit eğimin sürekliliği kendiliğinden sağladığını varsayma.",
        check: "2·4−3=5; hem sağ hem sol eğim 4.",
      },
      options: ["9", "4", "−3", "1", "5"],
      answer: 3,
    },
    {
      prompt:
        "f(x)=(k²−4)x³+(k−2)x+9 fonksiyonunun türevi bütün gerçek x’te0 ise gerçek k nedir?",
      hint: "Türev polinomunun her katsayısını sıfırla.",
      explanation:
        "f′(x)=3(k²−4)x²+(k−2). Sabit terim k−2=0 ⇒ k=2; bu değer x² katsayısını da sıfırlar.",
      guidance: {
        knowledge: ["Bir polinom her x için 0 ise bütün katsayıları0’dır."],
        strategy: "Türev polinomunun her katsayısını sıfırla.",
        steps: [
          "f′(x)=3(k²−4)x²+(k−2).",
          "Sabit terim k−2=0 ⇒ k=2; bu değer x² katsayısını da sıfırlar.",
        ],
        optionReasons: [
          "k=−2 için x² katsayısı0 ama sabit türev −4; koşul bozulur.",
          "Doğru: k=2 yerine koyunca iki değişen terim de kalkar, yalnız 9 kalır.",
          "k=0 için türev −12x²−2; sıfır değildir.",
          "k4 için türev 36x²+2; sıfır değildir.",
          "Örneğin k=0 koşulu sağlamaz; her k çözüm değildir.",
        ],
        commonError: "Yalnız k²−4=0 koşulunu çözüp ikinci katsayıyı unutma.",
        check:
          "k=2 yerine koyunca iki değişen terim de kalkar, yalnız 9 kalır.",
      },
      options: ["−2", "2", "0", "4", "Her gerçek k"],
      answer: 1,
    },
    {
      prompt: "y=(2x−1)⁻³ için y′(1) nedir?",
      hint: "Negatif kuvvet ile iç doğrusal türevi çarp.",
      explanation:
        "y′=−3(2x−1)⁻⁴·2=−6(2x−1)⁻⁴. x=1 için iç 1 olduğundan y′(1)=−6; nokta x=1/2 yasağından farklı.",
      guidance: {
        knowledge: ["[u(x)]ⁿ türevi n u^(n−1)u′; negatif kuvvette u≠0."],
        strategy: "Negatif kuvvet ile iç doğrusal türevi çarp.",
        steps: [
          "y′=−3(2x−1)⁻⁴·2=−6(2x−1)⁻⁴.",
          "x=1 için iç 1 olduğundan y′(1)=−6; nokta x=1/2 yasağından farklı.",
        ],
        optionReasons: [
          "Doğru: y=1/(2x−1)³ fonksiyonu 1 çevresinde azalır; türev negatif.",
          "−3, iç türev 2 çarpanını atlar.",
          "6, negatif kuvvetin işaretini kaybeder.",
          "−12, iç katsayıyı fazladan bir kez daha çarpar.",
          "1, y(1) fonksiyon değeridir; türev değildir.",
        ],
        commonError: "Üs−3’ü azaltınca−4 geldiğini koru; −2 yapma.",
        check: "y=1/(2x−1)³ fonksiyonu 1 çevresinde azalır; türev negatif.",
      },
      options: ["−6", "−3", "6", "−12", "1"],
      answer: 0,
    },
    {
      prompt:
        "g(x)=|x−1| ve f(t)=t⁴. H(x)=f(g(x)) fonksiyonu için H′(1) nedir?",
      hint: "Bütün bileşkeyi eşdeğer basit ifadeye getir.",
      explanation:
        "H(x)=|x−1|⁴=(x−1)⁴, bütün gerçek x’te. H′(x)=4(x−1)³; H′(1)=0.",
      guidance: {
        knowledge: [
          "Zincir kuralının iç türev varsayımı o noktada yoksa bile bileşkenin türevi doğrudan incelenebilir.",
        ],
        strategy: "Bütün bileşkeyi eşdeğer basit ifadeye getir.",
        steps: [
          "H(x)=|x−1|⁴=(x−1)⁴, bütün gerçek x’te.",
          "H′(x)=4(x−1)³; H′(1)=0.",
        ],
        optionReasons: [
          "g′(1) yokluğu yalnız doğrudan zincir kuralını engeller; bütün H türevini yok saydırmaz.",
          "4 dış kuvvet katsayısıdır; (x−1)³ çarpanı nokta 1’de 0.",
          "Doğru: H(1+h)=h⁴; fark oranıh³→0.",
          "1, kuvvet ve kaydırma türevini karşılamaz.",
          "−4 için de nokta çarpanı0 atlanmıştır.",
        ],
        commonError:
          "İç fonksiyonun köşesinin her dış fonksiyondan sonra aynen kalacağını varsayma.",
        check: "H(1+h)=h⁴; fark oranıh³→0.",
      },
      options: ["Tanımsızdır; g′(1) yoktur.", "4", "0", "1", "−4"],
      answer: 2,
    },
    {
      prompt:
        "F(x)=(x²+1)/(x²+1) ilk tanımıyla veriliyor. F′(x) için doğru ifade hangisidir?",
      hint: "Paydanın gerçekten sıfır olup olmadığını denetle.",
      explanation:
        "x²+1≥1 olduğundan payda hiçbir gerçek x’te0 olmaz. F(x)=1 bütün gerçeklerde sabittir; türev her yerde 0.",
      guidance: {
        knowledge: [
          "Sadeleştirme sonrası alan, başlangıç paydasının gerçek sıfırlarıyla kısıtlanır.",
        ],
        strategy: "Paydanın gerçekten sıfır olup olmadığını denetle.",
        steps: [
          "x²+1≥1 olduğundan payda hiçbir gerçek x’te0 olmaz.",
          "F(x)=1 bütün gerçeklerde sabittir; türev her yerde 0.",
        ],
        optionReasons: [
          "x=0’da payda 1; tanımsızlık yok.",
          "1, fonksiyonun değeridir; sabitin türevi0.",
          "±1 için payda 2; bu noktaları çıkarmak için neden yoktur.",
          "2x, payın türevidir; paydanın etkisini veya sabit oranı atlar.",
          "Doğru: Bölüm kuralının payı 2x(x²+1)−(x²+1)2x=0.",
        ],
        commonError: "Payda var diye otomatik x=0 veya ±1 yasağı ekleme.",
        check: "Bölüm kuralının payı 2x(x²+1)−(x²+1)2x=0.",
      },
      options: [
        "x=0’da tanımsızdır.",
        "Bütün gerçek x’te1’dir.",
        "Yalnız x≠±1 için 0’dır.",
        "2x’dir.",
        "Bütün gerçek x’te0’dır.",
      ],
      answer: 4,
    },
    {
      prompt:
        "F(x)=(x−2)|x−2| bütün gerçeklerde veriliyor. F′(2)=0 olduğu biliniyor. F″(2) için hangisi doğrudur?",
      hint: "Önce F’nin iki taraftaki polinomlarını, sonra F′ fonksiyonunu yaz.",
      explanation:
        "x<2 için F=−(x−2)², x>2 için F=(x−2)²; F′=2|x−2| ve F′(2)=0. F′’nin2’de soldan türevi−2, sağdan+2; eşit olmadığından F″(2) yok.",
      guidance: {
        knowledge: [
          "Birinci türevin varlığı ikinci türevin varlığını zorunlu kılmaz.",
        ],
        strategy:
          "Önce F’nin iki taraftaki polinomlarını, sonra F′ fonksiyonunu yaz.",
        steps: [
          "x<2 için F=−(x−2)², x>2 için F=(x−2)²; F′=2|x−2| ve F′(2)=0.",
          "F′’nin2’de soldan türevi−2, sağdan+2; eşit olmadığından F″(2) yok.",
        ],
        optionReasons: [
          "Doğru: F′(2+h)/h=2|h|/h; iki yandan farklı sonuç verir.",
          "0, birinci türev değeridir; onun noktasal değeri ikinci türevi belirlemez.",
          "2 yalnız sağdan ikinci türevdir.",
          "−2 yalnız soldan ikinci türevdir.",
          "Tek bir noktada türev 0 olması bütün fonksiyonu sabit yapmaz.",
        ],
        commonError:
          "F′(2) sayısını türevleyip ikinci türev 0 sonucunu çıkarma.",
        check: "F′(2+h)/h=2|h|/h; iki yandan farklı sonuç verir.",
      },
      options: [
        "Yoktur; F′’nin sol eğimi −2, sağ eğimi +2’dir.",
        "0",
        "2",
        "−2",
        "F′(2)=0 olduğundan bütün F sabittir.",
      ],
      answer: 0,
    },
    {
      prompt:
        "f, 2’de türevlenebilir ve f′(2)=7. lim h→0 [f(2+h)−f(2−h)]/h nedir?",
      hint: "Farkı f(2) ekleyip çıkararak iki fark oranına ayır.",
      explanation:
        "İfade [f(2+h)−f(2)]/h + [f(2)−f(2−h)]/h olarak ayrılır. İlk limit7; ikincide t=−h dönüşümüyle yine f′(2)=7 elde edilir. Toplam14.",
      guidance: {
        knowledge: [
          "Türevin iki yanlı varlığı, iki taraftaki uygun fark oranlarını aynı değere götürür.",
        ],
        strategy: "Farkı f(2) ekleyip çıkararak iki fark oranına ayır.",
        steps: [
          "İfade [f(2+h)−f(2)]/h + [f(2)−f(2−h)]/h olarak ayrılır.",
          "İlk limit7; ikincide t=−h dönüşümüyle yine f′(2)=7 elde edilir. Toplam14.",
        ],
        optionReasons: [
          "7, paydada2h olsaydı bulunan sonuçtur; burada h var.",
          "0, iki katkının işaretini yanlış çıkarır; ikinci farkın yönü de ters dönmüştür.",
          "21 için üç katkı gerekir; verilen fark iki eşit katkıdır.",
          "Doğru: f(x)=7x örneğinde pay14h, bölüm14 olur.",
          "h=0’a doğrudan koyulmaz; limit h≠0 değerlerden hesaplanır ve vardır.",
        ],
        commonError: "Simetrik farkta paydanın h mi 2h mi olduğunu atlama.",
        check: "f(x)=7x örneğinde pay14h, bölüm14 olur.",
      },
      options: ["7", "0", "21", "14", "Tanımsızdır; h=0 olamaz."],
      answer: 3,
    },
  ],
};
const advanced024: Item024[] = [
  {
    prompt: "f(x)=x³−2x+1 eğrisinin x=1 noktasındaki teğet denklemi nedir?",
    hint: "Temas noktasını ve türev eğimini ayrı hesapla.",
    explanation: "f(1)=0 ve f′(x)=3x²−2 ⇒ f′(1)=1. y−0=1(x−1); teğet y=x−1.",
    guidance: {
      knowledge: ["Teğet y−f(a)=f′(a)(x−a) ile kurulur."],
      strategy: "Temas noktasını ve türev eğimini ayrı hesapla.",
      steps: ["f(1)=0 ve f′(x)=3x²−2 ⇒ f′(1)=1.", "y−0=1(x−1); teğet y=x−1."],
      optionReasons: [
        "3x−3, −2x teriminin türeve katkısını atlar.",
        "Doğru: Eğri−teğet=x³−3x+2=(x−1)²(x+2); x=1 çift kök.",
        "Eğim doğru ama(1,0) noktasından geçmez; x=1’de 2 verir.",
        "Noktadan geçer fakat eğim −1 yerine +1 olmalı.",
        "y=0 yataydır; türev bu noktada 1.",
      ],
      commonError: "Noktayı bulmadan yalnız türev eğiminden bir doğru seçme.",
      check: "Eğri−teğet=x³−3x+2=(x−1)²(x+2); x=1 çift kök.",
    },
    options: ["y=3x−3", "y=x−1", "y=x+1", "y=−x+1", "y=0"],
    answer: 1,
  },
  {
    prompt: "f(x)=x³−3x eğrisinin x=0 noktasındaki normal doğrusu nedir?",
    hint: "Normalin aynı noktadan geçtiğini ve teğete dik olduğunu kullan.",
    explanation:
      "f(0)=0; teğet eğimi f′(0)=−3. Normal eğimi −1/(−3)=1/3; orijinden geçtiği için y=x/3.",
    guidance: {
      knowledge: ["Sonlu sıfır olmayan teğet eğimi m için normal eğimi −1/m."],
      strategy:
        "Normalin aynı noktadan geçtiğini ve teğete dik olduğunu kullan.",
      steps: [
        "f(0)=0; teğet eğimi f′(0)=−3.",
        "Normal eğimi −1/(−3)=1/3; orijinden geçtiği için y=x/3.",
      ],
      optionReasons: [
        "−3x normal değil teğet doğrusudur.",
        "3, −1/m yerine yalnız işaret çevirerek bulunur.",
        "−1/3 için eğim çarpımı +1 olur; diklik sağlanmaz.",
        "Düşey normal yatay teğette olur; burada teğet eğimi −3.",
        "Doğru: (−3)·(1/3)=−1 ve iki doğru (0,0)’dan geçer.",
      ],
      commonError: "Normal eğimini−m sanma; tersini de almalısın.",
      check: "(−3)·(1/3)=−1 ve iki doğru (0,0)’dan geçer.",
    },
    options: ["y=−3x", "y=3x", "y=−x/3", "x=0", "y=x/3"],
    answer: 4,
  },
  {
    prompt:
      "f(x)=2x³−x eğrisinde yatay teğetli kaç farklı gerçek temas noktası vardır?",
    hint: "f′(a)=0 denkleminin gerçek köklerini say.",
    explanation:
      "f′(x)=6x²−1; yataylık 6a²−1=0 ister. a=±1/√6 iki farklı gerçek apsis ve iki temas noktası verir.",
    guidance: {
      knowledge: ["Yatay teğetin sonlu eğimi 0’dır."],
      strategy: "f′(a)=0 denkleminin gerçek köklerini say.",
      steps: [
        "f′(x)=6x²−1; yataylık 6a²−1=0 ister.",
        "a=±1/√6 iki farklı gerçek apsis ve iki temas noktası verir.",
      ],
      optionReasons: [
        "6a²=1 denkleminin gerçek çözümleri vardır.",
        "Yalnız pozitif karekökü almak ikinci temas noktasını eksik bırakır.",
        "Doğru: İki apsiste de 6a²=1; noktaların ordinatları aynı olmak zorunda değil.",
        "İkinci derece6a²−1 polinomu üç farklı kök vermez.",
        "Türev özdeş 0 değildir; yalnız iki yerde sıfırlanır.",
      ],
      commonError: "Sıfır eğimi sıfır fonksiyon değeriyle karıştırma.",
      check:
        "İki apsiste de 6a²=1; noktaların ordinatları aynı olmak zorunda değil.",
    },
    options: ["0", "1", "2", "3", "Sonsuz"],
    answer: 2,
  },
  {
    prompt:
      "y=x³ eğrisinin x=1 noktasındaki teğeti y=3x−2’dir. Bu doğru eğriyi başka hangi apsiste keser?",
    hint: "Eğriyle doğruyu eşitleyip bilinen çift temas kökünü ayır.",
    explanation:
      "x³=3x−2 ⇒ x³−3x+2=(x−1)²(x+2)=0. x=1 temas kökü dışında x=−2; noktası (−2,−8).",
    guidance: {
      knowledge: ["Teğet, genel bir eğriyi başka bir noktada da kesebilir."],
      strategy: "Eğriyle doğruyu eşitleyip bilinen çift temas kökünü ayır.",
      steps: [
        "x³=3x−2 ⇒ x³−3x+2=(x−1)²(x+2)=0.",
        "x=1 temas kökü dışında x=−2; noktası (−2,−8).",
      ],
      optionReasons: [
        "Doğru: Polinom ayrışımını aç: (x−1)²(x+2)=x³−3x+2.",
        "x=0 için eğri0, doğru−2; eşit değildir.",
        "1 bilinen temas apsisidir; başka nokta soruluyor.",
        "x=2 için eğri8, doğru4; eşit değildir.",
        "Teğetin yerel eğim ilişkisi başka kesişimleri yasaklamaz.",
      ],
      commonError: "Parabolün tek temas davranışını bütün eğrilere genelleme.",
      check: "Polinom ayrışımını aç: (x−1)²(x+2)=x³−3x+2.",
    },
    options: ["−2", "0", "1", "2", "Başka ortak nokta olamaz."],
    answer: 0,
  },
  {
    prompt:
      "f(x)=x³+x eğrisinin x=0 noktasındaki teğeti y=x’tir. Eğri bu teğetin iki tarafına geçer mi?",
    hint: "Eğri yüksekliği ile teğet yüksekliğinin farkını incele.",
    explanation:
      "f(x)−x=x³; x<0 için negatif, x>0 için pozitif. f′(0)=1 vardır; aynı temas noktasında eğri teğeti keser ama f yerel ekstremum yapmaz.",
    guidance: {
      knowledge: [
        "Teğet olmak, eğrinin teğet doğrusu karşısında taraf değiştirmesini genel olarak engellemez.",
      ],
      strategy: "Eğri yüksekliği ile teğet yüksekliğinin farkını incele.",
      steps: [
        "f(x)−x=x³; x<0 için negatif, x>0 için pozitif.",
        "f′(0)=1 vardır; aynı temas noktasında eğri teğeti keser ama f yerel ekstremum yapmaz.",
      ],
      optionReasons: [
        "Bu tek taraflılık bütün eğriler için geçerli değildir; x³ farkı karşıörnektir.",
        "f′(0)=3·0²+1=1 olduğundan teğetin yatay olduğu öncülü yanlıştır.",
        "Türev 1 olduğundan teğet vardır; kesme davranışı varlığı bozmaz.",
        "Fonksiyonun türevi3x²+1>0; 0 çevresinde artar, maksimum yoktur.",
        "Doğru: x=−0,1 ve +0,1 için farklar−0,001 ve +0,001.",
      ],
      commonError:
        "Eğrinin teğeti kesmesiyle fonksiyonun artma-azalma değiştirmesini eşitleme.",
      check: "x=−0,1 ve +0,1 için farklar−0,001 ve +0,001.",
    },
    options: [
      "Hayır; her teğet eğrinin tek tarafında kalır.",
      "Hayır; f′(0)=0 olduğu için.",
      "Teğet yoktur; doğru eğriyi kesemez.",
      "Evet; bu nedenle0’da yerel maksimum vardır.",
      "Evet; fark x³, 0’ın iki yanında işaret değiştirir.",
    ],
    answer: 4,
  },
  {
    prompt:
      "P=(0,−9) noktasından y=x² eğrisine çizilen gerçek teğetlerin temas apsisleri nedir?",
    hint: "Temas apsisini a alıp teğetin P’den geçmesini iste.",
    explanation: "a’da teğet y=2ax−a². P için −9=−a² ⇒ a²=9 ⇒ a=±3.",
    guidance: {
      knowledge: [
        "Eğrinin dışındaki noktanın apsisi, temas apsisiyle aynı olmak zorunda değildir.",
      ],
      strategy: "Temas apsisini a alıp teğetin P’den geçmesini iste.",
      steps: ["a’da teğet y=2ax−a².", "P için −9=−a² ⇒ a²=9 ⇒ a=±3."],
      optionReasons: [
        "a=0 teğeti y=0, P’den geçmez.",
        "Doğru: İki doğru da x=0’da−9 verir; fark polinomları(x∓3)² olur.",
        "a=−3 de geçerlidir; yalnız pozitif kökü almak eksik.",
        "Karekök yerine a²=9 değerleri doğrudan apsis yapılmıştır.",
        "a=±3 iki geçerli teğet verdiğinden boş sonuç yanlıştır.",
      ],
      commonError: "Dış P noktasını eğri üzerinde temas noktası sanma.",
      check: "İki doğru da x=0’da−9 verir; fark polinomları(x∓3)² olur.",
    },
    options: ["Yalnız 0", "−3 ve 3", "Yalnız 3", "−9 ve 9", "Hiçbiri"],
    answer: 1,
  },
  {
    prompt:
      "y=x² eğrisine çizilen bir teğet, y=6x+2 doğrusuna paraleldir. Teğet denklemi nedir?",
    hint: "Paralellikten eğimi, türevden temas apsisini bul.",
    explanation: "f′(a)=2a=6 ⇒ a=3 ve f(3)=9. y−9=6(x−3) ⇒ y=6x−9.",
    guidance: {
      knowledge: [
        "Paralel sonlu doğruların eğimleri eşittir; sabit terimleri eşit olmak zorunda değildir.",
      ],
      strategy: "Paralellikten eğimi, türevden temas apsisini bul.",
      steps: ["f′(a)=2a=6 ⇒ a=3 ve f(3)=9.", "y−9=6(x−3) ⇒ y=6x−9."],
      optionReasons: [
        "+9 sabit terimiyle doğru (3,9)’dan geçmez; x=3’te27 verir.",
        "Eğim 3, verilen doğrunun eğimi 6’ya eşit değildir.",
        "Verilen doğru paralellik yönünü sağlar ama parabolle teğetlik için sabit −9 olmalı.",
        "Doğru: x²−(6x−9)=(x−3)²; tek çift temas vardır.",
        "−6, eğimin işaretini ters çevirir; paralellik bozulur.",
      ],
      commonError: "Paralel doğruların sabit terimlerini zorunlu aynı alma.",
      check: "x²−(6x−9)=(x−3)²; tek çift temas vardır.",
    },
    options: ["y=6x+9", "y=3x−9", "y=6x+2", "y=6x−9", "y=−6x−9"],
    answer: 3,
  },
  {
    prompt: "y=x² eğrisine y=2x+1 doğrusuna dik çizilen teğet hangisidir?",
    hint: "Önce dik teğetin eğimini−1/2, sonra a’yı bul.",
    explanation:
      "2a=−1/2 ⇒ a=−1/4; f(a)=1/16. y−1/16=−(x+1/4)/2 ⇒ y=−x/2−1/16.",
    guidance: {
      knowledge: ["Dik sonlu eğimler çarpımı −1’dir."],
      strategy: "Önce dik teğetin eğimini−1/2, sonra a’yı bul.",
      steps: [
        "2a=−1/2 ⇒ a=−1/4; f(a)=1/16.",
        "y−1/16=−(x+1/4)/2 ⇒ y=−x/2−1/16.",
      ],
      optionReasons: [
        "−2 eğimi verilen2 ile çarpılınca−4; diklik yok.",
        "+1/2 eğimiyle çarpım +1; yön yanlış.",
        "y=−x/2+1/16, x=−1/4 için 3/16 verir; eğrideki temas ordinatı 1/16 olduğu için aynı noktadan geçmez.",
        "Doğru: x²+x/2+1/16=(x+1/4)² ile temas koşulunu denetle.",
        "Bu düşey doğru, sonlu eğimli parabole bu noktada teğet değildir.",
      ],
      commonError:
        "Diklikte eğimi yalnız negatif yapıp tersini almama hatasına düşme.",
      check: "x²+x/2+1/16=(x+1/4)² ile temas koşulunu denetle.",
    },
    options: ["y=−2x−1", "y=x/2−1/16", "y=−x/2+1/16", "y=−x/2−1/16", "x=−1/4"],
    answer: 3,
  },
  {
    prompt:
      "f(x)=−x² eğrisinin x=1 teğetinin pozitif x ekseninden saat yönünün tersine ölçülen eğim açısı 0≤θ<π. Hangi aralık kesin doğrudur?",
    hint: "Önce teğet eğiminin işaretini, sonra seçilmiş açı aralığını kullan.",
    explanation:
      "f′(1)=−2; sonlu eğim negatif. 0≤θ<π aralığında negatif tanjant ikinci bölgededir: π/2<θ<π.",
    guidance: {
      knowledge: [
        "tanθ=m ilişkisi eğim açısında geçerlidir; arctan ana çıktısının aralığı ayrı olabilir.",
      ],
      strategy:
        "Önce teğet eğiminin işaretini, sonra seçilmiş açı aralığını kullan.",
      steps: [
        "f′(1)=−2; sonlu eğim negatif.",
        "0≤θ<π aralığında negatif tanjant ikinci bölgededir: π/2<θ<π.",
      ],
      optionReasons: [
        "Doğru: θ=π−arctan2, ikinci bölgede ve tanjantı−2.",
        "Dar açı tanjantı pozitiftir; −2 ile uyuşmaz.",
        "θ=0 yatay eğim 0 verir; −2 olan teğet eğimiyle uyuşmaz.",
        "θ=π/2 düşey doğru verir; sonlu−2 eğimi değildir.",
        "Bu negatif arctan çıktısına uygun olabilir ama sorudaki0≤θ<π aralığında değildir.",
      ],
      commonError:
        "Hesap makinesinin negatif arctan değerini istenen eğim açısı diye aynen verme.",
      check: "θ=π−arctan2, ikinci bölgede ve tanjantı−2.",
    },
    options: ["π/2<θ<π", "0<θ<π/2", "θ=0", "θ=π/2", "−π/2<θ<0"],
    answer: 0,
  },
  {
    prompt: "f(x)=(x−2)²+3 eğrisinin x=2 noktasındaki normal denklemi nedir?",
    hint: "Yatay teğet özel durumunu ayrı ele al.",
    explanation:
      "f(2)=3 ve f′(2)=2(2−2)=0; teğet y=3 yataydır. (2,3) noktasından geçen dik doğru x=2.",
    guidance: {
      knowledge: [
        "Sıfır eğimli teğetin normali düşeydir; sonlu normal eğimi üretilemez.",
      ],
      strategy: "Yatay teğet özel durumunu ayrı ele al.",
      steps: [
        "f(2)=3 ve f′(2)=2(2−2)=0; teğet y=3 yataydır.",
        "(2,3) noktasından geçen dik doğru x=2.",
      ],
      optionReasons: [
        "y=3 teğetin kendisidir; normal değil.",
        "y2 yataydır ve temas noktasından geçmez.",
        "Doğru: Teğet yatay, normal düşey; iki doğru (2,3)’te kesişir.",
        "x=3 düşey olsa da(2,3) noktasından geçmez.",
        "Eğim −1, yatay teğete dik düşey yönü temsil etmez.",
      ],
      commonError: "−1/0’ı normal için 0 veya−1 eğimi diye yorumlama.",
      check: "Teğet yatay, normal düşey; iki doğru (2,3)’te kesişir.",
    },
    options: ["y=3", "y=2", "x=2", "x=3", "y=−x+5"],
    answer: 2,
  },
  {
    prompt:
      "f(x)=x³ için a=2’den h=0,1 ilerlerken doğrusal tahmin L=f(2)+f′(2)h kullanılıyor. f(2,1)−L kaçtır?",
    hint: "Kesin değeri ve doğrusal tahmini ayrı hesapla.",
    explanation:
      "f(2)=8, f′(2)=12 ⇒ L=8+1,2=9,2. f(2,1)=9,261; fark 9,261−9,2=0,061.",
    guidance: {
      knowledge: [
        "Doğrusal yaklaşımda ikinci ve daha yüksek dereceli terimler hata olarak kalır.",
      ],
      strategy: "Kesin değeri ve doğrusal tahmini ayrı hesapla.",
      steps: [
        "f(2)=8, f′(2)=12 ⇒ L=8+1,2=9,2.",
        "f(2,1)=9,261; fark 9,261−9,2=0,061.",
      ],
      optionReasons: [
        "Teğet yerel yaklaşık verir; bu polinomda h≠0 için hata sıfır değildir.",
        "0,61 değerinde h²=0,01 katsayısının bir onluk basamağı kaybolmuştur.",
        "9,2 tahmin değeridir; kesin değerle tahminin farkı değildir.",
        "Sorulan sıra kesin −tahmin; burada kesin değer daha büyük olduğundan fark pozitif.",
        "Doğru: Hatanın0,1 adımından küçük çıkması ve pozitif olması doğrudan kübik açılımla doğrulanır.",
      ],
      commonError: "Yaklaşık eşitlikte kalan hata terimini yok sayma.",
      check:
        "Hatanın0,1 adımından küçük çıkması ve pozitif olması doğrudan kübik açılımla doğrulanır.",
    },
    options: ["0", "0,61", "9,2", "−0,061", "0,061"],
    answer: 4,
  },
  {
    prompt:
      "f(x)=x³ eğrisinde a=1 ve h=1/2 için kiriş eğimi ile a’daki teğet eğiminin farkı (kiriş−teğet) kaçtır?",
    hint: "İki ayrı eğimi hesapla; farkı en son al.",
    explanation:
      "Kiriş=[(3/2)³−1]/(1/2)=(27/8−1)·2=19/4. Teğet f′(1)=3; fark 19/4−12/4=7/4.",
    guidance: {
      knowledge: [
        "Kiriş iki noktanın ortalama eğimi, teğet aynı başlangıç noktasındaki türevdir.",
      ],
      strategy: "İki ayrı eğimi hesapla; farkı en son al.",
      steps: [
        "Kiriş=[(3/2)³−1]/(1/2)=(27/8−1)·2=19/4.",
        "Teğet f′(1)=3; fark 19/4−12/4=7/4.",
      ],
      optionReasons: [
        "3 yalnız teğet eğimidir; fark değildir.",
        "Doğru: 7/4>0; kübik bu aralıkta daha dikleşir, kiriş eğimi başlangıç teğetinden büyük.",
        "19/4 yalnız kiriş eğimidir; teğet çıkarılmamıştır.",
        "1/4, h² terimidir; 3ah katkısı eksiktir.",
        "h sonlu1/2 olduğundan bu eğimler bu örnekte eşit değildir.",
      ],
      commonError: "Fark oranında h’yi limit almadan0 sayma.",
      check:
        "7/4>0; kübik bu aralıkta daha dikleşir, kiriş eğimi başlangıç teğetinden büyük.",
    },
    options: ["3", "7/4", "19/4", "1/4", "0"],
    answer: 1,
  },
  {
    prompt: "y=2x²+3 parabolüne teğet olan y=4x+k doğrusunda k kaçtır?",
    hint: "Teğetin eğimi 4 olduğundan temas apsisini bul.",
    explanation: "f′(a)=4a=4 ⇒ a=1; f(1)=5. 5=4·1+k ⇒ k=1.",
    guidance: {
      knowledge: [
        "Teğetlik için aynı noktada hem değer hem türev eğimi uyuşur.",
      ],
      strategy: "Teğetin eğimi 4 olduğundan temas apsisini bul.",
      steps: ["f′(a)=4a=4 ⇒ a=1; f(1)=5.", "5=4·1+k ⇒ k=1."],
      optionReasons: [
        "3 y ekseni kesimidir; teğet sabiti doğrudan f’nin sabit terimi değildir.",
        "−1 sabit işaretini yanlış verir; x=1’de doğru=3, eğri5 olur.",
        "Doğru: y=4x+1, (1,5)’ten geçer ve kesişim çift köklüdür.",
        "5 temas ordinatıdır; doğru sabiti için 4a çıkarılmalıdır.",
        "4 eğimdir; k sabit terimi ayrı hesaplanır.",
      ],
      commonError:
        "Temas noktasının ordinatını doğrunun y kesimiyle karıştırma.",
      check: "y=4x+1, (1,5)’ten geçer ve kesişim çift köklüdür.",
    },
    options: ["3", "−1", "1", "5", "4"],
    answer: 2,
  },
  {
    prompt: "f(x)=x² ile g(x)=(x−1)²+1 eğrilerinin ortak teğeti hangisidir?",
    hint: "İki farklı temas apsisinde aynı eğimi ve aynı doğru sabitini eşitle.",
    explanation:
      "f için a’da eğim 2a, sabit −a²; g için b’de eğim 2b−2, sabit 2−b². Eğim eşitliği b=a+1; sabit eşitliği(a+1)²−a²=2 ⇒ a=1/2, b=3/2. Ortak eğim 1, sabit −1/4; doğru y=x−1/4.",
    guidance: {
      knowledge: [
        "Ortak teğet iki eğriye farklı noktalarda dokunabilir; doğru denklemi iki tarafta aynı olmalıdır.",
      ],
      strategy:
        "İki farklı temas apsisinde aynı eğimi ve aynı doğru sabitini eşitle.",
      steps: [
        "f için a’da eğim 2a, sabit −a²; g için b’de eğim 2b−2, sabit 2−b².",
        "Eğim eşitliği b=a+1; sabit eşitliği(a+1)²−a²=2 ⇒ a=1/2, b=3/2.",
        "Ortak eğim 1, sabit −1/4; doğru y=x−1/4.",
      ],
      optionReasons: [
        "Doğru: İki ayrı farkın da tam kare olduğunu açarak doğrula.",
        "y=2x−1, f’ye teğet olsa da g ile kesişim farkı x²−4x+3 olur; iki basit kesişim vardır.",
        "Bu doğruyla f farkı x²−x−1/4 olur; Δ=2>0 ile iki kesişim vardır, teğet değildir.",
        "Bu doğru f’ye a=−1/2’de teğettir; fakat g−doğru=x²−x+9/4>0 olduğundan g’ye değmez.",
        "y=0, f’ye teğettir ama g≥1 olduğundan g’ye değmez.",
      ],
      commonError:
        "Yalnız bir eğrinin teğetliğini kontrol edip ortak olduğunu ilan etme.",
      check: "İki ayrı farkın da tam kare olduğunu açarak doğrula.",
    },
    options: ["y=x−1/4", "y=2x−1", "y=x+1/4", "y=−x−1/4", "y=0"],
    answer: 0,
  },
];
export const forge024MathGuideExtensions: Pick<
  LessonGuide,
  "id" | "sections" | "examples" | "recall" | "source"
>[] = [
  {
    id: "turev-teget",
    sections: [
      {
        title: "Aynı yükseklik aynı teğet demek değildir",
        paragraphs: [
          "Grafiğin bir noktasındaki teğet için hem temas noktası hem yerel eğim gerekir. İki ayrı x değerinde fonksiyonun aynı yüksekliği alması eğimleri eşitlemez. Bir teğetin belirli bir noktadan geçmesi ise o noktanın mutlaka eğri üzerinde temas noktası olduğu anlamına gelmez.",
          "Yeni geometri keşfi kübik bir eğride temas apsisini değiştirir; nokta, teğet ve normal birlikte yeniden kurulur. x² ve |x| örneklerindeki yerel eğim fikrini artık birden çok doğru arasından uygun olanı seçmek için kullan. Paralellik, diklik ve verilen bir noktadan geçme koşulları farklı denklemler kurar.",
        ],
      },
      {
        title: "Paralel teğette temas apsisi bilinmeyendir",
        paragraphs: [
          "Bir doğruya paralel teğet isteniyorsa önce verilen doğrunun sonlu eğimini çıkar. Sonra f′(a)=m denklemini a için çöz; bulunan her izinli a için ayrı temas noktası ve teğet denklemi kur. Türevin derece yapısına göre sıfır, bir veya birden çok temas olabilir.",
          "Apsisler bulundu diye bütün teğetlerin aynı doğru olduğunu varsayma. Aynı eğimde fakat farklı sabit terimli doğrular paraleldir. Son aşamada y−f(a)=m(x−a) kullan; f(a) hesabı noktanın yüksekliğini, türev denklemi ise yönü sağlamıştır.",
        ],
      },
      {
        title: "Diklikte normal ve düşey özel durumu",
        paragraphs: [
          "Teğet eğimi m≠0 sonlu olduğunda normal eğimi −1/m olur; iki doğru aynı temas noktasından geçer. Fakat m=0 durumunda −1/0 diye sayı üretmek yerine normal x=a düşey doğrusudur. Yatay teğet ile düşey normal bu özel geometrinin iki parçasıdır.",
          "Bir doğruyla dik teğet sorusunda da verilen doğru düşeyse aranan teğet yataydır. Eğimler çarpımı −1 yalnız iki sonlu eğimde kullanılabilir. Geometri çiziminde yön vektörleri gösterilir; çok dik bir çizgi sayısal eğimi küçükmüş gibi çizilmez.",
        ],
      },
      {
        title: "Eğim açısı ile dar referans açısını ayır",
        paragraphs: [
          "Doğrunun pozitif x ekseninden saat yönünün tersine ölçülen eğim açısı 0≤θ<π seçilsin; sonlu eğimde tanθ=m olur. m<0 ise bu aralıktaki açı ikinci bölgededir. Hesap makinesinin negatif arctan çıktısı doğrudan istenen eğim açısı değildir.",
          "Örneğin negatif eğimli bir teğet sağa giderken azalır; buna karşılık yönsüz iki doğrunun aralarındaki dar açı başka bir sorudur. Açı birimi derece veya radyan olarak yazılmalı. Düşey doğrunun açısı π/2 olabilir ama sonlu tanjant/eğim sayısı yoktur.",
        ],
      },
      {
        title: "Eğrinin dışındaki noktadan teğet çiz",
        paragraphs: [
          "P=(u, v) verilen nokta olsun; eğri üzerindeki bilinmeyen temas noktası T=(a, f(a)). T’deki teğetin P’den geçmesi v−f(a)=f′(a)(u−a) koşulunu verir. Bu denklem a’yı belirler; P eğri üzerindeymiş gibi f′(u) kullanmak genellikle yanlıştır.",
          "Parabolde bu koşul iki teğet, tek teğet veya hiç gerçek teğet verebilir. Aday a’ları bulduktan sonra noktaları ve doğru denklemlerini kontrol et. Başka bir eğriye ortak teğet ararken iki temas parametresinin hem eğim hem doğru sabit terimi birlikte eşitlenir.",
        ],
      },
      {
        title: "Bir teğet eğriyi yeniden kesebilir",
        paragraphs: [
          "Teğet, genel bir eğriye yalnız bir ortak noktası olan doğru diye tanımlanmaz. f(x)=x³−2x eğrisinde a=2 için nokta (2,4), eğim 10 ve teğet y=10x−16 olur. Eğri ile doğruyu eşitleyince x³−12x+16=(x−2)²(x+4)=0 elde edilir.",
          "a=2 yerel temasını korurken x=−4 noktasında başka bir kesişim vardır. Kübik keşfinde bu ek nokta ayrı etiketlenir; görünür pencerenin dışındaysa HTML koordinatı yine verilir. Kökün katlılığı yerel temas yapısını açıklar; çizginin global olarak yalnız değdiği iddiası kurulmaz.",
        ],
      },
      {
        title: "Teğetin kendi temasında kesme olasılığı",
        paragraphs: [
          "Bir bükülme çevresinde eğri teğetin iki tarafına geçebilir. f(x)=x³+2x için a=0 teğeti y=2x olur ve eğri ile teğetin farkı x³’tür. Negatif x’te fark negatif, pozitif x’te pozitif olduğundan eğri temas noktasında teğeti keser.",
          "Bu durum teğetin yokluğu değildir; türev f′(0)=2 vardır. Keşifte üçüncü derece temas ile ikinci derece temas ayrı okunur. Türev sıfır olmak zorunda olmadığı gibi, teğete göre taraf değiştirmek de tek başına bir yerel maksimum/minimum koşulu değildir.",
        ],
      },
      {
        title: "Yerel doğrusal tahmin ile kesin değeri karşılaştır",
        paragraphs: [
          "Küçük h için f(a+h) yaklaşık f(a)+f′(a)h ile tahmin edilir. Eşitlik genel olarak kesin değildir; gerçek çıktı ile tahmin arasındaki hata ayrıca hesaplanır. Karesel ve kübik terimler bu hatada kalır, yalnız daha küçük h’de küçülmeleri beklenir.",
          "Kübik f(x)=Ax³+Bx²+Cx+D için hata tam olarak h²(3Aa+B+Ah), kiriş eğimi ise f′(a)+h(3Aa+B)+Ah² olur. Keşif bu çarpanlı biçimleri kullanarak yakın iki büyük sayıyı çıkarmanın sayısal kaybını azaltır; h’nin sıfır olmaması kiriş tanımında korunur.",
        ],
      },
    ],
    examples: [
      {
        title: "Teğet ve normal iki ayrı doğru",
        prompt: "f(x)=x³−x için a=−1 noktasındaki teğeti ve normali bul.",
        strategy: "Noktayı bul, türevle eğimi hesapla.",
        steps: [
          {
            label: "Temas",
            explanation: "f(−1)=0; nokta (−1,0). f′(x)=3x²−1 ⇒ m=2.",
          },
          {
            label: "Teğet",
            explanation: "y−0=2(x+1) ⇒ y=2x+2.",
          },
          {
            label: "Normal",
            explanation: "Normal eğimi −1/2; y=−(x+1)/2.",
          },
        ],
        answer: "Teğet y=2x+2; normal y=−x/2−1/2.",
        check: "İki doğru (−1,0)’dan geçer; eğim çarpımı −1.",
        pitfall: "Normalin sabit terimini teğetin sabit terimiyle aynı sanma.",
      },
      {
        title: "Dış noktadan iki teğet",
        prompt: "P=(0,−4) noktasından y=x² eğrisine çizilen teğetleri bul.",
        strategy: "Teması(a, a²) al; P’nin doğru üzerinde olmasını iste.",
        steps: [
          {
            label: "Aile",
            explanation: "T’de teğet y=2ax−a².",
          },
          {
            label: "P koşulu",
            explanation: "−4=−a² ⇒ a=−2 veya2.",
          },
          {
            label: "Doğrular",
            explanation: "a=2 için y=4x−4; a=−2 için y=−4x−4.",
          },
        ],
        answer: "y=4x−4 ve y=−4x−4.",
        check:
          "İki doğru da P’den geçer ve parabolle kesişim denklemleri tam kare olur.",
        pitfall:
          "P’nin apsisini temas apsisi0 sanıp yalnız x=0 teğetini yazma.",
      },
      {
        title: "Yaklaşımın hatasını saklama",
        prompt:
          "f(x)=x³ için a=1’den h=0,2 ilerle. Doğrusal tahmini, kesin değeri ve hatayı bul.",
        strategy: "f(a)+f′(a)h ile polinom değerini ayrı hesapla.",
        steps: [
          {
            label: "Tahmin",
            explanation: "f(1)=1, f′(1)=3; L=1+3·0,2=1,6.",
          },
          {
            label: "Kesin değer",
            explanation: "f(1,2)=1,728; gerçek−tahmin=0,128.",
          },
          {
            label: "Çarpan kontrolü",
            explanation:
              "h²(3a+h)=0,04·3,2=0,128; hata ikinci ve üçüncü derece terimlerden gelir.",
          },
        ],
        answer: "Tahmin 1,6; kesin 1,728; hata +0,128.",
        check:
          "h yarıya inince aynı noktada hata=0,01·3,1=0,031 olur; kesin eşitlik iddia edilmez.",
        pitfall: "Yaklaşık değer ile eşitlik işaretini koşulsuz kullanma.",
      },
      {
        title: "İki eğriye ortak teğet",
        prompt: "f(x)=x² ve g(x)=(x−2)²+4 için ortak teğeti bul.",
        strategy:
          "İki farklı temas apsisine a ve b de; eğim ve sabit terimi eşitle.",
        steps: [
          {
            label: "Eğim",
            explanation:
              "f teğeti2ax−a²; g teğeti(2b−4)x+8−b². Eşit eğim b=a+2 verir.",
          },
          {
            label: "Sabit terim",
            explanation: "−a²=8−(a+2)² ⇒ 4a+4=8 ⇒ a=1, b=3.",
          },
          {
            label: "Ortak doğru",
            explanation: "Eğim 2, sabit −1: y=2x−1. Temaslar (1,1) ve(3,5).",
          },
        ],
        answer: "y=2x−1.",
        check: "f−doğru=(x−1)², g−doğru=(x−3)²; her biri ayrı tam kare.",
        pitfall:
          "Aynı doğruya teğet iki farklı eğride temas apsislerini zorunlu eşit kabul etme.",
      },
    ],
    recall: [
      {
        prompt: "Bir dış noktanın apsisi temas apsisi midir?",
        answer:
          "Genellikle hayır; bilinmeyen a için v−f(a)=f′(a)(u−a) koşulu çözülür.",
      },
      {
        prompt: "Yatay teğetin normali hangi doğru olur?",
        answer: "Temas apsisi a ise düşey x=a; −1/0 sonlu eğim diye yazılmaz.",
      },
      {
        prompt:
          "Teğet başka bir yerde veya aynı temasında eğriyi kesebilir mi?",
        answer:
          "Evet; genel tanım yerel türev ilişkisidir. Kübik farkın çarpanları başka kesişimi veya üçüncü derece kesmeyi gösterebilir.",
      },
      {
        prompt: "Doğrusal tahmin neden kesin değerle eşit olmayabilir?",
        answer:
          "İkinci ve daha yüksek dereceli h terimleri tahminde kalmaz; hata ayrıca karşılaştırılır.",
      },
    ],
    source:
      "MEBİ AYT Matematik Konu Özetleri, PDF 78–89 (basılı 76–87); OGM AYT Matematik Türev Video Ders Notu, 31 sayfa; Dersler Cepte 12. Sınıf Matematik Limit–Süreklilik–Türev, fiziksel sayfalar 15–18 ve 21. Tanım alanı ve türevlenebilirlik koşulları karşılaştırılarak hazırlanmış özgün öğretim. Alıştırmalar özgündür; resmî sınav soruları değildir.",
  },
];
export const forge024MathTopics: Record<string, string> = {
  "ayt-turev-alma-kurallari": "detail-475",
  "turev-teget-ileri": "detail-476",
};
export const forge024MathGuides: LessonGuide[] = [rules024];
const question024 = (id: string, q: Item024, i: number) => ({
  id: `f024-${id}-${i + 1}`,
  prompt: txt(q.prompt),
  options: q.options.map(txt),
  answer: q.answer,
  hint: txt(q.hint),
  explanation: txt(q.explanation),
  guidance: q.guidance,
  skill: id,
});
export const forge024MathLessons: Lesson[] = [
  {
    id: rules024.id,
    subjectId: "ayt-matematik",
    title: txt(rules024.title),
    minutes: rules024.minutes,
    objectives: rules024.objectives.map(txt),
    body: rules024.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    source: txt(rules024.source),
    tags: ["detail-475", "Özgün öğretim soruları"],
    questions: rules024.questions.map((q, i) => question024(rules024.id, q, i)),
  },
  {
    id: "turev-teget-ileri",
    subjectId: "ayt-matematik",
    title: txt("Türevin geometrik yorumu: ileri teğet ve normal soruları"),
    minutes: 35,
    objectives: [
      txt("Temas, dış nokta, paralellik ve diklik koşullarını birlikte çöz."),
      txt(
        "Teğete göre taraf değiştirmeyi ve doğrusal yaklaşım hatasını değerlendir.",
      ),
    ],
    body: [],
    source: txt(forge024MathGuideExtensions[0].source),
    tags: ["detail-476", "soru-seti", "Özgün öğretim soruları"],
    questions: advanced024.map((q, i) =>
      question024("turev-teget-ileri", q, i),
    ),
  },
];
