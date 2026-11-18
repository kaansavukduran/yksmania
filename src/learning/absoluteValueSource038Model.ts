// Exact source038 teaching models; depends on the frozen source037 set arithmetic.
import {
  ineq037Fraction, ineq037Compare, ineq037Format, ineq037Normalize,
  ineq037Union, ineq037Intersection, ineq037Contains, ineq037SetLabel,
  ineq037Solve, type Ineq037Fraction, type Ineq037Interval,
  type Ineq037Operator,
} from "./basicInequalitiesSource037Model";
export type Abs038Fraction=Ineq037Fraction;
export type Abs038Interval=Ineq037Interval;
export type Abs038Operator="="|Ineq037Operator;
const MAX=BigInt(Number.MAX_SAFE_INTEGER);
function integer(v:number,min:number,max:number,name:string){if(!Number.isInteger(v)||v<min||v>max)throw new RangeError(`${name}: ${min}…${max} aralığında tam sayı olmalı.`);return v;}
function rational(n:bigint,d:bigint):Abs038Fraction{
  if(d===0n)throw new RangeError("Payda sıfır olamaz.");
  if(n===0n)return{n:0,d:1};if(d<0n){n=-n;d=-d;}
  let a=n<0n?-n:n,b=d;while(b!==0n)[a,b]=[b,a%b];n/=a;d/=a;
  if(n>MAX||n< -MAX||d>MAX)throw new RangeError("Kesir güvenli tam sayı temsilini aşıyor.");
  return ineq037Fraction(Number(n),Number(d));
}
const q=ineq037Fraction,cmp=ineq037Compare;
const scalar=(value:number)=>value===0?0:value;
function checked(v:Abs038Fraction){return q(v.n,v.d);}
function add(a:Abs038Fraction,b:Abs038Fraction){a=checked(a);b=checked(b);return rational(BigInt(a.n)*BigInt(b.d)+BigInt(b.n)*BigInt(a.d),BigInt(a.d)*BigInt(b.d));}
function negate(a:Abs038Fraction){return rational(-BigInt(a.n),BigInt(a.d));}
function multiply(a:Abs038Fraction,b:Abs038Fraction){a=checked(a);b=checked(b);return rational(BigInt(a.n)*BigInt(b.n),BigInt(a.d)*BigInt(b.d));}
function divide(a:Abs038Fraction,b:Abs038Fraction){a=checked(a);b=checked(b);return rational(BigInt(a.n)*BigInt(b.d),BigInt(a.d)*BigInt(b.n));}
function abs(a:Abs038Fraction){a=checked(a);return a.n<0?negate(a):a;}
function evalAffine(a:number,b:number,x:Abs038Fraction){return add(multiply(q(a),x),q(b));}
function full():Abs038Interval[]{return[{low:null,high:null,lowClosed:false,highClosed:false}];}
function point(x:Abs038Fraction):Abs038Interval{return{low:x,high:x,lowClosed:true,highClosed:true};}
function unique(values:Abs038Fraction[]){return values.map(checked).sort(cmp).filter((v,i,all)=>i===0||cmp(v,all[i-1])!==0);}
function relation(a:Abs038Fraction,op:Abs038Operator,b:Abs038Fraction){const c=cmp(a,b);return op==="="?c===0:op==="<"?c<0:op==="<="?c<=0:op===">"?c>0:c>=0;}
function operator(op:unknown):asserts op is Abs038Operator{if(typeof op!=="string"||!["=","<","<=",">",">="].includes(op))throw new RangeError("İlişki =, <, ≤, > veya ≥ olmalı.");}
function sample(n:number,d:number){integer(n,-1000,1000,"Deneme payı");integer(d,1,120,"Deneme paydası");return q(n,d);}
function linearEquality(a:number,b:number,c:number,d:number){const A=a-c,B=d-b;if(A===0)return B===0?full():[];return[point(q(B,A))];}
export const abs038Format=ineq037Format;
export const abs038SetLabel=ineq037SetLabel;
export function abs038Value(n:number,d=1){return abs(q(n,d));}

