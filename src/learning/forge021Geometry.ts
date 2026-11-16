import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export type Point021 = { x: number; y: number };
export type Line021 = { a: number; b: number; c: number };
export type Rational021 = { a: number; b: number; c: number; d: number };
// Public models use a bounded teaching domain, not arbitrary floating-point extremes.
function scope021(...values: number[]) {
  if (
    values.some(
      (x) =>
        !Number.isFinite(x) ||
        Math.abs(x) > 1e6 ||
        (x !== 0 && Math.abs(x) < 1e-6),
    )
  )
    throw new RangeError("GEOMETRY021_INPUT_SCOPE");
}
function finite021(...values: number[]) {
  if (values.some((x) => !Number.isFinite(x)))
    throw new RangeError("GEOMETRY021_PRECISION");
}
const clean021 = (x: number) => (x === 0 ? 0 : x);
const point021 = (x: number, y: number): Point021 => {
  finite021(x, y);
  return { x: clean021(x), y: clean021(y) };
};
const inputPoint021 = (p: Point021) => scope021(p.x, p.y);
function addInternal021(p: Point021, vector: Point021): Point021 {
  return point021(p.x + vector.x, p.y + vector.y);
}
export function translate021(p: Point021, vector: Point021): Point021 {
  inputPoint021(p);
  inputPoint021(vector);
  return addInternal021(p, vector);
}
function rotateInternal021(
  p: Point021,
  center: Point021,
  degrees: number,
): Point021 {
  const angle = ((degrees % 360) + 360) % 360,
    quarter = angle / 90;
  const cos = Number.isInteger(quarter)
      ? [1, 0, -1, 0][quarter]
      : Math.cos((angle * Math.PI) / 180),
    sin = Number.isInteger(quarter)
      ? [0, 1, 0, -1][quarter]
      : Math.sin((angle * Math.PI) / 180),
    dx = p.x - center.x,
    dy = p.y - center.y;
  return point021(
    center.x + dx * cos - dy * sin,
    center.y + dx * sin + dy * cos,
  );
}
export function rotate021(
  p: Point021,
  center: Point021,
  degrees: number,
): Point021 {
  inputPoint021(p);
  inputPoint021(center);
  scope021(degrees);
  return rotateInternal021(p, center, degrees);
}
export function transform021(
  p: Point021,
  vector: Point021,
  center: Point021,
  degrees: number,
  order: "translate-rotate" | "rotate-translate",
) {
  if (!["translate-rotate", "rotate-translate"].includes(order))
    throw new RangeError("TRANSFORM021_ORDER");
  inputPoint021(p);
  inputPoint021(vector);
  inputPoint021(center);
  scope021(degrees);
  const intermediate =
      order === "translate-rotate"
        ? addInternal021(p, vector)
        : rotateInternal021(p, center, degrees),
    result =
      order === "translate-rotate"
        ? rotateInternal021(intermediate, center, degrees)
        : addInternal021(intermediate, vector);
  const other =
    order === "translate-rotate"
      ? addInternal021(rotateInternal021(p, center, degrees), vector)
      : rotateInternal021(addInternal021(p, vector), center, degrees);
  return {
    intermediate,
    result,
    other,
    sameOrderResult: (vector.x === 0 && vector.y === 0) || degrees % 360 === 0,
    radius: Math.hypot(p.x - center.x, p.y - center.y),
    identityRotation: degrees % 360 === 0,
  };
}
export function reflectLine021(p: Point021, line: Line021) {
  inputPoint021(p);
  scope021(line.a, line.b, line.c);
  const norm2 = line.a * line.a + line.b * line.b;
  if (norm2 === 0)
    return {
      kind: line.c === 0 ? ("plane" as const) : ("empty" as const),
      foot: null,
      image: null,
      distance: null,
      signed: null,
    };
  const numerator = line.a * p.x + line.b * p.y + line.c,
    factor = numerator / norm2,
    foot = point021(p.x - factor * line.a, p.y - factor * line.b),
    image = point021(p.x - 2 * factor * line.a, p.y - 2 * factor * line.b);
  return {
    kind: "mirror" as const,
    foot,
    image,
    distance: Math.abs(numerator) / Math.sqrt(norm2),
    signed: numerator / Math.sqrt(norm2),
  };
}
export function reflectCenter021(p: Point021, center: Point021): Point021 {
  inputPoint021(p);
  inputPoint021(center);
  return point021(2 * center.x - p.x, 2 * center.y - p.y);
}
export function mirrorFromPair021(p: Point021, image: Point021) {
  inputPoint021(p);
  inputPoint021(image);
  if (p.x === image.x && p.y === image.y) return null;
  const foot = point021((p.x + image.x) / 2, (p.y + image.y) / 2),
    a = image.x - p.x,
    b = image.y - p.y;
  return { foot, line: { a, b, c: -a * foot.x - b * foot.y } };
}
export function circleGeneral021(D: number, E: number, F: number) {
  scope021(D, E, F);
  const center = point021(-D / 2, -E / 2),
    radiusSquared = (D / 2) ** 2 + (E / 2) ** 2 - F;
  return {
    center,
    radiusSquared,
    radius: radiusSquared >= 0 ? Math.sqrt(radiusSquared) : null,
    kind:
      radiusSquared > 0
        ? ("circle" as const)
        : radiusSquared === 0
          ? ("point" as const)
          : ("empty" as const),
  };
}
export function circleLine021(center: Point021, radius: number, line: Line021) {
  inputPoint021(center);
  scope021(radius);
  if (radius < 0) throw new RangeError("CIRCLE021_RADIUS");
  const projection = reflectLine021(center, line);
  if (projection.kind !== "mirror")
    return {
      kind: "invalid-line" as const,
      points: [] as Point021[],
      foot: null,
      distance: null,
      chord: null,
    };
  const foot = projection.foot!,
    distance = projection.distance!,
    numerator = line.a * center.x + line.b * center.y + line.c,
    norm2 = line.a ** 2 + line.b ** 2,
    comparison = radius * radius * norm2 - numerator * numerator;
  if (comparison < 0)
    return {
      kind: "outside" as const,
      points: [] as Point021[],
      foot,
      distance,
      chord: 0,
    };
  if (comparison === 0)
    return {
      kind: radius === 0 ? ("point-on-line" as const) : ("tangent" as const),
      points: [foot],
      foot,
      distance,
      chord: 0,
    };
  const halfChord = Math.sqrt(comparison / norm2),
    norm = Math.sqrt(norm2),
    dx = (-line.b / norm) * halfChord,
    dy = (line.a / norm) * halfChord;
  return {
    kind: "secant" as const,
    points: [
      point021(foot.x + dx, foot.y + dy),
      point021(foot.x - dx, foot.y - dy),
    ],
    foot,
    distance,
    chord: 2 * halfChord,
  };
}
export function circlePair021(
  one: Point021,
  r: number,
  two: Point021,
  s: number,
) {
  inputPoint021(one);
  inputPoint021(two);
  scope021(r, s);
  if (r < 0 || s < 0) throw new RangeError("CIRCLE021_RADIUS");
  const dx = two.x - one.x,
    dy = two.y - one.y,
    d = Math.hypot(dx, dy),
    points: Point021[] = [];
  if (d === 0 && r === s)
    return {
      kind: r === 0 ? ("same-point" as const) : ("coincident" as const),
      distance: d,
      points: r === 0 ? [one] : points,
    };
  if (r === 0 || s === 0) {
    const on = d === (r || s),
      selected = r === 0 ? one : two;
    return {
      kind: on ? ("point-on" as const) : ("separate" as const),
      distance: d,
      points: on ? [selected] : points,
    };
  }
  if (d > r + s) return { kind: "outside" as const, distance: d, points };
  if (d < Math.abs(r - s))
    return { kind: "inside" as const, distance: d, points };
  const along = ((r - s) * (r + s) + d * d) / (2 * d),
    h2 = Math.max(0, r * r - along * along),
    middle = point021(one.x + (along * dx) / d, one.y + (along * dy) / d);
  if (d === r + s || d === Math.abs(r - s))
    return { kind: "tangent" as const, distance: d, points: [middle] };
  const h = Math.sqrt(h2);
  return {
    kind: "intersect" as const,
    distance: d,
    points: [
      point021(middle.x - (h * dy) / d, middle.y + (h * dx) / d),
      point021(middle.x + (h * dy) / d, middle.y - (h * dx) / d),
    ],
  };
}
export function finiteMap021(
  domain: number[],
  codomain: number[],
  rows: number[][],
) {
  if (
    !domain.length ||
    !codomain.length ||
    domain.length > 8 ||
    codomain.length > 8 ||
    rows.length !== domain.length ||
    new Set(domain).size !== domain.length ||
    new Set(codomain).size !== codomain.length
  )
    throw new RangeError("FUNCTION021_SET_SCOPE");
  scope021(...domain, ...codomain);
  const sets = rows.map((row) => {
      if (!Array.isArray(row) || row.some((y) => !codomain.includes(y)))
        throw new RangeError("FUNCTION021_CODOMAIN");
      return [...new Set(row)];
    }),
    missing = sets
      .map((row, i) => (row.length === 0 ? domain[i] : null))
      .filter((x) => x !== null),
    multiple = sets
      .map((row, i) => (row.length > 1 ? domain[i] : null))
      .filter((x) => x !== null),
    image = [...new Set(sets.flat())].sort((a, b) => a - b),
    isFunction = missing.length === 0 && multiple.length === 0,
    injective = isFunction
      ? new Set(sets.map((row) => row[0])).size === domain.length
      : null,
    surjective = isFunction ? image.length === codomain.length : null;
  return {
    domain,
    codomain,
    rows: sets,
    missing,
    multiple,
    image,
    isFunction,
    injective,
    surjective,
    inverse:
      injective && surjective
        ? codomain.map((y) => ({
            input: y,
            output: domain[sets.findIndex((row) => row[0] === y)],
          }))
        : null,
  };
}
function rationalValue021(f: Rational021, x: number) {
  finite021(x);
  const denominator = f.c * x + f.d;
  if (denominator === 0) return null;
  const value = (f.a * x + f.b) / denominator;
  finite021(value);
  return clean021(value);
}
export function rational021(f: Rational021, x: number) {
  scope021(f.a, f.b, f.c, f.d, x);
  const determinant = f.a * f.d - f.b * f.c,
    emptyDomain = f.c === 0 && f.d === 0;
  return {
    value: rationalValue021(f, x),
    determinant,
    emptyDomain,
    excludedInput: f.c === 0 ? null : -f.d / f.c,
    excludedOutput: f.c === 0 || determinant === 0 ? null : f.a / f.c,
    inverse: determinant !== 0 ? { a: -f.d, b: f.b, c: f.c, d: -f.a } : null,
  };
}
export type Inner021 = {
  kind: "linear" | "square" | "reciprocal";
  m: number;
  n: number;
};
function innerValue021(g: Inner021, x: number) {
  finite021(x);
  const value =
    g.kind === "linear"
      ? g.m * x + g.n
      : g.kind === "square"
        ? x * x + g.n
        : x === g.n
          ? null
          : 1 / (x - g.n);
  if (value !== null) finite021(value);
  return value;
}
export function compose021(
  f: Rational021,
  g: Inner021,
  x: number,
  order: "gf" | "fg",
) {
  scope021(f.a, f.b, f.c, f.d, g.m, g.n, x);
  if (
    !["linear", "square", "reciprocal"].includes(g.kind) ||
    !["gf", "fg"].includes(order)
  )
    throw new RangeError("COMPOSE021_KIND");
  const first = order === "gf" ? rationalValue021(f, x) : innerValue021(g, x),
    result =
      first === null
        ? null
        : order === "gf"
          ? innerValue021(g, first)
          : rationalValue021(f, first);
  return {
    first,
    result,
    valid: result !== null,
    excludedAt:
      first === null
        ? ("inner" as const)
        : result === null
          ? ("outer" as const)
          : null,
  };
}
// Coefficients are in ascending powers. The zero polynomial has degree null, not0.
function polynomialInput021(values: number[]) {
  if (!Array.isArray(values) || !values.length || values.length > 9)
    throw new RangeError("POLYNOMIAL021_COEFFICIENTS");
  scope021(...values);
  return trim021(values);
}
function trim021(values: number[]) {
  const out = values.map(clean021);
  while (out.length > 1 && out.at(-1) === 0) out.pop();
  return out;
}
const degree021 = (values: number[]) =>
  values.length === 1 && values[0] === 0 ? null : values.length - 1;
function evaluate021(values: number[], x: number) {
  let y = 0;
  for (let i = values.length - 1; i >= 0; i--) y = y * x + values[i];
  finite021(y);
  return clean021(y);
}
export function polynomial021(values: number[], x: number) {
  const coefficients = polynomialInput021(values);
  scope021(x);
  return {
    coefficients,
    degree: degree021(coefficients),
    value: evaluate021(coefficients, x),
    constant: coefficients[0],
    sum: evaluate021(coefficients, 1),
    evenSum: (evaluate021(coefficients, 1) + evaluate021(coefficients, -1)) / 2,
    oddSum: (evaluate021(coefficients, 1) - evaluate021(coefficients, -1)) / 2,
  };
}
export function dividePolynomial021(values: number[], divisorInput: number[]) {
  const dividend = polynomialInput021(values),
    divisor = polynomialInput021(divisorInput),
    divisorDegree = degree021(divisor),
    dividendDegree = degree021(dividend);
  if (divisorDegree === null)
    return {
      kind: "zero-divisor" as const,
      quotient: null,
      remainder: null,
      steps: [],
      reconstructed: null,
    };
  const work = [...dividend],
    quotient = Array(Math.max(1, dividend.length - divisor.length + 1)).fill(
      0,
    ) as number[],
    steps: {
      shift: number;
      factor: number;
      before: number[];
      after: number[];
    }[] = [];
  for (let shift = dividend.length - divisor.length; shift >= 0; shift--) {
    const before = [...work],
      factor = work[divisorDegree + shift] / divisor[divisorDegree];
    quotient[shift] = factor;
    for (let i = 0; i <= divisorDegree; i++)
      work[i + shift] -= factor * divisor[i];
    work[divisorDegree + shift] = 0;
    finite021(...work, factor);
    steps.push({ shift, factor, before, after: [...work] });
  }
  const resultQ = trim021(quotient),
    remainder = trim021(work.slice(0, Math.max(1, divisorDegree))),
    reconstructed = Array(
      Math.max(dividend.length, divisor.length + resultQ.length - 1),
    ).fill(0) as number[];
  for (let i = 0; i < divisor.length; i++)
    for (let j = 0; j < resultQ.length; j++)
      reconstructed[i + j] += divisor[i] * resultQ[j];
  remainder.forEach((v, i) => (reconstructed[i] += v));
  finite021(...reconstructed);
  // A finite quotient can still lose a real input coefficient through cancellation.
  // Reject that numerical domain instead of claiming a false P=DQ+R identity.
  for (let i = 0; i < Math.max(dividend.length, reconstructed.length); i++) {
    const original = dividend[i] ?? 0,
      rebuilt = reconstructed[i] ?? 0;
    if (
      Math.abs(rebuilt - original) >
      256 * Number.EPSILON * Math.max(1, Math.abs(original))
    )
      throw new RangeError("GEOMETRY021_PRECISION");
  }
  return {
    kind: "division" as const,
    quotient: resultQ,
    remainder,
    steps,
    reconstructed: trim021(reconstructed),
    dividendDegree,
    divisorDegree,
    quotientDegree: degree021(resultQ),
    remainderDegree: degree021(remainder),
  };
}
export function plane021(points: Point021[]) {
  for (const p of points) finite021(p.x, p.y);
  const limit = Math.max(
      6,
      Math.ceil(
        Math.max(0, ...points.flatMap((p) => [Math.abs(p.x), Math.abs(p.y)])),
      ) + 2,
    ),
    rough = limit / 4,
    power = 10 ** Math.floor(Math.log10(rough)),
    step = [1, 2, 5, 10].map((v) => v * power).find((v) => v >= rough)!,
    ticks: number[] = [];
  for (let i = Math.ceil(-limit / step); i <= Math.floor(limit / step); i++)
    ticks.push(i * step);
  return {
    limit,
    step,
    ticks,
    pixelsPerUnit: 260 / limit,
    x: (x: number) => 360 + (x / limit) * 260,
    y: (y: number) => 320 - (y / limit) * 260,
  };
}

