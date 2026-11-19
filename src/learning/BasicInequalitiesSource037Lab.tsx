import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  ineq037Fraction, ineq037Format, ineq037SetLabel, ineq037Test,
  ineq037Transform, ineq037Compound, ineq037Logic, ineq037Budget,
  ineq037Profit, ineq037Parameter, ineq037VariableFactor,
  type Ineq037Fraction, type Ineq037Interval, type Ineq037Operator,
} from "./basicInequalitiesSource037Model";
import "./basicInequalitiesSource037.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const defaults={mode:0,a:5,b:-7,c:0,d:18,op:"<=",x:5,xd:1,left:-3,right:2,operation:"multiply",amount:-1,lower:-2,ca:3,cb:1,p:1,upper:10,lc:false,hc:true,firstOp:"<=",first:-2,secondOp:">",second:3,join:"or",fixed:240,per:80,budget:880,inclusive:true,u:20,ud:1,firstInclusive:false,secondInclusive:false,transfer:false,parameter:2,px:2,pxd:1,factorMode:false};
const symbol=(operator:Ineq037Operator)=>operator==="<="?"≤":operator===">="?"≥":operator;
const f=(value:Ineq037Fraction|null)=>value?ineq037Format(value):"—";
const number=(value:Ineq037Fraction)=>value.n/value.d;
const validOp=(value:string):Ineq037Operator=>value==="<"||value==="<="||value===">"||value===">="?value:"<=";
type LineRow={label:string;intervals:Ineq037Interval[]};

