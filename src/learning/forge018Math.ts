import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export type Point018 = { x: number; y: number };
export type Reflection018 =
  "x" | "y" | "origin" | "diagonal" | "anti" | "center";
const finite018 = (...values: number[]) => values.every(Number.isFinite);
function points018(...points: Point018[]) {
  if (!points.every((p) => finite018(p.x, p.y)))
    throw new RangeError("POINT018_FINITE");
}
function point018(x: number, y: number): Point018 {
  if (!finite018(x, y)) throw new RangeError("POINT018_OVERFLOW");
  return { x: x === 0 ? 0 : x, y: y === 0 ? 0 : y };
}
export function region018(p: Point018) {
  points018(p);
  if (p.x === 0 && p.y === 0) return "O";
  if (p.y === 0) return "x";
  if (p.x === 0) return "y";
  return p.x > 0 ? (p.y > 0 ? "I" : "IV") : p.y > 0 ? "II" : "III";
}
export function midpoint018(a: Point018, b: Point018): Point018 {
  points018(a, b);
  return point018(a.x / 2 + b.x / 2, a.y / 2 + b.y / 2);
}
export function endpoint018(a: Point018, midpoint: Point018): Point018 {
  points018(a, midpoint);
  return point018(
    midpoint.x + (midpoint.x - a.x),
    midpoint.y + (midpoint.y - a.y),
  );
}
export function distance018(a: Point018, b: Point018) {
  points018(a, b);
  const dx = b.x - a.x,
    dy = b.y - a.y,
    distance = Math.hypot(dx, dy),
    axisPath = Math.abs(dx) + Math.abs(dy);
  if (!finite018(dx, dy, distance, axisPath))
    throw new RangeError("DISTANCE018_OVERFLOW");
  return {
    dx,
    dy,
    distance,
    axisPath,
    midpoint: midpoint018(a, b),
    same: a.x === b.x && a.y === b.y,
    equalAxisPath: dx === 0 || dy === 0,
    aToXAxis: Math.abs(a.y),
    aToYAxis: Math.abs(a.x),
  };
}
export function reflect018(
  a: Point018,
  kind: Reflection018,
  center: Point018 = { x: 0, y: 0 },
): Point018 {
  points018(a, center);
  switch (kind) {
    case "x":
      return point018(a.x, -a.y);
    case "y":
      return point018(-a.x, a.y);
    case "origin":
      return point018(-a.x, -a.y);
    case "diagonal":
      return point018(a.y, a.x);
    case "anti":
      return point018(-a.y, -a.x);
    case "center":
      return endpoint018(a, center);
    default:
      throw new RangeError("REFLECTION018_KIND");
  }
}
export function translate018(a: Point018, h: number, k: number): Point018 {
  points018(a);
  if (!finite018(h, k)) throw new RangeError("TRANSLATION018_FINITE");
  return point018(a.x + h, a.y + k);
}
/** AP:PB=m:n. The ratio alone does not assert collinearity; this constructor does. */
export function section018(
  a: Point018,
  b: Point018,
  m: number,
  n: number,
  external: boolean,
) {
  points018(a, b);
  if (!finite018(m, n) || m <= 0 || n <= 0 || typeof external !== "boolean")
    throw new RangeError("SECTION018_POSITIVE_RATIO");
  const coincident = a.x === b.x && a.y === b.y;
  if (coincident)
    return {
      point: external ? null : { ...a },
      position: "collapsed" as const,
      ratioDefined: false,
      parameter: external
        ? null
        : m / Math.max(m, n) / (m / Math.max(m, n) + n / Math.max(m, n)),
    };
  if (external && m === n)
    return {
      point: null,
      position: "none" as const,
      ratioDefined: false,
      parameter: null,
    };
  const scale = Math.max(m, n),
    mm = m / scale,
    nn = n / scale,
    denominator = external ? mm - nn : mm + nn,
    t = mm / denominator;
  if (!finite018(t) || mm === 0 || nn === 0 || denominator === 0)
    throw new RangeError("SECTION018_PRECISION");
  const p = external
    ? point018(
        (mm * b.x - nn * a.x) / denominator,
        (mm * b.y - nn * a.y) / denominator,
      )
    : point018(
        (nn / denominator) * a.x + (mm / denominator) * b.x,
        (nn / denominator) * a.y + (mm / denominator) * b.y,
      );
  if ((p.x === a.x && p.y === a.y) || (p.x === b.x && p.y === b.y))
    throw new RangeError("SECTION018_PRECISION");
  return {
    point: p,
    position: external
      ? m > n
        ? ("beyond-b" as const)
        : ("before-a" as const)
      : ("inside" as const),
    ratioDefined: true,
    parameter: t,
  };
}
/** A stable scaled determinant tests collinearity; tolerance only covers floating-point rounding. */
export function ratioCheck018(a: Point018, b: Point018, p: Point018) {
  points018(a, b, p);
  const dx = b.x - a.x,
    dy = b.y - a.y,
    px = p.x - a.x,
    py = p.y - a.y;
  if (!finite018(dx, dy, px, py)) throw new RangeError("RATIO018_OVERFLOW");
  const ab = Math.hypot(dx, dy),
    apLength = Math.hypot(px, py);
  const cross =
    ab === 0 || apLength === 0
      ? 0
      : (dx / ab) * (py / apLength) - (dy / ab) * (px / apLength);
  const collinear = Math.abs(cross) <= 16 * Number.EPSILON;
  const ap = distance018(a, p).distance,
    pb = distance018(p, b).distance;
  return { collinear, ratio: pb === 0 ? null : ap / pb, ap, pb };
}
export function centroid018(a: Point018, b: Point018, c: Point018) {
  points018(a, b, c);
  const u = point018(b.x - a.x, b.y - a.y),
    v = point018(c.x - a.x, c.y - a.y);
  const determinant = u.x * v.y - u.y * v.x;
  if (!Number.isFinite(determinant))
    throw new RangeError("CENTROID018_OVERFLOW");
  const centroid = point018(
    a.x / 3 + b.x / 3 + c.x / 3,
    a.y / 3 + b.y / 3 + c.y / 3,
  );
  return {
    centroid,
    oppositeA: midpoint018(b, c),
    oppositeB: midpoint018(a, c),
    oppositeC: midpoint018(a, b),
    area: Math.abs(determinant) / 2,
    triangle: determinant !== 0,
  };
}
/** A square data window and a square SVG plot preserve one physical scale on both axes. */
export function plane018(points: Point018[]) {
  points018(...points);
  const maximum = Math.max(
    0,
    ...points.flatMap((p) => [Math.abs(p.x), Math.abs(p.y)]),
  );
  const nearest = Math.round(maximum);
  const roundedMaximum =
    Math.abs(maximum - nearest) <= 32 * Number.EPSILON * Math.max(1, maximum)
      ? nearest
      : maximum;
  const limit = Math.max(6, Math.ceil(roundedMaximum) + 2);
  if (!Number.isFinite(limit)) throw new RangeError("PLANE018_OVERFLOW");
  const rough = limit / 4,
    power = 10 ** Math.floor(Math.log10(rough));
  const step =
    [1, 2, 5, 10].map((v) => v * power).find((v) => v >= rough) ?? power * 10;
  const ticks: number[] = [];
  for (let i = Math.ceil(-limit / step); i <= Math.floor(limit / step); i++)
    ticks.push(i * step);
  return {
    limit,
    step,
    ticks,
    pixelsPerUnit: 260 / limit,
    x: (v: number) => 360 + (v / limit) * 260,
    y: (v: number) => 320 - (v / limit) * 260,
  };
}

