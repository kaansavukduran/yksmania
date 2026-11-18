/** Exact arithmetic for the private Source039 teaching proposal. No progress/state writes. */
export type Power039Fraction = { n: bigint; d: bigint };
export type Power039Result =
  { ok: true; value: Power039Fraction } | { ok: false; reason: string };
const abs = (n: bigint) => (n < 0n ? -n : n);
export function power039Gcd(a: bigint, b: bigint): bigint {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}
export function power039Fraction(
  n: bigint | number,
  d: bigint | number = 1n,
): Power039Fraction {
  if (typeof n === "number" && !Number.isSafeInteger(n))
    throw Error("Pay güvenli tam sayı olmalı.");
  if (typeof d === "number" && !Number.isSafeInteger(d))
    throw Error("Payda güvenli tam sayı olmalı.");
  let a = BigInt(n),
    b = BigInt(d);
  if (b === 0n) throw Error("Payda sıfır olamaz.");
  if (b < 0n) {
    a = -a;
    b = -b;
  }
  const g = power039Gcd(a, b);
  return { n: a / g, d: b / g };
}
export const power039Add = (a: Power039Fraction, b: Power039Fraction) =>
  power039Fraction(a.n * b.d + b.n * a.d, a.d * b.d);
export const power039Multiply = (a: Power039Fraction, b: Power039Fraction) =>
  power039Fraction(a.n * b.n, a.d * b.d);
export const power039Negate = (a: Power039Fraction) =>
  power039Fraction(-a.n, a.d);
export function power039Divide(
  a: Power039Fraction,
  b: Power039Fraction,
): Power039Result {
  return b.n === 0n
    ? { ok: false, reason: "Sıfıra bölme tanımlı değildir." }
    : { ok: true, value: power039Fraction(a.n * b.d, a.d * b.n) };
}
export const power039Compare = (
  a: Power039Fraction,
  b: Power039Fraction,
): -1 | 0 | 1 => {
  const delta = a.n * b.d - b.n * a.d;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
};
export const power039Format = (a: Power039Fraction) =>
  a.d === 1n ? String(a.n) : `${a.n}/${a.d}`;
