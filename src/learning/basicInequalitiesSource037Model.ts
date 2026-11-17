// Source037 private proposal: exact rational boundaries and set operations; no learning writes.
export interface Ineq037Fraction { n:number; d:number }
export interface Ineq037Interval { low:Ineq037Fraction|null; high:Ineq037Fraction|null; lowClosed:boolean; highClosed:boolean }
export type Ineq037Operator = "<"|"<="|">"|">=";
const MAX=BigInt(Number.MAX_SAFE_INTEGER);
function integer(value:number,min:number,max:number,name:string){
  if(!Number.isInteger(value)||value<min||value>max)throw new RangeError(`${name}: ${min}…${max} aralığında tam sayı olmalı.`);
  return value;
}
function fractionBig(n:bigint,d:bigint):Ineq037Fraction{
  if(d===0n)throw new RangeError("Payda sıfır olamaz.");
  if(n===0n)return{n:0,d:1};
  if(d<0n){n=-n;d=-d;}
  let a=n<0n?-n:n,b=d;
  while(b!==0n)[a,b]=[b,a%b];
  n/=a;d/=a;
  if(n>MAX||n< -MAX||d>MAX)throw new RangeError("Sonuç güvenli tam sayı temsilini aşıyor.");
  return{n:Number(n),d:Number(d)};
}
export function ineq037Fraction(n:number,d=1):Ineq037Fraction{
  if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d))throw new RangeError("Pay ve payda güvenli tam sayılar olmalı.");
  return fractionBig(BigInt(n),BigInt(d));
}
function checked(q:Ineq037Fraction){return ineq037Fraction(q.n,q.d);}
function add(a:Ineq037Fraction,b:Ineq037Fraction){
  a=checked(a);b=checked(b);return fractionBig(BigInt(a.n)*BigInt(b.d)+BigInt(b.n)*BigInt(a.d),BigInt(a.d)*BigInt(b.d));
}
function multiply(a:Ineq037Fraction,b:Ineq037Fraction){
  a=checked(a);b=checked(b);return fractionBig(BigInt(a.n)*BigInt(b.n),BigInt(a.d)*BigInt(b.d));
}
function divide(a:Ineq037Fraction,b:Ineq037Fraction){
  a=checked(a);b=checked(b);return fractionBig(BigInt(a.n)*BigInt(b.d),BigInt(a.d)*BigInt(b.n));
}
function scale(a:Ineq037Fraction,k:number){return multiply(a,ineq037Fraction(k));}
export function ineq037Compare(a:Ineq037Fraction,b:Ineq037Fraction){
  a=checked(a);b=checked(b);const delta=BigInt(a.n)*BigInt(b.d)-BigInt(b.n)*BigInt(a.d);
  return delta<0n?-1:delta>0n?1:0;
}
export function ineq037Format(q:Ineq037Fraction){q=checked(q);return q.d===1?String(q.n):`${q.n}/${q.d}`;}
function op(value:unknown):asserts value is Ineq037Operator{
  if(typeof value!=="string"||!["<","<=",">",">="].includes(value))throw new RangeError("Eşitsizlik işareti <, ≤, > veya ≥ olmalı.");
}
function bool(value:unknown,name:string):asserts value is boolean{
  if(typeof value!=="boolean")throw new TypeError(`${name} açıkça doğru/yanlış seçilmeli.`);
}
function truth(left:Ineq037Fraction,operator:Ineq037Operator,right:Ineq037Fraction){
  const order=ineq037Compare(left,right);return operator==="<"?order<0:operator==="<="?order<=0:operator===">"?order>0:order>=0;
}
function flipped(operator:Ineq037Operator):Ineq037Operator{return operator==="<"?">":operator==="<="?">=":operator===">"?"<":"<=";}
function full():Ineq037Interval{return{low:null,high:null,lowClosed:false,highClosed:false};}
function canonical(segment:Ineq037Interval):Ineq037Interval|null{
  bool(segment.lowClosed,"Sol uç");bool(segment.highClosed,"Sağ uç");
  const low=segment.low===null?null:checked(segment.low),high=segment.high===null?null:checked(segment.high);
  const lowClosed=low!==null&&segment.lowClosed,highClosed=high!==null&&segment.highClosed;
  if(low&&high){const order=ineq037Compare(low,high);if(order>0||(order===0&&!(lowClosed&&highClosed)))return null;}
  return{low,high,lowClosed,highClosed};
}
export function ineq037Normalize(input:Ineq037Interval[]):Ineq037Interval[]{
  const rows=input.map(canonical).filter((r):r is Ineq037Interval=>r!==null).sort((a,b)=>{
    if(a.low===null)return b.low===null?0:-1;if(b.low===null)return 1;
    return ineq037Compare(a.low,b.low)||(a.lowClosed===b.lowClosed?0:a.lowClosed?-1:1);
  });
  const result:Ineq037Interval[]=[];
  for(const next of rows){
    const previous=result.at(-1);
    if(!previous){result.push({...next});continue;}
    const order=previous.high===null||next.low===null?-1:ineq037Compare(next.low,previous.high);
    const joins=previous.high===null||next.low===null||order<0||(order===0&&(previous.highClosed||next.lowClosed));
    if(!joins){result.push({...next});continue;}
    if(previous.high===null)continue;
    if(next.high===null){previous.high=null;previous.highClosed=false;continue;}
    const highOrder=ineq037Compare(next.high,previous.high);
    if(highOrder>0){previous.high=next.high;previous.highClosed=next.highClosed;}
    else if(highOrder===0)previous.highClosed=previous.highClosed||next.highClosed;
  }
  return result;
}
export function ineq037Union(a:Ineq037Interval[],b:Ineq037Interval[]){return ineq037Normalize([...a,...b]);}
export function ineq037Intersection(a:Ineq037Interval[],b:Ineq037Interval[]){
  const rows:Ineq037Interval[]=[];
  for(const x of ineq037Normalize(a))for(const y of ineq037Normalize(b)){
    let low:Ineq037Fraction|null,lowClosed:boolean,high:Ineq037Fraction|null,highClosed:boolean;
    if(x.low===null){low=y.low;lowClosed=y.lowClosed;}else if(y.low===null){low=x.low;lowClosed=x.lowClosed;}
    else{const compare=ineq037Compare(x.low,y.low);low=compare>=0?x.low:y.low;lowClosed=compare>0?x.lowClosed:compare<0?y.lowClosed:x.lowClosed&&y.lowClosed;}
    if(x.high===null){high=y.high;highClosed=y.highClosed;}else if(y.high===null){high=x.high;highClosed=x.highClosed;}
    else{const compare=ineq037Compare(x.high,y.high);high=compare<=0?x.high:y.high;highClosed=compare<0?x.highClosed:compare>0?y.highClosed:x.highClosed&&y.highClosed;}
    rows.push({low,high,lowClosed,highClosed});
  }
  return ineq037Normalize(rows);
}
export function ineq037Contains(input:Ineq037Interval[],value:Ineq037Fraction){
  value=checked(value);
  return ineq037Normalize(input).some((s)=>{
    const lower=s.low===null?1:ineq037Compare(value,s.low),upper=s.high===null?-1:ineq037Compare(value,s.high);
    return(lower>0||(lower===0&&s.lowClosed))&&(upper<0||(upper===0&&s.highClosed));
  });
}
export function ineq037SetLabel(input:Ineq037Interval[]){
  const rows=ineq037Normalize(input);if(!rows.length)return"∅";
  return rows.map((s)=>s.low===null&&s.high===null?"ℝ":s.low&&s.high&&ineq037Compare(s.low,s.high)===0?`{${ineq037Format(s.low)}}`:`${s.lowClosed?"[":"("}${s.low?ineq037Format(s.low):"−∞"}, ${s.high?ineq037Format(s.high):"∞"}${s.highClosed?"]":")"}`).join(" ∪ ");
}
function halfLine(boundary:Ineq037Fraction,operator:Ineq037Operator):Ineq037Interval{
  return operator==="<"||operator==="<="?{low:null,high:boundary,lowClosed:false,highClosed:operator==="<="}:{low:boundary,high:null,lowClosed:operator===">=",highClosed:false};
}
export function ineq037Solve(a:number,b:number,operator:Ineq037Operator,c:number,d:number){
  [a,b,c,d].forEach((v)=>integer(v,-1_000_000,1_000_000,"Katsayı"));op(operator);
  const coefficient=a-c,constant=d-b;
  if(coefficient===0){const valid=truth(ineq037Fraction(0),operator,ineq037Fraction(constant));const intervals=valid?[full()]:[];return{a,b,c,d,operator,coefficient,constant,boundary:null,effectiveOperator:operator,intervals,kind:valid?"all"as const:"empty"as const,label:ineq037SetLabel(intervals)};}
  const boundary=ineq037Fraction(constant,coefficient),effectiveOperator=coefficient<0?flipped(operator):operator;
  const intervals=[halfLine(boundary,effectiveOperator)];
  return{a,b,c,d,operator,coefficient,constant,boundary,effectiveOperator,intervals,kind:"set"as const,label:ineq037SetLabel(intervals)};
}
export function ineq037Test(a:number,b:number,operator:Ineq037Operator,c:number,d:number,xNumerator:number,xDenominator=1){
  const solved=ineq037Solve(a,b,operator,c,d);
  integer(xNumerator,-100000,100000,"Deneme payı");integer(xDenominator,1,10000,"Deneme paydası");
  const x=ineq037Fraction(xNumerator,xDenominator),left=add(scale(x,a),ineq037Fraction(b)),right=add(scale(x,c),ineq037Fraction(d));
  return{...solved,x,left,right,holds:truth(left,operator,right),member:ineq037Contains(solved.intervals,x)};
}
export function ineq037Transform(left:number,operator:Ineq037Operator,right:number,operation:"add"|"multiply"|"divide",amount:number){
  integer(left,-120,120,"İlk sol değer");integer(right,-120,120,"İlk sağ değer");integer(amount,-12,12,"İşlem sayısı");op(operator);
  if(!["add","multiply","divide"].includes(operation))throw new RangeError("Geçerli işlem seçilmeli.");
  const originalLeft=ineq037Fraction(left),originalRight=ineq037Fraction(right),originalHolds=truth(originalLeft,operator,originalRight);
  if(amount===0&&operation!=="add")return{left,right,operator,operation,amount,originalHolds,valid:false,flips:false,newLeft:null,newRight:null,newOperator:null,newHolds:null,reason:operation==="divide"?"Sıfıra bölme tanımsızdır.":"Sıfırla çarpma aynı çözüm bilgisini koruyan tersinir bir dönüşüm değildir."};
  const q=ineq037Fraction(amount),newLeft=operation==="add"?add(originalLeft,q):operation==="multiply"?multiply(originalLeft,q):divide(originalLeft,q),newRight=operation==="add"?add(originalRight,q):operation==="multiply"?multiply(originalRight,q):divide(originalRight,q);
  const flips=operation!=="add"&&amount<0,newOperator=flips?flipped(operator):operator;
  return{left,right,operator,operation,amount,originalHolds,valid:true,flips,newLeft,newRight,newOperator,newHolds:truth(newLeft,newOperator,newRight),reason:null};
}
export function ineq037Compound(lower:number,a:number,b:number,denominator:number,upper:number,lowerClosed:boolean,upperClosed:boolean){
  integer(lower,-120,120,"Alt sınır");integer(upper,-120,120,"Üst sınır");integer(a,-12,12,"x katsayısı");integer(b,-60,60,"Pay sabiti");integer(denominator,1,12,"Pozitif payda");bool(lowerClosed,"Alt sınır kabulü");bool(upperClosed,"Üst sınır kabulü");
  const left=ineq037Solve(a,b,lowerClosed?">=":">",0,lower*denominator),right=ineq037Solve(a,b,upperClosed?"<=":"<",0,upper*denominator);
  const intervals=ineq037Intersection(left.intervals,right.intervals);
  return{lower,a,b,denominator,upper,lowerClosed,upperClosed,left,right,intervals,label:ineq037SetLabel(intervals),afterClearLower:lower*denominator,afterClearUpper:upper*denominator,afterSubtractLower:lower*denominator-b,afterSubtractUpper:upper*denominator-b};
}
export function ineq037Logic(firstOperator:Ineq037Operator,firstBoundary:number,secondOperator:Ineq037Operator,secondBoundary:number,join:"and"|"or"){
  integer(firstBoundary,-120,120,"İlk sınır");integer(secondBoundary,-120,120,"İkinci sınır");op(firstOperator);op(secondOperator);
  if(join!=="and"&&join!=="or")throw new RangeError("ve veya veya bağı seçilmeli.");
  const first=ineq037Solve(1,0,firstOperator,0,firstBoundary),second=ineq037Solve(1,0,secondOperator,0,secondBoundary);
  const intervals=join==="and"?ineq037Intersection(first.intervals,second.intervals):ineq037Union(first.intervals,second.intervals);
  return{firstOperator,firstBoundary,secondOperator,secondBoundary,join,first,second,intervals,label:ineq037SetLabel(intervals)};
}
function floor(q:Ineq037Fraction){const n=BigInt(q.n),d=BigInt(q.d),whole=n/d;return Number(n<0n&&n%d!==0n?whole-1n:whole);}
function ceil(q:Ineq037Fraction){const n=BigInt(q.n),d=BigInt(q.d),whole=n/d;return Number(n>0n&&n%d!==0n?whole+1n:whole);}
export function ineq037Budget(fixed:number,per:number,budget:number,inclusive:boolean){
  integer(fixed,0,1_000_000,"Sabit gider");integer(per,1,1_000_000,"Birim gider");integer(budget,0,1_000_000,"Bütçe");bool(inclusive,"Bütçe sınırını kabul");
  const solved=ineq037Solve(per,fixed,inclusive?"<=":"<",0,budget),boundary=solved.boundary!;
  const maximum=inclusive?floor(boundary):ceil(boundary)-1,possible=maximum>=0;
  const intervals=ineq037Intersection(solved.intervals,ineq037Solve(1,0,">=",0,0).intervals);
  return{fixed,per,budget,inclusive,boundary,intervals,continuousLabel:ineq037SetLabel(intervals),possible,maxCount:possible?maximum:null,costAtMax:possible?fixed+per*maximum:null,costAtNext:possible?fixed+per*(maximum+1):fixed,zeroAffordable:inclusive?fixed<=budget:fixed<budget};
}
function scaledSet(input:Ineq037Interval[],factor:number){return ineq037Normalize(input.map((s)=>({...s,low:s.low?scale(s.low,factor):null,high:s.high?scale(s.high,factor):null})));}
export function ineq037Profit(uNumerator:number,uDenominator:number,firstInclusive:boolean,secondInclusive:boolean,transfer:boolean){
  integer(uNumerator,-100000,100000,"Maliyet deneme payı");integer(uDenominator,1,10000,"Maliyet deneme paydası");bool(firstInclusive,"İlk başa baş kabulü");bool(secondInclusive,"İkinci başa baş kabulü");bool(transfer,"Aktarım modeli");
  const u=ineq037Fraction(uNumerator,uDenominator),fixed=transfer?80:40,firstConstant=transfer?20:30;
  const first=ineq037Solve(2,firstConstant,firstInclusive?">=":">",1,fixed);
  const second=transfer?null:ineq037Solve(3,-20,secondInclusive?"<=":"<",1,fixed);
  const positive=ineq037Solve(1,0,">",0,0);
  const intervals=ineq037Intersection(ineq037Intersection(first.intervals,second?second.intervals:[full()]),positive.intervals);
  const unitScale=transfer?1:1000,tlIntervals=scaledSet(intervals,unitScale);
  const cost=add(u,ineq037Fraction(fixed)),firstSale=add(scale(u,2),ineq037Fraction(firstConstant)),secondSale=transfer?null:add(scale(u,3),ineq037Fraction(-20));
  const firstHolds=truth(firstSale,firstInclusive?">=":">",cost),secondHolds=secondSale?truth(secondSale,secondInclusive?"<=":"<",cost):true;
  const segment=tlIntervals.length===1?tlIntervals[0]:null;
  const midpoint=segment?.low&&segment.high?divide(add(segment.low,segment.high),ineq037Fraction(2)):null;
  const radius=segment?.low&&segment.high?divide(add(segment.high,scale(segment.low,-1)),ineq037Fraction(2)):null;
  const distanceOperator=segment?.low&&segment.high&&segment.lowClosed===segment.highClosed?(segment.lowClosed?"<="as const:"<"as const):null;
  return{u,fixed,firstConstant,firstInclusive,secondInclusive,transfer,unitScale,first,second,intervals,label:ineq037SetLabel(intervals),tlIntervals,tlLabel:ineq037SetLabel(tlIntervals),cost,firstSale,secondSale,firstHolds,secondHolds,accepted:ineq037Contains(intervals,u),originalTL:scale(u,unitScale),costTL:scale(cost,unitScale),firstSaleTL:scale(firstSale,unitScale),secondSaleTL:secondSale?scale(secondSale,unitScale):null,midpoint,radius,distanceOperator};
}
export function ineq037Parameter(a:number,xNumerator:number,xDenominator=1){
  integer(a,-12,12,"Parametre a");const result=ineq037Test(a,0,"<",0,6,xNumerator,xDenominator);
  return{...result,aSign:a>0?"positive"as const:a<0?"negative"as const:"zero"as const,mayDivide:a!==0};
}
export function ineq037VariableFactor(xNumerator:number,xDenominator=1){
  integer(xNumerator,-120,120,"x payı");integer(xDenominator,1,12,"x paydası");const x=ineq037Fraction(xNumerator,xDenominator),factor=add(x,ineq037Fraction(-1));
  if(factor.n===0)return{x,factor,sign:"zero"as const,canDivide:false,left:null,right:null,operator:null,reason:"x=1 için x−1=0; bu ifadeye bölme tanımsızdır."};
  const operator:Ineq037Operator=factor.n<0?">":"<";
  return{x,factor,sign:factor.n>0?"positive"as const:"negative"as const,canDivide:true,left:divide(ineq037Fraction(2),factor),right:divide(ineq037Fraction(5),factor),operator,reason:null};
}