type Example018 = [
  string,
  string,
  string,
  [string, string, string],
  string,
  string,
  string,
];
type Question018 = [
  string,
  [string, string, string, string, string],
  string,
  string,
];
const id018 = "noktanin-analitigi";
const source018 =
  "Aurelia Noktanın Analitiği kopya kağıdı; MEBİ AYT Matematik noktanın analitik incelenmesi ve dönüşümler; OGM Dersler Cepte Analitik Geometri ile analitik düzlem, iki nokta arası uzaklık ve oranlı bölme sunuları karşılaştırılarak yazılmış özgün anlatım, modeller ve öğretim soruları. Kaynaklardaki koordinat farkı ve dış bölme gösterimi baskı tutarsızlıkları doğru şekil ve bağıntıyla düzeltilmiştir.";
const sections018: [string, string, string][] = [
  [
    "Bir şekli sayılarla anlatmak",
    "Analitik geometri, şeklin konumunu sayılarla, sayısal bir koşulu da şekille incelememizi sağlar. Bir şehir krokisinde iki sokağın kesişimini adreslemek gibi, düzlemde bir noktayı iki eksene göre tarif ederiz. Ancak önce bir başlangıç ve birim seçmemiz gerekir; başlangıcı veya ölçeği sessizce değiştirirsek aynı koordinat başka bir yeri anlatabilir.",
    "Bu ünitede dik Kartezyen koordinat sistemi ve iki eksende eşit uzunluk birimi kullanılır. Böylece Pisagor bağıntısı doğrudan uzaklık verir. Etkileşimli düzlem, bütün noktaları göstermek için iki ekseni birlikte büyütür; ekranda bir kareyi yatayda ve düşeyde farklı ölçeklemek, bir çemberi elipse dönüştürüp uzaklık sezgisini bozardı.",
  ],
  [
    "Sayı doğrusundan sıralı ikiliye",
    "Sayı doğrusunda noktanın tek koordinatı vardır; düzlemde yatay ve düşey bilgi birlikte gerekir. P(x; y) yazımında ilk sayı apsis, ikinci sayı ordinattır. Önce orijinden yatay x kadar, sonra düşey y kadar ilerlemek noktayı verir. Negatif x sola, negatif y aşağı yönü belirtir; uzunlukların kendisi negatif olmaz.",
    "Sıralı ikilide yer değiştirmek genellikle noktayı değiştirir: (2; 5) ile (5; 2) aynı değildir. Burada koordinatları noktalı virgülle ayırıyoruz; Türkçe ondalık virgül kullandığımızda (1,5; 2) yazısı x=1,5 ve y=2 anlamına gelir. Bir noktanın adını harfle, koordinatlarını sayılarla ayrı izle; A ve B harflerinin sırası uzaklığın değerini değiştirmez.",
  ],
  [
    "Bölgeler, eksenler ve orijin",
    "Eksenler düzlemi dört açık bölgeye ayırır. I. bölgede x>0, y>0; II. bölgede x<0, y>0; III. bölgede x<0, y<0; IV. bölgede x>0, y<0 olur. Bölgeyi ezberlemek yerine sağ-sol ve yukarı-aşağı işaretlerini birlikte oku. Parametreli bir noktada iki eşitsizliğin kesişimini bulmalısın.",
    "Bir koordinat sıfırsa nokta bir bölgenin içinde değildir. y=0 olan noktalar x ekseninde, x=0 olanlar y eksenindedir; ikisi de sıfırsa O(0; 0) orijinidir. Örneğin P(t−1; 4−t) I. bölgede olacaksa t>1 ve t<4 birlikte gerekir. t=1 veya t=4 değerini aralığa katmak, ekseni bölge sanma hatasıdır.",
  ],
  [
    "Bir eksene uzaklık: karşı koordinatın mutlak değeri",
    "P(x; y) noktasından x eksenine en kısa yol düşeydir; uzunluğu |y| olur. y eksenine en kısa yol yataydır; uzunluğu |x| olur. Eksenin adıyla aynı koordinatı seçmek sık yapılan hatadır. Noktanın x ekseninin altında olması uzaklığı negatif yapmaz; mutlak değer, işaretli konumu uzunluğa çevirir.",
    "Bir eksene uzaklık verildiğinde çoğu kez iki olasılık doğar. y eksenine uzaklığı 5 olan noktanın x koordinatı +5 veya −5 olabilir. Bölge, başka bir eşitlik ya da şekil koşulu bu seçenekleri azaltabilir. İki eksene eşit uzaklık |x|=|y| demektir; yalnız y=x değil, y=−x doğrusu da bu koşulu sağlar.",
  ],
  [
    "İki nokta arası uzaklığı kur",
    "A(x₁; y₁) ile B(x₂; y₂) arasında yatay fark Δx=x₂−x₁, düşey fark Δy=y₂−y₁ olsun. Eksenlere paralel yardımcı çizgilerle bir dik üçgen kurulduğunda dik kenarlar |Δx| ve |Δy| olur. Pisagor bağıntısı |AB|=√((Δx)²+(Δy)²) verir. Önce farkları, sonra kareleri hesaplamak işaret hatasını görünür kılar.",
    "A’dan B’ye veya B’den A’ya gitmek aynı uzaklığı verir; iki farkın işareti birlikte ters dönse de kareleri değişmez. |Δx|+|Δy| ise eksenler boyunca köşeli yolun uzunluğudur. İki fark da sıfırdan farklıyken bu yol doğru parçasından uzundur; sadece yatay veya düşey hareket varsa iki uzunluk eşittir. Birim koordinat birimiyse sonuç da uzunluk birimidir, birim kare değildir.",
  ],
  [
    "Özel konumlar formülün denetimidir",
    "Apsisler aynıysa yatay fark sıfırdır ve |AB|=|y₂−y₁| kalır. Ordinatlar aynıysa düşey fark sıfırdır ve |AB|=|x₂−x₁| olur. Mutlak değer yerine işaretli farkı bırakmak, uçları ters adlandırınca negatif uzunluk üretir. Genel formülü bu özel durumlara indirgemek, yazdığın farkların doğru koordinatlara ait olduğunu kontrol eder.",
    "A=B ise iki fark da sıfırdır ve uzaklık sıfırdır. Bu durum uzaklık veya orta nokta için sorun değildir; fakat iki ayrı noktayla tanımlanan doğru, yön veya bölme oranı için ek dikkat gerekir. Üst üste iki noktadan benzersiz bir doğru seçilemez. Model bu çakışmayı ayrıca belirtir; görünmeyen bir doğruyu varmış gibi çizmeye çalışmaz.",
  ],
  [
    "Bilinmeyen koordinatta tüm olasılıkları koru",
    "Uzaklık denkleminde her iki taraf da negatif değilse karesini almak kökü kaldırır. Örneğin (t−a)²=b² denklemi t−a=b veya t−a=−b verir; yalnız artı kökü seçmek bir noktayı kaybettirir. Verilen bölge, pozitiflik veya doğru üzerinde olma koşulunu çözümler bulunduktan sonra uygula. Her aday özgün uzaklıkta denetlenmelidir.",
    "Bir P noktası A ve B’ye eşit uzaklıktaysa |PA|²=|PB|² yazmak yararlıdır; P’nin kareli koordinatları çoğu kez sadeleşir. A ve B farklı olduğunda bütün düzlemde bu koşul orta dikme doğrusunu verir; P’nin x ekseninde olması gibi ikinci koşul kesişimi belirler. Sadece eşit uzaklık bilgisi her zaman tek bir nokta seçmez.",
  ],
  [
    "Eksenlere göre yansıma",
    "x eksenine göre yansımada yatay konum korunur, düşey yön değişir: (x; y)→(x; −y). y eksenine göre yansımada (x; y)→(−x; y) olur. Nokta aynanın üzerindeyse yerinde kalır; örneğin (3; 0) x eksenine göre kendisine gider. Eksenin iki yanında eşit dik uzaklıklar bulunması bu kuralları açıklar.",
    "Orijine göre simetri iki koordinatı da ters işaretli yapar: (x; y)→(−x; −y). Bu, tek bir eksene göre yansımayla aynı işlem değildir; düzlemde yarım dönüşe karşılık gelir. Bir şeklin bütün noktalarına aynı yansıma uygulanırsa noktalar arası uzaklıklar korunur. Bir noktaya yansıma uygulayıp diğerini sabit bırakmak ise aynı korunum iddiasını vermez.",
  ],
  [
    "Bir merkeze ve köşegen doğrularına göre simetri",
    "S(a; b) bir simetri merkeziyse S, A ile A′ parçasının orta noktasıdır. Bu yüzden A(x; y)→A′(2a−x; 2b−y) olur. Merkez orijin olduğunda önceki işaret kuralı çıkar. S’nin koordinatlarını yalnız eklemek yanlış olur; merkez iki ucun ortalamasıdır. A=S ise görüntü yine A’dır.",
    "y=x doğrusuna göre yansıma apsisle ordinatı yer değiştirir: (x; y)→(y; x). y=−x için yer değiştirmeye iki işaretin tersini ekleriz: (x; y)→(−y; −x). Son kuralı bir ezber daha olarak değil, ayna üzerindeki noktaların sabit kalması ve diklik koşuluyla denetle. Eşit eksen ölçeği bu doğruların şekil üzerinde doğru açıyla görünmesi için gereklidir.",
  ],
  [
    "Orta nokta ve eksik uç",
    "A(x₁; y₁), B(x₂; y₂) uçlarının orta noktası M=((x₁+x₂)/2; (y₁+y₂)/2) olur. Yatay ve düşey değişimlerin yarısını ayrı ayrı alırız; dört koordinatı tek ortalamada toplamayız. M, doğru parçası üzerindedir ve |AM|=|MB| sağlar. A ile B aynıysa formül yine o tek noktayı verir.",
    "A ve M biliniyorsa B’nin koordinatları B=(2x_M−x_A; 2y_M−y_A) ile bulunur. Bu aynı zamanda A’nın M merkezine göre simetriğidir; iki konu farklı formüller değil aynı geometrik ilişkiyi anlatır. Sonuçta M’yi yeniden ortalama ile kontrol et. Eşit uzaklık tek başına orta nokta için yetmez; doğrusal olma koşulu da gerekir.",
  ],
  [
    "İçten bölmede ağırlıkların neden ters göründüğünü anla",
    "A ve B farklı olsun; P, [AB] üzerinde ve |AP|:|PB|=m:n olsun. m,n pozitifken P=(nA+mB)/(m+n) yazılır; bu kısa gösterim her koordinata ayrı uygulanır. A’nın katsayısının n olmasının nedeni, A’dan B’ye toplam yolun m/(m+n) bölümünü ilerlememizdir: P=A+(m/(m+n))(B−A). Uçlara olan oranla koordinatın katsayısını karıştırma.",
    "m küçükse P, A’ya daha yakındır; m=n olursa orta noktadır. Bulduğun koordinatlar her eksende iki ucun değerleri arasında kalmalıdır; bu gerekli kontrol yanlış işareti hızla yakalar. Düşey ve yatay parçalar da aynı vektörel bağıntıya uyar. İspatta Δx’e veya Δy’ye bölmek bazen mümkün olmasa da bölme formülü bu sıfır farklarda geçerlidir.",
  ],
  [
    "Dıştan bölme: eksi işaretinin geometrisi",
    "P, A ve B ile doğrusal fakat [AB] dışında olsun; |AP|:|PB|=m:n ve m,n>0 alınsın. m≠n koşulunda P=(mB−nA)/(m−n) olur. m>n ise P, B’nin ötesindedir; m<n ise A’nın gerisindedir. Bütün koordinatları aynı payda ve aynı uç sırasıyla hesapla. Bir eksende içten, ötekinde dıştan bölme formülü kullanılamaz.",
    "A ve B farklıyken m=n için sonlu bir dış bölme noktası yoktur: doğru üzerinde uçların dışında bir noktada uzaklıkların farkı |AB| kadar kalır, eşit olamaz. Sıfır paydayı keyfî olarak sıfıra çevirmek veya noktayı orijine koymak yanlış sonuç üretir. Oranın 1’e yaklaşması dış noktayı çok uzağa götürür; bu, oran tam 1 olduğunda düzlemde sıradan bir nokta var demek değildir.",
  ],
  [
    "Oran tek başına noktanın yerini seçmez",
    "Bölme bağıntıları yalnız uzunluk oranı değil doğrusal yer koşulu da içerir. A(0; 0), B(6; 0), Q(8; 4) için |QA|=4√5, |QB|=2√5 ve oran 2’dir; fakat Q, AB doğrusu üzerinde değildir. Aynı oranı kullanıp Q’yu otomatik olarak iç ya da dış bölme noktası diye hesaplayamayız. Önce doğru üzerinde ve parçanın hangi tarafında olduğunu bilmeliyiz.",
    "A=B olduğunda A’dan farklı her P için |AP|/|PB|=1 olur; 1:1 oranı tek bir dış nokta seçmez, m≠n oranı ise hiçbir nokta vermez. P=A için 0/0 oranı tanımsızdır. Cebirsel iç bölme ortalaması A’yı üretse de bunu tanımlı m:n uzaklık oranının kanıtı diye sunmayız. Model, çakışık uç konumuyla geçerli oran noktasını ayrı tutar.",
  ],
  [
    "Üçgenin ağırlık merkezi ve 2:1 ilişkisi",
    "Üçgenin bir köşesini karşı kenarın orta noktasına birleştiren parça kenarortaydır. Üç kenarortay G’de kesişir ve G=(A+B+C)/3 olur; üç apsisi ve üç ordinatı ayrı ayrı ortalarız. M, BC’nin orta noktasıysa G=A+(2/3)(M−A) olduğundan |AG|:|GM|=2:1 çıkar. Büyük parça köşe tarafındadır; oranı ters yazmak farklı nokta verir.",
    "Gerçek bir üçgen için üç köşe doğrusal olmamalıdır. Koordinat ortalaması doğrusal veya çakışık üç nokta için de hesaplanabilir; fakat bu durumda sıfır olmayan bir üçgenin iç ağırlık merkezi anlatısını kullanamayız. Model alanı sıfır olduğunda aritmetik ortalamayı gösterir ve üçgen oluşmadığını söyler. G’nin üçgen içinde olması bir kontrol sağlar; tek başına rastgele üç sayıyı ortalamak bir geometri çözümü değildir.",
  ],
  [
    "Orta noktanın şekillerdeki gücü",
    "Paralelkenarın köşeleri çevre sırasıyla A,B,C,D ise köşegenler birbirini ortalar: (A+C)/2=(B+D)/2, yani A+C=B+D olur. Üç köşeden dördüncüyü bulurken hangi köşelerin karşılıklı olduğunu önce belirle. Köşelerin sırası verilmemişse aynı üç noktadan farklı paralelkenarlar kurulabilir; tek bir koordinatı zorunlu sanma.",
    "Dik üçgende hipotenüsün orta noktası üç köşeye de eşit uzaklıktadır. Bu nedenle dik köşeden hipotenüs ortasına çizilen kenarortayın uzunluğu hipotenüsün yarısıdır. Ancak herhangi bir üçgende bütün kenarortaylar bu özelliğe sahip değildir. Önce diklik ve hangi kenarın hipotenüs olduğunu doğrula; yalnız orta nokta sözcüğünü görüp bu uzunluk kuralını uygulama.",
  ],
  [
    "Alanı koordinattan geometriye geri bağla",
    "Bir şeklin alanını hesaplamak için önce şeklin gerçekten hangi türde olduğunu bil. Kenarı a olan eşkenar üçgende yükseklik a√3/2, alan a²√3/4 olur. Tabanları a ve c, bu paralel tabanlar arasındaki dik uzaklığı h olan yamukta alan (a+c)h/2’dir. Şekil eksene paralel çizilmemişse bir koordinat farkını otomatik olarak yükseklik kabul etme; yükseklik tabana dik olmalıdır.",
    "Model üçgenin alanını iki köşe farkından hesaplar: 2S=|(x_B−x_A)(y_C−y_A)−(y_B−y_A)(x_C−x_A)|. Bu ifade, koordinat düzlemindeki tamamlayıcı dik üçgen alanlarının sadeleşmiş hâlidir; ayrı bir ezber olarak gerekli değildir. Asıl kontrol, doğrusal üç köşede alanın sıfır olmasıdır. Uzunluk birimi ile alanın birim karesini ayır; şekli ötelemek alanı değiştirmez.",
  ],
  [
    "Öteleme: konumu değiştir, farkları koru",
    "Bir şeklin her noktasını (h; k) vektörü kadar ötelemek (x; y)→(x+h; y+k) demektir. h sağa-sola, k yukarı-aşağı yönü işaretiyle belirtir. Bir noktayı (−2; 3) kadar ötelemek x’ten 2 çıkarmak ve y’ye 3 eklemektir. Bu işlem tek başına ayna yansıması veya koordinatların yer değiştirmesi değildir.",
    "A ve B aynı ötelemeyi aldığında B′−A′=B−A olur; uzaklık, paralellik ve bölme oranları korunur. Orta nokta ve ağırlık merkezi de aynı vektör kadar taşınır. Sadece bir ucu taşırsan bu sonuçlar zorunlu değildir. Problemi çözmeden önce değişen konumu mu, korunmuş farkı mı aradığını söyle; gereksiz uzun hesap yerine doğru geometrik özelliği kullan.",
  ],
  [
    "Çözüm yolunu seç ve sonucu ikinci yoldan denetle",
    "Veriyi önce küçük bir şekle yerleştir; sonra koşulu türüne ayır: eksene uzaklık, iki nokta arası uzaklık, simetri, orta nokta, oranlı bölme veya ağırlık merkezi. Aynı soruda bu ilişkiler ardışık kullanılabilir. Örneğin önce orta noktadan eksik ucu bulup sonra uzaklığı hesaplamak gerekir; iki bilinmeyeni rastgele uzaklık formülüne koymak işi büyütür.",
    "Sonuç kontrolü hesap tekrarı değildir: iç noktanın uçlar arasında olması, dış noktada doğru uç sırası, simetri merkezinin orta nokta olması, uzaklığın negatif olmaması gibi bağımsız bir özelliği sınarsın. Etkileşimde önce tahminini ve kısa gerekçeni yaz, sonra gerçek koordinatlarla karşılaştır. Modeli kullanmak çalışma puanı veya konu tamamlanma kaydı oluşturmaz; bağımsız sorular ayrı öğrenme kanıtıdır.",
  ],
];

