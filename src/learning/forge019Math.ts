import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export type Point019 = { x: number; y: number };
export type Coeff019 = { a: number; b: number; c: number };
const finite019 = (...v: number[]) => v.every(Number.isFinite);
function checked019(...v: number[]) {
  if (!finite019(...v)) throw new RangeError("ANALYTIC019_FINITE_OR_PRECISION");
}
function product019(u: number, v: number) {
  const result = u * v;
  checked019(result);
  if (u !== 0 && v !== 0 && Math.abs(result) < 2.2250738585072014e-308)
    throw new RangeError("ANALYTIC019_PRODUCT_PRECISION");
  return result;
}
function point019(x: number, y: number): Point019 {
  checked019(x, y);
  return { x: x === 0 ? 0 : x, y: y === 0 ? 0 : y };
}
export function line019(input: Coeff019) {
  const { a, b, c } = input;
  checked019(a, b, c);
  if (a === 0 && b === 0)
    return {
      input,
      kind: c === 0 ? ("plane" as const) : ("empty" as const),
      normal: null,
      offset: null,
      slope: null,
      angle: null,
      xIntercept: null,
      yIntercept: null,
    };
  const scale = Math.max(Math.abs(a), Math.abs(b)),
    as = a / scale,
    bs = b / scale,
    norm = Math.hypot(as, bs),
    normal = { x: as / norm, y: bs / norm },
    offset = c / scale / norm;
  const slope = b === 0 ? null : a === 0 ? 0 : -a / b,
    angle =
      ((((Math.atan2(-normal.x, normal.y) * 180) / Math.PI) % 180) + 180) % 180;
  const xIntercept = a === 0 ? null : point019(-c / a, 0),
    yIntercept = b === 0 ? null : point019(0, -c / b);
  checked019(offset, angle, ...(slope === null ? [] : [slope]));
  if (
    (a !== 0 && (normal.x === 0 || slope === 0)) ||
    (b !== 0 && normal.y === 0) ||
    (c !== 0 && offset === 0)
  )
    throw new RangeError("ANALYTIC019_QUOTIENT_PRECISION");
  return {
    input,
    kind: "line" as const,
    normal,
    offset,
    slope,
    angle,
    xIntercept,
    yIntercept,
  };
}
export function through019(a: Point019, b: Point019): Coeff019 | null {
  checked019(a.x, a.y, b.x, b.y);
  if (a.x === b.x && a.y === b.y) return null;
  const out = {
    a: a.y - b.y,
    b: b.x - a.x,
    c: product019(a.x, b.y) - product019(b.x, a.y),
  };
  checked019(out.a, out.b, out.c);
  return out;
}
/** null slope explicitly selects the vertical line through the given point. */
export function pointSlope019(p: Point019, slope: number | null): Coeff019 {
  checked019(p.x, p.y, ...(slope === null ? [] : [slope]));
  const out =
    slope === null
      ? { a: 1, b: 0, c: -p.x }
      : { a: slope, b: -1, c: p.y - product019(slope, p.x) };
  checked019(out.a, out.b, out.c);
  return out;
}
export function pair019(first: Coeff019, second: Coeff019) {
  const one = line019(first),
    two = line019(second);
  if (one.kind !== "line" || two.kind !== "line")
    return {
      kind: "invalid" as const,
      point: null,
      distance: null,
      perpendicular: false,
      determinant: null,
    };
  const D = product019(first.a, second.b) - product019(second.a, first.b),
    Ca = product019(first.a, second.c) - product019(second.a, first.c),
    Cb = product019(first.b, second.c) - product019(second.b, first.c),
    dot = product019(first.a, second.a) + product019(first.b, second.b);
  checked019(D, Ca, Cb, dot);
  const normalizedD = one.normal.x * two.normal.y - two.normal.x * one.normal.y;
  if (D === 0 && normalizedD !== 0)
    throw new RangeError("ANALYTIC019_DETERMINANT_PRECISION");
  if (D !== 0)
    return {
      kind: "intersect" as const,
      point: point019(Cb / D, -Ca / D),
      distance: 0,
      perpendicular: dot === 0,
      determinant: D,
    };
  const same = Ca === 0 && Cb === 0,
    alignment =
      one.normal.x * two.normal.x + one.normal.y * two.normal.y < 0 ? -1 : 1,
    distance = Math.abs(one.offset - two.offset * alignment);
  checked019(distance);
  return {
    kind: same ? ("same" as const) : ("parallel" as const),
    point: null,
    distance: same ? 0 : distance,
    perpendicular: false,
    determinant: 0,
  };
}
export function project019(input: Coeff019, p: Point019) {
  checked019(p.x, p.y);
  const line = line019(input);
  if (line.kind !== "line")
    return {
      kind: line.kind,
      distance: null,
      signed: null,
      foot: null,
      normal: null,
    };
  const numerator =
    product019(input.a, p.x) + product019(input.b, p.y) + input.c;
  const signed =
    numerator === 0
      ? 0
      : line.normal.x * p.x + line.normal.y * p.y + line.offset;
  checked019(signed);
  return {
    kind: "line" as const,
    distance: Math.abs(signed),
    signed,
    foot: point019(p.x - signed * line.normal.x, p.y - signed * line.normal.y),
    normal: line.normal,
  };
}
export function axes019(input: Coeff019) {
  const line = line019(input);
  if (line.kind !== "line")
    return { kind: "invalid" as const, area: null, x: null, y: null };
  if (input.a === 0 || input.b === 0)
    return {
      kind: "unbounded" as const,
      area: null,
      x: line.xIntercept,
      y: line.yIntercept,
    };
  if (input.c === 0)
    return {
      kind: "degenerate" as const,
      area: 0,
      x: line.xIntercept,
      y: line.yIntercept,
    };
  const area = Math.abs((line.xIntercept!.x / 2) * line.yIntercept!.y);
  checked019(area);
  if (area === 0) throw new RangeError("AXES019_PRECISION");
  return {
    kind: "triangle" as const,
    area,
    x: line.xIntercept,
    y: line.yIntercept,
  };
}
/** Intersections of an infinite line with a square viewport; no edge clamping of data points. */
export function clip019(input: Coeff019, limit: number): Point019[] {
  if (!Number.isFinite(limit) || limit <= 0)
    throw new RangeError("CLIP019_LIMIT");
  const l = line019(input);
  if (l.kind !== "line") return [];
  const found: Point019[] = [],
    tol = 1e-10 * limit;
  const add = (x: number, y: number) => {
    if (
      finite019(x, y) &&
      Math.abs(x) <= limit + tol &&
      Math.abs(y) <= limit + tol &&
      !found.some((p) => Math.hypot(p.x - x, p.y - y) <= tol)
    )
      found.push(point019(x, y));
  };
  for (const edge of [-limit, limit]) {
    if (l.normal.y !== 0)
      add(edge, -(l.normal.x * edge + l.offset) / l.normal.y);
    if (l.normal.x !== 0)
      add(-(l.normal.y * edge + l.offset) / l.normal.x, edge);
  }
  if (found.length < 2) return found;
  let best = [found[0], found[1]],
    length = 0;
  for (const a of found)
    for (const b of found) {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > length) {
        length = d;
        best = [a, b];
      }
    }
  return best;
}
export function plane019(points: Point019[]) {
  for (const p of points) checked019(p.x, p.y);
  const max = Math.max(
      0,
      ...points.flatMap((p) => [Math.abs(p.x), Math.abs(p.y)]),
    ),
    nearest = Math.round(max),
    rounded =
      Math.abs(max - nearest) <= 32 * Number.EPSILON * Math.max(1, max)
        ? nearest
        : max,
    limit = Math.max(6, Math.ceil(rounded) + 2),
    rough = limit / 4,
    power = 10 ** Math.floor(Math.log10(rough));
  checked019(limit);
  const step =
      [1, 2, 5, 10].map((v) => v * power).find((v) => v >= rough) ?? power * 10,
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

type Section019 = [string, string, string];
type Example019 = [
  string,
  string,
  string,
  [string, string, string],
  string,
  string,
  string,
];
type Question019 = [
  string,
  [string, string, string, string, string],
  string,
  string,
];
const id019 = "dogrunun-analitigi";
const source019 =
  "Aurelia Geometri Tüm Konular ve Formüller’in analitik bölümü; MEBİ AYT Matematik doğru analitiği; OGM Dersler Cepte Analitik Geometri ile doğru eğimi, denklemleri, iki doğru ve uzaklık sunuları karşılaştırılarak hazırlanmış özgün anlatım, modeller ve öğretim soruları. Kaynaklardaki ters eğim katsayısı ve nokta etiketi yazım hataları doğru bağıntıyla karşılaştırılmıştır. Sorular resmî sınav sorusu değildir.";
const sections019: Section019[] = [
  [
    "Denklem, bir nokta kümesini anlatır",
    "Bir noktayı P(x; y) sıralı ikilisiyle tanımlarız; bir doğru denklemi ise onu sağlayan bütün noktaları aynı anda tarif eder. Örneğin x+y=4 denklemini (0; 4), (1; 3) ve (4; 0) sağlar. Bunlar ayrı doğrular değil aynı doğrunun farklı noktalarıdır. Bir noktayı sınarken iki koordinatını denklemin doğru yerine koyarız.",
    "Koordinat geometrisi cebirle şekli birbirine bağlar: bir kesişim sorusu denklem sistemine, bir yükseklik sorusu dik uzaklığa dönüşür. Şekil çizmek ve denklem kurmak birbirini denetleyen iki yoldur. Bu ünitede iki eksenin uzunluk birimi aynıdır; yatay ve düşey ölçek farklı olsaydı gördüğün açı veya diklik güvenilir olmazdı.",
  ],
  [
    "Eğim, yönlü iki değişimin oranıdır",
    "A(x₁; y₁) ve B(x₂; y₂) farklı noktalarsa yatay değişim Δx=x₂−x₁, düşey değişim Δy=y₂−y₁ olur. Δx≠0 için doğrunun eğimi m=Δy/Δx'tir. Bu bir uzunluk değil orandır. Sağa giderken yükselen doğruda m pozitif, alçalan doğruda negatiftir; negatif eğim negatif uzaklık anlamına gelmez.",
    "Uçları aynı anda ters sırada çıkarınca hem pay hem payda işaret değiştirir, eğim korunur. Yalnız bir farkın sırasını ters çevirmek yanlış eksi üretir. Aynı doğru üzerindeki farklı iki nokta çifti, yatay değişim sıfır değilse aynı oranı verir. Düşey çizgide Δx=0 olduğundan bölme yapılmaz; eğim tanımsız olarak ayrılır.",
  ],
  [
    "Eğim açısının başlangıcını ve aralığını seç",
    "Doğrunun pozitif x ekseninden saat yönünün tersine ölçülen eğim açısını α ile gösteririz; 0°≤α<180° seçilir. Sonlu eğim m=tan α'dır. α=45° için m=1, α=135° için m=−1 olur. Sadece dar açılı dik üçgendeki pozitif kenar oranını ezberlemek, ikinci bölgede negatif eğimi açıklamaya yetmez.",
    "Yatay doğrunun eğim açısı 0°, eğimi 0'dır. Düşey doğrunun açısı 90° olmasına rağmen tan 90° tanımsızdır; bunu sıradan bir sonsuz sayı gibi denklemde çarpamayız. Negatif bir arktanjant sonucu çıkarsa aynı doğruyu temsil eden açıyı 180° ekleyerek bu aralığa taşıyabiliriz. Doğrunun iki yönlü olması, ters yöne bakınca yeni bir doğru oluşmadığını açıklar.",
  ],
  [
    "Bir nokta ve sonlu eğimden doğru kur",
    "P(x₀; y₀) noktasından geçen, sonlu m eğimli doğru için y−y₀=m(x−x₀) yazılır. Değişken (x; y), doğru üzerindeki herhangi bir noktadır. Verilen P'yi yerine koyunca iki taraf da sıfır olmalıdır. Parantezi açarken m hem x hem de −x₀ ile çarpılır; y₀'nun işaretini taşırken dikkat gerekir.",
    "Bu biçim y=mx+n olarak da yazılabilir; n=y₀−mx₀, y eksenini kesme değeridir. Aynı noktadan farklı m değerleriyle farklı doğrular geçer; yalnız nokta bilgisi tek bir doğru seçmez. Düşey doğru sonlu m biçimine sığmaz: P'den geçen düşeyin denklemi doğrudan x=x₀'dır. Modelde düşey seçimi ayrı bir koşuldur.",
  ],
  [
    "İki farklı nokta yeterlidir; çakışan noktalar yetmez",
    "A ve B farklı olduğunda tek doğru belirlenir. Apsisler farklıysa eğimi bulup nokta-eğim biçimini kullanabiliriz. Apsisler aynıysa doğru x=x_A olur. İki koordinatı da aynı olan A=B ise tek bir konum verilmiştir; o konumdan sonsuz farklı doğru geçer ve rastgele eğim 0 seçmek doğru değildir.",
    "Bölmesiz bir yol da vardır: (y_A−y_B)x+(x_B−x_A)y+(x_Ay_B−x_By_A)=0. Bu bağıntı yatay ve düşey durumlarda da çalışır; A ve B ayrıysa ilk iki katsayı birlikte sıfır olmaz. A=B olunca bütün katsayılar sıfırlaşır ve eşitlik her noktada sağlanır; bu, istenen tek doğrunun bulunmuş olduğu anlamına gelmez.",
  ],
  [
    "Genel denklemde doğru olma koşulu",
    "ax+by+c=0 denklemi, a ve b birlikte sıfır değilken bir doğru tanımlar. (a; b), doğruya dik normal doğrultusunu verir; normal sözcüğü burada alışılmış değil dik yön anlamındadır. Aynı doğruyu farklı katsayılarla yazabiliriz. Örneğin x+2y−3=0 ile 2x+4y−6=0 aynı noktaları içerir.",
    "a=b=0 olduğunda iki özel durum kalır. c=0 ise 0=0 her (x; y) için doğrudur ve çözüm kümesi tüm düzlemdir. c≠0 ise yanlış sabit eşitlik vardır, çözüm kümesi boştur. Bunları sırasıyla tek bir çakışık doğru veya orijindeki bir nokta diye çizmek hatadır. Etkileşim bu iki kümeyi geçerli tek doğrudan ayrı adlandırır.",
  ],
  [
    "Katsayıdan eğimi doğru oku",
    "b≠0 ise ax+by+c=0 denkleminde y'yi yalnız bırakalım: by=−ax−c ve y=(−a/b)x−c/b. Böylece eğim −a/b olur; −b/a değildir. Hangi katsayının paydada olduğunu hatırlamak için y'nin katsayısına bölündüğünü düşün. Kaynaklar arasında bir yazım tutarsızlığı görürsen bu kısa türetim sonucu denetler.",
    "b=0 ve a≠0 ise denklem x=−c/a'dır; doğru dikeydir ve eğimi tanımsızdır. a=0 ve b≠0 ise y=−c/b yatay doğrusudur, eğimi 0'dır. Bu durumlar genel denklemin bozulması değil onun özel örnekleridir. Katsayıya bölmeden önce sıfır olup olmadığını kontrol etmek, parametreli sorularda çözüm kaybetmeyi önler.",
  ],
  [
    "Yatay, düşey ve orijinden geçen doğrular",
    "Yatay y=k doğrusunda bütün noktaların ordinatı k'dir; apsis serbesttir. Düşey x=k doğrusunda bütün apsisler k'dir; ordinat serbesttir. y=3 ile x=3 aynı doğru değildir. Bir noktanın x ekseninde olması y=0, y ekseninde olması x=0 demektir; eksen adını koordinatla ters eşlememeye dikkat et.",
    "Sonlu eğimli ve orijinden geçen doğrular y=mx biçimindedir. Bunun yanında orijinden geçen düşey x=0 da vardır. Dolayısıyla orijinden geçen bütün doğruların sonlu bir m ile yazılabileceği söylenemez. Genel denklemde orijinin doğru üzerinde olması c=0 koşulunu verir; ayrıca a ve b'nin birlikte sıfır olmaması gerekir.",
  ],
  [
    "Eksen kesişimlerinden grafiğe geç",
    "x eksenindeki noktada y=0 olur; a≠0 iken x=−c/a bulunur. y ekseninde x=0 konur; b≠0 iken y=−c/b çıkar. Kesme biçimi x/u+y/v=1, iki kesişim u ve v sıfır değilken kullanılabilir. Dikey veya yatay doğruya olmayan bir kesişim noktası uydurulmaz.",
    "c=0 olduğunda iki eksen kesişimi aynı O noktasıdır. İki kez O'yu bulmak, çizim için iki farklı nokta bulmak değildir; örneğin y=2x için (1; 2) gibi ikinci bir nokta seçilir. Doğru iki yönde sonsuzdur; ekrandaki parça yalnız görünüm penceresinin içidir. Pencerenin dışına çıkan gerçek kesişim noktası kenara sıkıştırılmış sahte bir konumda gösterilmez.",
  ],
  [
    "Eşdeğer denklemi bütün katsayılarla oluştur",
    "Bir doğru denklemindeki a, b ve c'nin hepsini aynı λ≠0 ile çarpmak çözüm kümesini değiştirmez. Eksi sayı ile çarpmak da buna dahildir; eşitlikte eşitsizlik yönü değiştirme kuralı yoktur. Yalnız bir katsayıyı değiştirmek ise genel olarak başka bir doğru üretir. Benzer görünen denklemleri önce aynı sırada ax+by+c biçimine getir.",
    "Normal vektör ve sabit katsayı birlikte ölçeklenir. Bu nedenle doğruya uzaklık formülünde pay da payda da |λ| ile değişir, sonuç korunur. λ=0 kullanmak ise doğruyu 0=0 eşitliğine dönüştürür ve bütün düzlemi verir; aynı doğru denklemi elde edilmiş olmaz. Eşdeğerlikte sıfır olmayan çarpan koşulu vazgeçilmezdir.",
  ],
  [
    "Paralel ile çakışık aynı durum değildir",
    "İki farklı doğrunun ortak noktası yoksa ayrık paraleldir. Çakışık doğrular ise aynı nokta kümesinin iki adıdır; sonsuz ortak noktaları vardır. Sonlu eğimler eşitse bu iki olasılık birlikte düşünülür. y=x ve y=x+3 ayrık paralel, y=x ve 2y=2x çakışıktır. İki farklı düşey doğru da eğimleri tanımsız olduğu hâlde paraleldir.",
    "Genel denklemlerde katsayı oranlarını yazmak bazen işe yarar, fakat paydada sıfır bulunabilir. Daha genel denetim D=a₁b₂−a₂b₁'dir. D=0 ise normaller paraleldir; ayrıca a₁c₂−a₂c₁ ve b₁c₂−b₂c₁ de sıfırsa doğrular çakışıktır. Bu yöntem önce her denklemin gerçekten bir doğru olduğunu doğrulamayı gerektirir.",
  ],
  [
    "Tek kesişimi iki denklemden birlikte bul",
    "D=a₁b₂−a₂b₁ sıfır değilse iki doğru tam bir noktada kesişir. Noktanın koordinatları iki denklemi de sağlamalıdır; denklemlerden yalnız birini çözmek yetmez. Toplama-çıkarma yöntemiyle bir değişkeni yok etmek veya birini yalnız bırakıp diğerine koymak, bu ortak çözümü bulmanın iki yoludur.",
    "Hesap sonunda noktayı her iki denklemde ayrı kontrol et. Birinde 0, diğerinde sıfırdan farklı değer çıkıyorsa kesişim bulunmamıştır. Birbirine çok yakın paralel yönlerde kesişim uzakta olabilir; uzaktaki sonuç tek başına yanlış değildir. Çakışıkta tek bir kesişim koordinatı seçmek, ayrık paralelde ise sahte (0; 0) yazmak çözüm kümesini yanlış gösterir.",
  ],
  [
    "Dik doğrular ve sonlu eğim istisnası",
    "İki eğim de sonluysa diklik m₁m₂=−1 ile sınanır. Örneğin −2/3 ile 3/2'nin çarpımı −1'dir. Negatif tersini almak, sadece işareti değiştirmek veya sadece tersini almak değildir. Eğimlerden biri 0 ise negatif ters işlemi tanımsız kalır; onun dik eşi düşey doğrudur.",
    "Genel denklemde diklik a₁a₂+b₁b₂=0 ile de kontrol edilir; bu yatay-dikey çifti de kapsar. Çünkü iki doğrunun yön vektörleri (−b₁; a₁) ve (−b₂; a₂) seçilebilir ve dik yönlerin skaler çarpımı sıfırdır. Şekildeki dik açı yalnız çizim eşit eksen ölçeğindeyse güvenilir biçimde okunur; görünüş yerine denklem denetimi de yapılır.",
  ],
  [
    "Normal yön, en kısa yolun nedenini gösterir",
    "ax+by+c=0 doğrusuna dik yön (a; b), doğru boyunca bir yön ise (−b; a)'dır. Bunların skaler çarpımı a(−b)+ba=0 olur. Bu küçük ilişki, noktadan doğruya en kısa yolun neden doğruya dik olduğunu açıklamaya yardım eder. Normalin uzunluğu √(a²+b²)'dir ve doğru olma koşuluyla sıfır değildir.",
    "Normal yönü birim uzunluğa getirince u=(a; b)/√(a²+b²) elde edilir. Noktanın bu yön boyunca konumu ile doğrunun normal doğrultudaki konumu karşılaştırılabilir. Normalin işaretini ters çevirmek doğruyu değiştirmez; yalnız hangi tarafın artı diye adlandırıldığını değiştirir. İşaretli konum ile işaretsiz uzaklığı ayrı tutmak, gereksiz mutlak değer hatalarını önler.",
  ],
  [
    "Noktadan doğruya uzaklık",
    "P(x₀; y₀) noktasının ax+by+c=0 doğrusuna uzaklığı d=|ax₀+by₀+c|/√(a²+b²)'dir. Pay, noktanın denklemi ne kadar sağlamadığını; payda katsayıların ortak ölçeğini hesaba katar. Doğrunun denklemini iki kat yazınca uzaklığın iki kat olmaması, bu paydanın gerekli olduğunu gösterir.",
    "Nokta doğru üzerindeyse pay sıfır ve uzaklık sıfırdır. Genel eğik doğruya uzaklık, aynı apsisteki düşey fark veya aynı ordinattaki yatay fark değildir. O yollar dik olmayabilir ve daha uzun olabilir. Geometri probleminde bir köşeden karşı kenarın doğrusuna yüksekliği aradığında da bu dik uzaklık kullanılabilir; dik ayağın kenar parçası dışında kalması mümkün olabilir.",
  ],
  [
    "Dik ayağı da bul ve iki koşulla denetle",
    "İmzalı değeri δ=(ax₀+by₀+c)/√(a²+b²), birim normali u olarak alalım. Dik ayak H=P−δu olur. Böylece P'den normal doğrultuda doğruya kadar gideriz. δ negatifse çıkarılan vektör öteki yöne döner; uzaklık yine |δ| olarak pozitiftir. P zaten doğru üzerindeyse H=P olur.",
    "Bir ayağı bulmak iki ayrı kontrol gerektirir: H doğru denklemini sağlamalı ve PH doğruya dik olmalıdır. Sadece aynı apsisi korumak bu koşulları sağlamayabilir. Modelde nokta ve ayağın koordinatları sıradan metin olarak da verilir; doğru, dikme ve 90° işareti gerçek hesaplanan noktalara bağlıdır. H=P durumunda sıfır uzunluğa bir açı üçgeni çizilmez.",
  ],
  [
    "Paralel uzaklıkta önce katsayıları uyumlu yap",
    "İki doğru ax+by+c₁=0 ve ax+by+c₂=0 biçiminde aynı a,b katsayılarına getirildiyse aralarındaki uzaklık |c₁−c₂|/√(a²+b²)'dir. Denklemler farklı sayılarla çarpılmışsa sabit terimleri doğrudan çıkarmak yanlış olur. Gerekirse bir denklemi negatif bir sayıya bölerek aynı normal yönüne getir.",
    "Bu uzaklık, bir doğru üzerindeki herhangi bir noktadan diğerine indirilen dikmenin uzunluğudur ve konuma göre değişmez. Çakışık doğrularda 0 olur. Kesişen iki doğru için en küçük uzaklık da 0'dır, fakat paralel doğrulara ait sabit terim kısa yolu onlara uygulanmaz. Model, iki doğru paralel değilken de sınıflandırmayı açık gösterir.",
  ],
  [
    "Alanı doğru analitiğine bağla",
    "Bir doğru eksenleri U(u; 0) ve V(0; v) noktalarında kesiyorsa u,v sıfır değilken OUV üçgeninin alanı |uv|/2 olur. Mutlak değer, kesişimler başka bölgelerdeyken de pozitif alan verir. Yatay veya düşey bir doğru iki eksenle bu tür kapalı üçgen oluşturmaz; orijinden geçen doğru ise iki kesişimi O'da birleştirir ve sıfır alanlı özel duruma düşer.",
    "Genel üçgende bir kenarın uzunluğunu Noktanın Analitiği'nden bulup karşı köşenin o kenarın doğrusuna dik uzaklığıyla çarpabiliriz: S=taban·yükseklik/2. Paralelkenar ve dikdörtgende paralel iki kenar arasındaki dik uzaklık yükseklik olarak kullanılır. Şeklin türü ve hangi kenarın taban olduğu verilmeden farklı alan formülleri birbirine taşınmaz.",
  ],
  [
    "Parametreyi çözerken özel durumu kaybetme",
    "2x+(k−1)y−4=0 denkleminde k=1 olursa y terimi yok olur ve x=2 dikey doğrusu kalır. Önce k−1'e bölüp sonra bütün k değerleri için sonlu eğim var sanmak, bu doğruyu kaybettirir. Genel bir parametre probleminde hangi katsayıların sıfır olabildiğini çözümün başında ayırmak daha güvenlidir.",
    "A(k; 3k) ve B(4k; 12k) farklı noktalar olduğunda doğru y=3x'tir. Ancak k=0 ikisini de O yapar; yalnız bu veriden tek doğru seçilemez. Benzer biçimde eksen kesişimlerinin veya katsayı oranlarının bir paydasını sıfır yapan değer, anlamı incelenmeden yasaklanıp atılmaz. Geçersiz denklem, dikey doğru ve yetersiz veri farklı durumlardır.",
  ],
  [
    "Sonucu cebir ve geometriyle ayrı ayrı doğrula",
    "Doğru denkleminde verilen noktayı, iki doğru çözümünde ortak noktayı, uzaklıkta ayağı yerine koy. Sonra başka bir özellik kullan: dikeyde apsis sabit mi, diklikte yönler gerçekten dik mi, paralel uzaklıkta katsayı ölçeği sonucu koruyor mu? Aynı hesap satırını baştan tekrarlamak yerine bağımsız bir özellik sınamak hatayı daha kolay yakalar.",
    "Keşifte önce sonucu tahmin et, kısa gerekçeni yaz, ardından gerçek şekil ve metin hesabıyla karşılaştır. Renk, kaynak veya durumun tek taşıyıcısı değildir; d/e harfleri ve koordinatlar da verilir. Kontrolü açmak veya süre geçirmek puan, doğru soru ya da konu tamamlama kaydı oluşturmaz. Bağımsız soruda veriyi seçip doğru bağıntıyı kurmak ayrı öğrenme kanıtıdır.",
  ],
];
const examples019: Example019[] = [
  [
    "İki noktadan genel denkleme",
    "A(−2; 3) ve B(4; −1) farklı noktalarından geçen doğrunun eğimi ve bir genel denklemi nedir?",
    "Önce iki farkı, sonra nokta-eğim biçimini kullan.",
    [
      "Δx=4−(−2)=6, Δy=−1−3=−4; m=−4/6=−2/3 olur. Apsisler farklı olduğu için bu bölüm geçerlidir.",
      "A'dan geçen doğru y−3=(−2/3)(x+2). Üçle çarpınca 3y−9=−2x−4 ve 2x+3y−5=0 çıkar.",
      "A için −4+9−5=0, B için 8−3−5=0. Her iki nokta aynı denklemi sağlar; sağa ilerlerken ordinat azaldığı için negatif eğim şekille uyumludur.",
    ],
    "m=−2/3; 2x+3y−5=0",
    "4x+6y−10=0 da aynı doğrudur; bütün katsayılar iki katıdır.",
    "Yalnız bir koordinat farkının çıkarma sırasını ters çevirmek.",
  ],
  [
    "İki doğruyu birlikte çöz",
    "d: x+y−4=0 ve e: x−y−2=0 doğrularının kesim noktasını ve dik olup olmadıklarını bulun.",
    "Denklemleri topla, sonra bulunan noktayı ve dikliği denetle.",
    [
      "x+y=4 ve x−y=2 eşitliklerini toplayınca 2x=6; x=3 bulunur.",
      "x=3 ilk denkleme konunca y=1 olur. S(3; 1) için 3+1−4=0 ve 3−1−2=0 sağlanır.",
      "Eğimler −1 ve +1'dir; çarpımları −1 olur. Normallerin skaler çarpımı da 1×1+1×(−1)=0, dolayısıyla doğrular diktir.",
    ],
    "S(3; 1); doğrular dik",
    "D=1×(−1)−1×1=−2≠0 tek kesişimi doğrular.",
    "Denklemlerin yalnız birini sağlayan noktayı ortak çözüm saymak.",
  ],
  [
    "Dik ayağın gerçek koordinatını bul",
    "P(3; 4) noktasının d: 3x+4y−5=0 doğrusuna uzaklığı ve dik ayağı H nedir?",
    "Önce normalin normu, sonra imzalı değer ve ayak.",
    [
      "Normal (3; 4), normu 5. P'deki pay 3×3+4×4−5=20 olduğundan δ=20/5=4 ve d=4 birimdir.",
      "Birim normal u=(3/5; 4/5). H=P−4u=(3−12/5; 4−16/5)=(3/5; 4/5) olur.",
      "3×(3/5)+4×(4/5)−5=0; H doğru üzerindedir. PH=(12/5; 16/5) normalle paralel, uzunluğu 4'tür; doğru yönüyle skaler çarpımı 0 olur.",
    ],
    "d=4 birim; H(3/5; 4/5)",
    "H noktasını doğruya koymak ve PH uzunluğunu ayrı hesaplamak iki farklı kontrol sağlar.",
    "P ile aynı apsisteki düşey kesişimi dik ayak sanmak.",
  ],
  [
    "Negatif ölçeği düzeltmeden sabitleri çıkarma",
    "d: 3x+4y−5=0 ile e: −6x−8y+30=0 doğruları arasındaki uzaklık kaç birimdir?",
    "İkinci denklemi ilkine uyumlu normalle yaz.",
    [
      "e denkleminin bütün katsayılarını −2'ye böl: 3x+4y−15=0. İki normal artık aynı (3; 4)'tür.",
      "Sabitler −5 ve −15; farkın büyüklüğü 10. Normal normu √(9+16)=5 olduğundan uzaklık 10/5=2 birimdir.",
      "İlk doğru üzerindeki (5/3; 0) noktasının ikinciye uzaklığı |5−15|/5=2'dir. Bir doğru üzerindeki nokta seçerek de aynı sonuç elde edilir.",
    ],
    "2 birim",
    "Sabitler farklı olduğu için doğrular çakışık değildir; normaller orantılı olduğu için kesişmezler.",
    "Ham −5 ve 30 sayılarının farkını aynı paydada kullanmak.",
  ],
  [
    "Bir noktadan dik doğru",
    "d: 2x+3y−5=0 doğrusuna dik ve P(1; 2)'den geçen e doğrusunun denklemini bulun.",
    "Sonlu eğimin negatif tersini al; verilen noktayla sabiti belirle.",
    [
      "d'nin eğimi −2/3. Dik e'nin eğimi 3/2 olur; çarpımları −1'dir.",
      "y−2=(3/2)(x−1). İkiyle çarpıp düzenle: 2y−4=3x−3, yani 3x−2y+1=0.",
      "P için 3−4+1=0. Normaller (2; 3) ve (3; −2) için 6−6=0; hem nokta hem diklik koşulu sağlanır.",
    ],
    "3x−2y+1=0",
    "Dikey d verilseydi eğim tersleme yerine doğrudan yatay e kurulurdu.",
    "Eğimin yalnız işaretini değiştirip 2/3 kullanmak.",
  ],
  [
    "Eksenlerle oluşan alan",
    "2x+3y−18=0 doğrusu ile koordinat eksenleri arasındaki kapalı üçgenin alanı kaç birim karedir?",
    "İki farklı eksen kesişimini bulup dik üçgen alanı kullan.",
    [
      "y=0 için x=9, x=0 için y=6. U(9; 0) ve V(0; 6), O'dan farklı noktalardır.",
      "OU ve OV dik kenarlarının uzunlukları 9 ve 6'dır. Alan S=9×6/2=27 birim kare olur.",
      "u ve v sıfır olmadığı için gerçek kapalı üçgen oluşur. Denklem −2 ile çarpılıp −4x−6y+36=0 yazılsa aynı kesişimler ve aynı alan çıkar.",
    ],
    "27 birim kare",
    "Sıfırdan farklı alan sonucu, üç ayrı köşenin bulunduğu şekille uyumludur.",
    "Doğru ile eksenler her durumda kapalı üçgen oluşturur sanmak.",
  ],
  [
    "Parametreyi önce bölme koşuluyla ayır",
    "2x+(k−1)y−4=0 doğrusunun hangi k için dikey olduğunu ve diğer k değerlerindeki eğimini bulun.",
    "y katsayısının sıfır olabildiği durumu önce çöz.",
    [
      "Dikey doğru için y katsayısı k−1=0 olur; k=1. x katsayısı 2 sıfır olmadığından geçerli bir doğru kalır.",
      "k=1 iken denklem 2x−4=0, yani x=2'dir. Bu doğrunun eğimi tanımsızdır; 0 diye atanmaz.",
      "k≠1 için y=(−2/(k−1))x+4/(k−1), dolayısıyla m=−2/(k−1). İki dal birlikte bütün k değerlerini kapsar.",
    ],
    "k=1: x=2, eğim tanımsız; k≠1: m=−2/(k−1)",
    "k=0 için m=2 ve denklem y=2x−4 çıkar; (2; 0) her iki dalın genel denkleminde de yer alır.",
    "k−1'e bölüp k=1 durumunu çözümden sessizce çıkarmak.",
  ],
  [
    "Yükseklikten üçgen alanına",
    "A(3; 4), B(−2; 1), C(4; −3) köşeli üçgende BC'ye ait yükseklik ve alanı bulun.",
    "BC'nin doğrusunu ve uzunluğunu ayrı bul, A'nın dik uzaklığını kullan.",
    [
      "BC doğrusu 2x+3y+1=0'dır: iki köşe de denklemi sağlar. |BC|=√(6²+(−4)²)=2√13 birimdir.",
      "A'nın BC doğrusuna uzaklığı |2×3+3×4+1|/√13=19/√13 birimdir. Bu uzunluk A'dan BC doğrusuna dik yüksekliktir.",
      "S=(2√13)(19/√13)/2=19 birim kare. Koordinat alan kontrolü |(−5)(−7)−(−3)(1)|/2=38/2=19 verir.",
    ],
    "Yükseklik 19/√13 birim; alan 19 birim kare",
    "Taban-yükseklik ve koordinat determinantı aynı alanı verir; köşeler doğrusal değildir.",
    "A'nın ordinatı 4'ü eğik BC'ye ait yükseklik sanmak.",
  ],
];
const questions019: Question019[] = [
  [
    "Dik koordinat düzleminde A(−1; 2) ve B(5; −1) farklı noktalarından geçen doğrunun eğimi kaçtır?",
    ["−1/2", "1/2", "−2", "2", "Tanımsız"],
    "İki farkı aynı uç sırasıyla yaz; Δx=6 olur.",
    "Δy=−1−2=−3, Δx=5−(−1)=6. m=−3/6=−1/2. İki farkın yalnız birinde uç sırasını değiştirmek yanlış işaret verir; apsisler farklı olduğundan eğim tanımlıdır.",
  ],
  [
    "P(2; −3) noktasından geçen ve eğimi 2 olan doğrunun denklemi hangisidir?",
    ["2x−y−7=0", "2x−y+7=0", "x−2y−8=0", "x=2", "y=−3"],
    "y−(−3)=2(x−2) yazıp düzenle.",
    "y+3=2x−4, buradan 2x−y−7=0 çıkar. P yerine konunca 4+3−7=0; y=2x−7 biçiminde eğim de 2'dir. Yalnız P'den geçmek yetmez, eğim koşulu da gerekir.",
  ],
  [
    "Dik koordinat sisteminde ax+by+c=0 eşitliği için hangi ifade doğrudur?",
    [
      "b≠0 ise eğim −a/b; a≠0 ve b=0 ise doğru dikeydir.",
      "Eğim her a,b için −b/a'dır.",
      "a=b=0, c=1 bir doğru tanımlar.",
      "a=b=c=0 yalnız orijini tanımlar.",
      "b=0 olan her denklem yatay bir doğrudur.",
    ],
    "y'yi yalnız bırakmadan önce böleceğin katsayıyı kontrol et.",
    "b≠0 iken y=(−a/b)x−c/b; eğim −a/b'dir. b=0,a≠0 iken x=−c/a dikeyi çıkar. a=b=0,c=1 boş küme; a=b=c=0 tüm düzlemdir. Bunlar tek bir doğru olarak kullanılamaz.",
  ],
  [
    "A(3; −2) noktasından geçen ve y eksenine paralel olan doğrunun denklemi hangisidir?",
    ["x=3", "y=−2", "y=3", "x=−2", "2x+3y=0"],
    "Düşey doğru boyunca hangi koordinat değişmez?",
    "Düşey doğrunun bütün noktalarında apsis 3'tür; denklem x=3. Ordinat serbesttir ve eğim tanımsızdır. y=−2, A'dan geçen yatay doğrudur; istenen yönü sağlamaz.",
  ],
  [
    "d: 2x+4y−6=0 ve e: x+2y−5=0 denklemleriyle verilen iki doğrunun birbirine göre durumu nedir?",
    [
      "Farklı ve paraleldir.",
      "Çakışıktır.",
      "Tek noktada dik kesişirler.",
      "Tek noktada dik olmayan açıyla kesişirler.",
      "İki denklem de hiçbir nokta içermez.",
    ],
    "İlk denklemi 2'ye böl; normal katsayılarla sabiti ayrı karşılaştır.",
    "d, x+2y−3=0 olur. e ile aynı normal katsayılarına fakat farklı sabitlere sahiptir. Bu yüzden farklı paralel doğrulardır, ortak noktaları yoktur. Eğimin eşit olması tek başına çakışıklık vermez.",
  ],
  [
    "d: x+2y−5=0 ve e: 2x−y=0 doğrularının kesim noktası hangisidir?",
    ["(1; 2)", "(2; 1)", "(0; 5/2)", "(5; 0)", "Doğrular kesişmez."],
    "İkinci denklemden y=2x bulup birinciye koy.",
    "x+2(2x)=5, yani 5x=5 ve x=1. y=2 olur. Nokta her iki denklemi de sağlar: 1+4−5=0, 2−2=0. Sadece birinciyi sağlayan noktalar ortak çözüm sayılmaz.",
  ],
  [
    "d: x−4=0 doğrusuna dik ve P(−1; 3) noktasından geçen e doğrusunun denklemi nedir?",
    ["y=3", "x=−1", "y=−3", "x=4", "3x+y=0"],
    "d düşeydir; dik e yatay olmalıdır.",
    "Düşey x=4'e dik doğru yataydır. P'nin ordinatı 3 olduğu için e: y=3. d'nin eğimi tanımsız olduğundan burada m₁m₂=−1 biçiminde iki sonlu sayı çarpımı kurmak gerekmez.",
  ],
  [
    "P(1; 3) noktasının d: 3x+4y−5=0 doğrusuna dik uzaklığı kaç birimdir?",
    ["2", "10", "5", "14", "√10"],
    "Payın mutlak değerini normalin √(3²+4²) normuna böl.",
    "Pay |3×1+4×3−5|=10, payda √25=5. Uzaklık 10/5=2 birimdir. 10 yalnız paydır; aynı doğrunun katsayılarını ölçeklemek payı değiştirse de gerçek uzaklığı değiştirmemelidir.",
  ],
  [
    "d: 3x+4y−5=0 ile e: 6x+8y−30=0 paralel doğruları arasındaki uzaklık kaç birimdir?",
    ["2", "5", "7", "1", "0"],
    "İkinci denklemin tüm katsayılarını 2'ye böl.",
    "e: 3x+4y−15=0 olur. Aynı normal katsayılarıyla uzaklık |−5−(−15)|/√25=10/5=2 birimdir. Ham sabit terimleri farklı ölçeklerde doğrudan çıkarmak yanlış olur.",
  ],
  [
    "2x+3y−12=0 doğrusu ile iki koordinat ekseni arasında oluşan kapalı üçgenin alanı kaç birim karedir?",
    ["12", "24", "6", "8", "18"],
    "Eksenleri kestiği iki farklı noktayı bul.",
    "y=0 için x=6, x=0 için y=4. Eksenler birbirine dik olduğundan alan 6×4/2=12 birim karedir. Çarpımı ikiye bölmemek dikdörtgen alanını verir; burada üçgen isteniyor.",
  ],
];
const recall019: [string, string][] = [
  [
    "Düşey doğrunun eğimi neden 0 değildir?",
    "Δx=0 olduğu için Δy/Δx tanımsızdır. Eğim 0, yatay doğruya aittir.",
  ],
  [
    "A ve B aynı noktaysa tek bir doğru bulunur mu?",
    "Hayır. Tek noktadan sonsuz farklı doğru geçer; iki farklı nokta veya ek yön koşulu gerekir.",
  ],
  [
    "Genel denklemden −a/b okumasının koşulu nedir?",
    "b≠0. Ayrıca tek doğru tanımı için a,b birlikte 0 olmamalıdır.",
  ],
  [
    "Eğimler eşit olunca doğrular kesin farklı paralel mi?",
    "Hayır; çakışık da olabilirler. Sabitlerin uyumunu ve ortak nokta kümesini incele.",
  ],
  [
    "Yatay ve dikey doğruyu m₁m₂=−1 ile sınamak gerekir mi?",
    "Hayır; dikey eğim tanımsızdır. Yön veya normal vektörlerle diklik doğrudan doğrulanır.",
  ],
  [
    "Dik ayak H için hangi iki ayrı koşul denetlenir?",
    "H doğru üzerindedir ve PH doğruya diktir. P zaten doğru üzerindeyse H=P ve uzaklık 0 olur.",
  ],
  [
    "Paralel uzaklıkta c sabitleri ne zaman çıkarılabilir?",
    "İki doğru aynı a,b katsayılarına getirilince. Bütün katsayıların aynı ölçeği kullanması gerekir.",
  ],
  [
    "a=b=c=0 hangi doğruyu tanımlar?",
    "Hiçbir tek doğruyu seçmez; 0=0 tüm düzlemin noktalarında sağlanır.",
  ],
];
export const forge019MathTopics: Record<string, string> = {
  [id019]: "detail-404",
};
export const forge019MathGuides: LessonGuide[] = [
  {
    id: id019,
    minutes: 110,
    objectives: [
      "Doğru denklemini farklı bilgilerden kur; yatay ve dikey durumları ayır.",
      "İki doğrunun tek/hiç/sonsuz ortak noktasını doğru koşulla belirle.",
      "Normal yön, dik uzaklık ve ayağı hesapla; alan problemine aktar.",
      "Sıfır katsayı, çakışan nokta ve eşdeğer ölçek durumlarını denetle.",
    ],
    source: source019,
    sections: sections019.map(([title, a, b]): GuideSection => ({
      title,
      paragraphs: [a, b],
    })),
    examples: examples019.map(
      ([
        title,
        prompt,
        strategy,
        steps,
        answer,
        check,
        pitfall,
      ]): WorkedExample => ({
        title,
        prompt,
        strategy,
        steps: steps.map((explanation, i) => ({
          label: ["Veriyi ayır", "Bağıntıyı kur", "Sonucu denetle"][i],
          explanation,
        })),
        answer,
        check,
        pitfall,
      }),
    ),
    recall: recall019.map(([prompt, answer]) => ({ prompt, answer })),
  },
];
export const forge019MathLessons: Lesson[] = [
  {
    id: id019,
    subjectId: "ayt-geometri",
    title: txt("Doğrunun analitiği: denklem, yön ve dik uzaklık"),
    minutes: 110,
    objectives: forge019MathGuides[0].objectives.map(txt),
    source: txt(source019),
    tags: [id019, "kaynakli", "forge019"],
    body: sections019.map(([title, a, b]) => ({
      title: txt(title),
      text: txt(a + "\n\n" + b),
    })),
    questions: questions019.map(
      ([prompt, choices, hint, explanation], i): Question => {
        const rotate = (i * 2 + 1) % 5,
          correct = choices[0],
          options = [...choices.slice(rotate), ...choices.slice(0, rotate)];
        return {
          id: `f019-math-${id019}-${i + 1}`,
          prompt: txt(prompt),
          options: options.map(txt),
          answer: options.indexOf(correct),
          hint: txt(hint),
          explanation: txt(explanation),
          skill: "f019-line-geometry",
        };
      },
    ),
  },
];
