import {describe,it,expect} from "vitest";
import {
  ineq037Fraction as f,ineq037Format,ineq037Compare,ineq037Normalize,
  ineq037Union,ineq037Intersection,ineq037Contains,ineq037SetLabel,
  ineq037Solve,ineq037Test,ineq037Transform,ineq037Compound,ineq037Logic,
  ineq037Budget,ineq037Profit,ineq037Parameter,ineq037VariableFactor,
  type Ineq037Interval,type Ineq037Operator,
} from "../src/learning/basicInequalitiesSource037Model";
const interval=(low:number|null,high:number|null,lowClosed=false,highClosed=false):Ineq037Interval=>({low:low===null?null:f(low),high:high===null?null:f(high),lowClosed,highClosed});
describe("source037 exact inequality and interval teaching models",()=>{
  it("normalizes signed rational numbers and compares near-equal large fractions exactly",()=>{
    expect(f(12,-18)).toEqual({n:-2,d:3});expect(f(0,-3)).toEqual({n:0,d:1});
    expect(ineq037Format(f(32,5))).toBe("32/5");
    const m=Number.MAX_SAFE_INTEGER;
    expect(ineq037Compare(f(m,m-1),f(m-1,m-2))).toBe(-1);
    expect(()=>f(1,0)).toThrow(RangeError);expect(()=>f(1.5)).toThrow(RangeError);
  });
  it("keeps infinite ends open and distinguishes an empty interval from a closed singleton",()=>{
    expect(ineq037Normalize([interval(null,null,true,true)])).toEqual([interval(null,null)]);
    expect(ineq037Normalize([interval(1,1,true,false)])).toEqual([]);
    expect(ineq037SetLabel([interval(1,1,true,true)])).toBe("{1}");
    expect(ineq037Normalize([interval(3,-2,true,true)])).toEqual([]);
    expect(ineq037SetLabel([])).toBe("∅");
  });
  it("does not fill a missing open contact point when taking a union",()=>{
    const open=ineq037Union([interval(null,1)],[interval(1,null)]);
    expect(open).toHaveLength(2);expect(ineq037Contains(open,f(1))).toBe(false);
    expect(ineq037Contains(open,f(0))).toBe(true);expect(ineq037Contains(open,f(2))).toBe(true);
    expect(ineq037SetLabel(ineq037Union([interval(null,1,false,true)],[interval(1,null)]))).toBe("ℝ");
  });
  it("retains a touching intersection point only when both participating ends are closed",()=>{
    expect(ineq037Intersection([interval(0,1,true,true)],[interval(1,3,true,false)])).toEqual([interval(1,1,true,true)]);
    expect(ineq037Intersection([interval(0,1,true,false)],[interval(1,3,true,false)])).toEqual([]);
  });
  it("normalizes overlapping pieces without mutating input intervals",()=>{
    const input=[interval(3,8,false,true),interval(-2,4,true,false),interval(9,null,true,false)];const before=JSON.stringify(input);
    expect(ineq037SetLabel(ineq037Normalize(input))).toBe("[-2, 8] ∪ [9, ∞)");
    expect(JSON.stringify(input)).toBe(before);
    expect(ineq037SetLabel(ineq037Intersection(input,[interval(0,10,true,true)]))).toBe("[0, 8] ∪ [9, 10]");
  });
  it("solves the source closed-boundary and negative-coefficient examples",()=>{
    expect(ineq037Solve(5,-7,"<=",0,18)).toMatchObject({boundary:f(5),effectiveOperator:"<=",label:"(−∞, 5]"});
    expect(ineq037Test(5,-7,"<=",0,18,5)).toMatchObject({holds:true,member:true,left:f(18),right:f(18)});
    expect(ineq037Test(5,-7,"<=",0,18,6).holds).toBe(false);
    expect(ineq037Solve(-4,3,">",0,15)).toMatchObject({boundary:f(-3),effectiveOperator:"<",label:"(−∞, -3)"});
    expect(ineq037Test(-4,3,">",0,15,-4)).toMatchObject({holds:true,left:f(19),right:f(15)});
    expect(ineq037Test(-4,3,">",0,15,0).holds).toBe(false);
  });
  it("preserves whole-solution types when variable terms cancel",()=>{
    expect(ineq037Solve(5,-10,"<",5,-7)).toMatchObject({coefficient:0,kind:"all",label:"ℝ"});
    expect(ineq037Solve(5,-10,">",5,-7)).toMatchObject({coefficient:0,kind:"empty",label:"∅"});
    expect(ineq037Solve(0,0,"<=",0,0).kind).toBe("all");
    expect(ineq037Solve(0,0,"<",0,0).kind).toBe("empty");
  });
  it("keeps negative addition distinct from negative multiplication or division",()=>{
    expect(ineq037Transform(-3,"<",2,"multiply",-1)).toMatchObject({valid:true,flips:true,newLeft:f(3),newRight:f(-2),newOperator:">",newHolds:true});
    expect(ineq037Transform(-3,"<",2,"add",-1)).toMatchObject({valid:true,flips:false,newLeft:f(-4),newRight:f(1),newOperator:"<",newHolds:true});
    expect(ineq037Transform(-3,"<",2,"divide",-2)).toMatchObject({valid:true,flips:true,newLeft:f(3,2),newRight:f(-1),newOperator:">"});
    expect(ineq037Transform(3,"<",2,"multiply",-1)).toMatchObject({originalHolds:false,newHolds:false});
  });
  it("rejects zero multiplication as an equivalent step and zero division as undefined",()=>{
    expect(ineq037Transform(1,"<",2,"multiply",0)).toMatchObject({valid:false,newLeft:null,newOperator:null});
    expect(ineq037Transform(1,"<",2,"divide",0)).toMatchObject({valid:false,newHolds:null});
    expect(ineq037Transform(1,"<",2,"add",0)).toMatchObject({valid:true,flips:false,newOperator:"<"});
  });
  it("solves every source compound boundary with its own endpoint acceptance",()=>{
    expect(ineq037Compound(-2,3,1,1,10,false,true).label).toBe("(-1, 3]");
    expect(ineq037Compound(2,1,-1,3,5,true,false).label).toBe("[7, 16)");
    expect(ineq037Compound(-5,2,1,1,9,false,true).label).toBe("(-3, 4]");
    expect(ineq037Compound(-4,1,2,2,5,true,false).label).toBe("[-10, 8)");
  });
  it("reorders negative compound preimages and handles a zero middle coefficient",()=>{
    expect(ineq037Compound(-5,-2,1,1,9,false,true).label).toBe("[-4, 3)");
    expect(ineq037Compound(-2,0,1,1,10,false,true).label).toBe("ℝ");
    expect(ineq037Compound(5,0,1,1,10,true,true).label).toBe("∅");
  });
  it("switches the same two source conditions between intersection and union",()=>{
    expect(ineq037Logic(">",1,"<=",4,"and").label).toBe("(1, 4]");
    expect(ineq037Logic("<=",-2,">",3,"or").label).toBe("(−∞, -2] ∪ (3, ∞)");
    expect(ineq037Logic("<=",-2,">",3,"and").label).toBe("∅");
    expect(ineq037Logic("<",3,">",3,"or").intervals).toHaveLength(2);
    expect(ineq037Logic("<=",3,">",3,"or").label).toBe("ℝ");
  });
  it("takes the greatest valid integer count and checks its immediate next neighbor",()=>{
    expect(ineq037Budget(240,80,880,true)).toMatchObject({possible:true,maxCount:8,costAtMax:880,costAtNext:960});
    expect(ineq037Budget(1200,60,4200,true)).toMatchObject({possible:true,maxCount:50,costAtMax:4200,costAtNext:4260});
    expect(ineq037Budget(240,80,880,false)).toMatchObject({maxCount:7,costAtMax:800,costAtNext:880});
    expect(ineq037Budget(240,80,881,false)).toMatchObject({maxCount:8});
    expect(ineq037Budget(240,80,239,true)).toMatchObject({possible:false,maxCount:null,zeroAffordable:false});
  });
  it("does not accidentally discard or invent the zero-person budget case",()=>{
    expect(ineq037Budget(0,60,0,true)).toMatchObject({maxCount:0,costAtMax:0,costAtNext:60,zeroAffordable:true});
    expect(ineq037Budget(0,60,0,false)).toMatchObject({possible:false,maxCount:null,zeroAffordable:false});
  });
  it("matches the actual official TL range and explicit normalized bin-TL model",()=>{
    expect(ineq037Profit(20,1,false,false,false)).toMatchObject({label:"(10, 30)",tlLabel:"(10000, 30000)",unitScale:1000,cost:f(60),firstSale:f(70),secondSale:f(40),originalTL:f(20000),costTL:f(60000),firstSaleTL:f(70000),secondSaleTL:f(40000),midpoint:f(20000),radius:f(10000),distanceOperator:"<",accepted:true});
    expect(ineq037Profit(10,1,false,false,false).accepted).toBe(false);
    expect(ineq037Profit(30,1,false,false,false).accepted).toBe(false);
  });
  it("changes only the appropriate break-even endpoint when wording becomes inclusive",()=>{
    expect(ineq037Profit(10,1,true,false,false)).toMatchObject({accepted:true,label:"[10, 30)",distanceOperator:null});
    expect(ineq037Profit(30,1,false,true,false)).toMatchObject({accepted:true,label:"(10, 30]",distanceOperator:null});
    expect(ineq037Profit(30,1,true,true,false)).toMatchObject({accepted:true,label:"[10, 30]",distanceOperator:"<="});
    expect(ineq037Profit(60,1,true,false,true)).toMatchObject({unitScale:1,label:"[60, ∞)",cost:f(140),firstSale:f(140),second:null,accepted:true});
    expect(ineq037Profit(60,1,false,false,true).accepted).toBe(false);
  });
  it("retains positive, negative and zero parameter branches",()=>{
    expect(ineq037Parameter(2,0)).toMatchObject({aSign:"positive",label:"(−∞, 3)",mayDivide:true,holds:true});
    expect(ineq037Parameter(-2,0)).toMatchObject({aSign:"negative",label:"(-3, ∞)",mayDivide:true,holds:true});
    expect(ineq037Parameter(0,-100)).toMatchObject({aSign:"zero",label:"ℝ",mayDivide:false,holds:true});
  });
  it("checks a variable divisor sign for the selected x without choosing one global direction",()=>{
    expect(ineq037VariableFactor(0)).toMatchObject({factor:f(-1),sign:"negative",canDivide:true,left:f(-2),right:f(-5),operator:">"});
    expect(ineq037VariableFactor(1)).toMatchObject({factor:f(0),sign:"zero",canDivide:false,left:null,right:null,operator:null});
    expect(ineq037VariableFactor(3,2)).toMatchObject({factor:f(1,2),sign:"positive",canDivide:true,left:f(4),right:f(10),operator:"<"});
  });
  it("rejects invalid bounded input and non-string operators",()=>{
    expect(()=>ineq037Solve(1,0,"≤"as Ineq037Operator,0,2)).toThrow(RangeError);
    expect(()=>ineq037Solve(1,0,{toString:()=>"<"}as unknown as Ineq037Operator,0,2)).toThrow(RangeError);
    expect(()=>ineq037Solve(1.5,0,"<",0,2)).toThrow(RangeError);
    expect(()=>ineq037Compound(0,1,0,0,2,true,true)).toThrow(RangeError);
    expect(()=>ineq037Budget(0,0,10,true)).toThrow(RangeError);
    expect(()=>ineq037Parameter(NaN,0)).toThrow(RangeError);
    expect(()=>ineq037Profit(1,1,1 as unknown as boolean,false,false)).toThrow(TypeError);
  });
});
