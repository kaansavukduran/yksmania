import { describe, it, expect } from "vitest";
import { ebob034Pair, ebob034Euclid, ebob034Geometry, ebob034Timeline, ebob034SameRemainder, ebob034UnknownDivisor, ebob034PairConditions, ebob034Third, ebob034Cubes } from "../src/learning/ebobEkokSource034Model";
describe("source034 integer models",()=>{
  it("keeps the absent prime at exponent zero and counts signed divisors separately",()=>{
    const r=ebob034Pair(72,120);
    expect(r.gcd).toBe(24);expect(r.lcm).toBe(360);
    expect(r.rows.find((x)=>x.prime===5)).toEqual({prime:5,exponentA:0,exponentB:1,min:0,max:1});
    expect(r.divisors).toEqual([1,2,3,4,6,8,12,24]);expect(r.totalIntegerDivisorCount).toBe(16);
    expect(ebob034Pair(1,1)).toMatchObject({gcd:1,lcm:1,rows:[],positiveDivisorCount:1});
  });
  it("ends Euclid with a zero remainder while returning the preceding divisor",()=>{
    const r=ebob034Euclid(252,198);
    expect(r.rows.map((x)=>x.remainder)).toEqual([54,36,18,0]);
    expect(r).toMatchObject({gcd:18,lcm:2772});
  });
  it("separates rectangular tiling, ropes, cuts, closed marks and open marks",()=>{
    expect(ebob034Geometry(36,24,12)).toMatchObject({valid:true,optimal:true,x:3,y:2,squares:6,ropeParts:5,separateCuts:3,closedMarks:10,openMarks:4});
    expect(ebob034Geometry(36,24,18)).toMatchObject({valid:false,squares:null,ropeParts:null,openMarks:3});
    expect(ebob034Geometry(40,56,4)).toMatchObject({valid:true,optimal:false,squares:140});
  });
  it("handles exact time endpoints without counting the initial event as a positive recurrence",()=>{
    expect(ebob034Timeline(12,18,0,72,true,true)).toMatchObject({first:36,count:3,common:[0,36,72]});
    expect(ebob034Timeline(12,18,0,72,true,false).common).toEqual([0,36]);
    expect(ebob034Timeline(12,18,0,72,false,true).common).toEqual([36,72]);
    expect(ebob034Timeline(6,10,0,90,true,false).common).toEqual([0,30,60]);
    expect(ebob034Timeline(2,3,0,0,true,true).common).toEqual([0]);
  });
  it("finds offset recurrences and reports incompatible starts",()=>{
    expect(ebob034Timeline(12,18,6,72,true,true).first).toBe(24);
    expect(ebob034Timeline(10,15,5,60,true,true).first).toBe(20);
    expect(ebob034Timeline(8,12,4,60,true,true).first).toBe(16);
    expect(ebob034Timeline(4,6,1,60,true,true)).toMatchObject({compatible:false,first:null,common:[]});
  });
  it("keeps k=0 only when it still produces a positive same-remainder number",()=>{
    expect(ebob034SameRemainder(8,12,5,150).candidates).toEqual([5,29,53,77,101,125,149]);
    expect(ebob034SameRemainder(6,8,1,200).largest).toBe(193);
    expect(ebob034SameRemainder(6,8,0,25).candidates).toEqual([24]);
    expect(ebob034SameRemainder(6,8,6,200)).toMatchObject({valid:false,candidates:[]});
  });
  it("applies each remainder separately, including impossible and unbounded divisor cases",()=>{
    expect(ebob034UnknownDivisor(87,134,3,2).largest).toBe(12);
    expect(ebob034UnknownDivisor(17,25,5,5)).toMatchObject({gcd:4,valid:false,largest:null});
    expect(ebob034UnknownDivisor(5,5,5,5)).toMatchObject({valid:true,unbounded:true,largest:null});
    expect(ebob034UnknownDivisor(5,17,5,5)).toMatchObject({valid:true,unbounded:false,largest:12});
    expect(ebob034UnknownDivisor(5,17,6,5).valid).toBe(false);
  });
  it("enumerates all pair factors while rejecting loss of coprimality",()=>{
    const r=ebob034PairConditions(4,48);
    expect(r.rows.map((x)=>[x.x,x.y,x.coprime])).toEqual([[1,12,true],[2,6,false],[3,4,true]]);
    expect(r).toMatchObject({minSum:28,maxSum:52});
    expect(ebob034PairConditions(3,20)).toMatchObject({valid:false,accepted:[],minSum:null});
    expect(ebob034PairConditions(2,72).minSum).toBe(26);
  });
  it("checks both unknown-third conditions rather than only necessary divisibilities",()=>{
    expect(ebob034Third(18,12,6,360).smallest).toBe(120);
    expect(ebob034Third(20,30,10,420).smallest).toBe(70);
    expect(ebob034Third(4,8,2,16)).toMatchObject({valid:false,smallest:null,candidates:[]});
  });
  it("uses the third power of each edge ratio for separate solid cubes",()=>{
    expect(ebob034Cubes(12,18)).toMatchObject({side:36,x:3,y:2,countA:27,countB:8,volume:46656});
  });
  it("rejects nonpositive, noninteger and nonfinite source inputs",()=>{
    for(const n of [0,-1,1.5,NaN,Infinity])expect(()=>ebob034Pair(n,12)).toThrow();
    expect(()=>ebob034Timeline(0,12,0,72,true,true)).toThrow();
    expect(()=>ebob034UnknownDivisor(5,10,-1,0)).toThrow();
    expect(()=>ebob034Cubes(25,2)).toThrow();
  });
});