export function power039Scalar(a: Power039Fraction) {
  if (a.n === 0n) return 0;
  const ns = abs(a.n).toString(),
    ds = a.d.toString();
  const nl = Math.min(15, ns.length),
    dl = Math.min(15, ds.length);
  const mantissa = Number(ns.slice(0, nl)) / Number(ds.slice(0, dl));
  return (
    (a.n < 0n ? -1 : 1) * mantissa * 10 ** (ns.length - nl - (ds.length - dl))
  );
}
const naturalPower = (a: bigint, n: number) => {
  let value = 1n,
    base = a,
    exponent = n;
  while (exponent > 0) {
    if (exponent % 2 === 1) value *= base;
    exponent = Math.floor(exponent / 2);
    if (exponent > 0) base *= base;
  }
  return value;
};
export function power039IntegerPower(
  a: Power039Fraction,
  exponent: number,
): Power039Result {
  if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > 512)
    return {
      ok: false,
      reason: "Bu modelde üs −512 ile 512 arasında bir tam sayı olmalı.",
    };
  if (a.n === 0n && exponent <= 0)
    return {
      ok: false,
      reason:
        exponent === 0
          ? "Bu ünitenin tanımında 0⁰ tanımlı değildir."
          : "Sıfırın negatif kuvveti 1/0 gerektirir; tanımlı değildir.",
    };
  const n = Math.abs(exponent),
    numerator = naturalPower(a.n, n),
    denominator = naturalPower(a.d, n);
  return {
    ok: true,
    value:
      exponent < 0
        ? power039Fraction(denominator, numerator)
        : power039Fraction(numerator, denominator),
  };
}
export function power039Anatomy(
  base: number,
  exponent: number,
  minusOutside = false,
) {
  const a = power039Fraction(base),
    result = power039IntegerPower(a, exponent);
  const value =
    result.ok && minusOutside
      ? power039Negate(result.value)
      : result.ok
        ? result.value
        : null;
  return {
    base,
    exponent,
    minusOutside,
    result: value ? { ok: true as const, value } : result,
    expression: `${minusOutside ? "−" : ""}(${base})^(${exponent})`,
    factors:
      exponent > 0 && exponent <= 12
        ? Array.from({ length: exponent }, () => String(base))
        : [],
    reciprocal: exponent < 0 && base !== 0,
    parity: Math.abs(exponent) % 2 === 0 ? "çift" : "tek",
  };
}
export function power039Laws(a: Power039Fraction, m: number, n: number) {
  const left = power039IntegerPower(a, m),
    right = power039IntegerPower(a, n);
  const product =
    left.ok && right.ok
      ? { ok: true as const, value: power039Multiply(left.value, right.value) }
      : left.ok
        ? right
        : left;
  const quotient =
    left.ok && right.ok
      ? power039Divide(left.value, right.value)
      : left.ok
        ? right
        : left;
  const nested = left.ok ? power039IntegerPower(left.value, n) : left;
  const productShortcut = power039IntegerPower(a, m + n);
  const quotientShortcut = power039IntegerPower(a, m - n);
  const nestedShortcut = power039IntegerPower(a, m * n);
  const sum =
    left.ok && right.ok
      ? { ok: true as const, value: power039Add(left.value, right.value) }
      : left.ok
        ? right
        : left;
  const same = (a: Power039Result, b: Power039Result) =>
    a.ok && b.ok ? power039Compare(a.value, b.value) === 0 : false;
  return {
    left,
    right,
    product,
    quotient,
    nested,
    sum,
    productShortcut,
    quotientShortcut,
    nestedShortcut,
    productLawApplicable: product.ok && productShortcut.ok,
    quotientLawApplicable: quotient.ok && quotientShortcut.ok,
    nestedLawApplicable: nested.ok && nestedShortcut.ok,
    productMatches: same(product, productShortcut),
    quotientMatches: same(quotient, quotientShortcut),
    nestedMatches: same(nested, nestedShortcut),
    sumEqualsProductShortcut: same(sum, productShortcut),
  };
}
export function power039CommonFactor(
  base: number,
  n: number,
  gap: number,
  c: number,
  d: number,
) {
  if (!Number.isSafeInteger(gap) || gap < 0 || gap > 12)
    throw Error("Üs farkı 0–12 arasında tam sayı olmalı.");
  if (base === 0)
    return {
      ok: false as const,
      reason:
        "Bu ortak çarpan modeli sıfır olmayan taban ister; sıfır tabanını terimlerinden doğrudan denetle.",
    };
  const a = power039Fraction(base),
    first = power039IntegerPower(a, n),
    later = power039IntegerPower(a, n + gap),
    ratio = power039IntegerPower(a, gap);
  if (!first.ok || !later.ok || !ratio.ok)
    return {
      ok: false as const,
      reason: "Terimlerden en az biri seçilen taban ve üslerle tanımlı değil.",
    };
  const coefficient = power039Add(
    power039Fraction(c),
    power039Multiply(power039Fraction(d), ratio.value),
  );
  const expanded = power039Add(
    power039Multiply(power039Fraction(c), first.value),
    power039Multiply(power039Fraction(d), later.value),
  );
  const factored = power039Multiply(first.value, coefficient);
  return {
    ok: true as const,
    first: first.value,
    later: later.value,
    ratio: ratio.value,
    coefficient,
    expanded,
    factored,
    expression: `${c}·(${base})^(${n})+(${d})·(${base})^(${n + gap})`,
    matches: power039Compare(expanded, factored) === 0,
  };
}
export function power039Equation(
  base: Power039Fraction,
  leftCoefficient: number,
  leftConstant: number,
  rightCoefficient: number,
  rightConstant: number,
) {
  if (
    ![leftCoefficient, leftConstant, rightCoefficient, rightConstant].every(
      Number.isSafeInteger,
    )
  )
    return {
      kind: "invalid-input" as const,
      reason:
        "Bu denklem modelinin katsayı ve sabitleri güvenli tam sayılar olmalı.",
    };
  const a = power039Compare(base, power039Fraction(0)),
    one = power039Compare(base, power039Fraction(1));
  if (a <= 0)
    return {
      kind: "unsupported-base" as const,
      reason:
        "Gerçek x için üsleri eşitleme modeli a>0 koşulu ister. Sıfır ve negatif tabana bu adımı uygulama.",
    };
  if (one === 0)
    return {
      kind: "all" as const,
      reason:
        "Taban 1 olduğunda her gerçek üssün değeri 1; iki taraf her gerçek x için eşit.",
    };
  const coefficient = BigInt(leftCoefficient) - BigInt(rightCoefficient),
    constant = BigInt(rightConstant) - BigInt(leftConstant);
  if (coefficient === 0n)
    return constant === 0n
      ? { kind: "all" as const, reason: "Üsler bütün x değerleri için aynı." }
      : {
          kind: "none" as const,
          reason: "Uygun ortak tabanda farklı sabit üsler eşit olamaz.",
        };
  const root = power039Fraction(constant, coefficient);
  const leftExponent = power039Add(
    power039Multiply(power039Fraction(leftCoefficient), root),
    power039Fraction(leftConstant),
  );
  const rightExponent = power039Add(
    power039Multiply(power039Fraction(rightCoefficient), root),
    power039Fraction(rightConstant),
  );
  return {
    kind: "one" as const,
    root,
    leftExponent,
    rightExponent,
    checked: power039Compare(leftExponent, rightExponent) === 0,
  };
}
export function power039Comparison(
  a: Power039Fraction,
  m: number,
  b: Power039Fraction,
  n: number,
) {
  const left = power039IntegerPower(a, m),
    right = power039IntegerPower(b, n);
  if (!left.ok || !right.ok)
    return {
      ok: false as const,
      left,
      right,
      reason: "Tanımsız bir ifade büyüklük karşılaştırmasına alınamaz.",
    };
  const order = power039Compare(left.value, right.value),
    quotient = power039Divide(left.value, right.value);
  return {
    ok: true as const,
    left: left.value,
    right: right.value,
    order,
    quotient,
    ratioRuleApplicable: left.value.n > 0n && right.value.n > 0n,
  };
}
export function power039Scientific(value: Power039Fraction) {
  if (value.n === 0n)
    return {
      kind: "zero" as const,
      value,
      reason:
        "0 için 1≤|a|<10 koşulunu sağlayan bir katsayı yok; sıfırı ayrı yazarız.",
    };
  let magnitude = power039Fraction(abs(value.n), value.d),
    exponent = 0;
  const ten = power039Fraction(10),
    one = power039Fraction(1);
  while (power039Compare(magnitude, ten) >= 0) {
    magnitude = power039Fraction(magnitude.n, magnitude.d * 10n);
    exponent++;
  }
  while (power039Compare(magnitude, one) < 0) {
    magnitude = power039Fraction(magnitude.n * 10n, magnitude.d);
    exponent--;
  }
  const coefficient = value.n < 0n ? power039Negate(magnitude) : magnitude;
  return { kind: "normalized" as const, coefficient, exponent, value };
}
export function power039ScientificInput(
  coefficient: Power039Fraction,
  exponent: number,
) {
  const scale = power039IntegerPower(power039Fraction(10), exponent);
  if (!scale.ok) return scale;
  return {
    ok: true as const,
    value: power039Multiply(coefficient, scale.value),
    normalized: power039Scientific(power039Multiply(coefficient, scale.value)),
  };
}
export function power039ScientificOperation(
  a: Power039Fraction,
  m: number,
  b: Power039Fraction,
  n: number,
  operation: "add" | "multiply",
) {
  const left = power039ScientificInput(a, m),
    right = power039ScientificInput(b, n);
  if (!left.ok || !right.ok)
    return {
      ok: false as const,
      reason: "Bilimsel gösterimde üs geçerli tam sayı aralığında olmalı.",
    };
  const value =
    operation === "add"
      ? power039Add(left.value, right.value)
      : power039Multiply(left.value, right.value);
  return {
    ok: true as const,
    left: left.value,
    right: right.value,
    value,
    normalized: power039Scientific(value),
  };
}
export function power039LogPoint(
  value: Power039Fraction,
  minimumExponent: number,
  maximumExponent: number,
  width = 640,
  padding = 32,
) {
  const exponentSpan = maximumExponent - minimumExponent,
    drawableWidth = width - 2 * padding;
  if (
    ![
      minimumExponent,
      maximumExponent,
      width,
      padding,
      exponentSpan,
      drawableWidth,
    ].every(Number.isFinite) ||
    !Number.isSafeInteger(minimumExponent) ||
    !Number.isSafeInteger(maximumExponent) ||
    value.n <= 0n ||
    exponentSpan <= 0 ||
    padding < 0 ||
    drawableWidth <= 0
  )
    return {
      ok: false as const,
      reason: "Logaritmik doğru pozitif sayı ve artan, güvenli tam sayı üs sınırları ister.",
    };
  const normalized = power039Scientific(value);
  if (normalized.kind !== "normalized")
    return {
      ok: false as const,
      reason: "Sıfır logaritmik doğruya yerleştirilemez.",
    };
  // Inclusive integer10^k endpoints are compared exactly, before rendering.
  // A coefficient rounded to1 or10 must not move a value across the viewport.
  const clipped = normalized.exponent < minimumExponent ||
    normalized.exponent > maximumExponent ||
    (normalized.exponent === maximumExponent &&
      normalized.coefficient.n > normalized.coefficient.d);
  const position =
    normalized.exponent + Math.log10(power039Scalar(normalized.coefficient));
  const rawX =
    padding + ((position - minimumExponent) / exponentSpan) * drawableWidth;
  return {
    ok: true as const,
    exponentPositionApprox: position,
    x: Math.max(padding, Math.min(width - padding, rawX)),
    rawX,
    clipped,
    value,
    axisType: "logarithmic" as const,
  };
}
function exactRoot(value: bigint, degree: number): bigint | null {
  if (value < 0n || !Number.isSafeInteger(degree) || degree < 1 || degree > 32)
    return null;
  if (value <= 1n || degree === 1) return value;
  let low = 0n,
    high = value;
  while (low <= high) {
    const middle = (low + high) / 2n,
      powered = naturalPower(middle, degree);
    if (powered === value) return middle;
    if (powered < value) low = middle + 1n;
    else high = middle - 1n;
  }
  return null;
}
function rationalPowerWithin039(
  base: Power039Fraction,
  numerator: number,
  denominator: number,
  numeratorLimit: number,
) {
  if (
    !Number.isSafeInteger(numerator) ||
    !Number.isSafeInteger(denominator) ||
    denominator <= 0 ||
    denominator > 32 ||
    Math.abs(numerator) > numeratorLimit
  )
    return {
      kind: "invalid" as const,
      reason: `Bu modelde üs payı −${numeratorLimit}…${numeratorLimit}, paydası 1…32 arasında tam sayı olmalı.`,
    };
  const reduced = power039Fraction(numerator, denominator),
    m = Number(reduced.n),
    q = Number(reduced.d);
  if (base.n === 0n && m <= 0)
    return {
      kind: "undefined" as const,
      reduced,
      reason: "Sıfır tabanda sıfır veya negatif üs tanımlı değildir.",
    };
  if (base.n < 0n && q % 2 === 0)
    return {
      kind: "not-real" as const,
      reduced,
      reason:
        "Sadeleşmiş payda çift; negatif sayının bu çift dereceli kökü gerçek sayı değildir.",
    };
  const rootN = exactRoot(abs(base.n), q),
    rootD = exactRoot(base.d, q);
  if (rootN === null || rootD === null)
    return {
      kind: "irrational" as const,
      reduced,
      base,
      reason:
        "Bu kök tam rasyonel sayı değil; köklü biçim korunur, yaklaşık değer eşitlik diye sunulmaz.",
    };
  const root = power039Fraction(base.n < 0n ? -rootN : rootN, rootD),
    result = power039IntegerPower(root, m);
  return result.ok
    ? { kind: "exact" as const, reduced, root, value: result.value }
    : { kind: "undefined" as const, reduced, reason: result.reason };
}
export function power039RationalPower(
  base: Power039Fraction,
  numerator: number,
  denominator: number,
) {
  return rationalPowerWithin039(base, numerator, denominator, 64);
}
export function power039Growth(
  initial: Power039Fraction,
  multiplier: Power039Fraction,
  steps: number,
) {
  if (
    initial.n < 0n ||
    multiplier.n < 0n ||
    !Number.isSafeInteger(steps) ||
    steps < 0 ||
    steps > 24
  )
    return {
      ok: false as const,
      reason:
        "Miktar ve çarpan negatif olamaz; adım sayısı 0…24 arasında tam sayı olmalı.",
    };
  // Step0 is the supplied initial amount, including when the later multiplier is0.
  const values: { step: number; value: Power039Fraction }[] = [
    { step: 0, value: initial },
  ];
  for (let step = 1; step <= steps; step++)
    values.push({
      step,
      value: power039Multiply(values[step - 1].value, multiplier),
    });
  const comparison = power039Compare(multiplier, power039Fraction(1));
  return {
    ok: true as const,
    values,
    final: values.at(-1)!.value,
    behavior:
      steps === 0
        ? "başlangıç değeri"
        : initial.n === 0n || comparison === 0
          ? "sabit"
          : multiplier.n === 0n
            ? "ilk adımda sıfır"
            : comparison < 0
              ? "azalma"
              : "büyüme",
    initial,
    multiplier,
    steps,
  };
}