const examples018: Example018[] = [
  [
    "Köşeli yol ile doğru uzaklığı ayır",
    "Eşit birimli dik koordinat sisteminde A(−3; 4) ve B(5; −2) veriliyor. |AB| kaç birimdir?",
    "İki koordinat farkını dik kenar olarak kullan.",
    [
      "A’dan B’ye yatay değişim 5−(−3)=8, düşey değişim −2−4=−6 olur. Dik kenar uzunlukları 8 ve 6’dır.",
      "Pisagor ile |AB|²=8²+(−6)²=64+36=100 yazılır. Uzaklık negatif olamayacağı için pozitif karekök alınır.",
      "|AB|=10 birim. Eksenler boyunca yürüyüş 8+6=14 birimdir; bu farklı bir yolun uzunluğudur.",
    ],
    "10 birim",
    "Uçları ters sırayla çıkarınca (−8)²+6² yine 100 verir; sonuç değişmez.",
    "|Δx|+|Δy| toplamak doğru uzaklığı vermez.",
  ],
  [
    "Eşit uzaklık ve eksen koşulunu birlikte kullan",
    "P(t; 0) noktası A(−2; 3) ve B(4; −1) noktalarına eşit uzaklıktadır. t kaçtır?",
    "İki uzaklığın karesini eşitle; P’nin ordinatı zaten sıfırdır.",
    [
      "|PA|²=(t+2)²+9, |PB|²=(t−4)²+1 olur. Her iki uzaklık negatif olmadığından karelerini eşitlemek eşdeğerdir.",
      "t²+4t+13=t²−8t+17; t² terimleri sadeleşir. 12t=4 ve t=1/3 bulunur.",
      "t=1/3 için iki uzaklığın karesi de 130/9’dur: 49/9+9=121/9+1. Böylece P(1/3; 0) hem eksende hem eşit uzaklıktadır.",
    ],
    "t=1/3",
    "A ve B’nin orta noktası (1; 1)’dir; P’nin bu nokta olması gerekmez, orta dikmenin x ekseniyle kesişimi aranmıştır.",
    "Eşit uzaklığı, P’nin mutlaka [AB] orta noktası olduğu sanısıyla değiştirme.",
  ],
  [
    "Simetri merkezinden görüntüyü bul",
    "A(3; −2) noktası S(−1; 4) merkezine göre yansıtılıyor. A′ koordinatları nedir?",
    "S’yi iki ucun ortası olarak yaz.",
    [
      "S=(A+A′)/2 olduğundan x_A′=2x_S−x_A ve y_A′=2y_S−y_A olur.",
      "x_A′=2(−1)−3=−5; y_A′=2×4−(−2)=10 hesaplanır.",
      "A′(−5; 10). Kontrol için (3−5)/2=−1 ve (−2+10)/2=4; iki koordinat da S’yi verir.",
    ],
    "A′(−5; 10)",
    "S−A=(−4; 6) ve A′−S=(−4; 6) aynı değişimi verir; S iki ucun arasındadır.",
    "Orijin kuralını kullanıp yalnız işaretleri ters çevirmek bu merkezde doğru değildir.",
  ],
  [
    "İçten bölmede yakınlığı kontrol et",
    "A(−4; 2), B(8; −4) farklı noktalardır. P∈[AB] ve |AP|:|PB|=1:2 olduğuna göre P nedir?",
    "A’dan B’ye yolun üçte birini ilerle.",
    [
      "Toplam oran 1+2=3; P=A+(1/3)(B−A) olur. A’nın ağırlığı 2, B’nin ağırlığı 1’dir.",
      "B−A=(12; −6), bunun üçte biri (4; −2). A’ya ekleyince P=(0; 0) bulunur.",
      "|AP|=√20, |PB|=√80=2√20; oran 1:2’dir. P her iki koordinatta uç değerlerin arasındadır.",
    ],
    "P(0; 0)",
    "P’nin A’ya daha yakın olması gerekir; uzaklık denetimi bunu doğrular.",
    "Orandaki 1’i A’nın koordinatına doğrudan katsayı yapmak P’yi ters tarafa yaklaştırır.",
  ],
  [
    "Dıştan bölmede hangi ucun ötesi?",
    "A(1; −1), B(5; 3) ve P doğrusal; P∉[AB], |AP|:|PB|=3:1. P koordinatları nedir?",
    "Oran 1’den büyük olduğundan B’nin ötesindeki P’yi hesapla.",
    [
      "m=3, n=1 için P=(3B−A)/(3−1) olur. Bu bağıntı hem apsise hem ordinata uygulanır.",
      "x_P=(15−1)/2=7, y_P=(9−(−1))/2=5. P(7; 5), A’dan B’ye aynı yönde devam edildiğinde bulunur.",
      "|AP|=√(6²+6²)=6√2; |PB|=√(2²+2²)=2√2. Oran 3’tür; P dışarıdadır ve aynı doğrudadır.",
    ],
    "P(7; 5)",
    "P=B+(1/2)(B−A); B’nin ötesine yarım AB uzunluğu gidilmiştir.",
    "m=n olsaydı sıfır paydayla hesap yapılmazdı; farklı uçlar için sonlu dış bölme noktası olmazdı.",
  ],
  [
    "Ağırlık merkezini kenarortaydan da bul",
    "ABC üçgeninde A(−4; 1), B(5; 4), C(2; −5). G ağırlık merkezini ve A’dan çizilen kenarortaydaki oranı bulun.",
    "Koordinat ortalamasını, karşı kenarın orta noktasıyla karşılaştır.",
    [
      "Üç apsisin toplamı −4+5+2=3, ordinatların toplamı 1+4−5=0. G=(3/3; 0/3)=(1; 0) olur.",
      "BC’nin orta noktası M=(7/2; −1/2). A+(2/3)(M−A)=(−4; 1)+(5; −1)=(1; 0), yani aynı G elde edilir.",
      "AG=(2/3)AM ve GM=(1/3)AM olduğundan |AG|:|GM|=2:1. Köşeler doğrusal değildir; alan 36 birim karedir.",
    ],
    "G(1; 0); |AG|:|GM|=2:1",
    "İki bağımsız hesap aynı G’yi verir; büyük kenarortay parçası A köşesine bitişiktir.",
    "G ile BC’nin orta noktasını karıştırma; üç köşenin değil iki ucun ortalaması farklıdır.",
  ],
];
const recall018: [string, string][] = [
  [
    "P(x; y) noktasının x eksenine uzaklığı neden |x| değildir?",
    "x eksenine en kısa yol düşeydir ve |y| uzunluğundadır; |x|, y eksenine uzaklıktır.",
  ],
  [
    "√((Δx)²+(Δy)²) ile |Δx|+|Δy| ne zaman eşittir?",
    "Yatay veya düşey farklardan en az biri sıfırken; ikisi de sıfırdan farklıysa köşeli yol daha uzundur.",
  ],
  [
    "A’nın S merkezine göre görüntüsünü hangi orta nokta koşulu belirler?",
    "S=(A+A′)/2; bu yüzden A′=2S−A. A=S ise görüntü aynı noktadır.",
  ],
  [
    "İçten |AP|:|PB|=m:n için neden A’nın katsayısı n’dir?",
    "P, A’dan B’ye m/(m+n) kadar ilerler; A katsayısı 1−m/(m+n)=n/(m+n) kalır.",
  ],
  [
    "Dış bölmede hangi iki özel durumda tek bir oran noktası sunulamaz?",
    "A≠B ve m=n ise sonlu dış nokta yoktur. A=B ise uzaklık oranı tek nokta seçmez; uçta 0/0 da tanımsızdır.",
  ],
  [
    "Doğrusal üç noktanın koordinat ortalaması neden gerçek üçgen ağırlık merkezi diye sunulmaz?",
    "Ortalama hesaplanabilir; ancak alan sıfırdır ve sıfır olmayan bir üçgen oluşmaz. 2:1 kenarortay anlatısının üçgen koşulu eksiktir.",
  ],
];
const questions018: Question018[] = [
  [
    "Dik koordinat düzleminde P(k−1; 4−k) noktası I. bölgenin içindedir. k için gerekli ve yeterli koşul hangisidir?",
    ["1<k<4", "1≤k≤4", "k<1", "k>4", "−1<k<4"],
    "I. bölgede iki koordinat da kesin pozitiftir.",
    "k−1>0 ve 4−k>0 birlikte k>1 ve k<4 verir. Bu nedenle 1<k<4. Uç değerlerde bir koordinat sıfır olur; nokta eksendedir, bölgenin içinde değildir.",
  ],
  [
    "Eksenlerde eşit uzunluk birimi kullanılan dik koordinat sisteminde A(−3; 2), B(5; 8). |AB| kaç birimdir?",
    ["10", "14", "2", "100", "√28"],
    "Yatay ve düşey farkları ayrı hesaplayıp karelerini topla.",
    "Δx=5−(−3)=8, Δy=8−2=6. |AB|=√(8²+6²)=√100=10 birimdir. 14, eksenlere paralel köşeli yolun uzunluğu; 100 ise uzaklığın karesidir.",
  ],
  [
    "A(t; −2) noktasının y eksenine uzaklığı 5 birimdir. t’nin bütün olası değerlerini veren küme hangisidir?",
    ["{−5, 5}", "{5}", "{−5}", "{−2, 2}", "{0}"],
    "y eksenine uzaklık apsisin mutlak değeridir.",
    "|t|=5 denklemi t=5 veya t=−5 verir. Ordinatın −2 olması bu uzaklığı değiştirmez; bir bölge koşulu verilmediğinden iki değer de korunur.",
  ],
  [
    "A(4; −3) noktasının S(1; 2) merkezine göre simetriği A′’dir. A′ koordinatları hangisidir?",
    ["(−2; 7)", "(−4; 3)", "(2; −7)", "(5; −1)", "(−3; 4)"],
    "S, A ile A′’nün orta noktasıdır.",
    "A′=2S−A=(2−4; 4−(−3))=(−2; 7). Kontrol: (4−2)/2=1 ve (−3+7)/2=2, yani orta nokta S’dir. Yalnız işaret değiştirme ancak orijin merkezinde geçerlidir.",
  ],
  [
    "[AB] parçasının orta noktası M(2; −1), bir ucu A(−4; 5) olduğuna göre diğer uç B nedir?",
    ["(8; −7)", "(−1; 2)", "(0; 3)", "(−8; 7)", "(6; −6)"],
    "B=2M−A bağıntısını her koordinata uygula.",
    "B=(2×2−(−4); 2×(−1)−5)=(8; −7). A ve B’nin ortalaması ((−4+8)/2; (5−7)/2)=(2; −1) olduğundan kontrol sağlanır.",
  ],
  [
    "A(−2; 4) ve B(8; −1) farklı noktalar; P∈[AB] ve |AP|:|PB|=2:3. P koordinatları nedir?",
    ["(2; 2)", "(4; 1)", "(3; 3/2)", "(−6; 6)", "(6; −2)"],
    "P, A’dan B’ye toplam yolun 2/5’ini ilerler.",
    "P=(3A+2B)/5=((−6+16)/5; (12−2)/5)=(2; 2). A’dan değişim (4; −2), B’ye kalan değişim (6; −3) olduğundan uzunluk oranı 2:3’tür; P parça üzerindedir.",
  ],
  [
    "A(0; 1), B(4; 3), P doğrusal; P∉[AB] ve |AP|:|PB|=3:1. P nedir?",
    ["(6; 4)", "(3; 5/2)", "(−2; 0)", "(12; 10)", "(2; 2)"],
    "Dış bölmede P=(3B−A)/2; oran büyük olduğu için B’nin ötesine geç.",
    "P=((12−0)/2; (9−1)/2)=(6; 4). AP değişimi (6; 3), PB değişimi (−2; −1); uzunluklar 3:1 oranındadır. P=B+(1/2)(B−A) olduğundan doğru üzerinde ve B’nin ötesindedir.",
  ],
  [
    "A(−2; 0) ve B(2; 0) farklı noktalardır. P, AB doğrusu üzerinde ve [AB] dışındadır. |PA|=|PB| koşulunu sağlayan sonlu P için hangisi doğrudur?",
    [
      "Böyle bir sonlu P yoktur.",
      "P=(0; 0) koşulların tamamını sağlar.",
      "P=(4; 0) uygundur.",
      "P=(−4; 0) uygundur.",
      "x eksenindeki bütün P noktaları uygundur.",
    ],
    "Doğru üzerinde eşit uzaklık orta noktayı seçer; dışarıda olma koşulunu da denetle.",
    "AB doğrusu x eksenidir. |x+2|=|x−2| denkleminin tek çözümü x=0’dır; bu nokta [AB] içindedir. Dolayısıyla dışarıdaki sonlu bir P yoktur. Dış bölme formülünde 1:1 oranının paydayı sıfır yapması da bu yokluğu gösterir.",
  ],
  [
    "Doğrusal olmayan A(−3; 1), B(6; 4), C(0; −2) köşeli üçgenin ağırlık merkezi G nedir?",
    ["(1; 1)", "(3/2; 5/2)", "(3; 3)", "(−1; −1)", "(0; 0)"],
    "Üç apsisi ve üç ordinatı ayrı ayrı ortala.",
    "G=((−3+6+0)/3; (1+4−2)/3)=(1; 1). İki köşeyi ortalamak bir kenarın orta noktasını verir; üçgenin ağırlık merkezi üç köşenin koordinat ortalamasıdır.",
  ],
  [
    "A(0; 0), B(6; 0), Q(8; 4). |QA|=4√5 ve |QB|=2√5 olduğundan |QA|:|QB|=2:1. Q’yu içten veya dıştan bölme formülüyle tek başına bulmak neden geçerli değildir?",
    [
      "Q, A ve B doğrusal değildir; uzunluk oranı tek başına bölme noktası koşulu değildir.",
      "Verilen iki uzaklığın oranı 2:1 değildir.",
      "Uzaklık oranları yalnız tam sayı koordinatlarda tanımlıdır.",
      "A orijin olduğu için bütün uzaklık formülleri geçersizdir.",
      "Doğrusal olma sağlanmadan Q mutlaka [AB] orta noktasıdır.",
    ],
    "AB doğrusunun y koordinatı sıfırdır; Q’nun ordinatını karşılaştır.",
    "AB doğrusu y=0 iken Q’nun ordinatı 4’tür; Q doğru üzerinde değildir. Verilen uzaklıklar ve oran doğrudur ama iç/dış bölme bağıntıları doğrusal olma ve yer koşullarını da gerektirir. Aynı oranı sağlayan düzlem noktaları arasından yalnız oran bilgisiyle Q seçilemez.",
  ],
];
export const forge018MathTopics: Record<string, string> = {
  [id018]: "detail-138",
};
export const forge018MathGuides: LessonGuide[] = [
  {
    id: id018,
    minutes: 80,
    objectives: [
      "Konum, eksene uzaklık ve iki nokta arası uzaklığı birbirinden ayır.",
      "Yansıma, orta nokta ve ötelemeyi koordinat koşullarıyla açıkla.",
      "İç/dış bölmede oran sırasını, doğrusal olmayı ve tanımsız sınırları denetle.",
      "Ağırlık merkezi ve şekil ilişkilerini örnek üzerinde gerekçelendir.",
    ],
    source: source018,
    sections: sections018.map(([title, a, b]): GuideSection => ({
      title,
      paragraphs: [a, b],
    })),
    examples: examples018.map(
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
          label: ["Koşulu belirle", "Bağıntıyı uygula", "Geometriyle denetle"][
            i
          ],
          explanation,
        })),
        answer,
        check,
        pitfall,
      }),
    ),
    recall: recall018.map(([prompt, answer]) => ({ prompt, answer })),
  },
];
export const forge018MathLessons: Lesson[] = [
  {
    id: id018,
    subjectId: "tyt-geometri",
    title: txt("Noktanın analitiği: konumdan geometrik ilişkiye"),
    minutes: 80,
    objectives: forge018MathGuides[0].objectives.map(txt),
    source: txt(source018),
    tags: [id018, "kaynakli", "forge018"],
    body: sections018.map(([title, a, b]) => ({
      title: txt(title),
      text: txt(a + "\n\n" + b),
    })),
    questions: questions018.map(
      ([prompt, choices, hint, explanation], i): Question => {
        const rotation = (i * 2 + 1) % 5,
          correct = choices[0],
          options = [...choices.slice(rotation), ...choices.slice(0, rotation)];
        return {
          id: `f018-math-${id018}-${i + 1}`,
          prompt: txt(prompt),
          options: options.map(txt),
          answer: options.indexOf(correct),
          hint: txt(hint),
          explanation: txt(explanation),
          skill: "f018-point-geometry",
        };
      },
    ),
  },
];
