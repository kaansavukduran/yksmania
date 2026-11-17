import { describe, expect, it } from "vitest";
import {
  eq036Fraction,eq036Format,eq036Solve,eq036Balance,eq036Expand,
  eq036FractionEquation,eq036Excluded,eq036Pattern,eq036Tickets,
  eq036TicketDifference,eq036Words,
} from "../src/learning/linearEquationsSource036Model";

describe("source036 exact linear-equation models",()=>{
  it("normalizes fractions and rejects undefined or imprecise input",()=>{
    expect(eq036Fraction(12,-18)).toEqual({n:-2,d:3});
    expect(eq036Fraction(0,-7)).toEqual({n:0,d:1});
    expect(eq036Format({n:32,d:5})).toBe("32/5");
    expect(()=>eq036Fraction(1,0)).toThrow(RangeError);
    expect(()=>eq036Fraction(0.1,2)).toThrow(RangeError);
    expect(()=>eq036Fraction(Number.MAX_SAFE_INTEGER+1,1)).toThrow(RangeError);
  });
  it("separates a unique root, an identity and a contradiction",()=>{
    expect(eq036Solve(5,-7,0,18)).toMatchObject({kind:"one",root:{n:5,d:1},leftAtRoot:{n:18,d:1},rightAtRoot:{n:18,d:1}});
    expect(eq036Solve(3,6,3,6)).toMatchObject({kind:"all",root:null});
    expect(eq036Solve(2,-2,2,5)).toMatchObject({kind:"none",root:null});
    expect(eq036Solve(0,0,0,7)).toMatchObject({kind:"none",root:null});
  });
  it("reaches the exact source balance 3x+6=24 and keeps a rational trial exact",()=>{
    expect(eq036Balance(3,6,0,24,12,2)).toMatchObject({equal:true,x:{n:6,d:1},left:{n:24,d:1},right:{n:24,d:1},root:{n:6,d:1}});
    expect(eq036Balance(3,6,0,24,5,2)).toMatchObject({equal:false,x:{n:5,d:2},left:{n:27,d:2},right:{n:24,d:1},difference:{n:-21,d:2}});
  });
  it("distributes the whole bracket including negative signs",()=>{
    expect(eq036Expand(4,3,2,10)).toMatchObject({constant:-12,wrongConstant:-3,correct:{root:{n:11,d:1}},wrong:{root:{n:13,d:2}}});
    expect(eq036Expand(-2,3,0,10)).toMatchObject({constant:6,correct:{root:{n:-2,d:1}}});
    expect(eq036Expand(0,3,0,0)).toMatchObject({correct:{kind:"all"},wrong:{kind:"none"}});
  });
  it("multiplies every fraction term and preserves both source roots",()=>{
    expect(eq036FractionEquation(-1,3,2,2,1,6)).toMatchObject({common:6,firstMultiplier:2,secondMultiplier:3,coefficient:5,constant:4,right:36,solution:{root:{n:32,d:5}},originalCheck:{n:6,d:1}});
    expect(eq036FractionEquation(2,4,-1,3,-1,1)).toMatchObject({common:12,firstMultiplier:3,secondMultiplier:-4,coefficient:-1,constant:10,right:12,solution:{root:{n:-2,d:1}},originalCheck:{n:1,d:1}});
  });
  it("classifies zero coefficient fraction equations before division",()=>{
    expect(eq036FractionEquation(0,2,0,2,-1,0).solution.kind).toBe("all");
    expect(eq036FractionEquation(0,2,0,2,-1,1).solution.kind).toBe("none");
    expect(()=>eq036FractionEquation(0,0,0,2,1,1)).toThrow(RangeError);
    expect(()=>eq036FractionEquation(0,2,0,2,0,1)).toThrow(RangeError);
  });
  it("keeps excluded values through reduction and identity",()=>{
    expect(eq036Excluded(1,-1,2)).toMatchObject({excluded:1,kind:"one",root:{n:3,d:1},forbiddenRoot:false});
    expect(eq036Excluded(-1,-1,2)).toMatchObject({excluded:1,kind:"none",root:null,forbiddenRoot:true,reduced:{root:{n:1,d:1}}});
    expect(eq036Excluded(-1,-1,1)).toMatchObject({excluded:1,kind:"all",everyAllowed:true});
    expect(eq036Excluded(1,-1,1)).toMatchObject({excluded:1,kind:"none",everyAllowed:false});
  });
  it("does not lose the k=2 parameter branch",()=>{
    for(let k=-10;k<=10;k++){
      const value=eq036Solve(k,-k,2,-k);
      if(k===2)expect(value.kind).toBe("all");
      else expect(value).toMatchObject({kind:"one",root:{n:0,d:1}});
    }
  });
  it("changes the model when the verbal operation order changes",()=>{
    expect(eq036Words(3,5,20,false)).toMatchObject({constant:5,solution:{root:{n:5,d:1}}});
    expect(eq036Words(3,5,20,true)).toMatchObject({constant:15,solution:{root:{n:5,d:3}}});
    expect(eq036Words(3,0,20,false).solution.root).toEqual(eq036Words(3,0,20,true).solution.root);
  });
  it("preserves the n-1 transitions and rejects a fractional step index",()=>{
    expect(eq036Pattern(1,3,241,81)).toMatchObject({n:81,valid:true,preview:241,transitions:80});
    expect(eq036Pattern(2,3,241,81)).toMatchObject({candidate:{n:242,d:3},valid:false,n:null,kind:"none",preview:242});
    expect(eq036Pattern(5,4,69,17)).toMatchObject({n:17,preview:69});
    expect(eq036Pattern(10,-3,1,1)).toMatchObject({n:4,preview:10,transitions:0});
  });
  it("handles constant patterns without dividing by zero",()=>{
    expect(eq036Pattern(5,0,5,20)).toMatchObject({kind:"every-positive",candidate:null,n:null,preview:5});
    expect(eq036Pattern(5,0,6,20)).toMatchObject({kind:"none",candidate:null,n:null});
    expect(eq036Pattern(5,4,1,1)).toMatchObject({candidate:{n:0,d:1},valid:false});
  });
  it("filters ticket roots by integer and group-count conditions",()=>{
    expect(eq036Tickets(80,50,12,780)).toMatchObject({adult:6,students:6,valid:true});
    expect(eq036Tickets(80,50,12,781)).toMatchObject({adult:null,valid:false,impossible:true});
    expect(eq036Tickets(80,50,12,200)).toMatchObject({adult:null,valid:false,impossible:true});
    expect(eq036Tickets(50,50,12,600)).toMatchObject({allCounts:true,impossible:false});
    expect(eq036Tickets(50,50,12,601)).toMatchObject({allCounts:false,impossible:true});
  });
  it("counts the price difference once for each adult ticket",()=>{
    expect(eq036TicketDifference(2,3,45,390)).toMatchObject({student:{n:60,d:1},adult:{n:105,d:1},valid:true,check:{n:390,d:1}});
    expect(eq036TicketDifference(2,3,45,50)).toMatchObject({student:{n:-8,d:1},adult:{n:37,d:1},valid:false});
    expect(()=>eq036TicketDifference(0,0,45,390)).toThrow(RangeError);
  });
  it("rejects inputs outside the explicitly supported bounded models",()=>{
    expect(()=>eq036Solve(NaN,0,0,1)).toThrow(RangeError);
    expect(()=>eq036Solve(1.5,0,0,1)).toThrow(RangeError);
    expect(()=>eq036Balance(1,0,0,1,1,0)).toThrow(RangeError);
    expect(()=>eq036Pattern(1,3,241,0)).toThrow(RangeError);
    expect(()=>eq036Words(3,5,20,0 as unknown as boolean)).toThrow(TypeError);
  });
});