/** All real solutions of |a*x+b| op k, including a=0 and every sign of k. */
export function abs038Solve(a:number,b:number,op:Abs038Operator,k:number){
  integer(a,-12,12,"x katsayısı");integer(b,-60,60,"İç sabit");integer(k,-120,120,"Sağ taraf");operator(op);
  let intervals:Abs038Interval[];
  const center=a===0?null:q(-b,a),radius=a===0||k<0?null:q(k,Math.abs(a));
  if(a===0)intervals=relation(abs(q(b)),op,q(k))?full():[];
  else if(k<0)intervals=op===">"||op===">="?full():[];
  else if(op==="=")intervals=unique([q(k-b,a),q(-k-b,a)]).map(point);
  else if(op==="<"||op==="<=")intervals=ineq037Intersection(ineq037Solve(a,b,op==="<"?">":">=",0,-k).intervals,ineq037Solve(a,b,op,0,k).intervals);
  else intervals=ineq037Union(ineq037Solve(a,b,op===">"?"<":"<=",0,-k).intervals,ineq037Solve(a,b,op,0,k).intervals);
  intervals=ineq037Normalize(intervals);
  const all=intervals.length===1&&intervals[0].low===null&&intervals[0].high===null;
  const roots=op==="="&&!all?unique(intervals.flatMap(s=>s.low&&s.high&&cmp(s.low,s.high)===0?[s.low]:[])):[];
  return{a,b,op,k,center,radius,intervals,roots,label:ineq037SetLabel(intervals),kind:all?"all"as const:intervals.length?"set"as const:"empty"as const};
}
export function abs038Probe(a:number,b:number,op:Abs038Operator,k:number,xNumerator:number,xDenominator=1){
  const solved=abs038Solve(a,b,op,k),x=sample(xNumerator,xDenominator),inside=evalAffine(a,b,x),value=abs(inside);
  return{...solved,x,inside,value,holds:relation(value,op,q(k)),member:ineq037Contains(solved.intervals,x)};
}
export function abs038Piecewise(a:number,b:number,xNumerator:number,xDenominator=1){
  integer(a,-12,12,"x katsayısı");integer(b,-60,60,"İç sabit");const x=sample(xNumerator,xDenominator),inside=evalAffine(a,b,x),value=abs(inside),threshold=a===0?null:q(-b,a);
  return{a,b,x,inside,value,threshold,selectedBranch:inside.n<0?"negate"as const:"same"as const,
    leftA:a===0?0:a>0?-a:a,leftB:scalar(a===0?Math.abs(b):a>0?-b:b),rightA:a===0?0:a>0?a:-a,rightB:scalar(a===0?Math.abs(b):a>0?b:-b),
    constant:a===0,constantValue:Math.abs(b)};
}
export function abs038Properties(un:number,ud:number,vn:number,vd:number){
  const u=sample(un,ud),v=sample(vn,vd),absU=abs(u),absV=abs(v),sum=add(u,v),product=multiply(u,v),square=multiply(u,u);
  const sumOfAbs=add(absU,absV),absSum=abs(sum),difference=add(u,negate(v));
  return{u,v,absU,absV,sum,absSum,sumOfAbs,triangleHolds:cmp(absSum,sumOfAbs)<=0,triangleEquality:cmp(absSum,sumOfAbs)===0,sameDirectionOrZero:product.n>=0,product,absProduct:abs(product),productOfAbs:multiply(absU,absV),quotient:v.n===0?null:divide(u,v),absQuotient:v.n===0?null:abs(divide(u,v)),quotientOfAbs:v.n===0?null:divide(absU,absV),square,absSquare:abs(square),distance:abs(difference),equalPoints:cmp(u,v)===0};
}
export function abs038Graph(a:number,b:number,verticalSign:number,offset:number,xNumerator:number,xDenominator=1){
  integer(a,-12,12,"İç x katsayısı");integer(b,-60,60,"İç sabit");if(verticalSign!==1&&verticalSign!==-1)throw new RangeError("Dış çarpan +1 veya −1 olmalı.");integer(offset,-30,30,"Dış toplama sabiti");
  const x=sample(xNumerator,xDenominator),inside=evalAffine(a,b,x),value=add(multiply(q(verticalSign),abs(inside)),q(offset));
  const vertexX=a===0?null:q(-b,a),vertexY=a===0?null:q(offset),roots=abs038Solve(a,b,"=",scalar(-offset*verticalSign));
  return{a,b,verticalSign,offset,x,inside,value,vertexX,vertexY,constant:a===0,constantValue:a===0?verticalSign*Math.abs(b)+offset:null,leftSlope:scalar(-verticalSign*Math.abs(a)),rightSlope:scalar(verticalSign*Math.abs(a)),roots};
}
export function abs038Distances(a:number,b:number,xNumerator:number,xDenominator:number,target:number){
  integer(a,-30,30,"İlk nokta");integer(b,-30,30,"İkinci nokta");integer(target,-120,120,"Toplam hedefi");const x=sample(xNumerator,xDenominator),lo=Math.min(a,b),hi=Math.max(a,b),gap=hi-lo;
  const first=abs(add(x,q(-a))),second=abs(add(x,q(-b))),total=add(first,second),minimizers:Abs038Interval[]=[{low:q(lo),high:q(hi),lowClosed:true,highClosed:true}];
  const equation=target<gap?[]:target===gap?minimizers:unique([q(a+b-target,2),q(a+b+target,2)]).map(point);
  const outside=x.n<lo*x.d?add(q(lo),negate(x)):x.n>hi*x.d?add(x,q(-hi)):q(0);
  return{a,b,x,target,lo,hi,gap,first,second,total,minimizers,minimizerLabel:ineq037SetLabel(minimizers),equation,label:ineq037SetLabel(equation),holds:cmp(total,q(target))===0,outsideDistance:outside,extraAboveMinimum:add(total,q(-gap)),twiceOutside:multiply(q(2),outside),leftA:-2,leftB:a+b,middleValue:gap,rightA:2,rightB:scalar(-a-b)};
}
export function abs038Nested(center:number,c:number,r:number,xNumerator:number,xDenominator=1){
  integer(center,-30,30,"İç uzaklık merkezi");integer(c,-30,30,"İç uzaklıktan çıkarılan sayı");integer(r,-60,60,"Dış hedef");const x=sample(xNumerator,xDenominator),inner=abs(add(x,q(-center))),outerInside=add(inner,q(-c)),value=abs(outerInside);
  const targets=r<0?[]:[c+r,c-r],branches=targets.map(t=>({target:t,allowed:t>=0,roots:t>=0?unique([q(center-t),q(center+t)]):[]}));
  const roots=unique(branches.flatMap(branch=>branch.roots)),intervals=roots.map(point);
  return{center,c,r,x,inner,outerInside,value,branches,roots,intervals,label:ineq037SetLabel(intervals),holds:cmp(value,q(r))===0,member:ineq037Contains(intervals,x)};
}
/** safeRight solves |A|=B; otherwise solves |A|=|B|. The original sign filter is retained. */
export function abs038Pair(a:number,b:number,c:number,d:number,xNumerator:number,xDenominator:number,safeRight:boolean){
  [a,c].forEach(v=>integer(v,-12,12,"x katsayısı"));[b,d].forEach(v=>integer(v,-60,60,"Sabit"));if(typeof safeRight!=="boolean")throw new TypeError("Sağ tarafın mutlak olup olmadığı açık seçilmeli.");
  const first=linearEquality(a,b,c,d),second=linearEquality(a,b,-c,-d),squaredCandidates=ineq037Union(first,second),rightSign=ineq037Solve(c,d,">=",0,0).intervals;
  const intervals=safeRight?ineq037Intersection(squaredCandidates,rightSign):squaredCandidates,x=sample(xNumerator,xDenominator),A=evalAffine(a,b,x),B=evalAffine(c,d,x),left=abs(A),right=safeRight?B:abs(B);
  return{a,b,c,d,safeRight,x,A,B,left,right,first,second,squaredCandidates,candidateLabel:ineq037SetLabel(squaredCandidates),rightSign,rightSignLabel:ineq037SetLabel(rightSign),intervals,label:ineq037SetLabel(intervals),holds:cmp(left,right)===0,member:ineq037Contains(intervals,x),squaresEqual:cmp(multiply(A,A),multiply(B,B))===0,rightNonnegative:B.n>=0};
}
export function abs038Parameter(m:number,xNumerator:number,xDenominator=1){
  integer(m,-30,30,"Parametre m");const result=abs038Probe(1,-2,"=",m-1,xNumerator,xDenominator);return{...result,m,r:m-1,count:m<1?0:m===1?1:2};
}
export function abs038OGMExample(xNumerator:number,xDenominator=1){
  const x=sample(xNumerator,xDenominator),first=abs(multiply(q(3),x)),second=abs(multiply(q(-2),x)),third=abs(add(q(1),x)),value=add(add(first,second),negate(third)),derived=add(multiply(q(4),x),q(-1));
  return{x,allowed:x.n>0,first,second,third,value,derived,equal:cmp(value,derived)===0};
}
export function abs038Scope(preset:"product"|"sum",position:number){
  if(preset!=="product"&&preset!=="sum")throw new RangeError("Tanımlı kapsam örneği seçilmeli.");
  const terms=[-4,7,-6,8,-9];
  const values=preset==="product"?[Math.abs(-20)*3-5,Math.abs(-20*3)-5,Math.abs(-20*3-5)]:terms.map((_,i)=>Math.abs(terms.slice(0,i+1).reduce((a,b)=>a+b,0))+terms.slice(i+1).reduce((a,b)=>a+b,0));
  integer(position,0,values.length-1,"Kapanış konumu");
  const expressions=preset==="product"?["|−20|×3−5","|−20×3|−5","|−20×3−5|"]:["|−4|+7−6+8−9","|−4+7|−6+8−9","|−4+7−6|+8−9","|−4+7−6+8|−9","|−4+7−6+8−9|"];
  const labels=preset==="product"?["20’nin sağı","3’ün sağı","5’in sağı"]:["4’ün sağı","7’nin sağı","6’nın sağı","8’in sağı","9’un sağı"],target=preset==="product"?55:2;
  return{preset,position,target,values,expressions,labels,value:values[position],expression:expressions[position],satisfyingPositions:values.flatMap((v,i)=>v===target?[i]:[]),holds:values[position]===target};
}
