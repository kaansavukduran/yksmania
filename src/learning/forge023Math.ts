import { txt, type Lesson } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide } from "./guides/types";

function scope023(value: number, bound = 100) {
  if (
    !Number.isFinite(value) ||
    Math.abs(value) > bound ||
    (value !== 0 && Math.abs(value) < 1e-8)
  )
    throw new RangeError("MATH023_INPUT_SCOPE");
  return value === 0 ? 0 : value;
}
function sinCos023(degrees: number) {
  const rem = degrees % 360,
    d = rem < 0 ? rem + 360 : rem;
  if (d === 0) return { sin: 0, cos: 1 };
  if (d === 90) return { sin: 1, cos: 0 };
  if (d === 180) return { sin: 0, cos: -1 };
  if (d === 270) return { sin: -1, cos: 0 };
  return {
    sin: Math.sin((degrees * Math.PI) / 180),
    cos: Math.cos((degrees * Math.PI) / 180),
  };
}
export function angleIdentity023(a: number, b: number, subtract: boolean) {
  scope023(a, 720);
  scope023(b, 720);
  if (typeof subtract !== "boolean") throw new RangeError("MATH023_OPERATION");
  const theta = a + (subtract ? -b : b),
    x = sinCos023(a),
    y = sinCos023(b),
    sign = subtract ? -1 : 1;
  const direct = sinCos023(theta),
    half = sinCos023(theta / 2);
  return {
    theta,
    a: x,
    b: y,
    direct,
    expandedSin: x.sin * y.cos + sign * x.cos * y.sin,
    expandedCos: x.cos * y.cos - sign * x.sin * y.sin,
    tangent: direct.cos === 0 ? null : direct.sin / direct.cos,
    half,
    halfSinSquared: (1 - direct.cos) / 2,
    halfCosSquared: (1 + direct.cos) / 2,
  };
}
export function waveRoots023(
  a: number,
  b: number,
  c: number,
  frequency: number,
  phase: number,
  start: number,
  end: number,
  closedEnd = false,
) {
  [a, b, c].forEach((v) => {
    scope023(v, 12);
    if (!Number.isInteger(v * 2))
      throw new RangeError("MATH023_COEFFICIENT_GRID");
  });
  [phase, start, end].forEach((v) => {
    scope023(v, 720);
    if (!Number.isInteger(v)) throw new RangeError("MATH023_ANGLE_GRID");
  });
  if (
    !Number.isInteger(frequency) ||
    frequency < 1 ||
    frequency > 6 ||
    start >= end ||
    end - start > 1440 ||
    typeof closedEnd !== "boolean"
  )
    throw new RangeError("MATH023_WAVE_SCOPE");
  const amplitude = Math.hypot(a, b),
    shift = (Math.atan2(b, a) * 180) / Math.PI;
  const valueAt = (x: number) => {
    const p = sinCos023(frequency * x + phase);
    return a * p.sin + b * p.cos;
  };
  if (amplitude === 0)
    return {
      kind: c === 0 ? ("all" as const) : ("none" as const),
      roots: [] as number[],
      amplitude,
      shift,
      valueAt,
    };
  if (Math.abs(c) > amplitude)
    return {
      kind: "none" as const,
      roots: [] as number[],
      amplitude,
      shift,
      valueAt,
    };
  const principal = (Math.asin(c / amplitude) * 180) / Math.PI;
  const branches =
    Math.abs(c) === amplitude ? [principal] : [principal, 180 - principal];
  const snapBoundary = (x: number, edge: number, arithmeticScale: number) =>
    Math.abs(x - edge) <=
      (16 *
        Number.EPSILON *
        (arithmeticScale + Math.abs(frequency * edge) + 1)) /
        frequency &&
    Math.abs(valueAt(edge) - c) <=
      32 * Number.EPSILON * Math.max(1, Math.abs(a) + Math.abs(b) + Math.abs(c))
      ? edge
      : x;
  const roots: number[] = [];
  for (const branch of branches)
    for (let turn = -30; turn <= 30; turn++) {
      let x = (branch - shift - phase + 360 * turn) / frequency;
      // At zero, phase cancellation error depends on the input angles, not |x|.
      const arithmeticScale =
        Math.abs(branch) +
        Math.abs(shift) +
        Math.abs(phase) +
        Math.abs(360 * turn);
      x = snapBoundary(
        snapBoundary(x, start, arithmeticScale),
        end,
        arithmeticScale,
      );
      if (x >= start && (closedEnd ? x <= end : x < end) && !roots.includes(x))
        roots.push(x === 0 ? 0 : x);
    }
  roots.sort((x, y) => x - y);
  return {
    kind: roots.length ? ("finite" as const) : ("none" as const),
    roots,
    amplitude,
    shift,
    valueAt,
  };
}
export function logarithm023(
  base: number,
  x: number,
  horizontal = 0,
  vertical = 0,
) {
  scope023(base, 100);
  scope023(x, 1000);
  scope023(horizontal, 20);
  scope023(vertical, 20);
  const argument = x - horizontal;
  if (base <= 0 || base === 1 || argument <= 0)
    return {
      defined: false as const,
      argument,
      value: null,
      inverse: null,
      increasing: base > 1,
    };
  const value = Math.log(argument) / Math.log(base) + vertical;
  const inverse = horizontal + base ** (value - vertical);
  if (!Number.isFinite(value) || !Number.isFinite(inverse))
    throw new RangeError("MATH023_LOG_PRECISION");
  return {
    defined: true as const,
    argument,
    value,
    inverse,
    increasing: base > 1,
  };
}
export type SequenceKind023 =
  "arithmetic" | "geometric" | "recurrence" | "triangular";
export function sequence023(
  kind: SequenceKind023,
  first: number,
  parameter: number,
  count: number,
) {
  scope023(first, 100);
  scope023(parameter, kind === "geometric" ? 3 : 100);
  if (
    !["arithmetic", "geometric", "recurrence", "triangular"].includes(kind) ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > 16
  )
    throw new RangeError("MATH023_SEQUENCE_SCOPE");
  const values: number[] = [],
    sums: number[] = [];
  for (let i = 0; i < count; i++) {
    const value =
      kind === "arithmetic"
        ? first + i * parameter
        : kind === "triangular"
          ? ((i + 1) * (i + 2)) / 2
          : kind === "recurrence"
            ? i === 0
              ? first
              : i === 1
                ? parameter
                : values[i - 1] + values[i - 2]
            : i === 0
              ? first
              : values[i - 1] * parameter;
    if (
      !Number.isFinite(value) ||
      (kind === "geometric" &&
        i > 0 &&
        values[i - 1] !== 0 &&
        parameter !== 0 &&
        value === 0)
    )
      throw new RangeError("MATH023_SEQUENCE_PRECISION");
    values.push(value === 0 ? 0 : value);
    sums.push((sums.at(-1) ?? 0) + value);
  }
  return {
    values,
    sums,
    last: values.at(-1)!,
    sum: sums.at(-1)!,
    ratioDefined:
      kind !== "geometric" || values.slice(0, -1).every((v) => v !== 0),
  };
}
export function piecewiseLimit023(
  a: number,
  left: number,
  right: number,
  value: number,
  leftSlope: number,
  rightSlope: number,
  defined: boolean,
  distance: number,
) {
  [a, left, right, value, leftSlope, rightSlope].forEach((v) =>
    scope023(v, 20),
  );
  scope023(distance, 1);
  if (typeof defined !== "boolean" || distance < 1e-6)
    throw new RangeError("MATH023_APPROACH_SCOPE");
  return {
    left,
    right,
    limit: left === right ? left : null,
    value: defined ? value : null,
    continuous: defined && left === right && value === left,
    leftContinuous: defined && value === left,
    rightContinuous: defined && value === right,
    sampleLeft: { x: a - distance, y: left - leftSlope * distance },
    sampleRight: { x: a + distance, y: right + rightSlope * distance },
  };
}
export function removableLimit023(
  a: number,
  value: number,
  defined: boolean,
  distance: number,
) {
  const result = piecewiseLimit023(
    a,
    2 * a,
    2 * a,
    value,
    1,
    1,
    defined,
    distance,
  );
  return {
    ...result,
    expression: "(x²−a²)/(x−a)",
    reduced: "x+a",
    excluded: a,
  };
}

