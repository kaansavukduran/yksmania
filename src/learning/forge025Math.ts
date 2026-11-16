import { txt, type Lesson } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide } from "./guides/types";
const number025 = (n: number, limit: number) => {
  if (!Number.isFinite(n) || Math.abs(n) > limit)
    throw new RangeError("MATH025_INPUT_SCOPE");
  return Object.is(n, -0) ? 0 : n;
};
const result025 = (n: number) => {
  if (!Number.isFinite(n)) throw new RangeError("MATH025_OUTPUT_PRECISION");
  return Object.is(n, -0) ? 0 : n;
};
export type Polynomial025 = readonly [number, number, number, number];
export type Quadratic025 = readonly [number, number, number];
function coefficients025(c: readonly number[], length: number) {
  if (!Array.isArray(c) || c.length !== length)
    throw new RangeError("MATH025_COEFFICIENTS");
  for (let i = 0; i < length; i++) number025(c[i], 10);
}
const value025 = (c: readonly number[], x: number) =>
  result025(c.reduce((a, b) => a * x + b, 0));
/** Integrated difference uses (b^k-a^k)/(b-a), avoiding subtraction of near-equal primitive values. */
function interval025(c: readonly number[], a: number, b: number) {
  const width = b - a,
    degree = c.length - 1;
  return result025(
    width *
      c.reduce((sum, coefficient, i) => {
        const k = degree - i + 1;
        let symmetric = 0;
        for (let j = 0; j < k; j++) symmetric += b ** (k - 1 - j) * a ** j;
        return sum + (coefficient * symmetric) / k;
      }, 0),
  );
}
export function primitiveFamily025(
  c: Polynomial025,
  x: number,
  constant: number,
  initialX = 0,
  initialY = 0,
) {
  coefficients025(c, 4);
  x = number025(x, 6);
  constant = number025(constant, 20);
  initialX = number025(initialX, 6);
  initialY = number025(initialY, 1000);
  const primitive = [c[0] / 4, c[1] / 3, c[2] / 2, c[3], constant];
  const at = result025(interval025(c, 0, x) + constant),
    conditionConstant = result025(initialY - interval025(c, 0, initialX));
  return {
    coefficients: [...c],
    primitive,
    constant,
    value: at,
    derivative: value025(c, x),
    baseValue: interval025(c, 0, x),
    conditionConstant,
    conditionValue: result025(interval025(c, 0, x) + conditionConstant),
    initialX,
    initialY,
  };
}
export function definiteIntegral025(
  c: Polynomial025,
  lower: number,
  upper: number,
  probe: number,
) {
  coefficients025(c, 4);
  lower = number025(lower, 6);
  upper = number025(upper, 6);
  probe = number025(probe, 6);
  const lo = Math.min(lower, upper),
    hi = Math.max(lower, upper),
    point = Math.max(lo, Math.min(hi, probe)),
    signed = interval025(c, lower, upper),
    accumulation = interval025(c, lower, point);
  return {
    lower,
    upper,
    orientation: upper === lower ? 0 : upper > lower ? 1 : -1,
    signed,
    baseAtLower: interval025(c, 0, lower),
    baseAtUpper: interval025(c, 0, upper),
    point,
    accumulation,
    remaining: interval025(c, point, upper),
    integrandAtPoint: value025(c, point),
    mean: upper === lower ? null : result025(signed / (upper - lower)),
  };
}
export type RiemannMethod025 =
  "left" | "right" | "midpoint" | "lower" | "upper";
function roots025(c: Quadratic025, lo: number, hi: number) {
  const [a, b, d] = c,
    roots: number[] = [];
  if (a === 0 && b === 0 && d === 0) return [];
  const atLo = value025(c, lo) === 0,
    atHi = value025(c, hi) === 0;
  if (atLo && atHi) return [lo, hi];
  if (atLo || atHi) {
    const endpoint = atLo ? lo : hi;
    const candidates = a === 0 ? [endpoint] : [endpoint, -b / a - endpoint];
    return [
      ...new Set(
        candidates.filter((x) => Number.isFinite(x) && x >= lo && x <= hi),
      ),
    ].sort((x, y) => x - y);
  }
  if (a === 0) {
    if (b !== 0) roots.push(-d / b);
  } else {
    const discriminant = b * b - 4 * a * d;
    if (discriminant === 0) roots.push(-b / (2 * a));
    else if (discriminant > 0) {
      const q = -0.5 * (b + (b >= 0 ? 1 : -1) * Math.sqrt(discriminant));
      roots.push(q / a, d / q);
    }
  }
  return [
    ...new Set(roots.filter((x) => Number.isFinite(x) && x >= lo && x <= hi)),
  ].sort((a, b) => a - b);
}
export function riemannArea025(
  f: Quadratic025,
  g: Quadratic025,
  lower: number,
  upper: number,
  count: number,
  method: RiemannMethod025,
) {
  coefficients025(f, 3);
  coefficients025(g, 3);
  lower = number025(lower, 6);
  upper = number025(upper, 6);
  if (upper <= lower || !Number.isInteger(count) || count < 2 || count > 64)
    throw new RangeError("MATH025_PARTITION");
  if (!["left", "right", "midpoint", "lower", "upper"].includes(method))
    throw new RangeError("MATH025_METHOD");
  const difference: Quadratic025 = [f[0] - g[0], f[1] - g[1], f[2] - g[2]],
    roots = roots025(difference, lower, upper),
    cuts = [lower, ...roots.filter((r) => r > lower && r < upper), upper],
    width = (upper - lower) / count;
  const pieces = cuts.slice(0, -1).map((from, i) => {
    const to = cuts[i + 1],
      signed = interval025(difference, from, to);
    return {
      from,
      to,
      signed,
      area: Math.abs(signed),
      sign: Math.sign(value025(difference, from + (to - from) / 2)),
    };
  });
  const vertex =
    difference[0] === 0 ? null : -difference[1] / (2 * difference[0]);
  const rectangles = Array.from({ length: count }, (_, i) => {
    const from = lower + ((upper - lower) * i) / count,
      to =
        i === count - 1 ? upper : lower + ((upper - lower) * (i + 1)) / count,
      candidates = [from, to];
    if (to <= from) throw new RangeError("MATH025_PARTITION_PRECISION");
    if (vertex !== null && vertex > from && vertex < to)
      candidates.push(vertex);
    const vals = candidates.map((x) => ({ x, y: value025(difference, x) })),
      min = vals.reduce((a, b) => (a.y <= b.y ? a : b)),
      max = vals.reduce((a, b) => (a.y >= b.y ? a : b));
    const sample =
        method === "left"
          ? from
          : method === "right"
            ? to
            : method === "midpoint"
              ? from + (to - from) / 2
              : method === "lower"
                ? min.x
                : max.x,
      height = value025(difference, sample);
    return {
      from,
      to,
      sample,
      height,
      contribution: result025((to - from) * height),
      minimum: min.y,
      maximum: max.y,
    };
  });
  const signed = interval025(difference, lower, upper),
    estimate = result025(rectangles.reduce((a, r) => a + r.contribution, 0)),
    lowerSum = result025(
      rectangles.reduce((a, r) => a + (r.to - r.from) * r.minimum, 0),
    ),
    upperSum = result025(
      rectangles.reduce((a, r) => a + (r.to - r.from) * r.maximum, 0),
    );
  return {
    difference: [...difference],
    roots,
    pieces,
    width,
    rectangles,
    signed,
    geometricArea: result025(pieces.reduce((a, p) => a + p.area, 0)),
    estimate,
    error: result025(estimate - signed),
    lowerSum,
    upperSum,
    coincident: difference.every((c) => c === 0),
  };
}

