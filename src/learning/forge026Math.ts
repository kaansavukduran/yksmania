import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const integer026 = (v: unknown, lo: number, hi: number): number => {
  if (typeof v !== "number" || !Number.isSafeInteger(v) || v < lo || v > hi)
    throw new RangeError("MATH026_INTEGER_SCOPE");
  return v;
};
const choice026 = <T extends string>(v: unknown, choices: readonly T[]): T => {
  if (typeof v !== "string" || !choices.includes(v as T))
    throw new RangeError("MATH026_CHOICE_SCOPE");
  return v as T;
};
const gcd026 = (a: number, b: number): number => {
  while (b) [a, b] = [b, a % b];
  return a;
};
const modulo026 = (a: number, b: number) => ((a % b) + b) % b;
export type PlaceOperation026 =
  "replace" | "append" | "prepend" | "reverse" | "delete";
export function placeChange026(
  value: number,
  operation: PlaceOperation026,
  digit = 0,
  position = 0,
) {
  integer026(value, 0, 99999);
  choice026(operation, ["replace", "append", "prepend", "reverse", "delete"]);
  integer026(digit, 0, 9);
  const written = String(value),
    length = written.length;
  integer026(position, 0, length - 1);
  const chars = [...written];
  let resultWritten: string;
  if (operation === "replace") {
    chars[length - 1 - position] = String(digit);
    resultWritten = chars.join("");
  } else if (operation === "append") resultWritten = written + digit;
  else if (operation === "prepend") resultWritten = digit + written;
  else if (operation === "reverse") resultWritten = chars.reverse().join("");
  else resultWritten = written.slice(0, -1) || "0";
  const result = Number(resultWritten);
  const ledger = (s: string) =>
    [...s].map((c, i) => ({
      digit: Number(c),
      position: s.length - 1 - i,
      weight: 10 ** (s.length - 1 - i),
      contribution: Number(c) * 10 ** (s.length - 1 - i),
    }));
  return {
    value,
    operation,
    digit,
    position,
    written,
    length,
    resultWritten,
    result,
    resultLength: String(result).length,
    leadingZero: resultWritten.length > 1 && resultWritten[0] === "0",
    difference: result - value,
    digitSum: [...written].reduce((s, c) => s + Number(c), 0),
    originalTerms: ledger(written),
    resultTerms: ledger(resultWritten),
    scope:
      "Onluk doğal sayı yazımı; sağdan birler konumu 0’dır. Baştaki sıfırlar yazımda gösterilir, sayısal değere yeni basamak eklemez. Son rakam silinince değer 10 ile tam bölümdür; tek haneli sayıda sonuç 0 yazılır. Kutular konumu temsil eder, fiziksel büyüklük ölçeği değildir.",
  };
}
export function carry026(a: number, b: number, c = 0) {
  for (const v of [a, b, c]) integer026(v, 0, 999);
  const columns: {
    position: number;
    weight: number;
    digits: number[];
    carryIn: number;
    raw: number;
    digit: number;
    carryOut: number;
  }[] = [];
  let carry = 0;
  for (let position = 0; position < 3 || carry > 0; position++) {
    const weight = 10 ** position,
      digits = [a, b, c].map((v) => Math.floor(v / weight) % 10),
      raw = digits.reduce((s, n) => s + n, carry),
      carryOut = Math.floor(raw / 10);
    columns.push({
      position,
      weight,
      digits,
      carryIn: carry,
      raw,
      digit: raw % 10,
      carryOut,
    });
    carry = carryOut;
  }
  return {
    a,
    b,
    c,
    sum: a + b + c,
    columns,
    rebuilt: columns.reduce((s, x) => s + x.digit * x.weight, 0),
    scope:
      "Üç doğal sayının onluk sütun toplamı. Sıfır üçüncü toplananla iki sayı da incelenebilir; elde 0, 1 veya 2 olabilir.",
  };
}
export function numbering026(first: number, last: number) {
  integer026(first, 1, 9999);
  integer026(last, first, 9999);
  const blocks: {
    first: number;
    last: number;
    digits: number;
    count: number;
    contribution: number;
  }[] = [];
  for (let digits = 1; digits <= 4; digits++) {
    const lo = Math.max(first, 10 ** (digits - 1)),
      hi = Math.min(last, 10 ** digits - 1);
    if (lo <= hi)
      blocks.push({
        first: lo,
        last: hi,
        digits,
        count: hi - lo + 1,
        contribution: (hi - lo + 1) * digits,
      });
  }
  return {
    first,
    last,
    count: last - first + 1,
    blocks,
    totalDigits: blocks.reduce((s, b) => s + b.contribution, 0),
    scope:
      "İki uç dahil ardışık doğal sayı etiketleri; baştaki sıfır, atlanan numara, virgül veya başka karakter yoktur.",
  };
}
export function division026(dividend: number, divisor: number) {
  integer026(dividend, -999, 999);
  integer026(divisor, 1, 30);
  const quotient = Math.floor(dividend / divisor),
    remainder = dividend - quotient * divisor;
  return {
    dividend,
    divisor,
    quotient,
    remainder,
    lower: quotient * divisor,
    upper: (quotient + 1) * divisor,
    divisible: remainder === 0,
    scope:
      "Bölen pozitif tam sayıdır; negatif bölünende de 0≤kalan<bölen seçilir. Negatif nesne yığını kurulmaz; ardışık katlar sayı doğrusunda gösterilir.",
  };
}
export function remainderWeights026(value: number, divisor: number) {
  integer026(value, 0, 999999);
  integer026(divisor, 1, 30);
  const written = String(value),
    terms = [...written].map((c, i) => {
      const position = written.length - i - 1,
        weight = 10 ** position,
        reducedWeight =
          divisor === 11 ? (position % 2 === 0 ? 1 : -1) : weight % divisor;
      return {
        digit: Number(c),
        position,
        weight,
        reducedWeight,
        contribution: Number(c) * reducedWeight,
      };
    }),
    transformed = terms.reduce((s, t) => s + t.contribution, 0),
    remainder = modulo026(transformed, divisor);
  return {
    value,
    divisor,
    terms,
    transformed,
    remainder,
    quotient: Math.floor(value / divisor),
    divisible: remainder === 0,
    scope:
      "Her basamak ağırlığı aynı bölenin kalanıyla değiştirilir. 11 için sağdan +1,−1 ağırlıkları kullanılır; ara toplam negatif olabilir, son kalan 0 ile bölen−1 arasına indirilir.",
  };
}
export function digitFilter026(
  pattern: string,
  divisors: readonly number[],
  distinct = false,
) {
  if (
    typeof pattern !== "string" ||
    !/^[0-9?]{2,5}$/.test(pattern) ||
    (pattern.match(/\?/g)?.length ?? 0) < 1 ||
    (pattern.match(/\?/g)?.length ?? 0) > 2 ||
    typeof distinct !== "boolean"
  )
    throw new RangeError("MATH026_PATTERN_SCOPE");
  if (
    !Array.isArray(divisors) ||
    divisors.length < 1 ||
    divisors.length > 3 ||
    Array.from(
      { length: divisors.length },
      (_, i) => !Object.hasOwn(divisors, i),
    ).some(Boolean)
  )
    throw new RangeError("MATH026_DIVISORS_SCOPE");
  for (const d of divisors) integer026(d, 2, 30);
  const ds = [...new Set(divisors)],
    candidates: {
      value: number;
      written: string;
      remainders: number[];
      passes: boolean;
    }[] = [];
  const fill = (s: string) => {
    const at = s.indexOf("?");
    if (at !== -1) {
      for (let d = 0; d <= 9; d++) fill(s.slice(0, at) + d + s.slice(at + 1));
      return;
    }
    if (s[0] === "0" || (distinct && new Set(s).size !== s.length)) return;
    const value = Number(s),
      remainders = ds.map((d) => value % d);
    candidates.push({
      value,
      written: s,
      remainders,
      passes: remainders.every((r) => r === 0),
    });
  };
  fill(pattern);
  candidates.sort((a, b) => a.value - b.value);
  return {
    pattern,
    divisors: ds,
    distinct,
    candidates,
    solutions: candidates.filter((c) => c.passes).map((c) => c.value),
    scope:
      "? işaretleri ayrı ayrı 0–9 rakamlarını tarar; aynı harf bağıntısı kurulmaz. İlk rakam sıfır olamaz. Farklılık yalnız seçildiğinde uygulanır; her bölen ayrıca sınanır.",
  };
}
export function common026(a: number, b: number) {
  integer026(a, 1, 120);
  integer026(b, 1, 120);
  const gcd = gcd026(a, b),
    lcm = (a / gcd) * b,
    euclid: { a: number; b: number; quotient: number; remainder: number }[] =
      [];
  let x = a,
    y = b;
  while (y) {
    const remainder = x % y;
    euclid.push({ a: x, b: y, quotient: Math.floor(x / y), remainder });
    [x, y] = [y, remainder];
  }
  const commonDivisors = Array.from({ length: gcd }, (_, i) => i + 1).filter(
      (d) => gcd % d === 0,
    ),
    primes: {
      prime: number;
      aExponent: number;
      bExponent: number;
      min: number;
      max: number;
    }[] = [];
  let aa = a,
    bb = b;
  for (let p = 2; p <= Math.max(aa, bb); p++) {
    let ea = 0,
      eb = 0;
    while (aa % p === 0) {
      aa /= p;
      ea++;
    }
    while (bb % p === 0) {
      bb /= p;
      eb++;
    }
    if (ea || eb)
      primes.push({
        prime: p,
        aExponent: ea,
        bExponent: eb,
        min: Math.min(ea, eb),
        max: Math.max(ea, eb),
      });
  }
  return {
    a,
    b,
    gcd,
    lcm,
    euclid,
    commonDivisors,
    primes,
    columns: a / gcd,
    rows: b / gcd,
    tiles: (a / gcd) * (b / gcd),
    stripPieces: a / gcd + b / gcd,
    scope:
      "Pozitif tam sayı uzunlukları; kenarlara paralel eş kareler, boşluk/derz/kesim kaybı yoktur. EBOB kare kenarıdır; kare sayısı iki kenardaki adetlerin çarpımı, ayrı şeritlerin parça sayısı toplamıdır.",
  };
}
export function meetings026(
  a: number,
  b: number,
  offsetA: number,
  offsetB: number,
  horizon: number,
  includeZero = true,
  includeEnd = true,
) {
  integer026(a, 1, 30);
  integer026(b, 1, 30);
  integer026(offsetA, 0, 60);
  integer026(offsetB, 0, 60);
  integer026(horizon, 0, 240);
  if (typeof includeZero !== "boolean" || typeof includeEnd !== "boolean")
    throw new RangeError("MATH026_INTERVAL_SCOPE");
  const events = (period: number, offset: number) => {
      const times: number[] = [];
      for (let t = offset; t <= horizon; t += period)
        if ((includeZero || t !== 0) && (includeEnd || t !== horizon))
          times.push(t);
      return times;
    },
    eventsA = events(a, offsetA),
    eventsB = events(b, offsetB),
    other = new Set(eventsB),
    common = eventsA.filter((t) => other.has(t)),
    gcd = gcd026(a, b),
    lcm = (a / gcd) * b;
  return {
    a,
    b,
    offsetA,
    offsetB,
    horizon,
    includeZero,
    includeEnd,
    gcd,
    lcm,
    compatible: (offsetB - offsetA) % gcd === 0,
    eventsA,
    eventsB,
    common,
    firstInWindow: common[0] ?? null,
    count: common.length,
    scope:
      "Periyotlar sabit; verilen başlangıçlar her dizinin ilk olayıdır, öncesine olay uzatılmaz. Sıfır ve son anın dahil olup olmadığı ayrı seçilir. Uyumlu fazlar, sınırlı pencerede mutlaka ortak olay bulunduğu anlamına gelmez.",
  };
}
export function commonPairs026(gcd: number, lcm: number) {
  integer026(gcd, 1, 60);
  integer026(lcm, 1, 3600);
  const feasible = lcm % gcd === 0,
    pairs: { x: number; y: number; a: number; b: number; sum: number }[] = [];
  if (feasible) {
    const product = lcm / gcd;
    for (let x = 1; x * x <= product; x++)
      if (product % x === 0 && gcd026(x, product / x) === 1) {
        const y = product / x,
          a = gcd * x,
          b = gcd * y;
        pairs.push({ x, y, a, b, sum: a + b });
      }
  }
  return {
    gcd,
    lcm,
    feasible,
    pairs,
    minSum: pairs.length ? Math.min(...pairs.map((p) => p.sum)) : null,
    maxSum: pairs.length ? Math.max(...pairs.map((p) => p.sum)) : null,
    scope:
      "İki pozitif tam sayı, sırasız çift olarak a≤b ile sayılır. a=d·x, b=d·y dönüşümünde x·y=m/d ve EBOB(x,y)=1 birlikte gerekir. d, m’yi bölmüyorsa uygun çift yoktur.",
  };
}

export const mathDefaults026 = {
  placeMode: "change",
  number: 4062,
  operation: "replace",
  digit: 7,
  position: 1,
  addA: 168,
  addB: 257,
  addC: 389,
  pageFirst: 98,
  pageLast: 105,
  divisionMode: "divide",
  dividend: 83,
  divisor: 7,
  weightNumber: 4025,
  pattern: "7?4",
  divisorSet: "3,4",
  distinct: false,
  commonMode: "tiles",
  commonA: 42,
  commonB: 66,
  periodA: 6,
  periodB: 10,
  offsetA: 0,
  offsetB: 4,
  horizon: 60,
  includeZero: true,
  includeEnd: true,
  pairGcd: 6,
  pairLcm: 180,
  guess: "",
  reason: "",
  checked: false,
};
export function normalizeMath026(saved: Record<string, unknown>) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved))
    throw new RangeError("MATH026_STATE_SCOPE");
  const d = mathDefaults026,
    num = (key: keyof typeof d, min: number, max: number) =>
      Math.max(
        min,
        Math.min(
          max,
          Math.round(
            typeof saved[key] === "number" && Number.isFinite(saved[key])
              ? (saved[key] as number)
              : (d[key] as number),
          ),
        ),
      ),
    menu = (key: keyof typeof d, choices: readonly string[]) =>
      typeof saved[key] === "string" && choices.includes(saved[key] as string)
        ? (saved[key] as string)
        : (d[key] as string),
    boolean = (key: keyof typeof d) =>
      typeof saved[key] === "boolean"
        ? (saved[key] as boolean)
        : (d[key] as boolean),
    number = num("number", 0, 99999),
    pageFirst = num("pageFirst", 1, 9999);
  return {
    placeMode: menu("placeMode", ["change", "carry", "numbering"]),
    number,
    operation: menu("operation", [
      "replace",
      "append",
      "prepend",
      "reverse",
      "delete",
    ]) as PlaceOperation026,
    digit: num("digit", 0, 9),
    position: num("position", 0, String(number).length - 1),
    addA: num("addA", 0, 999),
    addB: num("addB", 0, 999),
    addC: num("addC", 0, 999),
    pageFirst,
    pageLast: Math.max(pageFirst, num("pageLast", 1, 9999)),
    divisionMode: menu("divisionMode", ["divide", "weights", "filter"]),
    dividend: num("dividend", -999, 999),
    divisor: num("divisor", 1, 30),
    weightNumber: num("weightNumber", 0, 999999),
    pattern: menu("pattern", ["7?4", "3?6?", "?28", "13?5"]),
    divisorSet: menu("divisorSet", ["3,4", "5,9", "4,11", "8,9"]),
    distinct: boolean("distinct"),
    commonMode: menu("commonMode", ["tiles", "events", "pairs"]),
    commonA: num("commonA", 1, 120),
    commonB: num("commonB", 1, 120),
    periodA: num("periodA", 1, 30),
    periodB: num("periodB", 1, 30),
    offsetA: num("offsetA", 0, 60),
    offsetB: num("offsetB", 0, 60),
    horizon: num("horizon", 0, 240),
    includeZero: boolean("includeZero"),
    includeEnd: boolean("includeEnd"),
    pairGcd: num("pairGcd", 1, 60),
    pairLcm: num("pairLcm", 1, 3600),
    guess: typeof saved.guess === "string" ? saved.guess : "",
    reason: typeof saved.reason === "string" ? saved.reason.slice(0, 120) : "",
    checked: saved.checked === true,
  };
}

