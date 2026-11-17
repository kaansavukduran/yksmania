import { describe, expect, it } from "vitest";
import {
  r035 as q,
  r035Text as text,
  r035Add as add,
  r035Sub as sub,
  r035Mul as mul,
  r035Div as div,
  r035Compare as compare,
  r035Abs as abs,
  r035Neg as neg,
  r035Midpoint as midpoint,
  r035CommonDenominator as common,
  r035Decimal as decimal,
  r035DecimalInfo as info,
  r035Sequential as flow,
  r035InitialFromRemaining as initial,
} from "../src/learning/rationalSource035Model";

describe("Rasyonel sayıların tam kesir modeli", () => {
  it("keeps signed values and zero defined independently of written denominator", () => {
    expect(text(q(-6, -8))).toBe("3/4");
    expect(text(q(3, -4))).toBe("-3/4");
    expect(q(0, -91)).toEqual({ n: 0n, d: 1n });
    expect(text(q(5))).toBe("5");
    expect(text(abs(q(-3, 4)))).toBe("3/4");
    expect(text(neg(q(-3, 4)))).toBe("3/4");
    expect(() => q(0, 0)).toThrow();
    expect(() => q(3, 0)).toThrow();
  });
  it("keeps addition groups and division direction without deleting terms", () => {
    expect(text(add(sub(q(3, 4), q(5, 6)), q(1, 3)))).toBe("1/4");
    expect(text(mul(q(14, 15), q(25, 21)))).toBe("10/9");
    expect(text(div(q(3, 5), q(9, 10)))).toBe("2/3");
    expect(text(div(sub(q(1), q(1, 3)), add(q(1), q(1, 2))))).toBe("4/9");
    expect(text(div(q(9, 14), q(3, 7)))).toBe("3/2");
    expect(text(div(q(1, 2), q(3, 4)))).toBe("2/3");
    expect(() => div(q(1), q(0))).toThrow();
  });
  it("places the exact negative points and a strictly intermediate rational on one scale", () => {
    expect(compare(q(-3, 4), q(-1, 2))).toBe(-1);
    expect(common(q(-3, 4), q(-1, 2))).toEqual({
      denominator: 4n,
      leftNumerator: -3n,
      rightNumerator: -2n,
    });
    expect(text(midpoint(q(-2, 3), q(-3, 5)))).toBe("-19/30");
    expect(text(midpoint(q(-7, 10), q(-2, 3)))).toBe("-41/60");
    expect(compare(q(13, 16), q(17, 20))).toBe(-1);
    expect(compare(q(5, 8), q(7, 12))).toBe(1);
    expect(compare(q(-5, 6), q(-7, 8))).toBe(1);
  });
  it("distinguishes a finite tail from the stated repeating block exactly", () => {
    expect(text(decimal("0", "375", ""))).toBe("3/8");
    expect(text(decimal("0", "", "27"))).toBe("3/11");
    expect(text(decimal("0", "1", "6"))).toBe("1/6");
    expect(text(decimal("1", "2", "3"))).toBe("37/30");
    expect(text(decimal("0", "", "45"))).toBe("5/11");
    expect(text(sub(decimal("0", "", "45"), decimal("0", "45", "")))).toBe(
      "1/220",
    );
    expect(text(decimal("0", "", "9"))).toBe("1");
    expect(text(decimal("0", "0", "3", true))).toBe("-1/30");
  });
  it("reports exact decimal periods without calling display truncation termination", () => {
    expect(info(q(37, 30))).toEqual({
      sign: "",
      whole: "1",
      nonRepeating: "2",
      repeat: "3",
      terminated: false,
      truncated: false,
      display: "1,2(3)",
    });
    expect(info(q(-1, 8))).toEqual({
      sign: "-",
      whole: "0",
      nonRepeating: "125",
      repeat: "",
      terminated: true,
      truncated: false,
      display: "-0,125",
    });
    expect(info(q(1, 3), 1).display).toBe("0,(3)");
    expect(info(q(1, 2n ** 100n), 3)).toMatchObject({
      terminated: true,
      truncated: true,
      repeat: "",
      display: "0,000…",
    });
    expect(info(q(1, 233), 3)).toMatchObject({
      terminated: false,
      truncated: true,
      repeat: "",
      display: "0,004…",
    });
  });
  it("distinguishes adjacent whole-plus-repeating decimals by exact division", () => {
    expect(info(q(123, 99)).display).toBe("1,(24)");
    expect(text(decimal("1", "", "23"))).toBe("122/99");
    expect(text(sub(q(123, 99), q(37, 30)))).toBe("1/110");
    expect(text(decimal("1", "2", "3"))).toBe("37/30");
  });
  it("keeps the changing whole and the original whole as different models", () => {
    const remaining = flow(q(80), q(1, 4), q(1, 3), "remaining");
    expect(
      Object.fromEntries(
        Object.entries(remaining).map(([k, v]) => [k, text(v)]),
      ),
    ).toEqual({
      firstUsed: "20",
      afterFirst: "60",
      secondUsed: "20",
      remaining: "40",
      fractionRemaining: "1/2",
    });
    expect(text(initial(q(40), q(1, 4), q(1, 3), "remaining"))).toBe("80");
    expect(text(initial(q(18), q(1, 5), q(1, 4), "remaining"))).toBe("30");
    expect(text(flow(q(24), q(1, 2), q(1, 3), "remaining").remaining)).toBe(
      "8",
    );
    expect(text(flow(q(24), q(1, 2), q(1, 3), "initial").remaining)).toBe("4");
    expect(text(flow(q(0), q(1, 2), q(1, 3)).fractionRemaining)).toBe("1/3");
  });
  it("rejects nonphysical and noninvertible conditions rather than inventing initial values", () => {
    expect(() => flow(q(-1), q(1, 2), q(1, 3))).toThrow();
    expect(() => flow(q(20), q(3, 2), q(0))).toThrow();
    expect(() => flow(q(20), q(1, 2), q(2, 3), "initial")).toThrow();
    expect(() => initial(q(0), q(1), q(0))).toThrow();
    expect(() => initial(q(1), q(1, 2), q(1), "remaining")).toThrow();
    expect(() => initial(q(-1), q(0), q(0))).toThrow();
  });
  it("preserves large integer distinctions and rejects unsafe numeric or decimal input", () => {
    const large = 2n ** 120n;
    expect(compare(q(large + 1n, large), q(1))).toBe(1);
    expect(text(sub(q(large + 1n, large), q(1)))).toBe(`1/${large}`);
    for (const bad of [1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])
      expect(() => q(bad)).toThrow();
    expect(() => decimal("-1", "2", "3")).toThrow();
    expect(() => decimal("1", "2,3", "")).toThrow();
    expect(() => decimal("0", "", "x")).toThrow();
    expect(() => decimal("0", "", "1234567890123")).toThrow();
    expect(() => info(q(1, 3), 0)).toThrow();
    expect(() => info(q(1, 3), 201)).toThrow();
    expect(() => info(q(1, 3), 1.5)).toThrow();
  });
});