export function power039SameExponent(
  a: Power039Fraction,
  b: Power039Fraction,
  exponent: number,
) {
  const first = power039IntegerPower(a, exponent),
    second = power039IntegerPower(b, exponent);
  const multipliedBase = power039Multiply(a, b),
    dividedBase = power039Divide(a, b);
  const product =
    first.ok && second.ok
      ? {
          ok: true as const,
          value: power039Multiply(first.value, second.value),
        }
      : first.ok
        ? second
        : first;
  const quotient =
    first.ok && second.ok
      ? power039Divide(first.value, second.value)
      : first.ok
        ? second
        : first;
  const productShortcut = power039IntegerPower(multipliedBase, exponent);
  const quotientShortcut = dividedBase.ok
    ? power039IntegerPower(dividedBase.value, exponent)
    : dividedBase;
  const same = (left: Power039Result, right: Power039Result) =>
    left.ok && right.ok && power039Compare(left.value, right.value) === 0;
  return {
    first,
    second,
    multipliedBase,
    dividedBase,
    product,
    quotient,
    productShortcut,
    quotientShortcut,
    productLawApplicable: product.ok && productShortcut.ok,
    quotientLawApplicable: quotient.ok && quotientShortcut.ok,
    productMatches: same(product, productShortcut),
    quotientMatches: same(quotient, quotientShortcut),
  };
}