/** Endpoint and shading positions come from the exact same intervals as the HTML output. */
function NumberLines({rows,trial}:{rows:LineRow[];trial?:Ineq037Fraction}) {
  const id=useId();
  const bounds=rows.flatMap((r)=>r.intervals.flatMap((s)=>[s.low,s.high].filter((v):v is Ineq037Fraction=>v!==null).map(number)));
  if(trial)bounds.push(number(trial));
  const low=Math.min(-5,...bounds),high=Math.max(5,...bounds),margin=Math.max(1,(high-low)*0.12),min=low-margin,max=high+margin;
  const point=(x:number)=>24+(x-min)/(max-min)*312;
  return <figure className="f037-lines">
    <svg viewBox={`0 0 360 ${rows.length*58+24}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Çözüm bölgeleri</title>
      <desc id={`${id}-desc`}>{rows.map((r)=>`${r.label}: ${ineq037SetLabel(r.intervals)}`).join(". ")}{trial?`. Deneme değeri ${f(trial)}`:""}. Açık nokta hariç, dolu nokta dahil; ok sınırsız sürmeyi gösterir. Kesin değerler şeklin altındaki metindedir.</desc>
      {rows.map((row,index)=>{const y=28+index*58;return <g key={row.label} className={`f037-line-row f037-color-${index%3}`}>
        <line x1="24" y1={y} x2="336" y2={y} className="f037-axis"/>
        <line x1={point(0)} y1={y-5} x2={point(0)} y2={y+5} className="f037-axis"/>
        {row.intervals.map((segment,i)=>{const l=segment.low?point(number(segment.low)):24,r=segment.high?point(number(segment.high)):336;return <g key={i}>
          <line x1={l} y1={y} x2={r} y2={y} className="f037-solution"/>
          {segment.low?<circle cx={l} cy={y} r="5.5" className={segment.lowClosed?"f037-closed":"f037-open"}/>:<path d={`M31 ${y-5}L24 ${y}L31 ${y+5}`} className="f037-arrow"/>}
          {segment.high?<circle cx={r} cy={y} r="5.5" className={segment.highClosed?"f037-closed":"f037-open"}/>:<path d={`M329 ${y-5}L336 ${y}L329 ${y+5}`} className="f037-arrow"/>}
        </g>;})}
        {trial&&<path d={`M${point(number(trial))} ${y-18}v10`} className="f037-trial"/>}
      </g>;})}
    </svg>
    <figcaption><span>0 çizgisi bütün satırlarda aynı konumdadır. Açık nokta: hariç; dolu nokta: dahil. {trial&&`Üstteki kısa çizgi: deneme ${f(trial)}.`}</span>
      <dl>{rows.map((row,index)=><div key={row.label} className={`f037-color-${index%3}`}><dt>{row.label}</dt><dd>{ineq037SetLabel(row.intervals)}</dd></div>)}</dl>
    </figcaption>
  </figure>;
}

export function BasicInequalitiesSource037Lab() {
  const uid=useId();const {state}=useApp();
  const [saved,set]=useExploration("basic-inequalities-source-037",defaults);
  const n=(key:keyof typeof defaults,fallback:number,min:number,max:number)=>{const value=saved[key];return typeof value==="number"&&Number.isFinite(value)?Math.max(min,Math.min(max,Math.round(value))):fallback;};
  const mode=n("mode",0,0,6),operator=validOp(saved.op);
  const range=(key:keyof typeof defaults,label:string,value:number,min:number,max:number)=><div className="f037-range"><div><label htmlFor={`${uid}-${key}`}>{label}</label><output htmlFor={`${uid}-${key}`}>{value}</output></div><input id={`${uid}-${key}`} aria-label={label} type="range" min={min} max={max} step="1" value={value} onChange={(e)=>set({[key]:Number(e.target.value)})}/></div>;
  const signs=(key:"op"|"firstOp"|"secondOp",label:string,value:Ineq037Operator)=><label className="f037-select" htmlFor={`${uid}-${key}`}>{label}<ChoiceSelect id={`${uid}-${key}`} aria-label={label} value={value} onChange={(e)=>set({[key]:e.target.value})}>{(["<","<=",">",">="]as const).map((o)=><option value={o} key={o}>{symbol(o)}</option>)}</ChoiceSelect></label>;
  const check=(key:keyof typeof defaults,label:string)=><label className="f037-checkbox" htmlFor={`${uid}-${key}`}><input id={`${uid}-${key}`} type="checkbox" checked={saved[key]===true} onChange={(e)=>set({[key]:e.target.checked})}/>{label}</label>;
  const general=ineq037Test(n("a",5,-12,12),n("b",-7,-60,60),operator,n("c",0,-12,12),n("d",18,-120,120),n("x",5,-120,120),n("xd",1,1,12));
  const operation=saved.operation==="add"||saved.operation==="divide"?saved.operation:"multiply";
  const transformed=ineq037Transform(n("left",-3,-120,120),operator,n("right",2,-120,120),operation,n("amount",-1,-12,12));
  const compound=ineq037Compound(n("lower",-2,-120,120),n("ca",3,-12,12),n("cb",1,-60,60),n("p",1,1,12),n("upper",10,-120,120),saved.lc===true,saved.hc===true);
  const logic=ineq037Logic(validOp(saved.firstOp),n("first",-2,-120,120),validOp(saved.secondOp),n("second",3,-120,120),saved.join==="and"?"and":"or");
  const budget=ineq037Budget(n("fixed",240,0,1500),n("per",80,1,200),n("budget",880,0,5000),saved.inclusive===true);
  const profit=ineq037Profit(n("u",20,-120,120),n("ud",1,1,12),saved.firstInclusive===true,saved.secondInclusive===true,saved.transfer===true);
  const parameter=ineq037Parameter(n("parameter",2,-12,12),n("px",2,-120,120),n("pxd",1,1,12));
  const factor=ineq037VariableFactor(n("px",2,-120,120),n("pxd",1,1,12));
  const labels=["Bütün çözümler","Yön neden değişir?","İki sınır birlikte","Ve / veya","Bütçede tam sayılar","Kâr, zarar ve birim","Parametrenin işareti"];
  return <section className="f037-lab" data-forge037="basic-inequalities" data-motion={state.settings.motion}>
    <h3>Eşitsizliği sayı doğrusunda keşfet</h3>
    <p>İşlemi, uç kabulünü ve bağlacı değiştir; hesapla birlikte boyalı bölge de değişsin. Kesin sayısal sonuçlar şeklin altında yazılıdır. Bu keşif doğru cevap, ustalık veya XP kaydı oluşturmaz.</p>
    <div className="f037-modes" role="group" aria-label="Eşitsizlik modeli">{labels.map((label,index)=><button className="secondary" type="button" key={label} aria-pressed={mode===index} onClick={()=>set({mode:index})}>{label}</button>)}</div>

    {mode===0&&<div className="f037-panel" data-mode="general">
      <p>Gerçek x için <strong>({general.a})x+({general.b}) {symbol(operator)} ({general.c})x+({general.d})</strong>. Buradaki kontroller örneklenebilir sınırlı sayılardır; genel gerçek sayı kuralının sınırı değildir.</p>
      <div className="f037-controls">{range("a","Sol x katsayısı",general.a,-12,12)}{range("b","Sol sabit",general.b,-60,60)}{range("c","Sağ x katsayısı",general.c,-12,12)}{range("d","Sağ sabit",general.d,-120,120)}{signs("op","İlişki",operator)}{range("x","Deneme x payı",n("x",5,-120,120),-120,120)}{range("xd","Deneme x paydası",n("xd",1,1,12),1,12)}</div>
      <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({a:5,b:-7,c:0,d:18,op:"<=",x:5,xd:1})}>5x−7≤18</button><button className="secondary" type="button" onClick={()=>set({a:-4,b:3,c:0,d:15,op:">",x:-3,xd:1})}>Negatif katsayı</button><button className="secondary" type="button" onClick={()=>set({a:5,b:-10,c:5,d:-7,op:"<"})}>Bütün gerçekler</button><button className="secondary" type="button" onClick={()=>set({a:5,b:-10,c:5,d:-7,op:">"})}>Boş küme</button></div>
      <div className="f037-actions" role="group" aria-label="Kaynağın uç gösterimleri"><button className="secondary" type="button" onClick={()=>set({a:1,b:0,c:0,d:2,op:">",x:2,xd:1})}>x&gt;2: açık uç</button><button className="secondary" type="button" onClick={()=>set({a:1,b:0,c:0,d:3,op:"<",x:3,xd:1})}>x&lt;3: sol ışın</button><button className="secondary" type="button" onClick={()=>set({a:1,b:0,c:0,d:-1,op:">=",x:-1,xd:1})}>x≥−1: kapalı uç</button><button className="secondary" type="button" onClick={()=>set({mode:2,lower:-2,ca:1,cb:0,p:1,upper:5,lc:false,hc:true})}>−2&lt;x≤5: karma uç</button><button className="secondary" type="button" onClick={()=>set({mode:3,firstOp:"<=",first:-4,secondOp:">",second:1,join:"or"})}>x≤−4 veya x&gt;1</button></div>
      <ol className="f037-steps"><li>İki taraftan sağ x terimini ve sol sabiti çıkar: ({general.coefficient})x {symbol(operator)} {general.constant}.</li><li>{general.coefficient===0?`Katsayı 0. Kalan 0 ${symbol(operator)} ${general.constant} koşulu ${general.kind==="all"?"her x için doğru":"her x için yanlış"}; sıfıra bölünmez.`:`${general.coefficient<0?"Negatif":"Pozitif"} ${general.coefficient} katsayısına böl; yön ${general.coefficient<0?"ters döner":"korunur"}: x ${symbol(general.effectiveOperator)} ${f(general.boundary)}.`}</li></ol>
      <NumberLines rows={[{label:"Bütün uygun x değerleri",intervals:general.intervals}]} trial={general.x}/>
      <p data-model-result><strong>ÇK={general.label}.</strong> Deneme x={f(general.x)} için ilk sol taraf {f(general.left)}, sağ taraf {f(general.right)}; {symbol(operator)} ilişkisi {general.holds?"doğru":"yanlış"}. Bu değer çözüm kümesine {general.member?"dahil":"dahil değil"}.</p>
    </div>}

    {mode===1&&<div className="f037-panel" data-mode="operations">
      <p>Başlangıçtaki sayısal ilişki: <strong>{transformed.left} {symbol(operator)} {transformed.right}</strong>; {transformed.originalHolds?"doğru":"yanlış"}. Amaç aynı doğruluk bilgisini geçerli işlemle korumaktır.</p>
      <div className="f037-controls">{range("left","İlk sol değer",transformed.left,-120,120)}{range("right","İlk sağ değer",transformed.right,-120,120)}{signs("op","Başlangıç ilişkisi",operator)}{range("amount","İki tarafa uygulanan sayı",transformed.amount,-12,12)}<div className="f037-operation"><span id={`${uid}-operation-label`}>İşlem</span><div className="f037-operation-choices" role="group" aria-labelledby={`${uid}-operation-label`}>{([["add","Aynı sayıyı ekle"],["multiply","Aynı sayıyla çarp"],["divide","Aynı sayıya böl"]] as const).map(([value,label])=><button className="secondary" type="button" key={value} aria-pressed={operation===value} onClick={()=>set({operation:value})}>{label}</button>)}</div></div></div>
      <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({left:-3,right:2,op:"<",operation:"multiply",amount:-1})}>−1 ile yansıt</button><button className="secondary" type="button" onClick={()=>set({left:-3,right:2,op:"<",operation:"add",amount:-5})}>−5 ekle, yönü koru</button><button className="secondary" type="button" onClick={()=>set({left:1,right:2,op:"<",operation:"multiply",amount:0})}>Sıfırla çarpma kaybı</button></div>
      {transformed.valid&&transformed.newLeft&&transformed.newRight&&transformed.newOperator?<>
        {(()=>{const values=[transformed.left,transformed.right,number(transformed.newLeft),number(transformed.newRight)],limit=Math.max(5,...values.map(Math.abs))*1.15,point=(v:number)=>180+v/limit*150;return <figure className="f037-reflection"><svg viewBox="0 0 360 140" role="img" aria-label={`Önce ${transformed.left} ${symbol(operator)} ${transformed.right}; sonra ${f(transformed.newLeft)} ${symbol(transformed.newOperator!)} ${f(transformed.newRight)}`}><line x1="20" y1="38" x2="340" y2="38" className="f037-axis"/><line x1="20" y1="104" x2="340" y2="104" className="f037-axis"/><line x1="180" y1="20" x2="180" y2="120" className="f037-axis"/><path d={`M${point(values[0])} 38L${point(values[2])} 104`} className="f037-link-a"/><path d={`M${point(values[1])} 38L${point(values[3])} 104`} className="f037-link-b"/>{values.map((v,i)=><circle key={i} cx={point(v)} cy={i<2?38:104} r="6" className={i%2?"f037-node-b":"f037-node-a"}/>)}</svg><figcaption>Üst satır başlangıç, alt satır işlem sonrasıdır; ortadaki dik çizgi 0. Birinci değerin yolu düz, ikinci değerin yolu kesiklidir.</figcaption></figure>;})()}
        <p data-model-result><strong>Sonuç: {f(transformed.newLeft)} {symbol(transformed.newOperator)} {f(transformed.newRight)}; {transformed.newHolds?"doğru":"yanlış"}.</strong> {transformed.flips?"Negatif çarpma/bölme iki değerin sırasını yansıttığı için yön ters döndü.":operation==="add"?"Aynı sayıyı eklemek, eklenen sayı negatif olsa da yönü korur.":"Pozitif çarpma/bölme yönü korur."}</p>
      </>:<p data-model-result><strong>{transformed.reason}</strong> {operation==="multiply"?`Çarpımlar 0 ve 0 olur. Sıkı < veya > ilişkisi 0 ile 0 arasında yanlış olur; başlangıçtaki bilgiyi bu adımla geri kazanamazsın.`:"Tanımsız bölmeyi sayı veya çözüm gibi göstermiyoruz."}</p>}
    </div>}

    {mode===2&&<div className="f037-panel" data-mode="compound">
      <p>Gerçek x için <strong>{compound.lower} {compound.lowerClosed?"≤":"<"} (({compound.a})x+({compound.b}))/{compound.denominator} {compound.upperClosed?"≤":"<"} {compound.upper}</strong>. Payda pozitif ve sabittir; bütün pay aynı kesrin içindedir.</p>
      <div className="f037-controls">{range("lower","Alt sınır",compound.lower,-120,120)}{range("upper","Üst sınır",compound.upper,-120,120)}{range("ca","Paydaki x katsayısı",compound.a,-12,12)}{range("cb","Paydaki sabit",compound.b,-60,60)}{range("p","Pozitif payda",compound.denominator,1,12)}{check("lc","Alt sınır eşitliğini kabul et")}{check("hc","Üst sınır eşitliğini kabul et")}</div>
      <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({lower:-2,ca:3,cb:1,p:1,upper:10,lc:false,hc:true})}>−2&lt;3x+1≤10</button><button className="secondary" type="button" onClick={()=>set({lower:2,ca:1,cb:-1,p:3,upper:5,lc:true,hc:false})}>Sabit payda</button><button className="secondary" type="button" onClick={()=>set({lower:-5,ca:-2,cb:1,p:1,upper:9,lc:false,hc:true})}>Ek negatif katsayı denemesi</button><button className="secondary" type="button" onClick={()=>set({ca:0})}>Sıfır katsayıyı incele</button></div>
      <ol className="f037-steps"><li>Üç tarafı pozitif {compound.denominator} ile çarp: {compound.afterClearLower} {compound.lowerClosed?"≤":"<"} ({compound.a})x+({compound.b}) {compound.upperClosed?"≤":"<"} {compound.afterClearUpper}.</li><li>Üç taraftan ({compound.b}) çıkar: {compound.afterSubtractLower} {compound.lowerClosed?"≤":"<"} ({compound.a})x {compound.upperClosed?"≤":"<"} {compound.afterSubtractUpper}.</li><li>{compound.a===0?"Katsayı 0 olduğu için bölme yok; iki sabit koşulun ortak doğruluğunu değerlendir.":`Katsayı ${compound.a}; iki koşulda ${compound.a<0?"negatif bölme yönü döndürür":"pozitif bölme yönü korur"}. Son sınırları küçükten büyüğe oku.`}</li></ol>
      <NumberLines rows={[{label:"Alt sınır koşulu",intervals:compound.left.intervals},{label:"Üst sınır koşulu",intervals:compound.right.intervals},{label:"İkisinin ortak çözümü",intervals:compound.intervals}]}/>
      <p data-model-result><strong>ÇK={compound.label}.</strong> Üstteki iki bölgenin kesişimi son satırdır; tek bir x iki koşulu birden sağlamalıdır.</p>
    </div>}

    {mode===3&&<div className="f037-panel" data-mode="logic">
      <p>Gerçek x için <strong>x {symbol(logic.firstOperator)} {logic.firstBoundary} {logic.join==="and"?"ve":"veya"} x {symbol(logic.secondOperator)} {logic.secondBoundary}</strong>.</p>
      <div className="f037-controls">{signs("firstOp","İlk koşulun ilişkisi",logic.firstOperator)}{range("first","İlk sınır",logic.firstBoundary,-120,120)}{signs("secondOp","İkinci koşulun ilişkisi",logic.secondOperator)}{range("second","İkinci sınır",logic.secondBoundary,-120,120)}</div>
      <div className="f037-actions" role="group" aria-label="Koşul bağı"><button className="secondary" type="button" aria-pressed={logic.join==="and"} onClick={()=>set({join:"and"})}>Ve: ortak bölge</button><button className="secondary" type="button" aria-pressed={logic.join==="or"} onClick={()=>set({join:"or"})}>Veya: en az biri</button></div>
      <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({firstOp:"<=",first:-2,secondOp:">",second:3,join:"or"})}>İki ayrı ışın</button><button className="secondary" type="button" onClick={()=>set({firstOp:"<=",first:-2,secondOp:">",second:3,join:"and"})}>Aynı ışınlarda boş kesişim</button><button className="secondary" type="button" onClick={()=>set({firstOp:">=",first:2,secondOp:"<=",second:2,join:"and"})}>Ek tek nokta denemesi</button><button className="secondary" type="button" onClick={()=>set({firstOp:"<",first:2,secondOp:">",second:2,join:"or"})}>Ek eksik nokta denemesi</button><button className="secondary" type="button" onClick={()=>set({firstOp:"<=",first:2,secondOp:">",second:2,join:"or"})}>Ek bütün gerçekler denemesi</button></div>
      <NumberLines rows={[{label:"İlk koşul",intervals:logic.first.intervals},{label:"İkinci koşul",intervals:logic.second.intervals},{label:logic.join==="and"?"Kesişim: ikisi birden":"Birleşim: en az biri",intervals:logic.intervals}]}/>
      <p data-model-result><strong>ÇK={logic.label}.</strong> {logic.join==="and"?"Bir değerin yalnız bir renkli bölgede olması yetmez; ikisinde de bulunmalıdır.":"Bir değerin iki bölgede birden olması gerekmez; herhangi birinde bulunması yeter."} Açık temas noktasını boyalı gibi varsayma; noktanın kabulü iki koşuldan hesaplanır.</p>
    </div>}

    {mode===4&&<div className="f037-panel" data-mode="budget">
      <p>Adet n, negatif olmayan tam sayıdır. Sabit ücret n=0’da da ödenir; birim gider pozitiftir. <strong>{budget.fixed}+{budget.per}n {budget.inclusive?"≤":"<"} {budget.budget} TL</strong>.</p>
      <div className="f037-controls">{range("fixed","Sabit gider (TL)",budget.fixed,0,1500)}{range("per","Birim gider (TL)",budget.per,1,200)}{range("budget","Bütçe (TL)",budget.budget,0,5000)}{check("inclusive","Bütçeye tam eşit tutarı kabul et")}</div>
      <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({fixed:240,per:80,budget:880,inclusive:true})}>8 ders sınırı</button><button className="secondary" type="button" onClick={()=>set({fixed:1200,per:60,budget:4200,inclusive:true})}>50 kişi sınırı</button><button className="secondary" type="button" onClick={()=>set({fixed:150,per:70,budget:640,inclusive:false})}>Ek sıkı bütçe denemesi</button><button className="secondary" type="button" onClick={()=>set({fixed:240,per:80,budget:200,inclusive:true})}>Sabit gideri bile karşılamayan bütçe</button></div>
      <p>Önce gerçek sayı sınırı: n {budget.inclusive?"≤":"<"} {f(budget.boundary)}; n≥0 ile ortak gerçek bölge {budget.continuousLabel}. Adet için bunun yalnız tam sayı noktaları kullanılabilir.</p>
      {(()=>{const maximum=budget.maxCount,preview=maximum===null?[]:Array.from({length:Math.min(maximum+1,51)},(_,i)=>i),limit=Math.max(1,maximum??1),point=(v:number)=>24+v/limit*312;return <figure className="f037-counts"><svg viewBox="0 0 360 80" role="img" aria-label={maximum===null?"Uygun negatif olmayan adet yok":`Uygun adetler 0 ile ${maximum} arasındaki tam sayılardır; nokta ön izlemesi ${preview.length} adet gösterir`}><line x1="24" y1="40" x2="336" y2="40" className="f037-axis"/>{preview.map((v)=><circle key={v} cx={point(v)} cy="40" r={maximum!==null&&maximum>30?2.5:5} className="f037-node-a"/>)}{maximum!==null&&maximum>50&&<circle cx={point(maximum)} cy="40" r="5" className="f037-node-b"/>}</svg><figcaption>{maximum===null?"n=0 bile bütçe koşuluna uymuyor; uygun adet yok.":maximum>50?`Ön izleme 0–50 noktalarını ve son ${maximum} noktasını gösterir. Aradaki tam sayılar da uygundur; yoğunluğu azaltmak için çizilmemiştir.`:`0–${maximum} arasındaki bütün uygun tam sayı noktaları gösterilir. Noktalar arasındaki kesirli adetler bağlama dahil değildir.`}</figcaption></figure>;})()}
      <p data-model-result>{budget.possible?<><strong>En fazla {budget.maxCount} adet.</strong> Toplam {budget.costAtMax} TL uygundur; hemen sonraki {(budget.maxCount??0)+1} adedin {budget.costAtNext} TL gideri bütçeye uymaz.</>:<><strong>Uygun adet yok.</strong> Sabit {budget.fixed} TL bile {budget.inclusive?"en çok":"daha az"} {budget.budget} TL koşulunu sağlamıyor.</>}</p>
    </div>}

    {mode===5&&<div className="f037-panel" data-mode="profit">
      <div className="f037-actions"><button className="secondary" type="button" aria-pressed={!profit.transfer} onClick={()=>set({transfer:false,u:20,ud:1,firstInclusive:false,secondInclusive:false})}>İki satış, bin TL ölçeği</button><button className="secondary" type="button" aria-pressed={profit.transfer} onClick={()=>set({transfer:true,u:60,ud:1,firstInclusive:true})}>80+b maliyete aktar (TL)</button></div>
      <p>{profit.transfer?"Bu ayrı aktarım modelinde değişken doğrudan b TL’dir; bin TL çarpanı uygulanmaz. Maliyet 80+b, gelir 2b+20.":"Bu öğretim uyarlamasında u=b/1000. u bin TL cinsinden sayısal değer, b TL cinsinden gerçek tutardır. Maliyet 40+u, ilk gelir 2u+30, ikinci gelir 3u−20 bin TL."} Maliyet değişkeni pozitiftir.</p>
      <div className="f037-controls">{range("u",profit.transfer?"Deneme b payı (TL)":"Deneme u payı (bin TL)",n("u",20,-120,120),-120,120)}{range("ud","Deneme paydası",n("ud",1,1,12),1,12)}{check("firstInclusive","İlk satışta başa başı kabul et (zarar etmez)")}{!profit.transfer&&check("secondInclusive","İkinci satışta başa başı kabul et (kâr etmez)")}</div>
      <p>İlk koşul {profit.transfer?"2b+20":"2u+30"} {profit.firstInclusive?"≥":">"} {profit.transfer?"80+b":"40+u"}; çözümü {profit.first.label}.{profit.second&&` İkinci koşul 3u−20 ${profit.secondInclusive?"≤":"<"} 40+u; çözümü ${profit.second.label}.`}</p>
      <NumberLines rows={[{label:profit.transfer?"Pozitif b, TL":"Pozitif u, bin TL ölçeği",intervals:profit.intervals}]} trial={profit.u}/>
      <p data-model-result><strong>{profit.transfer?`b∈${profit.label} TL`:`u∈${profit.label}; b∈${profit.tlLabel} TL`}.</strong> Deneme {profit.transfer?"b":"u"}={f(profit.u)} → b={f(profit.originalTL)} TL; toplam maliyet {f(profit.costTL)} TL, ilk gelir {f(profit.firstSaleTL)} TL{profit.secondSaleTL?`, ikinci gelir ${f(profit.secondSaleTL)} TL`:""}. İlk koşul {profit.firstHolds?"doğru":"yanlış"}{!profit.transfer&&`, ikinci koşul ${profit.secondHolds?"doğru":"yanlış"}`}; pozitif alanla birlikte {profit.accepted?"kabul edilir":"kabul edilmez"}.</p>
      {profit.u.n<=0&&<p>Seçilen maliyet değişkeni pozitif değil; bu deneme modelin izinli alanının dışındadır. Hesaplanan ilişkiler tek başına bu değeri geçerli maliyet veya çözüm yapmaz.</p>}
      {!profit.transfer&&<p>{profit.distanceOperator&&profit.midpoint&&profit.radius?`Aynı aralığın uzaklık dili: |b−${f(profit.midpoint)}| ${symbol(profit.distanceOperator)} ${f(profit.radius)}. Merkez ve yarıçap TL cinsindedir.`:"Bir uç dahil, diğeri hariç olduğunda tek bir simetrik sıkı/kapalı uzaklık ifadesi aynı aralığı vermez; iki ayrı sınırı koru."} Bu, seçili aralığı yorumlamaktır; genel mutlak değerli eşitsizlik ünitesinin yerine geçmez.</p>}
      {!profit.transfer&&<p>Resmî 2024 TYT Temel Matematik 8’de değişken TL’dir; iki satışın ikisi de sıkı kâr/zarar iken sonuç 10000&lt;b&lt;30000 ve gerçek A seçeneği |b−20000|&lt;10000’dır. Burada kullanılan değiştirilebilir örnekler özgün öğretim uyarlamasıdır; resmî soru diye puanlanmaz.</p>}
    </div>}

    {mode===6&&<div className="f037-panel" data-mode="parameter">
      <div className="f037-actions"><button className="secondary" type="button" aria-pressed={saved.factorMode!==true} onClick={()=>set({factorMode:false})}>a·x&lt;6 parametresi</button><button className="secondary" type="button" aria-pressed={saved.factorMode===true} onClick={()=>set({factorMode:true})}>x−1’e bölmenin koşulu</button></div>
      <div className="f037-controls">{saved.factorMode!==true&&range("parameter","Parametre a",parameter.a,-12,12)}{range("px","Deneme x payı",n("px",2,-120,120),-120,120)}{range("pxd","Deneme x paydası",n("pxd",1,1,12),1,12)}</div>
      {saved.factorMode===true?<>
        <p>Burada 2&lt;5 doğru ilişkisini seçtiğin x değerindeki x−1’e bölmeyi deniyoruz. Bu, bütün değişken paydalı eşitsizlikleri çözen bir yöntem değildir.</p>
        <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({px:0,pxd:1})}>x=0: negatif</button><button className="secondary" type="button" onClick={()=>set({px:1,pxd:1})}>x=1: bölme yasak</button><button className="secondary" type="button" onClick={()=>set({px:2,pxd:1})}>x=2: pozitif</button></div>
        <p data-model-result><strong>x={f(factor.x)}, x−1={f(factor.factor)}.</strong> {factor.canDivide&&factor.operator?`Bölen ${factor.sign==="positive"?"pozitif, yön korunur":"negatif, yön döner"}: ${f(factor.left)} ${symbol(factor.operator)} ${f(factor.right)}.`:factor.reason}</p>
        <p>Bir seçili x’teki işaret, bütün x’ler için aynı yönü kullanma izni değildir. x&lt;1 negatif, x=1 sıfır ve x&gt;1 pozitiftir.</p>
      </>:<>
        <p>Gerçek parametre a için <strong>({parameter.a})x&lt;6</strong>. Aranan x gerçektir; a’nın pozitif, negatif veya sıfır olmasına göre işlem değişir.</p>
        <div className="f037-actions"><button className="secondary" type="button" onClick={()=>set({parameter:2})}>a=2</button><button className="secondary" type="button" onClick={()=>set({parameter:-2})}>a=−2</button><button className="secondary" type="button" onClick={()=>set({parameter:0})}>a=0</button></div>
        <NumberLines rows={[{label:"a·x<6 için bütün x değerleri",intervals:parameter.intervals}]} trial={parameter.x}/>
        <p data-model-result><strong>ÇK={parameter.label}.</strong> {parameter.mayDivide?`a ${parameter.aSign==="positive"?"pozitif; yön korunur":"negatif; yön döner"}: x ${symbol(parameter.effectiveOperator)} ${f(parameter.boundary)}.`:"a=0 iken bölme yok: 0<6 her x için doğru; çözüm ℝ."} Deneme x={f(parameter.x)} için sol {f(parameter.left)}, sağ 6; koşul {parameter.holds?"doğru":"yanlış"}.</p>
      </>}
    </div>}
    <p className="f037-note">Çözümünü başlangıç koşullarıyla denetle. Sınır varsa eşitliğin kabul edilip edilmediğini kontrol et; ardından farklı sayılarla yeniden dene.</p>
  </section>;
}
