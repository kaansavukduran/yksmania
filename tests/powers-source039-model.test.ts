import { expect, it } from "vitest";
import {
  power039Fraction as F, power039IntegerPower, power039Anatomy,
  power039Laws, power039SameExponent, power039PrimeSubstitution,
  power039Scientific, power039ScientificOperation, power039LogPoint,
  power039RationalPower, power039NestedRational, power039Growth,
} from "../src/learning/powersSource039Model";
import { restoredPower039Value } from "../src/learning/usePower039State";

it("separates grouping, outside minus, reciprocal and undefined zero powers", () => {
  expect(power039Anatomy(-2, 4).result).toMatchObject({ok:true,value:F(16)});
  expect(power039Anatomy(-2, 4, true).result).toMatchObject({ok:true,value:F(-16)});
  expect(power039IntegerPower(F(-2), -3)).toEqual({ok:true,value:F(-1,8)});
  expect(power039IntegerPower(F(0), 0).ok).toBe(false);
  expect(power039IntegerPower(F(0), -1).ok).toBe(false);
  expect(power039IntegerPower(F(0), 3)).toEqual({ok:true,value:F(0)});
});

it("does not turn a sum into an exponent law or hide a zero denominator", () => {
  const laws=power039Laws(F(2), 3, 4);
  expect(laws.product).toMatchObject({ok:true,value:F(128)});
  expect(laws.quotient).toMatchObject({ok:true,value:F(1,2)});
  expect(power039SameExponent(F(2),F(0),-1).product.ok).toBe(false);
  expect(power039PrimeSubstitution(2,-1,2,-2)).toMatchObject({ok:true,direct:F(81,2500),substituted:F(81,2500)});
});

it("keeps scientific sums and normalization exact beyond binary floating precision", () => {
  expect(power039Scientific(F(810000000))).toMatchObject({kind:"normalized",coefficient:F(81,10),exponent:8});
  expect(power039Scientific(F(0))).toMatchObject({kind:"zero"});
  expect(power039ScientificOperation(F(99,10),9,F(99,10),9,"multiply")).toMatchObject({ok:true,value:F(98010000000000000000n)});
  expect(power039ScientificOperation(F(99,10),9,F(-99,10),9,"add")).toMatchObject({ok:true,value:F(0)});
});

it("classifies inclusive integer log boundaries exactly even when their coordinates round", () => {
  const d=10n**20n;
  expect(power039LogPoint(F(d+1n,d),-1,0)).toMatchObject({ok:true,clipped:true});
  expect(power039LogPoint(F(d-1n,d),0,1)).toMatchObject({ok:true,clipped:true});
  expect(power039LogPoint(F(1),0,1)).toMatchObject({ok:true,clipped:false,x:32});
  expect(power039LogPoint(F(10),0,1)).toMatchObject({ok:true,clipped:false,x:608});
  expect(power039LogPoint(F(d+1n,d),0,1)).toMatchObject({ok:true,clipped:false});
});

it("states the integer log-axis contract and fails closed on invalid geometry", () => {
  for(const [low,high,width,padding] of [
    [0,0,640,32],[1,0,640,32],[0.5,2,640,32],
    [0,Number.MAX_SAFE_INTEGER+1,640,32],
    [NaN,1,640,32],[0,Infinity,640,32],[0,1,Infinity,32],
    [0,1,640,NaN],[0,1,640,-1],[0,1,64,32],
  ]) expect(power039LogPoint(F(1),low,high,width,padding).ok).toBe(false);
  expect(power039LogPoint(F(0),0,1).ok).toBe(false);
  expect(power039LogPoint(F(-1),0,1).ok).toBe(false);
});

it("reduces rational exponents and retains the negative-base nesting counterexample", () => {
  expect(power039RationalPower(F(-8),2,6)).toMatchObject({kind:"exact",value:F(-2)});
  expect(power039RationalPower(F(-8),1,2)).toMatchObject({kind:"not-real"});
  const result=power039NestedRational(F(-1),2,1,2);
  expect(result).toMatchObject({ok:true,nested:{kind:"exact",value:F(1)},shortcut:{kind:"exact",value:F(-1)}});
  expect(power039Growth(F(200),F(0),0)).toMatchObject({ok:true,final:F(200),values:[{step:0,value:F(200)}]});
  expect(power039Growth(F(200),F(0),1)).toMatchObject({ok:true,final:F(0),values:[{step:0,value:F(200)},{step:1,value:F(0)}]});
});

it("ignores corrupt restored controls without writing or accepting impossible modes", () => {
  expect(restoredPower039Value("Anatomy.base",5,-2)).toBe(5);
  for(const value of [6,-6,0.1,Infinity,NaN,"3",null])
    expect(restoredPower039Value("Anatomy.base",value,-2)).toBe(-2);
  expect(restoredPower039Value("PowersSource039Lab.mode","growth","anatomy")).toBe("growth");
  expect(restoredPower039Value("PowersSource039Lab.mode","unknown","anatomy")).toBe("anatomy");
  expect(restoredPower039Value("Anatomy.outside",true,false)).toBe(true);
  expect(restoredPower039Value("Anatomy.outside","true",false)).toBe(false);
});
