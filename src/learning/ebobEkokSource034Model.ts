// Private source034 proposal: exact bounded integer arithmetic, no learning-credit writes.
function integer(value: number, min: number, max: number, name: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new RangeError(`${name}: ${min}…${max} aralığında tam sayı bekleniyor`);
  return value;
}
function gcdRaw(a: number, b: number) {
  while (b) [a, b] = [b, a % b];
  return a;
}
function lcmRaw(a: number, b: number) {
  return (a / gcdRaw(a, b)) * b;
}
export function ebob034Factors(n: number) {
  integer(n, 1, 1200, "Sayı");
  const factors: { prime: number; exponent: number }[] = [];
  let rest = n;
  for (let p = 2; p * p <= rest; p++) {
    let exponent = 0;
    while (rest % p === 0) { exponent++; rest /= p; }
    if (exponent) factors.push({ prime: p, exponent });
  }
  if (rest > 1) factors.push({ prime: rest, exponent: 1 });
  return factors;
}
export function ebob034Divisors(n: number) {
  integer(n, 1, 1200, "Sayı");
  return Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
}
export function ebob034Pair(a: number, b: number) {
  integer(a, 1, 1200, "a"); integer(b, 1, 1200, "b");
  const fa = ebob034Factors(a), fb = ebob034Factors(b);
  const primes = [...new Set([...fa, ...fb].map((f) => f.prime))].sort((x,y) => x-y);
  const rows = primes.map((prime) => {
    const exponentA = fa.find((f) => f.prime === prime)?.exponent ?? 0;
    const exponentB = fb.find((f) => f.prime === prime)?.exponent ?? 0;
    return { prime, exponentA, exponentB, min: Math.min(exponentA, exponentB), max: Math.max(exponentA, exponentB) };
  });
  const gcd = gcdRaw(a,b), lcm = lcmRaw(a,b), divisors = ebob034Divisors(gcd);
  return { a,b,fa,fb,rows,gcd,lcm,divisors,positiveDivisorCount:divisors.length,negativeDivisorCount:divisors.length,totalIntegerDivisorCount:2*divisors.length,quotients:[a/gcd,b/gcd,lcm/a,lcm/b] };
}
export function ebob034Euclid(a: number, b: number) {
  integer(a, 1, 1200, "a"); integer(b, 1, 1200, "b");
  let larger = Math.max(a,b), smaller = Math.min(a,b);
  const rows: { dividend:number; divisor:number; quotient:number; remainder:number }[] = [];
  while (smaller) {
    const quotient = Math.floor(larger/smaller), remainder = larger%smaller;
    rows.push({dividend:larger,divisor:smaller,quotient,remainder});
    [larger,smaller] = [smaller,remainder];
  }
  return {a,b,rows,gcd:larger,lcm:(a/larger)*b};
}
export function ebob034Geometry(a:number,b:number,side:number) {
  integer(a,1,60,"İlk uzunluk");integer(b,1,60,"İkinci uzunluk");integer(side,1,60,"Ortak boy");
  const valid = a%side===0 && b%side===0, greatest = gcdRaw(a,b);
  const x = valid ? a/side : null, y = valid ? b/side : null;
  return {a,b,side,valid,greatest,optimal:valid && side===greatest,x,y,
    squares:valid ? x!*y! : null,
    ropeParts:valid ? x!+y! : null,
    separateCuts:valid ? x!+y!-2 : null,
    perimeter:2*(a+b),closedMarks:valid ? 2*(a+b)/side : null,
    openMarks: a%side===0 ? a/side+1 : null,
    area:a*b,squareArea:side*side};
}
export function ebob034Timeline(p:number,q:number,offset:number,horizon:number,includeStart:boolean,includeEnd:boolean) {
  integer(p,1,60,"A periyodu");integer(q,1,60,"B periyodu");integer(offset,0,120,"B başlangıcı");integer(horizon,0,240,"Bitiş anı");
  if(typeof includeStart!=="boolean" || typeof includeEnd!=="boolean")throw new TypeError("Aralık uçları açıkça seçilmeli");
  const a = Array.from({length:Math.floor(horizon/p)+1},(_,i)=>i*p);
  const b:number[]=[];
  for(let t=offset;t<=horizon;t+=q)b.push(t);
  const bSet = new Set(b), commonAll = a.filter((t)=>bSet.has(t));
  const common = commonAll.filter((t)=>(includeStart || t!==0) && (includeEnd || t!==horizon));
  const period=lcmRaw(p,q), compatible=offset%gcdRaw(p,q)===0;
  let first:number|null=null;
  if(compatible)for(let t=Math.max(1,offset);t<=offset+period;t++) if(t%p===0 && (t-offset)%q===0){first=t;break;}
  return {p,q,offset,horizon,includeStart,includeEnd,a,b,commonAll,common,count:common.length,period,compatible,first,rangeLabel:`${includeStart?"[":"("}0,${horizon}${includeEnd?"]":")"}`};
}
export function ebob034SameRemainder(a:number,b:number,remainder:number,exclusiveUpper:number) {
  integer(a,1,60,"İlk bölen");integer(b,1,60,"İkinci bölen");integer(remainder,0,120,"Kalan");integer(exclusiveUpper,1,600,"Üst sınır");
  const period=lcmRaw(a,b), valid=remainder<a && remainder<b, candidates:number[]=[];
  if(valid)for(let n=remainder;n<exclusiveUpper;n+=period)if(n>0)candidates.push(n);
  return {a,b,remainder,exclusiveUpper,period,valid,candidates,smallest:candidates[0]??null,largest:candidates.at(-1)??null,
    reason:valid?null:"Kalan, her iki bölenden de küçük olmalı."};
}
export function ebob034UnknownDivisor(n:number,m:number,r:number,s:number) {
  integer(n,1,600,"İlk sayı");integer(m,1,600,"İkinci sayı");integer(r,0,600,"İlk kalan");integer(s,0,600,"İkinci kalan");
  const feasibleRemainders = r<=n && s<=m;
  const adjustedN=n-r,adjustedM=m-s,minimumDivisor=Math.max(r,s)+1;
  if(!feasibleRemainders)return {n,m,r,s,adjustedN,adjustedM,minimumDivisor,valid:false,unbounded:false,gcd:null,candidates:[] as number[],largest:null,reason:"Pozitif sayı bölünürken kalan sayının kendisini aşamaz."};
  if(adjustedN===0 && adjustedM===0)return {n,m,r,s,adjustedN,adjustedM,minimumDivisor,valid:true,unbounded:true,gcd:null,candidates:[] as number[],largest:null,reason:"İki bölüm de 0 olabilir; kalanlardan büyük her bölen uygundur, en büyük yoktur."};
  const gcd=gcdRaw(adjustedN,adjustedM);
  const candidates=ebob034Divisors(gcd).filter((d)=>d>=minimumDivisor);
  return {n,m,r,s,adjustedN,adjustedM,minimumDivisor,valid:candidates.length>0,unbounded:false,gcd,candidates,largest:candidates.at(-1)??null,
    reason:candidates.length?null:"Ortak bölenlerin hiçbiri bütün kalanlardan büyük değil."};
}
export function ebob034PairConditions(d:number,m:number) {
  integer(d,1,1200,"EBOB");integer(m,1,1200,"EKOK");
  const valid=m%d===0, product=valid?m/d:null;
  const rows:{x:number;y:number;coprime:boolean;a:number;b:number;sum:number;perimeter:number}[]=[];
  if(valid)for(let x=1;x*x<=product!;x++)if(product!%x===0){const y=product!/x;rows.push({x,y,coprime:gcdRaw(x,y)===1,a:d*x,b:d*y,sum:d*(x+y),perimeter:2*d*(x+y)});}
  const accepted=rows.filter((r)=>r.coprime);
  return {d,m,valid,product,rows,accepted,minSum:accepted.length?Math.min(...accepted.map((r)=>r.sum)):null,maxSum:accepted.length?Math.max(...accepted.map((r)=>r.sum)):null};
}
export function ebob034Third(a:number,b:number,d:number,m:number) {
  integer(a,1,1200,"a");integer(b,1,1200,"b");integer(d,1,1200,"Hedef EBOB");integer(m,1,1200,"Hedef EKOK");
  const pairGcd=gcdRaw(a,b),pairLcm=lcmRaw(a,b);
  // Every acceptable third number divides the target LCM; enumerate exact divisors and check BOTH conditions.
  const candidates=ebob034Divisors(m).filter((x)=>gcdRaw(pairGcd,x)===d && lcmRaw(pairLcm,x)===m);
  return {a,b,d,m,pairGcd,pairLcm,candidates,smallest:candidates[0]??null,valid:candidates.length>0};
}
export function ebob034Cubes(a:number,b:number) {
  integer(a,1,24,"İlk küçük küp kenarı");integer(b,1,24,"İkinci küçük küp kenarı");
  const side=lcmRaw(a,b),x=side/a,y=side/b;
  return {a,b,side,x,y,countA:x**3,countB:y**3,volume:side**3,smallVolumeA:a**3,smallVolumeB:b**3};
}