it("matches integer cross-product oracles for small signed fraction operations", () => {
  const equivalent = (
    result: { n: bigint; d: bigint },
    expectedNumerator: number,
    expectedDenominator: number,
  ) => {
    expect(result.d).toBeGreaterThan(0n);
    expect(result.n * BigInt(expectedDenominator)).toBe(
      BigInt(expectedNumerator) * result.d,
    );
  };
  for (let an = -4; an <= 4; an++)
    for (let ad = 1; ad <= 6; ad++)
      for (let bn = -4; bn <= 4; bn++)
        for (let bd = 1; bd <= 6; bd++) {
          const a = q(an, ad),
            b = q(bn, bd);
          equivalent(add(a, b), an * bd + bn * ad, ad * bd);
          equivalent(sub(a, b), an * bd - bn * ad, ad * bd);
          equivalent(mul(a, b), an * bn, ad * bd);
          if (bn !== 0) equivalent(div(a, b), an * bd, ad * bn);
          else expect(() => div(a, b)).toThrow(RangeError);
          const crossDifference = an * bd - bn * ad;
          expect(compare(a, b)).toBe(Math.sign(crossDifference));
        }
});

it("normalizes signs and removes every common divisor without changing the ratio", () => {
  for (let numerator = -9; numerator <= 9; numerator++)
    for (let denominator = -8; denominator <= 8; denominator++) {
      if (denominator === 0) continue;
      const actual = q(numerator, denominator);
      expect(actual.d).toBeGreaterThan(0n);
      expect(actual.n * BigInt(denominator)).toBe(BigInt(numerator) * actual.d);
      if (numerator === 0) expect(actual).toEqual({ n: 0n, d: 1n });
      for (let factor = 2n; factor <= actual.d; factor++)
        expect(actual.n % factor === 0n && actual.d % factor === 0n).toBe(
          false,
        );
    }
});

it("does not mutate the caller's rational inputs while normalizing or composing them", () => {
  const a = Object.freeze({ n: -6n, d: -8n });
  const b = Object.freeze({ n: -1n, d: 2n });
  expect(text(a)).toBe("3/4");
  expect(text(add(a, b))).toBe("1/4");
  expect(text(sub(a, b))).toBe("5/4");
  expect(text(mul(a, b))).toBe("-3/8");
  expect(text(div(a, b))).toBe("-3/2");
  expect(text(neg(a))).toBe("-3/4");
  expect(text(abs(b))).toBe("1/2");
  expect(text(midpoint(a, b))).toBe("1/8");
  expect(info(a).display).toBe("0,75");
  expect(a).toEqual({ n: -6n, d: -8n });
  expect(b).toEqual({ n: -1n, d: 2n });
});