type Item025 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: QuestionGuidance;
};
export const forge025MathTopics: Record<string, string> = {
  "ayt-belirsiz-integral": "detail-477",
  "ayt-belirli-integral": "detail-478",
  "ayt-alan-riemann": "detail-479",
};
export const forge025MathGuides: LessonGuide[] = [
  {
    id: "ayt-belirsiz-integral",
    minutes: 95,
    objectives: [
      "Ters türev, serbest sabit ve başlangıç koşulunun farklı rollerini açıkla.",
      "Polinom, kök ve uygun kuvvetlerin integrallerini tanım aralığında bul.",
      "Değişken değiştirmede diferansiyeli ve iç katsayıyı izleyip türevle doğrula.",
    ],
    sections: [
      {
        title: "Ters türev değişimden fonksiyona döner",
        paragraphs: [
          "Türev, bir fonksiyonun hangi hızla değiştiğini söyler. Ters türevde ise değişim kuralı f(x) verilir ve F′(x)=f(x) olacak bir F aranır. Örneğin f(x)=6x için F(x)=3x² uygun bir başlangıçtır; çünkü 3x²’nin türevi 6x olur. Buradaki terslik fonksiyonun girdisiyle çıktısını yer değiştiren ters fonksiyon işlemi değildir.",
          "İntegral işareti ∫, integrand f(x) ve dx birlikte okunur: ∫f(x)dx. dx, işlemin x değişkenine göre yapıldığını belirtir. x yerine t kullanılırsa ∫f(t)dt aynı tür işlemdir. Bir ters türev bulduğunda onu yeniden türevlemek, sonucun başlangıçtaki değişim kuralına dönüp dönmediğini denetler.",
        ],
      },
      {
        title: "Tek bir eğri yerine bir aile bulunur",
        paragraphs: [
          "3x², 3x²+4 ve 3x²−7 fonksiyonlarının türevleri aynıdır. Sabit eklemek değişim oranını etkilemez. Bu nedenle ∫6x dx=3x²+C yazılır; C, x’e bağlı olmayan herhangi bir gerçek sabittir. Belirsiz integralin sonucu tek bir sayı değil bir fonksiyon ailesidir.",
          "Bir aralık üzerinde türevleri eşit olan iki fonksiyon sabit farkla ayrılır. Aralık koşulu önemlidir: tanım kümesi birbirinden kopuk parçalardan oluşuyorsa her parçanın sabiti ayrı seçilebilir. Negatif kuvvetin sıfır yasağını kaldırıp iki tarafı tek zorunlu sabitle birleştirmek ek bir koşul koyar.",
        ],
      },
      {
        title: "Kuvvet kuralı türevle doğrulanır",
        paragraphs: [
          "n≠−1 için ∫xⁿdx=xⁿ⁺¹/(n+1)+C kuralı kullanılır. Üs bir artırılır ve yeni üs katsayı olarak paydaya yazılır. Bunun türevi (n+1)xⁿ/(n+1)=xⁿ olur. Örneğin ∫x³dx=x⁴/4+C; x³’ün türevini alıp 3x² yazmak ters yönde bir işlemdir.",
          "Formülün ilgili gerçek tanım aralığında anlamlı olması gerekir. n=−1 olduğunda payda sıfır olacağından bu kuvvet formülü uygulanamaz. Bu durum integralin mutlaka yok olduğunu söylemez; yalnız bu kuralın o üs için bir sonuç vermediğini söyler. Sıfıra bölme yoluyla bir aday üretilmez.",
        ],
      },
      {
        title: "Sabit fonksiyonun integrali doğrusal olur",
        paragraphs: [
          "∫k dx=kx+C, çünkü kx’in türevi k olur. Özellikle ∫1 dx=x+C ve ∫0 dx=C bulunur. Sabitin türevinin sıfır olması ile sabit fonksiyonun integralinin sıfır olması aynı iddia değildir. İşlemin türev mi integral mi olduğunu en başta belirle.",
          "Sabit katsayı integralin dışına alınabilir: ∫a f(x)dx=a∫f(x)dx. Son aile yine tek bir serbest C ile gösterilir; farklı terimlerden gelen sabitler tek sabitte toplanabilir. Katsayı sıfır olduğunda da ∫0 dx=C ailesi korunur, yalnız 0 yazılarak bütün sabit fonksiyonlar kaybedilmez.",
        ],
      },
      {
        title: "Toplamı terim terim işle",
        paragraphs: [
          "Toplam ve fark integralde doğrusal davranır. ∫(3x²−4x+2)dx=x³−2x²+2x+C olur. Her terimin işareti, katsayısı ve yeni üssü ayrı takip edilir. Sonuç türevlenince 3x²−4x+2 gelmelidir; yalnız bir noktadaki sayısal uyuşma fonksiyon eşitliği için yeterli değildir.",
          "Çarpım veya bölüm için aynı dağıtma kuralı yoktur. ∫u(x)v(x)dx genel olarak ∫u dx ile ∫v dx çarpımı değildir. Bir çarpım önce açılabiliyorsa polinom biçimine getirilir; bir bileşke ise iç türev eşleşmesiyle ele alınabilir. En dış işlemi görmek burada da yöntemi belirler.",
        ],
      },
      {
        title: "Kökü ve negatif kuvveti alanıyla oku",
        paragraphs: [
          "√x=x^(1/2), 1/x²=x⁻² biçimine dönüştürülerek kuvvet kuralı uygulanabilir. Örneğin x>0 için ∫√x dx=(2/3)x^(3/2)+C; x≠0 olan bir aralıkta ∫x⁻²dx=−1/x+C olur. İşaret ve katsayı, bulunan adayın türeviyle kontrol edilir.",
          "Çift kökün gerçek tanım koşulu, negatif kuvvetin sıfır yasağı ve kesirli üssün gerçek yorumu birlikte korunur. Kaynak ifadenin tanımsız olduğu noktaya sade biçimden yeni değer eklenmez. Ters türevi bir açık aralıkta konuşmak, formülün hangi girdiler için kullanılacağını açık tutar.",
        ],
      },
      {
        title: "Önce cebirsel hazırlık yap",
        paragraphs: [
          "(x+2)(x−1)=x²+x−2 olduğu için bu çarpımın integrali x³/3+x²/2−2x+C olarak bulunur. Açılımda her çarpım ve işaret doğru olmalıdır. Aynı zamanda 1/x³ gibi terimleri x⁻³ biçiminde yazmak kuvvet kuralını görünür yapar.",
          "Bölümde paydaki her terim aynı paydaya bölünebilir; fakat paydanın toplamına keyfî dağıtılamaz. Örneğin (x³+x)/x=x²+1 yalnız x≠0 için geçerlidir. Son adayın türevi bu ortak alanda integrand ile aynıdır; sadeleşme ilk tanımın deliğini tek başına kapatmaz.",
        ],
      },
      {
        title: "Başlangıç koşulu aileden bir eğri seçer",
        paragraphs: [
          "F′(x)=f(x) kuralından bulunan F(x)=H(x)+C ailesinde F(a)=b koşulu varsa H(a)+C=b yazılır. Buradan C=b−H(a) çıkar. Örneğin F′(x)=4x ve F(1)=7 ise F(x)=2x²+5 olur. Verilen değer eğriyi seçer; türev kuralını değiştirmez.",
          "Koşul yerine konduktan sonra hem türevi hem başlangıç değerini kontrol et. Yalnız F(a)=b sağlayan rastgele bir fonksiyon doğru olamaz; tüm aralıkta F′=f de sağlanmalıdır. Laboratuvarda serbest sabitli eğri ile başlangıç koşulunun seçtiği eğri ayrı hesaplanır.",
        ],
      },
      {
        title: "Diferansiyel değişken değişimini takip eder",
        paragraphs: [
          "u=g(x) seçildiğinde du=g′(x)dx yazılır. Bu eşitlik türevdeki zincir kuralının integral yönünde izlenmesidir. Örneğin u=x²+3 için du=2x dx; integrandda 2x dx grubu varsa tamamı du olarak değiştirilebilir. dx simgesini kaybetmek katsayı hatasını gizler.",
          "Dönüşümden sonra integralin içindeki bütün x ifadeleri u cinsinden yazılmalıdır. Aynı integralde bir kısmı x, bir kısmı u bırakmak işlemi tamamlamaz. Belirsiz integral alındıktan sonra u=g(x) geri konur ve aday türevlenerek ilk integrandın aynısı elde edilir.",
        ],
      },
      {
        title: "İç türevin sabit katını tamamla",
        paragraphs: [
          "∫x(x²+3)²dx ifadesinde u=x²+3 seçilirse du=2x dx olur. Verilen x dx=(1/2)du olduğu için integral (1/2)∫u²du=(x²+3)³/6+C çıkar. Eksik 2 çarpanı görmezden gelinirse sonuç iki kat büyük olur.",
          "Çarpanı tamamlamak gerçek bir eşitliktir; aynı anda dengeleyici katsayı da yazılmalıdır. Her bileşke için iç türev tam bulunmayabilir. Uygun eşleşme yoksa keyfî olarak du yazmak yerine ifadeyi açma veya başka bir dönüşüm düşünülür. Çözümün türevi yöntemin son denetimidir.",
        ],
      },
      {
        title: "Doğrusal içte katsayıya böl",
        paragraphs: [
          "a≠0 ve n≠−1 için ∫(ax+b)ⁿdx=(ax+b)ⁿ⁺¹/[a(n+1)]+C olur. Türevde gelecek iç katsayı a, integralde önceden dengelenmiştir. Örneğin ∫(2x+1)³dx=(2x+1)⁴/8+C; yalnız 4’e bölmek iç katsayıyı eksik bırakır.",
          "a=0 olursa iç ifade sabit fonksiyondur; bu formülün paydasına 0 yazılmaz. İlgili gerçek alanda sabit (bⁿ)x+C yöntemi kullanılır. Kök veya negatif kuvvet içeren bileşkelerde yine ax+b için gerekli tanım koşulları korunur.",
        ],
      },
      {
        title: "Türevle verilmiş fonksiyon ilişkisini geri kur",
        paragraphs: [
          "∫f(x)dx=H(x)+C deniyorsa her iki taraf türevlenerek f(x)=H′(x) elde edilir. Fakat integralin dışında x gibi bir çarpan varsa önce eşitliğin tamamının yapısı okunur. x∫f(x)dx türündeki bir ürünü yalnız iç integral türevine indirgemek çarpım kuralını atlar.",
          "Belirsiz integralde C’nin sayısal değerini belirlemek için ayrıca bir koşul gerekir. İstenen yalnız f ise sabit türevde yok olur. İstenen aileden bir fonksiyon değeri ise sabiti belirleyecek koşulu aramak gerekir; verilmeyen başlangıç değeri keyfî olarak sıfır seçilmez.",
        ],
      },
      {
        title: "Aday sonucun türevi en güçlü kontroldür",
        paragraphs: [
          "İntegral sorusunda aday G(x) türevlenerek G′(x) ile f(x) karşılaştırılır. Fark sıfırsa ve ortak tanım aralığı uygunsa aday bir ters türevdir. Bir sabit fark sonucu bozmaz; x’e bağlı bir fark ise genellikle farklı bir türev üretir.",
          "Örneğin x⁴/4+7 ile x⁴/4−2 aynı integrandın ters türevleridir; x⁴/4+7x öyle değildir. Kontrol, sonuca yalnız C harfini eklemekten fazlasıdır: kuvvet, iç türev, katsayı ve işaretin her biri geri gelmelidir. Her çözümlü örnek bu kontrolü açıkça uygular.",
        ],
      },
      {
        title: "Aile grafiğinde yüksekliği eğimden ayır",
        paragraphs: [
          "Laboratuvarda f(x)=Ax³+Bx²+Cx+D değişim kuralını seç. Bir ters türev Ax⁴/4+Bx³/3+Cx²/2+Dx+K olur. K değişirken grafik düşey kayar; aynı x’te türevi değişmez. Bu, sabitin neden türev bilgisinden tek başına bulunamadığını gösterir.",
          "Bir başlangıç noktası seçildiğinde gerekli K ayrıca hesaplanır. Serbest K ile koşulu sağlayan K birbirine karıştırılmaz. Grafikler sayısal sonuçla birlikte okunur; gözle benzer görünmeleri fonksiyonların aynı olduğunu kanıtlamaz. Keşif kaydı bağımsız soru çözümünün yerini tutmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Polinomu ters yönde işle",
        prompt: "∫(8x³−6x+5)dx ailesini bul.",
        strategy: "Üsleri bir artır, yeni üslere böl ve sabiti ekle.",
        steps: [
          {
            label: "Kübik terim",
            explanation: "8x³ → 8x⁴/4=2x⁴.",
          },
          {
            label: "Diğer terimler",
            explanation: "−6x → −3x²; 5 → 5x.",
          },
          {
            label: "Aile",
            explanation: "2x⁴−3x²+5x+C elde edilir.",
          },
        ],
        answer: "2x⁴−3x²+5x+C.",
        check: "Türev 8x³−6x+5; serbest C türevde yok olur.",
        pitfall: "5 sabit teriminin integralini 0 alma.",
      },
      {
        title: "Kökle negatif kuvveti ayrı kontrol et",
        prompt: "x>0 için ∫(2√x+3/x²)dx nedir?",
        strategy: "Kökü x^(1/2), paydalı terimi 3x⁻² olarak oku.",
        steps: [
          {
            label: "Kuvvetler",
            explanation: "2x^(1/2) integrali (4/3)x^(3/2).",
          },
          {
            label: "Negatif üs",
            explanation: "3x⁻² integrali −3x⁻¹; yeni üs −1’dir.",
          },
          {
            label: "Birleştir",
            explanation: "(4/3)x^(3/2)−3/x+C, x>0.",
          },
        ],
        answer: "(4/3)x^(3/2)−3/x+C.",
        check: "Türev 2√x+3/x²; iki işaret birlikte geri gelir.",
        pitfall: "Negatif üste yeni üsse bölmenin işaretini kaybetme.",
      },
      {
        title: "Koşul aileden doğru eğriyi seçer",
        prompt: "F′(x)=6x−4 ve F(2)=9. F(−1) kaçtır?",
        strategy: "Önce aileyi, sonra C’yi ve istenen değeri bul.",
        steps: [
          {
            label: "Aile",
            explanation: "F(x)=3x²−4x+C.",
          },
          {
            label: "Koşul",
            explanation: "F(2)=12−8+C=9 ⇒ C=5.",
          },
          {
            label: "Değer",
            explanation: "F(−1)=3+4+5=12.",
          },
        ],
        answer: "12.",
        check: "F′=6x−4 ve F(2)=9 aynı anda sağlanır.",
        pitfall:
          "F(2) değerini türevdeki x yerine yazıp C’yi aramadan ilerleme.",
      },
      {
        title: "İç türev katsayısını dengele",
        prompt: "∫x(x²+5)³dx ifadesini bul.",
        strategy: "u=x²+5 seç, eksik 2 katsayısını dengele.",
        steps: [
          {
            label: "Diferansiyel",
            explanation: "du=2x dx, bu nedenle x dx=du/2.",
          },
          {
            label: "Yeni integral",
            explanation: "(1/2)∫u³du=u⁴/8+C.",
          },
          {
            label: "Geri dönüş",
            explanation: "(x²+5)⁴/8+C.",
          },
        ],
        answer: "(x²+5)⁴/8+C.",
        check: "Türev (1/8)·4(x²+5)³·2x=x(x²+5)³.",
        pitfall: "İç türevin 2 katsayısını unutup /4 yazma.",
      },
      {
        title: "Adayları türevle ayırt et",
        prompt:
          "G₁(x)=(3x−2)³/9 ve G₂(x)=(3x−2)³/3. Hangisi (3x−2)²’nin ters türevidir?",
        strategy: "Her adayın zincir türevini al.",
        steps: [
          {
            label: "Birinci aday",
            explanation: "G₁′=(1/9)·3(3x−2)²·3=(3x−2)².",
          },
          {
            label: "İkinci aday",
            explanation: "G₂′=3(3x−2)²; integrandın üç katı.",
          },
          {
            label: "Sonuç",
            explanation: "G₁+C ailesi uygundur; G₂+C uygun değildir.",
          },
        ],
        answer: "Yalnız G₁.",
        check: "Dış kuvvet ve iç katsayı aynı kontrolde kullanıldı.",
        pitfall: "Yalnız üs artışına bakıp iç katsayıyı gözden kaçırma.",
      },
      {
        title: "Değişim birimi toplam birimine döner",
        prompt:
          "Bir depoya giriş debisi q(t)=4t+3 litre/dakika. V′=q ve V(0)=12 litre ise V(3) kaç litredir?",
        strategy: "Debinin ters türevini alıp başlangıç hacmini koru.",
        steps: [
          {
            label: "Aile",
            explanation: "V(t)=2t²+3t+C litre.",
          },
          {
            label: "Başlangıç",
            explanation: "V(0)=C=12 litre.",
          },
          {
            label: "Son hacim",
            explanation: "V(3)=18+9+12=39 litre.",
          },
        ],
        answer: "39 litre.",
        check: "İlk 3 dakikada artış 27 litre, başlangıç 12 litre; toplam 39.",
        pitfall: "Yalnız artışı hesaplayıp toplam hacim diye sunma.",
      },
    ],
    recall: [
      {
        prompt: "Belirsiz integral neden +C içerir?",
        answer:
          "Aynı aralıkta türevleri eşit fonksiyonlar sabit farkla ayrılır; türev bilgisi düşey yüksekliği tek başına belirlemez.",
      },
      {
        prompt: "Kuvvet formülünde hangi üs dışlanır?",
        answer:
          "n=−1; yeni üs n+1 sıfır olacağından bu formülle bölme yapılamaz. Bu, genel ters türev yokluğu iddiası değildir.",
      },
      {
        prompt: "u=g(x) dönüşümünde ne birlikte değişir?",
        answer:
          "du=g′(x)dx; integralin tüm değişkenleri ve katsayıları u cinsine geçer, sonra belirsiz sonuçta x’e dönülür.",
      },
      {
        prompt: "Bir ters türev adayını nasıl denetlersin?",
        answer:
          "Ortak tanım aralığında türevini alır ve integrandın aynısını bulup bulmadığını kontrol edersin.",
      },
    ],
    source:
      "MEBİ AYT Matematik Konu Özetleri, PDF 91–92 ve 94–100 (basılı 89–90 ve 92–98); Dersler Cepte 12. Sınıf Matematik İntegral, sayfa 10–16; OGM İntegral Video Ders Notu ve 069–070–071–073 öğretim notlarının ilgili tanım, dönüşüm ve alan bölümleri. Tanım aralığı, işaret, bölüntü ve yakınsama koşulları karşılaştırılarak hazırlanmış özgün öğretim. Alıştırmalar özgündür; resmî sınav soruları değildir.",
  },
  {
    id: "ayt-belirli-integral",
    minutes: 95,
    objectives: [
      "Belirli integrali yönlü birikim ve ters türev uç farkıyla hesapla.",
      "Sınır, doğrusallık, simetri, parçalı tanım ve değişken dönüşümünü koşullarıyla kullan.",
      "Birikim türevini, ortalama değeri ve fiziksel değişimi birbirinden ayır.",
    ],
    sections: [
      {
        title: "Belirli integral bir aralıktaki net birikimdir",
        paragraphs: [
          "∫ₐᵇf(x)dx, f’nin a’dan b’ye yönlü birikimini gösterir. f bir hızsa bu değer konum değişimidir; hız negatifken katkı da negatif olabilir. f birim zamanda üretim miktarıysa zamanla çarpılan katkılar toplam üretimi verir. Sonucun birimi integrand birimi ile yatay değişken biriminin çarpımıdır.",
          "Alt sınır a ve üst sınır b işlemin parçasıdır. Aynı fonksiyonu başka aralıkta toplamak başka sonuç verir. Belirli integralin değeri tek bir sayıdır; belirsiz integraldeki serbest sabitli fonksiyon ailesinden bu yönüyle ayrılır. Grafikteki geometrik alanın her zaman aynısı olduğu varsayılmaz.",
        ],
      },
      {
        title: "Ters türev uç değer farkıyla hesabı kolaylaştırır",
        paragraphs: [
          "f, [a,b] üzerinde sürekli ve F′=f ise ∫ₐᵇf(x)dx=F(b)−F(a) olur. Bu, sürekli integrand için temel hesap bağıntısıdır. Önce bir ters türev bulunur, sonra üst sınırdaki değerinden alt sınırdaki değeri çıkarılır. f(b)−f(a) yazmak integrandı ters türevle karıştırır.",
          "Süreklilik burada yeterli ve kullanışlı bir koşuldur. Parçalı sınırlı fonksiyonlarda integral yine bulunabilir; değişen kuralın noktalarında bölerek hesap yapılır. Aralık içinde tanımsızlık veya sonsuzluk varsa formülü körlemesine uygulamak uygun değildir; sıradan belirli integralin varsayımları yeniden kontrol edilir.",
        ],
      },
      {
        title: "Sabitlerin neden sonuçta kalmadığını gör",
        paragraphs: [
          "F bir ters türevse F+C de ters türevdir. Uç farkında [F(b)+C]−[F(a)+C]=F(b)−F(a) olduğundan C iptal olur. Bu nedenle belirli integralin sonuna +C yazılmaz. Üst ve alt uçta iki bağımsız sabit seçmek aynı ters türev fonksiyonunu kullanma koşulunu bozar.",
          "Bir başlangıç değerinin verilmesi bu hesabın sonucunu değiştirmez; aynı f’nin farklı ters türevleri aynı uç farkını verir. Laboratuvarda gösterilen alt ve üst ters türev değerlerinin hangi sırayla çıkarıldığını izle. Net birikimin yönü bu çıkarma sırasıyla birlikte korunur.",
        ],
      },
      {
        title: "Sınırların sırası yönü belirler",
        paragraphs: [
          "∫ᵦₐf(x)dx=−∫ₐᵇf(x)dx ve ∫ₐₐf(x)dx=0 olur. Pozitif bir fonksiyonda bile üst sınır alt sınırdan küçükse yönlü integral negatif olabilir. Sıfır genişlikli bir aralığın birikimi yoktur; bu, f(a) fonksiyon değerinin sıfır olması demek değildir.",
          "Bir soruda sınırları küçükten büyüğe çevirdiğinde eksi işaretini de ekle. Geometrik alan ise yön değiştirilerek negatifleştirilmez; alan hesabında uçlar sıralanır ve yükseklik farkının mutlak değeri kullanılır. Hangi niceliğin istendiği daha işlem başlamadan belirlenmelidir.",
        ],
      },
      {
        title: "Aralığı parçalara ayır ve yeniden birleştir",
        paragraphs: [
          "a<c<b için ∫ₐᵇf=∫ₐᶜf+∫ᶜᵇf. Bölme noktası, fonksiyonun kuralının değiştiği bir yer veya hesabı kolaylaştıran bir değer olabilir. Her parça kendi sınırlarıyla hesaplanır; ortak c noktasının iki kez görünmesi alanı iki kez saymak değildir.",
          "Yönlü sınırlarla bu bağıntı daha genel sıralamalarda da kullanılabilir. Eksik bir aralığın integralini bulurken bilinen toplamdan diğer parçayı çıkar. Fonksiyonun aynı olduğu aralığı ve integralin yönünü koru; farklı fonksiyonların sayılarını yalnız sınırları benziyor diye birleştirme.",
        ],
      },
      {
        title: "Doğrusallık katsayıları toplamın dışında tutar",
        paragraphs: [
          "Aynı sınırlar üzerinde ∫(kf+mg)=k∫f+m∫g olur. Verilen iki integral değerinden doğrusal birleşimin değeri fonksiyonların açık kuralları bilinmeden bulunabilir. Örneğin ∫f=5 ve ∫g=−2 ise ∫(2f−3g)=10+6=16 bulunur.",
          "Bu özellik çarpım için genellenmez: ∫fg, ∫f ile ∫g’nin çarpımı değildir. Sınırların her terimde aynı olup olmadığı da kontrol edilir. Ters çevrilmiş bir integral varsa önce yön işareti düzeltilir, ardından katsayılarla hesap yapılır.",
        ],
      },
      {
        title: "Parçalı fonksiyonda kuralın değiştiği yerde böl",
        paragraphs: [
          "f(x)=x, x<1; f(x)=2, x≥1 olsun. [0,3] üzerinde integral ∫₀¹x dx+∫₁³2 dx=1/2+4=9/2 olur. Her parçada hangi kuralın geçerli olduğu belirlenir. Bir parçanın polinomunu diğer tarafa taşımak farklı bir fonksiyonun integralini almak olur.",
          "Sınırlı bir fonksiyonun yalnız tek bir noktadaki değerini değiştirmek Riemann integralini değiştirmez. Örnekte f(1) değerinin hangi parçadan geldiği fonksiyon tanımı için önemlidir, fakat tek noktanın yatay genişliği olmadığı için integralde ek bir alan oluşturmaz. Bu, aralıktaki bütün değerlerin önemsiz olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Mutlak değerli integralde işaret değişimini bul",
        paragraphs: [
          "∫|g(x)|dx hesabında g’nin kökleri ve işareti incelenir. g≥0 olan parçada |g|=g, g≤0 olan parçada |g|=−g yazılır. Kökün yalnız bulunması yeterli değildir; çift katlı kökte işaret değişmeyebilir. Parçaların işaretleri bir test noktasıyla doğrulanır.",
          "Sonucun negatif çıkmaması, her adımın doğru yapıldığını tek başına kanıtlamaz. Önce doğru parçalı ifadeyi kur, sonra uç farklarını hesapla. |∫g| ile ∫|g| genellikle farklıdır; zıt işaretli katkılar ilk ifadede birbirini götürebilir, ikinci ifadede geometrik büyüklük olarak toplanır.",
        ],
      },
      {
        title: "Simetri integralde iptali veya eşit katkıyı açıklar",
        paragraphs: [
          "Simetrik [−a,a] aralığında integrallenebilir tek fonksiyon için f(−x)=−f(x) olduğundan integral 0 olur. Çift fonksiyon için f(−x)=f(x) ve integral 2∫₀ᵃf(x)dx olur. Bu bağıntılar uygun simetrinin ve simetrik sınırların birlikte sonucudur.",
          "Bir toplamda tek ve çift terimler ayrılarak hesap kısaltılabilir. x³+x² için simetrik aralıkta kübik katkı iptal olur, karesel katkı kalır. İntegralin sıfır olması fonksiyonun her yerde sıfır olması değildir; pozitif ve negatif katkıların eşitliğini de temsil edebilir.",
        ],
      },
      {
        title: "Değişken değiştirirken sınırları da dönüştür",
        paragraphs: [
          "u=g(x) ve du=g′(x)dx dönüşümünde x=a sınırı u=g(a), x=b sınırı u=g(b) olur. Örneğin ∫₀¹2x(x²+1)²dx ifadesi ∫₁²u²du biçimine gelir. Yeni integral tamamen u cinsindedir; eski x sınırlarını onun üzerine taşımak değişkenleri karıştırır.",
          "Alternatif olarak belirsiz integral x cinsinden tamamlanıp ilk x sınırları en sonda kullanılabilir. İki yöntem tutarlıdır, fakat aynı satırda u’lu ifade ile x’e ait sınırlar karıştırılmaz. İç fonksiyonun türevi negatif olduğunda yeni sınırların yönü kendiliğinden ters dönebilir; işareti ayrıca gözden geçir.",
        ],
      },
      {
        title: "Biriken miktarın eğimi integranddır",
        paragraphs: [
          "A(x)=∫ₐˣf(t)dt ve f sürekli olsun. O zaman A′(x)=f(x) olur. Üst sınırın küçük bir artışında biriken yeni ince şeridin yüksekliği f(x)’e yaklaşır. Buradaki t integralin içindeki geçici değişkendir; x ise sonucu değiştiren üst sınırdır.",
          "Üst sınır g(x) ise zincir kuralıyla d/dx ∫ₐᵍ⁽ˣ⁾f(t)dt=f(g(x))g′(x) elde edilir. İki sınır da değişiyorsa üst katkıdan alt katkı çıkarılır. Bu türev hesabı için kullanılan noktalarda f’nin sürekliliği ve sınır fonksiyonlarının türevlenebilirliği açık tutulur.",
        ],
      },
      {
        title: "Ortalama değer toplamı aralık genişliğine böler",
        paragraphs: [
          "a<b ve f integrallenebilir ise ortalama değer [∫ₐᵇf(x)dx]/(b−a) olarak hesaplanır. Bu, grafiği aynı net integrale sahip sabit bir yükseklikle değiştirmektir. Yalnız f(a) ve f(b)’nin aritmetik ortalaması genel bir fonksiyon için aynı sonucu vermez.",
          "Doğrusal fonksiyonda uç ortalaması trapez hesabıyla uyuşur; karesel eğride genellikle uyuşmaz. f sürekliyse ortalama değer en küçük ve en büyük fonksiyon değerlerinin arasındadır. Sıfır genişlikli aralıkta bu bölüm 0/0 olacağından ortalama değer formülüyle sayı üretilmez.",
        ],
      },
      {
        title: "Hızdan yer değiştirme ile yolu ayır",
        paragraphs: [
          "v(t) bir boyutlu hareketin işaretli hızıysa ∫v(t)dt yer değiştirmeyi verir. Toplam alınan yol ∫|v(t)|dt ile bulunur; yön değişiminde hızın kökleriyle parçalama gerekir. Örneğin ileri gidip başlangıca dönmek sıfır yer değiştirme ama pozitif yol üretebilir.",
          "Birikim modeli fizik dışında da kullanılabilir: debinin zamana integrali hacim değişimini, marjinal maliyetin miktara integrali maliyet artışını verir. Başlangıçtaki toplam miktar isteniyorsa ayrıca başlangıç değeri eklenir. Yalnız değişim verisinden mutlak başlangıç miktarı uydurulmaz.",
        ],
      },
      {
        title: "Hesabı sınır, birim ve büyüklükle denetle",
        paragraphs: [
          "f, a≤x≤b boyunca m ile M arasında kalıyorsa m(b−a)≤∫ₐᵇf≤M(b−a) olur. Bulunan integral bu aralığın dışında kalırsa işaret, sınır veya aritmetik hatası aranır. Sıfırdan küçük integrandın pozitif yönde integralinin pozitif çıkması da bir uyarıdır.",
          "Laboratuvarda ara üst sınır seçildiğinde alt sınırdan o noktaya birikim ile kalan integralin toplamı asıl integrale eşit olmalıdır. Bu toplama kontrolü, tek bir sonuç etiketinden daha fazla bilgi verir. Görülen sayılar yaklaşık gösterilebilir; matematiksel eşitliklerin koşulları korunur.",
        ],
      },
    ],
    examples: [
      {
        title: "Üst uç eksi alt uç",
        prompt: "∫₁³(3x²−2)dx değerini bul.",
        strategy: "F=x³−2x ters türevini sınırlarla kullan.",
        steps: [
          {
            label: "Üst uç",
            explanation: "F(3)=27−6=21.",
          },
          {
            label: "Alt uç",
            explanation: "F(1)=1−2=−1.",
          },
          {
            label: "Fark",
            explanation: "21−(−1)=22.",
          },
        ],
        answer: "22.",
        check:
          "Integrand [1,3] boyunca pozitif; sonuç da pozitif. +C uç farkında iptal olur.",
        pitfall: "Alt uç negatifken çıkarma parantezini kaybetme.",
      },
      {
        title: "Ters sınır yönü değiştirir",
        prompt: "∫₃¹(2x+1)dx kaçtır?",
        strategy: "Pozitif yönü hesapla veya uç farkını doğrudan kur.",
        steps: [
          {
            label: "Ters türev",
            explanation: "F=x²+x.",
          },
          {
            label: "Uçlar",
            explanation: "F(1)=2, F(3)=12.",
          },
          {
            label: "Yön",
            explanation: "2−12=−10; aynı integrandın 1’den 3’e integrali +10.",
          },
        ],
        answer: "−10.",
        check:
          "Pozitif integrand ters yönde toplandığı için eksi sonuç beklenir.",
        pitfall: "Sınırları değiştirip eksi işaretini eklemeyi unutma.",
      },
      {
        title: "Parçalı kuralları kendi aralığında işle",
        prompt: "f(x)=2x, x<2; f(x)=5, x≥2. ∫₀⁴f(x)dx kaçtır?",
        strategy: "Kuralın değiştiği 2 noktasında aralığı böl.",
        steps: [
          {
            label: "Sol parça",
            explanation: "∫₀²2x dx=[x²]₀²=4.",
          },
          {
            label: "Sağ parça",
            explanation: "∫₂⁴5 dx=5·2=10.",
          },
          {
            label: "Toplam",
            explanation:
              "4+10=14; f(2)’nin tek noktalık seçimi toplamı değiştirmez.",
          },
        ],
        answer: "14.",
        check:
          "İki parçanın genişlikleri 2 ve 2; kural her parçada ayrı kullanıldı.",
        pitfall: "2x kuralını tüm [0,4] aralığına yayma.",
      },
      {
        title: "Dönüşümde sınırlar da yeni değişkene geçer",
        prompt: "∫₀²2x(x²+2)dx değerini bul.",
        strategy: "u=x²+2 seç ve uç girdilerini u’ya dönüştür.",
        steps: [
          {
            label: "Dönüşüm",
            explanation: "du=2x dx; x=0 için u=2, x=2 için u=6.",
          },
          {
            label: "Yeni integral",
            explanation: "∫₂⁶u du=[u²/2]₂⁶.",
          },
          {
            label: "Sonuç",
            explanation: "18−2=16.",
          },
        ],
        answer: "16.",
        check:
          "x cinsinden ters türev (x²+2)²/2; ilk sınırlar aynı 16 sonucunu verir.",
        pitfall: "u’lu ifadede eski 0 ve 2 sınırlarını tutma.",
      },
      {
        title: "İki hareketli sınır iki katkı verir",
        prompt: "f sürekli. H(x)=∫ₓ²ˣ⁺¹ f(t)dt ise H′(x) nasıl yazılır?",
        strategy: "Üst sınır katkısından alt sınır katkısını çıkar.",
        steps: [
          {
            label: "Üst katkı",
            explanation: "Üst sınır 2x+1 ve türevi 2; katkı 2f(2x+1).",
          },
          {
            label: "Alt katkı",
            explanation: "Alt sınır x ve türevi 1; çıkarılacak katkı f(x).",
          },
          {
            label: "Birleştir",
            explanation: "H′(x)=2f(2x+1)−f(x).",
          },
        ],
        answer: "2f(2x+1)−f(x).",
        check: "f(t)=1 kontrolünde H=x+1 ve H′=1; formül 2−1=1 verir.",
        pitfall:
          "Alt sınır katkısını artı yazma veya zincir katsayısını atlama.",
      },
      {
        title: "Ortalama uç değerlerin ortalaması olmayabilir",
        prompt: "f(x)=x²+2 için [0,3] aralığındaki ortalama değer nedir?",
        strategy: "Önce net toplamı, sonra aralık genişliğine bölümü hesapla.",
        steps: [
          {
            label: "İntegral",
            explanation: "∫₀³(x²+2)dx=[x³/3+2x]₀³=9+6=15.",
          },
          {
            label: "Genişlik",
            explanation: "3−0=3.",
          },
          {
            label: "Ortalama",
            explanation:
              "15/3=5; uç değerler 2 ve 11’in ortalaması 6,5 farklıdır.",
          },
        ],
        answer: "5.",
        check:
          "Sabit 5 yüksekliğinin genişlik 3 ile çarpımı aynı net integral 15’i verir.",
        pitfall:
          "Doğrusal grafiğin uç ortalaması kuralını parabolde kesin kabul etme.",
      },
    ],
    recall: [
      {
        prompt: "Belirli integralde sabit neden kalmaz?",
        answer:
          "Aynı ters türevin iki uç değerindeki C, [F(b)+C]−[F(a)+C] farkında iptal olur.",
      },
      {
        prompt: "Sınırlar yer değiştirince ne olur?",
        answer: "Yönlü integralin işareti değişir; eşit sınırda sonuç 0 olur.",
      },
      {
        prompt: "A(x)=∫ₐˣf(t)dt için A′=f ne zaman kullanılır?",
        answer:
          "İlgili noktalarda f sürekli olduğunda; bileşik üst sınır varsa zincir katsayısı da çarpılır.",
      },
      {
        prompt: "Ortalama değer ile integralin farkı nedir?",
        answer:
          "a<b için ortalama, integralin b−a genişliğine bölümüdür; integral toplam birikimi verir.",
      },
    ],
    source:
      "MEBİ AYT Matematik Konu Özetleri, PDF 91–92 ve 94–100 (basılı 89–90 ve 92–98); Dersler Cepte 12. Sınıf Matematik İntegral, sayfa 10–16; OGM İntegral Video Ders Notu ve 069–070–071–073 öğretim notlarının ilgili tanım, dönüşüm ve alan bölümleri. Tanım aralığı, işaret, bölüntü ve yakınsama koşulları karşılaştırılarak hazırlanmış özgün öğretim. Alıştırmalar özgündür; resmî sınav soruları değildir.",
  },
  {
    id: "ayt-alan-riemann",
    minutes: 105,
    objectives: [
      "Riemann örnek noktası, genişlik, alt-üst toplam ve yakınsama ilişkisini kur.",
      "Eksenle veya iki eğri arasında kalan alanı bütün kesişimlerde parçalayarak bul.",
      "Net integral ile geometrik alanı ve sonlu yaklaşım ile kesin değeri karşılaştır.",
    ],
    sections: [
      {
        title: "Alanı küçük şeritlerin toplamından düşün",
        paragraphs: [
          "a<b ve f(x)≥0 olsun. Dar bir alt aralıkta f yüksekliği çok değişmiyorsa alan yaklaşık genişlik çarpı seçilen yüksekliktir. Bütün aralık böyle şeritlere ayrılıp dikdörtgen alanları toplanır. Bu fikir, düz kenarlı olmayan bir bölgenin alanını sayısal olarak yaklaşmaya açar.",
          "Sonlu sayıda dikdörtgen genellikle eğriyle aynı sınırı çizmez; bir yaklaşım üretir. Tam geometrik alan için uygun inceltme limitine veya belirli integral hesabına geçilir. Bir sonlu toplamın tam çıkması mümkün olsa da bu her örnekte otomatik değildir; seçilen fonksiyon ve yöntemle ayrıca doğrulanır.",
        ],
      },
      {
        title: "Bölüntü genişliklerini ayrı ayrı koru",
        paragraphs: [
          "P={x₀,x₁,…,xₙ}, a=x₀<x₁<…<xₙ=b olsun. i. aralığın genişliği Δxᵢ=xᵢ−xᵢ₋₁ olur. Riemann toplamı Σf(cᵢ)Δxᵢ biçimindedir ve cᵢ kendi alt aralığında seçilir. Eşit olmayan bir bölüntüde bütün genişlikler aynı sayı diye alınamaz.",
          "Yalnız eşit bölüntüde ortak Δx=(b−a)/n yazılır. n, nokta sayısı değil alt aralık sayısıdır; n alt aralığın n+1 bölüntü noktası vardır. Genişliklerin toplamı b−a olmalıdır. Bu basit kontrol eksik dikdörtgeni veya yanlış son sınırı yakalar.",
        ],
      },
      {
        title: "Sol, sağ ve orta örnek farklı seçimlerdir",
        paragraphs: [
          "Eşit bölüntüde sol uç yöntemi her [xᵢ₋₁,xᵢ] aralığında xᵢ₋₁ değerini, sağ uç yöntemi xᵢ değerini kullanır. Orta nokta yöntemi (xᵢ₋₁+xᵢ)/2 seçer. Aynı fonksiyon, sınırlar ve n için bu üç toplam farklı olabilir. Yüksekliklerin yanında genişlik de çarpılır.",
          "Artan bir fonksiyonda sol uç alt, sağ uç üst toplamı verir. Azalan fonksiyonda bu roller tersine döner. Fonksiyon bir alt aralığın içinde dönüyorsa uçlardan biri gerçek minimum veya maksimum olmayabilir. Yöntemin adı tek başına her fonksiyon için alt-üst garantisi vermez.",
        ],
      },
      {
        title: "Alt ve üst toplam gerçek uç değerleri arar",
        paragraphs: [
          "Her alt aralıkta mᵢ minimum, Mᵢ maksimum değer olsun. Alt toplam L=ΣmᵢΔxᵢ, üst toplam U=ΣMᵢΔxᵢ olur. Sürekli fonksiyon için L≤∫f≤U bağıntısı sağlanır. Negatif yükseklikler varsa bunlar işaretli katkılardır; alt toplam sayısal olarak daha küçük olan katkıyı kullanır.",
          "Bir parabolün tepesi alt aralığın içindeyse uç noktalarla birlikte tepe de incelenir. Laboratuvar bu yüzden her dikdörtgen için iki uç ve varsa içteki tepeyi karşılaştırır. Alt toplamı sırf sol uç seçimi diye adlandırmak böyle bir aralıkta yanlış bir güvence verebilir.",
        ],
      },
      {
        title: "İnceltme ve yakınsama aynı koşulu söylemez",
        paragraphs: [
          "Mevcut bölüntüye yeni noktalar eklenerek yapılan inceltmede alt toplam azalamaz, üst toplam artamaz. Bu iki sınır arasındaki açıklık daralabilir. Fakat gelişigüzel yeni örnek noktalarıyla hesaplanan her daha büyük n değeri, bir önceki yaklaşık hatadan mutlaka küçük hata vermez.",
          "Sürekli bir fonksiyonda en büyük alt aralık genişliği sıfıra giderse Riemann toplamları örnek nokta seçiminden bağımsız olarak belirli integrale yaklaşır. Yalnız n’nin büyümesi, bazı geniş aralıklar sabit bırakılıyorsa yeterli değildir. Eşit bölüntüde ise n büyüdükçe ortak genişlik doğrudan küçülür.",
        ],
      },
      {
        title: "İşaretli yükseklik net integral üretir",
        paragraphs: [
          "Riemann toplamında f(cᵢ)<0 ise genişlik pozitifken katkı negatiftir. Böyle toplamın limiti ∫f’dir; geometrik alanı bulmak için |f| yüksekliği gerekir. Grafiğin x ekseninin altına inmesi, dikdörtgenin fiziksel alanının negatif olduğu anlamına gelmez; işaretli toplamda yön kodlanır.",
          "Örneğin y=x grafiğinin [−1,1] integralinde iki yarı birbirini götürür ve sonuç 0 olur. Aynı iki üçgenin geometrik alanları toplanınca 1 çıkar. Laboratuvarda net integral ile toplam geometrik alan ayrı satırlarda gösterilir; birini diğerinin etiketiyle sunmaz.",
        ],
      },
      {
        title: "Eksenle alan hesabında bütün kökleri bul",
        paragraphs: [
          "Geometrik alan A=∫ₐᵇ|f(x)|dx biçimindedir. Önce f(x)=0 denkleminin aralık içindeki bütün gerçek kökleri bulunur; sonra her parçada işaret belirlenir. Pozitif parçada f, negatif parçada −f entegre edilir. Köklerde yükseklik sıfırdır, ek dikdörtgen eklenmez.",
          "Çift katlı kökte fonksiyon eksene değip geri dönebilir; parçalama yapılabilse de işaretin mutlaka değiştiği söylenmez. Aralık sınırındaki kök ise yeni bir iç parça oluşturmaz. Eşit kökleri iki farklı kesişim sanmak sıfır genişlikli veya yapay bir bölge yaratır.",
        ],
      },
      {
        title: "İki eğri arasında yükseklik farkı kullan",
        paragraphs: [
          "f ve g’nin arasındaki düşey uzaklık |f(x)−g(x)| olur. a<b için alan ∫ₐᵇ|f−g|dx ile bulunur. f≥g olduğu bir parçada f−g kullanılır; g≥f olduğu parçada sıra tersine çevrilir. Eğrilerin her ikisinin de x ekseninin altında olması bu üst-alt fark kuralını değiştirmez.",
          "Önce f=g kesişimleri bulunur, ardından aralıklar ayrı incelenir. Grafiğin küçük ölçekli görünümünden hangi eğrinin üstte olduğunu tahmin etmek yerine bir test noktası veya cebirsel işaret tablosu kullanılır. Kesişimler açıkça verilmişse bile ilgili bölgenin sınırları sorudan tekrar okunur.",
        ],
      },
      {
        title: "Mutlak değeri toplamın dışına taşıma",
        paragraphs: [
          "|∫(f−g)|, iki eğrinin sıralaması aralık boyunca değiştiğinde gerçek toplam alandan küçük kalabilir. Alanı korumak için her işaret parçasının büyüklüğü ayrı toplanır. Üstte kalan eğri değiştiğinde tek bir farkı tüm aralıkta aynı sırada entegre etmek iptal üretir.",
          "Örneğin f=x ve g=0, [−2,2] için net fark integrali 0 ama alan 4’tür. Aynı hata daha karmaşık iki polinomda da ortaya çıkar. Sonucun sıfır olması kapalı bölgelerin yokluğu diye yorumlanmaz; f ve g gerçekten aynı fonksiyonsa bütün farkın özdeş sıfır olması ayrıca doğrulanır.",
        ],
      },
      {
        title: "Sınır doğruları ile doğal kesişim sınırını ayır",
        paragraphs: [
          "Bir bölge x=a ve x=b doğrularıyla sınırlandırılmışsa bu sınırlar kullanılır; eğrilerin başka yerde kesişmesi bölgeyi otomatik genişletmez. Yalnız eğrilerin sınırladığı kapalı bölge soruluyorsa uygun kesişimler doğal sınırları belirler. Kök bulmak, hangi bölgenin istendiğini tek başına çözmez.",
          "Birden fazla kapalı bölge varsa hepsinin mi seçilen birinin mi istendiği belirtilmelidir. Bağımsız soru kartlarında gerekli eğriler, sınırlar ve seçilen bölge açıkça verilir. Şekil destekleyicidir; sorunun çözümü önceki sayfanın grafiğine veya keşfin son seçimine bağlı değildir.",
        ],
      },
      {
        title: "Polinom farkı alanın yapısını kolaylaştırır",
        paragraphs: [
          "İki karesel fonksiyon arasındaki fark yine en çok ikinci derecedir. f−g=Ax²+Bx+C yazılıp gerçek kökler, tepe ve işaret doğrudan incelenebilir. İki grafiği ayrı ayrı büyük sayılarla hesaplayıp sonra çıkarmak yerine farkı önce sadeleştirmek hem cebiri hem sayısal kontrolü kolaylaştırır.",
          "Alan hesabında her parçada farkın bir ters türevi kullanılır. Karesel farkın integrali kübik olacağı için kökleri sırayla yerine koymak gerekir. Kesişim sınırları kullanıldığında farkın bu noktalarda sıfır çıkması ayrıca bir doğrulamadır; ters türev değerlerinin sıfır olması beklenmez.",
        ],
      },
      {
        title: "Dikdörtgenin genişliğini ve yüksekliğini birlikte oku",
        paragraphs: [
          "Laboratuvarda her dikdörtgenin yatay aralığı, örnek noktası, yüksekliği ve işaretli katkısı yazılı listede verilir. Dikdörtgen sayısını değiştirmek aralık genişliğini de değiştirir. Yalnız yüksekliklerin toplamını karşılaştırmak, alan veya integral karşılaştırması değildir.",
          "Grafikte eksenlerin sayısal ölçekleri ayrı gösterilir; piksel alanı doğrudan birimkare değildir. Grafikte h=f−g fark eğrisi izlenir; f ve g’nin formülleri yazılı sonuç alanında ayrıca verilir. Renk yanında çizgi deseni ve metin etiketleri kullanılır; eksi katkı yalnız renkten anlaşılmak zorunda kalmaz.",
        ],
      },
      {
        title: "Geometrik bir hesap bağımsız kontrol sağlar",
        paragraphs: [
          "Doğrusal bir grafikte üçgen veya yamuk alanı, integral hesabını denetleyebilir. Örneğin y=2x, [0,3] üzerinde taban 3 ve yükseklik 6 ile alan 9’dur; ∫₀³2x dx de 9 verir. Negatif bir doğruda aynı geometrik büyüklüğün net integrali eksi işaretli olur.",
          "Parabol gibi doğrusal olmayan bir eğride uç yükseklikleriyle yamuk alanı almak genel olarak tam sonuç vermez. Bu artık bir yaklaşım yöntemidir ve hatası ayrıca değerlendirilir. Kontrol yöntemi, hangi şeklin gerçekten üçgen veya yamuk olduğunu varsayımlarıyla söylemelidir.",
        ],
      },
      {
        title: "Alt-üst farkı hesaplanabilir hata sınırıdır",
        paragraphs: [
          "Gerçek integral I için L≤I≤U biliniyorsa aradaki bir S toplamının uzaklığı uygun bir sınırla denetlenebilir. Özellikle S de [L,U] içindeyse |S−I|≤U−L olur. Bu kaba ama güvenilir bir sınırdır; yalnız grafik yakın görünüyor diye hata sıfır sayılmaz.",
          "Laboratuvar seçilen toplam S, tam polinom integrali I ve S−I hatasını ayrı verir. Orta noktanın bazı doğrusal örneklerde tam olması, bütün parabol örneklerinde tam olduğu anlamına gelmez. İki n değeri arasında görülen iyileşme gözlemdir; koşulsuz her adımda azalan hata teoremi olarak sunulmaz.",
        ],
      },
      {
        title: "Alan sonucunun birimini ve işaretini koru",
        paragraphs: [
          "Geometrik alan her zaman sıfır veya pozitiftir ve yatay-düşey birimlerin çarpımıyla ölçülür. Grafikte iki eksen de uzunluksa sonuç birimkaredir; hız-zaman grafiğinde ise geometrik büyüklük yol birimindedir. Birimsiz bir çizimde yalnız sayısal alan birimi söylenir.",
          "Sonuç negatif çıktıysa toplamın işaretli integral mi yoksa alan mı olduğunu yeniden kontrol et. Çok küçük yuvarlama farklarıyla sıfır çevresinde gezinmek de modelin gösterim sınırıdır. Matematiksel işaret ve aralık koşulları, yuvarlanmış etiketten önce gelir; keşif tamamlandı diye öğrenme kaydı verilmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Sol ve sağ toplamı genişlikle tamamla",
        prompt:
          "f(x)=x², [0,2] aralığı 4 eşit parçaya bölünüyor. Sol ve sağ uç toplamları nedir?",
        strategy: "Genişlik 1/2; iki uç örnek listesini ayrı yaz.",
        steps: [
          {
            label: "Sol uçlar",
            explanation: "0, 1/2, 1, 3/2; kareler toplamı 0+1/4+1+9/4=7/2.",
          },
          {
            label: "Sağ uçlar",
            explanation: "1/2, 1, 3/2, 2; kareler toplamı 1/4+1+9/4+4=15/2.",
          },
          {
            label: "Alan katkıları",
            explanation:
              "L=(1/2)(7/2)=7/4; R=(1/2)(15/2)=15/4. Tam integral 8/3 aradadır.",
          },
        ],
        answer: "Sol 7/4, sağ 15/4.",
        check: "x² bu aralıkta artandır; sol alt, sağ üst sınır verir.",
        pitfall: "Karelerin toplamını ortak genişlikle çarpmayı atlama.",
      },
      {
        title: "Sol uç her zaman alt toplam değildir",
        prompt:
          "f(x)=(x−1)², [0,2] tek alt aralık olarak alınsın. Alt ve üst toplam nedir?",
        strategy: "Uçlarla birlikte içteki tepeyi incele.",
        steps: [
          {
            label: "Uçlar",
            explanation: "f(0)=f(2)=1.",
          },
          {
            label: "İç uç değer",
            explanation: "Tepe x=1’de minimum 0; maksimum 1 uçlarda.",
          },
          {
            label: "Toplamlar",
            explanation:
              "Genişlik 2: alt 0·2=0, üst 1·2=2. Sol uç toplamı 2’dir ve üst toplamla aynıdır.",
          },
        ],
        answer: "Alt 0, üst 2.",
        check: "Kesin integral 2/3, 0 ile 2 arasında kalır.",
        pitfall: "İçteki minimumu görmeden yalnız uçlara bakma.",
      },
      {
        title: "İşaretli integral ile alanı ayır",
        prompt:
          "y=x−2 grafiği, x=0 ve x=5 doğruları ile x ekseni arasında kalan toplam alan nedir?",
        strategy: "Kök 2’de iki bölgenin alanını ayrı topla.",
        steps: [
          {
            label: "Sol bölge",
            explanation: "[0,2] altında üçgen: taban 2, yükseklik 2, alan 2.",
          },
          {
            label: "Sağ bölge",
            explanation:
              "[2,5] üzerinde üçgen: taban 3, yükseklik 3, alan 9/2.",
          },
          {
            label: "Toplam ve net",
            explanation: "Alan 2+9/2=13/2. Net integral −2+9/2=5/2 farklıdır.",
          },
        ],
        answer: "13/2.",
        check: "∫₀⁵|x−2|dx aynı iki pozitif katkıyı üretir.",
        pitfall: "Net integralin mutlak değerini toplam alan yerine yazma.",
      },
      {
        title: "İki eğri doğal kesişimlerde kapanır",
        prompt:
          "y=3x ve y=x² eğrilerinin sınırladığı kapalı bölgenin alanı nedir?",
        strategy: "Önce kesişimleri, sonra üst-alt farkını belirle.",
        steps: [
          {
            label: "Kesişim",
            explanation: "x²=3x ⇒ x=0 veya x=3.",
          },
          {
            label: "Sıralama",
            explanation: "0<x<3 için 3x>x²; yükseklik 3x−x².",
          },
          {
            label: "İntegral",
            explanation: "∫₀³(3x−x²)dx=[3x²/2−x³/3]₀³=27/2−9=9/2.",
          },
        ],
        answer: "9/2.",
        check: "Fark iki uçta sıfır ve içte pozitif; alan pozitif olmalıdır.",
        pitfall:
          "Üstteki doğruyu alttaki parabolden çıkarmak yerine sırayı ters kurma.",
      },
      {
        title: "Eşit olmayan bölüntüde üç ayrı genişlik",
        prompt: "f(x)=x, P={0,1,3,4}. Sağ uç Riemann toplamı nedir?",
        strategy: "Her aralığın kendi genişliğiyle sağ uç yüksekliğini çarp.",
        steps: [
          {
            label: "İlk aralık",
            explanation: "[0,1]: genişlik 1, yükseklik 1, katkı 1.",
          },
          {
            label: "Sonraki aralıklar",
            explanation: "[1,3]: 2·3=6; [3,4]: 1·4=4.",
          },
          {
            label: "Toplam",
            explanation: "1+6+4=11; genişlik toplamı 1+2+1=4.",
          },
        ],
        answer: "11.",
        check:
          "Artan fonksiyon için bu sağ uç toplamı tam integral 8’den büyüktür.",
        pitfall: "Eşit olmayan bölüntüde bütün genişliklere 4/3 deme.",
      },
      {
        title: "Kesişimden sonra üst eğri değişir",
        prompt:
          "f(x)=x² ve g(x)=1, −2≤x≤2. İki eğri arasındaki toplam alan nedir?",
        strategy: "Kesişimler −1 ve 1; simetriyle iki tür parçayı hesapla.",
        steps: [
          {
            label: "Orta parça",
            explanation: "∫₋₁¹(1−x²)dx=4/3.",
          },
          {
            label: "Dış parçalar",
            explanation: "İki eşit dış parça: 2∫₁²(x²−1)dx=2·4/3=8/3.",
          },
          {
            label: "Toplam",
            explanation:
              "4/3+8/3=4. Net ∫₋₂²(x²−1)dx=4/3 olup toplam alan değildir.",
          },
        ],
        answer: "4.",
        check:
          "Her parçada yükseklik negatif olmayan üst-alt farkıdır; simetri yalnız eşit dış parçaları ikiyle çarpar.",
        pitfall:
          "Bir farkı tüm aralıkta aynı sırayla entegre edip bölgeleri iptal etme.",
      },
    ],
    recall: [
      {
        prompt: "Sol uç toplamı her zaman alt toplam mıdır?",
        answer:
          "Hayır; bu artan fonksiyonda geçerlidir. Azalan fonksiyonda üst olabilir; içte dönen fonksiyonda gerçek uç değerler ayrıca aranır.",
      },
      {
        prompt: "Riemann toplamında eşit olmayan genişlikler nasıl kullanılır?",
        answer:
          "Her f(cᵢ) kendi Δxᵢ genişliğiyle çarpılır. Ortak (b−a)/n yalnız eşit bölüntüde yazılır.",
      },
      {
        prompt: "İki eğri alanında hangi fark kullanılır?",
        answer:
          "Her işaret parçasında üstteki eksi alttaki; eşdeğeri ∫|f−g|, a<b koşuluyla geometrik alan verir.",
      },
      {
        prompt: "Daha çok dikdörtgen her adımda daha küçük hata mı verir?",
        answer:
          "Gelişigüzel toplamlar için zorunlu değil. Sürekli fonksiyonda en büyük genişlik sıfıra gidince yakınsama olur; gerçek inceltmede alt-üst sınırlar sıkışır.",
      },
    ],
    source:
      "MEBİ AYT Matematik Konu Özetleri, PDF 91–92 ve 94–100 (basılı 89–90 ve 92–98); Dersler Cepte 12. Sınıf Matematik İntegral, sayfa 10–16; OGM İntegral Video Ders Notu ve 069–070–071–073 öğretim notlarının ilgili tanım, dönüşüm ve alan bölümleri. Tanım aralığı, işaret, bölüntü ve yakınsama koşulları karşılaştırılarak hazırlanmış özgün öğretim. Alıştırmalar özgündür; resmî sınav soruları değildir.",
  },
];
const titles025 = [
  "Belirsiz integral: değişimden fonksiyon ailesine",
  "Belirli integral: yönlü birikim ve uç farkı",
  "Alan ve Riemann: şerit, sınır ve geometrik büyüklük",
];
const banks025: Item025[][] = [
  [
    {
      prompt: "∫(6x²−4x+3)dx ailesi hangisidir?",
      options: [
        "6x³−4x²+3x+C",
        "12x−4+C",
        "2x³−2x²+C",
        "2x³−2x²+3x+C",
        "2x³+2x²+3x+C",
      ],
      answer: 3,
      hint: "Her terimde yeni üsse böl, işaretleri koru.",
      explanation:
        "6x² terimi 2x³, −4x terimi −2x² üretir. 3 sabitinin integrali 3x; aile 2x³−2x²+3x+C olur.",
      guidance: {
        knowledge: [
          "Kuvvet integrali xⁿ⁺¹/(n+1); sabitin integrali sabit çarpı x olur.",
        ],
        strategy: "Her terimde yeni üsse böl, işaretleri koru.",
        steps: [
          "6x² terimi 2x³, −4x terimi −2x² üretir.",
          "3 sabitinin integrali 3x; aile 2x³−2x²+3x+C olur.",
        ],
        optionReasons: [
          "Üsler artırılmış fakat 3 ve 2 yeni üslerine bölme yapılmamıştır.",
          "Bu ifade integrandın türevidir; integral yönünde işlem yapılmamıştır.",
          "Sabit 3’ün integrali 3x katkısı atlanmıştır.",
          "Doğru: Türev alınca 6x²−4x+3 aynen geri gelir.",
          "−4x teriminin integralindeki eksi işareti yanlış çevrilmiştir.",
        ],
        commonError: "Sabit terimi integralde yok etme.",
        check: "Türev alınca 6x²−4x+3 aynen geri gelir.",
      },
    },
    {
      prompt: "x>0 için ∫(3√x−4/x³)dx hangisidir?",
      options: [
        "2x^(3/2)+2/x²+C",
        "(3/2)/√x+12/x⁴+C",
        "3x^(3/2)+4/x²+C",
        "2x^(3/2)+2/x+C",
        "2x^(3/2)−2/x²+C",
      ],
      answer: 0,
      hint: "3x^(1/2)−4x⁻³ biçiminde oku.",
      explanation:
        "İlk terim 3x^(3/2)/(3/2)=2x^(3/2). İkinci terim −4x⁻²/(−2)=2/x²; iki aile tek C ile birleşir.",
      guidance: {
        knowledge: [
          "Kök ve paydalı terimler uygun gerçek alanda rasyonel kuvvet olarak yazılır.",
        ],
        strategy: "3x^(1/2)−4x⁻³ biçiminde oku.",
        steps: [
          "İlk terim 3x^(3/2)/(3/2)=2x^(3/2).",
          "İkinci terim −4x⁻²/(−2)=2/x²; iki aile tek C ile birleşir.",
        ],
        optionReasons: [
          "Doğru: 2x^(3/2) türevi 3√x, 2/x² türevi −4/x³.",
          "Ters türev yerine integrand türevlenmiştir.",
          "Her iki terimde yeni üsse bölme katsayıları doğru uygulanmamıştır.",
          "−3 üssü bir artınca −2 olur; −1 değil.",
          "x⁻³ teriminde yeni üs −2’ye bölünürken ikinci eksi kaybedilmiştir.",
        ],
        commonError: "Negatif yeni üssün bölme işaretini koru.",
        check: "2x^(3/2) türevi 3√x, 2/x² türevi −4/x³.",
      },
    },
    {
      prompt: "F′(x)=8x−3 ve F(1)=6. F(2) kaçtır?",
      options: ["13", "21", "10", "5", "15"],
      answer: 4,
      hint: "Önce aileyi ve C’yi bul, sonra 2’de hesapla.",
      explanation: "F(x)=4x²−3x+C. F(1)=1+C=6 olduğundan C=5. F(2)=16−6+5=15.",
      guidance: {
        knowledge: ["Başlangıç koşulu ters türev ailesinin sabitini belirler."],
        strategy: "Önce aileyi ve C’yi bul, sonra 2’de hesapla.",
        steps: ["F(x)=4x²−3x+C. F(1)=1+C=6 olduğundan C=5.", "F(2)=16−6+5=15."],
        optionReasons: [
          "13, F′(2)=16−3 sayısıdır; F(2) ile türev karıştırılmıştır.",
          "21 için C=11 gerekir; bu C, F(1)=6 yerine 12 verir.",
          "Bu değer C=0 seçildiğinde çıkar; F(1)=6 koşulu sağlanmaz.",
          "5 yalnız integral sabitidir; F(2) değeri değildir.",
          "Doğru: F(1)=4−3+5=6 ve F′=8x−3 birlikte korunur.",
        ],
        commonError: "Verilen fonksiyon değerini türev değeri sanma.",
        check: "F(1)=4−3+5=6 ve F′=8x−3 birlikte korunur.",
      },
    },
    {
      prompt: "∫(5x−2)²dx ifadesi hangisidir?",
      options: [
        "(5x−2)³/30+C",
        "(5x−2)³/3+C",
        "(5x−2)³/15+C",
        "(5x−2)³/5+C",
        "10(5x−2)+C",
      ],
      answer: 2,
      hint: "İç katsayı 5 ile yeni üs 3’ü birlikte dengele.",
      explanation:
        "u=5x−2, du=5dx; integral (1/5)∫u²du olur. Sonuç u³/15+C=(5x−2)³/15+C.",
      guidance: {
        knowledge: ["Doğrusal içte ∫(ax+b)ⁿdx=(ax+b)ⁿ⁺¹/[a(n+1)]+C."],
        strategy: "İç katsayı 5 ile yeni üs 3’ü birlikte dengele.",
        steps: [
          "u=5x−2, du=5dx; integral (1/5)∫u²du olur.",
          "Sonuç u³/15+C=(5x−2)³/15+C.",
        ],
        optionReasons: [
          "Paydada fazladan 2 vardır; türev integrandın yarısı olur.",
          "İç doğrusal katsayı 5’e bölme atlandığı için türev integrandın 5 katı olur.",
          "Doğru: Türev (1/15)·3·5(5x−2)²=(5x−2)².",
          "Dış yeni üs 3’e bölme atlandığı için türev integrandın 3 katı olur.",
          "Bu integrandın türevidir; ters türev değildir.",
        ],
        commonError: "Yalnız yeni üsse bölüp iç türevi unutma.",
        check: "Türev (1/15)·3·5(5x−2)²=(5x−2)².",
      },
    },
    {
      prompt: "∫3x²(x³+4)²dx hangisidir?",
      options: [
        "(x³+4)³+C",
        "(x³+4)²/2+C",
        "(x³+4)³/3+C",
        "x³(x³+4)³/3+C",
        "(x³+4)³/9+C",
      ],
      answer: 2,
      hint: "u=x³+4 seçip 3x²dx grubunu tek du olarak değiştir.",
      explanation:
        "du=3x²dx; verilen integral ∫u²du olur. ∫u²du=u³/3+C; x’e dönüş (x³+4)³/3+C.",
      guidance: {
        knowledge: [
          "İç fonksiyonun tam diferansiyeli eşleşince integral yeni değişkende kuvvet integralidir.",
        ],
        strategy: "u=x³+4 seçip 3x²dx grubunu tek du olarak değiştir.",
        steps: [
          "du=3x²dx; verilen integral ∫u²du olur.",
          "∫u²du=u³/3+C; x’e dönüş (x³+4)³/3+C.",
        ],
        optionReasons: [
          "Yeni üs 3’e bölme eksiktir; türev üç kat büyük olur.",
          "Dış kuvvet bir artırılmamıştır; türevde x³+4’ün birinci kuvveti kalır.",
          "Doğru: Adayın türevinde 1/3, dış 3 ve iç 3x² doğru dengelenir.",
          "Ayrı integral çarpımı kurulmuştur; ekstra x³ değişken çarpanı yeni terimler üretir.",
          "3x² zaten iç türevin tamamıdır; fazladan 3’e bölünmüştür.",
        ],
        commonError: "İç türevin katsayısını iki kez dengeleme.",
        check: "Adayın türevinde 1/3, dış 3 ve iç 3x² doğru dengelenir.",
      },
    },
    {
      prompt: "∫(x+1)(x²+2x+5)²dx hangisidir?",
      options: [
        "(x²+2x+5)³/12+C",
        "(x²+2x+5)³/6+C",
        "(x²+2x+5)²/4+C",
        "(x+1)²(x²+2x+5)³/6+C",
        "(x²+2x+5)³/3+C",
      ],
      answer: 1,
      hint: "u=x²+2x+5 seç; du=2(x+1)dx yaz.",
      explanation:
        "(x+1)dx=du/2 olduğundan integral (1/2)∫u²du. Sonuç u³/6+C; tekrar x cinsinden yazılır.",
      guidance: {
        knowledge: ["Diferansiyelin sabit katı uygun katsayıyla tamamlanır."],
        strategy: "u=x²+2x+5 seç; du=2(x+1)dx yaz.",
        steps: [
          "(x+1)dx=du/2 olduğundan integral (1/2)∫u²du.",
          "Sonuç u³/6+C; tekrar x cinsinden yazılır.",
        ],
        optionReasons: [
          "İç katsayı için iki kez 2’ye bölünmüş; türev integrandın yarısıdır.",
          "Doğru: Türev (1/6)·3u²·2(x+1)=(x+1)u².",
          "Dış kuvvet 2’den 3’e yükseltilmediği için eşleşen integrand gelmez.",
          "İki ayrı integral çarpılmış; ekstra çarpan türevde ek terimler üretir.",
          "İç türev 2(x+1) olduğu halde eksik 2 dengelenmemiştir.",
        ],
        commonError: "Diferansiyel tamamlanınca dengeleyici yarımı unutma.",
        check: "Türev (1/6)·3u²·2(x+1)=(x+1)u².",
      },
    },
    {
      prompt: "G(x)=(x−3)⁵/5 için G′(x) hangisidir?",
      options: ["(x−3)⁶/30", "x⁴−3", "5(x−3)⁴", "(x−3)⁴", "(x−3)⁵"],
      answer: 3,
      hint: "Dış kuvvetin türevini alıp iç türev 1 ile çarp.",
      explanation:
        "G′=(1/5)·5(x−3)⁴·1. Sabit katsayılar sadeleşir ve (x−3)⁴ kalır.",
      guidance: {
        knowledge: ["Ters türev adayı, türev alınarak kontrol edilir."],
        strategy: "Dış kuvvetin türevini alıp iç türev 1 ile çarp.",
        steps: [
          "G′=(1/5)·5(x−3)⁴·1.",
          "Sabit katsayılar sadeleşir ve (x−3)⁴ kalır.",
        ],
        optionReasons: [
          "Bu bir integral adımıdır; soruda G’nin türevi isteniyor.",
          "Kuvvetin içindeki toplam, kuvvetlere bu şekilde dağıtılamaz.",
          "Dış 5, paydadaki 5 ile sadeleşmemiştir.",
          "Doğru: Bu G, (x−3)⁴ integrandının bir ters türevidir.",
          "Türevde üs 5’ten 4’e azaltılmamış; yalnız başlangıçtaki kuvvet aynen bırakılmıştır.",
        ],
        commonError: "İç ifadeyi türev alırken keyfî açma.",
        check: "Bu G, (x−3)⁴ integrandının bir ters türevidir.",
      },
    },
    {
      prompt: "Bir aralıkta ∫0 dx hangi aileyi verir?",
      options: [
        "İntegral yoktur.",
        "Yalnız 0 fonksiyonu",
        "x+C",
        "0x² dışında hiçbir ifade olamaz.",
        "Bütün sabit fonksiyonlar: C",
      ],
      answer: 4,
      hint: "Türevi 0 olan fonksiyonları düşün.",
      explanation:
        "F′=0 koşulunu her F(x)=C sabit fonksiyonu sağlar. Dolayısıyla ∫0dx=C; yalnız tek bir sabit seçilmez.",
      guidance: {
        knowledge: [
          "Belirsiz integral bir ters türev ailesidir; sabit türevde görünmez.",
        ],
        strategy: "Türevi 0 olan fonksiyonları düşün.",
        steps: [
          "F′=0 koşulunu her F(x)=C sabit fonksiyonu sağlar.",
          "Dolayısıyla ∫0dx=C; yalnız tek bir sabit seçilmez.",
        ],
        optionReasons: [
          "Her sabit fonksiyonun türevi 0 olduğu için ters türev vardır.",
          "0 uygundur ama türevi 0 olan 5 veya −2 gibi diğer sabitleri dışlar.",
          "Bu ailenin türevi 1’dir; integrand 0 değildir.",
          "0x² yine 0’dır; serbest sabitlerin tamamını kapsamaz.",
          "Doğru: Örneğin C=0 ve C=7 aynı integrandı üretir.",
        ],
        commonError: "Çarpanı 0 görünce serbest sabiti de silme.",
        check: "Örneğin C=0 ve C=7 aynı integrandı üretir.",
      },
    },
    {
      prompt:
        "∫xⁿdx=xⁿ⁺¹/(n+1)+C kuvvet formülünde n=−1 için hangi değerlendirme doğrudur?",
      options: [
        "Bu formül uygulanamaz; payda 0 olur.",
        "Sonuç 0+C’dir.",
        "Sonuç 1/0+C gerçek bir fonksiyondur.",
        "Hiçbir aralıkta hiçbir ters türev bulunamaz.",
        "Sonuç x⁻²/(−2)+C olur.",
      ],
      answer: 0,
      hint: "Yeni üs ve paydanın değerini doğrudan kontrol et.",
      explanation:
        "n+1=0 olduğu için kuvvet formülünün paydası sıfırlanır. Bu formülle sonuç üretilemez; bundan bütün ters türevlerin yokluğu çıkarılamaz.",
      guidance: {
        knowledge: ["Kuvvet formülünün açık istisnası n=−1’dir."],
        strategy: "Yeni üs ve paydanın değerini doğrudan kontrol et.",
        steps: [
          "n+1=0 olduğu için kuvvet formülünün paydası sıfırlanır.",
          "Bu formülle sonuç üretilemez; bundan bütün ters türevlerin yokluğu çıkarılamaz.",
        ],
        optionReasons: [
          "Doğru: İstisna, kullanılan formülün koşuludur; sıfıra bölme işlemi yapılmaz.",
          "Payda 0 iken bölüm 0 diye atanamaz; türevi de 1/x’i vermez.",
          "1/0 gerçek sayı olmadığından geçerli ters türev adayı değildir.",
          "Bir kuralın uygulanamaması genel yokluk kanıtı değildir.",
          "Üs artırılacağına azaltılmıştır; bu ifade farklı integrandın ters türevidir.",
        ],
        commonError:
          "Kuralın sınırını fonksiyonun bütün özellikleriyle karıştırma.",
        check:
          "İstisna, kullanılan formülün koşuludur; sıfıra bölme işlemi yapılmaz.",
      },
    },
    {
      prompt:
        "F′=G′ aynı açık aralıkta ve 0 bu aralıkta olsun. F(0)=7, G(0)=−2 ise bu aralıkta F(x)−G(x) nedir?",
      options: ["−9", "9", "0", "x’e göre değişir.", "5"],
      answer: 1,
      hint: "Farkın türevini ve 0’daki değerini kullan.",
      explanation:
        "(F−G)′=0; F−G aralıkta sabittir. Sabit F(0)−G(0)=7−(−2)=9 olur.",
      guidance: {
        knowledge: [
          "Aynı aralıkta eşit türevli iki fonksiyon sabit farkla ayrılır.",
        ],
        strategy: "Farkın türevini ve 0’daki değerini kullan.",
        steps: [
          "(F−G)′=0; F−G aralıkta sabittir.",
          "Sabit F(0)−G(0)=7−(−2)=9 olur.",
        ],
        optionReasons: [
          "G−F farkı hesaplanmıştır; sıra ters çevrilmiştir.",
          "Doğru: Her x için F=G+9 aynı türevleri ve verilen başlangıçları sağlar.",
          "Türevlerin eşitliği fonksiyonların aynı yükseklikte olmasını zorunlu kılmaz.",
          "F−G türevi 0’dır; bağlantılı aralıkta fark sabittir.",
          "7+(−2)=5 toplamıdır; sorulan fark F−G’dir.",
        ],
        commonError: "Sabit farkı sıfır olmak zorunda sanma.",
        check:
          "Her x için F=G+9 aynı türevleri ve verilen başlangıçları sağlar.",
      },
    },
    {
      prompt: "x>0 için ∫(x²−4)/x² dx hangisidir?",
      options: ["1−4/x²+C", "x+2/x²+C", "x−4/x+C", "x²/2+4/x+C", "x+4/x+C"],
      answer: 4,
      hint: "Her iki terime kuvvet kuralını uygula.",
      explanation: "(x²−4)/x²=1−4x⁻², x>0. İntegral x+4x⁻¹+C=x+4/x+C.",
      guidance: {
        knowledge: [
          "Önce bölümü 1−4x⁻² biçiminde sadeleştir; başlangıç alanını koru.",
        ],
        strategy: "Her iki terime kuvvet kuralını uygula.",
        steps: ["(x²−4)/x²=1−4x⁻², x>0.", "İntegral x+4x⁻¹+C=x+4/x+C."],
        optionReasons: [
          "Bu integrandın kendisidir; ters türev alınmamıştır.",
          "Negatif kuvvet −2 bir artırılınca −1 olur; yanlış üs kullanılmıştır.",
          "−4x⁻² teriminde yeni üs −1’e bölme işareti yanlış korunmuştur.",
          "1 teriminin integrali x’tir; x²/2’nin türevi x olur.",
          "Doğru: Türev 1−4/x², sadeleştirilmiş integrandın aynısıdır.",
        ],
        commonError: "Sadeleştirmede paydanın sıfır yasağını kaldırma.",
        check: "Türev 1−4/x², sadeleştirilmiş integrandın aynısıdır.",
      },
    },
    {
      prompt: "H′(x)=4x³+2 ve H(0)=−1. H(1) kaçtır?",
      options: ["4", "3", "6", "2", "−1"],
      answer: 3,
      hint: "Aileyi bulup 0 koşulunu uygula.",
      explanation: "H=x⁴+2x+C ve H(0)=C=−1. H(1)=1+2−1=2.",
      guidance: {
        knowledge: ["Başlangıç değeri ters türevdeki serbest sabiti seçer."],
        strategy: "Aileyi bulup 0 koşulunu uygula.",
        steps: ["H=x⁴+2x+C ve H(0)=C=−1.", "H(1)=1+2−1=2."],
        optionReasons: [
          "Başlangıçtaki −1 değeri artı 1 gibi eklenmiştir.",
          "Bu C=0 seçilince çıkar; H(0)=−1 koşulu atlanmıştır.",
          "6, H′(1) değeridir; fonksiyon değeri değildir.",
          "Doğru: Bulunan fonksiyonun türevi 4x³+2, başlangıcı −1.",
          "Bu yalnız başlangıç değeridir; 0’dan 1’e birikim göz ardı edilmiştir.",
        ],
        commonError: "Değişim oranını fonksiyonun kendisiyle karıştırma.",
        check: "Bulunan fonksiyonun türevi 4x³+2, başlangıcı −1.",
      },
    },
    {
      prompt:
        "Bir açık aralıkta ∫f(x)dx=3x⁴−x²+C veriliyor. 2 bu aralıkta ise f(2) kaçtır?",
      options: ["44", "92", "96", "90", "C bilinmeden bulunamaz."],
      answer: 1,
      hint: "Sağ tarafı türevle; en son x=2 koy.",
      explanation: "f(x)=12x³−2x; C’nin türevi 0. f(2)=12·8−4=92.",
      guidance: {
        knowledge: ["Belirsiz integral eşitliğinin türevi integrandı verir."],
        strategy: "Sağ tarafı türevle; en son x=2 koy.",
        steps: ["f(x)=12x³−2x; C’nin türevi 0.", "f(2)=12·8−4=92."],
        optionReasons: [
          "44, 3·2⁴−2² olup ters türev fonksiyonunun C’siz değeridir.",
          "Doğru: Ters türev değeri değil, onun türevinin 2’deki değeri istenmiştir.",
          "12x³ türev katkısı hesaplanmış, −2x katkısı atlanmıştır.",
          "−x² teriminin türevi −2x yerine −3x alınmış olur; kuvvet kuralı bozulur.",
          "f, türev alınarak bulunur; sabit C türevde sıfırlanır.",
        ],
        commonError: "Serbest sabitin türevde kalacağını sanma.",
        check:
          "Ters türev değeri değil, onun türevinin 2’deki değeri istenmiştir.",
      },
    },
    {
      prompt: "y=2x³−5x için diferansiyel dy hangisidir?",
      options: [
        "(6x²−5)dx",
        "(2x³−5x)dx",
        "(x⁴/2−5x²/2)dx",
        "(6x²−5)dy",
        "6x²−5",
      ],
      answer: 0,
      hint: "Önce y′, sonra dx çarpanını yaz.",
      explanation:
        "y′=6x²−5. dy=(6x²−5)dx; du dönüşümlerinde de aynı ilişki kullanılır.",
      guidance: {
        knowledge: ["d(y)=y′dx; türev ile diferansiyel farklı yazımlardır."],
        strategy: "Önce y′, sonra dx çarpanını yaz.",
        steps: [
          "y′=6x²−5.",
          "dy=(6x²−5)dx; du dönüşümlerinde de aynı ilişki kullanılır.",
        ],
        optionReasons: [
          "Doğru: dy/dx=6x²−5 bağıntısını dx ile çarpmak aynı sonucu verir.",
          "Fonksiyon değeri türevlenmeden dx ile çarpılmıştır.",
          "Bu yönde integral alınmıştır; diferansiyel türevle kurulur.",
          "Diferansiyel bağıntısında bağımsız değişken artışı dx olmalıdır.",
          "Bu türev dy/dx’tir; diferansiyel için dx çarpanı eksik.",
        ],
        commonError: "dy ile dy/dx’i aynı nesne gibi yazma.",
        check: "dy/dx=6x²−5 bağıntısını dx ile çarpmak aynı sonucu verir.",
      },
    },
    {
      prompt: "x>0 için ∫(√x+1/√x)dx hangisidir?",
      options: [
        "x^(3/2)+√x+C",
        "(1/2)x^(−1/2)−(1/2)x^(−3/2)+C",
        "(2/3)x^(3/2)+2√x+C",
        "(2/3)x^(3/2)−2√x+C",
        "2√x+(3/2)x^(3/2)+C",
      ],
      answer: 2,
      hint: "İki kuvvette de n+1’e böl.",
      explanation:
        "∫x^(1/2)dx=(2/3)x^(3/2). ∫x^(−1/2)dx=2x^(1/2); tek C ile birleştirilir.",
      guidance: {
        knowledge: ["x^(1/2) ve x^(−1/2) kuvvetlerinin yeni üsleri farklıdır."],
        strategy: "İki kuvvette de n+1’e böl.",
        steps: [
          "∫x^(1/2)dx=(2/3)x^(3/2).",
          "∫x^(−1/2)dx=2x^(1/2); tek C ile birleştirilir.",
        ],
        optionReasons: [
          "Yeni üslere bölme yapılmadığından türev katsayıları 3/2 ve 1/2 olur.",
          "Bu integrandın türevidir; integral değildir.",
          "Doğru: Adayın türevi √x+1/√x olur; x>0 koşulu korunur.",
          "İkinci integrand pozitif x⁻¹/²’dir; yeni üs 1/2 olduğundan katsayı pozitif kalır.",
          "İlk kuvvetin integrali için 2/3 yerine 3/2 yazılmıştır; türevde 9/4 katsayısı oluşur.",
        ],
        commonError: "Üs −1/2 ile istisna üs −1’i karıştırma.",
        check: "Adayın türevi √x+1/√x olur; x>0 koşulu korunur.",
      },
    },
    {
      prompt: "t değişkenine göre ∫2dt hangi aileyi verir?",
      options: ["0+C", "2x+C", "2+C", "t²+C", "2t+C"],
      answer: 4,
      hint: "Sabit 2’nin t’ye göre ters türevini ara.",
      explanation: "d(2t)/dt=2. Dolayısıyla ∫2dt=2t+C; C, t’ye bağlı değildir.",
      guidance: {
        knowledge: [
          "İntegraldeki diferansiyel hangi değişkenin kullanıldığını belirtir.",
        ],
        strategy: "Sabit 2’nin t’ye göre ters türevini ara.",
        steps: [
          "d(2t)/dt=2.",
          "Dolayısıyla ∫2dt=2t+C; C, t’ye bağlı değildir.",
        ],
        optionReasons: [
          "Sabitin türevi alınmıştır; sorulan integral işlemidir.",
          "İşlem t’ye göredir; x’in t’ye bağlı olduğu verilmemiştir.",
          "Sabit fonksiyonun t’ye türevi 0 olur; 2 integrandını vermez.",
          "Bu ailenin t’ye göre türevi 2t’dir; sabit 2 değildir.",
          "Doğru: Değişken adını değiştirerek hesap yapma; verilen dt korunur.",
        ],
        commonError: "Bağımsız değişkeni sonuçta keyfî x yapma.",
        check: "Değişken adını değiştirerek hesap yapma; verilen dt korunur.",
      },
    },
  ],
  [
    {
      prompt: "∫₀²(3x²+1)dx kaçtır?",
      options: ["13", "10", "8", "11", "10+C"],
      answer: 1,
      hint: "F=x³+x fonksiyonunu uçlarda hesapla.",
      explanation: "F(2)=8+2=10, F(0)=0. İntegral F(2)−F(0)=10.",
      guidance: {
        knowledge: [
          "Sürekli integrandda belirli integral ters türevin üst eksi alt farkıdır.",
        ],
        strategy: "F=x³+x fonksiyonunu uçlarda hesapla.",
        steps: ["F(2)=8+2=10, F(0)=0.", "İntegral F(2)−F(0)=10."],
        optionReasons: [
          "13, integrandın x=2 değeridir; integral değildir.",
          "Doğru: 1≤3x²+1≤13 aralığıyla integral 2 ile 26 arasında olmalıdır; 10 uygundur.",
          "Kübik ters türev katkısı alınmış, sabit 1’in x katkısı atlanmıştır.",
          "x³+x ifadesinde üst uca x=2 yerine sabit 3 eklenmiştir.",
          "Belirli integralde aynı C uç farkında iptal olur; serbest sabit kalmaz.",
        ],
        commonError: "Integrand değerini integral sayısı sanma.",
        check:
          "1≤3x²+1≤13 aralığıyla integral 2 ile 26 arasında olmalıdır; 10 uygundur.",
      },
    },
    {
      prompt: "∫₂⁻¹2x dx kaçtır?",
      options: ["5", "−6", "0", "3", "−3"],
      answer: 4,
      hint: "F=x² ters türevini verilen sırayla kullan.",
      explanation: "Üst sınır −1: F(−1)=1; alt sınır 2: F(2)=4. 1−4=−3.",
      guidance: {
        knowledge: [
          "Üst sınır daha küçükse yön korunur; F(b)−F(a) yine geçerlidir.",
        ],
        strategy: "F=x² ters türevini verilen sırayla kullan.",
        steps: ["Üst sınır −1: F(−1)=1; alt sınır 2: F(2)=4.", "1−4=−3."],
        optionReasons: [
          "Üst ve alt ters türev değerleri çıkarılmak yerine toplanmıştır.",
          "İntegrandın uç farkı 2(−1)−2(2) alınmıştır; ters türev kullanılmamıştır.",
          "Sınırlar −1 ve 2 simetrik değildir; tek fonksiyon iptali uygulanamaz.",
          "Bu, sınırların ters sırasındaki integralin değeridir.",
          "Doğru: Pozitif yönde −1’den 2’ye integral +3; ters yön −3.",
        ],
        commonError: "Sınırları sıralarken yön işaretini kaybetme.",
        check: "Pozitif yönde −1’den 2’ye integral +3; ters yön −3.",
      },
    },
    {
      prompt:
        "f, [−2,4] üzerinde integrallenebilir. ∫₋₂⁴f=7 ve ∫₋₂¹f=−3 ise ∫₁⁴f kaçtır?",
      options: ["10", "−4", "7", "4", "−10"],
      answer: 0,
      hint: "7=−3+I eşitliğini kur.",
      explanation: "∫₋₂⁴f=∫₋₂¹f+∫₁⁴f. 7=−3+I ⇒ I=10.",
      guidance: {
        knowledge: ["Aynı fonksiyonun ardışık aralık integralleri toplanır."],
        strategy: "7=−3+I eşitliğini kur.",
        steps: ["∫₋₂⁴f=∫₋₂¹f+∫₁⁴f.", "7=−3+I ⇒ I=10."],
        optionReasons: [
          "Doğru: −3+10=7 ile bütün aralık yeniden kurulur.",
          "Hem toplama/çıkarma hem yön karıştırılmıştır; parçalar −3+(−4)=−7 eder.",
          "Bu bütün aralığın integralidir; −2’den 1’e katkı yok sayılmıştır.",
          "7+(−3)=4 toplamıdır; eksik parça toplamdan bilinen parça çıkarılarak bulunur.",
          "Doğru parça integralinin yönü ters çevrilmiştir.",
        ],
        commonError:
          "İşaretli parça negatifken çıkarmanın artı katkı verdiğini koru.",
        check: "−3+10=7 ile bütün aralık yeniden kurulur.",
      },
    },
    {
      prompt: "Aynı [0,1] aralığında ∫f=4 ve ∫g=−1. ∫₀¹(3f−2g)dx kaçtır?",
      options: ["2", "10", "14", "9", "−24"],
      answer: 2,
      hint: "3∫f−2∫g biçiminde yaz.",
      explanation: "İlk katkı 3·4=12. İkinci katkı −2·(−1)=2; toplam 14.",
      guidance: {
        knowledge: ["İntegral toplam ve sabit katsayıda doğrusaldır."],
        strategy: "3∫f−2∫g biçiminde yaz.",
        steps: ["İlk katkı 3·4=12.", "İkinci katkı −2·(−1)=2; toplam 14."],
        optionReasons: [
          "3f katkısı yanlışlıkla 3 sayı olarak alınmıştır; ∫f=4 ile çarpılmalıdır.",
          "İkinci integrandın negatif integraline rağmen −2·(−1) katkısı eksi alınmıştır.",
          "Doğru: Katsayılarla integral değerleri aynı aralıkta birlikte kullanıldı.",
          "Katsayılar doğru dağıtılmadan 3(4−1) hesaplanmıştır.",
          "İntegrallerin çarpımı kullanılmıştır; doğrusal birleşim isteniyor.",
        ],
        commonError:
          "Eksi katsayı ile negatif integralin çarpımını eksi sanma.",
        check:
          "Katsayılarla integral değerleri aynı aralıkta birlikte kullanıldı.",
      },
    },
    {
      prompt: "f(x)=x+1, x<0; f(x)=2, x≥0. ∫₋₁²f(x)dx kaçtır?",
      options: ["6", "1/2", "7/2", "9/2", "4"],
      answer: 3,
      hint: "0 noktasında iki ayrı integral kur.",
      explanation: "∫₋₁⁰(x+1)dx=[x²/2+x]₋₁⁰=1/2. ∫₀²2dx=4; toplam 1/2+4=9/2.",
      guidance: {
        knowledge: ["Parçalı kural değişim noktasında integral bölünür."],
        strategy: "0 noktasında iki ayrı integral kur.",
        steps: ["∫₋₁⁰(x+1)dx=[x²/2+x]₋₁⁰=1/2.", "∫₀²2dx=4; toplam 1/2+4=9/2."],
        optionReasons: [
          "2 sabit kuralı bütün [−1,2] aralığında kullanılmıştır.",
          "Bu yalnız [−1,0] sol parçasının katkısıdır; [0,2] aralığının 4 katkısı eklenmemiştir.",
          "Sol parçanın pozitif 1/2 katkısı yanlışlıkla negatif alınmıştır.",
          "Doğru: Sol parça negatif x’te olsa da x+1≥0; katkısı pozitiftir.",
          "Yalnız [0,2] parçasının katkısı alınmış; sol parça atlanmıştır.",
        ],
        commonError: "x’in işaretini fonksiyon yüksekliğinin işareti sanma.",
        check: "Sol parça negatif x’te olsa da x+1≥0; katkısı pozitiftir.",
      },
    },
    {
      prompt: "∫₀⁴|x−1|dx kaçtır?",
      options: ["5", "−5", "8", "9/2", "4"],
      answer: 0,
      hint: "x=1’de aralığı böl ve iki pozitif alanı topla.",
      explanation:
        "[0,1] için |x−1|=1−x, integral 1/2. [1,4] için x−1, integral 9/2; toplam 5.",
      guidance: {
        knowledge: [
          "Mutlak değeri açmak için iç ifadenin kökünde işaret incelemesi yapılır.",
        ],
        strategy: "x=1’de aralığı böl ve iki pozitif alanı topla.",
        steps: [
          "[0,1] için |x−1|=1−x, integral 1/2.",
          "[1,4] için x−1, integral 9/2; toplam 5.",
        ],
        optionReasons: [
          "Doğru: |∫(x−1)|=4 farklıdır; burada ∫|x−1|=5.",
          "Mutlak değerli integrand negatif olamaz; pozitif yönlü integral eksi çıkmaz.",
          "Yalnız x’in integrali alınmış, kaydırma ve işaret parçaları atlanmıştır.",
          "Yalnız [1,4] pozitif üçgeni sayılmış; [0,1] katkısı eksiktir.",
          "Net ∫₀⁴(x−1)dx değeri 4’tür; mutlak değerli alan değildir.",
        ],
        commonError: "Mutlak değeri tüm integralin dışına taşıma.",
        check: "|∫(x−1)|=4 farklıdır; burada ∫|x−1|=5.",
      },
    },
    {
      prompt: "∫₋₂²(x³+2x²)dx kaçtır?",
      options: ["32", "32/3", "8", "0", "16/3"],
      answer: 1,
      hint: "x³ ve 2x² terimlerini simetrilerine göre ayır.",
      explanation: "∫₋₂²x³dx=0. ∫₋₂²2x²dx=2∫₀²2x²dx=2·16/3=32/3.",
      guidance: {
        knowledge: [
          "Simetrik sınırda tek terimler iptal olur; çift terimler iki eşit katkı verir.",
        ],
        strategy: "x³ ve 2x² terimlerini simetrilerine göre ayır.",
        steps: ["∫₋₂²x³dx=0.", "∫₋₂²2x²dx=2∫₀²2x²dx=2·16/3=32/3."],
        optionReasons: [
          "Kuvvet integralinde yeni üs 3’e bölme atlanmıştır.",
          "Doğru: x³’ün iptali bütün toplamın tek olduğunu göstermez.",
          "8, yalnız çift terimin x=2’deki 2x² değeridir; aralık integrali değildir.",
          "Kübik tek terim iptal olur ama çift 2x² terimi kalır.",
          "Çift fonksiyonda simetrik iki yarıdan yalnız biri hesaplanmıştır.",
        ],
        commonError: "Karışık toplamı bütünüyle tek fonksiyon sanma.",
        check: "x³’ün iptali bütün toplamın tek olduğunu göstermez.",
      },
    },
    {
      prompt: "f(x)=x² için [1,3] aralığındaki ortalama değer kaçtır?",
      options: ["3", "5", "26/3", "13/3", "4"],
      answer: 3,
      hint: "Önce ∫₁³x²dx, sonra 3−1’e böl.",
      explanation: "İntegral (27−1)/3=26/3. Ortalama (26/3)/2=13/3.",
      guidance: {
        knowledge: ["Ortalama değer integralin aralık genişliğine bölümüdür."],
        strategy: "Önce ∫₁³x²dx, sonra 3−1’e böl.",
        steps: ["İntegral (27−1)/3=26/3.", "Ortalama (26/3)/2=13/3."],
        optionReasons: [
          "Aralık üst sınırı, fonksiyonun ortalama değeriyle aynı nicelik değildir.",
          "Uç değerlerin ortalaması (1+9)/2=5’tir; parabolde genel ortalama değildir.",
          "Bu integralin değeridir; aralık genişliği 2’ye bölünmemiştir.",
          "Doğru: 1 ile 9 arasındadır; sabit 13/3 yüksekliği genişlik 2’de aynı integrali verir.",
          "Orta noktadaki f(2)=4 değeri genel olarak ortalama değere eşit değildir.",
        ],
        commonError:
          "Uç ortalaması ile integral ortalamasını otomatik eşitleme.",
        check:
          "1 ile 9 arasındadır; sabit 13/3 yüksekliği genişlik 2’de aynı integrali verir.",
      },
    },
    {
      prompt: "∫₀¹2x(x²+3)dx kaçtır?",
      options: ["1/2", "7", "7/2", "25/2", "4"],
      answer: 2,
      hint: "u=x²+3 seç; uçlar 3 ve 4 olur.",
      explanation: "du=2x dx ve ∫₀¹2x(x²+3)dx=∫₃⁴u du. [u²/2]₃⁴=(16−9)/2=7/2.",
      guidance: {
        knowledge: [
          "Değişken değiştirmede integral ve sınırlar aynı yeni değişkene çevrilir.",
        ],
        strategy: "u=x²+3 seç; uçlar 3 ve 4 olur.",
        steps: ["du=2x dx ve ∫₀¹2x(x²+3)dx=∫₃⁴u du.", "[u²/2]₃⁴=(16−9)/2=7/2."],
        optionReasons: [
          "u dönüşümünde yeni sınırlar 3 ve 4 yerine eski 0 ve 1 tutulmuştur.",
          "Diferansiyel 2x dx zaten tam du iken fazladan 2 çarpılmıştır.",
          "Doğru: x cinsinden ters türev (x²+3)²/2 aynı sonucu verir.",
          "Üst ve alt u²/2 değerleri çıkarılmak yerine toplanmıştır.",
          "Bu üstteki u değeridir; integralin sonucu değildir.",
        ],
        commonError: "Yeni değişkenli ifadede eski sınırları kullanma.",
        check: "x cinsinden ters türev (x²+3)²/2 aynı sonucu verir.",
      },
    },
    {
      prompt: "f sürekli ve A(x)=∫₂ˣ f(t)dt. A′(3) nedir?",
      options: ["f(3)−f(2)", "∫₂³f(t)dt", "0", "f′(3)", "f(3)"],
      answer: 4,
      hint: "A′(x)=f(x) bağıntısını kullan.",
      explanation:
        "Üst sınır x’in türevi 1; sabit alt sınırdan katkı 0. A′(3)=f(3).",
      guidance: {
        knowledge: [
          "Sürekli integrandda birikim fonksiyonunun türevi üst uçtaki yüksekliğe eşittir.",
        ],
        strategy: "A′(x)=f(x) bağıntısını kullan.",
        steps: [
          "Üst sınır x’in türevi 1; sabit alt sınırdan katkı 0.",
          "A′(3)=f(3).",
        ],
        optionReasons: [
          "Bu integrandın uç farkıdır; integralin üst sınır türevi değildir.",
          "Bu A(3) değeridir; A′(3) değildir.",
          "Alt sınır sabit olsa da üst sınır değişkendir; bütün ifade sabit değildir.",
          "Birikimin birinci türevi f’dir; f’nin türevi için bir kez daha türev gerekirdi.",
          "Doğru: Birikim ile birikimin değişim hızı ayrı niceliklerdir.",
        ],
        commonError: "A(3) ile A′(3)’ü karıştırma.",
        check: "Birikim ile birikimin değişim hızı ayrı niceliklerdir.",
      },
    },
    {
      prompt: "f sürekli ve B(x)=∫₀ˣ² f(t)dt. B′(2) nedir?",
      options: ["4f′(4)", "f(2)", "f(4)", "2f(2)", "4f(4)"],
      answer: 4,
      hint: "Önce B′(x)=f(x²)·2x yaz.",
      explanation: "B′(x)=2x f(x²). x=2 için 2x=4 ve x²=4; sonuç 4f(4).",
      guidance: {
        knowledge: [
          "Değişken üst sınırda temel bağıntı zincir kuralıyla birleşir.",
        ],
        strategy: "Önce B′(x)=f(x²)·2x yaz.",
        steps: ["B′(x)=2x f(x²).", "x=2 için 2x=4 ve x²=4; sonuç 4f(4)."],
        optionReasons: [
          "İntegral türevi f verir; f′ yazılması fazladan türev almaktır.",
          "Hem iç üst sınır hem zincir katsayısı atlanmıştır.",
          "Üst sınır x²’nin türevi 2x çarpanı atlanmıştır.",
          "İç üst sınır 4 yerine yanlış girdi 2 kullanılmış; katsayı da 4 olmalıdır.",
          "Doğru: f(t)=1 kontrolünde B=x², B′(2)=4; formül bunu sağlar.",
        ],
        commonError: "Üst sınırın türevini unutma.",
        check: "f(t)=1 kontrolünde B=x², B′(2)=4; formül bunu sağlar.",
      },
    },
    {
      prompt:
        "v(t)=2t−4 metre/saniye, 0≤t≤3. Bu sürede yer değiştirme kaç metredir?",
      options: ["−4", "−3", "5", "3", "2"],
      answer: 1,
      hint: "∫₀³(2t−4)dt değerini hesapla.",
      explanation: "Ters türev t²−4t. [t²−4t]₀³=9−12=−3 metre.",
      guidance: {
        knowledge: ["İşaretli hızın zamana integrali konum değişimidir."],
        strategy: "∫₀³(2t−4)dt değerini hesapla.",
        steps: ["Ters türev t²−4t.", "[t²−4t]₀³=9−12=−3 metre."],
        optionReasons: [
          "−4 başlangıç hızıdır; süre boyunca birikim değildir.",
          "Doğru: İlk 2 saniye −4 metre, son 1 saniye +1 metre; net −3.",
          "5 toplam alınan yoldur; yer değiştirme zıt yönlü katkıları toplar.",
          "Yer değiştirmenin yön işareti mutlak değer alınarak kaybedilmiştir.",
          "2, son andaki hız v(3)’tür; yer değiştirme değildir.",
        ],
        commonError: "Toplam yolu yönlü yer değiştirmeyle aynı sanma.",
        check: "İlk 2 saniye −4 metre, son 1 saniye +1 metre; net −3.",
      },
    },
    {
      prompt: "İntegrallenebilir f için ∫₅⁵f(x)dx nedir?",
      options: ["f(5)", "5f(5)", "0", "C", "f bilinmeden bulunamaz."],
      answer: 2,
      hint: "Üst eksi alt ters türev değerini düşün.",
      explanation:
        "Alt ve üst sınırlar aynı olduğundan aralık genişliği 5−5=0’dır. Dolayısıyla integral 0; f(5)’in sıfır olduğu söylenmez.",
      guidance: {
        knowledge: ["Sıfır genişlikli aralığın yönlü birikimi 0’dır."],
        strategy: "Üst eksi alt ters türev değerini düşün.",
        steps: [
          "Alt ve üst sınırlar aynı olduğundan aralık genişliği 5−5=0’dır.",
          "Dolayısıyla integral 0; f(5)’in sıfır olduğu söylenmez.",
        ],
        optionReasons: [
          "Nokta yüksekliği genişlik olmadığı için integral alanı üretmez.",
          "Sınır sayısı 5 aralık genişliği değildir; genişlik 5−5=0.",
          "Doğru: Geçilen aralığın genişliği 0’dır; f(5) değerinden bağımsız olarak integral 0 olur.",
          "Belirli integral fonksiyon ailesi vermez; serbest sabit kalmaz.",
          "Eşit sınır özelliği integrandın kuralından bağımsızdır.",
        ],
        commonError: "Sınırdaki fonksiyon değerini integral yerine yazma.",
        check:
          "Geçilen aralığın genişliği 0’dır; f(5) değerinden bağımsız olarak integral 0 olur.",
      },
    },
    {
      prompt:
        "f, [0,2] üzerinde integrallenebilir ve her noktada 2≤f(x)≤5. Bütün böyle f’lerin ∫₀²f(x)dx değerlerini kapsayan en dar zorunlu aralık hangisidir?",
      options: ["[4,10]", "[0,10]", "[−10,−4]", "[4,25]", "[2,5]"],
      answer: 0,
      hint: "Aralık genişliği 2’yi iki yükseklik sınırıyla çarp.",
      explanation:
        "Alt katkı sınırı 2·2=4. Üst katkı sınırı 5·2=10; integral [4,10] içindedir.",
      guidance: {
        knowledge: ["m≤f≤M ve a<b için m(b−a)≤∫f≤M(b−a)."],
        strategy: "Aralık genişliği 2’yi iki yükseklik sınırıyla çarp.",
        steps: [
          "Alt katkı sınırı 2·2=4.",
          "Üst katkı sınırı 5·2=10; integral [4,10] içindedir.",
        ],
        optionReasons: [
          "Doğru: Sabit f=2 ve f=5 uç değerleri gerçekleştirebilir; daha dar ortak aralık yoktur.",
          "Bu daha gevşek kapsama olsa da en dar zorunlu aralık sorulduğunda alt 4 sınırını atlar.",
          "Sınırlar pozitif yönlüdür ve f pozitiftir; eksi aralık yanlıştır.",
          "Üst sınır 5, genişlik 2 ile çarpılmalıdır; karesi alınmaz.",
          "Bunlar yükseklik sınırlarıdır; genişlik 2 ile çarpılmamıştır.",
        ],
        commonError: "Yükseklik aralığı ile toplam birikim aralığını ayır.",
        check:
          "Sabit f=2 ve f=5 uç değerleri gerçekleştirebilir; daha dar ortak aralık yoktur.",
      },
    },
    {
      prompt:
        "f ve g, [0,3] üzerinde yalnız x=1 noktasında farklı, diğer her noktada eşit ve ikisi de sınırlı Riemann integrallenebilir. Hangi sonuç zorunludur?",
      options: [
        "İki integralin farkı f(1)−g(1)’dir.",
        "İki integralden en az biri yoktur.",
        "f(1)=g(1)",
        "∫₀³f=∫₀³g",
        "f ve g’nin her noktada türevleri eşittir.",
      ],
      answer: 3,
      hint: "Farkın yalnız sıfır genişlikli bir noktada kaldığını kullan.",
      explanation:
        "f−g yalnız bir noktada sıfırdan farklıdır; bu farkın integrali 0. Doğrusallıkla ∫f−∫g=0, dolayısıyla integraller eşit.",
      guidance: {
        knowledge: [
          "Sınırlı integrallenebilir fonksiyonlarda tek noktalık değişiklik integral değerini değiştirmez.",
        ],
        strategy:
          "Farkın yalnız sıfır genişlikli bir noktada kaldığını kullan.",
        steps: [
          "f−g yalnız bir noktada sıfırdan farklıdır; bu farkın integrali 0.",
          "Doğrusallıkla ∫f−∫g=0, dolayısıyla integraller eşit.",
        ],
        optionReasons: [
          "Nokta yüksekliği tek başına genişlikli bir katkı oluşturmaz.",
          "Her ikisinin Riemann integrallenebilir olduğu açıkça verilmiştir.",
          "Bu, soruda farklı olduğu belirtilen tek nokta koşuluyla çelişir.",
          "Doğru: Bu integral eşitliği fonksiyonların veya türevlerinin her yerde eşitliğini iddia etmez.",
          "Türevlerin varlığı verilmedi; tek noktalık değişim sürekliliği bile bozabilir.",
        ],
        commonError:
          "Fonksiyon eşitliğiyle integral eşitliğini aynı güçte bilgi sanma.",
        check:
          "Bu integral eşitliği fonksiyonların veya türevlerinin her yerde eşitliğini iddia etmez.",
      },
    },
    {
      prompt:
        "f sürekli, ∫₁⁴f(x)dx=8. Bir ters türev F için F(1)=−3 ise F(4) kaçtır?",
      options: ["−11", "5", "11", "−5", "8"],
      answer: 1,
      hint: "8=F(4)−F(1) eşitliğini kullan.",
      explanation: "8=F(4)−(−3)=F(4)+3. F(4)=5.",
      guidance: {
        knowledge: [
          "Belirli integral ters türevdeki değişimdir; mutlak değer için başlangıç gerekir.",
        ],
        strategy: "8=F(4)−F(1) eşitliğini kullan.",
        steps: ["8=F(4)−(−3)=F(4)+3.", "F(4)=5."],
        optionReasons: [
          "Birikim 8, başlangıca yanlış yönde eklenmiştir.",
          "Doğru: 5−(−3)=8 ile integral yeniden elde edilir.",
          "Alt uç −3, toplam 8’den çıkarılmıştır; F(4)−(−3)=8 doğru kurulmalıdır.",
          "Bulunan doğru uç değerinin işareti ters çevrilmiştir.",
          "Bu F(4)−F(1) farkıdır; alt uç değeri eklenmemiştir.",
        ],
        commonError: "Net değişim ile son toplam değeri ayır.",
        check: "5−(−3)=8 ile integral yeniden elde edilir.",
      },
    },
  ],
  [
    {
      prompt:
        "f(x)=x², [0,1] aralığı iki eşit parçaya ayrılıyor. Sağ uç Riemann toplamı kaçtır?",
      options: ["5/4", "1/8", "5/8", "1/3", "1/2"],
      answer: 2,
      hint: "Genişlik ve iki sağ uç yüksekliğini ayrı yaz.",
      explanation:
        "Δx=1/2; örnekler 1/2 ve 1. Toplam (1/2)[(1/2)²+1²]=(1/2)(5/4)=5/8.",
      guidance: {
        knowledge: [
          "Eşit bölüntüde genişlik (b−a)/n, sağ uç örnekleri alt aralıkların sağ sınırlarıdır.",
        ],
        strategy: "Genişlik ve iki sağ uç yüksekliğini ayrı yaz.",
        steps: [
          "Δx=1/2; örnekler 1/2 ve 1.",
          "Toplam (1/2)[(1/2)²+1²]=(1/2)(5/4)=5/8.",
        ],
        optionReasons: [
          "Sağ uç kareleri 1/4+1 toplanmış, genişlik 1/2 ile çarpılmamıştır.",
          "Bu sol uç toplamıdır; sağ uç örnekleri 1/2 ve 1 olmalıdır.",
          "Doğru: x² artan olduğundan sağ uç toplamı tam 1/3 integralinden büyüktür.",
          "Bu tam integralin değeridir; istenen iki dikdörtgenli sonlu toplamdır.",
          "Bu doğrusal x grafiğinin orta nokta toplamına benzer; x² yükseklikleri doğru kullanılmamıştır.",
        ],
        commonError: "Genişlik çarpanını atlama.",
        check:
          "x² artan olduğundan sağ uç toplamı tam 1/3 integralinden büyüktür.",
      },
    },
    {
      prompt:
        "f(x)=2x+1, [0,2] aralığında iki eşit alt aralık için orta nokta toplamı kaçtır?",
      options: ["6", "8", "3", "5", "4"],
      answer: 0,
      hint: "[0,1] ve [1,2] orta noktalarında yüksekliği hesapla.",
      explanation:
        "Örnekler 1/2 ve 3/2; yükseklikler 2 ve 4. Genişlikler 1; toplam 2+4=6.",
      guidance: {
        knowledge: ["Orta örnek noktası her alt aralığın ortasından seçilir."],
        strategy: "[0,1] ve [1,2] orta noktalarında yüksekliği hesapla.",
        steps: [
          "Örnekler 1/2 ve 3/2; yükseklikler 2 ve 4.",
          "Genişlikler 1; toplam 2+4=6.",
        ],
        optionReasons: [
          "Doğru: Doğrusal fonksiyonda bu orta nokta toplamı tam ∫₀²(2x+1)dx=6 ile eşleşir.",
          "Sağ uç toplamı 3+5=8’dir; orta örnekler kullanılmamıştır.",
          "Bu ortalama yüksekliktir; toplam genişlik 2 ile çarpılmamıştır.",
          "Üst uç yüksekliğidir; dikdörtgen katkıları toplamı değildir.",
          "Sol uç toplamı 1+3=4’tür; orta örnekler kullanılmamıştır.",
        ],
        commonError: "Örnek noktasıyla yüksekliği aynı sayı sanma.",
        check:
          "Doğrusal fonksiyonda bu orta nokta toplamı tam ∫₀²(2x+1)dx=6 ile eşleşir.",
      },
    },
    {
      prompt:
        "f(x)=3−x, [0,2] aralığında iki eşit parça için sol uç toplamı ile gerçek integral arasındaki ilişki nedir?",
      options: [
        "Sol toplam 5, gerçek integral 6; sol toplam daha küçük.",
        "Sol toplam −5, gerçek integral −4.",
        "Sol toplam 3, gerçek integral 4; sol toplam daha küçük.",
        "Sol toplam 4, gerçek integral 4; her sol toplam tamdır.",
        "Sol toplam 5, gerçek integral 4; sol toplam daha büyük.",
      ],
      answer: 4,
      hint: "Sol yükseklikleri ve ters türev farkını ayrı bul.",
      explanation:
        "Sol yükseklikler f(0)=3 ve f(1)=2; toplam 5. Tam integral [3x−x²/2]₀²=6−2=4; 5>4.",
      guidance: {
        knowledge: ["Azalan fonksiyonda sol uç seçimi üst toplam verir."],
        strategy: "Sol yükseklikleri ve ters türev farkını ayrı bul.",
        steps: [
          "Sol yükseklikler f(0)=3 ve f(1)=2; toplam 5.",
          "Tam integral [3x−x²/2]₀²=6−2=4; 5>4.",
        ],
        optionReasons: [
          "Gerçek integral [3x−x²/2]₀²=4’tür; 6 yalnız sabit 3 katkısıdır.",
          "Fonksiyon ve genişlikler pozitif; yön de 0’dan 2’ye pozitiftir.",
          "3, sağ uç toplamıdır; azalan fonksiyonda sol uçlar daha yüksek kalır.",
          "4 tam integraldir; sol uç yükseklikleri 3 ve 2 toplanınca 5 olur.",
          "Doğru: Sağ uç toplamı 2+1=3 alt sınırdır; 3≤4≤5.",
        ],
        commonError: "Sol uç yöntemini koşulsuz alt toplam diye etiketleme.",
        check: "Sağ uç toplamı 2+1=3 alt sınırdır; 3≤4≤5.",
      },
    },
    {
      prompt:
        "f(x)=(x−2)², [1,3] tek alt aralık kabul ediliyor. Gerçek alt ve üst Riemann toplamları hangisidir?",
      options: [
        "Alt 1, üst 3.",
        "Alt 2, üst 2.",
        "Alt 0, üst 1.",
        "Alt 0, üst 2.",
        "Alt −2, üst 2.",
      ],
      answer: 3,
      hint: "İki uçla birlikte parabolün tepesini kontrol et.",
      explanation:
        "f(1)=f(3)=1, f(2)=0; minimum 0 ve maksimum 1. Genişlik 2 olduğundan alt 0, üst 2.",
      guidance: {
        knowledge: [
          "Alt-üst toplam her alt aralığın gerçek minimum ve maksimumunu kullanır.",
        ],
        strategy: "İki uçla birlikte parabolün tepesini kontrol et.",
        steps: [
          "f(1)=f(3)=1, f(2)=0; minimum 0 ve maksimum 1.",
          "Genişlik 2 olduğundan alt 0, üst 2.",
        ],
        optionReasons: [
          "Bu sayılar sınır apsisleriyle karıştırılmıştır; yüksekliklerin katkıları değildir.",
          "Uç yükseklikleri eşit 1 olsa da içeride x=2’de minimum 0 vardır.",
          "Üst yükseklik 1, aralık genişliği 2 ile çarpılmamıştır.",
          "Doğru: Kesin integral 2/3 bu iki sınır arasındadır.",
          "Kare fonksiyon negatif olmaz; minimum katkı −2 olamaz.",
        ],
        commonError: "İçteki tepeyi yalnız uçlarla değiştirme.",
        check: "Kesin integral 2/3 bu iki sınır arasındadır.",
      },
    },
    {
      prompt: "P={0,1,2,5} ve f(x)=x için sağ uç Riemann toplamı kaçtır?",
      options: ["8", "18", "25/2", "40/3", "10"],
      answer: 1,
      hint: "Genişlikleri 1,1,3 olarak yaz.",
      explanation: "Sağ uçlar 1,2,5; katkılar 1·1,1·2,3·5. Toplam 1+2+15=18.",
      guidance: {
        knowledge: [
          "Eşit olmayan bölüntüde her yükseklik kendi genişliğiyle çarpılır.",
        ],
        strategy: "Genişlikleri 1,1,3 olarak yaz.",
        steps: ["Sağ uçlar 1,2,5; katkılar 1·1,1·2,3·5.", "Toplam 1+2+15=18."],
        optionReasons: [
          "1+2+5 yükseklik toplamıdır; farklı genişlikler atlanmıştır.",
          "Doğru: Genişlik toplamı 5; artan fonksiyon için 18 tam 25/2’den büyüktür.",
          "Bu tam ∫₀⁵x dx integralidir; sonlu sağ uç toplamı değildir.",
          "Bütün genişlikler 5/3 alınmıştır; verilen bölüntü eşit değildir.",
          "Sol veya sağ örnekler ve genişlikler doğru eşleşmemiştir; son aralık katkısı tek başına 15’tir.",
        ],
        commonError: "Düzgün olmayan bölüntüyü eşit genişlikli sanma.",
        check:
          "Genişlik toplamı 5; artan fonksiyon için 18 tam 25/2’den büyüktür.",
      },
    },
    {
      prompt:
        "y=x−1 grafiği, x=−1 ve x=3 doğruları ile x ekseni arasında kalan toplam alan kaçtır?",
      options: ["2", "4", "8", "−4", "0"],
      answer: 1,
      hint: "Kök x=1’de iki üçgeni ayır.",
      explanation:
        "[−1,1] ve [1,3] üçgenlerinin taban ve yükseklikleri 2’şer; her alan 2. Toplam 2+2=4; net integral ise 0.",
      guidance: {
        knowledge: [
          "Eksenin altı ve üstündeki geometrik alanlar ayrı pozitif katkılardır.",
        ],
        strategy: "Kök x=1’de iki üçgeni ayır.",
        steps: [
          "[−1,1] ve [1,3] üçgenlerinin taban ve yükseklikleri 2’şer; her alan 2.",
          "Toplam 2+2=4; net integral ise 0.",
        ],
        optionReasons: [
          "Eşit iki üçgenden yalnız biri sayılmıştır.",
          "Doğru: ∫₋₁³|x−1|dx=4; |∫₋₁³(x−1)dx|=0 farklıdır.",
          "Her üçgenin alanında 1/2 katsayısı atlanmıştır.",
          "Geometrik alan negatif olamaz; yönlü integral ile karıştırılmıştır.",
          "Net integral iki işaretli parçayı iptal eder; toplam alan değildir.",
        ],
        commonError:
          "İntegralin mutlak değeriyle mutlak değerin integralini eşitleme.",
        check: "∫₋₁³|x−1|dx=4; |∫₋₁³(x−1)dx|=0 farklıdır.",
      },
    },
    {
      prompt:
        "y=−2 doğrusu, x=1 ve x=4 doğruları ile x ekseni arasında kalan alan kaç birimkaredir?",
      options: ["8", "3", "−6", "6", "2"],
      answer: 3,
      hint: "Yükseklik 2 ve genişlik 3’ü kullan.",
      explanation: "Alan |−2|·(4−1)=2·3. Sonuç 6; net ∫₁⁴(−2)dx=−6.",
      guidance: {
        knowledge: [
          "Negatif sabit grafikte geometrik alan genişlik çarpı yükseklik büyüklüğüdür.",
        ],
        strategy: "Yükseklik 2 ve genişlik 3’ü kullan.",
        steps: ["Alan |−2|·(4−1)=2·3.", "Sonuç 6; net ∫₁⁴(−2)dx=−6."],
        optionReasons: [
          "Üst sınır 4 aralık genişliği sanılmıştır; genişlik 4−1=3.",
          "Bu yalnız yatay genişliktir; yükseklik 2 eksiktir.",
          "Bu net integralin işaretidir; geometrik alan pozitiftir.",
          "Doğru: Dikdörtgen alanı ile mutlak değerli integral aynı 6 sonucunu verir.",
          "2 yükseklik büyüklüğüdür; genişlik 3 ile çarpılmamıştır.",
        ],
        commonError:
          "Grafiğin eksen altında oluşunu negatif alan diye yorumlama.",
        check:
          "Dikdörtgen alanı ile mutlak değerli integral aynı 6 sonucunu verir.",
      },
    },
    {
      prompt:
        "y=x² ve y=2x eğrilerinin sınırladığı kapalı bölgenin alanı kaçtır?",
      options: ["2/3", "−4/3", "4/3", "8/3", "4"],
      answer: 2,
      hint: "x²=2x çöz ve aradaki sıralamayı belirle.",
      explanation:
        "Kesişimler 0 ve 2; bu aralıkta yükseklik 2x−x². ∫₀²(2x−x²)dx=[x²−x³/3]₀²=4−8/3=4/3.",
      guidance: {
        knowledge: [
          "İki eğri alanında kesişimler sınır, üst-alt farkı yüksekliktir.",
        ],
        strategy: "x²=2x çöz ve aradaki sıralamayı belirle.",
        steps: [
          "Kesişimler 0 ve 2; bu aralıkta yükseklik 2x−x².",
          "∫₀²(2x−x²)dx=[x²−x³/3]₀²=4−8/3=4/3.",
        ],
        optionReasons: [
          "Sınır üstteki kesişim 2 yerine 1’de kesilmiş veya doğru sonuç yarılanmıştır.",
          "Üst-alt sırası ters alınmıştır; içte 2x>x² olur.",
          "Doğru: Fark içte pozitif, uçlarda sıfırdır; alan pozitiftir.",
          "∫₀²x²dx tek eğriyle eksen arasındaki alandır; iki eğri farkı değildir.",
          "Bu ∫₀²2x dx değeridir; alttaki x² katkısı çıkarılmamıştır.",
        ],
        commonError:
          "Sadece bir eğrinin eksen alanını hesaplayıp iki eğri alanı sanma.",
        check: "Fark içte pozitif, uçlarda sıfırdır; alan pozitiftir.",
      },
    },
    {
      prompt:
        "f(x)=x² ve g(x)=4, −3≤x≤3. İki eğri arasındaki toplam alan kaçtır?",
      options: ["6", "32/3", "14/3", "−46/3", "46/3"],
      answer: 4,
      hint: "−2 ve 2’de parçala, simetriyi kullan.",
      explanation:
        "Orta alan ∫₋₂²(4−x²)dx=32/3. Dış alan 2∫₂³(x²−4)dx=14/3; toplam 46/3.",
      guidance: {
        knowledge: [
          "Kesişimden sonra hangi eğrinin üstte kaldığı değişebilir.",
        ],
        strategy: "−2 ve 2’de parçala, simetriyi kullan.",
        steps: [
          "Orta alan ∫₋₂²(4−x²)dx=32/3.",
          "Dış alan 2∫₂³(x²−4)dx=14/3; toplam 46/3.",
        ],
        optionReasons: [
          "Bu net ∫₋₃³(x²−4)dx değerinin mutlak büyüklüğüdür; işaret parçaları iptal olmuştur.",
          "Yalnız [−2,2] orta bölge hesaplanmıştır; iki dış bölge eksiktir.",
          "Yalnız iki dış bölgenin alanıdır; orta bölge eklenmemiştir.",
          "Geometrik alanın bütün parçaları pozitif toplanmalıdır; eksi sonuç olamaz.",
          "Doğru: Net ∫₋₃³(x²−4)dx=−6 ile toplam alan 46/3 farklı niceliklerdir.",
        ],
        commonError:
          "Farkın mutlak değerini integrali aldıktan sonra uygulama.",
        check: "Net ∫₋₃³(x²−4)dx=−6 ile toplam alan 46/3 farklı niceliklerdir.",
      },
    },
    {
      prompt:
        "Sürekli f için bir bölüntüde alt toplam L=4, üst toplam U=7. I=∫f ve aynı bölüntüden S=5 bir Riemann toplamı olsun. Hangisi zorunludur?",
      options: [
        "4≤I≤7 ve |S−I|≤3.",
        "I=11/2",
        "|S−I|=0",
        "I<4 veya I>7",
        "I=5",
      ],
      answer: 0,
      hint: "I ve S’nin [4,7] içinde olduğunu kullan.",
      explanation:
        "4≤I≤7 ve S=5 bu aralıkta. Bu nedenle |S−I|≤7−4=3; kesin hata ayrıca bilinmiyor.",
      guidance: {
        knowledge: [
          "Alt ve üst toplam gerçek integrali kapsar; iki iç değer arası uzaklık U−L’yi aşamaz.",
        ],
        strategy: "I ve S’nin [4,7] içinde olduğunu kullan.",
        steps: [
          "4≤I≤7 ve S=5 bu aralıkta.",
          "Bu nedenle |S−I|≤7−4=3; kesin hata ayrıca bilinmiyor.",
        ],
        optionReasons: [
          "Doğru: 3 kaba ama geçerli sınırdır; bu verilerle I tek bir sayıya zorlanamaz.",
          "Alt-üst sınırların ortası gerçek integral olmak zorunda değildir.",
          "Dikdörtgenlerin tam alanla aynı sonucu verdiği bilgisi yoktur.",
          "Alt-üst toplamın temel sıkıştırma bağıntısıyla çelişir.",
          "Bir örnek toplamın 5 olması onun kesin integral olduğunu göstermez.",
        ],
        commonError: "Yaklaşımı kesin değere eşitleme.",
        check:
          "3 kaba ama geçerli sınırdır; bu verilerle I tek bir sayıya zorlanamaz.",
      },
    },
    {
      prompt:
        "Sürekli bir f için eşit bölüntülü Riemann toplamlarında n→∞ iken ne zorunludur?",
      options: [
        "Bütün toplamların pozitif olması gerekir.",
        "Yalnız sağ uç seçilirse yakınsama olur.",
        "Örnek noktaları kendi aralıklarında kaldıkça toplamlar belirli integrale yaklaşır.",
        "Her n artışında mutlak hata kesin azalır.",
        "Sonlu her n için toplam tam integrale eşittir.",
      ],
      answer: 2,
      hint: "Küçülen aralık genişliğini örnek nokta serbestliğiyle birlikte düşün.",
      explanation:
        "Sürekli f için Riemann integrali vardır. Eşit genişlik sıfıra gittiğinde her izinli örnek seçimi aynı integral limitini verir.",
      guidance: {
        knowledge: ["Eşit bölüntüde en büyük genişlik (b−a)/n sıfıra gider."],
        strategy:
          "Küçülen aralık genişliğini örnek nokta serbestliğiyle birlikte düşün.",
        steps: [
          "Sürekli f için Riemann integrali vardır.",
          "Eşit genişlik sıfıra gittiğinde her izinli örnek seçimi aynı integral limitini verir.",
        ],
        optionReasons: [
          "f negatif değer alabilir; toplam işaretli katkılar içerir.",
          "Süreklilik ve küçülen eşit genişlikte sol, orta veya izinli başka örnekler de yakınsar.",
          "Doğru: Yakınsama koşulu, her sonlu toplamın tam veya her hatanın bir öncekinden küçük olması değildir.",
          "Yakınsama her sonlu adımda tekdüze hata azalması iddiası değildir.",
          "Sonlu dikdörtgen toplamları genel olarak yaklaşık değer verir.",
        ],
        commonError:
          "Limit davranışını her tek adımın davranışıyla karıştırma.",
        check:
          "Yakınsama koşulu, her sonlu toplamın tam veya her hatanın bir öncekinden küçük olması değildir.",
      },
    },
    {
      prompt:
        "f(x)=x ve g(x)=x aynı [−1,2] aralığında veriliyor. İki grafik arasında kalan alan nedir?",
      options: ["Sonsuz", "5/2", "3", "0", "3/2"],
      answer: 3,
      hint: "Farkı önce sadeleştir.",
      explanation: "f−g=x−x=0 bütün aralıkta. Alan ∫₋₁²0dx=0.",
      guidance: {
        knowledge: ["İki eğri alanı |f−g| yüksekliğinin integralidir."],
        strategy: "Farkı önce sadeleştir.",
        steps: ["f−g=x−x=0 bütün aralıkta.", "Alan ∫₋₁²0dx=0."],
        optionReasons: [
          "Grafikler çakıştığı için aradaki düşey uzaklık her yerde 0’dır; sonsuz alan oluşmaz.",
          "Bu tek grafiğin eksenle alanıdır; iki aynı grafik arasındaki uzaklık değildir.",
          "Bu yatay aralık genişliğidir; iki grafik arasındaki yükseklik farkı 0.",
          "Doğru: Çakışan grafikler arasında pozitif genişlikli bir şerit yoktur.",
          "Bu tek grafiğin net integralidir: ∫₋₁²x dx=3/2; iki grafik arasındaki fark sıfırdır.",
        ],
        commonError:
          "Tek grafiğin eksen alanını iki grafik arasındaki alan sanma.",
        check:
          "Çakışan grafikler arasında pozitif genişlikli bir şerit yoktur.",
      },
    },
    {
      prompt:
        "Bir bölüntüye yeni noktalar eklenerek inceltme yapılıyor. Sürekli f için alt toplam L ve üst toplam U nasıl değişebilir?",
      options: [
        "L azalamaz, U artamaz.",
        "L mutlaka azalır, U mutlaka artar.",
        "L ve U her zaman eşit kalır.",
        "L mutlaka artar, U mutlaka azalır.",
        "İkisi de mutlaka negatif olur.",
      ],
      answer: 0,
      hint: "Minimumun aşağı gidemeyeceğini ve maksimumun yukarı çıkamayacağını kullan.",
      explanation:
        "Yeni küçük aralıklarda minimum eski minimumdan küçük değildir; toplam L azalamaz. Maksimum eski maksimumdan büyük değildir; toplam U artamaz.",
      guidance: {
        knowledge: ["İnceltmede her yeni alt aralık eski aralığın içindedir."],
        strategy:
          "Minimumun aşağı gidemeyeceğini ve maksimumun yukarı çıkamayacağını kullan.",
        steps: [
          "Yeni küçük aralıklarda minimum eski minimumdan küçük değildir; toplam L azalamaz.",
          "Maksimum eski maksimumdan büyük değildir; toplam U artamaz.",
        ],
        optionReasons: [
          "Doğru: Eşitlik mümkün olduğu için sıkı artar/azalır yerine azalamaz/artamaz denir.",
          "İnceltmenin sıkıştırma yönü ters çevrilmiştir.",
          "Yeni alt aralıklar eski uç değer aralığını daraltabilir; sabitlik zorunlu değildir.",
          "Sabit fonksiyonda veya bazı parçalarda eşit kalabilir; sıkı değişim zorunlu değildir.",
          "İşaret f’nin değerlerine bağlıdır; bölüntü inceltmesi işareti zorunlu kılmaz.",
        ],
        commonError:
          "İnceltme ile gelişigüzel yeni bölüntü seçimini aynı sanma.",
        check:
          "Eşitlik mümkün olduğu için sıkı artar/azalır yerine azalamaz/artamaz denir.",
      },
    },
    {
      prompt:
        "f(x)=x² için [−1,1] tek alt aralıkta sol uç toplamı ile gerçek alt toplam nedir?",
      options: [
        "Sol uç 1, alt toplam 0.",
        "Sol uç 0, alt toplam 0.",
        "Sol uç −2, alt toplam 0.",
        "Sol uç 2, alt toplam 2.",
        "Sol uç 2, alt toplam 0.",
      ],
      answer: 4,
      hint: "Sol yükseklik 1’i ve iç minimum 0’ı genişlikle çarp.",
      explanation:
        "Sol uç toplamı f(−1)·2=2. Gerçek alt toplam min x²·2=0; minimum içeride x=0’da.",
      guidance: {
        knowledge: [
          "Örnek uç seçimi ile gerçek minimum seçimi ayrı tanımlardır.",
        ],
        strategy: "Sol yükseklik 1’i ve iç minimum 0’ı genişlikle çarp.",
        steps: [
          "Sol uç toplamı f(−1)·2=2.",
          "Gerçek alt toplam min x²·2=0; minimum içeride x=0’da.",
        ],
        optionReasons: [
          "Sol uç yüksekliği 1, genişlik 2 ile çarpılmamıştır.",
          "0 orta nokta yüksekliğidir; sol uç x=−1’de yükseklik 1.",
          "x negatif olsa da x² yüksekliği pozitiftir; katkı negatif değildir.",
          "İçte x=0 minimumu atlanmış; sol uç her fonksiyonda minimum değildir.",
          "Doğru: Karesel fonksiyon bu aralıkta tekdüze olmadığı için sol=alt eşitliği kurulamaz.",
        ],
        commonError:
          "Örnek noktasının işaretini fonksiyon yüksekliğinin işareti sanma.",
        check:
          "Karesel fonksiyon bu aralıkta tekdüze olmadığı için sol=alt eşitliği kurulamaz.",
      },
    },
    {
      prompt:
        "y=x² ve y=x+2 eğrilerinin kapalı bölgesini sınırlayan apsisler hangisidir?",
      options: ["Yalnız 2", "−1 ve 2", "Kesişim yoktur.", "0 ve 2", "−2 ve 1"],
      answer: 1,
      hint: "x²=x+2 eşitliğini bir tarafa topla.",
      explanation:
        "x²−x−2=(x−2)(x+1)=0. Kökler −1 ve 2; aralarında doğru üstte, parabol alttadır.",
      guidance: {
        knowledge: [
          "Doğal kapalı bölge sınırları iki eğrinin kesişimlerinden bulunur.",
        ],
        strategy: "x²=x+2 eşitliğini bir tarafa topla.",
        steps: [
          "x²−x−2=(x−2)(x+1)=0.",
          "Kökler −1 ve 2; aralarında doğru üstte, parabol alttadır.",
        ],
        optionReasons: [
          "Kesişim denkleminin negatif kökü −1 eksik bırakılmıştır.",
          "Doğru: x=−1 için iki yükseklik 1, x=2 için iki yükseklik 4 olur.",
          "(x−2)(x+1)=0 iki gerçek kök verir.",
          "0, x²=x+2 eşitliğini sağlamaz; 0≠2.",
          "Bunlar x²+x−2=0 denkleminin kökleridir; farkın işareti yanlış kurulmuştur.",
        ],
        commonError:
          "Doğru ve parabolün x ekseni köklerini kesişim sınırı sanma.",
        check: "x=−1 için iki yükseklik 1, x=2 için iki yükseklik 4 olur.",
      },
    },
    {
      prompt:
        "Eşit bölüntülü Riemann hesabında [2,8] aralığı 12 alt aralığa ayrılıyor. Ortak genişlik ve bölüntü noktası sayısı nedir?",
      options: ["6 ve 13", "2/3 ve 12", "1/2 ve 13", "1/2 ve 12", "2 ve 13"],
      answer: 2,
      hint: "Önce aralık uzunluğu 6’yı bul.",
      explanation:
        "Δx=(8−2)/12=6/12=1/2. İki sınır dahil 12+1=13 bölüntü noktası gerekir.",
      guidance: {
        knowledge: [
          "n alt aralık, n+1 bölüntü noktası ve ortak genişlik (b−a)/n demektir.",
        ],
        strategy: "Önce aralık uzunluğu 6’yı bul.",
        steps: [
          "Δx=(8−2)/12=6/12=1/2.",
          "İki sınır dahil 12+1=13 bölüntü noktası gerekir.",
        ],
        optionReasons: [
          "6 bütün aralığın genişliğidir; 12’ye bölünmemiştir.",
          "Genişlikte 8/12 kullanılmış ve alt sınır çıkarılmamış; nokta sayısı da n+1 olmalı.",
          "Doğru: 12·(1/2)=6 toplam genişliği yeniden verir.",
          "Genişlik doğru; n alt aralığın n+1=13 sınır noktası vardır.",
          "Genişlik (8−2)/12=1/2; 2 sonucunda bölme ters veya eksik yapılmıştır.",
        ],
        commonError: "Alt aralık sayısıyla nokta sayısını eşitleme.",
        check: "12·(1/2)=6 toplam genişliği yeniden verir.",
      },
    },
  ],
];
export const forge025MathLessons: Lesson[] = forge025MathGuides.map((g, i) => ({
  id: g.id,
  subjectId: "ayt-matematik",
  title: txt(titles025[i]),
  minutes: g.minutes,
  objectives: g.objectives.map(txt),
  body: g.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(g.source),
  tags: [forge025MathTopics[g.id], "Özgün öğretim soruları"],
  questions: banks025[i].map((q, n) => ({
    id: `f025-${g.id}-${n + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: g.id,
  })),
}));