/** Positive prime bases make the common-exponent substitution valid for real k;
 * the numerical explorer uses integer k so every displayed number stays exact. */
export function power039PrimeSubstitution(
  exponent: number,
  twoPower: number,
  threePower: number,
  fivePower: number,
) {
  if (
    ![exponent, twoPower, threePower, fivePower].every(Number.isSafeInteger) ||
    Math.abs(exponent) > 12 ||
    [twoPower, threePower, fivePower].some((v) => Math.abs(v) > 8)
  )
    return {
      ok: false as const,
      reason:
        "Bu modelde ortak üs −12…12, asal taban çarpanlarının üsleri −8…8 arasında tam sayı olmalı.",
    };
  const primes = [2, 3, 5],
    powers = [twoPower, threePower, fivePower],
    symbols = ["A", "B", "C"];
  let targetBase = power039Fraction(1),
    substituted = power039Fraction(1);
  const factors: {
    prime: number;
    power: number;
    symbol: string;
    given: Power039Fraction;
    baseFactor: Power039Fraction;
    substitutedFactor: Power039Fraction;
  }[] = [];
  for (let i = 0; i < primes.length; i++) {
    const given = power039IntegerPower(power039Fraction(primes[i]), exponent),
      baseFactor = power039IntegerPower(power039Fraction(primes[i]), powers[i]);
    if (!given.ok || !baseFactor.ok)
      return {
        ok: false as const,
        reason: "Asal taban terimi model aralığında tanımlı değil.",
      };
    const substitutedFactor = power039IntegerPower(given.value, powers[i]);
    if (!substitutedFactor.ok) return substitutedFactor;
    targetBase = power039Multiply(targetBase, baseFactor.value);
    substituted = power039Multiply(substituted, substitutedFactor.value);
    factors.push({
      prime: primes[i],
      power: powers[i],
      symbol: symbols[i],
      given: given.value,
      baseFactor: baseFactor.value,
      substitutedFactor: substitutedFactor.value,
    });
  }
  const direct = power039IntegerPower(targetBase, exponent);
  if (!direct.ok) return direct;
  return {
    ok: true as const,
    exponent,
    factors,
    targetBase,
    substituted,
    direct: direct.value,
    symbolic: factors
      .map((item) => `${item.symbol}^(${item.power})`)
      .join(" · "),
    matches: power039Compare(substituted, direct.value) === 0,
  };
}

