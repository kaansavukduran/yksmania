// Exact, bounded arithmetic for the source036 teaching proposal. No learning-credit writes.
export interface Eq036Fraction { n: number; d: number }
function integer(value: number, min: number, max: number, name: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new RangeError(`${name}: ${min}…${max} aralığında tam sayı olmalı.`);
  return value;
}
function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
export function eq036Fraction(n: number, d = 1): Eq036Fraction {
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0)
    throw new RangeError("Kesrin payı ve sıfır olmayan paydası güvenli tam sayılar olmalı.");
  if (n === 0) return { n: 0, d: 1 };
  const common = gcd(n, d), sign = d < 0 ? -1 : 1;
  return { n: sign * n / common, d: sign * d / common };
}
export function eq036Format(value: Eq036Fraction): string {
  const q = eq036Fraction(value.n, value.d);
  return q.d === 1 ? String(q.n) : `${q.n}/${q.d}`;
}
function add(a: Eq036Fraction, b: Eq036Fraction): Eq036Fraction {
  return eq036Fraction(a.n * b.d + b.n * a.d, a.d * b.d);
}
function scale(a: Eq036Fraction, k: number): Eq036Fraction {
  return eq036Fraction(a.n * k, a.d);
}
export function eq036Solve(a: number, b: number, c: number, d: number) {
  [a,b,c,d].forEach((v) => integer(v,-1_000_000,1_000_000,"Katsayı"));
  const coefficient = a-c, constant = d-b;
  if (coefficient === 0)
    return { a,b,c,d,coefficient,constant,kind: constant === 0 ? "all" as const : "none" as const,root: null,leftAtRoot:null,rightAtRoot:null };
  const root = eq036Fraction(constant,coefficient);
  const leftAtRoot = add(scale(root,a),eq036Fraction(b));
  const rightAtRoot = add(scale(root,c),eq036Fraction(d));
  return { a,b,c,d,coefficient,constant,kind:"one" as const,root,leftAtRoot,rightAtRoot };
}
export function eq036Balance(a:number,b:number,c:number,d:number,xNumerator:number,xDenominator=1) {
  const solution=eq036Solve(a,b,c,d);
  integer(xNumerator,-10000,10000,"Deneme payı"); integer(xDenominator,1,1000,"Deneme paydası");
  const x=eq036Fraction(xNumerator,xDenominator);
  const left=add(scale(x,a),eq036Fraction(b)), right=add(scale(x,c),eq036Fraction(d));
  const difference=add(left,scale(right,-1));
  return {...solution,x,left,right,difference,equal:difference.n===0};
}
export function eq036Expand(k:number,h:number,c:number,d:number) {
  integer(k,-12,12,"Dış katsayı");integer(h,-20,20,"Parantezde çıkarılan sayı");integer(c,-12,12,"Sağ katsayı");integer(d,-120,120,"Sağ sabit");
  // k(x-h) = kx-kh; the deliberately wrong contrast leaves h unmultiplied.
  return {k,h,c,d,constant:-k*h,wrongConstant:-h,
    correct:eq036Solve(k,-k*h,c,d),wrong:eq036Solve(k,-h,c,d)};
}
export function eq036FractionEquation(u:number,p:number,v:number,q:number,sign:number,r:number) {
  integer(u,-20,20,"İlk pay sabiti");integer(v,-20,20,"İkinci pay sabiti");
  integer(p,1,12,"İlk payda");integer(q,1,12,"İkinci payda");
  if (sign!==1 && sign!==-1) throw new RangeError("İşlem +1 veya −1 olmalı.");
  integer(r,-30,30,"Sağ taraf");
  const common=p/gcd(p,q)*q, firstMultiplier=common/p, secondMultiplier=sign*common/q;
  const coefficient=firstMultiplier+secondMultiplier, constant=firstMultiplier*u+secondMultiplier*v, right=common*r;
  const solution=eq036Solve(coefficient,constant,0,right);
  const originalCheck=solution.root ? add(eq036Fraction(solution.root.n+u*solution.root.d,solution.root.d*p),scale(eq036Fraction(solution.root.n+v*solution.root.d,solution.root.d*q),sign)) : null;
  return {u,p,v,q,sign,r,common,firstMultiplier,secondMultiplier,coefficient,constant,right,solution,originalCheck};
}
export function eq036Excluded(u:number,v:number,r:number) {
  integer(u,-12,12,"Pay sabiti");integer(v,-12,12,"Payda sabiti");integer(r,-12,12,"Sağ değer");
  // (x+u)/(x+v)=r, x != -v. This is a rational equation reduced to a linear condition.
  const excluded=-v, reduced=eq036Solve(1,u,r,r*v);
  const forbiddenRoot=Boolean(reduced.root && reduced.root.n===excluded*reduced.root.d);
  const kind=forbiddenRoot ? "none" as const : reduced.kind;
  return {u,v,r,excluded,reduced,forbiddenRoot,kind,root:forbiddenRoot?null:reduced.root,
    everyAllowed:kind==="all",domainLabel:`x ≠ ${excluded}`};
}
export function eq036Pattern(first:number,step:number,total:number,previewN:number) {
  integer(first,-20,30,"İlk terim");integer(step,-12,12,"Artış");integer(total,-1200,1200,"Hedef terim");integer(previewN,1,100,"Gösterilen adım");
  const preview=first+step*(previewN-1);
  const candidate=step===0?null:eq036Fraction(total-first+step,step);
  const valid=Boolean(candidate && candidate.d===1 && candidate.n>=1);
  return {first,step,total,previewN,preview,transitions:previewN-1,candidate,valid,
    n:valid?candidate!.n:null,
    kind:step===0?(first===total?"every-positive" as const:"none" as const):(valid?"one" as const:"none" as const),
    indexReason:step===0?(first===total?"Her pozitif tam sayı adımı aynı terimi verir.":"Sabit örüntü bu hedefe ulaşmaz."):valid?"Bulunan adım pozitif tam sayıdır.":"Adım numarası pozitif tam sayı olmalı; cebirsel aday bu koşulu sağlamıyor."};
}
export function eq036Tickets(adultPrice:number,studentPrice:number,people:number,total:number) {
  integer(adultPrice,1,200,"Yetişkin fiyatı");integer(studentPrice,1,200,"Öğrenci fiyatı");integer(people,1,30,"Kişi sayısı");integer(total,0,6000,"Toplam ücret");
  const solution=eq036Solve(adultPrice-studentPrice,studentPrice*people,0,total);
  const adult=solution.root&&solution.root.d===1?solution.root.n:null;
  const valid=adult!==null&&adult>=0&&adult<=people;
  return {adultPrice,studentPrice,people,total,solution,adult:valid?adult:null,students:valid?people-adult!:null,valid,
    allCounts:solution.kind==="all",impossible:solution.kind==="none"||(solution.kind==="one"&&!valid)};
}
export function eq036TicketDifference(adults:number,students:number,difference:number,total:number) {
  integer(adults,0,20,"Yetişkin adedi");integer(students,0,20,"Öğrenci adedi");integer(difference,0,120,"Fiyat farkı");integer(total,0,6000,"Toplam ücret");
  const count=adults+students;
  if(!count)throw new RangeError("En az bir bilet olmalı.");
  const student=eq036Fraction(total-adults*difference,count);
  const adult=add(student,eq036Fraction(difference));
  const valid=student.n>0 && adult.n>0;
  return {adults,students,difference,total,student,adult,valid,check:add(scale(student,students),scale(adult,adults))};
}
export function eq036Words(multiplier:number,offset:number,total:number,grouped:boolean) {
  integer(multiplier,1,12,"Çarpan");integer(offset,-20,20,"Eklenen sayı");integer(total,-120,120,"Sonuç");
  if(typeof grouped!=="boolean")throw new TypeError("Parantez seçimi açık olmalı.");
  const constant=grouped?multiplier*offset:offset;
  return {multiplier,offset,total,grouped,constant,solution:eq036Solve(multiplier,constant,0,total),
    expression:grouped?`${multiplier}(x + (${offset}))`:`${multiplier}x + (${offset})`};
}
