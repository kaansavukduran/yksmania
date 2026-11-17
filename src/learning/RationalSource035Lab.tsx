import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  r035, r035Text, r035Abs, r035Add, r035Sub, r035Mul, r035Div,
  r035Compare, r035Midpoint, r035CommonDenominator,
  r035Decimal, r035DecimalInfo, r035Sequential, r035InitialFromRemaining,
  type R035, type R035Base,
} from "./rationalSource035Model";
import "./rationalSource035.css";

// Private proposal. It is not an application registration or PDF closure.
const ONE = r035(1), ZERO = r035(0);
const value = (x: R035) => Number(x.n) / Number(x.d);
const bounded = (n: number, fallback: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.max(min, Math.min(max, Math.round(n))) : fallback;
const text = r035Text;
const relation = (a: R035, b: R035) => ["<", "=", ">"][r035Compare(a,b)+1];
function attempt<T>(fn: () => T): {result:T; error:null}|{result:null;error:string} {
  try { return {result:fn(),error:null}; }
  catch(error) { return {result:null,error:error instanceof Error?error.message:String(error)}; }
}
function Warning({children}:{children:ReactNode}) {
  return <p className="r035-caution" role="status">{children}</p>;
}
function PartBars({amount,parts=8}:{amount:R035;parts?:number}) {
  const n=Math.abs(value(amount)), rows=Math.min(4,Math.max(1,Math.ceil(n)));
  const divisions=Number.isInteger(parts)&&parts>=1&&parts<=48?parts:0;
  return <>
    <svg className="r035-figure" viewBox={`0 0 540 ${rows*34+8}`} role="img"
      aria-label={`${text(amount)}; aynı büyüklükte bütünlerde ${divisions?`${divisions} eş parça`:"ayrıntılı parça ızgarası gösterilmeden"}. Negatifse boyanan alan yalnız büyüklüğü gösterir.`}>
      {Array.from({length:rows},(_,row)=><g key={row}>
        <rect x="8" y={row*34+4} width="520" height="25" className="r035-empty"/>
        <rect x="8" y={row*34+4} width={520*Math.max(0,Math.min(1,n-row))} height="25" className="r035-fill"/>
        {Array.from({length:divisions?divisions+1:0},(_,i)=><path key={i} d={`M${8+520*i/divisions},${row*34+4}v25`} className="r035-grid"/>)}
      </g>)}
    </svg>
    {divisions===0&&<p>Eş parçalar bu ölçekte tek tek çizilmedi. Sayısal parça bilgisi ve tam kesir metinde korunur.</p>}
    {n>4&&<p>Değer {text(amount)}; en fazla ilk 4 birim bütün çizildi. Tam hesap yukarıdaki kesirdir.</p>}
    {amount.n<0n&&<p>Alan büyüklüğü {text(r035Abs(amount))}; eksi işareti sayı doğrusunda sola yönü belirtir.</p>}
  </>;
}
function Line({a,b,mid=false,distance=false}:{a:R035;b:R035;mid?:boolean;distance?:boolean}) {
  const extent=Math.max(1,Math.ceil(Math.max(Math.abs(value(a)),Math.abs(value(b)))));
  const x=(n:R035)=>28+484*(value(n)+extent)/(2*extent), m=r035Midpoint(a,b);
  const labelX=(n:R035)=>Math.max(36,Math.min(504,x(n)));
  return <><svg className="r035-figure" viewBox="0 -30 540 200" role="img"
    aria-label={`Sayı doğrusu −${extent} ile ${extent}. A=${text(a)}, B=${text(b)}. Eş aralıklar 1/4 birim.${mid&&r035Compare(a,b)!==0?` Ortalama ${text(m)} iki farklı uç arasındadır.`:""}`}>
    <path d="M28 54H512m-6-5 6 5-6 5" className="r035-axis"/>
    {Array.from({length:extent*8+1},(_,i)=><path key={i} d={`M${28+484*i/(extent*8)},${i%4===0?44:48}v${i%4===0?20:12}`} className="r035-grid"/>)}
    {distance&&<><path d={`M${x(ZERO)} 130H${x(a)}`} className="r035-distance-a"/><path d={`M${x(ZERO)} 145H${x(b)}`} className="r035-distance-b"/></>}
    <path d={`M${x(a)} 20V54`} className="r035-distance-a"/><circle cx={x(a)} cy="20" r="8" className="r035-point-a"/>
    <path d={`M${x(b)} 70V54`} className="r035-distance-b"/><circle cx={x(b)} cy="70" r="8" className="r035-point-b"/>
    <text x={labelX(a)} y="8" textAnchor="middle" fontSize="36" className="r035-point-label">A</text>
    <text x={labelX(b)} y="116" textAnchor="middle" fontSize="36" className="r035-point-label">B</text>
    {mid&&r035Compare(a,b)!==0&&<circle cx={x(m)} cy="54" r="7" className="r035-point-mid"/>}
  </svg><div className="r035-axis-labels" aria-label="Sayı doğrusunun uçları ve sıfır"><span>−{extent}</span><span>0</span><span>{extent}</span></div></>;
}
function RopePieces({count,piece}:{count:bigint;piece:R035}) {
  const total=Number(count),columns=Math.min(12,total),rows=Math.ceil(total/columns);
  return <><svg className="r035-figure" viewBox={`0 0 540 ${rows*28+8}`} role="img" aria-label={`${String(count)} eş ip parçasının sayma tablosu; her hücre ${text(piece)} m. Satır sonları ek kesim değildir.`}>
    {Array.from({length:total},(_,i)=><rect key={i} x={8+(i%columns)*524/columns} y={4+Math.floor(i/columns)*28} width={524/columns-4} height="22" className="r035-fill"/>)}
  </svg><p>Her hücre {text(piece)} m’lik bir parçadır. {String(count)} hücrenin tamamı çizildi; satırlara ayırmak yeni kesim veya ayrı ip demek değildir.</p></>;
}

export default function RationalSource035Lab({id:lessonId}:{id?:string}={}) {
  const uid=useId();
  const [s,set]=useExploration("r035:rational",{
    mode:0,partN:3,partD:4,scale:2,
    lineAN:-3,lineAD:4,lineBN:-1,lineBD:2,showMiddle:false,showDistance:false,
    cmpAN:7,cmpAD:8,cmpBN:11,cmpBD:12,
    opAN:1,opAD:2,opBN:1,opBD:3,operation:0,
    whole:"1",prefix:"2",period:"3",negative:false,
    total:80,firstN:1,firstD:4,secondN:1,secondD:3,secondBase:0,finalAmount:40,
    measureMode:0,emptyMass:120,fullMass:360,partialMass:270,
    compositionN:2,compositionD:5,removeN:1,removeD:3,finalA:700,
    ropeN:3,ropeD:4,pieceN:1,pieceD:8,
  });
  const mode=bounded(s.mode,0,0,6);
  const range=(key:keyof typeof s,label:string,n:number,min:number,max:number)=>{
    const inputId=uid+"-"+key;
    return <div className="r035-range"><div><label htmlFor={inputId}>{label}</label><output htmlFor={inputId}>{n}</output></div>
      <input id={inputId} type="range" min={min} max={max} step="1" value={n} onChange={e=>set({[key]:Number(e.target.value)})}/></div>;
  };
  const parts=<>{range("partN","Pay a",bounded(s.partN,3,-12,12),-12,12)}{range("partD","Payda b",bounded(s.partD,4,-12,12),-12,12)}{range("scale","Genişletme çarpanı k",bounded(s.scale,2,1,3),1,3)}</>;
  const block=(title:string,children:ReactNode)=> <section className="r035-panel"><h3>{title}</h3>{children}</section>;
  let content:ReactNode;
  if(mode===0) {
    const n=bounded(s.partN,3,-12,12),d=bounded(s.partD,4,-12,12),k=bounded(s.scale,2,1,3),calc=attempt(()=>r035(n,d));
    content=block("Aynı sayı, farklı büyüklükte eş parçalar",<>
      <div className="r035-controls">{parts}</div>
      {calc.error !== null ?<Warning>{calc.error} Payı sıfır yapmak geçerlidir; paydayı sıfır yapmak değildir.</Warning>:<>
        <p className="r035-result" role="status">{n}/{d} = {n*k}/{d*k} = {text(calc.result)}</p>
        <p>Pay ve payda aynı sıfır olmayan {k} ile çarpıldı; sayı değişmedi. İlk çizimde her bütün {Math.abs(d)}, ikinci çizimde {Math.abs(d*k)} eş parçadır.</p>
        <PartBars amount={calc.result} parts={Math.abs(d)}/><PartBars amount={calc.result} parts={Math.abs(d*k)}/>
      </>}
    </>);
  } else if(mode===1) {
    const an=bounded(s.lineAN,-3,-12,12),ad=bounded(s.lineAD,4,1,12),bn=bounded(s.lineBN,-1,-12,12),bd=bounded(s.lineBD,2,1,12),a=r035(an,ad),b=r035(bn,bd);
    content=block("Değer ile sıfıra uzaklığı ayrı gör",<>
      <div className="r035-controls">{range("lineAN","A noktasının payı",an,-12,12)}{range("lineAD","A noktasının paydası",ad,1,12)}{range("lineBN","B noktasının payı",bn,-12,12)}{range("lineBD","B noktasının paydası",bd,1,12)}</div>
      <p>A = {text(a)}, B = {text(b)}; <strong>{text(a)} {relation(a,b)} {text(b)}</strong>.</p>
      <div className="r035-actions"><button type="button" className="secondary" aria-pressed={s.showDistance} onClick={()=>set({showDistance:!s.showDistance})}>Sıfıra uzaklıkları göster</button><button type="button" className="secondary" aria-pressed={s.showMiddle} onClick={()=>set({showMiddle:!s.showMiddle})}>Araya ortalama koy</button></div>
      <Line a={a} b={b} mid={s.showMiddle} distance={s.showDistance}/>
      {s.showDistance&&<p>|A|={text(r035Abs(a))}, |B|={text(r035Abs(b))}. Çizgiler uzaklığı gösterir; negatif sayının yönünü değiştirmez.</p>}
      {s.showMiddle&&(r035Compare(a,b)===0?<Warning>Uçlar eşit. Ortalamaları da aynı noktadır; kesin arada bir sayı gösterilemez.</Warning>:<p className="r035-result">Ortalama (A+B)/2 = {text(r035Midpoint(a,b))}; iki farklı uç arasındadır.</p>)}
      <div className="r035-presets"><button type="button" className="text-button" onClick={()=>set({lineAN:-3,lineAD:4,lineBN:-1,lineBD:2})}>−3/4 ve −1/2</button><button type="button" className="text-button" onClick={()=>set({lineAN:-2,lineAD:3,lineBN:-3,lineBD:5,showMiddle:true})}>−2/3 ve −3/5</button><button type="button" className="text-button" onClick={()=>set({lineAN:-7,lineAD:10,lineBN:-2,lineBD:3,showMiddle:true})}>−7/10 ve −2/3</button></div>
    </>);
  } else if(mode===2) {
    const an=bounded(s.cmpAN,7,0,40),ad=bounded(s.cmpAD,8,1,40),bn=bounded(s.cmpBN,11,0,40),bd=bounded(s.cmpBD,12,1,40),a=r035(an,ad),b=r035(bn,bd),common=r035CommonDenominator(a,b),ga=r035Sub(ONE,a),gb=r035Sub(ONE,b),inUnit=r035Compare(a,ONE)<=0&&r035Compare(b,ONE)<=0;
    content=block("Bir karşılaştırmayı üç yolla denetle",<>
      <div className="r035-controls">{range("cmpAN","Birinci pay",an,0,40)}{range("cmpAD","Birinci payda",ad,1,40)}{range("cmpBN","İkinci pay",bn,0,40)}{range("cmpBD","İkinci payda",bd,1,40)}</div>
      <p className="r035-result" role="status">{text(a)} {relation(a,b)} {text(b)}</p>
      <div className="r035-comparisons">
        <div><h4>Ortak payda</h4><p>{String(common.leftNumerator)}/{String(common.denominator)} {relation(a,b)} {String(common.rightNumerator)}/{String(common.denominator)}</p></div>
        <div><h4>Çapraz çarpım</h4><p>{String(a.n)} × {String(b.d)} = {String(a.n*b.d)}; {String(b.n)} × {String(a.d)} = {String(b.n*a.d)}.</p><p>İki payda da pozitif olduğu için işaret yönü korunur.</p></div>
        <div><h4>Bütüne kalan</h4>{inUnit?<><p>1−A = {text(ga)}, 1−B = {text(gb)}. Küçük eksik, büyük doluluk verir.</p><PartBars amount={ga} parts={Number(ga.d)}/><PartBars amount={gb} parts={Number(gb.d)}/><p>{ga.n===gb.n&&ga.n>0n?"Eksiklerin pozitif payları eşit; payda kısayolu bu koşulda kullanılabilir.":"Eksiklerin payları aynı pozitif sayı değil. Yalnız paydaya bakma; gerçek kesirleri karşılaştır."}</p></>:<Warning>Bir kesir 1’i aşıyor. “Eksik doluluk” resmi bu koşulda kullanılmaz; ortak payda ve çapraz çarpım geçerlidir.</Warning>}</div>
      </div>
      <div className="r035-presets">{[[7,8,11,12],[13,16,17,20],[5,8,7,12],[19,20,23,24],[18,25,29,40],[9,10,14,15]].map(([x,y,z,t])=><button key={`${x}/${y}`} type="button" className="text-button" onClick={()=>set({cmpAN:x,cmpAD:y,cmpBN:z,cmpBD:t})}>{x}/{y} ve {z}/{t}</button>)}</div>
    </>);
  } else if(mode===3) {
    const an=bounded(s.opAN,1,-12,12),ad=bounded(s.opAD,2,0,12),bn=bounded(s.opBN,1,-12,12),bd=bounded(s.opBD,3,0,12),op=bounded(s.operation,0,0,3);
    const calc=attempt(()=>{const a=r035(an,ad),b=r035(bn,bd);return {a,b,result:[r035Add,r035Sub,r035Mul,r035Div][op](a,b),common:r035CommonDenominator(a,b)};});
    content=block("İşlem türü değişince geçerli yol da değişir",<>
      <div className="r035-controls">{range("opAN","İlk kesrin payı",an,-12,12)}{range("opAD","İlk kesrin paydası",ad,0,12)}{range("opBN","İkinci kesrin payı",bn,-12,12)}{range("opBD","İkinci kesrin paydası",bd,0,12)}</div>
      <div className="r035-actions" role="group" aria-label="Kesir işlemi">{["Topla","Çıkar","Çarp","Böl"].map((name,i)=><button key={name} type="button" className="secondary" aria-pressed={op===i} onClick={()=>set({operation:i})}>{name}</button>)}</div>
      {calc.error !== null ?<Warning>{calc.error} Tanımsız bir işlem için şekil veya sayı sonucu üretilmez.</Warning>:<>
        <p className="r035-result" role="status">({text(calc.result.a)}) {["+","−","×","÷"][op]} ({text(calc.result.b)}) = {text(calc.result.result)}</p>
        {op<2?<p>Eş parçalar: {String(calc.result.common.leftNumerator)}/{String(calc.result.common.denominator)} {op===0?"+":"−"} {String(calc.result.common.rightNumerator)}/{String(calc.result.common.denominator)}. Payda parça boyudur; toplanmaz.</p>:op===2?<p>Pay çarpımı {String(calc.result.a.n*calc.result.b.n)}, payda çarpımı {String(calc.result.a.d*calc.result.b.d)}. Yalnız çarpanlar birlikte sadeleşir; toplamın tek terimi silinmez.</p>:<p>Yalnız ikinci kesir ters çevrilir: ({text(calc.result.a)}) × ({text(r035(calc.result.b.d,calc.result.b.n))}). Kontrol: ({text(calc.result.result)}) × ({text(calc.result.b)}) = {text(calc.result.a)}.</p>}
        <PartBars amount={calc.result.result} parts={Number(calc.result.result.d)}/>
      </>}
    </>);
  } else if(mode===4) {
    const calc=attempt(()=>{const n=r035Decimal(s.whole,s.prefix,s.period,s.negative);return {fraction:n,decimal:r035DecimalInfo(n)};});
    const input=(key:"whole"|"prefix"|"period",label:string)=><div><label htmlFor={uid+key}>{label}</label><input id={uid+key} inputMode="numeric" type="text" maxLength={12} value={s[key]} onChange={e=>set({[key]:e.target.value})}/></div>;
    content=block("Sonlu ön ek ile devreden bloğu ayır",<>
      <div className="r035-controls">{input("whole","Tam kısım")}{input("prefix","Tekrarlamayan ondalık basamaklar")}{input("period","Devreden blok; boşsa sonlu")}</div>
      <label className="r035-check"><input type="checkbox" checked={s.negative} onChange={e=>set({negative:e.target.checked})}/>Negatif göster</label>
      {calc.error !== null ?<Warning>{calc.error} Alanlara yalnız rakam yaz; eksi işareti ayrı seçilir.</Warning>:<>
        <div className="r035-digit-flow" aria-label="Tam kısım, sabit ön ek ve tekrar bloğu"><span>{s.negative?"−":""}{s.whole}</span><span>,</span><span className="r035-prefix">{s.prefix||"(sabit basamak yok)"}</span>{s.period&&<span className="r035-period">({s.period}) ↻</span>}</div>
        <p className="r035-result" role="status">Tam kesir: {text(calc.result.fraction)}</p>
        <p>Uzun bölme denetimi: {calc.result.decimal.display}. {calc.result.decimal.terminated?"Matematiksel gösterim sonludur.":"Sade payda 2 ve 5 dışında asal taşıdığı için gösterim devirlidir."}</p>
        {s.period&&<p>Aynı kuyruk için {String(10n**BigInt(s.prefix.length+s.period.length))}x ve {String(10n**BigInt(s.prefix.length))}x karşılaştırılır; farkın katsayısı {String(10n**BigInt(s.prefix.length+s.period.length)-10n**BigInt(s.prefix.length))} olur.</p>}
        {calc.result.decimal.truncated&&<Warning>Yalnız gösterim basamağı sınırlandı; üç nokta son basamak veya irrasyonellik kanıtı değildir.</Warning>}
      </>}
      <div className="r035-presets">{[["0","375",""],["0","","27"],["0","1","6"],["1","2","3"],["1","","23"],["1","","24"],["0","","45"],["0","45",""]].map(([whole,prefix,period])=><button key={`${whole}/${prefix}/${period}`} type="button" className="text-button" onClick={()=>set({whole,prefix,period,negative:false})}>{whole},{prefix}{period?`(${period})`:""}</button>)}</div>
    </>);
  } else if(mode===5) {
    const total=bounded(s.total,80,0,120),fn=bounded(s.firstN,1,0,12),fd=bounded(s.firstD,4,1,12),sn=bounded(s.secondN,1,0,12),sd=bounded(s.secondD,3,1,12),last=bounded(s.finalAmount,40,0,120),base:R035Base=bounded(s.secondBase,0,0,1)===0?"remaining":"initial";
    const calc=attempt(()=>r035Sequential(r035(total),r035(fn,fd),r035(sn,sd),base));
    const inverse=attempt(()=>r035InitialFromRemaining(r035(last),r035(fn,fd),r035(sn,sd),base));
    content=block("İkinci kullanımın bütünü değişirse sonuç değişir",<>
      <div className="r035-controls">{range("total","Başlangıç miktarı; birim",total,0,120)}{range("firstN","İlk kullanımın payı",fn,0,12)}{range("firstD","İlk kullanımın paydası",fd,1,12)}{range("secondN","İkinci kullanımın payı",sn,0,12)}{range("secondD","İkinci kullanımın paydası",sd,1,12)}</div>
      <div className="r035-actions" role="group" aria-label="İkinci kesrin bütünü"><button type="button" className="secondary" aria-pressed={base==="remaining"} onClick={()=>set({secondBase:0})}>Kalanın kesri</button><button type="button" className="secondary" aria-pressed={base==="initial"} onClick={()=>set({secondBase:1})}>Başlangıcın kesri</button></div>
      {calc.error !== null ?<Warning>{calc.error}</Warning>:<>
        <svg className="r035-figure" viewBox="0 0 540 110" role="img" aria-label={`Başlangıç ${total} birim. İlk kullanım ${text(calc.result.firstUsed)}, ilk kalan ${text(calc.result.afterFirst)}, ikinci kullanım ${text(calc.result.secondUsed)}, son kalan ${text(calc.result.remaining)}. İkinci bütün ${base==="remaining"?"ilk kalan":"başlangıç"}.`}>
          {[0,1,2].map(row=><rect key={row} x="12" y={8+row*34} width="516" height="24" className="r035-empty"/>)}
          <rect x="12" y="8" width={total>0?516:0} height="24" className="r035-fill"/>
          <rect x="12" y="42" width={total>0?516*value(calc.result.afterFirst)/total:0} height="24" className="r035-fill"/>
          <rect x="12" y="76" width={total>0?516*value(calc.result.remaining)/total:0} height="24" className="r035-fill"/>
        </svg>
        <dl className="r035-facts"><div><dt>İlk kullanım</dt><dd>{text(calc.result.firstUsed)} birim</dd></div><div><dt>İlk kalan</dt><dd>{text(calc.result.afterFirst)} birim</dd></div><div><dt>İkinci kullanım</dt><dd>{text(calc.result.secondUsed)} birim</dd></div><div><dt>Son kalan</dt><dd>{text(calc.result.remaining)} birim</dd></div></dl>
        <p className="r035-result">Başlangıca göre kalan kesir: {text(calc.result.fractionRemaining)}</p>
      </>}
      <div className="r035-inverse"><h4>Sondan başlangıca dön</h4>{range("finalAmount","Verilen son kalan; birim",last,0,120)}{inverse.error !== null ?<Warning>{inverse.error} Sıfıra bölüp tek başlangıç üretme.</Warning>:<p>Bu son kalana göre başlangıç: {text(inverse.result)} birim. İleri modeldeki başlangıçtan ayrı bir tersine sorudur.</p>}</div>
      <div className="r035-presets"><button type="button" className="text-button" onClick={()=>set({total:80,firstN:1,firstD:4,secondN:1,secondD:3,secondBase:0,finalAmount:40})}>80 → 60 → 40</button><button type="button" className="text-button" onClick={()=>set({total:24,firstN:1,firstD:2,secondN:1,secondD:3,secondBase:0,finalAmount:8})}>24: kalanın 1/3’ü</button><button type="button" className="text-button" onClick={()=>set({total:30,firstN:1,firstD:5,secondN:1,secondD:4,secondBase:0,finalAmount:18})}>30 → 24 → 18</button></div>
    </>);
  } else {
    const sub=bounded(s.measureMode,0,0,2);
    let measured:ReactNode;
    if(sub===0) {
      const empty=bounded(s.emptyMass,120,0,600),full=bounded(s.fullMass,360,0,600),partial=bounded(s.partialMass,270,0,600);
      const calc=attempt(()=>{if(full<=empty||partial<empty||partial>full)throw Error("Dolu tartım boş kaptan büyük, kısmi tartım ikisinin arasında olmalıdır.");return r035(partial-empty,full-empty);});
      measured=<><div className="r035-controls">{range("emptyMass","Boş kap; g",empty,0,600)}{range("fullMass","Tam dolu kap; g",full,0,600)}{range("partialMass","Kısmen dolu kap; g",partial,0,600)}</div>{calc.error !== null ?<Warning>{calc.error}</Warning>:<><p className="r035-result">Sıvı oranı = ({partial}−{empty})/({full}−{empty}) = {text(calc.result)}</p><PartBars amount={calc.result} parts={Number(calc.result.d)}/><p>Karşılaştırılan sıvı kütleleri {partial-empty} g ve {full-empty} g. Aynı sıvı/yoğunluk koşulunda bu hacim oranıdır; kap dahil tartımların oranı değildir.</p></>}</>;
    } else if(sub===1) {
      const an=bounded(s.compositionN,2,0,10),ad=bounded(s.compositionD,5,1,10),rn=bounded(s.removeN,1,0,10),rd=bounded(s.removeD,3,1,10),target=bounded(s.finalA,700,0,1000);
      const calc=attempt(()=>{const a=r035(an,ad),r=r035(rn,rd);if(r035Compare(a,ONE)>0||r035Compare(r,ONE)>0)throw Error("Bileşen ve çıkarılan B oranları 0 ile 1 arasında olmalıdır.");const b=r035Sub(ONE,a),removed=r035Mul(b,r),after=r035Add(a,removed);if(after.n===0n)throw Error("Son A oranı sıfır; buradan tek toplam hacim bulunamaz.");return {a,b,removed,after,volume:r035Div(r035(target),after)};});
      measured=<><div className="r035-controls">{range("compositionN","Başlangıç A payı",an,0,10)}{range("compositionD","Başlangıç A paydası",ad,1,10)}{range("removeN","B’den çıkarılan pay",rn,0,10)}{range("removeD","B’den çıkarılan payda",rd,1,10)}{range("finalA","Son A hacmi; mL",target,0,1000)}</div>{calc.error !== null ?<Warning>{calc.error}</Warning>:<><p>Yalnız B’nin {rn}/{rd}’ü seçilerek çıkarılır; eşit hacimde A konur. Toplam hacim korunur, hacimler toplanabilir kabul edilir.</p><p>Başta A: {text(calc.result.a)}; çıkan B/eklenen A: {text(calc.result.removed)}; sonda A: {text(calc.result.after)}.</p><svg className="r035-figure" viewBox="0 0 540 80" role="img" aria-label={`A oranı ${text(calc.result.a)} iken ${text(calc.result.after)} oluyor; toplam hacim aynı.`}>{[calc.result.a,calc.result.after].map((a,i)=><g key={i}><rect x="8" y={i*36+5} width="520" height="26" className="r035-measure-b"/><rect x="8" y={i*36+5} width={520*value(a)} height="26" className="r035-fill"/></g>)}</svg><p className="r035-result">Son A={target} mL ise toplam V={text(calc.result.volume)} mL.</p><p>Eşit kütle ile değiştirme farklıdır; yoğunluk bilgisi gerekebilir. Homojen karışımdan iki bileşeni birlikte almak bu model değildir.</p></>}</>;
    } else {
      const n=bounded(s.ropeN,3,1,12),d=bounded(s.ropeD,4,1,12),pn=bounded(s.pieceN,1,1,12),pd=bounded(s.pieceD,8,1,12),total=r035(n,d),piece=r035(pn,pd),ratio=r035Div(total,piece),whole=ratio.n/ratio.d,remainder=r035Sub(total,r035Mul(r035(whole),piece));
      measured=<><div className="r035-controls">{range("ropeN","İp uzunluğu payı; m",n,1,12)}{range("ropeD","İp uzunluğu paydası",d,1,12)}{range("pieceN","Parça uzunluğu payı; m",pn,1,12)}{range("pieceD","Parça uzunluğu paydası",pd,1,12)}</div><p className="r035-result">({text(total)} m)/({text(piece)} m) = {text(ratio)} birim parça</p>{ratio.d===1n?<><p>{String(whole)} tam parça; iki ucu açık tek ipte ayrı kesimlerle {String(whole>0n?whole-1n:0n)} kesim gerekir.</p><RopePieces count={whole} piece={piece}/><p>İpin iki ucu birbirine bağlı değildir. Parça adedi ile kesim adedi farklıdır; üst üste veya aynı anda kesme koşulu verilmedi.</p></>:<Warning>{String(whole)} tam parça ve {text(remainder)} m artık çıkar. Tam bölünme koşulu yok; kesim adedini tam parçalı örneğin kuralıyla ilan etme.</Warning>}</>;
    }
    content=block("Bütünü ve birimi problemden seç",<><div className="r035-actions" role="group" aria-label="Miktar modeli">{["Kabın darasını çıkar","Bileşeni değiştir","İpi parçalara ayır"].map((name,i)=><button type="button" key={name} className="secondary" aria-pressed={sub===i} onClick={()=>set({measureMode:i})}>{name}</button>)}</div>{measured}</>);
  }
  return <section className="visual-lab r035-lab" aria-labelledby={uid} data-lesson-id={lessonId??"tyt-mat-rasyonel-kaynak-035"}>
    <h2 id={uid}>Parçayı değiştir, bütünü koru, sonucu denetle</h2>
    <p>Bir görünüm seç; sayıları değiştirdikçe çizim ve tam kesir aynı hesapla güncellenir. Renkler yanında bütün değerler metinle de gösterilir.</p>
    <div className="r035-modes" role="group" aria-label="Rasyonel sayı keşif görünümü">{["Denk parçalar","Sayı doğrusu","Üç karşılaştırma","Dört işlem","Ondalık ve devir","Değişen bütün","Miktar ve birim"].map((name,i)=><button key={name} type="button" className="secondary" aria-pressed={mode===i} onClick={()=>set({mode:i})}>{name}</button>)}</div>
    {content}
    <p className="small muted">Keşif seçimleri bu cihazda saklanır. Süre, şekli değiştirmek veya bu modeli açmak bağımsız doğru, konu tamamlama, ustalık ya da XP kaydı oluşturmaz.</p>
  </section>;
}