type Section021 = [string, string, string];
type Example021 = [
  string,
  string,
  string,
  [string, string, string],
  string,
  string,
  string,
];
type Item021 = [
  string,
  [string, string, string, string, string],
  string,
  string,
];
type Pack021 = {
  id: string;
  topic: string;
  subjectId: string;
  title: string;
  minutes: number;
  source: string;
  objectives: string[];
  sections: Section021[];
  examples: Example021[];
  recall: [string, string][];
  items: Item021[];
};
const packs021: Pack021[] = [
  {
    id: "donusum-oteleme-donme",
    topic: "detail-405",
    subjectId: "ayt-geometri",
    title: "Öteleme ve dönme: hareketin sırasını keşfet",
    minutes: 100,
    source:
      "Aurelia Geometri Tüm Konular ve Formüller, analitik ve dönüşümler bölümü; MEBİ AYT Matematik dönüşümler; OGM Öteleme ve Dönme sunuları ile Dersler Cepte Dönüşümler karşılaştırılarak hazırlanmış özgün anlatım ve modeller. Sorular özgündür; resmî sınav sorusu değildir.",
    objectives: [
      "Ötelemeyi vektörle, dönmeyi merkez ve işaretli açıyla kur.",
      "Bir şeklin her köşesine aynı dönüşümü uygula; korunan uzunluk ve alanı denetle.",
      "Dönüşüm sırasını ve ters dönüşümü ayır; noktadan doğru ve fonksiyon grafiğine geç.",
    ],
    sections: [
      [
        "Bir dönüşüm her noktaya bir görüntü verir",
        "Düzlemde bir şekli taşımak, yalnız bir köşeyi değiştirmek değildir. Her P(x; y) noktasına bir P′ görüntüsü veren aynı kuralı bütün şekle uygularız. ABC üçgeninde A, B ve C için ayrı kurallar seçilirse oluşan şekil aynı dönüşümün görüntüsü olmaz. Koordinatlar noktanın konumunu, dönüşüm ise eski konumdan yeni konuma geçişi anlatır.",
        "Öteleme ve dönme katı hareketlerdir: iki nokta arasındaki uzaklığı, sıradan açı ölçülerini ve alanı korurlar. Şeklin ekrandaki yönü veya koordinatları değişebilir. Burada eksenlerin uzunluk birimleri eşittir; düşey ölçeği başka seçmek gerçek bir dönmeyi görsel olarak bozabilir.",
      ],
      [
        "Öteleme vektörünün iki bileşenini oku",
        "T_(h,k)(x; y)=(x+h; y+k) kuralında h yatay, k düşey yer değiştirmedir. h pozitifse sağa, negatifse sola; k pozitifse yukarı, negatifse aşağı gidilir. Örneğin (−2; 3) noktasına (5; −4) ekleyince (3; −1) bulunur. Yatay ve düşey hareketin ortak sonucu tek bir vektördür.",
        "(h; k), yeni noktanın koordinatı değil eklenen değişimdir. Her köşeye aynı vektör eklendiği için B′−A′=(B+v)−(A+v)=B−A olur. Bu eşitlik hem uzunluğun hem yönlü kenar vektörünün neden korunduğunu gösterir; şekil büyütülmez ve döndürülmez.",
      ],
      [
        "Önce görüntü verilirse tersini çıkar",
        "P′=P+v biliniyorsa P=P′−v yazılır. Görüntüden eski noktaya dönerken öteleme vektörünün iki işareti de değişir. P′(5; −1) ve v=(−2; 3) için P=(5−(−2); −1−3)=(7; −4) olur. Yalnız bir koordinatta işaret değiştirmek ters dönüşüm değildir.",
        "Ardışık iki öteleme v ve w ile yapılırsa sonuç P+v+w olur. Vektör toplama değişmeli olduğundan yalnız ötelemelerin sırası sonucu değiştirmez. Toplam vektör 0 ise her nokta ilk konumuna döner; tek bir özel sabit nokta değil bütün düzlem sabittir.",
      ],
      [
        "Şekli köşe köşe taşı, bağıntıyı geri denetle",
        "Bir üçgeni ötelemek için üç köşenin de apsisine h, ordinatına k eklenir; köşe adlarını A→A′, B→B′, C→C′ olarak koru. Karşılık gelen kenarların uzunlukları eşittir. Aynı yükseklikle alan da korunur; öteleme bir kenarı uzatıp ötekini kısaltmaz.",
        "Bir doğru veya eğriyi taşırken görüntü koordinatını eski denklemde doğrudan yerine yazamayız. X=x+h ve Y=y+k ise eski x=X−h, y=Y−k olur. Bu geri yerine koyma, bir noktanın koordinatına eklemek ile bir denklemin değişkeninden çıkarmak arasındaki farkı açıklar.",
      ],
      [
        "Doğru denkleminde geri yerine koyma",
        "d: ax+by+c=0 doğrusu (h; k) ötelenince görüntü doğrusu a(x−h)+b(y−k)+c=0 olur. Düzenlenmiş sabit c−ah−bk'dir; a ve b değişmediği için yön korunur. Örneğin 2x−y−3=0, (2; 1) ötelenince 2x−y−6=0 olur.",
        "Kontrol için eski doğru üzerindeki bir noktayı seçip ötele ve yeni denkleme koy. (0; −3) eski doğru üzerindedir; görüntüsü (2; −2), yeni denklemde 4+2−6=0 verir. Bu yol, sabit terimdeki işareti ezberlemekten daha güvenilirdir; a=b=0 ifadesi ise zaten tek bir doğru değildir.",
      ],
      [
        "Grafiği sağa taşırken parantezin içi neden eksi?",
        "y=f(x) grafiğini h sağa ve k yukarı taşımak g(x)=f(x−h)+k kuralını verir. Yeni x konumundaki yükseklik, eski x−h konumundan gelir. Bu nedenle nokta h eklenerek taşınırken kuralın içinde h çıkarılır. f(x)=x²+1 sağa 3 ve yukarı 2 ötelenince g(x)=(x−3)²+3 olur.",
        "Tanım kümesi de taşınır: eski x∈[−1,2] ise yeni x∈[−1+h,2+h] olur. Kuralı değiştirip eski aralığı aynen bırakmak aynı grafiği taşımış olmaz. Doğru, parabol veya parçalı grafik için bu geri izleme fikri aynıdır; yalnız biçim ezberi kullanılmaz.",
      ],
      [
        "Dönme için merkez, açı ve yön birlikte gerekir",
        "Dönmede noktanın seçili C merkezine uzaklığı sabit tutulur. Pozitif açı saatin tersine, negatif açı saat yönündedir. Aynı P ve aynı açı, başka merkez çevresinde başka görüntü verir. Bu yüzden yalnız “90° döndür” bilgisi, merkez belirtilmeden tek bir cevap belirlemeyebilir.",
        "Orijin çevresinde pozitif 90° için (x; y)→(−y; x), 180° için (−x; −y), 270° için (y; −x) olur. Saat yönündeki 90°, pozitif 270° ile aynı dönüşümdür. Hangi koordinatın yer değiştirdiğini ve hangisinin işaretinin döndüğünü birim eksen noktalarıyla kontrol edebilirsin.",
      ],
      [
        "Genel dönme bağıntısını yarıçap vektöründen kur",
        "Orijine göre α açısındaki dönme, x′=x cosα−y sinα ve y′=x sinα+y cosα verir. Bu bağıntı toplam açı formüllerinden çıkar: x=r cosθ, y=r sinθ iken yeni açı θ+α olur. Dereceyle verilen açıyı radyan isteyen bir hesap aracına doğrudan girmek farklı sonuç üretir.",
        "Uzunluk kontrolü x′²+y′²=x²+y² eşitliğidir; çapraz terimler birbirini götürür ve cos²α+sin²α=1 kalır. Modelde 90° katları tam işaret/yer değiştirme kuralıyla hesaplanır. Küçük yuvarlama artıklarını gerçek bir konum kayması gibi yorumlama; normal metin ve çizim aynı sayısal modele bağlıdır.",
      ],
      [
        "Merkez orijin değilse önce merkezi çıkar",
        "C(a; b) etrafında dönmek için P−C=(x−a; y−b) vektörünü bul, onu döndür ve C'yi geri ekle. Sonuç C+Rα(P−C)'dir. C(1; −1), P(4; 3) ve pozitif 90° için vektör (3; 4)→(−4; 3), dolayısıyla P′(−3; 2) olur.",
        "Merkezi çıkarmadan doğrudan orijin formülünü uygulamak başka bir dönmedir. Tersini bulmak için aynı merkezde −α kadar döndür; yarıçap |CP| değişmemelidir. Özellikle 180° dönme P′=2C−P'ye iner ve merkeze göre nokta simetrisiyle aynı sonucu verir.",
      ],
      [
        "Sabit nokta ile özdeşlik dönüşümünü ayır",
        "Açı 360°'nin tam katı değilse bir düzlemsel dönmenin değişmeden bıraktığı tek nokta merkezidir. Merkezde yarıçap 0 olduğu için hangi açı seçilirse seçilsin konum değişmez. Merkezden farklı noktanın yeri, bu özel olmayan açıda değişir.",
        "0°, 360° veya −720° gibi tam tur dönüşleri özdeşliktir: bütün noktalar sabittir. Bu durumda “yalnız merkez değişmez” demek doğru değildir. Bir görüntüde P=P′ görülmesi de tek başına açının 0 olduğunu kanıtlamaz; P merkezde bulunuyor olabilir.",
      ],
      [
        "Öteleme ve dönmede sıra genellikle önemlidir",
        "P(1; 2) önce (3; −1) ötelenip sonra orijinde 90° döndürülürse ara nokta (4; 1), sonuç (−1; 4) olur. Önce dönüp sonra ötelersen (−2; 1)+(3; −1)=(1; 0) bulunur. Aynı iki işlem, farklı sırada başka konum verir.",
        "Sıra farkının nedeni öteleme vektörünün de dönmeyle yön değiştirmesidir: R(P+v)=R(P)+R(v), fakat R(P)+v genellikle başka sonuçtur. “Genellikle” sözcüğü önemlidir; v=0 veya tam tur gibi özel durumlarda sonuçlar eşit olabilir. Modelde iki sıra aynı anda bağımsız hesaplanarak karşılaştırılır.",
      ],
      [
        "Bir dönüşüm zincirini ters sırayla geri al",
        "Önce T sonra R uygulanmışsa ilk konuma dönmek için önce R'nin tersini, sonra T'nin tersini uygula. Son yapılan işlem önce geri alınır. Bu ilke fonksiyon bileşkelerinde de karşına çıkar; soldan sağa okunan bir işlem listesiyle cebirsel bileşke yazımını dikkatle eşleştir.",
        "Son denetimde üç soru sor: Her köşeye aynı kuralı mı uyguladım, iki eksenin fiziksel ölçeği eşit mi, korunan kenar ve alanlar gerçekten aynı mı? Keşifte tahminini kaydetmek bu denetimi destekler; süre, tıklama veya modeli açmak bağımsız soru doğrusu, XP ya da konu tamamlama oluşturmaz.",
      ],
    ],
    examples: [
      [
        "Ötele ve başlangıca geri dön",
        "P(−2; 3) noktası v=(5; −4) ile öteleniyor. P′'yi ve görüntüden geri dönüşü bulun.",
        "İki bileşeni ayrı ekle; ters vektörü sonuçtan çıkar.",
        [
          "P′=(−2+5; 3−4)=(3; −1). Yatay değişim +5, düşey değişim −4'tür.",
          "Ters vektör (−5; 4) olur. P′+(−5; 4)=(−2; 3), başlangıç geri gelir.",
          "Öteleme uzunluğu √(5²+(−4)²)=√41 birimdir; bu P ile P′ arasındaki mesafedir, P′'nin orijine uzaklığı değildir.",
        ],
        "P′=(3; −1); ters öteleme (−5; 4)",
        "P′−P=(5; −4); iki koordinat farkı verilen vektörle aynı.",
        "Öteleme vektörünü görüntü noktasının koordinatı sanmak.",
      ],
      [
        "Orijin dışındaki merkezin çevresinde dön",
        "P(4; 3), C(1; −1) çevresinde pozitif 90° döndürülüyor. Görüntüyü bulun.",
        "Merkezi çıkar, göreli vektörü döndür, merkezi geri ekle.",
        [
          "P−C=(4−1; 3−(−1))=(3; 4). Merkezden noktaya yarıçap 5 birimdir.",
          "Pozitif 90° kuralı (3; 4)→(−4; 3) verir; eksen bileşenleri yer değiştirir.",
          "C+(−4; 3)=(−3; 2). Yeni yarıçap √((−3−1)²+(2+1)²)=5'tir.",
        ],
        "P′=(−3; 2)",
        "Aynı merkezde −90° geri dönme ilk P'yi verir.",
        "P'ye orijin dönüşümünü doğrudan uygulayıp C'yi yok saymak.",
      ],
      [
        "Sırayı iki ayrı hesapla gör",
        "P(1; 2) için T=(3; −1) ötelemesi ve orijinde pozitif 90° dönme var. İki olası işlem sırasının sonuçları nedir?",
        "Her sırada bir ara nokta yaz; iki zinciri karıştırma.",
        [
          "T sonra R: (1; 2)+(3; −1)=(4; 1), ardından R90(4; 1)=(−1; 4).",
          "R sonra T: R90(1; 2)=(−2; 1), ardından (−2; 1)+(3; −1)=(1; 0).",
          "Sonuçlar farklıdır. İlk zincirde v de R90(v)=(1; 3) yönüne döner; ikinci zincirde son öteleme hâlâ (3; −1)'dir.",
        ],
        "T→R: (−1; 4); R→T: (1; 0)",
        "Fark R(v)−v=(−2; 4), iki sonucun farkıyla aynı.",
        "Ötelemeler değişmeli diye öteleme ile dönmeyi de değişmeli sanmak.",
      ],
      [
        "Noktayı ekle, grafiğin içinde çıkar",
        "f(x)=x²−2x+3 grafiği 2 birim sağa ve 1 birim aşağı öteleniyor. Yeni g kuralı ve tepe noktası nedir?",
        "Geri giriş x−2, çıktı değişimi −1 kullan.",
        [
          "g(x)=f(x−2)−1=(x−2)²−2(x−2)+3−1 yazılır.",
          "Açınca g(x)=x²−6x+10=(x−3)²+1 bulunur. Eski f=(x−1)²+2'nin tepesi (1; 2)'dir.",
          "Tepe de aynı v=(2; −1) ile (3; 1)'e taşınır. Yeni kuralda g(3)=1 ve kare terimi en küçük 0'dır.",
        ],
        "g(x)=x²−6x+10; tepe (3; 1)",
        "Eski tepeye v eklemek ile yeni kuralı tam kare yapmak aynı noktayı verir.",
        "Sağa ötelemede f(x+2) yazıp grafiği sola taşımak.",
      ],
    ],
    recall: [
      ["Ötelemenin tersi?", "(h; k) yerine (−h; −k) eklemek."],
      ["Pozitif 90° orijin dönüşümü?", "(x; y)→(−y; x)."],
      [
        "C merkezli dönme nasıl kurulur?",
        "C+Rα(P−C): önce merkezi çıkar, sonra geri ekle.",
      ],
      [
        "360° dönmede yalnız merkez mi sabit?",
        "Hayır; bütün noktalar ilk konumundadır.",
      ],
      ["T sonra R'nin ters zinciri?", "Önce ters R, sonra ters T."],
    ],
    items: [
      [
        "P(−3; 4), (5; −6) vektörüyle öteleniyor. Görüntü hangisidir?",
        ["(2; −2)", "(−8; 10)", "(2; 10)", "(−8; −2)", "(5; −6)"],
        "Vektörü noktanın iki bileşenine ekle.",
        "P′=(−3+5; 4−6)=(2; −2). Sonuçtaki iki koordinat yeni konumdur; öteleme vektörü ise değişimdir. Aynı vektörü çıkarmak ters hareketi verir.",
      ],
      [
        "P noktası (−2; 3) ile ötelendiğinde P′(5; −1) oluyor. İlk P nedir?",
        ["(7; −4)", "(3; 2)", "(7; 2)", "(3; −4)", "(−7; 4)"],
        "P=P′−v yaz.",
        "P=(5−(−2); −1−3)=(7; −4). Geri kontrolde (7; −4)+(−2; 3)=(5; −1) olur. İki bileşenin de ters değişimi kullanılmalıdır.",
      ],
      [
        "P(2; −5) orijin çevresinde saatin tersine 90° döndürülüyor. Görüntü?",
        ["(5; 2)", "(−5; −2)", "(−2; 5)", "(−5; 2)", "(2; 5)"],
        "Pozitif 90° için (x; y)→(−y; x).",
        "(−(−5); 2)=(5; 2). Yarıçap karesi başlangıçta 4+25=29, görüntüde 25+4=29'dur. Saat yönündeki 90° farklı olarak (−5; −2) verir.",
      ],
      [
        "P(4; 3), C(1; 2) etrafında 180° döndürülüyor. Görüntü hangisi?",
        ["(−2; 1)", "(−4; −3)", "(2; −1)", "(6; 7)", "(−3; 4)"],
        "180° için merkez, P ile P′'nin orta noktasıdır.",
        "P′=2C−P=(2−4; 4−3)=(−2; 1). P ile P′'nin ortası ((4−2)/2; (3+1)/2)=(1; 2) çıkar; verilen merkez sağlanır.",
      ],
      [
        "P(1; 2) önce (3; −1) ile öteleniyor, sonra orijinde pozitif 90° döndürülüyor. Son nokta?",
        ["(−1; 4)", "(1; 0)", "(4; 1)", "(−2; 1)", "(1; −4)"],
        "Önce ara nokta (4; 1)'i bul.",
        "Ötelemeden sonra (4; 1), dönmeden sonra (−1; 4) olur. (1; 0), işlemlerin ters sırada yapılmasının sonucudur; sorudaki sırayı sağlamaz.",
      ],
      [
        "d: 2x+y−5=0 doğrusu (2; −3) vektörüyle öteleniyor. Görüntü doğru denklemi?",
        ["2x+y−6=0", "2x+y−4=0", "2x+y+6=0", "x+2y−6=0", "2x−y−6=0"],
        "Eski denklemde x yerine x−2, y yerine y+3 yaz.",
        "2(x−2)+(y+3)−5=0 düzenlenince 2x+y−6=0 çıkar. Normal katsayılar aynı kalır; öteleme doğrunun yönünü değiştirmez.",
      ],
      [
        "y=x²+1 grafiği 3 birim sağa, 2 birim yukarı öteleniyor. Yeni kural?",
        ["y=(x−3)²+3", "y=(x+3)²+3", "y=(x−3)²−1", "y=x²+6", "y=(x+2)²+4"],
        "Sağa hareket, kuralın girişinde x−3 demektir.",
        "g(x)=f(x−3)+2=(x−3)²+1+2=(x−3)²+3. Eski tepe (0; 1), yeni tepe (3; 3) olur ve istenen vektörle taşınır.",
      ],
      [
        "Düzlemde C sabit merkezi etrafında 360° dönme uygulanıyor. Hangi ifade doğrudur?",
        [
          "Bütün noktalar ilk konumuna döner.",
          "Yalnız C sabittir.",
          "Hiçbir nokta sabit kalmaz.",
          "Bütün noktalar C'ye gider.",
          "Yarıçaplar iki katına çıkar.",
        ],
        "Tam tur, özdeşlik dönüşümüdür.",
        "cos360°=1, sin360°=0; C+R360(P−C)=P. Her P sabittir. Yalnız merkezin sabit olması, tam tur olmayan bir dönmenin koşullu özelliğidir.",
      ],
      [
        "A(−1; 1), B(2; 5) aynı merkez çevresinde 37° döndürülüp ikisi de aynı vektörle öteleniyor. |A′B′| kaç birimdir?",
        ["5", "7", "√17", "25", "Merkez bilinmeden bulunamaz."],
        "Bu iki dönüşüm de uzaklığı korur.",
        "|AB|=√((2+1)²+(5−1)²)=√25=5. Dönme ve ortak öteleme bu uzunluğu değiştirmez; merkezi bilmek son koordinatlar için gerekir, korunmuş uzaklık için gerekmez.",
      ],
      [
        "Bir şekil önce C çevresinde pozitif 90°, ardından aynı C çevresinde pozitif 270° döndürülüyor. Sonuç?",
        [
          "Bütün noktalar ilk konumuna döner.",
          "Yalnız C ilk konumuna döner.",
          "180° dönme oluşur.",
          "(1; 1) ötelemesi oluşur.",
          "Şeklin alanı sıfırlanır.",
        ],
        "Aynı merkezli dönmelerin açıları toplanır.",
        "90°+270°=360°; aynı merkezde tam tur özdeşliktir. İki dönmede de yarıçap korunur ve sonuç her P için P olur. Merkezlerin aynı olduğu kökte özellikle verilmiştir.",
      ],
    ],
  },
  {
    id: "donusum-yansima-simetri",
    topic: "detail-406",
    subjectId: "ayt-geometri",
    title: "Yansıma ve simetri: aynayı eş uzaklıkla kur",
    minutes: 105,
    source:
      "Aurelia Geometri analitik ve dönüşümler sayfası; MEBİ AYT Matematik simetri ve bileşke dönüşümler; OGM Simetri Dönüşümü 1–2 ve Dersler Cepte Dönüşümler karşılaştırılarak hazırlanmış özgün öğretim, gerçek koordinat modelleri ve sorular. Sorular resmî sınav sorusu değildir.",
    objectives: [
      "Doğruya ve noktaya göre simetriyi farklı geometrik koşullarla kur.",
      "Genel doğruya indirilen gerçek dik ayaktan görüntü üret; yatay ve dikey durumları da kapsa.",
      "Görüntüden aynayı bul; yansıma bileşkesi ve yön değişimini uzunluk korunmasından ayır.",
    ],
    sections: [
      [
        "Ayna yalnız eş uzaklık değil orta dikmedir",
        "P noktasının d doğrusuna göre görüntüsü P′ ise d, [PP′] parçasının orta dikmesidir. Hem orta nokta d üzerinde olmalı hem PP′ doğruya dik olmalıdır. Sadece iki noktanın aynaya eşit uzaklıkta olması, onların birbirinin görüntüsü olduğunu kanıtlamaz; aynı taraftaki iki nokta da eş uzaklıkta bulunabilir.",
        "Doğru üzerindeki nokta yansımada yerinde kalır. P zaten d üzerindeyse P′=P ve dik ayak da P'dir; uzunluğu 0 olan parçaya çizimde rastgele bir açı yönü yüklemeyiz. Nokta aynadan uzaktaysa görüntü öteki yarı düzlemde aynı dik uzaklıkta bulunur.",
      ],
      [
        "Eksenler hangi koordinatı değiştirir?",
        "x eksenine göre yansıma (x; y)→(x; −y), y eksenine göre yansıma (x; y)→(−x; y) olur. Aynaya paralel bileşen korunur, dik bileşen işaret değiştirir. P(−2; 5) için x aynası (−2; −5), y aynası (2; 5) verir; iki görüntü farklıdır.",
        "Yatay y=k aynasında görüntü ordinatı 2k−y, apsis aynı kalır. Dikey x=h aynasında görüntü apsisi 2h−x, ordinat aynıdır. Bu biçimler yalnız orijin eksenleriyle sınırlı ezberi genişletir. Orta koordinatı hesapladığında sırasıyla k veya h geri gelmelidir.",
      ],
      [
        "Merkeze göre simetri bir yarım turdur",
        "P(x; y) noktasının C(a; b) merkezine göre simetriği P′(2a−x; 2b−y)'dir. C, [PP′]'nin orta noktasıdır. Doğru aynasından farklı olarak tek bir simetri merkezi vardır; bu dönüşüm aynı C etrafındaki 180° dönmeyle aynı etkiyi yapar.",
        "P(4; 3), C(1; −2) için P′=(−2; −7) bulunur. Orijin merkezinde iki koordinatın da işareti döner. Düzlemde merkeze göre simetri yönelimi korur; tek bir doğruya göre yansımaysa yönelimi ters çevirir. İkisinde de sıradan açı ölçüleri ve alan büyüklüğü korunur.",
      ],
      [
        "y=x ve y=−x aynalarını koordinatla denetle",
        "y=x doğrusuna göre yansıma (x; y)→(y; x), y=−x doğrusuna göre yansıma (x; y)→(−y; −x) verir. İlkinde iki koordinat yer değiştirir; ikincisinde yer değişimine iki eksi eklenir. Bir görüntü ararken hangi çapraz doğrunun ayna olduğunu açık seçmek gerekir.",
        "P(−2; 5)'in y=x görüntüsü (5; −2)'dir. Orta nokta (3/2; 3/2) ayna üzerindedir; PP′ yönü (7; −7), aynanın (1; 1) yönüne diktir. Doğrulama hem orta nokta hem diklik koşulunu kullanır; bir çizimde benziyor görünmesi tek başına kanıt değildir.",
      ],
      [
        "Genel doğru için önce normal yönü bul",
        "d: ax+by+c=0 ve a,b birlikte 0 değilken n=(a; b), d'ye dik bir yöndür. P'den indirilen H ayağını H=P−t(a; b), t=(a x_P+b y_P+c)/(a²+b²) ile buluruz. Bu normal yöntemi yatay ve dikey doğrularda da çalışır; tanımsız eğimle çarpma yapılmaz.",
        "Bağıntı H'yi doğruya koyarak türetilir: a(x_P−ta)+b(y_P−tb)+c=0. Buradan t bulunur. Paydanın pozitifliği normalin sıfır olmamasından gelir. a=b=0 ise denklem ya tüm düzlemi ya boş kümeyi verir, tek bir ayna doğrusu vermez; buna sahte bir H atanmaz.",
      ],
      [
        "Dik ayağı bulduktan sonra ikinci yarıyı tamamla",
        "H, P ile P′'nin orta noktası olduğundan P′=2H−P yazılır. Tek satırda P′=P−2t(a; b) olur. P(3; 4), d: 3x+4y−5=0 için t=20/25=4/5, H=(3/5; 4/5) ve P′=(−9/5; −12/5) bulunur.",
        "Üç bağımsız denetim yap: H doğru üzerinde mi, PH normal doğrultuda mı ve H=(P+P′)/2 mi? Ayrıca P ile P′'nin imzalı doğru değerleri birbirinin tersidir. Aynı d'nin bütün katsayılarını sıfır olmayan aynı sayıyla çarpmak H'yi ve P′'yi değiştirmemelidir; çizilen ayna aynıdır.",
      ],
      [
        "Görüntü çiftinden aynayı geri kur",
        "P ve P′ farklı iki nokta olarak verildiyse ayna onların orta dikmesidir. Orta H=(P+P′)/2, normal n=P′−P seçilebilir; d denklemi n·(X−H)=0'dır. Bu yöntem yatay ya da dikey PP′ için de ayrı eğim bölmesi gerektirmez.",
        "P=P′ ise tek bir yansıma doğrusu belirlenmez: P'den geçen her doğru P'yi sabit bırakır. Bir kaynakta yalnız aynı noktaya dönüş bilgisi verilmişse ek bir yön veya ikinci görüntü çifti gerekir. Model bu yetersizliği “ayna bulundu” diye orijinde rastgele bir çizgiyle kapatmaz.",
      ],
      [
        "Doğrunun merkeze göre görüntüsünü değişkenlerden çıkar",
        "d: ax+by+c=0 doğrusunu C(h; k) merkezine göre yansıtmak için eski koordinatları (2h−x; 2k−y) olarak yerine koyarız. Görüntü a(2h−x)+b(2k−y)+c=0 olur. Bütün katsayıları −1 ile çarparak aynı denklemi daha tanıdık biçimde yazabilirsin.",
        "C doğru üzerindeyse merkez simetrisi doğruyu kendisine götürür; iki ayrı paralel oluşmak zorunda değildir. C doğru dışında olduğunda d ile görüntüsü farklı paraleldir ve C'ye dik uzaklıkları eşittir. Sadece eğimlerin aynı olması çakışık durumun unutulmasına yol açmamalıdır.",
      ],
      [
        "Bir şeklin görüntüsü köşelerden kurulur",
        "Bir üçgeni yansıtmak için her köşeye aynı ayna kuralını uygula ve karşılıkları aynı sırayla işaretle. Kenar uzunlukları değişmez, alanın pozitif büyüklüğü korunur. Yalnız bir köşeyi öteki yana atmak aynı şeklin yansıması değildir; bütün geometrik bağlar birlikte taşınır.",
        "Tek doğru yansımasında A→B→C dolaşım yönü ters döner. Koordinatla hesaplanan işaretli iki kat alanın işareti değişirken mutlak alan aynı kalır. Bu, açıların büyüklüğü değişti demek değildir. Eşlik ile yönelimin aynı olması farklı özelliklerdir; bir ayna onları farklı etkiler.",
      ],
      [
        "İki paralel aynanın bileşkesi ötelemedir",
        "x=0 ve x=2 aynalarını sırayla uygula. İlkinde x→−x, ikincisinde −x→4+x olur; y değişmez. Sonuç (4; 0) ötelemesidir. P(1; 3) önce (−1; 3), sonra (5; 3) olur. Öteleme büyüklüğü aynalar arası uzaklığın iki katıdır.",
        "Aynaların sırasını ters çevirirsen x→4−x→x−4 ve öteleme yönü ters olur. Aynalar aynıysa iki yansıma özdeşliktir. Genel paralel doğrularda da hareket aynalara dik yöndedir; “iki yansıma her durumda orijine simetridir” gibi tek örneği genelleştiren kural kullanılmaz.",
      ],
      [
        "Kesişen aynalarda açı iki katıyla görünür",
        "Orijinden geçen x ekseni aynasından sonra y=x aynasını uygularsak (x; y)→(x; −y)→(−y; x) çıkar. Bu pozitif 90° dönmedir. Aynalar arasındaki 45° açı, bileşkede 90° olarak görünür; dönme merkezi aynaların kesimidir.",
        "İşlem sırasını değiştirmek bu örnekte −90° dönme verir. Genel sonucu kullanırken yönlü ayna açısı ve sıra önemlidir. İki yansıma yönelimi iki kez ters çevirdiğinden net yönelim korunur; paralel aynada öteleme, kesişen aynada dönme oluşması aynı düşünceyle bağlanır.",
      ],
      [
        "Geometriyi denklemle geri doğrula",
        "Çözümün sonunda yalnız yeni koordinatı yazmakla kalma: orta nokta aynada mı ve birleştiren parça dik mi kontrol et. Bir noktaya göre simetride ise orta nokta merkeze eşit olmalıdır. Nokta çifti aynıysa tek ayna belirlenmediğini ayrıca söyle; geçersiz doğru katsayılarıyla uzaklık veya yansıma formülü kullanma.",
        "Keşifte önce hangi koordinatın ya da yönün değişeceğini tahmin et, sonra gerçek H, P′ ve eş uzaklıkları karşılaştır. Açıklaman saklanır fakat otomatik doğruluk notu verilmez. Tıklamak, yansımayı izlemek veya gerekçe kaydetmek XP ve konu tamamlama sayılmaz; sonraki bağımsız soruda koşulu kurman önemlidir.",
      ],
    ],
    examples: [
      [
        "Eğik aynada gerçek dik ayak",
        "P(3; 4)'ün d: 3x+4y−5=0 doğrusuna göre simetriğini bulun.",
        "Önce normal izdüşüm katsayısı t, sonra H ve 2H−P.",
        [
          "t=(3×3+4×4−5)/(3²+4²)=20/25=4/5. Bu boyutsuz katsayı normalin ne kadar çıkarılacağını söyler.",
          "H=(3; 4)−(4/5)(3; 4)=(3/5; 4/5). H için 9/5+16/5−5=0 sağlanır.",
          "P′=2H−P=(6/5−3; 8/5−4)=(−9/5; −12/5). PH ve HP′ aynı doğru boyunca eşit uzunluktadır.",
        ],
        "P′=(−9/5; −12/5)",
        "İmzalı doğru payları P'de +20, P′'de −20 olur; uzaklıklar ikisinde de 4 birimdir.",
        "P'nin ordinatını değiştirip eğik aynayı x ekseni gibi kullanmak.",
      ],
      [
        "İki noktadan ayna denklemi",
        "P(−2; 1)'in bir doğruya göre yansıması P′(4; −3). Ayna denklemini bulun.",
        "Orta noktayı ve PP′ normalini birlikte kullan.",
        [
          "H=((−2+4)/2; (1−3)/2)=(1; −1). Ayna H'den geçmelidir.",
          "PP′ yönü (6; −4) olduğundan aynanın normali (6; −4) seçilebilir. 6(x−1)−4(y+1)=0 yazılır.",
          "Düzenle: 6x−4y−10=0, yani 3x−2y−5=0. P ile P′ farklı olduğu için bu orta dikme tektir.",
        ],
        "3x−2y−5=0",
        "P ve P′ için paylar −13 ve +13; iki dik uzaklık eşittir ve orta H doğru üzerindedir.",
        "Yalnız H'den geçen herhangi bir doğruyu ayna kabul etmek.",
      ],
      [
        "Bir doğruyu bir merkeze göre taşı",
        "d: 2x−y−4=0 doğrusunun C(1; 2) merkezine göre simetriği nedir?",
        "Eski değişkenler 2−x ve 4−y olur.",
        [
          "2(2−x)−(4−y)−4=0 ifadesi, eski doğru koşuluna görüntü koordinatlarını geri yerleştirir.",
          "4−2x−4+y−4=0, yani −2x+y−4=0 bulunur. Eşdeğer biçim 2x−y+4=0'dır.",
          "Eski doğru üzerindeki (2; 0)'ın görüntüsü 2C−(2; 0)=(0; 4)'tür; yeni denkleme koyunca 0−4+4=0 olur.",
        ],
        "2x−y+4=0",
        "İki doğru paraleldir; C'deki payların büyüklükleri eşittir ve işaretleri terstir.",
        "Nokta simetrisini yalnız ordinatın işaretini değiştirmek sanmak.",
      ],
      [
        "İki paralel aynanın sırası",
        "P(1; 3) önce x=0, sonra x=2 doğrusuna göre yansıtılıyor. Son konumu ve ters sıranın sonucunu bulun.",
        "Dikey aynada apsis 2h−x, ordinat aynı kalır.",
        [
          "İlk sıra: x=0 aynası P'yi (−1; 3)'e götürür; x=2 aynası (4−(−1); 3)=(5; 3) verir.",
          "Ters sıra: önce x=2 ile (3; 3), sonra x=0 ile (−3; 3) bulunur.",
          "Başlangıca göre değişimler sırasıyla (+4; 0) ve (−4; 0)'dır. İki yansıma ortak uzunlukları koruyan, ters yönlü iki öteleme üretir.",
        ],
        "İlk sıra (5; 3); ters sıra (−3; 3)",
        "Aynalar arası uzaklık 2; öteleme büyüklüğü 4 birimdir.",
        "Aynaların sırasının değişmediğini varsaymak.",
      ],
    ],
    recall: [
      [
        "Doğru aynası, PP′ için hangi iki koşulu sağlar?",
        "Orta noktadan geçer ve PP′'ye diktir.",
      ],
      ["C merkezli simetri kuralı?", "P′=2C−P; yarım turla aynı dönüşümdür."],
      [
        "Genel doğru normal yöntemi hangi durumu da kapsar?",
        "Yatay ve dikey aynaları; eğim bölmesi gerektirmez.",
      ],
      [
        "P=P′ tek bir ayna belirler mi?",
        "Hayır; P'den geçen farklı ayna doğruları mümkündür.",
      ],
      [
        "Bir doğru yansıması alanı değiştirir mi?",
        "Mutlak alanı korur, yönelimi ters çevirir.",
      ],
    ],
    items: [
      [
        "P(−2; 5)'in y=x doğrusuna göre görüntüsü hangisidir?",
        ["(5; −2)", "(−5; 2)", "(2; −5)", "(−2; −5)", "(2; 5)"],
        "y=x aynasında iki koordinat yer değiştirir.",
        "P′=(y; x)=(5; −2). Orta nokta (3/2; 3/2) ayna üzerindedir; PP′ yönü (7; −7), aynanın yönüne diktir. İki koşul birlikte sağlanır.",
      ],
      [
        "P(4; 3)'ün C(1; −2) noktasına göre simetriği nedir?",
        ["(−2; −7)", "(−4; −3)", "(2; 7)", "(−3; 4)", "(6; −1)"],
        "C, ilk nokta ile görüntünün orta noktasıdır.",
        "P′=2C−P=(2−4; −4−3)=(−2; −7). Ortası ((4−2)/2; (3−7)/2)=(1; −2) olur ve C'yi verir. Doğru aynası kuralıyla karıştırılmaz.",
      ],
      [
        "P(3; 4)'ün 3x+4y−5=0 doğrusuna göre yansıması hangisidir?",
        ["(−9/5; −12/5)", "(3/5; 4/5)", "(−3; −4)", "(9/5; 12/5)", "(3; −4)"],
        "H=P−[(3xP+4yP−5)/25](3; 4), sonra P′=2H−P.",
        "Pay 20, katsayı 4/5 ve H=(3/5; 4/5). Görüntü 2H−(3; 4)=(−9/5; −12/5) olur. H yalnız ayaktır, görüntü değildir; karşı tarafın eş uzaklık parçası da eklenmelidir.",
      ],
      [
        "P(−2; 1) bir doğruya göre yansıtılınca P′(4; −3) oluyor. Ayna hangisidir?",
        ["3x−2y−5=0", "3x−2y+5=0", "2x+3y+1=0", "x−y−2=0", "x+y=0"],
        "Orta H=(1; −1), normal yön (6; −4).",
        "6(x−1)−4(y+1)=0, sadeleştirilince 3x−2y−5=0. Bu doğru H'den geçer ve PP′'ye diktir. İki nokta farklı olduğundan orta dikme tektir.",
      ],
      [
        "d: y=2 doğrusunun x eksenine göre yansıması hangisidir?",
        ["y=−2", "x=2", "x=−2", "y=2", "y=x−2"],
        "Her (x; 2) noktası (x; −2)'ye gider.",
        "Apsis serbest kalır, ordinat −2 olur. Bu nedenle görüntü y=−2 yatayıdır. Doğrunun bir tek noktasını yansıtmak yerine bütün noktalarının sağladığı ortak denklem bulunur.",
      ],
      [
        "P(1; 3) önce x=0, sonra x=2 aynasına göre yansıtılıyor. Son konum?",
        ["(5; 3)", "(−3; 3)", "(3; 3)", "(−1; 3)", "(1; −3)"],
        "İlk görüntü (−1; 3); ikinci aynada 2h−x kullan.",
        "İkinci apsis 4−(−1)=5, ordinat 3'tür. Sonuç (5; 3), başlangıcın 4 birim sağındadır. Ters sıra (−3; 3) verir, kökteki sırayla aynı değildir.",
      ],
      [
        "P(2; −1), x=2 doğrusuna göre yansıtılıyor. Görüntü?",
        ["(2; −1)", "(−2; −1)", "(2; 1)", "(−2; 1)", "(4; −1)"],
        "P ayna üzerinde mi kontrol et.",
        "P'nin apsisi 2 olduğundan P aynanın üzerindedir. x′=4−2=2 ve y′=−1; nokta sabittir. Aynaya uzaklık 0 olduğu için görüntü başka tarafa sıçramaz.",
      ],
      [
        "Bir P noktasının bilinmeyen bir doğruya göre görüntüsü yine P. Yalnız bu veriden ne söylenebilir?",
        [
          "Ayna tek belirlenmez; P'den geçen farklı doğrular mümkündür.",
          "Ayna kesin x eksenidir.",
          "Ayna kesin y eksenidir.",
          "Ayna mutlaka P'den geçmez.",
          "Her doğru, P üzerinde olsun olmasın, aynı sonucu verir.",
        ],
        "Yansıma hangi noktaları sabit bırakır?",
        "Bir doğru yansımasının sabit noktaları ayna üzerindedir. P'den geçen her doğru P'yi sabit bırakır; bu nedenle tek bir doğru seçilemez. P'den geçmeyen ayna ise P'yi farklı bir noktaya götürür.",
      ],
      [
        "Alanı 6 birim kare olan bir üçgen tek bir doğruya göre yansıtılıyor. Alan büyüklüğü ve köşelerin dolaşım yönü için doğru yorum?",
        [
          "Alan 6 kalır; dolaşım yönü ters döner.",
          "Alan −6 olur; büyüklük negatiftir.",
          "Alan 12 olur; yön aynı kalır.",
          "Alan 0 olur; bütün köşeler aynadadır.",
          "Alan 6 kalır; her durumda dolaşım yönü de aynı kalır.",
        ],
        "İşaretli alan ile alan büyüklüğünü ayır.",
        "Doğru yansıması eşlik dönüşümüdür; kenar ve alan büyüklükleri korunur. İşaretli alanın işareti ters döndüğü için köşe dolaşım yönü değişir. Pozitif alan büyüklüğü yine 6'dır.",
      ],
      [
        "Bir noktayı 0x+0y+1=0 ifadesine göre doğru aynasında yansıtmak isteniyor. Doğru yaklaşım?",
        [
          "Bu ifade ayna doğrusu tanımlamaz; yansıma hesaplanamaz.",
          "Görüntü her zaman orijindir.",
          "Görüntü her zaman noktanın kendisidir.",
          "Eğim 0 alınarak x ekseni kullanılır.",
          "Normal (0; 0) ile bölüp sonsuz görüntü seçilir.",
        ],
        "Doğru için a ve b birlikte 0 olabilir mi?",
        "0x+0y+1=0 hiçbir noktada sağlanmaz; bir doğru değildir. Normalin normu da 0'dır. Görüntüye rastgele bir koordinat atamak yerine ayna verisinin geçersiz olduğu belirtilir.",
      ],
    ],
  },
  {
    id: "cemberin-analitigi",
    topic: "detail-407",
    subjectId: "ayt-geometri",
    title: "Çemberin analitiği: merkezden kesişime",
    minutes: 115,
    source:
      "Aurelia Geometri analitik çember bağıntısı; MEBİ AYT Matematik Çemberin Analitik İncelenmesi; OGM Çemberin Analitik İncelenmesi ile Doğru ve Çemberin Durumları sunuları karşılaştırılarak hazırlanmış özgün anlatım, modeller ve sorular. Sorular resmî sınav sorusu değildir.",
    objectives: [
      "Çember denklemini eş uzaklıktan kur; merkez ve yarıçapı standart/genel biçimde bul.",
      "Gerçek çember, tek nokta ve boş kümeyi ayır; teğetlikte mutlak uzaklığı kullan.",
      "Doğruyla ve ikinci çemberle ortak noktaları koşullarıyla belirle; gerçek dik ayak ve kiriş hesabını bağla.",
    ],
    sections: [
      [
        "Çember bir eş uzaklık kümesidir",
        "Düzlemde sabit M merkezine uzaklığı pozitif r olan bütün noktalar çemberi oluşturur. Çember yalnız sınırdır; içindeki bölgeyle birlikte disk başka kümedir. Bir P noktasının çemberde olup olmadığını |MP|=r, içeride olup olmadığını |MP|<r ile sınarız. Koordinat yöntemi bu uzaklık koşulunu denkleme dönüştürür.",
        "Merkez M(a; b) ve P(x; y) için |MP|²=(x−a)²+(y−b)² olduğundan standart denklem (x−a)²+(y−b)²=r²'dir. İki eksenin fiziksel birimi aynıysa çizim de daireseldir. Eksenlerden birini başka ölçekte çizmek aynı denklemden elips gibi görünen bir resim üretebilir; model ortak ölçek kullanır.",
      ],
      [
        "Standart denklemde merkezi ters işaretle oku",
        "(x−a)²+(y−b)²=r² biçiminde merkez (a; b)'dir. (x+2)²+(y−4)²=9 için merkez (−2; 4), yarıçap 3 olur. Sağdaki 9 yarıçap değil yarıçapın karesidir. Parantezdeki işaret, koordinattan merkezin çıkarılmasından gelir.",
        "Merkezi orijinde çember x²+y²=r² olur. Merkez x eksenindeyse b=0, y eksenindeyse a=0'dır. Bir merkezin eksen üzerinde bulunmasıyla çemberin o eksene teğet olması farklıdır; merkez eksendeyse pozitif yarıçaplı çember o ekseni iki noktada keser.",
      ],
      [
        "Merkez ve bir nokta yarıçapı belirler",
        "Merkez M ve çemberde bir P noktası biliniyorsa r=|MP| bulunur; sonra standart denklem yazılır. M(2; −1), P(5; 3) için fark (3; 4), r=5 ve denklem (x−2)²+(y+1)²=25 olur. Merkezin orijine uzaklığını yanlışlıkla r yerine kullanma.",
        "İki noktanın bir çapın uçları olduğu söylenmişse merkez onların orta noktası, yarıçap uçlar arası uzaklığın yarısıdır. Yalnız “çember üzerinde iki nokta” bilgisi aynı sonuca yetmez; o iki noktadan geçen farklı çemberler vardır. Çap veya merkez koşulu verilmeden tek bir denklem seçilmez.",
      ],
      [
        "Genel denklemi tam kareye tamamla",
        "Standart denklemi açınca x²+y²+Dx+Ey+F=0 elde edilir; D=−2a, E=−2b, F=a²+b²−r²'dir. Geri okumada merkez (−D/2; −E/2), yarıçap karesi (D/2)²+(E/2)²−F olur. İşaretleri ezberlemek yerine x²+Dx=(x+D/2)²−D²/4 yazabilirsin.",
        "x²+y²−6x+4y−12=0 için (x−3)²+(y+2)²=25 çıkar. Merkez (3; −2), r=5'tir. Tam kareye tamamlamada eklenen 9 ve 4 sağ tarafa doğru aktarılmalı; denklemde yalnız bir tarafa sayı eklemek aynı nokta kümesini korumaz.",
      ],
      [
        "Pozitif çember, tek nokta ve boş kümeyi ayır",
        "Genel denklemde r²>0 ise gerçek pozitif yarıçaplı çember vardır. r²=0 ise karelerin toplamı ancak merkezde 0 olur; çözüm tek noktadır. r²<0 ise gerçek iki karenin toplamı negatif olamayacağından çözüm yoktur. Sayısal model bu üç durumu ayrı gösterir; negatif sayının kökünü çizime sokmaz.",
        "Örneğin x²+y²−4x+6y+13=0, (x−2)²+(y+3)²=0 biçiminde yalnız (2; −3)'ü verir. Sabit 14 yapılırsa sağ taraf −1 olur ve küme boştur. “Her x²+y² içeren denklem bir çemberdir” demeden önce yarıçap karesinin işaretini denetle.",
      ],
      [
        "İkinci derece katsayıları da bir koşuldur",
        "Ax²+By²+Cxy+Dx+Ey+F=0 ifadesinin çember biçimine dönüşebilmesi için ikinci derece katsayılar A=B≠0 ve çapraz katsayı C=0 olmalıdır. Önce bütün denklemi ortak A'ya böl, sonra tam kare ve r² koşulunu incele. Yalnız A=B demek tek başına pozitif çember kanıtı değildir.",
        "A=B=0 halinde ikinci derece yapı yoktur; kalan ifade doğru, tüm düzlem veya boş küme olabilir. Çapraz terim varsa eksenlere göre standart çember formülünü uygulamak doğru değildir. Parametreli soruda katsayı şartlarını ve yarıçapın pozitifliğini birbirinden ayrı adımlar olarak çöz.",
      ],
      [
        "Noktanın yerini kareli uzaklıkla karşılaştır",
        "P için s=(x_P−a)²+(y_P−b)² hesapla. s=r² çember üzerinde, s<r² içerde, s>r² dışarda demektir. Kareli karşılaştırma gereksiz karekökü kaldırır; iki taraf da negatif olmayan büyüklüklerdir. Nokta çember denklemini sağlıyorsa sınırdadır, sırf çizimde içeride görünmesine güvenilmez.",
        "Bir koordinat bilinmiyorsa denklem bazen iki, bir veya hiç gerçek çözüm verir. x=a+r doğrusu sağ uçta yalnız y=b noktasına teğettir; x=a için y=b±r iki noktası vardır. ± işaretini tek kök gibi bırakmak veya negatif çözümü gerekçesiz elemek eksik cevap üretir.",
      ],
      [
        "Eksen teğetliğinde koordinatın mutlak değerini kullan",
        "M(a; b) merkezinin y eksenine uzaklığı |a|, x eksenine uzaklığı |b|'dir. Teğetlikte r bu uzaklığa eşittir. Merkez soldaysa a negatif olabilir fakat yarıçap negatif olmaz; r=a veya r=b kısaltması işaret koşulu olmadan genellenmez.",
        "İki eksene de teğetse |a|=|b|=r olur. Dört bölge için merkezler (r; r), (−r; r), (−r; −r), (r; −r)'dir. Bölge bilgisi ve merkezin üzerinde bulunduğu doğru gibi ek veri birlikte kullanılabilir; hangi teğet noktasının hangi eksende olduğunu çizimde adlandır.",
      ],
      [
        "Doğru ile çemberi önce merkez uzaklığıyla karşılaştır",
        "d: ux+vy+w=0 gerçek doğrusuna merkezin dik uzaklığı δ=|ua+vb+w|/√(u²+v²)'dir. δ>r ise ortak nokta yok, δ=r ise bir teğet noktası, δ<r ise iki kesişim vardır. Burada δ uzunluktur; imzalı payın negatif olması negatif uzaklık anlamına gelmez.",
        "Bu yöntem dikey x=h ve yatay y=k doğrularında da geçerlidir. Y=mx+n biçimini zorunlu tutmak dikeyi dışarıda bırakır. u=v=0 olunca denklem doğru tanımlamaz; model bu geçersiz doğru verisini gerçek çember-doğru durumundan ayrı tutar ve sahte kesim noktası çizmez.",
      ],
      [
        "Gerçek dik ayaktan kiriş uçlarına geç",
        "H, merkezden d'ye indirilen ayak olsun. Kesim varsa H kirişin orta noktasıdır; yarım kiriş uzunluğu t=√(r²−δ²) olur. Doğrunun birim yönü (−v; u)/√(u²+v²) seçilirse iki uç H±t·yön ile bulunur. Bu hem konumu hem gerçek uzaklığı aynı geometriye bağlar.",
        "M(2; 1), r=5 ve x=5 için δ=3, H(5; 1), t=4 olur. Kesimler (5; 5) ve (5; −3), kiriş 8 birimdir. Teğette t=0 olduğundan iki ayrı uç değil bir ortak nokta kalır. Karekökte r²−δ² negatifse kesim varsayımı zaten geçersizdir.",
      ],
      [
        "Ortak çözüm ve diskriminant aynı geometriyi sınar",
        "Dikey olmayan d için y=mx+n kuralını çember denklemine koyunca x'te ikinci derece denklem elde edilir. Diskriminant pozitifse iki, 0 ise bir, negatifse hiç gerçek kesim yoktur. Bu sonuç merkez uzaklığı ölçütüyle aynı durumu başka cebirsel yoldan verir.",
        "İki kök bulunduğunda her kökü doğru denklemine geri koyarak y'yi bul ve iki ilk denklemi de denetle. Dikey doğruda x sabittir; bu kez y'yi çözmek daha uygundur. Hesaptaki aynı kökü iki kez listelemek iki farklı ortak nokta olduğu anlamına gelmez.",
      ],
      [
        "Teğet doğru yarıçapa diktir",
        "Çember üzerindeki P(x₀; y₀) noktasındaki teğetin normali MP=(x₀−a; y₀−b)'dir. Dolayısıyla teğet (x₀−a)(x−x₀)+(y₀−b)(y−y₀)=0 olur. Orijin merkezli x²+y²=r² için bu, x₀x+y₀y=r² biçimine iner.",
        "P'nin gerçekten çemberde olduğu önceden denetlenmelidir. İçerideki herhangi bir noktayı aynı formüle koymak oradan geçen bir teğet üretmez. P merkezle aynıysa pozitif çember üzerinde değildir; normal sıfır olur. Teğetlik bir doğru ile pozitif yarıçaplı çemberin tek temas koşuludur.",
      ],
      [
        "İki çemberde merkez uzaklığı iki yarıçapla yarışır",
        "Merkezler arası d, yarıçaplar r ve s olsun. d>r+s dış ayrılık; d=r+s dış teğetlik; |r−s|<d<r+s iki kesişim; d=|r−s|>0 iç teğetlik; d<|r−s| iç içe ayrılık verir. Eş merkezli ve eş yarıçaplı pozitif çemberler ise çakışıktır, yalnız bir temas noktası yoktur.",
        "Merkezler aynı olduğunda d'ye bölerek kesim bulma formülüne girilmez. Sıfır yarıçaplı denklem bir nokta olduğu için pozitif çemberler için kullanılan “sonsuz ortak nokta” sonucu ona taşınmaz. Model bu nokta/çember ayrımını açık adlandırır; ayrık çemberlerde yine de sahte bir orta nokta işaretlemez.",
      ],
      [
        "Denklem, uzaklık ve çizim birbirini denetlesin",
        "Sonucu üç ayrı yoldan kontrol edebilirsin: merkez ve r'yi tam kareden çıkar, seçili ortak noktaları iki denkleme de koy, çizimde yarıçap ile dik uzaklık ve kiriş ölçülerini karşılaştır. Model eğrisinin her ekseninde aynı birim kullanılması bu üçüncü kontrolü anlamlı kılar.",
        "Keşifte bir değişkeni değiştirirken önce ortak nokta sayısını tahmin et ve gerekçeni yaz. Çemberin kaybolması negatif yarıçap karesi veya pencere dışı geometri gibi farklı nedenlere bağlı olabilir; durum metni hangisi olduğunu söylemelidir. Keşif kaydı XP ya da tamamlanmış soru değildir; farklı verili bağımsız soruyu çözmek ayrı kanıttır.",
      ],
    ],
    examples: [
      [
        "Genel denklemden merkez ve yarıçap",
        "x²+y²−6x+4y−12=0 çemberinin merkezini, yarıçapını ve (8; −2)'nin durumunu bulun.",
        "İki değişken için ayrı tam kare oluştur.",
        [
          "x²−6x=(x−3)²−9, y²+4y=(y+2)²−4. Denklem (x−3)²+(y+2)²=25 olur.",
          "M=(3; −2), r=√25=5. Sağ taraf pozitif olduğu için gerçek pozitif yarıçaplı çember vardır.",
          "P(8; −2) için kareli uzaklık (8−3)²+(−2+2)²=25; bu r²'ye eşit, nokta çember üzerindedir.",
        ],
        "M(3; −2), r=5; P çember üzerindedir",
        "Standart denklemi açınca ilk genel denklem geri elde edilir.",
        "Merkezi (−3; 2) veya yarıçapı 25 okumak.",
      ],
      [
        "Dikey kesenden gerçek kirişe",
        "M(2; 1) merkezli, yarıçapı 5 olan çemberin x=5 doğrusu ile ortak noktalarını ve kiriş uzunluğunu bulun.",
        "Önce merkezden doğruya 3 birim uzaklık, sonra dik üçgen.",
        [
          "x=5 doğrusunun ayağı H(5; 1); |MH|=3<5 olduğundan doğru iki noktada keser.",
          "Yarım kiriş √(5²−3²)=4. H'den doğru boyunca yukarı/aşağı 4 gidince (5; 5), (5; −3) bulunur.",
          "Kiriş uzunluğu 4+4=8 birimdir. Her uç için (x−2)²+(y−1)²=9+16=25 ve x=5 birlikte sağlanır.",
        ],
        "(5; 5) ve (5; −3); kiriş 8 birim",
        "Merkez–ayak–uç dik üçgeninde 3–4–5 uzunlukları bulunur.",
        "Dikeyi y=mx+n biçimine zorlayıp tanımsız eğim kullanmak.",
      ],
      [
        "İki eksene teğetlik ve bölge",
        "Bir çember iki eksene teğet, merkezi IV. bölgede ve 2x+y−3=0 doğrusu üzerinde. Denklemi nedir?",
        "IV. bölgede merkezi (r; −r), r>0 yaz.",
        [
          "İki eksene uzaklıklar eşit olduğundan |a|=|b|=r. IV. bölgede a=r, b=−r olur.",
          "Merkez doğru üzerinde: 2r+(−r)−3=0; r=3. Merkez M(3; −3)'tür.",
          "Denklem (x−3)²+(y+3)²=9. Teğet noktaları (3; 0) ve (0; −3); merkezden uzaklıkları 3'tür.",
        ],
        "(x−3)²+(y+3)²=9",
        "Merkez hem 2x+y−3=0 koşulunu hem IV. bölgeyi sağlar.",
        "IV. bölgede ordinatı +r seçmek veya negatif yarıçap kullanmak.",
      ],
      [
        "Çember gibi başlayan denklem tek nokta olabilir",
        "2x²+2y²−8x+12y+26=0 hangi gerçek nokta kümesini verir? Sabit 28 olsaydı ne değişirdi?",
        "Önce ortak 2'ye böl, sonra karelerin toplamını incele.",
        [
          "İlk denklem x²+y²−4x+6y+13=0 olur. Tam kareyle (x−2)²+(y+3)²=0 elde edilir.",
          "İki kare de 0 olmalı: yalnız (2; −3) vardır. Pozitif yarıçaplı bir çember değil, tek noktadır.",
          "Sabit 28 ile ortak 2'den sonra +14 gelir; sağ taraf −1 olur. Gerçek kareler toplamı −1 olamayacağından çözüm kümesi boştur.",
        ],
        "26 ile tek nokta (2; −3); 28 ile boş küme",
        "Merkez ifadesi her iki denklemde de (2; −3), fakat r² sırasıyla 0 ve −1'dir.",
        "r²=0 durumuna sonsuz noktalı çember, r²<0 durumuna negatif yarıçap demek.",
      ],
    ],
    recall: [
      ["Standart çember denklemi?", "(x−a)²+(y−b)²=r², r>0."],
      ["Genel denklemde merkez ve r²?", "(−D/2; −E/2), r²=(D/2)²+(E/2)²−F."],
      [
        "r²=0 neyi verir?",
        "Yalnız merkez noktasını; pozitif yarıçaplı çemberi değil.",
      ],
      [
        "Merkezden doğruya uzaklık r'den küçükse?",
        "İki ortak nokta; H kirişin ortasıdır.",
      ],
      [
        "İki eksene teğetlik koşulu?",
        "|a|=|b|=r; bölge işaretleri ayrıca seçilir.",
      ],
    ],
    items: [
      [
        "x²+y²−6x+4y−12=0 çemberinin merkezi ve yarıçapı hangisidir?",
        [
          "M(3; −2), r=5",
          "M(−3; 2), r=5",
          "M(3; −2), r=25",
          "M(6; −4), r=5",
          "M(3; 2), r=√12",
        ],
        "İki tam kareyi kurup sağ tarafa eklenenleri say.",
        "(x−3)²+(y+2)²=12+9+4=25. Merkez (3; −2), yarıçap 5'tir. Katsayıların yarısını ters işaretle okumak, aynı tam kare işleminin kısa sonucudur.",
      ],
      [
        "Merkezi M(−2; 4), yarıçapı 3 olan çemberin denklemi hangisidir?",
        [
          "(x+2)²+(y−4)²=9",
          "(x−2)²+(y+4)²=9",
          "(x+2)²+(y−4)²=3",
          "(x−2)²+(y−4)²=9",
          "x²+y²=9",
        ],
        "Noktadan merkezin koordinatlarını çıkar.",
        "Uzaklık koşulu (x−(−2))²+(y−4)²=3² verir. Parantezler (x+2),(y−4), sağ taraf 9 olur. Merkez orijinde olmadığı için x²+y²=9 aynı çember değildir.",
      ],
      [
        "(x−2)²+(y−1)²=25 çemberi x=5 doğrusunu hangi iki noktada keser?",
        [
          "(5; 5) ve (5; −3)",
          "(5; 4) ve (5; −4)",
          "(2; 6) ve (2; −4)",
          "(5; 1) ve (5; −1)",
          "Ortak nokta yoktur.",
        ],
        "x=5 koy; (y−1)²=16 kalır.",
        "(5−2)²=9, dolayısıyla (y−1)²=25−9=16. y−1=±4 ve y=5 veya −3. İki farklı çözüm de x=5'i ve çemberi sağlar; kiriş ortası (5; 1)'dir.",
      ],
      [
        "x²+y²+4x−6y+13=0 denkleminin gerçek çözüm kümesi nedir?",
        [
          "Yalnız (−2; 3) noktası.",
          "Merkezi (−2; 3), yarıçapı 13 olan çember.",
          "Boş küme.",
          "Bütün düzlem.",
          "x+y=1 doğrusu.",
        ],
        "Tam kareden sonra sağ tarafın işaretini incele.",
        "(x+2)²+(y−3)²=4+9−13=0. İki kare ancak x=−2,y=3 için birlikte 0 olur. Bu tek nokta, pozitif yarıçaplı sonsuz noktalı çember değildir.",
      ],
      [
        "x²+y²+4x−6y+14=0 gerçek düzlemde ne belirtir?",
        [
          "Boş küme.",
          "Yalnız (−2; 3).",
          "Yarıçapı 1 olan çember.",
          "Yarıçapı −1 olan çember.",
          "x=−2 doğrusu.",
        ],
        "Kareler toplamını yalnız bırak.",
        "(x+2)²+(y−3)²=4+9−14=−1 çıkar. Gerçek karelerin toplamı negatif olamaz; çözüm yoktur. Negatif sağ taraf, negatif yarıçaplı çember diye yorumlanmaz.",
      ],
      [
        "İki eksene teğet bir çemberin merkezi IV. bölgede ve 2x+y−3=0 üzerinde. Yarıçap kaç birimdir?",
        ["3", "1", "2", "−3", "6"],
        "Merkezi (r; −r), r>0 biçiminde yaz.",
        "Teğetlik |a|=|b|=r; IV. bölge (r; −r) verir. 2r−r−3=0'dan r=3. Negatif −3 bir yarıçap olamaz; bölge işareti koordinatlarda kullanılır.",
      ],
      [
        "Merkezleri (0; 0) ve (6; 0), yarıçapları ayrı ayrı 5 olan iki çemberin ortak noktaları hangisidir?",
        [
          "(3; 4) ve (3; −4)",
          "(0; 5) ve (6; 5)",
          "Yalnız (3; 0)",
          "Ortak noktaları yoktur.",
          "Bütün noktaları ortaktır.",
        ],
        "İki denklemi çıkarıp x'i bul.",
        "x²+y²=25 ile (x−6)²+y²=25 çıkarılınca −12x+36=0 ve x=3. y²=25−9=16, y=±4. Merkez uzaklığı 6, yarıçapların toplamı 10'dan küçük olduğu için iki kesimle uyumludur.",
      ],
      [
        "x²+y²=25 çemberi ile 3x+4y−25=0 doğrusunun durumu ve ortak noktası hangisidir?",
        [
          "Teğettir; (3; 4).",
          "İki noktada keser; (3; ±4).",
          "Ortak nokta yoktur.",
          "Çakışıktır; sonsuz nokta.",
          "Teğettir; (4; 3).",
        ],
        "Merkezin doğruya uzaklığını 5 ile karşılaştır.",
        "O'dan doğruya uzaklık |−25|/√25=5=r. Ayak (3; 4)'tür; 3²+4²=25 ve 9+16−25=0 sağlanır. (4; 3) çemberdedir fakat doğru üzerinde değildir.",
      ],
      [
        "x²+y²=25 çemberine P(3; 4) noktasında çizilen teğet hangisidir?",
        ["3x+4y=25", "4x+3y=25", "3x−4y=25", "x+y=7", "y=4"],
        "Teğetin normali OP=(3; 4)'tür.",
        "3(x−3)+4(y−4)=0, yani 3x+4y=25. Doğru P'den geçer ve (3; 4) yarıçapına diktir. Yalnız P'den geçen başka bir doğru teğet olmak zorunda değildir.",
      ],
      [
        "(k−1)x²+2y²+mxy−8=0 denklemi pozitif yarıçaplı bir çember belirtiyor. (k; m) hangisidir?",
        ["(3; 0)", "(1; 0)", "(2; 0)", "(3; 2)", "(−1; 0)"],
        "İki kare katsayısı eşit ve sıfırdan farklı, çapraz katsayı 0 olmalı.",
        "k−1=2 ve m=0 gerekir; k=3. Denklem 2x²+2y²−8=0, yani x²+y²=4 olur; r=2>0 da sağlanır. Katsayı eşitliği tek başına yetmediği için yarıçap koşulu ayrıca kontrol edildi.",
      ],
    ],
  },
  {
    id: "ayt-fonksiyonlar",
    topic: "detail-463",
    subjectId: "ayt-matematik",
    title: "AYT fonksiyonlar: kural, küme ve işlem sırası",
    minutes: 130,
    source:
      "MEBİ TYT Matematik fonksiyon temel tanım, işlem, grafik, bileşke ve ters bölümleri ile MEBİ AYT Matematik grafik uygulamaları/dönüşümleri; OGM Dersler Cepte Fonksiyonlar'ın gerçek şema ve formülleri karşılaştırılarak hazırlanmış kapsamlı özgün öğretim. Kaynaklardaki bileşke yönü ve genel görüntü kısa yolu koşulları doğru tanımla ayrılmıştır. Sorular resmî sınav sorusu değildir.",
    objectives: [
      "Tanım, değer ve görüntü kümelerini ayır; bir bağıntının gerçekten fonksiyon oluşunu denetle.",
      "İşlemlerde ve bileşkede tanım kümesini koru; içten dışa doğru hesapla.",
      "Tersin varlık koşulunu, aralık kısıtlamasını ve grafik/cebir bağlantısını kullan.",
      "Parçalı kural, görüntü, tek-çift özellikleri ve grafik dönüşümlerini koşullarıyla açıkla.",
    ],
    sections: [
      [
        "Fonksiyon tek bir çıktı kuralıdır",
        "f:A→B gösteriminde A'daki her eleman B'den bir ve yalnız bir elemana eşlenmelidir. Tanımda iki ayrı koşul vardır: hiçbir giriş açıkta kalmayacak ve bir girişe iki farklı çıkış atanmayacaktır. Farklı iki girişin aynı çıktıya gitmesi ise fonksiyon olmayı bozmaz; yalnız bire bir olma özelliğini etkileyebilir.",
        "A tanım kümesi, B değer kümesi, f(A) gerçekte erişilen görüntü kümesidir; f(A)⊆B. Bu üç ad aynı kümenin farklı isimleri değildir. Bir kuralın değişkenini yazarak B'yi değiştirmiş olmazsın; örneğin x²'nin negatif çıktı vermemesi, B=R seçilemeyeceği değil bu seçime göre örten olmadığı anlamına gelir.",
      ],
      [
        "Girdi, çıktı ve kuralın değişkeni",
        "f(3), f kuralına 3 girişinin verilmesiyle çıkan sayıdır; 3f(x) ise çıktının 3 katıdır. f(x+2) girişteki değişimi, f(x)+2 çıktıdaki değişimi gösterir ve genellikle aynı değildir. f(t)=t²+4 için f(x+2)=(x+2)²+4, f(x)+2=x²+6 olur.",
        "Kural f(2x−1) üzerinden verilmişse istenen girdiyi paranteze eşitle. f(2x−1)=4x²−4x+5=(2x−1)²+4 olduğundan t=2x−1 ile f(t)=t²+4 bulunur. x'in değişken adı olması sonucu değiştirmez; fakat yeni girişin tanım kümesinde bulunması gerekir.",
      ],
      [
        "Bire bir ve örten iki farklı koşuldur",
        "Bire bir fonksiyonda farklı girişlerin görüntüleri farklıdır: f(x₁)=f(x₂) ancak x₁=x₂ iken olur. Örtenlikte değer kümesinin her elemanı en az bir girişten erişilir; f(A)=B gerekir. Birden fazla girişin aynı çıktıyı paylaşması örtenliği tek başına bozmaz, bire birliği bozar.",
        "A={−1,0,1}, B={0,1}, f(x)=x² için çıktılar 1,0,1'dir. B'nin tamamı erişildiği için örten, −1 ve 1 aynı çıktıda birleştiği için bire bir değildir. B'ye 2 eklemek kuralı değiştirmez fakat örtenliği değiştirir; özellikler yalnız formüle değil seçili kümelere de bağlıdır.",
      ],
      [
        "Birim, sabit ve doğrusal kuralları ayır",
        "Birim fonksiyon I:A→A, I(x)=x kuralıdır; her giriş kendisine döner. Sabit f(x)=c kuralında bütün girişler aynı c∈B'ye gider. Tanım kümesi birden çok elemanlıysa sabit fonksiyon bire bir değildir. Tek elemanlı tanım kümesi bu sonucun özel istisnasıdır; küme koşulu unutulmaz.",
        "Gerçek sayılarda f(x)=mx+n doğrusal kuralında m≠0 ise bire bir ve R'ye örtendir; ters kuralı bulunabilir. m=0 olunca sabit kural kalır. Bir fonksiyonla birimin bileşkesi f'yi verir: f∘I=I∘f=f. Sonucu sırf birim işlem kullanıldı diye I sanmak doğru değildir.",
      ],
      [
        "Tanım kümesini işlemden önce koru",
        "Toplam, fark ve çarpım için f ile g'nin ortak tanımlı girişleri alınır. Bölümde buna g(x)≠0 koşulu eklenir. Örneğin f(x)=x+1 ve g(x)=x−3 gerçek kurallarıyla f/g=(x+1)/(x−3), x≠3 olur. Sadeleşen bir çarpan bile başlangıçtaki dışlanan girdiyi otomatik geri getirmez.",
        "Karekök içi negatif olamaz, payda 0 olamaz; bu kısıtlar birlikte çözülür. Bir fonksiyonun doğal tanım kümesiyle soruda ayrıca verilmiş dar aralık farklı olabilir. Sadece formülü inceleyip açıkça belirtilmiş [0,2] gibi aralığı R'ye genişletmek başka bir fonksiyon seçmek olur.",
      ],
      [
        "Bileşkeyi içteki kuraldan başlat",
        "f:A→B ve g:B→C için ileri yol x→f(x)→g(f(x)) olur; gösterim (g∘f)(x)'tir. Sağdaki iç fonksiyon önce uygulanır. (f∘g)(x) ise ters işlem sırasıdır ve ayrıca g'nin çıktılarının f'nin tanım kümesine uygun olması gerekir; iki sıranın tanım kümeleri farklı olabilir.",
        "Örneğin f(x)=2x+1, g(x)=1/(x−3) için g(f(x))=1/(2x−2), x≠1; f(g(x))=2/(x−3)+1, x≠3 olur. Bir sırada iç kuralın geçerli olması yetmez, çıkan ara değerin dış kuralın yasak girdisi olmaması da denetlenir.",
      ],
      [
        "Bileşke özelliklerini doğru kapsamda kullan",
        "Bileşke genelde değişmeli değildir: f∘g ile g∘f'nin eşit olması gerekmez. Bu, her f ve g için mutlaka farklı oldukları demek değildir; birimle bileşke veya bazı özel kurallar eşitlik sağlayabilir. Uygun tanım kümelerinde birleşme özelliği vardır: f∘(g∘h)=(f∘g)∘h.",
        "Ters işlem sırası gibi bileşke zincirinde de parantez içten dışa açılır. İki bire bir fonksiyonun uygun ileri bileşkesi bire birdir; iki örten fonksiyonun aynı şekilde uygun bileşkesi örtendir. Bunlar verilen küme yönleri sağlanırken kullanılır; geçersiz ara çıktıyla yalnız sembolleri yan yana yazmak fonksiyon üretmez.",
      ],
      [
        "Ters fonksiyonun varlığı bir koşuldur",
        "f:A→B bire bir ve örtense her y∈B'nin tek bir eski girdisi vardır; f⁻¹:B→A bu girdiyi geri verir. f⁻¹(f(x))=x ve f(f⁻¹(y))=y eşitlikleri iki yönü de denetler. Üstteki −1 burada ters fonksiyon işaretidir, 1/f(x) çarpımsal tersi değildir.",
        "Bir fonksiyon B'nin tamamına örten değilse B'den A'ya ters oluşmaz; uygun durumda değer kümesini f(A)'ya daraltarak ters incelenebilir. Bire bir değilse farklı girdiler aynı çıktıda birleştiği için geri dönüş tek değerli olamaz. x²:R→[0,∞) örten olduğu hâlde bire bir olmadığı için tersi fonksiyon değildir.",
      ],
      [
        "Aralığı kısıtlayarak ters seç",
        "x² kuralı [0,∞)→[0,∞) biçiminde seçilirse bire bir ve örtendir, tersi √x olur. (−∞,0] dalı seçilirse ters −√x'tir. Aynı cebirsel kural, başka tanım kümesinde başka ters davranışına sahiptir. Her karekök çözümünde iki işareti koşulsuz almak bu dal seçimini yok sayar.",
        "Doğrusal f(x)=mx+n, m≠0 için y=mx+n'den x=(y−n)/m bulunur. Değişken adını sonradan x yaparak f⁻¹(x)=(x−n)/m yazılır. f⁻¹'in tanım kümesi eski görüntü, görüntüsü eski tanım kümesidir; bu değişim formül bulunduktan sonra unutulmamalıdır.",
      ],
      [
        "Kesirli doğrusal kuralda payda ve determinant",
        "f(x)=(ax+b)/(cx+d) için cx+d≠0 gerekir. ad−bc≠0 ve uygun doğal kümeler seçildiğinde tersi f⁻¹(y)=(dy−b)/(a−cy) olur. Bu, y(cx+d)=ax+b eşitliğinde x'i yalnız bırakarak bulunur; paydanın sıfır olduğu y değeri tersin tanımından çıkarılır.",
        "ad−bc=0 ise kural, tanımlı girişlerinde sabit olabilir; bir sadeleşme deliği kalan noktayı geri getirmez. c=d=0 ise hiçbir gerçek girişte payda tanımlı değildir ve burada kullanılan boş olmayan tanım kümeli fonksiyon modeli kurulamaz. Model bu sınırları doğrudan gösterir; ters için sıfıra bölüp sahte 0 döndürmez.",
      ],
      [
        "Grafik noktaları ve iki doğru testi",
        "f grafiği, tanım kümesindeki her x için (x; f(x)) noktalarının tamamıdır. Düşey doğru testi bir girişte tam bir görüntü bulunmasını sınar. Bir çemberin tam sınırı çoğu düşeyde iki noktaya sahip olduğu için y=f(x) biçiminde tek fonksiyon değildir; üst yarısı uygun aralıkta olabilir.",
        "Yatay doğru grafiği en fazla bir noktada kesiyorsa bire birlik sağlanır. Örtenlik, B'deki her y seviyesinin en az bir kez erişilmesini ister; görüntüde olmayan B elemanlarını da sınamalısın. Bire bir olmak için erişilmeyen seviyede “tam bir kesim” şartı koymak yanlışlıkla örtenliği de aynı koşula karıştırır.",
      ],
      [
        "Görüntü kümesinde iç noktaları unutma",
        "Bir aralığın görüntüsü her zaman yalnız uçların görüntülerinden okunmaz. f(x)=x², x∈[−2,1] için uç görüntüleri 4 ve 1'dir, fakat aradaki x=0 görüntüsü 0'dır. Gerçek görüntü [0,4] olur. Kuralın artma/azalma yönü değişiyorsa bu iç kritik noktalar ayrıca incelenir.",
        "Açık uçtaki x=a tanımda yoksa f(a) diye fonksiyon değeri atanmaz. O uçtan yaklaşılan yükseklik çizimde açık daireyle gösterilebilir, ama aynı y başka bir iç girdiden de alınabilir. Bir tek uç noktasını dışlamak o y değerinin görüntüden mutlaka silindiğini kanıtlamaz; bütün kural ve aralık incelenir.",
      ],
      [
        "Parçalı fonksiyonda sınırın sahibi bellidir",
        "Her giriş tam bir parçanın kuralına girmelidir. f(x)=x+2, x<1; f(x)=2x−1, x≥1 biçiminde f(1)=1'dir. İlk kuralı sınırda kullanıp 3 yazmak yanlış parçayı seçmektir. Parçalar sınırda farklı sonuç veriyorsa hangi eşitsizlikte eşitlik bulunduğu belirleyicidir.",
        "Grafikte x=1'e soldan gelen kolun sonu açık, f(1)'in bulunduğu sağ kolun başlangıcı kapalı çizilir. İki parça aynı girişe farklı kapalı değer atıyorsa bağıntı fonksiyon olamaz; hiçbir parça kapsamazsa o giriş belirtilen tanımda açıkta kalır. Süreklilik ayrı bir özelliktir, fonksiyon olmanın tanımı değildir.",
      ],
      [
        "Tek ve çiftlik bütün tanım kümesinde sınanır",
        "Tanım kümesi işaret değiştirmeye uygun olduğunda çiftlik f(−x)=f(x), teklik f(−x)=−f(x) eşitliğiyle tanımlanır. Çift grafik y eksenine, tek grafik orijine göre simetriktir. Birkaç örnek girdide benzerlik görmek tüm kümede eşitliği kanıtlamaz; kuraldan veya verilmiş tam özellikten yararlanılır.",
        "Yalnız polinomlarda, sadeleştirmeden sonra çiftlik tek dereceli katsayıların 0 olmasıyla; teklik çift dereceli katsayıların 0 olmasıyla okunabilir. Genel fonksiyonlar için yalnız üs listesi kuralı yoktur: |x| ve cosx de çifttir. Sıfır fonksiyonu hem tek hem çifttir; tek fonksiyonda 0 tanımlıysa f(0)=0 olmalıdır.",
      ],
      [
        "Grafik dönüşümü koordinatın eski konumunu izler",
        "g(x)=f(x−h)+k kuralı grafiği (h; k) taşır. −f(x) x eksenine, f(−x) y eksenine yansıtır. y=a f(x) için nokta (x; y)→(x; ay) olur; a>1 dikey gerer, 0<a<1 dikey sıkıştırır. a negatifse buna yansıma da eklenir.",
        "b≠0 koşulunda f(bx), x koordinatını 1/b ile ölçekler: b>1 grafiği y eksenine doğru yatay daraltır. İçteki ve dıştaki çarpanlar aynı yönde uygulanmaz. Tanım kümesi de giriş dönüşümüne uygun taşınır; dış çarpan 0 olsa bile başlangıçta tanımsız olan girdiler otomatik geri gelmez.",
      ],
      [
        "Eksen kesiminden işaret aralığına",
        "Bir fonksiyon grafiğinin x eksenindeki noktalarında y=f(x)=0 olur; kökler bu nedenle f(x)=0 denklemiyle bulunur. y ekseni için x=0 gerekir; yalnız 0 tanım kümesindeyse kesim noktası (0; f(0)) vardır. Bir eksene yaklaşmak o ekseni mutlaka kesmek değildir; tanımda olmayan girdiye nokta atamayız.",
        "f(x)>0 olan girdilerde grafik x ekseninin üstünde, f(x)<0 olanlarda altındadır. f(x)=x²−1 için kökler ±1, pozitif aralıklar (−∞,−1) ve (1,∞), negatif aralık (−1,1)'dir. Köklerin kendisi ne pozitif ne negatiftir. Yalnız bir kök bulmak işaretlerin otomatik sırayla değiştiğini göstermez; x² gibi teğet kökte iki tarafta aynı işaret kalabilir.",
      ],
      [
        "Artma, azalma ve en büyük değer",
        "Bir aralıkta x₁<x₂ için her zaman f(x₁)<f(x₂) oluyorsa fonksiyon o aralıkta sıkı artan; f(x₁)>f(x₂) oluyorsa sıkı azalandır. Eşitliğe de izin verilen azalmayan/artmayan tanımları ayrı adlandırılmalıdır. Grafikte soldan sağa izlemek bu karşılaştırmayı görselleştirir; tek bir iki nokta çifti bütün aralığın özelliğini kanıtlamaz.",
        "Bir kümede alınan en küçük ve en büyük değerler, bütün o kümedeki çıktılarla karşılaştırılarak belirlenir; bunlara ulaşılan girdiler ayrıca yazılır. f(x)=x², [−2,1] üzerinde [−2,0]'da azalır ve [0,1]'de artar; minimum 0, x=0'da, maksimum 4, x=−2'dedir. Açık uçta yalnız yaklaşılan bir yükseklik elde edilmiyorsa onu alınan maksimum diye etiketleme; yerel bir tepe ile bütün kümenin en büyük değerini de ayır.",
      ],
      [
        "Eşit, içine ve sonlu sayıda fonksiyon",
        "Bu öğretim tanımında iki fonksiyonun eşit olması için tanım ve değer kümeleri ile her ortak girdideki görüntüleri aynı olmalıdır. Yalnız formüllerin benzerliği yetmez; aynı x² kuralının farklı tanım kümelerinde kurduğu fonksiyonlar aynı seçim değildir. Görüntü B'nin öz alt kümesiyse fonksiyona içine denir; bu yalnız örten olmadığını söyler, bire birlik hakkında tek başına karar vermez.",
        "Sonlu A'nın m, boş olmayan B'nin n elemanı varsa A'dan B'ye n^m fonksiyon vardır: her giriş için bağımsız n çıktı seçilir. Bire bir sayımı m≤n iken n(n−1)⋯(n−m+1), m>n iken 0'dır. Üç elemanlı A ve iki elemanlı B için 2³=8 fonksiyon, 0 bire bir fonksiyon bulunur; burada fonksiyon sayısı ile ilişki sayısı karıştırılmaz.",
      ],
      [
        "Ters bileşke işlemleri ters sırada geri alır",
        "f:A→B ve g:B→C bijektif olsun. g∘f, A'dan C'ye bijektiftir ve tersi f⁻¹∘g⁻¹ olur: C'deki sonucu önce g'nin tersiyle B'ye, sonra f'nin tersiyle A'ya götürürüz. Aynı sırayı koruyarak iki ters yazmak genel kural değildir; küme geçişleri ters işlemin hangi girdiyi kabul edeceğini açıklar.",
        "Bijektif f için (f⁻¹)⁻¹=f, f⁻¹∘f=I_A ve f∘f⁻¹=I_B'dir. Örneğin f(x)=2x+1, g(x)=x−3, R üzerinde bijektiftir; g(f(x))=2x−2 ve tersi (x+2)/2 olur. Önce g⁻¹(x)=x+3, ardından f⁻¹(t)=(t−1)/2 uygulanınca da (x+2)/2 bulunur. Bire bir/örtenlik veya uygun küme koşulları yoksa ters sembolünü gelişigüzel kullanma.",
      ],
      [
        "Değişim hızını bağlamla yorumla",
        "[a,b], a<b aralığındaki ortalama değişim hızı (f(b)−f(a))/(b−a)'dır; iki grafik noktasını birleştiren kesenin eğimidir. f(x)=2x+5 için bütün böyle aralıklarda 2 çıkar. Çıktı TL, girdi kilometreyse birim TL/km olur; fonksiyon değeri ile değişim hızı aynı nicelik değildir.",
        "Bir günlük hayat modeli kurarken başlangıç miktarını, artış oranını ve geçerli giriş aralığını açık yaz. Gerçek veriden birkaç nokta görmek sonsuz aralıkta doğrusal yasayı kanıtlamaz; öğretim modelinin varsayımı belirtilmelidir. Keşifte kural, küme ve işlem sırasını tahminle denetle; kaydın XP veya soru doğrusu olmadığını aklında tut.",
      ],
    ],
    examples: [
      [
        "Aynı kural, farklı ters koşulu",
        "A={−1,0,1}, B={0,1} ve f(x)=x² veriliyor. Fonksiyon, bire bir, örten ve ters olma durumunu; sonra A={0,1} kısıtlamasını inceleyin.",
        "Girdilerin görüntülerini tek tek yaz; özellikleri ayrı değerlendir.",
        [
          "İlk A için f(−1)=1, f(0)=0, f(1)=1. Her girişin tam bir çıktısı vardır; f fonksiyondur ve görüntü B'nin tamamıdır.",
          "−1 ve 1 aynı çıktıya gittiği için bire bir değildir. B'den ilk A'ya ters tek değerli olamaz: 1 için iki aday bulunur.",
          "A={0,1} seçilince 0→0,1→1 kalır; hem bire bir hem örten olur. Tersi de 0→0,1→1 eşlemesidir; kuralın daraltılması eski fonksiyondan ayrı bir küme seçimi yapar.",
        ],
        "İlk durumda örten, bire bir değil ve B→A tersi yok; daraltılmış durumda bijektif",
        "İki durumda da kural x², fakat kümeler değiştiği için tersin varlığı değişti.",
        "Bir formülün her tanım kümesinde aynı ters koşulunu taşıdığını sanmak.",
      ],
      [
        "Bileşkede hem sırayı hem yasak girdiyi izle",
        "f(x)=2x+1 ve g(x)=1/(x−3). g∘f ile f∘g kurallarını, doğal tanım kümelerini ve x=2 değerlerini bulun.",
        "İç kuralı dış kuralın girişine koy; payda koşulunu yeni ifadede çöz.",
        [
          "(g∘f)(x)=1/((2x+1)−3)=1/(2x−2). Payda x=1'de 0 olduğundan tanım R−{1}; x=2 için 1/2.",
          "(f∘g)(x)=2/(x−3)+1=(x−1)/(x−3). g başta x=3'ü dışlar; kalan girdiler f'de geçerlidir. x=2 için −1.",
          "İki kural, iki tanım kümesi ve x=2 sonuçları farklıdır. İçten dışa ilerlemek, hangi aşamada girdinin yasaklandığını açıkça gösterir.",
        ],
        "g∘f=1/(2x−2), x≠1; f∘g=(x−1)/(x−3), x≠3",
        "x=1 ilk zincirde f(1)=3 ürettiği için g'de yasaktır; ikinci zincirde x=1 geçerlidir.",
        "Payda koşulunu eski x=3 biçiminde her iki bileşkeye aynen taşımak.",
      ],
      [
        "Kesirli doğrusal kuralın tersini türet",
        "f:R−{3}→R−{2}, f(x)=(2x+1)/(x−3). Tersini ve f⁻¹(5)'i bulun.",
        "y ile çarpıp eski x'i yalnız bırak; tersin yasak çıktısını da yaz.",
        [
          "y(x−3)=2x+1, yani (y−2)x=3y+1. Buradan x=(3y+1)/(y−2) çıkar.",
          "f⁻¹(t)=(3t+1)/(t−2), t≠2 olur. Eski görüntü R−{2}, yeni tanım kümesidir; çıktı da 3 olamaz.",
          "f⁻¹(5)=16/3. Geri kontrol f(16/3)=(35/3)/(7/3)=5 verir; gerçek ters, 1/f(5) değildir.",
        ],
        "f⁻¹(x)=(3x+1)/(x−2); f⁻¹(5)=16/3",
        "İki yönlü bileşke, kendi geçerli kümelerinde birim kuralını verir.",
        "x ve y'yi değiştirdikten sonra payda veya küme koşulunu yazmamak.",
      ],
      [
        "Uçların arasında yeni bir görüntü var",
        "f:[−2,1]→R, f(x)=x². Görüntü kümesini ve aynı kuralla x≥0 dalının tersini bulun.",
        "Aralığı kare kuralının yön değiştirdiği 0 noktasında ayır.",
        [
          "[−2,0] üzerinde kare değerleri 4'ten 0'a iner; [0,1] üzerinde 0'dan 1'e çıkar. Uç görüntüleri 4 ve 1, bütün görüntüyü tek başına vermez.",
          "İki parça birleşince f([−2,1])=[0,4] olur. 0 iç girdiden, 4 dahil sol uçtan alınır; tüm ara değerler erişilir.",
          "Kural [0,∞)→[0,∞) seçilirse bire bir ve örten olur, tersi √x'tir. İlk [−2,1] tanımıyla aynı ters sonucu çıkarmak doğru değildir.",
        ],
        "İlk görüntü [0,4]; negatif olmayan tam dalın tersi √x",
        "İç x=0, yalnız uçları kontrol etmenin kaçırdığı en küçük değeri verir.",
        "f(−2)=4 ve f(1)=1 diye görüntüyü [1,4] sanmak.",
      ],
    ],
    recall: [
      [
        "Değer kümesiyle görüntü aynı olmak zorunda mı?",
        "Hayır; görüntü değer kümesinin alt kümesidir, eşitlik örtenliktir.",
      ],
      ["g∘f'de hangi kural önce?", "Sağdaki f; sonra ara değere g uygulanır."],
      [
        "Bölüm fonksiyonunda ortak tanıma ne eklenir?",
        "Bölen fonksiyonun 0 olmadığı girdiler.",
      ],
      [
        "f⁻¹, 1/f ile aynı mı?",
        "Hayır; biri ters eşleme, diğeri çarpımsal ters kuralıdır.",
      ],
      [
        "Bir fonksiyon hem tek hem çift olabilir mi?",
        "Evet; uygun simetrik tanımda sıfır fonksiyonu ikisini de sağlar.",
      ],
    ],
    items: [
      [
        "A={−1,0,1}, B={0,1}, f:A→B, f(x)=x². Doğru yorum hangisidir?",
        [
          "Örtendir, bire bir değildir.",
          "Bire birdir, örten değildir.",
          "Hem bire bir hem örtendir.",
          "Fonksiyon değildir; iki giriş aynı çıktıyı alamaz.",
          "Görüntü kümesi {−1,0,1}'dir.",
        ],
        "Çıktıları 1,0,1 olarak yaz ve iki özelliği ayrı sına.",
        "Her girişin tek çıktısı vardır. Görüntü {0,1}=B olduğundan örten; −1 ve 1 aynı çıktıyı aldığı için bire bir değildir. Bu birleşme fonksiyon olmayı bozmaz.",
      ],
      [
        "A={1,2}, B={3,4} arasında R={(1,3),(1,4),(2,3)} bağıntısı veriliyor. A'dan B'ye fonksiyon mudur?",
        [
          "Hayır; 1 girişinin iki farklı görüntüsü var.",
          "Evet; her giriş en az bir görüntü aldığı için yeterlidir.",
          "Hayır; 3 çıktısına iki giriş gitmiştir.",
          "Evet; B'nin eleman sayısı A'ya eşittir.",
          "Hayır; 2'nin hiç görüntüsü yoktur.",
        ],
        "Bir ve yalnız bir çıktı koşulunun iki kısmını ayır.",
        "1 hem 3 hem 4 ile eşleştiğinden tek değerlilik bozulur. 2'nin görüntüsü 3'tür; eksik giriş yoktur. Aynı çıktının iki farklı girişten alınması tek başına fonksiyon olmayı bozmaz.",
      ],
      [
        "f:R→R için her gerçek x'te f(2x−1)=4x²−4x+5. f(3) kaçtır?",
        ["13", "17", "5", "9", "37"],
        "Ya 2x−1=3 çöz ya da sağ tarafı (2x−1)²+4 yaz.",
        "2x−1=3 için x=2, sağ taraf 16−8+5=13. Eşdeğer olarak f(t)=t²+4 olur. Parantezdeki giriş 3 olsun diye eski değişkene 2 verilmiştir; doğrudan eski sağ tarafa 3 koymak f(5)'i hesaplar.",
      ],
      [
        "f(x)=2x+1 gerçeklerde, g(x)=1/(x−3) doğal tanımında. g∘f'nin kuralı ve doğal tanımı?",
        [
          "1/(2x−2), R−{1}",
          "1/(2x−2), R−{3}",
          "(x−1)/(x−3), R−{3}",
          "1/(2x+1), R",
          "2/(x−3), R−{1}",
        ],
        "Dış g'nin girişine f(x)'i koy; f(x)≠3 koşulunu çöz.",
        "g(f(x))=1/(2x+1−3)=1/(2x−2). f(x)=3 eşitliği x=1 verir ve bu giriş dışlanır. Eski g'nin x=3 deliği, bileşkede ara değerin 3 olmasını yasaklar.",
      ],
      [
        "f:R−{3}→R−{2}, f(x)=(2x+1)/(x−3). Ters fonksiyonun kuralı hangisidir?",
        [
          "f⁻¹(x)=(3x+1)/(x−2), x≠2",
          "f⁻¹(x)=(x−3)/(2x+1), x≠−1/2",
          "f⁻¹(x)=(3x−1)/(x+2), x≠−2",
          "f⁻¹(x)=(x+1)/(3x−2), x≠2/3",
          "f⁻¹(x)=(2x+1)/(x−3), x≠3",
        ],
        "y(x−3)=2x+1 eşitliğinde eski x'i yalnız bırak.",
        "(y−2)x=3y+1 ve x=(3y+1)/(y−2). Tersin tanımı eski görüntü R−{2}'dir. (x−3)/(2x+1) ise 1/f(x)'tir, ters eşleme değildir.",
      ],
      [
        "f:[−2,1]→R, f(x)=x². Görüntü kümesi hangisidir?",
        ["[0,4]", "[1,4]", "[−2,1]", "[0,1]", "(0,4)"],
        "Aralıkta 0 var mı ve en büyük mutlak giriş hangisi?",
        "En küçük değer x=0'da 0, en büyük x=−2'de 4'tür. İkisi de dahil ve aradaki bütün değerler kare kuralıyla alınır; görüntü [0,4]. Yalnız iki uç görüntüsünü almak minimumu kaçırır.",
      ],
      [
        "f:R→R, f(x)=3 sabit fonksiyonunun R'den R'ye tersi için doğru yorum?",
        [
          "Tersi fonksiyon yoktur; farklı girdiler aynı 3'e gider.",
          "Tersi her yerde 1/3'tür.",
          "Tersi f⁻¹(x)=x−3'tür.",
          "Tersi birim fonksiyondur.",
          "Tersi 3 hariç her girdide 0'dır.",
        ],
        "3 çıktısının tek bir eski girdisi var mı?",
        "R'deki bütün girdiler 3'te birleşir, bire birlik yoktur ve R'ye örten de değildir. Geri yönde 3 için tek bir giriş seçilemez. 1/3, sabit kuralın çarpımsal tersidir; fonksiyon tersini vermez.",
      ],
      [
        "f:R→R, x<1 için f(x)=x+2; x≥1 için f(x)=2x−1. f(1) kaçtır?",
        ["1", "3", "0", "2", "Tanımsız"],
        "Eşitlik işareti hangi parçadadır?",
        "x=1, ikinci x≥1 parçasına aittir. f(1)=2×1−1=1. Soldan yaklaşımda ilk kuralın değeri 3'e yaklaşabilir ama bu f(1)'in 3 olduğu anlamına gelmez.",
      ],
      [
        "f:R→R, her x için f(x)=0. Teklik ve çiftlik durumu nedir?",
        [
          "Hem tek hem çifttir.",
          "Yalnız tektir.",
          "Yalnız çifttir.",
          "Ne tek ne çifttir.",
          "Fonksiyon değildir.",
        ],
        "f(−x)=f(x) ve f(−x)=−f(x) eşitliklerini ayrı denetle.",
        "İki eşitlik de 0=0 olur; tanım R de işaret değiştirmeye uygundur. Sıfır fonksiyonu her iki tanımı sağlar. “Bir fonksiyon mutlaka yalnız bir sınıfta olmalı” varsayımı tanımın parçası değildir.",
      ],
      [
        "A={a,b,c}, B={1,2}. A'dan B'ye bütün fonksiyonların sayısı ve bire bir fonksiyonların sayısı sırasıyla kaçtır?",
        ["8 ve 0", "6 ve 1", "9 ve 3", "8 ve 2", "6 ve 0"],
        "Her üç giriş için iki seçim var; bire birlikte üç farklı çıktı gerekir.",
        "Toplam fonksiyon sayısı 2³=8. Üç farklı girdinin üç farklı çıktıya gitmesi iki elemanlı B'de mümkün olmadığından bire bir fonksiyon sayısı 0'dır. Negatif faktöriyelli bir formül yazmak yerine küme büyüklüğü koşulu denetlenir.",
      ],
    ],
  },
  {
    id: "ayt-polinomlar",
    topic: "detail-464",
    subjectId: "ayt-matematik",
    title: "AYT polinomlar: katsayıdan bölme kanıtına",
    minutes: 125,
    source:
      "MEBİ TYT Matematik polinomlar öğretim sayfaları ve OGM 10. sınıf Polinomlar, Polinomlarla İşlemler ve Polinomların Bölünmesi gerçek sunu paftaları karşılaştırılarak hazırlanmış AYT düzeyinde özgün anlatım ve modeller. Örnek ve sorular resmî sınav sorusu değildir.",
    objectives: [
      "Polinomu üs koşuluyla tanı; sıfır polinomu ve derece iptallerini ayrı ele al.",
      "Yerine koyma, katsayı toplamı ve çift/tek kuvvetli katsayıları hesapla.",
      "Gerçek bölme adımlarını P=DQ+R ile denetle; kalan ve çarpan teoremlerinin koşullarını kullan.",
    ],
    sections: [
      [
        "Polinomun değişkeni ve katsayıları",
        "Gerçek katsayılı bir değişkenli polinom P(x)=aₙxⁿ+⋯+a₁x+a₀ biçiminde sonlu toplamdır; üsler negatif olmayan tam sayılardır. Katsayılar gerçek sayı olabilir: √2 x²+πx−1 bir polinomdur. Üsün kesirli veya negatif olması ise bu tanıma uymaz. İrrasyonel bir katsayı ile kök içindeki değişken aynı durum değildir.",
        "x+1/x, doğal kuralıyla x≠0 üzerinde tanımlı olsa da x⁻¹ terimi yüzünden polinom değildir. √x de x¹ᐟ² içerir. Buna karşılık (x²−1)/(x−1) yalnız x≠1 için x+1'e sadeleşir; başlangıçtaki delikli fonksiyonla bütün R'deki polinom fonksiyonunu tanım kümelerini söylemeden özdeş sayamayız.",
      ],
      [
        "Dereceyi en büyük görünen terimden önce sadeleştir",
        "Sıfır olmayan polinomun derecesi, katsayısı sıfır olmayan en büyük kuvvettir. 3x⁴−3x⁴+2x²−1 sadeleşince 2x²−1 kalır ve derece 2 olur. Bir ifadede x⁴ yazısını görmek tek başına derece 4 kanıtı değildir; benzer terimler birleştirilir ve baş katsayı denetlenir.",
        "P(x)=5 sabit ama sıfır olmayan bir polinomdur; x⁰ katsayısı 5 olduğu için derecesi 0'dır. P(x)=0 sıfır polinomunda hiçbir sıfır olmayan baş katsayı yoktur; bu okul tanımında derece tanımsızdır. Model bunu 0 derecesi diye etiketlemez; sıfır polinomu ayrı durumdur.",
      ],
      [
        "Parametreli derecede önce baş katsayının şartını kur",
        "P(x)=(a−2)x³+(b+1)x²+3 sabit isteniyorsa x³ ve x² katsayıları aynı anda 0 olmalıdır. a=2 ve b=−1 bulunur; geriye 3 kaldığından derece 0 olur. Yalnız kübik terimi sıfırlamak, ikinci derece terimin de kaybolduğunu garanti etmez.",
        "Aynı polinom tam ikinci dereceden istenseydi a=2 ve b≠−1 gerekirdi. Tam üçüncü derece için a≠2 yeterlidir; b serbest olabilir. Eşitlik koşullarıyla sıfır olmama koşullarını ayrı yazmak, parametre aralığını gereksiz daraltmayı veya daha düşük dereceleri yanlış dahil etmeyi önler.",
      ],
      [
        "Polinom eşitliğinde bütün katsayıları karşılaştır",
        "P(x)=Q(x) bütün gerçek x'ler için bir polinom özdeşliği ise aynı kuvvetlerin katsayıları eşittir. P=2x²+ax+b ve Q=cx²+3x−4 için c=2, a=3, b=−4 gerekir. Terim sıraları farklı yazılsa bile aynı kuvvetler yan yana getirilir; yalnız baş terimi karşılaştırmak yetmez.",
        "Bir tek x değerinde P(x)=Q(x) olması polinomların eşit olduğunu söylemez. x² ve x, x=0 ve x=1'de aynı değeri alır ama başka girişlerde ayrılır. Dereceye dayalı yeterli sayıda farklı noktadan belirleme ayrı bir teoremdir; verideki tek eşitlikle bütün katsayıları eşitleme.",
      ],
      [
        "Girdiyi bütün x'lerin yerine aynı koy",
        "P(x)=2x³−x+1 ise P(−2)=2(−2)³−(−2)+1=−16+2+1=−13'tür. Negatif sayı kuvvetlerde paranteze alınır. P(a+1) istenince de her x'in yerine aynı a+1 ifadesi gelir; yalnız ilk terime ekleme yapılmaz.",
        "P(x+1) gibi bir ifade, yeni bir giriş kuralını anlatır. P(x+1)=x³+3x²+3x+6=(x+1)³+5 verilirse t=x+1 diyerek P(t)=t³+5 elde ederiz. P(2) için eski x=1 koymak da aynı 13 sonucunu verir; P(2) sorulunca verilen sağ tarafa x=2 koymak P(3)'ü hesaplar.",
      ],
      [
        "Sabit terim, bütün katsayılar ve işaretli toplam",
        "P(0), sabit terimi verir; pozitif kuvvetlerin hepsi 0 olur. P(1) bütün katsayıların toplamıdır. P(−1), çift kuvvetli terimlerin katsayılarını artı, tek kuvvetlileri eksi toplar. Bu üç değerlendirme farklı bilgileri ayırır; katsayı toplamı en büyük katsayı veya polinomun derecesi değildir.",
        "Çift kuvvetli katsayıların toplamına E, tek kuvvetlilerinkine O dersek P(1)=E+O ve P(−1)=E−O olur. Buradan E=[P(1)+P(−1)]/2, O=[P(1)−P(−1)]/2 çıkar. Sabit terim x⁰ olduğundan E grubundadır; sabit terimi bu toplamın dışında bırakma.",
      ],
      [
        "Toplama ve çıkarmada yüksek derecenin koşulu",
        "P ile Q sıfır olmayan ve dereceleri farklı iki polinomsa P+Q ve P−Q'nun derecesi büyük olan dereceye eşittir. Küçük dereceli polinomda en yüksek kuvveti yok edecek bir terim bulunmaz. Dereceler eşitse baş katsayılar toplanıp çıkarılır; sonuç daha düşük dereceye, hatta sıfır polinomuna inebilir.",
        "P=2x⁴−x+1, Q=−2x⁴+3x²−4 için P+Q=3x²−x−3 ve derece 2 olur. P−Q ise 4x⁴−3x²−x+5'tir ve derece 4'tür. Aynı iki polinomla farklı işlemlerin dereceleri farklıdır; ortak dereceleri doğrudan sonuç diye yazma.",
      ],
      [
        "Çarpma, kuvvet ve bileşkede sıfır koşulunu unutma",
        "Sıfır olmayan P ve Q için dereceler çarpımda toplanır: deg(PQ)=degP+degQ. Çünkü iki sıfır olmayan baş katsayının çarpımı sıfır değildir. Sıfır olmayan P ve pozitif tam k için deg(Pᵏ)=k degP olur. Sıfır polinomuyla çarpım yine sıfırdır ve burada tanımsız dereceye sayı gibi işlem yapılamaz.",
        "P sabit olmayan, Q da sabit olmayan polinom olduğunda deg(P∘Q)=degP·degQ olur; baş terim iç polinomun derecesini dış kuvvetle çarpar. İç kural sabitse sonuç sabit veya sıfır olabilir, bu yüzden bu formülü koşulsuz kullanma. Polinom bölümünün her zaman polinom olacağını da varsayma; kalanlı bölme ayrı bir yapı kurar.",
      ],
      [
        "Bölme eşitliğini sonuçtan önce yaz",
        "D(x) sıfır polinomu değilse P(x)=D(x)Q(x)+R(x) eşitliğinde Q bölüm, R kalan adını alır. R sıfır olabilir; sıfır değilse derecesi D'nin derecesinden küçüktür. Bu derece koşulu, aynı eşitliği rastgele başka Q ve R ile yazmaktan farklı olarak kalanlı bölümü tek belirler.",
        "P'nin derecesi D'den küçükse Q=0 ve R=P olur; sırf bölüm istendi diye negatif dereceli terim üretmeyiz. Sıfır olmayan sabite bölmede kalan 0, bölüm katsayıların o sabite bölünmesidir. D=0 ise bölme tanımlı değildir; model bu özel duruma sahte Q=0 ve R=0 atamaz.",
      ],
      [
        "Uzun bölmede her adım baş terimi yok eder",
        "2x³−3x²−5x+7'yi x−2'ye bölerken baş terim oranı 2x²'dir. (x−2)·2x² çıkarılınca x²−5x+7 kalır. Sonra +x seçilip x²−2x çıkarılır, −3x+7 kalır; son −3 ile kalan 1 olur. Her adım kalan adayının derecesini düşürür.",
        "Sonuç Q=2x²+x−3, R=1'dir. Denetim için (x−2)(2x²+x−3)+1 açılır ve 2x³−3x²−5x+7 geri bulunur. Öğretim modelinde ara katsayılar, bölüm ve kalan aynı gerçek bölme algoritmasından gelir; en altta ayrı çarpıp toplanan DQ+R, yanlış bir ezber adımını ortaya çıkarır.",
      ],
      [
        "Doğrusal bölenin kökü kalanı verir",
        "D(x)=x−r ile bölme eşitliğinde x=r koyunca D(r)=0 olur ve P(r)=R kalır. Kalan derecesi 1'den küçük olduğu için sabittir. D(x)=ax−b, a≠0 halinde kök b/a'dır; kalan P(b/a) olur. −b veya a'yı eksik almak farklı bir girişe götürür.",
        "Örneğin P=2x³−3x²−5x+7 için x−2 ile bölümde kalan P(2)=16−12−10+7=1 olur. Bu teorem bölüm polinomunu tek başına vermez; yalnız kalanı belirler. Bölüm gerekiyorsa uzun bölme veya uygun katsayı karşılaştırmasıyla devam edilir.",
      ],
      [
        "İkinci dereceden bölümde kalan da değişkendir",
        "x²−1 ile bölmede kalan ax+b biçiminde olabilir; tek bir sayı olmak zorunda değildir. P=x³+2x²+3x+4 için Q=x+2 ve R=4x+6 bulunur. (x²−1)(x+2)+(4x+6) açılınca P geri gelir; kalan derece 1 ile bölen derece 2'den küçüktür.",
        "Bölenin farklı kökleri ±1 olduğunda P(1)=a+b, P(−1)=−a+b denklemleri kalanı belirler. Bu örnekte 10 ve 2'den a=4, b=6 çıkar. Tekrarlı kök durumunda aynı noktayı iki kez yerine koymak iki bağımsız denklem vermez; örneğin (x−1)² kalanını yalnız P(1) bilerek tekleştiremezsin.",
      ],
      [
        "Çarpan teoremi ve parametre sorusu",
        "P(r)=0 ise x−r, P'nin bir çarpanıdır; kalan 0 olması bunun bölme eşitliğindeki karşılığıdır. P(r) sıfır değilse kök değildir. P(x)=x²+ax−6 için x−2 çarpan koşulu P(2)=4+2a−6=0 verir ve a=1 bulunur; sonra P=(x−2)(x+3) ile denetlenir.",
        "Birden fazla kök veya çarpan koşulunda her bağımsız veriyi ayrı denkleme dönüştür. Derece ve baş katsayı da verilmemişse birkaç kök sonsuz sayıda polinomu belirleyebilir. Kökleri bilmekle polinomun bütün katsayılarını bilmek farklıdır; çarpımın önündeki sabit çarpan için ayrıca veri gerekebilir.",
      ],
      [
        "Hesabı farklı yoldan doğrulayarak kalıcılaştır",
        "Bir polinom için hem Horner yerine koymasını hem katsayı toplamlarını kullanabilirsin. Horner şeması baş katsayıdan başlayıp her adımda x ile çarpıp sıradaki katsayıyı ekler; eksik kuvvet varsa onun katsayısı 0 olarak korunur. Böylece örneğin x³+3x+4'ün x² terimini atlamak, dizideki konumları karıştırmaz.",
        "Modelde katsayıları değiştir, bir bölme tahmini ve gerekçe yaz, sonra gerçek ara işlemler ile DQ+R'yi karşılaştır. P(0), P(1), çift/tek katsayı toplamı ve çizilmiş seçili nokta bağımsız HTML sonuçlarında da yer alır. Bir görselin açılması veya katsayı sürüklemek bağımsız soru doğrusu, XP ya da konu tamamlanması oluşturmaz.",
      ],
    ],
    examples: [
      [
        "Sabit kalması gereken terimler",
        "P(x)=(a−2)x³+(b+1)x²+3 polinomu sabittir. a, b, P ve derecesini bulun.",
        "Sıfırıncıdan büyük kuvvetlerin katsayılarını ayrı sıfırla.",
        [
          "x³ katsayısı a−2=0 olduğundan a=2. Yalnız bu koşul ikinci derece terimi otomatik silmez.",
          "x² katsayısı b+1=0 verir; b=−1. Geriye P(x)=3 kalır.",
          "3 sıfır olmayan sabittir, bu yüzden derece 0'dır. a+b=1; sıfır polinomu olmadığı için derece tanımsız değildir.",
        ],
        "a=2; b=−1; P=3; derece 0",
        "Bulunan parametreleri eski ifadeye koyunca her x için yalnız 3 kalır.",
        "Sabit polinomla sıfır polinomunu aynı sanmak.",
      ],
      [
        "Çarpımı katsayı toplamlarıyla denetle",
        "P(x)=(x²−2x+3)(x+1). P'yi açın; sabit terim, bütün katsayılar toplamı ve çift/tek kuvvetli katsayı toplamlarını bulun.",
        "Önce dağıt, sonra 0, 1 ve −1 girişlerini kullan.",
        [
          "Çarpım x³−x²+x+3 olur. Sabit terim P(0)=3; baş katsayı 1 ve derece 3'tür.",
          "P(1)=1−1+1+3=4, P(−1)=−1−1−1+3=0 bulunur. İlk çarpımda (−1+1)=0 olması ikinci sonucu doğrular.",
          "E=(4+0)/2=2 ve O=(4−0)/2=2. Gerçek katsayılarda E=−1+3=2, O=1+1=2 de aynıdır.",
        ],
        "P=x³−x²+x+3; sabit 3; toplam 4; E=O=2",
        "P(1) ilk çarpımdan (1−2+3)·2=4 verir.",
        "Sabit terimi çift kuvvetli katsayılar toplamına almamak.",
      ],
      [
        "Bölme işlemini geri çarp",
        "P(x)=2x³−3x²−5x+7, D(x)=x−2. Bölüm ve kalanı bulun; P=DQ+R ile denetleyin.",
        "Baş terimi her adımda yok et; son kalan sabit olmalı.",
        [
          "2x³/x=2x²; P−(x−2)2x²=x²−5x+7. Sonraki bölüm terimi +x'tir.",
          "x²−5x+7−(x−2)x=−3x+7. Sonraki −3 ile çıkarınca kalan 1 olur; Q=2x²+x−3.",
          "(x−2)(2x²+x−3)+1=2x³−3x²−5x+7. Ayrıca P(2)=1 kalanı bağımsız doğrular; derece 0<1.",
        ],
        "Q=2x²+x−3; R=1",
        "Horner katsayıları 2,−3,−5,7 ile 2'de ara değerler 2,1,−3,1 çıkar.",
        "Kaynak baskısındaki benzer görünen sonucu geri çarpmadan doğru saymak.",
      ],
      [
        "Kalanın değişkenli olmasına izin ver",
        "P(x)=x³+2x²+3x+4, D(x)=x²−1. Bölüm ve kalanı hesaplayın.",
        "Kalanın derecesi 2'den küçük; ax+b olabilir.",
        [
          "x³/x²=x; çıkarınca 2x²+4x+4 kalır. Sonraki +2 ile (x²−1)·2 çıkarılır.",
          "Q=x+2 ve R=4x+6 bulunur. R'nin derecesi 1, D'nin 2'sinden küçüktür.",
          "Geri çarpım x³+2x²−x−2+4x+6=P olur. P(1)=10 ve P(−1)=2, R(1)=10 ve R(−1)=2 ile eşleşir.",
        ],
        "Q=x+2; R=4x+6",
        "Bölenin iki farklı kökündeki denetim aynı doğrusal kalanı doğrular.",
        "İkinci derece bölenin kalanını zorunlu sabit sayı sanmak.",
      ],
    ],
    recall: [
      [
        "Polinom üsleri nasıl olmalı?",
        "Negatif olmayan tam sayılar; gerçek katsayılar irrasyonel olabilir.",
      ],
      [
        "Sıfır polinomunun derecesi?",
        "Bu okul tanımında tanımsız; sıfır olmayan sabitinki 0.",
      ],
      [
        "Katsayı toplamı nasıl bulunur?",
        "P(1); sabit terim P(0), işaretli toplam P(−1).",
      ],
      ["Bölme eşitliği ve kalan şartı?", "P=DQ+R, D≠0; R=0 veya degR<degD."],
      [
        "ax−b ile bölümün kalanı?",
        "a≠0 için P(b/a); bu tek başına bölüm polinomunu vermez.",
      ],
      ["x−r'nin çarpan olması?", "P(r)=0 ile eşdeğerdir."],
    ],
    items: [
      [
        "P(x)=3x⁴−2x²+x−7 polinomunun bütün katsayılarının toplamı kaçtır?",
        ["−5", "−7", "5", "−3", "3"],
        "Bütün katsayıları toplamak P(1)'dir.",
        "P(1)=3−2+1−7=−5. Eksik x³ teriminin katsayısı 0'dır ve toplamı değiştirmez. P(0)=−7 yalnız sabit terimdir; ikisi farklı sorulardır.",
      ],
      [
        "Aşağıdaki kurallardan hangisi gerçek katsayılı x polinomu değildir?",
        ["x+1/x", "√2·x²−3", "0", "(x−1)²", "5"],
        "Katsayıya değil değişkenin üssüne bak.",
        "x+1/x, x⁻¹ terimini içerir; negatif üs polinom tanımına uymaz. √2 gerçek bir katsayı olabilir. 0, sıfır polinomu; 5 sıfır olmayan sabit polinomdur.",
      ],
      [
        "P(x)=(a−2)x³+(b+1)x²+3 sabit bir polinom. a+b kaçtır?",
        ["1", "3", "−1", "0", "2"],
        "İki yüksek kuvvetin katsayısı da 0 olmalı.",
        "a−2=0 ve b+1=0 olduğundan a=2, b=−1; toplam 1. Yalnız kübik terimi iptal etmek sabitlik için yetmez; geriye sıfır olmayan 3 kalır.",
      ],
      [
        "P(x)=0 sıfır polinomunun derecesi için bu okul tanımında hangisi doğrudur?",
        [
          "Tanımsızdır.",
          "0'dır.",
          "1'dir.",
          "Her zaman −1'dir.",
          "En büyük katsayısına eşittir.",
        ],
        "Derece için sıfır olmayan baş katsayı gerekir.",
        "Sıfır polinomunda sıfır olmayan terim yoktur; en büyük üs seçilemez. Derecesi tanımsızdır. Derecesi 0 olanlar P=5 gibi sıfır olmayan sabitlerdir.",
      ],
      [
        "P(x)=x³−x²+x+3. Çift kuvvetli terimlerin katsayıları toplamı kaçtır? Sabit terim de bu gruba dahildir.",
        ["2", "4", "0", "−1", "3"],
        "x² ve x⁰ terimlerini al veya [P(1)+P(−1)]/2 kullan.",
        "Çift kuvvetli katsayılar −1 ile 3'tür; toplam 2. Alternatif olarak P(1)=4, P(−1)=0 olduğundan (4+0)/2=2 bulunur. Tek kuvvetli katsayılar başka gruptadır.",
      ],
      [
        "P(x)=2x³−3x²−5x+7 polinomunun x−2 ile bölümünden kalan kaçtır?",
        ["1", "−1", "7", "2", "0"],
        "Doğrusal bölenin kökü 2; kalan P(2).",
        "P(2)=2·8−3·4−5·2+7=16−12−10+7=1. Kalan sabittir; bölenin kökünde bölümle çarpılan x−2 sıfır olur. Sonuç P'nin kökünün 2 olmadığını da gösterir.",
      ],
      [
        "P(x)=2x³−3x²−5x+7, x−2'ye bölünüyor. Bölüm polinomu hangisidir?",
        ["2x²+x−3", "2x²−x−3", "2x²+x+3", "2x²−3x−5", "x²+2x−3"],
        "Baş terim oranlarını sırayla 2x², x ve −3 bul.",
        "İlk çıkarma x²−5x+7, ikincisi −3x+7, sonuncusu 1 bırakır. Q=2x²+x−3. (x−2)Q+1=P denetimi bütün katsayıları geri verir; tek kalan sayısı bölümün yerine geçmez.",
      ],
      [
        "P bir polinom ve bütün gerçek x için P(x+1)=x³+3x²+3x+6. P(2) kaçtır?",
        ["13", "32", "6", "8", "5"],
        "P'nin girişinin 2 olması için eski x kaç olmalı?",
        "x+1=2 için x=1 yazılır: 1+3+3+6=13. Aynı sağ taraf (x+1)³+5 olduğundan P(t)=t³+5 ve P(2)=8+5=13 de bulunur. Sağ tarafa x=2 yazmak P(3)'ü hesaplar.",
      ],
      [
        "P(x)=x³+2x²+3x+4, x²−1'e bölünüyor. Kalan polinomu hangisidir?",
        ["4x+6", "6x+4", "4", "x+2", "3x+4"],
        "Kalan ax+b; x=1 ve x=−1 için P ile aynı olmalı.",
        "P(1)=10 ve P(−1)=2 verir; a+b=10, −a+b=2 çözülünce a=4,b=6. Q=x+2 ile geri çarpım da P'yi verir. Kalanın derecesi 1<2 koşulu sağlanır.",
      ],
      [
        "P(x)=2x⁴−x+1 ve Q(x)=−2x⁴+3x²−4. P+Q polinomunun derecesi kaçtır?",
        ["2", "4", "3", "1", "0"],
        "Aynı en yüksek derecedeki katsayılar birbirini götürüyor mu?",
        "Toplam 3x²−x−3 olur; x⁴ katsayıları 2−2=0 ve x² katsayısı 3≠0. Derece 2'dir. Dereceler eşitken toplamın derecesini koşulsuz 4 almak doğru değildir.",
      ],
    ],
  },
];
export const forge021GeometryTopics: Record<string, string> =
  Object.fromEntries(packs021.map((p) => [p.id, p.topic]));