export function power039NestedRational(
  base: Power039Fraction,
  innerInteger: number,
  outerNumerator: number,
  outerDenominator: number,
) {
  if (!Number.isSafeInteger(innerInteger) || Math.abs(innerInteger) > 8)
    return {
      ok: false as const,
      reason: "Bu karşı örnek modelinde iç üs −8…8 arasında tam sayı olmalı.",
    };
  if (
    !Number.isSafeInteger(outerNumerator) ||
    Math.abs(outerNumerator) > 32 ||
    !Number.isSafeInteger(outerDenominator) ||
    outerDenominator < 1 ||
    outerDenominator > 32
  )
    return {
      ok: false as const,
      reason:
        "Dış üs, payı −32…32 ve paydası 1…32 arasında olan bir kesir olmalı.",
    };
  const inner = power039IntegerPower(base, innerInteger);
  const nested = inner.ok
    ? power039RationalPower(inner.value, outerNumerator, outerDenominator)
    : { kind: "undefined" as const, reason: inner.reason };
  const shortcut = rationalPowerWithin039(
    base,
    innerInteger * outerNumerator,
    outerDenominator,
    256,
  );
  return {
    ok: true as const,
    inner,
    nested,
    shortcut,
    positiveBaseGeneralRule: base.n > 0n,
    exactComparison:
      nested.kind === "exact" && shortcut.kind === "exact"
        ? {
            same: power039Compare(nested.value, shortcut.value) === 0,
            nested: nested.value,
            shortcut: shortcut.value,
          }
        : null,
  };
}
