import { describe, it, expect } from "vitest";
import {
 abs038Solve, abs038Probe, abs038Piecewise, abs038Properties, abs038Graph,
 abs038Distances, abs038Nested, abs038Pair, abs038Parameter, abs038Scope,
 abs038OGMExample, abs038Value, abs038Format,
} from "../src/learning/absoluteValueSource038Model";

describe("Kaynak038: mutlak değerde koşul, bütün çözüm ve kaynak hataları",()=>{
 it("uzaklığı konumdan ayırır, sıfırı ve kesri korur",()=>{
  expect(abs038Value(-7)).toEqual({n:7,d:1});expect(abs038Value(0)).toEqual({n:0,d:1});expect(abs038Value(-6,4)).toEqual({n:3,d:2});
  expect(()=>abs038Value(1,0)).toThrow();
 });
 it("iki kaynak kökü ve sıfırdaki tek kökü tekrarsız üretir",()=>{
  expect(abs038Solve(2,1,"=",7).roots).toEqual([{n:-4,d:1},{n:3,d:1}]);
  expect(abs038Solve(2,-4,"=",0).label).toBe("{2}");
  expect(abs038Solve(2,1,"=",-7).kind).toBe("empty");
 });
 it("k negatif/sıfır iken beş işareti ayrı değerlendirir",()=>{
  for(const op of ["=","<","<="]as const)expect(abs038Solve(1,-2,op,-1).kind).toBe("empty");
  for(const op of [">",">="]as const)expect(abs038Solve(1,-2,op,-1).kind).toBe("all");
  expect(abs038Solve(1,-2,"<",0).kind).toBe("empty");
  expect(abs038Solve(1,-2,"<=",0).label).toBe("{2}");
  expect(abs038Solve(1,-2,">",0).label).toBe("(−∞, 2) ∪ (2, ∞)");
  expect(abs038Solve(1,-2,">=",0).kind).toBe("all");
 });
 it("sıfır katsayıda iki kök uydurmaz; doğru sabit koşul bütün x verir",()=>{
  expect(abs038Solve(0,-3,"=",3).kind).toBe("all");
  expect(abs038Solve(0,-3,"=",-3).kind).toBe("empty");
  expect(abs038Solve(0,0,"<=",0).kind).toBe("all");
  expect(abs038Solve(0,0,">",0).kind).toBe("empty");
 });
 it("kaynak iç/dış aralıklarını ve negatif katsayının sırasını korur",()=>{
  expect(abs038Solve(3,-2,"<",7).label).toBe("(-5/3, 3)");
  expect(abs038Solve(2,-1,">=",5).label).toBe("(−∞, -2] ∪ [3, ∞)");
  expect(abs038Solve(4,-3,"<=",9).label).toBe("[-3/2, 3]");
  expect(abs038Solve(-2,1,"<",5).label).toBe("(-2, 3)");
 });
 it("ilk ifadedeki iç/dış/uç denemesi set üyeliğiyle aynı sonucu verir",()=>{
  const samples=[[-5,3],[-2,1],[0,1],[3,1],[13,4]];
  for(const[n,d]of samples){const r=abs038Probe(3,-2,"<",7,n,d);expect(r.holds).toBe(r.member);}
  expect(abs038Probe(3,-2,"<",7,-5,3).holds).toBe(false);
 });
 it("parçalı sınırı ve negatif/sıfır katsayıdaki formülü güvenli üretir",()=>{
  const left=abs038Piecewise(2,-4,1),right=abs038Piecewise(2,-4,3),edge=abs038Piecewise(2,-4,2);
  expect([left.leftA,left.leftB]).toEqual([-2,4]);expect([right.rightA,right.rightB]).toEqual([2,-4]);expect(edge.value.n).toBe(0);
  const negative=abs038Piecewise(-2,4,1);expect([negative.leftA,negative.leftB]).toEqual([-2,4]);
  const constant=abs038Piecewise(0,-5,20);expect([constant.constant,constant.leftB,constant.rightB,constant.value.n]).toEqual([true,5,5,5]);
 });
 it("parçalı katsayıları ve sabit grafiğin sıfırını eksi sıfır olarak taşımaz",()=>{
  for(const a of [-2,2]){const p=abs038Piecewise(a,0,1);expect(Object.is(p.leftB,-0)).toBe(false);expect(Object.is(p.rightB,-0)).toBe(false);}
  for(const sign of [-1,1]){const g=abs038Graph(0,0,sign,0,0);expect(g.leftSlope).toBe(0);expect(g.rightSlope).toBe(0);expect(g.roots.k).toBe(0);}
  expect(abs038Distances(0,0,0,1,0).rightB).toBe(0);
 });
 it("toplamda eşitlik koşulunu ve sıfır payda yasağını saklar",()=>{
  const opposite=abs038Properties(2,1,-5,1);expect([opposite.absSum.n,opposite.sumOfAbs.n,opposite.triangleEquality,opposite.sameDirectionOrZero]).toEqual([3,7,false,false]);
  expect(abs038Properties(-2,1,-5,1).triangleEquality).toBe(true);
  expect(abs038Properties(0,1,-5,1).triangleEquality).toBe(true);
  expect(abs038Properties(6,1,0,1).quotient).toBeNull();
 });
 it("çarpım/bölüm ve kare özelliğini yanlış toplam genellemesinden ayırır",()=>{
  const r=abs038Properties(-6,1,2,1);expect(r.absProduct).toEqual(r.productOfAbs);expect(r.absQuotient).toEqual(r.quotientOfAbs);
  expect(r.square).toEqual({n:36,d:1});expect(r.absSquare).toEqual(r.square);expect(r.absSquare).not.toEqual(r.u);
 });
 it("V tepesini, kökleri ve yatay ölçeği aynı matematikten kurar",()=>{
  const base=abs038Graph(1,-2,1,-1,2);expect([base.vertexX,base.vertexY]).toEqual([{n:2,d:1},{n:-1,d:1}]);expect(base.roots.label).toBe("{1} ∪ {3}");
  const scaled=abs038Graph(2,-4,1,-1,2);expect(scaled.roots.label).toBe("{3/2} ∪ {5/2}");expect([scaled.leftSlope,scaled.rightSlope]).toEqual([-2,2]);
 });
 it("dış çarpanı değiştirirken dış toplama sabitini ters çevirmez",()=>{
  const down=abs038Graph(1,-2,-1,-1,2);expect(down.vertexY).toEqual({n:-1,d:1});expect(down.roots.kind).toBe("empty");expect([down.leftSlope,down.rightSlope]).toEqual([1,-1]);
  expect(abs038Graph(1,-2,-1,1,2).roots.label).toBe("{1} ∪ {3}");
 });
 it("a=0 grafiğini sahte V yerine sabit fonksiyon olarak ayırır",()=>{
  const zero=abs038Graph(0,3,-1,3,5);expect(zero.constant).toBe(true);expect(zero.vertexX).toBeNull();expect(zero.roots.kind).toBe("all");
  expect(abs038Graph(0,3,1,0,5).roots.kind).toBe("empty");
 });
 it("iki uzaklığın minimumunu tek orta noktaya daraltmaz",()=>{
  const r=abs038Distances(-1,2,0,1,3);expect(r.gap).toBe(3);expect(r.minimizerLabel).toBe("[-1, 2]");expect(r.label).toBe("[-1, 2]");
  const outside=abs038Distances(-1,2,4,1,3);expect(outside.extraAboveMinimum).toEqual(outside.twiceOutside);expect(outside.total.n).toBe(7);
 });
 it("iki uzaklık denkleminde üç ayrı hedef dalını doğru kurar",()=>{
  expect(abs038Distances(1,4,0,1,5).label).toBe("{0} ∪ {5}");
  expect(abs038Distances(1,4,0,1,3).label).toBe("[1, 4]");
  expect(abs038Distances(1,4,0,1,2).label).toBe("∅");
  expect(abs038Distances(2,2,2,1,0).label).toBe("{2}");
 });
 it("iç içe mutlak değerde önce dışı çözer, negatif iç hedefi reddeder",()=>{
  expect(abs038Nested(0,3,1,2).label).toBe("{-4} ∪ {-2} ∪ {2} ∪ {4}");
  const discarded=abs038Nested(0,2,3,5);expect(discarded.label).toBe("{-5} ∪ {5}");expect(discarded.branches[1].allowed).toBe(false);
  expect(abs038Nested(0,3,-1,2).roots).toEqual([]);
 });
 it("iç hedef veya yarıçap sıfır olduğunda çakışan kökleri tek sayar",()=>{
  expect(abs038Nested(0,3,3,0).label).toBe("{-6} ∪ {0} ∪ {6}");
  expect(abs038Nested(0,3,0,0).label).toBe("{-3} ∪ {3}");
  expect(abs038Nested(2,0,0,2).label).toBe("{2}");
 });
 it("iki mutlak değer eşitliğini iki doğrusal kol ve özgün kontrolle çözer",()=>{
  const r=abs038Pair(1,-1,2,3,-2,3,false);expect(r.label).toBe("{-4} ∪ {-2/3}");expect(r.left).toEqual({n:5,d:3});expect(r.left).toEqual(r.right);expect(r.holds).toBe(true);
  expect(abs038Pair(1,-1,-1,1,0,1,false).label).toBe("ℝ");
 });
 it("karelerden gelen sahte adayı negatif sağ taraf filtresiyle ayıklar",()=>{
  const r=abs038Pair(1,0,0,-1,1,1,true);expect(r.candidateLabel).toBe("{-1} ∪ {1}");expect(r.label).toBe("∅");expect(r.squaresEqual).toBe(true);expect(r.holds).toBe(false);
  expect(abs038Pair(1,0,-1,0,-2,1,true).label).toBe("(−∞, 0]");
 });
 it("parametre sayısını sağ tarafın üç işaret dalından okur",()=>{
  expect(abs038Parameter(0,2).count).toBe(0);expect(abs038Parameter(1,2).label).toBe("{2}");expect(abs038Parameter(3,2).label).toBe("{0} ∪ {4}");
 });
 it("kaynağın çarpımlı eksik çizgi örneğinde iki farklı doğru konumu gizlemez",()=>{
  const r=abs038Scope("product",0);expect(r.values).toEqual([55,55,65]);expect(r.satisfyingPositions).toEqual([0,1]);expect(r.holds).toBe(true);
 });
 it("farklı sayılı özgün toplamalı kapsam aktarımı tek doğru konum verir",()=>{
  const r=abs038Scope("sum",2);expect(r.values).toEqual([4,-4,2,-4,4]);expect(r.satisfyingPositions).toEqual([2]);expect(r.value).toBe(2);
 });
 it("OGM seçili örneğinin x>0 koşulunu tesadüfi eşitlikten ayırır",()=>{
  const r=abs038OGMExample(2);expect([r.allowed,r.value.n,r.derived.n,r.equal]).toEqual([true,7,7,true]);
  const zero=abs038OGMExample(0);expect([zero.allowed,zero.equal]).toEqual([false,true]);
  expect(abs038OGMExample(-2).equal).toBe(false);
 });
 it("sayısal depolama ve işaret koşullarında bozuk veriyi sessiz doğru yapmaz",()=>{
  expect(()=>abs038Solve(1,0,"bad"as any,1)).toThrow();expect(()=>abs038Solve(1.5,0,"=",1)).toThrow();expect(()=>abs038Probe(1,0,"=",1,1,0)).toThrow();
  expect(()=>abs038Graph(1,0,0,0,1)).toThrow();expect(()=>abs038Pair(1,0,1,0,1,1,1 as any)).toThrow();expect(()=>abs038Scope("sum",5)).toThrow();
  expect(abs038Format(abs038Value(-9,6))).toBe("3/2");
 });
});