function guide021(p: Pack021): LessonGuide {
  const sections: GuideSection[] = p.sections.map(([title, a, b]) => ({
    title,
    paragraphs: [a, b],
  }));
  const examples: WorkedExample[] = p.examples.map(
    ([title, prompt, strategy, steps, answer, check, pitfall]) => ({
      title,
      prompt,
      strategy,
      steps: steps.map((explanation, i) => ({
        label: ["Veriyi kur", "İşlemi uygula", "Sonucu denetle"][i],
        explanation,
      })),
      answer,
      check,
      pitfall,
    }),
  );
  return {
    id: p.id,
    minutes: p.minutes,
    objectives: p.objectives,
    sections,
    examples,
    recall: p.recall.map(([prompt, answer]) => ({ prompt, answer })),
    source: p.source,
  };
}
export const forge021GeometryGuides: LessonGuide[] = packs021.map(guide021);
export const forge021GeometryLessons: Lesson[] = packs021.map((p, family) => ({
  id: p.id,
  subjectId: p.subjectId,
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  body: p.sections.map(([title, a, b]) => ({
    title: txt(title),
    text: txt(a + "\n\n" + b),
  })),
  questions: p.items.map(
    ([prompt, original, hint, explanation], i): Question => {
      const shift = (i * 2 + family + 1) % 5,
        options = original.map((_, j) => original[(j + shift) % 5]);
      return {
        id: `f021-${p.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer: options.indexOf(original[0]),
        hint: txt(hint),
        explanation: txt(explanation),
        skill: p.id,
      };
    },
  ),
}));