type Card023 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: QuestionGuidance;
};
type Pack023 = LessonGuide & {
  title: string;
  topic: string;
  questions: Card023[];
};
const packs023: Pack023[] = [
  {
    id: "ayt-toplam-fark-yarim-aci",
    topic: "detail-470",
    title: "Toplam, fark ve yarım açı: bir dönüşümü parçalara ayır",
    minutes: 100,
    objectives: [
      "Açı, değer ve çarpım birbirinden farklıdır",
      "Dönme, iki koordinatı birlikte değiştirir",
      "İşlemi gerekçelendir; tanım koşullarını ve sonucu bağımsız denetle.",
    ],
    sections: [
      {
        title: "Açı, değer ve çarpım birbirinden farklıdır",
        paragraphs: [
          "Bu üniteye başlamadan yönlü açı, birim çember ve sin²x+cos²x=1 bağıntısını kullanabilmelisin. sin(a+b), toplam açının tek sinüs değeridir; sin a+sin b ise iki farklı noktanın ordinatları toplamıdır. Örneğin a=b=30° için birincisi√3/2, ikincisi 1 olur.",
          "Bir ifadeyi dönüştürmenin amacı bilinmeyen açıyı bildiğin açılara bağlamak veya aynı açının sinüs ve kosinüslerini bir araya getirmektir. Her satırda açıyı, fonksiyon adını ve çarpım işaretini ayrı oku; sin²x=(sin x)² iken sin2x başka bir açının değeridir.",
        ],
      },
      {
        title: "Dönme, iki koordinatı birlikte değiştirir",
        paragraphs: [
          "Birim çemberde a açısının noktası(cos a, sin a) olsun. Düzlem b kadar döndüğünde yeni yatay koordinat cos a cos b−sin a sin b, yeni düşey koordinat sin a cos b+cos a sin b olur. Bir noktanın yalnız ordinatını döndürmüş gibi düşünmek yeterli değildir.",
          "Etkileşimde iki açıyı seçip hem başlangıç hem son yarıçapı izle. Sayısal sonuç ile açılımdaki iki katkıyı karşılaştır; bir katkının negatif olması ilgili yönün ters olduğunu anlatır. Çizim birim çemberin koordinatlarını kullanır; ekrandaki uzunluklar açı derece değeri değildir.",
        ],
      },
      {
        title: "Sinüsün toplam ve farkını türet",
        paragraphs: [
          "sin(a+b)=sin a cos b+cos a sin b eşitliğinde b yerine−b yaz. Sinüs tek, kosinüs çift olduğundan sin(a−b)=sin a cos b−cos a sin b çıkar. İki terimin de içinde bir sinüs ve bir kosinüs bulunur; açıların yerleri birbirini tamamlar.",
          "Farkın sırası yön taşır: sin(a−b)=−sin(b−a). a=30°, b=60° seçildiğinde sin(−30°)=−1/2 elde edilmesi bunu görünür kılar. Önce toplam veya fark açısını belirlemek, terimlerin işaretini sonradan rastgele değiştirmeyi önler.",
        ],
      },
      {
        title: "Kosinüste toplamın çapraz katkısı negatiftir",
        paragraphs: [
          "cos(a+b)=cos a cos b−sin a sin b, cos(a−b)=cos a cos b+sin a sin b biçimindedir. Bunlar kosinüsün çiftliğiyle uyumludur: cos(a−b)=cos(b−a). Örneğin 90°=60°+30° için iki eşit katkı birbirini götürür ve sonuç 0 olur.",
          "Kosinüs farkını iki birim vektörün skaler çarpımıyla da görebilirsin. İki yarıçapın arasındaki açı a−b iken çarpım cos a cos b+sin a sin b olur. Böylece toplam ve farkın farklı işaretleri bir ezber listesi olmaktan çıkar.",
        ],
      },
      {
        title: "Özel olmayan bir açıyı bildiğin iki açıya ayır",
        paragraphs: [
          "75°=45°+30°,15°=45°−30° gibi yazımlar tam köklü değer üretir. sin75°=(√2/2)(√3/2)+(√2/2)(1/2)=(√6+√2)/4. Önce dört temel değeri yazıp sonra ortak paydayı toplamak karışıklığı azaltır.",
          "Aynı toplam farklı parçalara ayrılabilir; en iyi seçim bildiğin tam değerlerdir. Sonucun yaklaşık büyüklüğü de bir denetimdir: sin75° birinci bölgede ve sin60° değerinden büyüktür. Negatif veya 1’den büyük bir sonuç işaret ya da payda hatasına işaret eder.",
        ],
      },
      {
        title: "Tanjant toplamı bölümün tanımını korur",
        paragraphs: [
          "Tanjantı sin/cos diye yazıp toplam formüllerini bölünce tan(a+b)=(tan a+tan b)/(1−tan a tan b) bulunur. Bu tanjantlı biçimde tan a ve tan b tanımlı olmalı; ayrıca payda sıfır olmamalıdır. Farkta pay tan a−tan b, payda 1+tan a tan b olur.",
          "a=b=45° için payda 0 çıkar ve tan90° gerçekten tanımsızdır. Buna karşılık a=90°, b=−45° iken toplam 45° tanımlı olsa da tan a içeren açılım kullanılamaz; doğrudan toplam açısı veya sinüs–kosinüs biçimi kullanılmalıdır. Bir formülün yazımı kendi tanım alanını taşır.",
        ],
      },
      {
        title: "Kotanjantı aynı mantıkla kur",
        paragraphs: [
          "Kotanjant toplamı(cot a cot b−1)/(cot a+cot b), farkı(cot a cot b+1)/(cot b−cot a) olur. İkinci paydanın sırası önemlidir: fark açısı a−b iken cot b−cot a yazılır. Gerekirse payı cos(a−b), paydayı sin(a−b) açarak yeniden türet.",
          "Cot a ve cot b tanımlı olmadan bu biçimler kullanılamaz. Toplam için cot a+cot b=0 olması da bölümü tanımsız yapar. Tanjant ve kotanjantı birbirine çevirmek ancak çevrilen değerin sıfır olmaması ve iki tarafın tanımlı olması koşuluyla mümkündür.",
        ],
      },
      {
        title: "İki kat açı, toplamın özel durumudur",
        paragraphs: [
          "b=a seçimi sin2a=2 sin a cos a ve cos2a=cos²a−sin²a verir. Birim çember özdeşliğini kullanarak cos2a=1−2 sin²a=2 cos²a−1 yazılır. Verilen tek bilgi sin a ise ilk, cos a ise ikinci biçim daha ekonomiktir.",
          "Tan2a=2 tan a/(1−tan²a) ve cot2a=(cot²a−1)/(2 cot a) da aynı yoldan gelir. Burada iki kat, değerin iki katı değildir. a=30° için sin60°=√3/2 bulunur; 2 sin30°=1 sayısı aynı ifade değildir.",
        ],
      },
      {
        title: "Kareli toplamda açılım terimini tanı",
        paragraphs: [
          "(sin a+cos a)²=1+sin2a ve(sin a−cos a)²=1−sin2a eşitlikleri, iki kare toplamının 1 olmasından gelir. sin a+cos a verilmişse hemen tek tek oranları çözmek yerine karesini alıp iki kat açıyı bulabilirsin.",
          "Kare alma işaret bilgisini siler. sin a+cos a=−√(1+sin2a) olabilen bölgeler vardır; kareli eşitlikten kök alırken toplamın işaretini ayrıca belirle. Bir ifade aralığı isteniyorsa −√2≤sin a+cos a≤√2 sınırı da bu yapıyla doğrulanır.",
        ],
      },
      {
        title: "Yarım açının önce karesini bul",
        paragraphs: [
          "Cos2u=1−2 sin²u eşitliğinde u=a/2 alındığında sin²(a/2)=(1−cos a)/2 çıkar. Diğer biçim cos²(a/2)=(1+cos a)/2 verir. Bu adım mutlak değer bilgisidir; karekök alınca sin(a/2) ve cos(a/2) için uygun işaret seçilmelidir.",
          "Örneğin 180°<a<360° ise 90°<a/2<180° olur; yarım açının sinüsü pozitif, kosinüsü negatiftir. a’nın değil a/2’nin bölgesini kullan. Etkileşimde esas ölçüyü erken almayıp yönlü toplamın yarısını izlemek, aynı cos a için farklı yarım açı işaretlerini gösterir.",
        ],
      },
      {
        title: "Yarım açı tanjantını eşdeğer biçimlerle gör",
        paragraphs: [
          "Sin a=2 sin(a/2)cos(a/2),1+cos a=2 cos²(a/2) olduğundan tan(a/2)=sin a/(1+cos a) uygun tanım koşullarında bulunur.1−cos a biçimini kullanırsan(1−cos a)/sin a elde edilir. İkinci biçimin sin a≠0 şartı ayrıca vardır.",
          "a=0° için tan0°=0 ve ilk bölüm 0/2=0 iken ikinci yazım 0/0 olduğundan kullanılamaz. a=180° için yarım açının tanjantı da tanımsızdır. Eşdeğer dönüşümlerin tüm gerçeklerde aynı derecede kullanılabilir olduğunu varsayma.",
        ],
      },
      {
        title: "Çarpımı toplam veya fark olarak yeniden yaz",
        paragraphs: [
          "Toplam ve fark sinüs bağıntılarını topla:2 sin a cos b=sin(a+b)+sin(a−b). Kosinüs bağıntılarını toplayınca 2 cos a cos b=cos(a+b)+cos(a−b), çıkarınca 2 sin a sin b=cos(a−b)−cos(a+b) bulunur.",
          "Bu dönüşümler özellikle farklı frekansları ayırırken işe yarar. sin20°cos10° ifadesi yarım sin30° ve sin10° toplamıdır. Formülün katsayısı 2’yi atlamak sonucu iki kat büyütür; her yeni yazımı a=b gibi basit bir seçimle sınayabilirsin.",
        ],
      },
      {
        title: "Toplamı çarpıma dönüştür",
        paragraphs: [
          "A=(u+v)/2 ve B=(u−v)/2 yazarsan u=A+B, v=A−B olur. Böylece sin u+sin v=2 sin A cos B ve sin u−sin v=2 cos A sin B çıkar. Kosinüs toplamında 2 cos A cos B, farkında−2 sin A sin B bulunur.",
          "Ortalama ve yarı fark birbirine karıştırılmamalıdır. cos70°−cos10°=−2 sin40°sin30°=−sin40° negatiftir; çünkü 70°’nin kosinüsü 10°’ninkinden küçüktür. Negatif ön işaret geometrik sırayla da kontrol edilir.",
        ],
      },
      {
        title: "Birden çok bilgi geldiğinde çözüm yolunu seç",
        paragraphs: [
          "Verilen oranlar ve bölgeler önce diğer oranların işaretini belirler. sin a=3/5, a ikinci bölgede ise cos a=−4/5 olur. Sonra örneğin cos(a−b) için gereken dört değer tabloya yerleştirilir; formül ile bölge seçimi ayrı adımlardır.",
          "Tanım koşulu, işaret, tam değer ve yaklaşık aralık sonunda birlikte denetlenir. Bilinmeyen açının kendisini bulmak çoğu soruda gereksizdir; sinüs veya kosinüs değerlerinden doğrudan toplam bağıntısına geçebilirsin. Yeni bir koşul eklemeden bölgeyi tahmin etmek yerine verilen aralığı kullan.",
        ],
      },
    ],
    examples: [
      {
        title: "105 dereceyi kur",
        prompt: "cos105° tam değeri nedir?",
        strategy: "105°=60°+45° yaz; kosinüs toplamını kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "cos60°=1/2, sin60°=√3/2 ve sin45°=cos45°=√2/2.",
          },
          {
            label: "Adım 2",
            explanation: "cos105°=(1/2)(√2/2)−(√3/2)(√2/2).",
          },
          {
            label: "Adım 3",
            explanation: "Sonuç(√2−√6)/4; ikinci bölgede negatiftir.",
          },
        ],
        answer: "(√2−√6)/4",
        check: "Yaklaşık−0,259; cos90° ile cos120° arasındadır.",
        pitfall: "Kosinüs toplamındaki ikinci çarpımın eksi işaretini unutma.",
      },
      {
        title: "Bölgeyi önce çöz",
        prompt:
          "sin a=3/5, a ikinci bölgede; cos b=12/13, b dördüncü bölgede. cos(a+b)?",
        strategy: "Eksik oranların işaretlerini bul; iki katkıyı çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation: "cos a=−4/5, sin b=−5/13.",
          },
          {
            label: "Adım 2",
            explanation: "cos a cos b=−48/65, sin a sin b=−15/65.",
          },
          {
            label: "Adım 3",
            explanation: "cos(a+b)=−48/65−(−15/65)=−33/65.",
          },
        ],
        answer: "−33/65",
        check:
          "İki ürünün işaretini ayrı kontrol et; mutlak değer 1’den küçük.",
        pitfall: "Eksi bir ürünü çıkarırken iki eksiye dikkat et.",
      },
      {
        title: "Tek orandan iki kat",
        prompt: "tan a=2 ve a birinci bölgede. sin2a nedir?",
        strategy: "Pay ve paydayı cos²a ile ilişkilendir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "sin2a=2 tan a/(1+tan²a).",
          },
          {
            label: "Adım 2",
            explanation: "2·2/(1+4)=4/5.",
          },
          {
            label: "Adım 3",
            explanation:
              "a yaklaşık 63,4°; 2a ikinci bölgede ve sinüs pozitif.",
          },
        ],
        answer: "4/5",
        check: "Birim çemberden sin a=2/√5, cos a=1/√5 ile aynı sonuç.",
        pitfall: "tan2a formülünü sin2a yerine koyma.",
      },
      {
        title: "Yarım açının işareti",
        prompt: "180°<a<360°, cos a=−3/5. cos(a/2)?",
        strategy: "Yarım açının bölgesini ayrı yaz.",
        steps: [
          {
            label: "Adım 1",
            explanation: "90°<a/2<180°; kosinüs negatiftir.",
          },
          {
            label: "Adım 2",
            explanation: "cos²(a/2)=(1−3/5)/2=1/5.",
          },
          {
            label: "Adım 3",
            explanation: "Negatif karekök seç:−1/√5=−√5/5.",
          },
        ],
        answer: "−√5/5",
        check: "Karesi 1/5 ve işareti ikinci bölgeyle uyumlu.",
        pitfall: "Kök her zaman pozitif diye düşünme.",
      },
      {
        title: "Toplamı tek çarpıma indir",
        prompt: "sin70°+sin20° ifadesini çarpım biçimine getir.",
        strategy: "Ortalama45°, yarı fark25°.",
        steps: [
          {
            label: "Adım 1",
            explanation: "sin u+sin v=2sin((u+v)/2)cos((u−v)/2).",
          },
          {
            label: "Adım 2",
            explanation: "2sin45°cos25° yaz.",
          },
          {
            label: "Adım 3",
            explanation: "2sin45°=√2 olduğundan sonuç√2cos25°.",
          },
        ],
        answer: "√2cos25°",
        check:
          "Açıların ortalaması ve yarı farkından70° ve20° geri elde edilir.",
        pitfall: "Ortalama yerine toplam90° açısını kullanma.",
      },
      {
        title: "Tanjantlı formülün sınırı",
        prompt: "tan(90°−30°) değerini nasıl güvenle buluruz?",
        strategy: "Önce toplam açıyı veya sinüs/kosinüs farkını kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "90°−30°=60° ve tan60°=√3.",
          },
          {
            label: "Adım 2",
            explanation:
              "tan90° tanımsız olduğundan tanjant farkı açılımı kullanılamaz.",
          },
          {
            label: "Adım 3",
            explanation: "Sinüs farkı√3/2, kosinüs farkı1/2; bölüm√3.",
          },
        ],
        answer: "√3",
        check:
          "Asıl ifade tanımlıdır; açılımdaki ara tanjantın tanımı ayrı koşuldur.",
        pitfall: "Tan90°’yi çok büyük bir sayı gibi kullanma.",
      },
    ],
    recall: [
      {
        prompt: "Yarım açı karekökünün işaretini hangi açı belirler?",
        answer:
          "a/2’nin bulunduğu bölge; yalnız a’nın kosinüs değeri işareti belirlemeye yetmez.",
      },
      {
        prompt: "Sinüs toplamında neden iki çarpım vardır?",
        answer:
          "Dönen noktanın her iki eski koordinatı da yeni düşey koordinata katkı yapar.",
      },
      {
        prompt: "Tan(a+b) bağıntısı ne zaman kullanılamaz?",
        answer:
          "Tan a veya tan b tanımsızsa ya da1−tan a tan b=0 ise tanjantlı yazım kullanılamaz.",
      },
      {
        prompt: "Toplamı çarpıma dönüştürmenin iki yeni açısı nedir?",
        answer:
          "Verilen açıların ortalaması ve yarı farkı; ters dönüşümle asıl iki açı geri elde edilir.",
      },
    ],
    questions: [
      {
        prompt: "sin75° değerini tam veren ifade hangisidir?",
        options: ["1", "(√3+1)/2", "(√6+√2)/4", "(√6−√2)/4", "√6/4"],
        answer: 2,
        hint: "75°=45°+30° yaz.",
        explanation:
          "sin75°=sin45°cos30°+cos45°sin30°. Ürünler√6/4 ve√2/4; toplam(√6+√2)/4. Sonuç yaklaşık 0,966; sin60° ile 1 arasındadır.",
        guidance: {
          knowledge: ["Sinüs toplamında iki çapraz çarpım bulunur."],
          strategy: "75°=45°+30° yaz.",
          steps: [
            "sin75°=sin45°cos30°+cos45°sin30°.",
            "Ürünler√6/4 ve√2/4; toplam(√6+√2)/4.",
          ],
          optionReasons: [
            "75° dik açı değildir; sinüs 1 olmaz.",
            "sin45° ve cos45° çarpanları atlandı.",
            "Doğru: Sonuç yaklaşık 0,966; sin60° ile 1 arasındadır.",
            "Bu sin15° değeridir; fark açısını kullandın.",
            "İkinci çapraz katkı √2/4 eksik.",
          ],
          commonError: "Sin(a+b)’yi sin a+sin b sanmak değeri değiştirir.",
          check: "Sonuç yaklaşık 0,966; sin60° ile 1 arasındadır.",
        },
      },
      {
        prompt: "cos15° tam değeri hangisidir?",
        options: ["−√2/2", "(√6−√2)/4", "√3/2", "(√6+√2)/4", "1/2"],
        answer: 3,
        hint: "15°=45°−30° yaz.",
        explanation:
          "cos15°=cos45°cos30°+sin45°sin30°. √6/4+√2/4=(√6+√2)/4. Cos15°=sin75°; sonuç 1’den küçüktür.",
        guidance: {
          knowledge: ["Kosinüs farkında iki çarpım toplanır."],
          strategy: "15°=45°−30° yaz.",
          steps: ["cos15°=cos45°cos30°+sin45°sin30°.", "√6/4+√2/4=(√6+√2)/4."],
          optionReasons: [
            "15° birinci bölgededir ve kosinüs pozitiftir.",
            "Fark kosinüsünde sinüs çarpımı çıkarılmaz, eklenir.",
            "Bu cos30° değeridir.",
            "Doğru: Cos15°=sin75°; sonuç 1’den küçüktür.",
            "Bu cos60° değeridir.",
          ],
          commonError: "Toplam kosinüsünün eksi işaretini farkta da kullanma.",
          check: "Cos15°=sin75°; sonuç 1’den küçüktür.",
        },
      },
      {
        prompt: "sin a=3/5 ve a ikinci bölgede ise sin2a kaçtır?",
        options: ["−12/25", "7/25", "6/5", "−24/25", "24/25"],
        answer: 3,
        hint: "Önce cos a’yı belirle.",
        explanation:
          "cos²a=1−9/25=16/25, cos a=−4/5. 2·3/5·(−4/5)=−24/25. 2a üçüncü veya dördüncü bölgede olabilir; hesaplanan sinüs negatiftir.",
        guidance: {
          knowledge: [
            "sin2a=2 sin a cos a; eksik oranın işareti bölgeden gelir.",
          ],
          strategy: "Önce cos a’yı belirle.",
          steps: ["cos²a=1−9/25=16/25, cos a=−4/5.", "2·3/5·(−4/5)=−24/25."],
          optionReasons: [
            "İki kat katsayısı 2 eksiktir.",
            "Bu cos2a değeridir.",
            "Cos a çarpanı unutulmuştur.",
            "Doğru: 2a üçüncü veya dördüncü bölgede olabilir; hesaplanan sinüs negatiftir.",
            "Cos a ikinci bölgede negatiftir.",
          ],
          commonError:
            "Karekökten yalnız pozitif cos a seçmek yanlış bölge üretir.",
          check:
            "2a üçüncü veya dördüncü bölgede olabilir; hesaplanan sinüs negatiftir.",
        },
      },
      {
        prompt: "cos a=3/5 olduğuna göre cos2a kaçtır?",
        options: ["−16/25", "−7/25", "7/25", "24/25", "6/5"],
        answer: 1,
        hint: "Verilen cos a’yı kareleyip yerine koy.",
        explanation:
          "cos²a=9/25. cos2a=18/25−25/25=−7/25. 1−2 sin²a=1−32/25 ile aynı sonuç bulunur.",
        guidance: {
          knowledge: [
            "cos2a=2 cos²a−1 bölge bilgisi gerektirmeyen bir biçimdir.",
          ],
          strategy: "Verilen cos a’yı kareleyip yerine koy.",
          steps: ["cos²a=9/25.", "cos2a=18/25−25/25=−7/25."],
          optionReasons: [
            "Cos²a katkısı yerine yalnız−sin²a yazılmıştır.",
            "Doğru: 1−2 sin²a=1−32/25 ile aynı sonuç bulunur.",
            "2 cos²a−1 farkının işareti ters çevrilmiştir.",
            "Bu olası sin2a büyüklüğüdür.",
            "Kosinüsün açısı iki katlanınca değeri ikiye katlanmaz.",
          ],
          commonError: "Cos a’yı ikiyle çarpmak iki kat açı formülü değildir.",
          check: "1−2 sin²a=1−32/25 ile aynı sonuç bulunur.",
        },
      },
      {
        prompt: "180°<a<360° ve cos a=−1/2 ise cos(a/2) kaçtır?",
        options: ["−1/2", "−1/4", "√3/2", "1/2", "−√3/2"],
        answer: 0,
        hint: "90°<a/2<180° aralığını yaz.",
        explanation:
          "cos²(a/2)=(1−1/2)/2=1/4. İkinci bölgede negatif kök seçilerek −1/2 bulunur. Kare 1/4 ve kosinüsün işareti negatiftir.",
        guidance: {
          knowledge: ["cos²(a/2)=(1+cos a)/2; işaret yarım açıya bağlıdır."],
          strategy: "90°<a/2<180° aralığını yaz.",
          steps: [
            "cos²(a/2)=(1−1/2)/2=1/4.",
            "İkinci bölgede negatif kök seçilerek −1/2 bulunur.",
          ],
          optionReasons: [
            "Doğru: Kare 1/4 ve kosinüsün işareti negatiftir.",
            "Bulunan kare 1/4’tür; değerin kendisi değildir.",
            "Bu yarım açının pozitif sinüsüdür.",
            "Yarım açı ikinci bölgededir; kosinüs negatif.",
            "Kosinüs için 1+cos a kullanılmalı.",
          ],
          commonError:
            "Yarım açı yerine asıl açının bölgesine bakmak işareti bozabilir.",
          check: "Kare 1/4 ve kosinüsün işareti negatiftir.",
        },
      },
      {
        prompt: "sin a+cos a=6/5 ise sin2a kaçtır?",
        options: ["11/25", "6/5", "36/25", "12/5", "−11/25"],
        answer: 0,
        hint: "Verilen toplamın karesini al.",
        explanation:
          "36/25=1+sin2a. sin2a=36/25−25/25=11/25. 1+11/25=36/25; verilen pozitif toplamın karesiyle eşleşir.",
        guidance: {
          knowledge: ["(sin a+cos a)²=1+sin2a."],
          strategy: "Verilen toplamın karesini al.",
          steps: ["36/25=1+sin2a.", "sin2a=36/25−25/25=11/25."],
          optionReasons: [
            "Doğru: 1+11/25=36/25; verilen pozitif toplamın karesiyle eşleşir.",
            "Toplamın kendisi iki kat açının sinüsü değildir.",
            "Kare açılımındaki 1 çıkarılmadı.",
            "Toplamı ikiyle çarpmak yanlış işlemdir.",
            "(sin a+cos a)²=1+sin2a bağıntısında işaret ters.",
          ],
          commonError: "Kareli toplamı kareler toplamıyla karıştırma.",
          check: "1+11/25=36/25; verilen pozitif toplamın karesiyle eşleşir.",
        },
      },
      {
        prompt: "tan a=1/2 ve tan b=1/3; tan(a+b) tanımlıysa değeri kaçtır?",
        options: ["5/6", "1", "1/6", "5/7", "−1"],
        answer: 1,
        hint: "(1/2+1/3)/(1−1/6) kur.",
        explanation:
          "Pay 5/6, payda 5/6. Bölüm 1; payda sıfır değil. Eşit pay ve payda oranı 1 yapar.",
        guidance: {
          knowledge: ["Toplam tanjantında pay toplam, payda 1−çarpımdır."],
          strategy: "(1/2+1/3)/(1−1/6) kur.",
          steps: ["Pay 5/6, payda 5/6.", "Bölüm 1; payda sıfır değil."],
          optionReasons: [
            "Pay yazılmış ama payda 1−1/6’ya bölünmemiş.",
            "Doğru: Eşit pay ve payda oranı 1 yapar.",
            "Bu yalnız iki tanjantın çarpımıdır.",
            "Toplam tanjantında payda yanlışlıkla 1+çarpım alındı.",
            "Payda pozitif 5/6 olduğundan sonuç negatife dönmez.",
          ],
          commonError:
            "Tanjantları yalnız toplamak ortak dönüşüm katkısını eksiltir.",
          check: "Eşit pay ve payda oranı 1 yapar.",
        },
      },
      {
        prompt: "tan a=3/4 ise tan2a tanımlı olduğunda kaçtır?",
        options: ["3/2", "6/7", "24/7", "24/25", "7/24"],
        answer: 2,
        hint: "Payda 1−9/16’yı ayrı hesapla.",
        explanation:
          "Pay 3/2; payda 7/16. (3/2)·(16/7)=24/7. Payda 7/16 sıfır değildir; sonuç tanımlıdır.",
        guidance: {
          knowledge: ["tan2a=2 tan a/(1−tan²a)."],
          strategy: "Payda 1−9/16’yı ayrı hesapla.",
          steps: ["Pay 3/2; payda 7/16.", "(3/2)·(16/7)=24/7."],
          optionReasons: [
            "Yalnız 2 tan a hesaplandı; payda unutuldu.",
            "Payda 16’ya genişletilirken pay 4 eksik büyütüldü.",
            "Doğru: Payda 7/16 sıfır değildir; sonuç tanımlıdır.",
            "Bu sin2a değeridir.",
            "Tanjant ve kotanjant sonuçları ters çevrildi.",
          ],
          commonError: "Sin2a ile tan2a için aynı paydayı kullanma.",
          check: "Payda 7/16 sıfır değildir; sonuç tanımlıdır.",
        },
      },
      {
        prompt: "sin50°+sin10° hangi ifadeye eşittir?",
        options: ["sin60°", "cos20°", "cos30°", "2 cos20°", "sin20°"],
        answer: 1,
        hint: "Ortalama 30°, yarı fark 20° bul.",
        explanation:
          "2 sin30°cos20° yaz. 2 sin30°=1; cos20° kalır. İki pozitif sinüsün toplamı yaklaşık 0,94; cos20° aynı değerdedir.",
        guidance: {
          knowledge: [
            "Sinüslerin toplamı 2 sin(ortalama)cos(yarı fark) biçimindedir.",
          ],
          strategy: "Ortalama 30°, yarı fark 20° bul.",
          steps: ["2 sin30°cos20° yaz.", "2 sin30°=1; cos20° kalır."],
          optionReasons: [
            "Sinüs toplamı toplam açının sinüsü değildir.",
            "Doğru: İki pozitif sinüsün toplamı yaklaşık 0,94; cos20° aynı değerdedir.",
            "Yarı fark 20° yanlış hesaplandı.",
            "2 sin30° katsayısı 1 olur; 2 kalmaz.",
            "Ortalama ve yarı farkın fonksiyonları yer değiştirdi.",
          ],
          commonError: "Açıları yalnız toplayıp 60° kullanmak dönüşümü yapmaz.",
          check:
            "İki pozitif sinüsün toplamı yaklaşık 0,94; cos20° aynı değerdedir.",
        },
      },
      {
        prompt: "cos70°−cos10° hangi ifadeye eşittir?",
        options: ["sin60°", "sin40°", "−cos40°", "−sin40°", "−2 sin40°"],
        answer: 3,
        hint: "Ortalama 40°, yarı fark 30° yaz.",
        explanation:
          "−2 sin40°sin30° elde edilir. Sin30°=1/2 ile sonuç −sin40°. −sin40° negatiftir; doğrudan kosinüs sırası da bunu doğrular.",
        guidance: {
          knowledge: ["Cos u−cos v=−2 sin((u+v)/2)sin((u−v)/2)."],
          strategy: "Ortalama 40°, yarı fark 30° yaz.",
          steps: [
            "−2 sin40°sin30° elde edilir.",
            "Sin30°=1/2 ile sonuç −sin40°.",
          ],
          optionReasons: [
            "İki kosinüs farkı sinüs fark açısı değildir.",
            "Kosinüs farkı formülünün eksi işareti kayboldu.",
            "Ortalama açının sinüsü gerekir.",
            "Doğru: −sin40° negatiftir; doğrudan kosinüs sırası da bunu doğrular.",
            "sin30°=1/2 çarpanı sadeleştirilmedi.",
          ],
          commonError:
            "Cos70°<cos10° olduğu için sonucun pozitif olamayacağını unutma.",
          check:
            "−sin40° negatiftir; doğrudan kosinüs sırası da bunu doğrular.",
        },
      },
      {
        prompt: "sin a cos b−cos a sin b ifadesi hangisidir?",
        options: ["sin(a−b)", "sin(b−a)", "cos(a+b)", "cos(a−b)", "sin(a+b)"],
        answer: 0,
        hint: "İlk terimdeki sinüsün açısını takip et.",
        explanation:
          "Sinüs farkı açılımını yaz: sin(a−b)=sin a cos b−cos a sin b. Terim sırası ve işaretler verilen ifadeyle eşleşir. a=30°, b=60° için iki taraf −1/2 olur.",
        guidance: {
          knowledge: [
            "Çapraz sinüs–kosinüs çarpımları sinüs toplam-farkını verir.",
          ],
          strategy: "İlk terimdeki sinüsün açısını takip et.",
          steps: [
            "Sinüs farkı açılımını yaz: sin(a−b)=sin a cos b−cos a sin b.",
            "Terim sırası ve işaretler verilen ifadeyle eşleşir.",
          ],
          optionReasons: [
            "Doğru: a=30°, b=60° için iki taraf −1/2 olur.",
            "Bu verilenin negatifidir.",
            "Kosinüs toplamı cos a cos b−sin a sin b’dir.",
            "Kosinüs farkında aynı fonksiyonlu çarpımlar toplanır.",
            "Toplamda ikinci çarpım da pozitif olur.",
          ],
          commonError:
            "Fark sırasını ters çevirmek sinüsün işaretini değiştirir.",
          check: "a=30°, b=60° için iki taraf −1/2 olur.",
        },
      },
      {
        prompt: "tan(90°−45°) hesaplanırken hangi açıklama doğrudur?",
        options: [
          "Sonuç−1’dir.",
          "Tan90°=0 yazılır.",
          "Sonuç 1; tan90° içeren fark açılımı kullanılamaz.",
          "Fark açılımında her ara değer zorunlu tanımlıdır.",
          "Sonuç tanımsızdır.",
        ],
        answer: 2,
        hint: "Önce 90°−45° açısını sadeleştir.",
        explanation:
          "Asıl ifade tan45°=1. Tan90° içeren bölümü kurmadan doğrudan veya sin/cos farkıyla hesapla. Sin45°/cos45°=1 ve payda sıfır değildir.",
        guidance: {
          knowledge: [
            "Bir fonksiyonun toplam açıdaki tanımı ile açılımdaki ara tanımlar farklıdır.",
          ],
          strategy: "Önce 90°−45° açısını sadeleştir.",
          steps: [
            "Asıl ifade tan45°=1.",
            "Tan90° içeren bölümü kurmadan doğrudan veya sin/cos farkıyla hesapla.",
          ],
          optionReasons: [
            "90°−45°=45° birinci bölgededir.",
            "90°’de kosinüs sıfırdır ve tanjant tanımsızdır.",
            "Doğru: Sin45°/cos45°=1 ve payda sıfır değildir.",
            "Tan90° tanımsız olduğundan bu ara yazım kurulamaz.",
            "Asıl açı 45°; onun tanjantı tanımlıdır.",
          ],
          commonError:
            "Bir açılım kullanılamıyor diye asıl ifadeyi tanımsız sayma.",
          check: "Sin45°/cos45°=1 ve payda sıfır değildir.",
        },
      },
      {
        prompt: "0°<a<180° ve cos a=3/5 ise tan(a/2) kaçtır?",
        options: ["4/3", "−1/2", "1/4", "2", "1/2"],
        answer: 4,
        hint: "Sin a’nın pozitif 4/5 olduğunu belirle.",
        explanation:
          "Sin a=4/5 ve 1+cos a=8/5. (4/5)/(8/5)=1/2. (1−cos a)/sin a=(2/5)/(4/5)=1/2 aynı sonucu verir.",
        guidance: {
          knowledge: ["Tan(a/2)=sin a/(1+cos a) uygun koşullarda kullanılır."],
          strategy: "Sin a’nın pozitif 4/5 olduğunu belirle.",
          steps: ["Sin a=4/5 ve 1+cos a=8/5.", "(4/5)/(8/5)=1/2."],
          optionReasons: [
            "Bu asıl açının tanjantıdır.",
            "Yarım açı 0°–90° arasındadır.",
            "Bu yarım açının tanjantının karesidir.",
            "Sinüs ile 1+cos a bölümü ters çevrilmiştir.",
            "Doğru: (1−cos a)/sin a=(2/5)/(4/5)=1/2 aynı sonucu verir.",
          ],
          commonError: "Yarım açı formülünü cot(a/2) ile karıştırma.",
          check: "(1−cos a)/sin a=(2/5)/(4/5)=1/2 aynı sonucu verir.",
        },
      },
      {
        prompt: "2 sin35°cos15° hangi ifadeye eşittir?",
        options: [
          "cos50°+cos20°",
          "2 sin50°",
          "sin50°−sin20°",
          "sin20°",
          "sin50°+sin20°",
        ],
        answer: 4,
        hint: "Açıların toplamını 50°, farkını 20° bul.",
        explanation:
          "a=35°, b=15° yerine koy. Sonuç sin 50°+sin20° olur. a+b ve a−b geri ortalandığında 35° ve15° bulunur.",
        guidance: {
          knowledge: ["2 sin a cos b=sin(a+b)+sin(a−b)."],
          strategy: "Açıların toplamını 50°, farkını 20° bul.",
          steps: ["a=35°, b=15° yerine koy.", "Sonuç sin 50°+sin20° olur."],
          optionReasons: [
            "Bu biçim iki kosinüs çarpımına aittir.",
            "İkinci açı katkısı ayrı bir sinüstür.",
            "Sinüs–kosinüs çarpımında iki sinüs toplanır.",
            "Toplam açı dalı atlandı.",
            "Doğru: a+b ve a−b geri ortalandığında 35° ve15° bulunur.",
          ],
          commonError:
            "İki katkıdan yalnız fark açısını tutmak eksik dönüşümdür.",
          check: "a+b ve a−b geri ortalandığında 35° ve15° bulunur.",
        },
      },
    ],
    source:
      "MEBİ AYT Matematik fiziksel 47–50; OGM AYT Trigonometri video notu 14–19 öğretim sayfaları karşılaştırılarak yazılmış özgün anlatım ve öğretim soruları. Yarım açı ve çarpım–toplam bağıntıları iki kat/toplam formüllerinden burada türetilir; kaynaktaki hatalı ara işaretler aktarılmaz.",
  },
  {
    id: "ayt-trigonometrik-denklemler",
    topic: "detail-471",
    title: "Trigonometrik denklemler: bütün kökleri koru",
    minutes: 110,
    objectives: [
      "Bir kök ile çözüm kümesini ayır",
      "Tanım ve değer aralığını ilk satıra yaz",
      "İşlemi gerekçelendir; tanım koşullarını ve sonucu bağımsız denetle.",
    ],
    sections: [
      {
        title: "Bir kök ile çözüm kümesini ayır",
        paragraphs: [
          "Denklem yalnız bazı x değerlerinde doğru olan eşitliktir; özdeşlik ise tanım alanındaki her x için doğrudur. sin x=1/2’nin 30° ile sağlanması işi bitirmez:150° de aynı ordinatı verir ve tam turlar yeni kökler üretir. Önce hangi aralıkta veya hangi sayı kümesinde çözüm istendiğini oku.",
          "Bu ünitede derece ve radyan birbiri yerine yazılmaz. Derecede tam tur 360°, radyanda 2π’dir. Soru sonlu bir aralık veriyorsa önce bütün çözüm ailelerini kur, sonra ailelerden aralığa girenleri seç. Aynı kökü iki farklı aile üretirse çözüm kümesinde yalnız bir kez yaz.",
        ],
      },
      {
        title: "Tanım ve değer aralığını ilk satıra yaz",
        paragraphs: [
          "Sinüs ve kosinüs için sağ tarafın−1 ile 1 arasında olması gerekir; sin x=2 gerçek çözüm üretmez. Tanjantta x=π/2+kπ, kotanjantta x=kπ yasaktır. Denklemde kesir varsa trigonometrik fonksiyonun kendi yasağına ek olarak kesrin paydasını da denetle.",
          "Denklemi sadeleştirmek yasak noktaları ortadan kaldırmaz. sin x/cos x=0 yazımı yalnız cos x≠0 iken tan x=0 ile eşdeğerdir. Son kontrol ilk denklemde yapılır; dönüştürülmüş bir denklem yeni aday üretse bile bu adayın başlangıçta tanımlı olması şarttır.",
        ],
      },
      {
        title: "Sinüste iki simetrik aileyi kur",
        paragraphs: [
          "Sin x=sin θ için x=θ+2kπ veya x=π−θ+2kπ, k∈ℤ yazılır. İlk aile aynı çember noktasını, ikinci aile aynı ordinata sahip yatay simetriğini içerir. θ özel bir aralıkta seçilmemiş olsa da bu iki aile birlikte bütün çözümleri verir.",
          "Sin x=1/2 için π/6 ve5π/6 temel kökleri bulunur. Sağ taraf±1 ise iki aile aynı noktalara denk gelir ve tekrarlar temizlenir. Sin x=0 için 0 veπ aileleri birleştirilerek x=kπ yazılabilir; yalnız x=0 demek eksik kalır.",
        ],
      },
      {
        title: "Kosinüste karşıt açılı iki aile vardır",
        paragraphs: [
          "Cos x=cos θ için x=θ+2kπ veya x=−θ+2kπ yazılır. Çemberde aynı apsise sahip iki nokta x eksenine göre simetriktir. Cos x=−1/2 için 2π/3 ve 4π/3 temel kökleri buradan gelir.",
          "Cos x=1 olduğunda x=2kπ, cos x=−1 olduğunda x=π+2kπ olur. İki formülün aynı kökü iki defa üretmesi iki ayrı çözüm olduğu anlamına gelmez. Sonlu aralıkta kök sayısı bulunurken nokta sayılır; cebirsel yazım sayısı değil.",
        ],
      },
      {
        title: "Tanjant ve kotanjantın turu yarımdır",
        paragraphs: [
          "Tan x=tan θ için x=θ+kπ, k∈ℤ; cot x=cot θ için de x=θ+kπ yazılır. Çünkü bir yarım turda sinüs ve kosinüsün işaretleri birlikte değişir ve oran aynı kalır. θ başlangıç fonksiyonunun tanım alanında olmalıdır.",
          "Tan x=−1 için −π/4+kπ kullanılabilir; [0,2π) içindeki kökler 3π/4 ve7π/4’tür. Cot x=0 kökleri π/2+kπ’dir; cot x=0 denkleminden tan x=1/0 yazmak geçerli değildir. Sıfır oranı, karşıt oranın tanımsız olabileceğini hatırlatır.",
        ],
      },
      {
        title: "İçteki açının tamamını çöz",
        paragraphs: [
          "Sin(2x−π/6)=1/2 denkleminde θ yerine 2x−π/6’yı yaz. İki aile 2x−π/6=π/6+2kπ ve2x−π/6=5π/6+2kπ olur. Her iki ailede de önce sabit açı taşınır, sonra katsayıya bölünür.",
          "Sonuç x=π/6+kπ veya x=π/2+kπ’dir. Katsayı 2’ye bölünürken k’lı tur terimi de bölünür; frekans büyüdükçe sabit uzunluktaki aralıkta daha fazla kök çıkması bunun geometrik karşılığıdır. Yalnız temel açıyı ikiye bölüp turu aynı bırakma.",
        ],
      },
      {
        title: "İki değişken açılı sinüs eşitliği",
        paragraphs: [
          "Sin f(x)=sin g(x) için f(x)=g(x)+2kπ veya f(x)=π−g(x)+2kπ denklemlerini ayrı çöz. Sin3x=sin x örneğinde ilk aile 2x=2kπ, ikinci aile 4x=π+2kπ verir. İki aileyi birleşimle toplarsın; kesişim istemezsin.",
          "Bulduğun kökleri asıl sinüs eşitliğinde denetle. İki aile bazı parametrelerde örtüşebilir; aralık sonları da ayrıca temizlenmelidir. Sinüsün birebirliğini bütün gerçeklerde varmış gibi kullanıp 3x=x yazmak, ikinci simetri ailesini ve turları kaybettirir.",
        ],
      },
      {
        title: "Kosinüs eşitliğinde artı ve eksi dalları",
        paragraphs: [
          "Cos f(x)=cos g(x) eşitliği f(x)=g(x)+2kπ veya f(x)=−g(x)+2kπ koşulunu verir. Örneğin cos2x=cos x için x=2kπ veya 3x=2kπ bulunur. Birinci aile ikinci ailenin içinde kalabilir; birleştirmede tekrar yazılmaz.",
          "Tanjant eşitliğinde ise f(x)=g(x)+kπ yeterlidir; yine iki tanjantın tanımlı olması gerekir. Fonksiyon adını okumadan sinüsün ikinci dalını tanjanta taşımak doğru değildir. Her ailenin tur uzunluğu fonksiyonun simetrisiyle seçilir.",
        ],
      },
      {
        title: "Ortak çarpana bölmeden sıfır dalını ayır",
        paragraphs: [
          "Sin2x=sin x denkleminde iki kat açıyı aç:sin x(2 cos x−1)=0. Buradan sin x=0 veya cos x=1/2 dalları çıkar. Sin x’e bölmek ilk dalı kaybettirir; sıfır çarpım kuralı iki dalı birlikte saklar.",
          "[0,2π) içinde ilk dal 0,π; ikinci dalπ/3,5π/3 verir. Toplam dört farklı kök vardır. Bir dalın diğerini sağlaması gerekmez; çarpımın sıfır olması için herhangi bir çarpanın sıfır olması yeterlidir. Bu nedenle iki çözüm kümesi birleştirilir.",
        ],
      },
      {
        title: "Tek trigonometrik değere dönüşüm yap",
        paragraphs: [
          "2 sin²x−3 sin x+1=0 için t=sin x yazınca 2t²−3t+1=0 elde edilir. Çarpanlar(2t−1)(t−1) olduğundan t=1/2 veya 1 çıkar. Bunlar birer x değeri değil sinüs değeridir; her biri için ayrı trigonometrik denklem çözülür.",
          "T=sin x dönüşümünde−1≤t≤1 koşulunu tut. Örneğin(t−2)(t+1)=0 çözülünce t=2 cebirsel kökü gerçek x üretmez. Aynı süreç kosinüste de geçerlidir; tanjantta sağ tarafın değer aralığı bütün gerçeklerdir ama yasak açılar sürer.",
        ],
      },
      {
        title: "Kare alma ve kök açma aday üretebilir",
        paragraphs: [
          "Sin x+cos x=1 denkleminin karesini almak 1+sin2x=1, yani sin2x=0 verir. Bu yeni denklemin bütün kökleri asıl denklemi sağlamaz; örneğin x=π için toplam−1’dir. Kare alma iki farklı işareti aynı karede birleştirir.",
          "Sonlu aralıkta önce karesini alarak adayları bulabilir, sonra her birini başlangıç toplamında deneyebilirsin. Özdeşlikler eşdeğer dönüşümdür; iki tarafın karesini almak genellikle tek yönlü sonuç verir. Çözümün son satırında kontrolü yazmak kaybolan işaret bilgisini geri getirir.",
        ],
      },
      {
        title: "Doğrusal birleşimi tek dalga hâline getir",
        paragraphs: [
          "a sin x+b cos x için R=√(a²+b²) al. R>0 ise cosφ=a/R ve sinφ=b/R seçilerek ifade Rsin(x+φ) yazılır. Böylece denklem sin(x+φ)=c/R olur; çözümün varlığı|c|≤R koşuluyla görülür.",
          "R=0 ise a=b=0’dır; denklem 0=c biçiminde ayrıca çözülür. C=0 için her x, diğer c’lerde hiçbir x çözüm değildir. Tek bir katsayıya bölmek yerine R yöntemi kullanmak, a veya b sıfırken de geçerli bir yol verir. Etkileşim bu özel durumları ayrı gösterir.",
        ],
      },
      {
        title: "Homojen denklemde bölme koşulunu incele",
        paragraphs: [
          "a sin x+b cos x=0 denklemini cos x’e bölmek için önce cos x=0 noktalarını ilk denklemde dene. a≠0 ise bu noktalarda a sin x sıfır olamayacağından kök yoktur; kalan bölgede tan x=−b/a kullanılabilir.",
          "a=0 ise ilk denklem b cos x=0’dır; cos x=0 köklerini baştan yasaklamak bütün çözümü kaybettirir. İkinci derece homojen ifadelerde de cos²x’e bölmeden önce cos x=0 dalı incelenir. Bir bölmenin izin şartı yalnız işlem ayrıntısı değil çözüm kümesinin parçasıdır.",
        ],
      },
      {
        title: "Aralığa seçerken eşitsizliği gerçekten çöz",
        paragraphs: [
          "x=π/6+kπ ailesini 0≤x<2π aralığına koyarsan−1/6≤k<11/6 bulunur; tam sayı k=0,1 seçilir. Aralıkta kaç tur var diye tahmin etmek yerine bu eşitsizlik özellikle kaydırılmış veya negatif aralıklarda güvenilir sonuç verir.",
          "Kapalı uç bir kökü içerir, açık uç içermez. [0,2π] ile [0,2π) aynı sayıdaki kökü vermeyebilir. Sonlu kök listesi yazıldıktan sonra sırala, tekrarı kaldır ve her kökün aralık koşulunu ayrı denetle. Birim dereceyse tur sınırlarında da derece kullan.",
        ],
      },
      {
        title: "Kök sayısı ile kök toplamını ayır",
        paragraphs: [
          "Sinüs grafiğinde bir yatay çizgi iki farklı noktada kesişebilir; teğet seviyede bu iki kesişim birleşir. Rsin(kx+φ)=c denkleminde|c|>R ise hiç kesişim yok,|c|=R ise her tam periyotta bir,|c|<R ise genellikle iki kesişim vardır.",
          "Bu periyot sayımı sonlu aralığın uçlarından etkilenir; her zaman doğrudan 2k kök diye yazılmaz. Kök toplamı isteniyorsa sayıyı bulmak yetmez, aralığa seçilmiş gerçek değerler toplanır. Etkileşimde hedef seviyeyi değiştirip köklerin birleşmesini ve aralıktan çıkmasını gözle.",
        ],
      },
      {
        title: "Çözümünü dört ayrı denetimden geçir",
        paragraphs: [
          "Önce bütün fonksiyonların tanımını, sonra bütün cebirsel dalları, sonra aralığı ve en son başlangıç eşitliğini kontrol et. Bu dört kontrol farklı kusurları yakalar:yasak noktalar, bölmeyle kaybolan sıfırlar, açık uçlar ve kare almanın ürettiği sahte kökler.",
          "Yaklaşık grafik kökleri yolu anlamak için faydalıdır; tam cevap istendiğindeπ’li veya özel açılı değerler tercih edilir. Bir kökü sayısal olarak denemek bütün çözümün bulunduğunu kanıtlamaz; bütünlük, trigonometrik çözüm ailelerinin doğru kurulmasından gelir.",
        ],
      },
    ],
    examples: [
      {
        title: "Sinüsün iki ailesi",
        prompt: "sin x=−1/2 denklemini[0,2π) içinde çöz.",
        strategy:
          "Pozitif referans açısıπ/6; sinüs negatif iki bölgeyi kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Üçüncü bölgeπ+π/6=7π/6.",
          },
          {
            label: "Adım 2",
            explanation: "Dördüncü bölge 2π−π/6=11π/6.",
          },
          {
            label: "Adım 3",
            explanation: "İkisi de aralıkta; diğer turlar aralığın dışında.",
          },
        ],
        answer: "{7π/6,11π/6}",
        check: "Her iki sinüs−1/2; 0 ve 2π kök değil.",
        pitfall: "Yalnız ters sinüsün−π/6 çıktısını yazma.",
      },
      {
        title: "İç açıyı ayır",
        prompt: "cos(2x+π/3)=1/2; 0≤x<2π.",
        strategy: "İç açının iki kosinüs ailesini ayrı kur.",
        steps: [
          {
            label: "Adım 1",
            explanation: "2x+π/3=π/3+2kπ veya−π/3+2kπ.",
          },
          {
            label: "Adım 2",
            explanation: "x=kπ veya x=−π/3+kπ.",
          },
          {
            label: "Adım 3",
            explanation: "Aralıkta ilk aile0,π; ikinci aile2π/3,5π/3 verir.",
          },
        ],
        answer: "{0,2π/3,π,5π/3}",
        check: "İç açılar±π/3 mod2π olur; hepsinde kosinüs1/2.",
        pitfall: "π/3 kaymasını taşırken bütün tur terimini de ikiye böl.",
      },
      {
        title: "Bölmeyle kök kaybetme",
        prompt: "sin x(2cos x+√3)=0; 0≤x<2π.",
        strategy: "Sıfır çarpımının iki dalını ayrı çöz.",
        steps: [
          {
            label: "Adım 1",
            explanation: "sin x=0 için0 veπ.",
          },
          {
            label: "Adım 2",
            explanation: "cos x=−√3/2 için5π/6 ve7π/6.",
          },
          {
            label: "Adım 3",
            explanation:
              "Dört farklı kök birleştirilir; bölerek0 dalı atılmaz.",
          },
        ],
        answer: "{0,5π/6,π,7π/6}",
        check: "Her kökte çarpanlardan en az biri sıfırdır; 2π açık uçtur.",
        pitfall: "Sin x’e bölmek0 veπ köklerini kaybettirir.",
      },
      {
        title: "Kare alma sonrası dene",
        prompt: "sin x−cos x=1; 0≤x<2π.",
        strategy: "Kareyle aday üret, başlangıçta sınayarak ele.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Karesi1−sin2x=1 ⇒sin2x=0.",
          },
          {
            label: "Adım 2",
            explanation: "Adaylar0,π/2,π,3π/2.",
          },
          {
            label: "Adım 3",
            explanation: "İlk farkπ/2 veπ’de1;0 ve 3π/2’de−1.",
          },
        ],
        answer: "{π/2,π}",
        check: "İki geçerli açı ilk işaretli eşitliği de sağlar.",
        pitfall: "Karesi aynı diye toplamı−1 yapan adayları kabul etme.",
      },
      {
        title: "Genlik seviyesinde tek kök",
        prompt:
          "5sin x+12cos x=13 denkleminin[0,2π) içindeki kök sayısı nedir?",
        strategy: "R=13 ile ifadeyi tek sinüs dalgasına çevir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "R=√(25+144)=13; sinφ=12/13,cosφ=5/13.",
          },
          {
            label: "Adım 2",
            explanation: "Denklem sin(x+φ)=1 olur; x+φ=π/2+2kπ.",
          },
          {
            label: "Adım 3",
            explanation:
              "φ birinci bölgede olduğundan aralıkta tek kök π/2−φ vardır.",
          },
        ],
        answer: "Bir farklı kök.",
        check:
          "Kök x=arctan(5/12); iki dal genliğin en üst seviyesinde birleşir.",
        pitfall: "Sınır seviyesinde her periyotta iki ayrı kök sayma.",
      },
      {
        title: "Sıfır katsayı özel dalı",
        prompt: "0·sin x+3cos x=3; 0≤x<2π.",
        strategy: "İlk denklemi sadeleştir; cos x’e bölme.",
        steps: [
          {
            label: "Adım 1",
            explanation: "3cos x=3 ⇒cos x=1.",
          },
          {
            label: "Adım 2",
            explanation: "Genel ailex=2kπ.",
          },
          {
            label: "Adım 3",
            explanation: "Aralıkta yalnız0 vardır;2π açık uçtur.",
          },
        ],
        answer: "{0}",
        check: "x=0 için3cos0=3; sıfır katsayı çözümün tipini değiştirdi.",
        pitfall: "Önceki homojen denklem formülünü bu yeni sağ tarafa taşıma.",
      },
    ],
    recall: [
      {
        prompt: "Sin x=sinθ için hangi iki aile vardır?",
        answer: "θ+2kπ veπ−θ+2kπ; k tam sayı.",
      },
      {
        prompt: "Açık uç ile kapalı uç kök sayısını değiştirebilir mi?",
        answer: "Evet; sınır noktası kökse yalnız kapalı uçta alınır.",
      },
      {
        prompt: "Bilinmeyen trigonometrik ifadeye bölmeden önce ne yapılır?",
        answer: "O ifadenin sıfır olduğu adaylar ilk denklemde ayrıca denenir.",
      },
      {
        prompt: "a sin x+b cos x=c için genel varlık şartı nedir?",
        answer: "R=√(a²+b²)>0 ise|c|≤R; R=0 durumu 0=c olarak ayrıca çözülür.",
      },
    ],
    questions: [
      {
        prompt: "sin x=1/2 denkleminin[0,2π) içindeki çözüm kümesi nedir?",
        options: ["{π/2}", "{π/6,7π/6}", "{π/6,5π/6}", "{5π/6,11π/6}", "{π/6}"],
        answer: 2,
        hint: "Referans π/6 açısını iki pozitif sinüs bölgesine yerleştir.",
        explanation:
          "Birinci kök π/6. İkinci kök π−π/6=5π/6. Her iki kök aralıkta ve sinüsleri 1/2.",
        guidance: {
          knowledge: [
            "Sinüs aynı ordinata sahip iki simetrik çember noktası verebilir.",
          ],
          strategy:
            "Referans π/6 açısını iki pozitif sinüs bölgesine yerleştir.",
          steps: ["Birinci kök π/6.", "İkinci kök π−π/6=5π/6."],
          optionReasons: [
            "π/2’de sinüs 1’dir.",
            "7π/6’da sinüs−1/2 olur.",
            "Doğru: Her iki kök aralıkta ve sinüsleri 1/2.",
            "11π/6’nın sinüsü negatiftir; π/6 atlanmış.",
            "İkinci bölgedeki aynı ordinat kökü eksik.",
          ],
          commonError: "Ters sinüsün tek değerini bütün çözüm kümesi sanma.",
          check: "Her iki kök aralıkta ve sinüsleri 1/2.",
        },
      },
      {
        prompt: "cos x=−1 denklemi için bütün gerçek çözüm ailesi nedir?",
        options: ["x=π+kπ", "x=π", "x=π/2+kπ", "x=2kπ", "x=π+2kπ, k∈ℤ"],
        answer: 4,
        hint: "Temel köke tam turları ekle.",
        explanation:
          "Temel kök π. Kosinüs periyodu 2π olduğundan π+2kπ. k=0 için π, k=1 için 3π; ikisi de cos=−1.",
        guidance: {
          knowledge: [
            "Kosinüs−1 değeri negatif x eksenindeki çember noktasındadır.",
          ],
          strategy: "Temel köke tam turları ekle.",
          steps: ["Temel kök π.", "Kosinüs periyodu 2π olduğundan π+2kπ."],
          optionReasons: [
            "Tek k değerlerinde cos x=1 olan 0 mod 2π noktaları da eklenir.",
            "Yalnız tek kök yazılmış; tam turlar eksik.",
            "Bu aile cos x=0 verir.",
            "Bu aile cos x=1 verir.",
            "Doğru: k=0 için π, k=1 için 3π; ikisi de cos=−1.",
          ],
          commonError: "Tanjantınπ periyodunu kosinüse taşıma.",
          check: "k=0 için π, k=1 için 3π; ikisi de cos=−1.",
        },
      },
      {
        prompt: "tan x=−1 denkleminin[0,2π) içindeki çözüm kümesi nedir?",
        options: [
          "{π/4,5π/4}",
          "{−π/4,3π/4}",
          "{π/2,3π/2}",
          "{3π/4}",
          "{3π/4,7π/4}",
        ],
        answer: 4,
        hint: "−π/4+kπ ailesini aralığa seç.",
        explanation:
          "k=1 için 3π/4, k=2 için 7π/4. Diğer k değerleri[0,2π) dışında kalır. İki açının sinüs/kosinüs oranı−1, cos sıfır değil.",
        guidance: {
          knowledge: [
            "Tanjantın periyodu π; negatif olduğu bölgeler II ve IV’tür.",
          ],
          strategy: "−π/4+kπ ailesini aralığa seç.",
          steps: [
            "k=1 için 3π/4, k=2 için 7π/4.",
            "Diğer k değerleri[0,2π) dışında kalır.",
          ],
          optionReasons: [
            "Bu iki açıda tanjant+1’dir.",
            "−π/4 verilen aralığın dışındadır.",
            "Bu noktalarda tanjant tanımsızdır.",
            "π periyotlu ikinci kök eksik.",
            "Doğru: İki açının sinüs/kosinüs oranı−1, cos sıfır değil.",
          ],
          commonError:
            "Negatif başlangıç kökünü aralık kontrolü yapmadan yazma.",
          check: "İki açının sinüs/kosinüs oranı−1, cos sıfır değil.",
        },
      },
      {
        prompt: "cot x=0 denkleminin[0,2π) içindeki çözümleri hangileridir?",
        options: ["{π/4,5π/4}", "{π/2,3π/2}", "∅", "{0,π}", "{π/2}"],
        answer: 1,
        hint: "Cos x=0 noktalarında sinüsü denetle.",
        explanation:
          "Cos x=0 ⇒x=π/2+kπ. Aralıkta π/2 ve 3π/2; sinüsleri±1. Her iki noktada 0/(±1)=0 tanımlıdır.",
        guidance: {
          knowledge: ["Cot x=cos x/sin x; pay 0, payda sıfır değil olmalı."],
          strategy: "Cos x=0 noktalarında sinüsü denetle.",
          steps: ["Cos x=0 ⇒x=π/2+kπ.", "Aralıkta π/2 ve 3π/2; sinüsleri±1."],
          optionReasons: [
            "Bu açılarda kotanjant 1 olur.",
            "Doğru: Her iki noktada 0/(±1)=0 tanımlıdır.",
            "Cos x sıfır, sin x sıfır değilken kotanjant 0 olabilir.",
            "Bu noktalarda kotanjant tanımsızdır.",
            "π periyotlu ikinci kök eksik.",
          ],
          commonError: "Cot x=0’dan tan x=1/0 yazma.",
          check: "Her iki noktada 0/(±1)=0 tanımlıdır.",
        },
      },
      {
        prompt: "sin2x=sin x denkleminin[0,2π) içinde kaç farklı kökü vardır?",
        options: ["3", "1", "4", "2", "5"],
        answer: 2,
        hint: "Sin x(2 cos x−1)=0 yaz.",
        explanation:
          "Sin x=0 kökleri 0,π. Cos x=1/2 kökleri π/3,5π/3; toplam 4. Dört kök ayrı ve 2π aralıkta değil.",
        guidance: {
          knowledge: ["Sin2x=2 sin x cos x; çarpım 0 iki dal verir."],
          strategy: "Sin x(2 cos x−1)=0 yaz.",
          steps: [
            "Sin x=0 kökleri 0,π.",
            "Cos x=1/2 kökleri π/3,5π/3; toplam 4.",
          ],
          optionReasons: [
            "Dört ayrı kökten biri unutulmuş.",
            "Bir temel açı bütün çözüm değildir.",
            "Doğru: Dört kök ayrı ve 2π aralıkta değil.",
            "Sin x=0 dalı ya da cos x=1/2 dalı atlanmış.",
            "Açık uç2π veya tekrar bir kök eklenmiş.",
          ],
          commonError: "Sin x’e bölüp 0 dalını kaybetme.",
          check: "Dört kök ayrı ve 2π aralıkta değil.",
        },
      },
      {
        prompt: "cos2x=cos x denkleminin[0,2π) içindeki çözüm kümesi nedir?",
        options: [
          "{0}",
          "{0,2π/3,4π/3}",
          "{π,2π/3,4π/3}",
          "{0,π/3,5π/3}",
          "{0,2π/3,4π/3,2π}",
        ],
        answer: 1,
        hint: "t=cos x ile 2t²−t−1=0 çöz.",
        explanation:
          "(2t+1)(t−1)=0 ⇒t=−1/2 veya 1. Aralıkta 2π/3,4π/3 ve 0. Cos değerleri−1/2 veya 1; başlangıç eşitliği sağlanır.",
        guidance: {
          knowledge: ["Cos2x=2 cos²x−1 dönüşümü ikinci derece denklem verir."],
          strategy: "t=cos x ile 2t²−t−1=0 çöz.",
          steps: ["(2t+1)(t−1)=0 ⇒t=−1/2 veya 1.", "Aralıkta 2π/3,4π/3 ve 0."],
          optionReasons: [
            "Cos x=−1/2 dalı kaybolmuş.",
            "Doğru: Cos değerleri−1/2 veya 1; başlangıç eşitliği sağlanır.",
            "π ilk eşitlikte 1=−1 üretir.",
            "Cos x=+1/2 yerine−1/2 gerekir.",
            "2π açık uçtur ve alınmaz.",
          ],
          commonError: "Bir kökün iki ailede görünmesini iki ayrı çözüm sayma.",
          check: "Cos değerleri−1/2 veya 1; başlangıç eşitliği sağlanır.",
        },
      },
      {
        prompt: "sin x+cos x=1 denkleminin[0,2π) içindeki çözüm kümesi nedir?",
        options: ["{0,π/2}", "∅", "{π,3π/2}", "{0,π/2,π,3π/2}", "{π/4}"],
        answer: 0,
        hint: "Karesinden sin2x=0 bul, sonra ilk toplamı dene.",
        explanation:
          "Adaylar 0,π/2,π,3π/2. İlk ikisinde toplam 1, son ikisinde−1. Sin0+cos0=1; sin(π/2)+cos(π/2)=1.",
        guidance: {
          knowledge: ["Kare alma aday üretir; geri kontrol zorunludur."],
          strategy: "Karesinden sin2x=0 bul, sonra ilk toplamı dene.",
          steps: [
            "Adaylar 0,π/2,π,3π/2.",
            "İlk ikisinde toplam 1, son ikisinde−1.",
          ],
          optionReasons: [
            "Doğru: Sin0+cos0=1; sin(π/2)+cos(π/2)=1.",
            "0 veπ/2 ilk eşitliği sağlar.",
            "Bu noktalarda toplam−1’dir.",
            "Kare almanın ürettiği−1 toplamlı sahte adaylar elenmedi.",
            "π/4’te toplam√2’dir.",
          ],
          commonError: "Karesi sağlanan bütün adayları asıl çözüm yazma.",
          check: "Sin0+cos0=1; sin(π/2)+cos(π/2)=1.",
        },
      },
      {
        prompt:
          "2 sin²x−3 sin x+1=0 denkleminin[0,2π) içinde kaç farklı kökü vardır?",
        options: ["3", "0", "2", "4", "1"],
        answer: 0,
        hint: "(2t−1)(t−1)=0 çarpanlarını çöz.",
        explanation:
          "t=1/2 kökleri π/6,5π/6. t=1 köküπ/2; toplam 3 farklı kök. Üç açının sinüsleri 1/2 veya 1; denklem sıfır olur.",
        guidance: {
          knowledge: ["t=sin x ve−1≤t≤1."],
          strategy: "(2t−1)(t−1)=0 çarpanlarını çöz.",
          steps: [
            "t=1/2 kökleri π/6,5π/6.",
            "t=1 köküπ/2; toplam 3 farklı kök.",
          ],
          optionReasons: [
            "Doğru: Üç açının sinüsleri 1/2 veya 1; denklem sıfır olur.",
            "İki cebirsel sinüs değeri de [−1,1] içindedir.",
            "Sin x=1 köküπ/2 unutulmuş.",
            "Sin x=1 için iki kez aynı kök sayılmış.",
            "Sin x=1/2 iki kök üretir.",
          ],
          commonError: "t değerlerini doğrudan x kökleri gibi sayma.",
          check: "Üç açının sinüsleri 1/2 veya 1; denklem sıfır olur.",
        },
      },
      {
        prompt:
          "sin(2x−π/6)=1/2 denkleminin[0,2π) içindeki kökleri hangileridir?",
        options: [
          "{π/6,π/2}",
          "{π/12,5π/12}",
          "{π/6,π/2,7π/6,3π/2}",
          "{0,π/2,π,3π/2}",
          "{π/3,π}",
        ],
        answer: 2,
        hint: "2x−π/6=π/6+2kπ veya 5π/6+2kπ yaz.",
        explanation:
          "x=π/6+kπ veya π/2+kπ. Her aileden k=0,1 aralığa girer. Dört iç açıπ/6 veya 5π/6 mod 2π’dir.",
        guidance: {
          knowledge: ["İç açının iki sinüs ailesi ayrı çözülür."],
          strategy: "2x−π/6=π/6+2kπ veya 5π/6+2kπ yaz.",
          steps: ["x=π/6+kπ veya π/2+kπ.", "Her aileden k=0,1 aralığa girer."],
          optionReasons: [
            "İç açının frekansı 2 olduğu için ikinci tur kökleri de vardır.",
            "İçteki−π/6 kayması taşınmadı.",
            "Doğru: Dört iç açıπ/6 veya 5π/6 mod 2π’dir.",
            "Birinci ailedekiπ/6 kayması yok sayıldı.",
            "İç açıdaki katsayı 2’ye bölünmedi.",
          ],
          commonError: "Tur terimini de 2’ye bölmeyi unutma.",
          check: "Dört iç açıπ/6 veya 5π/6 mod 2π’dir.",
        },
      },
      {
        prompt: "3 sin x+4 cos x=6 denkleminin gerçek çözüm sayısı nedir?",
        options: ["0", "4", "1", "2", "Sonsuz"],
        answer: 0,
        hint: "R=√(9+16) hesapla.",
        explanation:
          "R=5, sol taraf [−5,5] içinde. 6 aralıkta olmadığından çözüm yok. C²=36>25=a²+b²; varlık şartı sağlanmıyor.",
        guidance: {
          knowledge: ["a sin x+b cos x ifadesinin genliği√(a²+b²)."],
          strategy: "R=√(9+16) hesapla.",
          steps: [
            "R=5, sol taraf [−5,5] içinde.",
            "6 aralıkta olmadığından çözüm yok.",
          ],
          optionReasons: [
            "Doğru: C²=36>25=a²+b²; varlık şartı sağlanmıyor.",
            "Frekans veya tur sayımı var olmayan kök yaratamaz.",
            "Sağ taraf genlik sınırının dışındadır; teğet bir kök de yok.",
            "İki kesişim için sağ taraf [−5,5] içinde olmalı.",
            "Sol taraf sabit 6 değildir.",
          ],
          commonError: "3 ve 4’ün toplamı 7’yi ulaşılabilir genlik sanma.",
          check: "C²=36>25=a²+b²; varlık şartı sağlanmıyor.",
        },
      },
      {
        prompt: "sin x+cos x=√2 denkleminin[0,2π) içindeki kökü hangisidir?",
        options: ["π/4", "5π/4", "3π/4", "7π/4", "π/2"],
        answer: 0,
        hint: "Sin(x+π/4)=1 çöz.",
        explanation:
          "x+π/4=π/2+2kπ. x=π/4+2kπ; aralıkta yalnız π/4. Sinπ/4+cosπ/4=√2; iki kesişim tek maksimumda birleşir.",
        guidance: {
          knowledge: ["Sin x+cos x=√2 sin(x+π/4)."],
          strategy: "Sin(x+π/4)=1 çöz.",
          steps: ["x+π/4=π/2+2kπ.", "x=π/4+2kπ; aralıkta yalnız π/4."],
          optionReasons: [
            "Doğru: Sinπ/4+cosπ/4=√2; iki kesişim tek maksimumda birleşir.",
            "Toplam−√2 olur.",
            "Toplam bu açıda 0 olur.",
            "Toplam 0 olur.",
            "Toplam 1 olur.",
          ],
          commonError: "Genlik seviyesinde iki farklı kök olduğunu varsayma.",
          check: "Sinπ/4+cosπ/4=√2; iki kesişim tek maksimumda birleşir.",
        },
      },
      {
        prompt: "0·sin x+2 cos x=0 denkleminin[0,2π) içindeki kökleri nedir?",
        options: ["{π/2}", "{0,π}", "∅", "{π/2,3π/2}", "ℝ"],
        answer: 3,
        hint: "Denklemi 2 cos x=0 diye sadeleştir.",
        explanation:
          "Cos x=0 ⇒x=π/2+kπ. Aralıkta π/2 ve 3π/2. İki kökte 2 cos x=0 doğrudan sağlanır.",
        guidance: {
          knowledge: ["Sıfır katsayı özel durumu ilk denklemde çözülür."],
          strategy: "Denklemi 2 cos x=0 diye sadeleştir.",
          steps: ["Cos x=0 ⇒x=π/2+kπ.", "Aralıkta π/2 ve 3π/2."],
          optionReasons: [
            "π periyotlu ikinci sıfır eksik.",
            "Bu açılarda cos x=±1, denklem sıfır değil.",
            "Cos x’e bölmek tüm kökleri yasaklamıştır.",
            "Doğru: İki kökte 2 cos x=0 doğrudan sağlanır.",
            "2 cos x özdeş sıfır değildir.",
          ],
          commonError: "Cos x’e bölmeden önce onun sıfırlarını ayrı incele.",
          check: "İki kökte 2 cos x=0 doğrudan sağlanır.",
        },
      },
      {
        prompt:
          "sin x=0 denkleminin[0,2π] kapalı aralığında kaç farklı kökü vardır?",
        options: ["2", "1", "Sonsuz", "3", "4"],
        answer: 3,
        hint: "0≤kπ≤2π eşitsizliğini çöz.",
        explanation:
          "0≤k≤2, tam sayılar 0,1,2. Kökler 0,π,2π; üç farklı nokta. Üçü de kapalı aralığın içinde ve sinüsleri sıfır.",
        guidance: {
          knowledge: ["Sin x=0 ailesi x=kπ; uçların kapanışı önemlidir."],
          strategy: "0≤kπ≤2π eşitsizliğini çöz.",
          steps: [
            "0≤k≤2, tam sayılar 0,1,2.",
            "Kökler 0,π,2π; üç farklı nokta.",
          ],
          optionReasons: [
            "Kapalı sağ uç2π unutulmuş.",
            "π ve 2π kökleri eksik.",
            "Sınırlı aralıkta yalnız 0,π,2π vardır.",
            "Doğru: Üçü de kapalı aralığın içinde ve sinüsleri sıfır.",
            "Aralık dışı−π eklenmiş veya bir kök iki sayılmış.",
          ],
          commonError: "[0,2π) ile [0,2π] aralıklarını aynı sayma.",
          check: "Üçü de kapalı aralığın içinde ve sinüsleri sıfır.",
        },
      },
      {
        prompt: "sin x=2 denkleminin gerçek çözüm kümesi hangisidir?",
        options: ["{π/2}", "{2kπ:k∈ℤ}", "ℝ", "{2}", "∅"],
        answer: 4,
        hint: "Önce sağ tarafın değer aralığını denetle.",
        explanation:
          "2>1. Bu seviyede birim çember ordinatı bulunamaz. Değer aralığı sınırı cebirsel işlem yapmadan çözümü boş yapar.",
        guidance: {
          knowledge: ["Gerçek açının sinüsü[−1,1] aralığındadır."],
          strategy: "Önce sağ tarafın değer aralığını denetle.",
          steps: ["2>1.", "Bu seviyede birim çember ordinatı bulunamaz."],
          optionReasons: [
            "Sinπ/2=1; 2 değil.",
            "Bu noktalarda sinüs 0 olur.",
            "Sinüs sabit 2 değildir.",
            "x=2 radyanın sinüsü 2 olamaz.",
            "Doğru: Değer aralığı sınırı cebirsel işlem yapmadan çözümü boş yapar.",
          ],
          commonError: "Her gerçek sağ taraf için ters sinüs kullanılamaz.",
          check:
            "Değer aralığı sınırı cebirsel işlem yapmadan çözümü boş yapar.",
        },
      },
      {
        prompt: "tan2x=tan x denkleminin[0,2π) içindeki çözüm kümesi nedir?",
        options: ["{π/4,5π/4}", "{0,π}", "{0}", "{0,π/2,π,3π/2}", "ℝ"],
        answer: 1,
        hint: "2x=x+kπ yaz.",
        explanation:
          "x=kπ. Aralıkta 0 veπ; iki tanjant da bu noktalarda 0. x=π için tan2π=tanπ=0.",
        guidance: {
          knowledge: ["Tan u=tan v için u=v+kπ; başlangıç tanımları korunur."],
          strategy: "2x=x+kπ yaz.",
          steps: ["x=kπ.", "Aralıkta 0 veπ; iki tanjant da bu noktalarda 0."],
          optionReasons: [
            "Bu açılarda tan2x tanımsızdır.",
            "Doğru: x=π için tan2π=tanπ=0.",
            "π periyotlu ikinci geçerli kök eksik.",
            "π/2 ve 3π/2’de tan x tanımsızdır.",
            "Tanjantın birebir eşitliği her x için sağlanmaz.",
          ],
          commonError: "Tanım dışı tek π/2 noktalarını kök gibi ekleme.",
          check: "x=π için tan2π=tanπ=0.",
        },
      },
      {
        prompt: "cos x=0 denkleminin[−π,π) içindeki çözüm kümesi nedir?",
        options: [
          "{π/2,3π/2}",
          "{−π,0}",
          "{π/2}",
          "{−π/2,π/2}",
          "{−π/2,π/2,π}",
        ],
        answer: 3,
        hint: "Aileyi−π≤x<π eşitsizliğine seç.",
        explanation:
          "k=−1 için −π/2, k=0 için π/2. Başka tam sayı k bu aralığa girmez. İki kosinüs de 0 ve iki nokta verilen aralıktadır.",
        guidance: {
          knowledge: ["Cos x sıfırlarıπ/2+kπ biçimindedir."],
          strategy: "Aileyi−π≤x<π eşitsizliğine seç.",
          steps: [
            "k=−1 için −π/2, k=0 için π/2.",
            "Başka tam sayı k bu aralığa girmez.",
          ],
          optionReasons: [
            "3π/2 verilen aralığın dışındadır.",
            "Bu açılarda kosinüs−1 ve1’dir.",
            "Negatif aralıktaki simetrik kök eksik.",
            "Doğru: İki kosinüs de 0 ve iki nokta verilen aralıktadır.",
            "π açık uçtur; ayrıca cosπ sıfır değildir.",
          ],
          commonError:
            "Alışılmış[0,2π) listesini aralık değişmişken aynen kullanma.",
          check: "İki kosinüs de 0 ve iki nokta verilen aralıktadır.",
        },
      },
    ],
    source:
      "MEBİ AYT Matematik fiziksel 51–52; OGM AYT Trigonometri video notu 29–33 öğretim sayfaları temelinde özgün anlatım ve sorular. Sıfır katsayılar, bölmeyle kaybolan dallar ve açık/kapalı aralıklar açıkça ele alınır; grafikten okunan yaklaşık kökler tam çözüm ailesinden ayrı sunulur.",
  },
  {
    id: "ayt-logaritma",
    topic: "detail-472",
    title: "Logaritma: üssü ara, koşulu koru",
    minutes: 125,
    objectives: [
      "Üssü bilinmeyen bir işlemi tersinden oku",
      "Üç tanım koşulunu birlikte denetle",
      "İşlemi gerekçelendir; tanım koşullarını ve sonucu bağımsız denetle.",
    ],
    sections: [
      {
        title: "Üssü bilinmeyen bir işlemi tersinden oku",
        paragraphs: [
          "2³=8 bir sayı üretir; log₂8=3 ise 2’yi hangi kuvvete yükselttiğini sorar. Logaritma bir bölme veya kök işareti değil, üstel fonksiyonun tersidir. a>0, a≠1 ve b>0 için log_a b=c tam olarak a^c=b demektir.",
          "3^x=10 denkleminin tam sayı çözümü olmaması gerçek çözümü olmadığı anlamına gelmez. x=log₃10 diye tam bir sayı tanımlarız. Yaklaşık hesabı gerektiğinde doğal logaritma oranıyla buluruz; tam ifade ile ondalık yaklaşımın ne zaman istendiğini ayır.",
        ],
      },
      {
        title: "Üç tanım koşulunu birlikte denetle",
        paragraphs: [
          "Log_g(x) h(x) için g(x)>0, g(x)≠1, h(x)>0 koşullarının üçü de gerekir. Değişken yalnız logaritmanın içinde bulunmayabilir; tabanın değişmesi de ayrı yasaklar üretir. Log_(x−1)(x+2) örneğinde x>1 ve x≠2 birlikte uygulanır.",
          "Koşulları bulduktan sonra kesişim al. Log₂(x−3)+log₂(7−x) için x>3 ve x<7, yani 3<x<7 olur. Toplamı tek logaritmaya çevirip yalnız(x−3)(7−x)>0 yazmak bu örnekte aynı aralığı verse de her dönüşümde aynı sonucu vermeyebilir; başlangıç koşullarını sakla.",
        ],
      },
      {
        title: "Grafik tersliğin koordinat değişimidir",
        paragraphs: [
          "f(x)=a^x için(x, y) noktasını y=x doğrusuna göre yansıtınca(y, x) noktası logaritma grafiğine gider. Üstel fonksiyonun tanım kümesiℝ, görüntüsü(0,∞); tersinde bu iki küme yer değiştirir. Log_a1=0 ve log_a a=1 sabit dayanak noktalarıdır.",
          "a>1 iken logaritma artan,0<a<1 iken azalandır. Her iki durumda x=0 düşey yaklaşım sınırıdır ve logaritma 0’da tanımlı değildir. Etkileşimde tabanı değiştirip aynı x’in yüksekliğini ve ters üstel kontrolü izle; grafiğin y eksenini kestiğini varsayma.",
        ],
      },
      {
        title: "Onluk ve doğal logaritmayı ayır",
        paragraphs: [
          "Tabanı 10 olan log₁₀x çoğunlukla log x diye yazılır; bu kitap düzeyinde tabansız log gösterimini onluk kabul ederiz. ln x ise tabanı e olan doğal logaritmadır. e≈2,71828… sabit bir irrasyonel sayıdır; bir dizinin veya yuvarlanmış 2,7 sayısının kendisi değildir.",
          "Log1=ln1=0, log10=1, ln e=1 olur. e^y=x ileln x=y aynı ilişkiyi ters yönden anlatır. Hesap makinesindeki log ve ln tuşlarının farklı tabanı olması, taban değiştirme oranında aynı tuşu hem pay hem paydada kullanman gerektiğini açıklar.",
        ],
      },
      {
        title: "Çarpım kuralını üslerin toplamından türet",
        paragraphs: [
          "u=a^p ve v=a^q pozitif sayılar olsun. uv=a^(p+q) olduğundan log_a(uv)=p+q=log_a u+log_a v olur. Kuralın nedeni üslü ifadelerde çarpımın üsleri toplamasıdır; logaritma işareti bir toplamın içine dağıtılmaz.",
          "Log₂(8·4)=log₂8+log₂4=3+2=5. Buna karşılıklog₂(8+4)=log₂12,5’e eşit değildir. İki ifadede çarpım mı toplam mı bulunduğunu ilk satırda ayır. u ve v’nin pozitif olması, ayrı logaritmaların da tanımlı kalmasını sağlar.",
        ],
      },
      {
        title: "Bölüm ve kuvvet kurallarının alanını tut",
        paragraphs: [
          "Log_a(u/v)=log_a u−log_a v, u>0, v>0 koşulunda üslü bölüm kuralından gelir. u>0 ve r gerçek için log_a(u^r)=r log_a u yazılabilir. Sıfır veya negatif tabanlı gerçek kuvvetler için bu koşulları kendiliğinden genişletme.",
          "x≠0 için log_a(x²)=2 log_a|x| yazımı negatifi de kapsar; 2 log_a x ise yalnız x>0’da tanımlıdır. Örneğin x=−3 iken log₂9 vardır ama log₂(−3) yoktur. Bir kareyi log dışına çıkarırken mutlak değer gerekip gerekmediğini kontrol et.",
        ],
      },
      {
        title: "Taban değiştirmeyi aynı üs üzerinden gör",
        paragraphs: [
          "Log_a b=p demek b=a^p demektir. Her iki tarafın c tabanında logaritmasını alırsanlog_c b=p log_c a çıkar. a, c>0, a≠1, c≠1, b>0 koşulundalog_a b=log_c b/log_c a olur; payda sıfır değildir.",
          "Log₄8=ln8/ln4=(3ln2)/(2ln2)=3/2. Her logaritmanın tabanını 10’a çevirmek zorunda değilsin; ortak asal taban, işlemi daha açık yapabilir. Hesap makinesi kullanırken ln8/ln4 sırasını ters yazmak b ve a’nın rolünü değiştirir.",
        ],
      },
      {
        title: "Karşılıklı ve zincir logaritmaları sadeleştir",
        paragraphs: [
          "a, b>0 ve a, b≠1 için log_a b·log_b a=1 olur; bu nedenle biri diğerinin çarpmaya göre tersidir. Zincir çarpımda log_a b·log_b c=log_a c yazılabilir; arada taban olarak kullanılan b’nin 1 olmaması gerekir.",
          "Log₂3·log₃5·log₅8=log₂8=3 örneğinde orta logaritmalar taban değiştirme oranlarıyla sadeleşir. Bu bir toplam kuralı değildir; log₂3+log₃5 aynı yoldan sadeleşmez. Zincirin her halkasının baştan tanımlı olduğunu denetle.",
        ],
      },
      {
        title: "Taban ve içteki kuvvetleri birlikte dönüştür",
        paragraphs: [
          "a>0, a≠1, x>0 ve n≠0 ikenlog_(a^n)(x^m)=(m/n)log_a x yazılır. Tabanın kuvveti paydaya, için kuvveti paya gider. n=0 tabanı 1 yapacağı için daha işlem başlamadan yasaktır.",
          "Log₈16 için a=2, n=3, m=4 alınır; sonuç 4/3 olur. m=0 ise iç1 ve sonuç 0’dır; bu özel durum n=0 yasağını kaldırmaz. Kuvvetler negatif de olabilir; pozitif a ve x sayesinde gerçek kuvvetlerin tanımı korunur.",
        ],
      },
      {
        title: "Terslikte iki ayrı eşitliği oku",
        paragraphs: [
          "a^(log_a x)=x ifadesi x>0’da, log_a(a^t)=t ifadesi bütün gerçek t için geçerlidir. Birincisinde verilen sayı logaritmanın içidir; ikincisinde üstel işlem zaten pozitif bir sayı üretir. Bu nedenle iki eşitliğin başlangıç koşulları farklı görünür.",
          "a, b, c>0 ve b≠1 için a^(log_b c)=c^(log_b a) bağıntısı ortak tabanda üslerin çarpımından gelir. Örneğin 2^(log₃5) ile 5^(log₃2) aynı sayıdır. Bağıntı içindeki tabanlar yer değiştirirken logaritmanın tabanı b sabit kalır.",
        ],
      },
      {
        title: "Logaritmik denklemi koşullarla çöz",
        paragraphs: [
          "Log₂(x−1)=3 için önce x>1 yaz, sonra x−1=2³=8 ilex=9 bul. Log_a f(x)=log_a g(x) denkleminde taban uygun ve içler pozitifse birebirlik nedeniyle f(x)=g(x) olur. Bu son denklemin her kökü başlangıç koşulunu sağlamayabilir.",
          "Log₂(x−1)+log₂(x−3)=3 için x>3 şartı korunur. Çarpım(x−1)(x−3)=8 denklemi x=5 ve−1 adayları üretir; yalnız 5 kalır. İki negatif için çarpımın pozitif olması, iki ayrı logaritmayı tanımlı yapmaz.",
        ],
      },
      {
        title: "Logaritmanın değerine değişken de",
        paragraphs: [
          "Log₂x=t dönüşümünde x=2^t>0 ve t bütün gerçeklerde olabilir. (log₂x)²−3 log₂x+2=0 denklemi t²−3t+2=0 olur; t=1,2’denx=2,4 bulunur. t’yi x ile karıştırmadan her adımın değişkenini yaz.",
          "Denklemde log₂(x²) bulunuyorsa bunu doğrudan 2t diye yazmak x>0 varsayımı ister. Başlangıçta negatif x’e izin verilmişse mutlak değerli dönüşüm veya ayrı işaret incelemesi gerekir. Aynı log görünümünü gördüğün her yere koşulsuz bir t yapıştırma.",
        ],
      },
      {
        title: "Değişken taban ayrı bir yasak taşır",
        paragraphs: [
          "Log_x16=2 için x>0 ve x≠1 gerekir; üstel biçim x²=16 verir. Adaylar±4 arasından yalnız 4 uygun tabandır. İçin pozitifliği 16 ile zaten sağlanmıştır; tabanı çözüm sonunda kontrol etmeyi atlama.",
          "Log_(x−1)(x+3)=1 denkleminde x>1, x≠2 ve x+3>0 şartları vardır. İç ile tabanı eşitlemek x+3=x−1 gibi olanaksız bir eşitlik verir. Birebirlik, taban 1 olmadığı için kullanılır; taban 1’e özel bir logaritma değeri atanmaz.",
        ],
      },
      {
        title: "Eşitsizlikte artma veya azalma yönü seçer",
        paragraphs: [
          "a>1 ikenlog_a u≤log_a v eşitsizliği, u, v>0 koşuluyla u≤v demektir.0<a<1 iken aynı eşitsizlik u≥v olur. Bu yön değişimi, fonksiyonun sıralamayı ters çevirmesinden gelir; negatif sayıyla çarpma işlemi yapıldığı için değil.",
          "Log_(1/2)x>2 için x>0 ve x<(1/2)²=1/4 bulunur. Sonuç 0<x<1/4’tür. Negatif taban kullanmadan da logaritma değeri negatif olabilir; 0<a<1 tabanlı grafikte x>1 için değer negatiftir.",
        ],
      },
      {
        title: "Grafik dönüşümünde önce içi sıfır yapan sınırı bul",
        paragraphs: [
          "y=log_a(x−h)+k için x>h tanım koşulu, x=h düşey yaklaşım sınırı ve(h+1, k) dayanak noktası vardır. h yatay, k düşey kaydırmadır. Logaritmanın içindeki x−h ifadesi, açık tanım aralığının başlangıcını da taşır.",
          "Bu grafiğin tersi y=h+a^(x−k) biçimindedir. Noktanın koordinatlarını değiştirerek de kontrol edebilirsin. Düşey kaydırma tanım kümesini değiştirmez; yatay kaydırma değiştirir. Etkileşimde x≤h seçimi bir sayı üretmez, tanım dışını açıkça bildirir.",
        ],
      },
      {
        title: "Üstel büyümeyi zamanı arayarak çöz",
        paragraphs: [
          "Başlangıç miktarıN₀>0, sabit dönem çarpanıq>0 içinN(t)=N₀q^t modeli kurulur. Verilen N’ye kaç dönemde ulaşıldığını bulmak için t=log_q(N/N₀) kullanılır; q=1 ise sabit miktar özel durumudur ve bu logaritma biçimi kurulamaz.",
          "Yarılanma modelindeN(t)/N₀=(1/2)^(t/T) olur. Bir miktarın başlangıcın 1/8’ine inmesi üç yarılanma, yani 3T sürer. Modelin hangi miktarı ölçtüğü açık belirtilmeli; bir radyoaktif maddenin bozunma ürününe dair yanlış kimyasal adlar matematiksel modele eklenmemelidir.",
        ],
      },
      {
        title: "Logaritmik ölçek oranı ölçer",
        paragraphs: [
          "Tanımı verilmiş ses düzeyiL=10 log₁₀(I/I₀) modelinde I/I₀ boyutsuz ve pozitiftir. Şiddet 100 katına çıkarsa düzey 20 birim artar; ses düzeyinin 100 kat olması gerekmez. Bir örneğin logaritma modeli, koşulları verilmeden bütün ses veya deprem durumlarına genellenmez.",
          "Çalışmada önce oranı, sonra logaritmayı, sonra katsayıyı uygula. Nüfus veya faiz probleminde de dönem birimi ve yüzde artış q=1+r biçimi açık yazılır. Tarihsel olarak Napier’in logaritma çalışmaları ve Gelenbevi’nin cetvel açıklamaları uzun çarpımları toplama yoluyla kolaylaştıran aynı fikre bağlanır.",
        ],
      },
      {
        title: "Sonuçta üç farklı kontrol yap",
        paragraphs: [
          "Birinci kontrol tanımdır:taban pozitif mi,1’den farklı mı, iç pozitif mi? İkinci kontrol eşitliktir:bulunan sayı başlangıç üstel veya logaritmik denklemi sağlar mı? Üçüncü kontrol büyüklüktür:artan veya azalan tabana göre sonuç beklenen aralıkta mı?",
          "Örneğinlog₂10 sayısı 3 ile 4 arasındadır; çünkü 8<10<16. Log_(1/2)10 ise negatiftir; çünkütaban azalan ve10>1. Ondalık yaklaşımın basamak sayısı sorunun ihtiyacına göre seçilir; yaklaşık bir değer eşitlikte kesin sayıymış gibi kullanılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Değişken taban",
        prompt: "log_(x−1)(x+7)=2 denklemini çöz.",
        strategy: "Taban koşulunu yaz, sonra üstel biçime geç.",
        steps: [
          {
            label: "Adım 1",
            explanation: "x>1, x≠2 ve x+7>0.",
          },
          {
            label: "Adım 2",
            explanation: "x+7=(x−1)² ⇒x²−3x−6=0.",
          },
          {
            label: "Adım 3",
            explanation:
              "Adaylar(3±√33)/2; yalnız pozitif büyük aday x>1 sağlar.",
          },
        ],
        answer: "(3+√33)/2",
        check: "Seçilen taban pozitif ve1’den farklı; iç onun karesidir.",
        pitfall: "Negatif küçük adayı taban koşulu olmadan kabul etme.",
      },
      {
        title: "İki içi ayrı koru",
        prompt: "log₂(x−2)+log₂(x−4)=3.",
        strategy: "Önce x>4, sonra çarpım.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İki iç pozitif olduğundan x>4.",
          },
          {
            label: "Adım 2",
            explanation: "(x−2)(x−4)=8 ⇒x²−6x=0.",
          },
          {
            label: "Adım 3",
            explanation: "Adaylar0 ve6; yalnız6 koşula uyar.",
          },
        ],
        answer: "{6}",
        check: "log₂4+log₂2=3;0’da iki ayrı iç negatiftir.",
        pitfall:
          "Pozitif çarpımın iki içi de pozitif yaptığı varsayımını kurma.",
      },
      {
        title: "Azalan taban",
        prompt: "log_(1/3)(2x−1)≤−1.",
        strategy: "Tanım ve azalma yönünü beraber kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "2x−1>0 ⇒x>1/2.",
          },
          {
            label: "Adım 2",
            explanation: "Azalan tabanla 2x−1≥(1/3)^−1=3.",
          },
          {
            label: "Adım 3",
            explanation: "x≥2; tanım koşuluyla kesişim yine[2,∞).",
          },
        ],
        answer: "[2,∞)",
        check: "x=2’de log_(1/3)3=−1; eşitlik alınır.",
        pitfall: "Azalan logaritmada eşitsizlik yönünü aynı bırakma.",
      },
      {
        title: "Kuvvet ve taban",
        prompt: "log₉27·log₂5·log₅4 değerini bul.",
        strategy: "İlk çarpanı asal tabana, son ikisini zincire dönüştür.",
        steps: [
          {
            label: "Adım 1",
            explanation: "log₉27=3/2.",
          },
          {
            label: "Adım 2",
            explanation: "log₂5·log₅4=log₂4=2.",
          },
          {
            label: "Adım 3",
            explanation: "Çarpım(3/2)·2=3.",
          },
        ],
        answer: "3",
        check: "İki zincir tabanı da pozitif ve1’den farklıdır.",
        pitfall:
          "Toplam olmayan çarpımı tek tek yaklaşık hesaplayarak yuvarlama biriktirme.",
      },
      {
        title: "Logaritma değerini değişken yap",
        prompt: "(log₂x)²+log₂x−6=0.",
        strategy: "t=log₂x ve x>0.",
        steps: [
          {
            label: "Adım 1",
            explanation: "t²+t−6=(t+3)(t−2)=0.",
          },
          {
            label: "Adım 2",
            explanation: "t=−3 veya2.",
          },
          {
            label: "Adım 3",
            explanation: "x=2^−3=1/8 veya2²=4.",
          },
        ],
        answer: "{1/8,4}",
        check:
          "İki x de pozitiftir; logaritma değerleri−3 ve2 ilk denklemi sağlar.",
        pitfall: "Negatif t değerini negatif x diye eleme.",
      },
      {
        title: "Yarılanma zamanı",
        prompt:
          "Bir izleyici madde her 4 saatte yarıya düşüyor. Miktar başlangıcın 1/16’sı ne zaman olur?",
        strategy: "Miktar oranını dönem sayısına bağla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "N/N₀=(1/2)^(t/4).",
          },
          {
            label: "Adım 2",
            explanation: "1/16=(1/2)^4; üsler eşit:t/4=4.",
          },
          {
            label: "Adım 3",
            explanation: "t=16 saat.",
          },
        ],
        answer: "16 saat",
        check: "Dört yarılanma:1/2,1/4,1/8,1/16.",
        pitfall: "Dönem sayısı 4 ile saat sayısını aynı birim sanma.",
      },
    ],
    recall: [
      {
        prompt: "Logaritmanın üç tanım koşulu nedir?",
        answer: "Taban>0, taban≠1, iç>0.",
      },
      {
        prompt: "Log(x+y) neden logx+logy değildir?",
        answer:
          "Üslerin toplamı çarpıma karşılık gelir; logaritmada toplama dağılma kuralı yoktur.",
      },
      {
        prompt: "Log_a(x²) negatifi de kapsayarak nasıl yazılır?",
        answer: "x≠0 için 2 log_a|x|; 2 log_a x yalnızx>0’da.",
      },
      {
        prompt: "0<a<1 tabanında eşitsizlik yönü ne olur?",
        answer:
          "Artan iç değer daha küçük logaritma verir; iki iç karşılaştırılırken yön tersine döner.",
      },
    ],
    questions: [
      {
        prompt: "log₂(1/8) kaçtır?",
        options: ["3", "1/3", "−3", "0", "−1/3"],
        answer: 2,
        hint: "2^y=1/8 yaz.",
        explanation: "1/8=2^−3. Üs y=−3. 2^−3 pozitif 1/8’dir.",
        guidance: {
          knowledge: ["Logaritma, a’nın hangi üssünün içi verdiğini sorar."],
          strategy: "2^y=1/8 yaz.",
          steps: ["1/8=2^−3.", "Üs y=−3."],
          optionReasons: [
            "2³=8; verilen iç1/8’dir.",
            "Hem sıra hem işaret karıştı.",
            "Doğru: 2^−3 pozitif 1/8’dir.",
            "Sıfır sonuç yalnız iç1 için olur.",
            "Taban ile iç değiştirildi.",
          ],
          commonError: "Negatif log değerini negatif iç sanma.",
          check: "2^−3 pozitif 1/8’dir.",
        },
      },
      {
        prompt: "log_(x−1)(x+2) ifadesinin gerçek tanım kümesi nedir?",
        options: ["(2,∞)", "(1,2)∪(2,∞)", "(1,∞)", "(−2,∞)", "ℝ\\{2}"],
        answer: 1,
        hint: "x−1>0, x−1≠1, x+2>0 yaz.",
        explanation:
          "x>1 ve x≠2 elde edilir. İç koşulu x>−2 ile kesişim(1,2)∪(2,∞). Örneğin x=1,5 taban 0,5 ve iç3,5 ile tanımlıdır.",
        guidance: {
          knowledge: ["Değişken tabanda üç koşul birlikte sağlanır."],
          strategy: "x−1>0, x−1≠1, x+2>0 yaz.",
          steps: [
            "x>1 ve x≠2 elde edilir.",
            "İç koşulu x>−2 ile kesişim(1,2)∪(2,∞).",
          ],
          optionReasons: [
            "0<taban<1 aralığı gereksiz yere atlandı.",
            "Doğru: Örneğin x=1,5 taban 0,5 ve iç3,5 ile tanımlıdır.",
            "Tabanı 1 yapanx=2 çıkarılmadı.",
            "Yalnız iç koşulu yazılmış; taban koşulları eksik.",
            "Tabanın ve için pozitifliği yok sayıldı.",
          ],
          commonError: "Pozitif fakat 1’den küçük tabanı yasaklama.",
          check: "Örneğin x=1,5 taban 0,5 ve iç3,5 ile tanımlıdır.",
        },
      },
      {
        prompt: "log₂8+log₂4 kaçtır?",
        options: ["5", "6", "log₂12", "12", "7"],
        answer: 0,
        hint: "İki değeri 3 ve2 bul veya log₂32 yaz.",
        explanation: "log₂8=3, log₂4=2. Toplam 5. 2⁵=32=8·4.",
        guidance: {
          knowledge: [
            "Aynı tabanda logaritma toplamı çarpımın logaritmasıdır.",
          ],
          strategy: "İki değeri 3 ve2 bul veya log₂32 yaz.",
          steps: ["log₂8=3, log₂4=2.", "Toplam 5."],
          optionReasons: [
            "Doğru: 2⁵=32=8·4.",
            "3 ve2 değerlerinin çarpımı alındı.",
            "Toplam logaritma, toplam iç değil çarpım iç verir.",
            "İçlerin toplamı sonucu değildir.",
            "Logaritmaların değerleri yerine içleri yanlış işledin.",
          ],
          commonError: "Logaritmanın toplamın içine dağıldığını düşünme.",
          check: "2⁵=32=8·4.",
        },
      },
      {
        prompt: "log₄8 kaçtır?",
        options: ["2/3", "1/2", "3/2", "2", "3"],
        answer: 2,
        hint: "Tabanı ve içi 2 kuvveti yap.",
        explanation: "4^y=8 ⇒2^(2y)=2³. 2y=3 ⇒y=3/2. 4^(3/2)=√(4³)=8.",
        guidance: {
          knowledge: ["Log_(2²)(2³)=3/2."],
          strategy: "Tabanı ve içi 2 kuvveti yap.",
          steps: ["4^y=8 ⇒2^(2y)=2³.", "2y=3 ⇒y=3/2."],
          optionReasons: [
            "Taban değiştirme oranı ters yazıldı.",
            "4^(1/2)=2 olur.",
            "Doğru: 4^(3/2)=√(4³)=8.",
            "4²=16; 8 değil.",
            "2³=8 ama taban 4’tür.",
          ],
          commonError: "Üssün tabandaki 2 katsayısını atlama.",
          check: "4^(3/2)=√(4³)=8.",
        },
      },
      {
        prompt: "log₂3·log₃5·log₅8 kaçtır?",
        options: ["3", "1", "15", "2", "8"],
        answer: 0,
        hint: "Bütün logaritmaları ortak taban oranına çevir.",
        explanation:
          "(ln3/ln2)(ln5/ln3)(ln8/ln5)=ln8/ln2. log₂8=3. Ara ln3 ve ln5 pay/payda olarak gerçekten götürülür.",
        guidance: {
          knowledge: ["Zincir çarpımda ara tabanlar sadeleşir."],
          strategy: "Bütün logaritmaları ortak taban oranına çevir.",
          steps: ["(ln3/ln2)(ln5/ln3)(ln8/ln5)=ln8/ln2.", "log₂8=3."],
          optionReasons: [
            "Doğru: Ara ln3 ve ln5 pay/payda olarak gerçekten götürülür.",
            "Son iç8 ilk taban 2’ye eşit değildir.",
            "Ara içler çarpılmaz; taban oranları sadeleşir.",
            "8’in2 tabanındaki üssü 3’tür.",
            "Log₂8 henüz hesaplanmadı.",
          ],
          commonError: "Çarpımı logaritma toplamı gibi açma.",
          check: "Ara ln3 ve ln5 pay/payda olarak gerçekten götürülür.",
        },
      },
      {
        prompt: "x<0 iken log₂(x²) için hangisi doğrudur?",
        options: ["log₂x+2", "2 log₂|x|", "2 log₂x", "log₂(2x)", "(log₂x)²"],
        answer: 1,
        hint: "x²=|x|² ve |x|>0 yaz.",
        explanation:
          "log₂|x|²=2 log₂|x|. Bu x<0 için de tanımlıdır. x=−2 için iki taraf log₂4=2 verir.",
        guidance: {
          knowledge: [
            "Logaritma içini pozitif tutan mutlak değer kuvvet dönüşümünü genişletir.",
          ],
          strategy: "x²=|x|² ve |x|>0 yaz.",
          steps: ["log₂|x|²=2 log₂|x|.", "Bu x<0 için de tanımlıdır."],
          optionReasons: [
            "x negatif olduğu için ifade kurulamaz.",
            "Doğru: x=−2 için iki taraf log₂4=2 verir.",
            "x negatif olduğundan sağ taraf tanımsızdır.",
            "2x negatiftir ve log tanımsız olur.",
            "Sağ taraf tanımsız; kuvvet kuralı bu değildir.",
          ],
          commonError:
            "Kareyi dışarı çıkarırken logaritma içinin işaretini unutma.",
          check: "x=−2 için iki taraf log₂4=2 verir.",
        },
      },
      {
        prompt: "log₂(x−1)+log₂(x−3)=3 denkleminin gerçek çözüm kümesi nedir?",
        options: ["{3}", "{5}", "{−1}", "∅", "{−1,5}"],
        answer: 1,
        hint: "x>3; sonra(x−1)(x−3)=8.",
        explanation:
          "x²−4x−5=0 ⇒x=5 veya−1. Yalnız 5, x>3 koşulunu sağlar. log₂4+log₂2=2+1=3.",
        guidance: {
          knowledge: [
            "Önce iki logaritmanın içinin de pozitifliği denetlenir.",
          ],
          strategy: "x>3; sonra(x−1)(x−3)=8.",
          steps: ["x²−4x−5=0 ⇒x=5 veya−1.", "Yalnız 5, x>3 koşulunu sağlar."],
          optionReasons: [
            "İkinci iç 0 olduğundan tanımsız.",
            "Doğru: log₂4+log₂2=2+1=3.",
            "Tanım dışı aday seçilip geçerli 5 atılmış.",
            "5 başlangıç eşitliğini sağlar.",
            "−1’de iki ayrı logaritmanın içi negatiftir.",
          ],
          commonError:
            "Pozitif çarpımın ayrı negatif içlere de izin verdiğini unutma.",
          check: "log₂4+log₂2=2+1=3.",
        },
      },
      {
        prompt: "log_x16=2 denkleminin gerçek çözümü hangisidir?",
        options: ["4", "±4", "−4", "8", "2"],
        answer: 0,
        hint: "x²=16 yazıp adayları taban koşuluna seç.",
        explanation:
          "Cebirsel adaylar 4 ve−4. Pozitif uygun taban 4 kalır. 4²=16 ve 4≠1.",
        guidance: {
          knowledge: ["Taban x>0 ve x≠1 olmalıdır."],
          strategy: "x²=16 yazıp adayları taban koşuluna seç.",
          steps: ["Cebirsel adaylar 4 ve−4.", "Pozitif uygun taban 4 kalır."],
          optionReasons: [
            "Doğru: 4²=16 ve 4≠1.",
            "Cebirsel iki adaydan−4 taban şartını bozuyor.",
            "Negatif tabanlı gerçek logaritma yoktur.",
            "8²=64; 16 değil.",
            "2²=4; 16 değil.",
          ],
          commonError:
            "Logaritmanın içi 16 pozitif diye taban koşulunu atlama.",
          check: "4²=16 ve 4≠1.",
        },
      },
      {
        prompt: "log_(1/2)x>2 eşitsizliğinin çözüm kümesi nedir?",
        options: ["(1/4,∞)", "(0,4)", "(−∞,1/4)", "(0,1/4)", "[0,1/4]"],
        answer: 3,
        hint: "x>0 ve x<(1/2)² yaz.",
        explanation:
          "(1/2)²=1/4. İki koşulun kesişimi 0<x<1/4. x=1/8 için logaritma değeri 3>2; eşik 1/4’te2.",
        guidance: {
          knowledge: ["0<taban<1 iken logaritma azalandır."],
          strategy: "x>0 ve x<(1/2)² yaz.",
          steps: ["(1/2)²=1/4.", "İki koşulun kesişimi 0<x<1/4."],
          optionReasons: [
            "Azalan tabanda yön değiştirilmedi.",
            "(1/2)² yanlışlıkla 4 alındı.",
            "İç x>0 koşulu eksik.",
            "Doğru: x=1/8 için logaritma değeri 3>2; eşik 1/4’te2.",
            "0 tanımsız; 1/4’te eşitlik var,>sağlanmaz.",
          ],
          commonError: "Eşitsizlik yönünü artan taban gibi bırakma.",
          check: "x=1/8 için logaritma değeri 3>2; eşik 1/4’te2.",
        },
      },
      {
        prompt: "(log₃x)²−log₃x−6=0 denkleminin gerçek çözüm kümesi nedir?",
        options: ["{27}", "{−2,3}", "{−9,27}", "{9,27}", "{1/9,27}"],
        answer: 4,
        hint: "t²−t−6=0 çarpanlarını çöz.",
        explanation:
          "t=3 veya−2. x=27 veya 1/9; ikisi de pozitif. Log₃(1/9)=−2; log₃27=3.",
        guidance: {
          knowledge: ["t=log₃x dönüşümünden sonra x=3^t geri yazılır."],
          strategy: "t²−t−6=0 çarpanlarını çöz.",
          steps: ["t=3 veya−2.", "x=27 veya 1/9; ikisi de pozitif."],
          optionReasons: [
            "Negatif logaritma değeri de pozitif x üretir.",
            "Bunlar logaritma değerleridir; x değerleri değil.",
            "Logaritmanın içi negatif olamaz.",
            "Negatif logaritma değeri−2 için x=3^−2 olmalı.",
            "Doğru: Log₃(1/9)=−2; log₃27=3.",
          ],
          commonError: "Negatif t’yi tanım dışı x gibi eleme.",
          check: "Log₃(1/9)=−2; log₃27=3.",
        },
      },
      {
        prompt: "y=log₂(x−3)+1 fonksiyonunun tanım kümesi hangisidir?",
        options: ["[3,∞)", "ℝ", "(1,∞)", "(3,∞)", "(−3,∞)"],
        answer: 3,
        hint: "x−3>0 çöz.",
        explanation:
          "x>3. Dıştaki +1 bu aralığı değiştirmez. x=4 için iç 1 ve y=1; x=3 sınırı hariç.",
        guidance: {
          knowledge: [
            "Yatay kaydırma, logaritma içinin pozitiflik koşulunu değiştirir; düşey kaydırma bu alanı değiştirmez.",
          ],
          strategy: "x−3>0 çöz.",
          steps: ["x>3.", "Dıştaki +1 bu aralığı değiştirmez."],
          optionReasons: [
            "x=3’te logaritma içi 0 olur.",
            "Logaritma her gerçek iç için tanımlı değildir.",
            "Dışarıdaki +1 tanım sınırı değildir.",
            "Doğru: x=4 için iç 1 ve y=1; x=3 sınırı hariç.",
            "İçte x−3>0 koşulunun yönü yanlış.",
          ],
          commonError: "Grafiğin düşey kaymasını x koşuluna taşıma.",
          check: "x=4 için iç 1 ve y=1; x=3 sınırı hariç.",
        },
      },
      {
        prompt:
          "L=10 log₁₀(I/I₀) modelinde I100 katına çıkarsa L ne kadar artar?",
        options: ["10", "100", "2", "1000", "20"],
        answer: 4,
        hint: "I₂/I₁=100 yerine koy.",
        explanation:
          "10 log₁₀100=10·2. Artış 20 birimdir. Onluk logaritmada her 10 kat şiddet 10 birim; iki böyle dönem 20.",
        guidance: {
          knowledge: ["Fark L₂−L₁=10 log₁₀(I₂/I₁)."],
          strategy: "I₂/I₁=100 yerine koy.",
          steps: ["10 log₁₀100=10·2.", "Artış 20 birimdir."],
          optionReasons: [
            "Bu 10 kat şiddet artışının karşılığıdır.",
            "Logaritmik düzey ile şiddet oranı aynı değildir.",
            "Log100=2 ama dış 10 katsayısı var.",
            "Katsayı ile şiddet oranı doğrudan çarpılmaz.",
            "Doğru: Onluk logaritmada her 10 kat şiddet 10 birim; iki böyle dönem 20.",
          ],
          commonError:
            "Şiddetin yüz katına çıkmasını, düzeyin yüz katına çıkmasıyla karıştırma.",
          check:
            "Onluk logaritmada her 10 kat şiddet 10 birim; iki böyle dönem 20.",
        },
      },
    ],
    source:
      "MEBİ AYT Matematik fiziksel 53–63; OGM Üstel Fonksiyon video notu 4/6/12–16 gerçek öğretim sayfaları temelinde özgün anlatım ve sorular. e bir sabit sayı olarak açıklanır; radyoaktif bozunmadaki kaynak adlandırma hatası aktarılmaz. Matematiksel modelin dönem ve oran koşulları açık tutulur.",
  },
  {
    id: "ayt-diziler",
    topic: "detail-473",
    title: "Diziler: kuraldan terime, terimden toplama",
    minutes: 115,
    objectives: [
      "Dizi, sıralı bir fonksiyondur",
      "Bütün indislerde tanımlı olmayı kontrol et",
      "İşlemi gerekçelendir; tanım koşullarını ve sonucu bağımsız denetle.",
    ],
    sections: [
      {
        title: "Dizi, sıralı bir fonksiyondur",
        paragraphs: [
          "Gerçek sayı dizisi her pozitif tam sayı n’ye tek bir gerçek sayı a_n eşleyen fonksiyondur. İndis n sırayı, a_n ise o sıradaki değeri gösterir. a_n=2n−1 için üçüncü terim n=3 koyularak 5 bulunur; 3 terimin değeri değil sırasıdır.",
          "Dizinin noktaları(n, a_n) düzlemde ayrı ayrı bulunur; indisler arasında kalan 1,5 gibi sayılar bu tanımda girdi değildir. Bu yüzden diziyi bir eğriyle birleştirmek zorunlu değildir. Etkileşimde terimler ayrı noktalarla ve aynı sırayı koruyan tabloyla görünür.",
        ],
      },
      {
        title: "Bütün indislerde tanımlı olmayı kontrol et",
        paragraphs: [
          "a_n=(n+1)/(n−3) ifadesi n=3’te tanımsız olduğu için bütün pozitif tam sayılarda bir gerçek sayı dizisi tanımlamaz. Buna karşılık a_n=1/(n+3) her pozitif tam sayı için tanımlıdır. Karekök ve logaritma içeren genel terimlerde de her indisin koşulu denetlenir.",
          "Başlangıç indisi veya sonlu tanım kümesi ayrıca verilirse değerlendirme o kümede yapılır. n≥4 için tanımlanan farklı bir dizi aynı formülü kullanabilir; ama bu koşul soruda söylenmeden eklenemez. Birkaç ilk terimin tanımlı olması bütün indisleri güvenceye almaz.",
        ],
      },
      {
        title: "Sonlu, sabit ve eşit dizileri ayır",
        paragraphs: [
          "Tanım kümesi{1,2,…, N} olan sonlu dizinin N terimi vardır. a_n=c bütün indislerde aynıysa sabit dizidir. İki dizi eşit olmak için aynı tanım kümesindeki her n’de aynı değeri vermelidir; yalnız ilk iki terimin eşitliği yeterli değildir.",
          "Bir sonlu sayı listesi gösterilmesi onu anlamsız yapmaz; liste sonlu bir diziyi doğrudan tanımlayabilir. Sonsuz dizinin birkaç terimi ise devam kuralını tek başına belirlemez. 1,2,3 ile başlayan hem a_n=n hem de n+(n−1)(n−2)(n−3) kuralları ilk üçte eşleşip dördüncüde ayrılır.",
        ],
      },
      {
        title: "İndisi değiştirirken bütün n’leri değiştir",
        paragraphs: [
          "a_n=3n−2 için a_(n+1)=3(n+1)−2=3n+1 olur. a_(2n)=6n−2 iken 2a_n=6n−4’tür; indisi iki katlamak değeri iki katlamak değildir. Parantez bütün indis ifadesini kapsar.",
          "a_(n+2)−a_n gibi bir fark hesaplanırken önce iki genel terimi ayrı yaz. Bir terimin dizide bulunup bulunmadığını ararken a_n=k denkleminden çıkan n’nin pozitif tam sayı olması gerekir. Kesirli bir n, bu sırada bir terim olduğunu göstermez.",
        ],
      },
      {
        title: "İndirgeme başlangıç bilgisiyle çalışır",
        paragraphs: [
          "a_(n+1)=a_n+3 bağıntısı tek başına hangi diziyi verdiğini belirlemez; a_1 de bilinmelidir. a_1=2 verilince 2,5,8,11,… üretilebilir. İki önceki terimi kullanan a_n=a_(n−1)+a_(n−2) için iki başlangıç terimi gerekir.",
          "İndirgemeyi adım adım ilerletmek bazı sorularda kapalı genel terim aramaktan daha uygundur. Ancak istenen n çok büyükse özel yapıdan yararlanmak işe yarar. Etkileşimde başlangıçları değiştirince sonraki bütün terimlerin ve kısmi toplamın gerçekten değiştiğini izle.",
        ],
      },
      {
        title: "Aritmetik dizide ortak fark sabittir",
        paragraphs: [
          "a_(n+1)−a_n=d her n için aynıysa dizi aritmetiktir. İlk terimden n’nciye geçerken n−1 adım olduğundan a_n=a_1+(n−1)d bulunur. d pozitifse artan, negatifse azalan, sıfırsa sabit aritmetik dizi vardır.",
          "İlk terim 5, d=−2 için 5,3,1,−1,… elde edilir. Bir dizinin ilk birkaç farkının eşit görünmesi kural verilmedikçe bütün n’lerde aritmetik olduğunu kanıtlamaz. Genel terimden farkı hesaplarken a_(n+1)−a_n’nin gerçekten sabit olduğunu göster.",
        ],
      },
      {
        title: "İki terimden ortak farkı bul",
        paragraphs: [
          "Aritmetik dizide a_q−a_p=(q−p)d olur; q≠p ise d=(a_q−a_p)/(q−p). Paydaki terim sırası ile paydadaki indis sırası aynı olmalıdır. a_4=11, a_9=26 verilirse 5 adımda 15 artış vardır ve d=3 bulunur.",
          "Daha sonra herhangi bir referans terimle a_n=a_p+(n−p)d yazabilirsin; önce a_1’i bulmak zorunlu değildir. Bu örnekte a_12=11+8·3=35 olur. İndis farkını 1 eksik almak, aralığa konacak terim sayısıyla adım sayısını karıştırmaktır.",
        ],
      },
      {
        title: "Ortadaki terim ve eşit indis toplamı",
        paragraphs: [
          "Aritmetik dizide a_(n−k)+a_(n+k)=2a_n olur; iki uzaklık aynı olduğu için d katkıları birbirini götürür. Daha genel olarak p+q=r+s ise a_p+a_q=a_r+a_s bulunur. Eşit indis toplamı, eşit terim toplamına karşılık gelir.",
          "a ve b arasına p terim yerleştirilirse toplam p+2 terim ve p+1 adım vardır; ortak fark(b−a)/(p+1) olur. Araya 3 terim koyulan 2 ile 14 arasında fark 3’tür:2,5,8,11,14. Paydanın 3 değil 4 olması adımları saymaktan gelir.",
        ],
      },
      {
        title: "Aritmetik toplamı eşleştirerek türet",
        paragraphs: [
          "S_n=a_1+a_2+…+a_n toplamını ters sırayla bir daha yaz. Her sütun a_1+a_n olur ve n sütun vardır; 2S_n=n(a_1+a_n). Böylece S_n=n(a_1+a_n)/2 veya n[2a_1+(n−1)d]/2 bulunur.",
          "Bu formül n tekken de geçerlidir; ortadaki terim kendisiyle eşleşir ve iki toplamda iki kez sayılır. Negatif fark veya negatif terimler toplam formülünü bozmaz. Gerçek hayatta uzunluk veya para gibi ek koşullar varsa onların alanı ayrıca uygulanır.",
        ],
      },
      {
        title: "Toplamdan tek terime dön",
        paragraphs: [
          "İlk n terimin toplamı S_n biliniyorsa n≥2 için a_n=S_n−S_(n−1) olur. a_1=S_1 ayrı hesaplanır; S_0=0 tanımlanmışsa aynı ifade n=1’de de kullanılabilir. Toplamın formülü doğrudan terimin formülü değildir.",
          "S_n=n²+2n için S_1=3; fark alınca a_n=2n+1 çıkar ve ilk terimde de3 verir. Genel S_n ifadesi n=0’da0 vermiyorsa a_1 için otomatik fark kuralı kullanmak hata doğurabilir. Başlangıç satırını her zaman kontrol et.",
        ],
      },
      {
        title: "Geometrik dizide çarpan sabittir",
        paragraphs: [
          "Sıfır olmayan ardışık terimlerde a_(n+1)/a_n=r sabitse geometrik dizi vardır ve a_n=a_1r^(n−1) olur. Bu kez adımlar toplama değil çarpmadır. r negatifse işaretler dönüşümlü olabilir; r=1 sabit bir dizi verir.",
          "Tekrarlı çarpım a_(n+1)=r a_n yazımı sıfır terimlerle de bir örüntü üretir; ancak a_n=0 olan yerde oran tanımı 0/0 yapılamaz. Etkileşim sıfır seçimini ayrıca bildirir; oran bulunamayan durumu yanlışlıkla tek bir r kanıtı saymaz.",
        ],
      },
      {
        title: "Geometrik terimler arasında oran kur",
        paragraphs: [
          "Sıfır olmayan a_p için a_q/a_p=r^(q−p) bulunur. İndis farkı çiftse r’nin pozitif veya negatif oluşu yalnız bu oranla belirlenmeyebilir. a_1=2, a_3=18 verilince r²=9 olduğundan hem 3 hem−3 mümkündür.",
          "Pozitif terimli dizi koşulu eklenirse negatif r seçimi elenir. Bir ara terim için a_n²=a_(n−k)a_(n+k) bağıntısı vardır; pozitif karekökü seçmek bütün geometrik dizilerde doğru değildir. Negatif orta terim de aynı çarpımın karesini verebilir.",
        ],
      },
      {
        title: "Geometrik toplamda r=1’i ayır",
        paragraphs: [
          "S_n=a_1+a_1r+…+a_1r^(n−1) yazıp rS_n ile çıkarınca(1−r)S_n=a_1(1−r^n) bulunur. r≠1 ise S_n=a_1(1−r^n)/(1−r). r=1 olduğunda bu bölme kurulmaz; toplam doğrudan n a_1’dir.",
          "Formül negatif r için de geçerlidir; ardışık terimler birbirini kısmen götürebilir. İlk n terim toplamı ile sonsuz toplam farklı kavramlardır. |r|<1 için uygun geometrik serinin sonsuz toplamı a_1/(1−r) bir ileri bağlantıdır; sonlu S_n’de r^n terimini gerekçesiz atma.",
        ],
      },
      {
        title: "Sigma gösterimi ve indisi kaydırma",
        paragraphs: [
          "Σ_(k=1)^n a_k, ilk n terimin toplamıdır; k bağlı indisin adı olup başka bir harfle değiştirilebilir. Σ_(k=3)^7 (2k+1) toplamında beş terim vardır; üst sınırı 7 görüp yedi terim sanma. Başlangıç ve bitiş birlikte okunur.",
          "Toplamları ayırırken bütün terim sayısını koru:Σ(2k+3)=2Σk+3n, yalnız alt sınır 1 ise. Alt sınır m olduğunda sabit 3’ün katkısı 3(n−m+1) olur. Bir indis değişimi, sınırların da aynı dönüşümle değiştirilmesini gerektirir.",
        ],
      },
      {
        title: "Fibonacci ve üçgensel sayılar farklı kurallardır",
        paragraphs: [
          "Fibonacci dizisinde a_1=a_2=1, a_n=a_(n−1)+a_(n−2) tanımı 1,1,2,3,5,8,… üretir. Bu dizi sabit farkla veya sabit çarpanla ilerlemez. Gerçek tavşan nüfusu yerine, başlangıç ve üreme varsayımları verilmiş bir öğretim modeli olarak ele alınır.",
          "Üçgensel sayılarda T_n=1+2+…+n=n(n+1)/2 olur ve T_n−T_(n−1)=n’dir. İki ardışık üçgensel sayının toplamı T_(n−1)+T_n=n² eder. Noktaları satır satır ekleyip formülü tekrar kurmak, kuralın yalnız ezberlenmiş bir kesir olmadığını gösterir.",
        ],
      },
      {
        title: "Bir problemde terim ile birikimi ayır",
        paragraphs: [
          "Her sıraya 3 koltuk eklenen bir salonda son sıranın koltuğu a_n, toplam koltuk sayısı S_n’dir. Her yıl yüzde 10 büyüyen bir miktarda dönem çarpanı 1,1 olur; dönem sonunda ölçülen miktar ile yılların toplamı aynı değildir. Zaman başlangıcının n=0mı n=1mi olduğunu açık yaz.",
          "Sonuçta indis pozitif tam sayı mı, terim kuralı verilen bütün sırada geçerli mi, toplam gerçekten istenen terimleri içeriyor mu sorularını sor. Birkaç örnekle kural keşfetmek başlangıçtır; genel bağıntı veya verilen koşul o kuralı doğrulamalıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "İki terimden doğrudan hedefe",
        prompt: "Aritmetik dizide a_3=8,a_8=18. a_11?",
        strategy: "İndis farkından d bul; referans a_3’te kal.",
        steps: [
          {
            label: "Adım 1",
            explanation: "d=(18−8)/(8−3)=2.",
          },
          {
            label: "Adım 2",
            explanation: "a_11=a_3+(11−3)d.",
          },
          {
            label: "Adım 3",
            explanation: "8+8·2=24.",
          },
        ],
        answer: "24",
        check: "a_8=8+5·2=18 geri elde edilir.",
        pitfall: "Paydada terim değil adım sayısını kullan.",
      },
      {
        title: "Araya terim yerleştir",
        prompt:
          "−1 ile19 arasına dört terim konup aritmetik dizi kuruluyor. İç terimler?",
        strategy: "Altı toplam terim, beş geçiş.",
        steps: [
          {
            label: "Adım 1",
            explanation: "d=(19−(−1))/(4+1)=4.",
          },
          {
            label: "Adım 2",
            explanation: "İç terimler3,7,11,15.",
          },
          {
            label: "Adım 3",
            explanation: "Dizi−1,3,7,11,15,19.",
          },
        ],
        answer: "3,7,11,15",
        check: "Beş farkın hepsi4 ve son nokta19.",
        pitfall: "Paydada dört yerine beş geçiş bulunur.",
      },
      {
        title: "Sıra sayısı ve toplam",
        prompt: "İlk sırada9 koltuk, her sırada3 artış;10 sırada toplam?",
        strategy: "Önce son sıra, sonra eşleştirme toplamı.",
        steps: [
          {
            label: "Adım 1",
            explanation: "a_10=9+9·3=36.",
          },
          {
            label: "Adım 2",
            explanation: "S_10=10(9+36)/2.",
          },
          {
            label: "Adım 3",
            explanation: "Toplam225 koltuk.",
          },
        ],
        answer: "225",
        check: "Ortalama sıra22,5 koltuk; on sıranın toplamı225.",
        pitfall: "Son sıranın36 koltuğunu toplam sanma.",
      },
      {
        title: "İşaret seçimi",
        prompt: "Geometrik dizide a_1=3,a_3=48. a_2 hangi değerleri alabilir?",
        strategy: "r² oranını çöz; pozitif terim şartı yok.",
        steps: [
          {
            label: "Adım 1",
            explanation: "r²=48/3=16.",
          },
          {
            label: "Adım 2",
            explanation: "r=4 veya−4.",
          },
          {
            label: "Adım 3",
            explanation: "a_2=3r=12 veya−12.",
          },
        ],
        answer: "{−12,12}",
        check: "3,12,48 ve3,−12,48 dizileri aynı ilk ve üçüncü koşulu sağlar.",
        pitfall: "Orta terimin karesinden yalnız pozitif kökü alma.",
      },
      {
        title: "Özel ortak çarpan",
        prompt: "İlk terim9,r=1; ilk12 terim toplamı?",
        strategy: "Geometrik bölümde0/0 yerine sabit diziyi kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Bütün terimler9.",
          },
          {
            label: "Adım 2",
            explanation: "S_12=12·9.",
          },
          {
            label: "Adım 3",
            explanation: "Toplam108.",
          },
        ],
        answer: "108",
        check: "Genel bölüm0/0 verir; özel durum doğrudan hesaplandı.",
        pitfall: "r=1 için paydası1−r olan ifadeyi kullanma.",
      },
      {
        title: "Toplamdan terime",
        prompt: "S_n=2n²−n. a_6?",
        strategy: "S_6−S_5 hesapla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "S_6=72−6=66.",
          },
          {
            label: "Adım 2",
            explanation: "S_5=50−5=45.",
          },
          {
            label: "Adım 3",
            explanation: "a_6=66−45=21.",
          },
        ],
        answer: "21",
        check: "Genel fark4n−3; n=6 için yine21.",
        pitfall: "S_6 olan66’yı altıncı terim sanma.",
      },
    ],
    recall: [
      {
        prompt: "Aritmetik dizide n’nci terime kaç adım vardır?",
        answer: "İlk terimden n−1 adım; a_n=a_1+(n−1)d.",
      },
      {
        prompt:
          "Pozitif terim şartı olmadan geometrik orta terim neden tek olmayabilir?",
        answer:
          "Ortadaki terimin karesi belirlenir; pozitif ve negatif kökler mümkün olabilir.",
      },
      {
        prompt: "S_n verilince tek terim nasıl bulunur?",
        answer: "n≥2 içinS_n−S_(n−1); a_1=S_1 ayrıca kontrol edilir.",
      },
      {
        prompt: "Üç terim sonsuz diziyi tek başına belirler mi?",
        answer: "Hayır; aynı başlangıcı veren farklı genel kurallar vardır.",
      },
    ],
    questions: [
      {
        prompt: "a_n=3n−2 dizisinin a_5 terimi kaçtır?",
        options: ["3", "11", "5", "15", "13"],
        answer: 4,
        hint: "Formülde bütün n’ler yerine 5 yaz.",
        explanation:
          "3·5−2. 15−2=13. n=1 için 1; beşinci sıraya kadar 3 artışla 13.",
        guidance: {
          knowledge: ["a_n, verilen indisin fonksiyon değeridir."],
          strategy: "Formülde bütün n’ler yerine 5 yaz.",
          steps: ["3·5−2.", "15−2=13."],
          optionReasons: [
            "Katsayı terim yerine sayılmış.",
            "n=5 yerine 4 koyuldu.",
            "Bu indis; terim değeri değildir.",
            "−2 sabit terimi atlandı.",
            "Doğru: n=1 için 1; beşinci sıraya kadar 3 artışla 13.",
          ],
          commonError: "İndis ile değeri aynı sayı sanma.",
          check: "n=1 için 1; beşinci sıraya kadar 3 artışla 13.",
        },
      },
      {
        prompt:
          "Hangisi bütün pozitif tam sayılarda gerçek sayı dizisi tanımlar?",
        options: [
          "a_n=log₂(n−1)",
          "a_n=1/(n+3)",
          "a_n=1/(n−3)",
          "a_n=√(n−2)",
          "a_n=1/(2n−4)",
        ],
        answer: 1,
        hint: "Yasak payda, kök ve logaritma koşullarını ara.",
        explanation:
          "n+3≥4 olduğundan payda her indiste pozitiftir. Diğer ifadeler pozitif tam sayı indislerden en az birinde tanımsızdır. n her pozitif tam sayı iken 1/(n+3) gerçektir.",
        guidance: {
          knowledge: [
            "Bir gerçek dizi tüm verilen indislerde tanımlı olmalıdır.",
          ],
          strategy: "Yasak payda, kök ve logaritma koşullarını ara.",
          steps: [
            "n+3≥4 olduğundan payda her indiste pozitiftir.",
            "Diğer ifadeler pozitif tam sayı indislerden en az birinde tanımsızdır.",
          ],
          optionReasons: [
            "n=1 için logaritma içi 0 olur.",
            "Doğru: n her pozitif tam sayı iken 1/(n+3) gerçektir.",
            "n=3 paydayı sıfır yapar.",
            "n=1 için kökün içi negatiftir.",
            "n=2 paydayı sıfır yapar.",
          ],
          commonError: "Yalnız ilk uygun terime bakarak bütün diziyi onaylama.",
          check: "n her pozitif tam sayı iken 1/(n+3) gerçektir.",
        },
      },
      {
        prompt: "Aritmetik dizide a_4=11, a_9=26 ise ortak fark kaçtır?",
        options: ["15", "5", "15/4", "−3", "3"],
        answer: 4,
        hint: "(26−11)/(9−4)hesapla.",
        explanation: "Terim farkı 15, indis farkı 5. d=15/5=3. 11+5·3=26.",
        guidance: {
          knowledge: ["a_q−a_p=(q−p)d."],
          strategy: "(26−11)/(9−4)hesapla.",
          steps: ["Terim farkı 15, indis farkı 5.", "d=15/5=3."],
          optionReasons: [
            "Terim farkı beş adımda birikmiştir.",
            "İndis farkı, ortak fark değildir.",
            "Aradaki terim sayısı ile adım sayısı karıştı.",
            "Pay ve payda aynı sırada çıkarılmadı.",
            "Doğru: 11+5·3=26.",
          ],
          commonError: "Dört ara terim olsa da beş geçiş vardır.",
          check: "11+5·3=26.",
        },
      },
      {
        prompt: "a_1=5, d=−2 aritmetik dizisinde a_7 kaçtır?",
        options: ["−2", "17", "−9", "−7", "7"],
        answer: 3,
        hint: "Altı geçiş hesapla.",
        explanation: "a_7=5+6·(−2). 5−12=−7. 5,3,1,−1,−3,−5,−7.",
        guidance: {
          knowledge: ["a_n=a_1+(n−1)d."],
          strategy: "Altı geçiş hesapla.",
          steps: ["a_7=5+6·(−2).", "5−12=−7."],
          optionReasons: [
            "Ortak farkın kendisi terime karıştırıldı.",
            "Artış gibi pozitif fark kullanıldı.",
            "n−1 yerine n adım kullanıldı.",
            "Doğru: 5,3,1,−1,−3,−5,−7.",
            "Ortak farkın işareti kayboldu.",
          ],
          commonError: "İlk terimden yedinciye altı adım vardır.",
          check: "5,3,1,−1,−3,−5,−7.",
        },
      },
      {
        prompt:
          "2 ile 14 arasına aritmetik dizi oluşturacak 3 terim konuluyor. Ortak fark kaçtır?",
        options: ["3", "2", "12", "4", "6"],
        answer: 0,
        hint: "Toplam dört geçiş say.",
        explanation: "d=(14−2)/4. d=3. 2,5,8,11,14 hedefleri sağlar.",
        guidance: {
          knowledge: ["Araya p terim konursa p+1 geçiş vardır."],
          strategy: "Toplam dört geçiş say.",
          steps: ["d=(14−2)/4.", "d=3."],
          optionReasons: [
            "Doğru: 2,5,8,11,14 hedefleri sağlar.",
            "Son hedef olan 14 sağlanmıyor.",
            "Toplam fark geçiş sayısına bölünmedi.",
            "Toplam fark yalnız üçe bölündü.",
            "İki geçiş varsayıldı.",
          ],
          commonError: "Ara terim sayısı geçiş sayısı değildir.",
          check: "2,5,8,11,14 hedefleri sağlar.",
        },
      },
      {
        prompt:
          "İlk terimi 8, ortak farkı 2 olan aritmetik dizinin ilk 12 terim toplamı kaçtır?",
        options: ["456", "240", "228", "30", "114"],
        answer: 2,
        hint: "Önce a_12 değerini, sonra toplamı bul.",
        explanation:
          "a_12=8+11·2=30. S_12=12·38/2=228. Ortalama terim 19; 12·19=228.",
        guidance: {
          knowledge: ["S_n=n(a_1+a_n)/2."],
          strategy: "Önce a_12 değerini, sonra toplamı bul.",
          steps: ["a_12=8+11·2=30.", "S_12=12·38/2=228."],
          optionReasons: [
            "İkiye bölme faktörü unutuldu.",
            "a_12 hesabından−1 adım unutuldu.",
            "Doğru: Ortalama terim 19; 12·19=228.",
            "Bu 12. terim; toplam değil.",
            "Toplam formülü iki kez ikiye bölündü.",
          ],
          commonError: "Son terim ile birikmiş toplamı ayır.",
          check: "Ortalama terim 19; 12·19=228.",
        },
      },
      {
        prompt: "S_n=n²+2n ise a_5 kaçtır?",
        options: ["10", "11", "7", "35", "24"],
        answer: 1,
        hint: "S_5−S_4 yaz.",
        explanation:
          "S_5=35, S_4=24. a_5=11. Genel fark a_n=2n+1; beşinci terim 11.",
        guidance: {
          knowledge: ["Tek terim ardışık iki ilk toplamın farkıdır."],
          strategy: "S_5−S_4 yaz.",
          steps: ["S_5=35, S_4=24.", "a_5=11."],
          optionReasons: [
            "2n terimine geçerken +1 sabiti atlandı.",
            "Doğru: Genel fark a_n=2n+1; beşinci terim 11.",
            "Fark alırken önceki indis bütün yerlerde 4 olmadı.",
            "Bu S_5 toplamıdır.",
            "Bu S_4 toplamıdır.",
          ],
          commonError: "Toplam formülünü terim formülü gibi kullanma.",
          check: "Genel fark a_n=2n+1; beşinci terim 11.",
        },
      },
      {
        prompt:
          "Geometrik dizide a_1=2, a_3=18; pozitiflik şartı yok. a_2 hangi kümeden seçilir?",
        options: ["{−6}", "{6}", "{−6,6}", "{9}", "{−3,3}"],
        answer: 2,
        hint: "a_2²=36 çöz.",
        explanation:
          "Kökler±6. Her ikisi ilk ve üçüncü terim koşuluyla uyumludur. 2, 6, 18 için r=3; 2, −6, 18 için r=−3.",
        guidance: {
          knowledge: ["a_2²=a_1a_3; işaret koşulu gereklidir."],
          strategy: "a_2²=36 çöz.",
          steps: [
            "Kökler±6.",
            "Her ikisi ilk ve üçüncü terim koşuluyla uyumludur.",
          ],
          optionReasons: [
            "Pozitif olasılık atıldı.",
            "Negatif orta terim olasılığı atıldı.",
            "Doğru: 2, 6, 18 için r=3; 2, −6, 18 için r=−3.",
            "r² oranı a_2 sanıldı.",
            "Bunlar r değerleridir; ikinci terim 2r olur.",
          ],
          commonError: "Pozitif dizi şartı yokken negatif dalı unutma.",
          check: "2, 6, 18 için r=3; 2, −6, 18 için r=−3.",
        },
      },
      {
        prompt: "a_1=3, r=2 geometrik dizisinin a_6 terimi kaçtır?",
        options: ["96", "192", "18", "48", "63"],
        answer: 0,
        hint: "3·2⁵ yaz.",
        explanation: "2⁵=32. 3·32=96. 3,6,12,24,48,96.",
        guidance: {
          knowledge: ["a_n=a_1r^(n−1)."],
          strategy: "3·2⁵ yaz.",
          steps: ["2⁵=32.", "3·32=96."],
          optionReasons: [
            "Doğru: 3,6,12,24,48,96.",
            "n−1 yerine n kuvveti alındı.",
            "Geometrik kural yerine indisle çarpıldı.",
            "Yalnız dört çarpım yapıldı.",
            "Toplam ile terim karıştırıldı.",
          ],
          commonError: "Birinci terim r⁰ ile başlar.",
          check: "3,6,12,24,48,96.",
        },
      },
      {
        prompt: "a_1=2, r=3 geometrik dizisinin ilk 4 terim toplamı kaçtır?",
        options: ["54", "80", "40", "81", "26"],
        answer: 1,
        hint: "2(3⁴−1)/(3−1)kur.",
        explanation: "2·80/2. S_4=80. 2+6+18+54=80.",
        guidance: {
          knowledge: ["r≠1 içinS_n=a_1(r^n−1)/(r−1)."],
          strategy: "2(3⁴−1)/(3−1)kur.",
          steps: ["2·80/2.", "S_4=80."],
          optionReasons: [
            "Yalnız son terim hesaplandı.",
            "Doğru: 2+6+18+54=80.",
            "Sonuç fazladan ikiye bölündü.",
            "Yalnız r⁴ yazılıp ilk terim ve payda unutuldu.",
            "Üç terim toplandı; dördüncü eksik.",
          ],
          commonError: "Aritmetik toplam formülünü geometrik diziye taşıma.",
          check: "2+6+18+54=80.",
        },
      },
      {
        prompt:
          "İlk terim 7, r=1 olan geometrik dizinin ilk 15 terim toplamı kaçtır?",
        options: ["105", "Tanımsız", "7", "15", "0"],
        answer: 0,
        hint: "On beş kez 7 topla.",
        explanation: "S_15=15·7. 105. Bütün terimler 7; doğrudan toplama 105.",
        guidance: {
          knowledge: ["r=1 sabit dizi üretir."],
          strategy: "On beş kez 7 topla.",
          steps: ["S_15=15·7.", "105."],
          optionReasons: [
            "Doğru: Bütün terimler 7; doğrudan toplama 105.",
            "Dizi ve toplam tanımlı; yalnız özel bölüm formülü kullanılamaz.",
            "Tek terim toplam yerine alındı.",
            "Terim sayısı, değer toplamı değildir.",
            "Genel formüldeki pay 0 olduğu için oran 0 sayılmış; payda da 0’dır.",
          ],
          commonError:
            "0/0 yazan bir formülün asıl sonlu sayı toplamını tanımsız yaptığını sanma.",
          check: "Bütün terimler 7; doğrudan toplama 105.",
        },
      },
      {
        prompt:
          "Fibonacci dizisinde a_1=a_2=1 ve a_n=a_(n−1)+a_(n−2). a_7 kaçtır?",
        options: ["21", "7", "12", "13", "8"],
        answer: 3,
        hint: "1, 1 ile başlayıp sırayı tut.",
        explanation:
          "a_3=2, a_4=3, a_5=5, a_6=8. a_7=5+8=13. Yedi terim: 1, 1, 2, 3, 5, 8, 13.",
        guidance: {
          knowledge: ["Önceki iki terimin toplamı gerekir."],
          strategy: "1, 1 ile başlayıp sırayı tut.",
          steps: ["a_3=2, a_4=3, a_5=5, a_6=8.", "a_7=5+8=13."],
          optionReasons: [
            "Bu sekizinci terimdir.",
            "İndis değer gibi alındı.",
            "Her adımda sabit artış yapılmış.",
            "Doğru: Yedi terim: 1, 1, 2, 3, 5, 8, 13.",
            "Bu altıncı terimdir.",
          ],
          commonError: "İki başlangıç terimini tek terim gibi sayma.",
          check: "Yedi terim: 1, 1, 2, 3, 5, 8, 13.",
        },
      },
    ],
    source:
      "MEBİ AYT Matematik fiziksel 64–69; OGM Diziler video notu 1–5/12/14–15/20–21/25/27–28 gerçek öğretim sayfaları temelinde özgün anlatım ve sorular. Sıfır terimlerde oran belirsizliği, negatif orta terim, başlangıç indisi ve önekten kuralın tek belirlenmemesi açıklanır; kaynak genellemeleri aktarılmaz.",
  },
  {
    id: "ayt-limit-sureklilik",
    topic: "detail-474",
    title: "Limit ve süreklilik: yaklaşımı değerden ayır",
    minutes: 140,
    objectives: [
      "Bir noktaya yaklaşmak o noktada durmak değildir",
      "Soldan ve sağdan yaklaşımı sırala",
      "İşlemi gerekçelendir; tanım koşullarını ve sonucu bağımsız denetle.",
    ],
    sections: [
      {
        title: "Bir noktaya yaklaşmak o noktada durmak değildir",
        paragraphs: [
          "x sayısını a’ya yaklaştırırken x≠a değerlerindeki f(x) davranışını inceleriz. Örneğin f(x)=x+2 için x,3’e iki yandan yaklaşırken değerler 5’e yaklaşır. Limitin konusu çevredeki davranıştır; f(3) değerini ayrıca değiştirmek bu yaklaşımı tek başına değiştirmez.",
          "Limitte görülen oklar x’in hangi sayıya yaklaştığını belirtir; fonksiyonun sonucunun mutlaka aynı sayıya yaklaşması gerekmez. Önce bağımsız değişkenin hedefini, sonra çıktıların hedefini ayrı oku. Bir tablo örüntüyü gösterebilir; kural veya grafik yapısı o örüntünün sürmesini gerekçelendirir.",
        ],
      },
      {
        title: "Soldan ve sağdan yaklaşımı sırala",
        paragraphs: [
          "x→a− gösterimi a’dan küçük, x→a+ gösterimi a’dan büyük girdileri kullanır. Eksi ve artı burada çıktı değerinin işareti değildir. x→2− iken f(x) değerleri negatif, pozitif veya sıfıra yakın olabilir; bu tamamen fonksiyonun kuralına bağlıdır.",
          "Etkileşimde uzaklığı küçültüp sol ve sağ örnekleri birlikte izle. Aynı uzaklık iki ayrı x üretir; her x kendi parçasının kuralıyla hesaplanır. Yalnız sağdaki tabloyu okuyup iki yanlı limit kararı verme; soldaki dalın da nereye gittiğini belirle.",
        ],
      },
      {
        title: "İki yanlı sonlu limit iki koşulu birleştirir",
        paragraphs: [
          "Bir iç noktada soldan limit L₁, sağdan limit L₂ sonlu gerçek sayılar ve birbirine eşitse iki yanlı limit bu ortak L değeridir. L₁≠L₂ ise iki yanlı sonlu limit yoktur. İki farklı değerin ortalaması limit diye atanmaz.",
          "Sadece bir yanın incelenebildiği tanım kümesi uçlarında tek yanlı yaklaşım ayrıca belirtilir. Bir grafiğin a noktasında dolu noktası bulunması, iki dalın aynı yere gitmesini gerektirmez. Limitin varlığı ile noktada tanımlı olma birbirinden ayrı incelemelerdir.",
        ],
      },
      {
        title: "Fonksiyon değeri dolu noktadan okunur",
        paragraphs: [
          "Grafikte x=a üzerindeki dolu nokta f(a)’yı gösterir; açık nokta o dalın bu noktayı içermediğini gösterir. İki dalın açık uçları aynı L yüksekliğine giderken dolu nokta başka yükseklikteyse limit L, fonksiyon değeri ise dolu noktanın yüksekliğidir.",
          "f(a) hiç tanımlanmamış olsa da çevredeki değerler ortak L’ye yaklaşabilir. Tersine f(a) tanımlıyken iki yan farklı olduğu için limit olmayabilir. Açık veya dolu noktanın kendisini görmekle çevredeki çizginin yaklaşımını okumayı ayrı tut.",
        ],
      },
      {
        title: "Polinom ve uygun bölümde doğrudan yerine koy",
        paragraphs: [
          "Polinom fonksiyonlarda her gerçek a için limit f(a)’dır. İki polinomun bölümünde payda a’da sıfır değilse yine doğrudan yerine koyabilirsin. (x²+1)/(x+2), x→1 için 2/3 verir; paydanın 3 olması bu yönteme izin verir.",
          "Payda sıfır çıkınca aynı kuralı zorlayıp sıfıra bölme yapma. Önce payın davranışını ve gerekirse yanları incele. Pay ile paydanın ikisi de0’a gidiyorsa 0/0 bir sayı değil, kullanılan yöntemle henüz sonucun belirlenmediğini söyleyen belirsizlik biçimidir.",
        ],
      },
      {
        title: "Limit işlemlerini koşullarıyla birleştir",
        paragraphs: [
          "f ve g’nin a’daki sonlu limitleri F ve G varsa toplamın limiti F+G, farkınki F−G, çarpımınki FG olur. Bölüm için ayrıca G≠0 gerekir. Sabitle çarpma aynı sabiti limitin dışına çıkarır; bu kurallar her parçanın uygun limiti varken kullanılır.",
          "Bir çarpımın limiti var diye her çarpanın ayrı ayrı limiti var sonucu çıkmaz. Örneğin işaret değiştiren iki aynı fonksiyonun çarpımı sabit 1 olabilir. Benzer biçimde f+g’nin düzenli olması, parçaların tek başına düzenli olduğunu zorunlu kılmaz; verilen yönü tersine çevirmeden kullan.",
        ],
      },
      {
        title: "Kök, mutlak değer, üstel ve logaritma bağlantısı",
        paragraphs: [
          "Uygun tanım koşullarında sürekli bir dış fonksiyon limit içine taşınabilir: f(x)→L ise |f(x)|→|L|; pozitif sabit a için a^f(x)→a^L olur. Çift dereceli kökte iç çevrede tanımlı ve limit L≥0 olmalıdır; tek dereceli kökte negatif değerler de mümkündür.",
          "Logaritmada taban pozitif ve1’den farklı, iç çevrede pozitif ve limit L>0 ise log_a f(x)→log_a L yazılır. İçin 0’a yaklaşması log_a0 diye hesaplanamaz. Sinüs ve kosinüs bütün gerçeklerde sürekli; tanjant ve kotanjant yalnız kendi tanım noktalarında doğrudan değerlendirilir.",
        ],
      },
      {
        title: "Ortak çarpanı silerken deliği koru",
        paragraphs: [
          "(x²−4)/(x−2), x≠2 iken x+2’ye eşittir. x→2 yaklaşımında x zaten 2’den farklı değerler aldığı için bu eşitlik limit bulmaya yeter ve sonuç 4’tür. İlk rasyonel ifade 2’de tanımsız kalır; sadeleştirme ona kendiliğinden değer atamaz.",
          "Grafikte x+2 doğrusu üzerindeki(2,4) noktası ilk fonksiyonda deliktir. O deliğe farklı bir dolu nokta yerleştirsen limit yine 4 olur. Sürekli uzatma istenirse deliği tam 4’te doldurmak gerekir; başka bir değer yalnız tanımlılık sağlar, süreklilik sağlamaz.",
        ],
      },
      {
        title: "Çarpanlara ayırma ile belirsizliği gider",
        paragraphs: [
          "x³−8=(x−2)(x²+2x+4) olduğundan (x³−8)/(x−2) ifadesinin 2’deki limiti 12’dir. Ortak çarpan yalnız x≠2 çevresinde sadeleşir; bu, limit için gereken bölgedir. Kalan polinomda artık doğrudan yerine koymak uygundur.",
          "Payda birden fazla yasak kök taşıyorsa hepsinin alanını sakla. Bir ortak çarpanın silinmesi, başlangıç tanım kümesindeki bütün deliklerin dolması değildir. İncelenen a çevresinde eşitlik kurduğunu söylemek, dönüşümün neden limiti koruduğunu açıkça belirtir.",
        ],
      },
      {
        title: "Köklü farkta eşlenikle çarp",
        paragraphs: [
          "(√(x+4)−2)/x ifadesi x→0 için 0/0 verir. Payın eşleniğiyle çarpınca pay x olur ve x≠0 iken bölüm 1/(√(x+4)+2) biçimine dönüşür. Bu yeni yazımda limit 1/4 bulunur; başlangıç kökünün x≥−4 koşulu korunur.",
          "Eşlenik çarpımı sıfır olmayan çevrede uygundur; yeni paydanın yaklaşım noktasında 0 olmadığını denetle. Karekök farkını iki ayrı limitin farkı diye hesaplamak 0/0’ı çözmez. Amaç aynı ifadeyi daha kararlı ve tanımı izlenebilir bir biçime dönüştürmektir.",
        ],
      },
      {
        title: "Mutlak değerde yanları ayrı aç",
        paragraphs: [
          "|x|/x ifadesi x>0 için 1, x<0 için −1’dir. x→0+ limiti 1, x→0− limiti−1 olduğundan iki yanlı limit yoktur. |x|’i her yerde x diye sadeleştirmek sol dalı değiştirir.",
          "|x−a| içeren ifadede işaretin değiştiği nokta a’dır. Parçalı yazımı bu noktaya göre kur; sonra sağ ve solda uygun cebiri yap. Noktaya yalnız negatif sayılarla yaklaşmak soldan yaklaşımın tanımı değildir; a=5 için 4,9 da soldadır ve pozitiftir.",
        ],
      },
      {
        title: "Parçalı fonksiyonda her dalı kendi yerinde kullan",
        paragraphs: [
          "f(x)=2x+1, x<1; f(1)=c; f(x)=x+2, x>1 biçiminde verilirse sol limit 3 ve sağ limit 3’tür. c değeri ne olursa olsun ortak limit 3 olur. Nokta değeri yalnız süreklilik kararı aşamasında bu ortak değerle karşılaştırılır.",
          "Limit başka bir noktada, örneğin x→0 için istenirse çevrede yalnız x<1 dalı kullanılır. Her parçalı fonksiyon sorusunda bütün dalları aynı x’e koyup ortalama almak gerekmez. Kural değişim noktası ile limitin araştırıldığı hedef noktayı önce eşleştir.",
        ],
      },
      {
        title: "Parametreyi iki yanın eşitliğinden bul",
        paragraphs: [
          "x<2 için f(x)=ax+1, x>2 için f(x)=x+4 olsun. İki yanlı limitin olması için 2a+1=6 gerekir; a=5/2 bulunur. f(2) ayrıca verilmemişse bu işlem nokta değerini belirlemez; yalnız yaklaşımın eşleşmesini sağlar.",
          "Birden fazla birleşim noktası varsa her biri kendi eşitliğini üretir. Süreklilik isteniyorsa noktanın hangi parçaya dahil olduğunu da kullanıp ortak limite eşitle. Eşitlik veya sıkı eşitsizlik işareti, tam birleşim noktasındaki değerin hangi kuraldan geleceğini belirler.",
        ],
      },
      {
        title: "Süreklilik üç soruya birlikte cevap verir",
        paragraphs: [
          "Bir iç noktada süreklilik için f(a) tanımlı olmalı, iki yanlı limit bulunmalı ve bu limit f(a)’ya eşit olmalıdır. Üç koşuldan herhangi biri yoksa o noktada süreklilik sağlanmaz. Limitin tek başına bulunması, grafikteki dolu noktanın doğru yerde olduğunu söylemez.",
          "Tanım kümesinin dışında bir noktada fonksiyonun sürekliliği aranmaz; fonksiyonun o noktaya sürekli uzatılıp uzatılamayacağı ayrı bir sorudur. Bir rasyonel fonksiyon bütün doğal tanım kümesinde sürekli olabilir, ama paydasının sıfır olduğu delik bu kümeye dahil değildir.",
        ],
      },
      {
        title: "Tek yanlı ve kapalı aralıkta süreklilik",
        paragraphs: [
          "f(a) tanımlı ve sağdan limit f(a)’ya eşitse sağdan süreklilik, soldan limit f(a)’ya eşitse soldan süreklilik vardır. İki tarafın farklı olduğu basamakta yalnız bir tarafın noktadaki değere eşit olması mümkündür.",
          "[a, b] aralığında süreklilik, iç noktalarda iki yanlı süreklilik; soldaki uç a’da sağdan, sağdaki uç b’de soldan süreklilik demektir. Tanım aralığının dışında çizim veya değer üretmek zorunda değilsin; yaklaşım fonksiyonun gerçekten tanımlı olduğu taraftan yapılır.",
        ],
      },
      {
        title: "Sürekli olduğu kümeyi gerçekten bul",
        paragraphs: [
          "Polinomlarℝ’de; rasyonel fonksiyonlar paydanın sıfır olmadığı ortak alanda süreklidir. Kök ve logaritma gibi fonksiyonlarda kendi tanım koşulları da bu alana eklenir. İptal edilen bir payda kökü, ilk fonksiyonun tanımında hâlâ hariçtir.",
          "f(x)=(x²−1)/(x−1) için doğal tanım kümesiℝ\\{1}; fonksiyon bu kümede süreklidir. g(1)=2 diye eklenmiş bir uzatma ise bütünℝ’de sürekli olur. İki fonksiyonun 1 dışındaki aynı değerleri, tanım kümelerini de aynı yapmaz.",
        ],
      },
      {
        title: "Sonlu limit, sınırsızlık ve sayısal tabloyu ayır",
        paragraphs: [
          "1/x için 0’a sağdan yaklaşınca değerler sınırsız pozitif, soldan sınırsız negatif büyür; aynı sonlu gerçek L’ye yaklaşılmaz. ∞ bir gerçek sayıymış gibi yerine konmaz. Bu ünitede iki yanlı sonlu limit yok ifadesi, bu tür sınırsız davranışla farklı sonlu yanları kapsayabilir; nedeni ayrıca yazılır.",
          "Bir tabloya yalnız 0,1 veya 0,01 kadar yaklaştırılmış birkaç nokta koymak tek başına limit ispatı değildir. Tam kuraldan çarpan, işaret veya sürekli parça bilgisini kullan. Etkileşimde yakınlaşma adımı çıktıların davranışını görünür yapar; öğrenilmiş sayılma veya otomatik puan oluşturmaz.",
        ],
      },
      {
        title: "Bir yöntem seç ve öncüllerini koru",
        paragraphs: [
          "Önce tanım ve hedefi oku; uygunsa doğrudan yerine koy.0/0 çıktığında çarpan, eşlenik veya parçalı işaret yolunu dene; yanlar farklıysa onları ayrı çöz. Sonuç bir sonlu limitse noktadaki değerle yalnız süreklilik sorulunca karşılaştır.",
          "Kaynakta anılan L’Hôpital daha sonraki türev bilgisini ve özel koşulları gerektirir; her 0/0 ifadesinde koşulsuz pay ve paydanın türevini alma kuralı değildir. Buradaki temel çözümler türeve dayanmaz. İleri bağlantıda, delinmiş bir çevrede türevlenme, payda türevinin sıfır olmaması ve türev oranının uygun limiti gibi öncüller ayrıca denetlenmelidir.",
        ],
      },
    ],
    examples: [
      {
        title: "Deliği açık tut",
        prompt: "lim_(x→3)(x²−9)/(x−3) nedir?",
        strategy: "x≠3 çevresinde çarpan sadeleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Pay(x−3)(x+3) olur.",
          },
          {
            label: "Adım 2",
            explanation: "x≠3 için bölümx+3.",
          },
          {
            label: "Adım 3",
            explanation:
              "Limit 3+3=6; ilk ifadenin 3’teki değeri hâlâ tanımsız.",
          },
        ],
        answer: "6",
        check: "Çevrede 2,9 için 5,9; 3,1 için 6,1; ortak hedef 6.",
        pitfall: "Sadeleşti diye f(3)=6 yazma.",
      },
      {
        title: "Nokta değeri farklı",
        prompt: "f(x)=2x−1,x≠3;f(3)=8. İki yanlı limit ve süreklilik?",
        strategy: "Çevre kuralını nokta değerinden ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İki tarafta2x−1→5.",
          },
          {
            label: "Adım 2",
            explanation: "Limit5 ama f(3)=8.",
          },
          {
            label: "Adım 3",
            explanation: "5≠8 olduğundan3’te sürekli değil.",
          },
        ],
        answer: "Limit5;3’te sürekli değil.",
        check:
          "f(3)=5 seçilirse süreklilik onarılır; yaklaşım limiti değişmez.",
        pitfall: "Dolu noktayı limit diye okuma.",
      },
      {
        title: "Sıçrama",
        prompt: "f(x)=x+2, x<0; f(0)=2; f(x)=2x+1, x>0.0’daki limit?",
        strategy: "İki dalı kendi yanından değerlendir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Soldan 0+2=2.",
          },
          {
            label: "Adım 2",
            explanation: "Sağdan 2·0+1=1.",
          },
          {
            label: "Adım 3",
            explanation: "2≠1; iki yanlı limit yok.",
          },
        ],
        answer: "İki yanlı limit yok.",
        check:
          "Nokta değeri 2 olması sol süreklilik verir ama iki yanlı süreklilik vermez.",
        pitfall: "İki yanın ortalaması 1,5 limit değildir.",
      },
      {
        title: "Eşlenik",
        prompt: "lim_(x→0)(√(x+16)−4)/x nedir?",
        strategy: "Payı eşleniğiyle çarp.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Pay(x+16)−16=x olur.",
          },
          {
            label: "Adım 2",
            explanation: "x≠0 için bölüm1/(√(x+16)+4).",
          },
          {
            label: "Adım 3",
            explanation: "Limit1/(4+4)=1/8.",
          },
        ],
        answer: "1/8",
        check: "Eşlenik payda0 değil; kök çevrede tanımlı.",
        pitfall: "0/0 sonucunu0 sayma.",
      },
      {
        title: "Süreklilik parametresi",
        prompt: "f(x)=ax−2,x<3;f(x)=x+1,x≥3.3’te süreklilik için a?",
        strategy: "Sol limitin sağ dalın nokta değerine eşitliğini kur.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Sol limit3a−2.",
          },
          {
            label: "Adım 2",
            explanation: "Sağ limit ve f(3)=4.",
          },
          {
            label: "Adım 3",
            explanation: "3a−2=4 ⇒a=2.",
          },
        ],
        answer: "2",
        check: "İki yan ve nokta değeri4 olur.",
        pitfall: "Yalnız a’yı bir parçaya yazıp sağ sınırı atlama.",
      },
      {
        title: "Mutlak değerde tek yan",
        prompt: "lim_(x→1+)|x−1|/(x−1) nedir?",
        strategy: "Yalnız istenen sağ yanı kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "x>1 için x−1>0.",
          },
          {
            label: "Adım 2",
            explanation: "Bu bölgede|x−1|=x−1 ve bölüm1.",
          },
          {
            label: "Adım 3",
            explanation:
              "Sağdan limit1; sol tarafı bulmak bu tek yanlı soru için gerekmez.",
          },
        ],
        answer: "1",
        check: "Örneğin1,1 ve1,01 girdilerinde bölüm sürekli1 verir.",
        pitfall: "İki yanlı limitin yokluğunu sağdan limitin de yokluğu sayma.",
      },
    ],
    recall: [
      {
        prompt: "Limit varken fonksiyon değeri tanımsız olabilir mi?",
        answer:
          "Evet; çevrede ortak yaklaşım bulunabilir, örneğin sadeleşen rasyonel deliği.",
      },
      {
        prompt: "0/0 neyi gösterir?",
        answer:
          "Bir sayı veya sonuç değil; kullanılan doğrudan yerine koymanın sonucu belirleyemediği belirsizlik biçimini.",
      },
      {
        prompt: "Sürekliliğin üç koşulu nedir?",
        answer:
          "Noktada tanımlılık, ortak limitin varlığı ve ikisinin eşitliği.",
      },
      {
        prompt: "Kapalı aralığın uçlarında hangi yan gerekir?",
        answer: "Sol uçta sağdan, sağ uçta soldan; aralığın içindeki taraftan.",
      },
    ],
    questions: [
      {
        prompt: "lim_(x→2)(x²−4)/(x−2) kaçtır?",
        options: ["0", "4", "2", "8", "Tanımsız"],
        answer: 1,
        hint: "x²−4=(x−2)(x+2) kullan.",
        explanation:
          "x≠2 için ifade x+2’ye eşit. x→2 için sonuç 4. İki yandan x+2 aynı 4’e gider.",
        guidance: {
          knowledge: [
            "Limit, hedef noktanın çevresindeki eşit ifadeyle hesaplanabilir.",
          ],
          strategy: "x²−4=(x−2)(x+2) kullan.",
          steps: ["x≠2 için ifade x+2’ye eşit.", "x→2 için sonuç 4."],
          optionReasons: [
            "0/0 bir sonuç değildir; ortak çarpan ayrılmalı.",
            "Doğru: İki yandan x+2 aynı 4’e gider.",
            "Sadeleşen ifade x+2; yalnız x değil.",
            "İki kat çarpanı fazladan eklendi.",
            "Noktadaki ifade tanımsız olabilir ama limiti vardır.",
          ],
          commonError:
            "Fonksiyonun noktadaki tanımsızlığını limitin yokluğu sanma.",
          check: "İki yandan x+2 aynı 4’e gider.",
        },
      },
      {
        prompt: "f(x)=x+1, x≠2 ve f(2)=9. lim_(x→2)f(x) kaçtır?",
        options: ["2", "3", "6", "9", "Limit yok"],
        answer: 1,
        hint: "2’nin iki yanında x+1’i kullan.",
        explanation:
          "Sol limit 3; sağ limit 3. Ortak limit 3, f(2)=9 ayrı bilgi. x=1,99 için 2,99; x=2,01 için 3,01.",
        guidance: {
          knowledge: [
            "Tek nokta değeri delinmiş çevredeki limiti değiştirmez.",
          ],
          strategy: "2’nin iki yanında x+1’i kullan.",
          steps: [
            "Sol limit 3; sağ limit 3.",
            "Ortak limit 3, f(2)=9 ayrı bilgi.",
          ],
          optionReasons: [
            "Bu girdi hedefidir; çıktı hedefi değil.",
            "Doğru: x=1,99 için 2,99; x=2,01 için 3,01.",
            "İki yan limiti toplanmaz.",
            "Noktadaki değer çevredeki yaklaşım yerine okundu.",
            "İki yan aynı x+1 kuralıyla 3’e gider.",
          ],
          commonError: "Dolu noktanın yüksekliğini otomatik limit sayma.",
          check: "x=1,99 için 2,99; x=2,01 için 3,01.",
        },
      },
      {
        prompt:
          "Bir fonksiyonun 0’daki sol limiti 2, sağ limiti 5. İki yanlı limiti nedir?",
        options: ["3,5", "5", "2", "Yoktur.", "7"],
        answer: 3,
        hint: "2 ile 5’i karşılaştır.",
        explanation:
          "İki değer sonlu ama farklı. Ortak tek yaklaşım değeri yok. Girdinin hangi yandan geldiğine göre çıktı hedefi değişir.",
        guidance: {
          knowledge: [
            "İki yanlı sonlu limit için yan limitler eşit olmalıdır.",
          ],
          strategy: "2 ile 5’i karşılaştır.",
          steps: [
            "İki değer sonlu ama farklı.",
            "Ortak tek yaklaşım değeri yok.",
          ],
          optionReasons: [
            "İki yanın ortalaması limit değildir.",
            "Yalnız sağ yan yeterli değildir.",
            "Yalnız sol yan yeterli değildir.",
            "Doğru: Girdinin hangi yandan geldiğine göre çıktı hedefi değişir.",
            "Yan limitler toplanmaz.",
          ],
          commonError: "Farklı limitleri ortalamayla birleştirme.",
          check: "Girdinin hangi yandan geldiğine göre çıktı hedefi değişir.",
        },
      },
      {
        prompt: "lim_(x→3)(x³−27)/(x−3) kaçtır?",
        options: ["Tanımsız", "9", "0", "27", "18"],
        answer: 3,
        hint: "a=3 için ortak x−3 çarpanını ayır.",
        explanation:
          "Kalan x²+3x+9. x=3 için 9+9+9=27. Payın açılımı verilen küp farkına geri döner.",
        guidance: {
          knowledge: ["Küp farkı x³−a³=(x−a)(x²+ax+a²)."],
          strategy: "a=3 için ortak x−3 çarpanını ayır.",
          steps: ["Kalan x²+3x+9.", "x=3 için 9+9+9=27."],
          optionReasons: [
            "Çarpan sonrası çevrede düzenli polinom kalır.",
            "Kalan x²+x·3+9 ifadesinin yalnız bir terimi alındı.",
            "0/0 sonuç sayıldı.",
            "Doğru: Payın açılımı verilen küp farkına geri döner.",
            "Üç kare katkısından biri eksik.",
          ],
          commonError: "x³−27’yi(x−3)³ sanma.",
          check: "Payın açılımı verilen küp farkına geri döner.",
        },
      },
      {
        prompt: "lim_(x→0)(√(x+9)−3)/x kaçtır?",
        options: ["6", "1/3", "0", "1/9", "1/6"],
        answer: 4,
        hint: "√(x+9)+3 ile genişlet.",
        explanation:
          "x≠0 için ifade 1/(√(x+9)+3). Limit 1/6. Yaklaşımda yeni payda 6 olur ve sıfır değildir.",
        guidance: {
          knowledge: ["Eşlenik çarpımı kök farkını polinom farkına çevirir."],
          strategy: "√(x+9)+3 ile genişlet.",
          steps: ["x≠0 için ifade 1/(√(x+9)+3).", "Limit 1/6."],
          optionReasons: [
            "Eşlenik sonucunun tersi alındı.",
            "Eşlenik paydasındaki ikinci 3 unutuldu.",
            "0/0 bir sayı değildir.",
            "Kök ve kare nicelikleri karıştırıldı.",
            "Doğru: Yaklaşımda yeni payda 6 olur ve sıfır değildir.",
          ],
          commonError:
            "Payı eşlenikle çarparken paydayı aynı çarpanla genişletmeyi unutma.",
          check: "Yaklaşımda yeni payda 6 olur ve sıfır değildir.",
        },
      },
      {
        prompt: "lim_(x→0)|x|/x için hangisi doğrudur?",
        options: [
          "Limit−1",
          "Her iki yan tanımsız",
          "Limit 0",
          "Limit 1",
          "Sol−1, sağ 1; iki yanlı limit yok.",
        ],
        answer: 4,
        hint: "x<0 ve x>0 için ayrı sadeleştir.",
        explanation:
          "Sol dal−x/x=−1. Sağ dal x/x=1; eşit değiller. ±0,1 örnekleri karşıt iki sabit değer verir.",
        guidance: {
          knowledge: ["Mutlak değer iki işaret dalına ayrılır."],
          strategy: "x<0 ve x>0 için ayrı sadeleştir.",
          steps: ["Sol dal−x/x=−1.", "Sağ dal x/x=1; eşit değiller."],
          optionReasons: [
            "Sağ yan dalı atlandı.",
            "x≠0 çevresinde ifade tanımlıdır.",
            "Yan limitlerin ortalaması alınamaz.",
            "|x|=x yalnız x≥0 için geçerlidir.",
            "Doğru: ±0,1 örnekleri karşıt iki sabit değer verir.",
          ],
          commonError: "|x|’i bütün gerçeklerde x diye yazma.",
          check: "±0,1 örnekleri karşıt iki sabit değer verir.",
        },
      },
      {
        prompt: "f(x)=ax+1, x<2; f(x)=x+4, x≥2.2’de süreklilik için a kaçtır?",
        options: ["5/2", "6", "1/2", "3", "2"],
        answer: 0,
        hint: "2a+1=6 denklemini kur.",
        explanation: "Sağ dal 2+4=6 verir. 2a=5 ⇒a=5/2. Her üç değer 6 olur.",
        guidance: {
          knowledge: ["Süreklilikte sol limit=sağ limit=f(2)."],
          strategy: "2a+1=6 denklemini kur.",
          steps: ["Sağ dal 2+4=6 verir.", "2a=5 ⇒a=5/2."],
          optionReasons: [
            "Doğru: Her üç değer 6 olur.",
            "Nokta değeri a katsayısı değildir.",
            "Sabit 1 yanlış tarafa veya yanlış değere taşındı.",
            "Sol 7 olur; sağ 6 değil.",
            "Sol 2a+1=5 olur; sağ 6 ile eşleşmez.",
          ],
          commonError: "Noktayı içeren ≥dalını unutma.",
          check: "Her üç değer 6 olur.",
        },
      },
      {
        prompt: "f(x)=(x²−1)/(x−1) doğal tanım kümesinde nerede süreklidir?",
        options: ["Hiçbir yerde", "ℝ\\{−1,1}", "ℝ\\{1}", "Yalnız{1}", "ℝ"],
        answer: 2,
        hint: "Payda x−1≠0 koşulunu koru.",
        explanation:
          "x≠1; bu alanda x+1 eşitliği geçerli. Bu alanın her noktasında sürekli. x=−1 için 0/(−2)=0 tanımlı ve süreklidir.",
        guidance: {
          knowledge: [
            "Sadeleştirme başlangıç tanım kümesindeki deliği doldurmaz.",
          ],
          strategy: "Payda x−1≠0 koşulunu koru.",
          steps: [
            "x≠1; bu alanda x+1 eşitliği geçerli.",
            "Bu alanın her noktasında sürekli.",
          ],
          optionReasons: [
            "Rasyonel fonksiyon paydasının sıfır olmadığı yerde süreklidir.",
            "Payın sıfırı −1 yasak değildir; payda −2 olur.",
            "Doğru: x=−1 için 0/(−2)=0 tanımlı ve süreklidir.",
            "1 tam tersine tanım dışı noktadır.",
            "Başlangıç paydasının sıfır olduğu 1 hâlâ hariç.",
          ],
          commonError: "Pay sıfırını payda yasağıyla karıştırma.",
          check: "x=−1 için 0/(−2)=0 tanımlı ve süreklidir.",
        },
      },
      {
        prompt:
          "x≠2 için f(x)=(x²−4)/(x−2).f(2)=k eklenerek süreklilik isteniyor.k kaç olmalı?",
        options: ["Böyle k yok", "2", "4", "0", "Her gerçek k"],
        answer: 2,
        hint: "Önce iki yanlı limiti bul.",
        explanation:
          "x≠2 için bölüm x+2. Limit 4; bu nedenle k=4. f(2) de 4 olunca iki yan ve nokta değeri eşleşir.",
        guidance: {
          knowledge: [
            "Sürekli uzatmada eklenen değer çevredeki limite eşittir.",
          ],
          strategy: "Önce iki yanlı limiti bul.",
          steps: ["x≠2 için bölüm x+2.", "Limit 4; bu nedenle k=4."],
          optionReasons: [
            "Delik sonlu limit 4 ile doldurulabilir.",
            "Çevredeki x+2 yerine yalnız x alındı.",
            "Doğru: f(2) de 4 olunca iki yan ve nokta değeri eşleşir.",
            "0/0 payını nokta değeri sanma.",
            "Her k tanımlılık sağlar; yalnız 4 süreklilik sağlar.",
          ],
          commonError: "Tanımlı olmakla sürekli olmayı aynı koşul sayma.",
          check: "f(2) de 4 olunca iki yan ve nokta değeri eşleşir.",
        },
      },
      {
        prompt:
          "f’nin bir a iç noktasında sürekli olması için hangisi gereklidir?",
        options: [
          "İki yan limitin toplamı f(a)",
          "Yalnız f(a)tanımlı",
          "f(a)=0",
          "f(a)tanımlı, limit var ve limit=f(a).",
          "Yalnız iki yanlı limit var",
        ],
        answer: 3,
        hint: "Üç koşulu birlikte ara.",
        explanation:
          "Nokta değeri gerekir; ortak limit gerekir. İkisi eşit olmalıdır. f(x)=x fonksiyonu a=3’te3 değeriyle süreklidir.",
        guidance: {
          knowledge: ["Süreklilik tanımlılık ve yaklaşımın eşleşmesidir."],
          strategy: "Üç koşulu birlikte ara.",
          steps: [
            "Nokta değeri gerekir; ortak limit gerekir.",
            "İkisi eşit olmalıdır.",
          ],
          optionReasons: [
            "Süreklilik toplamla değil ortak eşitlikle kurulur.",
            "Sıçrama veya delik değeri uyumsuz olabilir.",
            "Sürekli noktadaki değer 0 olmak zorunda değildir.",
            "Doğru: f(x)=x fonksiyonu a=3’te3 değeriyle süreklidir.",
            "Nokta değeri tanımsız veya farklı olabilir.",
          ],
          commonError: "Tek bir koşulu bütün süreklilik tanımı gibi kullanma.",
          check: "f(x)=x fonksiyonu a=3’te3 değeriyle süreklidir.",
        },
      },
      {
        prompt:
          "[a, b] kapalı aralığında süreklilik için uçlarda hangi koşul kullanılır?",
        options: [
          "Uçlarda değer aranmaz",
          "a’da sağdan, b’de soldan süreklilik.",
          "İki uçta da soldan",
          "a’da soldan, b’de sağdan",
          "İki uçta da sağdan",
        ],
        answer: 1,
        hint: "Aralığın içine bakan yönleri seç.",
        explanation:
          "a’dan büyük girdiler sağdadır. b’den küçük girdiler soldadır. [0,1] örneğinde 0’a sağdan,1’e soldan yaklaşılır.",
        guidance: {
          knowledge: ["Uçta yaklaşım tanım aralığının içinden yapılır."],
          strategy: "Aralığın içine bakan yönleri seç.",
          steps: [
            "a’dan büyük girdiler sağdadır.",
            "b’den küçük girdiler soldadır.",
          ],
          optionReasons: [
            "Kapalı aralık uçları tanımın parçasıdır.",
            "Doğru: [0,1] örneğinde 0’a sağdan,1’e soldan yaklaşılır.",
            "a’nın solunda aralık içi değer yok.",
            "Aralığın dış tarafları seçildi.",
            "b’nin sağında aralık içi değer yok.",
          ],
          commonError: "Tanım dışı yönden yaklaşımı zorunlu sayma.",
          check: "[0,1] örneğinde 0’a sağdan,1’e soldan yaklaşılır.",
        },
      },
      {
        prompt: "lim_(x→1)log₂(x+3) kaçtır?",
        options: ["2", "1", "Limit yok", "4", "0"],
        answer: 0,
        hint: "Önce x+3→4 bul.",
        explanation:
          "Limit log₂4 olur. 2²=4 olduğundan sonuç 2. İç 4 pozitif, taban 2 uygundur.",
        guidance: {
          knowledge: [
            "Pozitif sonlu iç limitinde logaritmanın sürekliliği kullanılır.",
          ],
          strategy: "Önce x+3→4 bul.",
          steps: ["Limit log₂4 olur.", "2²=4 olduğundan sonuç 2."],
          optionReasons: [
            "Doğru: İç 4 pozitif, taban 2 uygundur.",
            "Taban 2 ile içerik 4 aynı değildir.",
            "İç çevrede pozitif ve 4’e yaklaşır.",
            "Önce iç limit 4 bulundu ama logaritması alınmadı.",
            "İç 1’e yaklaşmıyor.",
          ],
          commonError: "Sadece içi değerlendirip dış fonksiyonu atlama.",
          check: "İç 4 pozitif, taban 2 uygundur.",
        },
      },
      {
        prompt: "f(x)=x²−4x+7 için lim_(x→2)f(x) kaçtır?",
        options: ["0", "−1", "3", "7", "Tanımsız"],
        answer: 2,
        hint: "2²−4·2+7 hesapla.",
        explanation: "4−8+7. Sonuç 3. f(x)=(x−2)²+3 olduğundan aynı 3 görülür.",
        guidance: {
          knowledge: ["Polinom limitinde doğrudan yerine koyulur."],
          strategy: "2²−4·2+7 hesapla.",
          steps: ["4−8+7.", "Sonuç 3."],
          optionReasons: [
            "Hedefte polinomun sıfır olması zorunlu değildir.",
            "2² ve−4·2 işlemleri yanlış toplandı.",
            "Doğru: f(x)=(x−2)²+3 olduğundan aynı 3 görülür.",
            "Yalnız sabit terim alındı.",
            "Polinom her gerçek noktada süreklidir.",
          ],
          commonError: "x→2 ifadesini f(x)→2 diye yorumlama.",
          check: "f(x)=(x−2)²+3 olduğundan aynı 3 görülür.",
        },
      },
      {
        prompt:
          "f(x)=2x+1, x<1; f(1)=c; f(x)=x+2, x>1.1’de limitin varlığı için c ne olmalıdır?",
        options: [
          "Her gerçek c olabilir.",
          "Hiçbir c",
          "c≠3",
          "Yalnız 0",
          "Yalnız 3",
        ],
        answer: 0,
        hint: "Sol ve sağ dalı 1’de değerlendir.",
        explanation:
          "Sol 2·1+1=3; sağ 1+2=3. c ne olursa olsun ortak limit 3. c=9 seçilse de iki yan 3’e yaklaşır; yalnız süreklilik bozulur.",
        guidance: {
          knowledge: ["Limit yalnız delinmiş çevredeki kurallara bakar."],
          strategy: "Sol ve sağ dalı 1’de değerlendir.",
          steps: [
            "Sol 2·1+1=3; sağ 1+2=3.",
            "c ne olursa olsun ortak limit 3.",
          ],
          optionReasons: [
            "Doğru: c=9 seçilse de iki yan 3’e yaklaşır; yalnız süreklilik bozulur.",
            "İki yanın limiti zaten 3 ile eşittir.",
            "c=3 için de limit vardır; üstelik sürekli olur.",
            "Nokta değeri limitin varlığını belirlemez.",
            "Bu süreklilik koşuludur; limit için nokta değeri bağımsızdır.",
          ],
          commonError: "Limit varlığı ile süreklilik isteğini karıştırma.",
          check:
            "c=9 seçilse de iki yan 3’e yaklaşır; yalnız süreklilik bozulur.",
        },
      },
    ],
    source:
      "MEBİ AYT Matematik fiziksel 70–77; OGM Limit ve Süreklilik video notu 8/11–14/17/23 gerçek öğretim sayfaları temelinde özgün anlatım ve sorular. Kaynaktaki şartsız genellemeler genişletilmez; sonlu limit, tanım kümesi, sürekli uzatma ve L’Hôpital öncülleri ayrılır. Temel çözümler türev kullanmaz.",
  },
];

export const forge023MathTopics: Record<string, string> = Object.fromEntries(
  packs023.map((p) => [p.id, p.topic]),
);
export const forge023MathGuides: LessonGuide[] = packs023;
export const forge023MathLessons: Lesson[] = packs023.map((p) => ({
  id: p.id,
  subjectId: "ayt-matematik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  questions: p.questions.map((q, i) => ({
    id: `f023-${p.id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: p.id,
  })),
}));