// AUTHORED_CONTENT_026
export const forge026MathGuides: LessonGuide[] = [
  {
    id: "sayi-basamaklari",
    minutes: 90,
    objectives: [
      "Onluk yazımı konum ağırlıklarından kurmak ve sayı/rakam/basamak niceliklerini ayırmak.",
      "Harfli sayılarda ilk rakam, tekrar, sıfır, elde ve tam sayılık koşullarını birlikte uygulamak.",
      "Basamak dönüşümü, sayma ve numaralama sorularında yöntemi türetip asıl koşullarla sınamak.",
    ],
    sections: [
      {
        title: "Rakam yer değiştirirse değer de değişebilir",
        paragraphs: [
          "Rakam, onluk sistemin 0,1,2,3,4,5,6,7,8,9 işaretlerinden biridir. Sayı bu işaretlerle anlatılan niceliktir. 6206 dört basamaklı tek bir sayıdır; yazımında dört rakam bulunur, farklı rakamların sayısı ise üçtür. Bir rakamın sayı değeri kendisi, basamak değeri bulunduğu konumun ağırlığıyla çarpımıdır. Soldaki 6, altı bin; sağdaki 6, altı birlik verir.",
          "Sağdan sola ağırlıklar 1,10,100,1000 biçiminde büyür: 6206=6×1000+2×100+0×10+6. Sıfırın katkısı sıfırdır fakat onlar konumunu korur. Onu silmek, solundaki rakamların ağırlığını değiştirir. Rakam toplamı 14, yazılan rakam adedi 4, sayısal değer 6206’dır; sorunun bu niceliklerden hangisini istediğini adlandır.",
        ],
      },
      {
        title: "Harfli yazım çarpım değildir",
        paragraphs: [
          "Bu rehberde [ab], a ve b rakamlarıyla yazılmış iki basamaklı sayıyı gösterir: [ab]=10 a+b. [abc]=100 a+10 b+c olur. a×b ise ayrı bir çarpımdır. Örneğin a=3,b=8 için [ab]=38, a×b=24’tür. Harfli sayıyı denklemde kullanmadan önce bu çözümlemeyi yazmak, sayısal konumu görünür kılar.",
          "İlk rakam 1–9, diğerleri 0–9 aralığındadır. Aynı harf her kullanımda aynı rakamı gösterir. Farklı harflerin farklı rakam olması ayrıca söylenmelidir: [aab] yazımında b=a olabilir. Tersinin de iki basamaklı olduğu belirtiliyorsa b≠0 eklenir. Denklemi çözmekten sonra değil, çözerken bu koşulları kullan.",
        ],
      },
      {
        title: "Ters yazımı aç, kısa yolu türet",
        paragraphs: [
          "[ab]−[ba]=(10 a+b)−(10 b+a)=9(a−b); toplamları 11(a+b)’dir. Üç basamakta [abc]−[cba]=99(a−c) bulunur; orta rakam aynı konumda kaldığı için iptal olur. Bu, ortadaki rakamın her soruda önemsiz olduğu anlamına gelmez: rakam toplamı veya farklılık koşulu varsa b yeniden rol alır.",
          "Fark işaretlidir. [ab] kendisinden büyük tersinden çıkarılıyorsa negatif sonuç çıkar; pozitif uzaklık istendiğinde |9(a−b)| alınır. Sonda sıfır bulunan sayının ters yazımındaki baş sıfırlar sayı değerini büyütmez. Her iki sayının da aynı basamaklı olması koşuluyla yalnız yazılı bir karakter dizisinin ters çevrilmesini ayır.",
        ],
      },
      {
        title: "Sola eklemek ve sağa eklemek farklıdır",
        paragraphs: [
          "N’nin sağına d rakamını yazınca eski her rakam bir konum sola kayar: sonuç 10 N+d olur. N, k basamaklıysa soluna d yazmak d×10^k+N verir. Sağa 0 yazmak N’yi 10 ile çarpar; sola 0 yazmak sayısal değeri değiştirmez ve daha uzun bir doğal sayı oluşturmaz. İşlemin yönünü açıkça yaz.",
          "Bir konumdaki x rakamını y yapmak, diğer rakamlar aynı kaldığında sayıyı (y−x)×10^j kadar değiştirir; birler için j=0’dır. Bu değişiklikte y yine bir rakam olmalıdır. İlk rakamı sıfıra çevirirsen sayı daha az basamaklı olabilir. Denklemin verdiği yeni yazımı oluşturup gerçekten söylenen konumun değiştiğini denetle.",
        ],
      },
      {
        title: "Elde ve sıfır kısıtlarını son aşamaya bırakma",
        figureTitle: "Birlikleri onluklara grupla",
        paragraphs: [
          "Bir sütundaki rakamların ve önceki eldenin toplamı T olsun. Sütuna T’nin 10’a bölümünden kalan yazılır; sonraki sütuna tam bölüm taşınır. İki rakam toplanırken elde en çok 1, üç rakam toplanırken en çok 2 olabilir. Örneğin birler toplamı 26 ise 6 yazılır, 2 onluk taşınır. Elde, gizli bir rakam değil tam bir onluk aktarımıdır.",
          "Sayı kurarken ilk konumu sıfır olmayan rakamla doldur. Verilen rakamları birer kez kullanarak en küçük yazımda başa en küçük sıfır olmayanı, ardından varsa sıfırı ve kalanları artan sırayla koy. En büyükte büyük rakamları yüksek ağırlıklara yerleştir. Rakam tekrarına izin verilip verilmediğini her adımda koru; kullanılmamış rakam listesini güncelle.",
          "9+9+d modelinde d, üçüncü toplananın birler rakamıdır. d=1 iken 19 birliğin 10’u taşınır, 9’u kalır. d=2 olunca 20 birlik iki tam onluk eder, bu yüzden birler hanesine 0 yazılır. d=9 iken 27 birlikten 20’si taşınır ve 7’si kalır.",
        ],
      },
      {
        title: "Numara sayısı ile yazılan rakam sayısı",
        paragraphs: [
          "Ardışık etiketlerde sayı adedi ile toplam rakam adedi farklıdır. Uçlar dahil a’dan b’ye sayı adedi b−a+1’dir. 1–9 aralığındaki sayılar birer, 10–99 aralığındakiler ikişer, 100–999 aralığındakiler üçer rakam kullanır. Aralığı 9/10 ve 99/100 gibi basamak sınırlarında böl; her blokta adet ile basamak sayısını çarp.",
          "Etiketlerin 1’den başlaması zorunlu değildir. Örneğin yalnız 80’den başlayan numaralamada ilk 79 sayı yazılmaz. Sabit genişlikli 007 gibi kodlar ile doğal sayı 7’nin yazımı da farklı işlerdir. Ön sıfırların kullanıldığı açıkça söylenmedikçe her sayıyı olağan onluk yazımıyla say. Modelde başlangıç ve bitiş uçları ikisi de dahildir.",
        ],
      },
      {
        title: "Basamak aralığı ve 10’un kuvvetleri",
        paragraphs: [
          "Pozitif k basamaklı sayılar 10^(k−1) ile 10^k−1 arasındadır. Bu nedenle beş basamaklılık 10000≤N≤99999 demektir. 10^k, k+1 basamaklı ilk sayıdır; 10^k−1 ise k basamaklı son sayıdır. Eşitlik sınırlarını yazmak, “en küçük” ve “en büyük” adayın doğru blokta kalmasını sağlar.",
          "Bir basamak aralığında 9×10^(k−1) pozitif sayı bulunur. Bu formül k≥1 için geçerlidir; 0 ayrıca tek rakamla yazılır. Sayının önüne keyfî sıfır koymak onun basamak adedini artırmaz. Virgüllü yazımları bu doğal sayı aralığına katma; onların tam kısmı ve kesir basamakları ayrı değerlendirilir.",
        ],
      },
      {
        title: "Sayıyı bloklara ayır ve birleştir",
        paragraphs: [
          "Bir yazımı sol blok X ve k hanelik sağ blok Y olarak ayırınca N=10^k·X+Y olur. Sağ blok 056 ise değeri 56’dır, genişliği ise 3’tür; bu yüzden çarpan 1000 kalır. Y’nin sayısal değerinin kaç basamaklı göründüğünü değil, ayrılan blokta kaç konum bulunduğunu kullan.",
          "Art arda yazılan iki sayının sırası da önemlidir: X’in ardına Y’yi eklemek, X’i Y’nin yazım uzunluğu kadar sola kaydırır. Aynı blok tekrarlanırsa ortak çarpan çıkabilir: iki hanelik X’in iki kez yazımı 100 X+X=101 X’tir. Bu ilişki, birleştirme işlemini X×X sanmadan önce tanımdan türetilir.",
        ],
      },
      {
        title: "Ortaya sıfır eklemek veya silmek",
        paragraphs: [
          "Sıfırın sayı değeri sıfır olduğu hâlde yazıma eklenmesi soldaki bloğu kaydırabilir. Sol blok P, sağdaki k hanelik blok Q ise başlangıç 10^k·P+Q’dur. Araya bir sıfır girince 10^(k+1)·P+Q olur; fark 9×10^k·P’dir. Sağdaki blok aynı konumlarda kalırken sol blok on katına çıkmıştır.",
          "İçteki sıfırı silmek bu işlemin tersidir; sol bloğun ağırlığı on kat küçülür. Hangi sıfırın silindiğini belirtmek gerekir: aynı sayıda birden fazla sıfır bulunabilir ve sonuçlar farklı olabilir. Önce blok sınırını çiz, sonra değişen katkıyı hesapla. Sıfırı yalnız “etkisiz terim” diye çözümlemeden atmak bu kaymayı gizler.",
        ],
      },
      {
        title: "İki rakamın yer değiştirmesini hesapla",
        paragraphs: [
          "x ve y rakamları sırasıyla 10^i ve 10^j ağırlıklarındaysa eski katkı x·10^i+y·10^j, yeni katkı y·10^i+x·10^j olur. Yeni−eski farkı (y−x)(10^i−10^j)’dir. İşaret, hangi konumdaki rakamın büyüdüğüne bağlıdır; yer değiştirmede rakam toplamı korunur.",
          "Aynı iki rakamın yeri değişirse fark sıfırdır; bu, işlemin yazım üzerinde görünür değişiklik yapmamasıdır. İlk basamağa sıfır gelirse doğal sayının basamak adedi azalabilir. Yeni sayının eskiyle aynı basamaklı kalması isteniyorsa bu durumu ele. Birkaç basamağı aynı anda değiştirirken her değişimin katkısını toplayabilirsin.",
        ],
      },
      {
        title: "Harfli denklemde adayları tüket",
        paragraphs: [
          "Basamak eşitliğini açtıktan sonra bulunan her gerçek sayı çözümü rakam değildir. a=12, b=−1 veya c=2,5 gibi sonuçlar elenir; rakamlar tam sayıdır. Bir değişken serbest kaldığında onun 0–9 aralığındaki bütün adaylarını tara ve diğerlerini eşitlikten üret. İlk konumdaki harf için 0’ı baştan çıkar.",
          "“Kaç sayı vardır?” sorusunda farklı harf atamaları aynı sayıyı üretir mi diye kontrol et. “En küçük sayı” sorusunda yalnız bir uygun aday bulmak yetmez; daha küçük adayların neden elendiğini açıkla. Aday tablosuna rakam sınırı, baş sıfır ve farklılık için ayrı sütun koymak her koşulu görünür kılar.",
        ],
      },
      {
        title: "Toplamada sütun denklemi ve elde",
        paragraphs: [
          "Birler sütununu x+y+elde_giriş=z+10·elde_çıkış biçiminde yazabilirsin. Bilinmeyenler birer rakam, elde ise olası tam onluk sayısıdır. Aynı yöntemi sağdan sola sürdür; bir sütundan çıkan elde, komşu sütunun girdisidir. Son sütundan elde çıkarsa yeni bir basamak oluşur.",
          "Üç toplananda 9+9+9=27, en fazla 2 onluk taşır. “Elde var” bilgisi tek başına onun 1 olduğunu söylemez. Etkinlikte her sütunun ham toplamı, yazılan rakamı ve sonraki eldesi ayrı satırda görünür. Son rakamların ağırlıklı toplamını başlangıç sayılarını doğrudan toplayarak doğrula.",
        ],
      },
      {
        title: "Çıkarmada bir onluğu bozmak",
        paragraphs: [
          "Bir sütunun üst rakamı alttakinden küçükse soldaki komşudan bir onluk alınır: soldaki rakam 1 azalır, mevcut sütuna 10 eklenir. Arada sıfırlar varsa bozma birden çok konumdan geçer; her geçen sıfırın 9’a dönmesi bu aktarımın sonucudur. Sayının toplam değeri, yalnız farklı birliklerle yazıldığı için korunur.",
          "Çıkarmayı ters toplamayla denetle: çıkan fark ile çıkarılan sayının toplamı başlangıcı vermelidir. Basamak bozmayı tek başına “üstüne 10 ekle” işlemi yapmak sayıyı artırır; soldaki azalmayı da hesaba kat. İşaretli fark isteniyorsa önce hangi sayının daha büyük olduğunu belirle.",
        ],
      },
      {
        title: "Seçimleri çarpma ve durumları toplama",
        paragraphs: [
          "Birinci konum seçildikten sonra ikinci konum için her durumda aynı sayıda seçenek kalıyorsa seçim adetleri çarpılır. Tekrar serbest üç basamaklı yazımda 9×10×10, bütün rakamlar farklıysa 9×9×8 bulunur. İlk rakam seçildikten sonra ikinci konuma sıfır da gelebilir; geriye 9 rakam kalır.",
          "Son rakamın çift veya 5’in katı olması gibi koşullar seçimleri birbirine bağlayabilir. Önce son rakam 0 mı, başka bir izinli rakam mı diye ayrık durumlar kur. Her durumda baş sıfır ve tekrar yasağını yeniden değerlendir. Durumlar çakışmıyorsa adetleri topla; çakışan listeleri doğrudan toplamak aynı sayıyı iki kez sayar.",
        ],
      },
      {
        title: "Uç değerlerde konumun önceliği",
        paragraphs: [
          "En büyük sayıyı kurarken yüksek ağırlıklı konumu büyütmek, daha sağdaki bütün küçük düzenlemelere üstün gelir. Bu yüzden aynı rakam çokluğunun en büyük yazımı azalan sıradır. En küçük doğal sayıda ilk rakam sıfır olamaz; kalan konumlar artan sırayla doldurulur. Bu gerekçe yalnız görülen bir örneğe değil, ağırlıkların karşılaştırılmasına dayanır.",
          "Ek koşul varsa yalnız sıralamak yetmeyebilir. Sayının çiftliği son rakamı sınırlar; belirli bir rakamın zorunlu konumu başka seçimleri daraltır. Önce bu kısıtları yerleştir, sonra olası baş rakamları küçükten büyüğe dene. Rakamları aynı olan iki yazımın farkının 9’a bölünmesi, rakam toplamları eşitliğinden gelen yardımcı kontroldür.",
        ],
      },
      {
        title: "Numaralamayı toplam rakamdan geriye çöz",
        paragraphs: [
          "Son etiket bilinmiyorsa önce tamamen biten basamak bloklarının rakam maliyetini çıkar. 1–9 bloğu 9, 10–99 bloğu 180 rakam tüketir. Kalan maliyeti bulunduğun bloktaki basamak adedine böl; bu bölüm yeni blokta yazılan sayı adedidir. Son etiket, blok başı+adet−1 ile bulunur.",
          "Kalan maliyet basamak adedine bölünmüyorsa tam bir son etiket oluşturulamıyor olabilir. Bir sonraki bloğa geçmeden önce mevcut bloğun toplam kapasitesini denetle. Başlangıç 1 değilse önceki etiketlerin maliyetini ekleme. Elde edilen son etiketi başlangıç sorusuna geri koyup bütün blokların maliyetini yeniden topla.",
        ],
      },
      {
        title: "Kod, ondalık ve farklı taban sınırı",
        paragraphs: [
          "Sabit dört haneli bir kodda 0008 geçerli olabilir; bu bir dört basamaklı doğal sayı değildir. Kod sayımı baştaki sıfıra izin verebilir, doğal sayı sayımı vermez. Virgüllü sayıda ise virgülün sağındaki ağırlıklar 1/10,1/100,1/1000 diye küçülür; virgül bir rakam değildir. Kökün hangi nesneyi tanımladığını önce oku.",
          "Farklı taban açıkça tanımlanırsa konum ağırlıkları 10 yerine tabanın kuvvetleri olur ve rakamlar tabandan küçük seçilir. Bu rehberin etkinliği onluk doğal sayılarla sınırlıdır. Onluk sistemde türetilen 9 ve 99 fark bağıntıları başka tabana aynen taşınmaz; o tabanın ağırlıklarıyla yeniden açılır.",
        ],
      },
      {
        title: "İşlemi geri kurarak son kontrol",
        paragraphs: [
          "Bir çözümün sonunda yalnız sonuç sayısını değil, işlemin kendisini doğrula. Ters yazımı yeniden oluştur; değiştirilen basamağı göster; kullanılan rakamların istenen sayıda geçtiğini say; toplamada eldeyi, numaralamada sınırdaki ilk ve son etiketi kontrol et. Böylece ara denkleme uyan ama kökün yazım koşulunu bozan adaylar elenir.",
          "Yeni bir soruya başlarken üç satır yaz: tanımlanan yazım, rakam koşulları, aranan nicelik. Ardından uygun modeli seç: ağırlık toplamı, sütun denklemi, ayrık durum sayımı veya basamak bloğu. Etkinlikteki sonuçlar matematiksel kontrol sağlar; gerekçenin bilimsel doğruluğunu otomatik ölçmez ve öğrenme puanı üretmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı rakam, farklı katkı",
        prompt:
          "60816 yazımındaki iki 6’yı karşılaştır. Her birinin katkısını ve bu katkıların toplamının neden rakam toplamı olmadığını açıkla.",
        strategy: "Aynı rakamı iki ayrı konum ağırlığıyla çarp.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Soldaki 6 on binler konumunda olduğundan 6×10000=60000, sağdaki 6 birler konumunda olduğundan 6×1=6 katkı verir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu iki katkının toplamı 60006’dır. Sayının tamamında ayrıca 8×100=800 ve 1×10=10 bulunduğu için 60816 elde edilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Rakam toplamı ise 6+0+8+1+6=21’dir; konum ağırlıkları bu toplamda kullanılmaz. Aynı rakamın sayı değerleri eşit, basamak değerleri farklıdır.",
          },
        ],
        answer: "Katkılar 60000 ve 6; katkı toplamı 60006, rakam toplamı 21.",
        check: "60000+0+800+10+6=60816; iki 6’nın ağırlık oranı 10000’dir.",
        pitfall:
          "İki tane 6 görünmesini iki basamak veya toplam değer 12 sanma.",
      },
      {
        title: "İçteki sıfırın kaydırdığı blok",
        prompt:
          "50308’in soldan ikinci rakamı olan 0 silinince 5308 oluşuyor. Sayısal azalmanın hangi katkıdan geldiğini iki çözümlemeyle açıkla.",
        strategy: "Silinen sıfırın solundaki 5’in konum değişimini izle.",
        steps: [
          {
            label: "1. adım",
            explanation: "50308=50000+300+8; 5308=5000+300+8 olarak açılır.",
          },
          {
            label: "2. adım",
            explanation:
              "Sağdaki 308 bloğu değişmedi. Soldaki 5, on binler konumundan binler konumuna geçti.",
          },
          {
            label: "3. adım",
            explanation:
              "Azalma 50000−5000=45000’dir. Silinen sıfırın kendi katkısı sıfır olsa da konum kayması sıfır değildir.",
          },
        ],
        answer: "45000 azalma; değişen katkı 5’in ağırlığıdır.",
        check:
          "50308−5308=45000 ve 5308’e 45000 eklenince ilk yazım geri gelir.",
        pitfall: "Sıfır silindiği için değerin hiç değişmeyeceğini söyleme.",
      },
      {
        title: "Sağ blokta ön sıfır",
        prompt:
          "Bir arşiv etiketi, üç haneli 742 bloğunun ardına tam üç haneli 056 bloğu yazılarak kuruluyor. Birleşik etiketin sayısal değerini ve blok genişliğinin rolünü açıkla.",
        strategy: "Sağ blok değeri ile yazım genişliğini ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sağdaki 056 bloğunun sayısal değeri 56, ayrılan konum sayısı 3’tür.",
          },
          {
            label: "2. adım",
            explanation:
              "Sol 742 üç konum kayar: 742×1000=742000 olur. Sağ blok eklenince 742056 bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "100×742+56=74256 hesabı sağ blok için yalnız iki konum ayırır; verilen altı haneli etiketi üretmez.",
          },
        ],
        answer: "742056; sol çarpan 1000’dir.",
        check: "742056=742000+56 ve 056 bloğu etiketin son üç karakteridir.",
        pitfall:
          "056’yı 56 olarak hesaplamak, blok genişliğini de ikiye düşürmeyi gerektirmez.",
      },
      {
        title: "Dört hanede ters yazımın iptali",
        prompt:
          "[abba]=1000 a+100 b+10 b+a yazımını ters çevir. Ardından yalnız ortadaki iki rakamın yerini değiştirmenin değer üzerindeki etkisini açıkla.",
        strategy: "Ters yazımdan sonra bütün konumları karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Ters sıra yine a,b,b,a’dır; sayı 1001 a+110 b olarak aynı kalır.",
          },
          {
            label: "2. adım",
            explanation:
              "Ortadaki iki rakam zaten b ve b olduğundan bu iki konumu değiştirmek de 0 fark üretir.",
          },
          {
            label: "3. adım",
            explanation:
              "Örneğin a=4,b=7 için 4774 tersinde de 4774’tür. Bu sonuç bütün dört basamaklıların değil, verilen simetrik yazımın özelliğidir.",
          },
        ],
        answer: "Her iki dönüşümde fark 0; [abba] aynı kalır.",
        check:
          "a≠0 koşuluyla ilk yazım dört basamaklıdır; b=0 olduğunda 4004 örneği de aynı kuralı sağlar.",
        pitfall:
          "Üç basamaklı ters farkındaki orta rakam iptalini bütün rakamların etkisizliği gibi genelleme.",
      },
      {
        title: "Sıfırlardan onluk boz",
        prompt:
          "903−478 işlemini basamak bozma yoluyla hesapla; her bozmanın toplam değeri koruduğunu göster.",
        strategy: "Yüzlüğü onluğa, bir onluğu da birliğe dönüştür.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "903’ü 9 yüzlük,0 onluk,3 birlik olarak yaz. Bir yüzlük bozulunca 8 yüzlük,10 onluk,3 birlik olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Bir onluğu birliğe aktar: 8 yüzlük,9 onluk,13 birlik elde edilir. Değer 800+90+13=903’tür.",
          },
          {
            label: "3. adım",
            explanation:
              "13−8=5 birlik,9−7=2 onluk,8−4=4 yüzlük kalır: sonuç 425’tir.",
          },
        ],
        answer: "425.",
        check: "478+425=903; bozma sırasında 903’ün değeri değişmemiştir.",
        pitfall: "Üstüne 10 eklerken soldaki onluğu azaltmayı unutma.",
      },
      {
        title: "İki etiketleme düzenini karşılaştır",
        prompt:
          "12’den 125’e kadar aynı nesneler iki uç dahil etiketlenecek. A düzeni doğal sayı yazımı, B düzeni her etiketi 012 gibi üç haneli sıfır dolgulu yazım kullanıyor. B kaç fazla rakam yazar?",
        strategy:
          "Etiket adedini ortak tut, yalnız yazım maliyetini karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "125−12+1=114 etiket vardır. B düzeni her etikette 3 karakter kullandığı için 114×3=342 rakam yazar.",
          },
          {
            label: "2. adım",
            explanation:
              "A düzeninde 12–99 arasında 88 iki haneli etiket 176,100–125 arasında 26 üç haneli etiket 78 rakam kullanır: toplam 254.",
          },
          {
            label: "3. adım",
            explanation:
              "Fark 342−254=88’dir; her iki haneli etikete eklenen bir ön sıfır 88 kez yazılmıştır.",
          },
        ],
        answer: "B,88 fazla rakam kullanır.",
        check:
          "A’daki 88+26=114 etiket, B ile aynı adettir; fark yalnız ön sıfırlardır.",
        pitfall:
          "Üç haneli kodu üç basamaklı doğal sayıyla aynı sayım nesnesi sanma.",
      },
    ],
    recall: [
      {
        prompt: "5007’de ortadaki iki sıfır silinirse neden aynı sayı kalmaz?",
        answer:
          "5’in ağırlığı 1000’den 10’a iner; yeni sayı 57’dir. Sıfır konumu korur.",
      },
      {
        prompt: "[aab] yazımı b’nin a’dan farklı olduğunu söyler mi?",
        answer:
          "Hayır; farklılık ayrıca belirtilmelidir. Aynı a harflerinin eşitliği ise zorunludur.",
      },
      {
        prompt: "Sağa iki rakamlık 03 bloğu eklemek hangi denklemi verir?",
        answer: "100 N+3; sağ bloğun genişliği 2 olduğu için çarpan 100’dür.",
      },
      {
        prompt: "Üç rakamın sütun toplamı 28 ise ne yazılır, ne taşınır?",
        answer: "8 yazılır,2 onluk taşınır:28=10×2+8.",
      },
      {
        prompt: "Bir sayının tersinde başa sıfır gelmesi neyi değiştirir?",
        answer:
          "Yazılı karakter sayısı korunabilir; sayısal doğal yazımda baş sıfır atılır ve basamak adedi azalabilir.",
      },
      {
        prompt:
          "Numaralamayı tersine çözerken kalan rakam maliyeti neyi sağlamalı?",
        answer:
          "İçinde kalınan bloğun kapasitesini aşmamalı ve tam etiket için o bloğun basamak sayısına bölünebilmelidir.",
      },
    ],
    source:
      "MEBİ TYT Matematik Sayı Basamakları ve Aurelia ilgili kopya kâğıdının okunan bölümleriyle karşılaştırılmış özgün anlatım. Elde modeli Sayı Basamakları 1.1 fiziksel s. 3 ve 13 ile eşleşir. Yeni örnekler ve alıştırmalar resmî sınav sorusu değildir.",
  },
  {
    id: "bolme-bolunebilme",
    minutes: 95,
    objectives: [
      "Bölme eşitliğini bölümün tam sayılığı ve kalan aralığıyla birlikte kurmak.",
      "Onluk konum ağırlıklarından son blok, rakam toplamı ve 11 kurallarını türetmek.",
      "Kalan işlemlerinde ortak bölen, işaret, rakam ve aralık koşullarını koruyarak adayları sınamak.",
    ],
    sections: [
      {
        title: "Eşitlik tek başına bölme işlemi değildir",
        paragraphs: [
          "A bölünen, b pozitif tam sayı bölen, q tam sayı bölüm, r kalan olsun. Bölme A=bq+r ve 0≤r<b koşullarının birlikte sağlanmasıdır. Örneğin 38=7×5+3 geçerlidir.38=7×4+10 da doğru bir eşitliktir ama 10 içinde bir tam 7’lik grup daha bulunduğundan bitmiş bölme değildir. Bölüm yalnız ondalık sonucu yuvarlamak anlamına gelmez.",
          "Tam bölünme r=0 demektir.0 her pozitif tam sayıya tam bölünür; sıfıra bölme tanımsızdır. Bu rehber negatif bölünende de negatif olmayan kalan kullanır:−17=6×(−3)+1. Bölüm−3’tür, kalan 1. Nesne gruplaması doğal sayılar için uygundur; negatif sayıda aynı eşitliği sayı doğrusu üzerindeki ardışık katlarla yorumla.",
        ],
      },
      {
        title: "Son basamak kuralları onluk yapıdan gelir",
        paragraphs: [
          "N=10 q+d yazıldığında 10 q,2’ye ve 5’e tam bölünür. Bu nedenle 2 ve 5 ile bölümün kalanı son rakam d ile belirlenir. Son rakam çiftse 2’ye;0 veya 5 ise 5’e tam bölünür.10’a tam bölünmek için son rakam 0 olmalıdır. Bunlar sayının bütün rakamlarını değil, tam kat olan kısmı çıkardıktan sonra kalan parçayı kullanır.",
          "4 için N=100 q+s biçiminde son iki,8 için N=1000 q+t biçiminde son üç basamak ayrılır.100,4’ün;1000,8’in katıdır. Son blok 00 veya 000 ise sayısal değeri 0’dır ve ilgili bölenlere tam bölünür. Bir sayının başına sıfır eklemekle son bloğun sıfır içermesi aynı koşul değildir.",
        ],
      },
      {
        title: "Rakam toplamı ve dönüşümlü toplam",
        paragraphs: [
          "3 ve 9’a göre 10’un her kuvveti 1 ile aynı kalanı taşır. Bu yüzden N ile rakamları toplamı aynı kalanı verir.3’e bölünen bir sayı mutlaka 9’a bölünmez; örneğin 15’in rakam toplamı 6’dır. Toplam büyükse onu da ilgili bölenle yeniden küçült; ham rakam toplamı son kalan olmak zorunda değildir.",
          "11’e göre 10,−1 ile aynı kalan sınıfındadır. Sağdan birler için+, onlar için−, yüzler için+ işaretleriyle topla. Sonuç 11’in herhangi bir tam katıysa tam bölünür; yalnız 0 olması gerekmez. Kalan isteniyorsa işareti koru, sonra 0–10 aralığına indir. Soldan başlamak çift haneli yazımlarda işareti tersine çevirebilir.",
        ],
      },
      {
        title: "Ayrı şartlar çarpılır mı?",
        paragraphs: [
          "Aralarında asal a ve b’ye tam bölünen sayı ab’ye de tam bölünür. Çünkü iki koşul birbirinde olmayan asal kuvvetleri ister.3 ve 4’ün birlikte sağlanması 12’ye yeter;2 ve 4 ise 8’e yetmez.4 koşulu 2’yi zaten içerir. Karşı örnek olarak 20,2’ye ve 4’e bölünür ama 8’e bölünmez.",
          "Genel ortak şart EKOK(a,b)’dir.6 için 2 ve 3;12 için 3 ve 4;18 için 2 ve 9;24 için 3 ve 8 birlikte sınanır.25 için 100’ün kat kısmı çıkarıldığından son iki blok 00,25,50 veya 75 olmalıdır. Bir bileşik bölenin yalnız bazı çarpanlarını denetlemek yeterli sayılmaz; gereken bütün asal kuvvetleri karşıla.",
        ],
      },
      {
        title: "Kalanlarla işlem yap, yeniden küçült",
        paragraphs: [
          "Aynı b böleninde A=bq+r ve C=bs+t yaz. Toplam A+C, b’nin bir katı+r+t; çarpım AC, b’nin bir katı+rt olur. Bu nedenle büyük sayılar yerine küçük kalanları kullanabilirsin. Ancak r+t veya rt yeniden b’ye bölünüp 0–b−1 aralığına indirilmelidir. Çıkarmada negatif ara sonuç da aynı biçimde düzeltilir.",
          "Üslü ifadede her çarpım sonrası kalanı küçültmek sayıyı yönetilebilir tutar. Döngü uzunluğunu ilk kuvvetlerden gerçekten bul; her bölen için 4 dönem varsayma. Kalan eşitliklerinde normal kesir gibi her sayıyı sadeleştiremezsin.2 x’in 6’ya kalanı 2 ise x=1 de x=4 de uygundur; bölmenin hangi bilgi kaybını yarattığını kontrol et.",
        ],
      },
      {
        title: "Rakam ve kalan sorularında iki filtre kullan",
        paragraphs: [
          "Önce yazım koşullarını uygula: ilk rakam sıfır olamaz, diğerleri 0–9’dur; farklılık ancak verildiyse zorunludur. Ardından her bölünebilme koşulunu ayrı uygula. Bir koşulu sağlayan adayların listesini oluşturup ikinciyle kesiştirmek, baştan iki denklemi karıştırmaktan daha izlenebilir olabilir.",
          "Son rakama bağlı dar bir şart varsa ondan başla;5’e bölünmede iki son rakam adayı vardır. Rakam toplamı şartı başka rakamları daraltabilir. Adayı bulunca gerçek sayıyı oluşturup her bölen için kalanı yeniden hesapla. Etkinliğin ? işaretleri bağımsız boşluklardır; aynı harf gibi eşit olmak zorunda değildir.",
        ],
      },
      {
        title: "Bölümün tekliği ve kalan aralığı",
        paragraphs: [
          "Sabit A ve b için 0≤r<b koşulu tek bir tam bölüm ve kalan seçer. İki ayrı yazım A=bq+r=bq′+r′ olsaydı b(q−q′)=r′−r olurdu. Sağ tarafın mutlak değeri b’den küçüktür; bu aralıktaki tek b katı 0 olduğundan q=q′ ve r=r′ çıkar. Eşitlik aralıkla birlikte bölmeyi tekleştirir.",
          "Etkinliğin sayı doğrusunda q·b≤A<(q+1)·b aralığını görürsün. Bölüm, A’nın hemen solundaki b katının katsayısı; kalan, o kat ile A arasındaki uzaklıktır. Negatif A’da da aynı yön kullanılır. A tam bir kata denk gelince uzaklık 0’dır; onu önceki aralığın kalan b değeriyle gösterme.",
        ],
      },
      {
        title: "Bilinmeyen bölen ve bölüm sınırı",
        paragraphs: [
          "Bölünen, bölüm ve kalan verildiğinde A=bq+r denklemini kurup b’yi bulabilirsin; q=0 ise bölme işlemi farklı biçimde yorumlanır ve bu formülle q’ya bölme yapılamaz. Bulunan b pozitif tam sayı olmalı ve r<b sağlamalıdır. Doğru denklemden çıkan her cebirsel sonuç geçerli bölme değildir.",
          "Bölen b ve bölüm q biliniyorsa bölünen bq,bq+1,…,bq+b−1 olabilir. Bu aralıkta b tane tam sayı vardır. Üst sınır b(q+1) değildir; o sayıda bölüm bir artar. “En büyük kalan” dendiğinde b−1 kullanılır; r’nin negatif olmasına izin verilmez.",
        ],
      },
      {
        title: "Negatif sayıda kalan ve program işareti",
        paragraphs: [
          "Pozitif bölenle Öklid bölmesinde bölüm A/b’nin aşağı yuvarlanmış tam sayısıdır. Örneğin−22/5=−4,4 olduğundan q=−5; r=−22−5×(−5)=3 olur. Sıfıra doğru kesmek q=−4 ve r=−2 verir; bu, burada seçilen kalan aralığına uymaz. Hangi sözleşmenin kullanıldığını belirt.",
          "Bazı programlama dillerinde % işleci negatif bir artık döndürebilir; onu doğrudan matematiksel son kalan diye kullanma. Pozitif b için ((A%b)+b)%b ifadesi negatif olmayan sınıfa döndürür. Etkinlikte bu fark, yalnız yazılan bir sonuç değil, sayının iki komşu kat arasındaki gerçek konumuyla gösterilir.",
        ],
      },
      {
        title: "Son blok kuralının sınırı",
        paragraphs: [
          "Son k basamağın tek başına aynı kalanı vermesi için 10^k’nin bölenin katı olması gerekir.4 için k=2,8 için k=3,25 için k=2 bu şartı sağlar. Örneğin yalnız son rakama bakarak 4’e karar vermek,10’un 4’e tam bölünmemesi nedeniyle genel olarak geçerli değildir.",
          "“Son iki basamak iki basamaklı sayı” ifadesinde 07 bloğunun değeri 7’dir; blok genişliği 2 kalır. Bölünebilmede tam bölünen ön bloğu atmak sayıyı değiştirse de ilgili kalanı değiştirmez. Kalanın korunması ile sayısal değerin korunmasını ayır; yöntem bütün sayıyı son blokla eşit saymaz.",
        ],
      },
      {
        title: "3 ve 9 için kalan neden korunur?",
        paragraphs: [
          "100 a+10 b+c−(a+b+c)=99 a+9 b olur. Bu fark 9’un, dolayısıyla 3’ün katıdır. Bu cebir, rakam toplamının hem tam bölünme hem de kalan bulma amacıyla kullanılmasını gerekçelendirir. Daha çok basamakta 10^j−1 sayıları da 9’a bölündüğü için aynı düşünce sürer.",
          "Rakam toplamını tek haneye kadar indirmek bazı sorularda yardımcıdır ama son kalanla karıştırılmamalıdır. Toplam 9 ise 9’a kalan 0’dır; tek haneli 9’u kalan diye bırakma.0 sayısının bütün rakam toplamı 0’dır ve bu kurallarla tutarlıdır. Her adımda hedef böleni aynı tut.",
        ],
      },
      {
        title: "11 için işaretli ağırlık tablosu",
        paragraphs: [
          "Sağdan ağırlıklar 1,−1,1,−1,… seçilir. Böylece dört haneli [abcd] için d−c+b−a kullanılır. Başlangıç soldan yapılıp a−b+c−d bulunursa bunun negatifi elde edilir; tam bölünmede ikisi birlikte 0 sınıfındadır, ama sıfırdan farklı kalanları genellikle aynı değildir.",
          "Dönüşümlü toplam−13 ise 11’e göre kalan 9’dur:−13=11×(−2)+9. Toplam 22 ise kalan 0’dır. Etkinlikte her rakamın işaretli ağırlığı ve katkısı ayrı HTML satırlarında, toplamın kalana indirgenmesi sonuçta görünür. İşaretleri keyfî mutlak değere çevirmek kalan bilgisini kaybettirebilir.",
        ],
      },
      {
        title: "7 testi ile aynı kalanı ayır",
        paragraphs: [
          "N=10 q+d için M=q−2 d düşün.2 N=20 q+2 d,21 q−2 N=q−2 d=M olduğundan N’nin 7’ye bölünmesi M’nin 7’ye bölünmesine denktir. Bu yöntem 7’ye tam bölünmeyi sınar; N ile M’nin 7’ye kalanının eşit olduğunu söylemez. Katsayı tersliği nedeniyle kalan başka bir sınıfa gidebilir.",
          "Kalan isteniyorsa uzun bölme veya 10’un kuvvetlerinin 7’ye kalanlarıyla ağırlık tablosu güvenlidir. Bir kısa testin “tam bölünür/bölünmez” kararı vermesi, her aritmetik bilgiyi koruduğunu göstermez. Yeni bir kuralı kullanırken hangi niceliğin korunduğunu bir eşitlikle açıkla.",
        ],
      },
      {
        title: "Kalan toplamı, çarpımı ve çıkarma",
        paragraphs: [
          "A ve B aynı bölen m ile inceleniyorsa kalanları r ve s üzerinden A²+AB−B gibi bir ifade r²+rs−s ile aynı sınıfa iner. İşlem önceliğini koru; önce üs ve çarpım, sonra toplama/çıkarma yapılır. Ara değer negatif veya m’den büyükse son adımda yeniden normalleştir.",
          "Farklı bölenlere ait kalanları tek bir modda doğrudan karıştırma. “A’nın 5’e kalanı 2, B’nin 7’ye kalanı 3” bilgisi A+B’nin 7’ye kalanını tek başına belirlemez. Koşulları ayrı denklemler olarak yaz; yeterli bilgi yoksa tek sayısal cevap üretme. Bir karşı örnek, eksik bilginin sonucu nasıl değiştirdiğini gösterebilir.",
        ],
      },
      {
        title: "Kuvvetlerde döngü ve başlangıç",
        paragraphs: [
          "Taban kalanı r olsun; r,r²,r³,… değerlerini her çarpım sonrası aynı bölenle küçült.1’e dönüş varsa buradan bir dönem kurulabilir. r bölenle ortak çarpan taşıdığında 0’a yerleşme veya farklı bir başlangıç kuyruğu oluşabilir; bütün diziler ilk terimden aynı kalıpla dönmez.",
          "Üs dönem uzunluğuna tam bölünüyorsa dönemin son terimi seçilir; sıfırıncı terimle rastgele değiştirilmez. Örneğin dönem 4 ise üs 4 k olan kuvvet dönemin 4. konumundadır.0’ın sıfırıncı kuvveti gibi ayrı tanım sorunlarını, verilen pozitif üslerin doğal tekrar çarpımı modeline taşımadan sınırla.",
        ],
      },
      {
        title: "Kalan eşitliğini ne zaman bölebilirsin?",
        paragraphs: [
          "kx≡ky(mod m) ifadesi m’nin k(x−y)’yi böldüğünü anlatır. k ile m aralarında asal ise x≡y(mod m) sonucu çıkar. Aralarında asal değillerse aynı m ile sadeleştirme yeni çözümleri kaybettirebilir. Örneğin 3 x’in 9’a kalanı 3 iken x=1,4,7 aynı koşulu sağlar.",
          "Başlangıç düzeyinde güvenli yol x’in 0–m−1 adaylarını sınamaktır. Bu adaylar bütün kalan sınıflarını kapsar. Denklemden çıkan adayın yalnız ilk kalana değil, asıl ifadeye de uyduğunu kontrol et. Kesirle bölme, tam sayı bölme ve modüler sadeleştirme farklı işlemlerdir; aynı işaret görünümü koşulları birleştirmez.",
        ],
      },
      {
        title: "İki kalan koşulu ve çözüm aralığı",
        paragraphs: [
          "N≡r(mod a), N≡s(mod b) koşulları ayrı ayrı N=ak+r ve N=bℓ+s demektir. Aynı kalan varsa N−r ortak kattır. Farklı kalanlarda tek bir r çıkarıp iki koşulu birden elde edemezsin. Küçük adaylarda bir diziyi üretip diğerinin kalanı ile filtrelemek güvenlidir.",
          "Bir aday bulunduğunda EKOK(a,b) kadar eklemek her iki kalanı da korur. Ancak önce adayın varlığını ve ilk uygun değeri denetle. EBOB(a,b), s−r farkını bölmüyorsa hiç çözüm yoktur. Aralık uçlarının dahil olup olmadığı, bulunan dizide kaç aday sayılacağını belirler; negatif veya sıfır bölüm iznini kökten oku.",
        ],
      },
      {
        title: "Sıralı döngü ve son kontrol",
        paragraphs: [
          "Renk, görev veya gün dizisi 1’den sayılıyorsa kalanı 0 olan sıra tam grubun son elemanına karşılık gelir.0’dan sayılan dizide ise eşleme değişir. Takvimde “12. kez” ilk olay zaten sayılmışsa 11 aralık geçmiştir; olay sayısı ile zaman aralığı adedini ayır. Başlangıç anını açık yazmak belirsizliği giderir.",
          "Her cevapta A=bq+r eşitliğini ve kalan aralığını geri kontrol et. Bölünebilme sorusunda gerçek sayıyı her bölenle sınamak, rakam sorusunda bütün adayları tüketmek, kuvvette dönemi ve üssün sırasını doğrulamak ayrı kontrollerdir. Etkinlik ve özgün alıştırmalar bu kontrolü öğretir; öğrenme veya tamamlanma kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Doğru eşitlik, farklı kalan sözleşmesi",
        prompt:
          "−23 sayısı 6’ya bölünüyor. İki aday−23=6×(−3)−5 ve−23=6×(−4)+1 veriliyor. Bu rehberin kalan tanımına hangisi uyar, neden?",
        strategy: "Önce eşitliği, sonra 0≤r<6 şartını ayrı sına.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki eşitlik de aritmetik olarak doğrudur:−18−5=−23 ve−24+1=−23.",
          },
          {
            label: "2. adım",
            explanation:
              "İlk adayın kalanı−5 negatiftir; seçilen Öklid kalan aralığında değildir. İkinci adayda 0≤1<6 sağlanır.",
          },
          {
            label: "3. adım",
            explanation:
              "Sayı doğrusunda−24≤−23<−18 görülür. Dolayısıyla bölüm−4, soldaki kattan uzaklık 1’dir.",
          },
        ],
        answer: "İkinci aday; q=−4,r=1.",
        check:
          "6×(−4)+1=−23. Sıfıra doğru kesilen bölüm ile aşağı yuvarlanan bölüm aynı değildir.",
        pitfall: "Eşitlik doğru diye kalan aralığını denetlemeden kabul etme.",
      },
      {
        title: "Son üç hanenin neden yettiği",
        prompt:
          "6152’nin 8’e bölünmesini, yalnız son üç hane ile bütün sayıyı bölmenin ilişkisini açıklayarak denetle.",
        strategy: "1000’lik kısmı ve kalan bloğu ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "6152=6×1000+152 yaz.1000=8×125 olduğundan ilk terim 8’in tam katıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "152=8×19 olduğundan ikinci blok da tam bölünür; toplam 8×(750+19)=8×769 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu yöntem 6152=152 demek değildir; aralarındaki 6000 farkının 8’in katı olduğunu kullanır.",
          },
        ],
        answer: "6152,8’e tam bölünür; bölüm 769, kalan 0.",
        check:
          "8×769=6152; son iki hane 52 tek başına 8 kuralı için yeterli değildir.",
        pitfall:
          "Tam kat olan kısmın atılmasını sayıların eşitliğiyle karıştırma.",
      },
      {
        title: "11’de negatif ara toplam",
        prompt:
          "4025’in 11 ile bölümünden kalanı sağdan dönüşümlü toplamla bul. Soldan başlanınca çıkan 1’in neden son kalan olmadığını açıkla.",
        strategy: "Birler konumunu+ ile başlat ve negatif sonucu normalleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sağdan 5−2+0−4=−1 bulunur.−1=11×(−1)+10 olduğundan kalan 10’dur.",
          },
          {
            label: "2. adım",
            explanation:
              "Soldan 4−0+2−5=1, önceki toplamın negatifidir. Her iki sayı 11’in katı olmadığından tam bölünme kararı aynıdır ama kalanları farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bütün sayıda 4025=11×365+10 eşitliği doğru kalanı doğrular.",
          },
        ],
        answer:
          "Kalan 10; soldan bulunan 1 işaret nedeniyle doğru kalana eşit değildir.",
        check: "0≤10<11 ve 11×365+10=4025.",
        pitfall:
          "11 testi yalnız sıfır olan bir toplam aramaz; kalan için işaret yönünü koru.",
      },
      {
        title: "Birleşik koşulda fazla çarpanı bul",
        prompt:
          "Bir çözüm,4’e ve 6’ya bölünen her sayının 24’e bölündüğünü ileri sürüyor. İddiayı bir karşı örnekle çürüt ve doğru ortak şartı asal kuvvetlerle kur.",
        strategy: "İki koşulun istediği 2 kuvvetini iki kez sayma.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "4=2² ve 6=2×3’tür. Bir ortak katın gereksinimi 2²×3=12’dir;4×6=24, gereksiz bir 2 daha ister.",
          },
          {
            label: "2. adım",
            explanation:
              "12 hem 4’e hem 6’ya bölünür, ama 24’e bölünmez. Bu tek örnek evrensel iddiayı çürütür.",
          },
          {
            label: "3. adım",
            explanation:
              "Doğru ifade, bu iki koşulun 12’ye bölünmeyi gerektirmesidir. Daha büyük ortak katlar da 12’nin katlarıdır.",
          },
        ],
        answer: "Garanti edilen ortak şart 12’dir;24 iddiası yanlıştır.",
        check: "12=4×3=6×2;24 ile bölmede kalan 12’dir.",
        pitfall:
          "Ortak kat bulmak ile en küçük gerekli ortak katı bulmayı eşitleme.",
      },
      {
        title: "İki bağımsız boşluğu tasarla",
        prompt:
          "34?? dört haneli etiketinde iki ? bağımsız rakamdır. Etiket hem 5’e hem 11’e tam bölünsün. Bütün etiketleri bulup daha fazla aday kalmadığını göster.",
        strategy:
          "Önce 5’in son rakam sınırını, sonra 11’in denkliğini kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Son rakam d=0 veya 5’tir; onlar rakamına c de. Sağdan 11 toplamı d−c+4−3=d−c+1 olur.",
          },
          {
            label: "2. adım",
            explanation:
              "d=0 iken 1−c,−8 ile 1 arasındadır;11’in tek olası katı 0, dolayısıyla c=1 olur ve 3410 bulunur. d=5 iken 6−c,−3 ile 6 arasındadır; yine c=6, yani 3465 bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "İki d değeri ve her birinde tek c bütün olasılıkları tüketir.3410=55×62,3465=55×63 olduğundan iki koşul da sağlanır.",
          },
        ],
        answer: "3410 ve 3465.",
        check: "Son rakamlar 0/5; sağdan 11 toplamları iki sayıda da 0’dır.",
        pitfall: "İki ? işaretini aynı harf gibi eşit rakama zorlama.",
      },
      {
        title: "Hafta döngüsünde olay ve aralık",
        prompt:
          "Bir bakım ilk kez perşembe yapılıyor ve her 6 günde tekrarlanıyor.5. bakımın gününü bul; ilk bakımın neden bir zaman aralığı sayılmadığını açıkla.",
        strategy: "5 olay arasında 4 bekleme aralığı olduğunu çiz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bakımların geçen süreleri 0,6,12,18,24 gündür.5. olay için 24 gün geçer.",
          },
          {
            label: "2. adım",
            explanation:
              "24’ün 7’ye kalanı 3’tür; perşembeden 3 gün sonrası pazar olur.",
          },
          {
            label: "3. adım",
            explanation:
              "5×6=30 kullanmak 6. bakımın geçen süresini verir. İlk olay başlangıçta zaten gerçekleşmiştir.",
          },
        ],
        answer: "5. bakım pazar günüdür.",
        check:
          "Günleri sırala: perşembe,çarşamba,salı,pazartesi,pazar; her adım 6 gün ilerler.",
        pitfall: "Olay sıra numarası ile geçen aralık sayısını eşitleme.",
      },
    ],
    recall: [
      {
        prompt: "A=bq+r eşitliğinden sonra hangi iki koşulu kontrol edersin?",
        answer:
          "b pozitif tam sayı, q tam sayı olmalı; kalan 0≤r<b aralığında bulunmalıdır.",
      },
      {
        prompt: "Bir sayının son iki hanesi 00 ise 4’e bölünür mü?",
        answer:
          "Evet;00 bloğunun değeri 0’dır ve 100’lük ön kısım da 4’e bölünür.",
      },
      {
        prompt: "11 için dönüşümlü toplam−22 çıktı; son kalan nedir?",
        answer:
          "0;−22,11’in tam katıdır. Ara toplamın negatif olması tam bölünmeyi engellemez.",
      },
      {
        prompt: "2 ve 6’ya tam bölünmek 12’ye yeter mi?",
        answer: "Hayır;6 karşı örnektir. Ortak şart EKOK(2,6)=6’dır.",
      },
      {
        prompt: "2 x≡2(mod 6) koşulundan neden yalnız x≡1 sonucu çıkmaz?",
        answer:
          "x=4 de koşulu sağlar;2 ile 6 aralarında asal olmadığı için aynı modla sadeleştirme çözümleri kaybettirir.",
      },
      {
        prompt: "İki farklı bölenin kalanlarını doğrudan toplar mısın?",
        answer:
          "Hayır; kalan hesabı aynı bölen içinde yapılır. Ayrı bölenlerin koşulları ayrı denklemlerdir.",
      },
    ],
    source:
      "MEBİ TYT Matematik Bölünebilme Kuralları 1–2, OGM 9 Kalanlı Bölme/Bölünebilme özetleri ve Aurelia ilgili notunun okunan bölümleriyle karşılaştırılan özgün anlatım. Yeni örnekler ve sorular resmî sınav sorusu değildir.",
  },
  {
    id: "ebob-ekok",
    minutes: 100,
    objectives: [
      "Ortak bölen ve ortak katı tanımdan ayırıp asal üsler ve Öklid algoritmasıyla hesaplamak.",
      "Kesme, kaplama, periyot ve kalan modellerinde birimleri, başlangıcı ve uçları açıkça kurmak.",
      "EBOB/EKOK birlikte verilen iki sayının uygun çiftlerini aralarında asal koşulunu koruyarak tüketmek.",
    ],
    sections: [
      {
        title: "İki sorunun yönü farklıdır",
        paragraphs: [
          "Pozitif tam sayı a için d bir pozitif bölen ise a=d·k ve k pozitif tam sayıdır. Ortak bölen, verilen sayıların hepsine artıksız sığar; bunların en büyüğü EBOB’dur. Ortak pozitif kat ise her verilen sayının tam katıdır; en küçüğü EKOK’tur. Bölen aranırken verilenleri ortak birimlere ayırır, kat aranırken verilen tekrarları ortak bir toplamda buluşturursun.",
          "EBOB≤her başlangıç sayısı, EKOK≥her başlangıç sayısıdır. Bu karşılaştırma kontrol sağlar ama tek başına modeli seçmez. “En az” veya “en büyük” sözcüğünü görünce otomatik işlem seçme; bilinmeyenin verileri mi böldüğünü, onların katı mı olduğunu yaz. Bu rehber ve etkinliğin başlangıç girdileri pozitif tam sayılardır; sıfır için başka sözleşmeler kendiliğinden eklenmez.",
        ],
      },
      {
        title: "Küçük ve büyük üslerin gerekçesi",
        paragraphs: [
          "Her pozitif tam sayıyı asal çarpanlarına ayır. Bir ortak bölenin bir asalın kaç kopyasını taşıyabileceği, o asaldan en az bulunan sayı ile sınırlıdır; bu yüzden EBOB’da küçük üs seçilir. Bir sayıda asal bulunmuyorsa üssü 0’dır. Ortak olmayan asalın EBOB’a girememesi, bu 0 üssünün sonucudur.",
          "Ortak kat, her sayının bütün asal gereksinimlerini karşılamalıdır; EKOK’ta her asalın en büyük üssü seçilir. Örneğin 40=2³×5 ve 56=2³×7 için EBOB 8, EKOK 280’dir. Sonuçları yalnız çarpmayla değil,40/8,56/8,280/40 ve 280/56’nın tam sayı olmasıyla da sına. Ortak olma ile en büyük/en küçük olmayı birlikte gerekçelendir.",
        ],
      },
      {
        title: "İki sayı için çarpım bağı",
        paragraphs: [
          "a,b pozitif tam sayıysa a·b=EBOB(a,b)·EKOK(a,b) olur. Her asalın iki üssünün toplamı, küçük ve büyük üssün toplamına eşittir. Bu nedenle d=EBOB ise EKOK=(a/d)·b biçiminde hesaplanabilir. Sayılar aralarında asalsa d=1’dir ve EKOK=a·b olur; iki sayının da asal olması gerekmez.",
          "Biri diğerini bölüyorsa EBOB küçük sayı, EKOK büyük sayıdır. Sayıların yalnız farklı olması aralarında asal olduklarını göstermez. İki sayılı çarpım eşitliğini üç sayıya kopyalama:3,6,12 için çarpım 216, ortak EBOB×EKOK ise 3×12=36’dır. Çok sayıda da min/max üs yöntemi çalışır; iki sayılı özel özdeşlik ayrı kalır.",
        ],
      },
      {
        title: "Eş parça ile ortak buluşmayı ayır",
        paragraphs: [
          "İki uzunluk artıksız aynı boy parçalara kesilecekse parça boyu her uzunluğun bölenidir. En büyük parça EBOB olur; toplam adet her uzunluk/parça boyu sonuçlarının toplamıdır. Dikdörtgende kenarlara paralel eş karelerle kaplama ise iki yöndeki adetlerin çarpımını gerektirir. Aynı EBOB, bağlama göre farklı adet hesabında kullanılır.",
          "Aynı anda başlayıp sabit tam sayılı periyotlarla tekrarlayan olayların ilk pozitif ortak zamanı EKOK’tur.0 başlangıç olabilir, “yeniden” sözcüğü ilk pozitif zamanı ister. Başlangıçlar farklıysa yalnız periyotların EKOK’unu yazmak ilk ortak anı bulmaz. Her olay dizisinin ilk zamanı ve sonraki tam periyotları ayrı kurulmalıdır.",
        ],
      },
      {
        title: "Kalanlı koşulda farkı ortak kata dönüştür",
        paragraphs: [
          "N sayısı a ve b’ye bölündüğünde aynı r kalanını veriyorsa N−r ikisinin ortak katıdır. N=EKOK(a,b)·k+r yazılır. Kalan için 0≤r<a ve r<b şarttır. N’nin doğal veya pozitif olması, sorudaki alt/üst sınır ve tam bölümün sıfır olmasına izin verilip verilmediği ayrıca denetlenir.",
          "Bölümler için pozitiflik şartı yoksa k=0 ve N=r bazen geçerli olabilir. “En küçük” cevabını gerekçesiz biçimde EKOK+r seçme. Farklı kalanlar verilmişse her bölme eşitliğini ayrı yaz; N’den tek bir r çıkararak ikisini birden kat yapamazsın. Koşul farklı sayılar için aynı bilinmeyen böleni arıyorsa yöntem ortak kat değil, azaltılmış sayıların ortak bölenidir.",
        ],
      },
      {
        title: "Öklid yöntemi büyük hesabı küçültür",
        paragraphs: [
          "a=bq+r ise EBOB(a,b)=EBOB(b,r) olur. a ve b’nin her ortak böleni r=a−bq’yu; b ile r’nin her ortak böleni a=bq+r’yi böler. Yani yalnız en büyükleri değil, ortak bölen kümeleri aynıdır. Bölmelerin kalanları küçüldüğü için işlem sonunda 0 kalana ulaşılır; son sıfır olmayan kalan EBOB’dur.",
          "Örneğin 65=26×2+13 ve 26=13×2+0 olduğundan EBOB 13’tür. Son satırdaki 0 algoritmanın bitiş işaretidir; EBOB’u 0 yapmaz. Başlangıç sırası küçük/büyük olabilir; küçük önce gelirse ilk bölüm 0 çıkar ve sonraki çift sıralanır. Etkinlikte bütün bölme satırları ayrıca HTML’de listelenir.",
        ],
      },
      {
        title: "Bölen, kat ve asalın ön bilgisi",
        paragraphs: [
          "Asal sayı,1’den büyük ve pozitif bölenleri yalnız 1 ile kendisi olan tam sayıdır.1 asal değildir. Bir sayıyı asal çarpanlara ayırmak, aynı asalları üslerle saymayı sağlar: örneğin 108=2²×3³. EBOB/EKOK yöntemindeki üsler, kaç asal çarpan kopyasına izin verildiğini anlatır.",
          "Pozitif bir sayının bölenleri sonludur; pozitif katları sınırsızdır.1 her pozitif sayının böleni, her sayı da kendisinin bölenidir. İki sayı için “aralarında asal” demek ortak pozitif bölen kümesinin yalnız{1} olmasıdır. Örneğin 14 ve 25 bileşik olsalar da aralarında asaldır. Asal olma tek sayının, aralarında asal olma bir sayı çiftinin ilişkisidir.",
        ],
      },
      {
        title: "Ortak bölenleri EBOB üzerinden say",
        paragraphs: [
          "d=EBOB(a,b) ise a ile b’nin ortak pozitif bölenleri tam olarak d’nin pozitif bölenleridir. d=2^u·3^v gibi farklı asal kuvvetlere ayrılmışsa bir bölen 2^i·3^j biçiminde,0≤i≤u ve 0≤j≤v seçilerek kurulur. Bu nedenle pozitif bölen adedi(u+1)(v+1) olur.",
          "Üs 0 seçimi de bir seçenek olduğu için+1’ler bulunur. Negatif bölenler isteniyorsa her pozitif bölenin bir negatifi daha vardır; bu rehberde sayımlar açıkça pozitif bölenleri kullanır. EBOB 1 ise tek ortak pozitif bölen 1’dir. Ortak bölen sayısı, EBOB’un sayısal değeriyle veya iki sayının bütün bölen adetlerinin toplamıyla aynı değildir.",
        ],
      },
      {
        title: "EBOB’u dışarı çıkarınca kalan koşul",
        paragraphs: [
          "EBOB(a,b)=d ise a=d·x,b=d·y ve EBOB(x,y)=1 yazılır. Son şart zorunludur; x,y yeniden ortak çarpan taşısaydı a,b’nin EBOB’u d’den büyük olurdu. İki sayılı çarpım bağıyla EKOK=d·x·y elde edilir; dolayısıyla EKOK=m verilmişse x·y=m/d olur.",
          "d,m pozitif tam sayı iken d’nin m’yi bölmesi uygun çift için gereklidir; aynı zamanda yeterlidir, çünkü a=d,b=m çifti bu durumda çalışır. Uygun bütün sırasız çiftleri bulmak için x≤y çarpan çiftlerini yaz, aralarında asal olmayanları ele, sonra d ile büyüt. Etkinlikte elenen koşul gizlenmeden bütün uygun çiftler gösterilir.",
        ],
      },
      {
        title: "En küçük toplamda yakınlık yetmez",
        paragraphs: [
          "Sabit pozitif çarpımda birbirine yakın çarpanlar daha küçük toplam verir; fakat EBOB/EKOK sorusunda yakın çiftin aralarında asal olması da gerekir. Kareye çok yakın bir çift bu şartı bozabilir. Bu yüzden yalnız karekök çevresini yuvarlayarak iki sayı seçme; uygun çarpan çiftlerinin toplamlarını karşılaştır.",
          "Örneğin x·y=36 için 6,6 en yakın çifttir ama EBOB 6 olduğundan ölçeklenmiş sayılar istenen d EBOB’unu vermez.1,36 ve 4,9 uygun çiftlerdir. “En küçük” sonucun kanıtı, uygun çarpan çiftlerini tüketmek veya bütün alternatiflerin toplamına sınır koymaktır. Bir adayın koşulu sağlaması en küçük olduğunu tek başına kanıtlamaz.",
        ],
      },
      {
        title: "Üç ve daha fazla sayıda asal üsler",
        paragraphs: [
          "Birden çok sayıda her asal için bütün sayılardaki en küçük üs EBOB’a, en büyük üs EKOK’a gider. Bir asalı içermeyen herhangi bir sayı EBOB’daki o asalın üssünü 0’a indirir. Aynı asalın yalnız iki sayıda ortak olması, üçünün ortak bölenine girmesine yetmez.",
          "Hesap ikili de ilerleyebilir: EBOB(a,b,c)=EBOB(EBOB(a,b),c), EKOK için de aynı biçim geçerlidir. Buna karşılık a·b·c=EBOB·EKOK kuralı genel değildir. Bilinmeyen üçüncü sayı sorularında hem ortak bölen hem ortak kat şartını ayrı izle; yalnız eksik bir asal çarpanı eklemek her zaman yeterli olmaz.",
        ],
      },
      {
        title: "Eş kare, eş küp ve birim kontrolü",
        paragraphs: [
          "Dikdörtgenin a,b kenarları eş karelerle kenarlara paralel kaplanıyorsa kare kenarı s iki uzunluğu da bölmelidir. En az kare için s=EBOB(a,b); adet(a/s)(b/s)’dir. Prizmada eş küp kenarı üç uzunluğu böler; adet üç bölümün çarpımıdır. cm uzunluk, cm² alan, cm³ hacim birimleridir.",
          "Ayrı küçük küplerden her boy için aynı büyük küp kurulacaksa ortak büyük kenar bir kat problemidir. Bu, bir prizmayı keserek küçük küplere ayırmanın ters yönlü sorusudur. Dönmeye izin verilen karma kaplamalar, kesim kaybı veya derz aralığı aynı modele kendiliğinden eklenmez. Koşullar açık değilse alan oranı tek başına kenar uyumunu kanıtlamaz.",
        ],
      },
      {
        title: "Açık uç ve kapalı çevrede nokta",
        paragraphs: [
          "Uzunluğu L olan açık bir doğru parçasına iki uç dahil eş s aralıkla işaret koyarsan L/s aralık ve L/s+1 nokta bulunur. Kapalı çevrede son nokta başlangıçla aynıdır; çevre/s işaret vardır, bir daha+1 eklenmez. Köşelerin de işaret olması isteniyorsa s her kenar uzunluğunu bölmelidir.",
          "Kesim sayısı da parça adedi değildir. Tek bir şeritte k parça elde etmek için k−1 iç kesim gerekir; ayrı şeritlerde bu sayılar toplanır. Üst üste kesmeye izin verilmesi başka bir işlem modelidir. EBOB sana ortak uzunluk birimini verir; nokta, parça veya kesim adedi için geometrik bağlamı ayrıca kullan.",
        ],
      },
      {
        title: "Aynı başlangıçta tekrar ve olay sayısı",
        paragraphs: [
          "İki olay t=0’da birlikte gerçekleşip a,b aralıklarla tekrarlıyorsa ortak anlar 0,m,2 m,… biçimindedir; m=EKOK(a,b). İlk yeniden buluşma m’dir. Başlangıç dahil k. ortak olay(k−1)m sonra olur; başlangıç bir olay sayılmıyorsa ilk sonraki olay m’den başlar.",
          "[0,T] aralığında başlangıç ve son an dahildir; [0,T) son anı dışlar. T bir ortak ana eşitse bu fark olay sayısını 1 değiştirir. Saat gösteriminde 60 dakika bir saattir;09.70 gibi bir yazım kullanma. Etkinlikte son anın ve 0’ın dahil olup olmaması ayrı seçimlerle gösterilir.",
        ],
      },
      {
        title: "Farklı ilk zamanlarda iki dizi kur",
        paragraphs: [
          "A dizisinin anları α,α+a,α+2 a,…; B dizisinin anları β,β+b,β+2 b,… olsun. Ortak an α+ak=β+bℓ eşitliğini, k,ℓ≥0 tam sayılarıyla sağlamalıdır. EKOK yine ortak olaylar arasındaki olası tekrar aralığıdır; ilk ortak anın doğrudan EKOK olacağı anlamına gelmez.",
          "EBOB(a,b), β−α farkını bölmüyorsa iki faz hiç ortak an taşımaz. Bölüyorsa tam sayı sınıfları uyumludur; yine de ortak olay iki dizinin ilk zamanından önce olamaz ve seçilen kısa pencerede görünmeyebilir. Etkinlik, başlangıçlardan geriye olay uzatmadan gerçek listedeki kesişimi gösterir.",
        ],
      },
      {
        title: "Bir sayıdan aynı kalanı çıkar",
        paragraphs: [
          "N’nin a ve b’ye bölümlerinden r kalıyorsa N=m·k+r, m=EKOK(a,b) biçimindedir. Örneğin r her iki bölenin altında olmalıdır. “100’den büyük” gibi bir sınır varsa m·k+r>100 eşitsizliğini kullan; ilk adayın gerçekten sınırın üstünde kaldığını ve önceki adayın kalmadığını denetle.",
          "N=r değerinde bölüm 0 olabilir. Kök bölümleri pozitif istemiyorsa bu aday geçersiz sayılmaz. En küçük doğal sayı sorularında bu ayrım sonucu kökten değiştirebilir. Farklı r,s kalanı varsa N−r ortak kat denklemini kullanmadan önce iki eşitliği ayrı çöz; aynı kalan yöntemi için eşitlik şartı vardır.",
        ],
      },
      {
        title: "Bilinmeyen bölen için her artığı çıkar",
        paragraphs: [
          "A ve B sayıları aynı d pozitif tam sayısıyla bölünüp r ve s kalanlarını veriyorsa d, A−r ve B−s sayılarını böler. Bu yüzden d adayları EBOB(A−r,B−s)’nin pozitif bölenleridir. Ayrıca d>r ve d>s gerekir. En büyük ortak bölen bu sınırı sağlamıyorsa daha küçük bölenler de sağlayamaz; çözüm yoktur.",
          "Bu modelde bilinmeyen d bölen, önceki modelde bilinmeyen N ortak katla kurulan sayıydı. Sayıların metinde küçük veya büyük görünmesi bu yönü belirlemez. İki azaltılmış sayı da 0 olursa her yeterince büyük d uygun olabilir ve en büyük bölen bulunmayabilir; bu özel durumun koşullarını genel EBOB kısayoluna sessizce katma.",
        ],
      },
      {
        title: "Sonucu bütün koşullara geri koy",
        paragraphs: [
          "EBOB/EKOK hesabı bittikten sonra bölünebilme yönlerini kontrol et: d her girdiyi, m her girdinin katını sağlamalıdır. Uygun çift sorusunda gerçek EBOB’u yeniden hesapla; olay sorusunda iki zaman dizisini, kalan sorusunda her bölme eşitliğini ayrı yerine koy. En küçük/en büyük iddiası için alternatiflerin neden elendiğini açıkla.",
          "Etkinliğin üç görünümünü karşılaştır: ortak kare ve şeritler aynı EBOB’u farklı adetlerde kullanır; fazlı tekrar ilk anı başlangıçlara bağlar; çift tablosu aralarında asal koşulunu görünür tutar. Yazılı gerekçe kıyas için gereklidir; sistem bu metnin matematiksel doğruluğunu otomatik puanlamaz veya konuyu tamamlanmış saymaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı birim, iki farklı adet",
        prompt:
          "42 cm ve 70 cm iki şerit en uzun ortak boyda kesiliyor. Aynı ölçülerdeki 42×70 cm dikdörtgen de aynı kenarlı karelerle kaplanıyor. Parça adetlerini karşılaştır.",
        strategy: "Önce ortak boyu bul; şeritte toplam, alanda çarpım kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "42=2×3×7 ve 70=2×5×7 olduğundan EBOB 14 cm’dir. Şeritler 3 ve 5 parçaya ayrılır.",
          },
          {
            label: "2. adım",
            explanation:
              "Şeritlerde toplam 3+5=8 parça; dikdörtgende 3 satır ve 5 sütundan 3×5=15 kare vardır.",
          },
          {
            label: "3. adım",
            explanation:
              "Her iki durumda uzunluk birimi 14 cm’dir. Fakat birinde iki ayrı uzunluk, diğerinde iki boyutlu bölge sayılmaktadır.",
          },
        ],
        answer: "Şeritler 8 parça; dikdörtgen 15 kare.",
        check:
          "15×14²=2940 cm²=42×70; şeritlerin toplam uzunluğu 8×14=112 cm’dir.",
        pitfall:
          "Aynı EBOB bulundu diye bütün adet sorularında aynı işlemi kullanma.",
      },
      {
        title: "Çarpan tablosu ile Öklid’i birleştir",
        prompt:
          "91 ve 52 için EBOB ve EKOK’u iki yöntemle bul; Öklid’in son 0 kalanı ile ortak bölenin farkını açıkla.",
        strategy: "Kalanlarla küçült, sonra asal çarpanlarla denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "91=52×1+39,52=39×1+13,39=13×3+0; son sıfır olmayan kalan 13’tür.",
          },
          {
            label: "2. adım",
            explanation:
              "91=7×13,52=2²×13; küçük üslerle EBOB 13, büyüklerle EKOK 2²×7×13=364 bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "İkili çarpım bağı da(91/13)×52=7×52=364 verir. Son 0 kalan,13’ün 39’u tam böldüğünü gösterir.",
          },
        ],
        answer: "EBOB 13, EKOK 364.",
        check: "91/13=7,52/13=4;364/91=4,364/52=7 tam sayıdır.",
        pitfall: "Son kalan 0’ı EBOB diye yazma; son sıfır olmayan kalanı seç.",
      },
      {
        title: "Yakın çiftin geçersizliğini göster",
        prompt:
          "EBOB(a,b)=7 ve EKOK(a,b)=252 için bir çözüm a=b=42 öneriyor. Bu öneriyi sına, sonra mümkün en küçük toplamı bul.",
        strategy:
          "Ortak 7’yi çıkar ve x·y=36 çiftlerinde aralarında asal koşulunu koru.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "a=7 x,b=7 y ile xy=36 ve EBOB(x,y)=1 gerekir.42,42 önerisi x=y=6 verir ve şartı bozar; gerçek EBOB 42 olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Sırasız çarpan çiftleri 1,36;2,18;3,12;4,9;6,6’dır. Yalnız 1,36 ve 4,9 aralarında asaldır.",
          },
          {
            label: "3. adım",
            explanation:
              "Uygun toplamlar 7×37=259 ve 7×13=91’dir. Küçük toplam a,b=28,63 için 91 olur.",
          },
        ],
        answer: "En küçük toplam 91;42,42 çifti geçersiz.",
        check: "EBOB(28,63)=7 ve EKOK=(28/7)×63=252.",
        pitfall: "Çarpımları doğru olan her çifti, verilen EBOB’a uygun sanma.",
      },
      {
        title: "Faz kayması ile pencereyi ayır",
        prompt:
          "A ilk kez 0. dakikada ve her 6 dakikada; B ilk kez 4. dakikada ve her 10 dakikada olay üretiyor. İlk ortak anı ve[0,20] penceresinde ortak olay olup olmadığını karşılaştır.",
        strategy: "İki ilk zamandan ayrı diziler üret.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A:0,6,12,18,24,…; B:4,14,24,34,… olduğundan ilk ortak an 24’tür.",
          },
          {
            label: "2. adım",
            explanation:
              "EKOK(6,10)=30’dur; bu, sonraki ortak anlar arasındaki aralıktır, ilk ortak an değildir. Sonraki ortak an 54’tür.",
          },
          {
            label: "3. adım",
            explanation:
              "[0,20] içinde iki liste kesişmez. Fazlar uyumludur çünkü EBOB 2, başlangıç farkı 4’ü böler; uyumluluk kısa pencerede olay bulunduğunu garanti etmez.",
          },
        ],
        answer: "İlk ortak 24;[0,20] içinde 0 ortak olay.",
        check: "24=0+6×4=4+10×2;24’ten önce listelenen anlar kesişmez.",
        pitfall:
          "Pencerede olay yok sonucunu fazların hiçbir zaman buluşmayacağı biçiminde yorumlama.",
      },
      {
        title: "Açık çizgi ile kapalı çevre",
        prompt:
          "Kenarları 45 m ve 75 m olan dikdörtgenin köşeleri dahil çevresine en büyük eş aralıklı işaretler konuyor. Yalnız 75 m’lik açık kenara iki uç dahil işaret konsa sayı nasıl değişir?",
        strategy:
          "Ortak aralığı bulduktan sonra geometrinin uç sayımını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "EBOB(45,75)=15 m’dir; her köşe bu aralığa uyar. Çevre 2×(45+75)=240 m’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Kapalı çevrede 240/15=16 işaret bulunur; bitiş başlangıçla aynı noktadır, ek bir işaret sayılmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Açık 75 m kenarda 75/15=5 aralık ve iki uç dahil 6 işaret vardır. Aynı aralık, farklı uç yapısı yüzünden farklı sayı verir.",
          },
        ],
        answer: "Kapalı çevre 16; açık kenar 6 işaret.",
        check:
          "Kapalı çevrede 16 aralık ile 16 nokta; açık kenarda 5 aralık ile 6 nokta karşılaştırması tutarlıdır.",
        pitfall: "Her aralık sayımına otomatik+1 ekleme.",
      },
      {
        title: "Kalanın alt sınırı sonucu eleyebilir",
        prompt:
          "62 ve 94 sayıları bir d pozitif tam sayısına bölününce her ikisinde 14 kalanının çıktığı ileri sürülüyor. Böyle bir d var mı?",
        strategy:
          "Azaltılmış sayıların ortak bölenlerini kalan sınırıyla karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "d,62−14=48 ve 94−14=80 sayılarını bölmelidir. EBOB(48,80)=16 olduğundan en büyük aday 16’dır.",
          },
          {
            label: "2. adım",
            explanation:
              "Kalan 14 için d>14 gereklidir.16 bu şartı sağlar;48/16=3 ve 80/16=5 tam sayıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "d=16 ile 62=16×3+14 ve 94=16×5+14 bulunur. Kalan 18 olsaydı azaltılmış sayılar 44,76 ve EBOB 4 olurdu; d>18 mümkün olmazdı.",
          },
        ],
        answer: "14 kalanı için d=16 vardır;18 kalanı varyantı olanaksızdır.",
        check:
          "14<16 ve iki gerçek bölme eşitliği sağlanır;18 varyantında en büyük ortak bölen bile küçük kalır.",
        pitfall:
          "EBOB hesaplamakla kalan sınırının otomatik sağlandığını sanma.",
      },
    ],
    recall: [
      {
        prompt: "EBOB ile EKOK’u bilinmeyenin yönünden ayır.",
        answer:
          "EBOB ortak birimin verileri bölmesini; EKOK ortak toplamın/periyodun verilenlerin katı olmasını ister.",
      },
      {
        prompt: "a=dx,b=dy yazınca hangi koşulu korumalısın?",
        answer: "EBOB(x,y)=1. Yalnızxy=m/d koşulu asıl EBOB’u korumaya yetmez.",
      },
      {
        prompt: "EBOB=d,EKOK=m için d,m arasında ne gerekir?",
        answer:
          "Pozitif tam sayılarda d,m’yi bölmelidir; bölmüyorsa uygun sayı çifti yoktur.",
      },
      {
        prompt: "Başlangıç dahil 7. ortak olay kaç ortak aralık sonra gelir?",
        answer: "6 ortak aralık; ilk olay başlangıçta zaten sayılmıştır.",
      },
      {
        prompt: "Aynı kalanlı en küçük doğal sayıda k=0 neden kontrol edilir?",
        answer:
          "Bölümün pozitif olması istenmediyse N=r iki bölmede de bölüm 0 ve kalanr verebilir.",
      },
      {
        prompt: "Öklid yönteminde ortak bölenler neden korunur?",
        answer:
          "Ortak bölen a−bq kalanını da böler; b ve kalanı bölen de a=bq+r’yi böler. İki ortak bölen kümesi aynıdır.",
      },
    ],
    source:
      "MEBİ TYT Matematik EBOB–EKOK ve periyodik problem bölümleri, OGM 9 EBOB–EKOK özeti ve Aurelia ilgili notunun okunan bölümleriyle karşılaştırılan özgün anlatım. Pozitif girdi, başlangıç ve kalan sınırları açıkça korunur; alıştırmalar resmî sınav sorusu değildir.",
  },
];
type Item026 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: NonNullable<Question["guidance"]>;
};
const sets026: {
  id: string;
  base: string;
  title: string;
  questions: Item026[];
}[] = [
  {
    id: "sayi-basamaklari-ileri",
    base: "sayi-basamaklari",
    title: "Sayı basamakları: ileri koşullar ve model seçimi",
    questions: [
      {
        prompt:
          "70800 doğal sayısında sırasıyla yazılan rakam adedi, farklı rakam adedi ve rakam toplamı hangisidir?",
        options: [
          "5; 3; 15",
          "4; 3; 15",
          "3; 5; 15",
          "5; 3; 70800",
          "5; 2; 15",
        ],
        answer: 0,
        hint: "70800 yazımını 7,0,8,0,0 diye beş konuma ayır.",
        explanation:
          "70800 yazımını 7,0,8,0,0 diye beş konuma ayır. Farklı işaret kümesi{0,7,8} üç elemanlıdır; tekrarları yeniden sayma. Rakamları topla:7+0+8+0+0=15. Üç niceliği istenen sıraya koy.",
        guidance: {
          knowledge: [
            "Yazılan rakam adedi, farklı rakam adedi ve rakam toplamı ayrı niceliklerdir.",
          ],
          strategy:
            "Üç isteneni ayrı izle: yazılı konumları say, rakamların tekrarsız kümesini kur ve rakam değerlerini topla; sonuçları sorudaki sırayla eşleştir.",
          steps: [
            "70800 yazımını 7,0,8,0,0 diye beş konuma ayır.",
            "Farklı işaret kümesi{0,7,8} üç elemanlıdır; tekrarları yeniden sayma.",
            "Rakamları topla:7+0+8+0+0=15. Üç niceliği istenen sıraya koy.",
          ],
          optionReasons: [
            "Doğru. Beş konum vardır; farklı rakamlar 0,7,8 ve toplam 7+0+8+0+0=15’tir.",
            "İçte veya sonda bulunan sıfırlardan birini yazılı konum sayımından eksiltir.",
            "Yazılan konum adedi 5 ile farklı rakam kümesinin adedi 3’ü yer değiştirir.",
            "Üçüncü nicelik sayının kendisi değil, tek tek rakamların toplamıdır.",
            "Farklı rakamları sayarken 0’ı dışlar;0 da bir rakamdır.",
          ],
          commonError: "Sıfırı rakam sayımından silmek konum bilgisini bozar.",
          check: "Sonuç(5,3,15); sayısal değer 70800 ayrı kalır.",
        },
      },
      {
        prompt:
          "3062 sayısında yüzler ve onlar rakamlarının yerleri değiştiriliyor. Yeni sayı eskisinden kaç fazladır?",
        options: ["540", "54", "−540", "600", "60"],
        answer: 0,
        hint: "3062’de yüzler 0, onlar 6’dır; değişince 3602 oluşur.",
        explanation:
          "3062’de yüzler 0, onlar 6’dır; değişince 3602 oluşur. Katkı değişimini(6−0)×(100−10)=6×90 yaz. Sonuç 540; doğrudan 3602−3062 ile doğrula.",
        guidance: {
          knowledge: ["İki konumun değişim farkı(y−x)(10^i−10^j) ile bulunur."],
          strategy:
            "Yer değiştiren iki rakamın hem ayrıldığı hem geldiği basamaktaki katkısını hesapla; yeni değer eksi eski değer sırasını koru.",
          steps: [
            "3062’de yüzler 0, onlar 6’dır; değişince 3602 oluşur.",
            "Katkı değişimini(6−0)×(100−10)=6×90 yaz.",
            "Sonuç 540; doğrudan 3602−3062 ile doğrula.",
          ],
          optionReasons: [
            "Doğru. 3602−3062=540;6 yüzlere çıkar,0 onlara iner.",
            "Konum farkını 100−10=90 yerine 9 kullanır;6×9=54 bir onluk ölçek eksiktir.",
            "Eski−yeni farkını bulur; soru yeni sayının eskisinden fazlasını ister.",
            "Yüzler artışını 6×100 sayıp onlar basamağındaki 60 azalışını çıkarmaz.",
            "Yalnız başlangıçtaki 6’nın onlar katkısını verir, yeni yüzler katkısını hesaba katmaz.",
          ],
          commonError:
            "Yalnız bir basamaktaki artışı sayıp diğerindeki azalışı atlama.",
          check: "3602−3062=540 ve rakam toplamları iki sayıda da 11’dir.",
        },
      },
      {
        prompt:
          "X ve Y iki basamaklı doğal sayılardır. X−Y=18, X+Y=90 veriliyor. X yazımının hemen ardına Y yazılarak oluşturulan dört basamaklı sayı kaçtır?",
        options: ["9036", "3654", "5436", "7236", "5472"],
        answer: 2,
        hint: "İki denklemi topla:2 X=108, dolayısıyla X=54.",
        explanation:
          "İki denklemi topla:2 X=108, dolayısıyla X=54. X+Y=90’dan Y=36 bulunur;54−36=18 koşulu da sağlanır. Sağ blok iki haneli olduğundan 100×54+36=5436 yaz.",
        guidance: {
          knowledge: [
            "İki haneli sağ bloğu birleştirmek sol bloğu 100 ile çarpmayı gerektirir.",
          ],
          strategy:
            "Önce iki sayıyı toplam ve fark denklemlerinden bul; sonra sağ bloğun yazım genişliğine göre sol bloğu kaydırarak birleştir.",
          steps: [
            "İki denklemi topla:2 X=108, dolayısıyla X=54.",
            "X+Y=90’dan Y=36 bulunur;54−36=18 koşulu da sağlanır.",
            "Sağ blok iki haneli olduğundan 100×54+36=5436 yaz.",
          ],
          optionReasons: [
            "Toplam 90’ı X sanır; X iki denklemin ortak çözümünde 54’tür.",
            "Doğru blokları bulur fakat X ile Y’nin yazım sırasını ters çevirir.",
            "Doğru. X=54,Y=36 ve birleştirme 100 X+Y=5436’dır.",
            "X yerine 2×36=72 koyar;72−36=36 olur,18 koşulu bozulur.",
            "Y yerine 2 Y=72 yazar; verilen 54+72=126,90 değildir.",
          ],
          commonError: "Birleştirmeyi çarpım veya blokların toplamı sanma.",
          check: "5436’nın ilk iki hanesi 54, son iki hanesi 36’dır.",
        },
      },
      {
        prompt:
          "a sıfırdan farklı, b herhangi bir rakamdır. [ab]=10 a+b ve [abab]=1000 a+100 b+10 a+b tanımlansın. [abab]/[ab] her durumda kaçtır?",
        options: ["1001", "100", "11", "a+b", "101"],
        answer: 4,
        hint: "1000 a+100 b+10 a+b terimlerinde a’ları ve b’leri grupla.",
        explanation:
          "1000 a+100 b+10 a+b terimlerinde a’ları ve b’leri grupla. 1010 a+101 b=101(10 a+b) olur. a≥1 olduğundan [ab]>0; ortak bloğa bölünce 101 kalır.",
        guidance: {
          knowledge: ["Bir k haneli bloğun iki kez yazımı(10^k+1) katıdır."],
          strategy:
            "Tekrarlanan iki haneli bloğu ortak çarpan olarak çıkar; paydanın sıfır olmadığını verilen rakam koşuluyla doğrula.",
          steps: [
            "1000 a+100 b+10 a+b terimlerinde a’ları ve b’leri grupla.",
            "1010 a+101 b=101(10 a+b) olur.",
            "a≥1 olduğundan [ab]>0; ortak bloğa bölünce 101 kalır.",
          ],
          optionReasons: [
            "İki haneli yerine üç haneli blok kaydırma katsayısını kullanır.",
            "İlk [ab] bloğunu iki konum kaydırır fakat sondaki ikinci [ab] bloğunu eklemez.",
            "İki tek rakamın tekrarı [aa]=11 a kuralını iki haneli blok tekrarına yanlış taşır.",
            "Rakam toplamı, bütün iki haneli bloğun tekrar katsayısı değildir.",
            "Doğru. [abab]=101(10 a+b)=101[ab] ve payda sıfır değildir.",
          ],
          commonError:
            "İki haneli blok uzunluğunu tek rakam tekrarıyla karıştırma.",
          check:
            "a=2,b=6 seçilirse 2626/26=101; cebir bütün izinli rakamlar için geçerlidir.",
        },
      },
      {
        prompt:
          "a,b,c birbirinden farklı ve sıfırdan farklı rakamlardır. [abc]=100 a+10 b+c, [cba]=100 c+10 b+a olsun. [abc]−[cba]=495 ve a+b+c=15 koşullarını sağlayan kaç farklı [abc] vardır?",
        options: ["8", "4", "1", "5", "3"],
        answer: 1,
        hint: "99(a−c)=495’ten a=c+5 bulunur.",
        explanation:
          "99(a−c)=495’ten a=c+5 bulunur. Toplamdan b=10−2 c; a≤9 ve c≥1 birlikte c=1,2,3,4 bırakır. Adaylar 681,762,843,924’tür; her üçlü farklı, sıfırdan farklı rakamlıdır. Toplam 4.",
        guidance: {
          knowledge: [
            "Ters yazım farkı son rakamlarla, ek toplam koşulu orta rakamla ilişki kurar.",
          ],
          strategy:
            "Ters yazımları çıkarıp ortadaki rakamı ele; kalan ilişkiyi rakam toplamıyla birleştirerek izinli rakamları tek tek sınırla.",
          steps: [
            "99(a−c)=495’ten a=c+5 bulunur.",
            "Toplamdan b=10−2 c; a≤9 ve c≥1 birlikte c=1,2,3,4 bırakır.",
            "Adaylar 681,762,843,924’tür; her üçlü farklı, sıfırdan farklı rakamlıdır. Toplam 4.",
          ],
          optionReasons: [
            "Her uygun sayının tersini de sayar; tersler verilen pozitif 495 farkını sağlamaz.",
            "Doğru. c=1,2,3,4 adayları sırasıyla 681,762,843,924’ü verir.",
            "Bir uygun aday bulunca durur; koşullar tek bir sayı belirlemez.",
            "c=5 seçilince a=10 çıkar;10 bir rakam değildir.",
            "c=4 için 924 adayını eksiltir;9,2,4 farklı ve toplamları 15’tir.",
          ],
          commonError:
            "Cebirsel adayların rakam ve farklılık koşullarını tek tek doğrula.",
          check: "681−186=495; diğer adaylar da 99×5 farkı taşır.",
        },
      },
      {
        prompt:
          "N üç basamaklı doğal sayıdır. Onluk yazımının sağına 2 yazılınca oluşan sayı, soluna 2 yazılınca oluşan sayıdan 360 büyüktür. N kaçtır?",
        options: ["262", "222", "26", "240", "288"],
        answer: 0,
        hint: "Sağa ekleme 10 N+2, sola ekleme 2000+N olarak yazılır.",
        explanation:
          "Sağa ekleme 10 N+2, sola ekleme 2000+N olarak yazılır. 10 N+2=2000+N+360 düzenlemesinden 9 N=2358 çıkar. 2358/9=262 ve üç basamak koşulu sağlanır.",
        guidance: {
          knowledge: [
            "Sola tek rakam eklemede çarpan N’nin gerçek basamak adedine bağlıdır.",
          ],
          strategy:
            "Sağa ve sola eklemeyi ayrı basamak açılımlarıyla yaz; verilen farktan oluşan tek bilinmeyenli denklemi çöz.",
          steps: [
            "Sağa ekleme 10 N+2, sola ekleme 2000+N olarak yazılır.",
            "10 N+2=2000+N+360 düzenlemesinden 9 N=2358 çıkar.",
            "2358/9=262 ve üç basamak koşulu sağlanır.",
          ],
          optionReasons: [
            "Doğru. 10 N+2−(2000+N)=360 eşitliği 9 N=2358 verir.",
            "222 için sağa da sola da 2 yazımı 2222 olur; fark 0’dır,360 değildir.",
            "Bulunan üç haneli 262’nin son rakamını düşürür; N’nin üç basamak şartını da bozar.",
            "Yalnız 360’tan basamak kaymasını tahmin eder;240 için 2402−2240=162 olur.",
            "288 için 2882−2288=594; verilen fark 360 değildir.",
          ],
          commonError: "Üç basamaklı N için 200 yerine 2000 gerekir.",
          check: "2622−2262=360.",
        },
      },
      {
        prompt:
          "X iki basamaklı, Y tam üç konumluk bir sağ blok olsun; Y’nin başında sıfır bulunabilir. N=1000 X+Y yazımında X ile Y arasına iki 0 konunca yeni sayı 100000 X+Y oluyor. Artış 4554000 ise X kaçtır?",
        options: ["54", "99", "46", "460", "454"],
        answer: 2,
        hint: "Eski ve yeni ifadeyi çıkar: (100000−1000)X=99000 X; Y iptal olur.",
        explanation:
          "Eski ve yeni ifadeyi çıkar: (100000−1000)X=99000 X; Y iptal olur. 99000 X=4554000 eşitliğini 99000’e böl: X=46. Y’nin değeri sonucu etkilemez; X’in 10–99 aralığında olduğunu doğrula.",
        guidance: {
          knowledge: [
            "Araya sıfır girmesi sol bloğun ağırlığını değiştirir; sağ blok aynı kalır.",
          ],
          strategy:
            "Sağ bloğun değerini ve sabit yazım genişliğini ayır; iki gösterimi çıkararak değişmeyen bloğun katkısını yok et.",
          steps: [
            "Eski ve yeni ifadeyi çıkar: (100000−1000)X=99000 X; Y iptal olur.",
            "99000 X=4554000 eşitliğini 99000’e böl: X=46.",
            "Y’nin değeri sonucu etkilemez; X’in 10–99 aralığında olduğunu doğrula.",
          ],
          optionReasons: [
            "X’in rakamlarını ters seçer;99000×54=5346000 olur.",
            "Artışın ortak katsayısındaki 99’u X sanır; X katsayıya bölünerek bulunur.",
            "Doğru. Artış 99000 X=4554000 olduğundan X=46’dır.",
            "Fark katsayısını 99×1000=99000 yerine 99×100=9900 alıp 4554000/9900=460 bulur;bir onluk çarpan eksiktir.460 ayrıca iki basamaklı değildir.",
            "4554000 içindeki bazı rakamları blok sanır;99000×454=44946000 koşulu sağlamaz.",
          ],
          commonError:
            "Eklenen sıfırların katkısı 0 diye bütün artışı 0 sanma.",
          check: "99000×46=4554000; Y=007 seçilse de aynı fark bulunur.",
        },
      },
      {
        prompt:
          "a,b,c sıfırdan farklı rakamlardır; farklı olmaları zorunlu değildir. [a 8]+[b 7]+[c 9]=174 veriliyor. [a 8]=10 a+8 gibi iki haneli yazımlar kullanıldığına göre a+b+c kaçtır?",
        options: ["19", "16", "2", "15", "17"],
        answer: 3,
        hint: "Birler sütununda 8+7+9=24 olduğundan 4 yazılır ve 2 onluk taşınır.",
        explanation:
          "Birler sütununda 8+7+9=24 olduğundan 4 yazılır ve 2 onluk taşınır. Onlar ve yüzlük sonucu 17 onluktur: a+b+c+2=17. Buradan a+b+c=15; örneğin a=b=c=5 seçilirse 58+57+59=174 olur.",
        guidance: {
          knowledge: ["Üç toplananın bir sütunundan 2 elde çıkabilir."],
          strategy:
            "Toplamı birler ve onlar sütunlarına ayır; birler toplamının oluşturduğu eldeyi onlar sütununa taşı.",
          steps: [
            "Birler sütununda 8+7+9=24 olduğundan 4 yazılır ve 2 onluk taşınır.",
            "Onlar ve yüzlük sonucu 17 onluktur: a+b+c+2=17.",
            "Buradan a+b+c=15; örneğin a=b=c=5 seçilirse 58+57+59=174 olur.",
          ],
          optionReasons: [
            "Elde 2’yi toplam 17’den çıkarmak yerine üzerine ekler.",
            "Birler toplamı 24’te 2 yerine 1 elde varmış gibi 17−1=16 hesaplar; gerçek elde 2’dir.",
            "Onlar rakamları toplamı yerine birler sütununun eldesini cevaplar.",
            "Doğru. Birler toplamı 24, elde 2’dir; onlar a+b+c+2=17 verir.",
            "Birlerden gelen 2 eldesini onlar sütununa eklemeyi unutur.",
          ],
          commonError:
            "Eldeyi her zaman 1 sanma; ham sütun toplamını 10’a böl.",
          check: "10(a+b+c)+24=174 de toplamı 15 verir.",
        },
      },
      {
        prompt:
          "a,b sıfırdan farklı rakamlardır. [a 4]=10 a+4, [b 8]=10 b+8 iki basamaklı sayılarını tanımlasın. [a 4]+[a 4]=[b 8] eşitliği için kaç farklı a değeri mümkündür?",
        options: ["1", "4", "9", "3", "5"],
        answer: 1,
        hint: "Eşitliği 20 a+8=10 b+8 olarak aç.",
        explanation:
          "Eşitliği 20 a+8=10 b+8 olarak aç. b=2 a çıkar; b≤9 olduğundan a≤4. a ilk rakam olduğundan a≥1. a=1,2,3,4 için b=2,4,6,8 elde edilir; hepsi iki basamaklı yazımlar üretir.",
        guidance: {
          knowledge: [
            "Aynı harf aynı rakamı gösterir; sonuçtaki basamak sayısı ek bir üst sınır getirir.",
          ],
          strategy:
            "Tekrarlanan toplamı basamak açılımıyla bir rakam ilişkisine çevir; sonuçtaki onlar rakamının yine rakam olmasını denetle.",
          steps: [
            "Eşitliği 20 a+8=10 b+8 olarak aç.",
            "b=2 a çıkar; b≤9 olduğundan a≤4. a ilk rakam olduğundan a≥1.",
            "a=1,2,3,4 için b=2,4,6,8 elde edilir; hepsi iki basamaklı yazımlar üretir.",
          ],
          optionReasons: [
            "Aynı harfin tekrarı tek bir sabit rakam seçimi gerektirmez; dört atama vardır.",
            "Doğru. 2(10 a+4)=10 b+8 sonucunda b=2 a; a=1,2,3,4 mümkündür.",
            "a=1–9 adaylarının hepsini alır; a≥5 için b≥10 rakam sınırını aşar.",
            "a=4,b=8 çiftini eksiltir;44+44=88 geçerlidir.",
            "a=5’i ekler;54+54=108 üç basamaklıdır ve [b 8] yazımına uymaz.",
          ],
          commonError: "Sonucun iki basamaklı olması koşulunu ihmal etme.",
          check: "14+14=28 ve 44+44=88 iki uç uygun örnektir.",
        },
      },
      {
        prompt:
          "Onluk sistemde bütün rakamları birbirinden farklı kaç dört basamaklı doğal sayı vardır?",
        options: ["3024", "5040", "9000", "4536", "6561"],
        answer: 3,
        hint: "İlk konumda 0 dışında 9 rakam seçilir.",
        explanation:
          "İlk konumda 0 dışında 9 rakam seçilir. İkinciye 0 dahil kullanılmamış 9, üçüncüye 8, dördüncüye 7 seçenek kalır. Çarpım 9×9×8×7=4536’dır.",
        guidance: {
          knowledge: [
            "Tekrarsız yazımda her seçimden sonra kullanılabilir küme küçülür.",
          ],
          strategy:
            "İlk basamağı sıfırdan farklı seç; her sonraki konumda daha önce kullanılan rakamları seçeneklerden çıkarıp seçim sayılarını çarp.",
          steps: [
            "İlk konumda 0 dışında 9 rakam seçilir.",
            "İkinciye 0 dahil kullanılmamış 9, üçüncüye 8, dördüncüye 7 seçenek kalır.",
            "Çarpım 9×9×8×7=4536’dır.",
          ],
          optionReasons: [
            "İkinci konumdan 0’ı da gereksiz eleyerek 9×8×7×6 sayar.",
            "İlk rakam için 10 seçenek sayar;0 ile başlayan 10×9×8×7 yazımların bir kısmı dört basamaklı sayı değildir.",
            "Tekrar yasağını kaldıran 9×10×10×10 hesabıdır.",
            "Doğru. İlk konum 9, sonra sırasıyla 9,8,7 seçim verir;9×9×8×7=4536.",
            "Her konumda bağımlılığı yok sayıp 9⁴ hesaplar; seçilen rakamlar tekrar edebilir.",
          ],
          commonError: "İlk basamaktaki 0 yasağını bütün basamaklara yayma.",
          check:
            "Tüm dört basamaklı 9000 sayıdan daha az bir sonuç elde edilmiştir.",
        },
      },
      {
        prompt:
          "0,1,5,8,9 rakamlarından dördü seçilerek, rakam tekrarı olmadan dört basamaklı ve 5’e tam bölünen sayılar yazılıyor. Kaç sayı yazılabilir?",
        options: ["42", "48", "24", "18", "60"],
        answer: 0,
        hint: "5’e bölünme son rakamı 0 veya 5 yapar; iki durum ayrıdır.",
        explanation:
          "5’e bölünme son rakamı 0 veya 5 yapar; iki durum ayrıdır. Son 0’da ilk üç konum 4×3×2=24; son 5’te ilk konum 1,8,9’dan 3, diğerleri 3×2 olduğundan 18 seçenek vardır. Toplam 24+18=42.",
        guidance: {
          knowledge: [
            "Son basamak koşulu ile ilk basamaktaki 0 yasağı birlikte uygulanır.",
          ],
          strategy:
            "Beşe bölünebilmenin izin verdiği son basamakları ayrı durumlar yap; her durumda ilk basamağın sıfır olamamasını yeniden uygula.",
          steps: [
            "5’e bölünme son rakamı 0 veya 5 yapar; iki durum ayrıdır.",
            "Son 0’da ilk üç konum 4×3×2=24; son 5’te ilk konum 1,8,9’dan 3, diğerleri 3×2 olduğundan 18 seçenek vardır.",
            "Toplam 24+18=42.",
          ],
          optionReasons: [
            "Doğru. Son 0 için 24, son 5 için 18; ayrık durumların toplamı 42’dir.",
            "Son 5 durumunda ilk konuma 0’ı da alıp 24 sayar; bu altı baş-sıfırlı yazım geçersizdir.",
            "Yalnız son rakam 0 durumunu sayıp son 5 durumunu eksiltir.",
            "Yalnız son 5 durumunu sayıp son 0 durumunu eksiltir.",
            "Son rakam için iki şartı ayırmadan bütün 5 P 4 yazımlarının yarısını almak geçerli bir eşit dağılım varsayımı değildir.",
          ],
          commonError:
            "Son 0 ile son 5 durumlarında baş rakam seçim adetleri aynı değildir.",
          check:
            "42, bu beş rakamdan kurulan bütün dört basamaklı tekrarsız sayılardan küçüktür.",
        },
      },
      {
        prompt:
          "0,2,4,6,8 rakamlarının her biri tam bir kez kullanılarak kaç beş basamaklı doğal sayı oluşturulur?",
        options: ["256", "120", "96", "80", "24"],
        answer: 2,
        hint: "Başa 0 gelemez;2,4,6,8 arasından 4 seçim vardır.",
        explanation:
          "Başa 0 gelemez;2,4,6,8 arasından 4 seçim vardır. Seçilen baş rakamdan sonra kalan dört farklı rakam 4×3×2×1=24 biçimde sıralanır. Toplam 4×24=96’dır; alternatif 5!−4! hesabı da 96 verir.",
        guidance: {
          knowledge: [
            "Verilen farklı rakamların tümünü kullanmada baş-sıfır durumlarını ayrıca elemek gerekir.",
          ],
          strategy:
            "Önce başa gelebilen rakamı seç; kalan rakamları tekrar etmeden kalan konumlara yerleştirip çarpma ilkesini kullan.",
          steps: [
            "Başa 0 gelemez;2,4,6,8 arasından 4 seçim vardır.",
            "Seçilen baş rakamdan sonra kalan dört farklı rakam 4×3×2×1=24 biçimde sıralanır.",
            "Toplam 4×24=96’dır; alternatif 5!−4! hesabı da 96 verir.",
          ],
          optionReasons: [
            "4⁴ hesabı hem tekrar yasağını hem toplam beş rakamın birer kez kullanımını bozabilir.",
            "5! bütün dizilişleri sayar;24 tanesi 0 ile başlar ve beş basamaklı değildir.",
            "Doğru. İlk rakam dört sıfır dışı seçenek, kalan dört konum 4! düzen verir;4×24=96.",
            "Başı 0 olan dizilişleri 4!=24 yerine 40 sayıp 120−40=80 hesaplar. Doğru eleme 24 olduğu için sonuç 96’dır.",
            "Baştaki dört olası rakam seçimini sabit kabul edip yalnız 4! sayar.",
          ],
          commonError:
            "0’ın bir kez kullanılmasını tamamen yasaklama; yalnız ilk konumda olamaz.",
          check: "120−24=96 ile bağımsız sayım eşleşir.",
        },
      },
      {
        prompt:
          "Etiketler 35’ten 143’e kadar iki uç dahil doğal sayı yazımıyla basılıyor. Ön sıfır veya başka işaret yok. Toplam kaç rakam basılır?",
        options: ["259", "327", "109", "262", "264"],
        answer: 3,
        hint: "Aralığı 35–99 ve 100–143 diye basamak sınırında ayır.",
        explanation:
          "Aralığı 35–99 ve 100–143 diye basamak sınırında ayır. İlk blok 99−35+1=65 etiket ve 130 rakam; ikinci 143−100+1=44 etiket ve 132 rakamdır. Toplam 130+132=262 rakam kullanılır.",
        guidance: {
          knowledge: [
            "Toplam rakam maliyeti, her basamak bloğunda etiket adedi×basamak sayısıdır.",
          ],
          strategy:
            "Aralığı rakam adedinin değiştiği yerde parçalara ayır; her parçada iki uç dahil sayı adedini hane sayısıyla çarpıp topla.",
          steps: [
            "Aralığı 35–99 ve 100–143 diye basamak sınırında ayır.",
            "İlk blok 99−35+1=65 etiket ve 130 rakam; ikinci 143−100+1=44 etiket ve 132 rakamdır.",
            "Toplam 130+132=262 rakam kullanılır.",
          ],
          optionReasons: [
            "100–143 bloğunda uçlardan birini eksiltip 43×3=129 kullanır;130+129=259, bir etiketin 3 rakamı eksiktir.",
            "109 etiketin tümünü üç haneli sayar:109×3=327; ilk 65 etiket iki hanelidir.",
            "Etiket adedini 143−35+1=109 bulur fakat her etiketteki rakam sayısını çarpmaz.",
            "Doğru. 35–99 arasında 65×2=130;100–143 arasında 44×3=132 rakam, toplam 262.",
            "35–99 bloğunu 65 yerine 66 etiket sayar;66×2+44×3=264, bir fazla iki haneli etiket eklenmiştir.",
          ],
          commonError: "Numara adedi ile yazılan rakam adedini eşitleme.",
          check:
            "65+44=109 toplam etiket; rakam ortalaması 2 ile 3 arasında olmalıdır.",
        },
      },
      {
        prompt:
          "Bir kitabın sayfaları 1’den başlayarak eksiksiz doğal sayılarla numaralanıyor. Toplam 444 rakam yazıldığına göre son sayfa numarası kaçtır?",
        options: ["148", "184", "183", "185", "255"],
        answer: 1,
        hint: "1–9 için 9,10–99 için 90×2=180; toplam 189 rakam çıkar.",
        explanation:
          "1–9 için 9,10–99 için 90×2=180; toplam 189 rakam çıkar. 444−189=255 rakam, her biri 3 rakamlı 85 yeni sayfa oluşturur. Son numara 100+85−1=184’tür.",
        guidance: {
          knowledge: [
            "Tamamlanan numaralama bloklarını çıkarıp kalan maliyeti yeni basamak sayısına böl.",
          ],
          strategy:
            "Bir ve iki haneli sayfaların rakam bütçesini ayır; geriye kalan rakamları sonraki hane grubunun sayfa adedine dönüştür.",
          steps: [
            "1–9 için 9,10–99 için 90×2=180; toplam 189 rakam çıkar.",
            "444−189=255 rakam, her biri 3 rakamlı 85 yeni sayfa oluşturur.",
            "Son numara 100+85−1=184’tür.",
          ],
          optionReasons: [
            "Rakam maliyetinin hepsini 3’e böler:444/3=148; ilk 99 sayfa üçer rakam kullanmaz.",
            "Doğru. İlk 99 sayfa 189 rakam, kalan 255 rakam 85 üç haneli sayfa verir;99+85=184.",
            "99+85 hesabından bir kez daha 1 çıkarır; son etiket 184 olmalıdır.",
            "Üç haneli bloktaki 85 sayfaya 100 eklerken iki ucu dahil sayımda−1’i unutur.",
            "İlk blokların maliyetini çıkarınca kalan rakam adedini sayfa numarası sanır.",
          ],
          commonError: "Kalan rakam miktarını son sayfa ile karıştırma.",
          check: "9+180+(184−100+1)×3=444.",
        },
      },
      {
        prompt:
          "a,b sıfırdan farklı rakamlardır. [aa]=11 a,[bb]=11 b iki basamaklı tekrar yazımlarını göstersin. [aa]+[bb]=143 koşulunu sağlayan kaç sıralı(a,b) çifti vardır?",
        options: ["3", "9", "6", "7", "13"],
        answer: 2,
        hint: "11 a+11 b=143 eşitliğinden a+b=13 çıkar.",
        explanation:
          "11 a+11 b=143 eşitliğinden a+b=13 çıkar. b=13−a,1–9 aralığında kalmalı; bu nedenle 4≤a≤9. a’nın altı değeri altı ayrı sıralı çift üretir.",
        guidance: {
          knowledge: [
            "Sıralı ve sırasız çift sayımı, kökte verilen sayım nesnesine bağlıdır.",
          ],
          strategy:
            "Tekrarlanan rakam yazımlarının ortak çarpanını ayır; elde edilen rakam toplamını sağlayan sıralı ve izinli çiftleri say.",
          steps: [
            "11 a+11 b=143 eşitliğinden a+b=13 çıkar.",
            "b=13−a,1–9 aralığında kalmalı; bu nedenle 4≤a≤9.",
            "a’nın altı değeri altı ayrı sıralı çift üretir.",
          ],
          optionReasons: [
            "Ters çiftleri tek sayar; soru sıralı(a,b) çiftlerini istediği için(4,9) ile(9,4) farklıdır.",
            "a’nın bütün 1–9 değerlerini kabul eder; a=1,2,3 için b>9 olur.",
            "Doğru. a+b=13 ve a,b∈{1,…,9}; a=4,5,6,7,8,9 altı sıralı çift verir.",
            "a=3,b=10 adayını ekler;10 rakam değildir.",
            "a+b toplamını çift adedi yerine cevaplar.",
          ],
          commonError: "Rakam sınırını ve çiftin sıralı olmasını atlama.",
          check: "Çiftler(4,9),(5,8),(6,7),(7,6),(8,5),(9,4).",
        },
      },
      {
        prompt: "0,0706 ondalık gösteriminde 7 rakamının basamak değeri nedir?",
        options: ["7", "0,007", "0,7", "0,07", "0,0007"],
        answer: 3,
        hint: "Virgülden sonra konumları sırala: onda bir 0,yüzde bir 7,binde bir 0,on binde bir 6.",
        explanation:
          "Virgülden sonra konumları sırala: onda bir 0,yüzde bir 7,binde bir 0,on binde bir 6. 7’nin ağırlığı 1/100’dür. 7×1/100=7/100=0,07 bulunur.",
        guidance: {
          knowledge: [
            "Ondalık kesir konumlarında ağırlıklar 10’un negatif kuvvetleridir.",
          ],
          strategy:
            "Rakamın virgüle göre konumunu saptayıp o konumun ondalık ağırlığıyla çarp; rakam ile basamak değerini ayrı tut.",
          steps: [
            "Virgülden sonra konumları sırala: onda bir 0,yüzde bir 7,binde bir 0,on binde bir 6.",
            "7’nin ağırlığı 1/100’dür.",
            "7×1/100=7/100=0,07 bulunur.",
          ],
          optionReasons: [
            "Rakamın sayı değerini verir; basamak ağırlığını uygulamaz.",
            "7’yi üçüncü kesir konumuna taşır;7 aslında ikinci konumdadır.",
            "7’yi virgülden sonraki ilk konuma koyar; o konumda 0 vardır.",
            "Doğru. Virgülden sonraki ikinci konum yüzde birdir;7×1/100=0,07.",
            "7’yi dördüncü kesir konumuna taşır; o konumda 6 vardır.",
          ],
          commonError: "Virgülü rakam veya basamak gibi sayma.",
          check: "0,0706=0,07+0,0006.",
        },
      },
      {
        prompt: "N=10⁵−10² doğal sayısı kaç basamaklıdır?",
        options: ["3", "4", "6", "7", "5"],
        answer: 4,
        hint: "10⁵=100000 ve 10²=100 değerlerini yaz.",
        explanation:
          "10⁵=100000 ve 10²=100 değerlerini yaz. Çıkarma 99900 verir. 10⁴≤99900<10⁵ aralığı, pozitif sayının 5 basamaklı olduğunu gösterir.",
        guidance: {
          knowledge: [
            "Basamak adedi 10’un ardışık kuvvetleri arasındaki aralıkla belirlenir.",
          ],
          strategy:
            "Önce kuvvetlerin farkını sayı olarak değerlendir; sonucu ardışık on kuvvetleri arasına yerleştirerek basamak sayısını bul.",
          steps: [
            "10⁵=100000 ve 10²=100 değerlerini yaz.",
            "Çıkarma 99900 verir.",
            "10⁴≤99900<10⁵ aralığı, pozitif sayının 5 basamaklı olduğunu gösterir.",
          ],
          optionReasons: [
            "10²’nin 100 yazımındaki basamak adedini bütün sonuca uygular.",
            "10000 alt sınırını gözden kaçırır;99900 dört basamaklıların üst sınırı 9999’dan büyüktür.",
            "10⁵’in altı basamaklı oluşunu çıkarma sonrası değişmeden korur.",
            "Kuvvetlerin üslerini 5+2 diye toplar; çıkarma basamak adetlerini toplamaz.",
            "Doğru. N=100000−100=99900 ve 10000≤99900≤99999 olduğundan 5 basamaklıdır.",
          ],
          commonError:
            "İfadedeki en büyük kuvvetin üssünü sonuç basamak adedine koşulsuz bağlama.",
          check: "99900 yazımında beş rakam bulunur.",
        },
      },
      {
        prompt:
          "Bir dört haneli erişim kodunda 0–9 rakamları tekrarlanabilir ve 0000 geçerlidir. Bu kodların sayısı, bütün dört basamaklı doğal sayıların sayısından kaç fazladır?",
        options: ["999", "0", "10000", "9000", "1000"],
        answer: 4,
        hint: "Kodda dört konumun her birinde 10 seçenek olduğundan 10000 kod vardır.",
        explanation:
          "Kodda dört konumun her birinde 10 seçenek olduğundan 10000 kod vardır. Dört basamaklı doğal sayıda ilk rakam 9, diğerleri 10’ar seçenekle 9000 sayı verir. 10000−9000=1000; bunlar 0 ile başlayan dört haneli kodlardır.",
        guidance: {
          knowledge: [
            "Kod genişliği ve doğal sayının basamak adedi farklı tanımlardır.",
          ],
          strategy:
            "Başta sıfıra izin veren kod uzayıyla doğal sayı uzayını ayrı say; ilk basamak kısıtının iki sayımı nasıl değiştirdiğini karşılaştır.",
          steps: [
            "Kodda dört konumun her birinde 10 seçenek olduğundan 10000 kod vardır.",
            "Dört basamaklı doğal sayıda ilk rakam 9, diğerleri 10’ar seçenekle 9000 sayı verir.",
            "10000−9000=1000; bunlar 0 ile başlayan dört haneli kodlardır.",
          ],
          optionReasons: [
            "0000 kodunu gereksiz dışlayarak 1000 yerine 999 ek yazım sayar.",
            "Kod ile doğal sayıda baştaki 0 kuralını aynı varsayar.",
            "Farkı almak yerine bütün kod adedini cevaplar.",
            "Fark yerine dört basamaklı doğal sayıların toplam adedini verir.",
            "Doğru. Kodlar 10⁴=10000, doğal sayılar 9×10³=9000; fark 1000’dir.",
          ],
          commonError:
            "0000’ın geçerliliğini kökün açık bilgisine rağmen eleme.",
          check:
            "0 ile başlayan kodların son üç hanesi 10³=1000 olasılık taşır.",
        },
      },
      {
        prompt:
          "2,5,8 rakamlarının her biri bir kez kullanılarak yazılabilecek bütün üç basamaklı sayıların toplamı kaçtır?",
        options: ["1665", "3330", "2580", "9990", "15"],
        answer: 1,
        hint: "Üç farklı rakamla 3!=6 yazım oluşur.",
        explanation:
          "Üç farklı rakamla 3!=6 yazım oluşur. Bir rakam yüzlerde sabitlenince kalan iki rakam 2 biçimde sıralanır; her rakam her konumda iki kez görünür. Toplam 2×15×111=3330’dur.",
        guidance: {
          knowledge: [
            "Bütün permütasyonların toplamında her konumdaki rakam kullanım sıklığı sayılabilir.",
          ],
          strategy:
            "Bütün yazımları tek tek toplamak yerine her rakamın her basamakta kaç kez yer aldığını kullan; basamak ağırlıklarıyla katkıları topla.",
          steps: [
            "Üç farklı rakamla 3!=6 yazım oluşur.",
            "Bir rakam yüzlerde sabitlenince kalan iki rakam 2 biçimde sıralanır; her rakam her konumda iki kez görünür.",
            "Toplam 2×15×111=3330’dur.",
          ],
          optionReasons: [
            "Her rakamı her konumda yalnız bir kez sayar; her konumda iki kullanım vardır.",
            "Doğru. Altı sayıda her rakam her konumda iki kez görünür;2(2+5+8)(100+10+1)=3330.",
            "Bir tek 258 yazımını 10 ile çarpar; tüm altı dizilişin toplamı değildir.",
            "Her rakamı her konumda altı kez sayar; toplam altı sayıda aynı konumda her rakam iki kez bulunur.",
            "Yalnız rakamların toplamı 2+5+8’i verir, altı yazımı ve konumları saymaz.",
          ],
          commonError:
            "Altı sayının her birinde aynı rakam aynı basamakta bulunuyormuş gibi çarpma.",
          check: "258+285+528+582+825+852=3330.",
        },
      },
      {
        prompt:
          "Üç basamaklı N’nin son rakamı 1’dir. Son rakam silinince kalan iki basamaklı q sayısı için N−q=352 veriliyor. N kaçtır?",
        options: ["353", "390", "352", "39", "391"],
        answer: 4,
        hint: "Son rakam 1 olduğundan N=10 q+1 yaz.",
        explanation:
          "Son rakam 1 olduğundan N=10 q+1 yaz. 10 q+1−q=352 eşitliği 9 q=351 ve q=39 verir. N=10×39+1=391; q iki basamaklı, N üç basamaklıdır.",
        guidance: {
          knowledge: [
            "Son rakamı silmek 10 ile tam bölüm almaktır; geri kurarken rakam eklenir.",
          ],
          strategy:
            "Silinmeden önceki sayıyı kalan ön blok ve son rakamla ifade et; verilen farkı bu ön blok için bir denkleme dönüştür.",
          steps: [
            "Son rakam 1 olduğundan N=10 q+1 yaz.",
            "10 q+1−q=352 eşitliği 9 q=351 ve q=39 verir.",
            "N=10×39+1=391; q iki basamaklı, N üç basamaklıdır.",
          ],
          optionReasons: [
            "N−q farkına yalnız son rakamı ekler; q’nun ağırlığının 10’a çıktığını kullanmaz.",
            "q=39’u doğru bulur ama verilen son rakam 1 yerine 0 ekler.",
            "Verilen farkı N sanır; q sıfır değildir ve iki basamaklıdır.",
            "Silinmiş yazım q’yu cevaplar; N üç basamaklıdır.",
            "Doğru. N=10 q+1,9 q+1=352; q=39 ve N=391.",
          ],
          commonError: "Silme işlemini N−1 gibi yorumlama.",
          check: "391−39=352.",
        },
      },
    ],
  },
  {
    id: "bolme-bolunebilme-ileri",
    base: "bolme-bolunebilme",
    title: "Bölme ve bölünebilme: ileri kalan ve rakam koşulları",
    questions: [
      {
        prompt:
          "Bu soruda pozitif bölenle kalan 0≤r<b seçilir. −38’in 7 ile bölümünde tam bölüm ve kalan sırasıyla nedir?",
        options: ["6; 4", "−6; 4", "−5; 3", "−6; −4", "−5; −3"],
        answer: 1,
        hint: "−38’i çevreleyen 7 katlarını yaz:−42≤−38<−35.",
        explanation:
          "−38’i çevreleyen 7 katlarını yaz:−42≤−38<−35. Sol kat−42=7×(−6) olduğundan tam bölüm−6’dır. Aradaki uzaklık−38−(−42)=4 kalandır.",
        guidance: {
          knowledge: [
            "Pozitif bölenle Öklid bölmesinde bölüm aşağı yuvarlanır ve kalan negatif olmaz.",
          ],
          strategy:
            "Negatif sayıyı bölenin komşu katları arasında konumlandır; bölüm ve kalanı, kalan aralığı koşulunu sağlayacak birlikte seç.",
          steps: [
            "−38’i çevreleyen 7 katlarını yaz:−42≤−38<−35.",
            "Sol kat−42=7×(−6) olduğundan tam bölüm−6’dır.",
            "Aradaki uzaklık−38−(−42)=4 kalandır.",
          ],
          optionReasons: [
            "Bölümün işaretini pozitif seçer;42+4=46,−38 değildir.",
            "Doğru. −38=7×(−6)+4 ve 0≤4<7.",
            "Bölümü−5 tutup artığın yalnız işaretini değiştirir;−35+3=−32 olur.",
            "Bölüm doğru olsa da−42−4=−46 eşitliği−38’i vermez.",
            "Sıfıra doğru kesme−5 verir ama artık−3 negatiftir; belirtilen kalan aralığına uymaz.",
          ],
          commonError:
            "Negatif bölünende bölümün işaretini veya kalan aralığını değiştirme.",
          check: "7×(−6)+4=−38 ve 4<7.",
        },
      },
      {
        prompt:
          "A doğal sayısının 9 ile bölümünde tam bölüm 5’tir. A’nın alabileceği en büyük değer kaçtır?",
        options: ["54", "44", "50", "45", "53"],
        answer: 4,
        hint: "Bölme eşitliği A=45+r biçimindedir.",
        explanation:
          "Bölme eşitliği A=45+r biçimindedir. Kalan tam sayı ve 0≤r<9 olduğundan en büyük r=8’dir. A=45+8=53 bulunur.",
        guidance: {
          knowledge: [
            "Bölen ve bölüm sabitken bölünen bq ile bq+b−1 arasındadır.",
          ],
          strategy:
            "Sabit bölüm ve bölen için bölüneni kalan cinsinden yaz; yasal kalan aralığının üst ucunu kullanarak en büyük değeri belirle.",
          steps: [
            "Bölme eşitliği A=45+r biçimindedir.",
            "Kalan tam sayı ve 0≤r<9 olduğundan en büyük r=8’dir.",
            "A=45+8=53 bulunur.",
          ],
          optionReasons: [
            "Kalanı 9 alır;54’ün 9 ile bölümünde bölüm 6 olur.",
            "45 alt sınırından 1 eksiktir;44’ün bölüm değeri 4’tür.",
            "Bölüme böleni eklemek yerine 45+5 hesaplar; mümkün olsa da en büyük değildir.",
            "Kalanı zorunlu 0 kabul eder; bu en küçük A’dır.",
            "Doğru. A=9×5+r=45+r,0≤r≤8; en büyük 53’tür.",
          ],
          commonError: "Kalanın bölen kadar olmasına izin verme.",
          check: "53=9×5+8; bir sonraki 54’te bölüm artar.",
        },
      },
      {
        prompt:
          "127 doğal sayısı pozitif tam sayı b’ye bölününce tam bölüm 10, kalan 7 oluyor. b kaçtır?",
        options: ["10", "120", "12", "13", "7"],
        answer: 2,
        hint: "127=b×10+7 eşitliğini kur.",
        explanation:
          "127=b×10+7 eşitliğini kur. 7 çıkarınca 120=10 b; buradan b=12. b pozitif tam sayı ve 7<12 olduğundan sonuç geçerlidir.",
        guidance: {
          knowledge: ["Bölme eşitliğinde bölüm ile bölen farklı rollerdedir."],
          strategy:
            "Bölme eşitliğinde bilinmeyen böleni yalnız bırak; bulduğun değerin pozitif tam sayı ve kalandan büyük olduğunu denetle.",
          steps: [
            "127=b×10+7 eşitliğini kur.",
            "7 çıkarınca 120=10 b; buradan b=12.",
            "b pozitif tam sayı ve 7<12 olduğundan sonuç geçerlidir.",
          ],
          optionReasons: [
            "Tam bölüm 10’u bölen sanır;127=10×12+7 başka bir bölmedir ve bölüm 12 çıkar.",
            "Kalanı çıkarınca kalan 120’yi bölüm 10’a bölmeden cevaplar.",
            "Doğru. 127=10 b+7, dolayısıyla b=120/10=12;7<12.",
            "127’yi yaklaşık 10’a bölüp yuvarlar;13×10+7=137 olur.",
            "Kalanı bölen sanır; kalan 7, bölen 7’den küçük değildir.",
          ],
          commonError:
            "Cebirsel böleni bulduktan sonra kalan sınırını ayrıca doğrula.",
          check: "12×10+7=127.",
        },
      },
      {
        prompt:
          "Bir çözüm 45=5×8+5 eşitliğini “5 ile bölmede bölüm 8,kalan 5” diye yorumluyor. Bitmiş bölmenin doğru bölüm ve kalanı nedir?",
        options: ["10; −5", "8; 5", "5; 9", "8; 0", "9; 0"],
        answer: 4,
        hint: "Önce 5<5 koşulunun yanlış olduğunu gör; verilen artık son kalan değildir.",
        explanation:
          "Önce 5<5 koşulunun yanlış olduğunu gör; verilen artık son kalan değildir. Bir 5’lik grup daha çıkarıp bölümü 8’den 9’a yükselt. 45=5×9+0 ile kalan 0 olur.",
        guidance: {
          knowledge: ["Kalan bölen kadar olunca yeni tam gruba dönüştürülür."],
          strategy:
            "Verilen eşitliğin yanında kalan sınırını da kontrol et; artıktaki tam bölen gruplarını bölüme aktararak bitmiş bölmeyi kur.",
          steps: [
            "Önce 5<5 koşulunun yanlış olduğunu gör; verilen artık son kalan değildir.",
            "Bir 5’lik grup daha çıkarıp bölümü 8’den 9’a yükselt.",
            "45=5×9+0 ile kalan 0 olur.",
          ],
          optionReasons: [
            "45=5×10−5 eşitliğinde kalan negatiftir; seçilen aralığa uymaz.",
            "Eşitlik doğru olsa da kalan bölenin altında değildir.",
            "Bölen 5’i bölüm, gerçek bölüm 9’u kalan yerine yazar. Ayrıca 9≥5 olduğu için kalan bölenin altında değildir.",
            "Artığı silip grubu artırmaz;5×8=40,45 değildir.",
            "Doğru. Artan 5 içinde bir 5’lik grup daha vardır;45=5×9+0.",
          ],
          commonError: "Doğru bir eşitliği tamamlanmış bölme sanma.",
          check: "0≤0<5 ve 5×9=45.",
        },
      },
      {
        prompt:
          "a bir rakamdır. 46 a=460+a üç basamaklı sayısı hem 3’e hem 4’e tam bölünüyor. a kaçtır?",
        options: ["2", "5", "8", "0", "4"],
        answer: 2,
        hint: "Son iki hane 60+a,4’e bölünmeli: a=0,4,8.",
        explanation:
          "Son iki hane 60+a,4’e bölünmeli: a=0,4,8. Rakam toplamı 10+a,3’ün katı olmalı: a=2,5,8. İki aday kümesinin ortak elemanı 8’dir; sayı 468 olur.",
        guidance: {
          knowledge: [
            "Birden çok bölünebilme koşulu aday kümelerinin kesişimidir.",
          ],
          strategy:
            "Dörde bölünmeyi son iki hane, üçe bölünmeyi rakam toplamı üzerinden denetle; iki koşulun ortak rakam adayını seç.",
          steps: [
            "Son iki hane 60+a,4’e bölünmeli: a=0,4,8.",
            "Rakam toplamı 10+a,3’ün katı olmalı: a=2,5,8.",
            "İki aday kümesinin ortak elemanı 8’dir; sayı 468 olur.",
          ],
          optionReasons: [
            "462’nin rakam toplamı 12’dir ama son iki 62,4’e bölünmez.",
            "465’in rakam toplamı 15’tir ama son iki 65,4’e bölünmez.",
            "Doğru. 4 kuralı a∈{0,4,8},3 kuralı a∈{2,5,8}; ortak aday 8’dir.",
            "460 son iki 60 sayesinde 4’e bölünür ama rakam toplamı 10,3’e bölünmez.",
            "464 son iki 64 ile 4’e uyar; rakam toplamı 14 olduğundan 3’e uymaz.",
          ],
          commonError: "Koşullardan yalnız birini sağlayan rakamı kabul etme.",
          check: "468=3×156=4×117.",
        },
      },
      {
        prompt:
          "a,b rakamdır. 3 a 5 b=3000+100 a+50+b dört basamaklı sayısının bütün rakamları farklıdır. Sayı 5’e ve 9’a tam bölünüyorsa a+b kaçtır?",
        options: ["9", "5", "0", "10", "1"],
        answer: 4,
        hint: "5’e bölünme b=0 veya 5 ister. Yazımda zaten 5 bulunduğu için b=5 elenir.",
        explanation:
          "5’e bölünme b=0 veya 5 ister. Yazımda zaten 5 bulunduğu için b=5 elenir. b=0 iken rakam toplamı 8+a’dır; a=0–9 içinde 9’un katını veren tek değer a=1’dir. 3150 farklı rakamlıdır ve a+b=1 olur.",
        guidance: {
          knowledge: [
            "Rakam farklılığı, basamak kurallarından bağımsız ek bir filtredir.",
          ],
          strategy:
            "Son rakam koşulunu farklı rakamlar şartıyla birlikte uygula; kalan adaylarda rakam toplamının bölünebilmesini kontrol et.",
          steps: [
            "5’e bölünme b=0 veya 5 ister. Yazımda zaten 5 bulunduğu için b=5 elenir.",
            "b=0 iken rakam toplamı 8+a’dır; a=0–9 içinde 9’un katını veren tek değer a=1’dir.",
            "3150 farklı rakamlıdır ve a+b=1 olur.",
          ],
          optionReasons: [
            "Rakam toplamının 9 olmasını a+b=9 sanır; sabit 3+5=8 de toplamda vardır.",
            "Yalnız b için olası son rakam 5’i cevaplar; bu farklılık şartında elenir.",
            "a=b=0 seçimi hem farklılığı hem 9’a bölünmeyi bozar;3050 toplamı 8’dir.",
            "a=b=5 adayını kabul eder;3555’te rakamlar farklı değildir.",
            "Doğru. b=0 veya 5; farklılık b=5’i dışlar.8+a,9’un katı olduğundan a=1,b=0.",
          ],
          commonError:
            "Bölünebilme sağlayan ama rakam tekrarı içeren adayı ele.",
          check: "3150=9×350=5×630; rakamlar 3,1,5,0 farklıdır.",
        },
      },
      {
        prompt:
          "a bir rakamdır. 1 a 7=100+10 a+7 sayısı 11’e tam bölünüyor. a kaçtır?",
        options: ["8", "0", "7", "9", "1"],
        answer: 0,
        hint: "11 için sağdan dönüşümlü toplam 7−a+1=8−a yaz.",
        explanation:
          "11 için sağdan dönüşümlü toplam 7−a+1=8−a yaz. a∈{0,…,9} için bu toplam−1–8 aralığındadır;11 katı yalnız 0’dır. 8−a=0 çözümü a=8 ve sayı 187 verir.",
        guidance: {
          knowledge: [
            "11’e tam bölünmede dönüşümlü toplam 11’in bir tam katıdır.",
          ],
          strategy:
            "On bire bölünebilme için dönüşümlü basamak toplamını kur; rakam aralığında bu toplamı on birin katı yapan adayı ara.",
          steps: [
            "11 için sağdan dönüşümlü toplam 7−a+1=8−a yaz.",
            "a∈{0,…,9} için bu toplam−1–8 aralığındadır;11 katı yalnız 0’dır.",
            "8−a=0 çözümü a=8 ve sayı 187 verir.",
          ],
          optionReasons: [
            "Doğru. Sağdan 7−a+1=8−a,−1 ile 8 arasındadır; tek 11 katı 0 olduğu için a=8.",
            "107 için dönüşümlü toplam 8’dir;11’e kalan 8,0 değildir.",
            "177 için toplam 1’dir; son rakamı tekrarlamak yetmez.",
            "197 için toplam−1’dir;−1 de 11’in katı değildir.",
            "117 için toplam 7’dir; aynı ilk rakamı seçmek 11 koşulunu sağlamaz.",
          ],
          commonError:
            "Toplamı 11’e eşitlemek zorunlu değildir; burada 0 tek mümkündür.",
          check: "187=11×17.",
        },
      },
      {
        prompt:
          "a bir rakamdır. 582 a=5820+a dört basamaklı sayısı 8’e tam bölünüyor. a kaçtır?",
        options: ["2", "0", "6", "4", "8"],
        answer: 3,
        hint: "8 için son üç basamağı ayır:820+a.",
        explanation:
          "8 için son üç basamağı ayır:820+a. 820=8×102+4 olduğundan 4+a,8’in katı olmalı. a=0–9 aralığında tek çözüm a=4’tür; son blok 824 olur.",
        guidance: {
          knowledge: ["8 kuralı son üç basamağın sayısal değerini kullanır."],
          strategy:
            "Sekize bölünebilmede son üç haneli bloğu ayır; bu bloğun alabileceği değerler içinde sekizin katlarını araştır.",
          steps: [
            "8 için son üç basamağı ayır:820+a.",
            "820=8×102+4 olduğundan 4+a,8’in katı olmalı.",
            "a=0–9 aralığında tek çözüm a=4’tür; son blok 824 olur.",
          ],
          optionReasons: [
            "5822,8×727+6’dır; kalan 6 olur.",
            "5820’nin 8’e kalanı 4’tür; son rakam 0 olması 8’e yetmez.",
            "5826,8×728+2’dir; kalan 2 olur.",
            "Doğru. Son üç hane 820+a;820’nin 8’e kalanı 4 olduğundan a=4 tek rakam adayıdır.",
            "5828,8×728+4’tür; yine kalan 4 olur.",
          ],
          commonError:
            "Son rakamın çiftliğini 8’e tam bölünme için yeterli sanma.",
          check: "5824=8×728.",
        },
      },
      {
        prompt:
          "a bir rakamdır. 139 a=1390+a sayısını 25’e tam bölünebilir yapan kaç a değeri vardır?",
        options: ["0", "2", "4", "10", "1"],
        answer: 0,
        hint: "25’e bölünebilmede son iki hane 00,25,50 veya 75 olmalıdır.",
        explanation:
          "25’e bölünebilmede son iki hane 00,25,50 veya 75 olmalıdır. 139 a’nın son iki hanesi 9 a, yani 90–99 aralığındadır. Bu iki küme kesişmez; uygun a sayısı 0’dır.",
        guidance: {
          knowledge: ["Bir rakam sorusunun çözüm kümesi boş olabilir."],
          strategy:
            "Yirmi beşe bölünebilen son iki hane desenleriyle verilen sabit onlar basamağını karşılaştır; uygun birler rakamı kalıp kalmadığını denetle.",
          steps: [
            "25’e bölünebilmede son iki hane 00,25,50 veya 75 olmalıdır.",
            "139 a’nın son iki hanesi 9 a, yani 90–99 aralığındadır.",
            "Bu iki küme kesişmez; uygun a sayısı 0’dır.",
          ],
          optionReasons: [
            "Doğru. Son iki hane 90–99 arasındadır;25 katı olan 00,25,50,75 bloklarından hiçbiri bu aralıkta değildir.",
            "Son rakam 0 veya 5 şartını 25 için yeterli sanır;90 ve 95,25 katı değildir.",
            "00,25,50,75 dört son blok seçeneğini verilen onlar rakamı 9 ile uyumlu sanır.",
            "Bütün 0–9 rakamlarını kabul eder; son blokların hiçbiri 25’in katı değildir.",
            "a=0’ı kabul eder;1390’ın 25’e kalanı 15’tir.",
          ],
          commonError: "25 kuralını yalnız 5’in son rakam kuralına indirme.",
          check: "En yakın 25 katları 75 ve 100’dür;90–99 arasında kat yoktur.",
        },
      },
      {
        prompt:
          "Pozitif tam sayı N hem 8’e hem 18’e tam bölünüyor. Aşağıdakilerden hangisine mutlaka tam bölünür?",
        options: ["48", "54", "144", "72", "96"],
        answer: 3,
        hint: "8 ve 18’i asal kuvvetlere ayır:2³ ve 2×3².",
        explanation:
          "8 ve 18’i asal kuvvetlere ayır:2³ ve 2×3². Her asalın en büyük gerekli üssünü al:2³×3²=72. Her uygun N bu ortak katın katıdır;72’nin kendisi diğer dört iddiayı çürütür.",
        guidance: {
          knowledge: [
            "Birlikte bölünebilmede ortak şart iki bölenin EKOK’udur.",
          ],
          strategy:
            "Bölenleri asal kuvvetlere ayırıp ortak katın zorunlu kuvvetlerini belirle; seçenekleri bu zorunlu çarpan yapısına göre sına.",
          steps: [
            "8 ve 18’i asal kuvvetlere ayır:2³ ve 2×3².",
            "Her asalın en büyük gerekli üssünü al:2³×3²=72.",
            "Her uygun N bu ortak katın katıdır;72’nin kendisi diğer dört iddiayı çürütür.",
          ],
          optionReasons: [
            "48’in 3 kuvveti yeterli olsa da 16 gerektirir; N=72’nin 48’e kalanı 24’tür.",
            "54,3³ gerektirir; iki koşul yalnız 3² ister. N=72,54’e bölünmez.",
            "144 fazladan bir 2 çarpanı ister; N=72 iki koşulu sağlar ama 144’e bölünmez.",
            "Doğru. 8=2³,18=2×3²; birlikte gereken 2³×3²=72’dir.",
            "96,2⁵ gerektirir; N=72 geçerli bir karşı örnektir.",
          ],
          commonError:
            "Ortak 2 çarpanını iki kez sayarak 8×18’i zorunlu sanma.",
          check: "72/8=9,72/18=4.",
        },
      },
      {
        prompt:
          "x ve y doğal sayılarının 13 ile bölümlerinden kalanlar sırasıyla 9 ve 11’dir. x²−2 xy+y ifadesinin 13 ile bölümünden kalan kaçtır?",
        options: ["4", "6", "0", "11", "1"],
        answer: 3,
        hint: "Aynı 13 böleninde x yerine 9,y yerine 11 kalanını kullan.",
        explanation:
          "Aynı 13 böleninde x yerine 9,y yerine 11 kalanını kullan. 81−198+11=−106 hesapla. −106’ya 9×13=117 ekleyince 11 bulunur;0≤11<13.",
        guidance: {
          knowledge: [
            "Aynı bölenin kalanlarıyla polinom işlemleri yapılabilir, son değer yeniden normalleştirilir.",
          ],
          strategy:
            "Aynı modülde verilen kalanları cebirsel ifadede yerine koy; işlemleri yaptıktan sonra sonucu yasal kalan aralığına indir.",
          steps: [
            "Aynı 13 böleninde x yerine 9,y yerine 11 kalanını kullan.",
            "81−198+11=−106 hesapla.",
            "−106’ya 9×13=117 ekleyince 11 bulunur;0≤11<13.",
          ],
          optionReasons: [
            "Çapraz terimin işaretini+ yapar:81+198+11=290’ın 13’e kalanı 4’tür.",
            "−2 xy yerine−xy kullanır:81−99+11=−7’nin 13’e kalanı 6’dır.",
            "Son+y terimini atlar:81−198=−117,13’ün tam katıdır.",
            "Doğru. 9²−2×9×11+11=−106=13×(−9)+11.",
            "−2 xy terimini atlar:81+11=92’nin 13’e kalanı 1’dir.",
          ],
          commonError:
            "Negatif ara toplamı mutlak değere çevirme;13 katlarıyla aralığa getir.",
          check: "x=9,y=11 gerçek değerleri de aynı kalanı verir.",
        },
      },
      {
        prompt: "5⁸³ sayısının 7 ile bölümünden kalan kaçtır?",
        options: ["2", "5", "3", "6", "1"],
        answer: 2,
        hint: "5¹,5²,… için 7’ye kalanları ardışık hesapla:5,4,6,2,3,1.",
        explanation:
          "5¹,5²,… için 7’ye kalanları ardışık hesapla:5,4,6,2,3,1. 5⁶≡1 ve 83=6×13+5 olduğundan 5⁸³≡(5⁶)¹³·5⁵ olur. Geriye dönemin 5. terimi 3 kalır.",
        guidance: {
          knowledge: [
            "Üs hesabında gerçekten bulunan dönemin uzunluğu ve üssün konumu kullanılır.",
          ],
          strategy:
            "Tabanın kuvvetlerini aynı modülde izleyip tekrar döngüsünü belirle; üssün döngüdeki yerini kullanarak kalanı seç.",
          steps: [
            "5¹,5²,… için 7’ye kalanları ardışık hesapla:5,4,6,2,3,1.",
            "5⁶≡1 ve 83=6×13+5 olduğundan 5⁸³≡(5⁶)¹³·5⁵ olur.",
            "Geriye dönemin 5. terimi 3 kalır.",
          ],
          optionReasons: [
            "Üssü döngüde 4. konuma kaydırır;83’ün 6’ya kalanı 5’tir.",
            "Büyük üssü göz ardı edip yalnız tabanın kalanı 5’i verir.",
            "Doğru. 5 kuvvetlerinin 7’ye kalan dönemi 5,4,6,2,3,1;83≡5(mod 6),5. terim 3’tür.",
            "Dönemin 3. terimini seçer;83’ün 6’ya kalanı 3 değildir.",
            "83’ü 6’nın katı sanıp dönemin son terimini seçer;83=6×13+5’tir.",
          ],
          commonError: "Her kuvvet sorusunda 4’lü dönem varsayma.",
          check: "5⁵=3125=7×446+3.",
        },
      },
      {
        prompt: "4³⁷ sayısının 8 ile bölümünden kalan kaçtır?",
        options: ["Tanımsızdır", "0", "4", "1", "5"],
        answer: 1,
        hint: "İlk iki kuvveti sına:4¹ kalan 4,4²=16 kalan 0.",
        explanation:
          "İlk iki kuvveti sına:4¹ kalan 4,4²=16 kalan 0. 4³⁷=4²·4³⁵ olduğundan ilk çarpan 8’in katıdır. Bütün çarpımın 8’e kalanı 0’dır.",
        guidance: {
          knowledge: [
            "Bir çarpan bölenin tam katıysa tam sayı ile çarpımı da tam kattır.",
          ],
          strategy:
            "Taban ile modül aralarında asal değilken ilk kuvvetleri doğrudan incele; terslenebilirlik gerektiren döngü varsayımını peşinen kullanma.",
          steps: [
            "İlk iki kuvveti sına:4¹ kalan 4,4²=16 kalan 0.",
            "4³⁷=4²·4³⁵ olduğundan ilk çarpan 8’in katıdır.",
            "Bütün çarpımın 8’e kalanı 0’dır.",
          ],
          optionReasons: [
            "37 pozitif tam sayı üssüdür; tekrar çarpım tanımlıdır,0⁰ gibi bir durum yoktur.",
            "Doğru. 4²=16,8’e tam bölünür; pozitif kalan 35 çarpan sonucu yine 8’in katı yapar.",
            "İlk kuvvetin kalanı 4’ü bütün kuvvetlerde sabit sanır; ikinci kuvvette 0 olur.",
            "Tabanla bölen aralarında asal değilken uygun olmayan dönem teoremi varsayar;4² zaten 0 sınıfındadır.",
            "37’nin 8’e kalanı 5’i cevaplar; soru üssün değil 4³⁷’nin kalanını ister.",
          ],
          commonError:
            "Döngünün ilk terimden sıfır dışı değerlerle sürmesini zorunlu sanma.",
          check: "4³=64 örneğinde de 0 kalanına yerleşme görülür.",
        },
      },
      {
        prompt:
          "x tam sayısının 6’ya bölümünden kalanı 0–5 arasındadır. 2 x’in 6’ya bölümünden kalan 4 ise x’in 6’ya kalanı hangi değerler olabilir?",
        options: ["2 ve 5", "Yalnız 2", "1 ve 4", "0 ve 3", "Yalnız 5"],
        answer: 0,
        hint: "x’in kalanına r deyip r=0,1,2,3,4,5 adaylarını düşün.",
        explanation:
          "x’in kalanına r deyip r=0,1,2,3,4,5 adaylarını düşün. 2 r’nin 6’ya kalanları sırasıyla 0,2,4,0,2,4’tür. 4 veren r değerleri 2 ve 5’tir; ikisini de koru.",
        guidance: {
          knowledge: [
            "Ortak çarpanlı modüler eşitliklerde aynı modla sadeleştirme çözüm kaybettirebilir.",
          ],
          strategy:
            "Bilinmeyenin bütün yasal kalanlarını dene; ortak çarpanı modüler eşitlikte koşulsuz sadeleştirmek yerine hangi adayların sağladığını belirle.",
          steps: [
            "x’in kalanına r deyip r=0,1,2,3,4,5 adaylarını düşün.",
            "2 r’nin 6’ya kalanları sırasıyla 0,2,4,0,2,4’tür.",
            "4 veren r değerleri 2 ve 5’tir; ikisini de koru.",
          ],
          optionReasons: [
            "Doğru. 2×2=4,2×5=10≡4(mod 6); başka 0–5 kalanı bu koşulu sağlamaz.",
            "2 x≡4 koşulunu aynı 6 modunda 2’ye sadeleştirip 5 çözümünü kaybeder.",
            "Bu iki kalanda 2 x’in kalanı 2 olur; verilen 4 değildir.",
            "Bu iki kalanda 2 x’in kalanı 0 olur; verilen 4 değildir.",
            "2 çözümünü eksiltir;2×2’nin kalanı 4’tür.",
          ],
          commonError:
            "2 ile 6 aralarında asal olmadığı için tek sınıf sonucuna acele etme.",
          check: "x=2 ve x=5 asıl koşulda ayrı ayrı çalışır.",
        },
      },
      {
        prompt:
          "Bir tam sayı N’nin 4’e bölümünden kalan 1,6’ya bölümünden kalan 2 olsun. Bu koşulları birlikte sağlayan N için hangisi doğrudur?",
        options: [
          "Böyle bir tam sayı yoktur.",
          "En küçük pozitif N=13’tür.",
          "En küçük pozitif N=14’tür.",
          "En küçük pozitif N=26’dır.",
          "En küçük pozitif N=19’dur.",
        ],
        answer: 0,
        hint: "N=4 k+1 ifadesi her zaman tek bir tam sayıdır.",
        explanation:
          "N=4 k+1 ifadesi her zaman tek bir tam sayıdır. N=6ℓ+2 ifadesi her zaman çift bir tam sayıdır. Teklik ve çiftlik çeliştiği için çözüm kümesi boştur.",
        guidance: {
          knowledge: [
            "İki kalan koşulunun uyumu, ortak bölenin kalan farkını bölmesini gerektirir.",
          ],
          strategy:
            "İki kalan koşulunun ortak bölen üzerinden uyumunu denetle; özellikle tek ve çift olma zorunluluklarının çelişip çelişmediğine bak.",
          steps: [
            "N=4 k+1 ifadesi her zaman tek bir tam sayıdır.",
            "N=6ℓ+2 ifadesi her zaman çift bir tam sayıdır.",
            "Teklik ve çiftlik çeliştiği için çözüm kümesi boştur.",
          ],
          optionReasons: [
            "Doğru. İlk koşul N’yi tek, ikinci çift yapar; aynı sayı ikisi olamaz.",
            "13’ün 4’e kalanı 1 ama 6’ya kalanı 1’dir; ikinci koşulu sağlamaz.",
            "14’ün 6’ya kalanı 2 ama 4’e kalanı 2’dir; ilk koşulu sağlamaz.",
            "26’nın 6’ya kalanı 2 ama 4’e kalanı 2’dir; ilk koşul yine bozulur.",
            "19’un 4’e kalanı 3,6’ya kalanı 1’dir; iki kalan da yanlıştır.",
          ],
          commonError:
            "İki şartın ayrı ayrı mümkün olmasını birlikte mümkün sanma.",
          check: "EBOB(4,6)=2, kalan farkı 2−1=1’i bölmez.",
        },
      },
      {
        prompt:
          "50≤N≤100 aralığındaki doğal sayılardan 4’e bölündüğünde 3,6’ya bölündüğünde 5 kalanını veren kaç sayı vardır?",
        options: ["3", "5", "12", "4", "8"],
        answer: 3,
        hint: "4’e kalanı 3 olan adaylar arasında 6’ya kalanı 5 veren ilk sınıf 11’dir.",
        explanation:
          "4’e kalanı 3 olan adaylar arasında 6’ya kalanı 5 veren ilk sınıf 11’dir. 12 eklemek iki kalanı da korur;50–100 içinde 59,71,83,95 elde edilir. Önceki 47 alt, sonraki 107 üst sınırın dışındadır; toplam 4 aday kalır.",
        guidance: {
          knowledge: [
            "İki kalan koşulunu sağlayan bir sınıf, ortak kat adımıyla tekrar eder.",
          ],
          strategy:
            "İki kalan koşulunu sağlayan ortak sınıfı ve tekrar aralığını bul; sonra bu sınıfın verilen kapalı aralıktaki elemanlarını say.",
          steps: [
            "4’e kalanı 3 olan adaylar arasında 6’ya kalanı 5 veren ilk sınıf 11’dir.",
            "12 eklemek iki kalanı da korur;50–100 içinde 59,71,83,95 elde edilir.",
            "Önceki 47 alt, sonraki 107 üst sınırın dışındadır; toplam 4 aday kalır.",
          ],
          optionReasons: [
            "95 adayını eksiltir;95≤100 ve 95=4×23+3=6×15+5’tir.",
            "47 veya 107 adayını ekler; bu sayılar verilen aralığın dışındadır.",
            "Ortak adım EKOK(4,6)=12’yi uygun sayı adedi sanır.",
            "Doğru. Ortak sınıf N=12 k+11’dir; aralıkta 59,71,83,95 bulunur.",
            "Yalnız 6’ya kalan 5 koşulunun 8 adayını sayar: 53, 59, 65, 71, 77, 83, 89, 95. 4’e kalan 3 filtresi ayrıca gerekir.",
          ],
          commonError:
            "Ortak adımı, seçilen aralıkta kaç aday olduğuyla karıştırma.",
          check: "59=4×14+3=6×9+5; kalan adaylar 12 artışlıdır.",
        },
      },
      {
        prompt:
          "A,B,C,D,E harfleri bu sırayla 1. konumdan başlayarak sürekli tekrarlanıyor. 83. ve 85. konumlardaki harfler sırasıyla hangileridir?",
        options: ["E; C", "C; A", "D; A", "B; E", "C; E"],
        answer: 4,
        hint: "Her 5 konum bir tam harf grubudur.",
        explanation:
          "Her 5 konum bir tam harf grubudur. 83’ün 5’e kalanı 3,85’in kalanı 0’dır. 1’den sayımda 3→C,0→beşinci E olduğundan sonuç C;E olur.",
        guidance: {
          knowledge: [
            "Döngü eşlemesi başlangıç indeksine bağlıdır;1’den sayımda kalan 0 son elemandır.",
          ],
          strategy:
            "Konumu tekrar uzunluğuna göre grupla; tam bölünen konumun yeni grubun başı değil önceki grubun sonu olduğunu koru.",
          steps: [
            "Her 5 konum bir tam harf grubudur.",
            "83’ün 5’e kalanı 3,85’in kalanı 0’dır.",
            "1’den sayımda 3→C,0→beşinci E olduğundan sonuç C;E olur.",
          ],
          optionReasons: [
            "İstenen 83. ve 85. sırasını ters verir.",
            "83’ü doğru eşler ama kalan 0’ı grubun ilk harfi sanır;0 son harfe karşılık gelir.",
            "0’dan başlayan indeksleme yapar; soru 1. konumdaA ile başlar.",
            "83’ün kalan 3’ünü ikinci harfle eşler; üçüncü harfC’dir.",
            "Doğru. 83=5×16+3 üçüncü C’yi;85=5×17+0 tam grubun son E’sini verir.",
          ],
          commonError: "0 kalanı ile ilk sırayı otomatik eşleme.",
          check: "81=A,82=B,83=C,84=D,85=E dizisi doğrular.",
        },
      },
      {
        prompt:
          "N doğal sayısının 9’a bölümünden kalan 7’dir. N’nin onluk yazımının sağına 24 iki haneli bloğu ekleniyor; yeni değer 100 N+24’tür. Yeni sayının 9’a kalanı kaçtır?",
        options: ["2", "6", "4", "7", "13"],
        answer: 2,
        hint: "İki haneli ekleme 100 N+24 biçimindedir.",
        explanation:
          "İki haneli ekleme 100 N+24 biçimindedir. 9’a göre 100’ün kalanı 1,24’ün kalanı 6; yeni ifade 7+6 ile aynı sınıftadır. 13=9×1+4 olduğundan son kalan 4’tür.",
        guidance: {
          knowledge: [
            "Aynı modda katsayı ve sabitler kendi kalanlarıyla değiştirilebilir.",
          ],
          strategy:
            "Sağa blok eklemeyi on kuvvetiyle çarpma ve toplama olarak yaz; aynı bölen için verilen kalanı bu ifadede kullan.",
          steps: [
            "İki haneli ekleme 100 N+24 biçimindedir.",
            "9’a göre 100’ün kalanı 1,24’ün kalanı 6; yeni ifade 7+6 ile aynı sınıftadır.",
            "13=9×1+4 olduğundan son kalan 4’tür.",
          ],
          optionReasons: [
            "24 yerine yalnız son rakam 4’ü ekler:7+4=11’in 9’a kalanı 2’dir.",
            "Yalnız 24’ün kalanı 6’yı alır;100 N kısmının 7 kalanı da vardır.",
            "Doğru. 100≡1,24≡6(mod 9);7+6=13≡4.",
            "Eklenen 24 bloğunun 6 kalanını hiç hesaba katmaz.",
            "7+6 ara toplamını 9’dan küçük son kalana indirmez.",
          ],
          commonError: "Ara kalan toplamını son kalan diye bırakma.",
          check: "N=7 seçilirse 724=9×80+4.",
        },
      },
      {
        prompt:
          "7’ye tam bölünme için kullanılan dönüşüm 10 q+d →q−2 d, bölünebilme kararını korur; aynı kalanı korumak zorunda değildir. 487’nin 7 ile bölümünden gerçek kalan kaçtır?",
        options: ["0", "4", "34", "6", "69"],
        answer: 1,
        hint: "487’yi 7’nin komşu katlarıyla karşılaştır:7×69=483,7×70=490.",
        explanation:
          "487’yi 7’nin komşu katlarıyla karşılaştır:7×69=483,7×70=490. 487−483=4 ve 0≤4<7’dir. Kısa testte 34 elde edilmesi yalnız tam bölünmeme kararını doğrular; onun kalanı 6’yı 487’ye taşıma.",
        guidance: {
          knowledge: [
            "Tam bölünme testiyle kalan koruyan dönüşüm aynı matematiksel sözleşme değildir.",
          ],
          strategy:
            "Bölünebilme kararını koruyan dönüşümle gerçek kalanı ayır; istenen kalanı asıl sayı için bölme eşitliğinden denetle.",
          steps: [
            "487’yi 7’nin komşu katlarıyla karşılaştır:7×69=483,7×70=490.",
            "487−483=4 ve 0≤4<7’dir.",
            "Kısa testte 34 elde edilmesi yalnız tam bölünmeme kararını doğrular; onun kalanı 6’yı 487’ye taşıma.",
          ],
          optionReasons: [
            "Tam bölündüğünü ileri sürer; ne 487 ne de dönüşmüş 34,7’nin katıdır.",
            "Doğru. 487=7×69+4; dönüşmüş 34’ün kalanı 6, başlangıç sayısının kalanı değildir.",
            "Kısa testte elde edilen 48−14 ara değerini cevaplar;34≥7 olduğundan son kalan olamaz.",
            "48−2×7=34 dönüşümünün 7’ye kalanını 487’ye aynen atar; test aynı kalanı korumaz.",
            "Tam bölüm 69’u kalan sanır; kalan 7’den küçük olmalıdır.",
          ],
          commonError:
            "Kısa yöntemin koruduğu bilgiden daha fazlasını varsayma.",
          check: "7×69+4=487.",
        },
      },
      {
        prompt:
          "Bir doğal sayı aynı pozitif tam sayı b’ye bölünüyor. Sayı 253 artırılınca kalan yine 9 kalıyor ve tam bölüm 23 artıyor. b kaçtır?",
        options: ["23", "11", "253", "10", "9"],
        answer: 1,
        hint: "İlk A=bq+9, sonraki A+253=b(q+23)+9 olarak yazılır.",
        explanation:
          "İlk A=bq+9, sonraki A+253=b(q+23)+9 olarak yazılır. İkinci eşitlikten ilkini çıkar:253=23 b. b=11; kalan 9 gerçekten 11’den küçüktür.",
        guidance: {
          knowledge: [
            "Bölen ve kalan sabitken bölünen farkı, bölen×bölüm farkına eşittir.",
          ],
          strategy:
            "Değişimden önceki ve sonraki bölme eşitliklerini çıkar; aynı kalanlar yok olunca artışları bölen üzerinden ilişkilendir.",
          steps: [
            "İlk A=bq+9, sonraki A+253=b(q+23)+9 olarak yazılır.",
            "İkinci eşitlikten ilkini çıkar:253=23 b.",
            "b=11; kalan 9 gerçekten 11’den küçüktür.",
          ],
          optionReasons: [
            "Bölüm artışını bölen sanır;23×23=529,253 değildir.",
            "Doğru. İki bölme eşitliği çıkarılınca 253=23 b; b=11 ve 9<11.",
            "Bölünen artışını bölüm artışına bölmeden cevaplar.",
            "Kalandan büyük en küçük böleni seçer;10×23=230,253 artışını vermez.",
            "Kalanı bölen seçer;9<9 koşulu sağlanmaz.",
          ],
          commonError:
            "Kalan sınırını sağlamak gerekli olsa da bölüm farkı eşitliğinin yerine geçmez.",
          check: "23×11=253 ve 9<11.",
        },
      },
    ],
  },
  {
    id: "ebob-ekok-ileri",
    base: "ebob-ekok",
    title: "EBOB ve EKOK: ileri parça, faz ve sayı koşulları",
    questions: [
      {
        prompt: "84 ve 132 sayılarının kaç pozitif ortak böleni vardır?",
        options: ["6", "2", "8", "12", "4"],
        answer: 0,
        hint: "84=2²×3×7 ve 132=2²×3×11 olduğundan EBOB 12’dir.",
        explanation:
          "84=2²×3×7 ve 132=2²×3×11 olduğundan EBOB 12’dir. Ortak bölenler 12’nin bölenleriyle aynıdır.2’nin üssü 0,1,2;3’ün üssü 0,1 seçilir. 3×2=6 bölen bulunur:1,2,3,4,6,12.",
        guidance: {
          knowledge: [
            "Ortak pozitif bölenlerin kümesi EBOB’un pozitif bölenleri kümesidir.",
          ],
          strategy:
            "Önce ortak bölenlerin en büyüğünü asal çarpanlardan kur; ortak bölen adedini bu sayının pozitif bölenlerini sayarak bul.",
          steps: [
            "84=2²×3×7 ve 132=2²×3×11 olduğundan EBOB 12’dir.",
            "Ortak bölenler 12’nin bölenleriyle aynıdır.2’nin üssü 0,1,2;3’ün üssü 0,1 seçilir.",
            "3×2=6 bölen bulunur:1,2,3,4,6,12.",
          ],
          optionReasons: [
            "Doğru. EBOB 12=2²×3 olduğundan ortak pozitif bölen sayısı(2+1)(1+1)=6’dır.",
            "Yalnız ortak asal bölenler 2 ve 3’ü sayar;1,4,6,12 de ortak bölenlerdir.",
            "EBOB’u 2³×3 gibi alıp(3+1)×2 hesaplar;12’de 2’nin üssü 2’dir.",
            "Ortak bölenlerin en büyüğü 12’yi onların adedi sanır.",
            "12’de 2’nin üssünü 2 yerine 1 alıp (1+1)(1+1)=4 hesaplar. Oysa 2 için üç üs seçeneği vardır: 0, 1 ve 2.",
          ],
          commonError:
            "Bölen sayısını EBOB’un değeri veya ortak asal adediyle karıştırma.",
          check:
            "12 hem 84’ü hem 132’yi böler; listelenen her bölen 12’yi de böler.",
        },
      },
      {
        prompt:
          "a,b pozitif tam sayıları için a:b=5:8 ve EBOB(a,b)=7 veriliyor. EKOK(a,b) kaçtır?",
        options: ["1960", "7", "280", "40", "56"],
        answer: 2,
        hint: "Orana göre a=5 k,b=8 k; EBOB(5,8)=1 olduğundan ortak bölen k’dır.",
        explanation:
          "Orana göre a=5 k,b=8 k; EBOB(5,8)=1 olduğundan ortak bölen k’dır. k=7 ile sayılar 35 ve 56 olur. EKOK=(35/7)×56=280 bulunur.",
        guidance: {
          knowledge: [
            "Aralarında asal oran terimleri ortak EBOB ölçeğini doğrudan belirler.",
          ],
          strategy:
            "Aralarında asal oran bileşenlerini ortak ölçekle yaz; verilen EBOB ile ölçeği belirleyip buradan ortak katı kur.",
          steps: [
            "Orana göre a=5 k,b=8 k; EBOB(5,8)=1 olduğundan ortak bölen k’dır.",
            "k=7 ile sayılar 35 ve 56 olur.",
            "EKOK=(35/7)×56=280 bulunur.",
          ],
          optionReasons: [
            "a×b=35×56 sonucunu doğrudan EKOK sayar; ortak 7’ye bölmek gerekir.",
            "Verilmiş EBOB’u EKOK yerine cevaplar.",
            "Doğru. 5 ve 8 aralarında asal olduğundan a=35,b=56; EKOK=7×5×8=280.",
            "Ortak 7 ölçeğini atıp yalnız 5×8 hesaplar.",
            "Büyük sayı 56’yı EKOK sayar;35,56’yı bölmez.",
          ],
          commonError:
            "İki sayının büyüğünün EKOK olması için küçüğün büyüğü bölmesi gerekir.",
          check: "280/35=8,280/56=5 tam sayıdır.",
        },
      },
      {
        prompt:
          "EBOB(a,b)=4 ve EKOK(a,b)=240 olan pozitif tam sayı çiftleri a≤b koşuluyla sayılıyor. Kaç farklı çift vardır?",
        options: ["6", "4", "3", "8", "60"],
        answer: 1,
        hint: "a=4 x,b=4 y yaz:xy=240/4=60 ve EBOB(x,y)=1 gerekir.",
        explanation:
          "a=4 x,b=4 y yaz:xy=240/4=60 ve EBOB(x,y)=1 gerekir. x≤y çarpan çiftleri 1,60;2,30;3,20;4,15;5,12;6,10’dur. Ortak böleni 2 olan iki çift elenir; kalan dört çift ölçeklenince dört farklı(a,b) verir.",
        guidance: {
          knowledge: [
            "Verilen EBOB ile küçültülen iki sayı aralarında asal kalmalıdır.",
          ],
          strategy:
            "İki sayıdan ortak EBOB çarpanını ayır; kalan aralarında asal çarpanların asal kuvvetleri nasıl paylaşacağını sayarken sıra kısıtını uygula.",
          steps: [
            "a=4 x,b=4 y yaz:xy=240/4=60 ve EBOB(x,y)=1 gerekir.",
            "x≤y çarpan çiftleri 1,60;2,30;3,20;4,15;5,12;6,10’dur.",
            "Ortak böleni 2 olan iki çift elenir; kalan dört çift ölçeklenince dört farklı(a,b) verir.",
          ],
          optionReasons: [
            "60’ın bütün çarpan çiftlerini alıp(2,30) ve(6,10) ortak bölenlerini elemez.",
            "Doğru. xy=60 ve EBOB(x,y)=1 için(1,60),(3,20),(4,15),(5,12) dört uygun çift verir.",
            "(4,15) çiftini gereksiz eler;4 ile 15 aralarında asaldır.",
            "Dört uygun çiftin terslerini de ayrı sayar; a≤b şartı sırasız sayım getirir.",
            "Küçültülmüş çarpım xy=60’ı çift adediyle karıştırır.",
          ],
          commonError:
            "Çarpım koşulunu sağlamak tek başına gerçek EBOB’u korumaz.",
          check:
            "Çiftler(4,240),(12,80),(16,60),(20,48) asıl koşulları sağlar.",
        },
      },
      {
        prompt:
          "EBOB(a,b)=8 ve EKOK(a,b)=90 olacak pozitif tam sayı a,b çifti aranıyor. Aşağıdakilerden hangisi doğrudur?",
        options: [
          "(24,30) uygundur.",
          "Uygun çift yoktur.",
          "(18,40) uygundur.",
          "(8,90) uygundur.",
          "(16,45) uygundur.",
        ],
        answer: 1,
        hint: "a=8 x,b=8 y yazılsaydı EKOK=8 xy olmalıydı.",
        explanation:
          "a=8 x,b=8 y yazılsaydı EKOK=8 xy olmalıydı. 90=8 xy eşitliği xy=11,25 verir; pozitif tam sayı çarpımı olamaz. Dolayısıyla hiçbir çift yoktur.",
        guidance: {
          knowledge: ["Pozitif iki sayının EBOB’u,EKOK’unun bir bölenidir."],
          strategy:
            "Aday sayı çifti aramadan önce EBOB'un EKOK'u bölmesi gereğini denetle; yapısal uyumsuzluk varsa bunu gerekçelendir.",
          steps: [
            "a=8 x,b=8 y yazılsaydı EKOK=8 xy olmalıydı.",
            "90=8 xy eşitliği xy=11,25 verir; pozitif tam sayı çarpımı olamaz.",
            "Dolayısıyla hiçbir çift yoktur.",
          ],
          optionReasons: [
            "Bu çiftin EBOB’u 6,EKOK’u 120’dir.",
            "Doğru. EBOB,EKOK’u bölmelidir;8,90’ı bölmediği için koşullar olanaksızdır.",
            "Bu çiftin EBOB’u 2,EKOK’u 360’tır.",
            "Bu çiftin EBOB’u 2,EKOK’u 360’tır; verilen 8 ve 90 değildir.",
            "Bu çift aralarında asaldır; EBOB 1,EKOK 720 olur.",
          ],
          commonError:
            "Verilen her EBOB/EKOK ikilisinin mutlaka gerçekleşebileceğini varsayma.",
          check: "90’ın 8’e kalanı 2’dir; gerekli tam bölünme sağlanmaz.",
        },
      },
      {
        prompt:
          "30,42,70 sayıları için EBOB(30,42,70)·EKOK(30,42,70) çarpımı kaçtır?",
        options: ["1260", "420", "88200", "210", "2"],
        answer: 1,
        hint: "30=2×3×5,42=2×3×7,70=2×5×7 yaz.",
        explanation:
          "30=2×3×5,42=2×3×7,70=2×5×7 yaz. Üçünde ortak asal yalnız 2; bütün gerekli asal kuvvetler 2×3×5×7=210’dur. İstenen 2×210=420’dir.",
        guidance: {
          knowledge: [
            "Çok sayıda ortak bölen/kat için bütün sayılardaki min/max üsler alınır.",
          ],
          strategy:
            "Üç sayıda her asalın en küçük ve en büyük kuvvetini ayrı belirle; iki sayıya özgü çarpım bağıntısını üç sayıya taşımadan işlemi kur.",
          steps: [
            "30=2×3×5,42=2×3×7,70=2×5×7 yaz.",
            "Üçünde ortak asal yalnız 2; bütün gerekli asal kuvvetler 2×3×5×7=210’dur.",
            "İstenen 2×210=420’dir.",
          ],
          optionReasons: [
            "İlk iki sayının EBOB’u 6’yı üçüncü 70 ile yeniden denetlemez;6,70’i bölmez.",
            "Doğru. Üçünün EBOB’u 2,EKOK’u 2×3×5×7=210; çarpımları 420’dir.",
            "30×42×70 başlangıç çarpımını kullanır; iki sayılı EBOB×EKOK özdeşliği üç sayıya genellenmez.",
            "Yalnız EKOK’u hesaplar; EBOB 2 ile çarpmaz.",
            "Yalnız EBOB’u hesaplar; EKOK 210’u kullanmaz.",
          ],
          commonError:
            "İlk iki sayının EBOB’unu üçüncü sayıya kontrol etmeden taşıma.",
          check: "210/30=7,210/42=5,210/70=3;2 hepsini böler.",
        },
      },
      {
        prompt:
          "x pozitif tam sayıdır. EBOB(12,20,x)=4 ve EKOK(12,20,x)=420 koşullarını sağlayan en küçük x kaçtır?",
        options: ["14", "7", "84", "420", "28"],
        answer: 4,
        hint: "12=2²×3,20=2²×5; ikili EBOB 4,EKOK 60 olur.",
        explanation:
          "12=2²×3,20=2²×5; ikili EBOB 4,EKOK 60 olur. 420=2²×3×5×7 için x en az 7 taşımalı; EBOB’un 4 kalması için 4|x gerekir. En küçük ortak gereksinim x=4×7=28; üçlü EBOB 4 ve EKOK 420 olur.",
        guidance: {
          knowledge: [
            "Bilinmeyen üçüncü sayıda ortak bölen ve ortak kat şartları ayrı ayrı korunur.",
          ],
          strategy:
            "Hedef EBOB ve EKOK'un her asal için gerektirdiği alt ve üst kuvvetleri karşılaştır; eksik zorunlu kuvvetleri en küçük sayıda tamamla.",
          steps: [
            "12=2²×3,20=2²×5; ikili EBOB 4,EKOK 60 olur.",
            "420=2²×3×5×7 için x en az 7 taşımalı; EBOB’un 4 kalması için 4|x gerekir.",
            "En küçük ortak gereksinim x=4×7=28; üçlü EBOB 4 ve EKOK 420 olur.",
          ],
          optionReasons: [
            "7 ve 2 taşır fakat 4’e bölünmez; üçlü EBOB 2 olur.",
            "Eksik 7 çarpanını ekler ama EBOB koşulu için x’in 4’e bölünmesini sağlamaz.",
            "Koşulları sağlar ama 28’den büyüktür;3 çarpanı zorunlu değildir.",
            "Ortak katın kendisini x seçer; uygundur fakat en küçük 28 değildir.",
            "Doğru. Başlangıç EBOB 4 ve EKOK 60’tır; x,4’e ve eksik 7’ye bölünmelidir. En küçük 28 çalışır.",
          ],
          commonError:
            "Yalnız eksik asal çarpanı ekleyip EBOB koşulunu atlama.",
          check: "EBOB(4,28)=4 ve EKOK(60,28)=420.",
        },
      },
      {
        prompt:
          "35 cm ve 49 cm uzunlukta iki ip,kesim kaybı olmadan en uzun eş parçalara ayrı ayrı kesiliyor. Toplam kaç parça elde edilir?",
        options: ["10", "245", "35", "7", "12"],
        answer: 4,
        hint: "Parça boyu her ipi tam bölmeli; EBOB(35,49)=7 cm’dir.",
        explanation:
          "Parça boyu her ipi tam bölmeli; EBOB(35,49)=7 cm’dir. Birinci ip 5,ikinci ip 7 eş parça verir. Ayrı iplerin parçalarını topla:5+7=12.",
        guidance: {
          knowledge: [
            "En uzun eş parçanın boyu EBOB; ayrı bütünlerden çıkan adetler toplamdır.",
          ],
          strategy:
            "Eş parça boyunun her ipi tam bölmesini sağla ve bu boyu en büyük seç; parça adetlerini ayrı hesaplayıp kesim adediyle karıştırma.",
          steps: [
            "Parça boyu her ipi tam bölmeli; EBOB(35,49)=7 cm’dir.",
            "Birinci ip 5,ikinci ip 7 eş parça verir.",
            "Ayrı iplerin parçalarını topla:5+7=12.",
          ],
          optionReasons: [
            "Toplam kesim sayısını verir:(5−1)+(7−1)=10; soru parça adedini ister.",
            "35 ve 49’un EKOK’u 245’i cevaplar; bu uzunluk iki ipin içine sığan ortak parça değildir.",
            "İki ipteki 5 ve 7 adetlerini çarpar; ayrı iplerin parçaları toplanmalıdır.",
            "Parça boyu 7 cm’yi parça adedi sanır.",
            "Doğru. En uzun ortak boy 7 cm;35/7+49/7=5+7=12 parça.",
          ],
          commonError: "Parça boyu,parça adedi ve kesim adedini ayır.",
          check: "12×7=84 cm=35+49 toplam uzunluktur.",
        },
      },
      {
        prompt:
          "54 cm×90 cm dikdörtgen,kenarlara paralel eş karelerle boşluksuz kaplanıyor. Kare kenarı santimetre cinsinden pozitif tam sayıdır; kesme/derz yoktur. En az kaç kare gerekir?",
        options: ["18", "4860", "15", "8", "30"],
        answer: 2,
        hint: "En az kare,en büyük uygun kare kenarını gerektirir;54 ve 90’ın EBOB’u 18’dir.",
        explanation:
          "En az kare,en büyük uygun kare kenarını gerektirir;54 ve 90’ın EBOB’u 18’dir. İki yönde 54/18=3 ve 90/18=5 kare bulunur. Toplam 3×5=15; alan kontrolü 4860/324=15 verir.",
        guidance: {
          knowledge: [
            "Kare kenarı her iki kenarı böler; adet iki yöndeki sayıların çarpımıdır.",
          ],
          strategy:
            "Kare adedini azaltmak için uygun kare kenarını büyüt; iki dikdörtgen kenarını bu uzunluğa bölerek iki yöndeki kare sayılarını çarp.",
          steps: [
            "En az kare,en büyük uygun kare kenarını gerektirir;54 ve 90’ın EBOB’u 18’dir.",
            "İki yönde 54/18=3 ve 90/18=5 kare bulunur.",
            "Toplam 3×5=15; alan kontrolü 4860/324=15 verir.",
          ],
          optionReasons: [
            "Kare kenarı 18 cm’yi kare adedi yerine verir.",
            "Dikdörtgen alanı 54×90 cm²’yi kare sayısı sanır; her küçük kare 324 cm²’dir.",
            "Doğru. En büyük kare kenarı EBOB 18 cm;3×5=15 kare gerekir.",
            "Kenarlar boyunca 3 ve 5 adetlerini toplar; iki boyutlu bölgede çarpılmalıdır.",
            "15 kareyi iki kat sayar; yalnız verilen düzlemsel dikdörtgen kaplanmaktadır.",
          ],
          commonError: "“En az” sözcüğünden doğrudan EKOK seçme.",
          check: "15×18²=54×90.",
        },
      },
      {
        prompt:
          "42 cm×70 cm×98 cm dikdörtgenler prizması kenarlara paralel eş küplere kayıpsız ayrılıyor. Küp kenarı pozitif tam santimetre ve mümkün en büyük değerde seçiliyor. Kaç küp oluşur?",
        options: ["21", "14", "105", "35", "15"],
        answer: 2,
        hint: "42,70,98’in ortak en büyük böleni 14’tür.",
        explanation:
          "42,70,98’in ortak en büyük böleni 14’tür. Her eksendeki küp adetleri 42/14=3,70/14=5,98/14=7 olur. Toplam 3×5×7=105 küp oluşur.",
        guidance: {
          knowledge: [
            "Üç boyutlu kayıpsız bölmede eş küp kenarı bütün ölçüleri böler ve adet üç bölümün çarpımıdır.",
          ],
          strategy:
            "Küp kenarını üç uzunluğun da ortak böleni olarak seç; en büyük uygun kenarla her yöndeki küp adetlerinin çarpımını kullan.",
          steps: [
            "42,70,98’in ortak en büyük böleni 14’tür.",
            "Her eksendeki küp adetleri 42/14=3,70/14=5,98/14=7 olur.",
            "Toplam 3×5×7=105 küp oluşur.",
          ],
          optionReasons: [
            "3×7 hesabıyla 70 cm yönündeki 5 adedi atlar.",
            "En büyük küp kenarı 14 cm’yi küp adedi sanır.",
            "Doğru. EBOB 14 cm; üç yöndeki 3,5,7 adetlerinin çarpımı 105’tir.",
            "5×7 hesabıyla 42 cm yönündeki 3 adedi atlar.",
            "3×5 hesabıyla üçüncü yöndeki 7 katmanı atlar.",
          ],
          commonError: "Bir ekseni veya hacim boyutunu unutma.",
          check: "105×14³=42×70×98 hacimleri eşitler.",
        },
      },
      {
        prompt:
          "Bir grupta 6 cm kenarlı,bir başka grupta 15 cm kenarlı küpler var. Her grup yalnız kendi küpleriyle,kesmeden,kenarlar paralel olacak şekilde birer dolu büyük küp yapacak. İki büyük küpün kenarı eşit ve en küçük olsun. İki grupta toplam kaç küçük küp kullanılır?",
        options: ["30", "7", "8", "133", "250"],
        answer: 3,
        hint: "Büyük kenar 6 ve 15’in ortak katıdır; EKOK 30 cm seçilir.",
        explanation:
          "Büyük kenar 6 ve 15’in ortak katıdır; EKOK 30 cm seçilir. 6 cm’liklerde her eksende 5,toplam 125;15 cm’liklerde her eksende 2,toplam 8 küp gerekir. İki ayrı büyük küp için 125+8=133 parça toplanır.",
        guidance: {
          knowledge: [
            "Ayrı boy küplerle eş büyük küpler kurarken ortak kenar EKOK,parça sayısı hacim oranıdır.",
          ],
          strategy:
            "İki grupta yapılacak büyük küpün ortak en küçük kenarını belirle; her grubun üç boyutlu küp adedini ayrı hesaplayıp topla.",
          steps: [
            "Büyük kenar 6 ve 15’in ortak katıdır; EKOK 30 cm seçilir.",
            "6 cm’liklerde her eksende 5,toplam 125;15 cm’liklerde her eksende 2,toplam 8 küp gerekir.",
            "İki ayrı büyük küp için 125+8=133 parça toplanır.",
          ],
          optionReasons: [
            "Ortak büyük kenarı cm olarak bulur ama parça sayısına geçmez.",
            "Eksendeki 5 ve 2 adetlerini toplar; küp sayıları için her biri üçüncü kuvvete çıkarılmalıdır.",
            "Yalnız 15 cm’lik grupta kullanılan 2³=8 küpü sayar.",
            "Doğru. Ortak büyük kenar 30 cm;6 cm’likten 5³=125,15 cm’likten 2³=8,toplam 133.",
            "İki grupta da 6 cm küp varmış gibi 125’i ikiye katlar; ikinci grubun küpleri 15 cm’dir.",
          ],
          commonError: "Kenar oranını hacim adedi yerine kullanma.",
          check: "125×6³=8×15³=30³; iki büyük küpün hacimleri eşittir.",
        },
      },
      {
        prompt:
          "32 m×56 m dikdörtgenin çevresine bütün köşeler dahil,en büyük eş aralıkla işaret konuyor. Kaç farklı işaret gerekir?",
        options: ["8", "176", "23", "22", "11"],
        answer: 3,
        hint: "Köşelere uymak için ortak aralık 32 ve 56’yı bölmeli; en büyüğü 8 m’dir.",
        explanation:
          "Köşelere uymak için ortak aralık 32 ve 56’yı bölmeli; en büyüğü 8 m’dir. Çevre 2×(32+56)=176 m bulunur. Kapalı çevrede başlangıç tekrarlanmaz:176/8=22 işaret.",
        guidance: {
          knowledge: ["Kapalı çevrede nokta adedi aralık adedine eşittir."],
          strategy:
            "Köşelere uyan en büyük ortak aralığı seç; kapalı çevrede başlangıç ve bitiş aynı nokta olduğundan onu ikinci kez sayma.",
          steps: [
            "Köşelere uymak için ortak aralık 32 ve 56’yı bölmeli; en büyüğü 8 m’dir.",
            "Çevre 2×(32+56)=176 m bulunur.",
            "Kapalı çevrede başlangıç tekrarlanmaz:176/8=22 işaret.",
          ],
          optionReasons: [
            "En büyük aralık 8 m’yi işaret sayısı yerine verir.",
            "Çevre uzunluğunu nokta adedi sanır.",
            "Kapalı çevrede başlangıç ve bitiş aynı olduğu hâlde bir daha+1 ekler.",
            "Doğru. Aralık EBOB 8 m,çevre 176 m; kapalı çevrede 176/8=22 farklı nokta vardır.",
            "Yarı çevre 32+56=88’i 8’e böler; dört kenarın tamamını saymaz.",
          ],
          commonError: "Açık doğru parçasındaki+1 kuralını çevreye taşıma.",
          check:
            "Her 32 m kenarda 4,her 56 m kenarda 7 aralık; toplam 2×4+2×7=22.",
        },
      },
      {
        prompt:
          "84 cm ve 60 cm iki uzunluğa da tam uyan en büyük tam santimetre aralık seçiliyor. Yalnız 84 cm’lik açık doğru parçasına bu aralıkla iki uç dahil işaret konulursa kaç işaret olur?",
        options: ["13", "6", "7", "12", "8"],
        answer: 4,
        hint: "EBOB(84,60)=12 cm ortak en büyük aralıktır.",
        explanation:
          "EBOB(84,60)=12 cm ortak en büyük aralıktır. 84/12=7 eş aralık oluşur. Açık doğru parçasında iki uç dahil nokta sayısı 7+1=8’dir.",
        guidance: {
          knowledge: [
            "Açık bir doğru parçasında iki uç dahil nokta adedi aralık adedinden 1 fazladır.",
          ],
          strategy:
            "Önce iki uzunluğa da uyan aralığı belirle; açık doğru parçasında aralık adedi ile iki uç dahil işaret adedini ayrı hesapla.",
          steps: [
            "EBOB(84,60)=12 cm ortak en büyük aralıktır.",
            "84/12=7 eş aralık oluşur.",
            "Açık doğru parçasında iki uç dahil nokta sayısı 7+1=8’dir.",
          ],
          optionReasons: [
            "İki parçanın aralıklarını yanlış birlikte sayıp 7+5+1=13 hesaplar; yalnız 84 cm’lik parçaya işaret konuluyor.",
            "7 eş parçanın iç kesim sayısını verir; uç işaretleri de isteniyor.",
            "84/12 ile yalnız aralıkları sayar; iki uç dahil bir fazla nokta gerekir.",
            "Ortak aralık 12 cm’yi nokta sayısı sanır.",
            "Doğru. EBOB 12 cm;84 cm’de 7 aralık ve 8 uç noktası vardır.",
          ],
          commonError:
            "İşaret konulmayan 60 cm’lik parçanın adetlerini sonuca ekleme.",
          check: "İşaretler 0,12,24,36,48,60,72,84 konumlarındadır.",
        },
      },
      {
        prompt:
          "A cihazı 9,B cihazı 15 dakikada bir çalışıyor. İlk ortak çalışma 11.20’de ve bu an 1. ortak olay sayılıyor.4. ortak çalışma saat kaçta olur?",
        options: ["13.35", "12.05", "12.55", "14.20", "11.20"],
        answer: 0,
        hint: "EKOK(9,15)=45 dakika ortak tekrar aralığıdır.",
        explanation:
          "EKOK(9,15)=45 dakika ortak tekrar aralığıdır. İlk olay başlangıçta sayıldığı için 4. olaya 3 aralık,135 dakika vardır. 135 dk=2 sa 15 dk;11.20’ye ekleyince 13.35 olur.",
        guidance: {
          knowledge: [
            "Başlangıç dahil k. ortak olay(k−1) ortak periyot sonra gelir.",
          ],
          strategy:
            "Ortak tekrar süresini bul; başlangıç anı zaten birinci olay olduğundan istenen olay numarasından bir eksik tekrar kadar süre ekle.",
          steps: [
            "EKOK(9,15)=45 dakika ortak tekrar aralığıdır.",
            "İlk olay başlangıçta sayıldığı için 4. olaya 3 aralık,135 dakika vardır.",
            "135 dk=2 sa 15 dk;11.20’ye ekleyince 13.35 olur.",
          ],
          optionReasons: [
            "Doğru. Ortak periyot 45 dk;4. olay için 3×45=135 dk geçer.11.20+2 sa 15 dk=13.35.",
            "İlk sonraki ortak olayı bulur; bu 2. ortak olaydır,4. değildir.",
            "135 dakikayı 1 saat 35 dakika sanır;135 dakika 2 saat 15 dakikadır.",
            "4×45=180 dk ekler; başlangıçtaki 1. olayı zaman aralığı gibi sayar.",
            "Başlangıç anını 4. olay yerine verir; henüz hiç tekrar geçmemiştir.",
          ],
          commonError:
            "Olay adedi ile aralık adedini veya ondalık saat ile dakika gösterimini karıştırma.",
          check: "Ortak saatler 11.20,12.05,12.50,13.35 biçiminde sıralanır.",
        },
      },
      {
        prompt:
          "İki olay 0. dakikada birlikte başlayıp 4 ve 10 dakikada bir tekrarlanıyor.0 hariç,100. dakika dahil(0,100] aralığında kaç ortak olay gerçekleşir?",
        options: ["6", "5", "10", "20", "4"],
        answer: 1,
        hint: "EKOK(4,10)=20 dakikadır.",
        explanation:
          "EKOK(4,10)=20 dakikadır. 100’e kadar pozitif 20 katlarını yaz:20,40,60,80,100. Sol uç 0 hariç,sağ uç 100 dahil olduğu için beş olay kalır.",
        guidance: {
          knowledge: [
            "Aralık uçlarının dahil olması ortak olay sayısını değiştirebilir.",
          ],
          strategy:
            "Ortak olayları tekrar süresinin katları olarak yaz; başlangıcın dışarıda ve sağ uç noktanın içeride olmasıyla sayma sınırlarını kur.",
          steps: [
            "EKOK(4,10)=20 dakikadır.",
            "100’e kadar pozitif 20 katlarını yaz:20,40,60,80,100.",
            "Sol uç 0 hariç,sağ uç 100 dahil olduğu için beş olay kalır.",
          ],
          optionReasons: [
            "Başlangıç 0’ı da dahil eder; soru bu anı açıkça dışlamıştır.",
            "Doğru. Ortak anlar 20,40,60,80,100’dür;0 dışlanmıştır.",
            "10 dakikalık dizinin bütün olaylarını sayar; ortak olmak için 4’e de bölünmelidir.",
            "EKOK periyodu 20 dakikayı olay sayısı olarak cevaplar.",
            "100. dakikayı dışlar; sağ uç dahildir.",
          ],
          commonError: "Köşeli ve yuvarlak uçların sayım etkisini atlama.",
          check: "100/20=5 pozitif ortak kat vardır.",
        },
      },
      {
        prompt:
          "A ilk kez 0. dakikada ve sonra 8 dakikada bir; B ilk kez 6. dakikada ve sonra 12 dakikada bir çalışıyor. İlk ortak çalışma için hangisi doğrudur?",
        options: [
          "12. dakikadadır.",
          "48. dakikadadır.",
          "6. dakikadadır.",
          "Hiç ortak çalışma olmaz.",
          "24. dakikadadır.",
        ],
        answer: 3,
        hint: "Ortak an 8 k=6+12ℓ eşitliğini sağlamalıdır.",
        explanation:
          "Ortak an 8 k=6+12ℓ eşitliğini sağlamalıdır. Sol taraf 4’ün katı,sağ taraf 4’e göre 2 kalanlıdır; eşitlik mümkün değildir. Eşdeğer kontrol:EBOB(8,12)=4,başlangıç farkı 6’yı bölmez.",
        guidance: {
          knowledge: [
            "Fazlı tekrarların uyumu için EBOB periyot farkı sınıfını korumalıdır.",
          ],
          strategy:
            "Farklı başlangıçları aynı zaman denkleminde eşitle; başlangıç farkının ortak bölenle uyumunu denetlemeden EKOK ile ortak olay varsayma.",
          steps: [
            "Ortak an 8 k=6+12ℓ eşitliğini sağlamalıdır.",
            "Sol taraf 4’ün katı,sağ taraf 4’e göre 2 kalanlıdır; eşitlik mümkün değildir.",
            "Eşdeğer kontrol:EBOB(8,12)=4,başlangıç farkı 6’yı bölmez.",
          ],
          optionReasons: [
            "12,ne A’nın 8 katı ne de 6+12 k biçiminde B anıdır.",
            "48−6=42,12’ye tam bölünmez; periyot katlarını büyütmek faz çelişkisini gidermez.",
            "B’nin ilk anıdır fakat 6,8’in katı değildir.",
            "Doğru. A anları 4’e göre 0,B anları 4’e göre 2 sınıfındadır; fazlar uyuşmaz.",
            "24,8’in katıdır ama 24−6=18,12’nin katı değildir.",
          ],
          commonError:
            "Sadece EKOK’u bulmak farklı ilk zamanları ortaklaştırmaz.",
          check:
            "A:0,8,16,24,…;B:6,18,30,42,… listeleri aynı 4 sınıfında değildir.",
        },
      },
      {
        prompt:
          "A ilk kez 2. dakikada ve her 7 dakikada; B ilk kez 5. dakikada ve her 10 dakikada olay üretiyor. İlk ortak an kaçıncı dakikadır?",
        options: ["65", "58", "35", "70", "5"],
        answer: 0,
        hint: "A anlarını 2,9,16,23,30,37,44,51,58,65 diye sırala.",
        explanation:
          "A anlarını 2,9,16,23,30,37,44,51,58,65 diye sırala. B anları 5,15,25,35,45,55,65,… biçimindedir. İlk kesişim 65’tir; bundan sonra ortak anlar 70 dakika arayla tekrar eder.",
        guidance: {
          knowledge: [
            "İlk ortak an,iki ilk zamandan başlayan olay dizilerinin ilk kesişimidir.",
          ],
          strategy:
            "İki başlangıçtan üretilen zaman dizilerini karşılaştır; hem başlangıç koşullarını hem negatif olmayan olay indislerini sağlayan ilk kesişimi ara.",
          steps: [
            "A anlarını 2,9,16,23,30,37,44,51,58,65 diye sırala.",
            "B anları 5,15,25,35,45,55,65,… biçimindedir.",
            "İlk kesişim 65’tir; bundan sonra ortak anlar 70 dakika arayla tekrar eder.",
          ],
          optionReasons: [
            "Doğru. 2+7×9=65=5+10×6 ve önceki A anları B dizisine uymaz.",
            "A dizisindedir fakat 58−5=53,10’a bölünmez.",
            "B dizisindedir fakat 35−2=33,7’ye bölünmez.",
            "Periyotların EKOK’u 70’i ilk an sanır;70−2,7’nin katı değildir.",
            "B’nin ilk anıdır;A henüz 5. dakikada olay üretmez.",
          ],
          commonError:
            "EKOK’u ilk buluşma zamanıyla eşitleme; o ortak olaylar arasındaki aralıktır.",
          check: "65−2=63=7×9 ve 65−5=60=10×6.",
        },
      },
      {
        prompt:
          "N doğal sayısı 5 ve 7 ile ayrı ayrı bölününce her iki işlemde 2 kalanını veriyor. Tam bölümlerin pozitif olması istenmiyor. En küçük N kaçtır?",
        options: ["35", "37", "7", "2", "72"],
        answer: 3,
        hint: "N−2 hem 5’e hem 7’ye bölünür;N=35 k+2 biçimindedir.",
        explanation:
          "N−2 hem 5’e hem 7’ye bölünür;N=35 k+2 biçimindedir. Bölümlerin pozitifliği şartı olmadığından k=0 ve N=2 denenir. 2=5×0+2=7×0+2;daha küçük 0 veya 1,2 kalanını vermez.",
        guidance: {
          knowledge: [
            "Doğal bölünende tam bölüm 0 olabilir; kalan aralığı yine geçerlidir.",
          ],
          strategy:
            "Aynı kalanı çıkarıp ortak kat yapısını kur; doğal sayıda sıfır bölüm yasaklanmadığı için en küçük ortak kat katsayısını ayrıca sına.",
          steps: [
            "N−2 hem 5’e hem 7’ye bölünür;N=35 k+2 biçimindedir.",
            "Bölümlerin pozitifliği şartı olmadığından k=0 ve N=2 denenir.",
            "2=5×0+2=7×0+2;daha küçük 0 veya 1,2 kalanını vermez.",
          ],
          optionReasons: [
            "Ortak katı alıp 2 kalanını eklemez; iki işlemde de kalan 0 olur.",
            "N=35 k+2 yazımında k=0’ı gerekçesiz eler;37 bir sonraki uygun adaydır.",
            "7’nin 5’e kalanı 2 olsa da 7’ye kalanı 0’dır.",
            "Doğru. N=2 için iki tam bölüm 0 ve iki kalan 2’dir;2<5,2<7.",
            "Geçerli bir adaydır ama 2 ve 37’den büyüktür.",
          ],
          commonError:
            "Soruda bulunmayan N>bölen veya bölüm>0 koşulunu ekleme.",
          check: "2,iki bölenin de altındadır ve kalan olarak geçerlidir.",
        },
      },
      {
        prompt:
          "N pozitif tam sayısı 6 ve 10 ile bölündüğünde her iki işlemde 4 kalanını veriyor. N<250 koşulunda en büyük N kaçtır?",
        options: ["250", "234", "244", "214", "274"],
        answer: 2,
        hint: "N−4,6 ve 10’un ortak katı;EKOK 30 olduğundan N=30 k+4.",
        explanation:
          "N−4,6 ve 10’un ortak katı;EKOK 30 olduğundan N=30 k+4. 30 k<246 eşitsizliğinde en büyük tam sayı k=8’dir. N=244;sonraki 274 sınırı aşar.",
        guidance: {
          knowledge: [
            "Aynı kalanlı adaylar ortak kat aralığıyla sıralanır;en büyük için üst sınır uygulanır.",
          ],
          strategy:
            "Ortak kalanı çıkararak EKOK'un katı biçimini kur; verilen kesin üst sınırın altında kalan en büyük katsayıyı seç.",
          steps: [
            "N−4,6 ve 10’un ortak katı;EKOK 30 olduğundan N=30 k+4.",
            "30 k<246 eşitsizliğinde en büyük tam sayı k=8’dir.",
            "N=244;sonraki 274 sınırı aşar.",
          ],
          optionReasons: [
            "Üst sınır kesin küçüktür;ayrıca 250’nin 10’a kalanı 0’dır.",
            "10’a kalanı 4 olsa da 6’ya kalanı 0’dır.",
            "Doğru. N=30 k+4 ve 30 k+4<250;en büyük k=8,N=244.",
            "Uygun bir önceki adaydır;244 de sınırın altında olduğundan en büyük değildir.",
            "İki kalanı sağlar ama 250 üst sınırını aşar.",
          ],
          commonError:
            "İki bölenin koşulunu ayrı ayrı veya aralık şartını eksik bırakma.",
          check: "244=6×40+4=10×24+4.",
        },
      },
      {
        prompt:
          "115 ve 171 sayıları aynı pozitif tam sayı d’ye bölününce her defasında 3 kalanını veriyor. En büyük d kaçtır?",
        options: ["56", "112", "3", "168", "28"],
        answer: 0,
        hint: "Her bölünenden kendi kalanını çıkar:d|112 ve d|168.",
        explanation:
          "Her bölünenden kendi kalanını çıkar:d|112 ve d|168. EBOB(112,168)=56,pozitif ortak bölenlerin en büyüğüdür. 3<56 ve 115=56×2+3,171=56×3+3 olduğundan aday geçerlidir.",
        guidance: {
          knowledge: [
            "Bilinmeyen bölen,kalanları çıkarılmış sayıların ortak bölenidir.",
          ],
          strategy:
            "Her sayıdan ortak kalanı çıkarıp ortak bölen problemine geç; seçilen en büyük bölenin kalan koşulunu da sağladığını doğrula.",
          steps: [
            "Her bölünenden kendi kalanını çıkar:d|112 ve d|168.",
            "EBOB(112,168)=56,pozitif ortak bölenlerin en büyüğüdür.",
            "3<56 ve 115=56×2+3,171=56×3+3 olduğundan aday geçerlidir.",
          ],
          optionReasons: [
            "Doğru. d,112 ve 168’i bölmelidir;EBOB 56 ve 3<56.",
            "Yalnız 115−3’ü alır;168,112’ye tam bölünmez.",
            "Kalanı bölen seçer;3<3 şartı sağlanmaz.",
            "Yalnız 171−3’ü alır;112,168’e tam bölünmez.",
            "Geçerli ortak bölen olsa da 56’dan küçüktür.",
          ],
          commonError:
            "Aynı kalanlı bilinmeyen sayı modelindeki EKOK’u bu bölen arayışına taşıma.",
          check: "56 hem 112’yi hem 168’i tam böler.",
        },
      },
      {
        prompt:
          "109 sayısı pozitif tam sayı d’ye bölününce 4;157 sayısı aynı d’ye bölününce 3 kalanını veriyor. En büyük d kaçtır?",
        options: ["14", "4", "1", "21", "7"],
        answer: 4,
        hint: "Kalanlar farklı olduğundan 109−4=105 ve 157−3=154 ayrı hesaplanır.",
        explanation:
          "Kalanlar farklı olduğundan 109−4=105 ve 157−3=154 ayrı hesaplanır. 105=3×5×7,154=2×7×11;EBOB 7’dir. 7>4 ve 7>3;109=7×15+4,157=7×22+3 koşulları sağlar.",
        guidance: {
          knowledge: [
            "Farklı bölünenlerin farklı kalanları kendi sayılarından ayrı çıkarılır.",
          ],
          strategy:
            "Her bölünenden kendi kalanını ayrı çıkar; farkların en büyük ortak bölenini bulduktan sonra iki kalan sınırını da denetle.",
          steps: [
            "Kalanlar farklı olduğundan 109−4=105 ve 157−3=154 ayrı hesaplanır.",
            "105=3×5×7,154=2×7×11;EBOB 7’dir.",
            "7>4 ve 7>3;109=7×15+4,157=7×22+3 koşulları sağlar.",
          ],
          optionReasons: [
            "154’ü böler fakat 105’i bölmez;109’un 14’e kalanı 11’dir.",
            "Bölen,kalan 4’ten büyük olmalıdır;d=4 geçersizdir.",
            "Ortak bölen 1 olsa da 4 ve 3 kalanları 1’den küçük değildir.",
            "105’i böler fakat 154’ü bölmez;157’nin 21’e kalanı 10’dur.",
            "Doğru. d|105 ve d|154;EBOB 7 ve 7 her iki kalandan büyüktür.",
          ],
          commonError:
            "Her sayıdan aynı kalanı çıkararak yanlış ortak bölen bulma.",
          check: "İki bölme eşitliği ve iki kalan sınırı da doğrulanmıştır.",
        },
      },
    ],
  },
];
export const forge026MathLessons: Lesson[] = sets026.map((s) => ({
  id: s.id,
  subjectId: "tyt-matematik",
  title: txt(s.title),
  minutes: 45,
  objectives: [
    txt(
      "Yazım, tam sayılık ve model koşullarını birlikte koruyarak özgün ileri soruları çözmek.",
    ),
    txt(
      "Sonucu asıl koşullara geri koyup seçenekleri özgül gerekçeleriyle sınamak.",
    ),
  ],
  body: [],
  source: txt(
    "Kaynaklarla karşılaştırılan özgün ileri alıştırmalar. Resmî sınav sorusu değildir; konu anlatımı mevcut temel dersin ayrıntılı rehberindedir.",
  ),
  tags: ["özgün-sorular", "ileri-uygulama", "forge026"],
  questions: s.questions.map((q, i) => ({
    id: `f026-${s.id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: `f026-${s.base}-${i + 1}`,
  })),
}));
export const forge026MathTopics: Record<string, string> = {
  "sayi-basamaklari-ileri": "detail-199",
  "bolme-bolunebilme-ileri": "detail-200",
  "ebob-ekok-ileri": "detail-201",
};
